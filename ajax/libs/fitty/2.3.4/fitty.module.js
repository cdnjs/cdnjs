/**
 * fitty v2.3.4 - Snugly resizes text to fit its parent container
 * Copyright (c) 2021 Rik Schennink <rik@pqina.nl> (https://pqina.nl/)
 */

var fitty = (function (w) {
  // no window, early exit
  if (!w) return; // node list to array helper method

  var toArray = function toArray(nl) {
    return [].slice.call(nl);
  }; // states


  var DrawState = {
    IDLE: 0,
    DIRTY_CONTENT: 1,
    DIRTY_LAYOUT: 2,
    DIRTY: 3
  }; // all active fitty elements

  var fitties = []; // group all redraw calls till next frame, we cancel each frame request when a new one comes in. If no support for request animation frame, this is an empty function and supports for fitty stops.

  var redrawFrame = null;
  var requestRedraw = 'requestAnimationFrame' in w ? function () {
    w.cancelAnimationFrame(redrawFrame);
    redrawFrame = w.requestAnimationFrame(function () {
      return redraw(fitties.filter(function (f) {
        return f.dirty && f.active;
      }));
    });
  } : function () {}; // sets all fitties to dirty so they are redrawn on the next redraw loop, then calls redraw

  var redrawAll = function redrawAll(type) {
    return function () {
      fitties.forEach(function (f) {
        return f.dirty = type;
      });
      requestRedraw();
    };
  }; // redraws fitties so they nicely fit their parent container


  var redraw = function redraw(fitties) {
    // getting info from the DOM at this point should not trigger a reflow, let's gather as much intel as possible before triggering a reflow
    // check if styles of all fitties have been computed
    fitties.filter(function (f) {
      return !f.styleComputed;
    }).forEach(function (f) {
      f.styleComputed = computeStyle(f);
    }); // restyle elements that require pre-styling, this triggers a reflow, please try to prevent by adding CSS rules (see docs)

    fitties.filter(shouldPreStyle).forEach(applyStyle); // we now determine which fitties should be redrawn

    var fittiesToRedraw = fitties.filter(shouldRedraw); // we calculate final styles for these fitties

    fittiesToRedraw.forEach(calculateStyles); // now we apply the calculated styles from our previous loop

    fittiesToRedraw.forEach(function (f) {
      applyStyle(f);
      markAsClean(f);
    }); // now we dispatch events for all restyled fitties

    fittiesToRedraw.forEach(dispatchFitEvent);
  };

  var markAsClean = function markAsClean(f) {
    return f.dirty = DrawState.IDLE;
  };

  var calculateStyles = function calculateStyles(f) {
    // get available width from parent node
    f.availableWidth = f.element.parentNode.clientWidth; // the space our target element uses

    f.currentWidth = f.element.scrollWidth; // remember current font size

    f.previousFontSize = f.currentFontSize; // let's calculate the new font size

    f.currentFontSize = Math.min(Math.max(f.minSize, f.availableWidth / f.currentWidth * f.previousFontSize), f.maxSize); // if allows wrapping, only wrap when at minimum font size (otherwise would break container)

    f.whiteSpace = f.multiLine && f.currentFontSize === f.minSize ? 'normal' : 'nowrap';
  }; // should always redraw if is not dirty layout, if is dirty layout, only redraw if size has changed


  var shouldRedraw = function shouldRedraw(f) {
    return f.dirty !== DrawState.DIRTY_LAYOUT || f.dirty === DrawState.DIRTY_LAYOUT && f.element.parentNode.clientWidth !== f.availableWidth;
  }; // every fitty element is tested for invalid styles


  var computeStyle = function computeStyle(f) {
    // get style properties
    var style = w.getComputedStyle(f.element, null); // get current font size in pixels (if we already calculated it, use the calculated version)

    f.currentFontSize = parseFloat(style.getPropertyValue('font-size')); // get display type and wrap mode

    f.display = style.getPropertyValue('display');
    f.whiteSpace = style.getPropertyValue('white-space'); // styles computed

    return true;
  }; // determines if this fitty requires initial styling, can be prevented by applying correct styles through CSS


  var shouldPreStyle = function shouldPreStyle(f) {
    var preStyle = false; // if we already tested for prestyling we don't have to do it again

    if (f.preStyleTestCompleted) return false; // should have an inline style, if not, apply

    if (!/inline-/.test(f.display)) {
      preStyle = true;
      f.display = 'inline-block';
    } // to correctly calculate dimensions the element should have whiteSpace set to nowrap


    if (f.whiteSpace !== 'nowrap') {
      preStyle = true;
      f.whiteSpace = 'nowrap';
    } // we don't have to do this twice


    f.preStyleTestCompleted = true;
    return preStyle;
  }; // apply styles to single fitty


  var applyStyle = function applyStyle(f) {
    f.element.style.whiteSpace = f.whiteSpace;
    f.element.style.display = f.display;
    f.element.style.fontSize = f.currentFontSize + 'px';
  }; // dispatch a fit event on a fitty


  var dispatchFitEvent = function dispatchFitEvent(f) {
    f.element.dispatchEvent(new CustomEvent('fit', {
      detail: {
        oldValue: f.previousFontSize,
        newValue: f.currentFontSize,
        scaleFactor: f.currentFontSize / f.previousFontSize
      }
    }));
  }; // fit method, marks the fitty as dirty and requests a redraw (this will also redraw any other fitty marked as dirty)


  var fit = function fit(f, type) {
    return function () {
      f.dirty = type;
      if (!f.active) return;
      requestRedraw();
    };
  };

  var init = function init(f) {
    // save some of the original CSS properties before we change them
    f.originalStyle = {
      whiteSpace: f.element.style.whiteSpace,
      display: f.element.style.display,
      fontSize: f.element.style.fontSize
    }; // should we observe DOM mutations

    observeMutations(f); // this is a new fitty so we need to validate if it's styles are in order

    f.newbie = true; // because it's a new fitty it should also be dirty, we want it to redraw on the first loop

    f.dirty = true; // we want to be able to update this fitty

    fitties.push(f);
  };

  var destroy = function destroy(f) {
    return function () {
      // remove from fitties array
      fitties = fitties.filter(function (_) {
        return _.element !== f.element;
      }); // stop observing DOM

      if (f.observeMutations) f.observer.disconnect(); // reset the CSS properties we changes

      f.element.style.whiteSpace = f.originalStyle.whiteSpace;
      f.element.style.display = f.originalStyle.display;
      f.element.style.fontSize = f.originalStyle.fontSize;
    };
  }; // add a new fitty, does not redraw said fitty


  var subscribe = function subscribe(f) {
    return function () {
      if (f.active) return;
      f.active = true;
      requestRedraw();
    };
  }; // remove an existing fitty


  var unsubscribe = function unsubscribe(f) {
    return function () {
      return f.active = false;
    };
  };

  var observeMutations = function observeMutations(f) {
    // no observing?
    if (!f.observeMutations) return; // start observing mutations

    f.observer = new MutationObserver(fit(f, DrawState.DIRTY_CONTENT)); // start observing

    f.observer.observe(f.element, f.observeMutations);
  }; // default mutation observer settings


  var mutationObserverDefaultSetting = {
    subtree: true,
    childList: true,
    characterData: true
  }; // default fitty options

  var defaultOptions = {
    minSize: 16,
    maxSize: 512,
    multiLine: true,
    observeMutations: 'MutationObserver' in w ? mutationObserverDefaultSetting : false
  }; // array of elements in, fitty instances out

  function fittyCreate(elements, options) {
    // set options object
    var fittyOptions = Object.assign({}, // expand default options
    defaultOptions, // override with custom options
    options); // create fitties

    var publicFitties = elements.map(function (element) {
      // create fitty instance
      var f = Object.assign({}, fittyOptions, {
        // internal options for this fitty
        element: element,
        active: true
      }); // initialise this fitty

      init(f); // expose API

      return {
        element: element,
        fit: fit(f, DrawState.DIRTY),
        unfreeze: subscribe(f),
        freeze: unsubscribe(f),
        unsubscribe: destroy(f)
      };
    }); // call redraw on newly initiated fitties

    requestRedraw(); // expose fitties

    return publicFitties;
  } // fitty creation function


  function fitty(target) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    // if target is a string
    return typeof target === 'string' ? // treat it as a querySelector
    fittyCreate(toArray(document.querySelectorAll(target)), options) : // create single fitty
    fittyCreate([target], options)[0];
  } // handles viewport changes, redraws all fitties, but only does so after a timeout


  var resizeDebounce = null;

  var onWindowResized = function onWindowResized() {
    w.clearTimeout(resizeDebounce);
    resizeDebounce = w.setTimeout(redrawAll(DrawState.DIRTY_LAYOUT), fitty.observeWindowDelay);
  }; // define observe window property, so when we set it to true or false events are automatically added and removed


  var events = ['resize', 'orientationchange'];
  Object.defineProperty(fitty, 'observeWindow', {
    set: function set(enabled) {
      var method = "".concat(enabled ? 'add' : 'remove', "EventListener");
      events.forEach(function (e) {
        w[method](e, onWindowResized);
      });
    }
  }); // fitty global properties (by setting observeWindow to true the events above get added)

  fitty.observeWindow = true;
  fitty.observeWindowDelay = 100; // public fit all method, will force redraw no matter what

  fitty.fitAll = redrawAll(DrawState.DIRTY); // export our fitty function, we don't want to keep it to our selves

  return fitty;
})(typeof window === 'undefined' ? null : window);

export default fitty;
