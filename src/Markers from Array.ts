//@target aftereffects

(function markersFromArray() {
    const markers = [66, 133, 201, 287, 428, 604, 701, 852, 1021, 1172, 1322, 1417, 1504, 1587, 1776, 1843, 1972,]
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
