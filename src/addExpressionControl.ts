//@target aftereffects

(function addExpressionControl() {
	app.beginUndoGroup("Add Expression Control")

	const comp = app.project.activeItem as CompItem
	if (!comp) { return }

	const selLayers = comp.selectedLayers

	for (let i=1; i<selLayers.length; i++) {
		const currentLayer = selLayers[i]
		currentLayer.addProperty
	}

})()
