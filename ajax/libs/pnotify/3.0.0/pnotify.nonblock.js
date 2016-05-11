// Nonblock
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as a module.
        define('pnotify.nonblock', ['jquery', 'pnotify'], factory);
    } else if (typeof exports === 'object' && typeof module !== 'undefined') {
        // CommonJS
        module.exports = factory(require('jquery'), require('./pnotify'));
    } else {
        // Browser globals
        factory(root.jQuery, root.PNotify);
    }
}(this, function($, PNotify){
    // Some useful regexes.
    var re_on = /^on/,
        re_mouse_events = /^(dbl)?click$|^mouse(move|down|up|over|out|enter|leave)$|^contextmenu$/,
        re_ui_events = /^(focus|blur|select|change|reset)$|^key(press|down|up)$/,
        re_html_events = /^(scroll|resize|(un)?load|abort|error)$/;
    // Fire a DOM event.
    var dom_event = function(e, orig_e){
        var event_object;
        e = e.toLowerCase();
        if (document.createEvent && this.dispatchEvent) {
            // FireFox, Opera, Safari, Chrome
            e = e.replace(re_on, '');
            if (e.match(re_mouse_events)) {
                // This allows the click event to fire on the notice. There is
                // probably a much better way to do it.
                $(this).offset();
                event_object = document.createEvent("MouseEvents");
                event_object.initMouseEvent(
                    e, orig_e.bubbles, orig_e.cancelable, orig_e.view, orig_e.detail,
                    orig_e.screenX, orig_e.screenY, orig_e.clientX, orig_e.clientY,
                    orig_e.ctrlKey, orig_e.altKey, orig_e.shiftKey, orig_e.metaKey, orig_e.button, orig_e.relatedTarget
                );
            } else if (e.match(re_ui_events)) {
                event_object = document.createEvent("UIEvents");
                event_object.initUIEvent(e, orig_e.bubbles, orig_e.cancelable, orig_e.view, orig_e.detail);
            } else if (e.match(re_html_events)) {
                event_object = document.createEvent("HTMLEvents");
                event_object.initEvent(e, orig_e.bubbles, orig_e.cancelable);
            }
            if (!event_object) return;
            this.dispatchEvent(event_object);
        } else {
            // Internet Explorer
            if (!e.match(re_on)) e = "on"+e;
            event_object = document.createEventObject(orig_e);
            this.fireEvent(e, event_object);
        }
    };


    // This keeps track of the last element the mouse was over, so
    // mouseleave, mouseenter, etc can be called.
    var nonblock_last_elem;
    // This is used to pass events through the notice if it is non-blocking.
    var nonblock_pass = function(notice, e, e_name){
        notice.elem.addClass("ui-pnotify-nonblock-hide");
        var element_below = document.elementFromPoint(e.clientX, e.clientY);
        notice.elem.removeClass("ui-pnotify-nonblock-hide");
        var jelement_below = $(element_below);
        var cursor_style = jelement_below.css("cursor");
        if (cursor_style === "auto" && element_below.tagName === "A") {
            cursor_style = "pointer";
        }
        notice.elem.css("cursor", cursor_style !== "auto" ? cursor_style : "default");
        // If the element changed, call mouseenter, mouseleave, etc.
        if (!nonblock_last_elem || nonblock_last_elem.get(0) != element_below) {
            if (nonblock_last_elem) {
                dom_event.call(nonblock_last_elem.get(0), "mouseleave", e.originalEvent);
                dom_event.call(nonblock_last_elem.get(0), "mouseout", e.originalEvent);
            }
            dom_event.call(element_below, "mouseenter", e.originalEvent);
            dom_event.call(element_below, "mouseover", e.originalEvent);
        }
        dom_event.call(element_below, e_name, e.originalEvent);
        // Remember the latest element the mouse was over.
        nonblock_last_elem = jelement_below;
    };


    PNotify.prototype.options.nonblock = {
        // Create a non-blocking notice. It lets the user click elements underneath it.
        nonblock: false
    };
    PNotify.prototype.modules.nonblock = {
        init: function(notice, options){
            var that = this;
            notice.elem.on({
                "mouseenter": function(e){
                    if (that.options.nonblock) {
                        e.stopPropagation();
                    }
                    if (that.options.nonblock) {
                        // If it's non-blocking, animate to the other opacity.
                        notice.elem.addClass("ui-pnotify-nonblock-fade");
                    }
                },
                "mouseleave": function(e){
                    if (that.options.nonblock) {
                        e.stopPropagation();
                    }
                    nonblock_last_elem = null;
                    notice.elem.css("cursor", "auto");
                    // Animate back to the normal opacity.
                    if (that.options.nonblock && notice.animating !== "out") {
                        notice.elem.removeClass("ui-pnotify-nonblock-fade");
                    }
                },
                "mouseover": function(e){
                    if (that.options.nonblock) {
                        e.stopPropagation();
                    }
                },
                "mouseout": function(e){
                    if (that.options.nonblock) {
                        e.stopPropagation();
                    }
                },
                "mousemove": function(e){
                    if (that.options.nonblock) {
                        e.stopPropagation();
                        nonblock_pass(notice, e, "onmousemove");
                    }
                },
                "mousedown": function(e){
                    if (that.options.nonblock) {
                        e.stopPropagation();
                        e.preventDefault();
                        nonblock_pass(notice, e, "onmousedown");
                    }
                },
                "mouseup": function(e){
                    if (that.options.nonblock) {
                        e.stopPropagation();
                        e.preventDefault();
                        nonblock_pass(notice, e, "onmouseup");
                    }
                },
                "click": function(e){
                    if (that.options.nonblock) {
                        e.stopPropagation();
                        nonblock_pass(notice, e, "onclick");
                    }
                },
                "dblclick": function(e){
                    if (that.options.nonblock) {
                        e.stopPropagation();
                        nonblock_pass(notice, e, "ondblclick");
                    }
                }
            });
        }
    };
}));
