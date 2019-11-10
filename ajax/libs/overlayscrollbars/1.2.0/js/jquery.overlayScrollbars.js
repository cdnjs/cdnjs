/*!
 * OverlayScrollbars
 * https://github.com/KingSora/OverlayScrollbars
 *
 * Version: 1.2.0
 * 
 * Copyright KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 * Date: 29.12.2017
 */

(function (global, factory) {
	if (typeof define === 'function' && define.amd)
		return define(['jquery'], function(jQuery) { return factory(window, document, undefined, jQuery); });
	else if (typeof exports === 'object')
		return module.exports = factory(window, document, undefined, require('jquery'));
	else
		return factory(window, document, undefined, jQuery);
}(this, (function(window, document, undefined, jQuery) {
	'use-strict';
	var PLUGINNAME = "OverlayScrollbars";
	var COMPATIBILITY = {
		/**
		 * Gets the current window width.
		 * @returns {Number|number} The current window width in pixel.
		 */
		wW: function() {
			return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		},

		/**
		 * Gets the current window height.
		 * @returns {Number|number} The current window height in pixel.
		 */
		wH: function() {
			return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		},

		/**
		 * Gets the MutationObserver Object or undefined if not supported.
		 * @returns {MutationObserver|*|undefined} The MutationsObserver Object or undefined.
		 */
		mO: function() {
			return window.MutationObserver || window.WebKitMutationObserver || window.WebkitMutationObserver || window.MozMutationObserver || undefined;
		},

		/**
		 * Gets the ResizeObserver Object or undefined if not supported.
		 * @returns {MutationObserver|*|undefined} The ResizeObserver Object or undefined.
		 */
		rO: function() {
			return window.ResizeObserver || window.WebKitResizeObserver || window.WebkitResizeObserver || window.MozResizeObserver || undefined;
		},

		/**
		 * Gets the RequestAnimationFrame method or it's corresponding polyfill.
		 * @returns {*|Function} The RequestAnimationFrame method or it's corresponding polyfill.
		 */
		rAF: function() {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (func) {
					return window.setTimeout(func, 1000 / 60);
				};
		},

		/**
		 * Gets the CancelAnimationFrame method or it's corresponding polyfill.
		 * @returns {*|Function} The CancelAnimationFrame method or it's corresponding polyfill.
		 */
		cAF: function() {
			return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function (id) {
					return window.clearTimeout(id);
				};
		},

		/**
		 * Gets the current time.
		 * @returns {number} The current time.
		 */
		now: function() {
			return Date.now() || new Date().getTime();
		},

		/**
		 * Stops the propagation of the given event.
		 * @param e The event of which the propagation shall be stoped.
		 */
		stpP: function(e) {
			if(e.stopPropagation)
				e.stopPropagation();
			else
				e.cancelBubble = true;
		},

		/**
		 * Prevents the default action of the given event.
		 * @param e The event of which the default action shall be prevented.
		 */
		prvD: function(e) {
			if(e.preventDefault)
				e.preventDefault();
			else
				e.returnValue = false;
		},

		/**
		 * Gets the pageX and pageY values of the given mouse event.
		 * @param e The mouse event of which the pageX and pageX shall be got.
		 * @returns {x: number, y: number} x = pageX value, y = pageY value.
		 */
		page: function(e) {
			e = e.originalEvent || e;

			var strPage = 'page';
			var strClient = 'client';
			var strX = 'X';
			var strY = 'Y';
			var target = e.target || e.srcElement || document;
			var eventDoc = target.ownerDocument || document;
			var doc = eventDoc.documentElement;
			var body = eventDoc.body;

			//if touch event return return pageX/Y of it
			if(e.touches !== undefined) {
				var touch = e.touches[0];
				return {
					x : touch[strPage + strX],
					y : touch[strPage + strY]
				}
			}

			// Calculate pageX/Y if not native supported
			if (!e[strPage + strX] && e[strClient + strX] && e[strClient + strX] != null) {

				return {
					x : e[strClient + strX] +
					(doc && doc.scrollLeft || body && body.scrollLeft || 0) -
					(doc && doc.clientLeft || body && body.clientLeft || 0),
					y : e[strClient + strY] +
					(doc && doc.scrollTop || body && body.scrollTop || 0) -
					(doc && doc.clientTop || body && body.clientTop || 0)
				}
			}
			return {
				x : e[strPage + strX],
				y : e[strPage + strY]
			};
		},

		/**
		 * Gets the clicked mouse button of the given mouse event.
		 * @param e The mouse event of which the clicked button shal be got.
		 * @returns {number} The number of the clicked mouse button. (1 : leftButton | 2 : middleButton | 3 : rightButton)
		 */
		mBtn: function(e) {
			if (!e.which && e.button !== undefined)
				return (e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0)));
			else
				return e.which;
		}
	};
	var HELPER = (function(jQuery) {

		/**
		 * The jQuery initialization interface.
		 * @param options The initial options for the construction of the plugin. To initialize the plugin, this option has to be a object! If it isn't a object, the instance(s) are returned and the plugin wont be initialized.
		 * @returns {*} After initialization it returns the jQuery element array, else it returns the instance(s) of the elements which are selected.
		 */
		jQuery.fn.overlayScrollbars = function (options) {
			var _elements = this;
			if(jQuery.isPlainObject(options)) {
				jQuery.each(_elements, function() { window[PLUGINNAME](this, options); });
				return _elements;
			}
			else
				return window[PLUGINNAME](_elements, options);
		};

		return jQuery;
	})(jQuery);
	var INSTANCES = (function(helper) {
		var _targets = [ ];
		var _instancePropertyString = '__overlayScrollbars__';

		/**
		 * Registers the given instance to the given element.
		 * @param target The target element.
		 * @param instance The instance.
		 */
		function registerInstanceToTarget(target, instance) {
			target[_instancePropertyString] = instance;
			_targets.push(target);
		}

		/**
		 * Unregisters the instance from the given element.
		 * @param target The target element.
		 */
		function unregisterInstanceFromTarget(target) {
			var index = helper.inArray(target, _targets);
			if (index > -1) {
				delete target[_instancePropertyString];
				_targets.splice(index, 1);
			}
		}

		/**
		 * Checks if the target element has a registered instance.
		 * @param target The target element.
		 * @returns {boolean} True if the target element is already registered, false otherwise.
		 */
		function targetHasRegisteredInstance(target) {
			return getRegisteredInstanceFromTarget(target) !== undefined;
		}

		/**
		 * Gets the registered instance of the given element.
		 * @param target The target element.
		 * @returns {*} The registered instance of the target or undefined if there isn't any.
		 */
		function getRegisteredInstanceFromTarget(target) {
			for(var i = 0; i < _targets.length; i++)
				if(target === _targets[i])
					return target[_instancePropertyString];

		}

		return {
			all : function() {
				return _targets;
			},
			add : registerInstanceToTarget,
			rem : unregisterInstanceFromTarget,
			has : targetHasRegisteredInstance,
			get : getRegisteredInstanceFromTarget
		};
	})(HELPER);
	var BYPROPERTYPATH = (function(helper) {
		/**
		 * Super 1337 recursive method which i don't want to document entirely.
		 * @param object The object.
		 * @param propertyString The PropertyString.
		 * @param propertyStringProgress The PropertyStringProgress (generated automatically because of recursion, if you call this method manually, pass undefined or a empty string!)
		 * @param callbackOnProperty Callback which gets called if the property was found.
		 * @param callbackOnParentObject
		 * @returns {boolean|string} True if property found, false or string otherwise. A string indicates where the property path couldn't be resolved anymore.
		 */
		function _getPropertyByStringMaster(object, propertyString, propertyStringProgress, callbackOnProperty, callbackOnParentObject) {
			var strFunc = 'function';
			var strObject = 'object';
			var found = false;
			propertyStringProgress = propertyStringProgress === undefined ? '' : propertyStringProgress;

			if (typeof propertyString !== 'string')
				return found;
			if (propertyString.length === 0)
				return found;

			if (propertyStringProgress === "") {
				var nameSplit = propertyString.split('.');
				var currObj = object;
				var nameProgression = "";
				var pathIsInvalid = false;

				for (var i = 0; i < nameSplit.length; i++) {
					var currSplit = nameSplit[i];
					currObj = currObj[currSplit];
					nameProgression += currSplit + '.';
					if (helper.type(currObj) !== strObject && i + 1 !== nameSplit.length) {
						pathIsInvalid = true;
						break;
					}
				}
				if (pathIsInvalid)
					return nameProgression.slice(0, -1);
			}

			for (var prop in object) {
				if (object.hasOwnProperty(prop)) {
					var isSearchedProperty = (propertyStringProgress + prop) === propertyString;
					if (helper.type(object[prop]) === strObject && !isSearchedProperty) {
						found = _getPropertyByStringMaster(object[prop], propertyString, propertyStringProgress + prop + '.', callbackOnProperty, callbackOnParentObject);
						if (typeof callbackOnParentObject === strFunc)
							callbackOnParentObject(object, prop);
						if (found)
							break;
					}
					else if (isSearchedProperty) {
						if (typeof callbackOnProperty === strFunc)
							callbackOnProperty(object, prop);
						found = true;
						break;
					}
				}
			}

			return found;
		};

		return {
			/**
			 * Indicates whether the given object has the given property path.
			 * @param object {object} The object to which the property path shall be applied.
			 * @param propertyPath {string} The property path which shall be checked.
			 * @returns {boolean} True if the object has the given property path, false otherwise.
			 */
			has : function(object, propertyPath) {
				return _getPropertyByStringMaster(object, propertyPath);
			},

			/**
			 * Gets the value of the property which is represented by the property path.
			 * @param object {object} The object to which the property path shall be applied.
			 * @param propertyPath {string} The property path which leads to the property which shall be get.
			 * @returns {object|undefined} The property value of the property to which the given property path led. Undefined if the property path led to a non existent property.
			 */
			get : function(object, propertyPath) {
				var result;
				_getPropertyByStringMaster(object, propertyPath, '', function (obj, prop) {
					result = obj[prop];
				});
				return result;
			},

			/**
			 * Changes the value of the property which is represented by the property path.
			 * If the property to which the property path leads does not exist, then nothing happens.
			 * @param object {object} The object to which the property path shall be applied.
			 * @param propertyPath {string} The property path which leads to the property which shall be set.
			 * @param propertyValue {object} The value of the property to which the property path leads.
			 * @param create {boolean} Indicates whether the property shall be created if it is not existent. With this parameter set to true the return value will be also always true.
			 * @returns {boolean} True if the property was found and the value was successfully changed, false otherwise.
			 */
			set : function setPropertyByString(object, propertyPath, propertyValue, create) {
				var result = false;
				_getPropertyByStringMaster(object, propertyPath, '', function (obj, prop) {
					obj[prop] = propertyValue;
					result = true;
				});
				if (!result && create) {
					var propertyPathSplits = propertyPath.split('.');
					var obj = {};
					var tmp = obj;
					for (var i = 0; i < propertyPathSplits.length; i++) {
						var value = i === propertyPathSplits.length - 1 ? propertyValue : {};
						tmp = tmp[propertyPathSplits[i]] = value;
					}
					helper.extend(true, object, obj);
					result = true;
				}
				return result;
			},

			/**
			 * Deletes the property which is represented by the property path.
			 * @param object {object} The object to which the property path shall be applied.
			 * @param propertyPath {string} The property path which leads to the property which shall be deleted.
			 * @param deleteParentObjectIfEmpty {boolean} True if the parent object of the property which shall be deleted, shall be deleted too if it is empty after the deletion of the property.
			 * @returns {boolean} True if the property to which the property path shall lead, was found and deleted, false otherwise.
			 */
			del : function delPropertyByString(object, propertyPath, deleteParentObjectIfEmpty) {
				var result = false;
				_getPropertyByStringMaster(object, propertyPath, '', function (obj, prop) {
					delete obj[prop];
					result = true;
				}, function (obj, prop) {
					if (deleteParentObjectIfEmpty) {
						if (helper.isEmptyObject(obj[prop])) {
							delete obj[prop];
						}
					}
				});
				return result;
			}
		};
	})(HELPER);
	var PLUGIN = (function(compatibility, instances, helper, byPropertyPath) {
		var _pluginGlobals;
		var _pluginAutoUpdateLoop;
		var _pluginDefaultOptions = {
			className : 'os-theme-dark',    //null || string
			resize : 'none',                //none || both  || horizontal || vertical || n || b || h || v
			sizeAutoCapable : true,         //true || false
			clipAlways : true,              //true || false
			normalizeRTL : true,            //true || false
			paddingAbsolute : false,        //true || false
			autoUpdate : null,              //true || false || null
			autoUpdateInterval : 33,        //number
			nativeScrollbarsOverlaid : {
				showNativeScrollbars : false,   //true || false
				initialize : true               //true || false
			},
			overflowBehavior : {
				x : 'scroll', //visible-hidden  || visible-scroll || hidden || scroll || v-h || v-s || h || s
				y : 'scroll'  //visible-hidden  || visible-scroll || hidden || scroll || v-h || v-s || h || s
			},
			scrollbars : {
				visibility : 'auto',    //visible || hidden || auto || v || h || a
				autoHide : 'never',     //never || scroll || leave || n || s || l
				autoHideDelay : 800,    //number
				dragScrolling : true,   //true || false
				clickScrolling : false, //true || false
				touchSupport : true     //true || false
			},
			textarea : {
				dynWidth : false,  //true || false
				dynHeight : false  //true || false
			},
			callbacks : {
				onInitialized : null,               //null || function
				onInitializationWithdrawn : null,   //null || function
				onDestroyed : null,                 //null || function
				onScrollStart : null,               //null || function
				onScroll : null,                    //null || function
				onScrollStop: null,                 //null || function
				onOverflowChanged : null,           //null || function
				onOverflowAmountChanged : null,     //null || function
				onDirectionChanged : null,          //null || function
				onContentSizeChanged : null,        //null || function
				onHostSizeChanged : null,           //null || function
				onUpdated : null                    //null || function
			}
		};

		/**
		 * Initializes the object which contains global information about the plugin and each instance of it.
		 */
		function initOverlayScrollbarsStatics() {
			if(_pluginGlobals === undefined)
				_pluginGlobals = new OverlayScrollbarsGlobals(_pluginDefaultOptions);
			if(_pluginAutoUpdateLoop === undefined)
				_pluginAutoUpdateLoop = new OverlayScrollbarsAutoUpdateLoop(_pluginGlobals);
		}

		/**
		 * The global object for the hide scrollbars objects. It contains resources which every hide scrollbars object needs. This object is initialized only once: if the first hide scrollbars object gets initialized.
		 * @param defaultOptions
		 * @constructor
		 */
		function OverlayScrollbarsGlobals(defaultOptions) {
			var _base = this;
			_base.defaultOptions = defaultOptions;
			_base.autoUpdateLoop = false;
			_base.autoUpdateRecommended = compatibility.mO() === undefined;
			var bodyElement = helper('body');
			var scrollbarDummyElement = helper('<div id="hs-dummy-scrollbar-size"><div style="height: 200%; width: 200%;"></div></div>');
			var nativeScrollbarSize = (function() {
				bodyElement.append(scrollbarDummyElement);
				var strOverflow = 'overflow';
				var scrollbarDummyElement0 = scrollbarDummyElement[0];
				var dummyContainerChild = helper(scrollbarDummyElement.children('div').first());
				var IEBUGFIX = scrollbarDummyElement0.offsetHeight; //IE9 causes a bug where offsetHeight is zero for no reason
				var scrollbarSize;
				if(IEBUGFIX === 0)
					scrollbarDummyElement.hide().show();
				var scrollbarSize = {
					x: scrollbarDummyElement0.offsetHeight - scrollbarDummyElement0.clientHeight,
					y: scrollbarDummyElement0.offsetWidth - scrollbarDummyElement0.clientWidth
				};
				scrollbarDummyElement.addClass('os-viewport-native-scrollbars-invisible');
				scrollbarDummyElement.css(strOverflow, 'hidden').hide().css(strOverflow, 'scroll').show(); //fix opera bug: scrollbar styles will only appear if overflow value is scroll or auto during the activation of the style.
				_base.nativeScrollbarStyling = (scrollbarDummyElement0.offsetHeight - scrollbarDummyElement0.clientHeight) === 0 && (scrollbarDummyElement0.offsetWidth - scrollbarDummyElement0.clientWidth) === 0;
				scrollbarDummyElement.css({ 'overflow-y' : 'hidden', 'direction' : 'rtl' }).scrollLeft(0);
				var dummyContainerOffset = scrollbarDummyElement.offset();
				var dummyContainerChildOffset = dummyContainerChild.offset();
				scrollbarDummyElement.scrollLeft(999);
				var dummyContainerScrollOffsetAfterScroll = dummyContainerChild.offset();
				_base.rtlScrollBehavior = {
					//origin direction = determines if the zero scroll position is on the left or right side
					//'i' means 'invert' (i === true means that the axis must be inverted to be correct)
					//true = on the left side
					//false = on the right side
					i : dummyContainerOffset.left === dummyContainerChildOffset.left,
					//negative = determines if the maximum scroll is positive or negative
					//'n' means 'negate' (n === true means that the axis must be negated to be correct)
					//true = negative
					//false = positive
					n : dummyContainerChildOffset.left - dummyContainerScrollOffsetAfterScroll.left === 0
				};
				scrollbarDummyElement.removeAttr('style').remove();
				return scrollbarSize;
			})();
			var nativeScrollbarIsOverlaid = {
				x: nativeScrollbarSize.x === 0,
				y: nativeScrollbarSize.y === 0
			};
			_base.nativeScrollbarSize = nativeScrollbarSize;
			_base.nativeScrollbarIsOverlaid = nativeScrollbarIsOverlaid;
			_base.overlayScrollbarDummySize = {
				x: 30,
				y: 30
			};
			_base.msie = (function() {
				var ua = window.navigator.userAgent;

				var msie = ua.indexOf('MSIE ');
				if (msie > 0) {
					// IE 10 or older => return version number
					return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
				}

				var trident = ua.indexOf('Trident/');
				if (trident > 0) {
					// IE 11 => return version number
					var rv = ua.indexOf('rv:');
					return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
				}

				var edge = ua.indexOf('Edge/');
				if (edge > 0) {
					// Edge (IE 12+) => return version number
					return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
				}

				// other browser
				return false;
			})();
			_base.cssCalc = (function() {
				var dummy = document.createElement('div');
				var props = ['calc', '-webkit-calc', '-moz-calc', '-o-calc'];
				for (var i = 0; i < props.length; ++i) {
					var prop = props[i];
					dummy.style.cssText = 'width:' + prop + '(1px);';
					if (dummy.style.length)
						return prop;
				}
				return null;
			})();
			function detectCSSFeature(featurename) {
				var feature = false,
					domPrefixes = 'Webkit Moz ms O'.split(' '),
					elm = document.createElement('div'),
					featurenameCapital = null;

				featurename = featurename.toLowerCase();

				if (elm.style[featurename] !== undefined) {
					feature = true;
				}

				if (feature === false) {
					featurenameCapital = featurename.charAt(0).toUpperCase() + featurename.substr(1);
					for (var i = 0; i < domPrefixes.length; i++) {
						if (elm.style[domPrefixes[i] + featurenameCapital] !== undefined) {
							feature = true;
							break;
						}
					}
				}
				return feature;
			}
			_base.supportTransform = detectCSSFeature("transform");
			_base.supportTransition = detectCSSFeature("transition");
			if (!Function.prototype.bind) {
				Function.prototype.bind = function(oThis) {
					if (typeof this !== 'function') {
						// closest thing possible to the ECMAScript 5
						// internal IsCallable function
						throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
					}

					var aArgs   = Array.prototype.slice.call(arguments, 1),
						fToBind = this,
						fNOP    = function() {},
						fBound  = function() {
							return fToBind.apply(this instanceof fNOP
									? this
									: oThis,
								aArgs.concat(Array.prototype.slice.call(arguments)));
						};

					if (this.prototype) {
						// Function.prototype doesn't have a prototype property
						fNOP.prototype = this.prototype;
					}
					fBound.prototype = new fNOP();

					return fBound;
				};
			}
			//passive event support
			var supportsPassive = false;
			try {
				var opts = Object.defineProperty({}, 'passive', {
					get: function() {
						supportsPassive = true;
					}
				});
				window.addEventListener('test', null, opts);
			} catch (e) { }
			_base.supportPassiveEvents = supportsPassive;
			_base.supportResizeObserver = compatibility.rO() !== undefined;
			_base.supportMutationObserver = compatibility.mO() !== undefined;

			//Catch zoom event:
			(function () {
				if(nativeScrollbarIsOverlaid.x && nativeScrollbarIsOverlaid.y)
					return;

				var windowWidth = compatibility.wW();
				var windowHeight = compatibility.wH();
				var windowDpr = getWindowDPR();

				function differenceIsBiggerThanOne(valOne, valTwo) {
					var absValOne = Math.abs(valOne);
					var absValTwo = Math.abs(valTwo);
					return !(absValOne === absValTwo || absValOne + 1 === absValTwo || absValOne - 1 === absValTwo);
				}

				function getWindowDPR() {
					var dDPI = screen.deviceXDPI || 0;
					var sDPI = screen.logicalXDPI || 1;
					return window.devicePixelRatio || (dDPI / sDPI);
				}

				helper(window).on('resize', function() {
					if(instances.all().length > 0) {
						var newW = compatibility.wW();
						var newH = compatibility.wH();
						var deltaW = newW - windowWidth;
						var deltaH = newH - windowHeight;

						if (deltaW === 0 && deltaH === 0)
							return;

						var deltaWRatio = Math.round(newW / (windowWidth / 100.0));
						var deltaHRatio = Math.round(newH / (windowHeight / 100.0));
						var absDeltaW = Math.abs(deltaW);
						var absDeltaH = Math.abs(deltaH);
						var absDeltaWRatio = Math.abs(deltaWRatio);
						var absDeltaHRatio = Math.abs(deltaHRatio);
						var newDPR = getWindowDPR();

						var deltaIsBigger = absDeltaW > 2 && absDeltaH > 2;
						var difference = !differenceIsBiggerThanOne(absDeltaWRatio, absDeltaHRatio);
						var dprChanged = newDPR !== windowDpr && windowDpr > 0;
						var windowResized = !(deltaIsBigger && difference && dprChanged);

						if (!windowResized) {
							bodyElement.append(scrollbarDummyElement);
							var measure = scrollbarDummyElement[0];
							_base.nativeScrollbarSize = {
								x: measure.offsetHeight - measure.clientHeight,
								y: measure.offsetWidth - measure.clientWidth
							};
							scrollbarDummyElement.remove();
							helper.each(instances.all(), function () {
								if(instances.has(this))
									instances.get(this).update('zoom');
							});
						}

						windowWidth = newW;
						windowHeight = newH;
						windowDpr = newDPR;
					}
				});
			})();
		}

		/**
		 * The object which manages the auto update loop for all hide scrollbars objects. This object is initialized only once: if the first hide scrollbars object gets initialized.
		 * @constructor
		 */
		function OverlayScrollbarsAutoUpdateLoop(globals) {
			var _base = this;
			var _strAutoUpdate = 'autoUpdate';
			var _strAutoUpdateInterval = _strAutoUpdate + 'Interval';

			var _loopingInstances = [ ];
			var _loopingInstancesIntervalCache = [ ];
			var _loopIsActive = false;
			var _loopIntervalDefault = 33;
			var _loopInterval = _loopIntervalDefault;
			var _loopTimeOld  = compatibility.now();
			var _loopID;

			/**
			 * The auto update loop which will run every 50 milliseconds or less if the update interval of a instance is lower than 50 milliseconds.
			 */
			var loop = function() {
				if(_loopingInstances.length > 0 && _loopIsActive) {
					_loopID = compatibility.rAF()(function () {
						loop();
					});
					var timeNew = compatibility.now();
					var timeDelta = timeNew - _loopTimeOld;

					if (timeDelta > _loopInterval) {
						_loopTimeOld = timeNew - (timeDelta % _loopInterval);
						var lowestInterval = _loopIntervalDefault;
						for(var i = 0; i < _loopingInstances.length; i++) {
							var instance = _loopingInstances[i];
							if (instance !== undefined) {
								var instanceOptions = instance.options();
								var instanceAutoUpdateAllowed = instanceOptions[_strAutoUpdate];
								var instanceAutoUpdateInterval = Math.max(1, instanceOptions[_strAutoUpdateInterval]);
								var now = compatibility.now();
								if ((instanceAutoUpdateAllowed === true || instanceAutoUpdateAllowed === null) && (now - _loopingInstancesIntervalCache[i]) > instanceAutoUpdateInterval) {
									instance.update('auto');
									_loopingInstancesIntervalCache[i] = new Date(now += instanceAutoUpdateInterval);
								}
								lowestInterval = Math.max(1, Math.min(lowestInterval, instanceAutoUpdateInterval));
							}
						}
						_loopInterval = lowestInterval;
					}
				} else {
					_loopInterval = _loopIntervalDefault;
				}
			};

			/**
			 * Add OverlayScrollbars instance to the auto update loop. Only successful if the instance isn't already added.
			 * @param instance The instance which shall be updated in a loop automatically.
			 */
			_base.add = function(instance) {
				if(helper.inArray(instance, _loopingInstances) === -1) {
					_loopingInstances.push(instance);
					_loopingInstancesIntervalCache.push(compatibility.now());
					if (_loopingInstances.length > 0 && !_loopIsActive) {
						_loopIsActive = true;
						globals.autoUpdateLoop = _loopIsActive;
						loop();
					}
				}
			};

			/**
			 * Remove OverlayScrollbars instance from the auto update loop. Only successful if the instance was added before.
			 * @param instance The instance which shall be updated in a loop automatically.
			 */
			_base.remove = function(instance) {
				var index = helper.inArray(instance, _loopingInstances);
				if(index > -1) {
					//remove from loopingInstances list
					_loopingInstancesIntervalCache.splice(index, 1);
					_loopingInstances.splice(index, 1);

					//correct update loop behavior
					if (_loopingInstances.length === 0 && _loopIsActive) {
						_loopIsActive = false;
						globals.autoUpdateLoop = _loopIsActive;
						if(_loopID !== undefined) {
							compatibility.cAF()(_loopID);
							_loopID = -1;
						}
					}
				}
			};
		}

		/**
		 * A object which manages the scrollbars visibility of the target element.
		 * @param pluginTargetElement The element from which the scrollbars shall be hidden.
		 * @param options The custom options.
		 * @param globals
		 * @param autoUpdateLoop
		 * @returns {*}
		 * @constructor
		 */
		function OverlayScrollbarsInstance(pluginTargetElement, options, globals, autoUpdateLoop) {
			//if passed element is no HTML element: skip and return
			if(!isHTMLElement(pluginTargetElement))
				return;

			//if passed element is already initialized: set passed options if there are any and return its instance
			if(instances.has(pluginTargetElement)) {
				var inst = instances.get(pluginTargetElement);
				inst.options(options);
				return inst;
			}

			//make correct instanceof
			var _base = new window[PLUGINNAME]();

			//general:
			var _initialized = false;
			var _destroyed = false;
			var _isTextarea = false;
			var _isBody = false;
			var _sizeAutoObserverAdded = false;
			var _contentBorderSize = { w: 0, h: 0 };
			var _scrollHorizontalInfo = { };
			var _scrollVerticalInfo = { };
			var _viewportSize = { };
			var _rtlScrollBehavior;
			var _autoUpdateRecommended;
			var _msieVersion;
			var _nativeScrollbarStyling;
			var _cssCalc;
			var _nativeScrollbarSize;
			var _nativeScrollbarMinSize;
			var _nativeScrollbarIsOverlaid;
			var _overlayScrollbarDummySize;
			var _supportTransition;
			var _supportTransform;
			var _supportPassiveEvents;
			var _supportResizeObserver;
			var _isBorderBox;
			var _paddingX;
			var _paddingY;
			var _borderX;
			var _borderY;
			var _marginX;
			var _marginY;
			var _isRTL;
			var _isSleeping;

			//scroll
			var _scrollStopDelay = 175;
			var _scrollStopTimeoutId;

			//naming:
			var _strMinusHidden = '-hidden';
			var _strMarginMinus = 'margin-';
			var _strPaddingMinus = 'padding-';
			var _strBorderMinus = 'border-';
			var _strTop = 'top';
			var _strRight = 'right';
			var _strBottom = 'bottom';
			var _strLeft = 'left';
			var _strMinMinus = 'min-';
			var _strMaxMinus = 'max-';
			var _strWidth = 'width';
			var _strHeight = 'height';
			var _strFloat = 'float';
			var _strEmpty = '';
			var _strAuto = 'auto';
			var _strScroll = 'scroll';
			var _strHundredPercent = '100%';
			var _strX = 'x';
			var _strY = 'y';
			var _strDivBegin = "<div class=\"";
			var _strDivEnd = "\"></div>";
			var _strDot = '.';
			var _strSpace = ' ';
			var _strScrollbar = 'scrollbar';
			var _strMinusHorizontal = '-horizontal';
			var _strMinusVertical = '-vertical';
			var _strNumber = 'number';
			var _strString = 'string';
			var _strScrollLeft = _strScroll + 'Left';
			var _strScrollTop = _strScroll + 'Top';
			var _strMouseTouchDownEvent = 'mousedown touchstart';
			var _strMouseTouchUpEvent = 'mouseup touchend';
			var _strMouseTouchMoveEvent = 'mousemove touchmove';
			var _strKeyDownEvent = 'keydown';
			var _strKeyUpEvent = 'keyup';
			var _strSelectStartEvent = 'selectstart';
			var _strTransitionEndEvent = 'transitionend webkitTransitionEnd oTransitionEnd';
			var _strResizeObserverProperty = '~_overlayScrollbarsRO_~';

			//class names:
			var _cassNamesPrefix = 'os-';
			var _classNameHTMLElement = _cassNamesPrefix + 'html';
			var _classNameHostElement = _cassNamesPrefix + 'host';
			var _classNameHostTextareaElement = _classNameHostElement + '-textarea';
			var _classNameHostScrollbarHorizontalHidden = _classNameHostElement + '-' + _strScrollbar + _strMinusHorizontal + _strMinusHidden;
			var _classNameHostScrollbarVerticalHidden = _classNameHostElement + '-' + _strScrollbar + _strMinusVertical + _strMinusHidden;
			var _classNameHostTransition = _classNameHostElement + '-transition';
			var _classNameHostRTL = _classNameHostElement + '-rtl';
			var _classNameHostResizeDisabled = _classNameHostElement + '-resize-disabled';
			var _classNameHostScrolling = _classNameHostElement + '-scrolling';
			var _classNameHostOverflow = _classNameHostElement + '-overflow';
			var _classNameHostOverflowX = _classNameHostOverflow + '-x';
			var _classNameHostOverflowY = _classNameHostOverflow + '-y';
			var _classNameTextareaElement = _cassNamesPrefix + 'textarea';
			var _classNameTextareaCoverElement = _classNameTextareaElement + '-cover';
			var _classNamePaddingElement = _cassNamesPrefix + 'padding';
			var _classNameViewportElement = _cassNamesPrefix + 'viewport';
			var _classNameViewportNativeScrollbarsInvisible = _classNameViewportElement + '-native-scrollbars-invisible';
			var _classNameViewportNativeScrollbarsOverlaid = _classNameViewportElement + '-native-scrollbars-overlaid';
			var _classNameContentElement = _cassNamesPrefix + 'content';
			var _classNameContentArrangeElement = _cassNamesPrefix + 'content-arrange';
			var _classNameContentGlueElement = _cassNamesPrefix + 'content-glue';
			var _classNameSizeAutoObserverElement = _cassNamesPrefix + 'size-auto-observer';
			var _classNameResizeObserverElement = _cassNamesPrefix + 'resize-observer';
			var _classNameResizeObserverItemElement = _cassNamesPrefix + 'resize-observer-item';
			var _classNameResizeObserverItemFinalElement = _classNameResizeObserverItemElement + '-final';
			var _classNameTextInherit = _cassNamesPrefix + 'text-inherit';
			var _classNameScrollbar = _cassNamesPrefix + _strScrollbar;
			var _classNameScrollbarTrack = _classNameScrollbar + '-track';
			var _classNameScrollbarTrackOff = _classNameScrollbarTrack + '-off';
			var _classNameScrollbarHandle = _classNameScrollbar + '-handle';
			var _classNameScrollbarHandleOff = _classNameScrollbarHandle + '-off';
			var _classNameScrollbarUnusable = _classNameScrollbar + '-unusable';
			var _classNameScrollbarAutoHidden = _classNameScrollbar + '-' + _strAuto + _strMinusHidden;
			var _classNameScrollbarCorner = _classNameScrollbar + '-corner';
			var _classNameScrollbarCornerResize = _classNameScrollbarCorner + '-resize';
			var _classNameScrollbarCornerResizeB = _classNameScrollbarCornerResize + '-both';
			var _classNameScrollbarCornerResizeH = _classNameScrollbarCornerResize + _strMinusHorizontal;
			var _classNameScrollbarCornerResizeV = _classNameScrollbarCornerResize + _strMinusVertical;
			var _classNameScrollbarHorizontal = _classNameScrollbar + _strMinusHorizontal;
			var _classNameScrollbarVertical = _classNameScrollbar + _strMinusVertical;
			var _classNameDragging = _cassNamesPrefix + 'dragging';
			var _classNameThemeNone = _cassNamesPrefix + 'theme-none';

			//options:
			var _defaultOptions;
			var _currentOptions;
			var _currentPreparedOptions;

			//update
			var _lastUpdateTime;
			var _swallowedUpdateParams = {};
			var _swallowedUpdateTimeout;
			var _swallowUpdateLag = 33;

			//DOM elements:
			var _windowElement;
			var _documentElement;
			var _htmlElement;
			var _bodyElement;
			var _targetElement;                     //the target element of this hide scrollbars object
			var _hostElement;                         //the host element of this hide scrollbars object -> may be the same as targetElement
			var _sizeAutoObserverElement;             //observes size auto changes
			var _sizeObserverElement;               //observes size and padding changes
			var _contentGlueElement;                 //has always the size of the content element
			var _paddingElement;                     //manages the padding
			var _viewportElement;                     //is the viewport of our scrollbar model
			var _contentArrangeElement;             //is needed for correct sizing of the content element (only if native scrollbars are overlays)
			var _contentElement;                     //the element which holds the content
			var _textareaCoverElement;              //only applied if target is a textarea element. Used for correct size calculation and for prevention of uncontrolled scrolling
			var _scrollbarCornerElement;
			var _scrollbarHorizontalElement;
			var _scrollbarHorizontalTrackElement;
			var _scrollbarHorizontalHandleElement;
			var _scrollbarVerticalElement;
			var _scrollbarVerticalTrackElement;
			var _scrollbarVerticalHandleElement;

			//Cache:
			var _hostSizeCache;
			var _contentScrollSizeCache;
			var _arrangeContentSizeCache;
			var _hasOverflowCache;
			var _hideOverflowCache;
			var _widthAutoCache;
			var _heightAutoCache;
			var _cssMaxValueCache;
			var _cssBoxSizingCache;
			var _cssPaddingCache;
			var _cssBorderCache;
			var _cssMarginCache;
			var _cssDirectionCache;
			var _cssDirectionDetectedCache;
			var _paddingAbsoluteCache;
			var _clipAlwaysCache;
			var _contentGlueSizeCache;
			var _overflowBehaviorCache;
			var _overflowAmountCache;
			var _ignoreOverlayScrollbarHidingCache;
			var _autoUpdateCache;
			var _sizeAutoCapableCache;
			var _textareaAutoWrappingCache;
			var _textareaInfoCache;
			var _updateAutoHostElementIdCache;
			var _updateAutoHostElementClassCache;
			var _updateAutoHostElementStyleCache;
			var _updateAutoHostElementVisibleCache;
			var _updateAutoTargetElementRowsCache;
			var _updateAutoTargetElementColsCache;
			var _updateAutoTargetElementWrapCache;
			var _contentElementScrollSizeChangeDetectedCache;
			var _hostElementSizeChangeDetectedCache;
			var _scrollbarsVisibilityCache;
			var _scrollbarsAutoHideCache;
			var _scrollbarsClickScrollingCache;
			var _scrollbarsDragScrollingCache;
			var _resizeCache;
			var _normalizeRTLCache;
			var _classNameCache;
			var _oldClassName;
			var _textareaDynHeightCache;
			var _textareaDynWidthCache;
			var _bodyMinSizeCache;

			//MutationObserver:
			var _mutationObserverContentLag = 11;
			var _mutationObserverHost;
			var _mutationObserverContent;
			var _mutationObserverConnected;
			var _supportMutationObserver;

			//textarea:
			var _textareaKeyDownRestrictedKeyCodes = [
				112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 123,    //F1 to F12
				33, 34,                                                   //page up, page down
				37, 38, 39, 40,                                           //left, up, right, down arrows
				16, 17, 18, 19, 20, 144                                   //Shift, Ctrl, Alt, Pause, CapsLock, NumLock
			];
			var _textareaKeyDownKeyCodesList = [];
			var _textareaUpdateIntervalID;
			var _textareaHasFocus;

			//scrollbars:
			var _scrollbarsAutoHideTimeoutId;
			var _scrollbarsAutoHideDelay;
			var _scrollbarsAutoHideNever;
			var _scrollbarsAutoHideScroll;
			var _scrollbarsAutoHideLeave;
			var _scrollbarsTouchSupport;
			var _scrollbarsAutoHideScrollAndHovered;

			//resize
			var _resizeReconnectMutationObserver;
			var _resizeNone;
			var _resizeBoth;
			var _resizeHorizontal;
			var _resizeVertical;
			var _resizeDragStartPosition = {
				x: 0,
				y: 0
			};
			var _resizeDragStartSize = {
				w: 0,
				h: 0
			};

			/**
			 * This method gets called every time the host element gets resized. IMPORTANT: Padding changes are detected too!!
			 * It refreshes the hostResizedEventArgs and the hostSizeResizeCache.
			 * If there are any size changes, the update method gets called.
			 */
			function onHostResized() {
				if (_isSleeping)
					return;
				var measureElement = _sizeObserverElement[0];
				var hostSize = {
					w: measureElement.scrollWidth,
					h: measureElement.scrollHeight
				};
				if (_initialized) {
					var changed = checkCacheDouble(hostSize, _hostElementSizeChangeDetectedCache);
					_hostElementSizeChangeDetectedCache = hostSize;
					if (changed)
						update(true, false);
				}
				else {
					_hostElementSizeChangeDetectedCache = hostSize;
				}
			}

			/**
			 * Adds a passive event listener to the given element.
			 * @param element The element to which the event listener shall be applied.
			 * @param eventNames The name(s) of the event listener.
			 * @param listener The listener method which shall be called.
			 */
			function addPassiveEventListener(element, eventNames, listener) {
				element = element[0];
				var events = eventNames.split(_strSpace);
				for (var i = 0; i < events.length; i++)
					element.addEventListener(events[i], listener, {passive: true});
			}

			/**
			 * Removes a passive event listener to the given element.
			 * @param element The element from which the event listener shall be removed.
			 * @param eventNames The name(s) of the event listener.
			 * @param listener The listener method which shall be removed.
			 */
			function removePassiveEventListener(element, eventNames, listener) {
				element = element[0];
				var events = eventNames.split(_strSpace);
				for (var i = 0; i < events.length; i++)
					element.removeEventListener(events[i], listener, {passive: true});
			}

			/**
			 * Freezes the given resize observer.
			 * @param targetElement The element to which the target resize observer is applied.
			 */
			function freezeResizeObserver(targetElement) {
				if (targetElement !== undefined) {
					if (_supportResizeObserver) {
						var element = targetElement.contents()[0];
						element[_strResizeObserverProperty].unobserve(element);
					}
					/*
					 else {
					 targetElement = targetElement.children(_strDot + _classNameResizeObserverElement).first();
					 var w = targetElement.css(_strWidth);
					 var h = targetElement.css(_strHeight);
					 var css = {};
					 css[_strWidth] = w;
					 css[_strHeight] = h;
					 targetElement.css(css);
					 }
					 */
				}
			}

			/**
			 * Unfreezes the given resize observer.
			 * @param targetElement The element to which the target resize observer is applied.
			 */
			function unfreezeResizeObserver(targetElement) {
				if (targetElement !== undefined) {
					if (_supportResizeObserver) {
						var element = targetElement.contents()[0];
						element[_strResizeObserverProperty].observe(element);
					}
					/*
					 else {
					 var css = { };
					 css[_strHeight] = _strEmpty;
					 css[_strWidth] = _strEmpty;
					 targetElement.children(_strDot + _classNameResizeObserverElement).first().css(css);
					 }
					 */
				}
			}

			/**
			 * Adds a resize observer to the given element.
			 * @param targetElement The element to which the resize observer shall be applied.
			 * @param onElementResizedCallback The callback which is fired every time the resize observer registers a size change.
			 */
			function addResizeObserver(targetElement, onElementResizedCallback) {
				var constMaximum = 3333333;
				var callback = function (e) {
					targetElement.scrollTop(constMaximum);
					targetElement.scrollLeft(_isRTL ? _rtlScrollBehavior.n ? -constMaximum : _rtlScrollBehavior.i ? 0 : constMaximum : constMaximum);
					onElementResizedCallback();
				};
				if (_supportResizeObserver) {
					var resizeObserver = compatibility.rO();
					var element = targetElement.append(_strDivBegin + _classNameResizeObserverElement + ' observed' + _strDivEnd).contents()[0];
					var observer = element[_strResizeObserverProperty] = new resizeObserver(callback);
					observer.observe(element);
				}
				else {
					var strAnimationStartEvent = 'animationstart mozAnimationStart webkitAnimationStart MSAnimationStart';
					if (_msieVersion > 9 || !_autoUpdateRecommended) {
						var strDivClose = '">';
						var strDivEnd = "</div>";
						var strChildNodes = 'childNodes';
						var observerDOM = _strDivBegin + _classNameResizeObserverElement + strDivClose;
						observerDOM += _strDivBegin + _classNameResizeObserverItemElement + '" dir="ltr' + strDivClose;
						observerDOM += _strDivBegin + _classNameResizeObserverItemElement + strDivClose;
						observerDOM += _strDivBegin + _classNameResizeObserverItemFinalElement + _strDivEnd;
						observerDOM += strDivEnd;
						observerDOM += _strDivBegin + _classNameResizeObserverItemElement + strDivClose;
						observerDOM += _strDivBegin + _classNameResizeObserverItemFinalElement + '" style="width: 200%; height: 200%' + _strDivEnd;
						observerDOM += strDivEnd;
						observerDOM += strDivEnd;
						observerDOM += strDivEnd;

						targetElement.prepend(observerDOM);
						targetElement = targetElement[0];
						var observerElement = targetElement[strChildNodes][0][strChildNodes][0];
						var shrinkElement = helper(observerElement[strChildNodes][1]);
						var expandElement = helper(observerElement[strChildNodes][0]);
						var expandElementChild = helper(expandElement[0][strChildNodes][0]);
						var widthCache = observerElement.offsetWidth;
						var heightCache = observerElement.offsetHeight;
						var isDirty;
						var rAFId;
						var currWidth;
						var currHeight;
						var factor = 2;
						var nativeScrollbarSize = globals.nativeScrollbarSize; //care don't make changes to this object!!!
						var reset = function () {
							/*
							 var sizeResetWidth = observerElement.offsetWidth + nativeScrollbarSize.x * factor + nativeScrollbarSize.y * factor + _overlayScrollbarDummySize.x + _overlayScrollbarDummySize.y;
							 var sizeResetHeight = observerElement.offsetHeight + nativeScrollbarSize.x * factor + nativeScrollbarSize.y * factor + _overlayScrollbarDummySize.x + _overlayScrollbarDummySize.y;
							 var expandChildCSS = {};
							 expandChildCSS[_strWidth] = sizeResetWidth;
							 expandChildCSS[_strHeight] = sizeResetHeight;
							 expandElementChild.css(expandChildCSS);


							 expandElement[_strScrollLeft](sizeResetWidth)[_strScrollTop](sizeResetHeight);
							 shrinkElement[_strScrollLeft](sizeResetWidth)[_strScrollTop](sizeResetHeight);
							 */
							expandElement[_strScrollLeft](constMaximum)[_strScrollTop](constMaximum);
							shrinkElement[_strScrollLeft](constMaximum)[_strScrollTop](constMaximum);
						};
						var onResized = function () {
							rAFId = 0;
							if (!isDirty)
								return;

							widthCache = currWidth;
							heightCache = currHeight;
							callback();
						};
						var onScroll = function (event) {
							currWidth = observerElement.offsetWidth;
							currHeight = observerElement.offsetHeight;
							isDirty = currWidth != widthCache || currHeight != heightCache;

							if (event && isDirty && !rAFId) {
								compatibility.cAF()(rAFId);
								rAFId = compatibility.rAF()(onResized);
							}
							else if (!event)
								onResized();

							reset();

							if (event) {
								compatibility.prvD(event);
								compatibility.stpP(event);
							}
							return false;
						};
						var observerElementCSS = {};
						observerElementCSS[_strTop] = (-((nativeScrollbarSize.y + 1) * factor));
						observerElementCSS[_strRight] = (nativeScrollbarSize.x * -factor);
						observerElementCSS[_strBottom] = (nativeScrollbarSize.y * -factor);
						observerElementCSS[_strLeft] = (-((nativeScrollbarSize.x + 1) * factor));

						helper(observerElement).css(observerElementCSS);
						expandElement.on(_strScroll, onScroll);
						shrinkElement.on(_strScroll, onScroll);
						helper(targetElement).on(strAnimationStartEvent, function () {
							onScroll(false);
						});
						//lets assume that the divs will never be that large and a constant value is enough
						var expandChildCSS = {};
						expandChildCSS[_strWidth] = constMaximum;
						expandChildCSS[_strHeight] = constMaximum;
						expandElementChild.css(expandChildCSS);

						reset();
					}
					else {
						var doc = _documentElement[0];
						var JQelement = targetElement;
						targetElement = targetElement[0];
						var attachEvent = doc.attachEvent;
						var isIE = typeof navigator !== 'undefined' ? navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/Edge/) : true;
						if (attachEvent) {
							JQelement.prepend(_strDivBegin + _classNameResizeObserverElement + _strDivEnd);
							JQelement.find(_strDot + _classNameResizeObserverElement).first()[0].attachEvent('onresize', callback);
						}
						else {
							var obj = doc.createElement('object');
							obj.setAttribute('tabindex', '-1');
							obj.setAttribute('class', _classNameResizeObserverElement);
							obj.onload = function () {
								var wnd = this.contentDocument.defaultView;
								wnd.addEventListener('resize', callback);
								wnd.document.documentElement.style.display = 'none';
							};
							obj.type = 'text/html';
							if (isIE)
								JQelement.prepend(obj);
							obj.data = 'about:blank';
							if (!isIE)
								JQelement.prepend(obj);
							JQelement.on(strAnimationStartEvent, callback);
						}
					}
				}

				//direction change detection:
				targetElement = helper(targetElement);
				if (targetElement[0] === _sizeObserverElement[0]) {
					var directionChanged = function () {
						var dir = _hostElement.css('direction');
						if (dir !== _cssDirectionDetectedCache) {
							var css = {};
							var scrollLeftValue = 0;
							if (dir === 'ltr') {
								css[_strLeft] = 0;
								css[_strRight] = _strAuto;
								scrollLeftValue = constMaximum;
							}
							else {
								css[_strLeft] = _strAuto;
								css[_strRight] = 0;
								scrollLeftValue = _rtlScrollBehavior.n ? -constMaximum : _rtlScrollBehavior.i ? 0 : constMaximum;
							}
							_sizeObserverElement.children().first().css(css);
							targetElement.scrollLeft(scrollLeftValue);
							targetElement.scrollTop(constMaximum);
							_cssDirectionDetectedCache = dir;
							return true;
						}
						return false;
					};
					directionChanged();
					targetElement.on(_strScroll, function (event) {
						if (directionChanged())
							update();
						compatibility.prvD(event);
						compatibility.stpP(event);
						return false;
					});
				}
			}

			/**
			 * Removes a resize observer from the given element.
			 * @param targetElement The element to which the target resize observer is applied.
			 */
			function removeResizeObserver(targetElement) {
				if (_supportResizeObserver) {
					var element = targetElement.contents()[0];
					element[_strResizeObserverProperty].disconnect();
					delete element[_strResizeObserverProperty];
				}
				else {
					targetElement.children(_strDot + _classNameResizeObserverElement).first().remove();
				}
			}

			/**
			 * Compares two values and returns the result of the comparison as a boolean.
			 * @param current The first value which shall be compared.
			 * @param cache The second value which shall be compared.
			 * @param force If true the returned value is always true.
			 * @returns {boolean} True if both variables aren't equal or some of them is undefined or when the force parameter is true, false otherwise.
			 */
			function checkCacheSingle(current, cache, force) {
				if (force === true)
					return force;
				if (cache === undefined)
					return true;
				else if (current !== cache)
					return true;
				return false;
			}

			/**
			 * Compares two objects with two properties and returns the result of the comparison as a boolean.
			 * @param current The first object which shall be compared.
			 * @param cache The second object which shall be compared.
			 * @param prop1 The name of the first property of the objects which shall be compared.
			 * @param prop2 The name of the second property of the objects which shall be compared.
			 * @param force If true the returned value is always true.
			 * @returns {boolean} True if both variables aren't equal or some of them is undefined or when the force parameter is true, false otherwise.
			 */
			function checkCacheDouble(current, cache, prop1, prop2, force) {
				if (force === true)
					return force;
				if (prop2 === undefined && force === undefined) {
					if (prop1 === true)
						return prop1;
					else
						prop1 = undefined;
				}
				prop1 = prop1 === undefined ? 'w' : prop1;
				prop2 = prop2 === undefined ? 'h' : prop2;
				if (cache === undefined)
					return true;
				else if (current[prop1] !== cache[prop1] || current[prop2] !== cache[prop2])
					return true;
				return false;
			}

			/**
			 * Compares two objects which have four properties and returns the result of the comparison as a boolean.
			 * @param current The first object with four properties.
			 * @param cache The second object with four properties.
			 * @returns {boolean} True if both objects aren't equal or some of them is undefined, false otherwise.
			 */
			function checkCacheTRBL(current, cache) {
				if (cache === undefined)
					return true;
				else if (current.t !== cache.t ||
					current.r !== cache.r ||
					current.b !== cache.b ||
					current.l !== cache.l)
					return true;
				return false;
			}

			/**
			 * Calls the given callback with the given args. The Context of this callback is always _base (this).
			 * @param callback The callback function which shall be called.
			 * @param args The args with which the callback shall be called.
			 */
			function callCallback(callback, args) {
				callback.call(_base, args);
			}

			/**
			 * Sets the "top, right, bottom, left" properties, with a given prefix, of the given css object.
			 * @param targetCSSObject The css object to which the values shall be applied.
			 * @param prefix The prefix of the "top, right, bottom, left" css properties. (example: 'padding-' is a valid prefix)
			 * @param values A array of values which shall be applied to the "top, right, bottom, left" -properties. The array order is [top, right, bottom, left].
			 * If this argument is undefined the value '' (empty string) will be applied to all properties.
			 */
			function setTopRightBottomLeft(targetCSSObject, prefix, values) {
				if (values === undefined)
					values = [_strEmpty, _strEmpty, _strEmpty, _strEmpty];

				targetCSSObject[prefix + _strTop] = values[0];
				targetCSSObject[prefix + _strRight] = values[1];
				targetCSSObject[prefix + _strBottom] = values[2];
				targetCSSObject[prefix + _strLeft] = values[3];
			}

			/**
			 * Connects the MutationObservers if they are supported.
			 */
			function mutationObserversConnect() {
				if (_supportMutationObserver && !_mutationObserverConnected) {
					_mutationObserverHost.observe(_hostElement[0], {
						attributes: true,
						attributeOldValue: true,
						attributeFilter: ['id', 'class', 'style']
					});

					_mutationObserverContent.observe(_isTextarea ? _targetElement[0] : _contentElement[0], {
						attributes: true,
						attributeOldValue: true,
						subtree: !_isTextarea,
						childList: !_isTextarea,
						attributeFilter: _isTextarea ? ['wrap', 'cols', 'rows'] : ['id', 'class', 'style']
					});

					_mutationObserverConnected = true;
				}
			}

			/**
			 * Disconnects the MutationObservers if they are supported.
			 */
			function mutationObserversDisconnect() {
				if (_supportMutationObserver && _mutationObserverConnected) {
					_mutationObserverHost.disconnect();
					_mutationObserverContent.disconnect();

					_mutationObserverConnected = false;
				}
			}

			/**
			 * The mouse down event of the scrollbar corner element.
			 * @param event The mouse down event.
			 */
			function scrollbarCornerOnMouseDown(event) {
				if (_isSleeping)
					return;

				var originalEvent = event.originalEvent || event;
				var isTouchEvent = originalEvent.touches !== undefined;

				if (compatibility.mBtn(event) === 1 || isTouchEvent) {
					if (_mutationObserverConnected) {
						_resizeReconnectMutationObserver = true;
						mutationObserversDisconnect();
					}

					_resizeDragStartPosition = compatibility.page(event);

					_resizeDragStartSize.w = _hostElement[0].offsetWidth - (!_isBorderBox ? _paddingX : 0);
					_resizeDragStartSize.h = _hostElement[0].offsetHeight - (!_isBorderBox ? _paddingY : 0);

					_documentElement.on(_strSelectStartEvent, onSelectStart);
					_documentElement.on(_strMouseTouchMoveEvent, scrollbarCornerOnResize);
					_documentElement.on(_strMouseTouchUpEvent, scrollbarCornerOnResized);

					_bodyElement.addClass(_classNameDragging);
					if (_scrollbarCornerElement.setCapture)
						_scrollbarCornerElement.setCapture();

					compatibility.prvD(event);
					compatibility.stpP(event);
				}
			}

			/**
			 * The mouse move event if the scrollbar corner element is resizable and gets dragged.
			 * @param event The mouse move event.
			 */
			function scrollbarCornerOnResize(event) {
				var originalEvent = event.originalEvent || event;
				var pageOffset = compatibility.page(event);
				var hostElementCSS = {};
				if (_resizeHorizontal || _resizeBoth)
					hostElementCSS[_strWidth] = (_resizeDragStartSize.w + pageOffset.x - _resizeDragStartPosition.x);
				if (_resizeVertical || _resizeBoth)
					hostElementCSS[_strHeight] = (_resizeDragStartSize.h + pageOffset.y - _resizeDragStartPosition.y);
				_hostElement.css(hostElementCSS);
				compatibility.stpP(event);
			}

			/**
			 * The mouse up event if the scrollbar corner element is resizable and was dragged and now the mouse button is released.
			 * @param event The mouse up event.
			 */
			function scrollbarCornerOnResized(event) {
				var eventIsTrusted = event !== undefined;

				_documentElement.off(_strSelectStartEvent, onSelectStart);
				_documentElement.off(_strMouseTouchMoveEvent, scrollbarCornerOnResize);
				_documentElement.off(_strMouseTouchUpEvent, scrollbarCornerOnResized);

				_bodyElement.removeClass(_classNameDragging);
				if (_scrollbarCornerElement.releaseCapture)
					_scrollbarCornerElement.releaseCapture();

				if (eventIsTrusted) {
					if (_resizeReconnectMutationObserver)
						mutationObserversConnect();
					_base.update(_strAuto);
				}
				_resizeReconnectMutationObserver = false;
			}

			/**
			 * Updates the variables and size of the textarea element, and manages the scroll on new line or new character.
			 */
			function textareaUpdate() {
				if (_isSleeping)
					return;

				var wrapAttrOff = !_textareaAutoWrappingCache;
				var minWidth = _viewportSize.w - (!_isBorderBox && !_paddingAbsoluteCache && _widthAutoCache ? _paddingY + _borderY : 0);
				var minHeight = _viewportSize.h - (!_isBorderBox && !_paddingAbsoluteCache && _heightAutoCache ? _paddingY + _borderY : 0);
				var css = {};
				var doMeasure = _widthAutoCache || wrapAttrOff;
				var measureElement = _targetElement[0];

				//reset min size
				css[_strMinMinus + _strWidth] = _strEmpty;
				css[_strMinMinus + _strHeight] = _strEmpty;

				//set width auto
				css[_strWidth] = _strAuto;
				_targetElement.css(css);

				//measure width
				var origWidth = measureElement.offsetWidth;
				var width = doMeasure ? Math.max(origWidth, measureElement.scrollWidth - 1) : 1;
				width += (_widthAutoCache ? _marginX + (!_isBorderBox ? wrapAttrOff ? 0 : _paddingX + _borderX : 0) : 0);

				//set measured width and height auto
				css[_strWidth] = _widthAutoCache ? width : _strHundredPercent;
				css[_strHeight] = _strAuto; //_strAuto
				_targetElement.css(css);

				//measure height
				var origHeight = measureElement.offsetHeight;
				var height = Math.max(origHeight, measureElement.scrollHeight - 1);

				//append correct size values
				css[_strWidth] = width;
				css[_strHeight] = height;
				_textareaCoverElement.css(css);

				//apply min width / min height to prevent textarea collapsing
				css[_strMinMinus + _strWidth] = minWidth + (!_isBorderBox && _widthAutoCache ? _paddingX + _borderX : 0);
				css[_strMinMinus + _strHeight] = minHeight + (!_isBorderBox && _heightAutoCache ? _paddingY + _borderY : 0);
				_targetElement.css(css);

				return {
					ow: origWidth,
					oh: origHeight,
					dw: width,
					dh: height
				};
			}

			/**
			 * Gets several information of the textarea and returns them as a object or undefined if the browser doesn't support it.
			 * @returns {{cursorRow: Number, cursorCol, rows: Number, cols: number, wRow: number, pos: number, max : number}} or undefined if not supported.
			 */
			function getTextareaInfo() {
				//read needed values
				var textareaCursorPosition = _targetElement.prop('selectionStart');
				if (textareaCursorPosition === undefined)
					return;
				var textareaValue = _targetElement.val();
				var textareaLength = textareaValue.length;
				var textareaRowSplit = textareaValue.split("\n");
				var textareaLastRow = textareaRowSplit.length;
				var textareaCurrentCursorRowSplit = textareaValue.substr(0, textareaCursorPosition).split("\n");
				var widestRow = 0;
				var textareaLastCol = 0;
				var cursorRow = textareaCurrentCursorRowSplit.length;
				var cursorCol = textareaCurrentCursorRowSplit[textareaCurrentCursorRowSplit.length - 1].length;

				//get widest Row and the last column of the textarea
				for (var i = 0; i < textareaRowSplit.length; i++) {
					var rowCols = textareaRowSplit[i].length;
					if (rowCols > textareaLastCol) {
						widestRow = i + 1;
						textareaLastCol = rowCols;
					}
				}

				return {
					cursorRow: cursorRow,
					cursorCol: cursorCol,
					rows: textareaLastRow,
					cols: textareaLastCol,
					wRow: widestRow,
					pos: textareaCursorPosition,
					max: textareaLength
				};
			}

			/**
			 * Checks the given key code and returns a boolean which is indicating if the given key code is a restricted one.
			 * @param keyCode The key code which shall be checked.
			 * @returns {boolean} True if the given key code is restricted, false otherwise.
			 */
			function textareaIsRestrictedKeyCode(keyCode) {
				for (var i = 0; i < _textareaKeyDownRestrictedKeyCodes.length; i++) {
					if (keyCode === _textareaKeyDownRestrictedKeyCodes[i])
						return true;
				}
				return false;
			}

			/**
			 * The key input event of the textarea element.
			 */
			function textareaOnInput() {
				textareaUpdate();
				_base.update(_strAuto);
			}

			/**
			 * The key down event of the textarea element. Is only applied if the input event isn't fully supported.
			 * @param event The key down event.
			 */
			function textareaOnKeyDown(event) {
				var keyCode = event.keyCode;
				if (textareaIsRestrictedKeyCode(keyCode))
					return;
				if (_textareaKeyDownKeyCodesList.length === 0) {
					var action = function () {
						textareaUpdate();
						_base.update(_strAuto);
					};
					action();
					_textareaUpdateIntervalID = setInterval(action, 1000 / 60);
				}
				if (helper.inArray(keyCode, _textareaKeyDownKeyCodesList) === -1)
					_textareaKeyDownKeyCodesList.push(keyCode);
			}

			/**
			 * The key up event of the textarea element. Is only applied if the input event isn't fully supported.
			 * @param event The key up event.
			 */
			function textareaOnKeyUp(event) {
				var keyCode = event.keyCode;
				if (textareaIsRestrictedKeyCode(keyCode))
					return;
				var index = helper.inArray(keyCode, _textareaKeyDownKeyCodesList);
				if (index > -1)
					_textareaKeyDownKeyCodesList.splice(index, 1);
				if (_textareaKeyDownKeyCodesList.length === 0) {
					textareaUpdate();
					_base.update(_strAuto);
					clearInterval(_textareaUpdateIntervalID);
				}
			}

			/**
			 * The drop event of the textarea element.
			 */
			function textareaOnDrop() {
				setTimeout(function () {
					textareaUpdate();
					_base.update(_strAuto);
				}, 50);
			}

			/**
			 * The focus event of the textarea element.
			 */
			function textareaOnFocus() {
				_textareaHasFocus = true;
			}

			/**
			 * The focus out event of the textarea element.
			 */
			function textareaOnFocusOut() {
				_textareaHasFocus = false;
				clearInterval(_textareaUpdateIntervalID);
				_textareaKeyDownKeyCodesList = [];
				textareaUpdate();
				_base.update(_strAuto);
			}

			/**
			 * The scroll event of the textarea element.
			 * @param event The scroll event.
			 */
			function textareaOnScroll(event) {
				_targetElement[_strScrollLeft](_rtlScrollBehavior.i && _normalizeRTLCache ? 9999999 : 0);
				_targetElement[_strScrollTop](0);
				compatibility.prvD(event);
				compatibility.stpP(event);
				return false;
			}

			/**
			 * Prevents text from deselection if attached to the document element on the mousedown event of a DOM element.
			 * @param event The select start event.
			 */
			function onSelectStart(event) {
				compatibility.prvD(event);
				return false;
			}

			/**
			 * Determines whether native overlay scrollbars are active.
			 * @returns {boolean} True if native overlay scrollbars are active, false otherwise.
			 */
			function nativeOverlayScrollbarsAreActive() {
				return (_ignoreOverlayScrollbarHidingCache && (_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y));
			}

			/**
			 * Shows or hides the given scrollbar and applied a class name which indicates if the scrollbar is scrollable or not.
			 * @param isHorizontal True if the horizontal scrollbar is the target, false if the vertical scrollbar is the target.
			 * @param shallBeVisible True if the scrollbar shall be shown, false if hidden.
			 * @param canScroll True if the scrollbar is scrollable, false otherwise.
			 */
			function refreshScrollbarAppearance(isHorizontal, shallBeVisible, canScroll) {
				var scrollbarClassName = isHorizontal ? _classNameHostScrollbarHorizontalHidden : _classNameHostScrollbarVerticalHidden;
				var scrollbarElement = isHorizontal ? _scrollbarHorizontalElement : _scrollbarVerticalElement;

				if (shallBeVisible)
					_hostElement.removeClass(scrollbarClassName);
				else
					_hostElement.addClass(scrollbarClassName);

				if (canScroll)
					scrollbarElement.removeClass(_classNameScrollbarUnusable);
				else
					scrollbarElement.addClass(_classNameScrollbarUnusable);
			}

			/**
			 * Autoshows / autohides both scrollbars with.
			 * @param shallBeVisible True if the scrollbars shall be autoshown (only the case if they are hidden by a autohide), false if the shall be auto hidden.
			 * @param delayfree True if the scrollbars shall be hidden without a delay, false or undefined otherwise.
			 */
			function refreshScrollbarsAutoHide(shallBeVisible, delayfree) {
				clearTimeout(_scrollbarsAutoHideTimeoutId);
				if (shallBeVisible) {
					//if(_hasOverflowCache.x && _hideOverflowCache.xs)
					_scrollbarHorizontalElement.removeClass(_classNameScrollbarAutoHidden);
					//if(_hasOverflowCache.y && _hideOverflowCache.ys)
					_scrollbarVerticalElement.removeClass(_classNameScrollbarAutoHidden);
				}
				else {
					var strActive = 'active';
					var hide = function () {
						if (!_scrollbarsAutoHideScrollAndHovered) {
							var anyActive = _scrollbarHorizontalHandleElement.hasClass(strActive) || _scrollbarVerticalHandleElement.hasClass(strActive);
							if (!anyActive && (_scrollbarsAutoHideScroll || _scrollbarsAutoHideLeave))
								_scrollbarHorizontalElement.addClass(_classNameScrollbarAutoHidden);
							if (!anyActive && (_scrollbarsAutoHideScroll || _scrollbarsAutoHideLeave))
								_scrollbarVerticalElement.addClass(_classNameScrollbarAutoHidden);
						}
					};
					if (_scrollbarsAutoHideDelay > 0 && delayfree !== true)
						_scrollbarsAutoHideTimeoutId = setTimeout(hide, _scrollbarsAutoHideDelay);
					else
						hide();
				}
			}

			/**
			 * Refreshes the handle length of the given scrollbar.
			 * @param isHorizontal True if the horizontal scrollbar handle shall be refreshed, false if the vertical one shall be refreshed.
			 */
			function refreshScrollbarHandleLength(isHorizontal) {
				var handleCSS = {};
				var scrollbarVars = getScrollbarVars(isHorizontal);

				//get and apply intended handle length
				var handleRatio = Math.min(1, (_hostSizeCache[scrollbarVars._wh] - (_paddingAbsoluteCache ? (isHorizontal ? _paddingX : _paddingY) : 0)) / _contentScrollSizeCache[scrollbarVars._wh]);
				handleCSS[scrollbarVars.wh] = (Math.floor(handleRatio * 100 * 100000) / 100000) + "%"; //the last * 100000 / 100000 is for flooring to the 4th digit

				if (!nativeOverlayScrollbarsAreActive())
					scrollbarVars.h.css(handleCSS);

				//measure the handle length to respect min & max length
				scrollbarVars.i.hl = scrollbarVars.h[0]['offset' + scrollbarVars.WH];   //hl = handle length
				scrollbarVars.i.hlr = handleRatio;                                      //hr = handle length ratio
			}

			/**
			 * Refreshes the handle offset of the given scrollbar.
			 * @param isHorizontal True if the horizontal scrollbar handle shall be refreshed, false if the vertical one shall be refreshed.
			 * @param currentScroll The current scroll offset of the given scrollbar axis. (if isHorizontal ? scrollLeft : scrollTop)
			 */
			function refreshScrollbarHandleOffset(isHorizontal, currentScroll) {
				var isRTLisHorizontal = _isRTL && isHorizontal;
				var handleCSS = {};
				var scrollbarVars = getScrollbarVars(isHorizontal);

				//measure the handle length to respect min & max length
				//DONT use the variable '_contentScrollSizeCache[scrollbarVars._wh]' instead of '_viewportElement[0]['scroll' + scrollbarVars.WH]'
				// because its a bit behind during the small delay when content size updates
				//(delay = _mutationObserverContentLag, if its 0 then this var could be used)
				var maxScroll = _viewportElement[0][_strScroll + scrollbarVars.WH] - _viewportElement[0]['client' + scrollbarVars.WH];

				//if rtl scroll max is negative
				if (_rtlScrollBehavior.n && isRTLisHorizontal)
					maxScroll *= -1;

				var posRatio = currentScroll / maxScroll;
				posRatio = isNaN(posRatio) ? 0 : Math.min(1, posRatio);

				scrollbarVars.i.ms = maxScroll;                     //ms = max scroll
				scrollbarVars.i.cs = currentScroll;                 //cs = current scroll
				scrollbarVars.i.csr = posRatio;                     //csr = current scroll Ratio

				var handleLength = scrollbarVars.i.hl;
				var trackLength = scrollbarVars.t[0]['offset' + scrollbarVars.WH];
				var handleTrackDiff = trackLength - handleLength;
				var offset = handleTrackDiff * posRatio;
				offset = isNaN(offset) ? 0 : offset;
				if (isRTLisHorizontal && (_rtlScrollBehavior.n || !_rtlScrollBehavior.n && !_rtlScrollBehavior.i))
					offset = trackLength - handleLength - offset;
				offset = Math.max(0, offset);

				if (_supportTransform) {
					if (isRTLisHorizontal)
						offset = -(trackLength - handleLength - offset);
					var translateValue;
					var strTranslateBrace = 'translate(';
					var strTransform = 'transform';
					if (isHorizontal)
						translateValue = strTranslateBrace + offset + 'px, 0px)';
					else
						translateValue = strTranslateBrace + '0px, ' + offset + 'px)';
					handleCSS['-webkit-' + strTransform] = translateValue;
					handleCSS['-moz-' + strTransform] = translateValue;
					handleCSS['-ms-' + strTransform] = translateValue;
					handleCSS['-o-' + strTransform] = translateValue;
					handleCSS[strTransform] = translateValue;
				}
				else
					handleCSS[scrollbarVars.lt] = offset;
				//only apply css if offset has changed and overflow exists.

				if (!nativeOverlayScrollbarsAreActive())
					scrollbarVars.h.css(handleCSS);

				scrollbarVars.i.ho = offset;                        //ho = handle offset
				scrollbarVars.i.tl = trackLength;                   //tl = track length
			}

			/**
			 * Refreshes the interactivity of the given scrollbar element.
			 * @param isTrack True if the track element is the target, false if the handle element is the target.
			 * @param value True for interactivity false for no interactivity.
			 */
			function refreshScrollbarsInteractive(isTrack, value) {
				var action = value ? 'removeClass' : 'addClass';
				var element1 = isTrack ? _scrollbarHorizontalTrackElement : _scrollbarHorizontalHandleElement;
				var element2 = isTrack ? _scrollbarVerticalTrackElement : _scrollbarVerticalHandleElement;
				var className = isTrack ? _classNameScrollbarTrackOff : _classNameScrollbarHandleOff;

				element1[action](className);
				element2[action](className);
			}

			/**
			 * Builds all scrollbars if they aren't already build.
			 */
			function buildScrollbars() {
				_scrollbarHorizontalElement = helper(_strDivBegin + _classNameScrollbar + _strSpace + _classNameScrollbarHorizontal + _strDivEnd);
				_scrollbarHorizontalTrackElement = helper(_strDivBegin + _classNameScrollbarTrack + _strDivEnd);
				_scrollbarHorizontalHandleElement = helper(_strDivBegin + _classNameScrollbarHandle + _strDivEnd);
				_scrollbarVerticalElement = helper(_strDivBegin + _classNameScrollbar + _strSpace + _classNameScrollbarVertical + _strDivEnd);
				_scrollbarVerticalTrackElement = helper(_strDivBegin + _classNameScrollbarTrack + _strDivEnd);
				_scrollbarVerticalHandleElement = helper(_strDivBegin + _classNameScrollbarHandle + _strDivEnd);

				_scrollbarHorizontalElement.append(_scrollbarHorizontalTrackElement);
				_scrollbarHorizontalTrackElement.append(_scrollbarHorizontalHandleElement);
				_scrollbarVerticalElement.append(_scrollbarVerticalTrackElement);
				_scrollbarVerticalTrackElement.append(_scrollbarVerticalHandleElement);

				_paddingElement.after(_scrollbarVerticalElement);
				_paddingElement.after(_scrollbarHorizontalElement);

				//scrollbar events
				if (_supportTransition) {
					_scrollbarHorizontalElement.on(_strTransitionEndEvent, function (event) {
						if (event.target !== _scrollbarHorizontalElement[0])
							return;
						refreshScrollbarHandleLength(true);
						refreshScrollbarHandleOffset(true, _viewportElement[_strScrollLeft]());
					});
					_scrollbarVerticalElement.on(_strTransitionEndEvent, function (event) {
						if (event.target !== _scrollbarVerticalElement[0])
							return;
						refreshScrollbarHandleLength(false);
						refreshScrollbarHandleOffset(false, _viewportElement[_strScrollTop]());
					});
				}
				initScrollbarInteractivity(true);
				initScrollbarInteractivity(false);

				_scrollbarCornerElement = helper(_strDivBegin + _strSpace + _classNameScrollbarCorner + _strDivEnd);
				_hostElement.append(_scrollbarCornerElement);
			}

			/**
			 * Initializes all scrollbar interactivity. (track and handle dragging, clicking, scrolling)
			 * @param isHorizontal True if the target scrollbar is the horizontal scrollbar, false if the target scrollbar is the vertical scrollbar.
			 */
			function initScrollbarInteractivity(isHorizontal) {
				var scrollbarVars = getScrollbarVars(isHorizontal);
				var mouseDownScroll;
				var mouseDownOffset;
				var xy = scrollbarVars.xy;
				var scroll = _strScroll + scrollbarVars.LT;
				var strActive = 'active';
				var trackTimeout;
				var scrollDurationFactor = 1;
				var increaseTrackScrollAmount = function () {
					scrollDurationFactor = 0.5;
				};
				var decreaseTrackScrollAmount = function () {
					scrollDurationFactor = 1;
				};
				var handleDragMove = function (event) {
					var originalEvent = event.originalEvent || event;
					var trackLength = scrollbarVars.i.tl;
					var handleLength = scrollbarVars.i.hl;
					var scrollRange = scrollbarVars.i.ms;
					var scrollRaw = (handleLength / 2) + compatibility.page(event)[xy] - mouseDownOffset;
					var scrollDeltaPercent = (scrollRaw - (handleLength / 2)) / (trackLength - handleLength);
					var scrollDelta = (scrollRange * scrollDeltaPercent);
					scrollDelta = isFinite(scrollDelta) ? scrollDelta : 0;
					if (_isRTL && isHorizontal && (_rtlScrollBehavior.n || !_rtlScrollBehavior.n && !_rtlScrollBehavior.i))
						scrollDelta *= -1;
					_viewportElement[scroll](mouseDownScroll + scrollDelta);

					if (!_supportPassiveEvents)
						compatibility.prvD(event);
				};
				var documentMouseTouchUp = function (event) {
					event = event || event.originalEvent;
					_bodyElement.removeClass(_classNameDragging);
					scrollbarVars.h.removeClass(strActive);
					scrollbarVars.t.removeClass(strActive);
					scrollbarVars.s.removeClass(strActive);

					if (_supportPassiveEvents) {
						removePassiveEventListener(_documentElement, _strMouseTouchMoveEvent, handleDragMove);
						removePassiveEventListener(_documentElement, _strMouseTouchUpEvent, documentMouseTouchUp);
						removePassiveEventListener(_documentElement, _strKeyDownEvent, documentKeyDown);
						removePassiveEventListener(_documentElement, _strKeyUpEvent, documentKeyUp);
						removePassiveEventListener(_documentElement, _strSelectStartEvent, onSelectStart);
					}
					else {
						_documentElement.off(_strMouseTouchMoveEvent, handleDragMove);
						_documentElement.off(_strMouseTouchUpEvent, documentMouseTouchUp);
						_documentElement.off(_strKeyDownEvent, documentKeyDown);
						_documentElement.off(_strKeyUpEvent, documentKeyUp);
						_documentElement.off(_strSelectStartEvent, onSelectStart);
					}
					decreaseTrackScrollAmount();
					mouseDownScroll = undefined;
					mouseDownOffset = undefined;
					if (trackTimeout !== undefined) {
						_base.scrollStop();
						clearTimeout(trackTimeout);
						trackTimeout = undefined;
					}

					//if mouse is outside host element
					var rect = _hostElement[0].getBoundingClientRect();
					if (!(event.clientX >= rect.left && event.clientX <= rect.right &&
						event.clientY >= rect.top && event.clientY <= rect.bottom)) {
						hostOnMouseLeave();
					}
					if (_scrollbarsAutoHideScroll)
						refreshScrollbarsAutoHide(false);
				};
				var documentKeyDown = function (event) {
					if (event.keyCode == 16)
						increaseTrackScrollAmount();
				};
				var documentKeyUp = function (event) {
					if (event.keyCode == 16)
						decreaseTrackScrollAmount();
				};
				scrollbarVars.h.on(_strMouseTouchDownEvent, function (event) {
					if (_isSleeping)
						return;

					var originalEvent = event.originalEvent || event;
					var isTouchEvent = originalEvent.touches !== undefined;
					if (nativeOverlayScrollbarsAreActive() || !_scrollbarsDragScrollingCache || (isTouchEvent && !_scrollbarsTouchSupport))
						return;

					if (compatibility.mBtn(event) === 1 || isTouchEvent) {
						mouseDownScroll = _viewportElement[scroll]();
						mouseDownScroll = mouseDownScroll === undefined ? 0 : mouseDownScroll;
						if (_isRTL && isHorizontal && !_rtlScrollBehavior.n || !_isRTL)
							mouseDownScroll = mouseDownScroll < 0 ? 0 : mouseDownScroll;
						mouseDownOffset = compatibility.page(event)[xy];

						_bodyElement.addClass(_classNameDragging);
						scrollbarVars.h.addClass(strActive);
						scrollbarVars.s.addClass(strActive);

						if (_supportPassiveEvents) {
							addPassiveEventListener(_documentElement, _strSelectStartEvent, onSelectStart);
							addPassiveEventListener(_documentElement, _strMouseTouchMoveEvent, handleDragMove);
							addPassiveEventListener(_documentElement, _strMouseTouchUpEvent, documentMouseTouchUp);
						}
						else {
							_documentElement.on(_strSelectStartEvent, onSelectStart);
							_documentElement.on(_strMouseTouchMoveEvent, handleDragMove);
							_documentElement.on(_strMouseTouchUpEvent, documentMouseTouchUp);
						}
						compatibility.prvD(event);
					}
				});
				scrollbarVars.t.on(_strMouseTouchDownEvent, function (event) {
					if (_isSleeping)
						return;

					var originalEvent = event.originalEvent || event;
					var isTouchEvent = originalEvent.touches !== undefined;
					if (nativeOverlayScrollbarsAreActive() || !_scrollbarsClickScrollingCache || (isTouchEvent && !_scrollbarsTouchSupport))
						return;

					if (compatibility.mBtn(event) === 1 || isTouchEvent) {
						var scrollDistance = _viewportSize[scrollbarVars._wh];
						var trackOffset = scrollbarVars.t.offset()[scrollbarVars.lt];
						var decreaseScroll;
						var isFirstIteration = true;
						if (event.shiftKey)
							increaseTrackScrollAmount();
						var scrollAction = function () {
							var handleOffset = scrollbarVars.i.ho;
							var handleLength = scrollbarVars.i.hl;
							var mouseOffset = mouseDownOffset - trackOffset;
							var scrollDuration = 200 * scrollDurationFactor;
							var timeoutDelay = isFirstIteration ? Math.max(333, scrollDuration) : scrollDuration;
							var scrollObj = {};
							var rtlIsNormal = _isRTL && isHorizontal && ((!_rtlScrollBehavior.i && !_rtlScrollBehavior.n) || _normalizeRTLCache);
							var decreaseScrollCondition = handleOffset > mouseOffset;

							if (rtlIsNormal)
								decreaseScrollCondition = handleOffset < mouseOffset;

							if (decreaseScrollCondition) {
								if (decreaseScroll === undefined)
									decreaseScroll = true;
								scrollObj[scrollbarVars.xy] = '-=' + scrollDistance;
							}
							else {
								if (decreaseScroll === undefined)
									decreaseScroll = false;
								scrollObj[scrollbarVars.xy] = '+=' + scrollDistance;
							}
							_base.scrollStop();
							_base.scroll(scrollObj, scrollDuration, 'linear');

							var finishedCondition = decreaseScroll ? handleOffset <= mouseOffset : handleOffset + handleLength >= mouseOffset;
							if (rtlIsNormal)
								finishedCondition = decreaseScroll ? handleOffset + handleLength >= mouseOffset : handleOffset <= mouseOffset;

							if (finishedCondition) {
								clearTimeout(trackTimeout);
								_base.scrollStop();
								trackTimeout = undefined;
							}
							else
								trackTimeout = setTimeout(scrollAction, timeoutDelay);
							isFirstIteration = false;
						};

						mouseDownOffset = compatibility.page(event)[xy];
						_bodyElement.addClass(_classNameDragging);
						scrollbarVars.t.addClass(strActive);
						scrollbarVars.s.addClass(strActive);

						if (_supportPassiveEvents) {
							addPassiveEventListener(_documentElement, _strSelectStartEvent, onSelectStart);
							addPassiveEventListener(_documentElement, _strMouseTouchUpEvent, documentMouseTouchUp);
							addPassiveEventListener(_documentElement, _strKeyDownEvent, documentKeyDown);
							addPassiveEventListener(_documentElement, _strKeyUpEvent, documentKeyUp);
						}
						else {
							_documentElement.on(_strSelectStartEvent, onSelectStart);
							_documentElement.on(_strMouseTouchUpEvent, documentMouseTouchUp);
							_documentElement.on(_strKeyDownEvent, documentKeyDown);
							_documentElement.on(_strKeyUpEvent, documentKeyUp);
						}

						scrollAction();
						compatibility.prvD(event);
					}
				}).hover(function () { //make sure both scrollbars will stay visible if one scrollbar is hovered if autoHide is "scroll".
					if (_scrollbarsAutoHideScroll) {
						_scrollbarsAutoHideScrollAndHovered = true;
						refreshScrollbarsAutoHide(true);
					}
				}, function () {
					if (_scrollbarsAutoHideScroll) {
						_scrollbarsAutoHideScrollAndHovered = false;
						refreshScrollbarsAutoHide(false);
					}
				});
				scrollbarVars.s.on(_strMouseTouchDownEvent, function (event) {
					compatibility.stpP(event);
				});
			}

			/**
			 * Returns a object which is used for fast access for specific variables.
			 * @param isHorizontal True if the horizontal scrollbar vars shall be accessed, false if the vertical scrollbar vars shall be accessed.
			 * @returns {{wh: string, WH: string, lt: string, _wh: string, _lt: string, t: *, h: *, c: {}, s: *}}
			 */
			function getScrollbarVars(isHorizontal) {
				return {
					wh: isHorizontal ? _strWidth : _strHeight,
					WH: isHorizontal ? 'Width' : 'Height',
					lt: isHorizontal ? _strLeft : _strTop,
					LT: isHorizontal ? 'Left' : 'Top',
					xy: isHorizontal ? _strX : _strY,
					XY: isHorizontal ? 'X' : 'Y',
					_wh: isHorizontal ? 'w' : 'h',
					_lt: isHorizontal ? 'l' : 't',
					t: isHorizontal ? _scrollbarHorizontalTrackElement : _scrollbarVerticalTrackElement,
					h: isHorizontal ? _scrollbarHorizontalHandleElement : _scrollbarVerticalHandleElement,
					s: isHorizontal ? _scrollbarHorizontalElement : _scrollbarVerticalElement,
					i: isHorizontal ? _scrollHorizontalInfo : _scrollVerticalInfo
				};
			}

			/**
			 * The mouse enter event of the host element. This event is only needed for the autoHide feature.
			 */
			function hostOnMouseEnter() {
				if (_scrollbarsAutoHideLeave)
					refreshScrollbarsAutoHide(true);
			}

			/**
			 * The mouse leave event of the host element. This event is only needed for the autoHide feature.
			 */
			function hostOnMouseLeave() {
				if (_scrollbarsAutoHideLeave && !_bodyElement.hasClass(_classNameDragging))
					refreshScrollbarsAutoHide(false);
			}

			/**
			 * The scroll event of the viewport element. That is the main scroll event. It controls also the "scroll", "scrollStart" and "scrollStop" callbacks.
			 * @param event The scroll event.
			 */
			function viewportOnScroll(event) {
				if (_isSleeping)
					return;

				var optionsCallbacks = _currentPreparedOptions.callbacks;
				var onScrollStartCallback = optionsCallbacks.onScrollStart;
				var onScrollCallback = optionsCallbacks.onScroll;
				var onScrollStopCallback = optionsCallbacks.onScrollStop;
				if (_scrollStopTimeoutId !== undefined)
					clearTimeout(_scrollStopTimeoutId);
				else {
					if (_scrollbarsAutoHideScroll)
						refreshScrollbarsAutoHide(true);

					if (!nativeOverlayScrollbarsAreActive())
						_hostElement.addClass(_classNameHostScrolling);

					if (helper.isFunction(onScrollStartCallback))
						callCallback(onScrollStartCallback, event);
				}

				refreshScrollbarHandleOffset(true, _viewportElement[_strScrollLeft]());
				refreshScrollbarHandleOffset(false, _viewportElement[_strScrollTop]());

				if (helper.isFunction(onScrollCallback))
					callCallback(onScrollCallback, event);

				_scrollStopTimeoutId = setTimeout(function () {
					onScrollStop(event);
					if (helper.isFunction(onScrollStopCallback))
						callCallback(onScrollStopCallback, event);
				}, _scrollStopDelay);
			}

			/**
			 * This method gets called if the scroll event stopped for a specified amount of time.
			 * @param event The last scroll event which was fired.
			 */
			function onScrollStop() {
				clearTimeout(_scrollStopTimeoutId);
				_scrollStopTimeoutId = undefined;
				if (_scrollbarsAutoHideScroll)
					refreshScrollbarsAutoHide(false);

				if (!nativeOverlayScrollbarsAreActive())
					_hostElement.removeClass(_classNameHostScrolling);
			}

			/**
			 * Checks whether the given object is a HTMLElement.
			 * @param o The object which shall be checked.
			 * @returns {boolean} True the given object is a HTMLElement, false otherwise.
			 */
			function isHTMLElement(o) {
				return (
					typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
					o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
				);
			}

			/**
			 * Validates a given option and returns the result.
			 * @param currentOptions Current options object
			 * @param optionName The option name
			 * @param optionAllowedValues Allowed Values for this option
			 * @param removeFromObject Undefined or True to remove the option with the given option name from the given options object.
			 * @returns {{n: string, s: boolean, v: *, p: *}}
			 * n = option name
			 * s = true if option is valid, false otherwise
			 * v = the original value
			 * p = the prepared value (may only different from original value if typeof string)
			 */
			function getValidatedOption(currentOptions, optionName, optionAllowedValues, removeFromObject) {
				var returnObj = {n: optionName, s: false, v: undefined, p: undefined}; //name = [name], succes = false, value = undefined, prepared = undefined,
				var optionValue;
				var optionValueType = 'undefined';
				var optionNameProgression = byPropertyPath.has(currentOptions, optionName);
				var currObj = byPropertyPath.get(currentOptions, optionName);
				var canBeUndefined = false;
				var optionIsInvalid = optionNameProgression !== true;
				var strString = _strString;
				var strStar = '*';
				var i, v, g;
				var optionAllowedValuesLength;
				var anyStringAllowed = false;
				if (helper.type(optionAllowedValues) !== 'array')
					optionAllowedValues = [optionAllowedValues];
				optionAllowedValuesLength = optionAllowedValues.length;

				for (i = 0; i < optionAllowedValuesLength; i++) {
					var curr = optionAllowedValues[i];
					if (curr === strStar) {
						if (optionAllowedValuesLength > 1) {
							var count = 0;
							for (g = 0; g < optionAllowedValuesLength; g++) {
								var check = optionAllowedValues[g];
								if (helper.type(check) === strString) {
									count++;
									if (count > 1)
										break;
								}
							}
							if (count === 1)
								anyStringAllowed = true;
						}
						else
							anyStringAllowed = true;
					}
					if (curr === undefined)
						canBeUndefined = true;
				}

				if (optionIsInvalid && optionNameProgression === false && canBeUndefined)
					optionIsInvalid = false;

				if (!optionIsInvalid) {
					optionValue = currObj;
					optionValueType = helper.type(optionValue);
					var checkOption = function (allowedValue) {
						var valueType = helper.type(allowedValue);
						var correct = false;
						if (valueType === optionValueType) {
							if (valueType === strString) {
								correct = anyStringAllowed ? true : optionValue === allowedValue;
							}
							else {
								correct = true;
							}
							if (correct) {
								returnObj.s = true;
								returnObj.v = optionValue;
								returnObj.p = optionValue;
								return true;
							}
						}
						return false;
					};
					for (i = 0; i < optionAllowedValuesLength; i++) {
						var currPossibleValue = optionAllowedValues[i];
						if (helper.type(currPossibleValue) === strString) {
							var currPossibleValueSplit = currPossibleValue.split(':');
							var key = currPossibleValueSplit[0];
							var breakAll = false;
							for (v = 0; v < currPossibleValueSplit.length; v++) {
								if (checkOption(currPossibleValueSplit[v])) {
									if (!anyStringAllowed)
										returnObj.p = key;
									breakAll = true;
									break;
								}
							}
							if (breakAll)
								break;
						}
						else {
							if (checkOption(currPossibleValue))
								break;
						}
					}
				}
				if (!returnObj.s) {
					var error = "The option \"" + optionName + "\" wasn't set, because";
					if (!optionIsInvalid || optionNameProgression === false) {
						var allowedValueTypes = [];
						var allowedValueTypesString = _strEmpty;
						var hasAllowedStrings = false;
						var allowedStringsText = _strEmpty;
						for (i = 0; i < optionAllowedValuesLength; i++) {
							var value = optionAllowedValues[i];
							var valueType = helper.type(value);
							if (valueType === strString) {
								hasAllowedStrings = !anyStringAllowed;
								var stringSplit = value.split(':');
								for (v = 0; v < stringSplit.length; v++) {
									allowedStringsText += "\"" + stringSplit[v] + "\", ";
								}
							}
							if (helper.inArray(valueType, allowedValueTypes) === -1) {
								allowedValueTypes.push(valueType);
								allowedValueTypesString = allowedValueTypesString + valueType.toUpperCase() + ", ";
							}
						}
						allowedValueTypesString = allowedValueTypesString.slice(0, -2);
						if (hasAllowedStrings)
							allowedStringsText = allowedStringsText.slice(0, -2);
						console.warn(error + " it doesn't accept the type [ " + optionValueType.toUpperCase() + " ] with the value of \"" + optionValue + "\".\r\n" +
							"Accepted types are: [ " + allowedValueTypesString + " ]." +
							(hasAllowedStrings ? "\r\nValid strings are: [ " + allowedStringsText + " ]." : _strEmpty));
					}
					else {
						var isDefaultOption = byPropertyPath.has(_defaultOptions, optionName);
						if (isDefaultOption === true) {
							console.warn(error + " \"" + optionNameProgression + "\" is not from type [ OBJECT ].");
						}
						else {
							error = "The option \"" + optionName + "\" is not a default option";
							if (isDefaultOption === false)
								console.warn(error + _strDot);
							else
								console.warn(error + " and couldn't be resolved, because \"" + isDefaultOption + "\" is not from type [ OBJECT ].");
						}
					}
				}
				removeFromObject = removeFromObject === undefined ? true : removeFromObject;
				if (removeFromObject)
					byPropertyPath.del(currentOptions, optionName);
				return returnObj;
			}

			/**
			 * Measures the min width and min height of the body element and refreshes the related cache.
			 * @returns {boolean} True if the min width or min height has changed, false otherwise.
			 */
			function bodyMinSizeChanged() {
				var bodyMinSize = {};
				if (_isBody && _contentArrangeElement) {
					bodyMinSize.w = parseIntToZeroOrNumber(_contentArrangeElement.css(_strMinMinus + _strWidth));
					bodyMinSize.h = parseIntToZeroOrNumber(_contentArrangeElement.css(_strMinMinus + _strHeight));
					bodyMinSize.c = checkCacheDouble(bodyMinSize, _bodyMinSizeCache);
					bodyMinSize.f = true; //flag for "measured at least once"
				}
				_bodyMinSizeCache = bodyMinSize;
				return bodyMinSize.c;
			}

			/**
			 * Builds a new object which consists of all valid options in the given options array.
			 * @param validatedOptionsArray The array of validated options
			 * @param usePreparedValues True for prepared values, False for original values (these two may only differ if they are typeof string)
			 * @returns {{}} A new object which consists of all valid options from the given array.
			 */
			function buildValidatedOptionsObject(validatedOptionsArray, usePreparedValues) {
				var returnObj = {};
				var i, v;
				for (i = 0; i < validatedOptionsArray.length; i++) {
					var currValidatedOption = validatedOptionsArray[i];
					var objects = [];
					if (currValidatedOption.s) {
						var propertyString = currValidatedOption.n;
						var propertyStingSplit = propertyString.split('.');

						for (v = 0; v < propertyStingSplit.length; v++) {
							objects[v] = {};
							objects[v][propertyStingSplit[v]] = {};
						}
						for (v = 0; v < objects.length; v++) {
							var set = false;
							var currObj = objects[v];
							if (v + 1 === objects.length)
								set = true;

							for (var property in currObj) {
								if (currObj.hasOwnProperty(property)) {
									currObj[property] = objects[v + 1];
									if (set) {
										if (usePreparedValues)
											currObj[property] = currValidatedOption.p;
										else
											currObj[property] = currValidatedOption.v;
									}
								}
							}
						}
						helper.extend(true, returnObj, objects[0]);
					}
				}
				return returnObj;
			}

			/**
			 * Compares 2 arrays and returns the differences between them as a array.
			 * @param a1 The first array which shall be compared.
			 * @param a2 The second array which shall be compared.
			 * @returns {Array} The differences between the two arrays.
			 */
			function getArrayDifferences(a1, a2) {
				var a = [];
				var diff = [];
				var i;
				for (i = 0; i < a1.length; i++) {
					a[a1[i]] = true;
				}
				for (i = 0; i < a2.length; i++) {
					if (a[a2[i]]) {
						delete a[a2[i]];
					} else {
						a[a2[i]] = true;
					}
				}
				for (var k in a) {
					diff.push(k);
				}
				return diff;
			}

			/**
			 * Returns true if the class names really changed (new class without plugin host prefix)
			 * @param oldCassNames The old ClassName string.
			 * @param newClassNames The new ClassName string.
			 * @returns {boolean} True if the class names has really changed, false otherwise.
			 */
			function hostClassNamesChanged(oldCassNames, newClassNames) {
				var currClasses = (newClassNames !== undefined && newClassNames !== null) ? newClassNames.split(_strSpace) : _strEmpty;
				var oldClasses = (oldCassNames !== undefined && oldCassNames !== null) ? oldCassNames.split(_strSpace) : _strEmpty;
				if (currClasses === _strEmpty && oldClasses === _strEmpty)
					return false;
				var diff = getArrayDifferences(oldClasses, currClasses);
				var changed = false;
				var oldClassNames = _oldClassName !== undefined && _oldClassName !== null ? _oldClassName.split(_strSpace) : [_strEmpty];
				var currClassNames = _classNameCache !== undefined && _classNameCache !== null ? _classNameCache.split(_strSpace) : [_strEmpty];

				//remove none theme from diff list to prevent update
				var idx = helper.inArray(_classNameThemeNone, diff);
				if (idx > -1)
					diff.splice(idx, 1);

				for (var i = 0; i < diff.length; i++) {
					var curr = diff[i];
					if (curr.indexOf(_classNameHostElement) !== 0) {
						var v;
						var o = true;
						var c = true;
						for (v = 0; v < oldClassNames.length; v++) {
							if (curr === oldClassNames[v]) {
								o = false;
								break;
							}
						}
						for (v = 0; v < currClassNames.length; v++) {
							if (curr === currClassNames[v]) {
								c = false;
								break;
							}
						}
						if (o && c) {
							changed = true;
							break;
						}
					}

				}
				return changed;
			}

			/**
			 * Returns true if the given mutation is not from a from the plguin generated element. If the target element is a textarea the mutation is always unknown.
			 * @param mutation The mutation which shall be checked.
			 * @returns {boolean} True if the mutation is from a unknown element, false otherwise.
			 */
			function isUnknownMutation(mutation) {
				var attributeName = mutation.attributeName;
				var mutationTarget = mutation.target;
				if (mutationTarget === _contentElement[0])
					return false;
				if (mutation.type === "attributes" && (attributeName === "class" || attributeName === "style") && !_isTextarea) {
					//only do it of browser support it natively
					if (typeof mutationTarget.closest !== 'function')
						return true;
					if (mutationTarget.closest(_strDot + _classNameResizeObserverElement) !== null ||
						mutationTarget.closest(_strDot + _classNameScrollbar) !== null ||
						mutationTarget.closest(_strDot + _classNameScrollbarCorner) !== null)
						return false;
				}
				return true;
			}

			/**
			 * Sets new options but doesn't call the update method.
			 * @param newOptions The object which contains the new options.
			 */
			function setOptions(newOptions) {
				newOptions = helper.extend(true, {}, _currentOptions, newOptions);
				var classNameAllowedValues = ['*', null];
				var overflowBehaviorAllowedValues = ['v-h:visible-hidden', 'v-s:visible-scroll', 's:scroll', 'h:hidden'];
				var scrollbarsVisibilityAllowedValues = ['v:visible', 'h:hidden', 'a:auto'];
				var scrollbarsAutoHideAllowedValues = ['n:never', 's:scroll', 'l:leave'];
				var resizeAllowedValues = ['n:none', 'b:both', 'h:horizontal', 'v:vertical'];
				var strCallbacksDot = 'callbacks.';
				var strScrollbarsDot = _strScrollbar + 's.';
				var strTextareaDot = 'textarea.';
				var strOverflowBehaviorDot = 'overflowBehavior.';
				var strNativeScrollbarsOverlaidDot = 'nativeScrollbarsOverlaid.';

				var booleanAllowedValues = true;
				var booleanNullAllowedValues = [booleanAllowedValues, null];
				var numberAllowedValues = 0;
				var callbackAllowedValues = [new Function(), null];

				var validatedOptions = [];
				validatedOptions.push(getValidatedOption(newOptions, strNativeScrollbarsOverlaidDot + 'showNativeScrollbars', booleanAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strNativeScrollbarsOverlaidDot + 'initialize', booleanAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strOverflowBehaviorDot + _strX, overflowBehaviorAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strOverflowBehaviorDot + _strY, overflowBehaviorAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strScrollbarsDot + 'visibility', scrollbarsVisibilityAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strScrollbarsDot + 'autoHide', scrollbarsAutoHideAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strScrollbarsDot + 'autoHideDelay', numberAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strScrollbarsDot + 'clickScrolling', booleanAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strScrollbarsDot + 'dragScrolling', booleanAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strScrollbarsDot + 'touchSupport', booleanAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strTextareaDot + 'dynWidth', booleanAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strTextareaDot + 'dynHeight', booleanAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, 'className', classNameAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, 'resize', resizeAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, 'sizeAutoCapable', booleanAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, 'paddingAbsolute', booleanAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, 'clipAlways', booleanAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, 'normalizeRTL', booleanAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, 'autoUpdate', booleanNullAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, 'autoUpdateInterval', numberAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strCallbacksDot + 'onInitialized', callbackAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strCallbacksDot + 'onInitializationWithdrawn', callbackAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strCallbacksDot + 'onDestroyed', callbackAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strCallbacksDot + 'onScrollStart', callbackAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strCallbacksDot + 'onScroll', callbackAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strCallbacksDot + 'onScrollStop', callbackAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strCallbacksDot + 'onDirectionChanged', callbackAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strCallbacksDot + 'onContentSizeChanged', callbackAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strCallbacksDot + 'onHostSizeChanged', callbackAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strCallbacksDot + 'onOverflowChanged', callbackAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strCallbacksDot + 'onOverflowAmountChanged', callbackAllowedValues));
				validatedOptions.push(getValidatedOption(newOptions, strCallbacksDot + 'onUpdated', callbackAllowedValues));

				for (var prop in newOptions) {
					if (newOptions.hasOwnProperty(prop)) {
						if (byPropertyPath.has(_defaultOptions, prop)) {
							if (helper.isEmptyObject(newOptions[prop]))
								delete newOptions[prop];
						}
					}
				}
				if (!helper.isEmptyObject(newOptions)) {
					var prepare = function (obj) {
						helper.each(obj, function (i, v) {
							if (helper.isPlainObject(v))
								prepare(v);
							else if (helper.type(v) === 'function')
								obj[i] = helper.type(v);
						});
					};
					prepare(newOptions);
					console.warn("The following options are discarded due to invalidity:\r\n" + JSON.stringify(newOptions, null, 2));
				}

				_currentOptions = helper.extend(true, {}, _currentOptions, buildValidatedOptionsObject(validatedOptions, false));
				_currentPreparedOptions = helper.extend(true, {}, _currentPreparedOptions, buildValidatedOptionsObject(validatedOptions, true));
			}

			/**
			 * Returns true if the content size was changed since the last time this method was called.
			 * @returns {boolean} True if the content size was changed, false otherwise.
			 */
			function updateAutoContentSizeChanged() {
				if (_isSleeping)
					return false;

				var textareaValueLength = _isTextarea && _widthAutoCache && !_textareaAutoWrappingCache ? _targetElement.val().length : 0;
				var float;
				var setCSS = !_mutationObserverConnected && _widthAutoCache && !_isTextarea;
				var css = {};
				if (setCSS) {
					float = _contentElement.css(_strFloat);
					css[_strFloat] = _isRTL ? _strRight : _strLeft;
					css[_strWidth] = _strAuto;
					_contentElement.css(css);
				}
				var contentElementScrollSize = {
					w: getContentMeasureElement().scrollWidth + textareaValueLength,
					h: getContentMeasureElement().scrollHeight + textareaValueLength
				};
				if (setCSS) {
					css[_strFloat] = float;
					css[_strWidth] = _strHundredPercent;
					_contentElement.css(css);
				}
				var bodyMinSizeC = bodyMinSizeChanged();
				var changed = checkCacheDouble(contentElementScrollSize, _contentElementScrollSizeChangeDetectedCache) || bodyMinSizeC;
				_contentElementScrollSizeChangeDetectedCache = contentElementScrollSize;

				return changed;
			}

			/**
			 * Returns true if the host element attributes (id, class, style) was changed since the last time this method was called.
			 * @returns {boolean}
			 */
			function meaningfulAttrsChanged() {
				if (_isSleeping || _mutationObserverConnected)
					return false;

				var hostElementId = _hostElement.attr('id') || _strEmpty;
				var hostElementIdChanged = checkCacheSingle(hostElementId, _updateAutoHostElementIdCache);
				var hostElementClass = _hostElement.attr('class') || _strEmpty;
				var hostElementClassChanged = checkCacheSingle(hostElementClass, _updateAutoHostElementClassCache);
				var hostElementStyle = _hostElement.attr('style') || _strEmpty;
				var hostElementStyleChanged = checkCacheSingle(hostElementStyle, _updateAutoHostElementStyleCache);
				var hostElementVisible = _hostElement.is(':visible') || _strEmpty;
				var hostElementVisibleChanged = checkCacheSingle(hostElementVisible, _updateAutoHostElementVisibleCache);
				var targetElementRows = _isTextarea ? (_targetElement.attr('rows') || _strEmpty) : _strEmpty;
				var targetElementRowsChanged = checkCacheSingle(targetElementRows, _updateAutoTargetElementRowsCache);
				var targetElementCols = _isTextarea ? (_targetElement.attr('cols') || _strEmpty) : _strEmpty;
				var targetElementColsChanged = checkCacheSingle(targetElementCols, _updateAutoTargetElementColsCache);
				var targetElementWrap = _isTextarea ? (_targetElement.attr('wrap') || _strEmpty) : _strEmpty;
				var targetElementWrapChanged = checkCacheSingle(targetElementWrap, _updateAutoTargetElementWrapCache);

				_updateAutoHostElementIdCache = hostElementId;
				if (hostElementClassChanged)
					hostElementClassChanged = hostClassNamesChanged(_updateAutoHostElementClassCache, hostElementClass);
				_updateAutoHostElementClassCache = hostElementClass;
				_updateAutoHostElementStyleCache = hostElementStyle;
				_updateAutoHostElementVisibleCache = hostElementVisible;
				_updateAutoTargetElementRowsCache = targetElementRows;
				_updateAutoTargetElementColsCache = targetElementCols;
				_updateAutoTargetElementWrapCache = targetElementWrap;

				return hostElementIdChanged || hostElementClassChanged || hostElementStyleChanged || hostElementVisibleChanged || targetElementRowsChanged || targetElementColsChanged || targetElementWrapChanged;
			}

			/**
			 * Returns Zero or the number to which the value can be parsed.
			 * @param value The value which shall be parsed.
			 */
			function parseIntToZeroOrNumber(value) {
				var num = parseInt(value);
				return isNaN(num) ? 0 : num;
			}

			/**
			 * Checks is a CSS Property of a child element is affecting the scroll size of the content.
			 * @param propertyName The CSS property name.
			 * @returns {boolean} True if the property is affecting the content scroll size, false otherwise.
			 */
			function isSizeAffectingCSSProperty(propertyName) {
				if (!_initialized)
					return true;
				var affectingPropsX = [
					_strWidth,
					_strMinMinus + _strWidth,
					_strMaxMinus + _strWidth,
					_strMarginMinus + _strLeft,
					_strMarginMinus + _strRight,
					_strLeft,
					_strRight,
					'font-weight',
					'word-spacing'
				];
				var affectingPropsXContentBox = [
					_strPaddingMinus + _strLeft,
					_strPaddingMinus + _strRight,
					_strBorderMinus + _strLeft + _strWidth,
					_strBorderMinus + _strRight + _strWidth
				];
				var affectingPropsY = [
					_strHeight,
					_strMinMinus + _strHeight,
					_strMaxMinus + _strHeight,
					_strMarginMinus + _strTop,
					_strMarginMinus + _strBottom,
					_strTop,
					_strBottom,
					'line-height'
				];
				var affectingPropsYContentBox = [
					_strPaddingMinus + _strTop,
					_strPaddingMinus + _strBottom,
					_strBorderMinus + _strTop + _strWidth,
					_strBorderMinus + _strBottom + _strWidth
				];
				var _strS = 's';
				var _strVS = 'v-s';
				var checkX = _overflowBehaviorCache.x === _strS || _overflowBehaviorCache.x === _strVS;
				var checkY = _overflowBehaviorCache.y === _strS || _overflowBehaviorCache.y === _strVS;
				var sizeIsAffected = false;
				var checkPropertyName = function (arr, name) {
					for (var i = 0; i < arr.length; i++) {
						if (arr[i] === name)
							return true;
					}
					return false;
				};

				if (checkY) {
					sizeIsAffected = checkPropertyName(affectingPropsY, propertyName);
					if (!sizeIsAffected && !_isBorderBox)
						sizeIsAffected = checkPropertyName(affectingPropsYContentBox, propertyName);
				}
				if (checkX && !sizeIsAffected) {
					sizeIsAffected = checkPropertyName(affectingPropsX, propertyName);
					if (!sizeIsAffected && !_isBorderBox)
						sizeIsAffected = checkPropertyName(affectingPropsXContentBox, propertyName);
				}
				return sizeIsAffected;
			}

			/**
			 * Gets the element which is used to measure the content size.
			 * @returns {*} TextareaCover if target element is textarea else the ContentElement.
			 */
			function getContentMeasureElement() {
				return _isTextarea ? _textareaCoverElement[0] : _contentElement[0];
			}

			/**
			 * Updates the plugin and DOM to the current options.
			 * This method should only be called if a update is 100% required.
			 * @param hostSizeChanged True if this method was called due to a host size change.
			 * @param contentSizeChanged True if this method was called due to a content size change.
			 * @param force True if every property shall be updated and the cache shall be ignored.
			 */
			function update(hostSizeChanged, contentSizeChanged, force) {
				var now = compatibility.now();
				var swallow = _swallowUpdateLag > 0 && _initialized && (now - _lastUpdateTime) < _swallowUpdateLag && (!_heightAutoCache && !_widthAutoCache);
				clearTimeout(_swallowedUpdateTimeout);
				if (swallow) {
					_swallowedUpdateParams.h = hostSizeChanged;
					_swallowedUpdateParams.c = contentSizeChanged;
					_swallowedUpdateParams.f = force;
					_swallowedUpdateTimeout = setTimeout(update, _swallowUpdateLag);
				}

				//abort update due to:
				//swallowing
				//sleeping
				//host is hidden or has false display
				if (swallow || _isSleeping || (_initialized && !force && _hostElement.is(':hidden')) || _hostElement.css('display') === 'inline')
					return;

				_lastUpdateTime = now;
				hostSizeChanged = hostSizeChanged || _swallowedUpdateParams.h;
				contentSizeChanged = contentSizeChanged || _swallowedUpdateParams.c;
				force = force || _swallowedUpdateParams.f;
				_swallowedUpdateParams = {};

				hostSizeChanged = hostSizeChanged === undefined ? false : hostSizeChanged;
				contentSizeChanged = contentSizeChanged === undefined ? false : contentSizeChanged;
				force = force === undefined ? false : force;

				//if scrollbar styling is possible and native scrollbars arent overlaid the scrollbar styling will be applied which hides the native scrollbars completely.
				if (_nativeScrollbarStyling && !(_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y)) {
					//native scrollbars are hidden, so change the values to zero
					_nativeScrollbarSize.x = 0;
					_nativeScrollbarSize.y = 0;
				}
				else {
					//refresh native scrollbar size (in case of zoom)
					_nativeScrollbarSize = helper.extend(true, {}, globals.nativeScrollbarSize);
				}

				// Scrollbar padding is needed for firefox, because firefox hides scrollbar automatically if the size of the div is too small.
				// The calculation: [scrollbar size +3 *3]
				// (+3 because of possible decoration e.g. borders, margins etc., but only if native scrollbar is NOT a overlaid scrollbar)
				// (*3 because (1)increase / (2)decrease -button and (3)resize handle)
				_nativeScrollbarMinSize = {
					x: (_nativeScrollbarSize.x + (_nativeScrollbarIsOverlaid.x ? 0 : 3)) * 3,
					y: (_nativeScrollbarSize.y + (_nativeScrollbarIsOverlaid.y ? 0 : 3)) * 3
				};

				freezeResizeObserver(_sizeObserverElement);
				freezeResizeObserver(_sizeAutoObserverElement);

				//save current scroll offset
				var currScroll = {
					l: _viewportElement[_strScrollLeft](),
					t: _viewportElement[_strScrollTop]()
				};
				var currentPreparedOptionsCallbacks = _currentPreparedOptions.callbacks;
				var currentPreparedOptionsScrollbars = _currentPreparedOptions.scrollbars;
				var currentPreparedOptionsTextarea = _currentPreparedOptions.textarea;

				//callbacks
				var onUpdated = currentPreparedOptionsCallbacks.onUpdated;
				var onOverflowChanged = currentPreparedOptionsCallbacks.onOverflowChanged;
				var onOverflowAmountChanged = currentPreparedOptionsCallbacks.onOverflowAmountChanged;
				var onDirectionChanged = currentPreparedOptionsCallbacks.onDirectionChanged;
				var onContentSizeChanged = currentPreparedOptionsCallbacks.onContentSizeChanged;
				var onHostSizeChanged = currentPreparedOptionsCallbacks.onHostSizeChanged;

				//scrollbars visibility:
				var scrollbarsVisibility = currentPreparedOptionsScrollbars.visibility;
				var scrollbarsVisibilityChanged = checkCacheSingle(scrollbarsVisibility, _scrollbarsVisibilityCache, force);

				//scrollbars autoHide:
				var scrollbarsAutoHide = currentPreparedOptionsScrollbars.autoHide;
				var scrollbarsAutoHideChanged = checkCacheSingle(scrollbarsAutoHide, _scrollbarsAutoHideCache, force);

				//scrollbars click scrolling
				var scrollbarsClickScrolling = currentPreparedOptionsScrollbars.clickScrolling;
				var scrollbarsClickScrollingChanged = checkCacheSingle(scrollbarsClickScrolling, _scrollbarsClickScrollingCache, force);

				//scrollbars drag scrolling
				var scrollbarsDragScrolling = currentPreparedOptionsScrollbars.dragScrolling;
				var scrollbarsDragScrollingChanged = checkCacheSingle(scrollbarsDragScrolling, _scrollbarsDragScrollingCache, force);

				//className
				var className = _currentPreparedOptions.className;
				var classNameChanged = checkCacheSingle(className, _classNameCache, force);

				//resize
				var resize = _currentPreparedOptions.resize;
				var resizeChanged = checkCacheSingle(resize, _resizeCache, force) && !_isBody; //body can't be resized since the window itself acts as resize possibility.

				//textarea AutoWrapping
				var textareaAutoWrapping = _isTextarea ? _targetElement.attr('wrap') !== 'off' : false;
				var textareaAutoWrappingChanged = checkCacheSingle(textareaAutoWrapping, _textareaAutoWrappingCache, force);

				//paddingAbsolute
				var paddingAbsolute = _currentPreparedOptions.paddingAbsolute;
				var paddingAbsoluteChanged = checkCacheSingle(paddingAbsolute, _paddingAbsoluteCache, force);

				//clipAlways
				var clipAlways = _currentPreparedOptions.clipAlways;
				var clipAlwaysChanged = checkCacheSingle(clipAlways, _clipAlwaysCache, force);

				//sizeAutoCapable
				var sizeAutoCapable = _currentPreparedOptions.sizeAutoCapable && !_isBody; //body can never be size auto, because it shall be always as big as the viewport.
				var sizeAutoCapableChanged = checkCacheSingle(sizeAutoCapable, _sizeAutoCapableCache, force);

				//showNativeScrollbars
				var ignoreOverlayScrollbarHiding = _currentPreparedOptions.nativeScrollbarsOverlaid.showNativeScrollbars;
				var ignoreOverlayScrollbarHidingChanged = checkCacheSingle(ignoreOverlayScrollbarHiding, _ignoreOverlayScrollbarHidingCache);

				//autoUpdate
				var autoUpdate = _currentPreparedOptions.autoUpdate;
				var autoUpdateChanged = checkCacheSingle(autoUpdate, _autoUpdateCache);

				//overflowBehavior
				var overflowBehavior = _currentPreparedOptions.overflowBehavior;
				var overflowBehaviorChanged = checkCacheDouble(overflowBehavior, _overflowBehaviorCache, _strX, _strY, force);

				//dynWidth:
				var textareaDynWidth = currentPreparedOptionsTextarea.dynWidth;
				var textareaDynWidthChanged = checkCacheSingle(_textareaDynWidthCache, textareaDynHeight);

				//dynHeight:
				var textareaDynHeight = currentPreparedOptionsTextarea.dynHeight;
				var textareaDynHeightChanged = checkCacheSingle(_textareaDynHeightCache, textareaDynHeight);

				//scrollbars visibility
				_scrollbarsAutoHideNever = scrollbarsAutoHide === 'n';
				_scrollbarsAutoHideScroll = scrollbarsAutoHide === 's';
				_scrollbarsAutoHideLeave = scrollbarsAutoHide === 'l';

				//scrollbars autoHideDelay
				_scrollbarsAutoHideDelay = currentPreparedOptionsScrollbars.autoHideDelay;

				//scrollbars support touch
				_scrollbarsTouchSupport = currentPreparedOptionsScrollbars.touchSupport;

				//old className
				_oldClassName = _classNameCache;

				//resize
				_resizeNone = resize === 'n';
				_resizeBoth = resize === 'b';
				_resizeHorizontal = resize === 'h';
				_resizeVertical = resize === 'v';

				//normalizeRTL
				_normalizeRTLCache = _currentPreparedOptions.normalizeRTL;

				//ignore overlay scrollbar hiding
				ignoreOverlayScrollbarHiding = ignoreOverlayScrollbarHiding && (_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y);

				//refresh options cache
				_scrollbarsVisibilityCache = scrollbarsVisibility;
				_scrollbarsAutoHideCache = scrollbarsAutoHide;
				_scrollbarsClickScrollingCache = scrollbarsClickScrolling;
				_scrollbarsDragScrollingCache = scrollbarsDragScrolling;
				_classNameCache = className;
				_resizeCache = resize;
				_textareaAutoWrappingCache = textareaAutoWrapping;
				_paddingAbsoluteCache = paddingAbsolute;
				_clipAlwaysCache = clipAlways;
				_sizeAutoCapableCache = sizeAutoCapable;
				_ignoreOverlayScrollbarHidingCache = ignoreOverlayScrollbarHiding;
				_autoUpdateCache = autoUpdate;
				_overflowBehaviorCache = helper.extend(true, {}, overflowBehavior);
				_textareaDynWidthCache = textareaDynWidth;
				_textareaDynHeightCache = textareaDynHeight;

				//set correct class name to the host element
				if (classNameChanged) {
					_hostElement.removeClass(_oldClassName).removeClass(_classNameThemeNone);
					if (className !== undefined && className !== null && className.length > 0)
						_hostElement.addClass(className);
					else
						_hostElement.addClass(_classNameThemeNone);
				}

				//set correct auto Update
				if (autoUpdateChanged) {
					if (autoUpdate === true) {
						mutationObserversDisconnect();
						autoUpdateLoop.add(_base);
					}
					else if (autoUpdate === null) {
						if (_autoUpdateRecommended) {
							mutationObserversDisconnect();
							autoUpdateLoop.add(_base);
						}
						else {
							autoUpdateLoop.remove(_base);
							mutationObserversConnect();
						}
					}
					else {
						autoUpdateLoop.remove(_base);
						mutationObserversConnect();
					}
				}

				//activate or deactivate size auto capability
				if (sizeAutoCapableChanged) {
					if (sizeAutoCapable) {
						if (_contentGlueElement === undefined) {
							_contentGlueElement = helper(_strDivBegin + _classNameContentGlueElement + _strDivEnd);
							_paddingElement.before(_contentGlueElement);
						}
						if (_sizeAutoObserverAdded) {
							_sizeAutoObserverElement.show();
						}
						else {
							_sizeAutoObserverElement = helper(_strDivBegin + _classNameSizeAutoObserverElement + _strDivEnd);
							_contentGlueElement.before(_sizeAutoObserverElement);
							var oldSize = {w: -1, h: -1};
							addResizeObserver(_sizeAutoObserverElement, function () {
								var newSize = {
									w: _sizeAutoObserverElement[0].offsetWidth,
									h: _sizeAutoObserverElement[0].offsetHeight
								};
								if (checkCacheDouble(newSize, oldSize)) {
									if (_initialized && (_heightAutoCache && newSize.h > 0) || (_widthAutoCache && newSize.w > 0)) {
										update();
									}
									else if (_initialized && (!_heightAutoCache && newSize.h === 0) || (!_widthAutoCache && newSize.w === 0)) {
										update();
									}
								}
								oldSize = newSize;
							});
							_sizeAutoObserverAdded = true;
							//fix heightAuto detector bug if height is fixed but contentHeight is 0.
							//the probability this bug will ever happen is very very low, thats why its ok if we use calc which isn't supported in IE8.
							if (_cssCalc !== null)
								_sizeAutoObserverElement.css(_strHeight, _cssCalc + '(100% + 1px)');
						}
					}
					else {
						if (_sizeAutoObserverAdded)
							_sizeAutoObserverElement.hide();
					}
				}

				//if force, update all resizeObservers too
				if (force) {
					_sizeObserverElement.find('*').trigger(_strScroll);
					if (_sizeAutoObserverAdded)
						_sizeAutoObserverElement.find('*').trigger(_strScroll);
				}

				//detect direction:
				var cssDirection = _hostElement.css('direction');
				var cssDirectionChanged = checkCacheSingle(cssDirection, _cssDirectionCache, force);

				//detect box-sizing:
				var boxSizing = _hostElement.css('box-sizing');
				var boxSizingChanged = checkCacheSingle(boxSizing, _cssBoxSizingCache, force);

				//detect padding:
				var padding = {
					c: force,
					t: parseIntToZeroOrNumber(_hostElement.css(_strPaddingMinus + _strTop)),
					r: parseIntToZeroOrNumber(_hostElement.css(_strPaddingMinus + _strRight)),
					b: parseIntToZeroOrNumber(_hostElement.css(_strPaddingMinus + _strBottom)),
					l: parseIntToZeroOrNumber(_hostElement.css(_strPaddingMinus + _strLeft))
				};

				//width + height auto detecting var:
				var sizeAutoObserverElementBCRect;
				//exception occurs in IE8 sometimes (unknown exception)
				try {
					sizeAutoObserverElementBCRect = _sizeAutoObserverAdded ? _sizeAutoObserverElement[0].getBoundingClientRect() : null;
				} catch (ex) {
					return;
				}

				_isRTL = cssDirection === 'rtl';
				_isBorderBox = (boxSizing === 'border-box');
				var isRTLLeft = _isRTL ? _strLeft : _strRight;
				var isRTLRight = _isRTL ? _strRight : _strLeft;

				//detect width auto:
				var widthAutoResizeDetection = false;
				var widthAutoObserverDetection = (_sizeAutoObserverAdded && (_hostElement.css(_strFloat) !== 'none' /*|| _isTextarea */)) ? (Math.round(sizeAutoObserverElementBCRect.right - sizeAutoObserverElementBCRect.left) === 0) && (!paddingAbsolute ? (_hostElement[0].clientWidth - _paddingX) > 0 : true) : false;
				if (sizeAutoCapable && !widthAutoObserverDetection) {
					var tmpCurrHostWidth = _hostElement[0].offsetWidth;
					var tmpCurrContentGlueWidth = _contentGlueElement.css(_strWidth);
					_contentGlueElement.css(_strWidth, _strAuto);

					var tmpNewHostWidth = _hostElement[0].offsetWidth;
					_contentGlueElement.css(_strWidth, tmpCurrContentGlueWidth);
					widthAutoResizeDetection = tmpCurrHostWidth !== tmpNewHostWidth;
					if (!widthAutoResizeDetection) {
						_contentGlueElement.css(_strWidth, tmpCurrHostWidth + 1);
						tmpNewHostWidth = _hostElement[0].offsetWidth;
						_contentGlueElement.css(_strWidth, tmpCurrContentGlueWidth);
						widthAutoResizeDetection = tmpCurrHostWidth !== tmpNewHostWidth;
					}
				}
				var widthAuto = (widthAutoObserverDetection || widthAutoResizeDetection) && sizeAutoCapable;
				var widthAutoChanged = checkCacheSingle(widthAuto, _widthAutoCache, force);
				var wasWidthAuto = !widthAuto && _widthAutoCache;

				//detect height auto:
				var heightAuto = _sizeAutoObserverAdded ? (Math.round(sizeAutoObserverElementBCRect.bottom - sizeAutoObserverElementBCRect.top) === 0) /* && (!paddingAbsolute && (_msieVersion > 9 || !_msieVersion) ? true : true) */ : false;
				var heightAutoChanged = checkCacheSingle(heightAuto, _heightAutoCache, force);
				var wasHeightAuto = !heightAuto && _heightAutoCache;

				//detect border:
				//we need the border only if border box and auto size
				var strMinusWidth = '-' + _strWidth;
				var updateBorderX = (widthAuto && _isBorderBox) || !_isBorderBox;
				var updateBorderY = (heightAuto && _isBorderBox) || !_isBorderBox;
				var border = {
					c: force,
					t: updateBorderY ? parseIntToZeroOrNumber(_hostElement.css(_strBorderMinus + _strTop + strMinusWidth)) : 0,
					r: updateBorderX ? parseIntToZeroOrNumber(_hostElement.css(_strBorderMinus + _strRight + strMinusWidth)) : 0,
					b: updateBorderY ? parseIntToZeroOrNumber(_hostElement.css(_strBorderMinus + _strBottom + strMinusWidth)) : 0,
					l: updateBorderX ? parseIntToZeroOrNumber(_hostElement.css(_strBorderMinus + _strLeft + strMinusWidth)) : 0
				};

				//detect margin:
				var margin = {
					c: force,
					t: parseIntToZeroOrNumber(_hostElement.css(_strMarginMinus + _strTop)),
					r: parseIntToZeroOrNumber(_hostElement.css(_strMarginMinus + _strRight)),
					b: parseIntToZeroOrNumber(_hostElement.css(_strMarginMinus + _strBottom)),
					l: parseIntToZeroOrNumber(_hostElement.css(_strMarginMinus + _strLeft))
				};

				//detect css max width & height:
				var cssMaxValue = {
					h: String(_hostElement.css(_strMaxMinus + _strHeight)),
					w: String(_hostElement.css(_strMaxMinus + _strWidth))
				};

				//vars to apply correct css
				var contentElementCSS = {};
				var contentGlueElementCSS = {};

				//set info for padding
				_paddingX = padding.l + padding.r;
				_paddingY = padding.t + padding.b;
				padding.c = checkCacheTRBL(padding, _cssPaddingCache);

				//set info for border
				_borderX = border.l + border.r;
				_borderY = border.t + border.b;
				border.c = checkCacheTRBL(border, _cssBorderCache);

				//set info for margin
				_marginX = margin.l + margin.r;
				_marginY = margin.t + margin.b;
				margin.c = checkCacheTRBL(margin, _cssMarginCache);

				//set info for css max value
				cssMaxValue.ih = parseInt(cssMaxValue.h); //ih = integer height
				cssMaxValue.iw = parseInt(cssMaxValue.w); //iw = integer width
				cssMaxValue.ch = cssMaxValue.h.indexOf('px') > -1; //ch = correct height
				cssMaxValue.cw = cssMaxValue.w.indexOf('px') > -1; //cw = correct width
				cssMaxValue.c = checkCacheDouble(cssMaxValue, _cssMaxValueCache, force);

				//refresh cache
				_cssDirectionCache = cssDirection;
				_cssBoxSizingCache = boxSizing;
				_widthAutoCache = widthAuto;
				_heightAutoCache = heightAuto;
				_cssPaddingCache = padding;
				_cssBorderCache = border;
				_cssMarginCache = margin;
				_cssMaxValueCache = cssMaxValue;

				//IEFix direction changed
				if (cssDirectionChanged && _sizeAutoObserverAdded)
					_sizeAutoObserverElement.css(_strFloat, isRTLRight);

				//apply padding:
				if (padding.c || cssDirectionChanged || paddingAbsoluteChanged || widthAutoChanged || heightAutoChanged || boxSizingChanged || sizeAutoCapableChanged) {
					var paddingElementCSS = {};
					var textareaCSS = {};
					setTopRightBottomLeft(contentGlueElementCSS, _strMarginMinus, [-padding.t, -padding.r, -padding.b, -padding.l]);
					if (paddingAbsolute) {
						setTopRightBottomLeft(paddingElementCSS, _strEmpty, [padding.t, padding.r, padding.b, padding.l]);
						if (_isTextarea)
							setTopRightBottomLeft(textareaCSS, _strPaddingMinus);
						else
							setTopRightBottomLeft(contentElementCSS, _strPaddingMinus);
					}
					else {
						setTopRightBottomLeft(paddingElementCSS, _strEmpty);
						if (_isTextarea)
							setTopRightBottomLeft(textareaCSS, _strPaddingMinus, [padding.t, padding.r, padding.b, padding.l]);
						else
							setTopRightBottomLeft(contentElementCSS, _strPaddingMinus, [padding.t, padding.r, padding.b, padding.l]);
					}
					_paddingElement.css(paddingElementCSS);
					_targetElement.css(textareaCSS);
				}

				//viewport size is padding container because it never has padding, margin and a border.
				_viewportSize = {
					w: _paddingElement[0].offsetWidth,
					h: _paddingElement[0].offsetHeight
				};

				//update Textarea
				var textareaSize = _isTextarea ? textareaUpdate() : false;

				//fix height auto / width auto in cooperation with current padding & boxSizing behavior:
				if (heightAuto && (heightAutoChanged || paddingAbsoluteChanged || boxSizingChanged || cssMaxValue.c || padding.c || border.c)) {
					if (cssMaxValue.cw)
						contentElementCSS[_strMaxMinus + _strHeight] =
							(cssMaxValue.ch ? (cssMaxValue.ih - (paddingAbsolute ? _paddingY : 0) +
							(_isBorderBox ? -_borderY : _paddingY)) : _strEmpty);
					contentElementCSS[_strHeight] = _strAuto;
				} else if (heightAutoChanged || paddingAbsoluteChanged) {
					contentElementCSS[_strMaxMinus + _strHeight] = _strEmpty;
					contentElementCSS[_strHeight] = _strHundredPercent;
				}
				if (widthAuto && (widthAutoChanged || paddingAbsoluteChanged || boxSizingChanged || cssMaxValue.c || padding.c || border.c || cssDirectionChanged)) {
					if (cssMaxValue.cw)
						contentElementCSS[_strMaxMinus + _strWidth] =
							(cssMaxValue.cw ? (cssMaxValue.iw - (paddingAbsolute ? _paddingX : 0) +
							(_isBorderBox ? -_borderX : _paddingX)) +
							(_nativeScrollbarIsOverlaid.y /*&& _hasOverflowCache.y && widthAuto */ ? _overlayScrollbarDummySize.y : 0) : _strEmpty);
					contentElementCSS[_strWidth] = _strAuto;
					contentGlueElementCSS[_strMaxMinus + _strWidth] = _strHundredPercent; //IE Fix
				} else if (widthAutoChanged || paddingAbsoluteChanged) {
					contentElementCSS[_strMaxMinus + _strWidth] = _strEmpty;
					contentElementCSS[_strWidth] = _strHundredPercent;
					contentElementCSS[_strFloat] = _strEmpty;
					contentGlueElementCSS[_strMaxMinus + _strWidth] = _strEmpty; //IE Fix
				}
				if (widthAuto) {
					if (!cssMaxValue.cw)
						contentElementCSS[_strMaxMinus + _strWidth] = _strEmpty;
					contentGlueElementCSS[_strWidth] = _isTextarea && textareaDynWidth ? textareaSize.dw : _strAuto;

					contentElementCSS[_strWidth] = _strAuto;
					contentElementCSS[_strFloat] = isRTLRight;
				}
				if (heightAuto) {
					if (!cssMaxValue.ch)
						contentElementCSS[_strMaxMinus + _strHeight] = _strEmpty;
					contentGlueElementCSS[_strHeight] = _isTextarea && textareaDynHeight ? textareaSize.dh : _strAuto;
				}
				if (sizeAutoCapable)
					_contentGlueElement.css(contentGlueElementCSS);
				_contentElement.css(contentElementCSS);


				//CHECKPOINT HERE ~
				contentElementCSS = {};
				contentGlueElementCSS = {};
				_hasOverflowCache = _hasOverflowCache || {x: false, y: false};

				//if [content(host) client / scroll size, or target element direction, or content(host) max-sizes] changed, or force is true
				if (hostSizeChanged || contentSizeChanged || cssDirectionChanged || boxSizingChanged || paddingAbsoluteChanged || widthAutoChanged || widthAuto || heightAutoChanged || heightAuto || cssMaxValue.c || ignoreOverlayScrollbarHidingChanged || overflowBehaviorChanged || clipAlwaysChanged || resizeChanged || scrollbarsVisibilityChanged || textareaDynWidthChanged || textareaDynHeightChanged || textareaAutoWrappingChanged || paddingAbsoluteChanged || textareaDynWidthChanged || textareaDynHeightChanged || force) {
					var strOverflow = 'overflow';
					var strOverflowX = strOverflow + '-x';
					var strOverflowY = strOverflow + '-y';
					var strHidden = 'hidden';
					var strVisible = 'visible';

					//Reset the viewport (very important for natively overlaid scrollbars and zoom change
					var viewportElementResetCSS = {};
					var resetXTmp = _hasOverflowCache.y && _hideOverflowCache.ys && !ignoreOverlayScrollbarHiding ? (_nativeScrollbarIsOverlaid.y ? _viewportElement.css(isRTLLeft) : -_nativeScrollbarSize.y) : 0;
					var resetBottomTmp = _hasOverflowCache.x && _hideOverflowCache.xs && !ignoreOverlayScrollbarHiding ? (_nativeScrollbarIsOverlaid.x ? _viewportElement.css(_strBottom) : -_nativeScrollbarSize.x) : 0;
					setTopRightBottomLeft(viewportElementResetCSS, _strEmpty);
					_viewportElement.css(viewportElementResetCSS);

					//content element has to have overflow hidden, else element marginsss aren't calculated properly
					if (heightAuto && !_isTextarea) {
						_contentElement.css(strOverflow, strHidden);
						contentElementCSS[strOverflow] = _strEmpty
					}

					//measure several sizes:
					var contentMeasureElement = getContentMeasureElement();
					var clientSize = {
						w: contentMeasureElement.clientWidth,
						h: contentMeasureElement.clientHeight
					};
					var scrollSize = {
						w: contentMeasureElement.scrollWidth,
						h: contentMeasureElement.scrollHeight
					};
					var contentClientSize = {
						w: _isTextarea && textareaSize && !textareaDynWidth ? textareaSize.ow : widthAuto ? clientSize.w : scrollSize.w,
						h: _isTextarea && textareaSize && !textareaDynHeight ? textareaSize.oh : heightAuto ? clientSize.h : scrollSize.h
					};

					//apply the correct viewport style
					viewportElementResetCSS[_strBottom] = wasHeightAuto ? _strEmpty : resetBottomTmp;
					viewportElementResetCSS[isRTLLeft] = wasWidthAuto ? _strEmpty : resetXTmp;
					_viewportElement.css(viewportElementResetCSS);

					//measure and correct several sizes
					//has to be clientSize because offsetSize respect borders.
					var hostElement = _hostElement[0];
					var hostSize = {
						w: hostElement.clientWidth,
						h: hostElement.clientHeight
					};
					var contentGlueSize = {
						w: Math.max(contentClientSize.w + (paddingAbsolute ? _paddingX : 0), hostSize.w - _paddingX) - (textareaDynWidth ? (_isTextarea && widthAuto ? _marginX + (!_isBorderBox ? _paddingX + _borderX : 0) : 0) : 0),
						h: Math.max(contentClientSize.h + (paddingAbsolute ? _paddingY : 0), hostSize.h - _paddingY)
					};
					contentGlueSize.c = checkCacheDouble(contentGlueSize, _contentGlueSizeCache, force);
					_contentGlueSizeCache = contentGlueSize;

					//apply correct contentGlue size
					if (sizeAutoCapable) {
						//size contentGlue correctly to make sure the element has correct size if the sizing switches to auto
						if (contentGlueSize.c || (heightAuto || widthAuto)) {
							contentGlueElementCSS[_strWidth] = contentGlueSize.w;
							contentGlueElementCSS[_strHeight] = contentGlueSize.h;
						}

						var maxWidth = contentGlueElementCSS[_strWidth] + (_isBorderBox ? _borderX : -_paddingX);
						var maxHeight = contentGlueElementCSS[_strHeight] + (_isBorderBox ? _borderY : -_paddingX);
						var textareaCoverCSS = {};

						//make contentGlue size -1 if element is not auto sized, to make sure that a resize event happens when the element shrinks
						if (!widthAuto || (!widthAuto && border.c))
							contentGlueElementCSS[_strWidth] = hostSize.w - (_isBorderBox ? 0 : _paddingX + _borderX) - 1 - _marginX;
						if (!heightAuto || (!heightAuto && border.c))
							contentGlueElementCSS[_strHeight] = hostSize.h - (_isBorderBox ? 0 : _paddingY + _borderY) - 1 - _marginY;

						//if size is auto and host ist same size as max size, make content glue size +1 to make sure size changes will be detected
						if (cssMaxValue.cw && cssMaxValue.iw === maxWidth)
							contentGlueElementCSS[_strWidth] = maxWidth + (_isBorderBox ? 0 : _paddingX) + 1;
						if (cssMaxValue.ch && cssMaxValue.ih === maxHeight)
							contentGlueElementCSS[_strHeight] = maxHeight + (_isBorderBox ? 0 : _paddingY) + 1;

						//if size is auto and host ist smaller than size as min size, make content glue size -1 to make sure size changes will be detected (this is only needed if padding is 0)
						if (widthAuto && (clientSize.w < _viewportSize.w || _isTextarea && !textareaAutoWrapping) && _paddingX === 0) {
							if (_isTextarea)
								textareaCoverCSS[_strWidth] = parseIntToZeroOrNumber(_textareaCoverElement.css(_strWidth)) - 1;
							contentGlueElementCSS[_strWidth] -= 1;
						}
						if (heightAuto && (clientSize.h < _viewportSize.h || _isTextarea) && _paddingY === 0) {
							if (_isTextarea)
								textareaCoverCSS[_strHeight] = parseIntToZeroOrNumber(_textareaCoverElement.css(_strHeight)) - 1;
							contentGlueElementCSS[_strHeight] -= 1;
						}

						//make sure content glue size at least 1
						if (contentClientSize.h > 0) {
							contentGlueElementCSS[_strWidth] = Math.max(1, contentGlueElementCSS[_strWidth]);
							contentGlueElementCSS[_strHeight] = Math.max(1, contentGlueElementCSS[_strHeight]);
						}

						if (_isTextarea)
							_textareaCoverElement.css(textareaCoverCSS);
						_contentGlueElement.css(contentGlueElementCSS);
					}
					if (widthAuto)
						contentElementCSS[_strWidth] = _strHundredPercent;
					if (widthAuto && !_isBorderBox && !_mutationObserverConnected)
						contentElementCSS[_strFloat] = 'none';


					//apply and reset content style
					_contentElement.css(contentElementCSS);
					contentElementCSS = {};

					//measure again, but this time all correct sizes:
					var contentBCRect = contentMeasureElement.getBoundingClientRect();
					var contentScrollSize = {
						w: contentMeasureElement.scrollWidth,
						h: contentMeasureElement.scrollHeight
					};
					if (contentBCRect.width !== undefined) {
						var contentBCRectW = contentBCRect.width;
						var contentBCRectH = contentBCRect.height;
						var contentBCRectMargin = 0.001;
						contentScrollSize.w += parseIntToZeroOrNumber(contentBCRectW + contentBCRectMargin) - contentBCRectW;
						contentScrollSize.h += parseIntToZeroOrNumber(contentBCRectH + contentBCRectMargin) - contentBCRectH;
					}
					contentScrollSize.c = contentSizeChanged = checkCacheDouble(contentScrollSize, _contentScrollSizeCache, force);
					_contentScrollSizeCache = contentScrollSize;

					//has to be clientSize because offsetSize respect borders.
					hostSize = {
						w: hostElement.clientWidth,
						h: hostElement.clientHeight
					};
					hostSizeChanged = checkCacheDouble(hostSize, _hostSizeCache);
					_hostSizeCache = hostSize;

					var overflowBehaviorIsVS = {
						x: overflowBehavior.x === 'v-s',
						y: overflowBehavior.y === 'v-s'
					};
					var overflowBehaviorIsVH = {
						x: overflowBehavior.x === 'v-h',
						y: overflowBehavior.y === 'v-h'
					};
					var overflowBehaviorIsS = {
						x: overflowBehavior.x === 's',
						y: overflowBehavior.y === 's'
					};
					//var overflowBehaviorIsH = {
					//    x : overflowBehavior.x === 'h',
					//    y : overflowBehavior.y === 'h'
					//};
					var overflowAmount = {
						x: Math.max(0, contentScrollSize.w - hostSize.w + (paddingAbsolute ? _paddingX : 0)),
						y: Math.max(0, contentScrollSize.h - hostSize.h + (paddingAbsolute ? _paddingY : 0))
					};
					var hideOverflowForceTextarea = _isTextarea && (_viewportSize.w === 0 || _viewportSize.h === 0);
					if (hideOverflowForceTextarea) {
						overflowAmount.x = 0;
						overflowAmount.y = 0;
					}
					var hasOverflow = {
						x: overflowAmount.x > 0,
						y: overflowAmount.y > 0
					};
					//hideOverflow:
					//x || y : true === overflow is hidden by "overflow: scroll" OR "overflow: hidden"
					//xs || ys : true === overflow is hidden by "overflow: scroll"
					var hideOverflow = {x: hasOverflow.x, y: hasOverflow.y};
					if (overflowBehaviorIsVS.x || overflowBehaviorIsVH.x)
						hideOverflow.x = (hasOverflow.y && !overflowBehaviorIsVS.y && !overflowBehaviorIsVH.y);
					if (overflowBehaviorIsVS.y || overflowBehaviorIsVH.y)
						hideOverflow.y = (hasOverflow.x && !overflowBehaviorIsVS.x && !overflowBehaviorIsVH.x);
					hideOverflow.xs = hideOverflow.x ? (overflowBehaviorIsS.x || overflowBehaviorIsVS.x) : false;
					hideOverflow.ys = hideOverflow.y ? (overflowBehaviorIsS.y || overflowBehaviorIsVS.y) : false;

					var canScroll = {
						x: hasOverflow.x && hideOverflow.xs,
						y: hasOverflow.y && hideOverflow.ys
					};
					var previousOverflow = _overflowAmountCache;
					overflowAmount.c = checkCacheDouble(overflowAmount, _overflowAmountCache, _strX, _strY, force);
					_overflowAmountCache = overflowAmount;
					hasOverflow.c = checkCacheDouble(hasOverflow, _hasOverflowCache, _strX, _strY, force);
					_hasOverflowCache = hasOverflow;
					hideOverflow.c = checkCacheDouble(hideOverflow, _hideOverflowCache, _strX, _strY, force);
					_hideOverflowCache = hideOverflow;

					//if native scrollbar is overlay at x OR y axis, prepare DOM
					if (_nativeScrollbarIsOverlaid.x || _nativeScrollbarIsOverlaid.y) {
						var arrangeChanged = force;
						var arrangeContent = {};
						if (hasOverflow.x || hasOverflow.y) {
							arrangeContent.w = _nativeScrollbarIsOverlaid.y && hasOverflow.y ? contentScrollSize.w + _overlayScrollbarDummySize.y : _strEmpty;
							arrangeContent.h = _nativeScrollbarIsOverlaid.x && hasOverflow.x ? contentScrollSize.h + _overlayScrollbarDummySize.x : _strEmpty;

							arrangeChanged = checkCacheSingle(arrangeContent, _arrangeContentSizeCache, force);
							_arrangeContentSizeCache = arrangeContent;
						}

						if (hasOverflow.c || hideOverflow.c || contentScrollSize.c || cssDirectionChanged || widthAutoChanged || heightAutoChanged || widthAuto || heightAuto || ignoreOverlayScrollbarHidingChanged) {
							var borderDesign = 'px solid transparent';
							contentElementCSS[_strBorderMinus + isRTLRight] = _strEmpty;
							contentElementCSS[_strMarginMinus + isRTLRight] = _strEmpty;
							if (_nativeScrollbarIsOverlaid.x && hasOverflow.x && hideOverflow.xs) {
								if (heightAuto)
									contentElementCSS[_strMarginMinus + _strBottom] = ignoreOverlayScrollbarHiding ? _strEmpty : _overlayScrollbarDummySize.x;
								if (!heightAuto && !ignoreOverlayScrollbarHiding)
									contentElementCSS[_strBorderMinus + _strBottom] = _overlayScrollbarDummySize.x + borderDesign;
								else
									contentElementCSS[_strBorderMinus + _strBottom] = _strEmpty;
							}
							else {
								arrangeContent.h = _strEmpty;
								arrangeChanged = true;
								contentElementCSS[_strBorderMinus + _strBottom] = _strEmpty;
								contentElementCSS[_strMarginMinus + _strBottom] = _strEmpty;
							}
							if (_nativeScrollbarIsOverlaid.y && hasOverflow.y && hideOverflow.ys) {
								if (widthAuto)
									contentElementCSS[_strMarginMinus + isRTLLeft] = ignoreOverlayScrollbarHiding ? _strEmpty : _overlayScrollbarDummySize.y;
								if (/* !widthAuto && */ !ignoreOverlayScrollbarHiding)
									contentElementCSS[_strBorderMinus + isRTLLeft] = _overlayScrollbarDummySize.y + borderDesign;
								else
									contentElementCSS[_strBorderMinus + isRTLLeft] = _strEmpty;
							}
							else {
								arrangeContent.w = _strEmpty;
								arrangeChanged = true;
								contentElementCSS[_strBorderMinus + isRTLLeft] = _strEmpty;
								contentElementCSS[_strMarginMinus + isRTLLeft] = _strEmpty;
							}
						}
						if (ignoreOverlayScrollbarHiding) {
							arrangeContent.w = _strEmpty;
							arrangeContent.h = _strEmpty;
							arrangeChanged = true;
						}
						if (arrangeChanged) {
							var contentArrangeElementCSS = {};
							contentArrangeElementCSS[_strWidth] = hideOverflow.y ? arrangeContent.w : _strEmpty;
							contentArrangeElementCSS[_strHeight] = hideOverflow.x ? arrangeContent.h : _strEmpty;

							if (_contentArrangeElement === undefined) {
								_contentArrangeElement = helper(_strDivBegin + _classNameContentArrangeElement + _strDivEnd);
								_viewportElement.prepend(_contentArrangeElement);
							}
							_contentArrangeElement.css(contentArrangeElementCSS);
						}
						_contentElement.css(contentElementCSS);
					}

					var viewportElementCSS = {};
					var paddingElementCSS = {};
					if (hostSizeChanged || hasOverflow.c || hideOverflow.c || contentScrollSize.c || overflowBehaviorChanged || boxSizingChanged || ignoreOverlayScrollbarHidingChanged || cssDirectionChanged || clipAlwaysChanged || heightAutoChanged) {
						viewportElementCSS[isRTLRight] = _strEmpty;
						var resetScrollbarHidingX = function () {
							viewportElementCSS[_strBottom] = _strEmpty;
							_contentBorderSize.h = 0;
						};
						var resetScrollbarHidingY = function () {
							viewportElementCSS[isRTLLeft] = _strEmpty;
							_contentBorderSize.w = 0;
						};
						if (hasOverflow.x && hideOverflow.xs) {
							viewportElementCSS[strOverflowX] = _strScroll;
							if (!ignoreOverlayScrollbarHiding) {
								viewportElementCSS[_strBottom] = -(_nativeScrollbarIsOverlaid.x ? _overlayScrollbarDummySize.x : _nativeScrollbarSize.x);
								_contentBorderSize.h = _nativeScrollbarIsOverlaid.x ? _overlayScrollbarDummySize.y : 0;
							}
							else
								resetScrollbarHidingX();
						} else {
							viewportElementCSS[strOverflowX] = _strEmpty;
							resetScrollbarHidingX();
						}
						if (hasOverflow.y && hideOverflow.ys) {
							viewportElementCSS[strOverflowY] = _strScroll;
							if (!ignoreOverlayScrollbarHiding) {
								viewportElementCSS[isRTLLeft] = -(_nativeScrollbarIsOverlaid.y ? _overlayScrollbarDummySize.y : _nativeScrollbarSize.y);
								_contentBorderSize.w = _nativeScrollbarIsOverlaid.y ? _overlayScrollbarDummySize.x : 0;
							}
							else
								resetScrollbarHidingY();
						} else {
							viewportElementCSS[strOverflowY] = _strEmpty;
							resetScrollbarHidingY();
						}

						// if the scroll container is too small and if there is any overflow with not overlay scrollbar, make viewport element greater in size (Firefox hide Scrollbars fix)
						// because firefox starts hiding scrollbars on too small elements
						// with this behavior the overflow calculation may be incorrect or the scrollbars would appear suddenly
						// https://bugzilla.mozilla.org/show_bug.cgi?id=292284
						if ((_viewportSize.h < _nativeScrollbarMinSize.x || _viewportSize.w < _nativeScrollbarMinSize.y) && ((hasOverflow.x && hideOverflow.x && !_nativeScrollbarIsOverlaid.x) || (hasOverflow.y && hideOverflow.y && !_nativeScrollbarIsOverlaid.y))) {
							viewportElementCSS[_strPaddingMinus + _strTop] = _nativeScrollbarMinSize.x;
							viewportElementCSS[_strMarginMinus + _strTop] = -_nativeScrollbarMinSize.x;

							viewportElementCSS[_strPaddingMinus + isRTLRight] = _nativeScrollbarMinSize.y;
							viewportElementCSS[_strMarginMinus + isRTLRight] = -_nativeScrollbarMinSize.y;
						}
						else {
							viewportElementCSS[_strPaddingMinus + _strTop] = _strEmpty;
							viewportElementCSS[_strMarginMinus + _strTop] = _strEmpty;

							viewportElementCSS[_strPaddingMinus + isRTLRight] = _strEmpty;
							viewportElementCSS[_strMarginMinus + isRTLRight] = _strEmpty;
						}
						viewportElementCSS[_strPaddingMinus + isRTLLeft] = _strEmpty;
						viewportElementCSS[_strMarginMinus + isRTLLeft] = _strEmpty;

						//if there is any overflow (x OR y axis) and this overflow shall be hidden, make overflow hidden, else overflow visible
						if ((hasOverflow.x && hideOverflow.x) || (hasOverflow.y && hideOverflow.y) || hideOverflowForceTextarea) {
							//only hide if is Textarea
							if (_isTextarea && hideOverflowForceTextarea) {
								paddingElementCSS[strOverflowX] = strHidden;
								paddingElementCSS[strOverflowY] = strHidden;
							}
						}
						else {
							if (!clipAlways || (overflowBehaviorIsVH.x || overflowBehaviorIsVS.x || overflowBehaviorIsVH.y || overflowBehaviorIsVS.y)) {
								//only un-hide if Textarea
								if (_isTextarea) {
									paddingElementCSS[strOverflowX] = _strEmpty;
									paddingElementCSS[strOverflowY] = _strEmpty;
								}
								viewportElementCSS[strOverflowX] = strVisible;
								viewportElementCSS[strOverflowY] = strVisible;
							}
						}

						_paddingElement.css(paddingElementCSS);
						_viewportElement.css(viewportElementCSS);
						viewportElementCSS = {};

						//force soft redraw in webkit because without the scrollbars will may appear because DOM wont be redrawn under special conditions
						if ((hasOverflow.c || boxSizingChanged || widthAutoChanged || heightAutoChanged) && !(_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y)) {
							var element = _contentElement[0];
							var elementStyle = element.style;
							elementStyle.webkitTransform = 'scale(1)';
							elementStyle.display = 'run-in';
							var dump = element.offsetHeight;
							elementStyle.display = _strEmpty;
							elementStyle.webkitTransform = _strEmpty;
						}
						//force hard redraw in webkit if native overlaid scrollbars shall appear
						if (ignoreOverlayScrollbarHidingChanged && ignoreOverlayScrollbarHiding) {
							_hostElement.hide();
							var dump = _hostElement[0].offsetHeight;
							_hostElement.show();
						}
					}

					//change to direction RTL and width auto Bugfix in Webkit
					//without this fix, the DOM still thinks the scrollbar is LTR and thus the content is shifted to the left
					contentElementCSS = {};
					if (cssDirectionChanged || widthAutoChanged || heightAutoChanged) {
						if (_isRTL && widthAuto) {
							var floatTmp = _contentElement.css(_strFloat);
							var posLeftWithoutFloat = Math.round(_contentElement.css(_strFloat, _strEmpty).css(_strLeft, _strEmpty).position().left);
							_contentElement.css(_strFloat, floatTmp);
							var posLeftWithFloat = Math.round(_contentElement.position().left);

							if (posLeftWithoutFloat !== posLeftWithFloat)
								contentElementCSS[_strLeft] = posLeftWithoutFloat;
						}
						else {
							contentElementCSS[_strLeft] = _strEmpty;
						}
					}
					_contentElement.css(contentElementCSS);

					//scrollbars management:
					var scrollbarsVisibilityVisible = scrollbarsVisibility === 'v';
					var scrollbarsVisibilityHidden = scrollbarsVisibility === 'h';
					var scrollbarsVisibilityAuto = scrollbarsVisibility === 'a';
					var showScrollbarH = refreshScrollbarAppearance.bind(0, true, true, canScroll.x);
					var showScrollbarV = refreshScrollbarAppearance.bind(0, false, true, canScroll.y);
					var hideScrollbarH = refreshScrollbarAppearance.bind(0, true, false, canScroll.x);
					var hideScrollbarV = refreshScrollbarAppearance.bind(0, false, false, canScroll.y);

					//add or remove rtl class name for styling purposes
					if (cssDirectionChanged) {
						if (_isRTL)
							_hostElement.addClass(_classNameHostRTL);
						else
							_hostElement.removeClass(_classNameHostRTL);
					}

					//manage the resize feature (CSS3 resize "polyfill" for this plugin)
					if (_isBody)
						_hostElement.addClass(_classNameHostResizeDisabled);
					if (resizeChanged) {
						var addCornerEvents = function () {
							_scrollbarCornerElement.on(_strMouseTouchDownEvent, scrollbarCornerOnMouseDown);
						};
						var removeCornerEvents = function () {
							_scrollbarCornerElement.off(_strMouseTouchDownEvent, scrollbarCornerOnMouseDown);
						};
						if (_resizeNone) {
							_hostElement.addClass(_classNameHostResizeDisabled);
							_scrollbarCornerElement.removeClass(_classNameScrollbarCornerResize)
								.removeClass(_classNameScrollbarCornerResizeB)
								.removeClass(_classNameScrollbarCornerResizeH)
								.removeClass(_classNameScrollbarCornerResizeV);

							removeCornerEvents();
						}
						else {
							_hostElement.removeClass(_classNameHostResizeDisabled);
							_scrollbarCornerElement.addClass(_classNameScrollbarCornerResize);
							if (_resizeBoth)
								_scrollbarCornerElement.addClass(_classNameScrollbarCornerResizeB);
							else if (_resizeHorizontal)
								_scrollbarCornerElement.addClass(_classNameScrollbarCornerResizeH);
							else if (_resizeVertical)
								_scrollbarCornerElement.addClass(_classNameScrollbarCornerResizeV);

							removeCornerEvents();
							addCornerEvents();
						}
					}

					//manage the scrollbars general visibility + the scrollbar interactivity (unusable class name)
					if (scrollbarsVisibilityChanged || overflowBehaviorChanged || hideOverflow.c || hasOverflow.c || ignoreOverlayScrollbarHidingChanged) {
						if (ignoreOverlayScrollbarHiding) {
							if (ignoreOverlayScrollbarHidingChanged) {
								_hostElement.removeClass(_classNameHostScrolling);
								if (ignoreOverlayScrollbarHiding) {
									hideScrollbarH();
									hideScrollbarV();
								}
							}
						}
						else if (scrollbarsVisibilityAuto) {
							if (canScroll.x)
								showScrollbarH();
							else
								hideScrollbarH();

							if (canScroll.y)
								showScrollbarV();
							else
								hideScrollbarV();
						}
						else if (scrollbarsVisibilityVisible) {
							showScrollbarH();
							showScrollbarV();
						}
						else if (scrollbarsVisibilityHidden) {
							hideScrollbarH();
							hideScrollbarV();
						}
					}

					//manage the scrollbars auto hide feature (auto hide them after specific actions)
					if (scrollbarsAutoHideChanged || ignoreOverlayScrollbarHidingChanged) {
						var strMouseEnter = 'mouseenter';
						var strMouseLeave = 'mouseleave';
						var addLeaveEvents = function () {
							if (_supportPassiveEvents) {
								addPassiveEventListener(_hostElement, strMouseEnter, hostOnMouseEnter);
								addPassiveEventListener(_hostElement, strMouseLeave, hostOnMouseLeave);
							}
							else {
								_hostElement.on(strMouseEnter, hostOnMouseEnter);
								_hostElement.on(strMouseLeave, hostOnMouseLeave);
							}
						};
						var removeLeaveEvents = function () {
							if (_supportPassiveEvents) {
								removePassiveEventListener(_hostElement, strMouseEnter, hostOnMouseEnter);
								removePassiveEventListener(_hostElement, strMouseLeave, hostOnMouseLeave);
							}
							else {
								_hostElement.off(strMouseEnter, hostOnMouseEnter);
								_hostElement.off(strMouseLeave, hostOnMouseLeave);
							}
						};
						if (_scrollbarsAutoHideLeave) {
							removeLeaveEvents();
							addLeaveEvents();
						}
						else {
							removeLeaveEvents();
						}

						if (_scrollbarsAutoHideNever)
							refreshScrollbarsAutoHide(true);
						else
							refreshScrollbarsAutoHide(false, true);
					}

					//manage scrollbars handle length and offset
					if (hostSizeChanged || overflowAmount.c || heightAutoChanged || widthAutoChanged || resizeChanged || boxSizingChanged || paddingAbsoluteChanged || ignoreOverlayScrollbarHidingChanged || cssDirectionChanged) {
						refreshScrollbarHandleLength(true);
						refreshScrollbarHandleOffset(true, currScroll.l);
						refreshScrollbarHandleLength(false);
						refreshScrollbarHandleOffset(false, currScroll.t);
					}

					//manage interactivity
					if (scrollbarsClickScrollingChanged)
						refreshScrollbarsInteractive(true, scrollbarsClickScrolling);
					if (scrollbarsDragScrollingChanged)
						refreshScrollbarsInteractive(false, scrollbarsDragScrolling);

					//manage class name which indicates scrollable overflow
					if (hideOverflow.x || hideOverflow.y)
						_hostElement.addClass(_classNameHostOverflow);
					else
						_hostElement.removeClass(_classNameHostOverflow);
					if (hideOverflow.x)
						_hostElement.addClass(_classNameHostOverflowX);
					else
						_hostElement.removeClass(_classNameHostOverflowX);
					if (hideOverflow.y)
						_hostElement.addClass(_classNameHostOverflowY);
					else
						_hostElement.removeClass(_classNameHostOverflowY);

					//handle scroll
					if (_isTextarea && contentSizeChanged) {
						var textareaInfo = getTextareaInfo();
						if (textareaInfo !== undefined) {
							var textareaRowsChanged = _textareaInfoCache === undefined ? true : textareaInfo.rows !== _textareaInfoCache.rows;
							var widestRow = textareaInfo.wRow;
							var cursorRow = textareaInfo.cursorRow;
							var cursorCol = textareaInfo.cursorCol;
							var lastRow = textareaInfo.rows;
							var lastCol = textareaInfo.cols;
							var cursorPos = textareaInfo.pos;
							var cursorMax = textareaInfo.max;
							var cursorIsLastPosition = (cursorMax === cursorPos && _textareaHasFocus);
							var doScroll = {
								x: (!textareaAutoWrapping && (cursorCol === lastCol && cursorRow === widestRow)) ? _overflowAmountCache.x : -1,
								y: (textareaAutoWrapping ? cursorIsLastPosition || textareaRowsChanged && (previousOverflow !== undefined ? (currScroll.t === previousOverflow.y) : false) : (cursorIsLastPosition || textareaRowsChanged) && cursorRow === lastRow) ? _overflowAmountCache.y : -1
							};
							var doScrollX = doScroll.x > -1;
							var doScrollY = doScroll.y > -1;

							if (doScrollX || doScrollY) {
								if (doScrollY)
									_viewportElement[_strScrollTop](doScroll.y);
								if (doScrollX) {
									if (_isRTL && _normalizeRTLCache && _rtlScrollBehavior.i)
										_viewportElement[_strScrollLeft](0); //if inverted, scroll to 0 -> normalized this means to max scroll offset.
									else
										_viewportElement[_strScrollLeft](doScroll.x);
								}
							}
						}
						_textareaInfoCache = textareaInfo;
					}
					else if (!_isTextarea) {
						if (_isRTL && _rtlScrollBehavior.i && _nativeScrollbarIsOverlaid.y && hasOverflow.x && _normalizeRTLCache)
							currScroll.l += _contentBorderSize.w;
						_viewportElement[_strScrollLeft](currScroll.l);
						_viewportElement[_strScrollTop](currScroll.t);
					}

					if (cssDirectionChanged && helper.isFunction(onDirectionChanged)) {
						callCallback(onDirectionChanged, {
							isRTL: _isRTL,
							dir: cssDirection
						});
					}
					if (hostSizeChanged && helper.isFunction(onHostSizeChanged)) {
						callCallback(onHostSizeChanged, {
							width: _hostSizeCache.w,
							height: _hostSizeCache.h
						});
					}
					if (contentSizeChanged && helper.isFunction(onContentSizeChanged)) {
						callCallback(onContentSizeChanged, {
							width: _contentScrollSizeCache.w,
							height: _contentScrollSizeCache.h
						});
					}
					if ((hasOverflow.c || hideOverflow.c) && helper.isFunction(onOverflowChanged)) {
						callCallback(onOverflowChanged, {
							x: hasOverflow.x,
							y: hasOverflow.y,
							xScrollable: hideOverflow.xs,
							yScrollable: hideOverflow.ys,
							clipped: hideOverflow.x || hideOverflow.y
						});
					}
					if (overflowAmount.c && helper.isFunction(onOverflowAmountChanged)) {
						callCallback(onOverflowAmountChanged, {
							x: overflowAmount.x,
							y: overflowAmount.y
						});
					}
				}

				//fix body min size
				if (_isBody && (hasOverflow.c || _bodyMinSizeCache.c)) {
					//its possible that no min size was measured until now, because the content arrange element was just added now, in this case, measure now the min size.
					if (!_bodyMinSizeCache.f)
						bodyMinSizeChanged();
					if (_nativeScrollbarIsOverlaid.y && hasOverflow.x)
						_contentElement.css(_strMinMinus + _strWidth, _bodyMinSizeCache.w + _overlayScrollbarDummySize.y);
					if (_nativeScrollbarIsOverlaid.x && hasOverflow.y)
						_contentElement.css(_strMinMinus + _strHeight, _bodyMinSizeCache.h + _overlayScrollbarDummySize.x);
					_bodyMinSizeCache.c = false;
				}

				unfreezeResizeObserver(_sizeObserverElement);
				unfreezeResizeObserver(_sizeAutoObserverElement);

				if (helper.isFunction(onUpdated)) {
					callCallback(onUpdated, {
						forced: force
					});
				}
			}

			/**
			 * Puts the instance to sleep. It wont respond to any changes in the DOM and won't update. Scrollbar Interactivity is also disabled as well as the resize handle.
			 * This behavior can be reset by calling the update method.
			 */
			_base.sleep = function () {
				_isSleeping = true;
			};

			/**
			 * Updates the plugin and DOM to the current options.
			 * This method should only be called if a update is 100% required.
			 * @param force True if every property shall be updated and the cache shall be ignored.
			 * !INTERNAL USAGE! : force can be a string "auto" or "zoom" too
			 * if this is the case then before a real update the content size and host element attributes gets checked, and if they changed only then the update method will be called.
			 */
			_base.update = function (force) {
				if (force === _strAuto) {
					var attrsChanged = meaningfulAttrsChanged();
					var contentSizeC = updateAutoContentSizeChanged();
					if (attrsChanged || contentSizeC)
						update(false, contentSizeC);
				}
				else if (force === 'zoom') {
					update(true, true);
				}
				else {
					force = _isSleeping || force;
					_isSleeping = false;
					update(false, false, force);
				}
			};

			/**
			 Gets or sets the current options. The update method will be called automatically if new options were set.
			 * @param newOptions If new options are given, then the new options will be set, if new options aren't given (undefined or a not a plain object) then the current options will be returned.
			 * @param value If new options is a property path string, then this value will be used to set the option to which the property path string leads.
			 * @returns {*}
			 */
			_base.options = function (newOptions, value) {
				//return current options if newOptions are undefined or empty
				if (helper.isEmptyObject(newOptions) || !helper.isPlainObject(newOptions)) {
					if (helper.type(newOptions) === 'string') {
						if (arguments.length >= 2) {
							var option = {};
							byPropertyPath.set(option, newOptions, value, true);
							setOptions(option);
							update();
							return;
						}
						else
							return byPropertyPath.get(_currentOptions, newOptions);
					}
					else
						return _currentOptions;
				}
				setOptions(newOptions);
				var isSleepingTmp = _isSleeping || false;
				_isSleeping = false;
				update();
				_isSleeping = isSleepingTmp;
			};

			/**
			 * Restore the DOM, disconnects all observers, remove all resize observers and destroy all methods.
			 */
			_base.destroy = function () {
				_destroyed = true;
				autoUpdateLoop.remove(_base);
				mutationObserversDisconnect();
				removeResizeObserver(_sizeObserverElement);
				if (_sizeAutoObserverAdded)
					removeResizeObserver(_sizeAutoObserverElement);

				_sizeObserverElement.remove();
				if (_contentGlueElement !== undefined)
					_contentGlueElement.remove();
				if (_contentArrangeElement !== undefined)
					_contentArrangeElement.remove();
				if (_sizeAutoObserverAdded)
					_sizeAutoObserverElement.remove();

				if (_supportPassiveEvents) {
					removePassiveEventListener(_hostElement, 'mouseenter', hostOnMouseEnter);
					removePassiveEventListener(_hostElement, 'mouseleave', hostOnMouseLeave);
				}
				else {
					_hostElement.off('mouseenter', hostOnMouseEnter);
					_hostElement.off('mouseleave', hostOnMouseLeave);
				}

				_scrollbarHorizontalElement.remove();
				_scrollbarVerticalElement.remove();
				if(_scrollbarCornerElement)
					_scrollbarCornerElement.remove();
				if (!_resizeNone)
					scrollbarCornerOnResized();

				_contentElement.contents().unwrap().unwrap().unwrap();

				if (_isBody)
					_htmlElement.removeClass(_classNameHTMLElement);


				if (_isTextarea) {
					_targetElement.off(_strScroll, textareaOnScroll);
					_targetElement.off('drop', textareaOnDrop);
					_targetElement.off('focus', textareaOnFocus);
					_targetElement.off('focusout', textareaOnFocusOut);
					if (_msieVersion > 9 || !_autoUpdateRecommended) {
						_targetElement.off('input', textareaOnInput);
					}
					else {
						_targetElement.off(_strKeyDownEvent, textareaOnKeyDown);
						_targetElement.off(_strKeyUpEvent, textareaOnKeyUp);
					}
					_textareaCoverElement.remove();
					_targetElement.removeClass(_classNameTextareaElement)
						.removeClass(_classNameTextInherit);
					_targetElement.unwrap()
						.removeAttr('style');
					_hostElement.remove();
				}
				else {
					_targetElement.removeClass(_classNameHostElement);
					_hostElement.removeClass(_classNameHostElement)
						.removeClass(_classNameHostResizeDisabled)
						.removeClass(_classNameHostRTL)
						.removeClass(_classNameHostScrollbarHorizontalHidden)
						.removeClass(_classNameHostScrollbarVerticalHidden)
						.removeClass(_classNameHostTransition)
						.removeClass(_classNameHostScrolling)
						.removeClass(_classNameHostOverflow)
						.removeClass(_classNameHostOverflowX)
						.removeClass(_classNameHostOverflowY)
						.removeClass(_classNameThemeNone)
						.removeClass(_classNameCache);
				}

				instances.rem(pluginTargetElement);

				var onDestroyed = _currentPreparedOptions.callbacks.onDestroyed;
				if (helper.isFunction(onDestroyed))
					callCallback(onDestroyed);

				for (var property in _base)
					delete _base[property];
				_base = undefined;
			};

			/**
			 * Scrolls to a given position or element.
			 * @param coordinates
			 * 1. Can be "coordinates" which looks like:
			 *    { x : ?, y : ? } OR          Object with x and y properties
			 *    { left : ?, top : ? } OR     Object with left and top properties
			 *    { l : ?, t : ? } OR          Object with l and t properties
			 *    [ ?, ? ] OR                  Array where the first two element are the coordinates (first is x, second is y)
			 *    ?                            A single value which stays for both axis
			 *    A value can be a number, a string or a calculation.
			 *
			 *    Operators:
			 *    [NONE]  The current scroll will be overwritten by the value.
			 *    '+='    The value will be added to the current scroll offset
			 *    '-='    The value will be subtracted from the current scroll offset
			 *    '*='    The current scroll wil be multiplicated by the value.
			 *    '/='    The current scroll wil be divided by the value.
			 *
			 *    Units:
			 *    [NONE]  The value is the final scroll amount.                   final = (value * 1)
			 *    'px'    Same as none
			 *    '%'     The value is dependent on the current scroll value.     final = ((currentScrollValue / 100) * value)
			 *    'vw'    The value is multiplicated by the viewport width.       final = (value * viewportWidth)
			 *    'vh'    The value is multiplicated by the viewport height.      final = (value * viewportHeight)
			 *
			 *    example final values:
			 *    200, '200px', '50%', '1vw', '1vh', '+=200', '/=1vw', '*=2px', '-=5vh', '+=33%', '+= 50% - 2px', '-= 1vw - 50%'
			 *
			 * 2. Can be a HTML or jQuery element:
			 *    The final scroll offset is the offset (without margin) of the given HTML / jQuery element.
			 *
			 * 3. Can be a object with a HTML or jQuery element with additional settings:
			 *    {
         *      el : [HTMLElement, jQuery element],     MUST be defined, else this object isn't valid.
         *      axis : [string],                        Default value is 'xy'.
         *      block : [string],                    Default value is 'begin'.
         *      margin : [number, array, boolean]       Default value is false.
         *    }
			 *
			 *    Possible axis settings are:
			 *    'x'   Scrolls only the x axis.
			 *    'y'   Scrolls only the y axis.
			 *    'xy'  Scrolls both axis.
			 *    'yx'  Same as 'xy'
			 *
			 *    Possible block settings are:
			 *    'begin'   Both axis shall be docked to the "begin" edge. - The element will be docked to the top and left edge of the viewport.
			 *    'end'     Both axis shall be docked to the "end" edge. - The element will be docked to the bottom and right edge of the viewport. (If direction is RTL to the bottom and left edge.)
			 *    [ string, string ] Specify Begin or End for each axis individually.
			 *
			 *    Possible margin settings are: -- The actual margin of the element wont be affect, this option affects only the final scroll offset.
			 *    true                                              The true margin of the element will be used.
			 *    false                                             No margin will be used.
			 *    [NUMBER]                                          The margin will be used for all edges.
			 *    [ [NUMBER], [NUMBER] ]                            The first margin number will be used for the margin of the X axis egdes (left and right) and the second number will be used for the Y axis edges (top and bottom).
			 *    [ [NUMBER], [NUMBER],[NUMBER], [NUMBER] ]         Each edge gets its own margin value, the first value stays for the top margin, the second for the right margin, the third for the bottom margin and the forth for the left margin.
			 *
			 * @param duration The duration of the scroll animation, OR a jQuery animation configuration object.
			 * @param easing The animation easing.
			 * @param complete The animation complete callback.
			 * @returns {
         * {
         *    x: {position: *, ratio: (number|*), max: (number|*), handleOffset: (number|*), handleLength: *, handleLengthRatio: (number|*), trackLength: *, isRTL: *, isRTLNormalized: *},
         *    y: {position: *, ratio: (number|*), max: (number|*), handleOffset: (number|*), handleLength: *, handleLengthRatio: (number|*), trackLength: *}
         * }
         * }
			 */
			_base.scroll = function (coordinates, duration, easing, complete) {
				if (arguments.length === 0 || coordinates === undefined) {
					var infoX = _scrollHorizontalInfo;
					var infoY = _scrollVerticalInfo;
					var normalizeInvert = _normalizeRTLCache && _isRTL && _rtlScrollBehavior.i;
					var normalizeNegate = _normalizeRTLCache && _isRTL && _rtlScrollBehavior.n;
					var scrollX = infoX.cs;
					var scrollXRatio = infoX.csr;
					var maxScrollX = infoX.ms;
					scrollXRatio = normalizeInvert ? 1 - scrollXRatio : scrollXRatio;
					scrollX = normalizeInvert ? maxScrollX - scrollX : scrollX;
					scrollX *= normalizeNegate ? -1 : 1;
					maxScrollX *= normalizeNegate ? -1 : 1;
					return {
						x: {
							position: scrollX,
							ratio: scrollXRatio,
							max: maxScrollX,
							handleOffset: infoX.ho,
							handleLength: infoX.hl,
							handleLengthRatio: infoX.hlr,
							trackLength: infoX.tl,
							isRTL: _isRTL,
							isRTLNormalized: _normalizeRTLCache
						},
						y: {
							position: infoY.cs,
							ratio: infoY.csr,
							max: infoY.ms,
							handleOffset: infoY.ho,
							handleLength: infoY.hl,
							handleLengthRatio: infoY.hlr,
							trackLength: infoY.tl
						}
					};
				}

				var coordinatesXAxisProps = [_strX, _strLeft, 'l'];
				var coordinatesYAxisProps = [_strY, _strTop, 't'];
				var coordinatesOperators = ['+=', '-=', '*=', '/='];
				var i;
				var finalScroll = { };
				var durationIsObject = helper.type(duration) === 'object';
				var strEnd = 'end';
				var strBegin = 'begin';
				var elementObjSettings = {
					axis: 'xy',
					block: [strBegin, strBegin],
					margin: [0, 0, 0, 0]
				};
				var elementObjSettingsAxisValues = [_strX, _strY, 'xy', 'yx'];
				var elementObjSettingsBlockValues = [strBegin, strEnd];
				var coordinatesIsElementObj = coordinates.hasOwnProperty('el');
				var possibleElement = coordinatesIsElementObj ? coordinates.el : coordinates;
				var possibleElementIsJQuery = possibleElement instanceof helper;
				var possibleElementIsHTMLElement = possibleElementIsJQuery ? false : isHTMLElement(possibleElement);
				var checkSettingsStringValue = function (currValue, allowedValues) {
					for (i = 0; i < allowedValues.length; i++) {
						if (currValue === allowedValues[i])
							return true;
					}
					return false;
				};
				var getRawScroll = function (coordinates) {
					var rawScroll = {};
					if (helper.type(coordinates) === 'array' && coordinates.length > 0) {
						rawScroll.x = coordinates[0];
						rawScroll.y = coordinates[1];
					}
					else if (helper.type(coordinates) === _strString || helper.type(coordinates) === _strNumber) {
						rawScroll.x = coordinates;
						rawScroll.y = coordinates;
					}
					else if (helper.type(coordinates) === 'object') {
						coordinates = helper.extend({}, coordinates);
						i = 0;
						for (var key in coordinates) {
							if (coordinates.hasOwnProperty(key)) {
								if (i > 2)
									delete coordinates[key];
								i++;
							}
						}
						var getRawScrollValue = function (isX) {
							var coordinateProps = isX ? coordinatesXAxisProps : coordinatesYAxisProps;
							for (i = 0; i < coordinateProps.length; i++) {
								if (coordinateProps[i] in coordinates) {
									return coordinates[coordinateProps[i]];
								}
							}
						};
						rawScroll.x = getRawScrollValue(true);
						rawScroll.y = getRawScrollValue(false);
					}
					return rawScroll;
				};
				var getFinalScroll = function (isX, rawScroll) {
					var operator;
					var amount;
					var scrollInfo = isX ? _scrollHorizontalInfo : _scrollVerticalInfo;
					var currScroll = scrollInfo.cs;
					var maxScroll = scrollInfo.ms;
					var mult = ' * ';
					var finalValue;
					var isRTLisX = _isRTL && isX;
					var normalizeShortcuts = isRTLisX && _rtlScrollBehavior.n && !_normalizeRTLCache;

					if (helper.type(rawScroll) === _strString) {
						//check operator
						if (rawScroll.length > 2) {
							var possibleOperator = rawScroll.substr(0, 2);
							for (i = 0; i < coordinatesOperators.length; i++) {
								if (possibleOperator === coordinatesOperators[i]) {
									operator = coordinatesOperators[i];
									break;
								}
							}
						}

						//calculate units and shortcuts
						rawScroll = operator !== undefined ? rawScroll.substr(2) : rawScroll;
						rawScroll = rawScroll.replace(/min/g, 0); //'min' = 0%
						rawScroll = rawScroll.replace(/</g, 0);   //'<'   = 0%
						rawScroll = rawScroll.replace(/max/g, (normalizeShortcuts ? '-' : _strEmpty) + _strHundredPercent);    //'max' = 100%
						rawScroll = rawScroll.replace(/>/g, (normalizeShortcuts ? '-' : _strEmpty) + _strHundredPercent);      //'>'   = 100%
						rawScroll = rawScroll.replace(/px/g, _strEmpty);
						rawScroll = rawScroll.replace(/%/g, mult + (maxScroll * (isRTLisX && _rtlScrollBehavior.n ? -1 : 1) / 100.0));
						rawScroll = rawScroll.replace(/vw/g, mult + _viewportSize.w);
						rawScroll = rawScroll.replace(/vh/g, mult + _viewportSize.h);
						amount = window.parseInt(window.parseFloat(window.eval(rawScroll)).toFixed());
					}
					else if (helper.type(rawScroll) === _strNumber) {
						amount = rawScroll;
					}

					if (!isNaN(amount) && amount !== undefined && helper.type(amount) === _strNumber) {
						var normalizeIsRTLisX = _normalizeRTLCache && isRTLisX;
						var operatorCurrScroll = currScroll * (normalizeIsRTLisX && _rtlScrollBehavior.n ? -1 : 1);
						var invert = normalizeIsRTLisX && _rtlScrollBehavior.i;
						var negate = normalizeIsRTLisX && _rtlScrollBehavior.n;
						operatorCurrScroll = invert ? (maxScroll - operatorCurrScroll) : operatorCurrScroll;
						switch (operator) {
							case '+=':
								finalValue = operatorCurrScroll + amount;
								break;
							case '-=':
								finalValue = operatorCurrScroll - amount;
								break;
							case '*=':
								finalValue = operatorCurrScroll * amount;
								break;
							case '/=':
								finalValue = operatorCurrScroll / amount;
								break;
							default:
								finalValue = amount;
								break;
						}
						if (invert)
							finalValue = maxScroll - finalValue;
						if (negate)
							finalValue *= -1;

						if (isRTLisX && _rtlScrollBehavior.n) {
							finalValue = Math.max(maxScroll, finalValue);
							finalValue = Math.min(0, finalValue);
						}
						else {
							finalValue = Math.min(maxScroll, finalValue);
							finalValue = Math.max(0, finalValue);
						}
						if (finalValue === currScroll)
							finalValue = undefined;
					}
					return finalValue;
				};

				if (possibleElementIsJQuery || possibleElementIsHTMLElement) {
					var finalElement = possibleElementIsJQuery ? possibleElement : helper(possibleElement);
					if (finalElement.length === 0)
						return;

					//get settings
					if (coordinatesIsElementObj) {
						var valid;
						var axis = coordinates.axis;
						var block = coordinates.block;
						var blockType = helper.type(block);
						var blockLength;
						var margin = coordinates.margin;
						var marginType = helper.type(margin);
						var marginLength;

						//block can be [string, or array of two strings]
						if (blockType === _strString)
							block = [block, block];
						else if (blockType === 'array') {
							blockLength = block.length;
							if (blockLength > 2 || blockLength < 1)
								block = undefined;
							else {
								valid = true;
								if (blockLength === 1)
									block[1] = strBegin;
								for (i = 0; i < blockLength; i++) {
									var item = block[i];
									if (helper.type(item) !== _strString || !checkSettingsStringValue(item, elementObjSettingsBlockValues)) {
										valid = false;
										break;
									}
								}
								if (!valid)
									block = undefined;
							}
						}
						else
							block = undefined;

						//margin can be [ true, false, number, array of 2 numbers, array of 4 numbers ]
						if (marginType === _strNumber)
							margin = [margin, margin, margin, margin];
						else if (marginType === 'boolean') {
							if (margin) {
								margin = [
									parseIntToZeroOrNumber(finalElement.css(_strMarginMinus + _strTop)),
									parseIntToZeroOrNumber(finalElement.css(_strMarginMinus + _strRight)),
									parseIntToZeroOrNumber(finalElement.css(_strMarginMinus + _strBottom)),
									parseIntToZeroOrNumber(finalElement.css(_strMarginMinus + _strLeft))
								];
							}
							else
								margin = [0, 0, 0, 0];
						}
						else if (marginType === 'array') {
							marginLength = margin.length;
							if (marginLength !== 2 && marginLength !== 4)
								margin = undefined;
							else {
								valid = true;
								for (i = 0; i < marginLength; i++) {
									if (helper.type(margin[i]) !== _strNumber) {
										valid = false;
										break;
									}
								}
								if (valid) {
									if (marginLength === 2)
										margin = [margin[0], margin[1], margin[0], margin[1]];
								}
								else
									margin = undefined;
							}
						}
						else
							margin = undefined;

						elementObjSettings.axis = checkSettingsStringValue(axis, elementObjSettingsAxisValues) ? axis : elementObjSettings.axis;
						elementObjSettings.block = block || elementObjSettings.block;
						elementObjSettings.margin = margin || elementObjSettings.margin;
					}

					//get coordinates
					var elementOffset = finalElement.offset();
					var viewportOffset = _paddingElement.offset(); // use padding element instead of viewport element because padding element has never padding, margin or position applied.
					var viewportSize = _viewportSize;
					var viewportScroll = {
						l: _scrollHorizontalInfo.cs,
						t: _scrollVerticalInfo.cs
					};
					var settingsAxis = elementObjSettings.axis;
					var settingsBlock = elementObjSettings.block;
					var settingsMargin = elementObjSettings.margin;
					var blockXIsEnd = settingsBlock[0] === (_isRTL ? strBegin : strEnd);
					var blockYIsEnd = settingsBlock[1] === strEnd;
					var measuringForBlockIsRequired = blockXIsEnd || blockYIsEnd;
					elementOffset.top -= settingsMargin[0];
					elementOffset.left -= settingsMargin[3];
					var elementScrollCoordinates = {
						x: Math.round(elementOffset.left - viewportOffset.left + viewportScroll.l),
						y: Math.round(elementOffset.top - viewportOffset.top + viewportScroll.t)
					};
					if (_isRTL) {
						if (!_rtlScrollBehavior.n && !_rtlScrollBehavior.i)
							elementScrollCoordinates.x = Math.round(viewportOffset.left - elementOffset.left + viewportScroll.l);
						if (_rtlScrollBehavior.n && _normalizeRTLCache)
							elementScrollCoordinates.x *= -1;
						if (_rtlScrollBehavior.i && _normalizeRTLCache)
							elementScrollCoordinates.x = Math.round(viewportOffset.left - elementOffset.left + (_scrollHorizontalInfo.ms - viewportScroll.l));
					}

					if (measuringForBlockIsRequired) {
						var rawElementSize = {};
						var rect;
						if (_supportTransform) {
							rect = finalElement[0].getBoundingClientRect();
							rawElementSize = {
								w: rect[_strWidth],
								h: rect[_strHeight]
							};
						}
						else {
							rawElementSize = {
								w: finalElement[0].offsetWidth,
								h: finalElement[0].offsetHeight
							};
						}
						var elementSize = {
							w: rawElementSize.w + settingsMargin[3] + settingsMargin[1],
							h: rawElementSize.h + settingsMargin[0] + settingsMargin[2]
						};
						if (blockXIsEnd)
							elementScrollCoordinates.x -= (viewportSize.w - elementSize.w) * (_isRTL && _normalizeRTLCache ? -1 : 1);
						if (blockYIsEnd)
							elementScrollCoordinates.y -= viewportSize.h - elementSize.h;
					}

					if (settingsAxis === _strX)
						delete elementScrollCoordinates.y;
					if (settingsAxis === _strY)
						delete elementScrollCoordinates.x;

					coordinates = elementScrollCoordinates;
				}

				finalScroll.x = getFinalScroll(true, getRawScroll(coordinates).x);
				finalScroll.y = getFinalScroll(false, getRawScroll(coordinates).y);
				var scrollLeft = finalScroll.x !== undefined;
				var scrollTop = finalScroll.y !== undefined;

				if (duration > 0 || durationIsObject) {
					var animateObj = { };
					if (scrollLeft)
						animateObj[_strScrollLeft] = finalScroll.x;
					if (scrollTop)
						animateObj[_strScrollTop] = finalScroll.y;

					if (durationIsObject) {
						_viewportElement.animate(animateObj, duration);
					}
					else {
						var animateOpt =  {
							duration : duration,
							complete : complete
						};
						if(helper.type(easing) === 'array') {
							var specialEasing = { };
							specialEasing[_strScrollLeft] = easing[0];
							specialEasing[_strScrollTop] = easing[1];
							animateOpt.specialEasing = specialEasing;
						}
						else {
							animateOpt.easing = easing;
						}
						_viewportElement.animate(animateObj, animateOpt);
					}
				}
				else {
					if (scrollLeft)
						_viewportElement[_strScrollLeft](finalScroll.x);
					if (scrollTop)
						_viewportElement[_strScrollTop](finalScroll.y);
				}
			};

			/**
			 * Stops all scroll animations.
			 */
			_base.scrollStop = function (param1, param2, param3) {
				_viewportElement.stop(param1, param2, param3);
			};

			/**
			 * Returns all relevant elements.
			 * @returns {{target: *, host: *, padding: *, viewport: *, content: *, scrollbarHorizontal: {scrollbar: *, track: *, handle: *}, scrollbarVertical: {scrollbar: *, track: *, handle: *}, scrollbarCorner: *}}
			 */
			_base.getElements = function () {
				return {
					target: _targetElement[0],
					host: _hostElement[0],
					padding: _paddingElement[0],
					viewport: _viewportElement[0],
					content: _contentElement[0],
					scrollbarHorizontal: {
						scrollbar: _scrollbarHorizontalElement[0],
						track: _scrollbarHorizontalTrackElement[0],
						handle: _scrollbarHorizontalHandleElement[0]
					},
					scrollbarVertical: {
						scrollbar: _scrollbarVerticalElement[0],
						track: _scrollbarVerticalTrackElement[0],
						handle: _scrollbarVerticalHandleElement[0]
					},
					scrollbarCorner: _scrollbarCornerElement
				};
			};

			/**
			 * Returns a object which describes the current state of this instance.
			 * @param stateProperty A specific property from the state object which shall be returned.
			 * @returns {{widthAuto, heightAuto, overflowAmount, hideOverflow, hasOverflow, contentScrollSize, viewportSize, hostSize, autoUpdate} | *}
			 */
			_base.getState = function (stateProperty) {
				var prepare = function (obj) {
					if (!helper.isPlainObject(obj))
						return obj;
					var extended = helper.extend(true, {}, obj);
					byPropertyPath.del(extended, 'c');
					var changePropertyName = function (from, to) {
						if (extended.hasOwnProperty(from)) {
							extended[to] = extended[from];
							delete extended[from];
						}
					};
					changePropertyName('w', _strWidth);
					changePropertyName('h', _strHeight);
					return extended;
				};
				var obj = {
					sleeping: prepare(_isSleeping) || false,
					autoUpdate: prepare(!_mutationObserverConnected),
					widthAuto: prepare(_widthAutoCache),
					heightAuto: prepare(_heightAutoCache),
					padding: prepare(_cssPaddingCache),
					overflowAmount: prepare(_overflowAmountCache),
					hideOverflow: prepare(_hideOverflowCache),
					hasOverflow: prepare(_hasOverflowCache),
					contentScrollSize: prepare(_contentScrollSizeCache),
					viewportSize: prepare(_viewportSize),
					hostSize: prepare(_hostSizeCache)
				};
				if (helper.type(stateProperty) === _strString)
					return byPropertyPath.get(obj, stateProperty);
				return obj;
			};

			/**
			 * Constructs the plugin.
			 * @param targetElement The element to which the plugin shall be applied.
			 * @param options The initial options of the plugin.
			 * @returns {boolean} True if the plugin was successfully initialized, false otherwise.
			 */
			function construct(targetElement, options) {
				_defaultOptions = globals.defaultOptions;
				_nativeScrollbarStyling = globals.nativeScrollbarStyling;
				_nativeScrollbarSize = helper.extend(true, {}, globals.nativeScrollbarSize);
				_nativeScrollbarIsOverlaid = helper.extend(true, {}, globals.nativeScrollbarIsOverlaid);
				_overlayScrollbarDummySize = helper.extend(true, {}, globals.overlayScrollbarDummySize);
				_rtlScrollBehavior = helper.extend(true, {}, globals.rtlScrollBehavior);

				//parse & set options but don't update
				setOptions(helper.extend(true, {}, _defaultOptions, options));
				var optionsCallbacks = _currentPreparedOptions.callbacks;

				//check if the plugin hasn't to be initialized
				if (_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.x && !_currentPreparedOptions.nativeScrollbarsOverlaid.initialize) {
					var onInitializationWithdrawn = optionsCallbacks.onInitializationWithdrawn;
					if (helper.isFunction(onInitializationWithdrawn))
						callCallback(onInitializationWithdrawn);
					return false;
				}

				_cssCalc = globals.cssCalc;
				_msieVersion = globals.msie;
				_autoUpdateRecommended = globals.autoUpdateRecommended;
				_supportTransition = globals.supportTransition;
				_supportTransform = globals.supportTransform;
				_supportPassiveEvents = globals.supportPassiveEvents;
				_supportResizeObserver = globals.supportResizeObserver;
				_supportMutationObserver = globals.supportMutationObserver;
				_documentElement = helper(targetElement.ownerDocument);
				_windowElement = helper(_documentElement[0].defaultView || _documentElement[0].parentWindow);
				_htmlElement = _documentElement.find('html').first();
				_bodyElement = _htmlElement.find('body').first();
				_targetElement = helper(targetElement);
				_isTextarea = _targetElement.is('textarea');
				_isBody = _targetElement.is('body');

				var initBodyScroll;
				if (_isBody) {
					initBodyScroll = {};
					initBodyScroll.l = Math.max(_targetElement[_strScrollLeft](), _htmlElement[_strScrollLeft](), _windowElement[_strScrollLeft]());
					initBodyScroll.t = Math.max(_targetElement[_strScrollTop](), _htmlElement[_strScrollTop](), _windowElement[_strScrollTop]());
				}

				//build Hide-scrollbars DOM
				if (_isTextarea) {
					_targetElement.wrap(_strDivBegin + _classNameHostTextareaElement + _strDivEnd);
					_targetElement.addClass(_classNameTextareaElement).addClass(_classNameTextInherit);
					_hostElement = _targetElement.parent();

					var hostElementCSS = {};
					if (!_currentPreparedOptions.sizeAutoCapable) {
						hostElementCSS[_strWidth] = _targetElement.css(_strWidth);
						hostElementCSS[_strHeight] = _targetElement.css(_strHeight);
					}
					_hostElement.css(hostElementCSS);

					_hostElement.wrapInner(_strDivBegin + _classNameContentElement + _strSpace + _classNameTextInherit + _strDivEnd)
						.wrapInner(_strDivBegin + _classNameViewportElement + _strSpace + _classNameTextInherit + _strDivEnd)
						.wrapInner(_strDivBegin + _classNamePaddingElement + _strSpace + _classNameTextInherit + _strDivEnd);
					_contentElement = _hostElement.find(_strDot + _classNameContentElement).first();
					_viewportElement = _hostElement.find(_strDot + _classNameViewportElement).first();
					_paddingElement = _hostElement.find(_strDot + _classNamePaddingElement).first();
					_textareaCoverElement = helper(_strDivBegin + _classNameTextareaCoverElement + _strDivEnd);
					_contentElement.prepend(_textareaCoverElement);

					_targetElement.on(_strScroll, textareaOnScroll);
					_targetElement.on('drop', textareaOnDrop);
					_targetElement.on('focus', textareaOnFocus);
					;
					_targetElement.on('focusout', textareaOnFocusOut);
					if (_msieVersion > 9 || !_autoUpdateRecommended) {
						_targetElement.on('input', textareaOnInput);
					}
					else {
						_targetElement.on(_strKeyDownEvent, textareaOnKeyDown);
						_targetElement.on(_strKeyUpEvent, textareaOnKeyUp);
					}
				} else {
					_targetElement.addClass(_classNameHostElement);
					_hostElement = _targetElement;
					_hostElement.wrapInner(_strDivBegin + _classNameContentElement + _strDivEnd)
						.wrapInner(_strDivBegin + _classNameViewportElement + _strDivEnd)
						.wrapInner(_strDivBegin + _classNamePaddingElement + _strDivEnd);
					_contentElement = _hostElement.find(_strDot + _classNameContentElement).first();
					_viewportElement = _hostElement.find(_strDot + _classNameViewportElement).first();
					_paddingElement = _hostElement.find(_strDot + _classNamePaddingElement).first();

					//add transitionend event
					_contentElement.on(_strTransitionEndEvent, function (event) {
						if (_autoUpdateCache === true)
							return;
						event = event.originalEvent || event;
						if (isSizeAffectingCSSProperty(event.propertyName))
							update(_strAuto);
					});
				}

				buildScrollbars();

				//add scroll event
				if (_supportPassiveEvents)
					addPassiveEventListener(_viewportElement, _strScroll, viewportOnScroll);
				else
					_viewportElement.on(_strScroll, viewportOnScroll);

				if (_nativeScrollbarStyling) {
					if (_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y)
						_viewportElement.addClass(_classNameViewportNativeScrollbarsOverlaid);
					else
						_viewportElement.addClass(_classNameViewportNativeScrollbarsInvisible);
				}

				//build mutation observers
				if (_supportMutationObserver) {
					var mutationObserver = compatibility.mO();
					var contentLastUpdate = compatibility.now();
					var contentTimeout;

					_mutationObserverHost = new mutationObserver(function (mutations) {
						if (!_initialized || _isSleeping)
							return;
						var doUpdate = false;
						helper.each(mutations, function () {
							var t = this;
							var target = this.target;
							var attrName = t.attributeName;

							if (attrName === 'class')
								doUpdate = hostClassNamesChanged(t.oldValue, target.className);
							else if (attrName === 'style')
								doUpdate = t.oldValue !== target.style.cssText;
							else
								doUpdate = true;

							if (doUpdate)
								return false;
						});
						if (doUpdate)
							_base.update(_strAuto);
					});
					_mutationObserverContent = new mutationObserver(function (mutations) {
						if (!_initialized || _isSleeping)
							return;

						var doUpdate = false;
						for (var i = 0; i < mutations.length; i++) {
							var mutation = mutations[i];
							if (isUnknownMutation(mutation)) {
								doUpdate = true;
								break;
							}
						}

						if (doUpdate) {
							var now = compatibility.now();
							var sizeAuto = (_heightAutoCache || _widthAutoCache);
							var action = function () {
								contentLastUpdate = now;
								//if cols, rows or wrap attr was changed
								if (_isTextarea)
									textareaUpdate();

								if (sizeAuto)
									_base.update();
								else
									_base.update(_strAuto);
							};
							clearTimeout(contentTimeout);
							if (_mutationObserverContentLag <= 0 || now - contentLastUpdate > _mutationObserverContentLag || !sizeAuto)
								action();
							else
								contentTimeout = setTimeout(action, _mutationObserverContentLag);
						}
					});
				}

				//build resize observer for the host element
				if (_isBody) {
					_htmlElement.addClass(_classNameHTMLElement);

					//apply the body scroll to handle it right in the update method
					_viewportElement[_strScrollLeft](initBodyScroll.l);
					_viewportElement[_strScrollTop](initBodyScroll.t);
				}
				_sizeObserverElement = helper(_strDivBegin + 'os-resize-observer-host' + _strDivEnd);
				_hostElement.prepend(_sizeObserverElement);
				addResizeObserver(_sizeObserverElement, onHostResized);

				//update for the first time
				onHostResized(); //initialize cache for host size
				_base.update(_strAuto); //initialize cache for content

				//add the transition class for transitions AFTER the first update (for preventing unwanted transitions)
				setTimeout(function () {
					if (_supportTransition && !_destroyed)
						_hostElement.addClass(_classNameHostTransition);
				}, 333);

				//the plugin is initialized now!
				_initialized = true;
				var onInitialized = optionsCallbacks.onInitialized;
				if (helper.isFunction(onInitialized)) {
					callCallback(onInitialized);
				}
				return _initialized;
			};

			if (construct(pluginTargetElement, options)) {
				instances.add(pluginTargetElement, _base);
				return _base;
			}
			_base = undefined;
		}

		/**
		 * Initializes a new OverlayScrollbarsInstance object or changes options if already initialized or returns the current instance.
		 * @param pluginTargetElements The elements to which the Plugin shall be initialized.
		 * @param options The custom options.
		 * @returns {*}
		 */
		window[PLUGINNAME] = function(pluginTargetElements, options) {
			if(arguments.length === 0)
				return this;

			initOverlayScrollbarsStatics();

			var arr = [ ];
			var inst;
			if(helper.isPlainObject(options)) {
				if (pluginTargetElements && pluginTargetElements.length) {
					if(pluginTargetElements.length > 1) {
						helper.each(pluginTargetElements, function () {
							inst = this;
							if(inst !== undefined)
								arr.push(OverlayScrollbarsInstance(inst, options, _pluginGlobals, _pluginAutoUpdateLoop));
						});
						return arr;
					}
					else
						return OverlayScrollbarsInstance(pluginTargetElements[0], options, _pluginGlobals, _pluginAutoUpdateLoop)
				}
				else
					return OverlayScrollbarsInstance(pluginTargetElements, options, _pluginGlobals, _pluginAutoUpdateLoop);
			}
			else {
				if(pluginTargetElements) {
					if(pluginTargetElements.length && pluginTargetElements.length > 0) {
						if(pluginTargetElements.length > 1) {
							helper.each(pluginTargetElements, function() {
								inst = instances.get(this);
								if(options === '!') {
									if(inst !== undefined)
										arr.push(inst);
								}
								else
									arr.push(inst);
							});
							return arr;
						}
						else
							return instances.get(pluginTargetElements[0]);
					}
					else
						return instances.get(pluginTargetElements);
				}
			}
		};

		/**
		 * Returns a object which contains global information about the plugin and each instance of it.
		 * The returned object is just a copy, that means that changes to the returned object won't have any effect to the original object.
		 */
		window[PLUGINNAME].globals = function () {
			initOverlayScrollbarsStatics();
			var globals = helper.extend(true, { }, _pluginGlobals);
			delete globals['msie'];
			return globals;
		};

		/**
		 * Gets or Sets the default options for each new plugin initialization.
		 * @param newDefaultOptions The object with which the default options shall be extended.
		 */
		window[PLUGINNAME].defaultOptions = function(newDefaultOptions) {
			var currDefaultOptions = _pluginGlobals.defaultOptions;
			if(newDefaultOptions === undefined)
				return helper.extend(true, { }, currDefaultOptions);

			//set the new default options
			_pluginGlobals.defaultOptions = helper.extend(true, { }, currDefaultOptions , newDefaultOptions);
		};
	})(COMPATIBILITY, INSTANCES, HELPER, BYPROPERTYPATH);
})));