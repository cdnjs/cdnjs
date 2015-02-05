/**
 * This module is an extension to jQuery ui selectable, which scrolls when you try to select
 * outside the container, and the scrollables are not fitting it originally.
 *
 * Created by László Károlyi <http://linkedin.com/in/karolyi>
 * with the GPLv3 License: http://opensource.org/licenses/GPL-3.0
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
(function ($) {
  $.widget('ui.selectableScroll', $.ui.selectable, {
    options: {
      scrollElement: null, // If an element is passed in here, use it for scrolling instead of widget's element
      scrollSnapX: 5, // When the selection is that pixels near to the top/bottom edges, start to scroll
      scrollSnapY: 5, // When the selection is that pixels near to the side edges, start to scroll
      scrollAmount: 25, // In pixels
      scrollIntervalTime: 100 // In milliseconds
    },

    /**
     * This is a slightly modified version of the original _create function, we just add the element's relative positions too
     * @return {null} no return value
     */
    _create: function () {
      this.element.addClass("ui-selectable");
      this.dragged = false;
      this.helperClasses = ['no-top', 'no-right', 'no-bottom', 'no-left'];
      this.scrollElement = this.options.scrollElement || this.element;
      this.refresh();
      this._mouseInit();
      this.helper = $("<div class='ui-selectable-helper'></div>");
    },

    // Cache selectee children based on filter
    refresh: function() {
      var elementOffset = this.scrollElement.offset();
      var scrollLeft = this.scrollElement.prop('scrollLeft');
      var scrollTop = this.scrollElement.prop('scrollTop');
      this.selectees = $(this.options.filter, this.scrollElement[0]);
      this.selectees.addClass('ui-selectee');
      this.selectees.each(function() {
        var $element = $(this),
          pos = $element.offset();
        $.data(this, 'selectable-item', {
          element: this,
          $element: $element,
          left: pos.left,
          top: pos.top,
          right: pos.left + $element.outerWidth(),
          bottom: pos.top + $element.outerHeight(),
          relative: { // Relative positions according to the element's 0.0
            left: pos.left - elementOffset.left + scrollLeft,
            top: pos.top - elementOffset.top + scrollTop,
            right: pos.left - elementOffset.left + scrollLeft + $element.outerWidth(),
            bottom: pos.top - elementOffset.top + scrollTop + $element.outerHeight()
          },
          startselected: false,
          selected: $element.hasClass('ui-selected'),
          selecting: $element.hasClass('ui-selecting'),
          unselecting: $element.hasClass('ui-unselecting')
        });
      });
    },

    /**
     * By starting dragging, calculate the element's current scroll states, relative to the elements 0.0 offset
     * @param  {object} event the mousedown event
     * @return {boolean}       The parent's _mouseStart return value
     */
    _mouseStart: function (event) {
      var retValue = $.ui.selectable.prototype._mouseStart.call(this, event);
      this.lastDragEvent = null;
      this.scrollInfo = {
        elementOffset: this.scrollElement.offset(), // The element's 0.0 offset related to the document element
        scrollHeight: this.scrollElement.prop('scrollHeight'), // The maximum scrollable height (visible height + scrollTop)
        scrollWidth: this.scrollElement.prop('scrollWidth'), // The maximum scrollable height (visible width + scrollLeft)
        elementHeight: this.scrollElement.height(), // The visible height
        elementWidth: this.scrollElement.width() // The visible width
      };
      this.scrollInfo.dragStartXPos = event.pageX - this.scrollInfo.elementOffset.left + this.scrollElement.prop('scrollLeft'); // Relative to element's 0
      this.scrollInfo.dragStartYPos = event.pageY - this.scrollInfo.elementOffset.top + this.scrollElement.prop('scrollTop'); // Relative to element's 0
      this.scrollIntervalId = null;
      return retValue;
    },

    /**
     * Calculate/redraw the helper lasso, keep the helper within the scrolled element
     * @param  {object} options The object containing the relative positions of the selected rectangle
     * @return {null}         no return value
     */
    _updateHelper: function (options) {
      var x1, y1, x2, y2; // Absolute positions for the lasso helper
      var lassoClassesArray = [];
      if (options.x1 - options.scrollLeft < 0) {
        lassoClassesArray.push('no-left');
        x1 = this.scrollInfo.elementOffset.left;
      } else {
        x1 = this.scrollInfo.elementOffset.left + options.x1 - options.scrollLeft;
      }
      if (options.y1 - options.scrollTop < 0) {
        lassoClassesArray.push('no-top');
        y1 = this.scrollInfo.elementOffset.top;
      } else {
        y1 = this.scrollInfo.elementOffset.top + options.y1 - options.scrollTop;
      }
      if (options.x2 - options.scrollLeft > this.scrollInfo.elementWidth) {
        lassoClassesArray.push('no-right');
        x2 = this.scrollInfo.elementOffset.left + this.scrollInfo.elementWidth;
      } else {
        x2 = this.scrollInfo.elementOffset.left + options.x2 - options.scrollLeft;
      }
      if (options.y2 - options.scrollTop > this.scrollInfo.elementHeight) {
        lassoClassesArray.push('no-bottom');
        y2 = this.scrollInfo.elementOffset.top + this.scrollInfo.elementHeight;
      } else {
        y2 = this.scrollInfo.elementOffset.top + options.y2 - options.scrollTop;
      }
      for (var counter = 0; counter < this.helperClasses.length; counter++) {
        var className = this.helperClasses[counter];
        if ($.inArray(className, lassoClassesArray) !== -1) {
          this.helper.addClass(className);
        } else {
          this.helper.removeClass(className);
        }
      }
      this.helper.css({
        left: x1,
        top: y1,
        width: x2 - x1,
        height: y2 - y1
      });
    },

    /**
     * If the mouse is near to the edges of the element's area, scroll
     * @return {object}         The new scrollLeft and scrollTop values, and a boolean if the element should keep scrolling
     */
    _scrollIfNeeded: function (options) {
      var scrollLeft = this.scrollElement.prop('scrollLeft');
      var scrollTop = this.scrollElement.prop('scrollTop');
      var keepScrolling = false;
      // Scroll if close to edges or over them
      if (this.lastDragEvent.pageX - this.scrollInfo.elementOffset.left < this.options.scrollSnapX && scrollLeft > 0) {
        scrollLeft = scrollLeft < this.options.scrollAmount ? 0 : scrollLeft - this.options.scrollAmount;
        this.scrollElement.prop('scrollLeft', scrollLeft);
        keepScrolling = true;
      }
      if (this.lastDragEvent.pageY - this.scrollInfo.elementOffset.top < this.options.scrollSnapY && scrollTop > 0) {
        scrollTop = scrollTop < this.options.scrollAmount ? 0 : scrollTop - this.options.scrollAmount;
        this.scrollElement.prop('scrollTop', scrollTop);
        keepScrolling = true;
      }
      if (this.lastDragEvent.pageX - this.scrollInfo.elementOffset.left > this.scrollInfo.elementWidth - this.options.scrollSnapX && this.scrollInfo.scrollWidth > scrollLeft + this.scrollInfo.elementWidth) {
        scrollLeft = scrollLeft + this.options.scrollAmount > this.scrollInfo.scrollWidth - this.scrollInfo.elementWidth ? this.scrollInfo.scrollWidth - this.scrollInfo.elementWidth : scrollLeft + this.options.scrollAmount;
        this.scrollElement.prop('scrollLeft', scrollLeft);
        keepScrolling = true;
      }
      if (this.lastDragEvent.pageY - this.scrollInfo.elementOffset.top > this.scrollInfo.elementHeight - this.options.scrollSnapY && this.scrollInfo.scrollHeight > scrollLeft + this.scrollInfo.elementHeight) {
        scrollTop = scrollTop + this.options.scrollAmount > this.scrollInfo.scrollHeight - this.scrollInfo.elementHeight ? this.scrollInfo.scrollHeight - this.scrollInfo.elementHeight : scrollTop + this.options.scrollAmount;
        this.scrollElement.prop('scrollTop', scrollTop);
        keepScrolling = true;
      }
      return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        keepScrolling: keepScrolling
      };
    },

    /**
     * Calculate a relative position to the element's 0.0 offset, from the original drag event's coordinates
     * @param  {object} options The absolute X and Y positions
     * @return {object}         The relative X and Y positions
     */
    _calcRelativePosition: function (options) {
      var relXPos = options.x - this.scrollInfo.elementOffset.left + options.scrollLeft;
      var relYPos = options.y - this.scrollInfo.elementOffset.top + options.scrollTop;
      return {
        x: relXPos,
        y: relYPos
      };
    },

    /**
     * Calculate relative area positions to offset element
     * @param  {object} options The relative X and Y positions to the 0.0 of the element
     * @return {object}         An object containing the relative area coordinates
     */
    _calcRelativeArea: function (options) {
      var relX1 = options.xPos < this.scrollInfo.dragStartXPos ? options.xPos : this.scrollInfo.dragStartXPos;
      var relY1 = options.yPos < this.scrollInfo.dragStartYPos ? options.yPos : this.scrollInfo.dragStartYPos;
      var relX2 = options.xPos > this.scrollInfo.dragStartXPos ? options.xPos : this.scrollInfo.dragStartXPos;
      var relY2 = options.yPos > this.scrollInfo.dragStartYPos ? options.yPos : this.scrollInfo.dragStartYPos;
      return {
        x1: relX1,
        y1: relY1,
        x2: relX2,
        y2: relY2
      };
    },

    /**
     * Update the selected elements
     * @param  {object} options The return value of _calcRelativeArea()
     * @return {null}         No return value
     */
    _updateSelectees: function (options) {
      var that = this;
      this.selectees.each(function () {
        var selectee = $.data(this, "selectable-item"),
        hit = false;

        //prevent helper from being selected if appendTo: selectable
        if (!selectee || selectee.element === that.element[0]) {
          return;
        }

        if (that.options.tolerance === "touch") {
          hit = (!(selectee.relative.left > options.x2 || selectee.relative.right < options.x1 || selectee.relative.top > options.y2 || selectee.relative.bottom < options.y1));
        } else if (that.options.tolerance === "fit") {
          hit = (selectee.relative.left > options.x1 && selectee.relative.right < options.x2 && selectee.relative.top > options.y1 && selectee.relative.bottom < options.y2);
        }

        if (hit) {
          // SELECT
          if (selectee.selected) {
            selectee.$element.removeClass("ui-selected");
            selectee.selected = false;
          }
          if (selectee.unselecting) {
            selectee.$element.removeClass("ui-unselecting");
            selectee.unselecting = false;
          }
          if (!selectee.selecting) {
            selectee.$element.addClass("ui-selecting");
            selectee.selecting = true;
            // selectable SELECTING callback
            that._trigger("selecting", that.lastDragEvent, {
              selecting: selectee.element
            });
          }
        } else {
          // UNSELECT
          if (selectee.selecting) {
            if ((that.lastDragEvent.metaKey || that.lastDragEvent.ctrlKey) && selectee.startselected) {
              selectee.$element.removeClass("ui-selecting");
              selectee.selecting = false;
              selectee.$element.addClass("ui-selected");
              selectee.selected = true;
            } else {
              selectee.$element.removeClass("ui-selecting");
              selectee.selecting = false;
              if (selectee.startselected) {
                selectee.$element.addClass("ui-unselecting");
                selectee.unselecting = true;
              }
              // selectable UNSELECTING callback
              that._trigger("unselecting", that.lastDragEvent, {
                unselecting: selectee.element
              });
            }
          }
          if (selectee.selected) {
            if (!that.lastDragEvent.metaKey && !that.lastDragEvent.ctrlKey && !selectee.startselected) {
              selectee.$element.removeClass("ui-selected");
              selectee.selected = false;

              selectee.$element.addClass("ui-unselecting");
              selectee.unselecting = true;
              // selectable UNSELECTING callback
              that._trigger("unselecting", that.lastDragEvent, {
                unselecting: selectee.element
              });
            }
          }
        }
      });
    },

    /**
     * The original _mouseDrag function overvritten by our one
     * @param  {object} event The original mousemove event
     * @return {boolean}       Returning false, as the parent returns too
     */
    _mouseDrag: function (event) {
      this.dragged = true;
      if (this.options.disabled) {
        return;
      }
      this.lastDragEvent = event;

      var scrollObj = this._scrollIfNeeded();

      this._updateIntervals({
        keepScrolling: scrollObj.keepScrolling
      });
      this._updateUi({
        doUpdateHelper: true
      });

      return false;
    },

    /**
     * Do the actual calculating/updating of the positions/elements
     * @param  {object} options Options containing if the function should update the helper lasso
     * @return {null}         No return value
     */
    _updateUi: function (options) {
      var scrollObj = this._scrollIfNeeded({
        pageX: this.lastDragEvent.pageX,
        pageY: this.lastDragEvent.pageY
      });
      var relativePos = this._calcRelativePosition({
        x: this.lastDragEvent.pageX,
        y: this.lastDragEvent.pageY,
        scrollLeft: scrollObj.scrollLeft,
        scrollTop: scrollObj.scrollTop
      });
      var relativeArea = this._calcRelativeArea({
        xPos: relativePos.x,
        yPos: relativePos.y
      });
      if (options.doUpdateHelper) {
        this._updateHelper({
          scrollLeft: scrollObj.scrollLeft,
          scrollTop: scrollObj.scrollTop,
          x1: relativeArea.x1,
          y1: relativeArea.y1,
          x2: relativeArea.x2,
          y2: relativeArea.y2
        });
      }
      this._updateSelectees({
        x1: relativeArea.x1,
        y1: relativeArea.y1,
        x2: relativeArea.x2,
        y2: relativeArea.y2
      });
    },

    /**
     * Start the automatic scrolling if needed
     * @param  {object} options Options containing if the function should start the interval
     * @return {null}         No return value
     */
    _updateIntervals: function (options) {
      var that = this;
      if (options.keepScrolling && !this.scrollIntervalId) {
        this.scrollIntervalId = setInterval(function () {
          that._updateUi({
            doUpdateHelper: false
          });
        }, this.options.scrollIntervalTime);
      }
      if (!options.keepScrolling && this.scrollIntervalId)
        this._clearIntervals();
    },

    /**
     * Clear the autoscroll interval
     * @return {null} No return value
     */
    _clearIntervals: function () {
      // Stop scrolling
      if (this.scrollIntervalId)
        clearInterval(this.scrollIntervalId);
      this.scrollIntervalId = null;
    },

    /**
     * The original _mouseStop event extended with the interval clearer
     * @param  {object} event The original mousestop event
     * @return {boolean}       The parent's return value
     */
    _mouseStop: function (event) {
      this._clearIntervals();
      var retValue = $.ui.selectable.prototype._mouseStop.call(this, event);
      return retValue;
    }
  });
})(jQuery);