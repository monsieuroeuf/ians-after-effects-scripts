(function helloSibling() {

    /* 
    The idea here when you're working in a comp, and you want to zap into the
    next or previous comp in the same parent comp. Hello, Sibling.

    - Designed to be used with Kbar.
    - Requires underscore.js

    Ian 2024-07-22
    */

    if (typeof kbar !== 'undefined' && kbar.button) {
        HelloSibling(kbar.button.argument)
    } else {
        HelloSibling("next")
    }

    function HelloSibling(nextOrPrev: "prev" | "next") {
        //@include "lib/underscore.js"

        clearOutput()
        const thisComp = app.project.activeItem as CompItem

        // how many comps does this one belong to?
        if (thisComp.usedIn.length !== 1) {
            alert(`I should have ONE PARENT. I have ${thisComp.usedIn.length}`)
            return
        }

        const myParent = thisComp.usedIn[0]

        // make it into a regular array so I can use underscore
        const parentLayers: Layer[] = []
        for (let c = 1; c <= myParent.layers.length; c++) {
            parentLayers.push(myParent.layers[c])
        }

        // find thisComp in the parentLayers
        const thisCompInParent = _.find(parentLayers, (layer: AVLayer) => layer.source === thisComp) as AVLayer

        let eligibleLayers: AVLayer[] = _.filter(parentLayers, (layer: AVLayer) => {
            if (layer.locked || layer.enabled === false) return false
            if (layer.source && layer.source.typeName === "Composition") return true
        })

        // now sort on inPoint
        eligibleLayers = _.sortBy(eligibleLayers, (layer: Layer) => layer.inPoint)

        // get index of targetLayer
        let targetIndex = _.indexOf(eligibleLayers, thisCompInParent)

        // get the one before or after, depending on the argument
        nextOrPrev === "prev" ? targetIndex-- : targetIndex++

        // adjust the time to the boundary
        // attempt to leverage "synchronised time" in the parent comp
        if (nextOrPrev === "prev") {
            myParent.time = thisCompInParent.inPoint - 1 / myParent.frameRate
        } else {
            myParent.time = thisCompInParent.outPoint
        }

        const targetComp = eligibleLayers[targetIndex].source
        targetComp.openInViewer()


    }

})()