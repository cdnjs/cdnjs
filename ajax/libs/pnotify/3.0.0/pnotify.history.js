// History
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as a module.
        define('pnotify.history', ['jquery', 'pnotify'], factory);
    } else if (typeof exports === 'object' && typeof module !== 'undefined') {
        // CommonJS
        module.exports = factory(require('jquery'), require('./pnotify'));
    } else {
        // Browser globals
        factory(root.jQuery, root.PNotify);
    }
}(this, function($, PNotify){
    var history_menu,
        history_handle_top;
    $(function(){
        $("body").on("pnotify.history-all", function(){
            // Display all notices. (Disregarding non-history notices.)
            $.each(PNotify.notices, function(){
                if (this.modules.history.inHistory) {
                    if (this.elem.is(":visible")) {
                        // The hide variable controls whether the history pull down should
                        // queue a removal timer.
                        if (this.options.hide)
                            this.queueRemove();
                    } else if (this.open)
                        this.open();
                }
            });
        }).on("pnotify.history-last", function(){
            var pushTop = (PNotify.prototype.options.stack.push === "top");

            // Look up the last history notice, and display it.
            var i = (pushTop ? 0 : -1);

            var notice;
            do {
                if (i === -1)
                    notice = PNotify.notices.slice(i);
                else
                    notice = PNotify.notices.slice(i, i+1);
                if (!notice[0])
                    return false;

                i = (pushTop ? i + 1 : i - 1);
            } while (!notice[0].modules.history.inHistory || notice[0].elem.is(":visible"));
            if (notice[0].open)
                notice[0].open();
        });
    });
    PNotify.prototype.options.history = {
        // Place the notice in the history.
        history: true,
        // Display a pull down menu to redisplay previous notices.
        menu: false,
        // Make the pull down menu fixed to the top of the viewport.
        fixed: true,
        // Maximum number of notifications to have onscreen.
        maxonscreen: Infinity,
        // The various displayed text, helps facilitating internationalization.
        labels: {
            redisplay: "Redisplay",
            all: "All",
            last: "Last"
        }
    };
    PNotify.prototype.modules.history = {
        // The history variable controls whether the notice gets redisplayed
        // by the history pull down.
        inHistory: false,

        init: function(notice, options){
            // Make sure that no notices get destroyed.
            notice.options.destroy = false;

            this.inHistory = options.history;

            if (options.menu) {
                // If there isn't a history pull down, create one.
                if (typeof history_menu === "undefined") {
                    history_menu = $("<div />", {
                        "class": "ui-pnotify-history-container "+notice.styles.hi_menu,
                        "mouseleave": function(){
                            history_menu.animate({top: "-"+history_handle_top+"px"}, {duration: 100, queue: false});
                        }
                    })
                    .append($("<div />", {"class": "ui-pnotify-history-header", "text": options.labels.redisplay}))
                    .append($("<button />", {
                            "class": "ui-pnotify-history-all "+notice.styles.hi_btn,
                            "text": options.labels.all,
                            "mouseenter": function(){
                                $(this).addClass(notice.styles.hi_btnhov);
                            },
                            "mouseleave": function(){
                                $(this).removeClass(notice.styles.hi_btnhov);
                            },
                            "click": function(){
                                $(this).trigger("pnotify.history-all");
                                return false;
                            }
                    }))
                    .append($("<button />", {
                            "class": "ui-pnotify-history-last "+notice.styles.hi_btn,
                            "text": options.labels.last,
                            "mouseenter": function(){
                                $(this).addClass(notice.styles.hi_btnhov);
                            },
                            "mouseleave": function(){
                                $(this).removeClass(notice.styles.hi_btnhov);
                            },
                            "click": function(){
                                $(this).trigger("pnotify.history-last");
                                return false;
                            }
                    }))
                    .appendTo("body");

                    // Make a handle so the user can pull down the history tab.
                    var handle = $("<span />", {
                        "class": "ui-pnotify-history-pulldown "+notice.styles.hi_hnd,
                        "mouseenter": function(){
                            history_menu.animate({top: "0"}, {duration: 100, queue: false});
                        }
                    })
                    .appendTo(history_menu);

                    // Get the top of the handle.
                    history_handle_top = handle.offset().top + 2;
                    // Hide the history pull down up to the top of the handle.
                    history_menu.css({top: "-"+history_handle_top+"px"});

                    // Apply the fixed styling.
                    if (options.fixed) {
                        history_menu.addClass('ui-pnotify-history-fixed');
                    }
                }
            }
        },
        update: function(notice, options){
            // Update values for history menu access.
            this.inHistory = options.history;
            if (options.fixed && history_menu) {
                history_menu.addClass('ui-pnotify-history-fixed');
            } else if (history_menu) {
                history_menu.removeClass('ui-pnotify-history-fixed');
            }
        },
        beforeOpen: function(notice, options){
            // Remove oldest notifications leaving only options.maxonscreen on screen
            if (PNotify.notices && (PNotify.notices.length > options.maxonscreen)) {
                // Oldest are normally in front of array, or if stack.push=="top" then
                // they are at the end of the array! (issue #98)
                var el;
                if (notice.options.stack.push !== "top")
                    el = PNotify.notices.slice(0, PNotify.notices.length - options.maxonscreen);
                else
                    el = PNotify.notices.slice(options.maxonscreen, PNotify.notices.length);

                $.each(el, function(){
                    if (this.remove)
                        this.remove();
                });
            }
        }
    };
    $.extend(PNotify.styling.jqueryui, {
        hi_menu: "ui-state-default ui-corner-bottom",
        hi_btn: "ui-state-default ui-corner-all",
        hi_btnhov: "ui-state-hover",
        hi_hnd: "ui-icon ui-icon-grip-dotted-horizontal"
    });
    $.extend(PNotify.styling.bootstrap2, {
        hi_menu: "well",
        hi_btn: "btn",
        hi_btnhov: "",
        hi_hnd: "icon-chevron-down"
    });
    $.extend(PNotify.styling.bootstrap3, {
        hi_menu: "well",
        hi_btn: "btn btn-default",
        hi_btnhov: "",
        hi_hnd: "glyphicon glyphicon-chevron-down"
    });
    $.extend(PNotify.styling.fontawesome, {
        hi_menu: "well",
        hi_btn: "btn btn-default",
        hi_btnhov: "",
        hi_hnd: "fa fa-chevron-down"
    });
}));
