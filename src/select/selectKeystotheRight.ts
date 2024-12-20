﻿//@target aftereffects

/**
 * With each selected property, select keys to the right of the current time.
 * Deselect keys to the left.
 */

(function selectKeysToTheRight() {
	//@include "../lib/aequery.js"

	const comp        = aeq.getActiveComposition()
	const selProps    = aeq.getSelectedProperties(comp) as AEQArrayEx<Property>
	const allKeys     = aeq.getKeys(selProps)
	const currentTime = comp.time

	aeq.forEach(allKeys, (currentKey: AEQKey) => {
		if (currentKey.time() > currentTime) {
			currentKey.selected(true)
		} else {
			currentKey.selected(false)
		}
	})
	
})()