/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/overlay/overlay.js']) {
   __coverage__['build/overlay/overlay.js'] = {"path":"build/overlay/overlay.js","s":{"1":0,"2":0},"b":{},"f":{"1":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":19},"end":{"line":1,"column":38}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":39,"column":3}},"2":{"start":{"line":26,"column":0},"end":{"line":26,"column":148}}},"branchMap":{},"code":["(function () { YUI.add('overlay', function (Y, NAME) {","","/**"," * Provides a basic Overlay widget, with Standard Module content support. The Overlay widget"," * provides Page XY positioning support, alignment and centering support along with basic"," * stackable support (z-index and shimming)."," *"," * @module overlay"," */","","/**"," * A basic Overlay Widget, which can be positioned based on Page XY co-ordinates and is stackable (z-index support)."," * It also provides alignment and centering support and uses a standard module format for it's content, with header,"," * body and footer section support."," *"," * @class Overlay"," * @constructor"," * @extends Widget"," * @uses WidgetStdMod"," * @uses WidgetPosition"," * @uses WidgetStack"," * @uses WidgetPositionAlign"," * @uses WidgetPositionConstrain"," * @param {Object} object The user configuration for the instance."," */","Y.Overlay = Y.Base.create(\"overlay\", Y.Widget, [Y.WidgetStdMod, Y.WidgetPosition, Y.WidgetStack, Y.WidgetPositionAlign, Y.WidgetPositionConstrain]);","","","}, '3.17.2', {","    \"requires\": [","        \"widget\",","        \"widget-stdmod\",","        \"widget-position\",","        \"widget-position-align\",","        \"widget-stack\",","        \"widget-position-constrain\"","    ],","    \"skinnable\": true","});","","}());"]};
}
var __cov_adgwiNI75fIUQlawz_eo4A = __coverage__['build/overlay/overlay.js'];
__cov_adgwiNI75fIUQlawz_eo4A.s['1']++;YUI.add('overlay',function(Y,NAME){__cov_adgwiNI75fIUQlawz_eo4A.f['1']++;__cov_adgwiNI75fIUQlawz_eo4A.s['2']++;Y.Overlay=Y.Base.create('overlay',Y.Widget,[Y.WidgetStdMod,Y.WidgetPosition,Y.WidgetStack,Y.WidgetPositionAlign,Y.WidgetPositionConstrain]);},'3.17.2',{'requires':['widget','widget-stdmod','widget-position','widget-position-align','widget-stack','widget-position-constrain'],'skinnable':true});
