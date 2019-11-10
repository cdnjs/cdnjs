/*!
PNotify dialog module (for jQuery Dirty Forms) | v2.0.0-beta00006 | github.com/snikch/jquery.dirtyforms
(c) 2015 Shad Storhaug
License MIT
*/

(function($, window, document, undefined) {
    // Can't use ECMAScript 5's strict mode because several apps 
    // including ASP.NET trace the stack via arguments.caller.callee 
    // and Firefox dies if you try to trace through "use strict" call chains. 
    // See jQuery issue (#13335)
    // Support: Firefox 18+
    //"use strict";

    var modal_overlay,
        notice,
        isPN2 = typeof PNotify === 'function';

    $.DirtyForms.dialog = {

        // Custom properties and methods to allow overriding (may differ per dialog)
        title: 'Are you sure you want to do that?',
        class: 'dirty-dialog',
        proceedButtonText: 'Leave This Page',
        stayButtonText: 'Stay Here',
        styling: 'bootstrap3',
        width: '330',

        // Typical Dirty Forms Properties and Methods
        open: function (choice, message, ignoreClass) {
            var content = {
                title: this.title,
                hide: false,
                styling: this.styling,
                width: this.width,

                // 2.x hide closer and sticker
                buttons: {
                    closer: false,
                    sticker: false
                },
                // 1.x hide closer and sticker
                closer: false,
                sticker: false,

                text: '<span class="' + this.class + '">' +
                        '<p>' + message + '</p>' +
                        '<span style="display:block;text-align:center;">' +
                            '<button type="button" class="dirty-proceed ' + ignoreClass + '">' + this.proceedButtonText + '</button> ' +
                            '<button type="button" class="dirty-stay ' + ignoreClass + '">' + this.stayButtonText + '</button>' +
                        '</span>' +
                    '</span>',
                before_open: function (PNotify) {
                    if (isPN2) {
                        // Position this notice in the center of the screen.
                        PNotify.get().css({
                            "top": ($(window).height() / 2) - (PNotify.get().height() / 2),
                            "left": ($(window).width() / 2) - (PNotify.get().width() / 2)
                        });
                    }

                    // Make a modal screen overlay.
                    if (modal_overlay) modal_overlay.fadeIn("fast");
                    else modal_overlay = $("<div />", {
                        "class": "ui-widget-overlay",
                        "css": {
                            "display": "none",
                            "position": "fixed",
                            "top": "0",
                            "bottom": "0",
                            "right": "0",
                            "left": "0"
                        }
                    }).appendTo("body").fadeIn("fast");
                }
            };

            // Patch for PNotify 1.x
            notice = isPN2 ? new PNotify(content) : $.pnotify(content);

            // Bind Events
            choice.bindEnterKey = true;
            choice.proceedSelector = '.' + this.class + ' .dirty-proceed';
            choice.staySelector = '.' + this.class + ' .dirty-stay,.ui-widget-overlay';

            // Support for Dirty Forms < 2.0
            if (choice.isDF1) {
                var close = function (decision) {
                    return function (e) {
                        if (e.type !== 'keydown' || (e.type === 'keydown' && (e.which == 27 || e.which == 13))) {
                            notice.remove();
                            modal_overlay.fadeOut("fast");
                            decision(e);
                            return false;
                        }
                    };
                };
                // Trap the escape key and force a close. Cancel it so PNotify doesn't intercept it.
                var decidingCancel = $.DirtyForms.decidingCancel;
                $(document).keydown(close(decidingCancel));
                $(choice.staySelector).click(close(decidingCancel));
                $(choice.proceedSelector).click(close($.DirtyForms.decidingContinue));
            }
        },
        close: function () {
            notice.remove();
            modal_overlay.fadeOut("fast");
        },

        // Support for Dirty Forms < 2.0
        fire: function (message, title) {
            this.title = title;
            this.open({ isDF1: true }, message, $.DirtyForms.ignoreClass);
        },

        // Support for Dirty Forms < 1.2
        bind: function () {
        },
        stash: function () {
            return false;
        },
        refire: function () {
            return false;
        },
        selector: 'no-op'
    };

})(jQuery, window, document);