//@target aftereffects


(function toggleCompShy() {
    const thisComp = app.project.activeItem as CompItem
    thisComp.hideShyLayers = !thisComp.hideShyLayers
})()
