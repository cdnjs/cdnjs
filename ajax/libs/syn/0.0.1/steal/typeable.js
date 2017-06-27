steal("src/synthetic.js", function(Syn){
	// Holds functions that test for typeability
	var typeables = [];

	/*
	 * @function typeable
	 * Registers a function that is used to determine if an
	 * element can be typed into. The user can define as many
	 * test functions as needed. By default there are 2 typeable
	 * functions, one for inputs and textareas, and another
	 * for contenteditable elements.
	 *
	 * @param {Function} fn Function to register.
	 */
	Syn.typeable = function(fn){
		if(typeables.indexOf(fn) == -1) {
			typeables.push(fn);
		}
	};

	/*
	 * @function test
	 * Tests whether an element can be typed into using the test
	 * functions registered by [Syn.typeable typeable]. If any of the
	 * test functions returns true, `test` will return true and allow
	 * the element to be typed into.
	 *
	 * @param {HTMLElement} el the element to test.
	 * @return {Boolean} true if the element can be typed into.
	 */
	Syn.typeable.test = function(el){
		for(var i = 0, len = typeables.length; i < len; i++) {
			if(typeables[i](el)) {
				return true;
			}
		}
		return false;
	};

	var type = Syn.typeable;

	// Inputs and textareas
	var typeableExp = /input|textarea/i;
	type(function(el){
		return typeableExp.test(el.nodeName);
	});

	// Content editable
	type(function(el){
		return ["", "true"].indexOf(el.getAttribute("contenteditable")) != -1;
	});

	return Syn;
});
