/**
 * Autotab - jQuery plugin 1.3
 * https://github.com/Mathachew/jquery-autotab
 * 
 * Copyright (c) 2013 Matthew Miller
 * 
 * Licensed under the MIT licensing:
 *   http://www.opensource.org/licenses/mit-license.php
 */

(function ($) {
    var settings = {
        tabPause: 800,
        focusChange: null
    };

    // Native get/setAttribute methods are much faster than $.data, so $.data is used for objects only: http://jsperf.com/dataset-vs-jquery-data/4
    // When removing then resetting auto tab, storing an object resulted in overwritten values, leading to this implementation
    var setSettings = function (e, settings) {
        if (settings === null || typeof settings === 'undefined') {
            return;
        }

        for (var key in settings) {
            if (key == 'format' || key == 'target' || key == 'previous') {
                $(e).data('autotab-' + key, settings[key]);
            }
            else {
                e.setAttribute('data-autotab-' + key, settings[key]);
            }
        }
    };

    var getSettings = function (e) {
        var platform = navigator.platform,
            settings = {
                loaded: false,
                disabled: false,
                pattern: null,
                uppercase: false,
                lowercase: false,
                nospace: false,
                maxlength: 2147483647
            };

        for (var key in settings) {
            settings[key] = e.getAttribute('data-autotab-' + key) || settings[key];
        }

        settings.format = $(e).data('autotab-format') || 'all';
        settings.target = $(e).data('autotab-target') || settings.target;
        settings.previous = $(e).data('autotab-previous') || settings.previous;
        settings.iOS = e.getAttribute('data-autotab-iOS') || (platform === 'iPad' || platform === 'iPhone' || platform === 'iPod');
        settings.firefox = e.getAttribute('data-autotab-Firefox') || (typeof InstallTrigger !== 'undefined');

        // Save settings on first run
        if (!settings.loaded) {
            setSettings(e, settings);
        }

        return settings;
    };

    // The 1ms timeouts allow for keypress events to complete in case a
    // custom function or exterior method calls for a manual auto tab
    $.autotab = {
        next: function () {
            var e = $(document.activeElement);

            if (e.length) {
                setTimeout(function () {
                    e.trigger('autotab-next');
                }, 1);
            }
        },
        previous: function () {
            var e = $(document.activeElement);

            if (e.length) {
                setTimeout(function () {
                    e.trigger('autotab-previous');
                }, 1);
            }
        }
    };

    $.fn.autotab = function (method, options) {
        if (!this.length) {
            return this;
        }

        // Apply filter options
        if (method == 'filter') {
            if (typeof options === 'string' || typeof options === 'function') {
                options = { format: options };
            }

            for (var i = 0, length = this.length; i < length; i++) {
                var defaults = getSettings(this[i]),
                    newOptions = options;

                // Retain the established target/previous values as this area is for filtering only
                newOptions.target = defaults.target;
                newOptions.previous = defaults.previous;

                $.extend(defaults, newOptions);
                setSettings(this[i], defaults);
            }
        }
        // Disable auto tab and filtering
        else if (method == 'remove' || method == 'destroy' || method == 'disable') {
            for (var i = 0, length = this.length; i < length; i++) {
                var defaults = getSettings(this[i]);

                defaults.disabled = true;

                setSettings(this[i], defaults);
            }
        }
        // Re-enable auto tab and filtering
        else if (method == 'restore' || method == 'enable') {
            for (var i = 0, length = this.length; i < length; i++) {
                var defaults = getSettings(this[i]);

                defaults.disabled = false;

                setSettings(this[i], defaults);
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
            if (this.length > 1) {
                for (var i = 0, length = this.length; i < length; i++) {
                    var n = i + 1,
                        p = i - 1,
                        newOptions = options;

                    if (i > 0 && n < length) {
                        newOptions.target = this[n];
                        newOptions.previous = this[p];
                    }
                    else if (i > 0) {
                        newOptions.target = null;
                        newOptions.previous = this[p];
                    }
                    else {
                        newOptions.target = this[n];
                        newOptions.previous = null;
                    }

                    autotabBind(this[i], newOptions);
                }
            }
            else {
                autotabBind(this[0], options);
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

        if (defaults.disabled == 'true' || defaults.disabled === true) {
            defaults.disabled = false;
            defaults.target = null;
            defaults.previous = null;
        }

        $.extend(defaults, options);

        // Sets targets to element based on the name or ID passed if they are not currently objects
        if (typeof defaults.target === 'string' || !(defaults.target instanceof jQuery)) {
            defaults.target = $(defaults.target);
        }

        if (typeof defaults.previous === 'string' || !(defaults.previous instanceof jQuery)) {
            defaults.previous = $(defaults.previous);
        }

        var oldMaxlength = element.maxLength;

        // defaults.maxlength has not changed and maxlength was specified
        if (defaults.maxlength == 2147483647 && oldMaxlength != 2147483647) {
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

        $(element).on('autotab-next', function (event, defaults) {
            if (!defaults) {
                defaults = getSettings(this);
            }

            if (defaults.disabled == 'true' || defaults.disabled === true) {
                return;
            }

            if (defaults.target.length) {
                // Using focus on iOS devices is a pain, so use the browser's next/previous buttons to proceed
                if (defaults.iOS != 'true' && defaults.iOS !== true) {
                    defaults.target.focus().select();
                    settings.focusChange = new Date();
                }
            }
        }).on('autotab-previous', function (event, defaults) {
            if (!defaults) {
                defaults = getSettings(this);
            }

            if (defaults.disabled == 'true' || defaults.disabled === true) {
                return;
            }

            if (defaults.previous.length) {
                defaults.previous.focus();

                // When setting value = value, Firefox will not place the cursor at the end of a textbox
                // when the cursor was last at any point before the final character within the same textbox
                if (defaults.firefox) {
                    var length = defaults.previous.val().length;
                    defaults.previous[0].setSelectionRange(length, length);
                }
                else {
                    defaults.previous.val(defaults.previous.val());
                }

                settings.focusChange = null;
            }
        }).on('keydown', function (e) {
            var defaults = getSettings(this);

            if (!defaults || defaults.disabled == 'true') {
                return true;
            }

            var keyCode = e.which || e.charCode;

            // Go to the previous element when backspace
            // is pressed in an empty input field
            if (keyCode == 8 && this.value.length === 0 && defaults.previous.length) {
                $(this).trigger('autotab-previous', defaults);
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
            else {
                settings.focusChange = null;
            }
        }).on('keypress', function (e) {
            var defaults = getSettings(this);

            if (!defaults || defaults.disabled == 'true' || defaults.disabled === true) {
                return true;
            }

            var keyCode = e.which || e.keyCode,
                keyChar = filterValue(this, String.fromCharCode(keyCode), defaults),
                hasValue = document.selection && document.selection.createRange ? true : (e.charCode > 0);

            if (e.ctrlKey || e.altKey) {
                return true;
            }

            if (hasValue && (keyChar === null || keyChar === '')) {
                // Returns true whenever a paste is occurring
                // Speficially added for Firefox
                return e.ctrlKey;
            }

            // Many, many thanks to Tim Down for this solution: http://stackoverflow.com/a/3923320/94656
            if (hasValue && (this.value.length <= this.maxLength)) {
                var start, end;

                if (typeof this.selectionStart === 'number' && typeof this.selectionEnd === 'number') {
                    // Non-IE browsers and IE 9
                    start = this.selectionStart;
                    end = this.selectionEnd;

                    // Text is fully selected, so it needs to be replaced
                    if (start === 0 && end == this.value.length) {
                        this.value = keyChar;
                    }
                    else {
                        if (this.value.length == this.maxLength) {
                            $(this).trigger('autotab-next', defaults);
                            return false;
                        }

                        this.value = this.value.slice(0, start) + keyChar + this.value.slice(end);
                    }

                    // Move the caret
                    this.selectionStart = this.selectionEnd = start + 1;
                }
                else if (document.selection && document.selection.createRange) {
                    // For IE up to version 8
                    var selectionRange = document.selection.createRange(),
                        textInputRange = this.createTextRange(),
                        precedingRange = this.createTextRange(),
                        bookmark = selectionRange.getBookmark();
                    textInputRange.moveToBookmark(bookmark);
                    precedingRange.setEndPoint("EndToStart", textInputRange);
                    start = precedingRange.text.length;
                    end = start + selectionRange.text.length;

                    // Text is fully selected, so it needs to be replaced
                    if (start === 0 && end == this.value.length) {
                        this.value = keyChar;
                    }
                    else {
                        if (this.value.length == this.maxLength) {
                            $(this).trigger('autotab-next', defaults);
                            return false;
                        }

                        this.value = this.value.slice(0, start) + keyChar + this.value.slice(end);
                    }

                    start++;

                    // Move the caret
                    textInputRange = this.createTextRange();
                    textInputRange.collapse(true);
                    textInputRange.move("character", start - (this.value.slice(0, start).split("\r\n").length - 1));
                    textInputRange.select();
                }
            }

            // Firefox doesn't behave properly when trying to backspace or move through
            // a text box with the arrow keys
            if (defaults.firefox == 'true' || defaults.firefox === true) {
                var keys = '8,9,16,17,18,19,20,27,33,34,35,36,37,38,39,40,45,144,145';

                if (keys.indexOf(keyCode) == -1 && typeof keyCode !== 'undefined') {
                    if (this.value.length == defaults.maxlength) {
                        $(this).trigger('autotab-next', defaults);
                    }

                    return false;
                }

                return true;
            }

            if (this.value.length == defaults.maxlength) {
                $(this).trigger('autotab-next', defaults);
            }

            return false;
        }).on('paste', function (e) {
            var defaults = getSettings(this);

            if (!defaults) {
                return true;
            }

            var handlePaste = function (e, originalValue, previousValue) {
                if (!e) {
                    return;
                }

                var settings = getSettings(e),
                    maxLength = e.maxLength;

                if (!defaults || defaults.disabled == 'true' || defaults.disabled === true) {
                    return true;
                }

                setSettings(e, defaults);

                e.maxLength = 2147483647;

                setTimeout(function () {
                    if (originalValue === null) {
                        originalValue = e.value;
                    }

                    var filteredValue;

                    // Truncate the pasted text up to the previous element's filtered value
                    if (previousValue !== null) {
                        filteredValue = filterValue(e, originalValue.substr(originalValue.indexOf(previousValue) + previousValue.length), defaults).substr(0, maxLength);
                    }
                    else {
                        filteredValue = filterValue(e, originalValue, defaults).substr(0, maxLength);
                    }

                    e.maxLength = maxLength;

                    if (!filteredValue) {
                        e.value = '';
                        return;
                    }

                    e.value = filteredValue;

                    if (filteredValue.length == maxLength) {
                        $(e).trigger('autotab-next', defaults);

                        if (defaults.iOS != 'true' && defaults.iOS !== true) {
                            handlePaste(defaults.target[0], originalValue, filteredValue);
                        }
                    }
                }, 1);
            };

            handlePaste(this, null, null);
        });
    };

    // Backwards compatibility
    $.fn.autotab_magic = function (focus) {
        $(this).autotab();
    };
    $.fn.autotab_filter = function (options) {
        var defaults = {};

        if (typeof options === 'string' || typeof options === 'function') {
            defaults.format = options;
        }
        else {
            $.extend(defaults, options);
        }

        $(this).autotab('filter', defaults);
    };

})(jQuery);