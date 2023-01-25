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
    /** @private {!Array.<!Hairline>} */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEeWdyYXBoIiwiUGx1Z2lucyIsIkhhaXJsaW5lcyIsIkNMSUNLX0RFTEFZX01TIiwiaGFpcmxpbmVzIiwib3B0X29wdGlvbnMiLCJoYWlybGluZXNfIiwibGFzdFdpZHRoXyIsImxhc3RIZWlnaHQiLCJkeWdyYXBoXyIsImFkZFRpbWVyXyIsImRpdkZpbGxlcl8iLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImFjdGl2YXRlIiwiZyIsImRpZERyYXdDaGFydCIsImNsaWNrIiwiZGJsY2xpY2siLCJkYXRhRGlkVXBkYXRlIiwiZGV0YWNoTGFiZWxzIiwiaSIsImxlbmd0aCIsImgiLCIkIiwibGluZURpdiIsInJlbW92ZSIsImluZm9EaXYiLCJoYWlybGluZVdhc0RyYWdnZWQiLCJldmVudCIsInVpIiwiYXJlYSIsImdldEFyZWEiLCJvbGRYVmFsIiwieHZhbCIsInRvRGF0YVhDb29yZCIsInBvc2l0aW9uIiwibGVmdCIsIm1vdmVIYWlybGluZVRvVG9wIiwidXBkYXRlSGFpcmxpbmVEaXZQb3NpdGlvbnMiLCJ1cGRhdGVIYWlybGluZUluZm8iLCJ1cGRhdGVIYWlybGluZVN0eWxlcyIsInRyaWdnZXJIYW5kbGVyIiwibmV3WFZhbCIsImNyZWF0ZUhhaXJsaW5lIiwicHJvcHMiLCJzZWxmIiwiJGxpbmVDb250YWluZXJEaXYiLCJjc3MiLCJhZGRDbGFzcyIsIiRsaW5lRGl2IiwiYXBwZW5kVG8iLCIkaW5mb0RpdiIsImNsb25lIiwicmVtb3ZlQXR0ciIsInNob3ciLCJnZXQiLCJkcmFnZ2FibGUiLCJleHRlbmQiLCJpbnRlcnBvbGF0ZWQiLCJzZWxlY3RlZCIsInRoYXQiLCJvbiIsImUiLCJyZW1vdmVIYWlybGluZSIsInN0b3BQcm9wYWdhdGlvbiIsImRpdiIsImdyYXBoRGl2IiwiaWR4IiwiaW5kZXhPZiIsInNwbGljZSIsInB1c2giLCJsYXlvdXQiLCJjaGFydExlZnQiLCJ4IiwiY2hhcnRSaWdodCIsInciLCJwb3MiLCJmaW5kUG9zIiwiYm94IiwieSIsImVhY2giLCJ0b0RvbVhDb29yZCIsImRvbVgiLCJ2aXNpYmxlIiwidG9nZ2xlIiwidG9nZ2xlQ2xhc3MiLCJmaW5kUHJldk5leHRSb3dzIiwiY29sIiwicHJldlJvdyIsIm5leHRSb3ciLCJudW1Sb3dzIiwicm93IiwieXZhbCIsImdldFZhbHVlIiwidW5kZWZpbmVkIiwiaXNOYU4iLCJyb3dYdmFsIiwibW9kZSIsInhSYW5nZSIsInhBeGlzUmFuZ2UiLCJzZWxQb2ludHMiLCJsYWJlbHMiLCJnZXRMYWJlbHMiLCJmaW5kQ2xvc2VzdFJvdyIsIm51bUNvbHVtbnMiLCJjYW52YXN4IiwiY2FudmFzeSIsIm5hbWUiLCJwcmV2TmV4dFJvdyIsInByZXZYIiwibmV4dFgiLCJwcmV2WSIsIm5leHRZIiwiZnJhYyIsImNsb3Nlc3RSb3ciLCJwb2ludHMiLCJoYWlybGluZSIsImNyZWF0ZVB1YmxpY0hhaXJsaW5lXyIsImR5Z3JhcGgiLCJodG1sIiwiTGVnZW5kIiwiZ2VuZXJhdGVMZWdlbmRIVE1MIiwiYXR0YWNoSGFpcmxpbmVzVG9DaGFydF8iLCJ3YXJuIiwiaGFzT3duUHJvcGVydHkiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiZGVzdHJveSIsInJlc3VsdCIsInNldCIsImFueUNyZWF0ZWQiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvZXh0cmFzL2hhaXJsaW5lcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxMyBEYW4gVmFuZGVya2FtIChkYW52ZGtAZ21haWwuY29tKVxuICogTUlULWxpY2VuY2VkOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICpcbiAqIE5vdGU6IFRoaXMgcGx1Z2luIHJlcXVpcmVzIGpRdWVyeSBhbmQgalF1ZXJ5IFVJIERyYWdnYWJsZS5cbiAqXG4gKiBTZWUgaGlnaC1sZXZlbCBkb2N1bWVudGF0aW9uIGF0IC4uLy4uL2RvY3MvaGFpcmxpbmVzLWFubm90YXRpb25zLnBkZlxuICovXG5cbi8qZ2xvYmFsIER5Z3JhcGg6ZmFsc2UgKi9cblxuRHlncmFwaC5QbHVnaW5zLkhhaXJsaW5lcyA9IChmdW5jdGlvbigpIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQHR5cGVkZWYge1xuICogICB4dmFsOiAgbnVtYmVyLCAgICAgIC8vIHgtdmFsdWUgKGkuZS4gbWlsbGlzIG9yIGEgcmF3IG51bWJlcilcbiAqICAgaW50ZXJwb2xhdGVkOiBib29sLCAgLy8gYWx0ZXJuYXRpdmUgaXMgdG8gc25hcCB0byBjbG9zZXN0XG4gKiAgIGxpbmVEaXY6ICFFbGVtZW50ICAgIC8vIHZlcnRpY2FsIGhhaXJsaW5lIGRpdlxuICogICBpbmZvRGl2OiAhRWxlbWVudCAgICAvLyBkaXYgY29udGFpbmluZyBpbmZvIGFib3V0IHRoZSBuZWFyZXN0IHBvaW50c1xuICogICBzZWxlY3RlZDogYm9vbGVhbiAgICAvLyB3aGV0aGVyIHRoaXMgaGFpcmxpbmUgaXMgc2VsZWN0ZWRcbiAqIH0gSGFpcmxpbmVcbiAqL1xuXG4vLyBXZSBoYXZlIHRvIHdhaXQgYSBmZXcgbXMgYWZ0ZXIgY2xpY2tzIHRvIGdpdmUgdGhlIHVzZXIgYSBjaGFuY2UgdG9cbi8vIGRvdWJsZS1jbGljayB0byB1bnpvb20uIFRoaXMgc2V0cyB0aGF0IGRlbGF5IHBlcmlvZC5cbnZhciBDTElDS19ERUxBWV9NUyA9IDMwMDtcblxudmFyIGhhaXJsaW5lcyA9IGZ1bmN0aW9uKG9wdF9vcHRpb25zKSB7XG4gIC8qKiBAcHJpdmF0ZSB7IUFycmF5LjwhSGFpcmxpbmU+fSAqL1xuICB0aGlzLmhhaXJsaW5lc18gPSBbXTtcblxuICAvLyBVc2VkIHRvIGRldGVjdCByZXNpemVzICh3aGljaCByZXF1aXJlIHRoZSBkaXZzIHRvIGJlIHJlcG9zaXRpb25lZCkuXG4gIHRoaXMubGFzdFdpZHRoXyA9IC0xO1xuICB0aGlzLmxhc3RIZWlnaHQgPSAtMTtcbiAgdGhpcy5keWdyYXBoXyA9IG51bGw7XG5cbiAgdGhpcy5hZGRUaW1lcl8gPSBudWxsO1xuICBvcHRfb3B0aW9ucyA9IG9wdF9vcHRpb25zIHx8IHt9O1xuXG4gIHRoaXMuZGl2RmlsbGVyXyA9IG9wdF9vcHRpb25zWydkaXZGaWxsZXInXSB8fCBudWxsO1xufTtcblxuaGFpcmxpbmVzLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gXCJIYWlybGluZXMgUGx1Z2luXCI7XG59O1xuXG5oYWlybGluZXMucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24oZykge1xuICB0aGlzLmR5Z3JhcGhfID0gZztcbiAgdGhpcy5oYWlybGluZXNfID0gW107XG5cbiAgcmV0dXJuIHtcbiAgICBkaWREcmF3Q2hhcnQ6IHRoaXMuZGlkRHJhd0NoYXJ0LFxuICAgIGNsaWNrOiB0aGlzLmNsaWNrLFxuICAgIGRibGNsaWNrOiB0aGlzLmRibGNsaWNrLFxuICAgIGRhdGFEaWRVcGRhdGU6IHRoaXMuZGF0YURpZFVwZGF0ZVxuICB9O1xufTtcblxuaGFpcmxpbmVzLnByb3RvdHlwZS5kZXRhY2hMYWJlbHMgPSBmdW5jdGlvbigpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmhhaXJsaW5lc18ubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaCA9IHRoaXMuaGFpcmxpbmVzX1tpXTtcbiAgICAkKGgubGluZURpdikucmVtb3ZlKCk7XG4gICAgJChoLmluZm9EaXYpLnJlbW92ZSgpO1xuICAgIHRoaXMuaGFpcmxpbmVzX1tpXSA9IG51bGw7XG4gIH1cbiAgdGhpcy5oYWlybGluZXNfID0gW107XG59O1xuXG5oYWlybGluZXMucHJvdG90eXBlLmhhaXJsaW5lV2FzRHJhZ2dlZCA9IGZ1bmN0aW9uKGgsIGV2ZW50LCB1aSkge1xuICB2YXIgYXJlYSA9IHRoaXMuZHlncmFwaF8uZ2V0QXJlYSgpO1xuICB2YXIgb2xkWFZhbCA9IGgueHZhbDtcbiAgaC54dmFsID0gdGhpcy5keWdyYXBoXy50b0RhdGFYQ29vcmQodWkucG9zaXRpb24ubGVmdCk7XG4gIHRoaXMubW92ZUhhaXJsaW5lVG9Ub3AoaCk7XG4gIHRoaXMudXBkYXRlSGFpcmxpbmVEaXZQb3NpdGlvbnMoKTtcbiAgdGhpcy51cGRhdGVIYWlybGluZUluZm8oKTtcbiAgdGhpcy51cGRhdGVIYWlybGluZVN0eWxlcygpO1xuICAkKHRoaXMpLnRyaWdnZXJIYW5kbGVyKCdoYWlybGluZU1vdmVkJywge1xuICAgIG9sZFhWYWw6IG9sZFhWYWwsXG4gICAgbmV3WFZhbDogaC54dmFsXG4gIH0pO1xuICAkKHRoaXMpLnRyaWdnZXJIYW5kbGVyKCdoYWlybGluZXNDaGFuZ2VkJywge30pO1xufTtcblxuLy8gVGhpcyBjcmVhdGVzIHRoZSBoYWlybGluZSBvYmplY3QgYW5kIHJldHVybnMgaXQuXG4vLyBJdCBkb2VzIG5vdCBwb3NpdGlvbiBpdCBhbmQgZG9lcyBub3QgYXR0YWNoIGl0IHRvIHRoZSBjaGFydC5cbmhhaXJsaW5lcy5wcm90b3R5cGUuY3JlYXRlSGFpcmxpbmUgPSBmdW5jdGlvbihwcm9wcykge1xuICB2YXIgaDtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHZhciAkbGluZUNvbnRhaW5lckRpdiA9ICQoJzxkaXYvPicpLmNzcyh7XG4gICAgICAnd2lkdGgnOiAnNnB4JyxcbiAgICAgICdtYXJnaW4tbGVmdCc6ICctM3B4JyxcbiAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXG4gICAgICAnei1pbmRleCc6ICcxMCdcbiAgICB9KVxuICAgIC5hZGRDbGFzcygnZHlncmFwaC1oYWlybGluZScpO1xuXG4gIHZhciAkbGluZURpdiA9ICQoJzxkaXYvPicpLmNzcyh7XG4gICAgJ3dpZHRoJzogJzFweCcsXG4gICAgJ3Bvc2l0aW9uJzogJ3JlbGF0aXZlJyxcbiAgICAnbGVmdCc6ICczcHgnLFxuICAgICdiYWNrZ3JvdW5kJzogJ2JsYWNrJyxcbiAgICAnaGVpZ2h0JzogJzEwMCUnXG4gIH0pO1xuICAkbGluZURpdi5hcHBlbmRUbygkbGluZUNvbnRhaW5lckRpdik7XG5cbiAgdmFyICRpbmZvRGl2ID0gJCgnI2hhaXJsaW5lLXRlbXBsYXRlJykuY2xvbmUoKS5yZW1vdmVBdHRyKCdpZCcpLmNzcyh7XG4gICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnXG4gICAgfSlcbiAgICAuc2hvdygpO1xuXG4gIC8vIFN1cmVseSB0aGVyZSdzIGEgbW9yZSBqUXVlcnktaXNoIHdheSB0byBkbyB0aGlzIVxuICAkKFskaW5mb0Rpdi5nZXQoMCksICRsaW5lQ29udGFpbmVyRGl2LmdldCgwKV0pXG4gICAgLmRyYWdnYWJsZSh7XG4gICAgICAnYXhpcyc6ICd4JyxcbiAgICAgICdkcmFnJzogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG4gICAgICAgIHNlbGYuaGFpcmxpbmVXYXNEcmFnZ2VkKGgsIGV2ZW50LCB1aSk7XG4gICAgICB9XG4gICAgICAvLyBUT0RPKGRhbnZrKTogc2V0IGN1cnNvciBoZXJlXG4gICAgfSk7XG5cbiAgaCA9ICQuZXh0ZW5kKHtcbiAgICBpbnRlcnBvbGF0ZWQ6IHRydWUsXG4gICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgIGxpbmVEaXY6ICRsaW5lQ29udGFpbmVyRGl2LmdldCgwKSxcbiAgICBpbmZvRGl2OiAkaW5mb0Rpdi5nZXQoMClcbiAgfSwgcHJvcHMpO1xuXG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJGluZm9EaXYub24oJ2NsaWNrJywgJy5oYWlybGluZS1raWxsLWJ1dHRvbicsIGZ1bmN0aW9uKGUpIHtcbiAgICB0aGF0LnJlbW92ZUhhaXJsaW5lKGgpO1xuICAgICQodGhhdCkudHJpZ2dlckhhbmRsZXIoJ2hhaXJsaW5lRGVsZXRlZCcsIHtcbiAgICAgIHh2YWw6IGgueHZhbFxuICAgIH0pO1xuICAgICQodGhhdCkudHJpZ2dlckhhbmRsZXIoJ2hhaXJsaW5lc0NoYW5nZWQnLCB7fSk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgIC8vIGRvbid0IHdhbnQgLmNsaWNrKCkgdG8gdHJpZ2dlciwgYmVsb3cuXG4gIH0pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIHRoYXQubW92ZUhhaXJsaW5lVG9Ub3AoaCk7XG4gIH0pO1xuXG4gIHJldHVybiBoO1xufTtcblxuLy8gTW92ZXMgYSBoYWlybGluZSdzIGRpdnMgdG8gdGhlIHRvcCBvZiB0aGUgei1vcmRlcmluZy5cbmhhaXJsaW5lcy5wcm90b3R5cGUubW92ZUhhaXJsaW5lVG9Ub3AgPSBmdW5jdGlvbihoKSB7XG4gIHZhciBkaXYgPSB0aGlzLmR5Z3JhcGhfLmdyYXBoRGl2O1xuICAkKGguaW5mb0RpdikuYXBwZW5kVG8oZGl2KTtcbiAgJChoLmxpbmVEaXYpLmFwcGVuZFRvKGRpdik7XG5cbiAgdmFyIGlkeCA9IHRoaXMuaGFpcmxpbmVzXy5pbmRleE9mKGgpO1xuICB0aGlzLmhhaXJsaW5lc18uc3BsaWNlKGlkeCwgMSk7XG4gIHRoaXMuaGFpcmxpbmVzXy5wdXNoKGgpO1xufTtcblxuLy8gUG9zaXRpb25zIGV4aXN0aW5nIGhhaXJsaW5lIGRpdnMuXG5oYWlybGluZXMucHJvdG90eXBlLnVwZGF0ZUhhaXJsaW5lRGl2UG9zaXRpb25zID0gZnVuY3Rpb24oKSB7XG4gIHZhciBnID0gdGhpcy5keWdyYXBoXztcbiAgdmFyIGxheW91dCA9IHRoaXMuZHlncmFwaF8uZ2V0QXJlYSgpO1xuICB2YXIgY2hhcnRMZWZ0ID0gbGF5b3V0LngsIGNoYXJ0UmlnaHQgPSBsYXlvdXQueCArIGxheW91dC53O1xuICB2YXIgZGl2ID0gdGhpcy5keWdyYXBoXy5ncmFwaERpdjtcbiAgdmFyIHBvcyA9IER5Z3JhcGguZmluZFBvcyhkaXYpO1xuICB2YXIgYm94ID0gW2xheW91dC54ICsgcG9zLngsIGxheW91dC55ICsgcG9zLnldO1xuICBib3gucHVzaChib3hbMF0gKyBsYXlvdXQudyk7XG4gIGJveC5wdXNoKGJveFsxXSArIGxheW91dC5oKTtcblxuICAkLmVhY2godGhpcy5oYWlybGluZXNfLCBmdW5jdGlvbihpZHgsIGgpIHtcbiAgICB2YXIgbGVmdCA9IGcudG9Eb21YQ29vcmQoaC54dmFsKTtcbiAgICBoLmRvbVggPSBsZWZ0OyAgLy8gU2VlIGNvbW1lbnRzIGluIHRoaXMuZGF0YURpZFVwZGF0ZVxuICAgICQoaC5saW5lRGl2KS5jc3Moe1xuICAgICAgJ2xlZnQnOiBsZWZ0ICsgJ3B4JyxcbiAgICAgICd0b3AnOiBsYXlvdXQueSArICdweCcsXG4gICAgICAnaGVpZ2h0JzogbGF5b3V0LmggKyAncHgnXG4gICAgfSk7ICAvLyAuZHJhZ2dhYmxlKFwib3B0aW9uXCIsIFwiY29udGFpbm1lbnRcIiwgYm94KTtcbiAgICAkKGguaW5mb0RpdikuY3NzKHtcbiAgICAgICdsZWZ0JzogbGVmdCArICdweCcsXG4gICAgICAndG9wJzogbGF5b3V0LnkgKyAncHgnLFxuICAgIH0pLmRyYWdnYWJsZShcIm9wdGlvblwiLCBcImNvbnRhaW5tZW50XCIsIGJveCk7XG5cbiAgICB2YXIgdmlzaWJsZSA9IChsZWZ0ID49IGNoYXJ0TGVmdCAmJiBsZWZ0IDw9IGNoYXJ0UmlnaHQpO1xuICAgICQoW2guaW5mb0RpdiwgaC5saW5lRGl2XSkudG9nZ2xlKHZpc2libGUpO1xuICB9KTtcbn07XG5cbi8vIFNldHMgc3R5bGVzIG9uIHRoZSBoYWlybGluZSAoaS5lLiBcInNlbGVjdGVkXCIpXG5oYWlybGluZXMucHJvdG90eXBlLnVwZGF0ZUhhaXJsaW5lU3R5bGVzID0gZnVuY3Rpb24oKSB7XG4gICQuZWFjaCh0aGlzLmhhaXJsaW5lc18sIGZ1bmN0aW9uKGlkeCwgaCkge1xuICAgICQoW2guaW5mb0RpdiwgaC5saW5lRGl2XSkudG9nZ2xlQ2xhc3MoJ3NlbGVjdGVkJywgaC5zZWxlY3RlZCk7XG4gIH0pO1xufTtcblxuLy8gRmluZCBwcmV2Um93IGFuZCBuZXh0Um93IHN1Y2ggdGhhdFxuLy8gZy5nZXRWYWx1ZShwcmV2Um93LCAwKSA8PSB4dmFsXG4vLyBnLmdldFZhbHVlKG5leHRSb3csIDApID49IHh2YWxcbi8vIGcuZ2V0VmFsdWUoe3ByZXYsbmV4dH1Sb3csIGNvbCkgIT0gbnVsbCwgTmFOIG9yIHVuZGVmaW5lZFxuLy8gYW5kIHRoZXJlJ3Mgbm8gb3RoZXIgcm93IHN1Y2ggdGhhdDpcbi8vICAgZy5nZXRWYWx1ZShwcmV2Um93LCAwKSA8IGcuZ2V0VmFsdWUocm93LCAwKSA8IGcuZ2V0VmFsdWUobmV4dFJvdywgMClcbi8vICAgZy5nZXRWYWx1ZShyb3csIGNvbCkgIT0gbnVsbCwgTmFOIG9yIHVuZGVmaW5lZC5cbi8vIFJldHVybnMgW3ByZXZSb3csIG5leHRSb3ddLiBFaXRoZXIgY2FuIGJlIG51bGwgKGJ1dCBub3QgYm90aCkuXG5oYWlybGluZXMuZmluZFByZXZOZXh0Um93cyA9IGZ1bmN0aW9uKGcsIHh2YWwsIGNvbCkge1xuICB2YXIgcHJldlJvdyA9IG51bGwsIG5leHRSb3cgPSBudWxsO1xuICB2YXIgbnVtUm93cyA9IGcubnVtUm93cygpO1xuICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCBudW1Sb3dzOyByb3crKykge1xuICAgIHZhciB5dmFsID0gZy5nZXRWYWx1ZShyb3csIGNvbCk7XG4gICAgaWYgKHl2YWwgPT09IG51bGwgfHwgeXZhbCA9PT0gdW5kZWZpbmVkIHx8IGlzTmFOKHl2YWwpKSBjb250aW51ZTtcblxuICAgIHZhciByb3dYdmFsID0gZy5nZXRWYWx1ZShyb3csIDApO1xuICAgIGlmIChyb3dYdmFsIDw9IHh2YWwpIHByZXZSb3cgPSByb3c7XG5cbiAgICBpZiAocm93WHZhbCA+PSB4dmFsKSB7XG4gICAgICBuZXh0Um93ID0gcm93O1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFtwcmV2Um93LCBuZXh0Um93XTtcbn07XG5cbi8vIEZpbGxzIG91dCB0aGUgaW5mbyBkaXYgYmFzZWQgb24gY3VycmVudCBjb29yZGluYXRlcy5cbmhhaXJsaW5lcy5wcm90b3R5cGUudXBkYXRlSGFpcmxpbmVJbmZvID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtb2RlID0gJ2Nsb3Nlc3QnO1xuXG4gIHZhciBnID0gdGhpcy5keWdyYXBoXztcbiAgdmFyIHhSYW5nZSA9IGcueEF4aXNSYW5nZSgpO1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQuZWFjaCh0aGlzLmhhaXJsaW5lc18sIGZ1bmN0aW9uKGlkeCwgaCkge1xuICAgIC8vIFRvIHVzZSBnZW5lcmF0ZUxlZ2VuZEhUTUwsIHdlIHN5bnRoZXNpemUgYW4gYXJyYXkgb2Ygc2VsZWN0ZWQgcG9pbnRzLlxuICAgIHZhciBzZWxQb2ludHMgPSBbXTtcbiAgICB2YXIgbGFiZWxzID0gZy5nZXRMYWJlbHMoKTtcbiAgICB2YXIgcm93LCBwcmV2Um93LCBuZXh0Um93O1xuXG4gICAgaWYgKCFoLmludGVycG9sYXRlZCkge1xuICAgICAgLy8gXCJjbG9zZXN0IHBvaW50XCIgbW9kZS5cbiAgICAgIC8vIFRPRE8oZGFudmspOiBtYWtlIGZpbmRDbG9zZXN0Um93IG1ldGhvZCBwdWJsaWNcbiAgICAgIHJvdyA9IGcuZmluZENsb3Nlc3RSb3coZy50b0RvbVhDb29yZChoLnh2YWwpKTtcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgZy5udW1Db2x1bW5zKCk7IGkrKykge1xuICAgICAgICBzZWxQb2ludHMucHVzaCh7XG4gICAgICAgICAgY2FudmFzeDogMSwgIC8vIFRPRE8oZGFudmspOiByZWFsIGNvb3JkaW5hdGVcbiAgICAgICAgICBjYW52YXN5OiAxLCAgLy8gVE9ETyhkYW52ayk6IHJlYWwgY29vcmRpbmF0ZVxuICAgICAgICAgIHh2YWw6IGgueHZhbCxcbiAgICAgICAgICB5dmFsOiBnLmdldFZhbHVlKHJvdywgaSksXG4gICAgICAgICAgbmFtZTogbGFiZWxzW2ldXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBcImludGVycG9sYXRlZFwiIG1vZGUuXG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGcubnVtQ29sdW1ucygpOyBpKyspIHtcbiAgICAgICAgdmFyIHByZXZOZXh0Um93ID0gaGFpcmxpbmVzLmZpbmRQcmV2TmV4dFJvd3MoZywgaC54dmFsLCBpKTtcbiAgICAgICAgcHJldlJvdyA9IHByZXZOZXh0Um93WzBdLCBuZXh0Um93ID0gcHJldk5leHRSb3dbMV07XG5cbiAgICAgICAgLy8gRm9yIHgtdmFsdWVzIG91dHNpZGUgdGhlIGRvbWFpbiwgaW50ZXJwb2xhdGUgXCJiZXR3ZWVuXCIgdGhlIGV4dHJlbWVcbiAgICAgICAgLy8gcG9pbnQgYW5kIGl0c2VsZi5cbiAgICAgICAgaWYgKHByZXZSb3cgPT09IG51bGwpIHByZXZSb3cgPSBuZXh0Um93O1xuICAgICAgICBpZiAobmV4dFJvdyA9PT0gbnVsbCkgbmV4dFJvdyA9IHByZXZSb3c7XG5cbiAgICAgICAgLy8gbGluZWFyIGludGVycG9sYXRpb25cbiAgICAgICAgdmFyIHByZXZYID0gZy5nZXRWYWx1ZShwcmV2Um93LCAwKSxcbiAgICAgICAgICAgIG5leHRYID0gZy5nZXRWYWx1ZShuZXh0Um93LCAwKSxcbiAgICAgICAgICAgIHByZXZZID0gZy5nZXRWYWx1ZShwcmV2Um93LCBpKSxcbiAgICAgICAgICAgIG5leHRZID0gZy5nZXRWYWx1ZShuZXh0Um93LCBpKSxcbiAgICAgICAgICAgIGZyYWMgPSBwcmV2Um93ID09IG5leHRSb3cgPyAwIDogKGgueHZhbCAtIHByZXZYKSAvIChuZXh0WCAtIHByZXZYKSxcbiAgICAgICAgICAgIHl2YWwgPSBmcmFjICogbmV4dFkgKyAoMSAtIGZyYWMpICogcHJldlk7XG5cbiAgICAgICAgc2VsUG9pbnRzLnB1c2goe1xuICAgICAgICAgIGNhbnZhc3g6IDEsICAvLyBUT0RPKGRhbnZrKTogcmVhbCBjb29yZGluYXRlXG4gICAgICAgICAgY2FudmFzeTogMSwgIC8vIFRPRE8oZGFudmspOiByZWFsIGNvb3JkaW5hdGVcbiAgICAgICAgICB4dmFsOiBoLnh2YWwsXG4gICAgICAgICAgeXZhbDogeXZhbCxcbiAgICAgICAgICBwcmV2Um93OiBwcmV2Um93LFxuICAgICAgICAgIG5leHRSb3c6IG5leHRSb3csXG4gICAgICAgICAgbmFtZTogbGFiZWxzW2ldXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGF0LmRpdkZpbGxlcl8pIHtcbiAgICAgIHRoYXQuZGl2RmlsbGVyXyhoLmluZm9EaXYsIHtcbiAgICAgICAgY2xvc2VzdFJvdzogcm93LFxuICAgICAgICBwb2ludHM6IHNlbFBvaW50cyxcbiAgICAgICAgaGFpcmxpbmU6IHRoYXQuY3JlYXRlUHVibGljSGFpcmxpbmVfKGgpLFxuICAgICAgICBkeWdyYXBoOiBnXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGh0bWwgPSBEeWdyYXBoLlBsdWdpbnMuTGVnZW5kLmdlbmVyYXRlTGVnZW5kSFRNTChnLCBoLnh2YWwsIHNlbFBvaW50cywgMTApO1xuICAgICAgJCgnLmhhaXJsaW5lLWxlZ2VuZCcsIGguaW5mb0RpdikuaHRtbChodG1sKTtcbiAgICB9XG4gIH0pO1xufTtcblxuLy8gQWZ0ZXIgYSByZXNpemUsIHRoZSBoYWlybGluZSBkaXZzIGNhbiBnZXQgZGV0dGFjaGVkIGZyb20gdGhlIGNoYXJ0LlxuLy8gVGhpcyByZWF0dGFjaGVzIHRoZW0uXG5oYWlybGluZXMucHJvdG90eXBlLmF0dGFjaEhhaXJsaW5lc1RvQ2hhcnRfID0gZnVuY3Rpb24oKSB7XG4gIHZhciBkaXYgPSB0aGlzLmR5Z3JhcGhfLmdyYXBoRGl2O1xuICAkLmVhY2godGhpcy5oYWlybGluZXNfLCBmdW5jdGlvbihpZHgsIGgpIHtcbiAgICAkKFtoLmxpbmVEaXYsIGguaW5mb0Rpdl0pLmFwcGVuZFRvKGRpdik7XG4gIH0pO1xufTtcblxuLy8gRGVsZXRlcyBhIGhhaXJsaW5lIGFuZCByZW1vdmVzIGl0IGZyb20gdGhlIGNoYXJ0LlxuaGFpcmxpbmVzLnByb3RvdHlwZS5yZW1vdmVIYWlybGluZSA9IGZ1bmN0aW9uKGgpIHtcbiAgdmFyIGlkeCA9IHRoaXMuaGFpcmxpbmVzXy5pbmRleE9mKGgpO1xuICBpZiAoaWR4ID49IDApIHtcbiAgICB0aGlzLmhhaXJsaW5lc18uc3BsaWNlKGlkeCwgMSk7XG4gICAgJChbaC5saW5lRGl2LCBoLmluZm9EaXZdKS5yZW1vdmUoKTtcbiAgfSBlbHNlIHtcbiAgICBEeWdyYXBoLndhcm4oJ1RyaWVkIHRvIHJlbW92ZSBub24tZXhpc3RlbnQgaGFpcmxpbmUuJyk7XG4gIH1cbn07XG5cbmhhaXJsaW5lcy5wcm90b3R5cGUuZGlkRHJhd0NoYXJ0ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZyA9IGUuZHlncmFwaDtcblxuICAvLyBFYXJseSBvdXQgaW4gdGhlIChjb21tb24pIGNhc2Ugb2YgemVybyBoYWlybGluZXMuXG4gIGlmICh0aGlzLmhhaXJsaW5lc18ubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgdGhpcy51cGRhdGVIYWlybGluZURpdlBvc2l0aW9ucygpO1xuICB0aGlzLmF0dGFjaEhhaXJsaW5lc1RvQ2hhcnRfKCk7XG4gIHRoaXMudXBkYXRlSGFpcmxpbmVJbmZvKCk7XG4gIHRoaXMudXBkYXRlSGFpcmxpbmVTdHlsZXMoKTtcbn07XG5cbmhhaXJsaW5lcy5wcm90b3R5cGUuZGF0YURpZFVwZGF0ZSA9IGZ1bmN0aW9uKGUpIHtcbiAgLy8gV2hlbiB0aGUgZGF0YSBpbiB0aGUgY2hhcnQgdXBkYXRlcywgdGhlIGhhaXJsaW5lcyBzaG91bGQgc3RheSBpbiB0aGUgc2FtZVxuICAvLyBwb3NpdGlvbiBvbiB0aGUgc2NyZWVuLiBkaWREcmF3Q2hhcnQgc3RvcmVzIGEgZG9tWCBwYXJhbWV0ZXIgZm9yIGVhY2hcbiAgLy8gaGFpcmxpbmUuIFdlIHVzZSB0aGF0IHRvIHJlcG9zaXRpb24gdGhlbSBvbiBkYXRhIHVwZGF0ZXMuXG4gIHZhciBnID0gdGhpcy5keWdyYXBoXztcbiAgJC5lYWNoKHRoaXMuaGFpcmxpbmVzXywgZnVuY3Rpb24oaWR4LCBoKSB7XG4gICAgaWYgKGguaGFzT3duUHJvcGVydHkoJ2RvbVgnKSkge1xuICAgICAgaC54dmFsID0gZy50b0RhdGFYQ29vcmQoaC5kb21YKTtcbiAgICB9XG4gIH0pO1xufTtcblxuaGFpcmxpbmVzLnByb3RvdHlwZS5jbGljayA9IGZ1bmN0aW9uKGUpIHtcbiAgaWYgKHRoaXMuYWRkVGltZXJfKSB7XG4gICAgLy8gQW5vdGhlciBjbGljayBpcyBpbiBwcm9ncmVzczsgaWdub3JlIHRoaXMgb25lLlxuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBhcmVhID0gZS5keWdyYXBoLmdldEFyZWEoKTtcbiAgdmFyIHh2YWwgPSB0aGlzLmR5Z3JhcGhfLnRvRGF0YVhDb29yZChlLmNhbnZhc3gpO1xuXG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdGhpcy5hZGRUaW1lcl8gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIHRoYXQuYWRkVGltZXJfID0gbnVsbDtcbiAgICB0aGF0LmhhaXJsaW5lc18ucHVzaCh0aGF0LmNyZWF0ZUhhaXJsaW5lKHt4dmFsOiB4dmFsfSkpO1xuXG4gICAgdGhhdC51cGRhdGVIYWlybGluZURpdlBvc2l0aW9ucygpO1xuICAgIHRoYXQudXBkYXRlSGFpcmxpbmVJbmZvKCk7XG4gICAgdGhhdC51cGRhdGVIYWlybGluZVN0eWxlcygpO1xuICAgIHRoYXQuYXR0YWNoSGFpcmxpbmVzVG9DaGFydF8oKTtcblxuICAgICQodGhhdCkudHJpZ2dlckhhbmRsZXIoJ2hhaXJsaW5lQ3JlYXRlZCcsIHtcbiAgICAgIHh2YWw6IHh2YWxcbiAgICB9KTtcbiAgICAkKHRoYXQpLnRyaWdnZXJIYW5kbGVyKCdoYWlybGluZXNDaGFuZ2VkJywge30pO1xuICB9LCBDTElDS19ERUxBWV9NUyk7XG59O1xuXG5oYWlybGluZXMucHJvdG90eXBlLmRibGNsaWNrID0gZnVuY3Rpb24oZSkge1xuICBpZiAodGhpcy5hZGRUaW1lcl8pIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5hZGRUaW1lcl8pO1xuICAgIHRoaXMuYWRkVGltZXJfID0gbnVsbDtcbiAgfVxufTtcblxuaGFpcmxpbmVzLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZGV0YWNoTGFiZWxzKCk7XG59O1xuXG4vLyBQdWJsaWMgQVBJXG5cbi8qKlxuICogVGhpcyBpcyBhIHJlc3RyaWN0ZWQgdmlldyBvZiB0aGlzLmhhaXJsaW5lc18gd2hpY2ggZG9lc24ndCBleHBvc2VcbiAqIGltcGxlbWVudGF0aW9uIGRldGFpbHMgbGlrZSB0aGUgaGFuZGxlIGRpdnMuXG4gKlxuICogQHR5cGVkZWYge1xuICogICB4dmFsOiAgbnVtYmVyLCAgICAgICAvLyB4LXZhbHVlIChpLmUuIG1pbGxpcyBvciBhIHJhdyBudW1iZXIpXG4gKiAgIGludGVycG9sYXRlZDogYm9vbCwgIC8vIGFsdGVybmF0aXZlIGlzIHRvIHNuYXAgdG8gY2xvc2VzdFxuICogICBzZWxlY3RlZDogYm9vbCAgICAgICAvLyB3aGV0aGVyIHRoZSBoYWlybGluZSBpcyBzZWxlY3RlZC5cbiAqIH0gUHVibGljSGFpcmxpbmVcbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7IUhhaXJsaW5lfSBoIEludGVybmFsIGhhaXJsaW5lLlxuICogQHJldHVybiB7IVB1YmxpY0hhaXJsaW5lfSBSZXN0cmljdGVkIHB1YmxpYyB2aWV3IG9mIHRoZSBoYWlybGluZS5cbiAqL1xuaGFpcmxpbmVzLnByb3RvdHlwZS5jcmVhdGVQdWJsaWNIYWlybGluZV8gPSBmdW5jdGlvbihoKSB7XG4gIHJldHVybiB7XG4gICAgeHZhbDogaC54dmFsLFxuICAgIGludGVycG9sYXRlZDogaC5pbnRlcnBvbGF0ZWQsXG4gICAgc2VsZWN0ZWQ6IGguc2VsZWN0ZWRcbiAgfTtcbn07XG5cbi8qKlxuICogQHJldHVybiB7IUFycmF5LjwhUHVibGljSGFpcmxpbmU+fSBUaGUgY3VycmVudCBzZXQgb2YgaGFpcmxpbmVzLCBvcmRlcmVkXG4gKiAgICAgZnJvbSBiYWNrIHRvIGZyb250LlxuICovXG5oYWlybGluZXMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5oYWlybGluZXNfLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGggPSB0aGlzLmhhaXJsaW5lc19baV07XG4gICAgcmVzdWx0LnB1c2godGhpcy5jcmVhdGVQdWJsaWNIYWlybGluZV8oaCkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIENhbGxpbmcgdGhpcyB3aWxsIHJlc3VsdCBpbiBhIGhhaXJsaW5lc0NoYW5nZWQgZXZlbnQgYmVpbmcgdHJpZ2dlcmVkLCBub1xuICogbWF0dGVyIHdoZXRoZXIgaXQgY29uc2lzdHMgb2YgYWRkaXRpb25zLCBkZWxldGlvbnMsIG1vdmVzIG9yIG5vIGNoYW5nZXMgYXRcbiAqIGFsbC5cbiAqXG4gKiBAcGFyYW0geyFBcnJheS48IVB1YmxpY0hhaXJsaW5lPn0gaGFpcmxpbmVzIFRoZSBuZXcgc2V0IG9mIGhhaXJsaW5lcyxcbiAqICAgICBvcmRlcmVkIGZyb20gYmFjayB0byBmcm9udC5cbiAqL1xuaGFpcmxpbmVzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihoYWlybGluZXMpIHtcbiAgLy8gUmUtdXNlIGRpdnMgZnJvbSB0aGUgb2xkIGhhaXJsaW5lcyBhcnJheSBzbyBmYXIgYXMgd2UgY2FuLlxuICAvLyBUaGV5J3JlIGFscmVhZHkgY29ycmVjdGx5IHotb3JkZXJlZC5cbiAgdmFyIGFueUNyZWF0ZWQgPSBmYWxzZTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBoYWlybGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaCA9IGhhaXJsaW5lc1tpXTtcblxuICAgIGlmICh0aGlzLmhhaXJsaW5lc18ubGVuZ3RoID4gaSkge1xuICAgICAgdGhpcy5oYWlybGluZXNfW2ldLnh2YWwgPSBoLnh2YWw7XG4gICAgICB0aGlzLmhhaXJsaW5lc19baV0uaW50ZXJwb2xhdGVkID0gaC5pbnRlcnBvbGF0ZWQ7XG4gICAgICB0aGlzLmhhaXJsaW5lc19baV0uc2VsZWN0ZWQgPSBoLnNlbGVjdGVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhhaXJsaW5lc18ucHVzaCh0aGlzLmNyZWF0ZUhhaXJsaW5lKHtcbiAgICAgICAgeHZhbDogaC54dmFsLFxuICAgICAgICBpbnRlcnBvbGF0ZWQ6IGguaW50ZXJwb2xhdGVkLFxuICAgICAgICBzZWxlY3RlZDogaC5zZWxlY3RlZFxuICAgICAgfSkpO1xuICAgICAgYW55Q3JlYXRlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLy8gSWYgdGhlcmUgYXJlIGFueSByZW1haW5pbmcgaGFpcmxpbmVzLCBkZXN0cm95IHRoZW0uXG4gIHdoaWxlIChoYWlybGluZXMubGVuZ3RoIDwgdGhpcy5oYWlybGluZXNfLmxlbmd0aCkge1xuICAgIHRoaXMucmVtb3ZlSGFpcmxpbmUodGhpcy5oYWlybGluZXNfW2hhaXJsaW5lcy5sZW5ndGhdKTtcbiAgfVxuXG4gIHRoaXMudXBkYXRlSGFpcmxpbmVEaXZQb3NpdGlvbnMoKTtcbiAgdGhpcy51cGRhdGVIYWlybGluZUluZm8oKTtcbiAgdGhpcy51cGRhdGVIYWlybGluZVN0eWxlcygpO1xuICBpZiAoYW55Q3JlYXRlZCkge1xuICAgIHRoaXMuYXR0YWNoSGFpcmxpbmVzVG9DaGFydF8oKTtcbiAgfVxuXG4gICQodGhpcykudHJpZ2dlckhhbmRsZXIoJ2hhaXJsaW5lc0NoYW5nZWQnLCB7fSk7XG59O1xuXG5yZXR1cm4gaGFpcmxpbmVzO1xuXG59KSgpO1xuIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQUEsT0FBTyxDQUFDQyxPQUFPLENBQUNDLFNBQVMsR0FBSSxZQUFXO0VBRXhDLFlBQVk7O0VBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztFQUVBO0VBQ0E7RUFDQSxJQUFJQyxjQUFjLEdBQUcsR0FBRztFQUV4QixJQUFJQyxTQUFTLEdBQUcsU0FBWkEsU0FBUyxDQUFZQyxXQUFXLEVBQUU7SUFDcEM7SUFDQSxJQUFJLENBQUNDLFVBQVUsR0FBRyxFQUFFOztJQUVwQjtJQUNBLElBQUksQ0FBQ0MsVUFBVSxHQUFHLENBQUMsQ0FBQztJQUNwQixJQUFJLENBQUNDLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDcEIsSUFBSSxDQUFDQyxRQUFRLEdBQUcsSUFBSTtJQUVwQixJQUFJLENBQUNDLFNBQVMsR0FBRyxJQUFJO0lBQ3JCTCxXQUFXLEdBQUdBLFdBQVcsSUFBSSxDQUFDLENBQUM7SUFFL0IsSUFBSSxDQUFDTSxVQUFVLEdBQUdOLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJO0VBQ3BELENBQUM7RUFFREQsU0FBUyxDQUFDUSxTQUFTLENBQUNDLFFBQVEsR0FBRyxZQUFXO0lBQ3hDLE9BQU8sa0JBQWtCO0VBQzNCLENBQUM7RUFFRFQsU0FBUyxDQUFDUSxTQUFTLENBQUNFLFFBQVEsR0FBRyxVQUFTQyxDQUFDLEVBQUU7SUFDekMsSUFBSSxDQUFDTixRQUFRLEdBQUdNLENBQUM7SUFDakIsSUFBSSxDQUFDVCxVQUFVLEdBQUcsRUFBRTtJQUVwQixPQUFPO01BQ0xVLFlBQVksRUFBRSxJQUFJLENBQUNBLFlBQVk7TUFDL0JDLEtBQUssRUFBRSxJQUFJLENBQUNBLEtBQUs7TUFDakJDLFFBQVEsRUFBRSxJQUFJLENBQUNBLFFBQVE7TUFDdkJDLGFBQWEsRUFBRSxJQUFJLENBQUNBO0lBQ3RCLENBQUM7RUFDSCxDQUFDO0VBRURmLFNBQVMsQ0FBQ1EsU0FBUyxDQUFDUSxZQUFZLEdBQUcsWUFBVztJQUM1QyxLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxJQUFJLENBQUNmLFVBQVUsQ0FBQ2dCLE1BQU0sRUFBRUQsQ0FBQyxFQUFFLEVBQUU7TUFDL0MsSUFBSUUsQ0FBQyxHQUFHLElBQUksQ0FBQ2pCLFVBQVUsQ0FBQ2UsQ0FBQyxDQUFDO01BQzFCRyxDQUFDLENBQUNELENBQUMsQ0FBQ0UsT0FBTyxDQUFDLENBQUNDLE1BQU0sRUFBRTtNQUNyQkYsQ0FBQyxDQUFDRCxDQUFDLENBQUNJLE9BQU8sQ0FBQyxDQUFDRCxNQUFNLEVBQUU7TUFDckIsSUFBSSxDQUFDcEIsVUFBVSxDQUFDZSxDQUFDLENBQUMsR0FBRyxJQUFJO0lBQzNCO0lBQ0EsSUFBSSxDQUFDZixVQUFVLEdBQUcsRUFBRTtFQUN0QixDQUFDO0VBRURGLFNBQVMsQ0FBQ1EsU0FBUyxDQUFDZ0Isa0JBQWtCLEdBQUcsVUFBU0wsQ0FBQyxFQUFFTSxLQUFLLEVBQUVDLEVBQUUsRUFBRTtJQUM5RCxJQUFJQyxJQUFJLEdBQUcsSUFBSSxDQUFDdEIsUUFBUSxDQUFDdUIsT0FBTyxFQUFFO0lBQ2xDLElBQUlDLE9BQU8sR0FBR1YsQ0FBQyxDQUFDVyxJQUFJO0lBQ3BCWCxDQUFDLENBQUNXLElBQUksR0FBRyxJQUFJLENBQUN6QixRQUFRLENBQUMwQixZQUFZLENBQUNMLEVBQUUsQ0FBQ00sUUFBUSxDQUFDQyxJQUFJLENBQUM7SUFDckQsSUFBSSxDQUFDQyxpQkFBaUIsQ0FBQ2YsQ0FBQyxDQUFDO0lBQ3pCLElBQUksQ0FBQ2dCLDBCQUEwQixFQUFFO0lBQ2pDLElBQUksQ0FBQ0Msa0JBQWtCLEVBQUU7SUFDekIsSUFBSSxDQUFDQyxvQkFBb0IsRUFBRTtJQUMzQmpCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ2tCLGNBQWMsQ0FBQyxlQUFlLEVBQUU7TUFDdENULE9BQU8sRUFBRUEsT0FBTztNQUNoQlUsT0FBTyxFQUFFcEIsQ0FBQyxDQUFDVztJQUNiLENBQUMsQ0FBQztJQUNGVixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUNrQixjQUFjLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDaEQsQ0FBQzs7RUFFRDtFQUNBO0VBQ0F0QyxTQUFTLENBQUNRLFNBQVMsQ0FBQ2dDLGNBQWMsR0FBRyxVQUFTQyxLQUFLLEVBQUU7SUFDbkQsSUFBSXRCLENBQUM7SUFDTCxJQUFJdUIsSUFBSSxHQUFHLElBQUk7SUFFZixJQUFJQyxpQkFBaUIsR0FBR3ZCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQ3dCLEdBQUcsQ0FBQztNQUNwQyxPQUFPLEVBQUUsS0FBSztNQUNkLGFBQWEsRUFBRSxNQUFNO01BQ3JCLFVBQVUsRUFBRSxVQUFVO01BQ3RCLFNBQVMsRUFBRTtJQUNiLENBQUMsQ0FBQyxDQUNEQyxRQUFRLENBQUMsa0JBQWtCLENBQUM7SUFFL0IsSUFBSUMsUUFBUSxHQUFHMUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDd0IsR0FBRyxDQUFDO01BQzdCLE9BQU8sRUFBRSxLQUFLO01BQ2QsVUFBVSxFQUFFLFVBQVU7TUFDdEIsTUFBTSxFQUFFLEtBQUs7TUFDYixZQUFZLEVBQUUsT0FBTztNQUNyQixRQUFRLEVBQUU7SUFDWixDQUFDLENBQUM7SUFDRkUsUUFBUSxDQUFDQyxRQUFRLENBQUNKLGlCQUFpQixDQUFDO0lBRXBDLElBQUlLLFFBQVEsR0FBRzVCLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDNkIsS0FBSyxFQUFFLENBQUNDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQ04sR0FBRyxDQUFDO01BQ2hFLFVBQVUsRUFBRTtJQUNkLENBQUMsQ0FBQyxDQUNETyxJQUFJLEVBQUU7O0lBRVQ7SUFDQS9CLENBQUMsQ0FBQyxDQUFDNEIsUUFBUSxDQUFDSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUVULGlCQUFpQixDQUFDUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUMzQ0MsU0FBUyxDQUFDO01BQ1QsTUFBTSxFQUFFLEdBQUc7TUFDWCxNQUFNLEVBQUUsY0FBUzVCLEtBQUssRUFBRUMsRUFBRSxFQUFFO1FBQzFCZ0IsSUFBSSxDQUFDbEIsa0JBQWtCLENBQUNMLENBQUMsRUFBRU0sS0FBSyxFQUFFQyxFQUFFLENBQUM7TUFDdkM7TUFDQTtJQUNGLENBQUMsQ0FBQzs7SUFFSlAsQ0FBQyxHQUFHQyxDQUFDLENBQUNrQyxNQUFNLENBQUM7TUFDWEMsWUFBWSxFQUFFLElBQUk7TUFDbEJDLFFBQVEsRUFBRSxLQUFLO01BQ2ZuQyxPQUFPLEVBQUVzQixpQkFBaUIsQ0FBQ1MsR0FBRyxDQUFDLENBQUMsQ0FBQztNQUNqQzdCLE9BQU8sRUFBRXlCLFFBQVEsQ0FBQ0ksR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQyxFQUFFWCxLQUFLLENBQUM7SUFFVCxJQUFJZ0IsSUFBSSxHQUFHLElBQUk7SUFDZlQsUUFBUSxDQUFDVSxFQUFFLENBQUMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFVBQVNDLENBQUMsRUFBRTtNQUN4REYsSUFBSSxDQUFDRyxjQUFjLENBQUN6QyxDQUFDLENBQUM7TUFDdEJDLENBQUMsQ0FBQ3FDLElBQUksQ0FBQyxDQUFDbkIsY0FBYyxDQUFDLGlCQUFpQixFQUFFO1FBQ3hDUixJQUFJLEVBQUVYLENBQUMsQ0FBQ1c7TUFDVixDQUFDLENBQUM7TUFDRlYsQ0FBQyxDQUFDcUMsSUFBSSxDQUFDLENBQUNuQixjQUFjLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUM7TUFDOUNxQixDQUFDLENBQUNFLGVBQWUsRUFBRSxDQUFDLENBQUU7SUFDeEIsQ0FBQyxDQUFDLENBQUNILEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBVztNQUN4QkQsSUFBSSxDQUFDdkIsaUJBQWlCLENBQUNmLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUM7SUFFRixPQUFPQSxDQUFDO0VBQ1YsQ0FBQzs7RUFFRDtFQUNBbkIsU0FBUyxDQUFDUSxTQUFTLENBQUMwQixpQkFBaUIsR0FBRyxVQUFTZixDQUFDLEVBQUU7SUFDbEQsSUFBSTJDLEdBQUcsR0FBRyxJQUFJLENBQUN6RCxRQUFRLENBQUMwRCxRQUFRO0lBQ2hDM0MsQ0FBQyxDQUFDRCxDQUFDLENBQUNJLE9BQU8sQ0FBQyxDQUFDd0IsUUFBUSxDQUFDZSxHQUFHLENBQUM7SUFDMUIxQyxDQUFDLENBQUNELENBQUMsQ0FBQ0UsT0FBTyxDQUFDLENBQUMwQixRQUFRLENBQUNlLEdBQUcsQ0FBQztJQUUxQixJQUFJRSxHQUFHLEdBQUcsSUFBSSxDQUFDOUQsVUFBVSxDQUFDK0QsT0FBTyxDQUFDOUMsQ0FBQyxDQUFDO0lBQ3BDLElBQUksQ0FBQ2pCLFVBQVUsQ0FBQ2dFLE1BQU0sQ0FBQ0YsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM5QixJQUFJLENBQUM5RCxVQUFVLENBQUNpRSxJQUFJLENBQUNoRCxDQUFDLENBQUM7RUFDekIsQ0FBQzs7RUFFRDtFQUNBbkIsU0FBUyxDQUFDUSxTQUFTLENBQUMyQiwwQkFBMEIsR0FBRyxZQUFXO0lBQzFELElBQUl4QixDQUFDLEdBQUcsSUFBSSxDQUFDTixRQUFRO0lBQ3JCLElBQUkrRCxNQUFNLEdBQUcsSUFBSSxDQUFDL0QsUUFBUSxDQUFDdUIsT0FBTyxFQUFFO0lBQ3BDLElBQUl5QyxTQUFTLEdBQUdELE1BQU0sQ0FBQ0UsQ0FBQztNQUFFQyxVQUFVLEdBQUdILE1BQU0sQ0FBQ0UsQ0FBQyxHQUFHRixNQUFNLENBQUNJLENBQUM7SUFDMUQsSUFBSVYsR0FBRyxHQUFHLElBQUksQ0FBQ3pELFFBQVEsQ0FBQzBELFFBQVE7SUFDaEMsSUFBSVUsR0FBRyxHQUFHN0UsT0FBTyxDQUFDOEUsT0FBTyxDQUFDWixHQUFHLENBQUM7SUFDOUIsSUFBSWEsR0FBRyxHQUFHLENBQUNQLE1BQU0sQ0FBQ0UsQ0FBQyxHQUFHRyxHQUFHLENBQUNILENBQUMsRUFBRUYsTUFBTSxDQUFDUSxDQUFDLEdBQUdILEdBQUcsQ0FBQ0csQ0FBQyxDQUFDO0lBQzlDRCxHQUFHLENBQUNSLElBQUksQ0FBQ1EsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHUCxNQUFNLENBQUNJLENBQUMsQ0FBQztJQUMzQkcsR0FBRyxDQUFDUixJQUFJLENBQUNRLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBR1AsTUFBTSxDQUFDakQsQ0FBQyxDQUFDO0lBRTNCQyxDQUFDLENBQUN5RCxJQUFJLENBQUMsSUFBSSxDQUFDM0UsVUFBVSxFQUFFLFVBQVM4RCxHQUFHLEVBQUU3QyxDQUFDLEVBQUU7TUFDdkMsSUFBSWMsSUFBSSxHQUFHdEIsQ0FBQyxDQUFDbUUsV0FBVyxDQUFDM0QsQ0FBQyxDQUFDVyxJQUFJLENBQUM7TUFDaENYLENBQUMsQ0FBQzRELElBQUksR0FBRzlDLElBQUksQ0FBQyxDQUFFO01BQ2hCYixDQUFDLENBQUNELENBQUMsQ0FBQ0UsT0FBTyxDQUFDLENBQUN1QixHQUFHLENBQUM7UUFDZixNQUFNLEVBQUVYLElBQUksR0FBRyxJQUFJO1FBQ25CLEtBQUssRUFBRW1DLE1BQU0sQ0FBQ1EsQ0FBQyxHQUFHLElBQUk7UUFDdEIsUUFBUSxFQUFFUixNQUFNLENBQUNqRCxDQUFDLEdBQUc7TUFDdkIsQ0FBQyxDQUFDLENBQUMsQ0FBRTtNQUNMQyxDQUFDLENBQUNELENBQUMsQ0FBQ0ksT0FBTyxDQUFDLENBQUNxQixHQUFHLENBQUM7UUFDZixNQUFNLEVBQUVYLElBQUksR0FBRyxJQUFJO1FBQ25CLEtBQUssRUFBRW1DLE1BQU0sQ0FBQ1EsQ0FBQyxHQUFHO01BQ3BCLENBQUMsQ0FBQyxDQUFDdkIsU0FBUyxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUVzQixHQUFHLENBQUM7TUFFMUMsSUFBSUssT0FBTyxHQUFJL0MsSUFBSSxJQUFJb0MsU0FBUyxJQUFJcEMsSUFBSSxJQUFJc0MsVUFBVztNQUN2RG5ELENBQUMsQ0FBQyxDQUFDRCxDQUFDLENBQUNJLE9BQU8sRUFBRUosQ0FBQyxDQUFDRSxPQUFPLENBQUMsQ0FBQyxDQUFDNEQsTUFBTSxDQUFDRCxPQUFPLENBQUM7SUFDM0MsQ0FBQyxDQUFDO0VBQ0osQ0FBQzs7RUFFRDtFQUNBaEYsU0FBUyxDQUFDUSxTQUFTLENBQUM2QixvQkFBb0IsR0FBRyxZQUFXO0lBQ3BEakIsQ0FBQyxDQUFDeUQsSUFBSSxDQUFDLElBQUksQ0FBQzNFLFVBQVUsRUFBRSxVQUFTOEQsR0FBRyxFQUFFN0MsQ0FBQyxFQUFFO01BQ3ZDQyxDQUFDLENBQUMsQ0FBQ0QsQ0FBQyxDQUFDSSxPQUFPLEVBQUVKLENBQUMsQ0FBQ0UsT0FBTyxDQUFDLENBQUMsQ0FBQzZELFdBQVcsQ0FBQyxVQUFVLEVBQUUvRCxDQUFDLENBQUNxQyxRQUFRLENBQUM7SUFDL0QsQ0FBQyxDQUFDO0VBQ0osQ0FBQzs7RUFFRDtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0F4RCxTQUFTLENBQUNtRixnQkFBZ0IsR0FBRyxVQUFTeEUsQ0FBQyxFQUFFbUIsSUFBSSxFQUFFc0QsR0FBRyxFQUFFO0lBQ2xELElBQUlDLE9BQU8sR0FBRyxJQUFJO01BQUVDLE9BQU8sR0FBRyxJQUFJO0lBQ2xDLElBQUlDLE9BQU8sR0FBRzVFLENBQUMsQ0FBQzRFLE9BQU8sRUFBRTtJQUN6QixLQUFLLElBQUlDLEdBQUcsR0FBRyxDQUFDLEVBQUVBLEdBQUcsR0FBR0QsT0FBTyxFQUFFQyxHQUFHLEVBQUUsRUFBRTtNQUN0QyxJQUFJQyxJQUFJLEdBQUc5RSxDQUFDLENBQUMrRSxRQUFRLENBQUNGLEdBQUcsRUFBRUosR0FBRyxDQUFDO01BQy9CLElBQUlLLElBQUksS0FBSyxJQUFJLElBQUlBLElBQUksS0FBS0UsU0FBUyxJQUFJQyxLQUFLLENBQUNILElBQUksQ0FBQyxFQUFFO01BRXhELElBQUlJLE9BQU8sR0FBR2xGLENBQUMsQ0FBQytFLFFBQVEsQ0FBQ0YsR0FBRyxFQUFFLENBQUMsQ0FBQztNQUNoQyxJQUFJSyxPQUFPLElBQUkvRCxJQUFJLEVBQUV1RCxPQUFPLEdBQUdHLEdBQUc7TUFFbEMsSUFBSUssT0FBTyxJQUFJL0QsSUFBSSxFQUFFO1FBQ25Cd0QsT0FBTyxHQUFHRSxHQUFHO1FBQ2I7TUFDRjtJQUNGO0lBRUEsT0FBTyxDQUFDSCxPQUFPLEVBQUVDLE9BQU8sQ0FBQztFQUMzQixDQUFDOztFQUVEO0VBQ0F0RixTQUFTLENBQUNRLFNBQVMsQ0FBQzRCLGtCQUFrQixHQUFHLFlBQVc7SUFDbEQsSUFBSTBELElBQUksR0FBRyxTQUFTO0lBRXBCLElBQUluRixDQUFDLEdBQUcsSUFBSSxDQUFDTixRQUFRO0lBQ3JCLElBQUkwRixNQUFNLEdBQUdwRixDQUFDLENBQUNxRixVQUFVLEVBQUU7SUFDM0IsSUFBSXZDLElBQUksR0FBRyxJQUFJO0lBQ2ZyQyxDQUFDLENBQUN5RCxJQUFJLENBQUMsSUFBSSxDQUFDM0UsVUFBVSxFQUFFLFVBQVM4RCxHQUFHLEVBQUU3QyxDQUFDLEVBQUU7TUFDdkM7TUFDQSxJQUFJOEUsU0FBUyxHQUFHLEVBQUU7TUFDbEIsSUFBSUMsTUFBTSxHQUFHdkYsQ0FBQyxDQUFDd0YsU0FBUyxFQUFFO01BQzFCLElBQUlYLEdBQUcsRUFBRUgsT0FBTyxFQUFFQyxPQUFPO01BRXpCLElBQUksQ0FBQ25FLENBQUMsQ0FBQ29DLFlBQVksRUFBRTtRQUNuQjtRQUNBO1FBQ0FpQyxHQUFHLEdBQUc3RSxDQUFDLENBQUN5RixjQUFjLENBQUN6RixDQUFDLENBQUNtRSxXQUFXLENBQUMzRCxDQUFDLENBQUNXLElBQUksQ0FBQyxDQUFDO1FBQzdDLEtBQUssSUFBSWIsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHTixDQUFDLENBQUMwRixVQUFVLEVBQUUsRUFBRXBGLENBQUMsRUFBRSxFQUFFO1VBQ3ZDZ0YsU0FBUyxDQUFDOUIsSUFBSSxDQUFDO1lBQ2JtQyxPQUFPLEVBQUUsQ0FBQztZQUFHO1lBQ2JDLE9BQU8sRUFBRSxDQUFDO1lBQUc7WUFDYnpFLElBQUksRUFBRVgsQ0FBQyxDQUFDVyxJQUFJO1lBQ1oyRCxJQUFJLEVBQUU5RSxDQUFDLENBQUMrRSxRQUFRLENBQUNGLEdBQUcsRUFBRXZFLENBQUMsQ0FBQztZQUN4QnVGLElBQUksRUFBRU4sTUFBTSxDQUFDakYsQ0FBQztVQUNoQixDQUFDLENBQUM7UUFDSjtNQUNGLENBQUMsTUFBTTtRQUNMO1FBQ0EsS0FBSyxJQUFJQSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdOLENBQUMsQ0FBQzBGLFVBQVUsRUFBRSxFQUFFcEYsQ0FBQyxFQUFFLEVBQUU7VUFDdkMsSUFBSXdGLFdBQVcsR0FBR3pHLFNBQVMsQ0FBQ21GLGdCQUFnQixDQUFDeEUsQ0FBQyxFQUFFUSxDQUFDLENBQUNXLElBQUksRUFBRWIsQ0FBQyxDQUFDO1VBQzFEb0UsT0FBTyxHQUFHb0IsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFbkIsT0FBTyxHQUFHbUIsV0FBVyxDQUFDLENBQUMsQ0FBQzs7VUFFbEQ7VUFDQTtVQUNBLElBQUlwQixPQUFPLEtBQUssSUFBSSxFQUFFQSxPQUFPLEdBQUdDLE9BQU87VUFDdkMsSUFBSUEsT0FBTyxLQUFLLElBQUksRUFBRUEsT0FBTyxHQUFHRCxPQUFPOztVQUV2QztVQUNBLElBQUlxQixLQUFLLEdBQUcvRixDQUFDLENBQUMrRSxRQUFRLENBQUNMLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDOUJzQixLQUFLLEdBQUdoRyxDQUFDLENBQUMrRSxRQUFRLENBQUNKLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDOUJzQixLQUFLLEdBQUdqRyxDQUFDLENBQUMrRSxRQUFRLENBQUNMLE9BQU8sRUFBRXBFLENBQUMsQ0FBQztZQUM5QjRGLEtBQUssR0FBR2xHLENBQUMsQ0FBQytFLFFBQVEsQ0FBQ0osT0FBTyxFQUFFckUsQ0FBQyxDQUFDO1lBQzlCNkYsSUFBSSxHQUFHekIsT0FBTyxJQUFJQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUNuRSxDQUFDLENBQUNXLElBQUksR0FBRzRFLEtBQUssS0FBS0MsS0FBSyxHQUFHRCxLQUFLLENBQUM7WUFDbEVqQixJQUFJLEdBQUdxQixJQUFJLEdBQUdELEtBQUssR0FBRyxDQUFDLENBQUMsR0FBR0MsSUFBSSxJQUFJRixLQUFLO1VBRTVDWCxTQUFTLENBQUM5QixJQUFJLENBQUM7WUFDYm1DLE9BQU8sRUFBRSxDQUFDO1lBQUc7WUFDYkMsT0FBTyxFQUFFLENBQUM7WUFBRztZQUNiekUsSUFBSSxFQUFFWCxDQUFDLENBQUNXLElBQUk7WUFDWjJELElBQUksRUFBRUEsSUFBSTtZQUNWSixPQUFPLEVBQUVBLE9BQU87WUFDaEJDLE9BQU8sRUFBRUEsT0FBTztZQUNoQmtCLElBQUksRUFBRU4sTUFBTSxDQUFDakYsQ0FBQztVQUNoQixDQUFDLENBQUM7UUFDSjtNQUNGO01BRUEsSUFBSXdDLElBQUksQ0FBQ2xELFVBQVUsRUFBRTtRQUNuQmtELElBQUksQ0FBQ2xELFVBQVUsQ0FBQ1ksQ0FBQyxDQUFDSSxPQUFPLEVBQUU7VUFDekJ3RixVQUFVLEVBQUV2QixHQUFHO1VBQ2Z3QixNQUFNLEVBQUVmLFNBQVM7VUFDakJnQixRQUFRLEVBQUV4RCxJQUFJLENBQUN5RCxxQkFBcUIsQ0FBQy9GLENBQUMsQ0FBQztVQUN2Q2dHLE9BQU8sRUFBRXhHO1FBQ1gsQ0FBQyxDQUFDO01BQ0osQ0FBQyxNQUFNO1FBQ0wsSUFBSXlHLElBQUksR0FBR3hILE9BQU8sQ0FBQ0MsT0FBTyxDQUFDd0gsTUFBTSxDQUFDQyxrQkFBa0IsQ0FBQzNHLENBQUMsRUFBRVEsQ0FBQyxDQUFDVyxJQUFJLEVBQUVtRSxTQUFTLEVBQUUsRUFBRSxDQUFDO1FBQzlFN0UsQ0FBQyxDQUFDLGtCQUFrQixFQUFFRCxDQUFDLENBQUNJLE9BQU8sQ0FBQyxDQUFDNkYsSUFBSSxDQUFDQSxJQUFJLENBQUM7TUFDN0M7SUFDRixDQUFDLENBQUM7RUFDSixDQUFDOztFQUVEO0VBQ0E7RUFDQXBILFNBQVMsQ0FBQ1EsU0FBUyxDQUFDK0csdUJBQXVCLEdBQUcsWUFBVztJQUN2RCxJQUFJekQsR0FBRyxHQUFHLElBQUksQ0FBQ3pELFFBQVEsQ0FBQzBELFFBQVE7SUFDaEMzQyxDQUFDLENBQUN5RCxJQUFJLENBQUMsSUFBSSxDQUFDM0UsVUFBVSxFQUFFLFVBQVM4RCxHQUFHLEVBQUU3QyxDQUFDLEVBQUU7TUFDdkNDLENBQUMsQ0FBQyxDQUFDRCxDQUFDLENBQUNFLE9BQU8sRUFBRUYsQ0FBQyxDQUFDSSxPQUFPLENBQUMsQ0FBQyxDQUFDd0IsUUFBUSxDQUFDZSxHQUFHLENBQUM7SUFDekMsQ0FBQyxDQUFDO0VBQ0osQ0FBQzs7RUFFRDtFQUNBOUQsU0FBUyxDQUFDUSxTQUFTLENBQUNvRCxjQUFjLEdBQUcsVUFBU3pDLENBQUMsRUFBRTtJQUMvQyxJQUFJNkMsR0FBRyxHQUFHLElBQUksQ0FBQzlELFVBQVUsQ0FBQytELE9BQU8sQ0FBQzlDLENBQUMsQ0FBQztJQUNwQyxJQUFJNkMsR0FBRyxJQUFJLENBQUMsRUFBRTtNQUNaLElBQUksQ0FBQzlELFVBQVUsQ0FBQ2dFLE1BQU0sQ0FBQ0YsR0FBRyxFQUFFLENBQUMsQ0FBQztNQUM5QjVDLENBQUMsQ0FBQyxDQUFDRCxDQUFDLENBQUNFLE9BQU8sRUFBRUYsQ0FBQyxDQUFDSSxPQUFPLENBQUMsQ0FBQyxDQUFDRCxNQUFNLEVBQUU7SUFDcEMsQ0FBQyxNQUFNO01BQ0wxQixPQUFPLENBQUM0SCxJQUFJLENBQUMsd0NBQXdDLENBQUM7SUFDeEQ7RUFDRixDQUFDO0VBRUR4SCxTQUFTLENBQUNRLFNBQVMsQ0FBQ0ksWUFBWSxHQUFHLFVBQVMrQyxDQUFDLEVBQUU7SUFDN0MsSUFBSWhELENBQUMsR0FBR2dELENBQUMsQ0FBQ3dELE9BQU87O0lBRWpCO0lBQ0EsSUFBSSxJQUFJLENBQUNqSCxVQUFVLENBQUNnQixNQUFNLEtBQUssQ0FBQyxFQUFFO0lBRWxDLElBQUksQ0FBQ2lCLDBCQUEwQixFQUFFO0lBQ2pDLElBQUksQ0FBQ29GLHVCQUF1QixFQUFFO0lBQzlCLElBQUksQ0FBQ25GLGtCQUFrQixFQUFFO0lBQ3pCLElBQUksQ0FBQ0Msb0JBQW9CLEVBQUU7RUFDN0IsQ0FBQztFQUVEckMsU0FBUyxDQUFDUSxTQUFTLENBQUNPLGFBQWEsR0FBRyxVQUFTNEMsQ0FBQyxFQUFFO0lBQzlDO0lBQ0E7SUFDQTtJQUNBLElBQUloRCxDQUFDLEdBQUcsSUFBSSxDQUFDTixRQUFRO0lBQ3JCZSxDQUFDLENBQUN5RCxJQUFJLENBQUMsSUFBSSxDQUFDM0UsVUFBVSxFQUFFLFVBQVM4RCxHQUFHLEVBQUU3QyxDQUFDLEVBQUU7TUFDdkMsSUFBSUEsQ0FBQyxDQUFDc0csY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQzVCdEcsQ0FBQyxDQUFDVyxJQUFJLEdBQUduQixDQUFDLENBQUNvQixZQUFZLENBQUNaLENBQUMsQ0FBQzRELElBQUksQ0FBQztNQUNqQztJQUNGLENBQUMsQ0FBQztFQUNKLENBQUM7RUFFRC9FLFNBQVMsQ0FBQ1EsU0FBUyxDQUFDSyxLQUFLLEdBQUcsVUFBUzhDLENBQUMsRUFBRTtJQUN0QyxJQUFJLElBQUksQ0FBQ3JELFNBQVMsRUFBRTtNQUNsQjtNQUNBO0lBQ0Y7SUFFQSxJQUFJcUIsSUFBSSxHQUFHZ0MsQ0FBQyxDQUFDd0QsT0FBTyxDQUFDdkYsT0FBTyxFQUFFO0lBQzlCLElBQUlFLElBQUksR0FBRyxJQUFJLENBQUN6QixRQUFRLENBQUMwQixZQUFZLENBQUM0QixDQUFDLENBQUMyQyxPQUFPLENBQUM7SUFFaEQsSUFBSTdDLElBQUksR0FBRyxJQUFJO0lBQ2YsSUFBSSxDQUFDbkQsU0FBUyxHQUFHb0gsVUFBVSxDQUFDLFlBQVc7TUFDckNqRSxJQUFJLENBQUNuRCxTQUFTLEdBQUcsSUFBSTtNQUNyQm1ELElBQUksQ0FBQ3ZELFVBQVUsQ0FBQ2lFLElBQUksQ0FBQ1YsSUFBSSxDQUFDakIsY0FBYyxDQUFDO1FBQUNWLElBQUksRUFBRUE7TUFBSSxDQUFDLENBQUMsQ0FBQztNQUV2RDJCLElBQUksQ0FBQ3RCLDBCQUEwQixFQUFFO01BQ2pDc0IsSUFBSSxDQUFDckIsa0JBQWtCLEVBQUU7TUFDekJxQixJQUFJLENBQUNwQixvQkFBb0IsRUFBRTtNQUMzQm9CLElBQUksQ0FBQzhELHVCQUF1QixFQUFFO01BRTlCbkcsQ0FBQyxDQUFDcUMsSUFBSSxDQUFDLENBQUNuQixjQUFjLENBQUMsaUJBQWlCLEVBQUU7UUFDeENSLElBQUksRUFBRUE7TUFDUixDQUFDLENBQUM7TUFDRlYsQ0FBQyxDQUFDcUMsSUFBSSxDQUFDLENBQUNuQixjQUFjLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQyxFQUFFdkMsY0FBYyxDQUFDO0VBQ3BCLENBQUM7RUFFREMsU0FBUyxDQUFDUSxTQUFTLENBQUNNLFFBQVEsR0FBRyxVQUFTNkMsQ0FBQyxFQUFFO0lBQ3pDLElBQUksSUFBSSxDQUFDckQsU0FBUyxFQUFFO01BQ2xCcUgsWUFBWSxDQUFDLElBQUksQ0FBQ3JILFNBQVMsQ0FBQztNQUM1QixJQUFJLENBQUNBLFNBQVMsR0FBRyxJQUFJO0lBQ3ZCO0VBQ0YsQ0FBQztFQUVETixTQUFTLENBQUNRLFNBQVMsQ0FBQ29ILE9BQU8sR0FBRyxZQUFXO0lBQ3ZDLElBQUksQ0FBQzVHLFlBQVksRUFBRTtFQUNyQixDQUFDOztFQUVEOztFQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztFQUVBO0FBQ0E7QUFDQTtBQUNBO0VBQ0FoQixTQUFTLENBQUNRLFNBQVMsQ0FBQzBHLHFCQUFxQixHQUFHLFVBQVMvRixDQUFDLEVBQUU7SUFDdEQsT0FBTztNQUNMVyxJQUFJLEVBQUVYLENBQUMsQ0FBQ1csSUFBSTtNQUNaeUIsWUFBWSxFQUFFcEMsQ0FBQyxDQUFDb0MsWUFBWTtNQUM1QkMsUUFBUSxFQUFFckMsQ0FBQyxDQUFDcUM7SUFDZCxDQUFDO0VBQ0gsQ0FBQzs7RUFFRDtBQUNBO0FBQ0E7QUFDQTtFQUNBeEQsU0FBUyxDQUFDUSxTQUFTLENBQUM0QyxHQUFHLEdBQUcsWUFBVztJQUNuQyxJQUFJeUUsTUFBTSxHQUFHLEVBQUU7SUFDZixLQUFLLElBQUk1RyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsSUFBSSxDQUFDZixVQUFVLENBQUNnQixNQUFNLEVBQUVELENBQUMsRUFBRSxFQUFFO01BQy9DLElBQUlFLENBQUMsR0FBRyxJQUFJLENBQUNqQixVQUFVLENBQUNlLENBQUMsQ0FBQztNQUMxQjRHLE1BQU0sQ0FBQzFELElBQUksQ0FBQyxJQUFJLENBQUMrQyxxQkFBcUIsQ0FBQy9GLENBQUMsQ0FBQyxDQUFDO0lBQzVDO0lBQ0EsT0FBTzBHLE1BQU07RUFDZixDQUFDOztFQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDQTdILFNBQVMsQ0FBQ1EsU0FBUyxDQUFDc0gsR0FBRyxHQUFHLFVBQVM5SCxTQUFTLEVBQUU7SUFDNUM7SUFDQTtJQUNBLElBQUkrSCxVQUFVLEdBQUcsS0FBSztJQUN0QixLQUFLLElBQUk5RyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdqQixTQUFTLENBQUNrQixNQUFNLEVBQUVELENBQUMsRUFBRSxFQUFFO01BQ3pDLElBQUlFLENBQUMsR0FBR25CLFNBQVMsQ0FBQ2lCLENBQUMsQ0FBQztNQUVwQixJQUFJLElBQUksQ0FBQ2YsVUFBVSxDQUFDZ0IsTUFBTSxHQUFHRCxDQUFDLEVBQUU7UUFDOUIsSUFBSSxDQUFDZixVQUFVLENBQUNlLENBQUMsQ0FBQyxDQUFDYSxJQUFJLEdBQUdYLENBQUMsQ0FBQ1csSUFBSTtRQUNoQyxJQUFJLENBQUM1QixVQUFVLENBQUNlLENBQUMsQ0FBQyxDQUFDc0MsWUFBWSxHQUFHcEMsQ0FBQyxDQUFDb0MsWUFBWTtRQUNoRCxJQUFJLENBQUNyRCxVQUFVLENBQUNlLENBQUMsQ0FBQyxDQUFDdUMsUUFBUSxHQUFHckMsQ0FBQyxDQUFDcUMsUUFBUTtNQUMxQyxDQUFDLE1BQU07UUFDTCxJQUFJLENBQUN0RCxVQUFVLENBQUNpRSxJQUFJLENBQUMsSUFBSSxDQUFDM0IsY0FBYyxDQUFDO1VBQ3ZDVixJQUFJLEVBQUVYLENBQUMsQ0FBQ1csSUFBSTtVQUNaeUIsWUFBWSxFQUFFcEMsQ0FBQyxDQUFDb0MsWUFBWTtVQUM1QkMsUUFBUSxFQUFFckMsQ0FBQyxDQUFDcUM7UUFDZCxDQUFDLENBQUMsQ0FBQztRQUNIdUUsVUFBVSxHQUFHLElBQUk7TUFDbkI7SUFDRjs7SUFFQTtJQUNBLE9BQU8vSCxTQUFTLENBQUNrQixNQUFNLEdBQUcsSUFBSSxDQUFDaEIsVUFBVSxDQUFDZ0IsTUFBTSxFQUFFO01BQ2hELElBQUksQ0FBQzBDLGNBQWMsQ0FBQyxJQUFJLENBQUMxRCxVQUFVLENBQUNGLFNBQVMsQ0FBQ2tCLE1BQU0sQ0FBQyxDQUFDO0lBQ3hEO0lBRUEsSUFBSSxDQUFDaUIsMEJBQTBCLEVBQUU7SUFDakMsSUFBSSxDQUFDQyxrQkFBa0IsRUFBRTtJQUN6QixJQUFJLENBQUNDLG9CQUFvQixFQUFFO0lBQzNCLElBQUkwRixVQUFVLEVBQUU7TUFDZCxJQUFJLENBQUNSLHVCQUF1QixFQUFFO0lBQ2hDO0lBRUFuRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUNrQixjQUFjLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDaEQsQ0FBQztFQUVELE9BQU90QyxTQUFTO0FBRWhCLENBQUMsRUFBRyJ9