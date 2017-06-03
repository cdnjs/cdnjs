document.ready = function(f){
	function a(){
		document.ready(f);
	}
	(/in/.test(document.readyState)) ?
		setTimeout(a, 9) :
		f();
};
function getWindowSize(){
	 var viewportwidth;
	 var viewportheight;
	  
	 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	  
	 if (typeof window.innerWidth != 'undefined')
	 {
		  viewportwidth = window.innerWidth,
		  viewportheight = window.innerHeight;
	 }
	  
	// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	 
	 else if (typeof document.documentElement != 'undefined'
		 && typeof document.documentElement.clientWidth !=
		 'undefined' && document.documentElement.clientWidth != 0)
	 {
		   viewportwidth = document.documentElement.clientWidth,
		   viewportheight = document.documentElement.clientHeight;
	 }
	  
	 // older versions of IE
	  
	 else
	 {
		   viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
		   viewportheight = document.getElementsByTagName('body')[0].clientHeight;
	 }
	return {
		width: viewportwidth,
		height: viewportheight
	};
}
function onetime(node, type, callback){
	// create event
	node.addEventListener(type, function(e) {
		if(!e) e = window.event;
		if(e.type === "keydown" || e.type === "keyup" || e.type === "keypress"){
			var keyCode = e.which || e.keyCode;
			e.keyCode = keyCode;
			e.keyName = Keyder().keycodes[keyCode];
		}
		e.currentEvent = e.type;
		// remove event
		e.target.removeEventListener(e.type, arguments.callee);
		// call handler
		return callback(e);
	});
}
String.prototype.startsWith = function(substring){
	if(this.length < 64){
		return this.slice(0, substring.length) == substring;
	} else{
		return this.lastIndexOf(substring, 0) === 0;
	}
};
String.prototype.endsWith = function(substring){
	if(this.length < 64){
		return this.slice(this.length-substring.length, this.length) == substring;
	} else{
		return this.indexOf(substring, this.length-substring.length) === this.length-substring.length;
	}
};
var Keyder = (function(element){
	if(typeof element === "string"){
		var element = document.getElementById(element);
	} else if(typeof element === "object"){
		var element = element;
	} else{
		var element = document;
	}
	return {
		registerEvent: function(element, event, callback){
			if(document.addEventListener){
				element.addEventListener(event, callback, false);
			} else if(document.attachEvent){
				element.attachEvent("on" + event, callback);
			}
		},
		unregisterEvent: function(element, event, callback){
			callback = (typeof callback === "function") ? callback: function(){};
			if(document.removeEventListener){
				element.removeEventListener(event, callback, false);
			} else if(document.detachEvent){
				element.detachEvent("on" + event, callback);
			}
		},
		keycodes: {
			8: 'backspace', 
			9: 'tab', 
			13: 'enter',
			16: 'shift', 
			17: 'ctrl', 
			18: 'alt',
			20: 'caps_lock',
			27: 'esc',
			32: 'space',
			33: 'page_up', 
			34: 'page_down',
			35: 'end', 
			36: 'home',
			37: 'left', 
			38: 'up', 
			39: 'right',
			40: 'down',
			44: 'print_screen',
			45: 'insert', 
			46: 'delete',
			48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9',
			65: 'a', 66: 'b', 67: 'c', 68: 'd', 69: 'e', 70: 'f', 71: 'g', 72: 'h', 73: 'i', 74: 'j', 75: 'k', 76: 'l', 77: 'm', 78: 'n', 79: 'o', 80: 'p', 81: 'q', 82: 'r', 83: 's', 84: 't', 85: 'u', 86: 'v', 87: 'w', 88: 'x', 89: 'y', 90: 'z',
			112: 'f1', 113: 'f2', 114: 'f3', 115: 'f4', 116: 'f5', 117: 'f6', 118: 'f7', 119: 'f8', 120: 'f9', 121: 'f10', 122: 'f11', 123: 'f12',
			144: 'num_lock',
			187: 'equal',
			189: 'dash',
			191: 'forward_slash',
			220: 'back_slash',
			190: 'dot',
			188: 'comma'
			
		},
		getKeyCodeFromName: function(key){
			if(typeof key === "string"){
				for(var keys in this.keycodes){
					if(this.keycodes[keys].toLowerCase() === key.toLowerCase()){
						return keys;
					}
				}
			}
		},
		keydown: function(key, handler, noautorepeat){
			var self = this;
			keycode = null;
			if(typeof key === "string"){
				for(var keys in this.keycodes){
					if(this.keycodes[keys].toLowerCase() === key.toLowerCase()){
						var keycode = keys;
					}
				}
			} else if(typeof key === "number"){
				keycode = key;
			} else if(typeof key === "function"){
				var that = this;
				this.registerEvent(element, "keydown", function(e){
					if(!e) e = window.event;
					keyCode = e.which || e.keyCode;
					e.keyCode = keyCode;
					that.lastKeyCode = keyCode;
					that.lastKey = that.keycodes[parseInt(keyCode)];
					key.call(self, e);
				});
				return true;
			} else{
				return false;
			}
			if(typeof keycode !== "undefined" && typeof handler === "function" && typeof key !== "object" && !noautorepeat){
				if(!/any/g.test(key)){
					var that = this;
					this.registerEvent(element, "keydown", function(e){
						if(!e) e = window.event;
						keyCode = e.which || e.keyCode;
						e.keyCode = keyCode;
						if(keyCode === parseInt(keycode)){
							that.lastKey = that.keycodes[parseInt(keycode)];
							that.lastKeyCode = keyCode;
							handler.call(self, e);
						}
					});
				} else{
					if(key === "any"){				
						var that = this;
						this.registerEvent(element, "keydown", function(e){
							if(!e) e = window.event;
							keyCode = e.which || e.keyCode;
							e.keyCode = keyCode;
							e.keyName = self.keycodes[keyCode];
							that.lastKey = that.keycodes[parseInt(keyCode)];
							that.lastKeyCode = keyCode;
							handler.call(self, e);
						});
					}
				}
			} else if(typeof keycode !== "undefined" && typeof handler === "function" && typeof key !== "object" && noautorepeat){
				if(!/any/g.test(key)){
					var that = this;
					var allowed = true;
					this.registerEvent(element, "keydown", function(e){
						if(!allowed) return false;
						allowed = false;
						if(!e) e = window.event;
						keyCode = e.which || e.keyCode;
						e.keyCode = keyCode;
						if(keyCode === parseInt(keycode)){
							that.lastKey = that.keycodes[parseInt(keycode)];
							that.lastKeyCode = keyCode;
							handler.call(self, e);
						}
					});
					this.registerEvent(element, "keyup", function(){
						allowed = true;
					});
				} else{
					if(key === "any"){				
						var that = this;
						var allowed = true;
						this.registerEvent(element, "keydown", function(e){
							if(!allowed) return false;
							if(!e) e = window.event;
							keyCode = e.which || e.keyCode;
							e.keyCode = keyCode;
							e.keyName = self.keycodes[keyCode];
							that.lastKey = that.keycodes[parseInt(keyCode)];
							that.lastKeyCode = keyCode;
							handler.call(self, e);
						});
						this.registerEvent(element, "keyup", function(){
							allowed = true;
						});
						this.registerEvent(element, "focus", function(){
							allowed = true;
						});
					}
				}
				return this;
			} else{
				return false;
			}
			return this;
		},
		keyup: function(key, handler){
			var self = this;
			keycode = null;
			if(typeof key === "string"){
				for(var keys in this.keycodes){
					if(this.keycodes[keys].toLowerCase() === key.toLowerCase()){
						var keycode = keys;
					}
				}
			} else if(typeof key === "number"){
				keycode = key;
			} else if(typeof key === "function"){
				var that = this;
				this.registerEvent(element, "keyup", function(e){
					if(!e) e = window.event;
					keyCode = e.which || e.keyCode;
					e.keyCode = keyCode;
					that.lastKeyCode = keyCode;
					that.lastKey = that.keycodes[parseInt(keyCode)];
					key.call(self, e);
				});
				return true;
			} else{
				return false;
			}
			if(typeof keycode !== "undefined" && typeof handler === "function" && typeof key !== "object"){
				if(!/any/g.test(key)){
					var that = this;
					this.registerEvent(element, "keyup", function(e){
						if(!e) e = window.event;
						keyCode = e.which || e.keyCode;
						e.keyCode = keyCode;
						if(keyCode === parseInt(keycode)){
							that.lastKey = that.keycodes[parseInt(keycode)];
							that.lastKeyCode = keyCode;
							handler.call(self, e);
						}
					});
				} else{
					if(key === "any"){				
						var that = this;
						this.registerEvent(element, "keyup", function(e){
							if(!e) e = window.event;
							keyCode = e.which || e.keyCode;
							e.keyCode = keyCode;
							that.lastKey = that.keycodes[parseInt(keyCode)];
							that.lastKeyCode = keyCode;
							handler.call(self, e);
						});
					}
				}
			} else{
				return false;
			}
			return this;
		},
		click: function(callback, second){
			var self = this;
			if(typeof callback === "function"){
				this.registerEvent(element, "mousedown", function(e){
					if(!e) e = window.event;
					callback.call(self, e);
				});
			}
			if(typeof second === "function"){
				this.registerEvent(element, "mouseup", function(e){
					if(!e) e = window.event;
					second.call(self, e);
				});
			}
			return this;
		},
		blur: function(callback){
			var self = this;
			if(typeof callback === "function"){
				this.registerEvent(element, "blur", function(e){
					if(!e) e = window.event;
					callback.call(self, e);
				});
			}
			return this;
		},
		focus: function(callback){
			var self = this;
			if(typeof callback === "function"){
				this.registerEvent(element, "focus", function(e){
					if(!e) e = window.event;
					callback.call(self, e);
				});
			}
			return this;
		},
		touchstart: function(callback){
			var self = this;
			if(typeof callback === "function"){
				this.registerEvent(element, "touchstart", function(e){
					if(!e) e = window.event;
					callback.call(self, e);
				});
			}
		},
		touchend: function(callback){
			var self = this;
			if(typeof callback === "function"){
				this.registerEvent(element, "touchend", function(e){
					if(!e) e = window.event;
					callback.call(self, e);
				});
			}
			return this;
		},
		touchmove: function(callback){
			var self = this;
			if(typeof callback === "function"){
				this.registerEvent(element, "touchmove", function(e){
					if(!e) e = window.event;
					callback.call(self, e);
				});
			}
			return this;
		},
		touchcancel: function(callback){
			var self = this;
			if(typeof callback === "function"){
				this.registerEvent(element, "touchcancel", function(e){
					if(!e) e = window.event;
					callback.call(self, e);
				});
			}
			return this;
		},
		touchleave: function(callback){
			var self = this;
			if(typeof callback === "function"){
				this.registerEvent(element, "touchleave", function(e){
					if(!e) e = window.event;
					callback.call(self, e);
				});
			}
			return this;
		},
		on: function(event, callback){
			var self = this;
			if(typeof event === "string" && typeof callback === "function"){
				if(/\s/g.test(event)){
					event = event.replace(/(\s+)/g, " ");
					var events = event.split(" ");
					for(var evt in events){
						if(events[evt].startsWith("on")){
							events[evt] = events[evt].substring(2);
						}
						this.registerEvent(element, events[evt], function(e){
							if(!e) e = window.event;
							if(e.type === "keydown" || e.type === "keyup" || e.type === "keypress"){
								var keyCode = e.which || e.keyCode;
								e.keyCode = keyCode;
								e.keyName = self.keycodes[keyCode];
							}
							e.currentEvent = e.type;
							callback.call(self, e);
						});
					}
				} else{
					this.registerEvent(element, event, function(e){
						if(!e) e = window.event;
						if(e.type === "keydown" || e.type === "keyup" || e.type === "keypress"){
							var keyCode = e.which || e.keyCode;
							e.keyCode = keyCode;
							e.keyName = self.keycodes[keyCode];
						}
						e.currentEvent = e.type;
						callback.call(self, e);
					});
				}
			}
			return this;
		},
		off: function(event){
			if(typeof event === "string"){
				this.unregisterEvent(element, event);
			} 
			return this;
		},
		one: function(event, callback){
			if(typeof event === "string" && typeof callback === "function"){
				onetime(element, event, callback);
			}
			return this;
		},
		bind: function(event, callback){
			this.on(event, callback);
			return this;
		},
		readystatechange: function(){
			this.registerEvent(element, "readystatechange", function(e){
				if(!e) e = window.event;
				callback.call(self, e);
			});
			return this;
		},
		change: function(callback){
			var self = this;
			if(typeof callback === "function"){
				this.registerEvent(element, "change", function(e){
					if(!e) e = window.event;
					callback.call(self, e);
				});
			}
			return this;
		},
		rightclick: function(callback, second){
			var self = this;
			if(typeof callback === "function"){
				this.registerEvent(element, "mousedown", function(e){
					if(!e) e = window.event;
					var which = e.which || (e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0)));
					if(which === 3){
						callback.call(self, e);
					}
				});
			}
			if(typeof second === "function"){
				this.registerEvent(element, "mouseup", function(e){
					if(!e) e = window.event;
					var which = e.which || (e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0)));
					if(which === 3){
						second.call(self, e);
					}
				});
			}
			return this;
		},
		contextmenu: function(callback){
			var self = this;
			var el = document.createElement('div');
			el.oncontextmenu = function(){return;}
			if(typeof el.oncontextmenu === "function"){
				this.registerEvent(element, "contextmenu", function(e){
					if(!e) e = window.event;
					callback.call(self, e);
				});
			} else{
				this.rightClick(callback);
			}
			return this;
		},
		doubleclick: function(callback){
			if(typeof callback === "function"){
				var self = this;
				this.registerEvent(element, "dblclick", function(e){
					if(!e) e = window.event;
					callback.call(self, e);
				});
			}
			return this;
		},
		singledoubleclick: function(single_click_callback, double_click_callback, timeout) {
			var clicks = 0, self = this;
			this.click(function(event){
				clicks++;
				if (clicks == 1) {
					setTimeout(function(){
						if(clicks == 1) {
							single_click_callback.call(self, event);
						} else {
							double_click_callback.call(self, event);
						}
						clicks = 0;
					}, timeout || 300);
				}
			});
			return this;
		},
		trigger: function(event){
			if("createEvent" in document){
				var evt = document.createEvent("HTMLEvents");
				evt.initEvent(event, false, true);
				element.dispatchEvent(evt);
			} else {
				element.fireEvent("on"+event);
			}
			return this;
		},
		mousewheel: function(callback){
			var self = this;
			var el = document.createElement('div');
			el.onmousewheel = function(){return;}
			if(typeof el.onmousewheel === "function"){
				this.registerEvent(element, "mousewheel", function(e){
					if(!e) e = window.event;
					callback.call(self, e);
				});
			} else{
				this.registerEvent(element, "DOMMouseScroll", function(e){
					if(!e) e = window.event;
					callback.call(self, e);
				});
			}
			return this;
		},
		scroll: function(callback){
			var self = this;
			this.registerEvent(element, "scroll", function(e){
				if(!e) e = window.event;
				e.scrollTop = element.scrollTop;
				callback.call(self, e);
			});
		},
		focusin: function(callback){
			var self = this;
			this.registerEvent(element, "focusin", function(e){
				if(!e) e = window.event;
				callback.call(self, e);
			});
			return this;
		},
		focusout: function(callback){
			var self = this;
			this.registerEvent(element, "focusout", function(e){
				if(!e) e = window.event;
				callback.call(self, e);
			});
			return this;
		},
		mouseover: function(callback){
			var self = this;
			this.registerEvent(element, "mouseover", function(e){
				if(!e) e = window.event;
				callback.call(self, e);
			});
			return this;
		},
		mouseenter: function(callback){
			var self = this;
			this.registerEvent(element, "mouseover", function(e){
				if(!e) e = window.event;
				callback.call(self, e);
			});
			return this;
		},
		mouseleave: function(callback){
			var self = this;
			this.registerEvent(element, "mouseover", function(e){
				if(!e) e = window.event;
				callback.call(self, e);
			});
			return this;
		},
		mouseout: function(callback){
			var self = this;
			this.registerEvent(element, "mouseover", function(e){
				if(!e) e = window.event;
				callback.call(self, e);
			});
			return this;
		},
		mousedown: function(callback){
			var self = this;
			this.registerEvent(element, "mousedown", function(e){
				if(!e) e = window.event;
				callback.call(self, e);
			});
			return this;
		},
		mouseup: function(callback){
			var self = this;
			this.registerEvent(element, "mouseup", function(e){
				if(!e) e = window.event;
				callback.call(self, e);
			});
			return this;
		},
		hover: function(callback, second){
			var self = this;
			if(typeof callback === "function"){
				this.registerEvent(element, "mouseenter", function(e){
					if(!e) e = window.event;
					callback.call(self, e);
				});
			}
			if(typeof second === "function"){
				this.registerEvent(element, "mouseleave", function(e){
					if(!e) e = window.event;
					second.call(self, e);
				});
			}
			return this;
		},
		resize: function(callback){
			var self = this;
			if(typeof callback === "function" && element === window){
				this.registerEvent(element, "resize", function(e){
					if(!e) e = window.event;
					e.windowWidth = getWindowSize().width;
					e.windowHeight = getWindowSize().height;
					callback.call(self, e);
				});
			}
			return this;
		}
	}
});
