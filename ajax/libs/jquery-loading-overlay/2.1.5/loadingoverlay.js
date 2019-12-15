/***************************************************************************************************
LoadingOverlay - A flexible loading overlay jQuery plugin
    Author          : Gaspare Sganga
    Version         : 2.1.5
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
        image                   : "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'><circle r='80' cx='500' cy='90'/><circle r='80' cx='500' cy='910'/><circle r='80' cx='90' cy='500'/><circle r='80' cx='910' cy='500'/><circle r='80' cx='212' cy='212'/><circle r='80' cx='788' cy='212'/><circle r='80' cx='212' cy='788'/><circle r='80' cx='788' cy='788'/></svg>",
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
        progressFixedPosition   : "",
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
        progress_fixed : {
            "position"          : "absolute",
            "left"              : "0",
            "width"             : "100%"
        },
        progress_wrapper : {
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
        "container"         : undefined,
        "settings"          : undefined,
        "wholePage"         : undefined,
        "resizeIntervalId"  : undefined,
        "text"              : undefined,
        "progress"          : undefined
    };
    
    // Whitelists
    var _whitelists = {
        animations : [
            "rotate_right",
            "rotate_left",
            "fadein",
            "pulse"
        ],
        progressPosition : [
            "top",
            "bottom"
        ]
    };
    
    // Default Values
    var _defaultValues = {
        animations : {
            name    : "rotate_right",
            time    : "2000ms"
        },
        fade : [400, 200]
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
                
            case "resize":
                Resize("body", options);
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
                
             case "resize":
                return this.each(function(){
                    Resize(this, options);
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
        
        var overlay = _GetOverlay(container);
        var data    = _GetData(container);
        if (data === false) {
            // Init data
            data = $.extend({}, _dataTemplate);
            data.container = container;
            data.wholePage = container.is("body");
            
            // Overlay
            overlay = $("<div>", {
                "class" : "loadingoverlay"
            })
            .css(_css.overlay)
            .css("flex-direction", settings.direction.toLowerCase() === "row" ? "row" : "column");
            if (settings.backgroundClass) {
                overlay.addClass(settings.backgroundClass);
            } else {
                overlay.css("background", settings.background);
            }
            if (data.wholePage) {
                overlay.css({
                    "position"  : "fixed",
                    "top"       : 0,
                    "left"      : 0,
                    "width"     : "100%",
                    "height"    : "100%"
                });
            }
            if (typeof settings.zIndex !== "undefined") overlay.css("z-index", settings.zIndex);
            
            // Image
            if (settings.image) {
                if ($.isArray(settings.imageColor)) {
                    if (settings.imageColor.length === 0) {
                        settings.imageColor = false;
                    } else if (settings.imageColor.length  === 1) {
                        settings.imageColor = {
                            "fill"  : settings.imageColor[0]
                        };
                    } else {
                        settings.imageColor = {
                            "fill"      : settings.imageColor[0],
                            "stroke"    : settings.imageColor[1]
                        };
                    }
                } else if (settings.imageColor) {
                    settings.imageColor = {
                        "fill"  : settings.imageColor
                    };
                }
                var element = _CreateElement(overlay, settings.imageOrder, settings.imageAutoResize, settings.imageResizeFactor, settings.imageAnimation);
                if (settings.image.slice(0, 4).toLowerCase() === "<svg" && settings.image.slice(-6).toLowerCase() === "</svg>") {
                    // Inline SVG
                    element.append(settings.image);
                    element.children().css(_css.element_svg);
                    if (!settings.imageClass && settings.imageColor) element.find("*").css(settings.imageColor);
                } else if (settings.image.slice(-4).toLowerCase() === ".svg" || settings.image.slice(0, 14).toLowerCase() === "data:image/svg") {
                    // SVG file or base64-encoded SVG
                    $.ajax({
                        url         : settings.image,
                        type        : "GET",
                        dataType    : "html",
                        global      : false
                    }).done(function(data){
                        element.html(data);
                        element.children().css(_css.element_svg);
                        if (!settings.imageClass && settings.imageColor) element.find("*").css(settings.imageColor);
                    });
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
                var element = _CreateElement(overlay, settings.fontawesomeOrder, settings.fontawesomeAutoResize, settings.fontawesomeResizeFactor, settings.fontawesomeAnimation)
                    .addClass("loadingoverlay_fa");
                $("<div>", {
                    "class" : settings.fontawesome
                }).appendTo(element);
                if (settings.fontawesomeColor) element.css("color", settings.fontawesomeColor);
            }
            
            // Custom
            if (settings.custom) {
                var element = _CreateElement(overlay, settings.customOrder, settings.customAutoResize, settings.customResizeFactor, settings.customAnimation)
                    .append(settings.custom);
            }
            
            // Text
            if (settings.text) {
                data.text = _CreateElement(overlay, settings.textOrder, settings.textAutoResize, settings.textResizeFactor, settings.textAnimation)
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
                var element = _CreateElement(overlay, settings.progressOrder, settings.progressAutoResize, settings.progressResizeFactor, false)
                    .addClass("loadingoverlay_progress");
                var wrapper = $("<div>")
                    .css(_css.progress_wrapper)
                    .appendTo(element);
                data.progress = {
                    bar     : $("<div>").css(_css.progress_bar).appendTo(wrapper),
                    fixed   : false,
                    margin  : 0,
                    min     : parseFloat(settings.progressMin),
                    max     : parseFloat(settings.progressMax),
                    speed   : parseInt(settings.progressSpeed, 10)
                };
                var progressPositionParts = (settings.progressFixedPosition + "").replace(/\s\s+/g, " ").toLowerCase().split(" ");
                if (progressPositionParts.length === 2 && _ValidateProgressPosition(progressPositionParts[0])) {
                    data.progress.fixed     = progressPositionParts[0];
                    data.progress.margin    = _ParseSize(progressPositionParts[1]);
                } else if (progressPositionParts.length === 2 && _ValidateProgressPosition(progressPositionParts[1])) {
                    data.progress.fixed     = progressPositionParts[1];
                    data.progress.margin    = _ParseSize(progressPositionParts[0]);
                } else if (progressPositionParts.length === 1 && _ValidateProgressPosition(progressPositionParts[0])) {
                    data.progress.fixed     = progressPositionParts[0];
                    data.progress.margin    = 0;
                }
                if (data.progress.fixed === "top") {
                    element
                        .css(_css.progress_fixed)
                        .css("top", data.progress.margin ? data.progress.margin.value + (data.progress.margin.fixed ? data.progress.margin.units : "%") : 0);
                } else if (data.progress.fixed === "bottom") {
                    element
                        .css(_css.progress_fixed)
                        .css("top", "auto");
                }
                if (settings.progressClass) {
                    data.progress.bar.addClass(settings.progressClass);
                } else if (settings.progressColor) {
                    data.progress.bar.css("background", settings.progressColor);
                } 
            }
            
            // Fade
            if (!settings.fade) {
                settings.fade = [0, 0];
            } else if (settings.fade === true) {
                settings.fade = _defaultValues.fade;
            } else if (typeof settings.fade === "string" || typeof settings.fade === "number") {
                settings.fade = [settings.fade, settings.fade];
            } else if ($.isArray(settings.fade) && settings.fade.length < 2) {
                settings.fade = [settings.fade[0], settings.fade[0]];
            }
            settings.fade = [parseInt(settings.fade[0], 10), parseInt(settings.fade[1], 10)]
            
            
            // Save settings
            data.settings = settings;
            // Save data
            overlay.data("loadingoverlay_data", data);
            // Save reference to overlay
            container.data("loadingoverlay", overlay);
            
            
            // Resize
            overlay
                .fadeTo(0, 0.01)
                .appendTo("body");
            _IntervalResize(container, true);
            if (settings.resizeInterval > 0) {
                data.resizeIntervalId = setInterval(function(){
                    _IntervalResize(container, false);
                }, settings.resizeInterval);
            }
            
            // Show LoadingOverlay
            overlay.fadeTo(settings.fade[0], 1);
        }
        data.count++;
    }
    
    function Hide(container, force){
        container   = $(container);
        var overlay = _GetOverlay(container);
        var data    = _GetData(container);
        if (data === false) return;
        
        data.count--;
        if (force || data.count <= 0) {
            if (data.resizeIntervalId) clearInterval(data.resizeIntervalId);
            overlay.fadeOut(data.settings.fade[1], function(){
                $(this).remove();
            });
            container.removeData("loadingoverlay");
        }
    }
    
    function Resize(container){
        _IntervalResize($(container), true);
    }
    
    function Text(container, value){
        container   = $(container);
        var data    = _GetData(container);
        if (data === false || !data.text) return;
        
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
        var data    = _GetData(container);
        if (data === false || !data.progress) return;
        
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
    
    
    function _IntervalResize(container, force){
        var overlay = _GetOverlay(container);
        var data    = _GetData(container);
        if (data === false) return;
        
        // Overlay
        if (!data.wholePage) {
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
        if (data.settings.size) {
            var c    = data.wholePage ? $(window) : container;
            var size = data.settings.size.value;
            if (!data.settings.size.fixed) {
                size = Math.min(c.innerWidth(), c.innerHeight()) * size / 100;
                if (data.settings.maxSize && size > data.settings.maxSize) size = data.settings.maxSize;
                if (data.settings.minSize && size < data.settings.minSize) size = data.settings.minSize;
            }
            overlay.children(".loadingoverlay_element").each(function(){
                var $this = $(this);
                if (force || $this.data("loadingoverlay_autoresize")) {
                    var resizeFactor = $this.data("loadingoverlay_resizefactor");
                    if ($this.hasClass("loadingoverlay_fa") || $this.hasClass("loadingoverlay_text")) {
                        $this.css("font-size", (size * resizeFactor) + data.settings.size.units);
                    } else if ($this.hasClass("loadingoverlay_progress")) {
                        data.progress.bar.css("height", (size * resizeFactor) + data.settings.size.units);
                        if (!data.progress.fixed) {
                            data.progress.bar
                                .css("top", $this.position().top)
                                .css("top", "-=" + (size * resizeFactor * 0.5) + data.settings.size.units);
                        } else if (data.progress.fixed === "bottom") {
                            $this
                                .css("bottom", data.progress.margin ? data.progress.margin.value + (data.progress.margin.fixed ? data.progress.margin.units : "%") : 0)
                                .css("bottom", "+=" + (size * resizeFactor) + data.settings.size.units);
                        }
                    } else {
                        $this.css({
                            "width"  : (size * resizeFactor) + data.settings.size.units,
                            "height" : (size * resizeFactor) + data.settings.size.units
                        });
                    }
                }
            });
        }
    }
    
    
    function _GetOverlay(container){
        return container.data("loadingoverlay");
    }
    
    function _GetData(container){
        var overlay = _GetOverlay(container);
        var data    = (typeof overlay === "undefined") ? undefined : overlay.data("loadingoverlay_data");
        if (typeof data === "undefined") {
            // Clean DOM
            $(".loadingoverlay").each(function(){
                var $this   = $(this);
                var data    = $this.data("loadingoverlay_data");
                if (!document.body.contains(data.container[0])) {
                    if (data.resizeIntervalId) clearInterval(data.resizeIntervalId);
                    $this.remove();
                }
            });
            return false;
        } else {
            overlay.toggle(container.is(":visible"));
            return data;
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
        if (animation === true) animation = _defaultValues.animations.time + " " + _defaultValues.animations.name;
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
                animationName = _defaultValues.animations.name;
                animationTime = parts[0];
            } else if (parts.length === 1 && _ValidateAnimation(parts[0])) {
                animationName = parts[0];
                animationTime = _defaultValues.animations.time;
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
        return _whitelists.animations.indexOf(value) > -1;
    }
    
    function _ValidateProgressPosition(value){
        return _whitelists.progressPosition.indexOf(value) > -1;
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