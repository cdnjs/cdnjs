/*jshint indent:false, quotmark:false*/
modulex.use(['ua', 'feature'], function(UA, Feature){
var mx = modulex;
mx.config("requires",{
    "attribute": [
        "modulex-util",
        "modulex-event-custom"
    ],
    "dom/base": [
        "modulex-util",
        "modulex-ua",
        "modulex-feature",
        "dom/selector"
    ],
    "dom/ie": [
        "dom/base"
    ],
    "event-base": [
        "modulex-util"
    ],
    "event-custom": [
        "modulex-util",
        "modulex-event-base"
    ],
    "gregorian-calendar": [
        "i18n!gregorian-calendar"
    ],
    "anim/base": [
        "dom",
        "promise",
        "util"
    ],
    "anim/timer": [
        "anim/base",
        "feature"
    ],
    "anim/transition": [
        "anim/base",
        "feature"
    ],
    "base": [
        "attribute"
    ],
    "button": [
        "component/control"
    ],
    "combobox/multi-word": [
        "combobox"
    ],
    "combobox": [
        "menu",
        "io"
    ],
    "component/container": [
        "component/control"
    ],
    "component/control": [
        "node",
        "event-dom/gesture/basic",
        "event-dom/gesture/tap",
        "base",
        "xtemplate/runtime"
    ],
    "component/extension/align": [
        "node",
        "ua"
    ],
    "component/extension/content-box": [
        "xtemplate/runtime"
    ],
    "component/extension/delegate-children": [
        "component/control"
    ],
    "component/extension/shim": [
        "ua"
    ],
    "component/plugin/drag": [
        "dd"
    ],
    "component/plugin/resize": [
        "resizable"
    ],
    "date-picker": [
        "gregorian-calendar",
        "component/control",
        "gregorian-calendar-format",
        "component/extension/shim",
        "component/extension/align",
        "i18n!date-picker"
    ],
    "dd/plugin/constrain": [
        "base",
        "node"
    ],
    "dd/plugin/proxy": [
        "dd"
    ],
    "dd/plugin/scroll": [
        "dd"
    ],
    "dd": [
        "base",
        "node",
        "event-dom/gesture/basic",
        "event-dom/gesture/pan"
    ],
    "editor": [
        "html-parser",
        "component/control"
    ],
    "event-dom/base": [
        "event-base",
        "dom",
        "ua"
    ],
    "event-dom/focusin": [
        "event-dom/base"
    ],
    "event-dom/gesture/basic": [
        "event-dom/gesture/util"
    ],
    "event-dom/gesture/edge-pan": [
        "event-dom/gesture/util"
    ],
    "event-dom/gesture/pan": [
        "event-dom/gesture/util"
    ],
    "event-dom/gesture/pinch": [
        "event-dom/gesture/util"
    ],
    "event-dom/gesture/rotate": [
        "event-dom/gesture/util"
    ],
    "event-dom/gesture/shake": [
        "event-dom/base"
    ],
    "event-dom/gesture/swipe": [
        "event-dom/gesture/util"
    ],
    "event-dom/gesture/tap": [
        "event-dom/gesture/util"
    ],
    "event-dom/gesture/util": [
        "event-dom/base",
        "feature"
    ],
    "event-dom/hashchange": [
        "event-dom/base"
    ],
    "event-dom/ie": [
        "event-dom/base"
    ],
    "event-dom/input": [
        "event-dom/base"
    ],
    "filter-menu": [
        "menu"
    ],
    "io": [
        "util",
        "dom",
        "querystring",
        "event-custom",
        "promise",
        "url",
        "ua",
        "event-dom"
    ],
    "menu": [
        "component/container",
        "component/extension/delegate-children",
        "component/extension/content-box",
        "component/extension/align",
        "component/extension/shim"
    ],
    "menubutton": [
        "button",
        "menu"
    ],
    "navigation-view/bar": [
        "button"
    ],
    "navigation-view": [
        "component/container",
        "component/extension/content-box"
    ],
    "node": [
        "util",
        "dom",
        "event-dom",
        "anim"
    ],
    "overlay": [
        "component/container",
        "component/extension/shim",
        "component/extension/align",
        "component/extension/content-box"
    ],
    "resizable/plugin/proxy": [
        "base",
        "node"
    ],
    "resizable": [
        "dd"
    ],
    "router": [
        "url",
        "event-dom",
        "event-custom",
        "feature"
    ],
    "scroll-view/base": [
        "anim/timer",
        "component/container",
        "component/extension/content-box"
    ],
    "scroll-view/plugin/pull-to-refresh": [
        "base",
        "node",
        "feature"
    ],
    "scroll-view/plugin/scrollbar": [
        "component/control",
        "event-dom/gesture/pan"
    ],
    "scroll-view/touch": [
        "anim/timer",
        "event-dom/gesture/pan",
        "component/container",
        "component/extension/content-box"
    ],
    "separator": [
        "component/control"
    ],
    "split-button": [
        "menubutton"
    ],
    "stylesheet": [
        "dom"
    ],
    "swf": [
        "dom"
    ],
    "tabs": [
        "toolbar",
        "button",
        "component/extension/content-box"
    ],
    "toolbar": [
        "component/container",
        "component/extension/delegate-children"
    ],
    "tree": [
        "component/container",
        "component/extension/content-box",
        "component/extension/delegate-children"
    ],
    "url": [
        "modulex-querystring",
        "modulex-path"
    ]
});
modulex.config('alias', {
    'modulex-attribute': 'attribute'
});
modulex.config('alias', {
    'modulex-dom': 'dom',
    'dom/selector': Feature.isQuerySelectorSupported() ? '' : 'query-selector',
    dom: [
        'dom/base',
            UA.ieMode < 9 ? 'dom/ie' : ''
    ]
});
modulex.config('alias', {
    'modulex-event-base': 'event-base'
});
modulex.config('alias', {
    'modulex-event-custom': 'event-custom'
});
modulex.config('alias', {
    'modulex-feature': 'feature'
});
modulex.config('alias', {
    'anim': Feature.getCssVendorInfo('transition') ? 'anim/transition' : 'anim/timer'
});
modulex.config('alias', {
    'modulex-attribute': 'attribute'
});
modulex.config('alias', {
    'modulex-base': 'base'
});
modulex.config('alias', {
    'modulex-color': 'color'
});
modulex.config('alias', {
    'modulex-dom': 'dom',
    'dom/selector': Feature.isQuerySelectorSupported() ? '' : 'query-selector',
    dom: [
        'dom/base',
            UA.ieMode < 9 ? 'dom/ie' : ''
    ]
});
modulex.config('alias', {
    'modulex-event-base': 'event-base'
});
modulex.config('alias', {
    'modulex-event-custom': 'event-custom'
});
modulex.config('alias', {
    'event-dom': [
        'event-dom/base',
        Feature.isHashChangeSupported() ? '' : 'event-dom/hashchange',
            UA.ieMode < 9 ? 'event-dom/ie' : '',
        Feature.isInputEventSupported() ? '' : 'event-dom/input',
        UA.ie ? '' : 'event-dom/focusin'
    ]
});
modulex.config('alias', {
    'modulex-feature': 'feature'
});
modulex.config('alias', {
    'modulex-path': 'path'
});
modulex.config('alias', {
    'modulex-promise': 'event-custom'
});
modulex.config('alias', {
    'modulex-querystring': 'querystring'
});
modulex.config('alias', {'scroll-view': Feature.isTouchGestureSupported() ? 'scroll-view/touch' : 'scroll-view/base'});
modulex.config('alias', {
    'modulex-ua': 'ua'
});
modulex.config('alias', {
    'modulex-url': 'url'
});
modulex.config('alias', {
    'modulex-util': 'util'
});
modulex.config('alias', {
    'modulex-path': 'path'
});
modulex.config('alias', {
    'modulex-promise': 'event-custom'
});
modulex.config('alias', {
    'modulex-querystring': 'querystring'
});
modulex.config('alias', {
    'modulex-ua': 'ua'
});
modulex.config('alias', {
    'modulex-util': 'util'
});
});