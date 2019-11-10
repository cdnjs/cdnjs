(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function() {
      return (root.holmes = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.holmes = factory();
  }
})(this, function() {
  // UMD Definition above, do not remove this line

  // To get to know more about the Universal Module Definition
  // visit: https://github.com/umdjs/umd

  'use strict';

  /**
   * search for dom elements on your page
   * @param  {object} options
   * options: {
   *  input: 'input[type=search]',
   *  find: '.results article',
   *  parents: 0
   *}
   */
  var holmes = function(options) {
    window.addEventListener('DOMContentLoaded',function(){
      options.parents = options.parents || 0;
      options.input = options.input || 'input[type=search]';
      var search = document.querySelector(options.input);
      var elements = document.querySelectorAll(options.find);

      search.addEventListener('input',function(){
        for (var i = 0; i < elements.length; i++) {
          var searchString = search.value.toLowerCase();
          if (elements[i].textContent.toLowerCase().indexOf(searchString) === -1) {
            elements[i].classList.add('hidden');
          } else {
            elements[i].classList.remove('hidden');
          }
        };
      });
    });
  };

  return holmes;

});
