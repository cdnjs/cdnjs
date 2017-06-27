/*
 * Title: Typewriter JS
 * Descritpion: A native javascript plugin that can be used to create an elegent automatic typewriter animation effect on websites.
 * Author: Tameem Safi
 * Website: https://safi.me.uk
 * Version: 1.0.0
 */

(function() {

	"use strict";

	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	// MIT license
	(function() {
	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
	                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }
	 
	    if (!window.requestAnimationFrame)
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
	              timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	 
	    if (!window.cancelAnimationFrame)
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	}());

	window.Typewriter = function Typewriter(element, options) {
		this._settings = {
			cursorAnimationPaused: false,
			opacityIncreasing: false,
			currentOpacity: 1,
			delayedQue: [],
			delayItemsCount: 0,
			eventQue: [],
			calledEvents: [],
			eventRunning: false,
			timeout: false,
			delayExecution: false,
			fps: (60/1000),
			typingFrameCount: 0,
			stringToTypeHTMLArray: [],
			currentTypedCharacters: [],
			typing: false,
			usedIDs: [],
			charAmountToDelete: false,
			userOptions: {},
			eventLoopRerun: 0
		};

		if(!element) {
			return console.error('Please choose an DOM element so that type writer can display itself.');
		}

		// if(!options.strings && !(options.strings instanceof Array || typeof options.strings === 'string')) {
		// 	return console.error('Please enter an array of strings for the typewriter animation to work.');
		// }

		if(typeof options !== 'object') {
			return console.error('Typewriter only accepts the options as an object.');
		}

		this._settings.userOptions = options;

		this.default_options = {
			strings: false,
			cursorClassName: 'typewriter-cursor',
			cursor: '|',
			animateCursor: true,
			blinkSpeed: 50,
			typingSpeed: 'natural',
			deleteSpeed: 'natural',
			charSpanClassName: 'typewriter-char',
			wrapperClassName: 'typewriter-wrapper',
			loop: false,
			autoStart: false,
			devMode: false
		};

		this.options = this._setupOptions(options);

		this.el = element;

		this._setupTypwriterWrapper();

		this._startCursorAnimation();

		if(this.options.autoStart === true && this.options.strings) {
			this.typeOutAllStrings();
		}

	};

	var TypewriterPrototype = window.Typewriter.prototype;

	TypewriterPrototype.stop = function() {
		this._addToEventQue(this._stopEventLoop)
		return this;
	};

	TypewriterPrototype.start = function() {
		this._startEventLoop();
		return this;
	};

	TypewriterPrototype.rerun = function() {
		this._addToEventQue(this._rerunCalledEvents);
		return this;
	};

	TypewriterPrototype.typeString = function(string) {
		if(!string || typeof string != 'string') {
			return console.error('Please enter a string as the paramater.');
		}

		var string_chars = this._getCharacters(string);

		this._addToEventQue([this._typeCharacters, [string_chars]]);

		return this;
	};

	TypewriterPrototype.deleteAll = function() {

		this._addToEventQue([this._deleteChars, ['all']]);

		return this;
	};

	TypewriterPrototype.deleteChars = function(amount) {
		this._addToEventQue([this._deleteChars, [amount]]);
		return this;
	};

	TypewriterPrototype.pauseFor = function(ms) {
		this._addToEventQue([this._pauseFor, [ms]]);
		return this;
	};

	TypewriterPrototype.typeOutAllStrings = function() {		
		var characters_array = this._getStringsAsCharsArray();

		if(characters_array.length === 1) {
			this._typeCharacters(characters_array[0]);
		} else {
			for(var i = 0, length = characters_array.length; i < length; i++) {
				this._addToEventQue([this._typeCharacters, [characters_array[i]]]);
				this.pauseFor(this._randomInteger(1500, 2500));
				this.deleteAll();
				this.pauseFor(this._randomInteger(1500, 2500));
			}
		}

		return this;

	};

	TypewriterPrototype.changeSettings = function(new_settings) {
		if(!new_settings && typeof new_settings !== 'object') {
			return console.error('Typewriter will only accept an object as the settings.');
		}

		this._addToEventQue([this._changeSettings, [JSON.stringify(new_settings)]]);

		return this;

	};

	TypewriterPrototype.changeBlinkSpeed = function(new_speed) {
		if(!new_speed && typeof new_speed !== 'number') {
			return console.error('Please enter a number for the new blink speed.');
		}

		this.changeSettings({
			blinkSpeed: new_speed
		});

		return this;
	};

	TypewriterPrototype.changeTypingSpeed = function(new_speed) {
		if(!new_speed && typeof new_speed !== 'number') {
			return console.error('Please enter a number for the new typing speed.');
		}

		var new_settings = {
			typingSpeed: new_speed
		};

		this.changeSettings({
			typingSpeed: new_speed
		});

		return this;
	};

	TypewriterPrototype.changeDeleteSpeed = function(new_speed) {
		if(!new_speed && typeof new_speed !== 'number') {
			return console.error('Please enter a number for the new delete speed.');
		}

		this.changeSettings({
			changeDeleteSpeed: new_speed
		});

		return this;
	};

	TypewriterPrototype._rerunCalledEvents = function() {
		if(this._settings.currentTypedCharacters.length > 0) {
			this.deleteAll();
			this._resetEventLoop('rerunCalledEvents');
		} else {
			this._settings.eventQue = this._settings.calledEvents;
			this._settings.calledEvents = [];
			this.options = this._setupOptions(this._settings.userOptions);
			this._settings.usedIDs = [];
			this.charAmountToDelete = false;
			this._startEventLoop();
		}
	};

	TypewriterPrototype._deleteChars = function(amount) {


		if(amount) {
			this._settings.charAmountToDelete = amount;
		}
		this._deletingCharIdsAnimation = window.requestAnimationFrame(this._deletingCharAnimationFrame.bind(this));
		return this;
	};

	TypewriterPrototype._pauseFor = function(ms) {
		var self = this;
		self._settings.eventRunning = true;
		setTimeout(function() {
			self._resetEventLoop('pauseFor');
		}, ms);
	};

	TypewriterPrototype._changeSettings = function(new_settings) {
		this.options = this._setupOptions(JSON.parse(new_settings[0]));
		this._resetEventLoop('changeSettings');

		if(this.options.devMode) {
			console.log('New settings', this.options);
		}

	};

	TypewriterPrototype._deletingCharAnimationFrame = function() {
		var self = this;
		var delete_speed = this.options.deleteSpeed;
		var typewriter_wrapper_class_name = self.options.wrapperClassName;
		var current_typed_char_ids = self._settings.currentTypedCharacters;
		var char_amount_to_delete = self._settings.charAmountToDelete;

		if(!self._settings.charAmountToDelete || self._settings.charAmountToDelete === 0 || current_typed_char_ids === 0) {
			self._resetEventLoop('deletingCharAnimationFrame');
			return true;
		}

		if(delete_speed == 'natural') {
			delete_speed = self._randomInteger(50, 150);
		}

		if(char_amount_to_delete == 'all') {
			char_amount_to_delete = current_typed_char_ids.length;
			self._settings.charAmountToDelete = char_amount_to_delete;
		} 

		setTimeout(function() {
			if(self._settings.charAmountToDelete) {
				var last_typed_char_index = current_typed_char_ids.length - 1;
				var get_last_typed_char = current_typed_char_ids[last_typed_char_index];

				self._settings.currentTypedCharacters.splice(last_typed_char_index, 1);

				var char_to_delete_el = document.getElementById(get_last_typed_char);

				if(char_to_delete_el) {
					var typewriter_wrapper_el = self.el.querySelector('.' + typewriter_wrapper_class_name);
					typewriter_wrapper_el.removeChild(char_to_delete_el);
					self._settings.charAmountToDelete = char_amount_to_delete - 1;

					if(self.options.devMode) {
						console.log('Deleted char with ID', get_last_typed_char);
					}
				}

			}

			self._deletingCharIdsAnimation = window.requestAnimationFrame(self._deletingCharAnimationFrame.bind(self));

		}, delete_speed);
	};

	TypewriterPrototype._setupOptions = function(new_options) {
	    var merged_options = {};

	    for (var attrname in this.default_options) {
	    	merged_options[attrname] = this.default_options[attrname];
	    }

	    if(this._settings.userOptions) {
	    	for (var attrname in this._settings.userOptions) {
		    	merged_options[attrname] = this._settings.userOptions[attrname];
		    }
	    }

	    for (var attrname in new_options) {
	    	merged_options[attrname] = new_options[attrname];
	    }

	    return merged_options;
	}

	TypewriterPrototype._addToEventQue = function(event) {
		this._settings.eventQue.push(event);
		if(this._settings.eventQue.length > 0 && !this._settings.eventRunning && this.options.autoStart) {
			this._startEventLoop();
		}
	};

	TypewriterPrototype._startEventLoop = function() {
		if(this.options.devMode) {
			console.log('Event loop started.');
		}

		if(!this._settings.eventRunning) {

			if(this._settings.eventQue.length > 0) {
				this.eventLoopRerun = 0;
				var first_event = this._settings.eventQue[0];
				if(typeof first_event == 'function') {
					this._settings.eventRunning = true;
					this._settings.calledEvents.push(first_event);
					this._settings.eventQue.splice(0, 1);
					first_event.call(this);
					if(this.options.devMode) {
						console.log('Event started.');
					}
				} else if(first_event instanceof Array) {
					if(typeof first_event[0] == 'function' && first_event[1] instanceof Array) {
						this._settings.eventRunning = true;
						this._settings.calledEvents.push(first_event);
						this._settings.eventQue.splice(0, 1);
						first_event[0].call(this, first_event[1]);
						if(this.options.devMode) {
							console.log('Event started.');
						}
					}
				}
			}
			this._eventQueAnimation = window.requestAnimationFrame(this._startEventLoop.bind(this));
		}

		if(!this._settings.eventRunning && this._settings.eventQue.length <= 0) {
			var self = this;
			self._stopEventLoop();
			setTimeout(function() {
				if(self.options.loop) {
					self.eventLoopRerun++;
					if(self.options.devMode) {
						console.log('Before Loop State', self._settings);
					}
					if(self.eventLoopRerun > 4) {
						console.error('Maximum amount of loop retries reached.');
						self._stopEventLoop();
					} else {
						if(self.options.devMode) {
							console.log('Looping events.');
						}
						self._rerunCalledEvents();
					}
				}
			}, 1000);
			return;
		}

	};

	TypewriterPrototype._resetEventLoop = function(name) {
		var event_name = name || 'Event';
		this._settings.eventRunning = false;
		this._startEventLoop();
		if(this.options.devMode) {
			console.log(event_name, 'Finished');
		}
	};

	TypewriterPrototype._stopEventLoop = function() {
		window.cancelAnimationFrame(this._eventQueAnimation);
		if(this.options.devMode) {
			console.log('Event loop stopped.');
		}
	};

	TypewriterPrototype._setupTypwriterWrapper = function() {
		var typewriter_wrapper_class_name = this.options.wrapperClassName;
		var typewriter_wrapper = document.createElement('span');
		typewriter_wrapper.className = typewriter_wrapper_class_name;
		this.el.innerHTML = '';
		this.el.appendChild(typewriter_wrapper);
	};

	TypewriterPrototype._typeCharacters = function(characters_array) {
		this._settings.stringToTypeHTMLArray = this._convertCharsToHTML(characters_array);
		this._typingAnimation = window.requestAnimationFrame(this._typingAnimationFrame.bind(this, characters_array.length));
		return this;
	};

	TypewriterPrototype._typingAnimationFrame = function(total_items) {
		var self = this;
		var typing_speed = this.options.typingSpeed;
		var typewriter_wrapper_class_name = self.options.wrapperClassName;

		if(self._settings.stringToTypeHTMLArray.length == 0) {
			window.cancelAnimationFrame(self._typingAnimation);
			this._resetEventLoop('typingAnimationFrame');
			return true;
		}

		if(typing_speed == 'natural') {
			typing_speed = this._randomInteger(50, 150);
		}

		setTimeout(function() {
			var el_inner_html = self.el.innerHTML;
			var item_to_type = self._settings.stringToTypeHTMLArray[0];
			self.el.querySelector('.' + typewriter_wrapper_class_name).appendChild(item_to_type.el);
			self._settings.currentTypedCharacters.push(item_to_type.id);
			self._settings.stringToTypeHTMLArray.splice(0, 1);
			self._typingAnimation = window.requestAnimationFrame(self._typingAnimationFrame.bind(self, total_items));
			if(self.options.devMode) {
				console.log('Typed', item_to_type);
			}
		}, typing_speed);
	};

	TypewriterPrototype._convertCharsToHTML = function(chars) {
		var chars_html_wrap_array = [];
		var char_class_name = this.options.charSpanClassName;
		var chars_array = chars[0];

		for(var i = 0, length = chars_array.length; i < length; i++) {
			var char_element = document.createElement('span');
			var char_id = this._generateUniqueID();
			char_element.id = char_id;
			char_element.className = char_class_name + ' typewriter-item-' + i;
			char_element.innerHTML = chars_array[i];
			chars_html_wrap_array.push({
				id: char_id,
				el: char_element
			});
		}

		return chars_html_wrap_array;
	};

	TypewriterPrototype._getCharacters = function(string) {
    if(typeof string !== 'string') {
    	return false;
    }
    return string.split("");
	};

	TypewriterPrototype._getStringsAsCharsArray = function() {
		var strings_array_check = this.options.strings instanceof Array;
		var strings_string_check = typeof this.options.strings === 'string';
		if(!strings_array_check) {
			if(!strings_string_check) {
				return console.error('Typewriter only accepts strings or an array of strings as the input.');
			}
			return [this.options.strings.split("")];
		}

		var strings_chars_array = [];

		for (var i = 0, length = this.options.strings.length; i < length; i++) {
			var string_chars = this._getCharacters(this.options.strings[i]);
			if(!string_chars) {
				console.error('Please enter only strings.');
				break;
			}
			strings_chars_array.push(string_chars);
    }

    return strings_chars_array;
	};

	TypewriterPrototype._cursorAnimationFrame = function() {
		if(!this._settings.cursorAnimationPaused) {
			var blink_speed = this.options.blinkSpeed;
			var opacity_amount = (1/1000) * blink_speed;

			var cursor_el = this.el.querySelector('.typewriter-cursor');

			if(this._settings.opacityIncreasing == true) {
				if(this._settings.currentOpacity >= 1) {
					this._settings.opacityIncreasing = false;
					this._settings.currentOpacity = 1;
				}

				this._settings.currentOpacity += opacity_amount;
			}

			if(this._settings.opacityIncreasing == false) {
				if(this._settings.currentOpacity <= 0) {
					this._settings.opacityIncreasing = true;
					this._settings.currentOpacity = 0;
				}

				this._settings.currentOpacity -= opacity_amount;
			}

			cursor_el.style.opacity = this._settings.currentOpacity;
			this._cursorAnimation = window.requestAnimationFrame(this._cursorAnimationFrame.bind(this));
		}
	};

	TypewriterPrototype._startCursorAnimation = function() {
		var cursor = this.options.cursor;
		var cursor_class_name = this.options.cursorClassName;
		
		var cursor_element = document.createElement('span');
		cursor_element.className = cursor_class_name;
		cursor_element.innerHTML = cursor;

		this.el.appendChild(cursor_element);
		if(this.options.animateCursor) {
			this._cursorAnimation = window.requestAnimationFrame(this._cursorAnimationFrame.bind(this));
		}
	};

	TypewriterPrototype._pauseCursorAnimation = function() {
		if(!this._settings.cursorAnimationPaused) {
			window.cancelAnimationFrame(this._cursorAnimation);
			this._settings.cursorAnimationPaused = true;
		}
	};

	TypewriterPrototype._restartCursorAnimation = function() {
		if(!this._settings.cursorAnimationPaused) {
			return console.error('Cursor animation is already running.')
		}

		this._settings.cursorAnimationPaused = false;
		this._cursorAnimation = window.requestAnimationFrame(this._cursorAnimationFrame.bind(this));
	};

	/* Utils */
	TypewriterPrototype._randomInteger = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	TypewriterPrototype._randomID = function() {
		var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < this._randomInteger(5, 15); i++ ) {
    	text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
    return text;
	};

	TypewriterPrototype._generateUniqueID = function() {
		var temp_id = this._randomID();
		if(this._settings.usedIDs.indexOf(temp_id) == -1) {
			this._settings.usedIDs.push(temp_id);
			return temp_id;
		}
		return this._generateUniqueID.call(this); 
	};


})();