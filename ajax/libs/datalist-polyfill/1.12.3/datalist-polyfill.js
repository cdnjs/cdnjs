/*
* datalist-polyfill.js - https://github.com/mfranzke/datalist-polyfill
* @license Copyright(c) 2017 by Maximilian Franzke
* Supported by Christian, Johannes, @mitchhentges, @mertenhanisch, @ailintom, @Kravimir, Michael, @hryamzik, @ottoville, @IceCreamYou and @wlekin - many thanks for that !
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

    // and defining the different input types that are supported by this polyfill
    supportedTypes = ['text', 'email', 'number', 'search', 'tel', 'url'];

  // differentiate for touch interactions, adapted by https://medium.com/@david.gilbertson/the-only-way-to-detect-touch-with-javascript-7791a3346685
  window.addEventListener('touchstart', function onFirstTouch() {
    touched = true;

    window.removeEventListener('touchstart', onFirstTouch);
  });

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

        var dataListSelect = dataList.getElementsByClassName('polyfilling')[0];

        // still check for an existing instance
        if (dataListSelect !== undefined) {

          // on an ESC key press within the input, let's break here and hide the select
          if (event.keyCode === keyESC) {
            dataListSelect.setAttributeNode(document.createAttribute('hidden'));
            dataListSelect.setAttribute('aria-hidden', 'true');

            return;
          }

          var dataListOptions = dataList.querySelectorAll('option:not([disabled]):not(.message)'),
            inputValue = eventTarget.value,
            newSelectValues = document.createDocumentFragment(),
            disabledValues = document.createDocumentFragment(),
            visible = false,
            multipleEmails = (eventTarget.type === 'email' && eventTarget.multiple),
            keyOpen = (event.keyCode === keyUP || event.keyCode === keyDOWN);

          // in case of type=email and multiple attribute, we would need to split the inputs value into pieces
          if (multipleEmails) {
            var multipleEntries = inputValue.split(','),
              relevantIndex = multipleEntries.length - 1;

            inputValue = multipleEntries[relevantIndex].trim();
          }

          // if the input contains a value, than ...
          if (inputValue !== '' || keyOpen) {

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

                  var label = opt.label,
                    labelValueSeperator = ' / ',
                    labelOptionPart = label.substr(0, optionValue.length + labelValueSeperator.length),
                    optionPart = optionValue + labelValueSeperator;

                  // the innertext should be value / label in case they are different
                  if (label && label !== optionValue && labelOptionPart !== optionPart) {
                    opt.innerText = optionValue + labelValueSeperator + label;

                    // remove the label attribute, as it's being displayed differently on desktop and iOS Safari for our construct
                    opt.setAttribute('data-label', opt.getAttribute('label'));
                    opt.removeAttribute('label');
                  } else if (!opt.innerText.trim()) {
                    // manipulating the option inner text, that would get displayed
                    opt.innerText = optionValue;
                  }

                  newSelectValues.appendChild(opt);

                  // ... and set the state of the select to get displayed in that case
                  visible = true;
                } else {
                  // ... or put this option that isn't relevant to the users into the fragment that is supposed to get inserted outside of the select
                  disabledValues.appendChild(opt);
                }
              });

            // input the options fragment into the datalists select
            dataListSelect.appendChild(newSelectValues);

            var dataListSelectOptionsLength = dataListSelect.options.length,
              firstEntry = 0,
              lastEntry = dataListSelectOptionsLength - 1;

            dataListSelect.size = (dataListSelectOptionsLength > 10) ? 10 : dataListSelectOptionsLength;
            dataListSelect.multiple = (!touched && dataListSelectOptionsLength < 2);

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

            // input the unused options as siblings next to the select - and differentiate in between the regular, and the IE9 fix syntax upfront
            var dataListAppend = dataList.getElementsByClassName('ie9_fix')[0] || dataList;

            dataListAppend.appendChild(disabledValues);
          }

          // toggle the visibility of the select according to previous checks
          if (visible) {
            dataListSelect.removeAttribute('hidden');
          } else {
            dataListSelect.setAttributeNode(document.createAttribute('hidden'));
          }
          dataListSelect.setAttribute('aria-hidden', (!visible).toString());

          // on arrow up or down keys, focus the select
          if (keyOpen) {

            dataListSelect.focus();
          }
        }
      }
    }
  };

  // focus or blur events
  var changesInputList = function(event) {

    var eventTarget = event.target,
      eventTargetTagName = eventTarget.tagName.toLowerCase(),
      inputType = eventTarget.type,
      inputStyles = window.getComputedStyle(eventTarget);

    // check for whether the events target was an input datalist and whether it's of one of the supported input types defined above
    if (eventTargetTagName && eventTargetTagName === 'input' && eventTarget.getAttribute('list') && supportedTypes.indexOf(inputType) > -1) {

      var eventType = event.type,
        list = eventTarget.getAttribute('list'),
        dataList = document.getElementById(list);

      // still check for an existing instance
      if (dataList !== null) {

        var dataListSelect = dataList.getElementsByClassName('polyfilling')[0],
          // either have the select set to the state to get displayed in case of that it would have been focused or because it's the target on the inputs blur
          visible = ((eventType === 'focus' && event.target.value !== '') || (event.relatedTarget && event.relatedTarget === dataListSelect)),
          message = dataList.title;

        // creating the select if there's no instance so far (e.g. because of that it hasn't been handled or it has been dynamically inserted)
        if (dataListSelect === undefined) {
          var rects = eventTarget.getClientRects(),
            // measurements
            inputStyleMarginRight = parseFloat(inputStyles.getPropertyValue('margin-right')),
            inputStyleMarginLeft = parseFloat(inputStyles.getPropertyValue('margin-left'));

          dataListSelect = document.createElement('select');

          // setting a class for easier selecting that select afterwards
          dataListSelect.setAttribute('class', 'polyfilling');

          // set general styling related definitions
          dataListSelect.setAttributeNode(document.createAttribute('hidden'));
          dataListSelect.style.position = 'absolute';

          // WAI ARIA attributes
          dataListSelect.setAttribute('aria-hidden', 'true');
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

            dataListSelect.style.marginTop = parseInt((rects[0].height + (eventTarget.offsetTop - dataList.offsetTop)), 10) + 'px';
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


          // plus we'd like to prevent autocomplete on the input datalist field
          eventTarget.setAttribute('autocomplete', 'off');

          // WAI ARIA attributes
          eventTarget.setAttribute('role', 'textbox');
          eventTarget.setAttribute('aria-haspopup', 'true');
          eventTarget.setAttribute('aria-autocomplete', 'list');
          eventTarget.setAttribute('aria-owns', list);
        }

        // toggle the visibility of the select according to previous checks
        if (visible) {
          dataListSelect.removeAttribute('hidden');
        } else {
          dataListSelect.setAttributeNode(document.createAttribute('hidden'));
        }
        dataListSelect.setAttribute('aria-hidden', (!visible).toString());

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

          // set the visibility to false afterwards, as we're done here
          visible = false;
        }
      }

      // toggle the visibility of the select according to previous checks
      if (visible) {
        select.removeAttribute('hidden');
      } else {
        select.setAttributeNode(document.createAttribute('hidden'));
      }
      select.setAttribute('aria-hidden', (!visible).toString());
    }
  };

  // binding the focus event - matching the input[list]s happens in the function afterwards
  document.addEventListener('focus', changesInputList, true);
})();
