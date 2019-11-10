/*!
jQuery UI dialog module (for jQuery Dirty Forms) | v2.0.0-beta00002 | github.com/snikch/jquery.dirtyforms
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

    // Create a local reference for simplicity
    var $dialog = $('<div style="display:none;" />');
    $('body').append($dialog);

    $.DirtyForms.dialog = {
        // Custom properties and methods to allow overriding (may differ per dialog)
        title: 'Are you sure you want to do that?',
        proceedButtonText: 'Leave This Page',
        stayButtonText: 'Stay Here',
        preMessageText: '<span class="ui-icon ui-icon-alert" style="float:left; margin:2px 7px 25px 0;"></span>',
        postMessageText: '',
        width: 430,

        // Typical Dirty Forms Properties and Methods
        open: function (choice, message) {
            var commit = choice.isDF1 ? $.DirtyForms.choiceCommit : choice.commit;

            $dialog.dialog({
                open: function () {
                    // Set the focus on close button
                    $(this).parents('.ui-dialog').find('.ui-dialog-buttonpane button:eq(1)').focus();
                },
                close: commit,
                title: this.title,
                width: this.width,
                modal: true,
                buttons: [
                    {
                        text: this.proceedButtonText,
                        click: function () {
                            choice.proceed = $.DirtyForms.choiceContinue = true;
                            $(this).dialog('close');
                        }
                    },
                    {
                        text: this.stayButtonText,
                        click: function () {
                            $(this).dialog('close');
                        }
                    }
                ]
            });
            $dialog.html(this.preMessageText + message + this.postMessageText);

            // Support for Dirty Forms < 2.0
            if (choice.isDF1) {
                var onEscKey = function (e) {
                    if (e.which == 27) {
                        e.preventDefault();
                        $dialog.dialog('close');
                        return false;
                    }
                };

                // Trap the escape key and force a close. Cancel it so jQuery UI doesn't intercept it.
                // This will fire the dialogclose event to commit the choice (which defaults to false).
                $(document).unbind('keydown', onEscKey).keydown(onEscKey);
            }
        },
        close: function () {
            $dialog.dialog('close');
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
