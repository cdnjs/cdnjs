
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
	var supportGetSetAttribute = !('getSetAttribute' in $.support) || $.support.getSetAttribute;
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
		domPrefixes: ["webkit", "moz", "o", "ms", "ws"],

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
;webshims.register('track', function($, webshims, window, document, undefined){
	"use strict";
	var mediaelement = webshims.mediaelement;
	var id = new Date().getTime();
	//descriptions are not really shown, but they are inserted into the dom
	var showTracks = {subtitles: 1, captions: 1, descriptions: 1};
	var dummyTrack = $('<track />');
	var support = webshims.support;
	var supportTrackMod = support.ES5 && support.objectAccessor;
	var createEventTarget = function(obj){
		var eventList = {};
		obj.addEventListener = function(name, fn){
			if(eventList[name]){
				webshims.error('always use $.on to the shimed event: '+ name +' already bound fn was: '+ eventList[name] +' your fn was: '+ fn);
			}
			eventList[name] = fn;
			
		};
		obj.removeEventListener = function(name, fn){
			if(eventList[name] && eventList[name] != fn){
				webshims.error('always use $.on/$.off to the shimed event: '+ name +' already bound fn was: '+ eventList[name] +' your fn was: '+ fn);
			}
			if(eventList[name]){
				delete eventList[name];
			}
		};
		return obj;
	};
	
	var cueListProto = {
		getCueById: function(id){
			var cue = null;
			for(var i = 0, len = this.length; i < len; i++){
				if(this[i].id === id){
					cue = this[i];
					break;
				}
			}
			return cue;
		}
	};
	var numericModes = {
		0: 'disabled',
		1: 'hidden',
		2: 'showing'
	};
	
	var textTrackProto = {
		shimActiveCues: null,
		_shimActiveCues: null,
		activeCues: null,
		cues: null,
		kind: 'subtitles',
		label: '',
		language: '',
		id: '',
		mode: 'disabled',
		oncuechange: null,
		toString: function() {
			return "[object TextTrack]";
		},
		addCue: function(cue){
			if(!this.cues){
				this.cues = mediaelement.createCueList();
			} else {
				var lastCue = this.cues[this.cues.length-1];
				if(lastCue && lastCue.startTime > cue.startTime){
					webshims.error("cue startTime higher than previous cue's startTime");
				}
			}
			if(cue.track && cue.track.removeCue){
				cue.track.removeCue(cue);
			}
			cue.track = this;
			this.cues.push(cue);
		},
		//ToDo: make it more dynamic
		removeCue: function(cue){
			var cues = this.cues || [];
			var i = 0;
			var len = cues.length;
			if(cue.track != this){
				webshims.error("cue not part of track");
				return;
			}
			for(; i < len; i++){
				if(cues[i] === cue){
					cues.splice(i, 1);
					cue.track = null;
					break;
				}
			}
			if(cue.track){
				webshims.error("cue not part of track");
				return;
			}
		}/*,
		DISABLED: 'disabled',
		OFF: 'disabled',
		HIDDEN: 'hidden',
		SHOWING: 'showing',
		ERROR: 3,
		LOADED: 2,
		LOADING: 1,
		NONE: 0*/
	};
	var copyProps = ['kind', 'label', 'srclang'];
	var copyName = {srclang: 'language'};

	var updateMediaTrackList = function(baseData, trackList){
		var removed = [];
		var added = [];
		var newTracks = [];
		var i, len;
		if(!baseData){
			baseData =  webshims.data(this, 'mediaelementBase') || webshims.data(this, 'mediaelementBase', {});
		}
		
		if(!trackList){
			baseData.blockTrackListUpdate = true;
			trackList = $.prop(this, 'textTracks');
			baseData.blockTrackListUpdate = false;
		}
		
		clearTimeout(baseData.updateTrackListTimer);
		
		$('track', this).each(function(){
			var track = $.prop(this, 'track');
			newTracks.push(track);
			if(trackList.indexOf(track) == -1){
				added.push(track);
			}
		});
		
		if(baseData.scriptedTextTracks){
			for(i = 0, len = baseData.scriptedTextTracks.length; i < len; i++){
				newTracks.push(baseData.scriptedTextTracks[i]);
				if(trackList.indexOf(baseData.scriptedTextTracks[i]) == -1){
					added.push(baseData.scriptedTextTracks[i]);
				}
			}
		}
		
		for(i = 0, len = trackList.length; i < len; i++){
			if(newTracks.indexOf(trackList[i]) == -1){
				removed.push(trackList[i]);
			}
		}
		
		if(removed.length || added.length){
			trackList.splice(0);
			
			for(i = 0, len = newTracks.length; i < len; i++){
				trackList.push(newTracks[i]);
			}
			for(i = 0, len = removed.length; i < len; i++){
				$([trackList]).triggerHandler($.Event({type: 'removetrack', track: removed[i]}));
			}
			for(i = 0, len = added.length; i < len; i++){
				$([trackList]).triggerHandler($.Event({type: 'addtrack', track: added[i]}));
			}
			if(baseData.scriptedTextTracks || removed.length){
				$(this).triggerHandler('updatetrackdisplay');
			}
		}
	};
	
	var refreshTrack = function(track, trackData){
		if(!trackData){
			trackData = webshims.data(track, 'trackData');
		}
		
		if(trackData && !trackData.isTriggering){
			trackData.isTriggering = true;
			setTimeout(function(){
				$(track).closest('audio, video').triggerHandler('updatetrackdisplay');
				trackData.isTriggering = false;
			}, 1);
		}
	};
	var isDefaultTrack = (function(){
		var defaultKinds = {
			subtitles: {
				subtitles: 1,
				captions: 1
			},
			descriptions: {descriptions: 1},
			chapters: {chapters: 1}
		};
		defaultKinds.captions = defaultKinds.subtitles;
		
		return function(track){
			var kind, firstDefaultTrack;
			var isDefault = $.prop(track, 'default');
			if(isDefault && (kind = $.prop(track, 'kind')) != 'metadata'){
				firstDefaultTrack = $(track)
					.parent()
					.find('track[default]')
					.filter(function(){
						return !!(defaultKinds[kind][$.prop(this, 'kind')]);
					})[0]
				;
				if(firstDefaultTrack != track){
					isDefault = false;
					webshims.error('more than one default track of a specific kind detected. Fall back to default = false');
				}
			}
			return isDefault;
		};
	})();
	var emptyDiv = $('<div />')[0];

	function VTTCue(startTime, endTime, text){
		if(arguments.length != 3){
			webshims.error("wrong arguments.length for VTTCue.constructor");
		}

		this.startTime = startTime;
		this.endTime = endTime;
		this.text = text;
		this.onenter = null;
		this.onexit = null;
		this.pauseOnExit = false;
		this.track = null;
		this.id = null;
		this.getCueAsHTML = (function(){
			var lastText = "";
			var parsedText = "";
			var fragment;

			return function(){
				var i, len;
				if(!fragment){
					fragment = document.createDocumentFragment();
				}
				if(lastText != this.text){
					lastText = this.text;
					parsedText = mediaelement.parseCueTextToHTML(lastText);
					emptyDiv.innerHTML = parsedText;

					for(i = 0, len = emptyDiv.childNodes.length; i < len; i++){
						fragment.appendChild(emptyDiv.childNodes[i].cloneNode(true));
					}
				}
				return fragment.cloneNode(true);
			};

		})();
	}
	
	window.VTTCue = VTTCue;
	window.TextTrackCue = function(){
		webshims.error("Use VTTCue constructor instead of abstract TextTrackCue constructor.");
		VTTCue.apply(this, arguments);
	};

	window.TextTrackCue.prototype = VTTCue.prototype;

	mediaelement.createCueList = function(){
		return $.extend([], cueListProto);
	};
	
	mediaelement.parseCueTextToHTML = (function(){
		var tagSplits = /(<\/?[^>]+>)/ig;
		var allowedTags = /^(?:c|v|ruby|rt|b|i|u)/;
		var regEnd = /\<\s*\//;
		var addToTemplate = function(localName, attribute, tag, html){
			var ret;
			if(regEnd.test(html)){
				ret = '</'+ localName +'>';
			} else {
				tag.splice(0, 1);
				ret =  '<'+ localName +' '+ attribute +'="'+ (tag.join(' ').replace(/\"/g, '&#34;')) +'">';
			}
			return ret;
		};
		var replacer = function(html){
			var tag = html.replace(/[<\/>]+/ig,"").split(/[\s\.]+/);
			if(tag[0]){
				tag[0] = tag[0].toLowerCase();
				if(allowedTags.test(tag[0])){
					if(tag[0] == 'c'){
						html = addToTemplate('span', 'class', tag, html);
					} else if(tag[0] == 'v'){
						html = addToTemplate('q', 'title', tag, html);
					}
				} else {
					html = "";
				}
			}
			return html;
		};
		
		return function(cueText){
			return cueText.replace(tagSplits, replacer);
		};
	})();
	var mapTtmlToVtt = function(i){
		var content = i+'';
		var begin = this.getAttribute('begin') || '';
		var end = this.getAttribute('end') || '';
		var text = $.trim($.text(this));
		if(!/\./.test(begin)){
			begin += '.000';
		}
		if(!/\./.test(end)){
			end += '.000';
		}
		content += '\n';
		content += begin +' --> '+end+'\n';
		content += text;
		return content;
	};
	var ttmlTextToVTT = function(ttml){
		ttml = $.parseXML(ttml) || [];
		return $(ttml).find('[begin][end]').map(mapTtmlToVtt).get().join('\n\n') || '';
	};
	var loadingTracks = 0;

	mediaelement.loadTextTrack = function(mediaelem, track, trackData, _default){
		var loadEvents = 'play playing loadedmetadata loadstart';
		var obj = trackData.track;
		var load = function(){
			var error, ajax, createAjax;
			var isDisabled = obj.mode == 'disabled';
			var videoState = !!($.prop(mediaelem, 'readyState') > 0 || $.prop(mediaelem, 'networkState') == 2 || !$.prop(mediaelem, 'paused'));
			var src = (!isDisabled || videoState) && ($.attr(track, 'src') && $.prop(track, 'src'));

			if(src){
				$(mediaelem).off(loadEvents, load).off('updatetrackdisplay', load);

				if(!trackData.readyState){
					error = function(){
						loadingTracks--;
						trackData.readyState = 3;
						obj.cues = null;
						obj.activeCues = obj.shimActiveCues = obj._shimActiveCues = null;
						$(track).triggerHandler('error');
					};
					trackData.readyState = 1;
					try {
						obj.cues = mediaelement.createCueList();
						obj.activeCues = obj.shimActiveCues = obj._shimActiveCues = mediaelement.createCueList();
						loadingTracks++;
						createAjax = function(){
							ajax = $.ajax({
								dataType: 'text',
								url: src,
								success: function(text){
									loadingTracks--;
									var contentType = ajax.getResponseHeader('content-type') || '';

									if(!contentType.indexOf('application/xml')){
										text = ttmlTextToVTT(text);
									} else if(contentType.indexOf('text/vtt')){
										webshims.error('set the mime-type of your WebVTT files to text/vtt. see: http://dev.w3.org/html5/webvtt/#text/vtt');
									}
									mediaelement.parseCaptions(text, obj, function(cues){
										if(cues && 'length' in cues){
											trackData.readyState = 2;
											$(track).triggerHandler('load');
											$(mediaelem).triggerHandler('updatetrackdisplay');
										} else {
											error();
										}
									});
								},
								error: error
							});
						};
						if($.ajax && $.ajaxSettings.xhr){
							if(isDisabled){
								setTimeout(createAjax, loadingTracks * 2);
							} else {
								createAjax();
							}
						} else {
							webshims.ready('jajax', createAjax);
							webshims.loader.loadList(['jajax']);
						}
					} catch(er){
						error();
						webshims.error(er);
					}
				}
			}
		};
		trackData.readyState = 0;
		obj.shimActiveCues = null;
		obj._shimActiveCues = null;
		obj.activeCues = null;
		obj.cues = null;

		$(mediaelem).on(loadEvents, load);

		if(_default){
			obj.mode = showTracks[obj.kind] ? 'showing' : 'hidden';
			load();
		} else {
			$(mediaelem).on('updatetrackdisplay', load);
		}
	};
	
	mediaelement.createTextTrack = function(mediaelem, track){
		var obj, trackData;
		if(track.nodeName){
			trackData = webshims.data(track, 'trackData');
			
			if(trackData){
				refreshTrack(track, trackData);
				obj = trackData.track;
			}
		}
		
		if(!obj){
			obj = createEventTarget(webshims.objectCreate(textTrackProto));
			
			if(!supportTrackMod){
				copyProps.forEach(function(copyProp){
					var prop = $.prop(track, copyProp);
					if(prop){
						obj[copyName[copyProp] || copyProp] = prop;
					}
				});
			}
			
			
			if(track.nodeName){
				if(supportTrackMod){
					copyProps.forEach(function(copyProp){
						webshims.defineProperty(obj, copyName[copyProp] || copyProp, {
							get: function(){
								return $.prop(track, copyProp);
							}
						});
					});
				}
				obj.id = $(track).prop('id');
				trackData = webshims.data(track, 'trackData', {track: obj});
				mediaelement.loadTextTrack(mediaelem, track, trackData, isDefaultTrack(track));
			} else {
				if(supportTrackMod){
					copyProps.forEach(function(copyProp){
						webshims.defineProperty(obj, copyName[copyProp] || copyProp, {
							value: track[copyProp],
							writeable: false
						});
					});
				}
				obj.cues = mediaelement.createCueList();
				obj.activeCues = obj._shimActiveCues = obj.shimActiveCues = mediaelement.createCueList();
				obj.mode = 'hidden';
				obj.readyState = 2;
			}
			if(obj.kind == 'subtitles' && !obj.language){
				webshims.error('you must provide a language for track in subtitles state');
			}
			obj.__wsmode = obj.mode;

			webshims.defineProperty(obj, '_wsUpdateMode', {
				value: function(){
					$(mediaelem).triggerHandler('updatetrackdisplay');
				},
				enumerable: false
			});
		}
		
		return obj;
	};

	if(!$.propHooks.mode){
		$.propHooks.mode = {
			set: function(obj, value){
				obj.mode = value;
				if(obj._wsUpdateMode && obj._wsUpdateMode.call){
					obj._wsUpdateMode();
				}
				return obj.mode;
			}
		};
	}

/*
taken from:
Captionator 0.5.1 [CaptionCrunch]
Christopher Giffard, 2011
Share and enjoy

https://github.com/cgiffard/Captionator

modified for webshims
*/
	mediaelement.parseCaptionChunk = (function(){
		// Set up timestamp parsers
		var WebVTTTimestampParser		= /^(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s+\-\-\>\s+(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s*(.*)/;
		var WebVTTDEFAULTSCueParser		= /^(DEFAULTS|DEFAULT)\s+\-\-\>\s+(.*)/g;
		var WebVTTSTYLECueParser		= /^(STYLE|STYLES)\s+\-\-\>\s*\n([\s\S]*)/g;
		var WebVTTCOMMENTCueParser		= /^(COMMENT|COMMENTS)\s+\-\-\>\s+(.*)/g;
		var SRTTimestampParser			= /^(\d{2})?:?(\d{2}):(\d{2})[\.\,](\d+)\s+\-\-\>\s+(\d{2})?:?(\d{2}):(\d{2})[\.\,](\d+)\s*(.*)/;

		return function(subtitleElement,objectCount){

			var subtitleParts, timeIn, timeOut, html, timeData, subtitlePartIndex, id;
			var timestampMatch, tmpCue;

			// WebVTT Special Cue Logic
			if (WebVTTDEFAULTSCueParser.exec(subtitleElement) || WebVTTCOMMENTCueParser.exec(subtitleElement) || WebVTTSTYLECueParser.exec(subtitleElement)) {
				return null;
			}

			subtitleParts = subtitleElement.split(/\n/g);

			// Trim off any blank lines (logically, should only be max. one, but loop to be sure)
			while (!subtitleParts[0].replace(/\s+/ig,"").length && subtitleParts.length > 0) {
				subtitleParts.shift();
			}

			if (subtitleParts[0].match(/^\s*[a-z0-9-\_]+\s*$/ig)) {
				// The identifier becomes the cue ID (when *we* load the cues from file. Programatically created cues can have an ID of whatever.)
				id = String(subtitleParts.shift().replace(/\s*/ig,""));
			}

			for (subtitlePartIndex = 0; subtitlePartIndex < subtitleParts.length; subtitlePartIndex ++) {
				var timestamp = subtitleParts[subtitlePartIndex];

				if ((timestampMatch = WebVTTTimestampParser.exec(timestamp)) || (timestampMatch = SRTTimestampParser.exec(timestamp))) {

					// WebVTT

					timeData = timestampMatch.slice(1);

					timeIn =	parseInt((timeData[0]||0) * 60 * 60,10) +	// Hours
								parseInt((timeData[1]||0) * 60,10) +		// Minutes
								parseInt((timeData[2]||0),10) +				// Seconds
								parseFloat("0." + (timeData[3]||0));		// MS

					timeOut =	parseInt((timeData[4]||0) * 60 * 60,10) +	// Hours
								parseInt((timeData[5]||0) * 60,10) +		// Minutes
								parseInt((timeData[6]||0),10) +				// Seconds
								parseFloat("0." + (timeData[7]||0));		// MS
/*
					if (timeData[8]) {
						cueSettings = timeData[8];
					}
*/
				}

				// We've got the timestamp - return all the other unmatched lines as the raw subtitle data
				subtitleParts = subtitleParts.slice(0,subtitlePartIndex).concat(subtitleParts.slice(subtitlePartIndex+1));
				break;
			}

			if (!timeIn && !timeOut) {
				// We didn't extract any time information. Assume the cue is invalid!
				webshims.warn("couldn't extract time information: "+[timeIn, timeOut, subtitleParts.join("\n"), id].join(' ; '));
				return null;
			}
/*
			// Consolidate cue settings, convert defaults to object
			var compositeCueSettings =
				cueDefaults
					.reduce(function(previous,current,index,array){
						previous[current.split(":")[0]] = current.split(":")[1];
						return previous;
					},{});

			// Loop through cue settings, replace defaults with cue specific settings if they exist
			compositeCueSettings =
				cueSettings
					.split(/\s+/g)
					.filter(function(set) { return set && !!set.length; })
					// Convert array to a key/val object
					.reduce(function(previous,current,index,array){
						previous[current.split(":")[0]] = current.split(":")[1];
						return previous;
					},compositeCueSettings);

			// Turn back into string like the VTTCue constructor expects
			cueSettings = "";
			for (var key in compositeCueSettings) {
				if (compositeCueSettings.hasOwnProperty(key)) {
					cueSettings += !!cueSettings.length ? " " : "";
					cueSettings += key + ":" + compositeCueSettings[key];
				}
			}
*/
			// The remaining lines are the subtitle payload itself (after removing an ID if present, and the time);
			html = subtitleParts.join("\n");
			tmpCue = new VTTCue(timeIn, timeOut, html);
			if(id){
				tmpCue.id = id;
			}
			return tmpCue;
		};
	})();

	mediaelement.parseCaptions = function(captionData, track, complete) {

		var cue, lazyProcess, regWevVTT, startDate, isWEBVTT;

		mediaelement.createCueList();
		if (captionData) {

			regWevVTT = /^WEBVTT(\s*FILE)?/ig;

			lazyProcess = function(i, len){

				for(; i < len; i++){
					cue = captionData[i];
					if(regWevVTT.test(cue)){
						isWEBVTT = true;
					} else if(cue.replace(/\s*/ig,"").length){
						cue = mediaelement.parseCaptionChunk(cue, i);
						if(cue){
							track.addCue(cue);
						}
					}
					if(startDate < (new Date().getTime()) - 30){
						i++;
						setTimeout(function(){
							startDate = new Date().getTime();
							lazyProcess(i, len);
						}, 90);

						break;
					}
				}
				if(i >= len){
					if(!isWEBVTT){
						webshims.error('please use WebVTT format. This is the standard');
					}
					complete(track.cues);
				}
			};

			captionData = captionData.replace(/\r\n/g,"\n");

			setTimeout(function(){
				captionData = captionData.replace(/\r/g,"\n");
				setTimeout(function(){
					startDate = new Date().getTime();
					captionData = captionData.split(/\n\n+/g);
					lazyProcess(0, captionData.length);
				}, 9);
			}, 9);

		} else {
			webshims.error("Required parameter captionData not supplied.");
		}
	};

	
	mediaelement.createTrackList = function(mediaelem, baseData){
		baseData = baseData || webshims.data(mediaelem, 'mediaelementBase') || webshims.data(mediaelem, 'mediaelementBase', {});
		if(!baseData.textTracks){
			baseData.textTracks = [];
			webshims.defineProperties(baseData.textTracks, {
				onaddtrack: {value: null},
				onremovetrack: {value: null},
				onchange: {value: null},
				getTrackById: {
					value: function(id){
						var track = null;
						for(var i = 0; i < baseData.textTracks.length; i++){
							if(id == baseData.textTracks[i].id){
								track = baseData.textTracks[i];
								break;
							}
						}
						return track;
					}
				}
			});
			createEventTarget(baseData.textTracks);
			$(mediaelem).on('updatetrackdisplay', function(){
				var track;
				for(var i = 0; i < baseData.textTracks.length; i++){
					track = baseData.textTracks[i];
					if(track.__wsmode != track.mode){
						track.__wsmode = track.mode;
						$([ baseData.textTracks ]).triggerHandler('change');
					}
				}
			});
			
		}
		return baseData.textTracks;
	};
	
	if(!support.track){
		webshims.defineNodeNamesBooleanProperty(['track'], 'default');
		webshims.reflectProperties(['track'], ['srclang', 'label']);
		
		webshims.defineNodeNameProperties('track', {
			src: {
				//attr: {},
				reflect: true,
				propType: 'src'
			}
		});
	}
	
	webshims.defineNodeNameProperties('track', {
		kind: {
			attr: support.track ? {
				set: function(value){
					var trackData = webshims.data(this, 'trackData');
					this.setAttribute('data-kind', value);
					if(trackData){
						trackData.attrKind = value;
					}
				},
				get: function(){
					var trackData = webshims.data(this, 'trackData');
					if(trackData && ('attrKind' in trackData)){
						return trackData.attrKind;
					}
					return this.getAttribute('kind');
				}
			} : {},
			reflect: true,
			propType: 'enumarated',
			defaultValue: 'subtitles',
			limitedTo: ['subtitles', 'captions', 'descriptions', 'chapters', 'metadata']
		}
	});
	
	$.each(copyProps, function(i, copyProp){
		var name = copyName[copyProp] || copyProp;
		webshims.onNodeNamesPropertyModify('track', copyProp, function(){
			var trackData = webshims.data(this, 'trackData');

			if(trackData){
				if(copyProp == 'kind'){
					refreshTrack(this, trackData);
				}
				if(!supportTrackMod){
					trackData.track[name] = $.prop(this, copyProp);
				}
			}
		});
	});		
	
	
	webshims.onNodeNamesPropertyModify('track', 'src', function(val){
		if(val){
			var data = webshims.data(this, 'trackData');
			var media;
			if(data){
				media = $(this).closest('video, audio');
				if(media[0]){
					mediaelement.loadTextTrack(media, this, data);
				}
			}
		}
		
	});
	
	//
	webshims.defineNodeNamesProperties(['track'], {
		ERROR: {
			value: 3
		},
		LOADED: {
			value: 2
		},
		LOADING: {
			value: 1
		},
		NONE: {
			value: 0
		},
		readyState: {
			get: function(){
				return (webshims.data(this, 'trackData') || {readyState: 0}).readyState;
			},
			writeable: false
		},
		track: {
			get: function(){
				return mediaelement.createTextTrack($(this).closest('audio, video')[0], this);
			},
			writeable: false
		}
	}, 'prop');
	
	webshims.defineNodeNamesProperties(['audio', 'video'], {
		textTracks: {
			get: function(){
				var media = this;
				var baseData = webshims.data(media, 'mediaelementBase') || webshims.data(media, 'mediaelementBase', {});
				var tracks = mediaelement.createTrackList(media, baseData);
				if(!baseData.blockTrackListUpdate){
					updateMediaTrackList.call(media, baseData, tracks);
				}
				return tracks;
			},
			writeable: false
		},
		addTextTrack: {
			value: function(kind, label, lang){
				var textTrack = mediaelement.createTextTrack(this, {
					kind: dummyTrack.prop('kind', kind || '').prop('kind'),
					label: label || '',
					srclang: lang || ''
				});
				var baseData = webshims.data(this, 'mediaelementBase') || webshims.data(this, 'mediaelementBase', {});
				if (!baseData.scriptedTextTracks) {
					baseData.scriptedTextTracks = [];
				}
				baseData.scriptedTextTracks.push(textTrack);
				updateMediaTrackList.call(this);
				return textTrack;
			}
		}
	}, 'prop');

	//wsmediareload
	var thUpdateList = function(e){
		if($(e.target).is('audio, video')){
			var baseData = webshims.data(e.target, 'mediaelementBase');
			if(baseData){
				clearTimeout(baseData.updateTrackListTimer);
				baseData.updateTrackListTimer = setTimeout(function(){
					updateMediaTrackList.call(e.target, baseData);
				}, 0);
			}
		}
	};
	
	var getNativeReadyState = function(trackElem, textTrack){
		return textTrack.readyState || trackElem.readyState;
	};
	var stopOriginalEvent = function(e){
		if(e.originalEvent){
			e.stopImmediatePropagation();
		}
	};
	var hideNativeTracks = function(){
		if(webshims.implement(this, 'track')){
			var kind;
			var origTrack = this.track;
			if(origTrack){

				if (!webshims.bugs.track && (origTrack.mode || getNativeReadyState(this, origTrack))) {
					$.prop(this, 'track').mode = numericModes[origTrack.mode] || origTrack.mode;
				}
				//disable track from showing + remove UI
				kind = $.prop(this, 'kind');
				origTrack.mode = (typeof origTrack.mode == 'string') ? 'disabled' : 0;
				this.kind = 'metadata';

				$(this).attr({kind: kind});
				
			}
			$(this).on('load error', stopOriginalEvent);
		}
	};

	webshims.addReady(function(context, insertedElement){
		var insertedMedia = insertedElement.filter('video, audio, track').closest('audio, video');
		$('video, audio', context)
			.add(insertedMedia)
			.each(function(){
				updateMediaTrackList.call(this);
			})
			.on('emptied updatetracklist wsmediareload', thUpdateList)
			.each(function(){
				if(support.track){
					var shimedTextTracks = $.prop(this, 'textTracks');
					var origTextTracks = this.textTracks;

					if(shimedTextTracks.length != origTextTracks.length){
						webshims.warn("textTracks couldn't be copied");
					}
					
					$('track', this).each(hideNativeTracks);
				}
			})
		;

		insertedMedia.each(function(){
			var media = this;
			var baseData = webshims.data(media, 'mediaelementBase');
			if(baseData){
				clearTimeout(baseData.updateTrackListTimer);
				baseData.updateTrackListTimer = setTimeout(function(){
					updateMediaTrackList.call(media, baseData);
				}, 9);
			}
		});
	});
	
	if(support.texttrackapi){
		$('video, audio').trigger('trackapichange');
	}
});
