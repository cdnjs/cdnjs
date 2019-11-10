(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.sentinel = factory();
  }
}(this, function() {
var selectorToAnimationMap = {},
    animationCallbacks = {},
    styleEl,
    styleSheet,
    isInitialized;


/**
 * Initialize animation event listeners
 */
function init() {
  var doc = document,
      head = doc.head,
      events = ['animationstart', 'mozAnimationStart', 'webkitAnimationStart'];

  // add animationstart event listener
  events.map(function(event) {
    doc.addEventListener(event, animationStartHandler, true);
  });

  // add stylesheet to document
  styleEl = doc.createElement('style');
  styleEl.id = 'sentineljs';
  head.insertBefore(styleEl, head.firstChild);
  styleSheet = styleEl.sheet;

  // set flag
  isInitialized = true;
}


/**
 * Add watcher.
 * @param {array} cssSelectors - List of CSS selector strings
 * @param {Function} callback - The callback function
 */
function onFn(cssSelectors, callback, extraAnimations) {
  if (!callback) return;

  // initialize animationstart event listener
  if (!isInitialized) init();

  // listify argument
  cssSelectors = Array.isArray(cssSelectors) ? cssSelectors : [cssSelectors];

  // add css rules and cache callbacks
  cssSelectors.map(function(selector) {
    var animId = selectorToAnimationMap[selector];

    if (!animId) {
      // add new CSS listener
      var css, i;

      animId = 'sentinel-' + Math.random().toString(16).slice(2);

      // add keyframe rule
      css = '@keyframes ' + animId +
        '{from{transform:none;}to{transform:none;}}';
      i = styleSheet.cssRules.length;
      styleSheet.insertRule(css, i);
      styleSheet.cssRules[i]._id = selector;

      // add selector animation rule
      css = selector + '{animation-duration:0.0001s;animation-name:' + animId;
      if (extraAnimations) css += ',' + extraAnimations;
      css += ';}';
      i += 1;
      styleSheet.insertRule(css, i);
      styleSheet.cssRules[i]._id = selector;

      // add to map
      selectorToAnimationMap[selector] = animId;
    }

    // add to callbacks
    var x = animationCallbacks[animId] = animationCallbacks[animId] || [];
    x.push(callback);
  });
}


/**
 * Remove watcher.
 * @param {array} cssSelectors - List of CSS selector strings
 * @param {Function} callback - The callback function (optional)
 */
function offFn(cssSelectors, callback) {
  // listify argument
  cssSelectors = Array.isArray(cssSelectors) ? cssSelectors : [cssSelectors];

  // iterate through rules
  cssSelectors.map(function(selector) {
    // get animId
    var animId = selectorToAnimationMap[selector];

    if (!animId) return;

    // get callbacks
    var callbackList = animationCallbacks[animId],
        i;

    // remove callback from list
    if (callback) {
      i = callbackList.length;

      while (i--) {
        if (callbackList[i] === callback) callbackList.splice(i, 1);
      }
    } else {
      callbackList = [];
    }

    // exit if callbacks still exist
    if (callbackList.length) return;

    // clear cache and remove css rules
    var cssRules = styleSheet.cssRules;
    i = cssRules.length;

    while (i--) {
      if (cssRules[i]._id == selector) styleSheet.deleteRule(i);
    }

    delete selectorToAnimationMap[selector];
    delete animationCallbacks[animId];
  });
}


/**
 * Reset watchers and cache
 */
function resetFn() {
  selectorToAnimationMap = {};
  animationCallbacks = {};
  isInitialized = false;
  var p = styleEl.parentNode;
  if (p) p.removeChild(styleEl);
}


/**
 * Animation start handler
 * @param {Event} ev - The DOM event
 */
function animationStartHandler(ev) {
  var callbacks = animationCallbacks[ev.animationName];
  
  // exit if callbacks haven't been registered
  if (!callbacks) return;

  // stop other callbacks from firing
  ev.stopImmediatePropagation();

  // iterate through callbacks
  var l = callbacks.length;
  for (var i=0; i < l; i++) callbacks[i](ev.target);
}


// return singleton object
return {
  on: onFn,
  off: offFn,
  reset: resetFn
};

}));
