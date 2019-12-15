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


// *** gn *** //
var gn = (function (g) {

  // return gn
  return g;
})(window.gn || {});

// extend
// @require "/src/gn/gn.js"

gn.extend = function () {
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
};

// isInViewport
// @require "/src/gn/gn.js"

gn.isInViewport = function ( elem ) {
  var rect = elem.getBoundingClientRect();
  return (
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// indexOf
// @require "/src/gn/gn.js"

gn.indexOf = function (array, item) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === item) { return i; }
  }
  return -1;
};

// get supported property
// @require "/src/gn/gn.js"

gn.getSupportedProp = function (proparray){
  var root = document.documentElement;
  for (var i=0; i<proparray.length; i++){
    if (proparray[i] in root.style){
      return proparray[i];
    }
  }
};

// var getTD = gn.getSupportedProp(['transitionDuration', 'WebkitTransitionDuration', 'MozTransitionDuration', 'OTransitionDuration']),
// getTransform = gn.getSupportedProp(['transform', 'WebkitTransform', 'MozTransform', 'OTransform']);

// DOM ready
// @require "/src/gn/gn.js"

gn.ready = function ( fn ) {

  // Sanity check
  if ( typeof fn !== 'function' ) { return; }

  // If document is already loaded, run method
  if ( document.readyState === 'complete'  ) {
    return fn();
  }

  // Otherwise, wait until document is loaded
  document.addEventListener( 'DOMContentLoaded', fn, false );
};

// isNodeList
// @require "/src/gn/gn.js"

gn.isNodeList = function (el) {
  // Only NodeList has the "item()" function
  return typeof el.item !== 'undefined'; 
};


// append
// @require "/src/gn/gn.js"
// @require "/src/gn/isNodeList.js"

gn.append = function(els, data) {
  var els_new = (gn.isNodeList(els)) ? els : [els], i;

  if (typeof data.nodeType !== "undefined" && data.nodeType === 1) {
    for (i = els_new.length; i--;) {
      els_new[i].appendChild(data);
    }
  } else if (typeof data === "string") {
    for (i = els_new.length; i--;) {
      els_new[i].insertAdjacentHTML('beforeend', data);
    }
  } else if (gn.isNodeList(data)) {
    var fragment = document.createDocumentFragment();
    for (i = data.length; i--;) {
      fragment.insertBefore(data[i], fragment.firstChild);
    }
    for (var j = els_new.length; j--;) {
      els_new[j].appendChild(fragment);
    }
  }
};



// wrap
// @require "/src/gn/gn.js"
// @require "/src/gn/isNodeList.js"

gn.wrap = function (els, obj) {
    var elsNew = (gn.isNodeList(els)) ? els : [els];
  // Loops backwards to prevent having to clone the wrapper on the
  // first element (see `wrapper` below).
  for (var i = elsNew.length; i--;) {
      var wrapper = (i > 0) ? obj.cloneNode(true) : obj,
          el = elsNew[i];

      // Cache the current parent and sibling.
      var parent = el.parentNode,
          sibling = el.nextSibling;

      // Wrap the element (is automatically removed from its current parent).
      wrapper.appendChild(el);

      // If the element had a sibling, insert the wrapper before
      // the sibling to maintain the HTML structure; otherwise, just
      // append it to the parent.
      if (sibling) {
          parent.insertBefore(wrapper, sibling);
      } else {
          parent.appendChild(wrapper);
      }
  }
};



// unwrap
// @require "/src/gn/gn.js"
// @require "/src/gn/isNodeList.js"

gn.unwrap = function (els) {
  var elsNew = (gn.isNodeList(els)) ? els : [els];
  for (var i = elsNew.length; i--;) {
    var el = elsNew[i];

    // get the element's parent node
    var parent = el.parentNode;
    
    // move all children out of the element
    while (el.firstChild) { 
      parent.insertBefore(el.firstChild, el); 
    }
    
    // remove the empty element
    parent.removeChild(el);
  }
};

// Adapted from https://gist.github.com/paulirish/1579671 which derived from 
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller.
// Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen Slavič, Darius Bacon

// MIT license

if (!Date.now)
    Date.now = function() { return new Date().getTime(); };

(function() {
    'use strict';
    
    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                   || window[vp+'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() { callback(lastTime = nextTime); },
                              nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());



// @codekit-prepend "../bower_components/domtokenlist/src/token-list.js";

// @codekit-prepend "../bower_components/go-native/src/utilities/childNode.remove.js";
// @codekit-prepend "../bower_components/go-native/src/gn/base.js";
// @codekit-prepend "../bower_components/go-native/src/gn/extend.js";
// @codekit-prepend "../bower_components/go-native/src/gn/isInViewport.js";
// @codekit-prepend "../bower_components/go-native/src/gn/indexOf.js";
// @codekit-prepend "../bower_components/go-native/src/gn/getSupportedProp.js";
// @codekit-prepend "../bower_components/go-native/src/gn/DOM.ready.js";

// @codekit-prepend "../bower_components/go-native/src/gn/isNodeList.js";
// @codekit-prepend "../bower_components/go-native/src/gn/append.js";
// @codekit-prepend "../bower_components/go-native/src/gn/wrap.js";
// @codekit-prepend "../bower_components/go-native/src/gn/unwrap.js";

// @codekit-prepend "../bower_components/requestAnimationFrame/requestAnimationFrame.js";


/**
  * tiny-slider
  * @version 0.3.3
  * @author William Lin
  * @license The MIT License (MIT)
  * @github https://github.com/ganlanyuan/tiny-slider/
  */

var tinySlider = (function () {
  'use strict';

  // get supported property, KEYs
  var TRANSITIONDURATION = gn.getSupportedProp([
        'transitionDuration', 
        'WebkitTransitionDuration', 
        'MozTransitionDuration', 
        'OTransitionDuration'
      ]),
      TRANSFORM = gn.getSupportedProp([
        'transform', 
        'WebkitTransform', 
        'MozTransform', 
        'OTransform'
      ]),
      KEY = {
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

  function core (options) {
    options = gn.extend({
      container: document.querySelector('.slider'),
      items: 1,
      fixedWidth: false,
      maxContainerWidth: false,
      slideByPage: false,
      controls: true,
      controlsText: ['prev', 'next'],
      controlsContainer: false,
      nav: true,
      navContainer: false,
      arrowKeys: false,
      speed: 250,
      autoplay: false,
      autoplayTimeout: 5000,
      autoplayDirection: 'forward',
      autoplayText: ['start', 'stop'],
      loop: true,
      autoHeight: false,
      responsive: false,
      lazyload: false,
      touch: true,
    }, options || {});

    // === define and set variables ===
    var sliderContainer = options.container,
        sliderWrapper = document.createElement('div'),
        sliderItems = sliderContainer.children,
        sliderCount = sliderItems.length,
        sliderCountUpdated = sliderItems.length,
        fixedWidth = options.fixedWidth,
        controls = options.controls,
        controlsText = options.controlsText,
        controlsContainer = (!options.controlsContainer) ? false : options.controlsContainer,
        nav = options.nav,
        navContainer = (!options.navContainer) ? false : options.navContainer,
        arrowKeys = options.arrowKeys,
        speed = (!TRANSITIONDURATION) ? 0 : options.speed,
        autoplay = options.autoplay,
        autoplayTimeout = options.autoplayTimeout,
        autoplayDirection = (options.autoplayDirection === 'forward') ? 1 : -1,
        autoplayText = options.autoplayText,
        loop = (fixedWidth && !options.maxContainerWidth) ? false : options.loop,
        autoHeight = options.autoHeight,
        slideByPage = options.slideByPage,
        lazyload = options.lazyload,
        touch = options.touch,

        sliderId,
        slideWidth,
        itemsMax,
        items,
        prevButton,
        nextButton,
        allNavs,
        navCount,
        navCountVisible,
        navClicked = -1,
        index = 0,
        running = false,
        resizeTimer,
        ticking = false;

    if (autoplay) {
      var autoplayTimer,
          actionButton,
          animating = false;
    }

    if (touch) {
      var startX = 0,
          startY = 0,
          translateX = 0,
          distX = 0,
          distY = 0,
          run = false;
    }

    // get items, itemsMax, slideWidth, navCountVisible
    var responsive = (fixedWidth) ? false : options.responsive,
        bpKeys = (typeof responsive !== 'object') ? false : Object.keys(responsive),
        bpVals = getMapValues(responsive);

    var getItems = (function () {
      if (!fixedWidth) {
        return function () {
          var itemsTem;
          var ww = document.documentElement.clientWidth;

          if (bpKeys.length !== undefined && bpVals !== undefined && bpKeys.length === bpVals.length) {
            if (ww < bpKeys[0]) {
              itemsTem = options.items;
            } else if (ww >= bpKeys[bpKeys.length - 1]) {
              itemsTem = bpVals[bpVals.length - 1];
            } else {
              for (var i = 0; i < bpKeys.length - 1; i++) {
                if (ww >= bpKeys[i] && ww <= bpKeys[i+1]) {
                  itemsTem = bpVals[i];
                }
              }
            }
          } else {
            itemsTem = options.items;
          }

          return Math.max(Math.min(sliderCount, itemsTem), 1);
        };
      } else {
        return function () {
          return Math.max(Math.min(sliderCount, Math.floor(sliderContainer.parentNode.offsetWidth / fixedWidth)), 1);
        };
      }
    })();

    var getItemsMax = function () {
      var itemsMaxTem;

      if (!fixedWidth) {
        itemsMaxTem = (bpVals.length !== undefined) ? Math.max.apply(Math, bpVals) : options.items;
      } else {
        if (options.maxContainerWidth) {
          itemsMaxTem = Math.ceil(options.maxContainerWidth / fixedWidth);
        } else {
          itemsMaxTem = false;
        }
      }

      if (itemsMaxTem) {
        return Math.min(sliderCount, itemsMaxTem);
      } else {
        return itemsMaxTem;
      }
    };

    var getSlideWidth = (function () {
      if (fixedWidth) {
        return function () { return fixedWidth; };
      } else {
        return function () { return sliderContainer.parentNode.offsetWidth / items; };
      }
    })();

    var getNavCount = (function () {
      if (options.navContainer) {
        return function () { return sliderCount; };
      } else {
        return function () { return Math.ceil(sliderCount / items); };
      }
    })();

    items = getItems();
    itemsMax = getItemsMax();
    slideWidth = getSlideWidth();
    navCountVisible = getNavCount();

    // update layout:
    // update slide container width, margin-left
    // update slides' width
    function updateLayout() {
      sliderContainer.style.width = slideWidth * sliderCountUpdated + 'px';
      if (loop) {
        sliderContainer.style.marginLeft = - (itemsMax * slideWidth) + 'px';
      }
      for (var b = sliderCountUpdated; b--;) {
        sliderItems[b].style.width = slideWidth + 'px';
      }
    }

    // update container height
    // 1. get the max-height of the visible slides
    // 2. set transitionDuration to speed
    // 3. update container height to max-height
    // 4. set transitionDuration to 0s after transition is done
    function updateContainerHeight() {
      var current = (loop) ? index + itemsMax : index, 
          heights = [],
          maxHeight;

      for (var i = sliderCountUpdated; i--;) {
        if (i >= current && i < current + items) {
          heights.push(sliderItems[i].offsetHeight);
        }
      }

      maxHeight = Math.max.apply(null, heights);
      if (TRANSITIONDURATION) { sliderContainer.style[TRANSITIONDURATION] = speed / 1000 + 's'; }
      sliderContainer.style.height = maxHeight + 'px';
      running = true;
      
      setTimeout(function () {
        if (TRANSITIONDURATION) { sliderContainer.style[TRANSITIONDURATION] = '0s'; }
        running = false;
      }, speed);
    }

    // set transition duration
    function setTransitionDuration(indexGap) {
      if (!TRANSITIONDURATION) { return; }
      sliderContainer.style[TRANSITIONDURATION] = (speed * indexGap / 1000) + 's';
      running = true;
    }

    // set snapInterval (for IE10)
    function setSnapInterval() {
      if (!navigator.msMaxTouchPoints) { return; }
      sliderContainer.parentNode.style.msScrollSnapPointsX = 'snapInterval(0%, ' + slideWidth + ')';
    }

    // update slide
    // set aria-hidden
    function updateSlide() {
      var current = (loop) ? index + itemsMax : index;

      for (var i = sliderCountUpdated; i--;) {
        var slideTem = sliderItems[i];

        if (i >= current && i < current + items) {
          if (!slideTem.hasAttribute('aria-hidden') || slideTem.getAttribute('aria-hidden') === 'true') {
            slideTem.setAttribute('aria-hidden', 'false');
          }
        } else {
          if (!slideTem.hasAttribute('aria-hidden') || slideTem.getAttribute('aria-hidden') === 'false') {
            slideTem.setAttribute('aria-hidden', 'true');
          }
        }
      }
    }

    // non-loop:
    // set 'disabled' to true to controls when reach the edge
    function disableControls() {
      if (loop) { return; }

      if (sliderCount > items) {
        if (index === 0) {
          prevButton.disabled = true;
          changeFocus(prevButton, nextButton);
        } else {
          prevButton.disabled = false;
        }

        if (index === sliderCount - items) {
          nextButton.disabled = true;
          changeFocus(nextButton, prevButton);
        } else {
          nextButton.disabled = false;
        }
      } else {
        if (index !== 0) {
          index = 0;
          translate();
        }

        prevButton.disabled = true;
        nextButton.disabled = true;
        prevButton.setAttribute('tabindex', '-1');
        nextButton.setAttribute('tabindex', '-1');
        if (prevButton === document.activeElement) { prevButton.blur(); }
        if (nextButton === document.activeElement) { nextButton.blur(); }
      }
    }

    // show or hide nav.
    // doesn't work on customized nav.
    function diaplayNav() {
      if (!nav || options.navContainer) { return; }

      for (var i = navCount; i--;) {
        var navTem = allNavs[i];

        if (i < navCountVisible) {
          if (navTem.hasAttribute('hidden')) {
            navTem.removeAttribute('hidden');
          }
        } else {
          if (!navTem.hasAttribute('hidden')) {
            navTem.setAttribute('hidden', '');
          }
        }
      }
    }

    // set tabindex & aria-selected on Nav
    function activeNav() {
      if (!nav) { return; }

      var navCurrent;

      if (navClicked === -1) {
        var absoluteIndex = (index < 0) ? index + sliderCount : (index >= sliderCount) ? index - sliderCount : index;
        navCurrent = (options.navContainer) ? absoluteIndex : Math.floor(absoluteIndex / items);

        // non-loop & reach the edge
        if (!loop && !options.navContainer) {
          var re=/^-?[0-9]+$/, integer = re.test(sliderCount / items);
          if(!integer && index === sliderCount - items) {
            navCurrent += 1;
          }
        }
      } else {
        navCurrent = navClicked;
        navClicked = -1;
      }

      for (var i = navCountVisible; i--;) {
        var navTem = allNavs[i];

        if (i === navCurrent) {
          if (navTem.getAttribute('aria-selected') === 'false') {
            navTem.setAttribute('tabindex', '0');
            navTem.setAttribute('aria-selected', 'true');
          }
        } else {
          if (navTem.getAttribute('aria-selected') === 'true') {
            navTem.setAttribute('tabindex', '-1');
            navTem.setAttribute('aria-selected', 'false');
          }
        }
      }
    }

    // make transfer after click/drag:
    // 1. change 'transform' property for mordern browsers
    // 2. change 'left' property for legacy browsers
    function translate() {
      var vw = sliderContainer.parentNode.offsetWidth;

      translateX = - slideWidth * index;
      if (fixedWidth && !loop) {
        translateX = Math.max( translateX, - Math.abs(sliderCount * slideWidth - vw) );
      }

      if (TRANSFORM) {
        sliderContainer.style[TRANSFORM] = 'translate3d(' + translateX + 'px, 0, 0)';
      } else {
        sliderContainer.style.left = translateX + 'px';
      }
    }

    // render
    function render() {
      updateLayout();
      setSnapInterval();
      translate();
      diaplayNav();
      activeNav();
      updateSlide();
      disableControls();
      if (autoHeight) { updateContainerHeight(); }
      if (lazyload) { lazyLoad(); }
    }

    // check index after click/drag:
    // if viewport reach the left/right edge of slide container or
    // there is not enough room for next transfer,
    // transfer slide container to a new location without animation
    function checkIndex() {
      if (!loop) { return; }

      var reachLeftEdge = (slideByPage) ? index < (items - itemsMax) : index <= - itemsMax,
          reachRightEdge = (slideByPage) ? index > (sliderCount + itemsMax - items * 2 - 1) : index >= (sliderCount + itemsMax - items);

      // fix fixed-width
      if (fixedWidth && itemsMax && !slideByPage) {
        reachRightEdge = index >= (sliderCount + itemsMax - items - 1);
      }

      if (reachLeftEdge) { index += sliderCount; }
      if (reachRightEdge) { index -= sliderCount; }

      if (TRANSITIONDURATION) { sliderContainer.style[TRANSITIONDURATION] = '0s'; }
      translate();
    }

    // Things need to be done after a transfer:
    // 1. check index
    // 2. add classes to visible slide
    // 3. disable controls buttons when reach the first/last slide in non-loop slider
    // 4. update nav status
    // 5. lazyload images
    // 6. update container height
    function update(indexGap) {
      sliderContainer.setAttribute('aria-busy', 'true');
      setTransitionDuration(indexGap);
      translate();

      setTimeout(function () {
        checkIndex();
        updateSlide();
        disableControls();
        activeNav();
        lazyLoad();
        if (autoHeight) { updateContainerHeight(); }

        running = false;
        sliderContainer.setAttribute('aria-busy', 'false');
      }, speed * indexGap);
    }

    // on controls click
    function onClickControl(dir) {
      if (!running) {
        dir = (slideByPage) ? dir * items : dir;
        var indexGap = Math.abs(dir);

        index = (loop) ? (index + dir) : Math.max(0, Math.min((index + dir), sliderCount - items));

        update(indexGap);
      }
    }

    function onClickControlPrev() {
      onClickControl(-1);
    }

    function onClickControlNext() {
      onClickControl(1);
    }

    // on doc click
    function onClickNav(e) {
      if (!running) {
        var clickTarget = e.target || e.srcElement,
            navIndex;

        while (gn.indexOf(allNavs, clickTarget) === -1) {
          clickTarget = clickTarget.parentNode;
        }

        navClicked = navIndex = Number(clickTarget.getAttribute('data-slide'));

        var indexTem, indexGap;
        indexTem = (options.navContainer) ? navIndex : navIndex * items;
        indexTem = (loop) ? indexTem : Math.min(indexTem, sliderCount - items);
        indexGap = Math.abs(indexTem - index);
        index = indexTem;

        update(indexGap);
      }
    }

    function startAction() {
      autoplayTimer = setInterval(function () {
        onClickControl(autoplayDirection);
      }, autoplayTimeout);
      actionButton.setAttribute('data-action', 'stop');
      actionButton.innerHTML = '<span hidden>Stop Animation</span>' + autoplayText[1];

      animating = true;
    }

    function stopAction() {
      clearInterval(autoplayTimer);
      actionButton.setAttribute('data-action', 'start');
      actionButton.innerHTML = '<span hidden>Stop Animation</span>' + autoplayText[0];

      animating = false;
    }

    function toggleAnimation() {
      if (animating) {
        stopAction();
      } else {
        startAction();
      }
    }

    function stopAnimation() {
      if (animating) { stopAction(); }
    }

    // 
    function onKeyDocument(e) {
      e = e || window.event;
      if (e.keyCode === KEY.LEFT) {
        onClickControl(-1);
      } else if (e.keyCode === KEY.RIGHT) {
        onClickControl(1);
      }
    }

    // change focus
    function changeFocus(blur, focus) {
      if (typeof blur === 'object' && typeof focus === 'object') {
        if (blur === document.activeElement) {
          blur.blur();
          focus.focus();
        }
      }
    }

    // on key control
    function onKeyControl(e) {
      e = e || window.event;
      var code = e.keyCode,
          curElement = document.activeElement;

      if (code === KEY.LEFT || code === KEY.UP || code === KEY.HOME || code === KEY.PAGEUP) {
        if (curElement !== prevButton && prevButton.disabled !== true) {
          changeFocus(curElement, prevButton);
        }
      }
      if (code === KEY.RIGHT || code === KEY.DOWN || code === KEY.END || code === KEY.PAGEDOWN) {
        if (curElement !== nextButton && nextButton.disabled !== true) {
          changeFocus(curElement, nextButton);
        }
      }
      if (code === KEY.ENTER || code === KEY.SPACE) {
        if (curElement === nextButton) {
          onClickControlNext();
        } else {
          onClickControlPrev();
        }
      }
    }

    // on key nav
    function onKeyNav(e) {
      e = e || window.event;
      var code = e.keyCode,
          curElement = document.activeElement;

      if (code === KEY.LEFT || code === KEY.PAGEUP) {
        if (curElement.getAttribute('data-slide') > 0) {
          changeFocus(curElement, curElement.previousElementSibling);
        }
      }
      if (code === KEY.UP || code === KEY.HOME) {
        if (curElement.getAttribute('data-slide') !== 0) {
          changeFocus(curElement, allNavs[0]);
        }
      }
      if (code === KEY.RIGHT || code === KEY.PAGEDOWN) {
        if (curElement.getAttribute('data-slide') < navCountVisible - 1) {
          changeFocus(curElement, curElement.nextElementSibling);
        }
      }
      if (code === KEY.DOWN || code === KEY.END) {
        if (curElement.getAttribute('data-slide') < navCountVisible - 1) {
          changeFocus(curElement, allNavs[navCountVisible - 1]);
        }
      }
      if (code === KEY.ENTER || code === KEY.SPACE) {
        onClickNav(e);
      }
    }

    // lazyload
    function lazyLoad() {
      if (!gn.isInViewport(sliderContainer)) { return; }

      var imgs = sliderContainer.querySelectorAll('[aria-hidden="false"] .tiny-lazy');
      if (imgs.length === 0) { return; }
      for (var i = 0, len = imgs.length; i < len; i++) {
        if (!imgs[i].classList.contains('loaded')) {
          imgs[i].src = imgs[i].getAttribute('data-src');
          imgs[i].classList.add('loaded');
        }
      }
    }

    // IE10 scroll function
    function ie10Scroll() {
      sliderContainer.style[TRANSITIONDURATION] = '0s';
      sliderContainer.style.transform = 'translate3d(-' + - sliderContainer.scrollLeft() + 'px,0,0)';
    }

    function onPanStart(e) {
      var touchObj = e.changedTouches[0];
      startX = parseInt(touchObj.clientX);
      startY = parseInt(touchObj.clientY);
    }

    function onPanMove(e) {
      var touchObj = e.changedTouches[0];
      distX = parseInt(touchObj.clientX) - startX;
      distY = parseInt(touchObj.clientY) - startY;

      var rotate = toDegree(Math.atan2(distY, distX)),
          panDir = getPanDir(rotate, 15);

      if (panDir === 'horizontal' && running === false) { run = true; }
      if (run) {
        if (TRANSITIONDURATION) { sliderContainer.style[TRANSITIONDURATION] = '0s'; }

        var min = (!loop) ? - (sliderCount - items) * slideWidth : - (sliderCount + itemsMax - items) * slideWidth,
            max = (!loop) ? 0 : itemsMax * slideWidth;

        if (!loop && fixedWidth) { min = - (sliderCount * slideWidth - sliderContainer.parentNode.offsetWidth); }

        translateX = - index * slideWidth + distX;
        translateX = Math.max(min, Math.min( translateX, max));

        if (TRANSFORM) {
          sliderContainer.style[TRANSFORM] = 'translate3d(' + translateX + 'px, 0, 0)';
        } else {
          sliderContainer.style.left = translateX + 'px';
        }

        e.preventDefault();
      }
    }

    function onPanEnd(e) {
      var touchObj = e.changedTouches[0];
      distX = parseInt(touchObj.clientX) - startX;

      if (run && distX !== 0) {
        e.preventDefault();
        run = false;
        translateX = - index * slideWidth + distX;

        var indexTem,
            min = (!loop) ? 0 : -itemsMax,
            max = (!loop) ? sliderCount - items : sliderCount + itemsMax - items;

        indexTem = - (translateX / slideWidth);
        indexTem = (distX < 0) ? Math.ceil(indexTem) : Math.floor(indexTem);
        indexTem = Math.max(min, Math.min(indexTem, max));
        index = indexTem;

        update(1);
      }
    }

    function onResize() {
      clearTimeout(resizeTimer);

      // update after resize done
      resizeTimer = setTimeout(function () {
        items = getItems();
        slideWidth = getSlideWidth();
        navCountVisible = getNavCount();

        render();
      }, 100);
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          if (lazyload) { lazyLoad(); }
          ticking = false;
        });
      }
      ticking = true;
    }
    
    return {
      // initialize:
      // 1. add .tiny-content to container
      // 2. wrap container with .tiny-slider
      // 3. add nav and controls if needed, set allNavs, prevButton, nextButton
      // 4. clone items for loop if needed, update childrenCount
      init: function () {
        sliderContainer.classList.add('tiny-content');

        // add slider id
        if (sliderContainer.id.length === 0) {
          sliderContainer.id = sliderId = getSliderId();
        } else {
          sliderId = sliderContainer.id;
        }

        // wrap slider with ".tiny-slider"
        sliderWrapper.className = 'tiny-slider';
        gn.wrap(sliderContainer, sliderWrapper);

        // for IE10
        if (navigator.msMaxTouchPoints) {
          sliderWrapper.classList.add('ms-touch');
          sliderWrapper.addEventListener('scroll', ie10Scroll, false);
        }

        // add slide id
        for (var x = 0; x < sliderCount; x++) {
          sliderItems[x].id = sliderId + 'item' + x;
        }

        // clone items
        if (loop) {
          var fragmentBefore = document.createDocumentFragment(), 
              fragmentAfter = document.createDocumentFragment(); 

          for (var j = itemsMax; j--;) {
            var cloneFirst = sliderItems[j].cloneNode(true),
                cloneLast = sliderItems[sliderCount - 1 - j].cloneNode(true);

            // remove id from cloned slides
            cloneFirst.id = '';
            cloneLast.id = '';

            fragmentBefore.insertBefore(cloneFirst, fragmentBefore.firstChild);
            fragmentAfter.appendChild(cloneLast);
          }

          sliderContainer.appendChild(fragmentBefore);
          sliderContainer.insertBefore(fragmentAfter, sliderContainer.firstChild);

          sliderCountUpdated = sliderContainer.children.length;
          sliderItems = sliderContainer.children;
        }

        // add nav
        if (nav) {
          if (!options.navContainer) {
            var navHtml = '';
            for (var i = 0; i < sliderCount; i++) {
              navHtml += '<button data-slide="' + i +'" tabindex="-1" aria-selected="false" aria-controls="' + sliderId + 'item' + i +'" type="button"></button>';
            }

            if (autoplay) {
              navHtml += '<button data-action="stop" type="button"><span hidden>Stop Animation</span>' + autoplayText[0] + '</button>';
            }

            navHtml = '<div class="tiny-nav" aria-label="Carousel Pagination">' + navHtml + '</div>';
            gn.append(sliderWrapper, navHtml);

            navContainer = sliderWrapper.querySelector('.tiny-nav');
          }

          allNavs = navContainer.querySelectorAll('[data-slide]');
          navCount = allNavs.length;

          if (!navContainer.hasAttribute('aria-label')) {
            navContainer.setAttribute('aria-label', "Carousel Pagination");
            for (var y = 0; y < navCount; y++) {
              var navTem = allNavs[y];
              navTem.setAttribute('tabindex', '-1');
              navTem.setAttribute('aria-selected', 'false');
              navTem.setAttribute('aria-controls', sliderId + 'item' + y);
            }
          }
        }

        // add controls
        if (controls) {
          if (!options.controlsContainer) {
            gn.append(sliderWrapper, '<div class="tiny-controls" aria-label="Carousel Navigation"><button data-controls="prev" tabindex="-1" aria-controls="' + sliderId +'" type="button">' + controlsText[0] + '</button><button data-controls="next" tabindex="0" aria-controls="' + sliderId +'" type="button">' + controlsText[1] + '</button></div>');

            controlsContainer = sliderWrapper.querySelector('.tiny-controls');
          }

          prevButton = controlsContainer.querySelector('[data-controls="prev"]');
          nextButton = controlsContainer.querySelector('[data-controls="next"]');

          if (!controlsContainer.hasAttribute('tabindex')) {
            controlsContainer.setAttribute('aria-label', 'Carousel Navigation');
            prevButton.setAttribute('aria-controls', sliderId);
            nextButton.setAttribute('aria-controls', sliderId);
            prevButton.setAttribute('tabindex', '-1');
            nextButton.setAttribute('tabindex', '0');
          }
        }

        // add auto
        if (autoplay) {
          if (!navContainer) {
            gn.append(sliderWrapper, '<div class="tiny-nav" aria-label="Carousel Pagination"><button data-action="stop" type="button"><span hidden>Stop Animation</span>' + autoplayText[0] + '</button></div>');
            navContainer = sliderWrapper.querySelector('.tiny-nav');
          }
          actionButton = navContainer.querySelector('[data-action]');
        }

        render();

        // add sliderContainer eventListeners
        if (touch) {
          sliderContainer.addEventListener('touchstart', onPanStart, false);
          sliderContainer.addEventListener('touchmove', onPanMove, false);
          sliderContainer.addEventListener('touchend', onPanEnd, false);
          sliderContainer.addEventListener('touchcancel', onPanEnd, false);
        }

        if (controls) {
          disableControls();
          prevButton.addEventListener('click', onClickControlPrev, false);
          nextButton.addEventListener('click', onClickControlNext, false);
          prevButton.addEventListener('keydown', onKeyControl, false);
          nextButton.addEventListener('keydown', onKeyControl, false);
        }
        
        if (nav) {
          for (var a = allNavs.length; a--;) {
            allNavs[a].addEventListener('click', onClickNav, false);
            allNavs[a].addEventListener('keydown', onKeyNav, false);
          }
        }

        if (autoplay) {
          startAction();
          actionButton.addEventListener('click', toggleAnimation, false);

          if (controls) {
            prevButton.addEventListener('click', stopAnimation, false );
            nextButton.addEventListener('click', stopAnimation, false );
          }

          if (nav) {
            for (var b = 0; b < navCount; b++) {
              allNavs[b].addEventListener('click', stopAnimation, false);
            }
          }
        }

        if (arrowKeys) {
          document.addEventListener('keydown', onKeyDocument, false);
        }

        // on window resize && scroll
        window.addEventListener('resize', onResize, false);
        window.addEventListener('scroll', onScroll, false);
      },

      // destory
      destory: function () {
        sliderContainer.classList.remove('tiny-content');
        sliderContainer.style.width = '';
        sliderContainer.style[TRANSITIONDURATION] = '';
        sliderContainer.style.transform = '';
        sliderContainer.style.marginLeft = '';
        sliderContainer.style.left = '';

        // remove sliderWrapper
        gn.unwrap(sliderWrapper);
        // sliderWrapper = null;

        // remove clone items
        if (loop) {
          for (var j = itemsMax; j--;) {
            sliderItems[0].remove();
            sliderItems[sliderItems.length - 1].remove();
          }
        }

        // remove ids
        if (sliderId !== undefined) {
          sliderId = null;
          sliderContainer.removeAttribute('id');

          for (var x = sliderCount; x--;) {
            sliderItems[x].removeAttribute('id');
            sliderItems[x].removeAttribute('aria-hidden');
            sliderItems[x].style.width = '';
          }
        }

        // remove sliderContainer event listener
        if (touch) {
          sliderContainer.removeEventListener('touchstart', onPanStart, false);
          sliderContainer.removeEventListener('touchmove', onPanMove, false);
          sliderContainer.removeEventListener('touchend', onPanEnd, false);
          sliderContainer.removeEventListener('touchcancel', onPanEnd, false);
        }

        // remove controls
        if (controls) {
          if (!options.controlsContainer) {
            controlsContainer.remove();
            controlsContainer = null;
            prevButton = null;
            nextButton = null;
          } else {
            controlsContainer.removeAttribute('aria-label');
            prevButton.removeAttribute('aria-controls');
            prevButton.removeAttribute('tabindex');
            prevButton.removeEventListener('click', onClickControlPrev, false);
            prevButton.removeEventListener('keydown', onKeyControl, false);

            nextButton.removeAttribute('aria-controls');
            nextButton.removeAttribute('tabindex');
            nextButton.removeEventListener('click', onClickControlNext, false);
            nextButton.removeEventListener('keydown', onKeyControl, false);
          }
        }

        // remove nav
        if (nav) {
          if (!options.navContainer) {
            navContainer.remove();
            navContainer = null;
          } else {
            navContainer.removeAttribute('aria-label');
            for (var i = allNavs.length; i--;) {
              allNavs[i].removeAttribute('aria-selected');
              allNavs[i].removeAttribute('aria-controls');
              allNavs[i].removeEventListener('click', onClickNav, false);
              allNavs[i].removeEventListener('keydown', onKeyNav, false);
            }
          }
          allNavs = null;
          navCount = null;
        }

        // remove auto
        if (autoplay) {
          if (!options.navContainer && navContainer !== null) {
            navContainer.remove();
            navContainer = null;
          } else {
            actionButton.removeEventListener('click', toggleAnimation, false);
            actionButton = null;

            if (controls && options.controlsContainer) {
              prevButton.removeEventListener('click', stopAnimation, false );
              nextButton.removeEventListener('click', stopAnimation, false );
            }

            if (nav && options.navContainer) {
              for (var b = 0; b < navCount; b++) {
                allNavs[b].removeEventListener('click', stopAnimation, false);
              }
            }
          }
        }

        // remove arrowKeys eventlistener
        if (arrowKeys) {
          document.removeEventListener('keydown', arrowKeys, false);
        }

        // remove window event listeners
        window.removeEventListener('resize', onResize, false);
        window.removeEventListener('scroll', onScroll, false);
      }
    };
  }

  // === Private helper functions === //
  function getSliderId() {
    if (window.tinySliderNumber === undefined) {
      window.tinySliderNumber = 1;
    } else {
      window.tinySliderNumber++;
    }
    return 'tinySlider' + window.tinySliderNumber;
  }

  function toDegree (angle) {
    return angle * (180 / Math.PI);
  }

  function getPanDir(angle, range) {
    if ( Math.abs(90 - Math.abs(angle)) >= (90 - range) ) {
      return 'horizontal';
    } else if ( Math.abs(90 - Math.abs(angle)) <= range ) {
      return 'vertical';
    } else {
      return false;
    }
  }

  function getMapValues (obj) {
    if (typeof(obj) === 'object') {
      var values = [],
          keys = Object.keys(obj);

      for (var i = 0, l = keys.length; i < l; i++) {
        var a = keys[i];
        values.push(obj[a]);
      }

      return values;
    } else {
      return false;
    }
  }

  return core;
})();

// @codekit-prepend "tiny-slider.helper.js";
// @codekit-prepend "tiny-slider.native.js";

