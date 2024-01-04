//@target aftereffects

(function () {
	app.beginUndoGroup("Toggle Draft 3D");

	let thisComp = app.project.activeItem as CompItem
	clearOutput()
	// writeLn(String(thisComp.draft3d))
	thisComp.draft3d = true
	// thisComp.draft3d = !(thisComp.draft3d)
	writeLn(String(thisComp.draft3d))
	thisComp.bgColor = [0, 0, 0]

})();
