
(function moveSelectionIntoFolder() {
    app.beginUndoGroup("Collect in folder")
    const s = app.project.selection
    // var newFolderName = Window.prompt("New folder name?", "_support");
    const newFolderName = "_support"

    const parentOfFirstItem = s[0].parentFolder
    const supportFolder = app.project.items.addFolder(newFolderName)
    supportFolder.parentFolder = parentOfFirstItem
    // debugger;

    for (let i = 0; i < s.length; i++) {
        // if (app.project.item(i) instanceof CompItem) app.project.item(i).parentFolder = supportFolder;
        const current = s[i]
        current.parentFolder = supportFolder
    }
    supportFolder.selected = true
    // app.executeCommand(3696);
    app.endUndoGroup()
})();

