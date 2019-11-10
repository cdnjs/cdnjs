(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Gotem = factory());
}(this, (function () { 'use strict';

var gotem = function gotem(trigger, target) {
  var cbs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  // throw if no target node or no trigger node
  if (target.nodeType !== window.Node.ELEMENT_NODE || target.nodeType !== window.Node.ELEMENT_NODE) {
    throw new Error('gotem: trigger and target nodes are required.');
  }

  var handle = function handle(event) {
    // prevent default link behavior
    // note that tagName returns in uppercase
    if (trigger.tagName === 'A') {
      event.preventDefault();
    }

    // create range, and select target node contents
    var range = document.createRange();
    range.selectNodeContents(target);

    // remove existing selections, then add the new one
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // execute the copy command
    var executed = document.execCommand('copy');

    // based on if the command executed
    // check if the appropriate callback exists, and if it does, call it
    if (executed) {
      cbs.success && cbs.success();
    } else {
      cbs.error && cbs.error();
    }
  };

  // bind the click handler to the trigger node
  trigger.addEventListener('click', handle);
};

return gotem;

})));
