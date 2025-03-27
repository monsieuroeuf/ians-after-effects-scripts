//@target aftereffects

/**
 * 2025-03-26
 * 
 */

(function stackLayersBySelection() {
    const thisComp = app.project.activeItem as CompItem
    const selectedLayers = thisComp.selectedLayers

    app.beginUndoGroup("stackLayersBySelection")

    if (selectedLayers.length < 2) {
        alert("Please select at least 2 layers.")
        return
    }

    const firstLayer = selectedLayers[0]
    const firstLayerIndex = firstLayer.index

    // stack layers by selection
    for (let i = 1; i < selectedLayers.length; i++) {
        const layer = selectedLayers[i]
        layer.moveAfter(thisComp.layer(firstLayerIndex + i - 1))
    }

    
})()