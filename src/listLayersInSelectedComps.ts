//@target aftereffects

(function listLayersInSelectedComps() {
	//@include "../lib/aequery.js"

	const DEST = '/Users/ian/tmp/ae/layers.out.txt'
	alert(Folder.userData.fullName)

	const f = new File(DEST)
	f.lineFeed = "Unix"
	f.open("w")

	let allComps = app.project.selection

	for (var c = 0; c < allComps.length; c++) {
		var current = allComps[c];
		if (current instanceof CompItem) {
			writeLn(current.name)

		}
	}


	f.close()


})();
