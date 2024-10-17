//@target aftereffects

/**
 * Select a bunch of layers and the last selected layer will be the matte for the rest.
 * Defaults to alpha matte … for now.
 */

(function lastSelectedIsMatte() {
    //@include "./lib/aequery.js"
    app.beginUndoGroup("Last Selected is Matte")

    // save the selected layers
    const selectedLayers = aeq.getSelectedLayers() as AEQArrayEx<Layer>

    // this is the last layer that you've selected
    const lastSelected = selectedLayers.pop()

    if (lastSelected instanceof AVLayer === false) {
        alert("Last selected layer must be an AVLayer")
        return
    }

    // biome-ignore lint/complexity/noForEach: <explanation>
    selectedLayers.forEach((currentLayer: AVLayer) => {
        currentLayer.setTrackMatte(lastSelected, TrackMatteType.ALPHA)
    })

})()
