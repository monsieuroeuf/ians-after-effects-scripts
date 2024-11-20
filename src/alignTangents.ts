/**
 * 
This script aligns the tangents between two selected keyframes in Adobe After
Effects to have identical angles. Ensure two keyframes are selected before
running the script
*/

(function alignTangents() {

	const minimumInfluence = 0.1

	const comp = app.project.activeItem // Get the active composition
	if (comp && comp instanceof CompItem) {
		const selectedLayers = comp.selectedLayers

		if (selectedLayers.length > 0) {
			app.beginUndoGroup("Align Tangents")

			for (let i = 0; i < selectedLayers.length; i++) {
				const layer = selectedLayers[i]
				const selectedProperties = layer.selectedProperties

				for (let j = 0; j < selectedProperties.length; j++) {
					const property = selectedProperties[j] as Property

					// alert(property.name);
					const keyTimes:number[] = []
					const selectedKeys = []

					for (let k = 1; k <= property.numKeys; k++) {
						if (property.keySelected(k)) {
							selectedKeys.push(k)
							keyTimes.push(property.keyTime(k))
						}
					}

					if (selectedKeys.length === 2) {
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

						const defaultInfluence = 33.3

						const storeInfluence = []

						// let inInfluence = 33.3 // Default influence value
						// let outInfluence = 33.3 // Default influence value

						const speed = valueDiff / timeDiff

						// store the influences
						for (const key of [key1, key2]) {
							type influenceObj = {in:number, out:number}
							let obj:influenceObj
							const inTemp = property.keyInTemporalEase(key) as KeyframeEase[]
							const outTemp = property.keyOutTemporalEase(key) as KeyframeEase[]

							let inInfluence = inTemp[0].influence
							let outInfluence = outTemp[0].influence

							if (inInfluence === 0) { inInfluence = minimumInfluence }
							if (outInfluence === 0) { outInfluence = minimumInfluence }

							obj.in = inTemp.length > 0 ? inInfluence : defaultInfluence
							obj.out = outTemp.length > 0 ? outInfluence : defaultInfluence

							storeInfluence.push(obj)
						}



						// get the influence from key1
						const inTemp = property.keyInTemporalEase(key1) as KeyframeEase[]
						const outTemp = property.keyOutTemporalEase(key1) as KeyframeEase[]

						if (inTemp.length > 0) {
							inInfluence = inTemp[0].influence
						}
						if (outTemp.length > 0) {
							outInfluence = outTemp[0].influence
						}

						const key1EaseIn = new KeyframeEase(speed, storeInfluence[0].in)
						const key1EaseOut = new KeyframeEase(speed, storeInfluence[0].out)
						const key2EaseIn = new KeyframeEase(speed, storeInfluence[1].in)
						const key2EaseOut = new KeyframeEase(speed, storeInfluence[1].out)

						// let key1Return: [KeyframeEase]
						// let key1Return: [KeyframeEase, ...KeyframeEase[]]
						// let key2Return: [KeyframeEase, ...KeyframeEase[]]
						// Set the tangents for the first key
						property.setTemporalContinuousAtKey(key1, true)
						property.setTemporalAutoBezierAtKey(key1, false)

						// Set the tangents for the second key
						property.setTemporalContinuousAtKey(key2, true)
						property.setTemporalAutoBezierAtKey(key2, false)

						switch (property.propertyValueType) {
							case PropertyValueType.OneD:
								writeLn("OneD")
								property.setTemporalEaseAtKey(key1, [key1EaseIn], [key1EaseOut])
								property.setTemporalEaseAtKey(key2, [key2EaseIn], [key2EaseOut])
								break
							case PropertyValueType.TwoD:
								property.setTemporalEaseAtKey(key1, [key1EaseIn, key1EaseIn], [key1EaseOut, key1EaseOut])
								property.setTemporalEaseAtKey(key2, [key2EaseIn, key2EaseIn], [key2EaseOut, key2EaseOut])
								writeLn("TwoD")
								break
							case PropertyValueType.ThreeD:
								property.setTemporalEaseAtKey(key1, [key1EaseIn, key1EaseIn, key1EaseIn], [key1EaseOut, key1EaseOut, key1EaseOut])
								property.setTemporalEaseAtKey(key2, [key2EaseIn, key2EaseIn, key2EaseIn], [key2EaseOut, key2EaseOut, key2EaseOut])
								writeLn("ThreeD")
								break
							default:
								writeLn("dunno")
						}

						// alert(influence.toString())
						// influence = 20

						// property.setTemporalEaseAtKey(key1, [new KeyframeEase(speed, influence)], [new KeyframeEase(speed, influence)])

						// property.setTemporalEaseAtKey(key2, [new KeyframeEase(speed, influence)], [new KeyframeEase(speed, influence)])
						// property.setTemporalEaseAtKey(key2, key2Return, key2Return)
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