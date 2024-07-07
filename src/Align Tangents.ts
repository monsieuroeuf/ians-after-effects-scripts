// This script aligns the tangents between two selected keyframes in Adobe After Effects to have identical angles
// Ensure two keyframes are selected before running the script

(function () {

	var comp = app.project.activeItem // Get the active composition
	if (comp && comp instanceof CompItem) {
		var selectedLayers = comp.selectedLayers

		if (selectedLayers.length > 0) {
			app.beginUndoGroup("Align Tangents")

			for (var i = 0; i < selectedLayers.length; i++) {
				var layer = selectedLayers[i]
				var selectedProperties = layer.selectedProperties

				for (var j = 0; j < selectedProperties.length; j++) {
					var property = selectedProperties[j] as Property

					// alert(property.name);
					var keyTimes = []
					var selectedKeys = []

					for (var k = 1; k <= property.numKeys; k++) {
						if (property.keySelected(k)) {
							selectedKeys.push(k)
							keyTimes.push(property.keyTime(k))
						}
					}

					if (selectedKeys.length == 2) {
						const key1 = selectedKeys[0]
						const key2 = selectedKeys[1]

						const time1 = keyTimes[0]
						const time2 = keyTimes[1]

						const value1 = property.keyValue(key1)
						const value2 = property.keyValue(key2)

						const timeDiff = time2 - time1
						let valueDiff: number
						if (value1 instanceof Array) {
							valueDiff = value2[0] - value1[0]
						} else if (typeof value1 === "number") {
							valueDiff = value2 - value1
						}

						let influence = 33.3 // Default influence value

						const speed = valueDiff / timeDiff
						// get the influence from key1
						var inTemp = property.keyInTemporalEase(key1) as KeyframeEase[]
						var outTemp = property.keyOutTemporalEase(key1) as KeyframeEase[]

						if (inTemp.length > 0) {
							influence = inTemp[0].influence
						}

						let key1Ease = new KeyframeEase(speed, 50)
						let key2Ease = new KeyframeEase(speed, 50)

						let key1Return: KeyframeEase[]
						let key2Return: KeyframeEase[]

						switch (property.propertyValueType) {
							case PropertyValueType.OneD:
								writeLn("OneD")
								key1Return = [key1Ease]
								key2Return = [key2Ease]
								break
							case PropertyValueType.TwoD:
								writeLn("TwoD")
								key1Return = [key1Ease, key1Ease]
								key2Return = [key2Ease, key2Ease]
								break
							case PropertyValueType.ThreeD:
								key1Return = [key1Ease, key1Ease, key1Ease]
								key2Return = [key2Ease, key2Ease, key2Ease]
								writeLn("ThreeD")
								break
							default:
								writeLn("dunno")
						}

						// alert(influence.toString())
						influence = 20

						// Set the tangents for the first key
						property.setTemporalContinuousAtKey(key1, true)
						property.setTemporalAutoBezierAtKey(key1, false)
						property.setTemporalEaseAtKey(key1, [key1Ease, key1Ease, key1Ease], [key1Ease, key1Ease, key1Ease])
						// property.setTemporalEaseAtKey(key1, [new KeyframeEase(speed, influence)], [new KeyframeEase(speed, influence)])

						// Set the tangents for the second key
						property.setTemporalContinuousAtKey(key2, true)
						property.setTemporalAutoBezierAtKey(key2, false)
						// property.setTemporalEaseAtKey(key2, [new KeyframeEase(speed, influence)], [new KeyframeEase(speed, influence)])
						property.setTemporalEaseAtKey(key2, [key2Ease, key2Ease, key2Ease], [key2Ease, key2Ease, key2Ease])
					}
				}
			}

			app.endUndoGroup()
		} else {
			alert("No layers selected.")
		}
	} else {
		alert("No active composition.")
	}

})()