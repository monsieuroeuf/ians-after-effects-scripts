//@target aftereffects

/**
 * Eases alternate keyframes on selected properties.
 * Part experiment, part work-in-progress.
 */

(function easeAlternateKeyframes() {
	//@include "../lib/aequery.js"

	function figureOutDimensions(prop: Property) {
		switch (prop.propertyValueType) {
			case PropertyValueType.ThreeD_SPATIAL:
			case PropertyValueType.ThreeD:
				return 3
			case PropertyValueType.TwoD_SPATIAL:
			case PropertyValueType.TwoD:
				return 2
			case PropertyValueType.OneD:
				return 1
			default:
				return 0
		}

		//$.writeln(PropertyValueType.ThreeD_SPATIAL)
	}

	function easeEmKeys(prop: Property) {

		let easeIn: KeyframeEase
		let easeOut: KeyframeEase
		// let counter = 0 // this needs to be kept separate from the loop counter, so we can skip roving keyframes

		const smooth = new KeyframeEase(0.1, 60)
		const sharp = new KeyframeEase(0.0, 0.1)

		for (let c = 1; c <= prop.numKeys; c++) {
			if (c % 2 === 0) {
				easeIn = smooth
				easeOut = sharp
			} else {
				easeIn = sharp
				easeOut = smooth
			}
			prop.setTemporalEaseAtKey(c, [easeIn], [easeOut])
		}
	}

	app.beginUndoGroup("Ease alternate keyframes")

	const selectedProperties = aeq.getSelectedProperties()

	for (const current of selectedProperties) {
		if ('propertyValueType' in current) {
			easeEmKeys(current)
		}
	}

	app.endUndoGroup()

})()