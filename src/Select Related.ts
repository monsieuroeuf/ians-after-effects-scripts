//@target aftereffects

(function () {
	//@include "../lib/aequery.js"
	app.beginUndoGroup("Select related");

	const selectedLayers = aeq.getSelectedLayers();

	selectedLayers.forEach((currentLayer: Layer) => {
		// alert(currentLayer.name)
		var allRelatives = aeq.layer.relatedLayers(currentLayer);
		// alert(allRelatives.length)
		allRelatives.forEach((kid: Layer) => {
			kid.selected = true;
		});
	})

})();
