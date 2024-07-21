//@target aftereffects



(function saveHistory() {
	function pad(str: string, targetLength: number, padChar: string = '0'): string {
		while (str.length < targetLength) {
			str = padChar + str
		}
		return str
	}

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
		if (projBasename.indexOf("-h") !== -1) {
			return true
		}
	}

	function getNextVersionNumber() {
		// check for versions of this project. They will have an "-h01" suffix, for example
		const versions = versionsFolder.getFiles("*.aep")

		let candidates = []
		for (let version of versions) {
			// does the version match the current project? 
			// writeLn(version.name.indexOf(projBasename).toString())
			if (version.name.indexOf(projBasename) !== -1) {
				candidates.push(version)
			}
			// writeLn(version.name)
		}

		// what is the highest version number?
		let currentHigh = 0
		let versionNumber = 0 // Default to 0 or any appropriate default value

		for (let candidate of candidates) {
			// use a regexp to match the version number
			const matchResult = candidate.name.match(/-h(\d+)/)

			if (matchResult) {
				versionNumber = parseInt(matchResult[1], 10) // Use the first captured group
			}

			writeLn(parseInt(matchResult[1]).toString())


			// let versionNumber = parseInt(candidate.name.split("-h")[1])
			if (versionNumber > currentHigh) {
				currentHigh = versionNumber
			}
		}

		writeLn("it is " + currentHigh.toString())
		return currentHigh + 1

	}


	clearOutput()


	const proj = app.project
	const versionsFolder = getVersionsFolder()

	const projName: string = proj.file.name
	const projBasename: string = projName.split(".")[0]


	if (workingOnTheWrongFile()) {
		alert("You are working on a version of the project. Please open the master project.")
		return
	}

	const highestVersion = getNextVersionNumber()


	// save the current project as a version
	let numberFormatted = pad(highestVersion.toString() + 1, 2, "0")
	let neName = `${projBasename}-h${numberFormatted}.aep`
	let newPath = File(versionsFolder.fullName + "/" + neName)

	writeLn(newPath.fullName)
	// writeLn(newVersionName)
	// alert(newVersionPath.path)

	// app.project.save(newVersionPath)



	// look 


	// let defaultString = IanLib.getPref(KEY_NAME)

	// let s = Window.prompt("Prefix?", defaultString)
	// IanLib.setPref(KEY_NAME, s)

	// for (let currentComp of selectedComps) {
	// currentComp.name = `${s}${currentComp.name}`
	// }
})()
