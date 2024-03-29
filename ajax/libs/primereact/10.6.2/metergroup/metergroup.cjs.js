'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('primereact/hooks');
var api = require('primereact/api');
var utils = require('primereact/utils');
var componentbase = require('primereact/componentbase');

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends.apply(this, arguments);
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
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

var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return [utils.classNames('p-metergroup p-component', {
      'p-metergroup-horizontal': props.orientation === 'horizontal',
      'p-metergroup-vertical': props.orientation === 'vertical'
    })];
  },
  metercontainer: 'p-metergroup-meter-container',
  meter: 'p-metergroup-meter',
  labellist: function labellist(_ref2) {
    var props = _ref2.props;
    return utils.classNames('p-metergroup-label-list', {
      'p-metergroup-label-list-start': props.labelPosition === 'start',
      'p-metergroup-label-list-end': props.labelPosition === 'end',
      'p-metergroup-label-list-vertical': props.labelOrientation === 'vertical',
      'p-metergroup-label-list-horizontal': props.labelOrientation === 'horizontal'
    });
  },
  labellistitem: 'p-metergroup-label-list-item',
  labelicon: 'p-metergroup-label-icon',
  labellisttype: 'p-metergroup-label-type',
  label: 'p-metergroup-label'
};
var styles = "\n@layer primereact {\n    .p-metergroup {\n        position: relative;\n        overflow: hidden;\n    }\n\n    .p-metergroup-vertical.p-metergroup {\n        display: flex;\n    }\n\n    .p-metergroup-vertical .p-metergroup-meter-container {\n        flex-direction: column;\n    }\n\n    .p-metergroup-meter-container {\n        display: flex;\n    }\n\n    .p-metergroup-label-list {\n        display: flex;\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n    }\n\n    .p-metergroup-vertical .p-metergroup-label-list {\n        align-items: start;\n    }\n\n    .p-metergroup-label-list-vertical {\n        flex-direction: column;\n    }\n\n    .p-metergroup-label-list-horizontal {\n        flex-direction: row;\n    }\n\n    .p-metergroup-label-list-item {\n        display: inline-flex;\n        align-items: center;\n    }\n\n    .p-metergroup-label-type {\n        display: inline-block;\n    }\n}\n";
var MeterGroupBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'MeterGroup',
    __parentMetadata: null,
    children: undefined,
    className: null,
    values: null,
    min: 0,
    max: 100,
    orientation: 'horizontal',
    labelPosition: 'end',
    labelOrientation: 'horizontal',
    start: null,
    end: null,
    meter: null,
    labelList: null
  },
  css: {
    classes: classes,
    styles: styles
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var MeterGroup = function MeterGroup(inProps) {
  var context = react.useContext(api.PrimeReactContext);
  var props = MeterGroupBase.getProps(inProps, context);
  var values = props.values,
    min = props.min,
    max = props.max,
    orientation = props.orientation,
    labelPosition = props.labelPosition,
    start = props.start,
    end = props.end,
    meter = props.meter,
    labelList = props.labelList;
  var mergeProps = hooks.useMergeProps();
  var _MeterGroupBase$setMe = MeterGroupBase.setMetaData(_objectSpread(_objectSpread({
      props: props
    }, props.__parentMetadata), {}, {
      context: {
        disabled: props.disabled
      }
    })),
    ptm = _MeterGroupBase$setMe.ptm,
    cx = _MeterGroupBase$setMe.cx,
    isUnstyled = _MeterGroupBase$setMe.isUnstyled;
  componentbase.useHandleStyle(MeterGroupBase.css.styles, isUnstyled, {
    name: 'progressbar'
  });
  var totalPercent = 0;
  var precentages = [];
  values.map(function (item) {
    totalPercent = totalPercent + item.value;
    precentages.push(Math.round(item.value / totalPercent * 100));
  });
  var calculatePercentage = function calculatePercentage() {
    var meterValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var percentageOfItem = (meterValue - min) / (max - min) * 100;
    return Math.round(Math.max(0, Math.min(100, percentageOfItem)));
  };
  var rootProps = mergeProps({
    className: utils.classNames(props.className, cx('root', {
      orientation: orientation
    }))
  }, MeterGroupBase.getOtherProps(props), ptm('root'));
  var createMeters = function createMeters() {
    var meters = values.map(function (item, index) {
      var calculatedPercantage = calculatePercentage(item.value);
      var meterInlineStyles = {
        backgroundColor: item.color,
        width: orientation === 'horizontal' ? calculatedPercantage + '%' : 'auto',
        height: orientation === 'vertical' ? calculatedPercantage + '%' : 'auto'
      };
      var meterProps = mergeProps({
        className: cx('meter'),
        style: meterInlineStyles
      }, ptm('meter'));
      if (meter || item.meterTemplate) {
        var meterTemplateProps = mergeProps({
          className: cx('meter')
        }, ptm('meter'));
        return utils.ObjectUtils.getJSXElement(item.meterTemplate || meter, _objectSpread(_objectSpread({}, item), {}, {
          percentage: calculatedPercantage,
          index: index
        }), meterTemplateProps);
      }
      return /*#__PURE__*/React.createElement("span", _extends({
        key: index
      }, meterProps));
    });
    var meterContainerProps = mergeProps({
      className: cx('metercontainer')
    }, ptm('metercontainer'));
    return /*#__PURE__*/React.createElement("div", meterContainerProps, meters);
  };
  var createLabelList = function createLabelList() {
    var labelListProps = mergeProps({
      className: cx('labellist')
    }, ptm('labellist'));
    var labelItemProps = mergeProps({
      className: cx('labellistitem')
    }, ptm('labellistitem'));
    var labelProps = mergeProps({
      className: cx('label')
    }, ptm('label'));
    return /*#__PURE__*/React.createElement("ol", labelListProps, values.map(function (item, index) {
      var labelIconProps = mergeProps({
        className: utils.classNames(cx('labelicon'), item.icon),
        style: {
          color: item.color
        }
      }, ptm('labelicon'));
      var labelListIconProps = mergeProps({
        className: cx('labellisttype'),
        style: {
          backgroundColor: item.color
        }
      }, ptm('labellisttype'));
      var labelIcon = item.icon ? /*#__PURE__*/React.createElement("i", labelIconProps) : /*#__PURE__*/React.createElement("span", labelListIconProps);
      return /*#__PURE__*/React.createElement("li", _extends({
        key: index
      }, labelItemProps), labelIcon, /*#__PURE__*/React.createElement("span", labelProps, item === null || item === void 0 ? void 0 : item.label, " ", (item === null || item === void 0 ? void 0 : item.value) && "(".concat(item === null || item === void 0 ? void 0 : item.value, "%)")));
    }));
  };
  var templateProps = {
    totalPercent: totalPercent,
    precentages: precentages,
    values: values
  };
  var labelElement = utils.ObjectUtils.getJSXElement(labelList || createLabelList, {
    values: values,
    totalPercent: totalPercent
  });
  return /*#__PURE__*/React.createElement("div", _extends({}, rootProps, {
    role: "meter",
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-valuenow": totalPercent
  }), labelPosition === 'start' && labelElement, start && utils.ObjectUtils.getJSXElement(start, templateProps), createMeters(), end && utils.ObjectUtils.getJSXElement(end, templateProps), labelPosition === 'end' && labelElement);
};

exports.MeterGroup = MeterGroup;
