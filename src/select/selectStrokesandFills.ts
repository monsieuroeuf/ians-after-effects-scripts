//@target aftereffects

/**
 * 
 * Selects all strokes and fills on selected layers using the extremely nifty
 * aeq function. It'll descend into groups and select strokes 'n' fills at any
 * level.
 * 
 * Default is to select both strokes and fills. If you hold alt (option on Mac),
 * it'll select only strokes. If you hold shift, it'll select only fills.
 * 
 */

(function selectStrokesAndFills() {
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

	const propsWeWant = aeq(`propgrp[matchName=/${searchMatch}/]`) as AEQArrayEx<Property>
	propsWeWant.forEach((prop: Property) => {
		try {
			prop.selected = true
		} catch (error) {
		}
	})
}())
