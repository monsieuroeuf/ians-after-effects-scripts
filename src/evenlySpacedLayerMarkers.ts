//@target aftereffects

enum beginningTimeType {
	"layerInPoint" = 0,
	"timeIndicator" = 1
}

/**
 * Evenly Spaced Layer Markers
 */

(function evenlySpacedLayerMarkers() {
	//@include "../lib/IanLib.js"

	const activeItem = app.project.activeItem as CompItem
	const selectedLayers = activeItem.selectedLayers

	app.beginUndoGroup("Evenly spaced layer markers")

	const KEY_NAME = "EvenlySpacedLayerMarkers"
	// const PREF_NAME = "markerIncrement"

	const defaultString = IanLib.getPref(KEY_NAME)
	const markerSpacingDurationString = prompt("Enter the number of frames between markers", defaultString)
	const markerSpacingDuration = parseInt(markerSpacingDurationString)

	if (markerSpacingDuration === 0) { return }

	IanLib.setPref(KEY_NAME, markerSpacingDurationString)

	const durationInFrames = activeItem.frameDuration * markerSpacingDuration

	// default is to start markers at each layer's in point
	let beginningTimePref = beginningTimeType.layerInPoint
	let beginningTimeVal: number

	// but if alt key is down, we'll start at the current time indicator
	if (ScriptUI.environment.keyboardState.altKey) {
		beginningTimePref = beginningTimeType.timeIndicator
	}

	for (const currentLayer of selectedLayers) {
		let counter = 1

		if (beginningTimePref === beginningTimeType.layerInPoint) {
			// default: start at each layer's in point
			beginningTimeVal = currentLayer.inPoint
		} else {
			// alt key is down
			beginningTimeVal = activeItem.time
		}

		for (let currentTime = beginningTimeVal; currentTime < activeItem.duration; currentTime += durationInFrames) {
			const myMarker = new MarkerValue(counter.toString()) as MarkerValue
			const markerProp = currentLayer.property("Marker") as Property
			markerProp.setValueAtTime(currentTime, myMarker)

			counter++
		}
	}

	app.endUndoGroup()

})()