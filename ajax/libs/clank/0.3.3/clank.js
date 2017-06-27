/*! clank - v0.3.1 - 2013-12-21 */// FINGERBLAST.js
// --------------
// Adapted from phantom limb by brian cartensen

function FingerBlast(element) {
  this.element = typeof element == 'string' ? document.querySelector(element) : element;
  this.listen();
}

FingerBlast.prototype = {
  x: NaN,
  y: NaN,

  startDistance: NaN,
  startAngle:    NaN,

  mouseIsDown: false,

  listen: function () {

    var activate = this.activate.bind(this);
    var deactivate = this.deactivate.bind(this);

    function contains (element, ancestor) {
      var descendants, index, descendant;
      if ("compareDocumentPosition" in ancestor) {
        return !!(ancestor.compareDocumentPosition(element) & 16);
      } else if ("contains" in ancestor) {
        return ancestor != element && ancestor.contains(element);
      } else {
        for (descendants = ancestor.getElementsByTagName("*"), index = 0; descendant = descendants[index++];) {
          if (descendant == element) return true;
        }
        return false;
      }
    }

    this.element.addEventListener('mouseover', function (e) {
      var target = e.relatedTarget;
      if (target != this && !contains(target, this)) activate();
    });

    this.element.addEventListener("mouseout", function (e) {
      var target = e.relatedTarget;
      if (target != this && !contains(target, this)) deactivate(e);
    });
  },

  activate: function () {
    if (this.active) return;
    this.element.addEventListener('mousedown', (this.touchStart = this.touchStart.bind(this)), true);
    this.element.addEventListener('mousemove', (this.touchMove  = this.touchMove.bind(this)),  true);
    this.element.addEventListener('mouseup',   (this.touchEnd   = this.touchEnd.bind(this)),   true);
    this.element.addEventListener('click',     (this.click      = this.click.bind(this)),      true);
    this.active = true;
  },

  deactivate: function (e) {
    this.active = false;
    if (this.mouseIsDown) this.touchEnd(e);
    this.element.removeEventListener('mousedown', this.touchStart, true);
    this.element.removeEventListener('mousemove', this.touchMove,  true);
    this.element.removeEventListener('mouseup',   this.touchEnd,   true);
    this.element.removeEventListener('click',     this.click,      true);
  },

  click: function (e) {
    if (e.synthetic) return;
    e.preventDefault();
    e.stopPropagation();
  },

  touchStart: function (e) {
    if (e.synthetic || /input|textarea/.test(e.target.tagName.toLowerCase())) return;

    this.mouseIsDown = true;

    e.preventDefault();
    e.stopPropagation();

    this.fireTouchEvents('touchstart', e);
  },

  touchMove: function (e) {
    if (e.synthetic) return;

    e.preventDefault();
    e.stopPropagation();

    this.move(e.clientX, e.clientY);

    if (this.mouseIsDown) this.fireTouchEvents('touchmove', e);
  },

  touchEnd: function (e) {
    if (e.synthetic) return;

    this.mouseIsDown = false;

    e.preventDefault();
    e.stopPropagation();

    this.fireTouchEvents('touchend', e);

    if (!this.target) return;

    // Mobile Safari moves all the mouse events to fire after the touchend event.
    this.target.dispatchEvent(this.createMouseEvent('mouseover', e));
    this.target.dispatchEvent(this.createMouseEvent('mousemove', e));
    this.target.dispatchEvent(this.createMouseEvent('mousedown', e));
  },

  fireTouchEvents: function (eventName, originalEvent) {
    var events   = [];
    var gestures = [];

    if (!this.target) return;

    // Convert "ontouch*" properties and attributes to listeners.
    var onEventName = 'on' + eventName;

    if (onEventName in this.target) {
      console.warn('Converting `' + onEventName + '` property to event listener.', this.target);
      this.target.addEventListener(eventName, this.target[onEventName], false);
      delete this.target[onEventName];
    }

    if (this.target.hasAttribute(onEventName)) {
      console.warn('Converting `' + onEventName + '` attribute to event listener.', this.target);
      var handler = new GLOBAL.Function('event', this.target.getAttribute(onEventName));
      this.target.addEventListener(eventName, handler, false);
      this.target.removeAttribute(onEventName);
    }

    // Set up a new event with the coordinates of the finger.
    var touch = this.createMouseEvent(eventName, originalEvent);

    events.push(touch);

    // Figure out scale and rotation.
    if (events.length > 1) {
      var x = events[0].pageX - events[1].pageX;
      var y = events[0].pageY - events[1].pageY;

      var distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      var angle = Math.atan2(x, y) * (180 / Math.PI);

      var gestureName = 'gesturechange';

      if (eventName === 'touchstart') {
        gestureName = 'gesturestart';
        this.startDistance = distance;
        this.startAngle = angle;
      }

      if (eventName === 'touchend') gestureName = 'gestureend';

      events.forEach(function(event) {
        var gesture = this.createMouseEvent.call(event._finger, gestureName, event);
        gestures.push(gesture);
      }.bind(this));

      events.concat(gestures).forEach(function(event) {
        event.scale = distance / this.startDistance;
        event.rotation = this.startAngle - angle;
      });
    }

    // Loop through the events array and fill in each touch array.
    events.forEach(function(touch) {
      touch.touches = events.filter(function(e) {
        return ~e.type.indexOf('touch') && e.type !== 'touchend';
      });

      touch.changedTouches = events.filter(function(e) {
        return ~e.type.indexOf('touch') && e._finger.target === touch._finger.target;
      });

      touch.targetTouches = touch.changedTouches.filter(function(e) {
        return ~e.type.indexOf('touch') && e.type !== 'touchend';
      });
    });

    // Then fire the events.
    events.concat(gestures).forEach(function(event, i) {
      event.identifier = i;
      event._finger.target.dispatchEvent(event);
    });
  },

  createMouseEvent: function (eventName, originalEvent) {
    var e = document.createEvent('MouseEvent');

    e.initMouseEvent(eventName, true, true,
      originalEvent.view, originalEvent.detail,
      this.x || originalEvent.screenX, this.y || originalEvent.screenY,
      this.x || originalEvent.clientX, this.y || originalEvent.clientY,
      originalEvent.ctrlKey, originalEvent.shiftKey,
      originalEvent.altKey, originalEvent.metaKey,
      originalEvent.button, this.target || originalEvent.relatedTarget
    );

    e.synthetic = true;
    e._finger   = this;

    return e;
  },

  move: function (x, y) {
    if (isNaN(x) || isNaN(y)) {
      this.target = null;
    } else {
      this.x = x;
      this.y = y;

      if (!this.mouseIsDown) {
        this.target = document.elementFromPoint(x, y);
      }
    }
  }
};
!function () {

  var pageX;
  var pageY;
  var slider;
  var deltaX;
  var deltaY;
  var offsetX;
  var lastSlide;
  var startTime;
  var resistance;
  var sliderWidth;
  var slideNumber;
  var isScrolling;
  var scrollableArea;

  var getSlider = function (target) {
    var i, sliders = document.querySelectorAll('.cl-slider ul');
    for (; target && target !== document; target = target.parentNode) {
      for (i = sliders.length; i--;) { if (sliders[i] === target) return target; }
    }
  }

  var getScroll = function () {
    var translate3d = slider.style.webkitTransform.match(/translate3d\(([^,]*)/);
    return parseInt(translate3d ? translate3d[1] : 0)
  };

  var setSlideNumber = function (offset) {
    var round = offset ? (deltaX < 0 ? 'ceil' : 'floor') : 'round';
    slideNumber = Math[round](getScroll() / ( scrollableArea / slider.children.length) );
    slideNumber += offset;
    slideNumber = Math.min(slideNumber, 0);
    slideNumber = Math.max(-(slider.children.length - 1), slideNumber);
    
  }

  var onTouchStart = function (e) {
    slider = getSlider(e.target);

    if (!slider) return;

    var firstItem  = slider.querySelector('li');

    scrollableArea = firstItem.offsetWidth * slider.children.length;
    isScrolling    = undefined;
    sliderWidth    = slider.offsetWidth;
    resistance     = 1;
    lastSlide      = -(slider.children.length - 1);
    startTime      = +new Date;
    pageX          = e.touches[0].pageX;
    pageY          = e.touches[0].pageY;

    setSlideNumber(0);

    slider.style['-webkit-transition-duration'] = 0;
  };

  var onTouchMove = function (e) {
    if (e.touches.length > 1 || !slider) return; // Exit if a pinch || no slider

    deltaX = e.touches[0].pageX - pageX;
    deltaY = e.touches[0].pageY - pageY;
    pageX  = e.touches[0].pageX;
    pageY  = e.touches[0].pageY;

    if (typeof isScrolling == 'undefined') {
      isScrolling = Math.abs(deltaY) > Math.abs(deltaX);
    }

    if (isScrolling) return;

    offsetX = (deltaX / resistance) + getScroll();

    e.preventDefault();

    resistance = slideNumber == 0         && deltaX > 0 ? (pageX / sliderWidth) + 1.25 :
                 slideNumber == lastSlide && deltaX < 0 ? (Math.abs(pageX) / sliderWidth) + 1.25 : 1;

    slider.style.webkitTransform = 'translate3d(' + offsetX + 'px,0,0)';
  };

  var onTouchEnd = function (e) {
    if (!slider || isScrolling) return;

    setSlideNumber(
      (+new Date) - startTime < 1000 && Math.abs(deltaX) > 15 ? (deltaX < 0 ? -1 : 1) : 0
    );
    
    offsetX = slideNumber * sliderWidth;

    slider.style['-webkit-transition-duration'] = '.2s';
    slider.style.webkitTransform = 'translate3d(' + offsetX + 'px,0,0)';

    e = new CustomEvent('slide', {
      detail: { slideNumber: Math.abs(slideNumber) },
      bubbles: true,
      cancelable: true
    });

    slider.parentNode.dispatchEvent(e);
  };

  window.addEventListener('touchstart', onTouchStart);
  window.addEventListener('touchmove', onTouchMove);
  window.addEventListener('touchend', onTouchEnd);

}();

!function () {

  var start     = {};
  var touchMove = false;
  var distanceX = false;
  var toggle    = false;

  var findToggle = function (target) {
    var i, toggles = document.querySelectorAll('.cl-toggle');
    for (; target && target !== document; target = target.parentNode) {
      for (i = toggles.length; i--;) { if (toggles[i] === target) return target; }
    }
  }

  window.addEventListener('touchstart', function (e) {
    e = e.originalEvent || e;

    toggle = findToggle(e.target);

    if (!toggle) return;

    var handle      = toggle.querySelector('.cl-toggle-handle');
    var toggleWidth = toggle.offsetWidth;
    var handleWidth = handle.offsetWidth;
    var offset      = toggle.classList.contains('active') ? toggleWidth - handleWidth : 0;

    start     = { pageX : e.touches[0].pageX - offset, pageY : e.touches[0].pageY };
    touchMove = false;

    // todo: probably should be moved to the css
    toggle.style['-webkit-transition-duration'] = 0;
  });

  window.addEventListener('touchmove', function (e) {
    e = e.originalEvent || e;

    if (e.touches.length > 1) return; // Exit if a pinch

    if (!toggle) return;

    var handle      = toggle.querySelector('.cl-toggle-handle');
    var current     = e.touches[0];
    var toggleWidth = toggle.offsetWidth;
    var handleWidth = handle.offsetWidth;
    var offset      = toggleWidth - handleWidth;

    touchMove = true;
    distanceX = current.pageX - start.pageX;

    if (Math.abs(distanceX) < Math.abs(current.pageY - start.pageY)) return;

    e.preventDefault();

    if (distanceX < 0)      return handle.style.webkitTransform = 'translate3d(0,0,0)';
    if (distanceX > offset) return handle.style.webkitTransform = 'translate3d(' + offset + 'px,0,0)';

    handle.style.webkitTransform = 'translate3d(' + distanceX + 'px,0,0)';

    toggle.classList[(distanceX > (toggleWidth/2 - handleWidth/2)) ? 'add' : 'remove']('active');
  });

  window.addEventListener('touchend', function (e) {
    if (!toggle) return;

    var handle      = toggle.querySelector('.cl-toggle-handle');
    var toggleWidth = toggle.offsetWidth;
    var handleWidth = handle.offsetWidth;
    var offset      = toggleWidth - handleWidth;
    var slideOn     = (!touchMove && !toggle.classList.contains('active')) || (touchMove && (distanceX > (toggleWidth/2 - handleWidth/2)));

    if (slideOn) handle.style.webkitTransform = 'translate3d(' + offset + 'px,0,0)';
    else handle.style.webkitTransform = 'translate3d(0,0,0)';

    toggle.classList[slideOn ? 'add' : 'remove']('active');

    e = new CustomEvent('toggle', {
      detail: { isActive: slideOn },
      bubbles: true,
      cancelable: true
    });

    toggle.dispatchEvent(e);

    touchMove = false;
    toggle    = false;
  });

}();

$(function() {

  /**
   * Make toggles and sliders work on non touch devices
   */

  // Fingerblast!
  if ($('.cl-toggle').length > 0) {
      var fb = new FingerBlast('.cl-toggle');
  }

  if ($('.cl-slider').length > 0) {
      var fb = new FingerBlast('.cl-slider');
  }
  
  /**
   * Radio and checkbox lists
   */
  
  $('.radio-list input[type="radio"]').change(function() {
    // Remove all checked
    $(this).parents('.radio-list').find('label').removeClass('checked');

    // Add class so we can style
    $(this).parent().addClass('checked');
  });

  $('.checkbox-list input[type="checkbox"]').change(function() {
    // Action on check/uncheck checkbox
    if ($(this).is(':checked')) {
      $(this).parent().addClass('checked');
    } else {
      $(this).parent().removeClass('checked');
    }
    
  });
  
  /**
   * Alerts
   */
  
  $('*[data-dismiss]').click(function() {
    var dismissWhat = $(this).attr('data-dismiss')
    $('.' + dismissWhat).addClass('dismissed');
  });
  
  /*
    Prevent body scrolling when popover context is open
  */

  $('[data-toggle-element="popover-context"]').click(function(e) {
      if ($('.cl-popover').is(':visible')) {
          $('.cl-content').css('overflow', 'hidden');
      } else {
          $('.cl-content').css('overflow', 'scroll');
      }
  });

  /*
    Prevent body scrolling when popover context is open
  */

  if ($('.cl-modal').is(':visible')) {
    $('.cl-content').css('overflow', 'hidden');
  } else {
    $('.cl-content').css('overflow', 'scroll');
  }
  
});