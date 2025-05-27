//@target aftereffects

/**
 * 
 */

(function deepDigComps() {
    const thisComp = app.project.activeItem as CompItem

    app.beginUndoGroup("deepDigComps")

    
    // keep a reference to the project panel selection
    const projectPanelSelection = app.project.selection

    // deselect all items in the project panel
    for (const currentItem of projectPanelSelection) {
        currentItem.selected = false
    }

    for (const currentItem of projectPanelSelection) {
        if (currentItem instanceof CompItem) {
            // loop through its layers
            descend(currentItem)
        }
    }

    function descend(comp: CompItem) {
        const layers = comp.layers
        for (let c = 1; c <= layers.length; c++) {
            const currentLayer = layers[c]
            if (currentLayer instanceof AVLayer) {
                if (currentLayer.source instanceof CompItem) {
                    currentLayer.source.selected = true
                    descend(currentLayer.source)
                }

                // if (currentLayer.source) {
                //     const source = currentLayer.source as FootageItem
                //     source.selected = true
                // }
            }
        }
    }


})()