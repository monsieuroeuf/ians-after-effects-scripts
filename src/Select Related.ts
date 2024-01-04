//@target aftereffects

(function () {
	//@include "../aequery.js"
	app.beginUndoGroup("Select relatives");
	var x = aeq.getSelectedLayers();
	x.forEach((selectedLayer: Layer) => {
		var theKids = aeq.layer.relatedLayers(selectedLayer);
		theKids.forEach(function (kid) {
			kid.selected = true;
		});
	})

})();
