interface Influencer {
    compID: number,
    underTheInfluence: boolean,
    layers: LayerMemo[]
}

interface LayerMemo {
    name: string,
    layerID: number,
    shy: boolean,
    enabled: boolean,
    locked: boolean,
    solo: boolean,
}

(function () {
    clearOutput()
    if (typeof kbar !== 'undefined' && kbar.button) {
        if (kbar.button.argument === "save") {
            writeLn("forceSave: true")
            influencers(true)
            return
        }
    }

    influencers(false)

    function influencers(forceSave: boolean) {
        writeLn("forceSave: " + forceSave.toString())
        //@include "lib/json2.js"
        const comp = app.project.activeItem as CompItem
        const layers = comp.layers

        const SECTION = 'com.ianhaigh.influencers'
        const KEY = comp.id.toString()

        app.beginUndoGroup("Influencers")

        if (!comp) {
            alert('No active composition')
            return
        }

        if (forceSave) {
            // just save the current state and get out
            save()
            return
        }

        // is this comp under the influence?
        if (app.settings.haveSetting(SECTION, KEY)) {
            const influenceMemo: Influencer = JSON.parse(app.settings.getSetting(SECTION, KEY))
            if (influenceMemo.underTheInfluence) {
                restore()
                return
            }
        }

        // otherwise – save
        save()
        writeLn("did I even get here?")
        revealTheInfluence()

        // if (!comp.selectedLayers.length) {
        //     alert('No layers selected')
        //     return
        // }

        function revealTheInfluence() {
            writeLn("revealTheInfluence")
            // shy all the layers
            for (let c = 1; c <= layers.length; c++) {
                const currentLayer = layers[c]
                currentLayer.shy = true
            }

            // look at the ancestors of the selected layers
            for (let layer of comp.selectedLayers) {
                let parent = layer
                layer.solo = true
                layer.shy = false
                layer.locked = false
                while (parent.parent !== null) {
                    parent = parent.parent
                    parent.solo = true
                    parent.shy = false
                }
            }

            comp.hideShyLayers = true
        }

        function save() {
            writeLn("saving")
            let influenceMemo: Influencer = null
            let memo: LayerMemo[] = []

            for (let c = 1; c <= layers.length; c++) {
                const currentLayer = layers[c]

                const obj: LayerMemo = {
                    name: currentLayer.name,
                    layerID: currentLayer.id,
                    shy: currentLayer.shy,
                    enabled: currentLayer.enabled,
                    locked: currentLayer.locked,
                    solo: currentLayer.solo,
                }

                memo.push(obj)
            }
            influenceMemo = {
                compID: comp.id,
                underTheInfluence: true,
                layers: memo
            }
            // alert(JSON.stringify(memo))
            app.settings.saveSetting(SECTION, KEY, JSON.stringify(influenceMemo))
            writeLn("saved")
        }

        function restore() {
            writeLn("restoring")

            const influenceMemo: Influencer = JSON.parse(app.settings.getSetting(SECTION, KEY))
            if (influenceMemo.layers.length !== layers.length) {
                alert('Number of layers has changed')
                return
            }

            for (let obj of influenceMemo.layers) {
                writeLn(obj.name)
                const currentLayer = app.project.layerByID(obj.layerID)
                currentLayer.enabled = obj.enabled
                !!currentLayer.enabled && (currentLayer.solo = obj.solo  )
                // currentLayer.solo = obj.solo
                currentLayer.locked = obj.locked
                currentLayer.shy = obj.shy
            }

            influenceMemo.underTheInfluence = false
            app.settings.saveSetting(SECTION, KEY, JSON.stringify(influenceMemo))
            comp.hideShyLayers = false
            // writeLn("restored")
        }
    }
})()