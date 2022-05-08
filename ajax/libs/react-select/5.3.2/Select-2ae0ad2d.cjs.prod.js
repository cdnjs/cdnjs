"use strict";

var _extends = require("@babel/runtime/helpers/extends"), index = require("./index-3df9f8fb.cjs.prod.js"), _classCallCheck = require("@babel/runtime/helpers/classCallCheck"), _createClass = require("@babel/runtime/helpers/createClass"), _inherits = require("@babel/runtime/helpers/inherits"), _toConsumableArray = require("@babel/runtime/helpers/toConsumableArray"), React = require("react"), react = require("@emotion/react"), memoizeOne = require("memoize-one"), _objectWithoutProperties = require("@babel/runtime/helpers/objectWithoutProperties");

function _interopDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  return e && Object.keys(e).forEach((function(k) {
    if ("default" !== k) {
      var d = Object.getOwnPropertyDescriptor(e, k);
      Object.defineProperty(n, k, d.get ? d : {
        enumerable: !0,
        get: function() {
          return e[k];
        }
      });
    }
  })), n.default = e, Object.freeze(n);
}

var _extends__default = _interopDefault(_extends), _classCallCheck__default = _interopDefault(_classCallCheck), _createClass__default = _interopDefault(_createClass), _inherits__default = _interopDefault(_inherits), _toConsumableArray__default = _interopDefault(_toConsumableArray), React__namespace = _interopNamespace(React), memoizeOne__default = _interopDefault(memoizeOne), _objectWithoutProperties__default = _interopDefault(_objectWithoutProperties);

function _EMOTION_STRINGIFIED_CSS_ERROR__$1() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}

for (var _ref = {
  name: "7pg0cj-a11yText",
  styles: "label:a11yText;z-index:9999;border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0;white-space:nowrap"
}, A11yText = function(props) {
  return react.jsx("span", _extends__default.default({
    css: _ref
  }, props));
}, defaultAriaLiveMessages = {
  guidance: function(props) {
    var isSearchable = props.isSearchable, isMulti = props.isMulti, isDisabled = props.isDisabled, tabSelectsValue = props.tabSelectsValue;
    switch (props.context) {
     case "menu":
      return "Use Up and Down to choose options".concat(isDisabled ? "" : ", press Enter to select the currently focused option", ", press Escape to exit the menu").concat(tabSelectsValue ? ", press Tab to select the option and exit the menu" : "", ".");

     case "input":
      return "".concat(props["aria-label"] || "Select", " is focused ").concat(isSearchable ? ",type to refine list" : "", ", press Down to open the menu, ").concat(isMulti ? " press left to focus selected values" : "");

     case "value":
      return "Use left and right to toggle between focused values, press Backspace to remove the currently focused value";

     default:
      return "";
    }
  },
  onChange: function(props) {
    var action = props.action, _props$label = props.label, label = void 0 === _props$label ? "" : _props$label, labels = props.labels, isDisabled = props.isDisabled;
    switch (action) {
     case "deselect-option":
     case "pop-value":
     case "remove-value":
      return "option ".concat(label, ", deselected.");

     case "clear":
      return "All selected options have been cleared.";

     case "initial-input-focus":
      return "option".concat(labels.length > 1 ? "s" : "", " ").concat(labels.join(","), ", selected.");

     case "select-option":
      return "option ".concat(label, isDisabled ? " is disabled. Select another option." : ", selected.");

     default:
      return "";
    }
  },
  onFocus: function(props) {
    var context = props.context, focused = props.focused, options = props.options, _props$label2 = props.label, label = void 0 === _props$label2 ? "" : _props$label2, selectValue = props.selectValue, isDisabled = props.isDisabled, isSelected = props.isSelected, getArrayIndex = function(arr, item) {
      return arr && arr.length ? "".concat(arr.indexOf(item) + 1, " of ").concat(arr.length) : "";
    };
    if ("value" === context && selectValue) return "value ".concat(label, " focused, ").concat(getArrayIndex(selectValue, focused), ".");
    if ("menu" === context) {
      var disabled = isDisabled ? " disabled" : "", status = "".concat(isSelected ? "selected" : "focused").concat(disabled);
      return "option ".concat(label, " ").concat(status, ", ").concat(getArrayIndex(options, focused), ".");
    }
    return "";
  },
  onFilter: function(props) {
    var inputValue = props.inputValue, resultsMessage = props.resultsMessage;
    return "".concat(resultsMessage).concat(inputValue ? " for search term " + inputValue : "", ".");
  }
}, LiveRegion = function(props) {
  var ariaSelection = props.ariaSelection, focusedOption = props.focusedOption, focusedValue = props.focusedValue, focusableOptions = props.focusableOptions, isFocused = props.isFocused, selectValue = props.selectValue, selectProps = props.selectProps, id = props.id, ariaLiveMessages = selectProps.ariaLiveMessages, getOptionLabel = selectProps.getOptionLabel, inputValue = selectProps.inputValue, isMulti = selectProps.isMulti, isOptionDisabled = selectProps.isOptionDisabled, isSearchable = selectProps.isSearchable, menuIsOpen = selectProps.menuIsOpen, options = selectProps.options, screenReaderStatus = selectProps.screenReaderStatus, tabSelectsValue = selectProps.tabSelectsValue, ariaLabel = selectProps["aria-label"], ariaLive = selectProps["aria-live"], messages = React.useMemo((function() {
    return index._objectSpread2(index._objectSpread2({}, defaultAriaLiveMessages), ariaLiveMessages || {});
  }), [ ariaLiveMessages ]), ariaSelected = React.useMemo((function() {
    var val, message = "";
    if (ariaSelection && messages.onChange) {
      var option = ariaSelection.option, selectedOptions = ariaSelection.options, removedValue = ariaSelection.removedValue, removedValues = ariaSelection.removedValues, value = ariaSelection.value, selected = removedValue || option || (val = value, 
      Array.isArray(val) ? null : val), label = selected ? getOptionLabel(selected) : "", multiSelected = selectedOptions || removedValues || void 0, labels = multiSelected ? multiSelected.map(getOptionLabel) : [], onChangeProps = index._objectSpread2({
        isDisabled: selected && isOptionDisabled(selected, selectValue),
        label: label,
        labels: labels
      }, ariaSelection);
      message = messages.onChange(onChangeProps);
    }
    return message;
  }), [ ariaSelection, messages, isOptionDisabled, selectValue, getOptionLabel ]), ariaFocused = React.useMemo((function() {
    var focusMsg = "", focused = focusedOption || focusedValue, isSelected = !!(focusedOption && selectValue && selectValue.includes(focusedOption));
    if (focused && messages.onFocus) {
      var onFocusProps = {
        focused: focused,
        label: getOptionLabel(focused),
        isDisabled: isOptionDisabled(focused, selectValue),
        isSelected: isSelected,
        options: options,
        context: focused === focusedOption ? "menu" : "value",
        selectValue: selectValue
      };
      focusMsg = messages.onFocus(onFocusProps);
    }
    return focusMsg;
  }), [ focusedOption, focusedValue, getOptionLabel, isOptionDisabled, messages, options, selectValue ]), ariaResults = React.useMemo((function() {
    var resultsMsg = "";
    if (menuIsOpen && options.length && messages.onFilter) {
      var resultsMessage = screenReaderStatus({
        count: focusableOptions.length
      });
      resultsMsg = messages.onFilter({
        inputValue: inputValue,
        resultsMessage: resultsMessage
      });
    }
    return resultsMsg;
  }), [ focusableOptions, inputValue, menuIsOpen, messages, options, screenReaderStatus ]), ariaGuidance = React.useMemo((function() {
    var guidanceMsg = "";
    if (messages.guidance) {
      var context = focusedValue ? "value" : menuIsOpen ? "menu" : "input";
      guidanceMsg = messages.guidance({
        "aria-label": ariaLabel,
        context: context,
        isDisabled: focusedOption && isOptionDisabled(focusedOption, selectValue),
        isMulti: isMulti,
        isSearchable: isSearchable,
        tabSelectsValue: tabSelectsValue
      });
    }
    return guidanceMsg;
  }), [ ariaLabel, focusedOption, focusedValue, isMulti, isOptionDisabled, isSearchable, menuIsOpen, messages, selectValue, tabSelectsValue ]), ariaContext = "".concat(ariaFocused, " ").concat(ariaResults, " ").concat(ariaGuidance), ScreenReaderText = react.jsx(React.Fragment, null, react.jsx("span", {
    id: "aria-selection"
  }, ariaSelected), react.jsx("span", {
    id: "aria-context"
  }, ariaContext)), isInitialFocus = "initial-input-focus" === (null == ariaSelection ? void 0 : ariaSelection.action);
  return react.jsx(React.Fragment, null, react.jsx(A11yText, {
    id: id
  }, isInitialFocus && ScreenReaderText), react.jsx(A11yText, {
    "aria-live": ariaLive,
    "aria-atomic": "false",
    "aria-relevant": "additions text"
  }, isFocused && !isInitialFocus && ScreenReaderText));
}, diacritics = [ {
  base: "A",
  letters: "AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ"
}, {
  base: "AA",
  letters: "Ꜳ"
}, {
  base: "AE",
  letters: "ÆǼǢ"
}, {
  base: "AO",
  letters: "Ꜵ"
}, {
  base: "AU",
  letters: "Ꜷ"
}, {
  base: "AV",
  letters: "ꜸꜺ"
}, {
  base: "AY",
  letters: "Ꜽ"
}, {
  base: "B",
  letters: "BⒷＢḂḄḆɃƂƁ"
}, {
  base: "C",
  letters: "CⒸＣĆĈĊČÇḈƇȻꜾ"
}, {
  base: "D",
  letters: "DⒹＤḊĎḌḐḒḎĐƋƊƉꝹ"
}, {
  base: "DZ",
  letters: "ǱǄ"
}, {
  base: "Dz",
  letters: "ǲǅ"
}, {
  base: "E",
  letters: "EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ"
}, {
  base: "F",
  letters: "FⒻＦḞƑꝻ"
}, {
  base: "G",
  letters: "GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾ"
}, {
  base: "H",
  letters: "HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ"
}, {
  base: "I",
  letters: "IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ"
}, {
  base: "J",
  letters: "JⒿＪĴɈ"
}, {
  base: "K",
  letters: "KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ"
}, {
  base: "L",
  letters: "LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ"
}, {
  base: "LJ",
  letters: "Ǉ"
}, {
  base: "Lj",
  letters: "ǈ"
}, {
  base: "M",
  letters: "MⓂＭḾṀṂⱮƜ"
}, {
  base: "N",
  letters: "NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤ"
}, {
  base: "NJ",
  letters: "Ǌ"
}, {
  base: "Nj",
  letters: "ǋ"
}, {
  base: "O",
  letters: "OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ"
}, {
  base: "OI",
  letters: "Ƣ"
}, {
  base: "OO",
  letters: "Ꝏ"
}, {
  base: "OU",
  letters: "Ȣ"
}, {
  base: "P",
  letters: "PⓅＰṔṖƤⱣꝐꝒꝔ"
}, {
  base: "Q",
  letters: "QⓆＱꝖꝘɊ"
}, {
  base: "R",
  letters: "RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ"
}, {
  base: "S",
  letters: "SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ"
}, {
  base: "T",
  letters: "TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ"
}, {
  base: "TZ",
  letters: "Ꜩ"
}, {
  base: "U",
  letters: "UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ"
}, {
  base: "V",
  letters: "VⓋＶṼṾƲꝞɅ"
}, {
  base: "VY",
  letters: "Ꝡ"
}, {
  base: "W",
  letters: "WⓌＷẀẂŴẆẄẈⱲ"
}, {
  base: "X",
  letters: "XⓍＸẊẌ"
}, {
  base: "Y",
  letters: "YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ"
}, {
  base: "Z",
  letters: "ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ"
}, {
  base: "a",
  letters: "aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ"
}, {
  base: "aa",
  letters: "ꜳ"
}, {
  base: "ae",
  letters: "æǽǣ"
}, {
  base: "ao",
  letters: "ꜵ"
}, {
  base: "au",
  letters: "ꜷ"
}, {
  base: "av",
  letters: "ꜹꜻ"
}, {
  base: "ay",
  letters: "ꜽ"
}, {
  base: "b",
  letters: "bⓑｂḃḅḇƀƃɓ"
}, {
  base: "c",
  letters: "cⓒｃćĉċčçḉƈȼꜿↄ"
}, {
  base: "d",
  letters: "dⓓｄḋďḍḑḓḏđƌɖɗꝺ"
}, {
  base: "dz",
  letters: "ǳǆ"
}, {
  base: "e",
  letters: "eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ"
}, {
  base: "f",
  letters: "fⓕｆḟƒꝼ"
}, {
  base: "g",
  letters: "gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ"
}, {
  base: "h",
  letters: "hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ"
}, {
  base: "hv",
  letters: "ƕ"
}, {
  base: "i",
  letters: "iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı"
}, {
  base: "j",
  letters: "jⓙｊĵǰɉ"
}, {
  base: "k",
  letters: "kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ"
}, {
  base: "l",
  letters: "lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ"
}, {
  base: "lj",
  letters: "ǉ"
}, {
  base: "m",
  letters: "mⓜｍḿṁṃɱɯ"
}, {
  base: "n",
  letters: "nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ"
}, {
  base: "nj",
  letters: "ǌ"
}, {
  base: "o",
  letters: "oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ"
}, {
  base: "oi",
  letters: "ƣ"
}, {
  base: "ou",
  letters: "ȣ"
}, {
  base: "oo",
  letters: "ꝏ"
}, {
  base: "p",
  letters: "pⓟｐṕṗƥᵽꝑꝓꝕ"
}, {
  base: "q",
  letters: "qⓠｑɋꝗꝙ"
}, {
  base: "r",
  letters: "rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ"
}, {
  base: "s",
  letters: "sⓢｓßśṥŝṡšṧṣṩșşȿꞩꞅẛ"
}, {
  base: "t",
  letters: "tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ"
}, {
  base: "tz",
  letters: "ꜩ"
}, {
  base: "u",
  letters: "uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ"
}, {
  base: "v",
  letters: "vⓥｖṽṿʋꝟʌ"
}, {
  base: "vy",
  letters: "ꝡ"
}, {
  base: "w",
  letters: "wⓦｗẁẃŵẇẅẘẉⱳ"
}, {
  base: "x",
  letters: "xⓧｘẋẍ"
}, {
  base: "y",
  letters: "yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ"
}, {
  base: "z",
  letters: "zⓩｚźẑżžẓẕƶȥɀⱬꝣ"
} ], anyDiacritic = new RegExp("[" + diacritics.map((function(d) {
  return d.letters;
})).join("") + "]", "g"), diacriticToBase = {}, i = 0; i < diacritics.length; i++) for (var diacritic = diacritics[i], j = 0; j < diacritic.letters.length; j++) diacriticToBase[diacritic.letters[j]] = diacritic.base;

var stripDiacritics = function(str) {
  return str.replace(anyDiacritic, (function(match) {
    return diacriticToBase[match];
  }));
}, memoizedStripDiacriticsForInput = memoizeOne__default.default(stripDiacritics), trimString = function(str) {
  return str.replace(/^\s+|\s+$/g, "");
}, defaultStringify = function(option) {
  return "".concat(option.label, " ").concat(option.value);
}, createFilter = function(config) {
  return function(option, rawInput) {
    if (option.data.__isNew__) return !0;
    var _ignoreCase$ignoreAcc = index._objectSpread2({
      ignoreCase: !0,
      ignoreAccents: !0,
      stringify: defaultStringify,
      trim: !0,
      matchFrom: "any"
    }, config), ignoreCase = _ignoreCase$ignoreAcc.ignoreCase, ignoreAccents = _ignoreCase$ignoreAcc.ignoreAccents, stringify = _ignoreCase$ignoreAcc.stringify, trim = _ignoreCase$ignoreAcc.trim, matchFrom = _ignoreCase$ignoreAcc.matchFrom, input = trim ? trimString(rawInput) : rawInput, candidate = trim ? trimString(stringify(option)) : stringify(option);
    return ignoreCase && (input = input.toLowerCase(), candidate = candidate.toLowerCase()), 
    ignoreAccents && (input = memoizedStripDiacriticsForInput(input), candidate = stripDiacritics(candidate)), 
    "start" === matchFrom ? candidate.substr(0, input.length) === input : candidate.indexOf(input) > -1;
  };
}, _excluded = [ "innerRef" ];

function DummyInput(_ref) {
  var innerRef = _ref.innerRef, props = _objectWithoutProperties__default.default(_ref, _excluded), filteredProps = index.removeProps(props, "onExited", "in", "enter", "exit", "appear");
  return react.jsx("input", _extends__default.default({
    ref: innerRef
  }, filteredProps, {
    css: react.css({
      label: "dummyInput",
      background: 0,
      border: 0,
      caretColor: "transparent",
      fontSize: "inherit",
      gridArea: "1 / 1 / 2 / 3",
      outline: 0,
      padding: 0,
      width: 1,
      color: "transparent",
      left: -100,
      opacity: 0,
      position: "relative",
      transform: "scale(.01)"
    }, "", "")
  }));
}

var cancelScroll = function(event) {
  event.preventDefault(), event.stopPropagation();
};

function useScrollCapture(_ref) {
  var isEnabled = _ref.isEnabled, onBottomArrive = _ref.onBottomArrive, onBottomLeave = _ref.onBottomLeave, onTopArrive = _ref.onTopArrive, onTopLeave = _ref.onTopLeave, isBottom = React.useRef(!1), isTop = React.useRef(!1), touchStart = React.useRef(0), scrollTarget = React.useRef(null), handleEventDelta = React.useCallback((function(event, delta) {
    if (null !== scrollTarget.current) {
      var _scrollTarget$current = scrollTarget.current, scrollTop = _scrollTarget$current.scrollTop, scrollHeight = _scrollTarget$current.scrollHeight, clientHeight = _scrollTarget$current.clientHeight, target = scrollTarget.current, isDeltaPositive = delta > 0, availableScroll = scrollHeight - clientHeight - scrollTop, shouldCancelScroll = !1;
      availableScroll > delta && isBottom.current && (onBottomLeave && onBottomLeave(event), 
      isBottom.current = !1), isDeltaPositive && isTop.current && (onTopLeave && onTopLeave(event), 
      isTop.current = !1), isDeltaPositive && delta > availableScroll ? (onBottomArrive && !isBottom.current && onBottomArrive(event), 
      target.scrollTop = scrollHeight, shouldCancelScroll = !0, isBottom.current = !0) : !isDeltaPositive && -delta > scrollTop && (onTopArrive && !isTop.current && onTopArrive(event), 
      target.scrollTop = 0, shouldCancelScroll = !0, isTop.current = !0), shouldCancelScroll && cancelScroll(event);
    }
  }), [ onBottomArrive, onBottomLeave, onTopArrive, onTopLeave ]), onWheel = React.useCallback((function(event) {
    handleEventDelta(event, event.deltaY);
  }), [ handleEventDelta ]), onTouchStart = React.useCallback((function(event) {
    touchStart.current = event.changedTouches[0].clientY;
  }), []), onTouchMove = React.useCallback((function(event) {
    var deltaY = touchStart.current - event.changedTouches[0].clientY;
    handleEventDelta(event, deltaY);
  }), [ handleEventDelta ]), startListening = React.useCallback((function(el) {
    if (el) {
      var notPassive = !!index.supportsPassiveEvents && {
        passive: !1
      };
      el.addEventListener("wheel", onWheel, notPassive), el.addEventListener("touchstart", onTouchStart, notPassive), 
      el.addEventListener("touchmove", onTouchMove, notPassive);
    }
  }), [ onTouchMove, onTouchStart, onWheel ]), stopListening = React.useCallback((function(el) {
    el && (el.removeEventListener("wheel", onWheel, !1), el.removeEventListener("touchstart", onTouchStart, !1), 
    el.removeEventListener("touchmove", onTouchMove, !1));
  }), [ onTouchMove, onTouchStart, onWheel ]);
  return React.useEffect((function() {
    if (isEnabled) {
      var element = scrollTarget.current;
      return startListening(element), function() {
        stopListening(element);
      };
    }
  }), [ isEnabled, startListening, stopListening ]), function(element) {
    scrollTarget.current = element;
  };
}

var STYLE_KEYS = [ "boxSizing", "height", "overflow", "paddingRight", "position" ], LOCK_STYLES = {
  boxSizing: "border-box",
  overflow: "hidden",
  position: "relative",
  height: "100%"
};

function preventTouchMove(e) {
  e.preventDefault();
}

function allowTouchMove(e) {
  e.stopPropagation();
}

function preventInertiaScroll() {
  var top = this.scrollTop, totalScroll = this.scrollHeight, currentScroll = top + this.offsetHeight;
  0 === top ? this.scrollTop = 1 : currentScroll === totalScroll && (this.scrollTop = top - 1);
}

function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints;
}

var canUseDOM = !("undefined" == typeof window || !window.document || !window.document.createElement), activeScrollLocks = 0, listenerOptions = {
  capture: !1,
  passive: !1
};

function useScrollLock(_ref) {
  var isEnabled = _ref.isEnabled, _ref$accountForScroll = _ref.accountForScrollbars, accountForScrollbars = void 0 === _ref$accountForScroll || _ref$accountForScroll, originalStyles = React.useRef({}), scrollTarget = React.useRef(null), addScrollLock = React.useCallback((function(touchScrollTarget) {
    if (canUseDOM) {
      var target = document.body, targetStyle = target && target.style;
      if (accountForScrollbars && STYLE_KEYS.forEach((function(key) {
        var val = targetStyle && targetStyle[key];
        originalStyles.current[key] = val;
      })), accountForScrollbars && activeScrollLocks < 1) {
        var currentPadding = parseInt(originalStyles.current.paddingRight, 10) || 0, clientWidth = document.body ? document.body.clientWidth : 0, adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;
        Object.keys(LOCK_STYLES).forEach((function(key) {
          var val = LOCK_STYLES[key];
          targetStyle && (targetStyle[key] = val);
        })), targetStyle && (targetStyle.paddingRight = "".concat(adjustedPadding, "px"));
      }
      target && isTouchDevice() && (target.addEventListener("touchmove", preventTouchMove, listenerOptions), 
      touchScrollTarget && (touchScrollTarget.addEventListener("touchstart", preventInertiaScroll, listenerOptions), 
      touchScrollTarget.addEventListener("touchmove", allowTouchMove, listenerOptions))), 
      activeScrollLocks += 1;
    }
  }), [ accountForScrollbars ]), removeScrollLock = React.useCallback((function(touchScrollTarget) {
    if (canUseDOM) {
      var target = document.body, targetStyle = target && target.style;
      activeScrollLocks = Math.max(activeScrollLocks - 1, 0), accountForScrollbars && activeScrollLocks < 1 && STYLE_KEYS.forEach((function(key) {
        var val = originalStyles.current[key];
        targetStyle && (targetStyle[key] = val);
      })), target && isTouchDevice() && (target.removeEventListener("touchmove", preventTouchMove, listenerOptions), 
      touchScrollTarget && (touchScrollTarget.removeEventListener("touchstart", preventInertiaScroll, listenerOptions), 
      touchScrollTarget.removeEventListener("touchmove", allowTouchMove, listenerOptions)));
    }
  }), [ accountForScrollbars ]);
  return React.useEffect((function() {
    if (isEnabled) {
      var element = scrollTarget.current;
      return addScrollLock(element), function() {
        removeScrollLock(element);
      };
    }
  }), [ isEnabled, addScrollLock, removeScrollLock ]), function(element) {
    scrollTarget.current = element;
  };
}

function _EMOTION_STRINGIFIED_CSS_ERROR__() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}

var blurSelectInput = function() {
  return document.activeElement && document.activeElement.blur();
}, _ref2 = {
  name: "1kfdb0e",
  styles: "position:fixed;left:0;bottom:0;right:0;top:0"
};

function ScrollManager(_ref) {
  var children = _ref.children, lockEnabled = _ref.lockEnabled, _ref$captureEnabled = _ref.captureEnabled, setScrollCaptureTarget = useScrollCapture({
    isEnabled: void 0 === _ref$captureEnabled || _ref$captureEnabled,
    onBottomArrive: _ref.onBottomArrive,
    onBottomLeave: _ref.onBottomLeave,
    onTopArrive: _ref.onTopArrive,
    onTopLeave: _ref.onTopLeave
  }), setScrollLockTarget = useScrollLock({
    isEnabled: lockEnabled
  });
  return react.jsx(React.Fragment, null, lockEnabled && react.jsx("div", {
    onClick: blurSelectInput,
    css: _ref2
  }), children((function(element) {
    setScrollCaptureTarget(element), setScrollLockTarget(element);
  })));
}

var formatGroupLabel = function(group) {
  return group.label;
}, getOptionLabel$1 = function(option) {
  return option.label;
}, getOptionValue$1 = function(option) {
  return option.value;
}, isOptionDisabled = function(option) {
  return !!option.isDisabled;
}, defaultStyles = {
  clearIndicator: index.clearIndicatorCSS,
  container: index.containerCSS,
  control: index.css,
  dropdownIndicator: index.dropdownIndicatorCSS,
  group: index.groupCSS,
  groupHeading: index.groupHeadingCSS,
  indicatorsContainer: index.indicatorsContainerCSS,
  indicatorSeparator: index.indicatorSeparatorCSS,
  input: index.inputCSS,
  loadingIndicator: index.loadingIndicatorCSS,
  loadingMessage: index.loadingMessageCSS,
  menu: index.menuCSS,
  menuList: index.menuListCSS,
  menuPortal: index.menuPortalCSS,
  multiValue: index.multiValueCSS,
  multiValueLabel: index.multiValueLabelCSS,
  multiValueRemove: index.multiValueRemoveCSS,
  noOptionsMessage: index.noOptionsMessageCSS,
  option: index.optionCSS,
  placeholder: index.placeholderCSS,
  singleValue: index.css$1,
  valueContainer: index.valueContainerCSS
};

function mergeStyles(source) {
  var target = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, styles = index._objectSpread2({}, source);
  return Object.keys(target).forEach((function(keyAsString) {
    var key = keyAsString;
    source[key] ? styles[key] = function(rsCss, props) {
      return target[key](source[key](rsCss, props), props);
    } : styles[key] = target[key];
  })), styles;
}

var colors = {
  primary: "#2684FF",
  primary75: "#4C9AFF",
  primary50: "#B2D4FF",
  primary25: "#DEEBFF",
  danger: "#DE350B",
  dangerLight: "#FFBDAD",
  neutral0: "hsl(0, 0%, 100%)",
  neutral5: "hsl(0, 0%, 95%)",
  neutral10: "hsl(0, 0%, 90%)",
  neutral20: "hsl(0, 0%, 80%)",
  neutral30: "hsl(0, 0%, 70%)",
  neutral40: "hsl(0, 0%, 60%)",
  neutral50: "hsl(0, 0%, 50%)",
  neutral60: "hsl(0, 0%, 40%)",
  neutral70: "hsl(0, 0%, 30%)",
  neutral80: "hsl(0, 0%, 20%)",
  neutral90: "hsl(0, 0%, 10%)"
}, borderRadius = 4, baseUnit = 4, controlHeight = 38, menuGutter = 2 * baseUnit, spacing = {
  baseUnit: baseUnit,
  controlHeight: controlHeight,
  menuGutter: menuGutter
}, defaultTheme = {
  borderRadius: borderRadius,
  colors: colors,
  spacing: spacing
}, defaultProps = {
  "aria-live": "polite",
  backspaceRemovesValue: !0,
  blurInputOnSelect: index.isTouchCapable(),
  captureMenuScroll: !index.isTouchCapable(),
  closeMenuOnSelect: !0,
  closeMenuOnScroll: !1,
  components: {},
  controlShouldRenderValue: !0,
  escapeClearsValue: !1,
  filterOption: createFilter(),
  formatGroupLabel: formatGroupLabel,
  getOptionLabel: getOptionLabel$1,
  getOptionValue: getOptionValue$1,
  isDisabled: !1,
  isLoading: !1,
  isMulti: !1,
  isRtl: !1,
  isSearchable: !0,
  isOptionDisabled: isOptionDisabled,
  loadingMessage: function() {
    return "Loading...";
  },
  maxMenuHeight: 300,
  minMenuHeight: 140,
  menuIsOpen: !1,
  menuPlacement: "bottom",
  menuPosition: "absolute",
  menuShouldBlockScroll: !1,
  menuShouldScrollIntoView: !index.isMobileDevice(),
  noOptionsMessage: function() {
    return "No options";
  },
  openMenuOnFocus: !1,
  openMenuOnClick: !0,
  options: [],
  pageSize: 5,
  placeholder: "Select...",
  screenReaderStatus: function(_ref) {
    var count = _ref.count;
    return "".concat(count, " result").concat(1 !== count ? "s" : "", " available");
  },
  styles: {},
  tabIndex: 0,
  tabSelectsValue: !0
};

function toCategorizedOption(props, option, selectValue, index) {
  return {
    type: "option",
    data: option,
    isDisabled: _isOptionDisabled(props, option, selectValue),
    isSelected: _isOptionSelected(props, option, selectValue),
    label: getOptionLabel(props, option),
    value: getOptionValue(props, option),
    index: index
  };
}

function buildCategorizedOptions(props, selectValue) {
  return props.options.map((function(groupOrOption, groupOrOptionIndex) {
    if ("options" in groupOrOption) {
      var categorizedOptions = groupOrOption.options.map((function(option, optionIndex) {
        return toCategorizedOption(props, option, selectValue, optionIndex);
      })).filter((function(categorizedOption) {
        return isFocusable(props, categorizedOption);
      }));
      return categorizedOptions.length > 0 ? {
        type: "group",
        data: groupOrOption,
        options: categorizedOptions,
        index: groupOrOptionIndex
      } : void 0;
    }
    var categorizedOption = toCategorizedOption(props, groupOrOption, selectValue, groupOrOptionIndex);
    return isFocusable(props, categorizedOption) ? categorizedOption : void 0;
  })).filter(index.notNullish);
}

function buildFocusableOptionsFromCategorizedOptions(categorizedOptions) {
  return categorizedOptions.reduce((function(optionsAccumulator, categorizedOption) {
    return "group" === categorizedOption.type ? optionsAccumulator.push.apply(optionsAccumulator, _toConsumableArray__default.default(categorizedOption.options.map((function(option) {
      return option.data;
    })))) : optionsAccumulator.push(categorizedOption.data), optionsAccumulator;
  }), []);
}

function buildFocusableOptions(props, selectValue) {
  return buildFocusableOptionsFromCategorizedOptions(buildCategorizedOptions(props, selectValue));
}

function isFocusable(props, categorizedOption) {
  var _props$inputValue = props.inputValue, inputValue = void 0 === _props$inputValue ? "" : _props$inputValue, data = categorizedOption.data, isSelected = categorizedOption.isSelected, label = categorizedOption.label, value = categorizedOption.value;
  return (!shouldHideSelectedOptions(props) || !isSelected) && _filterOption(props, {
    label: label,
    value: value,
    data: data
  }, inputValue);
}

function getNextFocusedValue(state, nextSelectValue) {
  var focusedValue = state.focusedValue, lastFocusedIndex = state.selectValue.indexOf(focusedValue);
  if (lastFocusedIndex > -1) {
    if (nextSelectValue.indexOf(focusedValue) > -1) return focusedValue;
    if (lastFocusedIndex < nextSelectValue.length) return nextSelectValue[lastFocusedIndex];
  }
  return null;
}

function getNextFocusedOption(state, options) {
  var lastFocusedOption = state.focusedOption;
  return lastFocusedOption && options.indexOf(lastFocusedOption) > -1 ? lastFocusedOption : options[0];
}

var getOptionLabel = function(props, data) {
  return props.getOptionLabel(data);
}, getOptionValue = function(props, data) {
  return props.getOptionValue(data);
};

function _isOptionDisabled(props, option, selectValue) {
  return "function" == typeof props.isOptionDisabled && props.isOptionDisabled(option, selectValue);
}

function _isOptionSelected(props, option, selectValue) {
  if (selectValue.indexOf(option) > -1) return !0;
  if ("function" == typeof props.isOptionSelected) return props.isOptionSelected(option, selectValue);
  var candidate = getOptionValue(props, option);
  return selectValue.some((function(i) {
    return getOptionValue(props, i) === candidate;
  }));
}

function _filterOption(props, option, inputValue) {
  return !props.filterOption || props.filterOption(option, inputValue);
}

var shouldHideSelectedOptions = function(props) {
  var hideSelectedOptions = props.hideSelectedOptions, isMulti = props.isMulti;
  return void 0 === hideSelectedOptions ? isMulti : hideSelectedOptions;
}, instanceId = 1, Select = function(_Component) {
  _inherits__default.default(Select, _Component);
  var _super = index._createSuper(Select);
  function Select(_props) {
    var _this;
    return _classCallCheck__default.default(this, Select), (_this = _super.call(this, _props)).state = {
      ariaSelection: null,
      focusedOption: null,
      focusedValue: null,
      inputIsHidden: !1,
      isFocused: !1,
      selectValue: [],
      clearFocusValueOnUpdate: !1,
      prevWasFocused: !1,
      inputIsHiddenAfterUpdate: void 0,
      prevProps: void 0
    }, _this.blockOptionHover = !1, _this.isComposing = !1, _this.commonProps = void 0, 
    _this.initialTouchX = 0, _this.initialTouchY = 0, _this.instancePrefix = "", _this.openAfterFocus = !1, 
    _this.scrollToFocusedOptionOnUpdate = !1, _this.userIsDragging = void 0, _this.controlRef = null, 
    _this.getControlRef = function(ref) {
      _this.controlRef = ref;
    }, _this.focusedOptionRef = null, _this.getFocusedOptionRef = function(ref) {
      _this.focusedOptionRef = ref;
    }, _this.menuListRef = null, _this.getMenuListRef = function(ref) {
      _this.menuListRef = ref;
    }, _this.inputRef = null, _this.getInputRef = function(ref) {
      _this.inputRef = ref;
    }, _this.focus = _this.focusInput, _this.blur = _this.blurInput, _this.onChange = function(newValue, actionMeta) {
      var _this$props = _this.props, onChange = _this$props.onChange, name = _this$props.name;
      actionMeta.name = name, _this.ariaOnChange(newValue, actionMeta), onChange(newValue, actionMeta);
    }, _this.setValue = function(newValue, action, option) {
      var _this$props2 = _this.props, closeMenuOnSelect = _this$props2.closeMenuOnSelect, isMulti = _this$props2.isMulti, inputValue = _this$props2.inputValue;
      _this.onInputChange("", {
        action: "set-value",
        prevInputValue: inputValue
      }), closeMenuOnSelect && (_this.setState({
        inputIsHiddenAfterUpdate: !isMulti
      }), _this.onMenuClose()), _this.setState({
        clearFocusValueOnUpdate: !0
      }), _this.onChange(newValue, {
        action: action,
        option: option
      });
    }, _this.selectOption = function(newValue) {
      var _this$props3 = _this.props, blurInputOnSelect = _this$props3.blurInputOnSelect, isMulti = _this$props3.isMulti, name = _this$props3.name, selectValue = _this.state.selectValue, deselected = isMulti && _this.isOptionSelected(newValue, selectValue), isDisabled = _this.isOptionDisabled(newValue, selectValue);
      if (deselected) {
        var candidate = _this.getOptionValue(newValue);
        _this.setValue(index.multiValueAsValue(selectValue.filter((function(i) {
          return _this.getOptionValue(i) !== candidate;
        }))), "deselect-option", newValue);
      } else {
        if (isDisabled) return void _this.ariaOnChange(index.singleValueAsValue(newValue), {
          action: "select-option",
          option: newValue,
          name: name
        });
        isMulti ? _this.setValue(index.multiValueAsValue([].concat(_toConsumableArray__default.default(selectValue), [ newValue ])), "select-option", newValue) : _this.setValue(index.singleValueAsValue(newValue), "select-option");
      }
      blurInputOnSelect && _this.blurInput();
    }, _this.removeValue = function(removedValue) {
      var isMulti = _this.props.isMulti, selectValue = _this.state.selectValue, candidate = _this.getOptionValue(removedValue), newValueArray = selectValue.filter((function(i) {
        return _this.getOptionValue(i) !== candidate;
      })), newValue = index.valueTernary(isMulti, newValueArray, newValueArray[0] || null);
      _this.onChange(newValue, {
        action: "remove-value",
        removedValue: removedValue
      }), _this.focusInput();
    }, _this.clearValue = function() {
      var selectValue = _this.state.selectValue;
      _this.onChange(index.valueTernary(_this.props.isMulti, [], null), {
        action: "clear",
        removedValues: selectValue
      });
    }, _this.popValue = function() {
      var isMulti = _this.props.isMulti, selectValue = _this.state.selectValue, lastSelectedValue = selectValue[selectValue.length - 1], newValueArray = selectValue.slice(0, selectValue.length - 1), newValue = index.valueTernary(isMulti, newValueArray, newValueArray[0] || null);
      _this.onChange(newValue, {
        action: "pop-value",
        removedValue: lastSelectedValue
      });
    }, _this.getValue = function() {
      return _this.state.selectValue;
    }, _this.cx = function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
      return index.classNames.apply(void 0, [ _this.props.classNamePrefix ].concat(args));
    }, _this.getOptionLabel = function(data) {
      return getOptionLabel(_this.props, data);
    }, _this.getOptionValue = function(data) {
      return getOptionValue(_this.props, data);
    }, _this.getStyles = function(key, props) {
      var base = defaultStyles[key](props);
      base.boxSizing = "border-box";
      var custom = _this.props.styles[key];
      return custom ? custom(base, props) : base;
    }, _this.getElementId = function(element) {
      return "".concat(_this.instancePrefix, "-").concat(element);
    }, _this.getComponents = function() {
      return index.defaultComponents(_this.props);
    }, _this.buildCategorizedOptions = function() {
      return buildCategorizedOptions(_this.props, _this.state.selectValue);
    }, _this.getCategorizedOptions = function() {
      return _this.props.menuIsOpen ? _this.buildCategorizedOptions() : [];
    }, _this.buildFocusableOptions = function() {
      return buildFocusableOptionsFromCategorizedOptions(_this.buildCategorizedOptions());
    }, _this.getFocusableOptions = function() {
      return _this.props.menuIsOpen ? _this.buildFocusableOptions() : [];
    }, _this.ariaOnChange = function(value, actionMeta) {
      _this.setState({
        ariaSelection: index._objectSpread2({
          value: value
        }, actionMeta)
      });
    }, _this.onMenuMouseDown = function(event) {
      0 === event.button && (event.stopPropagation(), event.preventDefault(), _this.focusInput());
    }, _this.onMenuMouseMove = function(event) {
      _this.blockOptionHover = !1;
    }, _this.onControlMouseDown = function(event) {
      if (!event.defaultPrevented) {
        var openMenuOnClick = _this.props.openMenuOnClick;
        _this.state.isFocused ? _this.props.menuIsOpen ? "INPUT" !== event.target.tagName && "TEXTAREA" !== event.target.tagName && _this.onMenuClose() : openMenuOnClick && _this.openMenu("first") : (openMenuOnClick && (_this.openAfterFocus = !0), 
        _this.focusInput()), "INPUT" !== event.target.tagName && "TEXTAREA" !== event.target.tagName && event.preventDefault();
      }
    }, _this.onDropdownIndicatorMouseDown = function(event) {
      if (!(event && "mousedown" === event.type && 0 !== event.button || _this.props.isDisabled)) {
        var _this$props4 = _this.props, isMulti = _this$props4.isMulti, menuIsOpen = _this$props4.menuIsOpen;
        _this.focusInput(), menuIsOpen ? (_this.setState({
          inputIsHiddenAfterUpdate: !isMulti
        }), _this.onMenuClose()) : _this.openMenu("first"), event.preventDefault();
      }
    }, _this.onClearIndicatorMouseDown = function(event) {
      event && "mousedown" === event.type && 0 !== event.button || (_this.clearValue(), 
      event.preventDefault(), _this.openAfterFocus = !1, "touchend" === event.type ? _this.focusInput() : setTimeout((function() {
        return _this.focusInput();
      })));
    }, _this.onScroll = function(event) {
      "boolean" == typeof _this.props.closeMenuOnScroll ? event.target instanceof HTMLElement && index.isDocumentElement(event.target) && _this.props.onMenuClose() : "function" == typeof _this.props.closeMenuOnScroll && _this.props.closeMenuOnScroll(event) && _this.props.onMenuClose();
    }, _this.onCompositionStart = function() {
      _this.isComposing = !0;
    }, _this.onCompositionEnd = function() {
      _this.isComposing = !1;
    }, _this.onTouchStart = function(_ref2) {
      var touches = _ref2.touches, touch = touches && touches.item(0);
      touch && (_this.initialTouchX = touch.clientX, _this.initialTouchY = touch.clientY, 
      _this.userIsDragging = !1);
    }, _this.onTouchMove = function(_ref3) {
      var touches = _ref3.touches, touch = touches && touches.item(0);
      if (touch) {
        var deltaX = Math.abs(touch.clientX - _this.initialTouchX), deltaY = Math.abs(touch.clientY - _this.initialTouchY);
        _this.userIsDragging = deltaX > 5 || deltaY > 5;
      }
    }, _this.onTouchEnd = function(event) {
      _this.userIsDragging || (_this.controlRef && !_this.controlRef.contains(event.target) && _this.menuListRef && !_this.menuListRef.contains(event.target) && _this.blurInput(), 
      _this.initialTouchX = 0, _this.initialTouchY = 0);
    }, _this.onControlTouchEnd = function(event) {
      _this.userIsDragging || _this.onControlMouseDown(event);
    }, _this.onClearIndicatorTouchEnd = function(event) {
      _this.userIsDragging || _this.onClearIndicatorMouseDown(event);
    }, _this.onDropdownIndicatorTouchEnd = function(event) {
      _this.userIsDragging || _this.onDropdownIndicatorMouseDown(event);
    }, _this.handleInputChange = function(event) {
      var prevInputValue = _this.props.inputValue, inputValue = event.currentTarget.value;
      _this.setState({
        inputIsHiddenAfterUpdate: !1
      }), _this.onInputChange(inputValue, {
        action: "input-change",
        prevInputValue: prevInputValue
      }), _this.props.menuIsOpen || _this.onMenuOpen();
    }, _this.onInputFocus = function(event) {
      _this.props.onFocus && _this.props.onFocus(event), _this.setState({
        inputIsHiddenAfterUpdate: !1,
        isFocused: !0
      }), (_this.openAfterFocus || _this.props.openMenuOnFocus) && _this.openMenu("first"), 
      _this.openAfterFocus = !1;
    }, _this.onInputBlur = function(event) {
      var prevInputValue = _this.props.inputValue;
      _this.menuListRef && _this.menuListRef.contains(document.activeElement) ? _this.inputRef.focus() : (_this.props.onBlur && _this.props.onBlur(event), 
      _this.onInputChange("", {
        action: "input-blur",
        prevInputValue: prevInputValue
      }), _this.onMenuClose(), _this.setState({
        focusedValue: null,
        isFocused: !1
      }));
    }, _this.onOptionHover = function(focusedOption) {
      _this.blockOptionHover || _this.state.focusedOption === focusedOption || _this.setState({
        focusedOption: focusedOption
      });
    }, _this.shouldHideSelectedOptions = function() {
      return shouldHideSelectedOptions(_this.props);
    }, _this.onKeyDown = function(event) {
      var _this$props5 = _this.props, isMulti = _this$props5.isMulti, backspaceRemovesValue = _this$props5.backspaceRemovesValue, escapeClearsValue = _this$props5.escapeClearsValue, inputValue = _this$props5.inputValue, isClearable = _this$props5.isClearable, isDisabled = _this$props5.isDisabled, menuIsOpen = _this$props5.menuIsOpen, onKeyDown = _this$props5.onKeyDown, tabSelectsValue = _this$props5.tabSelectsValue, openMenuOnFocus = _this$props5.openMenuOnFocus, _this$state = _this.state, focusedOption = _this$state.focusedOption, focusedValue = _this$state.focusedValue, selectValue = _this$state.selectValue;
      if (!(isDisabled || "function" == typeof onKeyDown && (onKeyDown(event), event.defaultPrevented))) {
        switch (_this.blockOptionHover = !0, event.key) {
         case "ArrowLeft":
          if (!isMulti || inputValue) return;
          _this.focusValue("previous");
          break;

         case "ArrowRight":
          if (!isMulti || inputValue) return;
          _this.focusValue("next");
          break;

         case "Delete":
         case "Backspace":
          if (inputValue) return;
          if (focusedValue) _this.removeValue(focusedValue); else {
            if (!backspaceRemovesValue) return;
            isMulti ? _this.popValue() : isClearable && _this.clearValue();
          }
          break;

         case "Tab":
          if (_this.isComposing) return;
          if (event.shiftKey || !menuIsOpen || !tabSelectsValue || !focusedOption || openMenuOnFocus && _this.isOptionSelected(focusedOption, selectValue)) return;
          _this.selectOption(focusedOption);
          break;

         case "Enter":
          if (229 === event.keyCode) break;
          if (menuIsOpen) {
            if (!focusedOption) return;
            if (_this.isComposing) return;
            _this.selectOption(focusedOption);
            break;
          }
          return;

         case "Escape":
          menuIsOpen ? (_this.setState({
            inputIsHiddenAfterUpdate: !1
          }), _this.onInputChange("", {
            action: "menu-close",
            prevInputValue: inputValue
          }), _this.onMenuClose()) : isClearable && escapeClearsValue && _this.clearValue();
          break;

         case " ":
          if (inputValue) return;
          if (!menuIsOpen) {
            _this.openMenu("first");
            break;
          }
          if (!focusedOption) return;
          _this.selectOption(focusedOption);
          break;

         case "ArrowUp":
          menuIsOpen ? _this.focusOption("up") : _this.openMenu("last");
          break;

         case "ArrowDown":
          menuIsOpen ? _this.focusOption("down") : _this.openMenu("first");
          break;

         case "PageUp":
          if (!menuIsOpen) return;
          _this.focusOption("pageup");
          break;

         case "PageDown":
          if (!menuIsOpen) return;
          _this.focusOption("pagedown");
          break;

         case "Home":
          if (!menuIsOpen) return;
          _this.focusOption("first");
          break;

         case "End":
          if (!menuIsOpen) return;
          _this.focusOption("last");
          break;

         default:
          return;
        }
        event.preventDefault();
      }
    }, _this.instancePrefix = "react-select-" + (_this.props.instanceId || ++instanceId), 
    _this.state.selectValue = index.cleanValue(_props.value), _this;
  }
  return _createClass__default.default(Select, [ {
    key: "componentDidMount",
    value: function() {
      this.startListeningComposition(), this.startListeningToTouch(), this.props.closeMenuOnScroll && document && document.addEventListener && document.addEventListener("scroll", this.onScroll, !0), 
      this.props.autoFocus && this.focusInput();
    }
  }, {
    key: "componentDidUpdate",
    value: function(prevProps) {
      var _this$props6 = this.props, isDisabled = _this$props6.isDisabled, menuIsOpen = _this$props6.menuIsOpen, isFocused = this.state.isFocused;
      (isFocused && !isDisabled && prevProps.isDisabled || isFocused && menuIsOpen && !prevProps.menuIsOpen) && this.focusInput(), 
      isFocused && isDisabled && !prevProps.isDisabled && this.setState({
        isFocused: !1
      }, this.onMenuClose), this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate && (index.scrollIntoView(this.menuListRef, this.focusedOptionRef), 
      this.scrollToFocusedOptionOnUpdate = !1);
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.stopListeningComposition(), this.stopListeningToTouch(), document.removeEventListener("scroll", this.onScroll, !0);
    }
  }, {
    key: "onMenuOpen",
    value: function() {
      this.props.onMenuOpen();
    }
  }, {
    key: "onMenuClose",
    value: function() {
      this.onInputChange("", {
        action: "menu-close",
        prevInputValue: this.props.inputValue
      }), this.props.onMenuClose();
    }
  }, {
    key: "onInputChange",
    value: function(newValue, actionMeta) {
      this.props.onInputChange(newValue, actionMeta);
    }
  }, {
    key: "focusInput",
    value: function() {
      this.inputRef && this.inputRef.focus();
    }
  }, {
    key: "blurInput",
    value: function() {
      this.inputRef && this.inputRef.blur();
    }
  }, {
    key: "openMenu",
    value: function(focusOption) {
      var _this2 = this, _this$state2 = this.state, selectValue = _this$state2.selectValue, isFocused = _this$state2.isFocused, focusableOptions = this.buildFocusableOptions(), openAtIndex = "first" === focusOption ? 0 : focusableOptions.length - 1;
      if (!this.props.isMulti) {
        var selectedIndex = focusableOptions.indexOf(selectValue[0]);
        selectedIndex > -1 && (openAtIndex = selectedIndex);
      }
      this.scrollToFocusedOptionOnUpdate = !(isFocused && this.menuListRef), this.setState({
        inputIsHiddenAfterUpdate: !1,
        focusedValue: null,
        focusedOption: focusableOptions[openAtIndex]
      }, (function() {
        return _this2.onMenuOpen();
      }));
    }
  }, {
    key: "focusValue",
    value: function(direction) {
      var _this$state3 = this.state, selectValue = _this$state3.selectValue, focusedValue = _this$state3.focusedValue;
      if (this.props.isMulti) {
        this.setState({
          focusedOption: null
        });
        var focusedIndex = selectValue.indexOf(focusedValue);
        focusedValue || (focusedIndex = -1);
        var lastIndex = selectValue.length - 1, nextFocus = -1;
        if (selectValue.length) {
          switch (direction) {
           case "previous":
            nextFocus = 0 === focusedIndex ? 0 : -1 === focusedIndex ? lastIndex : focusedIndex - 1;
            break;

           case "next":
            focusedIndex > -1 && focusedIndex < lastIndex && (nextFocus = focusedIndex + 1);
          }
          this.setState({
            inputIsHidden: -1 !== nextFocus,
            focusedValue: selectValue[nextFocus]
          });
        }
      }
    }
  }, {
    key: "focusOption",
    value: function() {
      var direction = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "first", pageSize = this.props.pageSize, focusedOption = this.state.focusedOption, options = this.getFocusableOptions();
      if (options.length) {
        var nextFocus = 0, focusedIndex = options.indexOf(focusedOption);
        focusedOption || (focusedIndex = -1), "up" === direction ? nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1 : "down" === direction ? nextFocus = (focusedIndex + 1) % options.length : "pageup" === direction ? (nextFocus = focusedIndex - pageSize) < 0 && (nextFocus = 0) : "pagedown" === direction ? (nextFocus = focusedIndex + pageSize) > options.length - 1 && (nextFocus = options.length - 1) : "last" === direction && (nextFocus = options.length - 1), 
        this.scrollToFocusedOptionOnUpdate = !0, this.setState({
          focusedOption: options[nextFocus],
          focusedValue: null
        });
      }
    }
  }, {
    key: "getTheme",
    value: function() {
      return this.props.theme ? "function" == typeof this.props.theme ? this.props.theme(defaultTheme) : index._objectSpread2(index._objectSpread2({}, defaultTheme), this.props.theme) : defaultTheme;
    }
  }, {
    key: "getCommonProps",
    value: function() {
      var clearValue = this.clearValue, cx = this.cx, getStyles = this.getStyles, getValue = this.getValue, selectOption = this.selectOption, setValue = this.setValue, props = this.props, isMulti = props.isMulti, isRtl = props.isRtl, options = props.options;
      return {
        clearValue: clearValue,
        cx: cx,
        getStyles: getStyles,
        getValue: getValue,
        hasValue: this.hasValue(),
        isMulti: isMulti,
        isRtl: isRtl,
        options: options,
        selectOption: selectOption,
        selectProps: props,
        setValue: setValue,
        theme: this.getTheme()
      };
    }
  }, {
    key: "hasValue",
    value: function() {
      return this.state.selectValue.length > 0;
    }
  }, {
    key: "hasOptions",
    value: function() {
      return !!this.getFocusableOptions().length;
    }
  }, {
    key: "isClearable",
    value: function() {
      var _this$props7 = this.props, isClearable = _this$props7.isClearable, isMulti = _this$props7.isMulti;
      return void 0 === isClearable ? isMulti : isClearable;
    }
  }, {
    key: "isOptionDisabled",
    value: function(option, selectValue) {
      return _isOptionDisabled(this.props, option, selectValue);
    }
  }, {
    key: "isOptionSelected",
    value: function(option, selectValue) {
      return _isOptionSelected(this.props, option, selectValue);
    }
  }, {
    key: "filterOption",
    value: function(option, inputValue) {
      return _filterOption(this.props, option, inputValue);
    }
  }, {
    key: "formatOptionLabel",
    value: function(data, context) {
      if ("function" == typeof this.props.formatOptionLabel) {
        var _inputValue = this.props.inputValue, _selectValue = this.state.selectValue;
        return this.props.formatOptionLabel(data, {
          context: context,
          inputValue: _inputValue,
          selectValue: _selectValue
        });
      }
      return this.getOptionLabel(data);
    }
  }, {
    key: "formatGroupLabel",
    value: function(data) {
      return this.props.formatGroupLabel(data);
    }
  }, {
    key: "startListeningComposition",
    value: function() {
      document && document.addEventListener && (document.addEventListener("compositionstart", this.onCompositionStart, !1), 
      document.addEventListener("compositionend", this.onCompositionEnd, !1));
    }
  }, {
    key: "stopListeningComposition",
    value: function() {
      document && document.removeEventListener && (document.removeEventListener("compositionstart", this.onCompositionStart), 
      document.removeEventListener("compositionend", this.onCompositionEnd));
    }
  }, {
    key: "startListeningToTouch",
    value: function() {
      document && document.addEventListener && (document.addEventListener("touchstart", this.onTouchStart, !1), 
      document.addEventListener("touchmove", this.onTouchMove, !1), document.addEventListener("touchend", this.onTouchEnd, !1));
    }
  }, {
    key: "stopListeningToTouch",
    value: function() {
      document && document.removeEventListener && (document.removeEventListener("touchstart", this.onTouchStart), 
      document.removeEventListener("touchmove", this.onTouchMove), document.removeEventListener("touchend", this.onTouchEnd));
    }
  }, {
    key: "renderInput",
    value: function() {
      var _this$props8 = this.props, isDisabled = _this$props8.isDisabled, isSearchable = _this$props8.isSearchable, inputId = _this$props8.inputId, inputValue = _this$props8.inputValue, tabIndex = _this$props8.tabIndex, form = _this$props8.form, menuIsOpen = _this$props8.menuIsOpen, Input = this.getComponents().Input, _this$state4 = this.state, inputIsHidden = _this$state4.inputIsHidden, ariaSelection = _this$state4.ariaSelection, commonProps = this.commonProps, id = inputId || this.getElementId("input"), ariaAttributes = index._objectSpread2(index._objectSpread2(index._objectSpread2({
        "aria-autocomplete": "list",
        "aria-expanded": menuIsOpen,
        "aria-haspopup": !0,
        "aria-errormessage": this.props["aria-errormessage"],
        "aria-invalid": this.props["aria-invalid"],
        "aria-label": this.props["aria-label"],
        "aria-labelledby": this.props["aria-labelledby"],
        role: "combobox"
      }, menuIsOpen && {
        "aria-controls": this.getElementId("listbox"),
        "aria-owns": this.getElementId("listbox")
      }), !isSearchable && {
        "aria-readonly": !0
      }), this.hasValue() ? "initial-input-focus" === (null == ariaSelection ? void 0 : ariaSelection.action) && {
        "aria-describedby": this.getElementId("live-region")
      } : {
        "aria-describedby": this.getElementId("placeholder")
      });
      return isSearchable ? React__namespace.createElement(Input, _extends__default.default({}, commonProps, {
        autoCapitalize: "none",
        autoComplete: "off",
        autoCorrect: "off",
        id: id,
        innerRef: this.getInputRef,
        isDisabled: isDisabled,
        isHidden: inputIsHidden,
        onBlur: this.onInputBlur,
        onChange: this.handleInputChange,
        onFocus: this.onInputFocus,
        spellCheck: "false",
        tabIndex: tabIndex,
        form: form,
        type: "text",
        value: inputValue
      }, ariaAttributes)) : React__namespace.createElement(DummyInput, _extends__default.default({
        id: id,
        innerRef: this.getInputRef,
        onBlur: this.onInputBlur,
        onChange: index.noop,
        onFocus: this.onInputFocus,
        disabled: isDisabled,
        tabIndex: tabIndex,
        inputMode: "none",
        form: form,
        value: ""
      }, ariaAttributes));
    }
  }, {
    key: "renderPlaceholderOrValue",
    value: function() {
      var _this3 = this, _this$getComponents2 = this.getComponents(), MultiValue = _this$getComponents2.MultiValue, MultiValueContainer = _this$getComponents2.MultiValueContainer, MultiValueLabel = _this$getComponents2.MultiValueLabel, MultiValueRemove = _this$getComponents2.MultiValueRemove, SingleValue = _this$getComponents2.SingleValue, Placeholder = _this$getComponents2.Placeholder, commonProps = this.commonProps, _this$props9 = this.props, controlShouldRenderValue = _this$props9.controlShouldRenderValue, isDisabled = _this$props9.isDisabled, isMulti = _this$props9.isMulti, inputValue = _this$props9.inputValue, placeholder = _this$props9.placeholder, _this$state5 = this.state, selectValue = _this$state5.selectValue, focusedValue = _this$state5.focusedValue, isFocused = _this$state5.isFocused;
      if (!this.hasValue() || !controlShouldRenderValue) return inputValue ? null : React__namespace.createElement(Placeholder, _extends__default.default({}, commonProps, {
        key: "placeholder",
        isDisabled: isDisabled,
        isFocused: isFocused,
        innerProps: {
          id: this.getElementId("placeholder")
        }
      }), placeholder);
      if (isMulti) return selectValue.map((function(opt, index) {
        var isOptionFocused = opt === focusedValue, key = "".concat(_this3.getOptionLabel(opt), "-").concat(_this3.getOptionValue(opt));
        return React__namespace.createElement(MultiValue, _extends__default.default({}, commonProps, {
          components: {
            Container: MultiValueContainer,
            Label: MultiValueLabel,
            Remove: MultiValueRemove
          },
          isFocused: isOptionFocused,
          isDisabled: isDisabled,
          key: key,
          index: index,
          removeProps: {
            onClick: function() {
              return _this3.removeValue(opt);
            },
            onTouchEnd: function() {
              return _this3.removeValue(opt);
            },
            onMouseDown: function(e) {
              e.preventDefault();
            }
          },
          data: opt
        }), _this3.formatOptionLabel(opt, "value"));
      }));
      if (inputValue) return null;
      var singleValue = selectValue[0];
      return React__namespace.createElement(SingleValue, _extends__default.default({}, commonProps, {
        data: singleValue,
        isDisabled: isDisabled
      }), this.formatOptionLabel(singleValue, "value"));
    }
  }, {
    key: "renderClearIndicator",
    value: function() {
      var ClearIndicator = this.getComponents().ClearIndicator, commonProps = this.commonProps, _this$props10 = this.props, isDisabled = _this$props10.isDisabled, isLoading = _this$props10.isLoading, isFocused = this.state.isFocused;
      if (!this.isClearable() || !ClearIndicator || isDisabled || !this.hasValue() || isLoading) return null;
      var innerProps = {
        onMouseDown: this.onClearIndicatorMouseDown,
        onTouchEnd: this.onClearIndicatorTouchEnd,
        "aria-hidden": "true"
      };
      return React__namespace.createElement(ClearIndicator, _extends__default.default({}, commonProps, {
        innerProps: innerProps,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderLoadingIndicator",
    value: function() {
      var LoadingIndicator = this.getComponents().LoadingIndicator, commonProps = this.commonProps, _this$props11 = this.props, isDisabled = _this$props11.isDisabled, isLoading = _this$props11.isLoading, isFocused = this.state.isFocused;
      if (!LoadingIndicator || !isLoading) return null;
      return React__namespace.createElement(LoadingIndicator, _extends__default.default({}, commonProps, {
        innerProps: {
          "aria-hidden": "true"
        },
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderIndicatorSeparator",
    value: function() {
      var _this$getComponents5 = this.getComponents(), DropdownIndicator = _this$getComponents5.DropdownIndicator, IndicatorSeparator = _this$getComponents5.IndicatorSeparator;
      if (!DropdownIndicator || !IndicatorSeparator) return null;
      var commonProps = this.commonProps, isDisabled = this.props.isDisabled, isFocused = this.state.isFocused;
      return React__namespace.createElement(IndicatorSeparator, _extends__default.default({}, commonProps, {
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderDropdownIndicator",
    value: function() {
      var DropdownIndicator = this.getComponents().DropdownIndicator;
      if (!DropdownIndicator) return null;
      var commonProps = this.commonProps, isDisabled = this.props.isDisabled, isFocused = this.state.isFocused, innerProps = {
        onMouseDown: this.onDropdownIndicatorMouseDown,
        onTouchEnd: this.onDropdownIndicatorTouchEnd,
        "aria-hidden": "true"
      };
      return React__namespace.createElement(DropdownIndicator, _extends__default.default({}, commonProps, {
        innerProps: innerProps,
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderMenu",
    value: function() {
      var _this4 = this, _this$getComponents7 = this.getComponents(), Group = _this$getComponents7.Group, GroupHeading = _this$getComponents7.GroupHeading, Menu = _this$getComponents7.Menu, MenuList = _this$getComponents7.MenuList, MenuPortal = _this$getComponents7.MenuPortal, LoadingMessage = _this$getComponents7.LoadingMessage, NoOptionsMessage = _this$getComponents7.NoOptionsMessage, Option = _this$getComponents7.Option, commonProps = this.commonProps, focusedOption = this.state.focusedOption, _this$props12 = this.props, captureMenuScroll = _this$props12.captureMenuScroll, inputValue = _this$props12.inputValue, isLoading = _this$props12.isLoading, loadingMessage = _this$props12.loadingMessage, minMenuHeight = _this$props12.minMenuHeight, maxMenuHeight = _this$props12.maxMenuHeight, menuIsOpen = _this$props12.menuIsOpen, menuPlacement = _this$props12.menuPlacement, menuPosition = _this$props12.menuPosition, menuPortalTarget = _this$props12.menuPortalTarget, menuShouldBlockScroll = _this$props12.menuShouldBlockScroll, menuShouldScrollIntoView = _this$props12.menuShouldScrollIntoView, noOptionsMessage = _this$props12.noOptionsMessage, onMenuScrollToTop = _this$props12.onMenuScrollToTop, onMenuScrollToBottom = _this$props12.onMenuScrollToBottom;
      if (!menuIsOpen) return null;
      var menuUI, render = function(props, id) {
        var type = props.type, data = props.data, isDisabled = props.isDisabled, isSelected = props.isSelected, label = props.label, value = props.value, isFocused = focusedOption === data, onHover = isDisabled ? void 0 : function() {
          return _this4.onOptionHover(data);
        }, onSelect = isDisabled ? void 0 : function() {
          return _this4.selectOption(data);
        }, optionId = "".concat(_this4.getElementId("option"), "-").concat(id), innerProps = {
          id: optionId,
          onClick: onSelect,
          onMouseMove: onHover,
          onMouseOver: onHover,
          tabIndex: -1
        };
        return React__namespace.createElement(Option, _extends__default.default({}, commonProps, {
          innerProps: innerProps,
          data: data,
          isDisabled: isDisabled,
          isSelected: isSelected,
          key: optionId,
          label: label,
          type: type,
          value: value,
          isFocused: isFocused,
          innerRef: isFocused ? _this4.getFocusedOptionRef : void 0
        }), _this4.formatOptionLabel(props.data, "menu"));
      };
      if (this.hasOptions()) menuUI = this.getCategorizedOptions().map((function(item) {
        if ("group" === item.type) {
          var _data = item.data, options = item.options, groupIndex = item.index, groupId = "".concat(_this4.getElementId("group"), "-").concat(groupIndex), headingId = "".concat(groupId, "-heading");
          return React__namespace.createElement(Group, _extends__default.default({}, commonProps, {
            key: groupId,
            data: _data,
            options: options,
            Heading: GroupHeading,
            headingProps: {
              id: headingId,
              data: item.data
            },
            label: _this4.formatGroupLabel(item.data)
          }), item.options.map((function(option) {
            return render(option, "".concat(groupIndex, "-").concat(option.index));
          })));
        }
        if ("option" === item.type) return render(item, "".concat(item.index));
      })); else if (isLoading) {
        var message = loadingMessage({
          inputValue: inputValue
        });
        if (null === message) return null;
        menuUI = React__namespace.createElement(LoadingMessage, commonProps, message);
      } else {
        var _message = noOptionsMessage({
          inputValue: inputValue
        });
        if (null === _message) return null;
        menuUI = React__namespace.createElement(NoOptionsMessage, commonProps, _message);
      }
      var menuPlacementProps = {
        minMenuHeight: minMenuHeight,
        maxMenuHeight: maxMenuHeight,
        menuPlacement: menuPlacement,
        menuPosition: menuPosition,
        menuShouldScrollIntoView: menuShouldScrollIntoView
      }, menuElement = React__namespace.createElement(index.MenuPlacer, _extends__default.default({}, commonProps, menuPlacementProps), (function(_ref4) {
        var ref = _ref4.ref, _ref4$placerProps = _ref4.placerProps, placement = _ref4$placerProps.placement, maxHeight = _ref4$placerProps.maxHeight;
        return React__namespace.createElement(Menu, _extends__default.default({}, commonProps, menuPlacementProps, {
          innerRef: ref,
          innerProps: {
            onMouseDown: _this4.onMenuMouseDown,
            onMouseMove: _this4.onMenuMouseMove,
            id: _this4.getElementId("listbox")
          },
          isLoading: isLoading,
          placement: placement
        }), React__namespace.createElement(ScrollManager, {
          captureEnabled: captureMenuScroll,
          onTopArrive: onMenuScrollToTop,
          onBottomArrive: onMenuScrollToBottom,
          lockEnabled: menuShouldBlockScroll
        }, (function(scrollTargetRef) {
          return React__namespace.createElement(MenuList, _extends__default.default({}, commonProps, {
            innerRef: function(instance) {
              _this4.getMenuListRef(instance), scrollTargetRef(instance);
            },
            isLoading: isLoading,
            maxHeight: maxHeight,
            focusedOption: focusedOption
          }), menuUI);
        })));
      }));
      return menuPortalTarget || "fixed" === menuPosition ? React__namespace.createElement(MenuPortal, _extends__default.default({}, commonProps, {
        appendTo: menuPortalTarget,
        controlElement: this.controlRef,
        menuPlacement: menuPlacement,
        menuPosition: menuPosition
      }), menuElement) : menuElement;
    }
  }, {
    key: "renderFormField",
    value: function() {
      var _this5 = this, _this$props13 = this.props, delimiter = _this$props13.delimiter, isDisabled = _this$props13.isDisabled, isMulti = _this$props13.isMulti, name = _this$props13.name, selectValue = this.state.selectValue;
      if (name && !isDisabled) {
        if (isMulti) {
          if (delimiter) {
            var value = selectValue.map((function(opt) {
              return _this5.getOptionValue(opt);
            })).join(delimiter);
            return React__namespace.createElement("input", {
              name: name,
              type: "hidden",
              value: value
            });
          }
          var input = selectValue.length > 0 ? selectValue.map((function(opt, i) {
            return React__namespace.createElement("input", {
              key: "i-".concat(i),
              name: name,
              type: "hidden",
              value: _this5.getOptionValue(opt)
            });
          })) : React__namespace.createElement("input", {
            name: name,
            type: "hidden"
          });
          return React__namespace.createElement("div", null, input);
        }
        var _value = selectValue[0] ? this.getOptionValue(selectValue[0]) : "";
        return React__namespace.createElement("input", {
          name: name,
          type: "hidden",
          value: _value
        });
      }
    }
  }, {
    key: "renderLiveRegion",
    value: function() {
      var commonProps = this.commonProps, _this$state6 = this.state, ariaSelection = _this$state6.ariaSelection, focusedOption = _this$state6.focusedOption, focusedValue = _this$state6.focusedValue, isFocused = _this$state6.isFocused, selectValue = _this$state6.selectValue, focusableOptions = this.getFocusableOptions();
      return React__namespace.createElement(LiveRegion, _extends__default.default({}, commonProps, {
        id: this.getElementId("live-region"),
        ariaSelection: ariaSelection,
        focusedOption: focusedOption,
        focusedValue: focusedValue,
        isFocused: isFocused,
        selectValue: selectValue,
        focusableOptions: focusableOptions
      }));
    }
  }, {
    key: "render",
    value: function() {
      var _this$getComponents8 = this.getComponents(), Control = _this$getComponents8.Control, IndicatorsContainer = _this$getComponents8.IndicatorsContainer, SelectContainer = _this$getComponents8.SelectContainer, ValueContainer = _this$getComponents8.ValueContainer, _this$props14 = this.props, className = _this$props14.className, id = _this$props14.id, isDisabled = _this$props14.isDisabled, menuIsOpen = _this$props14.menuIsOpen, isFocused = this.state.isFocused, commonProps = this.commonProps = this.getCommonProps();
      return React__namespace.createElement(SelectContainer, _extends__default.default({}, commonProps, {
        className: className,
        innerProps: {
          id: id,
          onKeyDown: this.onKeyDown
        },
        isDisabled: isDisabled,
        isFocused: isFocused
      }), this.renderLiveRegion(), React__namespace.createElement(Control, _extends__default.default({}, commonProps, {
        innerRef: this.getControlRef,
        innerProps: {
          onMouseDown: this.onControlMouseDown,
          onTouchEnd: this.onControlTouchEnd
        },
        isDisabled: isDisabled,
        isFocused: isFocused,
        menuIsOpen: menuIsOpen
      }), React__namespace.createElement(ValueContainer, _extends__default.default({}, commonProps, {
        isDisabled: isDisabled
      }), this.renderPlaceholderOrValue(), this.renderInput()), React__namespace.createElement(IndicatorsContainer, _extends__default.default({}, commonProps, {
        isDisabled: isDisabled
      }), this.renderClearIndicator(), this.renderLoadingIndicator(), this.renderIndicatorSeparator(), this.renderDropdownIndicator())), this.renderMenu(), this.renderFormField());
    }
  } ], [ {
    key: "getDerivedStateFromProps",
    value: function(props, state) {
      var prevProps = state.prevProps, clearFocusValueOnUpdate = state.clearFocusValueOnUpdate, inputIsHiddenAfterUpdate = state.inputIsHiddenAfterUpdate, ariaSelection = state.ariaSelection, isFocused = state.isFocused, prevWasFocused = state.prevWasFocused, options = props.options, value = props.value, menuIsOpen = props.menuIsOpen, inputValue = props.inputValue, isMulti = props.isMulti, selectValue = index.cleanValue(value), newMenuOptionsState = {};
      if (prevProps && (value !== prevProps.value || options !== prevProps.options || menuIsOpen !== prevProps.menuIsOpen || inputValue !== prevProps.inputValue)) {
        var focusableOptions = menuIsOpen ? buildFocusableOptions(props, selectValue) : [], focusedValue = clearFocusValueOnUpdate ? getNextFocusedValue(state, selectValue) : null;
        newMenuOptionsState = {
          selectValue: selectValue,
          focusedOption: getNextFocusedOption(state, focusableOptions),
          focusedValue: focusedValue,
          clearFocusValueOnUpdate: !1
        };
      }
      var newInputIsHiddenState = null != inputIsHiddenAfterUpdate && props !== prevProps ? {
        inputIsHidden: inputIsHiddenAfterUpdate,
        inputIsHiddenAfterUpdate: void 0
      } : {}, newAriaSelection = ariaSelection, hasKeptFocus = isFocused && prevWasFocused;
      return isFocused && !hasKeptFocus && (newAriaSelection = {
        value: index.valueTernary(isMulti, selectValue, selectValue[0] || null),
        options: selectValue,
        action: "initial-input-focus"
      }, hasKeptFocus = !prevWasFocused), "initial-input-focus" === (null == ariaSelection ? void 0 : ariaSelection.action) && (newAriaSelection = null), 
      index._objectSpread2(index._objectSpread2(index._objectSpread2({}, newMenuOptionsState), newInputIsHiddenState), {}, {
        prevProps: props,
        ariaSelection: newAriaSelection,
        prevWasFocused: hasKeptFocus
      });
    }
  } ]), Select;
}(React.Component);

Select.defaultProps = defaultProps, exports.Select = Select, exports.createFilter = createFilter, 
exports.defaultProps = defaultProps, exports.defaultTheme = defaultTheme, exports.getOptionLabel = getOptionLabel$1, 
exports.getOptionValue = getOptionValue$1, exports.mergeStyles = mergeStyles;
