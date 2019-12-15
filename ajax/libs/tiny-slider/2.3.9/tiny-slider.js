var tns = (function (){
// keys
if (!Object.keys) {
    Object.keys = function (object) {
        var keys = [];
        for (var name in object) {
            if (Object.prototype.hasOwnProperty.call(object, name)) {
                keys.push(name);
            }
        }
        return keys;
    };
}

// ChildNode.remove
(function () {
  "use strict";

  if(!("remove" in Element.prototype)){
    Element.prototype.remove = function(){
      if(this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  }
})();

function extend() {
  var obj, name, copy,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length;

  for (; i < length; i++) {
    if ((obj = arguments[i]) !== null) {
      for (name in obj) {
        copy = obj[name];

        if (target === copy) {
          continue;
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
}

function checkStorageValue (value) {
  return ['true', 'false'].indexOf(value) >= 0 ? JSON.parse(value) : value;
}

function setLocalStorage(key, value, access) {
  if (access) { localStorage.setItem(key, value); }
  return value;
}

function getSlideId() {
  var id = window.tnsId;
  window.tnsId = !id ? 1 : id + 1;
  
  return 'tns' + window.tnsId;
}

function getBody () {
  var doc = document,
      body = doc.body;

  if (!body) {
    body = doc.createElement('body');
    body.fake = true;
  }

  return body;
}

var docElement = document.documentElement;

function setFakeBody (body) {
  var docOverflow = '';
  if (body.fake) {
    docOverflow = docElement.style.overflow;
    //avoid crashing IE8, if background image is used
    body.style.background = '';
    //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
    body.style.overflow = docElement.style.overflow = 'hidden';
    docElement.appendChild(body);
  }

  return docOverflow;
}

function resetFakeBody (body, docOverflow) {
  if (body.fake) {
    body.remove();
    docElement.style.overflow = docOverflow;
    // Trigger layout so kinetic scrolling isn't disabled in iOS6+
    // eslint-disable-next-line
    docElement.offsetHeight;
  }
}

// get css-calc 
// @return - false | calc | -webkit-calc | -moz-calc
// @usage - var calc = getCalc(); 
function calc() {
  var doc = document, 
      body = getBody(),
      docOverflow = setFakeBody(body),
      div = doc.createElement('div'), 
      result = false;

  body.appendChild(div);
  try {
    var vals = ['calc(10px)', '-moz-calc(10px)', '-webkit-calc(10px)'], val;
    for (var i = 0; i < 3; i++) {
      val = vals[i];
      div.style.width = val;
      if (div.offsetWidth === 10) { 
        result = val.replace('(10px)', ''); 
        break;
      }
    }
  } catch (e) {}
  
  body.fake ? resetFakeBody(body, docOverflow) : div.remove();

  return result;
}

// get subpixel support value
// @return - boolean
function subpixelLayout() {
  var doc = document,
      body = getBody(),
      docOverflow = setFakeBody(body),
      parent = doc.createElement('div'),
      child1 = doc.createElement('div'),
      child2,
      supported;

  parent.style.cssText = 'width: 10px';
  child1.style.cssText = 'float: left; width: 5.5px; height: 10px;';
  child2 = child1.cloneNode(true);

  parent.appendChild(child1);
  parent.appendChild(child2);
  body.appendChild(parent);

  supported = child1.offsetTop !== child2.offsetTop;

  body.fake ? resetFakeBody(body, docOverflow) : parent.remove();

  return supported;
}

function mediaquerySupport () {
  var doc = document,
      body = getBody(),
      docOverflow = setFakeBody(body),
      div = doc.createElement('div'),
      style = doc.createElement('style'),
      rule = '@media all and (min-width:1px){.tns-mq-test{position:absolute}}',
      position;

  style.type = 'text/css';
  div.className = 'tns-mq-test';

  body.appendChild(style);
  body.appendChild(div);

  if (style.styleSheet) {
    style.styleSheet.cssText = rule;
  } else {
    style.appendChild(doc.createTextNode(rule));
  }

  position = window.getComputedStyle ? window.getComputedStyle(div).position : div.currentStyle['position'];

  body.fake ? resetFakeBody(body, docOverflow) : div.remove();

  return position === "absolute";
}

// create and append style sheet
function createStyleSheet (media) {
  // Create the <style> tag
  var style = document.createElement("style");
  // style.setAttribute("type", "text/css");

  // Add a media (and/or media query) here if you'd like!
  // style.setAttribute("media", "screen")
  // style.setAttribute("media", "only screen and (max-width : 1024px)")
  if (media) { style.setAttribute("media", media); }

  // WebKit hack :(
  // style.appendChild(document.createTextNode(""));

  // Add the <style> element to the page
  document.querySelector('head').appendChild(style);

  return style.sheet ? style.sheet : style.styleSheet;
}

// cross browsers addRule method
function addCSSRule(sheet, selector, rules, index) {
  'insertRule' in sheet ?
    sheet.insertRule(selector + '{' + rules + '}', index) :
    sheet.addRule(selector, rules, index);
}

function getCssRulesLength(sheet) {
  var rule = ('insertRule' in sheet) ? sheet.cssRules : sheet.rules;
  return rule.length;
}

function toDegree (y, x) {
  return Math.atan2(y, x) * (180 / Math.PI);
}

function getTouchDirection(angle, range) {
  var direction = false,
      gap = Math.abs(90 - Math.abs(angle));
      
  if (gap >= 90 - range) {
    direction = 'horizontal';
  } else if (gap <= range) {
    direction = 'vertical';
  }

  return direction;
}

function hasClass(el, str) {
  return el.className.indexOf(str) >= 0;
}

function addClass(el, str) {
  if (!hasClass(el,  str)) {
    el.className += ' ' + str;
  }
}

function removeClass(el, str) {
  if (hasClass(el, str)) {
    el.className = el.className.replace(str, '');
  }
}

function hasAttr(el, attr) {
  return el.hasAttribute(attr);
}

function getAttr(el, attr) {
  return el.getAttribute(attr);
}

function isNodeList(el) {
  // Only NodeList has the "item()" function
  return typeof el.item !== "undefined"; 
}

function setAttrs(els, attrs) {
  els = (isNodeList(els) || els instanceof Array) ? els : [els];
  if (Object.prototype.toString.call(attrs) !== '[object Object]') { return; }

  for (var i = els.length; i--;) {
    for(var key in attrs) {
      els[i].setAttribute(key, attrs[key]);
    }
  }
}

function removeAttrs(els, attrs) {
  els = (isNodeList(els) || els instanceof Array) ? els : [els];
  attrs = (attrs instanceof Array) ? attrs : [attrs];

  var attrLength = attrs.length;
  for (var i = els.length; i--;) {
    for (var j = attrLength; j--;) {
      els[i].removeAttribute(attrs[j]);
    }
  }
}

function hideElement(el) {
  if (!hasAttr(el, 'hidden')) {
    setAttrs(el, {'hidden': ''});
  }
}

function showElement(el) {
  if (hasAttr(el, 'hidden')) {
    removeAttrs(el, 'hidden');
  }
}

function isVisible(el) {
  return el.offsetWidth > 0 && el.offsetHeight > 0;
}

// check if an image is loaded
// 1. See if "naturalWidth" and "naturalHeight" properties are available.
// 2. See if "complete" property is available.

function imageLoaded(img) {
  if (typeof img.complete === 'boolean') {
    return img.complete;
  } else if (typeof img.naturalWidth === 'number') {
    return img.naturalWidth !== 0;
  }
}

function whichProperty(props){
  var el = document.createElement('fakeelement'),
      len = props.length;
  for(var i = 0; i < props.length; i++){
    var prop = props[i];
    if( el.style[prop] !== undefined ){ return prop; }
  }

  return false; // explicit for ie9-
}

// get transitionend, animationend based on transitionDuration
// @propin: string
// @propOut: string, first-letter uppercase
// Usage: getEndProperty('WebkitTransitionDuration', 'Transition') => webkitTransitionEnd
function getEndProperty(propIn, propOut) {
  var endProp = false;
  if (/^Webkit/.test(propIn)) {
    endProp = 'webkit' + propOut + 'End';
  } else if (/^O/.test(propIn)) {
    endProp = 'o' + propOut + 'End';
  } else if (propIn) {
    endProp = propOut.toLowerCase() + 'end';
  }
  return endProp;
}

// Test via a getter in the options object to see if the passive property is accessed
var supportsPassive = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
    }
  });
  window.addEventListener("test", null, opts);
} catch (e) {}
var passiveOption = supportsPassive ? { passive: true } : false;

function addEvents(el, obj) {
  for (var prop in obj) {
    var option = (prop === 'touchstart' || prop === 'touchmove') ? passiveOption : false;
    el.addEventListener(prop, obj[prop], option);
  }
}

function removeEvents(el, obj) {
  for (var prop in obj) {
    var option = ['touchstart', 'touchmove'].indexOf(prop) >= 0 ? passiveOption : false;
    el.removeEventListener(prop, obj[prop], option);
  }
}

function Events() {
  return {
    topics: {},
    on: function (eventName, fn) {
      this.topics[eventName] = this.topics[eventName] || [];
      this.topics[eventName].push(fn);
    },
    off: function(eventName, fn) {
      if (this.topics[eventName]) {
        for (var i = 0; i < this.topics[eventName].length; i++) {
          if (this.topics[eventName][i] === fn) {
            this.topics[eventName].splice(i, 1);
            break;
          }
        }
      }
    },
    emit: function (eventName, data) {
      if (this.topics[eventName]) {
        this.topics[eventName].forEach(function(fn) {
          fn(data);
        });
      }
    }
  };
}

function jsTransform(element, attr, prefix, postfix, to, duration, callback) {
  var tick = Math.min(duration, 10),
      unit = (to.indexOf('%') >= 0) ? '%' : 'px',
      to = to.replace(unit, ''),
      from = Number(element.style[attr].replace(prefix, '').replace(postfix, '').replace(unit, '')),
      positionTick = (to - from) / duration * tick,
      running;

  setTimeout(moveElement, tick);
  function moveElement() {
    duration -= tick;
    from += positionTick;
    element.style[attr] = prefix + from + unit + postfix;
    if (duration > 0) { 
      setTimeout(moveElement, tick); 
    } else {
      callback();
    }
  }
}

// Format: IIFE
// Version: 2.3.9

// helper functions
// check browser version and local storage
// if browser upgraded, 
// 1. delete browser ralated data from local storage and 
// 2. recheck these options and save them to local storage
var browserInfo = navigator.userAgent;
var localStorageAccess = true;
var tnsStorage = {};

try {
  tnsStorage = localStorage;
  if (!tnsStorage['tnsApp']) {
    tnsStorage['tnsApp'] = browserInfo;
  } else if (tnsStorage['tnsApp'] !== browserInfo) {
    tnsStorage['tnsApp'] = browserInfo;

    // tC => calc
    // tSP => subpixel
    // tMQ => mediaquery
    // tTf => transform
    // tTDu => transitionDuration
    // tTDe => transitionDelay
    // tADu => animationDuration
    // tADe => animationDelay
    // tTE => transitionEnd
    // tAE => animationEnd

    ['tC', 'tSP', 'tMQ', 'tTf', 'tTDu', 'tTDe', 'tADu', 'tADe', 'tTE', 'tAE'].forEach(function (item) {
      tnsStorage.removeItem(item);
    })
  }
} catch(e) {
  localStorageAccess = false;
}

// get browser related data from local storage if they exist
// otherwise, run the functions again and save these data to local storage
// checkStorageValue() convert non-string value to its original value: 'true' > true
var doc = document;
var win = window;
var KEYS = {
      ENTER: 13,
      SPACE: 32,
      PAGEUP: 33,
      PAGEDOWN: 34,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    };
var CALC = checkStorageValue(tnsStorage['tC']) || setLocalStorage('tC', calc(), localStorageAccess);
var SUBPIXEL = checkStorageValue(tnsStorage['tSP']) || setLocalStorage('tSP', subpixelLayout(), localStorageAccess);
var CSSMQ = checkStorageValue(tnsStorage['tMQ']) || setLocalStorage('tMQ', mediaquerySupport(), localStorageAccess);
var TRANSFORM = checkStorageValue(tnsStorage['tTf']) || setLocalStorage('tTf', whichProperty([
      'transform', 
      'WebkitTransform', 
      'MozTransform', 
      'msTransform', 
      'OTransform'
    ]), localStorageAccess);
var TRANSITIONDURATION = checkStorageValue(tnsStorage['tTDu']) || setLocalStorage('tTDu', whichProperty([
      'transitionDuration', 
      'WebkitTransitionDuration', 
      'MozTransitionDuration', 
      'OTransitionDuration'
    ]), localStorageAccess);
var TRANSITIONDELAY = checkStorageValue(tnsStorage['tTDe']) || setLocalStorage('tTDe', whichProperty([
      'transitionDelay', 
      'WebkitTransitionDelay', 
      'MozTransitionDelay', 
      'OTransitionDelay'
    ]), localStorageAccess);
var ANIMATIONDURATION = checkStorageValue(tnsStorage['tADu']) || setLocalStorage('tADu', whichProperty([
      'animationDuration', 
      'WebkitAnimationDuration', 
      'MozAnimationDuration', 
      'OAnimationDuration'
    ]), localStorageAccess);
var ANIMATIONDELAY = checkStorageValue(tnsStorage['tADe']) || setLocalStorage('tADe', whichProperty([
      'animationDelay', 
      'WebkitAnimationDelay', 
      'MozAnimationDelay', 
      'OAnimationDelay'
    ]), localStorageAccess);
var TRANSITIONEND = checkStorageValue(tnsStorage['tTE']) || setLocalStorage('tTE', getEndProperty(TRANSITIONDURATION, 'Transition'), localStorageAccess);
var ANIMATIONEND = checkStorageValue(tnsStorage['tAE']) || setLocalStorage('tAE', getEndProperty(ANIMATIONDURATION, 'Animation'), localStorageAccess);

// reset SUBPIXEL for IE8
if (!CSSMQ) { SUBPIXEL = false; }

var tns = function(options) {
  options = extend({
    container: doc.querySelector('.slider'),
    mode: 'carousel',
    axis: 'horizontal',
    items: 1,
    gutter: 0,
    edgePadding: 0,
    fixedWidth: false,
    slideBy: 1,
    controls: true,
    controlsText: ['prev', 'next'],
    controlsContainer: false,
    nav: true,
    navContainer: false,
    // navAnimationIn: false,
    // navAnimationOut: false,
    arrowKeys: false,
    speed: 300,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayDirection: 'forward',
    autoplayText: ['start', 'stop'],
    autoplayHoverPause: false,
    autoplayButton: false,
    autoplayButtonOutput: true,
    autoplayResetOnVisibility: true,
    // animateIn: 'tns-fadeIn',
    // animateOut: 'tns-fadeOut',
    // animateNormal: 'tns-normal',
    // animateDelay: false,
    loop: true,
    rewind: false,
    autoHeight: false,
    responsive: false,
    lazyload: false,
    touch: true,
    mouseDrag: false,
    nested: false,
    freezable: true,
    onInit: false
  }, options || {});
  
  // get element nodes from selectors
  ['container', 'controlsContainer', 'navContainer', 'autoplayButton'].forEach(function(item) {
    if (typeof options[item] === 'string') { options[item] = doc.querySelector(options[item]); }
  });

  // make sure slide container exists
  if (!options.container || !options.container.nodeName || options.container.children.length < 2) { return; }

  // update responsive
  // from: { 
  //    300: 2, 
  //    800: {
  //      loop: false
  //    }
  // }
  // to: {
  //    300: { 
  //      items: 2 
  //    }, 
  //    800: {
  //      loop: false
  //    }
  // }
  if (options.responsive) {
    var resTem = {}, res = options.responsive;
    for(var key in res) {
      var val = res[key];
      resTem[key] = typeof val === 'number' ? {items: val} :  val;
    }

    options.responsive = resTem;
    resTem = null;

    // apply responsive[0] to options and remove it
    if (0 in options.responsive) {
      options = extend(options, options.responsive[0]);
      delete options.responsive[0];
    }
  }

  // === define and set variables ===
  var carousel = options.mode === 'carousel' ? true : false;

  if (!carousel) {
    options.axis = 'horizontal';
    options.rewind = false;
    options.loop = true;
    options.edgePadding = false;

    var animateIn = 'tns-fadeIn',
        animateOut = 'tns-fadeOut',
        animateDelay = false,
        animateNormal = options.animateNormal || 'tns-normal';

    if (TRANSITIONEND && ANIMATIONEND) {
      animateIn = options.animateIn || animateIn;
      animateOut = options.animateOut || animateOut;
      animateDelay = options.animateDelay || animateDelay;
    }
  }

  var horizontal = options.axis === 'horizontal' ? true : false,
      outerWrapper = doc.createElement('div'),
      innerWrapper = doc.createElement('div'),
      container = options.container,
      containerParent = container.parentNode,
      slideItems = container.children,
      slideCount = slideItems.length,
      vpOuter = containerParent.clientWidth,
      vpInner,
      responsive = options.responsive,
      responsiveItems = [],
      breakpoints = false,
      breakpointZone = 0,
      windowWidth = getWindowWidth();

  if (responsive) {
    breakpoints = Object.keys(responsive)
      .map(function (x) { return parseInt(x); })
      .sort(function (a, b) { return a - b; });

    // get all responsive items
    breakpoints.forEach(function(bp) {
      responsiveItems = responsiveItems.concat(Object.keys(responsive[bp]));
    });

    // remove duplicated items
    var arr = [];
    responsiveItems.forEach(function (item) { if (arr.indexOf(item) < 0) { arr.push(item); } });
    responsiveItems = arr;

    setBreakpointZone();
  } 

  var items = getOption('items'),
      slideBy = getOption('slideBy') === 'page' ? items : getOption('slideBy'),
      nested = options.nested,
      gutter = getOption('gutter'),
      edgePadding = getOption('edgePadding'),
      fixedWidth = getOption('fixedWidth'),
      arrowKeys = getOption('arrowKeys'),
      speed = getOption('speed'),
      rewind = options.rewind,
      loop = rewind ? false : options.loop,
      autoHeight = getOption('autoHeight'),
      sheet = createStyleSheet(),
      lazyload = options.lazyload,
      slideOffsetTops, // collection of slide offset tops
      slideItemsOut = [],
      cloneCount = loop ? slideCount * 2 : 0,
      slideCountNew = !carousel ? slideCount + cloneCount : slideCount + cloneCount * 2,
      hasRightDeadZone = fixedWidth && !loop && !edgePadding ? true : false,
      updateIndexBeforeTransform = !carousel || !loop ? true : false,
      // transform
      transformAttr = horizontal ? 'left' : 'top',
      transformPrefix = '',
      transformPostfix = '',
      // index
      index = !carousel ? 0 : cloneCount,
      indexCached = index,
      indexMin = 0,
      indexMax = slideCountNew - items,
      // resize
      resizeTimer,
      touchedOrDraged,
      running = false,
      onInit = options.onInit,
      events = new Events(),
      // id, class
      containerIdCached = container.id,
      classContainer = ' tns-slider tns-' + options.mode,
      slideId = container.id || getSlideId(),
      disable = getOption('disable'),
      freezable = options.freezable,
      freeze = disable ? true : freezable ? slideCount <= items : false,
      frozen,
      importantStr = nested === 'inner' ? ' !important' : '',
      controlsEvents = {
        'click': onControlsClick,
        'keydown': onControlsKeydown
      },
      navEvents = {
        'click': onNavClick,
        'keydown': onNavKeydown
      },
      hoverEvents = {
        'mouseover': mouseoverPause,
        'mouseout': mouseoutRestart
      },
      visibilityEvent = {'visibilitychange': onVisibilityChange},
      docmentKeydownEvent = {'keydown': onDocumentKeydown},
      touchEvents = {
        'touchstart': onTouchOrMouseStart,
        'touchmove': onTouchOrMouseMove,
        'touchend': onTouchOrMouseEnd,
        'touchcancel': onTouchOrMouseEnd
      }, dragEvents = {
        'mousedown': onTouchOrMouseStart,
        'mousemove': onTouchOrMouseMove,
        'mouseup': onTouchOrMouseEnd,
        'mouseleave': onTouchOrMouseEnd
      },
      hasControls = checkOption('controls'),
      hasNav = checkOption('nav'),
      hasAutoplay = checkOption('autoplay'),
      hasTouch = checkOption('touch'),
      hasMouseDrag = checkOption('mouseDrag'),
      slideActiveClass = 'tns-slide-active';

  // controls
  if (hasControls) {
    var controls = getOption('controls'),
        controlsText = getOption('controlsText'),
        controlsContainer = options.controlsContainer,
        prevButton,
        nextButton,
        prevIsButton,
        nextIsButton;
  }

  // nav
  if (hasNav) {
    var nav = getOption('nav'),
        navContainer = options.navContainer,
        // navAnimationIn = options.navAnimationIn,
        // navAnimationOut = options.navAnimationOut,
        navItems,
        visibleNavIndexes = [],
        visibleNavIndexesCached = visibleNavIndexes,
        navClicked = -1,
        navCurrentIndex = 0,
        navCurrentIndexCached = 0,
        navActiveClass = 'tns-nav-active';
  }

  // autoplay
  if (hasAutoplay) {
    var autoplay = getOption('autoplay'),
        autoplayTimeout = getOption('autoplayTimeout'),
        autoplayDirection = options.autoplayDirection === 'forward' ? 1 : -1,
        autoplayText = getOption('autoplayText'),
        autoplayHoverPause = getOption('autoplayHoverPause'),
        autoplayButton = options.autoplayButton,
        autoplayResetOnVisibility = getOption('autoplayResetOnVisibility'),
        autoplayHtmlStrings = ['<span class=\'tns-visually-hidden\'>', ' animation</span>'],
        autoplayTimer,
        animating,
        autoplayHoverPaused,
        autoplayVisibilityPaused;
  }

  // touch
  if (hasTouch) {
    var touch = getOption('touch'),
        startX = null,
        startY = null,
        translateInit,
        moveDirectionExpected = 0,
        disX,
        disY;
  }

  // mouse drag
  if (hasMouseDrag) {
    var mouseDrag = getOption('mouseDrag'),
        isDragEvent = false;
  }

  // disable slider when slidecount <= items
  if (freeze) {
    controls = nav = touch = mouseDrag = arrowKeys = autoplay = autoplayHoverPause = autoplayResetOnVisibility = false;
  }

  if (TRANSFORM) {
    transformAttr = TRANSFORM;
    transformPrefix = 'translate';
    transformPrefix += horizontal ? 'X(' : 'Y(';
    transformPostfix = ')';
  }

  // === COMMON FUNCTIONS === //
  function getWindowWidth () {
    return win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
  }

  function checkOption (item) {
    var result = options[item];
    if (!result && breakpoints && responsiveItems.indexOf(item) >= 0) {
      breakpoints.forEach(function (bp) {
        if (responsive[bp][item]) { result = true; }
      });
    }
    return result;
  }

  function getOption (item, viewport) {
    viewport = viewport ? viewport : windowWidth;
    
    var obj = {
          slideBy: 'page',
          edgePadding: false,
          autoHeight: true
        },
        result;

    if (!carousel && item in obj) {
      result = obj[item];
    } else {
      if (item === 'items' && getOption('fixedWidth')) {
        result = Math.floor(vpOuter / (getOption('fixedWidth') + getOption('gutter')));
      } else if (item === 'autoHeight' && nested === 'outer') {
        result = true;
      } else {
        result = options[item];

        if (breakpoints && responsiveItems.indexOf(item) >= 0) {
          for (var i = 0, len = breakpoints.length; i < len; i++) {
            var bp = breakpoints[i];
            if (viewport >= bp) {
              if (item in responsive[bp]) { result = responsive[bp][item]; }
            } else { break; }
          }
        }
      }
    }


    if (item === 'slideBy' && result === 'page') { result = getOption('items'); }

    return result;
  }

  function getSlideMarginLeft (i) {
    var str = CALC ? 
      CALC + '(' + i * 100 + '% / ' + slideCountNew + ')' : 
      i * 100 / slideCountNew + '%';
    return str;
  }

  function getInnerWrapperStyles (edgePaddingTem, gutterTem, fixedWidthTem) {
    var str = '';
    if (edgePaddingTem) {
      var gap = edgePaddingTem;
      if (gutterTem) { gap += gutterTem; }
      if (fixedWidthTem) {
        str = 'margin: 0px ' + (vpOuter%(fixedWidthTem + gutterTem) + gutterTem) / 2 + 'px';
      } else {
        str = horizontal ?
          'margin: 0 ' + edgePaddingTem + 'px 0 ' + gap + 'px;' :
          'padding: ' + gap + 'px 0 ' + edgePaddingTem + 'px 0;';
      }
    } else if (gutterTem && !fixedWidthTem) {
      var gutterTemUnit = '-' + gutterTem + 'px',
          dir = horizontal ? gutterTemUnit + ' 0 0' : '0 ' + gutterTemUnit + ' 0';
      str = 'margin: 0 ' + dir + ';';
    }

    return str;
  }

  function getContainerWidth (fixedWidthTem, gutterTem, itemsTem) {
    var str;

    if (fixedWidthTem) {
      str = (fixedWidthTem + gutterTem) * slideCountNew + 'px';
    } else {
      str = CALC ? 
        CALC + '(' + slideCountNew * 100 + '% / ' + itemsTem + ')' : 
        slideCountNew * 100 / itemsTem + '%';
    }

    return str;
  }

  function getSlideWidthStyle (fixedWidthTem, gutterTem, itemsTem) {
    var str = '';

    if (horizontal) {
      str = 'width:';
      if (fixedWidthTem) {
        str += (fixedWidthTem + gutterTem) + 'px';
      } else {
        var dividend = carousel ? slideCountNew : itemsTem;
        str += CALC ? 
          CALC + '(100% / ' + dividend + ')' : 
          100 / dividend + '%';
      }
      str += importantStr + ';';
    }

    return str;
  }

  function getSlideGutterStyle (gutterTem) {
    var str = '';

    // gutter maybe interger || 0
    // so can't use 'if (gutter)'
    if (gutterTem !== false) {
      var prop = horizontal ? 'padding-' : 'margin-',
          dir = horizontal ? 'right' : 'bottom';
      str = prop +  dir + ': ' + gutterTem + 'px;';
    }

    return str;
  }

  (function sliderInit () {
    // First thing first, wrap container with 'outerWrapper > innerWrapper',
    // to get the correct view width
    outerWrapper.appendChild(innerWrapper);
    containerParent.insertBefore(outerWrapper, container);
    innerWrapper.appendChild(container);
    vpInner = innerWrapper.clientWidth;

    var classOuter = 'tns-outer',
        classInner = 'tns-inner',
        hasGutter = checkOption('gutter');

    if (carousel) {
      if (horizontal) {
        if (checkOption('edgePadding') || hasGutter && !options.fixedWidth) {
          classOuter += ' tns-ovh';
        } else {
          classInner += ' tns-ovh';
        }
      } else {
        classInner += ' tns-ovh';
      }
    } else if (hasGutter) {
      classOuter += ' tns-ovh';
    }

    outerWrapper.className = classOuter;
    innerWrapper.className = classInner;
    innerWrapper.id = slideId + '-iw';
    if (autoHeight) {
      innerWrapper.className += ' tns-ah';
      innerWrapper.style[TRANSITIONDURATION] = speed / 1000 + 's';
    }

    // set container properties
    if (container.id === '') { container.id = slideId; }
    classContainer += SUBPIXEL ? ' tns-subpixel' : ' tns-no-subpixel';
    classContainer += CALC ? ' tns-calc' : ' tns-no-calc';
    if (carousel) { classContainer += ' tns-' + options.axis; }
    container.className += classContainer;
    // add event
    if (carousel && TRANSITIONEND) {
      var eve = {};
      eve[TRANSITIONEND] = onTransitionEnd;
      addEvents(container, eve);
    }

    // delete datas after init
    classOuter = classInner = null;

    // add id, class, aria attributes 
    // before clone slides
    for (var x = 0; x < slideCount; x++) {
      var item = slideItems[x];
      if (!item.id) { item.id = slideId + '-item' + x; }
      addClass(item, 'tns-item');
      if (!carousel && animateNormal) { addClass(item, animateNormal); }
      setAttrs(item, {
        'aria-hidden': 'true',
        'tabindex': '-1'
      });
    }

    // clone slides
    if (loop || edgePadding) {
      var fragmentBefore = doc.createDocumentFragment(), 
          fragmentAfter = doc.createDocumentFragment();

      for (var j = cloneCount; j--;) {
        var num = j%slideCount,
            cloneFirst = slideItems[num].cloneNode(true);
        removeAttrs(cloneFirst, 'id');
        fragmentAfter.insertBefore(cloneFirst, fragmentAfter.firstChild);

        if (carousel) {
          var cloneLast = slideItems[slideCount - 1 - num].cloneNode(true);
          removeAttrs(cloneLast, 'id');
          fragmentBefore.appendChild(cloneLast);
        }
      }

      container.insertBefore(fragmentBefore, container.firstChild);
      container.appendChild(fragmentAfter);
      slideItems = container.children;
    }

    // activate visible slides
    // add aria attrs
    // set animation classes and left value for gallery slider
    // use slide count when slides are fewer than items
    for (var i = index; i < index + Math.min(slideCount, items); i++) {
      var item = slideItems[i];
      setAttrs(item, {'aria-hidden': 'false'});
      removeAttrs(item, ['tabindex']);
      addClass(item, slideActiveClass);

      if (!carousel) { 
        item.style.left = (i - index) * 100 / items + '%';
        addClass(item, animateIn);
        removeClass(item, animateNormal);
      }
    }

    if (carousel && horizontal) {
      // set font-size rules
      // for modern browsers
      if (SUBPIXEL) {
        // set slides font-size first
        addCSSRule(sheet, '#' + slideId + ' > .tns-item', 'font-size:' + win.getComputedStyle(slideItems[0]).fontSize + ';', getCssRulesLength(sheet));
        addCSSRule(sheet, '#' + slideId, 'font-size:0;', getCssRulesLength(sheet));

      // slide left margin
      // for IE8 & webkit browsers (no subpixel)
      } else {
        [].forEach.call(slideItems, function (slide, i) {
          slide.style.marginLeft = getSlideMarginLeft(i);
        });
      }
    }

    if (CSSMQ) {
      // inner wrapper styles
      var str = getInnerWrapperStyles(options.edgePadding, options.gutter, options.fixedWidth);
      addCSSRule(sheet, '#' + slideId + '-iw', str, getCssRulesLength(sheet));

      // container styles
      if (carousel && horizontal) {
        str = 'width:' + getContainerWidth(options.fixedWidth, options.gutter, options.items);
        addCSSRule(sheet, '#' + slideId, str, getCssRulesLength(sheet));
      }

      // slide styles
      if (horizontal || options.gutter) {
        str = getSlideWidthStyle(options.fixedWidth, options.gutter, options.items) + 
              getSlideGutterStyle(options.gutter);
        addCSSRule(sheet, '#' + slideId + ' > .tns-item', str, getCssRulesLength(sheet));
      }

    // non CSS mediaqueries: IE8
    // ## update inner wrapper, container, slides if needed
    // set inline styles for inner wrapper & container
    // insert stylesheet (one line) for slides only (since slides are many)
    } else {
      // inner wrapper styles
      innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth);

      // container styles
      if (carousel && horizontal) {
        container.style.width = getContainerWidth(fixedWidth, gutter, items);
      }

      // slide styles
      if (horizontal || gutter) {
        var str = getSlideWidthStyle(fixedWidth, gutter, items) +
                  getSlideGutterStyle(gutter);
        // append to the last line
        addCSSRule(sheet, '#' + slideId + ' > .tns-item', str, getCssRulesLength(sheet));
      }
    }

    if (!horizontal && !disable) {
      getSlideOffsetTops();
      updateContentWrapperHeight();
    }

    // media queries
    if (responsive && CSSMQ) {
      breakpoints.forEach(function(bp) {
        var opts = responsive[bp],
            str = '',
            innerWrapperStr = '',
            containerStr = '',
            slideStr = '',
            itemsBP = getOption('items', bp),
            fixedWidthBP = getOption('fixedWidth', bp),
            edgePaddingBP = getOption('edgePadding', bp),
            gutterBP = getOption('gutter', bp);

        // inner wrapper string
        if ('edgePadding' in opts || 'gutter' in opts) {
          innerWrapperStr = '#' + slideId + '-iw{' + getInnerWrapperStyles(edgePaddingBP, gutterBP, fixedWidthBP) + '}';
        }

        // container string
        if (carousel && horizontal && ('fixedWidth' in opts || 'gutter' in opts || 'items' in opts)) {
          containerStr = '#' + slideId + '{' + 'width:' + getContainerWidth(fixedWidthBP, gutterBP, itemsBP) + '}';
        }

        // slide string
        if ('fixedWidth' in opts || checkOption('fixedWidth') && 'gutter' in opts || !carousel && 'items' in opts) {
          slideStr += getSlideWidthStyle(fixedWidthBP, gutterBP, itemsBP);
        }
        if ('gutter' in opts) {
          slideStr += getSlideGutterStyle(gutterBP);
        }
        if (slideStr.length > 0) { slideStr = '#' + slideId + ' > .tns-item{' + slideStr + '}'; }

        str = innerWrapperStr + containerStr + slideStr;

        if (str.length > 0) {
          sheet.insertRule('@media (min-width: ' + bp / 16 + 'em) {' + str + '}', sheet.cssRules.length);
        }
      });
    }


    // set container transform property
    if (carousel && !disable) {
      doContainerTransform();
    }


    // == msInit ==
    // for IE10
    if (navigator.msMaxTouchPoints) {
      addClass(outerWrapper, 'ms-touch');
      addEvents(outerWrapper, {'scroll': ie10Scroll});
      setSnapInterval();
    }

 
    // == navInit ==
    if (hasNav) {
      var initIndex = !carousel ? 0 : cloneCount;
      // customized nav
      // will not hide the navs in case they're thumbnails
      if (navContainer) {
        setAttrs(navContainer, {'aria-label': 'Carousel Pagination'});
        navItems = navContainer.children;
        [].forEach.call(navItems, function (item, index) {
          setAttrs(item, {
            'data-nav': index,
            'tabindex': '-1',
            'aria-selected': 'false',
            'aria-controls': slideItems[initIndex + index].id,
          });
          // if (navAnimationOut) {
          //   addClass(item, navAnimationOut);
          // }
        });

      // generated nav 
      } else {
        var navHtml = '';
            // classStr = navAnimationOut ? 'class="' + navAnimationOut + '"' : '';
        for (var i = 0; i < slideCount; i++) {
          // hide nav items by default
          // navHtml += '<button ' + classStr + ' data-nav="' + i +'" tabindex="-1" aria-selected="false" aria-controls="' + slideId + '-item' + i +'" hidden type="button"></button>';
          navHtml += '<button data-nav="' + i +'" tabindex="-1" aria-selected="false" aria-controls="' + slideItems[initIndex + i].id +'" hidden type="button"></button>';
        }
        navHtml = '<div class="tns-nav" aria-label="Carousel Pagination">' + navHtml + '</div>';
        outerWrapper.insertAdjacentHTML('afterbegin', navHtml);

        navContainer = outerWrapper.querySelector('.tns-nav');
        navItems = navContainer.children;

        updateNavVisibility();
      }

      // add transition
      if (TRANSITIONDURATION) {
        var prefix = TRANSITIONDURATION.substring(0, TRANSITIONDURATION.length - 18).toLowerCase(),
            str = 'transition: all ' + speed / 1000 + 's';

        if (prefix) {
          str = '-' + prefix + '-' + str;
        }

        addCSSRule(sheet, '[aria-controls^=' + slideId + '-item]', str, getCssRulesLength(sheet));
      }

      setAttrs(navItems[0], {'tabindex': '0', 'aria-selected': 'true'});
      addClass(navItems[0], navActiveClass);
      // if (navAnimationOut) {
      //   removeClass(navItems[0], navAnimationOut);
      // }
      // if (navAnimationIn) {
      //   addClass(navItems[0], navAnimationIn);
      // }

      // add events
      addEvents(navContainer, navEvents);

      if (!nav) { hideElement(navContainer); }
    }


    // == autoplayInit ==
    if (hasAutoplay) {
      var txt = autoplay ? 'stop' : 'start';
      if (autoplayButton) {
        setAttrs(autoplayButton, {'data-action': txt});
      } else if (options.autoplayButtonOutput) {
        innerWrapper.insertAdjacentHTML('beforebegin', '<button data-action="' + txt + '" type="button">' + autoplayHtmlStrings[0] + txt + autoplayHtmlStrings[1] + autoplayText[0] + '</button>');
        autoplayButton = outerWrapper.querySelector('[data-action]');
      }

      // add event
      if (autoplayButton) {
        addEvents(autoplayButton, {'click': toggleAnimation});
      }

      if (!autoplay) {
        if (autoplayButton) {
          hideElement(autoplayButton);
        }
      } else {
        startAutoplay();
        if (autoplayHoverPause) { addEvents(container, hoverEvents); }
        if (autoplayResetOnVisibility) { addEvents(container, visibilityEvent); }
      }
    }


    // == controlsInit ==
    if (hasControls) {
      if (controlsContainer) {
        prevButton = controlsContainer.children[0];
        nextButton = controlsContainer.children[1];
        setAttrs(controlsContainer, {
          'aria-label': 'Carousel Navigation',
          'tabindex': '0'
        });
        setAttrs(prevButton, {'data-controls' : 'prev'});
        setAttrs(nextButton, {'data-controls' : 'next'});
        setAttrs(controlsContainer.children, {
          'aria-controls': slideId,
          'tabindex': '-1',
        });
      } else {
        outerWrapper.insertAdjacentHTML('afterbegin', '<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button data-controls="prev" tabindex="-1" aria-controls="' + slideId +'" type="button">' + controlsText[0] + '</button><button data-controls="next" tabindex="-1" aria-controls="' + slideId +'" type="button">' + controlsText[1] + '</button></div>');

        controlsContainer = outerWrapper.querySelector('.tns-controls');
        prevButton = controlsContainer.children[0];
        nextButton = controlsContainer.children[1];
      }

      prevIsButton = isButton(prevButton);
      nextIsButton = isButton(nextButton);

      if (!loop) { disEnableElement(prevIsButton, prevButton, true); }

      // add events
      addEvents(controlsContainer, controlsEvents);

      if (!controls) { hideElement(controlsContainer); }
    }


    if (touch) { addEvents(container, touchEvents); }
    if (mouseDrag) { addEvents(container, dragEvents); }
    if (arrowKeys) { addEvents(doc, docmentKeydownEvent); }


    if (nested === 'inner') {
      events.on('outerResized', function () {
        resizeTasks();
        events.emit('innerLoaded', info());
      });
    } else {
      addEvents(win, {'resize': onResize});
      if (nested === 'outer') {
        events.on('innerLoaded', runAutoHeight);
      }
    }

    lazyLoad();
    runAutoHeight();
    toggleSlideDisplayAndEdgePadding();
    updateFixedWidthInnerWrapperStyle();

    events.on('indexChanged', additionalUpdates);

    if (typeof onInit === 'function') { onInit(info()); }
    if (nested === 'inner') { events.emit('innerLoaded', info()); }

    if (disable) { disableSlider(true); }
  })();





// === ON RESIZE ===
  function onResize (e) {
    e = e || win.event;

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var newWW = getWindowWidth();
      if (windowWidth !== newWW) {
        windowWidth = newWW;

        resizeTasks();

        if (nested === 'outer') { events.emit('outerResized', info(e)); }
      }
    }, 100); // update after stop resizing for 100 ms
  }

  function resizeTasks () {
    var breakpointZoneTem = breakpointZone,
        indexTem = index, 
        itemsTem = items,
        freezeTem = freeze;

    vpOuter = outerWrapper.clientWidth;
    vpInner = innerWrapper.clientWidth;
    if (breakpoints) { setBreakpointZone(); }


    // things do when breakpoint zone change
    if (breakpointZoneTem !== breakpointZone || fixedWidth) {
      var slideByTem = slideBy,
          arrowKeysTem = arrowKeys,
          autoHeightTem = autoHeight,
          fixedWidthTem = fixedWidth,
          edgePaddingTem = edgePadding,
          gutterTem = gutter,
          disableTem = disable;

      // update variables
      items = getOption('items');
      slideBy = getOption('slideBy');
      disable = getOption('disable');
      freeze = disable ? true : freezable ? slideCount <= items : false;

      if (items !== itemsTem) {
        indexMax = slideCountNew - items;
        // check index before transform in case
        // slider reach the right edge then items become bigger
        updateIndex();
      }

      if (disable !== disableTem) {
        disableSlider(disable);
      }
      
      if (freeze !== freezeTem) {
        // reset index to initial status
        if (freeze) { index = !carousel ? 0 : cloneCount; }

        toggleSlideDisplayAndEdgePadding();
      }
      
      if (breakpointZoneTem !== breakpointZone) {
        speed = getOption('speed');
        edgePadding = getOption('edgePadding');
        gutter = getOption('gutter');

        fixedWidth = getOption('fixedWidth');
        if (!disable && fixedWidth !== fixedWidthTem) {
          doContainerTransform();
        }

        autoHeight = getOption('autoHeight');
        if (autoHeight !== autoHeightTem) {
          if (!autoHeight) { innerWrapper.style.height = ''; }
        }
      }

      arrowKeys = freeze ? false : getOption('arrowKeys');
      if (arrowKeys !== arrowKeysTem) {
        arrowKeys ?
          addEvents(doc, docmentKeydownEvent) :
          removeEvents(doc, docmentKeydownEvent);
      }

      if (hasControls) {
        var controlsTem = controls,
            controlsTextTem = controlsText;
        controls = freeze ? false : getOption('controls');
        controlsText = getOption('controlsText');

        if (controls !== controlsTem) {
          controls ?
            showElement(controlsContainer) :
            hideElement(controlsContainer); 
        }
        if (controlsText !== controlsTextTem) {
          prevButton.innerHTML = controlsText[0];
          nextButton.innerHTML = controlsText[1];
        }
      }
      if (hasNav) {
        var navTem = nav;
        nav = freeze ? false : getOption('nav');

        if (nav !== navTem) {
          if (nav) {
            showElement(navContainer);
            updateNavVisibility();
          } else {
            hideElement(navContainer);
          }
        }
      }
      if (hasTouch) {
        var touchTem = touch;
        touch = freeze ? false : getOption('touch');

        if (touch !== touchTem && carousel) {
          touch ?
            addEvents(container, touchEvents) :
            removeEvents(container, touchEvents);
        }
      }
      if (hasMouseDrag) {
        var mouseDragTem = mouseDrag;
        mouseDrag = freeze ? false : getOption('mouseDrag');

        if (mouseDrag !== mouseDragTem && carousel) {
          mouseDrag ?
            addEvents(container, dragEvents) :
            removeEvents(container, dragEvents);
        }
      }
      if (hasAutoplay) {
        var autoplayTem = autoplay,
            autoplayHoverPauseTem = autoplayHoverPause,
            autoplayResetOnVisibilityTem = autoplayResetOnVisibility,
            autoplayTextTem = autoplayText;

        if (freeze) {
          autoplay = autoplayHoverPause = autoplayResetOnVisibility = false;
        } else {
          autoplay = getOption('autoplay');
          
          if (autoplay) {
            autoplayHoverPause = getOption('autoplayHoverPause');
            autoplayResetOnVisibility = getOption('autoplayResetOnVisibility');
          } else {
            autoplayHoverPause = autoplayResetOnVisibility = false;
          }
        }
        autoplayText = getOption('autoplayText');
        autoplayTimeout = getOption('autoplayTimeout');

        if (autoplay !== autoplayTem) {
          if (autoplay) {
            if (autoplayButton) { showElement(autoplayButton); }
            if (!animating) { startAutoplay(); }
          } else {
            if (autoplayButton) { hideElement(autoplayButton); }
            if (animating) { stopAutoplay(); }
          }
        }
        if (autoplayHoverPause !== autoplayHoverPauseTem) {
          autoplayHoverPause ?
            addEvents(container, hoverEvents) :
            removeEvents(container, hoverEvents);
        }
        if (autoplayResetOnVisibility !== autoplayResetOnVisibilityTem) {
          autoplayResetOnVisibility ?
            addEvents(doc, visibilityEvent) :
            removeEvents(doc, visibilityEvent);
        }
        if (autoplayButton && autoplayText !== autoplayTextTem) {
          var i = autoplay ? 1 : 0,
              html = autoplayButton.innerHTML,
              len = html.length - autoplayTextTem[i].length;
          if (html.substring(len) === autoplayTextTem[i]) {
            autoplayButton.innerHTML = html.substring(0, len) + autoplayText[i];
          }
        }
      }

      // IE8
      // ## update inner wrapper, container, slides if needed
      // set inline styles for inner wrapper & container
      // insert stylesheet (one line) for slides only (since slides are many)
      if (!CSSMQ) {
        // inner wrapper styles
        if (!freeze && (edgePadding !== edgePaddingTem || gutter !== gutterTem)) {
          innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth);
        }

        // container styles
        if (carousel && horizontal && (fixedWidth !== fixedWidthTem || gutter !== gutterTem || items !== itemsTem)) {
          container.style.width = getContainerWidth(fixedWidth, gutter, items);
        }

        // slide styles
        if (horizontal && (items !== itemsTem || gutter !== gutterTem || fixedWidth != fixedWidthTem)) {
          var str = getSlideWidthStyle(fixedWidth, gutter, items) + 
                    getSlideGutterStyle(gutter);

          // remove the last line and
          // add new styles
          sheet.removeRule(getCssRulesLength(sheet) - 1);
          addCSSRule(sheet, '#' + slideId + ' > .tns-item', str, getCssRulesLength(sheet));
        }

        // will do transform later if index !== indexTem
        // make sure doTransform will only run once
        if (!fixedWidth && index === indexTem) { doTransform(0); }
      }

      if (index !== indexTem) { 
        events.emit('indexChanged', info());
        doTransform(0); 
        indexCached = index;
      }

      if (items !== itemsTem) { 
        additionalUpdates();
        runAutoHeight();

        if (navigator.msMaxTouchPoints) { setSnapInterval(); }
      }
    }

    // things always do regardless of breakpoint zone changing
    if (!horizontal && !disable) {
      getSlideOffsetTops();
      updateContentWrapperHeight();
      doContainerTransform();
    }

    updateFixedWidthInnerWrapperStyle(true);

    // auto height
    runAutoHeight();
  }





  // === INITIALIZATION FUNCTIONS === //
  function setBreakpointZone () {
    breakpointZone = 0;
    breakpoints.forEach(function(bp, i) {
      if (windowWidth >= bp) { breakpointZone = i + 1; }
    });
  }

  // (slideBy, indexMin, indexMax) => index
  var updateIndex = (function () {
    return loop ? 
      function () {
        var leftEdge = indexMin + slideBy, rightEdge = indexMax - slideBy;

        // adjust edges when edge padding is true
        // or fixed-width slider with extra space on the right side
        if (edgePadding) {
          leftEdge += 1;
          rightEdge -= 1;
        } else if (fixedWidth) {
          var gt = gutter ? gutter : 0;
          if (vpOuter%(fixedWidth + gt) > gt) { rightEdge -= 1; }
        }

        if (index > rightEdge) {
          while(index >= leftEdge + slideCount) { index -= slideCount; }
        } else if(index < leftEdge) {
          while(index <= rightEdge - slideCount) { index += slideCount; }
        }
      } :
      function () { index = Math.max(indexMin, Math.min(indexMax, index)); };
  })();

  function toggleSlideDisplayAndEdgePadding () {
    // if (cloneCount) {
    // if (fixedWidth && cloneCount) {
      var str = 'tns-transparent',
          innerWrapperMarginZero = innerWrapper.style.margin === '0px';

      if (freeze) {
        if (!innerWrapperMarginZero) {
          // remove edge padding from inner wrapper
          if (edgePadding) { innerWrapper.style.margin = '0px'; }

          // add class tns-transparent to cloned slides
          if (cloneCount) {
            for (var i = cloneCount; i--;) {
              addClass(slideItems[i], str);
              addClass(slideItems[slideCountNew - i - 1], str);
            }
          }
        }
      } else if (innerWrapperMarginZero) {
        // restore edge padding for inner wrapper
        // for mordern browsers
        if (edgePadding && !fixedWidth && CSSMQ) { innerWrapper.style.margin = ''; }

        // remove class tns-transparent to cloned slides
        if (cloneCount) {
          for (var i = cloneCount; i--;) {
            removeClass(slideItems[i], str);
            removeClass(slideItems[slideCountNew - i - 1], str);
          }
        }
      }
    // }
  }

  function updateFixedWidthInnerWrapperStyle (resize) {
    if (fixedWidth && edgePadding) {
      // remove edge padding when freeze or viewport narrower than one slide
      if (freeze || vpOuter <= (fixedWidth + gutter)) {
        if (innerWrapper.style.margin !== '0px') { innerWrapper.style.margin = '0px'; }
      // update edge padding on resize
      } else if (resize) {
        innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth);
      }
    }
  }

  function disableSlider (disable) {
    var len = slideItems.length;
    
    if (disable) {
      sheet.disabled = true;
      container.className = container.className.replace(classContainer.substring(1), '');
      container.style = '';
      if (loop) {
        for (var j = cloneCount; j--;) {
          if (carousel) { hideElement(slideItems[j]); }
          hideElement(slideItems[len - j - 1]);
        }
      }

      // vertical slider
      if (!horizontal || !carousel) { innerWrapper.style = ''; }

      // gallery
      if (!carousel) { 
        for (var i = index; i < index + slideCount; i++) {
          var item = slideItems[i];
          item.style = '';
          removeClass(item, animateIn);
          removeClass(item, animateNormal);
        }
      }
    } else {
      sheet.disabled = false;
      container.className += classContainer;

      // vertical slider: get offsetTops before container transform
      if (!horizontal) { getSlideOffsetTops(); }

      doContainerTransform();
      if (loop) {
        for (var j = cloneCount; j--;) {
          if (carousel) { showElement(slideItems[j]); }
          showElement(slideItems[len - j - 1]);
        }
      }

      // gallery
      if (!carousel) { 
        for (var i = index; i < index + slideCount; i++) {
          var item = slideItems[i],
              classN = i < index + items ? animateIn : animateNormal;
          item.style.left = (i - index) * 100 / items + '%';
          addClass(item, classN);
        }
      }
    }
  }

  // lazyload
  function lazyLoad () {
    if (lazyload && !disable) {
      var i = index, 
          len = index + items;
          
      if (edgePadding) {
        i -=1;
        len +=1;
      }

      for(; i < len; i++) {
        [].forEach.call(slideItems[i].querySelectorAll('.tns-lazy-img'), function (img) {
          // stop propagationl transitionend event to container
          var eve = {};
          eve[TRANSITIONEND] = function (e) { e.stopPropagation(); };
          addEvents(img, eve);

          if (!hasClass(img, 'loaded')) {
            img.src = getAttr(img, 'data-src');
            addClass(img, 'loaded');
          }
        });
      }
    }
  }

  // check if all visible images are loaded
  // and update container height if it's done
  function runAutoHeight () {
    if (autoHeight && !disable) {
      // get all images inside visible slide items
      var images = [];

      for (var i = index; i < index + items; i++) {
        [].forEach.call(slideItems[i].querySelectorAll('img'), function (img) {
          images.push(img);
        });
      }

      if (images.length === 0) {
        updateInnerWrapperHeight(); 
      } else {
        checkImagesLoaded(images);
      }
    }
  }

  function checkImagesLoaded (images) {
    images.forEach(function (img, index) {
      if (imageLoaded(img)) { images.splice(index, 1); }
    });

    if (images.length === 0) {
      updateInnerWrapperHeight();
    } else {
      setTimeout(function () { 
        checkImagesLoaded(images); 
      }, 16);
    }
  } 

  function additionalUpdates () {
    lazyLoad(); 
    updateSlideStatus();
    updateControlsStatus();
    updateNavVisibility();
    updateNavStatus();
  }


  // update inner wrapper height
  // 1. get the max-height of the visible slides
  // 2. set transitionDuration to speed
  // 3. update inner wrapper height to max-height
  // 4. set transitionDuration to 0s after transition done
  function updateInnerWrapperHeight () {
    var heights = [], maxHeight;
    for (var i = index; i < index + items; i++) {
      heights.push(slideItems[i].offsetHeight);
    }
    maxHeight = Math.max.apply(null, heights);

    if (innerWrapper.style.height !== maxHeight) {
      if (TRANSITIONDURATION) { setDurations(speed); }
      innerWrapper.style.height = maxHeight + 'px';
    }
  }

  // get the distance from the top edge of the first slide to each slide
  // (init) => slideOffsetTops
  function getSlideOffsetTops () {
    slideOffsetTops = [0];
    var topFirst = slideItems[0].getBoundingClientRect().top, attr;
    for (var i = 1; i < slideCountNew; i++) {
      attr = slideItems[i].getBoundingClientRect().top;
      slideOffsetTops.push(attr - topFirst);
    }
  }

  // set snapInterval (for IE10)
  function setSnapInterval () {
    outerWrapper.style.msScrollSnapPointsX = 'snapInterval(0%, ' + (100 / items) + '%)';
  }

  // update slide
  function updateSlideStatus () {
    for (var i = slideCountNew; i--;) {
      var item = slideItems[i];
      // visible slides
      if (i >= index && i < index + items) {
        if (hasAttr(item, 'tabindex')) {
          setAttrs(item, {'aria-hidden': 'false'});
          removeAttrs(item, ['tabindex']);
          addClass(item, slideActiveClass);
        }
      // hidden slides
      } else {
        if (!hasAttr(item, 'tabindex')) {
          setAttrs(item, {
            'aria-hidden': 'true',
            'tabindex': '-1'
          });
        }
        if (hasClass(item, slideActiveClass)) {
          removeClass(item, slideActiveClass);
        }
      }
    }
  }

  // set tabindex & aria-selected on Nav
  function updateNavStatus () {
    // get current nav
    if (nav) {
      navCurrentIndex = navClicked !== -1 ? navClicked : index%slideCount;
      navClicked = -1;

      if (navCurrentIndex !== navCurrentIndexCached) {
        var navPrev = navItems[navCurrentIndexCached],
            navCurrent = navItems[navCurrentIndex];

        setAttrs(navPrev, {
          'tabindex': '-1',
          'aria-selected': 'false'
        });
        setAttrs(navCurrent, {
          'tabindex': '0',
          'aria-selected': 'true'
        });
        removeClass(navPrev, navActiveClass);
        addClass(navCurrent, navActiveClass);

        // if (navAnimationOut) {
        //   removeClass(navPrev, navAnimationIn);
        //   addClass(navPrev, navAnimationOut);
        // }
        // if (navAnimationIn) {
        //   removeClass(navCurrent, navAnimationOut);
        //   addClass(navCurrent, navAnimationIn);
        // }
      }
    }
  }

  function isButton (el) {
    return el.nodeName.toLowerCase() === 'button';
  }

  function isAriaDisabled (el) {
    return el.getAttribute('aria-disabled') === 'true';
  }

  function disEnableElement (isButton, el, val) {
    if (isButton) {
      el.disabled = val;
    } else {
      el.setAttribute('aria-disabled', val.toString());
    }
  }

  // set 'disabled' to true on controls when reach the edges
  function updateControlsStatus () {
    if (!controls || loop) { return; }

    var prevDisabled = (prevIsButton) ? prevButton.disabled : isAriaDisabled(prevButton),
        nextDisabled = (nextIsButton) ? nextButton.disabled : isAriaDisabled(nextButton),
        disablePrev = (index === indexMin) ? true : false,
        disableNext = (!rewind && index === indexMax) ? true : false;

    if (disablePrev && !prevDisabled) {
      disEnableElement(prevIsButton, prevButton, true);
    }
    if (!disablePrev && prevDisabled) {
      disEnableElement(prevIsButton, prevButton, false);
    }
    if (disableNext && !nextDisabled) {
      disEnableElement(nextIsButton, nextButton, true);
    }
    if (!disableNext && nextDisabled) {
      disEnableElement(nextIsButton, nextButton, false);
    }
  }

  // set duration
  function setDurations (duration, target) {
    duration = !duration ? '' : duration / 1000 + 's';
    target = target || container;
    target.style[TRANSITIONDURATION] = duration;

    if (!carousel) {
      target.style[ANIMATIONDURATION] = duration;
    }
    if (!horizontal) {
      innerWrapper.style[TRANSITIONDURATION] = duration;
    }
  }

  function getContainerTransformValue () {
    var val;
    if (horizontal) {
      if (fixedWidth) {
        val = - (fixedWidth + gutter) * index + 'px';
      } else {
        var denominator = TRANSFORM ? slideCountNew : items;
        val = - index * 100 / denominator + '%';
      }
    } else {
      val = - slideOffsetTops[index] + 'px';
    }
    return val;
  }

  function doContainerTransform (val) {
    if (!val) { val = getContainerTransformValue(); }
    container.style[transformAttr] = transformPrefix + val + transformPostfix;
  }

  function animateSlide (number, classOut, classIn, isOut) {
    for (var i = number, l = number + items; i < l; i++) {
      var item = slideItems[i];

      // set item positions
      if (!isOut) { item.style.left = (i - index) * 100 / items + '%'; }

      if (TRANSITIONDURATION) { setDurations(speed, item); }
      if (animateDelay && TRANSITIONDELAY) {
        item.style[TRANSITIONDELAY] = item.style[ANIMATIONDELAY] = animateDelay * (i - number) / 1000 + 's';
      }
      removeClass(item, classOut);
      addClass(item, classIn);
      
      if (isOut) { slideItemsOut.push(item); }
    }
  }

  // make transfer after click/drag:
  // 1. change 'transform' property for mordern browsers
  // 2. change 'left' property for legacy browsers
  var transformCore = (function () {
    return carousel ?
      function (duration, distance) {
        if (!distance) { distance = getContainerTransformValue(); }
        
        // constrain the distance when non-loop no-edgePadding fixedWidth reaches the right edge
        if (hasRightDeadZone && index === indexMax) {
          distance = - ((fixedWidth + gutter) * slideCountNew - vpInner) + 'px';
        }

        if (TRANSITIONDURATION || !duration) {
          // for morden browsers with non-zero duration or 
          // zero duration for all browsers
          doContainerTransform(distance);
          // run fallback function manually 
          // when duration is 0 / container is hidden
          if (!duration || !isVisible(container)) { onTransitionEnd(); }

        } else {
          // for old browser with non-zero duration
          jsTransform(container, transformAttr, transformPrefix, transformPostfix, distance, speed, onTransitionEnd);
        }

        if (!horizontal) { updateContentWrapperHeight(); }
      } :
      function (duration) {
        slideItemsOut = [];

        var eve = {};
        eve[TRANSITIONEND] = eve[ANIMATIONEND] = onTransitionEnd;
        removeEvents(slideItems[indexCached], eve);
        addEvents(slideItems[index], eve);

        animateSlide(indexCached, animateIn, animateOut, true);
        animateSlide(index, animateNormal, animateIn);

        // run fallback function manually 
        // when transition or animation not supported / duration is 0
        if (!TRANSITIONEND || !ANIMATIONEND || !duration) { onTransitionEnd(); }
      };
  })();

  function doTransform (duration, distance) {
    // check duration is defined and is a number
    if (isNaN(duration)) { duration = speed; }
    // if container is hidden, set duration to 0
    if (!isVisible(container)) { duration = 0; }
    
    if (TRANSITIONDURATION) { setDurations(duration); }
    transformCore(duration, distance);
  }

  function render (e, sliderMoved) {
    if (updateIndexBeforeTransform) { updateIndex(); }

    // render when slider was moved (touch or drag) even though index may not change
    if (index !== indexCached || sliderMoved) {
      // events
      events.emit('indexChanged', info());
      events.emit('transitionStart', info());

      // pause autoplay when click or keydown from user
      if (animating && e && ['click', 'keydown'].indexOf(e.type) >= 0) { stopAutoplay(); }

      running = true;
      doTransform();
    }

  }

  /*
   * Transfer prefixed properties to the same format
   * CSS: -Webkit-Transform => webkittransform
   * JS: WebkitTransform => webkittransform
   * @param {string} str - property
   *
   */
  function strTrans (str) {
    return str.toLowerCase().replace(/-/g, '');
  }

  // AFTER TRANSFORM
  // Things need to be done after a transfer:
  // 1. check index
  // 2. add classes to visible slide
  // 3. disable controls buttons when reach the first/last slide in non-loop slider
  // 4. update nav status
  // 5. lazyload images
  // 6. update container height
  function onTransitionEnd (event) {
    // check running on gallery mode
    // make sure trantionend/animationend events run only once
    if (carousel || running) {
      events.emit('transitionEnd', info(event));

      if (!carousel && slideItemsOut.length > 0) {
        for (var i = 0; i < items; i++) {
          var item = slideItemsOut[i];
          // set item positions
          item.style.left = '';

          if (TRANSITIONDURATION) { setDurations(0, item); }
          if (animateDelay && TRANSITIONDELAY) { 
            item.style[TRANSITIONDELAY] = item.style[ANIMATIONDELAY] = '';
          }
          removeClass(item, animateOut);
          addClass(item, animateNormal);
        }
      }

      /* update slides, nav, controls after checking ...
       * => legacy browsers who don't support 'event' 
       *    have to check event first, otherwise event.target will cause an error 
       * => or 'gallery' mode: 
       *   + event target is slide item
       * => or 'carousel' mode: 
       *   + event target is container, 
       *   + event.property is the same with transform attribute
       */
      if (!event || 
          !carousel && event.target.parentNode === container || 
          event.target === container && strTrans(event.propertyName) === strTrans(transformAttr)) {

        if (!updateIndexBeforeTransform) { 
          var indexTem = index;
          updateIndex();
          if (index !== indexTem) { 
            events.emit('indexChanged', info());

            if (TRANSITIONDURATION) { setDurations(0); }
            doContainerTransform();
          }
        } 

        runAutoHeight();

        if (nested === 'inner') { events.emit('innerLoaded', info()); }
        running = false;
        navCurrentIndexCached = navCurrentIndex;
        indexCached = index;
      }
    }

  }

  // # ACTIONS
  function goTo (targetIndex, e) {
    if (freeze) { return; }

    // prev slideBy
    if (targetIndex === 'prev') {
      onControlsClick(e, -1);

    // next slideBy
    } else if (targetIndex === 'next') {
      onControlsClick(e, 1);

    // go to exact slide
    } else if (!running) {
      var absIndex = index%slideCount, 
          indexGap = 0;
      if (absIndex < 0) { absIndex += slideCount; }

      if (targetIndex === 'first') {
        indexGap = - absIndex;
      } else if (targetIndex === 'last') {
        indexGap = slideCount - items - absIndex;
      } else {
        if (typeof targetIndex !== 'number') { targetIndex = parseInt(targetIndex); }
        if (!isNaN(targetIndex)) {
          var absTargetIndex = targetIndex%slideCount;
          if (absTargetIndex < 0) { absTargetIndex += slideCount; }
          indexGap = absTargetIndex - absIndex;
        }
      }

      index += indexGap;

      // if index is changed, start rendering
      if (index%slideCount !== indexCached%slideCount) {
        render(e);
      }

    }
  }

  // on controls click
  function onControlsClick (e, dir) {
    if (!running) {
      var passEventObject;

      if (!dir) {
        e = e || win.event;
        var target = e.target || e.srcElement;

        while (target !== controlsContainer && [prevButton, nextButton].indexOf(target) < 0) { target = target.parentNode; }

        var targetIn = [prevButton, nextButton].indexOf(target);
        if (targetIn >= 0) {
          passEventObject = true;
          dir = targetIn === 0 ? -1 : 1;
        }
      }

      if (dir === -1) {
        index -= slideBy;
      } else if (dir === 1) {
        // Go to the first if reach the end in rewind mode
        // Otherwise go to the next
        if (rewind && index === indexMax){
          goTo(0, e);
          return;
        } else {
          index += slideBy;
        }
      }

      // pass e when click control buttons or keydown
      render(passEventObject || e && e.type === 'keydown' ? e : null);
    }
  }

  // on nav click
  function onNavClick (e) {
    if (!running) {
      e = e || win.event;
      var target = e.target || e.srcElement,
          navIndex;

      // find the clicked nav item
      while (target !== navContainer && !hasAttr(target, 'data-nav')) { target = target.parentNode; }
      if (hasAttr(target, 'data-nav')) {
        navIndex = navClicked = [].indexOf.call(navItems, target);
        goTo(navIndex, e);
      }
    }
  }

  // autoplay functions
  function setAutoplayTimer () {
    autoplayTimer = setInterval(function () {
      onControlsClick(null, autoplayDirection);
    }, autoplayTimeout);

    animating = true;
  }

  function stopAutoplayTimer () {
    clearInterval(autoplayTimer);
    animating = false;
  }

  function updateAutoplayButton (action, txt) {
    setAttrs(autoplayButton, {'data-action': action});
    autoplayButton.innerHTML = autoplayHtmlStrings[0] + action + autoplayHtmlStrings[1] + txt;
  }

  function startAutoplay () {
    setAutoplayTimer();
    if (autoplayButton) { updateAutoplayButton('stop', autoplayText[1]); }
  }

  function stopAutoplay () {
    stopAutoplayTimer();
    if (autoplayButton) { updateAutoplayButton('start', autoplayText[0]); }
  }

  function toggleAnimation () {
    animating ? stopAutoplay() : startAutoplay();
  }

  function onVisibilityChange () {
    if (doc.hidden) {
      if (animating) {
        stopAutoplayTimer();
        autoplayVisibilityPaused = true;
      }
    } else if (autoplayVisibilityPaused) {
      setAutoplayTimer();
      autoplayVisibilityPaused = false;
    }
  }

  function mouseoverPause () {
    if (animating) { 
      stopAutoplayTimer();
      autoplayHoverPaused = true;
    }
  }

  function mouseoutRestart () {
    if (autoplayHoverPaused) { 
      setAutoplayTimer();
      autoplayHoverPaused = false;
    }
  }

  // keydown events on document 
  function onDocumentKeydown (e) {
    e = e || win.event;
    switch(e.keyCode) {
      case KEYS.LEFT:
        onControlsClick(e, -1);
        break;
      case KEYS.RIGHT:
        onControlsClick(e, 1);
    }
  }

  // on key control
  function onControlsKeydown (e) {
    e = e || win.event;
    var code = e.keyCode;

    switch (code) {
      case KEYS.LEFT:
      case KEYS.UP:
      case KEYS.PAGEUP:
          if (!prevButton.disabled) {
            onControlsClick(e, -1);
          }
          break;
      case KEYS.RIGHT:
      case KEYS.DOWN:
      case KEYS.PAGEDOWN:
          if (!nextButton.disabled) {
            onControlsClick(e, 1);
          }
          break;
      case KEYS.HOME:
        goTo(0, e);
        break;
      case KEYS.END:
        goTo(slideCount - 1, e);
        break;
    }
  }

  // set focus
  function setFocus (focus) {
    focus.focus();
  }

  // on key nav
  function onNavKeydown (e) {
    var curElement = doc.activeElement;
    if (!hasAttr(curElement, 'data-nav')) { return; }

    e = e || win.event;
    var code = e.keyCode,
        navIndex = [].indexOf.call(navItems, curElement),
        len = visibleNavIndexes.length,
        current = visibleNavIndexes.indexOf(navIndex);

    if (options.navContainer) {
      len = slideCount;
      current = navIndex;
    }

    function getNavIndex (num) {
      return options.navContainer ? num : visibleNavIndexes[num];
    }

    switch(code) {
      case KEYS.LEFT:
      case KEYS.PAGEUP:
        if (current > 0) { setFocus(navItems[getNavIndex(current - 1)]); }
        break;

      case KEYS.UP:
      case KEYS.HOME:
        if (current > 0) { setFocus(navItems[getNavIndex(0)]); }
        break;

      case KEYS.RIGHT:
      case KEYS.PAGEDOWN:
        if (current < len - 1) { setFocus(navItems[getNavIndex(current + 1)]); }
        break;

      case KEYS.DOWN:
      case KEYS.END:
        if (current < len - 1) { setFocus(navItems[getNavIndex(len - 1)]); }
        break;

      // Can't use onNavClick here,
      // Because onNavClick require event.target as nav items
      case KEYS.ENTER:
      case KEYS.SPACE:
        navClicked = navIndex;
        goTo(navIndex, e);
        break;
    }
  }

  // IE10 scroll function
  function ie10Scroll () {
    doTransform(0, container.scrollLeft());
    indexCached = index;
  }

  function getTarget (e) {
    return e.target || e.srcElement;
  }

  function isTouchEvent (e) {
    return e.type.indexOf('touch') >= 0;
  }

  function preventDefaultBehavior (e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
  }

  function onTouchOrMouseStart (e) {
    // reset 
    moveDirectionExpected = 0;
    touchedOrDraged = false;
    startX = startY = null;

    if (!running) {
      e = e || win.event;
      var ev; 

      if (isTouchEvent(e)) {
        ev = e.changedTouches[0];
        events.emit('touchStart', info(e));
      } else {
        ev = e;
        preventDefaultBehavior(e);
        events.emit('dragStart', info(e));
      }

      startX = parseInt(ev.clientX);
      startY = parseInt(ev.clientY);
      translateInit = parseFloat(container.style[transformAttr].replace(transformPrefix, '').replace(transformPostfix, ''));
    }
  }

  function onTouchOrMouseMove (e) {
    // make sure touch started or mouse draged
    if (!running && startX !== null) {
      e = e || win.event;
      var ev;

      if (isTouchEvent(e)) {
        ev = e.changedTouches[0];
      } else {
        ev = e;
        preventDefaultBehavior(e);
      }

      disX = parseInt(ev.clientX) - startX;
      disY = parseInt(ev.clientY) - startY;

      if (moveDirectionExpected === 0) {
        moveDirectionExpected = getTouchDirection(toDegree(disY, disX), 15) === options.axis;
      }

      if (moveDirectionExpected) {
        if (isTouchEvent(e)) {
          events.emit('touchMove', info(e));
        } else {
          // "mousemove" event after "mousedown" indecate 
          // it is "drag", not "click"
          if (!isDragEvent) { isDragEvent = true; }
          events.emit('dragMove', info(e));
        }
        if (!touchedOrDraged) { touchedOrDraged = true; }

        var x = translateInit;
        if (horizontal) {
          if (fixedWidth) {
            x += disX;
            x += 'px';
          } else {
            var percentageX = TRANSFORM ? disX * items * 100 / (vpInner * slideCountNew): disX * 100 / vpInner;
            x += percentageX;
            x += '%';
          }
        } else {
          x += disY;
          x += 'px';
        }

        if (TRANSFORM) { setDurations(0); }
        container.style[transformAttr] = transformPrefix + x + transformPostfix;
      }
    }
  }

  function onTouchOrMouseEnd (e) {
    if (!running && touchedOrDraged) {
      e = e || win.event;
      var ev;

      if (isTouchEvent(e)) {
        ev = e.changedTouches[0];
        events.emit('touchEnd', info(e));
      } else {
        ev = e;
        events.emit('dragEnd', info(e));
      }

      disX = parseInt(ev.clientX) - startX;
      disY = parseInt(ev.clientY) - startY;
      var sliderMoved = Boolean(horizontal ? disX : disY);

      // reset 
      moveDirectionExpected = 0;
      touchedOrDraged = false;
      startX = startY = null;

      if (horizontal) {
        var indexMoved = - disX * items / vpInner;
        indexMoved = disX > 0 ? Math.floor(indexMoved) : Math.ceil(indexMoved);
        index += indexMoved;
      } else {
        var moved = - (translateInit + disY);
        if (moved <= 0) {
          index = indexMin;
        } else if (moved >= slideOffsetTops[slideOffsetTops.length - 1]) {
          index = indexMax;
        } else {
          var i = 0;
          do {
            i++;
            index = disY < 0 ? i + 1 : i;
          } while (i < slideCountNew && moved >= slideOffsetTops[i + 1]);
        }
      }
      
      render(e, sliderMoved);

      // drag vs click
      if (isDragEvent) { 
        // reset isDragEvent
        isDragEvent = false;

        // prevent "click"
        var target = getTarget(e);
        addEvents(target, {'click': function preventClick (e) {
          preventDefaultBehavior(e);
          removeEvents(target, {'click': preventClick});
        }}); 
      } 
    }
  }

  // === RESIZE FUNCTIONS === //
  // (slideOffsetTops, index, items) => vertical_conentWrapper.height
  function updateContentWrapperHeight () {
    innerWrapper.style.height = slideOffsetTops[index + items] - slideOffsetTops[index] + 'px';
  }

  /*
   * get nav item indexes per items
   * add 1 more if the nav items cann't cover all slides
   * [0, 1, 2, 3, 4] / 3 => [0, 3]
   */
  function getVisibleNavIndex () {
    // reset visibleNavIndexes
    visibleNavIndexes = [];

    var absIndexMin = index%slideCount%items;
    while (absIndexMin < slideCount) {
      if (!loop && absIndexMin + items > slideCount) { absIndexMin = slideCount - items; }
      visibleNavIndexes.push(absIndexMin);
      absIndexMin += items;
    }

    // nav count * items < slide count means
    // some slides can not be displayed only by nav clicking
    if (loop && visibleNavIndexes.length * items < slideCount ||
        !loop && visibleNavIndexes[0] > 0) {
      visibleNavIndexes.unshift(0);
    }
  }
  
  /*
   * 1. update visible nav items list
   * 2. add "hidden" attributes to previous visible nav items
   * 3. remove "hidden" attrubutes to new visible nav items
   */
  function updateNavVisibility () {
    if (!nav || options.navContainer) { return; }

    // update nav visibility when visibleNavIndexes doesn't contain current index
    if (visibleNavIndexes.indexOf(index%slideCount) < 0) {
      // update visible nav indexes
      getVisibleNavIndex();

      if (visibleNavIndexes !== visibleNavIndexesCached) {
        // add 'hidden' attribute to previous visible navs
        if (visibleNavIndexesCached.length > 0) {
          visibleNavIndexesCached.forEach(function (ind) {
            hideElement(navItems[ind]);
          });
        }

        // remove 'hidden' attribute from visible navs
        if (visibleNavIndexes.length > 0) {
          visibleNavIndexes.forEach(function (ind) {
            showElement(navItems[ind]);
          });
        }

        // cache visible nav indexes
        visibleNavIndexesCached = visibleNavIndexes;
      }
    }
  }

  function info (e) {
    return {
      container: container,
      slideItems: slideItems,
      navContainer: navContainer,
      navItems: navItems,
      controlsContainer: controlsContainer,
      hasControls: hasControls,
      prevButton: prevButton,
      nextButton: nextButton,
      items: items,
      slideBy: slideBy,
      cloneCount: cloneCount,
      slideCount: slideCount,
      slideCountNew: slideCountNew,
      index: index,
      indexCached: indexCached,
      navCurrentIndex: navCurrentIndex,
      navCurrentIndexCached: navCurrentIndexCached,
      visibleNavIndexes: visibleNavIndexes,
      visibleNavIndexesCached: visibleNavIndexesCached,
      event: e || {},
    };
  }

  return {
    getInfo: info,
    events: events,
    goTo: goTo,

    destroy: function () {
      // sheet
      sheet.disabled = true;

      // cloned items
      if (loop) {
        for (var j = cloneCount; j--;) {
          if (carousel) { slideItems[0].remove(); }
          slideItems[slideItems.length - 1].remove();
        }
      }

      // Slide Items
      var slideClasses = ['tns-item', slideActiveClass];
      if (!carousel) { slideClasses = slideClasses.concat('tns-normal', animateIn); }

      for (var i = slideCount; i--;) {
        var slide = slideItems[i];
        if (slide.id.indexOf(slideId + '-item') >= 0) { slide.id = ''; }

        slideClasses.forEach(function(cl) { removeClass(slide, cl); });
      }
      removeAttrs(slideItems, ['style', 'aria-hidden', 'tabindex']);
      slideItems = slideId = slideCount = slideCountNew = cloneCount = null;

      // controls
      if (controls) {
        removeEvents(controlsContainer, controlsEvents);
        if (options.controlsContainer) {
          removeAttrs(controlsContainer, ['aria-label', 'tabindex']);
          removeAttrs(controlsContainer.children, ['aria-controls', 'aria-disabled', 'tabindex']);
        }
        controlsContainer = prevButton = nextButton = null;
      }

      // nav
      if (nav) {
        removeEvents(navContainer, navEvents);
        if (options.navContainer) {
          removeAttrs(navContainer, ['aria-label']);
          removeAttrs(navItems, ['aria-selected', 'aria-controls', 'tabindex']);
        }
        navContainer = navItems = null;
      }

      // auto
      if (autoplay) {
        clearInterval(autoplayTimer);
        if (autoplayButton) {
          removeEvents(autoplayButton, {'click': toggleAnimation});
        }
        removeEvents(container, hoverEvents);
        removeEvents(container, visibilityEvent);
        if (options.autoplayButton) {
          removeAttrs(autoplayButton, ['data-action']);
        }
      }

      // container
      container.id = containerIdCached || '';
      container.className = container.className.replace(classContainer, '');
      container.style = '';
      if (carousel && TRANSITIONEND) {
        var eve = {};
        eve[TRANSITIONEND] = onTransitionEnd;
        removeEvents(container, eve);
      }
      removeEvents(container, touchEvents);
      removeEvents(container, dragEvents);

      // outerWrapper
      containerParent.insertBefore(container, outerWrapper);
      outerWrapper.remove();
      outerWrapper = innerWrapper = container = null;

      // remove arrowKeys eventlistener
      removeEvents(doc, docmentKeydownEvent);

      // remove win event listeners
      removeEvents(win, {'resize': onResize});
    }
  };
};

return tns;
})();