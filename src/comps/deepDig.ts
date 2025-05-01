//@target aftereffects

/**
 * 2025-04-24
 * 
 * With the active comp, recursively dive into all layers and their sources,
 * selecting them in the project panel.
 * 
 */

(function deepDig() {
    const thisComp = app.project.activeItem as CompItem

    app.beginUndoGroup("deepDig")
    descend(thisComp)

    function descend(comp:CompItem) {
        const layers = comp.layers
        for (let c = 1; c <= layers.length; c++) {
            const currentLayer = layers[c]
            if (currentLayer instanceof AVLayer) {
                if (currentLayer.source instanceof CompItem) {
                    descend(currentLayer.source)
                }

                if (currentLayer.source) {
                    const source = currentLayer.source as FootageItem
                    source.selected = true
                }
            }
        }
    }

    
})()