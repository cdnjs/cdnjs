
/*!
FullCalendar Scheduler v1.0.2
Docs & License: http://fullcalendar.io/scheduler/
(c) 2015 Adam Shaw
 */
(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define([ 'jquery', 'moment' ], factory);
	}
	else {
		factory(jQuery, moment);
	}
})(function($, moment) {;
var COL_MIN_WIDTH, Calendar, CalendarExtension, Class, DEFAULT_GRID_DURATION, DragListener, Emitter, EventRow, FC, Grid, HRowGroup, LICENSE_INFO_URL, MAX_AUTO_CELLS, MAX_AUTO_SLOTS_PER_LABEL, MAX_CELLS, MIN_AUTO_LABELS, PRESET_LICENSE_KEYS, RELEASE_DATE, ResourceGrid, ResourceManager, ResourceRow, ResourceTimelineGrid, ResourceTimelineView, ResourceView, RowGroup, RowParent, STOCK_SUB_DURATIONS, ScrollFollower, ScrollFollowerSprite, ScrollJoiner, Scroller, Spreadsheet, TimelineGrid, TimelineView, UPGRADE_WINDOW, VRowGroup, View, applyAll, capitaliseFirstLetter, compareByFieldSpecs, computeIntervalUnit, computeOffsetForSeg, computeOffsetForSegs, copyRect, cssToStr, debounce, detectRtlScrollSystem, divideDurationByDuration, divideRangeByDuration, durationHasTime, flexibleCompare, getFirstOwnRow, getRectHeight, getRectWidth, getScrollFromLeft, getScrollbarWidths, hContainRect, hasAnyScrollbars, htmlEscape, intersectRects, intersectionToSeg, isImmuneUrl, isInt, isValidKey, joinRects, multiplyDuration, normalizedHScroll, parseFieldSpecs, processLicenseKey, proxy, renderingWarningInContainer, rtlScrollSystem, superDisplayEvents, testRectContains, testRectHContains, testRectVContains, timeRowSegsCollide, vContainRect,
  slice = [].slice,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

FC = $.fullCalendar;

Calendar = FC.Calendar;

Class = FC.Class;

View = FC.View;

Grid = FC.Grid;

intersectionToSeg = FC.intersectionToSeg;

debounce = FC.debounce;

isInt = FC.isInt;

getScrollbarWidths = FC.getScrollbarWidths;

DragListener = FC.DragListener;

htmlEscape = FC.htmlEscape;

computeIntervalUnit = FC.computeIntervalUnit;

proxy = FC.proxy;

capitaliseFirstLetter = FC.capitaliseFirstLetter;

applyAll = FC.applyAll;

Emitter = FC.Emitter;

durationHasTime = FC.durationHasTime;

divideRangeByDuration = FC.divideRangeByDuration;

divideDurationByDuration = FC.divideDurationByDuration;

multiplyDuration = FC.multiplyDuration;

parseFieldSpecs = FC.parseFieldSpecs;

compareByFieldSpecs = FC.compareByFieldSpecs;

flexibleCompare = FC.flexibleCompare;

intersectRects = FC.intersectRects;


/*
Gets the first cell that doesn't have a multi-row rowspan.
Accepts a jQuery object of one or more TRs and returns the first TD for each.
Would use the [rowspan] selector, but never not defined in IE8.
 */

getFirstOwnRow = function(trs) {
  return trs.map(function(i, trNode) {
    var j, len, ref, tdNode;
    ref = $(trNode).find('> td');
    for (j = 0, len = ref.length; j < len; j++) {
      tdNode = ref[j];
      if (tdNode.rowSpan <= 1) {
        return tdNode;
      }
    }
  });
};

rtlScrollSystem = null;

normalizedHScroll = function(el, val) {
  var direction, node;
  direction = el.css('direction');
  node = el[0];
  if (val != null) {
    if (direction === 'rtl') {
      switch (rtlScrollSystem) {
        case 'positive':
          val = val - node.clientWidth + node.scrollWidth;
          break;
        case 'reverse':
          val = -val;
      }
    }
    node.scrollLeft = val;
    return el;
  } else {
    val = node.scrollLeft;
    if (direction === 'rtl') {
      switch (rtlScrollSystem) {
        case 'positive':
          val = val + node.clientWidth - node.scrollWidth;
          break;
        case 'reverse':
          val = -val;
      }
    }
    return val;
  }
};

getScrollFromLeft = function(el) {
  var direction, node, val;
  direction = el.css('direction');
  node = el[0];
  val = node.scrollLeft;
  if (direction === 'rtl') {
    switch (rtlScrollSystem) {
      case 'negative':
        val = val - node.clientWidth + node.scrollWidth;
        break;
      case 'reverse':
        val = -val - node.clientWidth + node.scrollWidth;
    }
  }
  return val;
};

detectRtlScrollSystem = function() {
  var el, node, system;
  el = $('<div style=" position: absolute top: -1000px; width: 1px; height: 1px; overflow: scroll; direction: rtl; font-size: 14px; ">A</div>').appendTo('body');
  node = el[0];
  system = node.scrollLeft > 0 ? 'positive' : (node.scrollLeft = 1, el.scrollLeft > 0 ? 'reverse' : 'negative');
  el.remove();
  return system;
};

$(function() {
  return rtlScrollSystem = detectRtlScrollSystem();
});

Scroller = (function() {
  Scroller.prototype.el = null;

  Scroller.prototype.innerEl = null;

  Scroller.prototype.contentEl = null;

  Scroller.prototype.bgEl = null;

  Scroller.prototype.overflowX = null;

  Scroller.prototype.overflowY = null;

  Scroller.prototype.isScrolling = false;

  Scroller.prototype.handlers = null;

  Scroller.prototype.height = null;

  Scroller.prototype.contentWidth = null;

  Scroller.prototype.contentMinWidth = null;

  Scroller.prototype.gutters = null;


  /*
  	Potential overflowX / overflowY values:
  		'hidden', 'scroll', 'invisible-scroll', 'auto'
   */

  function Scroller(overflowX1, overflowY1) {
    this.overflowX = overflowX1 != null ? overflowX1 : 'auto';
    this.overflowY = overflowY1 != null ? overflowY1 : 'auto';
    this.el = $('<div class="fc-scrollpane"> <div> <div class="fc-scrollpane-inner"> <div class="fc-content"/> <div class="fc-bg"/> </div> </div> </div>');
    this.scrollEl = this.el.children();
    this.innerEl = this.scrollEl.children();
    this.contentEl = this.innerEl.find('.fc-content');
    this.bgEl = this.innerEl.find('.fc-bg');
    this.scrollEl.on('scroll', proxy(this, 'handleScroll')).on('scroll', debounce(proxy(this, 'handleScrollStop'), 100));
    this.handlers = {};
    this.gutters = {};
  }


  /*
  	TODO: automatically call this on window resize? (potential scrollbar width change)
   */

  Scroller.prototype.update = function() {
    var cssProps, isInvisibleScrollX, isInvisibleScrollY, overflowX, overflowY, scrollEl, scrollbarWidths;
    scrollEl = this.scrollEl;
    overflowX = this.overflowX;
    overflowY = this.overflowY;
    isInvisibleScrollX = overflowX === 'invisible-scroll';
    isInvisibleScrollY = overflowY === 'invisible-scroll';
    scrollEl.toggleClass('fc-no-scrollbars', (isInvisibleScrollX || overflowX === 'hidden') && (isInvisibleScrollY || overflowY === 'hidden') && !hasAnyScrollbars(scrollEl));
    scrollEl.css({
      overflowX: isInvisibleScrollX ? 'scroll' : overflowX,
      overflowY: isInvisibleScrollY ? 'scroll' : overflowY
    });
    cssProps = {
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0
    };
    if (isInvisibleScrollX || isInvisibleScrollY) {
      scrollbarWidths = getScrollbarWidths(scrollEl);
      if (isInvisibleScrollX) {
        cssProps.marginTop = -scrollbarWidths.top;
        cssProps.marginBottom = -scrollbarWidths.bottom;
      }
      if (isInvisibleScrollY) {
        cssProps.marginLeft = -scrollbarWidths.left;
        cssProps.marginRight = -scrollbarWidths.right;
      }
    }
    return scrollEl.css(cssProps);
  };

  Scroller.prototype.getScrollbarWidths = function() {
    var scrollbarWidths;
    scrollbarWidths = getScrollbarWidths(this.scrollEl);
    if (this.overflowX === 'invisible-scroll') {
      scrollbarWidths.top = 0;
      scrollbarWidths.bottom = 0;
    }
    if (this.overflowY === 'invisible-scroll') {
      scrollbarWidths.left = 0;
      scrollbarWidths.right = 0;
    }
    return scrollbarWidths;
  };

  Scroller.prototype.handleScroll = function() {
    if (!this.isScrolling) {
      this.isScrolling = true;
      this.trigger('scrollStart');
    }
    return this.trigger('scroll', this.scrollEl.scrollTop(), this.scrollEl.scrollLeft());
  };

  Scroller.prototype.handleScrollStop = function() {
    this.isScrolling = false;
    return this.trigger('scrollStop');
  };

  Scroller.prototype.setHeight = function(height1) {
    this.height = height1;
    return this.updateCss();
  };

  Scroller.prototype.getHeight = function() {
    var ref;
    return (ref = this.height) != null ? ref : this.scrollEl.height();
  };

  Scroller.prototype.setContentWidth = function(contentWidth) {
    this.contentWidth = contentWidth;
    return this.updateCss();
  };

  Scroller.prototype.setContentMinWidth = function(contentMinWidth) {
    this.contentMinWidth = contentMinWidth;
    return this.updateCss();
  };

  Scroller.prototype.setGutters = function(gutters) {
    if (!gutters) {
      this.gutters = {};
    } else {
      $.extend(this.gutters, gutters);
    }
    return this.updateCss();
  };

  Scroller.prototype.updateCss = function() {
    var gutters;
    this.scrollEl.height(this.height);
    gutters = this.gutters;
    this.innerEl.css({
      width: this.contentWidth ? this.contentWidth + (gutters.left || 0) + (gutters.right || 0) : '',
      minWidth: this.contentMinWidth ? this.contentMinWidth + (gutters.left || 0) + (gutters.right || 0) : void 0,
      paddingLeft: gutters.left || '',
      paddingRight: gutters.right || '',
      paddingTop: gutters.top || '',
      paddingBottom: gutters.bottom || ''
    });
    return this.bgEl.css({
      left: gutters.left || '',
      right: gutters.right || '',
      top: gutters.top || '',
      bottom: gutters.bottom || ''
    });
  };

  Scroller.prototype.append = function(content) {
    return this.contentEl.append(content);
  };

  Scroller.prototype.scrollTop = function(top) {
    return this.scrollEl.scrollTop(top);
  };

  Scroller.prototype.scrollLeft = function(left) {
    return this.scrollEl.scrollLeft(left);
  };

  Scroller.prototype.on = function(handlerName, handler) {
    var base;
    ((base = this.handlers)[handlerName] || (base[handlerName] = [])).push(handler);
    return this;
  };

  Scroller.prototype.trigger = function() {
    var args, handler, handlerName, j, len, ref;
    handlerName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    ref = this.handlers[handlerName] || [];
    for (j = 0, len = ref.length; j < len; j++) {
      handler = ref[j];
      handler.apply(this, args);
    }
  };

  return Scroller;

})();

hasAnyScrollbars = function(el) {
  var scrollbarWidths;
  scrollbarWidths = getScrollbarWidths(el);
  return scrollbarWidths.left || scrollbarWidths.right || scrollbarWidths.top || scrollbarWidths.bottom;
};

ScrollJoiner = (function() {
  ScrollJoiner.prototype.axis = null;

  ScrollJoiner.prototype.scrollers = null;

  ScrollJoiner.prototype.masterScroller = null;

  ScrollJoiner.prototype.enabled = true;

  function ScrollJoiner(axis, scrollers) {
    var j, len, ref, scroller;
    this.axis = axis;
    this.scrollers = scrollers;
    ref = this.scrollers;
    for (j = 0, len = ref.length; j < len; j++) {
      scroller = ref[j];
      this.initScroller(scroller);
    }
  }

  ScrollJoiner.prototype.enable = function() {
    return this.enabled = true;
  };

  ScrollJoiner.prototype.disable = function() {
    return this.enabled = false;
  };

  ScrollJoiner.prototype.initScroller = function(scroller) {
    return scroller.on('scrollStart', (function(_this) {
      return function() {
        if (!_this.masterScroller) {
          _this.masterScroller = scroller;
        }
      };
    })(this)).on('scroll', (function(_this) {
      return function(scrollTop, scrollLeft) {
        var j, len, otherScroller, ref;
        if (scroller === _this.masterScroller) {
          ref = _this.scrollers;
          for (j = 0, len = ref.length; j < len; j++) {
            otherScroller = ref[j];
            if (otherScroller !== _this.masterScroller) {
              switch (_this.axis) {
                case 'horizontal':
                  otherScroller.scrollLeft(scrollLeft);
                  break;
                case 'vertical':
                  otherScroller.scrollTop(scrollTop);
              }
            }
          }
        }
      };
    })(this)).on('scrollStop', (function(_this) {
      return function() {
        if (scroller === _this.masterScroller) {
          _this.masterScroller = null;
        }
      };
    })(this));
  };

  ScrollJoiner.prototype.update = function() {
    var allWidths, i, j, k, len, len1, maxBottom, maxLeft, maxRight, maxTop, ref, scroller, widths;
    allWidths = (function() {
      var j, len, ref, results;
      ref = this.scrollers;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        scroller = ref[j];
        results.push(scroller.getScrollbarWidths());
      }
      return results;
    }).call(this);
    maxLeft = maxRight = maxTop = maxBottom = 0;
    for (j = 0, len = allWidths.length; j < len; j++) {
      widths = allWidths[j];
      maxLeft = Math.max(maxLeft, widths.left);
      maxRight = Math.max(maxRight, widths.right);
      maxTop = Math.max(maxTop, widths.top);
      maxBottom = Math.max(maxBottom, widths.bottom);
    }
    ref = this.scrollers;
    for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
      scroller = ref[i];
      widths = allWidths[i];
      scroller.setGutters(this.axis === 'horizontal' ? {
        left: maxLeft - widths.left,
        right: maxRight - widths.right
      } : {
        top: maxTop - widths.top,
        bottom: maxBottom - widths.bottom
      });
    }
  };

  return ScrollJoiner;

})();

ScrollFollower = (function() {
  ScrollFollower.prototype.scroller = null;

  ScrollFollower.prototype.scrollbarWidths = null;

  ScrollFollower.prototype.sprites = null;

  ScrollFollower.prototype.viewportRect = null;

  ScrollFollower.prototype.contentOffset = null;

  ScrollFollower.prototype.isHFollowing = true;

  ScrollFollower.prototype.isVFollowing = false;

  ScrollFollower.prototype.containOnNaturalLeft = false;

  ScrollFollower.prototype.containOnNaturalRight = false;

  ScrollFollower.prototype.shouldRequeryDimensions = false;

  ScrollFollower.prototype.minTravel = 0;

  ScrollFollower.prototype.isForcedAbsolute = false;

  ScrollFollower.prototype.isForcedRelative = false;

  function ScrollFollower(scroller1) {
    this.scroller = scroller1;
    this.sprites = [];
    this.scroller.on('scrollStart', (function(_this) {
      return function() {
        if (_this.shouldRequeryDimensions) {
          return _this.cacheDimensions();
        }
      };
    })(this));
    this.scroller.on('scroll', (function(_this) {
      return function(scrollTop, scrollLeft) {
        var left, scrollEl, top;
        scrollEl = _this.scroller.scrollEl;
        left = getScrollFromLeft(scrollEl);
        top = scrollEl.scrollTop();
        _this.viewportRect = {
          left: left,
          right: left + scrollEl[0].clientWidth,
          top: top,
          bottom: top + scrollEl[0].clientHeight
        };
        return _this.updatePositions();
      };
    })(this));
  }

  ScrollFollower.prototype.setSprites = function(sprites) {
    var j, len, sprite;
    this.clearSprites();
    if (sprites instanceof $) {
      return this.sprites = (function() {
        var j, len, results;
        results = [];
        for (j = 0, len = sprites.length; j < len; j++) {
          sprite = sprites[j];
          results.push(new ScrollFollowerSprite($(sprite), this));
        }
        return results;
      }).call(this);
    } else {
      for (j = 0, len = sprites.length; j < len; j++) {
        sprite = sprites[j];
        sprite.follower = this;
      }
      return this.sprites = sprites;
    }
  };

  ScrollFollower.prototype.clearSprites = function() {
    var j, len, ref, sprite;
    ref = this.sprites;
    for (j = 0, len = ref.length; j < len; j++) {
      sprite = ref[j];
      sprite.clear();
    }
    return this.sprites = [];
  };

  ScrollFollower.prototype.cacheDimensions = function() {
    var j, left, len, ref, scrollEl, sprite, top;
    scrollEl = this.scroller.scrollEl;
    left = getScrollFromLeft(scrollEl);
    top = scrollEl.scrollTop();
    this.viewportRect = {
      left: left,
      right: left + scrollEl[0].clientWidth,
      top: top,
      bottom: top + scrollEl[0].clientHeight
    };
    this.scrollbarWidths = this.scroller.getScrollbarWidths();
    this.contentOffset = this.scroller.innerEl.offset();
    ref = this.sprites;
    for (j = 0, len = ref.length; j < len; j++) {
      sprite = ref[j];
      sprite.cacheDimensions();
    }
  };

  ScrollFollower.prototype.forceAbsolute = function() {
    var j, len, ref, results, sprite;
    this.isForcedAbsolute = true;
    ref = this.sprites;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      sprite = ref[j];
      if (!sprite.doAbsolute) {
        results.push(sprite.assignPosition());
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  ScrollFollower.prototype.forceRelative = function() {
    var j, len, ref, results, sprite;
    this.isForcedRelative = true;
    ref = this.sprites;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      sprite = ref[j];
      if (sprite.doAbsolute) {
        results.push(sprite.assignPosition());
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  ScrollFollower.prototype.clearForce = function() {
    var j, len, ref, results, sprite;
    this.isForcedRelative = false;
    this.isForcedAbsolute = false;
    ref = this.sprites;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      sprite = ref[j];
      results.push(sprite.assignPosition());
    }
    return results;
  };

  ScrollFollower.prototype.update = function() {
    this.cacheDimensions();
    return this.updatePositions();
  };

  ScrollFollower.prototype.updatePositions = function() {
    var j, len, ref, sprite;
    ref = this.sprites;
    for (j = 0, len = ref.length; j < len; j++) {
      sprite = ref[j];
      sprite.updatePosition();
    }
  };

  ScrollFollower.prototype.getContentRect = function(el) {
    var left, res, top;
    res = el.offset();
    left = res.left + parseFloat(el.css('border-left-width')) + parseFloat(el.css('padding-left')) - this.contentOffset.left;
    top = res.top + parseFloat(el.css('border-left-width')) + parseFloat(el.css('padding-left')) - this.contentOffset.top;
    return {
      left: left,
      right: left + el.width(),
      top: top,
      bottom: top + el.height()
    };
  };

  ScrollFollower.prototype.getBoundingRect = function(el) {
    var left, res, top;
    res = el.offset();
    left = res.left - this.contentOffset.left;
    top = res.top - this.contentOffset.top;
    return {
      left: left,
      right: left + el.outerWidth(),
      top: top,
      bottom: top + el.outerHeight()
    };
  };

  return ScrollFollower;

})();

ScrollFollowerSprite = (function() {
  ScrollFollowerSprite.prototype.follower = null;

  ScrollFollowerSprite.prototype.el = null;

  ScrollFollowerSprite.prototype.absoluteEl = null;

  ScrollFollowerSprite.prototype.naturalRect = null;

  ScrollFollowerSprite.prototype.parentRect = null;

  ScrollFollowerSprite.prototype.containerRect = null;

  ScrollFollowerSprite.prototype.isEnabled = true;

  ScrollFollowerSprite.prototype.isHFollowing = false;

  ScrollFollowerSprite.prototype.isVFollowing = false;

  ScrollFollowerSprite.prototype.doAbsolute = false;

  ScrollFollowerSprite.prototype.isAbsolute = false;

  ScrollFollowerSprite.prototype.isCentered = false;

  ScrollFollowerSprite.prototype.rect = null;

  ScrollFollowerSprite.prototype.isBlock = false;

  ScrollFollowerSprite.prototype.naturalWidth = null;

  function ScrollFollowerSprite(el1, follower1) {
    this.el = el1;
    this.follower = follower1 != null ? follower1 : null;
    this.isBlock = this.el.css('display') === 'block';
    this.el.css('position', 'relative');
  }

  ScrollFollowerSprite.prototype.disable = function() {
    if (this.isEnabled) {
      this.isEnabled = false;
      this.resetPosition();
      return this.unabsolutize();
    }
  };

  ScrollFollowerSprite.prototype.enable = function() {
    if (!this.isEnabled) {
      this.isEnabled = true;
      return this.assignPosition();
    }
  };

  ScrollFollowerSprite.prototype.clear = function() {
    this.disable();
    this.follower = null;
    return this.absoluteEl = null;
  };

  ScrollFollowerSprite.prototype.cacheDimensions = function() {
    var containerRect, follower, isCentered, isHFollowing, isVFollowing, minTravel, naturalRect, parentEl;
    isHFollowing = false;
    isVFollowing = false;
    isCentered = false;
    this.naturalWidth = this.el.width();
    this.resetPosition();
    follower = this.follower;
    naturalRect = this.naturalRect = follower.getBoundingRect(this.el);
    parentEl = this.el.parent();
    this.parentRect = follower.getBoundingRect(parentEl);
    containerRect = this.containerRect = joinRects(follower.getContentRect(parentEl), naturalRect);
    minTravel = follower.minTravel;
    if (follower.containOnNaturalLeft) {
      containerRect.left = naturalRect.left;
    }
    if (follower.containOnNaturalRight) {
      containerRect.right = naturalRect.right;
    }
    if (follower.isHFollowing) {
      if (getRectWidth(containerRect) - getRectWidth(naturalRect) >= minTravel) {
        isCentered = this.el.css('text-align') === 'center';
        isHFollowing = true;
      }
    }
    if (follower.isVFollowing) {
      if (getRectHeight(containerRect) - getRectHeight(naturalRect) >= minTravel) {
        isVFollowing = true;
      }
    }
    this.isHFollowing = isHFollowing;
    this.isVFollowing = isVFollowing;
    return this.isCentered = isCentered;
  };

  ScrollFollowerSprite.prototype.updatePosition = function() {
    this.computePosition();
    return this.assignPosition();
  };

  ScrollFollowerSprite.prototype.resetPosition = function() {
    return this.el.css({
      top: '',
      left: ''
    });
  };

  ScrollFollowerSprite.prototype.computePosition = function() {
    var containerRect, doAbsolute, parentRect, rect, rectWidth, subjectRect, viewportRect, visibleParentRect;
    viewportRect = this.follower.viewportRect;
    parentRect = this.parentRect;
    containerRect = this.containerRect;
    visibleParentRect = intersectRects(viewportRect, parentRect);
    rect = null;
    doAbsolute = false;
    if (visibleParentRect) {
      rect = copyRect(this.naturalRect);
      subjectRect = intersectRects(rect, parentRect);
      if ((this.isCentered && !testRectContains(viewportRect, parentRect)) || (subjectRect && !testRectContains(viewportRect, subjectRect))) {
        doAbsolute = true;
        if (this.isHFollowing) {
          if (this.isCentered) {
            rectWidth = getRectWidth(rect);
            rect.left = (visibleParentRect.left + visibleParentRect.right) / 2 - rectWidth / 2;
            rect.right = rect.left + rectWidth;
          } else {
            if (!hContainRect(rect, viewportRect)) {
              doAbsolute = false;
            }
          }
          if (hContainRect(rect, containerRect)) {
            doAbsolute = false;
          }
        }
        if (this.isVFollowing) {
          if (!vContainRect(rect, viewportRect)) {
            doAbsolute = false;
          }
          if (vContainRect(rect, containerRect)) {
            doAbsolute = false;
          }
        }
        if (!testRectContains(viewportRect, rect)) {
          doAbsolute = false;
        }
      }
    }
    this.rect = rect;
    return this.doAbsolute = doAbsolute;
  };

  ScrollFollowerSprite.prototype.assignPosition = function() {
    var left, top;
    if (this.isEnabled) {
      if (!this.rect) {
        return this.unabsolutize();
      } else if ((this.doAbsolute || this.follower.isForcedAbsolute) && !this.follower.isForcedRelative) {
        this.absolutize();
        return this.absoluteEl.css({
          top: this.rect.top - this.follower.viewportRect.top + this.follower.scrollbarWidths.top,
          left: this.rect.left - this.follower.viewportRect.left + this.follower.scrollbarWidths.left,
          width: this.isBlock ? this.naturalWidth : ''
        });
      } else {
        top = this.rect.top - this.naturalRect.top;
        left = this.rect.left - this.naturalRect.left;
        this.unabsolutize();
        return this.el.toggleClass('fc-following', Boolean(top || left)).css({
          top: top,
          left: left
        });
      }
    }
  };

  ScrollFollowerSprite.prototype.absolutize = function() {
    if (!this.isAbsolute) {
      if (!this.absoluteEl) {
        this.absoluteEl = this.buildAbsoluteEl();
      }
      this.absoluteEl.appendTo(this.follower.scroller.el);
      this.el.css('visibility', 'hidden');
      return this.isAbsolute = true;
    }
  };

  ScrollFollowerSprite.prototype.unabsolutize = function() {
    if (this.isAbsolute) {
      this.absoluteEl.detach();
      this.el.css('visibility', '');
      return this.isAbsolute = false;
    }
  };

  ScrollFollowerSprite.prototype.buildAbsoluteEl = function() {
    return this.el.clone().addClass('fc-following').css({
      'position': 'absolute',
      'z-index': 1000,
      'font-weight': this.el.css('font-weight'),
      'font-size': this.el.css('font-size'),
      'font-family': this.el.css('font-family'),
      'color': this.el.css('color'),
      'padding-top': this.el.css('padding-top'),
      'padding-bottom': this.el.css('padding-bottom'),
      'padding-left': this.el.css('padding-left'),
      'padding-right': this.el.css('padding-right'),
      'pointer-events': 'none'
    });
  };

  return ScrollFollowerSprite;

})();

copyRect = function(rect) {
  return {
    left: rect.left,
    right: rect.right,
    top: rect.top,
    bottom: rect.bottom
  };
};

getRectWidth = function(rect) {
  return rect.right - rect.left;
};

getRectHeight = function(rect) {
  return rect.bottom - rect.top;
};

testRectContains = function(rect, innerRect) {
  return testRectHContains(rect, innerRect) && testRectVContains(rect, innerRect);
};

testRectHContains = function(rect, innerRect) {
  return innerRect.left >= rect.left && innerRect.right <= rect.right;
};

testRectVContains = function(rect, innerRect) {
  return innerRect.top >= rect.top && innerRect.bottom <= rect.bottom;
};

hContainRect = function(rect, outerRect) {
  if (rect.left < outerRect.left) {
    rect.right = outerRect.left + getRectWidth(rect);
    rect.left = outerRect.left;
    return true;
  } else if (rect.right > outerRect.right) {
    rect.left = outerRect.right - getRectWidth(rect);
    rect.right = outerRect.right;
    return true;
  } else {
    return false;
  }
};

vContainRect = function(rect, outerRect) {
  if (rect.top < outerRect.top) {
    rect.bottom = outerRect.top + getRectHeight(rect);
    rect.top = outerRect.top;
    return true;
  } else if (rect.bottom > outerRect.bottom) {
    rect.top = outerRect.bottom - getRectHeight(rect);
    rect.bottom = outerRect.bottom;
    return true;
  } else {
    return false;
  }
};

joinRects = function(rect1, rect2) {
  return {
    left: Math.min(rect1.left, rect2.left),
    right: Math.max(rect1.right, rect2.right),
    top: Math.min(rect1.top, rect2.top),
    bottom: Math.max(rect1.bottom, rect2.bottom)
  };
};

CalendarExtension = (function(superClass) {
  extend(CalendarExtension, superClass);

  function CalendarExtension() {
    return CalendarExtension.__super__.constructor.apply(this, arguments);
  }

  CalendarExtension.prototype.resourceManager = null;

  CalendarExtension.prototype.initialize = function() {
    return this.resourceManager = new ResourceManager(this);
  };

  CalendarExtension.prototype.instantiateView = function(viewType) {
    var spec, viewClass;
    spec = this.getViewSpec(viewType);
    viewClass = spec['class'];
    if (this.options.resources && spec.options.resources !== false && spec.resourceClass) {
      viewClass = spec.resourceClass;
    }
    return new viewClass(this, viewType, spec.options, spec.duration);
  };

  CalendarExtension.prototype.getResources = function() {
    return this.resourceManager.topLevelResources;
  };

  CalendarExtension.prototype.addResource = function(resourceInput, scroll) {
    var promise;
    if (scroll == null) {
      scroll = false;
    }
    promise = this.resourceManager.addResource(resourceInput);
    if (scroll && this.view.scrollToResource) {
      promise.done((function(_this) {
        return function(resource) {
          return _this.view.scrollToResource(resource);
        };
      })(this));
    }
  };

  CalendarExtension.prototype.removeResource = function(idOrResource) {
    return this.resourceManager.removeResource(idOrResource);
  };

  CalendarExtension.prototype.refetchResources = function() {
    this.resourceManager.fetchResources();
  };

  CalendarExtension.prototype.rerenderResources = function() {
    var base;
    if (typeof (base = this.view).redisplayResources === "function") {
      base.redisplayResources();
    }
  };

  CalendarExtension.prototype.getEventResourceId = function(event) {
    return this.resourceManager.getEventResourceId(event);
  };

  CalendarExtension.prototype.getPeerEvents = function(event, range) {
    var filteredPeerEvents, j, len, peerEvent, peerEvents, peerResourceId, rangeResourceId;
    peerEvents = CalendarExtension.__super__.getPeerEvents.apply(this, arguments);
    rangeResourceId = range.resourceId || '';
    filteredPeerEvents = [];
    for (j = 0, len = peerEvents.length; j < len; j++) {
      peerEvent = peerEvents[j];
      peerResourceId = this.getEventResourceId(peerEvent) || '';
      if (!peerResourceId || peerResourceId === rangeResourceId) {
        filteredPeerEvents.push(peerEvent);
      }
    }
    return filteredPeerEvents;
  };

  CalendarExtension.prototype.buildSelectRange = function(start, end, resourceId) {
    var range;
    range = CalendarExtension.__super__.buildSelectRange.apply(this, arguments);
    if (resourceId) {
      range.resourceId = resourceId;
    }
    return range;
  };

  CalendarExtension.prototype.getResourceById = function(id) {
    return this.resourceManager.getResourceById(id);
  };

  CalendarExtension.prototype.getResourceEvents = function(idOrResource) {
    var eventResourceField, resource;
    resource = typeof idOrResource === 'object' ? idOrResource : this.getResourceById(idOrResource);
    if (resource) {
      eventResourceField = this.resourceManager.getEventResourceField();
      return this.clientEvents(function(event) {
        return event[eventResourceField] === resource.id;
      });
    } else {
      return [];
    }
  };

  CalendarExtension.prototype.getEventResource = function(idOrEvent) {
    var event, resourceId;
    event = typeof idOrEvent === 'object' ? idOrEvent : this.clientEvents(idOrEvent)[0];
    if (event) {
      resourceId = this.resourceManager.getEventResourceId(event);
      return this.getResourceById(resourceId);
    }
    return null;
  };

  return CalendarExtension;

})(Calendar);

Calendar.prototype = CalendarExtension.prototype;

superDisplayEvents = View.prototype.displayEvents;

View.prototype.displayEvents = function(events) {
  this.listenToResources();
  processLicenseKey(this.calendar.options.schedulerLicenseKey, this.el);
  return this.calendar.resourceManager.getResources().then((function(_this) {
    return function() {
      return superDisplayEvents.call(_this, events);
    };
  })(this));
};

View.prototype.isListeningToResources = false;

View.prototype.listenToResources = function() {
  if (!this.isListeningToResources) {
    this.calendar.resourceManager.on('add', proxy(this, 'addResource')).on('remove', proxy(this, 'removeResource')).on('reset', proxy(this, 'resetResources'));
    return this.isListeningToResources = true;
  }
};

View.prototype.addResource = function(resource) {
  return this.calendar.rerenderEvents();
};

View.prototype.removeResource = function(resource) {
  return this.calendar.rerenderEvents();
};

View.prototype.resetResources = function(resources) {
  return this.calendar.rerenderEvents();
};

Grid.prototype.getEventSkinCss = function(event) {
  var eventColor, getResourceBackgroundColor, getResourceBorderColor, getResourceTextColor, optionColor, resource, source, sourceColor, view;
  view = this.view;
  source = event.source || {};
  eventColor = event.color;
  sourceColor = source.color;
  optionColor = view.opt('eventColor');
  resource = view.calendar.getEventResource(event);
  getResourceBackgroundColor = function() {
    var currentResource, val;
    val = null;
    currentResource = resource;
    while (currentResource && !val) {
      val = currentResource.eventBackgroundColor || currentResource.eventColor;
      currentResource = currentResource._parent;
    }
    return val;
  };
  getResourceBorderColor = function() {
    var currentResource, val;
    val = null;
    currentResource = resource;
    while (currentResource && !val) {
      val = currentResource.eventBorderColor || currentResource.eventColor;
      currentResource = currentResource._parent;
    }
    return val;
  };
  getResourceTextColor = function() {
    var currentResource, val;
    val = null;
    currentResource = resource;
    while (currentResource && !val) {
      val = currentResource.eventTextColor;
      currentResource = currentResource._parent;
    }
    return val;
  };
  return {
    'background-color': event.backgroundColor || eventColor || getResourceBackgroundColor() || source.backgroundColor || sourceColor || view.opt('eventBackgroundColor') || optionColor,
    'border-color': event.borderColor || eventColor || getResourceBorderColor() || source.borderColor || sourceColor || view.opt('eventBorderColor') || optionColor,
    'color': event.textColor || getResourceTextColor() || source.textColor || view.opt('eventTextColor')
  };
};

ResourceManager = (function(superClass) {
  extend(ResourceManager, superClass);

  ResourceManager.mixin(Emitter);

  ResourceManager.resourceGuid = 1;

  ResourceManager.ajaxDefaults = {
    dataType: 'json',
    cache: false
  };

  ResourceManager.prototype.calendar = null;

  ResourceManager.prototype.topLevelResources = null;

  ResourceManager.prototype.resourcesById = null;

  ResourceManager.prototype.fetching = null;

  function ResourceManager(calendar) {
    this.calendar = calendar;
    this.unsetResources();
  }

  ResourceManager.prototype.getResources = function() {
    var getting;
    if (!this.fetching) {
      getting = $.Deferred();
      this.fetchResources().done(function(resources) {
        return getting.resolve(resources);
      }).fail(function() {
        return getting.resolve([]);
      });
      return getting;
    } else {
      return $.Deferred().resolve(this.topLevelResources).promise();
    }
  };

  ResourceManager.prototype.fetchResources = function() {
    var prevFetching;
    prevFetching = this.fetching;
    return $.when(prevFetching).then((function(_this) {
      return function() {
        return _this.fetching = _this.fetchResourceInputs().then(function(resourceInputs) {
          _this.setResources(resourceInputs);
          if (prevFetching) {
            _this.trigger('reset', _this.topLevelResources);
          }
          return _this.topLevelResources;
        });
      };
    })(this));
  };

  ResourceManager.prototype.fetchResourceInputs = function() {
    var deferred, promise, source;
    deferred = $.Deferred();
    source = this.calendar.options['resources'];
    if ($.type(source) === 'string') {
      source = {
        url: source
      };
    }
    switch ($.type(source)) {
      case 'function':
        source((function(_this) {
          return function(resourceInputs) {
            return deferred.resolve(resourceInputs);
          };
        })(this));
        break;
      case 'object':
        promise = $.ajax($.extend({}, ResourceManager.ajaxDefaults, source));
        break;
      case 'array':
        deferred.resolve(source);
        break;
      default:
        deferred.resolve([]);
    }
    promise || (promise = deferred.promise());
    if (!promise.state() === 'pending') {
      this.calendar.pushLoading();
      promise.always(function() {
        return this.calendar.popLoading();
      });
    }
    return promise;
  };

  ResourceManager.prototype.getResourceById = function(id) {
    return this.resourcesById[id];
  };

  ResourceManager.prototype.unsetResources = function() {
    this.topLevelResources = [];
    return this.resourcesById = {};
  };

  ResourceManager.prototype.setResources = function(resourceInputs) {
    var j, len, resource, resourceInput, resources, validResources;
    this.unsetResources();
    resources = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = resourceInputs.length; j < len; j++) {
        resourceInput = resourceInputs[j];
        results.push(this.buildResource(resourceInput));
      }
      return results;
    }).call(this);
    validResources = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = resources.length; j < len; j++) {
        resource = resources[j];
        if (this.addResourceToIndex(resource)) {
          results.push(resource);
        }
      }
      return results;
    }).call(this);
    for (j = 0, len = validResources.length; j < len; j++) {
      resource = validResources[j];
      this.addResourceToTree(resource);
    }
    return this.calendar.trigger('resourcesSet', null, this.topLevelResources);
  };

  ResourceManager.prototype.addResource = function(resourceInput) {
    return $.when(this.fetching).then((function(_this) {
      return function() {
        var resource;
        resource = _this.buildResource(resourceInput);
        if (_this.addResourceToIndex(resource)) {
          _this.addResourceToTree(resource);
          _this.trigger('add', resource);
          return resource;
        } else {
          return false;
        }
      };
    })(this));
  };

  ResourceManager.prototype.addResourceToIndex = function(resource) {
    var child, j, len, ref;
    if (this.resourcesById[resource.id]) {
      return false;
    } else {
      this.resourcesById[resource.id] = resource;
      ref = resource.children;
      for (j = 0, len = ref.length; j < len; j++) {
        child = ref[j];
        this.addResourceToIndex(child);
      }
      return true;
    }
  };

  ResourceManager.prototype.addResourceToTree = function(resource) {
    var parent, parentId, siblings;
    if (!resource.parent) {
      parentId = String(resource[this.getResourceParentField()] || '');
      if (parentId) {
        parent = this.resourcesById[parentId];
        if (parent) {
          resource.parent = parent;
          siblings = parent.children;
        } else {
          return false;
        }
      } else {
        siblings = this.topLevelResources;
      }
      siblings.push(resource);
    }
    return true;
  };

  ResourceManager.prototype.removeResource = function(idOrResource) {
    var id;
    id = typeof idOrResource === 'object' ? idOrResource.id : idOrResource;
    return $.when(this.fetching).then((function(_this) {
      return function() {
        var resource;
        resource = _this.removeResourceFromIndex(id);
        if (resource) {
          _this.removeResourceFromTree(resource);
          _this.trigger('remove', resource);
        }
        return resource;
      };
    })(this));
  };

  ResourceManager.prototype.removeResourceFromIndex = function(resourceId) {
    var child, j, len, ref, resource;
    resource = this.resourcesById[resourceId];
    if (resource) {
      delete this.resourcesById[resourceId];
      ref = resource.children;
      for (j = 0, len = ref.length; j < len; j++) {
        child = ref[j];
        this.removeResourceFromIndex(child.id);
      }
      return resource;
    } else {
      return false;
    }
  };

  ResourceManager.prototype.removeResourceFromTree = function(resource, siblings) {
    var i, j, len, sibling;
    if (siblings == null) {
      siblings = this.topLevelResources;
    }
    for (i = j = 0, len = siblings.length; j < len; i = ++j) {
      sibling = siblings[i];
      if (sibling === resource) {
        resource.parent = null;
        siblings.splice(i, 1);
        return true;
      }
      if (this.removeResourceFromTree(resource, sibling.children)) {
        return true;
      }
    }
    return false;
  };

  ResourceManager.prototype.buildResource = function(resourceInput) {
    var child, childInput, rawClassName, ref, resource;
    resource = $.extend({}, resourceInput);
    resource.id = String(((ref = resourceInput.id) != null ? ref : '_fc' + (ResourceManager.resourceGuid++)) || '');
    rawClassName = resourceInput.eventClassName;
    resource.eventClassName = (function() {
      switch ($.type(rawClassName)) {
        case 'string':
          return rawClassName.split(/\s+/);
        case 'array':
          return rawClassName;
        default:
          return [];
      }
    })();
    resource.children = (function() {
      var j, len, ref1, ref2, results;
      ref2 = (ref1 = resourceInput.children) != null ? ref1 : [];
      results = [];
      for (j = 0, len = ref2.length; j < len; j++) {
        childInput = ref2[j];
        child = this.buildResource(childInput);
        child.parent = resource;
        results.push(child);
      }
      return results;
    }).call(this);
    return resource;
  };

  ResourceManager.prototype.getResourceParentField = function() {
    return this.calendar.options['resourceParentField'] || 'parentId';
  };

  ResourceManager.prototype.getEventResourceId = function(event) {
    return String(event[this.getEventResourceField()] || '');
  };

  ResourceManager.prototype.setEventResourceId = function(event, resourceId) {
    return event[this.getEventResourceField()] = String(resourceId || '');
  };

  ResourceManager.prototype.getEventResourceField = function() {
    return this.calendar.options['eventResourceField'] || 'resourceId';
  };

  return ResourceManager;

})(Class);

ResourceView = (function(superClass) {
  extend(ResourceView, superClass);

  function ResourceView() {
    return ResourceView.__super__.constructor.apply(this, arguments);
  }

  ResourceView.prototype.displayingResources = null;

  ResourceView.prototype.assigningResources = null;

  ResourceView.prototype.displayView = function() {
    return $.when(ResourceView.__super__.displayView.apply(this, arguments)).then((function(_this) {
      return function() {
        return _this.displayResources();
      };
    })(this));
  };

  ResourceView.prototype.displayEvents = function(events) {
    return $.when(this.displayResources()).then((function(_this) {
      return function() {
        return ResourceView.__super__.displayEvents.call(_this, events);
      };
    })(this));
  };

  ResourceView.prototype.unrenderSkeleton = function() {
    return this.clearResources();
  };

  ResourceView.prototype.displayResources = function() {
    this.listenToResources();
    return $.when(this.displayingResources).then((function(_this) {
      return function() {
        return _this.displayingResources || (_this.displayingResources = _this.assignResources().then(function() {
          return _this.renderStoredResources();
        }));
      };
    })(this));
  };

  ResourceView.prototype.clearResources = function() {
    var displaying;
    displaying = this.displayingResources;
    if (displaying) {
      return displaying.then((function(_this) {
        return function() {
          _this.clearEvents();
          _this.unrenderStoredResources();
          return _this.displayingResources = null;
        };
      })(this));
    } else {
      return $.when();
    }
  };

  ResourceView.prototype.redisplayResources = function() {
    var scrollState;
    scrollState = this.queryScroll();
    return this.clearResources().then((function(_this) {
      return function() {
        return _this.displayResources();
      };
    })(this)).then((function(_this) {
      return function() {
        _this.setScroll(scrollState);
        return _this.calendar.rerenderEvents();
      };
    })(this));
  };

  ResourceView.prototype.resetResources = function(resources) {
    var scrollState;
    if (!this.displayingResources) {
      return this.unassignResources().then((function(_this) {
        return function() {
          return _this.assignResources(resources);
        };
      })(this));
    } else {
      scrollState = this.queryScroll();
      return this.clearResources().then((function(_this) {
        return function() {
          return _this.unassignResources();
        };
      })(this)).then((function(_this) {
        return function() {
          return _this.assignResources(resources);
        };
      })(this)).then((function(_this) {
        return function() {
          return _this.displayResources();
        };
      })(this)).then((function(_this) {
        return function() {
          _this.setScroll(scrollState);
          return _this.calendar.rerenderEvents();
        };
      })(this));
    }
  };


  /*
  	resources param is optional. if not given, gets them from resourceManager
   */

  ResourceView.prototype.assignResources = function(resources) {
    return this.assigningResources || (this.assigningResources = $.when(resources || this.calendar.resourceManager.getResources()).then((function(_this) {
      return function(resources) {
        return _this.setResources(resources);
      };
    })(this)));
  };

  ResourceView.prototype.unassignResources = function() {
    var assigning;
    assigning = this.assigningResources;
    if (assigning) {
      return assigning.then((function(_this) {
        return function() {
          _this.unsetResources();
          return _this.assigningResources = null;
        };
      })(this));
    } else {
      return $.when();
    }
  };

  ResourceView.prototype.setResources = function(resources) {};

  ResourceView.prototype.unsetResources = function() {};

  ResourceView.prototype.renderStoredResources = function() {};

  ResourceView.prototype.unrenderStoredResources = function() {};

  ResourceView.prototype.triggerDayClick = function(cell, dayEl, ev) {
    var resourceManager;
    resourceManager = this.calendar.resourceManager;
    return this.trigger('dayClick', dayEl, cell.start, ev, this, resourceManager.getResourceById(cell.resourceId));
  };

  ResourceView.prototype.triggerSelect = function(range, ev) {
    var resourceManager;
    resourceManager = this.calendar.resourceManager;
    return this.trigger('select', null, range.start, range.end, ev, this, resourceManager.getResourceById(range.resourceId));
  };


  /* Hacks
  	 * ------------------------------------------------------------------------------------------------------------------
  	These triggers usually call mutateEvent with dropLocation, which causes an event modification and rerender.
  	But mutateEvent isn't aware of eventResourceField, so it might be setting the wrong property. Workaround.
  	TODO: normalize somewhere else. maybe make a hook in core.
   */

  ResourceView.prototype.reportEventDrop = function() {
    var dropLocation, event, otherArgs;
    event = arguments[0], dropLocation = arguments[1], otherArgs = 3 <= arguments.length ? slice.call(arguments, 2) : [];
    return ResourceView.__super__.reportEventDrop.apply(this, [event, this.normalizeDropLocation(dropLocation)].concat(slice.call(otherArgs)));
  };

  ResourceView.prototype.reportExternalDrop = function() {
    var dropLocation, meta, otherArgs;
    meta = arguments[0], dropLocation = arguments[1], otherArgs = 3 <= arguments.length ? slice.call(arguments, 2) : [];
    return ResourceView.__super__.reportExternalDrop.apply(this, [meta, this.normalizeDropLocation(dropLocation)].concat(slice.call(otherArgs)));
  };

  ResourceView.prototype.normalizeDropLocation = function(dropLocation) {
    var out;
    out = $.extend({}, dropLocation);
    delete out.resourceId;
    this.calendar.resourceManager.setEventResourceId(out, dropLocation.resourceId);
    return out;
  };

  return ResourceView;

})(View);

ResourceGrid = (function(superClass) {
  extend(ResourceGrid, superClass);

  function ResourceGrid() {
    return ResourceGrid.__super__.constructor.apply(this, arguments);
  }

  ResourceGrid.prototype.eventsToRanges = function(events) {
    var eventRange, eventRanges, j, len;
    eventRanges = ResourceGrid.__super__.eventsToRanges.apply(this, arguments);
    for (j = 0, len = eventRanges.length; j < len; j++) {
      eventRange = eventRanges[j];
      eventRange.resourceId = this.view.calendar.getEventResourceId(eventRange.event);
    }
    return eventRanges;
  };

  ResourceGrid.prototype.eventRangeToSegs = function(eventRange) {
    var j, len, resourceId, seg, segs;
    segs = ResourceGrid.__super__.eventRangeToSegs.apply(this, arguments);
    resourceId = eventRange.resourceId;
    if (resourceId) {
      for (j = 0, len = segs.length; j < len; j++) {
        seg = segs[j];
        seg.resourceId = resourceId;
      }
    }
    return segs;
  };

  ResourceGrid.prototype.selectionRangeToSegs = function(selectionRange) {
    var j, len, resourceId, seg, segs;
    segs = ResourceGrid.__super__.selectionRangeToSegs.apply(this, arguments);
    resourceId = selectionRange.resourceId;
    if (resourceId) {
      for (j = 0, len = segs.length; j < len; j++) {
        seg = segs[j];
        seg.resourceId = resourceId;
      }
    }
    return segs;
  };

  ResourceGrid.prototype.fabricateHelperEvent = function(eventRange, seg) {
    var event;
    event = ResourceGrid.__super__.fabricateHelperEvent.apply(this, arguments);
    this.view.calendar.resourceManager.setEventResourceId(event, eventRange.resourceId);
    return event;
  };

  ResourceGrid.prototype.computeEventDrop = function(startCell, endCell, event) {
    var allowResourceChange, eventRange;
    if (!endCell.resourceId) {
      return null;
    }
    allowResourceChange = true;
    if (!allowResourceChange && startCell.resourceId !== endCell.resourceId) {
      return null;
    }
    eventRange = ResourceGrid.__super__.computeEventDrop.apply(this, arguments);
    if (eventRange) {
      eventRange.resourceId = endCell.resourceId;
    }
    return eventRange;
  };

  ResourceGrid.prototype.computeExternalDrop = function(cell, meta) {
    var eventRange;
    if (!cell.resourceId) {
      return null;
    }
    eventRange = ResourceGrid.__super__.computeExternalDrop.apply(this, arguments);
    if (eventRange) {
      eventRange.resourceId = cell.resourceId;
    }
    return eventRange;
  };

  ResourceGrid.prototype.computeEventResize = function(type, startCell, endCell, event) {
    var eventRange;
    eventRange = ResourceGrid.__super__.computeEventResize.apply(this, arguments);
    if (eventRange) {
      eventRange.resourceId = startCell.resourceId;
    }
    return eventRange;
  };

  ResourceGrid.prototype.computeSelection = function(cell0, cell1) {
    var selectionRange;
    selectionRange = ResourceGrid.__super__.computeSelection.apply(this, arguments);
    if (selectionRange) {
      selectionRange.resourceId = cell0.resourceId;
    }
    return selectionRange;
  };

  return ResourceGrid;

})(Grid);

TimelineView = (function(superClass) {
  extend(TimelineView, superClass);

  function TimelineView() {
    return TimelineView.__super__.constructor.apply(this, arguments);
  }

  TimelineView.prototype.timeGrid = null;

  TimelineView.prototype.isScrolled = false;

  TimelineView.prototype.initialize = function() {
    this.timeGrid = this.instantiateGrid();
    this.intervalDuration = this.timeGrid.duration;
    return this.coordMap = this.timeGrid.coordMap;
  };

  TimelineView.prototype.instantiateGrid = function() {
    return new TimelineGrid(this);
  };

  TimelineView.prototype.setRange = function(range) {
    TimelineView.__super__.setRange.apply(this, arguments);
    return this.timeGrid.setRange(range);
  };

  TimelineView.prototype.renderSkeleton = function() {
    this.el.addClass('fc-timeline');
    if (this.opt('eventOverlap') === false) {
      this.el.addClass('fc-no-overlap');
    }
    this.el.html(this.renderSkeletonHtml());
    return this.renderTimeGridSkeleton();
  };

  TimelineView.prototype.renderSkeletonHtml = function() {
    return '<table> <thead class="fc-head"> <tr> <td class="fc-time-area ' + this.widgetHeaderClass + '"></td> </tr> </thead> <tbody class="fc-body"> <tr> <td class="fc-time-area ' + this.widgetContentClass + '"></td> </tr> </tbody> </table>';
  };

  TimelineView.prototype.renderTimeGridSkeleton = function() {
    this.timeGrid.setElement(this.el.find('tbody .fc-time-area'));
    this.timeGrid.headEl = this.el.find('thead .fc-time-area');
    this.timeGrid.renderSkeleton();
    this.isScrolled = false;
    return this.timeGrid.bodyScroller.on('scroll', proxy(this, 'handleBodyScroll'));
  };

  TimelineView.prototype.handleBodyScroll = function(top, left) {
    if (top) {
      if (!this.isScrolled) {
        this.isScrolled = true;
        return this.el.addClass('fc-scrolled');
      }
    } else {
      if (this.isScrolled) {
        this.isScrolled = false;
        return this.el.removeClass('fc-scrolled');
      }
    }
  };

  TimelineView.prototype.unrenderSkeleton = function() {
    this.timeGrid.removeElement();
    this.handleBodyScroll(0);
    return TimelineView.__super__.unrenderSkeleton.apply(this, arguments);
  };

  TimelineView.prototype.renderDates = function() {
    return this.timeGrid.renderDates();
  };

  TimelineView.prototype.unrenderDates = function() {
    return this.timeGrid.unrenderDates();
  };

  TimelineView.prototype.renderBusinessHours = function() {
    return this.timeGrid.renderBusinessHours();
  };

  TimelineView.prototype.unrenderBusinessHours = function() {
    return this.timeGrid.unrenderBusinessHours();
  };

  TimelineView.prototype.updateWidth = function() {
    return this.timeGrid.updateWidth();
  };

  TimelineView.prototype.setHeight = function(totalHeight, isAuto) {
    var bodyHeight;
    if (isAuto) {
      bodyHeight = 'auto';
    } else {
      bodyHeight = totalHeight - this.timeGrid.headHeight() - this.queryMiscHeight();
    }
    return this.timeGrid.bodyScroller.setHeight(bodyHeight);
  };

  TimelineView.prototype.queryMiscHeight = function() {
    return this.el.outerHeight() - this.timeGrid.headScroller.el.outerHeight() - this.timeGrid.bodyScroller.el.outerHeight();
  };

  TimelineView.prototype.computeInitialScroll = function(prevScrollState) {
    return this.timeGrid.computeInitialScroll(prevScrollState);
  };

  TimelineView.prototype.queryScroll = function() {
    return this.timeGrid.queryScroll();
  };

  TimelineView.prototype.setScroll = function(state) {
    return this.timeGrid.setScroll(state);
  };

  TimelineView.prototype.renderEvents = function(events) {
    this.timeGrid.renderEvents(events);
    return this.updateWidth();
  };

  TimelineView.prototype.unrenderEvents = function() {
    this.timeGrid.unrenderEvents();
    return this.updateWidth();
  };

  TimelineView.prototype.renderDrag = function(dropLocation, seg) {
    return this.timeGrid.renderDrag(dropLocation, seg);
  };

  TimelineView.prototype.unrenderDrag = function() {
    return this.timeGrid.unrenderDrag();
  };

  TimelineView.prototype.getEventSegs = function() {
    return this.timeGrid.getEventSegs();
  };

  TimelineView.prototype.renderSelection = function(range) {
    return this.timeGrid.renderSelection(range);
  };

  TimelineView.prototype.unrenderSelection = function() {
    return this.timeGrid.unrenderSelection();
  };

  return TimelineView;

})(View);

cssToStr = FC.cssToStr;

TimelineGrid = (function(superClass) {
  extend(TimelineGrid, superClass);

  TimelineGrid.prototype.slotDates = null;

  TimelineGrid.prototype.headEl = null;

  TimelineGrid.prototype.slatContainerEl = null;

  TimelineGrid.prototype.slatEls = null;

  TimelineGrid.prototype.slatElCoords = null;

  TimelineGrid.prototype.headScroller = null;

  TimelineGrid.prototype.bodyScroller = null;

  TimelineGrid.prototype.joiner = null;

  TimelineGrid.prototype.follower = null;

  TimelineGrid.prototype.eventTitleFollower = null;

  TimelineGrid.prototype.minTime = null;

  TimelineGrid.prototype.maxTime = null;

  TimelineGrid.prototype.slotDuration = null;

  TimelineGrid.prototype.snapDuration = null;

  TimelineGrid.prototype.slotCnt = null;

  TimelineGrid.prototype.snapDiffToCol = null;

  TimelineGrid.prototype.colToSnapDiff = null;

  TimelineGrid.prototype.colsPerSlot = null;

  TimelineGrid.prototype.duration = null;

  TimelineGrid.prototype.labelInterval = null;

  TimelineGrid.prototype.headerFormats = null;

  TimelineGrid.prototype.isTimeScale = null;

  TimelineGrid.prototype.largeUnit = null;

  TimelineGrid.prototype.emphasizeWeeks = false;

  TimelineGrid.prototype.titleFollower = null;

  TimelineGrid.prototype.segContainerEl = null;

  TimelineGrid.prototype.segContainerHeight = null;

  TimelineGrid.prototype.bgSegContainerEl = null;

  TimelineGrid.prototype.helperEls = null;

  TimelineGrid.prototype.innerEl = null;

  function TimelineGrid() {
    var input;
    TimelineGrid.__super__.constructor.apply(this, arguments);
    this.initScaleProps();
    this.minTime = moment.duration(this.opt('minTime') || '00:00');
    this.maxTime = moment.duration(this.opt('maxTime') || '24:00');
    this.snapDuration = (input = this.opt('snapDuration')) ? moment.duration(input) : this.slotDuration;
    this.cellDuration = this.snapDuration;
    this.colsPerSlot = divideDurationByDuration(this.slotDuration, this.snapDuration);
    this.slotWidth = this.opt('slotWidth');
  }

  TimelineGrid.prototype.opt = function(name) {
    return this.view.opt(name);
  };

  TimelineGrid.prototype.isValidDate = function(date) {
    var time;
    if (this.view.isHiddenDay(date)) {
      return false;
    } else if (this.isTimeScale) {
      time = date.time();
      return time >= this.minTime && time < this.maxTime;
    } else {
      return true;
    }
  };

  TimelineGrid.prototype.computeDisplayEventTime = function() {
    return !this.isTimeScale;
  };

  TimelineGrid.prototype.computeDisplayEventEnd = function() {
    return false;
  };

  TimelineGrid.prototype.computeEventTimeFormat = function() {
    return this.opt('extraSmallTimeFormat');
  };


  /*
  	Makes the given date consistent with isTimeScale/largeUnit,
  	so, either removes the times, ensures a time, or makes it the startOf largeUnit.
  	Strips all timezones. Returns new copy.
  	TODO: should maybe be called "normalizeRangeDate".
   */

  TimelineGrid.prototype.normalizeGridDate = function(date) {
    var normalDate;
    if (this.isTimeScale) {
      normalDate = date.clone().stripZone();
      if (!normalDate.hasTime()) {
        normalDate.time(0);
      }
    } else {
      normalDate = date.clone().stripTime();
      if (this.largeUnit) {
        normalDate.startOf(this.largeUnit);
      }
    }
    return normalDate;
  };

  TimelineGrid.prototype.normalizeGridRange = function(range) {
    var adjustedEnd, normalRange;
    if (this.isTimeScale) {
      normalRange = {
        start: this.normalizeGridDate(range.start),
        end: this.normalizeGridDate(range.end)
      };
    } else {
      normalRange = this.view.computeDayRange(range);
      if (this.largeUnit) {
        normalRange.start.startOf(this.largeUnit);
        adjustedEnd = normalRange.end.clone().startOf(this.largeUnit);
        if (!adjustedEnd.isSame(normalRange.end) || !adjustedEnd.isAfter(normalRange.start)) {
          adjustedEnd.add(this.slotDuration);
        }
        normalRange.end = adjustedEnd;
      }
    }
    return normalRange;
  };

  TimelineGrid.prototype.rangeUpdated = function() {
    var date, slotDates;
    this.start = this.normalizeGridDate(this.start);
    this.end = this.normalizeGridDate(this.end);
    slotDates = [];
    date = this.start.clone();
    while (date < this.end) {
      if (this.isValidDate(date)) {
        slotDates.push(date.clone());
      }
      date.add(this.slotDuration);
    }
    this.slotDates = slotDates;
    return this.updateGridDates();
  };

  TimelineGrid.prototype.updateGridDates = function() {
    var col, colToSnapDiff, date, snapDiffToCol, snapIndex;
    col = -1;
    snapIndex = 0;
    snapDiffToCol = [];
    colToSnapDiff = [];
    date = this.start.clone();
    while (date < this.end) {
      if (this.isValidDate(date)) {
        col++;
        snapDiffToCol.push(col);
        colToSnapDiff.push(snapIndex);
      } else {
        snapDiffToCol.push(col + 0.5);
      }
      date.add(this.snapDuration);
      snapIndex++;
    }
    this.snapDiffToCol = snapDiffToCol;
    this.colToSnapDiff = colToSnapDiff;
    return this.colCnt = col + 1;
  };

  TimelineGrid.prototype.build = function() {
    return this.rowCnt = 1;
  };

  TimelineGrid.prototype.getRowEl = function() {
    return this.bodyScroller.contentEl;
  };

  TimelineGrid.prototype.getCellDayEl = function(cell) {
    return this.slatEls.eq(Math.floor(cell.col / this.colsPerSlot));
  };

  TimelineGrid.prototype.computeColCoords = function() {
    var coords, date;
    coords = [];
    date = this.start.clone();
    while (date < this.end) {
      if (this.isValidDate(date)) {
        coords.push(this.rangeToOffsets({
          start: date,
          end: date.clone().add(this.snapDuration)
        }));
      }
      date.add(this.snapDuration);
    }
    return coords;
  };

  TimelineGrid.prototype.computeCellRange = function(cell) {
    var end, start;
    start = this.start.clone();
    start = this.view.calendar.rezoneDate(start);
    start.add(multiplyDuration(this.snapDuration, this.colToSnapDiff[cell.col]));
    end = start.clone().add(this.snapDuration);
    return {
      start: start,
      end: end
    };
  };

  TimelineGrid.prototype.rangeToSegs = function(range) {
    var normalRange, seg;
    normalRange = this.normalizeGridRange(range);
    seg = intersectionToSeg(normalRange, this);
    if (seg) {
      if (seg.isStart && !this.isValidDate(seg.start)) {
        seg.isStart = false;
      }
      if (seg.isEnd && seg.end && !this.isValidDate(seg.end.clone().subtract(1))) {
        seg.isEnd = false;
      }
      return [seg];
    } else {
      return [];
    }
  };

  TimelineGrid.prototype.renderSkeleton = function() {
    this.headScroller = new Scroller('invisible-scroll', 'hidden');
    this.headEl.append(this.headScroller.el);
    this.bodyScroller = new Scroller();
    this.el.append(this.bodyScroller.el);
    this.innerEl = this.bodyScroller.contentEl;
    this.slatContainerEl = $('<div class="fc-slats"/>').appendTo(this.bodyScroller.bgEl);
    this.segContainerEl = $('<div class="fc-event-container"/>').appendTo(this.bodyScroller.contentEl);
    this.bgSegContainerEl = this.bodyScroller.bgEl;
    this.coordMap.containerEl = this.bodyScroller.scrollEl;
    this.joiner = new ScrollJoiner('horizontal', [this.headScroller, this.bodyScroller]);
    if (true) {
      this.follower = new ScrollFollower(this.headScroller);
    }
    if (true) {
      this.eventTitleFollower = new ScrollFollower(this.bodyScroller);
      this.eventTitleFollower.minTravel = 50;
      if (this.isRTL) {
        this.eventTitleFollower.containOnNaturalRight = true;
      } else {
        this.eventTitleFollower.containOnNaturalLeft = true;
      }
    }
    return TimelineGrid.__super__.renderSkeleton.apply(this, arguments);
  };

  TimelineGrid.prototype.headColEls = null;

  TimelineGrid.prototype.slatColEls = null;

  TimelineGrid.prototype.renderDates = function() {
    var date, i, j, len, ref;
    this.headScroller.contentEl.html(this.renderHeadHtml());
    this.headColEls = this.headScroller.contentEl.find('col');
    this.slatContainerEl.html(this.renderSlatHtml());
    this.slatColEls = this.slatContainerEl.find('col');
    this.slatEls = this.slatContainerEl.find('td');
    ref = this.slotDates;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      date = ref[i];
      this.view.trigger('dayRender', null, date, this.slatEls.eq(i));
    }
    if (this.follower) {
      return this.follower.setSprites(this.headEl.find('tr:not(:last-child) span'));
    }
  };

  TimelineGrid.prototype.unrenderDates = function() {
    if (this.follower) {
      this.follower.clearSprites();
    }
    this.headScroller.contentEl.empty();
    this.slatContainerEl.empty();
    return this.headScroller.contentEl.add(this.bodyScroller.contentEl).css({
      minWidth: '',
      width: ''
    });
  };

  TimelineGrid.prototype.renderHeadHtml = function() {
    var cell, cellRows, date, format, formats, html, i, isChrono, isLast, isSuperRow, isWeekStart, j, k, l, labelInterval, leadingCell, len, len1, len2, len3, len4, len5, len6, m, n, newCell, p, prevWeekNumber, q, row, rowCells, slatHtml, slotCells, slotDates, text, weekNumber;
    labelInterval = this.labelInterval;
    formats = this.headerFormats;
    cellRows = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = formats.length; j < len; j++) {
        format = formats[j];
        results.push([]);
      }
      return results;
    })();
    leadingCell = null;
    prevWeekNumber = null;
    slotDates = this.slotDates;
    slotCells = [];
    for (j = 0, len = slotDates.length; j < len; j++) {
      date = slotDates[j];
      weekNumber = date.week();
      isWeekStart = this.emphasizeWeeks && prevWeekNumber !== null && prevWeekNumber !== weekNumber;
      for (row = k = 0, len1 = formats.length; k < len1; row = ++k) {
        format = formats[row];
        rowCells = cellRows[row];
        leadingCell = rowCells[rowCells.length - 1];
        isSuperRow = formats.length > 1 && row < formats.length - 1;
        newCell = null;
        if (isSuperRow) {
          text = date.format(format);
          if (!leadingCell || leadingCell.text !== text) {
            newCell = {
              text: text,
              colspan: 1
            };
          } else {
            leadingCell.colspan += 1;
          }
        } else {
          if (!leadingCell || isInt(divideRangeByDuration(this.start, date, labelInterval))) {
            text = date.format(format);
            newCell = {
              text: text,
              colspan: 1
            };
          } else {
            leadingCell.colspan += 1;
          }
        }
        if (newCell) {
          newCell.weekStart = isWeekStart;
          rowCells.push(newCell);
        }
      }
      slotCells.push({
        weekStart: isWeekStart
      });
      prevWeekNumber = weekNumber;
    }
    isChrono = labelInterval > this.slotDuration;
    html = '<table>';
    html += '<colgroup>';
    for (l = 0, len2 = slotDates.length; l < len2; l++) {
      date = slotDates[l];
      html += '<col/>';
    }
    html += '</colgroup>';
    html += '<tbody>';
    for (i = m = 0, len3 = cellRows.length; m < len3; i = ++m) {
      rowCells = cellRows[i];
      isLast = i === cellRows.length - 1;
      html += '<tr' + (isChrono && isLast ? ' class="fc-chrono"' : '') + '>';
      for (n = 0, len4 = rowCells.length; n < len4; n++) {
        cell = rowCells[n];
        html += '<th class="' + this.view.widgetHeaderClass + ' ' + (cell.weekStart ? 'fc-em-cell' : '') + '"' + (cell.colspan > 1 ? ' colspan="' + cell.colspan + '"' : '') + '>' + '<div class="fc-cell-content">' + '<span class="fc-cell-text">' + htmlEscape(cell.text) + '</span>' + '</div>' + '</th>';
      }
      html += '</tr>';
    }
    html += '</tbody></table>';
    slatHtml = '<table>';
    slatHtml += '<colgroup>';
    for (p = 0, len5 = slotCells.length; p < len5; p++) {
      cell = slotCells[p];
      slatHtml += '<col/>';
    }
    slatHtml += '</colgroup>';
    slatHtml += '<tbody><tr>';
    for (i = q = 0, len6 = slotCells.length; q < len6; i = ++q) {
      cell = slotCells[i];
      date = slotDates[i];
      slatHtml += this.slatCellHtml(date, cell.weekStart);
    }
    slatHtml += '</tr></tbody></table>';
    this._slatHtml = slatHtml;
    return html;
  };

  TimelineGrid.prototype.renderSlatHtml = function() {
    return this._slatHtml;
  };

  TimelineGrid.prototype.slatCellHtml = function(date, isEm) {
    var classes;
    if (this.isTimeScale) {
      classes = [];
      classes.push(isInt(divideRangeByDuration(this.start, date, this.labelInterval)) ? 'fc-major' : 'fc-minor');
    } else {
      classes = this.getDayClasses(date);
      classes.push('fc-day');
    }
    classes.unshift(this.view.widgetContentClass);
    if (isEm) {
      classes.push('fc-em-cell');
    }
    return '<td class="' + classes.join(' ') + '"' + ' data-date="' + date.format() + '"' + '><div /></td>';
  };

  TimelineGrid.prototype.businessHourSegs = null;

  TimelineGrid.prototype.renderBusinessHours = function() {
    var events, segs;
    if (!this.largeUnit) {
      events = this.view.calendar.getBusinessHoursEvents(!this.isTimeScale);
      segs = this.businessHourSegs = this.eventsToSegs(events);
      return this.renderFill('businessHours', segs, 'bgevent');
    }
  };

  TimelineGrid.prototype.unrenderBusinessHours = function() {
    return this.unrenderFill('businessHours');
  };

  TimelineGrid.prototype.explicitSlotWidth = null;

  TimelineGrid.prototype.defaultSlotWidth = null;

  TimelineGrid.prototype.updateWidth = function() {
    var availableWidth, containerMinWidth, containerWidth, nonLastSlotWidth, slotWidth;
    slotWidth = Math.round(this.slotWidth || (this.slotWidth = this.computeSlotWidth()));
    containerWidth = slotWidth * this.slotDates.length;
    containerMinWidth = '';
    nonLastSlotWidth = slotWidth;
    availableWidth = this.bodyScroller.scrollEl[0].clientWidth;
    if (availableWidth > containerWidth) {
      containerMinWidth = availableWidth;
      containerWidth = '';
      nonLastSlotWidth = Math.floor(availableWidth / this.slotDates.length);
    }
    this.headScroller.setContentWidth(containerWidth);
    this.headScroller.setContentMinWidth(containerMinWidth);
    this.bodyScroller.setContentWidth(containerWidth);
    this.bodyScroller.setContentMinWidth(containerMinWidth);
    this.headColEls.slice(0, -1).add(this.slatColEls.slice(0, -1)).width(nonLastSlotWidth);
    this.headScroller.update();
    this.bodyScroller.update();
    this.joiner.update();
    this.updateSlatElCoords();
    this.updateSegPositions();
    if (this.follower) {
      this.follower.update();
    }
    if (this.eventTitleFollower) {
      return this.eventTitleFollower.update();
    }
  };

  TimelineGrid.prototype.computeSlotWidth = function() {
    var headerWidth, innerEls, maxInnerWidth, minWidth, slotWidth, slotsPerLabel;
    maxInnerWidth = 0;
    innerEls = this.headEl.find('tr:last-child th span');
    innerEls.each(function(i, node) {
      var innerWidth;
      innerWidth = $(node).outerWidth();
      return maxInnerWidth = Math.max(maxInnerWidth, innerWidth);
    });
    headerWidth = maxInnerWidth + 1;
    slotsPerLabel = divideDurationByDuration(this.labelInterval, this.slotDuration);
    slotWidth = Math.ceil(headerWidth / slotsPerLabel);
    minWidth = this.headColEls.eq(0).css('min-width');
    if (minWidth) {
      minWidth = parseInt(minWidth, 10);
      if (minWidth) {
        slotWidth = Math.max(slotWidth, minWidth);
      }
    }
    return slotWidth;
  };

  TimelineGrid.prototype.updateSlatElCoords = function() {
    var coords, divs, i, origin, originEl, slatEl;
    divs = this.slatEls.find('> div');
    originEl = this.bodyScroller.innerEl;
    if (this.isRTL) {
      origin = originEl.offset().left + originEl.outerWidth();
      coords = (function() {
        var j, len, results;
        results = [];
        for (i = j = 0, len = divs.length; j < len; i = ++j) {
          slatEl = divs[i];
          results.push($(slatEl).offset().left + $(slatEl).outerWidth() - origin);
        }
        return results;
      })();
      coords[i] = $(slatEl).offset().left - origin;
    } else {
      origin = originEl.offset().left;
      coords = (function() {
        var j, len, results;
        results = [];
        for (i = j = 0, len = divs.length; j < len; i = ++j) {
          slatEl = divs[i];
          results.push($(slatEl).offset().left - origin);
        }
        return results;
      })();
      coords[i] = $(slatEl).offset().left + $(slatEl).outerWidth() - origin;
    }
    return this.slatElCoords = coords;
  };

  TimelineGrid.prototype.dateToCol = function(date) {
    var col, snapDiff, snapDiffInt, snapDiffRemainder;
    date = date.clone().stripZone();
    snapDiff = divideRangeByDuration(this.start, date, this.snapDuration);
    if (snapDiff < 0) {
      return 0;
    } else if (snapDiff >= this.snapDiffToCol.length) {
      return this.colCnt;
    } else {
      snapDiffInt = Math.floor(snapDiff);
      snapDiffRemainder = snapDiff - snapDiffInt;
      col = this.snapDiffToCol[snapDiffInt];
      if (isInt(col) && snapDiffRemainder) {
        col += snapDiffRemainder;
      }
      return col;
    }
  };

  TimelineGrid.prototype.dateToCoord = function(date) {
    var col, coord0, coord1, index0, ms0, ms1, partial, slotIndex;
    date = date.clone().stripZone();
    col = this.dateToCol(date);
    slotIndex = col / this.colsPerSlot;
    slotIndex = Math.max(slotIndex, 0);
    slotIndex = Math.min(slotIndex, this.slotDates.length);
    if (isInt(slotIndex)) {
      return this.slatElCoords[slotIndex];
    } else {
      index0 = Math.floor(slotIndex);
      ms0 = +this.slotDates[index0];
      ms1 = +this.slotDates[index0].clone().add(this.slotDuration);
      partial = (date - ms0) / (ms1 - ms0);
      partial = Math.min(partial, 1);
      coord0 = this.slatElCoords[index0];
      coord1 = this.slatElCoords[index0 + 1];
      return coord0 + (coord1 - coord0) * partial;
    }
  };

  TimelineGrid.prototype.rangeToCoords = function(range) {
    if (this.isRTL) {
      return {
        right: this.dateToCoord(range.start),
        left: this.dateToCoord(range.end)
      };
    } else {
      return {
        left: this.dateToCoord(range.start),
        right: this.dateToCoord(range.end)
      };
    }
  };

  TimelineGrid.prototype.rangeToOffsets = function(range) {
    var coords, origin;
    coords = this.rangeToCoords(range);
    origin = this.isRTL ? this.slatContainerEl.offset().left + this.slatContainerEl.outerWidth() : this.slatContainerEl.offset().left;
    coords.left += origin;
    coords.right += origin;
    return coords;
  };

  TimelineGrid.prototype.headHeight = function() {
    var table;
    table = this.headScroller.contentEl.find('table');
    return table.height.apply(table, arguments);
  };

  TimelineGrid.prototype.updateSegPositions = function() {
    var coords, j, len, seg, segs;
    segs = (this.segs || []).concat(this.businessHourSegs || []);
    for (j = 0, len = segs.length; j < len; j++) {
      seg = segs[j];
      coords = this.rangeToCoords(seg, -1);
      seg.el.css({
        left: (seg.left = coords.left),
        right: -(seg.right = coords.right)
      });
    }
  };

  TimelineGrid.prototype.computeInitialScroll = function(prevState) {
    var left, scrollTime;
    left = 0;
    if (this.isTimeScale) {
      scrollTime = this.opt('scrollTime');
      if (scrollTime) {
        scrollTime = moment.duration(scrollTime);
        left = this.dateToCoord(this.start.clone().time(scrollTime));
      }
    }
    return {
      left: left,
      top: 0
    };
  };

  TimelineGrid.prototype.queryScroll = function() {
    return {
      left: normalizedHScroll(this.bodyScroller.scrollEl),
      top: this.bodyScroller.scrollEl.scrollTop()
    };
  };

  TimelineGrid.prototype.setScroll = function(state) {
    normalizedHScroll(this.headScroller.scrollEl, state.left);
    normalizedHScroll(this.bodyScroller.scrollEl, state.left);
    return this.bodyScroller.scrollEl.scrollTop(state.top);
  };

  TimelineGrid.prototype.renderFgSegs = function(segs) {
    segs = this.renderFgSegEls(segs);
    this.renderFgSegsInContainers([[this, segs]]);
    this.updateSegFollowers(segs);
    return segs;
  };

  TimelineGrid.prototype.unrenderFgSegs = function() {
    this.clearSegFollowers();
    return this.unrenderFgContainers([this]);
  };

  TimelineGrid.prototype.renderFgSegsInContainers = function(pairs) {
    var container, coords, j, k, l, len, len1, len2, len3, len4, len5, len6, len7, m, n, p, q, r, ref, ref1, ref2, ref3, results, seg, segs;
    for (j = 0, len = pairs.length; j < len; j++) {
      ref = pairs[j], container = ref[0], segs = ref[1];
      for (k = 0, len1 = segs.length; k < len1; k++) {
        seg = segs[k];
        coords = this.rangeToCoords(seg, -1);
        seg.el.css({
          left: (seg.left = coords.left),
          right: -(seg.right = coords.right)
        });
      }
    }
    for (l = 0, len2 = pairs.length; l < len2; l++) {
      ref1 = pairs[l], container = ref1[0], segs = ref1[1];
      for (m = 0, len3 = segs.length; m < len3; m++) {
        seg = segs[m];
        seg.el.appendTo(container.segContainerEl);
      }
    }
    for (n = 0, len4 = pairs.length; n < len4; n++) {
      ref2 = pairs[n], container = ref2[0], segs = ref2[1];
      for (p = 0, len5 = segs.length; p < len5; p++) {
        seg = segs[p];
        seg.height = seg.el.outerHeight(true);
      }
      this.buildSegLevels(segs);
      container.segContainerHeight = computeOffsetForSegs(segs);
    }
    results = [];
    for (q = 0, len6 = pairs.length; q < len6; q++) {
      ref3 = pairs[q], container = ref3[0], segs = ref3[1];
      for (r = 0, len7 = segs.length; r < len7; r++) {
        seg = segs[r];
        seg.el.css('top', seg.top);
      }
      results.push(container.segContainerEl.height(container.segContainerHeight));
    }
    return results;
  };

  TimelineGrid.prototype.buildSegLevels = function(segs) {
    var belowSeg, isLevelCollision, j, k, l, len, len1, len2, level, placedSeg, ref, ref1, segLevels, unplacedSeg;
    segLevels = [];
    this.sortSegs(segs);
    for (j = 0, len = segs.length; j < len; j++) {
      unplacedSeg = segs[j];
      unplacedSeg.above = [];
      level = 0;
      while (level < segLevels.length) {
        isLevelCollision = false;
        ref = segLevels[level];
        for (k = 0, len1 = ref.length; k < len1; k++) {
          placedSeg = ref[k];
          if (timeRowSegsCollide(unplacedSeg, placedSeg)) {
            unplacedSeg.above.push(placedSeg);
            isLevelCollision = true;
          }
        }
        if (isLevelCollision) {
          level += 1;
        } else {
          break;
        }
      }
      (segLevels[level] || (segLevels[level] = [])).push(unplacedSeg);
      level += 1;
      while (level < segLevels.length) {
        ref1 = segLevels[level];
        for (l = 0, len2 = ref1.length; l < len2; l++) {
          belowSeg = ref1[l];
          if (timeRowSegsCollide(unplacedSeg, belowSeg)) {
            belowSeg.above.push(unplacedSeg);
          }
        }
        level += 1;
      }
    }
    return segLevels;
  };

  TimelineGrid.prototype.unrenderFgContainers = function(containers) {
    var container, j, len, results;
    results = [];
    for (j = 0, len = containers.length; j < len; j++) {
      container = containers[j];
      container.segContainerEl.empty();
      container.segContainerEl.height('');
      results.push(container.segContainerHeight = null);
    }
    return results;
  };

  TimelineGrid.prototype.fgSegHtml = function(seg, disableResizing) {
    var classes, event, isDraggable, isResizableFromEnd, isResizableFromStart, timeText;
    event = seg.event;
    isDraggable = this.view.isEventDraggable(event);
    isResizableFromStart = seg.isStart && this.view.isEventResizableFromStart(event);
    isResizableFromEnd = seg.isEnd && this.view.isEventResizableFromEnd(event);
    classes = this.getSegClasses(seg, isDraggable, isResizableFromStart || isResizableFromEnd);
    classes.unshift('fc-timeline-event', 'fc-h-event');
    timeText = this.getEventTimeText(event);
    return '<a class="' + classes.join(' ') + '" style="' + cssToStr(this.getEventSkinCss(event)) + '"' + (event.url ? ' href="' + htmlEscape(event.url) + '"' : '') + '>' + '<div class="fc-content">' + (timeText ? '<span class="fc-time">' + htmlEscape(timeText) + '</span>' : '') + '<span class="fc-title">' + (event.title ? htmlEscape(event.title) : '&nbsp;') + '</span>' + '</div>' + '<div class="fc-bg" />' + (isResizableFromStart ? '<div class="fc-resizer fc-start-resizer"></div>' : '') + (isResizableFromEnd ? '<div class="fc-resizer fc-end-resizer"></div>' : '') + '</a>';
  };

  TimelineGrid.prototype.updateSegFollowers = function(segs) {
    var j, len, seg, sprites, titleEl;
    if (this.eventTitleFollower) {
      sprites = [];
      for (j = 0, len = segs.length; j < len; j++) {
        seg = segs[j];
        titleEl = seg.el.find('.fc-title');
        if (titleEl.length) {
          sprites.push(new ScrollFollowerSprite(titleEl));
        }
      }
      return this.eventTitleFollower.setSprites(sprites);
    }
  };

  TimelineGrid.prototype.clearSegFollowers = function() {
    if (this.eventTitleFollower) {
      return this.eventTitleFollower.clearSprites();
    }
  };

  TimelineGrid.prototype.segDragStart = function() {
    TimelineGrid.__super__.segDragStart.apply(this, arguments);
    if (this.eventTitleFollower) {
      return this.eventTitleFollower.forceRelative();
    }
  };

  TimelineGrid.prototype.segDragEnd = function() {
    TimelineGrid.__super__.segDragEnd.apply(this, arguments);
    if (this.eventTitleFollower) {
      return this.eventTitleFollower.clearForce();
    }
  };

  TimelineGrid.prototype.segResizeStart = function() {
    TimelineGrid.__super__.segResizeStart.apply(this, arguments);
    if (this.eventTitleFollower) {
      return this.eventTitleFollower.forceRelative();
    }
  };

  TimelineGrid.prototype.segResizeEnd = function() {
    TimelineGrid.__super__.segResizeEnd.apply(this, arguments);
    if (this.eventTitleFollower) {
      return this.eventTitleFollower.clearForce();
    }
  };

  TimelineGrid.prototype.renderHelper = function(event, sourceSeg) {
    var segs;
    segs = this.eventsToSegs([event]);
    segs = this.renderFgSegEls(segs);
    return this.renderHelperSegsInContainers([[this, segs]], sourceSeg);
  };

  TimelineGrid.prototype.renderHelperSegsInContainers = function(pairs, sourceSeg) {
    var containerObj, coords, helperContainerEl, helperNodes, j, k, l, len, len1, len2, len3, m, ref, ref1, ref2, seg, segs;
    helperNodes = [];
    for (j = 0, len = pairs.length; j < len; j++) {
      ref = pairs[j], containerObj = ref[0], segs = ref[1];
      for (k = 0, len1 = segs.length; k < len1; k++) {
        seg = segs[k];
        coords = this.rangeToCoords(seg, -1);
        seg.el.css({
          left: (seg.left = coords.left),
          right: -(seg.right = coords.right)
        });
        if (sourceSeg && sourceSeg.resourceId === ((ref1 = containerObj.resource) != null ? ref1.id : void 0)) {
          seg.el.css('top', sourceSeg.el.css('top'));
        } else {
          seg.el.css('top', 0);
        }
      }
    }
    for (l = 0, len2 = pairs.length; l < len2; l++) {
      ref2 = pairs[l], containerObj = ref2[0], segs = ref2[1];
      helperContainerEl = $('<div class="fc-event-container fc-helper-container"/>').appendTo(containerObj.innerEl);
      helperNodes.push(helperContainerEl[0]);
      for (m = 0, len3 = segs.length; m < len3; m++) {
        seg = segs[m];
        helperContainerEl.append(seg.el);
      }
    }
    if (this.helperEls) {
      return this.helperEls = this.helperEls.add($(helperNodes));
    } else {
      return this.helperEls = $(helperNodes);
    }
  };

  TimelineGrid.prototype.unrenderHelper = function() {
    if (this.helperEls) {
      this.helperEls.remove();
      return this.helperEls = null;
    }
  };

  TimelineGrid.prototype.renderEventResize = function(range, seg) {
    this.renderHighlight(this.eventRangeToSegs(range));
    return this.renderRangeHelper(range, seg);
  };

  TimelineGrid.prototype.unrenderEventResize = function() {
    this.unrenderHighlight();
    return this.unrenderHelper();
  };

  TimelineGrid.prototype.renderFill = function(type, segs, className) {
    segs = this.renderFillSegEls(type, segs);
    this.renderFillInContainers(type, [[this, segs]], className);
    return segs;
  };

  TimelineGrid.prototype.renderFillInContainers = function(type, pairs, className) {
    var containerObj, j, len, ref, results, segs;
    results = [];
    for (j = 0, len = pairs.length; j < len; j++) {
      ref = pairs[j], containerObj = ref[0], segs = ref[1];
      results.push(this.renderFillInContainer(type, containerObj, segs, className));
    }
    return results;
  };

  TimelineGrid.prototype.renderFillInContainer = function(type, containerObj, segs, className) {
    var containerEl, coords, j, len, seg;
    if (segs.length) {
      className || (className = type.toLowerCase());
      containerEl = $('<div class="fc-' + className + '-container" />').appendTo(containerObj.bgSegContainerEl);
      for (j = 0, len = segs.length; j < len; j++) {
        seg = segs[j];
        coords = this.rangeToCoords(seg, -1);
        seg.el.css({
          left: (seg.left = coords.left),
          right: -(seg.right = coords.right)
        });
        seg.el.appendTo(containerEl);
      }
      if (this.elsByFill[type]) {
        return this.elsByFill[type] = this.elsByFill[type].add(containerEl);
      } else {
        return this.elsByFill[type] = containerEl;
      }
    }
  };

  TimelineGrid.prototype.renderDrag = function(dropLocation, seg) {
    if (seg) {
      this.renderRangeHelper(dropLocation, seg);
      this.applyDragOpacity(this.helperEls);
      return true;
    } else {
      this.renderHighlight(this.eventRangeToSegs(dropLocation));
      return false;
    }
  };

  TimelineGrid.prototype.unrenderDrag = function() {
    this.unrenderHelper();
    return this.unrenderHighlight();
  };

  return TimelineGrid;

})(Grid);

computeOffsetForSegs = function(segs) {
  var j, len, max, seg;
  max = 0;
  for (j = 0, len = segs.length; j < len; j++) {
    seg = segs[j];
    max = Math.max(max, computeOffsetForSeg(seg));
  }
  return max;
};

computeOffsetForSeg = function(seg) {
  if (seg.top == null) {
    seg.top = computeOffsetForSegs(seg.above);
  }
  return seg.top + seg.height;
};

timeRowSegsCollide = function(seg0, seg1) {
  return seg0.left < seg1.right && seg0.right > seg1.left;
};

MIN_AUTO_LABELS = 18;

MAX_AUTO_SLOTS_PER_LABEL = 6;

MAX_AUTO_CELLS = 200;

MAX_CELLS = 1000;

DEFAULT_GRID_DURATION = {
  months: 1
};

STOCK_SUB_DURATIONS = [
  {
    years: 1
  }, {
    months: 1
  }, {
    days: 1
  }, {
    hours: 1
  }, {
    minutes: 30
  }, {
    minutes: 15
  }, {
    minutes: 10
  }, {
    minutes: 5
  }, {
    minutes: 1
  }, {
    seconds: 30
  }, {
    seconds: 15
  }, {
    seconds: 10
  }, {
    seconds: 5
  }, {
    seconds: 1
  }, {
    milliseconds: 500
  }, {
    milliseconds: 100
  }, {
    milliseconds: 10
  }, {
    milliseconds: 1
  }
];

TimelineGrid.prototype.initScaleProps = function() {
  var input, slotUnit, type;
  this.labelInterval = this.queryDurationOption('slotLabelInterval');
  this.slotDuration = this.queryDurationOption('slotDuration');
  this.ensureGridDuration();
  this.validateLabelAndSlot();
  this.ensureLabelInterval();
  this.ensureSlotDuration();
  input = this.opt('slotLabelFormat');
  type = $.type(input);
  this.headerFormats = type === 'array' ? input : type === 'string' ? [input] : this.computeHeaderFormats();
  this.isTimeScale = durationHasTime(this.slotDuration);
  this.largeUnit = !this.isTimeScale ? (slotUnit = computeIntervalUnit(this.slotDuration), /year|month|week/.test(slotUnit) ? slotUnit : void 0) : void 0;
  return this.emphasizeWeeks = this.slotDuration.as('days') === 1 && this.duration.as('weeks') >= 2 && !this.opt('businessHours');

  /*
  	console.log('view duration =', @duration.humanize())
  	console.log('label interval =', @labelInterval.humanize())
  	console.log('slot duration =', @slotDuration.humanize())
  	console.log('header formats =', @headerFormats)
  	console.log('isTimeScale', @isTimeScale)
  	console.log('largeUnit', @largeUnit)
   */
};

TimelineGrid.prototype.queryDurationOption = function(name) {
  var dur, input;
  input = this.opt(name);
  if (input != null) {
    dur = moment.duration(input);
    if (+dur) {
      return dur;
    }
  }
};

TimelineGrid.prototype.validateLabelAndSlot = function() {
  var labelCnt, slotCnt, slotsPerLabel;
  if (this.labelInterval) {
    labelCnt = divideDurationByDuration(this.duration, this.labelInterval);
    if (labelCnt > MAX_CELLS) {
      FC.warn('slotLabelInterval results in too many cells');
      this.labelInterval = null;
    }
  }
  if (this.slotDuration) {
    slotCnt = divideDurationByDuration(this.duration, this.slotDuration);
    if (slotCnt > MAX_CELLS) {
      FC.warn('slotDuration results in too many cells');
      this.slotDuration = null;
    }
  }
  if (this.labelInterval && this.slotDuration) {
    slotsPerLabel = divideDurationByDuration(this.labelInterval, this.slotDuration);
    if (!isInt(slotsPerLabel) || slotsPerLabel < 1) {
      FC.warn('slotLabelInterval must be a multiple of slotDuration');
      return this.slotDuration = null;
    }
  }
};

TimelineGrid.prototype.ensureGridDuration = function() {
  var gridDuration, input, j, labelCnt, labelInterval;
  gridDuration = this.duration;
  if (!gridDuration) {
    gridDuration = this.view.intervalDuration;
    if (!gridDuration) {
      if (!this.labelInterval && !this.slotDuration) {
        gridDuration = moment.duration(DEFAULT_GRID_DURATION);
      } else {
        labelInterval = this.ensureLabelInterval();
        for (j = STOCK_SUB_DURATIONS.length - 1; j >= 0; j += -1) {
          input = STOCK_SUB_DURATIONS[j];
          gridDuration = moment.duration(input);
          labelCnt = divideDurationByDuration(gridDuration, labelInterval);
          if (labelCnt >= MIN_AUTO_LABELS) {
            break;
          }
        }
      }
    }
    this.duration = gridDuration;
  }
  return gridDuration;
};

TimelineGrid.prototype.ensureLabelInterval = function() {
  var input, j, k, labelCnt, labelInterval, len, len1, slotsPerLabel, tryLabelInterval;
  labelInterval = this.labelInterval;
  if (!labelInterval) {
    if (!this.duration && !this.slotDuration) {
      this.ensureGridDuration();
    }
    if (this.slotDuration) {
      for (j = 0, len = STOCK_SUB_DURATIONS.length; j < len; j++) {
        input = STOCK_SUB_DURATIONS[j];
        tryLabelInterval = moment.duration(input);
        slotsPerLabel = divideDurationByDuration(tryLabelInterval, this.slotDuration);
        if (isInt(slotsPerLabel) && slotsPerLabel <= MAX_AUTO_SLOTS_PER_LABEL) {
          labelInterval = tryLabelInterval;
          break;
        }
      }
      if (!labelInterval) {
        labelInterval = this.slotDuration;
      }
    } else {
      for (k = 0, len1 = STOCK_SUB_DURATIONS.length; k < len1; k++) {
        input = STOCK_SUB_DURATIONS[k];
        labelInterval = moment.duration(input);
        labelCnt = divideDurationByDuration(this.duration, labelInterval);
        if (labelCnt >= MIN_AUTO_LABELS) {
          break;
        }
      }
    }
    this.labelInterval = labelInterval;
  }
  return labelInterval;
};

TimelineGrid.prototype.ensureSlotDuration = function() {
  var input, j, labelInterval, len, slotCnt, slotDuration, slotsPerLabel, trySlotDuration;
  slotDuration = this.slotDuration;
  if (!slotDuration) {
    labelInterval = this.ensureLabelInterval();
    for (j = 0, len = STOCK_SUB_DURATIONS.length; j < len; j++) {
      input = STOCK_SUB_DURATIONS[j];
      trySlotDuration = moment.duration(input);
      slotsPerLabel = divideDurationByDuration(labelInterval, trySlotDuration);
      if (isInt(slotsPerLabel) && slotsPerLabel > 1 && slotsPerLabel <= MAX_AUTO_SLOTS_PER_LABEL) {
        slotDuration = trySlotDuration;
        break;
      }
    }
    if (slotDuration && this.duration) {
      slotCnt = divideDurationByDuration(this.duration, slotDuration);
      if (slotCnt > MAX_AUTO_CELLS) {
        slotDuration = null;
      }
    }
    if (!slotDuration) {
      slotDuration = labelInterval;
    }
    this.slotDuration = slotDuration;
  }
  return slotDuration;
};

TimelineGrid.prototype.computeHeaderFormats = function() {
  var format0, format1, format2, gridDuration, labelInterval, unit, view, weekNumbersVisible;
  view = this.view;
  gridDuration = this.duration;
  labelInterval = this.labelInterval;
  unit = computeIntervalUnit(labelInterval);
  weekNumbersVisible = this.opt('weekNumbers');
  format0 = format1 = format2 = null;
  if (unit === 'week' && !weekNumbersVisible) {
    unit = 'day';
  }
  switch (unit) {
    case 'year':
      format0 = 'YYYY';
      break;
    case 'month':
      if (gridDuration.asYears() > 1) {
        format0 = 'YYYY';
      }
      format1 = 'MMM';
      break;
    case 'week':
      if (gridDuration.asYears() > 1) {
        format0 = 'YYYY';
      }
      format1 = this.opt('shortWeekFormat');
      break;
    case 'day':
      if (gridDuration.asYears() > 1) {
        format0 = this.opt('monthYearFormat');
      } else if (gridDuration.asMonths() > 1) {
        format0 = 'MMMM';
      }
      if (weekNumbersVisible) {
        format1 = this.opt('weekFormat');
      }
      format2 = 'dd D';
      break;
    case 'hour':
      if (weekNumbersVisible) {
        format0 = this.opt('weekFormat');
      }
      if (gridDuration.asDays() > 1) {
        format1 = this.opt('dayOfMonthFormat');
      }
      format2 = this.opt('smallTimeFormat');
      break;
    case 'minute':
      if (labelInterval.asMinutes() / 60 >= MAX_AUTO_SLOTS_PER_LABEL) {
        format0 = this.opt('hourFormat');
        format1 = '[:]mm';
      } else {
        format0 = this.opt('mediumTimeFormat');
      }
      break;
    case 'second':
      if (labelInterval.asSeconds() / 60 >= MAX_AUTO_SLOTS_PER_LABEL) {
        format0 = 'LT';
        format1 = '[:]ss';
      } else {
        format0 = 'LTS';
      }
      break;
    case 'millisecond':
      format0 = 'LTS';
      format1 = '[.]SSS';
  }
  return [].concat(format0 || [], format1 || [], format2 || []);
};

FC.views.timeline = {
  "class": TimelineView,
  defaults: {
    eventResizableFromStart: true
  }
};

FC.views.timelineDay = {
  type: 'timeline',
  duration: {
    days: 1
  }
};

FC.views.timelineWeek = {
  type: 'timeline',
  duration: {
    weeks: 1
  }
};

FC.views.timelineMonth = {
  type: 'timeline',
  duration: {
    months: 1
  }
};

FC.views.timelineYear = {
  type: 'timeline',
  duration: {
    years: 1
  }
};

ResourceTimelineView = (function(superClass) {
  extend(ResourceTimelineView, superClass);

  function ResourceTimelineView() {
    return ResourceTimelineView.__super__.constructor.apply(this, arguments);
  }

  ResourceTimelineView.mixin(ResourceView);

  ResourceTimelineView.prototype.resourceGrid = null;

  ResourceTimelineView.prototype.joiner = null;

  ResourceTimelineView.prototype.dividerEls = null;

  ResourceTimelineView.prototype.superHeaderText = null;

  ResourceTimelineView.prototype.isVGrouping = null;

  ResourceTimelineView.prototype.isHGrouping = null;

  ResourceTimelineView.prototype.groupSpecs = null;

  ResourceTimelineView.prototype.colSpecs = null;

  ResourceTimelineView.prototype.orderSpecs = null;

  ResourceTimelineView.prototype.rowHierarchy = null;

  ResourceTimelineView.prototype.resourceRowHash = null;

  ResourceTimelineView.prototype.nestingCnt = 0;

  ResourceTimelineView.prototype.isNesting = null;

  ResourceTimelineView.prototype.dividerWidth = null;

  ResourceTimelineView.prototype.initialize = function() {
    ResourceTimelineView.__super__.initialize.apply(this, arguments);
    this.processResourceOptions();
    this.resourceGrid = new Spreadsheet(this);
    this.rowHierarchy = new RowParent(this);
    return this.resourceRowHash = {};
  };

  ResourceTimelineView.prototype.instantiateGrid = function() {
    return new ResourceTimelineGrid(this);
  };

  ResourceTimelineView.prototype.processResourceOptions = function() {
    var allColSpecs, allOrderSpecs, colSpec, defaultLabelText, groupColSpecs, groupSpec, groupSpecs, hGroupField, isGroup, isHGrouping, isVGrouping, j, k, l, labelText, len, len1, len2, orderSpec, plainColSpecs, plainOrderSpecs, superHeaderText, textFunc;
    allColSpecs = this.opt('resourceColumns') || [];
    labelText = this.opt('resourceLabelText');
    defaultLabelText = 'Resources';
    superHeaderText = null;
    if (!allColSpecs.length) {
      textFunc = this.opt('resourceText');
      textFunc || (textFunc = function(resource) {
        return resource.title || resource.id;
      });
      allColSpecs.push({
        labelText: labelText || defaultLabelText,
        text: textFunc
      });
    } else {
      superHeaderText = labelText;
    }
    plainColSpecs = [];
    groupColSpecs = [];
    groupSpecs = [];
    isVGrouping = false;
    isHGrouping = false;
    for (j = 0, len = allColSpecs.length; j < len; j++) {
      colSpec = allColSpecs[j];
      if (colSpec.group) {
        groupColSpecs.push(colSpec);
      } else {
        plainColSpecs.push(colSpec);
      }
    }
    plainColSpecs[0].isMain = true;
    if (groupColSpecs.length) {
      groupSpecs = groupColSpecs;
      isVGrouping = true;
    } else {
      hGroupField = this.opt('resourceGroupField');
      if (hGroupField) {
        isHGrouping = true;
        groupSpecs.push({
          field: hGroupField,
          text: this.opt('resourceGroupText'),
          render: this.opt('resourceGroupRender')
        });
      }
    }
    allOrderSpecs = parseFieldSpecs(this.opt('resourceOrder'));
    plainOrderSpecs = [];
    for (k = 0, len1 = allOrderSpecs.length; k < len1; k++) {
      orderSpec = allOrderSpecs[k];
      isGroup = false;
      for (l = 0, len2 = groupSpecs.length; l < len2; l++) {
        groupSpec = groupSpecs[l];
        if (groupSpec.field === orderSpec.field) {
          groupSpec.order = orderSpec.order;
          isGroup = true;
          break;
        }
      }
      if (!isGroup) {
        plainOrderSpecs.push(orderSpec);
      }
    }
    this.superHeaderText = superHeaderText;
    this.isVGrouping = isVGrouping;
    this.isHGrouping = isHGrouping;
    this.groupSpecs = groupSpecs;
    this.colSpecs = groupColSpecs.concat(plainColSpecs);
    return this.orderSpecs = plainOrderSpecs;
  };

  ResourceTimelineView.prototype.renderSkeleton = function() {
    ResourceTimelineView.__super__.renderSkeleton.apply(this, arguments);
    this.renderResourceGridSkeleton();
    this.joiner = new ScrollJoiner('vertical', [this.resourceGrid.bodyScroller, this.timeGrid.bodyScroller]);
    return this.initDividerMoving();
  };

  ResourceTimelineView.prototype.renderSkeletonHtml = function() {
    return '<table> <thead class="fc-head"> <tr> <td class="fc-resource-area ' + this.widgetHeaderClass + '"></td> <td class="fc-divider fc-col-resizer ' + this.widgetHeaderClass + '"></td> <td class="fc-time-area ' + this.widgetHeaderClass + '"></td> </tr> </thead> <tbody class="fc-body"> <tr> <td class="fc-resource-area ' + this.widgetContentClass + '"></td> <td class="fc-divider fc-col-resizer ' + this.widgetHeaderClass + '"></td> <td class="fc-time-area ' + this.widgetContentClass + '"></td> </tr> </tbody> </table>';
  };

  ResourceTimelineView.prototype.renderResourceGridSkeleton = function() {
    this.resourceGrid.el = this.el.find('tbody .fc-resource-area');
    this.resourceGrid.headEl = this.el.find('thead .fc-resource-area');
    return this.resourceGrid.renderSkeleton();
  };

  ResourceTimelineView.prototype.initDividerMoving = function() {
    var ref;
    this.dividerEls = this.el.find('.fc-divider');
    this.dividerWidth = (ref = this.opt('resourceAreaWidth')) != null ? ref : this.resourceGrid.tableWidth;
    if (this.dividerWidth != null) {
      this.positionDivider(this.dividerWidth);
    }
    return this.dividerEls.on('mousedown', (function(_this) {
      return function(ev) {
        return _this.dividerMousedown(ev);
      };
    })(this));
  };

  ResourceTimelineView.prototype.dividerMousedown = function(ev) {
    var dragListener, isRTL, maxWidth, minWidth, origWidth;
    isRTL = this.opt('isRTL');
    minWidth = 30;
    maxWidth = this.el.width() - 30;
    origWidth = this.getNaturalDividerWidth();
    dragListener = new DragListener({
      dragStart: (function(_this) {
        return function() {
          return _this.dividerEls.addClass('fc-active');
        };
      })(this),
      drag: (function(_this) {
        return function(dx, dy) {
          var width;
          if (isRTL) {
            width = origWidth - dx;
          } else {
            width = origWidth + dx;
          }
          width = Math.max(width, minWidth);
          width = Math.min(width, maxWidth);
          _this.dividerWidth = width;
          _this.positionDivider(width);
          return _this.updateWidth();
        };
      })(this),
      dragStop: (function(_this) {
        return function() {
          return _this.dividerEls.removeClass('fc-active');
        };
      })(this)
    });
    return dragListener.mousedown(ev);
  };

  ResourceTimelineView.prototype.getNaturalDividerWidth = function() {
    return this.el.find('.fc-resource-area').width();
  };

  ResourceTimelineView.prototype.positionDivider = function(w) {
    return this.el.find('.fc-resource-area').width(w);
  };

  ResourceTimelineView.prototype.renderEvents = function(events) {
    this.timeGrid.renderEvents(events);
    this.syncRowHeights();
    return this.updateWidth();
  };

  ResourceTimelineView.prototype.unrenderEvents = function() {
    this.timeGrid.unrenderEvents();
    this.syncRowHeights();
    return this.updateWidth();
  };

  ResourceTimelineView.prototype.updateWidth = function() {
    ResourceTimelineView.__super__.updateWidth.apply(this, arguments);
    this.resourceGrid.updateWidth();
    this.joiner.update();
    if (this.cellFollower) {
      return this.cellFollower.update();
    }
  };

  ResourceTimelineView.prototype.updateHeight = function(isResize) {
    ResourceTimelineView.__super__.updateHeight.apply(this, arguments);
    if (isResize) {
      return this.syncRowHeights();
    }
  };

  ResourceTimelineView.prototype.setHeight = function(totalHeight, isAuto) {
    var bodyHeight, headHeight;
    headHeight = this.syncHeadHeights();
    if (isAuto) {
      bodyHeight = 'auto';
    } else {
      bodyHeight = totalHeight - headHeight - this.queryMiscHeight();
    }
    this.timeGrid.bodyScroller.setHeight(bodyHeight);
    return this.resourceGrid.bodyScroller.setHeight(bodyHeight);
  };

  ResourceTimelineView.prototype.queryMiscHeight = function() {
    return this.el.outerHeight() - Math.max(this.resourceGrid.headScroller.el.outerHeight(), this.timeGrid.headScroller.el.outerHeight()) - Math.max(this.resourceGrid.bodyScroller.el.outerHeight(), this.timeGrid.bodyScroller.el.outerHeight());
  };

  ResourceTimelineView.prototype.syncHeadHeights = function() {
    var headHeight;
    this.resourceGrid.headHeight('auto');
    this.timeGrid.headHeight('auto');
    headHeight = Math.max(this.resourceGrid.headHeight(), this.timeGrid.headHeight());
    this.resourceGrid.headHeight(headHeight);
    this.timeGrid.headHeight(headHeight);
    return headHeight;
  };

  ResourceTimelineView.prototype.scrollToResource = function(resource) {
    return this.timeGrid.scrollToResource(resource);
  };

  ResourceTimelineView.prototype.setResources = function(resources) {
    var j, len, resource;
    this.batchRows();
    for (j = 0, len = resources.length; j < len; j++) {
      resource = resources[j];
      this.insertResource(resource);
    }
    this.unbatchRows();
    return this.reinitializeCellFollowers();
  };

  ResourceTimelineView.prototype.unsetResources = function() {
    this.batchRows();
    this.rowHierarchy.removeChildren();
    this.unbatchRows();
    return this.reinitializeCellFollowers();
  };


  /*
  	TODO: the scenario where there were previously unassociated events that are now
  	 attached to this resource. should render those events immediately.
   */

  ResourceTimelineView.prototype.addResource = function(resource) {
    this.insertResource(resource);
    return this.reinitializeCellFollowers();
  };

  ResourceTimelineView.prototype.removeResource = function(resource) {
    var row;
    row = this.getResourceRow(resource.id);
    if (row) {
      this.batchRows();
      row.remove();
      this.unbatchRows();
      return this.reinitializeCellFollowers();
    }
  };

  ResourceTimelineView.prototype.cellFollower = null;

  ResourceTimelineView.prototype.reinitializeCellFollowers = function() {
    var cellContent, j, len, nodes, ref, row;
    if (this.cellFollower) {
      this.cellFollower.clearSprites();
    }
    this.cellFollower = new ScrollFollower(this.resourceGrid.bodyScroller);
    this.cellFollower.isHFollowing = false;
    this.cellFollower.isVFollowing = true;
    nodes = [];
    ref = this.rowHierarchy.getNodes();
    for (j = 0, len = ref.length; j < len; j++) {
      row = ref[j];
      if (row instanceof VRowGroup) {
        if (row.groupTd) {
          cellContent = row.groupTd.find('.fc-cell-content');
          if (cellContent.length) {
            nodes.push(cellContent[0]);
          }
        }
      }
    }
    return this.cellFollower.setSprites($(nodes));
  };

  ResourceTimelineView.prototype.insertResource = function(resource, parentResourceRow) {
    var childResource, j, len, parentId, ref, results, row;
    row = new ResourceRow(this, resource);
    if (parentResourceRow == null) {
      parentId = resource.parentId;
      if (parentId) {
        parentResourceRow = this.getResourceRow(parentId);
      }
    }
    if (parentResourceRow) {
      this.insertRowAsChild(row, parentResourceRow);
    } else {
      this.insertRow(row);
    }
    ref = resource.children;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      childResource = ref[j];
      results.push(this.insertResource(childResource, row));
    }
    return results;
  };

  ResourceTimelineView.prototype.insertRow = function(row, parent, groupSpecs) {
    var group;
    if (parent == null) {
      parent = this.rowHierarchy;
    }
    if (groupSpecs == null) {
      groupSpecs = this.groupSpecs;
    }
    if (groupSpecs.length) {
      group = this.ensureResourceGroup(row, parent, groupSpecs[0]);
      if (group instanceof HRowGroup) {
        return this.insertRowAsChild(row, group);
      } else {
        return this.insertRow(row, group, groupSpecs.slice(1));
      }
    } else {
      return this.insertRowAsChild(row, parent);
    }
  };

  ResourceTimelineView.prototype.insertRowAsChild = function(row, parent) {
    return parent.addChild(row, this.computeChildRowPosition(row, parent));
  };

  ResourceTimelineView.prototype.computeChildRowPosition = function(child, parent) {
    var cmp, i, j, len, ref, sibling;
    if (this.orderSpecs.length) {
      ref = parent.children;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        sibling = ref[i];
        cmp = this.compareResources(sibling.resource || {}, child.resource || {});
        if (cmp > 0) {
          return i;
        }
      }
    }
    return null;
  };

  ResourceTimelineView.prototype.compareResources = function(a, b) {
    return compareByFieldSpecs(a, b, this.orderSpecs);
  };

  ResourceTimelineView.prototype.ensureResourceGroup = function(row, parent, spec) {
    var cmp, group, groupValue, i, j, k, len, len1, ref, ref1, testGroup;
    groupValue = (row.resource || {})[spec.field];
    group = null;
    if (spec.order) {
      ref = parent.children;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        testGroup = ref[i];
        cmp = flexibleCompare(testGroup.groupValue, groupValue) * spec.order;
        if (cmp === 0) {
          group = testGroup;
          break;
        } else if (cmp > 0) {
          break;
        }
      }
    } else {
      ref1 = parent.children;
      for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
        testGroup = ref1[i];
        if (testGroup.groupValue === groupValue) {
          group = testGroup;
          break;
        }
      }
    }
    if (!group) {
      if (this.isVGrouping) {
        group = new VRowGroup(this, spec, groupValue);
      } else {
        group = new HRowGroup(this, spec, groupValue);
      }
      parent.addChild(group, i);
    }
    return group;
  };

  ResourceTimelineView.prototype.pairSegsWithRows = function(segs) {
    var j, len, pair, pairs, pairsById, resourceId, rowObj, seg;
    pairs = [];
    pairsById = {};
    for (j = 0, len = segs.length; j < len; j++) {
      seg = segs[j];
      resourceId = seg.resourceId || '';
      rowObj = this.getResourceRow(resourceId);
      if (rowObj) {
        pair = pairsById[resourceId];
        if (!pair) {
          pair = [rowObj, []];
          pairs.push(pair);
          pairsById[resourceId] = pair;
        }
        pair[1].push(seg);
      }
    }
    return pairs;
  };

  ResourceTimelineView.prototype.rowAdded = function(row) {
    var isNesting, wasNesting;
    if (row instanceof ResourceRow) {
      this.resourceRowHash[row.resource.id] = row;
    }
    wasNesting = this.isNesting;
    isNesting = Boolean(this.nestingCnt += row.depth ? 1 : 0);
    if (wasNesting !== isNesting) {
      this.el.toggleClass('fc-nested', isNesting);
      this.el.toggleClass('fc-flat', !isNesting);
    }
    return this.isNesting = isNesting;
  };

  ResourceTimelineView.prototype.rowRemoved = function(row) {
    var isNesting, wasNesting;
    if (row instanceof ResourceRow) {
      delete this.resourceRowHash[row.resource.id];
    }
    wasNesting = this.isNesting;
    isNesting = Boolean(this.nestingCnt -= row.depth ? 1 : 0);
    if (wasNesting !== isNesting) {
      this.el.toggleClass('fc-nested', isNesting);
      this.el.toggleClass('fc-flat', !isNesting);
    }
    return this.isNesting = isNesting;
  };

  ResourceTimelineView.prototype.batchRowDepth = 0;

  ResourceTimelineView.prototype.shownRowBatch = null;

  ResourceTimelineView.prototype.hiddenRowBatch = null;

  ResourceTimelineView.prototype.batchRows = function() {
    if (!(this.batchRowDepth++)) {
      this.shownRowBatch = [];
      return this.hiddenRowBatch = [];
    }
  };

  ResourceTimelineView.prototype.unbatchRows = function() {
    if (!(--this.batchRowDepth)) {
      if (this.hiddenRowBatch.length) {
        this.rowsHidden(this.hiddenRowBatch);
      }
      if (this.shownRowBatch.length) {
        this.rowsShown(this.shownRowBatch);
      }
      this.hiddenRowBatch = null;
      return this.shownRowBatch = null;
    }
  };

  ResourceTimelineView.prototype.rowShown = function(row) {
    if (this.shownRowBatch) {
      return this.shownRowBatch.push(row);
    } else {
      return this.rowsShown([row]);
    }
  };

  ResourceTimelineView.prototype.rowHidden = function(row) {
    if (this.hiddenRowBatch) {
      return this.hiddenRowBatch.push(row);
    } else {
      return this.rowsHidden([row]);
    }
  };

  ResourceTimelineView.prototype.rowsShown = function(rows) {
    this.syncRowHeights(rows);
    return this.updateWidth();
  };

  ResourceTimelineView.prototype.rowsHidden = function(rows) {
    return this.updateWidth();
  };

  ResourceTimelineView.prototype.tbodyHash = null;

  ResourceTimelineView.prototype.renderStoredResources = function() {
    this.tbodyHash = {
      spreadsheet: this.resourceGrid.tbodyEl,
      event: this.timeGrid.tbodyEl
    };
    this.batchRows();
    this.rowHierarchy.show();
    this.unbatchRows();
    return this.reinitializeCellFollowers();
  };

  ResourceTimelineView.prototype.unrenderStoredResources = function() {
    this.batchRows();
    this.rowHierarchy.recursivelyUnrender();
    this.unbatchRows();
    return this.reinitializeCellFollowers();
  };

  ResourceTimelineView.prototype.syncRowHeights = function(visibleRows, safe) {
    var h, h1, h2, i, innerHeights, j, k, len, len1, row;
    if (safe == null) {
      safe = false;
    }
    if (visibleRows == null) {
      visibleRows = this.getVisibleRows();
    }
    for (j = 0, len = visibleRows.length; j < len; j++) {
      row = visibleRows[j];
      row.setTrInnerHeight('');
    }
    innerHeights = (function() {
      var k, len1, results;
      results = [];
      for (k = 0, len1 = visibleRows.length; k < len1; k++) {
        row = visibleRows[k];
        h = row.getMaxTrInnerHeight();
        if (safe) {
          h += h % 2;
        }
        results.push(h);
      }
      return results;
    })();
    for (i = k = 0, len1 = visibleRows.length; k < len1; i = ++k) {
      row = visibleRows[i];
      row.setTrInnerHeight(innerHeights[i]);
    }
    if (!safe) {
      h1 = this.resourceGrid.tbodyEl.height();
      h2 = this.timeGrid.tbodyEl.height();
      if (Math.abs(h1 - h2) > 1) {
        return this.syncRowHeights(visibleRows, true);
      }
    }
  };

  ResourceTimelineView.prototype.getVisibleRows = function() {
    var j, len, ref, results, row;
    ref = this.rowHierarchy.getRows();
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      row = ref[j];
      if (row.isShown) {
        results.push(row);
      }
    }
    return results;
  };

  ResourceTimelineView.prototype.getEventRows = function() {
    var j, len, ref, results, row;
    ref = this.rowHierarchy.getRows();
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      row = ref[j];
      if (row instanceof EventRow) {
        results.push(row);
      }
    }
    return results;
  };

  ResourceTimelineView.prototype.getResourceRow = function(resourceId) {
    return this.resourceRowHash[resourceId];
  };

  ResourceTimelineView.prototype.setScroll = function(state) {
    ResourceTimelineView.__super__.setScroll.apply(this, arguments);
    return this.resourceGrid.bodyScroller.scrollTop(state.top);
  };

  return ResourceTimelineView;

})(TimelineView);

ResourceTimelineGrid = (function(superClass) {
  extend(ResourceTimelineGrid, superClass);

  function ResourceTimelineGrid() {
    return ResourceTimelineGrid.__super__.constructor.apply(this, arguments);
  }

  ResourceTimelineGrid.mixin(ResourceGrid);

  ResourceTimelineGrid.prototype.eventRows = null;

  ResourceTimelineGrid.prototype.shownEventRows = null;

  ResourceTimelineGrid.prototype.tbodyEl = null;

  ResourceTimelineGrid.prototype.build = function() {
    var row;
    this.eventRows = this.view.getEventRows();
    this.shownEventRows = (function() {
      var j, len, ref, results;
      ref = this.eventRows;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        row = ref[j];
        if (row.isShown) {
          results.push(row);
        }
      }
      return results;
    }).call(this);
    return this.rowCnt = this.shownEventRows.length;
  };

  ResourceTimelineGrid.prototype.clear = function() {
    this.eventRows = null;
    return this.shownEventRows = null;
  };

  ResourceTimelineGrid.prototype.getRowData = function(row) {
    return {
      resourceId: this.shownEventRows[row].resource.id
    };
  };

  ResourceTimelineGrid.prototype.getRowEl = function(row) {
    return this.shownEventRows[row].getTr('event');
  };

  ResourceTimelineGrid.prototype.renderSkeleton = function() {
    var rowContainerEl;
    ResourceTimelineGrid.__super__.renderSkeleton.apply(this, arguments);
    this.segContainerEl.remove();
    this.segContainerEl = null;
    rowContainerEl = $('<div class="fc-rows"><table><tbody/></table></div>').appendTo(this.bodyScroller.contentEl);
    return this.tbodyEl = rowContainerEl.find('tbody');
  };

  ResourceTimelineGrid.prototype.renderFgSegs = function(segs) {
    var containerObj, containerSegs, j, len, pair, pairs, visiblePairs;
    segs = this.renderFgSegEls(segs);
    pairs = this.view.pairSegsWithRows(segs);
    visiblePairs = [];
    for (j = 0, len = pairs.length; j < len; j++) {
      pair = pairs[j];
      containerObj = pair[0], containerSegs = pair[1];
      containerObj.fgSegs = containerSegs;
      if (containerObj.isShown) {
        containerObj.isSegsRendered = true;
        visiblePairs.push(pair);
      }
    }
    this.renderFgSegsInContainers(visiblePairs);
    this.updateSegFollowers(segs);
    return segs;
  };

  ResourceTimelineGrid.prototype.unrenderFgSegs = function() {
    var eventRow, eventRows, j, len;
    this.clearSegFollowers();
    eventRows = this.view.getEventRows();
    for (j = 0, len = eventRows.length; j < len; j++) {
      eventRow = eventRows[j];
      eventRow.fgSegs = null;
      eventRow.isSegsRendered = false;
    }
    return this.unrenderFgContainers(eventRows);
  };

  ResourceTimelineGrid.prototype.renderFill = function(type, segs, className) {
    var j, k, len, len1, nonResourceSegs, pair, pairs, resourceSegs, rowObj, rowSegs, seg, visiblePairs;
    segs = this.renderFillSegEls(type, segs);
    resourceSegs = [];
    nonResourceSegs = [];
    for (j = 0, len = segs.length; j < len; j++) {
      seg = segs[j];
      if (seg.resourceId) {
        resourceSegs.push(seg);
      } else {
        nonResourceSegs.push(seg);
      }
    }
    pairs = this.view.pairSegsWithRows(resourceSegs);
    visiblePairs = [];
    for (k = 0, len1 = pairs.length; k < len1; k++) {
      pair = pairs[k];
      rowObj = pair[0], rowSegs = pair[1];
      if (type === 'bgEvent') {
        rowObj.bgSegs = rowSegs;
      }
      if (rowObj.isShown) {
        visiblePairs.push(pair);
      }
    }
    if (nonResourceSegs.length) {
      visiblePairs.unshift([this, nonResourceSegs]);
    }
    this.renderFillInContainers(type, visiblePairs, className);
    return segs;
  };

  ResourceTimelineGrid.prototype.renderHelper = function(event, sourceSeg) {
    var pairs, segs;
    segs = this.eventsToSegs([event]);
    segs = this.renderFgSegEls(segs);
    pairs = this.view.pairSegsWithRows(segs);
    return this.renderHelperSegsInContainers(pairs, sourceSeg);
  };

  ResourceTimelineGrid.prototype.computeInitialScroll = function(prevState) {
    var state;
    state = ResourceTimelineGrid.__super__.computeInitialScroll.apply(this, arguments);
    if (prevState) {
      state.resourceId = prevState.resourceId;
      state.bottom = prevState.bottom;
    }
    return state;
  };

  ResourceTimelineGrid.prototype.queryScroll = function() {
    var el, elBottom, j, len, ref, rowObj, scrollerTop, state;
    state = ResourceTimelineGrid.__super__.queryScroll.apply(this, arguments);
    scrollerTop = this.bodyScroller.scrollEl.offset().top;
    ref = this.view.getVisibleRows();
    for (j = 0, len = ref.length; j < len; j++) {
      rowObj = ref[j];
      if (rowObj.resource) {
        el = rowObj.getTr('event');
        elBottom = el.offset().top + el.outerHeight();
        if (elBottom > scrollerTop) {
          state.resourceId = rowObj.resource.id;
          state.bottom = elBottom - scrollerTop;
          break;
        }
      }
    }
    return state;
  };

  ResourceTimelineGrid.prototype.setScroll = function(state) {
    var el, elBottom, innerTop, row;
    if (state.resourceId) {
      row = this.view.getResourceRow(state.resourceId);
      if (row) {
        el = row.getTr('event');
        if (el) {
          innerTop = this.bodyScroller.innerEl.offset().top;
          elBottom = el.offset().top + el.outerHeight();
          state.top = elBottom - state.bottom - innerTop;
        }
      }
    }
    return ResourceTimelineGrid.__super__.setScroll.call(this, state);
  };

  ResourceTimelineGrid.prototype.scrollToResource = function(resource) {
    var el, innerTop, row, scrollTop;
    row = this.view.getResourceRow(resource.id);
    if (row) {
      el = row.getTr('event');
      if (el) {
        innerTop = this.bodyScroller.innerEl.offset().top;
        scrollTop = el.offset().top - innerTop;
        return this.bodyScroller.scrollEl.scrollTop(scrollTop);
      }
    }
  };

  return ResourceTimelineGrid;

})(TimelineGrid);

COL_MIN_WIDTH = 30;

Spreadsheet = (function() {
  Spreadsheet.prototype.view = null;

  Spreadsheet.prototype.headEl = null;

  Spreadsheet.prototype.el = null;

  Spreadsheet.prototype.tbodyEl = null;

  Spreadsheet.prototype.headScroller = null;

  Spreadsheet.prototype.bodyScroller = null;

  Spreadsheet.prototype.joiner = null;

  function Spreadsheet(view1) {
    var colSpec;
    this.view = view1;
    this.isRTL = this.view.opt('isRTL');
    this.givenColWidths = this.colWidths = (function() {
      var j, len, ref, results;
      ref = this.view.colSpecs;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        colSpec = ref[j];
        results.push(colSpec.width);
      }
      return results;
    }).call(this);
  }

  Spreadsheet.prototype.colGroupHtml = '';

  Spreadsheet.prototype.headTable = null;

  Spreadsheet.prototype.headColEls = null;

  Spreadsheet.prototype.headCellEls = null;

  Spreadsheet.prototype.bodyColEls = null;

  Spreadsheet.prototype.bodyTable = null;

  Spreadsheet.prototype.renderSkeleton = function() {
    this.headScroller = new Scroller('invisible-scroll', 'hidden');
    this.headScroller.contentEl.html(this.renderHeadHtml());
    this.headEl.append(this.headScroller.el);
    this.bodyScroller = new Scroller('auto', 'invisible-scroll');
    this.bodyScroller.contentEl.html('<table>' + this.colGroupHtml + '<tbody/></table>');
    this.tbodyEl = this.bodyScroller.contentEl.find('tbody');
    this.el.append(this.bodyScroller.el);
    this.joiner = new ScrollJoiner('horizontal', [this.headScroller, this.bodyScroller]);
    this.headTable = this.headEl.find('table');
    this.headColEls = this.headEl.find('col');
    this.headCellEls = this.headScroller.contentEl.find('tr:last-child th');
    this.bodyColEls = this.el.find('col');
    this.bodyTable = this.el.find('table');
    this.colMinWidths = this.computeColMinWidths();
    this.applyColWidths();
    return this.initColResizing();
  };

  Spreadsheet.prototype.renderHeadHtml = function() {
    var colGroupHtml, colSpecs, html, i, isLast, isMainCol, j, k, len, len1, o;
    colSpecs = this.view.colSpecs;
    html = '<table>';
    colGroupHtml = '<colgroup>';
    for (j = 0, len = colSpecs.length; j < len; j++) {
      o = colSpecs[j];
      if (o.isMain) {
        colGroupHtml += '<col class="fc-main-col"/>';
      } else {
        colGroupHtml += '<col/>';
      }
    }
    colGroupHtml += '</colgroup>';
    this.colGroupHtml = colGroupHtml;
    html += colGroupHtml;
    html += '<tbody>';
    if (this.view.superHeaderText) {
      html += '<tr class="fc-super">' + '<th class="' + this.view.widgetHeaderClass + '" colspan="' + colSpecs.length + '">' + '<div class="fc-cell-content">' + '<span class="fc-cell-text">' + htmlEscape(this.view.superHeaderText) + '</span>' + '</div>' + '</th>' + '</tr>';
    }
    html += '<tr>';
    isMainCol = true;
    for (i = k = 0, len1 = colSpecs.length; k < len1; i = ++k) {
      o = colSpecs[i];
      isLast = i === colSpecs.length - 1;
      html += '<th class="' + this.view.widgetHeaderClass + '">' + '<div>' + '<div class="fc-cell-content">' + (o.isMain ? '<div class="fc-icon fc-expander-space" />' : '') + '<span class="fc-cell-text">' + htmlEscape(o.labelText || '') + '</span>' + '</div>' + (!isLast ? '<div class="fc-col-resizer"></div>' : '') + '</div>' + '</th>';
    }
    html += '</tr>';
    html += '</tbody></table>';
    return html;
  };

  Spreadsheet.prototype.givenColWidths = null;

  Spreadsheet.prototype.colWidths = null;

  Spreadsheet.prototype.colMinWidths = null;

  Spreadsheet.prototype.tableWidth = null;

  Spreadsheet.prototype.tableMinWidth = null;

  Spreadsheet.prototype.initColResizing = function() {
    return this.headEl.find('th .fc-col-resizer').each((function(_this) {
      return function(i, resizerEl) {
        resizerEl = $(resizerEl);
        return resizerEl.on('mousedown', function(ev) {
          return _this.colResizeMousedown(i, ev, resizerEl);
        });
      };
    })(this));
  };

  Spreadsheet.prototype.colResizeMousedown = function(i, ev, resizerEl) {
    var colWidths, dragListener, minWidth, origColWidth;
    colWidths = this.colWidths = this.queryColWidths();
    colWidths.pop();
    colWidths.push('auto');
    origColWidth = colWidths[i];
    minWidth = Math.min(this.colMinWidths[i], COL_MIN_WIDTH);
    dragListener = new DragListener({
      dragStart: (function(_this) {
        return function() {
          return resizerEl.addClass('fc-active');
        };
      })(this),
      drag: (function(_this) {
        return function(dx, dy) {
          var width;
          width = origColWidth + (_this.isRTL ? -dx : dx);
          width = Math.max(width, minWidth);
          colWidths[i] = width;
          return _this.applyColWidths();
        };
      })(this),
      dragStop: (function(_this) {
        return function() {
          return resizerEl.removeClass('fc-active');
        };
      })(this)
    });
    return dragListener.mousedown(ev);
  };

  Spreadsheet.prototype.applyColWidths = function() {
    var allNumbers, anyPercentages, colMinWidths, colWidth, colWidths, cssWidth, cssWidths, defaultCssWidth, i, j, k, l, len, len1, len2, tableMinWidth, total;
    colMinWidths = this.colMinWidths;
    colWidths = this.colWidths;
    allNumbers = true;
    anyPercentages = false;
    total = 0;
    for (j = 0, len = colWidths.length; j < len; j++) {
      colWidth = colWidths[j];
      if (typeof colWidth === 'number') {
        total += colWidth;
      } else {
        allNumbers = false;
        if (colWidth) {
          anyPercentages = true;
        }
      }
    }
    defaultCssWidth = anyPercentages ? 'auto' : '';
    cssWidths = (function() {
      var k, len1, results;
      results = [];
      for (i = k = 0, len1 = colWidths.length; k < len1; i = ++k) {
        colWidth = colWidths[i];
        results.push(colWidth != null ? colWidth : defaultCssWidth);
      }
      return results;
    })();
    tableMinWidth = 0;
    for (i = k = 0, len1 = cssWidths.length; k < len1; i = ++k) {
      cssWidth = cssWidths[i];
      tableMinWidth += typeof cssWidth === 'number' ? cssWidth : colMinWidths[i];
    }
    for (i = l = 0, len2 = cssWidths.length; l < len2; i = ++l) {
      cssWidth = cssWidths[i];
      this.headColEls.eq(i).width(cssWidth);
      this.bodyColEls.eq(i).width(cssWidth);
    }
    this.headScroller.setContentMinWidth(tableMinWidth);
    this.bodyScroller.setContentMinWidth(tableMinWidth);
    this.tableMinWidth = tableMinWidth;
    return this.tableWidth = allNumbers ? total : void 0;
  };

  Spreadsheet.prototype.computeColMinWidths = function() {
    var i, j, len, ref, results, width;
    ref = this.givenColWidths;
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      width = ref[i];
      if (typeof width === 'number') {
        results.push(width);
      } else {
        results.push(parseInt(this.headColEls.eq(i).css('min-width')) || COL_MIN_WIDTH);
      }
    }
    return results;
  };

  Spreadsheet.prototype.queryColWidths = function() {
    var j, len, node, ref, results;
    ref = this.headCellEls;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      node = ref[j];
      results.push($(node).outerWidth());
    }
    return results;
  };

  Spreadsheet.prototype.updateWidth = function() {
    this.headScroller.update();
    this.bodyScroller.update();
    this.joiner.update();
    if (this.follower) {
      return this.follower.update();
    }
  };

  Spreadsheet.prototype.headHeight = function() {
    var table;
    table = this.headScroller.contentEl.find('table');
    return table.height.apply(table, arguments);
  };

  return Spreadsheet;

})();


/*
An abstract node in a row-hierarchy tree.
May be a self-contained single row, a row with subrows,
OR a grouping of rows without its own distinct row.
 */

RowParent = (function() {
  RowParent.prototype.view = null;

  RowParent.prototype.parent = null;

  RowParent.prototype.prevSibling = null;

  RowParent.prototype.children = null;

  RowParent.prototype.depth = 0;

  RowParent.prototype.hasOwnRow = false;

  RowParent.prototype.trHash = null;

  RowParent.prototype.trs = null;

  RowParent.prototype.isRendered = false;

  RowParent.prototype.isExpanded = true;

  RowParent.prototype.isShown = false;

  function RowParent(view1) {
    this.view = view1;
    this.children = [];
    this.trHash = {};
    this.trs = $();
  }


  /*
  	Adds the given node as a child.
  	Will be inserted at the `index`. If not given, will be appended to the end.
   */

  RowParent.prototype.addChild = function(child, index) {
    var children, j, len, node, ref;
    child.remove();
    children = this.children;
    if (index != null) {
      children.splice(index, 0, child);
    } else {
      index = children.length;
      children.push(child);
    }
    child.prevSibling = index > 0 ? children[index - 1] : null;
    if (index < children.length - 1) {
      children[index + 1].prevSibling = child;
    }
    child.parent = this;
    child.depth = this.depth + (this.hasOwnRow ? 1 : 0);
    ref = child.getNodes();
    for (j = 0, len = ref.length; j < len; j++) {
      node = ref[j];
      node.added();
    }
    if (this.isShown && this.isExpanded) {
      return child.show();
    }
  };


  /*
  	Removes the given child from the node. Assumes it is a direct child.
  	If not a direct child, returns false and nothing happens.
  	Unrenders the child and triggers handlers.
   */

  RowParent.prototype.removeChild = function(child) {
    var children, i, isFound, j, k, len, len1, ref, row, testChild;
    children = this.children;
    isFound = false;
    for (i = j = 0, len = children.length; j < len; i = ++j) {
      testChild = children[i];
      if (testChild === child) {
        isFound = true;
        break;
      }
    }
    if (!isFound) {
      return false;
    } else {
      if (i < children.length - 1) {
        children[i + 1].prevSibling = child.prevSibling;
      }
      children.splice(i, 1);
      child.recursivelyUnrender();
      ref = child.getNodes();
      for (k = 0, len1 = ref.length; k < len1; k++) {
        row = ref[k];
        row.removed();
      }
      child.parent = null;
      child.prevSibling = null;
      return child;
    }
  };


  /*
  	Removes all of the node's children from the hierarchy. Unrenders them and triggers callbacks.
  	NOTE: batchRows/unbatchRows should probably be called before this happens :(
   */

  RowParent.prototype.removeChildren = function() {
    var child, j, k, len, len1, ref, ref1;
    ref = this.children;
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      child.recursivelyUnrender();
    }
    ref1 = this.getDescendants();
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      child = ref1[k];
      child.removed();
    }
    return this.children = [];
  };


  /*
  	Removes this node from its parent
   */

  RowParent.prototype.remove = function() {
    if (this.parent) {
      return this.parent.removeChild(this);
    }
  };


  /*
  	Gets the last direct child node
   */

  RowParent.prototype.getLastChild = function() {
    var children;
    children = this.children;
    return children[children.length - 1];
  };


  /*
  	Walks backward in the hierarchy to find the previous row leaf node.
  	When looking at the hierarchy in a flat linear fashion, this is the revealed row just before the current.
   */

  RowParent.prototype.getPrevRow = function() {
    var lastChild, node;
    node = this;
    while (node) {
      if (node.prevSibling) {
        node = node.prevSibling;
        while ((lastChild = node.getLastChild())) {
          node = lastChild;
        }
      } else {
        node = node.parent;
      }
      if (node && node.hasOwnRow && node.isShown) {
        return node;
      }
    }
    return null;
  };


  /*
  	Returns the first node in the subtree that has a revealed row
   */

  RowParent.prototype.getLeadingRow = function() {
    if (this.hasOwnRow) {
      return this;
    } else if (this.isExpanded && this.children.length) {
      return this.children[0].getLeadingRow();
    }
  };


  /*
  	Generates a flat array containing all the row-nodes of the subtree. Descendants + self
   */

  RowParent.prototype.getRows = function(batchArray) {
    var child, j, len, ref;
    if (batchArray == null) {
      batchArray = [];
    }
    if (this.hasOwnRow) {
      batchArray.push(this);
    }
    ref = this.children;
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      child.getRows(batchArray);
    }
    return batchArray;
  };


  /*
  	Generates a flat array containing all the nodes (row/non-row) of the subtree. Descendants + self
   */

  RowParent.prototype.getNodes = function(batchArray) {
    var child, j, len, ref;
    if (batchArray == null) {
      batchArray = [];
    }
    batchArray.push(this);
    ref = this.children;
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      child.getNodes(batchArray);
    }
    return batchArray;
  };


  /*
  	Generates a flat array containing all the descendant nodes the current node
   */

  RowParent.prototype.getDescendants = function() {
    var batchArray, child, j, len, ref;
    batchArray = [];
    ref = this.children;
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      child.getNodes(batchArray);
    }
    return batchArray;
  };


  /*
  	Builds and populates the TRs for each row type. Inserts them into the DOM.
  	Does this only for this single row. Not recursive. If not a row (hasOwnRow=false), does not render anything.
  	PRECONDITION: assumes the parent has already been rendered.
   */

  RowParent.prototype.render = function() {
    var prevRow, ref, renderMethodName, tbody, tr, trNodes, type;
    this.trHash = {};
    trNodes = [];
    if (this.hasOwnRow) {
      prevRow = this.getPrevRow();
      ref = this.view.tbodyHash;
      for (type in ref) {
        tbody = ref[type];
        tr = $('<tr/>');
        this.trHash[type] = tr;
        trNodes.push(tr[0]);
        renderMethodName = 'render' + capitaliseFirstLetter(type) + 'Content';
        if (this[renderMethodName]) {
          this[renderMethodName](tr);
        }
        if (prevRow) {
          prevRow.trHash[type].after(tr);
        } else {
          tbody.prepend(tr);
        }
      }
    }
    this.trs = $(trNodes).on('click', '.fc-expander', proxy(this, 'toggleExpanded'));
    return this.isRendered = true;
  };


  /*
  	Unpopulates and removes all of this row's TRs from the DOM. Only for this single row. Not recursive.
  	Will trigger "hidden".
   */

  RowParent.prototype.unrender = function() {
    var ref, tr, type, unrenderMethodName;
    if (this.isRendered) {
      ref = this.trHash;
      for (type in ref) {
        tr = ref[type];
        unrenderMethodName = 'unrender' + capitaliseFirstLetter(type) + 'Content';
        if (this[unrenderMethodName]) {
          this[unrenderMethodName](tr);
        }
      }
      this.trHash = {};
      this.trs.remove();
      this.trs = $();
      this.isRendered = false;
      this.isShown = false;
      return this.hidden();
    }
  };


  /*
  	Like unrender(), but does it for this row AND all descendants.
  	NOTE: batchRows/unbatchRows should probably be called before this happens :(
   */

  RowParent.prototype.recursivelyUnrender = function() {
    var child, j, len, ref, results;
    this.unrender();
    ref = this.children;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      results.push(child.recursivelyUnrender());
    }
    return results;
  };


  /*
  	A simple getter for retrieving a TR jQuery object of a certain row type
   */

  RowParent.prototype.getTr = function(type) {
    return this.trHash[type];
  };


  /*
  	Renders this row if not already rendered, making sure it is visible.
  	Also renders descendants of this subtree, based on whether they are expanded or not.
  	NOTE: If called externally, batchRows/unbatchRows should probably be called before this happens :(
   */

  RowParent.prototype.show = function() {
    var child, j, len, ref, results;
    if (!this.isShown) {
      if (!this.isRendered) {
        this.render();
      } else {
        this.trs.css('display', '');
      }
      if (this.ensureSegsRendered) {
        this.ensureSegsRendered();
      }
      if (this.isExpanded) {
        this.indicateExpanded();
      } else {
        this.indicateCollapsed();
      }
      this.isShown = true;
      this.shown();
      if (this.isExpanded) {
        ref = this.children;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          child = ref[j];
          results.push(child.show());
        }
        return results;
      }
    }
  };


  /*
  	Temporarily hides this node's TRs (if applicable) as well as all nodes in the subtree
   */

  RowParent.prototype.hide = function() {
    var child, j, len, ref, results;
    if (this.isShown) {
      if (this.isRendered) {
        this.trs.hide();
      }
      this.isShown = false;
      this.hidden();
      if (this.isExpanded) {
        ref = this.children;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          child = ref[j];
          results.push(child.hide());
        }
        return results;
      }
    }
  };


  /*
  	Reveals this node's children if they have not already been revealed. Changes any expander icon.
   */

  RowParent.prototype.expand = function() {
    var child, j, len, ref;
    if (!this.isExpanded) {
      this.isExpanded = true;
      this.indicateExpanded();
      this.view.batchRows();
      ref = this.children;
      for (j = 0, len = ref.length; j < len; j++) {
        child = ref[j];
        child.show();
      }
      this.view.unbatchRows();
      return this.animateExpand();
    }
  };


  /*
  	Hides this node's children if they are not already hidden. Changes any expander icon.
   */

  RowParent.prototype.collapse = function() {
    var child, j, len, ref;
    if (this.isExpanded) {
      this.isExpanded = false;
      this.indicateCollapsed();
      this.view.batchRows();
      ref = this.children;
      for (j = 0, len = ref.length; j < len; j++) {
        child = ref[j];
        child.hide();
      }
      return this.view.unbatchRows();
    }
  };


  /*
  	Switches between expanded/collapsed states
   */

  RowParent.prototype.toggleExpanded = function() {
    if (this.isExpanded) {
      return this.collapse();
    } else {
      return this.expand();
    }
  };


  /*
  	Changes the expander icon to the "expanded" state
   */

  RowParent.prototype.indicateExpanded = function() {
    return this.trs.find('.fc-expander').removeClass(this.getCollapsedIcon()).addClass(this.getExpandedIcon());
  };


  /*
  	Changes the expander icon to the "collapsed" state
   */

  RowParent.prototype.indicateCollapsed = function() {
    return this.trs.find('.fc-expander').removeClass(this.getExpandedIcon()).addClass(this.getCollapsedIcon());
  };


  /*
   */

  RowParent.prototype.enableExpanding = function() {
    return this.trs.find('.fc-expander-space').addClass('fc-expander');
  };


  /*
   */

  RowParent.prototype.disableExpanding = function() {
    return this.trs.find('.fc-expander-space').removeClass('fc-expander').removeClass(this.getExpandedIcon()).removeClass(this.getCollapsedIcon());
  };

  RowParent.prototype.getExpandedIcon = function() {
    return 'fc-icon-down-triangle';
  };

  RowParent.prototype.getCollapsedIcon = function() {
    var dir;
    dir = this.view.isRTL ? 'left' : 'right';
    return 'fc-icon-' + dir + '-triangle';
  };


  /*
  	Causes a slide-down CSS transition to demonstrate that the expand has happened
   */

  RowParent.prototype.animateExpand = function() {
    var ref, ref1, trs;
    trs = (ref = this.children[0]) != null ? (ref1 = ref.getLeadingRow()) != null ? ref1.trs : void 0 : void 0;
    if (trs) {
      trs.addClass('fc-collapsed');
      setTimeout(function() {
        trs.addClass('fc-transitioning');
        return trs.removeClass('fc-collapsed');
      });
      return trs.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
        return trs.removeClass('fc-transitioning');
      });
    }
  };


  /*
  	Find each TRs "inner div" (div within first cell). This div controls each TRs height.
  	Returns the max pixel height.
   */

  RowParent.prototype.getMaxTrInnerHeight = function() {
    var max;
    max = 0;
    $.each(this.trHash, (function(_this) {
      return function(type, tr) {
        var innerEl;
        innerEl = getFirstOwnRow(tr).find('> div');
        return max = Math.max(innerEl.height(), max);
      };
    })(this));
    return max;
  };


  /*
  	Find each TRs "inner div" and sets all of their heights to the same value.
   */

  RowParent.prototype.setTrInnerHeight = function(height) {
    return getFirstOwnRow(this.trs).find('> div').height(height);
  };


  /*
  	Triggered when the current node has been shown (either freshly rendered or re-shown)
  	when it had previously been unrendered or hidden. `shown` does not bubble up the hierarchy.
   */

  RowParent.prototype.shown = function() {
    if (this.hasOwnRow) {
      return this.rowShown(this);
    }
  };


  /*
  	Triggered when the current node has been hidden (either temporarily or permanently)
  	when it had previously been shown. `hidden` does not bubble up the hierarchy.
   */

  RowParent.prototype.hidden = function() {
    if (this.hasOwnRow) {
      return this.rowHidden(this);
    }
  };


  /*
  	Just like `shown`, but only triggered for nodes that are actual rows. Bubbles up the hierarchy.
   */

  RowParent.prototype.rowShown = function(row) {
    return (this.parent || this.view).rowShown(row);
  };


  /*
  	Just like `hidden`, but only triggered for nodes that are actual rows. Bubbles up the hierarchy.
   */

  RowParent.prototype.rowHidden = function(row) {
    return (this.parent || this.view).rowHidden(row);
  };


  /*
  	Triggered when the current node has been added to the hierarchy. `added` does not bubble up.
   */

  RowParent.prototype.added = function() {
    if (this.hasOwnRow) {
      return this.rowAdded(this);
    }
  };


  /*
  	Triggered when the current node has been removed from the hierarchy. `removed` does not bubble up.
   */

  RowParent.prototype.removed = function() {
    if (this.hasOwnRow) {
      return this.rowRemoved(this);
    }
  };


  /*
  	Just like `added`, but only triggered for nodes that are actual rows. Bubbles up the hierarchy.
   */

  RowParent.prototype.rowAdded = function(row) {
    return (this.parent || this.view).rowAdded(row);
  };


  /*
  	Just like `removed`, but only triggered for nodes that are actual rows. Bubbles up the hierarchy.
   */

  RowParent.prototype.rowRemoved = function(row) {
    return (this.parent || this.view).rowRemoved(row);
  };

  return RowParent;

})();


/*
An abstract node in a row-hierarchy tree that contains other nodes.
Will have some sort of rendered label indicating the grouping,
up to the subclass for determining what to do with it.
 */

RowGroup = (function(superClass) {
  extend(RowGroup, superClass);

  RowGroup.prototype.groupSpec = null;

  RowGroup.prototype.groupValue = null;

  function RowGroup(view, groupSpec1, groupValue1) {
    this.groupSpec = groupSpec1;
    this.groupValue = groupValue1;
    RowGroup.__super__.constructor.apply(this, arguments);
  }


  /*
  	Called when this row (if it renders a row) or a subrow is removed
   */

  RowGroup.prototype.rowRemoved = function(row) {
    RowGroup.__super__.rowRemoved.apply(this, arguments);
    if (row !== this && !this.children.length) {
      return this.remove();
    }
  };


  /*
  	Renders the content wrapper element that will be inserted into this row's TD cell
   */

  RowGroup.prototype.renderGroupContentEl = function() {
    var contentEl, filter;
    contentEl = $('<div class="fc-cell-content" />').append(this.renderGroupTextEl());
    filter = this.groupSpec.render;
    if (typeof filter === 'function') {
      contentEl = filter(contentEl, this.groupValue) || contentEl;
    }
    return contentEl;
  };


  /*
  	Renders the text span element that will be inserted into this row's TD cell.
  	Goes within the content element.
   */

  RowGroup.prototype.renderGroupTextEl = function() {
    var filter, text;
    text = this.groupValue || '';
    filter = this.groupSpec.text;
    if (typeof filter === 'function') {
      text = filter(text) || text;
    }
    return $('<span class="fc-cell-text" />').text(text);
  };

  return RowGroup;

})(RowParent);


/*
A row grouping that renders as a single solid row that spans width-wise (like a horizontal rule)
 */

HRowGroup = (function(superClass) {
  extend(HRowGroup, superClass);

  function HRowGroup() {
    return HRowGroup.__super__.constructor.apply(this, arguments);
  }

  HRowGroup.prototype.hasOwnRow = true;


  /*
  	Renders this row's TR for the "spreadsheet" quadrant, the area with info about each resource
   */

  HRowGroup.prototype.renderSpreadsheetContent = function(tr) {
    var contentEl;
    contentEl = this.renderGroupContentEl();
    contentEl.prepend('<span class="fc-icon fc-expander" />');
    return $('<td class="fc-divider" />').attr('colspan', this.view.colSpecs.length).append($('<div/>').append(contentEl)).appendTo(tr);
  };


  /*
  	Renders this row's TR for the quadrant that contains a resource's events
   */

  HRowGroup.prototype.renderEventContent = function(tr) {
    return tr.append('<td class="fc-divider"> <div/> </td>');
  };

  return HRowGroup;

})(RowGroup);


/*
A row grouping that renders as a tall multi-cell vertical span in the "spreadsheet" area
 */

VRowGroup = (function(superClass) {
  extend(VRowGroup, superClass);

  function VRowGroup() {
    return VRowGroup.__super__.constructor.apply(this, arguments);
  }

  VRowGroup.prototype.rowspan = 0;

  VRowGroup.prototype.leadingTr = null;

  VRowGroup.prototype.groupTd = null;


  /*
  	Called when a row somewhere within the grouping is shown
   */

  VRowGroup.prototype.rowShown = function(row) {
    this.rowspan += 1;
    this.renderRowspan();
    return VRowGroup.__super__.rowShown.apply(this, arguments);
  };


  /*
  	Called when a row somewhere within the grouping is hidden
   */

  VRowGroup.prototype.rowHidden = function(row) {
    this.rowspan -= 1;
    this.renderRowspan();
    return VRowGroup.__super__.rowHidden.apply(this, arguments);
  };


  /*
  	Makes sure the groupTd has the correct rowspan / place in the DOM.
  	PRECONDITION: in the case of multiple group nesting, a child's renderRowspan()
  	will be called before the parent's renderRowspan().
   */

  VRowGroup.prototype.renderRowspan = function() {
    var leadingTr;
    if (this.rowspan) {
      if (!this.groupTd) {
        this.groupTd = $('<td class="' + this.view.widgetContentClass + '"/>').append(this.renderGroupContentEl());
      }
      this.groupTd.attr('rowspan', this.rowspan);
      leadingTr = this.getLeadingRow().getTr('spreadsheet');
      if (leadingTr !== this.leadingTr) {
        if (leadingTr) {
          leadingTr.prepend(this.groupTd);
        }
        return this.leadingTr = leadingTr;
      }
    } else {
      if (this.groupTd) {
        this.groupTd.remove();
        this.groupTd = null;
      }
      return this.leadingTr = null;
    }
  };

  return VRowGroup;

})(RowGroup);

EventRow = (function(superClass) {
  extend(EventRow, superClass);

  function EventRow() {
    return EventRow.__super__.constructor.apply(this, arguments);
  }

  EventRow.prototype.hasOwnRow = true;

  EventRow.prototype.segContainerEl = null;

  EventRow.prototype.segContainerHeight = null;

  EventRow.prototype.innerEl = null;

  EventRow.prototype.bgSegContainerEl = null;

  EventRow.prototype.isSegsRendered = false;

  EventRow.prototype.bgSegs = null;

  EventRow.prototype.fgSegs = null;

  EventRow.prototype.renderEventContent = function(tr) {
    tr.html('<td class="' + this.view.widgetContentClass + '"> <div> <div class="fc-event-container" /> </div> </td>');
    this.segContainerEl = tr.find('.fc-event-container');
    this.innerEl = this.bgSegContainerEl = tr.find('td > div');
    return this.ensureSegsRendered();
  };

  EventRow.prototype.ensureSegsRendered = function() {
    if (!this.isSegsRendered) {
      if (this.bgSegs) {
        this.view.timeGrid.renderFillInContainer('bgEvent', this, this.bgSegs);
      }
      if (this.fgSegs) {
        this.view.timeGrid.renderFgSegsInContainers([[this, this.fgSegs]]);
      }
      return this.isSegsRendered = true;
    }
  };

  EventRow.prototype.unrenderEventContent = function() {
    this.bgSegs = null;
    this.fgSegs = null;
    return this.isSegsRendered = false;
  };

  return EventRow;

})(RowParent);


/*
A row that renders information about a particular resource, as well as it events (handled by superclass)
 */

ResourceRow = (function(superClass) {
  extend(ResourceRow, superClass);

  ResourceRow.prototype.resource = null;

  function ResourceRow(view, resource1) {
    this.resource = resource1;
    ResourceRow.__super__.constructor.apply(this, arguments);
  }


  /*
  	Called when a row in the tree has been added
   */

  ResourceRow.prototype.rowAdded = function(row) {
    ResourceRow.__super__.rowAdded.apply(this, arguments);
    if (row !== this && this.isRendered) {
      if (this.children.length === 1) {
        this.enableExpanding();
        if (this.isExpanded) {
          return this.indicateExpanded();
        } else {
          return this.indicateCollapsed();
        }
      }
    }
  };


  /*
  	Called when a row in the tree has been removed
   */

  ResourceRow.prototype.rowRemoved = function(row) {
    ResourceRow.__super__.rowRemoved.apply(this, arguments);
    if (row !== this && this.isRendered) {
      if (!this.children.length) {
        return this.disableExpanding();
      }
    }
  };

  ResourceRow.prototype.render = function() {
    ResourceRow.__super__.render.apply(this, arguments);
    if (this.children.length > 0) {
      this.enableExpanding();
    } else {
      this.disableExpanding();
    }
    return this.view.trigger('resourceRender', this.resource, this.resource, this.getTr('spreadsheet').find('> td'), this.getTr('event').find('> td'));
  };


  /*
  	Populates the TR with cells containing data about the resource
   */

  ResourceRow.prototype.renderSpreadsheetContent = function(tr) {
    var colSpec, contentEl, input, j, len, ref, resource, results, td, text;
    resource = this.resource;
    ref = this.view.colSpecs;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      colSpec = ref[j];
      if (colSpec.group) {
        continue;
      }
      input = colSpec.field ? resource[colSpec.field] || null : resource;
      text = typeof colSpec.text === 'function' ? colSpec.text(resource, input) : input;
      contentEl = $('<div class="fc-cell-content">' + (colSpec.isMain ? this.renderGutterHtml() : '') + '<span class="fc-cell-text">' + (text ? htmlEscape(text) : '&nbsp;') + '</span>' + '</div>');
      if (typeof colSpec.render === 'function') {
        contentEl = colSpec.render(resource, contentEl, input) || contentEl;
      }
      td = $('<td class="' + this.view.widgetContentClass + '"/>').append(contentEl);
      if (colSpec.isMain) {
        td.wrapInner('<div/>');
      }
      results.push(tr.append(td));
    }
    return results;
  };


  /*
  	Renders the HTML responsible for the subrow expander area,
  	as well as the space before it (used to align expanders of similar depths)
   */

  ResourceRow.prototype.renderGutterHtml = function() {
    var html, i, j, ref;
    html = '';
    for (i = j = 0, ref = this.depth; j < ref; i = j += 1) {
      html += '<span class="fc-icon"/>';
    }
    html += '<span class="fc-icon fc-expander-space"/>';
    return html;
  };

  return ResourceRow;

})(EventRow);

FC.views.timeline.resourceClass = ResourceTimelineView;

RELEASE_DATE = '2015-10-18';

UPGRADE_WINDOW = {
  years: 1,
  weeks: 1
};

LICENSE_INFO_URL = 'http://fullcalendar.io/scheduler/license/';

PRESET_LICENSE_KEYS = ['GPL-My-Project-Is-Open-Source', 'CC-Attribution-NonCommercial-NoDerivatives'];

processLicenseKey = function(key, containerEl) {
  if (!isImmuneUrl(window.location.href) && !isValidKey(key)) {
    return renderingWarningInContainer('Please use a valid license key. <a href="' + LICENSE_INFO_URL + '">More Info</a>', containerEl);
  }
};


/*
This decryption is not meant to be bulletproof. Just a way to remind about an upgrade.
 */

isValidKey = function(key) {
  var minPurchaseDate, parts, purchaseDate, releaseDate;
  if ($.inArray(key, PRESET_LICENSE_KEYS) !== -1) {
    return true;
  }
  parts = (key || '').match(/^(\d+)\-fcs\-(\d+)$/);
  if (parts && parts[1].length === 10) {
    purchaseDate = moment.utc(parseInt(parts[2]) * 1000);
    releaseDate = moment.utc(FC.mockSchedulerReleaseDate || RELEASE_DATE);
    if (releaseDate.isValid()) {
      minPurchaseDate = releaseDate.clone().subtract(UPGRADE_WINDOW);
      if (purchaseDate.isAfter(minPurchaseDate)) {
        return true;
      }
    }
  }
  return false;
};

isImmuneUrl = function(url) {
  return Boolean(url.match(/\w+\:\/\/fullcalendar\.io\/|\/demos\/[\w-]+\.html$/));
};

renderingWarningInContainer = function(messageHtml, containerEl) {
  return containerEl.append($('<div class="fc-license-message" />').html(messageHtml));
};

});
