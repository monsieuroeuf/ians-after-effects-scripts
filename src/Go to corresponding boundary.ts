declare var kbar: any

(function () {

    /* 
    The idea here when you're working in a comp, and you want to zap into the
    next or previous comp in the same parent comp.

    - Designed to be used with Kbar.
    - Requires underscore.js

    Ian 2024-07-22
    */

    if (typeof kbar !== 'undefined' && kbar.button) {
        gotoBoundary(kbar.button.argument)
    } else {
        gotoBoundary("next")
    }

    function gotoBoundary(nextOrPrev: "prev" | "next") {
        //@include "lib/underscore.js"

        clearOutput()
        const thisComp = app.project.activeItem as CompItem

        // how many comps does this one belong to?
        if (thisComp.usedIn.length != 1) {
            alert("I should have ONE PARENT. I have " + thisComp.usedIn.length)
            return
        }

        const myParent = thisComp.usedIn[0]

        // make it into a regular array so I can use underscore
        let layers: Layer[] = []
        for (let c = 1; c <= myParent.layers.length; c++) {
            layers.push(myParent.layers[c])
        }

        // find the layer
        let destination = _.find(layers, (layer: AVLayer) => layer.source === thisComp) as AVLayer

        let eligibleLayers: AVLayer[] = _.filter(layers, (layer: AVLayer) => {
            return !layer.locked && layer.enabled !== false && layer.source.typeName === "Composition"
        })

        // now sort on inPoint
        eligibleLayers = _.sortBy(eligibleLayers, (layer: Layer) => layer.inPoint)

        // get index of targetLayer
        let targetIndex = _.indexOf(eligibleLayers, destination)

        // get the one before or after, depending on the argument
        nextOrPrev === "next" ? targetIndex++ : targetIndex--

        const targetComp = eligibleLayers[targetIndex].source
        targetComp.openInViewer()

        // adjust the time to the boundary
        if (targetComp.time < 0) {
            targetComp.time = 0
        } else if (targetComp.time > targetComp.duration) {
            targetComp.time = targetComp.duration - targetComp.frameDuration
        }
    }

})()