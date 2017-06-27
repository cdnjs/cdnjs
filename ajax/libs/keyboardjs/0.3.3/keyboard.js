/**
 * Title: KeyboardJS
 * Version: v0.3.0
 * Description: KeyboardJS is a flexible and easy to use keyboard binding library.
 * Author: Robert Hurst.
 *
 * Copyright 2011, Robert William Hurst
 * Licenced under the BSD License.
 * See https://raw.github.com/RobertWHurst/KeyboardJS/master/license.txt
 */
(function(context, factory) {
	var namespaces = [], previousValues = {}, library;
	if(typeof define === 'function' && define.amd) {
		define(function() { return factory('amd'); });
	} else {
		library = factory('global');
		library.noConflict = function(    ) {
			var args, nI;
			newNamespaces = Array.prototype.slice.apply(arguments);
			for(nI = 0; nI < namespaces.length; nI += 1) {
				if(typeof previousValues[namespaces[nI]] === 'undefined') {
					delete context[namespaces[nI]];
				} else {
					context[namespaces[nI]] = previousValues[namespaces[nI]];
				}
			}
			previousValues = {};
			for(nI = 0; nI < newNamespaces.length; nI += 1) {
				if(typeof newNamespaces[nI] !== 'string') { throw new Error('Cannot replace namespaces. All new namespaces must be strings.'); }
				previousValues[newNamespaces[nI]] = context[newNamespaces[nI]];
				context[newNamespaces[nI]] = library;
			}
			namespaces = newNamespaces;
			return namespaces;
		};
		library.noConflict('KeyboardJS', 'k');
	}
})(this, function(env) {
	var KeyboardJS = {}, locales, locale, map, macros, activeKeys = [], bindings = [], activeBindings = [], activeMacros = [];

	[].indexOf||(Array.prototype.indexOf=function(a,b,c){for(c=this.length,b=(c+~~b)%c;b<c&&(!(b in this)||this[b]!==a);b++);return b^c?b:-1;});

	locales = {
		'us': {
			"map": {

				//general
				"3": ["cancel"],
				"8": ["backspace"],
				"9": ["tab"],
				"12": ["clear"],
				"13": ["enter"],
				"16": ["shift"],
				"17": ["ctrl"],
				"18": ["alt", "menu"],
				"19": ["pause", "break"],
				"20": ["capslock"],
				"27": ["escape", "esc"],
				"32": ["space", "spacebar"],
				"33": ["pageup"],
				"34": ["pagedown"],
				"35": ["end"],
				"36": ["home"],
				"37": ["left"],
				"38": ["up"],
				"39": ["right"],
				"40": ["down"],
				"41": ["select"],
				"42": ["printscreen"],
				"43": ["execute"],
				"44": ["snapshot"],
				"45": ["insert", "ins"],
				"46": ["delete", "del"],
				"47": ["help"],
				"91": ["command", "windows", "win", "super", "leftcommand", "leftwindows", "leftwin", "leftsuper"],
				"92": ["command", "windows", "win", "super", "rightcommand", "rightwindows", "rightwin", "rightsuper"],
				"145": ["scrolllock", "scroll"],
				"186": ["semicolon", ";"],
				"187": ["equal", "equalsign", "="],
				"188": ["comma", ","],
				"189": ["dash", "-"],
				"190": ["period", "."],
				"191": ["slash", "forwardslash", "/"],
				"192": ["graveaccent", "`"],
				"219": ["openbracket", "["],
				"220": ["backslash", "\\"],
				"221": ["closebracket", "]"],
				"222": ["apostrophe", "'"],

				//a-z
				"65": ["a"],
				"66": ["b"],
				"67": ["c"],
				"68": ["d"],
				"69": ["e"],
				"70": ["f"],
				"71": ["g"],
				"72": ["h"],
				"73": ["i"],
				"74": ["j"],
				"75": ["k"],
				"76": ["l"],
				"77": ["m"],
				"78": ["n"],
				"79": ["o"],
				"80": ["p"],
				"81": ["q"],
				"82": ["r"],
				"83": ["s"],
				"84": ["t"],
				"85": ["u"],
				"86": ["v"],
				"87": ["w"],
				"88": ["x"],
				"89": ["y"],
				"90": ["z"],

				//0-9
				"48": ["zero", "0"],
				"49": ["one", "1"],
				"50": ["two", "2"],
				"51": ["three", "3"],
				"52": ["four", "4"],
				"53": ["five", "5"],
				"54": ["six", "6"],
				"55": ["seven", "7"],
				"56": ["eight", "8"],
				"57": ["nine", "9"],

				//numpad
				"96": ["numzero", "num0"],
				"97": ["numone", "num1"],
				"98": ["numtwo", "num2"],
				"99": ["numthree", "num3"],
				"100": ["numfour", "num4"],
				"101": ["numfive", "num5"],
				"102": ["numsix", "num6"],
				"103": ["numseven", "num7"],
				"104": ["numeight", "num8"],
				"105": ["numnine", "num9"],
				"106": ["nummultiply", "num*"],
				"107": ["numadd", "num+"],
				"108": ["numenter"],
				"109": ["numsubtract", "num-"],
				"110": ["numdecimal", "num."],
				"111": ["numdevide", "num/"],
				"144": ["numlock", "num"],

				//function keys
				"112": ["f1"],
				"113": ["f2"],
				"114": ["f3"],
				"115": ["f4"],
				"116": ["f5"],
				"117": ["f6"],
				"118": ["f7"],
				"119": ["f8"],
				"120": ["f9"],
				"121": ["f10"],
				"122": ["f11"],
				"123": ["f12"]
			},
			"macros": [

				//secondary key symbols
				[[[["shift", "graveaccent"]]], ["tilde", "~"]],
				[[[["shift", "one"]]], ["exclamation", "exclamationpoint", "!"]],
				[[[["shift", "two"]]], ["at", "@"]],
				[[[["shift", "three"]]], ["number", "#"]],
				[[[["shift", "four"]]], ["dollar", "dollars", "dollarsign", "$"]],
				[[[["shift", "five"]]], ["percent", "%"]],
				[[[["shift", "six"]]], ["caret", "^"]],
				[[[["shift", "seven"]]], ["ampersand", "and", "&"]],
				[[[["shift", "eight"]]], ["asterisk", "*"]],
				[[[["shift", "nine"]]], ["openparen", "("]],
				[[[["shift", "zero"]]], ["closeparen", ")"]],
				[[[["shift", "dash"]]], ["underscore", "_"]],
				[[[["shift", "equal"]]], ["plus", "+"]],
				[[[["shift", "openbracket"]]], ["opencurlybrace", "opencurlybracket", "{"]],
				[[[["shift", "closebracket"]]], ["closecurlybrace", "closecurlybracket", "}"]],
				[[[["shift", "backslash"]]], ["verticalbar", "|"]],
				[[[["shift", "semicolon"]]], ["colon", ":"]],
				[[[["shift", "apostrophe"]]], ["quotationmark", "\""]],
				[[[["shift", "comma"]]], ["openanglebracket", "<"]],
				[[[["shift", "period"]]], ["closeanglebracket", ">"]],
				[[[["shift", "forwardslash"]]], ["questionmark", "?"]],

				//capital A-Z
				[[[["shift", "a"]]], ["A"]],
				[[[["shift", "b"]]], ["B"]],
				[[[["shift", "c"]]], ["C"]],
				[[[["shift", "d"]]], ["D"]],
				[[[["shift", "e"]]], ["E"]],
				[[[["shift", "f"]]], ["F"]],
				[[[["shift", "g"]]], ["G"]],
				[[[["shift", "h"]]], ["H"]],
				[[[["shift", "i"]]], ["I"]],
				[[[["shift", "j"]]], ["J"]],
				[[[["shift", "k"]]], ["K"]],
				[[[["shift", "l"]]], ["L"]],
				[[[["shift", "m"]]], ["M"]],
				[[[["shift", "n"]]], ["N"]],
				[[[["shift", "o"]]], ["O"]],
				[[[["shift", "p"]]], ["P"]],
				[[[["shift", "q"]]], ["Q"]],
				[[[["shift", "r"]]], ["R"]],
				[[[["shift", "s"]]], ["S"]],
				[[[["shift", "t"]]], ["T"]],
				[[[["shift", "u"]]], ["U"]],
				[[[["shift", "v"]]], ["V"]],
				[[[["shift", "w"]]], ["W"]],
				[[[["shift", "x"]]], ["X"]],
				[[[["shift", "y"]]], ["Y"]],
				[[[["shift", "z"]]], ["Z"]]
			]
		}

		//If you create a new locale please submit it as a pull request or post it in the issue tracker at
		// http://github.com/RobertWhurst/KeyboardJS/issues/
	};
	locale = 'us';
	map = locales[locale].map;
	macros = locales[locale].macros;
	if(window.addEventListener) {
		window.addEventListener('keydown', keydown, false);
		window.addEventListener('keyup', keyup, false);
		window.addEventListener('onblur', blur, false);
	} else if(window.attachEvent) {
		window.attachEvent('onkeydown', keydown);
		window.attachEvent('onkeyup', keyup);
		window.attachEvent('onblur', blur);
	} else {
		throw new Error('Cannot bind to keydown event. Both addEventListener and attachEvent are unsupported by your browser.');
	}

	KeyboardJS.activeKeys = getActiveKeys;
	KeyboardJS.on = createBinding;
	KeyboardJS.clear = removeBindingByKeyCombo;
	KeyboardJS.clear.key = removeBindingByKeyName;
	KeyboardJS.locale = getSetLocale;
	KeyboardJS.locale.register = registerLocale;
	KeyboardJS.macro = createMacro;
	KeyboardJS.macro.remove = removeMacro;
	KeyboardJS.getKey = getKeyName;
	KeyboardJS.combo = {};
	KeyboardJS.combo.parse = parseKeyCombo;
	KeyboardJS.combo.stringify = stringifyKeyCombo;

	window.map = map;
	window.macros = macros;

	return KeyboardJS;

	function keydown(event) {
		var keyNames, kI;
		keyNames = getKeyName(event.keyCode);
		if(keyNames.length < 1) { return; }
		for(kI = 0; kI < keyNames.length; kI += 1) {
			addActiveKey(keyNames[kI]);
		}
		executeMacros();
		executeBindings(event);
	}
	function keyup(event) {
		var keyNames, kI;
		keyNames = getKeyName(event.keyCode);
		if(keyNames.length < 1) { return; }
		for(kI = 0; kI < keyNames.length; kI += 1) {
			removeActiveKey(keyNames[kI]);
		}
		pruneMacros();
		pruneBindings(event);
	}
	function blur(event) {
		activeKeys = [];
		pruneMacros();
		pruneBindings(event);
	}
	function getKeyName(keyCode) {
		return map[keyCode] || [];
	}
	function createMacro(combo, injectedKeys) {
		if(typeof combo !== 'string' && (typeof combo !== 'object' || typeof combo.push !== 'function')) { throw new Error("Cannot create macro. The combo must be a string or array."); }
		if(typeof injectedKeys !== 'object' || typeof injectedKeys.push !== 'function') { throw new Error("Cannot create macro. The injectedKeys must be an array."); }
		marcos.push([combo, injectKeys]);
	}
	function removeMacro(combo) {
		var macro;
		if(typeof combo !== 'string' && (typeof combo !== 'object' || typeof combo.push !== 'function')) { throw new Error("Cannot remove macro. The combo must be a string or array."); }
		for(mI = 0; mI < macros.length; mI += 1) {
			macro = macros[mI];
			if(compareCombos(combo, macro[0])) {
				removeActiveKey(macro[1]);
				macros.splice(mI, 1);
				break;
			}
		}
	}
	function executeMacros() {
		var mI, combo, kI;
		for(mI = 0; mI < macros.length; mI += 1) {
			combo = parseKeyCombo(macros[mI][0]);
			if(activeMacros.indexOf(macros[mI]) === -1 && isSatifiedCombo(combo)) {
				activeMacros.push(macros[mI]);
				for(kI = 0; kI < macros[mI][1].length; kI += 1) {
					addActiveKey(macros[mI][1][kI]);
				}
			}
		}
	}
	function pruneMacros() {
		var mI, combo, kI;
		for(mI = 0; mI < activeMacros.length; mI += 1) {
			combo = parseKeyCombo(activeMacros[mI][0]);
			if(isSatifiedCombo(combo) === false) {
				for(kI = 0; kI < activeMacros[mI][1].length; kI += 1) {
					removeActiveKey(activeMacros[mI][1][kI]);
				}
				activeMacros.splice(mI, 1);
				mI -= 1;
			}
		}
	}
	function createBinding(keyCombo, keyDownCallback, keyUpCallback) {
		var binding = {}, bindingApi = {};
		if(typeof keyCombo === 'object' && typeof keyCombo.push === 'function') {
			keyCombo = stringifyKeyCombo(keyCombo);
		}
		if(typeof keyCombo === 'function') {
			keyCombo = false;
			keyUpCallback = keyDownCallback;
			keyDownCallback = keyCombo;
		}
		if(keyCombo !== false && typeof keyCombo !== 'string') { throw new Error('Failed to bind key combo. The key combo must be string.'); }
		binding.keyCombo = keyCombo;
		binding.keyDownCallback = [];
		binding.keyUpCallback = [];
		if(keyDownCallback) { binding.keyDownCallback.push(keyDownCallback); }
		if(keyUpCallback) { binding.keyUpCallback.push(keyUpCallback); }
		bindings.push(binding);
		return {
			"clear": clear,
			"on": on
		};

		function clear() {
			bindings.splice(bindings.indexOf(binding), 1);
		}

		function on(eventName   ) {
			var callbacks, cI;
			console.log(eventName);
			if(typeof eventName !== 'string') { throw new Error('Cannot bind callback. The event name must be a string.'); }
			if(eventName !== 'keyup' && eventName !== 'keydown') { throw new Error('Cannot bind callback. The event name must be a "keyup" or "keydown".'); }
			callbacks = Array.prototype.slice.apply(arguments, [1]);
			for(cI = 0; cI < callbacks.length; cI += 1) {
				if(typeof callbacks[cI] === 'function') {
					if(eventName === 'keyup') {
						binding.keyUpCallback.push(callbacks[cI]);
					} else {
						binding.keyDownCallback.push(callbacks[cI]);
					}
				}
			}
			return { "clear": clear };

			function clear() {
				var cI;
				for(cI = 0; cI < callbacks.length; cI += 1) {
					if(typeof callbacks[cI] === 'function') {
						if(eventName === 'keyup') {
							binding.keyUpCallback.splice(binding.keyUpCallback.indexOf(callbacks[cI]), 1);
						} else {
							binding.keyDownCallback.splice(binding.keyDownCallback.indexOf(callbacks[cI]), 1);
						}
					}
				}
			}
		}
	}
	function removeBindingByKeyCombo(keyCombo) {
		var bI, binding, keyName;
		for(bI = 0; bI < bindings.length; bI += 1) {
			binding = bindings[bi];
			if(compareCombos(keyCombo, binding.keyCombo)) {
				bindings.splice(bI, 1); bI -= 1;
			}
		}
	}
	function removeBindingByKeyName(keyName) {
		var bI, cI, binding;
		for(bI = 0; bI < bindings.length; bI += 1) {
			binding = bindings[bi];
			for(cI = 0; cI < binding.keyCombo.length; cI += 1) {
				if(binding.keyCombo[kI].indexOf(keyName) > -1) {
					bindings.splice(bI, 1); bI -= 1;
					break;
				}
			}
		}
	}

	/**
	 * Executes bindings that are active. Only allows the keys to be used once as to prevent binding overlap.
	 * @param  {KeyboardEvent} event The keyboard event.
	 */
	function executeBindings(event) {
		var bI, sBI, binding, bidningKeys, remainingKeys, cI, killEventBubble, kI, bindingKeysSatified,
		index, sortedBindings = [], bindingWeight;

		remainingKeys = [].concat(activeKeys);
		for(bI = 0; bI < bindings.length; bI += 1) {
			bindingWeight = extractComboKeys(bindings[bI].keyCombo).length;
			if(!sortedBindings[bindingWeight]) { sortedBindings[bindingWeight] = []; }
			sortedBindings[bindingWeight].push(bindings[bI]);
		}
		for(sBI = sortedBindings.length - 1; sBI >= 0; sBI -= 1) {
			if(!sortedBindings[sBI]) { continue; }
			for(bI = 0; bI < sortedBindings[sBI].length; bI += 1) {
				binding = sortedBindings[sBI][bI];
				bindingKeys = extractComboKeys(binding.keyCombo);
				bindingKeysSatified = true;
				for(kI = 0; kI < bindingKeys.length; kI += 1) {
					if(remainingKeys.indexOf(bindingKeys[kI]) === -1) {
						bindingKeysSatified = false;
						break;
					}
				}
				if(bindingKeysSatified && isSatifiedCombo(binding.keyCombo)) {
					activeBindings.push(binding);
					for(kI = 0; kI < bindingKeys.length; kI += 1) {
						index = remainingKeys.indexOf(bindingKeys[kI]);
						if(index > -1) {
							remainingKeys.splice(index, 1);
							kI -= 1;
						}
					}
					for(cI = 0; cI < binding.keyDownCallback.length; cI += 1) {
						if (binding.keyDownCallback[cI](event) === false) {
							killEventBubble = true;
						}
					}
					if(killEventBubble === true) {
						event.preventDefault();
						event.stopPropagation();
					}
				}
			}
		}
	}

	/**
	 * Removes bindings that are no longer satisfied by the active keys. Also fires the keyup callbacks.
	 * @param  {KeyboardEvent} event [description]
	 */
	function pruneBindings(event) {
		var bI, cI, binding, killEventBubble;
		for(bI = 0; bI < activeBindings.length; bI += 1) {
			binding = activeBindings[bI];
			if(isSatifiedCombo(binding.keyCombo) === false) {
				for(cI = 0; cI < binding.keyUpCallback.length; cI += 1) {
					if (binding.keyUpCallback[cI](event) === false) {
						killEventBubble = true;
					}
				}
				if(killEventBubble === true) {
					event.preventDefault();
					event.stopPropagation();
				}
				activeBindings.splice(bI, 1);
				bI -= 1;
			}
		}
	}

	/**
	 * Compares two key combos returning true when they are functionally equivalent.
	 * @param  {String|Array} keyComboArrayA keyCombo A key combo string or array.
	 * @param  {String|Array} keyComboArrayB keyCombo A key combo string or array.
	 * @return {Boolean}
	 */
	function compareCombos(keyComboArrayA, keyComboArrayB) {
		var cI, sI, kI;
		keyComboArrayA = parseKeyCombo(keyComboArrayA);
		keyComboArrayB = parseKeyCombo(keyComboArrayB);
		if(keyComboArrayA.length !== keyComboArrayB.length) { return false; }
		for(cI = 0; cI < keyComboArrayA.length; cI += 1) {
			if(keyComboArrayA[aI].length !== keyComboArrayB[aI].length) { return false; }
			for(sI = 0; sI < keyComboArrayA[aI].length; sI += 1) {
				if(keyComboArrayA[aI][sI].length !== keyComboArrayB[aI][sI].length) { return false; }
				for(kI = 0; kI < keyComboArrayA[aI][sI].length; kI += 1) {
					if(keyComboArrayB[aI][sI].indexOf(keyComboArrayA[aI][sI][kI]) === -1) { return false; }
				}
			}
		}
		return true;
	}

	/**
	 * Checks to see if a key combo string or key array is satisfied by the currently active keys. It does not
	 * take into account spent keys.
	 * @param  {String|Array}  keyCombo A key combo string or array.
	 * @return {Boolean}
	 */
	function isSatifiedCombo(keyCombo) {
		var cI, sI, stage, kI, stageOffset = 0, index;
		keyCombo = parseKeyCombo(keyCombo);
		for(cI = 0; cI < keyCombo.length; cI += 1) {
			for(sI = 0; sI < keyCombo[cI].length; sI += 1) {
				stage = [].concat(keyCombo[cI][sI]);
				for(kI = stageOffset; kI < activeKeys.length; kI += 1) {
					index = stage.indexOf(activeKeys[kI]);
					if(index > -1) {
						stage.splice(index, 1);
						stageOffset = kI;
					}
				}
				if(stage.length !== 0) { return false; }
			}
		}
		return true;
	}

	/**
	 * Accepts a key combo array or string and returns a flat array containing all keys referenced by
	 * the key combo.
	 * @param  {String|Array} keyCombo A key combo string or array.
	 * @return {Array}
	 */
	function extractComboKeys(keyCombo) {
		var cI, sI, kI, keys = [];
		keyCombo = parseKeyCombo(keyCombo);
		for(cI = 0; cI < keyCombo.length; cI += 1) {
			for(sI = 0; sI < keyCombo[cI].length; sI += 1) {
				keys = keys.concat(keyCombo[cI][sI]);
			}
		}
		return keys;
	}

	/**
	 * Converts a key combo string into a 3 dimensional array.
	 * Level 1 represents each combo as combo strings can contain more than one.
	 * Level 2 represents each stage. A stages are sub combos that must be satisfied in the order they are defined.
	 * Level 3 represents each key that must be pressed to satisfy a stage.
	 * @param  {String} keyCombo A key combo string.
	 * @return {Array}
	 */
	function parseKeyCombo(keyCombo) {
		var s = keyCombo, i = 0, op = 0, ws = false, nc = false, combos = [], combo = [], stage = [], key = '';

		if(typeof keyCombo === 'object' && typeof keyCombo.push === 'function') { return keyCombo; }
		if(typeof keyCombo !== 'string') { throw new Error('Cannot parse "keyCombo" because its type is "' + (typeof keyCombo) + '". It must be a "string".'); }

		//remove leading whitespace
		while(s.charAt(i) === ' ') { i += 1; }
		while(true) {
			if(s.charAt(i) === ' ') {
				//white space & next combo op
				while(s.charAt(i) === ' ') { i += 1; }
				ws = true;
			} else if(s.charAt(i) === ',') {
				if(op || nc) { throw new Error('Failed to parse key combo. Unexpected , at character index ' + i + '.'); }
				nc = true;
				i += 1;
			} else if(s.charAt(i) === '+') {
				//next key
				if(key.length) { stage.push(key); key = ''; }
				if(op || nc) { throw new Error('Failed to parse key combo. Unexpected + at character index ' + i + '.'); }
				op = true;
				i += 1;
			} else if(s.charAt(i) === '>') {
				//next stage op
				if(key.length) { stage.push(key); key = ''; }
				if(stage.length) { combo.push(stage); stage = []; }
				if(op || nc) { throw new Error('Failed to parse key combo. Unexpected > at character index ' + i + '.'); }
				op = true;
				i += 1;
			} else if(i < s.length - 1 && s.charAt(i) === '!' && (s.charAt(i + 1) === '>' || s.charAt(i + 1) === ',' || s.charAt(i + 1) === '+')) {
				key += s.charAt(i + 1);
				op = false;
				ws = false;
				nc = false;
				i += 2;
			} else if(i < s.length && s.charAt(i) !== '+' && s.charAt(i) !== '>' && s.charAt(i) !== ',' && s.charAt(i) !== ' ') {
				//end combo
				if(op === false && ws === true || nc === true) {
					if(key.length) { stage.push(key); key = ''; }
					if(stage.length) { combo.push(stage); stage = []; }
					if(combo.length) { combos.push(combo); combo = []; }
				}
				op = false;
				ws = false;
				nc = false;
				//key
				while(i < s.length && s.charAt(i) !== '+' && s.charAt(i) !== '>' && s.charAt(i) !== ',' && s.charAt(i) !== ' ') {
					key += s.charAt(i);
					i += 1;
				}
			} else {
				//unknown char
				i += 1;
				continue;
			}
			//end of combos string
			if(i >= s.length) {
				if(key.length) { stage.push(key); key = ''; }
				if(stage.length) { combo.push(stage); stage = []; }
				if(combo.length) { combos.push(combo); combo = []; }
				break;
			}
		}
		return combos;
	}

	/**
	 * Stringifys a key combo.
	 * @param  {Array|String} keyComboArray A key combo array. If a key combo string is given it will be returned.
	 * @return {String}
	 */
	function stringifyKeyCombo(keyComboArray) {
		var cI, ccI, output = [];
		if(typeof keyComboArray === 'string') { return keyComboArray; }
		if(typeof keyComboArray !== 'object' || typeof keyComboArray.push !== 'function') { throw new Error('Cannot stringify key combo.'); }
		for(cI = 0; cI < keyComboArray.length; cI += 1) {
			output[cI] = [];
			for(ccI = 0; ccI < keyComboArray[cI].length; ccI += 1) {
				output[cI][ccI] = keyComboArray[cI][ccI].join(' + ');
			}
			output[cI] = output[cI].join(' > ');
		}
		return output.join(' ');
	}

	/**
	 * Returns the a copy of the active keys array.
	 * @return {Array}
	 */
	function getActiveKeys() {
		return [].concat(activeKeys);
	}

	/**
	 * Adds a key to the active keys array, but only if it has not already been added.
	 * @param {String} keyName The key name string.
	 */
	function addActiveKey(keyName) {
		if(keyName.match(/\s/)) { throw new Error('Cannot add key name ' + keyName + ' to active keys because it contains whitespace.'); }
		if(activeKeys.indexOf(keyName) > -1) { return; }
		activeKeys.push(keyName);
	}

	/**
	 * Removes a key from the active keys array.
	 * @param  {String} keyName The key name string.
	 */
	function removeActiveKey(keyName) {
		if(keyName === 'super') { activeKeys = []; }
		activeKeys.splice(activeKeys.indexOf(keyName), 1);
	}

	/**
	 * Registers a new locale. This is useful if you would like to add support for a new keyboard layout. It could also be useful for
	 * alternative key names. For example if you program games you could create a locale for your key mappings. Instead of key 65 mapped
	 * to 'a' you could map it to 'jump'.
	 * @param  {String} localeName The name of the new locale.
	 * @param  {Object} localeMap  The locale map.
	 */
	function registerLocale(localeName, localeMap) {
		if(typeof localeName !== 'string') { throw new Error('Cannot register new locale. The locale name must be a string.'); }
		if(typeof localeMap !== 'object') { throw new Error('Cannot register ' + localeName + ' locale. The locale map must be an object.'); }
		if(typeof localeMap.keys !== 'object' || typeof localeMap.keys.push !== 'function' || typeof localeMap.map !== 'object' || typeof localeMap.map !== 'function') { throw new Error('Cannot register ' + localeName + ' locale. The locale map is invalid.'); }
		locales[localeName] = localeMap;
	}

	/**
	 * Swaps the current locale.
	 * @param  {String} localeName The locale to activate.
	 * @return {Object}
	 */
	function getSetLocale(localeName) {
		if(!localeName) {
			if(typeof localeName !== 'string') { throw new Error('Cannot set locale. The locale name must be a string.'); }
			if(!locales[localeName]) { throw new Error('Cannot set locale to ' + localeName + ' because it does not exist. If you would like to submit a ' + localeName + ' locale map for KeyboardJS please submit it at https://github.com/RobertWHurst/KeyboardJS/issues.'); }
			locale = localeName;
			map = locales[locale].map;
			macros = locales[locale].macros;
		}
		return locale;
	}
});
