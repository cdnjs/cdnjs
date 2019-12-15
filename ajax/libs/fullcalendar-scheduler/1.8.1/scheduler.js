/*!
 * FullCalendar Scheduler v1.8.1
 * Docs & License: https://fullcalendar.io/scheduler/
 * (c) 2017 Adam Shaw
 */

(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define([ 'jquery', 'moment', 'fullcalendar' ], factory);
	}
	else if (typeof exports === 'object') { // Node/CommonJS
		module.exports = factory(
			require('jquery'),
			require('moment'),
			require('fullcalendar')
		);
	}
	else {
		factory(jQuery, moment);
	}
})(function($, moment) {

;;

var FC = $.fullCalendar;
FC.schedulerVersion = "1.8.1";

/*
When the required internal version is upped,
also update the .json files with a new minor version requirement.
Example: bump ~2.7.2 to ~2.8.0
Use a tilde to match future patch-level changes only!
*/
if (FC.internalApiVersion !== 11) {
	FC.warn(
		'v' + FC.schedulerVersion + ' of FullCalendar Scheduler ' +
		'is incompatible with v' + FC.version + ' of the core.\n' +
		'Please see http://fullcalendar.io/support/ for more information.'
	);
	return; // stop execution. don't load the plugin
}

var Calendar = FC.Calendar;
var Class = FC.Class;
var View = FC.View;
var debounce = FC.debounce;
var isInt = FC.isInt;
var removeExact = FC.removeExact;
var getScrollbarWidths = FC.getScrollbarWidths;
var DragListener = FC.DragListener;
var htmlEscape = FC.htmlEscape;
var computeGreatestUnit = FC.computeGreatestUnit;
var proxy = FC.proxy;
var capitaliseFirstLetter = FC.capitaliseFirstLetter;
var applyAll = FC.applyAll;
var EmitterMixin = FC.EmitterMixin;
var ListenerMixin = FC.ListenerMixin;
var durationHasTime = FC.durationHasTime;
var divideRangeByDuration = FC.divideRangeByDuration;
var divideDurationByDuration = FC.divideDurationByDuration;
var multiplyDuration = FC.multiplyDuration;
var parseFieldSpecs = FC.parseFieldSpecs;
var compareByFieldSpecs = FC.compareByFieldSpecs;
var flexibleCompare = FC.flexibleCompare;
var intersectRects = FC.intersectRects;
var CoordCache = FC.CoordCache;
var getContentRect = FC.getContentRect;
var getOuterRect = FC.getOuterRect;
var Promise = FC.Promise;
var TaskQueue = FC.TaskQueue;
var UnzonedRange = FC.UnzonedRange;
var ComponentFootprint = FC.ComponentFootprint;
var EventDef = FC.EventDef;
var EventSource = FC.EventSource;
var EventFootprint = FC.EventFootprint;
var EventDefMutation = FC.EventDefMutation;
var cssToStr = FC.cssToStr;
var DateComponent = FC.DateComponent;
var InteractiveDateComponent = FC.InteractiveDateComponent;
var EventRenderer = FC.EventRenderer;
var BusinessHourRenderer = FC.BusinessHourRenderer;
var FillRenderer = FC.FillRenderer;
var HelperRenderer = FC.HelperRenderer;
var StandardInteractionsMixin = FC.StandardInteractionsMixin;
var DateSelecting = FC.DateSelecting;
var EventPointing = FC.EventPointing;
var EventDragging = FC.EventDragging;
var EventResizing = FC.EventResizing;
var ExternalDropping = FC.ExternalDropping;
var BusinessHourGenerator = FC.BusinessHourGenerator;
var EventInstanceGroup = FC.EventInstanceGroup;

;;

/*
Given a jQuery <tr> set, returns the <td>'s that do not have multi-line rowspans.
Would use the [rowspan] selector, but never not defined in IE8.
 */
var COL_MIN_WIDTH, Calendar_buildCurrentBusinessFootprints, Calendar_buildSelectFootprint, Calendar_constructed, Calendar_eventRangeToEventFootprints, Calendar_footprintContainsFootprint, Calendar_footprintsIntersect, Calendar_getPeerEventInstances, Calendar_isFootprintAllowed, Calendar_parseFootprints, Calendar_requestEvents, ClippedScroller, DEFAULT_GRID_DURATION, DateComponent_eventRangeToEventFootprints, DateSelecting_computeSelectionFootprint, EnhancedScroller, EventDef_applyMiscProps, EventDef_clone, EventDef_toLegacy, EventDragging_computeEventDropMutation, EventRenderer_getFallbackStylingObjs, EventResizing_computeEventEndResizeMutation, EventResizing_computeEventStartResizeMutation, EventRow, ExternalDropping_computeExternalDrop, HRowGroup, InteractiveDateComponent_isEventDefDraggable, LICENSE_INFO_URL, MAX_AUTO_CELLS, MAX_AUTO_SLOTS_PER_LABEL, MAX_CELLS, MIN_AUTO_LABELS, PRESET_LICENSE_KEYS, RELEASE_DATE, Resource, ResourceAgendaView, ResourceBasicView, ResourceComponentFootprint, ResourceDayGrid, ResourceDayTableMixin, ResourceManager, ResourceMonthView, ResourceRow, ResourceTimeGrid, ResourceTimelineEventRenderer, ResourceTimelineView, ResourceViewMixin, RowGroup, RowParent, STOCK_SUB_DURATIONS, ScrollFollower, ScrollFollowerSprite, ScrollJoiner, ScrollerCanvas, Spreadsheet, TimelineEventDragging, TimelineEventRenderer, TimelineEventResizing, TimelineFillRenderer, TimelineHelperRenderer, TimelineView, UPGRADE_WINDOW, VRowGroup, View_removeElement, View_setElement, View_triggerViewRender, _filterResourcesWithEvents, computeOffsetForSeg, computeOffsetForSegs, copyRect, detectWarningInContainer, getOwnCells, getRectHeight, getRectWidth, groupEventFootprintsByResourceId, hContainRect, isImmuneUrl, isValidKey, joinRects, oldMutateSingle, processLicenseKey, renderingWarningInContainer, testRectContains, testRectHContains, testRectVContains, timeRowSegsCollide, vContainRect,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

getOwnCells = function(trs) {
  return trs.find('> td').filter(function(i, tdNode) {
    return tdNode.rowSpan <= 1;
  });
};


/*
A Scroller with additional functionality:
- optional ScrollerCanvas for content
- fired events for scroll start/end
- cross-browser normalization of horizontal scroll for RTL
 */

EnhancedScroller = (function(superClass) {
  var detectRtlScrollSystem, rtlScrollSystem;

  extend(EnhancedScroller, superClass);

  EnhancedScroller.mixin(EmitterMixin);

  EnhancedScroller.mixin(ListenerMixin);

  EnhancedScroller.prototype.canvas = null;

  EnhancedScroller.prototype.isScrolling = false;

  EnhancedScroller.prototype.isTouching = false;

  EnhancedScroller.prototype.isTouchedEver = false;

  EnhancedScroller.prototype.isMoving = false;

  EnhancedScroller.prototype.isTouchScrollEnabled = true;

  EnhancedScroller.prototype.preventTouchScrollHandler = null;

  function EnhancedScroller() {
    EnhancedScroller.__super__.constructor.apply(this, arguments);
    this.requestMovingEnd = debounce(this.reportMovingEnd, 500);
  }

  EnhancedScroller.prototype.render = function() {
    EnhancedScroller.__super__.render.apply(this, arguments);
    if (this.canvas) {
      this.canvas.render();
      this.canvas.el.appendTo(this.scrollEl);
    }
    return this.bindHandlers();
  };

  EnhancedScroller.prototype.destroy = function() {
    EnhancedScroller.__super__.destroy.apply(this, arguments);
    return this.unbindHandlers();
  };

  EnhancedScroller.prototype.disableTouchScroll = function() {
    this.isTouchScrollEnabled = false;
    return this.bindPreventTouchScroll();
  };

  EnhancedScroller.prototype.enableTouchScroll = function() {
    this.isTouchScrollEnabled = true;
    if (!this.isTouching) {
      return this.unbindPreventTouchScroll();
    }
  };

  EnhancedScroller.prototype.bindPreventTouchScroll = function() {
    if (!this.preventTouchScrollHandler) {
      return this.scrollEl.on('touchmove', this.preventTouchScrollHandler = FC.preventDefault);
    }
  };

  EnhancedScroller.prototype.unbindPreventTouchScroll = function() {
    if (this.preventTouchScrollHandler) {
      this.scrollEl.off('touchmove', this.preventTouchScrollHandler);
      return this.preventTouchScrollHandler = null;
    }
  };

  EnhancedScroller.prototype.bindHandlers = function() {
    return this.listenTo(this.scrollEl, {
      scroll: this.reportScroll,
      touchstart: this.reportTouchStart,
      touchend: this.reportTouchEnd
    });
  };

  EnhancedScroller.prototype.unbindHandlers = function() {
    return this.stopListeningTo(this.scrollEl);
  };

  EnhancedScroller.prototype.reportScroll = function() {
    if (!this.isScrolling) {
      this.reportScrollStart();
    }
    this.trigger('scroll');
    this.isMoving = true;
    return this.requestMovingEnd();
  };

  EnhancedScroller.prototype.reportScrollStart = function() {
    if (!this.isScrolling) {
      this.isScrolling = true;
      return this.trigger('scrollStart', this.isTouching);
    }
  };

  EnhancedScroller.prototype.requestMovingEnd = null;

  EnhancedScroller.prototype.reportMovingEnd = function() {
    this.isMoving = false;
    if (!this.isTouching) {
      return this.reportScrollEnd();
    }
  };

  EnhancedScroller.prototype.reportScrollEnd = function() {
    if (this.isScrolling) {
      this.trigger('scrollEnd');
      return this.isScrolling = false;
    }
  };

  EnhancedScroller.prototype.reportTouchStart = function() {
    this.isTouching = true;
    return this.isTouchedEver = true;
  };

  EnhancedScroller.prototype.reportTouchEnd = function() {
    if (this.isTouching) {
      this.isTouching = false;
      if (this.isTouchScrollEnabled) {
        this.unbindPreventTouchScroll();
      }
      if (!this.isMoving) {
        return this.reportScrollEnd();
      }
    }
  };


  /*
  	If RTL, and scrolled to the left, returns NEGATIVE value (like Firefox)
   */

  EnhancedScroller.prototype.getScrollLeft = function() {
    var direction, node, val;
    direction = this.scrollEl.css('direction');
    node = this.scrollEl[0];
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
  };


  /*
  	Accepts a NEGATIVE value for when scrolled in RTL
   */

  EnhancedScroller.prototype.setScrollLeft = function(val) {
    var direction, node;
    direction = this.scrollEl.css('direction');
    node = this.scrollEl[0];
    if (direction === 'rtl') {
      switch (rtlScrollSystem) {
        case 'positive':
          val = val - node.clientWidth + node.scrollWidth;
          break;
        case 'reverse':
          val = -val;
      }
    }
    return node.scrollLeft = val;
  };


  /*
  	Always returns the number of pixels scrolled from the leftmost position (even if RTL).
  	Always positive.
   */

  EnhancedScroller.prototype.getScrollFromLeft = function() {
    var direction, node, val;
    direction = this.scrollEl.css('direction');
    node = this.scrollEl[0];
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

  EnhancedScroller.prototype.getNativeScrollLeft = function() {
    return this.scrollEl[0].scrollLeft;
  };

  EnhancedScroller.prototype.setNativeScrollLeft = function(val) {
    return this.scrollEl[0].scrollLeft = val;
  };

  rtlScrollSystem = null;

  detectRtlScrollSystem = function() {
    var el, node, system;
    el = $('<div style=" position: absolute; top: -1000px; width: 1px; height: 1px; overflow: scroll; direction: rtl; font-size: 100px; ">A</div>').appendTo('body');
    node = el[0];
    system = node.scrollLeft > 0 ? 'positive' : (node.scrollLeft = 1, el.scrollLeft > 0 ? 'reverse' : 'negative');
    el.remove();
    return system;
  };

  $(function() {
    return rtlScrollSystem = detectRtlScrollSystem();
  });

  return EnhancedScroller;

})(FC.Scroller);


/*
A Scroller, but with a wrapping div that allows "clipping" away of native scrollbars,
giving the appearance that there are no scrollbars.
 */

ClippedScroller = (function(superClass) {
  extend(ClippedScroller, superClass);

  ClippedScroller.prototype.isHScrollbarsClipped = false;

  ClippedScroller.prototype.isVScrollbarsClipped = false;


  /*
  	Received overflows can be set to 'clipped', meaning scrollbars shouldn't be visible
  	to the user, but the area should still scroll.
   */

  function ClippedScroller() {
    ClippedScroller.__super__.constructor.apply(this, arguments);
    if (this.overflowX === 'clipped-scroll') {
      this.overflowX = 'scroll';
      this.isHScrollbarsClipped = true;
    }
    if (this.overflowY === 'clipped-scroll') {
      this.overflowY = 'scroll';
      this.isVScrollbarsClipped = true;
    }
  }

  ClippedScroller.prototype.renderEl = function() {
    var scrollEl;
    scrollEl = ClippedScroller.__super__.renderEl.apply(this, arguments);
    return $('<div class="fc-scroller-clip" />').append(scrollEl);
  };

  ClippedScroller.prototype.updateSize = function() {
    var cssProps, scrollEl, scrollbarWidths;
    scrollEl = this.scrollEl;
    scrollbarWidths = getScrollbarWidths(scrollEl);
    cssProps = {
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0
    };
    if (this.isHScrollbarsClipped) {
      cssProps.marginTop = -scrollbarWidths.top;
      cssProps.marginBottom = -scrollbarWidths.bottom;
    }
    if (this.isVScrollbarsClipped) {
      cssProps.marginLeft = -scrollbarWidths.left;
      cssProps.marginRight = -scrollbarWidths.right;
    }
    scrollEl.css(cssProps);
    return scrollEl.toggleClass('fc-no-scrollbars', (this.isHScrollbarsClipped || this.overflowX === 'hidden') && (this.isVScrollbarsClipped || this.overflowY === 'hidden') && !(scrollbarWidths.top || scrollbarWidths.bottom || scrollbarWidths.left || scrollbarWidths.right));
  };


  /*
  	Accounts for 'clipped' scrollbars
   */

  ClippedScroller.prototype.getScrollbarWidths = function() {
    var widths;
    widths = getScrollbarWidths(this.scrollEl);
    if (this.isHScrollbarsClipped) {
      widths.top = 0;
      widths.bottom = 0;
    }
    if (this.isVScrollbarsClipped) {
      widths.left = 0;
      widths.right = 0;
    }
    return widths;
  };

  return ClippedScroller;

})(EnhancedScroller);


/*
A rectangular area of content that lives within a Scroller.
Can have "gutters", areas of dead spacing around the perimeter.
Also very useful for forcing a width, which a Scroller cannot do alone.
Has a content area that lives above a background area.
 */

ScrollerCanvas = (function() {
  ScrollerCanvas.prototype.el = null;

  ScrollerCanvas.prototype.contentEl = null;

  ScrollerCanvas.prototype.bgEl = null;

  ScrollerCanvas.prototype.gutters = null;

  ScrollerCanvas.prototype.width = null;

  ScrollerCanvas.prototype.minWidth = null;

  function ScrollerCanvas() {
    this.gutters = {};
  }

  ScrollerCanvas.prototype.render = function() {
    this.el = $('<div class="fc-scroller-canvas"> <div class="fc-content"></div> <div class="fc-bg"></div> </div>');
    this.contentEl = this.el.find('.fc-content');
    return this.bgEl = this.el.find('.fc-bg');
  };


  /*
  	If falsy, resets all the gutters to 0
   */

  ScrollerCanvas.prototype.setGutters = function(gutters) {
    if (!gutters) {
      this.gutters = {};
    } else {
      $.extend(this.gutters, gutters);
    }
    return this.updateSize();
  };

  ScrollerCanvas.prototype.setWidth = function(width1) {
    this.width = width1;
    return this.updateSize();
  };

  ScrollerCanvas.prototype.setMinWidth = function(minWidth1) {
    this.minWidth = minWidth1;
    return this.updateSize();
  };

  ScrollerCanvas.prototype.clearWidth = function() {
    this.width = null;
    this.minWidth = null;
    return this.updateSize();
  };

  ScrollerCanvas.prototype.updateSize = function() {
    var gutters;
    gutters = this.gutters;
    this.el.toggleClass('fc-gutter-left', Boolean(gutters.left)).toggleClass('fc-gutter-right', Boolean(gutters.right)).toggleClass('fc-gutter-top', Boolean(gutters.top)).toggleClass('fc-gutter-bottom', Boolean(gutters.bottom)).css({
      paddingLeft: gutters.left || '',
      paddingRight: gutters.right || '',
      paddingTop: gutters.top || '',
      paddingBottom: gutters.bottom || '',
      width: this.width != null ? this.width + (gutters.left || 0) + (gutters.right || 0) : '',
      minWidth: this.minWidth != null ? this.minWidth + (gutters.left || 0) + (gutters.right || 0) : ''
    });
    return this.bgEl.css({
      left: gutters.left || '',
      right: gutters.right || '',
      top: gutters.top || '',
      bottom: gutters.bottom || ''
    });
  };

  return ScrollerCanvas;

})();

ScrollJoiner = (function() {
  ScrollJoiner.prototype.axis = null;

  ScrollJoiner.prototype.scrollers = null;

  ScrollJoiner.prototype.masterScroller = null;

  function ScrollJoiner(axis, scrollers) {
    var j, len, ref, scroller;
    this.axis = axis;
    this.scrollers = scrollers;
    ref = this.scrollers;
    for (j = 0, len = ref.length; j < len; j++) {
      scroller = ref[j];
      this.initScroller(scroller);
    }
    return;
  }

  ScrollJoiner.prototype.initScroller = function(scroller) {
    scroller.scrollEl.on('wheel mousewheel DomMouseScroll MozMousePixelScroll', (function(_this) {
      return function() {
        _this.assignMasterScroller(scroller);
      };
    })(this));
    return scroller.on('scrollStart', (function(_this) {
      return function() {
        if (!_this.masterScroller) {
          return _this.assignMasterScroller(scroller);
        }
      };
    })(this)).on('scroll', (function(_this) {
      return function() {
        var j, len, otherScroller, ref, results;
        if (scroller === _this.masterScroller) {
          ref = _this.scrollers;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            otherScroller = ref[j];
            if (otherScroller !== scroller) {
              switch (_this.axis) {
                case 'horizontal':
                  results.push(otherScroller.setNativeScrollLeft(scroller.getNativeScrollLeft()));
                  break;
                case 'vertical':
                  results.push(otherScroller.setScrollTop(scroller.getScrollTop()));
                  break;
                default:
                  results.push(void 0);
              }
            } else {
              results.push(void 0);
            }
          }
          return results;
        }
      };
    })(this)).on('scrollEnd', (function(_this) {
      return function() {
        if (scroller === _this.masterScroller) {
          return _this.unassignMasterScroller();
        }
      };
    })(this));
  };

  ScrollJoiner.prototype.assignMasterScroller = function(scroller) {
    var j, len, otherScroller, ref;
    this.unassignMasterScroller();
    this.masterScroller = scroller;
    ref = this.scrollers;
    for (j = 0, len = ref.length; j < len; j++) {
      otherScroller = ref[j];
      if (otherScroller !== scroller) {
        otherScroller.disableTouchScroll();
      }
    }
  };

  ScrollJoiner.prototype.unassignMasterScroller = function() {
    var j, len, otherScroller, ref;
    if (this.masterScroller) {
      ref = this.scrollers;
      for (j = 0, len = ref.length; j < len; j++) {
        otherScroller = ref[j];
        otherScroller.enableTouchScroll();
      }
      this.masterScroller = null;
    }
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
      scroller.canvas.setGutters(this.axis === 'horizontal' ? {
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

  ScrollFollower.prototype.spritesById = null;

  ScrollFollower.prototype.viewportRect = null;

  ScrollFollower.prototype.contentOffset = null;

  ScrollFollower.prototype.isHFollowing = true;

  ScrollFollower.prototype.isVFollowing = false;

  ScrollFollower.prototype.allowPointerEvents = false;

  ScrollFollower.prototype.containOnNaturalLeft = false;

  ScrollFollower.prototype.containOnNaturalRight = false;

  ScrollFollower.prototype.minTravel = 0;

  ScrollFollower.prototype.isTouch = false;

  ScrollFollower.prototype.isForcedRelative = false;

  function ScrollFollower(scroller, allowPointerEvents) {
    this.allowPointerEvents = allowPointerEvents != null ? allowPointerEvents : false;
    this.scroller = scroller;
    this.spritesById = {};
    scroller.on('scroll', (function(_this) {
      return function() {
        if (scroller.isTouchedEver) {
          _this.isTouch = true;
          return _this.isForcedRelative = true;
        } else {
          _this.isTouch = false;
          return _this.handleScroll();
        }
      };
    })(this));
    scroller.on('scrollEnd', (function(_this) {
      return function() {
        return _this.handleScroll();
      };
    })(this));
  }


  /*
  	`els` is as a jQuery set of elements.
  	If elements are already position:relative, is a performance benefit.
   */

  ScrollFollower.prototype.setSpriteEls = function(els) {
    var el, j, len, results, sprite;
    this.clearSprites();
    results = [];
    for (j = 0, len = els.length; j < len; j++) {
      el = els[j];
      sprite = new ScrollFollowerSprite($(el));
      results.push(this.addSprite(sprite));
    }
    return results;
  };

  ScrollFollower.prototype.clearSprites = function() {
    this.iterSprites(function(sprite) {
      return sprite.clear();
    });
    return this.spritesById = {};
  };

  ScrollFollower.prototype.addSprite = function(sprite) {
    sprite.follower = this;
    return this.spritesById[sprite.id] = sprite;
  };

  ScrollFollower.prototype.removeSprite = function(sprite) {
    sprite.clear();
    return delete this.spritesById[sprite.id];
  };

  ScrollFollower.prototype.handleScroll = function() {
    this.updateViewport();
    return this.updatePositions();
  };

  ScrollFollower.prototype.cacheDimensions = function() {
    this.updateViewport();
    this.scrollbarWidths = this.scroller.getScrollbarWidths();
    this.contentOffset = this.scroller.canvas.el.offset();
    this.iterSprites(function(sprite) {
      return sprite.cacheDimensions();
    });
  };

  ScrollFollower.prototype.updateViewport = function() {
    var left, scroller, top;
    scroller = this.scroller;
    left = scroller.getScrollFromLeft();
    top = scroller.getScrollTop();
    return this.viewportRect = {
      left: left,
      right: left + scroller.getClientWidth(),
      top: top,
      bottom: top + scroller.getClientHeight()
    };
  };

  ScrollFollower.prototype.forceRelative = function() {
    if (!this.isForcedRelative) {
      this.isForcedRelative = true;
      return this.iterSprites(function(sprite) {
        if (sprite.doAbsolute) {
          return sprite.assignPosition();
        }
      });
    }
  };

  ScrollFollower.prototype.clearForce = function() {
    if (this.isForcedRelative && !this.isTouch) {
      this.isForcedRelative = false;
      return this.iterSprites(function(sprite) {
        return sprite.assignPosition();
      });
    }
  };

  ScrollFollower.prototype.update = function() {
    this.cacheDimensions();
    return this.updatePositions();
  };

  ScrollFollower.prototype.updatePositions = function() {
    this.iterSprites(function(sprite) {
      return sprite.updatePosition();
    });
  };

  ScrollFollower.prototype.getContentRect = function(el) {
    return getContentRect(el, this.contentOffset);
  };

  ScrollFollower.prototype.getBoundingRect = function(el) {
    return getOuterRect(el, this.contentOffset);
  };

  ScrollFollower.prototype.iterSprites = function(func) {
    var id, ref, results, sprite;
    ref = this.spritesById;
    results = [];
    for (id in ref) {
      sprite = ref[id];
      results.push(func(sprite, id));
    }
    return results;
  };

  return ScrollFollower;

})();

ScrollFollowerSprite = (function() {
  ScrollFollowerSprite.prototype.id = null;

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


  /*
  	If given el is already position:relative, is a performance gain
   */

  function ScrollFollowerSprite(el1) {
    this.el = el1;
    this.id = String(ScrollFollowerSprite.uid++);
    this.isBlock = this.el.css('display') === 'block';
    if (this.el.css('position') !== 'relative') {
      this.el.css('position', 'relative');
    }
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
      } else if (this.doAbsolute && !this.follower.isForcedRelative) {
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
    var el;
    el = this.el.clone().addClass('fc-following');
    el.css({
      'position': 'absolute',
      'z-index': 1000,
      'font-weight': this.el.css('font-weight'),
      'font-size': this.el.css('font-size'),
      'font-family': this.el.css('font-family'),
      'text-decoration': this.el.css('text-decoration'),
      'color': this.el.css('color'),
      'padding-top': this.el.css('padding-top'),
      'padding-bottom': this.el.css('padding-bottom'),
      'padding-left': this.el.css('padding-left'),
      'padding-right': this.el.css('padding-right')
    });
    if (!this.follower.allowPointerEvents) {
      el.css('pointer-events', 'none');
    }
    return el;
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

ScrollFollowerSprite.uid = 0;

EventDef_applyMiscProps = EventDef.prototype.applyMiscProps;

EventDef_clone = EventDef.prototype.clone;

EventDef_toLegacy = EventDef.prototype.toLegacy;

EventDef.defineStandardProps({
  resourceEditable: true
});


/*
new class members
 */

EventDef.prototype.resourceIds = null;

EventDef.prototype.resourceEditable = null;


/*
NOTE: we can use defineStandardProps/applyManualStandardProps (example below)
once we do away with the deprecated eventResourceField.
 */

EventDef.prototype.applyMiscProps = function(rawProps) {
  rawProps = $.extend({}, rawProps);
  this.resourceIds = Resource.extractIds(rawProps, this.source.calendar);
  delete rawProps.resourceId;
  delete rawProps.resourceIds;
  return EventDef_applyMiscProps.apply(this, arguments);
};


/*
	EventDef.defineStandardProps({
		resourceId: false # manually handle
		resourceIds: false # manually handle
	})
	EventDef::applyManualStandardProps = (rawProps) ->
		origApplyManualStandardProps.apply(this, arguments)
		@resourceIds = Resource.extractIds(rawProps, @source.calendar)
 */


/*
resourceId should already be normalized
 */

EventDef.prototype.hasResourceId = function(resourceId) {
  return indexOf.call(this.resourceIds, resourceId) >= 0;
};


/*
resourceId should already be normalized
 */

EventDef.prototype.removeResourceId = function(resourceId) {
  return removeExact(this.resourceIds, resourceId);
};


/*
resourceId should already be normalized
 */

EventDef.prototype.addResourceId = function(resourceId) {
  if (!this.hasResourceId(resourceId)) {
    return this.resourceIds.push(resourceId);
  }
};

EventDef.prototype.getResourceIds = function() {
  if (this.resourceIds) {
    return this.resourceIds.slice();
  } else {
    return [];
  }
};

EventDef.prototype.clone = function() {
  var def;
  def = EventDef_clone.apply(this, arguments);
  def.resourceIds = this.getResourceIds();
  return def;
};

EventDef.prototype.toLegacy = function() {
  var obj, resourceIds;
  obj = EventDef_toLegacy.apply(this, arguments);
  resourceIds = this.getResourceIds();
  obj.resourceId = resourceIds.length === 1 ? resourceIds[0] : null;
  obj.resourceIds = resourceIds.length > 1 ? resourceIds : null;
  if (this.resourceEditable != null) {
    obj.resourceEditable = this.resourceEditable;
  }
  return obj;
};

oldMutateSingle = EventDefMutation.prototype.mutateSingle;

EventDefMutation.prototype.oldResourceId = null;

EventDefMutation.prototype.newResourceId = null;

EventDefMutation.prototype.mutateSingle = function(eventDef) {
  var savedResourceIds, undo;
  undo = oldMutateSingle.apply(this, arguments);
  savedResourceIds = null;
  if (this.oldResourceId && eventDef.hasResourceId(this.oldResourceId)) {
    savedResourceIds = eventDef.getResourceIds();
    eventDef.removeResourceId(this.oldResourceId);
    eventDef.addResourceId(this.newResourceId);
  }
  return (function(_this) {
    return function() {
      undo();
      if (savedResourceIds) {
        return eventDef.resourceIds = savedResourceIds;
      }
    };
  })(this);
};

EventSource.prototype.standardPropMap.resourceEditable = true;

Resource = (function() {
  function Resource() {}

  return Resource;

})();

Resource.extractIds = function(rawProps, calendar) {
  var j, len, rawResourceId, ref, resourceField, resourceIds;
  resourceField = calendar.opt('eventResourceField') || 'resourceId';
  resourceIds = [];
  if (rawProps.resourceIds) {
    ref = rawProps.resourceIds;
    for (j = 0, len = ref.length; j < len; j++) {
      rawResourceId = ref[j];
      resourceIds.push(Resource.normalizeId(rawResourceId));
    }
  }
  if (rawProps[resourceField] != null) {
    resourceIds.push(Resource.normalizeId(rawProps[resourceField]));
  }
  return resourceIds;
};

Resource.normalizeId = function(rawId) {
  return String(rawId);
};

ResourceManager = (function(superClass) {
  extend(ResourceManager, superClass);

  ResourceManager.mixin(EmitterMixin);

  ResourceManager.resourceGuid = 1;

  ResourceManager.ajaxDefaults = {
    dataType: 'json',
    cache: false
  };

  ResourceManager.prototype.calendar = null;

  ResourceManager.prototype.fetchId = 0;

  ResourceManager.prototype.topLevelResources = null;

  ResourceManager.prototype.resourcesById = null;

  ResourceManager.prototype.fetching = null;

  ResourceManager.prototype.currentStart = null;

  ResourceManager.prototype.currentEnd = null;

  function ResourceManager(calendar1) {
    this.calendar = calendar1;
    this.initializeCache();
  }


  /*
  	Like fetchResources, but won't refetch if already fetched.
   */

  ResourceManager.prototype.getResources = function(start, end) {
    var isSameRange;
    isSameRange = (!start && !this.currentStart) || (start && this.currentStart && start.isSame(this.currentStart) && end.isSame(this.currentEnd));
    if (!this.fetching || !isSameRange) {
      return this.fetchResources(start, end);
    } else {
      return this.fetching;
    }
  };


  /*
  	Will always fetch, even if done previously.
  	Accepts optional chrono-related params to pass on to the raw resource sources.
  	Returns a promise.
   */

  ResourceManager.prototype.fetchResources = function(start, end) {
    var currentFetchId;
    currentFetchId = (this.fetchId += 1);
    return this.fetching = Promise.construct((function(_this) {
      return function(resolve, reject) {
        return _this.fetchResourceInputs(function(resourceInputs) {
          if (currentFetchId === _this.fetchId) {
            _this.setResources(resourceInputs);
            return resolve(_this.topLevelResources);
          } else {
            return reject();
          }
        }, start, end);
      };
    })(this));
  };


  /*
  	Accepts optional chrono-related params to pass on to the raw resource sources.
  	Calls callback when done.
   */

  ResourceManager.prototype.fetchResourceInputs = function(callback, start, end) {
    var calendar, requestParams, source, timezone;
    calendar = this.calendar;
    source = calendar.opt('resources');
    timezone = calendar.opt('timezone');
    if ($.type(source) === 'string') {
      source = {
        url: source
      };
    }
    switch ($.type(source)) {
      case 'function':
        this.calendar.pushLoading();
        return source((function(_this) {
          return function(resourceInputs) {
            _this.calendar.popLoading();
            return callback(resourceInputs);
          };
        })(this), start, end, calendar.opt('timezone'));
      case 'object':
        calendar.pushLoading();
        requestParams = {};
        if (start && end) {
          requestParams[calendar.opt('startParam')] = start.format();
          requestParams[calendar.opt('endParam')] = end.format();
          if (timezone && timezone !== 'local') {
            requestParams[calendar.opt('timezoneParam')] = timezone;
          }
        }
        return $.ajax($.extend({
          data: requestParams
        }, ResourceManager.ajaxDefaults, source)).then((function(_this) {
          return function(resourceInputs) {
            calendar.popLoading();
            return callback(resourceInputs);
          };
        })(this));
      case 'array':
        return callback(source);
      default:
        return callback([]);
    }
  };

  ResourceManager.prototype.getResourceById = function(id) {
    return this.resourcesById[id];
  };

  ResourceManager.prototype.getFlatResources = function() {
    var id, results;
    results = [];
    for (id in this.resourcesById) {
      results.push(this.resourcesById[id]);
    }
    return results;
  };

  ResourceManager.prototype.initializeCache = function() {
    this.topLevelResources = [];
    return this.resourcesById = {};
  };

  ResourceManager.prototype.setResources = function(resourceInputs) {
    var j, len, resource, resourceInput, resources, validResources, wasSet;
    wasSet = Boolean(this.topLevelResources);
    this.initializeCache();
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
    if (wasSet) {
      this.trigger('reset', this.topLevelResources);
    } else {
      this.trigger('set', this.topLevelResources);
    }
    return this.calendar.publiclyTrigger('resourcesSet', [this.topLevelResources]);
  };

  ResourceManager.prototype.resetCurrentResources = function() {
    if (this.topLevelResources) {
      return this.trigger('reset', this.topLevelResources);
    }
  };

  ResourceManager.prototype.clear = function() {
    this.topLevelResources = null;
    return this.fetching = null;
  };

  ResourceManager.prototype.addResource = function(resourceInput) {
    if (this.fetching) {
      return this.fetching.then((function(_this) {
        return function() {
          var resource;
          resource = _this.buildResource(resourceInput);
          if (_this.addResourceToIndex(resource)) {
            _this.addResourceToTree(resource);
            _this.trigger('add', resource, _this.topLevelResources);
            return resource;
          } else {
            return false;
          }
        };
      })(this));
    } else {
      return Promise.reject();
    }
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
    var parent, parentId, ref, siblings;
    if (!resource.parent) {
      parentId = String((ref = resource['parentId']) != null ? ref : '');
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
    if (this.fetching) {
      return this.fetching.then((function(_this) {
        return function() {
          var resource;
          resource = _this.removeResourceFromIndex(id);
          if (resource) {
            _this.removeResourceFromTree(resource);
            _this.trigger('remove', resource, _this.topLevelResources);
          }
          return resource;
        };
      })(this));
    } else {
      return Promise.reject();
    }
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
    resource.id = String((ref = resourceInput.id) != null ? ref : '_fc' + ResourceManager.resourceGuid++);
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
    if (resourceInput.businessHours) {
      resource.businessHourGenerator = new BusinessHourGenerator(resourceInput.businessHours, this.calendar);
    }
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

  return ResourceManager;

})(Class);

ResourceComponentFootprint = (function(superClass) {
  extend(ResourceComponentFootprint, superClass);

  ResourceComponentFootprint.prototype.resourceId = null;

  function ResourceComponentFootprint(unzonedRange, isAllDay, resourceId) {
    ResourceComponentFootprint.__super__.constructor.apply(this, arguments);
    this.resourceId = resourceId;
  }

  ResourceComponentFootprint.prototype.toLegacy = function(calendar) {
    var obj;
    obj = ResourceComponentFootprint.__super__.toLegacy.apply(this, arguments);
    obj.resourceId = this.resourceId;
    return obj;
  };

  return ResourceComponentFootprint;

})(ComponentFootprint);

EventRenderer_getFallbackStylingObjs = EventRenderer.prototype.getFallbackStylingObjs;

EventRenderer.prototype.designatedResource = null;

EventRenderer.prototype.currentResource = null;

EventRenderer.prototype.beforeFgSegHtml = function(seg) {
  var segResourceId;
  segResourceId = seg.footprint.componentFootprint.resourceId;
  if (this.designatedResource) {
    return this.currentResource = this.designatedResource;
  } else if (segResourceId) {
    return this.currentResource = this.queryResourceObject(segResourceId);
  } else {
    return this.currentResource = null;
  }
};

EventRenderer.prototype.getFallbackStylingObjs = function(eventDef) {
  var id, j, len, objs, ref, resource, resources;
  objs = EventRenderer_getFallbackStylingObjs.apply(this, arguments);
  if (this.currentResource) {
    objs.unshift(this.currentResource);
  } else {
    resources = [];
    ref = eventDef.getResourceIds();
    for (j = 0, len = ref.length; j < len; j++) {
      id = ref[j];
      resource = this.queryResourceObject(id);
      if (resource) {
        resources.push(resource);
      }
    }
    objs = resources.concat(objs);
  }
  return objs;
};

EventRenderer.prototype.queryResourceObject = function(id) {
  return this.view.calendar.resourceManager.getResourceById(id);
};

DateSelecting_computeSelectionFootprint = DateSelecting.prototype.computeSelectionFootprint;

DateSelecting.prototype.computeSelectionFootprint = function(startFootprint, endFootprint) {
  var footprint;
  if (startFootprint.resourceId && endFootprint.resourceId && startFootprint.resourceId !== endFootprint.resourceId && !this.component.allowCrossResource) {
    return null;
  } else {
    footprint = DateSelecting_computeSelectionFootprint.apply(this, arguments);
    if (startFootprint.resourceId) {
      footprint = new ResourceComponentFootprint(footprint.unzonedRange, footprint.isAllDay, startFootprint.resourceId);
    }
    return footprint;
  }
};

EventDragging_computeEventDropMutation = EventDragging.prototype.computeEventDropMutation;


/*
monkeypatching can cause an event to seem draggable if the resource is editable but the
start/end dates are NOT. make sure to account for this.
 */

EventDragging.prototype.computeEventDropMutation = function(startFootprint, endFootprint, eventDef) {
  var isDatesDraggable, mutation;
  isDatesDraggable = this.component.isEventDefStartEditable(eventDef);
  if (startFootprint.resourceId && endFootprint.resourceId && startFootprint.resourceId !== endFootprint.resourceId && this.component.isEventDefResourceEditable(eventDef)) {
    mutation = new EventDefMutation();
    mutation.oldResourceId = startFootprint.resourceId;
    mutation.newResourceId = endFootprint.resourceId;
    if (isDatesDraggable) {
      mutation.setDateMutation(this.computeEventDateMutation(startFootprint, endFootprint));
    }
    return mutation;
  } else if (isDatesDraggable) {
    return EventDragging_computeEventDropMutation.apply(this, arguments);
  }
};

EventResizing_computeEventStartResizeMutation = EventResizing.prototype.computeEventStartResizeMutation;

EventResizing_computeEventEndResizeMutation = EventResizing.prototype.computeEventEndResizeMutation;

EventResizing.prototype.computeEventStartResizeMutation = function(startFootprint, endFootprint, eventDef) {
  if (startFootprint.resourceId && endFootprint.resourceId && startFootprint.resourceId !== endFootprint.resourceId && !this.component.allowCrossResource) {
    return null;
  } else {
    return EventResizing_computeEventStartResizeMutation.apply(this, arguments);
  }
};

EventResizing.prototype.computeEventEndResizeMutation = function(startFootprint, endFootprint, eventDef) {
  if (startFootprint.resourceId && endFootprint.resourceId && startFootprint.resourceId !== endFootprint.resourceId && !this.component.allowCrossResource) {
    return null;
  } else {
    return EventResizing_computeEventEndResizeMutation.apply(this, arguments);
  }
};

ExternalDropping_computeExternalDrop = ExternalDropping.prototype.computeExternalDrop;

ExternalDropping.prototype.computeExternalDrop = function(componentFootprint, meta) {
  var eventDef;
  eventDef = ExternalDropping_computeExternalDrop.apply(this, arguments);
  if (componentFootprint.resourceId) {
    eventDef.addResourceId(componentFootprint.resourceId);
  }
  return eventDef;
};

DateComponent_eventRangeToEventFootprints = DateComponent.prototype.eventRangeToEventFootprints;

DateComponent.prototype.isResourceFootprintsEnabled = false;

DateComponent.prototype.eventRangeToEventFootprints = function(eventRange) {
  var eventDef, j, len, resourceId, resourceIds, results;
  if (!this.isResourceFootprintsEnabled) {
    return DateComponent_eventRangeToEventFootprints.apply(this, arguments);
  } else {
    eventDef = eventRange.eventDef;
    resourceIds = eventDef.getResourceIds();
    if (resourceIds.length) {
      results = [];
      for (j = 0, len = resourceIds.length; j < len; j++) {
        resourceId = resourceIds[j];
        results.push(new EventFootprint(new ResourceComponentFootprint(eventRange.unzonedRange, eventDef.isAllDay(), resourceId), eventDef, eventRange.eventInstance));
      }
      return results;
    } else if (eventDef.hasBgRendering()) {
      return DateComponent_eventRangeToEventFootprints.apply(this, arguments);
    } else {
      return [];
    }
  }
};

DateComponent.prototype.renderResources = function(resources) {
  return this.callChildren('renderResources', arguments);
};

DateComponent.prototype.unrenderResources = function() {
  return this.callChildren('unrenderResources', arguments);
};

DateComponent.prototype.renderResource = function(resource) {
  return this.callChildren('renderResource', arguments);
};

DateComponent.prototype.unrenderResource = function(resource) {
  return this.callChildren('unrenderResource', arguments);
};

InteractiveDateComponent_isEventDefDraggable = InteractiveDateComponent.prototype.isEventDefDraggable;

InteractiveDateComponent.prototype.allowCrossResource = true;

InteractiveDateComponent.prototype.isEventDefDraggable = function(eventDef) {
  return this.isEventDefResourceEditable(eventDef) || InteractiveDateComponent_isEventDefDraggable.call(this, eventDef);
};

InteractiveDateComponent.prototype.isEventDefResourceEditable = function(eventDef) {
  var ref, ref1, ref2;
  return (ref = (ref1 = (ref2 = eventDef.resourceEditable) != null ? ref2 : (eventDef.source || {}).resourceEditable) != null ? ref1 : this.opt('eventResourceEditable')) != null ? ref : this.isEventDefGenerallyEditable(eventDef);
};


/*
Requirements:
- must be a Grid
- grid must have a view that's a ResourceView
- DayTableMixin must already be mixed in
 */

ResourceDayTableMixin = {
  flattenedResources: null,
  resourceCnt: 0,
  datesAboveResources: false,
  allowCrossResource: false,
  registerResources: function(resources) {
    this.flattenedResources = this.flattenResources(resources);
    this.resourceCnt = this.flattenedResources.length;
    return this.updateDayTable();
  },
  flattenResources: function(resources) {
    var orderSpecs, orderVal, res, sortFunc;
    orderVal = this.opt('resourceOrder');
    if (orderVal) {
      orderSpecs = parseFieldSpecs(orderVal);
      sortFunc = function(a, b) {
        return compareByFieldSpecs(a, b, orderSpecs);
      };
    } else {
      sortFunc = null;
    }
    res = [];
    this.accumulateResources(resources, sortFunc, res);
    return res;
  },
  accumulateResources: function(resources, sortFunc, res) {
    var j, len, resource, results, sortedResources;
    if (sortFunc) {
      sortedResources = resources.slice(0);
      sortedResources.sort(sortFunc);
    } else {
      sortedResources = resources;
    }
    results = [];
    for (j = 0, len = sortedResources.length; j < len; j++) {
      resource = sortedResources[j];
      res.push(resource);
      results.push(this.accumulateResources(resource.children, sortFunc, res));
    }
    return results;
  },
  updateDayTableCols: function() {
    this.datesAboveResources = this.opt('groupByDateAndResource');
    return FC.DayTableMixin.updateDayTableCols.call(this);
  },
  computeColCnt: function() {
    return this.resourceCnt * this.daysPerRow;
  },
  getColDayIndex: function(col) {
    if (this.isRTL) {
      col = this.colCnt - 1 - col;
    }
    if (this.datesAboveResources) {
      return Math.floor(col / (this.resourceCnt || 1));
    } else {
      return col % this.daysPerRow;
    }
  },
  getColResource: function(col) {
    return this.flattenedResources[this.getColResourceIndex(col)];
  },
  getColResourceIndex: function(col) {
    if (this.isRTL) {
      col = this.colCnt - 1 - col;
    }
    if (this.datesAboveResources) {
      return col % (this.resourceCnt || 1);
    } else {
      return Math.floor(col / this.daysPerRow);
    }
  },
  indicesToCol: function(resourceIndex, dayIndex) {
    var col;
    col = this.datesAboveResources ? dayIndex * (this.resourceCnt || 1) + resourceIndex : resourceIndex * this.daysPerRow + dayIndex;
    if (this.isRTL) {
      col = this.colCnt - 1 - col;
    }
    return col;
  },
  renderHeadTrHtml: function() {
    if (this.daysPerRow > 1) {
      if (this.datesAboveResources) {
        return this.renderHeadDateAndResourceHtml();
      } else {
        return this.renderHeadResourceAndDateHtml();
      }
    } else {
      return this.renderHeadResourceHtml();
    }
  },
  renderHeadResourceHtml: function() {
    var j, len, ref, resource, resourceHtmls;
    resourceHtmls = [];
    ref = this.flattenedResources;
    for (j = 0, len = ref.length; j < len; j++) {
      resource = ref[j];
      resourceHtmls.push(this.renderHeadResourceCellHtml(resource));
    }
    if (!resourceHtmls.length) {
      resourceHtmls.push('<td>&nbsp;</td>');
    }
    return this.wrapTr(resourceHtmls, 'renderHeadIntroHtml');
  },
  renderHeadResourceAndDateHtml: function() {
    var date, dateHtmls, dayIndex, j, k, len, ref, ref1, resource, resourceHtmls;
    resourceHtmls = [];
    dateHtmls = [];
    ref = this.flattenedResources;
    for (j = 0, len = ref.length; j < len; j++) {
      resource = ref[j];
      resourceHtmls.push(this.renderHeadResourceCellHtml(resource, null, this.daysPerRow));
      for (dayIndex = k = 0, ref1 = this.daysPerRow; k < ref1; dayIndex = k += 1) {
        date = this.dayDates[dayIndex].clone();
        dateHtmls.push(this.renderHeadResourceDateCellHtml(date, resource));
      }
    }
    if (!resourceHtmls.length) {
      resourceHtmls.push('<td>&nbsp;</td>');
    }
    if (!dateHtmls.length) {
      dateHtmls.push('<td>&nbsp;</td>');
    }
    return this.wrapTr(resourceHtmls, 'renderHeadIntroHtml') + this.wrapTr(dateHtmls, 'renderHeadIntroHtml');
  },
  renderHeadDateAndResourceHtml: function() {
    var date, dateHtmls, dayIndex, j, k, len, ref, ref1, resource, resourceHtmls;
    dateHtmls = [];
    resourceHtmls = [];
    for (dayIndex = j = 0, ref = this.daysPerRow; j < ref; dayIndex = j += 1) {
      date = this.dayDates[dayIndex].clone();
      dateHtmls.push(this.renderHeadDateCellHtml(date, this.resourceCnt));
      ref1 = this.flattenedResources;
      for (k = 0, len = ref1.length; k < len; k++) {
        resource = ref1[k];
        resourceHtmls.push(this.renderHeadResourceCellHtml(resource, date));
      }
    }
    if (!dateHtmls.length) {
      dateHtmls.push('<td>&nbsp;</td>');
    }
    if (!resourceHtmls.length) {
      resourceHtmls.push('<td>&nbsp;</td>');
    }
    return this.wrapTr(dateHtmls, 'renderHeadIntroHtml') + this.wrapTr(resourceHtmls, 'renderHeadIntroHtml');
  },
  renderHeadResourceCellHtml: function(resource, date, colspan) {
    return '<th class="fc-resource-cell"' + ' data-resource-id="' + resource.id + '"' + (date ? ' data-date="' + date.format('YYYY-MM-DD') + '"' : '') + (colspan > 1 ? ' colspan="' + colspan + '"' : '') + '>' + htmlEscape(this.view.getResourceText(resource)) + '</th>';
  },
  renderHeadResourceDateCellHtml: function(date, resource, colspan) {
    return this.renderHeadDateCellHtml(date, colspan, 'data-resource-id="' + resource.id + '"');
  },
  processHeadResourceEls: function(containerEl) {
    return containerEl.find('.fc-resource-cell').each((function(_this) {
      return function(col, node) {
        var resource;
        if (_this.datesAboveResources) {
          resource = _this.getColResource(col);
        } else {
          resource = _this.flattenedResources[_this.isRTL ? _this.flattenedResources.length - 1 - col : col];
        }
        return _this.publiclyTrigger('resourceRender', {
          context: resource,
          args: [resource, $(node), $(), _this.view]
        });
      };
    })(this));
  },
  renderBgCellsHtml: function(row) {
    var col, date, htmls, j, ref, resource;
    htmls = [];
    for (col = j = 0, ref = this.colCnt; j < ref; col = j += 1) {
      date = this.getCellDate(row, col);
      resource = this.getColResource(col);
      htmls.push(this.renderResourceBgCellHtml(date, resource));
    }
    if (!htmls.length) {
      htmls.push('<td>&nbsp;</td>');
    }
    return htmls.join('');
  },
  renderResourceBgCellHtml: function(date, resource) {
    return this.renderBgCellHtml(date, 'data-resource-id="' + resource.id + '"');
  },
  wrapTr: function(cellHtmls, introMethodName) {
    if (this.isRTL) {
      cellHtmls.reverse();
      return '<tr>' + cellHtmls.join('') + this[introMethodName]() + '</tr>';
    } else {
      return '<tr>' + this[introMethodName]() + cellHtmls.join('') + '</tr>';
    }
  },
  renderBusinessHours: function(businessHourGenerator) {
    var eventFootprints, eventInstanceGroup, eventRange, isAllDay, j, k, len, len1, ref, ref1, resource, unzonedRange;
    isAllDay = this.hasAllDayBusinessHours;
    unzonedRange = this.dateProfile.activeUnzonedRange;
    eventFootprints = [];
    ref = this.flattenedResources;
    for (j = 0, len = ref.length; j < len; j++) {
      resource = ref[j];
      eventInstanceGroup = (resource.businessHourGenerator || businessHourGenerator).buildEventInstanceGroup(isAllDay, unzonedRange);
      if (eventInstanceGroup) {
        ref1 = eventInstanceGroup.sliceRenderRanges(unzonedRange);
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          eventRange = ref1[k];
          eventFootprints.push(new EventFootprint(new ResourceComponentFootprint(eventRange.unzonedRange, isAllDay, resource.id), eventRange.eventDef, eventRange.eventInstance));
        }
      }
    }
    return this.businessHourRenderer.renderEventFootprints(eventFootprints);
  }
};

Calendar_constructed = Calendar.prototype.constructed;

Calendar_requestEvents = Calendar.prototype.requestEvents;

Calendar_buildSelectFootprint = Calendar.prototype.buildSelectFootprint;

Calendar.prototype.resourceManager = null;

Calendar.prototype.constructed = function() {
  Calendar_constructed.apply(this, arguments);
  return this.resourceManager = new ResourceManager(this);
};

Calendar.prototype.instantiateView = function(viewType) {
  var spec, viewClass;
  spec = this.getViewSpec(viewType);
  viewClass = spec['class'];
  if (this.opt('resources') && spec.options.resources !== false) {
    if (spec.queryResourceClass) {
      viewClass = spec.queryResourceClass(spec) || viewClass;
    } else if (spec.resourceClass) {
      viewClass = spec.resourceClass;
    }
  }
  return new viewClass(this, spec);
};

Calendar.prototype.getResources = function() {
  return Array.prototype.slice.call(this.resourceManager.topLevelResources);
};

Calendar.prototype.addResource = function(resourceInput, scroll) {
  if (scroll == null) {
    scroll = false;
  }
  this.resourceManager.addResource(resourceInput).then((function(_this) {
    return function(resource) {
      if (scroll && _this.view.scrollToResource) {
        return _this.view.scrollToResource(resource);
      }
    };
  })(this));
};

Calendar.prototype.removeResource = function(idOrResource) {
  return this.resourceManager.removeResource(idOrResource);
};

Calendar.prototype.refetchResources = function() {
  this.resourceManager.clear();
  this.view.flash('initialResources');
};

Calendar.prototype.rerenderResources = function() {
  this.resourceManager.resetCurrentResources();
};

Calendar.prototype.buildSelectFootprint = function(zonedStartInput, zonedEndInput, resourceId) {
  var plainFootprint;
  plainFootprint = Calendar_buildSelectFootprint.apply(this, arguments);
  if (resourceId) {
    return new ResourceComponentFootprint(plainFootprint.unzonedRange, plainFootprint.isAllDay, resourceId);
  } else {
    return plainFootprint;
  }
};

Calendar.prototype.getResourceById = function(id) {
  return this.resourceManager.getResourceById(id);
};

Calendar.prototype.getEventResourceId = function(event) {
  return this.getEventResourceIds(event)[0];
};

Calendar.prototype.getEventResourceIds = function(event) {
  var eventDef;
  eventDef = this.eventManager.getEventDefByUid(event._id);
  if (eventDef) {
    return eventDef.getResourceIds();
  } else {
    return [];
  }
};

Calendar.prototype.setEventResourceId = function(event, resourceId) {
  return this.setEventResourceIds(event, resourceId ? [resourceId] : []);
};

Calendar.prototype.setEventResourceIds = function(event, resourceIds) {
  var eventDef, rawResourceId;
  eventDef = this.eventManager.getEventDefByUid(event._id);
  if (eventDef) {
    return eventDef.resourceIds = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = resourceIds.length; j < len; j++) {
        rawResourceId = resourceIds[j];
        results.push(Resource.normalizeId(rawResourceId));
      }
      return results;
    })();
  }
};

Calendar.prototype.getResourceEvents = function(idOrResource) {
  var resource;
  resource = typeof idOrResource === 'object' ? idOrResource : this.getResourceById(idOrResource);
  if (resource) {
    return this.clientEvents((function(_this) {
      return function(event) {
        return $.inArray(resource.id, _this.getEventResourceIds(event)) !== -1;
      };
    })(this));
  } else {
    return [];
  }
};

Calendar.prototype.getEventResource = function(idOrEvent) {
  return this.getEventResources(idOrEvent)[0];
};

Calendar.prototype.getEventResources = function(idOrEvent) {
  var event, j, len, ref, resource, resourceId, resources;
  event = typeof idOrEvent === 'object' ? idOrEvent : this.clientEvents(idOrEvent)[0];
  resources = [];
  if (event) {
    ref = this.getEventResourceIds(event);
    for (j = 0, len = ref.length; j < len; j++) {
      resourceId = ref[j];
      resource = this.getResourceById(resourceId);
      if (resource) {
        resources.push(resource);
      }
    }
  }
  return resources;
};

Calendar_getPeerEventInstances = Calendar.prototype.getPeerEventInstances;

Calendar_isFootprintAllowed = Calendar.prototype.isFootprintAllowed;

Calendar_buildCurrentBusinessFootprints = Calendar.prototype.buildCurrentBusinessFootprints;

Calendar_footprintContainsFootprint = Calendar.prototype.footprintContainsFootprint;

Calendar_footprintsIntersect = Calendar.prototype.footprintsIntersect;

Calendar_eventRangeToEventFootprints = Calendar.prototype.eventRangeToEventFootprints;

Calendar_parseFootprints = Calendar.prototype.parseFootprints;

Calendar.prototype.getPeerEventInstances = function(subjectEventDef) {
  var peerInstances, subjectResourceIds;
  subjectResourceIds = subjectEventDef.getResourceIds();
  peerInstances = Calendar_getPeerEventInstances.apply(this, arguments);
  if (!subjectResourceIds.length) {
    return peerInstances;
  } else {
    return peerInstances.filter(function(peerInstance) {
      var j, len, resourceId;
      if (!peerInstance.def.resourceIds.length) {
        return true;
      }
      for (j = 0, len = subjectResourceIds.length; j < len; j++) {
        resourceId = subjectResourceIds[j];
        if (peerInstance.def.hasResourceId(resourceId)) {
          return true;
        }
      }
      return false;
    });
  }
};

Calendar.prototype.isFootprintAllowed = function(footprint, peerEventFootprints, constraintVal, overlapVal, subjectEventInstance) {
  var constrainToResourceIds, ref;
  if (typeof constraintVal === 'object') {
    constrainToResourceIds = Resource.extractIds(constraintVal, this);
    if (constrainToResourceIds.length && (!(footprint instanceof ResourceComponentFootprint) || !(ref = footprint.resourceId, indexOf.call(constrainToResourceIds, ref) >= 0))) {
      return false;
    }
  }
  return Calendar_isFootprintAllowed.apply(this, arguments);
};

Calendar.prototype.buildCurrentBusinessFootprints = function(isAllDay) {
  var anyCustomBusinessHours, businessHourGenerator, componentFootprints, eventInstanceGroup, eventRange, flatResources, generalBusinessHourGenerator, j, k, l, len, len1, len2, ref, resource, unzonedRange, view;
  flatResources = this.resourceManager.getFlatResources();
  anyCustomBusinessHours = false;
  for (j = 0, len = flatResources.length; j < len; j++) {
    resource = flatResources[j];
    if (resource.businessHourGenerator) {
      anyCustomBusinessHours = true;
    }
  }
  if (anyCustomBusinessHours) {
    view = this.view;
    generalBusinessHourGenerator = view.get('businessHourGenerator');
    unzonedRange = view.dateProfile.activeUnzonedRange;
    componentFootprints = [];
    for (k = 0, len1 = flatResources.length; k < len1; k++) {
      resource = flatResources[k];
      businessHourGenerator = resource.businessHourGenerator || generalBusinessHourGenerator;
      eventInstanceGroup = businessHourGenerator.buildEventInstanceGroup(isAllDay, unzonedRange);
      if (eventInstanceGroup) {
        ref = eventInstanceGroup.getAllEventRanges();
        for (l = 0, len2 = ref.length; l < len2; l++) {
          eventRange = ref[l];
          componentFootprints.push(new ResourceComponentFootprint(eventRange.unzonedRange, isAllDay, resource.id));
        }
      }
    }
    return componentFootprints;
  } else {
    return Calendar_buildCurrentBusinessFootprints.apply(this, arguments);
  }
};

Calendar.prototype.footprintContainsFootprint = function(outerFootprint, innerFootprint) {
  if (outerFootprint instanceof ResourceComponentFootprint && (!(innerFootprint instanceof ResourceComponentFootprint) || innerFootprint.resourceId !== outerFootprint.resourceId)) {
    return false;
  }
  return Calendar_footprintContainsFootprint.apply(this, arguments);
};

Calendar.prototype.footprintsIntersect = function(footprint0, footprint1) {
  if (footprint0 instanceof ResourceComponentFootprint && footprint1 instanceof ResourceComponentFootprint && footprint0.resourceId !== footprint1.resourceId) {
    return false;
  }
  return Calendar_footprintsIntersect.apply(this, arguments);
};


/*
TODO: somehow more DRY with DateComponent::eventRangeToEventFootprints monkeypatch
 */

Calendar.prototype.eventRangeToEventFootprints = function(eventRange) {
  var eventDef, j, len, resourceId, resourceIds, results;
  eventDef = eventRange.eventDef;
  resourceIds = eventDef.getResourceIds();
  if (resourceIds.length) {
    results = [];
    for (j = 0, len = resourceIds.length; j < len; j++) {
      resourceId = resourceIds[j];
      results.push(new EventFootprint(new ResourceComponentFootprint(eventRange.unzonedRange, eventDef.isAllDay(), resourceId), eventDef, eventRange.eventInstance));
    }
    return results;
  } else {
    return Calendar_eventRangeToEventFootprints.apply(this, arguments);
  }
};

Calendar.prototype.parseFootprints = function(input) {
  var footprints, j, k, len, len1, plainFootprint, plainFootprints, resourceId, resourceIds;
  plainFootprints = Calendar_parseFootprints.apply(this, arguments);
  resourceIds = input.resourceIds || [];
  if (input.resourceId) {
    resourceIds = [input.resourceId].concat(resourceIds);
  }
  if (resourceIds.length) {
    footprints = [];
    for (j = 0, len = resourceIds.length; j < len; j++) {
      resourceId = resourceIds[j];
      for (k = 0, len1 = plainFootprints.length; k < len1; k++) {
        plainFootprint = plainFootprints[k];
        footprints.push(new ResourceComponentFootprint(plainFootprint.unzonedRange, plainFootprint.isAllDay, resourceId));
      }
    }
    return footprints;
  } else {
    return plainFootprints;
  }
};

Calendar.defaults.refetchResourcesOnNavigate = false;

Calendar.defaults.filterResourcesWithEvents = false;

View_setElement = View.prototype.setElement;

View_removeElement = View.prototype.removeElement;

View_triggerViewRender = View.prototype.triggerViewRender;

View.prototype.canHandleSpecificResources = false;

View.prototype.setElement = function() {
  View_setElement.apply(this, arguments);
  return this.watchResources();
};

View.prototype.removeElement = function() {
  this.unwatchResources();
  return View_removeElement.apply(this, arguments);
};

View.prototype.triggerViewRender = function() {
  processLicenseKey(this.opt('schedulerLicenseKey'), this.el);
  return View_triggerViewRender.apply(this, arguments);
};

View.prototype.watchResources = function() {
  var bindingDepNames, initialDepNames;
  initialDepNames = [];
  bindingDepNames = ['initialResources'];
  if (this.opt('refetchResourcesOnNavigate')) {
    initialDepNames.push('dateProfile');
  }
  if (this.opt('filterResourcesWithEvents')) {
    bindingDepNames.push('currentEvents');
  }
  this.watch('initialResources', initialDepNames, (function(_this) {
    return function(deps) {
      return _this.getInitialResources(deps.dateProfile);
    };
  })(this));
  return this.watch('bindingResources', bindingDepNames, (function(_this) {
    return function(deps) {
      _this.bindResourceChanges(deps.currentEvents);
      _this.setResources(deps.initialResources, deps.currentEvents);
    };
  })(this), (function(_this) {
    return function() {
      _this.unbindResourceChanges();
      _this.unsetResources();
    };
  })(this));
};

View.prototype.unwatchResources = function() {
  this.unwatch('initialResources');
  return this.unwatch('bindingResources');
};

View.prototype.getInitialResources = function(dateProfile) {
  var calendar;
  calendar = this.calendar;
  if (dateProfile) {
    return calendar.resourceManager.getResources(calendar.msToMoment(dateProfile.activeUnzonedRange.startMs, dateProfile.isRangeAllDay), calendar.msToMoment(dateProfile.activeUnzonedRange.endMs, dateProfile.isRangeAllDay));
  } else {
    return calendar.resourceManager.getResources();
  }
};

View.prototype.bindResourceChanges = function(eventsPayload) {
  return this.listenTo(this.calendar.resourceManager, {
    set: (function(_this) {
      return function(resources) {
        return _this.setResources(resources, eventsPayload);
      };
    })(this),
    unset: (function(_this) {
      return function() {
        return _this.unsetResources();
      };
    })(this),
    reset: (function(_this) {
      return function(resources) {
        return _this.resetResources(resources, eventsPayload);
      };
    })(this),
    add: (function(_this) {
      return function(resource, allResources) {
        return _this.addResource(resource, allResources, eventsPayload);
      };
    })(this),
    remove: (function(_this) {
      return function(resource, allResources) {
        return _this.removeResource(resource, allResources, eventsPayload);
      };
    })(this)
  });
};

View.prototype.unbindResourceChanges = function() {
  return this.stopListeningTo(this.calendar.resourceManager);
};

View.watch('displayingEvents', ['displayingDates', 'hasEvents', 'currentResources'], function(deps) {
  return this.requestEventsRender(this.get('currentEvents'));
}, function() {
  return this.requestEventsUnrender();
});

View.prototype.setResources = function(resources, eventsPayload) {
  if (eventsPayload) {
    resources = this.filterResourcesWithEvents(resources, eventsPayload);
  }
  this.set('currentResources', resources);
  return this.set('hasResources', true);
};

View.prototype.unsetResources = function() {
  this.unset('currentResources');
  return this.unset('hasResources');
};

View.prototype.resetResources = function(resources, eventsPayload) {
  this.startBatchRender();
  this.unsetResources();
  this.setResources(resources, eventsPayload);
  return this.stopBatchRender();
};

View.prototype.addResource = function(resource, allResources, eventsPayload) {
  var a;
  if (!this.canHandleSpecificResources) {
    return this.resetResources(allResources, eventsPayload);
  }
  if (eventsPayload) {
    a = this.filterResourcesWithEvents([resource], eventsPayload);
    if (!a.length) {
      resource = null;
    }
  }
  if (resource) {
    this.set('currentResources', allResources);
    return this.handleResourceAdd(resource);
  }
};

View.prototype.removeResource = function(resource, allResources, eventsPayload) {
  if (!this.canHandleSpecificResources) {
    return this.resetResources(allResources, eventsPayload);
  }
  this.set('currentResources', allResources);
  return this.handleResourceRemove(resource);
};

View.prototype.handleResourceAdd = function(resource) {};

View.prototype.handleResourceRemove = function(resource) {};

View.prototype.filterResourcesWithEvents = function(resources, eventsPayload) {
  var eventRange, eventRanges, j, k, len, len1, ref, resourceId, resourceIdHits;
  eventRanges = this.eventsPayloadToRanges(eventsPayload);
  resourceIdHits = {};
  for (j = 0, len = eventRanges.length; j < len; j++) {
    eventRange = eventRanges[j];
    ref = eventRange.eventDef.getResourceIds();
    for (k = 0, len1 = ref.length; k < len1; k++) {
      resourceId = ref[k];
      resourceIdHits[resourceId] = true;
    }
  }
  return _filterResourcesWithEvents(resources, resourceIdHits);
};

View.prototype.eventsPayloadToRanges = function(eventsPayload) {
  var allEventRanges, dateProfile, eventDefId, eventRanges, instanceGroup;
  dateProfile = this._getDateProfile();
  allEventRanges = [];
  for (eventDefId in eventsPayload) {
    instanceGroup = eventsPayload[eventDefId];
    eventRanges = instanceGroup.sliceRenderRanges(dateProfile.activeUnzonedRange);
    allEventRanges.push.apply(allEventRanges, eventRanges);
  }
  return allEventRanges;
};

_filterResourcesWithEvents = function(sourceResources, resourceIdHits) {
  var filteredChildren, filteredResource, filteredResources, j, len, sourceResource;
  filteredResources = [];
  for (j = 0, len = sourceResources.length; j < len; j++) {
    sourceResource = sourceResources[j];
    if (sourceResource.children.length) {
      filteredChildren = _filterResourcesWithEvents(sourceResource.children, resourceIdHits);
      if (filteredChildren.length || resourceIdHits[sourceResource.id]) {
        filteredResource = Object.create(sourceResource);
        filteredResource.children = filteredChildren;
        filteredResources.push(filteredResource);
      }
    } else {
      if (resourceIdHits[sourceResource.id]) {
        filteredResources.push(sourceResource);
      }
    }
  }
  return filteredResources;
};

ResourceViewMixin = {
  resourceTextFunc: null,
  isResourcesRendered: false,
  initResourceView: function() {
    this.watch('displayingResources', ['displayingDates', 'hasResources'], (function(_this) {
      return function() {
        return _this.requestResourcesRender(_this.get('currentResources'));
      };
    })(this), (function(_this) {
      return function() {
        return _this.requestResourcesUnrender();
      };
    })(this));
    this.watch('displayingBusinessHours', ['displayingResources', 'businessHourGenerator'], (function(_this) {
      return function(deps) {
        return _this.requestBusinessHoursRender(deps.businessHourGenerator);
      };
    })(this), (function(_this) {
      return function() {
        return _this.requestBusinessHoursUnrender();
      };
    })(this));
    return this.watch('displayingEvents', ['displayingResources', 'hasEvents'], (function(_this) {
      return function() {
        return _this.requestEventsRender(_this.get('currentEvents'));
      };
    })(this), (function(_this) {
      return function() {
        return _this.requestEventsUnrender();
      };
    })(this));
  },
  bindBaseRenderHandlers: function() {
    var isDatesRendered, isResourcesRendered;
    isResourcesRendered = false;
    isDatesRendered = false;
    this.on('resourcesRendered', function() {
      if (!isResourcesRendered) {
        isResourcesRendered = true;
        if (isDatesRendered) {
          return this.whenSizeUpdated(this.triggerViewRender);
        }
      }
    });
    this.on('datesRendered', function() {
      if (!isDatesRendered) {
        isDatesRendered = true;
        if (isResourcesRendered) {
          return this.whenSizeUpdated(this.triggerViewRender);
        }
      }
    });
    this.on('before:resourcesUnrendered', function() {
      if (isResourcesRendered) {
        return isResourcesRendered = false;
      }
    });
    return this.on('before:datesUnrendered', function() {
      if (isDatesRendered) {
        isDatesRendered = false;
        return this.triggerViewDestroy();
      }
    });
  },
  queryScroll: function() {
    var scroll;
    scroll = View.prototype.queryScroll.apply(this, arguments);
    if (this.isResourcesRendered) {
      $.extend(scroll, this.queryResourceScroll());
    }
    return scroll;
  },
  applyScroll: function(scroll) {
    View.prototype.applyScroll.apply(this, arguments);
    if (this.isResourcesRendered) {
      return this.applyResourceScroll(scroll);
    }
  },
  queryResourceScroll: function() {
    return {};
  },
  applyResourceScroll: function() {},
  getResourceText: function(resource) {
    return this.getResourceTextFunc()(resource);
  },
  getResourceTextFunc: function() {
    var func;
    if (this.resourceTextFunc) {
      return this.resourceTextFunc;
    } else {
      func = this.opt('resourceText');
      if (typeof func !== 'function') {
        func = function(resource) {
          return resource.title || resource.id;
        };
      }
      return this.resourceTextFunc = func;
    }
  },
  handleResourceAdd: function(resource) {
    return this.requestResourceRender(resource);
  },
  handleResourceRemove: function(resource) {
    return this.requestResourceUnrender(resource);
  },
  requestResourcesRender: function(resources) {
    return this.requestRender((function(_this) {
      return function() {
        return _this.executeResourcesRender(resources);
      };
    })(this), 'resource', 'init');
  },
  requestResourcesUnrender: function() {
    return this.requestRender((function(_this) {
      return function() {
        return _this.executeResourcesUnrender();
      };
    })(this), 'resource', 'destroy');
  },
  requestResourceRender: function(resource) {
    return this.requestRender((function(_this) {
      return function() {
        return _this.executeResourceRender(resource);
      };
    })(this), 'resource', 'add');
  },
  requestResourceUnrender: function(resource) {
    return this.requestRender((function(_this) {
      return function() {
        return _this.executeResourceUnrender(resource);
      };
    })(this), 'resource', 'remove');
  },
  executeResourcesRender: function(resources) {
    this.renderResources(resources);
    this.isResourcesRendered = true;
    return this.trigger('resourcesRendered');
  },
  executeResourcesUnrender: function() {
    this.trigger('before:resourcesUnrendered');
    this.unrenderResources();
    return this.isResourcesRendered = false;
  },
  executeResourceRender: function(resource) {
    return this.renderResource(resource);
  },
  executeResourceUnrender: function(resource) {
    return this.unrenderResource(resource);
  },

  /*
  	footprint is a ResourceComponentFootprint
   */
  triggerDayClick: function(footprint, dayEl, ev) {
    var dateProfile;
    dateProfile = this.calendar.footprintToDateProfile(footprint);
    return this.publiclyTrigger('dayClick', {
      context: dayEl,
      args: [dateProfile.start, ev, this, footprint.resourceId ? this.calendar.resourceManager.getResourceById(footprint.resourceId) : null]
    });
  },

  /*
  	footprint is a ResourceComponentFootprint
   */
  triggerSelect: function(footprint, ev) {
    var dateProfile;
    dateProfile = this.calendar.footprintToDateProfile(footprint);
    return this.publiclyTrigger('select', {
      context: this,
      args: [dateProfile.start, dateProfile.end, ev, this, footprint.resourceId ? this.calendar.resourceManager.getResourceById(footprint.resourceId) : null]
    });
  },
  triggerExternalDrop: function(singleEventDef, isEvent, el, ev, ui) {
    this.publiclyTrigger('drop', {
      context: el[0],
      args: [singleEventDef.dateProfile.start.clone(), ev, ui, singleEventDef.getResourceIds()[0], this]
    });
    if (isEvent) {
      return this.publiclyTrigger('eventReceive', {
        context: this,
        args: [singleEventDef.buildInstance().toLegacy(), this]
      });
    }
  }
};

TimelineEventRenderer = (function(superClass) {
  extend(TimelineEventRenderer, superClass);

  function TimelineEventRenderer() {
    return TimelineEventRenderer.__super__.constructor.apply(this, arguments);
  }


  /*
  	component must be { segContainerEl, segContainerHeight, rangeToCoords }
   */

  TimelineEventRenderer.prototype.computeDisplayEventTime = function() {
    return !this.view.isTimeScale;
  };

  TimelineEventRenderer.prototype.computeDisplayEventEnd = function() {
    return false;
  };

  TimelineEventRenderer.prototype.computeEventTimeFormat = function() {
    return this.view.opt('extraSmallTimeFormat');
  };

  TimelineEventRenderer.prototype.renderFgSegs = function(segs) {
    var coords, eventTitleFollower, j, k, l, len, len1, len2, len3, len4, m, n, results, seg, titleEl;
    eventTitleFollower = this.view.eventTitleFollower;
    for (j = 0, len = segs.length; j < len; j++) {
      seg = segs[j];
      coords = this.component.rangeToCoords(seg);
      seg.el.css({
        left: (seg.left = coords.left),
        right: -(seg.right = coords.right)
      });
    }
    for (k = 0, len1 = segs.length; k < len1; k++) {
      seg = segs[k];
      seg.el.appendTo(this.component.segContainerEl);
    }
    for (l = 0, len2 = segs.length; l < len2; l++) {
      seg = segs[l];
      seg.height = seg.el.outerHeight(true);
    }
    this.buildSegLevels(segs);
    this.component.segContainerHeight = computeOffsetForSegs(segs);
    for (m = 0, len3 = segs.length; m < len3; m++) {
      seg = segs[m];
      seg.el.css('top', seg.top);
    }
    this.component.segContainerEl.height(this.component.segContainerHeight);
    results = [];
    for (n = 0, len4 = segs.length; n < len4; n++) {
      seg = segs[n];
      titleEl = seg.el.find('.fc-title');
      if (titleEl.length) {
        seg.scrollFollowerSprite = new ScrollFollowerSprite(titleEl);
        results.push(eventTitleFollower.addSprite(seg.scrollFollowerSprite));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  TimelineEventRenderer.prototype.buildSegLevels = function(segs) {
    var belowSeg, isLevelCollision, j, k, l, len, len1, len2, level, placedSeg, ref, ref1, segLevels, unplacedSeg;
    segLevels = [];
    this.sortEventSegs(segs);
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

  TimelineEventRenderer.prototype.unrenderFgSegs = function(segs) {
    var eventTitleFollower, j, len, seg;
    if (this.component.segContainerEl) {
      eventTitleFollower = this.view.eventTitleFollower;
      for (j = 0, len = segs.length; j < len; j++) {
        seg = segs[j];
        if (seg.scrollFollowerSprite) {
          eventTitleFollower.removeSprite(seg.scrollFollowerSprite);
        }
      }
      this.component.segContainerEl.empty();
      this.component.segContainerEl.height('');
      return this.component.segContainerHeight = null;
    }
  };

  TimelineEventRenderer.prototype.fgSegHtml = function(seg, disableResizing) {
    var classes, eventDef, isDraggable, isResizableFromEnd, isResizableFromStart, timeText;
    eventDef = seg.footprint.eventDef;
    isDraggable = this.view.isEventDefDraggable(eventDef);
    isResizableFromStart = seg.isStart && this.view.isEventDefResizableFromStart(eventDef);
    isResizableFromEnd = seg.isEnd && this.view.isEventDefResizableFromEnd(eventDef);
    classes = this.getSegClasses(seg, isDraggable, isResizableFromStart || isResizableFromEnd);
    classes.unshift('fc-timeline-event', 'fc-h-event');
    timeText = this.getTimeText(seg.footprint);
    return '<a class="' + classes.join(' ') + '" style="' + cssToStr(this.getSkinCss(seg.footprint.eventDef)) + '"' + (eventDef.url ? ' href="' + htmlEscape(eventDef.url) + '"' : '') + '>' + '<div class="fc-content">' + (timeText ? '<span class="fc-time">' + htmlEscape(timeText) + '</span>' : '') + '<span class="fc-title">' + (eventDef.title ? htmlEscape(eventDef.title) : '&nbsp;') + '</span>' + '</div>' + '<div class="fc-bg" />' + (isResizableFromStart ? '<div class="fc-resizer fc-start-resizer"></div>' : '') + (isResizableFromEnd ? '<div class="fc-resizer fc-end-resizer"></div>' : '') + '</a>';
  };

  return TimelineEventRenderer;

})(EventRenderer);

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

TimelineFillRenderer = (function(superClass) {
  extend(TimelineFillRenderer, superClass);

  function TimelineFillRenderer() {
    return TimelineFillRenderer.__super__.constructor.apply(this, arguments);
  }


  /*
  	component must be { bgSegContainerEl, rangeToCoords }
   */

  TimelineFillRenderer.prototype.attachSegEls = function(type, segs) {
    var className, containerEl, coords, j, len, seg;
    if (segs.length) {
      if (type === 'businessHours') {
        className = 'bgevent';
      } else {
        className = type.toLowerCase();
      }
      containerEl = $('<div class="fc-' + className + '-container" />').appendTo(this.component.bgSegContainerEl);
      for (j = 0, len = segs.length; j < len; j++) {
        seg = segs[j];
        coords = this.component.rangeToCoords(seg);
        seg.el.css({
          left: (seg.left = coords.left),
          right: -(seg.right = coords.right)
        });
        seg.el.appendTo(containerEl);
      }
      return containerEl;
    }
  };

  return TimelineFillRenderer;

})(FillRenderer);

TimelineHelperRenderer = (function(superClass) {
  extend(TimelineHelperRenderer, superClass);

  function TimelineHelperRenderer() {
    return TimelineHelperRenderer.__super__.constructor.apply(this, arguments);
  }


  /*
  	component must be { innerEl, rangeToCoords, ?resource }
   */

  TimelineHelperRenderer.prototype.renderSegs = function(segs, sourceSeg) {
    var coords, helperContainerEl, helperNodes, j, k, len, len1, ref, seg;
    helperNodes = [];
    for (j = 0, len = segs.length; j < len; j++) {
      seg = segs[j];
      coords = this.component.rangeToCoords(seg);
      seg.el.css({
        left: (seg.left = coords.left),
        right: -(seg.right = coords.right)
      });
      if (sourceSeg && sourceSeg.resourceId === ((ref = this.component.resource) != null ? ref.id : void 0)) {
        seg.el.css('top', sourceSeg.el.css('top'));
      } else {
        seg.el.css('top', 0);
      }
    }
    helperContainerEl = $('<div class="fc-event-container fc-helper-container"/>').appendTo(this.component.innerEl);
    helperNodes.push(helperContainerEl[0]);
    for (k = 0, len1 = segs.length; k < len1; k++) {
      seg = segs[k];
      helperContainerEl.append(seg.el);
    }
    return $(helperNodes);
  };

  return TimelineHelperRenderer;

})(HelperRenderer);


/*
TODO: use pubsub instead?
 */

TimelineEventDragging = (function(superClass) {
  extend(TimelineEventDragging, superClass);

  function TimelineEventDragging() {
    return TimelineEventDragging.__super__.constructor.apply(this, arguments);
  }

  TimelineEventDragging.prototype.segDragStart = function() {
    TimelineEventDragging.__super__.segDragStart.apply(this, arguments);
    if (this.component.eventTitleFollower) {
      return this.component.eventTitleFollower.forceRelative();
    }
  };

  TimelineEventDragging.prototype.segDragStop = function() {
    TimelineEventDragging.__super__.segDragStop.apply(this, arguments);
    if (this.component.eventTitleFollower) {
      return this.component.eventTitleFollower.clearForce();
    }
  };

  return TimelineEventDragging;

})(EventDragging);


/*
TODO: use pubsub instead?
 */

TimelineEventResizing = (function(superClass) {
  extend(TimelineEventResizing, superClass);

  function TimelineEventResizing() {
    return TimelineEventResizing.__super__.constructor.apply(this, arguments);
  }

  TimelineEventResizing.prototype.segResizeStart = function() {
    TimelineEventResizing.__super__.segResizeStart.apply(this, arguments);
    if (this.component.eventTitleFollower) {
      return this.component.eventTitleFollower.forceRelative();
    }
  };

  TimelineEventResizing.prototype.segResizeStop = function() {
    TimelineEventResizing.__super__.segResizeStop.apply(this, arguments);
    if (this.component.eventTitleFollower) {
      return this.component.eventTitleFollower.clearForce();
    }
  };

  return TimelineEventResizing;

})(EventResizing);

TimelineView = (function(superClass) {
  extend(TimelineView, superClass);

  TimelineView.mixin(StandardInteractionsMixin);

  TimelineView.prototype.usesMinMaxTime = true;

  TimelineView.prototype.eventRendererClass = TimelineEventRenderer;

  TimelineView.prototype.fillRendererClass = TimelineFillRenderer;

  TimelineView.prototype.businessHourRendererClass = BusinessHourRenderer;

  TimelineView.prototype.helperRendererClass = TimelineHelperRenderer;

  TimelineView.prototype.eventDraggingClass = TimelineEventDragging;

  TimelineView.prototype.eventResizingClass = TimelineEventResizing;

  TimelineView.prototype.normalizedUnzonedRange = null;

  TimelineView.prototype.normalizedUnzonedStart = null;

  TimelineView.prototype.normalizedUnzonedEnd = null;

  TimelineView.prototype.slotDates = null;

  TimelineView.prototype.slotCnt = null;

  TimelineView.prototype.snapCnt = null;

  TimelineView.prototype.snapsPerSlot = null;

  TimelineView.prototype.snapDiffToIndex = null;

  TimelineView.prototype.snapIndexToDiff = null;

  TimelineView.prototype.timeWindowMs = null;

  TimelineView.prototype.slotDuration = null;

  TimelineView.prototype.snapDuration = null;

  TimelineView.prototype.duration = null;

  TimelineView.prototype.labelInterval = null;

  TimelineView.prototype.isTimeScale = null;

  TimelineView.prototype.largeUnit = null;

  TimelineView.prototype.headerFormats = null;

  TimelineView.prototype.emphasizeWeeks = false;

  TimelineView.prototype.timeHeadEl = null;

  TimelineView.prototype.timeHeadColEls = null;

  TimelineView.prototype.timeHeadScroller = null;

  TimelineView.prototype.timeBodyEl = null;

  TimelineView.prototype.timeBodyScroller = null;

  TimelineView.prototype.timeScrollJoiner = null;

  TimelineView.prototype.headDateFollower = null;

  TimelineView.prototype.eventTitleFollower = null;

  TimelineView.prototype.segContainerEl = null;

  TimelineView.prototype.segContainerHeight = null;

  TimelineView.prototype.bgSegContainerEl = null;

  TimelineView.prototype.slatContainerEl = null;

  TimelineView.prototype.slatColEls = null;

  TimelineView.prototype.slatEls = null;

  TimelineView.prototype.timeBodyBoundCache = null;

  TimelineView.prototype.slatCoordCache = null;

  TimelineView.prototype.slatInnerCoordCache = null;

  TimelineView.prototype.nowIndicatorEls = null;

  TimelineView.prototype.isTimeBodyScrolled = false;

  function TimelineView() {
    TimelineView.__super__.constructor.apply(this, arguments);
    this.slotWidth = this.opt('slotWidth');
  }


  /*
  	TODO: avoid using Moments. use slat system somehow
  	THEN, can have componentFootprintToSegs handle this on its own
   */

  TimelineView.prototype.normalizeComponentFootprint = function(componentFootprint) {
    var adjustedEnd, adjustedStart, dayRange, unzonedRange;
    unzonedRange = componentFootprint.unzonedRange;
    if (this.isTimeScale) {
      adjustedStart = this.normalizeGridDate(unzonedRange.getStart());
      adjustedEnd = this.normalizeGridDate(unzonedRange.getEnd());
    } else {
      dayRange = this.computeDayRange(unzonedRange);
      if (this.largeUnit) {
        adjustedStart = dayRange.start.clone().startOf(this.largeUnit);
        adjustedEnd = dayRange.end.clone().startOf(this.largeUnit);
        if (!adjustedEnd.isSame(dayRange.end) || !adjustedEnd.isAfter(adjustedStart)) {
          adjustedEnd.add(this.slotDuration);
        }
      } else {
        adjustedStart = dayRange.start;
        adjustedEnd = dayRange.end;
      }
    }
    return new ComponentFootprint(new UnzonedRange(adjustedStart, adjustedEnd), !this.isTimeScale);
  };

  TimelineView.prototype.componentFootprintToSegs = function(footprint) {
    var footprintEnd, footprintStart, normalFootprint, segEnd, segRange, segStart, segs;
    footprintStart = footprint.unzonedRange.getStart();
    footprintEnd = footprint.unzonedRange.getEnd();
    normalFootprint = this.normalizeComponentFootprint(footprint);
    segs = [];
    if (this.computeDateSnapCoverage(footprintStart) < this.computeDateSnapCoverage(footprintEnd)) {
      segRange = normalFootprint.unzonedRange.intersect(this.normalizedUnzonedRange);
      if (segRange) {
        segStart = segRange.getStart();
        segEnd = segRange.getEnd();
        segs.push({
          start: segStart,
          end: segEnd,
          isStart: segRange.isStart && this.isValidDate(segStart),
          isEnd: segRange.isEnd && this.isValidDate(segEnd.clone().subtract(1))
        });
      }
    }
    return segs;
  };


  /*
  	Makes the given date consistent with isTimeScale/largeUnit,
  	so, either removes the times, ensures a time, or makes it the startOf largeUnit.
  	Strips all timezones. Returns new copy.
  	TODO: should maybe be called "normalizeRangeDate".
   */

  TimelineView.prototype.normalizeGridDate = function(date) {
    var normalDate;
    if (this.isTimeScale) {
      normalDate = date.clone();
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

  TimelineView.prototype.isValidDate = function(date) {
    var ms;
    if (this.isHiddenDay(date)) {
      return false;
    } else if (this.isTimeScale) {
      ms = date.time() - this.dateProfile.minTime;
      ms = ((ms % 86400000) + 86400000) % 86400000;
      return ms < this.timeWindowMs;
    } else {
      return true;
    }
  };

  TimelineView.prototype.updateGridDates = function() {
    var date, snapDiff, snapDiffToIndex, snapIndex, snapIndexToDiff;
    snapIndex = -1;
    snapDiff = 0;
    snapDiffToIndex = [];
    snapIndexToDiff = [];
    date = this.normalizedUnzonedStart.clone();
    while (date < this.normalizedUnzonedEnd) {
      if (this.isValidDate(date)) {
        snapIndex++;
        snapDiffToIndex.push(snapIndex);
        snapIndexToDiff.push(snapDiff);
      } else {
        snapDiffToIndex.push(snapIndex + 0.5);
      }
      date.add(this.snapDuration);
      snapDiff++;
    }
    this.snapDiffToIndex = snapDiffToIndex;
    this.snapIndexToDiff = snapIndexToDiff;
    this.snapCnt = snapIndex + 1;
    return this.slotCnt = this.snapCnt / this.snapsPerSlot;
  };

  TimelineView.prototype.renderSkeleton = function() {
    this.el.addClass('fc-timeline');
    if (this.opt('eventOverlap') === false) {
      this.el.addClass('fc-no-overlap');
    }
    this.el.html(this.renderSkeletonHtml());
    this.timeHeadEl = this.el.find('thead .fc-time-area');
    this.timeBodyEl = this.el.find('tbody .fc-time-area');
    this.timeHeadScroller = new ClippedScroller({
      overflowX: 'clipped-scroll',
      overflowY: 'hidden'
    });
    this.timeHeadScroller.canvas = new ScrollerCanvas();
    this.timeHeadScroller.render();
    this.timeHeadScroller.el.appendTo(this.timeHeadEl);
    this.timeBodyScroller = new ClippedScroller();
    this.timeBodyScroller.canvas = new ScrollerCanvas();
    this.timeBodyScroller.render();
    this.timeBodyScroller.el.appendTo(this.timeBodyEl);
    this.isTimeBodyScrolled = false;
    this.timeBodyScroller.on('scroll', proxy(this, 'handleTimeBodyScrolled'));
    this.slatContainerEl = $('<div class="fc-slats"/>').appendTo(this.timeBodyScroller.canvas.bgEl);
    this.segContainerEl = $('<div class="fc-event-container"/>').appendTo(this.timeBodyScroller.canvas.contentEl);
    this.bgSegContainerEl = this.timeBodyScroller.canvas.bgEl;
    this.timeBodyBoundCache = new CoordCache({
      els: this.timeBodyScroller.canvas.el,
      isHorizontal: true,
      isVertical: true
    });
    this.timeScrollJoiner = new ScrollJoiner('horizontal', [this.timeHeadScroller, this.timeBodyScroller]);
    if (true) {
      this.headDateFollower = new ScrollFollower(this.timeHeadScroller, true);
    }
    if (true) {
      this.eventTitleFollower = new ScrollFollower(this.timeBodyScroller);
      this.eventTitleFollower.minTravel = 50;
      if (this.isRTL) {
        this.eventTitleFollower.containOnNaturalRight = true;
      } else {
        this.eventTitleFollower.containOnNaturalLeft = true;
      }
    }
    return TimelineView.__super__.renderSkeleton.apply(this, arguments);
  };

  TimelineView.prototype.renderSkeletonHtml = function() {
    var theme;
    theme = this.calendar.theme;
    return '<table class="' + theme.getClass('tableGrid') + '"> <thead class="fc-head"> <tr> <td class="fc-time-area ' + theme.getClass('widgetHeader') + '"></td> </tr> </thead> <tbody class="fc-body"> <tr> <td class="fc-time-area ' + theme.getClass('widgetContent') + '"></td> </tr> </tbody> </table>';
  };

  TimelineView.prototype.unrenderSkeleton = function() {
    this.handleTimeBodyScrolled(0);
    return TimelineView.__super__.unrenderSkeleton.apply(this, arguments);
  };

  TimelineView.prototype.renderDates = function(dateProfile) {
    var date, i, j, len, ref, slatHtmlRes, slotDates;
    this.initScaleProps();
    this.timeWindowMs = dateProfile.maxTime - dateProfile.minTime;
    this.normalizedUnzonedStart = this.normalizeGridDate(dateProfile.renderUnzonedRange.getStart());
    this.normalizedUnzonedEnd = this.normalizeGridDate(dateProfile.renderUnzonedRange.getEnd());
    if (this.isTimeScale) {
      this.normalizedUnzonedStart.add(dateProfile.minTime);
      this.normalizedUnzonedEnd.subtract(1, 'day').add(dateProfile.maxTime);
    }
    this.normalizedUnzonedRange = new UnzonedRange(this.normalizedUnzonedStart, this.normalizedUnzonedEnd);
    slotDates = [];
    date = this.normalizedUnzonedStart.clone();
    this.calendar.localizeMoment(date);
    while (date < this.normalizedUnzonedEnd) {
      if (this.isValidDate(date)) {
        slotDates.push(date.clone());
      }
      date.add(this.slotDuration);
    }
    this.slotDates = slotDates;
    this.updateGridDates();
    slatHtmlRes = this.renderSlatHtml();
    this.timeHeadScroller.canvas.contentEl.html(slatHtmlRes.headHtml);
    this.timeHeadColEls = this.timeHeadScroller.canvas.contentEl.find('col');
    this.slatContainerEl.html(slatHtmlRes.bodyHtml);
    this.slatColEls = this.slatContainerEl.find('col');
    this.slatEls = this.slatContainerEl.find('td');
    this.slatCoordCache = new CoordCache({
      els: this.slatEls,
      isHorizontal: true
    });
    this.slatInnerCoordCache = new CoordCache({
      els: this.slatEls.find('> div'),
      isHorizontal: true,
      offsetParent: this.timeBodyScroller.canvas.el
    });
    ref = this.slotDates;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      date = ref[i];
      this.publiclyTrigger('dayRender', {
        context: this,
        args: [date, this.slatEls.eq(i), this]
      });
    }
    if (this.headDateFollower) {
      return this.headDateFollower.setSpriteEls(this.timeHeadEl.find('tr:not(:last-child) .fc-cell-text'));
    }
  };

  TimelineView.prototype.unrenderDates = function() {
    if (this.headDateFollower) {
      this.headDateFollower.clearSprites();
    }
    this.timeHeadScroller.canvas.contentEl.empty();
    this.slatContainerEl.empty();
    this.timeHeadScroller.canvas.clearWidth();
    return this.timeBodyScroller.canvas.clearWidth();
  };

  TimelineView.prototype.renderSlatHtml = function() {
    var cell, cellRows, date, format, formats, headerCellClassNames, html, i, isChrono, isLast, isSingleDay, isSuperRow, isWeekStart, j, k, l, labelInterval, leadingCell, len, len1, len2, len3, len4, len5, len6, m, n, newCell, p, prevWeekNumber, q, row, rowCells, rowUnits, slatHtml, slotCells, slotDates, text, theme, weekNumber;
    theme = this.calendar.theme;
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
    rowUnits = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = formats.length; j < len; j++) {
        format = formats[j];
        results.push(FC.queryMostGranularFormatUnit(format));
      }
      return results;
    })();
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
            newCell = this.buildCellObject(date, text, rowUnits[row]);
          } else {
            leadingCell.colspan += 1;
          }
        } else {
          if (!leadingCell || isInt(divideRangeByDuration(this.normalizedUnzonedStart, date, labelInterval))) {
            text = date.format(format);
            newCell = this.buildCellObject(date, text, rowUnits[row]);
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
    isSingleDay = this.slotDuration.as('days') === 1;
    html = '<table class="' + theme.getClass('tableGrid') + '">';
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
        headerCellClassNames = [theme.getClass('widgetHeader')];
        if (cell.weekStart) {
          headerCellClassNames.push('fc-em-cell');
        }
        if (isSingleDay) {
          headerCellClassNames = headerCellClassNames.concat(this.getDayClasses(cell.date, true));
        }
        html += '<th class="' + headerCellClassNames.join(' ') + '"' + ' data-date="' + cell.date.format() + '"' + (cell.colspan > 1 ? ' colspan="' + cell.colspan + '"' : '') + '>' + '<div class="fc-cell-content">' + cell.spanHtml + '</div>' + '</th>';
      }
      html += '</tr>';
    }
    html += '</tbody></table>';
    slatHtml = '<table class="' + theme.getClass('tableGrid') + '">';
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
    return {
      headHtml: html,
      bodyHtml: slatHtml
    };
  };

  TimelineView.prototype.buildCellObject = function(date, text, rowUnit) {
    var spanHtml;
    date = date.clone();
    spanHtml = this.buildGotoAnchorHtml({
      date: date,
      type: rowUnit,
      forceOff: !rowUnit
    }, {
      'class': 'fc-cell-text'
    }, htmlEscape(text));
    return {
      text: text,
      spanHtml: spanHtml,
      date: date,
      colspan: 1
    };
  };

  TimelineView.prototype.slatCellHtml = function(date, isEm) {
    var classes, theme;
    theme = this.calendar.theme;
    if (this.isTimeScale) {
      classes = [];
      classes.push(isInt(divideRangeByDuration(this.normalizedUnzonedStart, date, this.labelInterval)) ? 'fc-major' : 'fc-minor');
    } else {
      classes = this.getDayClasses(date);
      classes.push('fc-day');
    }
    classes.unshift(theme.getClass('widgetContent'));
    if (isEm) {
      classes.push('fc-em-cell');
    }
    return '<td class="' + classes.join(' ') + '"' + ' data-date="' + date.format() + '"' + '><div /></td>';
  };

  TimelineView.prototype.renderBusinessHours = function(businessHourPayload) {
    if (!this.largeUnit) {
      return TimelineView.__super__.renderBusinessHours.apply(this, arguments);
    }
  };

  TimelineView.prototype.getNowIndicatorUnit = function() {
    if (this.isTimeScale) {
      return computeGreatestUnit(this.slotDuration);
    }
  };

  TimelineView.prototype.renderNowIndicator = function(date) {
    var coord, css, nodes;
    nodes = [];
    date = this.normalizeGridDate(date);
    if (this.normalizedUnzonedRange.containsDate(date)) {
      coord = this.dateToCoord(date);
      css = this.isRTL ? {
        right: -coord
      } : {
        left: coord
      };
      nodes.push($("<div class='fc-now-indicator fc-now-indicator-arrow'></div>").css(css).appendTo(this.timeHeadScroller.canvas.el)[0]);
      nodes.push($("<div class='fc-now-indicator fc-now-indicator-line'></div>").css(css).appendTo(this.timeBodyScroller.canvas.el)[0]);
    }
    return this.nowIndicatorEls = $(nodes);
  };

  TimelineView.prototype.unrenderNowIndicator = function() {
    if (this.nowIndicatorEls) {
      this.nowIndicatorEls.remove();
      return this.nowIndicatorEls = null;
    }
  };

  TimelineView.prototype.updateSize = function(totalHeight, isAuto, isResize) {
    var availableWidth, bodyHeight, containerMinWidth, containerWidth, isDatesRendered, nonLastSlotWidth, slotWidth;
    if (isAuto) {
      bodyHeight = 'auto';
    } else {
      bodyHeight = totalHeight - this.headHeight() - this.queryMiscHeight();
    }
    this.timeBodyScroller.setHeight(bodyHeight);
    isDatesRendered = this.timeHeadColEls;
    if (isDatesRendered) {
      slotWidth = Math.round(this.slotWidth || (this.slotWidth = this.computeSlotWidth()));
      containerWidth = slotWidth * this.slotDates.length;
      containerMinWidth = '';
      nonLastSlotWidth = slotWidth;
      availableWidth = this.timeBodyScroller.getClientWidth();
      if (availableWidth > containerWidth) {
        containerMinWidth = availableWidth;
        containerWidth = '';
        nonLastSlotWidth = Math.floor(availableWidth / this.slotDates.length);
      }
    } else {
      containerWidth = '';
      containerMinWidth = '';
    }
    this.timeHeadScroller.canvas.setWidth(containerWidth);
    this.timeHeadScroller.canvas.setMinWidth(containerMinWidth);
    this.timeBodyScroller.canvas.setWidth(containerWidth);
    this.timeBodyScroller.canvas.setMinWidth(containerMinWidth);
    if (isDatesRendered) {
      this.timeHeadColEls.slice(0, -1).add(this.slatColEls.slice(0, -1)).css('width', nonLastSlotWidth);
    }
    this.timeHeadScroller.updateSize();
    this.timeBodyScroller.updateSize();
    this.timeScrollJoiner.update();
    if (isDatesRendered) {
      this.buildCoords();
      this.updateSegPositions();
      this.updateNowIndicator();
    }
    if (this.headDateFollower) {
      this.headDateFollower.update();
    }
    if (this.eventTitleFollower) {
      return this.eventTitleFollower.update();
    }
  };

  TimelineView.prototype.queryMiscHeight = function() {
    return this.el.outerHeight() - this.timeHeadScroller.el.outerHeight() - this.timeBodyScroller.el.outerHeight();
  };

  TimelineView.prototype.computeSlotWidth = function() {
    var headerWidth, innerEls, maxInnerWidth, minWidth, slotWidth, slotsPerLabel;
    maxInnerWidth = 0;
    innerEls = this.timeHeadEl.find('tr:last-child th .fc-cell-text');
    innerEls.each(function(i, node) {
      var innerWidth;
      innerWidth = $(node).outerWidth();
      return maxInnerWidth = Math.max(maxInnerWidth, innerWidth);
    });
    headerWidth = maxInnerWidth + 1;
    slotsPerLabel = divideDurationByDuration(this.labelInterval, this.slotDuration);
    slotWidth = Math.ceil(headerWidth / slotsPerLabel);
    minWidth = this.timeHeadColEls.eq(0).css('min-width');
    if (minWidth) {
      minWidth = parseInt(minWidth, 10);
      if (minWidth) {
        slotWidth = Math.max(slotWidth, minWidth);
      }
    }
    return slotWidth;
  };

  TimelineView.prototype.buildCoords = function() {
    this.timeBodyBoundCache.build();
    this.slatCoordCache.build();
    return this.slatInnerCoordCache.build();
  };

  TimelineView.prototype.computeDateSnapCoverage = function(date) {
    var snapCoverage, snapDiff, snapDiffInt;
    snapDiff = divideRangeByDuration(this.normalizedUnzonedStart, date, this.snapDuration);
    if (snapDiff < 0) {
      return 0;
    } else if (snapDiff >= this.snapDiffToIndex.length) {
      return this.snapCnt;
    } else {
      snapDiffInt = Math.floor(snapDiff);
      snapCoverage = this.snapDiffToIndex[snapDiffInt];
      if (isInt(snapCoverage)) {
        snapCoverage += snapDiff - snapDiffInt;
      } else {
        snapCoverage = Math.ceil(snapCoverage);
      }
      return snapCoverage;
    }
  };

  TimelineView.prototype.dateToCoord = function(date) {
    var coordCache, partial, slotCoverage, slotIndex, snapCoverage;
    snapCoverage = this.computeDateSnapCoverage(date);
    slotCoverage = snapCoverage / this.snapsPerSlot;
    slotIndex = Math.floor(slotCoverage);
    slotIndex = Math.min(slotIndex, this.slotCnt - 1);
    partial = slotCoverage - slotIndex;
    coordCache = this.slatInnerCoordCache;
    if (this.isRTL) {
      return (coordCache.getRightPosition(slotIndex) - coordCache.getWidth(slotIndex) * partial) - this.timeBodyBoundCache.getWidth(0);
    } else {
      return coordCache.getLeftPosition(slotIndex) + coordCache.getWidth(slotIndex) * partial;
    }
  };

  TimelineView.prototype.rangeToCoords = function(range) {
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

  TimelineView.prototype.headHeight = function() {
    var table;
    table = this.timeHeadScroller.canvas.contentEl.find('table');
    return table.height.apply(table, arguments);
  };

  TimelineView.prototype.updateSegPositions = function() {
    var coords, j, len, seg, segs;
    segs = [].concat(this.getEventSegs(), this.getBusinessHourSegs());
    for (j = 0, len = segs.length; j < len; j++) {
      seg = segs[j];
      coords = this.rangeToCoords(seg);
      seg.el.css({
        left: (seg.left = coords.left),
        right: -(seg.right = coords.right)
      });
    }
  };

  TimelineView.prototype.handleTimeBodyScrolled = function(top, left) {
    if (top) {
      if (!this.isTimeBodyScrolled) {
        this.isTimeBodyScrolled = true;
        return this.el.addClass('fc-scrolled');
      }
    } else {
      if (this.isTimeBodyScrolled) {
        this.isTimeBodyScrolled = false;
        return this.el.removeClass('fc-scrolled');
      }
    }
  };

  TimelineView.prototype.computeInitialDateScroll = function() {
    var left, scrollTime, unzonedRange;
    unzonedRange = this.get('dateProfile').activeUnzonedRange;
    left = 0;
    if (this.isTimeScale) {
      scrollTime = this.opt('scrollTime');
      if (scrollTime) {
        scrollTime = moment.duration(scrollTime);
        left = this.dateToCoord(unzonedRange.getStart().time(scrollTime));
      }
    }
    return {
      left: left
    };
  };

  TimelineView.prototype.queryDateScroll = function() {
    return {
      left: this.timeBodyScroller.getScrollLeft()
    };
  };

  TimelineView.prototype.applyDateScroll = function(scroll) {
    if (scroll.left != null) {
      this.timeHeadScroller.setScrollLeft(scroll.left);
      return this.timeBodyScroller.setScrollLeft(scroll.left);
    }
  };

  TimelineView.prototype.prepareHits = function() {
    return this.buildCoords();
  };

  TimelineView.prototype.queryHit = function(leftOffset, topOffset) {
    var localSnapIndex, partial, slatCoordCache, slatIndex, slatLeft, slatRight, slatWidth, snapIndex, snapLeft, snapRight, snapsPerSlot, timeBodyBoundCache;
    snapsPerSlot = this.snapsPerSlot;
    slatCoordCache = this.slatCoordCache;
    timeBodyBoundCache = this.timeBodyBoundCache;
    if (timeBodyBoundCache.isPointInBounds(leftOffset, topOffset)) {
      slatIndex = slatCoordCache.getHorizontalIndex(leftOffset);
      if (slatIndex != null) {
        slatWidth = slatCoordCache.getWidth(slatIndex);
        if (this.isRTL) {
          slatRight = slatCoordCache.getRightOffset(slatIndex);
          partial = (slatRight - leftOffset) / slatWidth;
          localSnapIndex = Math.floor(partial * snapsPerSlot);
          snapIndex = slatIndex * snapsPerSlot + localSnapIndex;
          snapRight = slatRight - (localSnapIndex / snapsPerSlot) * slatWidth;
          snapLeft = snapRight - ((localSnapIndex + 1) / snapsPerSlot) * slatWidth;
        } else {
          slatLeft = slatCoordCache.getLeftOffset(slatIndex);
          partial = (leftOffset - slatLeft) / slatWidth;
          localSnapIndex = Math.floor(partial * snapsPerSlot);
          snapIndex = slatIndex * snapsPerSlot + localSnapIndex;
          snapLeft = slatLeft + (localSnapIndex / snapsPerSlot) * slatWidth;
          snapRight = slatLeft + ((localSnapIndex + 1) / snapsPerSlot) * slatWidth;
        }
        return {
          snap: snapIndex,
          component: this,
          left: snapLeft,
          right: snapRight,
          top: timeBodyBoundCache.getTopOffset(0),
          bottom: timeBodyBoundCache.getBottomOffset(0)
        };
      }
    }
  };

  TimelineView.prototype.getHitFootprint = function(hit) {
    return new ComponentFootprint(this.getSnapUnzonedRange(hit.snap), !this.isTimeScale);
  };

  TimelineView.prototype.getHitEl = function(hit) {
    return this.getSnapEl(hit.snap);
  };


  /*
  	TODO: avoid using moments
   */

  TimelineView.prototype.getSnapUnzonedRange = function(snapIndex) {
    var end, start;
    start = this.normalizedUnzonedStart.clone();
    start.add(multiplyDuration(this.snapDuration, this.snapIndexToDiff[snapIndex]));
    end = start.clone().add(this.snapDuration);
    return new UnzonedRange(start, end);
  };

  TimelineView.prototype.getSnapEl = function(snapIndex) {
    return this.slatEls.eq(Math.floor(snapIndex / this.snapsPerSlot));
  };

  TimelineView.prototype.renderEventResize = function(eventFootprints, seg, isTouch) {
    var eventFootprint, j, len;
    for (j = 0, len = eventFootprints.length; j < len; j++) {
      eventFootprint = eventFootprints[j];
      this.renderHighlight(eventFootprint.componentFootprint);
    }
    return this.helperRenderer.renderEventResizingFootprints(eventFootprints, seg, isTouch);
  };

  TimelineView.prototype.unrenderEventResize = function() {
    this.unrenderHighlight();
    return this.helperRenderer.unrender();
  };

  TimelineView.prototype.renderDrag = function(eventFootprints, seg, isTouch) {
    var eventFootprint, j, len;
    if (seg) {
      this.helperRenderer.renderEventDraggingFootprints(eventFootprints, seg, isTouch);
      return true;
    } else {
      for (j = 0, len = eventFootprints.length; j < len; j++) {
        eventFootprint = eventFootprints[j];
        this.renderHighlight(eventFootprint.componentFootprint);
      }
      return false;
    }
  };

  TimelineView.prototype.unrenderDrag = function() {
    this.helperRenderer.unrender();
    return this.unrenderHighlight();
  };

  return TimelineView;

})(View);

FC.TimelineView = TimelineView;

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

TimelineView.prototype.initScaleProps = function() {
  var input, slotUnit, type;
  this.labelInterval = this.queryDurationOption('slotLabelInterval');
  this.slotDuration = this.queryDurationOption('slotDuration');
  this.validateLabelAndSlot();
  this.ensureLabelInterval();
  this.ensureSlotDuration();
  input = this.opt('slotLabelFormat');
  type = $.type(input);
  this.headerFormats = type === 'array' ? input : type === 'string' ? [input] : this.computeHeaderFormats();
  this.isTimeScale = durationHasTime(this.slotDuration);
  this.largeUnit = !this.isTimeScale ? (slotUnit = computeGreatestUnit(this.slotDuration), /year|month|week/.test(slotUnit) ? slotUnit : void 0) : void 0;
  this.emphasizeWeeks = this.slotDuration.as('days') === 1 && this.currentRangeAs('weeks') >= 2 && !this.opt('businessHours');

  /*
  	console.log('label interval =', @labelInterval.humanize())
  	console.log('slot duration =', @slotDuration.humanize())
  	console.log('header formats =', @headerFormats)
  	console.log('isTimeScale', @isTimeScale)
  	console.log('largeUnit', @largeUnit)
   */
  this.snapDuration = (input = this.opt('snapDuration')) ? moment.duration(input) : this.slotDuration;
  return this.snapsPerSlot = divideDurationByDuration(this.slotDuration, this.snapDuration);
};

TimelineView.prototype.queryDurationOption = function(name) {
  var dur, input;
  input = this.opt(name);
  if (input != null) {
    dur = moment.duration(input);
    if (+dur) {
      return dur;
    }
  }
};

TimelineView.prototype.validateLabelAndSlot = function() {
  var currentUnzonedRange, labelCnt, slotCnt, slotsPerLabel;
  currentUnzonedRange = this.dateProfile.currentUnzonedRange;
  if (this.labelInterval) {
    labelCnt = divideRangeByDuration(currentUnzonedRange.getStart(), currentUnzonedRange.getEnd(), this.labelInterval);
    if (labelCnt > MAX_CELLS) {
      FC.warn('slotLabelInterval results in too many cells');
      this.labelInterval = null;
    }
  }
  if (this.slotDuration) {
    slotCnt = divideRangeByDuration(currentUnzonedRange.getStart(), currentUnzonedRange.getEnd(), this.slotDuration);
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

TimelineView.prototype.computeFallbackDuration = function() {
  var duration, input, j, labelCnt, labelInterval;
  duration = null;
  if (!this.labelInterval && !this.slotDuration) {
    duration = moment.duration(DEFAULT_GRID_DURATION);
  } else {
    labelInterval = this.ensureLabelInterval();
    for (j = STOCK_SUB_DURATIONS.length - 1; j >= 0; j += -1) {
      input = STOCK_SUB_DURATIONS[j];
      duration = moment.duration(input);
      labelCnt = divideDurationByDuration(duration, labelInterval);
      if (labelCnt >= MIN_AUTO_LABELS) {
        break;
      }
    }
  }
  return duration;
};

TimelineView.prototype.ensureLabelInterval = function() {
  var currentUnzonedRange, input, j, k, labelCnt, labelInterval, len, len1, slotsPerLabel, tryLabelInterval;
  currentUnzonedRange = this.dateProfile.currentUnzonedRange;
  labelInterval = this.labelInterval;
  if (!labelInterval) {
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
        labelCnt = divideRangeByDuration(currentUnzonedRange.getStart(), currentUnzonedRange.getEnd(), labelInterval);
        if (labelCnt >= MIN_AUTO_LABELS) {
          break;
        }
      }
    }
    this.labelInterval = labelInterval;
  }
  return labelInterval;
};

TimelineView.prototype.ensureSlotDuration = function() {
  var currentUnzonedRange, input, j, labelInterval, len, slotCnt, slotDuration, slotsPerLabel, trySlotDuration;
  currentUnzonedRange = this.dateProfile.currentUnzonedRange;
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
    if (slotDuration) {
      slotCnt = divideRangeByDuration(currentUnzonedRange.getStart(), currentUnzonedRange.getEnd(), slotDuration);
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

TimelineView.prototype.computeHeaderFormats = function() {
  var format0, format1, format2, labelInterval, unit, weekNumbersVisible;
  labelInterval = this.labelInterval;
  unit = computeGreatestUnit(labelInterval);
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
      if (this.currentRangeAs('years') > 1) {
        format0 = 'YYYY';
      }
      format1 = 'MMM';
      break;
    case 'week':
      if (this.currentRangeAs('years') > 1) {
        format0 = 'YYYY';
      }
      format1 = this.opt('shortWeekFormat');
      break;
    case 'day':
      if (this.currentRangeAs('years') > 1) {
        format0 = this.opt('monthYearFormat');
      } else if (this.currentRangeAs('months') > 1) {
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
      if (this.currentRangeAs('days') > 1) {
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


/*
An abstract node in a row-hierarchy tree.
May be a self-contained single row, a row with subrows,
OR a grouping of rows without its own distinct row.
 */

RowParent = (function(superClass) {
  extend(RowParent, superClass);

  RowParent.prototype.view = null;

  RowParent.prototype.parent = null;

  RowParent.prototype.prevSibling = null;

  RowParent.prototype.children = null;

  RowParent.prototype.depth = 0;

  RowParent.prototype.hasOwnRow = false;

  RowParent.prototype.trHash = null;

  RowParent.prototype.trs = null;

  RowParent.prototype.isExpanded = false;

  function RowParent(view1) {
    this.view = view1;
    RowParent.__super__.constructor.apply(this, arguments);
    this.isExpanded = this.view.opt('resourcesInitiallyExpanded');
    this.children = [];
    this.trHash = {};
    this.trs = $();
  }


  /*
  	Adds the given node as a child.
  	Will be inserted at the `index`. If not given, will be appended to the end.
  	TERRIBLE NAME!
   */

  RowParent.prototype.addChild = function(child, index) {
    var children;
    child.removeFromParentAndDom();
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
    return this.descendantAdded(child);
  };


  /*
  	Removes the given child from the node. Assumes it is a direct child.
  	If not a direct child, returns false and nothing happens.
   */

  RowParent.prototype.removeChild = function(child) {
    var children, i, isFound, j, len, testChild;
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
      child.parent = null;
      child.prevSibling = null;
      this.descendantRemoved(child);
      return child;
    }
  };


  /*
  	Removes all of the node's children from the hierarchy.
   */

  RowParent.prototype.removeChildren = function() {
    var child, j, len, ref;
    ref = this.children;
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      this.descendantRemoved(child);
    }
    return this.children = [];
  };


  /*
  	Removes this node from its parent
   */

  RowParent.prototype.removeFromParentAndDom = function() {
    if (this.parent) {
      this.parent.removeChild(this);
    }
    if (this.get('isInDom')) {
      return this.removeElement();
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

  RowParent.prototype.getPrevRowInDom = function() {
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
      if (node && node.get('isInDom')) {
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

  RowParent.prototype.show = function() {
    if (!this.get('isInDom')) {
      return this.renderSkeleton();
    }
  };

  RowParent.prototype.hide = function() {
    if (this.get('isInDom')) {
      return this.removeElement();
    }
  };


  /*
  	Builds and populates the TRs for each row type. Inserts them into the DOM.
  	Does this only for this single row. Not recursive. If not a row (hasOwnRow=false), does not render anything.
  	PRECONDITION: assumes the parent has already been rendered.
   */

  RowParent.prototype.renderSkeleton = function() {
    var child, j, len, prevRow, ref, ref1, renderMethodName, results, tbody, tr, trNodes, type;
    this.trHash = {};
    trNodes = [];
    if (this.hasOwnRow) {
      prevRow = this.getPrevRowInDom();
      ref = this.view.tbodyHash;
      for (type in ref) {
        tbody = ref[type];
        tr = $('<tr/>');
        this.trHash[type] = tr;
        trNodes.push(tr[0]);
        renderMethodName = 'render' + capitaliseFirstLetter(type) + 'Skeleton';
        if (this[renderMethodName]) {
          this[renderMethodName](tr);
        }
        if (prevRow) {
          prevRow.trHash[type].after(tr);
        } else {
          tbody.prepend(tr);
        }
      }
      this.trs = $(trNodes).on('click', '.fc-expander', proxy(this, 'toggleExpanded'));
      this.set('isInDom', true);
      this.thisRowShown();
    }
    ref1 = this.children;
    results = [];
    for (j = 0, len = ref1.length; j < len; j++) {
      child = ref1[j];
      if (child.isExpanded) {
        results.push(child.renderSkeleton());
      } else {
        results.push(void 0);
      }
    }
    return results;
  };


  /*
  	Unpopulates and removes all of this row's TRs from the DOM. Only for this single row. Not recursive.
  	Will trigger "hidden".
   */

  RowParent.prototype.removeElement = function() {
    var child, j, len, ref, ref1, results, tr, type, unrenderMethodName;
    ref = this.trHash;
    for (type in ref) {
      tr = ref[type];
      unrenderMethodName = 'unrender' + capitaliseFirstLetter(type) + 'Skeleton';
      if (this[unrenderMethodName]) {
        this[unrenderMethodName](tr);
      }
    }
    this.unset('isInDom');
    this.thisRowHidden();
    this.trHash = {};
    this.trs.remove();
    this.trs = $();
    ref1 = this.children;
    results = [];
    for (j = 0, len = ref1.length; j < len; j++) {
      child = ref1[j];
      if (child.get('isInDom')) {
        results.push(child.removeElement());
      } else {
        results.push(void 0);
      }
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
  	Reveals this node's children if they have not already been revealed. Changes any expander icon.
   */

  RowParent.prototype.expand = function() {
    var child, j, len, ref;
    if (!this.isExpanded) {
      this.isExpanded = true;
      this.indicateExpanded();
      ref = this.children;
      for (j = 0, len = ref.length; j < len; j++) {
        child = ref[j];
        child.show();
      }
      this.view.calendar.updateViewSize();
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
      ref = this.children;
      for (j = 0, len = ref.length; j < len; j++) {
        child = ref[j];
        child.hide();
      }
      return this.view.calendar.updateViewSize();
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
    return this.trs.find('.fc-expander .fc-icon').removeClass(this.getCollapsedIcon()).addClass(this.getExpandedIcon());
  };


  /*
  	Changes the expander icon to the "collapsed" state
   */

  RowParent.prototype.indicateCollapsed = function() {
    return this.trs.find('.fc-expander .fc-icon').removeClass(this.getExpandedIcon()).addClass(this.getCollapsedIcon());
  };

  RowParent.prototype.indicateExpandingEnabled = function() {
    this.trs.find('.fc-expander-space').addClass('fc-expander');
    if (this.isExpanded) {
      return this.indicateExpanded();
    } else {
      return this.indicateCollapsed();
    }
  };

  RowParent.prototype.indicateExpandingDisabled = function() {
    return this.trs.find('.fc-expander-space').removeClass('fc-expander').find('.fc-icon').removeClass(this.getExpandedIcon()).removeClass(this.getCollapsedIcon());
  };

  RowParent.prototype.updateExpandingEnabled = function() {
    if (this.hasOwnRow && this.children.length) {
      return this.indicateExpandingEnabled();
    } else {
      return this.indicateExpandingDisabled();
    }
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
        innerEl = getOwnCells(tr).find('> div:not(.fc-cell-content):first');
        return max = Math.max(innerEl.height(), max);
      };
    })(this));
    return max;
  };


  /*
  	Find each TRs "inner div" and sets all of their heights to the same value.
   */

  RowParent.prototype.setTrInnerHeight = function(height) {
    return $.each(this.trHash, (function(_this) {
      return function(type, tr) {
        return getOwnCells(tr).find('> div:not(.fc-cell-content):first').height(height);
      };
    })(this));
  };

  RowParent.prototype.descendantAdded = function(row) {
    if (this.get('isInDom') && this.hasOwnRow && this.children.length === 1) {
      this.indicateExpandingEnabled();
    }
    return (this.parent || this.view).descendantAdded(row);
  };

  RowParent.prototype.descendantRemoved = function(row) {
    if (this.get('isInDom') && this.hasOwnRow && this.children.length === 0) {
      this.indicateExpandingDisabled();
    }
    return (this.parent || this.view).descendantRemoved(row);
  };

  RowParent.prototype.thisRowShown = function() {
    return (this.parent || this.view).descendantShown(this);
  };

  RowParent.prototype.thisRowHidden = function() {
    return (this.parent || this.view).descendantHidden(this);
  };

  RowParent.prototype.descendantShown = function(row) {
    return (this.parent || this.view).descendantShown(row);
  };

  RowParent.prototype.descendantHidden = function(row) {
    return (this.parent || this.view).descendantHidden(row);
  };

  return RowParent;

})(DateComponent);


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

  RowGroup.prototype.descendantRemoved = function(row) {
    RowGroup.__super__.descendantRemoved.apply(this, arguments);
    if (!this.children.length) {
      return this.removeFromParentAndDom();
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

  HRowGroup.prototype.renderSkeleton = function() {
    HRowGroup.__super__.renderSkeleton.apply(this, arguments);
    return this.updateExpandingEnabled();
  };


  /*
  	Renders this row's TR for the "spreadsheet" quadrant, the area with info about each resource
   */

  HRowGroup.prototype.renderSpreadsheetSkeleton = function(tr) {
    var contentEl;
    contentEl = this.renderGroupContentEl();
    contentEl.prepend('<span class="fc-expander">' + '<span class="fc-icon"></span>' + '</span>');
    return $('<td class="fc-divider" />').attr('colspan', this.view.colSpecs.length).append($('<div/>').append(contentEl)).appendTo(tr);
  };


  /*
  	Renders this row's TR for the quadrant that contains a resource's events
   */

  HRowGroup.prototype.renderEventSkeleton = function(tr) {
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
  	Makes sure the groupTd has the correct rowspan / place in the DOM.
  	PRECONDITION: in the case of multiple group nesting, a child's renderRowspan()
  	will be called before the parent's renderRowspan().
   */

  VRowGroup.prototype.renderRowspan = function() {
    var leadingTr, theme;
    theme = this.view.calendar.theme;
    if (this.rowspan) {
      if (!this.groupTd) {
        this.groupTd = $('<td class="' + theme.getClass('widgetContent') + '"/>').append(this.renderGroupContentEl());
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


  /*
  	Called when a row somewhere within the grouping is shown
   */

  VRowGroup.prototype.descendantShown = function(row) {
    this.rowspan += 1;
    this.renderRowspan();
    return VRowGroup.__super__.descendantShown.apply(this, arguments);
  };


  /*
  	Called when a row somewhere within the grouping is hidden
   */

  VRowGroup.prototype.descendantHidden = function(row) {
    this.rowspan -= 1;
    this.renderRowspan();
    return VRowGroup.__super__.descendantHidden.apply(this, arguments);
  };

  return VRowGroup;

})(RowGroup);

EventRow = (function(superClass) {
  extend(EventRow, superClass);

  function EventRow() {
    return EventRow.__super__.constructor.apply(this, arguments);
  }

  EventRow.prototype.fillRendererClass = TimelineFillRenderer;

  EventRow.prototype.eventRendererClass = TimelineEventRenderer;

  EventRow.prototype.helperRendererClass = TimelineHelperRenderer;

  EventRow.prototype.businessHourRendererClass = BusinessHourRenderer;

  EventRow.prototype.hasOwnRow = true;

  EventRow.prototype.segContainerEl = null;

  EventRow.prototype.segContainerHeight = null;

  EventRow.prototype.innerEl = null;

  EventRow.prototype.bgSegContainerEl = null;

  EventRow.prototype.renderEventSkeleton = function(tr) {
    var theme;
    theme = this.view.calendar.theme;
    tr.html('<td class="' + theme.getClass('widgetContent') + '"> <div> <div class="fc-event-container" /> </div> </td>');
    this.segContainerEl = tr.find('.fc-event-container');
    return this.innerEl = this.bgSegContainerEl = tr.find('td > div');
  };

  EventRow.prototype.rangeToCoords = function(range) {
    return this.view.rangeToCoords(range);
  };

  EventRow.prototype.componentFootprintToSegs = function(componentFootprint) {
    return this.view.componentFootprintToSegs(componentFootprint);
  };

  return EventRow;

})(RowParent);


/*
A row that renders information about a particular resource, as well as it events (handled by superclass)
 */

ResourceRow = (function(superClass) {
  extend(ResourceRow, superClass);

  ResourceRow.prototype.resource = null;

  ResourceRow.prototype.eventsPayload = null;

  ResourceRow.prototype.businessHourGenerator = null;

  function ResourceRow(view, resource1) {
    this.resource = resource1;
    ResourceRow.__super__.constructor.apply(this, arguments);
    this.eventRenderer.designatedResource = this.resource;
  }

  ResourceRow.prototype.renderSkeleton = function() {
    ResourceRow.__super__.renderSkeleton.apply(this, arguments);
    this.updateExpandingEnabled();
    if (this.eventsPayload) {
      EventRow.prototype.executeEventRender.call(this, this.eventsPayload);
    }
    if (this.businessHourGenerator) {
      EventRow.prototype.renderBusinessHours.call(this, this.businessHourGenerator);
    }
    return this.view.publiclyTrigger('resourceRender', {
      context: this.resource,
      args: [this.resource, this.getTr('spreadsheet').find('> td'), this.getTr('event').find('> td'), this.view]
    });
  };

  ResourceRow.prototype.removeElement = function() {
    ResourceRow.__super__.removeElement.apply(this, arguments);
    if (this.eventsPayload) {
      EventRow.prototype.executeEventUnrender.call(this, this.eventsPayload);
    }
    if (this.businessHourGenerator) {
      return EventRow.prototype.unrenderBusinessHours.call(this, this.businessHourGenerator);
    }
  };

  ResourceRow.prototype.renderEventSkeleton = function(tr) {
    ResourceRow.__super__.renderEventSkeleton.apply(this, arguments);
    return tr.attr('data-resource-id', this.resource.id);
  };

  ResourceRow.prototype.executeEventRender = function(eventsPayload1) {
    this.eventsPayload = eventsPayload1;
    if (this.get('isInDom')) {
      return ResourceRow.__super__.executeEventRender.call(this, this.eventsPayload);
    }
  };

  ResourceRow.prototype.executeEventUnrender = function() {
    ResourceRow.__super__.executeEventUnrender.apply(this, arguments);
    return this.eventsPayload = null;
  };

  ResourceRow.prototype.renderBusinessHours = function(businessHourGenerator1) {
    this.businessHourGenerator = businessHourGenerator1;
    if (this.get('isInDom')) {
      return ResourceRow.__super__.renderBusinessHours.call(this, this.businessHourGenerator);
    }
  };

  ResourceRow.prototype.unrenderBusinessHours = function() {
    ResourceRow.__super__.unrenderBusinessHours.apply(this, arguments);
    return this.businessHourGenerator = null;
  };


  /*
  	Populates the TR with cells containing data about the resource
   */

  ResourceRow.prototype.renderSpreadsheetSkeleton = function(tr) {
    var colSpec, contentEl, input, j, len, ref, resource, td, text, theme;
    theme = this.view.calendar.theme;
    resource = this.resource;
    ref = this.view.colSpecs;
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
      td = $('<td class="' + theme.getClass('widgetContent') + '"/>').append(contentEl);
      if (colSpec.isMain) {
        td.wrapInner('<div/>');
      }
      tr.append(td);
    }
    return tr.attr('data-resource-id', resource.id);
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
    html += '<span class="fc-expander-space">' + '<span class="fc-icon"></span>' + '</span>';
    return html;
  };

  return ResourceRow;

})(EventRow);

COL_MIN_WIDTH = 30;

Spreadsheet = (function() {
  Spreadsheet.prototype.view = null;

  Spreadsheet.prototype.headEl = null;

  Spreadsheet.prototype.el = null;

  Spreadsheet.prototype.tbodyEl = null;

  Spreadsheet.prototype.headScroller = null;

  Spreadsheet.prototype.bodyScroller = null;

  Spreadsheet.prototype.scrollJoiner = null;

  Spreadsheet.prototype.cellFollower = null;

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
    var theme;
    theme = this.view.calendar.theme;
    this.headScroller = new ClippedScroller({
      overflowX: 'clipped-scroll',
      overflowY: 'hidden'
    });
    this.headScroller.canvas = new ScrollerCanvas();
    this.headScroller.render();
    this.headScroller.canvas.contentEl.html(this.renderHeadHtml());
    this.headEl.append(this.headScroller.el);
    this.bodyScroller = new ClippedScroller({
      overflowY: 'clipped-scroll'
    });
    this.bodyScroller.canvas = new ScrollerCanvas();
    this.bodyScroller.render();
    this.bodyScroller.canvas.contentEl.html('<div class="fc-rows"> <table class="' + theme.getClass('tableGrid') + '">' + this.colGroupHtml + '<tbody/> </table> </div>');
    this.tbodyEl = this.bodyScroller.canvas.contentEl.find('tbody');
    this.el.append(this.bodyScroller.el);
    this.scrollJoiner = new ScrollJoiner('horizontal', [this.headScroller, this.bodyScroller]);
    this.headTable = this.headEl.find('table');
    this.headColEls = this.headEl.find('col');
    this.headCellEls = this.headScroller.canvas.contentEl.find('tr:last-child th');
    this.bodyColEls = this.el.find('col');
    this.bodyTable = this.el.find('table');
    this.colMinWidths = this.computeColMinWidths();
    this.applyColWidths();
    return this.initColResizing();
  };

  Spreadsheet.prototype.renderHeadHtml = function() {
    var colGroupHtml, colSpecs, html, i, isLast, isMainCol, j, k, len, len1, o, theme;
    theme = this.view.calendar.theme;
    colSpecs = this.view.colSpecs;
    html = '<table class="' + theme.getClass('tableGrid') + '">';
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
      html += '<tr class="fc-super">' + '<th class="' + theme.getClass('widgetHeader') + '" colspan="' + colSpecs.length + '">' + '<div class="fc-cell-content">' + '<span class="fc-cell-text">' + htmlEscape(this.view.superHeaderText) + '</span>' + '</div>' + '</th>' + '</tr>';
    }
    html += '<tr>';
    isMainCol = true;
    for (i = k = 0, len1 = colSpecs.length; k < len1; i = ++k) {
      o = colSpecs[i];
      isLast = i === colSpecs.length - 1;
      html += '<th class="' + theme.getClass('widgetHeader') + '">' + '<div>' + '<div class="fc-cell-content">' + (o.isMain ? '<span class="fc-expander-space">' + '<span class="fc-icon"></span>' + '</span>' : '') + '<span class="fc-cell-text">' + htmlEscape(o.labelText || '') + '</span>' + '</div>' + (!isLast ? '<div class="fc-col-resizer"></div>' : '') + '</div>' + '</th>';
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
    colWidths.push(null);
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
      dragEnd: (function(_this) {
        return function() {
          return resizerEl.removeClass('fc-active');
        };
      })(this)
    });
    return dragListener.startInteraction(ev);
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
    defaultCssWidth = anyPercentages && !this.view.isHGrouping ? 'auto' : '';
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
      this.headColEls.eq(i).css('width', cssWidth);
      this.bodyColEls.eq(i).css('width', cssWidth);
    }
    this.headScroller.canvas.setMinWidth(tableMinWidth);
    this.bodyScroller.canvas.setMinWidth(tableMinWidth);
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

  Spreadsheet.prototype.updateSize = function() {
    this.headScroller.updateSize();
    this.bodyScroller.updateSize();
    this.scrollJoiner.update();
    return this.updateCellFollower();
  };

  Spreadsheet.prototype.headHeight = function() {
    var table;
    table = this.headScroller.canvas.contentEl.find('table');
    return table.height.apply(table, arguments);
  };

  Spreadsheet.prototype.updateCellFollower = function() {
    var cellContent, j, len, nodes, ref, row;
    if (this.cellFollower) {
      this.cellFollower.clearSprites();
    }
    this.cellFollower = new ScrollFollower(this.bodyScroller, true);
    this.cellFollower.isHFollowing = false;
    this.cellFollower.isVFollowing = true;
    nodes = [];
    ref = this.view.rowHierarchy.getNodes();
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
    this.cellFollower.setSpriteEls($(nodes));
    return this.cellFollower.update();
  };

  return Spreadsheet;

})();

ResourceTimelineEventRenderer = (function(superClass) {
  extend(ResourceTimelineEventRenderer, superClass);

  function ResourceTimelineEventRenderer() {
    return ResourceTimelineEventRenderer.__super__.constructor.apply(this, arguments);
  }

  ResourceTimelineEventRenderer.prototype.renderFgRanges = function(eventRanges) {};

  ResourceTimelineEventRenderer.prototype.unrenderFgRanges = function() {};

  return ResourceTimelineEventRenderer;

})(TimelineEventRenderer);

ResourceTimelineView = (function(superClass) {
  extend(ResourceTimelineView, superClass);

  ResourceTimelineView.mixin(ResourceViewMixin);

  ResourceTimelineView.prototype.canHandleSpecificResources = true;

  ResourceTimelineView.prototype.isResourceFootprintsEnabled = true;

  ResourceTimelineView.prototype.eventRendererClass = ResourceTimelineEventRenderer;

  ResourceTimelineView.prototype.timeBodyTbodyEl = null;

  ResourceTimelineView.prototype.spreadsheet = null;

  ResourceTimelineView.prototype.dividerEls = null;

  ResourceTimelineView.prototype.dividerWidth = null;

  ResourceTimelineView.prototype.superHeaderText = null;

  ResourceTimelineView.prototype.isVGrouping = null;

  ResourceTimelineView.prototype.isHGrouping = null;

  ResourceTimelineView.prototype.groupSpecs = null;

  ResourceTimelineView.prototype.colSpecs = null;

  ResourceTimelineView.prototype.orderSpecs = null;

  ResourceTimelineView.prototype.tbodyHash = null;

  ResourceTimelineView.prototype.rowHierarchy = null;

  ResourceTimelineView.prototype.resourceRowHash = null;

  ResourceTimelineView.prototype.nestingCnt = 0;

  ResourceTimelineView.prototype.isNesting = null;

  ResourceTimelineView.prototype.eventRows = null;

  ResourceTimelineView.prototype.shownEventRows = null;

  ResourceTimelineView.prototype.resourceScrollJoiner = null;

  ResourceTimelineView.prototype.rowsNeedingHeightSync = null;

  ResourceTimelineView.prototype.rowCoordCache = null;

  function ResourceTimelineView() {
    ResourceTimelineView.__super__.constructor.apply(this, arguments);
    this.initResourceView();
    this.processResourceOptions();
    this.spreadsheet = new Spreadsheet(this);
    this.rowHierarchy = new RowParent(this);
    this.resourceRowHash = {};
  }

  ResourceTimelineView.prototype.processResourceOptions = function() {
    var allColSpecs, allOrderSpecs, colSpec, defaultLabelText, groupColSpecs, groupSpec, groupSpecs, hGroupField, isGroup, isHGrouping, isVGrouping, j, k, l, labelText, len, len1, len2, orderSpec, plainColSpecs, plainOrderSpecs, superHeaderText;
    allColSpecs = this.opt('resourceColumns') || [];
    labelText = this.opt('resourceLabelText');
    defaultLabelText = 'Resources';
    superHeaderText = null;
    if (!allColSpecs.length) {
      allColSpecs.push({
        labelText: labelText || defaultLabelText,
        text: this.getResourceTextFunc()
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
    var theme, timeBodyContainerEl;
    ResourceTimelineView.__super__.renderSkeleton.apply(this, arguments);
    theme = this.calendar.theme;
    this.spreadsheet.el = this.el.find('tbody .fc-resource-area');
    this.spreadsheet.headEl = this.el.find('thead .fc-resource-area');
    this.spreadsheet.renderSkeleton();
    this.segContainerEl.remove();
    this.segContainerEl = null;
    timeBodyContainerEl = $('<div class="fc-rows"> <table class="' + theme.getClass('tableGrid') + '"> <tbody/> </table> </div>').appendTo(this.timeBodyScroller.canvas.contentEl);
    this.timeBodyTbodyEl = timeBodyContainerEl.find('tbody');
    this.tbodyHash = {
      spreadsheet: this.spreadsheet.tbodyEl,
      event: this.timeBodyTbodyEl
    };
    this.resourceScrollJoiner = new ScrollJoiner('vertical', [this.spreadsheet.bodyScroller, this.timeBodyScroller]);
    return this.initDividerMoving();
  };

  ResourceTimelineView.prototype.renderSkeletonHtml = function() {
    var theme;
    theme = this.calendar.theme;
    return '<table class="' + theme.getClass('tableGrid') + '"> <thead class="fc-head"> <tr> <td class="fc-resource-area ' + theme.getClass('widgetHeader') + '"></td> <td class="fc-divider fc-col-resizer ' + theme.getClass('widgetHeader') + '"></td> <td class="fc-time-area ' + theme.getClass('widgetHeader') + '"></td> </tr> </thead> <tbody class="fc-body"> <tr> <td class="fc-resource-area ' + theme.getClass('widgetContent') + '"></td> <td class="fc-divider fc-col-resizer ' + theme.getClass('widgetHeader') + '"></td> <td class="fc-time-area ' + theme.getClass('widgetContent') + '"></td> </tr> </tbody> </table>';
  };

  ResourceTimelineView.prototype.initDividerMoving = function() {
    var ref;
    this.dividerEls = this.el.find('.fc-divider');
    this.dividerWidth = (ref = this.opt('resourceAreaWidth')) != null ? ref : this.spreadsheet.tableWidth;
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
          return _this.calendar.updateViewSize();
        };
      })(this),
      dragEnd: (function(_this) {
        return function() {
          return _this.dividerEls.removeClass('fc-active');
        };
      })(this)
    });
    return dragListener.startInteraction(ev);
  };

  ResourceTimelineView.prototype.getNaturalDividerWidth = function() {
    return this.el.find('.fc-resource-area').width();
  };

  ResourceTimelineView.prototype.positionDivider = function(w) {
    return this.el.find('.fc-resource-area').css('width', w);
  };

  ResourceTimelineView.prototype.updateSize = function(totalHeight, isAuto, isResize) {
    var bodyHeight, headHeight;
    if (this.rowsNeedingHeightSync) {
      this.syncRowHeights(this.rowsNeedingHeightSync);
      this.rowsNeedingHeightSync = null;
    } else {
      this.syncRowHeights();
    }
    headHeight = this.syncHeadHeights();
    if (isAuto) {
      bodyHeight = 'auto';
    } else {
      bodyHeight = totalHeight - headHeight - this.queryMiscHeight();
    }
    this.timeBodyScroller.setHeight(bodyHeight);
    this.spreadsheet.bodyScroller.setHeight(bodyHeight);
    this.spreadsheet.updateSize();
    ResourceTimelineView.__super__.updateSize.apply(this, arguments);
    return this.resourceScrollJoiner.update();
  };

  ResourceTimelineView.prototype.queryMiscHeight = function() {
    return this.el.outerHeight() - Math.max(this.spreadsheet.headScroller.el.outerHeight(), this.timeHeadScroller.el.outerHeight()) - Math.max(this.spreadsheet.bodyScroller.el.outerHeight(), this.timeBodyScroller.el.outerHeight());
  };

  ResourceTimelineView.prototype.syncHeadHeights = function() {
    var headHeight;
    this.spreadsheet.headHeight('auto');
    this.headHeight('auto');
    headHeight = Math.max(this.spreadsheet.headHeight(), this.headHeight());
    this.spreadsheet.headHeight(headHeight);
    this.headHeight(headHeight);
    return headHeight;
  };

  ResourceTimelineView.prototype.queryResourceScroll = function() {
    var el, elBottom, j, len, ref, rowObj, scroll, scrollerTop;
    scroll = {};
    scrollerTop = this.timeBodyScroller.scrollEl.offset().top;
    ref = this.getVisibleRows();
    for (j = 0, len = ref.length; j < len; j++) {
      rowObj = ref[j];
      if (rowObj.resource) {
        el = rowObj.getTr('event');
        elBottom = el.offset().top + el.outerHeight();
        if (elBottom > scrollerTop) {
          scroll.resourceId = rowObj.resource.id;
          scroll.bottom = elBottom - scrollerTop;
          break;
        }
      }
    }
    return scroll;
  };

  ResourceTimelineView.prototype.applyResourceScroll = function(scroll) {
    var el, elBottom, innerTop, row, scrollTop;
    if (scroll.resourceId) {
      row = this.getResourceRow(scroll.resourceId);
      if (row) {
        el = row.getTr('event');
        if (el) {
          innerTop = this.timeBodyScroller.canvas.el.offset().top;
          elBottom = el.offset().top + el.outerHeight();
          scrollTop = elBottom - scroll.bottom - innerTop;
          this.timeBodyScroller.setScrollTop(scrollTop);
          return this.spreadsheet.bodyScroller.setScrollTop(scrollTop);
        }
      }
    }
  };

  ResourceTimelineView.prototype.scrollToResource = function(resource) {
    var el, innerTop, row, scrollTop;
    row = this.getResourceRow(resource.id);
    if (row) {
      el = row.getTr('event');
      if (el) {
        innerTop = this.timeBodyScroller.canvas.el.offset().top;
        scrollTop = el.offset().top - innerTop;
        this.timeBodyScroller.setScrollTop(scrollTop);
        return this.spreadsheet.bodyScroller.setScrollTop(scrollTop);
      }
    }
  };

  ResourceTimelineView.prototype.prepareHits = function() {
    var row, trArray;
    ResourceTimelineView.__super__.prepareHits.apply(this, arguments);
    this.eventRows = this.getEventRows();
    this.shownEventRows = (function() {
      var j, len, ref, results;
      ref = this.eventRows;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        row = ref[j];
        if (row.get('isInDom')) {
          results.push(row);
        }
      }
      return results;
    }).call(this);
    trArray = (function() {
      var j, len, ref, results;
      ref = this.shownEventRows;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        row = ref[j];
        results.push(row.getTr('event')[0]);
      }
      return results;
    }).call(this);
    this.rowCoordCache = new CoordCache({
      els: trArray,
      isVertical: true
    });
    return this.rowCoordCache.build();
  };

  ResourceTimelineView.prototype.releaseHits = function() {
    ResourceTimelineView.__super__.releaseHits.apply(this, arguments);
    this.eventRows = null;
    this.shownEventRows = null;
    return this.rowCoordCache.clear();
  };

  ResourceTimelineView.prototype.queryHit = function(leftOffset, topOffset) {
    var rowIndex, simpleHit;
    simpleHit = ResourceTimelineView.__super__.queryHit.apply(this, arguments);
    if (simpleHit) {
      rowIndex = this.rowCoordCache.getVerticalIndex(topOffset);
      if (rowIndex != null) {
        return {
          resourceId: this.shownEventRows[rowIndex].resource.id,
          snap: simpleHit.snap,
          component: this,
          left: simpleHit.left,
          right: simpleHit.right,
          top: this.rowCoordCache.getTopOffset(rowIndex),
          bottom: this.rowCoordCache.getBottomOffset(rowIndex)
        };
      }
    }
  };

  ResourceTimelineView.prototype.getHitFootprint = function(hit) {
    var componentFootprint;
    componentFootprint = ResourceTimelineView.__super__.getHitFootprint.apply(this, arguments);
    return new ResourceComponentFootprint(componentFootprint.unzonedRange, componentFootprint.isAllDay, hit.resourceId);
  };

  ResourceTimelineView.prototype.getHitEl = function(hit) {
    return this.getSnapEl(hit.snap);
  };

  ResourceTimelineView.prototype.renderResources = function(resources) {
    var j, len, resource, results;
    results = [];
    for (j = 0, len = resources.length; j < len; j++) {
      resource = resources[j];
      results.push(this.renderResource(resource));
    }
    return results;
  };

  ResourceTimelineView.prototype.unrenderResources = function() {
    var id, j, len, ref, row;
    this.rowHierarchy.removeElement();
    this.rowHierarchy.removeChildren();
    ref = this.resourceRowHash;
    for (row = j = 0, len = ref.length; j < len; row = ++j) {
      id = ref[row];
      this.removeChild(row);
    }
    return this.resourceRowHash = {};
  };

  ResourceTimelineView.prototype.renderResource = function(resource) {
    var row;
    row = this.insertResource(resource);
    return row.renderSkeleton();
  };

  ResourceTimelineView.prototype.unrenderResource = function(resource) {
    var row;
    row = this.removeResource(resource);
    return row.removeFromParentAndDom();
  };

  ResourceTimelineView.prototype.executeEventRender = function(eventsPayload) {
    var eventDef, eventDefId, eventInstanceGroup, genericPayload, j, len, payloadsByResourceId, resourceEventsPayload, resourceId, resourceIds, row;
    payloadsByResourceId = {};
    genericPayload = {};
    for (eventDefId in eventsPayload) {
      eventInstanceGroup = eventsPayload[eventDefId];
      eventDef = eventInstanceGroup.getEventDef();
      resourceIds = eventDef.getResourceIds();
      if (resourceIds.length) {
        for (j = 0, len = resourceIds.length; j < len; j++) {
          resourceId = resourceIds[j];
          (payloadsByResourceId[resourceId] != null ? payloadsByResourceId[resourceId] : payloadsByResourceId[resourceId] = {})[eventDefId] = eventInstanceGroup;
        }
      } else if (eventDef.hasBgRendering()) {
        genericPayload[eventDefId] = eventInstanceGroup;
      }
    }
    this.eventRenderer.render(genericPayload);
    for (resourceId in payloadsByResourceId) {
      resourceEventsPayload = payloadsByResourceId[resourceId];
      row = this.getResourceRow(resourceId);
      if (row) {
        row.executeEventRender(resourceEventsPayload);
      }
    }
  };

  ResourceTimelineView.prototype.indiBizCnt = 0;

  ResourceTimelineView.prototype.isIndiBizRendered = false;

  ResourceTimelineView.prototype.isGenericBizRendered = false;

  ResourceTimelineView.prototype.genericBiz = null;

  ResourceTimelineView.prototype.renderBusinessHours = function(businessHourGenerator) {
    var j, len, ref, results, row;
    this.genericBiz = businessHourGenerator;
    this.isIndiBizRendered = false;
    this.isGenericBizRendered = false;
    if (this.indiBizCnt) {
      this.isIndiBizRendered = true;
      ref = this.getEventRows();
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        row = ref[j];
        results.push(row.renderBusinessHours(row.resource.businessHourGenerator || businessHourGenerator));
      }
      return results;
    } else {
      this.isGenericBizRendered = true;
      return this.businessHourRenderer.render(businessHourGenerator);
    }
  };

  ResourceTimelineView.prototype.updateIndiBiz = function() {
    if ((this.indiBizCnt && this.isGenericBizRendered) || (!this.indiBizCnt && this.isIndiBizRendered)) {
      this.unrenderBusinessHours();
      return this.renderBusinessHours(this.genericBiz);
    }
  };

  ResourceTimelineView.prototype.insertResource = function(resource, parentResourceRow) {
    var childResource, j, len, ref, row;
    row = new ResourceRow(this, resource);
    if (!parentResourceRow) {
      if (resource.parent) {
        parentResourceRow = this.getResourceRow(resource.parent.parentId);
      } else if (resource.parentId) {
        parentResourceRow = this.getResourceRow(resource.parentId);
      }
    }
    if (parentResourceRow) {
      this.insertRowAsChild(row, parentResourceRow);
    } else {
      this.insertRow(row);
    }
    this.addChild(row);
    this.resourceRowHash[resource.id] = row;
    if (resource.businessHourGenerator) {
      this.indiBizCnt++;
      if (this.isIndiBizRendered) {
        row.businessHourGenerator = resource.businessHourGenerator;
      }
      this.updateIndiBiz();
    }
    ref = resource.children;
    for (j = 0, len = ref.length; j < len; j++) {
      childResource = ref[j];
      this.insertResource(childResource, row);
    }
    return row;
  };

  ResourceTimelineView.prototype.removeResource = function(resource) {
    var row;
    row = this.resourceRowHash[resource.id];
    if (row) {
      delete this.resourceRowHash[resource.id];
      this.removeChild(row);
      row.removeFromParentAndDom();
      if (resource.businessHourGenerator) {
        this.indiBizCnt--;
        this.updateIndiBiz();
      }
    }
    return row;
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
      group.renderSkeleton();
    }
    return group;
  };

  ResourceTimelineView.prototype.descendantAdded = function(row) {
    var isNesting, wasNesting;
    wasNesting = this.isNesting;
    isNesting = Boolean(this.nestingCnt += row.depth ? 1 : 0);
    if (wasNesting !== isNesting) {
      this.el.toggleClass('fc-nested', isNesting).toggleClass('fc-flat', !isNesting);
      return this.isNesting = isNesting;
    }
  };

  ResourceTimelineView.prototype.descendantRemoved = function(row) {
    var isNesting, wasNesting;
    wasNesting = this.isNesting;
    isNesting = Boolean(this.nestingCnt -= row.depth ? 1 : 0);
    if (wasNesting !== isNesting) {
      this.el.toggleClass('fc-nested', isNesting).toggleClass('fc-flat', !isNesting);
      return this.isNesting = isNesting;
    }
  };

  ResourceTimelineView.prototype.descendantShown = function(row) {
    (this.rowsNeedingHeightSync || (this.rowsNeedingHeightSync = [])).push(row);
  };

  ResourceTimelineView.prototype.descendantHidden = function(row) {
    this.rowsNeedingHeightSync || (this.rowsNeedingHeightSync = []);
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
      h1 = this.spreadsheet.tbodyEl.height();
      h2 = this.timeBodyTbodyEl.height();
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
      if (row.get('isInDom')) {
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

  ResourceTimelineView.prototype.renderSelectionFootprint = function(componentFootprint) {
    var rowObj;
    if (componentFootprint.resourceId) {
      rowObj = this.getResourceRow(componentFootprint.resourceId);
      if (rowObj) {
        return rowObj.renderSelectionFootprint(componentFootprint);
      }
    } else {
      return ResourceTimelineView.__super__.renderSelectionFootprint.apply(this, arguments);
    }
  };

  ResourceTimelineView.prototype.renderEventResize = function(eventFootprints, seg, isTouch) {
    var eventFootprint, map, resourceEventFootprints, resourceId, results, rowObj;
    map = groupEventFootprintsByResourceId(eventFootprints);
    results = [];
    for (resourceId in map) {
      resourceEventFootprints = map[resourceId];
      rowObj = this.getResourceRow(resourceId);
      rowObj.helperRenderer.renderEventDraggingFootprints(resourceEventFootprints, seg, isTouch);
      results.push((function() {
        var j, len, results1;
        results1 = [];
        for (j = 0, len = resourceEventFootprints.length; j < len; j++) {
          eventFootprint = resourceEventFootprints[j];
          results1.push(rowObj.renderHighlight(eventFootprint.componentFootprint));
        }
        return results1;
      })());
    }
    return results;
  };

  ResourceTimelineView.prototype.unrenderEventResize = function() {
    var j, len, ref, results, rowObj;
    ref = this.getEventRows();
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      rowObj = ref[j];
      rowObj.helperRenderer.unrender();
      results.push(rowObj.unrenderHighlight());
    }
    return results;
  };

  ResourceTimelineView.prototype.renderDrag = function(eventFootprints, seg, isTouch) {
    var eventFootprint, j, len, map, resourceEventFootprints, resourceId, rowObj;
    map = groupEventFootprintsByResourceId(eventFootprints);
    if (seg) {
      for (resourceId in map) {
        resourceEventFootprints = map[resourceId];
        rowObj = this.getResourceRow(resourceId);
        rowObj.helperRenderer.renderEventDraggingFootprints(resourceEventFootprints, seg, isTouch);
      }
      return true;
    } else {
      for (resourceId in map) {
        resourceEventFootprints = map[resourceId];
        for (j = 0, len = resourceEventFootprints.length; j < len; j++) {
          eventFootprint = resourceEventFootprints[j];
          rowObj = this.getResourceRow(resourceId);
          rowObj.renderHighlight(eventFootprint.componentFootprint);
        }
      }
      return false;
    }
  };

  ResourceTimelineView.prototype.unrenderDrag = function() {
    var j, len, ref, results, rowObj;
    ref = this.getEventRows();
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      rowObj = ref[j];
      rowObj.helperRenderer.unrender();
      results.push(rowObj.unrenderHighlight());
    }
    return results;
  };

  return ResourceTimelineView;

})(TimelineView);

groupEventFootprintsByResourceId = function(eventFootprints) {
  var eventFootprint, j, len, map, name1;
  map = {};
  for (j = 0, len = eventFootprints.length; j < len; j++) {
    eventFootprint = eventFootprints[j];
    (map[name1 = eventFootprint.componentFootprint.resourceId] || (map[name1] = [])).push(eventFootprint);
  }
  return map;
};

FC.ResourceTimelineView = ResourceTimelineView;

FC.views.timeline.resourceClass = ResourceTimelineView;

Calendar.defaults.resourcesInitiallyExpanded = true;

ResourceTimeGrid = (function(superClass) {
  extend(ResourceTimeGrid, superClass);

  function ResourceTimeGrid() {
    return ResourceTimeGrid.__super__.constructor.apply(this, arguments);
  }

  ResourceTimeGrid.mixin(ResourceDayTableMixin);

  ResourceTimeGrid.prototype.isResourceFootprintsEnabled = true;

  ResourceTimeGrid.prototype.renderDates = function(dateProfile) {
    this.dateProfile = dateProfile;
    return this.renderSlats();
  };

  ResourceTimeGrid.prototype.renderResources = function(resources) {
    this.registerResources(resources);
    this.renderColumns();
    if (this.headContainerEl) {
      return this.processHeadResourceEls(this.headContainerEl);
    }
  };

  ResourceTimeGrid.prototype.getHitFootprint = function(hit) {
    var plainFootprint;
    plainFootprint = ResourceTimeGrid.__super__.getHitFootprint.apply(this, arguments);
    return new ResourceComponentFootprint(plainFootprint.unzonedRange, plainFootprint.isAllDay, this.getColResource(hit.col).id);
  };

  ResourceTimeGrid.prototype.componentFootprintToSegs = function(componentFootprint) {
    var copy, genericSegs, j, k, len, ref, resourceCnt, resourceIndex, resourceObj, resourceSegs, seg;
    resourceCnt = this.resourceCnt;
    genericSegs = this.sliceRangeByTimes(componentFootprint.unzonedRange);
    resourceSegs = [];
    for (j = 0, len = genericSegs.length; j < len; j++) {
      seg = genericSegs[j];
      for (resourceIndex = k = 0, ref = resourceCnt; k < ref; resourceIndex = k += 1) {
        resourceObj = this.flattenedResources[resourceIndex];
        if (!(componentFootprint instanceof ResourceComponentFootprint) || componentFootprint.resourceId === resourceObj.id) {
          copy = $.extend({}, seg);
          copy.resource = resourceObj;
          copy.col = this.indicesToCol(resourceIndex, seg.dayIndex);
          resourceSegs.push(copy);
        }
      }
    }
    return resourceSegs;
  };

  return ResourceTimeGrid;

})(FC.TimeGrid);

ResourceDayGrid = (function(superClass) {
  extend(ResourceDayGrid, superClass);

  function ResourceDayGrid() {
    return ResourceDayGrid.__super__.constructor.apply(this, arguments);
  }

  ResourceDayGrid.mixin(ResourceDayTableMixin);

  ResourceDayGrid.prototype.isResourceFootprintsEnabled = true;

  ResourceDayGrid.prototype.renderDates = function(dateProfile) {
    return this.dateProfile = dateProfile;
  };

  ResourceDayGrid.prototype.renderResources = function(resources) {
    this.registerResources(resources);
    this.renderGrid();
    if (this.headContainerEl) {
      return this.processHeadResourceEls(this.headContainerEl);
    }
  };

  ResourceDayGrid.prototype.getHitFootprint = function(hit) {
    var plainFootprint;
    plainFootprint = ResourceDayGrid.__super__.getHitFootprint.apply(this, arguments);
    return new ResourceComponentFootprint(plainFootprint.unzonedRange, plainFootprint.isAllDay, this.getColResource(hit.col).id);
  };

  ResourceDayGrid.prototype.componentFootprintToSegs = function(componentFootprint) {
    var copy, genericSegs, j, k, len, ref, resourceCnt, resourceIndex, resourceObj, resourceSegs, seg;
    resourceCnt = this.resourceCnt;
    genericSegs = this.datesAboveResources ? this.sliceRangeByDay(componentFootprint.unzonedRange) : this.sliceRangeByRow(componentFootprint.unzonedRange);
    resourceSegs = [];
    for (j = 0, len = genericSegs.length; j < len; j++) {
      seg = genericSegs[j];
      for (resourceIndex = k = 0, ref = resourceCnt; k < ref; resourceIndex = k += 1) {
        resourceObj = this.flattenedResources[resourceIndex];
        if (!(componentFootprint instanceof ResourceComponentFootprint) || componentFootprint.resourceId === resourceObj.id) {
          copy = $.extend({}, seg);
          copy.resource = resourceObj;
          if (this.isRTL) {
            copy.leftCol = this.indicesToCol(resourceIndex, seg.lastRowDayIndex);
            copy.rightCol = this.indicesToCol(resourceIndex, seg.firstRowDayIndex);
          } else {
            copy.leftCol = this.indicesToCol(resourceIndex, seg.firstRowDayIndex);
            copy.rightCol = this.indicesToCol(resourceIndex, seg.lastRowDayIndex);
          }
          resourceSegs.push(copy);
        }
      }
    }
    return resourceSegs;
  };

  return ResourceDayGrid;

})(FC.DayGrid);

ResourceAgendaView = (function(superClass) {
  extend(ResourceAgendaView, superClass);

  ResourceAgendaView.mixin(ResourceViewMixin);

  ResourceAgendaView.prototype.timeGridClass = ResourceTimeGrid;

  ResourceAgendaView.prototype.dayGridClass = ResourceDayGrid;

  function ResourceAgendaView() {
    ResourceAgendaView.__super__.constructor.apply(this, arguments);
    this.initResourceView();
  }

  return ResourceAgendaView;

})(FC.AgendaView);

FC.ResourceAgendaView = ResourceAgendaView;

FC.views.agenda.queryResourceClass = function(viewSpec) {
  var ref;
  if ((ref = viewSpec.options.groupByResource || viewSpec.options.groupByDateAndResource) != null ? ref : viewSpec.duration && viewSpec.duration.as('days') === 1) {
    return ResourceAgendaView;
  }
};

ResourceBasicView = (function(superClass) {
  extend(ResourceBasicView, superClass);

  ResourceBasicView.mixin(ResourceViewMixin);

  ResourceBasicView.prototype.dayGridClass = ResourceDayGrid;

  function ResourceBasicView() {
    ResourceBasicView.__super__.constructor.apply(this, arguments);
    this.initResourceView();
  }

  return ResourceBasicView;

})(FC.BasicView);

FC.ResourceBasicView = ResourceBasicView;

ResourceMonthView = (function(superClass) {
  extend(ResourceMonthView, superClass);

  ResourceMonthView.mixin(ResourceViewMixin);

  ResourceMonthView.prototype.dayGridClass = ResourceDayGrid;

  function ResourceMonthView() {
    ResourceMonthView.__super__.constructor.apply(this, arguments);
    this.initResourceView();
  }

  return ResourceMonthView;

})(FC.MonthView);

FC.ResourceMonthView = ResourceMonthView;

FC.views.basic.queryResourceClass = function(viewSpec) {
  var ref;
  if ((ref = viewSpec.options.groupByResource || viewSpec.options.groupByDateAndResource) != null ? ref : viewSpec.duration && viewSpec.duration.as('days') === 1) {
    return ResourceBasicView;
  }
};

FC.views.month.queryResourceClass = function(viewSpec) {
  if (viewSpec.options.groupByResource || viewSpec.options.groupByDateAndResource) {
    return ResourceMonthView;
  }
};

RELEASE_DATE = '2017-10-23';

UPGRADE_WINDOW = {
  years: 1,
  weeks: 1
};

LICENSE_INFO_URL = 'http://fullcalendar.io/scheduler/license/';

PRESET_LICENSE_KEYS = ['GPL-My-Project-Is-Open-Source', 'CC-Attribution-NonCommercial-NoDerivatives'];

processLicenseKey = function(key, containerEl) {
  if (!isImmuneUrl(window.location.href) && !isValidKey(key)) {
    if (!detectWarningInContainer(containerEl)) {
      return renderingWarningInContainer('Please use a valid license key. <a href="' + LICENSE_INFO_URL + '">More Info</a>', containerEl);
    }
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

detectWarningInContainer = function(containerEl) {
  return containerEl.find('.fc-license-message').length >= 1;
};

});
