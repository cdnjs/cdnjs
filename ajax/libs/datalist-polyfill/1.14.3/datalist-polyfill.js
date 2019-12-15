/*
* datalist-polyfill.js - https://github.com/mfranzke/datalist-polyfill
* @license Copyright(c) 2017 by Maximilian Franzke
* Supported by Christian, Johannes, @mitchhentges, @mertenhanisch, @ailintom, @Kravimir, @mischah, @hryamzik, @ottoville, @IceCreamYou, @wlekin, @eddr and @beebee1987 - many thanks for that !
*/
/*
* A lightweight and library dependency free vanilla JavaScript datalist polyfill.
* Tests for native support of an inputs elements datalist functionality.
* Elsewhere the functionality gets emulated by a select element.
*/

(function() {
  'use strict';

  // feature detection
  var nativedatalist = ('list' in document.createElement('input')) &&
    !!( document.createElement('datalist') && window.HTMLDataListElement );

  // in case of that the feature doesn't exist, emulate it's functionality
  if (nativedatalist) {
    return false;
  }

  // emulate the two properties regarding the datalist and input elements
  // list property / https://developer.mozilla.org/en/docs/Web/API/HTMLInputElement
  (function(constructor) {
    if (constructor &&
      constructor.prototype &&
      constructor.prototype.list === undefined) {
      Object.defineProperty(constructor.prototype, 'list', {
        get: function() {
          if (typeof( this ) === 'object' && this instanceof constructor) {
            var list = this.getAttribute('list');

            return document.getElementById(list);
          }
          return null;
        }
      });
    }
  })(window.HTMLInputElement);
  // options property / https://developer.mozilla.org/en/docs/Web/API/HTMLDataListElement
  (function(constructor) {
    if (constructor &&
      constructor.prototype &&
      constructor.prototype.options === undefined) {
      Object.defineProperty(constructor.prototype, 'options', {
        get: function() {
          if (typeof( this ) === 'object' && this instanceof constructor) {
            return this.getElementsByTagName('option');
          }
        }
      });
    }
  })(window.HTMLElement);

  // identify whether a select multiple is feasible
  var touched = false,

    // speaking variables for the different keycodes
    keyENTER = 13,
    keyESC = 27,
    keyUP = 38,
    keyDOWN = 40,

    // defining the text / value seperator for displaying the value and text values
    textValueSeperator = ' / ',

    // and defining the different input types that are supported by this polyfill
    supportedTypes = ['text', 'email', 'number', 'search', 'tel', 'url'],

    // classes for elements
    classNameInput = 'polyfilled',
    classNamePolyfillingSelect = 'polyfilling';

  // differentiate for touch interactions, adapted by https://medium.com/@david.gilbertson/the-only-way-to-detect-touch-with-javascript-7791a3346685
  window.addEventListener('touchstart', function onFirstTouch() {
    touched = true;

    window.removeEventListener('touchstart', onFirstTouch);
  });


  // for observing any changes to the option elements within the datalist elements, define MutationObserver initially
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  // define a new observer
  if (typeof(MutationObserver) !== 'undefined') {
    var obs = new MutationObserver(function(mutations) {
      var datalistNeedsAnUpdate = false;

      // look through all mutations that just occured
      for(var i=0; i<mutations.length; ++i) {

        // look through all added nodes of this mutation
        for(var j=0; j<mutations[i].addedNodes.length; ++j) {
          if (mutations[i].target.tagName.toLowerCase() === 'datalist') {
            datalistNeedsAnUpdate = mutations[i].target;
          }
        }
      }

      if (datalistNeedsAnUpdate) {
        var input = document.querySelector('[list="' + datalistNeedsAnUpdate.id + '"]');

        if (input.value !== '') {
          var dataList = datalistNeedsAnUpdate;

          // prepare the options and toggle the visiblity afterwards
          toggleVisibility(dataList.getElementsByClassName(classNamePolyfillingSelect)[0], prepOptions(dataList, input));
        }
      }
    });
  }

  // function regarding the inputs interactions
  var inputInputList = function(event) {

    var eventTarget = event.target,
      eventTargetTagName = eventTarget.tagName.toLowerCase();

    // check for whether the events target was an input datalist
    if (eventTargetTagName && eventTargetTagName === 'input' && eventTarget.getAttribute('list')) {

      var list = eventTarget.getAttribute('list'),
        dataList = document.getElementById(list);

      // still check for an existing instance
      if (dataList !== null) {

        var dataListSelect = dataList.getElementsByClassName(classNamePolyfillingSelect)[0] || setUpPolyfillingSelect(eventTarget, dataList);

        // still check for an existing instance
        if (dataListSelect !== undefined) {

          var visible = false;

          // on an ESC or ENTER key press within the input, let's break here and afterwards hide the datalist select
          if (event.keyCode !== keyESC && event.keyCode !== keyENTER) {

            var inputValue = eventTarget.value,
              keyOpen = (event.keyCode === keyUP || event.keyCode === keyDOWN);

            // if the input contains a value, than ...
            if (inputValue !== '' || keyOpen) {

              // prepare the options
              if (prepOptions(dataList, eventTarget)) {
                visible = true;
              }

              var dataListSelectOptionsLength = dataListSelect.options.length,
                firstEntry = 0,
                lastEntry = dataListSelectOptionsLength - 1;

              if (touched) {
                // preselect best fitting index
                dataListSelect.selectedIndex = firstEntry;

              } else if (dataListSelect.selectedIndex === -1) {

                switch (event.keyCode) {
                  case keyUP:
                    dataListSelect.selectedIndex = lastEntry;
                    break;
                  case keyDOWN:
                    dataListSelect.selectedIndex = firstEntry;
                    break;
                }
              }

              // on arrow up or down keys, focus the select
              if (keyOpen) {

                dataListSelect.focus();
              }

            }
          }

          // toggle the visibility of the datalist select according to previous checks
          toggleVisibility(dataListSelect, visible);
        }
      }
    }
  };

  // function for preparing and sorting the options/suggestions
  var prepOptions = function(dataList, input) {

    if (typeof(obs) !== 'undefined') {
      obs.disconnect();
    }

    var dataListSelect = dataList.getElementsByClassName(classNamePolyfillingSelect)[0] || setUpPolyfillingSelect(input, dataList),
      dataListOptions = dataList.querySelectorAll('option:not([disabled]):not(.message)'),
      inputValue = input.value,
      newSelectValues = document.createDocumentFragment(),
      disabledValues = document.createDocumentFragment(),
      multipleEmails = (input.type === 'email' && input.multiple);

    // in case of type=email and multiple attribute, we would need to split the inputs value into pieces
    if (multipleEmails) {
      var multipleEntries = inputValue.split(','),
        relevantIndex = multipleEntries.length - 1;

      inputValue = multipleEntries[relevantIndex].trim();
    }

    // ... create an array out of the options list
    var nodeArray = Array.prototype.slice.call(dataListOptions);

    // ... sort all entries and
    nodeArray.sort(function(a, b) {
      return a.value.localeCompare(b.value);
    })
    .forEach(function(opt) {
      var optionValue = opt.value;

      // ... put this option into the fragment that is meant to get inserted into the select
      // "Each option element that is a descendant of the datalist element, that is not disabled, and whose value is a string that isn't the empty string, represents a suggestion. Each suggestion has a value and a label." (W3C)
      if (optionValue !== '' && optionValue.toLowerCase()
          .indexOf(inputValue.toLowerCase()) !== -1 && opt.disabled === false) {

        var label = opt.getAttribute('label'),
          text = opt.text,
          textOptionPart = text.substr(0, optionValue.length + textValueSeperator.length),
          optionPart = optionValue + textValueSeperator;

        // the innertext should be value / text in case they are different
        if (text && !label && text !== optionValue && textOptionPart !== optionPart) {
          opt.innerText = optionValue + textValueSeperator + text;

        } else if (!opt.text) {
          // manipulating the option inner text, that would get displayed
          opt.innerText = label || optionValue;
        }

        newSelectValues.appendChild(opt);
      } else {
        // ... or put this option that isn't relevant to the users into the fragment that is supposed to get inserted outside of the select
        disabledValues.appendChild(opt);
      }
    });

    // input the options fragment into the datalists select
    dataListSelect.appendChild(newSelectValues);

    var dataListSelectOptionsLength = dataListSelect.options.length;

    dataListSelect.size = (dataListSelectOptionsLength > 10) ? 10 : dataListSelectOptionsLength;
    dataListSelect.multiple = (!touched && dataListSelectOptionsLength < 2);

    // input the unused options as siblings next to the select - and differentiate in between the regular, and the IE9 fix syntax upfront
    var dataListAppend = dataList.getElementsByClassName('ie9_fix')[0] || dataList;

    dataListAppend.appendChild(disabledValues);

    if (typeof(obs) !== 'undefined') {
      obs.observe(dataList, {
        childList: true
      });
    }

    return dataListSelectOptionsLength;

  };

  // focus or blur events
  var changesInputList = function(event) {

    var eventTarget = event.target,
      eventTargetTagName = eventTarget.tagName.toLowerCase();

    // check for whether the events target was an input datalist and whether it's of one of the supported input types defined above
    if (eventTargetTagName && eventTargetTagName === 'input' && eventTarget.getAttribute('list')) {

      var eventType = event.type,
        list = eventTarget.getAttribute('list'),
        dataList = document.getElementById(list);

      // still check for an existing instance
      if (dataList !== null) {
        // creating the select if there's no instance so far (e.g. because of that it hasn't been handled or it has been dynamically inserted)
        var dataListSelect = dataList.getElementsByClassName(classNamePolyfillingSelect)[0] || setUpPolyfillingSelect(eventTarget, dataList),
          // either have the select set to the state to get displayed in case of that it would have been focused or because it's the target on the inputs blur - and check for general existance of any option as suggestions
          visible = (dataListSelect && dataListSelect.querySelector('option:not(:disabled)') && ((eventType === 'focus' && eventTarget.value !== '') || (event.relatedTarget && event.relatedTarget === dataListSelect)));

        // test for whether this input has already been enhanced by the polyfill
        if (!new RegExp(' ' + classNameInput + ' ').test(' ' + eventTarget.className + ' ')) {
          // we'd like to prevent autocomplete on the input datalist field
          eventTarget.setAttribute('autocomplete', 'off');

          // WAI ARIA attributes
          eventTarget.setAttribute('role', 'textbox');
          eventTarget.setAttribute('aria-haspopup', 'true');
          eventTarget.setAttribute('aria-autocomplete', 'list');
          eventTarget.setAttribute('aria-owns', list);

          // bind the keyup event on the related datalists input
          switch (eventType) {
            case 'focus':
              eventTarget.addEventListener('keyup', inputInputList);

              eventTarget.addEventListener('focusout', changesInputList, true);
              break;
            case 'blur':
              eventTarget.removeEventListener('keyup', inputInputList);

              eventTarget.removeEventListener('focusout', changesInputList, true);
              break;
          }

          // add class for identifying that this input is even already being polyfilled
          eventTarget.className += ' ' + classNameInput;
        }

        // toggle the visibility of the datalist select according to previous checks
        toggleVisibility(dataListSelect, visible);
      }
    }
  };

  // define function for setting up the polyfilling select
  var setUpPolyfillingSelect = function(input, dataList) {
    var inputType = input.type;

    if (supportedTypes.indexOf(inputType) > -1) {

      // still check for an existing instance
      if (dataList !== null) {

        var message = dataList.title,
          rects = input.getClientRects(),
          // measurements
          inputStyles = window.getComputedStyle(input),
          inputStyleMarginRight = parseFloat(inputStyles.getPropertyValue('margin-right')),
          inputStyleMarginLeft = parseFloat(inputStyles.getPropertyValue('margin-left')),
          dataListSelect = document.createElement('select');

        // setting a class for easier selecting that select afterwards
        dataListSelect.setAttribute('class', classNamePolyfillingSelect);

        // set general styling related definitions
        dataListSelect.style.position = 'absolute';

        // initially hiding the datalist select
        toggleVisibility(dataListSelect, false);

        // WAI ARIA attributes
        dataListSelect.setAttribute('aria-live', 'polite');
        dataListSelect.setAttribute('role', 'listbox');
        if (!touched) {
          dataListSelect.setAttribute('aria-multiselectable', 'false');
        }

        // the select should get positioned underneath the input field ...
        if (inputStyles.getPropertyValue('display') === 'block') {
          dataListSelect.style.marginTop = '-' + inputStyles.getPropertyValue('margin-bottom');
        } else {
          if (inputStyles.getPropertyValue('direction') === 'rtl') {
            dataListSelect.style.marginRight = '-' + (rects[0].width + inputStyleMarginLeft) + 'px';
          } else {
            dataListSelect.style.marginLeft = '-' + (rects[0].width + inputStyleMarginRight) + 'px';
          }

          dataListSelect.style.marginTop = parseInt((rects[0].height + (input.offsetTop - dataList.offsetTop)), 10) + 'px';
        }

        // set the polyfilling selects border-radius equally as the one by the polyfilled input
        dataListSelect.style.borderRadius = inputStyles.getPropertyValue('border-radius');
        dataListSelect.style.minWidth = rects[0].width + 'px';

        if (touched) {
          var messageElement = document.createElement('option');

          // ... and it's first entry should contain the localized message to select an entry
          messageElement.innerText = message;
          // ... and disable this option, as it shouldn't get selected by the user
          messageElement.disabled = true;
          // ... and assign a dividable class to it
          messageElement.setAttribute('class', 'message');
          // ... and finally insert it into the select
          dataListSelect.appendChild(messageElement);
        }

        // add select to datalist element ...
        dataList.appendChild(dataListSelect);

        // ... and our upfollowing function to the change event

        if (touched) {
          dataListSelect.addEventListener('change', changeDataListSelect);
        } else {
          dataListSelect.addEventListener('click', changeDataListSelect);
        }
        dataListSelect.addEventListener('blur', changeDataListSelect);
        dataListSelect.addEventListener('keyup', changeDataListSelect);

        return dataListSelect;
      }
    }
  };

  // function regarding changes to the datalist polyfilling created select
  var changeDataListSelect = function(event) {

    var eventTarget = event.target,
      eventTargetTagName = eventTarget.tagName.toLowerCase();

    // check for whether the events target was a select or an option
    if (eventTargetTagName && (eventTargetTagName === 'select' || eventTargetTagName === 'option')) {

      var select = (eventTargetTagName === 'select') ? eventTarget : eventTarget.parentNode,
        datalist = select.parentNode,
        message = datalist.title,
        eventType = event.type,
        // ENTER and ESC
        visible = (eventType === 'keyup' && (event.keyCode !== keyENTER && event.keyCode !== keyESC));

      // change or mouseup event or ENTER key
      if (eventType === 'change' || eventType === 'click' || (eventType === 'keyup' && event.keyCode === keyENTER)) {

        var list = datalist.id,
          inputList = document.querySelector('input[list="' + list + '"]'),
          selectValue = select.value;

        // input the selects value into the input on a change within the list
        if (inputList !== null && typeof( selectValue ) !== 'undefined' && selectValue.length > 0 && selectValue !== message) {
          var inputListValue = inputList.value,
            lastSeperator,
            multipleEmails = (inputList.type === 'email' && inputList.multiple),
            evt;

          // in case of type=email and multiple attribute, we need to set up the resulting inputs value differently
          if (multipleEmails && (lastSeperator = inputListValue.lastIndexOf(',') ) > -1) {
            inputList.value = inputListValue.slice(0, lastSeperator) + ',' + selectValue;
          } else {
            inputList.value = selectValue;
          }

          // create and dispatch the input event; divided for IE9 usage
          if (typeof(Event) === 'function') {
            evt = new Event('input', {
              bubbles:true
            });
          } else {
            evt = document.createEvent('Event');
            evt.initEvent('input', true, false);
          }
          inputList.dispatchEvent(evt);

          // finally focusing the input, as other browser do this as well
          inputList.focus();

          // set the visibility to false afterwards, as we're done here
          visible = false;
        }
      }

      // toggle the visibility of the datalist select according to previous checks
      toggleVisibility(select, visible);
    }
  };

  // toggle the visibility of the datalist select
  var toggleVisibility = function(dataListSelect, visible) {
    if (visible === undefined) {
     visible = (dataListSelect && dataListSelect.querySelector('option:not(:disabled)'));
    }

    if (visible) {
      dataListSelect.removeAttribute('hidden');
    } else {
      dataListSelect.setAttributeNode(document.createAttribute('hidden'));
    }
    dataListSelect.setAttribute('aria-hidden', (!visible).toString());
  };

  // binding the focus event - matching the input[list]s happens in the function afterwards
  document.addEventListener('focus', changesInputList, true);
})();
