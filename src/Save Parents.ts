//@target aftereffects

/**
 * Save Parents
 * 
 * Dump a list of all layers and their parents to a JSON file on the desktop.
 * Eventually I'll use this to restore the parentage of layers after they've
 * been unparented.
 * 
 */

(function saveParents() {
    //@include "lib/underscore.js"
    //@include "lib/json2.js"

    // class to store layer and parent id
    class LayerParentMemo {
        layer: number
        parent: number | null
        constructor(layer: Layer) {
            this.layer = layer.id
            if (layer.parent === null) {
                this.parent = null
            } else {
                this.parent = layer.parent.id
            }
        }
    }

    const activeItem = app.project.activeItem as CompItem
    const allLayers = activeItem.layers

    app.beginUndoGroup("Save Parents")

    const layerParentAry = []

    // Loop through all layers and make a note of each layer's parent
    // have to use an old-fashioned loop becuase it's 1-indexed and underscore doesn't like that
    for (let i = 1; i <= allLayers.length; i++) {
        const layer = allLayers[i]
        layerParentAry.push(new LayerParentMemo(layer))
    }

    // save to a file
    const parentJSON = new File("~/Desktop/layerParents.json")
    parentJSON.lineFeed = "Unix"
    parentJSON.open("w")
    parentJSON.write(JSON.stringify(layerParentAry, null, "\t"))
    parentJSON.close()

    app.endUndoGroup()

})()