(function (window, document, location, navigator, undefined, name) {
	"use strict";

function Helper () {
		var self = this;
		
		/**
		 * Variable holding the body element.
		 */
		self.body = document.body || document.getElementsByTagName("body")[0];

		/**
		 * Variable holding the documents protocol.
		 */
		self.protocol = location.protocol || document.protocol;

		/**
		 * Variable holding the documents domain.
		 */
		self.domain = document.domain;

		/**
		 * Variable holding the Object prototype.
		 */
		self.oProto = Object.prototype;

		/**
		 * Function to check whether the argument is undefined.
		 */
		self.isUndefined = function (_arg) {
			return _arg === undefined;
		};

		/**
		 * Function to check if the browser is IE.
		 */
		self.isIE = function () {
			var result = false; 

			/* jshint ignore:start */
			result = new Function("return/*@cc_on!@*/!1")() || 
			         ( self.isNumber(document.documentMode) && 
			           document.documentMode <= 10 );
			/* jshint ignore:end */

			return result;
		};

		/**
		 * Function to fix the key of a storage function
		 */
		self.fixKey = function (_key) {
			var forbidden = new RegExp(
				"[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g"
			);
			return _key.replace(/^d/, "___$&").replace(forbidden, "___");
		};

		/**
		 * Function to iterate through array.
		 */
		self.each = function (_array, _callback) {
			var length = _array.length;
			while (length) {
				length -= 1;
				if ( !self.isUndefined(_array.key) ) {
					_callback.call(self, _array.key(length), length);
				} else {
					_callback.call(self, _array[length], length);
				}
			}
		};

		/**
		 * Function to iterate through object.
		 */
		self.forEach = function (_object, _callback) {
			var key = null;
			for (key in _object) {
				if (_object.hasOwnProperty(key)) {
					_callback.call(self, _object[key], key);
				}
			}
		};

		/**
		 * Function to add attributes to element.
		 */
		self.attribute = function (_element, _key, _value) {
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
		};

		/**
		 * Function to retrieve the swf url based on the src of the script.
		 */
		self.swfURL = (function() {
			var scripts = document.scripts || 
			              document.getElementsByTagName("script"),
			    source = scripts[scripts.length-1].src.split("?"),
			    url = null;

			if (source[1]) {
				self.each(source[1].split("&"), function (_arg) {
					var data = _arg.split("=");

					if (data[0] === "swfURL") {
						url = decodeURIComponent(data[1].replace(/\+/g,  " "));
						return url;
					}
				});	
			}

			return url;
		})();

		/**
		 * Function that emulates the appendChild method.
		 */
		self.appendChild = function (_parent, _child) {
			_parent.insertBefore(
				_child, 
				_parent.lastChild ? 
				_parent.lastChild.nextSibling : 
				_parent.lastChild
			);
		};

		/**
		 * Function to create an element.
		 */
		self.element = function (_arg) {
			return document.createElement(_arg);
		};

		/**
		 * Function that returns an integer in base 10.
		 */
		self.toInt = function (_arg) {
			return parseInt(_arg, 10);
		};

		/**
		 * Function that determines if flash is available.
		 */
		self.hasFlash = function () {
			var flash, 
			    description,
			    mimetype = "application/x-shockwave-flash";
			try {
				flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				if ( flash ) {
					description = flash.GetVariable("$version");	
					if ( description && 
						 _.toInt(description.split(" ")[1].split(",")[0]) >= 9 ) {
						return true;
					}
				}
				return false;
			} catch (ignore) {
				if ( _.isObject(navigator.plugins["Shockwave Flash"]) && 
				     !_.isUndefined(navigator.mimeTypes) && 
				     !_.isUndefined(navigator.mimeTypes[mimetype]) ) {
					description = navigator.plugins["Shockwave Flash"].description;
					if ( navigator.mimeTypes[mimetype].enabledPlugin && 
					     !_.isUndefined(description) ) {
						description = description.replace(
							/^.*\s+(\S+\s+\S+$)/, 
							"$1"
						);
						if ( _.toInt(description.replace(/^(.*)\..*$/, "$1")) >= 9 ) {
							return true;
						}
					}
				}
				return false;
			}
		};

		/**
		 * Function to check whether the argument is an Object.
		 */
		self.isObject = function (_arg) {
			return _arg === Object(_arg);
		};

		/**
		 * Functions to check the type of a given argument.
		 */
		self.each.call(self,
			[
				"String",
				"Function",
				"Number"
			],
			function (_type) {
				self["is" + _type] = function (_arg) {
					return typeof _arg === _type.toLowerCase() || 
					       self.oProto.toString.call(_arg) === "[object " + _type + "]";
				};
			}
		);
	}
	Helper.prototype.constructor = Helper;
	var _ = new Helper(),
		ready = false,
		proto;

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
		_.forEach(_values, function (_value, _name) {
			// Check if we're overwriting an existing function
			protoClass[_name] = ( _.isFunction(_value) && 
							      _.isFunction(superClass[_name]) ) ?
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
			if ( location.hostname === "localhost" ) {
				self.__storage__ = window.globalStorage["localhost.localdomain"];
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
			if ( _.isObject(object) ) {
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
			_.each(self.__storage__, function (_key) {
				self.removeItem(_key);
			});
		},

		"isLoaded" : function () {
			return true;
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
			    	window.detachEvent("onunload", garbage);
			    	AXO = owner = self.__storage__ = null;
					/* jshint ignore:start */
			    	if ( _.isFunction(CollectGarbage) ) {
			    		CollectGarbage();
			    	}
					/* jshint ignore:end */
			    };

			try {
				AXO = new ActiveXObject("htmlfile");
				AXO.open();
				AXO.write(
					"<html><head><title>" + name + "</title>" + 
					"<script type=\"text/javascript\">" +
					"document.domain = '" + _.protocol + "//" + _.domain + "';" +
					"</script>" +
					"</head><body></body></html>"
				);
				AXO.close();
				owner = AXO.body;
				self.__storage__ = AXO.createElement("div");

				window.attachEvent("unload", garbage);
			} catch (ignore) {
				owner = _.body;
				self.__storage__ = _.element("div");
			}

			_.appendChild(owner, self.__storage__); 

			self.__storage__.style.display = "none";
			self.__storage__.addBehavior("#default#userData");
			self.__storage__.load(name + "_" + _.domain);

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
			return self.__storage__.getAttribute(_.fixKey(_key));
		},

		"setItem" : function (_key, _data) {
			var self = this;
			try {
				self.__storage__.setAttribute(_.fixKey(_key), _data);
				self.__storage__.save(name + "_" + _.domain);
				self.length = self.__attributes__.length;
			} catch (e) {
				throw {
					"name" : "UserDataQuotaExceeded",
					"message" : "UserData is out of memory"
				};
			}
		},

		"removeItem" : function (_key) {
			var self = this;
			self.__storage__.removeAttribute(_.fixKey(_key));
			self.__storage__.save(name + "_" + _.domain);
			self.length = self.__attributes__.length;
		},

		"clear" : function () {
			var self = this;
			_.each(self.__attributes__, function (_attr) {
				self.removeItem(_attr.name);		
			});
		},

		"isLoaded" : function () {
			return true;
		}
	});
	UserDataStorage.prototype.constructor = UserDataStorage;
	window.UserDataStorage = UserDataStorage;

	var FlashStorage = Class.extend({
		"init" : function (onerror) {
			var self = this,
			    owner,
			    url = _.swfURL ? _.swfURL : name + ".swf",
			    timeout = 2000,
			    attrs = "",
			    mimetype = "application/x-shockwave-flash",
		        attributes = {
		        	"id" : name,
		        	"name" : name,
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
		        		if ( ( _.oProto.hasOwnProperty.call(_object, "PercentLoaded") && 
		        		       _object.PercentLoaded() === 100 ) ||
			    			 ready ) {	
		        			clear.call(self);
		        			_callback.call(self);
		        		}
		        	}, 10);
		        	eTimer = setTimeout(function () {
		        		clear.call(self);
			    		if ( _.isFunction(_error) )  {
			    			_error.call(self);
			    		}
		        	}, timeout);
		        }, unload = function () {
			    	var timer = null;

			    	window.detachEvent("onunload", unload);
			    	
			    	owner.style.display = "none";
			    	timer = setInterval(function () {
			    		if (owner.readyState === 4) {
			    			clearInterval(timer);
			    			_.each(owner, function (_arg) {
			    				if ( _.isFunction(_arg) ) {	
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

				_.forEach(attributes, function (_value, _key) {
					attrs += _key + "=\"" + _value + "\" ";
				});

				owner = _.element(
					"<object " + attrs + ">"
				);

				_.forEach(parameters, function (_value, _key) {
					var param = _.element(
						"<param name='" + _key + "' value='" + _value + "'>"
					);
					_.appendChild(owner, param);
				});

				window.attachEvent("onunload", unload);
			} catch (ignore) {
				if ( !_.isIE() ) {
					delete attributes.classid;
					delete parameters.movie;
				}

				owner = _.element("object");

				_.forEach(parameters, function (_value, _key) {
					var param = _.element("param");
					_.attribute(param, "name", _key);
					_.attribute(param, "value", _value);
					_.appendChild(owner, param);
				});

				if ( !_.isIE() ) {
					_.attribute(owner, "type", mimetype);
					_.attribute(owner, "data", url);
				}

				_.forEach(attributes, function (_value, _key) {
					_.attribute(owner, _key, _value);
				});
			}

			_.appendChild(_.body, owner);

			swfLoaded.call(self, owner, function () {
				self.__storage__ = document[name] || 
						           document.getElementById(name) || 
						           document.embeds[name];

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
							"name" : "FlashQuotaExceeded",
							"message" : "FlashStorage is out of memory"
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
					return true;
				};
			}, onerror);
		},

		"isLoaded" : function () {
			return false;
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
			    cookie = window.escape(_key) + "=" + window.escape(_data) +
			             "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";

			if (cookie.length > 4093) {
				throw {
					name : "CookieQuotaExceeded",
					message : "CookieStorage is out of memory"
				};
			}

			document.cookie = cookie;

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
			_.each(self, function (_key) {
				self.removeItem(_key);
			});	
		},

		"isLoaded" : function () {
			return true;
		}
	});
	CookieStorage.prototype.constructor = CookieStorage;
	window.CookieStorage = CookieStorage;

	try {
		window.localStorage.setItem(name, name);
		window.localStorage.removeItem(name);
	} catch (ignore) {
		if ( window.globalStorage ) {
			proto = GlobalStorage;
		} else if ( document.documentElement && 
		            document.documentElement.addBehavior ) {
			proto = UserDataStorage;
		} else if ( _.hasFlash() ) {
			proto = FlashStorage;
		} else if ( navigator.cookieEnabled ) {
			proto = CookieStorage;
		}

		var Storage = proto.extend({
			"key" : function (_index) {
				var self = this;
				if ( _.isNumber(_index) && 
				     _index < self.length && 
					 _index >= 0 ) {
					return self.$super(_index);
				}
				return null;
			},

			"getItem" : function (_key) {
				var self = this;
				if ( _.isString(_key) ) {
					return self.$super(_key);
				}
				return null;
			},

			"setItem" : function (_key, _value) {
				var self = this,
				    value = _.isString(_value) ? _value : 
                            ( !(_value === null || _.isUndefined(_value)) && 
							  _.oProto.hasOwnProperty.call(_value, "toString") ? 
					        _value.toString() : _.oProto.toString.call(_value));
				if ( _.isString(_key) ) {
					self.$super(
						_key, 
						value	
					);
				}
			},

			"removeItem" : function (_key) {
				var self = this;
				if ( _.isString(_key) ) {
					self.$super(_key);
				}
			},

			"isLoaded" : function (_callback) {
				var self = this,
					timer = null;

				if ( !_.isFunction(_callback) ) {
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

}(window, window.document, window.location, window.navigator, void(0), 
  "localStorage"));
