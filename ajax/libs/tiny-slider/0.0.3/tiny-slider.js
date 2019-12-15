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

    this.container = options.container;
    this.children = this.container.children;
    this.childrenLength = this.childrenUpdatedLength = options.childrenLength = this.children.length;
    this.hasNav = options.hasNav;
    this.navText = options.navText;
    this.hasDots = options.hasDots;
    this.keyboard = options.keyboard;
    this.autoplay = options.autoplay;
    this.autoplayTimeout = options.autoplayTimeout;
    this.autoplayDirection = (options.autoplayDirection === 'forward') ? 1 : -1;
    this.loop = options.loop;
    this.slideByPage = options.slideByPage;
    this.responsive = options.responsive; 

    this.bp = (this.responsive && typeof(this.responsive) === 'object') ? Object.keys(this.responsive) : false;
    this.vals = (this.responsive && typeof(this.responsive) === 'object') ? getMapValues(this.responsive, this.bp) : false;
    this.itemsMax = (this.vals.length !== undefined) ? Math.max.apply(Math, this.vals) : options.items;
    this.items = getItem (this.bp, this.vals, options.items);
    this.speed = (this.slideByPage) ? options.speed * this.items : options.speed;
    this.animating = false;
    this.index = 0;

    if (this.childrenLength >= this.itemsMax) {

      // on initialize
      this.init();

      var tinyFn = this;

      // on window resize
      var updateIt;
      addEvent(window, 'resize', function () {
        clearTimeout(updateIt);
        updateIt = setTimeout(function () {
          // update after resize done
          tinyFn.items = getItem (tinyFn.bp, tinyFn.vals, options.items);
          tinyFn.speed = (tinyFn.slideByPage) ? options.speed * tinyFn.items : options.speed;
          tinySliderCore.prototype.updateContainer(tinyFn);
          if (tinyFn.hasDots) {
            tinySliderCore.prototype.updateDots(tinyFn);
            tinySliderCore.prototype.updateDotsStatus(tinyFn);
          }
        }, 100);
      });

      // on nav click
      if (this.hasNav) {
        addEvent(this.next, 'click', function () { tinySliderCore.prototype.onNavClick(tinyFn, 1); });
        addEvent(this.prev, 'click', function () { tinySliderCore.prototype.onNavClick(tinyFn, -1); });
      }

      // on key down
      if (this.keyboard) {
        addEvent(document, 'keydown', function (e) {
          e = e || window.event;
          if (e.keyCode === 37) {
            tinySliderCore.prototype.onNavClick(tinyFn, -1);
          } else if (e.keyCode === 39) {
            tinySliderCore.prototype.onNavClick(tinyFn, 1);
          }
        });
      }

      // on dot click
      if (this.hasDots) {
        for (var i = 0; i < this.dots.length; i++) {
          addEvent(this.dots[i], 'click', function (e) { 
            var index;
            for (var i = 0; i < tinyFn.dots.length; i++) {
              target = (e.currentTarget) ? e.currentTarget : e.srcElement;
              if (tinyFn.dots[i] === target) { index = i; }
            }
            tinySliderCore.prototype.onDotClick(tinyFn, index); 
          });
        }
      }

      // autoplay
      if (this.autoplay) { 
        setInterval(function () {
          tinySliderCore.prototype.onNavClick(tinyFn, tinyFn.autoplayDirection);
        }, tinyFn.autoplayTimeout);
      }
    } else {
      throw new TypeError('items are not enough to show on 1 page');
    }
  }

  // *** prototype *** //
  tinySliderCore.prototype = {
    init: function () {
      addClass(this.container, 'tiny-content');

      // wrap slider with ".tiny-slider"
      var parent = this.container.parentNode,
      sibling = this.container.nextSibling;

      var div = document.createElement('div'),
      wrapper = div.cloneNode(true);
      wrapper.className = 'tiny-slider';
      wrapper.appendChild(this.container);

      if (sibling) {
        parent.insertBefore(wrapper, sibling);
      } else {
        parent.appendChild(wrapper);
      }

      // add dots
      if (this.hasDots) {
        var dots = div.cloneNode(true),
        dot = div.cloneNode(true);
        dots.className = 'tiny-dots';
        dot.className = 'tiny-dot';

        for (var i = this.childrenLength - 1; i >= 0; i--) {
          var dotClone = (i > 0) ? dot.cloneNode(true) : dot;
          dots.appendChild(dotClone);
        }
        wrapper.appendChild(dots);
        this.dots = dots.querySelectorAll('.tiny-dot');
      }

      // add nav
      if (this.hasNav) {
        var nav = div.cloneNode(true),
        prev = div.cloneNode(true),
        next = div.cloneNode(true);
        nav.className = 'tiny-nav';
        prev.className = 'tiny-prev';
        next.className = 'tiny-next';

        if (this.navText.length = 2) {
          prev.innerHTML = this.navText[0];
          next.innerHTML = this.navText[1];
        }
        nav.appendChild(prev);
        nav.appendChild(next);
        wrapper.appendChild(nav);

        this.prev = prev;
        this.next = next;
      }

      // clone items
      if (this.loop) {
        var before = [], after = [], first = this.container.children[0];

        for (var i = 0; i < this.itemsMax; i++) {
          var cloneFirst = this.children[i].cloneNode(true),
              cloneLast = this.children[this.children.length - 1 - i].cloneNode(true);

          before.push(cloneFirst);
          after.push(cloneLast);
        }

        for (var i = 0; i < before.length; i++) {
          this.container.appendChild(before[i]);
        }
        for (var i = after.length - 1; i >= 0; i--) {
          this.container.insertBefore(after[i], first);
        }

        this.childrenUpdatedLength = this.container.children.length;
        this.children = this.container.children;
      } 

      // calculate width
      for (var i = 0; i < this.childrenUpdatedLength; i++) {
        this.children[i].style.width = (100 / this.childrenUpdatedLength) + '%';
      }

      this.updateContainer(this);
      if (this.hasDots) {
        this.updateDots(this);
        this.updateDotsStatus(this);
      }
    },

    updateContainer: function (obj) {
      if (obj.loop) {
        obj.container.style.marginLeft = - (obj.itemsMax * 100 / obj.items) + '%';
      } else {
        obj.index = Math.max(0, Math.min(obj.index, obj.childrenLength - obj.items)); 
      }

      obj.container.style.width = (obj.childrenUpdatedLength * 100 / obj.items) + '%';
      obj.container.style.left = - (100 * obj.index / obj.items) + '%';
    },

    updateDots: function (obj) {
      var dotCount = Math.ceil(obj.childrenLength / obj.items),
      dots = obj.dots;
      for (var i = 0; i < dots.length; i++) {
        (i < dotCount) ? removeClass(dots[i], 'tiny-hide') : addClass(dots[i], 'tiny-hide');
      }
    },

    updateDotsStatus: function (obj) {
      var current, absIndex = obj.index, dots = obj.dots,
      dotCount = Math.ceil(obj.childrenLength / obj.items);

      if (absIndex < 0) {
        absIndex += obj.childrenLength;
      } else if (absIndex >= obj.childrenLength) {
        absIndex -= obj.childrenLength;
      }

      current = Math.floor(absIndex / obj.items);
      // non-loop & reach the end
      if (!obj.loop) {
        var re=/^-?[0-9]+$/, whole = re.test(obj.childrenLength / obj.items);
        if(!whole && obj.index === obj.childrenLength - obj.items) {
          current += 1;
        }
      }

      for (var i = 0; i < dotCount; i++) {
        (i === current) ? addClass(dots[i], 'tiny-active') : removeClass(dots[i], 'tiny-active');
      }
    },

    onNavClick: function (obj, dir) {
      if (!obj.animating) {
        if (tdProp) { 
          obj.container.style[tdProp] = (obj.speed / 1000) + 's'; 
          obj.animating = true;
        }
        if (obj.slideByPage) { dir = dir * obj.items; }

        obj.index += dir;
        if (!obj.loop) {
          obj.index = Math.max(0, Math.min(obj.index, obj.childrenLength - obj.items)); 
        }

        obj.container.style.left = - (100 * obj.index / obj.items) + '%';

        if (obj.loop) {
          setTimeout(function () { 
            tinySliderCore.prototype.navClickFallback(obj, dir);
          }, obj.speed);
        }

        setTimeout(function () { 
          if (obj.hasDots) { tinySliderCore.prototype.updateDotsStatus(obj); }
          obj.animating = false;
        }, obj.speed);
      }
    },

    navClickFallback: function (obj, dir) {
      if (tdProp) { obj.container.style[tdProp] = '0s'; }

      var leftEdge = (obj.slideByPage) ? obj.index < - (obj.itemsMax - obj.items) : obj.index <= - obj.itemsMax,
      rightEdge = (obj.slideByPage) ? obj.index > (obj.childrenLength + obj.itemsMax - obj.items * 2 - 1) : obj.index >= (obj.childrenLength + obj.itemsMax - obj.items);

      if (leftEdge) { obj.index += obj.childrenLength; }
      if (rightEdge) { obj.index -= obj.childrenLength; }

      obj.container.style.left = - (100 * obj.index / obj.items) + '%';
    },

    onDotClick: function (obj, index) {
      if (!obj.animating) {
        if (tdProp) {
          obj.container.style[tdProp] = (obj.speed / 1000) + 's'; 
          obj.animating = true;
        }

        obj.index = index * obj.items;
        if (!obj.loop) {
          obj.index = Math.min(obj.index, obj.childrenLength - obj.items); 
        }

        obj.container.style.left = - (100 * obj.index / obj.items) + '%';

        setTimeout(function () { 
          if (obj.hasDots) { tinySliderCore.prototype.updateDotsStatus(obj); }
          obj.animating = false;
        }, obj.speed);
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
    } else {
      return def;
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