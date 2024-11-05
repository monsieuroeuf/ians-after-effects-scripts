//@target aftereffects

(function setUpAnimationPreset() {
    const comp = app.project.activeItem as CompItem
    const selectedLayer = comp.selectedLayers[0]
    if (selectedLayer.length === 0) {
        alert("Please select a layer")
        return
    }

    // select all the effects on this layer
    const effects = selectedLayer.property("ADBE Effect Parade") as PropertyGroup
    for (let i = 1; i <= effects.numProperties; i++) {
        const effect = effects.property(i)
        effect.selected = true
        // if (effect.propertyType === PropertyType.PROPERTY) {
        //     // set the value of the property to the value at the current time
        //     const prop = effect as Property
        //     prop.setValueAtTime(comp.time, prop.value)
        // }
    }

    // put the name of this comp on the clipboard
    const compName = comp.name
    system.callSystem(`echo ${compName} | pbcopy`)

   app.executeCommand(3075) 
})()
