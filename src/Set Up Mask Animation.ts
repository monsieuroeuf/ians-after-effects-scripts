//@target aftereffects

/**
 * 
 * This adds default masks to each selected layer, then keyframes the mask shape
 * twice: *now*, and KEYFRAME_DISTANCE from now. Plus position property. Then you
 * can use the "pan behind" tool to move the layer, creating a little
 * self-contained reveal. Neat!
 */

(function setupMaskAnimation() {
	// the time between keyframes in seconds
	const KEYFRAME_DISTANCE = 1;

	app.beginUndoGroup("Set up mask animation");

	let comp = app.project.activeItem as CompItem;
	let layers = comp.selectedLayers;

	// deselect them all, menu command only works on one at a time
	for (const layer of layers) layer.selected = false;

	// add masks to each by using the menu command
	for (const layer of layers) {
		layer.selected = true;

		// "new mask"
		app.executeCommand(2367);

		// deselect to set up for the next one
		layer.selected = false;
	}

	for (const currentLayer of layers) {
		// select each layer so it matches the initial state
		currentLayer.selected = true;

		// now add two keyframes
		let mask = currentLayer.property("Masks").property("Mask 1").property("Mask Path") as Property
		let maskValue = mask.valueAtTime(comp.time, false);
		mask.setValueAtTime(comp.time, maskValue);
		mask.setValueAtTime(comp.time + KEYFRAME_DISTANCE, maskValue);

		// now add two keyframes to the position
		if (currentLayer.position.dimensionsSeparated) {
			let xPos = (currentLayer.property("Transform").property("X Position") as Property)
			let yPos = (currentLayer.property("Transform").property("Y Position") as Property)

			xPos.setValueAtTime(comp.time, xPos.value);
			yPos.setValueAtTime(comp.time, yPos.value);

			xPos.setValueAtTime(comp.time + KEYFRAME_DISTANCE, xPos.value);
			yPos.setValueAtTime(comp.time + KEYFRAME_DISTANCE, yPos.value);
		} else {
			let pos = currentLayer.position.value;
			currentLayer.position.setValueAtTime(comp.time, pos);
			currentLayer.position.setValueAtTime(comp.time + KEYFRAME_DISTANCE, pos);
		}
	}
})();
