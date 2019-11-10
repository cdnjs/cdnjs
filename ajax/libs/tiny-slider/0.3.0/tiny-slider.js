/**
 * tiny-slider
 * @version 0.3.0
 * @author William Lin
 * @license The MIT License (MIT)
 * @github https://github.com/ganlanyuan/tiny-slider/
 **/
 ;(function (tinySliderJS) {
  window.tinySlider = tinySliderJS();
})(function () {
  'use strict';

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

  if (!Array.isArray) {
    Array.isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  }

  // handle classes
  function hasClass(el, className) {
    return (' ' + el.className + ' ').indexOf(' ' + className + ' ') !== -1;
  }

  function addClass(el, name) {
    var names = (Array.isArray(name)) ? name : [name];
    
    for (var i = 0; i < names.length; i++) {
      if (!hasClass(el, names[i])) {
        el.className = el.className + ' ' + names[i];
      }
    }
  }

  function removeClass(el, name) {
    var names = (Array.isArray(name)) ? name : [name];

    for (var i = 0; i < names.length; i++) {
      if (hasClass(el, names[i])) {
        el.className = el.className.replace(' ' + names[i], '');
      }
    }
  }

  function toDegree (angle) {
    return angle * (180 / Math.PI);
  }

  function panDir(angle, range) {
    if ( Math.abs(90 - Math.abs(angle)) >= (90 - range) ) {
      return 'horizontal';
    } else if ( Math.abs(90 - Math.abs(angle)) <= range ) {
      return 'vertical';
    } else {
      return false;
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
    return document.documentElement.clientWidth;
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
  var getTD = getSupportedProp(['transitionDuration', 'WebkitTransitionDuration', 'MozTransitionDuration', 'OTransitionDuration']),
      getTransform = getSupportedProp(['transform', 'WebkitTransform', 'MozTransform', 'OTransform']);

  // *** tinySlider *** //
  function tinySlider(options) {
    var containers;

    if (!options.container) { return; }
    containers = (options.container.length === undefined) ? [options.container] : options.container;

    for (var i = 0; i < containers.length; i++) {
      var newOptions = options;
      newOptions.container = containers[i];

      var a = new TinySliderCore(newOptions);
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
      lazyload: false,
      offset: 0,
      touch: true,
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
    this.speed = (!getTD) ? 0 : options.speed;
    this.autoplay = options.autoplay;
    this.autoplayTimeout = options.autoplayTimeout;
    this.autoplayDirection = (options.autoplayDirection === 'forward') ? 1 : -1;
    this.loop = options.loop;
    this.slideByPage = options.slideByPage;
    this.responsive = (this.fw) ? false : options.responsive;
    this.lazyload = options.lazyload;
    this.touch = options.touch;

    this.bp = getMapKeys(this.responsive);
    this.vals = getMapValues(this.responsive, this.bp);
    this.itemsMax = (this.vals.length !== undefined) ? Math.max.apply(Math, this.vals) : options.items;
    this.items = (!this.fw) ? getItem(this.bp, this.vals, options.items) : Math.floor(this.container.parentNode.offsetWidth / this.fw);

    // fixed width
    if (this.fw && options.maxContainerWidth) {
      this.itemsMax = Math.ceil(options.maxContainerWidth / this.fw);
    } else if (this.fw) {
      this.loop = false;
    }

    // if cl are less than items
    this.itemsMax = Math.min(this.cl, this.itemsMax);
    this.items = Math.min(this.cl, this.items);
    this.dotsCount = (this.dotsContainer) ? this.cl : Math.ceil(this.cl / this.items);
    
    this.animating = false;
    this.index = 0;

    if (this.lazyload) {
      this.offset = options.offset;
      this.viewport = {};
      this.sliderRect = {};
      this.viewport.top = 0 - this.offset;
      this.viewport.left = 0 - this.offset;
      this.inview = false;
    }

    if (this.touch) {
      this.startX = 0;
      this.startY = 0;
      this.translateX = 0;
      this.distX = 0;
      this.distY = 0;
      this.rt = 0;
      this.panDir = false;
      this.run = false;
      this.animating = false;
      this.slideEventAdded = false;

      var panFn = this;
      if (!this.slideEventAdded && this.container.addEventListener) {
        this.container.addEventListener('touchstart', panFn.onPanStart(panFn), false);
        this.container.addEventListener('touchmove', panFn.onPanMove(panFn), false);
        this.container.addEventListener('touchend', panFn.onPanEnd(panFn), false);
        this.container.addEventListener('touchcancel', panFn.onPanEnd(panFn), false);

        this.slideEventAdded = true;
      }
    }

    // on initialize
    this.init();

    // on window resize
    var tiny = this, updateIt;
    addEvent(window, 'resize', function () {
      // update after resize done
      clearTimeout(updateIt);
      updateIt = setTimeout(function () {
        tiny.items = (tiny.fw) ? Math.floor(tiny.container.parentNode.offsetWidth / tiny.fw) : getItem(tiny.bp, tiny.vals, options.items);
        // if cl are less than items
        tiny.items = Math.min(tiny.cl, tiny.items);
        tiny.dotsCount = (tiny.dotsContainer) ? tiny.cl : Math.ceil(tiny.cl / tiny.items);
        tiny.speed = (tiny.slideByPage) ? options.speed * tiny.items : options.speed;

        // tiny.container.parentNode.style.width = '';
        tiny.setDotCurrent(tiny);
        tiny.makeLayout(tiny);
        tiny.setSnapInterval(tiny);
        tiny.translate(tiny);
        if (tiny.dots && !tiny.dotsContainer) {
          tiny.displayDots(tiny);
          tiny.dotActive(tiny);
        }
        if (tiny.lazyload) {
          tiny.saveViewport(tiny);
          tiny.sliderInView(tiny);
          tiny.lazyLoad(tiny);
        }
      }, 100);
    });

    // on window scroll
    addEvent(window, 'scroll', function () {
      if (tiny.lazyload) {
        tiny.saveViewport(tiny);
        tiny.sliderInView(tiny);
        tiny.lazyLoad(tiny);
      }
    })

    // on nav click
    if (this.nav) {
      addEvent(this.next, 'click', function () { tiny.onNavClick(tiny, 1); });
      addEvent(this.prev, 'click', function () { tiny.onNavClick(tiny, -1); });
    }

    // on key down
    if (this.arrowKeys) {
      addEvent(document, 'keydown', function (e) {
        e = e || window.event;
        if (e.keyCode === 37) {
          tiny.onNavClick(tiny, -1);
        } else if (e.keyCode === 39) {
          tiny.onNavClick(tiny, 1);
        }
      });
    }

    // on dot click
    if (this.dots) {
      for (var i = 0; i < this.allDots.length; i++) {
        addEvent(this.allDots[i], 'click', this.fireDotClick(this));
      }
    }

    // autoplay
    if (this.autoplay) {
      setInterval(function () {
        tiny.onNavClick(tiny, tiny.autoplayDirection);
      }, tiny.autoplayTimeout);
    }
  }

  // *** prototype *** //
  TinySliderCore.prototype = {
    getAbsIndex: function (el) {
      if (el.index < 0) {
        return el.index + el.cl;
      } else if (el.index >= el.cl) {
        return el.index - el.cl;
      } else {
        return el.index;
      }
    },

    setTD: function (el, indexGap) {
      if (!getTD) { return; }
      el.container.style[getTD] = (el.speed * indexGap / 1000) + 's';
      el.animating = true;
    },

    setDotCurrent: function (el) {
      el.dotCurrent = (el.dotsContainer) ? el.getAbsIndex(el) : Math.floor(el.getAbsIndex(el) / el.items);

      // non-loop & reach the edge
      if (!el.loop && !el.dotsContainer) {
        var re=/^-?[0-9]+$/, integer = re.test(el.cl / el.items);
        if(!integer && el.index === el.cl - el.items) {
          el.dotCurrent += 1;
        }
      }
    },

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

      // for IE10
      if (navigator.msMaxTouchPoints) {
        addClass(wrapper, 'ms-touch');

        addEvent(wrapper, 'scroll', function () {
          if (getTD) { el.container.style[getTD] = '0s'; }
          el.container.style.transform = 'translate3d(-' + - el.container.scrollLeft() + 'px,0,0)';
        });
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

      this.setDotCurrent(this);
      this.makeLayout(this);
      this.setSnapInterval(this);
      this.translate(this);
      this.itemActive(this);
      if (this.dots && !this.dotsContainer) {
        this.displayDots(this);
        this.dotActive(this);
      }

      if (this.lazyload) {
        this.saveViewport(this);
        this.sliderInView(this);
        this.lazyLoad(this);
      }
    },

    makeLayout: function (el) {
      el.itemWidth = (el.fw) ? el.fw : el.container.parentNode.offsetWidth / el.items;
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

    setSnapInterval: function (el) {
      if (!navigator.msMaxTouchPoints) { return; }
      el.container.parentNode.style.msScrollSnapPointsX = 'snapInterval(0%, ' + el.itemWidth + ')';
    },

    itemActive: function (el) {
      var current = (el.loop) ? el.index + el.itemsMax : el.index;
      for (var i = 0; i < el.cul; i++) {
        if (i === current) {
          addClass(el.children[i], ['tiny-current', 'tiny-visible']);
        } else if (i > current && i < current + el.items) {
          removeClass(el.children[i], 'tiny-current');
          addClass(el.children[i], 'tiny-visible');
        } else {
          removeClass(el.children[i], ['tiny-current', 'tiny-visible']);
        }
      }
    },

    displayDots: function (el) {
      for (var i = 0; i < el.allDots.length; i++) {
        if (i < el.dotsCount) {
          removeClass(el.allDots[i], 'tiny-hide');
        } else {
          addClass(el.allDots[i], 'tiny-hide');
        }
      }
    },

    dotActive: function (el) {
      if (!el.dots) { return; }

      for (var i = 0; i < el.dotsCount; i++) {
        if (i === el.dotCurrent) {
          addClass(el.allDots[i], 'tiny-active');
        } else {
          removeClass(el.allDots[i], 'tiny-active');
        }
      }
    },

    translate: function (el) {
      var vw = el.container.parentNode.offsetWidth, translateX;

      translateX = - el.itemWidth * el.index;
      if (el.fw && !el.loop) {
        translateX = Math.max( translateX, - (el.cul * el.itemWidth - vw) );
      }

      if (getTransform) {
        el.container.style[getTransform] = 'translate3d(' + translateX + 'px, 0, 0)';
      } else {
        el.container.style.left = translateX + 'px';
      }
    },

    fallback: function (el) {
      if (!el.loop) { return; }

      var reachLeftEdge = (el.slideByPage) ? el.index < - (el.itemsMax - el.items) : el.index <= - el.itemsMax,
          reachRightEdge = (el.slideByPage) ? el.index > (el.cl + el.itemsMax - el.items * 2 - 1) : el.index >= (el.cl + el.itemsMax - el.items);

      // fix fixed-width
      if (el.fw && el.itemsMax && !el.slideByPage) {
        reachRightEdge = el.index >= (el.cl + el.itemsMax - el.items - 1);
      }

      if (reachLeftEdge) { el.index += el.cl; }
      if (reachRightEdge) { el.index -= el.cl; }

      if (getTD) { el.container.style[getTD] = '0s'; }
      el.translate(el);
    },

    update: function (el) {
      el.fallback(el);
      el.itemActive(el);
      el.dotActive(el);
      el.lazyLoad(el);

      el.animating = false;
    },

    onNavClick: function (el, dir) {
      if (!el.animating) {
        var index, indexGap;

        dir = (el.slideByPage) ? dir * el.items : dir;
        indexGap = Math.abs(dir);
        index = el.index + dir;
        el.index = (el.loop) ? index : Math.max(0, Math.min(index, el.cl - el.items));

        el.setTD(el, indexGap);
        el.translate(el);

        el.setDotCurrent(el);
        setTimeout(function () {
          el.update(el);
        }, el.speed * indexGap);
      }
    },

    fireDotClick: function (el) {
      return function () {
        var index;
        for (var i = 0; i < el.allDots.length; i++) {
          if (el.allDots[i] === this) { index = i; }
        }
        el.onDotClick(el, index);
      };
    },

    onDotClick: function (el, ind) {
      if (!el.animating) {
        var index, indexGap;

        index = (el.dotsContainer) ? ind : ind * el.items;
        index = (el.loop) ? index : Math.min(index, el.cl - el.items);
        indexGap = Math.abs(index - el.index);
        el.index = index;

        el.setTD(el, indexGap);
        el.translate(el);

        el.dotCurrent = ind;
        setTimeout(function () { 
          el.update(el);
        }, el.speed * indexGap);
      }
    },

    saveViewport: function (el) {
      el.viewport.bottom = document.documentElement.clientHeight + el.offset;
      el.viewport.right = document.documentElement.clientWidth + el.offset;
    },

    sliderInView: function (el) {
      var rect = el.container.parentNode.getBoundingClientRect();
      el.sliderRect.left = rect.left;
      el.sliderRect.right = rect.right;
      el.sliderRect.top = rect.top;
      el.sliderRect.bottom = rect.bottom;

      el.inview = (rect.right > el.viewport.left && rect.bottom > el.viewport.top && rect.left < el.viewport.right && rect.top < el.viewport.bottom);
    },

    elementInView: function (el, viewport) {
      var rect = el.getBoundingClientRect();
      return (rect.right > viewport.left && rect.bottom > viewport.top && rect.left < viewport.right && rect.top < viewport.bottom);
    },

    lazyLoad: function (el) {
      if (!el.inview) { return; }

      var imgs = el.container.querySelectorAll('.tiny-lazy');
      if (!imgs) { return; }
      for (var i = 0; i < imgs.length; i++) {
        if (el.elementInView(imgs[i], el.sliderRect) && imgs[i].className.indexOf('loaded') === -1) {
          imgs[i].src = imgs[i].getAttribute('data-src');
          imgs[i].className += ' loaded';
        }
      }
    },

    onPanStart: function (el) {
      return function (e) {
        var touchObj = e.changedTouches[0];
        el.startX = parseInt(touchObj.clientX);
        el.startY = parseInt(touchObj.clientY);
      };
    },

    onPanMove: function (el) {
      return function (e) {
        var touchObj = e.changedTouches[0];
        el.distX = parseInt(touchObj.clientX) - el.startX;
        el.distY = parseInt(touchObj.clientY) - el.startY;
        el.rt = toDegree(Math.atan2(el.distY, el.distX));
        el.panDir = panDir(el.rt, 15);

        if (el.panDir === 'horizontal' && el.animating === false) { el.run = true; }
        if (el.run) {
          if (getTD) { el.container.style[getTD] = '0s'; }

          var min = (!el.loop) ? - (el.cl - el.items) * el.itemWidth : - (el.cl + el.itemsMax - el.items) * el.itemWidth,
              max = (!el.loop) ? 0 : el.itemsMax * el.itemWidth;

          if (!el.loop && el.fw) { min = - (el.cl * el.itemWidth - el.container.parentNode.offsetWidth); }

          el.translateX = - el.index * el.itemWidth + el.distX;
          el.translateX = Math.max(min, Math.min( el.translateX, max));

          if (getTransform) {
            el.container.style[getTransform] = 'translate3d(' + el.translateX + 'px, 0, 0)';
          } else {
            el.container.style.left = el.translateX + 'px';
          }

          e.preventDefault();
        }
      };
    },

    onPanEnd: function (el) {
      return function (e) {
        var touchObj = e.changedTouches[0];
        el.distX = parseInt(touchObj.clientX) - el.startX;

        if (el.run && el.distX !== 0) {
          e.preventDefault();
          el.run = false;
          el.translateX = - el.index * el.itemWidth + el.distX;

          var index,
              min = (!el.loop) ? 0 : -el.itemsMax,
              max = (!el.loop) ? el.cl - el.items : el.cl + el.itemsMax - el.items;

          index = - (el.translateX / el.itemWidth);
          index = (el.distX < 0) ? Math.ceil(index) : Math.floor(index);
          index = Math.max(min, Math.min(index, max));
          el.index = index;

          el.setTD(el, 1);
          el.translate(el);

          el.setDotCurrent(el);
          setTimeout(function () {
            el.update(el);
          }, el.speed);
        }
      };
    }

  };

  return tinySlider;
});
