﻿//@target aftereffects

// Recursively select children of selected layers.
// You can right-click on a layer and do the same thing, but this is helpful
// enough that I wanted to assign a keyboard shortcut to it.

(function () {
	//@include "../lib/aequery.js"
	app.beginUndoGroup("Select children")

	var x = aeq.getSelectedLayers()

	x.forEach((selectedLayer: Layer) => {
		var theKids = aeq.layer.allChildren(selectedLayer)
		theKids.forEach((kid: Layer) => {
			kid.selected = true
		})
	})
})()
