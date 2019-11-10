/*!
Bootstrap modal dialog (for jQuery Dirty Forms) | v2.0.0 | github.com/snikch/jquery.dirtyforms
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

    var exclamationGlyphicon = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> ';

    $.DirtyForms.dialog = {
        // Custom properties and methods to allow overriding (may differ per dialog)
        title: exclamationGlyphicon + 'Are you sure you want to do that?',
        proceedButtonClass: 'dirty-proceed',
        proceedButtonText: 'Leave This Page',
        stayButtonClass: 'dirty-stay',
        stayButtonText: 'Stay Here',
        dialogID: 'dirty-dialog',
        titleID: 'dirty-title',
        messageClass: 'dirty-message',
        preMessageText: '',
        postMessageText: '',
        replaceText: true,

        // Typical Dirty Forms Properties and Methods
        open: function (choice, message) {
            // Look for a pre-existing element with the dialogID.
            var $dialog = $('#' + this.dialogID);

            // If the user already added a dialog with this ID, skip doing it here
            if ($dialog.length === 0) {
                // NOTE: Buttons don't have the ignore class because Bootstrap 3 isn't compatible
                // with old versions of jQuery that don't properly cancel the click events.
                $dialog =
                    $('<div id="' + this.dialogID + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="' + this.titleID + '">' +
                        '<div class="modal-dialog" role="document">' +
                            '<div class="modal-content panel-danger">' +
                                '<div class="modal-header panel-heading">' +
                                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                    '<h3 class="modal-title" id="' + this.titleID + '"></h3>' +
                                '</div>' +
                                '<div class="modal-body panel-body ' + this.messageClass + '"></div>' +
                                '<div class="modal-footer panel-footer">' +
                                    '<button type="button" class="' + this.proceedButtonClass + ' btn btn-danger" data-dismiss="modal"></button>' +
                                    '<button type="button" class="' + this.stayButtonClass + ' btn btn-default" data-dismiss="modal"></button>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>');

                // Append to the body so we can capture DOM events.
                // Flag the dialog for later removal.
                $('body').append($dialog)
                         .data('df-dialog-appended', true);
            }

            if (this.replaceText) {
                // Replace the text in the dialog (whether it is external or not).
                $dialog.find('#' + this.titleID).html(this.title);
                $dialog.find('.' + this.messageClass).html(this.preMessageText + message + this.postMessageText);
                $dialog.find('.' + this.proceedButtonClass).html(this.proceedButtonText);
                $dialog.find('.' + this.stayButtonClass).html(this.stayButtonText);
            }

            // Bind the events
            choice.bindEscKey = false;

            var onContinueClick = function () {
                choice.proceed = $.DirtyForms.choiceContinue = true;
            };
            var onHidden = function (e) {
                var commit = choice.isDF1 ? $.DirtyForms.choiceCommit : choice.commit;
                commit(e);
                if ($('body').data('df-dialog-appended') === true) {
                    $dialog.remove();
                }
            };
            // NOTE: Bootstrap 3 requires jQuery 1.9, so we can use on and off here.
            $dialog.find('.' + this.proceedButtonClass).off('click', onContinueClick).on('click', onContinueClick);
            $dialog.off('hidden.bs.modal', onHidden).on('hidden.bs.modal', onHidden);

            // Show the dialog
            $dialog.modal({ show: true });
        },

        // Support for Dirty Forms < 2.0
        fire: function (message, title) {
            this.title = exclamationGlyphicon + title;
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
        selector: 'no-op',
    };

})(jQuery, window, document);