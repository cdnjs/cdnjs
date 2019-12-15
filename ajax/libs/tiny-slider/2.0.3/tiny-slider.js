var tns = (function (){
// keys
if (!Object.keys) {
    Object.keys = function (object) {
        var keys = [];
        for (var name in object) {
            if (Object.prototype.hasOwnProperty.call(object, name)) {
                keys.push(name);
            }
        }
        return keys;
    };
}

// ChildNode.remove
(function () {
  "use strict";

  if(!("remove" in Element.prototype)){
    Element.prototype.remove = function(){
      if(this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  }
})();

/** DOMTokenList polyfill */
(function(){
	"use strict";
	
	/*<*/
	var UNDEF,
	WIN   = window,
	DOC   = document,
	OBJ   = Object,
	NULL  = null,
	TRUE  = true,
	FALSE = false,
	/*>*/
	
	/** Munge the hell out of our string literals. Saves a tonne of space after compression. */
	SPACE           = " ",
	ELEMENT         = "Element",
	CREATE_ELEMENT  = "create"+ELEMENT,
	DOM_TOKEN_LIST  = "DOMTokenList",
	DEFINE_GETTER   = "__defineGetter__",
	DEFINE_PROPERTY = "defineProperty",
	CLASS_          = "class",
	LIST            = "List",
	CLASS_LIST      = CLASS_+LIST,
	REL             = "rel",
	REL_LIST        = REL+LIST,
	DIV             = "div",
	LENGTH          = "length",
	CONTAINS        = "contains",
	APPLY           = "apply",
	HTML_           = "HTML",
	METHODS         = ("item "+CONTAINS+" add remove toggle toString toLocaleString").split(SPACE),
	ADD             = METHODS[2],
	REMOVE          = METHODS[3],
	TOGGLE          = METHODS[4],
	PROTOTYPE       = "prototype",
	
	
	
	/** Ascertain browser support for Object.defineProperty */
	dpSupport       = DEFINE_PROPERTY in OBJ || DEFINE_GETTER in OBJ[ PROTOTYPE ] || NULL,
	
	
	/** Wrapper for Object.defineProperty that falls back to using the legacy __defineGetter__ method if available. */
	defineGetter    = function(object, name, fn, configurable){
		if(OBJ[ DEFINE_PROPERTY ])
			OBJ[ DEFINE_PROPERTY ](object, name, {
				configurable: FALSE === dpSupport ? TRUE : !!configurable,
				get:          fn
			});
		
		else object[ DEFINE_GETTER ](name, fn);
	},
	
	
	
	
	/** DOMTokenList interface replacement */
	DOMTokenList = function(el, prop){
		var THIS    = this,
		
		/** Private variables */
		tokens      = [],
		tokenMap    = {},
		length      = 0,
		maxLength   = 0,
		
		
		reindex     = function(){
			
			/** Define getter functions for array-like access to the tokenList's contents. */
			if(length >= maxLength)
				for(; maxLength < length; ++maxLength) (function(i){
					
					defineGetter(THIS, i, function(){
						preop();
						return tokens[i];
					}, FALSE);
					
				})(maxLength);
		},
		
		
		
		/** Helper function called at the start of each class method. Internal use only. */
		preop = function(){
			var error, i,
			args    = arguments,
			rSpace  = /\s+/;
			
			/** Validate the token/s passed to an instance method, if any. */
			if(args[ LENGTH ])
				for(i = 0; i < args[ LENGTH ]; ++i)
					if(rSpace.test(args[i])){
						error       = new SyntaxError('String "' + args[i] + '" ' + CONTAINS + ' an invalid character');
						error.code  = 5;
						error.name  = "InvalidCharacterError";
						throw error;
					}
			
			
			/** Split the new value apart by whitespace*/
			tokens = ("" + el[prop]).replace(/^\s+|\s+$/g, "").split(rSpace);
			
			/** Avoid treating blank strings as single-item token lists */
			if("" === tokens[0]) tokens = [];
			
			/** Repopulate the internal token lists */
			tokenMap = {};
			for(i = 0; i < tokens[ LENGTH ]; ++i)
				tokenMap[tokens[i]] = TRUE;
			length = tokens[ LENGTH ];
			reindex();
		};
		
		
		
		/** Populate our internal token list if the targeted attribute of the subject element isn't empty. */
		preop();
		
		
		
		/** Return the number of tokens in the underlying string. Read-only. */
		defineGetter(THIS, LENGTH, function(){
			preop();
			return length;
		});
		
		
		/** Override the default toString/toLocaleString methods to return a space-delimited list of tokens when typecast. */
		THIS[ METHODS[6] /** toLocaleString */ ] =
		THIS[ METHODS[5] /** toString       */ ] = function(){
			preop();
			return tokens.join(SPACE);
		};
		
		
		
		/** Return an item in the list by its index (or undefined if the number is greater than or equal to the length of the list) */
		THIS.item = function(idx){
			preop();
			return tokens[idx];
		};
		
		
		/** Return TRUE if the underlying string contains `token`; otherwise, FALSE. */
		THIS[ CONTAINS ] = function(token){
			preop();
			return !!tokenMap[token];
		};
		
		
		
		/** Add one or more tokens to the underlying string. */
		THIS[ADD] = function(){
			preop[APPLY](THIS, args = arguments);

			for(var args, token, i = 0, l = args[ LENGTH ]; i < l; ++i){
				token = args[i];
				if(!tokenMap[token]){
					tokens.push(token);
					tokenMap[token] = TRUE;
				}
			}
			
			/** Update the targeted attribute of the attached element if the token list's changed. */
			if(length  !== tokens[ LENGTH ]){
				length   = tokens[ LENGTH ] >>> 0;
				el[prop] = tokens.join(SPACE);
				reindex();
			}
		};
		
		
		
		/** Remove one or more tokens from the underlying string. */
		THIS[ REMOVE ] = function(){
			preop[APPLY](THIS, args = arguments);
			
			/** Build a hash of token names to compare against when recollecting our token list. */
			for(var args, ignore = {}, i = 0, t = []; i < args[ LENGTH ]; ++i){
				ignore[args[i]] = TRUE;
				delete tokenMap[args[i]];
			}
			
			/** Run through our tokens list and reassign only those that aren't defined in the hash declared above. */
			for(i = 0; i < tokens[ LENGTH ]; ++i)
				if(!ignore[tokens[i]]) t.push(tokens[i]);
			
			tokens   = t;
			length   = t[ LENGTH ] >>> 0;
			
			/** Update the targeted attribute of the attached element. */
			el[prop] = tokens.join(SPACE);
			reindex();
		};
		
		
		
		/** Add or remove a token depending on whether it's already contained within the token list. */
		THIS[TOGGLE] = function(token, force){
			preop[APPLY](THIS, [token]);
			
			/** Token state's being forced. */
			if(UNDEF !== force){
				if(force) { THIS[ADD](token);     return TRUE;  }
				else      { THIS[REMOVE](token);  return FALSE; }
			}
			
			/** Token already exists in tokenList. Remove it, and return FALSE. */
			if(tokenMap[token]){
				THIS[ REMOVE ](token);
				return FALSE;
			}
			
			/** Otherwise, add the token and return TRUE. */
			THIS[ADD](token);
			return TRUE;
		};
		
		
		/** Mark our newly-assigned methods as non-enumerable. */
		(function(o, defineProperty){
			if(defineProperty)
				for(var i = 0; i < 7; ++i)
					defineProperty(o, METHODS[i], {enumerable: FALSE});
		}(THIS, OBJ[ DEFINE_PROPERTY ]));
		
		return THIS;
	},
	
	
	
	/** Polyfills a property with a DOMTokenList */
	addProp = function(o, name, attr){
		
		defineGetter(o[PROTOTYPE], name, function(){
			var tokenList,
			THIS = this,
			
			/** Prevent this from firing twice for some reason. What the hell, IE. */
			gibberishProperty           = DEFINE_GETTER + DEFINE_PROPERTY + name;
			if(THIS[gibberishProperty]) return tokenList;
			THIS[gibberishProperty]     = TRUE;
			
			
			/**
			 * IE8 can't define properties on native JavaScript objects, so we'll use a dumb hack instead.
			 *
			 * What this is doing is creating a dummy element ("reflection") inside a detached phantom node ("mirror")
			 * that serves as the target of Object.defineProperty instead. While we could simply use the subject HTML
			 * element instead, this would conflict with element types which use indexed properties (such as forms and
			 * select lists).
			 */
			if(FALSE === dpSupport){
				
				var visage,
				mirror      = addProp.mirror = addProp.mirror || DOC[ CREATE_ELEMENT ](DIV),
				reflections = mirror.childNodes,
				
				/** Iterator variables */
				l = reflections[ LENGTH ],
				i = 0;
				
				for(; i < l; ++i)
					if(reflections[i]._R === THIS){
						visage = reflections[i];
						break;
					}
				
				/** Couldn't find an element's reflection inside the mirror. Materialise one. */
				visage || (visage = mirror.appendChild(DOC[ CREATE_ELEMENT ](DIV)));
				
				tokenList = DOMTokenList.call(visage, THIS, attr);
			}
			
			else tokenList = new DOMTokenList(THIS, attr);
			
			
			defineGetter(THIS, name, function(){ return tokenList; });
			delete THIS[gibberishProperty];
			
			return tokenList;
		}, TRUE);
	},

	/** Variables used for patching native methods that're partially implemented (IE doesn't support adding/removing multiple tokens, for instance). */
	testList,
	nativeAdd,
	nativeRemove;
	
	
	
	
	/** No discernible DOMTokenList support whatsoever. Time to remedy that. */
	if(!WIN[ DOM_TOKEN_LIST ]){
		
		/** Ensure the browser allows Object.defineProperty to be used on native JavaScript objects. */
		if(dpSupport)
			try{ defineGetter({}, "support"); }
			catch(e){ dpSupport = FALSE; }
		
		
		DOMTokenList.polyfill   = TRUE;
		WIN[ DOM_TOKEN_LIST ]   = DOMTokenList;
		
		addProp( WIN[ ELEMENT ], CLASS_LIST, CLASS_ + "Name");      /* Element.classList */
		addProp( WIN[ HTML_+ "Link"   + ELEMENT ], REL_LIST, REL);  /* HTMLLinkElement.relList */
		addProp( WIN[ HTML_+ "Anchor" + ELEMENT ], REL_LIST, REL);  /* HTMLAnchorElement.relList */
		addProp( WIN[ HTML_+ "Area"   + ELEMENT ], REL_LIST, REL);  /* HTMLAreaElement.relList */
	}
	
	
	/**
	 * Possible support, but let's check for bugs.
	 *
	 * Where arbitrary values are needed for performing a test, previous variables
	 * are recycled to save space in the minified file.
	 */
	else{
		testList = DOC[ CREATE_ELEMENT ](DIV)[CLASS_LIST];
		
		/** We'll replace a "string constant" to hold a reference to DOMTokenList.prototype (filesize optimisation, yaddah-yaddah...) */
		PROTOTYPE = WIN[DOM_TOKEN_LIST][PROTOTYPE];
		
		
		/** Check if we can pass multiple arguments to add/remove. To save space, we'll just recycle a previous array of strings. */
		testList[ADD][APPLY](testList, METHODS);
		if(2 > testList[LENGTH]){
			nativeAdd      = PROTOTYPE[ADD];
			nativeRemove   = PROTOTYPE[REMOVE];
			
			PROTOTYPE[ADD] = function(){
				for(var i = 0, args = arguments; i < args[LENGTH]; ++i)
					nativeAdd.call(this, args[i]);
			};
			
			PROTOTYPE[REMOVE] = function(){
				for(var i = 0, args = arguments; i < args[LENGTH]; ++i)
					nativeRemove.call(this, args[i]);
			};
		}
		
		
		/** Check if the "force" option of .toggle is supported. */
		if(testList[TOGGLE](LIST, FALSE))
			PROTOTYPE[TOGGLE] = function(token, force){
				var THIS = this;
				THIS[(force = UNDEF === force ? !THIS[CONTAINS](token) : force) ? ADD : REMOVE](token);
				return !!force;
			};
	}
}());

function extend() {
  var obj, name, copy,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length;

  for (; i < length; i++) {
    if ((obj = arguments[i]) !== null) {
      for (name in obj) {
        copy = obj[name];

        if (target === copy) {
          continue;
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
}

function checkStorageValue (value) {
  return (['true', 'false', 'null'].indexOf(value) >= 0) ? JSON.parse(value) : value;
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
  return value;
}

function getSlideId() {
  if (window.tnsId === undefined) {
    window.tnsId = 1;
  } else {
    window.tnsId++;
  }
  return 'tns' + window.tnsId;
}

// get css-calc 
// @return - false | calc | -webkit-calc | -moz-calc
// @usage - var calc = getCalc(); 
function calc() {
  var doc = document, 
      body = doc.body,
      el = doc.createElement('div'), 
      result = false;
  body.appendChild(el);
  try {
    var vals = ['calc(10px)', '-moz-calc(10px)', '-webkit-calc(10px)'], val;
    for (var i = 0; i < 3; i++) {
      val = vals[i];
      el.style.width = val;
      if (el.offsetWidth === 10) { 
        result = val.replace('(10px)', ''); 
        break;
      }
    }
  } catch (e) {}
  body.removeChild(el);

  return result;
}

// get subpixel support value
// @return - boolean
function subpixelLayout() {
  var doc = document,
      body = doc.body,
      parent = doc.createElement('div'),
      child1 = doc.createElement('div'),
      child2;
  parent.style.cssText = 'width: 10px';
  child1.style.cssText = 'float: left; width: 5.5px; height: 10px;';
  child2 = child1.cloneNode(true);

  parent.appendChild(child1);
  parent.appendChild(child2);
  body.appendChild(parent);

  var supported = child1.offsetTop !== child2.offsetTop;
  body.removeChild(parent);

  return supported;
}

function mediaquerySupport () {
  var doc = document,
      body = doc.body,
      div = doc.createElement('div');

  div.className = 'tns-mq-test';
  body.appendChild(div);

  var position = (window.getComputedStyle) ? window.getComputedStyle(div).position : div.currentStyle['position'];
  body.removeChild(div);

  return position === "absolute";
}

// create and append style sheet
function createStyleSheet (media) {
  // Create the <style> tag
  var style = document.createElement("style");
  // style.setAttribute("type", "text/css");

  // Add a media (and/or media query) here if you'd like!
  // style.setAttribute("media", "screen")
  // style.setAttribute("media", "only screen and (max-width : 1024px)")
  if (media) { style.setAttribute("media", media); }

  // WebKit hack :(
  // style.appendChild(document.createTextNode(""));

  // Add the <style> element to the page
  document.querySelector('head').appendChild(style);

  return (style.sheet) ? style.sheet : style.styleSheet;
}

// cross browsers addRule method
function addCSSRule(sheet, selector, rules, index) {
  if("insertRule" in sheet) {
    sheet.insertRule(selector + "{" + rules + "}", index);
  } else if("addRule" in sheet) {
    sheet.addRule(selector, rules, index);
  }
}

function toDegree (y, x) {
  return Math.atan2(y, x) * (180 / Math.PI);
}

function getTouchDirection(angle, range) {
  if ( Math.abs(90 - Math.abs(angle)) >= (90 - range) ) {
    return 'horizontal';
  } else if ( Math.abs(90 - Math.abs(angle)) <= range ) {
    return 'vertical';
  } else {
    return false;
  }
}

function hasAttr(el, attr) {
  return el.hasAttribute(attr);
}

function getAttr(el, attr) {
  return el.getAttribute(attr);
}

function isNodeList(el) {
  // Only NodeList has the "item()" function
  return typeof el.item !== "undefined"; 
}

function setAttrs(els, attrs) {
  els = (isNodeList(els) || els instanceof Array) ? els : [els];
  if (Object.prototype.toString.call(attrs) !== '[object Object]') { return; }

  for (var i = els.length; i--;) {
    for(var key in attrs) {
      els[i].setAttribute(key, attrs[key]);
    }
  }
}

function removeAttrs(els, attrs) {
  els = (isNodeList(els) || els instanceof Array) ? els : [els];
  attrs = (attrs instanceof Array) ? attrs : [attrs];

  var attrLength = attrs.length;
  for (var i = els.length; i--;) {
    for (var j = attrLength; j--;) {
      els[i].removeAttribute(attrs[j]);
    }
  }
}

function removeEventsByClone(el) {
  var elClone = el.cloneNode(true), parent = el.parentNode;
  parent.insertBefore(elClone, el);
  el.remove();
  el = null;
}

function hideElement(el) {
  if (!hasAttr(el, 'hidden')) {
    setAttrs(el, {'hidden': ''});
  }
}

function showElement(el) {
  if (hasAttr(el, 'hidden')) {
    removeAttrs(el, 'hidden');
  }
}

// check if an image is loaded
// 1. See if "naturalWidth" and "naturalHeight" properties are available.
// 2. See if "complete" property is available.

function imageLoaded(img) {
  if (typeof img.complete === 'boolean') {
    return img.complete;
  } else if (typeof img.naturalWidth === 'number') {
    return img.naturalWidth !== 0;
  }
}

function whichProperty(props){
  var el = document.createElement('fakeelement'),
      len = props.length;
  for(var i = 0; i < props.length; i++){
    prop = props[i];
    if( el.style[prop] !== undefined ){ return prop; }
  }

  return false; // explicit for ie9-
}

// get transitionend, animationend based on transitionDuration
// @propin: string
// @propOut: string, first-letter uppercase
// Usage: getEndProperty('webkitTransitionDuration', 'Transition') => webkitTransitionEnd
function getEndProperty(propIn, propOut) {
  var endProp = false;
  if (/^Webkit/.test(propIn)) {
    endProp = 'webkit' + propOut + 'End';
  } else if (/^O/.test(propIn)) {
    endProp = 'o' + propOut + 'End';
  } else if (propIn) {
    endProp = propOut.toLowerCase() + 'end';
  }
  return endProp;
}

// Test via a getter in the options object to see if the passive property is accessed
var supportsPassive = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
    }
  });
  window.addEventListener("test", null, opts);
} catch (e) {}
var passiveOption = supportsPassive ? { passive: true } : false;

function addEvents(el, obj) {
  for (var prop in obj) {
    var option = (prop === 'touchstart' || prop === 'touchmove') ? passiveOption : false;
    el.addEventListener(prop, obj[prop], option);
  }
}

function removeEvents(el, obj) {
  for (var prop in obj) {
    var option = (prop === 'touchstart' || prop === 'touchmove') ? passiveOption : false;
    el.removeEventListener(prop, obj[prop], option);
  }
}

function Events() {
  return {
    topics: {},
    on: function (eventName, fn) {
      this.topics[eventName] = this.topics[eventName] || [];
      this.topics[eventName].push(fn);
    },
    off: function(eventName, fn) {
      if (this.topics[eventName]) {
        for (var i = 0; i < this.topics[eventName].length; i++) {
          if (this.topics[eventName][i] === fn) {
            this.topics[eventName].splice(i, 1);
            break;
          }
        }
      }
    },
    emit: function (eventName, data) {
      if (this.topics[eventName]) {
        this.topics[eventName].forEach(function(fn) {
          fn(data);
        });
      }
    }
  };
}

function jsTransform(element, attr, prefix, postfix, to, duration, callback) {
  var tick = Math.min(duration, 10),
      unit = (to.indexOf('%') >= 0) ? '%' : 'px',
      to = to.replace(unit, ''),
      from = Number(element.style[attr].replace(prefix, '').replace(postfix, '').replace(unit, '')),
      positionTick = (to - from) / duration * tick,
      running;

  setTimeout(moveElement, tick);
  function moveElement() {
    duration -= tick;
    from += positionTick;
    element.style[attr] = prefix + from + unit + postfix;
    if (duration > 0) { 
      setTimeout(moveElement, tick); 
    } else {
      callback();
    }
  }
}

// PRODUCTION

// from go-native
// helper functions
// check browser version and local storage
// if browser upgraded, 
// 1. delete browser ralated data from local storage and 
// 2. recheck these options and save them to local storage
var browserInfo = navigator.userAgent;
var tnsStorage = localStorage;
if (!tnsStorage['tnsApp']) {
  tnsStorage['tnsApp'] = browserInfo;
} else if (tnsStorage['tnsApp'] !== browserInfo) {
  tnsStorage['tnsApp'] = browserInfo;

  ['tnsCalc', 'tnsSubpixel', 'tnsCSSMQ', 'tnsTf', 'tnsTsDu', 'tnsTsDe', 'tnsAnDu', 'tnsAnDe', 'tnsTsEn', 'tnsAnEn'].forEach(function (item) {
    tnsStorage.removeItem(item);
  })
}

// get browser related data from local storage if they exist
// otherwise, run the functions again and save these data to local storage
// checkStorageValue() convert non-string value to its original value: "true" > true
var doc = document;
var KEYS = {
      ENTER: 13,
      SPACE: 32,
      PAGEUP: 33,
      PAGEDOWN: 34,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    };
var CALC = checkStorageValue(tnsStorage['tnsCalc'] || setLocalStorage('tnsCalc', calc()));
var SUBPIXEL = checkStorageValue(tnsStorage['tnsSubpixel'] || setLocalStorage('tnsSubpixel', subpixelLayout()));
var CSSMQ = checkStorageValue(tnsStorage['tnsCSSMQ'] || setLocalStorage('tnsCSSMQ', mediaquerySupport()));
var TRANSFORM = checkStorageValue(tnsStorage['tnsTf'] || setLocalStorage('tnsTf', whichProperty([
      'transform', 
      'WebkitTransform', 
      'MozTransform', 
      'msTransform', 
      'OTransform'
    ])));
var TRANSITIONDURATION = checkStorageValue(tnsStorage['tnsTsDu'] || setLocalStorage('tnsTsDu', whichProperty([
      'transitionDuration', 
      'WebkitTransitionDuration', 
      'MozTransitionDuration', 
      'OTransitionDuration'
    ])));
var TRANSITIONDELAY = checkStorageValue(tnsStorage['tnsTsDe'] || setLocalStorage('tnsTsDe', whichProperty([
      'transitionDelay', 
      'WebkitTransitionDelay', 
      'MozTransitionDelay', 
      'OTransitionDelay'
    ])));
var ANIMATIONDURATION = checkStorageValue(tnsStorage['tnsAnDu'] || setLocalStorage('tnsAnDu', whichProperty([
      'animationDuration', 
      'WebkitAnimationDuration', 
      'MozAnimationDuration', 
      'OAnimationDuration'
    ])));
var ANIMATIONDELAY = checkStorageValue(tnsStorage['tnsAnDe'] || setLocalStorage('tnsAnDe', whichProperty([
      'animationDelay', 
      'WebkitAnimationDelay', 
      'MozAnimationDelay', 
      'OAnimationDelay'
    ])));
var TRANSITIONEND = checkStorageValue(tnsStorage['tnsTsEn'] || setLocalStorage('tnsTsEn', getEndProperty(TRANSITIONDURATION, 'Transition')));
var ANIMATIONEND = checkStorageValue(tnsStorage['tnsAnEn'] || setLocalStorage('tnsAnEn', getEndProperty(ANIMATIONDURATION, 'Animation')));

// reset SUBPIXEL for IE8
if (!CSSMQ) { SUBPIXEL = false; }

var tns = function(options) {
  options = extend({
    container: doc.querySelector('.slider'),
    mode: 'carousel',
    axis: 'horizontal',
    items: 1,
    gutter: 0,
    edgePadding: 0,
    fixedWidth: false,
    slideBy: 1,
    controls: true,
    controlsText: ['prev', 'next'],
    controlsContainer: false,
    nav: true,
    navContainer: false,
    arrowKeys: false,
    speed: 300,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayDirection: 'forward',
    autoplayText: ['start', 'stop'],
    autoplayHoverPause: false,
    autoplayButton: false,
    autoplayResetOnVisibility: true,
    // animateIn: 'tns-fadeIn',
    // animateOut: 'tns-fadeOut',
    // animateNormal: 'tns-normal',
    // animateDelay: false,
    loop: true,
    rewind: false,
    autoHeight: false,
    responsive: false,
    lazyload: false,
    touch: true,
    mouseDrag: false,
    nested: false,
    onInit: false
  }, options || {});
  
  // get element nodes from selectors
  var nodes = ['container', 'controlsContainer', 'navContainer', 'autoplayButton'];
  for (var i = 4; i--;) {
    var el = options[nodes[i]];
    if (typeof el === 'string') { options[nodes[i]] = document.querySelector(el); }
  }

  // make sure slide container exists
  if (!options.container || !options.container.nodeName || options.container.children.length < 2) { return; }

  // === define and set variables ===
  if (options.mode === 'gallery') {
    options.axis = 'horizontal';
    options.edgePadding = false;
    options.loop = true;
    options.autoHeight = true;
    options.slideBy = 'page';

    var animateIn = 'tns-fadeIn',
        animateOut = 'tns-fadeOut',
        animateNormal = options.animateNormal || 'tns-normal',
        animateDelay = false;

    if (TRANSITIONEND && ANIMATIONEND) {
      animateIn = options.animateIn || animateIn;
      animateOut = options.animateOut || animateOut;
      animateDelay = options.animateDelay || animateDelay;
    }
  }

  var carousel = (options.mode === 'carousel') ? true : false,
      horizontal = (options.axis === 'horizontal') ? true : false,
      outerWrapper = doc.createElement('div'),
      innerWrapper = doc.createElement('div'),
      container = options.container,
      containerParent = container.parentNode,
      slideItems = container.children,
      slideCount = slideItems.length,
      items = Math.min(options.items, slideCount),
      slideBy = (options.slideBy === 'page') ? items : options.slideBy,
      nested = options.nested,
      gutter = options.gutter,
      edgePadding = options.edgePadding,
      fixedWidth = (options.fixedWidth) ? options.fixedWidth + Number(options.gutter) : false,
      arrowKeys = options.arrowKeys,
      speed = options.speed,
      rewind = options.rewind,
      loop = (options.rewind)? false : options.loop,
      autoHeight = options.autoHeight,
      responsive = (fixedWidth) ? false : options.responsive,
      breakpoints = false,
      sheet = createStyleSheet(),
      lazyload = options.lazyload,
      slideOffsetTops, // collection of slide offset tops
      slideItemsOut = [],
      cloneCount = (loop) ? slideCount * 2 : (edgePadding) ? 1 : 0,
      slideCountNew = (!carousel) ? slideCount + cloneCount : slideCount + cloneCount * 2,
      hasRightDeadZone = (fixedWidth && !loop && !edgePadding)? true : false,
      checkIndexBeforeTransform = (!carousel || !loop)? true : false,
      // transform
      transformAttr = (horizontal)? 'left' : 'top',
      transformPrefix = '',
      transformPostfix = '',
      // index
      index = (!carousel) ? 0 : cloneCount,
      indexCached = index,
      indexAdjust = (edgePadding) ? 1 : 0,
      indexMin = indexAdjust,
      indexMax = slideCountNew - items - indexAdjust,
      // resize
      vw,
      resizeTimer,
      touchedOrDraged,
      running = false,
      onInit = options.onInit,
      events = new Events(),
      // id, class
      containerIdCached = container.id,
      containerClassCached = container.className,
      slideItemIdCached = slideItems[0].id,
      slideItemClassCached = slideItems[0].className,
      slideId = container.id || getSlideId(),
      sliderFrozen = false;

  if (responsive) {
    if (!responsive[0]) { responsive[0] = Math.min(options.items, slideCount); }
    breakpoints = Object.keys(responsive).sort(function (a, b) { return a - b; });
  } 

  // controls
  if (options.controls) {
    var controls = options.controls,
        controlsText = options.controlsText,
        controlsContainer = options.controlsContainer,
        prevButton,
        nextButton;
  }

  // nav
  if (options.nav) {
    var nav = options.nav,
        navContainer = options.navContainer,
        navItems,
        visibleNavIndexes = [],
        visibleNavIndexesCached = visibleNavIndexes,
        navClicked = -1,
        navCurrent = 0,
        navCurrentCached = 0;
  }

  // autoplay
  if (options.autoplay) {
    var autoplay = options.autoplay,
        autoplayTimeout = options.autoplayTimeout,
        autoplayDirection = (options.autoplayDirection === 'forward') ? 1 : -1,
        autoplayText = options.autoplayText,
        autoplayHoverPause = options.autoplayHoverPause,
        autoplayTimer,
        autoplayButton = options.autoplayButton,
        animating = false,
        autoplayHoverStopped = false,
        autoplayHtmlString = '<span class="tns-visually-hidden">Stop Animation</span>',
        autoplayResetOnVisibility = options.autoplayResetOnVisibility,
        autoplayResetVisibilityState = false;
  }

  // touch
  if (options.touch) {
    var touch = options.touch,
        startX = null,
        startY = null,
        translateInit,
        disX,
        disY;
  }

  //mouse
  if (options.mouseDrag) {
    var mouseDrag = options.mouseDrag,
        mousePressed = false,
        isDragEvent = false;
  }

  if (TRANSFORM) {
    transformAttr = TRANSFORM;
    transformPrefix = 'translate';
    transformPrefix += (horizontal)? 'X(' : 'Y(';
    transformPostfix = ')';
  }

  // === COMMON FUNCTIONS === //
  var getItems = (function () {
    if (fixedWidth) {
      return function () { return Math.max(1, Math.min(slideCount, Math.floor(vw / fixedWidth))); };
    } else {
      return function () {
        var itemsTem;
        breakpoints.forEach(function (key) {
          if (vw >= key) { itemsTem = responsive[key]; }
        });
        return Math.max(1, Math.min(slideCount, itemsTem));
      };
    }
  })();

  events.on('itemsChanged', function () {
    indexMax = slideCountNew - items - indexAdjust;
    if (options.slideBy === 'page') { slideBy = items; }
    updateSlideStatus();
  });

  (function sliderInit() {
    // First thing first, wrap container with "outerWrapper > innerWrapper",
    // to get the correct view width
    outerWrapper.appendChild(innerWrapper);
    containerParent.insertBefore(outerWrapper, container);
    innerWrapper.appendChild(container);

    var dataOuter = 'tns-outer',
        dataInner = 'tns-inner',
        dataContainer = ' tns-slider tns-' + options.mode;

    if (carousel) {
      if (horizontal) {
        if (edgePadding || gutter && !fixedWidth) {
          dataOuter += ' tns-ovh';
        } else {
          dataInner += ' tns-ovh';
        }
      } else {
        dataInner += ' tns-ovh';
      }
    // } else {
    //   dataOuter += ' tns-hdx';
    }

    outerWrapper.className = dataOuter;
    innerWrapper.className = dataInner;
    if (autoHeight) {
      innerWrapper.className += ' tns-ah';
      innerWrapper.style[TRANSITIONDURATION] = speed / 1000 + 's';
    }

    // set container properties
    if (container.id === '') { container.id = slideId; }
    dataContainer += (SUBPIXEL) ? ' tns-subpixel' : ' tns-no-subpixel';
    dataContainer += (CALC) ? ' tns-calc' : ' tns-no-calc';
    if (carousel) { dataContainer += ' tns-' + options.axis; }
    container.className += dataContainer;

    // delete datas after init
    dataOuter = dataInner = dataContainer = null;

    // set edge padding on innerWrapper
    if (edgePadding) {
      if (fixedWidth) {
        updateFixedWidthEdgePadding();
      } else {
        var gap1 = edgePadding + gutter,
            gap2 = edgePadding;

        innerWrapper.style.cssText += (horizontal) ?
            'margin: 0 ' + gap2 + 'px 0 ' + gap1 + 'px' :
            'padding: ' + gap1 + 'px 0 ' + gap2 + 'px 0';
      }
    }

    // get vw after setting edge padding
    vw = getViewWidth();

    // add id, class, aria attributes 
    // before clone slides
    for (var x = 0; x < slideCount; x++) {
      var item = slideItems[x];
      item.id = slideId + '-item' + x;
      item.classList.add('tns-item');
      if (!carousel && animateNormal) { item.classList.add(animateNormal); }
      setAttrs(item, {
        'aria-hidden': 'true',
        'tabindex': '-1'
      });
    }

    // clone slides
    if (loop || edgePadding) {
      var fragmentBefore = doc.createDocumentFragment(), 
          fragmentAfter = doc.createDocumentFragment();

      for (var j = cloneCount; j--;) {
        var num = j%slideCount,
            cloneFirst = slideItems[num].cloneNode(true);
        removeAttrs(cloneFirst, 'id');
        fragmentAfter.insertBefore(cloneFirst, fragmentAfter.firstChild);

        if (carousel) {
          var cloneLast = slideItems[slideCount - 1 - num].cloneNode(true);
          removeAttrs(cloneLast, 'id');
          fragmentBefore.appendChild(cloneLast);
        }
      }

      container.insertBefore(fragmentBefore, container.firstChild);
      container.appendChild(fragmentAfter);
      slideItems = container.children;
    }

    // update the items before activate visible slides
    if (responsive || fixedWidth) { 
      items = getItems();
      events.emit('itemsChanged');
    }

    // activate visible slides
    // add aria attrs
    // set animation classes and left value for gallery slider
    for (var i = index; i < index + items; i++) {
      var item = slideItems[i];
      setAttrs(item, {'aria-hidden': 'false'});
      removeAttrs(item, ['tabindex']);

      if (!carousel) { 
        item.style.left = (i - index) * 100 / items + '%';
        item.classList.remove(animateNormal);
        item.classList.add(animateIn);
      }
    }

    // append stylesheet
    // == horizontal slider ==
    // prevent rewriting from parent slider
    var importantStr = (nested === 'inner') ? ' !important' : '';
    if (horizontal) {
      var stringSlideLeft =
          stringSlideFontSize = 
          stringSlideGutter = '',
          stringSlideWidth = 'width:';

      // * carousel *
      if (carousel) {
        var stringContainerWidth = 
            stringContainerFontSize = ''; 

        // get container width, slide width
        stringContainerWidth += 'width:';
        if (fixedWidth) {
            stringContainerWidth += fixedWidth * slideCountNew + 'px';
            stringSlideWidth += fixedWidth + 'px';
        } else {
          if (CSSMQ) {
            stringContainerWidth += (CALC) ? 
                CALC + '(' + slideCountNew * 100 + '% / ' + items + ')' : 
                slideCountNew * 100 / items + '%';
          } else {
            updateContainerWidthNonMediaquery();
          }

          stringSlideWidth += (CALC) ? 
              CALC + '(100% / ' + slideCountNew + ')' : 
              100 / slideCountNew + '%';
        }
        stringContainerWidth += ';';

        // get font-size string
        if (SUBPIXEL) {
          var cssFontSize = window.getComputedStyle(slideItems[0]).fontSize;
          // em, rem to px (for IE8-)
          if (cssFontSize.indexOf('em') !== -1) { cssFontSize = Number(cssFontSize.replace(/r?em/, '')) * 16 + 'px'; }

          stringContainerFontSize = ' font-size: 0;';
          stringSlideFontSize = ' font-size: ' + cssFontSize + ';';
        }

        addCSSRule(sheet, '#' + slideId, stringContainerWidth + stringContainerFontSize, getCssRulesLength(sheet));

      // * gallery *
      } else {
        // get slide width
        stringSlideWidth += (CALC) ? 
            CALC + '(100% / ' + items + ')' :
            100 / items + '%';
      }
      stringSlideWidth += importantStr + ';';

      // set gutter
      if (gutter) {
        if (!edgePadding && !fixedWidth) { innerWrapper.style.marginRight = - gutter + 'px';}
        stringSlideGutter = 'padding-right: ' + gutter + 'px;';
      }

      addCSSRule(sheet, '#' + slideId + ' .tns-item',  stringSlideWidth + stringSlideGutter + stringSlideFontSize, getCssRulesLength(sheet));

      // insert margin-left styles
      // for non-subpixel browsers (webkit)
      // after insert container and slide styles
      if (carousel && !SUBPIXEL) {
        for (var q = 0; q < slideItems.length; q++) {
          var marginLeft = (CALC) ? 
              CALC + '(' + q * 100 + '% / ' + slideCountNew + ')' : 
              q * 100 / slideCountNew + "%";
          // webkit
          if (CSSMQ) {
            sheet.insertRule('#' + slideId + ' .tns-item:nth-child(' + (q + 1) + ') { margin-left: ' + marginLeft + importantStr + '; }', sheet.cssRules.length);
            
          // IE8
          } else {
            slideItems[q].style.marginLeft = marginLeft;
          }
        }
      }

      // media queries
      if (responsive && CSSMQ) {
        var bpLen = breakpoints.length;
        for (var i = 0; i < bpLen; i++) {
          var bp = breakpoints[i],
              itemsTem = responsive[bp],
              strContainer;

          strContainer = (CALC) ? CALC + '(100% * ' + slideCountNew + ' / ' + itemsTem + ')' : 100 * slideCountNew / itemsTem + '%',
          strContainer = '#' + slideId + '{width: ' + strContainer + '}';

          sheet.insertRule('@media (min-width: ' + bp / 16 + 'em) {' + strContainer + '}', sheet.cssRules.length);
        }
      }

    // vertical slider
    } else {
      // set slide gutter
      if (gutter) {
        if (!edgePadding) { innerWrapper.style.marginBottom = - gutter + 'px';}
        addCSSRule(sheet, '#' + slideId + ' .tns-item', 'margin-bottom: ' + gutter + 'px;', 0);
      }

      getSlideOffsetTops();
      updateContentWrapperHeight();
    }

    // set container transform property
    if (carousel) {
      doContainerTransform();
    }


    // == msInit ==
    // for IE10
    if (navigator.msMaxTouchPoints) {
      outerWrapper.classList.add('ms-touch');
      addEvents(outerWrapper, {'scroll': ie10Scroll});
      setSnapInterval();
    }


    // == navInit ==
    if (nav) {
      // customized nav
      // will not hide the navs in case they're thumbnails
      if (navContainer) {
        setAttrs(navContainer, {'aria-label': 'Carousel Pagination'});
        navItems = navContainer.children;
        [].forEach.call(navItems, function (item, index) {
          setAttrs(item, {
            'data-nav': index,
            'tabindex': '-1',
            'aria-selected': 'false',
            'aria-controls': slideId + '-item' + index,
          });
        });

      // generated nav 
      } else {
        var navHtml = '';
        for (var i = 0; i < slideCount; i++) {
          // hide nav items by default
          navHtml += '<button data-nav="' + i +'" tabindex="-1" aria-selected="false" aria-controls="' + slideId + '-item' + i +'" hidden type="button"></button>';
        }
        navHtml = '<div class="tns-nav" aria-label="Carousel Pagination">' + navHtml + '</div>';
        outerWrapper.insertAdjacentHTML('afterbegin', navHtml);

        [].forEach.call(outerWrapper.children, function (el) {
          if (el.classList.contains('tns-nav')) { navContainer = el; }
        });
        navItems = navContainer.children;

        updateNavVisibility();
      }

      setAttrs(navItems[0], {'tabindex': '0', 'aria-selected': 'true'});
    }


    // == autoplayInit ==
    if (autoplay) {
      if (autoplayButton) {
        setAttrs(autoplayButton, {'data-action': 'stop'});
      } else {
        if (!navContainer) {
          outerWrapper.insertAdjacentHTML('afterbegin', '<div class="tns-nav" aria-label="Carousel Pagination"></div>');
          navContainer = outerWrapper.querySelector('.tns-nav');
        }

        navContainer.insertAdjacentHTML('beforeend', '<button data-action="stop" type="button">' + autoplayHtmlString + autoplayText[0] + '</button>');
        autoplayButton = navContainer.querySelector('[data-action]');
      }
    }


    // == controlsInit ==
    if (controls) {
      if (controlsContainer) {
        prevButton = controlsContainer.children[0];
        nextButton = controlsContainer.children[1];
        setAttrs(controlsContainer, {
          'aria-label': 'Carousel Navigation',
          'tabindex': '0'
        });
        setAttrs(prevButton, {'data-controls' : 'prev'});
        setAttrs(nextButton, {'data-controls' : 'next'});
        setAttrs(controlsContainer.children, {
          'aria-controls': slideId,
          'tabindex': '-1',
        });
      } else {
        outerWrapper.insertAdjacentHTML('afterbegin', '<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button data-controls="prev" tabindex="-1" aria-controls="' + slideId +'" type="button">' + controlsText[0] + '</button><button data-controls="next" tabindex="-1" aria-controls="' + slideId +'" type="button">' + controlsText[1] + '</button></div>');

        [].forEach.call(outerWrapper.children, function (el) {
          if (el.classList.contains('tns-controls')) { controlsContainer = el; }
        });
        prevButton = controlsContainer.children[0];
        nextButton = controlsContainer.children[1];
      }

      if (!loop) { prevButton.disabled = true; }
    }


    // == addSliderEvents ==
    if (carousel && TRANSITIONEND) {
      var eve = {};
      eve[TRANSITIONEND] = onTransitionEnd;
      addEvents(container, eve);
    }

    if (nav) {
      for (var y = 0; y < slideCount; y++) {
        addEvents(navItems[y],{
          'click': onNavClick,
          'keydown': onNavKeydown
        });
      }
    }

    if (controls) {
      addEvents(controlsContainer, {'keydown': onControlKeydown});
      addEvents(prevButton,{'click': onPrevClick});
      addEvents(nextButton,{'click': onNextClick});
    }

    if (nested === 'inner') {
      events.on('outerResized', function () {
        resizeTasks();
        events.emit('innerLoaded', info());
      });
    } else {
      addEvents(window, {'resize': onResize});
      if (nested === 'outer') {
        events.on('innerLoaded', runAutoHeight);
      }
    }

    checkSlideCount(true);
    lazyLoad();
    runAutoHeight();

    if (typeof onInit === 'function') {
      onInit(info());
    }

    if (nested === 'inner') { 
      events.emit('innerLoaded', info()); 
    }
  })();





// === ON RESIZE ===
  function onResize(e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (vw !== getViewWidth()) {
        resizeTasks();
        if (nested === 'outer') { 
          events.emit('outerResized', info(e)); 
        }
      }
    }, 100); // update after stop resizing for 100 ms
  }

  function resizeTasks() {
    vw = getViewWidth();
    var indexTem = index, itemsTem = items;
    if (responsive || fixedWidth) { items = getItems(); }

    // things always do 
    // regardless of items changing
    if (!horizontal) {
      getSlideOffsetTops();
      updateContentWrapperHeight();
      doContainerTransform();
    }
    if (fixedWidth && edgePadding) { updateFixedWidthEdgePadding(); }
    runAutoHeight(); 
    
    // things do only when items changed
    if (responsive && items !== itemsTem) {
      events.emit('itemsChanged');
      checkIndex();
      checkSlideCount();

      // update container width on non-mediaquery browser
      if (!fixedWidth && !CSSMQ) {
        updateContainerWidthNonMediaquery();
      }

      lazyLoad(); 
      updateControlsStatus();
      updateNavVisibility();
      updateNavStatus();

      if (index !== indexTem) { 
        events.emit('indexChanged', info());
        doTransform(0); 
      }

      if (navigator.msMaxTouchPoints) { setSnapInterval(); }
    }
  }





  // === INITIALIZATION FUNCTIONS === //
  function getViewWidth () {
    return outerWrapper.clientWidth;
  }

  function checkSlideCount(isInitializing) {
    // disable 
    if (!sliderFrozen && slideCount <= items) { 
      toggleSliderEvents(isInitializing, true);
      if (animating) { stopAction(); }

      // reset index to initial status
      index = (carousel) ? 0 : cloneCount;

      if (nav) { hideElement(navContainer); }
      if (controls) { hideElement(controlsContainer); }
      if (autoplay) { hideElement(autoplayButton); }

      sliderFrozen = true;

    // enable
    } else {
      toggleSliderEvents(isInitializing, false);
      if (autoplay && !animating) { startAction(); }

      if (nav) { showElement(navContainer); }
      if (controls) { showElement(controlsContainer); }
      if (autoplay) { showElement(autoplayButton); }

      sliderFrozen = false;
    }
  }

  function getCssRulesLength (sheet) {
    return (sheet.cssRules) ? sheet.cssRules.length : sheet.rules.length;
  }

  function updateContainerWidthNonMediaquery () {
    container.style.width = slideCountNew * 100 / items + '%';
  }

  // (slideBy, indexMin, indexMax) => index
  var checkIndex = (function () {
    if (loop) {
      return function () {
        var leftEdge = indexMin, rightEdge = indexMax;
        if (carousel) {
          leftEdge += slideBy;
          rightEdge -= slideBy;
        }

        if (fixedWidth && vw%(fixedWidth + gutter) !== 0) { rightEdge -= 1; }

        if (index > rightEdge) {
          while(index >= leftEdge + slideCount) { index -= slideCount; }
        } else if(index < leftEdge) {
          while(index <= rightEdge - slideCount) { index += slideCount; }
        }
      };
    } else {
      return function () {
        index = Math.max(indexMin, Math.min(indexMax, index));
      };
    }
  })();

  function toggleSliderEvents(isInitializing, freeze) {
    var remove = !isInitializing && freeze,
        add = !freeze;
        
    // touch and drag
    if (carousel) {
      var touchEvents = {
            'touchstart': onTouchOrMouseStart,
            'touchmove': onTouchOrMouseMove,
            'touchend': onTouchOrMouseEnd,
            'touchcancel': onTouchOrMouseEnd
          }, dragEvents = {
            'mousedown': onTouchOrMouseStart,
            'mousemove': onTouchOrMouseMove,
            'mouseup': onTouchOrMouseEnd,
            'mouseleave': onTouchOrMouseEnd
          };

      if (remove) {
        if (touch) { removeEvents(container, touchEvents); }
        if (mouseDrag) { removeEvents(container, dragEvents); }
      }

      if (add) {
        if (touch) { addEvents(container, touchEvents); }
        if (mouseDrag) { addEvents(container, dragEvents); }
      }
    }

    // autoplay and arrow keys
    var autoplayEvent = {'click': toggleAnimation},
        hoverEvents = {
          'mouseover': mouseoverPause,
          'mouseout': mouseoutRestart
        },
        visibilityEvent = {'visibilitychange': onVisibilityChange},
        docmentKeydownEvent = {'keydown': onDocumentKeydown};

    if (remove) {
      if (autoplay) {
        removeEvents(autoplayButton, autoplayEvent);
        if (autoplayHoverPause) { removeEvents(container, hoverEvents); }
        if (autoplayResetOnVisibility) { removeEvents(document, visibilityEvent); }
      }

      if (arrowKeys) { removeEvents(document, docmentKeydownEvent); }
    } 

    if (add) {
      if (autoplay) {
        addEvents(autoplayButton, autoplayEvent);
        if (autoplayHoverPause) { addEvents(container, hoverEvents); }
        if (autoplayResetOnVisibility) { addEvents(document, visibilityEvent); }
      }

      if (arrowKeys) { addEvents(document, docmentKeydownEvent); }
    }
  }

  function mouseoverPause() {
    if (animating) { 
      stopAction(); 
      autoplayHoverStopped = true;
    }
  }

  function mouseoutRestart() {
    if (!animating && autoplayHoverStopped) { 
      startAction(); 
      autoplayHoverStopped = false;
    }
  }

  // lazyload
  function lazyLoad() {
    if (lazyload) {
      var i = index, 
          len = index + items;
          
      if (edgePadding) {
        i -=1;
        len +=1;
      }

      for(; i < len; i++) {
        [].forEach.call(slideItems[i].querySelectorAll('.tns-lazy-img'), function (img) {
          // stop propagationl transitionend event to container
          var eve = {};
          eve[TRANSITIONEND] = function (e) { e.stopPropagation(); };
          addEvents(img, eve);

          if (!img.classList.contains('loaded')) {
            img.src = getAttr(img, 'data-src');
            img.classList.add('loaded');
          }
        });
      }
    }
  }

  // check if all visible images are loaded
  // and update container height if it's done
  function runAutoHeight() {
    if (autoHeight) {
      // get all images inside visible slide items
      var images = [];

      for (var i = index; i < index + items; i++) {
        [].forEach.call(slideItems[i].querySelectorAll('img'), function (img) {
          images.push(img);
        });
      }

      if (images.length === 0) {
        updateInnerWrapperHeight(); 
      } else {
        checkImagesLoaded(images);
      }
    }
  }

  function checkImagesLoaded(images) {
    images.forEach(function (img, index) {
      if (imageLoaded(img)) { images.splice(index, 1); }
    });

    if (images.length === 0) {
      updateInnerWrapperHeight();
    } else {
      setTimeout(function () { 
        checkImagesLoaded(images); 
      }, 16);
    }
  } 


  // update inner wrapper height
  // 1. get the max-height of the visible slides
  // 2. set transitionDuration to speed
  // 3. update inner wrapper height to max-height
  // 4. set transitionDuration to 0s after transition done
  function updateInnerWrapperHeight() {
    var heights = [], maxHeight;
    for (var i = index; i < index + items; i++) {
      heights.push(slideItems[i].offsetHeight);
    }
    maxHeight = Math.max.apply(null, heights);

    if (innerWrapper.style.height !== maxHeight) {
      if (TRANSITIONDURATION) { setDurations(speed); }
      innerWrapper.style.height = maxHeight + 'px';
    }
  }

  // get the distance from the top edge of the first slide to each slide
  // (init) => slideOffsetTops
  function getSlideOffsetTops() {
    slideOffsetTops = [0];
    var topFirst = slideItems[0].getBoundingClientRect().top, attr;
    for (var i = 1; i < slideCountNew; i++) {
      attr = slideItems[i].getBoundingClientRect().top;
      slideOffsetTops.push(attr - topFirst);
    }
  }

  // set snapInterval (for IE10)
  function setSnapInterval() {
    outerWrapper.style.msScrollSnapPointsX = 'snapInterval(0%, ' + (100 / items) + '%)';
  }

  // update slide
  function updateSlideStatus() {
    for (var i = slideCountNew; i--;) {
      var item = slideItems[i];
      // visible slides
      if (i >= index && i < index + items) {
        if (hasAttr(item, 'tabindex')) {
          setAttrs(item, {'aria-hidden': 'false'});
          removeAttrs(item, ['tabindex']);
        }
      // hidden slides
      } else {
        if (!hasAttr(item, 'tabindex')) {
          setAttrs(item, {
            'aria-hidden': 'true',
            'tabindex': '-1'
          });
        }
      }
    }
  }

  // set tabindex & aria-selected on Nav
  function updateNavStatus() {
    // get current nav
    if (nav) {
      navCurrent = (navClicked !== -1) ? navClicked : (!loop && edgePadding) ? (index - 1)%slideCount : index%slideCount;
      navClicked = -1;

      if (navCurrent !== navCurrentCached) {
        setAttrs(navItems[navCurrentCached], {
          'tabindex': '-1',
          'aria-selected': 'false'
        });

        setAttrs(navItems[navCurrent], {
          'tabindex': '0',
          'aria-selected': 'true'
        });
        navCurrentCached = navCurrent;
      }
    }
  }

  // set 'disabled' to true on controls when reach the edge
  function updateControlsStatus() {
    if (controls && !loop) {
      var disable = [], active = [];
      if (index === indexMin) {
        disable.push(prevButton);
        active.push(nextButton);
        changeFocus(prevButton, nextButton);
      } else if (!rewind && index === indexMax) {
        disable.push(nextButton);
        active.push(prevButton);
        changeFocus(nextButton, prevButton);
      } else {
        active.push(prevButton, nextButton);
      }

      if (disable.length > 0) {
        disable.forEach(function (button) {
          if (!button.disabled) {
            button.disabled = true;
          }
        });
      }

      if (active.length > 0) {
        active.forEach(function (button) {
          if (button.disabled) {
            button.disabled = false;
          }
        });
      }
    }
  }

  // set duration
  function setDurations (duration, target) {
    duration = (!duration)? '' : duration / 1000 + 's';
    target = target || container;
    target.style[TRANSITIONDURATION] = duration;

    if (!carousel) {
      target.style[ANIMATIONDURATION] = duration;
    }
    if (!horizontal) {
      innerWrapper.style[TRANSITIONDURATION] = duration;
    }
  }

  function getContainerTransformValue() {
    var containerTransformValue;
    if (!horizontal) {
      containerTransformValue = - slideOffsetTops[index] + 'px';
    } else {
      if (fixedWidth) {
        containerTransformValue = - fixedWidth * index + 'px';
      } else {
        var denominator = (TRANSFORM) ? slideCountNew : items;
        containerTransformValue = - index * 100 / denominator + '%';
      }
    }
    return containerTransformValue;
  }

  function doContainerTransform(val) {
    if (!val) { val = getContainerTransformValue(); }
    container.style[transformAttr] = transformPrefix + val + transformPostfix;
  }

  function animateSlide(number, classOut, classIn, isOut) {
    for (var i = number, l = number + items; i < l; i++) {
      var item = slideItems[i];

      // set item positions
      if (!isOut) { item.style.left = (i - index) * 100 / items + '%'; }

      if (TRANSITIONDURATION) { setDurations(speed, item); }
      if (animateDelay && TRANSITIONDELAY) {
        item.style[TRANSITIONDELAY] = item.style[ANIMATIONDELAY] = animateDelay * (i - number) / 1000 + 's';
      }
      item.classList.remove(classOut);
      item.classList.add(classIn);
      
      if (isOut) { slideItemsOut.push(item); }
    }
  }

  // make transfer after click/drag:
  // 1. change 'transform' property for mordern browsers
  // 2. change 'left' property for legacy browsers
  var transformCore = (function () {
    // carousel
    if (carousel) {
      return function (duration, distance) {
        if (!distance) { distance = getContainerTransformValue(); }
        // constrain the distance when non-loop no-edgePadding fixedWidth reaches the right edge
        if (hasRightDeadZone && index === indexMax) {
          var containerRightEdge = (TRANSFORM) ? 
              - ((slideCountNew - items) / slideCountNew) * 100 : 
              - (slideCountNew / items - 1) * 100; 
          distance = Math.max(Number(distance.replace('%', '')), containerRightEdge) + '%';
        }

        if (TRANSITIONDURATION || !duration) {
          doContainerTransform(distance);
          if (speed === 0) { onTransitionEnd(); }
        } else {
          jsTransform(container, transformAttr, transformPrefix, transformPostfix, distance, speed, onTransitionEnd);
        }

        if (!horizontal) { updateContentWrapperHeight(); }
      };

    // gallery
    } else {
      return function () {
        slideItemsOut = [];

        var eve = {};
        eve[TRANSITIONEND] = eve[ANIMATIONEND] = onTransitionEnd;
        removeEvents(slideItems[indexCached], eve);
        addEvents(slideItems[index], eve);

        animateSlide(indexCached, animateIn, animateOut, true);
        animateSlide(index, animateNormal, animateIn);

        if (!TRANSITIONEND || !ANIMATIONEND || speed === 0) { setTimeout(onTransitionEnd, 0); }
      };
    }
  })();

  function doTransform (duration, distance) {
    if (duration === undefined) { duration = speed; }
    if (TRANSITIONDURATION) { setDurations(duration); }
    transformCore(duration, distance);
  }

  function render() {
    running = true;
    if (checkIndexBeforeTransform) { checkIndex(); }

    // events
    if (index !== indexCached) { events.emit('indexChanged', info()); }
    events.emit('transitionStart', info());

    doTransform();
  }

  // AFTER TRANSFORM
  // Things need to be done after a transfer:
  // 1. check index
  // 2. add classes to visible slide
  // 3. disable controls buttons when reach the first/last slide in non-loop slider
  // 4. update nav status
  // 5. lazyload images
  // 6. update container height
  function onTransitionEnd(event) {
    events.emit('transitionEnd', info(event));

    if (!carousel && slideItemsOut.length > 0) {
      for (var i = 0; i < items; i++) {
        var item = slideItemsOut[i];
        // set item positions
        item.style.left = '';

        if (TRANSITIONDURATION) { setDurations(0, item); }
        if (animateDelay && TRANSITIONDELAY) { 
          item.style[TRANSITIONDELAY] = item.style[ANIMATIONDELAY] = '';
        }
        item.classList.remove(animateOut);
        item.classList.add(animateNormal);
      }
    }

    /*
     * Transfer prefixed properties to the same format
     * CSS: -Webkit-Transform => webkittransform
     * JS: WebkitTransform => webkittransform
     * @param {string} str - property
     *
     */
    function strTrans(str) {
      return str.toLowerCase().replace(/-/g, '');
    }

    /* update slides, nav, controls after checking ...
     * => legacy browsers who don't support 'event' 
     *    have to check event first, otherwise event.target will cause an error 
     * => or 'gallery' mode: 
     *   + event target is slide item
     * => or 'carousel' mode: 
     *   + event target is container, 
     *   + event.property is the same with transform attribute
     */
    if (!event || 
        !carousel && event.target.parentNode === container || 
        event.target === container && strTrans(event.propertyName) === strTrans(transformAttr)) {

      if (!checkIndexBeforeTransform) { 
        var indexTem = index;
        checkIndex();
        if (index !== indexTem) { 
          doTransform(0); 
          events.emit('indexChanged', info());
        }
      } 

      updateSlideStatus();

      // non-loop: always update nav visibility
      // loop: update nav visibility when visibleNavIndexes doesn't contain current index
      if (nav && !loop || 
          nav && loop && visibleNavIndexes.indexOf(index%slideCount) === -1) { 
        updateNavVisibility(); 
      }
      updateNavStatus();
      updateControlsStatus();
      lazyLoad();
      runAutoHeight();

      if (nested === 'inner') { 
        events.emit('innerLoaded', info()); 
      } 
      running = false;
      indexCached = index;
    }

  }

  // # ACTIONS
  function goTo (targetIndex) {
    if (!running) {
      var absIndex = index%slideCount, indexGap;
      if (absIndex < 0) { absIndex += slideCount; }

      switch(targetIndex) {
        case 'next':
          indexGap = 1;
          break;
        case 'prev':
          indexGap = -1;
          break;
        case 'first':
          indexGap = - absIndex;
          break;
        case 'last':
          indexGap = (slideCount - 1) - absIndex;
          break;
        default:
          if (typeof targetIndex === 'number') {
            var absTargetIndex = targetIndex%slideCount;
            if (absTargetIndex < 0) { absTargetIndex += slideCount; }
            if (!loop && edgePadding) { absTargetIndex += 1; }
            indexGap = absTargetIndex - absIndex;
          }
      }

      index += indexGap;
      // check index before compare with indexCached
      if (checkIndexBeforeTransform) { checkIndex(); }

      // if index is changed, start rendering
      if (index%slideCount !== indexCached%slideCount) {
        render();
      }

    }
  }

  // on controls click
  function onControlClick(dir) {
    if (!running) {
      index = index + dir * slideBy;

      render();
    }
  }

  function onPrevClick() {
    onControlClick(-1);
  }

  function onNextClick() {
    // goes to the first if reach the end in rewind mode
    // other wise go to the next
    if(rewind && index === indexMax){
      goTo(0);
    }else{
      onControlClick(1);
    }
  }

  // on nav click
  function onNavClick(e) {
    if (!running) {
      var clickTarget = e.target || e.srcElement,
          navIndex;

      // find the clicked nav item
      while (getAttr(clickTarget, 'data-nav') === null) {
        clickTarget = clickTarget.parentNode;
      }
      navIndex = navClicked = Number(getAttr(clickTarget, 'data-nav'));

      goTo(navIndex);
    }
  }

  function startAction() {
    resetActionTimer();
    setAttrs(autoplayButton, {'data-action': 'stop'});
    autoplayButton.innerHTML = autoplayHtmlString + autoplayText[1];

    animating = true;
  }

  function stopAction() {
    pauseActionTimer();
    setAttrs(autoplayButton, {'data-action': 'start'});
    autoplayButton.innerHTML = autoplayHtmlString.replace('Stop', 'Start') + autoplayText[0];

    animating = false;
  }

  function pauseActionTimer() {
    animating = 'paused';
    clearInterval(autoplayTimer);
  }

  function resetActionTimer() {
    if (animating === true) { return; }
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(function () {
      onControlClick(autoplayDirection);
    }, autoplayTimeout);
  }

  function toggleAnimation() {
    if (animating) {
      stopAction();
    } else {
      startAction();
    }
  }

  function onVisibilityChange() {
    if (autoplayResetVisibilityState != doc.hidden && animating !== false) {
      doc.hidden ? pauseActionTimer() : resetActionTimer();
    }
    autoplayResetVisibilityState = doc.hidden;
  }

  // keydown events on document 
  function onDocumentKeydown(e) {
    e = e || window.event;
    switch(e.keyCode) {
      case KEYS.LEFT:
        onPrevClick();
        break;
      case KEYS.RIGHT:
        onNextClick();
    }
  }

  // change focus
  function changeFocus(blur, focus) {
    if (typeof blur === 'object' && 
        typeof focus === 'object' && 
        blur === doc.activeElement) {
      blur.blur();
      focus.focus();
    }
  }

  // on key control
  function onControlKeydown(e) {
    e = e || window.event;
    var code = e.keyCode,
        curElement = doc.activeElement;

    switch (code) {
      case KEYS.LEFT:
      case KEYS.UP:
      case KEYS.PAGEUP:
          if (!prevButton.disabled) {
            onPrevClick();
          }
          break;
      case KEYS.RIGHT:
      case KEYS.DOWN:
      case KEYS.PAGEDOWN:
          if (!nextButton.disabled) {
            onNextClick();
          }
          break;
      case KEYS.HOME:
        goTo(0);
        break;
      case KEYS.END:
        goTo(slideCount - 1);
        break;
    }
  }

  // on key nav
  function onNavKeydown(e) {
    e = e || window.event;
    var code = e.keyCode,
        curElement = doc.activeElement,
        dataSlide = Number(getAttr(curElement, 'data-nav')),
        len = visibleNavIndexes.length,
        current = visibleNavIndexes.indexOf(dataSlide),
        navIndex;

    if (options.navContainer) {
      len = slideCount;
      current = dataSlide;
    }

    function getNavIndex(num) {
      return (options.navContainer) ? num : visibleNavIndexes[num];
    }

    switch(code) {
      case KEYS.LEFT:
      case KEYS.PAGEUP:
        if (current > 0) { 
          changeFocus(curElement, navItems[getNavIndex(current - 1)]); 
        }
        break;

      case KEYS.UP:
      case KEYS.HOME:
        if (current > 0) { 
          changeFocus(curElement, navItems[getNavIndex(0)]); 
        }
        break;

      case KEYS.RIGHT:
      case KEYS.PAGEDOWN:
        if (current < len - 1) { 
          changeFocus(curElement, navItems[getNavIndex(current + 1)]); 
        }
        break;

      case KEYS.DOWN:
      case KEYS.END:
        if (current < len - 1) { 
          changeFocus(curElement, navItems[getNavIndex(len - 1)]); 
        }
        break;

      case KEYS.ENTER:
      case KEYS.SPACE:
        onNavClick(e);
        break;
    }
  }

  // IE10 scroll function
  function ie10Scroll() {
    doTransform(0, container.scrollLeft());
    indexCached = index;
  }

  function getTarget(e) {
    return e.target || e.srcElement;
  }

  function isLinkElement(el) {
    return el.tagName.toLowerCase() === 'a';
  }

  function preventDefaultBehavior(e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
  }

  function onTouchOrMouseStart(e) {
    e = e || window.event;
    if (isLinkElement(getTarget(e)) && e.type !== 'touchstart') { preventDefaultBehavior(e); }

    var ev = (e.type === 'touchstart') ? e.changedTouches[0] : e;
    startX = parseInt(ev.clientX);
    startY = parseInt(ev.clientY);
    translateInit = Number(container.style[transformAttr].replace(transformPrefix, '').replace(transformPostfix, '').replace(/(px|%)/g, ''));

    if (e.type === 'touchstart') {
      events.emit('touchStart', info(e));
    } else {
      events.emit('dragStart', info(e));
      mousePressed = true;
    }
  }

  function onTouchOrMouseMove(e) {
    e = e || window.event;

    // "mousemove" event after "mousedown" indecate it's "drag", not "click"
    // set isDragEvent to true
    if (mousePressed && e.type === 'mousemove' && !isDragEvent) {
      isDragEvent = true;
    }
    
    // make sure touch started or mouse draged
    if (startX !== null) {
      if (isLinkElement(getTarget(e)) && e.type !== 'touchmove') { preventDefaultBehavior(e); }

      var ev = (e.type === 'touchmove') ? e.changedTouches[0] : e;
      disX = parseInt(ev.clientX) - startX;
      disY = parseInt(ev.clientY) - startY;

      if (getTouchDirection(toDegree(disY, disX), 15) === options.axis) { 
        touchedOrDraged = true;

        if (e.type === 'touchmove') {
          events.emit('touchMove', info(e));
        } else {
          events.emit('dragMove', info(e));
        }

        var x = translateInit;
        if (horizontal) {
          if (fixedWidth) {
            x += disX;
            x += 'px';
          } else {
            var percentageX = (TRANSFORM) ? disX * items * 100 / (vw * slideCountNew): disX * 100 / vw;
            x += percentageX;
            x += '%';
          }
        } else {
          x += disY;
          x += 'px';
        }

        if (TRANSFORM) { setDurations(0); }
        container.style[transformAttr] = transformPrefix + x + transformPostfix;
      }
    }
  }

  function onTouchOrMouseEnd(e) {
    e = e || window.event;

    // reset mousePressed
    if (mousePressed) { mousePressed = false; }

    if (touchedOrDraged) {
      touchedOrDraged = false;

      var ev = (e.type.indexOf('touch') === 0) ? e.changedTouches[0] : e;
      disX = parseInt(ev.clientX) - startX;
      disY = parseInt(ev.clientY) - startY;

      // reset startX, startY
      startX = startY = null;

      if (horizontal) {
        var indexMoved = - disX * items / vw;
        indexMoved = (disX > 0) ? Math.floor(indexMoved) : Math.ceil(indexMoved);
        index += indexMoved;
      } else {
        var moved = - (translateInit + disY);
        if (moved <= 0) {
          index = indexMin;
        } else if (moved >= slideOffsetTops[slideOffsetTops.length - 1]) {
          index = indexMax;
        } else {
          var i = 0;
          do {
            i++;
            index = (disY < 0) ? i + 1 : i;
          } while (i < slideCountNew && moved >= slideOffsetTops[i + 1]);
        }
      }
      
      if (e.type.indexOf('touch') === 0) {
        events.emit('touchEnd', info(e));
      } else {
        events.emit('dragEnd', info(e));
      }

      render();
    }

    // drag vs click?
    if (isDragEvent) { 
      // reset isDragEvent
      isDragEvent = false;

      // prevent "click"
      var target = getTarget(e);
      if (isLinkElement(target)) {
        addEvents(target, {'click': function preventClick(e) {
          preventDefaultBehavior(e);
          removeEvents(target, {'click': preventClick});
        }}); 
      }
    } 
  }

  // === RESIZE FUNCTIONS === //
  function updateFixedWidthEdgePadding() {
    innerWrapper.style.cssText += 'margin: 0px ' + (outerWrapper.clientWidth%fixedWidth + gutter) / 2 + 'px';
  }

  // (slideOffsetTops, index, items) => vertical_conentWrapper.height
  function updateContentWrapperHeight() {
    innerWrapper.style.height = slideOffsetTops[index + items] - slideOffsetTops[index] + 'px';
  }

  /*
   * get nav item indexes per items
   * add 1 more if the nav items cann't cover all slides
   * [0, 1, 2, 3, 4] / 3 => [0, 3]
   */
  function getVisibleNavIndex() {
    // reset visibleNavIndexes
    visibleNavIndexes = [];

    var temIndex = (!loop && edgePadding) ? (index - 1) : index;
    var absIndexMin = temIndex%slideCount%items;
    while (absIndexMin < slideCount) {
      if (!loop && absIndexMin + items > slideCount) { absIndexMin = slideCount - items; }
      visibleNavIndexes.push(absIndexMin);
      absIndexMin += items;
    }

    // nav count * items < slide count means
    // some slides can not be displayed only by nav clicking
    if (loop && visibleNavIndexes.length * items < slideCount ||
        !loop && visibleNavIndexes[0] > 0) {
      visibleNavIndexes.unshift(0);
    }
  }
  
  /*
   * 1. update visible nav items list
   * 2. add "hidden" attributes to previous visible nav items
   * 3. remove "hidden" attrubutes to new visible nav items
   */
  function updateNavVisibility() {
    if (nav && !options.navContainer) {
      // update visible nav indexes
      getVisibleNavIndex();

      if (visibleNavIndexes !== visibleNavIndexesCached) {
        // add 'hidden' attribute to previous visible navs
        if (visibleNavIndexesCached.length > 0) {
          visibleNavIndexesCached.forEach(function (ind) {
            setAttrs(navItems[ind], {'hidden': ''});
          });
        }

        // remove 'hidden' attribute from visible navs
        if (visibleNavIndexes.length > 0) {
          visibleNavIndexes.forEach(function (ind) {
            removeAttrs(navItems[ind], 'hidden');
          });
        }

        // cache visible nav indexes
        visibleNavIndexesCached = visibleNavIndexes;
      }
    }
  }

  function info(e) {
    return {
      container: container,
      slideItems: slideItems,
      navContainer: navContainer,
      navItems: navItems,
      controlsContainer: controlsContainer,
      prevButton: prevButton,
      nextButton: nextButton,
      items: items,
      slideBy: slideBy,
      cloneCount: cloneCount,
      slideCount: slideCount,
      slideCountNew: slideCountNew,
      index: index,
      indexCached: indexCached,
      navCurrent: navCurrent,
      navCurrentCached: navCurrentCached,
      visibleNavIndexes: visibleNavIndexes,
      visibleNavIndexesCached: visibleNavIndexesCached,
      event: e || {},
    };
  }

  return {
    getInfo: info,
    events: events,
    goTo: goTo,

    destroy: function () {
      // sheet
      sheet.disabled = true;

      // outerWrapper
      containerParent.insertBefore(container, outerWrapper);
      outerWrapper.remove();
      outerWrapper = innerWrapper = null;

      // container
      container.id = containerIdCached || '';
      container.className = containerClassCached || '';
      removeAttrs(container, ['style']);

      // cloned items
      if (loop) {
        for (var j = cloneCount; j--;) {
          slideItems[0].remove();
          slideItems[slideItems.length - 1].remove();
        }
      }

      // Slide Items
      for (var i = slideCount; i--;) {
        slideItems[i].id = slideItemIdCached || '';
        slideItems[i].className = slideItemClassCached || '';
      }
      removeAttrs(slideItems, ['style', 'aria-hidden', 'tabindex']);
      slideId = slideCount = null;

      // controls
      if (controls) {
        if (options.controlsContainer) {
          removeAttrs(controlsContainer, ['aria-label', 'tabindex']);
          removeAttrs(controlsContainer.children, ['aria-controls', 'tabindex']);
          removeEventsByClone(controlsContainer);
        } else {
          controlsContainer = prevButton = nextButton = null;
        }
      }

      // nav
      if (nav) {
        if (options.navContainer) {
          removeAttrs(navContainer, ['aria-label']);
          removeAttrs(navItems, ['aria-selected', 'aria-controls', 'tabindex']);
          removeEventsByClone(navContainer);
        } else {
          navContainer = null;
        }
        navItems = null;
      }

      // auto
      if (autoplay) {
        if (options.navContainer) {
          removeEventsByClone(autoplayButton);
        } else {
          navContainer = null;
        }
        removeEvents(document, {'visibilitychange': onVisibilityChange});
      }

      // remove slider container events at the end
      // because this will make container = null
      removeEventsByClone(container);

      // remove arrowKeys eventlistener
      if (arrowKeys) {
        removeEvents(document, {'keydown': onDocumentKeydown});
      }

      // remove window event listeners
      removeEvents(window, {'resize': onResize});
    },

    // $ Private methods, for test only
    // hasAttr: hasAttr, 
    // getAttr: getAttr, 
    // setAttrs: setAttrs, 
    // removeAttrs: removeAttrs, 
    // removeEventsByClone: removeEventsByClone, 
    // getSlideId: getSlideId, 
    // toDegree: toDegree, 
    // getTouchDirection: getTouchDirection, 
    // hideElement: hideElement, 
    // showElement: showElement,
  };
};

return tns;
})();