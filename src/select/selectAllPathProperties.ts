//@target aftereffects

/**
 * Selects every "path" property on selected layers.
 */

(function selectAllPathProps() {
	//@include "../lib/aequery.js"

	app.beginUndoGroup("Select path properties")

	const comp = app.project.activeItem as CompItem
	const selectedLayers = aeq.getSelectedLayersOrAll(comp)

	for (let i = 0; i < selectedLayers.length; i++) {
		let hasPathFlag = false
		const currentLayer = selectedLayers[i]

		aeq.forEachProperty(currentLayer, (prop: Property) => {
			if (prop.name === "Path") {
				prop.selected = true
				hasPathFlag = true
			}
		})
		// deselect layer if no path property
		if (!hasPathFlag) currentLayer.selected = false
	}
}


)()