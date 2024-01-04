//@target aftereffects

// Operates on selected layers in current comp.
// Simplify shape layers by selecting all the top-level groups … which then you can group.
// If there are no top-level groups on a layer, it will deselect it and continue looking.

// NOTE: this seems to run faster if you select all the layers? Rather than just one. Weird


(function () {

	//@include "../lib/aequery.js"
	clearOutput()

	app.beginUndoGroup("Group Groups into a Group")

	const layers = aeq.getSelectedLayers()

	for (let currentLayer of layers) {
		// check that the currentLayer.property("Contents") exists
		// if it doesn't, skip to the next layer
		if (!currentLayer.property("Contents")) {
			currentLayer.selected = false
			continue
		}

		const numProperties = currentLayer.property("Contents").numProperties
		if (numProperties === 0) continue

		for (let i = 1; i <= numProperties; i++) {
			const currentProperty = currentLayer.property("Contents").property(i)

			// I've turned off the next line to see if it makes it slightly faster.
			// I wonder if all properties at this level are groups anyway?
			// if (currentProperty.propertyType === PropertyType.PROPERTY) continue

			currentProperty.selected = true
		}
	}
})()