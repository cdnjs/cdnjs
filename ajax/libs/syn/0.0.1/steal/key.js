steal('src/synthetic.js','src/browsers.js',function(Syn) {
	var h = Syn.helpers,

		// gets the selection of an input or textarea
		getSelection = function( el ) {
			// use selectionStart if we can
			if ( el.selectionStart !== undefined ) {
				// this is for opera, so we don't have to focus to type how we think we would
				if ( document.activeElement && document.activeElement != el && el.selectionStart == el.selectionEnd && el.selectionStart == 0 ) {
					return {
						start: el.value.length,
						end: el.value.length
					};
				}
				return {
					start: el.selectionStart,
					end: el.selectionEnd
				}
			} else {
				//check if we aren't focused
				try {
					//try 2 different methods that work differently (IE breaks depending on type)
					if ( el.nodeName.toLowerCase() == 'input' ) {
						var real = h.getWindow(el).document.selection.createRange(),
							r = el.createTextRange();
						r.setEndPoint("EndToStart", real);

						var start = r.text.length
						return {
							start: start,
							end: start + real.text.length
						}
					}
					else {
						var real = h.getWindow(el).document.selection.createRange(),
							r = real.duplicate(),
							r2 = real.duplicate(),
							r3 = real.duplicate();
						r2.collapse();
						r3.collapse(false);
						r2.moveStart('character', -1)
						r3.moveStart('character', -1)
						//select all of our element
						r.moveToElementText(el)
						//now move our endpoint to the end of our real range
						r.setEndPoint('EndToEnd', real);
						var start = r.text.length - real.text.length,
							end = r.text.length;
						if ( start != 0 && r2.text == "" ) {
							start += 2;
						}
						if ( end != 0 && r3.text == "" ) {
							end += 2;
						}
						//if we aren't at the start, but previous is empty, we are at start of newline
						return {
							start: start,
							end: end
						}
					}
				} catch (e) {
					var prop = formElExp.test(el.nodeName) ? "value" : "textContent";

					return {
						start: el[prop].length,
						end: el[prop].length
					};
				}
			}
		},
		// gets all focusable elements
		getFocusable = function( el ) {
			var document = h.getWindow(el).document,
				res = [];

			var els = document.getElementsByTagName('*'),
				len = els.length;

			for ( var i = 0; i < len; i++ ) {
				Syn.isFocusable(els[i]) && els[i] != document.documentElement && res.push(els[i])
			}
			return res;
		},
		formElExp = /input|textarea/i,
		// Get the text from an element.
		getText = function(el){
			if(formElExp.test(el.nodeName)) {
				return el.value;
			}
			return el.textContent || el.innerText;
		},
		// Set the text of an element.
		setText = function(el, value){
			if(formElExp.test(el.nodeName)){
				el.value = value;
			} else if(el.textContent) {
				el.textContent = value;
			} else {
				el.innerText = value;
			}
		};
    
	/**
	 * @add Syn static
	 */
	h.extend(Syn, {
		/**
		 * @attribute
		 * A list of the keys and their keycodes codes you can type.
		 * You can add type keys with
		 * @codestart
		 * Syn('key','delete','title');
		 * 
		 * //or 
		 * 
		 * Syn('type','One Two Three[left][left][delete]','title')
		 * @codeend
		 * 
		 * The following are a list of keys you can type:
		 * @codestart text
		 * \b        - backspace
		 * \t        - tab
		 * \r        - enter
		 * ' '       - space
		 * a-Z 0-9   - normal characters
		 * /!@#$*,.? - All other typeable characters
		 * page-up   - scrolls up
		 * page-down - scrolls down
		 * end       - scrolls to bottom
		 * home      - scrolls to top
		 * insert    - changes how keys are entered
		 * delete    - deletes the next character
		 * left      - moves cursor left
		 * right     - moves cursor right
		 * up        - moves the cursor up
		 * down      - moves the cursor down
		 * f1-12     - function buttons
		 * shift, ctrl, alt - special keys
		 * pause-break      - the pause button
		 * scroll-lock      - locks scrolling
		 * caps      - makes caps
		 * escape    - escape button
		 * num-lock  - allows numbers on keypad
		 * print     - screen capture
		 * subtract  - subtract (keypad) -
		 * dash      - dash -
		 * divide    - divide (keypad) /
		 * forward-slash - forward slash /
		 * decimal   - decimal (keypad) .
		 * period    - period .
		 * @codeend
		 */
		keycodes: {
			//backspace
			'\b': 8,

			//tab
			'\t': 9,

			//enter
			'\r': 13,

			//special
			'shift': 16,
			'ctrl': 17,
			'alt': 18,

			//weird
			'pause-break': 19,
			'caps': 20,
			'escape': 27,
			'num-lock': 144,
			'scroll-lock': 145,
			'print': 44,

			//navigation
			'page-up': 33,
			'page-down': 34,
			'end': 35,
			'home': 36,
			'left': 37,
			'up': 38,
			'right': 39,
			'down': 40,
			'insert': 45,
			'delete': 46,

			//normal characters
			' ': 32,
			'0': 48,
			'1': 49,
			'2': 50,
			'3': 51,
			'4': 52,
			'5': 53,
			'6': 54,
			'7': 55,
			'8': 56,
			'9': 57,
			'a': 65,
			'b': 66,
			'c': 67,
			'd': 68,
			'e': 69,
			'f': 70,
			'g': 71,
			'h': 72,
			'i': 73,
			'j': 74,
			'k': 75,
			'l': 76,
			'm': 77,
			'n': 78,
			'o': 79,
			'p': 80,
			'q': 81,
			'r': 82,
			's': 83,
			't': 84,
			'u': 85,
			'v': 86,
			'w': 87,
			'x': 88,
			'y': 89,
			'z': 90,
			//normal-characters, numpad
			'num0': 96,
			'num1': 97,
			'num2': 98,
			'num3': 99,
			'num4': 100,
			'num5': 101,
			'num6': 102,
			'num7': 103,
			'num8': 104,
			'num9': 105,
			'*': 106,
			'+': 107,
			'subtract': 109,
			'decimal': 110,
			//normal-characters, others
			'divide': 111,
			';': 186,
			'=': 187,
			',': 188,
			'dash': 189,
			'-': 189,
			'period': 190,
			'.': 190,
			'forward-slash': 191,
			'/': 191,
			'`': 192,
			'[': 219,
			'\\': 220,
			']': 221,
			"'": 222,

			//ignore these, you shouldn't use them
			'left window key': 91,
			'right window key': 92,
			'select key': 93,


			'f1': 112,
			'f2': 113,
			'f3': 114,
			'f4': 115,
			'f5': 116,
			'f6': 117,
			'f7': 118,
			'f8': 119,
			'f9': 120,
			'f10': 121,
			'f11': 122,
			'f12': 123
		},

		// selects text on an element
		selectText: function( el, start, end ) {
			if ( el.setSelectionRange ) {
				if (!end ) {
					el.focus();
					el.setSelectionRange(start, start);
				} else {
					el.selectionStart = start;
					el.selectionEnd = end;
				}
			} else if ( el.createTextRange ) {
				//el.focus();
				var r = el.createTextRange();
				r.moveStart('character', start);
				end = end || start;
				r.moveEnd('character', end - el.value.length);

				r.select();
			}
		},
		getText: function( el ) {
			//first check if the el has anything selected ..
			if ( Syn.typeable.test(el) ) {
				var sel = getSelection(el);
				return el.value.substring(sel.start, sel.end)
			}
			//otherwise get from page
			var win = Syn.helpers.getWindow(el);
			if ( win.getSelection ) {
				return win.getSelection().toString();
			}
			else if ( win.document.getSelection ) {
				return win.document.getSelection().toString()
			}
			else {
				return win.document.selection.createRange().text;
			}
		},
		getSelection: getSelection
	});

	h.extend(Syn.key, {
		// retrieves a description of what events for this character should look like
		data: function( key ) {
			//check if it is described directly
			if ( Syn.key.browser[key] ) {
				return Syn.key.browser[key];
			}
			for ( var kind in Syn.key.kinds ) {
				if ( h.inArray(key, Syn.key.kinds[kind]) > -1 ) {
					return Syn.key.browser[kind]
				}
			}
			return Syn.key.browser.character
		},

		//returns the special key if special
		isSpecial: function( keyCode ) {
			var specials = Syn.key.kinds.special;
			for ( var i = 0; i < specials.length; i++ ) {
				if ( Syn.keycodes[specials[i]] == keyCode ) {
					return specials[i];
				}
			}
		},
		/**
		 * @hide
		 * gets the options for a key and event type ...
		 * @param {Object} key
		 * @param {Object} event
		 */
		options: function( key, event ) {
			var keyData = Syn.key.data(key);

			if (!keyData[event] ) {
				//we shouldn't be creating this event
				return null;
			}

			var charCode = keyData[event][0],
				keyCode = keyData[event][1],
				result = {};

			if ( keyCode == 'key' ) {
				result.keyCode = Syn.keycodes[key]
			} else if ( keyCode == 'char' ) {
				result.keyCode = key.charCodeAt(0)
			} else {
				result.keyCode = keyCode;
			}

			if ( charCode == 'char' ) {
				result.charCode = key.charCodeAt(0)
			} else if ( charCode !== null ) {
				result.charCode = charCode;
			}

			// all current browsers have which property to normalize keyCode/charCode
			if(result.keyCode){
				result.which = result.keyCode;
			} else {
				result.which = result.charCode;
			}


			return result
		},
		//types of event keys
		kinds: {
			special: ["shift", 'ctrl', 'alt', 'caps'],
			specialChars: ["\b"],
			navigation: ["page-up", 'page-down', 'end', 'home', 'left', 'up', 'right', 'down', 'insert', 'delete'],
			'function': ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12']
		},
		//returns the default function
		// some keys have default functions
		// some 'kinds' of keys have default functions
		getDefault: function( key ) {
			//check if it is described directly
			if ( Syn.key.defaults[key] ) {
				return Syn.key.defaults[key];
			}
			for ( var kind in Syn.key.kinds ) {
				if ( h.inArray(key, Syn.key.kinds[kind]) > -1 && Syn.key.defaults[kind] ) {
					return Syn.key.defaults[kind];
				}
			}
			return Syn.key.defaults.character
		},
		// default behavior when typing
		defaults: {
			'character': function( options, scope, key, force, sel ) {
				if (/num\d+/.test(key) ) {
					key = key.match(/\d+/)[0]
				}

				if ( force || (!Syn.support.keyCharacters && Syn.typeable.test(this)) ) {
					var current = getText(this),
						before = current.substr(0, sel.start),
						after = current.substr(sel.end),
						character = key;

					setText(this, before + character + after);
					//handle IE inserting \r\n
					var charLength = character == "\n" && Syn.support.textareaCarriage ? 2 : character.length;
					Syn.selectText(this, before.length + charLength)
				}
			},
			'c': function( options, scope, key, force, sel ) {
				if ( Syn.key.ctrlKey ) {
					Syn.key.clipboard = Syn.getText(this)
				} else {
					Syn.key.defaults.character.apply(this, arguments);
				}
			},
			'v': function( options, scope, key, force, sel ) {
				if ( Syn.key.ctrlKey ) {
					Syn.key.defaults.character.call(this, options, scope, Syn.key.clipboard, true, sel);
				} else {
					Syn.key.defaults.character.apply(this, arguments);
				}
			},
			'a': function( options, scope, key, force, sel ) {
				if ( Syn.key.ctrlKey ) {
					Syn.selectText(this, 0, getText(this).length)
				} else {
					Syn.key.defaults.character.apply(this, arguments);
				}
			},
			'home': function() {
				Syn.onParents(this, function( el ) {
					if ( el.scrollHeight != el.clientHeight ) {
						el.scrollTop = 0;
						return false;
					}
				})
			},
			'end': function() {
				Syn.onParents(this, function( el ) {
					if ( el.scrollHeight != el.clientHeight ) {
						el.scrollTop = el.scrollHeight;
						return false;
					}
				})
			},
			'page-down': function() {
				//find the first parent we can scroll
				Syn.onParents(this, function( el ) {
					if ( el.scrollHeight != el.clientHeight ) {
						var ch = el.clientHeight
						el.scrollTop += ch;
						return false;
					}
				})
			},
			'page-up': function() {
				Syn.onParents(this, function( el ) {
					if ( el.scrollHeight != el.clientHeight ) {
						var ch = el.clientHeight
						el.scrollTop -= ch;
						return false;
					}
				})
			},
			'\b': function( options, scope, key, force, sel ) {
				//this assumes we are deleting from the end
				if (!Syn.support.backspaceWorks && Syn.typeable.test(this) ) {
					var current = getText(this),
						before = current.substr(0, sel.start),
						after = current.substr(sel.end);

					if ( sel.start == sel.end && sel.start > 0 ) {
						//remove a character
						setText(this, before.substring(0, before.length - 1) + after);
						Syn.selectText(this, sel.start - 1);
					} else {
						setText(this, before + after);
						Syn.selectText(this, sel.start);
					}

					//set back the selection
				}
			},
			'delete': function( options, scope, key, force, sel ) {
				if (!Syn.support.backspaceWorks && Syn.typeable.test(this) ) {
					var current = getText(this),
						before = current.substr(0, sel.start),
						after = current.substr(sel.end);
					if ( sel.start == sel.end && sel.start <= getText(this).length - 1 ) {
						setText(this, before + after.substring(1));
					} else {
						setText(this, before + after);
					}
					Syn.selectText(this, sel.start);
				}
			},
			'\r': function( options, scope, key, force, sel ) {

				var nodeName = this.nodeName.toLowerCase()
				// submit a form
				if (nodeName == 'input' ) {
					Syn.trigger("change", {}, this);
				}
				
				if (!Syn.support.keypressSubmits && nodeName == 'input' ) {
					var form = Syn.closest(this, "form");
					if ( form ) {
						Syn.trigger("submit", {}, form);
					}

				}
				//newline in textarea
				if (!Syn.support.keyCharacters && nodeName == 'textarea' ) {
					Syn.key.defaults.character.call(this, options, scope, "\n", undefined, sel)
				}
				// 'click' hyperlinks
				if (!Syn.support.keypressOnAnchorClicks && nodeName == 'a' ) {
					Syn.trigger("click", {}, this);
				}
			},
			// 
			// Gets all focusable elements.  If the element (this)
			// doesn't have a tabindex, finds the next element after.
			// If the element (this) has a tabindex finds the element 
			// with the next higher tabindex OR the element with the same
			// tabindex after it in the document.
			// @return the next element
			// 
			'\t': function( options, scope ) {
				// focusable elements
				var focusEls = getFocusable(this),
					// the current element's tabindex
					tabIndex = Syn.tabIndex(this),
					// will be set to our guess for the next element
					current = null,
					// the next index we care about
					currentIndex = 1000000000,
					// set to true once we found 'this' element
					found = false,
					i = 0,
					el,
					//the tabindex of the tabable element we are looking at
					elIndex, firstNotIndexed, prev;
				orders = [];
				for (; i < focusEls.length; i++ ) {
					orders.push([focusEls[i], i]);
				}
				var sort = function( order1, order2 ) {
					var el1 = order1[0],
						el2 = order2[0],
						tab1 = Syn.tabIndex(el1) || 0,
						tab2 = Syn.tabIndex(el2) || 0;
					if ( tab1 == tab2 ) {
						return order1[1] - order2[1]
					} else {
						if ( tab1 == 0 ) {
							return 1;
						} else if ( tab2 == 0 ) {
							return -1;
						} else {
							return tab1 - tab2;
						}
					}
				}
				orders.sort(sort);
				//now find current
				for ( i = 0; i < orders.length; i++ ) {
					el = orders[i][0];
					if ( this == el ) {
						if (!Syn.key.shiftKey ) {
							current = orders[i + 1][0];
							if (!current ) {
								current = orders[0][0]
							}
						} else {
							current = orders[i - 1][0];
							if (!current ) {
								current = orders[focusEls.length - 1][0]
							}
						}

					}
				}

				//restart if we didn't find anything
				if (!current ) {
					current = firstNotIndexed;
				}
				current && current.focus();
				return current;
			},
			'left': function( options, scope, key, force, sel ) {
				if ( Syn.typeable.test(this) ) {
					if ( Syn.key.shiftKey ) {
						Syn.selectText(this, sel.start == 0 ? 0 : sel.start - 1, sel.end)
					} else {
						Syn.selectText(this, sel.start == 0 ? 0 : sel.start - 1)
					}
				}
			},
			'right': function( options, scope, key, force, sel ) {
				if ( Syn.typeable.test(this) ) {
					if ( Syn.key.shiftKey ) {
						Syn.selectText(this, sel.start, sel.end + 1 > getText(this).length ? getText(this).length : sel.end + 1)
					} else {
						Syn.selectText(this, sel.end + 1 > getText(this).length ? getText(this).length : sel.end + 1)
					}
				}
			},
			'up': function() {
				if (/select/i.test(this.nodeName) ) {

					this.selectedIndex = this.selectedIndex ? this.selectedIndex - 1 : 0;
					//set this to change on blur?
				}
			},
			'down': function() {
				if (/select/i.test(this.nodeName) ) {
					Syn.changeOnBlur(this, "selectedIndex", this.selectedIndex)
					this.selectedIndex = this.selectedIndex + 1;
					//set this to change on blur?
				}
			},
			'shift': function() {
				return null;
			},
			'ctrl': function() {
				return null;
			}
		}
	});

	h.extend(Syn.create, {
		keydown: {
			setup: function( type, options, element ) {
				if ( h.inArray(options, Syn.key.kinds.special) != -1 ) {
					Syn.key[options + "Key"] = element;
				}
			}
		},
		keypress: {
			setup: function( type, options, element ) {
				// if this browsers supports writing keys on events
				// but doesn't write them if the element isn't focused
				// focus on the element (ignored if already focused)
				if ( Syn.support.keyCharacters && !Syn.support.keysOnNotFocused ) {
					element.focus()
				}
			}
		},
		keyup: {
			setup: function( type, options, element ) {
				if ( h.inArray(options, Syn.key.kinds.special) != -1 ) {
					Syn.key[options + "Key"] = null;
				}
			}
		},
		key: {
			// return the options for a key event
			options: function( type, options, element ) {
				//check if options is character or has character
				options = typeof options != "object" ? {
					character: options
				} : options;

				//don't change the orignial
				options = h.extend({}, options)
				if ( options.character ) {
					h.extend(options, Syn.key.options(options.character, type));
					delete options.character;
				}

				options = h.extend({
					ctrlKey: !! Syn.key.ctrlKey,
					altKey: !! Syn.key.altKey,
					shiftKey: !! Syn.key.shiftKey,
					metaKey: !! Syn.key.metaKey
				}, options)

				return options;
			},
			// creates a key event
			event: function( type, options, element ) { //Everyone Else
				var doc = h.getWindow(element).document || document;
				if ( doc.createEvent ) {
					var event;

					try {

						event = doc.createEvent("KeyEvents");
						event.initKeyEvent(type, true, true, window, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.keyCode, options.charCode);
					}
					catch (e) {
						event = h.createBasicStandardEvent(type, options, doc);
					}
					event.synthetic = true;
					return event;
				}
				else {
					var event;
					try {
						event = h.createEventObject.apply(this, arguments);
						h.extend(event, options)
					}
					catch (e) {}

					return event;
				}
			}
		}
	});

	var convert = {
		"enter": "\r",
		"backspace": "\b",
		"tab": "\t",
		"space": " "
	}

	/**
	 * @add Syn prototype
	 */
	h.extend(Syn.init.prototype, {
		/**
		 * @function key
		 * Types a single key.  The key should be
		 * a string that matches a 
		 * [Syn.static.keycodes].
		 * 
		 * The following sends a carridge return
		 * to the 'name' element.
		 * @codestart
		 * Syn.key('\r','name')
		 * @codeend
		 * For each character, a keydown, keypress, and keyup is triggered if
		 * appropriate.
		 * @param {String|Number} options
		 * @param {HTMLElement} [element]
		 * @param {Function} [callback]
		 * @return {HTMLElement} the element currently focused.
		 */
		_key: function( options, element, callback ) {
			//first check if it is a special up
			if (/-up$/.test(options) && h.inArray(options.replace("-up", ""), Syn.key.kinds.special) != -1 ) {
				Syn.trigger('keyup', options.replace("-up", ""), element)
				callback(true, element);
				return;
			}

			// keep reference to current activeElement
			var activeElement = h.getWindow(element).document.activeElement,			
				caret = Syn.typeable.test(element) && getSelection(element),
				key = convert[options] || options,
				// should we run default events
				runDefaults = Syn.trigger('keydown', key, element),

				// a function that gets the default behavior for a key
				getDefault = Syn.key.getDefault,

				// how this browser handles preventing default events
				prevent = Syn.key.browser.prevent,

				// the result of the default event
				defaultResult,
				
				keypressOptions = Syn.key.options(key, 'keypress');


				if ( runDefaults ) {
					//if the browser doesn't create keypresses for this key, run default
					if (!keypressOptions ) {
						defaultResult = getDefault(key).call(element, keypressOptions, h.getWindow(element), key, undefined, caret)
					} else {
						//do keypress
						// check if activeElement changed b/c someone called focus in keydown
						if( activeElement !== h.getWindow(element).document.activeElement ) {
							element = h.getWindow(element).document.activeElement;
						}
						
						runDefaults = Syn.trigger('keypress', keypressOptions, element)
						if ( runDefaults ) {
							defaultResult = getDefault(key).call(element, keypressOptions, h.getWindow(element), key, undefined, caret)
						}
					}
				} else {
					//canceled ... possibly don't run keypress
					if ( keypressOptions && h.inArray('keypress', prevent.keydown) == -1 ) {
						// check if activeElement changed b/c someone called focus in keydown
						if( activeElement !== h.getWindow(element).document.activeElement ) {
							element = h.getWindow(element).document.activeElement;
						}
						
						Syn.trigger('keypress', keypressOptions, element)
					}
				}
				if ( defaultResult && defaultResult.nodeName ) {
					element = defaultResult
				}

				if ( defaultResult !== null ) {
					setTimeout(function() {
						if(Syn.support.oninput) {
							Syn.trigger('input', Syn.key.options(key, 'input'), element);
						}
						Syn.trigger('keyup', Syn.key.options(key, 'keyup'), element)
						callback(runDefaults, element)
					}, 1)
				} else {
					callback(runDefaults, element)
				}


				//do mouseup
				return element;
			// is there a keypress? .. if not , run default
			// yes -> did we prevent it?, if not run ...
		},
		/**
		 * @function type
		 * Types sequence of [Syn.key key actions].  Each
		 * character is typed, one at a type.
		 * Multi-character keys like 'left' should be
		 * enclosed in square brackents.
		 * 
		 * The following types 'JavaScript MVC' then deletes the space.
		 * @codestart
		 * Syn.type('JavaScript MVC[left][left][left]\b','name')
		 * @codeend
		 * 
		 * Type is able to handle (and move with) tabs (\t).  
		 * The following simulates tabing and entering values in a form and 
		 * eventually submitting the form.
		 * @codestart
		 * Syn.type("Justin\tMeyer\t27\tjustinbmeyer@gmail.com\r")
		 * @codeend
		 * @param {String} options the text to type
		 * @param {HTMLElement} [element] an element or an id of an element
		 * @param {Function} [callback] a function to callback
		 */
		_type: function( options, element, callback ) {
			//break it up into parts ...
			//go through each type and run
			var parts = (options+"").match(/(\[[^\]]+\])|([^\[])/g),
				self = this,
				runNextPart = function( runDefaults, el ) {
					var part = parts.shift();
					if (!part ) {
						callback(runDefaults, el);
						return;
					}
					el = el || element;
					if ( part.length > 1 ) {
						part = part.substr(1, part.length - 2)
					}
					self._key(part, el, runNextPart)
				}

				runNextPart();

		}
	});

	if(!Syn.config.support) {
		//do support code
		!function() {
			if (!document.body ) {
				setTimeout(arguments.callee, 1)
				return;
			}

			var div = document.createElement("div"),
				checkbox, submit, form, input, submitted = false,
				anchor, textarea, inputter, one;

			div.innerHTML = "<form id='outer'>" + 
							"<input name='checkbox' type='checkbox'/>" + 
							"<input name='radio' type='radio' />" + 
							"<input type='submit' name='submitter'/>" + 
							"<input type='input' name='inputter'/>" + 
							"<input name='one'>" + 
							"<input name='two'/>" + 
							"<a href='#abc'></a>" + 
							"<textarea>1\n2</textarea>" +
							"</form>";

			document.documentElement.appendChild(div);
			form = div.firstChild;
			checkbox = form.childNodes[0];
			submit = form.childNodes[2];
			anchor = form.getElementsByTagName("a")[0];
			textarea = form.getElementsByTagName("textarea")[0];
			inputter = form.childNodes[3];
			one = form.childNodes[4];

			form.onsubmit = function( ev ) {
				if ( ev.preventDefault ) ev.preventDefault();
				Syn.support.keypressSubmits = true;
				ev.returnValue = false;
				return false;
			};
			// Firefox 4 won't write key events if the element isn't focused
			inputter.focus();
			Syn.trigger("keypress", "\r", inputter);


			Syn.trigger("keypress", "a", inputter);
			Syn.support.keyCharacters = inputter.value == "a";


			inputter.value = "a";
			Syn.trigger("keypress", "\b", inputter);
			Syn.support.backspaceWorks = inputter.value == "";



			inputter.onchange = function() {
				Syn.support.focusChanges = true;
			}
			inputter.focus();
			Syn.trigger("keypress", "a", inputter);
			form.childNodes[5].focus(); // this will throw a change event
			Syn.trigger("keypress", "b", inputter);
			Syn.support.keysOnNotFocused = inputter.value == "ab";

			//test keypress \r on anchor submits
			Syn.bind(anchor, "click", function( ev ) {
				if ( ev.preventDefault ) ev.preventDefault();
				Syn.support.keypressOnAnchorClicks = true;
				ev.returnValue = false;
				return false;
			})
			Syn.trigger("keypress", "\r", anchor);

			Syn.support.textareaCarriage = textarea.value.length == 4;

			// IE only, oninput event.
			Syn.support.oninput = 'oninput' in one;
			
			document.documentElement.removeChild(div);

			Syn.support.ready++;
		}();
	}
	else {
		Syn.helpers.extend(Syn.support, Syn.config.support);
	}

	return Syn;
});
