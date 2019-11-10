/*! jquery-fracs v1.0.1 - https://larsjung.de/jquery-fracs/ */
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  var WIN = window; // eslint-disable-line

  var DOC = WIN.document;
  var $ = WIN.jQuery;
  var $WIN = $(WIN);
  var $DOC = $(DOC);
  var extend = $.extend;
  var is_fn = $.isFunction;
  var math_max = Math.max;
  var math_min = Math.min;
  var math_round = Math.round;

  var is_typeof = function is_typeof(obj, type) {
    return _typeof(obj) === type;
  };

  var is_instanceof = function is_instanceof(obj, type) {
    return obj instanceof type;
  };

  var is_html_el = function is_html_el(obj) {
    return obj && obj.nodeType;
  };

  var get_html_el = function get_html_el(obj) {
    return is_html_el(obj) ? obj : is_instanceof(obj, $) ? obj[0] : undefined;
  };

  var get_id = function () {
    var ids = {};
    var next_id = 1;
    return function (el) {
      if (!el) {
        return 0;
      }

      if (!ids[el]) {
        ids[el] = next_id;
        next_id += 1;
      }

      return ids[el];
    };
  }();

  var equal = function equal(x, y, props) {
    if (x === y) {
      return true;
    }

    if (!x || !y || x.constructor !== y.constructor) {
      return false;
    }

    for (var i = 0, l = props.length; i < l; i += 1) {
      var prop = props[i];

      if (x[prop] && is_fn(x[prop].equals) && !x[prop].equals(y[prop])) {
        return false;
      }

      if (x[prop] !== y[prop]) {
        return false;
      }
    }

    return true;
  };

  function Rect(left, top, width, height) {
    this.left = math_round(left);
    this.top = math_round(top);
    this.width = math_round(width);
    this.height = math_round(height);
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
  }

  extend(Rect.prototype, {
    equals: function equals(that) {
      return equal(this, that, ['left', 'top', 'width', 'height']);
    },
    area: function area() {
      return this.width * this.height;
    },
    relativeTo: function relativeTo(rect) {
      return new Rect(this.left - rect.left, this.top - rect.top, this.width, this.height);
    },
    intersection: function intersection(rect) {
      if (!is_instanceof(rect, Rect)) {
        return null;
      }

      var left = math_max(this.left, rect.left);
      var right = math_min(this.right, rect.right);
      var top = math_max(this.top, rect.top);
      var bottom = math_min(this.bottom, rect.bottom);
      var width = right - left;
      var height = bottom - top;
      return width >= 0 && height >= 0 ? new Rect(left, top, width, height) : null;
    },
    envelope: function envelope(rect) {
      if (!is_instanceof(rect, Rect)) {
        return this;
      }

      var left = math_min(this.left, rect.left);
      var right = math_max(this.right, rect.right);
      var top = math_min(this.top, rect.top);
      var bottom = math_max(this.bottom, rect.bottom);
      var width = right - left;
      var height = bottom - top;
      return new Rect(left, top, width, height);
    }
  });
  extend(Rect, {
    ofContent: function ofContent(el, in_content_space) {
      if (!el || el === DOC || el === WIN) {
        return new Rect(0, 0, $DOC.width(), $DOC.height());
      }

      if (in_content_space) {
        return new Rect(0, 0, el.scrollWidth, el.scrollHeight);
      }

      return new Rect(el.offsetLeft - el.scrollLeft, el.offsetTop - el.scrollTop, el.scrollWidth, el.scrollHeight);
    },
    ofViewport: function ofViewport(el, in_content_space) {
      if (!el || el === DOC || el === WIN) {
        return new Rect($WIN.scrollLeft(), $WIN.scrollTop(), $WIN.width(), $WIN.height());
      }

      if (in_content_space) {
        return new Rect(el.scrollLeft, el.scrollTop, el.clientWidth, el.clientHeight);
      }

      return new Rect(el.offsetLeft, el.offsetTop, el.clientWidth, el.clientHeight);
    },
    ofElement: function ofElement(el) {
      var $el = $(el);

      if (!$el.is(':visible')) {
        return null;
      }

      var offset = $el.offset();
      return new Rect(offset.left, offset.top, $el.outerWidth(), $el.outerHeight());
    }
  });

  function Fractions(visible, viewport, possible, rects) {
    this.visible = visible || 0;
    this.viewport = viewport || 0;
    this.possible = possible || 0;
    this.rects = rects && extend({}, rects) || null;
  }

  extend(Fractions.prototype, {
    equals: function equals(that) {
      return this.fracsEqual(that) && this.rectsEqual(that);
    },
    fracsEqual: function fracsEqual(that) {
      return equal(this, that, ['visible', 'viewport', 'possible']);
    },
    rectsEqual: function rectsEqual(that) {
      return equal(this.rects, that.rects, ['document', 'element', 'viewport']);
    }
  });
  extend(Fractions, {
    of: function of(rect, viewport) {
      rect = is_html_el(rect) && Rect.ofElement(rect) || rect;
      viewport = is_html_el(viewport) && Rect.ofViewport(viewport) || viewport || Rect.ofViewport();

      if (!is_instanceof(rect, Rect)) {
        return new Fractions();
      }

      var intersection = rect.intersection(viewport);

      if (!intersection) {
        return new Fractions();
      }

      var intersection_area = intersection.area();
      var possible_area = math_min(rect.width, viewport.width) * math_min(rect.height, viewport.height);
      return new Fractions(intersection_area / rect.area(), intersection_area / viewport.area(), intersection_area / possible_area, {
        document: intersection,
        element: intersection.relativeTo(rect),
        viewport: intersection.relativeTo(viewport)
      });
    }
  });

  function Group(els, viewport) {
    this.els = els;
    this.viewport = viewport;
  }

  var RECT_PROPS = ['width', 'height', 'left', 'right', 'top', 'bottom'];
  var FRACS_PROPS = ['possible', 'visible', 'viewport'];

  var get_value = function get_value(el, viewport, prop) {
    var obj;

    if (RECT_PROPS.includes(prop)) {
      obj = Rect.ofElement(el);
    } else if (FRACS_PROPS.includes(prop)) {
      obj = Fractions.of(el, viewport);
    }

    return obj ? obj[prop] : 0;
  };

  var sort_asc = function sort_asc(x, y) {
    return x.val - y.val;
  };

  var sort_desc = function sort_desc(x, y) {
    return y.val - x.val;
  };

  extend(Group.prototype, {
    sorted: function sorted(prop, desc) {
      var viewport = this.viewport;
      return $.map(this.els, function (el) {
        return {
          el: el,
          val: get_value(el, viewport, prop)
        };
      }).sort(desc ? sort_desc : sort_asc);
    },
    best: function best(prop, desc) {
      return this.els.length ? this.sorted(prop, desc)[0] : null;
    }
  });

  function ScrollState(el) {
    var content = Rect.ofContent(el, true);
    var viewport = Rect.ofViewport(el, true);
    var w = content.width - viewport.width;
    var h = content.height - viewport.height;
    this.content = content;
    this.viewport = viewport;
    this.width = w <= 0 ? null : viewport.left / w;
    this.height = h <= 0 ? null : viewport.top / h;
    this.left = viewport.left;
    this.top = viewport.top;
    this.right = content.right - viewport.right;
    this.bottom = content.bottom - viewport.bottom;
  }

  extend(ScrollState.prototype, {
    equals: function equals(that) {
      return equal(this, that, ['width', 'height', 'left', 'top', 'right', 'bottom', 'content', 'viewport']);
    }
  });

  function Viewport(el) {
    this.el = el || WIN;
  }

  extend(Viewport.prototype, {
    equals: function equals(that) {
      return equal(this, that, ['el']);
    },
    scrollState: function scrollState() {
      return new ScrollState(this.el);
    },
    scrollTo: function scrollTo(left, top, duration) {
      var $el = this.el === WIN ? $('html,body') : $(this.el);
      left = left || 0;
      top = top || 0;
      duration = isNaN(duration) ? 1000 : duration;
      $el.stop(true).animate({
        scrollLeft: left,
        scrollTop: top
      }, duration);
    },
    scrollToRect: function scrollToRect(rect, left, top, duration) {
      left = left || 0;
      top = top || 0;
      this.scrollTo(rect.left - left, rect.top - top, duration);
    },
    scrollToElement: function scrollToElement(el, left, top, duration) {
      var rect = Rect.ofElement(el).relativeTo(Rect.ofContent(this.el));
      this.scrollToRect(rect, left, top, duration);
    }
  });
  var callback_mixin = {
    context: null,
    updatedValue: function updatedValue() {
      return null;
    },
    init: function init(target) {
      this.callbacks = $.Callbacks('memory unique');
      this.curr_val = null;
      this.prev_val = null;
      $(target || WIN).on('load resize scroll', $.proxy(this.check, this));
    },
    bind: function bind(callback) {
      this.callbacks.add(callback);
    },
    unbind: function unbind(callback) {
      if (callback) {
        this.callbacks.remove(callback);
      } else {
        this.callbacks.empty();
      }
    },
    check: function check(event) {
      var val = this.updatedValue(event);

      if (val === undefined) {
        return false;
      }

      this.prev_val = this.curr_val;
      this.curr_val = val;
      this.callbacks.fireWith(this.context, [this.curr_val, this.prev_val]);
      return true;
    }
  };

  function FracsCallbacks(el, viewport) {
    this.context = el;
    this.viewport = viewport;
    this.init();
  }

  extend(FracsCallbacks.prototype, callback_mixin, {
    updatedValue: function updatedValue() {
      var val = Fractions.of(this.context, this.viewport);

      if (!val.equals(this.curr_val)) {
        return val;
      }

      return undefined;
    }
  });

  function GroupCallbacks(els, viewport, prop, desc) {
    this.context = new Group(els, viewport);
    this.property = prop;
    this.descending = desc;
    this.init();
  }

  extend(GroupCallbacks.prototype, callback_mixin, {
    updatedValue: function updatedValue() {
      var best = this.context.best(this.property, this.descending);

      if (best) {
        best = best.val > 0 ? best.el : null;

        if (this.curr_val !== best) {
          return best;
        }
      }

      return undefined;
    }
  });

  function ScrollStateCallbacks(el) {
    if (!el || el === WIN || el === DOC) {
      this.context = WIN;
    } else {
      this.context = el;
    }

    this.init(this.context);
  }

  extend(ScrollStateCallbacks.prototype, callback_mixin, {
    updatedValue: function updatedValue() {
      var val = new ScrollState(this.context);

      if (!val.equals(this.curr_val)) {
        return val;
      }

      return undefined;
    }
  }); // # Public API
  // accessible via `$(selector).fracs('<methodname>', ...)`.

  var methods = {
    // ## 'content'
    // Returns the content rect of the first selected element in content space.
    // If no element is selected it returns the document rect.
    content: function content(in_content_space) {
      return this.length ? Rect.ofContent(this[0], in_content_space) : null;
    },
    // ## 'envelope'
    // Returns the smallest rectangle that containes all selected elements.
    envelope: function envelope() {
      var res;
      $.each(this, function (idx, el) {
        var rect = Rect.ofElement(el);
        res = res ? res.envelope(rect) : rect;
      });
      return res;
    },
    // ## 'fracs'
    // This is the **default method**. So the first parameter `'fracs'`
    // can be omitted.
    //
    // Returns the fractions for the first selected element.
    //
    //      .fracs(): Fractions
    //
    // Binds a callback function that will be invoked if fractions have changed
    // after a `window resize` or `window scroll` event.
    //
    //      .fracs(callback(fracs: Fractions, prev_fracs: Fractions)): jQuery
    //
    // Unbinds the specified callback function.
    //
    //      .fracs('unbind', callback): jQuery
    //
    // Unbinds all callback functions.
    //
    //      .fracs('unbind'): jQuery
    //
    // Checks if fractions changed and if so invokes all bound callback functions.
    //
    //      .fracs('check'): jQuery
    fracs: function fracs(action, callback, viewport) {
      if (!is_typeof(action, 'string')) {
        viewport = callback;
        callback = action;
        action = null;
      }

      if (!is_fn(callback)) {
        viewport = callback;
        callback = null;
      }

      viewport = get_html_el(viewport);
      var ns = 'fracs.' + get_id(viewport);

      if (action === 'unbind') {
        return this.each(function cb() {
          var cbs = $(this).data(ns);

          if (cbs) {
            cbs.unbind(callback);
          }
        });
      } else if (action === 'check') {
        return this.each(function cb() {
          var cbs = $(this).data(ns);

          if (cbs) {
            cbs.check();
          }
        });
      } else if (is_fn(callback)) {
        return this.each(function cb() {
          var $this = $(this);
          var cbs = $this.data(ns);

          if (!cbs) {
            cbs = new FracsCallbacks(this, viewport);
            $this.data(ns, cbs);
          }

          cbs.bind(callback);
        });
      }

      return this.length ? Fractions.of(this[0], viewport) : null;
    },
    // ## 'intersection'
    // Returns the greatest rectangle that is contained in all selected elements.
    intersection: function intersection() {
      var res;
      $.each(this, function (idx, el) {
        var rect = Rect.ofElement(el);
        res = res ? res.intersection(rect) : rect;
      });
      return res;
    },
    // ## 'max'
    // Reduces the set of selected elements to those with the maximum value
    // of the specified property.
    // Valid values for property are `possible`, `visible`, `viewport`,
    // `width`, `height`, `left`, `right`, `top`, `bottom`.
    //
    //      .fracs('max', property: String): jQuery
    //
    // Binds a callback function to the set of selected elements that gets
    // triggert whenever the element with the highest value of the specified
    // property changes.
    //
    //      .fracs('max', property: String, callback(best: Element, prev_best: Element)): jQuery
    max: function max(prop, callback, viewport) {
      if (!is_fn(callback)) {
        viewport = callback;
        callback = null;
      }

      viewport = get_html_el(viewport);

      if (callback) {
        new GroupCallbacks(this, viewport, prop, true).bind(callback);
        return this;
      }

      return this.pushStack(new Group(this, viewport).best(prop, true).el);
    },
    // ## 'min'
    // Reduces the set of selected elements to those with the minimum value
    // of the specified property.
    // Valid values for property are `possible`, `visible`, `viewport`,
    // `width`, `height`, `left`, `right`, `top`, `bottom`.
    //
    //      .fracs('min', property: String): jQuery
    //
    // Binds a callback function to the set of selected elements that gets
    // triggert whenever the element with the lowest value of the specified
    // property changes.
    //
    //      .fracs('min', property: String, callback(best: Element, prev_best: Element)): jQuery
    min: function min(prop, callback, viewport) {
      if (!is_fn(callback)) {
        viewport = callback;
        callback = null;
      }

      viewport = get_html_el(viewport);

      if (callback) {
        new GroupCallbacks(this, viewport, prop).bind(callback);
        return this;
      }

      return this.pushStack(new Group(this, viewport).best(prop).el);
    },
    // ## 'rect'
    // Returns the dimensions for the first selected element in document space.
    rect: function rect() {
      return this.length ? Rect.ofElement(this[0]) : null;
    },
    // ## 'scrollState'
    // Returns the current scroll state for the first selected element.
    //
    //      .fracs('scrollState'): ScrollState
    //
    // Binds a callback function that will be invoked if scroll state has changed
    // after a `resize` or `scroll` event.
    //
    //      .fracs('scrollState', callback(scrollState: scrollState, prevScrollState: scrollState)): jQuery
    //
    // Unbinds the specified callback function.
    //
    //      .fracs('scrollState', 'unbind', callback): jQuery
    //
    // Unbinds all callback functions.
    //
    //      .fracs('scrollState', 'unbind'): jQuery
    //
    // Checks if scroll state changed and if so invokes all bound callback functions.
    //
    //      .fracs('scrollState', 'check'): jQuery
    scrollState: function scrollState(action, callback) {
      var ns = 'fracs.scrollState';

      if (!is_typeof(action, 'string')) {
        callback = action;
        action = null;
      }

      if (action === 'unbind') {
        return this.each(function cb() {
          var cbs = $(this).data(ns);

          if (cbs) {
            cbs.unbind(callback);
          }
        });
      } else if (action === 'check') {
        return this.each(function cb() {
          var cbs = $(this).data(ns);

          if (cbs) {
            cbs.check();
          }
        });
      } else if (is_fn(callback)) {
        return this.each(function cb() {
          var $this = $(this);
          var cbs = $this.data(ns);

          if (!cbs) {
            cbs = new ScrollStateCallbacks(this);
            $this.data(ns, cbs);
          }

          cbs.bind(callback);
        });
      }

      return this.length ? new ScrollState(this[0]) : null;
    },
    // ## 'scroll'
    // Scrolls the selected elements relative to its current position,
    // `left` and `top` paddings default to `0`, `duration` to `1000`.
    //
    //      .fracs('scroll', element: HTMLElement/jQuery, [left: int,] [top: int,] [duration: int]): jQuery
    scroll: function scroll(left, top, duration) {
      return this.each(function cb() {
        new Viewport(this).scroll(left, top, duration);
      });
    },
    // ## 'scrollTo'
    // Scrolls the selected elements to the specified element or an absolute position,
    // `left` and `top` paddings default to `0`, `duration` to `1000`.
    //
    //      .fracs('scrollTo', element: HTMLElement/jQuery, [left: int,] [top: int,] [duration: int]): jQuery
    //      .fracs('scrollTo', [left: int,] [top: int,] [duration: int]): jQuery
    scrollTo: function scrollTo(el, left, top, duration) {
      if ($.isNumeric(el)) {
        duration = top;
        top = left;
        left = el;
        el = null;
      }

      el = get_html_el(el);
      return this.each(function cb() {
        if (el) {
          new Viewport(this).scrollToElement(el, left, top, duration);
        } else {
          new Viewport(this).scrollTo(left, top, duration);
        }
      });
    },
    // ## 'scrollToThis'
    // Scrolls the viewport (defaults to window) to the first selected element in the specified time,
    // `left` and `top` paddings default to `0`, `duration` to `1000`.
    scrollToThis: function scrollToThis(left, top, duration, viewport) {
      viewport = new Viewport(get_html_el(viewport));
      viewport.scrollToElement(this[0], left, top, duration);
      return this;
    },
    // ## 'sort'
    // Sorts the set of selected elements by the specified prop.
    // Valid values for prop are `possible`, `visible`, `viewport`,
    // `width`, `height`, `left`, `right`, `top`, `bottom`. The default
    // sort order is descending.
    sort: function sort(prop, ascending, viewport) {
      if (!is_typeof(ascending, 'boolean')) {
        viewport = ascending;
        ascending = null;
      }

      viewport = get_html_el(viewport);
      return this.pushStack($.map(new Group(this, viewport).sorted(prop, !ascending), function (entry) {
        return entry.el;
      }));
    },
    // ## 'viewport'
    // Returns the current viewport of the first selected element.
    // If no element is selected it returns the document's viewport.
    viewport: function viewport(in_content_space) {
      return this.length ? Rect.ofViewport(this[0], in_content_space) : null;
    }
  };

  $.fracs = function (rect, viewport) {
    return Fractions.of(rect, viewport);
  };

  $.fracs._ = {
    // published for testing
    Rect: Rect,
    Fractions: Fractions,
    Group: Group,
    ScrollState: ScrollState,
    Viewport: Viewport,
    FracsCallbacks: FracsCallbacks,
    GroupCallbacks: GroupCallbacks,
    ScrollStateCallbacks: ScrollStateCallbacks
  };

  $.fn.fracs = function main() {
    var method = methods.fracs;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (is_fn(methods[args[0]])) {
      method = methods[args.shift()];
    }

    return Reflect.apply(method, this, args);
  };
})();