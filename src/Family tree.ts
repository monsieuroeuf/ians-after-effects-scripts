declare var kbar: any

// define an object to hold the family tree
type ancestor = {
    name: string,
    layerID: number,
    parentID: number
}

(function () {

    if (typeof kbar !== 'undefined' && kbar.button) {
        familyTree(kbar.button.argument)
    } else {
        familyTree("save")
    }


    function familyTree(saveOrRestore: "save" | "restore") {
        //@include "lib/json2.js" 
        clearOutput()

        app.beginUndoGroup("Family Tree")

        const SECTION = "com.ianhaigh"
        const KEY = "FamilyTree"

        const thisComp = app.project.activeItem as CompItem
        const layers = thisComp.layers

        if (saveOrRestore === "save") {
            save()
        } else {
            restore()
        }

        function save() {
            let memo: ancestor[] = []
            for (let c = 1; c <= layers.length; c++) {
                const currentLayer = layers[c]
                if (currentLayer.parent !== null) {
                    memo.push({ name: currentLayer.name, layerID: currentLayer.id, parentID: currentLayer.parent.id })
                }
                currentLayer.parent = null
            }

            // save it in the project
            app.preferences.savePrefAsString(SECTION, KEY, JSON.stringify(memo))
            writeLn("Familytree saved")

        }

        function restore() {
            writeLn("restoring")
            const memo = JSON.parse(app.preferences.getPrefAsString(SECTION, KEY))
            for (let item of memo) {
                const layer = app.project.layerByID(item.layerID)
                const parent = app.project.layerByID(item.parentID)
                layer.parent = parent
            }

        }
        // loop through all layers and remember the parents

        // writeLn(JSON.stringify(memo))
    }
})()