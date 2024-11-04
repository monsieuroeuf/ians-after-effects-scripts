(function importAsComp(){
    const proj = app.project
    if (!proj) return

    // if a folder is selected, that's our destination
    const dest = proj.selection.length > 0 && proj.selection[0] instanceof FolderItem
        ? proj.selection[0]
        : proj.rootFolder
    
    // choose an asset to import
    const file = File.openDialog('Choose a file to import') as File
    if (!file) return

    // construct the import options
    const importOptions = new ImportOptions(file)
    importOptions.sequence = false
    importOptions.importAs = ImportAsType.COMP


    // import the asset
    proj.importFile(importOptions)

})()