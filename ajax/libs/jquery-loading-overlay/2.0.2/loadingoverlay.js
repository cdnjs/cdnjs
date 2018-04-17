/***************************************************************************************************
LoadingOverlay - A flexible loading overlay jQuery plugin
    Author          : Gaspare Sganga
    Version         : 2.0.2
    License         : MIT
    Documentation   : https://gasparesganga.com/labs/jquery-loading-overlay/
***************************************************************************************************/
;(function(factory){
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module
        define(["jquery"], factory);
    } else if (typeof module === "object" && module.exports) {
        // Node/CommonJS
        factory(require("jquery"));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($, undefined){
    "use strict";
    
    // Default Settings
    var _defaults = {
        // Background
        background              : "rgba(255, 255, 255, 0.8)",
        backgroundClass         : "",
        // Image
        image                   : "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'><ellipse rx='80' ry='80' cx='500' cy='90'/><ellipse rx='80' ry='80' cx='500' cy='910'/><ellipse rx='80' ry='80' cx='90' cy='500'/><ellipse rx='80' ry='80' cx='910' cy='500'/><ellipse rx='80' ry='80' cx='212' cy='212'/><ellipse rx='80' ry='80' cx='788' cy='212'/><ellipse rx='80' ry='80' cx='212' cy='788'/><ellipse rx='80' ry='80' cx='788' cy='788'/></svg>",
        imageAnimation          : "2000ms rotate_right",
        imageAutoResize         : true,
        imageResizeFactor       : 1,
        imageColor              : "#202020",
        imageClass              : "",
        imageOrder              : 1,
        // Font Awesome
        fontawesome             : "",
        fontawesomeAnimation    : "",
        fontawesomeAutoResize   : true,
        fontawesomeResizeFactor : 1,
        fontawesomeColor        : "#202020",
        fontawesomeOrder        : 2,
        // Custom
        custom                  : "",
        customAnimation         : "",
        customAutoResize        : true,
        customResizeFactor      : 1,
        customOrder             : 3,
        // Text
        text                    : "",
        textAnimation           : "",
        textAutoResize          : true,
        textResizeFactor        : 0.5,
        textColor               : "#202020",
        textClass               : "",
        textOrder               : 4,
        // Progress
        progress                : false,
        progressAutoResize      : true,
        progressResizeFactor    : 0.25,
        progressColor           : "#a0a0a0",
        progressClass           : "",
        progressOrder           : 5,
        progressSpeed           : 200,
        progressMin             : 0,
        progressMax             : 100,
        // Sizing
        size                    : 50,
        maxSize                 : 120,
        minSize                 : 20,
        // Misc
        direction               : "column",
        fade                    : true,
        _fadeValues             : [400, 200],
        resizeInterval          : 50,
        zIndex                  : 2147483647
    };
    
    // Required CSS
    var _css = {
        overlay : {
            "box-sizing"        : "border-box",
            "position"          : "relative",
            "display"           : "flex",
            "flex-wrap"         : "nowrap",
            "align-items"       : "center",
            "justify-content"   : "space-around"
        },
        element : {
            "box-sizing"        : "border-box",
            "overflow"          : "visible",
            "flex"              : "0 0 auto",
            "display"           : "flex",
            "justify-content"   : "center",
            "align-items"       : "center"
        },
        element_svg : {
            "width"             : "100%",
            "height"            : "100%"
        },
        progress_wrapper: {
            "position"          : "absolute",
            "top"               : "0",
            "left"              : "0",
            "width"             : "100%",
            "height"            : "100%"
        },
        progress_bar : {
            "position"          : "absolute",
            "left"              : "0"
        }
    };
    
    // Data Template
    var _dataTemplate = {
        "count"             : 0,
        "fadeOut"           : undefined,
        "overlay"           : undefined,
        "resizeIntervalId"  : undefined,
        "text"              : undefined,
        "progress"          : undefined
    };
    
    // Animations whitelist and defaults
    var _animationsWhitelist = [
        "rotate_right",
        "rotate_left",
        "fadein",
        "pulse"
    ];
    var _animationsDefaults = {
        name    : "rotate_right",
        time    : "2000ms"
    };
    
    
    $.LoadingOverlaySetup = function(settings){
        $.extend(true, _defaults, settings);
    };
    
    $.LoadingOverlay = function(action, options){
        switch (action.toLowerCase()) {
            case "show":
                var settings = $.extend(true, {}, _defaults, options);
                Show("body", settings);
                break;
                
            case "hide":
                Hide("body", options);
                break;
                
            case "text":
                Text("body", options);
                break;
                
            case "progress":
                Progress("body", options);
                break;
        }
    };
    
    $.fn.LoadingOverlay = function(action, options){
        switch (action.toLowerCase()) {
            case "show":
                var settings = $.extend(true, {}, _defaults, options);
                return this.each(function(){
                    Show(this, settings);
                });
                
            case "hide":
                return this.each(function(){
                    Hide(this, options);
                });
                
            case "text":
                return this.each(function(){
                    Text(this, options);
                });
                
            case "progress":
                return this.each(function(){
                    Progress(this, options);
                });
        }
    };
    
    
    function Show(container, settings){
        container               = $(container);
        settings.size           = _ParseSize(settings.size);
        settings.maxSize        = parseInt(settings.maxSize, 10) || 0;
        settings.minSize        = parseInt(settings.minSize, 10) || 0;
        settings.resizeInterval = parseInt(settings.resizeInterval, 10) || 0;
        
        var data        = container.data("loadingoverlay");
        var wholePage   = container.is("body");
        if (typeof data === "undefined") {
            // Init data
            data = $.extend({}, _dataTemplate);
            container.data("loadingoverlay", data);
            
            // Overlay
            data.overlay = $("<div>", {
                "class" : "loadingoverlay"
            })
            .css(_css.overlay)
            .css("flex-direction", settings.direction.toLowerCase() === "row" ? "row" : "column");
            if (settings.backgroundClass) {
                data.overlay.addClass(settings.backgroundClass);
            } else {
                data.overlay.css("background", settings.background);
            }
            if (wholePage) {
                data.overlay.css({
                    "position"  : "fixed",
                    "top"       : 0,
                    "left"      : 0,
                    "width"     : "100%",
                    "height"    : "100%"
                });
            }
            if (typeof settings.zIndex !== "undefined") data.overlay.css("z-index", settings.zIndex);
            
            // Image
            if (settings.image) {
                var element = _CreateElement(data.overlay, settings.imageOrder, settings.imageAutoResize, settings.imageResizeFactor, settings.imageAnimation);
                if (settings.image.slice(0, 4).toLowerCase() === "<svg" && settings.image.slice(-6).toLowerCase() === "</svg>") {
                    // Inline SVG
                    element.append(settings.image);
                    element.children().css(_css.element_svg);
                    if (!settings.imageClass && settings.imageColor) element.css("fill", settings.imageColor);
                } else if (settings.image.slice(-4).toLowerCase() === ".svg" || settings.image.slice(0, 14).toLowerCase() === "data:image/svg") {
                    // SVG file or base64-encoded SVG
                    element.load(settings.image, function(){
                        element.children().css(_css.element_svg);
                    });
                    if (!settings.imageClass && settings.imageColor) element.css("fill", settings.imageColor);
                } else {
                    // Raster
                    element.css({
                        "background-image"      : "url(" + settings.image + ")",
                        "background-position"   : "center",
                        "background-repeat"     : "no-repeat",
                        "background-size"       : "cover"
                    });
                }
                if (settings.imageClass) element.addClass(settings.imageClass);
            }
            
            // Font Awesome
            if (settings.fontawesome) {
                var element = _CreateElement(data.overlay, settings.fontawesomeOrder, settings.fontawesomeAutoResize, settings.fontawesomeResizeFactor, settings.fontawesomeAnimation)
                    .addClass("loadingoverlay_fa");
                $("<div>", {
                    "class" : settings.fontawesome
                }).appendTo(element);
                if (settings.fontawesomeColor) element.css("color", settings.fontawesomeColor);
            }
            
            // Custom
            if (settings.custom) {
                var element = _CreateElement(data.overlay, settings.customOrder, settings.customAutoResize, settings.customResizeFactor, settings.customAnimation)
                    .append(settings.custom);
            }
            
            // Text
            if (settings.text) {
                data.text = _CreateElement(data.overlay, settings.textOrder, settings.textAutoResize, settings.textResizeFactor, settings.textAnimation)
                        .addClass("loadingoverlay_text")
                        .text(settings.text);
                if (settings.textClass) {
                    data.text.addClass(settings.textClass);
                } else if (settings.textColor) {
                    data.text.css("color", settings.textColor);
                }
            }
            
            // Progress
            if (settings.progress) {
                var element = _CreateElement(data.overlay, settings.progressOrder, settings.progressAutoResize, settings.progressResizeFactor, false)
                    .addClass("loadingoverlay_progress");
                var wrapper = $("<div>")
                    .css(_css.progress_wrapper)
                    .appendTo(element);
                data.progress = {
                    bar     : $("<div>").css(_css.progress_bar).appendTo(wrapper),
                    min     : parseFloat(settings.progressMin),
                    max     : parseFloat(settings.progressMax),
                    speed   : parseInt(settings.progressSpeed, 10)
                };
                if (settings.progressClass) {
                    data.progress.bar.addClass(settings.progressClass);
                } else if (settings.progressColor) {
                    data.progress.bar.css("background", settings.progressColor);
                } 
            }
            
            // Resize
            _Resize(container, data.overlay, settings, wholePage, true);
            if (settings.resizeInterval > 0) {
                data.resizeIntervalId = setInterval(function(){
                    _Resize(container, data.overlay, settings, wholePage, false);
                }, settings.resizeInterval);
            }
            
            // Fade
            if (!settings.fade) {;
                settings.fade = [0, 0];
            } else if (settings.fade === true) {
                settings.fade = _defaults._fadeValues;
            } else if (typeof settings.fade === "string" || typeof settings.fade === "number") {
                settings.fade = [settings.fade, settings.fade];
            } else if ($.type(settings.fade) === "array" && settings.fade.length < 2) {
                settings.fade = [settings.fade[0], settings.fade[0]];
            }
            settings.fade = [parseInt(settings.fade[0], 10), parseInt(settings.fade[1], 10)]
            data.fadeOut  = settings.fade[1];
            
            // Show LoadingOverlay
            data.overlay
                    .hide()
                    .appendTo("body")
                    .fadeIn(settings.fade[0]);
        }
        data.count++;
    }
    
    function Hide(container, force){
        container   = $(container);
        var data    = container.data("loadingoverlay");
        if (typeof data === "undefined") return;
        data.count--;
        if (force || data.count <= 0) {
            if (data.resizeIntervalId) clearInterval(data.resizeIntervalId);
            data.overlay.fadeOut(data.fadeOut, function(){
                $(this).remove();
            });
            container.removeData("loadingoverlay");
        }
    }
    
    function Text(container, value){
        container   = $(container);
        var data    = container.data("loadingoverlay");
        if (typeof data === "undefined" || !data.text) return;
        if (value === false) {
            data.text.hide();
        } else {
            data.text
                    .show()
                    .text(value);
        }
    }
    
    function Progress(container, value){
        container   = $(container);
        var data    = container.data("loadingoverlay");
        if (typeof data === "undefined" || !data.progress) return;
        if (value === false) {
            data.progress.bar.hide();
        } else {
            var v = ((parseFloat(value) || 0) - data.progress.min) * 100 / (data.progress.max - data.progress.min);
            if (v < 0)   v = 0;
            if (v > 100) v = 100;
            data.progress.bar
                    .show()
                    .animate({
                        "width" : v + "%"
                    }, data.progress.speed);
        }
    }
    
    
    function _Resize(container, overlay, settings, wholePage, force){
        // Overlay
        if (!wholePage) {
            var isFixed = container.css("position") === "fixed";
            var pos     = isFixed ? container[0].getBoundingClientRect() : container.offset();            
            overlay.css({
                "position"  : isFixed ? "fixed" : "absolute",
                "top"       : pos.top + parseInt(container.css("border-top-width"), 10),
                "left"      : pos.left + parseInt(container.css("border-left-width"), 10),
                "width"     : container.innerWidth(),
                "height"    : container.innerHeight()
            });
        }
        
        // Elements
        if (settings.size) {
            var c    = wholePage ? $(window) : container;
            var size = settings.size.value;
            if (!settings.size.fixed) {
                size = Math.min(c.innerWidth(), c.innerHeight()) * size / 100;
                if (settings.maxSize && size > settings.maxSize) size = settings.maxSize;
                if (settings.minSize && size < settings.minSize) size = settings.minSize;
            }
            overlay.children(".loadingoverlay_element").each(function(){
                var $this = $(this);
                if (force || $this.data("loadingoverlay_autoresize")) {
                    var resizeFactor = $this.data("loadingoverlay_resizefactor");
                    if ($this.hasClass("loadingoverlay_fa") || $this.hasClass("loadingoverlay_text")) {
                        $this.css("font-size", (size * resizeFactor) + settings.size.units);
                    } else if ($this.hasClass("loadingoverlay_progress")) {
                        container.data("loadingoverlay").progress.bar.css({
                           "height" : (size * resizeFactor) + settings.size.units,
                           "top"    : $this.position().top 
                        }).css("top", "-=" + (size * resizeFactor * 0.5) + settings.size.units);
                    } else {
                        $this.css({
                            "width"  : (size * resizeFactor) + settings.size.units,
                            "height" : (size * resizeFactor) + settings.size.units
                        });
                    }
                }
            });
        }
    }
    
    
    function _CreateElement(overlay, order, autoResize, resizeFactor, animation){
        var element = $("<div>", {
            "class" : "loadingoverlay_element",
            "css"   : {
                "order" : order
            }
        })
        .css(_css.element)
        .data({
            "loadingoverlay_autoresize"     : autoResize,
            "loadingoverlay_resizefactor"   : resizeFactor
        })
        .appendTo(overlay);
        
        // Parse animation
        if (animation === true) animation = _animationsDefaults.time + " " + _animationsDefaults.name;
        if (typeof animation === "string") {
            var animationName;
            var animationTime;
            var parts = animation.replace(/\s\s+/g, " ").toLowerCase().split(" ");
            if (parts.length === 2 && _ValidateCssTime(parts[0]) && _ValidateAnimation(parts[1])) {
                animationName = parts[1];
                animationTime = parts[0];
            } else if (parts.length === 2 && _ValidateCssTime(parts[1]) && _ValidateAnimation(parts[0])) {
                animationName = parts[0];
                animationTime = parts[1];
            } else if (parts.length === 1 && _ValidateCssTime(parts[0])) {
                animationName = _animationsDefaults.name;
                animationTime = parts[0];
            } else if (parts.length === 1 && _ValidateAnimation(parts[0])) {
                animationName = parts[0];
                animationTime = _animationsDefaults.time;
            }
            element.css({
                "animation-name"            : "loadingoverlay_animation__" + animationName,
                "animation-duration"        : animationTime,
                "animation-timing-function" : "linear",
                "animation-iteration-count" : "infinite"
            });
        }
        
        return element;
    }
    
    function _ValidateCssTime(value){
        return !isNaN(parseFloat(value)) && (value.slice(-1) === "s" || value.slice(-2) === "ms");
    }
    
    function _ValidateAnimation(value){
        return _animationsWhitelist.indexOf(value) > -1;
    }
    
    
    function _ParseSize(value){
        if (!value || value < 0) {
            return false;
        } else if (typeof value === "string" && ["vmin", "vmax"].indexOf(value.slice(-4)) > -1) {
            return {
                fixed   : true,
                units   : value.slice(-4),
                value   : value.slice(0, -4)
            };
        } else if (typeof value === "string" && ["rem"].indexOf(value.slice(-3)) > -1) {
            return {
                fixed   : true,
                units   : value.slice(-3),
                value   : value.slice(0, -3)
            };
        } else if (typeof value === "string" && ["px", "em", "cm", "mm", "in", "pt", "pc", "vh", "vw"].indexOf(value.slice(-2)) > -1) {
            return {
                fixed   : true,
                units   : value.slice(-2),
                value   : value.slice(0, -2)
            };
        } else {
            return {
                fixed   : false,
                units   : "px",
                value   : parseFloat(value)
            }; 
        }
    }
    
    
    $(function(){
        $("head").append([
            "<style>",
                "@-webkit-keyframes loadingoverlay_animation__rotate_right {",
                  "to {",
                    "-webkit-transform : rotate(360deg);",
                            "transform : rotate(360deg);",
                  "}",
                "}",
                "@keyframes loadingoverlay_animation__rotate_right {",
                  "to {",
                    "-webkit-transform : rotate(360deg);",
                            "transform : rotate(360deg);",
                  "}",
                "}",
                
                "@-webkit-keyframes loadingoverlay_animation__rotate_left {",
                  "to {",
                    "-webkit-transform : rotate(-360deg);",
                            "transform : rotate(-360deg);",
                  "}",
                "}",
                "@keyframes loadingoverlay_animation__rotate_left {",
                  "to {",
                    "-webkit-transform : rotate(-360deg);",
                            "transform : rotate(-360deg);",
                  "}",
                "}",
                
                "@-webkit-keyframes loadingoverlay_animation__fadein {",
                  "0% {",
                            "opacity   : 0;",
                    "-webkit-transform : scale(0.1, 0.1);",
                            "transform : scale(0.1, 0.1);",
                  "}",
                  "50% {",
                            "opacity   : 1;",
                  "}",
                  "100% {",
                            "opacity   : 0;",
                    "-webkit-transform : scale(1, 1);",
                            "transform : scale(1, 1);",
                  "}",
                "}",
                "@keyframes loadingoverlay_animation__fadein {",
                  "0% {",
                            "opacity   : 0;",
                    "-webkit-transform : scale(0.1, 0.1);",
                            "transform : scale(0.1, 0.1);",
                  "}",
                  "50% {",
                            "opacity   : 1;",
                  "}",
                  "100% {",
                            "opacity   : 0;",
                    "-webkit-transform : scale(1, 1);",
                            "transform : scale(1, 1);",
                  "}",
                "}",
                
                "@-webkit-keyframes loadingoverlay_animation__pulse {",
                  "0% {",
                    "-webkit-transform : scale(0, 0);",
                            "transform : scale(0, 0);",
                  "}",
                  "50% {",
                    "-webkit-transform : scale(1, 1);",
                            "transform : scale(1, 1);",
                  "}",
                  "100% {",
                    "-webkit-transform : scale(0, 0);",
                            "transform : scale(0, 0);",
                  "}",
                "}",
                "@keyframes loadingoverlay_animation__pulse {",
                  "0% {",
                    "-webkit-transform : scale(0, 0);",
                            "transform : scale(0, 0);",
                  "}",
                  "50% {",
                    "-webkit-transform : scale(1, 1);",
                            "transform : scale(1, 1);",
                  "}",
                  "100% {",
                    "-webkit-transform : scale(0, 0);",
                            "transform : scale(0, 0);",
                  "}",
                "}",
            "</style>"
        ].join(" "));
    });
    
}));