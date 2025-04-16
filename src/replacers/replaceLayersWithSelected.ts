
//@target aftereffects

/**
 * 2025-04-10
 *  
 * Replaces selected layers in selected assets in the project window. You have to
 * have the same number of assets and layers selected - if you don't, the script
 * will tell you how many of each are selected. It sorts the layers and assets by
 * name before replacing them, so the first layer will be replaced by the first
 * asset, the second layer by the second asset, and so on.
 */

(function replaceLayersWithSelected() {
    app.beginUndoGroup("replaceLayersWithSelected")

    const comp = app.project.activeItem as CompItem

    const selected_layers = sortByName(comp.selectedLayers)
    const selected_assets = sortByName(app.project.selection)

    const selected_layers_length = selected_layers.length
    const selected_assets_length = selected_assets.length

    function init() {
        if (comp == null || !(comp instanceof CompItem)) {
            alert("Ensure a comp has the focus.")
            return false
        }


        if ((selected_layers_length === 0) || (selected_assets_length !== selected_layers_length)) {
            let error_string = ("Select the same number of assets and layers. ")
            error_string += `Currently: ${selected_assets_length} assets and ${selected_layers_length} layers.`
            alert(error_string)
            return false
        }
        return true
    }


    if (!init()) return false

    for (let i = 0; i < selected_layers_length; i++) {
        const currentLayer = selected_layers[i] as AVLayer
        const currentAsset = selected_assets[i] as AVItem
        currentLayer.replaceSource(currentAsset, false)
    };

    clearOutput()
    writeLn(`Replaced ${selected_layers_length} layers.`)


    function sortByName(things: Layer[] | _ItemClasses[]) {
        return things.sort((a: { name: string }, b: { name: string }): number => {
            if (a.name < b.name) return -1
            if (a.name > b.name) return 1
            return 0
        })

    }
})()