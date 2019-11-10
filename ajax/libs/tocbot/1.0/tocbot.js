(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// HTML

module.exports = function(options) {
  var forEach = [].forEach;
  var some = [].some;
  var body = document.body;
  var currentlyHighlighting = true;

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
        d.children.forEach(function(d) {
          createEl(d, list);
        });
        link.appendChild(list);
      }
    }

    data.forEach(function(d) {
      createEl(d, container)
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
    if (options.smoothScroll !== undefined) {
      a.setAttribute('data-scroll', '');
    }
    a.setAttribute('href', '#' + data.id);
    a.setAttribute('class', options.linkClass
      + ' ' + 'node-name--' + data.nodeName
      + ' ' + options.extraLinkClasses);
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
      + ' ' + options.extraListClasses;
    if (isCollapsed) {
      classes += ' ' + options.collapsibleClass;
      classes += ' ' + options.isCollapsedClass;
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
    var tocEl = document.querySelector(options.tocSelector);

    if (options.fixedSidebarOffset === 'auto') {
      options.fixedSidebarOffset = document.querySelector(options.tocSelector).offsetTop;
    }

    if (top > options.fixedSidebarOffset) {
      tocEl.classList.add(options.positionFixedClass);
    } else {
      tocEl.classList.remove(options.positionFixedClass);
    }
    return tocEl;
  }

  /**
   * Update TOC highlighting and collpased groupings.
   */
  function updateToc(headingsArray) {
    var top = document.documentElement.scrollTop || body.scrollTop;

    // Add fixed class at offset;
    updateFixedSidebarClass();

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
        tocLink.classList.remove(options.activeLinkClass);
      });

      // Add the active class to the active tocLink.
      var activeTocLink = document.querySelector(options.tocSelector)
        .querySelector('.' + options.linkClass
          + '.node-name--' + topHeader.nodeName
          + '[href="#' + topHeader.id + '"]');
      activeTocLink.classList.add(options.activeLinkClass);

      var tocLists = document.querySelector(options.tocSelector)
        .querySelectorAll('.' + options.listClass + '.' + options.collapsibleClass);

      // Collapse the other collapsible lists.
      forEach.call(tocLists, function(list) {
        list.classList.add(options.isCollapsedClass);
      });

      // Expand the active link's collapsible list and its sibling if applicable.
      if (activeTocLink.nextSibling) {
        activeTocLink.nextSibling.classList.remove(options.isCollapsedClass);
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
    if (element.classList.contains(options.collapsibleClass)) {
      element.classList.remove(options.isCollapsedClass)
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
    if (!target.classList.contains(options.linkClass)) {
      return;
    }
    // Bind to tocLink clicks to temporarily disable highlighting
    // while smoothScroll is animating.
    if (!!options.smoothScroll) {
      currentlyHighlighting = false;
    }
  }

  function enableTocAnimation() {
    currentlyHighlighting = true;
  }

  return {
    enableTocAnimation: enableTocAnimation,
    disableTocAnimation: disableTocAnimation,
    render: render,
    updateToc: updateToc
  };
}

},{}],2:[function(require,module,exports){
module.exports = {
  // Where to render the table of contents.
  tocSelector: '.js-toc',
  // Where to grab the headings to build the table of contents.
  contentSelector: '.js-content',
  // Which headings to grab inside of the contentSelector element.
  headingSelector: 'h1, h2, h3',

  // Reference to smoothScroll
  smoothScroll: undefined,
  // smoothScroll Options, see docs at: https://github.com/cferdinandi/smooth-scroll
  smoothScrollOptions: {
    easing: 'easeInOutCubic',
    offset: 0,
    speed: 300, // animation duration.
    updateURL: true,
  },

  // Class to add to active links (the link corresponding to the top most heading on the page).
  activeLinkClass: 'is-active-link',
  // Headings that match the ignoreSelector will be skipped.
  ignoreSelector: '.skip-toc',
  // Fixed position class to add to make sidebar fixed after scrolling down past the fixedSidebarOffset.
  positionFixedClass: 'is-position-fixed',
  // fixedSidebarOffset can be any number but by default is set to auto which sets the fixedSidebarOffset to the sidebar element's offsetTop from the top of the document on init.
  fixedSidebarOffset: 'auto',

  // Main class to add to links.
  linkClass: 'toc-link',
  // Extra classes to add to links.
  extraLinkClasses: '',
  // Main class to add to lists.
  listClass: 'toc-list',
  // Extra classes to add to lists.
  extraListClasses: '',
  // Headings offset between the headings and the top of the document (helps with weird rounding bugs that pop up).
  headingsOffset: 0,

  // Class that gets added when a list should be collapsed.
  isCollapsedClass: 'is-collapsed',
  // Class that gets added when a list should be able to be collapsed but isn't necessarily collpased.
  collapsibleClass: 'collapsible',
  // How many heading levels should not be collpased. For example, number 6 will show everything since there are only 6 heading levels and number 0 will collpase them all.
  collapseDepth: 0,
};

},{}],3:[function(require,module,exports){
(function (global){
/**
 * tocbot
 * tocbot is similar to tocify (http://gregfranko.com/jquery.tocify.js/) (except its native w/ no need for jquery)
 * This creates a toble of contents based on HTML headings which allows users to easily jump to different sections.
 *
 * @author Tim Scanlin
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory(root));
	} else if (typeof exports === 'object') {
    module.exports = factory(root);
	} else {
    root.tocbot = factory(root);
	}
})(typeof global !== 'undefined' ? global : this.window || this.global, function(root) {

  'use strict';

  // Default options.
  var defaultOptions = require('./default-options.js');
  // Object to store current options.
  var options = {};
  // Object for public APIs.
  var tocbot = {};

  var BuildHtml = require('./build-html.js');
  var ParseContent = require('./parse-content.js');
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
    var target = {}
    for (var i = 0; i < arguments.length; i++) {
      var source = arguments[i]
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
  }

  function updateTocListener(headingsArray) {
    return function updateToc() {
      return buildHtml.updateToc(headingsArray);
    }
  }

  /**
	 * Destroy tocbot.
	 */
  tocbot.destroy = function() {
		// Remove event listeners
    document.removeEventListener('scroll', updateTocListener(headingsArray));
    document.removeEventListener('resize', updateTocListener(headingsArray));
    if (buildHtml) {
      document.removeEventListener('click', buildHtml.disableTocAnimation);
    }

    // Destroy smoothScroll if it exists.
    if (options.smoothScroll) {
      options.smoothScroll.destroy();
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
    console.log(nestedHeadings)

    // Render.
    buildHtml.render(options.tocSelector, nestedHeadings);

    // Update Sidebar and bind listeners.
    buildHtml.updateToc(headingsArray);
    document.addEventListener('scroll', updateTocListener(headingsArray));
    document.addEventListener('resize', updateTocListener(headingsArray));

    // Bind click listeners to disable animation.
    document.addEventListener('click', buildHtml.disableTocAnimation);

    // Initialize smoothscroll if it exists.
    if (options.smoothScroll) {
      this.smoothScroll = options.smoothScroll.init(extend(options.smoothScrollOptions, {
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./build-html.js":1,"./default-options.js":2,"./parse-content.js":4}],4:[function(require,module,exports){
// DATA

module.exports = function(options) {
  var reduce = [].reduce;

  /**
   * Select headings in content area, exclude any selector in options.ignoreSelector
   * @param {String} contentSelector
   * @param {Array} headingSelector
   * @return {Array}
   */
  function selectHeadings(contentSelector, headingSelector) {
    if (options.ignoreSelector) {
      headingSelector = headingSelector
        .split(',')
        .map(function(selector) {
          return selector.trim() + ':not(' + options.ignoreSelector + ')';
        });
    }
    return document.querySelector(contentSelector)
      .querySelectorAll(headingSelector);
  }

  /**
   * Nest headings array into nested arrays with 'children' property.
   * @param {Array} headingsArray
   * @param {Function} callback
   * @return {Object}
   */
  function nestHeadingsArray(headingsArray, callback) {
    return reduce.call(headingsArray, function(prev, curr, index) {
      var currentHeading = getHeadingObject(curr);
      prev.lastItem = curr;

      addNode(currentHeading, prev.nest)
      return prev;
    }, {
      lastItem: undefined,
      nest: [],
    });
  }

  /**
   * Add a node to the nested array.
   * @param {Object} node
   * @param {Array} nest
   * @return {Array}
   */
  function addNode(node, nest) {
    var level = getHeadingLevel(node);
    var array = nest;
    var lastItem = getLastItem(array);
    var lastItemLevel = lastItem
      ? lastItem.headingLevel
      : 0;
    var counter = level - lastItemLevel;

    while(counter > 0) {
      lastItem = getLastItem(array);
      if (lastItem && lastItem.children !== undefined) {
        array = lastItem.children;
      }
      counter--;
    }

    if (level >= options.collapseDepth) {
      node.isCollapsed = true;
    }

    array.push(node);
    return array;
  }

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
      textContent: heading.textContent.trim(),
    };
  }

  return {
    nestHeadingsArray: nestHeadingsArray,
    selectHeadings: selectHeadings
  };
}

},{}]},{},[3]);
