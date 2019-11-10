/*
Copyright (c) 2017 NAVER Corp.
@egjs/infinitegrid project is licensed under the MIT license

@egjs/infinitegrid JavaScript library
https://github.com/naver/egjs-infinitegrid

@version 3.5.2
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.eg = global.eg || {}, global.eg.Parallax = factory());
}(this, (function () { 'use strict';

	var win;

	if (typeof window === "undefined") {
	  // window is undefined in node.js
	  win = {
	    document: {},
	    navigator: {
	      userAgent: ""
	    }
	  };
	} else {
	  win = window;
	}
	var document$1 = win.document;

	var ua = win.navigator.userAgent;
	var SUPPORT_ADDEVENTLISTENER = !!("addEventListener" in document$1);
	var SUPPORT_PASSIVE = function () {
	  var supportsPassiveOption = false;

	  try {
	    if (SUPPORT_ADDEVENTLISTENER && Object.defineProperty) {
	      document$1.addEventListener("test", null, Object.defineProperty({}, "passive", {
	        get: function () {
	          supportsPassiveOption = true;
	        }
	      }));
	    }
	  } catch (e) {//
	  }

	  return supportsPassiveOption;
	}();
	var IS_IE = /MSIE|Trident|Windows Phone|Edge/.test(ua);
	var IS_IOS = /iPhone|iPad/.test(ua);
	var IS_ANDROID2 = /Android 2\./.test(ua);
	var agent = ua.toLowerCase();
	var isMobile = /mobi|ios|android/.test(agent);
	var ALIGN = {
	  START: "start",
	  CENTER: "center",
	  END: "end",
	  JUSTIFY: "justify"
	};
	var webkit = /applewebkit\/([\d|.]*)/g.exec(agent);
	var WEBKIT_VERSION = webkit && parseInt(webkit[1], 10) || 0;
	var TRANSFORM = (_a = function () {
	  var properties = {
	    transitionend: "",
	    webkitTransitionEnd: "-webkit-",
	    MSTransitionEnd: "-ms-",
	    oTransitionEnd: "-o-",
	    mozTransitionEnd: "-moz-"
	  };

	  for (var property in properties) {
	    var prefix = properties[property];

	    if ("on" + property.toLowerCase() in win) {
	      return [prefix + "transform", prefix + "transition", property];
	    }
	  }

	  return [];
	}(), _a[0]),
	    TRANSITION = _a[1],
	    TRANSITION_END = _a[2];

	var _a;

	function toArray(nodes) {
	  // SCRIPT5014 in IE8
	  var array = [];

	  if (nodes) {
	    for (var i = 0, len = nodes.length; i < len; i++) {
	      array.push(nodes[i]);
	    }
	  }

	  return array;
	}
	function matchHTML(html) {
	  return html.match(/^<([A-z]+)\s*([^>]*)>/);
	}
	function $(param, multi) {
	  if (multi === void 0) {
	    multi = false;
	  }

	  var el;

	  if (typeof param === "string") {
	    // String (HTML, Selector)
	    // check if string is HTML tag format
	    var match = matchHTML(param); // creating element

	    if (match) {
	      // HTML
	      var dummy = document$1.createElement("div");
	      dummy.innerHTML = param;
	      el = dummy.childNodes;
	    } else {
	      // Selector
	      el = document$1.querySelectorAll(param);
	    }

	    if (multi) {
	      return toArray(el);
	    } else {
	      return el && el[0];
	    }
	  } else if (isWindow(param)) {
	    // window
	    el = param;
	  } else if (isJQuery(param)) {
	    // jQuery
	    el = multi ? $(param.toArray(), true) : $(param.get(0), false);
	  } else if (Array.isArray(param)) {
	    el = param.map(function (v) {
	      return $(v);
	    });

	    if (!multi) {
	      el = el.length >= 1 ? el[0] : undefined;
	    }
	  } else if (param.nodeName && (param.nodeType === 1 || param.nodeType === 9)) {
	    // HTMLElement, Document
	    el = param;
	  }

	  return el;
	}
	function assign(target) {
	  var sources = [];

	  for (var _i = 1; _i < arguments.length; _i++) {
	    sources[_i - 1] = arguments[_i];
	  }

	  sources.forEach(function (source) {
	    for (var key in source) {
	      target[key] = source[key];
	    }
	  });
	  return target;
	}
	function isJQuery(el) {
	  return typeof win.jQuery === "function" && el instanceof win.jQuery || el.constructor.prototype.jquery && el.toArray;
	}
	function isWindow(el) {
	  return el === win;
	}

	var style = {
	  vertical: {
	    position: "top",
	    size: "height",
	    cammelSize: "Height",
	    coordinate: "Y"
	  },
	  horizontal: {
	    position: "left",
	    size: "width",
	    cammelSize: "Width",
	    coordinate: "X"
	  }
	};
	var START = ALIGN.START,
	    CENTER = ALIGN.CENTER;
	/**
	 * @classdesc Parallax is a displacement or difference in the apparent position of an object viewed along two different lines of sight. You can apply parallax by scrolling the image and speed of the item.
	 * @ko Parallax는 서로 다른 두 개의 시선에서 바라본 물체의 외관상 위치의 변위 또는 차이입니다. 스크롤에 따라 이미지와 아이템의 속도를 차이를 줌으로써 parallax을 적용할 수 있습니다.
	 * @class eg.Parallax
	 * @param {Element|String} [root=window] Scrolling target. If you scroll in the body, set window. 스크롤하는 대상. 만약 body에서 스크롤하면 window로 설정한다.
	 * @param {Object} [options] The option object of eg.Parallax module <ko>eg.Parallax 모듈의 옵션 객체</ko>
	 * @param {Boolean} [options.horizontal=false] Direction of the scroll movement (false: vertical, true: horizontal) <ko>스크롤 이동 방향 (false: 세로방향, true: 가로방향)</ko>
	 * @param {Element|String} [options.container=null] Container wrapping items. If root and container have no gaps, do not set option. <ko> 아이템들을 감싸고 있는 컨테이너. 만약 root와 container간의 차이가 없으면, 옵션을 설정하지 않아도 된다.</ko>
	 * @param {String} [options.selector="img"] The selector of the image to apply the parallax in the item <ko> 아이템안에 있는 parallax를 적용할 이미지의 selector </ko>
	 * @param {Boolean} [options.strength=1] Dimensions that indicate the sensitivity of parallax. The higher the strength, the faster.
	 * @param {Boolean} [options.center=0] The middle point of parallax. The top is 1 and the bottom is -1. <ko> parallax가 가운데로 오는 점. 상단이 1이고 하단이 -1이다. </ko>
	 * @param {Boolean} [options.range=[-1, 1]] Range to apply the parallax. The top is 1 and the bottom is -1. <ko> parallax가 적용되는 범위, 상단이 1이고 하단이 -1이다. </ko>
	 * @param {Boolean} [options.align="start"] The alignment of the image in the item. ("start" : top or left, "center": middle) <ko> 아이템안의 이미지의 정렬 </ko>
	 * @example
	```
	<script>
	// isOverflowScroll: false
	var parallax = new eg.Parallax(window, {
	  container: ".container",
	  selector: "img.parallax",
	  strength: 0.8,
	  center: 0,
	  range: [-1, 1],
	  align: "center",
	  horizontal: true,
	});

	// isOverflowScroll: ture
	var parallax = new eg.Parallax(".container", {
	  selector: "img.parallax",
	  strength: 0.8,
	  center: 0,
	  range: [-1, 1],
	  align: "center",
	  horizontal: true,
	});

	// item interface
	var item = {
	  // original size
	  size: {
	    width: 100,
	    height: 100,
	  },
	  // view size
	  rect: {
	    top: 100,
	    left: 100,
	    width: 100,
	    height: 100,
	  }
	};
	</script>
	```
	 **/

	var Parallax =
	/*#__PURE__*/
	function () {
	  function Parallax(root, options) {
	    if (root === void 0) {
	      root = window;
	    }

	    if (options === void 0) {
	      options = {};
	    }

	    this.options = assign({
	      container: null,
	      selector: "img",
	      strength: 1,
	      center: 0,
	      range: [-1, 1],
	      align: START,
	      horizontal: false
	    }, options);
	    this._root = $(root);
	    this._container = this.options.container && $(this.options.container);
	    this._rootSize = 0;
	    this._containerPosition = 0;
	    this._style = style[this.options.horizontal ? "horizontal" : "vertical"];
	    this.resize();
	  }
	  /**
	   * As the browser is resized, the gaps between the root and the container and the size of the items are updated.
	   * @ko 브라우저의 크기가 변경됨으로 써 root와 container의 간격과 아이템들의 크기를 갱신한다.
	   * @method eg.Parallax#resize
	   * @param {Array} [items = []] Items to apply parallax. It does not apply if it is not in visible range. <ko>parallax를 적용할 아이템들. 가시거리에 존재하지 않으면 적용이 안된다.</ko>
	   * @return {eg.Parallax} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	   * @example
	  ```js
	  window.addEventListener("resize", function (e) {
	  parallax.resize(items);
	  });
	  ```
	   */


	  var __proto = Parallax.prototype;

	  __proto.resize = function (items) {
	    var _this = this;

	    if (items === void 0) {
	      items = [];
	    }

	    var root = this._root;
	    var container = this._container;
	    var positionName = this._style.position;
	    var sizeName = this._style.cammelSize;

	    if (!container || root === container) {
	      this._containerPosition = 0;
	    } else {
	      var rootRect = (isWindow(root) ? document.body : root).getBoundingClientRect();
	      var containertRect = container.getBoundingClientRect();
	      this._containerPosition = containertRect[positionName] - rootRect[positionName];
	    }

	    this._rootSize = isWindow(root) ? window["inner" + sizeName] || document.documentElement["client" + sizeName] : root["client" + sizeName];

	    if (isMobile && isWindow(root)) {
	      var bodyWidth = document.body.offsetWidth || document.documentElement.offsetWidth;
	      var windowWidth = window.innerWidth;
	      this._rootSize = this._rootSize / (bodyWidth / windowWidth);
	    }

	    items.forEach(function (item) {
	      _this._checkParallaxItem(item.el);
	    });
	    return this;
	  };
	  /**
	   * Scrolls the image in the item by a parallax.
	   * @ko 스크롤하면 아이템안의 이미지를 시차적용시킨다.
	   * @method eg.Parallax#refresh
	   * @param {Array} [items = []] Items to apply parallax. It does not apply if it is not in visible range. <ko>parallax를 적용할 아이템들. 가시거리에 존재하지 않으면 적용이 안된다.</ko>
	   * @param {Number} [scrollPositionStart = 0] The scroll position.
	   * @return {eg.Parallax} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	   * @example
	  ```js
	  document.body.addEventListener("scroll", function (e) {
	  parallax.refresh(items, e.scrollTop);
	  });
	  ```
	   */


	  __proto.refresh = function (items, scrollPositionStart) {
	    var _this = this;

	    if (items === void 0) {
	      items = [];
	    }

	    if (scrollPositionStart === void 0) {
	      scrollPositionStart = 0;
	    }

	    var styleNames = this._style;
	    var positionName = styleNames.position;
	    var coordinateName = styleNames.coordinate;
	    var sizeName = styleNames.size;
	    var options = this.options;
	    var strength = options.strength,
	        center = options.center,
	        range = options.range,
	        align = options.align;
	    var rootSize = this._rootSize;
	    var scrollPositionEnd = scrollPositionStart + rootSize;
	    var containerPosition = this._containerPosition;
	    items.forEach(function (item) {
	      if (!item.rect || !item.size || !item.el) {
	        return;
	      }

	      var position = containerPosition + item.rect[positionName];
	      var itemSize = item.rect[sizeName] || item.size[sizeName]; // check item is in container.

	      if (scrollPositionStart > position + itemSize || scrollPositionEnd < position) {
	        return;
	      }

	      var el = item.el;

	      if (!el.__IMAGE__) {
	        _this._checkParallaxItem(el);
	      }

	      if (el.__IMAGE__ === -1) {
	        return;
	      }

	      var imageElement = el.__IMAGE__;
	      var boxElement = el.__BOX__;
	      var boxSize = boxElement.__SIZE__;
	      var imageSize = imageElement.__SIZE__; // no parallax

	      if (boxSize >= imageSize) {
	        // remove transform style
	        imageElement.style[TRANSFORM] = "";
	        return;
	      } // if area's position is center, ratio is 0.
	      // if area is hidden at the top, ratio is 1.
	      // if area is hidden at the bottom, ratio is -1.


	      var imagePosition = position + boxSize / 2;
	      var ratio = (scrollPositionStart + rootSize / 2 - (rootSize + boxSize) / 2 * center - imagePosition) / (rootSize + boxSize) * 2 * strength; // if ratio is out of the range of -1 and 1, show empty space.

	      ratio = Math.max(Math.min(ratio, range[1]), range[0]); // dist is the position when thumnail's image is centered.

	      var dist = (boxSize - imageSize) / 2;
	      var translate = dist * (1 - ratio);

	      if (align === CENTER) {
	        translate -= dist;
	      }

	      imageElement.__TRANSLATE__ = translate;
	      imageElement.__RATIO__ = ratio;
	      imageElement.style[TRANSFORM] = "translate" + coordinateName + "(" + translate + "px)";
	    });
	    return this;
	  };

	  __proto._checkParallaxItem = function (element) {
	    if (!element) {
	      return;
	    }

	    var selector = this.options.selector;

	    if (!element.__IMAGE__) {
	      var img = element.querySelector(selector);
	      element.__IMAGE__ = img || -1;

	      if (element.__IMAGE__ === -1) {
	        return;
	      }

	      element.__BOX__ = img.parentNode;
	    }

	    if (element.__IMAGE__ === -1) {
	      return;
	    }

	    var sizeName = this._style.cammelSize;
	    element.__IMAGE__.__SIZE__ = element.__IMAGE__["offset" + sizeName];
	    element.__BOX__.__SIZE__ = element.__BOX__["offset" + sizeName];
	  };

	  return Parallax;
	}();

	return Parallax;

})));
//# sourceMappingURL=parallax.js.map
