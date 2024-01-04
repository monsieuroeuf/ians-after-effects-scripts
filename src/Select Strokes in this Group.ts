//@target aftereffects
//@include "../aequery.js"

(function() {
	// aeq("layer[selected] prop[name='Stroke Width']", aeq.getActiveComposition()).forEach(function (current) {
		// current.selected = true; });

		/*
	aeq.snippet.forEachSelectedProperty("select stuff", function (prop) {
		console.log(prop.name);
	});
	*/

	// var selectedProperty = aeq.getSelectedProperties(aeq.getActiveComposition());
	// var matchingProps = aeq("prop[matchName='ADBE Vector Graphic - Stroke']", selectedProperty);
	// var thisComp = aeq.getActiveComposition();
	FILL = "ADBE Vector Graphic - Fill";
	STROKE = "ADBE Vector Graphic - Stroke";

	var sel =  aeq.getSelectedProperties()[0];
	var lay = aeq.getSelectedLayers(aeq.getActiveComposition()[0]);

	
	sel.selected = false;
	var ary = aeq.getPropertyChildren(sel, {groups:true}).reverse();
	aeq.forEach(ary, function (item) {
		if (item.matchName == STROKE || item.matchName == FILL) {
			$.writeln(item.matchName);
			// item.remove();
			item.selected = true;
		}
	});
	// $.writeln(ary.length);


//~ 	aeq("prop:is(selected)", lay).forEach(function (prop) {
//~ 		debugger;
//~ 		$.writeln(prop.name);

//~ 		if (prop.matchName == "ADBE Vector Graphic - Fill") {
//~ 			$.writeln("yay");
//~ 			// kill.push(prop);
//~ 			// prop.remove();
//~ 		}
//~ 	});

	
	// debugger;

//~ 	debugger;
/*
	aeq.forEachProperty(lay, function (haha) {
		$.writeln(haha.matchName);
		if (haha.matchName == "ADBE Vector Graphic - Fill") {
			haha.selected = true;
		}
	});
	*/

	// $.writeln(thisComp.name);
	// debugger;
	// var matchingProps = aeq("prop[matchName='ADBE Vector Graphic - Fill']", aeq.getSelectedProperties()[0]); // not working
	// var matchingProps = aeq("prop[name='Fill 1']"); 
//~ 	var banana = aeq("layer[selected]", aeq.getActiveComposition());
	// $.writeln(matchingProps.length);
//~ 	$.writeln(banana[0].name);
	
}() );
