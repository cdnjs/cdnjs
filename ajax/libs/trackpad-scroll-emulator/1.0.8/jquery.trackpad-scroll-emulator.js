/*!
 * TrackpadScrollEmulator
 * Version: 1.0.8
 * Author: Jonathan Nicol @f6design
 * https://github.com/jnicol/trackpad-scroll-emulator
 */
;(function($) {
  var pluginName = 'TrackpadScrollEmulator';

  function Plugin(element, options) {
    var el = element;
    var $el = $(element);
    var $scrollContentEl;
    var $contentEl = $el.find('.tse-content:first');
    var $scrollbarEl;
    var $dragHandleEl;
    var dragOffset;
    var flashTimeout;
    var pageJumpMultp = 7/8;
    var scrollDirection = 'vert';
    var scrollOffsetAttr = 'scrollTop';
    var sizeAttr = 'height';
    var offsetAttr = 'top';

    options = $.extend({}, $.fn[pluginName].defaults, options);

    /**
     * Initialize plugin
     */
    function init() {
      if ($el.hasClass('horizontal')){
        scrollDirection = 'horiz';
        scrollOffsetAttr = 'scrollLeft';
        sizeAttr = 'width';
        offsetAttr = 'left';
      }

      $el.prepend('<div class="tse-scrollbar"><div class="drag-handle"></div></div>');
      $scrollbarEl = $el.find('.tse-scrollbar:first');
      $dragHandleEl = $el.find('.drag-handle:first');

      if (options.wrapContent) {
        $contentEl.wrap('<div class="tse-scroll-content" />');
      }
      $scrollContentEl = $el.find('.tse-scroll-content:first');

      resizeScrollContent();

      if (options.autoHide) {
        $el.on('mouseenter', flashScrollbar);
      }

      $dragHandleEl.on('mousedown', startDrag);
      $scrollbarEl.on('mousedown', jumpScroll);
      $scrollContentEl.on('scroll', onScrolled);

      resizeScrollbar();

      $(window).on('resize', function() {
        recalculate();
      });

      if (!options.autoHide) {
        showScrollbar();
      }
    }

    /**
     * Start scrollbar handle drag
     */
    function startDrag(e) {
      // Preventing the event's default action stops text being
      // selectable during the drag.
      e.preventDefault();

      // Measure how far the user's mouse is from the top of the scrollbar drag handle.
      var eventOffset = e.pageY;
      if (scrollDirection === 'horiz') {
        eventOffset = e.pageX;
      }
      dragOffset = eventOffset - $dragHandleEl.offset()[offsetAttr];

      $(document).on('mousemove', drag);
      $(document).on('mouseup', endDrag);
    }

    /**
     * Drag scrollbar handle
     */
    function drag(e) {
      e.preventDefault();

      // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).
      var eventOffset = e.pageY;
      if (scrollDirection === 'horiz') {
        eventOffset = e.pageX;
      }
      var dragPos = eventOffset - $scrollbarEl.offset()[offsetAttr] - dragOffset;
      // Convert the mouse position into a percentage of the scrollbar height/width.
      var dragPerc = dragPos / $scrollbarEl[sizeAttr]();
      // Scroll the content by the same percentage.
      var scrollPos = dragPerc * $contentEl[sizeAttr]();

      $scrollContentEl[scrollOffsetAttr](scrollPos);
    }

    /**
     * End scroll handle drag
     */
    function endDrag() {
      $(document).off('mousemove', drag);
      $(document).off('mouseup', endDrag);
    }

    /**
     * Scroll in the same manner as the PAGE UP/DOWN keys
     */
    function jumpScroll(e) {
      // If the drag handle element was pressed, don't do anything here.
      if (e.target === $dragHandleEl[0]) {
        return;
      }

      // The content will scroll by 7/8 of a page.
      var jumpAmt = pageJumpMultp * $scrollContentEl[sizeAttr]();

      // Calculate where along the scrollbar the user clicked.
      var eventOffset = (scrollDirection === 'vert') ? e.originalEvent.layerY : e.originalEvent.layerX;

      // Get the position of the top (or left) of the drag handle.
      var dragHandleOffset = $dragHandleEl.position()[offsetAttr];

      // Determine which direction to scroll.
      var scrollPos = (eventOffset < dragHandleOffset) ? $scrollContentEl[scrollOffsetAttr]() - jumpAmt : $scrollContentEl[scrollOffsetAttr]() + jumpAmt;

      $scrollContentEl[scrollOffsetAttr](scrollPos);
    }

    /**
     * Scroll callback
     */
    function onScrolled(e) {
      flashScrollbar();
    }

    /**
     * Resize scrollbar
     */
    function resizeScrollbar() {
      var contentSize = sizeAttr === 'height' ? $contentEl.outerHeight() : $contentEl.outerWidth();
      var scrollOffset = $scrollContentEl[scrollOffsetAttr](); // Either scrollTop() or scrollLeft().
      var scrollbarSize = $scrollbarEl[sizeAttr]();
      var scrollbarRatio = scrollbarSize / contentSize;

      // Calculate new height/position of drag handle.
      // Offset of 2px allows for a small top/bottom or left/right margin around handle.
      var handleOffset = Math.round(scrollbarRatio * scrollOffset) + 2;
      var handleSize = Math.floor(scrollbarRatio * (scrollbarSize - 2)) - 2;

      if (scrollbarSize < contentSize) {
        if (scrollDirection === 'vert'){
          $dragHandleEl.css({'top': handleOffset, 'height': handleSize});
        } else {
          $dragHandleEl.css({'left': handleOffset, 'width': handleSize});
        }
        $scrollbarEl.show();
      } else {
         $scrollbarEl.hide();
      }
    }

    /**
     * Flash scrollbar visibility
     */
    function flashScrollbar() {
      resizeScrollbar();
      showScrollbar();
    }

    /**
     * Show scrollbar
     */
    function showScrollbar() {
        $dragHandleEl.addClass('visible');

        if (!options.autoHide) {
          return;
        }
        if(typeof flashTimeout === 'number') {
          window.clearTimeout(flashTimeout);
        }
        flashTimeout = window.setTimeout(function() {
            hideScrollbar();
        }, 1000);
    }

    /**
     * Hide Scrollbar
     */
    function hideScrollbar() {
        $dragHandleEl.removeClass('visible');
        if(typeof flashTimeout === 'number') {
          window.clearTimeout(flashTimeout);
        }
    }

    /**
     * Resize content element
     */
    function resizeScrollContent() {
      if (scrollDirection === 'vert'){
        $scrollContentEl.width($el.width()+scrollbarWidth());
        $scrollContentEl.height($el.height());
      } else {
        $scrollContentEl.width($el.width());
        $scrollContentEl.height($el.height()+scrollbarWidth());
        $contentEl.height($el.height());
      }
    }

    /**
     * Calculate scrollbar width
     *
     * Original function by Jonathan Sharp:
     * http://jdsharp.us/jQuery/minute/calculate-scrollbar-width.php
     * Updated to work in Chrome v25.
     */
    function scrollbarWidth() {
      // Append a temporary scrolling element to the DOM, then measure
      // the difference between between its outer and inner elements.
      var tempEl = $('<div class="scrollbar-width-tester" style="width:50px;height:50px;overflow-y:scroll;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
      $('body').append(tempEl);
      var width = $(tempEl).innerWidth();
      var widthMinusScrollbars = $('div', tempEl).innerWidth();
      tempEl.remove();
      // On OS X if the scrollbar is set to auto hide it will have zero width. On webkit we can still
      // hide it using ::-webkit-scrollbar { width:0; height:0; } but there is no moz equivalent. So we're
      // forced to sniff Firefox and return a hard-coded scrollbar width. I know, I know...
      if (width === widthMinusScrollbars && navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        return 17;
      }
      return (width - widthMinusScrollbars);
    }

    /**
     * Recalculate scrollbar
     */
    function recalculate() {
      resizeScrollContent();
      resizeScrollbar();
    }

    /**
     * Get/Set plugin option.
     */
    function option (key, val) {
      if (val) {
        options[key] = val;
      } else {
        return options[key];
      }
    }

    /**
     * Destroy plugin.
     */
    function destroy() {
      // Restore the element to its original state.
      $contentEl.insertBefore($scrollbarEl);
      $scrollbarEl.remove();
      $scrollContentEl.remove();
      $contentEl.css({'height': $el.height()+'px', 'overflow-y': 'scroll'});

      hook('onDestroy');
      $el.removeData('plugin_' + pluginName);
    }

    /**
     * Plugin callback hook.
     */
    function hook(hookName) {
      if (options[hookName] !== undefined) {
        options[hookName].call(el);
      }
    }

    init();

    return {
      option: option,
      destroy: destroy,
      recalculate: recalculate
    };
  }

  $.fn[pluginName] = function(options) {
    if (typeof arguments[0] === 'string') {
      var methodName = arguments[0];
      var args = Array.prototype.slice.call(arguments, 1);
      var returnVal;
      this.each(function() {
        if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
          returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
        } else {
          throw new Error('Method ' +  methodName + ' does not exist on jQuery.' + pluginName);
        }
      });
      if (returnVal !== undefined){
        return returnVal;
      } else {
        return this;
      }
    } else if (typeof options === "object" || !options) {
      return this.each(function() {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
        }
      });
    }
  };

  $.fn[pluginName].defaults = {
    onInit: function() {},
    onDestroy: function() {},
    wrapContent: true,
    autoHide: true
  };

})(jQuery);