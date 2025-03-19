(function deleteEmptyFolders() {
    // Returns true if the folder has no child items.
    function isEmptyFolder(folder: FolderItem): boolean {
        for (let i = 1; i <= app.project.numItems; i++) {
            const item = app.project.item(i)
            if (item !== folder && item.parentFolder && item.parentFolder.id === folder.id) {
                return false
            }
        }
        return true
    }

    app.beginUndoGroup("Delete Empty Folders")

    let foundEmptyFolder = true
    // Loop until no empty folders remain.
    while (foundEmptyFolder) {
        foundEmptyFolder = false

        // Iterate in reverse order to avoid indexing issues when removing items.
        for (let i = app.project.numItems; i >= 1; i--) {
            const item = app.project.item(i)
            if (item instanceof FolderItem && isEmptyFolder(item)) {
                item.remove()
                foundEmptyFolder = true
            }
        }
    }

    app.endUndoGroup()
    // alert("Empty folders removed.")
})()