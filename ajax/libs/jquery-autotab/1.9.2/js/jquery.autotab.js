/**
 * Autotab - jQuery plugin 1.9.2
 * https://github.com/Mathachew/jquery-autotab
 * 
 * Copyright (c) 2008, 2015 Matthew Miller
 * 
 * Licensed under the MIT licensing:
 *   http://www.opensource.org/licenses/mit-license.php
 */

(function ($) {
    var platform = navigator.platform,
        settings = {
            tabPause: 800,
            focusChange: null,
            iOS: (platform === 'iPad' || platform === 'iPhone' || platform === 'iPod'),
            firefox: (typeof InstallTrigger !== 'undefined'),
            ie11: !(window.ActiveXObject) && "ActiveXObject" in window
        };

    var setSettings = function (e, settings) {
        if (settings === null || typeof settings === 'undefined') {
            return;
        }

        for (var key in settings) {
            $(e).data('autotab-' + key, settings[key]);
        }
    };

    var getSettings = function (e) {
        var settings = {
            arrowKey: false,
            format: 'all',
            loaded: false,
            disabled: false,
            pattern: null,
            uppercase: false,
            lowercase: false,
            nospace: false,
            maxlength: 2147483647,
            target: null,
            previous: null,
            trigger: null,
            originalValue: '',
            changed: false,
            editable: (e.type === 'text' || e.type === 'password' || e.type === 'textarea' || e.type === 'tel' || e.type === 'number' || e.type === 'email' || e.type === 'search' || e.type === 'url'),
            filterable: (e.type === 'text' || e.type === 'password' || e.type === 'textarea'),
            tabOnSelect: false
        };

        // If $.autotab.selectFilterByClas is true and the format not specified, automatically select an element's format based on a matching class name.
        // The first matched element becomes the selected format for the filter.
        if ($.autotab.selectFilterByClass === true && typeof $(e).data('autotab-format') === 'undefined') {
            var classes = ['all', 'text', 'alpha', 'number', 'numeric', 'alphanumeric', 'hex', 'hexadecimal', 'custom'];

            for (var key in classes) {
                if ($(e).hasClass(classes[key])) {
                    settings.format = classes[key];
                    break;
                }
            }
        }

        for (var key in settings) {
            if (typeof $(e).data('autotab-' + key) !== 'undefined') {
                settings[key] = $(e).data('autotab-' + key);
            }
        }

        // Save settings on first run
        if (!settings.loaded) {
            if (settings.trigger !== null && typeof settings.trigger === 'string') {
                settings.trigger = settings.trigger.toString();
            }

            setSettings(e, settings);
        }

        return settings;
    };

    var queryObject = function (e) {
        return (typeof e !== 'undefined' && (typeof e === 'string' || !(e instanceof jQuery)));
    };

    var getSelection = function (e) {
        var start = 0,
            end = 0,
            selectionType = 0;

        if (e.type === 'text' || e.type === 'password' || e.type === 'textarea') {
            if (typeof e.selectionStart === 'number' && typeof e.selectionEnd === 'number') {
                // Non-IE browsers and IE 9+
                start = e.selectionStart;
                end = e.selectionEnd;
                selectionType = 1;
            }
            else if (document.selection && document.selection.createRange) {
                // For IE up to version 8
                var selectionRange = document.selection.createRange(),
                    textInputRange = e.createTextRange(),
                    precedingRange = e.createTextRange(),
                    bookmark = selectionRange.getBookmark();
                textInputRange.moveToBookmark(bookmark);
                precedingRange.setEndPoint("EndToStart", textInputRange);
                start = precedingRange.text.length;
                end = start + selectionRange.text.length;
                selectionType = 2;
            }
        }

        return {
            start: start,
            end: end,
            selectionType: selectionType
        };
    };

    $.autotab = function (options) {
        if (typeof options !== 'object') {
            options = {};
        }

        $(':input').autotab(options);
    };

    $.autotab.selectFilterByClass = false;

    $.autotab.next = function () {
        var e = $(document.activeElement);

        if (e.length) {
            e.trigger('autotab-next');
        }
    };

    $.autotab.previous = function () {
        var e = $(document.activeElement);

        if (e.length) {
            e.trigger('autotab-previous');
        }
    };

    $.autotab.remove = function (e) {
        queryObject(e) ? $(e).autotab('remove') : $(':input').autotab('remove');
    };

    $.autotab.restore = function (e) {
        queryObject(e) ? $(e).autotab('restore') : $(':input').autotab('restore');
    };

    $.autotab.refresh = function (e) {
        queryObject(e) ? $(e).autotab('refresh') : $(':input').autotab('refresh');
    };

    $.fn.autotab = function (method, options) {
        if (!this.length) {
            return this;
        }

        // Remove hidden fields since tabbing backwards is supported on different form elements
        var filtered = $.grep(this, function (e, i) {
            return e.type != 'hidden';
        });

        // Apply filter options
        if (method == 'filter') {
            if (typeof options === 'string' || typeof options === 'function') {
                options = { format: options };
            }

            for (var i = 0, length = filtered.length; i < length; i++) {
                var defaults = getSettings(filtered[i]),
                    newOptions = options;

                // Retain the established target/previous values as this area is for filtering only
                newOptions.target = defaults.target;
                newOptions.previous = defaults.previous;

                $.extend(defaults, newOptions);

                if (!defaults.loaded) {
                    defaults.disabled = true;
                    autotabBind(filtered[i], newOptions);
                }
                else {
                    setSettings(filtered[i], defaults);
                }
            }
        }
        // Disable auto tab and filtering
        else if (method == 'remove' || method == 'destroy' || method == 'disable') {
            for (var i = 0, length = filtered.length; i < length; i++) {
                var defaults = getSettings(filtered[i]);

                defaults.disabled = true;

                setSettings(filtered[i], defaults);
            }
        }
        // Re-enable auto tab and filtering
        else if (method == 'restore' || method == 'enable') {
            for (var i = 0, length = filtered.length; i < length; i++) {
                var defaults = getSettings(filtered[i]);

                defaults.disabled = false;

                setSettings(filtered[i], defaults);
            }
        }
        // Refresh target/previous elements
        else if (method == 'refresh') {
            for (var i = 0, length = filtered.length; i < length; i++) {
                var defaults = getSettings(filtered[i]),
                    n = i + 1,
                    p = i - 1,
                    selectTarget = function () {
                        if (i > 0 && n < length) {
                            defaults.target = filtered[n];
                        }
                        else if (i > 0) {
                            defaults.target = null;
                        }
                        else {
                            defaults.target = filtered[n];
                        }   
                    },
                    selectPrevious = function () {
                        if (i > 0 && n < length) {
                            defaults.previous = filtered[p];
                        }
                        else if (i > 0) {
                            defaults.previous = filtered[p];
                        }
                        else {
                            defaults.previous = null;
                        }
                    };

                // Nothing was specified for the target element, so automatically set it
                if (defaults.target === null || defaults.target.selector === '') {
                    selectTarget();
                }
                else if (typeof defaults.target === 'string' || defaults.target.selector) {
                    defaults.target = $(typeof defaults.target === 'string' ? defaults.target : defaults.target.selector);

                    if (defaults.target.length === 0) {
                        selectTarget();
                    }
                }

                // Nothing was specified for the previous element, so automatically set it
                if (defaults.previous === null || defaults.previous.selector === '') {
                    selectPrevious();
                }
                else if (typeof defaults.previous === 'string' || defaults.previous.selector) {
                    defaults.previous = $(typeof defaults.previous === 'string' ? defaults.previous : defaults.previous.selector);

                    if (defaults.previous.length === 0) {
                        selectPrevious();
                    }
                }

                if (!defaults.loaded) {
                    autotabBind(filtered[i], defaults);
                }
                else {
                    if (queryObject(defaults.target)) {
                        defaults.target = $(defaults.target);
                    }

                    if (queryObject(defaults.previous)) {
                        defaults.previous = $(defaults.previous);
                    }

                    setSettings(filtered[i], defaults);
                }
            }
        }
        else {
            if (method === null || typeof method === 'undefined') {
                options = {};
            }
            else if (typeof method === 'string' || typeof method === 'function') {
                options = { format: method };
            }
            else if (typeof method === 'object') {
                options = method;
            }

            // Bind key events to element(s) passed
            if (filtered.length > 1) {
                for (var i = 0, length = filtered.length; i < length; i++) {
                    var n = i + 1,
                        p = i - 1,
                        newOptions = options;

                    if (i > 0 && n < length) {
                        newOptions.target = filtered[n];
                        newOptions.previous = filtered[p];
                    }
                    else if (i > 0) {
                        newOptions.target = null;
                        newOptions.previous = filtered[p];
                    }
                    else {
                        newOptions.target = filtered[n];
                        newOptions.previous = null;
                    }

                    autotabBind(filtered[i], newOptions);
                }
            }
            else {
                autotabBind(filtered[0], options);
            }
        }

        return this;
    };

    var filterValue = function (e, value, defaults) {
        if (typeof defaults.format === 'function') {
            return defaults.format(value, e);
        }

        var pattern = null;

        switch (defaults.format) {
            case 'text':
                pattern = new RegExp('[0-9]+', 'g');
                break;

            case 'alpha':
                pattern = new RegExp('[^a-zA-Z]+', 'g');
                break;

            case 'number':
            case 'numeric':
                pattern = new RegExp('[^0-9]+', 'g');
                break;

            case 'alphanumeric':
                pattern = new RegExp('[^0-9a-zA-Z]+', 'g');
                break;

            case 'hex':
            case 'hexadecimal':
                pattern = new RegExp('[^0-9A-Fa-f]+', 'g');
                break;

            case 'custom':
                pattern = new RegExp(defaults.pattern, 'g');
                break;

            case 'all':
            default:
                break;
        }

        if (pattern !== null) {
            value = value.replace(pattern, '');
        }

        if (defaults.nospace) {
            pattern = new RegExp('[ ]+', 'g');
            value = value.replace(pattern, '');
        }

        if (defaults.uppercase) {
            value = value.toUpperCase();
        }

        if (defaults.lowercase) {
            value = value.toLowerCase();
        }

        return value;
    };

    var autotabBind = function (element, options) {
        var defaults = getSettings(element);

        if (defaults.disabled) {
            defaults.disabled = false;
            defaults.target = null;
            defaults.previous = null;
        }

        $.extend(defaults, options);

        // Sets targets to element based on the name or ID passed if they are not currently objects
        if (queryObject(defaults.target)) {
            defaults.target = $(defaults.target);
        }

        if (queryObject(defaults.previous)) {
            defaults.previous = $(defaults.previous);
        }

        var oldMaxlength = element.maxLength;

        if (typeof element.maxLength === 'undefined' && element.type == 'textarea') {
            oldMaxlength = element.maxLength = element.getAttribute('maxlength');
        }

        // defaults.maxlength has not changed and maxlength was specified
        if (defaults.maxlength == 2147483647 && oldMaxlength != 2147483647 && oldMaxlength != -1) {
            defaults.maxlength = oldMaxlength;
        }
        // defaults.maxlength overrides maxlength
        else if (defaults.maxlength > 0) {
            element.maxLength = defaults.maxlength;
        }
        // defaults.maxlength and maxlength have not been specified
        // A target cannot be used since there is no defined maxlength
        else {
            defaults.target = null;
        }

        if (!defaults.loaded) {
            defaults.loaded = true;
            setSettings(element, defaults);
        }
        else {
            setSettings(element, defaults);
            return;
        }

        // Add a change event to select lists only so that we can auto tab when a value is selected
        if (element.type == 'select-one') {
            $(element).on('change', function (e) {
                var defaults = getSettings(this);

                if (defaults.tabOnSelect) {
                    $(this).trigger('autotab-next');
                }
            });
        }

        // The 1ms timeouts allow for keypress events to complete in case a
        // custom function or exterior method calls for a manual auto tab
        $(element).on('autotab-next', function (event, defaults) {
            var self = this;
            setTimeout(function () {
                if (!defaults) {
                    defaults = getSettings(self);
                }

                var target = defaults.target;

                if (!defaults.disabled && target.length) {
                    // Using focus on iOS devices is a pain, so use the browser's next/previous buttons to proceed
                    if (!settings.iOS) {

                        // Field is disabled/readonly, so tab to next element
                        if (target.prop('disabled') || target.prop('readonly')) {
                            target.trigger('autotab-next');
                        }
                        else {
                            // Allows the user to navigate between each charater with arrow keys
                            if (defaults.arrowKey) {
                                target.focus();
                            }
                            else {
                                target.focus().select();
                            }
                        }

                        settings.focusChange = new Date();
                    }
                }
            }, 1);
        }).on('autotab-previous', function (event, defaults) {
            var self = this;
            setTimeout(function () {
                if (!defaults) {
                    defaults = getSettings(self);
                }

                var previous = defaults.previous;

                if (!defaults.disabled && previous.length) {
                    var value = previous.val();

                    // Field is disabled/readonly, so tab to previous element
                    if (previous.prop('disabled') || previous.prop('readonly')) {
                        previous.trigger('autotab-previous');
                    }
                    else if (value.length && previous.data('autotab-editable') && !defaults.arrowKey) {
                        if (settings.ie11) {
                            previous.val(value.substring(0, value.length - 1)).focus();
                        }
                        else {
                            previous.focus().val(value.substring(0, value.length - 1));
                        }

                        setSettings(previous, { changed: true });
                    }
                    else {
                        if (defaults.arrowKey) {
                            setSettings(this, { arrowKey: false });
                        }

                        if (settings.ie11) {
                            previous.val(value).focus();
                        }
                        else {
                            previous.focus().val(value);
                        }
                    }

                    settings.focusChange = null;
                }
            }, 1);
        }).on('focus', function () {
            setSettings(this, { originalValue: this.value });
        }).on('blur', function () {
            var defaults = getSettings(this);

            if (defaults.changed && this.value != defaults.originalValue) {
                setSettings(this, { changed: false });
                $(this).change();
            }
        }).on('keydown.autotab', function (e) {
            var defaults = getSettings(this);

            if (!defaults || defaults.disabled) {
                return true;
            }

            var selection = getSelection(this),
                keyCode = e.which || e.charCode;

            // Go to the previous element when backspace
            // is pressed in an empty input field
            if (keyCode == 8) {
                defaults.arrowKey = false;

                // Prevent the browser from of navigating to the previous page
                if (!defaults.editable) {
                    $(this).trigger('autotab-previous', defaults);
                    return false;
                }

                setSettings(this, { changed: (this.value !== defaults.originalValue) });

                if (this.value.length === 0) {
                    $(this).trigger('autotab-previous', defaults);
                    return;
                }
            }
            else if (keyCode == 9 && settings.focusChange !== null) {
                // Tab backwards
                if (e.shiftKey) {
                    settings.focusChange = null;
                    return;
                }

                if ((new Date().getTime() - settings.focusChange.getTime()) < settings.tabPause) {
                    settings.focusChange = null;
                    return false;
                }
            }
            else if (this.type !== 'range' && this.type !== 'select-one' && this.type !== 'select-multiple') {
                if ((this.type !== 'tel' && this.type !== 'number') || ((this.type === 'tel' || this.type === 'number') && this.value.length == 0)) {
                    if (keyCode == 37 && (!defaults.editable || selection.start == 0)) {
                        defaults.arrowKey = true;
                        $(this).trigger('autotab-previous', defaults);
                    }
                    else if (keyCode == 39 && (!defaults.editable || !defaults.filterable || selection.end == this.value.length || this.value.length == 0)) {
                        defaults.arrowKey = true;
                        $(this).trigger('autotab-next', defaults);
                    }
                }
            }
        }).on('keypress.autotab', function (e) {
            var defaults = getSettings(this),
                keyCode = e.which || e.keyCode;

            // e.charCode == 0 indicates a special key has been pressed, which only Firefox triggers
            if (!defaults || defaults.disabled || (settings.firefox && e.charCode === 0) || e.ctrlKey || e.altKey || keyCode == 13 || this.disabled) {
                return true;
            }

            var keyChar = String.fromCharCode(keyCode);

            if (this.type != 'text' && this.type != 'password' && this.type != 'textarea') {
                // this.value.length is the length before the keypress event was trigged
                if ((this.value.length + 1) >= defaults.maxlength) {
                    defaults.arrowKey = false;
                    $(this).trigger('autotab-next', defaults);
                }

                return !(this.value.length == defaults.maxlength);
            }

            // Prevents auto tabbing when defaults.trigger is pressed
            if (defaults.trigger !== null && defaults.trigger.indexOf(keyChar) >= 0) {
                if (settings.focusChange !== null && (new Date().getTime() - settings.focusChange.getTime()) < settings.tabPause) {
                    settings.focusChange = null;
                }
                else {
                    defaults.arrowKey = false;
                    $(this).trigger('autotab-next', defaults);
                }

                return false;
            }

            settings.focusChange = null;

            var hasValue = document.selection && document.selection.createRange ? true : (keyCode > 0);

            keyChar = filterValue(this, keyChar, defaults);

            if (hasValue && (keyChar === null || keyChar === '')) {
                return false;
            }

            // Many, many thanks to Tim Down for this solution: http://stackoverflow.com/a/3923320/94656
            if (hasValue && (this.value.length <= this.maxLength)) {
                var selection = getSelection(this);

                // Text is fully selected, so it needs to be replaced
                if (selection.start === 0 && selection.end == this.value.length) {
                    this.value = keyChar;
                    setSettings(this, { changed: (this.value != defaults.originalValue) });
                }
                else {
                    if (this.value.length == this.maxLength && selection.start === selection.end) {
                        defaults.arrowKey = false;
                        $(this).trigger('autotab-next', defaults);
                        return false;
                    }

                    this.value = this.value.slice(0, selection.start) + keyChar + this.value.slice(selection.end);
                    setSettings(this, { changed: (this.value != defaults.originalValue) });
                }

                // Prevents the cursor position from being set to the end of the text box
                // This is called even if the text is fully selected and replaced due to an unexpected behavior in IE6 and up (#32)
                if (this.value.length != defaults.maxlength) {
                    selection.start++;

                    if (selection.selectionType == 1) {
                        this.selectionStart = this.selectionEnd = selection.start;
                    }
                    else if (selection.selectionType == 2) {
                        var range = this.createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', selection.start);
                        range.moveStart('character', selection.start);
                        range.select();
                    }
                }
            }


            if (this.value.length == defaults.maxlength) {
                defaults.arrowKey = false;
                $(this).trigger('autotab-next', defaults);
            }

            return false;
        }).on('drop paste', function (e) {
            var defaults = getSettings(this);

            if (!defaults) {
                return true;
            }

            this.maxLength = 2147483647;

            (function (e, originDefaults) {
                setTimeout(function () {
                    var lastIndex = -1,
                        hiddenInput = document.createElement('input');
                    hiddenInput.type = 'hidden';
                    hiddenInput.value = e.value.toLowerCase();
                    hiddenInput.originalValue = e.value;

                    e.value = filterValue(e, e.value, originDefaults).substr(0, originDefaults.maxlength);

                    var handlePaste = function (e, previousValue) {
                        if (!e) {
                            return;
                        }

                        var defaults = getSettings(e);

                        if ($(e).prop('disabled') || $(e).prop('readonly') || !defaults.editable) {
                            $(e).trigger('autotab-next');

                            if (!settings.iOS) {
                                handlePaste(defaults.target[0], previousValue);
                            }
                            return;
                        }

                        for (var i = 0, count = previousValue.length; i < count; i++) {
                            lastIndex = hiddenInput.value.indexOf(previousValue.charAt(i).toLowerCase(), lastIndex) + 1;
                        }

                        var trimmedValue = hiddenInput.originalValue.substr(lastIndex),
                            filteredValue = filterValue(e, trimmedValue, defaults).substr(0, defaults.maxlength);

                        if (!filteredValue) {
                            return;
                        }

                        e.value = filteredValue;

                        if (filteredValue.length == defaults.maxlength) {
                            defaults.arrowKey = false;
                            $(e).trigger('autotab-next', defaults);

                            // Firefox causes all but the first and last elements to retain a select all state, so in order to
                            // effectively support arrow keys, the starting point of the selection is to the last possible cursor
                            if (settings.firefox) {
                                setTimeout(function () {
                                    e.selectionStart = e.value.length;
                                }, 1);
                            }

                            if (!settings.iOS) {
                                handlePaste(defaults.target[0], filteredValue);
                            }
                        }

                    };

                    if (e.value.length == originDefaults.maxlength) {
                        defaults.arrowKey = false;
                        $(e).trigger('autotab-next', defaults);

                        if (!settings.iOS) {
                            handlePaste(originDefaults.target[0], e.value.toLowerCase());
                        }
                    }

                    e.maxLength = originDefaults.maxlength;
                }, 1);
            })(this, defaults);
        });
    };

    // Deprecated, here for backwards compatibility
    $.fn.autotab_magic = function (focus) {
        return $(this).autotab();
    };
    $.fn.autotab_filter = function (options) {
        var defaults = {};

        if (typeof options === 'string' || typeof options === 'function') {
            defaults.format = options;
        }
        else {
            $.extend(defaults, options);
        }

        return $(this).autotab('filter', defaults);
    };

})(jQuery);