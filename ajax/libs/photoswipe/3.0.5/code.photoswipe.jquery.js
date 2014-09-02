// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function (window) {
	
	// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
	if (!Function.prototype.bind ) {

		Function.prototype.bind = function( obj ) {
			var slice = [].slice,
					args = slice.call(arguments, 1), 
					self = this, 
					nop = function () {}, 
					bound = function () {
						return self.apply( this instanceof nop ? this : ( obj || {} ), 
																args.concat( slice.call(arguments) ) );
					};

			nop.prototype = self.prototype;

			bound.prototype = new nop();

			return bound;
		};
	}

	

	if (typeof window.Code === "undefined") {
		window.Code = {};
	}
	
	
	
	window.Code.Util = {
		
		
		/*
		 * Function: registerNamespace
		 */			
		registerNamespace: function () {
			var 
				args = arguments, obj = null, i, j, ns, nsParts, root, argsLen, nsPartsLens;
			for (i=0, argsLen=args.length; i<argsLen; i++) {
				ns = args[i];
				nsParts = ns.split(".");
				root = nsParts[0];
				if (typeof window[root] === "undefined"){
					window[root] = {};
				}
				obj = window[root];
				//eval('if (typeof ' + root + ' == "undefined"){' + root + ' = {};} obj = ' + root + ';');
				for (j=1, nsPartsLens=nsParts.length; j<nsPartsLens; ++j) {
					obj[nsParts[j]] = obj[nsParts[j]] || {};
					obj = obj[nsParts[j]];
				}
			}
		},
		
		
		
		/*
		 * Function: coalesce
		 * Takes any number of arguments and returns the first non Null / Undefined argument.
		 */
		coalesce: function () {
			var i, j;
			for (i=0, j=arguments.length; i<j; i++) {
				if (!this.isNothing(arguments[i])) {
					return arguments[i];
				}
			}
			return null;
		},
		
		
		
		/*
		 * Function: extend
		 */
		extend: function(destination, source, overwriteProperties){
			var prop;
			if (this.isNothing(overwriteProperties)){
				overwriteProperties = true;
			}
			if (destination && source && this.isObject(source)){
				for(prop in source){
					if (this.objectHasProperty(source, prop)) {
						if (overwriteProperties){
							destination[prop] = source[prop];
						}
						else{
							if(typeof destination[prop] === "undefined"){ 
								destination[prop] = source[prop]; 
							}
						}
					}
				}
			}
		},
		
		
		
		/*
		 * Function: clone
		 */
		clone: function(obj) {
			var retval = {};
			this.extend(retval, obj);
			return retval;
		},
		
		
		
		/*
		 * Function: isObject
		 */
		isObject: function(obj){
			return obj instanceof Object;
		},
		
		
		
		/*
		 * Function: isFunction
		 */
		isFunction: function(obj){
			return ({}).toString.call(obj) === "[object Function]";
		},
		
		
		
		/*
		 * Function: isArray
		 */
		isArray: function(obj){
			return obj instanceof Array;
		},
		
		
		/*
		 * Function: isLikeArray
		 */
		isLikeArray: function(obj) { 
			return typeof obj.length === 'number';
		},
		
		
		
		/*
		 * Function: isNumber
		 */
		isNumber: function(obj){
			return typeof obj === "number";
		},
		
		
		
		/*
		 * Function: isString
		 */
		isString: function(obj){
			return typeof obj === "string";
		},
	
		
		/*
		 * Function: isNothing
		 */
		isNothing: function (obj) {
		
			if (typeof obj === "undefined" || obj === null) {
				return true;
			}	
			return false;
			
		},
		
		
		
		/*
		 * Function: swapArrayElements
		 */
		swapArrayElements: function(arr, i, j){
			
			var temp = arr[i]; 
			arr[i] = arr[j];
			arr[j] = temp;
		
		},
		
		
		
		/*
		 * Function: trim
		 */
		trim: function(val) {
			return val.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		},
		
		
		
		/*
		 * Function: toCamelCase
		 */
		toCamelCase: function(val){
			return val.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
		},
		
		
		
		/*
		 * Function: toDashedCase
		 */
		toDashedCase: function(val){
			return val.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
		},
		
		
		
		/*
		 * Function: indexOf
		 */
		arrayIndexOf: function(obj, array, prop){
			
			var i, j, retval, arrayItem;
			
			retval = -1;
			
			for (i=0, j=array.length; i<j; i++){
				
				arrayItem = array[i];
				
				if (!this.isNothing(prop)){
					if (this.objectHasProperty(arrayItem, prop)) {
						if (arrayItem[prop] === obj){
							retval = i;
							break;
						}
					}
				}
				else{
					if (arrayItem === obj){
						retval = i;
						break;
					}
				}
				
			}
			
			return retval;
			
		},
		
		
		
		/*
		 * Function: objectHasProperty
		 */
		objectHasProperty: function(obj, propName){
			
			if (obj.hasOwnProperty){
				return obj.hasOwnProperty(propName);
			}
			else{
				return ('undefined' !== typeof obj[propName]);
			}
			
		}
		
		
	};
	
}(window));
// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function(window, Util) {
	
	Util.Browser = {
	
		ua: null,
		version: null,
		safari: null,
		webkit: null,
		opera: null,
		msie: null,
		chrome: null,
		mozilla: null,
		
		android: null,
		blackberry: null,
		iPad: null,
		iPhone: null,
		iPod: null,
		iOS: null,
		
		is3dSupported: null,
		isCSSTransformSupported: null,
		isTouchSupported: null,
		isGestureSupported: null,
		
		
		_detect: function(){
			
			this.ua = window.navigator.userAgent;
			this.version = (this.ua.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || []);
			this.safari = (/Safari/gi).test(window.navigator.appVersion);
			this.webkit = /webkit/i.test(this.ua);
			this.opera = /opera/i.test(this.ua);
			this.msie = /msie/i.test(this.ua) && !this.opera;
			this.chrome = /Chrome/i.test(this.ua);
			this.firefox = /Firefox/i.test(this.ua);
			this.fennec = /Fennec/i.test(this.ua);
			this.mozilla = /mozilla/i.test(this.ua) && !/(compatible|webkit)/.test(this.ua);
			this.android = /android/i.test(this.ua);
			this.blackberry = /blackberry/i.test(this.ua);
			this.iOS = (/iphone|ipod|ipad/gi).test(window.navigator.platform);
			this.iPad = (/ipad/gi).test(window.navigator.platform);
			this.iPhone = (/iphone/gi).test(window.navigator.platform);
			this.iPod = (/ipod/gi).test(window.navigator.platform);
			
			var testEl = document.createElement('div');
			this.is3dSupported = !Util.isNothing(testEl.style.WebkitPerspective);	
			this.isCSSTransformSupported = ( !Util.isNothing(testEl.style.WebkitTransform) || !Util.isNothing(testEl.style.MozTransform) || !Util.isNothing(testEl.style.transformProperty) );
			this.isTouchSupported = this.isEventSupported('touchstart');
			this.isGestureSupported = this.isEventSupported('gesturestart');
			
		},
		
			
		_eventTagNames: {
			'select':'input',
			'change':'input',
			'submit':'form',
			'reset':'form',
			'error':'img',
			'load':'img',
			'abort':'img'
		},
				
				
		/*
		 * Function: isEventSupported
		 * http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
		 */
		isEventSupported: function(eventName) {
			var 
				el = document.createElement(this._eventTagNames[eventName] || 'div'),
				isSupported;
			eventName = 'on' + eventName;
			isSupported = Util.objectHasProperty(el, eventName);
			if (!isSupported) {
				el.setAttribute(eventName, 'return;');
				isSupported = typeof el[eventName] === 'function';
			}
			el = null;
			return isSupported;
		},
		
		
		isLandscape: function(){
			return (Util.DOM.windowWidth() > Util.DOM.windowHeight());
		}
  };
	
	Util.Browser._detect();
	
}
(
	window,
	window.Code.Util
))
;
// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function (window, $, Util) {
	
	Util.extend(Util, {
		
		Events: {
			
			
			/*
			 * Function: add
			 * Add an event handler
			 */
			add: function(obj, type, handler){
				
				$(obj).bind(type, handler);
				
			},
			
			
			
			/*
			 * Function: remove
			 * Removes a handler or all handlers associated with a type
			 */
			remove: function(obj, type, handler){
				
				$(obj).unbind(type, handler);
				
			},
			
			
			/*
			 * Function: fire
			 * Fire an event
			 */
			fire: function(obj, type){
				
				var 
					event,
					args = Array.prototype.slice.call(arguments).splice(2);
				
				if (typeof type === "string"){
					event = { type: type };
				}
				else{
					event = type;
				}
				
				$(obj).trigger( $.Event(event.type, event),  args);
				
			},
			
			
			/*
			 * Function: getMousePosition
			 */
			getMousePosition: function(event){
				
				var retval = {
					x: event.pageX,
					y: event.pageY
				};
				
				return retval;
				
			},
			
			
			/*
			 * Function: getTouchEvent
			 */
			getTouchEvent: function(event){
				
				return event.originalEvent;
				
			},
			
			
			
			/*
			 * Function: getWheelDelta
			 */
			getWheelDelta: function(event){
				
				var delta = 0;
				
				if (!Util.isNothing(event.wheelDelta)){
					delta = event.wheelDelta / 120;
				}
				else if (!Util.isNothing(event.detail)){
					delta = -event.detail / 3;
				}
				
				return delta;
				
			},
			
			
			/*
			 * Function: domReady
			 */
			domReady: function(handler){
				
				$(document).ready(handler);
				
			}
			
			
		}
	
		
	});
	
	
}
(
	window,
	window.jQuery,
	window.Code.Util
));// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function (window, $, Util) {
	
	Util.extend(Util, {
		
		DOM: {
			
			
			
			/*
			 * Function: setData
			 */
			setData: function(el, key, value){
				
				if (Util.isLikeArray(el)){
					var i, len;
					for (i=0, len=el.length; i<len; i++){
						Util.DOM._setData(el[i], key, value);
					}
				}
				else{
					Util.DOM._setData(el, key, value);
				}
				
			},
			_setData: function(el, key, value){
			
				Util.DOM.setAttribute(el, 'data-' + key, value);
			
			},
			
			
			
			/*
			 * Function: getData
			 */
			getData: function(el, key, defaultValue){
				
				return Util.DOM.getAttribute(el, 'data-' + key, defaultValue);
				
			},
			
			
			
			/*
			 * Function: removeData
			 */
			removeData: function(el, key){
				
				if (Util.isLikeArray(el)){
					var i, len;
					for (i=0, len=el.length; i<len; i++){
						Util.DOM._removeData(el[i], key);
					}
				}
				else{
					Util.DOM._removeData(el, key);
				}
				
			},
			_removeData: function(el, key){
			
				Util.DOM.removeAttribute(el, 'data-' + key);
				
			},
			
			
			
			/*
			 * Function: isChildOf
			 */
			isChildOf: function(childEl, parentEl)
			{
				if (parentEl === childEl){ 
					return false; 
				}
				while (childEl && childEl !== parentEl)
				{ 
					childEl = childEl.parentNode; 
				}

				return childEl === parentEl;
			},
			
			
			
			/*
			 * Function: find
			 */
			find: function(selectors, contextEl){
				if (Util.isNothing(contextEl)){
					contextEl = window.document;
				}
				var 
					els = $(selectors, contextEl),
					retval = [],
					i, j;
				
				for (i=0, j=els.length; i<j; i++){
					retval.push(els[i]);
				}
				return retval;
			},
			
			
		
			/*
			 * Function: createElement
			 */
			createElement: function(type, attributes, content){
				
				var retval = $('<' + type +'></' + type + '>');
				retval.attr(attributes);
				retval.append(content);
				
				return retval[0];
				
			},
			
			
			
			/*
			 * Function: appendChild
			 */
			appendChild: function(childEl, parentEl){
				
				$(parentEl).append(childEl);
				
			},
			
			
			
			/*
			 * Function: insertBefore
			 */
			insertBefore: function(newEl, refEl, parentEl){
				
				$(newEl).insertBefore(refEl);
				
			},
			
			
			
			/*
			 * Function: appendText
			 */
			appendText: function(text, parentEl){
				
				$(parentEl).text(text);
				
			},
			
			
			
			/*
			 * Function: appendToBody
			 */
			appendToBody: function(childEl){
				
				$('body').append(childEl);
				
			},
			
			
			
			/*
			 * Function: removeChild
			 */
			removeChild: function(childEl, parentEl){
				
				$(childEl).empty().remove();
				
			},
			
			
			
			/*
			 * Function: removeChildren
			 */
			removeChildren: function(parentEl){
				
				$(parentEl).empty();
			
			},
			
			
			
			/*
			 * Function: hasAttribute
			 */
			hasAttribute: function(el, attributeName){
				
				return !Util.isNothing( $(el).attr(attributeName) );
			
			},
			
			
			
			/*
			 * Function: getAttribute
			 */
			getAttribute: function(el, attributeName, defaultValue){
				
				var retval = $(el).attr(attributeName);
				if (Util.isNothing(retval) && !Util.isNothing(defaultValue)){
					retval = defaultValue;
				}
				return retval;
			
			},
			
			
			
			/*
			 * Function: el, attributeName
			 */
			setAttribute: function(el, attributeName, value){
				
				if (Util.isLikeArray(el)){
					var i, len;
					for (i=0, len=el.length; i<len; i++){
						Util.DOM._setAttribute(el[i], attributeName, value);
					}
				}
				else{
					Util.DOM._setAttribute(el, attributeName, value);
				}
					
			},
			_setAttribute: function(el, attributeName, value){
				
				$(el).attr(attributeName, value);
				
			},
			
			
			
			/*
			 * Function: removeAttribute
			 */
			removeAttribute: function(el, attributeName){
				
				if (Util.isLikeArray(el)){
					var i, len;
					for (i=0, len=el.length; i<len; i++){
						Util.DOM._removeAttribute(el[i], attributeName);
					}
				}
				else{
					Util.DOM._removeAttribute(el, attributeName);
				}
				
			},
			_removeAttribute: function(el, attributeName){
				
				$(el).removeAttr(attributeName);
				
			},
			
			
			
			/*
			 * Function: addClass
			 */
			addClass: function(el, className){
				
				if (Util.isLikeArray(el)){
					var i, len;
					for (i=0, len=el.length; i<len; i++){
						Util.DOM._addClass(el[i], className);
					}
				}
				else{
					Util.DOM._addClass(el, className);
				}
				
			},
			_addClass: function(el, className){
				
				$(el).addClass(className);
				
			},
			
			
			
			/*
			 * Function: removeClass
			 */
			removeClass: function(el, className){
				
				if (Util.isLikeArray(el)){
					var i, len;
					for (i=0, len=el.length; i<len; i++){
						Util.DOM._removeClass(el[i], className);
					}
				}
				else{
					Util.DOM._removeClass(el, className);
				}
					
			},
			_removeClass: function(el, className){
			
				$(el).removeClass(className);
				
			},
			
			
			
			/*
			 * Function: hasClass
			 */
			hasClass: function(el, className){
				
				$(el).hasClass(className);
				
			},
			
			
			
			/*
			 * Function: setStyle
			 */
			setStyle: function(el, style, value){
				
				if (Util.isLikeArray(el)){
					var i, len;
					for (i=0, len=el.length; i<len; i++){
						Util.DOM._setStyle(el[i], style, value);
					}
				}
				else{
					Util.DOM._setStyle(el, style, value);
				}
				
			},
			_setStyle: function(el, style, value){
				
				var prop;
				
				if (Util.isObject(style)) {
					for(prop in style) {
						if(Util.objectHasProperty(style, prop)){
							if (prop === 'width'){
								Util.DOM.width(el, style[prop]);
							}
							else if (prop === 'height'){
								Util.DOM.height(el, style[prop]);
							}
							else{
								$(el).css(prop, style[prop]);
							}
						}
					}
				}
				else {
					$(el).css(style, value);
				}
				
			},
			
			
			
			/*
			 * Function: getStyle
			 */
			getStyle: function(el, styleName){
				
				return $(el).css(styleName);
				
			},
			
			
			
			/*
			 * Function: hide
			 */
			hide: function(el){
				if (Util.isLikeArray(el)){
					var i, len;
					for (i=0, len=el.length; i<len; i++){
						Util.DOM._hide(el[i]);
					}
				}
				else{
					Util.DOM._hide(el);
				}
			},
			_hide: function(el){
				
				$(el).hide();
			
			},
			
			
			
			/*
			 * Function: show
			 */
			show: function(el){
				
				if (Util.isLikeArray(el)){
					var i, len;
					for (i=0, len=el.length; i<len; i++){
						Util.DOM._show(el[i]);
					}
				}
				else{
					Util.DOM._show(el);
				}
				
			},
			_show: function(el){
				
				$(el).show();
				
			},
			
			
			
			/*
			 * Function: width 
			 * Content width, exludes padding
			 */
			width: function(el, value){
				
				if (!Util.isNothing(value)){
					$(el).width(value);
				}
				
				return $(el).width();
				
			},
			
			
			
			/*
			 * Function: outerWidth
			 */
			outerWidth: function(el){
				
				return $(el).outerWidth();
			
			},
			
			
			
			/*
			 * Function: height 
			 * Content height, excludes padding
			 */
			height: function(el, value){
				
				if (!Util.isNothing(value)){
					$(el).height(value);
				}
				
				return $(el).height();
				
			},
			
			
			
			/*
			 * Function: outerHeight
			 */
			outerHeight: function(el){
				
				return $(el).outerHeight();
				
			},
			
			
			
			/*
			 * Function: documentWidth
			 */
			documentWidth: function(){
				
				return $(document.documentElement).width();
				
			},

			
			
			/*
			 * Function: documentHeight
			 */
			documentHeight: function(){
				
				return $(document.documentElement).height();
				
			},
			
			
			
			/*
			 * Function: documentOuterWidth
			 */
			documentOuterWidth: function(){
				
				return Util.DOM.width(document.documentElement);
				
			},

			
			
			/*
			 * Function: documentOuterHeight
			 */
			documentOuterHeight: function(){
				
				return Util.DOM.outerHeight(document.documentElement);
				
			},
			
			
			
			/*
			 * Function: bodyWidth
			 */
			bodyWidth: function(){
				
				return $(document.body).width();
			
			},
			
			
			
			/*
			 * Function: bodyHeight
			 */
			bodyHeight: function(){
				
				return $(document.body).height();
			
			},
			
			
			
			/*
			 * Function: bodyOuterWidth
			 */
			bodyOuterWidth: function(){
				
				return Util.DOM.outerWidth(document.body);
			
			},
			
			
			
			/*
			 * Function: bodyOuterHeight
			 */
			bodyOuterHeight: function(){
				
				return Util.DOM.outerHeight(document.body);
			
			},
			
			
			
			/*
			 * Function: windowWidth
			 */
			windowWidth: function(){
				//IE
				if(!window.innerWidth) {
					return $(window).width();
				}
				//w3c
				return window.innerWidth;
			},
			
			
			
			/*
			 * Function: windowHeight
			 */
			windowHeight: function(){
				//IE
				if(!window.innerHeight) {
					return $(window).height();
				}
				//w3c
				return window.innerHeight;
			},
			
			
			
			/*
			 * Function: windowScrollLeft
			 */
			windowScrollLeft: function(){
				//IE
				if(!window.pageXOffset) {
					return $(window).scrollLeft();
				}
				//w3c
				return window.pageXOffset;
			},
			
			
			
			/*
			 * Function: windowScrollTop
			 */
			windowScrollTop: function(){
				//IE
				if(!window.pageYOffset) {
					return $(window).scrollTop();
				}
				//w3c
				return window.pageYOffset;
			}
			
		}
	
		
	});
	
	
}
(
	window,
	window.jQuery,
	window.Code.Util
));
// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function (window, Util) {
	
	Util.extend(Util, {
		
		Animation: {
				
			_applyTransitionDelay: 50,
			
			_transitionEndLabel: (window.document.documentElement.style.webkitTransition !== undefined) ? "webkitTransitionEnd" : "transitionend",
			
			_transitionEndHandler: null,
			
			_transitionPrefix: (window.document.documentElement.style.webkitTransition !== undefined) ? "webkitTransition" : (window.document.documentElement.style.MozTransition !== undefined) ? "MozTransition" : "transition",
			
			_transformLabel: (window.document.documentElement.style.webkitTransform !== undefined) ? "webkitTransform" : (window.document.documentElement.style.MozTransition !== undefined) ? "MozTransform" : "transform",
						
			
			/*
			 * Function: _getTransitionEndHandler
			 */
			_getTransitionEndHandler: function(){
			
				if (Util.isNothing(this._transitionEndHandler)){
					this._transitionEndHandler = this._onTransitionEnd.bind(this);
				}
				
				return this._transitionEndHandler;
			
			},
			
			
			
			/*
			 * Function: stop
			 */
			stop: function(el){
				
				if (Util.Browser.isCSSTransformSupported){
					var 
						property = el.style[this._transitionPrefix + 'Property'],
						callbackLabel = (property !== '') ? 'ccl' + property + 'callback' : 'cclallcallback',
						style = {};
					
					Util.Events.remove(el, this._transitionEndLabel, this._getTransitionEndHandler());
					if (Util.isNothing(el.callbackLabel)){
						delete el.callbackLabel;
					}
					
					style[this._transitionPrefix + 'Property'] = '';
					style[this._transitionPrefix + 'Duration'] = '';
					style[this._transitionPrefix + 'TimingFunction'] = '';
					style[this._transitionPrefix + 'Delay'] = '';
					style[this._transformLabel] = '';
					
					Util.DOM.setStyle(el, style);
				}
				else if (!Util.isNothing(window.jQuery)){
				
					window.jQuery(el).stop(true, true);
				
				}
				
			
			},
			
			
			
			/*
			 * Function: fadeIn
			 */
			fadeIn: function(el, speed, callback, timingFunction, opacity){
				
				opacity = Util.coalesce(opacity, 1);
				if (opacity <= 0){
					opacity = 1;
				}
				
				if (speed <= 0){
					Util.DOM.setStyle(el, 'opacity', opacity);
					if (!Util.isNothing(callback)){
						callback(el);
						return;
					}
				}
				
				var currentOpacity = Util.DOM.getStyle(el, 'opacity');
				
				if (currentOpacity >= 1){
					Util.DOM.setStyle(el, 'opacity', 0);
				}
				
				if (Util.Browser.isCSSTransformSupported){
					this._applyTransition(el, 'opacity', opacity, speed, callback, timingFunction);
				}
				else if (!Util.isNothing(window.jQuery)){
					window.jQuery(el).fadeTo(speed, opacity, callback);
				}
				
			},
			
			
			
			/*
			 * Function: fadeTo
			 */
			fadeTo: function(el, opacity, speed, callback, timingFunction){
				this.fadeIn(el, speed, callback, timingFunction, opacity);
			},
			
			
			
			/*
			 * Function: fadeOut
			 */
			fadeOut: function(el, speed, callback, timingFunction){
				
				if (speed <= 0){
					Util.DOM.setStyle(el, 'opacity', 0);
					if (!Util.isNothing(callback)){
						callback(el);
						return;
					}
				}
				
				if (Util.Browser.isCSSTransformSupported){
				
					this._applyTransition(el, 'opacity', 0, speed, callback, timingFunction);
					
				}
				else{
				
					window.jQuery(el).fadeTo(speed, 0, callback);
				
				}
				
			},
			
			
			
			/*
			 * Function: slideBy
			 */
			slideBy: function(el, x, y, speed, callback, timingFunction){
			
				var style = {};
				
				x = Util.coalesce(x, 0);
				y = Util.coalesce(y, 0);
				timingFunction = Util.coalesce(timingFunction, 'ease-out');
				
				style[this._transitionPrefix + 'Property'] = 'all';
				style[this._transitionPrefix + 'Delay'] = '0';
				
				if (speed === 0){
					style[this._transitionPrefix + 'Duration'] = '';
					style[this._transitionPrefix + 'TimingFunction'] = '';
				}
				else{
					style[this._transitionPrefix + 'Duration'] = speed + 'ms';
					style[this._transitionPrefix + 'TimingFunction'] = Util.coalesce(timingFunction, 'ease-out');
					
					Util.Events.add(el, this._transitionEndLabel, this._getTransitionEndHandler());
					
				}
				
				style[this._transformLabel] = (Util.Browser.is3dSupported) ? 'translate3d(' + x + 'px, ' + y + 'px, 0px)' : 'translate(' + x + 'px, ' + y + 'px)';
				
				if (!Util.isNothing(callback)){
					el.cclallcallback = callback;
				}
				
				Util.DOM.setStyle(el, style);
				
				if (speed === 0){
					window.setTimeout(function(){
						this._leaveTransforms(el);
					}.bind(this), this._applyTransitionDelay);
				}
				
			},
			
			
			
			/*
			 * Function: 
			 */
			resetTranslate: function(el){
				
				var style = {};
				style[this._transformLabel] = style[this._transformLabel] = (Util.Browser.is3dSupported) ? 'translate3d(0px, 0px, 0px)' : 'translate(0px, 0px)';
				Util.DOM.setStyle(el, style);
			
			},
			
			
			
			/*
			 * Function: _applyTransition
			 */
			_applyTransition: function(el, property, val, speed, callback, timingFunction){
					
				var style = {};
				
				timingFunction = Util.coalesce(timingFunction, 'ease-in');
				
				style[this._transitionPrefix + 'Property'] = property;
				style[this._transitionPrefix + 'Duration'] = speed + 'ms';
				style[this._transitionPrefix + 'TimingFunction'] = timingFunction;
				style[this._transitionPrefix + 'Delay'] = '0';
				
				Util.Events.add(el, this._transitionEndLabel, this._getTransitionEndHandler());
				
				Util.DOM.setStyle(el, style);
				
				if (!Util.isNothing(callback)){
					el['ccl' + property + 'callback'] = callback;
				}
				
				window.setTimeout(function(){
					Util.DOM.setStyle(el, property, val);
				}, this._applyTransitionDelay);	
				
			},
			
			
			
			/*
			 * Function: _onTransitionEnd
			 */
			_onTransitionEnd: function(e){
				
				Util.Events.remove(e.currentTarget, this._transitionEndLabel, this._getTransitionEndHandler());
				this._leaveTransforms(e.currentTarget);
			
			},
			
			
			
			/*
			 * Function: _leaveTransforms
			 */
			_leaveTransforms: function(el){
				
				var 
						property = el.style[this._transitionPrefix + 'Property'],
						callbackLabel = (property !== '') ? 'ccl' + property + 'callback' : 'cclallcallback',
						callback,
						transform = Util.coalesce(el.style.webkitTransform, el.style.MozTransform, el.style.transform),
						transformMatch, 
						transformExploded,
						domX = window.parseInt(Util.DOM.getStyle(el, 'left'), 0),
						domY = window.parseInt(Util.DOM.getStyle(el, 'top'), 0),
						transformedX,
						transformedY,
						style = {};
					
				if (transform !== ''){
					if (Util.Browser.is3dSupported){
						transformMatch = transform.match( /translate3d\((.*?)\)/ );
					}
					else{
						transformMatch = transform.match( /translate\((.*?)\)/ );
					}
					if (!Util.isNothing(transformMatch)){
						transformExploded = transformMatch[1].split(', ');
						transformedX = window.parseInt(transformExploded[0], 0);
						transformedY = window.parseInt(transformExploded[1], 0);
					}
				}
				
				style[this._transitionPrefix + 'Property'] = '';
				style[this._transitionPrefix + 'Duration'] = '';
				style[this._transitionPrefix + 'TimingFunction'] = '';
				style[this._transitionPrefix + 'Delay'] = '';
				
				Util.DOM.setStyle(el, style);
				
				window.setTimeout(function(){
					
					if(!Util.isNothing(transformExploded)){
						
						style = {};
						style[this._transformLabel] = '';
						style.left = (domX + transformedX) + 'px';
						style.top = (domY + transformedY) + 'px';
						
						Util.DOM.setStyle(el, style);
						
					}
					
					if (!Util.isNothing(el[callbackLabel])){
						callback = el[callbackLabel];
						delete el[callbackLabel];
						callback(el);
					}
					
				}.bind(this), this._applyTransitionDelay);
				
			}
			
			
		}
		
		
	});
	
	
}
(
	window,
	window.Code.Util
));
// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.Util.TouchElement');
	
	
	Util.TouchElement.EventTypes = {
	
		onTouch: 'CodeUtilTouchElementOnTouch'
	
	};
	
	
	Util.TouchElement.ActionTypes = {
		
		touchStart: 'touchStart',
		touchMove: 'touchMove',
		touchEnd: 'touchEnd',
		touchMoveEnd: 'touchMoveEnd',
		tap: 'tap',
		doubleTap: 'doubleTap',
		swipeLeft: 'swipeLeft',
		swipeRight: 'swipeRight',
		swipeUp: 'swipeUp',
		swipeDown: 'swipeDown',
		gestureStart: 'gestureStart',
		gestureChange: 'gestureChange',
		gestureEnd: 'gestureEnd'
	
	};
	
	
}
(
	window, 
	window.klass, 
	window.Code.Util
));// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.Util.TouchElement');
	
	
	Util.TouchElement.TouchElementClass = klass({
		
		el: null,
		
		captureSettings: null,
		
		touchStartPoint: null,
		touchEndPoint: null,
		touchStartTime: null,
		doubleTapTimeout: null,
		
		touchStartHandler: null,
		touchMoveHandler: null,
		touchEndHandler: null,
		
		mouseDownHandler: null,
		mouseMoveHandler: null,
		mouseUpHandler: null,
		mouseOutHandler: null,
		
		gestureStartHandler: null,
		gestureChangeHandler: null,
		gestureEndHandler: null,
		
		swipeThreshold: null,
		swipeTimeThreshold: null,
		doubleTapSpeed: null,
		
		
		
		/*
		 * Function: dispose
		 */
		dispose: function(){
		
			var prop;
			
			this.removeEventHandlers();
			
			for (prop in this) {
				if (Util.objectHasProperty(this, prop)) {
					this[prop] = null;
				}
			}
		
		},
		
		
		
		/*
		 * Function: initialize
		 */
		initialize: function(el, captureSettings){
			
			this.el = el;
			
			this.captureSettings = {
				swipe: false,
				move: false,
				gesture: false,
				doubleTap: false,
				preventDefaultTouchEvents: true
			};
			
			Util.extend(this.captureSettings, captureSettings);
			
			this.swipeThreshold = 50;
			this.swipeTimeThreshold = 250;
			this.doubleTapSpeed = 250;
			
			this.touchStartPoint = { x: 0, y: 0 };
			this.touchEndPoint = { x: 0, y: 0 };
			
		},
		
		
		
		/*
		 * Function: addEventHandlers
		 */
		addEventHandlers: function(){
		
			if (Util.isNothing(this.touchStartHandler)){
				this.touchStartHandler = this.onTouchStart.bind(this);
				this.touchMoveHandler = this.onTouchMove.bind(this);
				this.touchEndHandler = this.onTouchEnd.bind(this);
				this.mouseDownHandler = this.onMouseDown.bind(this);
				this.mouseMoveHandler = this.onMouseMove.bind(this);
				this.mouseUpHandler = this.onMouseUp.bind(this);
				this.mouseOutHandler = this.onMouseOut.bind(this);
				this.gestureStartHandler = this.onGestureStart.bind(this);
				this.gestureChangeHandler = this.onGestureChange.bind(this);
				this.gestureEndHandler = this.onGestureEnd.bind(this);
			}
			
			Util.Events.add(this.el, 'touchstart', this.touchStartHandler);
			if (this.captureSettings.move){
				Util.Events.add(this.el, 'touchmove', this.touchMoveHandler);
			}
			Util.Events.add(this.el, 'touchend', this.touchEndHandler);
			
			Util.Events.add(this.el, 'mousedown', this.mouseDownHandler);
			
			if (Util.Browser.isGestureSupported && this.captureSettings.gesture){
				Util.Events.add(this.el, 'gesturestart', this.gestureStartHandler);
				Util.Events.add(this.el, 'gesturechange', this.gestureChangeHandler);
				Util.Events.add(this.el, 'gestureend', this.gestureEndHandler);
			}
			
		},
		
		
		
		/*
		 * Function: removeEventHandlers
		 */
		removeEventHandlers: function(){
			
			Util.Events.remove(this.el, 'touchstart', this.touchStartHandler);
			if (this.captureSettings.move){
				Util.Events.remove(this.el, 'touchmove', this.touchMoveHandler);
			}
			Util.Events.remove(this.el, 'touchend', this.touchEndHandler);
			Util.Events.remove(this.el, 'mousedown', this.mouseDownHandler);
			
			if (Util.Browser.isGestureSupported && this.captureSettings.gesture){
				Util.Events.remove(this.el, 'gesturestart', this.gestureStartHandler);
				Util.Events.remove(this.el, 'gesturechange', this.gestureChangeHandler);
				Util.Events.remove(this.el, 'gestureend', this.gestureEndHandler);
			}
			
		},
		
		
		
		/*
		 * Function: getTouchPoint
		 */
		getTouchPoint: function(touches){
			
			return {
				x: touches[0].pageX,
				y: touches[0].pageY
			};
			
		},
		
		
		
		/*
		 * Function: fireTouchEvent
		 */
		fireTouchEvent: function(e){
			
			var 
				action,
				distX = 0,
				distY = 0,
				dist = 0,
				self,
				endTime,
				diffTime;

			distX = this.touchEndPoint.x - this.touchStartPoint.x;
			distY = this.touchEndPoint.y - this.touchStartPoint.y;
			dist = Math.sqrt( (distX * distX) + (distY * distY) );
			
			if (this.captureSettings.swipe){
				endTime = new Date();
				diffTime = endTime - this.touchStartTime;
				
				// See if there was a swipe gesture
				if (diffTime <= this.swipeTimeThreshold){
					
					if (window.Math.abs(distX) >= this.swipeThreshold){
					
						Util.Events.fire(this, { 
							type: Util.TouchElement.EventTypes.onTouch, 
							target: this, 
							point: this.touchEndPoint,
							action: (distX < 0) ? Util.TouchElement.ActionTypes.swipeLeft : Util.TouchElement.ActionTypes.swipeRight,
							targetEl: e.target,
							currentTargetEl: e.currentTarget
						});
						return;
						
					}
					
					
					if (window.Math.abs(distY) >= this.swipeThreshold){
						
						Util.Events.fire(this, { 
							type: Util.TouchElement.EventTypes.onTouch, 
							target: this, 
							point: this.touchEndPoint,
							action: (distY < 0) ? Util.TouchElement.ActionTypes.swipeUp : Util.TouchElement.ActionTypes.swipeDown,
							targetEl: e.target,
							currentTargetEl: e.currentTarget
						});
						return;
					
					}
					
				}
			}
			
			
			if (dist > 1){
			
				Util.Events.fire(this, { 
					type: Util.TouchElement.EventTypes.onTouch, 
					target: this, 
					action: Util.TouchElement.ActionTypes.touchMoveEnd,
					point: this.touchEndPoint,
					targetEl: e.target,
					currentTargetEl: e.currentTarget
				});
				return;
			}
			
			
			if (!this.captureSettings.doubleTap){
				
				Util.Events.fire(this, { 
					type: Util.TouchElement.EventTypes.onTouch, 
					target: this, 
					point: this.touchEndPoint,
					action: Util.TouchElement.ActionTypes.tap,
					targetEl: e.target,
					currentTargetEl: e.currentTarget
				});
				return;
				
			}
			
			if (Util.isNothing(this.doubleTapTimeout)){
				
				this.doubleTapTimeout = window.setTimeout(function(){
					
					this.doubleTapTimeout = null;
					
					Util.Events.fire(this, { 
						type: Util.TouchElement.EventTypes.onTouch, 
						target: this, 
						point: this.touchEndPoint,
						action: Util.TouchElement.ActionTypes.tap,
						targetEl: e.target,
						currentTargetEl: e.currentTarget
					});
					
				}.bind(this), this.doubleTapSpeed);
				
				return;
				
			}
			else{
				
				window.clearTimeout(this.doubleTapTimeout);
				this.doubleTapTimeout = null;
			
				Util.Events.fire(this, { 
					type: Util.TouchElement.EventTypes.onTouch, 
					target: this, 
					point: this.touchEndPoint,
					action: Util.TouchElement.ActionTypes.doubleTap,
					targetEl: e.target,
					currentTargetEl: e.currentTarget
				});
				
			}
			
		},
		
		
		
		/*
		 * Function: onTouchStart
		 */
		onTouchStart: function(e){
			
			if (this.captureSettings.preventDefaultTouchEvents){
				e.preventDefault();
			}
			
			// No longer need mouse events
			Util.Events.remove(this.el, 'mousedown', this.mouseDownHandler);
			
			var 
				touchEvent = Util.Events.getTouchEvent(e),
				touches = touchEvent.touches;
			
			if (touches.length > 1 && this.captureSettings.gesture){
				this.isGesture = true;
				return;
			}
			
			this.touchStartTime = new Date();
			this.isGesture = false;
			this.touchStartPoint = this.getTouchPoint(touches);
			
			Util.Events.fire(this, { 
				type: Util.TouchElement.EventTypes.onTouch, 
				target: this, 
				action: Util.TouchElement.ActionTypes.touchStart,
				point: this.touchStartPoint,
				targetEl: e.target,
				currentTargetEl: e.currentTarget
			});
			
			
		},
		
		
		
		/*
		 * Function: onTouchMove
		 */
		onTouchMove: function(e){
			
			if (this.captureSettings.preventDefaultTouchEvents){
				e.preventDefault();
			}
			
			if (this.isGesture && this.captureSettings.gesture){
				return;
			}
			
			var 
				touchEvent = Util.Events.getTouchEvent(e),
				touches = touchEvent.touches;
			
			Util.Events.fire(this, { 
				type: Util.TouchElement.EventTypes.onTouch, 
				target: this, 
				action: Util.TouchElement.ActionTypes.touchMove,
				point: this.getTouchPoint(touches),
				targetEl: e.target,
				currentTargetEl: e.currentTarget
			});
			
		},
		
		
		
		/*
		 * Function: onTouchEnd
		 */
		onTouchEnd: function(e){
			
			if (this.isGesture && this.captureSettings.gesture){
				return;
			}
			
			if (this.captureSettings.preventDefaultTouchEvents){
				e.preventDefault();
			}
			
			// http://backtothecode.blogspot.com/2009/10/javascript-touch-and-gesture-events.html
			// iOS removed the current touch from e.touches on "touchend"
			// Need to look into e.changedTouches
			
			var 
				touchEvent = Util.Events.getTouchEvent(e),
				touches = (!Util.isNothing(touchEvent.changedTouches)) ? touchEvent.changedTouches : touchEvent.touches;
			
			this.touchEndPoint = this.getTouchPoint(touches);
			
			Util.Events.fire(this, { 
				type: Util.TouchElement.EventTypes.onTouch, 
				target: this, 
				action: Util.TouchElement.ActionTypes.touchEnd,
				point: this.touchEndPoint,
				targetEl: e.target,
				currentTargetEl: e.currentTarget
			});
				
			this.fireTouchEvent(e);
			
		},
		
		
		
		/*
		 * Function: onMouseDown
		 */
		onMouseDown: function(e){
			
			e.preventDefault();
			
			// No longer need touch events
			Util.Events.remove(this.el, 'touchstart', this.mouseDownHandler);
			Util.Events.remove(this.el, 'touchmove', this.touchMoveHandler);
			Util.Events.remove(this.el, 'touchend', this.touchEndHandler);
			
			// Add move/up/out
			if (this.captureSettings.move){
				Util.Events.add(this.el, 'mousemove', this.mouseMoveHandler);
			}
			Util.Events.add(this.el, 'mouseup', this.mouseUpHandler);
			Util.Events.add(this.el, 'mouseout', this.mouseOutHandler);
			
			this.touchStartTime = new Date();
			this.isGesture = false;
			this.touchStartPoint = Util.Events.getMousePosition(e);
			
			Util.Events.fire(this, { 
				type: Util.TouchElement.EventTypes.onTouch, 
				target: this, 
				action: Util.TouchElement.ActionTypes.touchStart,
				point: this.touchStartPoint,
				targetEl: e.target,
				currentTargetEl: e.currentTarget
			});
			
		},
		
		
		
		/*
		 * Function: onMouseMove
		 */
		onMouseMove: function(e){
			
			e.preventDefault();
			
			Util.Events.fire(this, { 
				type: Util.TouchElement.EventTypes.onTouch, 
				target: this, 
				action: Util.TouchElement.ActionTypes.touchMove,
				point: Util.Events.getMousePosition(e),
				targetEl: e.target,
				currentTargetEl: e.currentTarget
			});
			
		},
		
		
		
		/*
		 * Function: onMouseUp
		 */
		onMouseUp: function(e){
			
			e.preventDefault();
			
			if (this.captureSettings.move){
				Util.Events.remove(this.el, 'mousemove', this.mouseMoveHandler);
			}
			Util.Events.remove(this.el, 'mouseup', this.mouseUpHandler);
			Util.Events.remove(this.el, 'mouseout', this.mouseOutHandler);
			
			this.touchEndPoint = Util.Events.getMousePosition(e);
			
			Util.Events.fire(this, { 
				type: Util.TouchElement.EventTypes.onTouch, 
				target: this, 
				action: Util.TouchElement.ActionTypes.touchEnd,
				point: this.touchEndPoint,
				targetEl: e.target,
				currentTargetEl: e.currentTarget
			});
			
			this.fireTouchEvent(e);
		
		},
		
		
		
		/*
		 * Function: onMouseOut
		 */
		onMouseOut: function(e){
			
			/*
			 * http://blog.stchur.com/2007/03/15/mouseenter-and-mouseleave-events-for-firefox-and-other-non-ie-browsers/
			 */
			var relTarget = e.relatedTarget;
			if (this.el === relTarget || Util.DOM.isChildOf(relTarget, this.el)){ 
				return;
			}
			
			e.preventDefault();
			
			if (this.captureSettings.move){
				Util.Events.remove(this.el, 'mousemove', this.mouseMoveHandler);
			}
			Util.Events.remove(this.el, 'mouseup', this.mouseUpHandler);
			Util.Events.remove(this.el, 'mouseout', this.mouseOutHandler);
			
			this.touchEndPoint = Util.Events.getMousePosition(e);
			
			Util.Events.fire(this, { 
				type: Util.TouchElement.EventTypes.onTouch, 
				target: this, 
				action: Util.TouchElement.ActionTypes.touchEnd,
				point: this.touchEndPoint,
				targetEl: e.target,
				currentTargetEl: e.currentTarget
			});
			
			this.fireTouchEvent(e);
			
		},
		
		
		
		/*
		 * Function: onGestureStart
		 */
		onGestureStart: function(e){
		
			e.preventDefault();
			
			var touchEvent = Util.Events.getTouchEvent(e);
			
			Util.Events.fire(this, { 
				type: Util.TouchElement.EventTypes.onTouch, 
				target: this, 
				action: Util.TouchElement.ActionTypes.gestureStart,
				scale: touchEvent.scale,
				rotation: touchEvent.rotation,
				targetEl: e.target,
				currentTargetEl: e.currentTarget
			});
		
		},
		
		
		
		/*
		 * Function: onGestureChange
		 */
		onGestureChange: function(e){
		
			e.preventDefault();
			
			var touchEvent = Util.Events.getTouchEvent(e);
			
			Util.Events.fire(this, { 
				type: Util.TouchElement.EventTypes.onTouch, 
				target: this, 
				action: Util.TouchElement.ActionTypes.gestureChange,
				scale: touchEvent.scale,
				rotation: touchEvent.rotation,
				targetEl: e.target,
				currentTargetEl: e.currentTarget
			});
			
		},
		
		
		
		/*
		 * Function: onGestureEnd
		 */
		onGestureEnd: function(e){
		
			e.preventDefault();
			
			var touchEvent = Util.Events.getTouchEvent(e);
			
			Util.Events.fire(this, { 
				type: Util.TouchElement.EventTypes.onTouch, 
				target: this, 
				action: Util.TouchElement.ActionTypes.gestureEnd,
				scale: touchEvent.scale,
				rotation: touchEvent.rotation,
				targetEl: e.target,
				currentTargetEl: e.currentTarget
			});
			
		}
		
		
		
	});
	
	
	
}
(
	window, 
	window.klass, 
	window.Code.Util
));// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.PhotoSwipe.Image');
	var PhotoSwipe = window.Code.PhotoSwipe;
	
	
	
	PhotoSwipe.Image.EventTypes = {
		
		onLoad: 'onLoad',
		onError: 'onError'
		
	};
	
	
	
}
(
	window, 
	window.klass, 
	window.Code.Util
));// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.PhotoSwipe.Image');
	var PhotoSwipe = window.Code.PhotoSwipe;
	
	
	
	PhotoSwipe.Image.ImageClass = klass({
		
		
		
		refObj: null,
		imageEl: null,
		src: null,
		caption: null,
		metaData: null,
		imageLoadHandler: null,
		imageErrorHandler: null,
		
		
		
		/*
		 * Function: dispose
		 */
		dispose: function(){
		
			var prop, i;
			
			this.shrinkImage();
			
			for (prop in this) {
				if (Util.objectHasProperty(this, prop)) {
					this[prop] = null;
				}
			}
		
		},
		
		
		
		/*
		 * Function: initialize
		 */
		initialize: function(refObj, src, caption, metaData){
			
			this.refObj = refObj;
			// This is needed. Webkit resolves the src
			// value which means we can't compare against it in the load function
			this.originalSrc = src;
			this.src = src;
			this.caption = caption;
			this.metaData = metaData;
			
			this.imageEl = new window.Image();
			
			this.imageLoadHandler = this.onImageLoad.bind(this);
			this.imageErrorHandler = this.onImageError.bind(this);
			
		},
		
		
		
		/*
		 * Function: load
		 */
		load: function(){
			
			this.imageEl.originalSrc = Util.coalesce(this.imageEl.originalSrc, '');
			
			if (this.imageEl.originalSrc === this.src){
				
				if (this.imageEl.isError){
					Util.Events.fire(this, {
						type: PhotoSwipe.Image.EventTypes.onError,
						target: this
					});
				}
				else{
					Util.Events.fire(this, {
						type: PhotoSwipe.Image.EventTypes.onLoad,
						target: this
					});
				}
				return;
			}
			
			this.imageEl.isError = false;
			this.imageEl.isLoading = true;
			this.imageEl.naturalWidth = null;
			this.imageEl.naturalHeight = null;
			this.imageEl.isLandscape = false;
			this.imageEl.onload = this.imageLoadHandler;
			this.imageEl.onerror = this.imageErrorHandler;
			this.imageEl.onabort = this.imageErrorHandler;
			this.imageEl.originalSrc = this.src;
			this.imageEl.src = this.src;
			
		},
		
		
		
		/*
		 * Function: shrinkImage
		 */
		shrinkImage: function(){
		
			if (Util.isNothing(this.imageEl)){
				return;
			}
			
			if (this.imageEl.src.indexOf(this.src) > -1){
				this.imageEl.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
				if (!Util.isNothing(this.imageEl.parentNode)){
					Util.DOM.removeChild(this.imageEl, this.imageEl.parentNode);
				}
			}
		
		},
		
		
		
		/*
		 * Function: onImageLoad
		 */
		onImageLoad: function(e){
			
			this.imageEl.onload = null;
			this.imageEl.naturalWidth = Util.coalesce(this.imageEl.naturalWidth, this.imageEl.width);
			this.imageEl.naturalHeight = Util.coalesce(this.imageEl.naturalHeight, this.imageEl.height);
			this.imageEl.isLandscape = (this.imageEl.naturalWidth > this.imageEl.naturalHeight);
			this.imageEl.isLoading = false;
			
			Util.Events.fire(this, {
				type: PhotoSwipe.Image.EventTypes.onLoad,
				target: this
			});
			
		},
		
		
		
		/*
		 * Function: onImageError
		 */
		onImageError: function(e){
		
			this.imageEl.onload = null;
			this.imageEl.onerror = null;
			this.imageEl.onabort = null;
			this.imageEl.isLoading = false;
			this.imageEl.isError = true;
			
			Util.Events.fire(this, {
				type: PhotoSwipe.Image.EventTypes.onError,
				target: this
			});
			
		}
		
		
		
	});
	
	
	
}
(
	window, 
	window.klass, 
	window.Code.Util
));// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.PhotoSwipe.Cache');
	var PhotoSwipe = window.Code.PhotoSwipe;
	
	
	
	PhotoSwipe.Cache.Mode = {
		
		normal: 'normal',
		aggressive: 'aggressive'
		
	};
	
	
	
	PhotoSwipe.Cache.Functions = {
		
		/*
		 * Function: getImageSource
		 * Default method for returning an image's source
		 */
		getImageSource: function(el){
			return el.href;
		},
	
	
	
		/*
		 * Function: getImageCaption
		 * Default method for returning an image's caption
		 * Assumes the el is an anchor and the first child is the
		 * image. The returned value is the "alt" attribute of the
		 * image.
		 */
		getImageCaption: function(el){
			
			if (el.nodeName === "IMG"){
				return Util.DOM.getAttribute(el, 'alt'); 
			}
			var i, j, childEl;
			for (i=0, j=el.childNodes.length; i<j; i++){
				childEl = el.childNodes[i];
				if (el.childNodes[i].nodeName === 'IMG'){
					return Util.DOM.getAttribute(childEl, 'alt'); 
				}
			}
			
		},
	
	
	
		/*
		 * Function: getImageMetaData
		 * Can be used if you wish to store additional meta
		 * data against the full size image
		 */
		getImageMetaData: function(el){
			
			return  {};
			
		}
		
	};
	
	
	
	
}
(
	window, 
	window.klass, 
	window.Code.Util
));// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.PhotoSwipe.Cache');
	var PhotoSwipe = window.Code.PhotoSwipe;
	
	
	
	PhotoSwipe.Cache.CacheClass = klass({
		
		
		
		images: null,
		settings: null,
		
		
		
		/*
		 * Function: dispose
		 */
		dispose: function(){
		
			var prop, i, j;
			
			if (!Util.isNothing(this.images)){
				for (i=0, j=this.images.length; i<j; i++){
					this.images[i].dispose();
				}
				this.images.length = 0;
			}
			
			for (prop in this) {
				if (Util.objectHasProperty(this, prop)) {
					this[prop] = null;
				}
			}
		
		},
		
		
		
		/*
		 * Function: initialize
		 */
		initialize: function(images, options){
			
			var i, j, cacheImage, image, src, caption, metaData;
			
			this.settings = options;
			
			this.images = [];
			
			for (i=0, j=images.length; i<j; i++){
				
				image = images[i];
				src = this.settings.getImageSource(image);
				caption = this.settings.getImageCaption(image);
				metaData = this.settings.getImageMetaData(image);
				
				this.images.push(new PhotoSwipe.Image.ImageClass(image, src, caption, metaData));
				
			}
			
			
		},
		
		
		
		/*
		 * Function: getImages
		 */
		getImages: function(indexes){
		
			var i, j, retval = [], cacheImage;
			
			for (i=0, j=indexes.length; i<j; i++){
				cacheImage = this.images[indexes[i]];
				if (this.settings.cacheMode === PhotoSwipe.Cache.Mode.aggressive){
					cacheImage.cacheDoNotShrink = true;
				}
				retval.push(cacheImage);
			}
			
			if (this.settings.cacheMode === PhotoSwipe.Cache.Mode.aggressive){
				for (i=0, j=this.images.length; i<j; i++){
					cacheImage = this.images[i];
					if (!Util.objectHasProperty(cacheImage, 'cacheDoNotShrink')){
						cacheImage.shrinkImage();
					}
					else{
						delete cacheImage.cacheDoNotShrink;
					}
				}
			}
			
			return retval;
			
		}
		
		
	});
	
	
	
}
(
	window, 
	window.klass, 
	window.Code.Util,
	window.Code.PhotoSwipe.Image
));// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.PhotoSwipe.DocumentOverlay');
	var PhotoSwipe = window.Code.PhotoSwipe;
	
	
	
	PhotoSwipe.DocumentOverlay.CssClasses = {
		documentOverlay: 'ps-document-overlay'
	};
	
	
	
}
(
	window, 
	window.klass, 
	window.Code.Util
));// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.PhotoSwipe.DocumentOverlay');
	var PhotoSwipe = window.Code.PhotoSwipe;
	
	
	
	PhotoSwipe.DocumentOverlay.DocumentOverlayClass = klass({
		
		
		
		el: null,
		settings: null,
		initialBodyHeight: null,
		
		
		
		/*
		 * Function: dispose
		 */
		dispose: function(){
		
			var prop;
			
			Util.Animation.stop(this.el);
			Util.DOM.removeChild(this.el, this.el.parentNode);
			
			for (prop in this) {
				if (Util.objectHasProperty(this, prop)) {
					this[prop] = null;
				}
			}
		
		},
		
		
		
		/*
		 * Function: initialize
		 */
		initialize: function(options){
			
			this.settings = options;
			
			this.el = Util.DOM.createElement(
				'div', 
				{ 
					'class': PhotoSwipe.DocumentOverlay.CssClasses.documentOverlay
				}, 
				''
			);
			Util.DOM.setStyle(this.el, {
				display: 'block',
				position: 'absolute',
				left: 0,
				top: 0,
				zIndex: this.settings.zIndex
			});
		
			Util.DOM.hide(this.el);
			if (this.settings.target === window){
				Util.DOM.appendToBody(this.el);
			}
			else{
				Util.DOM.appendChild(this.el, this.settings.target);
			}
			
			Util.Animation.resetTranslate(this.el);
			
			// Store this value incase the body dimensions change to zero!
			// I've seen it happen! :D
			this.initialBodyHeight = Util.DOM.bodyOuterHeight();
			
			
		},
		
		
		
		/*
		 * Function: resetPosition
		 */
		resetPosition: function(){
			
			var width, height, top;
			
			if (this.settings.target === window){
				
				width = Util.DOM.windowWidth();
				height = Util.DOM.bodyOuterHeight() * 2; // This covers extra height added by photoswipe
				top = (this.settings.jQueryMobile) ? Util.DOM.windowScrollTop() + 'px' : '0px';
				
				if (height < 1){
					height = this.initialBodyHeight;
				}

				if (Util.DOM.windowHeight() > height){
					height = Util.DOM.windowHeight();
				}
				
			}
			else{
				
				width = Util.DOM.width(this.settings.target);
				height = Util.DOM.height(this.settings.target);
				top = '0px';
				
			}
			
			Util.DOM.setStyle(this.el, {
				width: width,
				height: height,
				top: top
			});
		
		},
		
		
		
		/*
		 * Function: fadeIn
		 */
		fadeIn: function(speed, callback){
		
			this.resetPosition();
			
			Util.DOM.setStyle(this.el, 'opacity', 0);
			Util.DOM.show(this.el);
			
			Util.Animation.fadeIn(this.el, speed, callback);
		
		}
		
		
	});
	
	
	
}
(
	window, 
	window.klass, 
	window.Code.Util
));// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.PhotoSwipe.Carousel');
	var PhotoSwipe = window.Code.PhotoSwipe;
	
	
	
	PhotoSwipe.Carousel.EventTypes = {
	
		onSlideByEnd: 'PhotoSwipeCarouselOnSlideByEnd',
		onSlideshowStart: 'PhotoSwipeCarouselOnSlideshowStart',
		onSlideshowStop: 'PhotoSwipeCarouselOnSlideshowStop'
		
	};
	
	
	
	PhotoSwipe.Carousel.CssClasses = {
		carousel: 'ps-carousel',
		content: 'ps-carousel-content',
		item: 'ps-carousel-item',
		itemLoading: 'ps-carousel-item-loading',
		itemError: 'ps-carousel-item-error'
	};
	
	
	
	PhotoSwipe.Carousel.SlideByAction = {
		previous: 'previous',
		current: 'current',
		next: 'next'
	};
	
	
}
(
	window, 
	window.klass, 
	window.Code.Util
));// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.PhotoSwipe.Carousel');
	var PhotoSwipe = window.Code.PhotoSwipe;
	
	
	PhotoSwipe.Carousel.CarouselClass = klass({
		
		
		
		el: null,
		contentEl: null,
		settings: null,
		cache: null,
		slideByEndHandler: null,
		currentCacheIndex: null,
		isSliding: null,
		isSlideshowActive: null,
		lastSlideByAction: null,
		touchStartPoint: null,
		touchStartPosition: null,
		imageLoadHandler: null,
		imageErrorHandler: null,
		slideshowTimeout: null,
		
		
		
		/*
		 * Function: dispose
		 */
		dispose: function(){
		
			var prop, i, j;
			
			for (i=0, j=this.cache.images.length; i<j; i++){
				Util.Events.remove(this.cache.images[i], PhotoSwipe.Image.EventTypes.onLoad, this.imageLoadHandler);
				Util.Events.remove(this.cache.images[i], PhotoSwipe.Image.EventTypes.onError, this.imageErrorHandler);
			}
			
			this.stopSlideshow();
			Util.Animation.stop(this.el);
			Util.DOM.removeChild(this.el, this.el.parentNode);
			
			for (prop in this) {
				if (Util.objectHasProperty(this, prop)) {
					this[prop] = null;
				}
			}
		
		},
		
		
		
		/*
		 * Function: initialize
		 */
		initialize: function(cache, options){
			
			//this.supr(true);
			
			var i, totalItems, itemEl;
			
			this.cache = cache;
			this.settings = options;
			this.slideByEndHandler = this.onSlideByEnd.bind(this);
			this.imageLoadHandler = this.onImageLoad.bind(this);
			this.imageErrorHandler = this.onImageError.bind(this);
			this.currentCacheIndex = 0;
			this.isSliding = false;
			this.isSlideshowActive = false;
			
			// No looping if < 3 images
			if (this.cache.images.length < 3){
				this.settings.loop = false;
			}
			
			// Main container 
			this.el = Util.DOM.createElement(
				'div', 
				{ 
					'class': PhotoSwipe.Carousel.CssClasses.carousel
				}, 
				''
			);
			Util.DOM.setStyle(this.el, {
				display: 'block',
				position: 'absolute',
				left: 0,
				top: 0,
				overflow: 'hidden',
				zIndex: this.settings.zIndex
			});
			Util.DOM.hide(this.el);
			
			
			// Content
			this.contentEl = Util.DOM.createElement(
				'div', 
				{ 
					'class': PhotoSwipe.Carousel.CssClasses.content
				}, 
				''
			);
			Util.DOM.setStyle(this.contentEl, {
				display: 'block',
				position: 'absolute',
				left: 0,
				top: 0
			});
			
			Util.DOM.appendChild(this.contentEl, this.el);
			
			
			// Items
			totalItems = (cache.images.length < 3) ? cache.images.length : 3;
			
			for (i=0; i<totalItems; i++){
				
				itemEl = Util.DOM.createElement(
					'div', 
					{ 
						'class': PhotoSwipe.Carousel.CssClasses.item + 
						' ' + PhotoSwipe.Carousel.CssClasses.item + '-'+ i
					}, 
					''
				);
				Util.DOM.setAttribute(itemEl, 'style', 'float: left;');
				Util.DOM.setStyle(itemEl, {
					display: 'block',
					position: 'relative',
					left: 0,
					top: 0,
					overflow: 'hidden'
				});
				
				if (this.settings.margin > 0){
					Util.DOM.setStyle(itemEl, {
						marginRight: this.settings.margin + 'px'
					});
				}
				
				Util.DOM.appendChild(itemEl, this.contentEl);
				
			}
			
			
			if (this.settings.target === window){
				Util.DOM.appendToBody(this.el);
			}
			else{
				Util.DOM.appendChild(this.el, this.settings.target);
			}
			
		},
		
		
		
		
		/*
		 * Function: resetPosition
		 */
		resetPosition: function(){
			
			var width, height, top, itemWidth, itemEls, contentWidth, i, j, itemEl, imageEl;
			
			if (this.settings.target === window){
				width = Util.DOM.windowWidth();
				height = Util.DOM.windowHeight();
				top = Util.DOM.windowScrollTop()  + 'px';
			}
			else{
				width = Util.DOM.width(this.settings.target);
				height = Util.DOM.height(this.settings.target);
				top = '0px';
			}
			
			itemWidth = (this.settings.margin > 0) ? width + this.settings.margin : width;
			itemEls = Util.DOM.find('.' + PhotoSwipe.Carousel.CssClasses.item, this.contentEl);
			contentWidth = itemWidth * itemEls.length;
			
			
			// Set the height and width to fill the document
			Util.DOM.setStyle(this.el, {
				top: top,
				width: width,
				height: height
			});
			
			
			// Set the height and width of the content el
			Util.DOM.setStyle(this.contentEl, {
				width: contentWidth,
				height: height
			});
			
			
			// Set the height and width of item elements
			for (i=0, j=itemEls.length; i<j; i++){
				
				itemEl = itemEls[i];
				Util.DOM.setStyle(itemEl, {
					width: width,
					height: height
				});
				
				// If an item has an image then resize that
				imageEl = Util.DOM.find('img', itemEl)[0];
				if (!Util.isNothing(imageEl)){
					this.resetImagePosition(imageEl);
				}
				
			}
			
			this.setContentLeftPosition();
			
			
		},
		
		
		
		/*
		 * Function: resetImagePosition
		 */
		resetImagePosition: function(imageEl){
			
			if (Util.isNothing(imageEl)){
				return;
			}
			
			var 
				src = Util.DOM.getAttribute(imageEl, 'src'),
				scale, 
				newWidth, 
				newHeight, 
				newTop, 
				newLeft,
				maxWidth = Util.DOM.width(this.el),
				maxHeight = Util.DOM.height(this.el);
			
			if (this.settings.imageScaleMethod === 'fitNoUpscale'){
				
				newWidth = imageEl.naturalWidth;
				newHeight =imageEl.naturalHeight;
				
				if (newWidth > maxWidth){
					scale = maxWidth / newWidth;
					newWidth = Math.round(newWidth * scale);
					newHeight = Math.round(newHeight * scale);
				}
				
				if (newHeight > maxHeight){
					scale = maxHeight / newHeight;
					newHeight = Math.round(newHeight * scale);
					newWidth = Math.round(newWidth * scale);
				}
				
			}
			else{
				
				if (imageEl.isLandscape) {
					// Ensure the width fits the screen
					scale = maxWidth / imageEl.naturalWidth;
				}
				else {
					// Ensure the height fits the screen
					scale = maxHeight / imageEl.naturalHeight;
				}
				
				newWidth = Math.round(imageEl.naturalWidth * scale);
				newHeight = Math.round(imageEl.naturalHeight * scale);
				
				if (this.settings.imageScaleMethod === 'zoom'){
					
					scale = 1;
					if (newHeight < maxHeight){
						scale = maxHeight /newHeight;	
					}
					else if (newWidth < maxWidth){
						scale = maxWidth /newWidth;	
					}
					
					if (scale !== 1) {
						newWidth = Math.round(newWidth * scale);
						newHeight = Math.round(newHeight * scale);
					}
					
				}
				else if (this.settings.imageScaleMethod === 'fit') {
					// Rescale again to ensure full image fits into the viewport
					scale = 1;
					if (newWidth > maxWidth) {
						scale = maxWidth / newWidth;
					}
					else if (newHeight > maxHeight) {
						scale = maxHeight / newHeight;
					}
					if (scale !== 1) {
						newWidth = Math.round(newWidth * scale);
						newHeight = Math.round(newHeight * scale);
					}
				}
			
			}
			
			newTop = Math.round( ((maxHeight - newHeight) / 2) ) + 'px';
			newLeft = Math.round( ((maxWidth - newWidth) / 2) ) + 'px';
			
			Util.DOM.setStyle(imageEl, {
				position: 'absolute',
				width: newWidth,
				height: newHeight,
				top: newTop,
				left: newLeft,
				display: 'block'
			});
		
		},
		
		
		
		/*
		 * Function: setContentLeftPosition
		 */
		setContentLeftPosition: function(){
		
			var width, itemEls, left;
			if (this.settings.target === window){
				width = Util.DOM.windowWidth();
			}
			else{
				width = Util.DOM.width(this.settings.target);
			}
			
			itemEls = this.getItemEls();
			left = 0;
				
			if (this.settings.loop){
				left = (width + this.settings.margin) * -1;
			}
			else{
				
				if (this.currentCacheIndex === this.cache.images.length-1){
					left = ((itemEls.length-1) * (width + this.settings.margin)) * -1;
				}
				else if (this.currentCacheIndex > 0){
					left = (width + this.settings.margin) * -1;
				}
				
			}
			
			Util.DOM.setStyle(this.contentEl, {
				left: left + 'px'
			});
			
		},
		
		
		
		/*
		 * Function: 
		 */
		show: function(index){
			
			this.currentCacheIndex = index;
			this.resetPosition();
			this.setImages(false);
			Util.DOM.show(this.el);
			
			Util.Animation.resetTranslate(this.contentEl);
			var 
				itemEls = this.getItemEls(),
				i, j;
			for (i=0, j=itemEls.length; i<j; i++){
				Util.Animation.resetTranslate(itemEls[i]);
			}
			
			Util.Events.fire(this, {
				type: PhotoSwipe.Carousel.EventTypes.onSlideByEnd,
				target: this,
				action: PhotoSwipe.Carousel.SlideByAction.current,
				cacheIndex: this.currentCacheIndex
			});
			
		},
		
		
		
		/*
		 * Function: setImages
		 */
		setImages: function(ignoreCurrent){
			
			var 
				cacheImages,
				itemEls = this.getItemEls(),
				nextCacheIndex = this.currentCacheIndex + 1,
				previousCacheIndex = this.currentCacheIndex - 1;
			
			if (this.settings.loop){
				
				if (nextCacheIndex > this.cache.images.length-1){
					nextCacheIndex = 0;
				}
				if (previousCacheIndex < 0){
					previousCacheIndex = this.cache.images.length-1;
				}
				
				cacheImages = this.cache.getImages([
					previousCacheIndex,
					this.currentCacheIndex,
					nextCacheIndex
				]);
				
				if (!ignoreCurrent){
					// Current
					this.addCacheImageToItemEl(cacheImages[1], itemEls[1]);
				}
				// Next
				this.addCacheImageToItemEl(cacheImages[2], itemEls[2]);
				// Previous
				this.addCacheImageToItemEl(cacheImages[0], itemEls[0]);
				
			}
			else{
			
				if (itemEls.length === 1){
					if (!ignoreCurrent){
						// Current
						cacheImages = this.cache.getImages([
							this.currentCacheIndex
						]);
						this.addCacheImageToItemEl(cacheImages[0], itemEls[0]);
					}
				}
				else if (itemEls.length === 2){
					
					if (this.currentCacheIndex === 0){
						cacheImages = this.cache.getImages([
							this.currentCacheIndex,
							this.currentCacheIndex + 1
						]);
						if (!ignoreCurrent){
							this.addCacheImageToItemEl(cacheImages[0], itemEls[0]);
						}
						this.addCacheImageToItemEl(cacheImages[1], itemEls[1]);
					}
					else{
						cacheImages = this.cache.getImages([
							this.currentCacheIndex - 1,
							this.currentCacheIndex
						]);
						if (!ignoreCurrent){
							this.addCacheImageToItemEl(cacheImages[1], itemEls[1]);
						}
						this.addCacheImageToItemEl(cacheImages[0], itemEls[0]);
					}
					
				}
				else{
					
					if (this.currentCacheIndex === 0){
						cacheImages = this.cache.getImages([
							this.currentCacheIndex,
							this.currentCacheIndex + 1,
							this.currentCacheIndex + 2
						]);
						if (!ignoreCurrent){
							this.addCacheImageToItemEl(cacheImages[0], itemEls[0]);
						}
						this.addCacheImageToItemEl(cacheImages[1], itemEls[1]);
						this.addCacheImageToItemEl(cacheImages[2], itemEls[2]);
					}
					else if (this.currentCacheIndex === this.cache.images.length-1){
						cacheImages = this.cache.getImages([
							this.currentCacheIndex - 2,
							this.currentCacheIndex - 1,
							this.currentCacheIndex
						]);
						if (!ignoreCurrent){
							// Current
							this.addCacheImageToItemEl(cacheImages[2], itemEls[2]);
						}
						this.addCacheImageToItemEl(cacheImages[1], itemEls[1]);
						this.addCacheImageToItemEl(cacheImages[0], itemEls[0]);
					}
					else{
						cacheImages = this.cache.getImages([
							this.currentCacheIndex - 1,
							this.currentCacheIndex,
							this.currentCacheIndex + 1
						]);
						
						if (!ignoreCurrent){
							// Current
							this.addCacheImageToItemEl(cacheImages[1], itemEls[1]);
						}
						// Next
						this.addCacheImageToItemEl(cacheImages[2], itemEls[2]);
						// Previous
						this.addCacheImageToItemEl(cacheImages[0], itemEls[0]);
					}
					
				}
			
			}
		
		},
		
		
		
		/*
		 * Function: addCacheImageToItemEl
		 */
		addCacheImageToItemEl: function(cacheImage, itemEl){
			
			Util.DOM.removeClass(itemEl, PhotoSwipe.Carousel.CssClasses.itemError);
			Util.DOM.addClass(itemEl, PhotoSwipe.Carousel.CssClasses.itemLoading);
			
			Util.DOM.removeChildren(itemEl);
			
			Util.DOM.setStyle(cacheImage.imageEl, {
				display: 'none'
			});
			Util.DOM.appendChild(cacheImage.imageEl, itemEl);
			
			Util.Animation.resetTranslate(cacheImage.imageEl);
			
			Util.Events.add(cacheImage, PhotoSwipe.Image.EventTypes.onLoad, this.imageLoadHandler);
			Util.Events.add(cacheImage, PhotoSwipe.Image.EventTypes.onError, this.imageErrorHandler);
			
			cacheImage.load();
			
		},
		
		
		
		/*
		 * Function: slideCarousel
		 */
		slideCarousel: function(point, action, speed){
			
			if (this.isSliding){
				return;
			}
			
			var width, diffX, slideBy;
			
			if (this.settings.target === window){
				width = Util.DOM.windowWidth() + this.settings.margin;
			}
			else{
				width = Util.DOM.width(this.settings.target) + this.settings.margin;
			}
			
			speed = Util.coalesce(speed, this.settings.slideSpeed);
			
			if (window.Math.abs(diffX) < 1){
				return;
			}
			
			
			switch (action){
				
				case Util.TouchElement.ActionTypes.swipeLeft:
					
					slideBy = width * -1;
					break;
					
				case Util.TouchElement.ActionTypes.swipeRight:
				
					slideBy = width;
					break;
				
				default:
					
					diffX = point.x - this.touchStartPoint.x;
					
					if (window.Math.abs(diffX) > width / 2){
						slideBy = (diffX > 0) ? width : width * -1;
					}
					else{
						slideBy = 0;
					}
					break;
			
			}
			
			if (slideBy < 0){
				this.lastSlideByAction = PhotoSwipe.Carousel.SlideByAction.next;
			}
			else if (slideBy > 0){
				this.lastSlideByAction = PhotoSwipe.Carousel.SlideByAction.previous;
			}
			else{
				this.lastSlideByAction = PhotoSwipe.Carousel.SlideByAction.current;
			}
			
			// Check for non-looping carousels
			// If we are at the start or end, spring back to the current item element
			if (!this.settings.loop){
				if ( (this.lastSlideByAction === PhotoSwipe.Carousel.SlideByAction.previous && this.currentCacheIndex === 0 ) || (this.lastSlideByAction === PhotoSwipe.Carousel.SlideByAction.next && this.currentCacheIndex === this.cache.images.length-1) ){
					slideBy = 0;
					this.lastSlideByAction = PhotoSwipe.Carousel.SlideByAction.current;
				}
			}
			
			this.isSliding = true;
			this.doSlideCarousel(slideBy, speed);
			
		},
		
		
		
		/*
		 * Function: 
		 */
		moveCarousel: function(point){
			
			if (this.isSliding){
				return;
			}
			
			if (!this.settings.enableDrag){
				return;
			}
			
			this.doMoveCarousel(point.x - this.touchStartPoint.x);
			
		},
		
		
		
		/*
		 * Function: getItemEls
		 */
		getItemEls: function(){
		
			return Util.DOM.find('.' + PhotoSwipe.Carousel.CssClasses.item, this.contentEl);
		
		},
		
		
		
		/*
		 * Function: previous
		 */
		previous: function(){
			
			this.stopSlideshow();
			this.slideCarousel({x:0, y:0}, Util.TouchElement.ActionTypes.swipeRight, this.settings.nextPreviousSlideSpeed);
		
		},
		
		
		
		/*
		 * Function: next
		 */
		next: function(){
			
			this.stopSlideshow();
			this.slideCarousel({x:0, y:0}, Util.TouchElement.ActionTypes.swipeLeft, this.settings.nextPreviousSlideSpeed);
		
		},
		
		
		
		/*
		 * Function: slideshowNext
		 */
		slideshowNext: function(){
		
			this.slideCarousel({x:0, y:0}, Util.TouchElement.ActionTypes.swipeLeft);
		
		},
		
		
		
		
		/*
		 * Function: startSlideshow
		 */
		startSlideshow: function(){
			
			this.stopSlideshow();
			
			this.isSlideshowActive = true;
			
			this.slideshowTimeout = window.setTimeout(this.slideshowNext.bind(this), this.settings.slideshowDelay);
			
			Util.Events.fire(this, {
				type: PhotoSwipe.Carousel.EventTypes.onSlideshowStart,
				target: this
			});
			
		},
		
		
		
		/*
		 * Function: stopSlideshow
		 */
		stopSlideshow: function(){
			
			if (!Util.isNothing(this.slideshowTimeout)){
			
				window.clearTimeout(this.slideshowTimeout);
				this.slideshowTimeout = null;
				this.isSlideshowActive = false;
				
				Util.Events.fire(this, {
					type: PhotoSwipe.Carousel.EventTypes.onSlideshowStop,
					target: this
				});
			
			}
			
		},
		
		
		
		/*
		 * Function: onSlideByEnd
		 */
		onSlideByEnd: function(e){
			
			if (Util.isNothing(this.isSliding)){
				return;
			}
			
			var itemEls = this.getItemEls();
			
			this.isSliding = false;
			
			if (this.lastSlideByAction === PhotoSwipe.Carousel.SlideByAction.next){
				this.currentCacheIndex = this.currentCacheIndex + 1;
			}
			else if (this.lastSlideByAction === PhotoSwipe.Carousel.SlideByAction.previous){
				this.currentCacheIndex = this.currentCacheIndex - 1;
			}
			
			if (this.settings.loop){
				
				if (this.lastSlideByAction === PhotoSwipe.Carousel.SlideByAction.next){
					// Move first to the last
					Util.DOM.appendChild(itemEls[0], this.contentEl);
				}
				else if (this.lastSlideByAction === PhotoSwipe.Carousel.SlideByAction.previous){
					// Move the last to the first
					Util.DOM.insertBefore(itemEls[itemEls.length-1], itemEls[0], this.contentEl);
				}
				
				if (this.currentCacheIndex < 0){
					this.currentCacheIndex = this.cache.images.length - 1;
				}
				else if (this.currentCacheIndex === this.cache.images.length){
					this.currentCacheIndex = 0;
				}
				
			}
			else{
				
				if (this.cache.images.length > 3){
					
					if (this.currentCacheIndex > 1 && this.currentCacheIndex < this.cache.images.length-2){
						if (this.lastSlideByAction === PhotoSwipe.Carousel.SlideByAction.next){
							// Move first to the last
							Util.DOM.appendChild(itemEls[0], this.contentEl);
						}
						else if (this.lastSlideByAction === PhotoSwipe.Carousel.SlideByAction.previous){
							// Move the last to the first
							Util.DOM.insertBefore(itemEls[itemEls.length-1], itemEls[0], this.contentEl);
						}
					}
					else if (this.currentCacheIndex === 1){
						if (this.lastSlideByAction === PhotoSwipe.Carousel.SlideByAction.previous){
							// Move the last to the first
							Util.DOM.insertBefore(itemEls[itemEls.length-1], itemEls[0], this.contentEl);
						}
					}
					else if (this.currentCacheIndex === this.cache.images.length-2){
						if (this.lastSlideByAction === PhotoSwipe.Carousel.SlideByAction.next){
							// Move first to the last
							Util.DOM.appendChild(itemEls[0], this.contentEl);
						}
					}
				
				}
				
				
			}
			
			if (this.lastSlideByAction !== PhotoSwipe.Carousel.SlideByAction.current){
				this.setContentLeftPosition();
				this.setImages(true);
			}
			
			
			Util.Events.fire(this, {
				type: PhotoSwipe.Carousel.EventTypes.onSlideByEnd,
				target: this,
				action: this.lastSlideByAction,
				cacheIndex: this.currentCacheIndex
			});
			
			
			if (this.isSlideshowActive){
				
				if (this.lastSlideByAction !== PhotoSwipe.Carousel.SlideByAction.current){
					this.startSlideshow();
				}
				else{
					this.stopSlideshow();
				}
			
			}
			
			
		},
		
		
		
		/*
		 * Function: onTouch
		 */
		onTouch: function(action, point){
			
			this.stopSlideshow();
			
			switch(action){
				
				case Util.TouchElement.ActionTypes.touchStart:
					this.touchStartPoint = point;
					this.touchStartPosition = {
						x: window.parseInt(Util.DOM.getStyle(this.contentEl, 'left'), 0),
						y: window.parseInt(Util.DOM.getStyle(this.contentEl, 'top'), 0)
					};
					break;
				
				case Util.TouchElement.ActionTypes.touchMove:
					this.moveCarousel(point);
					break;
					
				case Util.TouchElement.ActionTypes.touchMoveEnd:
				case Util.TouchElement.ActionTypes.swipeLeft:
				case Util.TouchElement.ActionTypes.swipeRight:
					this.slideCarousel(point, action);
					break;
					
				case Util.TouchElement.ActionTypes.tap:
					break;
					
				case Util.TouchElement.ActionTypes.doubleTap:
					break;
				
				
			}
			
		},
		
		
		
		/*
		 * Function: onImageLoad
		 */
		onImageLoad: function(e){
			
			var cacheImage = e.target;
			
			if (!Util.isNothing(cacheImage.imageEl.parentNode)){
				Util.DOM.removeClass(cacheImage.imageEl.parentNode, PhotoSwipe.Carousel.CssClasses.itemLoading);
				this.resetImagePosition(cacheImage.imageEl);
			}
			
			Util.Events.remove(cacheImage, PhotoSwipe.Image.EventTypes.onLoad, this.imageLoadHandler);
			Util.Events.remove(cacheImage, PhotoSwipe.Image.EventTypes.onError, this.imageErrorHandler);
			
		},
		
		
		
		/*
		 * Function: onImageError
		 */
		onImageError: function(e){
			
			var cacheImage = e.target;
			
			if (!Util.isNothing(cacheImage.imageEl.parentNode)){
				Util.DOM.removeClass(cacheImage.imageEl.parentNode, PhotoSwipe.Carousel.CssClasses.itemLoading);
				Util.DOM.addClass(cacheImage.imageEl.parentNode, PhotoSwipe.Carousel.CssClasses.itemError);
			}
			
			Util.Events.remove(cacheImage, PhotoSwipe.Image.EventTypes.onLoad, this.imageLoadHandler);
			Util.Events.remove(cacheImage, PhotoSwipe.Image.EventTypes.onError, this.imageErrorHandler);
			
		}
		
		
		
	});
	
	
	
}
(
	window, 
	window.klass, 
	window.Code.Util
));// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function(window, klass, Util, TouchElement){
	
	
	Util.registerNamespace('Code.PhotoSwipe.Carousel');
	var PhotoSwipe = window.Code.PhotoSwipe;
	
	
	PhotoSwipe.Carousel.CarouselClass = PhotoSwipe.Carousel.CarouselClass.extend({
	
		
		/*
		 * Function: getStartingPos
		 */
		getStartingPos: function(){
			
			var startingPos = this.touchStartPosition;
			
			if (Util.isNothing(startingPos)){
				startingPos = {
					x: window.parseInt(Util.DOM.getStyle(this.contentEl, 'left'), 0),
					y: window.parseInt(Util.DOM.getStyle(this.contentEl, 'top'), 0)
				};
			}
			
			return startingPos;
		
		},
		
		
		
		/*
		 * Function: doMoveCarousel
		 */
		doMoveCarousel: function(xVal){
			
			var style;
			
			if (Util.Browser.isCSSTransformSupported){
				
				style = {};
				
				style[Util.Animation._transitionPrefix + 'Property'] = 'all';
				style[Util.Animation._transitionPrefix + 'Duration'] = '';
				style[Util.Animation._transitionPrefix + 'TimingFunction'] = '';
				style[Util.Animation._transitionPrefix + 'Delay'] = '0';
				style[Util.Animation._transformLabel] = (Util.Browser.is3dSupported) ? 'translate3d(' + xVal + 'px, 0px, 0px)' : 'translate(' + xVal + 'px, 0px)';
				
				Util.DOM.setStyle(this.contentEl, style);
			
			}
			else if (!Util.isNothing(window.jQuery)){
				
				
				window.jQuery(this.contentEl).stop().css('left', this.getStartingPos().x + xVal + 'px');
				
			}
			
		},
		
		
		
		/*
		 * Function: doSlideCarousel
		 */
		doSlideCarousel: function(xVal, speed){
			
			var animateProps, transform;
			
			if (speed <= 0){
				
				this.slideByEndHandler();
				return;
				
			}
			
			
			if (Util.Browser.isCSSTransformSupported){
				
				transform = Util.coalesce(this.contentEl.style.webkitTransform, this.contentEl.style.MozTransform, this.contentEl.style.transform, '');
				if (transform.indexOf('translate3d(' + xVal) === 0){
					this.slideByEndHandler();
					return;
				}
				else if (transform.indexOf('translate(' + xVal) === 0){
					this.slideByEndHandler();
					return;
				}
				
				Util.Animation.slideBy(this.contentEl, xVal, 0, speed, this.slideByEndHandler, this.settings.slideTimingFunction);
				
			}
			else if (!Util.isNothing(window.jQuery)){
				
				animateProps = {
					left: this.getStartingPos().x + xVal + 'px'
				};
		
				if (this.settings.animationTimingFunction === 'ease-out'){
					this.settings.animationTimingFunction = 'easeOutQuad';
				}
				
				if ( Util.isNothing(window.jQuery.easing[this.settings.animationTimingFunction]) ){
					this.settings.animationTimingFunction = 'linear';
				}
			
				window.jQuery(this.contentEl).animate(
					animateProps, 
					this.settings.slideSpeed, 
					this.settings.animationTimingFunction,
					this.slideByEndHandler
				);
			
			}
			
			
		}
	
	});
	
	
	
}
(
	window, 
	window.klass, 
	window.Code.Util,
	window.Code.PhotoSwipe.TouchElement
));// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.PhotoSwipe.Toolbar');
	var PhotoSwipe = window.Code.PhotoSwipe;
	
	
	PhotoSwipe.Toolbar.CssClasses = {
		toolbar: 'ps-toolbar',
		toolbarContent: 'ps-toolbar-content',
		toolbarTop: 'ps-toolbar-top',
		caption: 'ps-caption',
		captionBottom: 'ps-caption-bottom',
		captionContent: 'ps-caption-content',
		close: 'ps-toolbar-close',
		play: 'ps-toolbar-play',
		previous: 'ps-toolbar-previous',
		previousDisabled: 'ps-toolbar-previous-disabled',
		next: 'ps-toolbar-next',
		nextDisabled: 'ps-toolbar-next-disabled'
	};
	
	
	
	PhotoSwipe.Toolbar.ToolbarAction = {
		close: 'close',
		play: 'play',
		next: 'next',
		previous: 'previous',
		none: 'none'
	};
	
	
	
	PhotoSwipe.Toolbar.EventTypes = {
		onTap: 'PhotoSwipeToolbarOnClick',
		onBeforeShow: 'PhotoSwipeToolbarOnBeforeShow',
		onShow: 'PhotoSwipeToolbarOnShow',
		onBeforeHide: 'PhotoSwipeToolbarOnBeforeHide',
		onHide: 'PhotoSwipeToolbarOnHide'
	};
	
	
	
	PhotoSwipe.Toolbar.getToolbar = function(){
		
		return '<div class="' + PhotoSwipe.Toolbar.CssClasses.close + '"><div class="' + PhotoSwipe.Toolbar.CssClasses.toolbarContent + '"></div></div><div class="' + PhotoSwipe.Toolbar.CssClasses.play + '"><div class="' + PhotoSwipe.Toolbar.CssClasses.toolbarContent + '"></div></div><div class="' + PhotoSwipe.Toolbar.CssClasses.previous + '"><div class="' + PhotoSwipe.Toolbar.CssClasses.toolbarContent + '"></div></div><div class="' + PhotoSwipe.Toolbar.CssClasses.next + '"><div class="' + PhotoSwipe.Toolbar.CssClasses.toolbarContent + '"></div></div>';
		
	};
	
}
(
	window, 
	window.klass, 
	window.Code.Util
));// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.PhotoSwipe.Toolbar');
	var PhotoSwipe = window.Code.PhotoSwipe;
	
	
	PhotoSwipe.Toolbar.ToolbarClass = klass({
		
		
		
		toolbarEl: null,
		closeEl: null,
		playEl: null,
		previousEl: null,
		nextEl: null,
		captionEl: null,
		captionContentEl: null,
		currentCaption: null,
		settings: null,
		cache: null,
		timeout: null,
		isVisible: null,
		fadeOutHandler: null,
		touchStartHandler: null,
		touchMoveHandler: null,
		clickHandler: null,
		
		
		
		/*
		 * Function: dispose
		 */
		dispose: function(){
		
			var prop;
			
			this.clearTimeout();
			
			this.removeEventHandlers();
			
			Util.Animation.stop(this.toolbarEl);
			Util.Animation.stop(this.captionEl);
			
			Util.DOM.removeChild(this.toolbarEl, this.toolbarEl.parentNode);
			Util.DOM.removeChild(this.captionEl, this.captionEl.parentNode);
			
			for (prop in this) {
				if (Util.objectHasProperty(this, prop)) {
					this[prop] = null;
				}
			}
			
		},
		
		
		
		/*
		 * Function: initialize
		 */
		initialize: function(cache, options){
			
			var cssClass;
			
			this.settings = options;
			this.cache = cache;
			this.isVisible = false;
			
			this.fadeOutHandler = this.onFadeOut.bind(this);
			this.touchStartHandler = this.onTouchStart.bind(this);
			this.touchMoveHandler = this.onTouchMove.bind(this);
			this.clickHandler = this.onClick.bind(this);
			
			
			cssClass = PhotoSwipe.Toolbar.CssClasses.toolbar;
			if (this.settings.captionAndToolbarFlipPosition){
				cssClass = cssClass + ' ' + PhotoSwipe.Toolbar.CssClasses.toolbarTop;
			}
			
			
			// Toolbar
			this.toolbarEl = Util.DOM.createElement(
				'div', 
				{ 
					'class': cssClass
				},
				this.settings.getToolbar()
			);
		
			
			Util.DOM.setStyle(this.toolbarEl, {
				left: 0,
				position: 'absolute',
				overflow: 'hidden',
				zIndex: this.settings.zIndex
			});
			
			if (this.settings.target === window){
				Util.DOM.appendToBody(this.toolbarEl);
			}
			else{
				Util.DOM.appendChild(this.toolbarEl, this.settings.target);
			}
			Util.DOM.hide(this.toolbarEl);
			
			this.closeEl = Util.DOM.find('.' + PhotoSwipe.Toolbar.CssClasses.close, this.toolbarEl)[0];
			if (this.settings.preventHide && !Util.isNothing(this.closeEl)){
				Util.DOM.hide(this.closeEl);
			}
			
			this.playEl = Util.DOM.find('.' + PhotoSwipe.Toolbar.CssClasses.play, this.toolbarEl)[0];
			if (this.settings.preventSlideshow && !Util.isNothing(this.playEl)){
				Util.DOM.hide(this.playEl);
			}
			
			this.nextEl = Util.DOM.find('.' + PhotoSwipe.Toolbar.CssClasses.next, this.toolbarEl)[0];
			this.previousEl = Util.DOM.find('.' + PhotoSwipe.Toolbar.CssClasses.previous, this.toolbarEl)[0];
			
			
			// Caption
			cssClass = PhotoSwipe.Toolbar.CssClasses.caption;
			if (this.settings.captionAndToolbarFlipPosition){
				cssClass = cssClass + ' ' + PhotoSwipe.Toolbar.CssClasses.captionBottom;
			}
			
			this.captionEl = Util.DOM.createElement(
				'div', 
				{ 
					'class': cssClass
				}, 
				''
			);
			Util.DOM.setStyle(this.captionEl, {
				left: 0,
				position: 'absolute',
				overflow: 'hidden',
				zIndex: this.settings.zIndex
			});
			
			if (this.settings.target === window){
				Util.DOM.appendToBody(this.captionEl);
			}
			else{
				Util.DOM.appendChild(this.captionEl, this.settings.target);
			}
			Util.DOM.hide(this.captionEl);
			
			this.captionContentEl = Util.DOM.createElement(
				'div', 
				{
					'class': PhotoSwipe.Toolbar.CssClasses.captionContent
				}, 
				''
			);
			Util.DOM.appendChild(this.captionContentEl, this.captionEl);
			
			this.addEventHandlers();
			
		},
		
		
		
		/*
		 * Function: resetPosition
		 */
		resetPosition: function(){
		
			var width, toolbarTop, captionTop;
			
			if (this.settings.target === window){
				if (this.settings.captionAndToolbarFlipPosition){
					toolbarTop = Util.DOM.windowScrollTop();
					captionTop = (Util.DOM.windowScrollTop() + Util.DOM.windowHeight()) - Util.DOM.height(this.captionEl);
				}
				else {
					toolbarTop = (Util.DOM.windowScrollTop() + Util.DOM.windowHeight()) - Util.DOM.height(this.toolbarEl);
					captionTop = Util.DOM.windowScrollTop();
				}	
				width = Util.DOM.windowWidth();
			}
			else{
				if (this.settings.captionAndToolbarFlipPosition){
					toolbarTop = '0';
					captionTop = Util.DOM.height(this.settings.target) - Util.DOM.height(this.captionEl);
				}
				else{
					toolbarTop = Util.DOM.height(this.settings.target) - Util.DOM.height(this.toolbarEl);
					captionTop = 0;
				}
				width = Util.DOM.width(this.settings.target);
			}
			
			Util.DOM.setStyle(this.toolbarEl, {
				top: toolbarTop + 'px',
				width: width
			});
		
			Util.DOM.setStyle(this.captionEl, {
				top: captionTop + 'px',
				width: width
			});
		},
		
		
		
		/*
		 * Function: toggleVisibility
		 */
		toggleVisibility: function(index){
		
			if (this.isVisible){
				this.fadeOut();
			}
			else{
				this.show(index);
			}
		
		},
		
		
		
		/*
		 * Function: show
		 */
		show: function(index){
			
			Util.Animation.stop(this.toolbarEl);
			Util.Animation.stop(this.captionEl);
			
			this.resetPosition();
			this.setToolbarStatus(index);
			
			Util.Events.fire(this, { 
				type: PhotoSwipe.Toolbar.EventTypes.onBeforeShow, 
				target: this 
			});
			
			this.showToolbar();
			this.setCaption(index);
			this.showCaption();
			
			this.isVisible = true;
			
			this.setTimeout();
			
			Util.Events.fire(this, { 
				type: PhotoSwipe.Toolbar.EventTypes.onShow, 
				target: this 
			});
			
		},
		
		
		
		/*
		 * Function: setTimeout
		 */
		setTimeout: function(){
			
			if (this.settings.captionAndToolbarAutoHideDelay > 0){
				// Set a timeout to hide the toolbar
				this.clearTimeout();
				this.timeout = window.setTimeout(this.fadeOut.bind(this), this.settings.captionAndToolbarAutoHideDelay);
			}
		
		},
		
		
		
		/*
		 * Function: clearTimeout
		 */
		clearTimeout: function(){
			
			if (!Util.isNothing(this.timeout)){
				window.clearTimeout(this.timeout);
				this.timeout = null;
			}
			
		},
		
		
		
		/*
		 * Function: fadeOut
		 */
		fadeOut: function(){
		
			this.clearTimeout();
			
			Util.Events.fire(this, { 
				type: PhotoSwipe.Toolbar.EventTypes.onBeforeHide, 
				target: this 
			});
			
			Util.Animation.fadeOut(this.toolbarEl, this.settings.fadeOutSpeed);
			Util.Animation.fadeOut(this.captionEl, this.settings.fadeOutSpeed, this.fadeOutHandler);
			
			this.isVisible = false;
		
		},
		
		
		
		/*
		 * Function: addEventHandlers
		 */
		addEventHandlers: function(){
		
			if (Util.Browser.isTouchSupported){
				if (!Util.Browser.blackberry){
					// Had an issue with touchstart, animation and Blackberry. BB will default to click
					Util.Events.add(this.toolbarEl, 'touchstart', this.touchStartHandler);
				}
				Util.Events.add(this.toolbarEl, 'touchmove', this.touchMoveHandler);
				Util.Events.add(this.captionEl, 'touchmove', this.touchMoveHandler);
			}
			Util.Events.add(this.toolbarEl, 'click', this.clickHandler);
		
		},
		
		
		
		/*
		 * Function: removeEventHandlers
		 */
		removeEventHandlers: function(){
		
			if (Util.Browser.isTouchSupported){
				if (!Util.Browser.blackberry){
					// Had an issue with touchstart, animation and Blackberry. BB will default to click
					Util.Events.remove(this.toolbarEl, 'touchstart', this.touchStartHandler);
				}
				Util.Events.remove(this.toolbarEl, 'touchmove', this.touchMoveHandler);
				Util.Events.remove(this.captionEl, 'touchmove', this.touchMoveHandler);
			}
			Util.Events.remove(this.toolbarEl, 'click', this.clickHandler);
		
		},
		
		
		
		/*
		 * Function: handleTap
		 */
		handleTap: function(e){
			
			this.clearTimeout();
			
			var action;
			
			if (e.target === this.nextEl || Util.DOM.isChildOf(e.target, this.nextEl)){
				action = PhotoSwipe.Toolbar.ToolbarAction.next;
			}
			else if (e.target === this.previousEl || Util.DOM.isChildOf(e.target, this.previousEl)){
				action = PhotoSwipe.Toolbar.ToolbarAction.previous;
			}
			else if (e.target === this.closeEl || Util.DOM.isChildOf(e.target, this.closeEl)){
				action = PhotoSwipe.Toolbar.ToolbarAction.close;
			}
			else if (e.target === this.playEl || Util.DOM.isChildOf(e.target, this.playEl)){
				action = PhotoSwipe.Toolbar.ToolbarAction.play;
			}
			
			this.setTimeout();
			
			if (Util.isNothing(action)){
				action = PhotoSwipe.Toolbar.ToolbarAction.none;
			}
			
			Util.Events.fire(this, { 
				type: PhotoSwipe.Toolbar.EventTypes.onTap, 
				target: this, 
				action: action,
				tapTarget: e.target
			});
			
		},
		
		
		
		/*
		 * Function: setCaption
		 */ 
		setCaption: function(index){
		
			Util.DOM.removeChildren(this.captionContentEl);
			
			this.currentCaption = Util.coalesce(this.cache.images[index].caption, '\u00A0');
			
			if (Util.isObject(this.currentCaption)){
				Util.DOM.appendChild(this.currentCaption, this.captionContentEl);
			}
			else{
				if (this.currentCaption === ''){
					this.currentCaption = '\u00A0';
				}
				Util.DOM.appendText(this.currentCaption, this.captionContentEl);
			}
			
			this.currentCaption = (this.currentCaption === '\u00A0') ? '' : this.currentCaption;
			this.resetPosition();
			
		},
		
		
		
		/*
		 * Function: showToolbar
		 */
		showToolbar: function(){
		
			Util.DOM.setStyle(this.toolbarEl, {
				opacity: this.settings.captionAndToolbarOpacity
			});
			Util.DOM.show(this.toolbarEl);
			
		},
		
		
		
		/*
		 * Function: showCaption
		 */
		showCaption: function(){
			
			if (this.currentCaption === '' || this.captionContentEl.childNodes.length < 1){
				// Empty caption
				if (!this.settings.captionAndToolbarShowEmptyCaptions){
					Util.DOM.hide(this.captionEl);
					return;
				}
			}
			Util.DOM.setStyle(this.captionEl, {
				opacity: this.settings.captionAndToolbarOpacity
			});
			Util.DOM.show(this.captionEl);
		
		},
		
		
		
		/*
		 * Function: setToolbarStatus
		 */
		setToolbarStatus: function(index){
			
			if (this.settings.loop){
				return;
			}
			
			Util.DOM.removeClass(this.previousEl, PhotoSwipe.Toolbar.CssClasses.previousDisabled);
			Util.DOM.removeClass(this.nextEl, PhotoSwipe.Toolbar.CssClasses.nextDisabled);
			
			if (index > 0 && index < this.cache.images.length-1){
				return;
			}
			
			if (index === 0){
				if (!Util.isNothing(this.previousEl)){
					Util.DOM.addClass(this.previousEl, PhotoSwipe.Toolbar.CssClasses.previousDisabled);
				}
			}
			
			if (index === this.cache.images.length-1){
				if (!Util.isNothing(this.nextEl)){
					Util.DOM.addClass(this.nextEl, PhotoSwipe.Toolbar.CssClasses.nextDisabled);
				}
			}
			
		},
		
		
		
		/*
		 * Function: onFadeOut
		 */
		onFadeOut: function(){
		
			Util.DOM.hide(this.toolbarEl);
			Util.DOM.hide(this.captionEl);
			
			Util.Events.fire(this, { 
				type: PhotoSwipe.Toolbar.EventTypes.onHide, 
				target: this 
			});
			
		},
		
		
		
		/*
		 * Function: onTouchStart
		 */
		onTouchStart: function(e){
			
			e.preventDefault();
			Util.Events.remove(this.toolbarEl, 'click', this.clickHandler);
			this.handleTap(e);
			
		},
		
		
		
		/*
		 * Function: onTouchMove
		 */
		onTouchMove: function(e){
		
			e.preventDefault();
		
		},
		
		
		
		/*
		 * Function: onClick
		 */
		onClick: function(e){
			
			e.preventDefault();
			this.handleTap(e);
			
		}
		
		
	});
	
	
	
}
(
	window, 
	window.klass, 
	window.Code.Util
));// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.PhotoSwipe.UILayer');
	var PhotoSwipe = window.Code.PhotoSwipe;
	
	PhotoSwipe.UILayer.CssClasses = {
		uiLayer: 'ps-uilayer'
	};
	
}
(
	window, 
	window.klass, 
	window.Code.Util
));// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.PhotoSwipe.UILayer');
	var PhotoSwipe = window.Code.PhotoSwipe;
	
	
	PhotoSwipe.UILayer.UILayerClass = Util.TouchElement.TouchElementClass.extend({
		
		
		
		el: null,
		settings: null,
		
		
		
		/*
		 * Function: dispose
		 */
		dispose: function(){
		
			var prop;
			
			this.removeEventHandlers();
			
			Util.DOM.removeChild(this.el, this.el.parentNode);
			
			for (prop in this) {
				if (Util.objectHasProperty(this, prop)) {
					this[prop] = null;
				}
			}
		
		},
		
		
		
		/*
		 * Function: initialize
		 */
		initialize: function(options){
			
			this.settings = options;
			
			// Main container 
			this.el = Util.DOM.createElement(
				'div', 
				{ 
					'class': PhotoSwipe.UILayer.CssClasses.uiLayer
				}, 
				''
			);
			Util.DOM.setStyle(this.el, {
				display: 'block',
				position: 'absolute',
				left: 0,
				top: 0,
				overflow: 'hidden',
				zIndex: this.settings.zIndex,
				opacity: 0
			});
			Util.DOM.hide(this.el);
			
			if (this.settings.target === window){
				Util.DOM.appendToBody(this.el);
			}
			else{
				Util.DOM.appendChild(this.el, this.settings.target);
			}
			
			this.supr(this.el, {
				swipe: true,
				move: true,
				gesture: Util.Browser.iOS,
				doubleTap: true,
				preventDefaultTouchEvents: this.settings.preventDefaultTouchEvents
			});
			
		},
		
		
		
		/*
		 * Function: resetPosition
		 */
		resetPosition: function(){
			
			// Set the height and width to fill the document
			if (this.settings.target === window){
				Util.DOM.setStyle(this.el, {
					top: Util.DOM.windowScrollTop()  + 'px',
					width: Util.DOM.windowWidth(),
					height: Util.DOM.windowHeight()
				});	
			}
			else{
				Util.DOM.setStyle(this.el, {
					top: '0px',
					width: Util.DOM.width(this.settings.target),
					height: Util.DOM.height(this.settings.target)
				});
			}
			
		},
		
		
		
		/*
		 * Function: show
		 */
		show: function(){
			
			this.resetPosition();
			Util.DOM.show(this.el);
			this.addEventHandlers();
			
		},
		
		
		
		/*
		 * Function: addEventHandlers
		 */
		addEventHandlers: function(){
			
			this.supr();
			
		},
		
		
		
		/*
		 * Function: removeEventHandlers
		 */
		removeEventHandlers: function(){
		
			this.supr();
		
		}
		
		
	});
	
	
	
}
(
	window, 
	window.klass, 
	window.Code.Util
));// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.PhotoSwipe.ZoomPanRotate');
	var PhotoSwipe = window.Code.PhotoSwipe;
	
	PhotoSwipe.ZoomPanRotate.CssClasses = {
		zoomPanRotate: 'ps-zoom-pan-rotate'
	};
	
	
	PhotoSwipe.ZoomPanRotate.EventTypes = {
	
		onTransform: 'PhotoSwipeZoomPanRotateOnTransform'
	
	};
	
}
(
	window, 
	window.klass, 
	window.Code.Util
));// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.PhotoSwipe.ZoomPanRotate');
	var PhotoSwipe = window.Code.PhotoSwipe;
	
	
	PhotoSwipe.ZoomPanRotate.ZoomPanRotateClass = klass({
	
		el: null,
		settings: null,
		containerEl: null,
		imageEl: null,
		transformSettings: null,
		panStartingPoint: null,
		transformEl: null,
		
		
		
		/*
		 * Function: dispose
		 */
		dispose: function(){
		
			var prop;
			
			Util.DOM.removeChild(this.el, this.el.parentNode);
			
			for (prop in this) {
				if (Util.objectHasProperty(this, prop)) {
					this[prop] = null;
				}
			}
		
		},
		
		
		
		/*
		 * Function: initialize
		 */
		initialize: function(options, cacheImage, uiLayer){
			
			var parentEl, width, height, top;
			
			this.settings = options;
			
			if (this.settings.target === window){
				parentEl = document.body;
				width = Util.DOM.windowWidth();
				height = Util.DOM.windowHeight();
				top = Util.DOM.windowScrollTop() + 'px';
			}
			else{
				parentEl = this.settings.target;
				width = Util.DOM.width(parentEl);
				height = Util.DOM.height(parentEl);
				top = '0px';
			}
			
			this.imageEl = cacheImage.imageEl.cloneNode(false);
			Util.DOM.setStyle(this.imageEl, {
				
				zIndex: 1
				
			});
			
			this.transformSettings = {
				
				startingScale: 1.0,
				scale: 1.0,
				startingRotation: 0,
				rotation: 0,
				startingTranslateX: 0,
				startingTranslateY: 0,
				translateX: 0,
				translateY: 0
			
			};
			
			
			this.el = Util.DOM.createElement(
				'div', 
				{ 
					'class': PhotoSwipe.ZoomPanRotate.CssClasses.zoomPanRotate
				}, 
				''
			);
			Util.DOM.setStyle(this.el, {
				left: 0,
				top: top,
				position: 'absolute',
				width: width,
				height: height,
				zIndex: this.settings.zIndex,
				display: 'block'
			});
			
			Util.DOM.insertBefore(this.el, uiLayer.el, parentEl);
			
			if (Util.Browser.iOS){
				this.containerEl = Util.DOM.createElement('div','','');
				Util.DOM.setStyle(this.containerEl, {
					left: 0,
					top: 0,
					width: width,
					height: height,
					position: 'absolute',
					zIndex: 1
				});
				Util.DOM.appendChild(this.imageEl, this.containerEl);
				Util.DOM.appendChild(this.containerEl, this.el);
				Util.Animation.resetTranslate(this.containerEl);
				Util.Animation.resetTranslate(this.imageEl);
				this.transformEl = this.containerEl;
			}
			else{
				Util.DOM.appendChild(this.imageEl, this.el);
				this.transformEl = this.imageEl;
			}
			
		},
		
		
		
		/*
		 * Function: setStartingTranslateFromCurrentTransform
		 */
		setStartingTranslateFromCurrentTransform: function(){
			
			var 
				transformValue = Util.coalesce(this.transformEl.style.webkitTransform, this.transformEl.style.MozTransform, this.transformEl.style.transform),
				transformExploded;
			
			if (!Util.isNothing(transformValue)){
				
				transformExploded = transformValue.match( /translate\((.*?)\)/ );
				
				if (!Util.isNothing(transformExploded)){
				
					transformExploded = transformExploded[1].split(', ');
					this.transformSettings.startingTranslateX = window.parseInt(transformExploded[0], 10);
					this.transformSettings.startingTranslateY = window.parseInt(transformExploded[1], 10);
				
				}
			
			}
			
		},
		
		
		
		/*
		 * Function: getScale
		 */
		getScale: function(scaleValue){
			
			var scale = this.transformSettings.startingScale * scaleValue;
			
			if (this.settings.minUserZoom !== 0 && scale < this.settings.minUserZoom){
				scale = this.settings.minUserZoom;
			}
			else if (this.settings.maxUserZoom !== 0 && scale > this.settings.maxUserZoom){
				scale = this.settings.maxUserZoom;
			}
			
			return scale;
			
		},
		
		
		
		/*
		 * Function: setStartingScaleAndRotation
		 */
		setStartingScaleAndRotation: function(scaleValue, rotationValue){
			
			this.transformSettings.startingScale = this.getScale(scaleValue);
			
			this.transformSettings.startingRotation = 
				(this.transformSettings.startingRotation + rotationValue) % 360;
				
		},
		
		
		
		/*
		 * Function: zoomRotate
		 */
		zoomRotate: function(scaleValue, rotationValue){
			
			this.transformSettings.scale = this.getScale(scaleValue);
			
			this.transformSettings.rotation = 
				this.transformSettings.startingRotation + rotationValue;
			
			this.applyTransform();
			
		},
		
		
		
		/*
		 * Function: panStart
		 */
		panStart: function(point){
			
			this.setStartingTranslateFromCurrentTransform();
			
			this.panStartingPoint = {
				x: point.x,
				y: point.y
			};
			
		},
		
		
		
		/*
		 * Function: pan
		 */
		pan: function(point){ 
			
			var 
				dx = point.x - this.panStartingPoint.x,
				dy = point.y - this.panStartingPoint.y,
				dxScaleAdjust = dx / this.transformSettings.scale ,
        dyScaleAdjust = dy / this.transformSettings.scale;
			
			this.transformSettings.translateX = 
				this.transformSettings.startingTranslateX + dxScaleAdjust;

			this.transformSettings.translateY = 
				this.transformSettings.startingTranslateY + dyScaleAdjust;

			this.applyTransform();
			
		},
		
		
		
		/*
		 * Function: zoomAndPanToPoint
		 */
		zoomAndPanToPoint: function(scaleValue, point){
			
			
			if (this.settings.target === window){
				
				this.panStart({
					x: Util.DOM.windowWidth() / 2,
					y: Util.DOM.windowHeight() / 2
				});
				
				var 
					dx = point.x - this.panStartingPoint.x,
					dy = point.y - this.panStartingPoint.y,
					dxScaleAdjust = dx / this.transformSettings.scale,
					dyScaleAdjust = dy / this.transformSettings.scale;
					
				this.transformSettings.translateX = 
					(this.transformSettings.startingTranslateX + dxScaleAdjust) * -1;
				
				this.transformSettings.translateY = 
					(this.transformSettings.startingTranslateY + dyScaleAdjust) * -1;
					
			}
			
			
			this.setStartingScaleAndRotation(scaleValue, 0);
			this.transformSettings.scale = this.transformSettings.startingScale;
			
			this.transformSettings.rotation = 0;
			
			this.applyTransform();
			
		},
		
		
		
		/*
		 * Function: applyTransform
		 */
		applyTransform: function(){
			
			var 
				rotationDegs = this.transformSettings.rotation % 360,
				translateX = window.parseInt(this.transformSettings.translateX, 10),
				translateY = window.parseInt(this.transformSettings.translateY, 10),
				transform = 'scale(' + this.transformSettings.scale + ') rotate(' + rotationDegs + 'deg) translate(' + translateX + 'px, ' + translateY + 'px)';
			
			Util.DOM.setStyle(this.transformEl, {
				webkitTransform: transform,
				MozTransform: transform,
				msTransform: transform,
				transform: transform
			});
			
			Util.Events.fire(this, {
				target: this,
				type: PhotoSwipe.ZoomPanRotate.EventTypes.onTransform,
				scale: this.transformSettings.scale,
				rotation: this.transformSettings.rotation,
				rotationDegs: rotationDegs,
				translateX: translateX,
				translateY: translateY
			});
			
		}
	
	});
	
	
	
}
(
	window, 
	window.klass, 
	window.Code.Util
));// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function(window, Util){
	
	
	Util.registerNamespace('Code.PhotoSwipe');
	var PhotoSwipe = window.Code.PhotoSwipe;
	
	
	
	PhotoSwipe.CssClasses = {
		buildingBody: 'ps-building',
		activeBody: 'ps-active'
	};
	
	
	
	PhotoSwipe.EventTypes = {
	
		onBeforeShow: 'PhotoSwipeOnBeforeShow',
		onShow: 'PhotoSwipeOnShow',
		onBeforeHide: 'PhotoSwipeOnBeforeHide',
		onHide: 'PhotoSwipeOnHide',
		onDisplayImage: 'PhotoSwipeOnDisplayImage',
		onResetPosition: 'PhotoSwipeOnResetPosition',
		onSlideshowStart: 'PhotoSwipeOnSlideshowStart',
		onSlideshowStop: 'PhotoSwipeOnSlideshowStop',
		onTouch: 'PhotoSwipeOnTouch',
		onBeforeCaptionAndToolbarShow: 'PhotoSwipeOnBeforeCaptionAndToolbarShow',
		onCaptionAndToolbarShow: 'PhotoSwipeOnCaptionAndToolbarShow',
		onBeforeCaptionAndToolbarHide: 'PhotoSwipeOnBeforeCaptionAndToolbarHide',
		onCaptionAndToolbarHide: 'PhotoSwipeOnCaptionAndToolbarHide',
		onToolbarTap: 'PhotoSwipeOnToolbarTap',
		onBeforeZoomPanRotateShow: 'PhotoSwipeOnBeforeZoomPanRotateShow',
		onZoomPanRotateShow: 'PhotoSwipeOnZoomPanRotateShow',
		onBeforeZoomPanRotateHide: 'PhotoSwipeOnBeforeZoomPanRotateHide',
		onZoomPanRotateHide: 'PhotoSwipeOnZoomPanRotateHide',
		onZoomPanRotateTransform: 'PhotoSwipeOnZoomPanRotateTransform'
	
	};
	
	
	
	PhotoSwipe.instances = [];
	PhotoSwipe.activeInstances = [];
	
	
	
	/*
	 * Function: Code.PhotoSwipe.setActivateInstance
	 */
	PhotoSwipe.setActivateInstance = function(instance){
		
		// Can only have one instance per target (i.e. window or div)
		var index = Util.arrayIndexOf(instance.settings.target, PhotoSwipe.activeInstances, 'target');
		if (index > -1){
			throw 'Code.PhotoSwipe.activateInstance: Unable to active instance as another instance is already active for this target';
		}
		PhotoSwipe.activeInstances.push({
			target: instance.settings.target,
			instance: instance
		});
			
	};
	
	
	
	/*
	 * Function: Code.PhotoSwipe.unsetActivateInstance
	 */
	PhotoSwipe.unsetActivateInstance = function(instance){
		
		var index = Util.arrayIndexOf(instance, PhotoSwipe.activeInstances, 'instance');
		PhotoSwipe.activeInstances.splice(index, 1);
		
	};
	
	
	
	/*
	 * Function: Code.PhotoSwipe.attach
	 */
	PhotoSwipe.attach = function(images, options, id){
		
		var i, j, instance, image;
		
		instance = PhotoSwipe.createInstance(images, options, id);
		
		// Add click event handlers if applicable
		for (i=0, j=images.length; i<j; i++){
			
			image = images[i];
			if (!Util.isNothing(image.nodeType)){
				if (image.nodeType === 1){
					// DOM element
					image.__photoSwipeClickHandler = PhotoSwipe.onTriggerElementClick.bind(instance);
					Util.Events.remove(image, 'click', image.__photoSwipeClickHandler);
					Util.Events.add(image, 'click', image.__photoSwipeClickHandler);
				}
			}
			
		}
		
		return instance;
		
	};
	
	
	
	/*
	 * jQuery plugin
	 */
	if (window.jQuery){
		
		window.jQuery.fn.photoSwipe = function(options, id){
		
			return PhotoSwipe.attach(this, options, id);
			
		};
		
		
	}
	
	
	
	/*
	 * Function: Code.PhotoSwipe.detatch
	 */
	PhotoSwipe.detatch = function(instance){
	
		var i, j, image;
		
		// Remove click event handlers if applicable
		for (i=0, j=instance.originalImages.length; i<j; i++){
			
			image = instance.originalImages[i];
			if (!Util.isNothing(image.nodeType)){
				if (image.nodeType === 1){
					// DOM element
					Util.Events.remove(image, 'click', image.__photoSwipeClickHandler);
					delete image.__photoSwipeClickHandler;
				}
			}
			
		}
		
		PhotoSwipe.disposeInstance(instance);
	
	};
	
	
	
	/*
	 * Function: Code.PhotoSwipe.createInstance
	 */
	PhotoSwipe.createInstance = function(images, options, id){
		
		var i, instance, image;
		
		if (Util.isNothing(images)){
			throw 'Code.PhotoSwipe.attach: No images passed.';
		}
		
		if (!Util.isLikeArray(images)){
			throw 'Code.PhotoSwipe.createInstance: Images must be an array of elements or image urls.';
		}
		
		if (images.length < 1){
			throw 'Code.PhotoSwipe.createInstance: No images to passed.';
		}
		
		options = Util.coalesce(options, { });
		
		instance = PhotoSwipe.getInstance(id);
		
		if (Util.isNothing(instance)){
			instance = new PhotoSwipe.PhotoSwipeClass(images, options, id);
			PhotoSwipe.instances.push(instance);
		}
		else{
			throw 'Code.PhotoSwipe.createInstance: Instance with id "' + id +' already exists."';
		}
		
		return instance;
	
	};
	
	
	
	/*
	 * Function: Code.PhotoSwipe.disposeInstance
	 */
	PhotoSwipe.disposeInstance = function(instance){
		
		var instanceIndex = PhotoSwipe.getInstanceIndex(instance);
		
		if (instanceIndex < 0){
			throw 'Code.PhotoSwipe.disposeInstance: Unable to find instance to dispose.';
		}
		
		instance.dispose();
		PhotoSwipe.instances.splice(instanceIndex, 1);
		instance = null;
	
	};
	
	
	
	/*
	 * Function: onTriggerElementClick
	 */
	PhotoSwipe.onTriggerElementClick = function(e){
	
		e.preventDefault();
		
		var instance = this;
		instance.show(e.currentTarget);
	
	};
	
	
	
	/*
	 * Function: Code.PhotoSwipe.getInstance
	 */
	PhotoSwipe.getInstance = function(id){
		
		var i, j, instance;
		
		for (i=0, j=PhotoSwipe.instances.length; i<j; i++){
			
			instance = PhotoSwipe.instances[i];
			if (instance.id === id){
				return instance;
			}
			
		}
		
		return null;
		
	};
	
	
	
	/*
	 * Function: Code.PhotoSwipe.getInstanceIndex
	 */
	PhotoSwipe.getInstanceIndex = function(instance){
		
		var i, j, instanceIndex = -1;
		
		for (i=0, j=PhotoSwipe.instances.length; i<j; i++){
		
			if (PhotoSwipe.instances[i] === instance){
				instanceIndex = i;
				break;
			}
		
		}
		
		return instanceIndex;
		
	};
	
	
	
}
(
	window, 
	window.Code.Util
));// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5

(function(window, klass, Util, Cache, DocumentOverlay, Carousel, Toolbar, UILayer, ZoomPanRotate){
	
	
	Util.registerNamespace('Code.PhotoSwipe');
	var PhotoSwipe = window.Code.PhotoSwipe;
	
	
	PhotoSwipe.PhotoSwipeClass = klass({
		
		
		
		id: null,
		settings: null,
		isBackEventSupported: null,
		backButtonClicked: null,
		currentIndex: null,
		originalImages: null,
		mouseWheelStartTime: null,
		windowDimensions: null,
		
		
		
		// Components
		cache: null,
		documentOverlay: null,
		carousel: null,
		uiLayer: null,
		toolbar: null,
		zoomPanRotate: null,
		
		
		
		// Handlers
		windowOrientationChangeHandler: null,
		windowScrollHandler: null,
		windowHashChangeHandler: null,
		keyDownHandler: null,
		windowOrientationEventName: null,
		uiLayerTouchHandler: null,
		carouselSlideByEndHandler: null,
		carouselSlideshowStartHandler: null,
		carouselSlideshowStopHandler: null,
		toolbarTapHandler: null,
		toolbarBeforeShowHandler: null,
		toolbarShowHandler: null,
		toolbarBeforeHideHandler: null,
		toolbarHideHandler: null,
		mouseWheelHandler: null,
		zoomPanRotateTransformHandler: null,
		
		
		_isResettingPosition: null,
		_uiWebViewResetPositionTimeout: null,
				
		
		/*
		 * Function: dispose
		 */
		dispose: function(){
		
			var prop;
			
			Util.Events.remove(this, PhotoSwipe.EventTypes.onBeforeShow);
			Util.Events.remove(this, PhotoSwipe.EventTypes.onShow);
			Util.Events.remove(this, PhotoSwipe.EventTypes.onBeforeHide);
			Util.Events.remove(this, PhotoSwipe.EventTypes.onHide);
			Util.Events.remove(this, PhotoSwipe.EventTypes.onDisplayImage);
			Util.Events.remove(this, PhotoSwipe.EventTypes.onResetPosition);
			Util.Events.remove(this, PhotoSwipe.EventTypes.onSlideshowStart);
			Util.Events.remove(this, PhotoSwipe.EventTypes.onSlideshowStop);
			Util.Events.remove(this, PhotoSwipe.EventTypes.onTouch);
			Util.Events.remove(this, PhotoSwipe.EventTypes.onBeforeCaptionAndToolbarShow);
			Util.Events.remove(this, PhotoSwipe.EventTypes.onCaptionAndToolbarShow);
			Util.Events.remove(this, PhotoSwipe.EventTypes.onBeforeCaptionAndToolbarHide);
			Util.Events.remove(this, PhotoSwipe.EventTypes.onCaptionAndToolbarHide);
			Util.Events.remove(this, PhotoSwipe.EventTypes.onZoomPanRotateTransform);
			
			
			this.removeEventHandlers();
			
			if (!Util.isNothing(this.documentOverlay)){
				this.documentOverlay.dispose();
			}
			
			if (!Util.isNothing(this.carousel)){
				this.carousel.dispose();
			}
			
			if (!Util.isNothing(this.uiLayer)){
				this.uiLayer.dispose();
			}
			
			if (!Util.isNothing(this.toolbar)){
				this.toolbar.dispose();
			}
			
			this.destroyZoomPanRotate();
			
			if (!Util.isNothing(this.cache)){
				this.cache.dispose();
			}
			
			for (prop in this) {
				if (Util.objectHasProperty(this, prop)) {
					this[prop] = null;
				}
			}
		
		},
		
		
		
		/*
		 * Function: initialize
		 */
		initialize: function(images, options, id){
			
			var targetPosition;
			
			if (Util.isNothing(id)){
				this.id = 'PhotoSwipe' + new Date().getTime().toString();
			}
			else{
				this.id = id;
			}
			
			this.originalImages = images;
			
			if (Util.Browser.android && !Util.Browser.firefox){
				if (window.navigator.userAgent.match(/Android (\d+.\d+)/).toString().replace(/^.*\,/, '') >= 2.1){
					this.isBackEventSupported = true;
				}
			}
			
			if (!this.isBackEventSupported){
				this.isBackEventSupported = Util.objectHasProperty(window, 'onhashchange');
			}
			
			this.settings = {
				
				// General
				fadeInSpeed: 250,
				fadeOutSpeed: 250,
				preventHide: false,
				preventSlideshow: false,
				zIndex: 1000,
				backButtonHideEnabled: true,
				enableKeyboard: true,
				enableMouseWheel: true,
				mouseWheelSpeed: 350,
				autoStartSlideshow: false,
				jQueryMobile: ( !Util.isNothing(window.jQuery) && !Util.isNothing(window.jQuery.mobile) ),
				jQueryMobileDialogHash: '&ui-state=dialog',
				enableUIWebViewRepositionTimeout: false,
				uiWebViewResetPositionDelay: 500,
				target: window,
				preventDefaultTouchEvents: true,
				
				
				// Carousel
				loop: true,
				slideSpeed: 250,
				nextPreviousSlideSpeed: 0,
				enableDrag: true,
				swipeThreshold: 50,
				swipeTimeThreshold: 250,
				slideTimingFunction: 'ease-out',
				slideshowDelay: 3000,
				doubleTapSpeed: 250,
				margin: 20,
				imageScaleMethod: 'fit', // Either "fit", "fitNoUpscale" or "zoom",
				
				
				// Toolbar
				captionAndToolbarHide: false,
				captionAndToolbarFlipPosition: false,
				captionAndToolbarAutoHideDelay: 5000,
				captionAndToolbarOpacity: 0.8,
				captionAndToolbarShowEmptyCaptions: true,
				getToolbar: PhotoSwipe.Toolbar.getToolbar,
				
				
				// ZoomPanRotate
				allowUserZoom: true, 
				allowRotationOnUserZoom: false,
				maxUserZoom: 5.0,
				minUserZoom: 0.5,
				doubleTapZoomLevel: 2.5,
				
				
				// Cache
				getImageSource: PhotoSwipe.Cache.Functions.getImageSource,
				getImageCaption: PhotoSwipe.Cache.Functions.getImageCaption,
				getImageMetaData: PhotoSwipe.Cache.Functions.getImageMetaData,
				cacheMode: PhotoSwipe.Cache.Mode.normal
				
			};
			
			Util.extend(this.settings, options);
			
			if (this.settings.target !== window){
				targetPosition = Util.DOM.getStyle(this.settings.target, 'position');
				if (targetPosition !== 'relative' || targetPosition !== 'absolute'){
					Util.DOM.setStyle(this.settings.target, 'position', 'relative');
				}
			}
			
			if (this.settings.target !== window){
				this.isBackEventSupported = false;
				this.settings.backButtonHideEnabled = false;
			}
			else{
				if (this.settings.preventHide){
					this.settings.backButtonHideEnabled = false;
				}
			}
			
			this.cache = new Cache.CacheClass(images, this.settings);
			
		},
		
		
		
		/*
		 * Function: show
		 */
		show: function(obj){
			
			var i, j;
			
			this._isResettingPosition = false;
			this.backButtonClicked = false;
			
			// Work out what the starting index is
			if (Util.isNumber(obj)){
				this.currentIndex = obj;
			}
			else{
				
				this.currentIndex = -1;
				for (i=0, j=this.originalImages.length; i<j; i++){
					if (this.originalImages[i] === obj){
						this.currentIndex = i;
						break;
					}
				}
				
			}
			
			if (this.currentIndex < 0 || this.currentIndex > this.originalImages.length-1){
				throw "Code.PhotoSwipe.PhotoSwipeClass.show: Starting index out of range";
			}
			
			// Store a reference to the current window dimensions
			// Use this later to double check that a window has actually
			// been resized.
			this.isAlreadyGettingPage = this.getWindowDimensions();
			
			// Set this instance to be the active instance
			PhotoSwipe.setActivateInstance(this);
			
			this.windowDimensions = this.getWindowDimensions();
			
			// Create components
			if (this.settings.target === window){
				Util.DOM.addClass(window.document.body, PhotoSwipe.CssClasses.buildingBody);
			}
			else{
				Util.DOM.addClass(this.settings.target, PhotoSwipe.CssClasses.buildingBody);
			}
			this.createComponents();
			
			Util.Events.fire(this, {
				type: PhotoSwipe.EventTypes.onBeforeShow,
				target: this
			});
			
			// Fade in the document overlay
			this.documentOverlay.fadeIn(this.settings.fadeInSpeed, this.onDocumentOverlayFadeIn.bind(this));
			
		},
		
		
		
		/*
		 * Function: getWindowDimensions
		 */
		getWindowDimensions: function(){
		
			return {
				width: Util.DOM.windowWidth(),
				height: Util.DOM.windowHeight()
			};
		
		},
		
		
		
		/*
		 * Function: createComponents
		 */
		createComponents: function(){
		
			this.documentOverlay = new DocumentOverlay.DocumentOverlayClass(this.settings);
			this.carousel = new Carousel.CarouselClass(this.cache, this.settings);
			this.uiLayer = new UILayer.UILayerClass(this.settings);
			if (!this.settings.captionAndToolbarHide){
				this.toolbar = new Toolbar.ToolbarClass(this.cache, this.settings);
			}
			
		},
		
		
		
		/*
		 * Function: resetPosition
		 */
		resetPosition: function(){
			
			if (this._isResettingPosition){
				return;
			}
			
			var newWindowDimensions = this.getWindowDimensions();
			if (!Util.isNothing(this.windowDimensions)){
				if (newWindowDimensions.width === this.windowDimensions.width && newWindowDimensions.height === this.windowDimensions.height){
					// This was added as a fudge for iOS
					return;
				}
			}
			
			this._isResettingPosition = true;
			
			this.windowDimensions = newWindowDimensions;
			
			this.destroyZoomPanRotate();
			
			this.documentOverlay.resetPosition();
			this.carousel.resetPosition();
			
			if (!Util.isNothing(this.toolbar)){
				this.toolbar.resetPosition();
			}
			
			this.uiLayer.resetPosition();
			
			this._isResettingPosition = false;
			
			Util.Events.fire(this, {
				type: PhotoSwipe.EventTypes.onResetPosition,
				target: this
			});
			
		},
		
		
		
		/*
		 * Function: addEventHandler
		 */
		addEventHandler: function(type, handler){
			
			Util.Events.add(this, type, handler);
		
		},
		
		
		
		/*
		 * Function: addEventHandlers
		 */
		addEventHandlers: function(){
			
			if (Util.isNothing(this.windowOrientationChangeHandler)){
			
				this.windowOrientationChangeHandler = this.onWindowOrientationChange.bind(this);
				this.windowScrollHandler = this.onWindowScroll.bind(this);
				this.keyDownHandler = this.onKeyDown.bind(this);
				this.windowHashChangeHandler = this.onWindowHashChange.bind(this);
				this.uiLayerTouchHandler = this.onUILayerTouch.bind(this);
				this.carouselSlideByEndHandler = this.onCarouselSlideByEnd.bind(this);
				this.carouselSlideshowStartHandler = this.onCarouselSlideshowStart.bind(this);
				this.carouselSlideshowStopHandler = this.onCarouselSlideshowStop.bind(this);
				this.toolbarTapHandler = this.onToolbarTap.bind(this);
				this.toolbarBeforeShowHandler = this.onToolbarBeforeShow.bind(this);
				this.toolbarShowHandler = this.onToolbarShow.bind(this);
				this.toolbarBeforeHideHandler = this.onToolbarBeforeHide.bind(this);
				this.toolbarHideHandler = this.onToolbarHide.bind(this);
				this.mouseWheelHandler = this.onMouseWheel.bind(this);
				this.zoomPanRotateTransformHandler = this.onZoomPanRotateTransform.bind(this);
				
			}
			
			// Set window handlers
			if (Util.Browser.android){
				// For some reason, resize was more stable than orientationchange in Android
				this.orientationEventName = 'resize';
			}
			else if (Util.Browser.iOS && (!Util.Browser.safari)){
				Util.Events.add(window.document.body, 'orientationchange', this.windowOrientationChangeHandler);
			}
			else{
				var supportsOrientationChange = !Util.isNothing(window.onorientationchange);
				this.orientationEventName = supportsOrientationChange ? 'orientationchange' : 'resize';
			}
			
			if (!Util.isNothing(this.orientationEventName)){
				Util.Events.add(window, this.orientationEventName, this.windowOrientationChangeHandler);
			}
			if (this.settings.target === window){
				Util.Events.add(window, 'scroll', this.windowScrollHandler);
			}
			
			if (this.settings.enableKeyboard){
				Util.Events.add(window.document, 'keydown', this.keyDownHandler);
			}
			
			
			if (this.isBackEventSupported && this.settings.backButtonHideEnabled){
					
				this.windowHashChangeHandler = this.onWindowHashChange.bind(this);
				
				if (this.settings.jQueryMobile){
					window.location.hash = this.settings.jQueryMobileDialogHash;
				}
				else{
					this.currentHistoryHashValue = 'PhotoSwipe' + new Date().getTime().toString();
					window.location.hash = this.currentHistoryHashValue;
				}
								
				Util.Events.add(window, 'hashchange', this.windowHashChangeHandler);
			
			}
			
			if (this.settings.enableMouseWheel){
				Util.Events.add(window, 'mousewheel', this.mouseWheelHandler);
			}
			
			Util.Events.add(this.uiLayer, Util.TouchElement.EventTypes.onTouch, this.uiLayerTouchHandler);
			Util.Events.add(this.carousel, Carousel.EventTypes.onSlideByEnd, this.carouselSlideByEndHandler);
			Util.Events.add(this.carousel, Carousel.EventTypes.onSlideshowStart, this.carouselSlideshowStartHandler);
			Util.Events.add(this.carousel, Carousel.EventTypes.onSlideshowStop, this.carouselSlideshowStopHandler);
			
			if (!Util.isNothing(this.toolbar)){
				Util.Events.add(this.toolbar, Toolbar.EventTypes.onTap, this.toolbarTapHandler);
				Util.Events.add(this.toolbar, Toolbar.EventTypes.onBeforeShow, this.toolbarBeforeShowHandler);
				Util.Events.add(this.toolbar, Toolbar.EventTypes.onShow, this.toolbarShowHandler);
				Util.Events.add(this.toolbar, Toolbar.EventTypes.onBeforeHide, this.toolbarBeforeHideHandler);
				Util.Events.add(this.toolbar, Toolbar.EventTypes.onHide, this.toolbarHideHandler);
			}
		
		},
		
		
		
		/*
		 * Function: removeEventHandlers
		 */
		removeEventHandlers: function(){
			
			if (Util.Browser.iOS && (!Util.Browser.safari)){
				Util.Events.remove(window.document.body, 'orientationchange', this.windowOrientationChangeHandler);
			}
			
			if (!Util.isNothing(this.orientationEventName)){
				Util.Events.remove(window, this.orientationEventName, this.windowOrientationChangeHandler);
			}
			
			Util.Events.remove(window, 'scroll', this.windowScrollHandler);
			
			if (this.settings.enableKeyboard){
				Util.Events.remove(window.document, 'keydown', this.keyDownHandler);
			}
			
			if (this.isBackEventSupported && this.settings.backButtonHideEnabled){
				Util.Events.remove(window, 'hashchange', this.windowHashChangeHandler);
			}
			
			if (this.settings.enableMouseWheel){
				Util.Events.remove(window, 'mousewheel', this.mouseWheelHandler);
			}
			
			if (!Util.isNothing(this.uiLayer)){
				Util.Events.remove(this.uiLayer, Util.TouchElement.EventTypes.onTouch, this.uiLayerTouchHandler);
			}
			
			if (!Util.isNothing(this.toolbar)){
				Util.Events.remove(this.carousel, Carousel.EventTypes.onSlideByEnd, this.carouselSlideByEndHandler);
				Util.Events.remove(this.carousel, Carousel.EventTypes.onSlideshowStart, this.carouselSlideshowStartHandler);
				Util.Events.remove(this.carousel, Carousel.EventTypes.onSlideshowStop, this.carouselSlideshowStopHandler);
			}
			
			if (!Util.isNothing(this.toolbar)){
				Util.Events.remove(this.toolbar, Toolbar.EventTypes.onTap, this.toolbarTapHandler);
				Util.Events.remove(this.toolbar, Toolbar.EventTypes.onBeforeShow, this.toolbarBeforeShowHandler);
				Util.Events.remove(this.toolbar, Toolbar.EventTypes.onShow, this.toolbarShowHandler);
				Util.Events.remove(this.toolbar, Toolbar.EventTypes.onBeforeHide, this.toolbarBeforeHideHandler);
				Util.Events.remove(this.toolbar, Toolbar.EventTypes.onHide, this.toolbarHideHandler);
			}
			
		},
		
		
		
		
		/*
		 * Function: hide
		 */
		hide: function(){
			
			if (this.settings.preventHide){
				return;
			}
			
			if (Util.isNothing(this.documentOverlay)){
				throw "Code.PhotoSwipe.PhotoSwipeClass.hide: PhotoSwipe instance is already hidden";
			}
			
			if (!Util.isNothing(this.hiding)){
				return;
			}
			
			this.clearUIWebViewResetPositionTimeout();
			
			this.destroyZoomPanRotate();
			
			this.removeEventHandlers();
			
			Util.Events.fire(this, {
				type: PhotoSwipe.EventTypes.onBeforeHide,
				target: this
			});
			
			this.uiLayer.dispose();
			this.uiLayer = null;
			
			if (!Util.isNothing(this.toolbar)){
				this.toolbar.dispose();
				this.toolbar = null;
			}
			
			this.carousel.dispose();
			this.carousel = null;
			
			Util.DOM.removeClass(window.document.body, PhotoSwipe.CssClasses.activeBody);
			
			this.documentOverlay.dispose();
			this.documentOverlay = null;
			
			this._isResettingPosition = false;
			
			// Deactive this instance
			PhotoSwipe.unsetActivateInstance(this);
		
			Util.Events.fire(this, {
				type: PhotoSwipe.EventTypes.onHide,
				target: this
			});
			
			this.goBackInHistory();
			
		},
		
		
		
		/*
		 * Function: goBackInHistory
		 */
		goBackInHistory: function(){
			
			if (this.isBackEventSupported && this.settings.backButtonHideEnabled){
				if ( !this.backButtonClicked ){
					window.history.back();
				}
			}
			
		},
		
		
		
		/*
		 * Function: play
		 */
		play: function(){
			
			if (this.isZoomActive()){
				return;
			}
			
			if (!this.settings.preventSlideshow){
				if (!Util.isNothing(this.carousel)){
					if (!Util.isNothing(this.toolbar) && this.toolbar.isVisible){
						this.toolbar.fadeOut();
					}
					this.carousel.startSlideshow();
				}
			}
			
		},
		
		
		
		/*
		 * Function: stop
		 */
		stop: function(){
			
			if (this.isZoomActive()){
				return;
			}
			
			if (!Util.isNothing(this.carousel)){
				this.carousel.stopSlideshow();
			}
		
		},
		
		
		
		/*
		 * Function: previous
		 */
		previous: function(){
			
			if (this.isZoomActive()){
				return;
			}
			
			if (!Util.isNothing(this.carousel)){
				this.carousel.previous();
			}
		
		},
		
		
		
		/*
		 * Function: next
		 */
		next: function(){
			
			if (this.isZoomActive()){
				return;
			}
			
			if (!Util.isNothing(this.carousel)){
				this.carousel.next();
			}
			
		},
		
		
		
		/*
		 * Function: toggleToolbar
		 */
		toggleToolbar: function(){
			
			if (this.isZoomActive()){
				return;
			}
			
			if (!Util.isNothing(this.toolbar)){
				this.toolbar.toggleVisibility(this.currentIndex);
			}
			
		},
		
		
		
		/*
		 * Function: fadeOutToolbarIfVisible
		 */
		fadeOutToolbarIfVisible: function(){
		
			if (!Util.isNothing(this.toolbar) && this.toolbar.isVisible && this.settings.captionAndToolbarAutoHideDelay > 0){
				this.toolbar.fadeOut();
			}
		
		},
		
		
		
		/*
		 * Function: createZoomPanRotate
		 */
		createZoomPanRotate: function(){
			
			this.stop();
			
			if (this.canUserZoom() && !this.isZoomActive()){
				
				Util.Events.fire(this, PhotoSwipe.EventTypes.onBeforeZoomPanRotateShow);
				
				this.zoomPanRotate = new ZoomPanRotate.ZoomPanRotateClass(
					this.settings, 
					this.cache.images[this.currentIndex],
					this.uiLayer
				);
				
				// If we don't override this in the event of false
				// you will be unable to pan around a zoomed image effectively
				this.uiLayer.captureSettings.preventDefaultTouchEvents = true;
				
				Util.Events.add(this.zoomPanRotate, PhotoSwipe.ZoomPanRotate.EventTypes.onTransform, this.zoomPanRotateTransformHandler);
				
				Util.Events.fire(this, PhotoSwipe.EventTypes.onZoomPanRotateShow);
				
				if (!Util.isNothing(this.toolbar) && this.toolbar.isVisible){
					this.toolbar.fadeOut();
				}
				
			}
		
		},
		
		
		
		/*
		 * Function: destroyZoomPanRotate
		 */
		destroyZoomPanRotate: function(){
			
			if (!Util.isNothing(this.zoomPanRotate)){
				
				Util.Events.fire(this, PhotoSwipe.EventTypes.onBeforeZoomPanRotateHide);
			
				Util.Events.remove(this.zoomPanRotate, PhotoSwipe.ZoomPanRotate.EventTypes.onTransform, this.zoomPanRotateTransformHandler);
				this.zoomPanRotate.dispose();
				this.zoomPanRotate = null;
				
				// Set the preventDefaultTouchEvents back to it was
				this.uiLayer.captureSettings.preventDefaultTouchEvents = this.settings.preventDefaultTouchEvents;
				
				Util.Events.fire(this, PhotoSwipe.EventTypes.onZoomPanRotateHide);
				
			}
		
		},
		
		
		
		/*
		 * Function: canUserZoom
		 */
		canUserZoom: function(){
			
			var testEl, cacheImage;
			
			if (Util.Browser.msie){
				testEl = document.createElement('div');
				if (Util.isNothing(testEl.style.msTransform)){
					return false;
				}
			}
			else if (!Util.Browser.isCSSTransformSupported){
				return false;
			}
			
			if (!this.settings.allowUserZoom){
				return false;
			}
			
			
			if (this.carousel.isSliding){
				return false;
			}
			
			cacheImage = this.cache.images[this.currentIndex];
			
			if (Util.isNothing(cacheImage)){
				return false;
			}
			
			if (cacheImage.isLoading){
				return false;
			}
			
			return true;
			
		},
		
		
		
		/*
		 * Function: isZoomActive
		 */
		isZoomActive: function(){
		
			return (!Util.isNothing(this.zoomPanRotate));
		
		},
		
		
		
		/*
		 * Function: getCurrentImage
		 */
		getCurrentImage: function(){
		
			return this.cache.images[this.currentIndex];
		
		},
		
		
		
		/*
		 * Function: onDocumentOverlayFadeIn
		 */
		onDocumentOverlayFadeIn: function(e){
			
			window.setTimeout(function(){
				
				var el = (this.settings.target === window) ? window.document.body : this.settings.target;
				
				Util.DOM.removeClass(el, PhotoSwipe.CssClasses.buildingBody);
				Util.DOM.addClass(el, PhotoSwipe.CssClasses.activeBody);
				
				this.addEventHandlers();
				
				this.carousel.show(this.currentIndex);
				
				this.uiLayer.show();
				
				if (this.settings.autoStartSlideshow){
					this.play();
				}
				else if (!Util.isNothing(this.toolbar)){
					this.toolbar.show(this.currentIndex);
				}
				
				Util.Events.fire(this, {
					type: PhotoSwipe.EventTypes.onShow,
					target: this
				});
			
				this.setUIWebViewResetPositionTimeout();
				
			}.bind(this), 250);
			
			
		},
		
		
		
		/*
		 * Function: setUIWebViewResetPositionTimeout
		 */
		setUIWebViewResetPositionTimeout: function(){
			
			if (!this.settings.enableUIWebViewRepositionTimeout){
				return;
			}
			
			if (!(Util.Browser.iOS && (!Util.Browser.safari))){
				return;
			}
			
			if (!Util.isNothing(this._uiWebViewResetPositionTimeout)){
				window.clearTimeout(this._uiWebViewResetPositionTimeout);
			}
			this._uiWebViewResetPositionTimeout = window.setTimeout(function(){
				
				this.resetPosition();
				
				this.setUIWebViewResetPositionTimeout();
				
			}.bind(this), this.settings.uiWebViewResetPositionDelay);
			
		},
		
		
		
		/*
		 * Function: clearUIWebViewResetPositionTimeout
		 */
		clearUIWebViewResetPositionTimeout: function(){
			if (!Util.isNothing(this._uiWebViewResetPositionTimeout)){
				window.clearTimeout(this._uiWebViewResetPositionTimeout);
			}
		},
		
		
		
		/*
		 * Function: onWindowScroll
		 */
		onWindowScroll: function(e){
			
			this.resetPosition();
		
		},
		
		
		
		/*
		 * Function: onWindowOrientationChange
		 */
		onWindowOrientationChange: function(e){
			
			this.resetPosition();
			
		},
		
		
		
		/*
		 * Function: onWindowHashChange
		 */
		onWindowHashChange: function(e){
			
			var compareHash = '#' + 
				((this.settings.jQueryMobile) ? this.settings.jQueryMobileDialogHash : this.currentHistoryHashValue);
			
			if (window.location.hash !== compareHash){
				this.backButtonClicked = true;
				this.hide();
			}
		
		},
		
		
		
		/*
		 * Function: onKeyDown
		 */
		onKeyDown: function(e){
			
			if (e.keyCode === 37) { // Left
				e.preventDefault();
				this.previous();
			}
			else if (e.keyCode === 39) { // Right
				e.preventDefault();
				this.next();
			}
			else if (e.keyCode === 38 || e.keyCode === 40) { // Up and down
				e.preventDefault();
			}
			else if (e.keyCode === 27) { // Escape
				e.preventDefault();
				this.hide();
			}
			else if (e.keyCode === 32) { // Spacebar
				if (!this.settings.hideToolbar){
					this.toggleToolbar();
				}
				else{
					this.hide();
				}
				e.preventDefault();
			}
			else if (e.keyCode === 13) { // Enter
				e.preventDefault();
				this.play();
			}
			
		},
		
		
		
		/*
		 * Function: onUILayerTouch
		 */
		onUILayerTouch: function(e){
			
			if (this.isZoomActive()){
				
				switch (e.action){
					
					case Util.TouchElement.ActionTypes.gestureChange:
						this.zoomPanRotate.zoomRotate(e.scale, (this.settings.allowRotationOnUserZoom) ? e.rotation : 0);
						break;
					
					case Util.TouchElement.ActionTypes.gestureEnd:
						this.zoomPanRotate.setStartingScaleAndRotation(e.scale, (this.settings.allowRotationOnUserZoom) ? e.rotation : 0);
						break;
						
					case Util.TouchElement.ActionTypes.touchStart:
						this.zoomPanRotate.panStart(e.point);
						break;
					
					case Util.TouchElement.ActionTypes.touchMove:
						this.zoomPanRotate.pan(e.point);
						break;
						
					case Util.TouchElement.ActionTypes.doubleTap:
						this.destroyZoomPanRotate();
						this.toggleToolbar();
						break;
					
					case Util.TouchElement.ActionTypes.swipeLeft:
						this.destroyZoomPanRotate();
						this.next();
						this.toggleToolbar();
						break;
						
					case Util.TouchElement.ActionTypes.swipeRight:
						this.destroyZoomPanRotate();
						this.previous();
						this.toggleToolbar();
						break;
				}
			
			}
			else{
				
				switch (e.action){
					
					case Util.TouchElement.ActionTypes.touchMove:
					case Util.TouchElement.ActionTypes.swipeLeft:
					case Util.TouchElement.ActionTypes.swipeRight:
						
						// Hide the toolbar if need be 
						this.fadeOutToolbarIfVisible();
						
						// Pass the touch onto the carousel
						this.carousel.onTouch(e.action, e.point);
						break;
					
					case Util.TouchElement.ActionTypes.touchStart:
					case Util.TouchElement.ActionTypes.touchMoveEnd:
					
						// Pass the touch onto the carousel
						this.carousel.onTouch(e.action, e.point);
						break;
						
					case Util.TouchElement.ActionTypes.tap:
						this.toggleToolbar();
						break;
						
					case Util.TouchElement.ActionTypes.doubleTap:
						
						// Take into consideration the window scroll
						if (this.settings.target === window){
							e.point.x -= Util.DOM.windowScrollLeft();
							e.point.y -= Util.DOM.windowScrollTop();
						}
						
						// Just make sure that if the user clicks out of the image
						// that the image does not pan out of view!
						var 
							cacheImageEl = this.cache.images[this.currentIndex].imageEl,
						
							imageTop = window.parseInt(Util.DOM.getStyle(cacheImageEl, 'top'), 10),
							imageLeft = window.parseInt(Util.DOM.getStyle(cacheImageEl, 'left'), 10),
							imageRight = imageLeft + Util.DOM.width(cacheImageEl),
							imageBottom = imageTop + Util.DOM.height(cacheImageEl);
						
						if (e.point.x < imageLeft){
							e.point.x = imageLeft;
						}
						else if (e.point.x > imageRight){
							e.point.x = imageRight;
						}
						
						if (e.point.y < imageTop){
							e.point.y = imageTop;
						}
						else if (e.point.y > imageBottom){
							e.point.y = imageBottom;
						}
						
						this.createZoomPanRotate();
						if (this.isZoomActive()){
							this.zoomPanRotate.zoomAndPanToPoint(this.settings.doubleTapZoomLevel, e.point);
						}
						
						break;
					
					case Util.TouchElement.ActionTypes.gestureStart:
						this.createZoomPanRotate();
						break;
				}
				
				
			}
			
			Util.Events.fire(this, {
				type: PhotoSwipe.EventTypes.onTouch,
				target: this,
				point: e.point, 
				action: e.action
			});
			
		},
		
		
		
		/*
		 * Function: onCarouselSlideByEnd
		 */
		onCarouselSlideByEnd: function(e){
			
			this.currentIndex = e.cacheIndex;
			
			if (!Util.isNothing(this.toolbar)){
				this.toolbar.setCaption(this.currentIndex);
				this.toolbar.setToolbarStatus(this.currentIndex);
			}
			
			Util.Events.fire(this, {
				type: PhotoSwipe.EventTypes.onDisplayImage,
				target: this,
				action: e.action,
				index: e.cacheIndex
			});
		
		},
		
		
		
		/*
		 * Function: onToolbarTap
		 */
		onToolbarTap: function(e){
		
			switch(e.action){
				
				case Toolbar.ToolbarAction.next:
					this.next();
					break;
				
				case Toolbar.ToolbarAction.previous:
					this.previous();
					break;
					
				case Toolbar.ToolbarAction.close:
					this.hide();
					break;
				
				case Toolbar.ToolbarAction.play:
					this.play();
					break;
					
			}
			
			Util.Events.fire(this, { 
				type: PhotoSwipe.EventTypes.onToolbarTap, 
				target: this,
				toolbarAction: e.action,
				tapTarget: e.tapTarget
			});
			
		},
		
		
		
		/*
		 * Function: onMouseWheel
		 */
		onMouseWheel: function(e){
			
			var 
				delta = Util.Events.getWheelDelta(e),
				dt = e.timeStamp - (this.mouseWheelStartTime || 0);
			
			if (dt < this.settings.mouseWheelSpeed) {
				return;
			}
			
			this.mouseWheelStartTime = e.timeStamp;
			
			if (this.settings.invertMouseWheel){
				delta = delta * -1;
			}
			
			if (delta < 0){
				this.next();
			}
			else if (delta > 0){
				this.previous();
			}
			
		},
		
		
		
		/*
		 * Function: onCarouselSlideshowStart
		 */
		onCarouselSlideshowStart: function(e){
		
			Util.Events.fire(this, {
				type: PhotoSwipe.EventTypes.onSlideshowStart,
				target: this
			});
		
		},
		
		
		
		/*
		 * Function: onCarouselSlideshowStop
		 */
		onCarouselSlideshowStop: function(e){
		
			Util.Events.fire(this, {
				type: PhotoSwipe.EventTypes.onSlideshowStop,
				target: this
			});
		
		},
		
		
		
		/*
		 * Function: onToolbarBeforeShow
		 */
		onToolbarBeforeShow: function(e){
		
			Util.Events.fire(this, {
				type: PhotoSwipe.EventTypes.onBeforeCaptionAndToolbarShow,
				target: this
			});
		
		},
		
		
		
		/*
		 * Function: onToolbarShow
		 */
		onToolbarShow: function(e){
		
			Util.Events.fire(this, {
				type: PhotoSwipe.EventTypes.onCaptionAndToolbarShow,
				target: this
			});
		
		},
		
		
		
		/*
		 * Function: onToolbarBeforeHide
		 */
		onToolbarBeforeHide: function(e){
		
			Util.Events.fire(this, {
				type: PhotoSwipe.EventTypes.onBeforeCaptionAndToolbarHide,
				target: this
			});
		
		},
		
		
		
		/*
		 * Function: onToolbarHide
		 */
		onToolbarHide: function(e){
		
			Util.Events.fire(this, {
				type: PhotoSwipe.EventTypes.onCaptionAndToolbarHide,
				target: this
			});
		
		},
		
		
		
		/*
		 * Function: onZoomPanRotateTransform
		 */
		onZoomPanRotateTransform: function(e){
			
			Util.Events.fire(this, {
				target: this,
				type: PhotoSwipe.EventTypes.onZoomPanRotateTransform,
				scale: e.scale,
				rotation: e.rotation,
				rotationDegs: e.rotationDegs,
				translateX: e.translateX,
				translateY: e.translateY
			});
			
		}
		
		
	});
	
	
	
}
(
	window, 
	window.klass, 
	window.Code.Util,
	window.Code.PhotoSwipe.Cache,
	window.Code.PhotoSwipe.DocumentOverlay,
	window.Code.PhotoSwipe.Carousel,
	window.Code.PhotoSwipe.Toolbar,
	window.Code.PhotoSwipe.UILayer,
	window.Code.PhotoSwipe.ZoomPanRotate
));
