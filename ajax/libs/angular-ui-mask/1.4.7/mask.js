/*!
 * angular-ui-mask
 * https://github.com/angular-ui/ui-mask
 * Version: 1.4.7 - 2015-10-05T04:13:27.168Z
 * License: MIT
 */


(function () { 
'use strict';
/*
 Attaches input mask onto input element
 */
angular.module('ui.mask', [])
        .value('uiMaskConfig', {
            maskDefinitions: {
                '9': /\d/,
                'A': /[a-zA-Z]/,
                '*': /[a-zA-Z0-9]/
            },
            clearOnBlur: true,
            eventsToHandle: ['input', 'keyup', 'click', 'focus']
        })
        .directive('uiMask', ['uiMaskConfig', function(maskConfig) {
                function isFocused (elem) {
                  return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                }

                return {
                    priority: 100,
                    require: 'ngModel',
                    restrict: 'A',
                    compile: function uiMaskCompilingFunction() {
                        var options = maskConfig;

                        return function uiMaskLinkingFunction(scope, iElement, iAttrs, controller) {
                            var maskProcessed = false, eventsBound = false,
                                    maskCaretMap, maskPatterns, maskPlaceholder, maskComponents,
                                    // Minimum required length of the value to be considered valid
                                    minRequiredLength,
                                    value, valueMasked, isValid,
                                    // Vars for initializing/uninitializing
                                    originalPlaceholder = iAttrs.placeholder,
                                    originalMaxlength = iAttrs.maxlength,
                                    // Vars used exclusively in eventHandler()
                                    oldValue, oldValueUnmasked, oldCaretPosition, oldSelectionLength;

                            function initialize(maskAttr) {
                                if (!angular.isDefined(maskAttr)) {
                                    return uninitialize();
                                }
                                processRawMask(maskAttr);
                                if (!maskProcessed) {
                                    return uninitialize();
                                }
                                initializeElement();
                                bindEventListeners();
                                return true;
                            }

                            function initPlaceholder(placeholderAttr) {
                                if ( ! placeholderAttr) {
                                    return;
                                }

                                maskPlaceholder = placeholderAttr;

                                // If the mask is processed, then we need to update the value
                                if (maskProcessed) {
                                    iElement.val(maskValue(unmaskValue(iElement.val())));
                                }
                            }
                            var modelViewValue = false;
                            iAttrs.$observe('modelViewValue', function(val) {
                                if (val === 'true') {
                                    modelViewValue = true;
                                }
                            });

                            function formatter(fromModelValue) {
                                if (!maskProcessed) {
                                    return fromModelValue;
                                }
                                value = unmaskValue(fromModelValue || '');
                                isValid = validateValue(value);
                                controller.$setValidity('mask', isValid);
                                return isValid && value.length ? maskValue(value) : undefined;
                            }

                            function parser(fromViewValue) {
                                if (!maskProcessed) {
                                    return fromViewValue;
                                }
                                value = unmaskValue(fromViewValue || '');
                                isValid = validateValue(value);
                                // We have to set viewValue manually as the reformatting of the input
                                // value performed by eventHandler() doesn't happen until after
                                // this parser is called, which causes what the user sees in the input
                                // to be out-of-sync with what the controller's $viewValue is set to.
                                controller.$viewValue = value.length ? maskValue(value) : '';
                                controller.$setValidity('mask', isValid);
                                if (value === '' && iAttrs.required) {
                                    controller.$setValidity('required', !controller.$error.required);
                                }
                                if (isValid) {
                                    return modelViewValue ? controller.$viewValue : value;
                                } else {
                                    return undefined;
                                }
                            }

                            var linkOptions = {};

                            if (iAttrs.uiOptions) {
                                linkOptions = scope.$eval('[' + iAttrs.uiOptions + ']');
                                if (angular.isObject(linkOptions[0])) {
                                    // we can't use angular.copy nor angular.extend, they lack the power to do a deep merge
                                    linkOptions = (function(original, current) {
                                        for (var i in original) {
                                            if (Object.prototype.hasOwnProperty.call(original, i)) {
                                                if (current[i] === undefined) {
                                                    current[i] = angular.copy(original[i]);
                                                } else {
                                                    if (angular.isObject(current[i])) {
                                                        angular.extend(current[i], original[i]);
                                                    }
                                                }
                                            }
                                        }
                                        return current;
                                    })(options, linkOptions[0]);
                                }
                            } else {
                                linkOptions = options;
                            }

                            iAttrs.$observe('uiMask', initialize);
                            if (angular.isDefined(iAttrs.uiMaskPlaceholder)) {
                                iAttrs.$observe('uiMaskPlaceholder', initPlaceholder);
                            }
                            else {
                                iAttrs.$observe('placeholder', initPlaceholder);
                            }
                            controller.$formatters.push(formatter);
                            controller.$parsers.push(parser);

                            function uninitialize() {
                                maskProcessed = false;
                                unbindEventListeners();

                                if (angular.isDefined(originalPlaceholder)) {
                                    iElement.attr('placeholder', originalPlaceholder);
                                } else {
                                    iElement.removeAttr('placeholder');
                                }

                                if (angular.isDefined(originalMaxlength)) {
                                    iElement.attr('maxlength', originalMaxlength);
                                } else {
                                    iElement.removeAttr('maxlength');
                                }

                                iElement.val(controller.$modelValue);
                                controller.$viewValue = controller.$modelValue;
                                return false;
                            }

                            function initializeElement() {
                                value = oldValueUnmasked = unmaskValue(controller.$modelValue || '');
                                valueMasked = oldValue = maskValue(value);
                                isValid = validateValue(value);
                                if (iAttrs.maxlength) { // Double maxlength to allow pasting new val at end of mask
                                    iElement.attr('maxlength', maskCaretMap[maskCaretMap.length - 1] * 2);
                                }
                                if ( ! originalPlaceholder) {
                                    iElement.attr('placeholder', maskPlaceholder);
                                }
                                var viewValue = controller.$modelValue;
                                var idx = controller.$formatters.length;
                                while(idx--) {
                                    viewValue = controller.$formatters[idx](viewValue);
                                }
                                controller.$viewValue = viewValue || '';
                                controller.$render();
                                // Not using $setViewValue so we don't clobber the model value and dirty the form
                                // without any kind of user interaction.
                            }

                            function bindEventListeners() {
                                if (eventsBound) {
                                    return;
                                }
                                iElement.bind('blur', blurHandler);
                                iElement.bind('mousedown mouseup', mouseDownUpHandler);
                                iElement.bind(linkOptions.eventsToHandle.join(' '), eventHandler);
                                iElement.bind('paste', onPasteHandler);
                                eventsBound = true;
                            }

                            function unbindEventListeners() {
                                if (!eventsBound) {
                                    return;
                                }
                                iElement.unbind('blur', blurHandler);
                                iElement.unbind('mousedown', mouseDownUpHandler);
                                iElement.unbind('mouseup', mouseDownUpHandler);
                                iElement.unbind('input', eventHandler);
                                iElement.unbind('keyup', eventHandler);
                                iElement.unbind('click', eventHandler);
                                iElement.unbind('focus', eventHandler);
                                iElement.unbind('paste', onPasteHandler);
                                eventsBound = false;
                            }

                            function validateValue(value) {
                                // Zero-length value validity is ngRequired's determination
                                return value.length ? value.length >= minRequiredLength : true;
                            }

                            function unmaskValue(value) {
                                var valueUnmasked = '',
                                        maskPatternsCopy = maskPatterns.slice();
                                // Preprocess by stripping mask components from value
                                value = value.toString();
                                angular.forEach(maskComponents, function(component) {
                                    value = value.replace(component, '');
                                });
                                angular.forEach(value.split(''), function(chr) {
                                    if (maskPatternsCopy.length && maskPatternsCopy[0].test(chr)) {
                                        valueUnmasked += chr;
                                        maskPatternsCopy.shift();
                                    }
                                });
                                return valueUnmasked;
                            }

                            function maskValue(unmaskedValue) {
                                var valueMasked = '',
                                        maskCaretMapCopy = maskCaretMap.slice();

                                angular.forEach(maskPlaceholder.split(''), function(chr, i) {
                                    if (unmaskedValue.length && i === maskCaretMapCopy[0]) {
                                        valueMasked += unmaskedValue.charAt(0) || '_';
                                        unmaskedValue = unmaskedValue.substr(1);
                                        maskCaretMapCopy.shift();
                                    }
                                    else {
                                        valueMasked += chr;
                                    }
                                });
                                return valueMasked;
                            }

                            function getPlaceholderChar(i) {
                                var placeholder = angular.isDefined(iAttrs.uiMaskPlaceholder) ? iAttrs.uiMaskPlaceholder : iAttrs.placeholder;

                                if (typeof placeholder !== 'undefined' && placeholder[i]) {
                                    return placeholder[i];
                                } else {
                                    return '_';
                                }
                            }

                            // Generate array of mask components that will be stripped from a masked value
                            // before processing to prevent mask components from being added to the unmasked value.
                            // E.g., a mask pattern of '+7 9999' won't have the 7 bleed into the unmasked value.
                            // If a maskable char is followed by a mask char and has a mask
                            // char behind it, we'll split it into it's own component so if
                            // a user is aggressively deleting in the input and a char ahead
                            // of the maskable char gets deleted, we'll still be able to strip
                            // it in the unmaskValue() preprocessing.
                            function getMaskComponents() {
                                return maskPlaceholder.replace(/[_]+/g, '_').replace(/([^_]+)([a-zA-Z0-9])([^_])/g, '$1$2_$3').split('_');
                            }

                            function processRawMask(mask) {
                                var characterCount = 0;

                                maskCaretMap = [];
                                maskPatterns = [];
                                maskPlaceholder = '';

                                if (typeof mask === 'string') {
                                    minRequiredLength = 0;

                                    var isOptional = false,
                                            numberOfOptionalCharacters = 0,
                                            splitMask = mask.split('');

                                    angular.forEach(splitMask, function(chr, i) {
                                        if (linkOptions.maskDefinitions[chr]) {

                                            maskCaretMap.push(characterCount);

                                            maskPlaceholder += getPlaceholderChar(i - numberOfOptionalCharacters);
                                            maskPatterns.push(linkOptions.maskDefinitions[chr]);

                                            characterCount++;
                                            if (!isOptional) {
                                                minRequiredLength++;
                                            }
                                        }
                                        else if (chr === '?') {
                                            isOptional = true;
                                            numberOfOptionalCharacters++;
                                        }
                                        else {
                                            maskPlaceholder += chr;
                                            characterCount++;
                                        }
                                    });
                                }
                                // Caret position immediately following last position is valid.
                                maskCaretMap.push(maskCaretMap.slice().pop() + 1);

                                maskComponents = getMaskComponents();
                                maskProcessed = maskCaretMap.length > 1 ? true : false;
                            }

                            function blurHandler() {
                                if (linkOptions.clearOnBlur) {
                                    oldCaretPosition = 0;
                                    oldSelectionLength = 0;
                                    if (!isValid || value.length === 0) {
                                        valueMasked = '';
                                        iElement.val('');
                                        scope.$apply(function() {
                                            controller.$setViewValue('');
                                        });
                                    }
                                }
                            }

                            function mouseDownUpHandler(e) {
                                if (e.type === 'mousedown') {
                                    iElement.bind('mouseout', mouseoutHandler);
                                } else {
                                    iElement.unbind('mouseout', mouseoutHandler);
                                }
                            }

                            iElement.bind('mousedown mouseup', mouseDownUpHandler);

                            function mouseoutHandler() {
                                /*jshint validthis: true */
                                oldSelectionLength = getSelectionLength(this);
                                iElement.unbind('mouseout', mouseoutHandler);
                            }

                            function onPasteHandler() {
                                /*jshint validthis: true */
                                setCaretPosition(this, iElement.val().length);
                            }

                            function eventHandler(e) {
                                /*jshint validthis: true */
                                e = e || {};
                                // Allows more efficient minification
                                var eventWhich = e.which,
                                        eventType = e.type;

                                // Prevent shift and ctrl from mucking with old values
                                if (eventWhich === 16 || eventWhich === 91) {
                                    return;
                                }

                                var val = iElement.val(),
                                        valOld = oldValue,
                                        valMasked,
                                        valUnmasked = unmaskValue(val),
                                        valUnmaskedOld = oldValueUnmasked,
                                        caretPos = getCaretPosition(this) || 0,
                                        caretPosOld = oldCaretPosition || 0,
                                        caretPosDelta = caretPos - caretPosOld,
                                        caretPosMin = maskCaretMap[0],
                                        caretPosMax = maskCaretMap[valUnmasked.length] || maskCaretMap.slice().shift(),
                                        selectionLenOld = oldSelectionLength || 0,
                                        isSelected = getSelectionLength(this) > 0,
                                        wasSelected = selectionLenOld > 0,
                                        // Case: Typing a character to overwrite a selection
                                        isAddition = (val.length > valOld.length) || (selectionLenOld && val.length > valOld.length - selectionLenOld),
                                        // Case: Delete and backspace behave identically on a selection
                                        isDeletion = (val.length < valOld.length) || (selectionLenOld && val.length === valOld.length - selectionLenOld),
                                        isSelection = (eventWhich >= 37 && eventWhich <= 40) && e.shiftKey, // Arrow key codes

                                        isKeyLeftArrow = eventWhich === 37,
                                        // Necessary due to "input" event not providing a key code
                                        isKeyBackspace = eventWhich === 8 || (eventType !== 'keyup' && isDeletion && (caretPosDelta === -1)),
                                        isKeyDelete = eventWhich === 46 || (eventType !== 'keyup' && isDeletion && (caretPosDelta === 0) && !wasSelected),
                                        // Handles cases where caret is moved and placed in front of invalid maskCaretMap position. Logic below
                                        // ensures that, on click or leftward caret placement, caret is moved leftward until directly right of
                                        // non-mask character. Also applied to click since users are (arguably) more likely to backspace
                                        // a character when clicking within a filled input.
                                        caretBumpBack = (isKeyLeftArrow || isKeyBackspace || eventType === 'click') && caretPos > caretPosMin;

                                oldSelectionLength = getSelectionLength(this);

                                // These events don't require any action
                                if (isSelection || (isSelected && (eventType === 'click' || eventType === 'keyup'))) {
                                    return;
                                }

                                // Value Handling
                                // ==============

                                // User attempted to delete but raw value was unaffected--correct this grievous offense
                                if ((eventType === 'input') && isDeletion && !wasSelected && valUnmasked === valUnmaskedOld) {
                                    while (isKeyBackspace && caretPos > caretPosMin && !isValidCaretPosition(caretPos)) {
                                        caretPos--;
                                    }
                                    while (isKeyDelete && caretPos < caretPosMax && maskCaretMap.indexOf(caretPos) === -1) {
                                        caretPos++;
                                    }
                                    var charIndex = maskCaretMap.indexOf(caretPos);
                                    // Strip out non-mask character that user would have deleted if mask hadn't been in the way.
                                    valUnmasked = valUnmasked.substring(0, charIndex) + valUnmasked.substring(charIndex + 1);
                                }

                                // Update values
                                valMasked = maskValue(valUnmasked);

                                oldValue = valMasked;
                                oldValueUnmasked = valUnmasked;
                                iElement.val(valMasked);
                                
                                scope.$apply(function() {
                                    controller.$setViewValue(valUnmasked); // $setViewValue should be run in angular context, otherwise the changes will be invisible to angular and user code.
                                });                                

                                // Caret Repositioning
                                // ===================

                                // Ensure that typing always places caret ahead of typed character in cases where the first char of
                                // the input is a mask char and the caret is placed at the 0 position.
                                if (isAddition && (caretPos <= caretPosMin)) {
                                    caretPos = caretPosMin + 1;
                                }

                                if (caretBumpBack) {
                                    caretPos--;
                                }

                                // Make sure caret is within min and max position limits
                                caretPos = caretPos > caretPosMax ? caretPosMax : caretPos < caretPosMin ? caretPosMin : caretPos;

                                // Scoot the caret back or forth until it's in a non-mask position and within min/max position limits
                                while (!isValidCaretPosition(caretPos) && caretPos > caretPosMin && caretPos < caretPosMax) {
                                    caretPos += caretBumpBack ? -1 : 1;
                                }

                                if ((caretBumpBack && caretPos < caretPosMax) || (isAddition && !isValidCaretPosition(caretPosOld))) {
                                    caretPos++;
                                }
                                oldCaretPosition = caretPos;
                                setCaretPosition(this, caretPos);
                            }

                            function isValidCaretPosition(pos) {
                                return maskCaretMap.indexOf(pos) > -1;
                            }

                            function getCaretPosition(input) {
                                if (!input)
                                    return 0;
                                if (input.selectionStart !== undefined) {
                                    return input.selectionStart;
                                } else if (document.selection) {
                                    if (isFocused(iElement[0])) {
                                        // Curse you IE
                                        input.focus();
                                        var selection = document.selection.createRange();
                                        selection.moveStart('character', input.value ? -input.value.length : 0);
                                        return selection.text.length;
                                    }
                                }
                                return 0;
                            }

                            function setCaretPosition(input, pos) {
                                if (!input)
                                    return 0;
                                if (input.offsetWidth === 0 || input.offsetHeight === 0) {
                                    return; // Input's hidden
                                }
                                if (input.setSelectionRange) {
                                    if (isFocused(iElement[0])) {
                                        input.focus();
                                        input.setSelectionRange(pos, pos);
                                    }
                                }
                                else if (input.createTextRange) {
                                    // Curse you IE
                                    var range = input.createTextRange();
                                    range.collapse(true);
                                    range.moveEnd('character', pos);
                                    range.moveStart('character', pos);
                                    range.select();
                                }
                            }

                            function getSelectionLength(input) {
                                if (!input)
                                    return 0;
                                if (input.selectionStart !== undefined) {
                                    return (input.selectionEnd - input.selectionStart);
                                }
                                if (document.selection) {
                                    return (document.selection.createRange().text.length);
                                }
                                return 0;
                            }

                            // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
                            if (!Array.prototype.indexOf) {
                                Array.prototype.indexOf = function(searchElement /*, fromIndex */) {
                                    if (this === null) {
                                        throw new TypeError();
                                    }
                                    var t = Object(this);
                                    var len = t.length >>> 0;
                                    if (len === 0) {
                                        return -1;
                                    }
                                    var n = 0;
                                    if (arguments.length > 1) {
                                        n = Number(arguments[1]);
                                        if (n !== n) { // shortcut for verifying if it's NaN
                                            n = 0;
                                        } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
                                            n = (n > 0 || -1) * Math.floor(Math.abs(n));
                                        }
                                    }
                                    if (n >= len) {
                                        return -1;
                                    }
                                    var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
                                    for (; k < len; k++) {
                                        if (k in t && t[k] === searchElement) {
                                            return k;
                                        }
                                    }
                                    return -1;
                                };
                            }

                        };
                    }
                };
            }
        ]);

}());