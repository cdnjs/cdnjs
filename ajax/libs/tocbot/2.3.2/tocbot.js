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
	      console.warn('Element not found: ' + options.tocSelector); // eslint-disable-line
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
	
	    // Get headings array.
	    headingsArray = parseContent.selectHeadings(options.contentSelector, options.headingSelector);
	    // Return if no headings are found.
	    if (headingsArray === null) {
	      return;
	    }
	
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
	        callback: function(anchor, toggle) {
	          buildHtml.enableTocAnimation();
	          if (typeof options.smoothScrollOptions.callback === 'function') {
	            options.smoothScrollOptions.callback(anchor, toggle);
	          }
	        }
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

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {/*! smooth-scroll v10.3.1 | (c) 2017 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
	!(function(e,t){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t(e)), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof exports?module.exports=t(e):e.smoothScroll=t(e)})("undefined"!=typeof global?global:this.window||this.global,(function(e){"use strict";var t,n,o,r,a,c,l,i={},u="querySelector"in document&&"addEventListener"in e,s={selector:"[data-scroll]",selectorHeader:null,speed:500,easing:"easeInOutCubic",offset:0,callback:function(){}},f=function(){var e={},t=!1,n=0,o=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(t=arguments[0],n++);for(;n<o;n++){var r=arguments[n];!(function(n){for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t&&"[object Object]"===Object.prototype.toString.call(n[o])?e[o]=f(!0,e[o],n[o]):e[o]=n[o])})(r)}return e},d=function(e){return Math.max(e.scrollHeight,e.offsetHeight,e.clientHeight)},h=function(e,t){for(Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),n=t.length;--n>=0&&t.item(n)!==this;);return n>-1});e&&e!==document;e=e.parentNode)if(e.matches(t))return e;return null},m=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),o=n.length,r=-1,a="",c=n.charCodeAt(0);++r<o;){if(0===(t=n.charCodeAt(r)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");a+=t>=1&&t<=31||127==t||0===r&&t>=48&&t<=57||1===r&&t>=48&&t<=57&&45===c?"\\"+t.toString(16)+" ":t>=128||45===t||95===t||t>=48&&t<=57||t>=65&&t<=90||t>=97&&t<=122?n.charAt(r):"\\"+n.charAt(r)}return"#"+a},p=function(e,t){var n;return"easeInQuad"===e&&(n=t*t),"easeOutQuad"===e&&(n=t*(2-t)),"easeInOutQuad"===e&&(n=t<.5?2*t*t:(4-2*t)*t-1),"easeInCubic"===e&&(n=t*t*t),"easeOutCubic"===e&&(n=--t*t*t+1),"easeInOutCubic"===e&&(n=t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e&&(n=t*t*t*t),"easeOutQuart"===e&&(n=1- --t*t*t*t),"easeInOutQuart"===e&&(n=t<.5?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e&&(n=t*t*t*t*t),"easeOutQuint"===e&&(n=1+--t*t*t*t*t),"easeInOutQuint"===e&&(n=t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t),n||t},g=function(e,t,n){var o=0;if(e.offsetParent)do{o+=e.offsetTop,e=e.offsetParent}while(e);return o=Math.max(o-t-n,0),Math.min(o,y()-b())},b=function(){return Math.max(document.documentElement.clientHeight,e.innerHeight||0)},y=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},v=function(e){return e&&"object"==typeof JSON&&"function"==typeof JSON.parse?JSON.parse(e):{}},O=function(e){return e?d(e)+e.offsetTop:0},S=function(t,n,o){o||(t.focus(),document.activeElement.id!==t.id&&(t.setAttribute("tabindex","-1"),t.focus(),t.style.outline="none"),e.scrollTo(0,n))};i.animateScroll=function(n,o,c){var i=v(o?o.getAttribute("data-options"):null),u=f(t||s,c||{},i),d="[object Number]"===Object.prototype.toString.call(n),h=d||!n.tagName?null:n;if(d||h){var m=e.pageYOffset;u.selectorHeader&&!r&&(r=document.querySelector(u.selectorHeader)),a||(a=O(r));var b,E,I=d?n:g(h,a,parseInt("function"==typeof u.offset?u.offset():u.offset,10)),H=I-m,A=y(),j=0,C=function(t,r,a){var c=e.pageYOffset;(t==r||c==r||e.innerHeight+c>=A)&&(clearInterval(a),S(n,r,d),u.callback(n,o))},M=function(){j+=16,b=j/parseInt(u.speed,10),b=b>1?1:b,E=m+H*p(u.easing,b),e.scrollTo(0,Math.floor(E)),C(E,I,l)};0===e.pageYOffset&&e.scrollTo(0,0),(function(){clearInterval(l),l=setInterval(M,16)})()}};var E=function(t){try{m(decodeURIComponent(e.location.hash))}catch(t){m(e.location.hash)}n&&(n.id=n.getAttribute("data-scroll-id"),i.animateScroll(n,o),n=null,o=null)},I=function(r){if(0===r.button&&!r.metaKey&&!r.ctrlKey&&(o=h(r.target,t.selector))&&"a"===o.tagName.toLowerCase()&&o.hostname===e.location.hostname&&o.pathname===e.location.pathname&&/#/.test(o.href)){var a;try{a=m(decodeURIComponent(o.hash))}catch(e){a=m(o.hash)}if("#"===a){r.preventDefault(),n=document.body;var c=n.id?n.id:"smooth-scroll-top";return n.setAttribute("data-scroll-id",c),n.id="",void(e.location.hash.substring(1)===c?E():e.location.hash=c)}n=document.querySelector(a),n&&(n.setAttribute("data-scroll-id",n.id),n.id="",o.hash===e.location.hash&&(r.preventDefault(),E()))}},H=function(e){c||(c=setTimeout((function(){c=null,a=O(r)}),66))};return i.destroy=function(){t&&(document.removeEventListener("click",I,!1),e.removeEventListener("resize",H,!1),t=null,n=null,o=null,r=null,a=null,c=null,l=null)},i.init=function(n){u&&(i.destroy(),t=f(s,n||{}),r=t.selectorHeader?document.querySelector(t.selectorHeader):null,a=O(r),document.addEventListener("click",I,!1),e.addEventListener("hashchange",E,!1),r&&e.addEventListener("resize",H,!1))},i}));
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
	  // Class to add to list items.
	  listItemClass: 'toc-list-item',
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
	    callback: function(anchor, toggle) { } // callback after link is scrolled to.
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
	  fixedSidebarOffset: 'auto',
	  // includeHtml can be set to true to include the HTML markup from the
	  // heading node instead of just including the textContent.
	  includeHtml: false
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
	
	    // Return if no parent is found.
	    if (parent === null) {
	      return;
	    }
	
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
	    if (options.listItemClass) {
	      item.setAttribute('class', options.listItemClass);
	    }
	    if (options.includeHtml && data.childNodes.length) {
	      forEach.call(data.childNodes, function(node) {
	        a.appendChild(node.cloneNode(true));
	      });
	    } else {
	      // Default behavior.
	      a.textContent = data.textContent;
	    }
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
	        if (heading.offsetTop > top + options.headingsOffset + 1) {
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
	    if (typeof target.className !== 'string' || target.className.indexOf(options.linkClass) === -1) {
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
	    var obj = {
	      id: heading.id,
	      children: [],
	      nodeName: heading.nodeName,
	      headingLevel: getHeadingLevel(heading),
	      textContent: heading.textContent.trim()
	    };
	
	    if (options.includeHtml) {
	      obj.childNodes = heading.childNodes;
	    }
	
	    return obj;
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
	      console.warn('Element not found: ' + contentSelector); // eslint-disable-line
	      return null;
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