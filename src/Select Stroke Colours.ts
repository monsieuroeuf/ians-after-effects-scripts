//@target aftereffects

/**
 * Selects all "stroke colour" properties in the active composition.
 * 
 */

(function selectStrokeColours() {
	//@include "./lib/aequery.js"
	const STROKE_MATCHNAME = "ADBE Vector Stroke Color"

	app.beginUndoGroup("Select stroke colours")

	aeq.forEachProperty(aeq.getSelectedLayersOrAll(), (currentProp: Property) => {
		if (currentProp.matchName === STROKE_MATCHNAME) {
			currentProp.selected = true
		}
	})

})()
