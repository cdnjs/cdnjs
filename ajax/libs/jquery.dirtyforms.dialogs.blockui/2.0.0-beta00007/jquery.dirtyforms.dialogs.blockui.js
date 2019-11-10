/*!
BlockUI dialog module (for jQuery Dirty Forms) | v2.0.0-beta00007 | github.com/snikch/jquery.dirtyforms
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

    $.DirtyForms.dialog = {
        // Custom properties and methods to allow overriding (may differ per dialog)
        title: 'Are you sure you want to do that?',
        class: 'dirty-dialog',
        proceedButtonText: 'Leave This Page',
        stayButtonText: 'Stay Here',
        width: '400px',
        padding: '10px',
        color: '#000',
        border: '3px solid #aaa',
        backgroundColor: '#fff',
        overlayOpacity: 0.5,

        // Typical Dirty Forms Properties and Methods
        open: function (choice, message) {
            $.blockUI({
                message: '<span class="' + this.class + '">' +
                        '<h3>' + this.title + '</h3>' +
                        '<p>' + message + '</p>' +
                        '<span>' +
                            '<button type="button" class="dirty-proceed">' + this.proceedButtonText + '</button> ' +
                            '<button type="button" class="dirty-stay">' + this.stayButtonText + '</button>' +
                        '</span>' +
                    '</span>',
                css: {
                    width: this.width,
                    padding: this.padding,
                    color: this.color,
                    border: this.border,
                    backgroundColor: this.backgroundColor,
                    cursor: 'auto'
                },
                overlayCSS: {
                    cursor: 'auto',
                    opacity: this.overlayOpacity
                }
            });

            // Bind Events
            choice.bindEnterKey = true;
            choice.proceedSelector = '.' + this.class + ' .dirty-proceed';
            choice.staySelector = '.' + this.class + ' .dirty-stay,.blockOverlay';

            // Support for Dirty Forms < 2.0
            if (choice.isDF1) {
                var close = function (decision) {
                    return function (e) {
                        if (e.type !== 'keydown' || (e.type === 'keydown' && (e.which == 27 || e.which == 13))) {
                            $.unblockUI();
                            decision(e);
                            return false;
                        }
                    };
                };
                var decidingCancel = $.DirtyForms.decidingCancel;
                $(document).keydown(close(decidingCancel));
                $(choice.staySelector).click(close(decidingCancel));
                $(choice.proceedSelector).click(close($.DirtyForms.decidingContinue));
            }
        },
        close: function () {
            $.unblockUI();
        },

        // Support for Dirty Forms < 2.0
        fire: function (message, title) {
            this.title = title;
            this.open({ isDF1: true }, message);
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
