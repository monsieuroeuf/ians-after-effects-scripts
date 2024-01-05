//@target aftereffects

/**
 * Selects all the "colour" properties in the selected layers.
 * 
 * @todo make a speedier version, i.e. not using css-style selector
 */

(function selectAllColourProperties() {

	//@include "../lib/aequery.js"
	app.beginUndoGroup("Select all the color props")
	var layers = aeq.getSelectedLayersOrAll()

	layers.forEach((layer: Layer) => {
		// omg use regular expressions with aeq
		aeq("property[name=/Color/]", layer).forEach((item: Property) => {
			// $.writeln(item)
			try {
				item.selected = true
			} catch (error) {
			}
		})
	})
})()