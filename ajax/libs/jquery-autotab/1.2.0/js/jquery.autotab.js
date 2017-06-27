/**
 * Autotab - jQuery plugin 1.2
 * http://www.mathachew.com/sandbox/jquery-autotab
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

    var getDefaults = function () {
        var platform = navigator.platform;

        return {
            loaded: false,
            format: 'all',
            pattern: null,
            uppercase: false,
            lowercase: false,
            nospace: false,
            maxlength: 2147483647,
            target: null,
            previous: null,
            iOS: (platform === 'iPad' || platform === 'iPhone' || platform === 'iPod')
        };
    };

    $.autotab = function () { };

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

    $.fn.autotab = function (method, options) {
        // Apply filter options
        if (method == 'filter') {
            if (typeof options == 'string' || typeof options == 'function') {
                options = { format: options };
            }

            for (var i = 0, length = this.length; i < length; i++) {
                var defaults = $(this[i]).data('autotab-defaults');

                // Retain the established target/previous values as this area is for filtering only
                options.target = defaults.target;
                options.previous = defaults.previous;

                $.extend(defaults, options);
                $(this[i]).data('autotab-defaults', defaults);
            }
        }
        else {
            if (method == null) {
                options = {};
            }
            else if (typeof method == 'string') {
                options = { format: method };
            }
            else if (typeof method == 'object') {
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
                autotabBind(this, options);
            }
        }

        return this;
    };

    var filterValue = function (value, defaults) {
        if (typeof defaults.format == 'function') {
            return defaults.format(value);
        }

        switch (defaults.format) {
            case 'text':
                var pattern = new RegExp('[0-9]+', 'g');
                value = value.replace(pattern, '');
                break;

            case 'alpha':
                var pattern = new RegExp('[^a-zA-Z]+', 'g');
                value = value.replace(pattern, '');
                break;

            case 'number':
            case 'numeric':
                var pattern = new RegExp('[^0-9]+', 'g');
                value = value.replace(pattern, '');
                break;

            case 'alphanumeric':
                var pattern = new RegExp('[^0-9a-zA-Z]+', 'g');
                value = value.replace(pattern, '');
                break;

            case 'custom':
                var pattern = new RegExp(defaults.pattern, 'g');
                value = value.replace(pattern, '');
                break;

            case 'all':
            default:
                break;
        }

        if (defaults.nospace) {
            var pattern = new RegExp('[ ]+', 'g');
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
        var defaults = $(element).data('autotab-defaults') || getDefaults();
        $.extend(defaults, options);

        // Sets targets to element based on the name or ID passed if they are not currently objects
        if (typeof defaults.target == 'string' || !(defaults.target instanceof jQuery)) {
            defaults.target = $(defaults.target);
        }

        if (typeof defaults.previous == 'string' || !(defaults.previous instanceof jQuery)) {
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

        $(element).data('autotab-defaults', defaults);

        if (!$(element).data('autotab-defaults').loaded) {
            defaults.loaded = true;
            $(element).data('autotab-defaults', defaults);
        }
        else {
            return $(element);
        }

        return $(element).on('autotab-next', function (event, defaults) {
            if (!defaults) {
                defaults = $(this).data('autotab-defaults')
            }

            if (defaults.target.length) {
                // Using focus on iOS devices is a pain, so use the browser's next/previous buttons to proceed
                if (!defaults.iOS) {
                    defaults.target.focus().select();
                    settings.focusChange = new Date();
                }
            }
        }).on('autotab-previous', function (event, defaults) {
            if (!defaults) {
                defaults = $(this).data('autotab-defaults')
            }

            if (defaults.previous.length) {
                defaults.previous.focus();

                // When setting value = value, Firefox will not place the cursor at the end of a textbox
                // when the cursor was last at any point before the final character within the same textbox
                if (this.setSelectionRange) {
                    var length = defaults.previous.val().length;
                    defaults.previous[0].setSelectionRange(length, length);
                }
                else {
                    defaults.previous.val(defaults.previous.val());
                }

                settings.focusChange = null;
            }
        }).on('keydown', function (e) {
            var defaults = $(this).data('autotab-defaults'),
                keyCode = e.which || e.charCode;

            // Go to the previous element when backspace
            // is pressed in an empty input field
            if (keyCode == 8 && this.value.length == 0 && defaults.previous.length) {
                $(this).trigger('autotab-previous', defaults);
            }
            else if (keyCode == 9 && settings.focusChange != null) {
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
            var defaults = $(this).data('autotab-defaults'),
                keyCode = e.which || e.keyCode,
                keyChar = filterValue(String.fromCharCode(keyCode), defaults),
                hasValue = document.selection && document.selection.createRange ? true : (e.charCode > 0);

            if (e.ctrlKey || e.altKey) {
                return true;
            }

            if (hasValue && (keyChar == null || keyChar == '')) {
                // Returns true whenever a paste is occurring
                // Speficially added for Firefox
                return e.ctrlKey;
            }

            // Many, many thanks to Tim Down for this solution: http://stackoverflow.com/a/3923320/94656
            if (hasValue && (this.value.length <= this.maxLength)) {
                var start, end;

                if (typeof this.selectionStart == 'number' && typeof this.selectionEnd == 'number') {
                    // Non-IE browsers and IE 9
                    start = this.selectionStart;
                    end = this.selectionEnd;

                    // Text is fully selected, so it needs to be replaced
                    if (start == 0 && end == this.value.length) {
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
                    if (start == 0 && end == this.value.length) {
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
            var keys = '8,9,16,17,18,19,20,27,33,34,35,36,37,38,39,40,45,46,144,145';

            if (keys.indexOf(keyCode) == -1 && keyCode != undefined) {
                this.value = filterValue(this.value, defaults);

                if (this.value.length == defaults.maxlength) {
                    $(this).trigger('autotab-next', defaults);
                }
                return false;
            }
        }).on('paste', function (e) {
            var handlePaste = function (e, originalValue, previousValue) {
                if (!e) {
                    return;
                }

                var defaults = $(e).data('autotab-defaults'),
                    maxLength = e.maxLength;

                $(e).data('autotab-defaults', defaults);

                e.maxLength = 2147483647;

                setTimeout(function () {
                    if (originalValue == null) {
                        originalValue = e.value;
                    }

                    var filteredValue;

                    // Truncate the pasted text up to the previous element's filtered value
                    if (previousValue != null) {
                        filteredValue = filterValue(originalValue.substr(originalValue.indexOf(previousValue) + previousValue.length), defaults).substr(0, maxLength);
                    }
                    else {
                        filteredValue = filterValue(originalValue, defaults).substr(0, maxLength);
                    }

                    e.maxLength = maxLength;

                    if (!filteredValue) {
                        e.value = '';
                        return;
                    }

                    e.value = filteredValue;

                    if (filteredValue.length == maxLength) {
                        $(e).trigger('autotab-next', defaults);

                        if (!defaults.iOS) {
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

        if (typeof options == 'string' || typeof options == 'function') {
            defaults.format = options;
        }
        else {
            $.extend(defaults, options);
        }

        $(this).autotab('filter', defaults);
    };

})(jQuery);