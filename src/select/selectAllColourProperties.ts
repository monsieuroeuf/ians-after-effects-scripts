﻿//@target aftereffects

/**
 * Selects all the "colour" properties in the selected layers.
 */

(function selectAllColourProperties() {
	//@include "../lib/aequery.js"
	app.beginUndoGroup("Select all the color props")
	const layers = aeq.getSelectedLayersOrAll()

	aeq.forEachProperty(layers, (currentProp: Property) => {
		if (currentProp.name.match(/color/i)) {
			try {
				currentProp.selected = true
			} catch (error) {
			}
		}
	})
})()
