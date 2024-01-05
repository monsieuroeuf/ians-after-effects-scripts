//@target aftereffects

/**
 * Creates nulls at the same position as the selected layers, and parents them
 * to each. Also moves each null to be directly above the layer it's parented
 * to, and inherits its label.
*/

(function nullsFromSelected() {
	//@include "../lib/aequery.js"
	app.beginUndoGroup("Nulls from selected");

	const selectedLayers = aeq.getSelectedLayers();

	let thisComp = app.project.activeItem as CompItem

	// keep track of the new nulls so we can select them all at the end
	let newNullArray: Layer[] = []

	for (let current of selectedLayers) {
		const newNull = thisComp.layers.addNull()
		newNullArray.push(newNull)

		const pos = current.transform.position.value
		newNull.transform.position.setValue(pos)

		newNull.name = `NULL ${current.name}`

		newNull.moveBefore(current)
		current.parent   = newNull
		newNull.selected = true
		newNull.label    = current.label
	}

	// select all the new nulls
	for (let layer of newNullArray) {
		layer.selected = true
	}
})()
