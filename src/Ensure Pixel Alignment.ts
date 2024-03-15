//@target aftereffects

/**
 * Ensure Pixel Alignment
 * 
 * Given a threshold, this script will select all layers in the active comp that
 * are not perfectly aligned to the pixel grid. For example, if the threshold is
 * 2, it will select all layers whose x and y positions are not perfectly
 * divisible by 2.
 * 
 * The script looks at the parent chain, but only works at the current time, and
 * doesn't account for modified anchor points or 3D layers.
 * 
 * Side note: it's surprising to me that even when it looks like a layer is
 * perfectly aligned … it might not be. The position property might read [960,
 * 640], but then the script reports that it's [960, 640.0000004574] or
 * something. I considered getting it to ignore such tiny differences, but I
 * find it satisfying to have everything perfectly aligned.
 * 
*/

(function ensurePixelAlignment() {
    
    const activeItem = app.project.activeItem as CompItem
    const allLayers = activeItem.layers
    
    const THRESHOLD = 2
    
    app.beginUndoGroup("Ensure Pixel Alignment")
    clearOutput()
    writeLn(`Comp: ${activeItem.name}`)
    writeLn(`Threshold: ${THRESHOLD}`)

    // recursive function to get the absolute position of a layer in world space
    function getAbsolutePosition(layer: Layer) {
        if (layer.parent === null) {
            return layer.transform.position.value
        } else {
            const parentPosition = getAbsolutePosition(layer.parent)
            const layerPosition = layer.transform.position.value
            return [parentPosition[0] + layerPosition[0], parentPosition[1] + layerPosition[1]]
        }
    }

    let misalignedLayerCount = 0

    for (let i = 1; i <= allLayers.length; i++) {
        const layer = allLayers[i]
        const absolutePosition = getAbsolutePosition(layer)
        // absolutePosition now contains the layer's absolute position in world space

        // check if absolutePosition is not perfectly divisible by 2
        if (
            absolutePosition[0] % THRESHOLD !== 0 ||
            absolutePosition[1] % THRESHOLD !== 0
        ) {
            // if not, round the position to the nearest integer
            // alert(absolutePosition)
            layer.selected = true
            misalignedLayerCount++

            // writeLn(`Layer: ${layer.name} - ${absolutePosition[0]}, ${absolutePosition[1]}`)

            // round the position to the THRESHOLD
            // layer.transform.xPosition.setValue(absolutePosition[0] - (absolutePosition[0] % THRESHOLD))
            // layer.transform.yPosition.setValue(absolutePosition[1] - (absolutePosition[1] % THRESHOLD))
            // layer.yPosition.setValue(20)
        } else {
            layer.selected = false
        }
    }

    // report results in the info panel
    if (misalignedLayerCount === 0) {
        writeLn("Perfection achieved.")
    } else {
        writeLn(`Found ${misalignedLayerCount} layers.`)
    }


    app.endUndoGroup()

})()