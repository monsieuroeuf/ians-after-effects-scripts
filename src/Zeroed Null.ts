//@target aftereffects

(function zeroedNull() {
	//@include "./lib/aequery.js"
	app.beginUndoGroup("Zeroed null");

	const selectedLayers = aeq.getSelectedLayers();

	let thisComp = app.project.activeItem as CompItem

	// keep track of the new nulls so we can select them all at the end
	let newNullArray: Layer[] = []

	for (const current of selectedLayers) {
		const newNull = thisComp.layers.addNull()
		newNullArray.push(newNull)

		const pos = [0,0] as TwoDPoint
		newNull.transform.position.setValue(pos)

		newNull.name = `z: ${current.name}`

		newNull.moveBefore(current)
		current.parent   = newNull
		newNull.selected = true
		newNull.label    = current.label
		newNull.transform.position.dimensionsSeparated = true
		newNull.inPoint = current.inPoint
		newNull.outPoint = current.outPoint
	}

	// select all the new nulls
	for (let layer of newNullArray) {
		layer.selected = true
	}
})()
