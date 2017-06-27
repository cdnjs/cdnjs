/*!
BlockUI dialog module (for jQuery Dirty Forms) | v2.0.0-beta00001 | github.com/snikch/jquery.dirtyforms
(c) 2015 Shad Storhaug
License MIT
*/

// Support for UMD: https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js
// This allows for tools such as Browserify to compose the components together into a single HTTP request.
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'), window, document);
    } else {
        // Browser globals
        factory(jQuery, window, document);
    }
}(function ($, window, document, undefined) {
    // Use ECMAScript 5's strict mode
    "use strict";

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

}));
