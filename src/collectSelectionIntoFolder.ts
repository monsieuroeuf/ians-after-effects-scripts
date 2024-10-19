//@target aftereffects

/**
 * Select some items in the project panel (comps, folders, etc) and this script
 * will collect them into a new folder with a witty and clever name of your
 * choosing.
 */

(function collectSelectionIntoFolder() {
    //@include "./lib/aequery.js"
    //@include "./lib/IanLib.js" 

    const KEY_NAME = "collectIntoFolderName"
    app.beginUndoGroup("Collect into folder")

    const projectPanelSelection = app.project.selection
    if (projectPanelSelection.length === 0) {
        alert("Select some items in the Project Panel first.")
        return
    }

    const defaultName = IanLib.getPref(KEY_NAME)
    let newFolderName = defaultName

    // if alt key is held down OR if the default name is blank
    if (ScriptUI.environment.keyboardState.altKey || newFolderName === "") {
        newFolderName = Window.prompt("New folder name?", defaultName)
        IanLib.setPref(KEY_NAME, newFolderName)
    }

    const parentOfFirstItem = projectPanelSelection[0].parentFolder
    const supportFolder = app.project.items.addFolder(newFolderName)
    supportFolder.parentFolder = parentOfFirstItem

    for (let i = 0; i < projectPanelSelection.length; i++) {
        // if (app.project.item(i) instanceof CompItem) app.project.item(i).parentFolder = supportFolder
        const current = projectPanelSelection[i]
        current.parentFolder = supportFolder
    }
    supportFolder.selected = true
    app.endUndoGroup()
})()
