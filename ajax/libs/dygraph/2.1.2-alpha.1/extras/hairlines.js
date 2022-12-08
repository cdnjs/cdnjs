"use strict";

/**
 * @license
 * Copyright 2013 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licenced: https://opensource.org/licenses/MIT
 *
 * Note: This plugin requires jQuery and jQuery UI Draggable.
 *
 * See high-level documentation at ../../docs/hairlines-annotations.pdf
 */

/*global Dygraph:false */

Dygraph.Plugins.Hairlines = function () {
  "use strict";

  /**
   * @typedef {
   *   xval:  number,      // x-value (i.e. millis or a raw number)
   *   interpolated: bool,  // alternative is to snap to closest
   *   lineDiv: !Element    // vertical hairline div
   *   infoDiv: !Element    // div containing info about the nearest points
   *   selected: boolean    // whether this hairline is selected
   * } Hairline
   */

  // We have to wait a few ms after clicks to give the user a chance to
  // double-click to unzoom. This sets that delay period.
  var CLICK_DELAY_MS = 300;
  var hairlines = function hairlines(opt_options) {
    /* @type {!Array.<!Hairline>} */
    this.hairlines_ = [];

    // Used to detect resizes (which require the divs to be repositioned).
    this.lastWidth_ = -1;
    this.lastHeight = -1;
    this.dygraph_ = null;
    this.addTimer_ = null;
    opt_options = opt_options || {};
    this.divFiller_ = opt_options['divFiller'] || null;
  };
  hairlines.prototype.toString = function () {
    return "Hairlines Plugin";
  };
  hairlines.prototype.activate = function (g) {
    this.dygraph_ = g;
    this.hairlines_ = [];
    return {
      didDrawChart: this.didDrawChart,
      click: this.click,
      dblclick: this.dblclick,
      dataDidUpdate: this.dataDidUpdate
    };
  };
  hairlines.prototype.detachLabels = function () {
    for (var i = 0; i < this.hairlines_.length; i++) {
      var h = this.hairlines_[i];
      $(h.lineDiv).remove();
      $(h.infoDiv).remove();
      this.hairlines_[i] = null;
    }
    this.hairlines_ = [];
  };
  hairlines.prototype.hairlineWasDragged = function (h, event, ui) {
    var area = this.dygraph_.getArea();
    var oldXVal = h.xval;
    h.xval = this.dygraph_.toDataXCoord(ui.position.left);
    this.moveHairlineToTop(h);
    this.updateHairlineDivPositions();
    this.updateHairlineInfo();
    this.updateHairlineStyles();
    $(this).triggerHandler('hairlineMoved', {
      oldXVal: oldXVal,
      newXVal: h.xval
    });
    $(this).triggerHandler('hairlinesChanged', {});
  };

  // This creates the hairline object and returns it.
  // It does not position it and does not attach it to the chart.
  hairlines.prototype.createHairline = function (props) {
    var h;
    var self = this;
    var $lineContainerDiv = $('<div/>').css({
      'width': '6px',
      'margin-left': '-3px',
      'position': 'absolute',
      'z-index': '10'
    }).addClass('dygraph-hairline');
    var $lineDiv = $('<div/>').css({
      'width': '1px',
      'position': 'relative',
      'left': '3px',
      'background': 'black',
      'height': '100%'
    });
    $lineDiv.appendTo($lineContainerDiv);
    var $infoDiv = $('#hairline-template').clone().removeAttr('id').css({
      'position': 'absolute'
    }).show();

    // Surely there's a more jQuery-ish way to do this!
    $([$infoDiv.get(0), $lineContainerDiv.get(0)]).draggable({
      'axis': 'x',
      'drag': function drag(event, ui) {
        self.hairlineWasDragged(h, event, ui);
      }
      // TODO(danvk): set cursor here
    });

    h = $.extend({
      interpolated: true,
      selected: false,
      lineDiv: $lineContainerDiv.get(0),
      infoDiv: $infoDiv.get(0)
    }, props);
    var that = this;
    $infoDiv.on('click', '.hairline-kill-button', function (e) {
      that.removeHairline(h);
      $(that).triggerHandler('hairlineDeleted', {
        xval: h.xval
      });
      $(that).triggerHandler('hairlinesChanged', {});
      e.stopPropagation(); // don't want .click() to trigger, below.
    }).on('click', function () {
      that.moveHairlineToTop(h);
    });
    return h;
  };

  // Moves a hairline's divs to the top of the z-ordering.
  hairlines.prototype.moveHairlineToTop = function (h) {
    var div = this.dygraph_.graphDiv;
    $(h.infoDiv).appendTo(div);
    $(h.lineDiv).appendTo(div);
    var idx = this.hairlines_.indexOf(h);
    this.hairlines_.splice(idx, 1);
    this.hairlines_.push(h);
  };

  // Positions existing hairline divs.
  hairlines.prototype.updateHairlineDivPositions = function () {
    var g = this.dygraph_;
    var layout = this.dygraph_.getArea();
    var chartLeft = layout.x,
      chartRight = layout.x + layout.w;
    var div = this.dygraph_.graphDiv;
    var pos = Dygraph.findPos(div);
    var box = [layout.x + pos.x, layout.y + pos.y];
    box.push(box[0] + layout.w);
    box.push(box[1] + layout.h);
    $.each(this.hairlines_, function (idx, h) {
      var left = g.toDomXCoord(h.xval);
      h.domX = left; // See comments in this.dataDidUpdate
      $(h.lineDiv).css({
        'left': left + 'px',
        'top': layout.y + 'px',
        'height': layout.h + 'px'
      }); // .draggable("option", "containment", box);
      $(h.infoDiv).css({
        'left': left + 'px',
        'top': layout.y + 'px'
      }).draggable("option", "containment", box);
      var visible = left >= chartLeft && left <= chartRight;
      $([h.infoDiv, h.lineDiv]).toggle(visible);
    });
  };

  // Sets styles on the hairline (i.e. "selected")
  hairlines.prototype.updateHairlineStyles = function () {
    $.each(this.hairlines_, function (idx, h) {
      $([h.infoDiv, h.lineDiv]).toggleClass('selected', h.selected);
    });
  };

  // Find prevRow and nextRow such that
  // g.getValue(prevRow, 0) <= xval
  // g.getValue(nextRow, 0) >= xval
  // g.getValue({prev,next}Row, col) != null, NaN or undefined
  // and there's no other row such that:
  //   g.getValue(prevRow, 0) < g.getValue(row, 0) < g.getValue(nextRow, 0)
  //   g.getValue(row, col) != null, NaN or undefined.
  // Returns [prevRow, nextRow]. Either can be null (but not both).
  hairlines.findPrevNextRows = function (g, xval, col) {
    var prevRow = null,
      nextRow = null;
    var numRows = g.numRows();
    for (var row = 0; row < numRows; row++) {
      var yval = g.getValue(row, col);
      if (yval === null || yval === undefined || isNaN(yval)) continue;
      var rowXval = g.getValue(row, 0);
      if (rowXval <= xval) prevRow = row;
      if (rowXval >= xval) {
        nextRow = row;
        break;
      }
    }
    return [prevRow, nextRow];
  };

  // Fills out the info div based on current coordinates.
  hairlines.prototype.updateHairlineInfo = function () {
    var mode = 'closest';
    var g = this.dygraph_;
    var xRange = g.xAxisRange();
    var that = this;
    $.each(this.hairlines_, function (idx, h) {
      // To use generateLegendHTML, we synthesize an array of selected points.
      var selPoints = [];
      var labels = g.getLabels();
      var row, prevRow, nextRow;
      if (!h.interpolated) {
        // "closest point" mode.
        // TODO(danvk): make findClosestRow method public
        row = g.findClosestRow(g.toDomXCoord(h.xval));
        for (var i = 1; i < g.numColumns(); i++) {
          selPoints.push({
            canvasx: 1,
            // TODO(danvk): real coordinate
            canvasy: 1,
            // TODO(danvk): real coordinate
            xval: h.xval,
            yval: g.getValue(row, i),
            name: labels[i]
          });
        }
      } else {
        // "interpolated" mode.
        for (var i = 1; i < g.numColumns(); i++) {
          var prevNextRow = hairlines.findPrevNextRows(g, h.xval, i);
          prevRow = prevNextRow[0], nextRow = prevNextRow[1];

          // For x-values outside the domain, interpolate "between" the extreme
          // point and itself.
          if (prevRow === null) prevRow = nextRow;
          if (nextRow === null) nextRow = prevRow;

          // linear interpolation
          var prevX = g.getValue(prevRow, 0),
            nextX = g.getValue(nextRow, 0),
            prevY = g.getValue(prevRow, i),
            nextY = g.getValue(nextRow, i),
            frac = prevRow == nextRow ? 0 : (h.xval - prevX) / (nextX - prevX),
            yval = frac * nextY + (1 - frac) * prevY;
          selPoints.push({
            canvasx: 1,
            // TODO(danvk): real coordinate
            canvasy: 1,
            // TODO(danvk): real coordinate
            xval: h.xval,
            yval: yval,
            prevRow: prevRow,
            nextRow: nextRow,
            name: labels[i]
          });
        }
      }
      if (that.divFiller_) {
        that.divFiller_(h.infoDiv, {
          closestRow: row,
          points: selPoints,
          hairline: that.createPublicHairline_(h),
          dygraph: g
        });
      } else {
        var html = Dygraph.Plugins.Legend.generateLegendHTML(g, h.xval, selPoints, 10);
        $('.hairline-legend', h.infoDiv).html(html);
      }
    });
  };

  // After a resize, the hairline divs can get dettached from the chart.
  // This reattaches them.
  hairlines.prototype.attachHairlinesToChart_ = function () {
    var div = this.dygraph_.graphDiv;
    $.each(this.hairlines_, function (idx, h) {
      $([h.lineDiv, h.infoDiv]).appendTo(div);
    });
  };

  // Deletes a hairline and removes it from the chart.
  hairlines.prototype.removeHairline = function (h) {
    var idx = this.hairlines_.indexOf(h);
    if (idx >= 0) {
      this.hairlines_.splice(idx, 1);
      $([h.lineDiv, h.infoDiv]).remove();
    } else {
      Dygraph.warn('Tried to remove non-existent hairline.');
    }
  };
  hairlines.prototype.didDrawChart = function (e) {
    var g = e.dygraph;

    // Early out in the (common) case of zero hairlines.
    if (this.hairlines_.length === 0) return;
    this.updateHairlineDivPositions();
    this.attachHairlinesToChart_();
    this.updateHairlineInfo();
    this.updateHairlineStyles();
  };
  hairlines.prototype.dataDidUpdate = function (e) {
    // When the data in the chart updates, the hairlines should stay in the same
    // position on the screen. didDrawChart stores a domX parameter for each
    // hairline. We use that to reposition them on data updates.
    var g = this.dygraph_;
    $.each(this.hairlines_, function (idx, h) {
      if (h.hasOwnProperty('domX')) {
        h.xval = g.toDataXCoord(h.domX);
      }
    });
  };
  hairlines.prototype.click = function (e) {
    if (this.addTimer_) {
      // Another click is in progress; ignore this one.
      return;
    }
    var area = e.dygraph.getArea();
    var xval = this.dygraph_.toDataXCoord(e.canvasx);
    var that = this;
    this.addTimer_ = setTimeout(function () {
      that.addTimer_ = null;
      that.hairlines_.push(that.createHairline({
        xval: xval
      }));
      that.updateHairlineDivPositions();
      that.updateHairlineInfo();
      that.updateHairlineStyles();
      that.attachHairlinesToChart_();
      $(that).triggerHandler('hairlineCreated', {
        xval: xval
      });
      $(that).triggerHandler('hairlinesChanged', {});
    }, CLICK_DELAY_MS);
  };
  hairlines.prototype.dblclick = function (e) {
    if (this.addTimer_) {
      clearTimeout(this.addTimer_);
      this.addTimer_ = null;
    }
  };
  hairlines.prototype.destroy = function () {
    this.detachLabels();
  };

  // Public API

  /**
   * This is a restricted view of this.hairlines_ which doesn't expose
   * implementation details like the handle divs.
   *
   * @typedef {
   *   xval:  number,       // x-value (i.e. millis or a raw number)
   *   interpolated: bool,  // alternative is to snap to closest
   *   selected: bool       // whether the hairline is selected.
   * } PublicHairline
   */

  /**
   * @param {!Hairline} h Internal hairline.
   * @return {!PublicHairline} Restricted public view of the hairline.
   */
  hairlines.prototype.createPublicHairline_ = function (h) {
    return {
      xval: h.xval,
      interpolated: h.interpolated,
      selected: h.selected
    };
  };

  /**
   * @return {!Array.<!PublicHairline>} The current set of hairlines, ordered
   *     from back to front.
   */
  hairlines.prototype.get = function () {
    var result = [];
    for (var i = 0; i < this.hairlines_.length; i++) {
      var h = this.hairlines_[i];
      result.push(this.createPublicHairline_(h));
    }
    return result;
  };

  /**
   * Calling this will result in a hairlinesChanged event being triggered, no
   * matter whether it consists of additions, deletions, moves or no changes at
   * all.
   *
   * @param {!Array.<!PublicHairline>} hairlines The new set of hairlines,
   *     ordered from back to front.
   */
  hairlines.prototype.set = function (hairlines) {
    // Re-use divs from the old hairlines array so far as we can.
    // They're already correctly z-ordered.
    var anyCreated = false;
    for (var i = 0; i < hairlines.length; i++) {
      var h = hairlines[i];
      if (this.hairlines_.length > i) {
        this.hairlines_[i].xval = h.xval;
        this.hairlines_[i].interpolated = h.interpolated;
        this.hairlines_[i].selected = h.selected;
      } else {
        this.hairlines_.push(this.createHairline({
          xval: h.xval,
          interpolated: h.interpolated,
          selected: h.selected
        }));
        anyCreated = true;
      }
    }

    // If there are any remaining hairlines, destroy them.
    while (hairlines.length < this.hairlines_.length) {
      this.removeHairline(this.hairlines_[hairlines.length]);
    }
    this.updateHairlineDivPositions();
    this.updateHairlineInfo();
    this.updateHairlineStyles();
    if (anyCreated) {
      this.attachHairlinesToChart_();
    }
    $(this).triggerHandler('hairlinesChanged', {});
  };
  return hairlines;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEeWdyYXBoIiwiUGx1Z2lucyIsIkhhaXJsaW5lcyIsIkNMSUNLX0RFTEFZX01TIiwiaGFpcmxpbmVzIiwib3B0X29wdGlvbnMiLCJoYWlybGluZXNfIiwibGFzdFdpZHRoXyIsImxhc3RIZWlnaHQiLCJkeWdyYXBoXyIsImFkZFRpbWVyXyIsImRpdkZpbGxlcl8iLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImFjdGl2YXRlIiwiZyIsImRpZERyYXdDaGFydCIsImNsaWNrIiwiZGJsY2xpY2siLCJkYXRhRGlkVXBkYXRlIiwiZGV0YWNoTGFiZWxzIiwiaSIsImxlbmd0aCIsImgiLCIkIiwibGluZURpdiIsInJlbW92ZSIsImluZm9EaXYiLCJoYWlybGluZVdhc0RyYWdnZWQiLCJldmVudCIsInVpIiwiYXJlYSIsImdldEFyZWEiLCJvbGRYVmFsIiwieHZhbCIsInRvRGF0YVhDb29yZCIsInBvc2l0aW9uIiwibGVmdCIsIm1vdmVIYWlybGluZVRvVG9wIiwidXBkYXRlSGFpcmxpbmVEaXZQb3NpdGlvbnMiLCJ1cGRhdGVIYWlybGluZUluZm8iLCJ1cGRhdGVIYWlybGluZVN0eWxlcyIsInRyaWdnZXJIYW5kbGVyIiwibmV3WFZhbCIsImNyZWF0ZUhhaXJsaW5lIiwicHJvcHMiLCJzZWxmIiwiJGxpbmVDb250YWluZXJEaXYiLCJjc3MiLCJhZGRDbGFzcyIsIiRsaW5lRGl2IiwiYXBwZW5kVG8iLCIkaW5mb0RpdiIsImNsb25lIiwicmVtb3ZlQXR0ciIsInNob3ciLCJnZXQiLCJkcmFnZ2FibGUiLCJleHRlbmQiLCJpbnRlcnBvbGF0ZWQiLCJzZWxlY3RlZCIsInRoYXQiLCJvbiIsImUiLCJyZW1vdmVIYWlybGluZSIsInN0b3BQcm9wYWdhdGlvbiIsImRpdiIsImdyYXBoRGl2IiwiaWR4IiwiaW5kZXhPZiIsInNwbGljZSIsInB1c2giLCJsYXlvdXQiLCJjaGFydExlZnQiLCJ4IiwiY2hhcnRSaWdodCIsInciLCJwb3MiLCJmaW5kUG9zIiwiYm94IiwieSIsImVhY2giLCJ0b0RvbVhDb29yZCIsImRvbVgiLCJ2aXNpYmxlIiwidG9nZ2xlIiwidG9nZ2xlQ2xhc3MiLCJmaW5kUHJldk5leHRSb3dzIiwiY29sIiwicHJldlJvdyIsIm5leHRSb3ciLCJudW1Sb3dzIiwicm93IiwieXZhbCIsImdldFZhbHVlIiwidW5kZWZpbmVkIiwiaXNOYU4iLCJyb3dYdmFsIiwibW9kZSIsInhSYW5nZSIsInhBeGlzUmFuZ2UiLCJzZWxQb2ludHMiLCJsYWJlbHMiLCJnZXRMYWJlbHMiLCJmaW5kQ2xvc2VzdFJvdyIsIm51bUNvbHVtbnMiLCJjYW52YXN4IiwiY2FudmFzeSIsIm5hbWUiLCJwcmV2TmV4dFJvdyIsInByZXZYIiwibmV4dFgiLCJwcmV2WSIsIm5leHRZIiwiZnJhYyIsImNsb3Nlc3RSb3ciLCJwb2ludHMiLCJoYWlybGluZSIsImNyZWF0ZVB1YmxpY0hhaXJsaW5lXyIsImR5Z3JhcGgiLCJodG1sIiwiTGVnZW5kIiwiZ2VuZXJhdGVMZWdlbmRIVE1MIiwiYXR0YWNoSGFpcmxpbmVzVG9DaGFydF8iLCJ3YXJuIiwiaGFzT3duUHJvcGVydHkiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiZGVzdHJveSIsInJlc3VsdCIsInNldCIsImFueUNyZWF0ZWQiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvZXh0cmFzL2hhaXJsaW5lcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxMyBEYW4gVmFuZGVya2FtIChkYW52ZGtAZ21haWwuY29tKVxuICogTUlULWxpY2VuY2VkOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICpcbiAqIE5vdGU6IFRoaXMgcGx1Z2luIHJlcXVpcmVzIGpRdWVyeSBhbmQgalF1ZXJ5IFVJIERyYWdnYWJsZS5cbiAqXG4gKiBTZWUgaGlnaC1sZXZlbCBkb2N1bWVudGF0aW9uIGF0IC4uLy4uL2RvY3MvaGFpcmxpbmVzLWFubm90YXRpb25zLnBkZlxuICovXG5cbi8qZ2xvYmFsIER5Z3JhcGg6ZmFsc2UgKi9cblxuRHlncmFwaC5QbHVnaW5zLkhhaXJsaW5lcyA9IChmdW5jdGlvbigpIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQHR5cGVkZWYge1xuICogICB4dmFsOiAgbnVtYmVyLCAgICAgIC8vIHgtdmFsdWUgKGkuZS4gbWlsbGlzIG9yIGEgcmF3IG51bWJlcilcbiAqICAgaW50ZXJwb2xhdGVkOiBib29sLCAgLy8gYWx0ZXJuYXRpdmUgaXMgdG8gc25hcCB0byBjbG9zZXN0XG4gKiAgIGxpbmVEaXY6ICFFbGVtZW50ICAgIC8vIHZlcnRpY2FsIGhhaXJsaW5lIGRpdlxuICogICBpbmZvRGl2OiAhRWxlbWVudCAgICAvLyBkaXYgY29udGFpbmluZyBpbmZvIGFib3V0IHRoZSBuZWFyZXN0IHBvaW50c1xuICogICBzZWxlY3RlZDogYm9vbGVhbiAgICAvLyB3aGV0aGVyIHRoaXMgaGFpcmxpbmUgaXMgc2VsZWN0ZWRcbiAqIH0gSGFpcmxpbmVcbiAqL1xuXG4vLyBXZSBoYXZlIHRvIHdhaXQgYSBmZXcgbXMgYWZ0ZXIgY2xpY2tzIHRvIGdpdmUgdGhlIHVzZXIgYSBjaGFuY2UgdG9cbi8vIGRvdWJsZS1jbGljayB0byB1bnpvb20uIFRoaXMgc2V0cyB0aGF0IGRlbGF5IHBlcmlvZC5cbnZhciBDTElDS19ERUxBWV9NUyA9IDMwMDtcblxudmFyIGhhaXJsaW5lcyA9IGZ1bmN0aW9uKG9wdF9vcHRpb25zKSB7XG4gIC8qIEB0eXBlIHshQXJyYXkuPCFIYWlybGluZT59ICovXG4gIHRoaXMuaGFpcmxpbmVzXyA9IFtdO1xuXG4gIC8vIFVzZWQgdG8gZGV0ZWN0IHJlc2l6ZXMgKHdoaWNoIHJlcXVpcmUgdGhlIGRpdnMgdG8gYmUgcmVwb3NpdGlvbmVkKS5cbiAgdGhpcy5sYXN0V2lkdGhfID0gLTE7XG4gIHRoaXMubGFzdEhlaWdodCA9IC0xO1xuICB0aGlzLmR5Z3JhcGhfID0gbnVsbDtcblxuICB0aGlzLmFkZFRpbWVyXyA9IG51bGw7XG4gIG9wdF9vcHRpb25zID0gb3B0X29wdGlvbnMgfHwge307XG5cbiAgdGhpcy5kaXZGaWxsZXJfID0gb3B0X29wdGlvbnNbJ2RpdkZpbGxlciddIHx8IG51bGw7XG59O1xuXG5oYWlybGluZXMucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBcIkhhaXJsaW5lcyBQbHVnaW5cIjtcbn07XG5cbmhhaXJsaW5lcy5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbihnKSB7XG4gIHRoaXMuZHlncmFwaF8gPSBnO1xuICB0aGlzLmhhaXJsaW5lc18gPSBbXTtcblxuICByZXR1cm4ge1xuICAgIGRpZERyYXdDaGFydDogdGhpcy5kaWREcmF3Q2hhcnQsXG4gICAgY2xpY2s6IHRoaXMuY2xpY2ssXG4gICAgZGJsY2xpY2s6IHRoaXMuZGJsY2xpY2ssXG4gICAgZGF0YURpZFVwZGF0ZTogdGhpcy5kYXRhRGlkVXBkYXRlXG4gIH07XG59O1xuXG5oYWlybGluZXMucHJvdG90eXBlLmRldGFjaExhYmVscyA9IGZ1bmN0aW9uKCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaGFpcmxpbmVzXy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBoID0gdGhpcy5oYWlybGluZXNfW2ldO1xuICAgICQoaC5saW5lRGl2KS5yZW1vdmUoKTtcbiAgICAkKGguaW5mb0RpdikucmVtb3ZlKCk7XG4gICAgdGhpcy5oYWlybGluZXNfW2ldID0gbnVsbDtcbiAgfVxuICB0aGlzLmhhaXJsaW5lc18gPSBbXTtcbn07XG5cbmhhaXJsaW5lcy5wcm90b3R5cGUuaGFpcmxpbmVXYXNEcmFnZ2VkID0gZnVuY3Rpb24oaCwgZXZlbnQsIHVpKSB7XG4gIHZhciBhcmVhID0gdGhpcy5keWdyYXBoXy5nZXRBcmVhKCk7XG4gIHZhciBvbGRYVmFsID0gaC54dmFsO1xuICBoLnh2YWwgPSB0aGlzLmR5Z3JhcGhfLnRvRGF0YVhDb29yZCh1aS5wb3NpdGlvbi5sZWZ0KTtcbiAgdGhpcy5tb3ZlSGFpcmxpbmVUb1RvcChoKTtcbiAgdGhpcy51cGRhdGVIYWlybGluZURpdlBvc2l0aW9ucygpO1xuICB0aGlzLnVwZGF0ZUhhaXJsaW5lSW5mbygpO1xuICB0aGlzLnVwZGF0ZUhhaXJsaW5lU3R5bGVzKCk7XG4gICQodGhpcykudHJpZ2dlckhhbmRsZXIoJ2hhaXJsaW5lTW92ZWQnLCB7XG4gICAgb2xkWFZhbDogb2xkWFZhbCxcbiAgICBuZXdYVmFsOiBoLnh2YWxcbiAgfSk7XG4gICQodGhpcykudHJpZ2dlckhhbmRsZXIoJ2hhaXJsaW5lc0NoYW5nZWQnLCB7fSk7XG59O1xuXG4vLyBUaGlzIGNyZWF0ZXMgdGhlIGhhaXJsaW5lIG9iamVjdCBhbmQgcmV0dXJucyBpdC5cbi8vIEl0IGRvZXMgbm90IHBvc2l0aW9uIGl0IGFuZCBkb2VzIG5vdCBhdHRhY2ggaXQgdG8gdGhlIGNoYXJ0LlxuaGFpcmxpbmVzLnByb3RvdHlwZS5jcmVhdGVIYWlybGluZSA9IGZ1bmN0aW9uKHByb3BzKSB7XG4gIHZhciBoO1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdmFyICRsaW5lQ29udGFpbmVyRGl2ID0gJCgnPGRpdi8+JykuY3NzKHtcbiAgICAgICd3aWR0aCc6ICc2cHgnLFxuICAgICAgJ21hcmdpbi1sZWZ0JzogJy0zcHgnLFxuICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcbiAgICAgICd6LWluZGV4JzogJzEwJ1xuICAgIH0pXG4gICAgLmFkZENsYXNzKCdkeWdyYXBoLWhhaXJsaW5lJyk7XG5cbiAgdmFyICRsaW5lRGl2ID0gJCgnPGRpdi8+JykuY3NzKHtcbiAgICAnd2lkdGgnOiAnMXB4JyxcbiAgICAncG9zaXRpb24nOiAncmVsYXRpdmUnLFxuICAgICdsZWZ0JzogJzNweCcsXG4gICAgJ2JhY2tncm91bmQnOiAnYmxhY2snLFxuICAgICdoZWlnaHQnOiAnMTAwJSdcbiAgfSk7XG4gICRsaW5lRGl2LmFwcGVuZFRvKCRsaW5lQ29udGFpbmVyRGl2KTtcblxuICB2YXIgJGluZm9EaXYgPSAkKCcjaGFpcmxpbmUtdGVtcGxhdGUnKS5jbG9uZSgpLnJlbW92ZUF0dHIoJ2lkJykuY3NzKHtcbiAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZSdcbiAgICB9KVxuICAgIC5zaG93KCk7XG5cbiAgLy8gU3VyZWx5IHRoZXJlJ3MgYSBtb3JlIGpRdWVyeS1pc2ggd2F5IHRvIGRvIHRoaXMhXG4gICQoWyRpbmZvRGl2LmdldCgwKSwgJGxpbmVDb250YWluZXJEaXYuZ2V0KDApXSlcbiAgICAuZHJhZ2dhYmxlKHtcbiAgICAgICdheGlzJzogJ3gnLFxuICAgICAgJ2RyYWcnOiBmdW5jdGlvbihldmVudCwgdWkpIHtcbiAgICAgICAgc2VsZi5oYWlybGluZVdhc0RyYWdnZWQoaCwgZXZlbnQsIHVpKTtcbiAgICAgIH1cbiAgICAgIC8vIFRPRE8oZGFudmspOiBzZXQgY3Vyc29yIGhlcmVcbiAgICB9KTtcblxuICBoID0gJC5leHRlbmQoe1xuICAgIGludGVycG9sYXRlZDogdHJ1ZSxcbiAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgbGluZURpdjogJGxpbmVDb250YWluZXJEaXYuZ2V0KDApLFxuICAgIGluZm9EaXY6ICRpbmZvRGl2LmdldCgwKVxuICB9LCBwcm9wcyk7XG5cbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkaW5mb0Rpdi5vbignY2xpY2snLCAnLmhhaXJsaW5lLWtpbGwtYnV0dG9uJywgZnVuY3Rpb24oZSkge1xuICAgIHRoYXQucmVtb3ZlSGFpcmxpbmUoaCk7XG4gICAgJCh0aGF0KS50cmlnZ2VySGFuZGxlcignaGFpcmxpbmVEZWxldGVkJywge1xuICAgICAgeHZhbDogaC54dmFsXG4gICAgfSk7XG4gICAgJCh0aGF0KS50cmlnZ2VySGFuZGxlcignaGFpcmxpbmVzQ2hhbmdlZCcsIHt9KTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAgLy8gZG9uJ3Qgd2FudCAuY2xpY2soKSB0byB0cmlnZ2VyLCBiZWxvdy5cbiAgfSkub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgdGhhdC5tb3ZlSGFpcmxpbmVUb1RvcChoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGg7XG59O1xuXG4vLyBNb3ZlcyBhIGhhaXJsaW5lJ3MgZGl2cyB0byB0aGUgdG9wIG9mIHRoZSB6LW9yZGVyaW5nLlxuaGFpcmxpbmVzLnByb3RvdHlwZS5tb3ZlSGFpcmxpbmVUb1RvcCA9IGZ1bmN0aW9uKGgpIHtcbiAgdmFyIGRpdiA9IHRoaXMuZHlncmFwaF8uZ3JhcGhEaXY7XG4gICQoaC5pbmZvRGl2KS5hcHBlbmRUbyhkaXYpO1xuICAkKGgubGluZURpdikuYXBwZW5kVG8oZGl2KTtcblxuICB2YXIgaWR4ID0gdGhpcy5oYWlybGluZXNfLmluZGV4T2YoaCk7XG4gIHRoaXMuaGFpcmxpbmVzXy5zcGxpY2UoaWR4LCAxKTtcbiAgdGhpcy5oYWlybGluZXNfLnB1c2goaCk7XG59O1xuXG4vLyBQb3NpdGlvbnMgZXhpc3RpbmcgaGFpcmxpbmUgZGl2cy5cbmhhaXJsaW5lcy5wcm90b3R5cGUudXBkYXRlSGFpcmxpbmVEaXZQb3NpdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGcgPSB0aGlzLmR5Z3JhcGhfO1xuICB2YXIgbGF5b3V0ID0gdGhpcy5keWdyYXBoXy5nZXRBcmVhKCk7XG4gIHZhciBjaGFydExlZnQgPSBsYXlvdXQueCwgY2hhcnRSaWdodCA9IGxheW91dC54ICsgbGF5b3V0Lnc7XG4gIHZhciBkaXYgPSB0aGlzLmR5Z3JhcGhfLmdyYXBoRGl2O1xuICB2YXIgcG9zID0gRHlncmFwaC5maW5kUG9zKGRpdik7XG4gIHZhciBib3ggPSBbbGF5b3V0LnggKyBwb3MueCwgbGF5b3V0LnkgKyBwb3MueV07XG4gIGJveC5wdXNoKGJveFswXSArIGxheW91dC53KTtcbiAgYm94LnB1c2goYm94WzFdICsgbGF5b3V0LmgpO1xuXG4gICQuZWFjaCh0aGlzLmhhaXJsaW5lc18sIGZ1bmN0aW9uKGlkeCwgaCkge1xuICAgIHZhciBsZWZ0ID0gZy50b0RvbVhDb29yZChoLnh2YWwpO1xuICAgIGguZG9tWCA9IGxlZnQ7ICAvLyBTZWUgY29tbWVudHMgaW4gdGhpcy5kYXRhRGlkVXBkYXRlXG4gICAgJChoLmxpbmVEaXYpLmNzcyh7XG4gICAgICAnbGVmdCc6IGxlZnQgKyAncHgnLFxuICAgICAgJ3RvcCc6IGxheW91dC55ICsgJ3B4JyxcbiAgICAgICdoZWlnaHQnOiBsYXlvdXQuaCArICdweCdcbiAgICB9KTsgIC8vIC5kcmFnZ2FibGUoXCJvcHRpb25cIiwgXCJjb250YWlubWVudFwiLCBib3gpO1xuICAgICQoaC5pbmZvRGl2KS5jc3Moe1xuICAgICAgJ2xlZnQnOiBsZWZ0ICsgJ3B4JyxcbiAgICAgICd0b3AnOiBsYXlvdXQueSArICdweCcsXG4gICAgfSkuZHJhZ2dhYmxlKFwib3B0aW9uXCIsIFwiY29udGFpbm1lbnRcIiwgYm94KTtcblxuICAgIHZhciB2aXNpYmxlID0gKGxlZnQgPj0gY2hhcnRMZWZ0ICYmIGxlZnQgPD0gY2hhcnRSaWdodCk7XG4gICAgJChbaC5pbmZvRGl2LCBoLmxpbmVEaXZdKS50b2dnbGUodmlzaWJsZSk7XG4gIH0pO1xufTtcblxuLy8gU2V0cyBzdHlsZXMgb24gdGhlIGhhaXJsaW5lIChpLmUuIFwic2VsZWN0ZWRcIilcbmhhaXJsaW5lcy5wcm90b3R5cGUudXBkYXRlSGFpcmxpbmVTdHlsZXMgPSBmdW5jdGlvbigpIHtcbiAgJC5lYWNoKHRoaXMuaGFpcmxpbmVzXywgZnVuY3Rpb24oaWR4LCBoKSB7XG4gICAgJChbaC5pbmZvRGl2LCBoLmxpbmVEaXZdKS50b2dnbGVDbGFzcygnc2VsZWN0ZWQnLCBoLnNlbGVjdGVkKTtcbiAgfSk7XG59O1xuXG4vLyBGaW5kIHByZXZSb3cgYW5kIG5leHRSb3cgc3VjaCB0aGF0XG4vLyBnLmdldFZhbHVlKHByZXZSb3csIDApIDw9IHh2YWxcbi8vIGcuZ2V0VmFsdWUobmV4dFJvdywgMCkgPj0geHZhbFxuLy8gZy5nZXRWYWx1ZSh7cHJldixuZXh0fVJvdywgY29sKSAhPSBudWxsLCBOYU4gb3IgdW5kZWZpbmVkXG4vLyBhbmQgdGhlcmUncyBubyBvdGhlciByb3cgc3VjaCB0aGF0OlxuLy8gICBnLmdldFZhbHVlKHByZXZSb3csIDApIDwgZy5nZXRWYWx1ZShyb3csIDApIDwgZy5nZXRWYWx1ZShuZXh0Um93LCAwKVxuLy8gICBnLmdldFZhbHVlKHJvdywgY29sKSAhPSBudWxsLCBOYU4gb3IgdW5kZWZpbmVkLlxuLy8gUmV0dXJucyBbcHJldlJvdywgbmV4dFJvd10uIEVpdGhlciBjYW4gYmUgbnVsbCAoYnV0IG5vdCBib3RoKS5cbmhhaXJsaW5lcy5maW5kUHJldk5leHRSb3dzID0gZnVuY3Rpb24oZywgeHZhbCwgY29sKSB7XG4gIHZhciBwcmV2Um93ID0gbnVsbCwgbmV4dFJvdyA9IG51bGw7XG4gIHZhciBudW1Sb3dzID0gZy5udW1Sb3dzKCk7XG4gIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IG51bVJvd3M7IHJvdysrKSB7XG4gICAgdmFyIHl2YWwgPSBnLmdldFZhbHVlKHJvdywgY29sKTtcbiAgICBpZiAoeXZhbCA9PT0gbnVsbCB8fCB5dmFsID09PSB1bmRlZmluZWQgfHwgaXNOYU4oeXZhbCkpIGNvbnRpbnVlO1xuXG4gICAgdmFyIHJvd1h2YWwgPSBnLmdldFZhbHVlKHJvdywgMCk7XG4gICAgaWYgKHJvd1h2YWwgPD0geHZhbCkgcHJldlJvdyA9IHJvdztcblxuICAgIGlmIChyb3dYdmFsID49IHh2YWwpIHtcbiAgICAgIG5leHRSb3cgPSByb3c7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gW3ByZXZSb3csIG5leHRSb3ddO1xufTtcblxuLy8gRmlsbHMgb3V0IHRoZSBpbmZvIGRpdiBiYXNlZCBvbiBjdXJyZW50IGNvb3JkaW5hdGVzLlxuaGFpcmxpbmVzLnByb3RvdHlwZS51cGRhdGVIYWlybGluZUluZm8gPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1vZGUgPSAnY2xvc2VzdCc7XG5cbiAgdmFyIGcgPSB0aGlzLmR5Z3JhcGhfO1xuICB2YXIgeFJhbmdlID0gZy54QXhpc1JhbmdlKCk7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJC5lYWNoKHRoaXMuaGFpcmxpbmVzXywgZnVuY3Rpb24oaWR4LCBoKSB7XG4gICAgLy8gVG8gdXNlIGdlbmVyYXRlTGVnZW5kSFRNTCwgd2Ugc3ludGhlc2l6ZSBhbiBhcnJheSBvZiBzZWxlY3RlZCBwb2ludHMuXG4gICAgdmFyIHNlbFBvaW50cyA9IFtdO1xuICAgIHZhciBsYWJlbHMgPSBnLmdldExhYmVscygpO1xuICAgIHZhciByb3csIHByZXZSb3csIG5leHRSb3c7XG5cbiAgICBpZiAoIWguaW50ZXJwb2xhdGVkKSB7XG4gICAgICAvLyBcImNsb3Nlc3QgcG9pbnRcIiBtb2RlLlxuICAgICAgLy8gVE9ETyhkYW52ayk6IG1ha2UgZmluZENsb3Nlc3RSb3cgbWV0aG9kIHB1YmxpY1xuICAgICAgcm93ID0gZy5maW5kQ2xvc2VzdFJvdyhnLnRvRG9tWENvb3JkKGgueHZhbCkpO1xuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBnLm51bUNvbHVtbnMoKTsgaSsrKSB7XG4gICAgICAgIHNlbFBvaW50cy5wdXNoKHtcbiAgICAgICAgICBjYW52YXN4OiAxLCAgLy8gVE9ETyhkYW52ayk6IHJlYWwgY29vcmRpbmF0ZVxuICAgICAgICAgIGNhbnZhc3k6IDEsICAvLyBUT0RPKGRhbnZrKTogcmVhbCBjb29yZGluYXRlXG4gICAgICAgICAgeHZhbDogaC54dmFsLFxuICAgICAgICAgIHl2YWw6IGcuZ2V0VmFsdWUocm93LCBpKSxcbiAgICAgICAgICBuYW1lOiBsYWJlbHNbaV1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFwiaW50ZXJwb2xhdGVkXCIgbW9kZS5cbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgZy5udW1Db2x1bW5zKCk7IGkrKykge1xuICAgICAgICB2YXIgcHJldk5leHRSb3cgPSBoYWlybGluZXMuZmluZFByZXZOZXh0Um93cyhnLCBoLnh2YWwsIGkpO1xuICAgICAgICBwcmV2Um93ID0gcHJldk5leHRSb3dbMF0sIG5leHRSb3cgPSBwcmV2TmV4dFJvd1sxXTtcblxuICAgICAgICAvLyBGb3IgeC12YWx1ZXMgb3V0c2lkZSB0aGUgZG9tYWluLCBpbnRlcnBvbGF0ZSBcImJldHdlZW5cIiB0aGUgZXh0cmVtZVxuICAgICAgICAvLyBwb2ludCBhbmQgaXRzZWxmLlxuICAgICAgICBpZiAocHJldlJvdyA9PT0gbnVsbCkgcHJldlJvdyA9IG5leHRSb3c7XG4gICAgICAgIGlmIChuZXh0Um93ID09PSBudWxsKSBuZXh0Um93ID0gcHJldlJvdztcblxuICAgICAgICAvLyBsaW5lYXIgaW50ZXJwb2xhdGlvblxuICAgICAgICB2YXIgcHJldlggPSBnLmdldFZhbHVlKHByZXZSb3csIDApLFxuICAgICAgICAgICAgbmV4dFggPSBnLmdldFZhbHVlKG5leHRSb3csIDApLFxuICAgICAgICAgICAgcHJldlkgPSBnLmdldFZhbHVlKHByZXZSb3csIGkpLFxuICAgICAgICAgICAgbmV4dFkgPSBnLmdldFZhbHVlKG5leHRSb3csIGkpLFxuICAgICAgICAgICAgZnJhYyA9IHByZXZSb3cgPT0gbmV4dFJvdyA/IDAgOiAoaC54dmFsIC0gcHJldlgpIC8gKG5leHRYIC0gcHJldlgpLFxuICAgICAgICAgICAgeXZhbCA9IGZyYWMgKiBuZXh0WSArICgxIC0gZnJhYykgKiBwcmV2WTtcblxuICAgICAgICBzZWxQb2ludHMucHVzaCh7XG4gICAgICAgICAgY2FudmFzeDogMSwgIC8vIFRPRE8oZGFudmspOiByZWFsIGNvb3JkaW5hdGVcbiAgICAgICAgICBjYW52YXN5OiAxLCAgLy8gVE9ETyhkYW52ayk6IHJlYWwgY29vcmRpbmF0ZVxuICAgICAgICAgIHh2YWw6IGgueHZhbCxcbiAgICAgICAgICB5dmFsOiB5dmFsLFxuICAgICAgICAgIHByZXZSb3c6IHByZXZSb3csXG4gICAgICAgICAgbmV4dFJvdzogbmV4dFJvdyxcbiAgICAgICAgICBuYW1lOiBsYWJlbHNbaV1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoYXQuZGl2RmlsbGVyXykge1xuICAgICAgdGhhdC5kaXZGaWxsZXJfKGguaW5mb0Rpdiwge1xuICAgICAgICBjbG9zZXN0Um93OiByb3csXG4gICAgICAgIHBvaW50czogc2VsUG9pbnRzLFxuICAgICAgICBoYWlybGluZTogdGhhdC5jcmVhdGVQdWJsaWNIYWlybGluZV8oaCksXG4gICAgICAgIGR5Z3JhcGg6IGdcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgaHRtbCA9IER5Z3JhcGguUGx1Z2lucy5MZWdlbmQuZ2VuZXJhdGVMZWdlbmRIVE1MKGcsIGgueHZhbCwgc2VsUG9pbnRzLCAxMCk7XG4gICAgICAkKCcuaGFpcmxpbmUtbGVnZW5kJywgaC5pbmZvRGl2KS5odG1sKGh0bWwpO1xuICAgIH1cbiAgfSk7XG59O1xuXG4vLyBBZnRlciBhIHJlc2l6ZSwgdGhlIGhhaXJsaW5lIGRpdnMgY2FuIGdldCBkZXR0YWNoZWQgZnJvbSB0aGUgY2hhcnQuXG4vLyBUaGlzIHJlYXR0YWNoZXMgdGhlbS5cbmhhaXJsaW5lcy5wcm90b3R5cGUuYXR0YWNoSGFpcmxpbmVzVG9DaGFydF8gPSBmdW5jdGlvbigpIHtcbiAgdmFyIGRpdiA9IHRoaXMuZHlncmFwaF8uZ3JhcGhEaXY7XG4gICQuZWFjaCh0aGlzLmhhaXJsaW5lc18sIGZ1bmN0aW9uKGlkeCwgaCkge1xuICAgICQoW2gubGluZURpdiwgaC5pbmZvRGl2XSkuYXBwZW5kVG8oZGl2KTtcbiAgfSk7XG59O1xuXG4vLyBEZWxldGVzIGEgaGFpcmxpbmUgYW5kIHJlbW92ZXMgaXQgZnJvbSB0aGUgY2hhcnQuXG5oYWlybGluZXMucHJvdG90eXBlLnJlbW92ZUhhaXJsaW5lID0gZnVuY3Rpb24oaCkge1xuICB2YXIgaWR4ID0gdGhpcy5oYWlybGluZXNfLmluZGV4T2YoaCk7XG4gIGlmIChpZHggPj0gMCkge1xuICAgIHRoaXMuaGFpcmxpbmVzXy5zcGxpY2UoaWR4LCAxKTtcbiAgICAkKFtoLmxpbmVEaXYsIGguaW5mb0Rpdl0pLnJlbW92ZSgpO1xuICB9IGVsc2Uge1xuICAgIER5Z3JhcGgud2FybignVHJpZWQgdG8gcmVtb3ZlIG5vbi1leGlzdGVudCBoYWlybGluZS4nKTtcbiAgfVxufTtcblxuaGFpcmxpbmVzLnByb3RvdHlwZS5kaWREcmF3Q2hhcnQgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBnID0gZS5keWdyYXBoO1xuXG4gIC8vIEVhcmx5IG91dCBpbiB0aGUgKGNvbW1vbikgY2FzZSBvZiB6ZXJvIGhhaXJsaW5lcy5cbiAgaWYgKHRoaXMuaGFpcmxpbmVzXy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICB0aGlzLnVwZGF0ZUhhaXJsaW5lRGl2UG9zaXRpb25zKCk7XG4gIHRoaXMuYXR0YWNoSGFpcmxpbmVzVG9DaGFydF8oKTtcbiAgdGhpcy51cGRhdGVIYWlybGluZUluZm8oKTtcbiAgdGhpcy51cGRhdGVIYWlybGluZVN0eWxlcygpO1xufTtcblxuaGFpcmxpbmVzLnByb3RvdHlwZS5kYXRhRGlkVXBkYXRlID0gZnVuY3Rpb24oZSkge1xuICAvLyBXaGVuIHRoZSBkYXRhIGluIHRoZSBjaGFydCB1cGRhdGVzLCB0aGUgaGFpcmxpbmVzIHNob3VsZCBzdGF5IGluIHRoZSBzYW1lXG4gIC8vIHBvc2l0aW9uIG9uIHRoZSBzY3JlZW4uIGRpZERyYXdDaGFydCBzdG9yZXMgYSBkb21YIHBhcmFtZXRlciBmb3IgZWFjaFxuICAvLyBoYWlybGluZS4gV2UgdXNlIHRoYXQgdG8gcmVwb3NpdGlvbiB0aGVtIG9uIGRhdGEgdXBkYXRlcy5cbiAgdmFyIGcgPSB0aGlzLmR5Z3JhcGhfO1xuICAkLmVhY2godGhpcy5oYWlybGluZXNfLCBmdW5jdGlvbihpZHgsIGgpIHtcbiAgICBpZiAoaC5oYXNPd25Qcm9wZXJ0eSgnZG9tWCcpKSB7XG4gICAgICBoLnh2YWwgPSBnLnRvRGF0YVhDb29yZChoLmRvbVgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5oYWlybGluZXMucHJvdG90eXBlLmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICBpZiAodGhpcy5hZGRUaW1lcl8pIHtcbiAgICAvLyBBbm90aGVyIGNsaWNrIGlzIGluIHByb2dyZXNzOyBpZ25vcmUgdGhpcyBvbmUuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGFyZWEgPSBlLmR5Z3JhcGguZ2V0QXJlYSgpO1xuICB2YXIgeHZhbCA9IHRoaXMuZHlncmFwaF8udG9EYXRhWENvb3JkKGUuY2FudmFzeCk7XG5cbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB0aGlzLmFkZFRpbWVyXyA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgdGhhdC5hZGRUaW1lcl8gPSBudWxsO1xuICAgIHRoYXQuaGFpcmxpbmVzXy5wdXNoKHRoYXQuY3JlYXRlSGFpcmxpbmUoe3h2YWw6IHh2YWx9KSk7XG5cbiAgICB0aGF0LnVwZGF0ZUhhaXJsaW5lRGl2UG9zaXRpb25zKCk7XG4gICAgdGhhdC51cGRhdGVIYWlybGluZUluZm8oKTtcbiAgICB0aGF0LnVwZGF0ZUhhaXJsaW5lU3R5bGVzKCk7XG4gICAgdGhhdC5hdHRhY2hIYWlybGluZXNUb0NoYXJ0XygpO1xuXG4gICAgJCh0aGF0KS50cmlnZ2VySGFuZGxlcignaGFpcmxpbmVDcmVhdGVkJywge1xuICAgICAgeHZhbDogeHZhbFxuICAgIH0pO1xuICAgICQodGhhdCkudHJpZ2dlckhhbmRsZXIoJ2hhaXJsaW5lc0NoYW5nZWQnLCB7fSk7XG4gIH0sIENMSUNLX0RFTEFZX01TKTtcbn07XG5cbmhhaXJsaW5lcy5wcm90b3R5cGUuZGJsY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gIGlmICh0aGlzLmFkZFRpbWVyXykge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFkZFRpbWVyXyk7XG4gICAgdGhpcy5hZGRUaW1lcl8gPSBudWxsO1xuICB9XG59O1xuXG5oYWlybGluZXMucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5kZXRhY2hMYWJlbHMoKTtcbn07XG5cbi8vIFB1YmxpYyBBUElcblxuLyoqXG4gKiBUaGlzIGlzIGEgcmVzdHJpY3RlZCB2aWV3IG9mIHRoaXMuaGFpcmxpbmVzXyB3aGljaCBkb2Vzbid0IGV4cG9zZVxuICogaW1wbGVtZW50YXRpb24gZGV0YWlscyBsaWtlIHRoZSBoYW5kbGUgZGl2cy5cbiAqXG4gKiBAdHlwZWRlZiB7XG4gKiAgIHh2YWw6ICBudW1iZXIsICAgICAgIC8vIHgtdmFsdWUgKGkuZS4gbWlsbGlzIG9yIGEgcmF3IG51bWJlcilcbiAqICAgaW50ZXJwb2xhdGVkOiBib29sLCAgLy8gYWx0ZXJuYXRpdmUgaXMgdG8gc25hcCB0byBjbG9zZXN0XG4gKiAgIHNlbGVjdGVkOiBib29sICAgICAgIC8vIHdoZXRoZXIgdGhlIGhhaXJsaW5lIGlzIHNlbGVjdGVkLlxuICogfSBQdWJsaWNIYWlybGluZVxuICovXG5cbi8qKlxuICogQHBhcmFtIHshSGFpcmxpbmV9IGggSW50ZXJuYWwgaGFpcmxpbmUuXG4gKiBAcmV0dXJuIHshUHVibGljSGFpcmxpbmV9IFJlc3RyaWN0ZWQgcHVibGljIHZpZXcgb2YgdGhlIGhhaXJsaW5lLlxuICovXG5oYWlybGluZXMucHJvdG90eXBlLmNyZWF0ZVB1YmxpY0hhaXJsaW5lXyA9IGZ1bmN0aW9uKGgpIHtcbiAgcmV0dXJuIHtcbiAgICB4dmFsOiBoLnh2YWwsXG4gICAgaW50ZXJwb2xhdGVkOiBoLmludGVycG9sYXRlZCxcbiAgICBzZWxlY3RlZDogaC5zZWxlY3RlZFxuICB9O1xufTtcblxuLyoqXG4gKiBAcmV0dXJuIHshQXJyYXkuPCFQdWJsaWNIYWlybGluZT59IFRoZSBjdXJyZW50IHNldCBvZiBoYWlybGluZXMsIG9yZGVyZWRcbiAqICAgICBmcm9tIGJhY2sgdG8gZnJvbnQuXG4gKi9cbmhhaXJsaW5lcy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmhhaXJsaW5lc18ubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaCA9IHRoaXMuaGFpcmxpbmVzX1tpXTtcbiAgICByZXN1bHQucHVzaCh0aGlzLmNyZWF0ZVB1YmxpY0hhaXJsaW5lXyhoKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogQ2FsbGluZyB0aGlzIHdpbGwgcmVzdWx0IGluIGEgaGFpcmxpbmVzQ2hhbmdlZCBldmVudCBiZWluZyB0cmlnZ2VyZWQsIG5vXG4gKiBtYXR0ZXIgd2hldGhlciBpdCBjb25zaXN0cyBvZiBhZGRpdGlvbnMsIGRlbGV0aW9ucywgbW92ZXMgb3Igbm8gY2hhbmdlcyBhdFxuICogYWxsLlxuICpcbiAqIEBwYXJhbSB7IUFycmF5LjwhUHVibGljSGFpcmxpbmU+fSBoYWlybGluZXMgVGhlIG5ldyBzZXQgb2YgaGFpcmxpbmVzLFxuICogICAgIG9yZGVyZWQgZnJvbSBiYWNrIHRvIGZyb250LlxuICovXG5oYWlybGluZXMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKGhhaXJsaW5lcykge1xuICAvLyBSZS11c2UgZGl2cyBmcm9tIHRoZSBvbGQgaGFpcmxpbmVzIGFycmF5IHNvIGZhciBhcyB3ZSBjYW4uXG4gIC8vIFRoZXkncmUgYWxyZWFkeSBjb3JyZWN0bHkgei1vcmRlcmVkLlxuICB2YXIgYW55Q3JlYXRlZCA9IGZhbHNlO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGhhaXJsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBoID0gaGFpcmxpbmVzW2ldO1xuXG4gICAgaWYgKHRoaXMuaGFpcmxpbmVzXy5sZW5ndGggPiBpKSB7XG4gICAgICB0aGlzLmhhaXJsaW5lc19baV0ueHZhbCA9IGgueHZhbDtcbiAgICAgIHRoaXMuaGFpcmxpbmVzX1tpXS5pbnRlcnBvbGF0ZWQgPSBoLmludGVycG9sYXRlZDtcbiAgICAgIHRoaXMuaGFpcmxpbmVzX1tpXS5zZWxlY3RlZCA9IGguc2VsZWN0ZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGFpcmxpbmVzXy5wdXNoKHRoaXMuY3JlYXRlSGFpcmxpbmUoe1xuICAgICAgICB4dmFsOiBoLnh2YWwsXG4gICAgICAgIGludGVycG9sYXRlZDogaC5pbnRlcnBvbGF0ZWQsXG4gICAgICAgIHNlbGVjdGVkOiBoLnNlbGVjdGVkXG4gICAgICB9KSk7XG4gICAgICBhbnlDcmVhdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBJZiB0aGVyZSBhcmUgYW55IHJlbWFpbmluZyBoYWlybGluZXMsIGRlc3Ryb3kgdGhlbS5cbiAgd2hpbGUgKGhhaXJsaW5lcy5sZW5ndGggPCB0aGlzLmhhaXJsaW5lc18ubGVuZ3RoKSB7XG4gICAgdGhpcy5yZW1vdmVIYWlybGluZSh0aGlzLmhhaXJsaW5lc19baGFpcmxpbmVzLmxlbmd0aF0pO1xuICB9XG5cbiAgdGhpcy51cGRhdGVIYWlybGluZURpdlBvc2l0aW9ucygpO1xuICB0aGlzLnVwZGF0ZUhhaXJsaW5lSW5mbygpO1xuICB0aGlzLnVwZGF0ZUhhaXJsaW5lU3R5bGVzKCk7XG4gIGlmIChhbnlDcmVhdGVkKSB7XG4gICAgdGhpcy5hdHRhY2hIYWlybGluZXNUb0NoYXJ0XygpO1xuICB9XG5cbiAgJCh0aGlzKS50cmlnZ2VySGFuZGxlcignaGFpcmxpbmVzQ2hhbmdlZCcsIHt9KTtcbn07XG5cbnJldHVybiBoYWlybGluZXM7XG5cbn0pKCk7XG4iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBQSxPQUFPLENBQUNDLE9BQU8sQ0FBQ0MsU0FBUyxHQUFJLFlBQVc7RUFFeEMsWUFBWTs7RUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0VBRUE7RUFDQTtFQUNBLElBQUlDLGNBQWMsR0FBRyxHQUFHO0VBRXhCLElBQUlDLFNBQVMsR0FBRyxTQUFaQSxTQUFTLENBQVlDLFdBQVcsRUFBRTtJQUNwQztJQUNBLElBQUksQ0FBQ0MsVUFBVSxHQUFHLEVBQUU7O0lBRXBCO0lBQ0EsSUFBSSxDQUFDQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLElBQUksQ0FBQ0MsVUFBVSxHQUFHLENBQUMs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