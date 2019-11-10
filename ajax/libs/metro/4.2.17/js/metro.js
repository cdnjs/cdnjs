/*
 * Metro 4 Components Library v4.2.17 build 694 (https://metroui.org.ua)
 * Copyright 2018 Sergey Pimenov
 * Licensed under MIT
 */

(function( factory ) {
    if ( typeof define === 'function' && define.amd ) {
        define([ 'jquery' ], factory );
    } else {
        factory( jQuery );
    }
}(function( jQuery ) { 
'use strict';

var $ = jQuery;


// Source: js/metro.js
if (typeof jQuery === 'undefined') {
    throw new Error('Metro 4 requires jQuery!');
}

if ('MutationObserver' in window === false) {
    throw new Error('Metro 4 requires MutationObserver!');
}

var meta_init = $("meta[name='metro4:init']").attr("content");
var meta_locale = $("meta[name='metro4:locale']").attr("content");
var meta_week_start = $("meta[name='metro4:week_start']").attr("content");
var meta_animation_duration = $("meta[name='metro4:animation_duration']").attr("content");
var meta_callback_timeout = $("meta[name='metro4:callback_timeout']").attr("content");
var meta_timeout = $("meta[name='metro4:timeout']").attr("content");

if (window.METRO_INIT === undefined) {
    window.METRO_INIT = meta_init !== undefined ? JSON.parse(meta_init) : true;
}
if (window.METRO_DEBUG === undefined) {window.METRO_DEBUG = true;}

if (window.METRO_WEEK_START === undefined) {
    window.METRO_WEEK_START = meta_week_start !== undefined ? parseInt(meta_week_start) : 1;
}
if (window.METRO_LOCALE === undefined) {
    window.METRO_LOCALE = meta_locale !== undefined ? meta_locale : 'en-US';
}
if (window.METRO_ANIMATION_DURATION === undefined) {
    window.METRO_ANIMATION_DURATION = meta_animation_duration !== undefined ? parseInt(meta_animation_duration) : 300;
}
if (window.METRO_CALLBACK_TIMEOUT === undefined) {
    window.METRO_CALLBACK_TIMEOUT = meta_callback_timeout !== undefined ? parseInt(meta_callback_timeout) : 500;
}
if (window.METRO_TIMEOUT === undefined) {
    window.METRO_TIMEOUT = meta_timeout !== undefined ? parseInt(meta_timeout) : 2000;
}
if (window.METRO_HOTKEYS_FILTER_CONTENT_EDITABLE === undefined) {window.METRO_HOTKEYS_FILTER_CONTENT_EDITABLE = true;}
if (window.METRO_HOTKEYS_FILTER_INPUT_ACCEPTING_ELEMENTS === undefined) {window.METRO_HOTKEYS_FILTER_INPUT_ACCEPTING_ELEMENTS = true;}
if (window.METRO_HOTKEYS_FILTER_TEXT_INPUTS === undefined) {window.METRO_HOTKEYS_FILTER_TEXT_INPUTS = true;}
if (window.METRO_HOTKEYS_BUBBLE_UP === undefined) {window.METRO_HOTKEYS_BUBBLE_UP = false;}
if (window.METRO_THROWS === undefined) {window.METRO_THROWS = true;}

window.METRO_MEDIA = [];

if ( typeof Object.create !== 'function' ) {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

if (typeof Object.values !== 'function') {
    Object.values = function(obj) {
        return Object.keys(obj).map(function(e) {
            return obj[e]
        });
    }
}

var isTouch = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

var Metro = {

    version: "4.2.17",
    versionFull: "4.2.17.694 ",
    isTouchable: isTouch,
    fullScreenEnabled: document.fullscreenEnabled,
    sheet: null,

    controlsPosition: {
        INSIDE: "inside",
        OUTSIDE: "outside"
    },

    groupMode: {
        ONE: "one",
        MULTI: "multi"
    },

    aspectRatio: {
        HD: "hd",
        SD: "sd",
        CINEMA: "cinema"
    },

    fullScreenMode: {
        WINDOW: "window",
        DESKTOP: "desktop"
    },

    position: {
        TOP: "top",
        BOTTOM: "bottom",
        LEFT: "left",
        RIGHT: "right",
        TOP_RIGHT: "top-right",
        TOP_LEFT: "top-left",
        BOTTOM_LEFT: "bottom-left",
        BOTTOM_RIGHT: "bottom-right",
        LEFT_BOTTOM: "left-bottom",
        LEFT_TOP: "left-top",
        RIGHT_TOP: "right-top",
        RIGHT_BOTTOM: "right-bottom"
    },

    popoverEvents: {
        CLICK: "click",
        HOVER: "hover",
        FOCUS: "focus"
    },

    stepperView: {
        SQUARE: "square",
        CYCLE: "cycle",
        DIAMOND: "diamond"
    },

    listView: {
        LIST: "list",
        CONTENT: "content",
        ICONS: "icons",
        ICONS_MEDIUM: "icons-medium",
        ICONS_LARGE: "icons-large",
        TILES: "tiles",
        TABLE: "table"
    },

    events: {
        click: 'click.metro',
        start: 'touchstart.metro mousedown.metro',
        stop: 'touchend.metro mouseup.metro',
        move: 'touchmove.metro mousemove.metro',
        enter: 'touchstart.metro mouseenter.metro',
        leave: 'touchend.metro mouseleave.metro',
        focus: 'focus.metro',
        blur: 'blur.metro',
        resize: 'resize.metro',
        keyup: 'keyup.metro',
        keydown: 'keydown.metro',
        dblclick: 'dblclick.metro',
        input: 'input.metro',
        change: 'change.metro',
        cut: 'cut.metro',
        paste: 'paste.metro',
        drop: 'drop.metro',
        scroll: 'scroll.metro',
        scrollStart: 'scrollstart.metro',
        scrollStop: 'scrollstop.metro',
        mousewheel: 'mousewheel.metro',
        inputchange: "change.metro input.metro propertychange.metro cut.metro paste.metro copy.metro"
    },

    media_queries: {
        FS: "(min-width: 0px)",
        SM: "(min-width: 576px)",
        MD: "(min-width: 768px)",
        LG: "(min-width: 992px)",
        XL: "(min-width: 1200px)",
        XXL: "(min-width: 1452px)"
    },

    media_sizes: {
        FS: 0,
        SM: 576,
        MD: 768,
        LG: 992,
        XL: 1200,
        XXL: 1452
    },

    media_mode: {
        FS: "fs",
        SM: "sm",
        MD: "md",
        LG: "lg",
        XL: "xl",
        XXL: "xxl"
    },

    actions: {
        REMOVE: 1,
        HIDE: 2
    },

    hotkeys: [],

    about: function(f){
        console.log("Metro 4 Components Library - v" + (f === true ? this.versionFull : this.version));
    },

    aboutDlg: function(f){
        alert("Metro 4 Components Library - v" + (f === true ? this.versionFull : this.version));
    },

    ver: function(f){
        return (f === true ? this.versionFull : this.version);
    },

    observe: function(){
        var observer, observerCallback;
        var observerConfig = {
            childList: true,
            attributes: true,
            subtree: true
        };
        observerCallback = function(mutations){
            mutations.map(function(mutation){

                if (mutation.type === 'attributes' && mutation.attributeName !== "data-role") {
                    var element = $(mutation.target);
                    var mc = element.data('metroComponent');
                    if (mc !== undefined) {
                        $.each(mc, function(){
                            var plug = element.data(this);
                            if (plug) plug.changeAttribute(mutation.attributeName);
                        });
                    }
                } else

                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    var i, obj, widgets = {}, plugins = {};
                    var nodes = mutation.addedNodes;

                    for(i = 0; i < nodes.length; i++) {

                        var node = mutation.addedNodes[i];

                        if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') {
                            return;
                        }
                        obj = $(mutation.addedNodes[i]);

                        plugins = obj.find("[data-role]");
                        if (obj.data('role') !== undefined) {
                            widgets = $.merge(plugins, obj);
                        } else {
                            widgets = plugins;
                        }
                        if (widgets.length) {
                            Metro.initWidgets(widgets);
                        }
                    }

                } else  {
                    //console.log(mutation);
                }
            });
        };
        observer = new MutationObserver(observerCallback);
        observer.observe($("html")[0], observerConfig);
    },

    init: function(){
        var widgets = $("[data-role]");
        var hotkeys = $("[data-hotkey]");
        var html = $("html");

        if (isTouch === true) {
            html.addClass("metro-touch-device");
        } else {
            html.addClass("metro-no-touch-device");
        }

        this.sheet = Utils.newCssSheet();

        this.observe();

        this.initHotkeys(hotkeys);
        this.initWidgets(widgets);

        window.METRO_MEDIA = [];
        $.each(Metro.media_queries, function(key, query){
            if (Utils.media(query)) {
                METRO_MEDIA.push(Metro.media_mode[key]);
            }
        });

        this.about(true);

        return this;
    },

    initHotkeys: function(hotkeys){
        $.each(hotkeys, function(){
            var element = $(this);
            var hotkey = element.data('hotkey') ? element.data('hotkey').toLowerCase() : false;

            if (hotkey === false) {
                return;
            }

            if (element.data('hotKeyBonded') === true ) {
                return;
            }

            Metro.hotkeys.push(hotkey);

            $(document).on(Metro.events.keyup, null, hotkey, function(e){
                if (element === undefined) return;

                if (element[0].tagName === 'A' &&
                    element.attr('href') !== undefined &&
                    element.attr('href').trim() !== '' &&
                    element.attr('href').trim() !== '#') {
                    document.location.href = element.attr('href');
                } else {
                    element.click();
                }
                return METRO_HOTKEYS_BUBBLE_UP;
            });

            element.data('hotKeyBonded', true);
        });
    },

    initWidgets: function(widgets) {
        var that = this;

        $.each(widgets, function () {
            var $this = $(this), w = this;
            var roles = $this.data('role').split(/\s*,\s*/);
            roles.map(function (func) {
                if ($.fn[func] !== undefined && $this.attr("data-role-"+func) === undefined) {
                    $.fn[func].call($this);
                    $this.attr("data-role-"+func, true);

                    var mc = $this.data('metroComponent');

                    if (mc === undefined) {
                        mc = [func];
                    } else {
                        mc.push(func);
                    }
                    $this.data('metroComponent', mc);
                }
            });
        });
    },

    plugin: function(name, object){
        $.fn[name] = function( options ) {
            return this.each(function() {
                $.data( this, name, Object.create(object).init(options, this ));
            });
        };
    },

    destroyPlugin: function(element, name){
        var p, mc;
        element = Utils.isJQueryObject(element) ? element[0] : element;
        p = $(element).data(name);

        if (!Utils.isValue(p)) {
            throw new Error("Component can not be destroyed: the element is not a Ьуекщ 4 component.");
        }

        if (!Utils.isFunc(p['destroy'])) {
            throw new Error("Component can not be destroyed: method destroy not found.");
        }

        p['destroy']();
        mc = $(element).data("metroComponent");
        Utils.arrayDelete(mc, name);
        $(element).data("metroComponent", mc);
        $.removeData(element, name);
        $(element).removeAttr("data-role-"+name);
    },

    destroyPluginAll: function(element){
        element = Utils.isJQueryObject(element) ? element[0] : element;
        var mc = $(element).data("metroComponent");

        if (mc !== undefined && mc.length > 0) $.each(mc, function(){
            Metro.destroyPlugin(element, this);
        });
    },

    initPlugin: function(element, name){
        element = $(element);
        try {
            if ($.fn[name] !== undefined && element.attr("data-role-"+name) === undefined) {
                $.fn[name].call(element);
                element.attr("data-role-"+name, true);

                var mc = element.data('metroComponent');

                if (mc === undefined) {
                    mc = [name];
                } else {
                    mc.push(name);
                }
                element.data('metroComponent', mc);
            }
        } catch (e) {
            console.log(e.message, e.stack);
        }
    },

    reinitPlugin: function(element, name){
        this.destroyPlugin(element, name);
        this.initPlugin(element, name);
    },

    reinitPluginAll: function(element){
        var mc = $(element).data("metroComponent");

        if (mc !== undefined && mc.length > 0) $.each(mc, function(){
            Metro.reinitPlugin(element, this);
        });
    },

    noop: function(){},
    noop_true: function(){return true;},
    noop_false: function(){return false;},

    stop: function(e){
        e.stopPropagation();
        e.preventDefault();
    },

    requestFullScreen: function(element){
        if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else {
            element.requestFullscreen();
        }
    },

    exitFullScreen: function(){
        if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else {
            document.exitFullscreen();
        }
    },

    inFullScreen: function(){
        var fsm = (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
        return fsm !== undefined;
    }
};

window['Metro'] = Metro;

$(window).on(Metro.events.resize, function(){
    window.METRO_MEDIA = [];
    $.each(Metro.media_queries, function(key, query){
        if (Utils.media(query)) {
            METRO_MEDIA.push(Metro.media_mode[key]);
        }
    });
});



// Source: js/utils/animation.js
var Animation = {

    duration: METRO_ANIMATION_DURATION,
    func: "swing",

    switch: function(current, next){
        current.hide();
        next.css({top: 0, left: 0}).show();
    },

    slideUp: function(current, next, duration, func){
        var h = current.parent().outerHeight(true);
        if (duration === undefined) {duration = this.duration;}
        if (func === undefined) {func = this.func;}
        current.css("z-index", 1).animate({
            top: -h
        }, duration, func);

        next.css({
            top: h,
            left: 0,
            zIndex: 2
        }).animate({
            top: 0
        }, duration, func);
    },

    slideDown: function(current, next, duration, func){
        var h = current.parent().outerHeight(true);
        if (duration === undefined) {duration = this.duration;}
        if (func === undefined) {func = this.func;}
        current.css("z-index", 1).animate({
            top: h
        }, duration, func);

        next.css({
            left: 0,
            top: -h,
            zIndex: 2
        }).animate({
            top: 0
        }, duration, func);
    },

    slideLeft: function(current, next, duration, func){
        var w = current.parent().outerWidth(true);
        if (duration === undefined) {duration = this.duration;}
        if (func === undefined) {func = this.func;}
        current.css("z-index", 1).animate({
            left: -w
        }, duration, func);

        next.css({
            left: w,
            zIndex: 2
        }).animate({
            left: 0
        }, duration, func);
    },

    slideRight: function(current, next, duration, func){
        var w = current.parent().outerWidth(true);
        if (duration === undefined) {duration = this.duration;}
        if (func === undefined) {func = this.func;}
        current.css("z-index", 1).animate({
            left: w
        }, duration, func);

        next.css({
            left: -w,
            zIndex: 2
        }).animate({
            left: 0
        }, duration, func);
    },

    fade: function(current, next, duration){
        if (duration === undefined) {duration = this.duration;}
        current.animate({
            opacity: 0
        }, duration);
        next.css({
            top: 0,
            left: 0
        }).animate({
            opacity: 1
        }, duration);
    }

};

Metro['animation'] = Animation;

// Source: js/utils/colors.js
function RGB(r, g, b){
    this.r = r || 0;
    this.g = g || 0;
    this.g = b || 0;
}

function RGBA(r, g, b, a){
    this.r = r || 0;
    this.g = g || 0;
    this.g = b || 0;
    this.a = a || 1;
}

function HSV(h, s, v){
    this.h = h || 0;
    this.s = s || 0;
    this.v = v || 0;
}

function HSL(h, s, l){
    this.h = h || 0;
    this.s = s || 0;
    this.l = l || 0;
}

function HSLA(h, s, l, a){
    this.h = h || 0;
    this.s = s || 0;
    this.l = l || 0;
    this.a = a || 1;
}

function CMYK(c, m, y, k){
    this.c = c || 0;
    this.m = m || 0;
    this.y = y || 0;
    this.k = k || 0;
}

var Colors = {

    TYPES: {
        HEX: "hex",
        RGB: "rgb",
        RGBA: "rgba",
        HSV: "hsv",
        HSL: "hsl",
        CMYK: "cmyk",
        UNKNOWN: "unknown"
    },

    PALETTES: {
        ALL: "colorList",
        METRO: "colorListMetro",
        STANDARD: "colorListStandard"
    },

    colorListMetro: {
        lime: '#a4c400',
        green: '#60a917',
        emerald: '#008a00',
        blue: '#00AFF0',
        teal: '#00aba9',
        cyan: '#1ba1e2',
        cobalt: '#0050ef',
        indigo: '#6a00ff',
        violet: '#aa00ff',
        pink: '#dc4fad',
        magenta: '#d80073',
        crimson: '#a20025',
        red: '#CE352C',
        orange: '#fa6800',
        amber: '#f0a30a',
        yellow: '#fff000',
        brown: '#825a2c',
        olive: '#6d8764',
        steel: '#647687',
        mauve: '#76608a',
        taupe: '#87794e'
    },

    colorListStandard: {
        aliceBlue: "#f0f8ff",
        antiqueWhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedAlmond: "#ffebcd",
        blue: "#0000ff",
        blueViolet: "#8a2be2",
        brown: "#a52a2a",
        burlyWood: "#deb887",
        cadetBlue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerBlue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkBlue: "#00008b",
        darkCyan: "#008b8b",
        darkGoldenRod: "#b8860b",
        darkGray: "#a9a9a9",
        darkGreen: "#006400",
        darkKhaki: "#bdb76b",
        darkMagenta: "#8b008b",
        darkOliveGreen: "#556b2f",
        darkOrange: "#ff8c00",
        darkOrchid: "#9932cc",
        darkRed: "#8b0000",
        darkSalmon: "#e9967a",
        darkSeaGreen: "#8fbc8f",
        darkSlateBlue: "#483d8b",
        darkSlateGray: "#2f4f4f",
        darkTurquoise: "#00ced1",
        darkViolet: "#9400d3",
        deepPink: "#ff1493",
        deepSkyBlue: "#00bfff",
        dimGray: "#696969",
        dodgerBlue: "#1e90ff",
        fireBrick: "#b22222",
        floralWhite: "#fffaf0",
        forestGreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#DCDCDC",
        ghostWhite: "#F8F8FF",
        gold: "#ffd700",
        goldenRod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenYellow: "#adff2f",
        honeyDew: "#f0fff0",
        hotPink: "#ff69b4",
        indianRed: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderBlush: "#fff0f5",
        lawnGreen: "#7cfc00",
        lemonChiffon: "#fffacd",
        lightBlue: "#add8e6",
        lightCoral: "#f08080",
        lightCyan: "#e0ffff",
        lightGoldenRodYellow: "#fafad2",
        lightGray: "#d3d3d3",
        lightGreen: "#90ee90",
        lightPink: "#ffb6c1",
        lightSalmon: "#ffa07a",
        lightSeaGreen: "#20b2aa",
        lightSkyBlue: "#87cefa",
        lightSlateGray: "#778899",
        lightSteelBlue: "#b0c4de",
        lightYellow: "#ffffe0",
        lime: "#00ff00",
        limeGreen: "#32dc32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumAquaMarine: "#66cdaa",
        mediumBlue: "#0000cd",
        mediumOrchid: "#ba55d3",
        mediumPurple: "#9370db",
        mediumSeaGreen: "#3cb371",
        mediumSlateBlue: "#7b68ee",
        mediumSpringGreen: "#00fa9a",
        mediumTurquoise: "#48d1cc",
        mediumVioletRed: "#c71585",
        midnightBlue: "#191970",
        mintCream: "#f5fffa",
        mistyRose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajoWhite: "#ffdead",
        navy: "#000080",
        oldLace: "#fdd5e6",
        olive: "#808000",
        oliveDrab: "#6b8e23",
        orange: "#ffa500",
        orangeRed: "#ff4500",
        orchid: "#da70d6",
        paleGoldenRod: "#eee8aa",
        paleGreen: "#98fb98",
        paleTurquoise: "#afeeee",
        paleVioletRed: "#db7093",
        papayaWhip: "#ffefd5",
        peachPuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderBlue: "#b0e0e6",
        purple: "#800080",
        rebeccaPurple: "#663399",
        red: "#ff0000",
        rosyBrown: "#bc8f8f",
        royalBlue: "#4169e1",
        saddleBrown: "#8b4513",
        salmon: "#fa8072",
        sandyBrown: "#f4a460",
        seaGreen: "#2e8b57",
        seaShell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        slyBlue: "#87ceeb",
        slateBlue: "#6a5acd",
        slateGray: "#708090",
        snow: "#fffafa",
        springGreen: "#00ff7f",
        steelBlue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whiteSmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowGreen: "#9acd32"
    },

    colorList: {},

    options: {
        angle: 30,
        algorithm: 1,
        step: .1,
        distance: 5,
        tint1: .8,
        tint2: .4,
        shade1: .6,
        shade2: .3,
        alpha: 1
    },

    init: function(){
        this.colorList = $.extend( {}, this.colorListStandard, this.colorListMetro );
        return this;
    },

    setup: function(options){
        this.options = $.extend( {}, this.options, options );
    },

    color: function(name, palette){
        palette = palette || this.PALETTES.ALL;
        return this[palette][name] !== undefined ? this[palette][name] : false;
    },

    palette: function(palette){
        palette = palette || this.PALETTES.ALL;
        return Object.keys(this[palette]);
    },

    hex2rgb: function(hex){
        var regex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace( regex, function( m, r, g, b ) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
        return result ? {
            r: parseInt( result[1], 16 ),
            g: parseInt( result[2], 16 ),
            b: parseInt( result[3], 16 )
        } : null;
    },

    rgb2hex: function(rgb){
        return "#" +
            (( 1 << 24 ) + ( rgb.r << 16 ) + ( rgb.g << 8 ) + rgb.b )
                .toString( 16 ).slice( 1 );
    },

    rgb2hsv: function(rgb){
        var hsv = new HSV();
        var h, s, v;
        var r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var delta = max - min;

        v = max;

        if (max === 0) {
            s = 0;
        } else {
            s = 1 - min / max;
        }

        if (max === min) {
            h = 0;
        } else if (max === r && g >= b) {
            h = 60 * ( (g - b) / delta );
        } else if (max === r && g < b) {
            h = 60 * ( (g - b) / delta) + 360
        } else if (max === g) {
            h = 60 * ( (b - r) / delta) + 120
        } else if (max === b) {
            h = 60 * ( (r - g) / delta) + 240
        } else {
            h = 0;
        }

        hsv.h = h;
        hsv.s = s;
        hsv.v = v;

        return hsv;
    },

    hsv2rgb: function(hsv){
        var r, g, b;
        var h = hsv.h, s = hsv.s * 100, v = hsv.v * 100;
        var Hi = Math.floor(h / 60);
        var Vmin = (100 - s) * v / 100;
        var alpha = (v - Vmin) * ( (h % 60) / 60 );
        var Vinc = Vmin + alpha;
        var Vdec = v - alpha;

        switch (Hi) {
            case 0: r = v; g = Vinc; b = Vmin; break;
            case 1: r = Vdec; g = v; b = Vmin; break;
            case 2: r = Vmin; g = v; b = Vinc; break;
            case 3: r = Vmin; g = Vdec; b = v; break;
            case 4: r = Vinc; g = Vmin; b = v; break;
            case 5: r = v; g = Vmin; b = Vdec; break;
        }

        return {
            r: Math.round(r * 255 / 100),
            g: Math.round(g * 255 / 100),
            b: Math.round(b * 255 / 100)
        }
    },

    hsv2hex: function(hsv){
        return this.rgb2hex(this.hsv2rgb(hsv));
    },

    hex2hsv: function(hex){
        return this.rgb2hsv(this.hex2rgb(hex));
    },

    rgb2cmyk: function(rgb){
        var cmyk = new CMYK();

        var r = rgb.r / 255;
        var g = rgb.g / 255;
        var b = rgb.b / 255;

        cmyk.k = Math.min( 1 - r, 1 - g, 1 - b );
        cmyk.c = ( 1 - r - cmyk.k ) / ( 1 - cmyk.k );
        cmyk.m = ( 1 - g - cmyk.k ) / ( 1 - cmyk.k );
        cmyk.y = ( 1 - b - cmyk.k ) / ( 1 - cmyk.k );

        cmyk.c = Math.round( cmyk.c * 100 );
        cmyk.m = Math.round( cmyk.m * 100 );
        cmyk.y = Math.round( cmyk.y * 100 );
        cmyk.k = Math.round( cmyk.k * 100 );

        return cmyk;
    },

    cmyk2rgb: function(cmyk){
        var rgb = new RGB();

        var c = cmyk.c / 100;
        var m = cmyk.m / 100;
        var y = cmyk.y / 100;
        var k = cmyk.k / 100;

        rgb.r = 1 - Math.min( 1, c * ( 1 - k ) + k );
        rgb.g = 1 - Math.min( 1, m * ( 1 - k ) + k );
        rgb.b = 1 - Math.min( 1, y * ( 1 - k ) + k );

        rgb.r = Math.round( rgb.r * 255 );
        rgb.g = Math.round( rgb.g * 255 );
        rgb.b = Math.round( rgb.b * 255 );

        return rgb;
    },

    hsv2hsl: function(hsv){
        var h, s, l;
        h = hsv.h;
        l = (2 - hsv.s) * hsv.v;
        s = hsv.s * hsv.v;
        s /= (l <= 1) ? l : 2 - l;
        l /= 2;
        return {h: h, s: s, l: l}
    },

    hsl2hsv: function(hsl){
        var h, s, v, l;
        h = hsl.h;
        l = hsl.l * 2;
        s = hsl.s * (l <= 1 ? l : 2 - l);
        v = (l + s) / 2;
        s = (2 * s) / (l + s);
        return {h: h, s: s, l: v}
    },

    rgb2websafe: function(rgb){
        return {
            r: Math.round(rgb.r / 51) * 51,
            g: Math.round(rgb.g / 51) * 51,
            b: Math.round(rgb.b / 51) * 51
        }
    },

    rgba2websafe: function(rgba){
        return {
            r: Math.round(rgba.r / 51) * 51,
            g: Math.round(rgba.g / 51) * 51,
            b: Math.round(rgba.b / 51) * 51,
            a: rgba.a
        }
    },

    hex2websafe: function(hex){
        return this.rgb2hex(this.rgb2websafe(this.toRGB(hex)));
    },

    hsv2websafe: function(hsv){
        return this.rgb2hsv(this.rgb2websafe(this.toRGB(hsv)));
    },

    hsl2websafe: function(hsl){
        return this.hsv2hsl(this.rgb2hsv(this.rgb2websafe(this.toRGB(hsl))));
    },

    cmyk2websafe: function(cmyk){
        return this.rgb2cmyk(this.rgb2websafe(this.cmyk2rgb(cmyk)));
    },

    websafe: function(color){
        if (this.isHEX(color)) return this.hex2websafe(color);
        if (this.isRGB(color)) return this.rgb2websafe(color);
        if (this.isRGBA(color)) return this.rgba2websafe(color);
        if (this.isHSV(color)) return this.hsv2websafe(color);
        if (this.isHSL(color)) return this.hsl2websafe(color);
        if (this.isCMYK(color)) return this.cmyk2websafe(color);

        return color;
    },

    is: function(color){
        if (this.isHEX(color)) return this.TYPES.HEX;
        if (this.isRGB(color)) return this.TYPES.RGB;
        if (this.isRGBA(color)) return this.TYPES.RGBA;
        if (this.isHSV(color)) return this.TYPES.HSV;
        if (this.isHSL(color)) return this.TYPES.HSL;
        if (this.isCMYK(color)) return this.TYPES.CMYK;

        return this.TYPES.UNKNOWN;
    },

    toRGB: function(color){
        if (this.isHSV(color)) return this.hsv2rgb(color);
        if (this.isHSL(color)) return this.hsv2rgb(this.hsl2hsv(color));
        if (this.isRGB(color)) return color;
        if (this.isHEX(color)) return this.hex2rgb(color);
        if (this.isCMYK(color)) return this.cmyk2rgb(color);

        throw new Error("Unknown color format!");
    },

    toRGBA: function(color, alpha){
        var result = this.toRGB(color);
        result.a = alpha || 1;
        return result;
    },

    toHSV: function(color){
        return this.rgb2hsv(this.toRGB(color));
    },

    toHSL: function(color){
        return this.hsv2hsl(this.rgb2hsv(this.toRGB(color)));
    },

    toHSLA: function(color, alpha){
        var hsla;
        hsla = this.hsv2hsl(this.rgb2hsv(this.toRGB(color)));
        hsla.a = alpha || this.options.alpha;
        return hsla;
    },

    toHEX: function(color){
        return this.rgb2hex(this.toRGB(color));
    },

    toCMYK: function(color){
        return this.rgb2cmyk(this.toRGB(color));
    },

    toHexString: function(color){
        return this.toHEX(color);
    },

    toHsvString: function(color){
        var hsv = this.toHSV(color);
        return "hsv("+[hsv.h, hsv.s, hsv.v].join(",")+")";
    },

    toHslString: function(color){
        var hsl = this.toHSL(color);
        return "hsl("+[Math.round(hsl.h), Math.round(hsl.s * 100) + "%" , Math.round(hsl.l * 100) + "%"].join(",")+")";
    },

    toHslaString: function(color){
        var hsl = this.toHSLA(color);
        return "hsl("+[Math.round(hsl.h), Math.round(hsl.s * 100) + "%" , Math.round(hsl.l * 100) + "%", hsl.a].join(",")+")";
    },

    toCmykString: function(color){
        var cmyk = this.toCMYK(color);
        return "cmyk("+[cmyk.c, cmyk.m, cmyk.y, cmyk.k].join(",")+")";
    },

    toRgbString: function(color){
        var rgb = this.toRGB(color);
        return "rgb("+[rgb.r, rgb.g, rgb.b].join(",")+")";
    },

    toRgbaString: function(color){
        var rgb = this.toRGBA(color);
        return "rgba("+[rgb.r, rgb.g, rgb.b, rgb.a].join(",")+")";
    },

    toString: function(color){
        if (this.isHEX(color)) return this.toHexString(color);
        if (this.isRGB(color)) return this.toRgbString(color);
        if (this.isRGBA(color)) return this.toRgbaString(color);
        if (this.isHSV(color)) return this.toHsvString(color);
        if (this.isHSL(color)) return this.toHslString(color);
        if (this.isHSLA(color)) return this.toHslaString(color);
        if (this.isCMYK(color)) return this.toCmykString(color);

        throw new Error("Unknown color format!");
    },

    grayscale: function(color, output){
        output = output || "hex";
        var rgb = this.toRGB(color);
        var gray = Math.round(rgb.r * .2125 + rgb.g * .7154 + rgb.b * .0721);
        var mono = {
            r: gray,
            g: gray,
            b: gray
        };
        return this["rgb2"+output](mono);
    },

    darken: function(color, amount){
        if (amount === undefined) {
            amount = 10;
        }
        return this.lighten(color, -1 * Math.abs(amount));
    },

    lighten: function(color, amount){
        var col, type, res, alpha = 1;

        if (amount === undefined) {
            amount = 10;
        }

        col = this.toHEX(color);
        col = col.slice(1);

        type = this.is(color);

        if (type === this.TYPES.RGBA) {
            alpha = color.a;
        }

        var num = parseInt(col, 16);
        var r = (num >> 16) + amount;

        if (r > 255) r = 255;
        else if  (r < 0) r = 0;

        var b = ((num >> 8) & 0x00FF) + amount;

        if (b > 255) b = 255;
        else if  (b < 0) b = 0;

        var g = (num & 0x0000FF) + amount;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        res = "#" + (g | (b << 8) | (r << 16)).toString(16);

        switch (type) {
            case "rgb": return this.toRGB(res);
            case "rgba": return this.toRGBA(res, alpha);
            case "hsv": return this.toHSV(res);
            case "hsl": return this.toHSL(res);
            case "cmyk": return this.toCMYK(res);
            default: return res;
        }
    },

    isDark: function(color){
        var rgb = this.toRGB(color);
        var YIQ = (
            ( rgb.r * 299 ) +
            ( rgb.g * 587 ) +
            ( rgb.b * 114 )
        ) / 1000;
        return ( YIQ < 128 )
    },

    isLight: function(hex){
        return !this.isDark(hex);
    },

    isHSV: function(val){
        return Utils.isObject(val) && "h" in val && "s" in val && "v" in val;
    },

    isHSL: function(val){
        return Utils.isObject(val) && "h" in val && "s" in val && "l" in val;
    },

    isHSLA: function(val){
        return Utils.isObject(val) && "h" in val && "s" in val && "l" in val && "a" in val;
    },

    isRGB: function(val){
        return Utils.isObject(val) && "r" in val && "g" in val && "b" in val;
    },

    isRGBA: function(val){
        return Utils.isObject(val) && "r" in val && "g" in val && "b" in val && "a" in val;
    },

    isCMYK: function(val){
        return Utils.isObject(val) && "c" in val && "m" in val && "y" in val && "k" in val;
    },

    isHEX: function(val){
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(val);
    },

    isColor: function(color){
        return this.isHEX(color) || this.isRGB(color) || this.isRGBA(color) || this.isHSV(color) || this.isHSL(color) || this.isCMYK(color);
    },

    hueShift: function(h, s){
        h+=s;
        while (h >= 360.0) h -= 360.0;
        while (h < 0.0) h += 360.0;
        return h;
    },

    getScheme: function(color, name, format, options){
        this.options = $.extend( {}, this.options, options );

        var i;
        var scheme = [];
        var hsv;
        var that = this;

        hsv = this.toHSV(color);

        if (this.isHSV(hsv) === false) {
            console.log("The value is a not supported color format!");
            return false;
        }

        function convert(source, format) {
            var result = [];
            var o = that.options;
            switch (format) {
                case "hex": result = source.map(function(v){return Colors.toHEX(v);}); break;
                case "rgb": result = source.map(function(v){return Colors.toRGB(v);}); break;
                case "rgba": result = source.map(function(v){return Colors.toRGBA(v, o.alpha);}); break;
                case "hsl": result = source.map(function(v){return Colors.toHSL(v);}); break;
                case "cmyk": result = source.map(function(v){return Colors.toCMYK(v);}); break;
                default: result = source;
            }

            return result;
        }

        function clamp( num, min, max ){
            return Math.max( min, Math.min( num, max ));
        }

        function toRange(a, b, c){
            return a < b ? b : ( a > c ? c : a);
        }

        var rgb, h = hsv.h, s = hsv.s, v = hsv.v;
        var o = this.options;

        switch (name) {
            case "monochromatic":
            case "mono":
                if (o.algorithm === 1) {

                    rgb = this.hsv2rgb(hsv);
                    rgb.r = toRange(Math.round(rgb.r + (255 - rgb.r) * o.tint1), 0, 255);
                    rgb.g = toRange(Math.round(rgb.g + (255 - rgb.g) * o.tint1), 0, 255);
                    rgb.b = toRange(Math.round(rgb.b + (255 - rgb.b) * o.tint1), 0, 255);
                    scheme.push(this.rgb2hsv(rgb));

                    rgb = this.hsv2rgb(hsv);
                    rgb.r = toRange(Math.round(rgb.r + (255 - rgb.r) * o.tint2), 0, 255);
                    rgb.g = toRange(Math.round(rgb.g + (255 - rgb.g) * o.tint2), 0, 255);
                    rgb.b = toRange(Math.round(rgb.b + (255 - rgb.b) * o.tint2), 0, 255);
                    scheme.push(this.rgb2hsv(rgb));

                    scheme.push(hsv);

                    rgb = this.hsv2rgb(hsv);
                    rgb.r = toRange(Math.round(rgb.r * o.shade1), 0, 255);
                    rgb.g = toRange(Math.round(rgb.g * o.shade1), 0, 255);
                    rgb.b = toRange(Math.round(rgb.b * o.shade1), 0, 255);
                    scheme.push(this.rgb2hsv(rgb));

                    rgb = this.hsv2rgb(hsv);
                    rgb.r = toRange(Math.round(rgb.r * o.shade2), 0, 255);
                    rgb.g = toRange(Math.round(rgb.g * o.shade2), 0, 255);
                    rgb.b = toRange(Math.round(rgb.b * o.shade2), 0, 255);
                    scheme.push(this.rgb2hsv(rgb));
                } else if (o.algorithm === 2) {
                    scheme.push(hsv);
                    for(i = 1; i <= o.distance; i++) {
                        v = clamp(v - o.step, 0, 1);
                        s = clamp(s - o.step, 0, 1);
                        scheme.push({h: h, s: s, v: v});
                    }
                } else if (o.algorithm === 3) {
                    scheme.push(hsv);
                    for(i = 1; i <= o.distance; i++) {
                        v = clamp(v - o.step, 0, 1);
                        scheme.push({h: h, s: s, v: v});
                    }
                } else {
                    v = clamp(hsv.v + o.step * 2, 0, 1);
                    scheme.push({h: h, s: s, v: v});

                    v = clamp(hsv.v + o.step, 0, 1);
                    scheme.push({h: h, s: s, v: v});

                    scheme.push(hsv); s = hsv.s; v = hsv.v;

                    v = clamp(hsv.v - o.step, 0, 1);
                    scheme.push({h: h, s: s, v: v});

                    v = clamp(hsv.v - o.step * 2, 0, 1);
                    scheme.push({h: h, s: s, v: v});
                }
                break;

            case 'complementary':
            case 'complement':
            case 'comp':
                scheme.push(hsv);

                h = this.hueShift(hsv.h, 180.0);
                scheme.push({h: h, s: s, v: v});
                break;

            case 'double-complementary':
            case 'double-complement':
            case 'double':
                scheme.push(hsv);

                console.log(h);

                h = this.hueShift(h, 180.0);
                scheme.push({h: h, s: s, v: v});

                console.log(h);

                h = this.hueShift(h, o.angle);
                scheme.push({h: h, s: s, v: v});

                console.log(h);

                h = this.hueShift(h, 180.0);
                scheme.push({h: h, s: s, v: v});

                console.log(h);

                break;

            case 'analogous':
            case 'analog':

                h = this.hueShift(h, o.angle);
                scheme.push({h: h, s: s, v: v});

                scheme.push(hsv);

                h = this.hueShift(hsv.h, 0.0 - o.angle);
                scheme.push({h: h, s: s, v: v});

                break;

            case 'triadic':
            case 'triad':
                scheme.push(hsv);
                for ( i = 1; i < 3; i++ ) {
                    h = this.hueShift(h, 120.0);
                    scheme.push({h: h, s: s, v: v});
                }
                break;

            case 'tetradic':
            case 'tetra':
                scheme.push(hsv);

                h = this.hueShift(hsv.h, 180.0);
                scheme.push({h: h, s: s, v: v});

                h = this.hueShift(hsv.h, -1 * o.angle);
                scheme.push({h: h, s: s, v: v});

                h = this.hueShift(h, 180.0);
                scheme.push({h: h, s: s, v: v});

                break;

            case 'square':
                scheme.push(hsv);
                for ( i = 1; i < 4; i++ ) {
                    h = this.hueShift(h, 90.0);
                    scheme.push({h: h, s: s, v: v});
                }
                break;

            case 'split-complementary':
            case 'split-complement':
            case 'split':
                h = this.hueShift(h, 180.0 - o.angle);
                scheme.push({h: h, s: s, v: v});

                scheme.push(hsv);

                h = this.hueShift(hsv.h, 180.0 + o.angle);
                scheme.push({h: h, s: s, v: v});
                break;

            default: console.log("Unknown scheme name");
        }

        return convert(scheme, format);
    }
};

Metro['colors'] = Colors.init();

// Source: js/utils/easing.js
$.easing['jswing'] = $.easing['swing'];

$.extend($.easing, {
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert($.easing.default);
        return $.easing[$.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - $.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d / 2) return $.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return $.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});


// Source: js/utils/export.js
var Export = {

    init: function(){
        return this;
    },

    options: {
        csvDelimiter: "\t",
        csvNewLine: "\r\n",
        includeHeader: true
    },

    setup: function(options){
        this.options = $.extend({}, this.options, options);
        return this;
    },

    base64: function(data){
        return window.btoa(unescape(encodeURIComponent(data)));
    },

    b64toBlob: function (b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = window.atob(b64Data);
        var byteArrays = [];

        var offset;
        for (offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            var i;
            for (i = 0; i < slice.length; i = i + 1) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new window.Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, {
            type: contentType
        });
    },

    tableToCSV: function(table, filename, options){
        var that = this, o = this.options;
        var body, head, data = "";
        var i, j, row, cell;

        o = $.extend({}, o, options);

        if (Utils.isJQueryObject(table)) {
            table = table[0];
        }

        if (Utils.bool(o.includeHeader)) {

            head = table.querySelectorAll("thead")[0];

            for(i = 0; i < head.rows.length; i++) {
                row = head.rows[i];
                for(j = 0; j < row.cells.length; j++){
                    cell = row.cells[j];
                    data += (j ? o.csvDelimiter : '') + cell.textContent.trim();
                }
                data += o.csvNewLine;
            }
        }

        body = table.querySelectorAll("tbody")[0];

        for(i = 0; i < body.rows.length; i++) {
            row = body.rows[i];
            for(j = 0; j < row.cells.length; j++){
                cell = row.cells[j];
                data += (j ? o.csvDelimiter : '') + cell.textContent.trim();
            }
            data += o.csvNewLine;
        }

        if (Utils.isValue(filename)) {
            return this.createDownload(this.base64("\uFEFF" + data), 'application/csv', filename);
        }

        return data;
    },

    createDownload: function (data, contentType, filename) {
        var blob, anchor, url;

        anchor = document.createElement('a');
        anchor.style.display = "none";
        document.body.appendChild(anchor);

        blob = this.b64toBlob(data, contentType);

        url = window.URL.createObjectURL(blob);
        anchor.href = url;
        anchor.download = filename || Utils.elementId("download");
        anchor.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(anchor);
        return true;
    }
};

Metro['export'] = Export.init();


// Source: js/utils/extensions.js
$.fn.extend({
    toggleAttr: function(a, v){
        return this.each(function(){
            var el = $(this);
            if (v !== undefined) {
                el.attr(a, v);
            } else {
                if (el.attr(a) !== undefined) {
                    el.removeAttr(a);
                } else {
                    el.attr(a, ""+a);
                }
            }
        });
    },
    clearClasses: function(){
        return this.each(function(){
            this.className = "";
        });
    }
});

Array.prototype.shuffle = function () {
    var currentIndex = this.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = this[currentIndex];
        this[currentIndex] = this[randomIndex];
        this[randomIndex] = temporaryValue;
    }

    return this;
};

Array.prototype.clone = function () {
    return this.slice(0);
};

Array.prototype.unique = function () {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

/**
 * Number.prototype.format(n, x, s, c)
 *
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.contains = function() {
    return !!~String.prototype.indexOf.apply(this, arguments);
};

String.prototype.toDate = function(format)
{
    var normalized      = this.replace(/[^a-zA-Z0-9]/g, '-');
    var normalizedFormat= format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    var formatItems     = normalizedFormat.split('-');
    var dateItems       = normalized.split('-');

    var monthIndex  = formatItems.indexOf("mm");
    var dayIndex    = formatItems.indexOf("dd");
    var yearIndex   = formatItems.indexOf("yyyy");
    var hourIndex     = formatItems.indexOf("hh");
    var minutesIndex  = formatItems.indexOf("ii");
    var secondsIndex  = formatItems.indexOf("ss");

    var today = new Date();

    var year  = yearIndex>-1  ? dateItems[yearIndex]    : today.getFullYear();
    var month = monthIndex>-1 ? dateItems[monthIndex]-1 : today.getMonth()-1;
    var day   = dayIndex>-1   ? dateItems[dayIndex]     : today.getDate();

    var hour    = hourIndex>-1      ? dateItems[hourIndex]    : today.getHours();
    var minute  = minutesIndex>-1   ? dateItems[minutesIndex] : today.getMinutes();
    var second  = secondsIndex>-1   ? dateItems[secondsIndex] : today.getSeconds();

    return new Date(year,month,day,hour,minute,second);
};

Date.prototype.format = function(format, locale){

    if (locale === undefined) {
        locale = "en-US";
    }

    var cal = (Metro.locales[locale] !== undefined ? Metro.locales[locale] : Metro.locales["en-US"])['calendar'];

    var date = this;
    var nDay = date.getDay(),
        nDate = date.getDate(),
        nMonth = date.getMonth(),
        nYear = date.getFullYear(),
        nHour = date.getHours(),
        aDays = cal['days'],
        aMonths = cal['months'],
        aDayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
        isLeapYear = function() {
            return (nYear%4===0 && nYear%100!==0) || nYear%400===0;
        },
        getThursday = function() {
            var target = new Date(date);
            target.setDate(nDate - ((nDay+6)%7) + 3);
            return target;
        },
        zeroPad = function(nNum, nPad) {
            return ('' + (Math.pow(10, nPad) + nNum)).slice(1);
        };
    return format.replace(/%[a-z]/gi, function(sMatch) {
        return {
            '%a': aDays[nDay].slice(0,3),
            '%A': aDays[nDay],
            '%b': aMonths[nMonth].slice(0,3),
            '%B': aMonths[nMonth],
            '%c': date.toUTCString(),
            '%C': Math.floor(nYear/100),
            '%d': zeroPad(nDate, 2),
            '%e': nDate,
            '%F': date.toISOString().slice(0,10),
            '%G': getThursday().getFullYear(),
            '%g': ('' + getThursday().getFullYear()).slice(2),
            '%H': zeroPad(nHour, 2),
            '%I': zeroPad((nHour+11)%12 + 1, 2),
            '%j': zeroPad(aDayCount[nMonth] + nDate + ((nMonth>1 && isLeapYear()) ? 1 : 0), 3),
            '%k': '' + nHour,
            '%l': (nHour+11)%12 + 1,
            '%m': zeroPad(nMonth + 1, 2),
            '%M': zeroPad(date.getMinutes(), 2),
            '%p': (nHour<12) ? 'AM' : 'PM',
            '%P': (nHour<12) ? 'am' : 'pm',
            '%s': Math.round(date.getTime()/1000),
            '%S': zeroPad(date.getSeconds(), 2),
            '%u': nDay || 7,
            '%V': (function() {
                var target = getThursday(),
                    n1stThu = target.valueOf();
                target.setMonth(0, 1);
                var nJan1 = target.getDay();
                if (nJan1!==4) target.setMonth(0, 1 + ((4-nJan1)+7)%7);
                return zeroPad(1 + Math.ceil((n1stThu-target)/604800000), 2);
            })(),
            '%w': '' + nDay,
            '%x': date.toLocaleDateString(),
            '%X': date.toLocaleTimeString(),
            '%y': ('' + nYear).slice(2),
            '%Y': nYear,
            '%z': date.toTimeString().replace(/.+GMT([+-]\d+).+/, '$1'),
            '%Z': date.toTimeString().replace(/.+\((.+?)\)$/, '$1')
        }[sMatch] || sMatch;
    });
};

Date.prototype.addHours = function(n) {
    this.setTime(this.getTime() + (n*60*60*1000));
    return this;
};

Date.prototype.addDays = function(n) {
    this.setDate(this.getDate() + (n));
    return this;
};

Date.prototype.addMonths = function(n) {
    this.setMonth(this.getMonth() + (n));
    return this;
};

Date.prototype.addYears = function(n) {
    this.setFullYear(this.getFullYear() + (n));
    return this;
};


// Source: js/utils/hotkeys.js
var hotkeys = {

    specialKeys: {
        8: "backspace",
        9: "tab",
        10: "return",
        13: "return",
        16: "shift",
        17: "ctrl",
        18: "alt",
        19: "pause",
        20: "capslock",
        27: "esc",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        45: "insert",
        46: "del",
        59: ";",
        61: "=",
        96: "0",
        97: "1",
        98: "2",
        99: "3",
        100: "4",
        101: "5",
        102: "6",
        103: "7",
        104: "8",
        105: "9",
        106: "*",
        107: "+",
        109: "-",
        110: ".",
        111: "/",
        112: "f1",
        113: "f2",
        114: "f3",
        115: "f4",
        116: "f5",
        117: "f6",
        118: "f7",
        119: "f8",
        120: "f9",
        121: "f10",
        122: "f11",
        123: "f12",
        144: "numlock",
        145: "scroll",
        173: "-",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'"
    },

    shiftNums: {
        "`": "~",
        "1": "!",
        "2": "@",
        "3": "#",
        "4": "$",
        "5": "%",
        "6": "^",
        "7": "&",
        "8": "*",
        "9": "(",
        "0": ")",
        "-": "_",
        "=": "+",
        ";": ": ",
        "'": "\"",
        ",": "<",
        ".": ">",
        "/": "?",
        "\\": "|"
    },

    // excludes: button, checkbox, file, hidden, image, password, radio, reset, search, submit, url
    textAcceptingInputTypes: [
        "text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime",
        "datetime-local", "search", "color", "tel"],

    // default input types not to bind to unless bound directly
    textInputTypes: /textarea|input|select/i,

    options: {
        filterInputAcceptingElements: METRO_HOTKEYS_FILTER_INPUT_ACCEPTING_ELEMENTS,
        filterTextInputs: METRO_HOTKEYS_FILTER_TEXT_INPUTS,
        filterContentEditable: METRO_HOTKEYS_FILTER_CONTENT_EDITABLE
    },

    keyHandler: function(handleObj){
        if (typeof handleObj.data === "string") {
            handleObj.data = {
                keys: handleObj.data
            };
        }

        // Only care when a possible input has been specified
        if (!handleObj.data || !handleObj.data.keys || typeof handleObj.data.keys !== "string") {
            return;
        }

        var origHandler = handleObj.handler,
            keys = handleObj.data.keys.toLowerCase().split(" ");

        handleObj.handler = function(event) {
            //      Don't fire in text-accepting inputs that we didn't directly bind to
            if (this !== event.target &&
                (hotkeys.options.filterInputAcceptingElements && hotkeys.textInputTypes.test(event.target.nodeName) ||
                    (hotkeys.options.filterContentEditable && $(event.target).attr('contenteditable')) ||
                    (hotkeys.options.filterTextInputs && $.inArray(event.target.type, hotkeys.textAcceptingInputTypes) > -1))
            )
            {
                return;
            }

            var special = event.type !== "keypress" && hotkeys.specialKeys[event.which],
                character = String.fromCharCode(event.which).toLowerCase(),
                modif = "",
                possible = {};

            $.each(["alt", "ctrl", "shift"], function(index, specialKey) {

                if (event[specialKey + 'Key'] && special !== specialKey) {
                    modif += specialKey + '+';
                }
            });

            // metaKey is triggered off ctrlKey erronously
            if (event.metaKey && !event.ctrlKey && special !== "meta") {
                modif += "meta+";
            }

            if (event.metaKey && special !== "meta" && modif.indexOf("alt+ctrl+shift+") > -1) {
                modif = modif.replace("alt+ctrl+shift+", "hyper+");
            }

            if (special) {
                possible[modif + special] = true;
            }
            else {
                possible[modif + character] = true;
                possible[modif + hotkeys.shiftNums[character]] = true;

                // "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
                if (modif === "shift+") {
                    possible[hotkeys.shiftNums[character]] = true;
                }
            }

            for (var i = 0, l = keys.length; i < l; i++) {
                if (possible[keys[i]]) {
                    return origHandler.apply(this, arguments);
                }
            }
        };
    }
};

$.each(["keydown", "keyup", "keypress"], function() {
    $.event.special[this] = {
        add: hotkeys.keyHandler
    };
});


// Source: js/utils/i18n.js
var Locales = {
    'en-US': {
        "calendar": {
            "months": [
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
                "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ],
            "days": [
                "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
                "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa",
                "Sun", "Mon", "Tus", "Wen", "Thu", "Fri", "Sat"
            ],
            "time": {
                "days": "DAYS",
                "hours": "HOURS",
                "minutes": "MINS",
                "seconds": "SECS",
                "month": "MON",
                "day": "DAY",
                "year": "YEAR"
            }
        },
        "buttons": {
            "ok": "OK",
            "cancel": "Cancel",
            "done": "Done",
            "today": "Today",
            "now": "Now",
            "clear": "Clear",
            "help": "Help",
            "yes": "Yes",
            "no": "No",
            "random": "Random",
            "save": "Save",
            "reset": "Reset"
        }
    },
    
    'cn-ZH': {
        "calendar": {
            "months": [
                "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月",
                "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"
            ],
            "days": [
                "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六",
                "日", "一", "二", "三", "四", "五", "六",
                "周日", "周一", "周二", "周三", "周四", "周五", "周六"
            ],
            "time": {
                "days": "天",
                "hours": "时",
                "minutes": "分",
                "seconds": "秒",
                "month": "月",
                "day": "日",
                "year": "年"
            }
        },
        "buttons": {
            "ok": "确认",
            "cancel": "取消",
            "done": "完成",
            "today": "今天",
            "now": "现在",
            "clear": "清除",
            "help": "帮助",
            "yes": "是",
            "no": "否",
            "random": "随机",
            "save": "保存",
            "reset": "重啟"
        }
    },
    
    
    'de-DE': {
        "calendar": {
            "months": [
                "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember",
                "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"
            ],
            "days": [
                "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag",
                "Sn", "Mn", "Di", "Mi", "Do", "Fr", "Sa",
                "Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam"
            ],
            "time": {
                "days": "TAGE",
                "hours": "UHR",
                "minutes": "MIN",
                "seconds": "SEK"
            }
        },
        "buttons": {
            "ok": "OK",
            "cancel": "Abbrechen",
            "done": "Fertig",
            "today": "Heute",
            "now": "Jetzt",
            "clear": "Reinigen",
            "help": "Hilfe",
            "yes": "Ja",
            "no": "Nein",
            "random": "Zufällig",
            "save": "Sparen",
            "reset": "Zurücksetzen"
        }
    },

    'hu-HU': {
        "calendar": {
            "months": [
                'Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December',
                'Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'
            ],
            "days": [
                'Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat',
                'V', 'H', 'K', 'Sz', 'Cs', 'P', 'Sz',
                'Vas', 'Hét', 'Ke', 'Sze', 'Csü', 'Pén', 'Szom'
            ],
            "time": {
                "days": "NAP",
                "hours": "ÓRA",
                "minutes": "PERC",
                "seconds": "MP"
            }
        },
        "buttons": {
            "ok": "OK",
            "cancel": "Mégse",
            "done": "Kész",
            "today": "Ma",
            "now": "Most",
            "clear": "Törlés",
            "help": "Segítség",
            "yes": "Igen",
            "no": "Nem",
            "random": "Véletlen",
            "save": "Mentés",
            "reset": "Visszaállítás"
        }
    },

    'ru-RU': {
        "calendar": {
            "months": [
                "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
                "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
            ],
            "days": [
                "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота",
                "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
                "Вос", "Пон", "Вто", "Сре", "Чет", "Пят", "Суб"
            ],
            "time": {
                "days": "ДНИ",
                "hours": "ЧАСЫ",
                "minutes": "МИН",
                "seconds": "СЕК"
            }
        },
        "buttons": {
            "ok": "ОК",
            "cancel": "Отмена",
            "done": "Готово",
            "today": "Сегодня",
            "now": "Сейчас",
            "clear": "Очистить",
            "help": "Помощь",
            "yes": "Да",
            "no": "Нет",
            "random": "Случайно",
            "save": "Сохранить",
            "reset": "Сброс"
        }
    },

    'uk-UA': {
        "calendar": {
            "months": [
                "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень",
                "Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"
            ],
            "days": [
                "Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П’ятниця", "Субота",
                "Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
                "Нед", "Пон", "Вiв", "Сер", "Чет", "Пят", "Суб"
            ],
            "time": {
                "days": "ДНІ",
                "hours": "ГОД",
                "minutes": "ХВИЛ",
                "seconds": "СЕК"
            }
        },
        "buttons": {
            "ok": "ОК",
            "cancel": "Відміна",
            "done": "Готово",
            "today": "Сьогодні",
            "now": "Зараз",
            "clear": "Очистити",
            "help": "Допомога",
            "yes": "Так",
            "no": "Ні",
            "random": "Випадково",
            "save": "Зберегти",
            "reset": "Скинути"
        }
    },

    'es-MX': {
        "calendar": {
            "months": [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
                "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
            ],
            "days": [
                "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado",
                "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa",
                "Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"
            ],
            "time": {
                "days": "DÍAS",
                "hours": "HORAS",
                "minutes": "MINS",
                "seconds": "SEGS",
                "month": "MES",
                "day": "DÍA",
                "year": "AÑO"
            }
        },
        "buttons": {
            "ok": "Aceptar",
            "cancel": "Cancelar",
            "done": "Hecho",
            "today": "Hoy",
            "now": "Ahora",
            "clear": "Limpiar",
            "help": "Ayuda",
            "yes": "Si",
            "no": "No",
            "random": "Aleatorio",
            "save": "Salvar",
            "reset": "Reiniciar"
        }
    },

    'fr-FR': {
        "calendar": {
            "months": [
                "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
                "Janv", "Févr", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"
            ],
            "days": [
                "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi",
                "De", "Du", "Ma", "Me", "Je", "Ve", "Sa",
                "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"
            ],
            "time": {
                "days": "JOURS",
                "hours": "HEURES",
                "minutes": "MINS",
                "seconds": "SECS",
                "month": "MOIS",
                "day": "JOUR",
                "year": "ANNEE"
            }
        },
        "buttons": {
            "ok": "OK",
            "cancel": "Annulé",
            "done": "Fait",
            "today": "Aujourd'hui",
            "now": "Maintenant",
            "clear": "Effacé",
            "help": "Aide",
            "yes": "Oui",
            "no": "Non",
            "random": "Aléatoire",
            "save": "Sauvegarder",
            "reset": "Réinitialiser"
        }
    },

    'it-IT': {
        "calendar": {
            "months": [
                "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre",
                "Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"
            ],
            "days": [
                "Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato",
                "Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa",
                "Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"
            ],
            "time": {
                "days": "GIORNI",
                "hours": "ORE",
                "minutes": "MIN",
                "seconds": "SEC",
                "month": "MESE",
                "day": "GIORNO",
                "year": "ANNO"
            }
        },
        "buttons": {
            "ok": "OK",
            "cancel": "Annulla",
            "done": "Fatto",
            "today": "Oggi",
            "now": "Adesso",
            "clear": "Cancella",
            "help": "Aiuto",
            "yes": "Sì",
            "no": "No",
            "random": "Random",
            "save": "Salvare",
            "reset": "Reset"
        }
    }
};

Metro['locales'] = Locales;


// Source: js/utils/md5.js
var hexcase = 0;
/* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = "";
/* base-64 pad character. "=" for strict RFC compliance   */

function hex_md5(s) {
    return rstr2hex(rstr_md5(str2rstr_utf8(s)));
}
function b64_md5(s) {
    return rstr2b64(rstr_md5(str2rstr_utf8(s)));
}
function any_md5(s, e) {
    return rstr2any(rstr_md5(str2rstr_utf8(s)), e);
}
function hex_hmac_md5(k, d) {
    return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function b64_hmac_md5(k, d) {
    return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function any_hmac_md5(k, d, e) {
    return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e);
}


/*
 * Calculate the MD5 of a raw string
 */
function rstr_md5(s) {
    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
 * Calculate the HMAC-MD5, of a key and some data (raw strings)
 */
function rstr_hmac_md5(key, data) {
    var bkey = rstr2binl(key);
    if (bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

    var ipad = new Array(16), opad = new Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
    return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var output = "";
    var x;
    for (var i = 0; i < input.length; i++) {
        x = input.charCodeAt(i);
        output += hex_tab.charAt((x >>> 4) & 0x0F)
            + hex_tab.charAt(x & 0x0F);
    }
    return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var output = "";
    var len = input.length;
    for (var i = 0; i < len; i += 3) {
        var triplet = (input.charCodeAt(i) << 16)
            | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
            | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > input.length * 8) output += b64pad;
            else output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
        }
    }
    return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding) {
    var divisor = encoding.length;
    var i, j, q, x, quotient;

    /* Convert to an array of 16-bit big-endian values, forming the dividend */
    var dividend = new Array(Math.ceil(input.length / 2));
    for (i = 0; i < dividend.length; i++) {
        dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
    }

    /*
     * Repeatedly perform a long division. The binary array forms the dividend,
     * the length of the encoding is the divisor. Once computed, the quotient
     * forms the dividend for the next step. All remainders are stored for later
     * use.
     */
    var full_length = Math.ceil(input.length * 8 /
        (Math.log(encoding.length) / Math.log(2)));
    var remainders = new Array(full_length);
    for (j = 0; j < full_length; j++) {
        quotient = [];
        x = 0;
        for (i = 0; i < dividend.length; i++) {
            x = (x << 16) + dividend[i];
            q = Math.floor(x / divisor);
            x -= q * divisor;
            if (quotient.length > 0 || q > 0)
                quotient[quotient.length] = q;
        }
        remainders[j] = x;
        dividend = quotient;
    }

    /* Convert the remainders to the output string */
    var output = "";
    for (i = remainders.length - 1; i >= 0; i--)
        output += encoding.charAt(remainders[i]);

    return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input) {
    var output = "";
    var i = -1;
    var x, y;

    while (++i < input.length) {
        /* Decode utf-16 surrogate pairs */
        x = input.charCodeAt(i);
        y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
        if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
            x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
            i++;
        }

        /* Encode output as utf-8 */
        if (x <= 0x7F)
            output += String.fromCharCode(x);
        else if (x <= 0x7FF)
            output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                0x80 | ( x & 0x3F));
        else if (x <= 0xFFFF)
            output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                0x80 | ((x >>> 6 ) & 0x3F),
                0x80 | ( x & 0x3F));
        else if (x <= 0x1FFFFF)
            output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                0x80 | ((x >>> 12) & 0x3F),
                0x80 | ((x >>> 6 ) & 0x3F),
                0x80 | ( x & 0x3F));
    }
    return output;
}

/*
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binl(input) {
    var i;
    var output = new Array(input.length >> 2);
    for (i = 0; i < output.length; i++)
        output[i] = 0;
    for (i = 0; i < input.length * 8; i += 8)
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
    return output;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2rstr(input) {
    var output = "";
    for (var i = 0; i < input.length * 32; i += 8)
        output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
    return output;
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */
function binl_md5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = md5_ff(a, b, c, d, x[i], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
    }
    return [a, b, c, d];
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}


// window.md5 = {
//     hex: function(val){
//         return hex_md5(val);
//     },
//
//     b64: function(val){
//         return b64_md5(val);
//     },
//
//     any: function(s, e){
//         return any_md5(s, e);
//     },
//
//     hex_hmac: function(k, d){
//         return hex_hmac_md5(k, d);
//     },
//
//     b64_hmac: function(k, d){
//         return b64_hmac_md5(k, d);
//     },
//
//     any_hmac: function(k, d, e){
//         return any_hmac_md5(k, d, e);
//     }
// };

//$.Metro['md5'] = hex_md5;

// Source: js/utils/mousewheel.js
var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
    toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
        ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
    slice  = Array.prototype.slice,
    nullLowestDeltaTimeout, lowestDelta;

if ( $.event.fixHooks ) {
    for ( var i = toFix.length; i; ) {
        $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    version: '3.1.12',

    setup: function() {
        if ( this.addEventListener ) {
            for ( var i = toBind.length; i; ) {
                this.addEventListener( toBind[--i], mousewheel_handler, false );
            }
        } else {
            this.onmousewheel = mousewheel_handler;
        }
        // Store the line height and page height for this particular element

        $.data(this, 'mousewheel-line-height', $.event.special.mousewheel.getLineHeight(this));
        $.data(this, 'mousewheel-page-height', $.event.special.mousewheel.getPageHeight(this));
    },

    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i = toBind.length; i; ) {
                this.removeEventListener( toBind[--i], mousewheel_handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
        // Clean up the data we added to the element
        $.removeData(this, 'mousewheel-line-height');
        $.removeData(this, 'mousewheel-page-height');
    },

    getLineHeight: function(elem) {
        var $elem = $(elem),
            $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
        if (!$parent.length) {
            $parent = $('body');
        }
        return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
    },

    getPageHeight: function(elem) {
        return $(elem).height();
    },

    settings: {
        adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
        normalizeOffset: true  // calls getBoundingClientRect for each event
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
    },

    unmousewheel: function(fn) {
        return this.unbind('mousewheel', fn);
    }
});


function mousewheel_handler(event) {
    var orgEvent   = event || window.event,
        args       = slice.call(arguments, 1),
        delta      = 0,
        deltaX     = 0,
        deltaY     = 0,
        absDelta   = 0,
        offsetX    = 0,
        offsetY    = 0;
    event = $.event.fix(orgEvent);
    event.type = 'mousewheel';

    // Old school scrollwheel delta
    if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
    if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
    if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
    if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

    // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
    if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaX = deltaY * -1;
        deltaY = 0;
    }

    // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
    delta = deltaY === 0 ? deltaX : deltaY;

    // New school wheel delta (wheel event)
    if ( 'deltaY' in orgEvent ) {
        deltaY = orgEvent.deltaY * -1;
        delta  = deltaY;
    }
    if ( 'deltaX' in orgEvent ) {
        deltaX = orgEvent.deltaX;
        if ( deltaY === 0 ) { delta  = deltaX * -1; }
    }

    // No change actually happened, no reason to go any further
    if ( deltaY === 0 && deltaX === 0 ) { return; }

    // Need to convert lines and pages to pixels if we aren't already in pixels
    // There are three delta modes:
    //   * deltaMode 0 is by pixels, nothing to do
    //   * deltaMode 1 is by lines
    //   * deltaMode 2 is by pages

    if ( orgEvent.deltaMode === 1 ) {
        var lineHeight = $.data(this, 'mousewheel-line-height');
        delta  *= lineHeight;
        deltaY *= lineHeight;
        deltaX *= lineHeight;
    } else if ( orgEvent.deltaMode === 2 ) {
        var pageHeight = $.data(this, 'mousewheel-page-height');
        delta  *= pageHeight;
        deltaY *= pageHeight;
        deltaX *= pageHeight;
    }

    // Store lowest absolute delta to normalize the delta values
    absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

    if ( !lowestDelta || absDelta < lowestDelta ) {
        lowestDelta = absDelta;

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            lowestDelta /= 40;
        }
    }

    // Adjust older deltas if necessary
    if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
        // Divide all the things by 40!
        delta  /= 40;
        deltaX /= 40;
        deltaY /= 40;
    }

    // Get a whole, normalized value for the deltas
    delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
    deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
    deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

    // Normalise offsetX and offsetY properties
    if ( $.event.special.mousewheel.settings.normalizeOffset && this.getBoundingClientRect ) {
        var boundingRect = this.getBoundingClientRect();
        offsetX = event.clientX - boundingRect.left;
        offsetY = event.clientY - boundingRect.top;
    }

    // Add information to the event object
    event.deltaX = deltaX;
    event.deltaY = deltaY;
    event.deltaFactor = lowestDelta;
    event.offsetX = offsetX;
    event.offsetY = offsetY;
    // Go ahead and set deltaMode to 0 since we converted to pixels
    // Although this is a little odd since we overwrite the deltaX/Y
    // properties with normalized deltas.
    event.deltaMode = 0;

    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);

    // Clearout lowestDelta after sometime to better
    // handle multiple device types that give different
    // a different lowestDelta
    // Ex: trackpad = 3 and mouse wheel = 120
    if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
    nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

    return ($.event.dispatch || $.event.handle).apply(this, args);
}

function nullLowestDelta() {
    lowestDelta = null;
}

function shouldAdjustOldDeltas(orgEvent, absDelta) {
    // If this is an older event and the delta is divisable by 120,
    // then we are assuming that the browser is treating this as an
    // older mouse wheel event and that we should divide the deltas
    // by 40 to try and get a more usable deltaFactor.
    // Side note, this actually impacts the reported scroll distance
    // in older browsers and can cause scrolling to be slower than native.
    // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
    return $.event.special.mousewheel.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
}

// Source: js/utils/scroll-events.js
var dispatch = $.event.dispatch || $.event.handle;
var special = jQuery.event.special,
    uid1 = 'D' + (+new Date()),
    uid2 = 'D' + (+new Date() + 1);

special.scrollstart = {
    setup: function(data) {
        var _data = $.extend({
            latency: special.scrollstop.latency
        }, data);

        var timer,
            handler = function(evt) {
                var _self = this;

                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                } else {
                    evt.type = 'scrollstart';
                    dispatch.apply(_self, arguments);
                }

                timer = setTimeout(function() {
                    timer = null;
                }, _data.latency);
            };

        $(this).on('scroll', handler).data(uid1, handler);
    },
    teardown: function() {
        $(this).off('scroll', $(this).data(uid1));
    }
};

special.scrollstop = {
    latency: 250,
    setup: function(data) {
        var _data = $.extend({
            latency: special.scrollstop.latency
        }, data);

        var timer,
            handler = function(evt) {
                var _self = this,
                    _args = arguments;

                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }

                timer = setTimeout(function() {
                    timer = null;
                    evt.type = 'scrollstop';
                    dispatch.apply(_self, _args);
                }, _data.latency);
            };

        $(this).on('scroll', handler).data(uid2, handler);
    },
    teardown: function() {
        $(this).off('scroll', $(this).data(uid2));
    }
};


// Source: js/utils/session-storage.js
var SessionStorage = {
    key: "METRO:APP",

    init: function( options ) {
        this.options = $.extend( {}, this.options, options );

        return this;
    },

    nvl: function(data, other){
        return data === undefined || data === null ? other : data;
    },

    setKey: function(key){
        this.key = key;
    },

    getKey: function(){
        return this.key;
    },

    setItem: function(key, value){
        window.sessionStorage.setItem(this.key + ":" + key, JSON.stringify(value));
    },

    getItem: function(key, default_value, reviver){
        var result, value;

        value = this.nvl(window.sessionStorage.getItem(this.key + ":" + key), default_value);

        try {
            result = JSON.parse(value, reviver);
        } catch (e) {
            result = null;
        }
        return result;
    },

    getItemPart: function(key, sub_key, default_value, reviver){
        var i;
        var val = this.getItem(key, default_value, reviver);

        sub_key = sub_key.split("->");
        for(i = 0; i < sub_key.length; i++) {
            val = val[sub_key[i]];
        }
        return val;
    },

    delItem: function(key){
        window.sessionStorage.removeItem(this.key + ":" + key)
    },

    size: function(unit){
        var divider;
        switch (unit) {
            case 'm':
            case 'M': {
                divider = 1024 * 1024;
                break;
            }
            case 'k':
            case 'K': {
                divider = 1024;
                break;
            }
            default: divider = 1;
        }
        return JSON.stringify(window.sessionStorage).length / divider;
    }
};

Metro['session'] = SessionStorage.init();

// Source: js/utils/storage.js
var Storage = {
    key: "METRO:APP",

    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );

        return this;
    },

    nvl: function(data, other){
        return data === undefined || data === null ? other : data;
    },

    setKey: function(key){
        this.key = key;
    },

    getKey: function(){
        return this.key;
    },

    setItem: function(key, value){
        window.localStorage.setItem(this.key + ":" + key, JSON.stringify(value));
    },

    getItem: function(key, default_value, reviver){
        var result, value;

        value = this.nvl(window.localStorage.getItem(this.key + ":" + key), default_value);

        try {
            result = JSON.parse(value, reviver);
        } catch (e) {
            result = null;
        }
        return result;
    },

    getItemPart: function(key, sub_key, default_value, reviver){
        var i;
        var val = this.getItem(key, default_value, reviver);

        sub_key = sub_key.split("->");
        for(i = 0; i < sub_key.length; i++) {
            val = val[sub_key[i]];
        }
        return val;
    },

    delItem: function(key){
        window.localStorage.removeItem(this.key + ":" + key)
    },

    size: function(unit){
        var divider;
        switch (unit) {
            case 'm':
            case 'M': {
                divider = 1024 * 1024;
                break;
            }
            case 'k':
            case 'K': {
                divider = 1024;
                break;
            }
            default: divider = 1;
        }
        return JSON.stringify(window.localStorage).length / divider;
    }
};

Metro['storage'] = Storage.init();

// Source: js/utils/tpl.js
var TemplateEngine = function(html, options) {
    var re = /<%(.+?)%>/g,
        reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g,
        code = 'with(obj) { var r=[];\n',
        cursor = 0,
        result,
        match;
    var add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line !== '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    };
    while(match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, ' ');
    try { result = new Function('obj', code).apply(options, [options]); }
    catch(err) { console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n"); }
    return result;
};

Metro['template'] = TemplateEngine;


// Source: js/utils/utilities.js
var Utils = {
    isUrl: function (val) {
        return /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@\-\/]))?/.test(val);
    },

    isTag: function(val){
        return /^<\/?[\w\s="/.':;#-\/\?]+>/gi.test(val);
    },

    isColor: function (val) {
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(val);
    },

    isEmbedObject: function(val){
        var embed = ["iframe", "object", "embed", "video"];
        var result = false;
        $.each(embed, function(){
            if (val.indexOf(this) !== -1) {
                result = true;
            }
        });
        return result;
    },

    isVideoUrl: function(val){
        return /youtu\.be|youtube|vimeo/gi.test(val);
    },

    isDate: function(val){
        return (String(new Date(val)) !== "Invalid Date");
    },

    isInt: function(n){
        return Number(n) === n && n % 1 === 0;
    },

    isFloat: function(n){
        return Number(n) === n && n % 1 !== 0;
    },

    isTouchDevice: function() {
        return (('ontouchstart' in window)
            || (navigator.MaxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0));
    },

    isFunc: function(f){
        return this.isType(f, 'function');
    },

    isObject: function(o){
        return this.isType(o, 'object')
    },

    isArray: function(a){
        return Array.isArray(a);
    },

    isType: function(o, t){
        if (o === undefined || o === null) {
            return false;
        }

        if (typeof o === t) {
            return o;
        }

        if (this.isTag(o) || this.isUrl(o)) {
            return false;
        }

        if (typeof window[o] === t) {
            return window[o];
        }

        if (typeof o === 'string' && o.indexOf(".") === -1) {
            return false;
        }

        if (typeof o === 'string' && o.indexOf(" ") !== -1) {
            return false;
        }

        if (typeof o === 'string' && o.indexOf("(") !== -1) {
            return false;
        }

        if (typeof o === 'string' && o.indexOf("[") !== -1) {
            return false;
        }

        var ns = o.split(".");
        var i, context = window;

        for(i = 0; i < ns.length; i++) {
            context = context[ns[i]];
        }

        return typeof context === t ? context : false;
    },

    isMetroObject: function(el, type){
        var $el = $(el), el_obj = $el.data(type);
        if ($el.length === 0) {
            console.log(type + ' ' + el + ' not found!');
            return false;
        }

        if (el_obj === undefined) {
            console.log('Element not contain role '+ type +'! Please add attribute data-role="'+type+'" to element ' + el);
            return false;
        }

        return true;
    },

    isJQueryObject: function(el){
        return (typeof jQuery === "function" && el instanceof jQuery);
    },

    embedObject: function(val){
        if (typeof  val !== "string" ) {
            val = this.isJQueryObject(val) ? val.html() : val.innerHTML;
        }
        return "<div class='embed-container'>" + val + "</div>";
    },

    embedUrl: function(val){
        if (val.indexOf("youtu.be") !== -1) {
            val = "https://www.youtube.com/embed/" + val.split("/").pop();
        }
        return "<div class='embed-container'><iframe src='"+val+"'></iframe></div>";
    },

    secondsToTime: function(secs) {
        var hours = Math.floor(secs / (60 * 60));

        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);

        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);

        return {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
    },

    hex2rgba: function(hex, alpha){
        var c;
        alpha = isNaN(alpha) ? 1 : alpha;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length=== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
        }
        throw new Error('Hex2rgba error. Bad Hex value');
    },

    random: function(from, to){
        return Math.floor(Math.random()*(to-from+1)+from);
    },

    uniqueId: function () {
var d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    },

    elementId: function(prefix){
        return prefix+"-"+(new Date()).getTime()+Utils.random(1, 1000);
    },

    secondsToFormattedString: function(time){
        var sec_num = parseInt(time, 10);
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}

        return [hours, minutes, seconds].join(":");
    },

    callback: function(f, args, context){
        return this.exec(f, args, context);
    },

    func: function(f){
        return new Function("a", f);
    },

    exec: function(f, args, context){
        var result;
        if (f === undefined || f === null) {return false;}
        var func = this.isFunc(f);
        if (func === false) {
            func = this.func(f);
        }

        try {
            result = func.apply(context, args);
        } catch (err) {
            result = null;
            if (METRO_THROWS === true) {
                throw err;
            }
        }
        return result;
    },

    isOutsider: function(el) {
        el = this.isJQueryObject(el) ? el : $(el);
        var rect;
        var clone = el.clone();

        clone.removeAttr("data-role").css({
            visibility: "hidden",
            position: "absolute",
            display: "block"
        });
        el.parent().append(clone);

        rect = clone[0].getBoundingClientRect();
        clone.remove();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    inViewport: function(el){
        var rect = this.rect(el);

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    rect: function(el){
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }

        var rect = el.getBoundingClientRect();

        return rect;
    },

    objectLength: function(obj){
        return Object.keys(obj).length;
    },

    percent: function(total, part, round_value){
        if (total === 0) {
            return 0;
        }
        var result = part * 100 / total;
        return round_value === true ? Math.round(result) : Math.round(result * 100) / 100;
    },

    camelCase: function(str){
        return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    },

    dashedName: function(str){
        return str.replace(/([A-Z])/g, function(u) { return "-" + u.toLowerCase(); });
    },

    objectShift: function(obj){
        var min = 0;
        $.each(obj, function(i){
            if (min === 0) {
                min = i;
            } else {
                if (min > i) {
                    min = i;
                }
            }
        });
        delete obj[min];

        return obj;
    },

    objectDelete: function(obj, key){
        if (obj[key] !== undefined) delete obj[key];
    },

    arrayDelete: function(arr, val){
        arr.splice(arr.indexOf(val), 1);
    },

    arrayDeleteByKey: function(arr, key){
        arr.splice(key, 1);
    },

    nvl: function(data, other){
        return data === undefined || data === null ? other : data;
    },

    objectClone: function(obj){
        var copy = {};
        for(var key in obj) {
            if (obj.hasOwnProperty(key)) {
                copy[key] = obj[key];
            }
        }
        return copy;
    },

    github: function(repo, callback){
        var that = this;
        $.ajax({
            url: 'https://api.github.com/repos/' + repo,
            dataType: 'jsonp'
        })
        .done(function(data){
            that.callback(callback, [data.data]);
        });
    },

    detectIE: function() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    },

    detectChrome: function(){
        return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    },

    md5: function(s){
        return hex_md5(s);
    },

    encodeURI: function(str){
        return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
    },

    pageHeight: function(){
        var body = document.body,
            html = document.documentElement;

        return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    },

    cleanPreCode: function(selector){
        var els = Array.prototype.slice.call(document.querySelectorAll(selector), 0);

        els.forEach(function(el){
            var txt = el.textContent
                .replace(/^[\r\n]+/, "")	// strip leading newline
                .replace(/\s+$/g, "");

            if (/^\S/gm.test(txt)) {
                el.textContent = txt;
                return;
            }

            var mat, str, re = /^[\t ]+/gm, len, min = 1e3;

            while (mat = re.exec(txt)) {
                len = mat[0].length;

                if (len < min) {
                    min = len;
                    str = mat[0];
                }
            }

            if (min === 1e3)
                return;

            el.textContent = txt.replace(new RegExp("^" + str, 'gm'), "");
        });
    },

    coords: function(el){
        if (this.isJQueryObject(el)) {
            el = el[0];
        }

        var box = el.getBoundingClientRect();

        return {
            top: box.top + window.pageYOffset,
            left: box.left + window.pageXOffset
        };
    },

    positionXY: function(e, t){
        switch (t) {
            case 'client': return this.clientXY(e);
            case 'screen': return this.screenXY(e);
            case 'page': return this.pageXY(e);
            default: return {x: 0, y: 0}
        }
    },

    clientXY: function(e){
        return {
            x: e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
            y: e.changedTouches ? e.changedTouches[0].clientY : e.clientY
        };
    },

    screenXY: function(e){
        return {
            x: e.changedTouches ? e.changedTouches[0].screenX : e.screenX,
            y: e.changedTouches ? e.changedTouches[0].screenY : e.screenY
        };
    },

    pageXY: function(e){
        return {
            x: e.changedTouches ? e.changedTouches[0].pageX : e.pageX,
            y: e.changedTouches ? e.changedTouches[0].pageY : e.pageY
        };
    },

    isRightMouse: function(e){
        return "which" in e ? e.which === 3 : "button" in e ? e.button === 2 : undefined;
    },

    hiddenElementSize: function(el, includeMargin){
        var clone = $(el).clone();
        clone.removeAttr("data-role").css({
            visibility: "hidden",
            position: "absolute",
            display: "block"
        });
        $("body").append(clone);

        if (includeMargin === undefined) {
            includeMargin = false;
        }

        var width = clone.outerWidth(includeMargin);
        var height = clone.outerHeight(includeMargin);
        clone.remove();
        return {
            width: width,
            height: height
        }
    },

    getStyle: function(el, pseudo){
        if (Utils.isJQueryObject(el) === true) {
            el  = el[0];
        }
        return window.getComputedStyle(el, pseudo);
    },

    getStyleOne: function(el, property){
        return this.getStyle(el).getPropertyValue(property);
    },

    getTransformMatrix: function(el, returnArray){
        var computedMatrix = this.getStyleOne(el, "transform");
        var a = computedMatrix
            .replace("matrix(", '')
            .slice(0, -1)
            .split(',');
        return returnArray !== true ? {
            a: a[0],
            b: a[1],
            c: a[2],
            d: a[3],
            tx: a[4],
            ty: a[5]
        } : a;
    },

    computedRgbToHex: function(rgb){
        var a = rgb.replace(/[^\d,]/g, '').split(',');
        var result = "#";
        $.each(a, function(){
            var h = parseInt(this).toString(16);
            result += h.length === 1 ? "0" + h : h;
        });
        return result;
    },

    computedRgbToRgba: function(rgb, alpha){
        var a = rgb.replace(/[^\d,]/g, '').split(',');
        if (alpha === undefined) {
            alpha = 1;
        }
        a.push(alpha);
        return "rgba("+a.join(",")+")";
    },

    computedRgbToArray: function(rgb){
        return rgb.replace(/[^\d,]/g, '').split(',');
    },

    hexColorToArray: function(hex){
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length === 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return [(c>>16)&255, (c>>8)&255, c&255];
        }
        return [0,0,0];
    },

    hexColorToRgbA: function(hex, alpha){
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length === 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255, alpha ? alpha : 1].join(',')+')';
        }
        return 'rgba(0,0,0,1)';
    },

    getInlineStyles: function(el){
        var styles = {};
        if (this.isJQueryObject(el)) {
            el = el[0];
        }
        for (var i = 0, l = el.style.length; i < l; i++) {
            var s = el.style[i];
            styles[s] = el.style[s];
        }

        return styles;
    },

    updateURIParameter: function(uri, key, value) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            return uri + separator + key + "=" + value;
        }
    },

    getURIParameter: function(url, name){
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    getLocales: function(){
        return Object.keys(Metro.locales);
    },

    addLocale: function(locale){
        Metro.locales = $.extend( {}, Metro.locales, locale );
    },

    strToArray: function(str, delimiter){
        var a;

        if (!this.isValue(delimiter)) {
            delimiter = ",";
        }

        a = (""+str).split(delimiter);

        return a.map(function(s){
            return s.trim();
        })
    },

    aspectRatioH: function(width, a){
        if (a === "16/9") return width * 9 / 16;
        if (a === "21/9") return width * 9 / 21;
        if (a === "4/3") return width * 3 / 4;
    },

    aspectRatioW: function(height, a){
        if (a === "16/9") return height * 16 / 9;
        if (a === "21/9") return height * 21 / 9;
        if (a === "4/3") return height * 4 / 3;
    },

    valueInObject: function(obj, value){
        return Object.values(obj).indexOf(value) > -1;
    },

    keyInObject: function(){
        return Object.keys(obj).indexOf(value) > -1;
    },

    inObject: function(obj, key, val){
        return obj[key] !== undefined && obj[key] === val;
    },

    newCssSheet: function(media){
        var style = document.createElement("style");

        if (media !== undefined) {
            style.setAttribute("media", media);
        }

        style.appendChild(document.createTextNode(""));

        document.head.appendChild(style);

        return style.sheet;
    },

    addCssRule: function(sheet, selector, rules, index){
        if("insertRule" in sheet) {
            sheet.insertRule(selector + "{" + rules + "}", index);
        }
        else if("addRule" in sheet) {
            sheet.addRule(selector, rules, index);
        }
    },

    media: function(query){
        return window.matchMedia(query).matches
    },

    mediaModes: function(){
        return METRO_MEDIA;
    },

    mediaExist: function(media){
        return METRO_MEDIA.indexOf(media) > -1;
    },

    inMedia: function(media){
        return METRO_MEDIA.indexOf(media) > -1 && METRO_MEDIA.indexOf(media) === METRO_MEDIA.length - 1;
    },

    isValue: function(val){
        return val !== undefined && val !== null && val !== "";
    },

    isNegative: function(val){
        return parseFloat(val) < 0;
    },

    isPositive: function(val){
        return parseFloat(val) > 0;
    },

    isZero: function(val){
        return (parseFloat(val.toFixed(2))) === 0.00;
    },

    between: function(val, bottom, top, equals){
        return equals === true ? val >= bottom && val <= top : val > bottom && val < top;
    },

    parseMoney: function(val){
        return Number(parseFloat(val.replace(/[^0-9-.]/g, '')));
    },

    isVisible: function(el){
        if (this.isJQueryObject(el)) {
            el = el[0];
        }

        return this.getStyleOne(el, "display") !== "none" && this.getStyleOne(el, "visibility") !== "hidden" && el.offsetParent !== null;
    },

    parseNumber: function(val, thousand, decimal){
        return val.replace(new RegExp('\\'+thousand, "g"), "").replace(new RegExp('\\'+decimal, 'g'), ".");
    },

    nearest: function(val, precision, down){
        val /= precision;
        val = Math[down === true ? 'floor' : 'ceil'](val) * precision;
        return val;
    },

    bool: function(value){
        switch(value){
            case true:
            case "true":
            case 1:
            case "1":
            case "on":
            case "yes":
                return true;
            default:
                return false;
        }
    },

    copy: function(el){
        var body = document.body, range, sel;

        if (this.isJQueryObject(el)) {
            el = el[0];
        }

        if (document.createRange && window.getSelection) {
            range = document.createRange();
            sel = window.getSelection();
            sel.removeAllRanges();
            try {
                range.selectNodeContents(el);
                sel.addRange(range);
            } catch (e) {
                range.selectNode(el);
                sel.addRange(range);
            }
        } else if (body.createTextRange) {
            range = body.createTextRange();
            range.moveToElementText(el);
            range.select();
        }

        document.execCommand("Copy");

        if (window.getSelection) {
            if (window.getSelection().empty) {  // Chrome
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {  // Firefox
                window.getSelection().removeAllRanges();
            }
        } else if (document.selection) {  // IE?
            document.selection.empty();
        }
    }
};

Metro['utils'] = Utils;

// Source: js/plugins/accordion.js
var Accordion = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onAccordionCreate, [this.element]);

        return this;
    },
    options: {
        duration: METRO_ANIMATION_DURATION,
        oneFrame: true,
        showActive: true,
        activeFrameClass: "",
        activeHeadingClass: "",
        activeContentClass: "",
        onFrameOpen: Metro.noop,
        onFrameBeforeOpen: Metro.noop_true,
        onFrameClose: Metro.noop,
        onFrameBeforeClose: Metro.noop_true,
        onAccordionCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var frames = element.children(".frame");
        var active = element.children(".frame.active");
        var frame_to_open;

        element.addClass("accordion");

        if (active.length === 0) {
            frame_to_open = frames[0];
        } else {
            frame_to_open = active[0];
        }

        this._hideAll();

        if (o.showActive === true || o.oneFrame === true) {
            this._openFrame(frame_to_open);
        }

        this._createEvents();
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var active = element.children(".frame.active");

        element.on(Metro.events.click, ".heading", function(){
            var heading = $(this);
            var frame = heading.parent();

            if (heading.closest(".accordion")[0] !== element[0]) {
                return false;
            }

            if (frame.hasClass("active")) {
                if (active.length === 1 && o.oneFrame) {
                } else {
                    that._closeFrame(frame);
                }
            } else {
                that._openFrame(frame);
            }

            element.trigger("open", {frame: frame});
        });
    },

    _openFrame: function(f){
        var that = this, element = this.element, o = this.options;
        var frames = element.children(".frame");
        var frame = $(f);

        if (Utils.exec(o.onFrameBeforeOpen, [frame], element[0]) === false) {
            return false;
        }

        if (o.oneFrame === true) {
            this._closeAll();
        }

        frame.addClass("active " + o.activeFrameClass);
        frame.children(".heading").addClass(o.activeHeadingClass);
        frame.children(".content").addClass(o.activeContentClass).slideDown(o.duration);

        Utils.exec(o.onFrameOpen, [frame], element[0]);
    },

    _closeFrame: function(f){
        var that = this, element = this.element, o = this.options;
        var frame = $(f);

        if (Utils.exec(o.onFrameBeforeClose, [frame], element[0]) === false) {
            return ;
        }

        frame.removeClass("active " + o.activeFrameClass);
        frame.children(".heading").removeClass(o.activeHeadingClass);
        frame.children(".content").removeClass(o.activeContentClass).slideUp(o.duration);

        Utils.callback(o.onFrameClose, [frame], element[0]);
    },

    _closeAll: function(){
        var that = this, element = this.element, o = this.options;
        var frames = element.children(".frame");

        $.each(frames, function(){
            that._closeFrame(this);
        });
    },

    _hideAll: function(){
        var that = this, element = this.element, o = this.options;
        var frames = element.children(".frame");

        $.each(frames, function(){
            $(this).children(".content").hide(0);
        });
    },

    _openAll: function(){
        var that = this, element = this.element, o = this.options;
        var frames = element.children(".frame");

        $.each(frames, function(){
            that._openFrame(this);
        });
    },

    changeAttribute: function(attributeName){
    },

    destroy: function(){
        this.element.off(Metro.events.click, ".heading");
    }
};

Metro.plugin('accordion', Accordion);

// Source: js/plugins/activity.js
var Activity = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onActivityCreate, [this.element]);

        return this;
    },

    options: {
        type: "ring",
        style: "light",
        size: 64,
        radius: 20,
        onActivityCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var i, wrap;

        element
            .html('')
            .addClass(o.style + "-style")
            .addClass("activity-" + o.type);

        function _metro(){
            for(i = 0; i < 5 ; i++) {
                $("<div/>").addClass('circle').appendTo(element);
            }
        }

        function _square(){
            for(i = 0; i < 4 ; i++) {
                $("<div/>").addClass('square').appendTo(element);
            }
        }

        function _cycle(){
            $("<div/>").addClass('cycle').appendTo(element);
        }

        function _ring(){
            for(i = 0; i < 5 ; i++) {
                wrap = $("<div/>").addClass('wrap').appendTo(element);
                $("<div/>").addClass('circle').appendTo(wrap);
            }
        }

        function _simple(){
            $('<svg class="circular"><circle class="path" cx="'+o.size/2+'" cy="'+o.size/2+'" r="'+o.radius+'" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg>').appendTo(element);
        }

        switch (o.type) {
            case 'metro': _metro(); break;
            case 'square': _square(); break;
            case 'cycle': _cycle(); break;
            case 'simple': _simple(); break;
            default: _ring();
        }
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var that = this, element = this.element, o = this.options;

        element.html('')
            .removeClass(o.style + "-style")
            .removeClass("activity-" + o.type);
    }
};

Metro.plugin('activity', Activity);

Metro['activity'] = {
    open: function(options){

        var activity = '<div data-role="activity" data-type="'+( options.type ? options.type : 'cycle' )+'" data-style="'+( options.style ? options.style : 'color' )+'"></div>';
        var text = options.text ? '<div class="text-center">'+options.text+'</div>' : '';

        return Metro.dialog.create({
            content: activity + text,
            defaultAction: false,
            clsContent: "d-flex flex-column flex-justify-center flex-align-center bg-transparent no-shadow w-auto",
            clsDialog: "no-border no-shadow bg-transparent global-dialog",
            autoHide: options.autoHide ? options.autoHide : 0,
            overlayClickClose: options.overlayClickClose === true,
            overlayColor: options.overlayColor?options.overlayColor:'#000000',
            overlayAlpha: options.overlayAlpha?options.overlayAlpha:.5,
            clsOverlay: "global-overlay"
        })
    },

    close: function(a){
        Metro.dialog.close(a);
    }
};

// Source: js/plugins/app-bar.js
var AppBar = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        duration: 100,
        onAppBarCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onAppBarCreate, [element]);
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var id = Utils.elementId("app-bar");
        var hamburger, menu;

        element.addClass("app-bar");

        hamburger = element.find(".hamburger");
        if (hamburger.length === 0) {
            hamburger = $("<button>").attr("type", "button").addClass("hamburger menu-down");
            for(var i = 0; i < 3; i++) {
                $("<span>").addClass("line").appendTo(hamburger);
            }

            if (Colors.isLight(Utils.computedRgbToHex(Utils.getStyleOne(element, "background-color"))) === true) {
                hamburger.addClass("dark");
            }
        }

        element.prepend(hamburger);
        menu = element.find(".app-bar-menu");

        if (menu.length === 0) {
            hamburger.hide();
        } else {
            Utils.addCssRule(Metro.sheet, ".app-bar-menu li", "list-style: none!important;"); // This special for IE11 and Edge
        }

        if( !!element.attr("id") === false ){
            element.attr("id", id);
        }

        if (hamburger.css('display') === 'block') {
            menu.hide().addClass("collapsed");
            hamburger.removeClass("hidden");
        } else {
            hamburger.addClass("hidden");
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var menu = element.find(".app-bar-menu");
        var hamburger = element.find(".hamburger");

        element.on(Metro.events.click, ".hamburger", function(){
            if (menu.length === 0) return ;
            var collapsed = menu.hasClass("collapsed");
            if (collapsed) {
                that.open();
            } else {
                that.close();
            }
        });

        $(window).on(Metro.events.resize+"-"+element.attr("id"), function(){
            if (menu.length === 0) return ;

            if (hamburger.css('display') !== 'block') {
                menu.show();
                hamburger.addClass("hidden");
            } else {
                hamburger.removeClass("hidden");
                if (hamburger.hasClass("active")) {
                    menu.show().removeClass("collapsed");
                } else {
                    menu.hide().addClass("collapsed");
                }
            }
        });
    },

    close: function(){
        var that = this, element = this.element, o = this.options;
        var menu = element.find(".app-bar-menu");
        var hamburger = element.find(".hamburger");

        menu.slideUp(o.duration, function(){
            menu.addClass("collapsed");
            hamburger.removeClass("active");
        });
    },

    open: function(){
        var that = this, element = this.element, o = this.options;
        var menu = element.find(".app-bar-menu");
        var hamburger = element.find(".hamburger");

        menu.slideDown(o.duration, function(){
            menu.removeClass("collapsed");
            hamburger.addClass("active");
        });
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var element = this.element;
        element.off(Metro.events.click, ".hamburger");
        $(window).off(Metro.events.resize+"-"+element.attr("id"));
    }
};

Metro.plugin('appbar', AppBar);

// Source: js/plugins/audio.js
var Audio = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.preloader = null;
        this.player = null;
        this.audio = elem;
        this.stream = null;
        this.volume = null;
        this.volumeBackup = 0;
        this.muted = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        playlist: null,
        src: null,

        volume: .5,
        loop: false,
        autoplay: false,

        showLoop: true,
        showPlay: true,
        showStop: true,
        showMute: true,
        showFull: true,
        showStream: true,
        showVolume: true,
        showInfo: true,

        showPlaylist: true,
        showNext: true,
        showPrev: true,
        showFirst: true,
        showLast: true,
        showForward: true,
        showBackward: true,
        showShuffle: true,
        showRandom: true,

        loopIcon: "<span class='default-icon-loop'></span>",
        stopIcon: "<span class='default-icon-stop'></span>",
        playIcon: "<span class='default-icon-play'></span>",
        pauseIcon: "<span class='default-icon-pause'></span>",
        muteIcon: "<span class='default-icon-mute'></span>",
        volumeLowIcon: "<span class='default-icon-low-volume'></span>",
        volumeMediumIcon: "<span class='default-icon-medium-volume'></span>",
        volumeHighIcon: "<span class='default-icon-high-volume'></span>",

        playlistIcon: "<span class='default-icon-playlist'></span>",
        nextIcon: "<span class='default-icon-next'></span>",
        prevIcon: "<span class='default-icon-prev'></span>",
        firstIcon: "<span class='default-icon-first'></span>",
        lastIcon: "<span class='default-icon-last'></span>",
        forwardIcon: "<span class='default-icon-forward'></span>",
        backwardIcon: "<span class='default-icon-backward'></span>",
        shuffleIcon: "<span class='default-icon-shuffle'></span>",
        randomIcon: "<span class='default-icon-random'></span>",

        onPlay: Metro.noop,
        onPause: Metro.noop,
        onStop: Metro.noop,
        onEnd: Metro.noop,
        onMetadata: Metro.noop,
        onTime: Metro.noop,
        onAudioCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options, audio = this.audio;

        this._createPlayer();
        this._createControls();
        this._createEvents();

        if (o.autoplay === true) {
            this.play();
        }

        Utils.exec(o.onAudioCreate, [element, this.player]);
    },

    _createPlayer: function(){
        var that = this, element = this.element, o = this.options, audio = this.audio;

        var prev = element.prev();
        var parent = element.parent();
        var player = $("<div>").addClass("media-player audio-player " + element[0].className);

        if (prev.length === 0) {
            parent.prepend(player);
        } else {
            player.insertAfter(prev);
        }

        element.appendTo(player);

        $.each(['muted', 'autoplay', 'controls', 'height', 'width', 'loop', 'poster', 'preload'], function(){
            element.removeAttr(this);
        });

        element.attr("preload", "auto");

        audio.volume = o.volume;

        if (o.src !== null) {
            this._setSource(o.src);
        }

        element[0].className = "";

        this.player = player;
    },

    _setSource: function(src){
        var element = this.element;

        element.find("source").remove();
        element.removeAttr("src");
        if (Array.isArray(src)) {
            $.each(src, function(){
                var item = this;
                if (item.src === undefined) return ;
                $("<source>").attr('src', item.src).attr('type', item.type !== undefined ? item.type : '').appendTo(element);
            });
        } else {
            element.attr("src", src);
        }
    },

    _createControls: function(){
        var that = this, element = this.element, o = this.options, audio = this.elem, player = this.player;

        var controls = $("<div>").addClass("controls").addClass(o.clsControls).insertAfter(element);


        var stream = $("<div>").addClass("stream").appendTo(controls);
        var streamSlider = $("<input>").addClass("stream-slider ultra-thin cycle-marker").appendTo(stream);
        var preloader = $("<div>").addClass("load-audio").appendTo(stream);

        var volume = $("<div>").addClass("volume").appendTo(controls);
        var volumeSlider = $("<input>").addClass("volume-slider ultra-thin cycle-marker").appendTo(volume);

        var infoBox = $("<div>").addClass("info-box").appendTo(controls);

        if (o.showInfo !== true) {
            infoBox.hide();
        }

        preloader.activity({
            type: "metro",
            style: "color"
        });

        preloader.hide(0);

        this.preloader = preloader;

        streamSlider.slider({
            clsMarker: "bg-red",
            clsHint: "bg-cyan fg-white",
            clsComplete: "bg-cyan",
            hint: true,
            onStart: function(){
                if (!audio.paused) audio.pause();
            },
            onStop: function(val){
                if (audio.seekable.length > 0) {
                    audio.currentTime = (that.duration * val / 100).toFixed(0);
                }
                if (audio.paused && audio.currentTime > 0) {
                    audio.play();
                }
            }
        });

        this.stream = streamSlider;

        if (o.showStream !== true) {
            stream.hide();
        }

        volumeSlider.slider({
            clsMarker: "bg-red",
            clsHint: "bg-cyan fg-white",
            hint: true,
            value: o.volume * 100,
            onChangeValue: function(val){
                audio.volume = val / 100;
            }
        });

        this.volume = volumeSlider;

        if (o.showVolume !== true) {
            volume.hide();
        }

        var loop, play, stop, mute, full;

        if (o.showLoop === true) loop = $("<button>").attr("type", "button").addClass("button square loop").html(o.loopIcon).appendTo(controls);
        if (o.showPlay === true) play = $("<button>").attr("type", "button").addClass("button square play").html(o.playIcon).appendTo(controls);
        if (o.showStop === true) stop = $("<button>").attr("type", "button").addClass("button square stop").html(o.stopIcon).appendTo(controls);
        if (o.showMute === true) mute = $("<button>").attr("type", "button").addClass("button square mute").html(o.muteIcon).appendTo(controls);

        if (o.loop === true) {
            loop.addClass("active");
            element.attr("loop", "loop");
        }

        this._setVolume();

        if (o.muted) {
            that.volumeBackup = audio.volume;
            that.volume.data('slider').val(0);
            audio.volume = 0;
        }

        infoBox.html("00:00 / 00:00");
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options, audio = this.elem, player = this.player;

        element.on("loadstart", function(){
            that.preloader.fadeIn();
        });

        element.on("loadedmetadata", function(){
            that.duration = audio.duration.toFixed(0);
            that._setInfo(0, that.duration);
            Utils.exec(o.onMetadata, [audio, player]);
        });

        element.on("canplay", function(){
            that._setBuffer();
            that.preloader.fadeOut();
        });

        element.on("progress", function(){
            that._setBuffer();
        });

        element.on("timeupdate", function(){
            var position = Math.round(audio.currentTime * 100 / that.duration);
            that._setInfo(audio.currentTime, that.duration);
            that.stream.data('slider').val(position);
            Utils.exec(o.onTime, [audio.currentTime, that.duration, audio, player]);
        });

        element.on("waiting", function(){
            that.preloader.fadeIn();
        });

        element.on("loadeddata", function(){

        });

        element.on("play", function(){
            player.find(".play").html(o.pauseIcon);
            Utils.exec(o.onPlay, [audio, player]);
        });

        element.on("pause", function(){
            player.find(".play").html(o.playIcon);
            Utils.exec(o.onPause, [audio, player]);
        });

        element.on("stop", function(){
            that.stream.data('slider').val(0);
            Utils.exec(o.onStop, [audio, player]);
        });

        element.on("ended", function(){
            that.stream.data('slider').val(0);
            Utils.exec(o.onEnd, [audio, player]);
        });

        element.on("volumechange", function(){
            that._setVolume();
        });

        player.on(Metro.events.click, ".play", function(){
            if (audio.paused) {
                that.play();
            } else {
                that.pause();
            }
        });

        player.on(Metro.events.click, ".stop", function(){
            that.stop();
        });

        player.on(Metro.events.click, ".mute", function(){
            that._toggleMute();
        });

        player.on(Metro.events.click, ".loop", function(){
            that._toggleLoop();
        });
    },

    _toggleLoop: function(){
        var loop = this.player.find(".loop");
        if (loop.length === 0) return ;
        loop.toggleClass("active");
        if (loop.hasClass("active")) {
            this.element.attr("loop", "loop");
        } else {
            this.element.removeAttr("loop");
        }
    },

    _toggleMute: function(){
        this.muted = !this.muted;
        if (this.muted === false) {
            this.audio.volume = this.volumeBackup;
            this.volume.data('slider').val(this.volumeBackup * 100);
        } else {
            this.volumeBackup = this.audio.volume;
            this.volume.data('slider').val(0);
            this.audio.volume = 0;
        }
    },

    _setInfo: function(a, b){
        this.player.find(".info-box").html(Utils.secondsToFormattedString(Math.round(a)) + " / " + Utils.secondsToFormattedString(Math.round(b)));
    },

    _setBuffer: function(){
        var buffer = this.audio.buffered.length ? Math.round(Math.floor(this.audio.buffered.end(0)) / Math.floor(this.audio.duration) * 100) : 0;
        this.stream.data('slider').buff(buffer);
    },

    _setVolume: function(){
        var audio = this.audio, player = this.player, o = this.options;

        var volumeButton = player.find(".mute");
        var volume = audio.volume * 100;
        if (volume > 1 && volume < 30) {
            volumeButton.html(o.volumeLowIcon);
        } else if (volume >= 30 && volume < 60) {
            volumeButton.html(o.volumeMediumIcon);
        } else if (volume >= 60 && volume <= 100) {
            volumeButton.html(o.volumeHighIcon);
        } else {
            volumeButton.html(o.muteIcon);
        }
    },

    play: function(src){
        if (src !== undefined) {
            this._setSource(src);
        }

        if (this.element.attr("src") === undefined && this.element.find("source").length === 0) {
            return ;
        }

        this.audio.play();
    },

    pause: function(){
        this.audio.pause();
    },

    resume: function(){
        if (this.audio.paused) {
            this.play();
        }
    },

    stop: function(){
        this.audio.pause();
        this.audio.currentTime = 0;
        this.stream.data('slider').val(0);
    },

    volume: function(v){
        if (v === undefined) {
            return this.audio.volume;
        }

        if (v > 1) {
            v /= 100;
        }

        this.audio.volume = v;
        this.volume.data('slider').val(v*100);
    },

    loop: function(){
        this._toggleLoop();
    },

    mute: function(){
        this._toggleMute();
    },

    changeSource: function(){
        var src = JSON.parse(this.element.attr('data-src'));
        this.play(src);
    },

    changeVolume: function(){
        var volume = this.element.attr("data-volume");
        this.volume(volume);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-src": this.changeSource(); break;
            case "data-volume": this.changeVolume(); break;
        }
    },

    destroy: function(){
        var element = this.element, player = this.player;

        element.off("loadstart");
        element.off("loadedmetadata");
        element.off("canplay");
        element.off("progress");
        element.off("timeupdate");
        element.off("waiting");
        element.off("loadeddata");
        element.off("play");
        element.off("pause");
        element.off("stop");
        element.off("ended");
        element.off("volumechange");
        player.off(Metro.events.click, ".play");
        player.off(Metro.events.click, ".stop");
        player.off(Metro.events.click, ".mute");
        player.off(Metro.events.click, ".loop");

        Metro.destroyPlugin(this.stream, "slider");
        Metro.destroyPlugin(this.volume, "slider");

        element.insertBefore(player);
        player.html("").remove();
    }
};

Metro.plugin('audio', Audio);

// Source: js/plugins/button-group.js
var ButtonGroup = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.active = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        targets: "button",
        clsActive: "active",
        requiredButton: false,
        mode: Metro.groupMode.ONE,
        onButtonClick: Metro.noop,
        onButtonsGroupCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createGroup();
        this._createEvents();

        Utils.exec(o.onButtonsGroupCreate, [element]);
    },

    _createGroup: function(){
        var that = this, element = this.element, o = this.options;
        var cls, buttons, buttons_active, id = Utils.elementId("button-group");

        if (element.attr("id") === undefined) {
            element.attr("id", id);
        }

        element.addClass("button-group");

        buttons = element.find( o.targets );
        buttons_active = element.find( "." + o.clsActive );

        if (o.mode === Metro.groupMode.ONE && buttons_active.length === 0 && o.requiredButton === true) {
            $(buttons[0]).addClass(o.clsActive);
        }

        if (o.mode === Metro.groupMode.ONE && buttons_active.length > 1) {
            buttons.removeClass(o.clsActive);
            $(buttons[0]).addClass(o.clsActive);
        }

        element.find( "." + o.clsActive ).addClass("js-active");
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, o.targets, function(){
            var el = $(this);

            Utils.exec(o.onButtonClick, [el], this);

            if (o.mode === Metro.groupMode.ONE && el.hasClass(o.clsActive)) {
                return ;
            }

            if (o.mode === Metro.groupMode.ONE) {
                element.find(o.targets).removeClass(o.clsActive).removeClass("js-active");
                el.addClass(o.clsActive).addClass("js-active");
            } else {
                el.toggleClass(o.clsActive).toggleClass("js-active");
            }

        });
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var element = this.element, o = this.options;
        element.off(Metro.events.click, o.targets);
        element.find(o.targets).removeClass(o.clsActive).removeClass("js-active");
    }

};

Metro.plugin('buttongroup', ButtonGroup);

// Source: js/plugins/calendar.js
var Calendar = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.today = new Date();
        this.today.setHours(0,0,0,0);
        this.show = new Date();
        this.show.setHours(0,0,0,0);
        this.current = {
            year: this.show.getFullYear(),
            month: this.show.getMonth(),
            day: this.show.getDate()
        };
        this.preset = [];
        this.selected = [];
        this.exclude = [];
        this.special = [];
        this.min = null;
        this.max = null;
        this.locale = null;
        this.minYear = this.current.year - this.options.yearsBefore;
        this.maxYear = this.current.year + this.options.yearsAfter;
        this.offset = (new Date()).getTimezoneOffset() / 60 + 1;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        pickerMode: false,
        show: null,
        locale: METRO_LOCALE,
        weekStart: METRO_WEEK_START,
        outside: true,
        buttons: 'cancel, today, clear, done',
        yearsBefore: 100,
        yearsAfter: 100,
        headerFormat: "%A, %b %e",
        showHeader: true,
        showFooter: true,
        showTimeField: true,
        clsCalendar: "",
        clsCalendarHeader: "",
        clsCalendarContent: "",
        clsCalendarFooter: "",
        clsCalendarMonths: "",
        clsCalendarYears: "",
        clsToday: "",
        clsSelected: "",
        clsExcluded: "",
        clsCancelButton: "",
        clsTodayButton: "",
        clsClearButton: "",
        clsDoneButton: "",
        isDialog: false,
        ripple: false,
        rippleColor: "#cccccc",
        exclude: null,
        preset: null,
        minDate: null,
        maxDate: null,
        weekDayClick: false,
        multiSelect: false,
        special: null,
        onCancel: Metro.noop,
        onToday: Metro.noop,
        onClear: Metro.noop,
        onDone: Metro.noop,
        onDayClick: Metro.noop,
        onWeekDayClick: Metro.noop,
        onMonthChange: Metro.noop,
        onYearChange: Metro.noop,
        onCalendarCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        element.html("").addClass("calendar").addClass(o.clsCalendar);

        if (o.preset !== null) {
            if (Array.isArray(o.preset) === false) {
                o.preset = o.preset.split(",").map(function(item){
                    return item.trim();
                });
            }

            $.each(o.preset, function(){
                if (Utils.isDate(this) === false) {
                    return ;
                }
                that.selected.push((new Date(this)).getTime());
            });
        }

        if (o.exclude !== null) {
            if (Array.isArray(o.exclude) === false) {
                o.exclude = o.exclude.split(",").map(function(item){
                    return item.trim();
                });
            }

            $.each(o.exclude, function(){
                if (Utils.isDate(this) === false) {
                    return ;
                }
                that.exclude.push((new Date(this)).getTime());
            });
        }

        if (o.special !== null) {
            if (Array.isArray(o.special) === false) {
                o.special = o.special.split(",").map(function(item){
                    return item.trim();
                });
            }

            $.each(o.special, function(){
                if (Utils.isDate(this) === false) {
                    return ;
                }
                that.special.push((new Date(this)).getTime());
            });
        }

        if (o.buttons !== false) {
            if (Array.isArray(o.buttons) === false) {
                o.buttons = o.buttons.split(",").map(function(item){
                    return item.trim();
                });
            }
        }

        if (o.minDate !== null && Utils.isDate(o.minDate)) {
            this.min = (new Date(o.minDate)).addHours(this.offset);
        }

        if (o.maxDate !== null && Utils.isDate(o.maxDate)) {
            this.max = (new Date(o.maxDate)).addHours(this.offset);
        }

        if (o.show !== null && Utils.isDate(o.show)) {
            this.show = (new Date(o.show)).addHours(this.offset);
            this.current = {
                year: this.show.getFullYear(),
                month: this.show.getMonth(),
                day: this.show.getDate()
            }
        }

        this.locale = Metro.locales[o.locale] !== undefined ? Metro.locales[o.locale] : Metro.locales["en-US"];

        this._build();
    },

    _build: function(){
        var element = this.element;

        this._drawCalendar();
        this._bindEvents();

        if (this.options.ripple === true) {
            element.ripple({
                rippleTarget: ".button, .prev-month, .next-month, .prev-year, .next-year, .day",
                rippleColor: this.options.rippleColor
            });
        }


        Utils.exec(this.options.onCalendarCreate, [this.element]);
    },

    _bindEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".prev-month, .next-month, .prev-year, .next-year", function(e){
            var new_date, el = $(this);

            if (el.hasClass("prev-month")) {
                new_date = new Date(that.current.year, that.current.month - 1, 1);
                if (new_date.getFullYear() < that.minYear) {
                    return ;
                }
            }
            if (el.hasClass("next-month")) {
                new_date = new Date(that.current.year, that.current.month + 1, 1);
                if (new_date.getFullYear() > that.maxYear) {
                    return ;
                }
            }
            if (el.hasClass("prev-year")) {
                new_date = new Date(that.current.year - 1, that.current.month, 1);
                if (new_date.getFullYear() < that.minYear) {
                    return ;
                }
            }
            if (el.hasClass("next-year")) {
                new_date = new Date(that.current.year + 1, that.current.month, 1);
                if (new_date.getFullYear() > that.maxYear) {
                    return ;
                }
            }

            that.current = {
                year: new_date.getFullYear(),
                month: new_date.getMonth(),
                day: new_date.getDate()
            };
            setTimeout(function(){
                that._drawContent();
                if (el.hasClass("prev-month") || el.hasClass("next-month")) {
                    Utils.exec(o.onMonthChange, [that.current, element], element[0]);
                }
                if (el.hasClass("prev-year") || el.hasClass("next-year")) {
                    Utils.exec(o.onYearChange, [that.current, element], element[0]);
                }
            }, o.ripple ? 300 : 0);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".button.today", function(e){
            that.today = new Date();
            that.current = {
                year: that.today.getFullYear(),
                month: that.today.getMonth(),
                day: that.today.getDate()
            };
            that._drawHeader();
            that._drawContent();
            Utils.exec(o.onToday, [that.today, element]);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".button.clear", function(e){
            that.selected = [];
            that._drawContent();
            Utils.exec(o.onClear, [element]);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".button.cancel", function(e){
            that._drawContent();
            Utils.exec(o.onCancel, [element]);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".button.done", function(e){
            that._drawContent();
            Utils.exec(o.onDone, [that.selected, element]);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".week-days .day", function(e){
            if (o.weekDayClick === false || o.multiSelect === false) {
                return ;
            }
            var day = $(this);
            var index = day.index();
            var days = o.outside === true ? element.find(".days-row .day:nth-child("+(index + 1)+")") : element.find(".days-row .day:not(.outside):nth-child("+(index + 1)+")");
            $.each(days, function(){
                var d = $(this);
                var dd = d.data('day');
                Utils.arrayDelete(that.selected, dd);
                that.selected.push(dd);
                d.addClass("selected").addClass(o.clsSelected);
            });
            Utils.exec(o.onWeekDayClick, [that.selected, day, element]);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".days-row .day", function(e){
            var day = $(this);
            var index, date;

            date = day.data('day');
            index = that.selected.indexOf(date);

            if (day.hasClass("outside")) {
                date = new Date(date);
                that.current = {
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    day: date.getDate()
                };
                that._drawContent();
                return ;
            }

            if (o.pickerMode === true) {
                that.selected = [date];
                that.today = new Date(date);
                that.current.year = that.today.getFullYear();
                that.current.month = that.today.getMonth();
                that.current.day = that.today.getDate();
                that._drawHeader();
                that._drawContent();
            } else {
                if (index === -1) {
                    if (o.multiSelect === false) {
                        element.find(".days-row .day").removeClass("selected").removeClass(o.clsSelected);
                        that.selected = [];
                    }
                    that.selected.push(date);
                    day.addClass("selected").addClass(o.clsSelected);
                } else {
                    day.removeClass("selected").removeClass(o.clsSelected);
                    Utils.arrayDelete(that.selected, date);
                }
            }

            Utils.exec(o.onDayClick, [that.selected, day, element]);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".curr-month", function(e){
            var target;
            var list = element.find(".months-list");

            list.find(".active").removeClass("active");
            list.scrollTop(0);
            element.find(".calendar-months").addClass("open");

            target = list.find(".js-month-"+that.current.month).addClass("active");

            setTimeout(function(){
                list.animate({
                    scrollTop: target.position().top - ( (list.height() - target.height() )/ 2)
                }, 200);
            }, 300);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".calendar-months li", function(e){
            that.current.month = $(this).index();
            that._drawContent();
            Utils.exec(o.onMonthChange, [that.current, element], element[0]);
            element.find(".calendar-months").removeClass("open");
            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".curr-year", function(e){
            var target;
            var list = element.find(".years-list");

            list.find(".active").removeClass("active");
            list.scrollTop(0);
            element.find(".calendar-years").addClass("open");

            target = list.find(".js-year-"+that.current.year).addClass("active");

            setTimeout(function(){
                list.animate({
                    scrollTop: target.position().top - ( (list.height() - target.height() )/ 2)
                }, 200);
            }, 300);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".calendar-years li", function(e){
            that.current.year = $(this).text();
            that._drawContent();
            Utils.exec(o.onYearChange, [that.current, element], element[0]);
            element.find(".calendar-years").removeClass("open");
            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, function(e){
            var months = element.find(".calendar-months");
            var years = element.find(".calendar-years");
            if (months.hasClass("open")) {
                months.removeClass("open");
            }
            if (years.hasClass("open")) {
                years.removeClass("open");
            }
            e.preventDefault();
            e.stopPropagation();
        });
    },

    _drawHeader: function(){
        var element = this.element, o = this.options;
        var header = element.find(".calendar-header");

        if (header.length === 0) {
            header = $("<div>").addClass("calendar-header").addClass(o.clsCalendarHeader).appendTo(element);
        }

        header.html("");

        $("<div>").addClass("header-year").html(this.today.getFullYear()).appendTo(header);
        $("<div>").addClass("header-day").html(this.today.format(o.headerFormat, o.locale)).appendTo(header);

        if (o.showHeader === false) {
            header.hide();
        }
    },

    _drawFooter: function(){
        var element = this.element, o = this.options;
        var buttons_locale = this.locale['buttons'];
        var footer = element.find(".calendar-footer");

        if (o.buttons === false) {
            return ;
        }

        if (footer.length === 0) {
            footer = $("<div>").addClass("calendar-footer").addClass(o.clsCalendarFooter).appendTo(element);
        }

        footer.html("");

        $.each(o.buttons, function(){
            var button = $("<button>").attr("type", "button").addClass("button " + this + " " + o['cls'+this.capitalize()+'Button']).html(buttons_locale[this]).appendTo(footer);
            if (this === 'cancel' || this === 'done') {
                button.addClass("js-dialog-close");
            }
        });

        if (o.showFooter === false) {
            footer.hide();
        }
    },

    _drawMonths: function(){
        var element = this.element, o = this.options;
        var months = $("<div>").addClass("calendar-months").addClass(o.clsCalendarMonths).appendTo(element);
        var list = $("<ul>").addClass("months-list").appendTo(months);
        var calendar_locale = this.locale['calendar'];
        var i;
        for(i = 0; i < 12; i++) {
            $("<li>").addClass("js-month-"+i).html(calendar_locale['months'][i]).appendTo(list);
        }
    },

    _drawYears: function(){
        var element = this.element, o = this.options;
        var years = $("<div>").addClass("calendar-years").addClass(o.clsCalendarYears).appendTo(element);
        var list = $("<ul>").addClass("years-list").appendTo(years);
        var i;
        for(i = this.minYear; i <= this.maxYear; i++) {
            $("<li>").addClass("js-year-"+i).html(i).appendTo(list);
        }
    },

    _drawContent: function(){
        var element = this.element, o = this.options;
        var content = element.find(".calendar-content"), toolbar;
        var calendar_locale = this.locale['calendar'];
        var i, j, d, s, counter = 0;
        var first = new Date(this.current.year, this.current.month, 1);
        var first_day;
        var prev_month_days = (new Date(this.current.year, this.current.month, 0)).getDate();
        var year, month;

        if (content.length === 0) {
            content = $("<div>").addClass("calendar-content").addClass(o.clsCalendarContent).appendTo(element);
        }
        content.html("");

        toolbar = $("<div>").addClass("calendar-toolbar").appendTo(content);

        /**
         * Calendar toolbar
         */
        $("<span>").addClass("prev-month").appendTo(toolbar);
        $("<span>").addClass("curr-month").html(calendar_locale['months'][this.current.month]).appendTo(toolbar);
        $("<span>").addClass("next-month").appendTo(toolbar);

        $("<span>").addClass("prev-year").appendTo(toolbar);
        $("<span>").addClass("curr-year").html(this.current.year).appendTo(toolbar);
        $("<span>").addClass("next-year").appendTo(toolbar);

        /**
         * Week days
         */
        var week_days = $("<div>").addClass("week-days").appendTo(content);
        for (i = 0; i < 7; i++) {
            if (o.weekStart === 0) {
                j = i;
            } else {
                j = i + 1;
                if (j === 7) j = 0;
            }
            $("<span>").addClass("day").html(calendar_locale["days"][j + 7]).appendTo(week_days);
        }

        /**
         * Calendar days
         */
        var days = $("<div>").addClass("days").appendTo(content);
        var days_row = $("<div>").addClass("days-row").appendTo(days);

        first_day = o.weekStart === 0 ? first.getDay() : (first.getDay() === 0 ? 6 : first.getDay() - 1);

        if (this.current.month - 1 < 0) {
            month = 11;
            year = this.current.year - 1;
        } else {
            month = this.current.month - 1;
            year = this.current.year;
        }

        for(i = 0; i < first_day; i++) {
            var v = prev_month_days - first_day + i + 1;
            d = $("<div>").addClass("day outside").appendTo(days_row);

            s = new Date(year, month, v);
            s.setHours(0,0,0,0);

            d.data('day', s.getTime());

            if (o.outside === true) {
                d.html(v);

                if (this.special.length === 0) {
                    if (this.selected.indexOf(s.getTime()) !== -1) {
                        d.addClass("selected").addClass(o.clsSelected);
                    }
                    if (this.exclude.indexOf(s.getTime()) !== -1) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }
                    if (this.min !== null && s < this.min) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }
                    if (this.max !== null && s > this.max) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }
                } else {
                    if (this.special.indexOf(s.getTime()) === -1) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }
                }
            }

            counter++;
        }

        first.setHours(0,0,0,0);
        while(first.getMonth() === this.current.month) {
            d = $("<div>").addClass("day").html(first.getDate()).appendTo(days_row);

            d.data('day', first.getTime());

            if (
                this.today.getFullYear() === first.getFullYear() &&
                this.today.getMonth() === first.getMonth() &&
                this.today.getDate() === first.getDate()
            ) {
                d.addClass("today").addClass(o.clsToday);
            }

            if (this.special.length === 0) {

                if (this.selected.indexOf(first.getTime()) !== -1) {
                    d.addClass("selected").addClass(o.clsSelected);
                }
                if (this.exclude.indexOf(first.getTime()) !== -1) {
                    d.addClass("disabled excluded").addClass(o.clsExcluded);
                }

                if (this.min !== null && first.getTime() < this.min.getTime()) {
                    d.addClass("disabled excluded").addClass(o.clsExcluded);
                }
                if (this.max !== null && first.getTime() > this.max.getTime()) {
                    d.addClass("disabled excluded").addClass(o.clsExcluded);
                }

            } else {

                if (this.special.indexOf(first.getTime()) === -1) {
                    d.addClass("disabled excluded").addClass(o.clsExcluded);
                }

            }

            counter++;
            if (counter % 7 === 0) {
                days_row = $("<div>").addClass("days-row").appendTo(days);
            }
            first.setDate(first.getDate() + 1);
            first.setHours(0,0,0,0);
        }

        first_day = o.weekStart === 0 ? first.getDay() : (first.getDay() === 0 ? 6 : first.getDay() - 1);

        if (this.current.month + 1 > 11) {
            month = 0;
            year = this.current.year + 1;
        } else {
            month = this.current.month + 1;
            year = this.current.year;
        }

        if (first_day > 0) for(i = 0; i < 7 - first_day; i++) {
            d = $("<div>").addClass("day outside").appendTo(days_row);
            s = new Date(year, month, i + 1);
            s.setHours(0,0,0,0);
            d.data('day', s.getTime());
            if (o.outside === true) {
                d.html(i + 1);

                if (this.special.length === 0) {

                    if (this.selected.indexOf(s.getTime()) !== -1) {
                        d.addClass("selected").addClass(o.clsSelected);
                    }
                    if (this.exclude.indexOf(s.getTime()) !== -1) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }
                    if (this.min !== null && s.getTime() < this.min.getTime()) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }
                    if (this.max !== null && s.getTime() > this.max.getTime()) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }
                } else {
                    if (this.special.indexOf(s.getTime()) === -1) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }
                }
            }
        }
    },

    _drawCalendar: function(){
        this.element.html("");
        this._drawHeader();
        this._drawContent();
        this._drawFooter();
        this._drawMonths();
        this._drawYears();
    },

    getPreset: function(){
        return this.preset;
    },

    getSelected: function(){
        return this.selected;
    },

    getExcluded: function(){
        return this.exclude;
    },

    getToday: function(){
        return this.today;
    },

    getCurrent: function(){
        return this.current;
    },

    setExclude: function(exclude){
        var that = this, element = this.element, o = this.options;

        o.exclude = exclude !== undefined ? exclude : element.attr("data-exclude");

        if (o.exclude !== null) {
            if (Array.isArray(o.exclude) === false) {
                o.exclude = o.exclude.split(",").map(function(item){
                    return item.trim();
                });
            }

            $.each(o.exclude, function(){
                if (Utils.isDate(this) === false) {
                    return ;
                }
                that.exclude.push((new Date(this)).getTime());
            });
        }

        this._drawContent();
    },

    setPreset: function(preset){
        var that = this, element = this.element, o = this.options;

        o.preset = preset !== undefined ? preset : element.attr("data-preset");

        if (o.preset !== null) {

            that.selected = [];

            if (Array.isArray(o.preset) === false) {
                o.preset = o.preset.split(",").map(function(item){
                    return item.trim();
                });
            }

            $.each(o.preset, function(){
                if (Utils.isDate(this) === false) {
                    return ;
                }
                that.selected.push((new Date(this)).getTime());
            });
        }

        this._drawContent();
    },

    setSpecial: function(special){
        var that = this, element = this.element, o = this.options;

        o.special = special !== undefined ? special : element.attr("data-special");

        if (o.special !== null) {

            that.special = [];

            if (Array.isArray(o.special) === false) {
                o.special = o.special.split(",").map(function(item){
                    return item.trim();
                });
            }

            $.each(o.special, function(){
                if (Utils.isDate(this) === false) {
                    return ;
                }
                that.special.push((new Date(this)).getTime());
            });
        }

        this._drawContent();
    },

    setShow: function(show){
        var that = this, element = this.element, o = this.options;

        o.show = show !== null ? show : element.attr("data-show");

        if (o.show !== null && Utils.isDate(o.show)) {
            this.show = new Date(o.show);
            this.show.setHours(0,0,0,0);
            this.current = {
                year: this.show.getFullYear(),
                month: this.show.getMonth(),
                day: this.show.getDate()
            }
        }

        this._drawContent();
    },

    setMinDate: function(date){
        var that = this, element = this.element, o = this.options;

        o.minDate = date !== null ? date : element.attr("data-min-date");

        this._drawContent();
    },

    setMaxDate: function(date){
        var that = this, element = this.element, o = this.options;

        o.maxDate = date !== null ? date : element.attr("data-max-date");

        this._drawContent();
    },

    setToday: function(val){
        if (Utils.isDate(val) === false) {
            return ;
        }
        this.today = new Date(val);
        this.today.setHours(0,0,0,0);
        this._drawHeader();
        this._drawContent();
    },

    i18n: function(val){
        var that = this, element = this.element, o = this.options;
        if (val === undefined) {
            return o.locale;
        }
        if (Metro.locales[val] === undefined) {
            return false;
        }
        o.locale = val;
        this.locale = Metro.locales[o.locale];
        this._drawCalendar();
    },

    changeAttrLocale: function(){
        var that = this, element = this.element, o = this.options;
        this.i18n(element.attr("data-locale"));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'data-exclude': this.setExclude(); break;
            case 'data-preset': this.setPreset(); break;
            case 'data-special': this.setSpecial(); break;
            case 'data-show': this.setShow(); break;
            case 'data-min-date': this.setMinDate(); break;
            case 'data-max-date': this.setMaxDate(); break;
            case 'data-locale': this.changeAttrLocale(); break;
        }
    },

    destroy: function(){
        var element = this.element, o = this.options;

        element.off(Metro.events.click, ".prev-month, .next-month, .prev-year, .next-year");
        element.off(Metro.events.click, ".button.today");
        element.off(Metro.events.click, ".button.clear");
        element.off(Metro.events.click, ".button.cancel");
        element.off(Metro.events.click, ".button.done");
        element.off(Metro.events.click, ".week-days .day");
        element.off(Metro.events.click, ".days-row .day");
        element.off(Metro.events.click, ".curr-month");
        element.off(Metro.events.click, ".calendar-months li");
        element.off(Metro.events.click, ".curr-year");
        element.off(Metro.events.click, ".calendar-years li");
        element.off(Metro.events.click);

        if (o.ripple === true) Metro.destroyPlugin(element, "ripple");

        element.html("");
    }
};

$(document).on(Metro.events.click, function(e){
    $('.calendar .calendar-years').each(function(){
        $(this).removeClass("open");
    });
    $('.calendar .calendar-months').each(function(){
        $(this).removeClass("open");
    });
});

Metro.plugin('calendar', Calendar);

// Source: js/plugins/calendarpicker.js
var CalendarPicker = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.value = null;
        this.value_date = null;
        this.calendar = null;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onCalendarPickerCreate, [this.element]);

        return this;
    },

    dependencies: ['calendar'],

    options: {
        locale: METRO_LOCALE,
        size: "100%",
        format: "%Y/%m/%d",
        headerFormat: "%A, %b %e",
        clearButton: false,
        calendarButtonIcon: "<span class='default-icon-calendar'></span>",
        clearButtonIcon: "<span class='default-icon-cross'></span>",
        copyInlineStyles: false,
        clsPicker: "",
        clsInput: "",

        yearsBefore: 100,
        yearsAfter: 100,
        weekStart: METRO_WEEK_START,
        outside: true,
        clsCalendar: "",
        clsCalendarHeader: "",
        clsCalendarContent: "",
        clsCalendarFooter: "",
        clsCalendarMonths: "",
        clsCalendarYears: "",
        clsToday: "",
        clsSelected: "",
        clsExcluded: "",
        ripple: false,
        rippleColor: "#cccccc",
        exclude: null,
        preset: null,
        minDate: null,
        maxDate: null,
        special: null,
        showHeader: true,
        showFooter: true,

        onDayClick: Metro.noop,
        onCalendarPickerCreate: Metro.noop,
        onCalendarShow: Metro.noop,
        onCalendarHide: Metro.noop,
        onChange: Metro.noop,
        onMonthChange: Metro.noop,
        onYearChange: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var container = $("<div>").addClass("input " + element[0].className + " calendar-picker");
        var buttons = $("<div>").addClass("button-group");
        var calendarButton, clearButton, cal = $("<div>").addClass("drop-shadow");

        if (element.attr("type") === undefined) {
            element.attr("type", "text");
        }

        this.value = element.val();
        if (Utils.isDate(this.value)) {
            this.value_date = new Date(this.value);
            this.value_date.setHours(0,0,0,0);
            element.val(this.value_date.format(o.format));
        }

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);
        buttons.appendTo(container);
        cal.appendTo(container);

        cal.calendar({
            pickerMode: true,
            show: o.value,
            locale: o.locale,
            weekStart: o.weekStart,
            outside: o.outside,
            buttons: false,
            headerFormat: o.headerFormat,
            clsCalendar: o.clsCalendar,
            clsCalendarHeader: o.clsCalendarHeader,
            clsCalendarContent: o.clsCalendarContent,
            clsCalendarFooter: o.clsCalendarFooter,
            clsCalendarMonths: o.clsCalendarMonths,
            clsCalendarYears: o.clsCalendarYears,
            clsToday: o.clsToday,
            clsSelected: o.clsSelected,
            clsExcluded: o.clsExcluded,
            ripple: o.ripple,
            rippleColor: o.rippleColor,
            exclude: o.exclude,
            minDate: o.minDate,
            maxDate: o.maxDate,
            yearsBefore: o.yearsBefore,
            yearsAfter: o.yearsAfter,
            special: o.special,
            showHeader: o.showHeader,
            showFooter: o.showFooter,
            onDayClick: function(sel, day, el){
                var date = new Date(sel[0]);
                that.value = date.format("%Y/%m/%d");
                that.value_date = date;
                element.val(date.format(o.format, o.locale));
                element.trigger("change");
                cal.removeClass("open open-up");
                cal.hide();
                Utils.exec(o.onChange, [that.value, that.value_date, element]);
                Utils.exec(o.onDayClick, [sel, day, el]);
            },
            onMonthChange: o.onMonthChange,
            onYearChange: o.onYearChange
        });

        cal.hide();

        this.calendar = cal;

        calendarButton = $("<button>").addClass("button").attr("tabindex", -1).attr("type", "button").html(o.calendarButtonIcon);
        calendarButton.appendTo(buttons);
        container.on(Metro.events.click, "button, input", function(e){
            if (Utils.isDate(that.value) && (cal.hasClass("open") === false && cal.hasClass("open-up") === false)) {
                cal.css({
                    visibility: "hidden",
                    display: "block"
                });
                cal.data('calendar').setPreset(that.value);
                cal.data('calendar').setShow(that.value);
                cal.data('calendar').setToday(that.value);
                cal.css({
                    visibility: "visible",
                    display: "none"
                });
            }
            if (cal.hasClass("open") === false && cal.hasClass("open-up") === false) {
                $(".calendar-picker .calendar").removeClass("open open-up").hide();
                cal.addClass("open");
                if (Utils.isOutsider(cal) === false) {
                    cal.addClass("open-up");
                }
                cal.show();
                Utils.exec(o.onCalendarShow, [element, cal]);
            } else {
                cal.removeClass("open open-up");
                cal.hide();
                Utils.exec(o.onCalendarHide, [element, cal]);
            }
            e.preventDefault();
            e.stopPropagation();
        });

        if (o.clearButton === true) {
            clearButton = $("<button>").addClass("button").attr("tabindex", -1).attr("type", "button").html(o.clearButtonIcon);
            clearButton.on(Metro.events.click, function () {
                element.val("").trigger('change');
            });
            clearButton.appendTo(buttons);
        }

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl");
        }

        if (String(o.size).indexOf("%") > -1) {
            container.css({
                width: o.size
            });
        } else {
            container.css({
                width: parseInt(o.size) + "px"
            });
        }

        element[0].className = '';
        element.attr("readonly", true);

        if (o.copyInlineStyles === true) {
            $.each(Utils.getInlineStyles(element), function(key, value){
                container.css(key, value);
            });
        }

        container.addClass(o.clsPicker);
        element.addClass(o.clsInput);

        element.on(Metro.events.blur, function(){container.removeClass("focused");});
        element.on(Metro.events.focus, function(){container.addClass("focused");});
        element.on(Metro.events.change, function(){
            Utils.exec(o.onChange, [that.value_date, that.value, element]);
        });
    },

    val: function(v){
        var that = this, element = this.element, o = this.options;

        if (v === undefined) {
            return this.value_date;
        }

        if (Utils.isDate(v) === true) {
            this.value_date = new Date(v);
            this.value = this.value_date.format(o.format);
            element.val(this.value_date.format(o.format));
            element.trigger("change");
        }
    },

    changeValue: function(){
        var that = this, element = this.element, o = this.options;
        this.val(element.attr("value"));
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    i18n: function(val){
        var that = this, element = this.element, o = this.options;
        var hidden = false;
        var cal = this.calendar;
        if (val === undefined) {
            return o.locale;
        }
        if (Metro.locales[val] === undefined) {
            return false;
        }

        hidden = cal.is(':hidden');
        if (hidden) {
            cal.css({
                visibility: "hidden",
                display: "block"
            });
        }
        cal.data('calendar').i18n(val);
        if (hidden) {
            cal.css({
                visibility: "visible",
                display: "none"
            });
        }
    },

    changeAttrLocale: function(){
        var that = this, element = this.element, o = this.options;
        this.i18n(element.attr("data-locale"));
    },

    changeAttrSpecial: function(){
        var that = this, element = this.element, o = this.options;
        var cal = this.calendar.data("calendar");
        cal.setSpecial(element.attr("data-special"));
    },

    changeAttrExclude: function(){
        var that = this, element = this.element, o = this.options;
        var cal = this.calendar.data("calendar");
        cal.setExclude(element.attr("data-exclude"));
    },

    changeAttrMinDate: function(){
        var that = this, element = this.element, o = this.options;
        var cal = this.calendar.data("calendar");
        cal.setMinDate(element.attr("data-min-date"));
    },

    changeAttrMaxDate: function(){
        var that = this, element = this.element, o = this.options;
        var cal = this.calendar.data("calendar");
        cal.setMaxDate(element.attr("data-max-date"));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "value": this.changeValue(); break;
            case 'disabled': this.toggleState(); break;
            case 'data-locale': this.changeAttrLocale(); break;
            case 'data-special': this.changeAttrSpecial(); break;
            case 'data-exclude': this.changeAttrExclude(); break;
            case 'data-min-date': this.changeAttrMinDate(); break;
            case 'data-max-date': this.changeAttrMaxDate(); break;
        }
    }
};

Metro.plugin('calendarpicker', CalendarPicker);

$(document).on(Metro.events.click, function(e){
    $(".calendar-picker .calendar").removeClass("open open-up").hide();
});


// Source: js/plugins/carousel.js
var Carousel = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.height = 0;
        this.width = 0;
        this.slides = [];
        this.current = null;
        this.currentIndex = null;
        this.dir = this.options.direction;
        this.interval = null;
        this.isAnimate = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        autoStart: false,
        width: "100%",
        height: "16/9", // 3/4, 21/9
        effect: "slide", // slide, fade, switch, slowdown, custom
        effectFunc: "linear",
        direction: "left", //left, right
        duration: METRO_ANIMATION_DURATION,
        period: 5000,
        stopOnMouse: true,

        controls: true,
        bullets: true,
        bulletStyle: "square", // square, circle, rect, diamond
        controlsOnMouse: false,
        controlsOutside: false,
        bulletsPosition: "default", // default, left, right

        controlPrev: '&#x23F4',
        controlNext: '&#x23F5',
        clsCarousel: "",
        clsSlides: "",
        clsSlide: "",
        clsControls: "",
        clsControlNext: "",
        clsControlPrev: "",
        clsBullets: "",
        clsBullet: "",
        clsBulletOn: "",
        clsThumbOn: "",

        onStop: Metro.noop,
        onStart: Metro.noop,
        onPlay: Metro.noop,
        onSlideClick: Metro.noop,
        onBulletClick: Metro.noop,
        onThumbClick: Metro.noop,
        onMouseEnter: Metro.noop,
        onMouseLeave: Metro.noop,
        onNextClick: Metro.noop,
        onPrevClick: Metro.noop,
        onCarouselCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;
        var slides = element.find(".slide");
        var slides_container = element.find(".slides");
        var maxHeight = 0;
        var id = Utils.elementId("carousel");

        if (element.attr("id") === undefined) {
            element.attr("id", id);
        }

        element.addClass("carousel").addClass(o.clsCarousel);
        if (o.controlsOutside === true) {
            element.addClass("controls-outside");
        }

        if (slides_container.length === 0) {
            slides_container = $("<div>").addClass("slides").appendTo(element);
            slides.appendTo(slides_container);
        }

        slides.addClass(o.clsSlides);

        if (slides.length === 0) {
            Utils.exec(this.options.onCarouselCreate, [this.element]);
            return ;
        }

        this._createSlides();
        this._createControls();
        this._createBullets();
        this._createEvents();
        this._resize();

        if (o.controlsOnMouse === true) {
            element.find("[class*=carousel-switch]").hide();
            element.find(".carousel-bullets").hide();
        }

        if (o.autoStart === true) {
            this._start();
        }

        Utils.exec(this.options.onCarouselCreate, [this.element]);
    },

    _start: function(){
        var that = this, element = this.element, o = this.options;
        var period = o.period;
        var current = this.slides[this.currentIndex];

        if (current.data("period") !== undefined) {
            period = current.data("period");
        }

        if (this.slides.length <= 1) {
            return ;
        }

        this.interval = setTimeout(function run() {
            var t = o.direction === 'left' ? 'next' : 'prior';
            that._slideTo(t, true);
        }, period);
        Utils.exec(o.onStart, [element]);
    },

    _stop: function(){
        clearInterval(this.interval);
        this.interval = false;
    },

    _resize: function(){
        var that = this, element = this.element, o = this.options;
        var width = element.outerWidth();
        var height;
        var medias = [];

        if (["16/9", "21/9", "4/3"].indexOf(o.height) > -1) {
            height = Utils.aspectRatioH(width, o.height);
        } else {
            if (String(o.height).indexOf("@") > -1) {
                medias = Utils.strToArray(o.height.substr(1), "|");
                $.each(medias, function(){
                    var media = Utils.strToArray(this, ",");
                    if (window.matchMedia(media[0]).matches) {
                        if (["16/9", "21/9", "4/3"].indexOf(media[1]) > -1) {
                            height = Utils.aspectRatioH(width, media[1]);
                        } else {
                            height = parseInt(media[1]);
                        }
                    }
                });
            } else {
                height = parseInt(o.height);
            }
        }

        element.css({
            height: height
        });
    },

    _createSlides: function(){
        var that = this, element = this.element, o = this.options;
        var slides = element.find(".slide");

        $.each(slides, function(i){
            var slide = $(this);
            if (slide.data("cover") !== undefined) {
                slide.css({
                    backgroundImage: "url("+slide.data('cover')+")",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                });
            }

            if (i !== 0) {
                switch (o.effect) {
                    case "switch":
                    case "slide":
                        slide.css("left", "100%");
                        break;
                    case "slide-v":
                        slide.css("top", "100%");
                        break;
                    case "fade":
                        slide.css("opacity", "0");
                        break;
                }
            }

            slide.addClass(o.clsSlide);

            that.slides.push(slide);
        });

        this.currentIndex = 0;
        this.current = this.slides[this.currentIndex];
    },

    _createControls: function(){
        var element = this.element, o = this.options;
        var next, prev;

        if (o.controls === false) {
            return ;
        }

        next = $('<span/>').addClass('carousel-switch-next').addClass(o.clsControls).addClass(o.clsControlNext).html(">");
        prev = $('<span/>').addClass('carousel-switch-prev').addClass(o.clsControls).addClass(o.clsControlPrev).html("<");

        if (o.controlNext) {
            next.html(o.controlNext);
        }

        if (o.controlPrev) {
            prev.html(o.controlPrev);
        }

        next.appendTo(element);
        prev.appendTo(element);
    },

    _createBullets: function(){
        var element = this.element, o = this.options;
        var bullets, i;

        if (o.bullets === false) {
            return ;
        }

        bullets = $('<div>').addClass("carousel-bullets").addClass("bullet-style-"+o.bulletStyle).addClass(o.clsBullets);
        if (o.bulletsPosition === 'default' || o.bulletsPosition === 'center') {
            bullets.addClass("flex-justify-center");
        } else if (o.bulletsPosition === 'left') {
            bullets.addClass("flex-justify-start");
        } else {
            bullets.addClass("flex-justify-end");
        }

        for (i = 0; i < this.slides.length; i++) {
            var bullet = $('<span>').addClass("carousel-bullet").addClass(o.clsBullet).data("slide", i);
            if (i === 0) {
                bullet.addClass('bullet-on').addClass(o.clsBulletOn);
            }
            bullet.appendTo(bullets);
        }

        bullets.appendTo(element);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".carousel-bullet", function(e){
            var bullet = $(this);
            if (that.isAnimate === false) {
                that._slideToSlide(bullet.data('slide'));
                Utils.exec(o.onBulletClick, [bullet,  element, e])
            }
        });

        element.on(Metro.events.click, ".carousel-switch-next", function(e){
            if (that.isAnimate === false) {
                that._slideTo("next", false);
                Utils.exec(o.onNextClick, [element, e])
            }
        });

        element.on(Metro.events.click, ".carousel-switch-prev", function(e){
            if (that.isAnimate === false) {
                that._slideTo("prev", false);
                Utils.exec(o.onPrevClick, [element, e])
            }
        });

        if (o.stopOnMouse === true && o.autoStart === true) {
            element.on(Metro.events.enter, function (e) {
                if (o.controlsOnMouse === true) {
                    element.find("[class*=carousel-switch]").fadeIn();
                    element.find(".carousel-bullets").fadeIn();
                }
                that._stop();
                Utils.exec(o.onMouseEnter, [element, e])
            });
            element.on(Metro.events.leave, function (e) {
                if (o.controlsOnMouse === true) {
                    element.find("[class*=carousel-switch]").fadeOut();
                    element.find(".carousel-bullets").fadeOut();
                }
                that._start();
                Utils.exec(o.onMouseLeave, [element, e])
            });
        }

        if (o.controlsOnMouse === true) {
            element.on(Metro.events.enter, function () {
                element.find("[class*=carousel-switch]").fadeIn();
                element.find(".carousel-bullets").fadeIn();
            });
            element.on(Metro.events.leave, function () {
                element.find("[class*=carousel-switch]").fadeOut();
                element.find(".carousel-bullets").fadeOut();
            });
        }

        element.on(Metro.events.click, ".slide", function(e){
            var slide = $(this);
            Utils.exec(o.onSlideClick, [slide, element, e])
        });

        $(window).on(Metro.events.resize + "-" + element.attr("id"), function(){
            that._resize();
        });
    },

    _slideToSlide: function(index){
        var element = this.element, o = this.options;
        var current, next, to;

        if (this.slides[index] === undefined) {
            return ;
        }

        if (this.currentIndex === index) {
            return ;
        }

        to = index > this.currentIndex ? "next" : "prev";
        current = this.slides[this.currentIndex];
        next = this.slides[index];

        this.currentIndex = index;

        this._effect(current, next, o.effect, to);

        element.find(".carousel-bullet").removeClass("bullet-on").removeClass(o.clsBulletOn);
        element.find(".carousel-bullet:nth-child("+(this.currentIndex+1)+")").addClass("bullet-on").addClass(o.clsBulletOn);
    },

    _slideTo: function(to, interval){
        var that = this, element = this.element, o = this.options;
        var current, next;

        if (to === undefined) {
            to = "next";
        }

        current = this.slides[this.currentIndex];

        if (to === "next") {
            this.currentIndex++;
            if (this.currentIndex >= this.slides.length) {
                this.currentIndex = 0;
            }
        } else {
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = this.slides.length - 1;
            }
        }

        next = this.slides[this.currentIndex];

        this._effect(current, next, o.effect, to, interval);

        element.find(".carousel-bullet").removeClass("bullet-on").removeClass(o.clsBulletOn);
        element.find(".carousel-bullet:nth-child("+(this.currentIndex+1)+")").addClass("bullet-on").addClass(o.clsBulletOn);

    },

    _effect: function(current, next, effect, to, interval){
        var that = this, element = this.element, o = this.options;
        var duration = o.duration;
        var func, effectFunc = o.effectFunc;
        var period = o.period;

        if (next.data('duration') !== undefined) {
            duration = next.data('duration');
        }

        if (next.data('effectFunc') !== undefined) {
            effectFunc = next.data('effectFunc');
        }

        if (effect === 'switch') {
            duration = 0;
        }

        current.stop(true, true);
        next.stop(true, true);
        this.isAnimate = true;

        setTimeout(function(){that.isAnimate = false;}, duration);

        if (effect === 'slide') {
            func = to === 'next' ? 'slideLeft': 'slideRight';
        }

        if (effect === 'slide-v') {
            func = to === 'next' ? 'slideUp': 'slideDown';
        }

        switch (effect) {
            case 'slide': Animation[func](current, next, duration, effectFunc); break;
            case 'slide-v': Animation[func](current, next, duration, effectFunc); break;
            case 'fade': Animation['fade'](current, next, duration, effectFunc); break;
            default: Animation['switch'](current, next);
        }

        if (interval === true) {

            if (next.data('period') !== undefined) {
                period = next.data('period');
            }

            this.interval = setTimeout(function run() {
                var t = o.direction === 'left' ? 'next' : 'prior';
                that._slideTo(t, true);
            }, period);
        }
    },

    toSlide: function(index){
        this._slideToSlide(index);
    },

    next: function(){
        this._slideTo("next");
    },

    prev: function(){
        this._slideTo("prev");
    },

    stop: function () {
        clearInterval(this.interval);
        Utils.exec(this.options.onStop, [this.element])
    },

    play: function(){
        this._start();
        Utils.exec(this.options.onPlay, [this.element])
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var that = this, element = this.element, o = this.options;

        element.off(Metro.events.click, ".carousel-bullet");
        element.off(Metro.events.click, ".carousel-switch-next");
        element.off(Metro.events.click, ".carousel-switch-prev");

        if (o.stopOnMouse === true && o.autoStart === true) {
            element.off(Metro.events.enter);
            element.off(Metro.events.leave);
        }

        if (o.controlsOnMouse === true) {
            element.off(Metro.events.enter);
            element.off(Metro.events.leave);
        }

        element.off(Metro.events.click, ".slide");
        $(window).off(Metro.events.resize + "-" + element.attr("id"));

        element.removeClass("carousel").removeClass(o.clsCarousel);
        if (o.controlsOutside === true) {
            element.removeClass("controls-outside");
        }
    }
};

Metro.plugin('carousel', Carousel);

// Source: js/plugins/charms.js
var Charms = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.origin = {
            background: ""
        };

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        position: "right",
        opacity: 1,
        clsCharms: "",
        onCharmCreate: Metro.noop,
        onOpen: Metro.noop,
        onClose: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onCharmCreate, [element]);
    },

    _createStructure: function(){
        var element = this.element, o = this.options;

        element
            .addClass("charms")
            .addClass(o.position + "-side")
            .addClass(o.clsCharms);

        this.origin.background = element.css("background-color");

        element.css({
            backgroundColor: Utils.computedRgbToRgba(Utils.getStyleOne(element, "background-color"), o.opacity)
        });
    },

    _createEvents: function(){
        var element = this.element, o = this.options;

        element.on(Metro.events.click, function(e){
        });
    },

    open: function(){
        var element = this.element, o = this.options;

        element.addClass("open");

        Utils.exec(o.onOpen, [element]);
    },

    close: function(){
        var element = this.element, o = this.options;

        element.removeClass("open");

        Utils.exec(o.onClose, [element]);
    },

    toggle: function(){
        var element = this.element, o = this.options;

        element.toggleClass("open");

        if (element.hasClass("open") === true) {
            Utils.exec(o.onOpen, [element]);
        } else {
            Utils.exec(o.onClose, [element]);
        }
    },

    opacity: function(v){
        var element = this.element, o = this.options;

        if (v === undefined) {
            return o.opacity;
        }

        var opacity = Math.abs(parseFloat(v));
        if (opacity < 0 || opacity > 1) {
            return ;
        }
        o.opacity = opacity;
        element.css({
            backgroundColor: Utils.computedRgbToRgba(Utils.getStyleOne(element, "background-color"), opacity)
        });
    },

    changeOpacity: function(){
        var element = this.element;
        this.opacity(element.attr("data-opacity"));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-opacity": this.changeOpacity(); break;
        }
    },

    destroy: function(){
        var element = this.element, o = this.options;

        element.off(Metro.events.click);

        element
            .removeClass("charms")
            .removeClass(o.position + "-side")
            .removeClass(o.clsCharms);

        element.css("background-color", this.origin.background);
    }
};

Metro.plugin('charms', Charms);

Metro['charms'] = {

    check: function(el){
        if (Utils.isMetroObject(el, "charms") === false) {
            console.log("Element is not a charms component");
            return false;
        }
        return true;
    },

    isOpen: function(el){
        if (this.check(el) === false) return ;

        var charms = $(el).data("charms");

        return charms.hasClass("open");
    },

    open: function(el){
        if (this.check(el) === false) return ;

        var charms = $(el).data("charms");
        charms.open();
    },

    close: function(el){
        if (this.check(el) === false) return ;

        var charms = $(el).data("charms");
        charms.close();
    },

    toggle: function(el){
        if (this.check(el) === false) return ;

        var charms = $(el).data("charms");
        charms.toggle();
    },

    closeAll: function(){
        $('[data-role*=charms]').each(function() {
            $(this).data('charms').close();
        });
    },

    opacity: function(el, opacity){
        if (this.check(el) === false) return ;

        var charms = $(el).data("charms");
        charms.opacity(opacity);
    }
};

// Source: js/plugins/checkbox.js
var Checkbox = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.origin = {
            className: ""
        };

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onCheckboxCreate, [this.element]);

        return this;
    },
    options: {
        caption: "",
        indeterminate: false,
        captionPosition: "right",
        disabled: false,
        clsElement: "",
        clsCheck: "",
        clsCaption: "",
        onCheckboxCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var checkbox = $("<label>").addClass("checkbox " + element[0].className);
        var check = $("<span>").addClass("check");
        var caption = $("<span>").addClass("caption").html(o.caption);

        if (element.attr('id') === undefined) {
            element.attr('id', Utils.elementId("checkbox"));
        }

        checkbox.attr('for', element.attr('id'));

        element.attr("type", "checkbox");
        element.appendTo(checkbox);

        if (prev.length === 0) {
            parent.prepend(checkbox);
        } else {
            checkbox.insertAfter(prev);
        }

        check.appendTo(checkbox);
        caption.appendTo(checkbox);

        if (o.captionPosition === 'left') {
            checkbox.addClass("caption-left");
        }

        this.origin.className = element[0].className;
        element[0].className = '';

        checkbox.addClass(o.clsElement);
        caption.addClass(o.clsCaption);
        check.addClass(o.clsCheck);

        if (o.indeterminate) {
            element[0].indeterminate = true;
        }

        if (o.disabled === true && element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }
    },

    indeterminate: function(){
        this.element[0].indeterminate = true;
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    toggleIndeterminate: function(){
        this.element[0].indeterminate = JSON.parse(this.element.attr("data-indeterminate")) === true;
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
            case 'data-indeterminate': this.toggleIndeterminate(); break;
        }
    },

    destroy: function(){
        var that = this, element = this.element, o = this.options;
        var parent = element.parent();

        element[0].className = this.origin.className;
        element.insertBefore(parent);

        parent.remove();
    }
};

Metro.plugin('checkbox', Checkbox);

// Source: js/plugins/clock.js
var Clock = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this._clockInterval = null;
        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onClockCreate, [this.element]);

        return this;
    },

    options: {
        showTime: true,
        showDate: true,
        timeFormat: '24',
        dateFormat: 'american',
        divider: "&nbsp;&nbsp;",
        onClockCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this;

        this._tick();
        this._clockInterval = setInterval(function(){
            that._tick();
        }, 500);
    },

    _addLeadingZero: function(i){
        if (i<10){i="0" + i;}
        return i;
    },

    _tick: function(){
        var that = this, element = this.element, o = this.options;
        var timestamp = new Date();
        var time = timestamp.getTime();
        var result = "";
        var h = timestamp.getHours(),
            i = timestamp.getMinutes(),
            s = timestamp.getSeconds(),
            d = timestamp.getDate(),
            m = timestamp.getMonth() + 1,
            y = timestamp.getFullYear(),
            a = '';

        if (o.timeFormat === '12') {
            a = " AM";
            if (h > 11) { a = " PM"; }
            if (h > 12) { h = h - 12; }
            if (h === 0) { h = 12; }
        }

        h = this._addLeadingZero(h);
        i = this._addLeadingZero(i);
        s = this._addLeadingZero(s);
        m = this._addLeadingZero(m);
        d = this._addLeadingZero(d);

        if (o.showDate) {
            if (o.dateFormat === 'american') {
                result += "<span class='date-month'>" + m + "</span>";
                result += "<span class='date-divider'>-</span>";
                result += "<span class='date-day'>" + d + "</span>";
                result += "<span class='date-divider'>-</span>";
                result += "<span class='date-year'>" + y + "</span>";
            } else {
                result += "<span class='date-day'>" + d + "</span>";
                result += "<span class='date-divider'>-</span>";
                result += "<span class='date-month'>" + m + "</span>";
                result += "<span class='date-divider'>-</span>";
                result += "<span class='date-year'>" + y + "</span>";
            }
            result += o.divider;
        }

        if (o.showTime) {
            result += "<span class='clock-hour'>" + h + "</span>";
            result += "<span class='clock-divider'>:</span>";
            result += "<span class='clock-minute'>" + i + "</span>";
            result += "<span class='clock-divider'>:</span>";
            result += "<span class='clock-second'>" + s + "</span>";
        }

        element.html(result);
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        clearInterval(this._clockInterval);
        this._clockInterval = null;
        this.element.html("");
    }
};

Metro.plugin('clock', Clock);

// Source: js/plugins/collapse.js
var Collapse = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.toggle = null;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onCollapseCreate, [this.element]);

        return this;
    },

    options: {
        collapsed: false,
        toggleElement: false,
        duration: METRO_ANIMATION_DURATION,
        onExpand: Metro.noop,
        onCollapse: Metro.noop,
        onCollapseCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var toggle;

        toggle = o.toggleElement !== false ? $(o.toggleElement) : element.siblings('.collapse-toggle').length > 0 ? element.siblings('.collapse-toggle') : element.siblings('a:nth-child(1)');

        if (o.collapsed === true || element.attr("collapsed") === true) {
            element.hide(0);
        }

        toggle.on(Metro.events.click, function(e){
            if (element.css('display') === 'block' && !element.hasClass('keep-open')) {
                that._close(element);
            } else {
                that._open(element);
            }

            console.log(e.target.tagName);

            if (["INPUT"].indexOf(e.target.tagName) === -1) {
                e.preventDefault();
            }
            e.stopPropagation();
        });

        this.toggle = toggle;
    },

    _close: function(el){

        if (Utils.isJQueryObject(el) === false) {
            el = $(el);
        }

        var dropdown  = el.data("collapse");
        var options = dropdown.options;

        this.toggle.removeClass("active-toggle");

        el.slideUp(options.duration, function(){
            el.trigger("onCollapse", null, el);
            el.data("collapsed", true);
            el.addClass("collapsed");
            Utils.exec(options.onCollapse, [el]);
        });
    },

    _open: function(el){
        if (Utils.isJQueryObject(el) === false) {
            el = $(el);
        }

        var dropdown  = el.data("collapse");
        var options = dropdown.options;

        this.toggle.addClass("active-toggle");

        el.slideDown(options.duration, function(){
            el.trigger("onExpand", null, el);
            el.data("collapsed", false);
            el.removeClass("collapsed");
            Utils.exec(options.onExpand, [el]);
        });
    },

    collapse: function(){
        this._close(this.element);
    },

    expand: function(){
        this._open(this.element);
    },

    isCollapsed: function(){
        return this.element.data("collapsed");
    },

    toggleState: function(){
        var element = this.element;
        if (element.attr("collapsed") === true || element.data("collapsed") === true) {
            this.collapse();
        } else {
            this.expand();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "collapsed":
            case "data-collapsed": this.toggleState(); break;
        }
    },

    destroy: function(){
        this.toggle.off(Metro.events.click);
        this.element.show();
    }
};

Metro.plugin('collapse', Collapse);

// Source: js/plugins/countdown.js
var Countdown = {
    init: function( options, elem ) {
        var that = this;
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.timepoint = (new Date()).getTime();
        this.breakpoint = null;
        this.blinkInterval = null;
        this.tickInterval = null;

        this.zeroDaysFired = false;
        this.zeroHoursFired = false;
        this.zeroMinutesFired = false;
        this.zeroSecondsFired = false;

        this.locale = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        locale: METRO_LOCALE,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        date: null,
        start: true,
        clsCountdown: "",
        clsZero: "",
        clsAlarm: "",
        clsDays: "",
        clsHours: "",
        clsMinutes: "",
        clsSeconds: "",
        onCountdownCreate: Metro.noop,
        onAlarm: Metro.noop,
        onTick: Metro.noop,
        onZero: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var o = this.options;
        this.locale = Metro.locales[o.locale] !== undefined ? Metro.locales[o.locale] : Metro.locales["en-US"];
        this._build();
    },

    _build: function(){
        var that = this, element = this.element, o = this.options;
        var parts = ["days", "hours", "minutes", "seconds"];
        var dm = 24*60*60*1000, hm = 60*60*1000, mm = 60*1000, sm = 1000;
        var delta_days, delta_hours, delta_minutes;

        element.addClass("countdown").addClass(o.clsCountdown);

        if (o.date !== null && Utils.isDate(o.date) !== false) {
            this.timepoint = (new Date(o.date)).getTime();
        }

        this.breakpoint = this.timepoint;

        if (parseInt(o.days) > 0) {
            this.breakpoint += parseInt(o.days) * dm;
        }
        if (parseInt(o.hours) > 0) {
            this.breakpoint += parseInt(o.hours) * hm;
        }
        if (parseInt(o.minutes) > 0) {
            this.breakpoint += parseInt(o.minutes) * mm;
        }
        if (parseInt(o.seconds) > 0) {
            this.breakpoint += parseInt(o.seconds) * sm;
        }

        delta_days = Math.round((that.breakpoint - that.timepoint) / dm);
        delta_hours = Math.round((that.breakpoint - that.timepoint) / hm);
        delta_minutes = Math.round((that.breakpoint - that.timepoint) / mm);

        $.each(parts, function(){
            if (this === "days" && delta_days === 0) {
                return ;
            }

            if (this === "hours" && delta_days === 0 && delta_hours === 0) {
                return ;
            }

            if (this === "minutes" && delta_days === 0 && delta_hours === 0 && delta_minutes === 0) {
                return ;
            }

            if (this === "seconds") {
            }

            var part = $("<div>").addClass("part " + this).attr("data-label", that.locale["calendar"]["time"][this]).appendTo(element);

            if (this === "days") {part.addClass(o.clsDays);}
            if (this === "hours") {part.addClass(o.clsHours);}
            if (this === "minutes") {part.addClass(o.clsMinutes);}
            if (this === "seconds") {part.addClass(o.clsSeconds);}

            $("<div>").addClass("digit").appendTo(part);
            $("<div>").addClass("digit").appendTo(part);

            if (this === "days" && delta_days >= 100) {

                for(var i = 0; i < String(delta_days/100).length; i++) {
                    $("<div>").addClass("digit").appendTo(part);
                }

            }
        });

        element.find(".digit").html("0");

        Utils.exec(this.options.onCountdownCreate, [this.element]);

        if (this.options.start === true) {
            this.start();
        }
    },

    blink: function(){
        this.element.toggleClass("blink");
    },

    tick: function(){
        var that = this, element = this.element, o = this.options;
        var dm = 24*60*60, hm = 60*60, mm = 60, sm = 1;
        var left, now = (new Date()).getTime();
        var d, h, m, s;

        left = Math.floor((this.breakpoint - now)/1000);

        if (left <= 0) {
            this.stop();
            if (o.clsZero !== "") {
                element.find(".part").removeClass(o.clsZero);
            }
            element.addClass(o.clsAlarm);
            Utils.exec(o.onAlarm, [now, element]);
            return ;
        }

        d = Math.floor(left / dm);
        left -= d * dm;
        this.draw("days", d);

        if (d === 0) {
            if (o.clsDays !== "") {
                element.find(".days").removeClass(o.clsDays);
            }
            if (this.zeroDaysFired === false) {
                this.zeroDaysFired = true;
                element.find(".days").addClass(o.clsZero);
                Utils.exec(o.onZero, ["days", element]);
            }
        }

        h = Math.floor(left / hm);
        left -= h*hm;
        this.draw("hours", h);

        if (d === 0 && h === 0) {
            if (o.clsHours !== "") {
                element.find(".hours").removeClass(o.clsHours);
            }
            if (this.zeroHoursFired === false) {
                this.zeroHoursFired = true;
                element.find(".hours").addClass(o.clsZero);
                Utils.exec(o.onZero, ["hours", element]);
            }
        }

        m = Math.floor(left / mm);
        left -= m*mm;
        this.draw("minutes", m);

        if (d === 0 && h === 0 && m === 0) {
            if (o.clsMinutes !== "") {
                element.find(".minutes").removeClass(o.clsMinutes);
            }
            if (this.zeroMinutesFired === false) {
                this.zeroMinutesFired = true;
                element.find(".minutes").addClass(o.clsZero);
                Utils.exec(o.onZero, ["minutes", element]);
            }
        }

        s = Math.floor(left / sm);
        this.draw("seconds", s);

        if (d === 0 && h === 0 && m === 0 && s === 0) {
            if (o.clsSeconds !== "") {
                element.find(".seconds").removeClass(o.clsSeconds);
            }
            if (this.zeroSecondsFired === false) {
                this.zeroSecondsFired = true;
                element.find(".seconds").addClass(o.clsZero);
                Utils.exec(o.onZero, ["seconds", element]);
            }
        }

        Utils.exec(o.onTick, [{days:d, hours:h, minutes:m, seconds:s}, element]);
    },

    draw: function(part, value){
        var that = this, element = this.element, o = this.options;
        var digit_value;
        var len = String(value).length;

        var digits = element.find("."+part+" .digit").html("0");
        var digits_length = digits.length;

        for(var i = 0; i < len; i++){
            digit_value = Math.floor( value / Math.pow(10, i) ) % 10;
            element.find("." + part + " .digit:eq("+ (digits_length - 1) +")").html(digit_value);
            digits_length--;
        }
    },

    start: function(){
        var that = this;

        if (this.element.data("paused") === false) {
            return;
        }

        clearInterval(this.blinkInterval);
        clearInterval(this.tickInterval);

        this.element.data("paused", false);

        this.tick();

        this.blinkInterval = setInterval(function(){that.blink();}, 500);
        this.tickInterval = setInterval(function(){that.tick();}, 1000);
    },

    stop: function(){
        var that = this, element = this.element, o = this.options;
        element.data("paused", true);
        element.find(".digit").html("0");
        clearInterval(this.blinkInterval);
        clearInterval(this.tickInterval);
    },

    pause: function(){
        this.element.data("paused", true);
        clearInterval(this.blinkInterval);
        clearInterval(this.tickInterval);
    },

    togglePlay: function(){
        if (this.element.attr("data-pause") === true) {
            this.pause();
        } else {
            this.start();
        }
    },

    isPaused: function(){
        return this.element.data("paused");
    },

    getTimepoint: function(asDate){
        return asDate === true ? new Date(this.timepoint) : this.timepoint;
    },

    getBreakpoint: function(asDate){
        return asDate === true ? new Date(this.breakpoint) : this.breakpoint;
    },

    getLeft: function(){
        var dm = 24*60*60*1000, hm = 60*60*1000, mm = 60*1000, sm = 1000;
        var now = (new Date()).getTime();
        var left_seconds = Math.floor(this.breakpoint - now);
        return {
            days: Math.round(left_seconds / dm),
            hours: Math.round(left_seconds / hm),
            minutes: Math.round(left_seconds / mm),
            seconds: Math.round(left_seconds / sm)
        };
    },

    i18n: function(val){
        var that = this, element = this.element, o = this.options;
        var parts = ["days", "hours", "minutes", "seconds"];


        if (val === undefined) {
            return o.locale;
        }
        if (Metro.locales[val] === undefined) {
            return false;
        }
        o.locale = val;
        this.locale = Metro.locales[o.locale];

        $.each(parts, function(){
            var cls = ".part." + this;
            var part = element.find(cls);
            part.attr("data-label", that.locale["calendar"]["time"][this]);
        });
    },

    changeAttrLocale: function(){
        var element = this.element;
        var locale = element.attr('data-locale');
        this.i18n(locale);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-pause": this.togglePlay(); break;
            case "data-locale": this.changeAttrLocale(); break;
        }
    },

    destroy: function(){
        clearInterval(this.blinkInterval);
        clearInterval(this.tickInterval);

        this.element.html("");
        this.element.removeClass("countdown").removeClass(this.options.clsCountdown);
    }
};

Metro.plugin('countdown', Countdown);

// Source: js/plugins/counter.js
var Counter = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.numbers = [];
        this.html = this.element.html();

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        delay: 10,
        step: 1,
        value: 0,
        timeout: null,
        delimiter: ",",
        onStart: Metro.noop,
        onStop: Metro.noop,
        onTick: Metro.noop,
        onCounterCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._calcArray();

        Utils.exec(o.onCounterCreate, [element], this.elem);

        if (o.timeout !== null && Utils.isInt(o.timeout)) {
            setTimeout(function () {
                that.start();
            }, o.timeout);
        }
    },

    _calcArray: function(){
        var o = this.options;
        var i;

        for (i = 0; i <= o.value; i += o.step ) {
            this.numbers.push(i);
        }

        if (this.numbers[this.numbers.length - 1] !== o.value) {
            this.numbers.push(o.value);
        }
    },

    start: function(){
        var that = this, element = this.element, o = this.options;

        var tick = function(){
            if (that.numbers.length === 0) {
                Utils.exec(o.onStop, [element], element[0]);
                return ;
            }
            var n = that.numbers.shift();
            Utils.exec(o.onTick, [n, element], element[0]);
            element.html(Number(n).format(0, 0, o.delimiter));
            if (that.numbers.length > 0) {
                setTimeout(tick, o.delay);
            } else {
                Utils.exec(o.onStop, [element], element[0]);
            }
        };

        Utils.exec(o.onStart, [element], element[0]);

        setTimeout(tick, o.delay);
    },

    reset: function(){
        this._calcArray();
        this.element.html(this.html);
    },

    setValueAttribute: function(){
        this.options.value = this.element.attr("data-value");
        this._calcArray();
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-value": this.setValueAttribute(); break;
        }
    },

    destroy: function(){}
};

Metro.plugin('counter', Counter);

// Source: js/plugins/cube.js
var Cube = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.id = null;
        this.rules = null;
        this.interval = false;
        this.ruleInterval = false;
        this.running = false;
        this.intervals = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    default_rules: [
        {
            on: {'top': [16],      'left': [4],         'right': [1]},
            off: {'top': [13, 4],   'left': [1, 16],     'right': [13, 4]}
        },
        {
            on: {'top': [12, 15],  'left': [3, 8],      'right': [2, 5]},
            off: {'top': [9, 6, 3], 'left': [5, 10, 15], 'right': [14, 11, 8]}
        },
        {
            on: {'top': [11],      'left': [7],         'right': [6]},
            off: {'top': [1, 2, 5], 'left': [9, 13, 14], 'right': [15, 12, 16]}
        },
        {
            on: {'top': [8, 14],   'left': [2, 12],     'right': [9, 3]},
            off: {'top': [16],      'left': [4],         'right': [1]}
        },
        {
            on: {'top': [10, 7],   'left': [6, 11],     'right': [10, 7]},
            off: {'top': [12, 15],  'left': [3, 8],      'right': [2, 5]}
        },
        {
            on: {'top': [13, 4],   'left': [1, 16],     'right': [13, 4]},
            off: {'top': [11],      'left': [7],         'right': [6]}
        },
        {
            on: {'top': [9, 6, 3], 'left': [5, 10, 15], 'right': [14, 11, 8]},
            off: {'top': [8, 14],   'left': [2, 12],     'right': [9, 3]}
        },
        {
            on: {'top': [1, 2, 5], 'left': [9, 13, 14], 'right': [15, 12, 16]},
            off: {'top': [10, 7],   'left': [6, 11],     'right': [10, 7]}
        }
    ],

    options: {
        rules: null,
        color: null,
        flashColor: null,
        flashInterval: 1000,
        numbers: false,
        offBefore: true,
        attenuation: .3,
        stopOnBlur: false,
        cells: 4,
        margin: 8,
        showAxis: false,
        axisStyle: "arrow", //line
        cellClick: false,
        autoRestart: 5000,

        clsCube: "",
        clsCell: "",
        clsSide: "",
        clsSideLeft: "",
        clsSideRight: "",
        clsSideTop: "",
        clsSideLeftCell: "",
        clsSideRightCell: "",
        clsSideTopCell: "",
        clsAxis: "",
        clsAxisX: "",
        clsAxisY: "",
        clsAxisZ: "",

        custom: Metro.noop,
        onTick: Metro.noop,
        onCubeCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        if (o.rules === null) {
            this.rules = this.default_rules;
        } else {
            this._parseRules(o.rules);
        }

        this._createCube();
        this._createEvents();

        Utils.exec(o.onCubeCreate, [element]);
    },

    _parseRules: function(rules){

        if (rules === undefined || rules === null) {
            return false;
        }

        if (Utils.isObject(rules)) {
            this.rules = Utils.isObject(rules);
            return true;
        } else {
            try {
                this.rules = JSON.parse(rules);
                return true;
            } catch (err) {
                console.log("Unknown or empty rules for cell flashing!");
                return false;
            }
        }
    },

    _createCube: function(){
        var that = this, element = this.element, o = this.options;
        var sides = ['left', 'right', 'top'];
        var id = Utils.elementId("cube");
        var cells_count = Math.pow(o.cells, 2);

        element.addClass("cube").addClass(o.clsCube);

        if (element.attr('id') === undefined) {
            element.attr('id', id);
        }

        this.id = element.attr('id');

        this._createCssForFlashColor();
        this._createCssForCellSize();

        $.each(sides, function(){
            var side, cell, i;

            side = $("<div>").addClass("side " + this+"-side").addClass(o.clsSide).appendTo(element);

            if (this === 'left') {side.addClass(o.clsSideLeft);}
            if (this === 'right') {side.addClass(o.clsSideRight);}
            if (this === 'top') {side.addClass(o.clsSideTop);}

            for(i = 0; i < cells_count; i++) {
                cell = $("<div>").addClass("cube-cell").addClass("cell-id-"+(i+1)).addClass(o.clsCell);
                cell.data("id", i + 1).data("side", this);
                cell.appendTo(side);
                if (o.numbers === true) {
                    cell.html(i + 1);
                }
            }
        });

        var cells  = element.find(".cube-cell");
        if (o.color !== null) {
            if (Utils.isColor(o.color)) {
                cells.css({
                    backgroundColor: o.color,
                    borderColor: o.color
                })
            } else {
                cells.addClass(o.color);
            }
        }

        var axis = ['x', 'y', 'z'];
        $.each(axis, function(){
            var axis_name = this;
            var ax = $("<div>").addClass("axis " + o.axisStyle).addClass("axis-"+axis_name).addClass(o.clsAxis);
            if (axis_name === "x") ax.addClass(o.clsAxisX);
            if (axis_name === "y") ax.addClass(o.clsAxisY);
            if (axis_name === "z") ax.addClass(o.clsAxisZ);
            ax.appendTo(element);
        });

        if (o.showAxis === false) {
            element.find(".axis").hide();
        }

        this._run();
    },

    _run: function(){
        var that = this, element = this.element, o = this.options;
        var interval = 0;

        clearInterval(this.interval);
        element.find(".cube-cell").removeClass("light");

        if (o.custom !== Metro.noop) {
            Utils.exec(o.custom, [element]);
        } else {

            element.find(".cube-cell").removeClass("light");

            that._start();

            interval = Utils.isObject(this.rules) ? Utils.objectLength(this.rules) : 0;

            this.interval = setInterval(function(){
                that._start();
            }, interval * o.flashInterval);
        }
    },

    _createCssForCellSize: function(){
        var that = this, element = this.element, o = this.options;
        var sheet = Metro.sheet;
        var width;
        var cell_size;

        if (o.margin === 8 && o.cells === 4) {
            return ;
        }

        width = parseInt(Utils.getStyleOne(element, 'width'));
        cell_size = Math.ceil((width / 2 - o.margin * o.cells * 2) / o.cells);
        Utils.addCssRule(sheet, "#"+element.attr('id')+" .side .cube-cell", "width: "+cell_size+"px!important; height: "+cell_size+"px!important; margin: " + o.margin + "px!important;");
    },

    _createCssForFlashColor: function(){
        var that = this, element = this.element, o = this.options;
        var sheet = Metro.sheet;
        var rule1;
        var rule2;
        var rules1 = [];
        var rules2 = [];
        var i;

        if (o.flashColor === null) {
            return ;
        }

        rule1 = "0 0 10px " + Utils.hexColorToRgbA(o.flashColor, 1);
        rule2 = "0 0 10px " + Utils.hexColorToRgbA(o.flashColor, o.attenuation);

        for(i = 0; i < 3; i++) {
            rules1.push(rule1);
            rules2.push(rule2);
        }

        Utils.addCssRule(sheet, "@keyframes pulsar-cell-"+element.attr('id'), "0%, 100% { " + "box-shadow: " + rules1.join(",") + "} 50% { " + "box-shadow: " + rules2.join(",") + " }");
        Utils.addCssRule(sheet, "#"+element.attr('id')+" .side .cube-cell.light", "animation: pulsar-cell-" + element.attr('id') + " 2.5s 0s ease-out infinite; " + "background-color: " + o.flashColor + "!important; border-color: " + o.flashColor+"!important;");
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        $(window).on(Metro.events.blur + "-" + element.attr("id"), function(){
            if (o.stopOnBlur === true && that.running === true) {
                that._stop();
            }
        });

        $(window).on(Metro.events.focus + "-" + element.attr("id"), function(){
            if (o.stopOnBlur === true && that.running === false) {
                that._start();
            }
        });

        element.on(Metro.events.click, ".cube-cell", function(){
            if (o.cellClick === true) {
                var cell = $(this);
                cell.toggleClass("light");
            }
        });
    },

    _start: function(){
        var that = this, element = this.element, o = this.options;
        var sides = ['left', 'right', 'top'];

        element.find(".cube-cell").removeClass("light");

        this.running = true;

        $.each(this.rules, function(index, rule){
            that._execRule(index, rule);
        });
    },

    _stop: function(){
        this.running = false;
        clearInterval(this.interval);
        $.each(this.intervals, function(){
            clearInterval(this);
        })
    },

    _tick: function(index, speed){
        var that = this, element = this.element, o = this.options;
        if (speed === undefined) {
            speed = o.flashInterval * index;
        }

        var interval = setTimeout(function(){
            Utils.exec(o.onTick, [index], element[0]);
            clearInterval(interval);
            Utils.arrayDelete(that.intervals, interval);
        }, speed);
        this.intervals.push(interval);
    },

    _toggle: function(cell, func, time, speed){
        var that = this;
        if (speed === undefined) {
            speed = this.options.flashInterval * time;
        }
        var interval = setTimeout(function(){
            cell[func === 'on' ? 'addClass' : 'removeClass']("light");
            clearInterval(interval);
            Utils.arrayDelete(that.intervals, interval);
        }, speed);
        this.intervals.push(interval);
    },

    start: function(){
        this._start();
    },

    stop: function(){
        this._stop();
    },

    toRule: function(index, speed){
        var that = this, element = this.element, o = this.options;
        var rules = this.rules;

        if (rules === null || rules === undefined || rules[index] === undefined) {
            return ;
        }
        clearInterval(this.ruleInterval);
        this.ruleInterval = false;
        this.stop();
        element.find(".cube-cell").removeClass("light");
        for (var i = 0; i <= index; i++) {
            this._execRule(i, rules[i], speed);
        }
        if (Utils.isInt(o.autoRestart) && o.autoRestart > 0) {
            this.ruleInterval = setTimeout(function(){
                that._run();
            }, o.autoRestart);
        }
    },

    _execRule: function(index, rule, speed){
        var that = this, element = this.element, o = this.options;
        var sides = ['left', 'right', 'top'];

        this._tick(index, speed);

        $.each(sides, function(){
            var side_class = "."+this+"-side";
            var side_name = this;
            var cells_on = rule["on"] !== undefined && rule["on"][side_name] !== undefined ? rule["on"][side_name] : false;
            var cells_off = rule["off"] !== undefined && rule["off"][side_name] !== undefined ? rule["off"][side_name] : false;

            if (cells_on !== false) $.each(cells_on, function(){
                var cell_index = this;
                var cell = element.find(side_class + " .cell-id-"+cell_index);

                that._toggle(cell, 'on', index, speed);
            });

            if (cells_off !== false) $.each(cells_off, function(){
                var cell_index = this;
                var cell = element.find(side_class + " .cell-id-"+cell_index);

                that._toggle(cell, 'off', index, speed);
            });
        });
    },

    rule: function(r){
        if (r === undefined) {
            return this.rules;
        }

        if (this._parseRules(r) !== true) {
            return ;
        }
        this.options.rules = r;
        this.stop();
        this.element.find(".cube-cell").removeClass("light");
        this._run();
    },

    axis: function(show){
        var func = show === true ? "show" : "hide";
        this.element.find(".axis")[func]();
    },

    changeRules: function(){
        var that = this, element = this.element, o = this.options;
        var rules = element.attr("data-rules");
        if (this._parseRules(rules) !== true) {
            return ;
        }
        this.stop();
        element.find(".cube-cell").removeClass("light");
        o.rules = rules;
        this._run();
    },

    changeAxisVisibility: function(){
        var that = this, element = this.element, o = this.options;
        var visibility = JSON.parse(element.attr("data-show-axis")) === true;
        var func = visibility ? "show" : "hide";
        element.find(".axis")[func]();
    },

    changeAxisStyle: function(){
        var that = this, element = this.element, o = this.options;
        var style = element.attr("data-axis-style");

        element.find(".axis").removeClass("arrow line no-style").addClass(style);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-rules": this.changeRules(); break;
            case "data-show-axis": this.changeAxisVisibility(); break;
            case "data-axis-style": this.changeAxisStyle(); break;
        }
    },

    destroy: function(){
        var that = this, element = this.element, o = this.options;

        clearInterval(this.interval);
        this.interval = null;

        $(window).off(Metro.events.blur + "-" + element.attr("id"));
        $(window).off(Metro.events.focus + "-" + element.attr("id"));
        element.off(Metro.events.click, ".cube-cell");

        element.html("");
        element.removeClass("cube").removeClass(o.clsCube);
    }
};

Metro.plugin('cube', Cube);

// Source: js/plugins/datepicker.js
var DatePicker = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.picker = null;
        this.isOpen = false;
        this.value = new Date();
        this.locale = Metro.locales[METRO_LOCALE]['calendar'];
        this.offset = (new Date()).getTimezoneOffset() / 60 + 1;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        gmt: 0,
        format: "%Y-%m-%d",
        locale: METRO_LOCALE,
        value: null,
        distance: 3,
        month: true,
        day: true,
        year: true,
        minYear: null,
        maxYear: null,
        scrollSpeed: 5,
        copyInlineStyles: true,
        clsPicker: "",
        clsPart: "",
        clsMonth: "",
        clsDay: "",
        clsYear: "",
        okButtonIcon: "<span class='default-icon-check'></span>",
        cancelButtonIcon: "<span class='default-icon-cross'></span>",
        onSet: Metro.noop,
        onOpen: Metro.noop,
        onClose: Metro.noop,
        onScroll: Metro.noop,
        onDatePickerCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        if (o.distance < 1) {
            o.distance = 1;
        }

        if (o.value !== null && Utils.isDate(o.value)) {
            this.value = (new Date(o.value)).addHours(this.offset);
        }

        if (Metro.locales[o.locale] === undefined) {
            o.locale = METRO_LOCALE;
        }

        this.locale = Metro.locales[o.locale]['calendar'];

        if (o.minYear === null) {
            o.minYear = (new Date()).getFullYear() - 100;
        }

        if (o.maxYear === null) {
            o.maxYear = (new Date()).getFullYear() + 100;
        }

        this._createStructure();
        this._createEvents();
        this._set();

        Utils.exec(o.onDatePickerCreate, [element]);
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var picker, month, day, year, i, j;
        var dateWrapper, selectWrapper, selectBlock, actionBlock;

        var prev = element.prev();
        var parent = element.parent();
        var id = Utils.elementId("date-picker");

        picker = $("<div>").attr("id", id).addClass("wheel-picker date-picker " + element[0].className).addClass(o.clsPicker);

        if (prev.length === 0) {
            parent.prepend(picker);
        } else {
            picker.insertAfter(prev);
        }

        element.appendTo(picker);


        dateWrapper = $("<div>").addClass("date-wrapper").appendTo(picker);

        if (o.month === true) {
            month = $("<div>").addClass("month").addClass(o.clsPart).addClass(o.clsMonth).appendTo(dateWrapper);
        }
        if (o.day === true) {
            day = $("<div>").addClass("day").addClass(o.clsPart).addClass(o.clsDay).appendTo(dateWrapper);
        }
        if (o.year === true) {
            year = $("<div>").addClass("year").addClass(o.clsPart).addClass(o.clsYear).appendTo(dateWrapper);
        }

        selectWrapper = $("<div>").addClass("select-wrapper").appendTo(picker);

        selectBlock = $("<div>").addClass("select-block").appendTo(selectWrapper);

        if (o.month === true) {
            month = $("<ul>").addClass("sel-month").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(month);
            for (i = 0; i < 12; i++) {
                $("<li>").addClass("js-month-"+i+" js-month-real-"+this.locale['months'][i].toLowerCase()).html(this.locale['months'][i]).data("value", i).appendTo(month);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(month);
        }

        if (o.day === true) {
            day = $("<ul>").addClass("sel-day").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(day);
            for (i = 0; i < 31; i++) {
                $("<li>").addClass("js-day-"+i+" js-day-real-"+(i+1)).html(i + 1).data("value", i + 1).appendTo(day);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(day);
        }

        if (o.year === true) {
            year = $("<ul>").addClass("sel-year").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(year);
            for (i = o.minYear, j = 0; i <= o.maxYear; i++, j++) {
                $("<li>").addClass("js-year-"+ j + " js-year-real-" + i).html(i).data("value", i).appendTo(year);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(year);
        }

        selectBlock.height((o.distance * 2 + 1) * 40);

        actionBlock = $("<div>").addClass("action-block").appendTo(selectWrapper);
        $("<button>").attr("type", "button").addClass("button action-ok").html(o.okButtonIcon).appendTo(actionBlock);
        $("<button>").attr("type", "button").addClass("button action-cancel").html(o.cancelButtonIcon).appendTo(actionBlock);


        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (i = 0; i < element[0].style.length; i++) {
                picker.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        this.picker = picker;
    },

    _createEvents: function(){
        var that = this, o = this.options;
        var picker = this.picker;

        picker.on(Metro.events.start, ".select-block ul", function(e){

            if (e.changedTouches) {
                return ;
            }

            var target = this;
            var pageY = Utils.pageXY(e).y;

            $(document).on(Metro.events.move + "-picker", function(e){

                target.scrollTop -= o.scrollSpeed * (pageY  > Utils.pageXY(e).y ? -1 : 1);

                pageY = Utils.pageXY(e).y;
            });

            $(document).on(Metro.events.stop + "-picker", function(){
                $(document).off(Metro.events.move + "-picker");
                $(document).off(Metro.events.stop + "-picker");
            });
        });

        picker.on(Metro.events.click, function(e){
            if (that.isOpen === false) that.open();
            e.stopPropagation();
        });

        picker.on(Metro.events.click, ".action-ok", function(e){
            var m, d, y;
            var sm = picker.find(".sel-month li.active"),
                sd = picker.find(".sel-day li.active"),
                sy = picker.find(".sel-year li.active");

            m = sm.length === 0 ? that.value.getMonth() : sm.data("value");
            d = sd.length === 0 ? that.value.getDate() : sd.data("value");
            y = sy.length === 0 ? that.value.getFullYear() : sy.data("value");

            that.value = new Date(y, m, d);
            that._correct();
            that._set();

            that.close();
            e.stopPropagation();
        });

        picker.on(Metro.events.click, ".action-cancel", function(e){
            that.close();
            e.stopPropagation();
        });

        this._addScrollEvents();
    },

    _addScrollEvents: function(){
        var picker = this.picker, o = this.options;
        var lists = ['month', 'day', 'year'];
        $.each(lists, function(){
            var list_name = this;
            var list = picker.find(".sel-" + list_name);

            if (list.length === 0) return ;

            list.on(Metro.events.scrollStart, function(){
                list.find(".active").removeClass("active");
            });
            list.on(Metro.events.scrollStop, {latency: 50}, function(){
                var target = Math.round((Math.ceil(list.scrollTop()) / 40));
                var target_element = list.find(".js-"+list_name+"-"+target);
                var scroll_to = target_element.position().top - (o.distance * 40) + list.scrollTop() - 1;

                list.animate({
                    scrollTop: scroll_to
                }, 100, function(){
                    target_element.addClass("active");
                    Utils.exec(o.onScroll, [target_element, list, picker], list[0]);
                });
            });
        });
    },

    _removeScrollEvents: function(){
        var picker = this.picker;
        var lists = ['month', 'day', 'year'];
        $.each(lists, function(){
            picker.find(".sel-" + this).off("scrollstart scrollstop");
        });
    },

    _correct: function(){
        var m = this.value.getMonth(),
            d = this.value.getDate(),
            y = this.value.getFullYear();

        this.value = new Date(y, m, d);
    },

    _set: function(){
        var element = this.element, o = this.options;
        var picker = this.picker;
        var m = this.locale['months'][this.value.getMonth()],
            d = this.value.getDate(),
            y = this.value.getFullYear();

        if (o.month === true) {
            picker.find(".month").html(m);
        }
        if (o.day === true) {
            picker.find(".day").html(d);
        }
        if (o.year === true) {
            picker.find(".year").html(y);
        }

        element.val(this.value.format(o.format, o.locale)).trigger("change");

        Utils.exec(o.onSet, [this.value, element.val(), element, picker], element[0]);

    },

    open: function(){
        var element = this.element, o = this.options;
        var picker = this.picker;
        var m = this.value.getMonth(), d = this.value.getDate() - 1, y = this.value.getFullYear();
        var m_list, d_list, y_list;
        var select_wrapper = picker.find(".select-wrapper");
        var select_wrapper_in_viewport, select_wrapper_rect;

        select_wrapper.parent().removeClass("for-top for-bottom");
        select_wrapper.show();
        picker.find("li").removeClass("active");

        select_wrapper_in_viewport = Utils.inViewport(select_wrapper);
        select_wrapper_rect = Utils.rect(select_wrapper);

        if (!select_wrapper_in_viewport && select_wrapper_rect.top > 0) {
            select_wrapper.parent().addClass("for-bottom");
        }

        if (!select_wrapper_in_viewport && select_wrapper_rect.top < 0) {
            select_wrapper.parent().addClass("for-top");
        }

        if (o.month === true) {
            m_list = picker.find(".sel-month");
            m_list.scrollTop(0).animate({
                scrollTop: m_list.find("li.js-month-" + m).addClass("active").position().top - (40 * o.distance)
            }, 100);
        }
        if (o.day === true) {
            d_list = picker.find(".sel-day");
            d_list.scrollTop(0).animate({
                scrollTop: d_list.find("li.js-day-" + d).addClass("active").position().top - (40 * o.distance)
            }, 100);
        }
        if (o.year === true) {
            y_list = picker.find(".sel-year");
            y_list.scrollTop(0).animate({
                scrollTop: y_list.find("li.js-year-real-" + y).addClass("active").position().top - (40 * o.distance)
            }, 100);
        }

        this.isOpen = true;

        Utils.exec(o.onOpen, [this.value, element, picker], element[0]);
    },

    close: function(){
        var picker = this.picker, o = this.options, element = this.element;
        picker.find(".select-wrapper").hide();
        this.isOpen = false;
        Utils.exec(o.onClose, [this.value, element, picker], element[0]);
    },

    val: function(t){
        if (t === undefined) {
            return this.element.val();
        }
        if (Utils.isDate(t) === false) {
            return false;
        }
        this.value = (new Date(t)).addHours(this.offset);
        this._set();
    },

    date: function(t){
        if (t === undefined) {
            return this.value;
        }

        try {
            this.value = new Date(t.format("%Y-%m-%d"));
            this._set();
        } catch (e) {
            return false;
        }
    },

    changeValueAttribute: function(){
        this.val(this.element.attr("data-value"));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-value": this.changeValueAttribute(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        var picker = this.picker;
        var parent = element.parent();

        this._removeScrollEvents();

        picker.off(Metro.events.start, ".select-block ul");
        picker.off(Metro.events.click);
        picker.off(Metro.events.click, ".action-ok");
        picker.off(Metro.events.click, ".action-cancel");

        element.insertBefore(parent);
        parent.remove();
    }
};

Metro.plugin('datepicker', DatePicker);

$(document).on(Metro.events.click, function(){
    $.each($(".date-picker"), function(){
        $(this).find("input").data("datepicker").close();
    });
});

// Source: js/plugins/dialog.js
var Dialog = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.interval = null;
        this.overlay = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        toTop: false,
        toBottom: false,
        locale: METRO_LOCALE,
        title: "",
        content: "",
        actions: {},
        actionsAlign: "right",
        defaultAction: true,
        overlay: true,
        overlayColor: '#000000',
        overlayAlpha: .5,
        overlayClickClose: false,
        width: '480',
        height: 'auto',
        shadow: true,
        closeAction: true,
        clsDialog: "",
        clsTitle: "",
        clsContent: "",
        clsAction: "",
        clsDefaultAction: "",
        clsOverlay: "",
        autoHide: 0,
        removeOnClose: false,
        show: false,
        onShow: Metro.noop,
        onHide: Metro.noop,
        onOpen: Metro.noop,
        onClose: Metro.noop,
        onDialogCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var o = this.options;
        this.locale = Metro.locales[o.locale] !== undefined ? Metro.locales[o.locale] : Metro.locales["en-US"];
        this._build();
    },

    _build: function(){
        var that = this, element = this.element, o = this.options;
        var body = $("body");
        var overlay;

        element.addClass("dialog");

        if (o.shadow === true) {
            element.addClass("shadow-on");
        }

        if (element.attr("id") === undefined) {
            element.attr("id", Utils.elementId("dialog"));
        }

        if (o.title !== "") {
            this.setTitle(o.title);
        }

        if (o.content !== "") {
            this.setContent(o.content);
        }

        if (o.defaultAction === true || (o.actions !== false && typeof o.actions === 'object' && Utils.objectLength(o.actions) > 0)) {
            var buttons = element.find(".dialog-actions");
            var button;

            if (buttons.length === 0) {
                buttons = $("<div>").addClass("dialog-actions").addClass("text-"+o.actionsAlign).appendTo(element);
            }

            if (o.defaultAction === true && (Utils.objectLength(o.actions) === 0 && element.find(".dialog-actions > *").length === 0)) {
                button = $("<button>").addClass("button js-dialog-close").addClass(o.clsDefaultAction).html(this.locale["buttons"]["ok"]);
                button.appendTo(buttons);
            }

            $.each(o.actions, function(){
                var item = this;
                button = $("<button>").addClass("button").addClass(item.cls).html(item.caption);
                if (item.onclick !== undefined) button.on(Metro.events.click, function(){
                    Utils.exec(item.onclick, [element]);
                });
                button.appendTo(buttons);
            });
        }

        if (o.overlay === true) {
            overlay  = this._overlay();
            this.overlay = overlay;
        }

        if (o.closeAction === true) {
            element.on(Metro.events.click, ".js-dialog-close", function(){
                that.close();
            });
        }

        element.css({
            width: o.width,
            height: o.height,
            visibility: "hidden",
            top: '100%',
            left: ( $(window).width() - element.outerWidth() ) / 2
        });

        element.addClass(o.clsDialog);
        element.find(".dialog-title").addClass(o.clsTitle);
        element.find(".dialog-content").addClass(o.clsContent);
        element.find(".dialog-actions").addClass(o.clsAction);

        element.appendTo(body);

        if (o.show) {
            this.open();
        }

        $(window).on(Metro.events.resize + "_" + element.attr("id"), function(){
            that.setPosition();
        });

        Utils.exec(this.options.onDialogCreate, [this.element]);
    },

    _overlay: function(){
        var that = this, element = this.element, o = this.options;

        var overlay = $("<div>");
        overlay.addClass("overlay").addClass(o.clsOverlay);

        if (o.overlayColor === 'transparent') {
            overlay.addClass("transparent");
        } else {
            overlay.css({
                background: Utils.hex2rgba(o.overlayColor, o.overlayAlpha)
            });
        }

        return overlay;
    },

    hide: function(callback){
        var element = this.element, o = this.options;
        var timeout = 0;
        if (o.onHide !== Metro.noop) {
            timeout = 300;
            Utils.exec(o.onHide, [element]);
        }
        setTimeout(function(){
            element.css({
                visibility: "hidden",
                top: "100%"
            });
            Utils.callback(callback);
        }, timeout);
    },

    show: function(callback){
        var element = this.element, o = this.options;
        this.setPosition();
        element.css({
            visibility: "visible"
        });
        Utils.callback(callback);
        Utils.exec(o.onShow, [element]);
    },

    setPosition: function(){
        var element = this.element, o = this.options;
        var top, left, bottom;
        if (o.toTop !== true && o.toBottom !== true) {
            top = ( $(window).height() - element.outerHeight() ) / 2;
            bottom = "auto";
        } else {
            if (o.toTop === true) {
                top = 0;
                bottom = "auto";
            }
            if (o.toTop !== true && o.toBottom === true) {
                bottom = 0;
                top = "auto";
            }
        }
        element.css({
            top: top,
            bottom: bottom,
            left: ( $(window).width() - element.outerWidth() ) / 2
        });
    },

    setContent: function(c){
        var that = this, element = this.element, o = this.options;
        var content = element.find(".dialog-content");
        if (content.length === 0) {
            content = $("<div>").addClass("dialog-content");
            content.appendTo(element);
        }

        if (!Utils.isJQueryObject(c) && Utils.isFunc(c)) {
            c = Utils.exec(c);
        }

        if (Utils.isJQueryObject(c)) {
            c.appendTo(content);
        } else {
            content.html(c);
        }
    },

    setTitle: function(t){
        var that = this, element = this.element, o = this.options;
        var title = element.find(".dialog-title");
        if (title.length === 0) {
            title = $("<div>").addClass("dialog-title");
            title.appendTo(element);
        }
        title.html(t);
    },

    close: function(){
        var that = this, element = this.element, o = this.options;

        $('body').find('.overlay').remove();

        this.hide(function(){
            element.data("open", false);
            Utils.exec(o.onClose, [element]);
            if (o.removeOnClose === true) {
                element.remove();
            }
        });
    },

    open: function(){
        var that = this, element = this.element, o = this.options;

        if (o.overlay === true) {
            this.overlay.appendTo($("body"));
            if (o.overlayClickClose === true) {
                this.overlay.on(Metro.events.click, function(){
                    that.close();
                });
            }
        }

        this.show(function(){
            Utils.exec(o.onOpen, [element]);
            element.data("open", true);
            if (parseInt(o.autoHide) > 0) {
                setTimeout(function(){
                    that.close();
                }, parseInt(o.autoHide));
            }
        });
    },

    toggle: function(){
        var element = this.element;
        if (element.data('open')) {
            this.close();
        } else {
            this.open();
        }
    },

    isOpen: function(){
        return this.element.data('open') === true;
    },

    changeAttribute: function(attributeName){
    }
};

Metro.plugin('dialog', Dialog);

Metro['dialog'] = {

    isDialog: function(el){
        return Utils.isMetroObject(el, "dialog");
    },

    open: function(el, content, title){
        if (!this.isDialog(el)) {
            return false;
        }
        var dialog = $(el).data("dialog");
        if (title !== undefined) {
            dialog.setTitle(title);
        }
        if (content !== undefined) {
            dialog.setContent(content);
        }
        dialog.open();
    },

    close: function(el){
        if (!this.isDialog(el)) {
            return false;
        }
        var dialog = $(el).data("dialog");
        dialog.close();
    },

    toggle: function(el){
        if (!this.isDialog(el)) {
            return false;
        }
        var dialog = $(el).data("dialog");
        dialog.toggle();
    },

    isOpen: function(el){
        if (!this.isDialog(el)) {
            return false;
        }
        var dialog = $(el).data("dialog");
        return dialog.isOpen();
    },

    remove: function(el){
        if (!this.isDialog(el)) {
            return false;
        }
        var dialog = $(el).data("dialog");
        dialog.options.removeOnClose = true;
        dialog.close();
    },

    create: function(options){
        var dlg;

        dlg = $("<div>").appendTo($("body"));

        var dlg_options = $.extend({}, {
            show: true,
            closeAction: true,
            removeOnClose: true
        }, (options !== undefined ? options : {}));

        return dlg.dialog(dlg_options);
    }
};

// Source: js/plugins/donut.js
var Donut = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.value = 0;
        this.animation_change_interval = null;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onDonutCreate, [this.element]);

        return this;
    },

    options: {
        size: 100,
        radius: 50,
        hole: .8,
        value: 0,
        background: "#ffffff",
        color: "",
        stroke: "#d1d8e7",
        fill: "#49649f",
        fontSize: 24,
        total: 100,
        cap: "%",
        showText: true,
        showValue: false,
        animate: 0,
        onChange: Metro.noop,
        onDonutCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var html = "";
        var r = o.radius  * (1 - (1 - o.hole) / 2);
        var width = o.radius * (1 - o.hole);
        var circumference = 2 * Math.PI * r;
        var strokeDasharray = ((o.value * circumference) / o.total) + ' ' + circumference;
        var transform = 'rotate(-90 ' + o.radius + ',' + o.radius + ')';
        var fontSize = r * o.hole * 0.6;

        element.addClass("donut");

        element.css({
            width: o.size,
            height: o.size,
            background: o.background
        });

        html += "<svg>";
        html += "   <circle class='donut-back' r='"+(r)+"px' cx='"+(o.radius)+"px' cy='"+(o.radius)+"px' transform='"+(transform)+"' fill='none' stroke='"+(o.stroke)+"' stroke-width='"+(width)+"'/>";
        html += "   <circle class='donut-fill' r='"+(r)+"px' cx='"+(o.radius)+"px' cy='"+(o.radius)+"px' transform='"+(transform)+"' fill='none' stroke='"+(o.fill)+"' stroke-width='"+(width)+"'/>";
        if (o.showText === true) html += "   <text   class='donut-title' x='"+(o.radius)+"px' y='"+(o.radius)+"px' dy='"+(fontSize/3)+"px' text-anchor='middle' fill='"+(o.color !== "" ? o.color: o.fill)+"' font-size='"+(fontSize)+"px'>0"+(o.cap)+"</text>";
        html += "</svg>";

        element.html(html);

        this.val(o.value);
    },

    _setValue: function(v){
        var that = this, element = this.element, o = this.options;

        var fill = element.find(".donut-fill");
        var title = element.find(".donut-title");
        var r = o.radius  * (1 - (1 - o.hole) / 2);
        var circumference = 2 * Math.PI * r;
        // var title_value = (o.showValue ? o.value : Math.round(((v * 1000 / o.total) / 10)))+(o.cap);
        var title_value = (o.showValue ? v : Utils.percent(o.total, v, true))  + (o.cap);
        var fill_value = ((v * circumference) / o.total) + ' ' + circumference;

        fill.attr("stroke-dasharray", fill_value);
        title.html(title_value);
    },

    val: function(v){
        var that = this, element = this.element, o = this.options;

        if (v === undefined) {
            return this.value
        }

        if (parseInt(v) < 0 || parseInt(v) > o.total) {
            return false;
        }

        if (o.animate > 0 && !document.hidden) {
            var inc = v > that.value;
            var i = that.value + (inc ? -1 : 1);

            clearInterval(that.animation_change_interval);
            this.animation_change_interval = setInterval(function(){
                if (inc) {
                    that._setValue(++i);
                    if (i >= v) {
                        clearInterval(that.animation_change_interval);
                    }
                } else {
                    that._setValue(--i);
                    if (i <= v) {
                        clearInterval(that.animation_change_interval);
                    }
                }
            }, o.animate);
        } else {
            clearInterval(that.animation_change_interval);
            this._setValue(v);
        }

        this.value = v;
        //element.attr("data-value", v);
        Utils.exec(o.onChange, [this.value, element]);
    },

    changeValue: function(){
        this.val(this.element.attr("data-value"));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-value": this.changeValue(); break;
        }
    },

    destroy: function(){
        this.element.removeClass("donut").html("");
    }
};

Metro.plugin('donut', Donut);

// Source: js/plugins/draggable.js
var Draggable = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.drag = false;
        this.move = false;
        this.backup = {
            cursor: 'default',
            zIndex: '0'
        };

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onDraggableCreate, [this.element]);

        return this;
    },

    options: {
        dragElement: 'self',
        dragArea: "parent",
        onCanDrag: Metro.noop_true,
        onDragStart: Metro.noop,
        onDragStop: Metro.noop,
        onDragMove: Metro.noop,
        onDraggableCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var dragArea;
        var offset, position, shift, coords;
        var dragElement  = o.dragElement !== 'self' ? element.find(o.dragElement) : element;

        dragElement[0].ondragstart = function(){return false;};

        dragElement.on(Metro.events.start, function(e){

            if (element.data("canDrag") === false || Utils.exec(o.onCanDrag, [element]) !== true) {
                return ;
            }

            if (isTouch === false && e.which !== 1) {
                return ;
            }

            that.drag = true;

            that.backup.cursor = element.css("cursor");
            that.backup.zIndex = element.css("z-index");

            element.addClass("draggable");

            if (o.dragArea === 'document' || o.dragArea === 'window') {
                o.dragArea = "body";
            }

            if (o.dragArea === 'parent') {
                dragArea = element.parent();
            } else {
                dragArea = $(o.dragArea);
            }

            offset = {
                left: dragArea.offset().left,
                top:  dragArea.offset().top
            };

            position = Utils.pageXY(e);

            var drg_h = element.outerHeight(),
                drg_w = element.outerWidth(),
                pos_y = element.offset().top + drg_h - Utils.pageXY(e).y,
                pos_x = element.offset().left + drg_w - Utils.pageXY(e).x;

            Utils.exec(o.onDragStart, [position, element]);

            $(document).on(Metro.events.move, function(e){
                var pageX, pageY;

                if (that.drag === false) {
                    return ;
                }
                that.move = true;

                pageX = Utils.pageXY(e).x - offset.left;
                pageY = Utils.pageXY(e).y - offset.top;

                var t = (pageY > 0) ? (pageY + pos_y - drg_h) : (0);
                var l = (pageX > 0) ? (pageX + pos_x - drg_w) : (0);
                var t_delta = dragArea.innerHeight() + dragArea.scrollTop() - element.outerHeight();
                var l_delta = dragArea.innerWidth() + dragArea.scrollLeft() - element.outerWidth();

                if(t >= 0 && t <= t_delta) {
                    position.y = t;
                    element.offset({top: t + offset.top});
                }
                if(l >= 0 && l <= l_delta) {
                    position.x = l;
                    element.offset({left: l + offset.left});
                }

                Utils.exec(o.onDragMove, [position, element]);

                e.preventDefault();
            });
        });

        dragElement.on(Metro.events.stop, function(e){
            element.css({
                cursor: that.backup.cursor,
                zIndex: that.backup.zIndex
            }).removeClass("draggable");
            that.drag = false;
            that.move = false;
            position = Utils.pageXY(e);
            $(document).off(Metro.events.move);
            //console.log(o.onDragStop);
            Utils.exec(o.onDragStop, [position, element]);
        });
    },

    off: function(){
        this.element.data("canDrag", false);
    },

    on: function(){
        this.element.data("canDrag", true);
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('draggable', Draggable);

// Source: js/plugins/dropdown.js
var Dropdown = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this._toggle = null;
        this.displayOrigin = null;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onDropdownCreate, [this.element]);

        return this;
    },

    options: {
        effect: 'slide',
        toggleElement: null,
        noClose: false,
        duration: 100,
        onDrop: Metro.noop,
        onUp: Metro.noop,
        onDropdownCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var toggle, parent = element.parent();

        toggle = o.toggleElement !== null ? $(o.toggleElement) : element.siblings('.dropdown-toggle').length > 0 ? element.siblings('.dropdown-toggle') : element.prev();

        this.displayOrigin = element.css("display");
        this.element.css("display", "none");

        toggle.on(Metro.events.click, function(e){
            parent.siblings(parent[0].tagName).removeClass("active-container");
            $(".active-container").removeClass("active-container");

            if (element.css('display') !== 'none' && !element.hasClass('keep-open')) {
                that._close(element);
            } else {
                $('[data-role=dropdown]').each(function(i, el){
                    if (!element.parents('[data-role=dropdown]').is(el) && !$(el).hasClass('keep-open') && $(el).css('display') !== 'none') {
                        that._close(el);
                    }
                });
                if (element.hasClass('horizontal')) {
                    element.css({
                        'visibility': 'hidden',
                        'display': 'block'
                    });
                    var children_width = 0;
                    $.each(element.children('li'), function(){
                        children_width += $(this).outerWidth(true);
                    });

                    element.css({
                        'visibility': 'visible',
                        'display': 'none'
                    });
                    var menu_width = children_width;
                    element.css('width', menu_width);
                }
                that._open(element);
                parent.addClass("active-container");
            }
            e.preventDefault();
            e.stopPropagation();
        });

        this._toggle = toggle;

        if (o.noClose === true) {
            element.addClass("keep-open").on(Metro.events.click, function (e) {
                //e.preventDefault();
                e.stopPropagation();
            });
        }

        $(element).find('li.disabled a').on(Metro.events.click, function(e){
            e.preventDefault();
        });
    },

    _close: function(el){

        if (Utils.isJQueryObject(el) === false) {
            el = $(el);
        }

        var dropdown  = el.data("dropdown");
        var toggle = dropdown._toggle;
        var options = dropdown.options;
        var func = options.effect === "slide" ? "slideUp" : "fadeOut";

        toggle.removeClass('active-toggle').removeClass("active-control");
        dropdown.element.parent().removeClass("active-container");
        el[func](options.duration, function(){
            el.trigger("onClose", null, el);
        });
        Utils.exec(options.onUp, [el]);
    },

    _open: function(el){
        if (Utils.isJQueryObject(el) === false) {
            el = $(el);
        }

        var dropdown  = el.data("dropdown");
        var toggle = dropdown._toggle;
        var options = dropdown.options;
        var func = options.effect === "slide" ? "slideDown" : "fadeIn";

        toggle.addClass('active-toggle').addClass("active-control");
        el[func](options.duration, function(){
            el.trigger("onOpen", null, el);
        });
        Utils.exec(options.onDrop, [el]);
    },

    close: function(){
        this._close(this.element);
    },

    open: function(){
        this._open(this.element);
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        this._toggle.off(Metro.events.click);
    }
};

$(document).on(Metro.events.click, function(e){
    $('[data-role*=dropdown]').each(function(){
        var el = $(this);

        if (el.css('display')==='block' && el.hasClass('keep-open') === false) {
            var dropdown = el.data('dropdown');
            dropdown.close();
        }
    });
});

Metro.plugin('dropdown', Dropdown);

// Source: js/plugins/file.js
var File = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onFileCreate, [this.element]);

        return this;
    },
    options: {
        copyInlineStyles: true,
        prepend: "",
        caption: "Choose file",
        disabled: false,
        onSelect: Metro.noop,
        onFileCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        this._createStructure();
        this._createEvents();
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var container = $("<div>").addClass("file " + element[0].className);
        var caption = $("<span>").addClass("caption");
        var button;

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);
        caption.insertBefore(element);

        button = $("<button>").addClass("button").attr("tabindex", -1).attr("type", "button").html(o.caption);
        button.appendTo(container);

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl");
        }

        element[0].className = '';

        if (o.prepend !== "") {
            var prepend = Utils.isTag(o.prepend) ? $(o.prepend) : $("<span>"+o.prepend+"</span>");
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                container.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        if (o.disabled === true || element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }
    },

    _createEvents: function(){
        var element = this.element, o = this.options;
        var parent = element.parent();
        var caption = parent.find(".caption");
        parent.on(Metro.events.click, "button, .caption", function(){
            element.trigger("click");
        });
        element.on(Metro.events.change, function(){
            var fi = this;
            var file_names = [];
            var entry = "";
            if (fi.files.length === 0) {
                return ;
            }

            Array.from(fi.files).forEach(function(file){
                file_names.push(file.name);
            });

            entry = file_names.join(", ");

            caption.html(entry);
            caption.attr('title', entry);

            Utils.exec(o.onSelect, [fi.files, element], element[0]);
        });
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    toggleDir: function(){
        if (this.element.attr("dir") === 'rtl') {
            this.element.parent().addClass("rtl");
        } else {
            this.element.parent().removeClass("rtl");
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
            case 'dir': this.toggleDir(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        var parent = element.parent();
        element.off(Metro.events.change);
        parent.off(Metro.events.click, "button, .caption");
        element.insertBefore(parent);
        parent.remove();
    }
};

Metro.plugin('file', File);

// Source: js/plugins/gravatar.js
var Gravatar = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onGravatarCreate, [this.element]);

        return this;
    },
    options: {
        email: "",
        size: 80,
        default: "404",
        onGravatarCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        this.get();
    },

    getImage: function(email, size, def, is_jquery_object){
        var image = $("<img>");
        image.attr("src", this.getImageSrc(email, size));
        return is_jquery_object === true ? image : image[0];
    },

    getImageSrc: function(email, size, def){
        if (email === undefined || email.trim() === '') {
            return "";
        }

        size = size || 80;
        def = Utils.encodeURI(def) || '404';

        return "//www.gravatar.com/avatar/" + Utils.md5((email.toLowerCase()).trim()) + '?size=' + size + '&d=' + def;
    },

    get: function(){
        var that = this, element = this.element, o = this.options;
        var img = element[0].tagName === 'IMG' ? element : element.find("img");
        if (img.length === 0) {
            return;
        }
        img.attr("src", this.getImageSrc(o.email, o.size, o.default));
        return this;
    },

    resize: function(new_size){
        this.options.size = new_size !== undefined ? new_size : this.element.attr("data-size");
        this.get();
    },

    email: function(new_email){
        this.options.email = new_email !== undefined ? new_email : this.element.attr("data-email");
        this.get();
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'data-size': this.resize(); break;
            case 'data-email': this.email(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        if (element[0].tagName.toLowerCase() !== "img") {
            element.html("");
        }
    }
};

Metro.plugin('gravatar', Gravatar);

// Source: js/plugins/hint.js
var Hint = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.hint = null;
        this.hint_size = {
            width: 0,
            height: 0
        };

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onHintCreate, [this.element]);

        return this;
    },

    options: {
        hintHide: 5000,
        clsHint: "",
        hintText: "",
        hintPosition: Metro.position.TOP,
        hintOffset: 4,
        onHintCreate: Metro.noop,
        onHintShow: Metro.noop,
        onHintHide: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.enter + "-hint", function(){
            that.createHint();
            if (o.hintHide > 0) {
                setTimeout(function(){
                    that.removeHint();
                }, o.hintHide);
            }
        });

        element.on(Metro.events.leave + "-hint", function(){
            that.removeHint();
        });

        $(window).on(Metro.events.scroll + "-hint", function(){
            if (that.hint !== null) that.setPosition();
        });
    },

    createHint: function(){
        var that = this, elem = this.elem, element = this.element, o = this.options;
        var hint = $("<div>").addClass("hint").addClass(o.clsHint).html(o.hintText);

        this.hint = hint;
        this.hint_size = Utils.hiddenElementSize(hint);

        $(".hint:not(.permanent-hint)").remove();

        if (elem.tagName === 'TD' || elem.tagName === 'TH') {
            var wrp = $("<div/>").css("display", "inline-block").html(element.html());
            element.html(wrp);
            element = wrp;
        }

        this.setPosition();

        hint.appendTo($('body'));
        Utils.exec(o.onHintShow, [hint, element]);
    },

    setPosition: function(){
        var hint = this.hint, hint_size = this.hint_size, o = this.options, element = this.element;

        if (o.hintPosition === Metro.position.BOTTOM) {
            hint.addClass('bottom');
            hint.css({
                top: element.offset().top - $(window).scrollTop() + element.outerHeight() + o.hintOffset,
                left: element.offset().left + element.outerWidth()/2 - hint_size.width/2  - $(window).scrollLeft()
            });
        } else if (o.hintPosition === Metro.position.RIGHT) {
            hint.addClass('right');
            hint.css({
                top: element.offset().top + element.outerHeight()/2 - hint_size.height/2 - $(window).scrollTop(),
                left: element.offset().left + element.outerWidth() - $(window).scrollLeft() + o.hintOffset
            });
        } else if (o.hintPosition === Metro.position.LEFT) {
            hint.addClass('left');
            hint.css({
                top: element.offset().top + element.outerHeight()/2 - hint_size.height/2 - $(window).scrollTop(),
                left: element.offset().left - hint_size.width - $(window).scrollLeft() - o.hintOffset
            });
        } else {
            hint.addClass('top');
            hint.css({
                top: element.offset().top - $(window).scrollTop() - hint_size.height - o.hintOffset,
                left: element.offset().left + element.outerWidth()/2 - hint_size.width/2  - $(window).scrollLeft()
            });
        }
    },

    removeHint: function(){
        var that = this;
        var hint = this.hint;
        var element = this.element;
        var options = this.options;
        var timeout = options.onHintHide === Metro.noop ? 0 : 300;

        if (hint !== null) {
            Utils.exec(options.onHintHide, [hint, element]);
            setTimeout(function(){
                hint.hide(0, function(){
                    hint.remove();
                    that.hint = null;
                });
            }, timeout);
        }
    },

    changeText: function(){
        this.options.hintText = this.element.attr("data-hint-text");
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-hint-text": this.changeText(); break;
        }
    },

    destroy: function(){
        var that = this, elem = this.elem, element = this.element, o = this.options;
        this.removeHint();
        element.off(Metro.events.enter + "-hint");
        element.off(Metro.events.leave + "-hint");
        $(window).off(Metro.events.scroll + "-hint");
    }
};

Metro.plugin('hint', Hint);

// Source: js/plugins/info-box.js
var InfoBox = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.overlay = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        type: "",
        width: 480,
        height: "auto",
        overlay: true,
        overlayColor: '#000000',
        overlayAlpha: .5,
        autoHide: 0,
        removeOnClose: false,
        closeButton: true,
        clsBox: "",
        clsBoxContent: "",
        clsOverlay: "",
        onOpen: Metro.noop,
        onClose: Metro.noop,
        onInfoBoxCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onInfoBoxCreate, [element], element[0]);
    },

    _overlay: function(){
        var that = this, element = this.element, o = this.options;

        var overlay = $("<div>");
        overlay.addClass("overlay").addClass(o.clsOverlay);

        if (o.overlayColor === 'transparent') {
            overlay.addClass("transparent");
        } else {
            overlay.css({
                background: Utils.hex2rgba(o.overlayColor, o.overlayAlpha)
            });
        }

        return overlay;
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var closer, content;

        if (o.overlay === true) {
            this.overlay = this._overlay();
        }

        if (element.attr("id") === undefined) {
            element.attr("id", Utils.elementId("infobox"));
        }

        element.addClass("info-box").addClass(o.type).addClass(o.clsBox);

        closer = element.find("closer");
        if (closer.length === 0) {
            closer = $("<span>").addClass("button square closer");
            closer.appendTo(element);
        }

        if (o.closeButton !== true) {
            closer.hide();
        }

        content = element.find(".info-box-content");
        if (content.length > 0) {
            content.addClass(o.clsBoxContent);
        }

        element.css({
            width: o.width,
            height: o.height,
            visibility: "hidden",
            top: '100%',
            left: ( $(window).width() - element.outerWidth() ) / 2
        });

        element.appendTo($('body'));
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".closer", function(){
            that.close();
        });

        element.on(Metro.events.click, ".js-dialog-close", function(){
            that.close();
        });

        $(window).on(Metro.events.resize + "_" + element.attr("id"), function(){
            that.reposition();
        });
    },

    _setPosition: function(){
        var element = this.element;
        element.css({
            top: ( $(window).height() - element.outerHeight() ) / 2,
            left: ( $(window).width() - element.outerWidth() ) / 2
        });
    },

    reposition: function(){
        this._setPosition();
    },

    setContent: function(c){
        var that = this, element = this.element, o = this.options;
        var content = element.find(".info-box-content");
        if (content.length === 0) {
            return ;
        }
        content.html(c);
        this.reposition();
    },

    setType: function(t){
        var that = this, element = this.element, o = this.options;
        element.removeClass("success info alert warning").addClass(t);
    },

    open: function(){
        var that = this, element = this.element, o = this.options;

        if (o.overlay === true) {
            this.overlay.appendTo($("body"));
        }

        this._setPosition();

        element.css({
            visibility: "visible"
        });

        Utils.exec(o.onOpen, [element], element[0]);
        element.data("open", true);
        if (parseInt(o.autoHide) > 0) {
            setTimeout(function(){
                that.close();
            }, parseInt(o.autoHide));
        }
    },

    close: function(){
        var that = this, element = this.element, o = this.options;

        if (o.overlay === true) {
            $('body').find('.overlay').remove();
        }

        element.css({
            visibility: "hidden",
            top: "100%"
        });

        Utils.exec(o.onClose, [element], element[0]);
        element.data("open", false);

        if (o.removeOnClose === true) {
            this.destroy();
            element.remove();
        }
    },

    isOpen: function(){
        return this.element.data("open") === true;
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var that = this, element = this.element, o = this.options;

        element.off(Metro.events.click, ".closer");
        element.off(Metro.events.click, ".js-dialog-close");
        $(window).off(Metro.events.resize + "_" + element.attr("id"));
    }
};

Metro.plugin('infobox', InfoBox);

Metro['infobox'] = {
    isInfoBox: function(el){
        return Utils.isMetroObject(el, "dialog");
    },

    open: function(el, c, t){
        if (!this.isInfoBox(el)) {
            return false;
        }
        var ib = $(el).data("infobox");
        if (c !== undefined) {
            ib.setContent(c);
        }
        if (t !== undefined) {
            ib.setType(t);
        }
        ib.open();
    },

    close: function(el){
        if (!this.isInfoBox(el)) {
            return false;
        }
        var ib = $(el).data("infobox");
        ib.close();
    },

    setContent: function(el, c){
        if (!this.isInfoBox(el)) {
            return false;
        }

        if (c === undefined) {
            c = "";
        }

        var ib = $(el).data("infobox");
        ib.setContent(c);
        ib.reposition();
    },

    setType: function(el, t){
        if (!this.isInfoBox(el)) {
            return false;
        }

        var ib = $(el).data("infobox");
        ib.setType(t);
        ib.reposition();
    },

    isOpen: function(el){
        if (!this.isInfoBox(el)) {
            return false;
        }
        var ib = $(el).data("infobox");
        return ib.isOpen();
    },

    create: function(c, t, o, open){
        var el, ib, box_type, con;

        box_type = t !== undefined ? t : "";

        el = $("<div>").appendTo($("body"));
        $("<div>").addClass("info-box-content").appendTo(el);

        var ib_options = $.extend({}, {
            removeOnClose: true,
            type: box_type
        }, (o !== undefined ? o : {}));

        el.infobox(ib_options);
        ib = el.data('infobox');
        ib.setContent(c);
        if (open !== false) {
            ib.open();
        }

        return el;
    }
};

// Source: js/plugins/input.js
var Input = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onInputCreate, [this.element]);

        return this;
    },
    options: {
        defaultValue: "",
        clsElement: "",
        clsInput: "",
        clsPrepend: "",
        clsAppend: "",
        clsClearButton: "",
        clsRevealButton: "",
        size: "default",
        prepend: "",
        append: "",
        copyInlineStyles: true,
        clearButton: true,
        revealButton: true,
        clearButtonIcon: "<span class='default-icon-cross'></span>",
        revealButtonIcon: "<span class='default-icon-eye'></span>",
        customButtons: [],
        disabled: false,
        onInputCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var container = $("<div>").addClass("input " + element[0].className);
        var buttons = $("<div>").addClass("button-group");
        var clearButton, revealButton;

        if (element.attr("type") === undefined) {
            element.attr("type", "text");
        }

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);
        buttons.appendTo(container);

        if (!Utils.isValue(element.val().trim())) {
            element.val(o.defaultValue);
        }

        if (o.clearButton !== false) {
            clearButton = $("<button>").addClass("button input-clear-button").addClass(o.clsClearButton).attr("tabindex", -1).attr("type", "button").html(o.clearButtonIcon);
            clearButton.on(Metro.events.click, function(){
                element.val(Utils.isValue(o.defaultValue) ? o.defaultValue : "").trigger('change').trigger('keyup').focus();
            });
            clearButton.appendTo(buttons);
        }
        if (element.attr('type') === 'password' && o.revealButton !== false) {
            revealButton = $("<button>").addClass("button input-reveal-button").addClass(o.clsRevealButton).attr("tabindex", -1).attr("type", "button").html(o.revealButtonIcon);
            revealButton
                .on(Metro.events.start, function(){element.attr('type', 'text');})
                .on(Metro.events.stop, function(){element.attr('type', 'password').focus();});
            revealButton.appendTo(buttons);
        }

        if (o.prepend !== "") {
            var prepend = Utils.isTag(o.prepend) ? $(o.prepend) : $("<span>"+o.prepend+"</span>");
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        if (typeof o.customButtons === "string") {
            o.customButtons = Utils.isObject(o.customButtons);
        }

        if (typeof o.customButtons === "object" && Utils.objectLength(o.customButtons) > 0) {
            $.each(o.customButtons, function(){
                var item = this;
                var customButton = $("<button>").addClass("button input-custom-button").addClass(item.cls).attr("tabindex", -1).attr("type", "button").html(item.html);
                customButton.on(Metro.events.click, function(){
                    Utils.exec(item.onclick, [element.val(), customButton], element[0]);
                });
                customButton.appendTo(buttons);
            });
        }

        if (o.append !== "") {
            var append = Utils.isTag(o.append) ? $(o.append) : $("<span>"+o.append+"</span>");
            append.addClass("append").addClass(o.clsAppend).appendTo(container);
        }

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl").attr("dir", "rtl");
        }

        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                container.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        container.addClass(o.clsElement);
        element.addClass(o.clsInput);

        if (o.size !== "default") {
            container.css({
                width: o.size
            });
        }

        element.on(Metro.events.blur, function(){container.removeClass("focused");});
        element.on(Metro.events.focus, function(){container.addClass("focused");});

        if (o.disabled === true || element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }
    },

    disable: function(){
        //this.element.attr("disabled", true);
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        //this.element.attr("disabled", false);
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
        }
    },

    destroy: function(){
        var that = this, element = this.element, o = this.options;
        var parent = element.parent();
        var clearBtn = parent.find(".input-clear-button");
        var revealBtn = parent.find(".input-reveal-button");
        var customBtn = parent.find(".input-custom-button");

        if (clearBtn.length > 0) {
            clearBtn.off(Metro.events.click);
        }
        if (revealBtn.length > 0) {
            revealBtn.off(Metro.events.start);
            revealBtn.off(Metro.events.stop);
        }
        if (customBtn.length > 0) {
            clearBtn.off(Metro.events.click);
        }

        element.off(Metro.events.blur);
        element.off(Metro.events.focus);

        element.insertBefore(parent);
        parent.remove();
    }
};

Metro.plugin('input', Input);

// Source: js/plugins/keypad.js
var Keypad = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.value = "";
        this.positions = ["top-left", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left"];
        this.keypad = null;

        this._setOptionsFromDOM();

        this.keys = Utils.strToArray(this.options.keys, ",");
        this.keys_to_work = this.keys;

        this._create();

        return this;
    },

    options: {
        keySize: 32,
        keys: "1, 2, 3, 4, 5, 6, 7, 8, 9, 0",
        copyInlineStyles: false,
        target: null,
        length: 0,
        shuffle: false,
        shuffleCount: 3,
        position: Metro.position.BOTTOM_LEFT, //top-left, top, top-right, right, bottom-right, bottom, bottom-left, left
        dynamicPosition: false,
        serviceButtons: true,
        showValue: true,
        open: false,
        sizeAsKeys: false,

        clsKeypad: "",
        clsInput: "",
        clsKeys: "",
        clsKey: "",
        clsServiceKey: "",
        clsBackspace: "",
        clsClear: "",

        onChange: Metro.noop,
        onClear: Metro.noop,
        onBackspace: Metro.noop,
        onShuffle: Metro.noop,
        onKey: Metro.noop,
        onKeypadCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        this._createKeypad();
        if (this.options.shuffle === true) {
            this.shuffle();
        }
        this._createKeys();
        this._createEvents();

        Utils.exec(this.options.onKeypadCreate, [this.element]);
    },

    _createKeypad: function(){
        var element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var keypad, keys;

        if (parent.hasClass("input")) {
            keypad = parent;
        } else {
            keypad = $("<div>").addClass("input").addClass(element[0].className);
        }

        keypad.addClass("keypad");
        if (keypad.css("position") === "static" || keypad.css("position") === "") {
            keypad.css({
                position: "relative"
            });
        }

        if (element.attr("type") === undefined) {
            element.attr("type", "text");
        }

        if (prev.length === 0) {
            parent.prepend(keypad);
        } else {
            keypad.insertAfter(prev);
        }

        element.attr("readonly", true);
        element.appendTo(keypad);

        keys = $("<div>").addClass("keys").addClass(o.clsKeys);
        keys.appendTo(keypad);
        this._setKeysPosition();

        if (o.open === true) {
            keys.addClass("open keep-open");
        }


        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                keypad.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        element.addClass(o.clsInput);
        keypad.addClass(o.clsKeypad);

        element.on(Metro.events.blur, function(){keypad.removeClass("focused");});
        element.on(Metro.events.focus, function(){keypad.addClass("focused");});

        if (o.disabled === true || element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }

        this.keypad = keypad;
    },

    _setKeysPosition: function(){
        var element = this.element, o = this.options;
        var keypad = element.parent();
        var keys = keypad.find(".keys");
        keys.removeClass(this.positions.join(" ")).addClass(o.position)
    },

    _createKeys: function(){
        var element = this.element, o = this.options;
        var keypad = element.parent();
        var factor = Math.round(Math.sqrt(this.keys.length + 2));
        var key_size = o.keySize;
        var width = factor * key_size + factor * 4;
        var key, keys = keypad.find(".keys");

        keys.html("");

        $.each(this.keys_to_work, function(){
            key = $("<span>").addClass("key").addClass(o.clsKey).html(this);
            key.data("key", this);
            key.css({
                width: o.keySize,
                height: o.keySize,
                lineHeight: o.keySize - 4 + "px"
            }).appendTo(keys);
        });

        if (o.serviceButtons === true) {

            var service_keys = ['&larr;', '&times;'];

            $.each(service_keys, function () {
                key = $("<span>").addClass("key service-key").addClass(o.clsKey).addClass(o.clsServiceKey).html(this);
                if (this === '&larr;') {
                    key.addClass(o.clsBackspace);
                }
                if (this === '&times;') {
                    key.addClass(o.clsClear);
                }
                key.data("key", this);
                key.css({
                    width: o.keySize,
                    height: o.keySize,
                    lineHeight: o.keySize - 4 + "px"
                }).appendTo(keys);
            });
        }

        keys.width(width);

        if (o.sizeAsKeys === true && ['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right'].indexOf(o.position) !== -1) {
            keypad.outerWidth(keys.outerWidth());
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var keypad = element.parent();
        var keys = keypad.find(".keys");

        keypad.on(Metro.events.click, ".keys", function(e){
            e.preventDefault();
            e.stopPropagation();
        });

        keypad.on(Metro.events.click, function(e){
            if (o.open === true) {
                return ;
            }
            if (keys.hasClass("open") === true) {
                keys.removeClass("open");
            } else {
                keys.addClass("open");
            }
            e.preventDefault();
            e.stopPropagation();
        });

        keypad.on(Metro.events.click, ".key", function(e){
            var key = $(this);

            if (key.data('key') !== '&larr;' && key.data('key') !== '&times;') {
                if (o.length > 0 && (String(that.value).length === o.length)) {
                    return false;
                }

                that.value = that.value + "" + key.data('key');

                if (o.shuffle === true) {
                    that.shuffle();
                    that._createKeys();
                }

                if (o.dynamicPosition === true) {
                    o.position = that.positions[Utils.random(0, that.positions.length - 1)];
                    that._setKeysPosition();
                }

                Utils.exec(o.onKey, [key.data('key'), that.value, element]);
            } else {
                if (key.data('key') === '&times;') {
                    that.value = "";
                    Utils.exec(o.onClear, [element]);
                }
                if (key.data('key') === '&larr;') {
                    that.value = (that.value.substring(0, that.value.length - 1));
                    Utils.exec(o.onBackspace, [that.value, element]);
                }
            }

            if (o.showValue === true) {
                if (element[0].tagName === "INPUT") {
                    element.val(that.value);
                } else {
                    element.text(that.value);
                }
            }

            element.trigger('change');
            Utils.exec(o.onChange, [that.value, element]);

            e.preventDefault();
            e.stopPropagation();
        });

        if (o.target !== null) {
            element.on(Metro.events.change, function(){
                var t = $(o.target);
                if (t.length === 0) {
                    return ;
                }
                if (t[0].tagName === "INPUT") {
                    t.val(that.value);
                } else {
                    t.text(that.value);
                }
            });
        }
    },

    shuffle: function(){
        for (var i = 0; i < this.options.shuffleCount; i++) {
            this.keys_to_work = this.keys_to_work.shuffle();
        }
        Utils.exec(this.options.onShuffle, [this.keys_to_work, this.keys, this.element]);
    },

    shuffleKeys: function(count){
        if (count === undefined) {
            count = this.options.shuffleCount;
        }
        for (var i = 0; i < count; i++) {
            this.keys_to_work = this.keys_to_work.shuffle();
        }
        this._createKeys();
    },

    val: function(v){
        if (v !== undefined) {
            this.value = v;
            this.element[0].tagName === "INPUT" ? this.element.val(v) : this.element.text(v);
        } else {
            return this.value;
        }
    },

    open: function(){
        var element = this.element;
        var keypad = element.parent();
        var keys = keypad.find(".keys");

        keys.addClass("open");
    },

    close: function(){
        var element = this.element;
        var keypad = element.parent();
        var keys = keypad.find(".keys");

        keys.removeClass("open");
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    setPosition: function(pos){
        var new_position = pos !== undefined ? pos : this.element.attr("data-position");
        if (this.positions.indexOf(new_position) === -1) {
            return ;
        }
        this.options.position = new_position;
        this._setKeysPosition();
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
            case 'data-position': this.setPosition(); break;
        }
    },

    destroy: function(){
        var element = this.element, keypad = this.keypad;

        keypad.off(Metro.events.click, ".keys");
        keypad.off(Metro.events.click);
        keypad.off(Metro.events.click, ".key");
        element.off(Metro.events.change);

        element.insertBefore(keypad);
        keypad.remove();
    }
};

Metro.plugin('keypad', Keypad);

$(document).on(Metro.events.click, function(){
    var keypads = $(".keypad .keys");
    $.each(keypads, function(){
        if (!$(this).hasClass("keep-open")) {
            $(this).removeClass("open");
        }
    });
});


// Source: js/plugins/list.js
var List = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.currentPage = 1;
        this.pagesCount = 1;
        this.filterString = "";
        this.data = null;
        this.activity = null;
        this.busy = false;
        this.filters = [];
        this.wrapperInfo = null;
        this.wrapperSearch = null;
        this.wrapperRows = null;
        this.wrapperPagination = null;
        this.filterIndex = null;
        this.filtersIndexes = [];

        this.sort = {
            dir: "asc",
            colIndex: 0
        };

        this.header = null;
        this.items = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {

        thousandSeparator: ",",
        decimalSeparator: ",",

        sortTarget: "li",
        sortClass: null,
        sortDir: "asc",
        sortInitial: false,

        filterClass: null,
        filter: null,
        filterString: "",
        filters: null,
        source: null,

        showItemsSteps: false,
        showSearch: false,
        showListInfo: false,
        showPagination: false,
        showAllPages: false,
        showActivity: true,

        muteList: true,

        items: -1,
        itemsSteps: "all, 10,25,50,100",

        itemsAllTitle: "Show all",
        listItemsCountTitle: "Show entries:",
        listSearchTitle: "Search:",
        listInfoTitle: "Showing $1 to $2 of $3 entries",
        paginationPrevTitle: "Prev",
        paginationNextTitle: "Next",

        activityType: "cycle",
        activityStyle: "color",
        activityTimeout: 100,

        searchWrapper: null,
        rowsWrapper: null,
        infoWrapper: null,
        paginationWrapper: null,

        clsComponent: "",
        clsList: "",
        clsListItem: "",

        clsListTop: "",
        clsItemsCount: "",
        clsSearch: "",

        clsListBottom: "",
        clsListInfo: "",
        clsListPagination: "",

        clsPagination: "",

        onDraw: Metro.noop,
        onDrawItem: Metro.noop,
        onSortStart: Metro.noop,
        onSortStop: Metro.noop,
        onSortItemSwitch: Metro.noop,
        onSearch: Metro.noop,
        onRowsCountChange: Metro.noop,
        onDataLoad: Metro.noop,
        onDataLoaded: Metro.noop,
        onFilterItemAccepted: Metro.noop,
        onFilterItemDeclined: Metro.noop,

        onListCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        if (o.source !== null) {
            Utils.exec(o.onDataLoad, [o.source], element[0]);

            $.get(o.source, function(data){
                that._build(data);
                Utils.exec(o.onDataLoaded, [o.source, data], element[0]);
            }).fail(function( jqXHR, textStatus, errorThrown) {
                console.log(textStatus); console.log(jqXHR); console.log(errorThrown);
            });
        } else {
            that._build();
        }
    },

    _build: function(data){
        var element = this.element, o = this.options;

        if (Utils.isValue(data)) {
            this._createItemsFromJSON(data);
        } else {
            this._createItemsFromHTML()
        }

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onListCreate, [element], element[0]);
    },

    _createItemsFromHTML: function(){
        var that = this, element = this.element, o = this.options;

        this.items = [];

        $.each(element.children(o.sortTarget), function(){
            that.items.push(this);
        });
    },

    _createItemsFromJSON: function(source){
        var that = this;

        this.items = [];

        if (Utils.isValue(source.header)) {
            that.header = source.header;
        }

        if (Utils.isValue(source.data)) {
            $.each(source.data, function(){
                var row = this;
                var li = document.createElement("li");
                var inner = Utils.isValue(that.header.template) ? that.header.template : "";

                $.each(row, function(k, v){
                    inner = inner.replace("$"+k, v);
                });

                li.innerHTML = inner;
                that.items.push(li);
            });
        }
    },

    _createTopBlock: function (){
        var that = this, element = this.element, o = this.options;
        var top_block = $("<div>").addClass("list-top").addClass(o.clsListTop).insertBefore(element);
        var search_block, search_input, rows_block, rows_select;

        search_block = Utils.isValue(this.wrapperSearch) ? this.wrapperSearch : $("<div>").addClass("list-search-block").addClass(o.clsSearch).appendTo(top_block);

        search_input = $("<input>").attr("type", "text").appendTo(search_block);
        search_input.input({
            prepend: o.listSearchTitle
        });

        if (o.showSearch !== true) {
            search_block.hide();
        }

        rows_block = Utils.isValue(this.wrapperRows) ? this.wrapperRows : $("<div>").addClass("list-rows-block").addClass(o.clsItemsCount).appendTo(top_block);

        rows_select = $("<select>").appendTo(rows_block);
        $.each(Utils.strToArray(o.itemsSteps), function () {
            var option = $("<option>").attr("value", this === "all" ? -1 : this).text(this === "all" ? o.itemsAllTitle : this).appendTo(rows_select);
            if (parseInt(this) === parseInt(o.items)) {
                option.attr("selected", "selected");
            }
        });
        rows_select.select({
            filter: false,
            prepend: o.listItemsCountTitle,
            onChange: function (val) {
                if (parseInt(val) === parseInt(o.items)) {
                    return;
                }
                o.items = parseInt(val);
                that.currentPage = 1;
                that._draw();
                Utils.exec(o.onRowsCountChange, [val], element[0])
            }
        });

        if (o.showItemsSteps !== true) {
            rows_block.hide();
        }

        return top_block;
    },

    _createBottomBlock: function (){
        var element = this.element, o = this.options;
        var bottom_block = $("<div>").addClass("list-bottom").addClass(o.clsListBottom).insertAfter(element);
        var info, pagination;

        info = $("<div>").addClass("list-info").addClass(o.clsListInfo).appendTo(bottom_block);
        if (o.showListInfo !== true) {
            info.hide();
        }

        pagination = $("<div>").addClass("list-pagination").addClass(o.clsListPagination).appendTo(bottom_block);
        if (o.showPagination !== true) {
            pagination.hide();
        }

        return bottom_block;
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var list_component;
        var w_search = $(o.searchWrapper),
            w_info = $(o.infoWrapper),
            w_rows = $(o.rowsWrapper),
            w_paging = $(o.paginationWrapper);

        if (w_search.length > 0) {this.wrapperSearch = w_search;}
        if (w_info.length > 0) {this.wrapperInfo = w_info;}
        if (w_rows.length > 0) {this.wrapperRows = w_rows;}
        if (w_paging.length > 0) {this.wrapperPagination = w_paging;}

        if (!element.parent().hasClass("list-component")) {
            list_component = $("<div>").addClass("list-component").insertBefore(element);
            element.appendTo(list_component);
        } else {
            list_component = element.parent();
        }

        list_component.addClass(o.clsComponent);

        this.activity =  $("<div>").addClass("list-progress").appendTo(list_component);
        $("<div>").activity({
            type: o.activityType,
            style: o.activityStyle
        }).appendTo(this.activity);

        if (o.showActivity !== true) {
            this.activity.css({
                visibility: "hidden"
            })
        }

        // element.html("").addClass(o.clsList);
        element.addClass(o.clsList);

        this._createTopBlock();
        this._createBottomBlock();

        if (Utils.isValue(o.filterString)) {
            this.filterString = o.filterString;
        }

        var filter_func;

        if (Utils.isValue(o.filter)) {
            filter_func = Utils.isFunc(o.filter);
            if (filter_func === false) {
                filter_func = Utils.func(o.filter);
            }
            that.filterIndex = that.addFilter(filter_func);
        }

        if (Utils.isValue(o.filters)) {
            $.each(Utils.strToArray(o.filters), function(){
                filter_func = Utils.isFunc(this);
                if (filter_func !== false) {
                    that.filtersIndexes.push(that.addFilter(filter_func));
                }
            });
        }

        this.currentPage = 1;

        this.sorting(o.sortClass, o.sortDir, true);
    },

    _createEvents: function(){
        var that = this, element = this.element;
        var component = element.parent();
        var search = component.find(".list-search-block input");
        var customSearch;

        search.on(Metro.events.inputchange, function(){
            that.filterString = this.value.trim().toLowerCase();
            if (that.filterString[that.filterString.length - 1] === ":") {
                return ;
            }
            that.currentPage = 1;
            that._draw();
        });

        if (Utils.isValue(this.wrapperSearch)) {
            customSearch = this.wrapperSearch.find("input");
            if (customSearch.length > 0) {
                customSearch.on(Metro.events.inputchange, function(){
                    that.filterString = this.value.trim().toLowerCase();
                    if (that.filterString[that.filterString.length - 1] === ":") {
                        return ;
                    }
                    that.currentPage = 1;
                    that._draw();
                });
            }
        }

        function pageLinkClick(l){
            var link = $(l);
            var item = link.parent();

            if (item.hasClass("active")) {
                return ;
            }

            if (item.hasClass("service")) {
                if (link.data("page") === "prev") {
                    that.currentPage--;
                    if (that.currentPage === 0) {
                        that.currentPage = 1;
                    }
                } else {
                    that.currentPage++;
                    if (that.currentPage > that.pagesCount) {
                        that.currentPage = that.pagesCount;
                    }
                }
            } else {
                that.currentPage = link.data("page");
            }

            that._draw();
        }

        component.on(Metro.events.click, ".pagination .page-link", function(){
            pageLinkClick(this)
        });

        if (Utils.isValue(this.wrapperPagination)) {
            this.wrapperPagination.on(Metro.events.click, ".pagination .page-link", function(){
                pageLinkClick(this)
            });
        }
    },

    _info: function(start, stop, length){
        var element = this.element, o = this.options;
        var component = element.parent();
        var info = Utils.isValue(this.wrapperInfo) ? this.wrapperInfo : component.find(".list-info");
        var text;

        if (info.length === 0) {
            return ;
        }

        if (stop > length) {
            stop = length;
        }

        if (this.items.length === 0) {
            start = stop = length = 0;
        }

        text = o.listInfoTitle;
        text = text.replace("$1", start);
        text = text.replace("$2", stop);
        text = text.replace("$3", length);
        info.html(text);
    },

    _paging: function(length){
        var that = this, element = this.element, o = this.options;
        var component = element.parent();
        var pagination_wrapper = Utils.isValue(this.wrapperPagination) ? this.wrapperPagination : component.find(".list-pagination");
        var i, prev, next;
        var shortDistance = 5;
        var pagination;

        pagination_wrapper.html("");

        pagination = $("<ul>").addClass("pagination").addClass(o.clsPagination).appendTo(pagination_wrapper);

        if (this.items.length === 0) {
            return ;
        }

        this.pagesCount = Math.ceil(length / o.items);

        var add_item = function(item_title, item_type, data){
            var li, a;

            li = $("<li>").addClass("page-item").addClass(item_type);
            a  = $("<a>").addClass("page-link").html(item_title);
            a.data("page", data);
            a.appendTo(li);

            return li;
        };

        prev = add_item(o.paginationPrevTitle, "service prev-page", "prev");
        pagination.append(prev);

        pagination.append(add_item(1, that.currentPage === 1 ? "active" : "", 1));

        if (o.showAllPages === true || this.pagesCount <= 7) {
            for (i = 2; i < this.pagesCount; i++) {
                pagination.append(add_item(i, i === that.currentPage ? "active" : "", i));
            }
        } else {
            if (that.currentPage < shortDistance) {
                for (i = 2; i <= shortDistance; i++) {
                    pagination.append(add_item(i, i === that.currentPage ? "active" : "", i));
                }

                if (this.pagesCount > shortDistance) {
                    pagination.append(add_item("...", "no-link", null));
                }
            } else if (that.currentPage <= that.pagesCount && that.currentPage > that.pagesCount - shortDistance + 1) {
                if (this.pagesCount > shortDistance) {
                    pagination.append(add_item("...", "no-link", null));
                }

                for (i = that.pagesCount - shortDistance + 1; i < that.pagesCount; i++) {
                    pagination.append(add_item(i, i === that.currentPage ? "active" : "", i));
                }
            } else {
                pagination.append(add_item("...", "no-link", null));

                pagination.append(add_item(that.currentPage - 1, "", that.currentPage - 1));
                pagination.append(add_item(that.currentPage, "active", that.currentPage));
                pagination.append(add_item(that.currentPage + 1, "", that.currentPage + 1));

                pagination.append(add_item("...", "no-link", null));
            }
        }

        if (that.pagesCount > 1 || that.currentPage < that.pagesCount) pagination.append(add_item(that.pagesCount, that.currentPage === that.pagesCount ? "active" : "", that.pagesCount));

        next = add_item(o.paginationNextTitle, "service next-page", "next");
        pagination.append(next);

        if (this.currentPage === 1) {
            prev.addClass("disabled");
        }

        if (this.currentPage === this.pagesCount) {
            next.addClass("disabled");
        }
    },

    _filter: function(){
        var that = this,
            element = this.element,
            o = this.options,
            items, i, data, inset, c1, result;

        if (Utils.isValue(this.filterString) || this.filters.length > 0) {
            items = this.items.filter(function(item){
                data = "";

                if (Utils.isValue(o.filterClass)) {
                    inset = item.getElementsByClassName(o.filterClass);

                    if (inset.length > 0) for (i = 0; i < inset.length; i++) {
                        data += inset[i].textContent;
                    }
                } else {
                    data = item.textContent;
                }

                c1 = data.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim().toLowerCase();
                result = Utils.isValue(that.filterString) ? c1.indexOf(that.filterString) > -1 : true;

                if (result === true && that.filters.length > 0) {
                    for (i = 0; i < that.filters.length; i++) {
                        if (Utils.exec(that.filters[i], [item]) !== true) {
                            result = false;
                            break;
                        }
                    }
                }

                if (result) {
                    Utils.exec(o.onFilterItemAccepted, [item], element[0]);
                } else {
                    Utils.exec(o.onFilterItemDeclined, [item], element[0]);
                }

                return result;
            });

            Utils.exec(o.onSearch, [that.filterString, items], element[0])
        } else {
            items = this.items;
        }

        return items;
    },

    _draw: function(cb){
        var element = this.element, o = this.options;
        var i;
        var start = o.items === -1 ? 0 : o.items * (this.currentPage - 1),
            stop = o.items === -1 ? this.items.length - 1 : start + o.items - 1;
        var items;

        items = this._filter();

        element.children(o.sortTarget).remove();

        for (i = start; i <= stop; i++) {
            if (Utils.isValue(items[i])) {
                $(items[i]).addClass(o.clsListItem).appendTo(element);
            }
            Utils.exec(o.onDrawItem, [items[i]], element[0]);
        }

        this._info(start + 1, stop + 1, items.length);
        this._paging(items.length);

        this.activity.hide();

        Utils.exec(o.onDraw, [element], element[0]);

        if (cb !== undefined) {
            Utils.exec(cb, [element], element[0])
        }
    },

    _getItemContent: function(item){
        var o = this.options;
        var i, inset, data;
        var format;

        if (Utils.isValue(o.sortClass)) {
            data = "";
            inset = $(item).find("."+o.sortClass);

            if (inset.length > 0) for (i = 0; i < inset.length; i++) {
                data += inset[i].textContent;
            }
            format = inset.length > 0 ? inset[0].getAttribute("data-format") : "";
        } else {
            data = item.textContent;
            format = item.getAttribute("data-format");
        }

        data = (""+data).toLowerCase().replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

        if (Utils.isValue(format)) {

            if (['number', 'int', 'float', 'money'].indexOf(format) !== -1 && (o.thousandSeparator !== "," || o.decimalSeparator !== "." )) {
                data = Utils.parseNumber(data, o.thousandSeparator, o.decimalSeparator);
            }

            switch (format) {
                case "date": data = Utils.isDate(data) ? new Date(data) : ""; break;
                case "number": data = Number(data); break;
                case "int": data = parseInt(data); break;
                case "float": data = parseFloat(data); break;
                case "money": data = Utils.parseMoney(data); break;
            }
        }

        return data;
    },

    draw: function(){
        return this._draw();
    },

    sorting: function(source, dir, redraw){
        var that = this, element = this.element, o = this.options;

        if (Utils.isValue(source)) {
            o.sortClass = source;
        }
        if (Utils.isValue(dir) && ["asc", "desc"].indexOf(dir) > -1) {
            o.sortDir= dir;
        }

        Utils.exec(o.onSortStart, [this.items], element[0]);

        this.items.sort(function(a, b){
            var c1 = that._getItemContent(a);
            var c2 = that._getItemContent(b);
            var result = 0;

            if (c1 < c2) {
                result = o.sortDir === "asc" ? -1 : 1;
            }
            if (c1 > c2) {
                result = o.sortDir === "asc" ? 1 : -1;
            }

            if (result !== 0) {
                Utils.exec(o.onSortItemSwitch, [a, b, result], element[0]);
            }

            return result;
        });

        Utils.exec(o.onSortStop, [this.items], element[0]);

        if (redraw === true) {
            this._draw();
        }

        return this;
    },

    filter: function(val){
        this.filterString = val.trim().toLowerCase();
        this.currentPage = 1;
        this._draw();
    },

    loadData: function(source){
        var that = this, element = this.element, o = this.options;

        if (Utils.isValue(source) !== true) {
            return ;
        }

        o.source = source;

        Utils.exec(o.onDataLoad, [o.source], element[0]);

        $.get(o.source, function(data){
            Utils.exec(o.onDataLoaded, [o.source, data], element[0]);

            that._createItemsFromJSON(data);

            element.html("");

            if (Utils.isValue(o.filterString)) {
                that.filterString = o.filterString;
            }

            var filter_func;

            if (Utils.isValue(o.filter)) {
                filter_func = Utils.isFunc(o.filter);
                if (filter_func === false) {
                    filter_func = Utils.func(o.filter);
                }
                that.filterIndex = that.addFilter(filter_func);
            }

            if (Utils.isValue(o.filters)) {
                $.each(Utils.strToArray(o.filters), function(){
                    filter_func = Utils.isFunc(this);
                    if (filter_func !== false) {
                        that.filtersIndexes.push(that.addFilter(filter_func));
                    }
                });
            }

            that.currentPage = 1;

            that.sorting(o.sortClass, o.sortDir, true);

        }).fail(function( jqXHR, textStatus, errorThrown) {
            console.log(textStatus); console.log(jqXHR); console.log(errorThrown);
        });
    },

    next: function(){
        if (this.items.length === 0) return ;
        this.currentPage++;
        if (this.currentPage > this.pagesCount) {
            this.currentPage = this.pagesCount;
            return ;
        }
        this._draw();
    },

    prev: function(){
        if (this.items.length === 0) return ;
        this.currentPage--;
        if (this.currentPage === 0) {
            this.currentPage = 1;
            return ;
        }
        this._draw();
    },

    first: function(){
        if (this.items.length === 0) return ;
        this.currentPage = 1;
        this._draw();
    },

    last: function(){
        if (this.items.length === 0) return ;
        this.currentPage = this.pagesCount;
        this._draw();
    },

    page: function(num){
        if (num <= 0) {
            num = 1;
        }

        if (num > this.pagesCount) {
            num = this.pagesCount;
        }

        this.currentPage = num;
        this._draw();
    },

    addFilter: function(f, redraw){
        var func = Utils.isFunc(f);
        if (func === false) {
            return ;
        }
        this.filters.push(func);

        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }

        return this.filters.length - 1;
    },

    removeFilter: function(key, redraw){
        Utils.arrayDeleteByKey(this.filters, key);
        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }
        return this;
    },

    removeFilters: function(redraw){
        this.filters = [];
        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }
    },

    getFilters: function(){
        return this.filters;
    },

    getFilterIndex: function(){
        return this.filterIndex;
    },

    getFiltersIndexes: function(){
        return this.filtersIndexes;
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;

        var changeSortDir = function(){
            var dir = element.attr("data-sort-dir");
            if (!Utils.isValue(dir)) {
                return ;
            }
            o.sortDir = dir;
            that.sorting(o.sortClass, o.sortDir, true);
        };

        var changeSortClass = function(){
            var target = element.attr("data-sort-source");
            if (!Utils.isValue(target)) {
                return ;
            }
            o.sortClass = target;
            that.sorting(o.sortClass, o.sortDir, true);
        };

        var changeFilterString = function(){
            var filter = element.attr("data-filter-string");
            if (!Utils.isValue(target)) {
                return ;
            }
            o.filterString = filter;
            that.filter(o.filterString);
        };

        switch (attributeName) {
            case "data-sort-dir": changeSortDir(); break;
            case "data-sort-source": changeSortClass(); break;
            case "data-filter-string": changeFilterString(); break;
        }
    },

    destroy: function(){}
};

Metro.plugin('list', List);

// Source: js/plugins/listview.js
var Listview = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        selectable: false,
        effect: "slide",
        duration: 100,
        view: Metro.listView.LIST,
        selectCurrent: true,
        structure: {},
        onNodeInsert: Metro.noop,
        onNodeDelete: Metro.noop,
        onNodeClean: Metro.noop,
        onCollapseNode: Metro.noop,
        onExpandNode: Metro.noop,
        onGroupNodeClick: Metro.noop,
        onNodeClick: Metro.noop,
        onListviewCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createView();
        this._createEvents();

        Utils.exec(o.onListviewCreate, [element]);
    },

    _createIcon: function(data){
        var icon, src;

        src = Utils.isTag(data) ? $(data) : $("<img>").attr("src", data);
        icon = $("<span>").addClass("icon");
        icon.html(src);

        return icon;
    },

    _createCaption: function(data){
        return $("<div>").addClass("caption").html(data);
    },

    _createContent: function(data){
        return $("<div>").addClass("content").html(data);
    },

    _createToggle: function(){
        return $("<span>").addClass("node-toggle");
    },

    _createNode: function(data){
        var that = this, element = this.element, o = this.options;
        var node;

        node = $("<li>");

        if (data.caption !== undefined || data.content !== undefined ) {
            var d = $("<div>").addClass("data");
            node.prepend(d);
            if (data.caption !== undefined) d.append(that._createCaption(data.caption));
            if (data.content !== undefined) d.append(that._createContent(data.content));
        }

        if (data.icon !== undefined) {
            node.prepend(this._createIcon(data.icon));
        }

        if (Utils.objectLength(o.structure > 0)) $.each(o.structure, function(key, val){
            if (data[key] !== undefined) {
                $("<div>").addClass("node-data item-data-"+key).addClass(data[val]).html(data[key]).appendTo(node);
            }
        });

        return node;
    },

    _createView: function(){
        var that = this, element = this.element, o = this.options;
        var nodes = element.find("li");
        var struct_length = Utils.objectLength(o.structure);

        element.addClass("listview");
        element.find("ul").addClass("listview");

        $.each(nodes, function(){
            var node = $(this);

            if (node.data("caption") !== undefined || node.data("content") !== undefined) {
                var data = $("<div>").addClass("data");
                node.prepend(data);
                if (node.data("caption") !== undefined) data.append(that._createCaption(node.data("caption")));
                if (node.data("content") !== undefined) data.append(that._createContent(node.data("content")));
            }

            if (node.data('icon') !== undefined) {
                node.prepend(that._createIcon(node.data('icon')));
            }

            if (node.children("ul").length > 0) {
                node.addClass("node-group");
                node.append(that._createToggle());
                if (node.data("collapsed") !== true) node.addClass("expanded");
            } else {
                node.addClass("node");
            }

            if (node.hasClass("node")) {
                var cb = $("<input data-role='checkbox'>");
                cb.data("node", node);
                node.prepend(cb);
            }

            if (struct_length > 0) $.each(o.structure, function(key, val){
                if (node.data(key) !== undefined) {
                    $("<div>").addClass("node-data item-data-"+key).addClass(node.data(key)).html(node.data(key)).appendTo(node);
                }
            });
        });

        this.toggleSelectable();

        this.view(o.view);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".node", function(){
            var node = $(this);
            element.find(".node").removeClass("current");
            node.toggleClass("current");
            if (o.selectCurrent === true) {
                element.find(".node").removeClass("current-select");
                node.toggleClass("current-select");
            }
            Utils.exec(o.onNodeClick, [node, element])
        });

        element.on(Metro.events.click, ".node-toggle", function(){
            var node = $(this).closest("li");
            that.toggleNode(node);
        });

        element.on(Metro.events.click, ".node-group > .data > .caption", function(){
            var node = $(this).closest("li");
            element.find(".node-group").removeClass("current-group");
            node.addClass("current-group");
            Utils.exec(o.onGroupNodeClick, [node, element])
        });

        element.on(Metro.events.dblclick, ".node-group > .data > .caption", function(){
            var node = $(this).closest("li");
            that.toggleNode(node);
        });
    },

    view: function(v){
        var element = this.element, o = this.options;

        if (v === undefined) {
            return o.view;
        }

        o.view = v;

        $.each(Metro.listView, function(i, v){
            element.removeClass("view-"+v);
            element.find("ul").removeClass("view-"+v);
        });

        element.addClass("view-" + o.view);
        element.find("ul").addClass("view-" + o.view);
    },

    toggleNode: function(node){
        var element = this.element, o = this.options;
        var func;

        if (!node.hasClass("node-group")) {
            return ;
        }

        node.toggleClass("expanded");

        if (o.effect === "slide") {
            func = node.hasClass("expanded") !== true ? "slideUp" : "slideDown";
            Utils.exec(o.onCollapseNode, [node, element]);
        } else {
            func = node.hasClass("expanded") !== true ? "fadeOut" : "fadeIn";
            Utils.exec(o.onExpandNode, [node, element]);
        }

        node.children("ul")[func](o.duration);
    },

    toggleSelectable: function(){
        var that = this, element = this.element, o = this.options;
        var func = o.selectable === true ? "addClass" : "removeClass";
        element[func]("selectable");
        element.find("ul")[func]("selectable");
    },

    add: function(node, data){
        var that = this, element = this.element, o = this.options;
        var target;
        var new_node;
        var toggle;

        if (node === null) {
            target = element;
        } else {

            if (!node.hasClass("node-group")) {
                return ;
            }

            target = node.children("ul");
            if (target.length === 0) {
                target = $("<ul>").addClass("listview").addClass("view-"+o.view).appendTo(node);
                toggle = this._createToggle();
                toggle.appendTo(node);
                node.addClass("expanded");
            }
        }

        new_node = this._createNode(data);

        new_node.addClass("node").appendTo(target);

        var cb = $("<input>");
        cb.data("node", new_node);
        new_node.prepend(cb);
        cb.checkbox();

        Utils.exec(o.onNodeInsert, [new_node, element]);

        return new_node;
    },

    addGroup: function(data){
        var that = this, element = this.element, o = this.options;
        var node;

        delete data['icon'];

        node = this._createNode(data);
        node.addClass("node-group").appendTo(element);
        node.append(this._createToggle());
        node.addClass("expanded");
        node.append($("<ul>").addClass("listview").addClass("view-"+o.view));

        Utils.exec(o.onNodeInsert, [node, element]);

        return node;
    },

    insertBefore: function(node, data){
        var element = this.element, o = this.options;
        var new_node = this._createNode(data);
        new_node.insertBefore(node);
        Utils.exec(o.onNodeInsert, [new_node, element]);
        return new_node;
    },

    insertAfter: function(node, data){
        var element = this.element, o = this.options;
        var new_node = this._createNode(data);
        new_node.insertAfter(node);
        Utils.exec(o.onNodeInsert, [new_node, element]);
        return new_node;
    },

    del: function(node){
        var element = this.element, o = this.options;
        var parent_list = node.closest("ul");
        var parent_node = parent_list.closest("li");
        node.remove();
        if (parent_list.children().length === 0 && !parent_list.is(element)) {
            parent_list.remove();
            parent_node.removeClass("expanded");
            parent_node.children(".node-toggle").remove();
        }
        Utils.exec(o.onNodeDelete, [node, element]);
    },

    clean: function(node){
        var element = this.element, o = this.options;
        node.children("ul").remove();
        node.removeClass("expanded");
        node.children(".node-toggle").remove();
        Utils.exec(o.onNodeClean, [node, element]);
    },

    changeView: function(){
        var element = this.element, o = this.options;
        var new_view = "view-"+element.attr("data-view");
        this.view(new_view);
    },

    changeSelectable: function(){
        var element = this.element, o = this.options;
        o.selectable = JSON.parse(element.attr("data-selectable")) === true;
        this.toggleSelectable();
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-view": this.changeView(); break;
            case "data-selectable": this.changeSelectable(); break;
        }
    }
};

Metro.plugin('listview', Listview);

// Source: js/plugins/master.js
var Master = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.pages = [];
        this.currentIndex = 0;
        this.isAnimate = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        effect: "slide", // slide, fade, switch, slowdown, custom
        effectFunc: "linear",
        duration: METRO_ANIMATION_DURATION,

        controlPrev: "<span class='default-icon-left-arrow'></span>",
        controlNext: "<span class='default-icon-right-arrow'></span>",
        controlTitle: "Master, page $1 of $2",
        backgroundImage: "",

        clsMaster: "",
        clsControls: "",
        clsControlPrev: "",
        clsControlNext: "",
        clsControlTitle: "",
        clsPages: "",
        clsPage: "",

        onBeforePage: Metro.noop_true,
        onBeforeNext: Metro.noop_true,
        onBeforePrev: Metro.noop_true,
        onMasterCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        element.addClass("master").addClass(o.clsMaster);
        element.css({
            backgroundImage: "url("+o.backgroundImage+")"
        });

        this._createControls();
        this._createPages();
        this._createEvents();

        Utils.exec(this.options.onMasterCreate, [this.element]);
    },

    _createControls: function(){
        var that = this, element = this.element, o = this.options;
        var controls_position = ['top', 'bottom'];
        var i, controls, title, pages = element.find(".page");

        title = String(o.controlTitle).replace("$1", "1");
        title = String(title).replace("$2", pages.length);

        $.each(controls_position, function(){
            controls = $("<div>").addClass("controls controls-"+this).addClass(o.clsControls).appendTo(element);
            $("<span>").addClass("prev").addClass(o.clsControlPrev).html(o.controlPrev).appendTo(controls);
            $("<span>").addClass("next").addClass(o.clsControlNext).html(o.controlNext).appendTo(controls);
            $("<span>").addClass("title").addClass(o.clsControlTitle).html(title).appendTo(controls);
        });

        this._enableControl("prev", false);
    },

    _enableControl: function(type, state){
        var control = this.element.find(".controls ." + type);
        if (state === true) {
            control.removeClass("disabled");
        } else {
            control.addClass("disabled");
        }
    },

    _setTitle: function(){
        var title = this.element.find(".controls .title");

        var title_str = this.options.controlTitle.replace("$1", this.currentIndex + 1);
        title_str = title_str.replace("$2", String(this.pages.length));

        title.html(title_str);
    },

    _createPages: function(){
        var that = this, element = this.element, o = this.options;
        var pages = element.find(".pages");
        var page = element.find(".page");

        if (pages.length === 0) {
            pages = $("<div>").addClass("pages").appendTo(element);
        }

        pages.addClass(o.clsPages);

        $.each(page, function(){
            var p = $(this);
            if (p.data("cover") !== undefined) {
                element.css({
                    backgroundImage: "url("+p.data('cover')+")"
                });
            } else {
                element.css({
                    backgroundImage: "url("+o.backgroundImage+")"
                });
            }

            p.css({
                left: "100%"
            });

            p.addClass(o.clsPage).hide(0);

            that.pages.push(p);
        });

        page.appendTo(pages);

        this.currentIndex = 0;
        if (this.pages[this.currentIndex] !== undefined) {
            if (this.pages[this.currentIndex].data("cover") !== undefined ) {
                element.css({
                    backgroundImage: "url("+this.pages[this.currentIndex].data('cover')+")"
                });
            }
            this.pages[this.currentIndex].css("left", "0").show(0);
            setTimeout(function(){
                pages.css({
                    height: that.pages[0].outerHeight(true) + 2
                });
            }, 0);
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".controls .prev", function(){
            if (that.isAnimate === true) {
                return ;
            }
            if (
                Utils.exec(o.onBeforePrev, [that.currentIndex, that.pages[that.currentIndex], element]) === true &&
                Utils.exec(o.onBeforePage, ["prev", that.currentIndex, that.pages[that.currentIndex], element]) === true
            ) {
                that.prev();
            }
        });

        element.on(Metro.events.click, ".controls .next", function(){
            if (that.isAnimate === true) {
                return ;
            }
            if (
                Utils.exec(o.onBeforeNext, [that.currentIndex, that.pages[that.currentIndex], element]) === true &&
                Utils.exec(o.onBeforePage, ["next", that.currentIndex, that.pages[that.currentIndex], element]) === true
            ) {
                that.next();
            }
        });

        $(window).on(Metro.events.resize + "-master" + element.attr("id"), function(){
            element.find(".pages").height(that.pages[that.currentIndex].outerHeight(true) + 2);
        });
    },

    _slideToPage: function(index){
        var current, next, to;

        if (this.pages[index] === undefined) {
            return ;
        }

        if (this.currentIndex === index) {
            return ;
        }

        to = index > this.currentIndex ? "next" : "prev";
        current = this.pages[this.currentIndex];
        next = this.pages[index];

        this.currentIndex = index;

        this._effect(current, next, to);
    },

    _slideTo: function(to){
        var current, next;

        if (to === undefined) {
            return ;
        }

        current = this.pages[this.currentIndex];

        if (to === "next") {
            if (this.currentIndex + 1 >= this.pages.length) {
                return ;
            }
            this.currentIndex++;
        } else {
            if (this.currentIndex - 1 < 0) {
                return ;
            }
            this.currentIndex--;
        }

        next = this.pages[this.currentIndex];

        this._effect(current, next, to);
    },

    _effect: function(current, next, to){
        var that = this, element = this.element, o = this.options;
        var out = element.width();
        var pages = element.find(".pages");

        this._setTitle();

        if (this.currentIndex === this.pages.length - 1) {
            this._enableControl("next", false);
        } else {
            this._enableControl("next", true);
        }

        if (this.currentIndex === 0) {
            this._enableControl("prev", false);
        } else {
            this._enableControl("prev", true);
        }

        this.isAnimate = true;

        setTimeout(function(){
            pages.animate({
                height: next.outerHeight(true) + 2
            });
        },0);

        pages.css("overflow", "hidden");

        function finish(){
            if (next.data("cover") !== undefined) {
                element.css({
                    backgroundImage: "url("+next.data('cover')+")"
                });
            } else {
                element.css({
                    backgroundImage: "url("+o.backgroundImage+")"
                });
            }
            pages.css("overflow", "initial");
            that.isAnimate = false;
        }

        function _slide(){
            current.stop(true, true).animate({
                left: to === "next" ? -out : out
            }, o.duration, o.effectFunc, function(){
                current.hide(0);
            });

            next.stop(true, true).css({
                left: to === "next" ? out : -out
            }).show(0).animate({
                left: 0
            }, o.duration, o.effectFunc, function(){
                finish();
            });
        }

        function _switch(){
            current.hide(0);

            next.hide(0).css("left", 0).show(0, function(){
                finish();
            });
        }

        function _fade(){
            current.fadeOut(o.duration);

            next.hide(0).css("left", 0).fadeIn(o.duration, function(){
                finish();
            });
        }

        switch (o.effect) {
            case "fade": _fade(); break;
            case "switch": _switch(); break;
            default: _slide();
        }
    },

    toPage: function(index){
        this._slideToPage(index);
    },

    next: function(){
        this._slideTo("next");
    },

    prev: function(){
        this._slideTo("prev");
    },

    changeEffect: function(){
        this.options.effect = this.element.attr("data-effect");
    },

    changeEffectFunc: function(){
        this.options.effectFunc = this.element.attr("data-effect-func");
    },

    changeEffectDuration: function(){
        this.options.duration = this.element.attr("data-duration");
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-effect": this.changeEffect(); break;
            case "data-effect-func": this.changeEffectFunc(); break;
            case "data-duration": this.changeEffectDuration(); break;
        }
    }
};

Metro.plugin('master', Master);

// Source: js/plugins/navview.js
var NavigationView = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.pane = null;
        this.content = null;
        this.paneToggle = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        compact: "md",
        expanded: "lg",
        toggle: null,
        onNavigationViewCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createView();
        this._createEvents();

        Utils.exec(o.onNavigationViewCreate, [element]);
    },

    _createView: function(){
        var that = this, element = this.element, o = this.options;
        var pane, content, toggle, menu;

        element
            .addClass("navview")
            .addClass(o.compact !== false ? "compact-"+o.compact : "")
            .addClass(o.expanded !== false ? "expanded-"+o.expanded : "");

        pane = element.children(".navview-pane");
        content = element.children(".navview-content");
        toggle = $(o.toggle);

        menu = pane.find(".navview-menu");
        if (menu.length > 0) {
            var elements_height = 0;
            $.each(menu.prevAll(), function(){
                elements_height += $(this).outerHeight(true);
            });
            $.each(menu.nextAll(), function(){
                elements_height += $(this).outerHeight(true);
            });
            menu.css({
                height: "calc(100% - "+(elements_height + 20)+"px)"
            });
        }

        this.pane = pane.length > 0 ? pane : null;
        this.content = content.length > 0 ? content : null;
        this.paneToggle = toggle.length > 0 ? toggle : null;
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var pane = this.pane, content = this.content;

        element.on(Metro.events.click, ".pull-button, .holder", function(e){
            var pane_compact = pane.width() < 280;
            var target = $(this);
            var input;

            if (target.hasClass("holder")) {
                input = target.parent().find("input");
                setTimeout(function(){
                    input.focus();
                }, 200);
            }

            if (that.pane.hasClass("open")) {
                that.close();
                return ;
            }

            if ((pane_compact || element.hasClass("expand")) && !element.hasClass("compacted")) {
                element.toggleClass("expand");
                return ;
            }

            if (element.hasClass("compacted") || !pane_compact) {
                element.toggleClass("compacted");
                return ;
            }

            return true;
        });

        if (this.paneToggle !== null) {
            this.paneToggle.on(Metro.events.click, function(){
                that.pane.toggleClass("open");
            })
        }

        $(window).on(Metro.events.resize, function(){

            element.removeClass("expand");
            that.pane.removeClass("open");

            if ($(this).width() <= Metro.media_sizes[String(o.compact).toUpperCase()]) {
                element.removeClass("compacted");
            }

        })
    },

    open: function(){
        this.pane.addClass("open");
    },

    close: function(){
        this.pane.removeClass("open");
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('navview', NavigationView);

// Source: js/plugins/notify.js
var Notify = {

    options: {
        container: null,
        width: 220,
        timeout: METRO_TIMEOUT,
        duration: METRO_ANIMATION_DURATION,
        distance: "100vh",
        animation: "swing"
    },

    notifies: [],

    setup: function(options){
        var body = $("body"), container;
        this.options = $.extend({}, this.options, options);

        if (this.options.container === null) {
            container = $("<div>").addClass("notify-container");
            body.prepend(container);
            this.options.container = container;
        }

        return this;
    },

    reset: function(){
        var reset_options = {
            width: 220,
            timeout: METRO_TIMEOUT,
            duration: METRO_ANIMATION_DURATION,
            distance: "100vh",
            animation: "swing"
        };
        this.options = $.extend({}, this.options, reset_options);
    },

    create: function(message, title, options){
        var notify, that = this, o = this.options;
        var m, t;

        if (message === undefined || message.trim() === '') {
            return false;
        }

        notify = $("<div>").addClass("notify");
        notify.css({
            width: o.width
        });

        if (title) {
            t = $("<div>").addClass("notify-title").html(title);
            notify.prepend(t);
        }
        m = $("<div>").addClass("notify-message").html(message);
        m.appendTo(notify);

        // Set options
        /*
        * keepOpen, cls, width, callback
        * */
        if (options !== undefined) {
            if (options.cls !== undefined) {
                notify.addClass(options.cls);
            }
            if (options.width !== undefined) {
                notify.css({
                    width: options.width
                });
            }
        }

        notify.on(Metro.events.click, function(){
            that.kill($(this));
        });

        // Show
        notify.hide(function(){
            notify.appendTo(o.container);

            notify.css({
                marginTop: o.distance
            }).fadeIn(100, function(){
                notify.animate({
                    marginTop: ".25rem"
                }, o.duration, o.animation, function(){
                    if (options !== undefined && options.keepOpen === true) {
                    } else {
                        setTimeout(function(){
                            that.kill(notify, (options !== undefined && options.onClose !== undefined ? options.onClose : undefined));
                        }, o.timeout);
                    }
                    if (options !== undefined && options.onShow !== undefined) Utils.callback(options.onShow);
                });
            });
        });
    },

    kill: function(notify, callback){
        notify.fadeOut('slow', function(){
            notify.remove();
            Utils.callback(callback);
        });
    },

    killAll: function(){
        var that = this;
        var notifies = $(".notify");
        $.each(notifies, function(){
            that.kill($(this));
        });
    }
};

Metro['notify'] = Notify.setup();

// Source: js/plugins/panel.js
var Panel = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    dependencies: ['draggable', 'collapse'],

    options: {
        titleCaption: "",
        titleIcon: "",
        collapsible: false,
        collapsed: false,
        collapseDuration: METRO_ANIMATION_DURATION,
        width: "auto",
        height: "auto",
        draggable: false,

        clsPanel: "",
        clsTitle: "",
        clsTitleCaption: "",
        clsTitleIcon: "",
        clsContent: "",
        clsCollapseToggle: "",

        onCollapse: Metro.noop,
        onExpand: Metro.noop,
        onDragStart: Metro.noop,
        onDragStop: Metro.noop,
        onDragMove: Metro.noop,
        onPanelCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var panel = $("<div>").addClass("panel").addClass(o.clsPanel);
        var id = Utils.uniqueId();
        var original_classes = element[0].className;


        if (prev.length === 0) {
            parent.prepend(panel);
        } else {
            panel.insertAfter(prev);
        }

        panel.attr("id", id).addClass(original_classes);

        element[0].className = '';
        element.addClass("panel-content").addClass(o.clsContent).appendTo(panel);

        if (o.titleCaption !== "" || o.titleIcon !== "" || o.collapsible === true) {
            var title = $("<div>").addClass("panel-title").addClass(o.clsTitle);

            if (o.titleCaption !== "") {
                $("<span>").addClass("caption").addClass(o.clsTitleCaption).html(o.titleCaption).appendTo(title)
            }

            if (o.titleIcon !== "") {
                $(o.titleIcon).addClass("icon").addClass(o.clsTitleIcon).appendTo(title)
            }

            if (o.collapsible === true) {
                var collapseToggle = $("<span>").addClass("dropdown-toggle marker-center active-toggle").addClass(o.clsCollapseToggle).appendTo(title);
                element.collapse({
                    toggleElement: collapseToggle,
                    duration: o.collapseDuration,
                    onCollapse: o.onCollapse,
                    onExpand: o.onExpand
                });

                if (o.collapsed === true) {
                    this.collapse();
                }
            }

            title.appendTo(panel);
        }

        if (o.draggable === true) {
            panel.draggable({
                dragElement: title || panel,
                onDragStart: o.onDragStart,
                onDragStop: o.onDragStop,
                onDragMove: o.onDragMove
            });
        }

        if (o.width !== "auto" && parseInt(o.width) >= 0) {
            panel.outerWidth(parseInt(o.width));
        }

        if (o.height !== "auto" && parseInt(o.height) >= 0) {
            panel.outerHeight(parseInt(o.height));
            element.css({overflow: "auto"});
        }

        this.panel = panel;

        Utils.exec(o.onPanelCreate, [this.element]);
    },

    collapse: function(){
        var element = this.element, o = this.options;
        if (Utils.isMetroObject(element, 'collapse') === false) {
            return ;
        }
        element.data('collapse').collapse();
    },

    expand: function(){
        var element = this.element, o = this.options;
        if (Utils.isMetroObject(element, 'collapse') === false) {
            return ;
        }
        element.data('collapse').expand();
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
        }
    }
};

Metro.plugin('panel', Panel);

// Source: js/plugins/popovers.js
var Popover = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.popover = null;
        this.popovered = false;
        this.size = {
            width: 0,
            height: 0
        };

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        popoverText: "",
        popoverHide: 3000,
        popoverOffset: 10,
        popoverTrigger: Metro.popoverEvents.HOVER,
        popoverPosition: Metro.position.TOP,
        hideOnLeave: false,
        clsPopover: "",
        onPopoverShow: Metro.noop,
        onPopoverHide: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createEvents();

    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var event;

        switch (o.popoverTrigger) {
            case Metro.popoverEvents.CLICK: event = Metro.events.click; break;
            case Metro.popoverEvents.FOCUS: event = Metro.events.focus; break;
            default: event = Metro.events.enter;
        }

        element.on(event, function(){
            if (that.popover !== null || that.popovered === true) {
                return ;
            }
            that.createPopover();
            if (o.popoverHide > 0) {
                setTimeout(function(){
                    that.removePopover();
                }, o.popoverHide);
            }
        });

        if (o.hideOnLeave === true && !Utils.isTouchDevice()) {
            element.on(Metro.events.leave, function(){
                that.removePopover();
            });
        }

        $(window).on(Metro.events.scroll, function(){
            if (that.popover !== null) that.setPosition();
        });

    },

    setPosition: function(){
        var popover = this.popover, size = this.size, o = this.options, element = this.element;

        if (o.popoverPosition === Metro.position.BOTTOM) {
            popover.addClass('bottom');
            popover.css({
                top: element.offset().top - $(window).scrollTop() + element.outerHeight() + o.popoverOffset,
                left: element.offset().left + element.outerWidth()/2 - size.width/2  - $(window).scrollLeft()
            });
        } else if (o.popoverPosition === Metro.position.RIGHT) {
            popover.addClass('right');
            popover.css({
                top: element.offset().top + element.outerHeight()/2 - size.height/2 - $(window).scrollTop(),
                left: element.offset().left + element.outerWidth() - $(window).scrollLeft() + o.popoverOffset
            });
        } else if (o.popoverPosition === Metro.position.LEFT) {
            popover.addClass('left');
            popover.css({
                top: element.offset().top + element.outerHeight()/2 - size.height/2 - $(window).scrollTop(),
                left: element.offset().left - size.width - $(window).scrollLeft() - o.popoverOffset
            });
        } else {
            popover.addClass('top');
            popover.css({
                top: element.offset().top - $(window).scrollTop() - size.height - o.popoverOffset,
                left: element.offset().left + element.outerWidth()/2 - size.width/2  - $(window).scrollLeft()
            });
        }
    },

    createPopover: function(){
        var that = this, elem = this.elem, element = this.element, o = this.options;
        var popover = $("<div>").addClass("popover neb").addClass(o.clsPopover).html(o.popoverText);
        var neb_pos;
        var id = Utils.elementId("popover");

        popover.attr("id", id);

        switch (o.popoverPosition) {
            case Metro.position.TOP: neb_pos = "neb-s"; break;
            case Metro.position.BOTTOM: neb_pos = "neb-n"; break;
            case Metro.position.RIGHT: neb_pos = "neb-w"; break;
            case Metro.position.LEFT: neb_pos = "neb-e"; break;
        }

        popover.addClass(neb_pos);
        popover.on(Metro.events.click, function(){
            that.removePopover();
        });

        this.popover = popover;
        this.size = Utils.hiddenElementSize(popover);

        if (elem.tagName === 'TD' || elem.tagName === 'TH') {
            var wrp = $("<div/>").css("display", "inline-block").html(element.html());
            element.html(wrp);
            element = wrp;
        }

        this.setPosition();

        popover.appendTo($('body'));

        this.popovered = true;

        Utils.exec(o.onPopoverShow, [popover, element]);
    },

    removePopover: function(){
        var that = this;
        var timeout = this.options.onPopoverHide === Metro.noop ? 0 : 300;
        var popover = this.popover;
        if (popover !== null) {
            Utils.exec(this.options.onPopoverHide, [popover, this.element]);
            setTimeout(function(){
                popover.hide(0, function(){
                    popover.remove();
                    that.popover = null;
                    that.popovered = false;
                });
            }, timeout);
        }
    },

    show: function(){
        var that = this, o = this.options;
        if (this.popovered === true) {
            return ;
        }

        this.createPopover();
        if (o.popoverHide > 0) {
            setTimeout(function(){
                that.removePopover();
            }, o.popoverHide);
        }
    },

    hide: function(){
        this.removePopover();
    },

    changeText: function(){
        this.options.popoverText = this.element.attr("data-popover-text");
    },

    changePosition: function(){
        this.options.popoverPosition = this.element.attr("data-popover-position");
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-popover-text": this.changeText(); break;
        }
    }
};

Metro.plugin('popover', Popover);

// Source: js/plugins/progress.js
var Progress = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.value = 0;
        this.buffer = 0;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onProgressCreate, [this.element]);

        return this;
    },

    options: {
        value: 0,
        buffer: 0,
        type: "bar",
        small: false,
        clsBack: "",
        clsBar: "",
        clsBuffer: "",
        onValueChange: Metro.noop,
        onBufferChange: Metro.noop,
        onComplete: Metro.noop,
        onBuffered: Metro.noop,
        onProgressCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        element
            .html("")
            .addClass("progress");

        function _progress(){
            $("<div>").addClass("bar").appendTo(element);
        }

        function _buffer(){
            $("<div>").addClass("bar").appendTo(element);
            $("<div>").addClass("buffer").appendTo(element);
        }

        function _load(){
            element.addClass("with-load");
            $("<div>").addClass("bar").appendTo(element);
            $("<div>").addClass("buffer").appendTo(element);
            $("<div>").addClass("load").appendTo(element);
        }

        function _line(){
            element.addClass("line");
        }

        switch (o.type) {
            case "buffer": _buffer(); break;
            case "load": _load(); break;
            case "line": _line(); break;
            default: _progress();
        }

        if (o.small === true) {
            element.addClass("small");
        }

        element.addClass(o.clsBack);
        element.find(".bar").addClass(o.clsBar);
        element.find(".buffer").addClass(o.clsBuffer);

        this.val(o.value);
        this.buff(o.buffer);
    },

    val: function(v){
        var that = this, element = this.element, o = this.options;

        if (v === undefined) {
            return that.value;
        }

        var bar  = element.find(".bar");

        if (bar.length === 0) {
            return false;
        }

        this.value = parseInt(v, 10);

        bar.css("width", this.value + "%");

        element.trigger("valuechange", [this.value]);

        Utils.exec(o.onValueChange, [this.value, element]);

        if (this.value === 100) {
            Utils.exec(o.onComplete, [this.value, element]);
        }
    },

    buff: function(v){
        var that = this, element = this.element, o = this.options;

        if (v === undefined) {
            return that.buffer;
        }

        var bar  = element.find(".buffer");

        if (bar.length === 0) {
            return false;
        }

        this.buffer = parseInt(v, 10);

        bar.css("width", this.buffer + "%");

        element.trigger("bufferchange", [this.buffer]);

        Utils.exec(o.onBufferChange, [this.buffer, element]);

        if (this.buffer === 100) {
            Utils.exec(o.onBuffered, [this.buffer, element]);
        }
    },

    changeValue: function(){
        this.val(this.element.attr('data-value'));
    },

    changeBuffer: function(){
        this.buff(this.element.attr('data-buffer'));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'data-value': this.changeValue(); break;
            case 'data-buffer': this.changeBuffer(); break;
        }
    }
};

Metro.plugin('progress', Progress);

// Source: js/plugins/radio.js
var Radio = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.origin = {
            className: ""
        };

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onRadioCreate, [this.element]);

        return this;
    },
    options: {
        caption: "",
        captionPosition: "right",
        disabled: false,
        clsElement: "",
        clsCheck: "",
        clsCaption: "",
        onRadioCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var radio = $("<label>").addClass("radio " + element[0].className);
        var check = $("<span>").addClass("check");
        var caption = $("<span>").addClass("caption").html(o.caption);

        element.attr("type", "radio");

        if (prev.length === 0) {
            parent.prepend(radio);
        } else {
            radio.insertAfter(prev);
        }

        element.appendTo(radio);
        check.appendTo(radio);
        caption.appendTo(radio);

        if (o.captionPosition === 'left') {
            radio.addClass("caption-left");
        }

        this.origin.className = element[0].className;
        element[0].className = '';

        radio.addClass(o.clsElement);
        caption.addClass(o.clsCaption);
        check.addClass(o.clsCheck);

        if (o.disabled === true && element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        var parent = element.parent();
        element[0].className = this.origin.className;
        element.insertBefore(parent);
        parent.remove();
    }
};

Metro.plugin('radio', Radio);

// Source: js/plugins/rating.js
var Rating = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.value = 0;
        this.values = [];
        this.rate = 0;
        this.rating = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        static: false,
        title: null,
        value: 0,
        values: null,
        message: "",
        stars: 5,
        starColor: null,
        staredColor: null,
        roundFunc: "round", // ceil, floor, round
        clsRating: "",
        clsTitle: "",
        clsStars: "",
        clsResult: "",
        onStarClick: Metro.noop,
        onRatingCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;
        var i;

        if (o.values !== null) {
            if (Array.isArray(o.values)) {
                this.values = o.values;
            } else if (typeof o.values === "string") {
                this.values = Utils.strToArray(o.values)
            }
        } else {
            for(i = 1; i <= o.stars; i++) {
                this.values.push(i);
            }
        }

        this.value = o.value > 0 ? Math[o.roundFunc](o.value) : 0;

        if (o.starColor !== null) {
            if (!Utils.isColor(o.starColor)) {
                o.starColor = Colors.color(o.starColor);
            }
        }

        if (o.staredColor !== null) {
            if (!Utils.isColor(o.staredColor)) {
                o.staredColor = Colors.color(o.staredColor);
            }
        }

        this._createRating();
        this._createEvents();

        Utils.exec(o.onRatingCreate, [element]);
    },

    _createRating: function(){
        var element = this.element, o = this.options;

        var prev = element.prev();
        var parent = element.parent();
        var id = Utils.elementId("rating");
        var rating = $("<div>").addClass("rating " + String(element[0].className).replace("d-block", "d-flex")).addClass(o.clsRating);
        var i, stars, result, li;
        var sheet = Metro.sheet;

        element.val(this.value);

        rating.attr("id", id);

        if (prev.length === 0) {
            parent.prepend(rating);
        } else {
            rating.insertAfter(prev);
        }

        element.appendTo(rating);

        stars = $("<ul>").addClass("stars").addClass(o.clsStars).appendTo(rating);

        for(i = 1; i <= o.stars; i++) {
            li = $("<li>").data("value", this.values[i-1]).appendTo(stars);
            if (i <= this.value) {
                li.addClass("on");
            }
        }

        result = $("<span>").addClass("result").addClass(o.clsResult).appendTo(rating);

        result.html(o.message);

        if (o.starColor !== null) {
            Utils.addCssRule(sheet, "#" + id + " .stars:hover li", "color: " + o.starColor + ";");
        }
        if (o.staredColor !== null) {
            Utils.addCssRule(sheet, "#"+id+" .stars li.on", "color: "+o.staredColor+";");
        }

        if (o.title !== null) {
            var title = $("<span>").addClass("title").addClass(o.clsTitle).html(o.title);
            rating.prepend(title);
        }

        if (o.static === true) {
            rating.addClass("static");
        }


        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (i = 0; i < element[0].style.length; i++) {
                rating.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        this.rating = rating;
    },

    _createEvents: function(){
        var element = this.element, o = this.options;
        var rating = this.rating;

        rating.on(Metro.events.click, ".stars li", function(){

            if (o.static === true) {
                return ;
            }

            var star = $(this);
            var value = star.data("value");
            star.addClass("scale");
            setTimeout(function(){
                star.removeClass("scale");
            }, 300);
            element.val(value).trigger("change");
            star.addClass("on");
            star.prevAll().addClass("on");
            star.nextAll().removeClass("on");

            Utils.exec(o.onStarClick, [value, star, element]);
        });
    },

    val: function(v){
        var that = this, element = this.element, o = this.options;
        var rating = this.rating;

        if (v === undefined) {
            return this.value;
        }

        this.value = v > 0 ? Math[o.roundFunc](v) : 0;
        element.val(this.value).trigger("change");

        var stars = rating.find(".stars li").removeClass("on");
        $.each(stars, function(){
            var star = $(this);
            if (star.data("value") <= that.value) {
                star.addClass("on");
            }
        });

        return this;
    },

    msg: function(m){
        var rating = this.rating;
        if (m ===  undefined) {
            return ;
        }
        rating.find(".result").html(m);
        return this;
    },

    static: function (mode) {
        var o = this.options;
        var rating = this.rating;

        o.static = mode;

        if (mode === true) {
            rating.addClass("static");
        } else {
            rating.removeClass("static");
        }
    },

    changeAttributeValue: function(a){
        var element = this.element;
        var value = a === "value" ? element.val() : element.attr("data-value");
        this.val(value);
    },

    changeAttributeMessage: function(){
        var element = this.element;
        var message = element.attr("data-message");
        this.msg(message);
    },

    changeAttributeStatic: function(){
        var element = this.element;
        var isStatic = JSON.parse(element.attr("data-static")) === true;

        this.static(isStatic);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "value":
            case "data-value": this.changeAttributeValue(attributeName); break;
            case "data-message": this.changeAttributeMessage(); break;
            case "data-static": this.changeAttributeStatic(); break;
        }
    }
};

Metro.plugin('rating', Rating);

// Source: js/plugins/resizable.js
var Resizable = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onResizableCreate, [this.element]);

        return this;
    },
    options: {
        resizeElement: ".resize-element",
        onResizeStart: Metro.noop,
        onResizeStop: Metro.noop,
        onResize: Metro.noop,
        onResizableCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        if (o.resizeElement !== "" && $(o.resizeElement).length === 0) {
            $("<span>").addClass("resize-element").appendTo(element);
        }

        element.on(Metro.events.start, o.resizeElement, function(e){

            if (element.data("canResize") === false) {
                return ;
            }

            var startXY = Utils.clientXY(e);
            var startWidth = parseInt(element.outerWidth());
            var startHeight = parseInt(element.outerHeight());
            var size = {width: startWidth, height: startHeight};

            Utils.exec(o.onResizeStart, [element, size]);

            $(document).on(Metro.events.move, function(e){
                var moveXY = Utils.clientXY(e);
                var size = {
                    width: startWidth + moveXY.x - startXY.x,
                    height: startHeight + moveXY.y - startXY.y
                };
                element.css(size);
                Utils.exec(o.onResize, [element, size]);
            });
        });

        element.on(Metro.events.stop, o.resizeElement, function(){
            $(document).off(Metro.events.move);

            var size = {
                width: parseInt(element.outerWidth()),
                height: parseInt(element.outerHeight())
            };
            Utils.exec(o.onResizeStop, [element, size]);
        });
    },

    off: function(){
        this.element.data("canResize", false);
    },

    on: function(){
        this.element.data("canResize", true);
    },

    changeAttribute: function(attributeName){
    }
};

Metro.plugin('resizable', Resizable);

// Source: js/plugins/ribbon-menu.js
var RibbonMenu = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    dependencies: ['buttongroup'],

    options: {
        onStatic: Metro.noop,
        onBeforeTab: Metro.noop_true,
        onTab: Metro.noop,
        onRibbonMenuCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onRibbonMenuCreate, [element]);
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;

        element.addClass("ribbon-menu");

        var tabs = element.find(".tabs-holder li:not(.static)");
        var active_tab = element.find(".tabs-holder li.active");
        if (active_tab.length > 0) {
            this.open($(active_tab[0]));
        } else {
            if (tabs.length > 0) {
                this.open($(tabs[0]));
            }
        }

        var fluentGroups = element.find(".ribbon-toggle-group");
        $.each(fluentGroups, function(){
            var g = $(this);
            g.buttongroup({
                clsActive: "active"
            });

            var gw = 0;
            var btns = g.find(".ribbon-icon-button");
            $.each(btns, function(){
                var b = $(this);
                var w = b.outerWidth(true);
                if (w > gw) gw = w;
            });

            g.css("width", Math.ceil(gw * btns.length / 3) + 4);
        });
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".tabs-holder li a", function(e){
            var link = $(this);
            var tab = $(this).parent("li");

            if (tab.hasClass("static")) {
                if (o.onStatic === Metro.noop && link.attr("href") !== undefined) {
                    document.location.href = link.attr("href");
                } else {
                    Utils.exec(o.onStatic, [tab, element]);
                }
            } else {
                if (Utils.exec(o.onBeforeTab, [tab, element]) === true) {
                    that.open(tab);
                }
            }
            e.preventDefault();
        })
    },

    open: function(tab){
        var that = this, element = this.element, o = this.options;
        var tabs = element.find(".tabs-holder li");
        var sections = element.find(".content-holder .section");
        var target = tab.children("a").attr("href");
        var target_section = target !== "#" ? element.find(target) : null;

        tabs.removeClass("active");
        tab.addClass("active");

        sections.removeClass("active");
        if (target_section) target_section.addClass("active");

        Utils.exec(o.onTab, [tab, element]);
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('ribbonmenu', RibbonMenu);

// Source: js/plugins/ripple.js
var Ripple = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onRippleCreate, [this.element]);

        return this;
    },

    options: {
        rippleColor: "#fff",
        rippleAlpha: .4,
        rippleTarget: "default",
        onRippleCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        var target = o.rippleTarget === 'default' ? null : o.rippleTarget;

        element.on(Metro.events.click, target, function(e){
            var el = $(this);
            var timer = null;

            if (el.css('position') === 'static') {
                el.css('position', 'relative');
            }

            el.css({
                overflow: 'hidden'
            });

            $(".ripple").remove();

            var size = Math.max(el.outerWidth(), el.outerHeight());

            // Add the element
            var ripple = $("<span class='ripple'></span>").css({
                width: size,
                height: size
            });

            el.prepend(ripple);

            // Get the center of the element
            var x = e.pageX - el.offset().left - ripple.width()/2;
            var y = e.pageY - el.offset().top - ripple.height()/2;

            // Add the ripples CSS and start the animation
            ripple.css({
                background: Utils.hex2rgba(o.rippleColor, o.rippleAlpha),
                width: size,
                height: size,
                top: y + 'px',
                left: x + 'px'
            }).addClass("rippleEffect");
            timer = setTimeout(function(){
                timer = null;
                $(".ripple").remove();
            }, 400);
        });
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('ripple', Ripple);

// Source: js/plugins/search.js
var Search = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onInputCreate, [this.element]);

        return this;
    },
    options: {
        clsElement: "",
        clsInput: "",
        clsPrepend: "",
        clsClearButton: "",
        clsSearchButton: "",
        size: "default",
        prepend: "",
        copyInlineStyles: true,
        clearButton: true,
        searchButton: true,
        searchButtonClick: "submit",
        clearButtonIcon: "<span class='default-icon-cross'></span>",
        searchButtonIcon: "<span class='default-icon-search'></span>",
        customButtons: [],
        disabled: false,
        onSearchButtonClick: Metro.noop,
        onInputCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var container = $("<div>").addClass("input " + element[0].className);
        var buttons = $("<div>").addClass("button-group");
        var clearButton, searchButton;

        if (element.attr("type") === undefined) {
            element.attr("type", "text");
        }

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);
        buttons.appendTo(container);

        if (o.clearButton !== false) {
            clearButton = $("<button>").addClass("button input-clear-button").addClass(o.clsClearButton).attr("tabindex", -1).attr("type", "button").html(o.clearButtonIcon);
            clearButton.on(Metro.events.click, function(){
                element.val("").trigger('change').trigger('keyup').focus();
            });
            clearButton.appendTo(buttons);
        }
        if (o.searchButton !== false) {
            searchButton = $("<button>").addClass("button input-search-button").addClass(o.clsSearchButton).attr("tabindex", -1).attr("type", o.searchButtonClick === 'submit' ? "submit" : "button").html(o.searchButtonIcon);
            searchButton.on(Metro.events.click, function(){
                if (o.searchButtonClick === 'submit') {
                    Utils.exec(o.onSearchButtonClick, [element.val(), $(this)], element[0]);
                } else {
                    this.form.submit();
                }
            });
            searchButton.appendTo(buttons);
        }

        if (o.prepend !== "") {
            var prepend = Utils.isTag(o.prepend) ? $(o.prepend) : $("<span>"+o.prepend+"</span>");
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        if (typeof o.customButtons === "string") {
            o.customButtons = Utils.isObject(o.customButtons);
        }

        if (typeof o.customButtons === "object" && Utils.objectLength(o.customButtons) > 0) {
            $.each(o.customButtons, function(){
                var item = this;
                var customButton = $("<button>").addClass("button input-custom-button").addClass(item.cls).attr("tabindex", -1).attr("type", "button").html(item.html);
                customButton.on(Metro.events.click, function(){
                    Utils.exec(item.onclick, [element.val(), customButton], element[0]);
                });
                customButton.appendTo(buttons);
            });
        }

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl").attr("dir", "rtl");
        }

        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                container.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        container.addClass(o.clsElement);
        element.addClass(o.clsInput);

        if (o.size !== "default") {
            container.css({
                width: o.size
            });
        }

        element.on(Metro.events.blur, function(){container.removeClass("focused");});
        element.on(Metro.events.focus, function(){container.addClass("focused");});

        if (o.disabled === true || element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }
    },

    disable: function(){
        //this.element.attr("disabled", true);
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        //this.element.attr("disabled", false);
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
        }
    }
};

Metro.plugin('search', Search);

// Source: js/plugins/select.js
var Select = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.list = null;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onSelectCreate, [this.element]);

        return this;
    },
    options: {
        duration: 100,
        clsElement: "",
        clsSelect: "",
        clsPrepend: "",
        clsOption: "",
        clsOptionGroup: "",
        prepend: "",
        placeholder: "",
        filterPlaceholder: "",
        filter: true,
        copyInlineStyles: true,
        dropHeight: 200,
        disabled: false,
        onChange: Metro.noop,
        onSelectCreate: Metro.noop,
        onUp: Metro.noop,
        onDrop: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        this._createSelect();
        this._createEvents();
    },

    _addOption: function(item, parent){
        var option = $(item);
        var l, a;
        var element = this.element, o = this.options;
        var input = element.siblings("input");

        l = $("<li>").addClass(o.clsOption).data("text", item.text).data('value', Utils.isValue(item.value) ? item.value : "").appendTo(parent);
        a = $("<a>").html(item.text).appendTo(l).addClass(item.className);

        if (option.is(":selected")) {
            element.val(item.value);
            input.val(item.text).trigger("change");
            element.trigger("change");
            l.addClass("active");
        }

        a.appendTo(l);
        l.appendTo(parent);
    },

    _addOptionGroup: function(item, parent){
        var that = this;
        var group = $(item);

        $("<li>").html(item.label).addClass("group-title").appendTo(parent);

        $.each(group.children(), function(){
            that._addOption(this, parent);
        })
    },

    _createSelect: function(){
        var that = this, element = this.element, o = this.options;

        var prev = element.prev();
        var parent = element.parent();
        var container = $("<div>").addClass("select " + element[0].className).addClass(o.clsElement);
        var multiple = element.prop("multiple");
        var select_id = Utils.elementId("select");

        container.attr("id", select_id).addClass("dropdown-toggle");

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);
        element.addClass(o.clsSelect);

        if (multiple === false) {

            var input = $("<input>").attr("placeholder", o.placeholder).attr("type", "text").attr("name", "__" + select_id + "__").prop("readonly", true);
            var drop_container = $("<div>").addClass("drop-container");
            var list = $("<ul>").addClass("d-menu").css({
                "max-height": o.dropHeight
            });
            var filter_input = $("<input type='text' data-role='input'>").attr("placeholder", o.filterPlaceholder);

            container.append(input);
            container.append(drop_container);

            drop_container.append(filter_input);

            if (o.filter !== true) {
                filter_input.hide();
            }

            drop_container.append(list);

            $.each(element.children(), function(){
                if (this.tagName === "OPTION") {
                    that._addOption(this, list);
                } else if (this.tagName === "OPTGROUP") {
                    that._addOptionGroup(this, list);
                }
            });

            drop_container.dropdown({
                duration: o.duration,
                toggleElement: "#"+select_id,
                onDrop: function(){
                    var dropped, target;

                    dropped = $(".select .drop-container");
                    $.each(dropped, function(){
                        var drop = $(this);
                        if (drop.is(drop_container)) {
                            return ;
                        }
                        drop.data('dropdown').close();
                    });

                    filter_input.val("").trigger(Metro.events.keyup).focus();

                    target = list.find("li.active").length > 0 ? $(list.find("li.active")[0]) : undefined;
                    if (target !== undefined) {
                        list.scrollTop(0);
                        setTimeout(function(){
                            list.animate({
                                scrollTop: target.position().top - ( (list.height() - target.height() )/ 2)
                            }, 100);
                        }, 200);
                    }

                    Utils.exec(o.onDrop, [list, element], list[0]);
                },
                onUp: function(){
                    Utils.exec(o.onUp, [list, element], list[0]);
                }
            });

            this.list = list;
        }

        if (o.prepend !== "") {
            var prepend = Utils.isTag(o.prepend) ? $(o.prepend) : $("<span>"+o.prepend+"</span>");
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                container.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl").attr("dir", "rtl");
        }

        if (o.disabled === true || element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }

    },

    _createEvents: function(){
        var element = this.element, o = this.options;
        var container = element.closest(".select");
        var drop_container = container.find(".drop-container");
        var input = element.siblings("input");
        var filter_input = drop_container.find("input");
        var list = drop_container.find("ul");

        container.on(Metro.events.click, function(e){
            e.preventDefault();
            e.stopPropagation();
        });

        input.on(Metro.events.blur, function(){container.removeClass("focused");});
        input.on(Metro.events.focus, function(){container.addClass("focused");});
        filter_input.on(Metro.events.blur, function(){container.removeClass("focused");});
        filter_input.on(Metro.events.focus, function(){container.addClass("focused");});

        list.on(Metro.events.click, "li", function(e){
            if ($(this).hasClass("group-title")) {
                e.preventDefault();
                e.stopPropagation();
                return ;
            }
            var leaf = $(this);
            var val = leaf.data('value');
            var txt = leaf.data('text');

            list.find("li.active").removeClass("active");
            leaf.addClass("active");
            input.val(txt).trigger("change");
            element.val(val);
            element.trigger("change");
            drop_container.data("dropdown").close();
            Utils.exec(o.onChange, [val], element[0]);
        });

        filter_input.on(Metro.events.keyup, function(){
            var filter = this.value.toUpperCase();
            var li = list.find("li");
            var i, a;
            for (i = 0; i < li.length; i++) {
                if ($(li[i]).hasClass("group-title")) continue;
                a = li[i].getElementsByTagName("a")[0];
                if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        });

        drop_container.on(Metro.events.click, function(e){
            e.preventDefault();
            e.stopPropagation();
        });
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    val: function(v){
        var element = this.element, o = this.options;
        var input = element.siblings("input");
        var options = element.find("option");
        var items = this.list.find("li");

        if (v === undefined) {
            return element.val();
        }

        options.removeAttr("selected");
        $.each(options, function(){
            var op = this;

            if (""+op.value === ""+v) {
                op.setAttribute("selected", "selected");
                input.val(op.text);
                element.trigger("change");

                items.removeClass("active");
                $.each(items, function(){
                    var item = $(this);

                    if (item.hasClass("group-title")) return ;

                    if (""+item.data("value") === ""+v) {
                        item.addClass("active");
                    }
                });

                Utils.exec(o.onChange, [v], element[0]);
            }
        });
    },

    data: function(op){
        var that = this, element = this.element;
        var select = element.parent();
        var list = select.find("ul");
        var option_group;

        element.html("");
        list.html("");

        if (typeof op === 'string') {
            element.html(op);
        } else if (Utils.isObject(op)) {
            $.each(op, function(key, val){
                if (Utils.isObject(val)) {
                    option_group = $("<optgroup>").attr("label", key).appendTo(element);
                    $.each(val, function(key2, val2){
                        $("<option>").attr("value", key2).text(val2).appendTo(option_group);
                    });
                } else {
                    $("<option>").attr("value", key).text(val).appendTo(element);
                }
            });
        }

        $.each(element.children(), function(){
            if (this.tagName === "OPTION") {
                that._addOption(this, list);
            } else if (this.tagName === "OPTGROUP") {
                that._addOptionGroup(this, list);
            }
        });
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var element = this.element;
        var container = element.closest(".select");
        var drop_container = container.find(".drop-container");
        var input = element.siblings("input");
        var filter_input = drop_container.find("input");
        var list = drop_container.find("ul");

        container.off(Metro.events.click);
        input.off(Metro.events.blur);
        input.off(Metro.events.focus);
        filter_input.off(Metro.events.blur);
        filter_input.off(Metro.events.focus);
        list.off(Metro.events.click, "li");
        filter_input.off(Metro.events.keyup);
        drop_container.off(Metro.events.click);

        Metro.destroyPlugin(drop_container, "dropdown");

        element.insertBefore(container);
        container.remove();
    }
};

$(document).on(Metro.events.click, function(){
    var selects = $(".select .drop-container");
    $.each(selects, function(){
        $(this).data('dropdown').close();
    });
});

Metro.plugin('select', Select);



// Source: js/plugins/sidebar.js
var Sidebar = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.toggle_element = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        shift: null,
        staticShift: null,
        toggle: null,
        duration: METRO_ANIMATION_DURATION,
        static: null,
        menuItemClick: true,
        onOpen: Metro.noop,
        onClose: Metro.noop,
        onToggle: Metro.noop,
        onStaticSet: Metro.noop,
        onStaticLoss: Metro.noop,
        onSidebarCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createStructure();
        this._createEvents();
        $(window).resize();
        this._checkStatic();

        Utils.exec(o.onSidebarCreate, [element], element[0]);
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var header = element.find(".sidebar-header");
        var sheet = Metro.sheet;

        if (element.attr("id") === undefined) {
            element.attr("id", Utils.elementId("sidebar"));
        }

        element.addClass("sidebar");

        if (o.toggle !== null && $(o.toggle).length > 0) {
            this.toggle_element = $(o.toggle);
        }

        if (header.length > 0) {
            if (header.data("image") !== undefined) {
                header.css({
                    backgroundImage: "url("+header.data("image")+")"
                });
            }
        }

        if (o.static !== null) {
            if (o.staticShift !== null) {
                Utils.addCssRule(sheet, "@media screen and " + Metro.media_queries[o.static.toUpperCase()], o.staticShift + "{margin-left: 280px; width: calc(100% - 280px);}");
            }
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var toggle = this.toggle_element;

        if (toggle !== null) {
            toggle.on(Metro.events.click, function(e){
                that.toggle();
            });
        }

        if (o.static !== null && ["fs", "sm", "md", "lg", "xl", "xxl"].indexOf(o.static)) {
            $(window).on(Metro.events.resize + "_" + element.attr("id"), function(){
                that._checkStatic();
            });
        }

        if (o.menuItemClick === true) {
            element.on(Metro.events.click, ".sidebar-menu li > a", function(){
                that.close();
            });
        }
    },

    _checkStatic: function(){
        var element = this.element, o = this.options;
        if (Utils.mediaExist(o.static) && !element.hasClass("static")) {
            element.addClass("static");
            element.data("opened", false).removeClass('open');
            if (o.shift !== null) {
                $.each(o.shift.split(","), function(){
                    $(this).css({left: 0}, o.duration);
                });
            }
            Utils.exec(o.onStaticSet, [element], element[0]);
        }
        if (!Utils.mediaExist(o.static)) {
            element.removeClass("static");
            Utils.exec(o.onStaticLoss, [element], element[0]);
        }
    },

    isOpen: function(){
        return this.element.data("opened") === true;
    },

    open: function(){
        var that = this, element = this.element, o = this.options;

        if (element.hasClass("static")) {
            return ;
        }

        element.data("opened", true).addClass('open');

        if (o.shift !== null) {
            $.each(o.shift.split(","), function(){
                $(this).animate({left: element.outerWidth()}, o.duration);
            });
        }

        Utils.exec(o.onOpen, [element], element[0]);
    },

    close: function(){
        var that = this, element = this.element, o = this.options;

        if (element.hasClass("static")) {
            return ;
        }

        element.data("opened", false).removeClass('open');

        if (o.shift !== null) {
            $.each(o.shift.split(","), function(){
                $(this).animate({left: 0}, o.duration);
            });
        }

        Utils.exec(o.onClose, [element], element[0]);
    },

    toggle: function(){
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
        Utils.exec(this.options.onToggle, [this.element], this.element[0]);
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){}
};

Metro.plugin('sidebar', Sidebar);

Metro['sidebar'] = {
    isSidebar: function(el){
        return Utils.isMetroObject(el, "sidebar");
    },

    open: function(el){
        if (!this.isSidebar(el)) {
            return ;
        }
        $(el).data("sidebar").open();
    },

    close: function(el){
        if (!this.isSidebar(el)) {
            return ;
        }
        $(el).data("sidebar").close();
    },

    toggle: function(el){
        if (!this.isSidebar(el)) {
            return ;
        }
        $(el).data("sidebar").toggle();
    }
};

// Source: js/plugins/slider.js
var Slider = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.slider = null;
        this.value = 0;
        this.percent = 0;
        this.pixel = 0;
        this.buffer = 0;
        this.keyInterval = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        min: 0,
        max: 100,
        accuracy: 0,
        showMinMax: false,
        minMaxPosition: Metro.position.TOP,
        value: 0,
        buffer: 0,
        hint: false,
        hintAlways: false,
        hintPosition: Metro.position.TOP,
        hintMask: "$1",
        vertical: false,
        target: null,
        returnType: "value", // value or percent
        size: 0,

        clsSlider: "",
        clsBackside: "",
        clsComplete: "",
        clsBuffer: "",
        clsMarker: "",
        clsHint: "",
        clsMinMax: "",
        clsMin: "",
        clsMax: "",

        onStart: Metro.noop,
        onStop: Metro.noop,
        onMove: Metro.noop,
        onClick: Metro.noop,
        onChangeValue: Metro.noop,
        onChangeBuffer: Metro.noop,
        onFocus: Metro.noop,
        onBlur: Metro.noop,
        onSliderCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createSlider();
        this._createEvents();
        this.buff(o.buffer);
        this.val(o.value);

        Utils.exec(o.onSliderCreate, [element]);
    },

    _createSlider: function(){
        var element = this.element, o = this.options;

        var prev = element.prev();
        var parent = element.parent();
        var slider = $("<div>").addClass("slider " + element[0].className).addClass(o.clsSlider);
        var backside = $("<div>").addClass("backside").addClass(o.clsBackside);
        var complete = $("<div>").addClass("complete").addClass(o.clsComplete);
        var buffer = $("<div>").addClass("buffer").addClass(o.clsBuffer);
        var marker = $("<button>").attr("type", "button").addClass("marker").addClass(o.clsMarker);
        var hint = $("<div>").addClass("hint").addClass(o.hintPosition + "-side").addClass(o.clsHint);
        var id = Utils.uniqueId();
        var i;

        slider.attr("id", id);

        if (o.size > 0) {
            if (o.vertical === true) {
                slider.outerHeight(o.size);
            } else {
                slider.outerWidth(o.size);
            }
        }

        if (o.vertical === true) {
            slider.addClass("vertical-slider");
        }

        if (prev.length === 0) {
            parent.prepend(slider);
        } else {
            slider.insertAfter(prev);
        }

        if (o.hintAlways === true) {
            hint.css({
                display: "block"
            }).addClass("permanent-hint");
        }

        element.appendTo(slider);
        backside.appendTo(slider);
        complete.appendTo(slider);
        buffer.appendTo(slider);
        marker.appendTo(slider);
        hint.appendTo(marker);

        if (o.showMinMax === true) {
            var min_max_wrapper = $("<div>").addClass("slider-min-max clear").addClass(o.clsMinMax);
            $("<span>").addClass("place-left").addClass(o.clsMin).html(o.min).appendTo(min_max_wrapper);
            $("<span>").addClass("place-right").addClass(o.clsMax).html(o.max).appendTo(min_max_wrapper);
            if (o.minMaxPosition === Metro.position.TOP) {
                min_max_wrapper.insertBefore(slider);
            } else {
                min_max_wrapper.insertAfter(slider);
            }
        }

        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (i = 0; i < element[0].style.length; i++) {
                slider.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        this.slider = slider;
    },

    _createEvents: function(){
        var that = this, slider = this.slider, o = this.options;
        var marker = slider.find(".marker");
        var hint = slider.find(".hint");

        marker.on(Metro.events.start, function(){
            $(document).on(Metro.events.move, function(e){
                if (o.hint === true && o.hintAlways !== true) {
                    hint.fadeIn();
                }
                that._move(e);
                Utils.exec(o.onMove, [that.value, that.percent, slider]);
            });

            $(document).on(Metro.events.stop, function(){
                $(document).off(Metro.events.move);
                $(document).off(Metro.events.stop);

                if (o.hintAlways !== true) {
                    hint.fadeOut();
                }

                Utils.exec(o.onStop, [that.value, that.percent, slider]);
            });

            Utils.exec(o.onStart, [that.value, that.percent, slider]);
        });

        marker.on(Metro.events.focus, function(){
            Utils.exec(o.onFocus, [that.value, that.percent, slider]);
        });

        marker.on(Metro.events.blur, function(){
            Utils.exec(o.onBlur, [that.value, that.percent, slider]);
        });

        marker.on(Metro.events.keydown, function(e){

            var key = e.keyCode ? e.keyCode : e.which;

            if ([37,38,39,40].indexOf(key) === -1) {
                return;
            }

            var step = o.accuracy === 0 ? 1 : o.accuracy;

            if (that.keyInterval) {
                return ;
            }
            that.keyInterval = setInterval(function(){

                var val = that.value;

                if (e.keyCode === 37 || e.keyCode === 40) { // left, down
                    if (val - step < o.min) {
                        val = o.min;
                    } else {
                        val -= step;
                    }
                }

                if (e.keyCode === 38 || e.keyCode === 39) { // right, up
                    if (val + step > o.max) {
                        val = o.max;
                    } else {
                        val += step;
                    }
                }

                that.value = that._correct(val);
                that.percent = that._convert(that.value, 'val2prc');
                that.pixel = that._convert(that.percent, 'prc2pix');

                that._redraw();
            }, 100);

            e.preventDefault();
        });

        marker.on(Metro.events.keyup, function(){
            clearInterval(that.keyInterval);
            that.keyInterval = false;
        });

        slider.on(Metro.events.click, function(e){
            that._move(e);
            Utils.exec(o.onClick, [that.value, that.percent, slider]);
            Utils.exec(o.onStop, [that.value, that.percent, slider]);
        });

        $(window).resize(function(){
            that.val(that.value);
            that.buff(that.buffer);
        });
    },

    _convert: function(v, how){
        var slider = this.slider, o = this.options;
        var length = (o.vertical === true ? slider.outerHeight() : slider.outerWidth()) - slider.find(".marker").outerWidth();
        switch (how) {
            case "pix2prc": return Math.round( v * 100 / length );
            case "pix2val": return Math.round( this._convert(v, 'pix2prc') * ((o.max - o.min) / 100) + o.min );
            case "val2prc": return Math.round( (v - o.min)/( (o.max - o.min) / 100 )  );
            case "prc2pix": return Math.round( v / ( 100 / length ));
            case "val2pix": return Math.round( this._convert(this._convert(v, 'val2prc'), 'prc2pix') );
        }

        return 0;
    },

    _correct: function(value){
        var accuracy  = this.options.accuracy;
        var min = this.options.min, max = this.options.max;

        if (accuracy === 0 || isNaN(accuracy)) {
            return value;
        }

        value = Math.floor(value / accuracy) * accuracy + Math.round(value % accuracy / accuracy) * accuracy;

        if (value < min) {
            value = min;
        }

        if (value > max) {
            value = max;
        }

        return value;
    },

    _move: function(e){
        var slider = this.slider, o = this.options;
        var offset = slider.offset(),
            marker_size = slider.find(".marker").outerWidth(),
            length = o.vertical === true ? slider.outerHeight() : slider.outerWidth(),
            cPos, cPix, cStart = 0, cStop = length - marker_size;

        cPos = o.vertical === true ? Utils.pageXY(e).y - offset.top : Utils.pageXY(e).x - offset.left;
        cPix = o.vertical === true ? length - cPos - marker_size / 2 : cPos - marker_size / 2;

        if (cPix < cStart || cPix > cStop) {
            return ;
        }

        this.value = this._correct(this._convert(cPix, 'pix2val'));
        this.percent = this._convert(this.value, 'val2prc');
        this.pixel = this._convert(this.percent, 'prc2pix');

        this._redraw();
    },

    _hint: function(){
        var o = this.options, slider = this.slider, hint = slider.find(".hint");
        var value;

        value = o.hintMask.replace("$1", this.value).replace("$2", this.percent);

        hint.text(value);
    },

    _value: function(){
        var element = this.element, o = this.options, slider = this.slider;
        var value = o.returnType === 'value' ? this.value : this.percent;

        if (element[0].tagName === "INPUT") {
            element.val(value);
        }

        element.trigger("change");

        if (o.target !== null) {
            var target = $(o.target);
            if (target.length !== 0) {

                $.each(target, function(){
                    var t = $(this);
                    if (this.tagName === "INPUT") {
                        t.val(value);
                    } else {
                        t.text(value);
                    }
                });
            }
        }

        Utils.exec(o.onChangeValue, [value, this.percent, slider]);
    },

    _marker: function(){
        var slider = this.slider, o = this.options;
        var marker = slider.find(".marker"), complete = slider.find(".complete");
        var length = o.vertical === true ? slider.outerHeight() : slider.outerWidth();
        var marker_size = parseInt(Utils.getStyleOne(marker, "width"));
        var slider_visible = Utils.isVisible(slider);

        if (slider_visible) {
            marker.css({
                'margin-top': 0,
                'margin-left': 0
            });
        }

        if (o.vertical === true) {
            if (slider_visible) {
                marker.css('top', length - this.pixel);
            } else {
                marker.css('top', this.percent + "%");
                marker.css('margin-top', this.percent === 0 ? 0 : -1 * marker_size / 2);
            }
            complete.css('height', this.percent+"%");
        } else {
            if (slider_visible) {
                marker.css('left', this.pixel);
            } else {
                marker.css('left', this.percent + "%");
                marker.css('margin-left', this.percent === 0 ? 0 : -1 * marker_size / 2);
            }
            complete.css('width', this.percent+"%");
        }
    },

    _redraw: function(){
        this._marker();
        this._value();
        this._hint();
    },

    _buffer: function(){
        var o = this.options;
        var buffer = this.slider.find(".buffer");

        if (o.vertical === true) {
            buffer.css("height", this.buffer + "%");
        } else {
            buffer.css("width", this.buffer + "%");
        }

        Utils.exec(o.onChangeBuffer, [this.buffer, this.slider]);
    },

    val: function(v){
        var o = this.options;

        if (v === undefined || isNaN(v)) {
            return this.value;
        }

        if (v < o.min) {
            v = o.min;
        }

        if (v > o.max) {
            v = o.max;
        }

        this.value = this._correct(v);
        this.percent = this._convert(this.value, 'val2prc');
        this.pixel = this._convert(this.percent, 'prc2pix');

        this._redraw();
    },

    buff: function(v){
        var slider = this.slider;
        var buffer = slider.find(".buffer");

        if (v === undefined || isNaN(v)) {
            return this.buffer;
        }

        if (buffer.length === 0) {
            return false;
        }

        v = parseInt(v);

        if (v > 100) {
            v = 100;
        }

        if (v < 0) {
            v = 0;
        }

        this.buffer = v;
        this._buffer();
    },

    changeValue: function(){
        var element = this.element, o = this.options;
        var val = element.attr("data-value");
        if (val < o.min) {
            val = o.min
        }
        if (val > o.max) {
            val = o.max
        }
        this.val(val);
    },

    changeBuffer: function(){
        var element = this.element;
        var val = parseInt(element.attr("data-buffer"));
        if (val < 0) {
            val = 0
        }
        if (val > 100) {
            val = 100
        }
        this.buff(val);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-value": this.changeValue(); break;
            case "data-buffer": this.changeBuffer(); break;
        }
    }
};

Metro.plugin('slider', Slider);

// Source: js/plugins/sorter.js
var Sorter = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.initial = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        thousandSeparator: ",",
        decimalSeparator: ",",
        sortTarget: null,
        sortSource: null,
        sortDir: "asc",
        sortStart: true,
        saveInitial: true,
        onSortStart: Metro.noop,
        onSortStop: Metro.noop,
        onSortItemSwitch: Metro.noop,
        onSorterCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        this._createStructure();

        Utils.exec(o.onSorterCreate, [element]);
    },

    _createStructure: function(){
        var element = this.element, o = this.options;

        if (o.sortTarget === null) {
            o.sortTarget = element.children()[0].tagName;
        }

        this.initial = element.find(o.sortTarget).get();

        if (o.sortStart === true) {
            this.sort(o.sortDir);
        }
    },

    _getItemContent: function(item){
        var o = this.options;
        var data, inset, i, format;

        if (Utils.isValue(o.sortSource)) {
            data = "";
            inset = item.getElementsByClassName(o.sortSource);

            if (inset.length > 0) for (i = 0; i < inset.length; i++) {
                data += inset[i].textContent;
            }
            format = inset[0].dataset.format;
        } else {
            data = item.textContent;
            format = item.dataset.format;
        }

        data = (""+data).toLowerCase().replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

        if (Utils.isValue(format)) {

            if (['number', 'int', 'float', 'money'].indexOf(format) !== -1 && (o.thousandSeparator !== "," || o.decimalSeparator !== "." )) {
                data = Utils.parseNumber(data, o.thousandSeparator, o.decimalSeparator);
            }

            switch (format) {
                case "date": data = Utils.isDate(data) ? new Date(data) : ""; break;
                case "number": data = Number(data); break;
                case "int": data = parseInt(data); break;
                case "float": data = parseFloat(data); break;
                case "money": data = Number(parseFloat(data.replace(/[^0-9-.]/g, ''))); break;
            }
        }

        return data;
    },

    sort: function(dir){
        var that = this, element = this.element, o = this.options;
        var items;
        var id = Utils.uniqueId();
        var prev;

        if (dir !== undefined) {
            o.sortDir = dir;
        }

        items = element.find(o.sortTarget).get();

        if (items.length === 0) {
            return ;
        }

        prev = $("<div>").attr("id", id).insertBefore($(element.find(o.sortTarget)[0]));

        Utils.exec(o.onSortStart, [element], element[0]);

        items.sort(function(a, b){
            var c1 = that._getItemContent(a);
            var c2 = that._getItemContent(b);
            var result = 0;

            if (c1 < c2 ) {
                return result = -1;
            }

            if (c1 > c2 ) {
                return result = 1;
            }

            if (result !== 0) {
                Utils.exec(o.onSortItemSwitch, [a, b], element[0]);
            }

            return result;
        });

        if (o.sortDir === "desc") {
            items.reverse();
        }

        element.find(o.sortTarget).remove();

        $.each(items, function(){
            var $this = $(this);
            $this.insertAfter(prev);
            prev = $this;
        });

        $("#"+id).remove();

        Utils.exec(o.onSortStop, [element], element[0]);
    },

    reset: function(){
        var that = this, element = this.element, o = this.options;
        var items;
        var id = Utils.uniqueId();
        var prev;

        items = this.initial;

        if (items.length === 0) {
            return ;
        }

        prev = $("<div>").attr("id", id).insertBefore($(element.find(o.sortTarget)[0]));

        element.find(o.sortTarget).remove();

        $.each(items, function(){
            var $this = $(this);
            $this.insertAfter(prev);
            prev = $this;
        });

        $("#"+id).remove();
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;

        var changeSortDir = function() {
            var dir = element.attr("data-sort-dir").trim();
            if (dir === "") return;
            o.sortDir = dir;
            that.sort();
        };

        var changeSortContent = function(){
            var content = element.attr("data-sort-content").trim();
            if (content === "") return ;
            o.sortContent = content;
            that.sort();
        };

        switch (attributeName) {
            case "data-sort-dir": changeSortDir(); break;
            case "data-sort-content": changeSortContent(); break;
        }
    },

    destroy: function(){}
};

Metro.plugin('sorter', Sorter);

Metro['sorter'] = {
    create: function(el, op){
        return $(el).sorter(op);
    },

    isSorter: function(el){
        return Utils.isMetroObject(el, "sorter");
    },

    sort: function(el, dir){
        if (!this.isSorter(el)) {
            return false;
        }
        var sorter = $(el).data("sorter");
        if (dir === undefined) {
            dir = "asc";
        }
        sorter.sort(dir);
    },

    reset: function(el){
        if (!this.isSorter(el)) {
            return false;
        }
        var sorter = $(el).data("sorter");
        sorter.reset();
    }
};

// Source: js/plugins/stepper.js
var Stepper = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.current = 0;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        view: Metro.stepperView.SQUARE, // square, cycle, diamond
        steps: 3,
        step: 1,
        stepClick: false,
        clsStepper: "",
        clsStep: "",
        clsComplete: "",
        clsCurrent: "",
        onStep: Metro.noop,
        onStepClick: Metro.noop,
        onStepperCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        if (o.step <= 0) {
            o.step = 1;
        }

        this._createStepper();
        this._createEvents();

        Utils.exec(o.onStepperCreate, [element]);
    },

    _createStepper: function(){
        var that = this, element = this.element, o = this.options;
        var i;

        element.addClass("stepper").addClass(o.view).addClass(o.clsStepper);

        for(i = 1; i <= o.steps; i++) {
            var step = $("<span>").addClass("step").addClass(o.clsStep).data("step", i).html("<span>"+i+"</span>").appendTo(element);
        }

        this.current = 1;
        this.toStep(o.step);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".step", function(){
            var step = $(this).data("step");
            if (o.stepClick === true) {
                that.toStep(step);
                Utils.exec(o.onStepClick, [step, element]);
            }
        });
    },

    next: function(){
        var that = this, element = this.element, o = this.options;
        var steps = element.find(".step");

        if (this.current + 1 > steps.length) {
            return ;
        }

        this.current++;

        this.toStep(this.current);
    },

    prev: function(){
        var that = this, element = this.element, o = this.options;

        if (this.current - 1 === 0) {
            return ;
        }

        this.current--;

        this.toStep(this.current);
    },

    last: function(){
        var that = this, element = this.element, o = this.options;

        this.toStep(element.find(".step").length);
    },

    first: function(){
        this.toStep(1);
    },

    toStep: function(step){
        var that = this, element = this.element, o = this.options;
        var target = $(element.find(".step").get(step - 1));

        if (target.length === 0) {
            return ;
        }

        this.current = step;

        element.find(".step")
            .removeClass("complete current")
            .removeClass(o.clsCurrent)
            .removeClass(o.clsComplete);

        target.addClass("current").addClass(o.clsCurrent);
        target.prevAll().addClass("complete").addClass(o.clsComplete);

        Utils.exec(o.onStep, [this.current, element]);
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('stepper', Stepper);

// Source: js/plugins/streamer.js
var Streamer = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.data = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        duration: METRO_ANIMATION_DURATION,
        defaultClosedIcon: "",
        defaultOpenIcon: "",
        changeUri: true,
        encodeLink: true,
        closed: false,
        chromeNotice: false,
        startFrom: null,
        slideToStart: true,
        startSlideSleep: 1000,
        source: null,
        data: null,
        eventClick: "select",
        selectGlobal: true,
        streamSelect: false,
        excludeSelectElement: null,
        excludeClickElement: null,
        excludeElement: null,
        excludeSelectClass: "",
        excludeClickClass: "",
        excludeClass: "",
        onStreamClick: Metro.noop,
        onStreamSelect: Metro.noop,
        onEventClick: Metro.noop,
        onEventSelect: Metro.noop,
        onStreamerCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        element.addClass("streamer");

        if (element.attr("id") === undefined) {
            element.attr("id", Utils.elementId("streamer"));
        }

        if (o.source === null && o.data === null) {
            return false;
        }

        $("<div>").addClass("streams").appendTo(element);
        $("<div>").addClass("events-area").appendTo(element);

        if (o.source !== null) {
            $.get(o.source, function(data){
                that.data = data;
                that.build();
            });
        } else {
            this.data = o.data;
            this.build();
        }

        this._createEvents();

        if (o.chromeNotice === true && Utils.detectChrome() === true && Utils.isTouchDevice() === false) {
            $("<p>").addClass("text-small text-muted").html("*) In Chrome browser please press and hold Shift and turn the mouse wheel.").insertAfter(element);
        }
    },

    build: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var streams = element.find(".streams").html("");
        var events_area = element.find(".events-area").html("");
        var timeline = $("<ul>").addClass("streamer-timeline").html("").appendTo(events_area);
        var streamer_events = $("<div>").addClass("streamer-events").appendTo(events_area);
        var event_group_main = $("<div>").addClass("event-group").appendTo(streamer_events);
        var StreamerIDS = Utils.getURIParameter(null, "StreamerIDS");

        if (StreamerIDS !== null && o.encodeLink === true) {
            StreamerIDS = atob(StreamerIDS);
        }

        var StreamerIDS_i = StreamerIDS ? StreamerIDS.split("|")[0] : null;
        var StreamerIDS_a = StreamerIDS ? StreamerIDS.split("|")[1].split(",") : [];

        if (data.actions !== undefined) {
            var actions = $("<div>").addClass("streamer-actions").appendTo(streams);
            $.each(data.actions, function(){
                var item = this;
                var button = $("<button>").addClass("streamer-action").addClass(item.cls).html(item.html);
                if (item.onclick !== undefined) button.on(Metro.events.click, function(){
                    Utils.exec(item.onclick, [element]);
                });
                button.appendTo(actions);
            });
        }

        // Create timeline

        timeline.html("");

        if (data.timeline === undefined) {
            data.timeline = {
                start: "09:00",
                stop: "18:00",
                step: 20
            }
        }

        var start = new Date(), stop = new Date();
        var start_time_array = data.timeline.start ? data.timeline.start.split(":") : [9,0];
        var stop_time_array = data.timeline.stop ? data.timeline.stop.split(":") : [18,0];
        var step = data.timeline.step ? parseInt(data.timeline.step) * 60 : 1200;

        start.setHours(start_time_array[0]);
        start.setMinutes(start_time_array[1]);
        start.setSeconds(0);

        stop.setHours(stop_time_array[0]);
        stop.setMinutes(stop_time_array[1]);
        stop.setSeconds(0);

        for (var i = start.getTime()/1000; i <= stop.getTime()/1000; i += step) {
            var t = new Date(i * 1000);
            var h = t.getHours(), m = t.getMinutes();
            var v = (h < 10 ? "0"+h : h) + ":" + (m < 10 ? "0"+m : m);

            var li = $("<li>").data("time", v).addClass("js-time-point-" + v.replace(":", "-")).html("<em>"+v+"</em>").appendTo(timeline);
        }

        // -- End timeline creator

        if (data.streams !== undefined) {
            $.each(data.streams, function(stream_index){
                var stream_item = this;
                var stream = $("<div>").addClass("stream").addClass(this.cls).appendTo(streams);
                stream
                    .addClass(stream_item.cls)
                    .data("one", false)
                    .data("data", stream_item.data);

                $("<div>").addClass("stream-title").html(stream_item.title).appendTo(stream);
                $("<div>").addClass("stream-secondary").html(stream_item.secondary).appendTo(stream);
                $(stream_item.icon).addClass("stream-icon").appendTo(stream);

                var bg = Utils.computedRgbToHex(Utils.getStyleOne(stream, "background-color"));
                var fg = Utils.computedRgbToHex(Utils.getStyleOne(stream, "color"));

                var stream_events = $("<div>").addClass("stream-events")
                    .data("background-color", bg)
                    .data("text-color", fg)
                    .appendTo(event_group_main);

                if (stream_item.events !== undefined) {
                    $.each(stream_item.events, function(event_index){
                        var event_item = this;
                        var _icon;
                        var sid = stream_index+":"+event_index;
                        var custom_html = event_item.custom !== undefined ? event_item.custom : "";
                        var custom_html_open = event_item.custom_open !== undefined ? event_item.custom_open : "";
                        var custom_html_close = event_item.custom_close !== undefined ? event_item.custom_close : "";
                        var event = $("<div>")
                            .data("origin", event_item)
                            .data("sid", sid)
                            .data("data", event_item.data)
                            .data("time", event_item.time)
                            .data("target", event_item.target)
                            .addClass("stream-event")
                            .addClass("size-"+event_item.size+"x")
                            .addClass(event_item.cls)
                            .appendTo(stream_events);


                        var left = timeline.find(".js-time-point-"+this.time.replace(":", "-"))[0].offsetLeft - stream.outerWidth();

                        event.css({
                            position: "absolute",
                            left: left
                        });


                        var slide = $("<div>").addClass("stream-event-slide").appendTo(event);
                        var slide_logo = $("<div>").addClass("slide-logo").appendTo(slide);
                        var slide_data = $("<div>").addClass("slide-data").appendTo(slide);

                        if (event_item.icon !== undefined) {
                            if (Utils.isTag(event_item.icon)) {
                                $(event_item.icon).addClass("icon").appendTo(slide_logo);
                            } else {
                                $("<img>").addClass("icon").attr("src", event_item.icon).appendTo(slide_logo);
                            }
                        }

                        $("<span>").addClass("time").css({
                            backgroundColor: bg,
                            color: fg
                        }).html(event_item.time).appendTo(slide_logo);

                        $("<div>").addClass("title").html(event_item.title).appendTo(slide_data);
                        $("<div>").addClass("subtitle").html(event_item.subtitle).appendTo(slide_data);
                        $("<div>").addClass("desc").html(event_item.desc).appendTo(slide_data);

                        if (o.closed === false && (element.attr("id") === StreamerIDS_i && StreamerIDS_a.indexOf(sid) !== -1) || event_item.selected === true || parseInt(event_item.selected) === 1) {
                            event.addClass("selected");
                        }

                        if (o.closed === true || event_item.closed === true || parseInt(event_item.closed) === 1) {
                            _icon = event_item.closedIcon !== undefined ? Utils.isTag(event_item.closedIcon) ? event_item.closedIcon : "<span>"+event_item.closedIcon+"</span>" : Utils.isTag(o.defaultClosedIcon) ? o.defaultClosedIcon : "<span>"+o.defaultClosedIcon+"</span>";
                            $(_icon).addClass("state-icon").addClass(event_item.clsClosedIcon).appendTo(slide);
                            event
                                .data("closed", true)
                                .data("target", event_item.target);
                            event.append(custom_html_open);
                        } else {
                            _icon = event_item.openIcon !== undefined ? Utils.isTag(event_item.openIcon) ? event_item.openIcon : "<span>"+event_item.openIcon+"</span>"  : Utils.isTag(o.defaultOpenIcon) ? o.defaultOpenIcon : "<span>"+o.defaultOpenIcon+"</span>";
                            $(_icon).addClass("state-icon").addClass(event_item.clsOpenIcon).appendTo(slide);
                            event
                                .data("closed", false);
                            event.append(custom_html_close);
                        }

                        event.append(custom_html);
                    });

                    var last_child = stream_events.find(".stream-event:last-child");
                    if (last_child.length > 0) stream_events.outerWidth(last_child[0].offsetLeft + last_child.outerWidth());
                }
            });
        }

        if (data.global !== undefined) {
            $.each(['before', 'after'], function(){
                var global_item = this;
                if (data.global[global_item] !== undefined) {
                    $.each(data.global[global_item], function(){
                        var event_item = this;
                        var group = $("<div>").addClass("event-group").addClass("size-"+event_item.size+"x");
                        var events = $("<div>").addClass("stream-events global-stream").appendTo(group);
                        var event = $("<div>").addClass("stream-event").appendTo(events);
                        event
                            .addClass("global-event")
                            .addClass(event_item.cls)
                            .data("time", event_item.time)
                            .data("origin", event_item)
                            .data("data", event_item.data);

                        $("<div>").addClass("event-title").html(event_item.title).appendTo(event);
                        $("<div>").addClass("event-subtitle").html(event_item.subtitle).appendTo(event);
                        $("<div>").addClass("event-html").html(event_item.html).appendTo(event);

                        var left, t = timeline.find(".js-time-point-"+this.time.replace(":", "-"));

                        if (t.length > 0) left = t[0].offsetLeft - streams.find(".stream").outerWidth();
                        group.css({
                            position: "absolute",
                            left: left,
                            height: "100%"
                        }).appendTo(streamer_events);
                    });
                }
            });
        }

        element.data("stream", -1);

        if (o.startFrom !== null && o.slideToStart === true) {
            setTimeout(function(){
                that.slideTo(o.startFrom);
            }, o.startSlideSleep);
        }

        Utils.exec(o.onStreamerCreate, [element]);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".stream-event", function(e){
            var event = $(this);

            if (o.excludeClass !== "" && event.hasClass(o.excludeClass)) {
                return ;
            }

            if (o.excludeElement !== null && $(e.target).is(o.excludeElement)) {
                return ;
            }

            if (o.closed === false && event.data("closed") !== true && o.eventClick === 'select') {

                if (o.excludeSelectClass !== "" && event.hasClass(o.excludeSelectClass)) {

                } else {
                    if (o.excludeSelectElement !== null && $(e.target).is(o.excludeSelectElement)) {

                    } else {
                        if (event.hasClass("global-event")) {
                            if (o.selectGlobal === true) {
                                event.toggleClass("selected");
                            }
                        } else {
                            event.toggleClass("selected");
                        }
                        if (o.changeUri === true) {
                            that._changeURI();
                        }
                        Utils.exec(o.onEventSelect, [event, event.hasClass("selected")]);
                    }
                }
            } else {
                if (o.excludeClickClass !== "" && event.hasClass(o.excludeClickClass)) {

                } else {

                    if (o.excludeClickElement !== null && $(e.target).is(o.excludeClickElement)) {

                    } else {

                        Utils.exec(o.onEventClick, [event]);

                        if (o.closed === true || event.data("closed") === true) {
                            var target = event.data("target");
                            if (target) {
                                window.location.href = target;
                            }
                        }

                    }
                }
            }
        });

        element.on(Metro.events.click, ".stream", function(e){
            var stream = $(this);
            var index = stream.index();

            if (o.streamSelect === false) {
                return;
            }

            if (element.data("stream") === index) {
                element.find(".stream-event").removeClass("disabled");
                element.data("stream", -1);
            } else {
                element.data("stream", index);
                element.find(".stream-event").addClass("disabled");
                that.enableStream(stream);
                Utils.exec(o.onStreamSelect, [stream]);
            }

            Utils.exec(o.onStreamClick, [stream]);
        });

        if (Utils.isTouchDevice() !== true) {
            element.on(Metro.events.mousewheel, ".events-area", function(e) {
                var acrollable = $(this);

                if (e.deltaY === undefined || e.deltaFactor === undefined) {
                    return ;
                }

                if (e.deltaFactor > 1) {
                    var scroll = acrollable.scrollLeft() - ( e.deltaY * 30 );
                    acrollable.scrollLeft(scroll);
                    e.preventDefault();
                }
            });
        }

        if (Utils.isTouchDevice() === true) {
            element.on(Metro.events.click, ".stream", function(){
                var stream = $(this);
                stream.toggleClass("focused");
                $.each(element.find(".stream"), function () {
                    if ($(this).is(stream)) return ;
                    $(this).removeClass("focused");
                })
            })
        }
    },

    _changeURI: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var link = this.getLink();
        history.pushState({}, document.title, link);
    },

    slideTo: function(time){
        var that = this, element = this.element, o = this.options, data = this.data;
        var target;
        if (time === undefined) {
            target = $(element.find(".streamer-timeline li")[0]);
        } else {
            target = $(element.find(".streamer-timeline .js-time-point-" + time.replace(":", "-"))[0]);
        }

        element.find(".events-area").animate({
            scrollLeft: target[0].offsetLeft - element.find(".streams .stream").outerWidth()
        }, o.duration);
    },

    enableStream: function(stream){
        var that = this, element = this.element, o = this.options, data = this.data;
        var index = stream.index();
        stream.removeClass("disabled").data("streamDisabled", false);
        element.find(".stream-events").eq(index).find(".stream-event").removeClass("disabled");
    },

    disableStream: function(stream){
        var that = this, element = this.element, o = this.options, data = this.data;
        var index = stream.index();
        stream.addClass("disabled").data("streamDisabled", true);
        element.find(".stream-events").eq(index).find(".stream-event").addClass("disabled");
    },

    toggleStream: function(stream){
        if (stream.data("streamDisabled") === true) {
            this.enableStream(stream);
        } else {
            this.disableStream(stream);
        }
    },

    getLink: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var events = element.find(".stream-event");
        var a = [];
        var link;
        var origin = window.location.href;

        $.each(events, function(){
            var event = $(this);
            if (event.data("sid") === undefined || !event.hasClass("selected")) {
                return;
            }

            a.push(event.data("sid"));
        });

        link = element.attr("id") + "|" + a.join(",");

        if (o.encodeLink === true) {
            link = btoa(link);
        }

        return Utils.updateURIParameter(origin, "StreamerIDS", link);
    },

    getTimes: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var times = element.find(".streamer-timeline > li");
        var result = [];
        $.each(times, function(){
            result.push($(this).data("time"));
        });
        return result;
    },

    getEvents: function(event_type, include_global){
        var that = this, element = this.element, o = this.options, data = this.data;
        var items, events = [];

        switch (event_type) {
            case "selected": items = element.find(".stream-event.selected"); break;
            case "non-selected": items = element.find(".stream-event:not(.selected)"); break;
            default: items = element.find(".stream-event");
        }

        $.each(items, function(){
            var item = $(this);
            var origin;

            if (include_global !== true && item.parent().hasClass("global-stream")) return ;

            origin = item.data("origin");

            events.push(origin);
        });

        return events;
    },

    source: function(s){
        if (s === undefined) {
            return this.options.source;
        }

        this.options.source = s;
        this.changeSource();
    },

    data: function(s){
        if (s === undefined) {
            return this.options.source;
        }

        this.options.data = s;
        this.changeData();
    },

    getStreamerData: function(){
        return this.data;
    },

    toggleEvent: function(event){
        var that = this, element = this.element, o = this.options, data = this.data;
        event = $(event);

        if (event.hasClass("global-event") && o.selectGlobal !== true) {
            return ;
        }

        if (event.hasClass("selected")) {
            this.selectEvent(event, false);
        } else {
            this.selectEvent(event, true);
        }
    },

    selectEvent: function(event, state){
        var that = this, element = this.element, o = this.options, data = this.data;
        if (state === undefined) {
            state = true;
        }
        event = $(event);

        if (event.hasClass("global-event") && o.selectGlobal !== true) {
            return ;
        }

        if (state === true) event.addClass("selected"); else event.removeClass("selected");

        if (o.changeUri === true) {
            that._changeURI();
        }
        Utils.exec(o.onEventSelect, [event, state]);
    },

    changeSource: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var new_source = element.attr("data-source");

        if (String(new_source).trim() === "") {
            return ;
        }

        o.source = new_source;

        $.get(o.source, function(data){
            that.data = data;
            that.build();
        });

        element.trigger("sourcechanged");
    },

    changeData: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var new_data = element.attr("data-data");

        if (String(new_data).trim() === "") {
            return ;
        }

        o.data = new_data;

        this.data = JSON.parse(o.data);
        this.build();

        element.trigger("datachanged");
    },

    changeStreamSelectOption: function(){
        var that = this, element = this.element, o = this.options, data = this.data;

        o.streamSelect = element.attr("data-stream-select").toLowerCase() === "true";
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'data-source': this.changeSource(); break;
            case 'data-data': this.changeData(); break;
            case 'data-stream-select': this.changeStreamSelectOption(); break;
        }
    }
};

Metro.plugin('streamer', Streamer);

// Source: js/plugins/switch.js
var Switch = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onSwitchCreate, [this.element]);

        return this;
    },
    options: {
        caption: "",
        captionPosition: "right",
        disabled: false,
        clsElement: "",
        clsCheck: "",
        clsCaption: "",
        onSwitchCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var container = $("<label>").addClass("switch " + element[0].className);
        var check = $("<span>").addClass("check");
        var caption = $("<span>").addClass("caption").html(o.caption);

        element.attr("type", "checkbox");

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);
        check.appendTo(container);
        caption.appendTo(container);

        if (o.captionPosition === 'left') {
            container.addClass("caption-left");
        }

        element[0].className = '';

        container.addClass(o.clsElement);
        caption.addClass(o.clsCaption);
        check.addClass(o.clsCheck);

        if (o.disabled === true && element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
        }
    }
};

Metro.plugin('switch', Switch);

// Source: js/plugins/table.js
var Table = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.currentPage = 1;
        this.pagesCount = 1;
        this.filterString = "";
        this.data = null;
        this.activity = null;
        this.busy = false;
        this.filters = [];
        this.wrapperInfo = null;
        this.wrapperSearch = null;
        this.wrapperRows = null;
        this.wrapperPagination = null;
        this.filterIndex = null;
        this.filtersIndexes = null;
        this.component = null;
        this.inspector = null;
        this.view = {};
        this.viewDefault = {};
        this.locale = Metro.locales["en-US"];

        this.sort = {
            dir: "asc",
            colIndex: 0
        };

        this.service = [];
        this.heads = [];
        this.items = [];
        this.foots = [];

        this.filteredItems = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        locale: METRO_LOCALE,

        check: false,
        checkColIndex: 0,
        checkName: null,
        checkType: "checkbox",
        checkStoreKey: "TABLE:$1:KEYS",
        rownum: false,

        filter: null,
        filters: null,
        source: null,

        filterMinLength: 1,

        showRowsSteps: true,
        showSearch: true,
        showTableInfo: true,
        showPagination: true,
        paginationShortMode: true,
        showActivity: true,

        muteTable: true,

        rows: 10,
        rowsSteps: "10,25,50,100",

        viewSaveMode: "client",
        viewSavePath: "TABLE:$1:OPTIONS",

        sortDir: "asc",
        decimalSeparator: ".",
        thousandSeparator: ",",

        tableRowsCountTitle: "Show entries:",
        tableSearchTitle: "Search:",
        tableInfoTitle: "Showing $1 to $2 of $3 entries",
        paginationPrevTitle: "Prev",
        paginationNextTitle: "Next",
        allRecordsTitle: "All",
        inspectorTitle: "Inspector",

        activityType: "cycle",
        activityStyle: "color",
        activityTimeout: 100,

        searchWrapper: null,
        rowsWrapper: null,
        infoWrapper: null,
        paginationWrapper: null,

        cellWrapper: true,

        clsComponent: "",
        clsTable: "",

        clsHead: "",
        clsHeadRow: "",
        clsHeadCell: "",

        clsBody: "",
        clsBodyRow: "",
        clsBodyCell: "",

        clsFooter: "",
        clsFooterRow: "",
        clsFooterCell: "",

        clsTableTop: "",
        clsRowsCount: "",
        clsSearch: "",

        clsTableBottom: "",
        clsTableInfo: "",
        clsTablePagination: "",

        clsPagination: "",

        onDraw: Metro.noop,
        onDrawRow: Metro.noop,
        onDrawCell: Metro.noop,
        onAppendRow: Metro.noop,
        onAppendCell: Metro.noop,
        onSortStart: Metro.noop,
        onSortStop: Metro.noop,
        onSortItemSwitch: Metro.noop,
        onSearch: Metro.noop,
        onRowsCountChange: Metro.noop,
        onDataLoad: Metro.noop,
        onDataLoaded: Metro.noop,
        onFilterRowAccepted: Metro.noop,
        onFilterRowDeclined: Metro.noop,
        onCheckClick: Metro.noop,
        onCheckClickAll: Metro.noop,
        onCheckDraw: Metro.noop,
        onViewSave: Metro.noop,
        onViewGet: Metro.noop,
        onViewCreated: Metro.noop,
        onTableCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var id = Utils.elementId("table");

        if (!Utils.isValue(element.attr("id"))) {
            element.attr("id", id);
        }

        if (Utils.isValue(Metro.locales[o.locale])) {
            this.locale = Metro.locales[o.locale];
        }

        if (o.source !== null) {
            Utils.exec(o.onDataLoad, [o.source], element[0]);

            $.get(o.source, function(data){
                that._build(data);
                Utils.exec(o.onDataLoaded, [o.source, data], element[0]);
            }).fail(function( jqXHR, textStatus, errorThrown) {
                console.log(textStatus); console.log(jqXHR); console.log(errorThrown);
            });
        } else {
            that._build();
        }
    },

    _build: function(data){
        var that = this, element = this.element, o = this.options;
        var view, id = element.attr("id");

        o.rows = parseInt(o.rows);

        this.items = [];
        this.heads = [];
        this.foots = [];

        if (Utils.isValue(data)) {
            this._createItemsFromJSON(data);
        } else {
            this._createItemsFromHTML()
        }

        this.view = this._createView();
        this.viewDefault = Utils.objectClone(this.view);

        if (o.viewSaveMode.toLowerCase() === "client") {
            view = Metro.storage.getItem(o.viewSavePath.replace("$1", id));
            if (Utils.isValue(view) && Utils.objectLength(view) === Utils.objectLength(this.view)) {
                this.view = view;
                Utils.exec(o.onViewGet, [view], element[0]);
            }
            this._final();
        } else {
            $.get(
                o.viewSavePath,
                {
                    id: id
                },
                function(view){
                    if (Utils.isValue(view) && Utils.objectLength(view) === Utils.objectLength(that.view)) {
                        that.view = view;
                        Utils.exec(o.onViewGet, [view], element[0]);
                    }
                    that._final();
                }
            ).fail(function(jqXHR, textStatus) {
                that._final();
                console.log("Warning! View " + textStatus + " for table " + element.attr('id') + " ");
            });
        }
    },

    _final: function(){
        var element = this.element, o = this.options;
        var id = element.attr("id");

        Metro.storage.delItem(o.checkStoreKey.replace("$1", id));

        this._service();
        this._createStructure();
        this._createInspector();
        this._createEvents();

        Utils.exec(o.onTableCreate, [element], element[0]);
    },

    _service: function(){
        var o = this.options;
        var item_check, item_rownum;
        var service = [];

        item_rownum = {
            title: "#",
            format: undefined,
            name: undefined,
            sortable: false,
            sortDir: undefined,
            clsColumn: o.rownum !== true ? "d-none" : "",
            cls: o.rownum !== true ? "d-none" : "",
            colspan: undefined,
            type: "rownum"
        };

        item_check = {
            title: o.checkType === "checkbox" ? "<input type='checkbox' data-role='checkbox' class='table-service-check-all'>" : "",
            format: undefined,
            name: undefined,
            sortable: false,
            sortDir: undefined,
            clsColumn: o.check !== true ? "d-none" : "",
            cls: o.check !== true ? "d-none" : "",
            colspan: undefined,
            type: "rowcheck"
        };

        service.push(item_rownum);
        service.push(item_check);

        this.service = service;
    },

    _createView: function(){
        var view, o = this.options;

        view = {};

        $.each(this.heads, function(i){

            if (Utils.isValue(this.cls)) {this.cls = this.cls.replace("hidden", "");}
            if (Utils.isValue(this.clsColumn)) {this.clsColumn = this.clsColumn.replace("hidden", "");}

            view[i] = {
                "index": i,
                "index-view": i,
                "show": !Utils.isValue(this.show) ? true : this.show,
                "size": Utils.isValue(this.size) ? this.size : ""
            }
        });

        Utils.exec(o.onViewCreated, [view], view);
        return view;
    },

    _createInspector: function(){
        var that = this, o = this.options;
        var component = this.component;
        var inspector, table = $("<table>").addClass("table compact"), row, actions, tds = [], cells, j;

        inspector = $("<div data-role='draggable' data-drag-element='h3' data-drag-area='body'>").addClass("table-inspector");

        $("<h3 class='text-light'>"+o.inspectorTitle+"</h3>").appendTo(inspector);
        $("<hr class='thin bg-lightGray'>").appendTo(inspector);

        table.appendTo(inspector);

        cells = this.heads;

        for (j = 0; j < cells.length; j++){
            tds[j] = null;
        }

        $.each(cells, function(i){
            row = $("<tr>");
            row.data('index', i);
            row.data('index-view', i);
            $("<td>").html("<input type='checkbox' data-role='checkbox' name='column_show_check[]' value='"+i+"' "+(Utils.bool(that.view[i]['show']) ? "checked" : "")+">").appendTo(row);
            $("<td>").html(this.title).appendTo(row);
            $("<td>").html("<input type='number' name='column_size' value='"+that.view[i]['size']+"' data-index='"+i+"'>").appendTo(row);
            $("<td>").html("" +
                "<button class='button mini js-table-inspector-field-up' type='button'><span class='mif-arrow-up'></span></button>" +
                "<button class='button mini js-table-inspector-field-down' type='button'><span class='mif-arrow-down'></span></button>" +
                "").appendTo(row);
            tds[that.view[i]['index-view']] = row;
        });

        //
        for (j = 0; j < cells.length; j++){
            tds[j].appendTo(table);
        }

        $("<hr class='thin bg-lightGray'>").appendTo(inspector);
        actions = $("<div class='inspector-actions'>").appendTo(inspector);
        $("<button class='button primary js-table-inspector-save' type='button'>").html(this.locale.buttons.save).appendTo(actions);
        $("<button class='button secondary js-table-inspector-reset ml-2 mr-2' type='button'>").html(this.locale.buttons.reset).appendTo(actions);
        $("<button class='button link js-table-inspector-cancel place-right' type='button'>").html(this.locale.buttons.cancel).appendTo(actions);

        this.inspector = inspector;

        component.append(inspector);

        this._createInspectorEvents();
    },

    _resetInspector: function(){
        var that = this;
        var inspector = this.inspector;
        var table = inspector.find("table");
        var tds = [], cells, j, row;
        var view = this.view;

        table.html("");
        cells = this.heads;

        for (j = 0; j < cells.length; j++){
            tds[j] = null;
        }

        $.each(cells, function(i){
            row = $("<tr>");
            row.data('index', i);
            row.data('index-view', i);
            $("<td>").html("<input type='checkbox' data-role='checkbox' name='column_show_check[]' value='"+i+"' "+(Utils.bool(view[i]['show']) ? "checked" : "")+">").appendTo(row);
            $("<td>").html(this.title).appendTo(row);
            $("<td>").html("<input type='number' name='column_size' value='"+view[i]['size']+"' data-index='"+i+"'>").appendTo(row);
            $("<td>").html("" +
                "<button class='button mini js-table-inspector-field-up' type='button'><span class='mif-arrow-up'></span></button>" +
                "<button class='button mini js-table-inspector-field-down' type='button'><span class='mif-arrow-down'></span></button>" +
                "").appendTo(row);
            tds[view[i]['index-view']] = row;
        });

        //
        for (j = 0; j < cells.length; j++){
            tds[j].appendTo(table);
        }

        this._createInspectorEvents();
    },

    _createHeadsFormHTML: function(){
        var that = this, element = this.element;
        var head = element.find("thead");

        if (head.length > 0) $.each(head.find("tr > *"), function(){
            var item = $(this);
            var dir, head_item, item_class;

            if (item.hasClass("sort-asc")) {
                dir = "asc";
            } else if (item.hasClass("sort-desc")) {
                dir = "desc"
            } else {
                dir = undefined;
            }

            item_class = item[0].className.replace("sortable-column", "");
            item_class = item_class.replace("sort-asc", "");
            item_class = item_class.replace("sort-desc", "");

            head_item = {
                title: item.html(),
                format: Utils.isValue(item.data("format")) ? item.data("format") : undefined,
                name: Utils.isValue(item.data("name")) ? item.data("name") : undefined,
                sortable: item.hasClass("sortable-column"),
                sortDir: dir,
                clsColumn: Utils.isValue(item.data("cls-column")) ? item.data("cls-column") : "",
                cls: item_class,
                colspan: item.attr("colspan"),
                type: "data",
                size: Utils.isValue(item.data("size")) ? item.data("size") : ""
            };
            that.heads.push(head_item);
        });
    },

    _createFootsFromHTML: function(){
        var that = this, element = this.element;
        var foot = element.find("tfoot");

        if (foot.length > 0) $.each(foot.find("tr > *"), function(){
            var item = $(this);
            var foot_item;

            foot_item = {
                title: item.html(),
                name: Utils.isValue(item.data("name")) ? item.data("name") : false,
                cls: item[0].className,
                colspan: item.attr("colspan")
            };

            that.foots.push(foot_item);
        });
    },

    _createItemsFromHTML: function(){
        var that = this, element = this.element;
        var body = element.find("tbody");

        if (body.length > 0) $.each(body.find("tr"), function(){
            var row = $(this);
            var tr = [];
            $.each(row.children("td"), function(){
                var td = $(this);
                tr.push(td.html());
            });
            that.items.push(tr);
        });

        this._createHeadsFormHTML();
        this._createFootsFromHTML();
    },

    _createItemsFromJSON: function(source){
        var that = this;

        if (source.header !== undefined) {
            that.heads = source.header;
        } else {
            this._createHeadsFormHTML();
        }

        if (source.data !== undefined) {
            $.each(source.data, function(){
                var row = this;
                var tr = [];
                $.each(row, function(){
                    var td = this;
                    tr.push(td);
                });
                that.items.push(tr);
            });
        }

        if (source.footer !== undefined) {
            this.foots = source.footer;
        } else {
            this._createFootsFromHTML();
        }
    },

    _createTableHeader: function(){
        var element = this.element, o = this.options;
        var head = $("<thead>").html('');
        var tr, th, tds = [], j, cells;
        var view = this.view;

        element.find("thead").remove();

        head.addClass(o.clsHead);

        if (this.heads.length === 0) {
            return head;
        }

        tr = $("<tr>").addClass(o.clsHeadRow).appendTo(head);

        $.each(this.service, function(){
            var item = this, classes = [];
            th = $("<th>").appendTo(tr);
            if (Utils.isValue(item.title)) {th.html(item.title);}
            if (Utils.isValue(item.size)) {th.css({width: item.size});}
            if (Utils.isValue(item.cls)) {classes.push(item.cls);}
            if (item.type === 'rowcheck') {classes.push("check-cell");}
            if (item.type === 'rownum') {classes.push("rownum-cell");}
            classes.push(o.clsHeadCell);
            th.addClass(classes.join(" "));
        });

        cells = this.heads;

        for (j = 0; j < cells.length; j++){
            tds[j] = null;
        }

        $.each(cells, function(cell_index){
            var item = this;
            var classes = [];

            th = $("<th>");
            th.data("index", cell_index);

            if (Utils.isValue(item.title)) {th.html(item.title);}
            if (Utils.isValue(item.format)) {th.attr("data-format", item.format);}
            if (Utils.isValue(item.name)) {th.attr("data-name", item.name);}
            if (Utils.isValue(item.colspan)) {th.attr("colspan", item.colspan);}
            if (Utils.isValue(view[cell_index]['size'])) {th.css({
                    width: view[cell_index]['size']
                })
            }
            if (item.sortable === true) {
                classes.push("sortable-column");

                if (Utils.isValue(item.sortDir)) {
                    classes.push("sort-" + item.sortDir);
                }
            }
            if (Utils.isValue(item.cls)) {classes.push(item.cls);}
            if (Utils.bool(view[cell_index]['show']) === false) {
                classes.push("hidden");
            }

            if (item.type === 'rowcheck') {classes.push("check-cell");}
            if (item.type === 'rownum') {classes.push("rownum-cell");}

            classes.push(o.clsHeadCell);

            if (Utils.bool(view[cell_index]['show'])) {
                Utils.arrayDelete(classes, "hidden");
            }

            th.addClass(classes.join(" "));

            tds[view[cell_index]['index-view']] = th;
        });

        for (j = 0; j < cells.length; j++){
            tds[j].appendTo(tr);
        }

        element.prepend(head);
    },

    _createTableBody: function(){
        var body, head, element = this.element;

        head  = element.find("thead");
        element.find("tbody").remove();
        body = $("<tbody>").addClass(this.options.clsBody);
        body.insertAfter(head);
    },

    _createTableFooter: function(){
        var element = this.element, o = this.options;
        var foot = $("<tfoot>").addClass(o.clsFooter);
        var tr, th;

        element.find("tfoot").remove();

        if (this.foots.length === 0) {
            element.append(foot);
            return;
        }

        tr = $("<tr>").addClass(o.clsHeadRow).appendTo(foot);
        $.each(this.foots, function(){
            var item = this;
            th = $("<th>").appendTo(tr);

            if (item.title !== undefined) {
                th.html(item.title);
            }

            if (item.name !== undefined) {
                th.addClass("foot-column-name-" + item.name);
            }

            if (item.cls !== undefined) {
                th.addClass(item.cls);
            }

            if (Utils.isValue(item.colspan)) {
                th.attr("colspan", item.colspan);
            }

            th.appendTo(tr);
        });

        element.append(foot);
    },

    _createTopBlock: function (){
        var that = this, element = this.element, o = this.options;
        var top_block = $("<div>").addClass("table-top").addClass(o.clsTableTop).insertBefore(element);
        var search_block, search_input, rows_block, rows_select;

        search_block = Utils.isValue(this.wrapperSearch) ? this.wrapperSearch : $("<div>").addClass("table-search-block").addClass(o.clsSearch).appendTo(top_block);

        search_input = $("<input>").attr("type", "text").appendTo(search_block);
        search_input.input({
            prepend: o.tableSearchTitle
        });

        if (o.showSearch !== true) {
            search_block.hide();
        }

        rows_block = Utils.isValue(this.wrapperRows) ? this.wrapperRows : $("<div>").addClass("table-rows-block").addClass(o.clsRowsCount).appendTo(top_block);

        rows_select = $("<select>").appendTo(rows_block);
        $.each(Utils.strToArray(o.rowsSteps), function () {
            var val = parseInt(this);
            var option = $("<option>").attr("value", val).text(val === -1 ? o.allRecordsTitle : val).appendTo(rows_select);
            if (val === parseInt(o.rows)) {
                option.attr("selected", "selected");
            }
        });
        rows_select.select({
            filter: false,
            prepend: o.tableRowsCountTitle,
            onChange: function (val) {
                val = parseInt(val);
                if (val === parseInt(o.rows)) {
                    return;
                }
                o.rows = val;
                that.currentPage = 1;
                that._draw();
                Utils.exec(o.onRowsCountChange, [val], element[0])
            }
        });

        if (o.showRowsSteps !== true) {
            rows_block.hide();
        }

        return top_block;
    },

    _createBottomBlock: function (){
        var element = this.element, o = this.options;
        var bottom_block = $("<div>").addClass("table-bottom").addClass(o.clsTableBottom).insertAfter(element);
        var info, pagination;

        info = $("<div>").addClass("table-info").addClass(o.clsTableInfo).appendTo(bottom_block);
        if (o.showTableInfo !== true) {
            info.hide();
        }

        pagination = $("<div>").addClass("table-pagination").addClass(o.clsTablePagination).appendTo(bottom_block);
        if (o.showPagination !== true) {
            pagination.hide();
        }

        return bottom_block;
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var table_component, columns;
        var w_search = $(o.searchWrapper), w_info = $(o.infoWrapper), w_rows = $(o.rowsWrapper), w_paging = $(o.paginationWrapper);

        if (w_search.length > 0) {this.wrapperSearch = w_search;}
        if (w_info.length > 0) {this.wrapperInfo = w_info;}
        if (w_rows.length > 0) {this.wrapperRows = w_rows;}
        if (w_paging.length > 0) {this.wrapperPagination = w_paging;}

        if (!element.parent().hasClass("table-component")) {
            table_component = $("<div>").addClass("table-component").insertBefore(element);
            element.appendTo(table_component);
        } else {
            table_component = element.parent();
        }

        table_component.addClass(o.clsComponent);

        this.activity =  $("<div>").addClass("table-progress").appendTo(table_component);
        $("<div>").activity({
            type: o.activityType,
            style: o.activityStyle
        }).appendTo(this.activity);

        if (o.showActivity !== true) {
            this.activity.css({
                visibility: "hidden"
            })
        }

        element.html("").addClass(o.clsTable);

        this._createTableHeader();
        this._createTableBody();
        this._createTableFooter();

        this._createTopBlock();
        this._createBottomBlock();

        var need_sort = false;
        if (this.heads.length > 0) $.each(this.heads, function(i){
            var item = this;
            if (!need_sort && ["asc", "desc"].indexOf(item.sortDir) > -1) {
                need_sort = true;
                that.sort.colIndex = i;
                that.sort.dir = item.sortDir;
            }
        });

        if (need_sort) {
            columns = element.find("thead th");
            this._resetSortClass(columns);
            $(columns.get(this.sort.colIndex + that.service.length)).addClass("sort-"+this.sort.dir);
            this.sorting();
        }

        var filter_func;

        if (Utils.isValue(o.filter)) {
            filter_func = Utils.isFunc(o.filter);
            if (filter_func === false) {
                filter_func = Utils.func(o.filter);
            }
            that.filterIndex = that.addFilter(filter_func);
        }

        if (Utils.isValue(o.filters)) {
            $.each(Utils.strToArray(o.filters), function(){
                filter_func = Utils.isFunc(this);
                if (filter_func !== false) {
                    that.filtersIndexes.push(that.addFilter(filter_func));
                }
            });
        }

        this.currentPage = 1;

        this.component = table_component;
        this._draw();
    },

    _resetSortClass: function(el){
        $(el).removeClass("sort-asc sort-desc");
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var component = element.parent();
        var search = component.find(".table-search-block input");
        var customSearch;
        var id = element.attr("id");

        element.on(Metro.events.click, ".sortable-column", function(){

            if (o.muteTable === true) element.addClass("disabled");

            if (that.busy) {
                return false;
            }
            that.busy = true;

            var col = $(this);

            that.activity.show(o.activityTimeout, function(){
                that.currentPage = 1;
                that.sort.colIndex = col.data("index");
                if (!col.has("sort-asc") && !col.hasClass("sort-desc")) {
                    that.sort.dir = o.sortDir;
                } else {
                    if (col.hasClass("sort-asc")) {
                        that.sort.dir = "desc";
                    } else {
                        that.sort.dir = "asc";
                    }
                }
                that._resetSortClass(element.find(".sortable-column"));
                col.addClass("sort-"+that.sort.dir);
                that.sorting();
                that._draw(function(){
                    that.busy = false;
                    if (o.muteTable === true) element.removeClass("disabled");
                });
            });
        });

        element.on(Metro.events.click, ".table-service-check input", function(){
            var check = $(this);
            var status = check.is(":checked");
            var val = ""+check.val();
            var store_key = o.checkStoreKey.replace("$1", id);
            var storage = Metro.storage;
            var data = storage.getItem(store_key);

            if (status) {
                if (!Utils.isValue(data)) {
                    data = [val];
                } else {
                    if (Array(data).indexOf(val) === -1) {
                        data.push(val);
                    }
                }
            } else {
                if (Utils.isValue(data)) {
                    Utils.arrayDelete(data, val);
                } else {
                    data = [];
                }
            }

            storage.setItem(store_key, data);

            Utils.exec(o.onCheckClick, [status], this);
        });

        element.on(Metro.events.click, ".table-service-check-all input", function(){
            var status = $(this).is(":checked");
            var store_key = o.checkStoreKey.replace("$1", id);
            var data = [];

            if (status) {
                $.each(that.filteredItems, function(){
                    if (data.indexOf(this[o.checkColIndex]) !== -1) return ;
                    data.push(""+this[o.checkColIndex]);
                });
            } else {
                data = [];
            }

            Metro.storage.setItem(store_key, data);

            that._draw();

            Utils.exec(o.onCheckClickAll, [status], this);
        });

        var _search = function(){
            that.filterString = this.value.trim().toLowerCase();
            if (that.filterString[that.filterString.length - 1] === ":") {
                return ;
            }
            that.currentPage = 1;
            that._draw();
        };

        search.on(Metro.events.inputchange, _search);

        if (Utils.isValue(this.wrapperSearch)) {
            customSearch = this.wrapperSearch.find("input");
            if (customSearch.length > 0) {
                customSearch.on(Metro.events.inputchange, _search);
            }
        }

        function pageLinkClick(l){
            var link = $(l);
            var item = link.parent();

            if (item.hasClass("active")) {
                return ;
            }

            if (item.hasClass("service")) {
                if (link.data("page") === "prev") {
                    that.currentPage--;
                    if (that.currentPage === 0) {
                        that.currentPage = 1;
                    }
                } else {
                    that.currentPage++;
                    if (that.currentPage > that.pagesCount) {
                        that.currentPage = that.pagesCount;
                    }
                }
            } else {
                that.currentPage = link.data("page");
            }

            that._draw();
        }

        component.on(Metro.events.click, ".pagination .page-link", function(){
            pageLinkClick(this)
        });

        if (Utils.isValue(this.wrapperPagination)) {
            this.wrapperPagination.on(Metro.events.click, ".pagination .page-link", function(){
                pageLinkClick(this)
            });
        }

        this._createInspectorEvents();
    },

    _createInspectorEvents: function(){
        var that = this, inspector = this.inspector;
        // Inspector event

        this._removeInspectorEvents();

        inspector.on(Metro.events.click, ".js-table-inspector-field-up", function(){
            var button = $(this), tr = button.closest("tr");
            var tr_prev = tr.prev("tr");
            var index = tr.data("index");
            var index_view;
            if (tr_prev.length === 0) {
                return ;
            }
            tr.insertBefore(tr_prev);
            tr.addClass("flash");
            setTimeout(function(){
                tr.removeClass("flash");
            }, 1000);
            index_view = tr.index();

            tr.data("index-view", index_view);
            that.view[index]['index-view'] = index_view;

            $.each(tr.nextAll(), function(){
                var t = $(this);
                index_view++;
                t.data("index-view", index_view);
                that.view[t.data("index")]['index-view'] = index_view;
            });

            that._createTableHeader();
            that._draw();
        });

        inspector.on(Metro.events.click, ".js-table-inspector-field-down", function(){
            var button = $(this), tr = button.closest("tr");
            var tr_next = tr.next("tr");
            var index = tr.data("index");
            var index_view;
            if (tr_next.length === 0) {
                return ;
            }
            tr.insertAfter(tr_next);
            tr.addClass("flash");
            setTimeout(function(){
                tr.removeClass("flash");
            }, 1000);
            index_view = tr.index();

            tr.data("index-view", index_view);
            that.view[index]['index-view'] = index_view;

            $.each(tr.prevAll(), function(){
                var t = $(this);
                index_view--;
                t.data("index-view", index_view);
                that.view[t.data("index")]['index-view'] = index_view;
            });

            that._createTableHeader();
            that._draw();
        });

        inspector.on(Metro.events.click, "input[type=checkbox]", function(){
            var check = $(this);
            var status = check.is(":checked");
            var index = check.val();
            var op = ['cls', 'clsColumn'];

            if (status) {
                $.each(op, function(){
                    var a;
                    a = Utils.isValue(that.heads[index][this]) ? Utils.strToArray(that.heads[index][this]) : [];
                    Utils.arrayDelete(a, "hidden");
                    that.heads[index][this] = a.join(" ");
                    that.view[index]['show'] = true;
                });
            } else {
                $.each(op, function(){
                    var a;

                    a = Utils.isValue(that.heads[index][this]) ? Utils.strToArray(that.heads[index][this]) : [];
                    if (a.indexOf("hidden") === -1) {
                        a.push("hidden");
                    }
                    that.heads[index][this] = a.join(" ");
                    that.view[index]['show'] = false;
                });
            }

            that._createTableHeader();
            that._draw();
        });

        inspector.find("input[type=number]").on(Metro.events.inputchange, function(){
            var input = $(this);
            var index = input.attr("data-index");
            var val = parseInt(input.val());

            that.view[index]['size'] = val === 0 ? "" : val;

            that._createTableHeader();
        });

        inspector.on(Metro.events.click, ".js-table-inspector-save", function(){
            that._saveTableView();
            that.openInspector(false);
        });

        inspector.on(Metro.events.click, ".js-table-inspector-cancel", function(){
            that.openInspector(false);
        });

        inspector.on(Metro.events.click, ".js-table-inspector-reset", function(e){
            that.resetView();
        });
    },

    _removeInspectorEvents: function(){
        var inspector = this.inspector;
        inspector.off(Metro.events.click, ".js-table-inspector-field-up");
        inspector.off(Metro.events.click, ".js-table-inspector-field-down");
        inspector.off(Metro.events.click, "input[type=checkbox]");
        inspector.off(Metro.events.click, ".js-table-inspector-save");
        inspector.off(Metro.events.click, ".js-table-inspector-cancel");
        inspector.off(Metro.events.click, ".js-table-inspector-reset");
        inspector.find("input[type=number]").off(Metro.events.inputchange);
    },

    _saveTableView: function(){
        var element = this.element, o = this.options;
        var view = this.view;
        var id = element.attr("id");

        if (o.viewSaveMode.toLowerCase() === "client") {
            Metro.storage.setItem(o.viewSavePath.replace("$1", id), view);
            Utils.exec(o.onViewSave, [o.viewSavePath, view], element[0]);
        } else {
            $.post(
                o.viewSavePath,
                {
                    id : element.attr("id"),
                    view : view
                },
                function(data, status, xhr){
                    Utils.exec(o.onViewSave, [o.viewSavePath, view, data, status, xhr], element[0]);
                }
            );
        }
    },

    _info: function(start, stop, length){
        var element = this.element, o = this.options;
        var component = element.parent();
        var info = Utils.isValue(this.wrapperInfo) ? this.wrapperInfo : component.find(".table-info");
        var text;

        if (info.length === 0) {
            return ;
        }

        if (stop > length) {
            stop = length;
        }

        if (this.items.length === 0) {
            start = stop = length = 0;
        }

        text = o.tableInfoTitle;
        text = text.replace("$1", start);
        text = text.replace("$2", stop);
        text = text.replace("$3", length);
        info.html(text);
    },

    _paging: function(length){
        var that = this, element = this.element, o = this.options;
        var component = element.parent();
        var pagination_wrapper = Utils.isValue(this.wrapperPagination) ? this.wrapperPagination : component.find(".table-pagination");
        var i, prev, next;
        var shortDistance = 5;
        var pagination;

        pagination_wrapper.html("");

        pagination = $("<ul>").addClass("pagination").addClass(o.clsPagination).appendTo(pagination_wrapper);

        if (this.items.length === 0) {
            return ;
        }

        if (o.rows === -1) {
            return ;
        }

        this.pagesCount = Math.ceil(length / o.rows);

        var add_item = function(item_title, item_type, data){
            var li, a;

            li = $("<li>").addClass("page-item").addClass(item_type);
            a  = $("<a>").addClass("page-link").html(item_title);
            a.data("page", data);
            a.appendTo(li);

            return li;
        };

        prev = add_item(o.paginationPrevTitle, "service prev-page", "prev");
        pagination.append(prev);

        pagination.append(add_item(1, that.currentPage === 1 ? "active" : "", 1));

        if (o.paginationShortMode !== true || this.pagesCount <= 7) {
            for (i = 2; i < this.pagesCount; i++) {
                pagination.append(add_item(i, i === that.currentPage ? "active" : "", i));
            }
        } else {
            if (that.currentPage < shortDistance) {
                for (i = 2; i <= shortDistance; i++) {
                    pagination.append(add_item(i, i === that.currentPage ? "active" : "", i));
                }

                if (this.pagesCount > shortDistance) {
                    pagination.append(add_item("...", "no-link", null));
                }
            } else if (that.currentPage <= that.pagesCount && that.currentPage > that.pagesCount - shortDistance + 1) {
                if (this.pagesCount > shortDistance) {
                    pagination.append(add_item("...", "no-link", null));
                }

                for (i = that.pagesCount - shortDistance + 1; i < that.pagesCount; i++) {
                    pagination.append(add_item(i, i === that.currentPage ? "active" : "", i));
                }
            } else {
                pagination.append(add_item("...", "no-link", null));

                pagination.append(add_item(that.currentPage - 1, "", that.currentPage - 1));
                pagination.append(add_item(that.currentPage, "active", that.currentPage));
                pagination.append(add_item(that.currentPage + 1, "", that.currentPage + 1));

                pagination.append(add_item("...", "no-link", null));
            }
        }

        if (that.pagesCount > 1 || that.currentPage < that.pagesCount) pagination.append(add_item(that.pagesCount, that.currentPage === that.pagesCount ? "active" : "", that.pagesCount));

        next = add_item(o.paginationNextTitle, "service next-page", "next");
        pagination.append(next);

        if (this.currentPage === 1) {
            prev.addClass("disabled");
        }

        if (this.currentPage === this.pagesCount) {
            next.addClass("disabled");
        }
    },

    _filter: function(){
        var that = this, o = this.options, element = this.element;
        var items, flt, idx = -1, i;
        if ((Utils.isValue(this.filterString) && that.filterString.length >= o.filterMinLength) || this.filters.length > 0) {
            flt = this.filterString.split(":");
            if (flt.length > 1) {
                $.each(that.heads, function (i, v) {
                    if (flt[0] === v.title.toLowerCase()) {
                        idx = i;
                    }
                })
            }
            items = this.items.filter(function(row){
                var row_data = "" + (flt.length > 1 && idx > -1 ? row[idx] : row.join());
                var c1 = row_data.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim().toLowerCase();
                var result = Utils.isValue(that.filterString) && that.filterString.length >= o.filterMinLength ? ~c1.indexOf(flt.length > 1 ? flt[1] : flt[0]) : true;

                if (result === true && that.filters.length > 0) {
                    for (i = 0; i < that.filters.length; i++) {
                        if (!Utils.isValue(that.filters[i])) continue;
                        if (Utils.exec(that.filters[i], [row, that.heads]) !== true) {
                            result = false;
                            break;
                        }
                    }
                }

                if (result) {
                    Utils.exec(o.onFilterRowAccepted, [row], element[0]);
                } else {
                    Utils.exec(o.onFilterRowDeclined, [row], element[0]);
                }

                return result;
            });

            Utils.exec(o.onSearch, [that.filterString, items], element[0])
        } else {
            items = this.items;
        }

        this.filteredItems = items;

        return items;
    },

    _draw: function(cb){
        var that = this, element = this.element, o = this.options;
        var body = element.find("tbody");
        var i;
        var start = parseInt(o.rows) === -1 ? 0 : o.rows * (this.currentPage - 1),
            stop = parseInt(o.rows) === -1 ? this.items.length - 1 : start + o.rows - 1;
        var items;
        var stored_keys = Metro.storage.getItem(o.checkStoreKey.replace("$1", element.attr('id')));
        var view = this.view;

        body.html("");

        items = this._filter();

        for (i = start; i <= stop; i++) {
            var j, tr, td, check, cells = [], tds = [];
            if (Utils.isValue(items[i])) {
                tr = $("<tr>").addClass(o.clsBodyRow);

                // Rownum
                td = $("<td>").html(i + 1);
                if (that.service[0].clsColumn !== undefined) {
                    td.addClass(that.service[0].clsColumn);
                }
                td.appendTo(tr);

                // Checkbox
                td = $("<td>");
                if (o.checkType === "checkbox") {
                    check = $("<input type='checkbox' data-role='checkbox' name='" + (Utils.isValue(o.checkName) ? o.checkName : 'table_row_check') + "[]' value='" + items[i][o.checkColIndex] + "'>");
                } else {
                    check = $("<input type='radio' data-role='radio' name='" + (Utils.isValue(o.checkName) ? o.checkName : 'table_row_check') + "' value='" + items[i][o.checkColIndex] + "'>");
                }

                if (Utils.isValue(stored_keys) && Array.isArray(stored_keys) && stored_keys.indexOf(""+items[i][o.checkColIndex]) > -1) {
                    check.prop("checked", true);
                }

                check.addClass("table-service-check");
                Utils.exec(o.onCheckDraw, [check], check[0]);
                check.appendTo(td);
                if (that.service[1].clsColumn !== undefined) {
                    td.addClass(that.service[1].clsColumn);
                }
                td.appendTo(tr);

                cells = items[i];

                for (j = 0; j < cells.length; j++){
                    tds[j] = null;
                }

                $.each(cells, function(cell_index){
                    var cell_wrapper;
                    if (o.cellWrapper === true) {
                        td = $("<td>");
                        cell_wrapper = $("<div>").addClass("cell-wrapper").html(this).appendTo(td);
                    } else {
                        td = $("<td>").html(this);
                    }
                    td.addClass(o.clsBodyCell);
                    if (Utils.isValue(that.heads[cell_index].clsColumn)) {
                        td.addClass(that.heads[cell_index].clsColumn);
                    }

                    if (Utils.bool(view[cell_index].show) === false) {
                        td.addClass("hidden");
                    }

                    if (Utils.bool(view[cell_index].show)) {
                        td.removeClass("hidden");
                    }

                    tds[view[cell_index]['index-view']] = td;
                    Utils.exec(o.onDrawCell, [td, this, cell_index, that.heads[cell_index]], td[0]);
                });

                for (j = 0; j < cells.length; j++){
                    tds[j].appendTo(tr);
                    Utils.exec(o.onAppendCell, [tds[j], tr, j, element], tds[j][0])
                }

                Utils.exec(o.onDrawRow, [tr, that.view, that.heads, element], tr[0]);

                tr.appendTo(body);

                Utils.exec(o.onAppendRow, [tr, element], tr[0]);
            }
        }

        this._info(start + 1, stop + 1, items.length);
        this._paging(items.length);

        if (this.activity) this.activity.hide();

        Utils.exec(o.onDraw, [element], element[0]);

        if (cb !== undefined) {
            Utils.exec(cb, [element], element[0])
        }
    },

    _getItemContent: function(row){

        // console.log(this.sort);

        var result, col = row[this.sort.colIndex];
        var format = this.heads[this.sort.colIndex].format;
        var formatMask = this.heads[this.sort.colIndex].formatMask;
        var o = this.options;

        result = (""+col).toLowerCase().replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

        if (Utils.isValue(format)) {

            if (['number', 'int', 'float', 'money'].indexOf(format) !== -1 && (o.thousandSeparator !== "," || o.decimalSeparator !== "." )) {
                result = Utils.parseNumber(result, o.thousandSeparator, o.decimalSeparator);
            }

            switch (format) {
                case "date": result = Utils.isValue(formatMask) ? result.toDate(formatMask) : new Date(result); break;
                case "number": result = Number(result); break;
                case "int": result = parseInt(result); break;
                case "float": result = parseFloat(result); break;
                case "money": result = Utils.parseMoney(result); break;
            }
        }

        return result;
    },

    draw: function(){
        return this._draw();
    },

    sorting: function(dir){
        var that = this, element = this.element, o = this.options;

        if (Utils.isValue(dir)) {
            this.sort.dir = dir;
        }

        Utils.exec(o.onSortStart, [this.items], element[0]);

        this.items.sort(function(a, b){
            var c1 = that._getItemContent(a);
            var c2 = that._getItemContent(b);
            var result = 0;

            if (c1 < c2) {
                result = that.sort.dir === "asc" ? -1 : 1;
            }
            if (c1 > c2) {
                result = that.sort.dir === "asc" ? 1 : -1;
            }

            if (result !== 0) {
                Utils.exec(o.onSortItemSwitch, [a, b, result], element[0]);
            }

            return result;
        });

        Utils.exec(o.onSortStop, [this.items], element[0]);
    },

    filter: function(val){
        this.filterString = val.trim().toLowerCase();
        this.currentPage = 1;
        this._draw();
    },

    loadData: function(source, review){
        var that = this, element = this.element, o = this.options;
        var need_sort = false;
        var sortable_columns;

        function redraw(){

            if (review === true) {
                that.view = that._createView();
            }

            that._createTableHeader();
            that._createTableBody();
            that._createTableFooter();

            if (that.heads.length > 0) $.each(that.heads, function(i){
                var item = this;
                if (!need_sort && ["asc", "desc"].indexOf(item.sortDir) > -1) {
                    need_sort = true;
                    that.sort.colIndex = i;
                    that.sort.dir = item.sortDir;
                }
            });

            if (need_sort) {
                sortable_columns = element.find(".sortable-column");
                that._resetSortClass(sortable_columns);
                $(sortable_columns.get(that.sort.colIndex)).addClass("sort-"+that.sort.dir);
                that.sorting();
            }

            that.currentPage = 1;

            that._draw();
        }

        element.html("");

        if (!Utils.isValue(source)) {

            // this._createItemsFromHTML();
            redraw();

        } else {
            o.source = source;

            Utils.exec(o.onDataLoad, [o.source], element[0]);

            $.get(o.source, function(data){

                that.items = [];
                that.heads = [];
                that.foots = [];

                that._createItemsFromJSON(data);

                redraw();

                Utils.exec(o.onDataLoaded, [o.source, data], element[0]);
            }).fail(function( jqXHR, textStatus, errorThrown) {
                console.log(textStatus); console.log(jqXHR); console.log(errorThrown);
            });
        }
    },

    reload: function(review){
        this.loadData(this.options.source, review);
    },

    next: function(){
        if (this.items.length === 0) return ;
        this.currentPage++;
        if (this.currentPage > this.pagesCount) {
            this.currentPage = this.pagesCount;
            return ;
        }
        this._draw();
    },

    prev: function(){
        if (this.items.length === 0) return ;
        this.currentPage--;
        if (this.currentPage === 0) {
            this.currentPage = 1;
            return ;
        }
        this._draw();
    },

    first: function(){
        if (this.items.length === 0) return ;
        this.currentPage = 1;
        this._draw();
    },

    last: function(){
        if (this.items.length === 0) return ;
        this.currentPage = this.pagesCount;
        this._draw();
    },

    page: function(num){
        if (num <= 0) {
            num = 1;
        }

        if (num > this.pagesCount) {
            num = this.pagesCount;
        }

        this.currentPage = num;
        this._draw();
    },

    addFilter: function(f, redraw){
        var func = Utils.isFunc(f);
        if (func === false) {
            return ;
        }
        this.filters.push(func);

        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }

        return this.filters.length - 1;
    },

    removeFilter: function(key, redraw){
        this.filters[key] = null;
        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }
        return this;
    },

    removeFilters: function(redraw){
        this.filters = [];
        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }
    },

    getItems: function(){
        return this.items;
    },

    getHeads: function(){
        return this.heads;
    },

    getView: function(){
        return this.view;
    },

    getFilteredItems: function(){
        return this.filteredItems.length > 0 ? this.filteredItems : this.items;
    },

    getSelectedItems: function(){
        var element = this.element, o = this.options;
        var stored_keys = Metro.storage.getItem(o.checkStoreKey.replace("$1", element.attr("id")));
        var selected = [];

        if (!Utils.isValue(stored_keys)) {
            return [];
        }

        $.each(this.items, function(){
            if (stored_keys.indexOf(""+this[o.checkColIndex]) !== -1) {
                selected.push(this);
            }
        });
        return selected;
    },

    getStoredKeys: function(){
        var element = this.element, o = this.options;
        return Metro.storage.getItem(o.checkStoreKey.replace("$1", element.attr("id")), []);
    },

    clearSelected: function(redraw){
        var element = this.element, o = this.options;
        Metro.storage.setItem(o.checkStoreKey.replace("$1", element.attr("id")), []);
        element.find("table-service-check-all input").prop("checked", false);
        if (redraw === true) this._draw();
    },

    getFilters: function(){
        return this.filters;
    },

    getFilterIndex: function(){
        return this.filterIndex;
    },

    getFiltersIndexes: function(){
        return this.filtersIndexes;
    },

    openInspector: function(mode){
        this.inspector[mode ? "addClass" : "removeClass"]("open");
    },

    toggleInspector: function(){
        this.inspector.toggleClass("open");
    },

    resetView: function(){

        this.view = this._createView();

        this._createTableHeader();
        this._createTableFooter();
        this._draw();

        this._resetInspector();
        this._saveTableView();
    },

    export: function(to, mode, filename, options){
        var that = this, o = this.options;
        var table = document.createElement("table");
        var head = $("<thead>").appendTo(table);
        var body = $("<tbody>").appendTo(table);
        var i, j, cells, tds = [], items, tr, td;
        var start, stop;

        mode = Utils.isValue(mode) ? mode.toLowerCase() : "all-filtered";
        filename = Utils.isValue(filename) ? filename : Utils.elementId("table")+"-export.csv";

        // Create table header
        tr = $("<tr>");
        cells = this.heads;

        for (j = 0; j < cells.length; j++){
            tds[j] = null;
        }

        $.each(cells, function(cell_index){
            var item = this;
            if (Utils.bool(that.view[cell_index]['show']) === false) {
                return ;
            }
            td = $("<th>");
            if (Utils.isValue(item.title)) {
                td.html(item.title);
            }
            tds[that.view[cell_index]['index-view']] = td;
        });

        for (j = 0; j < cells.length; j++){
            if (Utils.isValue(tds[j])) tds[j].appendTo(tr);
        }
        tr.appendTo(head);

        // Create table data
        if (mode === "checked") {
            items = this.getSelectedItems();
            start = 0; stop = items.length - 1;
        } else if (mode === "view") {
            items = this._filter();
            start = parseInt(o.rows) === -1 ? 0 : o.rows * (this.currentPage - 1);
            stop = parseInt(o.rows) === -1 ? items.length - 1 : start + o.rows - 1;
        } else if (mode === "all") {
            items = this.items;
            start = 0; stop = items.length - 1;
        } else {
            items = this._filter();
            start = 0; stop = items.length - 1;
        }

        for (i = start; i <= stop; i++) {
            if (Utils.isValue(items[i])) {
                tr = $("<tr>");

                cells = items[i];

                for (j = 0; j < cells.length; j++){
                    tds[j] = null;
                }

                $.each(cells, function(cell_index){
                    if (Utils.bool(that.view[cell_index].show) === false) {
                        return ;
                    }
                    td = $("<td>").html(this);
                    tds[that.view[cell_index]['index-view']] = td;
                });

                for (j = 0; j < cells.length; j++){
                    if (Utils.isValue(tds[j])) tds[j].appendTo(tr);
                }

                tr.appendTo(body);
            }
        }

        switch (to) {
            default: Export.tableToCSV(table, filename, options);
        }
        table.remove();
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('table', Table);

// Source: js/plugins/tabs.js
var Tabs = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this._targets = [];

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onTabsCreate, [this.element], this.elem);

        return this;
    },

    options: {
        expand: null,
        tabsPosition: "top",

        clsTabs: "",
        clsTabsList: "",
        clsTabsListItem: "",

        onTab: Metro.noop,
        onBeforeTab: Metro.noop_true,
        onTabsCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var tab = element.find(".active").length > 0 ? $(element.find(".active")[0]) : undefined;

        this._createStructure();
        this._createEvents();
        this._open(tab);
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var right_parent = parent.hasClass("tabs");
        var container = right_parent ? parent : $("<div>").addClass("tabs tabs-wrapper");
        var expandTitle, hamburger;

        if (Utils.isValue(o.expand)) {
            container.addClass("tabs-expand-"+o.expand);
        }

        container.addClass(o.tabsPosition.replace(["-", "_", "+"], " "));
        if (o.tabsPosition.contains("vertical")) {
            container.addClass("tabs-expand-fs"); // TODO need redesign this behavior
        }

        element.addClass("tabs-list");
        if (!right_parent) {
            container.insertBefore(element);
            element.appendTo(container);
        }

        element.data('expanded', false);

        expandTitle = $("<div>").addClass("expand-title"); container.prepend(expandTitle);
        hamburger = container.find(".hamburger");
        if (hamburger.length === 0) {
            hamburger = $("<button>").attr("type", "button").addClass("hamburger menu-down").appendTo(container);
            for(var i = 0; i < 3; i++) {
                $("<span>").addClass("line").appendTo(hamburger);
            }

            if (Colors.isLight(Utils.computedRgbToHex(Utils.getStyleOne(container, "background-color"))) === true) {
                hamburger.addClass("dark");
            }
        }

        container.addClass(o.clsTabs);
        element.addClass(o.clsTabsList);
        element.children("li").addClass(o.clsTabsListItem);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var container = element.parent();

        container.on(Metro.events.click, ".hamburger, .expand-title", function(){
            if (element.data('expanded') === false) {
                element.addClass("expand");
                element.data('expanded', true);
                container.find(".hamburger").addClass("active");
            } else {
                element.removeClass("expand");
                element.data('expanded', false);
                container.find(".hamburger").removeClass("active");
            }
        });

        element.on(Metro.events.click, "a", function(e){
            var link = $(this);
            var href = link.attr("href");
            var tab = link.parent("li");

            if (element.data('expanded') === true) {
                element.removeClass("expand");
                element.data('expanded', false);
                container.find(".hamburger").removeClass("active");
            }

            if (Utils.exec(o.onBeforeTab, [tab, element], tab[0]) !== true) {
                return false;
            }

            if (!Utils.isUrl(href)) {
                that._open(tab);
                e.preventDefault();
            }
        });
    },

    _collectTargets: function(){
        var that = this, element = this.element;
        var tabs = element.find("li");

        $.each(tabs, function(){
            var target = $(this).find("a").attr("href").trim();
            if (target.length > 1 && target[0] === "#") {
                that._targets.push(target);
            }
        });
    },

    _open: function(tab){
        var that = this, element = this.element, o = this.options;
        var tabs = element.find("li");
        var expandTitle = element.siblings(".expand-title");


        if (tabs.length === 0) {
            return;
        }

        this._collectTargets();

        if (tab === undefined) {
            tab = $(tabs[0]);
        }

        var target = tab.find("a").attr("href");

        if (target === undefined) {
            return;
        }

        tabs.removeClass("active");
        if (tab.parent().hasClass("d-menu")) {
            tab.parent().parent().addClass("active");
        } else {
            tab.addClass("active");
        }

        $.each(this._targets, function(){
            var t = $(this);
            if (t.length > 0) t.hide();
        });

        if (target !== "#") {
            $(target).show();
        }

        expandTitle.html(tab.find("a").html());

        Utils.exec(o.onTab, [tab, element]);
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('tabs', Tabs);

// Source: js/plugins/textarea.js
var Textarea = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onTextareaCreate, [this.element]);

        return this;
    },
    options: {
        prepend: "",
        copyInlineStyles: true,
        clearButton: true,
        clearButtonIcon: "<span class='default-icon-cross'></span>",
        autoSize: false,
        disabled: false,
        onTextareaCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var container = $("<div>").addClass("textarea " + element[0].className);
        var clearButton;
        var timer = null;

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }


        if (o.clearButton !== false) {
            clearButton = $("<button>").addClass("button input-clear-button").attr("tabindex", -1).attr("type", "button").html(o.clearButtonIcon);
            clearButton.on(Metro.events.click, function(){
                element.val("").trigger('change').trigger('keyup').focus();
            });
            clearButton.appendTo(container);
        }

        element.appendTo(container);

        var resize = function(){
            element[0].style.cssText = 'height:auto;';
            element[0].style.cssText = 'height:' + element[0].scrollHeight + 'px';
        };

        if (o.autoSize) {

            container.addClass("autosize");

            timer = setTimeout(function(){
                timer = null;
                resize();
            }, 0);

            element.on(Metro.events.keyup, resize);
            element.on(Metro.events.keydown, resize);
            element.on(Metro.events.change, resize);
            element.on(Metro.events.focus, resize);
            element.on(Metro.events.cut, resize);
            element.on(Metro.events.paste, resize);
            element.on(Metro.events.drop, resize);
        }

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl").attr("dir", "rtl");
        }

        if (o.prepend !== "") {
            var prepend = Utils.isTag(o.prepend) ? $(o.prepend) : $("<span>"+o.prepend+"</span>");
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                container.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        element.on(Metro.events.blur, function(){container.removeClass("focused");});
        element.on(Metro.events.focus, function(){container.addClass("focused");});

        if (o.disabled === true || element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
        }
    }
};

Metro.plugin('textarea', Textarea);

// Source: js/plugins/tiles.js
var Tile = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.effectInterval = false;
        this.images = [];
        this.slides = [];
        this.currentSlide = -1;
        this.unload = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        size: "medium",
        cover: "",
        effect: "",
        effectInterval: 3000,
        effectDuration: 500,
        target: null,
        canTransform: true,
        onClick: Metro.noop,
        onTileCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createTile();
        this._createEvents();

        Utils.exec(o.onTileCreate, [element]);
    },

    _createTile: function(){
        function switchImage(el, img_src){
            setTimeout(function(){
                el.fadeOut(500, function(){
                    el.css("background-image", "url(" + img_src + ")");
                    el.fadeIn();
                });
            }, Utils.random(0,1000));
        }

        var that = this, element = this.element, o = this.options;
        var slides = element.find(".slide");
        var slides2 = element.find(".slide-front, .slide-back");

        element.addClass("tile-" + o.size);

        if (o.effect.indexOf("hover-") > -1) {
            element.addClass("effect-" + o.effect);
            $.each(slides2, function(){
                var slide = $(this);

                if (slide.data("cover") !== undefined) {
                    that._setCover(slide, slide.data("cover"));
                }
            })
        }

        if (o.effect.indexOf("animate-") > -1 && slides.length > 1) {
            $.each(slides, function(i){
                var slide = $(this);

                that.slides.push(this);

                if (slide.data("cover") !== undefined) {
                    that._setCover(slide, slide.data("cover"));
                }

                if (i > 0) {
                    if (["animate-slide-up", "animate-slide-down"].indexOf(o.effect) > -1) slide.css("top", "100%");
                    if (["animate-slide-left", "animate-slide-right"].indexOf(o.effect) > -1) slide.css("left", "100%");
                    if (["animate-fade"].indexOf(o.effect) > -1) slide.css("opacity", 0);
                }
            });

            this.currentSlide = 0;

            this._runEffects();
        }

        if (o.cover !== "") {
            this._setCover(element, o.cover);
        }

        if (o.effect === "image-set") {
            element.addClass("image-set");
            $.each(element.children("img"), function(){
                var img = $(this);
                var src = this.src;
                var div = $("<div>").addClass("img");

                if (img.hasClass("icon")) {
                    return ;
                }

                that.images.push(this);

                div.css("background-image", "url("+src+")");
                element.prepend(div);
                img.remove();
            });

            setInterval(function(){
                var temp = that.images.slice();
                for(var i = 0; i < element.find(".img").length; i++) {
                    var rnd_index = Utils.random(0, temp.length - 1);
                    var div = $(element.find(".img").get(i));
                    switchImage(div, temp[rnd_index].src);
                    temp.splice(rnd_index, 1);
                }
            }, 3000);
        }
    },

    _runEffects: function(){
        var that = this, o = this.options;

        if (this.effectInterval === false) this.effectInterval = setInterval(function(){
            var current, next;

            current = $(that.slides[that.currentSlide]);

            that.currentSlide++;
            if (that.currentSlide === that.slides.length) {
                that.currentSlide = 0;
            }

            next = that.slides[that.currentSlide];

            if (o.effect === "animate-slide-up") Animation.slideUp($(current), $(next), o.effectDuration);
            if (o.effect === "animate-slide-down") Animation.slideDown($(current), $(next), o.effectDuration);
            if (o.effect === "animate-slide-left") Animation.slideLeft($(current), $(next), o.effectDuration);
            if (o.effect === "animate-slide-right") Animation.slideRight($(current), $(next), o.effectDuration);
            if (o.effect === "animate-fade") Animation.fade($(current), $(next), o.effectDuration);

        }, o.effectInterval);
    },

    _stopEffects: function(){
        clearInterval(this.effectInterval);
        this.effectInterval = false;
    },

    _setCover: function(to, src){
        to.css({
            backgroundImage: "url("+src+")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        });
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.start, function(e){
            var tile = $(this);
            var dim = {w: element.width(), h: element.height()};
            var X = Utils.pageXY(e).x - tile.offset().left,
                Y = Utils.pageXY(e).y - tile.offset().top;
            var side;

            if (Utils.isRightMouse(e) === false) {

                if (X < dim.w * 1 / 3 && (Y < dim.h * 1 / 2 || Y > dim.h * 1 / 2)) {
                    side = 'left';
                } else if (X > dim.w * 2 / 3 && (Y < dim.h * 1 / 2 || Y > dim.h * 1 / 2)) {
                    side = 'right';
                } else if (X > dim.w * 1 / 3 && X < dim.w * 2 / 3 && Y > dim.h / 2) {
                    side = 'bottom';
                } else {
                    side = "top";
                }

                if (o.canTransform === true) tile.addClass("transform-" + side);

                if (o.target !== null) {
                    setTimeout(function(){
                        document.location.href = o.target;
                    }, 100);
                }

                Utils.exec(o.onClick, [tile]);
            }
        });

        element.on([Metro.events.stop, Metro.events.leave].join(" "), function(e){
            $(this)
                .removeClass("transform-left")
                .removeClass("transform-right")
                .removeClass("transform-top")
                .removeClass("transform-bottom");
        });

        $(window).on(Metro.events.blur, function(){
            that._stopEffects();
        });
        $(window).on(Metro.events.focus, function(){
            that._runEffects();
        });
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('tile', Tile);

// Source: js/plugins/timepicker.js
var TimePicker = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.picker = null;
        this.isOpen = false;
        this.value = [];
        this.locale = Metro.locales[METRO_LOCALE]['calendar'];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        hoursStep: 1,
        minutesStep: 1,
        secondsStep: 1,
        value: null,
        locale: METRO_LOCALE,
        distance: 3,
        hours: true,
        minutes: true,
        seconds: true,
        showLabels: true,
        scrollSpeed: 5,
        copyInlineStyles: true,
        clsPicker: "",
        clsPart: "",
        clsHours: "",
        clsMinutes: "",
        clsSeconds: "",
        okButtonIcon: "<span class='default-icon-check'></span>",
        cancelButtonIcon: "<span class='default-icon-cross'></span>",
        onSet: Metro.noop,
        onOpen: Metro.noop,
        onClose: Metro.noop,
        onScroll: Metro.noop,
        onTimePickerCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var picker = this.picker;
        var i;

        if (o.distance < 1) {
            o.distance = 1;
        }

        if (o.hoursStep < 1) {o.hoursStep = 1;}
        if (o.hoursStep > 23) {o.hoursStep = 23;}

        if (o.minutesStep < 1) {o.minutesStep = 1;}
        if (o.minutesStep > 59) {o.minutesStep = 59;}

        if (o.secondsStep < 1) {o.secondsStep = 1;}
        if (o.secondsStep > 59) {o.secondsStep = 59;}

        if (element.val() === "" && (!Utils.isValue(o.value))) {
            o.value = (new Date()).format("%H:%M:%S");
        }

        this.value = Utils.strToArray(element.val() !== "" ? element.val() : String(o.value), ":");

        for(i = 0; i < 3; i++) {
            if (this.value[i] === undefined || this.value[i] === null) {
                this.value[i] = 0;
            } else {
                this.value[i] = parseInt(this.value[i]);
            }
        }

        this._normalizeValue();

        if (Metro.locales[o.locale] === undefined) {
            o.locale = METRO_LOCALE;
        }

        this.locale = Metro.locales[o.locale]['calendar'];

        this._createStructure();
        this._createEvents();
        this._set();

        Utils.exec(o.onTimePickerCreate, [element, picker]);
    },

    _normalizeValue: function(){
        var o = this.options;

        if (o.hoursStep > 1) {
            this.value[0] = Utils.nearest(this.value[0], o.hoursStep, true);
        }
        if (o.minutesStep > 1) {
            this.value[1] = Utils.nearest(this.value[1], o.minutesStep, true);
        }
        if (o.minutesStep > 1) {
            this.value[2] = Utils.nearest(this.value[2], o.secondsStep, true);
        }
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var picker, hours, minutes, seconds, ampm, select, i;
        var timeWrapper, selectWrapper, selectBlock, actionBlock;

        var prev = element.prev();
        var parent = element.parent();
        var id = Utils.elementId("time-picker");

        picker = $("<div>").attr("id", id).addClass("wheel-picker time-picker " + element[0].className).addClass(o.clsPicker);

        if (prev.length === 0) {
            parent.prepend(picker);
        } else {
            picker.insertAfter(prev);
        }

        element.attr("readonly", true).appendTo(picker);


        timeWrapper = $("<div>").addClass("time-wrapper").appendTo(picker);

        if (o.hours === true) {
            hours = $("<div>").attr("data-title", this.locale['time']['hours']).addClass("hours").addClass(o.clsPart).addClass(o.clsHours).appendTo(timeWrapper);
        }
        if (o.minutes === true) {
            minutes = $("<div>").attr("data-title", this.locale['time']['minutes']).addClass("minutes").addClass(o.clsPart).addClass(o.clsMinutes).appendTo(timeWrapper);
        }
        if (o.seconds === true) {
            seconds = $("<div>").attr("data-title", this.locale['time']['seconds']).addClass("seconds").addClass(o.clsPart).addClass(o.clsSeconds).appendTo(timeWrapper);
        }

        selectWrapper = $("<div>").addClass("select-wrapper").appendTo(picker);

        selectBlock = $("<div>").addClass("select-block").appendTo(selectWrapper);
        if (o.hours === true) {
            hours = $("<ul>").addClass("sel-hours").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(hours);
            for (i = 0; i < 24; i = i + o.hoursStep) {
                $("<li>").addClass("js-hours-"+i).html(i < 10 ? "0"+i : i).data("value", i).appendTo(hours);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(hours);
        }
        if (o.minutes === true) {
            minutes = $("<ul>").addClass("sel-minutes").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(minutes);
            for (i = 0; i < 60; i = i + o.minutesStep) {
                $("<li>").addClass("js-minutes-"+i).html(i < 10 ? "0"+i : i).data("value", i).appendTo(minutes);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(minutes);
        }
        if (o.seconds === true) {
            seconds = $("<ul>").addClass("sel-seconds").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(seconds);
            for (i = 0; i < 60; i = i + o.secondsStep) {
                $("<li>").addClass("js-seconds-"+i).html(i < 10 ? "0"+i : i).data("value", i).appendTo(seconds);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(seconds);
        }

        selectBlock.height((o.distance * 2 + 1) * 40);

        actionBlock = $("<div>").addClass("action-block").appendTo(selectWrapper);
        $("<button>").attr("type", "button").addClass("button action-ok").html(o.okButtonIcon).appendTo(actionBlock);
        $("<button>").attr("type", "button").addClass("button action-cancel").html(o.cancelButtonIcon).appendTo(actionBlock);


        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (i = 0; i < element[0].style.length; i++) {
                picker.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        if (o.showLabels === true) {
            picker.addClass("show-labels");
        }

        this.picker = picker;
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var picker = this.picker;

        picker.on(Metro.events.start, ".select-block ul", function(e){

            if (e.changedTouches) {
                return ;
            }

            var target = this;
            var pageY = Utils.pageXY(e).y;

            $(document).on(Metro.events.move + "-picker", function(e){

                target.scrollTop -= o.scrollSpeed * (pageY  > Utils.pageXY(e).y ? -1 : 1);

                pageY = Utils.pageXY(e).y;
            });

            $(document).on(Metro.events.stop + "-picker", function(e){
                $(document).off(Metro.events.move + "-picker");
                $(document).off(Metro.events.stop + "-picker");
            });
        });

        picker.on(Metro.events.click, function(e){
            if (that.isOpen === false) that.open();
            e.stopPropagation();
        });

        picker.on(Metro.events.click, ".action-ok", function(e){
            var h, m, s, a;
            var sh = picker.find(".sel-hours li.active"),
                sm = picker.find(".sel-minutes li.active"),
                ss = picker.find(".sel-seconds li.active");

            h = sh.length === 0 ? 0 : sh.data("value");
            m = sm.length === 0 ? 0 : sm.data("value");
            s = ss.length === 0 ? 0 : ss.data("value");

            that.value = [h, m, s];
            that._normalizeValue();
            that._set();

            that.close();
            e.stopPropagation();
        });

        picker.on(Metro.events.click, ".action-cancel", function(e){
            that.close();
            e.stopPropagation();
        });

        this._addScrollEvents();
    },

    _addScrollEvents: function(){
        var picker = this.picker, o = this.options;
        var lists = ['hours', 'minutes', 'seconds'];

        $.each(lists, function(){
            var list_name = this;
            var list = picker.find(".sel-" + list_name);

            if (list.length === 0) return ;

            list.on(Metro.events.scrollStart, function(){
                list.find(".active").removeClass("active");
            });

            list.on(Metro.events.scrollStop, {latency: 50}, function(){
                var target = Math.round((Math.ceil(list.scrollTop() + 40) / 40)) ;
                var target_element = list.find("li").eq(target + o.distance - 1);
                var scroll_to = target_element.position().top - (o.distance * 40) + list.scrollTop();

                list.animate({
                    scrollTop: scroll_to
                }, 100, function(){
                    target_element.addClass("active");
                    Utils.exec(o.onScroll, [target_element, list, picker]);
                });
            });
        });
    },

    _removeScrollEvents: function(){
        var picker = this.picker;
        var lists = ['hours', 'minutes', 'seconds'];
        $.each(lists, function(){
            picker.find(".sel-" + this).off("scrollstart scrollstop");
        });
    },

    _set: function(){
        var that = this, element = this.element, o = this.options;
        var picker = this.picker;
        var h = "00", m = "00", s = "00";

        if (o.hours === true) {
            h = this.value[0];
            if (h < 10) {
                h = "0"+h;
            }
            picker.find(".hours").html(h);
        }
        if (o.minutes === true) {
            m = this.value[1];
            if (m < 10) {
                m = "0"+m;
            }
            picker.find(".minutes").html(m);
        }
        if (o.seconds === true) {
            s = this.value[2];
            if (s < 10) {
                s = "0"+s;
            }
            picker.find(".seconds").html(s);
        }

        element.val([h, m, s].join(":")).trigger("change");

        Utils.exec(o.onSet, [this.value, element.val(), element, picker]);
    },

    open: function(){
        var that  = this, element = this.element, o = this.options;
        var picker = this.picker;
        var h, m, s;
        var h_list, m_list, s_list;
        var items = picker.find("li");
        var select_wrapper = picker.find(".select-wrapper");
        var select_wrapper_in_viewport, select_wrapper_rect;
        var h_item, m_item, s_item;

        select_wrapper.parent().removeClass("for-top for-bottom");
        select_wrapper.show();
        items.removeClass("active");

        select_wrapper_in_viewport = Utils.inViewport(select_wrapper);
        select_wrapper_rect = Utils.rect(select_wrapper);

        if (!select_wrapper_in_viewport && select_wrapper_rect.top > 0) {
            select_wrapper.parent().addClass("for-bottom");
        }

        if (!select_wrapper_in_viewport && select_wrapper_rect.top < 0) {
            select_wrapper.parent().addClass("for-top");
        }

        var animateList = function(list, item){
            list.scrollTop(0).animate({
                scrollTop: item.position().top - (o.distance * 40) + list.scrollTop()
            }, 100);
        };

        if (o.hours === true) {
            h = parseInt(this.value[0]);
            h_list = picker.find(".sel-hours");
            h_item = h_list.find("li.js-hours-" + h).addClass("active");
            animateList(h_list, h_item);
        }
        if (o.minutes === true) {
            m = parseInt(this.value[1]);
            m_list = picker.find(".sel-minutes");
            m_item = m_list.find("li.js-minutes-" + m).addClass("active");
            animateList(m_list, m_item);
        }
        if (o.seconds === true) {
            s = parseInt(this.value[2]);
            s_list = picker.find(".sel-seconds");
            s_item = s_list.find("li.js-seconds-" + s).addClass("active");
            animateList(s_list, s_item);
        }

        this.isOpen = true;

        Utils.exec(o.onOpen, [this.value, element, picker]);
    },

    close: function(){
        var picker = this.picker, o = this.options, element = this.element;
        picker.find(".select-wrapper").hide();
        this.isOpen = false;
        Utils.exec(o.onClose, [this.value, element, picker]);
    },

    _convert: function(t){
        var result;

        if (Array.isArray(t)) {
            result = t;
        } else if (typeof  t.getMonth === 'function') {
            result = [t.getHours(), t.getMinutes(), t.getSeconds()];
        } else if (Utils.isObject(t)) {
            result = [t.h, t.m, t.s];
        } else {
            result = Utils.strToArray(t, ":");
        }

        return result;
    },

    val: function(t){
        if (t === undefined) {
            return this.element.val();
        }
        this.value = this._convert(t);
        this._normalizeValue();
        this._set();
    },

    time: function(t){
        if (t === undefined) {
            return {
                h: this.value[0],
                m: this.value[1],
                s: this.value[2]
            }
        }

        this.value = this._convert(t);
        this._normalizeValue();
        this._set();
    },

    date: function(t){
        if (t === undefined || typeof t.getMonth !== 'function') {
            var ret = new Date();
            ret.setHours(this.value[0]);
            ret.setMinutes(this.value[1]);
            ret.setSeconds(this.value[2]);
            ret.setMilliseconds(0);
            return ret;
        }

        this.value = this._convert(t);
        this._normalizeValue();
        this._set();
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element;

        var changeValueAttribute = function(){
            that.val(element.attr("data-value"));
        };

        switch (attributeName) {
            case "data-value": changeValueAttribute(); break;
        }
    }
};

Metro.plugin('timepicker', TimePicker);

$(document).on(Metro.events.click, function(e){
    $.each($(".time-picker"), function(){
        $(this).find("input").data("timepicker").close();
    });
});


// Source: js/plugins/toast.js
var Toast = {
    create: function(message, callback, timeout, cls){
        var toast = $("<div>").addClass("toast").html(message).appendTo($("body")).hide();
        var width = toast.outerWidth();
        var timer = null;
        timeout = timeout || METRO_TIMEOUT;

        toast.css({
            'left': '50%',
            'margin-left': -(width / 2)
        }).addClass(cls).fadeIn(METRO_ANIMATION_DURATION);

        timer = setTimeout(function(){
            timer = null;
            toast.fadeOut(METRO_ANIMATION_DURATION, function(){
                toast.remove();
                Utils.callback(callback);
            });
        }, timeout);
    }
};

Metro['toast'] = Toast;

// Source: js/plugins/treeview.js
var Treeview = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        effect: "slide",
        duration: 100,
        onNodeClick: Metro.noop,
        onNodeDblClick: Metro.noop,
        onNodeDelete: Metro.noop,
        onNodeInsert: Metro.noop,
        onNodeClean: Metro.noop,
        onCheckClick: Metro.noop,
        onRadioClick: Metro.noop,
        onExpandNode: Metro.noop,
        onCollapseNode: Metro.noop,
        onTreeviewCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createTree();
        this._createEvents();

        $.each(element.find("input"), function(){
            if (!$(this).is(":checked")) return;
            that._recheck(this);
        });

        Utils.exec(o.onTreeviewCreate, [element]);
    },

    _createIcon: function(data){
        var icon, src;

        src = Utils.isTag(data) ? $(data) : $("<img>").attr("src", data);
        icon = $("<span>").addClass("icon");
        icon.html(src);

        return icon;
    },

    _createCaption: function(data){
        return $("<span>").addClass("caption").html(data);
    },


    _createToggle: function(){
        return $("<span>").addClass("node-toggle");
    },


    _createNode: function(data){
        var node;

        node = $("<li>");

        if (data.caption !== undefined) {
            node.prepend(this._createCaption(data.caption));
        }

        if (data.icon !== undefined) {
            node.prepend(this._createIcon(data.icon));
        }

        if (data.html !== undefined) {
            node.append(data.html);
        }

        return node;
    },

    _createTree: function(){
        var that = this, element = this.element, o = this.options;
        var nodes = element.find("li");

        element.addClass("treeview");

        $.each(nodes, function(){
            var node = $(this);


            if (node.data("caption") !== undefined) {
                node.prepend(that._createCaption(node.data("caption")));
            }

            if (node.data("icon") !== undefined) {
                node.prepend(that._createIcon(node.data("icon")));
            }

            if (node.children("ul").length > 0) {
                node.append(that._createToggle());
                if (node.data("collapsed") !== true) {
                    node.addClass("expanded");
                } else {
                    node.children("ul").hide();
                }
            }

        });
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".node-toggle", function(e){
            var toggle = $(this);
            var node = toggle.parent();

            that.toggleNode(node);

            e.preventDefault();
        });

        element.on(Metro.events.click, "li > .caption", function(e){
            var node = $(this).parent();

            that.current(node);

            Utils.exec(o.onNodeClick, [node, element]);

            e.preventDefault();
        });

        element.on(Metro.events.dblclick, "li > .caption", function(e){
            var node = $(this).closest("li");
            var toggle = node.children(".node-toggle");
            var subtree = node.children("ul");

            if (toggle.length > 0 || subtree.length > 0) {
                that.toggleNode(node);
            }

            Utils.exec(o.onNodeDblClick, [node, element]);

            e.preventDefault();
        });

        element.on(Metro.events.click, "input[type=radio]", function(e){
            var check = $(this);
            var checked = check.is(":checked");
            var node = check.closest("li");

            that.current(node);

            Utils.exec(o.onRadioClick, [checked, check, node, element]);
        });

        element.on(Metro.events.click, "input[type=checkbox]", function(e){
            var check = $(this);
            var checked = check.is(":checked");
            var node = check.closest("li");

            that._recheck(check);

            Utils.exec(o.onCheckClick, [checked, check, node, element], this);
        });
    },

    _recheck: function(check){
        var element = this.element;
        var checked, node, checks;

        if (!Utils.isJQueryObject(check)) {
            check = $(check);
        }

        checked = check.is(":checked");
        node = check.closest("li");

        this.current(node);

        // down
        checks = check.closest("li").find("ul input[type=checkbox]");
        checks.attr("data-indeterminate", false);
        checks.prop("checked", checked);

        checks = [];

        $.each(element.find(":checkbox"), function(){
            checks.push(this);
        });

        $.each(checks.reverse(), function(){
            var ch = $(this);
            var children = ch.closest("li").children("ul").find(":checkbox").length;
            var children_checked = ch.closest("li").children("ul").find(":checkbox:checked").length;

            if (children > 0 && children_checked === 0) {
                ch.attr("data-indeterminate", false);
                ch.prop("checked", false);
            }

            if (children_checked === 0) {
                ch.attr("data-indeterminate", false);
            } else {
                if (children_checked > 0 && children > children_checked) {
                    ch.attr("data-indeterminate", true);
                } else if (children === children_checked) {
                    ch.attr("data-indeterminate", false);
                    ch.prop("checked", true);
                }
            }
        });
    },

    current: function(node){
        var element = this.element, o = this.options;

        if (node === undefined) {
            return element.find("li.current")
        }

        element.find("li").removeClass("current");
        node.addClass("current");
    },

    toggleNode: function(node){
        var element = this.element, o = this.options;
        var func;

        node.toggleClass("expanded");

        if (o.effect === "slide") {
            func = node.hasClass("expanded") !== true ? "slideUp" : "slideDown";
            Utils.exec(o.onCollapseNode, [node, element]);
        } else {
            func = node.hasClass("expanded") !== true ? "fadeOut" : "fadeIn";
            Utils.exec(o.onExpandNode, [node, element]);
        }

        node.children("ul")[func](o.duration);
    },

    addTo: function(node, data){
        var that = this, element = this.element, o = this.options;
        var target;
        var new_node;
        var toggle;

        if (node === null) {
            target = element;
        } else {
            target = node.children("ul");
            if (target.length === 0) {
                target = $("<ul>").appendTo(node);
                toggle = this._createToggle();
                toggle.appendTo(node);
                node.addClass("expanded");
            }
        }

        new_node = this._createNode(data);

        new_node.appendTo(target);

        Utils.exec(o.onNodeInsert, [new_node, element]);

        return new_node;
    },

    insertBefore: function(node, data){
        var element = this.element, o = this.options;
        var new_node = this._createNode(data);
        new_node.insertBefore(node);
        Utils.exec(o.onNodeInsert, [new_node, element]);
        return new_node;
    },

    insertAfter: function(node, data){
        var element = this.element, o = this.options;
        var new_node = this._createNode(data);
        new_node.insertAfter(node);
        Utils.exec(o.onNodeInsert, [new_node, element]);
        return new_node;
    },

    del: function(node){
        var element = this.element, o = this.options;
        var parent_list = node.closest("ul");
        var parent_node = parent_list.closest("li");
        node.remove();
        if (parent_list.children().length === 0 && !parent_list.is(element)) {
            parent_list.remove();
            parent_node.removeClass("expanded");
            parent_node.children(".node-toggle").remove();
        }
        Utils.exec(o.onNodeDelete, [node, element]);
    },

    clean: function(node){
        var element = this.element, o = this.options;
        node.children("ul").remove();
        node.removeClass("expanded");
        node.children(".node-toggle").remove();
        Utils.exec(o.onNodeClean, [node, element]);
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('treeview', Treeview);

// Source: js/plugins/validator.js
var ValidatorFuncs = {
    required: function(val){
        return Utils.isValue(val.trim());
    },
    length: function(val, len){
        if (!Utils.isValue(len) || isNaN(len) || len <= 0) {
            return false;
        }
        return val.trim().length === parseInt(len);
    },
    minlength: function(val, len){
        if (!Utils.isValue(len) || isNaN(len) || len <= 0) {
            return false;
        }
        return val.trim().length >= parseInt(len);
    },
    maxlength: function(val, len){
        if (!Utils.isValue(len) || isNaN(len) || len <= 0) {
            return false;
        }
        return val.trim().length <= parseInt(len);
    },
    min: function(val, min_value){
        if (!Utils.isValue(min_value) || isNaN(min_value)) {
            return false;
        }
        if (!this.number(val)) {
            return false;
        }
        if (isNaN(val)) {
            return false;
        }
        return Number(val) >= Number(min_value);
    },
    max: function(val, max_value){
        if (!Utils.isValue(max_value) || isNaN(max_value)) {
            return false;
        }
        if (!this.number(val)) {
            return false;
        }
        if (isNaN(val)) {
            return false;
        }
        return Number(val) <= Number(max_value);
    },
    email: function(val){
        return /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(val);
    },
    domain: function(val){
        return /^((xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(val);
    },
    url: function(val){
        return /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(val);
    },
    date: function(val){
        return (new Date(val) !== "Invalid Date" && !isNaN(new Date(val)));
    },
    number: function(val){
        return !isNaN(val);
    },
    integer: function(val){
        return Utils.isInt(val);
    },
    float: function(val){
        return Utils.isFloat(val);
    },
    digits: function(val){
        return /^\d+$/.test(val);
    },
    hexcolor: function(val){
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(val);
    },
    color: function(val){
        return Colors.color(val, Colors.PALETTES.STANDARD) !== false;
    },
    pattern: function(val, pat){
        if (!Utils.isValue(pat)) {
            return false;
        }
        var reg = new RegExp(pat);
        return reg.test(val);
    },
    compare: function(val, val2){
        return val === val2;
    },
    not: function(val, not_this){
        return val !== not_this;
    },

    custom: function(val, func){
        if (Utils.isFunc(func) === false) {
            return false;
        }
        return Utils.exec(func, [val]);
    },

    is_control: function(el){
        return el.parent().hasClass("input")
            || el.parent().hasClass("select")
            || el.parent().hasClass("textarea")
            || el.parent().hasClass("checkbox")
            || el.parent().hasClass("switch")
            || el.parent().hasClass("radio")
            ;
    },

    reset_state: function(el){
        var input = Utils.isJQueryObject(el) === false ? $(el) : el ;
        var is_control = ValidatorFuncs.is_control(input);

        if (is_control) {
            input.parent().removeClass("invalid valid");
        } else {
            input.removeClass("invalid valid");
        }
    },

    set_valid_state: function(input){
        if (Utils.isJQueryObject(input) === false) {
            input = $(input);
        }
        var is_control = ValidatorFuncs.is_control(input);

        if (is_control) {
            input.parent().addClass("valid");
        } else {
            input.addClass("valid");
        }
    },

    set_invalid_state: function(input){
        if (Utils.isJQueryObject(input) === false) {
            input = $(input);
        }
        var is_control = ValidatorFuncs.is_control(input);

        if (is_control) {
            input.parent().addClass("invalid");
        } else {
            input.addClass("invalid");
        }
    },

    reset: function(form){
        var that = this;
        $.each($(form).find("[data-validate]"), function(){
            that.reset_state(this);
        });

        return this;
    },

    validate: function(el, result, cb_ok, cb_error, required_mode){
        var this_result = true;
        var input = $(el);
        var is_control = ValidatorFuncs.is_control(input);
        var funcs = input.data('validate') !== undefined ? String(input.data('validate')).split(" ").map(function(s){return s.trim();}) : [];
        var errors = [];
        var required = funcs.indexOf('required') !== -1;

        if (funcs.length === 0) {
            return true;
        }

        this.reset_state(input);

        if (input.attr('type') && input.attr('type').toLowerCase() === "checkbox") {
            if (funcs.indexOf('required') === -1) {
                this_result = true;
            } else {
                this_result = input.is(":checked");
            }

            if (this_result === false) {
                errors.push('required');
            }

            if (result !== undefined) {
                result.val += this_result ? 0 : 1;
            }
        } else if (input.attr('type') && input.attr('type').toLowerCase() === "radio") {
            if (input.attr('name') === undefined) {
                this_result = true;
            }

            var radio_selector = 'input[name=' + input.attr('name') + ']:checked';
            this_result = $(radio_selector).length > 0;

            if (result !== undefined) {
                result.val += this_result ? 0 : 1;
            }
        } else {
            $.each(funcs, function(){
                if (this_result === false) return;
                var rule = this.split("=");
                var f, a;

                f = rule[0]; rule.shift();
                a = rule.join("=");

                if (f === 'compare') {
                    a = input[0].form.elements[a].value;
                }

                if (Utils.isFunc(ValidatorFuncs[f]) === false)  {
                    this_result = true;
                } else {
                    if (required_mode === true || f === "required") {
                        this_result = ValidatorFuncs[f](input.val(), a);
                    } else {
                        if (input.val().trim() !== "") {
                            this_result = ValidatorFuncs[f](input.val(), a);
                        } else {
                            this_result = true;
                        }
                    }
                    // this_result = ValidatorFuncs[f](input.val(), a);
                }

                if (this_result === false) {
                    errors.push(f);
                }

                if (result !== undefined) {
                    result.val += this_result ? 0 : 1;
                }
            });
        }

        if (this_result === false) {
            this.set_invalid_state(input);

            if (result !== undefined) {
                result.log.push({
                    input: input[0],
                    name: input.attr("name"),
                    value: input.val(),
                    funcs: funcs,
                    errors: errors
                });
            }

            if (cb_error !== undefined) Utils.exec(cb_error, [input, input.val()], input[0]);

        } else {
            this.set_valid_state(input);

            if (cb_ok !== undefined) Utils.exec(cb_ok, [input, input.val()], input[0]);
        }

        return this_result;
    }
};

Metro['validator'] = ValidatorFuncs;

var Validator = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this._onsubmit = null;
        this._onreset = null;
        this._action = null;
        this.result = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    dependencies: ['utils', 'colors'],

    options: {
        submitTimeout: 200,
        interactiveCheck: false,
        clearInvalid: 0,
        requiredMode: true,
        onBeforeSubmit: Metro.noop_true,
        onSubmit: Metro.noop,
        onError: Metro.noop,
        onValidate: Metro.noop,
        onErrorForm: Metro.noop,
        onValidateForm: Metro.noop,
        onValidatorCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var inputs = element.find("[data-validate]");

        this._action = element[0].action;

        element
            .attr("novalidate", 'novalidate')
            .attr("action", "javascript:");

        $.each(inputs, function(){
            var input = $(this);
            var funcs = input.data("validate");
            var required = funcs.indexOf("required") > -1;
            if (required) {
                if (ValidatorFuncs.is_control(input)) {
                    input.parent().addClass("required");
                } else {
                    input.addClass("required");
                }
            }
            if (o.interactiveCheck === true) {
                input.on(Metro.events.inputchange, function () {
                    ValidatorFuncs.validate(this, undefined, undefined, undefined, o.requiredMode);
                });
            }
        });

        this._onsubmit = null;
        this._onreset = null;

        if (element[0].onsubmit !== null) {
            this._onsubmit = element[0].onsubmit;
            element[0].onsubmit = null;
        }

        if (element[0].onreset !== null) {
            this._onreset = element[0].onreset;
            element[0].onreset = null;
        }

        element[0].onsubmit = function(){
            return that._submit();
        };

        element[0].onreset = function(){
            return that._reset();
        };

        Utils.exec(this.options.onValidatorCreate, [element], this.elem);
    },

    _reset: function(){
        ValidatorFuncs.reset(this.element);
        if (this._onsubmit !==  null) Utils.exec(this._onsubmit, null, this.element[0]);
    },

    _submit: function(){
        var that = this, element = this.element, o = this.options;
        var form = this.elem;
        var inputs = element.find("[data-validate]");
        var submit = element.find(":submit").attr('disabled', 'disabled').addClass('disabled');
        var result = {
            val: 0,
            log: []
        };

        $.each(inputs, function(){
            ValidatorFuncs.validate(this, result, o.onValidate, o.onError, o.requiredMode);
        });

        submit.removeAttr("disabled").removeClass("disabled");

        element[0].action = this._action;

        result.val += Utils.exec(o.onBeforeSubmit, [element], this.elem) === false ? 1 : 0;

        if (result.val === 0) {
            Utils.exec(o.onValidateForm, [element], form);
            setTimeout(function(){
                Utils.exec(o.onSubmit, [element], form);
                if (that._onsubmit !==  null) Utils.exec(that._onsubmit, null, form);
            }, o.submitTimeout);
        } else {
            Utils.exec(o.onErrorForm, [result.log, element], form);
            if (o.clearInvalid > 0) {
                setTimeout(function(){
                    $.each(inputs, function(){
                        var inp  = $(this);
                        if (ValidatorFuncs.is_control(inp)) {
                            inp.parent().removeClass("invalid");
                        } else {
                            inp.removeClass("invalid");
                        }
                    })
                }, o.clearInvalid);
            }
        }

        return result.val === 0;
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
        }
    }
};

Metro.plugin('validator', Validator);

// Source: js/plugins/video.js
var Video = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.fullscreen = false;
        this.preloader = null;
        this.player = null;
        this.video = elem;
        this.stream = null;
        this.volume = null;
        this.volumeBackup = 0;
        this.muted = false;
        this.fullScreenInterval = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        src: null,

        poster: "",
        logo: "",
        logoHeight: 32,
        logoWidth: "auto",
        logoTarget: "",

        volume: .5,
        loop: false,
        autoplay: false,

        fullScreenMode: Metro.fullScreenMode.DESKTOP,
        aspectRatio: Metro.aspectRatio.HD,

        controlsHide: 3000,

        showLoop: true,
        showPlay: true,
        showStop: true,
        showMute: true,
        showFull: true,
        showStream: true,
        showVolume: true,
        showInfo: true,

        loopIcon: "<span class='default-icon-loop'></span>",
        stopIcon: "<span class='default-icon-stop'></span>",
        playIcon: "<span class='default-icon-play'></span>",
        pauseIcon: "<span class='default-icon-pause'></span>",
        muteIcon: "<span class='default-icon-mute'></span>",
        volumeLowIcon: "<span class='default-icon-low-volume'></span>",
        volumeMediumIcon: "<span class='default-icon-medium-volume'></span>",
        volumeHighIcon: "<span class='default-icon-high-volume'></span>",
        screenMoreIcon: "<span class='default-icon-enlarge'></span>",
        screenLessIcon: "<span class='default-icon-shrink'></span>",

        onPlay: Metro.noop,
        onPause: Metro.noop,
        onStop: Metro.noop,
        onEnd: Metro.noop,
        onMetadata: Metro.noop,
        onTime: Metro.noop,
        onVideoCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options, video = this.video;

        if (Metro.fullScreenEnabled === false) {
            o.fullScreenMode = Metro.fullScreenMode.WINDOW;
        }

        this._createPlayer();
        this._createControls();
        this._createEvents();
        this._setAspectRatio();

        if (o.autoplay === true) {
            this.play();
        }

        Utils.exec(o.onVideoCreate, [element, this.player]);
    },

    _createPlayer: function(){
        var that = this, element = this.element, o = this.options, video = this.video;

        var prev = element.prev();
        var parent = element.parent();
        var player = $("<div>").addClass("media-player video-player " + element[0].className);
        var preloader = $("<div>").addClass("preloader").appendTo(player);
        var logo = $("<a>").attr("href", o.logoTarget).addClass("logo").appendTo(player);

        if (prev.length === 0) {
            parent.prepend(player);
        } else {
            player.insertAfter(prev);
        }

        element.appendTo(player);

        $.each(['muted', 'autoplay', 'controls', 'height', 'width', 'loop', 'poster', 'preload'], function(){
            element.removeAttr(this);
        });

        element.attr("preload", "auto");

        if (o.poster !== "") {
            element.attr("poster", o.poster);
        }

        video.volume = o.volume;

        preloader.activity({
            type: "cycle",
            style: "color"
        });

        preloader.hide(0);

        this.preloader = preloader;

        if (o.logo !== "") {
            $("<img>")
                .css({
                    height: o.logoHeight,
                    width: o.logoWidth
                })
                .attr("src", o.logo).appendTo(logo);
        }

        if (o.src !== null) {
            this._setSource(o.src);
        }

        element[0].className = "";

        this.player = player;
    },

    _setSource: function(src){
        var element = this.element;

        element.find("source").remove();
        element.removeAttr("src");
        if (Array.isArray(src)) {
            $.each(src, function(){
                var item = this;
                if (item.src === undefined) return ;
                $("<source>").attr('src', item.src).attr('type', item.type !== undefined ? item.type : '').appendTo(element);
            });
        } else {
            element.attr("src", src);
        }
    },

    _createControls: function(){
        var that = this, element = this.element, o = this.options, video = this.elem, player = this.player;

        var controls = $("<div>").addClass("controls").addClass(o.clsControls).insertAfter(element);

        var stream = $("<div>").addClass("stream").appendTo(controls);
        var streamSlider = $("<input>").addClass("stream-slider ultra-thin cycle-marker").appendTo(stream);

        var volume = $("<div>").addClass("volume").appendTo(controls);
        var volumeSlider = $("<input>").addClass("volume-slider ultra-thin cycle-marker").appendTo(volume);

        var infoBox = $("<div>").addClass("info-box").appendTo(controls);

        if (o.showInfo !== true) {
            infoBox.hide();
        }

        streamSlider.slider({
            clsMarker: "bg-red",
            clsHint: "bg-cyan fg-white",
            clsComplete: "bg-cyan",
            hint: true,
            onStart: function(){
                if (!video.paused) video.pause();
            },
            onStop: function(val){
                if (video.seekable.length > 0) {
                    video.currentTime = (that.duration * val / 100).toFixed(0);
                }
                if (video.paused && video.currentTime > 0) {
                    video.play();
                }
            }
        });

        this.stream = streamSlider;

        if (o.showStream !== true) {
            stream.hide();
        }

        volumeSlider.slider({
            clsMarker: "bg-red",
            clsHint: "bg-cyan fg-white",
            hint: true,
            value: o.volume * 100,
            onChangeValue: function(val){
                video.volume = val / 100;
            }
        });

        this.volume = volumeSlider;

        if (o.showVolume !== true) {
            volume.hide();
        }

        var loop, play, stop, mute, full;

        if (o.showLoop === true) loop = $("<button>").attr("type", "button").addClass("button square loop").html(o.loopIcon).appendTo(controls);
        if (o.showPlay === true) play = $("<button>").attr("type", "button").addClass("button square play").html(o.playIcon).appendTo(controls);
        if (o.showStop === true) stop = $("<button>").attr("type", "button").addClass("button square stop").html(o.stopIcon).appendTo(controls);
        if (o.showMute === true) mute = $("<button>").attr("type", "button").addClass("button square mute").html(o.muteIcon).appendTo(controls);
        if (o.showFull === true) full = $("<button>").attr("type", "button").addClass("button square full").html(o.screenMoreIcon).appendTo(controls);

        if (o.loop === true) {
            loop.addClass("active");
            element.attr("loop", "loop");
        }

        this._setVolume();

        if (o.muted) {
            that.volumeBackup = video.volume;
            that.volume.data('slider').val(0);
            video.volume = 0;
        }

        infoBox.html("00:00 / 00:00");
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options, video = this.elem, player = this.player;

        element.on("loadstart", function(){
            that.preloader.fadeIn();
        });

        element.on("loadedmetadata", function(){
            that.duration = video.duration.toFixed(0);
            that._setInfo(0, that.duration);
            Utils.exec(o.onMetadata, [video, player]);
        });

        element.on("canplay", function(){
            that._setBuffer();
            that.preloader.fadeOut();
        });

        element.on("progress", function(){
            that._setBuffer();
        });

        element.on("timeupdate", function(){
            var position = Math.round(video.currentTime * 100 / that.duration);
            that._setInfo(video.currentTime, that.duration);
            that.stream.data('slider').val(position);
            Utils.exec(o.onTime, [video.currentTime, that.duration, video, player]);
        });

        element.on("waiting", function(){
            that.preloader.fadeIn();
        });

        element.on("loadeddata", function(){

        });

        element.on("play", function(){
            player.find(".play").html(o.pauseIcon);
            Utils.exec(o.onPlay, [video, player]);
            that._onMouse();
        });

        element.on("pause", function(){
            player.find(".play").html(o.playIcon);
            Utils.exec(o.onPause, [video, player]);
            that._offMouse();
        });

        element.on("stop", function(){
            that.stream.data('slider').val(0);
            Utils.exec(o.onStop, [video, player]);
            that._offMouse();
        });

        element.on("ended", function(){
            that.stream.data('slider').val(0);
            Utils.exec(o.onEnd, [video, player]);
            that._offMouse();
        });

        element.on("volumechange", function(){
            that._setVolume();
        });

        player.on(Metro.events.click, ".play", function(e){
            if (video.paused) {
                that.play();
            } else {
                that.pause();
            }
        });

        player.on(Metro.events.click, ".stop", function(e){
            that.stop();
        });

        player.on(Metro.events.click, ".mute", function(e){
            that._toggleMute();
        });

        player.on(Metro.events.click, ".loop", function(){
            that._toggleLoop();
        });

        player.on(Metro.events.click, ".full", function(e){
            that.fullscreen = !that.fullscreen;
            player.find(".full").html(that.fullscreen === true ? o.screenLessIcon : o.screenMoreIcon);
            if (o.fullScreenMode === Metro.fullScreenMode.WINDOW) {
                if (that.fullscreen === true) {
                    player.addClass("full-screen");
                } else {
                    player.removeClass("full-screen");
                }
            } else {
                if (that.fullscreen === true) {

                    Metro.requestFullScreen(video);

                    if (that.fullScreenInterval === false) that.fullScreenInterval = setInterval(function(){
                        if (Metro.inFullScreen() === false) {
                            that.fullscreen = false;
                            clearInterval(that.fullScreenInterval);
                            that.fullScreenInterval = false;
                            player.find(".full").html(o.screenMoreIcon);
                        }

                    }, 1000);
                } else {
                    Metro.exitFullScreen();
                }
            }

            if (that.fullscreen === true) {
                $(document).on(Metro.events.keyup + "_video", function(e){
                    if (e.keyCode === 27) {
                        player.find(".full").click();
                    }
                });
            } else {
                $(document).off(Metro.events.keyup + "_video");
            }
        });

        $(window).resize(function(){
            that._setAspectRatio();
        });
    },

    _onMouse: function(){
        var player = this.player, o = this.options;

        if (o.controlsHide > 0) {
            player.on(Metro.events.enter, function(){
                player.find(".controls").fadeIn();
            });

            player.on(Metro.events.leave, function(){
                setTimeout(function(){
                    player.find(".controls").fadeOut();
                }, o.controlsHide);
            });
        }
    },

    _offMouse: function(){
        this.player.off(Metro.events.enter);
        this.player.off(Metro.events.leave);
        this.player.find(".controls").fadeIn();
    },

    _toggleLoop: function(){
        var loop = this.player.find(".loop");
        if (loop.length === 0) return ;
        loop.toggleClass("active");
        if (loop.hasClass("active")) {
            this.element.attr("loop", "loop");
        } else {
            this.element.removeAttr("loop");
        }
    },

    _toggleMute: function(){
        this.muted = !this.muted;
        if (this.muted === false) {
            this.video.volume = this.volumeBackup;
            this.volume.data('slider').val(this.volumeBackup * 100);
        } else {
            this.volumeBackup = this.video.volume;
            this.volume.data('slider').val(0);
            this.video.volume = 0;
        }
    },

    _setInfo: function(a, b){
        this.player.find(".info-box").html(Utils.secondsToFormattedString(Math.round(a)) + " / " + Utils.secondsToFormattedString(Math.round(b)));
    },

    _setBuffer: function(){
        var buffer = this.video.buffered.length ? Math.round(Math.floor(this.video.buffered.end(0)) / Math.floor(this.video.duration) * 100) : 0;
        this.stream.data('slider').buff(buffer);
    },

    _setVolume: function(){
        var video = this.video, player = this.player, o = this.options;

        var volumeButton = player.find(".mute");
        var volume = video.volume * 100;
        if (volume > 1 && volume < 30) {
            volumeButton.html(o.volumeLowIcon);
        } else if (volume >= 30 && volume < 60) {
            volumeButton.html(o.volumeMediumIcon);
        } else if (volume >= 60 && volume <= 100) {
            volumeButton.html(o.volumeHighIcon);
        } else {
            volumeButton.html(o.muteIcon);
        }
    },

    _setAspectRatio: function(){
        var player = this.player, o = this.options;
        var width = player.outerWidth();
        var height;

        switch (o.aspectRatio) {
            case Metro.aspectRatio.SD: height = Utils.aspectRatioH(width, "4/3"); break;
            case Metro.aspectRatio.CINEMA: height = Utils.aspectRatioH(width, "21/9"); break;
            default: height = Utils.aspectRatioH(width, "16/9");
        }

        player.outerHeight(height);
    },

    aspectRatio: function(ratio){
        this.options.aspectRatio = ratio;
        this._setAspectRatio();
    },

    play: function(src){
        if (src !== undefined) {
            this._setSource(src);
        }

        if (this.element.attr("src") === undefined && this.element.find("source").length === 0) {
            return ;
        }

        this.video.play();
    },

    pause: function(){
        this.video.pause();
    },

    resume: function(){
        if (this.video.paused) {
            this.play();
        }
    },

    stop: function(){
        this.video.pause();
        this.video.currentTime = 0;
        this.stream.data('slider').val(0);
        this._offMouse();
    },

    volume: function(v){
        if (v === undefined) {
            return this.video.volume;
        }

        if (v > 1) {
            v /= 100;
        }

        this.video.volume = v;
        this.volume.data('slider').val(v*100);
    },

    loop: function(){
        this._toggleLoop();
    },

    mute: function(){
        this._toggleMute();
    },

    changeAspectRatio: function(){
        this.options.aspectRatio = this.element.attr("data-aspect-ratio");
        this._setAspectRatio();
    },

    changeSource: function(){
        var src = JSON.parse(this.element.attr('data-src'));
        this.play(src);
    },

    changeVolume: function(){
        var volume = this.element.attr("data-volume");
        this.volume(volume);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-aspect-ratio": this.changeAspectRatio(); break;
            case "data-src": this.changeSource(); break;
            case "data-volume": this.changeVolume(); break;
        }
    }
};

Metro.plugin('video', Video);

// Source: js/plugins/window.js
var Window = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.win = null;
        this.overlay = null;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onWindowCreate, [this.win, this.element]);

        return this;
    },

    dependencies: ['draggable', 'resizeable'],

    options: {
        width: "auto",
        height: "auto",
        btnClose: true,
        btnMin: true,
        btnMax: true,
        clsCaption: "",
        clsContent: "",
        clsWindow: "",
        draggable: true,
        dragElement: ".window-caption",
        dragArea: "parent",
        shadow: false,
        icon: "",
        title: "Window",
        content: "default",
        resizable: true,
        overlay: false,
        overlayColor: 'transparent',
        overlayAlpha: .5,
        modal: false,
        position: "absolute",
        checkEmbed: true,
        top: "auto",
        left: "auto",
        place: "auto",
        closeAction: Metro.actions.REMOVE,
        onDragStart: Metro.noop,
        onDragStop: Metro.noop,
        onDragMove: Metro.noop,
        onCaptionDblClick: Metro.noop,
        onCloseClick: Metro.noop,
        onMaxClick: Metro.noop,
        onMinClick: Metro.noop,
        onResizeStart: Metro.noop,
        onResizeStop: Metro.noop,
        onResize: Metro.noop,
        onWindowCreate: Metro.noop,
        onShow: Metro.noop,
        onWindowDestroy: Metro.noop,
        onCanClose: Metro.noop_true,
        onClose: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var win, overlay;
        var prev = element.prev();
        var parent = element.parent();

        if (o.modal === true) {
            o.btnMax = false;
            o.btnMin = false;
            o.resizable = false;
        }

        if (o.content === "default") {
            o.content = element;
        }

        win = this._window(o);

        if (prev.length === 0) {
            parent.prepend(win);
        } else {
            win.insertAfter(prev);
        }
        if (o.overlay === true) {
            overlay = this._overlay();
            overlay.appendTo(win.parent());
            this.overlay = overlay;
        }

        Utils.exec(o.onShow, [win]);

        this.win = win;
    },

    _window: function(o){
        var that = this;
        var win, caption, content, icon, title, buttons, btnClose, btnMin, btnMax, resizer, status;

        win = $("<div>").addClass("window");
        win.css({
            width: o.width,
            height: o.height,
            position: o.position,
            top: o.top,
            left: o.left
        });

        if (o.modal === true) {
            win.addClass("modal");
        }

        caption = $("<div>").addClass("window-caption");
        content = $("<div>").addClass("window-content");

        win.append(caption);
        win.append(content);

        if (o.status === true) {
            status = $("<div>").addClass("window-status");
            win.append(status);
        }

        if (o.shadow === true) {
            win.addClass("win-shadow");
        }

        if (o.icon !== undefined) {
            icon = $("<span>").addClass("icon").html(o.icon);
            icon.appendTo(caption);
        }

        if (o.title !== undefined) {
            title = $("<span>").addClass("title").html(o.title);
            title.appendTo(caption);
        }

        if (o.content !== undefined && o.content !== 'original') {

            if (Utils.isUrl(o.content) && Utils.isVideoUrl(o.content)) {
                o.content = Utils.embedUrl(o.content);
            }

            if (!Utils.isJQueryObject(o.content) && Utils.isFunc(o.content)) {
                o.content = Utils.exec(o.content);
            }

            if (Utils.isJQueryObject(o.content)) {
                o.content.appendTo(content);
            } else {
                content.html(o.content);
            }
        }

        if (o.btnClose === true || o.btnMin === true || o.btnMax === true) {
            buttons = $("<div>").addClass("buttons");
            buttons.appendTo(caption);

            if (o.btnMax === true) {
                btnMax = $("<span>").addClass("btn-max");
                btnMax.appendTo(buttons);
            }

            if (o.btnMin === true) {
                btnMin = $("<span>").addClass("btn-min");
                btnMin.appendTo(buttons);
            }

            if (o.btnClose === true) {
                btnClose = $("<span>").addClass("btn-close");
                btnClose.appendTo(buttons);
            }
        }

        win.attr("id", o.id === undefined ? Utils.elementId("window") : o.id);

        if (o.resizable === true) {
            resizer = $("<span>").addClass("resize-element");
            resizer.appendTo(win);
            win.addClass("resizable");
        }

        win.on(Metro.events.dblclick, ".window-caption", function(e){
            that.maximized(e);
        });
        win.on(Metro.events.click, ".btn-max", function(e){
            that.maximized(e);
        });
        win.on(Metro.events.click, ".btn-min", function(e){
            that.minimized(e);
        });
        win.on(Metro.events.click, ".btn-close", function(e){
            that.close(e);
        });

        if (o.resizable === true) {
            win.resizable({
                resizeElement: ".resize-element",
                onResizeStart: o.onResizeStart,
                onResizeStop: o.onResizeStop,
                onResize: o.onResize
            });
        }

        if (o.draggable === true) {
            win.draggable({
                dragElement: o.dragElement,
                dragArea: o.dragArea,
                onDragStart: o.onDragStart,
                onDragStop: o.onDragStop,
                onDragMove: o.onDragMove
            })
        }


        if (o.place !== 'auto') {
            win.addClass("pos-" + o.place);
        }

        win.addClass(o.clsWindow);
        caption.addClass(o.clsCaption);
        content.addClass(o.clsContent);

        return win;
    },

    _overlay: function(){
        var that = this, win = this.win,  element = this.element, o = this.options;

        var overlay = $("<div>");
        overlay.addClass("overlay");

        if (o.overlayColor === 'transparent') {
            overlay.addClass("transparent");
        } else {
            overlay.css({
                background: Utils.hex2rgba(o.overlayColor, o.overlayAlpha)
            });
        }

        return overlay;
    },

    maximized: function(e){
        var that = this, win = this.win,  element = this.element, o = this.options;
        var target = $(e.currentTarget);
        win.toggleClass("maximized");
        if (target.hasClass("window-caption")) {
            Utils.exec(o.onCaptionDblClick, [win]);
        } else {
            Utils.exec(o.onMaxClick, [win]);
        }
    },

    minimized: function(e){
        var that = this, win = this.win,  element = this.element, o = this.options;
        win.toggleClass("minimized");
        Utils.exec(o.onMinClick, [win], element[0]);
    },

    close: function(e){
        var that = this, win = this.win,  element = this.element, o = this.options;
        var timer = null;

        if (Utils.exec(o.onCanClose, [win]) === false) {
            return false;
        }

        var timeout = 0;

        if (o.onClose !== Metro.noop) {
            timeout = 500;
        }

        Utils.exec(o.onClose, [win], element[0]);

        timer = setTimeout(function(){
            timer = null;
            if (o.modal === true) {
                win.siblings(".overlay").remove();
            }
            Utils.exec(o.onCloseClick, [win], element[0]);
            Utils.exec(o.onWindowDestroy, [win], element[0]);
            if (o.closeAction === Metro.actions.REMOVE) {
                win.remove();
            } else {
                that.hide();
            }

        }, timeout);
    },

    hide: function(){
        this.win.addClass("no-visible");
    },
    show: function(){
        this.win.removeClass("no-visible");
    },
    toggle: function(){
        if (this.win.hasClass("no-visible")) {
            this.show();
        } else {
            this.hide();
        }
    },
    isOpen: function(){
        return this.win.hasClass("no-visible");
    },
    min: function(a){
        a ? this.win.addClass("minimized") : this.win.removeClass("minimized");
    },
    max: function(a){
        a ? this.win.addClass("maximized") : this.win.removeClass("maximized");
    },

    toggleButtons: function(a) {
        var that = this, element = this.element, win = this.win, o = this.options;
        var btnClose = win.find(".btn-close");
        var btnMin = win.find(".btn-min");
        var btnMax = win.find(".btn-max");

        if (a === "data-btn-close") {
            btnClose.toggle();
        }
        if (a === "data-btn-min") {
            btnMin.toggle();
        }
        if (a === "data-btn-max") {
            btnMax.toggle();
        }
    },

    changeSize: function(a){
        var that = this, element = this.element, win = this.win, o = this.options;
        if (a === "data-width") {
            win.css("width", element.data("width"));
        }
        if (a === "data-height") {
            win.css("height", element.data("height"));
        }
    },

    changeClass: function(a){
        var that = this, element = this.element, win = this.win, o = this.options;
        if (a === "data-cls-window") {
            win[0].className = "window " + (o.resizable ? " resizeable " : " ") + element.attr("data-cls-window");
        }
        if (a === "data-cls-caption") {
            win.find(".window-caption")[0].className = "window-caption " + element.attr("data-cls-caption");
        }
        if (a === "data-cls-content") {
            win.find(".window-content")[0].className = "window-content " + element.attr("data-cls-content");
        }
    },

    toggleShadow: function(){
        var that = this, element = this.element, win = this.win, o = this.options;
        var flag = JSON.parse(element.attr("data-shadow"));
        if (flag === true) {
            win.addClass("win-shadow");
        } else {
            win.removeClass("win-shadow");
        }
    },

    setContent: function(){
        var that = this, element = this.element, win = this.win, o = this.options;
        var content = element.attr("data-content");
        var result;

        if (!Utils.isJQueryObject(content) && Utils.isFunc(content)) {
            result = Utils.exec(content);
        } else if (Utils.isJQueryObject(content)) {
            result = content.html();
        } else {
            result = content;
        }

        win.find(".window-content").html(result);
    },

    setTitle: function(){
        var that = this, element = this.element, win = this.win, o = this.options;
        var title = element.attr("data-title");
        win.find(".window-caption .title").html(title);
    },

    setIcon: function(){
        var that = this, element = this.element, win = this.win, o = this.options;
        var icon = element.attr("data-icon");
        win.find(".window-caption .icon").html(icon);
    },

    getIcon: function(){
        var that = this, element = this.element, win = this.win, o = this.options;
        return win.find(".window-caption .icon").html();
    },

    getTitle: function(){
        var that = this, element = this.element, win = this.win, o = this.options;
        return win.find(".window-caption .title").html();
    },

    toggleDraggable: function(){
        var that = this, element = this.element, win = this.win, o = this.options;
        var flag = JSON.parse(element.attr("data-draggable"));
        var drag = win.data("draggable");
        if (flag === true) {
            drag.on();
        } else {
            drag.off();
        }
    },

    toggleResizable: function(){
        var that = this, element = this.element, win = this.win, o = this.options;
        var flag = JSON.parse(element.attr("data-resizable"));
        var resize = win.data("resizable");
        if (flag === true) {
            resize.on();
            win.find(".resize-element").removeClass("resize-element-disabled");
        } else {
            resize.off();
            win.find(".resize-element").addClass("resize-element-disabled");
        }
    },

    changeTopLeft: function(a){
        var that = this, element = this.element, win = this.win, o = this.options;
        var pos;
        if (a === "data-top") {
            pos = parseInt(element.attr("data-top"));
            if (!isNaN(pos)) {
                return ;
            }
            win.css("top", pos);
        }
        if (a === "data-left") {
            pos = parseInt(element.attr("data-left"));
            if (!isNaN(pos)) {
                return ;
            }
            win.css("left", pos);
        }
    },

    changePlace: function (a) {
        var that = this, element = this.element, win = this.win, o = this.options;
        var place = element.attr("data-place");
        win.addClass(place);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-btn-close":
            case "data-btn-min":
            case "data-btn-max": this.toggleButtons(attributeName); break;
            case "data-width":
            case "data-height": this.changeSize(attributeName); break;
            case "data-cls-window":
            case "data-cls-caption":
            case "data-cls-content": this.changeClass(attributeName); break;
            case "data-shadow": this.toggleShadow(); break;
            case "data-icon": this.setIcon(); break;
            case "data-title": this.setTitle(); break;
            case "data-content": this.setContent(); break;
            case "data-draggable": this.toggleDraggable(); break;
            case "data-resizable": this.toggleResizable(); break;
            case "data-top":
            case "data-left": this.changeTopLeft(attributeName); break;
            case "data-place": this.changePlace(); break;
        }
    }
};

Metro.plugin('window', Window);

Metro['window'] = {

    isWindow: function(el){
        return Utils.isMetroObject(el, "window");
    },

    min: function(el, a){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = $(el).data("window");
        win.min(a);
    },

    max: function(el, a){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = $(el).data("window");
        win.max(a);
    },

    show: function(el){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = $(el).data("window");
        win.show();
    },

    hide: function(el){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = $(el).data("window");
        win.hide();
    },

    toggle: function(el){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = $(el).data("window");
        win.toggle();
    },

    isOpen: function(el){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = $(el).data("window");
        return win.isOpen();
    },

    close: function(el){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = $(el).data("window");
        win.close();
    },

    create: function(options){
        var w;

        w = $("<div>").appendTo($("body"));

        var w_options = $.extend({}, {
        }, (options !== undefined ? options : {}));

        return w.window(w_options);
    }
};

// Source: js/plugins/wizard.js
var Wizard = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        start: 1,
        finish: 0,
        iconHelp: "<span class='default-icon-help'></span>",
        iconPrev: "<span class='default-icon-left-arrow'></span>",
        iconNext: "<span class='default-icon-right-arrow'></span>",
        iconFinish: "<span class='default-icon-check'></span>",

        buttonMode: "cycle", // default, cycle, square
        buttonOutline: true,

        clsWizard: "",
        clsActions: "",
        clsHelp: "",
        clsPrev: "",
        clsNext: "",
        clsFinish: "",

        onPage: Metro.noop,
        onHelpClick: Metro.noop,
        onPrevClick: Metro.noop,
        onNextClick: Metro.noop,
        onFinishClick: Metro.noop,
        onBeforePrev: Metro.noop_true,
        onBeforeNext: Metro.noop_true,
        onWizardCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createWizard();
        this._createEvents();

        Utils.exec(o.onWizardCreate, [element]);
    },

    _createWizard: function(){
        var that = this, element = this.element, o = this.options;
        var bar;

        element.addClass("wizard").addClass(o.view).addClass(o.clsWizard);

        bar = $("<div>").addClass("action-bar").addClass(o.clsActions).appendTo(element);

        var buttonMode = o.buttonMode === "button" ? "" : o.buttonMode;
        if (o.buttonOutline === true) {
            buttonMode += " outline";
        }

        if (o.iconHelp !== false) $("<button>").attr("type", "button").addClass("button wizard-btn-help").addClass(buttonMode).addClass(o.clsHelp).html(Utils.isTag(o.iconHelp) ? o.iconHelp : $("<img>").attr('src', o.iconHelp)).appendTo(bar);
        if (o.iconPrev !== false) $("<button>").attr("type", "button").addClass("button wizard-btn-prev").addClass(buttonMode).addClass(o.clsPrev).html(Utils.isTag(o.iconPrev) ? o.iconPrev : $("<img>").attr('src', o.iconPrev)).appendTo(bar);
        if (o.iconNext !== false) $("<button>").attr("type", "button").addClass("button wizard-btn-next").addClass(buttonMode).addClass(o.clsNext).html(Utils.isTag(o.iconNext) ? o.iconNext : $("<img>").attr('src', o.iconNext)).appendTo(bar);
        if (o.iconFinish !== false) $("<button>").attr("type", "button").addClass("button wizard-btn-finish").addClass(buttonMode).addClass(o.clsFinish).html(Utils.isTag(o.iconFinish) ? o.iconFinish : $("<img>").attr('src', o.iconFinish)).appendTo(bar);

        this.toPage(o.start);

        this._setHeight();
    },

    _setHeight: function(){
        var that = this, element = this.element, o = this.options;
        var pages = element.children("section");
        var max_height = 0;

        pages.children(".page-content").css("max-height", "none");

        $.each(pages, function(){
            var h = $(this).height();
            if (max_height < parseInt(h)) {
                max_height = h;
            }
        });

        element.height(max_height);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".wizard-btn-help", function(){
            var pages = element.children("section");
            var page = pages.get(that.current - 1);
            Utils.exec(o.onHelpClick, [that.current, page, element])
        });

        element.on(Metro.events.click, ".wizard-btn-prev", function(){
            that.prev();
            Utils.exec(o.onPrevClick, [that.current, element])
        });

        element.on(Metro.events.click, ".wizard-btn-next", function(){
            that.next();
            Utils.exec(o.onNextClick, [that.current, element])
        });

        element.on(Metro.events.click, ".wizard-btn-finish", function(){
            Utils.exec(o.onFinishClick, [that.current, element])
        });

        element.on(Metro.events.click, ".complete", function(){
            var index = $(this).index() + 1;
            that.toPage(index);
        });

        $(window).on(Metro.events.resize, function(){
            that._setHeight();
        });
    },

    next: function(){
        var that = this, element = this.element, o = this.options;
        var pages = element.children("section");
        var page = $(element.children("section").get(this.current - 1));

        if (this.current + 1 > pages.length || Utils.exec(o.onBeforeNext, [this.current, page, element]) === false) {
            return ;
        }

        this.current++;

        this.toPage(this.current);
    },

    prev: function(){
        var that = this, element = this.element, o = this.options;
        var page = $(element.children("section").get(this.current - 1));

        if (this.current - 1 === 0 || Utils.exec(o.onBeforePrev, [this.current, page, element]) === false) {
            return ;
        }

        this.current--;

        this.toPage(this.current);
    },

    last: function(){
        var that = this, element = this.element, o = this.options;

        this.toPage(element.children("section").length);
    },

    first: function(){
        this.toPage(1);
    },

    toPage: function(page){
        var that = this, element = this.element, o = this.options;
        var target = $(element.children("section").get(page - 1));
        var sections = element.children("section");
        var actions = element.find(".action-bar");

        if (target.length === 0) {
            return ;
        }

        var finish = element.find(".wizard-btn-finish").addClass("disabled");
        var next = element.find(".wizard-btn-next").addClass("disabled");
        var prev = element.find(".wizard-btn-prev").addClass("disabled");

        this.current = page;

        element.children("section")
            .removeClass("complete current")
            .removeClass(o.clsCurrent)
            .removeClass(o.clsComplete);

        target.addClass("current").addClass(o.clsCurrent);
        target.prevAll().addClass("complete").addClass(o.clsComplete);

        var border_size = element.children("section.complete").length === 0 ? 0 : parseInt(Utils.getStyleOne(element.children("section.complete")[0], "border-left-width"));

        actions.animate({
            left: element.children("section.complete").length * border_size + 41
        });

        if (
            (this.current === sections.length) || (o.finish > 0 && this.current >= o.finish)
        ) {
            finish.removeClass("disabled");
        }

        if (this.current < sections.length) {
            next.removeClass("disabled");
        }

        if (this.current > 1) {
            prev.removeClass("disabled");
        }

        element.trigger("onpage", [this.current, target, element]);
        Utils.exec(o.onPage, [this.current, target, element]);
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('wizard', Wizard);

return METRO_INIT === true ? Metro.init() : Metro;

}));