//@target aftereffects
//@include "../lib/aequery.js"


(function () {
	app.beginUndoGroup("Select all descendants");
	// stuff
	function compUsedInThese(comp: any) {
		$.writeln(`The comp ${comp.name} is used in the following`);
		let names = []
		for (const current of comp.usedIn) {
			names.push(current.name)

		}
		$.writeln(names.join(", "));

		// underline()

	}
	
	let selectedComp: CompItem = aeq.project.getSelectedComps()[0];
	// $.writeln(`selected: "${selectedComp.name}"`);

	function loopOnThru(comp: CompItem) {
		// $.writeln(`got a comp with id ${comp.id}`);
		let layers = comp.layers;
		// app.project.item
		comp.selected = true;


		for (var counter = 1; counter <= layers.length; counter++) {
			var current = layers[counter] as AVLayer;
			// debugger
			if (current.source !== null) {
				// $.writeln(current.source.typeName);
				// debugger;
				// current.selected = true;

				if (current.source.typeName === "Composition") {
					// $.writeln(`${current.name} is a comp.`);
					loopOnThru(current.source);
				}
			}
			// $.writeln(`${current.name}: ${current.propertyType}`);

		}
	}

	loopOnThru(selectedComp);
	selectedComp.selected = false;



})();
