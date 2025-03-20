//@target aftereffects

/**
 * Drop in keyframes at the start and end of each comp marker.
 */

(function layerMarkersToTimeRemap() {

    const thisComp = app.project.activeItem as CompItem
    const selectedLayers = thisComp.selectedLayers


    app.beginUndoGroup("Layer markers to time remap")
    clearOutput()

    // get the layer markers
    for (let c = 0; c < selectedLayers.length; c++) {
        const layer = selectedLayers[c] as AVLayer
        const markers = layer.marker as MarkerValueProperty

        // make sure time remap is enabled
        layer.timeRemapEnabled = true

        const timeRemap = layer.property("Time Remap") as Property
        // timeRemap.selected = true

        for (let i = 1; i <= markers.numKeys; i++) {
            const markerTime = markers.keyTime(i)
            const markerValue = markers.keyValue(i)
            const markerDuration = markers.keyValue(i).duration
            timeRemap.setValueAtTime(markerTime, timeRemap.valueAtTime(markerTime, false))
            timeRemap.setValueAtTime(
                markerTime + markerDuration,
                timeRemap.valueAtTime(markerTime + markerDuration, false)
            )
        }
        // alert(s)
    }

})()
