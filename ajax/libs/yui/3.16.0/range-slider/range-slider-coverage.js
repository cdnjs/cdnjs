/*
YUI 3.16.0 (build 76f0e08)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/range-slider/range-slider.js']) {
   __coverage__['build/range-slider/range-slider.js'] = {"path":"build/range-slider/range-slider.js","s":{"1":0,"2":0},"b":{},"f":{"1":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":24},"end":{"line":1,"column":43}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":28,"column":84}},"2":{"start":{"line":24,"column":0},"end":{"line":25,"column":46}}},"branchMap":{},"code":["(function () { YUI.add('range-slider', function (Y, NAME) {","","/**"," * Create a sliding value range input visualized as a draggable thumb on a"," * background rail element."," *"," * @module slider"," * @main slider"," * @submodule range-slider"," */","","/**"," * Create a slider to represent an integer value between a given minimum and"," * maximum.  Sliders may be aligned vertically or horizontally, based on the"," * <code>axis</code> configuration."," *"," * @class Slider"," * @constructor"," * @extends SliderBase"," * @uses SliderValueRange"," * @uses ClickableRail"," * @param config {Object} Configuration object"," */","Y.Slider = Y.Base.build( 'slider', Y.SliderBase,","    [ Y.SliderValueRange, Y.ClickableRail ] );","","","}, '3.16.0', {\"requires\": [\"slider-base\", \"slider-value-range\", \"clickable-rail\"]});","","}());"]};
}
var __cov_YEVObAz5rR5pcGkNfVHtzA = __coverage__['build/range-slider/range-slider.js'];
__cov_YEVObAz5rR5pcGkNfVHtzA.s['1']++;YUI.add('range-slider',function(Y,NAME){__cov_YEVObAz5rR5pcGkNfVHtzA.f['1']++;__cov_YEVObAz5rR5pcGkNfVHtzA.s['2']++;Y.Slider=Y.Base.build('slider',Y.SliderBase,[Y.SliderValueRange,Y.ClickableRail]);},'3.16.0',{'requires':['slider-base','slider-value-range','clickable-rail']});
