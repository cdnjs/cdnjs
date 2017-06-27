/*!
	Copyright 2010 Mal Curtis
*/

if (typeof jQuery == 'undefined') throw ("jQuery Required");

(function ($) {
    // Public General Plugin methods $.DirtyForms
    $.extend({
        DirtyForms: {
            debug: false,
            message: 'You\'ve made changes on this page which aren\'t saved. If you leave you will lose these changes.',
            title: 'Are you sure you want to do that?',
            dirtyClass: 'dirty',
            listeningClass: 'dirtylisten',
            ignoreClass: 'ignoredirty',
            choiceContinue: false,
            helpers: [],
            dialog: {
                refire: function (content, ev) {
                    $.facebox(content);
                },
                fire: function (message, title) {
                    var content = '<h1>' + title + '</h1><p>' + message + '</p><p><a href="#" class="ignoredirty button medium red continue">Continue</a><a href="#" class="ignoredirty button medium cancel">Stop</a>';
                    $.facebox(content);
                },
                bind: function () {
                    var close = function (decision) {
                        return function (e) {
                            e.preventDefault();
                            $(document).trigger('close.facebox');
                            decision(e);
                        };
                    };
                    $('#facebox .cancel, #facebox .close, #facebox_overlay').click(close(decidingCancel));
                    $('#facebox .continue').click(close(decidingContinue));
                },
                stash: function () {
                    var fb = $('#facebox');
                    return ($.trim(fb.html()) == '' || fb.css('display') != 'block') ?
					   false :
					   $('#facebox .content').clone(true);
                },
                selector: '#facebox .content'
            },

            isDirty: function () {
                return $(':dirtylistening').dirtyForms('isDirty');
            },

            disable: function () {
                settings.disabled = true;
            },

            ignoreParentDocs: function () {
                settings.watchParentDocs = false;
            },

            choiceCommit: function (e) {
                choiceCommit(e);
            },

            isDeciding: function () {
                return settings.deciding;
            },

            decidingContinue: function (e) {
                decidingContinue(e);
            },

            decidingCancel: function (e) {
                decidingCancel(e);
            },

            dirtylog: function (msg) {
                dirtylog(msg);
            }
        }
    });

    // Create a custom selector $('form:dirty')
    $.extend($.expr[":"], {
        dirtylistening: function (a) {
            return $(a).hasClass($.DirtyForms.listeningClass);
        },
        dirty: function (a) {
            return $(a).hasClass($.DirtyForms.dirtyClass);
        }
    });

    // Public Element methods ( $('form').dirtyForms('methodName', args) )
    var methods = {
        init: function () {
            var core = $.DirtyForms;

            dirtylog('Adding forms to watch');
            bindExit();

            return this.each(function (e) {
                if (!$(this).is('form')) return;
                dirtylog('Adding form ' + $(this).attr('id') + ' to forms to watch');
                $(this).addClass(core.listeningClass);

                // exclude all HTML 4 except text and password, but include HTML 5 except search
                var inputSelector = "textarea,input:not([type='checkbox'],[type='radio'],[type='button']," +
					"[type='image'],[type='submit'],[type='reset'],[type='file'],[type='search'])";
                var selectionSelector = "input[type='checkbox'],input[type='radio'],select";
                var resetSelector = "input[type='reset']";

                // For jQuery 1.7+, use on()
                if (typeof $(document).on === 'function') {
                    $(this).on('focus change', inputSelector, onFocus);
                    $(this).on('change', selectionSelector, onSelectionChange);
                    $(this).on('click', resetSelector, onReset);
                } else { // For jQuery 1.4.2 - 1.7, use delegate()
                    $(this).delegate(inputSelector, 'focus change', onFocus);
                    $(this).delegate(selectionSelector, 'change', onSelectionChange);
                    $(this).delegate(resetSelector, 'click', onReset);
                }
            });
        },
        // Returns true if any of the supplied elements are dirty
        isDirty: function () {
            var isDirty = false;
            var node = this;
            if (settings.disabled) return false;
            if (focusedIsDirty()) {
                isDirty = true;
                return true;
            }
            this.each(function (e) {
                if ($(this).hasClass($.DirtyForms.dirtyClass)) {
                    isDirty = true;
                    return true;
                }
            });
            $.each($.DirtyForms.helpers, function (key, obj) {
                if ("isDirty" in obj) {
                    if (obj.isDirty(node)) {
                        isDirty = true;
                        return true;
                    }
                }
                // For backward compatibility, we call isNodeDirty (deprecated)
                if ("isNodeDirty" in obj) {
                    if (obj.isNodeDirty(node)) {
                        isDirty = true;
                        return true;
                    }
                }
            });

            dirtylog('isDirty returned ' + isDirty);
            return isDirty;
        },
        // Marks the element(s) that match the selector dirty
        setDirty: function () {
            dirtylog('setDirty called');
            return this.each(function (e) {
                $(this).addClass($.DirtyForms.dirtyClass).parents('form').addClass($.DirtyForms.dirtyClass);
            });
        },
        // "Cleans" this dirty form by essentially forgetting that it is dirty
        setClean: function () {
            dirtylog('setClean called');
            settings.focused = { element: false, value: false };

            return this.each(function (e) {
                var node = this;

                // remove the current dirty class
                $(node).removeClass($.DirtyForms.dirtyClass)

                if ($(node).is('form')) {
                    // remove all dirty classes from children
                    $(node).find(':dirty').removeClass($.DirtyForms.dirtyClass);
                } else {
                    // if this is last dirty child, set form clean
                    var $form = $(node).parents('form');
                    if ($form.find(':dirty').length == 0) {
                        $form.removeClass($.DirtyForms.dirtyClass);
                    }
                }

                // Clean helpers
                $.each($.DirtyForms.helpers, function (key, obj) {
                    if ("setClean" in obj) {
                        obj.setClean(node);
                    }
                });
            });
        }

        // ADD NEW METHODS HERE
    };

    $.fn.dirtyForms = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.dirtyForms');
        }
    };

    // Deprecated Methods for Backward Compatibility
    // DO NOT ADD MORE METHODS LIKE THESE, ADD METHODS WHERE INDICATED ABOVE
    $.fn.setDirty = function () {
        return this.dirtyForms('setDirty');
    }
    $.fn.isDirty = function () {
        return this.dirtyForms('isDirty');
    }
    $.fn.cleanDirty = function () {
        return this.dirtyForms('setClean');
    }

    // Private Properties and Methods
    var settings = $.DirtyForms = $.extend({
        watchParentDocs: true,
        disabled: false,
        exitBound: false,
        formStash: false,
        dialogStash: false,
        deciding: false,
        decidingEvent: false,
        currentForm: false,
        hasFirebug: "console" in window && "firebug" in window.console,
        hasConsoleLog: "console" in window && "log" in window.console,
        focused: { "element": false, "value": false }
    }, $.DirtyForms);

    var onReset = function () {
        $(this).parents('form').dirtyForms('setClean');
    }

    var onSelectionChange = function () {
        $(this).dirtyForms('setDirty');
    }

    var onFocus = function () {
        element = $(this);
        if (focusedIsDirty()) {
            settings.focused['element'].dirtyForms('setDirty');
        }
        settings.focused['element'] = element;
        settings.focused['value'] = element.val();
    }
    var focusedIsDirty = function () {
        // Check, whether the value of focused element has changed
        return settings.focused["element"] &&
			(settings.focused["element"].val() !== settings.focused["value"]);
    }

    var dirtylog = function (msg) {
        if (!$.DirtyForms.debug) return;
        msg = "[DirtyForms] " + msg;
        settings.hasFirebug ?
			console.log(msg) :
			settings.hasConsoleLog ?
				window.console.log(msg) :
				alert(msg);
    }

    var bindExit = function () {
        if (settings.exitBound) return;

        var inIframe = (top !== self);

        // For jQuery 1.7+, use on()
        if (typeof $(document).on === 'function') {
            $(document).on('click', 'a', aBindFn);
            $(document).on('submit', 'form', formBindFn);
            if (settings.watchParentDocs && inIframe) {
                $(top.document).on('click', 'a', aBindFn);
                $(top.document).on('submit', 'form', formBindFn);
            }
        } else { // For jQuery 1.4.2 - 1.7, use delegate()
            $(document).delegate('a', 'click', aBindFn);
            $(document).delegate('form', 'submit', formBindFn);
            if (settings.watchParentDocs && inIframe) {
                $(top.document).delegate('a', 'click', aBindFn);
                $(top.document).delegate('form', 'submit', formBindFn);
            }
        }

        $(window).bind('beforeunload', beforeunloadBindFn);
        if (settings.watchParentDocs && inIframe) {
            $(top.window).bind('beforeunload', beforeunloadBindFn);
        }

        settings.exitBound = true;
    }

    var getIgnoreAnchorSelector = function () {
        var result = '';
        $.each($.DirtyForms.helpers, function (key, obj) {
            if ("ignoreAnchorSelector" in obj) {
                if (result.length > 0) { result += ','; }
                result += obj.ignoreAnchorSelector;
            }
        });
        return result;
    }

    var aBindFn = function (ev) {
        // Filter out any anchors the helpers wish to exclude
        if (!$(this).is(getIgnoreAnchorSelector())) {
            bindFn(ev);
        }
    }

    var formBindFn = function (ev) {
        settings.currentForm = this;
        bindFn(ev);
    }

    var beforeunloadBindFn = function (ev) {
        var result = bindFn(ev);

        if (result && settings.doubleunloadfix != true) {
            dirtylog('Before unload will be called, resetting');
            settings.deciding = false;
        }

        settings.doubleunloadfix = true;
        setTimeout(function () { settings.doubleunloadfix = false; }, 200);

        // Bug Fix: Only return the result if it is a string,
        // otherwise don't return anything.
        if (typeof (result) == 'string') {
            ev = ev || window.event;

            // For IE and Firefox prior to version 4
            if (ev) {
                ev.returnValue = result;
            }

            // For Safari
            return result;
        }
    }

    var bindFn = function (ev) {
        dirtylog('Entering: Leaving Event fired, type: ' + ev.type + ', element: ' + ev.target + ', class: ' + $(ev.target).attr('class') + ' and id: ' + ev.target.id);

        if (ev.type == 'beforeunload' && settings.doubleunloadfix) {
            dirtylog('Skip this unload, Firefox bug triggers the unload event multiple times');
            settings.doubleunloadfix = false;
            return false;
        }

        if ($(ev.target).hasClass(settings.ignoreClass) || isDifferentTarget(ev)) {
            dirtylog('Leaving: Element has ignore class or has target=\'_blank\'');
            if (!ev.isDefaultPrevented()) {
                clearUnload();
            }
            return false;
        }

        if (settings.deciding) {
            dirtylog('Leaving: Already in the deciding process');
            return false;
        }

        if (ev.isDefaultPrevented()) {
            dirtylog('Leaving: Event has been stopped elsewhere');
            return false;
        }

        if (!settings.isDirty()) {
            dirtylog('Leaving: Not dirty');
            if (!ev.isDefaultPrevented()) {
                clearUnload();
            }
            return false;
        }

        if (ev.type == 'submit' && $(ev.target).dirtyForms('isDirty')) {
            dirtylog('Leaving: Form submitted is a dirty form');
            if (!ev.isDefaultPrevented()) {
                clearUnload();
            }
            return true;
        }

        settings.deciding = true;
        settings.decidingEvent = ev;
        dirtylog('Setting deciding active');

        if (settings.dialog !== false) {
            dirtylog('Saving dialog content');
            settings.dialogStash = settings.dialog.stash();
            dirtylog(settings.dialogStash);
        }

        // Callback for page access in current state
        $(document).trigger('defer.dirtyforms');

        if (ev.type == 'beforeunload') {
            //clearUnload();
            dirtylog('Returning to beforeunload browser handler with: ' + settings.message);
            return settings.message;
        }
        if (!settings.dialog) return;

        ev.preventDefault();
        ev.stopImmediatePropagation();

        if ($(ev.target).is('form') && $(ev.target).parents(settings.dialog.selector).length > 0) {
            dirtylog('Stashing form');
            settings.formStash = $(ev.target).clone(true).hide();
        } else {
            settings.formStash = false;
        }

        dirtylog('Deferring to the dialog');
        settings.dialog.fire($.DirtyForms.message, $.DirtyForms.title);
        settings.dialog.bind();
    }

    var isDifferentTarget = function (ev) {
        var aTarget = $(ev.target).attr('target');
        if (typeof aTarget === 'string') {
            aTarget = aTarget.toLowerCase();
        }
        return (aTarget === '_blank');
    }

    var choiceCommit = function (ev) {
        if (settings.deciding) {
            $(document).trigger('choicecommit.dirtyforms');
            if ($.DirtyForms.choiceContinue) {
                decidingContinue(ev);
            } else {
                decidingCancel(ev);
            }
            $(document).trigger('choicecommitAfter.dirtyforms');
        }
    }

    var decidingCancel = function (ev) {
        ev.preventDefault();
        $(document).trigger('decidingcancelled.dirtyforms');
        if (settings.dialog !== false && settings.dialogStash !== false) {
            dirtylog('Refiring the dialog with stashed content');
            settings.dialog.refire(settings.dialogStash.html(), ev);
        }
        $(document).trigger('decidingcancelledAfter.dirtyforms');
        settings.dialogStash = false;
        settings.deciding = settings.currentForm = settings.decidingEvent = false;
    }

    var decidingContinue = function (ev) {
        window.onbeforeunload = null; // fix for chrome
        ev.preventDefault();
        settings.dialogStash = false;
        $(document).trigger('decidingcontinued.dirtyforms');
        refire(settings.decidingEvent);
        settings.deciding = settings.currentForm = settings.decidingEvent = false;
    }

    var clearUnload = function () {
        // I'd like to just be able to unbind this but there seems
        // to be a bug in jQuery which doesn't unbind onbeforeunload
        dirtylog('Clearing the beforeunload event');
        $(window).unbind('beforeunload', beforeunloadBindFn);
        window.onbeforeunload = null;
        $(document).trigger('beforeunload.dirtyforms');
    }

    var refire = function (e) {
        $(document).trigger('beforeRefire.dirtyforms');
        $(document).trigger('beforeunload.dirtyforms');
        switch (e.type) {
            case 'click':
                dirtylog("Refiring click event");
                var event = new jQuery.Event('click');
                $(e.target).trigger(event);
                if (!event.isDefaultPrevented()) {
                    var anchor = $(e.target).closest('[href]');
                    dirtylog('Sending location to ' + anchor.attr('href'));
                    location.href = anchor.attr('href');
                    return;
                }
                break;
            default:
                dirtylog("Refiring " + e.type + " event on " + e.target);
                var target;
                if (settings.formStash) {
                    dirtylog('Appending stashed form to body');
                    target = settings.formStash;
                    $('body').append(target);
                }
                else {
                    target = $(e.target);
                    if (!target.is('form'))
                        target = target.closest('form');
                }
                target.trigger(e.type);
                break;
        }
    }

})(jQuery);