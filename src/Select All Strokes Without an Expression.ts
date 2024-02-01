//@target aftereffects

/**
 * Selects all strokes without an expression. Not sure what the original goal
 * was, but I like the use of `aeq()`, so here it stays.
 */

(function selectStrokesWithoutExpression() {
	//@include "./lib/aequery.js"

	app.beginUndoGroup("Select all strokes without an expression")

	var layers = aeq.getSelectedLayersOrAll()

	layers.forEach((currentLayer: Layer) => {
		// omg use regular expressions with aeq
		const propsWeWant = aeq("property[name=/Stroke Width/]", currentLayer) as AEQArrayEx<Property>

		propsWeWant.forEach((item: Property) => {
			if (item.expressionEnabled) return
			try {
				item.selected = true
			} catch (e) {
				$.writeln(e)
			}
		})
	})
})()