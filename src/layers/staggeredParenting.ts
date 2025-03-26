//@target aftereffects

/**
 * 2025-03-24
 * Parent layers *at different times* to the last selected layer.
 */

(function staggeredParenting() {
    const thisComp = app.project.activeItem as CompItem
    const selectedLayers = thisComp.selectedLayers

    const parentToBe = selectedLayers.pop()
    const FRAME_GAP = 30 * thisComp.frameDuration

    app.beginUndoGroup("staggeredParenting")

    for (let c = 0; c < selectedLayers.length; c++) {
        const currentLayer = selectedLayers[c] as AVLayer
        currentLayer.parent = parentToBe
        thisComp.time += FRAME_GAP
        writeLn(`Parented ${currentLayer.name} at ${thisComp.time} seconds`)

    }


})()