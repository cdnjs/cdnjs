/*
 * Datalist polyfill - https://github.com/mfranzke/datalist-polyfill
 * @license Copyright(c) 2017 by Maximilian Franzke
 * Supported by Christian, Johannes, @mitchhentges, @mertenhanisch, @ailintom, @Kravimir, @mischah, @hryamzik, @ottoville, @IceCreamYou, @wlekin, @eddr, @beebee1987 and @mricherzhagen - many thanks for that !
 */
/*
 * A minimal and dependency-free vanilla JavaScript datalist polyfill.
 * Supports all standard's functionality as well as mimics other browsers behavior.
 * Tests for native support of an inputs elements datalist functionality.
 * Elsewhere the functionality gets emulated by a select element.
 */

(function() {
	'use strict';

	// Performance: Set local variables
	var dcmnt = window.document,
		ua = window.navigator.userAgent,
		// Feature detection
		datalistSupported =
			'list' in dcmnt.createElement('input') &&
			Boolean(dcmnt.createElement('datalist') && window.HTMLDataListElement),
		// IE & EDGE browser detection via UserAgent
		// TODO: obviously ugly. But sadly necessary until Microsoft enhances the UX within EDGE (compare to https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/9573654/)
		// adapted out of https://gist.github.com/gaboratorium/25f08b76eb82b1e7b91b01a0448f8b1d :
		isGteIE11 = Boolean(ua.indexOf('Trident/') !== -1),
		isEDGE = Boolean(ua.indexOf('Edge/') !== -1);

	// Let's break here, if it's even already supported ... and not IE11+ or EDGE
	if (datalistSupported && !isGteIE11 && !isEDGE) {
		return false;
	}

	// .matches polyfill
	// TODO: probably needs enhancement on the expected to be supported browsers
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector;
	}

	// Define some global settings and configurations
	var touched = false,
		// Speaking variables for the different keycodes
		keyENTER = 13,
		keyESC = 27,
		keyUP = 38,
		keyDOWN = 40,
		// Defining the text / value seperator for displaying the value and text values ...
		textValueSeperator = ' / ',
		// ... and defining the different input types that are supported by this polyfill
		supportedTypes = ['text', 'email', 'number', 'search', 'tel', 'url'],
		// Classes for elements
		classNameInput = 'polyfilled',
		classNamePolyfillingSelect = 'polyfilling',
		// Defining a most likely unique polyfill string
		uniquePolyfillString = '###[P0LYFlLLed]###';

	// Differentiate for touch interactions, adapted by https://medium.com/@david.gilbertson/the-only-way-to-detect-touch-with-javascript-7791a3346685
	window.addEventListener('touchstart', function onFirstTouch() {
		touched = true;

		window.removeEventListener('touchstart', onFirstTouch);
	});

	// For observing any changes to the option elements within the datalist elements, define MutationObserver initially
	var MutationObserver =
			window.MutationObserver || window.WebKitMutationObserver,
		obs;

	// Define a new observer
	if (typeof MutationObserver !== 'undefined') {
		obs = new MutationObserver(function(mutations) {
			var datalistNeedsAnUpdate = false;

			// Look through all mutations that just occured
			mutations.forEach(function(mutation) {
				// Look through all added nodes of this mutation
				for (var j = 0; j < mutation.addedNodes.length; ++j) {
					if (mutation.target.tagName.toLowerCase() === 'datalist') {
						datalistNeedsAnUpdate = mutation.target;
					}
				}
			});

			if (datalistNeedsAnUpdate) {
				var input = dcmnt.querySelector(
					'input[list="' + datalistNeedsAnUpdate.id + '"]'
				);

				if (input.value !== '') {
					// Prepare the options and toggle the visiblity afterwards
					toggleVisibility(
						prepOptions(datalistNeedsAnUpdate, input).length,
						datalistNeedsAnUpdate.getElementsByClassName(
							classNamePolyfillingSelect
						)[0]
					);
				}
			}
		});
	}

	// Function regarding the inputs interactions on keyup event
	var inputInputList = function(event) {
		var input = event.target,
			datalist = input.list,
			keyOpen = event.keyCode === keyUP || event.keyCode === keyDOWN;

		// Check for whether the events target was an input and still check for an existing instance of the datalist and polyfilling select
		if (input.tagName.toLowerCase() !== 'input' || datalist === null) {
			return;
		}

		// Handling IE11+ & EDGE
		if (isGteIE11 || isEDGE) {
			// On keypress check for value
			if (
				input.value !== '' &&
				!keyOpen &&
				event.keyCode !== keyENTER &&
				event.keyCode !== keyESC
			) {
				updateIEOptions(input, datalist);

				// TODO: Check whether this update is necessary depending on the options values
				input.focus();
			}
			return;
		}

		var visible = false,
			// Creating the select if there's no instance so far (e.g. because of that it hasn't been handled or it has been dynamically inserted)
			datalistSelect =
				datalist.getElementsByClassName(classNamePolyfillingSelect)[0] ||
				setUpPolyfillingSelect(input, datalist);

		// On an ESC or ENTER key press within the input, let's break here and afterwards hide the datalist select, but if the input contains a value or one of the opening keys have been pressed ...
		if (
			event.keyCode !== keyESC &&
			event.keyCode !== keyENTER &&
			(input.value !== '' || keyOpen) &&
			datalistSelect !== undefined
		) {
			// ... prepare the options
			if (prepOptions(datalist, input).length > 0) {
				visible = true;
			}

			var firstEntry = 0,
				lastEntry = datalistSelect.options.length - 1;

			// ... preselect best fitting index
			if (touched) {
				datalistSelect.selectedIndex = firstEntry;
			} else if (keyOpen && input.getAttribute('type') !== 'number') {
				datalistSelect.selectedIndex =
					event.keyCode === keyUP ? lastEntry : firstEntry;

				// ... and on arrow up or down keys, focus the select
				datalistSelect.focus();
			}
		}

		// Toggle the visibility of the datalist select according to previous checks
		toggleVisibility(visible, datalistSelect);
	};

	// On keypress check all options for that as a substring, save the original value as a data-attribute and preset that inputs value (for sorting) for all option values (probably as well enhanced by a token)
	var updateIEOptions = function(input, datalist) {
		// Loop through the options
		Array.prototype.slice.call(datalist.options, 0).forEach(function(option) {
			var originalValue = option.dataset.originalvalue || option.value;

			// In case of that the original value hasn't been saved as data so far, do that now
			if (!option.dataset.originalvalue) {
				option.dataset.originalvalue = originalValue;
			}

			// As we'd manipulate the value in the next step, we'd like to put in that value as either a label or text if none of those exist
			if (!option.label && !option.text) {
				option.label = originalValue;
			}

			/*
			Check for whether the current option is a valid suggestion and replace its value by
				- the current input string, as IE11+ and EDGE don't do substring, but only prefix matching
				- followed by a unique string that should prevent any interferance
				- and the original string, that is still necessary e.g. for sorting within the suggestions list
			As the value is being inserted on users selection, we'll replace that one within the upfollowing inputInputListIE function
			*/
			option.value = isValidSuggestion(option, input.value)
				? input.value + uniquePolyfillString + originalValue.toLowerCase()
				: originalValue;
		});
	};

	// Check for the input and probably replace by correct options elements value
	var inputInputListIE = function(event) {
		var input = event.target,
			datalist = input.list;

		if (
			!input.matches('input[list]') ||
			!input.matches('.' + classNameInput) ||
			!datalist
		) {
			return;
		}

		// Query for related option - and escaping the value as doublequotes wouldn't work
		var option = datalist.querySelector(
			'option[value="' + input.value.replace(/\\([\s\S])|(")/g, '\\$1$2') + '"]'
		);

		if (option && option.dataset.originalvalue) {
			input.value = option.dataset.originalvalue;
		}
	};

	// Check for whether this is a valid suggestion
	var isValidSuggestion = function(option, inputValue) {
		var optVal = option.value.toLowerCase(),
			inptVal = inputValue.toLowerCase(),
			label = option.getAttribute('label'),
			text = option.text.toLowerCase();

		/*
		"Each option element that is a descendant of the datalist element, that is not disabled, and whose value is a string that isn't the empty string, represents a suggestion. Each suggestion has a value and a label."
		"If appropriate, the user agent should use the suggestion's label and value to identify the suggestion to the user."
		*/
		return Boolean(
			option.disabled === false &&
				((optVal !== '' && optVal.indexOf(inptVal) !== -1) ||
					(label && label.toLowerCase().indexOf(inptVal) !== -1) ||
					(text !== '' && text.indexOf(inptVal) !== -1))
		);
	};

	// Focusin and -out events
	var changesInputList = function(event) {
		// Check for correct element on this event delegation
		if (!event.target.matches('input[list]')) {
			return;
		}

		var input = event.target,
			datalist = input.list;

		// Check for whether the events target was an input and still check for an existing instance of the datalist
		if (input.tagName.toLowerCase() !== 'input' || datalist === null) {
			return;
		}

		// Test for whether this input has already been enhanced by the polyfill
		if (!input.matches('.' + classNameInput)) {
			prepareInput(input, event.type);
		}

		// #GH-49: Microsoft EDGE / datalist popups get "emptied" when receiving focus via tabbing
		if (isEDGE && event.type === 'focusin') {
			// Set the value of the first option to it's value - this actually triggers a redraw of the complete list
			var firstOption = input.list.options[0];

			firstOption.value = firstOption.value;
		}

		// Break here for IE11+ & EDGE
		if (isGteIE11 || isEDGE) {
			return;
		}

		var // Creating the select if there's no instance so far (e.g. because of that it hasn't been handled or it has been dynamically inserted)
			datalistSelect =
				datalist.getElementsByClassName(classNamePolyfillingSelect)[0] ||
				setUpPolyfillingSelect(input, datalist),
			// Either have the select set to the state to get displayed in case of that it would have been focused or because it's the target on the inputs blur - and check for general existance of any option as suggestions
			visible =
				datalistSelect &&
				datalistSelect.querySelector('option:not(:disabled)') &&
				((event.type === 'focusin' && input.value !== '') ||
					(event.relatedTarget && event.relatedTarget === datalistSelect));

		// Toggle the visibility of the datalist select according to previous checks
		toggleVisibility(visible, datalistSelect);
	};

	// Prepare the input
	var prepareInput = function(input, eventType) {
		// We'd like to prevent autocomplete on the input datalist field
		input.setAttribute('autocomplete', 'off');

		// WAI ARIA attributes
		input.setAttribute('role', 'textbox');
		input.setAttribute('aria-haspopup', 'true');
		input.setAttribute('aria-autocomplete', 'list');
		input.setAttribute('aria-owns', input.getAttribute('list'));

		// Bind the keyup event on the related datalists input
		if (eventType === 'focusin') {
			input.addEventListener('keyup', inputInputList);

			input.addEventListener('focusout', changesInputList, true);

			if (isGteIE11 || isEDGE) {
				input.addEventListener('input', inputInputListIE);
			}
		} else if (eventType === 'blur') {
			input.removeEventListener('keyup', inputInputList);

			input.removeEventListener('focusout', changesInputList, true);

			if (isGteIE11 || isEDGE) {
				input.removeEventListener('input', inputInputListIE);
			}
		}

		// Add class for identifying that this input is even already being polyfilled
		input.className += ' ' + classNameInput;
	};

	// Binding the focus event - matching the input[list]s happens in the function afterwards
	dcmnt.addEventListener('focusin', changesInputList, true);

	// Break here for IE11+ & EDGE
	if (isGteIE11 || isEDGE) {
		return;
	}

	// Function for preparing and sorting the options/suggestions
	var prepOptions = function(datalist, input) {
		if (typeof obs !== 'undefined') {
			obs.disconnect();
		}

		var // Creating the select if there's no instance so far (e.g. because of that it hasn't been handled or it has been dynamically inserted)
			datalistSelect =
				datalist.getElementsByClassName(classNamePolyfillingSelect)[0] ||
				setUpPolyfillingSelect(input, datalist),
			inputValue = input.value,
			newSelectValues = dcmnt.createDocumentFragment(),
			disabledValues = dcmnt.createDocumentFragment();

		// In case of type=email and multiple attribute, we would need to grab the last piece
		// Using .getAttribute here for IE9 purpose - elsewhere it wouldn't return the newer HTML5 values correctly
		if (
			input.getAttribute('type') === 'email' &&
			input.getAttribute('multiple') !== null
		) {
			inputValue = inputValue.substring(inputValue.lastIndexOf(',') + 1);
		}

		// Create an array out of the options list
		Array.prototype.slice
			.call(datalist.querySelectorAll('option:not(:disabled)'))
			// ... sort all entries and
			.sort(function(a, b) {
				var aValue = a.value,
					bValue = b.value;

				// Using the knowledge that the values are URLs to allow the user to omit the scheme part and perform intelligent matching on the domain name
				if (input.getAttribute('type') === 'url') {
					aValue = aValue.replace(/(^\w+:|^)\/\//, '');
					bValue = bValue.replace(/(^\w+:|^)\/\//, '');
				}

				return aValue.localeCompare(bValue);
			})
			.forEach(function(opt) {
				var optionValue = opt.value,
					label = opt.getAttribute('label'),
					text = opt.text;

				// Put this option into the fragment that is meant to get inserted into the select. Additionally according to the specs ...
				// TODO: This might get slightly changed/optimized in a future release
				if (isValidSuggestion(opt, inputValue)) {
					var textOptionPart = text.substr(
							0,
							optionValue.length + textValueSeperator.length
						),
						optionPart = optionValue + textValueSeperator;

					// The innertext should be 'value seperator text' in case they are different
					if (
						text &&
						!label &&
						text !== optionValue &&
						textOptionPart !== optionPart
					) {
						opt.innerText = optionValue + textValueSeperator + text;
					} else if (!opt.text) {
						// Manipulating the option inner text, that would get displayed
						opt.innerText = label || optionValue;
					}

					newSelectValues.appendChild(opt);
				} else {
					// ... or put this option that isn't relevant to the users into the fragment that is supposed to get inserted outside of the select
					disabledValues.appendChild(opt);
				}
			});

		// Input the options fragment into the datalists select
		datalistSelect.appendChild(newSelectValues);

		var datalistSelectOptionsLength = datalistSelect.options.length;

		datalistSelect.size =
			datalistSelectOptionsLength > 10 ? 10 : datalistSelectOptionsLength;
		datalistSelect.multiple = !touched && datalistSelectOptionsLength < 2;

		// Input the unused options as siblings next to the select - and differentiate in between the regular, and the IE9 fix syntax upfront
		(datalist.getElementsByClassName('ie9_fix')[0] || datalist).appendChild(
			disabledValues
		);

		if (typeof obs !== 'undefined') {
			obs.observe(datalist, {
				childList: true
			});
		}

		return datalistSelect.options;
	};

	// Define function for setting up the polyfilling select
	var setUpPolyfillingSelect = function(input, datalist) {
		// Check for whether it's of one of the supported input types defined at the beginning
		// Using .getAttribute here for IE9 purpose - elsewhere it wouldn't return the newer HTML5 values correctly
		// and still check for an existing instance
		if (
			(input.getAttribute('type') &&
				supportedTypes.indexOf(input.getAttribute('type')) === -1) ||
			datalist === null
		) {
			return;
		}

		var rects = input.getClientRects(),
			// Measurements
			inputStyles = window.getComputedStyle(input),
			datalistSelect = dcmnt.createElement('select');

		// Setting a class for easier identifying that select afterwards
		datalistSelect.setAttribute('class', classNamePolyfillingSelect);

		// Set general styling related definitions
		datalistSelect.style.position = 'absolute';

		// Initially hiding the datalist select
		toggleVisibility(false, datalistSelect);

		// The select itself shouldn't be a possible target for tabbing
		datalistSelect.setAttribute('tabindex', '-1');

		// WAI ARIA attributes
		datalistSelect.setAttribute('aria-live', 'polite');
		datalistSelect.setAttribute('role', 'listbox');
		if (!touched) {
			datalistSelect.setAttribute('aria-multiselectable', 'false');
		}

		// The select should get positioned underneath the input field ...
		if (inputStyles.getPropertyValue('display') === 'block') {
			datalistSelect.style.marginTop =
				'-' + inputStyles.getPropertyValue('margin-bottom');
		} else {
			var direction =
				inputStyles.getPropertyValue('direction') === 'rtl' ? 'right' : 'left';

			datalistSelect.style.setProperty(
				'margin-' + direction,
				'-' +
					(rects[0].width +
						parseFloat(inputStyles.getPropertyValue('margin-' + direction))) +
					'px'
			);
			datalistSelect.style.marginTop =
				parseInt(rects[0].height + (input.offsetTop - datalist.offsetTop), 10) +
				'px';
		}

		// Set the polyfilling selects border-radius equally to the one by the polyfilled input
		datalistSelect.style.borderRadius = inputStyles.getPropertyValue(
			'border-radius'
		);
		datalistSelect.style.minWidth = rects[0].width + 'px';

		if (touched) {
			var messageElement = dcmnt.createElement('option');

			// ... and it's first entry should contain the localized message to select an entry
			messageElement.innerText = datalist.title;
			// ... and disable this option, as it shouldn't get selected by the user
			messageElement.disabled = true;
			// ... and assign a dividable class to it
			messageElement.setAttribute('class', 'message');
			// ... and finally insert it into the select
			datalistSelect.appendChild(messageElement);
		}

		// Add select to datalist element ...
		datalist.appendChild(datalistSelect);

		// ... and our upfollowing functions to the related event
		if (touched) {
			datalistSelect.addEventListener('change', changeDataListSelect);
		} else {
			datalistSelect.addEventListener('click', changeDataListSelect);
		}
		datalistSelect.addEventListener('blur', changeDataListSelect);
		datalistSelect.addEventListener('keydown', changeDataListSelect);
		datalistSelect.addEventListener('keypress', datalistSelectKeyPress);

		return datalistSelect;
	};

	// Functions regarding changes to the datalist polyfilling created selects keypress
	var datalistSelectKeyPress = function(event) {
		var datalistSelect = event.target,
			datalist = datalistSelect.parentNode,
			input = dcmnt.querySelector('input[list="' + datalist.id + '"]');

		// Check for whether the events target was a select or whether the input doesn't exist
		if (datalistSelect.tagName.toLowerCase() !== 'select' || input === null) {
			return;
		}

		// Determine a relevant key - either printable characters (that would have a length of 1) or controlling like Backspace
		if (event.key && (event.key === 'Backspace' || event.key.length === 1)) {
			input.focus();

			if (event.key === 'Backspace') {
				input.value = input.value.substr(0, input.value.length - 1);

				// Dispatch the input event on the related input[list]
				dispatchInputEvent(input);
			} else {
				input.value += event.key;
			}

			prepOptions(datalist, input);
		}
	};

	// Change, Click, Blur, Keydown
	var changeDataListSelect = function(event) {
		var datalistSelect = event.currentTarget,
			datalist = datalistSelect.parentNode,
			input = dcmnt.querySelector('input[list="' + datalist.id + '"]');

		// Check for whether the events target was a select or whether the input doesn't exist
		if (datalistSelect.tagName.toLowerCase() !== 'select' || input === null) {
			return;
		}

		var eventType = event.type,
			// ENTER and ESC
			visible =
				eventType === 'keydown' &&
				(event.keyCode !== keyENTER && event.keyCode !== keyESC);

		// On change, click or after pressing ENTER or TAB key, input the selects value into the input on a change within the list
		if (
			(eventType === 'change' ||
				eventType === 'click' ||
				(eventType === 'keydown' &&
					(event.keyCode === keyENTER || event.key === 'Tab'))) &&
			datalistSelect.value.length > 0 &&
			datalistSelect.value !== datalist.title
		) {
			var lastSeperator;

			// In case of type=email and multiple attribute, we need to set up the resulting inputs value differently
			input.value =
				// Using .getAttribute here for IE9 purpose - elsewhere it wouldn't return the newer HTML5 values correctly
				input.getAttribute('type') === 'email' &&
				input.getAttribute('multiple') !== null &&
				(lastSeperator = input.value.lastIndexOf(',')) > -1
					? input.value.slice(0, lastSeperator) + ',' + datalistSelect.value
					: (input.value = datalistSelect.value);

			// Dispatch the input event on the related input[list]
			dispatchInputEvent(input);

			// Finally focusing the input, as other browser do this as well
			if (event.key !== 'Tab') {
				input.focus();
			}

			// Set the visibility to false afterwards, as we're done here
			visible = false;
		} else if (eventType === 'keydown' && event.keyCode === keyESC) {
			// In case of the ESC key being pressed, we still want to focus the input[list]
			input.focus();
		}

		// Toggle the visibility of the datalist select according to previous checks
		toggleVisibility(visible, datalistSelect);
	};

	// Create and dispatch the input event; divided for IE9 usage
	var dispatchInputEvent = function(input) {
		var evt;

		if (typeof Event === 'function') {
			evt = new Event('input', {
				bubbles: true
			});
		} else {
			evt = dcmnt.createEvent('Event');
			evt.initEvent('input', true, false);
		}
		input.dispatchEvent(evt);
	};

	// Toggle the visibility of the datalist select
	var toggleVisibility = function(visible, datalistSelect) {
		if (visible) {
			datalistSelect.removeAttribute('hidden');
		} else {
			datalistSelect.setAttributeNode(dcmnt.createAttribute('hidden'));
		}
		datalistSelect.setAttribute('aria-hidden', (!visible).toString());
	};

	// Emulate the two properties regarding the datalist and input elements
	// list property / https://developer.mozilla.org/en/docs/Web/API/HTMLInputElement
	(function(constructor) {
		if (
			constructor &&
			constructor.prototype &&
			constructor.prototype.list === undefined
		) {
			Object.defineProperty(constructor.prototype, 'list', {
				get: function() {
					/*
					According to the specs ...
					"The list IDL attribute must return the current suggestions source element, if any, or null otherwise."
					"If there is no list attribute, or if there is no element with that ID, or if the first element with that ID is not a datalist element, then there is no suggestions source element."
					*/
					var element = dcmnt.getElementById(this.getAttribute('list'));

					return typeof this === 'object' &&
						this instanceof constructor &&
						element &&
						element.matches('datalist')
						? element
						: null;
				}
			});
		}
	})(window.HTMLInputElement);
	// Options property / https://developer.mozilla.org/en/docs/Web/API/HTMLDataListElement
	(function(constructor) {
		if (
			constructor &&
			constructor.prototype &&
			constructor.prototype.options === undefined
		) {
			Object.defineProperty(constructor.prototype, 'options', {
				get: function() {
					return typeof this === 'object' && this instanceof constructor
						? this.getElementsByTagName('option')
						: null;
				}
			});
		}
	})(window.HTMLElement);
})();
