//@target aftereffects

/**
 * Selects all the "Stroke Width" properties on selected layers.
 */

(function selectStrokeWidths() {
	//@include "../lib/aequery.js"

	aeq.forEachProperty(aeq.getSelectedLayers(), (currentProp: Property) => {
		if (currentProp.name === "Stroke Width") {
			currentProp.selected = true
		}
	})
})()
