/***************************************************************************************************
LoadingOverlay - A flexible loading overlay jQuery plugin
    Author          : Gaspare Sganga
    Version         : 1.1
    License         : MIT
    Documentation   : http://gasparesganga.com/labs/jquery-loading-overlay
****************************************************************************************************/
(function($, undefined){
    var _defaults = {
        color           : "rgba(255, 255, 255, 0.8)",
        custom          : "",
        fontawesome     : "",
        image           : "loading.gif",
        maxSize         : "100px",
        minSize         : "20px",
        resizeInterval  : 0,
        size            : "50%"
    };

    $.LoadingOverlaySetup = function(settings){
        $.extend(true, _defaults, settings);
    };

    $.LoadingOverlay = function(action, options){
        switch (action.toLowerCase()) {
            case "show":
                var settings = $.extend(true, {}, _defaults, options);
                _Show("body", settings);
                break;
                
            case "hide":
                _Hide("body", options);
                break;
        }
    };

    $.fn.LoadingOverlay = function(action, options){
        switch (action.toLowerCase()) {
            case "show":
                var settings = $.extend(true, {}, _defaults, options);
                return this.each(function(){
                    _Show(this, settings);
                });
                
            case "hide":
                return this.each(function(){
                    _Hide(this, options);
                });
        }
    };


    function _Show(container, settings){
        container = $(container);
        var fixed = container.is("body");
        var count = container.data("LoadingOverlayCount");
        if (count === undefined) count = 0;
        if (count == 0) {
            var overlay = $("<div>", {
                class   : "loadingoverlay",
                css     : {
                    "background-color"  : settings.color,
                    "display"           : "flex",
                    "flex-direction"    : "column",
                    "align-items"       : "center",
                    "justify-content"   : "center"
                }
            });
            if (settings.image) overlay.css({
                "background-image"      : "url("+settings.image+")",
                "background-position"   : "center center",
                "background-repeat"     : "no-repeat"
            });
            if (settings.fontawesome) $("<div>", {
                class   : "loadingoverlay_fontawesome "+settings.fontawesome
            }).appendTo(overlay);
            if (settings.custom) $(settings.custom).appendTo(overlay);
            if (fixed) {
                overlay.css({
                    "position"  : "fixed",
                    "top"       : 0,
                    "left"      : 0,
                    "width"     : "100%",
                    "height"    : "100%"
                });
            } else {
                overlay.css({
                    "position"  : "absolute",
                    "top"       : 0,
                    "left"      : 0
                });
                if (container.css("position") == "static") {
                    overlay.css({
                        "top"   : container.position().top  + parseInt(container.css("margin-top"))  + parseInt(container.css("border-top-width")),
                        "left"  : container.position().left + parseInt(container.css("margin-left")) + parseInt(container.css("border-left-width"))
                    });
                }
            }
            _Resize(container, overlay, settings, fixed);
            if (settings.resizeInterval > 0) {
                var resizeIntervalId = setInterval(function(){
                    _Resize(container, overlay, settings, fixed);
                }, settings.resizeInterval);
                container.data("LoadingOverlayResizeIntervalId", resizeIntervalId);
            }
            overlay.appendTo(container);
        }
        count++;
        container.data("LoadingOverlayCount", count);
    }

    function _Hide(container, force){
        container = $(container);
        var count = container.data("LoadingOverlayCount");
        if (count === undefined) return;
        count--;
        if (force || count <= 0) {
            var resizeIntervalId = container.data("LoadingOverlayResizeIntervalId");
            if (resizeIntervalId) clearInterval(resizeIntervalId);
            container.removeData("LoadingOverlayCount").removeData("LoadingOverlayResizeIntervalId");
            container.children(".loadingoverlay").remove();
        } else {
            container.data("LoadingOverlayCount", count);
        }
    }

    function _Resize(container, overlay, settings, fixed){
        if (!fixed) overlay.css({
            "width"     : container.innerWidth(),
            "height"    : container.innerHeight()
        });
        var size = "auto";
        if (settings.size && settings.size != "auto") {
            var c = fixed ? $(window) : container;
            size = Math.min(c.innerWidth(), c.innerHeight()) * parseFloat(settings.size) / 100;
            if (settings.maxSize && size > parseInt(settings.maxSize)) size = parseInt(settings.maxSize)+"px";
            if (settings.minSize && size < parseInt(settings.minSize)) size = parseInt(settings.minSize)+"px";
        }
        overlay.css("background-size", size);
        overlay.children(".loadingoverlay_fontawesome").css("font-size", size);
    }

}(jQuery));