//@target aftereffects

enum beginningTimeType {
	"layerInPoint",
	"timeIndicator"
}

/**
 * Evenly Spaced Layer Markers
 */

(function evenlySpacedLayerMarkers() {
	//@include "./IanLib.js"

	const activeItem = app.project.activeItem as CompItem
	const selectedLayers = activeItem.selectedLayers

	app.beginUndoGroup("Evenly spaced layer markers")

	const KEY_NAME = "EvenlySpacedLayerMarkers"
	// const PREF_NAME = "markerIncrement"

	let defaultString = IanLib.getPref(KEY_NAME)
	let markerSpacingDurationString = prompt("Enter the number of frames between markers", defaultString)
	let markerSpacingDuration = parseInt(markerSpacingDurationString)

	if (markerSpacingDuration === 0) { return }

	IanLib.setPref(KEY_NAME, markerSpacingDurationString)

	var durationInFrames = activeItem.frameDuration * markerSpacingDuration

	// default is to start markers at each layer's in point
	let beginningTimePref = beginningTimeType.layerInPoint
	let beginningTimeVal: number

	// but if alt key is down, we'll start at the current time indicator
	if (ScriptUI.environment.keyboardState.altKey) {
		beginningTimePref = beginningTimeType.timeIndicator
	}

	for (let currentLayer of selectedLayers) {
		var counter = 1

		if (beginningTimePref == beginningTimeType.layerInPoint) {
			// default: start at each layer's in point
			beginningTimeVal = currentLayer.inPoint
		} else {
			// alt key is down
			beginningTimeVal = activeItem.time
		}

		for (var currentTime = beginningTimeVal; currentTime < activeItem.duration; currentTime += durationInFrames) {
			var myMarker = new MarkerValue(counter.toString()) as MarkerValue
			let markerProp = currentLayer.property("Marker") as Property
			markerProp.setValueAtTime(currentTime, myMarker)

			counter++
		}
	}

	app.endUndoGroup()

})()