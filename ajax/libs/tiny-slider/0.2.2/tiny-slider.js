/**
 * tiny-slider
 * @version 0.2.2
 * @author William Lin
 * @license The MIT License (MIT)
 * @github https://github.com/ganlanyuan/tiny-slider/
 **/
;(function (tinySliderJS) {
  window.tinySlider = tinySliderJS();
})(function () {
  'usr strict';

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
    var names = (typeof(name) === 'string') ? [name] : name;
    for (var i = 0; i < names.length; i++) {
      var newName = ' ' + names[i];
      if(el.className.indexOf(newName) === -1) {
        el.className += newName;
      }
    }
  }
  function removeClass(el, name) {
    var names = (typeof(name) === 'string') ? [name] : name;
    for (var i = 0; i < names.length; i++) {
      var newName = ' ' + names[i];
      if(el.className.indexOf(newName) !== -1) {
        el.className = el.className.replace(newName, '');
      }
    }
  }

  // Object.keys polyfill
  if (!Object.keys) {
    Object.keys = function(o) {
      if (o !== Object(o)) { throw new TypeError('Object.keys called on a non-object'); }
      var k=[],p;
      for (p in o) {
        if (Object.prototype.hasOwnProperty.call(o,p)) { k.push(p); }
      }
      return k;
    };
  }

  function getMapKeys (el) {
    if (el && typeof(el) === 'object') {
      return Object.keys(el);
    } else {
      return false;
    }
  }
  function getMapValues (el, keys) {
    if (el && typeof(el) === 'object') {
      var values = [];
      for (var i = 0; i < keys.length; i++) {
        var pro = keys[i];
        values.push(el[pro]);
      }
      return values;
    } else {
      return false;
    }
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
  var tdProp = getSupportedProp(['transitionDuration', 'MozTransitionDuration', 'WebkitTransitionDuration']);

  // *** tinySlider *** //
  function tinySlider(options) {
    var containers;

    if (options.container !== null) {
      containers = (options.container.length === undefined) ? [options.container] : options.container;

      for (var i = 0; i < containers.length; i++) {
        var newOptions = options;
        newOptions.container = containers[i];
        var a = new TinySliderCore(newOptions);
      }
    }
  }

  function TinySliderCore(options) {
    options = extend({
      container: document.querySelector('.slider'),
      items: 1,
      fixedWidth: false,
      maxContainerWidth: false,
      slideByPage: false,
      nav: true,
      navText: ['prev', 'next'],
      navContainer: false,
      dots: true,
      dotsContainer: false,
      arrowKeys: false,
      speed: 250,
      autoplay: false,
      autoplayTimeout: 5000,
      autoplayDirection: 'forward',
      loop: true,
      responsive: false,
    }, options || {});

    // cl: childrenLength, cul: childrenUpdatedLength
    this.container = options.container;
    this.children = this.container.children;
    this.cl = this.cul = this.children.length;
    this.fw = options.fixedWidth;
    this.nav = options.nav;
    this.navText = options.navText;
    this.navContainer = options.navContainer;
    this.dots = options.dots;
    this.dotsContainer = options.dotsContainer;
    this.arrowKeys = options.arrowKeys;
    this.speed = (!tdProp) ? 0 : options.speed;
    this.autoplay = options.autoplay;
    this.autoplayTimeout = options.autoplayTimeout;
    this.autoplayDirection = (options.autoplayDirection === 'forward') ? 1 : -1;
    this.loop = options.loop;
    this.slideByPage = options.slideByPage;
    this.responsive = (this.fw) ? false : options.responsive;

    this.bp = getMapKeys(this.responsive);
    this.vals = getMapValues(this.responsive, this.bp);
    this.itemsMax = (this.vals.length !== undefined) ? Math.max.apply(Math, this.vals) : options.items;
    this.items = getItem(this.bp, this.vals, options.items);
    this.animating = false;
    this.index = 0;

    // fixed width
    if (this.fw) {
      this.items = Math.floor(this.container.parentNode.offsetWidth / this.fw);
      if (options.maxContainerWidth) {
        this.itemsMax = Math.ceil(options.maxContainerWidth / this.fw);
      } else {
        this.loop = false;
      }
    }

    // if cl are less than items
    if (this.cl < this.itemsMax) {
      this.itemsMax = this.cl;
    }
    if (this.cl < this.items) {
      this.items = this.cl;
    }

    // on initialize
    this.init();

    var tinyFn = this;

    // on window resize
    var updateIt;
    addEvent(window, 'resize', function () {
      // update after resize done
      clearTimeout(updateIt);
      updateIt = setTimeout(function () {
        tinyFn.items = (tinyFn.fw) ? Math.floor(tinyFn.container.parentNode.offsetWidth / tinyFn.fw) : getItem(tinyFn.bp, tinyFn.vals, options.items);
        // if cl are less than items
        if (tinyFn.cl < tinyFn.items) {
          tinyFn.items = tinyFn.cl;
        }
        tinyFn.speed = (tinyFn.slideByPage) ? options.speed * tinyFn.items : options.speed;

        // tinyFn.container.parentNode.style.width = '';
        tinyFn.makeLayout(tinyFn);
        tinyFn.move(tinyFn);
        if (tinyFn.dots && !tinyFn.dotsContainer) {
          tinyFn.displayDots(tinyFn);
          tinyFn.dotsActive(tinyFn);
        }
      }, 100);
    });

    // on nav click
    if (this.nav) {
      addEvent(this.next, 'click', function () { tinyFn.onNavClick(tinyFn, 1); });
      addEvent(this.prev, 'click', function () { tinyFn.onNavClick(tinyFn, -1); });
    }

    // on key down
    if (this.arrowKeys) {
      addEvent(document, 'keydown', function (e) {
        e = e || window.event;
        if (e.keyCode === 37) {
          tinyFn.onNavClick(tinyFn, -1);
        } else if (e.keyCode === 39) {
          tinyFn.onNavClick(tinyFn, 1);
        }
      });
    }

    // on dot click
    if (this.dots) {
      for (var i = 0; i < this.allDots.length; i++) {
        addEvent(this.allDots[i], 'click', this.getDotIndex(this));
      }
    }

    // autoplay
    if (this.autoplay) {
      setInterval(function () {
        tinyFn.onNavClick(tinyFn, tinyFn.autoplayDirection);
      }, tinyFn.autoplayTimeout);
    }
  }

  // *** prototype *** //
  TinySliderCore.prototype = {
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
      if (this.dots) {
        if (this.dotsContainer) {
          this.allDots = this.dotsContainer.children;
          addClass(this.allDots[0], 'tiny-active');
        } else {
          var dots = div.cloneNode(true), dot = div.cloneNode(true);
          dots.className = 'tiny-dots';
          dot.className = 'tiny-dot';

          for (var i = this.cl - 1; i >= 0; i--) {
            var dotClone = (i > 0) ? dot.cloneNode(true) : dot;
            dots.appendChild(dotClone);
          }
          wrapper.appendChild(dots);
          this.allDots = dots.querySelectorAll('.tiny-dot');
        }
      }

      // add nav
      if (this.nav) {
        var nav;
        if (this.navContainer) {
          nav = this.navContainer.children;
          this.prev = nav[0];
          this.next = nav[1];
        } else {
          nav = div.cloneNode(true);
          var prev = div.cloneNode(true),
              next = div.cloneNode(true);

          nav.className = 'tiny-nav';
          prev.className = 'tiny-prev';
          next.className = 'tiny-next';
          if (this.navText.length === 2) {
            prev.innerHTML = this.navText[0];
            next.innerHTML = this.navText[1];
          }

          nav.appendChild(prev);
          nav.appendChild(next);
          wrapper.appendChild(nav);

          this.prev = prev;
          this.next = next;
        }
      }

      // clone items
      if (this.loop) {
        var before = [], after = [], first = this.container.children[0];

        for (var j = 0; j < this.itemsMax; j++) {
          var cloneFirst = this.children[j].cloneNode(true),
              cloneLast = this.children[this.children.length - 1 - j].cloneNode(true);

          before.push(cloneFirst);
          after.push(cloneLast);
        }

        for (var g = 0; g < before.length; g++) {
          this.container.appendChild(before[g]);
        }
        for (var a = after.length - 1; a >= 0; a--) {
          this.container.insertBefore(after[a], first);
        }

        this.cul = this.container.children.length;
        this.children = this.container.children;
      }

      this.makeLayout(this);
      this.move(this);
      this.itemActive(this);
      if (this.dots && !this.dotsContainer) {
        this.displayDots(this);
        this.dotsActive(this);
      }
    },

    makeLayout: function (el) {
      el.itemWidth = (el.fw) ? el.fw : Math.round(el.container.parentNode.offsetWidth / el.items);
      el.container.style.width = el.itemWidth * el.cul + 'px';
      // if (!el.fw) { el.container.parentNode.style.width = el.itemWidth * el.items + 'px'; }
      for (var b = 0; b < el.cul; b++) {
        el.children[b].style.width = el.itemWidth + 'px';
      }

      if (el.loop) {
        var marginLeft = - (el.itemsMax * el.itemWidth);
        el.container.style.marginLeft = marginLeft + 'px';
      }
    },

    // get fixed-width item container left
    getFCL: function (el) {
      var absIndex = el.getAbsIndex(el),
          vw = el.container.parentNode.offsetWidth;

      if ((absIndex + el.items + 1) >= el.cul) {
        return - (el.cul * el.fw - vw);
      } else {
        return - (el.fw * el.index);
      }
    },

    move: function (el) {
      var containerLeft = (el.fw) ? el.getFCL(el) : - el.itemWidth * el.index;
      el.container.style.left = containerLeft + 'px';
    },

    getAbsIndex: function (el) {
      var absIndex = el.index;

      if (absIndex < 0) {
        absIndex += el.cl;
      } else if (absIndex >= el.cl) {
        absIndex -= el.cl;
      }

      return absIndex;
    },

    getDotIndex: function (el) {
      return function () {
        var index;
        for (var i = 0; i < el.allDots.length; i++) {
          if (el.allDots[i] === this) { index = i; }
        }
        el.onDotClick(el, index);
      };
    },

    itemActive: function (el) {
      for (var i = 0; i < el.cul; i++) {
        removeClass(el.children[i], ['tiny-current', 'tiny-visible']);
      }
      var current = (el.loop) ? el.index + el.itemsMax : el.index;
      for (var i = current; i < (current + el.items); i++) {
        addClass(el.children[i], 'tiny-visible');
      }
      addClass(el.children[current], 'tiny-current');
    },

    addStatus: function (el, dir) {
      if (!el.slideByPage && !el.fw) {
        var current = (el.loop) ? el.index + el.itemsMax : el.index;
        if (dir === -1) {
          addClass(el.children[current], 'tiny-left-in');
          addClass(el.children[current + el.items], 'tiny-right-out');
        } else {
          addClass(el.children[current - 1], 'tiny-left-out');
          addClass(el.children[current + el.items - 1], 'tiny-right-in');
        }
      }
    },

    removeStatus: function (el) {
      if (!el.slideByPage && !el.fw) {
        for (var i = 0; i < el.cul; i++) {
          removeClass(el.children[i], ['tiny-left-in', 'tiny-left-out', 'tiny-right-in', 'tiny-right-out']);
        }
      }
    },

    displayDots: function (el) {
      var dotCount = Math.ceil(el.cl / el.items),
          dots = el.allDots;

      for (var i = 0; i < dots.length; i++) {
        if (i < dotCount) {
          removeClass(dots[i], 'tiny-hide');
        } else {
          addClass(dots[i], 'tiny-hide');
        }
      }
    },

    dotsActive: function (el) {
      var current,
          absIndex = el.getAbsIndex(el),
          dots = el.allDots,
          dotCount = (el.dotsContainer) ? el.cl : Math.ceil(el.cl / el.items);

      if (el.dotsContainer) {
        current = absIndex;
      } else {
        if (el.fw) {
          if ((absIndex + el.items + 1) >= el.cul) {
            current = dotCount - 1;
          } else {
            current = Math.floor((absIndex / el.items));
          }
        } else {
          current = Math.floor(absIndex / el.items);
        }
      }

      // non-loop & reach the end
      if (!el.loop && !el.dotsContainer) {
        var re=/^-?[0-9]+$/, whole = re.test(el.cl / el.items);
        if(!whole && el.index === el.cl - el.items) {
          current += 1;
        }
      }

      for (var i = 0; i < dotCount; i++) {
        if (i === current) {
          addClass(dots[i], 'tiny-active');
        } else {
          removeClass(dots[i], 'tiny-active');
        }
      }
    },

    onNavClick: function (el, dir) {
      if (!el.animating) {
        var prevIndex = el.index;

        if (el.slideByPage) { dir = dir * el.items; }
        el.index += dir;
        if (!el.loop) {
          el.index = Math.max(0, Math.min(el.index, el.cl - el.items));
        }

        gap = Math.abs(el.index - prevIndex);
        if (tdProp) {
          el.container.style[tdProp] = (el.speed * gap / 1000) + 's';
          el.animating = true;
          el.addStatus(el, dir);
        }
        el.move(el);

        setTimeout(function () {
          if (el.loop) { el.clickFallback(el); }
          if (el.dots) { el.dotsActive(el); }
          if (tdProp) { el.removeStatus(el); }
          el.itemActive(el);
          el.animating = false;
        }, el.speed * gap);
      }
    },

    clickFallback: function (el) {
      var reachLeftEdge =
            (el.slideByPage) ?
            el.index < - (el.itemsMax - el.items) :
            el.index <= - el.itemsMax,
          reachRightEdge =
            (el.slideByPage) ?
            el.index > (el.cl + el.itemsMax - el.items * 2 - 1) :
            el.index >= (el.cl + el.itemsMax - el.items);

      // fix fixed-width
      if (el.fw && el.itemsMax && !el.slideByPage) {
        reachRightEdge = el.index >= (el.cl + el.itemsMax - el.items - 1);
      }

      if (reachLeftEdge) { el.index += el.cl; }
      if (reachRightEdge) { el.index -= el.cl; }

      if (tdProp) { el.container.style[tdProp] = '0s'; }
      el.container.style.left = - el.itemWidth * el.index + 'px';
    },

    onDotClick: function (el, index) {
      if (!el.animating) {
        var prevIndex = el.index;

        if (el.loop) {
          el.index = (el.dotsContainer) ? index : index * el.items;
        } else {
          if (el.dotsContainer) {
            el.index = Math.min(index, el.cl - el.items);
          } else {
            el.index = Math.min(index * el.items, el.cl - el.items);
          }
        }

        gap = Math.abs(el.index - prevIndex);
        if (tdProp) {
          el.container.style[tdProp] = (el.speed * gap / 1000) + 's';
          el.animating = true;
        }
        el.move(el);

        setTimeout(function () { 
          for (var i = 0; i < el.allDots.length; i++) {
            if (i === index) {
              addClass(el.allDots[i], 'tiny-active');
            } else {
              removeClass(el.allDots[i], 'tiny-active');
            }
          }

          el.clickFallback(el);
          el.itemActive(el);
          el.animating = false;
        }, el.speed * gap);
      }
    },

  };


  return tinySlider;
});