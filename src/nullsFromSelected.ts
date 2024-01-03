//@target aftereffects
//@include "../lib/aequery.js"


(function () {
	app.beginUndoGroup("Nulls from selected");

	const selectedLayers = aeq.getSelectedLayers();


	let thisComp = app.project.activeItem as CompItem
	for (var i = 0; i < selectedLayers.length; i++) {
		const current = selectedLayers[i] as Layer
		const newNull = thisComp.layers.addNull()

		const pos = current.transform.position.value
		newNull.transform.position.setValue(pos)

		newNull.name = `NULL ${current.name}`

		current.parent = newNull

	}
})();
