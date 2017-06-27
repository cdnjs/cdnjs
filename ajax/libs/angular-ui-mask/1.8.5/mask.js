/*!
 * angular-ui-mask
 * https://github.com/angular-ui/ui-mask
 * Version: 1.8.5 - 2016-06-10T16:53:59.510Z
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
            clearOnBlurPlaceholder: false,
            escChar: '\\',
            eventsToHandle: ['input', 'keyup', 'click', 'focus'],
            addDefaultPlaceholder: true,
            allowInvalidValue: false
        })
        .provider('uiMask.Config', function() {
            var options = {};

            this.maskDefinitions = function(maskDefinitions) {
                return options.maskDefinitions = maskDefinitions;
            };
            this.clearOnBlur = function(clearOnBlur) {
                return options.clearOnBlur = clearOnBlur;
            };
            this.clearOnBlurPlaceholder = function(clearOnBlurPlaceholder) {
                return options.clearOnBlurPlaceholder = clearOnBlurPlaceholder;
            };
            this.eventsToHandle = function(eventsToHandle) {
                return options.eventsToHandle = eventsToHandle;
            };
            this.addDefaultPlaceholder = function(addDefaultPlaceholder) {
                return options.addDefaultPlaceholder = addDefaultPlaceholder;
            };
            this.allowInvalidValue = function(allowInvalidValue) {
                return options.allowInvalidValue = allowInvalidValue;
            };
            this.$get = ['uiMaskConfig', function(uiMaskConfig) {
                var tempOptions = uiMaskConfig;
                for(var prop in options) {
                    if (angular.isObject(options[prop]) && !angular.isArray(options[prop])) {
                        angular.extend(tempOptions[prop], options[prop]);
                    } else {
                        tempOptions[prop] = options[prop];
                    }
                }

                return tempOptions;
            }];
        })
        .directive('uiMask', ['uiMask.Config', function(maskConfig) {
                function isFocused (elem) {
                  return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                }

                return {
                    priority: 100,
                    require: 'ngModel',
                    restrict: 'A',
                    compile: function uiMaskCompilingFunction() {
                        var options = angular.copy(maskConfig);

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
                                    oldValue, oldValueUnmasked, oldCaretPosition, oldSelectionLength,
                                    // Used for communicating if a backspace operation should be allowed between
                                    // keydownHandler and eventHandler
                                    preventBackspace;

                            var originalIsEmpty = controller.$isEmpty;
                            controller.$isEmpty = function(value) {
                                if (maskProcessed) {
                                    return originalIsEmpty(unmaskValue(value || ''));
                                } else {
                                    return originalIsEmpty(value);
                                }
                            };

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
                                // but don't set the value if there is nothing entered into the element
                                // and there is a placeholder attribute on the element because that
                                // will only set the value as the blank maskPlaceholder
                                // and override the placeholder on the element
                                if (maskProcessed && !(iElement.val().length === 0 && angular.isDefined(iAttrs.placeholder))) {
                                    iElement.val(maskValue(unmaskValue(iElement.val())));
                                }
                            }

                            function initPlaceholderChar() {
                                return initialize(iAttrs.uiMask);
                            }

                            var modelViewValue = false;
                            iAttrs.$observe('modelViewValue', function(val) {
                                if (val === 'true') {
                                    modelViewValue = true;
                                }
                            });

                            iAttrs.$observe('allowInvalidValue', function(val) {
                                linkOptions.allowInvalidValue = val === ''
                                    ? true
                                    : !!val;
                                formatter(controller.$modelValue);
                            });

                            function formatter(fromModelValue) {
                                if (!maskProcessed) {
                                    return fromModelValue;
                                }
                                value = unmaskValue(fromModelValue || '');
                                isValid = validateValue(value);
                                controller.$setValidity('mask', isValid);

                                if (!value.length) return undefined;
                                if (isValid || linkOptions.allowInvalidValue) {
                                    return maskValue(value);
                                } else {
                                    return undefined;
                                }
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

                                if (isValid || linkOptions.allowInvalidValue) {
                                    return modelViewValue ? controller.$viewValue : value;
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
                                                    if (angular.isObject(current[i]) && !angular.isArray(current[i])) {
                                                        current[i] = angular.extend({}, original[i], current[i]);
                                                    }
                                                }
                                            }
                                        }
                                        return current;
                                    })(options, linkOptions[0]);
                                } else {
                                    linkOptions = options;  //gotta be a better way to do this..
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
                            if (angular.isDefined(iAttrs.uiMaskPlaceholderChar)) {
                                iAttrs.$observe('uiMaskPlaceholderChar', initPlaceholderChar);
                            }

                            controller.$formatters.unshift(formatter);
                            controller.$parsers.unshift(parser);

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
                                if ( ! originalPlaceholder && linkOptions.addDefaultPlaceholder) {
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
                                iElement.bind('keydown', keydownHandler);
                                iElement.bind(linkOptions.eventsToHandle.join(' '), eventHandler);
                                eventsBound = true;
                            }

                            function unbindEventListeners() {
                                if (!eventsBound) {
                                    return;
                                }
                                iElement.unbind('blur', blurHandler);
                                iElement.unbind('mousedown', mouseDownUpHandler);
                                iElement.unbind('mouseup', mouseDownUpHandler);
                                iElement.unbind('keydown', keydownHandler);
                                iElement.unbind('input', eventHandler);
                                iElement.unbind('keyup', eventHandler);
                                iElement.unbind('click', eventHandler);
                                iElement.unbind('focus', eventHandler);
                                eventsBound = false;
                            }

                            function validateValue(value) {
                                // Zero-length value validity is ngRequired's determination
                                return value.length ? value.length >= minRequiredLength : true;
                            }

                            function unmaskValue(value) {
                                var valueUnmasked = '',
                                    input = iElement[0],
                                    maskPatternsCopy = maskPatterns.slice(),
                                    selectionStart = oldCaretPosition,
                                    selectionEnd = selectionStart + getSelectionLength(input),
                                    valueOffset, valueDelta, tempValue = '';
                                // Preprocess by stripping mask components from value
                                value = value.toString();
                                valueOffset = 0;
                                valueDelta = value.length - maskPlaceholder.length;
                                angular.forEach(maskComponents, function(component) {
                                    var position = component.position;
                                    //Only try and replace the component if the component position is not within the selected range
                                    //If component was in selected range then it was removed with the user input so no need to try and remove that component
                                    if (!(position >= selectionStart && position < selectionEnd)) {
                                        if (position >= selectionStart) {
                                            position += valueDelta;
                                        }
                                        if (value.substring(position, position + component.value.length) === component.value) {
                                            tempValue += value.slice(valueOffset, position);// + value.slice(position + component.value.length);
                                            valueOffset = position + component.value.length;
                                        }
                                    }
                                });
                                value = tempValue + value.slice(valueOffset);
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
                                var placeholder = angular.isDefined(iAttrs.uiMaskPlaceholder) ? iAttrs.uiMaskPlaceholder : iAttrs.placeholder,
                                    defaultPlaceholderChar;

                                if (angular.isDefined(placeholder) && placeholder[i]) {
                                    return placeholder[i];
                                } else {
                                    defaultPlaceholderChar = angular.isDefined(iAttrs.uiMaskPlaceholderChar) && iAttrs.uiMaskPlaceholderChar ? iAttrs.uiMaskPlaceholderChar : '_';
                                    return (defaultPlaceholderChar.toLowerCase() === 'space') ? ' ' : defaultPlaceholderChar[0];
                                }
                            }

                            // Generate array of mask components that will be stripped from a masked value
                            // before processing to prevent mask components from being added to the unmasked value.
                            // E.g., a mask pattern of '+7 9999' won't have the 7 bleed into the unmasked value.
                            function getMaskComponents() {
                                var maskPlaceholderChars = maskPlaceholder.split(''),
                                        maskPlaceholderCopy, components;

                                //maskCaretMap can have bad values if the input has the ui-mask attribute implemented as an obversable property, e.g. the demo page
                                if (maskCaretMap && !isNaN(maskCaretMap[0])) {
                                    //Instead of trying to manipulate the RegEx based on the placeholder characters
                                    //we can simply replace the placeholder characters based on the already built
                                    //maskCaretMap to underscores and leave the original working RegEx to get the proper
                                    //mask components
                                    angular.forEach(maskCaretMap, function(value) {
                                        maskPlaceholderChars[value] = '_';
                                    });
                                }
                                maskPlaceholderCopy = maskPlaceholderChars.join('');
                                components = maskPlaceholderCopy.replace(/[_]+/g, '_').split('_');
                                components = components.filter(function(s) {
                                    return s !== '';
                                });

                                // need a string search offset in cases where the mask contains multiple identical components
                                // E.g., a mask of 99.99.99-999.99
                                var offset = 0;
                                return components.map(function(c) {
                                    var componentPosition = maskPlaceholderCopy.indexOf(c, offset);
                                    offset = componentPosition + 1;
                                    return {
                                        value: c,
                                        position: componentPosition
                                    };
                                });
                            }

                            function processRawMask(mask) {
                                var characterCount = 0;

                                maskCaretMap = [];
                                maskPatterns = [];
                                maskPlaceholder = '';

                                if (angular.isString(mask)) {
                                    minRequiredLength = 0;

                                    var isOptional = false,
                                            numberOfOptionalCharacters = 0,
                                            splitMask = mask.split('');

                                    var inEscape = false;
                                    angular.forEach(splitMask, function(chr, i) {
                                        if (inEscape) {
                                            inEscape = false;
                                            maskPlaceholder += chr;
                                            characterCount++;
                                        }
                                        else if (linkOptions.escChar === chr) {
                                            inEscape = true;
                                        }
                                        else if (linkOptions.maskDefinitions[chr]) {
                                            maskCaretMap.push(characterCount);

                                            maskPlaceholder += getPlaceholderChar(i - numberOfOptionalCharacters);
                                            maskPatterns.push(linkOptions.maskDefinitions[chr]);

                                            characterCount++;
                                            if (!isOptional) {
                                                minRequiredLength++;
                                            }

                                            isOptional = false;
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

                            var prevValue = iElement.val();
                            function blurHandler() {
                                if (linkOptions.clearOnBlur || ((linkOptions.clearOnBlurPlaceholder) && (value.length === 0) && iAttrs.placeholder)) {
                                    oldCaretPosition = 0;
                                    oldSelectionLength = 0;
                                    if (!isValid || value.length === 0) {
                                        valueMasked = '';
                                        iElement.val('');
                                        scope.$apply(function() {
                                            //only $setViewValue when not $pristine to avoid changing $pristine state.
                                            if (!controller.$pristine) {
                                                controller.$setViewValue('');
                                            }
                                        });
                                    }
                                }
                                //Check for different value and trigger change.
                                //Check for different value and trigger change.
                                if (value !== prevValue) {
                                    // #157 Fix the bug from the trigger when backspacing exactly on the first letter (emptying the field)
                                    // and then blurring out.
                                    // Angular uses html element and calls setViewValue(element.value.trim()), setting it to the trimmed mask
                                    // when it should be empty
                                    var currentVal = iElement.val();
                                    var isTemporarilyEmpty = value === '' && currentVal && angular.isDefined(iAttrs.uiMaskPlaceholderChar) && iAttrs.uiMaskPlaceholderChar === 'space'; 
                                    if(isTemporarilyEmpty) {
                                        iElement.val('');
                                    }
                                    triggerChangeEvent(iElement[0]);
                                    if(isTemporarilyEmpty) {
                                        iElement.val(currentVal);
                                    }
                                }
                                prevValue = value;
                            }

                            function triggerChangeEvent(element) {
                                var change;
                                if (angular.isFunction(window.Event) && !element.fireEvent) {
                                    // modern browsers and Edge
                                    change = new Event('change', {
                                        view: window,
                                        bubbles: true,
                                        cancelable: false
                                    });
                                    element.dispatchEvent(change);
                                } else if ('createEvent' in document) {
                                    // older browsers
                                    change = document.createEvent('HTMLEvents');
                                    change.initEvent('change', false, true);
                                    element.dispatchEvent(change);
                                }
                                else if (element.fireEvent) {
                                    // IE <= 11
                                    element.fireEvent('onchange');
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

                            function keydownHandler(e) {
                                /*jshint validthis: true */
                                var isKeyBackspace = e.which === 8,
                                    caretPos = getCaretPosition(this) - 1 || 0; //value in keydown is pre change so bump caret position back to simulate post change

                                if (isKeyBackspace) {
                                    while(caretPos >= 0) {
                                        if (isValidCaretPosition(caretPos)) {
                                            //re-adjust the caret position.
                                            //Increment to account for the initial decrement to simulate post change caret position
                                            setCaretPosition(this, caretPos + 1);
                                            break;
                                        }
                                        caretPos--;
                                    }
                                    preventBackspace = caretPos === -1;
                                }
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
                                        valAltered = false,
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
                                if (isSelection || (isSelected && (eventType === 'click' || eventType === 'keyup' || eventType === 'focus'))) {
                                    return;
                                }

                                if (isKeyBackspace && preventBackspace) {
                                    iElement.val(maskPlaceholder);
                                    // This shouldn't be needed but for some reason after aggressive backspacing the controller $viewValue is incorrect.
                                    // This keeps the $viewValue updated and correct.
                                    scope.$apply(function () {
                                        controller.$setViewValue(''); // $setViewValue should be run in angular context, otherwise the changes will be invisible to angular and user code.
                                    });
                                    setCaretPosition(this, caretPosOld);
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

                                    // If value has not changed, don't want to call $setViewValue, may be caused by IE raising input event due to placeholder
                                    if (valUnmasked !== valUnmaskedOld)
                                        valAltered = true;
                                }

                                // Update values
                                valMasked = maskValue(valUnmasked);

                                oldValue = valMasked;
                                oldValueUnmasked = valUnmasked;

                                //additional check to fix the problem where the viewValue is out of sync with the value of the element.
                                //better fix for commit 2a83b5fb8312e71d220a497545f999fc82503bd9 (I think)
                                if (!valAltered && val.length > valMasked.length)
                                    valAltered = true;

                                iElement.val(valMasked);

                                //we need this check.  What could happen if you don't have it is that you'll set the model value without the user
                                //actually doing anything.  Meaning, things like pristine and touched will be set.
                                if (valAltered) {
                                    scope.$apply(function () {
                                        controller.$setViewValue(valMasked); // $setViewValue should be run in angular context, otherwise the changes will be invisible to angular and user code.
                                    });
                                }

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