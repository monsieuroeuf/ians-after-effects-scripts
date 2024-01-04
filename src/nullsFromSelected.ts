//@target aftereffects

// Creates nulls at the same position as the selected layers, and parents them
// to each. Also moves each null to be directly above the layer it's parented,
// and inherites its label.

(function () {
	//@include "../lib/aequery.js"
	app.beginUndoGroup("Nulls from selected");

	const selectedLayers = aeq.getSelectedLayers();

	let thisComp = app.project.activeItem as CompItem

	// keep track of the new nulls so we can select them all at the end
	let newNullArray: Layer[] = []

	for (var i = 0; i < selectedLayers.length; i++) {
		const current = selectedLayers[i] as Layer
		const newNull = thisComp.layers.addNull()
		newNullArray.push(newNull)

		const pos = current.transform.position.value
		newNull.transform.position.setValue(pos)

		newNull.name = `NULL ${current.name}`

		current.parent = newNull
		newNull.moveBefore(current)
		newNull.selected = true
		newNull.label = current.label
	}

	for (let layer of newNullArray) {
		layer.selected = true
	}
})()
