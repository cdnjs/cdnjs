/**
 * Autotab - jQuery plugin 1.5.1
 * https://github.com/Mathachew/jquery-autotab
 * 
 * Copyright (c) 2013 Matthew Miller
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
            firefox: (typeof InstallTrigger !== 'undefined')
        };

    // Native get/setAttribute methods are much faster than $.data, so $.data is used for objects only: http://jsperf.com/dataset-vs-jquery-data/4
    // When removing then resetting auto tab, storing an object resulted in overwritten values, leading to this implementation
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
            trigger: null
        };

        for (var key in settings) {
            settings[key] = $(e).data('autotab-' + key) || settings[key];
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

    // The 1ms timeouts allow for keypress events to complete in case a
    // custom function or exterior method calls for a manual auto tab
    $.autotab = {
        next: function () {
            var e = $(document.activeElement);

            if (e.length) {
                e.trigger('autotab-next');
            }
        },
        previous: function () {
            var e = $(document.activeElement);

            if (e.length) {
                e.trigger('autotab-previous');
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

        if (defaults.disabled) {
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

        if (!settings.loaded) {
            defaults.loaded = true;
            setSettings(element, defaults);
        }
        else {
            setSettings(element, defaults);
            return;
        }

        $(element).on('autotab-next', function (event, defaults) {
            var self = this;
            setTimeout(function () {
                if (!defaults) {
                    defaults = getSettings(self);
                }

                if (!defaults.disabled && defaults.target.length) {
                    // Using focus on iOS devices is a pain, so use the browser's next/previous buttons to proceed
                    if (!settings.iOS) {
                        defaults.target.focus().select();
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
                    previous.focus().val(value.substring(0, value.length - 1));
                    settings.focusChange = null;
                }
            }, 1);
        }).on('keydown', function (e) {
            var defaults = getSettings(this);

            if (!defaults || defaults.disabled) {
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
        }).on('keypress', function (e) {
            var defaults = getSettings(this);

            // e.charCode == 0 indicates a special key has been pressed, which only Firefox triggers
            if (!defaults || defaults.disabled || (settings.firefox && e.charCode === 0) || e.ctrlKey || e.altKey) {
                return true;
            }

            var keyCode = e.which || e.keyCode,
                keyChar = String.fromCharCode(keyCode);

            // Prevents auto tabbing when defaults.trigger is pressed
            if (defaults.trigger !== null && defaults.trigger.indexOf(keyChar) >= 0) {
                if (settings.focusChange !== null && (new Date().getTime() - settings.focusChange.getTime()) < settings.tabPause) {
                    settings.focusChange = null;
                }
                else {
                    $(this).trigger('autotab-next', defaults);
                }

                return false;
            }

            settings.focusChange = null;

            var hasValue = document.selection && document.selection.createRange ? true : (e.charCode > 0),
                valueChanged = false;

            keyChar = filterValue(this, keyChar, defaults);

            if (hasValue && (keyChar === null || keyChar === '')) {
                return false;
            }

            // Many, many thanks to Tim Down for this solution: http://stackoverflow.com/a/3923320/94656
            if (hasValue && (this.value.length <= this.maxLength)) {
                var start, end;

                if (typeof this.selectionStart === 'number' && typeof this.selectionEnd === 'number') {
                    // Non-IE browsers and IE 9
                    start = this.selectionStart;
                    end = this.selectionEnd;
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
                }

                // Text is fully selected, so it needs to be replaced
                if (start === 0 && end == this.value.length) {
                    valueChanged = true;
                }
                else {
                    if (this.value.length == this.maxLength) {
                        $(this).trigger('autotab-next', defaults);
                        return false;
                    }

                    valueChanged = true;
                }
            }

            if (valueChanged && (this.value.length + 1) == defaults.maxlength) {
                $(this).trigger('autotab-next', defaults);
            }

            return valueChanged;
        }).on('paste', function (e) {
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

                    e.maxLength = originDefaults.maxlength;
                    e.value = filterValue(e, e.value, originDefaults).substr(0, originDefaults.maxlength);

                    var handlePaste = function (e, previousValue) {
                        if (!e) {
                            return;
                        }

                        for (var i = 0, count = previousValue.length; i < count; i++) {
                            lastIndex = hiddenInput.value.indexOf(previousValue.charAt(i), lastIndex) + 1;
                        }

                        var defaults = getSettings(e),
                            trimmedValue = hiddenInput.value.substr(lastIndex),
                            filteredValue = filterValue(e, trimmedValue, defaults).substr(0, defaults.maxlength);

                        if (!filteredValue) {
                            e.value = '';
                            return;
                        }

                        e.value = filteredValue;

                        if (filteredValue.length == defaults.maxlength) {
                            $(e).trigger('autotab-next', defaults);

                            if (!settings.iOS) {
                                handlePaste(defaults.target[0], filteredValue);
                            }
                        }

                    };

                    if (e.value.length == originDefaults.maxlength) {
                        $(e).trigger('autotab-next', defaults);

                        if (!settings.iOS) {
                            handlePaste(originDefaults.target[0], e.value.toLowerCase());
                        }
                    }
                }, 1);
            })(this, defaults);
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