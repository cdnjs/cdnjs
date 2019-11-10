/*!
 * KeyboardJS
 * 
 * Copyright 2011, Robert William Hurst
 * Licenced under the BSD License.
 * See https://raw.github.com/RobertWHurst/KeyboardJS/master/license.txt
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals
        root.KeyboardJS = factory();
    }
}(this, function() {

	//polyfills for ms's peice o' shit browsers
	function bind(target, type, handler) { if (target.addEventListener) { target.addEventListener(type, handler, false); } else { target.attachEvent("on" + type, function(event) { return handler.call(target, event); }); } }
	[].indexOf||(Array.prototype.indexOf=function(a,b,c){for(c=this.length,b=(c+~~b)%c;b<c&&(!(b in this)||this[b]!==a);b++);return b^c?b:-1;});

	//locals
	var locals = {
		'us': {
			"backspace": 8,
			"tab": 9,
			"enter": 13,
			"shift": 16,
			"ctrl": 17,
			"alt": 18,
			"pause": 19, "break": 19,
			"capslock": 20,
			"escape": 27, "esc": 27,
			"space": 32, "spacebar": 32,
			"pageup": 33,
			"pagedown": 34,
			"end": 35,
			"home": 36,
			"left": 37,
			"up": 38,
			"right": 39,
			"down": 40,
			"insert": 45,
			"delete": 46,
			"0": 48, "1": 49, "2": 50, "3": 51, "4": 52, "5": 53, "6": 54, "7": 55, "8": 56, "9": 57,
			"a": 65, "b": 66, "c": 67, "d": 68, "e": 69, "f": 70, "g": 71, "h": 72, "i": 73, "j": 74, "k": 75, "l": 76, "m": 77, "n": 78, "o": 79, "p": 80, "q": 81, "r": 82, "s": 83, "t": 84, "u": 85, "v": 86, "w": 87, "x": 88, "y": 89, "z": 90,
			"meta": 91, "command": 91, "windows": 91, "win": 91,
			"_91": 92,
			"select": 93,
			"num0": 96, "num1": 97, "num2": 98, "num3": 99, "num4": 100, "num5": 101, "num6": 102, "num7": 103, "num8": 104, "num9": 105,
			"multiply": 106,
			"add": 107,
			"subtract": 109,
			"decimal": 110,
			"divide": 111,
			"f1": 112, "f2": 113, "f3": 114, "f4": 115, "f5": 116, "f6": 117, "f7": 118, "f8": 119, "f9": 120, "f10": 121, "f11": 122, "f12": 123,
			"numlock": 144, "num": 144,
			"scrolllock": 145, "scroll": 145,
			"semicolon": 186,
			"equal": 187, "equalsign": 187,
			"comma": 188,
			"dash": 189,
			"period": 190,
			"slash": 191, "forwardslash": 191,
			"graveaccent": 192,
			"openbracket": 219,
			"backslash": 220,
			"closebracket": 221,
			"singlequote": 222
		}

		//If you create a new local please submit it as a pull request or post it in the issue tracker at
		// http://github.com/RobertWhurst/KeyboardJS/issues/
	}

	//keys
	var keys = locals['us'],
		activeKeys = [],
		activeBindings = {},
		keyBindingGroups = [];

	//adds keys to the active keys array
	bind(document, "keydown", function(event) {

		//lookup the key pressed and save it to the active keys array
		for (var key in keys) {
			if(keys.hasOwnProperty(key) && event.keyCode === keys[key]) {
				if(activeKeys.indexOf(key) < 0) {
					activeKeys.push(key);
				}
			}
		}

		//execute the first callback the longest key binding that matches the active keys
		return executeActiveKeyBindings(event);

	});

	//removes keys from the active array
	bind(document, "keyup", function (event) {

		//lookup the key released and prune it from the active keys array
		for(var key in keys) {
			if(keys.hasOwnProperty(key) && event.keyCode === keys[key]) {

				var iAK = activeKeys.indexOf(key);

				if(iAK > -1) {
					activeKeys.splice(iAK, 1);
				}
			}
		}

		//execute the end callback on the active key binding
		return pruneActiveKeyBindings(event);

	});

	/**
	 * Generates an array of active key bindings
	 */
	function queryActiveBindings() {
		var bindingStack = [];

		//loop through the key binding groups by number of keys.
		for(var keyCount = keyBindingGroups.length; keyCount > -1; keyCount -= 1) {
			if(keyBindingGroups[keyCount]) {
				var KeyBindingGroup = keyBindingGroups[keyCount];

				//loop through the key bindings of the same key length.
				for(var bindingIndex = 0; bindingIndex < KeyBindingGroup.length; bindingIndex += 1) {
					var binding = KeyBindingGroup[bindingIndex],

					//assume the binding is active till a required key is found to be unsatisfied
						keyBindingActive = true;

					//loop through each key required by the binding.
					for(var keyIndex = 0; keyIndex < binding.keys.length;  keyIndex += 1) {
						var key = binding.keys[keyIndex];

						//if the current key is not in the active keys array the mark the binding as inactive
						if(activeKeys.indexOf(key) < 0) {
							keyBindingActive = false;
						}
					}

					//if the key combo is still active then push it into the binding stack
					if(keyBindingActive) {
						bindingStack.push(binding);
					}
				}
			}
		}

		return bindingStack;
	}

	/**
	 * Collects active keys, sets active binds and fires on key down callbacks
	 * @param event
	 */
	function executeActiveKeyBindings(event) {

		if(activeKeys < 1) {
			return true;
		}

		var bindingStack = queryActiveBindings(),
			spentKeys = [],
			output;

		//loop through each active binding
		for (var bindingIndex = 0; bindingIndex < bindingStack.length; bindingIndex += 1) {
			var binding = bindingStack[bindingIndex],
				usesSpentKey = false;

			//check each of the required keys. Make sure they have not been used by another binding
			for(var keyIndex = 0; keyIndex < binding.keys.length; keyIndex += 1) {
				var key = binding.keys[keyIndex];
				if(spentKeys.indexOf(key) > -1) {
					usesSpentKey = true;
					break;
				}
			}

			//if the binding does not use a key that has been spent then execute it
			if(!usesSpentKey) {

				//fire the callback
				if(typeof binding.callback === "function") {
					if(!binding.callback(event, binding.keys, binding.keyCombo)) {
						output = false
					}
				}

				//add the binding's combo to the active bindings array
				if(!activeBindings[binding.keyCombo]) {
					activeBindings[binding.keyCombo] = binding;
				}

				//add the current key binding's keys to the spent keys array
				for(var keyIndex = 0; keyIndex < binding.keys.length; keyIndex += 1) {
					var key = binding.keys[keyIndex];
					if(spentKeys.indexOf(key) < 0) {
						spentKeys.push(key);
					}
				}
			}
		}

		//if there are spent keys then we know a binding was fired
		// and that we need to tell jQuery to prevent event bubbling.
		if(spentKeys.length) {
			return false;
		}

		return output;
	}

	/**
	 * Removes no longer active keys and fires the on key up callbacks for associated active bindings.
	 * @param event
	 */
	function pruneActiveKeyBindings(event) {
		var bindingStack = queryActiveBindings();
		var output;

		//loop through the active combos
		for(var bindingCombo in activeBindings) {
			if(activeBindings.hasOwnProperty(bindingCombo)) {
				var binding = activeBindings[bindingCombo],
					active = false;

				//loop thorugh the active bindings
				for(var bindingIndex = 0; bindingIndex < bindingStack.length; bindingIndex += 1) {
					var activeCombo = bindingStack[bindingIndex].keyCombo;

					//check to see if the combo is still active
					if(activeCombo === bindingCombo) {
						active = true;
						break;
					}
				}

				//if the combo is no longer active then fire its end callback and remove it
				if(!active) {

					if(typeof binding.endCallback === "function") {
						if(!binding.endCallback(event, binding.keys, binding.keyCombo)) {
							output = false
						}
					}

					delete activeBindings[bindingCombo];
				}
			}
		}

		return output;
	}

	/**
	 * Binds a on key down and on key up callback to a key or key combo. Accepts a string containing the name of each
	 * key you want to bind to comma separated. If you want to bind a combo the use the plus sign to link keys together.
	 * Example: 'ctrl + x, ctrl + c' Will fire if Control and x or y are pressed at the same time.
	 * @param keyCombo
	 * @param callback
	 * @param endCallback
	 */
	function bindKey(keyCombo, callback, endCallback) {

		function clear() {
			if(keys && keys.length) {
				var keyBindingGroup = keyBindingGroups[keys.length];

				if(keyBindingGroup.indexOf(keyBinding) > -1) {
					var index = keyBindingGroups[keys.length].indexOf(keyBinding);
					keyBindingGroups[keys.length].splice(index, 1);
				}
			}
		}

		//create an array of combos from the first argument
		var bindSets = keyCombo.toLowerCase().replace(/\s/g, '').split(',');

		//create a binding for each key combo
		for(var i = 0; i < bindSets.length; i += 1) {

			//split up the keys
			var keys = bindSets[i].split('+');

			//if there are keys in the current combo
			if(keys.length) {
				if(!keyBindingGroups[keys.length]) { keyBindingGroups[keys.length] = []; }

				//define the
				var keyBinding = {
					"callback": callback,
					"endCallback": endCallback,
					"keyCombo": bindSets[i],
					"keys": keys
				};

				//save the binding sorted by length
				keyBindingGroups[keys.length].push(keyBinding);
			}
		}

		return {
			"clear": clear
		}
	}

	/**
	 * Binds keys or key combos to an axis. The keys should be in the following order; up, down, left, right. If any
	 * of the the binded key or key combos are active the callback will fire. The callback will be passed an array
	 * containing two numbers. The first represents x and the second represents y. Both have a possible range of -1,
	 * 0, or 1 depending on the axis direction.
	 * @param up
	 * @param down
	 * @param left
	 * @param right
	 * @param callback
	 */
	function bindAxis(up, down, left, right, callback) {

		function clear() {
			if(typeof clearUp === 'function') { clearUp(); }
			if(typeof clearDown === 'function') { clearDown(); }
			if(typeof clearLeft === 'function') { clearLeft(); }
			if(typeof clearRight === 'function') { clearRight(); }
			if(typeof timer === 'function') { clearInterval(timer); }
		}

		var axis = [0, 0];

		if(typeof callback !== 'function') {
			return false;
		}

		//up
		var clearUp = bindKey(up, function () {
			if(axis[0] === 0) {
				axis[0] = -1;
			}
		}, function() {
			axis[0] = 0;
		}).clear;

		//down
		var clearDown = bindKey(down, function () {
			if(axis[0] === 0) {
				axis[0] = 1;
			}
		}, function() {
			axis[0] = 0;
		}).clear;

		//left
		var clearLeft = bindKey(left, function () {
			if(axis[1] === 0) {
				axis[1] = -1;
			}
		}, function() {
			axis[1] = 0;
		}).clear;

		//right
		var clearRight = bindKey(right, function () {
			if(axis[1] === 0) {
				axis[1] = 1;
			}
		}, function() {
			axis[1] = 0;
		}).clear;

		var timer = setInterval(function(){

			//NO CHANGE
			if(axis[0] === 0 && axis[1] === 0) {
				return;
			}

			//run the callback
			callback(axis);

		}, 1);

		return {
			"clear": clear
		}
	}

	/**
	 * Clears all key and key combo binds containing a given key or keys.
	 * @param keys
	 */
	function unbindKey(keys) {

		if(keys === 'all') {
			keyBindingGroups = [];
			return;
		}

		keys = keys.replace(/\s/g, '').split(',');

		//loop through the key binding groups.
		for(var iKCL = keyBindingGroups.length; iKCL > -1; iKCL -= 1) {
			if(keyBindingGroups[iKCL]) {
				var KeyBindingGroup = keyBindingGroups[iKCL];

				//loop through the key bindings.
				for(var iB = 0; iB < KeyBindingGroup.length; iB += 1) {
					var keyBinding = KeyBindingGroup[iB],
						remove = false;

					//loop through the current key binding keys.
					for(var iKB = 0; iKB < keyBinding.keys.length;  iKB += 1) {
						var key = keyBinding.keys[iKB];

						//loop through the keys to be removed
						for(var iKR = 0; iKR < keys.length; iKR += 1) {
							var keyToRemove = keys[iKR];
							if(keyToRemove === key) {
								remove = true;
								break;
							}
						}
						if(remove) { break; }
					}
					if(remove) {
						keyBindingGroups[iKCL].splice(iB, 1); iB -= 1;
						if(keyBindingGroups[iKCL].length < 1) {
							delete keyBindingGroups[iKCL];
						}
					}
				}
			}
		}
	}

	/**
	 * Gets an array of active keys
	 */
	function getActiveKeys() {
		return activeKeys;
	}

	/**
	 * Adds a new keyboard local not supported by keyboard JS
	 * @param local
	 * @param keys
	 */
	function addLocale(local, keys) {
		locals[local] = keys;
	}

	/**
	 * Changes the keyboard local
	 * @param local
	 */
	function setLocale(local) {
		if(locals[local]) {
			keys = locals[local];
		}

	}

	return {
		"bind": {
			"key": bindKey,
			"axis": bindAxis
		},
		"activeKeys": getActiveKeys,
		"unbind": {
			"key": unbindKey
		},
		"locale": {
			"add": addLocale,
			"set": setLocale
		}
	}
}));