//@target aftereffects
//@include "../aequery.js"

(function() {
	function firstAttempt() {
			aeq("layer[selected] propgroup[name='Stroke']", aeq.getActiveComposition()).forEach(function (current) {
				try {
					aeq("prop[name='Color']", current).forEach(function (colorProp) {
						
						$.writeln(colorProp);
						debugger;
						colorProp.selected = true;
						});
		//~ 		current.selected = true;
				} catch(e) { $.writeln(e) }
			});
	}

	function secondAttempt() {
		aeq("prop[matchName='ADBE Vector Stroke Color']", aeq.getActiveComposition()).forEach(function (current) {
			// debugger;
			$.writeln(current);
			current.selected=true;
		})
	}

	secondAttempt();

}() );
