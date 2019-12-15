/**
 * Module for displaying "Waiting for..." dialog using Bootstrap
 *
 * @author Eugene Maslovich <ehpc@em42.ru>
 */

(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function ($) {
            return (root.waitingDialog = factory($));
        });
    }
    else {
        root.waitingDialog = root.waitingDialog || factory(root.jQuery);
    }

}(this, function ($) {
    'use strict';

    /**
     * Dialog DOM constructor
     */
    function constructDialog($dialog, settings) {
        // Deleting previous incarnation of the dialog
        if ($dialog) {
            $dialog.remove();
        }
        var nonceAttr = settings.nonce === null ? '' : ' nonce="' + settings.nonce + '"',
            elem = $.parseHTML(
                '<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;"' + nonceAttr + '>' +
                    '<div class="modal-dialog modal-m">' +
                        '<div class="modal-content">' +
                            '<div class="modal-header" style="display: none;"' + nonceAttr + '></div>' +
                            '<div class="modal-body">' +
                                '<div class="progress progress-striped active" style="margin-bottom:0;"' + nonceAttr + '>' +
                                    '<div class="progress-bar" style="width: 100%"' + nonceAttr + '></div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
        return $(elem);
    }

    var $dialog, // Dialog object
        settings; // Dialog settings

    return {
        /**
         * Opens our dialog
         * @param message Custom message
         * @param options Custom options:
         *   options.headerText - if the option is set to boolean false,
         *     it will hide the header and "message" will be set in a paragraph above the progress bar.
         *     When headerText is a not-empty string, "message" becomes a content
         *     above the progress bar and headerText string will be set as a text inside the H3;
         *   options.headerSize - this will generate a heading corresponding to the size number. Like <h1>, <h2>, <h3> etc;
         *   options.headerClass - extra class(es) for the header tag;
         *   options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
         *   options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning";
         *   options.contentElement - determines the tag of the content element.
         *     Defaults to "p", which will generate a <p> tag;
         *   options.contentClass - extra class(es) for the content tag.
         */
        show: function (message, options) {
            // Assigning defaults
            if (typeof options === 'undefined') {
                options = {};
            }
            if (typeof message === 'undefined') {
                message = 'Loading';
            }
            settings = $.extend({
                headerText: '',
                headerSize: 3,
                headerClass: '',
                dialogSize: 'm',
                progressType: '',
                contentElement: 'p',
                contentClass: 'content',
                onHide: null, // This callback runs after the dialog was hidden
                onShow: null, // This callback runs after the dialog was shown
                nonce: null // Nonce to permit inline styles
            }, options);

            var $headerTag, $contentTag;

            $dialog = constructDialog($dialog, settings);

            // Configuring dialog
            $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
            $dialog.find('.progress-bar').attr('class', 'progress-bar progress-bar-striped progress-bar-animated');
            if (settings.progressType) {
                $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
                $dialog.find('.progress-bar').addClass('bg-' + settings.progressType);
            }

            // Generate header tag
            $headerTag = $('<h' + settings.headerSize + ' />');
            $headerTag.css({ 'margin': 0 });
            if (settings.headerClass) {
                $headerTag.addClass(settings.headerClass);
            }

            // Generate content tag
            $contentTag = $('<' + settings.contentElement + ' />');
            if (settings.contentClass) {
                $contentTag.addClass(settings.contentClass);
            }

            if (settings.headerText === false) {
                $contentTag.html(message);
                $dialog.find('.modal-body').prepend($contentTag);
            }
            else if (settings.headerText) {
                $headerTag.html(settings.headerText);
                $dialog.find('.modal-header').html($headerTag).show();

                $contentTag.html(message);
                $dialog.find('.modal-body').prepend($contentTag);
            }
            else {
                $headerTag.html(message);
                $dialog.find('.modal-header').html($headerTag).show();
            }

            // Adding callbacks
            if (typeof settings.onHide === 'function') {
                $dialog.off('hidden.bs.modal').on('hidden.bs.modal', function () {
                    settings.onHide.call($dialog);
                });
            }
            if (typeof settings.onShow === 'function') {
                $dialog.off('shown.bs.modal').on('shown.bs.modal', function () {
                    settings.onShow.call($dialog);
                });
            }
            // Opening dialog
            $dialog.modal();
            // Trace if dialog is shown
            $dialog.on('shown.bs.modal', function () {
                $dialog.data('shown', true);
            });
        },
        /**
         * Closes dialog
         * @param cb Callback after hide
         */
        hide: function (cb) {
            if (typeof $dialog !== 'undefined') {
                if ($dialog.data('shown') === true) {
                    $dialog.modal('hide');
                    if (cb) {
                        cb($dialog);
                    }
                }
                else {
                    $dialog.on('shown.bs.modal', function () {
                        $dialog.modal('hide');
                        if (cb) {
                            cb($dialog);
                        }
                    });
                }
            }
        },
        /**
         * Changes or displays current dialog message
         * @param [newMessage] Some new message
         */
        message: function (newMessage) {
            if (typeof $dialog !== 'undefined') {
                if (typeof newMessage !== 'undefined') {
                    return $dialog.find('.modal-header>h' + settings.headerSize).html(newMessage);
                }
                else {
                    return $dialog.find('.modal-header>h' + settings.headerSize).html();
                }
            }
        }
    };

}));
