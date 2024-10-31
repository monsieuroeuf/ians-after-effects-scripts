//@target aftereffects

/**
 * Select a property and run this script to add all effects on the property's layer to the expression.
 */

(function addEffectToExpression() {

	function sanitise(str: string) {
		// remove whitespace
		return str.replace(/\s/g, '')
	}

	app.beginUndoGroup("Add effect to expression")

	const comp = app.project.activeItem as CompItem
	// const selectedLayers = comp.selectedLayers
	const selectedProperties = comp.selectedProperties

	// for (const layer of selectedLayers) {
	for (const prop of selectedProperties) {
		const currentProp = prop as Property

		// examine the property's layer for a slider control effect
		// const sliderEffect = currentProp.containingLayer.Effects.property("Slider Control")
		// while (typeof currentProp.propertyGroup typ)
		const parentLayer = currentProp.propertyGroup(currentProp.propertyDepth) as AVLayer
		// const sliderEffect = parentLayer.Effects.property("Slider Control")

		// list all the properties of the parent layer
		const effect = parentLayer.effect(1) as PropertyGroup
		const numOfEffects = effect.numProperties
		writeLn(`num of effects: ${numOfEffects}`)

		let expression = ''

		for (let i = 1; i <= numOfEffects; i++) {
			const currentEffect = effect.property(i) as Property
			if (currentEffect.matchName === 'ADBE Effect Built In Params') { continue }

			expression += `const my${sanitise(currentEffect.name)} = effect("${effect.name}")("${currentEffect.name}");\n`
		}

		expression += "value // default"

		if (currentProp.canSetExpression) {
			currentProp.expression = expression
		}
	}
	// }

})()