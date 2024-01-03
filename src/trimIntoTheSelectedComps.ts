//@target aftereffects
//@include "../lib/aequery.js"



// bit of a one off. With nested comps selected, hack off the first 10 minutes
// (they're long boring videos) and then trim the duration to 30s. 

(function () {
	app.beginUndoGroup("Trim into selected comps");


	let thisComp = app.project.activeItem as CompItem

	let selectedLayers = thisComp.selectedLayers

	for (var c = 0; c < selectedLayers.length; c++) {
		var current = selectedLayers[c] as AVLayer
		// writeLn(current.source.name)
		let subComp = current.source as CompItem
		let subLayer = subComp.layer(1) as AVLayer

		subLayer.inPoint = 600
		subLayer.startTime = -600

		subComp.duration = 30
	}






	// alert(lay.transform.scale.value)



	// lay.selected = true

	// alert(lay.transform.scale)
	// alert(lay.name)
	// app.executeCommand(23)
	// app.executeCommand(2732)


}


)();
