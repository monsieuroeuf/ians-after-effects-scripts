//@target aftereffects

(function zeroTimecode() {

    app.beginUndoGroup("Zero timecode")

    const comp = app.project.activeItem as CompItem
    comp.displayStartFrame = 0
    // comp.width = h
    // comp.height = w

})()
