//@target aftereffects


(function saveHistory() {
	clearOutput()

	const proj = app.project
	const versionsFolder = getVersionsFolder()

	const projName: string = proj.file.name
	const projBasename: string = projName.split(".")[0]

	
	if (workingOnTheWrongFile()) {
		alert("You are working on a version of the project. Please open the master project.")
		return
	}

	proj.save()
	// keep track of this one, since we will need to re-open it
	const originalPath = proj.file.fullName
	
	const highestVersion = getNextVersionNumber()

	// save the current project as a version
	let numberFormatted = pad(highestVersion.toString(), 2, "0")
	let newName = `${projBasename}-h${numberFormatted}.aep`
	let newPath = File(versionsFolder.fullName + "/" + newName)

	// I can't figure out how to get to "Save a copy"
	app.project.save(newPath)
	app.open(File(originalPath))


	function getVersionsFolder() {
		const VERSIONS_FOLDER = "support/v_versions/"
		const pathToProject: string = proj.file.path
		const qualifiedPath = pathToProject + "/" + VERSIONS_FOLDER
		writeLn(qualifiedPath)

		// let's see if the "versions" folder is there
		const versionsFolder = Folder(qualifiedPath)
		if (!versionsFolder.exists) {
			versionsFolder.create()
		}
		return versionsFolder
	}

	function workingOnTheWrongFile() {
		const regexp = /-h\d\d\.aep$/
		if (projBasename.match(regexp)) {
			return true
		}
		return false
	}

	function getNextVersionNumber() {
		// check for versions of this project. They will have an "-h01" suffix, for example
		const versions = versionsFolder.getFiles("*.aep")

		let candidates = []
		for (let version of versions) {
			// does the version match the current project? 
			if (version.name.indexOf(projBasename) !== -1) {
				candidates.push(version)
			}
		}

		// what is the highest version number?
		let keepTrackOfHighest = 0
		let versionNumber = 0 // Default to 0 or any appropriate default value

		for (let candidate of candidates) {
			// use a regexp to match the version number
			const matchResult = candidate.name.match(/-h(\d\d)\.aep/)

			if (matchResult) {
				versionNumber = parseInt(matchResult[1], 10) // Use the first captured group
			}

			if (versionNumber > keepTrackOfHighest) {
				keepTrackOfHighest = versionNumber
			}
		}

		return keepTrackOfHighest + 1

	}

	function pad(n: string, width: number, z: string) {
		z = z || '0'
		n = n + ''
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
	}


})()
