"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _crossFade = _interopRequireDefault(require("inline-style-prefixer/lib/plugins/crossFade"));
var _imageSet = _interopRequireDefault(require("inline-style-prefixer/lib/plugins/imageSet"));
var _logical = _interopRequireDefault(require("inline-style-prefixer/lib/plugins/logical"));
var _position = _interopRequireDefault(require("inline-style-prefixer/lib/plugins/position"));
var _sizing = _interopRequireDefault(require("inline-style-prefixer/lib/plugins/sizing"));
var _transition = _interopRequireDefault(require("inline-style-prefixer/lib/plugins/transition"));
var w = ['Webkit'];
var m = ['Moz'];
var wm = ['Webkit', 'Moz'];
var wms = ['Webkit', 'ms'];
var wmms = ['Webkit', 'Moz', 'ms'];
var _default = exports.default = {
  plugins: [_crossFade.default, _imageSet.default, _logical.default, _position.default, _sizing.default, _transition.default],
  prefixMap: {
    appearance: wmms,
    userSelect: wm,
    textEmphasisPosition: wms,
    textEmphasis: wms,
    textEmphasisStyle: wms,
    textEmphasisColor: wms,
    boxDecorationBreak: wms,
    clipPath: w,
    maskImage: wms,
    maskMode: wms,
    maskRepeat: wms,
    maskPosition: wms,
    maskClip: wms,
    maskOrigin: wms,
    maskSize: wms,
    maskComposite: wms,
    mask: wms,
    maskBorderSource: wms,
    maskBorderMode: wms,
    maskBorderSlice: wms,
    maskBorderWidth: wms,
    maskBorderOutset: wms,
    maskBorderRepeat: wms,
    maskBorder: wms,
    maskType: wms,
    textDecorationStyle: w,
    textDecorationSkip: w,
    textDecorationLine: w,
    textDecorationColor: w,
    filter: w,
    breakAfter: w,
    breakBefore: w,
    breakInside: w,
    columnCount: w,
    columnFill: w,
    columnGap: w,
    columnRule: w,
    columnRuleColor: w,
    columnRuleStyle: w,
    columnRuleWidth: w,
    columns: w,
    columnSpan: w,
    columnWidth: w,
    backdropFilter: w,
    hyphens: w,
    flowInto: w,
    flowFrom: w,
    regionFragment: w,
    textOrientation: w,
    tabSize: m,
    fontKerning: w,
    textSizeAdjust: w
  }
};
module.exports = exports.default;