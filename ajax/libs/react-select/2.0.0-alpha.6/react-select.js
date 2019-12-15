(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('glam'), require('react-dom'), require('react-input-autosize')) :
	typeof define === 'function' && define.amd ? define(['react', 'glam', 'react-dom', 'react-input-autosize'], factory) :
	(global.Select = factory(global.React,global.glam,global.ReactDOM,global.AutosizeInput));
}(this, (function (React,glam,reactDom,AutosizeInput) { 'use strict';

var React__default = 'default' in React ? React['default'] : React;
glam = glam && glam.hasOwnProperty('default') ? glam['default'] : glam;
AutosizeInput = AutosizeInput && AutosizeInput.hasOwnProperty('default') ? AutosizeInput['default'] : AutosizeInput;

var diacritics = [{ base: 'A', letters: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g }, { base: 'AA', letters: /[\uA732]/g }, { base: 'AE', letters: /[\u00C6\u01FC\u01E2]/g }, { base: 'AO', letters: /[\uA734]/g }, { base: 'AU', letters: /[\uA736]/g }, { base: 'AV', letters: /[\uA738\uA73A]/g }, { base: 'AY', letters: /[\uA73C]/g }, { base: 'B', letters: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g }, { base: 'C', letters: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g }, { base: 'D', letters: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g }, { base: 'DZ', letters: /[\u01F1\u01C4]/g }, { base: 'Dz', letters: /[\u01F2\u01C5]/g }, { base: 'E', letters: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g }, { base: 'F', letters: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g }, { base: 'G', letters: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g }, { base: 'H', letters: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g }, { base: 'I', letters: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g }, { base: 'J', letters: /[\u004A\u24BF\uFF2A\u0134\u0248]/g }, { base: 'K', letters: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g }, { base: 'L', letters: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g }, { base: 'LJ', letters: /[\u01C7]/g }, { base: 'Lj', letters: /[\u01C8]/g }, { base: 'M', letters: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g }, { base: 'N', letters: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g }, { base: 'NJ', letters: /[\u01CA]/g }, { base: 'Nj', letters: /[\u01CB]/g }, { base: 'O', letters: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g }, { base: 'OI', letters: /[\u01A2]/g }, { base: 'OO', letters: /[\uA74E]/g }, { base: 'OU', letters: /[\u0222]/g }, { base: 'P', letters: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g }, { base: 'Q', letters: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g }, { base: 'R', letters: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g }, { base: 'S', letters: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g }, { base: 'T', letters: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g }, { base: 'TZ', letters: /[\uA728]/g }, { base: 'U', letters: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g }, { base: 'V', letters: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g }, { base: 'VY', letters: /[\uA760]/g }, { base: 'W', letters: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g }, { base: 'X', letters: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g }, { base: 'Y', letters: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g }, { base: 'Z', letters: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g }, { base: 'a', letters: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g }, { base: 'aa', letters: /[\uA733]/g }, { base: 'ae', letters: /[\u00E6\u01FD\u01E3]/g }, { base: 'ao', letters: /[\uA735]/g }, { base: 'au', letters: /[\uA737]/g }, { base: 'av', letters: /[\uA739\uA73B]/g }, { base: 'ay', letters: /[\uA73D]/g }, { base: 'b', letters: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g }, { base: 'c', letters: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g }, { base: 'd', letters: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g }, { base: 'dz', letters: /[\u01F3\u01C6]/g }, { base: 'e', letters: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g }, { base: 'f', letters: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g }, { base: 'g', letters: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g }, { base: 'h', letters: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g }, { base: 'hv', letters: /[\u0195]/g }, { base: 'i', letters: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g }, { base: 'j', letters: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g }, { base: 'k', letters: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g }, { base: 'l', letters: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g }, { base: 'lj', letters: /[\u01C9]/g }, { base: 'm', letters: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g }, { base: 'n', letters: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g }, { base: 'nj', letters: /[\u01CC]/g }, { base: 'o', letters: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g }, { base: 'oi', letters: /[\u01A3]/g }, { base: 'ou', letters: /[\u0223]/g }, { base: 'oo', letters: /[\uA74F]/g }, { base: 'p', letters: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g }, { base: 'q', letters: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g }, { base: 'r', letters: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g }, { base: 's', letters: /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g }, { base: 't', letters: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g }, { base: 'tz', letters: /[\uA729]/g }, { base: 'u', letters: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g }, { base: 'v', letters: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g }, { base: 'vy', letters: /[\uA761]/g }, { base: 'w', letters: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g }, { base: 'x', letters: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g }, { base: 'y', letters: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g }, { base: 'z', letters: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }];

var stripDiacritics = function stripDiacritics(str) {
	for (var i = 0; i < diacritics.length; i++) {
		str = str.replace(diacritics[i].letters, diacritics[i].base);
	}
	return str;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
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
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var trimString = function trimString(str) {
  return str.replace(/^\s+|\s+$/g, '');
};
var defaulStringify = function defaulStringify(option) {
  return option.label + ' ' + option.value;
};

var createFilter = function createFilter(config) {
  return function (option, rawInput) {
    var _ignoreCase$ignoreAcc = _extends({
      ignoreCase: true,
      ignoreAccents: true,
      stringify: defaulStringify,
      trim: true,
      matchFrom: 'any'
    }, config),
        ignoreCase = _ignoreCase$ignoreAcc.ignoreCase,
        ignoreAccents = _ignoreCase$ignoreAcc.ignoreAccents,
        stringify = _ignoreCase$ignoreAcc.stringify,
        trim = _ignoreCase$ignoreAcc.trim,
        matchFrom = _ignoreCase$ignoreAcc.matchFrom;

    var input = trim ? trimString(rawInput) : rawInput;
    var candidate = trim ? trimString(stringify(option)) : stringify(option);
    if (ignoreCase) {
      input = input.toLowerCase();
      candidate = candidate.toLowerCase();
    }
    if (ignoreAccents) {
      input = stripDiacritics(input);
      candidate = stripDiacritics(candidate);
    }
    return matchFrom === 'start' ? candidate.substr(0, input.length) === input : candidate.indexOf(input) > -1;
  };
};

// @jsx glam

var createPrimitive = function createPrimitive(Tag) {
  return function (_ref) {
    var css = _ref.css,
        innerRef = _ref.innerRef,
        props = objectWithoutProperties(_ref, ['css', 'innerRef']);
    return glam(Tag, _extends({ ref: innerRef, css: css }, props));
  };
};


var Div = createPrimitive('div');
var Span = createPrimitive('span');
var Input = createPrimitive('input');

// Assistive text to describe visual elements. Hidden for sighted users.
var A11yText = function A11yText(props) {
  return glam('span', _extends({
    css: {
      border: 0,
      clip: 'rect(1px, 1px, 1px, 1px)',
      height: 1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: 1
    }
  }, props));
};

var DummyInput = (function (props) {
  return React__default.createElement(Input, _extends({}, props, {
    css: {
      background: 0,
      border: 0,
      fontSize: 'inherit',
      opacity: 0, // removes the cursor
      outline: 0,
      padding: 0,
      width: 1
    }
  }));
});

var NodeResolver = function (_Component) {
  inherits(NodeResolver, _Component);

  function NodeResolver() {
    classCallCheck(this, NodeResolver);
    return possibleConstructorReturn(this, (NodeResolver.__proto__ || Object.getPrototypeOf(NodeResolver)).apply(this, arguments));
  }

  createClass(NodeResolver, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.innerRef(reactDom.findDOMNode(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.innerRef(null);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);
  return NodeResolver;
}(React.Component);

var ScrollCaptor = function (_Component) {
  inherits(ScrollCaptor, _Component);

  function ScrollCaptor() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ScrollCaptor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ScrollCaptor.__proto__ || Object.getPrototypeOf(ScrollCaptor)).call.apply(_ref, [this].concat(args))), _this), _this.isBottom = false, _this.isTop = false, _this.cancelScroll = function (event) {
      event.preventDefault();
      event.stopPropagation();
    }, _this.handleEventDelta = function (event, delta) {
      var _this$props = _this.props,
          onBottomArrive = _this$props.onBottomArrive,
          onBottomLeave = _this$props.onBottomLeave,
          onTopArrive = _this$props.onTopArrive,
          onTopLeave = _this$props.onTopLeave;
      var _this$scrollTarget = _this.scrollTarget,
          scrollTop = _this$scrollTarget.scrollTop,
          scrollHeight = _this$scrollTarget.scrollHeight,
          clientHeight = _this$scrollTarget.clientHeight;

      var target = _this.scrollTarget;
      var isDeltaPositive = delta > 0;
      var availableScroll = scrollHeight - clientHeight - scrollTop;
      var shouldCancelScroll = false;

      // reset bottom/top flags
      if (availableScroll > delta && _this.isBottom) {
        if (onBottomLeave) onBottomLeave(event);
        _this.isBottom = false;
      }
      if (isDeltaPositive && _this.isTop) {
        if (onTopLeave) onTopLeave(event);
        _this.isTop = false;
      }

      // bottom limit
      if (isDeltaPositive && delta > availableScroll) {
        if (onBottomArrive && !_this.isBottom) {
          onBottomArrive(event);
        }
        target.scrollTop = scrollHeight;
        shouldCancelScroll = true;
        _this.isBottom = true;

        // top limit
      } else if (!isDeltaPositive && -delta > scrollTop) {
        if (onTopArrive && !_this.isTop) {
          onTopArrive(event);
        }
        target.scrollTop = 0;
        shouldCancelScroll = true;
        _this.isTop = true;
      }

      // cancel scroll
      if (shouldCancelScroll) {
        _this.cancelScroll(event);
      }
    }, _this.onWheel = function (event) {
      _this.handleEventDelta(event, event.deltaY);
    }, _this.onTouchStart = function (event) {
      // set touch start so we can calculate touchmove delta
      _this.touchStart = event.changedTouches[0].clientY;
    }, _this.onTouchMove = function (event) {
      var deltaY = _this.touchStart - event.changedTouches[0].clientY;
      _this.handleEventDelta(event, deltaY);
    }, _this.getScrollTarget = function (ref) {
      _this.scrollTarget = ref;
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ScrollCaptor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.startListening(this.scrollTarget);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopListening(this.scrollTarget);
    }
  }, {
    key: 'startListening',
    value: function startListening(el) {
      // bail early if no scroll available
      if (el.scrollHeight <= el.clientHeight) return;

      // all the if statements are to appease Flow 😢
      if (typeof el.addEventListener === 'function') {
        el.addEventListener('wheel', this.onWheel, false);
      }
      if (typeof el.addEventListener === 'function') {
        el.addEventListener('touchstart', this.onTouchStart, false);
      }
      if (typeof el.addEventListener === 'function') {
        el.addEventListener('touchmove', this.onTouchMove, false);
      }
    }
  }, {
    key: 'stopListening',
    value: function stopListening(el) {
      // bail early if no scroll available
      if (el.scrollHeight <= el.clientHeight) return;

      // all the if statements are to appease Flow 😢
      if (typeof el.removeEventListener === 'function') {
        el.removeEventListener('wheel', this.onWheel, false);
      }
      if (typeof el.removeEventListener === 'function') {
        el.removeEventListener('touchstart', this.onTouchStart, false);
      }
      if (typeof el.removeEventListener === 'function') {
        el.removeEventListener('touchmove', this.onTouchMove, false);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React__default.createElement(
        NodeResolver,
        { innerRef: this.getScrollTarget },
        this.props.children
      );
    }
  }]);
  return ScrollCaptor;
}(React.Component);

var ScrollCaptorSwitch = function (_Component2) {
  inherits(ScrollCaptorSwitch, _Component2);

  function ScrollCaptorSwitch() {
    classCallCheck(this, ScrollCaptorSwitch);
    return possibleConstructorReturn(this, (ScrollCaptorSwitch.__proto__ || Object.getPrototypeOf(ScrollCaptorSwitch)).apply(this, arguments));
  }

  createClass(ScrollCaptorSwitch, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          isEnabled = _props.isEnabled,
          props = objectWithoutProperties(_props, ['isEnabled']);

      return isEnabled ? React__default.createElement(ScrollCaptor, props) : this.props.children;
    }
  }]);
  return ScrollCaptorSwitch;
}(React.Component);

ScrollCaptorSwitch.defaultProps = { isEnabled: true };

var borderRadius = 4;

var colors = {
  text: '#222',
  textLight: '#444',
  primary: '#2684FF',
  primaryLight: '#DEEBFF',
  danger: '#DE350B',
  dangerLight: '#FFBDAD',

  neutral0: 'hsl(0, 0%, 100%)',
  neutral1: 'hsl(0, 0%, 99%)',
  neutral2: 'hsl(0, 0%, 98%)',
  neutral3: 'hsl(0, 0%, 97%)',
  neutral4: 'hsl(0, 0%, 96%)',
  neutral5: 'hsl(0, 0%, 95%)',
  neutral10: 'hsl(0, 0%, 90%)',
  neutral20: 'hsl(0, 0%, 80%)',
  neutral30: 'hsl(0, 0%, 70%)',
  neutral40: 'hsl(0, 0%, 60%)',
  neutral50: 'hsl(0, 0%, 50%)',
  neutral60: 'hsl(0, 0%, 40%)',
  neutral70: 'hsl(0, 0%, 30%)',
  neutral80: 'hsl(0, 0%, 20%)',
  neutral90: 'hsl(0, 0%, 10%)',
  neutral100: 'hsl(0, 0%, 0%)',

  neutral1a: 'hsla(0, 0%, 0%, 0.01)',
  neutral2a: 'hsla(0, 0%, 0%, 0.02)',
  neutral3a: 'hsla(0, 0%, 0%, 0.03)',
  neutral4a: 'hsla(0, 0%, 0%, 0.04)',
  neutral5a: 'hsla(0, 0%, 0%, 0.05)',
  neutral10a: 'hsla(0, 0%, 0%, 0.1)',
  neutral20a: 'hsla(0, 0%, 0%, 0.2)',
  neutral30a: 'hsla(0, 0%, 0%, 0.3)',
  neutral40a: 'hsla(0, 0%, 0%, 0.4)',
  neutral50a: 'hsla(0, 0%, 0%, 0.5)',
  neutral60a: 'hsla(0, 0%, 0%, 0.6)',
  neutral70a: 'hsla(0, 0%, 0%, 0.7)',
  neutral80a: 'hsla(0, 0%, 0%, 0.8)',
  neutral90a: 'hsla(0, 0%, 0%, 0.9)'
};

var baseUnit = 4;

var spacing = {
  /* Used to calculate consistent margin/padding on elements */
  baseUnit: baseUnit,
  /* The minimum height of the control */
  controlHeight: 36,
  /* The amount of space between the control and menu */
  menuGutter: baseUnit * 2
};

// ==============================
// NO OP
// ==============================

var noop = function noop() {};

// ==============================
// Class Name Prefixer
// ==============================

var CLASS_PREFIX = 'react-select';

/**
 String representation of component state for styling with class names.

 Expects an array of strings OR a string/object pair:
 - className(['comp', 'comp-arg', 'comp-arg-2'])
   @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
 - className('comp', { some: true, state: false })
   @returns 'react-select__comp react-select__comp--some'
*/
function className(name, state) {
  var arr = Array.isArray(name) ? name : [name];

  // loop through state object, remove falsey values and combine with name
  if (state && typeof name === 'string') {
    for (var _key in state) {
      if (state.hasOwnProperty(_key) && state[_key]) {
        arr.push(name + '--' + _key);
      }
    }
  }

  // prefix everything and return a string
  return arr.map(function (cn) {
    return CLASS_PREFIX + '__' + cn;
  }).join(' ');
}

// ==============================
// Clean Value
// ==============================

var cleanValue = function cleanValue(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) return [value];
  return [];
};

// ==============================
// Handle Input Change
// ==============================



// ==============================
// Scroll Into View
// ==============================

var scrollIntoView = function scrollIntoView(menuEl, focusedEl) {
  // TODO: Is there a way to overscroll to group headings?
  var menuRect = menuEl.getBoundingClientRect();
  var focusedRect = focusedEl.getBoundingClientRect();
  var overScroll = focusedEl.offsetHeight / 3;
  if (focusedRect.bottom + overScroll > menuRect.bottom) {
    menuEl.scrollTop = Math.min(focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll, menuEl.scrollHeight);
  } else if (focusedRect.top - overScroll < menuRect.top) {
    menuEl.scrollTop = Math.max(focusedEl.offsetTop - overScroll, 0);
  }
};



// ==============================
// Get Menu Placement
// ==============================

function getMenuPlacement(element) {
  // not enough info to calc properly
  if (!element || !element.offsetParent) return false;

  var _element$offsetParent = element.offsetParent.getBoundingClientRect(),
      containerTop = _element$offsetParent.top;

  var _element$getBoundingC = element.getBoundingClientRect(),
      height = _element$getBoundingC.height,
      top = _element$getBoundingC.top;

  var docEl = document.documentElement;
  var windowHeight = window.innerHeight || docEl && docEl.clientHeight || 0;
  var menuHeight = height + spacing.menuGutter;

  var spaceBelow = windowHeight - top;
  var spaceAbove = containerTop - spacing.menuGutter;

  // the menu will fit above, or at least has more space than below
  if (menuHeight >= spaceBelow && spaceAbove > spaceBelow) {
    return 'top';
  }

  // the menu will fit below, or at least has more space than above
  if (menuHeight >= spaceAbove && spaceBelow > spaceAbove) {
    return 'bottom';
  }

  // no edge conflict found
  return false;
}

var formatGroupLabel = function formatGroupLabel(group) {
  return group.label;
};

var getOptionLabel = function getOptionLabel(option) {
  return option.label;
};

var getOptionValue = function getOptionValue(option) {
  return option.value;
};

var isOptionDisabled = function isOptionDisabled(option) {
  return !!option.isDisabled;
};

// ==============================
// Root Container
// ==============================

var containerCSS = function containerCSS(_ref) {
  var isDisabled = _ref.isDisabled,
      isRtl = _ref.isRtl;
  return {
    direction: isRtl ? 'rtl' : null,
    pointerEvents: isDisabled ? 'none' : null, // cancel mouse events when disabled
    position: 'relative'
  };
};
var SelectContainer = function SelectContainer(props) {
  var children = props.children,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isDisabled = props.isDisabled,
      isRtl = props.isRtl;

  return React__default.createElement(
    Div,
    _extends({
      css: getStyles('container', props),
      className: className('container', { isDisabled: isDisabled, isRtl: isRtl })
    }, innerProps),
    children
  );
};

// ==============================
// Value Container
// ==============================

var valueContainerCSS = function valueContainerCSS(_ref2) {
  var maxHeight = _ref2.maxHeight;
  return {
    alignItems: 'center',
    display: 'flex ',
    flex: 1,
    flexWrap: 'wrap',
    maxHeight: maxHeight, // max-height allows scroll when multi
    overflowY: 'auto',
    padding: spacing.baseUnit / 2 + 'px ' + spacing.baseUnit * 2 + 'px',
    position: 'relative'
  };
};
var ValueContainer = function (_Component) {
  inherits(ValueContainer, _Component);

  function ValueContainer() {
    var _ref3;

    var _temp, _this, _ret;

    classCallCheck(this, ValueContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref3 = ValueContainer.__proto__ || Object.getPrototypeOf(ValueContainer)).call.apply(_ref3, [this].concat(args))), _this), _this.shouldScrollBottom = false, _this.getScrollContainer = function (ref) {
      _this.node = ref;
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ValueContainer, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      if (!this.props.isMulti) return;

      // scroll only if the user was already at the bottom
      var total = this.node.scrollTop + this.node.offsetHeight;
      this.shouldScrollBottom = total === this.node.scrollHeight;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (!this.props.isMulti) return;

      // ensure we're showing items being added by forcing scroll to the bottom
      if (this.shouldScrollBottom && this.node) {
        this.node.scrollTop = this.node.scrollHeight;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          isMulti = _props.isMulti,
          getStyles = _props.getStyles,
          hasValue = _props.hasValue;


      return React__default.createElement(
        Div,
        {
          innerRef: isMulti ? this.getScrollContainer : undefined,
          className: className('value-container', { isMulti: isMulti, hasValue: hasValue }),
          css: getStyles('valueContainer', this.props)
        },
        children
      );
    }
  }]);
  return ValueContainer;
}(React.Component);

// ==============================
// Indicator Container
// ==============================

var indicatorsContainerCSS = function indicatorsContainerCSS() {
  return {
    alignItems: 'center',
    alignSelf: 'stretch',
    display: 'flex ',
    flexShrink: 0
  };
};
var IndicatorsContainer = function IndicatorsContainer(props) {
  var children = props.children,
      getStyles = props.getStyles;


  return React__default.createElement(
    Div,
    {
      className: className('indicators'),
      css: getStyles('indicatorsContainer', props)
    },
    children
  );
};

// @jsx glam
// ==============================
// Dropdown & Clear Icons
// ==============================

var Svg = function Svg(_ref) {
  var size = _ref.size,
      props = objectWithoutProperties(_ref, ['size']);
  return glam('svg', _extends({
    height: size,
    width: size,
    viewBox: '0 0 20 20',
    css: {
      display: 'inline-block',
      fill: 'currentColor',
      lineHeight: 1,
      stroke: 'currentColor',
      strokeWidth: 0
    }
  }, props));
};
var CrossIcon = function CrossIcon(props) {
  return glam(
    Svg,
    _extends({
      size: 20,
      focusable: 'false',
      role: 'presentation',
      className: className(['icon', 'cross-icon'])
    }, props),
    glam('path', { d: 'M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z' })
  );
};
var DownChevron = function DownChevron(props) {
  return glam(
    Svg,
    _extends({
      size: 20,
      focusable: 'false',
      role: 'presentation',
      className: className(['icon', 'down-icon'])
    }, props),
    glam('path', { d: 'M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z' })
  );
};

// ==============================
// Dropdown & Clear Buttons
// ==============================

var baseCSS = function baseCSS(_ref2) {
  var isFocused = _ref2.isFocused;
  return {
    color: isFocused ? colors.neutral60 : colors.neutral20,
    display: 'flex ',
    padding: spacing.baseUnit * 2,
    transition: 'color 150ms',

    ':hover': {
      color: isFocused ? colors.neutral100 : colors.neutral40
    }
  };
};

var dropdownIndicatorCSS = baseCSS;
var DropdownIndicator = function DropdownIndicator(props) {
  var _props$children = props.children,
      children = _props$children === undefined ? glam(DownChevron, null) : _props$children,
      getStyles = props.getStyles,
      innerProps = props.innerProps;

  return glam(
    Div,
    _extends({}, innerProps, {
      css: getStyles('dropdownIndicator', props),
      className: className(['indicator', 'dropdown-indicator'])
    }),
    children
  );
};

var clearIndicatorCSS = baseCSS;
var ClearIndicator = function ClearIndicator(props) {
  var _props$children2 = props.children,
      children = _props$children2 === undefined ? glam(CrossIcon, null) : _props$children2,
      getStyles = props.getStyles,
      innerProps = props.innerProps;

  return glam(
    Div,
    _extends({}, innerProps, {
      css: getStyles('clearIndicator', props),
      className: className(['indicator', 'clear-indicator'])
    }),
    children
  );
};

// ==============================
// Separator
// ==============================

var indicatorSeparatorCSS = function indicatorSeparatorCSS(_ref3) {
  var isDisabled = _ref3.isDisabled;
  return {
    alignSelf: 'stretch',
    backgroundColor: isDisabled ? colors.neutral10 : colors.neutral20,
    marginBottom: spacing.baseUnit * 2,
    marginTop: spacing.baseUnit * 2,
    width: 1
  };
};
var IndicatorSeparator = function IndicatorSeparator(props) {
  var getStyles = props.getStyles,
      innerProps = props.innerProps;

  return glam(Span, _extends({}, innerProps, {
    css: getStyles('indicatorSeparator', props),
    className: className('indicator-separator')
  }));
};

// ==============================
// Loading
// ==============================

var keyframesName = 'react-select-loading-indicator';

var loadingIndicatorCSS = baseCSS;

var LoadingContainer = function LoadingContainer(_ref4) {
  var size = _ref4.size,
      props = objectWithoutProperties(_ref4, ['size']);
  return glam(Div, _extends({
    css: {
      alignSelf: 'center',
      fontSize: size,
      lineHeight: 1,
      marginRight: size,
      textAlign: 'center',
      verticalAlign: 'middle'
    }
  }, props));
};

var LoadingDot = function LoadingDot(_ref5) {
  var color = _ref5.color,
      delay = _ref5.delay,
      offset = _ref5.offset;
  return glam(Span, {
    css: {
      animationDuration: '1s',
      animationDelay: delay + 'ms',
      animationIterationCount: 'infinite',
      animationName: keyframesName,
      animationTimingFunction: 'ease-in-out',
      backgroundColor: color,
      borderRadius: '1em',
      display: 'inline-block',
      marginLeft: offset ? '1em' : null,
      height: '1em',
      verticalAlign: 'top',
      width: '1em'
    }
  });
};

// TODO @jossmac Source `keyframes` solution for glam
// - at the very least, ensure this is only rendered once to the DOM
var loadingAnimation = glam(
  'style',
  { type: 'text/css' },
  '@keyframes ' + keyframesName + ' {\n        0%, 80%, 100% { opacity: 0; }\n        40% { opacity: 1; }\n    };'
);

var LoadingIndicator = function LoadingIndicator(props) {
  var getStyles = props.getStyles,
      innerProps = props.innerProps,
      isFocused = props.isFocused,
      isRtl = props.isRtl,
      _props$size = props.size,
      size = _props$size === undefined ? 4 : _props$size;

  var clr = isFocused ? colors.text : colors.neutral20;

  return glam(
    LoadingContainer,
    _extends({}, innerProps, {
      css: getStyles('loadingIndicator', props),
      className: className(['indicator', 'loading-indicator']),
      size: size
    }),
    loadingAnimation,
    glam(LoadingDot, { color: clr, offset: isRtl }),
    glam(LoadingDot, { color: clr, delay: 160, offset: true }),
    glam(LoadingDot, { color: clr, delay: 320, offset: !isRtl }),
    glam(
      A11yText,
      null,
      'Loading'
    )
  );
};

var css = function css(_ref) {
  var isDisabled = _ref.isDisabled,
      isFocused = _ref.isFocused;
  return {
    alignItems: 'center',
    backgroundColor: isDisabled ? colors.neutral5 : isFocused ? colors.neutral0 : colors.neutral2,
    borderColor: isDisabled ? colors.neutral10 : isFocused ? colors.primary : colors.neutral20,
    borderRadius: borderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
    boxShadow: isFocused ? '0 0 0 1px ' + colors.primary : null,
    cursor: 'default',
    display: 'flex ',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    minHeight: spacing.controlHeight,
    outline: '0 !important',
    position: 'relative',
    transition: 'all 100ms',

    '&:hover': {
      borderColor: isFocused ? colors.primary : colors.neutral30
    }
  };
};

var Control = function Control(props) {
  var children = props.children,
      getStyles = props.getStyles,
      isDisabled = props.isDisabled,
      isFocused = props.isFocused,
      innerProps = props.innerProps;

  return React__default.createElement(
    Div,
    _extends({
      className: className('control', { isDisabled: isDisabled, isFocused: isFocused }),
      css: getStyles('control', props)
    }, innerProps),
    children
  );
};

var groupCSS = function groupCSS() {
  return {
    paddingBottom: spacing.baseUnit * 2,
    paddingTop: spacing.baseUnit * 2
  };
};

var Group = function Group(props) {
  var children = props.children,
      getStyles = props.getStyles,
      Heading = props.Heading,
      headingProps = props.headingProps,
      label = props.label,
      innerProps = props.innerProps;

  return React__default.createElement(
    Div,
    _extends({
      className: className('group'),
      css: getStyles('group', props)
    }, innerProps),
    React__default.createElement(
      Heading,
      _extends({ getStyles: getStyles }, headingProps),
      label
    ),
    React__default.createElement(
      Div,
      null,
      children
    )
  );
};

var groupHeadingCSS = function groupHeadingCSS() {
  return {
    color: '#999',
    cursor: 'default',
    display: 'block',
    fontSize: '75%',
    fontWeight: '500',
    marginBottom: '0.25em',
    paddingLeft: spacing.baseUnit * 3,
    paddingRight: spacing.baseUnit * 3,
    textTransform: 'uppercase'
  };
};

var GroupHeading = function GroupHeading(props) {
  var getStyles = props.getStyles,
      cleanProps = objectWithoutProperties(props, ['getStyles']);

  return React__default.createElement(Div, _extends({
    className: className('group-heading'),
    css: getStyles('groupHeading', props)
  }, cleanProps));
};

var css$1 = function css() {
  return {
    margin: spacing.baseUnit / 2,
    paddingBottom: spacing.baseUnit / 2,
    paddingTop: spacing.baseUnit / 2
  };
};
var inputStyle = function inputStyle(isHidden) {
  return {
    background: 0,
    border: 0,
    fontSize: 'inherit',
    opacity: isHidden ? 0 : 1,
    outline: 0,
    padding: 0
  };
};

var Input$1 = function Input$$1(_ref) {
  var getStyles = _ref.getStyles,
      innerRef = _ref.innerRef,
      isHidden = _ref.isHidden,
      props = objectWithoutProperties(_ref, ['getStyles', 'innerRef', 'isHidden']);
  return React__default.createElement(
    Div,
    { css: getStyles('input', props) },
    React__default.createElement(AutosizeInput, _extends({
      className: className('input'),
      inputRef: innerRef,
      inputStyle: inputStyle(isHidden)
    }, props))
  );
};

// ==============================
// Menu
// ==============================

var placementToCSSProp = { bottom: 'top', top: 'bottom' };
var menuCSS = function menuCSS(_ref) {
  var placement = _ref.placement;
  return defineProperty({
    backgroundColor: colors.neutral0,
    boxShadow: '0 0 0 1px ' + colors.neutral10a + ', 0 4px 11px ' + colors.neutral10a,
    borderRadius: borderRadius,
    marginBottom: spacing.menuGutter,
    marginTop: spacing.menuGutter,
    position: 'absolute',
    width: '100%',
    zIndex: 1
  }, placementToCSSProp[placement], '100%');
};

var Menu = function (_Component) {
  inherits(Menu, _Component);

  function Menu() {
    var _ref3;

    var _temp, _this, _ret;

    classCallCheck(this, Menu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref3 = Menu.__proto__ || Object.getPrototypeOf(Menu)).call.apply(_ref3, [this].concat(args))), _this), _this.state = { placement: _this.props.menuPlacement }, _this.getPlacement = function (ref) {
      if (!ref) return;

      var placement = getMenuPlacement(ref);

      if (!placement) return;

      _this.setState({ placement: placement });
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Menu, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          getStyles = _props.getStyles,
          menuShouldFlip = _props.menuShouldFlip,
          innerProps = _props.innerProps;

      var innerRef = menuShouldFlip ? this.getPlacement : null;

      return React__default.createElement(
        Div,
        _extends({
          className: className('menu'),
          css: getStyles('menu', _extends({}, this.props, this.state)),
          innerRef: innerRef
        }, innerProps),
        children
      );
    }
  }]);
  return Menu;
}(React.Component);

// ==============================
// Menu List
// ==============================

var menuListCSS = function menuListCSS(_ref4) {
  var maxHeight = _ref4.maxHeight;
  return {
    maxHeight: maxHeight,
    overflowY: 'auto',
    paddingBottom: spacing.baseUnit,
    paddingTop: spacing.baseUnit,
    position: 'relative' // required for offset[Height, Top] > keyboard scroll
  };
};
var MenuList = function MenuList(props) {
  var children = props.children,
      getStyles = props.getStyles,
      isMulti = props.isMulti,
      innerProps = props.innerProps;

  return React__default.createElement(
    Div,
    _extends({
      className: className('menu-list', { isMulti: isMulti }),
      css: getStyles('menuList', props)
    }, innerProps),
    children
  );
};

// ==============================
// Menu Notices
// ==============================

var noticeCSS = function noticeCSS() {
  return {
    color: colors.neutral40,
    padding: spacing.baseUnit * 2 + 'px ' + spacing.baseUnit * 3 + 'px',
    textAlign: 'center'
  };
};
var noOptionsMessageCSS = noticeCSS;
var loadingMessageCSS = noticeCSS;

var NoOptionsMessage = function NoOptionsMessage(props) {
  var children = props.children,
      getStyles = props.getStyles,
      innerProps = props.innerProps;

  return React__default.createElement(
    Div,
    _extends({
      className: className(['menu-notice', 'menu-notice--no-options']),
      css: getStyles('noOptionsMessage', props)
    }, innerProps),
    children
  );
};
NoOptionsMessage.defaultProps = {
  children: 'No options'
};

var LoadingMessage = function LoadingMessage(props) {
  var children = props.children,
      getStyles = props.getStyles,
      innerProps = props.innerProps;

  return React__default.createElement(
    Div,
    _extends({
      className: className(['menu-notice', 'menu-notice--loading']),
      css: getStyles('loadingMessage', props)
    }, innerProps),
    children
  );
};
LoadingMessage.defaultProps = {
  children: 'Loading...'
};

var multiValueCSS = function multiValueCSS() {
  return {
    backgroundColor: colors.neutral10,
    borderRadius: borderRadius / 2,
    display: 'flex ',
    margin: spacing.baseUnit / 2,
    minWidth: 0 // resolves flex/text-overflow bug
  };
};
var multiValueLabelCSS = function multiValueLabelCSS(_ref) {
  var cropWithEllipsis = _ref.cropWithEllipsis;
  return {
    color: colors.text,
    fontSize: '85%',
    overflow: 'hidden',
    padding: 3,
    paddingLeft: 6,
    textOverflow: cropWithEllipsis ? 'ellipsis' : null,
    whiteSpace: 'nowrap'
  };
};
var multiValueRemoveCSS = function multiValueRemoveCSS() {
  return {
    alignItems: 'center',
    borderRadius: borderRadius / 2,
    color: colors.textLight,
    display: 'flex ',
    paddingLeft: spacing.baseUnit,
    paddingRight: spacing.baseUnit,

    ':hover': {
      backgroundColor: colors.dangerLight,
      color: colors.danger
    }
  };
};

var MultiValueContainer = Div;
var MultiValueLabel = Div;
var MultiValueRemove = Div;

var MultiValue = function MultiValue(props) {
  var children = props.children,
      components = props.components,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isDisabled = props.isDisabled,
      removeProps = props.removeProps;

  var cn = {
    container: className('multi-value', { isDisabled: isDisabled }),
    label: className('multi-value__label'),
    remove: className('multi-value__remove')
  };
  var css = {
    container: getStyles('multiValue', props),
    label: getStyles('multiValueLabel', props),
    remove: getStyles('multiValueRemove', props)
  };
  var Container = components.Container,
      Label = components.Label,
      Remove = components.Remove;


  return React__default.createElement(
    Container,
    _extends({ className: cn.container, css: css.container }, innerProps),
    React__default.createElement(
      Label,
      { className: cn.label, css: css.label },
      children
    ),
    React__default.createElement(
      Remove,
      _extends({ className: cn.remove, css: css.remove }, removeProps),
      React__default.createElement(CrossIcon, { size: 14 })
    )
  );
};
MultiValue.defaultProps = {
  cropWithEllipsis: true
};

var css$2 = function css(_ref) {
  var isDisabled = _ref.isDisabled,
      isFocused = _ref.isFocused,
      isSelected = _ref.isSelected;
  return {
    backgroundColor: isSelected ? colors.primary : isFocused ? colors.primaryLight : 'transparent',
    color: isDisabled ? colors.neutral20 : isSelected ? colors.neutral0 : 'inherit',
    cursor: 'default',
    display: 'block',
    fontSize: 'inherit',
    padding: spacing.baseUnit * 2 + 'px ' + spacing.baseUnit * 3 + 'px',
    width: '100%'
  };
};

var Option = function Option(props) {
  var children = props.children,
      getStyles = props.getStyles,
      isFocused = props.isFocused,
      isSelected = props.isSelected,
      innerProps = props.innerProps;


  return React__default.createElement(
    Div,
    _extends({
      className: className('option', { isFocused: isFocused, isSelected: isSelected }),
      css: getStyles('option', props)
    }, innerProps),
    children
  );
};

var css$3 = function css() {
  return {
    color: colors.neutral60,
    marginLeft: spacing.baseUnit / 2,
    marginRight: spacing.baseUnit / 2,
    position: 'absolute'
  };
};

var Placeholder = function Placeholder(props) {
  var children = props.children,
      getStyles = props.getStyles,
      innerProps = props.innerProps;

  return React__default.createElement(
    Div,
    _extends({
      className: className('placeholder'),
      css: getStyles('placeholder', props)
    }, innerProps),
    children
  );
};

var css$4 = function css(_ref) {
  var isDisabled = _ref.isDisabled;
  return {
    color: isDisabled ? colors.neutral40 : colors.text,
    marginLeft: spacing.baseUnit / 2,
    marginRight: spacing.baseUnit / 2,
    maxWidth: '100%',
    overflow: 'hidden',
    position: 'absolute',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };
};

var SingleValue = function SingleValue(props) {
  var children = props.children,
      getStyles = props.getStyles,
      isDisabled = props.isDisabled,
      innerProps = props.innerProps;

  return React__default.createElement(
    Div,
    _extends({
      className: className('single-value', { isDisabled: isDisabled }),
      css: getStyles('singleValue', props)
    }, innerProps),
    children
  );
};

var components = {
  ClearIndicator: ClearIndicator,
  Control: Control,
  DropdownIndicator: DropdownIndicator,
  Group: Group,
  GroupHeading: GroupHeading,
  IndicatorsContainer: IndicatorsContainer,
  IndicatorSeparator: IndicatorSeparator,
  Input: Input$1,
  LoadingIndicator: LoadingIndicator,
  Menu: Menu,
  MenuList: MenuList,
  LoadingMessage: LoadingMessage,
  NoOptionsMessage: NoOptionsMessage,
  MultiValue: MultiValue,
  MultiValueContainer: MultiValueContainer,
  MultiValueLabel: MultiValueLabel,
  MultiValueRemove: MultiValueRemove,
  Option: Option,
  Placeholder: Placeholder,
  SelectContainer: SelectContainer,
  SingleValue: SingleValue,
  ValueContainer: ValueContainer
};

var defaultComponents = function defaultComponents(props) {
  return _extends({}, components, props.components);
};

var defaultStyles = {
  clearIndicator: clearIndicatorCSS,
  container: containerCSS,
  control: css,
  dropdownIndicator: dropdownIndicatorCSS,
  group: groupCSS,
  groupHeading: groupHeadingCSS,
  indicatorsContainer: indicatorsContainerCSS,
  indicatorSeparator: indicatorSeparatorCSS,
  input: css$1,
  loadingIndicator: loadingIndicatorCSS,
  loadingMessage: loadingMessageCSS,
  menu: menuCSS,
  menuList: menuListCSS,
  multiValue: multiValueCSS,
  multiValueLabel: multiValueLabelCSS,
  multiValueRemove: multiValueRemoveCSS,
  noOptionsMessage: noOptionsMessageCSS,
  option: css$2,
  placeholder: css$3,
  singleValue: css$4,
  valueContainer: valueContainerCSS
};

// Merge Utility
// Allows consumers to extend a base Select with additional styles

var defaultProps = {
  backspaceRemovesValue: true,
  captureMenuScroll: true,
  closeMenuOnSelect: true,
  components: {},
  escapeClearsValue: false,
  filterOption: createFilter(),
  formatGroupLabel: formatGroupLabel,
  getOptionLabel: getOptionLabel,
  getOptionValue: getOptionValue,
  hideSelectedOptions: true,
  isDisabled: false,
  isLoading: false,
  isMulti: false,
  isRtl: false,
  isSearchable: true,
  isOptionDisabled: isOptionDisabled,
  loadingMessage: function loadingMessage() {
    return 'Loading...';
  },
  maxMenuHeight: 300,
  maxValueHeight: 100,
  menuIsOpen: false,
  menuPlacement: 'bottom',
  menuShouldFlip: true,
  noOptionsMessage: function noOptionsMessage() {
    return 'No options';
  },
  options: [],
  pageSize: 5,
  placeholder: 'Select...',
  screenReaderStatus: function screenReaderStatus(_ref) {
    var count = _ref.count;
    return count + ' result' + (count !== 1 ? 's' : '') + ' available.';
  },
  styles: {},
  tabSelectsValue: true
};

var instanceId = 1;

var Select$1 = function (_Component) {
  inherits(Select, _Component);

  function Select(props) {
    classCallCheck(this, Select);

    var _this = possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _initialiseProps.call(_this);

    var options = props.options,
        value = props.value;

    _this.components = defaultComponents(props);
    _this.instancePrefix = 'react-select-' + (_this.props.instanceId || ++instanceId) + '-';

    var selectValue = cleanValue(value);
    var menuOptions = _this.buildMenuOptions(options, selectValue);

    _this.state.menuOptions = menuOptions;
    _this.state.selectValue = selectValue;
    return _this;
  } // TODO


  createClass(Select, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autoFocus) {
        this.focus();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          components$$1 = _props.components,
          options = _props.options,
          value = _props.value,
          inputValue = _props.inputValue;
      // re-cache custom components

      if (nextProps.components !== components$$1) {
        this.components = defaultComponents(nextProps);
      }
      // rebuild the menu options
      if (nextProps.value !== value || nextProps.options !== options || nextProps.inputValue !== inputValue) {
        var _selectValue = cleanValue(nextProps.value);
        var _menuOptions = this.buildMenuOptions(nextProps.options, _selectValue, nextProps.inputValue);
        var _focusedOption = this.getNextFocusedOption(_menuOptions.focusable);
        this.setState({ menuOptions: _menuOptions, selectValue: _selectValue, focusedOption: _focusedOption });
      }
      // some updates should toggle the state of the input visibility
      if (this.inputIsHiddenAfterUpdate != null) {
        this.setState({
          inputIsHidden: this.inputIsHiddenAfterUpdate
        });
        delete this.inputIsHiddenAfterUpdate;
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.menuRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate) {
        scrollIntoView(this.menuRef, this.focusedOptionRef);
      }
      this.scrollToFocusedOptionOnUpdate = false;
    }
  }, {
    key: 'getNextFocusedOption',
    value: function getNextFocusedOption(options) {
      var lastFocusedOption = this.state.focusedOption;

      return lastFocusedOption && options.indexOf(lastFocusedOption) > -1 ? lastFocusedOption : options[0];
    }
  }, {
    key: 'buildMenuOptions',
    value: function buildMenuOptions(options, selectValue) {
      var _this2 = this;

      var inputValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var _props2 = this.props,
          hideSelectedOptions = _props2.hideSelectedOptions,
          isMulti = _props2.isMulti;


      var toOption = function toOption(option, id) {
        var isDisabled = _this2.isOptionDisabled(option);
        var isSelected = _this2.isOptionSelected(option, selectValue);
        var label = _this2.getOptionLabel(option);
        var value = _this2.getOptionValue(option);

        if (isMulti && hideSelectedOptions && isSelected || !_this2.filterOption({ label: label, value: value, data: option }, inputValue)) {
          return;
        }

        var onHover = isDisabled ? undefined : function () {
          return _this2.onOptionHover(option);
        };
        var onSelect = isDisabled ? undefined : function () {
          return _this2.selectOption(option);
        };
        var optionId = _this2.getElementId('option') + '-' + id;

        return {
          innerProps: {
            'aria-selected': isSelected,
            id: optionId,
            onClick: onSelect,
            onMouseMove: onHover,
            onMouseOver: onHover,
            role: 'option',
            tabIndex: -1
          },
          data: option,
          isDisabled: isDisabled,
          isSelected: isSelected,
          key: optionId,
          label: label,
          type: 'option',
          value: value
        };
      };

      return options.reduce(function (acc, item, itemIndex) {
        if (item.options) {
          // TODO needs a tidier implementation
          if (!_this2.hasGroups) _this2.hasGroups = true;

          var items = item.options;

          var children = items.map(function (child, i) {
            var option = toOption(child, itemIndex + '-' + i);
            if (option && !option.isDisabled) acc.focusable.push(child);
            return option;
          }).filter(Boolean);
          if (children.length) {
            var groupId = _this2.getElementId('group') + '-' + itemIndex;
            acc.render.push({
              type: 'group',
              key: groupId,
              data: item,
              options: children
            });
          }
        } else {
          var option = toOption(item, itemIndex);
          if (option) {
            acc.render.push(option);
            if (!option.isDisabled) acc.focusable.push(item);
          }
        }
        return acc;
      }, { render: [], focusable: [] });
    }
  }, {
    key: 'filterOption',
    value: function filterOption(option, inputValue) {
      return this.props.filterOption ? this.props.filterOption(option, inputValue) : true;
    }
  }, {
    key: 'formatOptionLabel',
    value: function formatOptionLabel(data, context) {
      if (typeof this.props.formatOptionLabel === 'function') {
        var _inputValue = this.props.inputValue;
        var _selectValue2 = this.state.selectValue;

        return this.props.formatOptionLabel(data, {
          context: context,
          inputValue: _inputValue,
          selectValue: _selectValue2
        });
      } else {
        return this.getOptionLabel(data);
      }
    }
  }, {
    key: 'formatGroupLabel',
    value: function formatGroupLabel$$1(data) {
      return this.props.formatGroupLabel(data);
    }
  }, {
    key: 'getOptionLabel',
    value: function getOptionLabel$$1(data) {
      return this.props.getOptionLabel(data);
    }
  }, {
    key: 'getOptionValue',
    value: function getOptionValue$$1(data) {
      return this.props.getOptionValue(data);
    }
  }, {
    key: 'hasValue',
    value: function hasValue() {
      var selectValue = this.state.selectValue;

      return selectValue.length > 0;
    }
  }, {
    key: 'hasOptions',
    value: function hasOptions() {
      return !!this.state.menuOptions.render.length;
    }
  }, {
    key: 'countOptions',
    value: function countOptions() {
      return this.state.menuOptions.focusable.length;
    }
  }, {
    key: 'isClearable',
    value: function isClearable() {
      var _props3 = this.props,
          isClearable = _props3.isClearable,
          isMulti = _props3.isMulti;

      // single select, by default, IS NOT clearable
      // multi select, by default, IS clearable

      if (isClearable === undefined) return isMulti;

      return isClearable;
    }
  }, {
    key: 'isOptionDisabled',
    value: function isOptionDisabled$$1(option) {
      return typeof this.props.isOptionDisabled === 'function' ? this.props.isOptionDisabled(option) : false;
    }
  }, {
    key: 'isOptionSelected',
    value: function isOptionSelected(option, selectValue) {
      var _this3 = this;

      if (selectValue.indexOf(option) > -1) return true;
      if (typeof this.props.isOptionSelected === 'function') {
        return this.props.isOptionSelected(option, selectValue);
      }
      var candidate = this.getOptionValue(option);
      return selectValue.some(function (i) {
        return _this3.getOptionValue(i) === candidate;
      });
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (!this.input) return;
      this.input.focus();
    }
  }, {
    key: 'blurInput',
    value: function blurInput() {
      if (!this.input) return;
      this.input.blur();
    }
  }, {
    key: 'onMenuOpen',
    value: function onMenuOpen() {
      this.props.onMenuOpen();
    }
  }, {
    key: 'onMenuClose',
    value: function onMenuClose() {
      this.props.onMenuClose();
    }
  }, {
    key: 'onInputChange',
    value: function onInputChange(newValue) {
      this.props.onInputChange(newValue);
    }
  }, {
    key: 'openMenu',
    value: function openMenu() {
      var focusOption = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'first';
      var _state = this.state,
          menuOptions = _state.menuOptions,
          selectValue = _state.selectValue;
      var isMulti = this.props.isMulti;


      var openAtIndex = focusOption === 'first' ? 0 : menuOptions.focusable.length - 1;

      if (!isMulti) {
        var selectedIndex = menuOptions.focusable.indexOf(selectValue[0]);
        if (selectedIndex > -1) {
          openAtIndex = selectedIndex;
        }
      }

      this.scrollToFocusedOptionOnUpdate = true;
      this.inputIsHiddenAfterUpdate = false;
      this.onMenuOpen();
      this.setState({
        focusedOption: menuOptions.focusable[openAtIndex]
      });
    }
  }, {
    key: 'focusOption',
    value: function focusOption() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'first';
      var pageSize = this.props.pageSize;
      var _state2 = this.state,
          focusedOption = _state2.focusedOption,
          menuOptions = _state2.menuOptions;

      var options = menuOptions.focusable;
      if (!options.length) return;
      var nextFocus = 0; // handles 'first'
      var focusedIndex = focusedOption ? options.indexOf(focusedOption) : -1;
      if (direction === 'up') {
        nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
      } else if (direction === 'down') {
        nextFocus = (focusedIndex + 1) % options.length;
      } else if (direction === 'pageup') {
        nextFocus = focusedIndex - pageSize;
        if (nextFocus < 0) nextFocus = 0;
      } else if (direction === 'pagedown') {
        nextFocus = focusedIndex + pageSize;
        if (nextFocus > options.length - 1) nextFocus = options.length - 1;
      } else if (direction === 'last') {
        nextFocus = options.length - 1;
      }
      this.scrollToFocusedOptionOnUpdate = true;
      this.setState({
        focusedOption: options[nextFocus]
      });
    }
    // TODO: Review whether this is necessary

  }, {
    key: 'renderScreenReaderStatus',
    value: function renderScreenReaderStatus() {
      var screenReaderStatus = this.props.screenReaderStatus;

      return React__default.createElement(
        A11yText,
        { 'aria-atomic': 'true', 'aria-live': 'polite', role: 'status' },
        screenReaderStatus({ count: this.countOptions() })
      );
    }
  }, {
    key: 'renderInput',
    value: function renderInput(id) {
      var _props4 = this.props,
          isDisabled = _props4.isDisabled,
          isLoading = _props4.isLoading,
          isSearchable = _props4.isSearchable,
          inputValue = _props4.inputValue,
          menuIsOpen = _props4.menuIsOpen;
      var Input$$1 = this.components.Input;
      var inputIsHidden = this.state.inputIsHidden;


      if (!isSearchable) {
        // use a dummy input to maintain focus/blur functionality
        return React__default.createElement(DummyInput, {
          onBlur: this.onInputBlur,
          onChange: noop,
          onFocus: this.onInputFocus,
          innerRef: this.onInputRef,
          value: ''
        });
      } else if (isDisabled) {
        // maintain baseline alignment when the input is removed for disabled state
        return React__default.createElement('div', { style: { height: this.inputHeight } });
      }

      // aria attributes makes the JSX "noisy", separated for clarity
      var ariaAttributes = {
        'aria-activedescendant': this.getActiveDescendentId(),
        'aria-autocomplete': 'list',
        'aria-busy': isLoading,
        'aria-describedby': this.props['aria-describedby'],
        'aria-expanded': menuIsOpen,
        'aria-haspopup': menuIsOpen,
        'aria-label': this.props['aria-label'],
        'aria-labelledby': this.props['aria-labelledby'],
        'aria-owns': menuIsOpen ? this.getElementId('listbox') : undefined,
        role: 'combobox'
      };

      return React__default.createElement(Input$$1, _extends({
        autoCapitalize: 'none',
        autoComplete: 'off',
        autoCorrect: 'off',
        getStyles: this.getStyles,
        id: id,
        innerRef: this.onInputRef,
        isHidden: inputIsHidden,
        onBlur: this.onInputBlur,
        onChange: this.handleInputChange,
        onFocus: this.onInputFocus,
        spellCheck: 'false',
        tabIndex: '0',
        type: 'text',
        value: inputValue
      }, ariaAttributes));
    }
  }, {
    key: 'renderPlaceholderOrValue',
    value: function renderPlaceholderOrValue() {
      var _this4 = this;

      var _components = this.components,
          MultiValue = _components.MultiValue,
          MultiValueContainer = _components.MultiValueContainer,
          MultiValueLabel = _components.MultiValueLabel,
          MultiValueRemove = _components.MultiValueRemove,
          SingleValue = _components.SingleValue,
          Placeholder = _components.Placeholder;
      var commonProps = this.commonProps;
      var _props5 = this.props,
          isDisabled = _props5.isDisabled,
          isMulti = _props5.isMulti,
          inputValue = _props5.inputValue,
          placeholder = _props5.placeholder;
      var selectValue = this.state.selectValue;


      if (!this.hasValue()) {
        return inputValue ? null : React__default.createElement(
          Placeholder,
          _extends({}, commonProps, { key: 'placeholder', isDisabled: isDisabled }),
          placeholder
        );
      }
      if (isMulti) {
        return selectValue.map(function (opt) {
          return React__default.createElement(
            MultiValue,
            _extends({}, commonProps, {
              components: {
                Container: MultiValueContainer,
                Label: MultiValueLabel,
                Remove: MultiValueRemove
              },
              isDisabled: isDisabled,
              key: _this4.getOptionValue(opt),
              removeProps: {
                onClick: function onClick() {
                  return _this4.removeValue(opt);
                },
                onMouseDown: function onMouseDown(e) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              },
              data: opt
            }),
            _this4.formatOptionLabel(opt, 'value')
          );
        });
      }
      if (inputValue) return null;
      var singleValue = selectValue[0];
      return React__default.createElement(
        SingleValue,
        _extends({}, commonProps, { data: singleValue, isDisabled: isDisabled }),
        this.formatOptionLabel(singleValue, 'value')
      );
    }
  }, {
    key: 'renderClearIndicator',
    value: function renderClearIndicator() {
      var ClearIndicator = this.components.ClearIndicator;
      var commonProps = this.commonProps;
      var _props6 = this.props,
          isDisabled = _props6.isDisabled,
          isLoading = _props6.isLoading;
      var isFocused = this.state.isFocused;


      if (!this.isClearable() || !ClearIndicator || isDisabled || !this.hasValue() || isLoading) {
        return null;
      }

      var innerProps = {
        onMouseDown: this.onClearIndicatorMouseDown,
        role: 'button'
      };

      return React__default.createElement(ClearIndicator, _extends({}, commonProps, {
        innerProps: innerProps,
        isFocused: isFocused
      }));
    }
  }, {
    key: 'renderLoadingIndicator',
    value: function renderLoadingIndicator() {
      var LoadingIndicator = this.components.LoadingIndicator;
      var commonProps = this.commonProps;
      var _props7 = this.props,
          isDisabled = _props7.isDisabled,
          isLoading = _props7.isLoading;
      var isFocused = this.state.isFocused;


      if (!LoadingIndicator || !isLoading) return null;

      var innerProps = {
        role: 'presentation'
      };

      return React__default.createElement(LoadingIndicator, _extends({}, commonProps, {
        innerProps: innerProps,
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: 'renderIndicatorSeparator',
    value: function renderIndicatorSeparator() {
      var IndicatorSeparator = this.components.IndicatorSeparator;

      if (!IndicatorSeparator) return null;
      var commonProps = this.commonProps;
      var isDisabled = this.props.isDisabled;
      var isFocused = this.state.isFocused;


      var innerProps = { role: 'presentation' };

      return React__default.createElement(IndicatorSeparator, _extends({}, commonProps, {
        innerProps: innerProps,
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: 'renderDropdownIndicator',
    value: function renderDropdownIndicator() {
      var DropdownIndicator = this.components.DropdownIndicator;

      if (!DropdownIndicator) return null;
      var commonProps = this.commonProps;
      var isDisabled = this.props.isDisabled;
      var isFocused = this.state.isFocused;


      var innerProps = {
        onMouseDown: this.onDropdownIndicatorMouseDown,
        role: 'button'
      };

      return React__default.createElement(DropdownIndicator, _extends({}, commonProps, {
        innerProps: innerProps,
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: 'renderMenu',
    value: function renderMenu() {
      var _this5 = this;

      var _components2 = this.components,
          Group = _components2.Group,
          GroupHeading = _components2.GroupHeading,
          Menu = _components2.Menu,
          MenuList = _components2.MenuList,
          LoadingMessage = _components2.LoadingMessage,
          NoOptionsMessage = _components2.NoOptionsMessage,
          Option = _components2.Option;
      var commonProps = this.commonProps;
      var _state3 = this.state,
          focusedOption = _state3.focusedOption,
          menuOptions = _state3.menuOptions;
      var _props8 = this.props,
          captureMenuScroll = _props8.captureMenuScroll,
          inputValue = _props8.inputValue,
          isLoading = _props8.isLoading,
          isMulti = _props8.isMulti,
          loadingMessage = _props8.loadingMessage,
          maxMenuHeight = _props8.maxMenuHeight,
          menuIsOpen = _props8.menuIsOpen,
          menuPlacement = _props8.menuPlacement,
          menuShouldFlip = _props8.menuShouldFlip,
          noOptionsMessage = _props8.noOptionsMessage;


      if (!menuIsOpen) return null;

      // TODO: Internal Option Type here
      var render = function render(props) {
        // for performance, the menu options in state aren't changed when the
        // focused option changes so we calculate additional props based on that
        var isFocused = focusedOption === props.data;
        props.innerProps.innerRef = isFocused ? _this5.onFocusedOptionRef : undefined;

        return React__default.createElement(
          Option,
          _extends({}, commonProps, props, { isFocused: isFocused }),
          _this5.formatOptionLabel(props.data, 'menu')
        );
      };

      var menuUI = void 0;

      if (this.hasOptions()) {
        menuUI = menuOptions.render.map(function (item) {
          if (item.type === 'group') {
            var type = item.type,
                group = objectWithoutProperties(item, ['type']);

            var headingId = item.key + '-heading';

            return React__default.createElement(
              Group,
              _extends({}, commonProps, group, {
                Heading: GroupHeading,
                innerProps: {
                  'aria-expanded': true,
                  'aria-labelledby': headingId,
                  role: 'group'
                },
                headingProps: {
                  id: headingId
                },
                label: _this5.formatGroupLabel(item.data)
              }),
              item.options.map(function (option) {
                return render(option);
              })
            );
          } else if (item.type === 'option') {
            return render(item);
          }
        });
      } else if (isLoading) {
        menuUI = React__default.createElement(
          LoadingMessage,
          commonProps,
          loadingMessage({ inputValue: inputValue })
        );
      } else {
        menuUI = React__default.createElement(
          NoOptionsMessage,
          commonProps,
          noOptionsMessage({ inputValue: inputValue })
        );
      }

      return React__default.createElement(
        Menu,
        _extends({}, commonProps, {
          innerProps: {
            onMouseDown: this.onMenuMouseDown,
            onMouseMove: this.onMenuMouseMove
          },
          isLoading: isLoading,
          menuPlacement: menuPlacement,
          menuShouldFlip: menuShouldFlip
        }),
        React__default.createElement(
          ScrollCaptorSwitch,
          { isEnabled: captureMenuScroll },
          React__default.createElement(
            MenuList,
            _extends({}, commonProps, {
              innerProps: {
                'aria-multiselectable': isMulti,
                id: this.getElementId('listbox'),
                innerRef: this.onMenuRef,
                role: 'listbox'
              },
              isLoading: isLoading,
              maxHeight: maxMenuHeight
            }),
            menuUI
          )
        )
      );
    }
  }, {
    key: 'renderFormField',
    value: function renderFormField() {
      var _this6 = this;

      var _props9 = this.props,
          delimiter = _props9.delimiter,
          isDisabled = _props9.isDisabled,
          isMulti = _props9.isMulti,
          name = _props9.name;
      var selectValue = this.state.selectValue;


      if (!name || isDisabled) return;

      if (isMulti) {
        if (delimiter) {
          var _value = selectValue.map(function (opt) {
            return _this6.getOptionValue(opt);
          }).join(delimiter);
          return React__default.createElement('input', { name: name, type: 'hidden', value: _value });
        } else {
          return React__default.createElement(
            'div',
            null,
            selectValue.map(function (opt, i) {
              return React__default.createElement('input', {
                key: 'i-' + i,
                name: name,
                type: 'hidden',
                value: _this6.getOptionValue(opt)
              });
            })
          );
        }
      } else {
        var _value2 = selectValue[0] ? this.getOptionValue(selectValue[0]) : '';
        return React__default.createElement('input', { name: name, type: 'hidden', value: _value2 });
      }
    }
  }, {
    key: 'getCommonProps',
    value: function getCommonProps() {
      var clearValue = this.clearValue,
          getStyles = this.getStyles,
          setValue = this.setValue,
          selectOption = this.selectOption,
          props = this.props;
      var isMulti = props.isMulti,
          isRtl = props.isRtl,
          options = props.options;
      var selectValue = this.state.selectValue;

      var hasValue = this.hasValue();
      var getValue = function getValue() {
        return selectValue;
      };
      return {
        clearValue: clearValue,
        getStyles: getStyles,
        getValue: getValue,
        hasValue: hasValue,
        isMulti: isMulti,
        isRtl: isRtl,
        options: options,
        selectOption: selectOption,
        setValue: setValue,
        selectProps: props
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _components3 = this.components,
          Control = _components3.Control,
          IndicatorsContainer = _components3.IndicatorsContainer,
          SelectContainer = _components3.SelectContainer,
          ValueContainer = _components3.ValueContainer;
      var _props10 = this.props,
          isDisabled = _props10.isDisabled,
          maxValueHeight = _props10.maxValueHeight;
      var isFocused = this.state.isFocused;

      var inputId = this.getElementId('input');

      var commonProps = this.commonProps = this.getCommonProps();

      return React__default.createElement(
        SelectContainer,
        _extends({}, commonProps, {
          innerProps: {
            onKeyDown: this.onKeyDown
          },
          isDisabled: isDisabled,
          isFocused: isFocused
        }),
        this.renderScreenReaderStatus(),
        React__default.createElement(
          Control,
          _extends({}, commonProps, {
            innerProps: {
              onMouseDown: this.onControlMouseDown,
              innerRef: this.onControlRef
            },
            isDisabled: isDisabled,
            isFocused: isFocused
          }),
          React__default.createElement(
            ValueContainer,
            _extends({}, commonProps, {
              isDisabled: isDisabled,
              maxHeight: maxValueHeight
            }),
            this.renderPlaceholderOrValue(),
            this.renderInput(inputId)
          ),
          React__default.createElement(
            IndicatorsContainer,
            _extends({}, commonProps, { isDisabled: isDisabled }),
            this.renderClearIndicator(),
            this.renderLoadingIndicator(),
            this.renderIndicatorSeparator(),
            this.renderDropdownIndicator()
          )
        ),
        this.renderMenu(),
        this.renderFormField()
      );
    }
  }]);
  return Select;
}(React.Component);

Select$1.defaultProps = defaultProps;

var _initialiseProps = function _initialiseProps() {
  var _this7 = this;

  this.blockOptionHover = false;
  this.hasGroups = false;
  this.inputHeight = 20;
  this.instancePrefix = '';
  this.openAfterFocus = false;
  this.scrollToFocusedOptionOnUpdate = false;
  this.state = {
    focusedOption: null,
    inputIsHidden: false,
    isFocused: false,
    menuOptions: { render: [], focusable: [] },
    selectValue: []
  };

  this.getStyles = function (key, props) {
    var base = defaultStyles[key](props);
    base.boxSizing = 'border-box';
    var custom = _this7.props.styles[key];
    return custom ? custom(base, props) : base;
  };

  this.setValue = function (newValue) {
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'set-value';
    var _props11 = _this7.props,
        closeMenuOnSelect = _props11.closeMenuOnSelect,
        isMulti = _props11.isMulti,
        onChange = _props11.onChange;
    // We update the state first because we should clear inputValue when an
    // option is selected; the onChange event fires when that's reconciled
    // otherwise the new menu items will be filtered with the old inputValue

    _this7.onInputChange('');
    if (closeMenuOnSelect) {
      _this7.inputIsHiddenAfterUpdate = !isMulti;
      _this7.onMenuClose();
    }
    onChange(newValue, { action: action });
  };

  this.selectOption = function (newValue) {
    var isMulti = _this7.props.isMulti;

    if (isMulti) {
      var _selectValue3 = _this7.state.selectValue;

      if (_this7.isOptionSelected(newValue, _selectValue3)) {
        _this7.setValue(_selectValue3.filter(function (i) {
          return i !== newValue;
        }), 'deselect-option');
      } else {
        _this7.setValue([].concat(toConsumableArray(_selectValue3), [newValue]), 'select-option');
      }
    } else {
      _this7.setValue(newValue, 'select-option');
    }
  };

  this.removeValue = function (removedValue) {
    var onChange = _this7.props.onChange;
    var selectValue = _this7.state.selectValue;

    onChange(selectValue.filter(function (i) {
      return i !== removedValue;
    }), {
      action: 'remove-value'
    });
    _this7.focus();
  };

  this.clearValue = function () {
    var _props12 = _this7.props,
        isMulti = _props12.isMulti,
        onChange = _props12.onChange;

    onChange(isMulti ? [] : null, { action: 'clear' });
  };

  this.popValue = function () {
    var onChange = _this7.props.onChange;
    var selectValue = _this7.state.selectValue;

    onChange(selectValue.slice(0, selectValue.length - 1), {
      action: 'pop-value'
    });
  };

  this.onControlRef = function (ref) {
    _this7.controlRef = ref;
  };

  this.onControlMouseDown = function (event) {
    if (!_this7.state.isFocused) {
      _this7.openAfterFocus = true;
      _this7.focus();
    } else if (!_this7.state.menuIsOpen) {
      _this7.openMenu('first');
    } else {
      _this7.onMenuClose();
    }
    if (event.target.tagName !== 'INPUT') {
      event.preventDefault();
    }
  };

  this.onKeyDown = function (event) {
    var _props13 = _this7.props,
        backspaceRemovesValue = _props13.backspaceRemovesValue,
        escapeClearsValue = _props13.escapeClearsValue,
        inputValue = _props13.inputValue,
        isClearable = _props13.isClearable,
        isDisabled = _props13.isDisabled,
        menuIsOpen = _props13.menuIsOpen,
        onKeyDown = _props13.onKeyDown,
        tabSelectsValue = _props13.tabSelectsValue;
    var focusedOption = _this7.state.focusedOption;


    if (isDisabled) return;

    if (typeof onKeyDown === 'function') {
      onKeyDown(event);
      if (event.defaultPrevented) {
        return;
      }
    }

    // Block option hover events when the user has just pressed a key
    _this7.blockOptionHover = true;

    switch (event.keyCode) {
      case 8:
        // backspace
        if (inputValue || !backspaceRemovesValue) return;
        _this7.popValue();
        break;
      case 9:
        // tab
        if (event.shiftKey || !menuIsOpen || !tabSelectsValue || !focusedOption) {
          return;
        }
        _this7.selectOption(focusedOption);
        return;
      case 13:
        // enter
        if (menuIsOpen) {
          if (!focusedOption) return;
          _this7.selectOption(focusedOption);
        } else {
          _this7.focusOption('first');
        }
        break;
      case 27:
        // escape
        if (menuIsOpen) {
          _this7.inputIsHiddenAfterUpdate = false;
          _this7.onInputChange('');
          _this7.onMenuClose();
        } else if (isClearable && escapeClearsValue) {
          _this7.clearValue();
        }
        break;
      case 32:
        // space
        if (inputValue) {
          return;
        }
        if (!menuIsOpen) {
          _this7.openMenu();
          break;
        }
        if (!focusedOption) return;
        _this7.selectOption(focusedOption);
        break;
      case 38:
        // up
        if (menuIsOpen) {
          _this7.focusOption('up');
        } else {
          _this7.openMenu('last');
        }
        break;
      case 40:
        // down
        if (menuIsOpen) {
          _this7.focusOption('down');
        } else {
          _this7.openMenu('first');
        }
        break;
      case 33:
        // page up
        if (!menuIsOpen) return;
        _this7.focusOption('pageup');
        break;
      case 34:
        // page down
        if (!menuIsOpen) return;
        _this7.focusOption('pagedown');
        break;
      case 36:
        // home key
        if (!menuIsOpen) return;
        _this7.focusOption('first');
        break;
      case 35:
        // end key
        if (!menuIsOpen) return;
        _this7.focusOption('last');
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  this.onInputRef = function (input) {
    _this7.input = input;

    // cache the input height to use when the select is disabled
    if (input) {
      _this7.inputHeight = input.clientHeight;
    }
  };

  this.handleInputChange = function (event) {
    var inputValue = event.currentTarget.value;
    _this7.inputIsHiddenAfterUpdate = false;
    _this7.onInputChange(inputValue);
    _this7.onMenuOpen();
  };

  this.onInputFocus = function (event) {
    if (_this7.props.onFocus) {
      _this7.props.onFocus(event);
    }
    _this7.inputIsHiddenAfterUpdate = false;
    _this7.setState({
      isFocused: true
    });
    if (_this7.openAfterFocus) {
      _this7.openMenu('first');
    }
    _this7.openAfterFocus = false;
  };

  this.onInputBlur = function (event) {
    if (_this7.props.onBlur) {
      _this7.props.onBlur(event);
    }
    _this7.onInputChange('');
    _this7.onMenuClose();
    _this7.setState({
      isFocused: false
    });
  };

  this.onMenuRef = function (ref) {
    _this7.menuRef = ref;
  };

  this.onMenuMouseDown = function (event) {
    if (event.button !== 0) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    _this7.focus();
  };

  this.onMenuMouseMove = function (event) {
    _this7.blockOptionHover = false;
  };

  this.onFocusedOptionRef = function (ref) {
    _this7.focusedOptionRef = ref;
  };

  this.onOptionHover = function (focusedOption) {
    if (_this7.blockOptionHover || _this7.state.focusedOption === focusedOption) {
      return;
    }
    _this7.setState({ focusedOption: focusedOption });
  };

  this.onDropdownIndicatorMouseDown = function (event) {
    // ignore mouse events that weren't triggered by the primary button
    if (event && event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    if (_this7.props.isDisabled) return;
    var _props14 = _this7.props,
        isMulti = _props14.isMulti,
        menuIsOpen = _props14.menuIsOpen;

    if (!_this7.focused) {
      _this7.focus();
    }
    if (menuIsOpen) {
      _this7.inputIsHiddenAfterUpdate = !isMulti;
      _this7.onMenuClose();
    } else {
      _this7.openMenu();
    }
    event.preventDefault();
    event.stopPropagation();
  };

  this.onClearIndicatorMouseDown = function (event) {
    // ignore mouse events that weren't triggered by the primary button
    if (event && event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    _this7.clearValue();
    event.stopPropagation();
    _this7.openAfterFocus = false;
    setTimeout(function () {
      return _this7.focus();
    });
  };

  this.getElementId = function (element) {
    return _this7.instancePrefix + '-' + element;
  };

  this.getActiveDescendentId = function () {
    var menuIsOpen = _this7.props.menuIsOpen;
    var focusedOption = _this7.state.focusedOption;

    return focusedOption && menuIsOpen ? focusedOption.key : undefined;
  };
};

// This file exists as an entry point for bundling our umd builds.
// Both in rollup and in webpack, umd builds built from es6 modules are not
// compatible with mixed imports (which exist in index.js)
// This file does away with named imports in favor of a single export default.

Select$1.components = components;

return Select$1;

})));
