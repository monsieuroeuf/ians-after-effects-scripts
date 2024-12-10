(function presetFromCommandLine() {

    clearOutput()

    const presetPath = $.getenv("argumentative")

    app.beginUndoGroup("presetFromCommandLine")

    const thisComp = app.project.activeItem as CompItem
    const layers = thisComp.layers
    const selectedLayers = thisComp.selectedLayers

    const fileObj = new File(presetPath)
    if (!fileObj.exists) {
        alert(`Preset "${presetPath}" does not exist`)
        return
    }

    for (let i = 0; i < selectedLayers.length; i++) {
        const currentLayer = selectedLayers[i]
        currentLayer.applyPreset(fileObj)
    }





})()