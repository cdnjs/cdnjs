(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.autosize = factory());
}(this, (function () {
	var assignedElements = new Map();

	function assign(ta) {
	  if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || assignedElements.has(ta)) return;
	  var previousHeight = null;

	  function cacheScrollTops(el) {
	    var arr = [];

	    while (el && el.parentNode && el.parentNode instanceof Element) {
	      if (el.parentNode.scrollTop) {
	        arr.push([el.parentNode, el.parentNode.scrollTop]);
	      }

	      el = el.parentNode;
	    }

	    return function () {
	      return arr.forEach(function (_ref) {
	        var node = _ref[0],
	            scrollTop = _ref[1];
	        node.style.scrollBehavior = 'auto';
	        node.scrollTop = scrollTop;
	        node.style.scrollBehavior = null;
	      });
	    };
	  }

	  var computed = window.getComputedStyle(ta);

	  function setHeight(_ref2) {
	    var _ref2$restoreTextAlig = _ref2.restoreTextAlign,
	        restoreTextAlign = _ref2$restoreTextAlig === void 0 ? null : _ref2$restoreTextAlig,
	        _ref2$testForHeightRe = _ref2.testForHeightReduction,
	        testForHeightReduction = _ref2$testForHeightRe === void 0 ? true : _ref2$testForHeightRe;
	    var initialOverflowY = computed.overflowY;

	    if (ta.scrollHeight === 0) {
	      // If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
	      return;
	    } // disallow vertical resizing


	    if (computed.resize === 'vertical') {
	      ta.style.resize = 'none';
	    } else if (computed.resize === 'both') {
	      ta.style.resize = 'horizontal';
	    }

	    var restoreScrollTops; // remove inline height style to accurately measure situations where the textarea should shrink
	    // however, skip this step if the new value appends to the previous value, as textarea height should only have grown

	    if (testForHeightReduction) {
	      // ensure the scrollTop values of parent elements are not modified as a consequence of shrinking the textarea height
	      restoreScrollTops = cacheScrollTops(ta);
	      ta.style.height = '';
	    }

	    var newHeight;

	    if (computed.boxSizing === 'content-box') {
	      newHeight = ta.scrollHeight - (parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom));
	    } else {
	      newHeight = ta.scrollHeight + parseFloat(computed.borderTopWidth) + parseFloat(computed.borderBottomWidth);
	    }

	    if (computed.maxHeight !== 'none' && newHeight > parseFloat(computed.maxHeight)) {
	      if (computed.overflowY === 'hidden') {
	        ta.style.overflow = 'scroll';
	      }

	      newHeight = parseFloat(computed.maxHeight);
	    } else if (computed.overflowY !== 'hidden') {
	      ta.style.overflow = 'hidden';
	    }

	    ta.style.height = newHeight + 'px';

	    if (restoreTextAlign) {
	      ta.style.textAlign = restoreTextAlign;
	    }

	    if (restoreScrollTops) {
	      restoreScrollTops();
	    }

	    if (previousHeight !== newHeight) {
	      ta.dispatchEvent(new Event('autosize:resized', {
	        bubbles: true
	      }));
	      previousHeight = newHeight;
	    }

	    if (initialOverflowY !== computed.overflow && !restoreTextAlign) {
	      var textAlign = computed.textAlign;

	      if (computed.overflow === 'hidden') {
	        // Webkit fails to reflow text after overflow is hidden,
	        // even if hiding overflow would allow text to fit more compactly.
	        // The following is intended to force the necessary text reflow.
	        ta.style.textAlign = textAlign === 'start' ? 'end' : 'start';
	      }

	      setHeight({
	        restoreTextAlign: textAlign,
	        testForHeightReduction: true
	      });
	    }
	  }

	  function fullSetHeight() {
	    setHeight({
	      testForHeightReduction: true,
	      restoreTextAlign: null
	    });
	  }

	  var handleInput = function () {
	    var previousValue = ta.value;
	    return function () {
	      setHeight({
	        // if previousValue is '', check for height shrinkage because the placeholder may be taking up space instead
	        // if new value is merely appending to previous value, skip checking for height deduction
	        testForHeightReduction: previousValue === '' || !ta.value.startsWith(previousValue),
	        restoreTextAlign: null
	      });
	      previousValue = ta.value;
	    };
	  }();

	  var destroy = function (style) {
	    ta.removeEventListener('autosize:destroy', destroy);
	    ta.removeEventListener('autosize:update', fullSetHeight);
	    ta.removeEventListener('input', handleInput);
	    window.removeEventListener('resize', fullSetHeight); // future todo: consider replacing with ResizeObserver

	    Object.keys(style).forEach(function (key) {
	      return ta.style[key] = style[key];
	    });
	    assignedElements["delete"](ta);
	  }.bind(ta, {
	    height: ta.style.height,
	    resize: ta.style.resize,
	    textAlign: ta.style.textAlign,
	    overflowY: ta.style.overflowY,
	    overflowX: ta.style.overflowX,
	    wordWrap: ta.style.wordWrap
	  });

	  ta.addEventListener('autosize:destroy', destroy);
	  ta.addEventListener('autosize:update', fullSetHeight);
	  ta.addEventListener('input', handleInput);
	  window.addEventListener('resize', fullSetHeight); // future todo: consider replacing with ResizeObserver

	  ta.style.overflowX = 'hidden';
	  ta.style.wordWrap = 'break-word';
	  assignedElements.set(ta, {
	    destroy: destroy,
	    update: fullSetHeight
	  });
	  fullSetHeight();
	}

	function destroy(ta) {
	  var methods = assignedElements.get(ta);

	  if (methods) {
	    methods.destroy();
	  }
	}

	function update(ta) {
	  var methods = assignedElements.get(ta);

	  if (methods) {
	    methods.update();
	  }
	}

	var autosize = null; // Do nothing in Node.js environment

	if (typeof window === 'undefined') {
	  autosize = function autosize(el) {
	    return el;
	  };

	  autosize.destroy = function (el) {
	    return el;
	  };

	  autosize.update = function (el) {
	    return el;
	  };
	} else {
	  autosize = function autosize(el, options) {
	    if (el) {
	      Array.prototype.forEach.call(el.length ? el : [el], function (x) {
	        return assign(x);
	      });
	    }

	    return el;
	  };

	  autosize.destroy = function (el) {
	    if (el) {
	      Array.prototype.forEach.call(el.length ? el : [el], destroy);
	    }

	    return el;
	  };

	  autosize.update = function (el) {
	    if (el) {
	      Array.prototype.forEach.call(el.length ? el : [el], update);
	    }

	    return el;
	  };
	}

	var autosize$1 = autosize;

	return autosize$1;

})));
