/*!
  * Native JavaScript for Bootstrap Button v3.0.14f (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Button = factory());
}(this, (function () { 'use strict';

  function queryElement(selector, parent) {
    var lookUp = parent && parent instanceof Element ? parent : document;
    return selector instanceof Element ? selector : lookUp.querySelector(selector);
  }

  function bootstrapCustomEvent( eventType, componentName, eventProperties ) {
    var OriginalCustomEvent = new CustomEvent( eventType + '.bs.' + componentName, { cancelable: true } );

    if ( typeof eventProperties !== 'undefined' ) {
      Object.keys( eventProperties ).forEach( function (key) {
        Object.defineProperty( OriginalCustomEvent, key, {
          value: eventProperties[key]
        });
      });
    }
    return OriginalCustomEvent
  }

  function dispatchCustomEvent(customEvent){
    this && this.dispatchEvent(customEvent);
  }

  // BUTTON DEFINITION
  // =================

  function Button(element) {

    // bind and labels
    var self = this, labels,

        // changeEvent
        changeCustomEvent = bootstrapCustomEvent('change', 'button');

    // private methods
    function toggle(e) {
      var input,
          label = e.target.tagName === 'LABEL' ? e.target 
                : e.target.closest('LABEL') ? e.target.closest('LABEL') : null; // the .btn label

      // current input
      input = label && label.getElementsByTagName('INPUT')[0];

      // invalidate if no input
      if ( !input ) { return; } 

      dispatchCustomEvent.call(input, changeCustomEvent); // trigger the change for the input
      dispatchCustomEvent.call(element, changeCustomEvent); // trigger the change for the btn-group

      // manage the dom manipulation
      if ( input.type === 'checkbox' ) { //checkboxes
        if ( changeCustomEvent.defaultPrevented ) { return; } // discontinue when defaultPrevented is true

        if ( !input.checked ) {
          label.classList.add('active');
          input.getAttribute('checked');
          input.setAttribute('checked','checked');
          input.checked = true;
        } else {
          label.classList.remove('active');
          input.getAttribute('checked');
          input.removeAttribute('checked');
          input.checked = false;
        }

        if (!element.toggled) { // prevent triggering the event twice
          element.toggled = true;
        }
      }

      if ( input.type === 'radio' && !element.toggled ) { // radio buttons
        if ( changeCustomEvent.defaultPrevented ) { return; }
        // don't trigger if already active (the OR condition is a hack to check if the buttons were selected with key press and NOT mouse click)
        if ( !input.checked || (e.screenX === 0 && e.screenY == 0) ) {
          label.classList.add('active');
          label.classList.add('focus');
          input.setAttribute('checked','checked');
          input.checked = true;

          element.toggled = true;
          Array.from(labels).map(function (otherLabel){
            var otherInput = otherLabel.getElementsByTagName('INPUT')[0];
            if ( otherLabel !== label && otherLabel.classList.contains('active') )  {
              dispatchCustomEvent.call(otherInput, changeCustomEvent); // trigger the change
              otherLabel.classList.remove('active');
              otherInput.removeAttribute('checked');
              otherInput.checked = false;
            }
          });
        }
      }
      setTimeout( function () { element.toggled = false; }, 50 );
    }

    // handlers
    function keyHandler(e) {
      var key = e.which || e.keyCode;
      key === 32 && e.target === document.activeElement && toggle(e);
    }
    function preventScroll(e) { 
      var key = e.which || e.keyCode;
      key === 32 && e.preventDefault();
    }
    function focusToggle(e) {
      if (e.target.tagName === 'INPUT' ) {
        var action = e.type === 'focusin' ? 'add' : 'remove';
        e.target.closest('.btn').classList[action]('focus');
      }
    }
    function toggleEvents(action) {
      action = action ? 'addEventListener' : 'removeEventListener';
      element[action]('click',toggle,false );
      element[action]('keyup',keyHandler,false), element[action]('keydown',preventScroll,false);
      element[action]('focusin',focusToggle,false), element[action]('focusout',focusToggle,false);
    }

    // public method
    self.dispose = function () {
      toggleEvents();
      delete element.Button;
    };

    // init
    // initialization element
    element = queryElement(element);

    // reset on re-init
    element.Button && element.Button.dispose();

    labels = element.getElementsByClassName('btn');

    // invalidate
    if (!labels.length) { return; }

    // prevent adding event handlers twice
    if ( !element.Button ) { 
      toggleEvents(1);
    }

    // set initial toggled state
    // toggled makes sure to prevent triggering twice the change.bs.button events
    element.toggled = false;  
    
    // associate target with init object
    element.Button = self;

    // activate items on load
    Array.from(labels).map(function (btn){
      !btn.classList.contains('active') 
        && queryElement('input:checked',btn)
        && btn.classList.add('active');
      btn.classList.contains('active')
        && !queryElement('input:checked',btn)
        && btn.classList.remove('active');
    });
  }

  return Button;

})));
