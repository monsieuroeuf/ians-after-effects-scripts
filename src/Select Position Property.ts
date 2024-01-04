//@target aftereffects

(function () {
	//@include "../lib/aequery.js" 

	aeq("layer[threeDLayer] prop[name='Position']", aeq.getActiveComposition()).forEach((current: Property) => {
		try {
			current.selected = true
		} catch (error) {
			
		}
	})
}())
