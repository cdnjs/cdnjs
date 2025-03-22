(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.autoComplete = factory());
})(this, (function () { 'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
        t && (r = t);
        var n = 0,
          F = function () {};
        return {
          s: F,
          n: function () {
            return n >= r.length ? {
              done: !0
            } : {
              done: !1,
              value: r[n++]
            };
          },
          e: function (r) {
            throw r;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      a = !0,
      u = !1;
    return {
      s: function () {
        t = t.call(r);
      },
      n: function () {
        var r = t.next();
        return a = r.done, r;
      },
      e: function (r) {
        u = !0, o = r;
      },
      f: function () {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  var select$1 = function select(element) {
    return typeof element === "string" ? document.querySelector(element) : element();
  };
  var create = function create(tag, options) {
    var el = typeof tag === "string" ? document.createElement(tag) : tag;
    for (var key in options) {
      var val = options[key];
      if (key === "inside") {
        val.append(el);
      } else if (key === "dest") {
        select$1(val[0]).insertAdjacentElement(val[1], el);
      } else if (key === "around") {
        var ref = val;
        ref.parentNode.insertBefore(el, ref);
        el.append(ref);
        if (ref.getAttribute("autofocus") != null) ref.focus();
      } else if (key in el) {
        el[key] = val;
      } else {
        el.setAttribute(key, val);
      }
    }
    return el;
  };
  var getQuery = function getQuery(field) {
    return field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement ? field.value : field.innerHTML;
  };
  var format = function format(value, diacritics) {
    value = String(value).toLowerCase();
    return diacritics ? value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").normalize("NFC") : value;
  };
  var debounce = function debounce(callback, duration) {
    var timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        return callback();
      }, duration);
    };
  };
  var checkTrigger = function checkTrigger(query, condition, threshold) {
    return condition ? condition(query) : query.length >= threshold;
  };
  var mark = function mark(value, cls) {
    return create("mark", _objectSpread2({
      innerHTML: value
    }, typeof cls === "string" && {
      "class": cls
    })).outerHTML;
  };

  var configure = (function (ctx) {
    var name = ctx.name,
      options = ctx.options,
      resultsList = ctx.resultsList,
      resultItem = ctx.resultItem;
    for (var option in options) {
      if (_typeof(options[option]) === "object") {
        if (!ctx[option]) ctx[option] = {};
        for (var subOption in options[option]) {
          ctx[option][subOption] = options[option][subOption];
        }
      } else {
        ctx[option] = options[option];
      }
    }
    ctx.selector = ctx.selector || "#" + name;
    resultsList.destination = resultsList.destination || ctx.selector;
    resultsList.id = resultsList.id || name + "_list_" + ctx.id;
    resultItem.id = resultItem.id || name + "_result";
    ctx.input = select$1(ctx.selector);
  });

  var eventEmitter = (function (name, ctx) {
    ctx.input.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      detail: ctx.feedback,
      cancelable: true
    }));
  });

  var search = (function (query, record, options) {
    var _ref = options || {},
      mode = _ref.mode,
      diacritics = _ref.diacritics,
      highlight = _ref.highlight;
    var nRecord = format(record, diacritics);
    record = String(record);
    query = format(query, diacritics);
    if (mode === "loose") {
      query = query.replace(/ /g, "");
      var qLength = query.length;
      var cursor = 0;
      var match = Array.from(record).map(function (character, index) {
        if (cursor < qLength && nRecord[index] === query[cursor]) {
          character = highlight ? mark(character, highlight) : character;
          cursor++;
        }
        return character;
      }).join("");
      if (cursor === qLength) return match;
    } else {
      var _match = nRecord.indexOf(query);
      if (~_match) {
        query = record.substring(_match, _match + query.length);
        _match = highlight ? record.replace(query, mark(query, highlight)) : record;
        return _match;
      }
    }
  });

  var getData = function getData(ctx, query) {
    return new Promise(function ($return, $error) {
      var data;
      data = ctx.data;
      if (data.cache && data.store) return $return();
      return new Promise(function ($return, $error) {
        if (typeof data.src === "function") {
          return new Promise(function ($return, $error) {
            if (data.src.constructor.name === "AsyncFunction") {
              return data.src(query).then($return, $error);
            }
            return $return(data.src(query));
          }).then($return, $error);
        }
        return $return(data.src);
      }).then(function ($await_7) {
        try {
          ctx.feedback = data.store = $await_7;
          eventEmitter("response", ctx);
          return $return();
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }, $error);
    });
  };
  var findMatches = function findMatches(query, ctx) {
    var data = ctx.data,
      searchEngine = ctx.searchEngine;
    var matches = [];
    data.store.forEach(function (value, index) {
      var find = function find(key) {
        var record = key ? value[key] : value;
        var match = typeof searchEngine === "function" ? searchEngine(query, record) : search(query, record, {
          mode: searchEngine,
          diacritics: ctx.diacritics,
          highlight: ctx.resultItem.highlight
        });
        if (!match) return;
        var result = {
          match: match,
          value: value
        };
        if (key) result.key = key;
        matches.push(result);
      };
      if (data.keys) {
        var _iterator = _createForOfIteratorHelper(data.keys),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var key = _step.value;
            find(key);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        find();
      }
    });
    if (data.filter) matches = data.filter(matches);
    var results = matches.slice(0, ctx.resultsList.maxResults);
    ctx.feedback = {
      query: query,
      matches: matches,
      results: results
    };
    eventEmitter("results", ctx);
  };

  var Expand = "aria-expanded";
  var Active = "aria-activedescendant";
  var Selected = "aria-selected";
  var feedback = function feedback(ctx, index) {
    ctx.feedback.selection = _objectSpread2({
      index: index
    }, ctx.feedback.results[index]);
  };
  var render = function render(ctx) {
    var resultsList = ctx.resultsList,
      list = ctx.list,
      resultItem = ctx.resultItem,
      feedback = ctx.feedback;
    var matches = feedback.matches,
      results = feedback.results;
    ctx.cursor = -1;
    list.innerHTML = "";
    if (matches.length || resultsList.noResults) {
      var fragment = new DocumentFragment();
      results.forEach(function (result, index) {
        var element = create(resultItem.tag, _objectSpread2({
          id: "".concat(resultItem.id, "_").concat(index),
          role: "option",
          innerHTML: result.match,
          inside: fragment
        }, resultItem["class"] && {
          "class": resultItem["class"]
        }));
        if (resultItem.element) resultItem.element(element, result);
      });
      list.append(fragment);
      if (resultsList.element) resultsList.element(list, feedback);
      open(ctx);
    } else {
      close(ctx);
    }
  };
  var open = function open(ctx) {
    if (ctx.isOpen) return;
    (ctx.wrapper || ctx.input).setAttribute(Expand, true);
    ctx.list.removeAttribute("hidden");
    ctx.isOpen = true;
    eventEmitter("open", ctx);
  };
  var close = function close(ctx) {
    if (!ctx.isOpen) return;
    (ctx.wrapper || ctx.input).setAttribute(Expand, false);
    ctx.input.setAttribute(Active, "");
    ctx.list.setAttribute("hidden", "");
    ctx.isOpen = false;
    eventEmitter("close", ctx);
  };
  var goTo = function goTo(index, ctx) {
    var resultItem = ctx.resultItem;
    var results = ctx.list.getElementsByTagName(resultItem.tag);
    var cls = resultItem.selected ? resultItem.selected.split(" ") : false;
    if (ctx.isOpen && results.length) {
      var _results$index$classL;
      var state = ctx.cursor;
      if (index >= results.length) index = 0;
      if (index < 0) index = results.length - 1;
      ctx.cursor = index;
      if (state > -1) {
        var _results$state$classL;
        results[state].removeAttribute(Selected);
        if (cls) (_results$state$classL = results[state].classList).remove.apply(_results$state$classL, _toConsumableArray(cls));
      }
      results[index].setAttribute(Selected, true);
      if (cls) (_results$index$classL = results[index].classList).add.apply(_results$index$classL, _toConsumableArray(cls));
      ctx.input.setAttribute(Active, results[ctx.cursor].id);
      ctx.list.scrollTop = results[index].offsetTop - ctx.list.clientHeight + results[index].clientHeight + 5;
      ctx.feedback.cursor = ctx.cursor;
      feedback(ctx, index);
      eventEmitter("navigate", ctx);
    }
  };
  var next = function next(ctx) {
    goTo(ctx.cursor + 1, ctx);
  };
  var previous = function previous(ctx) {
    goTo(ctx.cursor - 1, ctx);
  };
  var select = function select(ctx, event, index) {
    index = index >= 0 ? index : ctx.cursor;
    if (index < 0) return;
    ctx.feedback.event = event;
    feedback(ctx, index);
    eventEmitter("selection", ctx);
    close(ctx);
  };
  var click = function click(event, ctx) {
    var itemTag = ctx.resultItem.tag.toUpperCase();
    var items = Array.from(ctx.list.querySelectorAll(itemTag));
    var item = event.target.closest(itemTag);
    if (item && item.nodeName === itemTag) {
      select(ctx, event, items.indexOf(item));
    }
  };
  var navigate = function navigate(event, ctx) {
    switch (event.keyCode) {
      case 40:
      case 38:
        event.preventDefault();
        event.keyCode === 40 ? next(ctx) : previous(ctx);
        break;
      case 13:
        if (!ctx.submit) event.preventDefault();
        if (ctx.cursor >= 0) select(ctx, event);
        break;
      case 9:
        if (ctx.resultsList.tabSelect && ctx.cursor >= 0) select(ctx, event);
        break;
      case 27:
        ctx.input.value = "";
        eventEmitter('clear', ctx);
        close(ctx);
        break;
    }
  };

  function start (ctx, q) {
    var _this = this;
    return new Promise(function ($return, $error) {
      var queryVal, condition;
      queryVal = q || getQuery(ctx.input);
      queryVal = ctx.query ? ctx.query(queryVal) : queryVal;
      condition = checkTrigger(queryVal, ctx.trigger, ctx.threshold);
      if (condition) {
        return getData(ctx, queryVal).then(function ($await_2) {
          try {
            if (ctx.feedback instanceof Error) return $return();
            findMatches(queryVal, ctx);
            if (ctx.resultsList) render(ctx);
            return $If_1.call(_this);
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }, $error);
      } else {
        close(ctx);
        return $If_1.call(_this);
      }
      function $If_1() {
        return $return();
      }
    });
  }

  var eventsManager = function eventsManager(events, callback) {
    for (var element in events) {
      for (var event in events[element]) {
        callback(element, event);
      }
    }
  };
  var addEvents = function addEvents(ctx) {
    var events = ctx.events;
    var run = debounce(function () {
      return start(ctx);
    }, ctx.debounce);
    var publicEvents = ctx.events = _objectSpread2({
      input: _objectSpread2({}, events && events.input)
    }, ctx.resultsList && {
      list: events ? _objectSpread2({}, events.list) : {}
    });
    var privateEvents = {
      input: {
        input: function input() {
          run();
        },
        keydown: function keydown(event) {
          navigate(event, ctx);
        },
        blur: function blur() {
          close(ctx);
        }
      },
      list: {
        mousedown: function mousedown(event) {
          event.preventDefault();
        },
        click: function click$1(event) {
          click(event, ctx);
        }
      }
    };
    eventsManager(privateEvents, function (element, event) {
      if (!ctx.resultsList && event !== "input") return;
      if (publicEvents[element][event]) return;
      publicEvents[element][event] = privateEvents[element][event];
    });
    eventsManager(publicEvents, function (element, event) {
      ctx[element].addEventListener(event, publicEvents[element][event]);
    });
  };
  var removeEvents = function removeEvents(ctx) {
    eventsManager(ctx.events, function (element, event) {
      ctx[element].removeEventListener(event, ctx.events[element][event]);
    });
  };

  function init (ctx) {
    var _this = this;
    return new Promise(function ($return, $error) {
      var placeHolder, resultsList, parentAttrs;
      placeHolder = ctx.placeHolder;
      resultsList = ctx.resultsList;
      parentAttrs = {
        role: "combobox",
        "aria-owns": resultsList.id,
        "aria-haspopup": true,
        "aria-expanded": false
      };
      create(ctx.input, _objectSpread2(_objectSpread2({
        "aria-controls": resultsList.id,
        "aria-autocomplete": "both"
      }, placeHolder && {
        placeholder: placeHolder
      }), !ctx.wrapper && _objectSpread2({}, parentAttrs)));
      if (ctx.wrapper) ctx.wrapper = create("div", _objectSpread2({
        around: ctx.input,
        "class": ctx.name + "_wrapper"
      }, parentAttrs));
      if (resultsList) ctx.list = create(resultsList.tag, _objectSpread2({
        dest: [resultsList.destination, resultsList.position],
        id: resultsList.id,
        role: "listbox",
        hidden: "hidden"
      }, resultsList["class"] && {
        "class": resultsList["class"]
      }));
      addEvents(ctx);
      if (ctx.data.cache) {
        return getData(ctx).then(function ($await_2) {
          try {
            return $If_1.call(_this);
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }, $error);
      }
      function $If_1() {
        eventEmitter("init", ctx);
        return $return();
      }
      return $If_1.call(_this);
    });
  }

  function extend (autoComplete) {
    var prototype = autoComplete.prototype;
    prototype.init = function () {
      init(this);
    };
    prototype.start = function (query) {
      start(this, query);
    };
    prototype.unInit = function () {
      if (this.wrapper) {
        var parentNode = this.wrapper.parentNode;
        parentNode.insertBefore(this.input, this.wrapper);
        parentNode.removeChild(this.wrapper);
      }
      removeEvents(this);
    };
    prototype.open = function () {
      open(this);
    };
    prototype.close = function () {
      close(this);
    };
    prototype.goTo = function (index) {
      goTo(index, this);
    };
    prototype.next = function () {
      next(this);
    };
    prototype.previous = function () {
      previous(this);
    };
    prototype.select = function (index) {
      select(this, null, index);
    };
    prototype.search = function (query, record, options) {
      return search(query, record, options);
    };
  }

  function autoComplete(config) {
    this.options = config;
    this.id = autoComplete.instances = (autoComplete.instances || 0) + 1;
    this.name = "autoComplete";
    this.wrapper = 1;
    this.threshold = 1;
    this.debounce = 0;
    this.resultsList = {
      position: "afterend",
      tag: "ul",
      maxResults: 5
    };
    this.resultItem = {
      tag: "li"
    };
    configure(this);
    extend.call(this, autoComplete);
    init(this);
  }

  return autoComplete;

}));
