//@target aftereffects
//@include "../aequery.js"

(function() {
	aeq("layer[selected] prop[name='Stroke Width']", aeq.getActiveComposition()).forEach(function (current) {
		current.selected = true;
	});

}() );
