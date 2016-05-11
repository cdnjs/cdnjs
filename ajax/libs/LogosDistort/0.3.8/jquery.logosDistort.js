;(function(win, doc) {

  /**
   * Main function to create distortion effect.
   * @param element - The element(s) to apply the distortion effect
   * @param option - a set of options to override the default settings
   */
  function logosDistort(elements, options) {
    if (!elements) {
      throw new Error('No element provided.');
    }

    var _this = this;

    this.options = {
      enable: true,
      effectWeight: 1,
      enableSmoothing: true,
      smoothingMultiplier: 1,
      activeOnlyInside: false,
      outerBuffer: 1.10,
      elementDepth: 140,
      perspectiveMulti: 1,
      directions: [1, 1, 1, 1, -1, -1, 1, 1],
      weights: [0.0000310, 0.0001800, 0.0000164, 0.0000019, 0.0001200],
      container: win,
      depthOverride: false,
      mouseMode: 'container',
      cssClasses: {
        smartContainer: 'ld-smart-container',
        overlapContainer: 'ld-overlap-container',
        parent3d: 'ld-3d-parent',
        transformTarget: 'ld-transform-target',
        active: 'ld-transform-active',
        object3d: 'ld-3d-object'
      },
      beforeInit: function() {},
      onInit: function() {},
      onDestroy: function() {},
      onResize: function() {}
    };

    extend(_this.options, options);
    this.elements = elements;
    this.eventCache = [];

    if (this.elements[0]) {

      //Turn our HTMLCollection into an array so we can iterate through it.
      this.elements = [].slice.call(this.elements);

      this.elements.forEach(function(ele){
        ele.distort = new Distortion(ele, _this.options);
      });
    } else {
      this.elements.distort = new Distortion(elements, _this.options);
    }

    this.addHandlers();
  }

  logosDistort.prototype.addHandlers = function() {

    var _this = this;

    //Add Visable Handler Checks
    if (window.addEventListener) {
      this._addEvent(window, 'DOMContentLoaded', visableHandler);
      this._addEvent(window, 'load', visableHandler);
      this._addEvent(window, 'scroll', visableHandler);
      this._addEvent(window, 'resize', visableHandler);
    } else if (window.attachEvent)  {
      this._addEvent(window, 'onDOMContentLoaded', visableHandler);
      this._addEvent(window, 'onload', visableHandler);
      this._addEvent(window, 'onscroll', visableHandler);
      this._addEvent(window, 'onresize', visableHandler);
    }

    //Add Mousemovement Checks
    if (this.options.mouseMode === 'container') {

      //bind mouse movement to element
      if (this.elements[0]) {
        this._addEvent(window, 'mousemove', function(e) {
          _this.patchEvent(e);
          _this.elements.forEach(function(ele){
            var fromX = Math.abs(e.x - ele.distort.center.x);
            var fromY = Math.abs(e.y - ele.distort.center.y);

            if(fromY < (ele.distort.height/2) && fromX < (ele.distort.width/2)) {
              ele.distort.mouseX = e.x;
              ele.distort.mouseY = e.y;
            }
          });
        });

      } else {
        this._addEvent(window, 'mousemove', function(e) {
          _this.patchEvent(e);
          var fromX = Math.abs(e.x - _this.elements.distort.center.x);
          var fromY = Math.abs(e.y - _this.elements.distort.center.y);

          if(fromY < (_this.elements.distort.height / 2) && fromX < (_this.elements.distort.width / 2)) {
            _this.elements.distort.mouseX = e.x;
            _this.elements.distort.mouseY = e.y;
          }
        });
      }

    } else if (this.options.mouseMode === 'window') {

      //bind mouse movement to element
      if (this.elements[0]) {
        this._addEvent(window, 'mousemove', function(e) {
          _this.patchEvent(e);
          _this.elements.forEach(function(ele){
            ele.distort.mouseX = e.x;
            ele.distort.mouseY = e.y;
          });
        });
      } else {
        this._addEvent(window, 'mousemove', function(e) {
          _this.patchEvent(e);
          _this.elements.distort.mouseX = e.x;
          _this.elements.distort.mouseY = e.y;
        });
      }

    } else if (this.options.mouseMode === 'magnetic') {

      //bind mouse movement to element
      if (this.elements[0]) {
        this._addEvent(window, 'mousemove', function(e) {
          _this.patchEvent(e);
          _this.elements.forEach(function(ele){
            var fromX = Math.abs(e.x - ele.distort.center.x);
            var fromY = Math.abs(e.y - ele.distort.center.y);

            if(fromY < (ele.distort.height/2) || fromX < (ele.distort.width/2)) {
              ele.distort.mouseX = e.x;
              ele.distort.mouseY = e.y;
            }
          });
        });

      } else {
        this._addEvent(window, 'mousemove', function(e) {
          _this.patchEvent(e);
          var fromX = Math.abs(e.x - _this.elements.distort.center.x);
          var fromY = Math.abs(e.y - _this.elements.distort.center.y);

          if(fromY < (_this.elements.distort.height/2) || fromX < (_this.elements.distort.width/2)) {
            _this.elements.distort.mouseX = e.x;
            _this.elements.distort.mouseY = e.y;
          }
        });
      }
    }

    //Add resize Handlers for each element
    if (this.elements[0]) {
      this._addEvent(window, 'resize', function() {
        _this.elements.forEach(function(ele){
          ele.distort.resizeHandler();
        });
      });
    } else {
      this._addEvent(window, 'resize', function(e) {
        _this.elements.distort.resizeHandler();
      });
    }

    function visableHandler() {
      if (_this.elements[0]) {
        _this.elements.forEach(function(ele){
          ele.distort.detectVisable();
        });
      } else {
        _this.elements.distort.detectVisable();
      }
    }
  };

  logosDistort.prototype.patchEvent = function(event) {
    if(!event.x) {
      event.x = event.clientX || event.layerX;
    }

    if(!event.y) {
      event.y = event.clientY || event.layerY;
    }
  };

  logosDistort.prototype.destroy = function() {
    this.clearEvents();
    this.elements.forEach(function(ele){
      ele.distort.destroy();
    });
  };

  logosDistort.prototype._addEvent = function(element, type, fn) {
    if (window.addEventListener) {
      element.addEventListener(type, fn, false);
    } else if (window.attachEvent) {
      console.log('wep');
      element.attachEvent(type, fn);
    }

    this.eventCache.push({element: element, type: type, fn: fn});
  };

  logosDistort.prototype.clearEvents = function() {
    this.eventCache.forEach(function(e){
      if (window.addEventListener) {
        e.element.removeEventListener(e.type, e.fn, false);
      } else if (window.attachEvent) {
        e.element.detachEvent(e.type, e.fn);
      }
    });
  };

  function Distortion(element, options) {

    this._name = 'logosDistort';

    this.options = options;
    this.element = element;
    this.eventCache = [];

    if (this.options.container === 'self') {
      this.containerOverride = true;
      this.options.container = this.element;
    } else {
      this.containerOverride = false;
    }

    this.container  = this.options.container;

    this.rect       = this._getBoundingClientRect(this.container);

    this.width      = this.rect.width;
    this.height     = this.rect.height;
    this.center     = this.getCenterOfContainer();

    this.outerCon         = null;
    this.outerConParent   = null;
    this.transformTarget  = null;
    this.objects3d        = null;

    this.mouseX   = this.mouseY   = 0;
    this.effectX  = this.effectY  = 0;

    this.has3dSupport = this._has3d();

    this.paused = false;

    this.options.beforeInit(this);

    this.init();
  }

  Distortion.prototype.init = function(){
    var _this = this;

    this.createEnvironment();
    this.options.onInit();

    this.detectVisable();
    this.start();
  };

  Distortion.prototype.detectVisable = function(){
    this.rect       = this._getBoundingClientRect(this.element);

    if(this.rect.width === 0 || this.rect.height === 0){
      this.rect = this._getBoundingClientRect(this.container);
    }

    this.width      = this.rect.width;
    this.height     = this.rect.height;
    this.center     = this.getCenterOfContainer();

    this.visable    = this._isElementInViewport();
  };

  Distortion.prototype.start = function() {
    var _this = this;

    this.paused = false;
    this.initialized = false;

    if (this.has3dSupport) {
      this.drawInterval = setInterval(function() {
        _this.draw();
      }, 16);
    }
  };

  Distortion.prototype.stop = function() {
    this.paused = true;

    clearInterval(this.drawInterval);
  };

  Distortion.prototype.draw = function() {
    if (!this.visable) {
      return;
    }

    if (this.effectX === this.mouseX || this.effectY === this.mouseY) {
      return;
    }

    if (!this.options.enableSmoothing) {
      this.effectX = this.mouseX;
      this.effectY = this.mouseY;
    } else {
      this.effectX += (this.mouseX - this.effectX) / (20 * this.options.smoothingMultiplier);
      this.effectY += (this.mouseY - this.effectY) / (20 * this.options.smoothingMultiplier);
    }

    if (!this.paused) {
      this.changePerspective(this.transformTarget, this.effectX, this.effectY);
    }
  };

  Distortion.prototype.changePerspective = function(element, appliedX, appliedY) {
    var _this = this;

    requestAnimationFrame(function(){
      element.setAttribute('style', _this.generateTransformString(appliedX, appliedY));
    });
  };

  Distortion.prototype.generateTransformString = function(appliedX, appliedY) {
    var _transforms = this.calculateTransform(appliedX, appliedY);

    var _transformString = 'transform: matrix3d(' +
      _transforms[0]+ ', 0, ' + _transforms[1] + ', 0, ' +
      _transforms[2] + ', ' + _transforms[3] + ', ' + _transforms[4] + ', 0, ' +
      _transforms[5] + ', ' + _transforms[6] + ', ' + _transforms[7] + ', 0, ' +
      '0, 0, 100, 1)';

    return _transformString;
  };

  Distortion.prototype.calculateTransform = function (appliedX, appliedY) {
    var _transforms = [];
    var _directions = this.options.directions;
    var _temp;

    var _fromCenter = this.getDistanceFromCenter(appliedX, appliedY);
    var _fromX = this.getDistanceFromCenterX(appliedY);
    var _fromY = this.getDistanceFromCenterY(appliedX);

    var _fromCenterAndEdge = this.getDistanceFromEdgeCenterAndCenter(_fromCenter, _fromX, _fromY);

    // Lets add our transforms to the array

    //1
    _transforms.push(_directions[0] * (1 - (this.applyTransform(_fromCenter, 0) * this.options.effectWeight)));

    //2
    _transforms.push(_directions[1] * (this.applyTransform(_fromY, 1) * this.options.effectWeight));

    //3
    _transforms.push(_directions[2] * (this.applyTransform(_fromCenterAndEdge, 2) * this.options.effectWeight));

    //4
    _transforms.push(_directions[3] * (1 - (this.applyTransform(_fromCenter, 3) * this.options.effectWeight)));

    //5
    _transforms.push(_directions[4] * (this.applyTransform(_fromX, 4) * this.options.effectWeight));

    //6
    _transforms.push(_directions[5] * _transforms[1]);

    //7
    _transforms.push(_directions[6] * _transforms[4]);

    //8
    _transforms.push(_directions[7] * Math.abs(_transforms[3]));

    _transforms.forEach(function(transform, index){
      _transforms[index] = transform.toFixed(5);
    });

    return _transforms;
  };

  Distortion.prototype.applyTransform = function(distance, effect) {
    return distance * this.options.weights[effect];
  };

  Distortion.prototype.getDistanceFromCenter = function (appliedX, appliedY) {
    return this.getDistance2d(appliedX, appliedY, this.center.x, this.center.y);
  };

  Distortion.prototype.getDistanceFromCenterY = function(appliedX) {
    return appliedX - (this.center.x/2);
  };

  Distortion.prototype.getDistanceFromCenterX = function(appliedY) {
    return appliedY - (this.center.y/2);
  };

  Distortion.prototype.getDistanceFromEdgeCenterAndCenter = function(fromCenter, fromX, fromY) {

    //divide by 50 instead of 100 because distance is already divided by 2
    return -((fromCenter/100) * (fromX/50) * (fromY/50));
  };


  Distortion.prototype.getDistance2d = function (currX, currY, targetX, targetY) {
    return Math.sqrt(Math.pow(currX - targetX, 2) + (Math.pow(currY - targetY, 2)));
  };

  Distortion.prototype.createEnvironment = function() {
    var _env  = doc.createDocumentFragment();
    var _this = this;

    this.objects3d = this.element.children;
    this.objects3d = [].slice.call(this.objects3d);

    this.element.innerHTML = '';

    this.objects3d.forEach(function(child){
      child.classList.add(_this.options.cssClasses.object3d);
    });

    this.outerConParent  = doc.createElement('div');
    this.outerCon        = doc.createElement('div');
    this.parent3d        = doc.createElement('div');
    this.transformTarget = doc.createElement('div');

            this.objects3d.forEach(function(child){
              _this.transformTarget.appendChild(child);
            });
          this.parent3d.appendChild(this.transformTarget);
        this.outerCon.appendChild(this.parent3d);
      this.outerConParent.appendChild(this.outerCon);
    _env.appendChild(this.outerConParent);

    this.outerConParent.classList.add(this.options.cssClasses.smartContainer);
    this.outerCon.classList.add(this.options.cssClasses.overlapContainer);
    this.parent3d.classList.add(this.options.cssClasses.parent3d);

    var perspective = 9000 * this.options.perspectiveMulti;

    this.parent3d.setAttribute('style', 'perspective: ' + perspective + 'px;');

    this.transformTarget.classList.add(this.options.cssClasses.transformTarget, this.options.cssClasses.active);

    this.element.appendChild(_env);

    this.calculateOuterContainer();
    this.calculate3dObjects();
  };

  Distortion.prototype.calculateOuterContainer = function() {

    var width   = this.outerConParent.offsetWidth * this.options.outerBuffer;
    var height  = this.outerConParent.offsetHeight * this.options.outerBuffer;
    var left    = Math.abs((width  - this.width)  /2);
    var top     = Math.abs((height - this.height) /2);

    this.outerCon.setAttribute('style',
      'width:'  + width.toFixed(2)  + 'px; ' +
      'height:' + height.toFixed(2) + 'px; ' +
      'left: -' + left.toFixed(2) + 'px; ' +
      'top: -'  + top.toFixed(2) + 'px;'
    );
  };

  Distortion.prototype.calculate3dObjects = function() {
    var _this = this;

    this.objects3d.forEach(function(node){
      _this.setImageDefaults(node);
    });
  };

  Distortion.prototype.setImageDefaults = function (element) {
    var _this = this;

    if (element.tagName.toLowerCase() === 'img') {

      element.onload = function() {
        return _this.calculatePerspective(element);
      };

      element.addEventListener('load', function(){
        return _this.calculatePerspective(element);
      });

      if (element.complete) {
        _this.calculatePerspective(element);
      }
    } else {
      _this.calculatePerspective(element);
    }
  };

  Distortion.prototype.calculatePerspective = function(node) {
    var index = Array.prototype.indexOf.call(node.parentNode.childNodes, node);
    var aspect;
    var left  = 0;
    var top   = 0;

    /*
      If we have a lot of elements in the array, for performance considerations,
      we want to halve the depth. There is an override to stop this, but caution,
      performance will be much worse.
    */
    if(this.objects3d.length > 4 && !this.options.depthOverride) {
      index = index - (this.objects3d.length / 2);
    }

    var depth = index * this.options.elementDepth;

    if (!node.aspect){
      var aspectDevice  = this.getAspectRatio();
      var aspectElement = this.getAspectRatio(node);

      if (isNaN(aspectElement[0]) || node.tagName.toLowerCase() === "div") {
        aspect = aspectDevice;
      } else {
        aspect = aspectElement;
      }

      node.aspect = aspect;
    } else {
      aspect = node.aspect;
    }

    var height  = (this.outerConParent.offsetHeight * this.options.outerBuffer).toFixed(2);
    var width   = (height * aspect[0]).toFixed(2);

    /*
      If calculated width is less then the outerBuffer width,
      i.e. element uses a height heavy aspect ratio, like on mobile,
      we want to re-calculate everything using some more height-friendly maths.
    */
    if (width < (this.width * this.options.outerBuffer)) {
      difference  = this.width / width;
      width       = (width  * difference * this.options.outerBuffer).toFixed(2);
      height      = (height * difference * this.options.outerBuffer).toFixed(2);
    }

    left = (
      Math.abs(width - this.width) -
      Math.abs((this.outerConParent.offsetWidth * this.options.outerBuffer) - this.width)
    ) / 2;

    top = (
      Math.abs(height - this.height) -
      Math.abs((this.outerConParent.offsetHeight * this.options.outerBuffer) - this.height)
    ) / 2;

    node.setAttribute('style',
      'transform: translate3d(' +
      ' -' + Math.abs(left.toFixed(2))  + 'px, ' +
      ' -' + Math.abs(top.toFixed(2))   + 'px, ' +
      depth + 'px);' +
      'width: '  + width  + 'px; ' +
      'height: ' + height + 'px; '
    );

    //This is called once we know the element has been loaded, so we can get the correct center of
    //each element now.
    if (!this.initialized) {
      var _this = this;

      setTimeout(function(){
        _this.initialized = true;

        _this.rect = _this._getBoundingClientRect(_this.element);

        if(_this.rect.width === 0 || _this.rect.height === 0){
          _this.rect = _this._getBoundingClientRect(_this.container);
        }

        _this.center  = _this.getCenterOfContainer();
        _this.effectX = _this.mouseX = _this.center.x;
        _this.effectY = _this.mouseY = _this.center.y;

        _this.changePerspective(_this.transformTarget, _this.effectX, _this.effectY);
      }, 10);

    }
  };

  Distortion.prototype.getCenterOfContainer = function() {
    return {
      x: this.rect.left + (this.width/2),
      y: this.rect.top + (this.height/2),
    };
  };

  Distortion.prototype.getAspectRatio = function(ele) {

    // Fixes bug where content was always sized to window, use container instead!
    if (!ele) {
      ele = this.options.container;
    }

    var rect = this._getBoundingClientRect(ele);

    return [
      rect.width  / rect.height,
      rect.height / rect.width
    ];
  };

  Distortion.prototype._getBoundingClientRect = function (ele) {
    if (!ele.getBoundingClientRect) {
      return {
        top: 0,
        bottom: window.innerHeight,
        left: 0,
        right: window.innerWidth,
        width: window.innerWidth,
        height: window.innerHeight
      };
    } else {
       return ele.getBoundingClientRect();
    }
  };

  Distortion.prototype.getDistance2d = function (currX, currY, targetX, targetY) {
    return Math.sqrt(
      (Math.pow(currX - targetX, 2)) + (Math.pow(currY - targetY, 2))
    );
  };

  Distortion.prototype.resizeHandler = function() {
    this.rect       = this._getBoundingClientRect(this.container);

    this.width      = this.rect.width;
    this.height     = this.rect.height;
    this.center     = this.getCenterOfContainer();

    this.calculateOuterContainer();
    this.calculate3dObjects();

    this.options.onResize();
  };

  Distortion.prototype._has3d = function(){
    var el = document.createElement('p');
    var transforms = {
      'WebkitTransform':'-webkit-transform',
      'OTransform':'-o-transform',
      'MSTransform':'-ms-transform',
      'MozTransform':'-moz-transform',
      'transform':'transform'
    };
    var has3d;
    var t;

    /* Add it to the body to get the computed style. */
    document.body.insertBefore(el, document.body.lastChild);

    for(t in transforms){
      if( el.style[t] !== undefined ){
        el.style[t] = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)';
        has3d = window.getComputedStyle(el).getPropertyValue( transforms[t] );
      }
    }

    /* Remove used element from body. */
    el.parentNode.removeChild(el);

    if( has3d !== undefined ){
      return has3d !== 'none';
    } else {
      return false;
    }
  };

  Distortion.prototype._isElementInViewport = function() {
    return (
        this.rect.bottom  >= 0 &&
        this.rect.right   >= 0 &&
        this.rect.top   <= window.innerHeight &&
        this.rect.left  <= window.innerWidth
    );
  };

  Distortion.prototype._addEvent = function(element, type, fn) {
    if (window.addEventListener) {
      element.addEventListener(type, fn, false);
    } else if (window.attachEvent) {
      element.attachEvent(type, fn);
    }

    this.eventCache.push({element: element, type: type, fn: fn});
  };

  Distortion.prototype.clearEvents = function() {
    this.eventCache.forEach(function(e){
      if (window.addEventListener) {
        e.element.removeEventListener(e.type, e.fn, false);
      } else if (window.attachEvent) {
        e.element.detachEvent(e.type, e.fn);
      }
    });
  };

  Distortion.prototype.destroy = function() {
    this.clearEvents();
    this.element.parentNode.removeChild(this.element);
    this.hook('onDestroy');

    if (this.element.removeData) {
      this.element.removeData('plugin_'+this._name);
    }
  };

  Distortion.prototype.hook = function(hookName) {
    if(this.options[hookName]){
      this.options[hookName].call(this.element);
    }
  };

  function extend(_this, obj) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
         _this[i] = obj[i];
      }
    }
  }

  // export
  win.logosDistort  = logosDistort;

  if (jQuery && jQuery.fn) {
    jQuery.fn.logosDistort = function(options) {
      return this.each(function() {
        if (!jQuery.data(this, 'plugin_logosDistort')) {
          jQuery.data(this, 'plugin_logosDistort', new logosDistort(this, options));
        }
      });
    };
  }

})(window, document);

(function() {
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame =
        window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() { callback(currTime + timeToCall); },
            timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };

  if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
      };
}());
