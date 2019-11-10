// Native Javascript for Bootstrap 3 v2.0.16 | © dnp_theme | MIT-License
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD support:
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like:
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    var bsn = factory();
    root.Affix = bsn.Affix;
    root.Alert = bsn.Alert;
    root.Button = bsn.Button;
    root.Carousel = bsn.Carousel;
    root.Collapse = bsn.Collapse;
    root.Dropdown = bsn.Dropdown;
    root.Modal = bsn.Modal;
    root.Popover = bsn.Popover;
    root.ScrollSpy = bsn.ScrollSpy;
    root.Tab = bsn.Tab;
    root.Tooltip = bsn.Tooltip;
  }
}(this, function () {
  
  /* Native Javascript for Bootstrap 3 | Internal Utility Functions
  ----------------------------------------------------------------*/
  "use strict";
  
  // globals
  var globalObject = typeof global !== 'undefined' ? global : this||window,
    doc = document.documentElement, body = document.body,
  
    // function toggle attributes
    dataToggle    = 'data-toggle',
    dataDismiss   = 'data-dismiss',
    dataSpy       = 'data-spy',
    dataRide      = 'data-ride',
    
    // components
    stringAffix     = 'Affix',
    stringAlert     = 'Alert',
    stringButton    = 'Button',
    stringCarousel  = 'Carousel',
    stringCollapse  = 'Collapse',
    stringDropdown  = 'Dropdown',
    stringModal     = 'Modal',
    stringPopover   = 'Popover',
    stringScrollSpy = 'ScrollSpy',
    stringTab       = 'Tab',
    stringTooltip   = 'Tooltip',
  
    // options DATA API
    databackdrop      = 'data-backdrop',
    dataKeyboard      = 'data-keyboard',
    dataTarget        = 'data-target',
    dataInterval      = 'data-interval',
    dataHeight        = 'data-height',
    dataPause         = 'data-pause',
    dataOriginalTitle = 'data-original-title',
    dataOriginalText  = 'data-original-text',
    dataDismissible   = 'data-dismissible',
    dataTrigger       = 'data-trigger',
    dataAnimation     = 'data-animation',
    dataContainer     = 'data-container',
    dataPlacement     = 'data-placement',
    dataDelay         = 'data-delay',
    dataOffsetTop     = 'data-offset-top',
    dataOffsetBottom  = 'data-offset-bottom',
  
    // option keys
    backdrop = 'backdrop', keyboard = 'keyboard', delay = 'delay',
    content = 'content', target = 'target', 
    interval = 'interval', pause = 'pause', animation = 'animation',
    placement = 'placement', container = 'container', 
  
    // box model
    offsetTop    = 'offsetTop',      offsetBottom   = 'offsetBottom',
    offsetLeft   = 'offsetLeft',
    scrollTop    = 'scrollTop',      scrollLeft     = 'scrollLeft',
    clientWidth  = 'clientWidth',    clientHeight   = 'clientHeight',
    offsetWidth  = 'offsetWidth',    offsetHeight   = 'offsetHeight',
    innerWidth   = 'innerWidth',     innerHeight    = 'innerHeight',
    scrollHeight = 'scrollHeight',   height         = 'height',
  
    // aria
    ariaExpanded = 'aria-expanded',
    ariaHidden   = 'aria-hidden',
  
    // event names
    clickEvent    = 'click',
    hoverEvent    = 'hover',
    keydownEvent  = 'keydown',
    resizeEvent   = 'resize',
    scrollEvent   = 'scroll',
    // originalEvents
    showEvent     = 'show',
    shownEvent    = 'shown',
    hideEvent     = 'hide',
    hiddenEvent   = 'hidden',
    closeEvent    = 'close',
    closedEvent   = 'closed',
    slidEvent     = 'slid',
    slideEvent    = 'slide',
    changeEvent   = 'change',
  
    // other
    getAttribute         = 'getAttribute',
    setAttribute         = 'setAttribute',
    hasAttribute         = 'hasAttribute',
    getElementsByTagName = 'getElementsByTagName',
    getBoundingClientRect= 'getBoundingClientRect',
    querySelectorAll     = 'querySelectorAll',
    getElementsByCLASSNAME = 'getElementsByClassName',
  
    indexOf      = 'indexOf',
    parentNode   = 'parentNode',
    length       = 'length',
    toLowerCase  = 'toLowerCase',
    Transition   = 'Transition',
    Webkit       = 'Webkit',
    style        = 'style',
    
    active     = 'active',
    inClass    = 'in',
    collapsing = 'collapsing',
    disabled   = 'disabled',
    loading    = 'loading',
    left       = 'left',
    right      = 'right',
    top        = 'top',
    bottom     = 'bottom',
  
    // IE8 browser detect
    isIE8 = !('opacity' in body[style]),
  
    // tooltip / popover
    fixedTop = 'navbar-fixed-top',
    fixedBottom = 'navbar-fixed-bottom',  
    mouseHover = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ],
    tipPositions = /\b(top|bottom|left|top)+/,
  
    // transitionEnd since 2.0.4
    supportTransitions = Webkit+Transition in doc[style] || Transition[toLowerCase]() in doc[style],
    transitionEndEvent = Webkit+Transition in doc[style] ? Webkit[toLowerCase]()+Transition+'End' : Transition[toLowerCase]()+'end',  
  
    // set new focus element since 2.0.3
    setFocus = function(element){
      element.focus ? element.focus() : element.setActive();
    },
  
    // class manipulation, since 2.0.0 requires polyfill.js
    addClass = function(element,classNAME) {
      element.classList.add(classNAME);
    },
    removeClass = function(element,classNAME) {
      element.classList.remove(classNAME);
    },
    hasClass = function(element,classNAME){ // since 2.0.0
      return element.classList.contains(classNAME);
    },
  
    // selection methods
    nodeListToArray = function(nodeList){
      var childItems = []; for (var i = 0, nll = nodeList[length]; i<nll; i++) { childItems.push( nodeList[i] ) }
      return childItems;
    },
    getElementsByClassName = function(element,classNAME) { // getElementsByClassName IE8+
      var selectionMethod = isIE8 ? querySelectorAll : getElementsByCLASSNAME;      
      return nodeListToArray(element[selectionMethod]( isIE8 ? '.' + classNAME.replace(/\s(?=[a-z])/g,'.') : classNAME ));
    },
    queryElement = function (selector, parent) {
      var lookUp = parent ? parent : document;
      return typeof selector === 'object' ? selector : lookUp.querySelector(selector);
    },
    getClosest = function (element, selector) { //element is the element and selector is for the closest parent element to find
    // source http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
      var firstChar = selector.charAt(0);
      for ( ; element && element !== document; element = element[parentNode] ) {// Get closest match
        if ( firstChar === '.' ) {// If selector is a class
          if ( queryElement(selector,element[parentNode]) !== null && hasClass(element,selector.replace('.','')) ) { return element; }
        } else if ( firstChar === '#' ) { // If selector is an ID
          if ( element.id === selector.substr(1) ) { return element; }
        }
      }
      return false;
    },
  
    // event attach jQuery style / trigger  since 1.2.0
    on = function (element, event, handler) {
      element.addEventListener(event, handler, false);
    },
    off = function(element, event, handler) {
      element.removeEventListener(event, handler, false);
    },
    one = function (element, event, handler) { // one since 2.0.4
      on(element, event, function handlerWrapper(e){
        handler(e);
        off(element, event, handlerWrapper);
      });
    },
    emulateTransitionEnd = function(element,handler){ // emulateTransitionEnd since 2.0.4
      if (supportTransitions) { one(element, transitionEndEvent, function(e){ handler(e); }); } 
      else { handler(); }
    },
    bootstrapCustomEvent = function (eventName, componentName, related) {
      var OriginalCustomEvent = new CustomEvent( eventName + '.bs.' + componentName);
      OriginalCustomEvent.relatedTarget = related;
      this.dispatchEvent(OriginalCustomEvent);
    },
  
    // Init DATA API
    initializeDataAPI = function( component, constructor, collection ){
      for (var i=0; i < collection[length]; i++) {
        new constructor(collection[i]);
      }
    },
  
    // tab / collapse stuff
    targetsReg = /^\#(.)+$/,
  
    // tooltip / popover stuff
    isElementInViewport = function(element) { // check if this.tooltip is in viewport
      var rect = element[getBoundingClientRect]();
      return ( rect[top] >= 0 && rect[left] >= 0 &&
        rect[bottom] <= (globalObject[innerHeight] || doc[clientHeight]) &&
        rect[right] <= (globalObject[innerWidth] || doc[clientWidth]) )
    },
    getScroll = function() { // also Affix and ScrollSpy uses it
      return {
        y : globalObject.pageYOffset || doc[scrollTop],
        x : globalObject.pageXOffset || doc[scrollLeft]
      }
    },
    styleTip = function(link,element,position,parent) { // both popovers and tooltips
      var rect = link[getBoundingClientRect](), 
          scroll = parent === body ? getScroll() : { x: parent[offsetLeft] + parent[scrollLeft], y: parent[offsetTop] + parent[scrollTop] },
          linkDimensions = { w: rect[right] - rect[left], h: rect[bottom] - rect[top] },
          elementDimensions = { w : element[offsetWidth], h: element[offsetHeight] };
  
      // apply styling to tooltip or popover
      if ( position === top ) { // TOP
        element[style][top] = rect[top] + scroll.y - elementDimensions.h + 'px';
        element[style][left] = rect[left] + scroll.x - elementDimensions.w/2 + linkDimensions.w/2 + 'px'
  
      } else if ( position === bottom ) { // BOTTOM
        element[style][top] = rect[top] + scroll.y + linkDimensions.h + 'px';
        element[style][left] = rect[left] + scroll.x - elementDimensions.w/2 + linkDimensions.w/2 + 'px';
  
      } else if ( position === left ) { // LEFT
        element[style][top] = rect[top] + scroll.y - elementDimensions.h/2 + linkDimensions.h/2 + 'px';
        element[style][left] = rect[left] + scroll.x - elementDimensions.w + 'px';
  
      } else if ( position === right ) { // RIGHT
        element[style][top] = rect[top] + scroll.y - elementDimensions.h/2 + linkDimensions.h/2 + 'px';
        element[style][left] = rect[left] + scroll.x + linkDimensions.w + 'px';
      }
      element.className[indexOf](position) === -1 && (element.className = element.className.replace(tipPositions,position));
    },
    updatePlacement = function(position) {
      return position === top ? bottom : // top
             position === bottom ? top : // bottom
             position === left ? right : // left
             position === right ? left : position; // right
    };
  
  
  
  /* Native Javascript for Bootstrap 3 | Affix
  -------------------------------------------*/
  
  //AFFIX DEFINITION
  var Affix = function(element, options) {
  
    // initialization element
    element = queryElement(element);
  
    // set options
    options = options || {};
  
    // read DATA API
    var targetData        = element[getAttribute](dataTarget),
        offsetTopData     = element[getAttribute](dataOffsetTop),
        offsetBottomData  = element[getAttribute](dataOffsetBottom),
        
        // component specific strings
        affix = 'affix', affixed = 'affixed', fn = 'function', update = 'update',
        affixTop = 'affix-top', affixedTop = 'affixed-top',
        affixBottom = 'affix-bottom', affixedBottom = 'affixed-bottom';
  
    this[target] = options[target] ? queryElement(options[target]) : queryElement(targetData) || null; // target is an object
    this[offsetTop] = options[offsetTop] ? options[offsetTop] : parseInt(offsetTopData) || 0; // offset option is an integer number or function to determine that number
    this[offsetBottom] = options[offsetBottom] ? options[offsetBottom]: parseInt(offsetBottomData) || 0;
  
    if ( !this[target] && !( this[offsetTop] || this[offsetBottom] ) ) { return; } // invalidate
  
    // internal bind
    var self = this,
  
      // constants
      resizeDelay = !supportTransitions ? 500 : 50, // for legacy browsers we try to limit the interval for updating the Affix
      pinOffsetTop, pinOffsetBottom, maxScroll, scrollY, pinnedTop, pinnedBottom,
      affixedToTop = false, affixedToBottom = false,
      
      // private methods 
      getMaxScroll = function(){
        return Math.max( body[scrollHeight], body[offsetHeight], doc[clientHeight], doc[scrollHeight], doc[offsetHeight] );
      },
      getOffsetTop = function () {
        if ( self[target] !== null ) {
          return self[target][getBoundingClientRect]()[top] + scrollY;
        } else if ( self[offsetTop] ) {
          return parseInt(typeof self[offsetTop] === fn ? self[offsetTop]() : self[offsetTop] || 0);
        }
      },
      getOffsetBottom = function () {
        if ( self[offsetBottom] ) {
          return maxScroll - element[offsetHeight] - parseInt( typeof self[offsetBottom] === fn ? self[offsetBottom]() : self[offsetBottom] || 0 );
        }
      },
      checkPosition = function () {
        maxScroll = getMaxScroll();
        scrollY = parseInt(getScroll().y,0);
        pinOffsetTop = getOffsetTop();
        pinOffsetBottom = getOffsetBottom(); 
        pinnedTop = ( parseInt(pinOffsetTop) - scrollY < 0) && (scrollY > parseInt(pinOffsetTop) );
        pinnedBottom = ( parseInt(pinOffsetBottom) - scrollY < 0) && (scrollY > parseInt(pinOffsetBottom) );
      },
      pinTop = function () {
        if ( !affixedToTop && !hasClass(element,affix) ) { // on loading a page halfway scrolled these events don't trigger in Chrome
          bootstrapCustomEvent.call(element, affix, affix);
          bootstrapCustomEvent.call(element, affixTop, affix);
          addClass(element,affix);
          affixedToTop = true;
          bootstrapCustomEvent.call(element, affixed, affix);
          bootstrapCustomEvent.call(element, affixedTop, affix);
        }
      },
      unPinTop = function () {
        if ( affixedToTop && hasClass(element,affix) ) {
          removeClass(element,affix);
          affixedToTop = false;
        }
      },
      pinBottom = function () {
        if ( !affixedToBottom && !hasClass(element, affixBottom) ) {
          bootstrapCustomEvent.call(element, affix, affix);
          bootstrapCustomEvent.call(element, affixBottom, affix);
          addClass(element,affixBottom);
          affixedToBottom = true;
          bootstrapCustomEvent.call(element, affixed, affix);
          bootstrapCustomEvent.call(element, affixedBottom, affix);
        }
      },
      unPinBottom = function () {
        if ( affixedToBottom && hasClass(element,affixBottom) ) {
          removeClass(element,affixBottom);
          affixedToBottom = false;
        }
      },
      updatePin = function () {
        if ( pinnedBottom ) {
          if ( pinnedTop ) { unPinTop(); }
          pinBottom(); 
        } else {
          unPinBottom();
          if ( pinnedTop ) { pinTop(); } 
          else { unPinTop(); }
        }
      };
  
    // public method
    this[update] = function () {
      checkPosition();
      updatePin(); 
    };
  
    // init
    if ( !(stringAffix in element ) ) { // prevent adding event handlers twice
      on( globalObject, scrollEvent, this[update] );
      on( globalObject, resizeEvent, function() { setTimeout(function(){ self[update](); }, resizeDelay); });
    }
    element[stringAffix] = this;
  
    this[update]();
  };
  
  // AFFIX DATA API
  // =================
  initializeDataAPI( stringAffix, Affix, doc[querySelectorAll]('['+dataSpy+'="affix"]') );
  
  
  /* Native Javascript for Bootstrap 3 | Alert
  -------------------------------------------*/
  
  // ALERT DEFINITION
  // ================
  var Alert = function( element ) {
    
    // initialization element
    element = queryElement(element);
  
    // bind, target alert, duration and stuff
    var self = this, component = 'alert',
      alert = getClosest(element,'.'+component),
      triggerHandler = function(){ hasClass(alert,'fade') ? emulateTransitionEnd(alert,transitionEndHandler) : transitionEndHandler(); },
      // handlers
      clickHandler = function(e){
        alert = getClosest(e[target],'.'+component);
        element = queryElement('['+dataDismiss+'="'+component+'"]',alert);
        element && alert && (element === e[target] || element.contains(e[target])) && self.close();
      },
      transitionEndHandler = function(){
        bootstrapCustomEvent.call(alert, closedEvent, component);
        off(element, clickEvent, clickHandler); // detach it's listener
        alert[parentNode].removeChild(alert);
      };
    
    // public method
    this.close = function() {
      if ( alert && element && hasClass(alert,inClass) ) {
        bootstrapCustomEvent.call(alert, closeEvent, component);
        removeClass(alert,inClass);
        alert && triggerHandler();
      }
    };
  
    // init
    if ( !(stringAlert in element ) ) { // prevent adding event handlers twice
      on(element, clickEvent, clickHandler);
    }
    element[stringAlert] = this;
  };
  
  // ALERT DATA API
  // ==============
  initializeDataAPI ( stringAlert, Alert, doc[querySelectorAll]('['+dataDismiss+'="alert"]') );
  
  
  /* Native Javascript for Bootstrap 3 | Button
  ---------------------------------------------*/
  
  // BUTTON DEFINITION
  // ===================
  var Button = function( element, option ) {
  
    // initialization element
    element = queryElement(element);
  
    // set option
    option = option || null;
  
    // constant
    var toggled = false, // toggled makes sure to prevent triggering twice the change.bs.button events
  
        // strings
        component = 'button',
        checked = 'checked',
        reset = 'reset',
        LABEL = 'LABEL',
        INPUT = 'INPUT',
  
      // private methods
      setState = function() {
        if ( !! option && option !== reset ) {
          if ( option === loading ) {
            addClass(element,disabled);
            element[setAttribute](disabled,disabled);
          }
          element[setAttribute](dataOriginalText, element.innerHTML.replace(/^\s+|\s+$/g, '')); // trim the text
          element.innerHTML = element[getAttribute]('data-'+option+'-text');
        }
      },
      resetState = function() {
        if (element[getAttribute](dataOriginalText)) {
          if ( hasClass(element,disabled) || element[getAttribute](disabled) === disabled ) {
            removeClass(element,disabled);
            element.removeAttribute(disabled);
          }
          element.innerHTML = element[getAttribute](dataOriginalText);
        }
      },
      toggle = function(e) {
        var label = e[target].tagName === LABEL ? e[target] : e[target][parentNode].tagName === LABEL ? e[target][parentNode] : null; // the .btn label
        
        if ( !label ) return; //react if a label or its immediate child is clicked
  
        var eventTarget = this, // the button group, the target of the handler function
          labels = getElementsByClassName(eventTarget,'btn'), // all the button group buttons
          input = label[getElementsByTagName](INPUT)[0];
  
        if ( !input ) return; //return if no input found
  
        // manage the dom manipulation
        if ( input.type === 'checkbox' ) { //checkboxes
          if ( !input[checked] ) {
            addClass(label,active);
            input[getAttribute](checked);
            input[setAttribute](checked,checked);
            input[checked] = true;
          } else {
            removeClass(label,active);
            input[getAttribute](checked);
            input.removeAttribute(checked);
            input[checked] = false;
          }
  
          if (!toggled) { // prevent triggering the event twice
            toggled = true;
            bootstrapCustomEvent.call(input, changeEvent, component); //trigger the change for the input
            bootstrapCustomEvent.call(element, changeEvent, component); //trigger the change for the btn-group
          }
        }
  
        if ( input.type === 'radio' && !toggled ) { // radio buttons
          if ( !input[checked] ) { // don't trigger if already active
            addClass(label,active);
            input[setAttribute](checked,checked);
            input[checked] = true;
            bootstrapCustomEvent.call(input, changeEvent, component); //trigger the change for the input
            bootstrapCustomEvent.call(element, changeEvent, component); //trigger the change for the btn-group
  
            toggled = true;
            for (var i = 0, ll = labels[length]; i<ll; i++) {
              var otherLabel = labels[i], otherInput = otherLabel[getElementsByTagName](INPUT)[0];
              if ( otherLabel !== label && hasClass(otherLabel,active) )  {
                removeClass(otherLabel,active);
                otherInput.removeAttribute(checked);
                otherInput[checked] = false;
                bootstrapCustomEvent.call(otherInput, changeEvent, component); // trigger the change
              }
            }
          }
        }
        setTimeout( function() { toggled = false; }, 50 );
      };
  
    // init
    if ( hasClass(element,'btn') ) { // when Button text is used we execute it as an instance method
      if ( option !== null ) {
        if ( option !== reset ) { setState(); } 
        else { resetState(); }
      }
    }
    if ( hasClass(element,'btn-group') ) {
      if ( !( stringButton in element ) ) { // prevent adding event handlers twice
        on( element, clickEvent, toggle );
      }
      element[stringButton] = this;
    }
  };
  
  // BUTTON DATA API
  // =================
  initializeDataAPI( stringButton, Button, doc[querySelectorAll]('['+dataToggle+'="buttons"]') );
  
  
  /* Native Javascript for Bootstrap 3 | Carousel
  ----------------------------------------------*/
  
  // CAROUSEL DEFINITION
  // ===================
  var Carousel = function( element, options ) {
  
    // initialization element
    element = queryElement( element );
  
    // set options
    options = options || {};
  
    // DATA API
    var intervalData = element[getAttribute](dataInterval) === 'false' ? false : parseInt(element[getAttribute](dataInterval)) || 5000, // bootstrap carousel default interval
        pauseData = element[getAttribute](dataPause) === hoverEvent || false,
        keyboardData = element[getAttribute](dataKeyboard) === 'true' || false,
      
        // strings
        component = 'carousel',
        paused = 'paused',
        direction = 'direction',
        dataSlideTo = 'data-slide-to'; 
  
    this[keyboard] = options[keyboard] === true || keyboardData;
    this[pause] = (options[pause] === hoverEvent || pauseData) ? hoverEvent : false; // false / hover
  
    if ( !( options[interval] || intervalData ) ) { // determine slide interval
      this[interval] = false;
    } else {
      this[interval] = parseInt(options[interval]) || intervalData; // default slide interval
    }
  
    // bind, event targets
    var self = this, index = element.index = 0, timer = element.timer = 0, 
      isSliding = false, // isSliding prevents click event handlers when animation is running
      slides = getElementsByClassName(element,'item'), total = slides[length],
      slideDirection = this[direction] = left,
      controls = getElementsByClassName(element,component+'-control'),
      leftArrow = controls[0], rightArrow = controls[1],
      indicator = queryElement( '.'+component+'-indicators', element ),
      indicators = indicator && indicator[getElementsByTagName]( "LI" ) || [];
  
    // handlers
    var pauseHandler = function () {
        if ( self[interval] !==false && !hasClass(element,paused) ) {
          addClass(element,paused);
          !isSliding && clearInterval( timer );
        }
      },
      resumeHandler = function() {
        if ( self[interval] !== false && hasClass(element,paused) ) {
          removeClass(element,paused);
          !isSliding && clearInterval( timer );
          !isSliding && self.cycle();
        }
      },
      indicatorHandler = function(e) {
        e.preventDefault();
        if (isSliding) return;
  
        var eventTarget = e[target], activeIndicator = self.getActiveIndex(); // event target | the current active item
  
        if ( eventTarget && !hasClass(eventTarget,active) && eventTarget[getAttribute](dataSlideTo) ) {
          index = parseInt( eventTarget[getAttribute](dataSlideTo), 10 );
        } else { return false; }
  
        self.slideTo( index ); //Do the slide
      },
      controlsHandler = function (e) {
        e.preventDefault();
        if (isSliding) return;
  
        var eventTarget = e.currentTarget || e.srcElement;
  
        if ( eventTarget === rightArrow ) {
          index++;
        } else if ( eventTarget === leftArrow ) {
          index--;
        }
  
        self.slideTo( index ); //Do the slide
      },
      keyHandler = function (e) {
        if (isSliding) return;
        switch (e.which) {
          case 39:
            index++;
            break;
          case 37:
            index--;
            break;
          default: return;
        }
        self.slideTo( index ); //Do the slide
      },
      // private methods
      setActivePage = function( pageIndex ) { //indicators
        for ( var i = 0, icl = indicators[length]; i < icl; i++ ) {
          removeClass(indicators[i],active);
        }
        if (indicators[pageIndex]) addClass(indicators[pageIndex], active);
      };
  
  
    // public methods
    this.cycle = function() {
      timer = setInterval(function() {
        index++;
        self.slideTo( index );
      }, this[interval]);
    };
    this.slideTo = function( next ) {
      if (isSliding) return; // when controled via methods, make sure to check again    
      var activeItem = this.getActiveIndex(), // the current active
          orientation;
      
      // determine slideDirection first
      if  ( (activeItem < next ) || (activeItem === 0 && next === total -1 ) ) {
        slideDirection = self[direction] = left; // next
      } else if  ( (activeItem > next) || (activeItem === total - 1 && next === 0 ) ) {
        slideDirection = self[direction] = right; // prev
      }
  
      // find the right next index 
      if ( next < 0 ) { next = total - 1; } 
      else if ( next === total ){ next = 0; }
  
      // update index
      index = next;
      
      orientation = slideDirection === left ? 'next' : 'prev'; //determine type
      bootstrapCustomEvent.call(element, slideEvent, component, slides[next]); // here we go with the slide
  
      isSliding = true;
      clearInterval(timer);
      setActivePage( next );
  
      if ( supportTransitions && hasClass(element,'slide') ) {
  
        addClass(slides[next],orientation);
        slides[next][offsetWidth];
        addClass(slides[next],slideDirection);
        addClass(slides[activeItem],slideDirection);
  
        one(slides[activeItem], transitionEndEvent, function(e) {
          var timeout = e[target] !== slides[activeItem] ? e.elapsedTime*1000 : 0;
          setTimeout(function(){
            isSliding = false;
  
            addClass(slides[next],active);
            removeClass(slides[activeItem],active);
  
            removeClass(slides[next],orientation);
            removeClass(slides[next],slideDirection);
            removeClass(slides[activeItem],slideDirection);
  
            bootstrapCustomEvent.call(element, slidEvent, component, slides[next]);
  
            if ( self[interval] && !hasClass(element,paused) ) {
              self.cycle();
            }
          },timeout+100);
        });
  
      } else {
        addClass(slides[next],active);
        slides[next][offsetWidth];
        removeClass(slides[activeItem],active);
        setTimeout(function() {
          isSliding = false;
          if ( self[interval] && !hasClass(element,paused) ) {
            self.cycle();
          }
          bootstrapCustomEvent.call(element, slidEvent, component, slides[next]); // here we go with the slid event
        }, 100 );
      }
    };
    this.getActiveIndex = function () {
      return slides[indexOf](getElementsByClassName(element,'item active')[0]) || 0;
    };
  
    // init
    if ( !(stringCarousel in element ) ) { // prevent adding event handlers twice
  
      if ( this[pause] && this[interval] ) {
        on( element, mouseHover[0], pauseHandler );
        on( element, mouseHover[1], resumeHandler );
        on( element, 'touchstart', pauseHandler );
        on( element, 'touchend', resumeHandler );
      }
    
      rightArrow && on( rightArrow, clickEvent, controlsHandler );
      leftArrow && on( leftArrow, clickEvent, controlsHandler );
    
      indicator && on( indicator, clickEvent, indicatorHandler, false);
      this[keyboard] === true && on( globalObject, keydownEvent, keyHandler, false);
  
    }
    if (this.getActiveIndex()<0) {
      slides[length] && addClass(slides[0],active);
      indicators[length] && setActivePage(0);
    }
  
    if ( this[interval] ){ this.cycle(); }
    element[stringCarousel] = this;
  };
  
  // CAROUSEL DATA API
  // =================
  initializeDataAPI( stringCarousel, Carousel, doc[querySelectorAll]('['+dataRide+'="carousel"]') );
  
  
  /* Native Javascript for Bootstrap 3 | Collapse
  -----------------------------------------------*/
  
  // COLLAPSE DEFINITION
  // ===================
  var Collapse = function( element, options ) {
  
    // initialization element
    element = queryElement(element);
  
    // set options
    options = options || {};
  
  
    // event targets and constants
    var accordion = null, collapse = null, self = this,
      isAnimating = false, // when true it will prevent click handlers
      accordionData = element[getAttribute]('data-parent'),
  
      // component strings
      component = 'collapse',
      collapsed = 'collapsed',
  
      // private methods
      openAction = function(collapseElement) {
        bootstrapCustomEvent.call(collapseElement, showEvent, component);
        isAnimating = true;
        addClass(collapseElement,collapsing);
        removeClass(collapseElement,component);
        collapseElement[style][height] = collapseElement[scrollHeight] + 'px';
        
        emulateTransitionEnd(collapseElement, function() {
          isAnimating = false;
          collapseElement[setAttribute](ariaExpanded,'true');
          removeClass(collapseElement,collapsing);
          addClass(collapseElement, component);
          addClass(collapseElement, inClass);
          collapseElement[style][height] = '';
          bootstrapCustomEvent.call(collapseElement, shownEvent, component);
        });
      },
      closeAction = function(collapseElement) {
        bootstrapCustomEvent.call(collapseElement, hideEvent, component);
        isAnimating = true;
        collapseElement[style][height] = collapseElement[scrollHeight] + 'px'; // set height first
        removeClass(collapseElement,component);
        removeClass(collapseElement, inClass);
        addClass(collapseElement, collapsing);
        collapseElement[offsetWidth]; // force reflow to enable transition
        collapseElement[style][height] = '0px';
        
        emulateTransitionEnd(collapseElement, function() {
          isAnimating = false;
          collapseElement[setAttribute](ariaExpanded,'false');
          removeClass(collapseElement,collapsing);
          addClass(collapseElement,component);
          collapseElement[style][height] = '';
          bootstrapCustomEvent.call(collapseElement, hiddenEvent, component);
        });
      },
      getTarget = function() {
        var href = element.href && element[getAttribute]('href'),
          parent = element[getAttribute](dataTarget),
          id = href || ( parent && targetsReg.test(parent) ) && parent;
        return id && queryElement(id);
      };
    
    // public methods
    this.toggle = function(e) {
      e.preventDefault();
      if ( isAnimating ) return;
      if (!hasClass(collapse,inClass)) { self.show(); } 
      else { self.hide(); }
    };
    this.hide = function() {
      closeAction(collapse);
      addClass(element,collapsed);
    };
    this.show = function() {
      if ( accordion ) {
        var activeCollapse = queryElement('.'+component+'.'+inClass,accordion),
            toggle = activeCollapse && (queryElement('['+dataToggle+'="'+component+'"]['+dataTarget+'="#'+activeCollapse.id+'"]',accordion)
                   || queryElement('['+dataToggle+'="'+component+'"][href="#'+activeCollapse.id+'"]',accordion) ),
            correspondingCollapse = toggle && (toggle[getAttribute](dataTarget) || toggle.href);
        if ( activeCollapse && toggle && activeCollapse !== collapse ) { 
          closeAction(activeCollapse); 
          if ( correspondingCollapse.split('#')[1] !== collapse.id ) { addClass(toggle,collapsed); } 
          else { removeClass(toggle,collapsed); }
        }
      }
  
      openAction(collapse);
      removeClass(element,collapsed); 
    };
  
    // init
    if ( !(stringCollapse in element ) ) { // prevent adding event handlers twice
      on(element, clickEvent, this.toggle);
    }
    collapse = getTarget();
    accordion = queryElement(options.parent) || accordionData && getClosest(element, accordionData);
    element[stringCollapse] = this;
  };
  
  // COLLAPSE DATA API
  // =================
  initializeDataAPI(stringCollapse, Collapse, doc[querySelectorAll]('['+dataToggle+'="collapse"]'));
  
  
  /* Native Javascript for Bootstrap 3 | Dropdown
  ----------------------------------------------*/
  
  // DROPDOWN DEFINITION
  // ===================
  var Dropdown = function( element, option ) {
      
    // initialization element
    element = queryElement(element);
  
    // set option
    this.persist = option === true || element[getAttribute]('data-persist') === 'true' || false;
  
    // constants, event targets, strings
    var self = this, isOpen = false,
      parent = element[parentNode],
      component = 'dropdown', open = 'open',
      relatedTarget = null,
      menu = queryElement('.dropdown-menu', parent),
  
      // handlers
      keyHandler = function(e) {
        if (isOpen && (e.which == 27 || e.keyCode == 27)) { relatedTarget = null; hide(); } // e.keyCode for IE8
      },
      clickHandler = function(e) {
        var eventTarget = e[target],
          hasData = eventTarget && (eventTarget[getAttribute](dataToggle) || eventTarget[parentNode] && getAttribute in eventTarget[parentNode] && eventTarget[parentNode][getAttribute](dataToggle));
        if ( eventTarget === element || eventTarget === parent || eventTarget[parentNode] === element ) {
          e.preventDefault(); // comment this line to stop preventing navigation when click target is a link 
          relatedTarget = element;
          self.toggle();
        } else if ( isOpen ) {
          if ( eventTarget === menu || menu.contains(eventTarget) && (self.persist || hasData) ) {
            return;
          } else { relatedTarget = null; hide(); }
        }
        (/\#$/.test(eventTarget.href) || eventTarget[parentNode] && /\#$/.test(eventTarget[parentNode].href)) && e.preventDefault(); // should be here to prevent jumps
      },
      // private methods
      show = function() {
        bootstrapCustomEvent.call(parent, showEvent, component, relatedTarget);
        addClass(parent,open);
        menu[setAttribute](ariaExpanded,true);
        bootstrapCustomEvent.call(parent, shownEvent, component, relatedTarget);
        on(document, keydownEvent, keyHandler);
        isOpen = true;
      },
      hide = function() {
        bootstrapCustomEvent.call(parent, hideEvent, component, relatedTarget);
        removeClass(parent,open);
        menu[setAttribute](ariaExpanded,false);
        bootstrapCustomEvent.call(parent, hiddenEvent, component, relatedTarget);
        off(document, keydownEvent, keyHandler);
        isOpen = false;
      };
  
    // public methods
    this.toggle = function() {
      if (hasClass(parent,open) && isOpen) { hide(); } 
      else { show(); }
    };
  
    // init
    if ( !(stringDropdown in element) ) { // prevent adding event handlers twice
      menu[setAttribute]('tabindex', '0'); // Fix onblur on Chrome | Safari
      on(document, clickEvent, clickHandler);
    }
    element[stringDropdown] = this;
  };
  
  // DROPDOWN DATA API
  // =================
  initializeDataAPI( stringDropdown, Dropdown, doc[querySelectorAll]('['+dataToggle+'="dropdown"]') );
  
  
  /* Native Javascript for Bootstrap 3 | Modal
  -------------------------------------------*/
    
  // MODAL DEFINITION
  // ===============
  var Modal = function(element, options) { // element can be the modal/triggering button
  
    // the modal (both JavaScript / DATA API init) / triggering button element (DATA API)
    element = queryElement(element);
  
    // determine modal, triggering element 
    var btnCheck = element[getAttribute](dataTarget)||element[getAttribute]('href'),
      checkModal = queryElement( btnCheck ),
      modal = hasClass(element,'modal') ? element : checkModal,
  
      // strings
      component = 'modal',
      staticString = 'static',
      paddingLeft = 'paddingLeft',
      paddingRight = 'paddingRight',
      modalBackdropString = 'modal-backdrop';
  
    if ( hasClass(element,'modal') ) { element = null; } // modal is now independent of it's triggering element
  
    if ( !modal ) { return; } // invalidate
  
    // set options
    options = options || {};
  
    this[keyboard] = options[keyboard] === false || modal[getAttribute](dataKeyboard) === 'false' ? false : true;
    this[backdrop] = options[backdrop] === staticString || modal[getAttribute](databackdrop) === staticString ? staticString : true;
    this[backdrop] = options[backdrop] === false || modal[getAttribute](databackdrop) === 'false' ? false : this[backdrop];
    this[content]  = options[content]; // JavaScript only
  
    // bind, constants, event targets and other vars
    var self = this, open = this.open = false, relatedTarget = null,
      bodyIsOverflowing, modalIsOverflowing, scrollbarWidth, overlay,
  
      // also find fixed-top / fixed-bottom items
      fixedItems = getElementsByClassName(doc,fixedTop).concat(getElementsByClassName(doc,fixedBottom)),
  
      // private methods
      getWindowWidth = function() {
        var htmlRect = doc[getBoundingClientRect]();
        return globalObject[innerWidth] || (htmlRect[right] - Math.abs(htmlRect[left]));
      },
      setScrollbar = function () {
        var bodyStyle = body.currentStyle || globalObject.getComputedStyle(body), 
            bodyPad = parseInt((bodyStyle[paddingRight]), 10), itemPad;
        if (bodyIsOverflowing) { 
          body[style][paddingRight] = (bodyPad + scrollbarWidth) + 'px';
          if (fixedItems[length]){
            for (var i = 0; i < fixedItems[length]; i++) {
              itemPad = (fixedItems[i].currentStyle || globalObject.getComputedStyle(fixedItems[i]))[paddingRight];
              fixedItems[i][style][paddingRight] = ( parseInt(itemPad) + scrollbarWidth) + 'px';
            }
          }
        }
      },
      resetScrollbar = function () {
        body[style][paddingRight] = '';
        if (fixedItems[length]){
          for (var i = 0; i < fixedItems[length]; i++) {
            fixedItems[i][style][paddingRight] = '';
          }
        }
      },
      measureScrollbar = function () { // thx walsh
        var scrollDiv = document.createElement('div'), scrollBarWidth;
        scrollDiv.className = component+'-scrollbar-measure'; // this is here to stay
        body.appendChild(scrollDiv);
        scrollBarWidth = scrollDiv[offsetWidth] - scrollDiv[clientWidth];
        body.removeChild(scrollDiv);
        return scrollBarWidth;
      },
      checkScrollbar = function () {
        bodyIsOverflowing = body[clientWidth] < getWindowWidth();
        modalIsOverflowing = modal[scrollHeight] > doc[clientHeight];
        scrollbarWidth = measureScrollbar();
      },
      adjustDialog = function () {
        modal[style][paddingLeft] = !bodyIsOverflowing && modalIsOverflowing ? scrollbarWidth + 'px' : '';
        modal[style][paddingRight] = bodyIsOverflowing && !modalIsOverflowing ? scrollbarWidth + 'px' : '';
      },
      resetAdjustments = function () {
        modal[style][paddingLeft] = '';
        modal[style][paddingRight] = '';
      },
      createOverlay = function() {
        var newOverlay = document.createElement('div');
        overlay = queryElement('.'+modalBackdropString);
  
        if ( overlay === null ) {
          newOverlay[setAttribute]('class',modalBackdropString+' fade');
          overlay = newOverlay;
          body.appendChild(overlay);
        }
      },
      removeOverlay = function() {
        overlay = queryElement('.'+modalBackdropString); 
        if ( overlay && overlay !== null && typeof overlay === 'object' ) {
          body.removeChild(overlay); overlay = null;
        }
      },
      keydownHandlerToggle = function() {
        if (!hasClass(modal,inClass)) {
          on(document, keydownEvent, keyHandler);
        } else {
          off(document, keydownEvent, keyHandler);
        }
      },
      resizeHandlerToggle = function() {
        if (!hasClass(modal,inClass)) {
          on(globalObject, resizeEvent, self.update);
        } else {
          off(globalObject, resizeEvent, self.update);
        }
      },
      dismissHandlerToggle = function() {
        if (!hasClass(modal,inClass)) {
          on(modal, clickEvent, dismissHandler);
        } else {
          off(modal, clickEvent, dismissHandler);
        }
      },
      // triggers
      triggerShow = function() {
        open = self.open = true;
        setFocus(modal);
        bootstrapCustomEvent.call(modal, shownEvent, component, relatedTarget);
      },
      triggerHide = function() {
        resizeHandlerToggle();
        dismissHandlerToggle();
        keydownHandlerToggle();
  
        modal[style].display = '';
  
        open = self.open = false;
        element && (setFocus(element));
        bootstrapCustomEvent.call(modal, hiddenEvent, component);
        setTimeout(function(){
          if (!getElementsByClassName(document,component+' '+inClass)[0]) {
            resetAdjustments();
            resetScrollbar();
            removeClass(body,component+'-open');
            removeOverlay(); 
          }
        }, 100);
      },    
      // handlers
      clickHandler = function(e) {
        var clickTarget = e[target]; 
        clickTarget = clickTarget[hasAttribute](dataTarget) || clickTarget[hasAttribute]('href') ? clickTarget : clickTarget[parentNode];
        if ( !open && clickTarget === element && !hasClass(modal,inClass) ) {
          modal.modalTrigger = element;
          relatedTarget = element;
          self.show();
          e.preventDefault();
        }
      },
      keyHandler = function(e) {
        var key = e.which || e.keyCode; // keyCode for IE8
        if (self[keyboard] && key == 27 && open) {
          self.hide();
        }
      },
      dismissHandler = function(e) {
        var clickTarget = e[target];
        if ( open && (clickTarget[parentNode][getAttribute](dataDismiss) === component 
            || clickTarget[getAttribute](dataDismiss) === component
            || (clickTarget === modal && self[backdrop] !== staticString) ) ) {
          self.hide(); relatedTarget = null;
          e.preventDefault();
        }
      };
  
    // public methods
    this.toggle = function() {
      if (open && hasClass(modal,inClass)) {this.hide();} else {this.show();}
    };
    this.show = function() {
      bootstrapCustomEvent.call(modal, showEvent, component, relatedTarget);
  
      // we elegantly hide any opened modal
      var currentOpen = getElementsByClassName(document,component+' in')[0];
      currentOpen && currentOpen !== modal && currentOpen.modalTrigger[stringModal].hide(); 
  
      if ( this[backdrop] ) {
        createOverlay();
      }
  
      if ( overlay && !hasClass(overlay,inClass)) {
        setTimeout( function() { addClass(overlay,inClass); },0);
      }
  
      setTimeout( function() {
        modal[style].display = 'block';
  
        checkScrollbar();
        setScrollbar();
        adjustDialog();
  
        resizeHandlerToggle();
        dismissHandlerToggle();
        keydownHandlerToggle();
  
        addClass(body,component+'-open');
        addClass(modal,inClass);
        modal[setAttribute](ariaHidden, false);
  
        hasClass(modal,'fade') ? emulateTransitionEnd(modal, triggerShow) : triggerShow();
      }, supportTransitions ? 150 : 0);
    };
    this.hide = function() {
      bootstrapCustomEvent.call(modal, hideEvent, component);
      overlay = queryElement('.'+modalBackdropString);
  
      removeClass(modal,inClass);
      modal[setAttribute](ariaHidden, true);
  
      !!overlay && removeClass(overlay,inClass);
  
      setTimeout(function(){
        hasClass(modal,'fade') ? emulateTransitionEnd(modal, triggerHide) : triggerHide();
      }, supportTransitions ? 150 : 0);
    };
    this.setContent = function( content ) {
      queryElement('.'+component+'-content',modal).innerHTML = content;
    };
    this.update = function() {
      if (open) {
        checkScrollbar();
        setScrollbar();
        adjustDialog();
      }
    };
  
    // init
    // prevent adding event handlers over and over
    // modal is independent of a triggering element 
    if ( !!element && !(stringModal in element) ) {
      on(element, clickEvent, clickHandler);
    }
    if ( !!this[content] ) { this.setContent( this[content] ); }
    !!element && (element[stringModal] = this);
  };
  
  // DATA API
  initializeDataAPI(stringModal, Modal, doc[querySelectorAll]('['+dataToggle+'="modal"]'));
  
  
  /* Native Javascript for Bootstrap 3 | Popover
  ----------------------------------------------*/
  
  // POPOVER DEFINITION
  // ==================
  var Popover = function( element, options ) {
  
    // initialization element
    element = queryElement(element);
  
    // DATA API
    var triggerData = element[getAttribute](dataTrigger), // click / hover / focus
        animationData = element[getAttribute](dataAnimation), // true / false
        placementData = element[getAttribute](dataPlacement),
        dismissibleData = element[getAttribute](dataDismissible),
        delayData = element[getAttribute](dataDelay),
        containerData = element[getAttribute](dataContainer),
  
        // internal strings
        component = 'popover',
        template = 'template',
        trigger = 'trigger',
        classString = 'class',
        div = 'div',
        fade = 'fade',
        title = 'title',
        content = 'content',
        dataTitle = 'data-title',
        dataContent = 'data-content',
        dismissible = 'dismissible',
        closeBtn = '<button type="button" class="close">×</button>',
        
        // maybe the element is inside a modal
        modal = getClosest(element,'.modal'),
        
        // maybe the element is inside a fixed navbar
        navbarFixedTop = getClosest(element,'.'+fixedTop),
        navbarFixedBottom = getClosest(element,'.'+fixedBottom);
  
    // set options
    options = options || {};
    this[template] = options[template] ? options[template] : null; // JavaScript only
    this[trigger] = options[trigger] ? options[trigger] : triggerData || hoverEvent;
    this[animation] = options[animation] && options[animation] !== fade ? options[animation] : animationData || fade;
    this[placement] = options[placement] ? options[placement] : placementData || top;
    this[delay] = parseInt(options[delay] || delayData) || 200;
    this[dismissible] = options[dismissible] || dismissibleData === 'true' ? true : false;
    this[container] = queryElement(options[container]) ? queryElement(options[container]) 
                    : queryElement(containerData) ? queryElement(containerData) 
                    : navbarFixedTop ? navbarFixedTop
                    : navbarFixedBottom ? navbarFixedBottom
                    : modal ? modal : body;
  
    // bind, content
    var self = this, 
      titleString = element[getAttribute](dataTitle) || null,
      contentString = element[getAttribute](dataContent) || null;
  
    if ( !contentString && !this[template] ) return; // invalidate
  
    // constants, vars
    var popover = null, timer = 0, placementSetting = this[placement],
      
      // handlers
      dismissibleHandler = function(e) {
        if (popover !== null && e[target] === queryElement('.close',popover)) {
          self.hide();
        }
      },
  
      // private methods
      removePopover = function() {
        self[container].removeChild(popover);
        timer = null; popover = null; 
      },
      createPopover = function() {
        titleString = element[getAttribute](dataTitle); // check content again
        contentString = element[getAttribute](dataContent);
  
        popover = document.createElement(div);
  
        if ( contentString !== null && self[template] === null ) { //create the popover from data attributes
  
          popover[setAttribute]('role','tooltip');
  
          if (titleString !== null) {
            var popoverTitle = document.createElement('h3');
            popoverTitle[setAttribute](classString,component+'-title');
  
            popoverTitle.innerHTML = self[dismissible] ? titleString + closeBtn : titleString;
            popover.appendChild(popoverTitle);
          }
  
          var popoverArrow = document.createElement(div), popoverContent = document.createElement(div);
          popoverArrow[setAttribute](classString,'arrow'); popoverContent[setAttribute](classString,component+'-content');
          popover.appendChild(popoverArrow); popover.appendChild(popoverContent);
  
          //set popover content
          popoverContent.innerHTML = self[dismissible] && titleString === null ? contentString + closeBtn : contentString;
  
        } else {  // or create the popover from template
          var popoverTemplate = document.createElement(div);
          popoverTemplate.innerHTML = self[template];
          popover.innerHTML = popoverTemplate.firstChild.innerHTML;
        }
  
        //append to the container
        self[container].appendChild(popover);
        popover[style].display = 'block';
        popover[setAttribute](classString, component+ ' ' + placementSetting + ' ' + self[animation]);
      },
      showPopover = function () {
        !hasClass(popover,inClass) && ( addClass(popover,inClass) );
      },
      updatePopover = function() {
        styleTip(element,popover,placementSetting,self[container]);
        if (!isElementInViewport(popover) ) { 
          placementSetting = updatePlacement(placementSetting); 
          styleTip(element,popover,placementSetting,self[container]); 
        }
      },
      
      // triggers
      showTrigger = function() {
        bootstrapCustomEvent.call(element, shownEvent, component);
      },
      hideTrigger = function() {
        removePopover();
        bootstrapCustomEvent.call(element, hiddenEvent, component);
      };
  
    // public methods / handlers
    this.toggle = function() {
      if (popover === null) { self.show(); } 
      else { self.hide(); }
    };
    this.show = function() {
      clearTimeout(timer);
      timer = setTimeout( function() {
        if (popover === null) {
          placementSetting = self[placement]; // we reset placement in all cases
          createPopover();
          updatePopover();
          showPopover();
          bootstrapCustomEvent.call(element, showEvent, component);
          !!self[animation] ? emulateTransitionEnd(popover, showTrigger) : showTrigger();
        }
      }, 20 );
    };
    this.hide = function() {
      clearTimeout(timer);
      timer = setTimeout( function() {
        if (popover && popover !== null && hasClass(popover,inClass)) {
          bootstrapCustomEvent.call(element, hideEvent, component);
          removeClass(popover,inClass);
          !!self[animation] ? emulateTransitionEnd(popover, hideTrigger) : hideTrigger();
        }
      }, self[delay] );
    };
  
    // init
    if ( !(stringPopover in element) ) { // prevent adding event handlers twice
      if (self[trigger] === hoverEvent) {
        on( element, mouseHover[0], self.show );
        if (!self[dismissible]) { on( element, mouseHover[1], self.hide ); }
      } else if (/^(click|focus)$/.test(self[trigger])) {
        on( element, self[trigger], self.toggle );
        if (!self[dismissible]) { on( element, 'blur', self.hide ); }
      }
      
      if (self[dismissible]) { on( document, clickEvent, dismissibleHandler ); }
    
      // dismiss on window resize
      !isIE8 && on( globalObject, resizeEvent, self.hide );
  
    }
    element[stringPopover] = self;
  };
  
  // POPOVER DATA API
  // ================
  initializeDataAPI(stringPopover, Popover, doc[querySelectorAll]('['+dataToggle+'="popover"]'));
  
  
  /* Native Javascript for Bootstrap 3 | ScrollSpy
  -----------------------------------------------*/
  
  // SCROLLSPY DEFINITION
  // ====================
  var ScrollSpy = function(element, options) {
  
    // initialization element, the element we spy on
    element = queryElement(element); 
  
    // DATA API
    var targetData = queryElement(element[getAttribute](dataTarget)),
        offsetData = element[getAttribute]('data-offset');
  
    // set options
    options = options || {};
    if ( !options[target] && !targetData ) { return; } // invalidate
  
    // event targets, constants
    var spyTarget = options[target] && queryElement(options[target]) || targetData,
        links = spyTarget && spyTarget[getElementsByTagName]('A'),
        offset = parseInt(offsetData || options['offset']) || 10,      
        items = [], targetItems = [], scrollOffset,
        scrollTarget = element[offsetHeight] < element[scrollHeight] ? element : globalObject, // determine which is the real scrollTarget
        isWindow = scrollTarget === globalObject;  
  
    // populate items and targets
    for (var i=0, il=links[length]; i<il; i++) {
      var href = links[i][getAttribute]('href'), 
          targetItem = href && targetsReg.test(href) && queryElement(href);
      if ( !!targetItem ) {
        items.push(links[i]);
        targetItems.push(targetItem);
      }
    }
  
    // private methods
    var updateItem = function(index) {
        var parent = items[index][parentNode], // item's parent LI element
          targetItem = targetItems[index], // the menu item targets this element
          dropdown = getClosest(parent,'.dropdown'),
          targetRect = isWindow && targetItem[getBoundingClientRect](),
  
          isActive = hasClass(parent,active) || false,
  
          topEdge = (isWindow ? targetRect[top] + scrollOffset : targetItem[offsetTop]) - offset,
          bottomEdge = isWindow ? targetRect[bottom] + scrollOffset - offset : targetItems[index+1] ? targetItems[index+1][offsetTop] - offset : element[scrollHeight],
  
          inside = scrollOffset >= topEdge && bottomEdge > scrollOffset;
  
        if ( !isActive && inside ) {
          if ( parent.tagName === 'LI' && !hasClass(parent,active) ) {
            addClass(parent,active);
            isActive = true;
            if (dropdown && !hasClass(dropdown,active) ) {
              addClass(dropdown,active);
            }
            bootstrapCustomEvent.call(element, 'activate', 'scrollspy', items[index]);
          }
        } else if ( !inside ) {
          if ( parent.tagName === 'LI' && hasClass(parent,active) ) {
            removeClass(parent,active);
            isActive = false;
            if (dropdown && hasClass(dropdown,active) && !getElementsByClassName(parent[parentNode],active).length ) {
              removeClass(dropdown,active);
            }
          }
        } else if ( !inside && !isActive || isActive && inside ) {
          return;
        }
      },
      updateItems = function(){
        scrollOffset = isWindow ? getScroll().y : element[scrollTop];
        for (var index=0, itl=items[length]; index<itl; index++) {
          updateItem(index)
        }
      };
  
    // public method
    this.refresh = function () {
      updateItems();
    }
  
    // init
    if ( !(stringScrollSpy in element) ) { // prevent adding event handlers twice
      on( scrollTarget, scrollEvent, this.refresh );
      !isIE8 && on( globalObject, resizeEvent, this.refresh ); 
    }
    this.refresh();
    element[stringScrollSpy] = this;
  };
  
  // SCROLLSPY DATA API
  // ==================
  initializeDataAPI(stringScrollSpy, ScrollSpy, doc[querySelectorAll]('['+dataSpy+'="scroll"]'));
  
  
  /* Native Javascript for Bootstrap 3 | Tab
  -----------------------------------------*/
  
  // TAB DEFINITION
  // ==============
  var Tab = function( element, options ) {
  
    // initialization element
    element = queryElement(element);
  
    // DATA API
    var heightData = element[getAttribute](dataHeight),
      
        // strings
        component = 'tab', height = 'height', float = 'float', isAnimating = 'isAnimating';
  
    // set options
    options = options || {};
    this[height] = supportTransitions ? (options[height] || heightData === 'true') : false; // filter legacy browsers
  
    // bind, event targets
    var self = this, next,
      tabs = getClosest(element,'.nav'),
      tabsContentContainer = false,
      dropdown = tabs && queryElement('.dropdown',tabs),
      activeTab, activeContent, nextContent, containerHeight, equalContents, nextHeight,
  
      // trigger
      triggerEnd = function(){
        tabsContentContainer[style][height] = '';
        removeClass(tabsContentContainer,collapsing);
        tabs[isAnimating] = false;
      },
      triggerShow = function() {
        if (tabsContentContainer) { // height animation
          if ( equalContents ) {
            triggerEnd();
          } else {            
            setTimeout(function(){
              tabsContentContainer[style][height] = nextHeight + 'px'; // height animation
              tabsContentContainer[offsetWidth];
              emulateTransitionEnd(tabsContentContainer, triggerEnd);
            },1);
          }
        } else {
          tabs[isAnimating] = false; 
        }
        bootstrapCustomEvent.call(next, shownEvent, component, activeTab);
      },
      triggerHide = function() {
        if (tabsContentContainer) {
          activeContent[style][float] = 'left';
          nextContent[style][float] = 'left';        
          containerHeight = activeContent[scrollHeight];
        }
        
        addClass(nextContent,active);
        bootstrapCustomEvent.call(next, showEvent, component, activeTab);
        
        removeClass(activeContent,active);
        bootstrapCustomEvent.call(activeTab, hiddenEvent, component, next);
        
        if (tabsContentContainer) {
          nextHeight = nextContent[scrollHeight];
          equalContents = nextHeight === containerHeight;
          addClass(tabsContentContainer,collapsing);
          tabsContentContainer[style][height] = containerHeight + 'px'; // height animation
          tabsContentContainer[offsetHeight];
          activeContent[style][float] = '';
          nextContent[style][float] = '';
        }
        if ( hasClass(nextContent, 'fade') ) {
          addClass(nextContent,inClass);
          emulateTransitionEnd(nextContent,triggerShow);
        } else { triggerShow(); }        
      };
  
    if (!tabs) return; // invalidate 
  
    // set default animation state
    tabs[isAnimating] = false;
      
    // private methods
    var getActiveTab = function() {
        var activeTabs = getElementsByClassName(tabs,active), activeTab;
        if ( activeTabs[length] === 1 && !hasClass(activeTabs[0],'dropdown') ) {
          activeTab = activeTabs[0];
        } else if ( activeTabs[length] > 1 ) {
          activeTab = activeTabs[activeTabs[length]-1];
        }
        return activeTab[getElementsByTagName]('A')[0];
      },
      getActiveContent = function() {
        return queryElement(getActiveTab()[getAttribute]('href'));
      },
      // handler
      clickHandler = function(e) {
        e.preventDefault();
        next = e[target][getAttribute](dataToggle) === component || targetsReg.test(e[target][getAttribute]('href')) 
             ? e[target] : e[target][parentNode]; // allow for child elements like icons to use the handler
        !tabs[isAnimating] && !hasClass(next[parentNode],active) && self.show();
      };
  
    // public method
    this.show = function() { // the tab we clicked is now the next tab
      next = next || element;
      nextContent = queryElement(next[getAttribute]('href')); //this is the actual object, the next tab content to activate
      activeTab = getActiveTab(); 
      activeContent = getActiveContent();
  
      tabs[isAnimating] = true;
      removeClass(activeTab[parentNode],active);
      addClass(next[parentNode],active);
  
      if ( dropdown ) {
        if ( !hasClass(element[parentNode][parentNode],'dropdown-menu') ) {
          if (hasClass(dropdown,active)) removeClass(dropdown,active);
        } else {
          if (!hasClass(dropdown,active)) addClass(dropdown,active);
        }
      }
      
      bootstrapCustomEvent.call(activeTab, hideEvent, component, next);
      
      if (hasClass(activeContent, 'fade')) {
        removeClass(activeContent,inClass);
        emulateTransitionEnd(activeContent, triggerHide);
      } else { triggerHide(); }
    };
  
    // init
    if ( !(stringTab in element) ) { // prevent adding event handlers twice
      on(element, clickEvent, clickHandler);
    }
    if (this[height]) { tabsContentContainer = getActiveContent()[parentNode]; }
    element[stringTab] = this;
  };
  
  // TAB DATA API
  // ============
  initializeDataAPI(stringTab, Tab, doc[querySelectorAll]('['+dataToggle+'="tab"]'));
  
  
  /* Native Javascript for Bootstrap 3 | Tooltip
  ---------------------------------------------*/
  
  // TOOLTIP DEFINITION
  // ==================
  var Tooltip = function( element,options ) {
  
    // initialization element
    element = queryElement(element);
  
    // DATA API
    var animationData = element[getAttribute](dataAnimation),
        placementData = element[getAttribute](dataPlacement),
        delayData = element[getAttribute](dataDelay),
        containerData = element[getAttribute](dataContainer),
        
        // strings
        component = 'tooltip',
        classString = 'class',
        title = 'title',
        fade = 'fade',
        div = 'div',
  
        // maybe the element is inside a modal
        modal = getClosest(element,'.modal'),
        
        // maybe the element is inside a fixed navbar
        navbarFixedTop = getClosest(element,'.'+fixedTop),
        navbarFixedBottom = getClosest(element,'.'+fixedBottom);
  
    // set options
    options = options || {};
    this[animation] = options[animation] && options[animation] !== fade ? options[animation] : animationData || fade;
    this[placement] = options[placement] ? options[placement] : placementData || top;
    this[delay] = parseInt(options[delay] || delayData) || 200;
    this[container] = queryElement(options[container]) ? queryElement(options[container]) 
                    : queryElement(containerData) ? queryElement(containerData) 
                    : navbarFixedTop ? navbarFixedTop
                    : navbarFixedBottom ? navbarFixedBottom
                    : modal ? modal : body;
  
    // bind, event targets, title and constants
    var self = this, timer = 0, placementSetting = this[placement], tooltip = null,
      titleString = element[getAttribute](title) || element[getAttribute](dataOriginalTitle);
  
    if ( !titleString ) return; // invalidate
  
    // private methods
    var removeToolTip = function() {
        self[container].removeChild(tooltip);
        tooltip = null; timer = null;
      },
      createToolTip = function() {
        titleString = element[getAttribute](title) || element[getAttribute](dataOriginalTitle); // read the title again
        tooltip = document.createElement(div);
        tooltip[setAttribute]('role',component);
  
        var tooltipArrow = document.createElement(div), tooltipInner = document.createElement(div);
        tooltipArrow[setAttribute](classString, component+'-arrow'); tooltipInner[setAttribute](classString,component+'-inner');
  
        tooltip.appendChild(tooltipArrow); tooltip.appendChild(tooltipInner);
  
        tooltipInner.innerHTML = titleString;
  
        self[container].appendChild(tooltip);
        tooltip[setAttribute](classString, component + ' ' + placementSetting + ' ' + self[animation]);
      },
      updateTooltip = function () {
        styleTip(element,tooltip,placementSetting,self[container]);
        if (!isElementInViewport(tooltip) ) { 
          placementSetting = updatePlacement(placementSetting); 
          styleTip(element,tooltip,placementSetting,self[container]); 
        }
      },
      showTooltip = function () {
        !hasClass(tooltip,inClass) && ( addClass(tooltip,inClass) );
      },
      // triggers
      showTrigger = function() {
        bootstrapCustomEvent.call(element, shownEvent, component);
      },
      hideTrigger = function() {
        removeToolTip();
        bootstrapCustomEvent.call(element, hiddenEvent, component);
      };
  
    // public methods
    this.show = function() {
      clearTimeout(timer);
      timer = setTimeout( function() {
        if (tooltip === null) {
          placementSetting = self[placement]; // we reset placement in all cases
          createToolTip();
          updateTooltip();
          showTooltip();
          bootstrapCustomEvent.call(element, showEvent, component);
          !!self[animation] ? emulateTransitionEnd(tooltip, showTrigger) : showTrigger();
        }
      }, 20 );
    };
    this.hide = function() {
      clearTimeout(timer);
      timer = setTimeout( function() {
        if (tooltip && tooltip !== null && hasClass(tooltip,inClass)) {
          bootstrapCustomEvent.call(element, hideEvent, component);
          removeClass(tooltip,inClass);
          !!self[animation] ? emulateTransitionEnd(tooltip, hideTrigger) : hideTrigger();
        }
      }, self[delay]);
    };
    this.toggle = function() {
      if (!tooltip) { self.show(); } 
      else { self.hide(); }
    };
  
    // init
    if ( !(stringTooltip in element) ) { // prevent adding event handlers twice
      element[setAttribute](dataOriginalTitle,titleString);
      element.removeAttribute(title);
      on(element, mouseHover[0], this.show);
      on(element, mouseHover[1], this.hide);
    }
    element[stringTooltip] = this;
  };
  
  // TOOLTIP DATA API
  // =================
  initializeDataAPI(stringTooltip, Tooltip, doc[querySelectorAll]('['+dataToggle+'="tooltip"]'));
  
  
  return {
    Affix: Affix,
    Alert: Alert,
    Button: Button,
    Carousel: Carousel,
    Collapse: Collapse,
    Dropdown: Dropdown,
    Modal: Modal,
    Popover: Popover,
    ScrollSpy: ScrollSpy,
    Tab: Tab,
    Tooltip: Tooltip
  };
}));
