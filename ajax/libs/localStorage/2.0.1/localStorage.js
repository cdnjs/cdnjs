(function (window, document, location, navigator, undefined, f, t) {
	"use strict";
	
	var proto,
	    ready = f,
		docDomain = document.domain,
		protocol = location.protocol || document.protocol,
		bodyElem = document.body || document.getElementsByTagName("body")[0],
		objectPrototype = Object.prototype,
		name = "name",
		object = "object",
		local = "local",
		host = "host",
		domain = "domain",
		onunload = "onunload",
		script = "script",
		body = "body",
		html = "html",
		title = "title",
		head = "head",
		div = "div",
		type = "type",
		none = "none",
		param = "param",
		value = "value",
		string = "String",
		func = "Function",
		number = "Number",
		userData = "UserData",
		flash = "Flash",
		cookie = "Cookie",
		storage = "Storage",
		quotaExceeded = "QuotaExceeded",
		outOfMemory = " is out of memory",
		localStorage = "localStorage",
		flashMime = "application/x-shockwave-flash",
		flashAox = "ShockwaveFlash.ShockwaveFlash",
		flashPlugin = "Shockwave Flash",
		isUndefined = function (_arg) {
			return _arg === undefined;
		},
		isIE = function () {
			var result = f; 

			/* jshint ignore:start */
			result = new Function("return/*@cc_on!@*/!1")() || 
			         ( isNumber(document.documentMode) && 
			           document.documentMode <= 10 );
			/* jshint ignore:end */

			return result;
		},
		fixKey = function (_key) {
			var forbidden = new RegExp(
				"[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g"
			);
			return _key.replace(/^d/, "___$&").replace(forbidden, "___");
		},
		each = function (_array, _callback) {
			var length = _array.length;
			while (length) {
				length -= 1;
				if ( !isUndefined(_array.key) ) {
					_callback.call(this, _array.key(length), length);
				} else {
					_callback.call(this, _array[length], length);
				}
			}
		},
		forEach = function (_object, _callback) {
			var key = null;
			for (key in _object) {
				if (_object.hasOwnProperty(key)) {
					_callback.call(this, _object[key], key);
				}
			}
		},
		attribute = function (_element, _key, _value) {
			var att;
			if ( !!_element.setAttribute ) {
				// Supported by most browsers.
				_element.setAttribute(_key, _value);
			} else if ( !!_element.attributes ) {
				// Another way of applying attributes.
				_element.attributes[_key] = _value;
			} else if ( !!_element.createAttribute ) {
				// Yet another way supported by DOM1
				att = document.createAttribute(_key);
				att.value = _value;
				_element.setAttributeNode(att);
			} else {
				// Last option.
				_element[_key] = _value;
			}
		},
		element = function (_arg) {
			return document.createElement(_arg);
		},
		toInt = function (_arg) {
			return parseInt(_arg, 10);
		},
		hasFlash = function () {
			var flash,
			    description;
			try {
				flash = new ActiveXObject(flashAox);
				if ( flash ) {
					description = flash.GetVariable("$version");	
					if ( description && 
						 toInt(description.split(" ")[1].split(",")[0]) >= 9 ) {
						return t;
					}
				}
				return f;
			} catch (ignore) {
				if ( isObject(navigator.plugins[flashPlugin]) && 
				     !isUndefined(navigator.mimeTypes) && 
				     !isUndefined(navigator.mimeTypes[flashMime]) ) {
					description = navigator.plugins[flashPlugin].description;
					if ( navigator.mimeTypes[flashMime].enabledPlugin && 
					     !isUndefined(description) ) {
						description = description.replace(
							/^.*\s+(\S+\s+\S+$)/, 
							"$1"
						);
						if ( toInt(description.replace(/^(.*)\..*$/, "$1")) >= 9 ) {
							return t;
						}
					}
				}
				return f;
			}
		},
		isObject = function (_arg) {
			return _arg === Object(_arg);
		},
		isString = function (_arg) {
			return typeof _arg === string.toLowerCase() || 
		           objectPrototype.toString.call(_arg) === "[" + object + " " + string + "]";
		},
		isFunction = function (_arg) {
			return typeof _arg === func.toLowerCase() || 
			       objectPrototype.toString.call(_arg) === "[" + object + " " + func + "]";
		},
		isNumber = function (_arg) {
			return typeof _arg === number.toLowerCase() || 
			       objectPrototype.toString.call(_arg) === "[" + object + " " + number + "]";
		},
		appendChild = function (_parent, _child) {
			_parent.insertBefore(
				_child, 
				_parent.lastChild ? 
				_parent.lastChild.nextSibling : 
				_parent.lastChild
			);
		},
		swfURL = (function() {
			var scripts = document.scripts || 
			              document.getElementsByTagName("script"),
			    source = scripts[scripts.length-1].src.split("?"),
			    url = null;

			if (source[1]) {
				each(source[1].split("&"), function (_arg) {
					var data = _arg.split("=");

					if (data[0] === "swfURL") {
						url = decodeURIComponent(data[1].replace(/\+/g,  " "));
						return url;
					}
				});	
			}

			return url;
		})();

	// Inspired by the solution from John Resig
	// http://ejohn.org/blog/simple-javascript-inheritance/#postcomment
	function Class(){} 
	Class.extend = function(_values) {
		var Self = this,
		    superClass = Self.prototype,
		    protoClass = new Self(Class),
		    superMethod = function () {
				return (function (name, fn) {
					return function() {
						var res,
						    temp = this.$super;
       
						// Add a new super method that is the same method
						// but on the super-class
						this.$super = superClass[name];

						res = fn.apply(this, arguments);        

						this.$super = temp;

						return res;
				  };				
				}(arguments[0], arguments[1]));
		    };
 
		// Copy the properties over onto the new prototype
		forEach(_values, function (_value, _name) {
			// Check if we're overwriting an existing function
			protoClass[_name] = ( isFunction(_value) && 
			 					 isFunction(superClass[_name]) ) ?
								 superMethod.call(Self, _name, _value) :
								 _value;
		});
 
		function Persistent () {
			var self = this;

			if ( !(self instanceof Persistent) ) {
				return new Persistent(arguments[0]);
			}

			if ( arguments[0] !== Class && self.init ) {
				self.init.apply(self, arguments);
			}
		}
		Persistent.prototype = protoClass;
		Persistent.prototype.constructor = Persistent;
		Persistent.extend = Self.extend;

		return Persistent;
	};

	var GlobalStorage = Class.extend({
		"init" : function () {
			var self = this;
			if ( location.hostname === local + host ) {
				self.__storage__ = window.globalStorage[
					local + host + "." + local + domain
				];
			} else {
				self.__storage__ = window.globalStorage[location.hostname];
			}
			self.length = self.__storage__.length;
		},

		"key" : function (_index) {
			var self = this;
			
			return (_index+1 > self.length || _index < 0) ?
				null : self.__storage__.key(_index);
		},

		"getItem" : function (_key) {
			var self = this,
			    object = self.__storage__.getItem(_key);
			if ( isObject(object) ) {
				return object.value;
			}
			return object;
		},

		"setItem" : function (_key, _data) {
			var self = this;
			self.__storage__.setItem(_key, _data);
			self.length = self.__storage__.length;
		},

		"removeItem" : function (_key) {
			var self = this;
			self.__storage__.removeItem(_key);
			self.length = self.__storage__.length;
		},

		"clear" : function () {
			var self = this;
			each(self.__storage__, function (_key) {
				self.removeItem(_key);
			});
		},

		"isLoaded" : function () {
			return t;
		}
	});
	GlobalStorage.prototype.constructor = GlobalStorage;
	window.GlobalStorage = GlobalStorage;

	var UserDataStorage = Class.extend({
		"init" : function () {
			var self = this,
			    AXO,
			    owner,
			    garbage = function () {
			    	window.detachEvent(onunload, garbage);
			    	AXO = owner = self.__storage__ = null;
					/* jshint ignore:start */
			    	if ( isFunction(CollectGarbage) ) {
			    		CollectGarbage();
			    	}
					/* jshint ignore:end */
			    };

			try {
				AXO = new ActiveXObject("htmlfile");
				AXO.open();
				AXO.write(
					"<" + html + "><" + head + "><" + title + ">" + localStorage + "</" + title + ">" + 
					"<" + script + " " + type + "=\"text/javascript\">" +
					"document." + domain + " = '" + protocol + "//" + docDomain + "';" +
					"</" + script + ">" +
					"</" + head + "><" + body + "></" + body + "></" + html + ">"
				);
				AXO.close();
				owner = AXO.body;
				self.__storage__ = AXO.createElement(div);

				window.attachEvent(onunload, garbage);
			} catch (ignore) {
				owner = bodyElem;
				self.__storage__ = element(div);
			}

			appendChild(owner, self.__storage__); 

			self.__storage__.style.display = none;
			self.__storage__.addBehavior("#default#userData");
			self.__storage__.load(localStorage + "_" + docDomain);

			self.__attributes__ = 
				self.__storage__.XMLDocument.documentElement.attributes;
			self.length = self.__attributes__.length;
		},

		"key" : function (_index) {
			var self = this,
			    result = null;
			try {
				result =  _index >= self.length ? 
					null : self.__attributes__[_index].name;
			} catch (ignore) {}
			
			return result;
		},

		"getItem" : function (_key) {
			var self = this;
			return self.__storage__.getAttribute(fixKey(_key));
		},

		"setItem" : function (_key, _data) {
			var self = this;
			try {
				self.__storage__.setAttribute(fixKey(_key), _data);
				self.__storage__.save(localStorage + "_" + docDomain);
				self.length = self.__attributes__.length;
			} catch (e) {
				throw {
					"name" : userData + quotaExceeded,
					"message" : userData + storage + outOfMemory
				};
			}
		},

		"removeItem" : function (_key) {
			var self = this;
			self.__storage__.removeAttribute(fixKey(_key));
			self.__storage__.save(localStorage + "_" + docDomain);
			self.length = self.__attributes__.length;
		},

		"clear" : function () {
			var self = this;
			each(self.__attributes__, function (_attr) {
				self.removeItem(_attr.name);		
			});
		},

		"isLoaded" : function () {
			return t;
		}
	});
	UserDataStorage.prototype.constructor = UserDataStorage;
	window.UserDataStorage = UserDataStorage;

	var FlashStorage = Class.extend({
		"init" : function (onerror) {
			var self = this,
			    owner,
			    url = swfURL || localStorage + ".swf",
			    timeout = 2000,
			    attrs = "",
		        attributes = {
		        	"id" : localStorage,
		        	"name" : localStorage,
		        	"width" : 1,
		        	"height" : 1
		        },
		        parameters = {
		        	allowScriptAccess : "always",
		        	wmode : "transparent",
		        	flashvars : "readyFn=window._swfReady"
		        },
		        swfLoaded = function (_object, _callback, _error) {
		        	var cTimer = null,
		        		eTimer = null,
		        		clear = function () {
		        			clearInterval(cTimer);
		        			clearTimeout(eTimer);
		        			eTimer = cTimer = null;
		        		};

		        	cTimer = setInterval(function () {
		        		if ( ( objectPrototype.hasOwnProperty.call(_object, "PercentLoaded") && 
		        		       _object.PercentLoaded() === 100 ) ||
			    			 ready ) {	
		        			clear.call(self);
		        			_callback.call(self);
		        		}
		        	}, 10);
		        	eTimer = setTimeout(function () {
		        		clear.call(self);
			    		if ( isFunction(_error) )  {
			    			_error.call(self);
			    		}
		        	}, timeout);
		        }, unload = function () {
			    	var timer = null;

			    	window.detachEvent(onunload, unload);
			    	
			    	owner.style.display = none;
			    	timer = setInterval(function () {
			    		if (owner.readyState === 4) {
			    			clearInterval(timer);
			    			each(owner, function (_arg) {
			    				if ( isFunction(_arg) ) {	
			    					_arg = null;
			    				}
			    			});
			    			owner.parentNode.removeChild(owner);
			    		}
			    	}, 10);
			    };

			window._swfReady = function (_bool) {
				ready = _bool;
			};

			try {
				attributes.classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";
				parameters.movie = url;

				forEach(attributes, function (_value, _key) {
					attrs += _key + "=\"" + _value + "\" ";
				});

				owner = element(
					"<" + object + " " + attrs + ">"
				);

				forEach(parameters, function (_value, _key) {
					var par = element(
						"<" + param + " " + name + "='" + _key + "' " + value + "='" + _value + "'>"
					);
					appendChild(owner, par); 
				});

				window.attachEvent(onunload, unload);
			} catch (ignore) {
				if ( !isIE() ) {
					delete attributes.classid;
					delete parameters.movie;
				}

				owner = element(object);

				forEach(parameters, function (_value, _key) {
					var par = element(param);
					attribute(par, name, _key);
					attribute(par, value, _value);
					appendChild(owner, par);
				});

				if ( !isIE() ) {
					attribute(owner, type, flashMime);
					attribute(owner, "data", url);
				}

				forEach(attributes, function (_value, _key) {
					attribute(owner, _key, _value);
				});
			}

			appendChild(bodyElem, owner);

			swfLoaded.call(self, owner, function () {
				self.__storage__ = document[localStorage] || 
						           document.getElementById(localStorage) || 
						           document.embeds[localStorage];

				self.length = self.__storage__.length();

				self.key = function (_index) {
					return self.__storage__.key(_index);
				};

				self.getItem = function (_key) {
					return self.__storage__.getItem(_key);		
				};

				self.setItem = function (_key, _data) {
					if ( !self.__storage__.setItem(_key, _data) ) {
						throw {
							"name" : flash + quotaExceeded,
							"message" : flash + storage + outOfMemory
						};
					}
					self.length = self.__storage__.length(); 
				};

				self.removeItem = function (_key) {
					self.__storage__.removeItem(_key);
					self.length = self.__storage__.length();
				};

				self.clear = function () {
					self.__storage__.clear();
					self.length = self.__storage__.length();
				};

				self.isLoaded = function () {
					return t;
				};
			}, onerror);
		},

		"isLoaded" : function () {
			return f;
		}
	});
	FlashStorage.prototype.constructor = FlashStorage;
	window.FlashStorage = FlashStorage;

	var CookieStorage = Class.extend({
		"length" : (function () {
			var count = document.cookie.match(/\=/g);
			return count && count.length || 0;
		}()),

		"key" : function (_index) {
			var key = window.unescape(
				document.cookie.replace(
					/\s*\=(?:.(?!;))*$/, 
					""
				).split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/).sort()[_index]
			);
			return key === "" ? null : key;
		},

		"getItem" : function (_key) {
			var item = document.cookie.indexOf(_key + "=") === -1 ? 
			    "" : window.unescape(
					document.cookie.replace(
						new RegExp(
							"(?:^|.*;\\s*)" +
							window.escape(_key).replace(/[\-\.\+\*]/g, "\\$&") +
							"\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"
						),
						"$1"
					)
				);
			return item === "" ? null : item;
		},

		"setItem" : function (_key, _data) {
			var self = this,
			    count = 0, 
			    cook = window.escape(_key) + "=" + window.escape(_data) +
			             "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";

			if (cook.length > 4093) {
				throw {
					"name" : cookie + quotaExceeded,
					"message" : cookie + storage + outOfMemory
				};
			}

			document.cookie = cook;

			count = document.cookie.match(/\=/g);
			self.length = count && count.length || 0;
		},

		"removeItem" : function (_key) {
			var self = this,
			    count = 0;

			document.cookie = window.escape(_key) + "=" +
			                  "; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

			count = document.cookie.match(/\=/g);
			self.length = count && count.length || 0;
		},

		"clear" : function () {
			var self = this;
			each(self, function (_key) {
				self.removeItem(_key);
			});	
		},

		"isLoaded" : function () {
			return t;
		}
	});
	CookieStorage.prototype.constructor = CookieStorage;
	window.CookieStorage = CookieStorage;

	try {
		window.localStorage.setItem(localStorage, localStorage);
		window.localStorage.removeItem(localStorage);
	} catch (ignore) {
		if ( window.globalStorage ) {
			proto = GlobalStorage;
		} else if ( document.documentElement && 
		            document.documentElement.addBehavior ) {
			proto = UserDataStorage;
		} else if ( hasFlash() ) {
			proto = FlashStorage;
		} else if ( navigator.cookieEnabled ) {
			proto = CookieStorage;
		}

		var Storage = proto.extend({
			"key" : function (_index) {
				var self = this;
				if ( isNumber(_index) && 
				     _index < self.length && 
					 _index >= 0 ) {
					return self.$super(_index);
				}
				return null;
			},

			"getItem" : function (_key) {
				var self = this;
				if ( isString(_key) ) {
					return self.$super(_key);
				}
				return null;
			},

			"setItem" : function (_key, _value) {
				var self = this,
				    value = isString(_value) ? _value : 
                            ( !(_value === null || isUndefined(_value)) &&
							  objectPrototype.hasOwnProperty.call(_value, "toString") ? 
						    _value.toString() : objectPrototype.toString.call(_value));
				if ( isString(_key) ) {
					self.$super(
						_key, 
						value	
					);
				}
			},

			"removeItem" : function (_key) {
				var self = this;
				if ( isString(_key) ) {
					self.$super(_key);
				}
			},

			"isLoaded" : function (_callback) {
				var self = this,
					timer = null;

				if ( !isFunction(_callback) ) {
					return;
				}

				if ( self.$super() ) {
					return _callback.call(self);
				}

				timer = setInterval(function () {
					if ( self.$super() ) {
						clearInterval(timer);
						timer = null;
						_callback.call(self);
					}
				}, 10);
			}
		});
		Storage.prototype.constructor = Storage;
		window.Storage = Storage;
		window.localStorage = new Storage(
			function () {
				window.localStorage = new CookieStorage();
			}
		);
	}

}(window, window.document, window.location, window.navigator, void(0), false,
  true));
