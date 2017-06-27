/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Tocbot
	 * Tocbot creates a toble of contents based on HTML headings on a page,
	 * this allows users to easily jump to different sections of the document.
	 * Tocbot was inspired by tocify (http://gregfranko.com/jquery.tocify.js/).
	 * The main differences are that it works natively without any need for jquery or jquery UI).
	 *
	 * @author Tim Scanlin
	 */
	
	/* globals define */
	
	(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory(root)), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
	    module.exports = factory(root);
		} else {
	    root.tocbot = factory(root);
		}
	})(typeof global !== 'undefined' ? global : this.window || this.global, function(root) {
	
	  'use strict';
	
	  // Require smooth-scroll by default.
	  var smoothScroll = __webpack_require__(/*! smooth-scroll */ 1);
	
	  // Default options.
	  var defaultOptions = __webpack_require__(/*! ./default-options.js */ 2);
	  // Object to store current options.
	  var options = {};
	  // Object for public APIs.
	  var tocbot = {};
	
	  var BuildHtml = __webpack_require__(/*! ./build-html.js */ 3);
	  var ParseContent = __webpack_require__(/*! ./parse-content.js */ 4);
	  // Keep these variables at top scope once options are passed in.
	  var buildHtml;
	  var parseContent;
	
	  var doc = root.document;
	  var body = document.body;
	  var supports = !!root.document.querySelector && !!root.addEventListener; // Feature test
	  var headingsArray;
	
	  // From: https://github.com/Raynos/xtend
	  var hasOwnProperty = Object.prototype.hasOwnProperty;
	  function extend() {
	    var target = {};
	    for (var i = 0; i < arguments.length; i++) {
	      var source = arguments[i];
	      for (var key in source) {
	        if (hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }
	    return target;
	  }
	
	  // From: https://remysharp.com/2010/07/21/throttling-function-calls
	  function throttle(fn, threshhold, scope) {
	    threshhold || (threshhold = 250);
	    var last;
	    var deferTimer;
	    return function() {
	      var context = scope || this;
	      var now = +new Date;
	      var args = arguments;
	      if (last && now < last + threshhold) {
	        // hold on to it
	        clearTimeout(deferTimer);
	        deferTimer = setTimeout(function() {
	          last = now;
	          fn.apply(context, args);
	        }, threshhold);
	      } else {
	        last = now;
	        fn.apply(context, args);
	      }
	    };
	  }
	
	  function updateTocListener(headings) {
	    return function updateToc() {
	      return buildHtml.updateToc(headings);
	    };
	  }
	
	  /**
		 * Destroy tocbot.
		 */
	  tocbot.destroy = function() {
	    // Clear HTML.
	    try {
	      document.querySelector(options.tocSelector).innerHTML = '';
	    } catch (e) {
	      throw new Error('Element not found: ' + options.tocSelector);
	    }
	
			// Remove event listeners.
	    document.removeEventListener('scroll', this._scrollListener, false);
	    document.removeEventListener('resize', this._scrollListener, false);
	    if (buildHtml) {
	      document.removeEventListener('click', this._clickListener, false);
	    }
	
	    // Destroy smoothScroll if it exists.
	    if (smoothScroll) {
	      smoothScroll.destroy();
	    }
	  };
	
	  /**
		 * Initialize tocbot.
		 * @param {object} customOptions
		 */
	  tocbot.init = function(customOptions) {
	    // feature test
	    if (!supports) {
	      return;
	    }
	
	    // Merge defaults with user options.
	    // Set to options variable at the top.
	    options = extend(defaultOptions, customOptions || {});
	    this.options = options;
	    this.state = {};
	
	    // Pass options to these modules.
	    buildHtml = BuildHtml(options);
	    parseContent = ParseContent(options);
	
	    // For testing purposes.
	    this._buildHtml = buildHtml;
	    this._parseContent = parseContent;
	
	    // Destroy it if it exists first.
	    tocbot.destroy();
	
	    // Get headings array
	    headingsArray = parseContent.selectHeadings(options.contentSelector, options.headingSelector);
	
	    // Build nested headings array.
	    var nestedHeadingsObj = parseContent.nestHeadingsArray(headingsArray);
	    var nestedHeadings = nestedHeadingsObj.nest;
	
	    // Render.
	    buildHtml.render(options.tocSelector, nestedHeadings);
	
	    // Update Sidebar and bind listeners.
	    // buildHtml.updateToc(headingsArray);
	    this._scrollListener = throttle(function() {
	      buildHtml.updateToc(headingsArray);
	    }, options.throttleTimeout);
	    this._scrollListener();
	    document.addEventListener('scroll', this._scrollListener, false);
	    document.addEventListener('resize', this._scrollListener, false);
	
	    // Bind click listeners to disable animation.
	    this._clickListener = throttle(function(event) {
	      buildHtml.disableTocAnimation(event); // Save reference so event is created / removed properly.
	      buildHtml.updateToc(headingsArray);
	    }, options.throttleTimeout);
	    document.addEventListener('click', this._clickListener, false);
	
	    // Initialize smoothscroll if it exists.
	    if (smoothScroll) {
	      this.smoothScroll = smoothScroll.init(extend(options.smoothScrollOptions, {
	        callback: buildHtml.enableTocAnimation
	      }));
	    }
	
	    return this;
	  };
	
	  /**
	   * Refresh tocbot.
	   */
	  tocbot.refresh = function(customOptions) {
	    tocbot.destroy();
	    tocbot.init(customOptions || this.options);
	  };
	
	  // Make tocbot available globally.
	  root.tocbot = tocbot;
	
	  return tocbot;
	});
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/*!******************************************************!*\
  !*** ./~/smooth-scroll/dist/js/smooth-scroll.min.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {/*! smooth-scroll v9.1.4 | (c) 2016 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
	!function(e,t){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t(e)), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof exports?module.exports=t(e):e.smoothScroll=t(e)}("undefined"!=typeof global?global:this.window||this.global,function(e){"use strict";var t,n,r,o,a,c={},u="querySelector"in document&&"addEventListener"in e,i={selector:"[data-scroll]",selectorHeader:"[data-scroll-header]",speed:500,easing:"easeInOutCubic",offset:0,updateURL:!0,callback:function(){}},l=function(){var e={},t=!1,n=0,r=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(t=arguments[0],n++);for(var o=function(n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t&&"[object Object]"===Object.prototype.toString.call(n[r])?e[r]=l(!0,e[r],n[r]):e[r]=n[r])};r>n;n++){var a=arguments[n];o(a)}return e},s=function(e){return Math.max(e.scrollHeight,e.offsetHeight,e.clientHeight)},f=function(e,t){var n,r,o=t.charAt(0),a="classList"in document.documentElement;for("["===o&&(t=t.substr(1,t.length-2),n=t.split("="),n.length>1&&(r=!0,n[1]=n[1].replace(/"/g,"").replace(/'/g,"")));e&&e!==document&&1===e.nodeType;e=e.parentNode){if("."===o)if(a){if(e.classList.contains(t.substr(1)))return e}else if(new RegExp("(^|\\s)"+t.substr(1)+"(\\s|$)").test(e.className))return e;if("#"===o&&e.id===t.substr(1))return e;if("["===o&&e.hasAttribute(n[0])){if(!r)return e;if(e.getAttribute(n[0])===n[1])return e}if(e.tagName.toLowerCase()===t)return e}return null};c.escapeCharacters=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),r=n.length,o=-1,a="",c=n.charCodeAt(0);++o<r;){if(t=n.charCodeAt(o),0===t)throw new InvalidCharacterError("Invalid character: the input contains U+0000.");a+=t>=1&&31>=t||127==t||0===o&&t>=48&&57>=t||1===o&&t>=48&&57>=t&&45===c?"\\"+t.toString(16)+" ":t>=128||45===t||95===t||t>=48&&57>=t||t>=65&&90>=t||t>=97&&122>=t?n.charAt(o):"\\"+n.charAt(o)}return"#"+a};var d=function(e,t){var n;return"easeInQuad"===e&&(n=t*t),"easeOutQuad"===e&&(n=t*(2-t)),"easeInOutQuad"===e&&(n=.5>t?2*t*t:-1+(4-2*t)*t),"easeInCubic"===e&&(n=t*t*t),"easeOutCubic"===e&&(n=--t*t*t+1),"easeInOutCubic"===e&&(n=.5>t?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e&&(n=t*t*t*t),"easeOutQuart"===e&&(n=1- --t*t*t*t),"easeInOutQuart"===e&&(n=.5>t?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e&&(n=t*t*t*t*t),"easeOutQuint"===e&&(n=1+--t*t*t*t*t),"easeInOutQuint"===e&&(n=.5>t?16*t*t*t*t*t:1+16*--t*t*t*t*t),n||t},m=function(e,t,n){var r=0;if(e.offsetParent)do r+=e.offsetTop,e=e.offsetParent;while(e);return r=Math.max(r-t-n,0),Math.min(r,p()-h())},h=function(){return Math.max(document.documentElement.clientHeight,window.innerHeight||0)},p=function(){return Math.max(e.document.body.scrollHeight,e.document.documentElement.scrollHeight,e.document.body.offsetHeight,e.document.documentElement.offsetHeight,e.document.body.clientHeight,e.document.documentElement.clientHeight)},g=function(e){return e&&"object"==typeof JSON&&"function"==typeof JSON.parse?JSON.parse(e):{}},b=function(t,n){e.history.pushState&&(n||"true"===n)&&"file:"!==e.location.protocol&&e.history.pushState(null,null,[e.location.protocol,"//",e.location.host,e.location.pathname,e.location.search,t].join(""))},v=function(e){return null===e?0:s(e)+e.offsetTop};c.animateScroll=function(n,c,u){var s=g(c?c.getAttribute("data-options"):null),f=l(t||i,u||{},s),h="[object Number]"===Object.prototype.toString.call(n)?!0:!1,y=h?null:"#"===n?e.document.documentElement:e.document.querySelector(n);if(h||y){var O=e.pageYOffset;r||(r=e.document.querySelector(f.selectorHeader)),o||(o=v(r));var S,I,H=h?n:m(y,o,parseInt(f.offset,10)),E=H-O,j=p(),w=0;h||b(n,f.updateURL);var C=function(t,r,o){var a=e.pageYOffset;(t==r||a==r||e.innerHeight+a>=j)&&(clearInterval(o),h||y.focus(),f.callback(n,c))},L=function(){w+=16,S=w/parseInt(f.speed,10),S=S>1?1:S,I=O+E*d(f.easing,S),e.scrollTo(0,Math.floor(I)),C(I,H,a)},A=function(){clearInterval(a),a=setInterval(L,16)};0===e.pageYOffset&&e.scrollTo(0,0),A()}};var y=function(e){if(0===e.button&&!e.metaKey&&!e.ctrlKey){var n=f(e.target,t.selector);if(n&&"a"===n.tagName.toLowerCase()){e.preventDefault();var r=c.escapeCharacters(n.hash);c.animateScroll(r,n,t)}}},O=function(e){n||(n=setTimeout(function(){n=null,o=v(r)},66))};return c.destroy=function(){t&&(e.document.removeEventListener("click",y,!1),e.removeEventListener("resize",O,!1),t=null,n=null,r=null,o=null,a=null)},c.init=function(n){u&&(c.destroy(),t=l(i,n||{}),r=e.document.querySelector(t.selectorHeader),o=v(r),e.document.addEventListener("click",y,!1),r&&e.addEventListener("resize",O,!1))},c});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/*!***********************************!*\
  !*** ./src/js/default-options.js ***!
  \***********************************/
/***/ function(module, exports) {

	/**
	 * Tocbot default options should all live in this file.
	 *
	 * @author Tim Scanlin
	 */
	
	module.exports = {
	  // Where to render the table of contents.
	  tocSelector: '.js-toc',
	  // Where to grab the headings to build the table of contents.
	  contentSelector: '.js-toc-content',
	  // Which headings to grab inside of the contentSelector element.
	  headingSelector: 'h1, h2, h3',
	
	  // Headings that match the ignoreSelector will be skipped.
	  ignoreSelector: '.js-toc-ignore',
	  // Main class to add to links.
	  linkClass: 'toc-link',
	  // Extra classes to add to links.
	  extraLinkClasses: '',
	  // Class to add to active links,
	  // the link corresponding to the top most heading on the page.
	  activeLinkClass: 'is-active-link',
	  // Main class to add to lists.
	  listClass: 'toc-list',
	  // Extra classes to add to lists.
	  extraListClasses: '',
	  // Class that gets added when a list should be collapsed.
	  isCollapsedClass: 'is-collapsed',
	  // Class that gets added when a list should be able
	  // to be collapsed but isn't necessarily collpased.
	  collapsibleClass: 'is-collapsible',
	  // How many heading levels should not be collpased.
	  // For example, number 6 will show everything since
	  // there are only 6 heading levels and number 0 will collpase them all.
	  // The sections that are hidden will open
	  // and close as you scroll to headings within them.
	  collapseDepth: 0,
	  // smooth-scroll options object, see docs at:
	  // https://github.com/cferdinandi/smooth-scroll
	  smoothScrollOptions: {
	    easing: 'easeInOutCubic',
	    offset: 0,
	    speed: 300, // animation duration.
	    updateURL: true
	  },
	  // Headings offset between the headings and the top of the document.
	  headingsOffset: 0,
	  // Timeout between events firing to make sure it's
	  // not too rapid (for performance reasons).
	  throttleTimeout: 50,
	  // Element to add the positionFixedClass to.
	  positionFixedSelector: null,
	  // Fixed position class to add to make sidebar fixed after scrolling
	  // down past the fixedSidebarOffset.
	  positionFixedClass: 'is-position-fixed',
	  // fixedSidebarOffset can be any number but by default is set
	  // to auto which sets the fixedSidebarOffset to the sidebar
	  // element's offsetTop from the top of the document on init.
	  fixedSidebarOffset: 'auto'
	};


/***/ },
/* 3 */
/*!******************************!*\
  !*** ./src/js/build-html.js ***!
  \******************************/
/***/ function(module, exports) {

	/**
	 * This file is responsible for building the DOM and updating DOM state.
	 *
	 * @author Tim Scanlin
	 */
	
	module.exports = function(options) {
	  var forEach = [].forEach;
	  var some = [].some;
	  var body = document.body;
	  var currentlyHighlighting = true;
	  var SPACE_CHAR = ' ';
	
	  /**
	   * Create link and list elements.
	   * @param {Object} d
	   * @param {HTMLElement} container
	   * @return {HTMLElement}
	   */
	  function createEl(d, container) {
	    var link = container.appendChild(createLink(d));
	    if (d.children.length) {
	      var list = createList(d.isCollapsed);
	      d.children.forEach(function(child) {
	        createEl(child, list);
	      });
	      link.appendChild(list);
	    }
	  }
	
	  /**
	   * Render nested heading array data into a given selector.
	   * @param {String} selector
	   * @param {Array} data
	   * @return {HTMLElement}
	   */
	  function render(selector, data) {
	    var self = this;
	    var collapsed = false;
	    var container = createList(collapsed);
	
	    data.forEach(function(d) {
	      createEl(d, container);
	    });
	
	    var parent = document.querySelector(selector);
	
	    // Remove existing child if it exists.
	    if (parent.firstChild) {
	      parent.removeChild(parent.firstChild);
	    }
	
	    // Append the Elements that have been created;
	    return parent.appendChild(container);
	  }
	
	  /**
	   * Create link element.
	   * @param {Object} data
	   * @return {HTMLElement}
	   */
	  function createLink(data) {
	    var item = document.createElement('li');
	    var a = document.createElement('a');
	    a.textContent = data.textContent;
	    // Property for smooth-scroll.
	    a.setAttribute('data-scroll', '');
	    a.setAttribute('href', '#' + data.id);
	    a.setAttribute('class', options.linkClass
	      + SPACE_CHAR + 'node-name--' + data.nodeName
	      + SPACE_CHAR + options.extraLinkClasses);
	    item.appendChild(a);
	    return item;
	  }
	
	  /**
	   * Create list element.
	   * @param {Boolean} isCollapsed
	   * @return {HTMLElement}
	   */
	  function createList(isCollapsed) {
	    var list = document.createElement('ul');
	    var classes =  options.listClass
	      + SPACE_CHAR + options.extraListClasses;
	    if (isCollapsed) {
	      classes += SPACE_CHAR + options.collapsibleClass;
	      classes += SPACE_CHAR + options.isCollapsedClass;
	    }
	    list.setAttribute('class', classes);
	    return list;
	  }
	
	  /**
	   * Update fixed sidebar class.
	   * @return {HTMLElement}
	   */
	  function updateFixedSidebarClass() {
	    var top = document.documentElement.scrollTop || body.scrollTop;
	    var posFixedEl = document.querySelector(options.positionFixedSelector);
	
	    if (options.fixedSidebarOffset === 'auto') {
	      options.fixedSidebarOffset = document.querySelector(options.tocSelector).offsetTop;
	    }
	
	    if (top > options.fixedSidebarOffset) {
	      if (posFixedEl.className.indexOf(options.positionFixedClass) === -1) {
	        posFixedEl.className += SPACE_CHAR + options.positionFixedClass;
	      }
	    } else {
	      posFixedEl.className = posFixedEl.className.split(SPACE_CHAR + options.positionFixedClass).join('');
	    }
	  }
	
	  /**
	   * Update TOC highlighting and collpased groupings.
	   */
	  function updateToc(headingsArray) {
	    var top = document.documentElement.scrollTop || body.scrollTop;
	
	    // Add fixed class at offset;
	    if (options.positionFixedSelector) {
	      updateFixedSidebarClass();
	    }
	
	    // Get the top most heading currently visible on the page so we know what to highlight.
	    var headings = headingsArray;
	    var topHeader;
	    // Using some instead of each so that we can escape early.
	    if (currentlyHighlighting
	      && document.querySelector(options.tocSelector) !== null
	      && headings.length > 0) {
	      some.call(headings, function(heading, i) {
	        if (heading.offsetTop > top + options.headingsOffset) {
	          // Don't allow negative index value.
	          var index = (i === 0) ? i : i - 1;
	          topHeader = headings[index];
	          return true;
	        } else if (i === headings.length - 1) {
	          // This allows scrolling for the last heading on the page.
	          topHeader = headings[headings.length - 1];
	          return true;
	        }
	      });
	
	      // Remove the active class from the other tocLinks.
	      var tocLinks = document.querySelector(options.tocSelector)
	        .querySelectorAll('.' + options.linkClass);
	      forEach.call(tocLinks, function(tocLink) {
	        tocLink.className = tocLink.className.split(SPACE_CHAR + options.activeLinkClass).join('');
	      });
	
	      // Add the active class to the active tocLink.
	      var activeTocLink = document.querySelector(options.tocSelector)
	        .querySelector('.' + options.linkClass
	          + '.node-name--' + topHeader.nodeName
	          + '[href="#' + topHeader.id + '"]');
	      activeTocLink.className += SPACE_CHAR + options.activeLinkClass;
	
	      var tocLists = document.querySelector(options.tocSelector)
	        .querySelectorAll('.' + options.listClass + '.' + options.collapsibleClass);
	
	      // Collapse the other collapsible lists.
	      forEach.call(tocLists, function(list) {
	        var collapsedClass = SPACE_CHAR + options.isCollapsedClass;
	        if (list.className.indexOf(collapsedClass) === -1) {
	          list.className += SPACE_CHAR + options.isCollapsedClass;
	        }
	      });
	
	      // Expand the active link's collapsible list and its sibling if applicable.
	      if (activeTocLink.nextSibling) {
	        activeTocLink.nextSibling.className = activeTocLink.nextSibling.className.split(SPACE_CHAR + options.isCollapsedClass).join('');
	      }
	      removeCollapsedFromParents(activeTocLink.parentNode.parentNode);
	    }
	  }
	
	  /**
	   * Remove collpased class from parent elements.
	   * @param {HTMLElement} element
	   * @return {HTMLElement}
	   */
	  function removeCollapsedFromParents(element) {
	    if (element.className.indexOf(options.collapsibleClass) !== -1) {
	      element.className = element.className.split(SPACE_CHAR + options.isCollapsedClass).join('');
	      return removeCollapsedFromParents(element.parentNode.parentNode);
	    }
	    return element;
	  }
	
	  /**
	   * Disable TOC Animation when a link is clicked.
	   * @param {Event} event
	   */
	  function disableTocAnimation(event) {
	    var target = event.target || event.srcElement;
	    if (target.className.indexOf(options.linkClass) === -1) {
	      return;
	    }
	    // Bind to tocLink clicks to temporarily disable highlighting
	    // while smoothScroll is animating.
	    currentlyHighlighting = false;
	  }
	
	  /**
	   * Enable TOC Animation.
	   */
	  function enableTocAnimation() {
	    currentlyHighlighting = true;
	  }
	
	  return {
	    enableTocAnimation: enableTocAnimation,
	    disableTocAnimation: disableTocAnimation,
	    render: render,
	    updateToc: updateToc
	  };
	};


/***/ },
/* 4 */
/*!*********************************!*\
  !*** ./src/js/parse-content.js ***!
  \*********************************/
/***/ function(module, exports) {

	/**
	 * This file is responsible for parsing the content from the DOM and making
	 * sure data is nested properly.
	 *
	 * @author Tim Scanlin
	 */
	
	module.exports = function parseContent(options) {
	  var reduce = [].reduce;
	
	  /**
	   * Get the last item in an array and return a reference to it.
	   * @param {Array} array
	   * @return {Object}
	   */
	  function getLastItem(array) {
	    return array[array.length - 1];
	  }
	
	  /**
	   * Get heading level for a heading dom node.
	   * @param {HTMLElement} heading
	   * @return {Number}
	   */
	  function getHeadingLevel(heading) {
	    return +heading.nodeName.split('H').join('');
	  }
	
	  /**
	   * Get important properties from a heading element and store in a plain object.
	   * @param {HTMLElement} heading
	   * @return {Object}
	   */
	  function getHeadingObject(heading) {
	    return {
	      id: heading.id,
	      children: [],
	      nodeName: heading.nodeName,
	      headingLevel: getHeadingLevel(heading),
	      textContent: heading.textContent.trim()
	    };
	  }
	
	  /**
	   * Add a node to the nested array.
	   * @param {Object} node
	   * @param {Array} nest
	   * @return {Array}
	   */
	  function addNode(node, nest) {
	    var obj = getHeadingObject(node);
	    var level = getHeadingLevel(node);
	    var array = nest;
	    var lastItem = getLastItem(array);
	    var lastItemLevel = lastItem
	      ? lastItem.headingLevel
	      : 0;
	    var counter = level - lastItemLevel;
	
	    while (counter > 0) {
	      lastItem = getLastItem(array);
	      if (lastItem && lastItem.children !== undefined) {
	        array = lastItem.children;
	      }
	      counter--;
	    }
	
	    if (level >= options.collapseDepth) {
	      obj.isCollapsed = true;
	    }
	
	    array.push(obj);
	    return array;
	  }
	
	  /**
	   * Select headings in content area, exclude any selector in options.ignoreSelector
	   * @param {String} contentSelector
	   * @param {Array} headingSelector
	   * @return {Array}
	   */
	  function selectHeadings(contentSelector, headingSelector) {
	    var selectors = headingSelector;
	    if (options.ignoreSelector) {
	      selectors = headingSelector.split(',')
	        .map(function mapSelectors(selector) {
	          return selector.trim() + ':not(' + options.ignoreSelector + ')';
	        });
	    }
	    try {
	      return document.querySelector(contentSelector)
	        .querySelectorAll(selectors);
	    } catch (e) {
	      throw new Error('Element not found: ' + contentSelector);
	    }
	  }
	
	  /**
	   * Nest headings array into nested arrays with 'children' property.
	   * @param {Array} headingsArray
	   * @return {Object}
	   */
	  function nestHeadingsArray(headingsArray) {
	    return reduce.call(headingsArray, function reducer(prev, curr) {
	      var currentHeading = getHeadingObject(curr);
	
	      addNode(currentHeading, prev.nest);
	      return prev;
	    }, {
	      nest: []
	    });
	  }
	
	  return {
	    nestHeadingsArray: nestHeadingsArray,
	    selectHeadings: selectHeadings
	  };
	};


/***/ }
/******/ ]);
//# sourceMappingURL=tocbot.js.map