(function (nextOrPrev: "above" | "below") {

    const proj = app.project
    const thisComp = app.project.activeItem as CompItem

    clearOutput()

    // how many comps does this one belong to?
    if (thisComp.usedIn.length != 1) {
        // writeLn(thisComp.usedIn[0].name)
        alert("I should have ONE PARENT. I have " + thisComp.usedIn.length)
        return
    }

    // find the layer
    const myParent = thisComp.usedIn[0]
    let destination: AVLayer = null

    for (let c = 1; c <= myParent.layers.length; c++) {
        const currentLayer = myParent.layers[c] as AVLayer
        if (currentLayer.source === thisComp) {
            destination = currentLayer
            // myParent.openInViewer()
            // myParent.time = thisLayer.time
            break
        }
    }

    let target: AVLayer = null
    // let's look at its neighbour
    if (nextOrPrev === "above") {
        target = myParent.layers[destination.index - 1] as AVLayer
    } else {
        target = myParent.layers[destination.index + 1] as AVLayer
    }

    target.source.openInViewer()

})("above")