/*!
Facebox dialog module (for jQuery Dirty Forms) | v2.0.0-beta00004 | github.com/snikch/jquery.dirtyforms
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
        proceedButtonClass: '',
        proceedButtonText: 'Leave This Page',
        stayButtonClass: '',
        stayButtonText: 'Stay Here',

        // Typical Dirty Forms Properties and Methods

        // Selector for stashing the content of another dialog.
        stashSelector: '#facebox .content',
        open: function (choice, message, ignoreClass) {
            var content =
                '<h1>' + this.title + '</h1>' +
                '<p>' + message + '</p>' +
                '<p>' +
                    '<a href="#" class="dirty-proceed ' + ignoreClass + ' ' + this.proceedButtonClass + '">' + this.proceedButtonText + '</a>' +
                    '<a href="#" class="dirty-stay ' + ignoreClass + ' ' + this.stayButtonClass + '">' + this.stayButtonText + '</a>' +
                '</p>';
            $.facebox(content);

            // Bind Events
            choice.bindEnterKey = true;
            choice.staySelector = '#facebox .dirty-stay, #facebox .close, #facebox_overlay';
            choice.proceedSelector = '#facebox .dirty-proceed';

            if (choice.isDF1) {
                var close = function (decision) {
                    return function (e) {
                        if (e.type !== 'keydown' || (e.type === 'keydown' && (e.which == 27 || e.which == 13))) {
                            // Facebox hack: If we call close when returning from the stash, the
                            // stash dialog will close, so we guard against calling close in that case. 
                            if (!$.DirtyForms.dialogStash) {
                                $(document).trigger('close.facebox');
                            }
                            decision(e);
                        }
                    };
                };
                var decidingCancel = $.DirtyForms.decidingCancel;
                $(document).bind('keydown.facebox', close(decidingCancel));
                $(choice.staySelector).click(close(decidingCancel));
                $(choice.proceedSelector).click(close($.DirtyForms.decidingContinue));
            }
        },
        close: function (continuing, unstashing) {
            // Facebox hack: If we call close when returning from the stash, the
            // stash dialog will close, so we guard against calling close in that case. 
            if (!unstashing) {
                $(document).trigger('close.facebox');
            }
        },
        stash: function () {
            var isDF1 = typeof $.DirtyForms.isDeciding === 'function',
                $fb = $('#facebox'),
                $content = $fb.find('.content');

            // Store the DOM state as actual HTML DOM values
            $content.find('datalist,select,textarea,input').not('[type="button"],[type="submit"],[type="reset"],[type="image"]').each(function () {
                storeFieldValue($(this));
            });

            return ($.trim($fb.html()) === '' || $fb.css('display') != 'block') ?
                false :
                isDF1 ?
                    $content.clone(true) :
                    $content.children().clone(true);
        },
        unstash: function (stash, ev) {
            $.facebox(stash);
        },

        // Support for Dirty Forms < 2.0
        fire: function (message, title) {
            this.title = title;
            this.open({ isDF1: true }, message, $.DirtyForms.ignoreClass);
        },
        selector: $.DirtyForms.dialog.stashSelector,

        // Support for Dirty Forms < 1.2
        bind: function () {
        },
        refire: function (content, ev) {
            this.unstash(content, ev);
        }
    };

    var storeFieldValue = function ($field) {
        if ($field.is('select,datalist')) {
            $field.find('option').each(function () {
                var $option = $(this);
                if ($option.is(':selected')) {
                    $option.attr('selected', 'selected');
                } else {
                    $option.removeAttr('selected');
                }
            });
        } else if ($field.is(":checkbox,:radio")) {
            if ($field.is(':checked')) {
                $field.attr('checked', 'checked');
            } else {
                $field.removeAttr('checked');
            }
        } else if ($field.is('textarea')) {
            $field.text($field.val());
        } else {
            $field.attr('value', $field.val());
        }
    };

}));
