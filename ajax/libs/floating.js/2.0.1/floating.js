/**
 * Float a number of things up on a page (hearts, flowers, 👌 ...)
 * @param {object}  options  all of the options are in an object
 * ---
 * @param {string}  content  the character or string to float
 * @param {int}     number   the number of items
 * @param {int}     duration the amount of seconds it takes to float up (default 10s)
 * @param {int}     repeat   the number of times you want the animation to repeat (default: 'infinite')
 * @author Haroen Viaene <hello@haroen.me>
 */
(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function() {
      return (root.floating = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.floating = factory();
  }
})(this, function() {
  // UMD Definition above, do not remove this line

  // To get to know more about the Universal Module Definition
  // visit: https://github.com/umdjs/umd

  'use strict';

  function floating(options) {
    options.content = options.content || '👌';
    options.number = options.number || 1;
    options.duration = options.duration || 10;
    options.repeat = options.repeat || 'infinite'; //@todo: remove from dom after animation

    var style = document.createElement('style');
    style.id = 'floating-style';
    if (!document.getElementById('floating-style')) {
      document.head.appendChild(style);
    };
    document.getElementById('floating-style').innerHTML =
`@keyframes float {
  0% {
    bottom: -2em;
    opacity: 0;
    visibility: hidden;
  }
  10% {
    opacity: 1;
    bottom: 0;
    visibility: visible;
  }
  100% {
    bottom: 100%;
  }
}

@keyframes move {
  0%,100% {
    left: -3em;
  }
  50% {
    left: 3em;
  }
}`;
    var container = document.createElement('div');
    container.classname = 'float-container';
    for (var i = 0; i < options.number; i++) {
      container.innerHTML += `<div style="position: absolute; font-size: 2em; left: 0; bottom: -2em; animation: float ${options.duration}s ease-in ${options.repeat}, move  3s ease-in-out infinite; transform: translateX(${Math.random()*100}vw); animation-delay: ${i+Math.random()}s;">${options.content}</div>`;
    }
    document.body.appendChild(container);
  }

  return floating;

});
