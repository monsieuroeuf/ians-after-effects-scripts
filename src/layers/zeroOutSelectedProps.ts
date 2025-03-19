//@target aftereffects

(function zeroOutSelectedProps() {
    app.beginUndoGroup("Zero Out Selected Props")

    const project = app.project
    const comp = project.activeItem as CompItem
    const layers = comp.selectedLayers as AVLayer[]


    // make a list of props to invert
    const propsToCopy = [
        "Scale",
        "Rotation",
    ]

    for (const current of layers) {
        

        // zero position

        const positionNull = comp.layers.addNull()
        const origPosition = current.position.value
        const invertPosition = [origPosition[0] * -1, origPosition[1] * -1] as TwoDPoint
        positionNull.position.setValue([0, 0])

        current.parent = positionNull
        positionNull.position.setValue(invertPosition)

        // delete positionNull
        positionNull.remove()

        // copy other props
        const anotherNull = comp.layers.addNull()
        anotherNull.position.setValue(current.position.value)
        current.parent = anotherNull    

        for (const prop of propsToCopy) {

            const currentProp = current.property(prop) as Property
            const nullProp = anotherNull.property(prop) as Property

            switch (prop) {
                case "Scale":
                    nullProp.setValue([10000 / currentProp.value[0], 10000 / currentProp.value[1]])
                    break
                case "Rotation":
                    nullProp.setValue(currentProp.value * -1)
                    break
            }
            // nullProp.setValue(currentProp.valueAtTime(comp.time, false))
        }

        anotherNull.remove()
        current.selected = true
    }
})()

