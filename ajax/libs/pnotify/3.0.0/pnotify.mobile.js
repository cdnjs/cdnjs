// Mobile
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as a module.
        define('pnotify.mobile', ['jquery', 'pnotify'], factory);
    } else if (typeof exports === 'object' && typeof module !== 'undefined') {
        // CommonJS
        module.exports = factory(require('jquery'), require('./pnotify'));
    } else {
        // Browser globals
        factory(root.jQuery, root.PNotify);
    }
}(this, function($, PNotify){
    PNotify.prototype.options.mobile = {
        // Let the user swipe the notice away.
        swipe_dismiss: true,
        // Styles the notice to look good on mobile.
        styling: true
    };
    PNotify.prototype.modules.mobile = {
        swipe_dismiss: true,

        init: function(notice, options){
            var that = this,
                origX = null,
                diffX = null,
                noticeWidth = null;

            this.swipe_dismiss = options.swipe_dismiss;
            this.doMobileStyling(notice, options);

            notice.elem.on({
                "touchstart": function(e){
                    if (!that.swipe_dismiss) {
                        return;
                    }

                    origX = e.originalEvent.touches[0].screenX;
                    noticeWidth = notice.elem.width();
                    notice.container.css("left", "0");
                },
                "touchmove": function(e){
                    if (!origX || !that.swipe_dismiss) {
                        return;
                    }

                    var curX = e.originalEvent.touches[0].screenX;

                    diffX = curX - origX;
                    var opacity = (1 - (Math.abs(diffX) / noticeWidth)) * notice.options.opacity;

                    notice.elem.css("opacity", opacity);
                    notice.container.css("left", diffX);
                },
                "touchend": function() {
                    if (!origX || !that.swipe_dismiss) {
                        return;
                    }

                    if (Math.abs(diffX) > 40) {
                        var goLeft = (diffX < 0) ? noticeWidth * -2 : noticeWidth * 2;
                        notice.elem.animate({"opacity": 0}, 100);
                        notice.container.animate({"left": goLeft}, 100);
                        notice.remove();
                    } else {
                        notice.elem.animate({"opacity": notice.options.opacity}, 100);
                        notice.container.animate({"left": 0}, 100);
                    }
                    origX = null;
                    diffX = null;
                    noticeWidth = null;
                },
                "touchcancel": function(){
                    if (!origX || !that.swipe_dismiss) {
                        return;
                    }

                    notice.elem.animate({"opacity": notice.options.opacity}, 100);
                    notice.container.animate({"left": 0}, 100);
                    origX = null;
                    diffX = null;
                    noticeWidth = null;
                }
            });
        },
        update: function(notice, options){
            this.swipe_dismiss = options.swipe_dismiss;
            this.doMobileStyling(notice, options);
        },
        doMobileStyling: function(notice, options){
            if (options.styling) {
                notice.elem.addClass("ui-pnotify-mobile-able");

                if ($(window).width() <= 480) {
                    if (!notice.options.stack.mobileOrigSpacing1) {
                        notice.options.stack.mobileOrigSpacing1 = notice.options.stack.spacing1;
                        notice.options.stack.mobileOrigSpacing2 = notice.options.stack.spacing2;
                    }
                    notice.options.stack.spacing1 = 0;
                    notice.options.stack.spacing2 = 0;
                } else if (notice.options.stack.mobileOrigSpacing1 || notice.options.stack.mobileOrigSpacing2) {
                    notice.options.stack.spacing1 = notice.options.stack.mobileOrigSpacing1;
                    delete notice.options.stack.mobileOrigSpacing1;
                    notice.options.stack.spacing2 = notice.options.stack.mobileOrigSpacing2;
                    delete notice.options.stack.mobileOrigSpacing2;
                }
            } else {
                notice.elem.removeClass("ui-pnotify-mobile-able");

                if (notice.options.stack.mobileOrigSpacing1) {
                    notice.options.stack.spacing1 = notice.options.stack.mobileOrigSpacing1;
                    delete notice.options.stack.mobileOrigSpacing1;
                }
                if (notice.options.stack.mobileOrigSpacing2) {
                    notice.options.stack.spacing2 = notice.options.stack.mobileOrigSpacing2;
                    delete notice.options.stack.mobileOrigSpacing2;
                }
            }
        }
    };
}));
