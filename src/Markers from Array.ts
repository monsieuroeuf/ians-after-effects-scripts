//@target aftereffects

(function markersFromArray() {
    const markers = [76, 169, 206, 243, 356, 491, 611, 731, 851, 930, 1060, 1194, 1308]
	app.beginUndoGroup("Markers from Array")

	let comp = app.project.activeItem as CompItem
    // alert(comp.name)
    // comp.setGuide(100, 2)

    const one = new MarkerValue("")
    // comp.frameRate
    for (let m of markers) {
        // comp.markerProperty.setValueAtTime(m / comp.frameRate, one) 
        comp.time = m / comp.frameRate
        app.executeCommand(2158) // split layer
    }

    // alert(app.findMenuCommandId("Split Layer").toString())
    // comp.markerProperty.setValueAtTime(1, one)
	// let defaultString = IanLib.getPref(KEY_NAME)

	// let s = Window.prompt("Prefix?", defaultString)
	// IanLib.setPref(KEY_NAME, s)

})()
