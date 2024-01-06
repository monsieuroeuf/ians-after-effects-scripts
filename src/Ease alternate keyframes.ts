//@target aftereffects

/**
 * Eases alternate keyframes on selected properties.
 * A work in progress :)
 */

(function easeAlternateKeyframes() {
	//@include "../lib/aequery.js"

	function figureOutDimensions(prop: Property) {
		switch (prop.propertyValueType) {
			case PropertyValueType.ThreeD_SPATIAL:
			case PropertyValueType.ThreeD:
				return 3
				break
			case PropertyValueType.TwoD_SPATIAL:
			case PropertyValueType.TwoD:
				return 2
				break
			case PropertyValueType.OneD:
				return 1
				break
			default:
				return 0
		}

		//$.writeln(PropertyValueType.ThreeD_SPATIAL)
	}

	function easeEmKeys(prop: Property) {

		let easeIn : KeyframeEase
		let easeOut: KeyframeEase
		var counter = 0; // this needs to be kept separate from the loop counter, so we can skip roving keyframes

		var smooth = new KeyframeEase(0.1, 60)
		var sharp = new KeyframeEase(0.0, 0.1)

		//var myPositionProperty = app.project.item(1).layer(1).property("Position") myPositionProperty.setTemporalEaseAtKey(2, [easeIn], [easeOut])


		for (var c = 1; c <= prop.numKeys; c++) {
			if (c % 2 == 0) {
				//easeIn  = KeyframeInterpolationType.BEZIER
				//easeOut = KeyframeInterpolationType.LINEAR
				easeIn = smooth
				easeOut = sharp
			} else {
				//easeIn  = KeyframeInterpolationType.LINEAR
				//easeOut = KeyframeInterpolationType.BEZIER
				easeIn = sharp
				easeOut = smooth
			}
			prop.setTemporalEaseAtKey(c, [easeIn], [easeOut])
		}
	}

	app.beginUndoGroup("Ease alternate keyframes")

	var selectedProperties = app.project.activeItem.selectedProperties
	//$.writeln(selectedProperties[0].name)

	for (var i = 0; i < selectedProperties.length; i++) {
		var current = selectedProperties[i]
		easeEmKeys(current)
	}

	app.endUndoGroup()

})()