(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('emotion'), require('react'), require('react-dom'), require('react-input-autosize'), require('prop-types')) :
	typeof define === 'function' && define.amd ? define(['emotion', 'react', 'react-dom', 'react-input-autosize', 'prop-types'], factory) :
	(global.Select = factory(global.emotion,global.React,global.ReactDOM,global.AutosizeInput,global.PropTypes));
}(this, (function (emotion,React,reactDom,AutosizeInput,PropTypes) { 'use strict';

	var React__default = 'default' in React ? React['default'] : React;
	AutosizeInput = AutosizeInput && AutosizeInput.hasOwnProperty('default') ? AutosizeInput['default'] : AutosizeInput;
	PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

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

	var createPrimitive = function createPrimitive(Tag) {
	  return function (_ref) {
	    var css = _ref.css,
	        innerRef = _ref.innerRef,
	        props = objectWithoutProperties(_ref, ['css', 'innerRef']);
	    return React__default.createElement(Tag, _extends({ ref: innerRef, className: emotion.css(css)
	    }, props));
	  };
	};
	var Div = createPrimitive('div');
	var Input = createPrimitive('input');

	// Assistive text to describe visual elements. Hidden for sighted users.
	var A11yText = function A11yText(props) {
	  return React__default.createElement('span', _extends({
	    className: emotion.css({
	      border: 0,
	      clip: 'rect(1px, 1px, 1px, 1px)',
	      height: 1,
	      overflow: 'hidden',
	      padding: 0,
	      position: 'absolute',
	      whiteSpace: 'nowrap',
	      width: 1
	    })
	  }, props));
	};

	var DummyInput = (function (props) {
	  return React__default.createElement(Input, _extends({}, props, {
	    className: emotion.css({
	      // get rid of any default styles
	      background: 0,
	      border: 0,
	      fontSize: 'inherit',
	      outline: 0,
	      padding: 0,

	      // important! without `width` browsers won't allow focus
	      width: 1,

	      // remove cursor on desktop
	      color: 'transparent',

	      // remove cursor on mobile whilst maintaining "scroll into view" behaviour
	      left: -100,
	      opacity: 0,
	      position: 'relative',
	      transform: 'scale(0)'
	    })
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

	var STYLE_KEYS = ['boxSizing', 'height', 'overflow', 'paddingRight', 'position'];

	var LOCK_STYLES = {
	  boxSizing: 'border-box', // account for possible declaration `width: 100%;` on body
	  overflow: 'hidden',
	  position: 'relative',
	  height: '100%'
	};

	function preventTouchMove(e) {
	  e.preventDefault();
	}

	function allowTouchMove(e) {
	  e.stopPropagation();
	}

	function preventInertiaScroll() {
	  var top = this.scrollTop;
	  var totalScroll = this.scrollHeight;
	  var currentScroll = top + this.offsetHeight;

	  if (top === 0) {
	    this.scrollTop = 1;
	  } else if (currentScroll === totalScroll) {
	    this.scrollTop = top - 1;
	  }
	}

	// `ontouchstart` check works on most browsers
	// `maxTouchPoints` works on IE10/11 and Surface
	function isTouchDevice() {
	  return 'ontouchstart' in window || navigator.maxTouchPoints;
	}

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	var activeScrollLocks = 0;

	var ScrollLock = function (_Component) {
	  inherits(ScrollLock, _Component);

	  function ScrollLock() {
	    var _ref;

	    var _temp, _this, _ret;

	    classCallCheck(this, ScrollLock);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ScrollLock.__proto__ || Object.getPrototypeOf(ScrollLock)).call.apply(_ref, [this].concat(args))), _this), _this.originalStyles = {}, _this.listenerOptions = {
	      capture: false,
	      passive: false
	    }, _temp), possibleConstructorReturn(_this, _ret);
	  }

	  createClass(ScrollLock, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      if (!canUseDOM) return;

	      var _props = this.props,
	          accountForScrollbars = _props.accountForScrollbars,
	          touchScrollTarget = _props.touchScrollTarget;

	      var target = document.body;
	      var targetStyle = target && target.style;

	      if (accountForScrollbars) {
	        // store any styles already applied to the body
	        STYLE_KEYS.forEach(function (key) {
	          var val = targetStyle && targetStyle[key];
	          _this2.originalStyles[key] = val;
	        });
	      }

	      // apply the lock styles and padding if this is the first scroll lock
	      if (accountForScrollbars && activeScrollLocks < 1) {
	        var currentPadding = parseInt(this.originalStyles.paddingRight, 10) || 0;
	        var clientWidth = document.body ? document.body.clientWidth : 0;
	        var adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;

	        Object.keys(LOCK_STYLES).forEach(function (key) {
	          var val = LOCK_STYLES[key];
	          if (targetStyle) {
	            targetStyle[key] = val;
	          }
	        });

	        if (targetStyle) {
	          targetStyle.paddingRight = adjustedPadding + 'px';
	        }
	      }

	      // account for touch devices
	      if (target && isTouchDevice()) {
	        // Mobile Safari ignores { overflow: hidden } declaration on the body.
	        target.addEventListener('touchmove', preventTouchMove, this.listenerOptions);

	        // Allow scroll on provided target
	        if (touchScrollTarget) {
	          touchScrollTarget.addEventListener('touchstart', preventInertiaScroll, this.listenerOptions);
	          touchScrollTarget.addEventListener('touchmove', allowTouchMove, this.listenerOptions);
	        }
	      }

	      // increment active scroll locks
	      activeScrollLocks += 1;
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var _this3 = this;

	      if (!canUseDOM) return;

	      var _props2 = this.props,
	          accountForScrollbars = _props2.accountForScrollbars,
	          touchScrollTarget = _props2.touchScrollTarget;

	      var target = document.body;
	      var targetStyle = target && target.style;

	      // safely decrement active scroll locks
	      activeScrollLocks = Math.max(activeScrollLocks - 1, 0);

	      // reapply original body styles, if any
	      if (accountForScrollbars && activeScrollLocks < 1) {
	        STYLE_KEYS.forEach(function (key) {
	          var val = _this3.originalStyles[key];
	          if (targetStyle) {
	            targetStyle[key] = val;
	          }
	        });
	      }

	      // remove touch listeners
	      if (target && isTouchDevice()) {
	        target.removeEventListener('touchmove', preventTouchMove, this.listenerOptions);

	        if (touchScrollTarget) {
	          touchScrollTarget.removeEventListener('touchstart', preventInertiaScroll, this.listenerOptions);
	          touchScrollTarget.removeEventListener('touchmove', allowTouchMove, this.listenerOptions);
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return null;
	    }
	  }]);
	  return ScrollLock;
	}(React.Component);

	ScrollLock.defaultProps = {
	  accountForScrollbars: true
	};

	function ScrollBlock() {
	  return React__default.createElement(
	    Div,
	    {
	      className: emotion.css({ position: 'fixed', left: 0, bottom: 0, right: 0, top: 0 })
	    },
	    React__default.createElement(ScrollLock, null)
	  );
	}

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

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var performanceNow = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.2
	(function () {
	  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

	  if (typeof performance !== "undefined" && performance !== null && performance.now) {
	    module.exports = function () {
	      return performance.now();
	    };
	  } else if (typeof process !== "undefined" && process !== null && process.hrtime) {
	    module.exports = function () {
	      return (getNanoSeconds() - nodeLoadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function getNanoSeconds() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    moduleLoadTime = getNanoSeconds();
	    upTime = process.uptime() * 1e9;
	    nodeLoadTime = moduleLoadTime - upTime;
	  } else if (Date.now) {
	    module.exports = function () {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function () {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }
	}).call(commonjsGlobal);


	});

	var root = typeof window === 'undefined' ? commonjsGlobal : window,
	    vendors = ['moz', 'webkit'],
	    suffix = 'AnimationFrame',
	    raf = root['request' + suffix],
	    caf = root['cancel' + suffix] || root['cancelRequest' + suffix];

	for (var i = 0; !raf && i < vendors.length; i++) {
	  raf = root[vendors[i] + 'Request' + suffix];
	  caf = root[vendors[i] + 'Cancel' + suffix] || root[vendors[i] + 'CancelRequest' + suffix];
	}

	// Some versions of FF have rAF but not cAF
	if (!raf || !caf) {
	  var last = 0,
	      id = 0,
	      queue = [],
	      frameDuration = 1000 / 60;

	  raf = function raf(callback) {
	    if (queue.length === 0) {
	      var _now = performanceNow(),
	          next = Math.max(0, frameDuration - (_now - last));
	      last = next + _now;
	      setTimeout(function () {
	        var cp = queue.slice(0);
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0;
	        for (var i = 0; i < cp.length; i++) {
	          if (!cp[i].cancelled) {
	            try {
	              cp[i].callback(last);
	            } catch (e) {
	              setTimeout(function () {
	                throw e;
	              }, 0);
	            }
	          }
	        }
	      }, Math.round(next));
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    });
	    return id;
	  };

	  caf = function caf(handle) {
	    for (var i = 0; i < queue.length; i++) {
	      if (queue[i].handle === handle) {
	        queue[i].cancelled = true;
	      }
	    }
	  };
	}

	var raf_1 = function (fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  return raf.call(root, fn);
	};
	var cancel = function () {
	  caf.apply(root, arguments);
	};
	var polyfill = function (object) {
	  if (!object) {
	    object = root;
	  }
	  object.requestAnimationFrame = raf;
	  object.cancelAnimationFrame = caf;
	};
	raf_1.cancel = cancel;
	raf_1.polyfill = polyfill;

	// ==============================
	// NO OP
	// ==============================

	var noop = function noop() {};
	var emptyString = function emptyString() {
	  return '';
	};

	// ==============================
	// Class Name Prefixer
	// ==============================

	/**
	 String representation of component state for styling with class names.

	 Expects an array of strings OR a string/object pair:
	 - className(['comp', 'comp-arg', 'comp-arg-2'])
	   @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
	 - className('comp', { some: true, state: false })
	   @returns 'react-select__comp react-select__comp--some'
	*/
	function applyPrefixToName(prefix, name) {
	  return name ? prefix + '__' + name : prefix;
	}
	function classNames(prefix, name, state) {
	  var arr = Array.isArray(name) ? name.map(function (i) {
	    return applyPrefixToName(prefix, i);
	  }) : [applyPrefixToName(prefix, name)];

	  // loop through state object, remove falsey values and combine with name
	  if (state && arr.length === 1) {
	    for (var key in state) {
	      if (state.hasOwnProperty(key) && state[key]) {
	        arr.push(arr[0] + '--' + key);
	      }
	    }
	  }

	  // prefix everything and return a string
	  return arr.join(' ');
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
	// Scroll Helpers
	// ==============================

	function isDocumentElement(el) {
	  return [document.documentElement, document.body, window].includes(el);
	}

	// Normalized scrollTo & scrollTop
	// ------------------------------

	function getScrollTop(el) {
	  if (isDocumentElement(el)) {
	    return window.pageYOffset;
	  }
	  return el.scrollTop;
	}

	function scrollTo(el, top) {
	  // with a scroll distance, we perform scroll on the element
	  if (isDocumentElement(el)) {
	    window.scrollTo(0, top);
	    return;
	  }
	  el.scrollTop = top;
	}

	// Get Scroll Parent
	// ------------------------------

	function getScrollParent(element) {
	  var style = getComputedStyle(element);
	  var excludeStaticParent = style.position === 'absolute';
	  var overflowRx = /(auto|scroll)/;
	  var docEl = document.documentElement; // suck it, flow...

	  if (style.position === 'fixed') return docEl;

	  for (var parent = element; parent = parent.parentElement;) {
	    style = getComputedStyle(parent);
	    if (excludeStaticParent && style.position === 'static') {
	      continue;
	    }
	    if (overflowRx.test(style.overflow + style.overflowY + style.overflowX)) {
	      return parent;
	    }
	  }

	  return docEl;
	}

	// Animated Scroll To
	// ------------------------------

	/**
	  @param t: time (elapsed)
	  @param b: initial value
	  @param c: amount of change
	  @param d: duration
	*/
	function easeOutCubic(t, b, c, d) {
	  return c * ((t = t / d - 1) * t * t + 1) + b;
	}

	function animatedScrollTo(element, to) {
	  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
	  var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;

	  var start = getScrollTop(element);
	  var change = to - start;
	  var increment = 10;
	  var currentTime = 0;

	  function animateScroll() {
	    currentTime += increment;
	    var val = easeOutCubic(currentTime, start, change, duration);
	    scrollTo(element, val);
	    if (currentTime < duration) {
	      raf_1(animateScroll);
	    } else {
	      callback(element);
	    }
	  }
	  animateScroll();
	}

	// Scroll Into View
	// ------------------------------

	function scrollIntoView(menuEl, focusedEl) {
	  var menuRect = menuEl.getBoundingClientRect();
	  var focusedRect = focusedEl.getBoundingClientRect();
	  var overScroll = focusedEl.offsetHeight / 3;

	  if (focusedRect.bottom + overScroll > menuRect.bottom) {
	    scrollTo(menuEl, Math.min(focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll, menuEl.scrollHeight));
	  } else if (focusedRect.top - overScroll < menuRect.top) {
	    scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
	  }
	}

	// ==============================
	// Get bounding client object
	// ==============================

	// cannot get keys using array notation with DOMRect
	function getBoundingClientObj(element) {
	  var rect = element.getBoundingClientRect();
	  return {
	    bottom: rect.bottom,
	    height: rect.height,
	    left: rect.left,
	    right: rect.right,
	    top: rect.top,
	    width: rect.width
	  };
	}

	// ==============================
	// Touch Capability Detector
	// ==============================

	function isTouchCapable() {
	  try {
	    document.createEvent('TouchEvent');
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	// ==============================
	// Mobile Device Detector
	// ==============================

	function isMobileDevice() {
	  return typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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

	var borderRadius = 4;

	var colors = {
	  text: '#222',
	  textLight: '#444',
	  primary: '#2684FF',
	  primary75: '#4C9AFF',
	  primary50: '#B2D4FF',
	  primary25: '#DEEBFF',
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
	  controlHeight: 38,
	  /* The amount of space between the control and menu */
	  menuGutter: baseUnit * 2
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
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps,
	      isDisabled = props.isDisabled,
	      isRtl = props.isRtl;

	  return React__default.createElement(
	    Div,
	    _extends({
	      className: emotion.merge(emotion.css(getStyles('container', props)) + (' ' + cx('', { isDisabled: isDisabled, isRtl: isRtl })))
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
	    display: 'flex',
	    flex: 1,
	    flexWrap: 'wrap',
	    maxHeight: maxHeight, // max-height allows scroll when multi
	    overflowY: 'auto',
	    padding: spacing.baseUnit / 2 + 'px ' + spacing.baseUnit * 2 + 'px',
	    WebkitOverflowScrolling: 'touch',
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
	          cx = _props.cx,
	          isMulti = _props.isMulti,
	          getStyles = _props.getStyles,
	          hasValue = _props.hasValue;


	      return React__default.createElement(
	        Div,
	        {
	          innerRef: isMulti ? this.getScrollContainer : undefined,
	          className: emotion.merge(emotion.css(getStyles('valueContainer', this.props)) + (' ' + cx('value-container', { isMulti: isMulti, hasValue: hasValue })))
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
	    display: 'flex',
	    flexShrink: 0
	  };
	};
	var IndicatorsContainer = function IndicatorsContainer(props) {
	  var children = props.children,
	      cx = props.cx,
	      getStyles = props.getStyles;


	  return React__default.createElement(
	    Div,
	    {
	      className: emotion.merge(emotion.css(getStyles('indicatorsContainer', props)) + (' ' + cx('indicators')))
	    },
	    children
	  );
	};

	// ==============================
	// Dropdown & Clear Icons
	// ==============================

	var Svg = function Svg(_ref) {
	  var size = _ref.size,
	      props = objectWithoutProperties(_ref, ['size']);
	  return React__default.createElement('svg', _extends({
	    height: size,
	    width: size,
	    viewBox: '0 0 20 20',
	    className: emotion.css({
	      display: 'inline-block',
	      fill: 'currentColor',
	      lineHeight: 1,
	      stroke: 'currentColor',
	      strokeWidth: 0
	    })
	  }, props));
	};

	var CrossIcon = function CrossIcon(props) {
	  return React__default.createElement(
	    Svg,
	    _extends({ size: 20, focusable: 'false', role: 'presentation' }, props),
	    React__default.createElement('path', { d: 'M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z' })
	  );
	};
	var DownChevron = function DownChevron(props) {
	  return React__default.createElement(
	    Svg,
	    _extends({ size: 20, focusable: 'false', role: 'presentation' }, props),
	    React__default.createElement('path', { d: 'M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z' })
	  );
	};

	// ==============================
	// Dropdown & Clear Buttons
	// ==============================

	var baseCSS = function baseCSS(_ref2) {
	  var isFocused = _ref2.isFocused;
	  return {
	    color: isFocused ? colors.neutral60 : colors.neutral20,
	    display: 'flex',
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
	      children = _props$children === undefined ? React__default.createElement(DownChevron, null) : _props$children,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;

	  return React__default.createElement(
	    'div',
	    _extends({}, innerProps, {
	      className: emotion.merge(emotion.css(getStyles('dropdownIndicator', props)) + (' ' + cx(['indicator', 'dropdown-indicator'])))
	    }),
	    children
	  );
	};

	var clearIndicatorCSS = baseCSS;
	var ClearIndicator = function ClearIndicator(props) {
	  var _props$children2 = props.children,
	      children = _props$children2 === undefined ? React__default.createElement(CrossIcon, null) : _props$children2,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;

	  return React__default.createElement(
	    'div',
	    _extends({}, innerProps, {
	      className: emotion.merge(emotion.css(getStyles('clearIndicator', props)) + (' ' + cx(['indicator', 'clear-indicator'])))
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
	  var cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;

	  return React__default.createElement('span', _extends({}, innerProps, {
	    className: emotion.merge(emotion.css(getStyles('indicatorSeparator', props)) + (' ' + cx('indicator-separator')))
	  }));
	};

	// ==============================
	// Loading
	// ==============================

	var keyframesName = 'react-select-loading-indicator';

	var loadingIndicatorCSS = function loadingIndicatorCSS(_ref4) {
	  var isFocused = _ref4.isFocused,
	      size = _ref4.size;
	  return {
	    color: isFocused ? colors.neutral60 : colors.neutral20,
	    display: 'flex',
	    padding: spacing.baseUnit * 2,
	    transition: 'color 150ms',
	    alignSelf: 'center',
	    fontSize: size,
	    lineHeight: 1,
	    marginRight: size,
	    textAlign: 'center',
	    verticalAlign: 'middle'
	  };
	};

	var LoadingDot = function LoadingDot(_ref5) {
	  var color = _ref5.color,
	      delay = _ref5.delay,
	      offset = _ref5.offset;
	  return React__default.createElement('span', {
	    className: emotion.css({
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
	    })
	  });
	};

	// eslint-disable-next-line no-unused-expressions
	emotion.injectGlobal('@keyframes ', keyframesName, '{0%,80%,100%{opacity:0;}40%{opacity:1;}};');

	var LoadingIndicator = function LoadingIndicator(props) {
	  var cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps,
	      isFocused = props.isFocused,
	      isRtl = props.isRtl;

	  var color = isFocused ? colors.text : colors.neutral20;

	  return React__default.createElement(
	    'div',
	    _extends({}, innerProps, {
	      className: emotion.merge(emotion.css(getStyles('loadingIndicator', props)) + (' ' + cx(['indicator', 'loading-indicator'])))
	    }),
	    React__default.createElement(LoadingDot, { color: color, delay: 0, offset: isRtl }),
	    React__default.createElement(LoadingDot, { color: color, delay: 160, offset: true }),
	    React__default.createElement(LoadingDot, { color: color, delay: 320, offset: !isRtl }),
	    React__default.createElement(
	      A11yText,
	      null,
	      'Loading'
	    )
	  );
	};
	LoadingIndicator.defaultProps = { size: 4 };

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
	    display: 'flex',
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
	      cx = props.cx,
	      getStyles = props.getStyles,
	      isDisabled = props.isDisabled,
	      isFocused = props.isFocused,
	      innerProps = props.innerProps;

	  return React__default.createElement(
	    Div,
	    _extends({
	      className: emotion.merge(emotion.css(getStyles('control', props)) + (' ' + cx('control', { isDisabled: isDisabled, isFocused: isFocused })))
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
	      cx = props.cx,
	      getStyles = props.getStyles,
	      Heading = props.Heading,
	      headingProps = props.headingProps,
	      label = props.label,
	      innerProps = props.innerProps;

	  return React__default.createElement(
	    Div,
	    _extends({
	      className: emotion.merge(emotion.css(getStyles('group', props)) + (' ' + cx('group')))
	    }, innerProps),
	    React__default.createElement(
	      Heading,
	      _extends({ getStyles: getStyles, cx: cx }, headingProps),
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
	  var cx = props.cx,
	      getStyles = props.getStyles,
	      cleanProps = objectWithoutProperties(props, ['cx', 'getStyles']);

	  return React__default.createElement(Div, _extends({
	    className: emotion.merge(emotion.css(getStyles('groupHeading', props)) + (' ' + cx('group-heading')))
	  }, cleanProps));
	};

	var css$1 = function css(_ref) {
	  var isDisabled = _ref.isDisabled;
	  return {
	    margin: spacing.baseUnit / 2,
	    paddingBottom: spacing.baseUnit / 2,
	    paddingTop: spacing.baseUnit / 2,
	    visibility: isDisabled ? 'hidden' : 'visible',
	    color: colors.text
	  };
	};
	var inputStyle = function inputStyle(isHidden) {
	  return {
	    background: 0,
	    border: 0,
	    fontSize: 'inherit',
	    opacity: isHidden ? 0 : 1,
	    outline: 0,
	    padding: 0,
	    color: 'inherit'
	  };
	};

	var Input$1 = function Input$$1(_ref2) {
	  var cx = _ref2.cx,
	      getStyles = _ref2.getStyles,
	      innerRef = _ref2.innerRef,
	      isHidden = _ref2.isHidden,
	      isDisabled = _ref2.isDisabled,
	      props = objectWithoutProperties(_ref2, ['cx', 'getStyles', 'innerRef', 'isHidden', 'isDisabled']);
	  return React__default.createElement(
	    Div,
	    {
	      className: emotion.css(getStyles('input', props))
	    },
	    React__default.createElement(AutosizeInput, _extends({
	      className: cx('input'),
	      inputRef: innerRef,
	      inputStyle: inputStyle(isHidden),
	      disabled: isDisabled
	    }, props))
	  );
	};

	// ==============================
	// Menu
	// ==============================

	// Get Menu Placement
	// ------------------------------

	function getMenuPlacement(_ref) {
	  var maxHeight = _ref.maxHeight,
	      menuEl = _ref.menuEl,
	      minHeight = _ref.minHeight,
	      placement = _ref.placement,
	      shouldScroll = _ref.shouldScroll,
	      isFixedPosition = _ref.isFixedPosition;

	  var scrollParent = getScrollParent(menuEl);
	  var defaultState = { placement: 'bottom', maxHeight: maxHeight };

	  // something went wrong, return default state
	  if (!menuEl || !menuEl.offsetParent) return defaultState;

	  // we can't trust `scrollParent.scrollHeight` --> it may increase when
	  // the menu is rendered

	  var _scrollParent$getBoun = scrollParent.getBoundingClientRect(),
	      scrollHeight = _scrollParent$getBoun.height;

	  var _menuEl$getBoundingCl = menuEl.getBoundingClientRect(),
	      menuBottom = _menuEl$getBoundingCl.bottom,
	      menuHeight = _menuEl$getBoundingCl.height,
	      menuTop = _menuEl$getBoundingCl.top;

	  // $FlowFixMe function returns above if there's no offsetParent


	  var _menuEl$offsetParent$ = menuEl.offsetParent.getBoundingClientRect(),
	      containerTop = _menuEl$offsetParent$.top;

	  var viewHeight = window.innerHeight;
	  var scrollTop = getScrollTop(scrollParent);
	  var gutter = spacing.menuGutter;

	  var viewSpaceAbove = containerTop - gutter;
	  var viewSpaceBelow = viewHeight - menuTop;
	  var scrollSpaceAbove = viewSpaceAbove + scrollTop;
	  var scrollSpaceBelow = scrollHeight - scrollTop - menuTop;

	  var scrollDown = menuBottom - viewHeight + scrollTop + gutter;
	  var scrollUp = scrollTop + menuTop - gutter;
	  var scrollDuration = 160;

	  switch (placement) {
	    case 'auto':
	    case 'bottom':
	      // 1: the menu will fit, do nothing
	      if (viewSpaceBelow >= menuHeight) {
	        return { placement: 'bottom', maxHeight: maxHeight };
	      }

	      // 2: the menu will fit, if scrolled
	      if (scrollSpaceBelow >= menuHeight && !isFixedPosition) {
	        if (shouldScroll) {
	          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
	        }

	        return { placement: 'bottom', maxHeight: maxHeight };
	      }

	      // 3: the menu will fit, if constrained
	      if (!isFixedPosition && scrollSpaceBelow >= minHeight || isFixedPosition && viewSpaceBelow >= minHeight) {
	        if (shouldScroll) {
	          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
	        }

	        // we want to provide as much of the menu as possible to the user,
	        // so give them whatever is available below rather than the minHeight.
	        var constrainedHeight = isFixedPosition ? viewSpaceBelow - gutter : scrollSpaceBelow - gutter;

	        return {
	          placement: 'bottom',
	          maxHeight: constrainedHeight
	        };
	      }

	      // 4. Forked beviour when there isn't enough space below

	      // AUTO: flip the menu, render above
	      if (placement === 'auto' || isFixedPosition) {
	        // may need to be constrained after flipping
	        var _constrainedHeight = maxHeight;

	        if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
	          _constrainedHeight = isFixedPosition ? viewSpaceAbove - gutter - spacing.controlHeight : scrollSpaceAbove - gutter - spacing.controlHeight;
	        }

	        return { placement: 'top', maxHeight: _constrainedHeight };
	      }

	      // BOTTOM: allow browser to increase scrollable area and immediately set scroll
	      if (placement === 'bottom') {
	        scrollTo(scrollParent, scrollDown);
	        return { placement: 'bottom', maxHeight: maxHeight };
	      }
	      break;
	    case 'top':
	      // 1: the menu will fit, do nothing
	      if (viewSpaceAbove >= menuHeight) {
	        return { placement: 'top', maxHeight: maxHeight };
	      }

	      // 2: the menu will fit, if scrolled
	      if (scrollSpaceAbove >= menuHeight && !isFixedPosition) {
	        if (shouldScroll) {
	          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
	        }

	        return { placement: 'top', maxHeight: maxHeight };
	      }

	      // 3: the menu will fit, if constrained
	      if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
	        var _constrainedHeight2 = maxHeight;

	        // we want to provide as much of the menu as possible to the user,
	        // so give them whatever is available below rather than the minHeight.
	        if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
	          _constrainedHeight2 = isFixedPosition ? viewSpaceAbove - gutter : scrollSpaceAbove - gutter;
	        }

	        if (shouldScroll) {
	          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
	        }

	        return {
	          placement: 'top',
	          maxHeight: _constrainedHeight2
	        };
	      }

	      // 4. not enough space, the browser WILL NOT increase scrollable area when
	      // absolutely positioned element rendered above the viewport (only below).
	      // Flip the menu, render below
	      return { placement: 'bottom', maxHeight: maxHeight };
	    default:
	      throw new Error('Invalid placement provided "' + placement + '".');
	  }

	  // fulfil contract with flow: implicit return value of undefined
	  return defaultState;
	}

	// Menu Component
	// ------------------------------

	function alignToControl(placement) {
	  var placementToCSSProp = { bottom: 'top', top: 'bottom' };
	  return placement ? placementToCSSProp[placement] : 'bottom';
	}
	var coercePlacement = function coercePlacement(p) {
	  return p === 'auto' ? 'bottom' : p;
	};

	var menuCSS = function menuCSS(_ref2) {
	  var _ref3;

	  var maxHeight = _ref2.maxHeight,
	      placement = _ref2.placement;
	  return _ref3 = {}, defineProperty(_ref3, alignToControl(placement), '100%'), defineProperty(_ref3, 'backgroundColor', colors.neutral0), defineProperty(_ref3, 'borderRadius', borderRadius), defineProperty(_ref3, 'boxShadow', '0 0 0 1px ' + colors.neutral10a + ', 0 4px 11px ' + colors.neutral10a), defineProperty(_ref3, 'display', 'flex'), defineProperty(_ref3, 'flexDirection', 'column'), defineProperty(_ref3, 'marginBottom', spacing.menuGutter), defineProperty(_ref3, 'marginTop', spacing.menuGutter), defineProperty(_ref3, 'maxHeight', maxHeight), defineProperty(_ref3, 'position', 'absolute'), defineProperty(_ref3, 'width', '100%'), defineProperty(_ref3, 'zIndex', 1), _ref3;
	};

	var Menu = function (_Component) {
	  inherits(Menu, _Component);

	  function Menu() {
	    var _ref4;

	    var _temp, _this, _ret;

	    classCallCheck(this, Menu);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref4 = Menu.__proto__ || Object.getPrototypeOf(Menu)).call.apply(_ref4, [this].concat(args))), _this), _this.state = {
	      maxHeight: _this.props.maxMenuHeight,
	      placement: null
	    }, _this.getPlacement = function (ref) {
	      var _this$props = _this.props,
	          minMenuHeight = _this$props.minMenuHeight,
	          maxMenuHeight = _this$props.maxMenuHeight,
	          menuPlacement = _this$props.menuPlacement,
	          menuPosition = _this$props.menuPosition,
	          menuShouldScrollIntoView = _this$props.menuShouldScrollIntoView;
	      var getPortalPlacement = _this.context.getPortalPlacement;


	      if (!ref) return;

	      // DO NOT scroll if position is fixed
	      var isFixedPosition = menuPosition === 'fixed';
	      var shouldScroll = menuShouldScrollIntoView && !isFixedPosition;

	      var state = getMenuPlacement({
	        maxHeight: maxMenuHeight,
	        menuEl: ref,
	        minHeight: minMenuHeight,
	        placement: menuPlacement,
	        shouldScroll: shouldScroll,
	        isFixedPosition: isFixedPosition
	      });

	      if (getPortalPlacement) getPortalPlacement(state);

	      _this.setState(state);
	    }, _this.getState = function () {
	      var menuPlacement = _this.props.menuPlacement;

	      var placement = _this.state.placement || coercePlacement(menuPlacement);

	      return _extends({}, _this.props, { placement: placement, maxHeight: _this.state.maxHeight });
	    }, _temp), possibleConstructorReturn(_this, _ret);
	  }

	  createClass(Menu, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          children = _props.children,
	          cx = _props.cx,
	          getStyles = _props.getStyles,
	          innerProps = _props.innerProps;


	      return React__default.createElement(
	        Div,
	        _extends({
	          className: emotion.merge(emotion.css(getStyles('menu', this.getState())) + (' ' + cx('menu'))),

	          innerRef: this.getPlacement
	        }, innerProps),
	        children
	      );
	    }
	  }]);
	  return Menu;
	}(React.Component);

	Menu.contextTypes = {
	  getPortalPlacement: PropTypes.func
	};

	// ==============================
	// Menu List
	// ==============================

	var menuListCSS = function menuListCSS() {
	  return {
	    flexGrow: 1,
	    overflowY: 'auto',
	    paddingBottom: spacing.baseUnit,
	    paddingTop: spacing.baseUnit,
	    position: 'relative', // required for offset[Height, Top] > keyboard scroll
	    WebkitOverflowScrolling: 'touch'
	  };
	};
	var MenuList = function MenuList(props) {
	  var children = props.children,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      isMulti = props.isMulti,
	      innerProps = props.innerProps;

	  return React__default.createElement(
	    Div,
	    _extends({
	      className: emotion.merge(emotion.css(getStyles('menuList', props)) + (' ' + cx('menu-list', { isMulti: isMulti })))
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
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;

	  return React__default.createElement(
	    Div,
	    _extends({
	      className: emotion.merge(emotion.css(getStyles('noOptionsMessage', props)) + (' ' + cx(['menu-notice', 'menu-notice--no-options'])))
	    }, innerProps),
	    children
	  );
	};
	NoOptionsMessage.defaultProps = {
	  children: 'No options'
	};

	var LoadingMessage = function LoadingMessage(props) {
	  var children = props.children,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;

	  return React__default.createElement(
	    Div,
	    _extends({
	      className: emotion.merge(emotion.css(getStyles('loadingMessage', props)) + (' ' + cx(['menu-notice', 'menu-notice--loading'])))
	    }, innerProps),
	    children
	  );
	};
	LoadingMessage.defaultProps = {
	  children: 'Loading...'
	};

	// ==============================
	// Menu Portal
	// ==============================

	var menuPortalCSS = function menuPortalCSS(_ref5) {
	  var rect = _ref5.rect,
	      offset = _ref5.offset,
	      position = _ref5.position;
	  return {
	    left: rect.left,
	    position: position,
	    top: offset,
	    width: rect.width,
	    zIndex: 1
	  };
	};

	var MenuPortal = function (_Component2) {
	  inherits(MenuPortal, _Component2);

	  function MenuPortal() {
	    var _ref6;

	    var _temp2, _this2, _ret2;

	    classCallCheck(this, MenuPortal);

	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    return _ret2 = (_temp2 = (_this2 = possibleConstructorReturn(this, (_ref6 = MenuPortal.__proto__ || Object.getPrototypeOf(MenuPortal)).call.apply(_ref6, [this].concat(args))), _this2), _this2.state = { placement: null }, _this2.getPortalPlacement = function (_ref7) {
	      var placement = _ref7.placement;

	      var initialPlacement = coercePlacement(_this2.props.menuPlacement);

	      // avoid re-renders if the placement has not changed
	      if (placement !== initialPlacement) {
	        _this2.setState({ placement: placement });
	      }
	    }, _temp2), possibleConstructorReturn(_this2, _ret2);
	  }

	  createClass(MenuPortal, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        getPortalPlacement: this.getPortalPlacement
	      };
	    }

	    // callback for occassions where the menu must "flip"

	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props,
	          appendTo = _props2.appendTo,
	          children = _props2.children,
	          controlElement = _props2.controlElement,
	          menuPlacement = _props2.menuPlacement,
	          position = _props2.menuPosition,
	          getStyles = _props2.getStyles;

	      var isFixed = position === 'fixed';

	      // bail early if required elements aren't present
	      if (!appendTo && !isFixed || !controlElement) {
	        return null;
	      }

	      var placement = this.state.placement || coercePlacement(menuPlacement);
	      var rect = getBoundingClientObj(controlElement);
	      var scrollDistance = isFixed ? 0 : window.pageYOffset;
	      var offset = rect[placement] + scrollDistance;
	      var state = { offset: offset, position: position, rect: rect };

	      // same wrapper element whether fixed or portalled
	      var menuWrapper = React__default.createElement(
	        Div,
	        {
	          className: emotion.css(getStyles('menuPortal', state))
	        },
	        children
	      );

	      return appendTo ? reactDom.createPortal(menuWrapper, appendTo) : menuWrapper;
	    }
	  }]);
	  return MenuPortal;
	}(React.Component);
	MenuPortal.childContextTypes = {
	  getPortalPlacement: PropTypes.func
	};

	var multiValueCSS = function multiValueCSS() {
	  return {
	    backgroundColor: colors.neutral10,
	    borderRadius: borderRadius / 2,
	    display: 'flex',
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
	    display: 'flex',
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

	var MultiValueRemove = function (_Component) {
	  inherits(MultiValueRemove, _Component);

	  function MultiValueRemove() {
	    classCallCheck(this, MultiValueRemove);
	    return possibleConstructorReturn(this, (MultiValueRemove.__proto__ || Object.getPrototypeOf(MultiValueRemove)).apply(this, arguments));
	  }

	  createClass(MultiValueRemove, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          children = _props.children,
	          props = objectWithoutProperties(_props, ['children']);

	      return React__default.createElement(
	        Div,
	        props,
	        children
	      );
	    }
	  }]);
	  return MultiValueRemove;
	}(React.Component);

	MultiValueRemove.defaultProps = {
	  children: React__default.createElement(CrossIcon, { size: 14 })
	};
	var MultiValue = function MultiValue(props) {
	  var children = props.children,
	      components = props.components,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps,
	      isDisabled = props.isDisabled,
	      removeProps = props.removeProps;

	  var cn = {
	    container: cx('multi-value', { isDisabled: isDisabled }),
	    label: cx('multi-value__label'),
	    remove: cx('multi-value__remove')
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
	    _extends({
	      className: emotion.merge(emotion.css(css.container) + (' ' + cn.container))
	    }, innerProps),
	    React__default.createElement(
	      Label,
	      {
	        className: emotion.merge(emotion.css(css.label) + (' ' + cn.label))
	      },
	      children
	    ),
	    React__default.createElement(Remove, _extends({
	      className: emotion.merge(emotion.css(css.remove) + (' ' + cn.remove))
	    }, removeProps))
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
	    backgroundColor: isSelected ? colors.primary : isFocused ? colors.primary25 : 'transparent',
	    color: isDisabled ? colors.neutral20 : isSelected ? colors.neutral0 : 'inherit',
	    cursor: 'default',
	    display: 'block',
	    fontSize: 'inherit',
	    padding: spacing.baseUnit * 2 + 'px ' + spacing.baseUnit * 3 + 'px',
	    width: '100%',
	    userSelect: 'none',
	    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

	    // provide some affordance on touch devices
	    ':active': {
	      backgroundColor: isSelected ? colors.primary : colors.primary50
	    }
	  };
	};

	var Option = function Option(props) {
	  var children = props.children,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      isFocused = props.isFocused,
	      isSelected = props.isSelected,
	      innerProps = props.innerProps;


	  return React__default.createElement(
	    Div,
	    _extends({
	      className: emotion.merge(emotion.css(getStyles('option', props)) + (' ' + cx('option', { isFocused: isFocused, isSelected: isSelected })))
	    }, innerProps),
	    children
	  );
	};

	var css$3 = function css() {
	  return {
	    color: colors.neutral50,
	    marginLeft: spacing.baseUnit / 2,
	    marginRight: spacing.baseUnit / 2,
	    position: 'absolute',
	    top: '50%',
	    transform: 'translateY(-50%)'
	  };
	};

	var Placeholder = function Placeholder(props) {
	  var children = props.children,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;

	  return React__default.createElement(
	    Div,
	    _extends({
	      className: emotion.merge(emotion.css(getStyles('placeholder', props)) + (' ' + cx('placeholder')))
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
	    maxWidth: 'calc(100% - ' + spacing.baseUnit * 2 + 'px)',
	    overflow: 'hidden',
	    position: 'absolute',
	    textOverflow: 'ellipsis',
	    whiteSpace: 'nowrap',
	    top: '50%',
	    transform: 'translateY(-50%)'
	  };
	};

	var SingleValue = function SingleValue(props) {
	  var children = props.children,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      isDisabled = props.isDisabled,
	      innerProps = props.innerProps;

	  return React__default.createElement(
	    Div,
	    _extends({
	      className: emotion.merge(emotion.css(getStyles('singleValue', props)) + (' ' + cx('single-value', { isDisabled: isDisabled })))
	    }, innerProps),
	    children
	  );
	};

	var components = {
	  ClearIndicator: ClearIndicator,
	  Control: Control,
	  DropdownIndicator: DropdownIndicator,
	  DownChevron: DownChevron,
	  CrossIcon: CrossIcon,
	  Group: Group,
	  GroupHeading: GroupHeading,
	  IndicatorsContainer: IndicatorsContainer,
	  IndicatorSeparator: IndicatorSeparator,
	  Input: Input$1,
	  LoadingIndicator: LoadingIndicator,
	  Menu: Menu,
	  MenuList: MenuList,
	  MenuPortal: MenuPortal,
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
	  menuPortal: menuPortalCSS,
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

	function mergeStyles(source) {
	  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  // initialize with source styles
	  var styles = _extends({}, source);

	  // massage in target styles
	  Object.keys(target).forEach(function (key) {
	    if (source[key]) {
	      styles[key] = function (rsCss, props) {
	        return target[key](source[key](rsCss, props), props);
	      };
	    } else {
	      styles[key] = target[key];
	    }
	  });

	  return styles;
	}

	var defaultProps = {
	  backspaceRemovesValue: true,
	  blurInputOnSelect: isTouchCapable(),
	  captureMenuScroll: !isTouchCapable(),
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
	  minMenuHeight: 140,
	  menuIsOpen: false,
	  menuPlacement: 'bottom',
	  menuPosition: 'absolute',
	  menuShouldBlockScroll: false,
	  menuShouldScrollIntoView: !isMobileDevice(),
	  noOptionsMessage: function noOptionsMessage() {
	    return 'No options';
	  },
	  openMenuOnFocus: false,
	  openMenuOnClick: true,
	  options: [],
	  pageSize: 5,
	  placeholder: 'Select...',
	  screenReaderStatus: function screenReaderStatus(_ref) {
	    var count = _ref.count;
	    return count + ' result' + (count !== 1 ? 's' : '') + ' available.';
	  },
	  styles: {},
	  tabIndex: '0',
	  tabSelectsValue: true
	};

	var instanceId = 1;

	var Select = function (_Component) {
	  inherits(Select, _Component);

	  function Select(props) {
	    classCallCheck(this, Select);

	    var _this = possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

	    _initialiseProps.call(_this);

	    var options = props.options,
	        value = props.value;

	    _this.components = defaultComponents(props);
	    _this.instancePrefix = 'react-select-' + (_this.props.instanceId || ++instanceId);

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
	        this.focusInput();
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
	      // manage touch listeners
	      if (nextProps.menuIsOpen && !this.props.menuIsOpen) {
	        this.startListeningToTouch();
	      } else if (!nextProps.menuIsOpen && this.props.menuIsOpen) {
	        this.stopListeningToTouch();
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      var isDisabled = this.props.isDisabled;
	      var isFocused = this.state.isFocused;
	      // ensure focus is restored correctly when the control becomes enabled

	      if (isFocused && !isDisabled && prevProps.isDisabled) {
	        this.focusInput();
	      }
	      // scroll the focused option into view if necessary
	      if (this.menuRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate) {
	        scrollIntoView(this.menuRef, this.focusedOptionRef);
	      }
	      this.scrollToFocusedOptionOnUpdate = false;
	    }

	    // ==============================
	    // Element Refs
	    // ==============================

	  }, {
	    key: 'onMenuOpen',


	    // ==============================
	    // Consumer Handlers
	    // ==============================

	    value: function onMenuOpen() {
	      this.props.onMenuOpen();
	    }
	  }, {
	    key: 'onMenuClose',
	    value: function onMenuClose() {
	      this.onInputChange('', { action: 'menu-close' });
	      this.props.onMenuClose();
	    }
	  }, {
	    key: 'onInputChange',
	    value: function onInputChange(newValue, actionMeta) {
	      this.props.onInputChange(newValue, actionMeta);
	    }

	    // ==============================
	    // Methods
	    // ==============================

	  }, {
	    key: 'focusInput',
	    value: function focusInput() {
	      if (!this.input) return;
	      this.input.focus();
	    }
	  }, {
	    key: 'blurInput',
	    value: function blurInput() {
	      if (!this.input) return;
	      this.input.blur();
	    }

	    // aliased for consumers

	  }, {
	    key: 'openMenu',
	    value: function openMenu(focusOption) {
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
	  }, {
	    key: 'getCommonProps',


	    // ==============================
	    // Getters
	    // ==============================

	    value: function getCommonProps() {
	      var clearValue = this.clearValue,
	          getStyles = this.getStyles,
	          setValue = this.setValue,
	          selectOption = this.selectOption,
	          props = this.props;
	      var className = props.className,
	          isMulti = props.isMulti,
	          isRtl = props.isRtl,
	          options = props.options;
	      var selectValue = this.state.selectValue;

	      var hasValue = this.hasValue();
	      var getValue = function getValue() {
	        return selectValue;
	      };
	      var cx = className ? classNames.bind(null, className) : emptyString;
	      return {
	        cx: cx,
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
	    key: 'getNextFocusedOption',
	    value: function getNextFocusedOption(options) {
	      var lastFocusedOption = this.state.focusedOption;

	      return lastFocusedOption && options.indexOf(lastFocusedOption) > -1 ? lastFocusedOption : options[0];
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


	    // ==============================
	    // Helpers
	    // ==============================

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
	      var _props2 = this.props,
	          isClearable = _props2.isClearable,
	          isMulti = _props2.isMulti;

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
	      var _this2 = this;

	      if (selectValue.indexOf(option) > -1) return true;
	      if (typeof this.props.isOptionSelected === 'function') {
	        return this.props.isOptionSelected(option, selectValue);
	      }
	      var candidate = this.getOptionValue(option);
	      return selectValue.some(function (i) {
	        return _this2.getOptionValue(i) === candidate;
	      });
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

	    // ==============================
	    // Mouse Handlers
	    // ==============================

	  }, {
	    key: 'startListeningToTouch',


	    // ==============================
	    // Touch Handlers
	    // ==============================

	    value: function startListeningToTouch() {
	      if (document && document.addEventListener) {
	        document.addEventListener('touchstart', this.onTouchStart, false);
	        document.addEventListener('touchmove', this.onTouchMove, false);
	        document.addEventListener('touchend', this.onTouchEnd, false);
	      }
	    }
	  }, {
	    key: 'stopListeningToTouch',
	    value: function stopListeningToTouch() {
	      if (document && document.removeEventListener) {
	        document.removeEventListener('touchstart', this.onTouchStart);
	        document.removeEventListener('touchmove', this.onTouchMove);
	        document.removeEventListener('touchend', this.onTouchEnd);
	      }
	    }

	    // ==============================
	    // Focus Handlers
	    // ==============================

	    // ==============================
	    // Keyboard Handlers
	    // ==============================

	  }, {
	    key: 'buildMenuOptions',


	    // ==============================
	    // Menu Options
	    // ==============================

	    value: function buildMenuOptions(options, selectValue) {
	      var _this3 = this;

	      var inputValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	      var _props3 = this.props,
	          hideSelectedOptions = _props3.hideSelectedOptions,
	          isMulti = _props3.isMulti;


	      var toOption = function toOption(option, id) {
	        var isDisabled = _this3.isOptionDisabled(option);
	        var isSelected = _this3.isOptionSelected(option, selectValue);
	        var label = _this3.getOptionLabel(option);
	        var value = _this3.getOptionValue(option);

	        if (isMulti && hideSelectedOptions && isSelected || !_this3.filterOption({ label: label, value: value, data: option }, inputValue)) {
	          return;
	        }

	        var onHover = isDisabled ? undefined : function () {
	          return _this3.onOptionHover(option);
	        };
	        var onSelect = isDisabled ? undefined : function () {
	          return _this3.selectOption(option);
	        };
	        var optionId = _this3.getElementId('option') + '-' + id;

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
	          if (!_this3.hasGroups) _this3.hasGroups = true;

	          var items = item.options;

	          var children = items.map(function (child, i) {
	            var option = toOption(child, itemIndex + '-' + i);
	            if (option && !option.isDisabled) acc.focusable.push(child);
	            return option;
	          }).filter(Boolean);
	          if (children.length) {
	            var groupId = _this3.getElementId('group') + '-' + itemIndex;
	            acc.render.push({
	              type: 'group',
	              key: groupId,
	              data: item,
	              options: children
	            });
	          }
	        } else {
	          var option = toOption(item, '' + itemIndex);
	          if (option) {
	            acc.render.push(option);
	            if (!option.isDisabled) acc.focusable.push(item);
	          }
	        }
	        return acc;
	      }, { render: [], focusable: [] });
	    }

	    // ==============================
	    // Renderers
	    // ==============================

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
	    value: function renderInput() {
	      var _props4 = this.props,
	          isDisabled = _props4.isDisabled,
	          isLoading = _props4.isLoading,
	          isSearchable = _props4.isSearchable,
	          inputId = _props4.inputId,
	          inputValue = _props4.inputValue,
	          menuIsOpen = _props4.menuIsOpen,
	          tabIndex = _props4.tabIndex;
	      var Input$$1 = this.components.Input;
	      var inputIsHidden = this.state.inputIsHidden;


	      var id = inputId || this.getElementId('input');

	      if (!isSearchable) {
	        // use a dummy input to maintain focus/blur functionality
	        return React__default.createElement(DummyInput, {
	          id: id,
	          innerRef: this.onInputRef,
	          onBlur: this.onInputBlur,
	          onChange: noop,
	          onFocus: this.onInputFocus,
	          readOnly: true,
	          tabIndex: tabIndex,
	          value: ''
	        });
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

	      var cx = this.commonProps.cx;


	      return React__default.createElement(Input$$1, _extends({
	        autoCapitalize: 'none',
	        autoComplete: 'off',
	        autoCorrect: 'off',
	        cx: cx,
	        getStyles: this.getStyles,
	        id: id,
	        innerRef: this.onInputRef,
	        isDisabled: isDisabled,
	        isHidden: inputIsHidden,
	        onBlur: this.onInputBlur,
	        onChange: this.handleInputChange,
	        onFocus: this.onInputFocus,
	        spellCheck: 'false',
	        tabIndex: tabIndex,
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
	        onTouchEnd: this.onClearIndicatorTouchEnd,
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
	      var _components2 = this.components,
	          DropdownIndicator = _components2.DropdownIndicator,
	          IndicatorSeparator = _components2.IndicatorSeparator;

	      // separator doesn't make sense without the dropdown indicator

	      if (!DropdownIndicator || !IndicatorSeparator) return null;

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
	        onTouchEnd: this.onDropdownIndicatorTouchEnd,
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

	      var _components3 = this.components,
	          Group = _components3.Group,
	          GroupHeading = _components3.GroupHeading,
	          Menu = _components3.Menu,
	          MenuList = _components3.MenuList,
	          MenuPortal = _components3.MenuPortal,
	          LoadingMessage = _components3.LoadingMessage,
	          NoOptionsMessage = _components3.NoOptionsMessage,
	          Option = _components3.Option;
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
	          minMenuHeight = _props8.minMenuHeight,
	          maxMenuHeight = _props8.maxMenuHeight,
	          menuIsOpen = _props8.menuIsOpen,
	          menuPlacement = _props8.menuPlacement,
	          menuPosition = _props8.menuPosition,
	          menuPortalTarget = _props8.menuPortalTarget,
	          menuShouldBlockScroll = _props8.menuShouldBlockScroll,
	          menuShouldScrollIntoView = _props8.menuShouldScrollIntoView,
	          noOptionsMessage = _props8.noOptionsMessage,
	          onMenuScrollToTop = _props8.onMenuScrollToTop,
	          onMenuScrollToBottom = _props8.onMenuScrollToBottom;


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

	      var menuElement = React__default.createElement(
	        'div',
	        null,
	        menuShouldBlockScroll ? React__default.createElement(ScrollBlock, null) : null,
	        React__default.createElement(
	          Menu,
	          _extends({}, commonProps, {
	            innerProps: {
	              onMouseDown: this.onMenuMouseDown,
	              onMouseMove: this.onMenuMouseMove
	            },
	            isLoading: isLoading,
	            minMenuHeight: minMenuHeight,
	            maxMenuHeight: maxMenuHeight,
	            menuPlacement: menuPlacement,
	            menuPosition: menuPosition,
	            menuShouldScrollIntoView: menuShouldScrollIntoView
	          }),
	          React__default.createElement(
	            ScrollCaptorSwitch,
	            {
	              isEnabled: captureMenuScroll,
	              onTopArrive: onMenuScrollToTop,
	              onBottomArrive: onMenuScrollToBottom
	            },
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
	        )
	      );

	      // positioning behaviour is almost identical for portalled and fixed,
	      // so we use the same component. the actual portalling logic is forked
	      // within the component based on `menuPosition`
	      return menuPortalTarget || menuPosition === 'fixed' ? React__default.createElement(
	        MenuPortal,
	        _extends({}, commonProps, {
	          appendTo: menuPortalTarget,
	          controlElement: this.controlRef,
	          menuPlacement: menuPlacement,
	          menuPosition: menuPosition
	        }),
	        menuElement
	      ) : menuElement;
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
	    key: 'render',
	    value: function render() {
	      var _components4 = this.components,
	          Control = _components4.Control,
	          IndicatorsContainer = _components4.IndicatorsContainer,
	          SelectContainer = _components4.SelectContainer,
	          ValueContainer = _components4.ValueContainer;
	      var _props10 = this.props,
	          id = _props10.id,
	          isDisabled = _props10.isDisabled,
	          maxValueHeight = _props10.maxValueHeight;
	      var isFocused = this.state.isFocused;


	      var commonProps = this.commonProps = this.getCommonProps();

	      return React__default.createElement(
	        SelectContainer,
	        _extends({}, commonProps, {
	          innerProps: {
	            id: id,
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
	              innerRef: this.onControlRef,
	              onMouseDown: this.onControlMouseDown,
	              onTouchEnd: this.onControlTouchEnd
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
	            this.renderInput()
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

	Select.defaultProps = defaultProps;

	var _initialiseProps = function _initialiseProps() {
	  var _this7 = this;

	  this.blockOptionHover = false;
	  this.hasGroups = false;
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

	  this.onInputRef = function (ref) {
	    _this7.input = ref;
	  };

	  this.onControlRef = function (ref) {
	    _this7.controlRef = ref;
	  };

	  this.onMenuRef = function (ref) {
	    _this7.menuRef = ref;
	  };

	  this.onFocusedOptionRef = function (ref) {
	    _this7.focusedOptionRef = ref;
	  };

	  this.focus = this.focusInput;
	  this.blur = this.blurInput;

	  this.setValue = function (newValue) {
	    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'set-value';
	    var _props11 = _this7.props,
	        closeMenuOnSelect = _props11.closeMenuOnSelect,
	        isMulti = _props11.isMulti,
	        onChange = _props11.onChange;

	    _this7.onInputChange('', { action: 'set-value' });
	    if (closeMenuOnSelect) {
	      _this7.inputIsHiddenAfterUpdate = !isMulti;
	      _this7.onMenuClose();
	    }
	    onChange(newValue, { action: action });
	  };

	  this.selectOption = function (newValue) {
	    var _props12 = _this7.props,
	        blurInputOnSelect = _props12.blurInputOnSelect,
	        isMulti = _props12.isMulti;


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

	    if (blurInputOnSelect) {
	      _this7.blurInput();
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
	    _this7.focusInput();
	  };

	  this.clearValue = function () {
	    var _props13 = _this7.props,
	        isMulti = _props13.isMulti,
	        onChange = _props13.onChange;

	    onChange(isMulti ? [] : null, { action: 'clear' });
	  };

	  this.popValue = function () {
	    var onChange = _this7.props.onChange;
	    var selectValue = _this7.state.selectValue;

	    onChange(selectValue.slice(0, selectValue.length - 1), {
	      action: 'pop-value'
	    });
	  };

	  this.getStyles = function (key, props) {
	    var base = defaultStyles[key](props);
	    base.boxSizing = 'border-box';
	    var custom = _this7.props.styles[key];
	    return custom ? custom(base, props) : base;
	  };

	  this.getElementId = function (element) {
	    return _this7.instancePrefix + '-' + element;
	  };

	  this.getActiveDescendentId = function () {
	    var menuIsOpen = _this7.props.menuIsOpen;
	    var _state4 = _this7.state,
	        menuOptions = _state4.menuOptions,
	        focusedOption = _state4.focusedOption;


	    if (!focusedOption || !menuIsOpen) return undefined;

	    var index = menuOptions.focusable.indexOf(focusedOption);
	    var option = menuOptions.render[index];

	    return option && option.key;
	  };

	  this.onMenuMouseDown = function (event) {
	    if (event.button !== 0) {
	      return;
	    }
	    event.stopPropagation();
	    event.preventDefault();
	    _this7.focusInput();
	  };

	  this.onMenuMouseMove = function (event) {
	    _this7.blockOptionHover = false;
	  };

	  this.onControlMouseDown = function (event) {
	    var openMenuOnClick = _this7.props.openMenuOnClick;

	    if (!_this7.state.isFocused) {
	      if (openMenuOnClick) {
	        _this7.openAfterFocus = true;
	      }
	      _this7.focusInput();
	    } else if (!_this7.props.menuIsOpen) {
	      _this7.openMenu('first');
	    } else {
	      _this7.onMenuClose();
	    }
	    // $FlowFixMe HTMLElement type does not have tagName property
	    if (event.target.tagName !== 'INPUT') {
	      event.preventDefault();
	    }
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

	    _this7.focusInput();
	    if (menuIsOpen) {
	      _this7.inputIsHiddenAfterUpdate = !isMulti;
	      _this7.onMenuClose();
	    } else {
	      _this7.openMenu('first');
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
	      return _this7.focusInput();
	    });
	  };

	  this.onTouchStart = function () {
	    _this7.userIsDragging = false;
	  };

	  this.onTouchMove = function () {
	    _this7.userIsDragging = true;
	  };

	  this.onTouchEnd = function (event) {
	    if (_this7.userIsDragging) return;

	    // close the menu if the user taps outside
	    if (_this7.controlRef && !_this7.controlRef.contains(event.target) && _this7.menuRef && !_this7.menuRef.contains(event.target)) {
	      _this7.blurInput();
	    }
	  };

	  this.onControlTouchEnd = function (event) {
	    if (_this7.userIsDragging) return;

	    _this7.onControlMouseDown(event);
	  };

	  this.onClearIndicatorTouchEnd = function (event) {
	    if (_this7.userIsDragging) return;

	    _this7.onClearIndicatorMouseDown(event);
	  };

	  this.onDropdownIndicatorTouchEnd = function (event) {
	    if (_this7.userIsDragging) return;

	    _this7.onDropdownIndicatorMouseDown(event);
	  };

	  this.handleInputChange = function (event) {
	    var inputValue = event.currentTarget.value;
	    _this7.inputIsHiddenAfterUpdate = false;
	    _this7.onInputChange(inputValue, { action: 'input-change' });
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
	    if (_this7.openAfterFocus || _this7.props.openMenuOnFocus) {
	      _this7.openMenu('first');
	    }
	    _this7.openAfterFocus = false;
	  };

	  this.onInputBlur = function (event) {
	    if (_this7.props.onBlur) {
	      _this7.props.onBlur(event);
	    }
	    _this7.onInputChange('', { action: 'input-blur' });
	    _this7.onMenuClose();
	    _this7.setState({
	      isFocused: false
	    });
	  };

	  this.onOptionHover = function (focusedOption) {
	    if (_this7.blockOptionHover || _this7.state.focusedOption === focusedOption) {
	      return;
	    }
	    _this7.setState({ focusedOption: focusedOption });
	  };

	  this.onKeyDown = function (event) {
	    var _props15 = _this7.props,
	        backspaceRemovesValue = _props15.backspaceRemovesValue,
	        escapeClearsValue = _props15.escapeClearsValue,
	        inputValue = _props15.inputValue,
	        isClearable = _props15.isClearable,
	        isDisabled = _props15.isDisabled,
	        menuIsOpen = _props15.menuIsOpen,
	        onKeyDown = _props15.onKeyDown,
	        tabSelectsValue = _props15.tabSelectsValue,
	        openMenuOnFocus = _props15.openMenuOnFocus;
	    var _state5 = _this7.state,
	        focusedOption = _state5.focusedOption,
	        selectValue = _state5.selectValue;


	    if (isDisabled) return;

	    if (typeof onKeyDown === 'function') {
	      onKeyDown(event);
	      if (event.defaultPrevented) {
	        return;
	      }
	    }

	    // Block option hover events when the user has just pressed a key
	    _this7.blockOptionHover = true;

	    switch (event.key) {
	      case 'Backspace':
	        if (inputValue || !backspaceRemovesValue) return;
	        _this7.popValue();
	        break;
	      case 'Tab':
	        if (event.shiftKey || !menuIsOpen || !tabSelectsValue || !focusedOption ||
	        // don't capture the event if the menu opens on focus and the focused
	        // option is already selected; it breaks the flow of navigation
	        openMenuOnFocus && _this7.isOptionSelected(focusedOption, selectValue)) {
	          return;
	        }
	        _this7.selectOption(focusedOption);
	        break;
	      case 'Enter':
	        if (menuIsOpen) {
	          if (!focusedOption) return;
	          _this7.selectOption(focusedOption);
	        } else {
	          _this7.focusOption('first');
	        }
	        break;
	      case 'Escape':
	        if (menuIsOpen) {
	          _this7.inputIsHiddenAfterUpdate = false;
	          _this7.onInputChange('', { action: 'menu-close' });
	          _this7.onMenuClose();
	        } else if (isClearable && escapeClearsValue) {
	          _this7.clearValue();
	        }
	        break;
	      case ' ':
	        // space
	        if (inputValue) {
	          return;
	        }
	        if (!menuIsOpen) {
	          _this7.openMenu('first');
	          break;
	        }
	        if (!focusedOption) return;
	        _this7.selectOption(focusedOption);
	        break;
	      case 'ArrowUp':
	        if (menuIsOpen) {
	          _this7.focusOption('up');
	        } else {
	          _this7.openMenu('last');
	        }
	        break;
	      case 'ArrowDown':
	        if (menuIsOpen) {
	          _this7.focusOption('down');
	        } else {
	          _this7.openMenu('first');
	        }
	        break;
	      case 'PageUp':
	        if (!menuIsOpen) return;
	        _this7.focusOption('pageup');
	        break;
	      case 'PageDown':
	        if (!menuIsOpen) return;
	        _this7.focusOption('pagedown');
	        break;
	      case 'Home':
	        if (!menuIsOpen) return;
	        _this7.focusOption('first');
	        break;
	      case 'End':
	        if (!menuIsOpen) return;
	        _this7.focusOption('last');
	        break;
	      default:
	        return;
	    }
	    event.preventDefault();
	  };
	};

	var manageState = function manageState(SelectComponent) {
	  var _class, _temp2;

	  return _temp2 = _class = function (_Component) {
	    inherits(StateManager, _Component);

	    function StateManager() {
	      var _ref;

	      var _temp, _this, _ret;

	      classCallCheck(this, StateManager);

	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = StateManager.__proto__ || Object.getPrototypeOf(StateManager)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	        inputValue: _this.props.inputValue !== undefined ? _this.props.inputValue : _this.props.defaultInputValue,
	        menuIsOpen: _this.props.menuIsOpen !== undefined ? _this.props.menuIsOpen : _this.props.defaultMenuIsOpen,
	        value: _this.props.value !== undefined ? _this.props.value : _this.props.defaultValue
	      }, _this.onChange = function (value, actionMeta) {
	        _this.callProp('onChange', value, actionMeta);
	        _this.setState({ value: value });
	      }, _this.onInputChange = function (value, actionMeta) {
	        // TODO: for backwards compatibility, we allow the prop to return a new
	        // value, but now inputValue is a controllable prop we probably shouldn't
	        var newValue = _this.callProp('onInputChange', value, actionMeta);
	        _this.setState({
	          inputValue: newValue !== undefined ? newValue : value
	        });
	      }, _this.onMenuOpen = function () {
	        _this.callProp('onMenuOpen');
	        _this.setState({ menuIsOpen: true });
	      }, _this.onMenuClose = function () {
	        _this.callProp('onMenuClose');
	        _this.setState({ menuIsOpen: false });
	      }, _temp), possibleConstructorReturn(_this, _ret);
	    }

	    createClass(StateManager, [{
	      key: 'focus',
	      value: function focus() {
	        this.select.focus();
	      }
	    }, {
	      key: 'blur',
	      value: function blur() {
	        this.select.blur();
	      }
	    }, {
	      key: 'getProp',
	      value: function getProp(key) {
	        return this.props[key] !== undefined ? this.props[key] : this.state[key];
	      }
	    }, {
	      key: 'callProp',
	      value: function callProp(name) {
	        if (typeof this.props[name] === 'function') {
	          var _props;

	          for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	            args[_key2 - 1] = arguments[_key2];
	          }

	          return (_props = this.props)[name].apply(_props, toConsumableArray(args));
	        }
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        var _this2 = this;

	        return React__default.createElement(SelectComponent, _extends({}, this.props, {
	          ref: function ref(_ref2) {
	            _this2.select = _ref2;
	          },
	          inputValue: this.getProp('inputValue'),
	          menuIsOpen: this.getProp('menuIsOpen'),
	          onChange: this.onChange,
	          onInputChange: this.onInputChange,
	          onMenuClose: this.onMenuClose,
	          onMenuOpen: this.onMenuOpen,
	          value: this.getProp('value')
	        }));
	      }
	    }]);
	    return StateManager;
	  }(React.Component), _class.defaultProps = {
	    defaultInputValue: '',
	    defaultMenuIsOpen: false,
	    defaultValue: null
	  }, _temp2;
	};

	// This file exists as an entry point for bundling our umd builds.

	var Select$1 = manageState(Select);
	Select$1.SelectBase = Select;
	Select$1.createFilter = createFilter;
	Select$1.components = components;
	Select$1.mergeStyles = mergeStyles;

	return Select$1;

})));
