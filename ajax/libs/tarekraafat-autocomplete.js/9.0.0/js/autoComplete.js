(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.autoComplete = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
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

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
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

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
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
        it = o[Symbol.iterator]();
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

  var inputComponent = (function (config) {
    config.inputField.setAttribute("role", "combobox");
    config.inputField.setAttribute("aria-haspopup", true);
    config.inputField.setAttribute("aria-expanded", false);
    config.inputField.setAttribute("aria-controls", config.resultsList.idName);
    config.inputField.setAttribute("aria-autocomplete", "both");
  });

  var createList = (function (config) {
    var list = document.createElement(config.resultsList.element);
    list.setAttribute("id", config.resultsList.idName);
    list.setAttribute("class", config.resultsList.className);
    list.setAttribute("role", "listbox");
    list.setAttribute("tabindex", "-1");
    if (config.resultsList.container) config.resultsList.container(list);
    var destination = "string" === typeof config.resultsList.destination ? document.querySelector(config.resultsList.destination) : config.resultsList.destination();
    destination.insertAdjacentElement(config.resultsList.position, list);
    return list;
  });

  var createItem = (function (item, index, config) {
    var result = document.createElement(config.resultItem.element);
    result.setAttribute("id", "".concat(config.resultItem.idName, "_").concat(index));
    result.setAttribute("class", config.resultItem.className);
    result.setAttribute("role", "option");
    result.innerHTML = item.match;
    if (config.resultItem.content) config.resultItem.content(item, result);
    return result;
  });

  var eventEmitter = (function (target, detail, name) {
    target.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      detail: detail,
      cancelable: true
    }));
  });

  var closeList = function closeList(config, element) {
    var list = document.getElementById(config.resultsList.idName);
    if (list && element !== config.inputField) {
      list.remove();
      config.inputField.removeAttribute("aria-activedescendant");
      config.inputField.setAttribute("aria-expanded", false);
      eventEmitter(config.inputField, null, "close");
    }
  };
  var generateList = function generateList(config, data, matches) {
    var list = document.getElementById(config.resultsList.idName);
    if (list) {
      list.innerHTML = "";
    } else {
      list = createList(config);
    }
    config.inputField.setAttribute("aria-expanded", true);
    if (matches.length) {
      var _loop = function _loop(index) {
        var item = data.results[index];
        var resultItem = createItem(item, index, config);
        resultItem.addEventListener("click", function (event) {
          var dataFeedback = {
            event: event,
            matches: matches,
            input: data.input,
            query: data.query,
            results: data.results,
            selection: _objectSpread2(_objectSpread2({}, item), {}, {
              index: index
            })
          };
          if (config.onSelection) config.onSelection(dataFeedback);
        });
        list.appendChild(resultItem);
      };
      for (var index = 0; index < data.results.length; index++) {
        _loop(index);
      }
    } else {
      if (!config.resultsList.noResults) {
        list.remove();
      } else {
        config.resultsList.noResults(list, data.query);
      }
    }
  };

  var keyboardEvent = "keydown";
  var navigate = function navigate(config, dataFeedback) {
    var currentFocus = -1;
    var update = function update(event, list, state) {
      event.preventDefault();
      if (state) {
        currentFocus++;
      } else {
        currentFocus--;
      }
      addActive(list);
      config.inputField.setAttribute("aria-activedescendant", list[currentFocus].id);
      eventEmitter(event.srcElement, _objectSpread2(_objectSpread2({
        event: event
      }, dataFeedback), {}, {
        selection: dataFeedback.results[currentFocus]
      }), "navigate");
    };
    var removeActive = function removeActive(list) {
      for (var index = 0; index < list.length; index++) {
        list[index].removeAttribute("aria-selected");
        if (config.resultItem.selected.className) list[index].classList.remove(config.resultItem.selected.className);
      }
    };
    var addActive = function addActive(list) {
      if (!list) return false;
      removeActive(list);
      if (currentFocus >= list.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = list.length - 1;
      list[currentFocus].setAttribute("aria-selected", "true");
      if (config.resultItem.selected.className) list[currentFocus].classList.add(config.resultItem.selected.className);
    };
    var navigation = function navigation(event) {
      var list = document.getElementById(config.resultsList.idName);
      if (!list) {
        config.inputField.removeEventListener(keyboardEvent, navigate);
      } else {
        list = list.getElementsByTagName(config.resultItem.element);
        switch (event.keyCode) {
          case 27:
            config.inputField.value = "";
            closeList(config);
            break;
          case 9:
          case 40:
            update(event, list, true);
            break;
          case 38:
            update(event, list, false);
            break;
          case 13:
            event.preventDefault();
            if (currentFocus > -1) {
              list[currentFocus].click();
              closeList(config);
            }
            break;
        }
      }
    };
    var navigate = config.resultsList.navigation || navigation;
    if (config.inputField.autoCompleteNavigate) config.inputField.removeEventListener(keyboardEvent, config.inputField.autoCompleteNavigate);
    config.inputField.autoCompleteNavigate = navigate;
    config.inputField.addEventListener(keyboardEvent, navigate);
  };

  var searchEngine = (function (query, record, config) {
    var recordLowerCase = config.diacritics ? record.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").normalize("NFC") : record.toLowerCase();
    if (config.searchEngine === "loose") {
      query = query.replace(/ /g, "");
      var match = [];
      var searchPosition = 0;
      for (var number = 0; number < recordLowerCase.length; number++) {
        var recordChar = record[number];
        if (searchPosition < query.length && recordLowerCase[number] === query[searchPosition]) {
          recordChar = config.resultItem.highlight.render ? "<span class=\"".concat(config.resultItem.highlight.className, "\">").concat(recordChar, "</span>") : recordChar;
          searchPosition++;
        }
        match.push(recordChar);
      }
      if (searchPosition === query.length) {
        return match.join("");
      }
    } else {
      if (recordLowerCase.includes(query)) {
        var pattern = new RegExp(query.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "i");
        query = pattern.exec(record);
        var _match = config.resultItem.highlight.render ? record.replace(query, "<span class=\"".concat(config.resultItem.highlight.className, "\">").concat(query, "</span>")) : record;
        return _match;
      }
    }
  });

  var getInputValue = function getInputValue(inputField) {
    return inputField instanceof HTMLInputElement || inputField instanceof HTMLTextAreaElement ? inputField.value.toLowerCase() : inputField.innerHTML.toLowerCase();
  };
  var prepareQueryValue = function prepareQueryValue(inputValue, config) {
    return config.query && config.query.manipulate ? config.query.manipulate(inputValue) : config.diacritics ? inputValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").normalize("NFC") : inputValue;
  };
  var checkTriggerCondition = function checkTriggerCondition(config, event, queryValue) {
    return config.trigger.condition ? config.trigger.condition(event, queryValue) : queryValue.length >= config.threshold && queryValue.replace(/ /g, "").length;
  };
  var listMatchingResults = function listMatchingResults(config, query) {
    var resList = [];
    var _loop = function _loop(index) {
      var record = config.data.store[index];
      var search = function search(key) {
        var recordValue = (key ? record[key] : record).toString();
        if (recordValue) {
          var match = typeof config.searchEngine === "function" ? config.searchEngine(query, recordValue) : searchEngine(query, recordValue, config);
          if (match && key) {
            resList.push({
              key: key,
              index: index,
              match: match,
              value: record
            });
          } else if (match && !key) {
            resList.push({
              index: index,
              match: match,
              value: record
            });
          }
        }
      };
      if (config.data.key) {
        var _iterator = _createForOfIteratorHelper(config.data.key),
            _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var key = _step.value;
            search(key);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        search();
      }
    };
    for (var index = 0; index < config.data.store.length; index++) {
      _loop(index);
    }
    return resList;
  };

  var debouncer = (function (callback, delay) {
    var inDebounce;
    return function () {
      var context = this;
      var args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(function () {
        return callback.apply(context, args);
      }, delay);
    };
  });

  var autoComplete = function () {
    function autoComplete(config) {
      _classCallCheck(this, autoComplete);
      var _config$selector = config.selector,
          selector = _config$selector === void 0 ? "#autoComplete" : _config$selector,
          placeHolder = config.placeHolder,
          _config$observer = config.observer,
          observer = _config$observer === void 0 ? false : _config$observer,
          _config$data = config.data,
          src = _config$data.src,
          key = _config$data.key,
          _config$data$cache = _config$data.cache,
          cache = _config$data$cache === void 0 ? false : _config$data$cache,
          store = _config$data.store,
          results = _config$data.results,
          query = config.query,
          _config$trigger = config.trigger;
      _config$trigger = _config$trigger === void 0 ? {} : _config$trigger;
      var _config$trigger$event = _config$trigger.event,
          event = _config$trigger$event === void 0 ? ["input"] : _config$trigger$event,
          _config$trigger$condi = _config$trigger.condition,
          condition = _config$trigger$condi === void 0 ? false : _config$trigger$condi,
          _config$threshold = config.threshold,
          threshold = _config$threshold === void 0 ? 1 : _config$threshold,
          _config$debounce = config.debounce,
          debounce = _config$debounce === void 0 ? 0 : _config$debounce,
          _config$diacritics = config.diacritics,
          diacritics = _config$diacritics === void 0 ? false : _config$diacritics,
          _config$searchEngine = config.searchEngine,
          searchEngine = _config$searchEngine === void 0 ? "strict" : _config$searchEngine,
          feedback = config.feedback,
          _config$resultsList = config.resultsList;
      _config$resultsList = _config$resultsList === void 0 ? {} : _config$resultsList;
      var _config$resultsList$r = _config$resultsList.render,
          resultsListRender = _config$resultsList$r === void 0 ? true : _config$resultsList$r,
          _config$resultsList$c = _config$resultsList.container,
          container = _config$resultsList$c === void 0 ? false : _config$resultsList$c,
          destination = _config$resultsList.destination,
          _config$resultsList$p = _config$resultsList.position,
          position = _config$resultsList$p === void 0 ? "afterend" : _config$resultsList$p,
          _config$resultsList$e = _config$resultsList.element,
          resultsListElement = _config$resultsList$e === void 0 ? "ul" : _config$resultsList$e,
          _config$resultsList$i = _config$resultsList.idName,
          resultsListId = _config$resultsList$i === void 0 ? "autoComplete_list" : _config$resultsList$i,
          _config$resultsList$c2 = _config$resultsList.className,
          resultsListClass = _config$resultsList$c2 === void 0 ? "autoComplete_list" : _config$resultsList$c2,
          _config$resultsList$m = _config$resultsList.maxResults,
          maxResults = _config$resultsList$m === void 0 ? 5 : _config$resultsList$m,
          _config$resultsList$n = _config$resultsList.navigation,
          navigation = _config$resultsList$n === void 0 ? false : _config$resultsList$n,
          noResults = _config$resultsList.noResults,
          _config$resultItem = config.resultItem;
      _config$resultItem = _config$resultItem === void 0 ? {} : _config$resultItem;
      var _config$resultItem$co = _config$resultItem.content,
          content = _config$resultItem$co === void 0 ? false : _config$resultItem$co,
          _config$resultItem$el = _config$resultItem.element,
          resultItemElement = _config$resultItem$el === void 0 ? "li" : _config$resultItem$el,
          resultItemId = _config$resultItem.idName,
          _config$resultItem$cl = _config$resultItem.className,
          resultItemClass = _config$resultItem$cl === void 0 ? "autoComplete_result" : _config$resultItem$cl,
          _config$resultItem$hi = _config$resultItem.highlight;
      _config$resultItem$hi = _config$resultItem$hi === void 0 ? {} : _config$resultItem$hi;
      var _config$resultItem$hi2 = _config$resultItem$hi.render,
          highlightRender = _config$resultItem$hi2 === void 0 ? false : _config$resultItem$hi2,
          _config$resultItem$hi3 = _config$resultItem$hi.className,
          highlightClass = _config$resultItem$hi3 === void 0 ? "autoComplete_highlighted" : _config$resultItem$hi3,
          _config$resultItem$se = _config$resultItem.selected;
      _config$resultItem$se = _config$resultItem$se === void 0 ? {} : _config$resultItem$se;
      var _config$resultItem$se2 = _config$resultItem$se.className,
          selectedClass = _config$resultItem$se2 === void 0 ? "autoComplete_selected" : _config$resultItem$se2,
          onSelection = config.onSelection;
      this.selector = selector;
      this.observer = observer;
      this.placeHolder = placeHolder;
      this.data = {
        src: src,
        key: key,
        cache: cache,
        store: store,
        results: results
      };
      this.query = query;
      this.trigger = {
        event: event,
        condition: condition
      };
      this.threshold = threshold;
      this.debounce = debounce;
      this.diacritics = diacritics;
      this.searchEngine = searchEngine;
      this.feedback = feedback;
      this.resultsList = {
        render: resultsListRender,
        container: container,
        destination: destination || this.selector,
        position: position,
        element: resultsListElement,
        idName: resultsListId,
        className: resultsListClass,
        maxResults: maxResults,
        navigation: navigation,
        noResults: noResults
      };
      this.resultItem = {
        content: content,
        element: resultItemElement,
        idName: resultItemId,
        className: resultItemClass,
        highlight: {
          render: highlightRender,
          className: highlightClass
        },
        selected: {
          className: selectedClass
        }
      };
      this.onSelection = onSelection;
      this.inputField = typeof this.selector === "string" ? document.querySelector(this.selector) : this.selector();
      this.observer ? this.preInit() : this.init();
    }
    _createClass(autoComplete, [{
      key: "start",
      value: function start(input, query) {
        var _this = this;
        var results = this.data.results ? this.data.results(listMatchingResults(this, query)) : listMatchingResults(this, query);
        var dataFeedback = {
          input: input,
          query: query,
          matches: results,
          results: results.slice(0, this.resultsList.maxResults)
        };
        eventEmitter(this.inputField, dataFeedback, "results");
        if (!this.resultsList.render) return this.feedback(dataFeedback);
        generateList(this, dataFeedback, results);
        navigate(this, dataFeedback);
        eventEmitter(this.inputField, dataFeedback, "open");
        document.addEventListener("click", function (event) {
          return closeList(_this, event.target);
        });
      }
    }, {
      key: "dataStore",
      value: function dataStore() {
        var _this2 = this;
        return new Promise(function ($return, $error) {
          if (_this2.data.cache && _this2.data.store) return $return(null);
          return new Promise(function ($return, $error) {
            if (typeof _this2.data.src === "function") {
              return _this2.data.src().then($return, $error);
            }
            return $return(_this2.data.src);
          }).then(function ($await_5) {
            try {
              _this2.data.store = $await_5;
              eventEmitter(_this2.inputField, _this2.data.store, "fetch");
              return $return();
            } catch ($boundEx) {
              return $error($boundEx);
            }
          }, $error);
        });
      }
    }, {
      key: "compose",
      value: function compose(event) {
        var _this3 = this;
        return new Promise(function ($return, $error) {
          var input, query, triggerCondition;
          input = getInputValue(_this3.inputField);
          query = prepareQueryValue(input, _this3);
          triggerCondition = checkTriggerCondition(_this3, event, query);
          if (triggerCondition) {
            return _this3.dataStore().then(function ($await_6) {
              try {
                _this3.start(input, query);
                return $If_3.call(_this3);
              } catch ($boundEx) {
                return $error($boundEx);
              }
            }, $error);
          } else {
            closeList(_this3);
            return $If_3.call(_this3);
          }
          function $If_3() {
            return $return();
          }
        });
      }
    }, {
      key: "init",
      value: function init() {
        var _this4 = this;
        inputComponent(this);
        if (this.placeHolder) this.inputField.setAttribute("placeholder", this.placeHolder);
        this.hook = debouncer(function (event) {
          _this4.compose(event);
        }, this.debounce);
        this.trigger.event.forEach(function (eventType) {
          _this4.inputField.removeEventListener(eventType, _this4.hook);
          _this4.inputField.addEventListener(eventType, _this4.hook);
        });
        eventEmitter(this.inputField, null, "init");
      }
    }, {
      key: "preInit",
      value: function preInit() {
        var _this5 = this;
        var config = {
          childList: true,
          subtree: true
        };
        var callback = function callback(mutationsList, observer) {
          var _iterator = _createForOfIteratorHelper(mutationsList),
              _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var mutation = _step.value;
              if (_this5.inputField) {
                observer.disconnect();
                _this5.init();
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        };
        var observer = new MutationObserver(callback);
        observer.observe(document, config);
      }
    }, {
      key: "unInit",
      value: function unInit() {
        this.inputField.removeEventListener("input", this.hook);
        eventEmitter(this.inputField, null, "unInit");
      }
    }]);
    return autoComplete;
  }();

  return autoComplete;

})));
