//@target aftereffects

/**
 * There are many scripts out there that do this … but this is mine. It
 * distributes selected layers, by frame, starting where you have the time indicator.
 * 
 * Formerly known as distributeLayerInPoints … but now it's called staggerLayers.
 */

(function staggerLayerInPoints() {
	//@include "../lib/aequery.js"
	//@include "../lib/IanLib.js"

	function staggerInPoints() {
		// to save the settings between invocations
		const KEY_NAME = "staggerLayerInPoints"

		let defaultAmt = IanLib.getPref(KEY_NAME)
		if (defaultAmt === "") defaultAmt = "5"

		const amt = prompt("Frames between inPoints?", defaultAmt)
		if (amt == null) {
			write("User cancelled.")
			return
		}

		IanLib.setPref(KEY_NAME, amt)

		const thisComp = app.project.activeItem as CompItem
		const thisFPS = thisComp.frameRate

		const durationToStagger = currentFormatToTime(amt, thisFPS, true)

		// uncomment if you prefer seconds
		// stagger *= thisFPS

		const selectedLayers = thisComp.selectedLayers

		selectedLayers.sort((a, b) => {
			return b.index - a.index
		})

		app.beginUndoGroup("Stagger in points")

		// var beginTime = selectedLayers[0].startTime
		const beginTime = thisComp.time
		for (let c = 0; c < selectedLayers.length; c++) {
			selectedLayers[c].startTime = durationToStagger * c + beginTime
		}
	}

	staggerInPoints()

})()
