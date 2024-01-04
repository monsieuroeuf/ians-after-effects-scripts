//@target aftereffects


(function () {
	//@include "../aequery.js"
	var time_to_move = 0.6;
	app.beginUndoGroup("Select things after now");
	var comp = aeq.getActiveComp();
	var time = comp.time;

	aeq.forEachLayer(comp, (layer: Layer) => {
		if (layer.inPoint > time) {
			$.writeln(layer.name + ": move the whole layer");
			layer.selected = true;
		} else if (layer.outPoint < time) {
			$.writeln(layer.name + ": it finishes before now");
		} else {
			if (layer.locked) return;

			// we're right over it, move the keyframes and the outpoint
			// layer.outPoint += time_to_move;
			aeq.forEachProperty(layer, function (property) {
				// $.writeln(property.name);
				aeq.Property(property).forEachKey(function (key) {
					// var kt = key.getTime();
					// if (kt > time) kt += time_to_move;
				});
			});
		}
	});
	/*
	var layers_that_start_after_now = aeq("layer:not(locked)").filter(function (item) {
		return item.inPoint > time;
	});
	layers_that_start_after_now.forEach(function (layer) {
		// layer.selected = true;
		layer.startTime += time_to_move;
	});
	*/

})();
