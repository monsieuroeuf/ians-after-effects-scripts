//@target aftereffects

/**
 * If you apply a preset that contains keyframes, it will apply them at the
 * current time. If you want to apply to several layers that have different in
 * points, you have to do it manually. This will quickly apply a preset at the
 * beginning of each selected layer.
 * 
 * Select the layers you want to apply the preset to, run the script, and choose
 * the preset using the file dialog.
 */

(function applyPresetAtBeginningOfSelectedLayers() {
	//@include "../lib/aequery.js"

	const preset = File.openDialog("Choose a preset (ffx file)", undefined, false)
	if (!preset) return

	app.beginUndoGroup("Apply Preset at Beginning of Selected")

	const comp               = app.project.activeItem as CompItem
	const originallySelected = aeq.getSelectedLayers()
	const originalTime       = comp.time

	// deselect all
	aeq.forEach(originallySelected, (currentLayer: Layer) => {
		currentLayer.selected = false
	})

	aeq.forEach(originallySelected, (currentLayer: Layer) => {
		currentLayer.selected = true
		comp.time = currentLayer.inPoint
		
		currentLayer.applyPreset(preset)
		currentLayer.selected = false
	})

	// reselect all
	aeq.forEach(originallySelected, (currentLayer: Layer) => {
		currentLayer.selected = true
	})
	comp.time = originalTime


})()