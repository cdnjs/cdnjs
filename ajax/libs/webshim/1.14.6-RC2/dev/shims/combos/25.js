
//this might was already extended by ES5 shim feature
(function($){
	"use strict";
	var webshims = window.webshims;
	if(webshims.defineProperties){return;}
	var defineProperty = 'defineProperty';
	var has = Object.prototype.hasOwnProperty;
	var descProps = ['configurable', 'enumerable', 'writable'];
	var extendUndefined = function(prop){
		for(var i = 0; i < 3; i++){
			if(prop[descProps[i]] === undefined && (descProps[i] !== 'writable' || prop.value !== undefined)){
				prop[descProps[i]] = true;
			}
		}
	};

	var extendProps = function(props){
		if(props){
			for(var i in props){
				if(has.call(props, i)){
					extendUndefined(props[i]);
				}
			}
		}
	};

	if(Object.create){
		webshims.objectCreate = function(proto, props, opts){
			extendProps(props);
			var o = Object.create(proto, props);
			if(opts){
				o.options = $.extend(true, {}, o.options  || {}, opts);
				opts = o.options;
			}
			if(o._create && $.isFunction(o._create)){
				o._create(opts);
			}
			return o;
		};
	}

	if(Object[defineProperty]){
		webshims[defineProperty] = function(obj, prop, desc){
			extendUndefined(desc);
			return Object[defineProperty](obj, prop, desc);
		};
	}
	if(Object.defineProperties){
		webshims.defineProperties = function(obj, props){
			extendProps(props);
			return Object.defineProperties(obj, props);
		};
	}
	webshims.getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	webshims.getPrototypeOf = Object.getPrototypeOf;
})(window.webshims.$);
//DOM-Extension helper
webshims.register('dom-extend', function($, webshims, window, document, undefined){
	"use strict";
	var supportHrefNormalized = !('hrefNormalized' in $.support) || $.support.hrefNormalized;
	var has = Object.prototype.hasOwnProperty;
	webshims.assumeARIA = true;
	
	if($('<input type="email" />').attr('type') == 'text' || $('<form />').attr('novalidate') === "" || ('required' in $('<input />')[0].attributes)){
		webshims.error("IE browser modes are busted in IE10+. Please test your HTML/CSS/JS with a real IE version or at least IETester or similiar tools");
	}
	
	if('debug' in webshims){
		webshims.error('Use webshims.setOptions("debug", true||false||"noCombo"); to debug flag');
	}
	
	if (!webshims.cfg.no$Switch) {
		var switch$ = function(){
			if (window.jQuery && (!window.$ || window.jQuery == window.$) && !window.jQuery.webshims) {
				webshims.error("jQuery was included more than once. Make sure to include it only once or try the $.noConflict(extreme) feature! Webshims and other Plugins might not work properly. Or set webshims.cfg.no$Switch to 'true'.");
				if (window.$) {
					window.$ = webshims.$;
				}
				window.jQuery = webshims.$;
			}
		};
		switch$();
		setTimeout(switch$, 90);
		webshims.ready('DOM', switch$);
		$(switch$);
		webshims.ready('WINDOWLOAD', switch$);
		
	}

	//shortcus
	var listReg = /\s*,\s*/;
		
	//proxying attribute
	var olds = {};
	var havePolyfill = {};
	var hasPolyfillMethod = {};
	var extendedProps = {};
	var extendQ = {};
	var modifyProps = {};
	
	var oldVal = $.fn.val;
	var singleVal = function(elem, name, val, pass, _argless){
		return (_argless) ? oldVal.call($(elem)) : oldVal.call($(elem), val);
	};
	
	//jquery mobile and jquery ui
	if(!$.widget){
		(function(){
			var _cleanData = $.cleanData;
			$.cleanData = function( elems ) {
				if(!$.widget){
					for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
						try {
							$( elem ).triggerHandler( "remove" );
						// http://bugs.jquery.com/ticket/8235
						} catch( e ) {}
					}
				}
				_cleanData( elems );
			};
		})();
	}
	

	$.fn.val = function(val){
		var elem = this[0];
		if(arguments.length && val == null){
			val = '';
		}
		if(!arguments.length){
			if(!elem || elem.nodeType !== 1){return oldVal.call(this);}
			return $.prop(elem, 'value', val, 'val', true);
		}
		if($.isArray(val)){
			return oldVal.apply(this, arguments);
		}
		var isFunction = $.isFunction(val);
		return this.each(function(i){
			elem = this;
			if(elem.nodeType === 1){
				if(isFunction){
					var genVal = val.call( elem, i, $.prop(elem, 'value', undefined, 'val', true));
					if(genVal == null){
						genVal = '';
					}
					$.prop(elem, 'value', genVal, 'val') ;
				} else {
					$.prop(elem, 'value', val, 'val');
				}
			}
		});
	};
	$.fn.onTrigger = function(evt, fn){
		return this.on(evt, fn).each(fn);
	};
	
	$.fn.onWSOff = function(evt, fn, trigger, evtDel){
		if(!evtDel){
			evtDel = document;
		}
		$(evtDel)[trigger ? 'onTrigger' : 'on'](evt, fn);
		this.on('remove', function(e){
			if(!e.originalEvent){
				$(evtDel).off(evt, fn);
			}
		});
		return this;
	};
	var idCount = 0;
	var dataID = '_webshims'+ (Math.round(Math.random() * 1000));
	var elementData = function(elem, key, val){
		elem = elem.jquery ? elem[0] : elem;
		if(!elem){return val || {};}
		var data = $.data(elem, dataID);
		if(val !== undefined){
			if(!data){
				data = $.data(elem, dataID, {});
			}
			if(key){
				data[key] = val;
			}
		}
		
		return key ? data && data[key] : data;
	};


	[{name: 'getNativeElement', prop: 'nativeElement'}, {name: 'getShadowElement', prop: 'shadowElement'}, {name: 'getShadowFocusElement', prop: 'shadowFocusElement'}].forEach(function(data){
		$.fn[data.name] = function(){
			var elems = [];
			this.each(function(){
				var shadowData = elementData(this, 'shadowData');
				var elem = shadowData && shadowData[data.prop] || this;
				if($.inArray(elem, elems) == -1){
					elems.push(elem);
				}
			});
			return this.pushStack(elems);
		};
	});

	function clone(elem, dataAndEvents, uniqueIds){
		var cloned = $.clone( elem, dataAndEvents, false );
		$(cloned.querySelectorAll('.'+webshims.shadowClass)).detach();
		if(uniqueIds){
			idCount++;
			$(cloned.querySelectorAll('[id]')).prop('id', function(i, id){
				return id +idCount;
			});
		} else {
			$(cloned.querySelectorAll('audio[id^="ID-"], video[id^="ID-"], label[id^="ID-"]')).removeAttr('id');
		}
		return cloned;
	}

	$.fn.clonePolyfill = function(dataAndEvents, uniqueIds){
		dataAndEvents = dataAndEvents || false;
		return this
			.map(function() {
				var cloned = clone( this, dataAndEvents, uniqueIds );
				setTimeout(function(){
					if($.contains(document.body, cloned)){
						$(cloned).updatePolyfill();
					}
				});
				return cloned;
			})
		;
	};
	
	//add support for $('video').trigger('play') in case extendNative is set to false
	if(!webshims.cfg.extendNative && !webshims.cfg.noTriggerOverride){
		(function(oldTrigger){
			$.event.trigger = function(event, data, elem, onlyHandlers){
				
				if(!hasPolyfillMethod[event] || onlyHandlers || !elem || elem.nodeType !== 1){
					return oldTrigger.apply(this, arguments);
				}
				var ret, isOrig, origName;
				var origFn = elem[event];
				var polyfilledFn = $.prop(elem, event);
				var changeFn = polyfilledFn && origFn != polyfilledFn;
				if(changeFn){
					origName = '__ws'+event;
					isOrig = (event in elem) && has.call(elem, event);
					elem[event] = polyfilledFn;
					elem[origName] = origFn;
				}
				
				ret = oldTrigger.apply(this, arguments);
				if (changeFn) {
					if(isOrig){
						elem[event] = origFn;
					} else {
						delete elem[event];
					}
					delete elem[origName];
				}
				
				return ret;
			};
		})($.event.trigger);
	}
	
	['removeAttr', 'prop', 'attr'].forEach(function(type){
		olds[type] = $[type];
		$[type] = function(elem, name, value, pass, _argless){
			var isVal = (pass == 'val');
			var oldMethod = !isVal ? olds[type] : singleVal;
			if( !elem || !havePolyfill[name] || elem.nodeType !== 1 || (!isVal && pass && type == 'attr' && $.attrFn[name]) ){
				return oldMethod(elem, name, value, pass, _argless);
			}
			
			var nodeName = (elem.nodeName || '').toLowerCase();
			var desc = extendedProps[nodeName];
			var curType = (type == 'attr' && (value === false || value === null)) ? 'removeAttr' : type;
			var propMethod;
			var oldValMethod;
			var ret;
			
			
			if(!desc){
				desc = extendedProps['*'];
			}
			if(desc){
				desc = desc[name];
			}
			
			if(desc){
				propMethod = desc[curType];
			}
			
			if(propMethod){
				if(name == 'value'){
					oldValMethod = propMethod.isVal;
					propMethod.isVal = isVal;
				}
				if(curType === 'removeAttr'){
					return propMethod.value.call(elem);	
				} else if(value === undefined){
					return (propMethod.get) ? 
						propMethod.get.call(elem) : 
						propMethod.value
					;
				} else if(propMethod.set) {
					if(type == 'attr' && value === true){
						value = name;
					}
					
					ret = propMethod.set.call(elem, value);
				}
				if(name == 'value'){
					propMethod.isVal = oldValMethod;
				}
			} else {
				ret = oldMethod(elem, name, value, pass, _argless);
			}
			if((value !== undefined || curType === 'removeAttr') && modifyProps[nodeName] && modifyProps[nodeName][name]){
				
				var boolValue;
				if(curType == 'removeAttr'){
					boolValue = false;
				} else if(curType == 'prop'){
					boolValue = !!(value);
				} else {
					boolValue = true;
				}
				
				modifyProps[nodeName][name].forEach(function(fn){
					if(!fn.only || (fn.only = 'prop' && type == 'prop') || (fn.only == 'attr' && type != 'prop')){
						fn.call(elem, value, boolValue, (isVal) ? 'val' : curType, type);
					}
				});
			}
			return ret;
		};
		
		extendQ[type] = function(nodeName, prop, desc){
			
			if(!extendedProps[nodeName]){
				extendedProps[nodeName] = {};
			}
			if(!extendedProps[nodeName][prop]){
				extendedProps[nodeName][prop] = {};
			}
			var oldDesc = extendedProps[nodeName][prop][type];
			var getSup = function(propType, descriptor, oDesc){
				var origProp;
				if(descriptor && descriptor[propType]){
					return descriptor[propType];
				}
				if(oDesc && oDesc[propType]){
					return oDesc[propType];
				}
				if(type == 'prop' && prop == 'value'){
					return function(value){
						var elem = this;
						return (desc.isVal) ? 
							singleVal(elem, prop, value, false, (arguments.length === 0)) : 
							olds[type](elem, prop, value)
						;
					};
				}
				if(type == 'prop' && propType == 'value' && desc.value.apply){
					origProp = '__ws'+prop;
					hasPolyfillMethod[prop] = true;
					return  function(value){
						var sup = this[origProp] || olds[type](this, prop);
						if(sup && sup.apply){
							sup = sup.apply(this, arguments);
						} 
						return sup;
					};
				}
				return function(value){
					return olds[type](this, prop, value);
				};
			};
			extendedProps[nodeName][prop][type] = desc;
			if(desc.value === undefined){
				if(!desc.set){
					desc.set = desc.writeable ? 
						getSup('set', desc, oldDesc) : 
						(webshims.cfg.useStrict && prop == 'prop') ? 
							function(){throw(prop +' is readonly on '+ nodeName);} : 
							function(){webshims.info(prop +' is readonly on '+ nodeName);}
					;
				}
				if(!desc.get){
					desc.get = getSup('get', desc, oldDesc);
				}
				
			}
			
			['value', 'get', 'set'].forEach(function(descProp){
				if(desc[descProp]){
					desc['_sup'+descProp] = getSup(descProp, oldDesc);
				}
			});
		};
		
	});
	
	var extendNativeValue = (function(){
		var UNKNOWN = webshims.getPrototypeOf(document.createElement('foobar'));
		
		//see also: https://github.com/lojjic/PIE/issues/40 | https://prototype.lighthouseapp.com/projects/8886/tickets/1107-ie8-fatal-crash-when-prototypejs-is-loaded-with-rounded-cornershtc
		var isExtendNativeSave = webshims.support.advancedObjectProperties && webshims.support.objectAccessor;
		return function(nodeName, prop, desc){
			var elem , elemProto;
			 if( isExtendNativeSave && (elem = document.createElement(nodeName)) && (elemProto = webshims.getPrototypeOf(elem)) && UNKNOWN !== elemProto && ( !elem[prop] || !has.call(elem, prop) ) ){
				var sup = elem[prop];
				desc._supvalue = function(){
					if(sup && sup.apply){
						return sup.apply(this, arguments);
					}
					return sup;
				};
				elemProto[prop] = desc.value;
			} else {
				desc._supvalue = function(){
					var data = elementData(this, 'propValue');
					if(data && data[prop] && data[prop].apply){
						return data[prop].apply(this, arguments);
					}
					return data && data[prop];
				};
				initProp.extendValue(nodeName, prop, desc.value);
			}
			desc.value._supvalue = desc._supvalue;
		};
	})();
		
	var initProp = (function(){
		
		var initProps = {};
		
		webshims.addReady(function(context, contextElem){
			var nodeNameCache = {};
			var getElementsByName = function(name){
				if(!nodeNameCache[name]){
					nodeNameCache[name] = $(context.getElementsByTagName(name));
					if(contextElem[0] && $.nodeName(contextElem[0], name)){
						nodeNameCache[name] = nodeNameCache[name].add(contextElem);
					}
				}
			};
			
			
			$.each(initProps, function(name, fns){
				getElementsByName(name);
				if(!fns || !fns.forEach){
					webshims.warn('Error: with '+ name +'-property. methods: '+ fns);
					return;
				}
				fns.forEach(function(fn){
					nodeNameCache[name].each(fn);
				});
			});
			nodeNameCache = null;
		});
		
		var tempCache;
		var emptyQ = $([]);
		var createNodeNameInit = function(nodeName, fn){
			if(!initProps[nodeName]){
				initProps[nodeName] = [fn];
			} else {
				initProps[nodeName].push(fn);
			}
			if($.isDOMReady){
				(tempCache || $( document.getElementsByTagName(nodeName) )).each(fn);
			}
		};

		return {
			createTmpCache: function(nodeName){
				if($.isDOMReady){
					tempCache = tempCache || $( document.getElementsByTagName(nodeName) );
				}
				return tempCache || emptyQ;
			},
			flushTmpCache: function(){
				tempCache = null;
			},
			content: function(nodeName, prop){
				createNodeNameInit(nodeName, function(){
					var val =  $.attr(this, prop);
					if(val != null){
						$.attr(this, prop, val);
					}
				});
			},
			createElement: function(nodeName, fn){
				createNodeNameInit(nodeName, fn);
			},
			extendValue: function(nodeName, prop, value){
				createNodeNameInit(nodeName, function(){
					$(this).each(function(){
						var data = elementData(this, 'propValue', {});
						data[prop] = this[prop];
						this[prop] = value;
					});
				});
			}
		};
	})();
		
	var createPropDefault = function(descs, removeType){
		if(descs.defaultValue === undefined){
			descs.defaultValue = '';
		}
		if(!descs.removeAttr){
			descs.removeAttr = {
				value: function(){
					descs[removeType || 'prop'].set.call(this, descs.defaultValue);
					descs.removeAttr._supvalue.call(this);
				}
			};
		}
		if(!descs.attr){
			descs.attr = {};
		}
	};
	
	$.extend(webshims, {
		xProps: havePolyfill,
		getID: (function(){
			var ID = new Date().getTime();
			return function(elem){
				elem = $(elem);
				var id = elem.prop('id');
				if(!id){
					ID++;
					id = 'ID-'+ ID;
					elem.eq(0).prop('id', id);
				}
				return id;
			};
		})(),
		domPrefixes: ["ws", "webkit", "moz", "ms", "o"],

		prefixed: function (prop, obj){
			var i, testProp;
			var ret = false;
			if(obj[prop]){
				ret = prop;
			}
			if(!ret){
				prop = prop.charAt(0).toUpperCase() + prop.slice(1);
				for(i = 0; i < webshims.domPrefixes.length; i++){
					testProp = webshims.domPrefixes[i]+prop;
					if(testProp in obj){
						ret = testProp;
						break;
					}
				}
			}
			return ret;
		},
		shadowClass: 'wsshadow-'+(Date.now()),
		implement: function(elem, type){
			var data = elementData(elem, 'implemented') || elementData(elem, 'implemented', {});
			if(data[type]){
				webshims.warn(type +' already implemented for element #'+elem.id);
				return false;
			}

			data[type] = true;
			return !$(elem).hasClass('ws-nopolyfill');
		},
		extendUNDEFProp: function(obj, props){
			$.each(props, function(name, prop){
				if( !(name in obj) ){
					obj[name] = prop;
				}
			});
		},
		getOptions: (function(){
			var normalName = /\-([a-z])/g;
			var regs = {};
			var nameRegs = {};
			var regFn = function(f, upper){
				return upper.toLowerCase();
			};
			var nameFn = function(f, dashed){
				return dashed.toUpperCase();
			};
			return function(elem, name, bases, stringAllowed){
				if(nameRegs[name]){
					name = nameRegs[name];
				} else {
					nameRegs[name] = name.replace(normalName, nameFn);
					name = nameRegs[name];
				}
				var data = elementData(elem, 'cfg'+name);
				var dataName;
				var cfg = {};
				
				if(data){
					return data;
				}
				data = $(elem).data();
				if(data && typeof data[name] == 'string'){
					if(stringAllowed){
						return elementData(elem, 'cfg'+name, data[name]);
					}
					webshims.error('data-'+ name +' attribute has to be a valid JSON, was: '+ data[name]);
				}
				if(!bases){
					bases = [true, {}];
				} else if(!Array.isArray(bases)){
					bases = [true, {}, bases];
				} else {
					bases.unshift(true, {});
				}
				
				if(data && typeof data[name] == 'object'){
					bases.push(data[name]);
				}
				
				if(!regs[name]){
					regs[name] = new RegExp('^'+ name +'([A-Z])');
				}
				
				for(dataName in data){
					if(regs[name].test(dataName)){
						cfg[dataName.replace(regs[name], regFn)] = data[dataName];
					}
				}
				bases.push(cfg);
				return elementData(elem, 'cfg'+name, $.extend.apply($, bases));
			};
		})(),
		//http://www.w3.org/TR/html5/common-dom-interfaces.html#reflect
		createPropDefault: createPropDefault,
		data: elementData,
		moveToFirstEvent: function(elem, eventType, bindType){
			var events = ($._data(elem, 'events') || {})[eventType];
			var fn;
			
			if(events && events.length > 1){
				fn = events.pop();
				if(!bindType){
					bindType = 'bind';
				}
				if(bindType == 'bind' && events.delegateCount){
					events.splice( events.delegateCount, 0, fn);
				} else {
					events.unshift( fn );
				}
				
				
			}
			elem = null;
		},
		addShadowDom: (function(){
			var resizeTimer;
			var lastHeight;
			var lastWidth;
			var $window = $(window);
			var docObserve = {
				init: false,
				runs: 0,
				test: function(){
					var height = docObserve.getHeight();
					var width = docObserve.getWidth();
					
					if(height != docObserve.height || width != docObserve.width){
						docObserve.height = height;
						docObserve.width = width;
						docObserve.handler({type: 'docresize'});
						docObserve.runs++;
						if(docObserve.runs < 9){
							setTimeout(docObserve.test, 90);
						}
					} else {
						docObserve.runs = 0;
					}
				},
				handler: (function(){
					var trigger = function(){
						$(document).triggerHandler('updateshadowdom');
					};
					return function(e){
						clearTimeout(resizeTimer);
						resizeTimer = setTimeout(function(){
							if(e.type == 'resize'){
								var width = $window.width();
								var height = $window.width();

								if(height == lastHeight && width == lastWidth){
									return;
								}
								lastHeight = height;
								lastWidth = width;
								
								docObserve.height = docObserve.getHeight();
								docObserve.width = docObserve.getWidth();
							}

							if(window.requestAnimationFrame){
								requestAnimationFrame(trigger);
							} else {
								setTimeout(trigger, 0);
							}
							
						}, (e.type == 'resize' && !window.requestAnimationFrame) ? 50 : 9);
					};
				})(),
				_create: function(){
					$.each({ Height: "getHeight", Width: "getWidth" }, function(name, type){
						var body = document.body;
						var doc = document.documentElement;
						docObserve[type] = function (){
							return Math.max(
								body[ "scroll" + name ], doc[ "scroll" + name ],
								body[ "offset" + name ], doc[ "offset" + name ],
								doc[ "client" + name ]
							);
						};
					});
				},
				start: function(){
					if(!this.init && document.body){
						this.init = true;
						this._create();
						this.height = docObserve.getHeight();
						this.width = docObserve.getWidth();
						setInterval(this.test, 999);
						$(this.test);
						if($.support.boxSizing == null){
							$(function(){
								if($.support.boxSizing){
									docObserve.handler({type: 'boxsizing'});
								}
							});
						}
						webshims.ready('WINDOWLOAD', this.test);
						$(document).on('updatelayout.webshim pageinit popupafteropen panelbeforeopen tabsactivate collapsibleexpand shown.bs.modal shown.bs.collapse slid.bs.carousel playerdimensionchange', this.handler);
						$(window).on('resize', this.handler);
					}
				}
			};
			
			
			webshims.docObserve = function(){
				webshims.ready('DOM', function(){
					docObserve.start();

				});
			};
			return function(nativeElem, shadowElem, opts){
				if(nativeElem && shadowElem){
					opts = opts || {};
					if(nativeElem.jquery){
						nativeElem = nativeElem[0];
					}
					if(shadowElem.jquery){
						shadowElem = shadowElem[0];
					}
					var nativeData = $.data(nativeElem, dataID) || $.data(nativeElem, dataID, {});
					var shadowData = $.data(shadowElem, dataID) || $.data(shadowElem, dataID, {});
					var shadowFocusElementData = {};
					if(!opts.shadowFocusElement){
						opts.shadowFocusElement = shadowElem;
					} else if(opts.shadowFocusElement){
						if(opts.shadowFocusElement.jquery){
							opts.shadowFocusElement = opts.shadowFocusElement[0];
						}
						shadowFocusElementData = $.data(opts.shadowFocusElement, dataID) || $.data(opts.shadowFocusElement, dataID, shadowFocusElementData);
					}
					
					$(nativeElem).on('remove', function(e){
						if (!e.originalEvent) {
							setTimeout(function(){
								$(shadowElem).remove();
							}, 4);
						}
					});
					
					nativeData.hasShadow = shadowElem;
					shadowFocusElementData.nativeElement = shadowData.nativeElement = nativeElem;
					shadowFocusElementData.shadowData = shadowData.shadowData = nativeData.shadowData = {
						nativeElement: nativeElem,
						shadowElement: shadowElem,
						shadowFocusElement: opts.shadowFocusElement
					};
					if(opts.shadowChilds){
						opts.shadowChilds.each(function(){
							elementData(this, 'shadowData', shadowData.shadowData);
						});
					}
					
					if(opts.data){
						shadowFocusElementData.shadowData.data = shadowData.shadowData.data = nativeData.shadowData.data = opts.data;
					}
					opts = null;
				}
				webshims.docObserve();
			};
		})(),
		propTypes: {
			standard: function(descs, name){
				createPropDefault(descs);
				if(descs.prop){return;}
				descs.prop = {
					set: function(val){
						descs.attr.set.call(this, ''+val);
					},
					get: function(){
						return descs.attr.get.call(this) || descs.defaultValue;
					}
				};
				
			},
			"boolean": function(descs, name){
				
				createPropDefault(descs);
				if(descs.prop){return;}
				descs.prop = {
					set: function(val){
						if(val){
							descs.attr.set.call(this, "");
						} else {
							descs.removeAttr.value.call(this);
						}
					},
					get: function(){
						return descs.attr.get.call(this) != null;
					}
				};
			},
			"src": (function(){
				var anchor = document.createElement('a');
				anchor.style.display = "none";
				return function(descs, name){
					
					createPropDefault(descs);
					if(descs.prop){return;}
					descs.prop = {
						set: function(val){
							descs.attr.set.call(this, val);
						},
						get: function(){
							var href = this.getAttribute(name);
							var ret;
							if(href == null){return '';}
							
							anchor.setAttribute('href', href+'' );
							
							if(!supportHrefNormalized){
								try {
									$(anchor).insertAfter(this);
									ret = anchor.getAttribute('href', 4);
								} catch(er){
									ret = anchor.getAttribute('href', 4);
								}
								$(anchor).detach();
							}
							return ret || anchor.href;
						}
					};
				};
			})(),
			enumarated: function(descs, name){
					
					createPropDefault(descs);
					if(descs.prop){return;}
					descs.prop = {
						set: function(val){
							descs.attr.set.call(this, val);
						},
						get: function(){
							var val = (descs.attr.get.call(this) || '').toLowerCase();
							if(!val || descs.limitedTo.indexOf(val) == -1){
								val = descs.defaultValue;
							}
							return val;
						}
					};
				}
			
//			,unsignedLong: $.noop
//			,"doubble": $.noop
//			,"long": $.noop
//			,tokenlist: $.noop
//			,settableTokenlist: $.noop
		},
		reflectProperties: function(nodeNames, props){
			if(typeof props == 'string'){
				props = props.split(listReg);
			}
			props.forEach(function(prop){
				webshims.defineNodeNamesProperty(nodeNames, prop, {
					prop: {
						set: function(val){
							$.attr(this, prop, val);
						},
						get: function(){
							return $.attr(this, prop) || '';
						}
					}
				});
			});
		},
		defineNodeNameProperty: function(nodeName, prop, descs){
			havePolyfill[prop] = true;
						
			if(descs.reflect){
				if(descs.propType && !webshims.propTypes[descs.propType]){
					webshims.error('could not finde propType '+ descs.propType);
				} else {
					webshims.propTypes[descs.propType || 'standard'](descs, prop);
				}
				
			}
			
			['prop', 'attr', 'removeAttr'].forEach(function(type){
				var desc = descs[type];
				if(desc){
					if(type === 'prop'){
						desc = $.extend({writeable: true}, desc);
					} else {
						desc = $.extend({}, desc, {writeable: true});
					}
						
					extendQ[type](nodeName, prop, desc);
					if(nodeName != '*' && webshims.cfg.extendNative && type == 'prop' && desc.value && $.isFunction(desc.value)){
						extendNativeValue(nodeName, prop, desc);
					}
					descs[type] = desc;
				}
			});
			if(descs.initAttr){
				initProp.content(nodeName, prop);
			}
			return descs;
		},
		
		defineNodeNameProperties: function(name, descs, propType, _noTmpCache){
			var olddesc;
			for(var prop in descs){
				if(!_noTmpCache && descs[prop].initAttr){
					initProp.createTmpCache(name);
				}
				if(propType){
					if(descs[prop][propType]){
						//webshims.log('override: '+ name +'['+prop +'] for '+ propType);
					} else {
						descs[prop][propType] = {};
						['value', 'set', 'get'].forEach(function(copyProp){
							if(copyProp in descs[prop]){
								descs[prop][propType][copyProp] = descs[prop][copyProp];
								delete descs[prop][copyProp];
							}
						});
					}
				}
				descs[prop] = webshims.defineNodeNameProperty(name, prop, descs[prop]);
			}
			if(!_noTmpCache){
				initProp.flushTmpCache();
			}
			return descs;
		},
		
		createElement: function(nodeName, create, descs){
			var ret;
			if($.isFunction(create)){
				create = {
					after: create
				};
			}
			initProp.createTmpCache(nodeName);
			if(create.before){
				initProp.createElement(nodeName, create.before);
			}
			if(descs){
				ret = webshims.defineNodeNameProperties(nodeName, descs, false, true);
			}
			if(create.after){
				initProp.createElement(nodeName, create.after);
			}
			initProp.flushTmpCache();
			return ret;
		},
		onNodeNamesPropertyModify: function(nodeNames, props, desc, only){
			if(typeof nodeNames == 'string'){
				nodeNames = nodeNames.split(listReg);
			}
			if($.isFunction(desc)){
				desc = {set: desc};
			}
			
			nodeNames.forEach(function(name){
				if(!modifyProps[name]){
					modifyProps[name] = {};
				}
				if(typeof props == 'string'){
					props = props.split(listReg);
				}
				if(desc.initAttr){
					initProp.createTmpCache(name);
				}
				props.forEach(function(prop){
					if(!modifyProps[name][prop]){
						modifyProps[name][prop] = [];
						havePolyfill[prop] = true;
					}
					if(desc.set){
						if(only){
							desc.set.only =  only;
						}
						modifyProps[name][prop].push(desc.set);
					}
					
					if(desc.initAttr){
						initProp.content(name, prop);
					}
				});
				initProp.flushTmpCache();
				
			});
		},
		defineNodeNamesBooleanProperty: function(elementNames, prop, descs){
			if(!descs){
				descs = {};
			}
			if($.isFunction(descs)){
				descs.set = descs;
			}
			webshims.defineNodeNamesProperty(elementNames, prop, {
				attr: {
					set: function(val){
						if(descs.useContentAttribute){
							webshims.contentAttr(this, prop, val);
						} else {
							this.setAttribute(prop, val);
						}
						if(descs.set){
							descs.set.call(this, true);
						}
					},
					get: function(){
						var ret = (descs.useContentAttribute) ? webshims.contentAttr(this, prop) : this.getAttribute(prop);
						return (ret == null) ? undefined : prop;
					}
				},
				removeAttr: {
					value: function(){
						this.removeAttribute(prop);
						if(descs.set){
							descs.set.call(this, false);
						}
					}
				},
				reflect: true,
				propType: 'boolean',
				initAttr: descs.initAttr || false
			});
		},
		contentAttr: function(elem, name, val){
			if(!elem.nodeName){return;}
			var attr;
			if(val === undefined){
				attr = (elem.attributes[name] || {});
				val = attr.specified ? attr.value : null;
				return (val == null) ? undefined : val;
			}
			
			if(typeof val == 'boolean'){
				if(!val){
					elem.removeAttribute(name);
				} else {
					elem.setAttribute(name, name);
				}
			} else {
				elem.setAttribute(name, val);
			}
		},
		
		activeLang: (function(){
			var curLang = [];
			var langDatas = [];
			var loading = {};
			var load = function(src, obj, loadingLang){
				obj._isLoading = true;
				if(loading[src]){
					loading[src].push(obj);
				} else {
					loading[src] = [obj];
					webshims.loader.loadScript(src, function(){
						if(loadingLang == curLang.join()){
							$.each(loading[src], function(i, obj){
								select(obj);
							});
						}
						delete loading[src];
					});
				}
			};
			
			var select = function(obj){
				var oldLang = obj.__active;
				var selectLang = function(i, lang){
					obj._isLoading = false;
					if(obj[lang] || obj.availableLangs.indexOf(lang) != -1){
						if(obj[lang]){
							obj.__active = obj[lang];
							obj.__activeName = lang;
						} else {
							load(obj.langSrc+lang, obj, curLang.join());
						}
						return false;
					}
				};
				$.each(curLang, selectLang);
				if(!obj.__active){
					obj.__active = obj[''];
					obj.__activeName = '';
				}
				if(oldLang != obj.__active){
					$(obj).trigger('change');
				}
			};
			return function(lang){
				var shortLang;
				if(typeof lang == 'string'){
					if(curLang[0] != lang){
						curLang = [lang];
						shortLang = curLang[0].split('-')[0];
						if(shortLang && shortLang != lang){
							curLang.push(shortLang);
						}
						langDatas.forEach(select);
					}
				} else if(typeof lang == 'object'){
					if(!lang.__active){
						langDatas.push(lang);
						select(lang);
					}
					return lang.__active;
				}
				return curLang[0];
			};
		})()
	});
	
	$.each({
		defineNodeNamesProperty: 'defineNodeNameProperty',
		defineNodeNamesProperties: 'defineNodeNameProperties',
		createElements: 'createElement'
	}, function(name, baseMethod){
		webshims[name] = function(names, a, b, c){
			if(typeof names == 'string'){
				names = names.split(listReg);
			}
			var retDesc = {};
			names.forEach(function(nodeName){
				retDesc[nodeName] = webshims[baseMethod](nodeName, a, b, c);
			});
			return retDesc;
		};
	});
	
	webshims.isReady('webshimLocalization', true);

//html5a11y + hidden attribute
(function(){
	if(('content' in document.createElement('template'))){return;}
	
	$(function(){
		var main = $('main').attr({role: 'main'});
		if(main.length > 1){
			webshims.error('only one main element allowed in document');
		} else if(main.is('article *, section *')) {
			webshims.error('main not allowed inside of article/section elements');
		}
	});
	
	if(('hidden' in document.createElement('a'))){
		return;
	}
	
	webshims.defineNodeNamesBooleanProperty(['*'], 'hidden');
	
	var elemMappings = {
		article: "article",
		aside: "complementary",
		section: "region",
		nav: "navigation",
		address: "contentinfo"
	};
	var addRole = function(elem, role){
		var hasRole = elem.getAttribute('role');
		if (!hasRole) {
			elem.setAttribute('role', role);
		}
	};
	
	
	$.webshims.addReady(function(context, contextElem){
		$.each(elemMappings, function(name, role){
			var elems = $(name, context).add(contextElem.filter(name));
			for (var i = 0, len = elems.length; i < len; i++) {
				addRole(elems[i], role);
			}
		});
		if (context === document) {
			var header = document.getElementsByTagName('header')[0];
			var footers = document.getElementsByTagName('footer');
			var footerLen = footers.length;
			
			if (header && !$(header).closest('section, article')[0]) {
				addRole(header, 'banner');
			}
			if (!footerLen) {
				return;
			}
			var footer = footers[footerLen - 1];
			if (!$(footer).closest('section, article')[0]) {
				addRole(footer, 'contentinfo');
			}
		}
	});
	
})();
});
;webshim.register('filereader', function($, webshim, window, document, undefined, featureOptions){
	"use strict";
	var mOxie, moxie, hasXDomain;
	var FormData = $.noop;
	var sel = 'input[type="file"].ws-filereader';
	var loadMoxie = function (){
		webshim.loader.loadList(['moxie']);
	};
	var _createFilePicker = function(){
		var $input, picker, $parent, onReset;
		var input = this;

		if(webshim.implement(input, 'filepicker')){

			input = this;
			$input = $(this);
			$parent = $input.parent();
			onReset = function(){
				if(!input.value){
					$input.prop('value', '');
				}
			};

			$input.attr('tabindex', '-1').on('mousedown.filereaderwaiting click.filereaderwaiting', false);
			$parent.addClass('ws-loading');
			picker = new mOxie.FileInput({
				browse_button: this,
				accept: $.prop(this, 'accept'),
				multiple: $.prop(this, 'multiple')
			});

			$input.jProp('form').on('reset', function(){
				setTimeout(onReset);
			});
			picker.onready = function(){
				$input.off('.fileraderwaiting');
				$parent.removeClass('ws-waiting');
			};

			picker.onchange = function(e){
				webshim.data(input, 'fileList', e.target.files);
				$input.trigger('change');
			};
			picker.onmouseenter = function(){
				$input.trigger('mouseover');
				$parent.addClass('ws-mouseenter');
			};
			picker.onmouseleave = function(){
				$input.trigger('mouseout');
				$parent.removeClass('ws-mouseenter');
			};
			picker.onmousedown = function(){
				$input.trigger('mousedown');
				$parent.addClass('ws-active');
			};
			picker.onmouseup = function(){
				$input.trigger('mouseup');
				$parent.removeClass('ws-active');
			};

			webshim.data(input, 'filePicker', picker);

			webshim.ready('WINDOWLOAD', function(){
				var lastWidth;
				$input.onWSOff('updateshadowdom', function(){
					var curWitdth = input.offsetWidth;
					if(curWitdth && lastWidth != curWitdth){
						lastWidth = curWitdth;
						picker.refresh();
					}
				});
			});

			webshim.addShadowDom();

			picker.init();
			if(input.disabled){
				picker.disable(true);
			}
		}
	};
	var getFileNames = function(file){
		return file.name;
	};
	var createFilePicker = function(){
		var elem = this;
		loadMoxie();
		$(elem)
			.on('mousedown.filereaderwaiting click.filereaderwaiting', false)
			.parent()
			.addClass('ws-loading')
		;
		webshim.ready('moxie', function(){
			createFilePicker.call(elem);
		});
	};
	var noxhr = /^(?:script|jsonp)$/i;
	var notReadyYet = function(){
		loadMoxie();
		webshim.error('filereader/formdata not ready yet. please wait for moxie to load `webshim.ready("moxie", callbackFn);`` or wait for the first change event on input[type="file"].ws-filereader.')
	};
	var inputValueDesc = webshim.defineNodeNameProperty('input', 'value', {
			prop: {
				get: function(){
					var fileList = webshim.data(this, 'fileList');

					if(fileList && fileList.map){
						return fileList.map(getFileNames).join(', ');
					}

					return inputValueDesc.prop._supget.call(this);
				}
			}
		}
	);
	var shimMoxiePath = webshim.cfg.basePath+'moxie/';
	var crossXMLMessage = 'You nedd a crossdomain.xml to get all "filereader" / "XHR2" / "CORS" features to work. Or host moxie.swf/moxie.xap on your server an configure filereader options: "swfpath"/"xappath"';
	var testMoxie = function(options){
		return (options.wsType == 'moxie' || (options.data && options.data instanceof mOxie.FormData) || (options.crossDomain && $.support.cors !== false && hasXDomain != 'no' && !noxhr.test(options.dataType || '')));
	};
	var createMoxieTransport = function (options){

		if(testMoxie(options)){
			var ajax;
			webshim.info('moxie transfer used for $.ajax');
			if(hasXDomain == 'no'){
				webshim.error(crossXMLMessage);
			}
			return {
				send: function( headers, completeCallback ) {

					var proressEvent = function(obj, name){
						if(options[name]){
							var called = false;
							ajax.addEventListener('load', function(e){
								if(!called){
									options[name]({type: 'progress', lengthComputable: true, total: 1, loaded: 1});
								} else if(called.lengthComputable && called.total > called.loaded){
									options[name]({type: 'progress', lengthComputable: true, total: called.total, loaded: called.total});
								}
							});
							obj.addEventListener('progress', function(e){
								called = e;
								options[name](e);
							});
						}
					};
					ajax = new moxie.xhr.XMLHttpRequest();

					ajax.open(options.type, options.url, options.async, options.username, options.password);

					proressEvent(ajax.upload, featureOptions.uploadprogress);
					proressEvent(ajax.upload, featureOptions.progress);

					ajax.addEventListener('load', function(e){
						var responses = {
							text: ajax.responseText,
							xml: ajax.responseXML
						};
						completeCallback(ajax.status, ajax.statusText, responses, ajax.getAllResponseHeaders());
					});

					if(options.xhrFields && options.xhrFields.withCredentials){
						ajax.withCredentials = true;
					}

					if(options.timeout){
						ajax.timeout = options.timeout;
					}

					$.each(headers, function(name, value){
						ajax.setRequestHeader(name, value);
					});


					ajax.send(options.data);

				},
				abort: function() {
					if(ajax){
						ajax.abort();
					}
				}
			};
		}
	};
	var transports = {
		//based on script: https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest
		xdomain: (function(){
			var httpRegEx = /^https?:\/\//i;
			var getOrPostRegEx = /^get|post$/i;
			var sameSchemeRegEx = new RegExp('^'+location.protocol, 'i');
			return function(options, userOptions, jqXHR) {

				// Only continue if the request is: asynchronous, uses GET or POST method, has HTTP or HTTPS protocol, and has the same scheme as the calling page
				if (!options.crossDomain || options.username || (options.xhrFields && options.xhrFields.withCredentials) || !options.async || !getOrPostRegEx.test(options.type) || !httpRegEx.test(options.url) || !sameSchemeRegEx.test(options.url) || (options.data && options.data instanceof mOxie.FormData) || noxhr.test(options.dataType || '')) {
					return;
				}

				var xdr = null;
				webshim.info('xdomain transport used.');

				return {
					send: function(headers, complete) {
						var postData = '';
						var userType = (userOptions.dataType || '').toLowerCase();

						xdr = new XDomainRequest();
						if (/^\d+$/.test(userOptions.timeout)) {
							xdr.timeout = userOptions.timeout;
						}

						xdr.ontimeout = function() {
							complete(500, 'timeout');
						};

						xdr.onload = function() {
							var allResponseHeaders = 'Content-Length: ' + xdr.responseText.length + '\r\nContent-Type: ' + xdr.contentType;
							var status = {
								code: xdr.status || 200,
								message: xdr.statusText || 'OK'
							};
							var responses = {
								text: xdr.responseText,
								xml: xdr.responseXML
							};
							try {
								if (userType === 'html' || /text\/html/i.test(xdr.contentType)) {
									responses.html = xdr.responseText;
								} else if (userType === 'json' || (userType !== 'text' && /\/json/i.test(xdr.contentType))) {
									try {
										responses.json = $.parseJSON(xdr.responseText);
									} catch(e) {

									}
								} else if (userType === 'xml' && !xdr.responseXML) {
									var doc;
									try {
										doc = new ActiveXObject('Microsoft.XMLDOM');
										doc.async = false;
										doc.loadXML(xdr.responseText);
									} catch(e) {

									}

									responses.xml = doc;
								}
							} catch(parseMessage) {}
							complete(status.code, status.message, responses, allResponseHeaders);
						};

						// set an empty handler for 'onprogress' so requests don't get aborted
						xdr.onprogress = function(){};
						xdr.onerror = function() {
							complete(500, 'error', {
								text: xdr.responseText
							});
						};

						if (userOptions.data) {
							postData = ($.type(userOptions.data) === 'string') ? userOptions.data : $.param(userOptions.data);
						}
						xdr.open(options.type, options.url);
						xdr.send(postData);
					},
					abort: function() {
						if (xdr) {
							xdr.abort();
						}
					}
				};
			};
		})(),
		moxie: function (options, originalOptions, jqXHR){
			if(testMoxie(options)){
				loadMoxie(options);
				var ajax;

				var tmpTransport = {
					send: function( headers, completeCallback ) {
						ajax = true;
						webshim.ready('moxie', function(){
							if(ajax){
								ajax = createMoxieTransport(options, originalOptions, jqXHR);
								tmpTransport.send = ajax.send;
								tmpTransport.abort = ajax.abort;
								ajax.send(headers, completeCallback);
							}
						});
					},
					abort: function() {
						ajax = false;
					}
				};
				return tmpTransport;
			}
		}
	};

	if(!featureOptions.progress){
		featureOptions.progress = 'onprogress';
	}

	if(!featureOptions.uploadprogress){
		featureOptions.uploadprogress = 'onuploadprogress';
	}

	if(!featureOptions.swfpath){
		featureOptions.swfpath = shimMoxiePath+'flash/Moxie.min.swf';
	}
	if(!featureOptions.xappath){
		featureOptions.xappath = shimMoxiePath+'silverlight/Moxie.min.xap';
	}

	if($.support.cors !== false || !window.XDomainRequest){
		delete transports.xdomain;
	}


	$.ajaxTransport("+*", function( options, originalOptions, jqXHR ) {
		var ajax, type;

		if(options.wsType || transports[transports]){
			ajax = transports[transports](options, originalOptions, jqXHR);
		}
		if(!ajax){
			for(type in transports){
				ajax = transports[type](options, originalOptions, jqXHR);
				if(ajax){break;}
			}
		}
		return ajax;
	});

	webshim.defineNodeNameProperty('input', 'files', {
			prop: {
				writeable: false,
				get: function(){
					if(this.type != 'file'){return null;}
					if(!$(this).hasClass('ws-filereader')){
						webshim.info("please add the 'ws-filereader' class to your input[type='file'] to implement files-property");
					}
					return webshim.data(this, 'fileList') || [];
				}
			}
		}
	);

	webshim.reflectProperties(['input'], ['accept']);

	if($('<input />').prop('multiple') == null){
		webshim.defineNodeNamesBooleanProperty(['input'], ['multiple']);
	}

	webshim.onNodeNamesPropertyModify('input', 'disabled', function(value, boolVal, type){
		var picker = webshim.data(this, 'filePicker');
		if(picker){
			picker.disable(boolVal);
		}
	});

	webshim.onNodeNamesPropertyModify('input', 'value', function(value, boolVal, type){
		if(value === '' && this.type == 'file' && $(this).hasClass('ws-filereader')){
			webshim.data(this, 'fileList', []);
		}
	});


	window.FileReader = notReadyYet;
	window.FormData = notReadyYet;
	webshim.ready('moxie', function(){
		var wsMimes = 'application/xml,xml';
		moxie = window.moxie;
		mOxie = window.mOxie;

		mOxie.Env.swf_url = featureOptions.swfpath;
		mOxie.Env.xap_url = featureOptions.xappath;

		window.FileReader = mOxie.FileReader;

		window.FormData = function(form){
			var appendData, i, len, files, fileI, fileLen, inputName;
			var moxieData = new mOxie.FormData();
			if(form && $.nodeName(form, 'form')){
				appendData = $(form).serializeArray();
				for(i = 0; i < appendData.length; i++){
					if(Array.isArray(appendData[i].value)){
						appendData[i].value.forEach(function(val){
							moxieData.append(appendData[i].name, val);
						});
					} else {
						moxieData.append(appendData[i].name, appendData[i].value);
					}
				}

				appendData = form.querySelectorAll('input[type="file"][name]');

				for(i = 0, len = appendData.length; i < appendData.length; i++){
					inputName = appendData[i].name;
					if(inputName && !$(appendData[i]).is(':disabled')){
						files = $.prop(appendData[i], 'files') || [];
						if(files.length){
							if(files.length > 1 || (moxieData.hasBlob && moxieData.hasBlob())){
								webshim.error('FormData shim can only handle one file per ajax. Use multiple ajax request. One per file.');
							}
							for(fileI = 0, fileLen = files.length; fileI < fileLen; fileI++){
								moxieData.append(inputName, files[fileI]);
							}
						}
					}
				}
			}

			return moxieData;
		};
		FormData = window.FormData;

		createFilePicker = _createFilePicker;
		transports.moxie = createMoxieTransport;

		featureOptions.mimeTypes = (featureOptions.mimeTypes) ? wsMimes+','+featureOptions.mimeTypes : wsMimes;
		try {
			mOxie.Mime.addMimeType(featureOptions.mimeTypes);
		} catch(e){
			webshim.warn('mimetype to moxie error: '+e);
		}

	});

	webshim.addReady(function(context, contextElem){
		$(context.querySelectorAll(sel)).add(contextElem.filter(sel)).each(createFilePicker);
	});
	webshim.ready('WINDOWLOAD', loadMoxie);

	if(webshim.cfg.debug !== false && featureOptions.swfpath.indexOf((location.protocol+'//'+location.hostname)) && featureOptions.swfpath.indexOf(('https://'+location.hostname))){
		webshim.ready('WINDOWLOAD', function(){

			var printMessage = function(){
				if(hasXDomain == 'no'){
					webshim.error(crossXMLMessage);
				}
			};

			try {
				hasXDomain = sessionStorage.getItem('wsXdomain.xml');
			} catch(e){}
			printMessage();
			if(hasXDomain == null){
				$.ajax({
					url: 'crossdomain.xml',
					type: 'HEAD',
					dataType: 'xml',
					success: function(){
						hasXDomain = 'yes';
					},
					error: function(){
						hasXDomain = 'no';
					},
					complete: function(){
						try {
							sessionStorage.setItem('wsXdomain.xml', hasXDomain);
						} catch(e){}
						printMessage();
					}
				});
			}
		});
	}
});
;webshims.register('mediaelement-jaris', function($, webshims, window, document, undefined, options){
	"use strict";

	var mediaelement = webshims.mediaelement;
	var swfmini = window.swfmini;
	var support = webshims.support;
	var hasNative = support.mediaelement;
	var hasFlash = swfmini.hasFlashPlayerVersion('11.3');
	var loadedSwf = 0;
	var needsLoadPreload = 'ActiveXObject' in window && hasNative;
	var getProps = {
		paused: true,
		ended: false,
		currentSrc: '',
		duration: window.NaN,
		readyState: 0,
		networkState: 0,
		videoHeight: 0,
		videoWidth: 0,
		seeking: false,
		error: null,
		buffered: {
			start: function(index){
				if(index){
					webshims.error('buffered index size error');
					return;
				}
				return 0;
			},
			end: function(index){
				if(index){
					webshims.error('buffered index size error');
					return;
				}
				return 0;
			},
			length: 0
		}
	};
	var getPropKeys = Object.keys(getProps);

	var getSetProps = {
		currentTime: 0,
		volume: 1,
		muted: false
	};
	var getSetPropKeys = Object.keys(getSetProps);

	var playerStateObj = $.extend({
		isActive: 'html5',
		activating: 'html5',
		wasSwfReady: false,
		_bufferedEnd: 0,
		_bufferedStart: 0,
		currentTime: 0,
		lastCalledTime: -500,
		_ppFlag: undefined,
		_calledMeta: false,
		lastDuration: 0,
		_timeDif: 0.3
	}, getProps, getSetProps);


	var getSwfDataFromElem = function(elem){
		try {
			(elem.nodeName);
		} catch(er){
			return null;
		}
		var data = webshims.data(elem, 'mediaelement');
		return (data && data.isActive == 'third') ? data : null;
	};

	var trigger = function(elem, evt){
		evt = $.Event(evt);
		evt.preventDefault();
		$.event.trigger(evt, undefined, elem);
	};

	var playerSwfPath = options.playerPath || webshims.cfg.basePath + "swf/" + (options.playerName || 'JarisFLVPlayer.swf');

	webshims.extendUNDEFProp(options.params, {
		allowscriptaccess: 'always',
		allowfullscreen: 'true',
		wmode: 'transparent',
		allowNetworking: 'all'
	});
	webshims.extendUNDEFProp(options.vars, {
		controltype: '1',
		jsapi: '1'
	});
	webshims.extendUNDEFProp(options.attrs, {
		bgcolor: '#000000'
	});
	options.playerPath = playerSwfPath;

	var setReadyState = function(readyState, data){
		if(readyState < 3){
			clearTimeout(data._canplaythroughTimer);
		}
		if(readyState >= 3 && data.readyState < 3){
			data.readyState = readyState;
			trigger(data._elem, 'canplay');
			if(!data.paused){
				trigger(data._elem, 'playing');
			}
			clearTimeout(data._canplaythroughTimer);
			data._canplaythroughTimer = setTimeout(function(){
				setReadyState(4, data);
			}, 4000);
		}
		if(readyState >= 4 && data.readyState < 4){
			data.readyState = readyState;
			trigger(data._elem, 'canplaythrough');
		}
		data.readyState = readyState;
	};
	var callSeeked = function(data){
		if(data.seeking && Math.abs(data.currentTime - data._lastSeektime) < 2){
			data.seeking = false;
			$(data._elem).triggerHandler('seeked');
		}
	};


	mediaelement.jarisEvent = {};
	var localConnectionTimer;
	var onEvent = {
		onPlayPause: function(jaris, data, override){
			var playing, type;
			var idled = data.paused || data.ended;
			if(override == null){
				try {
					playing = data.api.api_get("isPlaying");
				} catch(e){}
			} else {
				playing = override;
			}
			if(playing == idled || playing == null){

				data.paused = !playing;
				type = data.paused ? 'pause' : 'play';
				data._ppFlag = true;
				trigger(data._elem, type);
				if(data.readyState < 3){
					setReadyState(3, data);
				}
				if(!data.paused){
					trigger(data._elem, 'playing');
				}
			}
		},
		onSeek: function(jaris, data){
			data._lastSeektime = jaris.seekTime;

			data.seeking = true;
			$(data._elem).triggerHandler('seeking');
			clearTimeout(data._seekedTimer);
			data._seekedTimer = setTimeout(function(){
				callSeeked(data);
				data.seeking = false;
			}, 300);
		},
		onConnectionFailed: function(jaris, data){
			mediaelement.setError(data._elem, 'flash connection error');
		},
		onNotBuffering: function(jaris, data){
			setReadyState(3, data);
		},
		onDataInitialized: function(jaris, data){

			var oldDur = data.duration;
			var durDelta;
			data.duration = jaris.duration;
			if(oldDur == data.duration || isNaN(data.duration)){return;}

			if(data._calledMeta && ((durDelta = Math.abs(data.lastDuration - data.duration)) < 2)){return;}



			data.videoHeight = jaris.height;
			data.videoWidth = jaris.width;

			if(!data.networkState){
				data.networkState = 2;
			}
			if(data.readyState < 1){
				setReadyState(1, data);
			}
			clearTimeout(data._durationChangeTimer);
			if(data._calledMeta && data.duration){
				data._durationChangeTimer = setTimeout(function(){
					data.lastDuration = data.duration;
					trigger(data._elem, 'durationchange');
				}, durDelta > 50 ? 0 : durDelta > 9 ? 9 : 99);
			} else {
				data.lastDuration = data.duration;
				if(data.duration){
					trigger(data._elem, 'durationchange');
				}
				if(!data._calledMeta){
					trigger(data._elem, 'loadedmetadata');
				}

				if(data.duration > 1 && data.duration < 140){
					data._timeDif = 0.2;
				} else if(data.duration < 600) {
					data._timeDif = 0.25;
				} else {
					data._timeDif = 0.30;
				}
			}
			data._calledMeta = true;
		},
		onBuffering: function(jaris, data){
			if(data.ended){
				data.ended = false;
			}
			setReadyState(1, data);
			trigger(data._elem, 'waiting');
		},
		onTimeUpdate: function(jaris, data){
			var timeDif = data.currentTime - data.lastCalledTime;
			if(data.ended){
				data.ended = false;
			}
			if(data.readyState < 3){
				setReadyState(3, data);
				trigger(data._elem, 'playing');
			}
			if(data.seeking){
				callSeeked(data);
			}

			if(timeDif > data._timeDif || timeDif < -0.3){
				data.lastCalledTime = data.currentTime;
				$.event.trigger('timeupdate', undefined, data._elem, true);
			}

		},
		onProgress: function(jaris, data){
			if(data.ended){
				data.ended = false;
			}
			if(!data.duration || isNaN(data.duration)){
				return;
			}
			var percentage = jaris.loaded / jaris.total;

			if(percentage > 0.02 && percentage < 0.2){
				setReadyState(3, data);
			} else if(percentage > 0.2){
				if(percentage > 0.95){
					percentage = 1;
					data.networkState = 1;
				}
				setReadyState(4, data);
			}
			if(data._bufferedEnd && (data._bufferedEnd > percentage)){
				data._bufferedStart = data.currentTime || 0;
			}

			data._bufferedEnd = percentage;
			data.buffered.length = 1;

			$.event.trigger('progress', undefined, data._elem, true);
		},
		onPlaybackFinished: function(jaris, data){
			if(data.readyState < 4){
				setReadyState(4, data);
			}
			data.ended = true;
			trigger(data._elem, 'ended');
		},
		onVolumeChange: function(jaris, data){
			if(data.volume != jaris.volume || data.muted != jaris.mute){
				data.volume = jaris.volume;
				data.muted = jaris.mute;
				trigger(data._elem, 'volumechange');
			}
		},
		ready: (function(){
			var testAPI = function(data){
				var passed = true;

				try {
					data.api.api_get('volume');
				} catch(er){
					passed = false;
				}
				return passed;
			};

			return function(jaris, data){
				var i = 0;

				var doneFn = function(){
					if(i > 9){
						data.tryedReframeing = 0;
						return;
					}
					i++;

					data.tryedReframeing++;
					if(testAPI(data)){
						data.wasSwfReady = true;
						data.tryedReframeing = 0;
						startAutoPlay(data);
						workActionQueue(data);
					} else if(data.tryedReframeing < 6) {
						if(data.tryedReframeing < 3){
							data.reframeTimer = setTimeout(doneFn, 9);
							data.shadowElem.css({overflow: 'visible'});
							setTimeout(function(){
								data.shadowElem.css({overflow: 'hidden'});
							}, 1);
						} else {
							data.shadowElem.css({overflow: 'hidden'});
							$(data._elem).mediaLoad();
						}
					} else {
						clearTimeout(data.reframeTimer);
						webshims.error("reframing error");
					}
				};
				if(!data || !data.api){return;}
				if(!data.tryedReframeing){
					data.tryedReframeing = 0;
				}
				clearTimeout(localConnectionTimer);
				clearTimeout(data.reframeTimer);
				data.shadowElem.removeClass('flashblocker-assumed');

				if(!i){
					doneFn();
				} else {
					data.reframeTimer = setTimeout(doneFn, 9);
				}

			};
		})()
	};

	onEvent.onMute = onEvent.onVolumeChange;


	var workActionQueue = function(data){
		var actionLen = data.actionQueue.length;
		var i = 0;
		var operation;

		if(actionLen && data.isActive == 'third'){
			while(data.actionQueue.length && actionLen > i){
				i++;
				operation = data.actionQueue.shift();
				try{
					data.api[operation.fn].apply(data.api, operation.args);
				} catch(er){
					webshims.warn(er);
				}
			}
		}
		if(data.actionQueue.length){
			data.actionQueue = [];
		}
	};
	var startAutoPlay = function(data){
		if(!data){return;}
		if( (data._ppFlag === undefined && ($.prop(data._elem, 'autoplay')) || !data.paused)){
			setTimeout(function(){
				if(data.isActive == 'third' && (data._ppFlag === undefined || !data.paused)){

					try {
						$(data._elem).play();
						data._ppFlag = true;
					} catch(er){}
				}
			}, 1);
		}

		if(data.muted){
			$.prop(data._elem, 'muted', true);
		}
		if(data.volume != 1){
			$.prop(data._elem, 'volume', data.volume);
		}
	};


	var addMediaToStopEvents = $.noop;
	if(hasNative){
		var stopEvents = {
			play: 1,
			playing: 1
		};
		var hideEvtArray = ['play', 'pause', 'playing', 'loadstart', 'canplay', 'progress', 'waiting', 'ended', 'loadedmetadata', 'durationchange', 'emptied'];
		var hidevents = hideEvtArray.map(function(evt){
			return evt +'.webshimspolyfill';
		}).join(' ');

		var hidePlayerEvents = function(event){
			var data = webshims.data(event.target, 'mediaelement');
			if(!data){return;}
			var isNativeHTML5 = ( event.originalEvent && event.originalEvent.type === event.type );
			if( isNativeHTML5 == (data.activating == 'third') ){
				event.stopImmediatePropagation();

				if(stopEvents[event.type]){
					if(data.isActive != data.activating){
						$(event.target).pause();
					} else if(isNativeHTML5){
						($.prop(event.target, 'pause')._supvalue || $.noop).apply(event.target);
					}
				}
			}
		};

		addMediaToStopEvents = function(elem){
			$(elem)
				.off(hidevents)
				.on(hidevents, hidePlayerEvents)
			;
			hideEvtArray.forEach(function(evt){
				webshims.moveToFirstEvent(elem, evt);
			});
		};
		addMediaToStopEvents(document);
	}


	mediaelement.setActive = function(elem, type, data){
		if(!data){
			data = webshims.data(elem, 'mediaelement');
		}
		if(!data || data.isActive == type){return;}
		if(type != 'html5' && type != 'third'){
			webshims.warn('wrong type for mediaelement activating: '+ type);
		}
		var shadowData = webshims.data(elem, 'shadowData');
		data.activating = type;
		$(elem).pause();
		data.isActive = type;
		if(type == 'third'){
			shadowData.shadowElement = shadowData.shadowFocusElement = data.shadowElem[0];
			$(elem).addClass('swf-api-active nonnative-api-active').hide().getShadowElement().show();
		} else {
			$(elem).removeClass('swf-api-active nonnative-api-active').show().getShadowElement().hide();
			shadowData.shadowElement = shadowData.shadowFocusElement = false;
		}
		$(elem).trigger('mediaelementapichange');
	};



	var resetSwfProps = (function(){
		var resetProtoProps = ['_calledMeta', 'lastDuration', '_bufferedEnd', 'lastCalledTime', '_bufferedStart', '_ppFlag', 'currentSrc', 'currentTime', 'duration', 'ended', 'networkState', 'paused', 'seeking', 'videoHeight', 'videoWidth'];
		var len = resetProtoProps.length;
		return function(data){

			if(!data){return;}
			clearTimeout(data._seekedTimer);
			var lenI = len;
			var networkState = data.networkState;
			setReadyState(0, data);
			clearTimeout(data._durationChangeTimer);
			while(--lenI > -1){
				delete data[resetProtoProps[lenI]];
			}
			data.actionQueue = [];
			data.buffered.length = 0;
			if(networkState){
				trigger(data._elem, 'emptied');
			}
		};
	})();


	var getComputedDimension = (function(){
		var dimCache = {};
		var getVideoDims = function(data){
			var ret, poster, img;
			if(dimCache[data.currentSrc]){
				ret = dimCache[data.currentSrc];
			} else if(data.videoHeight && data.videoWidth){
				dimCache[data.currentSrc] = {
					width: data.videoWidth,
					height: data.videoHeight
				};
				ret = dimCache[data.currentSrc];
			} else if((poster = $.attr(data._elem, 'poster'))){
				ret = dimCache[poster];
				if(!ret){
					img = document.createElement('img');
					img.onload = function(){
						dimCache[poster] = {
							width: this.width,
							height: this.height
						};

						if(dimCache[poster].height && dimCache[poster].width){
							setElementDimension(data, $.prop(data._elem, 'controls'));
						} else {
							delete dimCache[poster];
						}
						img.onload = null;
					};
					img.src = poster;
					if(img.complete && img.onload){
						img.onload();
					}
				}
			}
			return ret || {width: 300, height: data._elemNodeName == 'video' ? 150 : 50};
		};

		var getCssStyle = function(elem, style){
			return elem.style[style] || (elem.currentStyle && elem.currentStyle[style]) || (window.getComputedStyle && (window.getComputedStyle( elem, null ) || {} )[style]) || '';
		};
		var minMaxProps = ['minWidth', 'maxWidth', 'minHeight', 'maxHeight'];

		var addMinMax = function(elem, ret){
			var i, prop;
			var hasMinMax = false;
			for (i = 0; i < 4; i++) {
				prop = getCssStyle(elem, minMaxProps[i]);
				if(parseFloat(prop, 10)){
					hasMinMax = true;
					ret[minMaxProps[i]] = prop;
				}
			}
			return hasMinMax;
		};
		var retFn = function(data){
			var videoDims, ratio, hasMinMax;
			var elem = data._elem;
			var autos = {
				width: getCssStyle(elem, 'width') == 'auto',
				height: getCssStyle(elem, 'height') == 'auto'
			};
			var ret  = {
				width: !autos.width && $(elem).width(),
				height: !autos.height && $(elem).height()
			};

			if(autos.width || autos.height){
				videoDims = getVideoDims(data);
				ratio = videoDims.width / videoDims.height;

				if(autos.width && autos.height){
					ret.width = videoDims.width;
					ret.height = videoDims.height;
				} else if(autos.width){
					ret.width = ret.height * ratio;
				} else if(autos.height){
					ret.height = ret.width / ratio;
				}

				if(addMinMax(elem, ret)){
					data.shadowElem.css(ret);
					if(autos.width){
						ret.width = data.shadowElem.height() * ratio;
					}
					if(autos.height){
						ret.height = ((autos.width) ? ret.width :  data.shadowElem.width()) / ratio;
					}
					if(autos.width && autos.height){
						data.shadowElem.css(ret);
						ret.height = data.shadowElem.width() / ratio;
						ret.width = ret.height * ratio;

						data.shadowElem.css(ret);
						ret.width = data.shadowElem.height() * ratio;
						ret.height = ret.width / ratio;

					}
					if(!webshims.support.mediaelement){
						ret.width = data.shadowElem.width();
						ret.height = data.shadowElem.height();
					}
				}
			}
			return ret;
		};

		return retFn;
	})();

	var setElementDimension = function(data, hasControls){
		var dims;

		var box = data.shadowElem;
		$(data._elem)[hasControls ? 'addClass' : 'removeClass']('webshims-controls');

		if(data.isActive == 'third' || data.activating == 'third'){
			if(data._elemNodeName == 'audio' && !hasControls){
				box.css({width: 0, height: 0});
			} else {
				data._elem.style.display = '';
				dims = getComputedDimension(data);
				data._elem.style.display = 'none';
				box.css(dims);
			}
		}
	};

	var bufferSrc = (function(){
		var preloads = {
			'': 1,
			'auto': 1
		};
		return function(elem){
			var preload = $.attr(elem, 'preload');
			if(preload == null || preload == 'none' || $.prop(elem, 'autoplay')){
				return false;
			}
			preload =  $.prop(elem, 'preload');
			return !!(preloads[preload] || (preload == 'metadata' && $(elem).is('.preload-in-doubt, video:not([poster])')));
		};
	})();

	var regs = {
			A: /&amp;/g,
			a: /&/g,
			e: /\=/g,
			q: /\?/g
		},
		replaceVar = function(val){
			return (val.replace) ? val.replace(regs.A, '%26').replace(regs.a, '%26').replace(regs.e, '%3D').replace(regs.q, '%3F') : val;
		};

	if('matchMedia' in window){
		var allowMediaSorting = false;
		try {
			allowMediaSorting = window.matchMedia('only all').matches;
		} catch(er){}
		if(allowMediaSorting){
			mediaelement.sortMedia = function(src1, src2){
				try {
					src1 = !src1.media || matchMedia( src1.media ).matches;
					src2 = !src2.media || matchMedia( src2.media ).matches;
				} catch(er){
					return 0;
				}
				return src1 == src2 ?
					0 :
					src1 ? -1
						: 1;
			};
		}
	}

	mediaelement.createSWF = function( elem, canPlaySrc, data ){
		if(!hasFlash){
			setTimeout(function(){
				$(elem).mediaLoad(); //<- this should produce a mediaerror
			}, 1);
			return;
		}

		var attrStyle = {};

		if(loadedSwf < 1){
			loadedSwf = 1;
		} else {
			loadedSwf++;
		}
		if(!data){
			data = webshims.data(elem, 'mediaelement');
		}

		if((attrStyle.height = $.attr(elem, 'height') || '') || (attrStyle.width = $.attr(elem, 'width') || '')){
			$(elem).css(attrStyle);
			webshims.warn("width or height content attributes used. Webshims prefers the usage of CSS (computed styles or inline styles) to detect size of a video/audio. It's really more powerfull.");
		}

		var isRtmp = canPlaySrc.type == 'audio/rtmp' || canPlaySrc.type == 'video/rtmp';
		var vars = $.extend({}, options.vars, {
			poster: replaceVar($.attr(elem, 'poster') && $.prop(elem, 'poster') || ''),
			source: replaceVar(canPlaySrc.streamId || canPlaySrc.srcProp),
			server: replaceVar(canPlaySrc.server || '')
		});
		var elemVars = $(elem).data('vars') || {};



		var hasControls = $.prop(elem, 'controls');
		var elemId = 'jarisplayer-'+ webshims.getID(elem);

		var params = $.extend(
			{},
			options.params,
			$(elem).data('params')
		);
		var elemNodeName = elem.nodeName.toLowerCase();
		var attrs = $.extend(
			{},
			options.attrs,
			{
				name: elemId,
				id: elemId
			},
			$(elem).data('attrs')
		);
		var setDimension = function(){
			if(data.isActive == 'third'){
				setElementDimension(data, $.prop(elem, 'controls'));
			}
		};

		var box;

		if(data && data.swfCreated){
			mediaelement.setActive(elem, 'third', data);

			data.currentSrc = '';

			data.shadowElem.html('<div id="'+ elemId +'">');

			data.api = false;
			data.actionQueue = [];
			box = data.shadowElem;
			resetSwfProps(data);
			data.currentSrc = canPlaySrc.srcProp;

		} else {
			$(document.getElementById('wrapper-'+ elemId )).remove();
			box = $('<div class="polyfill-'+ (elemNodeName) +' polyfill-mediaelement '+ webshims.shadowClass +'" id="wrapper-'+ elemId +'"><div id="'+ elemId +'"></div>')
				.css({
					position: 'relative',
					overflow: 'hidden'
				})
			;
			data = webshims.data(elem, 'mediaelement', webshims.objectCreate(playerStateObj, {
				actionQueue: {
					value: []
				},
				shadowElem: {
					value: box
				},
				_elemNodeName: {
					value: elemNodeName
				},
				_elem: {
					value: elem
				},
				currentSrc: {
					value: canPlaySrc.srcProp
				},
				swfCreated: {
					value: true
				},
				id: {
					value: elemId.replace(/-/g, '')
				},
				buffered: {
					value: {
						start: function(index){
							if(index >= data.buffered.length){
								webshims.error('buffered index size error');
								return;
							}
							return 0;
						},
						end: function(index){
							if(index >= data.buffered.length){
								webshims.error('buffered index size error');
								return;
							}
							return ( (data.duration - data._bufferedStart) * data._bufferedEnd) + data._bufferedStart;
						},
						length: 0
					}
				}
			}));



			box.insertBefore(elem);

			if(hasNative){
				$.extend(data, {volume: $.prop(elem, 'volume'), muted: $.prop(elem, 'muted'), paused: $.prop(elem, 'paused')});
			}

			webshims.addShadowDom(elem, box);
			if(!webshims.data(elem, 'mediaelement')){
				webshims.data(elem, 'mediaelement', data);
			}
			addMediaToStopEvents(elem);

			mediaelement.setActive(elem, 'third', data);

			setElementDimension(data, hasControls);

			$(elem)
				.on({
					'updatemediaelementdimensions loadedmetadata emptied': setDimension,
					'remove': function(e){
						if(!e.originalEvent && mediaelement.jarisEvent[data.id] && mediaelement.jarisEvent[data.id].elem == elem){
							delete mediaelement.jarisEvent[data.id];
							clearTimeout(localConnectionTimer);
							clearTimeout(data.flashBlock);
						}
					}
				})
				.onWSOff('updateshadowdom', setDimension)
			;
		}

		if(mediaelement.jarisEvent[data.id] && mediaelement.jarisEvent[data.id].elem != elem){
			webshims.error('something went wrong');
			return;
		} else if(!mediaelement.jarisEvent[data.id]){

			mediaelement.jarisEvent[data.id] = function(jaris){

				if(jaris.type == 'ready'){
					var onReady = function(){
						if(data.api){
							if(!data.paused){
								data.api.api_play();
							}
							if(bufferSrc(elem)){
								data.api.api_preload();
							}
							onEvent.ready(jaris, data);
						}
					};
					if(data.api){
						onReady();
					} else {
						setTimeout(onReady, 9);
					}
				} else {
					data.currentTime = jaris.position;

					if(data.api){
						if(!data._calledMeta && isNaN(jaris.duration) && data.duration != jaris.duration && isNaN(data.duration)){
							onEvent.onDataInitialized(jaris, data);
						}

						if(!data._ppFlag && jaris.type != 'onPlayPause'){
							onEvent.onPlayPause(jaris, data);
						}

						if(onEvent[jaris.type]){
							onEvent[jaris.type](jaris, data);
						}
					}
					data.duration = jaris.duration;
				}
			};
			mediaelement.jarisEvent[data.id].elem = elem;
		}

		$.extend(vars,
			{
				id: elemId,
				evtId: data.id,
				controls: ''+hasControls,
				autostart: 'false',
				nodename: elemNodeName
			},
			elemVars
		);

		if(isRtmp){
			vars.streamtype = 'rtmp';
		} else if(canPlaySrc.type == 'audio/mpeg' || canPlaySrc.type == 'audio/mp3'){
			vars.type = 'audio';
			vars.streamtype = 'file';
		} else if(canPlaySrc.type == 'video/youtube'){
			vars.streamtype = 'youtube';
		}
		options.changeSWF(vars, elem, canPlaySrc, data, 'embed');
		clearTimeout(data.flashBlock);

		swfmini.embedSWF(playerSwfPath, elemId, "100%", "100%", "9.0.115", false, vars, params, attrs, function(swfData){
			if(swfData.success){
				var fBlocker = function(){
					if((!swfData.ref.parentNode && box[0].parentNode) || swfData.ref.style.display == "none"){
						box.addClass('flashblocker-assumed');
						$(elem).trigger('flashblocker');
						webshims.warn("flashblocker assumed");
					}
					$(swfData.ref).css({'minHeight': '2px', 'minWidth': '2px', display: 'block'});
				};
				data.api = swfData.ref;

				if(!hasControls){
					$(swfData.ref).attr('tabindex', '-1').css('outline', 'none');
				}

				data.flashBlock = setTimeout(fBlocker, 99);

				if(!localConnectionTimer){
					clearTimeout(localConnectionTimer);
					localConnectionTimer = setTimeout(function(){
						fBlocker();
						var flash = $(swfData.ref);
						if(flash[0].offsetWidth > 1 && flash[0].offsetHeight > 1 && location.protocol.indexOf('file:') === 0){
							webshims.error("Add your local development-directory to the local-trusted security sandbox:  http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html");
						} else if(flash[0].offsetWidth < 2 || flash[0].offsetHeight < 2) {
							webshims.warn("JS-SWF connection can't be established on hidden or unconnected flash objects");
						}
						flash = null;
					}, 8000);
				}
			}
		});

		trigger(data._elem, 'loadstart');
	};


	var queueSwfMethod = function(elem, fn, args, data){
		data = data || getSwfDataFromElem(elem);

		if(data){
			if(data.api && data.api[fn]){
				data.api[fn].apply(data.api, args || []);
			} else {
				//todo add to queue
				data.actionQueue.push({fn: fn, args: args});

				if(data.actionQueue.length > 10){
					setTimeout(function(){
						if(data.actionQueue.length > 5){
							data.actionQueue.shift();
						}
					}, 99);
				}
			}
			return data;
		}
		return false;
	};

	['audio', 'video'].forEach(function(nodeName){
		var descs = {};
		var mediaSup;
		var createGetProp = function(key){
			if(nodeName == 'audio' && (key == 'videoHeight' || key == 'videoWidth')){return;}

			descs[key] = {
				get: function(){
					var data = getSwfDataFromElem(this);
					if(data){
						return data[key];
					} else if(hasNative && mediaSup[key].prop._supget) {
						return mediaSup[key].prop._supget.apply(this);
					} else {
						return playerStateObj[key];
					}
				},
				writeable: false
			};
		};
		var createGetSetProp = function(key, setFn){
			createGetProp(key);
			delete descs[key].writeable;
			descs[key].set = setFn;
		};

		createGetSetProp('seeking');

		createGetSetProp('volume', function(v){
			var data = getSwfDataFromElem(this);
			if(data){
				v *= 1;
				if(!isNaN(v)){

					if(v < 0 || v > 1){
						webshims.error('volume greater or less than allowed '+ (v / 100));
					}

					queueSwfMethod(this, 'api_volume', [v], data);


					if(data.volume != v){
						data.volume = v;
						trigger(data._elem, 'volumechange');
					}
					data = null;
				}
			} else if(mediaSup.volume.prop._supset) {
				return mediaSup.volume.prop._supset.apply(this, arguments);
			}
		});

		createGetSetProp('muted', function(m){
			var data = getSwfDataFromElem(this);
			if(data){
				m = !!m;
				queueSwfMethod(this, 'api_muted', [m], data);
				if(data.muted != m){
					data.muted = m;
					trigger(data._elem, 'volumechange');
				}
				data = null;
			} else if(mediaSup.muted.prop._supset) {
				return mediaSup.muted.prop._supset.apply(this, arguments);
			}
		});


		createGetSetProp('currentTime', function(t){
			var data = getSwfDataFromElem(this);
			if(data){
				t *= 1;
				if (!isNaN(t)) {
					queueSwfMethod(this, 'api_seek', [t], data);
				}

			} else if(mediaSup.currentTime.prop._supset) {
				return mediaSup.currentTime.prop._supset.apply(this, arguments);
			}
		});

		['play', 'pause'].forEach(function(fn){
			descs[fn] = {
				value: function(){
					var data = getSwfDataFromElem(this);

					if(data){
						if(data.stopPlayPause){
							clearTimeout(data.stopPlayPause);
						}
						queueSwfMethod(this, fn == 'play' ? 'api_play' : 'api_pause', [], data);

						data._ppFlag = true;
						if(data.paused != (fn != 'play')){
							data.paused = fn != 'play';
							trigger(data._elem, fn);
						}
					} else if(mediaSup[fn].prop._supvalue) {
						return mediaSup[fn].prop._supvalue.apply(this, arguments);
					}
				}
			};
		});

		getPropKeys.forEach(createGetProp);

		webshims.onNodeNamesPropertyModify(nodeName, 'controls', function(val, boolProp){
			var data = getSwfDataFromElem(this);

			$(this)[boolProp ? 'addClass' : 'removeClass']('webshims-controls');

			if(data){
				if(nodeName == 'audio'){
					setElementDimension(data, boolProp);
				}
				queueSwfMethod(this, 'api_controls', [boolProp], data);
			}
		});


		webshims.onNodeNamesPropertyModify(nodeName, 'preload', function(val){
			var data, baseData, elem;


			if(bufferSrc(this)){
				data = getSwfDataFromElem(this);
				if(data){
					queueSwfMethod(this, 'api_preload', [], data);
				} else if(needsLoadPreload && this.paused && !this.error && !$.data(this, 'mediaerror') && !this.readyState && !this.networkState && !this.autoplay && $(this).is(':not(.nonnative-api-active)')){
					elem = this;
					baseData = webshims.data(elem, 'mediaelementBase') || webshims.data(elem, 'mediaelementBase', {});
					clearTimeout(baseData.loadTimer);
					baseData.loadTimer = setTimeout(function(){
						$(elem).mediaLoad();
					}, 9);
				}
			}
		});

		mediaSup = webshims.defineNodeNameProperties(nodeName, descs, 'prop');

		if(!support.mediaDefaultMuted){
			webshims.defineNodeNameProperties(nodeName, {
				defaultMuted: {
					get: function(){
						return $.attr(this, 'muted') != null;
					},
					set: function(val){
						if(val){
							$.attr(this, 'muted', '');
						} else {
							$(this).removeAttr('muted');
						}
					}
				}
			}, 'prop');
		}
	});

	var addCanvasBridge = function(){
		if(!window.CanvasRenderingContext2D){
			return false;
		}
		var _drawImage = CanvasRenderingContext2D.prototype.drawImage;
		var slice = Array.prototype.slice;
		var isVideo = {
			video: 1,
			VIDEO: 1
		};
		var tested = {};

		if(!_drawImage){
			webshim.error('canvas.drawImage feature is needed. In IE8 flashvanvas pro can be used');
		}

		CanvasRenderingContext2D.prototype.drawImage = function(elem){
			var data, img, args, imgData;
			var context = this;

			if(isVideo[elem.nodeName] && (data = webshims.data(elem, 'mediaelement')) && data.isActive == 'third' && data.api.api_image){

				try {
					imgData = data.api.api_image();
				} catch (er){
					webshims.error(er);
				}
				if(!tested[data.currentSrc]){
					tested[data.currentSrc] = true;
					if(imgData == null){
						webshims.error('video has to be same origin or a crossdomain.xml has to be provided. Video has to be visible for flash API');
					}
				}

				args = slice.call(arguments, 1);
				img = new Image();

				//todo find a performant sync way
				img.onload = function(){
					args.unshift(this);
					_drawImage.apply(context, args);
					img.onload = null;
				};

				img.src = 'data:image/jpeg;base64,'+imgData;

				if(img.complete){
					img.onload();
				}
				return;
			}
			return _drawImage.apply(this, arguments);
		};
		return true;
	};

	if(!addCanvasBridge()){
		webshims.ready('canvas', addCanvasBridge);
	}


	if(hasFlash && $.cleanData){
		var oldClean = $.cleanData;
		var objElem = document.createElement('object');
		var noRemove = {
			SetVariable: 1,
			GetVariable: 1,
			SetReturnValue: 1,
			GetReturnValue: 1
		};
		var flashNames = {
			object: 1,
			OBJECT: 1
		};

		$.cleanData = function(elems){
			var i, len, prop;
			var ret = oldClean.apply(this, arguments);
			if(elems && (len = elems.length) && loadedSwf){

				for(i = 0; i < len; i++){
					if(flashNames[elems[i].nodeName] && 'api_destroy' in elems[i]){
						loadedSwf--;
						try {
							elems[i].api_destroy();
							if(elems[i].readyState == 4){
								for (prop in elems[i]) {
									if (!noRemove[prop] && !objElem[prop] && typeof elems[i][prop] == "function") {
										elems[i][prop] = null;
									}
								}
							}
						} catch(er){console.log(er);}
					}
				}

			}
			return ret;
		};
	}

	if(!hasNative){

		['poster', 'src'].forEach(function(prop){
			webshims.defineNodeNamesProperty(prop == 'src' ? ['audio', 'video', 'source'] : ['video'], prop, {
				//attr: {},
				reflect: true,
				propType: 'src'
			});
		});

		webshims.defineNodeNamesProperty(['audio', 'video'], 'preload', {
			reflect: true,
			propType: 'enumarated',
			defaultValue: '',
			limitedTo: ['', 'auto', 'metadata', 'none']
		});

		webshims.reflectProperties('source', ['type', 'media']);


		['autoplay', 'controls'].forEach(function(name){
			webshims.defineNodeNamesBooleanProperty(['audio', 'video'], name);
		});

		webshims.defineNodeNamesProperties(['audio', 'video'], {
			HAVE_CURRENT_DATA: {
				value: 2
			},
			HAVE_ENOUGH_DATA: {
				value: 4
			},
			HAVE_FUTURE_DATA: {
				value: 3
			},
			HAVE_METADATA: {
				value: 1
			},
			HAVE_NOTHING: {
				value: 0
			},
			NETWORK_EMPTY: {
				value: 0
			},
			NETWORK_IDLE: {
				value: 1
			},
			NETWORK_LOADING: {
				value: 2
			},
			NETWORK_NO_SOURCE: {
				value: 3
			}

		}, 'prop');


		if(hasFlash){
			webshims.ready('WINDOWLOAD', function(){
				setTimeout(function(){
					if(!loadedSwf){
						document.createElement('img').src = playerSwfPath;
					}
				}, 9);
			});
		}
	} else if(!('media' in document.createElement('source'))){
		webshims.reflectProperties('source', ['media']);
	}

	if(hasNative && hasFlash && !options.preferFlash){
		var switchErrors = {
			3: 1,
			4: 1
		};
		var switchOptions = function(e){
			var media, error, parent;
			if(
				($(e.target).is('audio, video') || ((parent = e.target.parentNode) && $('source', parent).last()[0] == e.target)) &&
					(media = $(e.target).closest('audio, video')) && !media.hasClass('nonnative-api-active')
				){
				error = media.prop('error');
				setTimeout(function(){
					if(!media.hasClass('nonnative-api-active')){
						if(error && switchErrors[error.code]){
							options.preferFlash = true;
							document.removeEventListener('error', switchOptions, true);
							$('audio, video').each(function(){
								webshims.mediaelement.selectSource(this);
							});
							webshims.error("switching mediaelements option to 'preferFlash', due to an error with native player: "+e.target.currentSrc+" Mediaerror: "+ media.prop('error')+ ' error.code: '+ error.code);
						}
						webshims.warn('There was a mediaelement error. Run the following line in your console to get more info: webshim.mediaelement.loadDebugger();')
					}
				});


			}
		};

		document.addEventListener('error', switchOptions, true);
		setTimeout(function(){
			$('audio, video').each(function(){
				var error = $.prop(this, 'error');
				if(error && switchErrors[error]){
					switchOptions({target: this});
				}
			});
		});
	}

});
