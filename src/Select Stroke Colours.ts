//@target aftereffects

/**
 * Selects all "stroke colour" properties in the active composition.
 * 
 * @todo make a speedier version.
 */

(function selectStrokeColours() {
	//@include "../lib/aequery.js"
	function firstAttempt() {
		aeq("layer[selected] propgroup[name='Stroke']", aeq.getActiveComposition()).forEach((current: Property) => {
			try {
				aeq("prop[name='Color']", current).forEach((colorProp: Property<ColorProperty>) => {

					$.writeln(colorProp);
					// debugger;
					colorProp.selected = true;
				});
			} catch (e) { $.writeln(e); }
		});
	}

	function secondAttempt() {
		aeq("prop[matchName='ADBE Vector Stroke Color']", aeq.getActiveComposition()).forEach((current: Property) => {
			$.writeln(current);
			current.selected = true;
		})
	}
	secondAttempt();
}());
