//@target aftereffects

// Simply selects the "path" properties of the selected layers. If it exists.

(function () {
	//@include "../lib/aequery.js"
	app.beginUndoGroup("Select path properties of selected layers");

	const selectedLayers = aeq.getSelectedLayers()

	for (let currentLayer of selectedLayers) {
		let pathItems = aeq("property[name=/Path/]", currentLayer)
		for (let item of pathItems) {
			const path = item as Property<ShapeProperty>
			path.selected = true
		}
	}

})();

