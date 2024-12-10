/* 
Family Tree for After Effects

This script is designed to temporarily isolate layers in a comp.

It remembers all the parenting in the current comp, then hides all the layers
except the selected ones and their parents – so you can see what they're being
influenced by.

I wired this up to kbar, so the default action is to save the current state.
Then make a new button that is activated using a modifier (I use the command
key) that will restore the state.

*/

// define an object to hold the family tree
type FamilyTree = {
    compID: string,
    compName: string,
    compTime: number,
    memo: Ancestor[]
}

type Ancestor = {
    layerID: number,
    parentID: number,
    name: string
}


(function familyTree() {

    if (typeof kbar !== 'undefined' && kbar.button) {
        familyTree(kbar.button.argument)
    } else if ($.getenv("argumentative") === "restore") {
        familyTree("restore")
    } else {
        familyTree("save")
    }

    function familyTree(saveOrRestore: "save" | "restore") {
        //@include "lib/json2.js" 
        clearOutput()

        app.beginUndoGroup("Family Tree")

        const SECTION = "com.ianhaigh.familytree"
        const KEY = "FamilyTree"

        const thisComp = app.project.activeItem as CompItem
        const layers = thisComp.layers

        if (saveOrRestore === "save") {
            saveState()
        } else {
            restoreState()
        }

        function saveState() {
            const tree: FamilyTree = {
                compID: thisComp.id.toString(),
                compName: thisComp.name,
                compTime: thisComp.time,
                memo: []
            }
            const memo: Ancestor[] = []
            for (let c = 1; c <= layers.length; c++) {
                const currentLayer = layers[c]
                if (currentLayer.parent !== null) {
                    memo.push({ name: currentLayer.name, layerID: currentLayer.id, parentID: currentLayer.parent.id })
                    currentLayer.parent = null
                }
            }

            tree.memo = memo

            // save it in the project
            app.preferences.savePrefAsString(SECTION, KEY, JSON.stringify(tree))
            writeLn("Familytree saved")

        }

        function restoreState() {
            writeLn("restoreState")
            const tree: FamilyTree = JSON.parse(app.preferences.getPrefAsString(SECTION, KEY))
            // alert(JSON.stringify(tree))
            const memo = tree.memo

            if (typeof memo === 'undefined') {
                writeLn("No family tree found")
                return
            }

            thisComp.time = tree.compTime

            for (const item of memo) {
                const layer = app.project.layerByID(item.layerID)
                const parent = app.project.layerByID(item.parentID)
                layer.parent = parent
            }
            writeLn("Familytree restored")

        }
        // loop through all layers and remember the parents

        // writeLn(JSON.stringify(memo))
    }
})()