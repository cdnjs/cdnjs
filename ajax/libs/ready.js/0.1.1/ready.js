;(function() {
  'use strict';

  var ready;

  ready = function(selector, callback) {
    // get a list of elements that the callback depends on
    var elements = document.querySelectorAll(selector);

    // if we have the elements we fire the callbacks and pass the element
    // as an argument
    if (elements.length) {
      for(var i = 0; i < elements.length; i++) {
        callback(elements[i]);
      }
    }
  };

  // expose ready
  window.ready = ready;
})();
