(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.autoComplete = factory());
})(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
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
          return data.src(query).then($return, $error);
        }
        return $return(data.src);
      }).then(function ($await_4) {
        try {
          ctx.feedback = data.store = $await_4;
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
