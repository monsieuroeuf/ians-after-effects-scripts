//@target aftereffects

// Not sure what the original goal was, but I like the use of aeq

(function selectAllStrokesWithoutExpressions() {
	//@include "../lib/aequery.js"

	app.beginUndoGroup("Select all strokes without an expression")

	var layers = aeq.getSelectedLayersOrAll()

	layers.forEach((currentLayer: Layer) => {
		// omg use regular expressions with aeq
		aeq("property[name=/Stroke Width/]", currentLayer).forEach((item: Property) => {
			if (item.expressionEnabled) return
			try {
				item.selected = true
			} catch (e) {
				$.writeln(e)
			}
		})
	})
})()