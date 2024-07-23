(function () {
    if (typeof kbar !== 'undefined' && kbar.button) {
        influencers(kbar.button.argument)
    } else {
        influencers()
    }

    interface LayerMemo {
        name: string,
        layerID: number,
        shy: boolean,
        enabled: boolean,
        locked: boolean,
        solo: boolean,
    }

    function influencers(arg?: any) {
        //@include "lib/json2.js"
        clearOutput()
        const comp = app.project.activeItem as CompItem
        const layers = comp.layers

        const SECTION = 'com.ianhaigh.influencers'
        const KEY = comp.id.toString()

        app.beginUndoGroup("Influencers")

        if (!comp) {
            alert('No active composition')
            return
        }

        // if (!comp.selectedLayers.length) {
        //     alert('No layers selected')
        //     return
        // }

        // save()
        restore()

        function save() {
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
            // alert(JSON.stringify(memo))
            app.settings.saveSetting(SECTION, KEY, JSON.stringify(memo))
            writeLn("saved")
        }

        function restore() {
            if (!app.settings.haveSetting(SECTION, KEY)) {
                alert('No settings found')
                return
            }

            const memo = JSON.parse(app.settings.getSetting(SECTION, KEY))
            if (memo.length !== layers.length) {
                alert('Number of layers has changed')
                return
            }

            for (let obj of memo) {
                const currentLayer = app.project.layerByID(obj.layerID)
                currentLayer.enabled = obj.enabled
                currentLayer.locked = obj.locked
                currentLayer.shy = obj.shy
                currentLayer.solo = obj.solo
            }
            writeLn("restored")
        }
    }
})()