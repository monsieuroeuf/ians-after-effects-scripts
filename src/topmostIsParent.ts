//@target aftereffects
//@include "../lib/aequery.js"


(function () {
	app.beginUndoGroup("Topmost if parent");
	// stuff

	aeq.getSelectedLayers().forEach((layer: Layer) => {
		layer.parent = null;
	})

	if (!app.project || !app.project.activeItem) { return }

	let activeComp = app.project.activeItem as CompItem
	var selectedLayers = activeComp.selectedLayers

	let sorted = selectedLayers.sort((a, b) => {
		return a.index - b.index

	})

	let topLayer = sorted[0]

	let l = selectedLayers[0] as Layer

	for (var i = 0; i < selectedLayers.length; i++) {
		var current = selectedLayers[i];
		
		// hide if the shift key is down
		if (ScriptUI.environment.keyboardState.shiftKey) {
			current.enabled = false

		}
		if (current === topLayer) { continue }

		current.parent = topLayer
		//   $.writeln(current.name);
	}
})();
