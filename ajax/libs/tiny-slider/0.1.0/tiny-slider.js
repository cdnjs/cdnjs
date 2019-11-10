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
    var newName = ' ' + name;
    if(el.className.indexOf(newName) === -1) {
      el.className += newName;
    }
  }
  function removeClass(el, name) {
    var newName = ' ' + name;
    if(el.className.indexOf(newName) !== -1) {
      el.className = el.className.replace(newName, '');
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
  var tdProp = getSupportedProp(['transitionDuration', 'MozTransitionDuration', 'WebkitTransitionDuration']);

  // *** tinySlider *** //
  function tinySlider(options) {
    var containers = (options.container.length === undefined) ? [options.container] : options.container;

    for (var i = 0; i < containers.length; i++) {
      var newOptions = options;
      newOptions.container = containers[i];
      var a = new tinySliderCore(newOptions);
    }
  }

  function tinySliderCore(options) {
    options = extend({ 
      container: document.querySelector('.slider'),
      items: 1,
      fixedWidth: false,
      maxContainerWidth: false,
      slideByPage: false,
      nav: true,
      navText: ['prev', 'next'],
      dots: true,
      arrowKeys: false,
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
    this.fixedWidth = options.fixedWidth;
    this.nav = options.nav;
    this.navText = options.navText;
    this.dots = options.dots;
    this.arrowKeys = options.arrowKeys;
    this.autoplay = options.autoplay;
    this.autoplayTimeout = options.autoplayTimeout;
    this.autoplayDirection = (options.autoplayDirection === 'forward') ? 1 : -1;
    this.loop = options.loop;
    this.slideByPage = options.slideByPage;
    this.responsive = (this.fixedWidth) ? false : options.responsive; 

    this.bp = (this.responsive && typeof(this.responsive) === 'object') ? Object.keys(this.responsive) : false;
    this.vals = (this.responsive && typeof(this.responsive) === 'object') ? getMapValues(this.responsive, this.bp) : false;
    this.itemsMax = (this.vals.length !== undefined) ? Math.max.apply(Math, this.vals) : options.items;
    this.items = getItem (this.bp, this.vals, options.items);
    this.speed = (this.slideByPage) ? options.speed * this.items : options.speed;
    this.animating = false;
    this.index = 0;

    // fixed width
    if (this.fixedWidth) {
      this.items = Math.floor(this.container.parentNode.offsetWidth / this.fixedWidth);
      if (options.maxContainerWidth) {
        this.itemsMax = Math.ceil(options.maxContainerWidth / this.fixedWidth);
      } else {
        this.loop = false;
      }
    } 

    // if childrenLength are less than items
    if (this.childrenLength < this.itemsMax) {
      this.itemsMax = this.childrenLength;
    }
    if (this.childrenLength < this.items) {
      this.items = this.childrenLength;
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
        tinyFn.items = (tinyFn.fixedWidth) ? Math.floor(tinyFn.container.parentNode.offsetWidth / tinyFn.fixedWidth) : getItem (tinyFn.bp, tinyFn.vals, options.items);
        // if childrenLength are less than items
        if (tinyFn.childrenLength < tinyFn.items) {
          tinyFn.items = tinyFn.childrenLength;
        }
        tinyFn.speed = (tinyFn.slideByPage) ? options.speed * tinyFn.items : options.speed;

        tinySliderCore.prototype.updateContainer(tinyFn);
        if (tinyFn.dots) {
          tinySliderCore.prototype.updateDots(tinyFn);
          tinySliderCore.prototype.updateDotsStatus(tinyFn);
        }
      }, 100);
    });

    // on nav click
    if (this.nav) {
      addEvent(this.next, 'click', function () { tinySliderCore.prototype.onNavClick(tinyFn, 1); });
      addEvent(this.prev, 'click', function () { tinySliderCore.prototype.onNavClick(tinyFn, -1); });
    }

    // on key down
    if (this.arrowKeys) {
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
    if (this.dots) {
      for (var i = 0; i < this.allDots.length; i++) {
        addEvent(this.allDots[i], 'click', function (e) { 
          var index;
          for (var i = 0; i < tinyFn.allDots.length; i++) {
            var target = (e.currentTarget) ? e.currentTarget : e.srcElement;
            if (tinyFn.allDots[i] === target) { index = i; }
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
      if (this.dots) {
        var dots = div.cloneNode(true), dot = div.cloneNode(true);
        dots.className = 'tiny-dots';
        dot.className = 'tiny-dot';

        for (var i = this.childrenLength - 1; i >= 0; i--) {
          var dotClone = (i > 0) ? dot.cloneNode(true) : dot;
          dots.appendChild(dotClone);
        }
        wrapper.appendChild(dots);
        this.allDots = dots.querySelectorAll('.tiny-dot');
      }

      // add nav
      if (this.nav) {
        var nav = div.cloneNode(true),
        prev = div.cloneNode(true),
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

        this.childrenUpdatedLength = this.container.children.length;
        this.children = this.container.children;
      } 

      // calculate width
      var childWidth = (this.fixedWidth) ? this.fixedWidth + 'px' : (100 / this.childrenUpdatedLength) + '%';
      for (var b = 0; b < this.childrenUpdatedLength; b++) {
        this.children[b].style.width = childWidth;
      }

      this.updateContainer(this);
      if (this.dots) {
        this.updateDots(this);
        this.updateDotsStatus(this);
      }
    },

    updateContainer: function (obj) {
      if (obj.loop) {
        var marginLeft = (obj.fixedWidth) ? - (obj.itemsMax * obj.fixedWidth) + 'px' : - (obj.itemsMax * 100 / obj.items) + '%';

        obj.container.style.marginLeft = marginLeft;
      } else {
        obj.index = Math.max(0, Math.min(obj.index, obj.childrenLength - obj.items)); 
      }

      var containerWidth = (obj.fixedWidth) ? obj.fixedWidth * obj.childrenUpdatedLength + 'px' : (obj.childrenUpdatedLength * 100 / obj.items) + '%';
      var containerLeft = (obj.fixedWidth) ? obj.fixedWidthGetContainerLeft(obj) : - (100 * obj.index / obj.items) + '%';

      obj.container.style.width = containerWidth;
      obj.container.style.left = containerLeft;
    },

    updateDots: function (obj) {
      var dotCount = Math.ceil(obj.childrenLength / obj.items),
          dots = obj.allDots;

      for (var i = 0; i < dots.length; i++) {
        if (i < dotCount) {
          removeClass(dots[i], 'tiny-hide');
        } else {
          addClass(dots[i], 'tiny-hide');
        }
      }
    },

    updateDotsStatus: function (obj) {
      var current, 
          absIndex = obj.getAbsIndex(obj), 
          dots = obj.allDots,
          dotCount = Math.ceil(obj.childrenLength / obj.items);

      if (obj.fixedWidth) {
        if ((absIndex + obj.items + 1) >= obj.childrenUpdatedLength) {
          current = dotCount - 1;
        } else {
          current = Math.floor((absIndex / obj.items));
        }
      } else {
        current = Math.floor(absIndex / obj.items);
      }

      // non-loop & reach the end
      if (!obj.loop) {
        var re=/^-?[0-9]+$/, whole = re.test(obj.childrenLength / obj.items);
        if(!whole && obj.index === obj.childrenLength - obj.items) {
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

        var containerLeft = (obj.fixedWidth) ? obj.fixedWidthGetContainerLeft(obj) : - (100 * obj.index / obj.items) + '%';
        obj.container.style.left = containerLeft;

        if (obj.loop) {
          setTimeout(function () { 
            tinySliderCore.prototype.navClickFallback(obj);
          }, obj.speed);
        }

        setTimeout(function () { 
          if (obj.dots) { tinySliderCore.prototype.updateDotsStatus(obj); }
          obj.animating = false;
        }, obj.speed);
      }
    },

    fixedWidthGetContainerLeft: function (obj) {
      var absIndex = obj.getAbsIndex(obj),
          vw = obj.container.parentNode.offsetWidth;

      if ((absIndex + obj.items + 1) >= obj.childrenUpdatedLength) {
        return - (obj.childrenUpdatedLength * obj.fixedWidth - vw) + 'px';
      } else {
        return - (obj.fixedWidth * obj.index) + 'px';
      }
    },

    getAbsIndex: function (obj) {
      var absIndex = obj.index;

      if (absIndex < 0) {
        absIndex += obj.childrenLength;
      } else if (absIndex >= obj.childrenLength) {
        absIndex -= obj.childrenLength;
      }

      return absIndex;
    },

    navClickFallback: function (obj) {
      if (tdProp) { obj.container.style[tdProp] = '0s'; }

      var reachLeftEdge = 
            (obj.slideByPage) ? 
            obj.index < - (obj.itemsMax - obj.items) : 
            obj.index <= - obj.itemsMax,
          reachRightEdge = 
            (obj.slideByPage) ? 
            obj.index > (obj.childrenLength + obj.itemsMax - obj.items * 2 - 1) : 
            obj.index >= (obj.childrenLength + obj.itemsMax - obj.items);

      // fix fixed width      
      if (obj.fixedWidth && obj.itemsMax && !obj.slideByPage) {
        reachRightEdge = obj.index >= (obj.childrenLength + obj.itemsMax - obj.items - 1);
      }

      if (reachLeftEdge) { obj.index += obj.childrenLength; }
      if (reachRightEdge) { obj.index -= obj.childrenLength; }

      var containerLeft = (obj.fixedWidth) ? - (obj.fixedWidth * obj.index) + 'px' : - (100 * obj.index / obj.items) + '%';
      obj.container.style.left = containerLeft;
    },

    onDotClick: function (obj, index) {
      if (!obj.animating) {
        if (tdProp) {
          obj.container.style[tdProp] = (obj.speed / 1000) + 's'; 
          obj.animating = true;
        }

        obj.index = (obj.loop) ? index * obj.items : Math.min(obj.index, obj.childrenLength - obj.items);

        var containerLeft = (obj.fixedWidth) ? obj.fixedWidthGetContainerLeft(obj) : - (100 * obj.index / obj.items) + '%';
        obj.container.style.left = containerLeft;

        setTimeout(function () { 
          for (var i = 0; i < obj.allDots.length; i++) {
            if (i === index) {
              addClass(obj.allDots[i], 'tiny-active');
            } else {
              removeClass(obj.allDots[i], 'tiny-active');
            }
          }

          obj.animating = false;
        }, obj.speed);
      }
    },

  };


  return tinySlider;
});