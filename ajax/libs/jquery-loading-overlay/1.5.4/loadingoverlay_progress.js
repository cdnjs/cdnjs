/***************************************************************************************************
LoadingOverlay Extras - Progress
    Author          : Gaspare Sganga
    Version         : 1.5.4
    License         : MIT
    Documentation   : https://gasparesganga.com/labs/jquery-loading-overlay/
****************************************************************************************************/
var LoadingOverlayProgress = function(options){
    var _bar;
    var _text;
    var _settings = $.extend(true, {}, {
        bar     : {
            "bottom"        : "25px",
            "height"        : "20px",
            "background"    : "#9bbb59"
        },
        text    : {
            "bottom"        : "50px",
            "font"          : "14pt/1.2 sans-serif",
            "color"         : "#303030"
        }
    }, options);
    
    return {
        Init    : Init,
        Update  : Update
    };
    
    function Init(){           
        var wrapper = $("<div>", {
            class   : "loadingoverlay_progress_wrapper",
            css     : {
                "position"  : "absolute",
                "top"       : 0,
                "left"      : 0,
                "width"     : "100%",
                "height"    : "100%"
            }
        });
        _bar = $("<div>", {
            class   : "loadingoverlay_progress_bar",
            css     : $.extend(true, {
                "position"      : "absolute",
                "left"          : "0"
            }, _settings.bar)
        }).appendTo(wrapper);
        _text = $("<div>", {
            class   : "loadingoverlay_progress_text",
            css     : $.extend(true, {
                "position"      : "absolute",
                "left"          : "0",
                "text-align"    : "right",
                "white-space"   : "nowrap"
            }, _settings.text),
            text    : "0 %"
        }).appendTo(wrapper);
        Update(0);
        return wrapper;
    }
    
    function Update(value){
        if (value < 0)   value = 0;
        if (value > 100) value = 100;
        var r = {"right" : (100 - value) + "%"};
        _bar.css(r);
        _text.css(r);
        _text.text(value + "%");
    }
};