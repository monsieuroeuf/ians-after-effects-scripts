//@target aftereffects

(function resizeComps() {

    // quick resize for comps

    const newWidth = 640

    app.beginUndoGroup('Resize Comps')

    // grab the selected comps in the project panel
    const selectedComps = app.project.selection
    if (!selectedComps.length) {
        alert('Please select one or more comps in the project panel.')
        return
    }

    for (const currentComp of selectedComps) {
        if (!(currentComp instanceof CompItem)) {
            continue
        }
        const w = currentComp.width
        const h = currentComp.height

        const newHeight = Math.floor(newWidth / w * h)
        currentComp.width = newWidth
        currentComp.height = newHeight

        currentComp.openInViewer()

        for (let c = 1; c <= currentComp.numLayers; c++) {
            const currentLayer = currentComp.layer(c)
            currentLayer.selected = true

            app.executeCommand(2732) // Fit to Comp Width
            // currentLayer.scale.setValue([newWidth / w * 100, newWidth / w * 100])
            // currentLayer.xPosition.setValue(newWidth / 2)
            // currentLayer.yPosition.setValue(newHeight / 2)
        }
    }


})()