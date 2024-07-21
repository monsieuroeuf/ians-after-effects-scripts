declare var kbar: any

(function (nextOrPrev: "prev" | "next") {

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

    let candidate: AVLayer = null
    let target: AVLayer = null

    // first make sure that the layer is not at the beginning or end of the comp
    if (destination.index === 1 && nextOrPrev === "prev") {
        alert("I am at the beginning of the comp")
        return
    } else if (destination.index === myParent.layers.length && nextOrPrev === "next") {
        alert("I am at the end of the comp")
        return
    }
    

    // let's look at its neighbour
    if (nextOrPrev === "prev") {
        // first look at the layer above this one
        candidate = myParent.layers[destination.index - 1] as AVLayer
        if (candidate.inPoint < destination.inPoint) {
            // it does indeed come before this one
            target = candidate
        }
    } else {
        target = myParent.layers[destination.index + 1] as AVLayer
    }

    const targetComp = target.source as CompItem

    targetComp.openInViewer()
    if (targetComp.time < 0) {
        targetComp.time = 0
    } else if (targetComp.time > targetComp.duration) {
        targetComp.time = targetComp.duration - targetComp.frameDuration
    }

})(kbar.button.argument)