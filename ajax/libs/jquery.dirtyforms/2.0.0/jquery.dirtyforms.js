/*!
Dirty Forms jQuery Plugin | v2.0.0 | github.com/snikch/jquery.dirtyforms
(c) 2010-2015 Mal Curtis
License MIT
*/

(function($, window, document, undefined) {
    // Can't use ECMAScript 5's strict mode because several apps 
    // including ASP.NET trace the stack via arguments.caller.callee 
    // and Firefox dies if you try to trace through "use strict" call chains. 
    // See jQuery issue (#13335)
    // Support: Firefox 18+
    //"use strict";

    if (!$.fn.on) {
        // Patch jQuery 1.4.2 - 1.7 with an on function (that uses delegate).
        $.fn.on = function (events, selector, data, handler) {
            return this.delegate(selector, events, data, handler);
        };
    }

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

    // Public Element methods ( $('form').dirtyForms('methodName', args) )
    var methods = {
        init: function (options) {
            var data = {};

            if (!state.initialized) {
                // Override any default options
                $.extend(true, $.DirtyForms, options);

                $(document).trigger('bind.dirtyforms', [events]);
                events.bind(window, document, data);

                state.initialized = true;
            }

            this.filter('form').not(':dirtylistening').each(function () {
                var $form = $(this);
                dirtylog('Adding form ' + $form.attr('id') + ' to forms to watch');

                // Store original values of the fields
                $form.find($.DirtyForms.fieldSelector).each(function () {
                    storeOriginalValue($(this));
                });

                $form.trigger('scan.dirtyforms');
                events.bindForm($form, data);
            });
            return this;
        },
        // Returns true if any of the selected elements or their children are dirty
        isDirty: function (excludeHelpers) {
            var ignoreSelector = getIgnoreSelector(),
                dirtyClass = $.DirtyForms.dirtyClass,
                isDirty = false;

            this.each(function (index) {
                var $node = $(this),
                    ignored = isFieldIgnored($node, ignoreSelector);

                if ($node.hasClass(dirtyClass) && !ignored) {
                    isDirty = true;
                    // Exit out of the .each() function
                    return false;
                }

                // Check any descendant nodes (if this is a container element)
                $node.find('.' + dirtyClass).each(function () {
                    if (!isFieldIgnored($(this), ignoreSelector)) {
                        isDirty = true;
                        // Exit out of the .each() function
                        return false;
                    }
                });
                // Exit out of the .each() function
                if (isDirty) return false;

                if (!ignored && !excludeHelpers) {
                    // Test helpers for this node.
                    $.each($.DirtyForms.helpers, function (i, helper) {
                        if (helper.isDirty && helper.isDirty($node, index)) {
                            isDirty = true;
                            // Exit out of the .each() function
                            return false;
                        }
                    });

                    // Exit out of the .each() function
                    if (isDirty) return false;
                }
            });

            return isDirty;
        },
        // Marks the element(s) and any helpers within the element not dirty.
        // If all of the fields in a form are marked not dirty, the form itself will be marked not dirty even
        // if it is not included in the selector. Also resets original values to the current state - 
        // essentially "forgetting" the node or its descendants are dirty.
        setClean: function (excludeIgnored, excludeHelpers) {
            dirtylog('setClean called');

            var doSetClean = function () {
                var $field = $(this);

                // Reset by storing the original value again
                storeOriginalValue($field);

                // Remove the dirty class
                setDirtyStatus($field, false);
            };

            elementsInRange(this, $.DirtyForms.fieldSelector, excludeIgnored)
                .each(doSetClean)
                .parents('form').trigger('setclean.dirtyforms', [excludeIgnored]);

            if (excludeHelpers) return this;
            return fireHelperMethod(this, 'setClean', excludeIgnored, getIgnoreSelector());
        },
        // Scans the selected elements and descendants for any new fields and stores their original values.
        // Ignores any original values that had been set previously. Also resets the dirty status of all fields
        // whose ignore status has changed since the last scan.
        rescan: function (excludeIgnored, excludeHelpers) {
            dirtylog('rescan called');

            var doRescan = function () {
                var $field = $(this);

                // Skip previously added fields
                if (!hasOriginalValue($field)) {
                    // Store the original value
                    storeOriginalValue($field);
                }

                // Set the dirty status
                setDirtyStatus($field, isFieldDirty($field));
            };

            elementsInRange(this, $.DirtyForms.fieldSelector, excludeIgnored)
                .each(doRescan)
                .parents('form').trigger('rescan.dirtyforms', [excludeIgnored]);

            if (excludeHelpers) return this;
            return fireHelperMethod(this, 'rescan', excludeIgnored, getIgnoreSelector());
        }
    };

    // Custom selectors $('form:dirty')
    $.extend($.expr[":"], {
        dirty: function (element) {
            var $element = $(element);
            return $element.hasClass($.DirtyForms.dirtyClass) && !$element.is(':dirtyignored');
        },
        dirtylistening: function (element) {
            return $(element).hasClass($.DirtyForms.listeningClass);
        },
        dirtyignored: function (element) {
            return isFieldIgnored($(element), false);
        }
    });

    // Public General Plugin properties and methods $.DirtyForms
    $.DirtyForms = {
        message: "You've made changes on this page which aren't saved. If you leave you will lose these changes.",
        dirtyClass: 'dirty',
        listeningClass: 'dirtylisten',
        ignoreClass: 'dirtyignore',
        ignoreSelector: '',
        // exclude all HTML 4 except checkbox, option, text and password, but include HTML 5 except search
        fieldSelector: "input:not([type='button'],[type='image'],[type='submit']," +
            "[type='reset'],[type='file'],[type='search']),select,textarea",
        /*<log>*/
        debug: false,
        dirtylog: function (msg) {
            dirtylog(msg);
        },
        /*</log>*/
        helpers: [],
        dialog: false
    };

    // Private State Management
    var state = {
        initialized: false,
        formStash: false,
        dialogStash: false,
        deciding: false,
        decidingEvent: false
    };

    // Dialog Decision Management
    var choice;

    var bindKeys = function (ev) {
        if (ev.data.bindEscKey && ev.which == 27 || ev.data.bindEnterKey && ev.which == 13) {
            return doCommit(ev, false);
        }
    };

    var bindDialog = function (choice) {
        var staySelector = choice.staySelector,
            proceedSelector = choice.proceedSelector;

        if (staySelector !== '') {
            $(staySelector).unbind('click', doCommit)
                             .click(doCommit);
        }
        if (proceedSelector !== '') {
            $(proceedSelector).unbind('click', doProceed)
                               .click(doProceed);
        }
        if (choice.bindEscKey || choice.bindEnterKey) {
            $(document).unbind('keydown', bindKeys)
                       .keydown(choice, bindKeys);
        }
    };

    var callDialogClose = function (proceeding, unstashing) {
        if ($.isFunction($.DirtyForms.dialog.close)) {
            dirtylog('Calling dialog close');
            $.DirtyForms.dialog.close(proceeding, unstashing);
        }
    };

    var doProceed = function (ev) {
        return doCommit(ev, true);
    };

    var doCommit = function (ev, proceeding) {
        if (!state.deciding) return;
        ev.preventDefault();

        if (proceeding === true) {
            var refireEvent = state.decidingEvent;
            $(document).trigger('proceed.dirtyforms', [refireEvent]);
            events.clearUnload(); // fix for chrome/safari
            callDialogClose(proceeding, false);
            refire(refireEvent);
        } else {
            $(document).trigger('stay.dirtyforms');
            var isUnstashing = $.DirtyForms.dialog !== false && state.dialogStash !== false && $.isFunction($.DirtyForms.dialog.unstash);
            callDialogClose(proceeding, isUnstashing);
            if (isUnstashing) {
                dirtylog('Refiring the dialog with stashed content');
                $.DirtyForms.dialog.unstash(state.dialogStash, ev);
            }
            $(document).trigger('afterstay.dirtyforms');
        }

        state.deciding = state.decidingEvent = state.dialogStash = state.formStash = false;
        return false;
    };

    // Event management
    var events = {
        bind: function (window, document, data) {
            $(window).bind('beforeunload', data, events.onBeforeUnload);
            $(document).on('click', 'a:not([target="_blank"])', data, events.onAnchorClick)
                       .on('submit', 'form', data, events.onSubmit);
        },
        bindForm: function ($form, data) {
            var dirtyForms = $.DirtyForms;

            // Test whether we are dealing with IE < 10
            var isIE8_9 = ('onpropertychange' in document.createElement('input'));
            var inputEvents = 'change input' + (isIE8_9 ? ' keyup selectionchange cut paste' : '');
            $form.addClass(dirtyForms.listeningClass)
                 .on('focus keydown', dirtyForms.fieldSelector, data, events.onFocus)
                 .on(inputEvents, dirtyForms.fieldSelector, data, events.onFieldChange)
                 .bind('reset', data, events.onReset);
        },
        // For any fields added after the form was initialized, store the value when focused.
        onFocus: function (ev) {
            var $field = $(ev.target);
            if (!hasOriginalValue($field)) {
                storeOriginalValue($field);
            }
        },
        onFieldChange: function (ev) {
            var $field = $(ev.target);
            if (ev.type !== 'change') {
                delay(function () { setFieldStatus($field); }, 100);
            } else {
                setFieldStatus($field);
            }
        },
        onReset: function (ev) {
            var $form = $(ev.target).closest('form');
            // Need a delay here because reset is called before the state of the form is reset.
            setTimeout(function () { $form.dirtyForms('setClean'); }, 100);
        },
        onAnchorClick: function (ev) {
            bindFn(ev);
        },
        onSubmit: function (ev) {
            bindFn(ev);
        },
        onBeforeUnload: function (ev) {
            var result = bindFn(ev);

            if (result && state.doubleunloadfix !== true) {
                dirtylog('Before unload will be called, resetting');
                state.deciding = false;
            }

            state.doubleunloadfix = true;
            setTimeout(function () { state.doubleunloadfix = false; }, 200);

            // Only return the result if it is a string, otherwise don't return anything.
            if (typeof result === 'string') {
                // For IE and Firefox prior to version 4, set the returnValue.
                ev.returnValue = result;
                return result;
            }
        },
        onRefireClick: function (ev) {
            var event = new $.Event('click');
            $(ev.target).trigger(event);
            if (!event.isDefaultPrevented()) {
                events.onRefireAnchorClick(ev);
            }
        },
        onRefireAnchorClick: function (ev) {
            var href = $(ev.target).closest('a[href]').attr('href');
            if (href !== undefined) {
                dirtylog('Sending location to ' + href);
                window.location.href = href;
            }
        },
        clearUnload: function () {
            // I'd like to just be able to unbind this but there seems
            // to be a bug in jQuery which doesn't unbind onbeforeunload
            dirtylog('Clearing the beforeunload event');
            $(window).unbind('beforeunload', events.onBeforeUnload);
            window.onbeforeunload = null;
            $(document).trigger('beforeunload.dirtyforms');
        }
    };

    var elementsInRange = function ($this, selector, excludeIgnored) {
        var $elements = $this.filter(selector).add($this.find(selector));
        if (excludeIgnored) {
            $elements = $elements.not(':dirtyignored');
        }
        return $elements;
    };

    var fireHelperMethod = function ($this, method, excludeIgnored, ignoreSelector) {
        return $this.each(function (index) {
            var $node = $(this);

            if (!excludeIgnored || !isFieldIgnored($node, ignoreSelector)) {
                $.each($.DirtyForms.helpers, function (i, helper) {
                    if (helper[method]) { helper[method]($node, index, excludeIgnored); }
                });
            }
        });
    };

    var getFieldValue = function ($field) {
        var value;
        if ($field.is('select')) {
            value = '';
            $field.find('option').each(function () {
                var $option = $(this);
                if ($option.is(':selected')) {
                    if (value.length > 0) { value += ','; }
                    value += $option.val();
                }
            });
        } else if ($field.is(":checkbox,:radio")) {
            value = $field.is(':checked');
        } else {
            value = $field.val();
        }

        return value;
    };

    var storeOriginalValue = function ($field) {
        dirtylog('Storing original value for ' + $field.attr('name'));
        $field.data('df-orig', getFieldValue($field));
        var isEmpty = ($field.data('df-orig') === undefined);
        $field.data('df-empty', isEmpty);
    };

    var hasOriginalValue = function ($field) {
        return ($field.data('df-orig') !== undefined || $field.data('df-empty') === true);
    };

    var getIgnoreSelector = function () {
        var dirtyForms = $.DirtyForms,
            result = dirtyForms.ignoreSelector;
        $.each(dirtyForms.helpers, function (key, obj) {
            if ('ignoreSelector' in obj) {
                if (result.length > 0) { result += ','; }
                result += obj.ignoreSelector;
            }
        });
        return result;
    };

    var isFieldIgnored = function ($field, ignoreSelector) {
        if (!ignoreSelector) {
            ignoreSelector = getIgnoreSelector();
        }
        return $field.is(ignoreSelector) || $field.closest('.' + $.DirtyForms.ignoreClass).length > 0;
    };

    var isFieldDirty = function ($field, ignoreSelector) {
        if (!hasOriginalValue($field) || isFieldIgnored($field, ignoreSelector)) return false;
        return (getFieldValue($field) != $field.data('df-orig'));
    };

    var setFieldStatus = function ($field, ignoreSelector) {
        if (isFieldIgnored($field, ignoreSelector)) return;

        // Option groups are a special case because they change more than the current element.
        if ($field.is(':radio[name]')) {
            var name = $field.attr('name'),
                $form = $field.parents('form');

            $form.find(":radio[name='" + name + "']").each(function () {
                var $radio = $(this);
                setDirtyStatus($radio, isFieldDirty($radio, ignoreSelector));
            });
        } else {
            setDirtyStatus($field, isFieldDirty($field, ignoreSelector));
        }
    };

    var setDirtyStatus = function ($field, isDirty) {
        dirtylog('Setting dirty status to ' + isDirty + ' on field ' + $field.attr('id'));
        var dirtyClass = $.DirtyForms.dirtyClass,
            $form = $field.parents('form');

        // Mark the field dirty/clean
        $field.toggleClass(dirtyClass, isDirty);
        var changed = (isDirty !== ($form.hasClass(dirtyClass) && $form.find(':dirty').length === 0));

        if (changed) {
            dirtylog('Setting dirty status to ' + isDirty + ' on form ' + $form.attr('id'));
            $form.toggleClass(dirtyClass, isDirty);

            if (isDirty) $form.trigger('dirty.dirtyforms');
            if (!isDirty) $form.trigger('clean.dirtyforms');
        }
    };

    // A delay to keep the key events from slowing down when changing the dirty status on the fly.
    var delay = (function () {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();

    var bindFn = function (ev) {
        var $element = $(ev.target),
            eventType = ev.type,
            dirtyForms = $.DirtyForms;
        dirtylog('Entering: Leaving Event fired, type: ' + eventType + ', element: ' + ev.target + ', class: ' + $element.attr('class') + ' and id: ' + ev.target.id);

        // Important: Do this check before calling events.clearUnload()
        if (ev.isDefaultPrevented()) {
            dirtylog('Leaving: Event has been stopped elsewhere');
            return false;
        }

        if (eventType == 'beforeunload' && state.doubleunloadfix) {
            dirtylog('Skip this unload, Firefox bug triggers the unload event multiple times');
            state.doubleunloadfix = false;
            return false;
        }

        if ($element.is(':dirtyignored')) {
            dirtylog('Leaving: Element has ignore class or a descendant of an ignored element');
            events.clearUnload();
            return false;
        }

        if (state.deciding) {
            dirtylog('Leaving: Already in the deciding process');
            return false;
        }

        if (!$('form:dirtylistening').dirtyForms('isDirty')) {
            dirtylog('Leaving: Not dirty');
            events.clearUnload();
            return false;
        }

        if (eventType == 'submit' && $element.dirtyForms('isDirty')) {
            dirtylog('Leaving: Form submitted is a dirty form');
            events.clearUnload();
            return true;
        }

        // Callback for page access in current state
        $(document).trigger('defer.dirtyforms');

        if (eventType == 'beforeunload') {
            dirtylog('Returning to beforeunload browser handler with: ' + dirtyForms.message);
            return dirtyForms.message;
        }
        if (!dirtyForms.dialog) return;

        // Using the GUI dialog...
        ev.preventDefault();
        ev.stopImmediatePropagation();

        dirtylog('Setting deciding active');
        state.deciding = true;
        state.decidingEvent = ev;

        // Stash the dialog (with a form). This is done so it can be shown again via unstash().
        if ($.isFunction(dirtyForms.dialog.stash)) {
            dirtylog('Stashing dialog content');
            state.dialogStash = dirtyForms.dialog.stash();
            dirtylog('Dialog Stash: ' + state.dialogStash);
        }

        // Stash the form from the dialog. This is done so we can fire events on it if the user makes a proceed choice.
        var stashSelector = dirtyForms.dialog.stashSelector;
        if (typeof stashSelector === 'string' && $element.is('form') && $element.parents(stashSelector).length > 0) {
            dirtylog('Stashing form');
            state.formStash = $element.clone(true).hide();
        } else {
            state.formStash = false;
        }

        dirtylog('Deferring to the dialog');

        // Create a new choice object
        choice = {
            proceed: false,
            commit: function (ev) {
                return doCommit(ev, choice.proceed);
            },
            bindEscKey: true,
            bindEnterKey: false,
            proceedSelector: '',
            staySelector: ''
        };

        dirtyForms.dialog.open(choice, dirtyForms.message, dirtyForms.ignoreClass);
        bindDialog(choice);
    };

    var refire = function (ev) {
        if (ev.type === 'click') {
            dirtylog("Refiring click event");
            events.onRefireClick(ev);
        } else {
            dirtylog("Refiring " + ev.type + " event on " + ev.target);
            var target;
            if (state.formStash) {
                dirtylog('Appending stashed form to body');
                target = state.formStash;
                $('body').append(target);
            }
            else {
                target = $(ev.target).closest('form');
            }
            target.trigger(ev.type);
        }
    };

    /*<log>*/
    var dirtylog = function (msg) {
        if (!$.DirtyForms.debug) return;
        var hasFirebug = 'console' in window && 'firebug' in window.console,
            hasConsoleLog = 'console' in window && 'log' in window.console;
        msg = '[DirtyForms] ' + msg;
        if (hasFirebug) {
            console.log(msg);
        } else if (hasConsoleLog) {
            window.console.log(msg);
        } else {
            alert(msg);
        }
    };
    /*</log>*/

})(jQuery, window, document);
