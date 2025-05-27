//@target aftereffects

/**
 */

(function freezeHere() {

    const thisComp = app.project.activeItem as CompItem
    const selectedLayers = thisComp.selectedLayers

    app.beginUndoGroup("Freeze here")
    clearOutput()

    for (let c = 0; c < selectedLayers.length; c++) {
        const layer = selectedLayers[c] as AVLayer

        // make sure time remap is enabled
        layer.timeRemapEnabled = true
        const timeRemap = layer.property("Time Remap") as Property

        timeRemap.setValueAtTime(
            layer.time,
            timeRemap.valueAtTime(layer.time, false)
        )
        timeRemap.removeKey(3)

    }
    // alert(s)
}

)()
