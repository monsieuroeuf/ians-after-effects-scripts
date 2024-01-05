//@target aftereffects

/**
 * Select Strokes and Fills
 * 
 * Selects all strokes and fills on selected layers using the extremely nifty
 * aeq function. It'll descend into groups and select strokes 'n' fills at any
 * level.
 * 
 * Default is to select both strokes and fills. If you hold alt (option on Mac),
 * it'll select only strokes. If you hold shift, it'll select only fills.
 * 
 */
(function () {
	//@include "../lib/aequery.js"
	const defaultMatch = "ADBE Vector Graphic - (Stroke|Fill)"
	const strokeOnly   = "ADBE Vector Graphic - Stroke"
	const fillOnly     = "ADBE Vector Graphic - Fill"

	let searchMatch = defaultMatch

	if (ScriptUI.environment.keyboardState.altKey) {
		// if alt is held, select only strokes
		searchMatch = strokeOnly
	} else if (ScriptUI.environment.keyboardState.shiftKey) {
		// if shift is held, select only fills
		searchMatch = fillOnly
	}

	aeq(`layer[selected] propgrp[matchName=/${searchMatch}/]`).forEach((prop: Property) => {
		try {
			prop.selected = true
		} catch (error) {
		}
	})
}())
