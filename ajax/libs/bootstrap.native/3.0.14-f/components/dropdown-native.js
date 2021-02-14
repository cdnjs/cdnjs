/*!
  * Native JavaScript for Bootstrap Dropdown v3.0.14f (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Dropdown = factory());
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

  function setFocus (element){
    element.focus ? element.focus() : element.setActive();
  }

  // DROPDOWN DEFINITION
  // ===================

  function Dropdown(element,option) {
    
    // bind 
    var self = this,

        // custom events
        showCustomEvent,
        shownCustomEvent,
        hideCustomEvent,
        hiddenCustomEvent,
        // targets
        relatedTarget = null,
        parent, menu, menuItems = [],
        // option
        persist;
    
    // preventDefault on empty anchor links
    function preventEmptyAnchor(anchor) {
      (anchor.href && anchor.href.slice(-1) === '#' || anchor.parentNode && anchor.parentNode.href 
        && anchor.parentNode.href.slice(-1) === '#') && this.preventDefault();    
    }
    // toggle dismissible events
    function toggleDismiss() {
      var action = element.open ? 'addEventListener' : 'removeEventListener';
      document[action]('click',dismissHandler,false); 
      document[action]('keydown',preventScroll,false);
      document[action]('keyup',keyHandler,false);
      document[action]('focus',dismissHandler,false);
    }
    // handlers
    function dismissHandler(e) {
      var eventTarget = e.target,
            hasData = eventTarget && (eventTarget.getAttribute('data-toggle') 
                                  || eventTarget.parentNode && eventTarget.parentNode.getAttribute
                                  && eventTarget.parentNode.getAttribute('data-toggle'));
      if ( e.type === 'focus' && (eventTarget === element || eventTarget === menu || menu.contains(eventTarget) ) ) {
        return;
      }
      if ( (eventTarget === menu || menu.contains(eventTarget)) && (persist || hasData) ) { return; }
      else {
        relatedTarget = eventTarget === element || element.contains(eventTarget) ? element : null;
        self.hide();
      }
      preventEmptyAnchor.call(e,eventTarget);
    }
    function clickHandler(e) {
      relatedTarget = element;
      self.show();
      preventEmptyAnchor.call(e,e.target);
    }
    function preventScroll(e) {
      var key = e.which || e.keyCode;
      if( key === 38 || key === 40 ) { e.preventDefault(); }
    }
    function keyHandler(e) {
      var key = e.which || e.keyCode,
          activeItem = document.activeElement,
          isSameElement = activeItem === element,
          isInsideMenu = menu.contains(activeItem),
          isMenuItem = activeItem.parentNode === menu || activeItem.parentNode.parentNode === menu,
          idx = menuItems.indexOf(activeItem);

      if ( isMenuItem ) { // navigate up | down
        idx = isSameElement ? 0 
                            : key === 38 ? (idx>1?idx-1:0)
                            : key === 40 ? (idx<menuItems.length-1?idx+1:idx) : idx;
        menuItems[idx] && setFocus(menuItems[idx]);
      }
      if ( (menuItems.length && isMenuItem // menu has items
            || !menuItems.length && (isInsideMenu || isSameElement)  // menu might be a form
            || !isInsideMenu ) // or the focused element is not in the menu at all
            && element.open && key === 27  // menu must be open
      ) {
        self.toggle();
        relatedTarget = null;
      }
    }

    // public methods
    self.show = function () {
      showCustomEvent = bootstrapCustomEvent('show', 'dropdown', { relatedTarget: relatedTarget });
      dispatchCustomEvent.call(parent, showCustomEvent);
      if ( showCustomEvent.defaultPrevented ) { return; }

      menu.classList.add('show');
      parent.classList.add('show');
      element.setAttribute('aria-expanded',true);
      element.open = true;
      element.removeEventListener('click',clickHandler,false);
      setTimeout(function () {
        setFocus( menu.getElementsByTagName('INPUT')[0] || element ); // focus the first input item | element
        toggleDismiss();
        shownCustomEvent = bootstrapCustomEvent('shown', 'dropdown', { relatedTarget: relatedTarget });
        dispatchCustomEvent.call(parent, shownCustomEvent);        
      },1);
    };
    self.hide = function () {
      hideCustomEvent = bootstrapCustomEvent('hide', 'dropdown', { relatedTarget: relatedTarget });
      dispatchCustomEvent.call(parent, hideCustomEvent);
      if ( hideCustomEvent.defaultPrevented ) { return; }

      menu.classList.remove('show');
      parent.classList.remove('show');
      element.setAttribute('aria-expanded',false);
      element.open = false;
      toggleDismiss();
      setFocus(element);
      setTimeout(function () {
        // only re-attach handler if the init is not disposed
        element.Dropdown && element.addEventListener('click',clickHandler,false); 
      },1);

      hiddenCustomEvent = bootstrapCustomEvent('hidden', 'dropdown', { relatedTarget: relatedTarget });
      dispatchCustomEvent.call(parent, hiddenCustomEvent);
    };
    self.toggle = function () {
      if (parent.classList.contains('show') && element.open) { self.hide(); } 
      else { self.show(); }
    };
    self.dispose = function () {
      if (parent.classList.contains('show') && element.open) { self.hide(); }
      element.removeEventListener('click',clickHandler,false);
      delete element.Dropdown;
    };

    // init

    // initialization element
    element = queryElement(element);

    // reset on re-init
    element.Dropdown && element.Dropdown.dispose();

    // set  targets
    parent = element.parentNode;
    menu = queryElement('.dropdown-menu', parent);

    Array.from(menu.children).map(function (child){
      child.children.length && (child.children[0].tagName === 'A' && menuItems.push(child.children[0]));
      child.tagName === 'A' && menuItems.push(child);
    });

    // prevent adding event handlers twice
    if ( !element.Dropdown ) { 
      !('tabindex' in menu) && menu.setAttribute('tabindex', '0'); // Fix onblur on Chrome | Safari
      element.addEventListener('click',clickHandler,false);
    }

    // set option
    persist = option === true || element.getAttribute('data-persist') === 'true' || false;

    // set initial state to closed
    element.open = false;

    // associate element with init object 
    element.Dropdown = self;
  }

  return Dropdown;

})));
