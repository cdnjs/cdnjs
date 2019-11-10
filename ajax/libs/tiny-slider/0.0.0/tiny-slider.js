/**
 * tiny-slider
 * @version 0.0.0
 * @author William Lin
 * @license The MIT License (MIT)
 * @todo lazyload
 **/

;(function (tinySliderJS) {
  window.tinySlider = tinySliderJS();
})(function () {
  'usr strict';

  var tiny = {}, tdProp = getSupportedProp(['transitionDuration', 'MozTransitionDuration', 'WebkitTransitionDuration']);

  function tinySlider(options) {
    var containers = (options.container.length === undefined) ? [options.container] : options.container;

    for (var i = 0; i < containers.length; i++) {
      var newOptions = options;
      newOptions.container = containers[i];
      var a = new tinySliderCore(newOptions);
    };
  }

  function tinySliderCore(options) {
    options = extend({ 
      container: document.querySelector('.slider'),
      items: 1,
      slideByPage: false,
      hasNav: true,
      navText: ['prev', 'next'],
      hasDots: true,
      keyboard: false,
      speed: 250,
      autoplay: false,
      autoplayTimeout: 5000,
      autoplayDirection: 'forward',
      loop: true,
      responsive: false,
    }, options || {});

    tiny.container = options.container;
    tiny.children = tiny.container.children;
    tiny.childrenLength = tiny.childrenUpdatedLength = options.childrenLength = tiny.children.length;
    tiny.hasNav = options.hasNav;
    tiny.navText = options.navText;
    tiny.hasDots = options.hasDots;
    tiny.keyboard = options.keyboard;
    tiny.autoplay = options.autoplay;
    tiny.autoplayTimeout = options.autoplayTimeout;
    tiny.autoplayDirection = (options.autoplayDirection === 'forward') ? 1 : -1;
    tiny.loop = options.loop;
    tiny.slideByPage = options.slideByPage;
    tiny.responsive = options.responsive; 

    tiny.bp = (tiny.responsive && typeof(tiny.responsive) === 'object') ? Object.keys(tiny.responsive) : false;
    tiny.vals = (tiny.responsive && typeof(tiny.responsive) === 'object') ? getMapValues(tiny.responsive, tiny.bp) : false;
    tiny.itemsMax = (tiny.vals.length !== undefined) ? Math.max.apply(Math, tiny.vals) : tiny.items;
    tiny.items = getItem (tiny.bp, tiny.vals, options.items);
    tiny.speed = (tiny.slideByPage) ? options.speed * tiny.items : options.speed;
    tiny.animating = false;
    tiny.index = 0;

    if (tiny.childrenLength >= tiny.itemsMax) {

      // on initialize
      this.init();

      // on window resize
      var updateIt;
      addEvent(window, 'resize', function () {
        clearTimeout(updateIt);
        updateIt = setTimeout(function () {
          // update after resize done
          tiny.items = getItem (tiny.bp, tiny.vals, options.items);
          tiny.speed = (tiny.slideByPage) ? options.speed * tiny.items : options.speed;
          tinySliderCore.prototype.updateContainer();
          tinySliderCore.prototype.updateDots();
          tinySliderCore.prototype.updateDotsStatus();
        }, 100);
      });

      // on nav click
      addEvent(tiny.next, 'click', function () { tinySliderCore.prototype.onNavClick(1); });
      addEvent(tiny.prev, 'click', function () { tinySliderCore.prototype.onNavClick(-1); });

      // on key down
      if (tiny.keyboard) {
        addEvent(document, 'keydown', function (e) {
          e = e || window.event;
          if (e.keyCode === 37) {
            tinySliderCore.prototype.onNavClick(-1);
          } else if (e.keyCode === 39) {
            tinySliderCore.prototype.onNavClick(1);
          }
        });
      }

      // on dot click
      for (var i = 0; i < tiny.dots.length; i++) {
        addEvent(tiny.dots[i], 'click', function (e) { 
          var index;
          for (var i = 0; i < tiny.dots.length; i++) {
            target = (e.currentTarget) ? e.currentTarget : e.srcElement;
            if (tiny.dots[i] === target) { index = i; }
          }
          tinySliderCore.prototype.onDotClick(index); 
        });
      };

      // autoplay
      if (tiny.autoplay) { 
        setInterval(function () {
          tinySliderCore.prototype.onNavClick(tiny.autoplayDirection);
        }, tiny.autoplayTimeout);
      }
    } else {
      throw new TypeError('items are not enough to show on 1 page');
    }
  }

  // *** prototype *** //
  tinySliderCore.prototype = {
    init: function () {
      addClass(tiny.container, 'tiny-content');

      // wrap slider with ".tiny-slider"
      var parent = tiny.container.parentNode,
      sibling = tiny.container.nextSibling;

      var div = document.createElement('div'),
      wrapper = div.cloneNode(true);
      wrapper.className = 'tiny-slider';
      wrapper.appendChild(tiny.container);

      if (sibling) {
        parent.insertBefore(wrapper, sibling);
      } else {
        parent.appendChild(wrapper);
      }

      // add dots
      if (tiny.hasDots) {
        var dots = div.cloneNode(true),
        dot = div.cloneNode(true);
        dots.className = 'tiny-dots';
        dot.className = 'tiny-dot';

        for (var i = tiny.childrenLength - 1; i >= 0; i--) {
          var dotClone = (i > 0) ? dot.cloneNode(true) : dot;
          dots.appendChild(dotClone);
        }
        wrapper.appendChild(dots);
        tiny.dots = dots.querySelectorAll('.tiny-dot');
      }

      // add nav
      if (tiny.hasNav) {
        var nav = div.cloneNode(true),
        prev = div.cloneNode(true),
        next = div.cloneNode(true);
        nav.className = 'tiny-nav';
        prev.className = 'tiny-prev';
        next.className = 'tiny-next';

        if (tiny.navText.length = 2) {
          prev.innerHTML = tiny.navText[0];
          next.innerHTML = tiny.navText[1];
        }
        nav.appendChild(prev);
        nav.appendChild(next);
        wrapper.appendChild(nav);

        tiny.prev = prev;
        tiny.next = next;
      }

      // clone items
      if (tiny.loop) {
        var before = [], after = [], first = tiny.container.children[0];

        for (var i = 0; i < tiny.itemsMax; i++) {
          var cloneFirst = tiny.children[i].cloneNode(true),
              cloneLast = tiny.children[tiny.children.length - 1 - i].cloneNode(true);

          before.push(cloneFirst);
          after.push(cloneLast);
        }

        for (var i = 0; i < before.length; i++) {
          tiny.container.appendChild(before[i]);
        }
        for (var i = after.length - 1; i >= 0; i--) {
          tiny.container.insertBefore(after[i], first);
        }

        tiny.childrenUpdatedLength = tiny.container.children.length;
        tiny.children = tiny.container.children;
      } 

      // calculate width
      for (var i = 0; i < tiny.childrenUpdatedLength; i++) {
        tiny.children[i].style.width = (100 / tiny.childrenUpdatedLength) + '%';
      }

      this.updateContainer();
      this.updateDots();
      this.updateDotsStatus();
    },

    updateContainer: function () {
      if (tiny.loop) {
        tiny.container.style.marginLeft = - (tiny.itemsMax * 100 / tiny.items) + '%';
      } else {
        tiny.index = Math.max(0, Math.min(tiny.index, tiny.childrenLength - tiny.items)); 
      }

      tiny.container.style.width = (tiny.childrenUpdatedLength * 100 / tiny.items) + '%';
      tiny.container.style.left = - (100 * tiny.index / tiny.items) + '%';
    },

    updateDots: function () {
      var dotCount = Math.ceil(tiny.childrenLength / tiny.items),
      dots = tiny.dots;
      for (var i = 0; i < dots.length; i++) {
        (i < dotCount) ? removeClass(dots[i], 'tiny-hide') : addClass(dots[i], 'tiny-hide');
      }
    },

    updateDotsStatus: function () {
      var current, absIndex = tiny.index, dots = tiny.dots,
      dotCount = Math.ceil(tiny.childrenLength / tiny.items);

      if (absIndex < 0) {
        absIndex += tiny.childrenLength;
      } else if (absIndex >= tiny.childrenLength) {
        absIndex -= tiny.childrenLength;
      }

      current = Math.floor(absIndex / tiny.items);
      // non-loop & reach the end
      if (!tiny.loop) {
        var re=/^-?[0-9]+$/, whole = re.test(tiny.childrenLength / tiny.items);
        if(!whole && tiny.index === tiny.childrenLength - tiny.items) {
          current += 1;
        }
      }

      for (var i = 0; i < dotCount; i++) {
        (i === current) ? addClass(dots[i], 'tiny-active') : removeClass(dots[i], 'tiny-active');
      }
    },

    onNavClick: function (dir) {
      if (!tiny.animating) {
        if (tdProp) { 
          tiny.container.style[tdProp] = (tiny.speed / 1000) + 's'; 
          tiny.animating = true;
        }
        if (tiny.slideByPage) { dir = dir * tiny.items; }

        tiny.index += dir;
        if (!tiny.loop) {
          tiny.index = Math.max(0, Math.min(tiny.index, tiny.childrenLength - tiny.items)); 
        }

        tiny.container.style.left = - (100 * tiny.index / tiny.items) + '%';

        if (tiny.loop) {
          setTimeout(function () { 
            tinySliderCore.prototype.navClickFallback(dir);
          }, tiny.speed);
        }

        setTimeout(function () { 
          tinySliderCore.prototype.updateDotsStatus();
          tiny.animating = false;
        }, tiny.speed);
      }
    },

    navClickFallback: function (dir) {
      if (tdProp) { tiny.container.style[tdProp] = '0s'; }

      var leftEdge = (tiny.slideByPage) ? tiny.index < - (tiny.itemsMax - tiny.items) : tiny.index <= - tiny.itemsMax,
      rightEdge = (tiny.slideByPage) ? tiny.index > (tiny.childrenLength + tiny.itemsMax - tiny.items * 2 - 1) : tiny.index >= (tiny.childrenLength + tiny.itemsMax - tiny.items);

      if (leftEdge) { tiny.index += tiny.childrenLength; }
      if (rightEdge) { tiny.index -= tiny.childrenLength; }

      tiny.container.style.left = - (100 * tiny.index / tiny.items) + '%';
    },

    onDotClick: function (index) {
      if (!tiny.animating) {
        if (tdProp) {
          tiny.container.style[tdProp] = (tiny.speed / 1000) + 's'; 
          tiny.animating = true;
        }

        tiny.index = index * tiny.items;
        if (!tiny.loop) {
          tiny.index = Math.min(tiny.index, tiny.childrenLength - tiny.items); 
        }

        tiny.container.style.left = - (100 * tiny.index / tiny.items) + '%';

        setTimeout(function () { 
          tinySliderCore.prototype.updateDotsStatus();
          tiny.animating = false;
        }, tiny.speed);
      }
    },

  };

  // *** helper functions *** //
  // extend
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

  // add event listener
  function addEvent(o, t, fn) {
    o = o || window;
    var e = t+Math.round(Math.random()*99999999);
    if ( o.attachEvent ) {
      o['e'+e] = fn;
      o[e] = function(){
        o['e'+e]( window.event );
      };
      o.attachEvent( 'on'+t, o[e] );
    }else{
      o.addEventListener( t, fn, false );
    }
  }

  // handle classes
  function addClass(el, name) {
    var name = ' ' + name;
    if(el.className.indexOf(name) === -1) {
      el.className += name;
    }
  }
  function removeClass(el, name) {
    var name = ' ' + name;
    if(el.className.indexOf(name) !== -1) {
      el.className = el.className.replace(name, '');
    }
  }

  // Object.keys polyfill
  if (!Object.keys) Object.keys = function(o) {
    if (o !== Object(o))
      throw new TypeError('Object.keys called on a non-object');
    var k=[],p;
    for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
      return k;
  }

  // Object.values similar function
  function getMapValues (obj, keys) {
    var values = [];
    for (var i = 0; i < keys.length; i++) {
      var pro = keys[i];
      values.push(obj[pro]);
    }
    return values;
  }

  // get window width
  function getWindowWidth () {
    var d = document, w = window,
    winW = w.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
    return winW;  
  }

  // get responsive value
  function getItem (keys, values, def) {
    var ww = getWindowWidth();

    if (keys.length !== undefined && values !== undefined && keys.length === values.length) {
      if (ww < keys[0]) {
        return def;
      } else if (ww >= keys[keys.length - 1]) {
        return values[values.length - 1];
      } else {
        for (var i = 0; i < keys.length - 1; i++) {
          if (ww >= keys[i] && ww <= keys[i+1]) {
            return values[i];
          }
        }
      }
    }
  }

  // get supported property
  function getSupportedProp(proparray){
    var root = document.documentElement;
    for (var i=0; i<proparray.length; i++){
      if (proparray[i] in root.style){
        return proparray[i];
      }
    }
  }

  return tinySlider;
});
