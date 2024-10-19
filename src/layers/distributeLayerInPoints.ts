//@target aftereffects

/**
 * There are many scripts out there that do this … but this is mine. It
 * distributes selected layers, by frame, starting where you have the time indicator.
 */

(function distributeLayerInPoints() {
	//@include "../lib/aequery.js"
	//@include "../lib/IanLib.js"

	function distributeInPoints() {
		// to save the settings between invocations
		const KEY_NAME = "distributeLayerInPoints"

		let defaultAmt = IanLib.getPref(KEY_NAME)
		if (defaultAmt === "") defaultAmt = "5"

		const amt = prompt("Frames between inPoints?", defaultAmt)
		if (amt == null) {
			write("User cancelled.")
			return
		}
		
		IanLib.setPref(KEY_NAME, amt)

		const thisComp = app.project.activeItem as CompItem
		const thisFPS  = thisComp.frameRate

		const durationToDistribute = currentFormatToTime(amt, thisFPS, true)

		// uncomment if you prefer seconds
		// durationToDistribute *= thisFPS

		const selectedLayers = thisComp.selectedLayers

		selectedLayers.sort((a, b) => {
			return b.index - a.index
		})

		app.beginUndoGroup("Distribute in points")

		// var beginTime = selectedLayers[0].startTime
		const beginTime = thisComp.time
		for (let c = 0; c < selectedLayers.length; c++) {
			selectedLayers[c].startTime = durationToDistribute * c + beginTime
		}
	}

	distributeInPoints()

})()
