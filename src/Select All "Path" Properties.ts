//@target aftereffects

// Selects each "path" property of the selected layers

(function () {

	//@include "../lib/aequery.js"

	app.beginUndoGroup("Select path properties")
	var layers = aeq.getSelectedLayersOrAll()

	layers.forEach((layer: Layer) => {
		aeq("prop[name='Path']", layer).forEach((item: Property) => {
			// $.writeln(item);
			item.selected = true;
		});
	});

})()