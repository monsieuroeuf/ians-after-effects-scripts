// Create shape layers that match the bounds of each selected layer
// One shape layer per selected layer

//@target aftereffects

(function () {
    app.beginUndoGroup("Create Bounds Shape Layers")

    const comp = app.project.activeItem
    if (!(comp instanceof CompItem)) {
        alert("Please select a composition.")
        app.endUndoGroup()
        return
    }

    const sel = comp.selectedLayers
    if (!sel || sel.length === 0) {
        alert("Please select at least one layer.")
        app.endUndoGroup()
        return
    }

    const t = comp.time

    interface LayerBounds {
        left: number;
        top: number;
        width: number;
        height: number;
    }

    function clamp(value: number, minValue: number, maxValue: number): number {
        return Math.max(minValue, Math.min(maxValue, value))
    }

    function getSafeSampleTime(layer: Layer, comp: CompItem, fallbackTime: number): number {
        const frame = comp.frameDuration || (1 / 24)
        const minTime = layer.inPoint + frame * 0.5
        const maxTime = layer.outPoint - frame * 0.5

        if (maxTime <= minTime) {
            return fallbackTime
        }

        return clamp(fallbackTime, minTime, maxTime)
    }

    function canGetCompBounds(layer: Layer): boolean {
        return !!(layer as any).sourcePointToComp
    }

    function layerHasSourceRect(layer: AVLayer): boolean {
        return !!(layer as any).sourceRectAtTime
    }

    function getLayerBoundsInComp(layer: AVLayer, time: number): LayerBounds | null {
        // Only works for 2D layers – skip 3D to avoid weirdness
        if ((layer as any).threeDLayer) {
            return null
        }

        let pts: number[][]

        // Text and shape layers should use sourceRectAtTime for true visible bounds.
        if (layerHasSourceRect(layer)) {
            const sourceRect = (layer as any).sourceRectAtTime(time, false)
            if (!sourceRect || sourceRect.width <= 0 || sourceRect.height <= 0) {
                return null
            }
            pts = [
                [sourceRect.left, sourceRect.top],
                [sourceRect.left + sourceRect.width, sourceRect.top],
                [sourceRect.left, sourceRect.top + sourceRect.height],
                [sourceRect.left + sourceRect.width, sourceRect.top + sourceRect.height]
            ]
        }
        else {
            // Fallback for layers without sourceRectAtTime
            pts = [
                [0, 0],
                [(layer as any).width, 0],
                [0, layer.height],
                [(layer as any).width, (layer as any).height]
            ]
        }

        let minX: number = 1e9
        let minY: number = 1e9
        let maxX: number = -1e9
        let maxY: number = -1e9

        for (let i = 0; i < pts.length; i++) {
            const p = (layer as any).sourcePointToComp(pts[i])
            if (p[0] < minX) minX = p[0]
            if (p[0] > maxX) maxX = p[0]
            if (p[1] < minY) minY = p[1]
            if (p[1] > maxY) maxY = p[1]
        }

        return {
            left: minX,
            top: minY,
            width: maxX - minX,
            height: maxY - minY
        }
    }

    function createBoundsShapeForLayer(layer: Layer, bounds: LayerBounds): ShapeLayer | null {
        const comp = layer.containingComp

        function setPropIfExists(group: any, matchName: string, value: number[]): void
        function setPropIfExists(group: any, matchName: string, value: number): void
        function setPropIfExists(group: any, matchName: string, value: number[] | number): void {
            const prop = group.property(matchName) as any
            if (prop && prop.setValue) {
                prop.setValue(value)
            }
        }

        // New shape layer
        const shapeLayer = comp.layers.addShape()
        shapeLayer.name = "Bounds – " + layer.name

        // Place it just before the source layer
        shapeLayer.moveBefore(layer)

        // Reset transforms so layer space = comp space
        const tr = shapeLayer.property("ADBE Transform Group")
        if (!tr) {
            return shapeLayer
        }
        setPropIfExists(tr, "ADBE Anchor Point", [0, 0])
        setPropIfExists(tr, "ADBE Position", [0, 0])
        setPropIfExists(tr, "ADBE Scale", [100, 100])
        setPropIfExists(tr, "ADBE Rotate Z", 0)
        setPropIfExists(tr, "ADBE Rotation", 0)

        // Set up shape contents (directly on root Contents; this is stable in this repo)
        const contents = shapeLayer.property("Contents")
        if (!contents || !(contents as any).addProperty) {
            return null
        }

        const rect = (contents as any).addProperty("ADBE Vector Shape - Rect")
        if (!rect) {
            return null
        }

        // Rectangle path properties
        const rectSizeProp = rect.property("Size") || rect.property("ADBE Vector Rect Size")
        const rectPosProp = rect.property("Position") || rect.property("ADBE Vector Rect Position")
        const rectRoundProp = rect.property("Roundness") || rect.property("ADBE Vector Rect Roundness")
        if (!rectSizeProp || !rectPosProp || !rectRoundProp) {
            return null
        }

        const w = bounds.width
        const h = bounds.height
        const cx = bounds.left + w / 2
        const cy = bounds.top + h / 2

        rectSizeProp.setValue([w, h])
        rectPosProp.setValue([cx, cy])
        rectRoundProp.setValue(0)

        const fill = (contents as any).addProperty("ADBE Vector Graphic - Fill")
        if (fill) {
            const fillColorProp = fill.property("Color") || fill.property("ADBE Vector Fill Color")
            if (fillColorProp) {
                fillColorProp.setValue([1, 1, 1])
            }
        }

        // Add stroke after rect setup
        const stroke = (contents as any).addProperty("ADBE Vector Graphic - Stroke")
        if (stroke) {
            const strokeColorProp = stroke.property("Color") || stroke.property("ADBE Vector Stroke Color")
            const strokeWidthProp = stroke.property("Stroke Width") || stroke.property("ADBE Vector Stroke Width")
            if (strokeColorProp && strokeWidthProp) {
                strokeColorProp.setValue([1, 1, 1]) // white
                strokeWidthProp.setValue(2)
            }
        }

        return shapeLayer
    }

    let createdCount = 0
    let skippedCount = 0
    let failedCount = 0
    const createdLayers: ShapeLayer[] = []

    for (let i = 0; i < sel.length; i++) {
        const layer = sel[i]

        if (!canGetCompBounds(layer)) {
            skippedCount++
            continue
        }

        const sampleTime = getSafeSampleTime(layer, comp, t)

        const bounds = getLayerBoundsInComp(layer as AVLayer, sampleTime)
        if (!bounds) {
            skippedCount++
            continue
        }

        // Ignore invisible / zero-size things quietly
        if (bounds.width <= 0 || bounds.height <= 0) {
            skippedCount++
            continue
        }

        try {
            const createdLayer = createBoundsShapeForLayer(layer, bounds)
            if (createdLayer) {
                createdCount++
                createdLayers.push(createdLayer)
            }
            else {
                skippedCount++
            }
        }
        catch (_err) {
            failedCount++
            skippedCount++
        }
    }

    // Ensure the newly created shape layers remain selected.
    for (let i = 0; i < createdLayers.length; i++) {
        createdLayers[i].selected = true
    }

    if (createdCount === 0) {
        alert(`No bounds shapes were created.\n\nSelected layers: ${sel.length}\nSkipped: ${skippedCount}\nFailed: ${failedCount}\n\nTry moving CTI onto the selected text layers and ensure they are 2D text/AV layers.`)
    }

    app.endUndoGroup()
})()