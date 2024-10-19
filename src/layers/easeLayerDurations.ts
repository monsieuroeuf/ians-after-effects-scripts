//@target aftereffects

type EaseFunction = (t: number, b: number, c: number, d: number) => number

/**
 * Select a group of layers and this will adjust the in and out points so that
 * their overall duration eases out exponentially. Play with the constants at
 * the top of the file to get different results.
 */

(function easeLayerDurations() {
	//@include "../lib/aequery.js"

	// fiddle around with these settings for different results
	const TOTAL_DURATION = 22.0
	const BEGINNING      = 0
	const END            = 15

	let currentTime = BEGINNING

	const quadEaseOut: EaseFunction = (t, b, c, d) => {
		if (t === d) { return c }
		return -c * (t /= d) * (t - 2) + b
	}

	const quintEaseOut: EaseFunction = (t, b, c, d) => {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b
	}

	const sineEaseOut: EaseFunction = (t, b, c, d) => {
		return c * Math.sin(t / d * (Math.PI / 2)) + b
	}

	const expoEaseOut: EaseFunction = (t, b, c, d) => {
		return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
	}

	// change the function here to get different easing
	const tween: EaseFunction = (t, b, c, d) => {
		// return expoEaseOut(t, b, c, d)
		return quintEaseOut(t, b, c, d)
	}

	app.beginUndoGroup("Ease Layer Durations")

	const selectedLayers = aeq.getSelectedLayersOrAll()
	const increment      = (TOTAL_DURATION / selectedLayers.length) * 0.5

	for (const currentLayer of selectedLayers) {

		const inPoint  = tween(currentTime, BEGINNING, END, TOTAL_DURATION)
		const outPoint = tween(currentTime + increment, BEGINNING, END, TOTAL_DURATION)

		currentLayer.inPoint   = inPoint
		currentLayer.outPoint  = outPoint
		currentTime           += increment
	}

})()
