//@target aftereffects

// Figure out which layers don't have parents, and then make the last selected
// layer the parent of all of them. The logic is far from perfect, but it's
// handy for basic reordering.

(function () {
	//@include "../lib/aequery.js"
	app.beginUndoGroup("Last Selected is Parent");
	
	// save the selected layers
	const selectedLayers = aeq.getSelectedLayers()

	// get all the layers that have no parent
	// … we want to keep the hierarchy intact
	const noParentAry = aeq.getSelectedLayers().filter((layer: Layer) => {
		return layer.parent == null
	})

	// this is the last layer that you selected
	let lastSelected = selectedLayers.pop()

	// if this one has a parent, make it an orphan
	lastSelected.parent = null

	// re-parent 
	noParentAry.forEach((layer: Layer) => {
		if (layer == lastSelected) return
		layer.parent = lastSelected
	})

})();
