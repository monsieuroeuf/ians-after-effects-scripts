//@target aftereffects

/**
 * 2025-04-08
 * 
 */

(function renameAndRelink() {
    const thisComp = app.project.activeItem as CompItem
    const selectedLayers = thisComp.selectedLayers

    app.beginUndoGroup("renameAndRelink")

    for (let c = 0; c < selectedLayers.length; c++) {
        const currentLayer = selectedLayers[c] as AVLayer

        if (currentLayer.source) {
            const source = currentLayer.source as FootageItem
            const sourceFile = source.file
            // alert(sourceFile.path)
            const sourceFileFolder = Folder(sourceFile.path)
            const nameWithoutExt = sourceFile.name.split('.').slice(0, -1).join('.')
            const ext = sourceFile.name.split('.').pop()

            // const destFile = new File()

            // ask for new name
            const newName = prompt("Enter new name for the file:", nameWithoutExt)
            const newNameHyphenated = newName?.replace(/ /g, "-")
            if (newName) {
                const newFile = new File(`${sourceFile.path}/${newNameHyphenated}.${ext}`)
                sourceFile.copy(newFile.fsName)
                source.replace(newFile)
                // alert(newFile.fsName)
            }

        }

    }


})()