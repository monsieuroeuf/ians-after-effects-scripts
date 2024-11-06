//@target aftereffects

/**
 * Asks for a prefix, and renames each layer to that prefix, with a number.
 * e.g. with the prefix "foo", the layers would be named "foo:1", "foo:2", etc.
*/

(function quickRenamer() {
    //@include "./lib/aequery.js"
    //@include "./lib/IanLib.js"

    app.beginUndoGroup("Quick Renamer")
    const KEY_NAME = "quickRenamer"

    const defaultString = IanLib.getPref(KEY_NAME)
    const newName = prompt("Layer prefix?", defaultString)

    IanLib.setPref(KEY_NAME, newName)

    function renameThem(items: Layer[] | _ItemClasses[]) {
        for (let i = 0; i < items.length; i++) {
            const currentItem = items[i]
            currentItem.name = `${defaultString}:${i}`
        }
    }

    // find out if project window or comp has focus
    const proj = app.project
    const comp = proj.activeItem as CompItem

    let selectedItems: _ItemClasses[] | Layer[] = []
    if (comp && comp.selectedLayers.length > 0) {
        // it's a project window
        selectedItems = proj.selection
    } else if (proj && proj.selection.length > 0) {
        selectedItems = comp.selectedLayers

    }

    // let selectedLayers = aeq.getSelectedLayers()

    // let s = Window.prompt("Prefix?", defaultString)
    // IanLib.setPref(KEY_NAME, s)

    // let counter = 1

    // for (let currentLayer of selectedItems) {
    //     currentLayer.name = `${s}:${counter}`
    //     counter++
    // }
    renameThem(selectedItems)
})()
