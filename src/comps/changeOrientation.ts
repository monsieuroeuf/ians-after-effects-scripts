//@target aftereffects

(function changeOrientation() {

	app.beginUndoGroup("Change orientation")

	const comp = app.project.activeItem as CompItem
	const [w, h] = [comp.width, comp.height]
	comp.width = h
	comp.height = w

})()
