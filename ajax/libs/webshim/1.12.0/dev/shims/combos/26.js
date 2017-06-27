//DOM-Extension helper
webshims.register('dom-extend', function($, webshims, window, document, undefined){
	"use strict";
	var supportHrefNormalized = !('hrefNormalized' in $.support) || $.support.hrefNormalized;
	var supportGetSetAttribute = !('getSetAttribute' in $.support) || $.support.getSetAttribute;
	var has = Object.prototype.hasOwnProperty;
	webshims.assumeARIA = supportGetSetAttribute || Modernizr.canvas || Modernizr.video || Modernizr.boxsizing;
	
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
			if(webshims.M != Modernizr){
				webshims.error("Modernizr was included more than once. Make sure to include it only once! Webshims and other scripts might not work properly.");
				for(var i in Modernizr){
					if(!(i in webshims.M)){
						webshims.M[i] = Modernizr[i];
					}
				}
				Modernizr = webshims.M;
			}
		};
		switch$();
		setTimeout(switch$, 90);
		webshims.ready('DOM', switch$);
		$(switch$);
		webshims.ready('WINDOWLOAD', switch$);
		
	}

	//shortcus
	var modules = webshims.modules;
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
	
	var dataID = '_webshimsLib'+ (Math.round(Math.random() * 1000));
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
		var isExtendNativeSave = Modernizr.advancedObjectProperties && Modernizr.objectAccessor;
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
		
		var elementExtends = {};
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
		implement: function(elem, type){
			var data = elementData(elem, 'implemented') || elementData(elem, 'implemented', {});
			if(data[type]){
				webshims.warn(type +' already implemented for element #'+elem.id);
				return false;
			}
			data[type] = true;
			return true;
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
							
						}, (e.type == 'resize' && !window.requestAnimationFrame) ? 50 : 0);
					};
				})(),
				_create: function(){
					$.each({ Height: "getHeight", Width: "getWidth" }, function(name, type){
						var body = document.body;
						var doc = document.documentElement;
						docObserve[type] = function(){
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
						setInterval(this.test, 600);
						$(this.test);
						webshims.ready('WINDOWLOAD', this.test);
						$(document).on('updatelayout pageinit collapsibleexpand shown.bs.modal shown.bs.collapse slid.bs.carousel', this.handler);
						$(window).on('resize', this.handler);
						(function(){
							var oldAnimate = $.fn.animate;
							var animationTimer;
							
							$.fn.animate = function(){
								clearTimeout(animationTimer);
								animationTimer = setTimeout(function(){
									docObserve.test();
								}, 99);
								
								return oldAnimate.apply(this, arguments);
							};
						})();
					}
				}
			};
			
			
			webshims.docObserve = function(){
				webshims.ready('DOM', function(){
					docObserve.start();
					if($.support.boxSizing == null){
						$(function(){
							if($.support.boxSizing){
								docObserve.handler({type: 'boxsizing'});
							}
						});
					}
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
});
//html5a11y
(function($, document){
	if(!$.webshims.assumeARIA || ('content' in document.createElement('template'))){return;}
	
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
	
})(webshims.$, document);;webshims.register('filereader', function( $, webshims ){
	"use strict";
	/**
	 * Code is based on https://github.com/Jahdrien/FileReader
	 * 
	 */
	(function(){
		var swfobject = window.swfmini || window.swfobject;
	
		var readyCallbacks = $.Callbacks('once unique memory'),
		inputsCount = 0,
		currentTarget = null;
	
		// if native FileReader support, then dont add the polyfill and make the plugin do nothing
		if (window.FileReader) {
			$.fn.fileReader = function () { return this; }
			return ;
		}
		
		/**
		* JQuery Plugin
		*/
		$.fn.fileReader = function( options ) {  
			if(this.length){
				options = $.extend($.fn.fileReader.defaults, options);
				
				var self = this;
				readyCallbacks.add(function() {
					return main(self, options);
				});
				if ($.isFunction(options.callback)) readyCallbacks.add(options.callback);
				
				if (!FileAPIProxy.ready) {
					FileAPIProxy.init(options);
				}
			}
			return this;
		};
		
		/**
		* Default options
		*  	allows user set default options
		*/
		$.fn.fileReader.defaults = {
			id              : 'fileReaderSWFObject', // ID for the created swf object container,
			multiple        : null,
			accept          : null,
			label           : null,
			extensions      : null,
			filereader      : 'files/filereader.swf', // The path to the filereader swf file
			expressInstall  : null, // The path to the express install swf file
			debugMode       : false,
			callback        : false // Callback function when Filereader is ready
		};
		
		/**
		* Plugin callback
		*     adds an input to registry
		*/
		var main = function(el, options) {
			return el.each(function(i, input) {
				input = $(input);
				var id = input.attr('id');
				var multiple, accept, label;
				if (!id) {
					id = 'flashFileInput' + inputsCount;
					input.attr('id', id);
					inputsCount++;
				}
				multiple = input.prop('multiple');
				accept = input.data('swfaccept') || input.prop('accept') ||  options.accept;
				label = input.jProp('labels')
					.map(function(){
						return $(this).text();
					}).get().join(' ') ||
					input.data('swflabel') || 
					options.label;

				FileAPIProxy.inputs[id] = input;
				FileAPIProxy.swfObject.add(id, multiple, accept, label, options.extensions);
				
				input.css('z-index', 0)
					.mouseover(function (e) {
						if (id !== currentTarget) {
							e = e || window.event;
							currentTarget = id;
							FileAPIProxy.swfObject.mouseover(id);
							FileAPIProxy.container
								.height(input.outerHeight())
								.width(input.outerWidth())
								.css(input.offset());
						}
					})
					.click(function(e) {
						e.preventDefault();
						e.stopPropagation();
						e.stopImmediatePropagation();
						return false;
					});
			});
		};
		
		/**
		* Flash FileReader Proxy
		*/
		window.FileAPIProxy = {
			ready: false,
			_inititalized: false,
			init: function(o) {
				var self = this;
				this.debugMode = o.debugMode;
				
				if(!this.container){
					this.container = $('<div>').attr('id', o.id)
						.wrap('<div>')
						.parent()
						.css({
							position:'fixed',
							// top:'0px',
							width:'1px',
							height:'1px',
							display:'inline-block',
							background:'transparent',
							'z-index':99999
						})
						// Hands over mouse events to original input for css styles
						.on('mouseover mouseout mousedown mouseup', function(evt) {
							if(currentTarget){
								$('#' + currentTarget).trigger(evt.type);
							}
						})
						.appendTo('body');
					
					swfobject.embedSWF(o.filereader, o.id, '100%', '100%', '10', o.expressInstall, {debugMode: o.debugMode ? true : ''}, {'wmode':'transparent','allowScriptAccess':'sameDomain'}, {}, function(e) {
						self.swfObject = e.ref;
						$(self.swfObject)
							.css({
								display: 'block',
								outline: 0
							})
							.attr('tabindex', 0);
							
						self.ready = e.success && typeof e.ref.add === "function";
						
						if (self.ready) {
							readyCallbacks.fire();
						}
					});
				}
			},
			swfObject: null,
			container: null,
			// Inputs Registry
			inputs: {},
			// Readers Registry
			readers: {},
			// Receives FileInput events
			onFileInputEvent: function(evt) {
				if (this.debugMode) console.info('FileInput Event ', evt.type, evt);
				if (evt.target in this.inputs) {
					var el = this.inputs[evt.target];
					evt.target = el[0];
					if( evt.type === 'change') {
						webshims.data(evt.target, 'fileList', new FileList(evt.files));
					}
					el.trigger(evt);
				}
				window.focus();
			},
			// Receives FileReader ProgressEvents
			onFileReaderEvent: function(evt) {
				if (this.debugMode) console.info('FileReader Event ', evt.type, evt, evt.target in this.readers);
				if (evt.target in this.readers) {
					var reader = this.readers[evt.target];
					evt.target = reader;
					reader._handleFlashEvent.call(reader, evt);
				}
			},
			// Receives flash FileReader Error Events
			onFileReaderError: function(error) {
				if (this.debugMode) console.log(error);
			},
			onSWFReady: function() {
				this.container.css({position: 'absolute'});
				this.ready = typeof this.swfObject.add === "function";
				if (this.ready) {
					readyCallbacks.fire();
				}
				
				return true;
			}
		};
		
		
		/**
		* Add FileReader to the window object
		*/
		window.FileReader = function () {
			// states
			this.EMPTY = 0;
			this.LOADING = 1;
			this.DONE = 2;
	
			this.readyState = 0;
	
			// File or Blob data
			this.result = null;
	
			this.error = null;
	
			// event handler attributes
			this.onloadstart = null;
			this.onprogress = null;
			this.onload = null;
			this.onabort = null;
			this.onerror = null;
			this.onloadend = null;
			
			// Event Listeners handling using JQuery Callbacks
			this._callbacks = {
				loadstart : $.Callbacks( "unique" ),
				progress  : $.Callbacks( "unique" ),
				abort     : $.Callbacks( "unique" ),
				error     : $.Callbacks( "unique" ),
				load      : $.Callbacks( "unique" ),
				loadend   : $.Callbacks( "unique" )
			};
			
			// Custom properties
			this._id = null;
		};
		
		window.FileReader.prototype = {
			// async read methods
			readAsBinaryString: function (file) {
				this._start(file);
				FileAPIProxy.swfObject.read(file.input, file.name, 'readAsBinaryString');
			},
			readAsText: function (file, encoding) {
				this._start(file);
				FileAPIProxy.swfObject.read(file.input, file.name, 'readAsText');
			},
			readAsDataURL: function (file) {
				this._start(file);
				FileAPIProxy.swfObject.read(file.input, file.name, 'readAsDataURL');
			},
			readAsArrayBuffer: function(file){
				throw("Whoops FileReader.readAsArrayBuffer is unimplemented");
			},
			
			abort: function () {
				this.result = null;
				if (this.readyState === this.EMPTY || this.readyState === this.DONE) return;
				FileAPIProxy.swfObject.abort(this._id);
			},
			
			// Event Target interface
			addEventListener: function (type, listener) {
				if (type in this._callbacks) this._callbacks[type].add(listener);
			},
			removeEventListener: function (type, listener) {
				if (type in this._callbacks) this._callbacks[type].remove(listener);
			},
			dispatchEvent: function (event) {
				event.target = this;
				if (event.type in this._callbacks) {
					var fn = this['on' + event.type];
					if ($.isFunction(fn)) fn(event);
					this._callbacks[event.type].fire(event);
				}
				return true;
			},
			
			// Custom private methods
			
			// Registers FileReader instance for flash callbacks
			_register: function(file) {
				this._id = file.input + '.' + file.name;
				FileAPIProxy.readers[this._id] = this;
			},
			_start: function(file) {
				this._register(file);
				if (this.readyState === this.LOADING) throw {type: 'InvalidStateError', code: 11, message: 'The object is in an invalid state.'};
			},
			_handleFlashEvent: function(evt) {
				switch (evt.type) {
					case 'loadstart':
						this.readyState = this.LOADING;
						break;
					case 'loadend':
						this.readyState = this.DONE;
						break;
					case 'load':
						this.readyState = this.DONE;
						this.result = FileAPIProxy.swfObject.result(this._id);
						break;
					case 'error':
						this.result = null;
						this.error = {
							name: 'NotReadableError',
							message: 'The File cannot be read!'
						};
				}
				this.dispatchEvent(new FileReaderEvent(evt));
			}
		};
		
		/**
		* FileReader ProgressEvent implenting Event interface
		*/
		window.FileReaderEvent = function (e) {
			this.initEvent(e);
		};
	
		window.FileReaderEvent.prototype = {
			initEvent: function (event) {
				$.extend(this, {
					type: null,
					target: null,
					currentTarget: null,
				
					eventPhase: 2,
	
					bubbles: false,
					cancelable: false,
			 
					defaultPrevented: false,
	
					isTrusted: false,
					timeStamp: new Date().getTime()
				}, event);
			},
			stopPropagation: function (){
			},
			stopImmediatePropagation: function (){
			},
			preventDefault: function (){
			}
		};
		
		/**
		* FileList interface (Object with item function)
		*/
		window.FileList = function(array) {
			if (array) {
				for (var i = 0; i < array.length; i++) {
					this[i] = array[i];
				}
				this.length = array.length;
			} else {
				this.length = 0;
			}
		};
		
		window.FileList.prototype = {
			item: function(index) {
				return (index in this) ? this[index] : null;
			}
		};
	})();
	
	webshims.defineNodeNameProperty('input', 'files', {
			prop: {
				writeable: false,
				get: function(){
					if(this.type != 'file'){return null;}
					if(!$(this).is('.ws-filereader')){
						webshims.error("please add the 'ws-filereader' class to your input[type='file'] to implement files-property");
					}
					return webshims.data(this, 'fileList') || webshims.data(this, 'fileList', new FileList());
				}
			}
		}
	);
	
	webshims.defineNodeNamesBooleanProperty('input', 'multiple');

	//webshims
	$.fn.fileReader.defaults.filereader = webshims.cfg.basePath +'swf/filereader.swf';
	var wait = ['DOM'];
	if(webshims.modules["form-core"].loaded){
		wait.push('forms');
	}
	webshims.ready(wait, function(){
		webshims.addReady(function(context, contextElem){
			$('input[type="file"].ws-filereader', context).fileReader();
		});
	});
});
