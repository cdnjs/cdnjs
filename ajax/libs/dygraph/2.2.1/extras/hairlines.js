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

/* loader wrapper to allow browser use and ES6 imports */
(function _extras_hairlines_wrapper() {
  'use strict';

  var Dygraph;
  if (window.Dygraph) {
    Dygraph = window.Dygraph;
  } else if (typeof module !== 'undefined') {
    Dygraph = require('../dygraph');
    if (typeof Dygraph.NAME === 'undefined' && typeof Dygraph["default"] !== 'undefined') Dygraph = Dygraph["default"];
  }
  /* end of loader wrapper header */

  Dygraph.Plugins.Hairlines = function _extras_hairlines_closure() {
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
    hairlines.prototype.toString = function toString() {
      return "Hairlines Plugin";
    };
    hairlines.prototype.activate = function activate(g) {
      this.dygraph_ = g;
      this.hairlines_ = [];
      return {
        didDrawChart: this.didDrawChart,
        click: this.click,
        dblclick: this.dblclick,
        dataDidUpdate: this.dataDidUpdate
      };
    };
    hairlines.prototype.detachLabels = function detachLabels() {
      for (var i = 0; i < this.hairlines_.length; i++) {
        var h = this.hairlines_[i];
        $(h.lineDiv).remove();
        $(h.infoDiv).remove();
        this.hairlines_[i] = null;
      }
      this.hairlines_ = [];
    };
    hairlines.prototype.hairlineWasDragged = function hairlineWasDragged(h, event, ui) {
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
    hairlines.prototype.createHairline = function createHairline(props) {
      var h;
      var self = this;
      var $lineContainerDiv = $('<div />').css({
        'width': '6px',
        'margin-left': '-3px',
        'position': 'absolute',
        'z-index': '10'
      }).addClass('dygraph-hairline');
      var $lineDiv = $('<div />').css({
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
        'drag': function dragWrapper_(event, ui) {
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
      $infoDiv.on('click', '.hairline-kill-button', function clickEvent_(e) {
        that.removeHairline(h);
        $(that).triggerHandler('hairlineDeleted', {
          xval: h.xval
        });
        $(that).triggerHandler('hairlinesChanged', {});
        e.stopPropagation(); // don't want .click() to trigger, below.
      }).on('click', function clickHandler_() {
        that.moveHairlineToTop(h);
      });
      return h;
    };

    // Moves a hairline's divs to the top of the z-ordering.
    hairlines.prototype.moveHairlineToTop = function moveHairlineToTop(h) {
      var div = this.dygraph_.graphDiv;
      $(h.infoDiv).appendTo(div);
      $(h.lineDiv).appendTo(div);
      var idx = this.hairlines_.indexOf(h);
      this.hairlines_.splice(idx, 1);
      this.hairlines_.push(h);
    };

    // Positions existing hairline divs.
    hairlines.prototype.updateHairlineDivPositions = function updateHairlineDivPositions() {
      var g = this.dygraph_;
      var layout = this.dygraph_.getArea();
      var chartLeft = layout.x,
        chartRight = layout.x + layout.w;
      var div = this.dygraph_.graphDiv;
      var pos = Dygraph.findPos(div);
      var box = [layout.x + pos.x, layout.y + pos.y];
      box.push(box[0] + layout.w);
      box.push(box[1] + layout.h);
      $.each(this.hairlines_, function iterateHairlines_(idx, h) {
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
    hairlines.prototype.updateHairlineStyles = function updateHairlineStyles() {
      $.each(this.hairlines_, function iterateHairlines_(idx, h) {
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
    hairlines.findPrevNextRows = function findPrevNextRows(g, xval, col) {
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
    hairlines.prototype.updateHairlineInfo = function updateHairlineInfo() {
      var mode = 'closest';
      var g = this.dygraph_;
      var xRange = g.xAxisRange();
      var that = this;
      $.each(this.hairlines_, function iterateHairlines_(idx, h) {
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
    hairlines.prototype.attachHairlinesToChart_ = function attachHairlinesToChart_() {
      var div = this.dygraph_.graphDiv;
      $.each(this.hairlines_, function iterateHairlines_(idx, h) {
        $([h.lineDiv, h.infoDiv]).appendTo(div);
      });
    };

    // Deletes a hairline and removes it from the chart.
    hairlines.prototype.removeHairline = function removeHairline(h) {
      var idx = this.hairlines_.indexOf(h);
      if (idx >= 0) {
        this.hairlines_.splice(idx, 1);
        $([h.lineDiv, h.infoDiv]).remove();
      } else {
        Dygraph.warn('Tried to remove non-existent hairline.');
      }
    };
    hairlines.prototype.didDrawChart = function didDrawChart(e) {
      var g = e.dygraph;

      // Early out in the (common) case of zero hairlines.
      if (this.hairlines_.length === 0) return;
      this.updateHairlineDivPositions();
      this.attachHairlinesToChart_();
      this.updateHairlineInfo();
      this.updateHairlineStyles();
    };
    hairlines.prototype.dataDidUpdate = function dataDidUpdate(e) {
      // When the data in the chart updates, the hairlines should stay in the same
      // position on the screen. didDrawChart stores a domX parameter for each
      // hairline. We use that to reposition them on data updates.
      var g = this.dygraph_;
      $.each(this.hairlines_, function iterateHairlines_(idx, h) {
        if (h.hasOwnProperty('domX')) {
          h.xval = g.toDataXCoord(h.domX);
        }
      });
    };
    hairlines.prototype.click = function click(e) {
      if (this.addTimer_) {
        // Another click is in progress; ignore this one.
        return;
      }
      var area = e.dygraph.getArea();
      var xval = this.dygraph_.toDataXCoord(e.canvasx);
      var that = this;
      this.addTimer_ = setTimeout(function click_tmo_() {
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
    hairlines.prototype.dblclick = function dblclick(e) {
      if (this.addTimer_) {
        clearTimeout(this.addTimer_);
        this.addTimer_ = null;
      }
    };
    hairlines.prototype.destroy = function destroy() {
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
    hairlines.prototype.createPublicHairline_ = function createPublicHairline_(h) {
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
    hairlines.prototype.get = function get() {
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
    hairlines.prototype.set = function set(hairlines) {
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

  /* loader wrapper */
  Dygraph._require.add('dygraphs/src/extras/hairlines.js', /* exports */{});
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXh0cmFzX2hhaXJsaW5lc193cmFwcGVyIiwiRHlncmFwaCIsIndpbmRvdyIsIm1vZHVsZSIsInJlcXVpcmUiLCJOQU1FIiwiUGx1Z2lucyIsIkhhaXJsaW5lcyIsIl9leHRyYXNfaGFpcmxpbmVzX2Nsb3N1cmUiLCJDTElDS19ERUxBWV9NUyIsImhhaXJsaW5lcyIsIm9wdF9vcHRpb25zIiwiaGFpcmxpbmVzXyIsImxhc3RXaWR0aF8iLCJsYXN0SGVpZ2h0IiwiZHlncmFwaF8iLCJhZGRUaW1lcl8iLCJkaXZGaWxsZXJfIiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJhY3RpdmF0ZSIsImciLCJkaWREcmF3Q2hhcnQiLCJjbGljayIsImRibGNsaWNrIiwiZGF0YURpZFVwZGF0ZSIsImRldGFjaExhYmVscyIsImkiLCJsZW5ndGgiLCJoIiwiJCIsImxpbmVEaXYiLCJyZW1vdmUiLCJpbmZvRGl2IiwiaGFpcmxpbmVXYXNEcmFnZ2VkIiwiZXZlbnQiLCJ1aSIsImFyZWEiLCJnZXRBcmVhIiwib2xkWFZhbCIsInh2YWwiLCJ0b0RhdGFYQ29vcmQiLCJwb3NpdGlvbiIsImxlZnQiLCJtb3ZlSGFpcmxpbmVUb1RvcCIsInVwZGF0ZUhhaXJsaW5lRGl2UG9zaXRpb25zIiwidXBkYXRlSGFpcmxpbmVJbmZvIiwidXBkYXRlSGFpcmxpbmVTdHlsZXMiLCJ0cmlnZ2VySGFuZGxlciIsIm5ld1hWYWwiLCJjcmVhdGVIYWlybGluZSIsInByb3BzIiwic2VsZiIsIiRsaW5lQ29udGFpbmVyRGl2IiwiY3NzIiwiYWRkQ2xhc3MiLCIkbGluZURpdiIsImFwcGVuZFRvIiwiJGluZm9EaXYiLCJjbG9uZSIsInJlbW92ZUF0dHIiLCJzaG93IiwiZ2V0IiwiZHJhZ2dhYmxlIiwiZHJhZ1dyYXBwZXJfIiwiZXh0ZW5kIiwiaW50ZXJwb2xhdGVkIiwic2VsZWN0ZWQiLCJ0aGF0Iiwib24iLCJjbGlja0V2ZW50XyIsImUiLCJyZW1vdmVIYWlybGluZSIsInN0b3BQcm9wYWdhdGlvbiIsImNsaWNrSGFuZGxlcl8iLCJkaXYiLCJncmFwaERpdiIsImlkeCIsImluZGV4T2YiLCJzcGxpY2UiLCJwdXNoIiwibGF5b3V0IiwiY2hhcnRMZWZ0IiwieCIsImNoYXJ0UmlnaHQiLCJ3IiwicG9zIiwiZmluZFBvcyIsImJveCIsInkiLCJlYWNoIiwiaXRlcmF0ZUhhaXJsaW5lc18iLCJ0b0RvbVhDb29yZCIsImRvbVgiLCJ2aXNpYmxlIiwidG9nZ2xlIiwidG9nZ2xlQ2xhc3MiLCJmaW5kUHJldk5leHRSb3dzIiwiY29sIiwicHJldlJvdyIsIm5leHRSb3ciLCJudW1Sb3dzIiwicm93IiwieXZhbCIsImdldFZhbHVlIiwidW5kZWZpbmVkIiwiaXNOYU4iLCJyb3dYdmFsIiwibW9kZSIsInhSYW5nZSIsInhBeGlzUmFuZ2UiLCJzZWxQb2ludHMiLCJsYWJlbHMiLCJnZXRMYWJlbHMiLCJmaW5kQ2xvc2VzdFJvdyIsIm51bUNvbHVtbnMiLCJjYW52YXN4IiwiY2FudmFzeSIsIm5hbWUiLCJwcmV2TmV4dFJvdyIsInByZXZYIiwibmV4dFgiLCJwcmV2WSIsIm5leHRZIiwiZnJhYyIsImNsb3Nlc3RSb3ciLCJwb2ludHMiLCJoYWlybGluZSIsImNyZWF0ZVB1YmxpY0hhaXJsaW5lXyIsImR5Z3JhcGgiLCJodG1sIiwiTGVnZW5kIiwiZ2VuZXJhdGVMZWdlbmRIVE1MIiwiYXR0YWNoSGFpcmxpbmVzVG9DaGFydF8iLCJ3YXJuIiwiaGFzT3duUHJvcGVydHkiLCJzZXRUaW1lb3V0IiwiY2xpY2tfdG1vXyIsImNsZWFyVGltZW91dCIsImRlc3Ryb3kiLCJyZXN1bHQiLCJzZXQiLCJhbnlDcmVhdGVkIiwiX3JlcXVpcmUiLCJhZGQiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvZXh0cmFzL2hhaXJsaW5lcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxMyBEYW4gVmFuZGVya2FtIChkYW52ZGtAZ21haWwuY29tKVxuICogTUlULWxpY2VuY2VkOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICpcbiAqIE5vdGU6IFRoaXMgcGx1Z2luIHJlcXVpcmVzIGpRdWVyeSBhbmQgalF1ZXJ5IFVJIERyYWdnYWJsZS5cbiAqXG4gKiBTZWUgaGlnaC1sZXZlbCBkb2N1bWVudGF0aW9uIGF0IC4uLy4uL2RvY3MvaGFpcmxpbmVzLWFubm90YXRpb25zLnBkZlxuICovXG5cbi8qIGxvYWRlciB3cmFwcGVyIHRvIGFsbG93IGJyb3dzZXIgdXNlIGFuZCBFUzYgaW1wb3J0cyAqL1xuKGZ1bmN0aW9uIF9leHRyYXNfaGFpcmxpbmVzX3dyYXBwZXIoKSB7XG4ndXNlIHN0cmljdCc7XG52YXIgRHlncmFwaDtcbmlmICh3aW5kb3cuRHlncmFwaCkge1xuICBEeWdyYXBoID0gd2luZG93LkR5Z3JhcGg7XG59IGVsc2UgaWYgKHR5cGVvZihtb2R1bGUpICE9PSAndW5kZWZpbmVkJykge1xuICBEeWdyYXBoID0gcmVxdWlyZSgnLi4vZHlncmFwaCcpO1xuICBpZiAodHlwZW9mKER5Z3JhcGguTkFNRSkgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZihEeWdyYXBoLmRlZmF1bHQpICE9PSAndW5kZWZpbmVkJylcbiAgICBEeWdyYXBoID0gRHlncmFwaC5kZWZhdWx0O1xufVxuLyogZW5kIG9mIGxvYWRlciB3cmFwcGVyIGhlYWRlciAqL1xuXG5EeWdyYXBoLlBsdWdpbnMuSGFpcmxpbmVzID0gKGZ1bmN0aW9uIF9leHRyYXNfaGFpcmxpbmVzX2Nsb3N1cmUoKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtcbiAqICAgeHZhbDogIG51bWJlciwgICAgICAvLyB4LXZhbHVlIChpLmUuIG1pbGxpcyBvciBhIHJhdyBudW1iZXIpXG4gKiAgIGludGVycG9sYXRlZDogYm9vbCwgIC8vIGFsdGVybmF0aXZlIGlzIHRvIHNuYXAgdG8gY2xvc2VzdFxuICogICBsaW5lRGl2OiAhRWxlbWVudCAgICAvLyB2ZXJ0aWNhbCBoYWlybGluZSBkaXZcbiAqICAgaW5mb0RpdjogIUVsZW1lbnQgICAgLy8gZGl2IGNvbnRhaW5pbmcgaW5mbyBhYm91dCB0aGUgbmVhcmVzdCBwb2ludHNcbiAqICAgc2VsZWN0ZWQ6IGJvb2xlYW4gICAgLy8gd2hldGhlciB0aGlzIGhhaXJsaW5lIGlzIHNlbGVjdGVkXG4gKiB9IEhhaXJsaW5lXG4gKi9cblxuLy8gV2UgaGF2ZSB0byB3YWl0IGEgZmV3IG1zIGFmdGVyIGNsaWNrcyB0byBnaXZlIHRoZSB1c2VyIGEgY2hhbmNlIHRvXG4vLyBkb3VibGUtY2xpY2sgdG8gdW56b29tLiBUaGlzIHNldHMgdGhhdCBkZWxheSBwZXJpb2QuXG52YXIgQ0xJQ0tfREVMQVlfTVMgPSAzMDA7XG5cbnZhciBoYWlybGluZXMgPSBmdW5jdGlvbiBoYWlybGluZXMob3B0X29wdGlvbnMpIHtcbiAgLyoqIEBwcml2YXRlIHshQXJyYXkuPCFIYWlybGluZT59ICovXG4gIHRoaXMuaGFpcmxpbmVzXyA9IFtdO1xuXG4gIC8vIFVzZWQgdG8gZGV0ZWN0IHJlc2l6ZXMgKHdoaWNoIHJlcXVpcmUgdGhlIGRpdnMgdG8gYmUgcmVwb3NpdGlvbmVkKS5cbiAgdGhpcy5sYXN0V2lkdGhfID0gLTE7XG4gIHRoaXMubGFzdEhlaWdodCA9IC0xO1xuICB0aGlzLmR5Z3JhcGhfID0gbnVsbDtcblxuICB0aGlzLmFkZFRpbWVyXyA9IG51bGw7XG4gIG9wdF9vcHRpb25zID0gb3B0X29wdGlvbnMgfHwge307XG5cbiAgdGhpcy5kaXZGaWxsZXJfID0gb3B0X29wdGlvbnNbJ2RpdkZpbGxlciddIHx8IG51bGw7XG59O1xuXG5oYWlybGluZXMucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiBcIkhhaXJsaW5lcyBQbHVnaW5cIjtcbn07XG5cbmhhaXJsaW5lcy5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbiBhY3RpdmF0ZShnKSB7XG4gIHRoaXMuZHlncmFwaF8gPSBnO1xuICB0aGlzLmhhaXJsaW5lc18gPSBbXTtcblxuICByZXR1cm4ge1xuICAgIGRpZERyYXdDaGFydDogdGhpcy5kaWREcmF3Q2hhcnQsXG4gICAgY2xpY2s6IHRoaXMuY2xpY2ssXG4gICAgZGJsY2xpY2s6IHRoaXMuZGJsY2xpY2ssXG4gICAgZGF0YURpZFVwZGF0ZTogdGhpcy5kYXRhRGlkVXBkYXRlXG4gIH07XG59O1xuXG5oYWlybGluZXMucHJvdG90eXBlLmRldGFjaExhYmVscyA9IGZ1bmN0aW9uIGRldGFjaExhYmVscygpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmhhaXJsaW5lc18ubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaCA9IHRoaXMuaGFpcmxpbmVzX1tpXTtcbiAgICAkKGgubGluZURpdikucmVtb3ZlKCk7XG4gICAgJChoLmluZm9EaXYpLnJlbW92ZSgpO1xuICAgIHRoaXMuaGFpcmxpbmVzX1tpXSA9IG51bGw7XG4gIH1cbiAgdGhpcy5oYWlybGluZXNfID0gW107XG59O1xuXG5oYWlybGluZXMucHJvdG90eXBlLmhhaXJsaW5lV2FzRHJhZ2dlZCA9IGZ1bmN0aW9uIGhhaXJsaW5lV2FzRHJhZ2dlZChoLCBldmVudCwgdWkpIHtcbiAgdmFyIGFyZWEgPSB0aGlzLmR5Z3JhcGhfLmdldEFyZWEoKTtcbiAgdmFyIG9sZFhWYWwgPSBoLnh2YWw7XG4gIGgueHZhbCA9IHRoaXMuZHlncmFwaF8udG9EYXRhWENvb3JkKHVpLnBvc2l0aW9uLmxlZnQpO1xuICB0aGlzLm1vdmVIYWlybGluZVRvVG9wKGgpO1xuICB0aGlzLnVwZGF0ZUhhaXJsaW5lRGl2UG9zaXRpb25zKCk7XG4gIHRoaXMudXBkYXRlSGFpcmxpbmVJbmZvKCk7XG4gIHRoaXMudXBkYXRlSGFpcmxpbmVTdHlsZXMoKTtcbiAgJCh0aGlzKS50cmlnZ2VySGFuZGxlcignaGFpcmxpbmVNb3ZlZCcsIHtcbiAgICBvbGRYVmFsOiBvbGRYVmFsLFxuICAgIG5ld1hWYWw6IGgueHZhbFxuICB9KTtcbiAgJCh0aGlzKS50cmlnZ2VySGFuZGxlcignaGFpcmxpbmVzQ2hhbmdlZCcsIHt9KTtcbn07XG5cbi8vIFRoaXMgY3JlYXRlcyB0aGUgaGFpcmxpbmUgb2JqZWN0IGFuZCByZXR1cm5zIGl0LlxuLy8gSXQgZG9lcyBub3QgcG9zaXRpb24gaXQgYW5kIGRvZXMgbm90IGF0dGFjaCBpdCB0byB0aGUgY2hhcnQuXG5oYWlybGluZXMucHJvdG90eXBlLmNyZWF0ZUhhaXJsaW5lID0gZnVuY3Rpb24gY3JlYXRlSGFpcmxpbmUocHJvcHMpIHtcbiAgdmFyIGg7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICB2YXIgJGxpbmVDb250YWluZXJEaXYgPSAkKCc8ZGl2IC8+JykuY3NzKHtcbiAgICAgICd3aWR0aCc6ICc2cHgnLFxuICAgICAgJ21hcmdpbi1sZWZ0JzogJy0zcHgnLFxuICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcbiAgICAgICd6LWluZGV4JzogJzEwJ1xuICAgIH0pXG4gICAgLmFkZENsYXNzKCdkeWdyYXBoLWhhaXJsaW5lJyk7XG5cbiAgdmFyICRsaW5lRGl2ID0gJCgnPGRpdiAvPicpLmNzcyh7XG4gICAgJ3dpZHRoJzogJzFweCcsXG4gICAgJ3Bvc2l0aW9uJzogJ3JlbGF0aXZlJyxcbiAgICAnbGVmdCc6ICczcHgnLFxuICAgICdiYWNrZ3JvdW5kJzogJ2JsYWNrJyxcbiAgICAnaGVpZ2h0JzogJzEwMCUnXG4gIH0pO1xuICAkbGluZURpdi5hcHBlbmRUbygkbGluZUNvbnRhaW5lckRpdik7XG5cbiAgdmFyICRpbmZvRGl2ID0gJCgnI2hhaXJsaW5lLXRlbXBsYXRlJykuY2xvbmUoKS5yZW1vdmVBdHRyKCdpZCcpLmNzcyh7XG4gICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnXG4gICAgfSlcbiAgICAuc2hvdygpO1xuXG4gIC8vIFN1cmVseSB0aGVyZSdzIGEgbW9yZSBqUXVlcnktaXNoIHdheSB0byBkbyB0aGlzIVxuICAkKFskaW5mb0Rpdi5nZXQoMCksICRsaW5lQ29udGFpbmVyRGl2LmdldCgwKV0pXG4gICAgLmRyYWdnYWJsZSh7XG4gICAgICAnYXhpcyc6ICd4JyxcbiAgICAgICdkcmFnJzogZnVuY3Rpb24gZHJhZ1dyYXBwZXJfKGV2ZW50LCB1aSkge1xuICAgICAgICBzZWxmLmhhaXJsaW5lV2FzRHJhZ2dlZChoLCBldmVudCwgdWkpO1xuICAgICAgfVxuICAgICAgLy8gVE9ETyhkYW52ayk6IHNldCBjdXJzb3IgaGVyZVxuICAgIH0pO1xuXG4gIGggPSAkLmV4dGVuZCh7XG4gICAgaW50ZXJwb2xhdGVkOiB0cnVlLFxuICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICBsaW5lRGl2OiAkbGluZUNvbnRhaW5lckRpdi5nZXQoMCksXG4gICAgaW5mb0RpdjogJGluZm9EaXYuZ2V0KDApXG4gIH0sIHByb3BzKTtcblxuICB2YXIgdGhhdCA9IHRoaXM7XG4gICRpbmZvRGl2Lm9uKCdjbGljaycsICcuaGFpcmxpbmUta2lsbC1idXR0b24nLCBmdW5jdGlvbiBjbGlja0V2ZW50XyhlKSB7XG4gICAgdGhhdC5yZW1vdmVIYWlybGluZShoKTtcbiAgICAkKHRoYXQpLnRyaWdnZXJIYW5kbGVyKCdoYWlybGluZURlbGV0ZWQnLCB7XG4gICAgICB4dmFsOiBoLnh2YWxcbiAgICB9KTtcbiAgICAkKHRoYXQpLnRyaWdnZXJIYW5kbGVyKCdoYWlybGluZXNDaGFuZ2VkJywge30pO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7ICAvLyBkb24ndCB3YW50IC5jbGljaygpIHRvIHRyaWdnZXIsIGJlbG93LlxuICB9KS5vbignY2xpY2snLCBmdW5jdGlvbiBjbGlja0hhbmRsZXJfKCkge1xuICAgIHRoYXQubW92ZUhhaXJsaW5lVG9Ub3AoaCk7XG4gIH0pO1xuXG4gIHJldHVybiBoO1xufTtcblxuLy8gTW92ZXMgYSBoYWlybGluZSdzIGRpdnMgdG8gdGhlIHRvcCBvZiB0aGUgei1vcmRlcmluZy5cbmhhaXJsaW5lcy5wcm90b3R5cGUubW92ZUhhaXJsaW5lVG9Ub3AgPSBmdW5jdGlvbiBtb3ZlSGFpcmxpbmVUb1RvcChoKSB7XG4gIHZhciBkaXYgPSB0aGlzLmR5Z3JhcGhfLmdyYXBoRGl2O1xuICAkKGguaW5mb0RpdikuYXBwZW5kVG8oZGl2KTtcbiAgJChoLmxpbmVEaXYpLmFwcGVuZFRvKGRpdik7XG5cbiAgdmFyIGlkeCA9IHRoaXMuaGFpcmxpbmVzXy5pbmRleE9mKGgpO1xuICB0aGlzLmhhaXJsaW5lc18uc3BsaWNlKGlkeCwgMSk7XG4gIHRoaXMuaGFpcmxpbmVzXy5wdXNoKGgpO1xufTtcblxuLy8gUG9zaXRpb25zIGV4aXN0aW5nIGhhaXJsaW5lIGRpdnMuXG5oYWlybGluZXMucHJvdG90eXBlLnVwZGF0ZUhhaXJsaW5lRGl2UG9zaXRpb25zID0gZnVuY3Rpb24gdXBkYXRlSGFpcmxpbmVEaXZQb3NpdGlvbnMoKSB7XG4gIHZhciBnID0gdGhpcy5keWdyYXBoXztcbiAgdmFyIGxheW91dCA9IHRoaXMuZHlncmFwaF8uZ2V0QXJlYSgpO1xuICB2YXIgY2hhcnRMZWZ0ID0gbGF5b3V0LngsIGNoYXJ0UmlnaHQgPSBsYXlvdXQueCArIGxheW91dC53O1xuICB2YXIgZGl2ID0gdGhpcy5keWdyYXBoXy5ncmFwaERpdjtcbiAgdmFyIHBvcyA9IER5Z3JhcGguZmluZFBvcyhkaXYpO1xuICB2YXIgYm94ID0gW2xheW91dC54ICsgcG9zLngsIGxheW91dC55ICsgcG9zLnldO1xuICBib3gucHVzaChib3hbMF0gKyBsYXlvdXQudyk7XG4gIGJveC5wdXNoKGJveFsxXSArIGxheW91dC5oKTtcblxuICAkLmVhY2godGhpcy5oYWlybGluZXNfLCBmdW5jdGlvbiBpdGVyYXRlSGFpcmxpbmVzXyhpZHgsIGgpIHtcbiAgICB2YXIgbGVmdCA9IGcudG9Eb21YQ29vcmQoaC54dmFsKTtcbiAgICBoLmRvbVggPSBsZWZ0OyAgLy8gU2VlIGNvbW1lbnRzIGluIHRoaXMuZGF0YURpZFVwZGF0ZVxuICAgICQoaC5saW5lRGl2KS5jc3Moe1xuICAgICAgJ2xlZnQnOiBsZWZ0ICsgJ3B4JyxcbiAgICAgICd0b3AnOiBsYXlvdXQueSArICdweCcsXG4gICAgICAnaGVpZ2h0JzogbGF5b3V0LmggKyAncHgnXG4gICAgfSk7ICAvLyAuZHJhZ2dhYmxlKFwib3B0aW9uXCIsIFwiY29udGFpbm1lbnRcIiwgYm94KTtcbiAgICAkKGguaW5mb0RpdikuY3NzKHtcbiAgICAgICdsZWZ0JzogbGVmdCArICdweCcsXG4gICAgICAndG9wJzogbGF5b3V0LnkgKyAncHgnLFxuICAgIH0pLmRyYWdnYWJsZShcIm9wdGlvblwiLCBcImNvbnRhaW5tZW50XCIsIGJveCk7XG5cbiAgICB2YXIgdmlzaWJsZSA9IChsZWZ0ID49IGNoYXJ0TGVmdCAmJiBsZWZ0IDw9IGNoYXJ0UmlnaHQpO1xuICAgICQoW2guaW5mb0RpdiwgaC5saW5lRGl2XSkudG9nZ2xlKHZpc2libGUpO1xuICB9KTtcbn07XG5cbi8vIFNldHMgc3R5bGVzIG9uIHRoZSBoYWlybGluZSAoaS5lLiBcInNlbGVjdGVkXCIpXG5oYWlybGluZXMucHJvdG90eXBlLnVwZGF0ZUhhaXJsaW5lU3R5bGVzID0gZnVuY3Rpb24gdXBkYXRlSGFpcmxpbmVTdHlsZXMoKSB7XG4gICQuZWFjaCh0aGlzLmhhaXJsaW5lc18sIGZ1bmN0aW9uIGl0ZXJhdGVIYWlybGluZXNfKGlkeCwgaCkge1xuICAgICQoW2guaW5mb0RpdiwgaC5saW5lRGl2XSkudG9nZ2xlQ2xhc3MoJ3NlbGVjdGVkJywgaC5zZWxlY3RlZCk7XG4gIH0pO1xufTtcblxuLy8gRmluZCBwcmV2Um93IGFuZCBuZXh0Um93IHN1Y2ggdGhhdFxuLy8gZy5nZXRWYWx1ZShwcmV2Um93LCAwKSA8PSB4dmFsXG4vLyBnLmdldFZhbHVlKG5leHRSb3csIDApID49IHh2YWxcbi8vIGcuZ2V0VmFsdWUoe3ByZXYsbmV4dH1Sb3csIGNvbCkgIT0gbnVsbCwgTmFOIG9yIHVuZGVmaW5lZFxuLy8gYW5kIHRoZXJlJ3Mgbm8gb3RoZXIgcm93IHN1Y2ggdGhhdDpcbi8vICAgZy5nZXRWYWx1ZShwcmV2Um93LCAwKSA8IGcuZ2V0VmFsdWUocm93LCAwKSA8IGcuZ2V0VmFsdWUobmV4dFJvdywgMClcbi8vICAgZy5nZXRWYWx1ZShyb3csIGNvbCkgIT0gbnVsbCwgTmFOIG9yIHVuZGVmaW5lZC5cbi8vIFJldHVybnMgW3ByZXZSb3csIG5leHRSb3ddLiBFaXRoZXIgY2FuIGJlIG51bGwgKGJ1dCBub3QgYm90aCkuXG5oYWlybGluZXMuZmluZFByZXZOZXh0Um93cyA9IGZ1bmN0aW9uIGZpbmRQcmV2TmV4dFJvd3MoZywgeHZhbCwgY29sKSB7XG4gIHZhciBwcmV2Um93ID0gbnVsbCwgbmV4dFJvdyA9IG51bGw7XG4gIHZhciBudW1Sb3dzID0gZy5udW1Sb3dzKCk7XG4gIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IG51bVJvd3M7IHJvdysrKSB7XG4gICAgdmFyIHl2YWwgPSBnLmdldFZhbHVlKHJvdywgY29sKTtcbiAgICBpZiAoeXZhbCA9PT0gbnVsbCB8fCB5dmFsID09PSB1bmRlZmluZWQgfHwgaXNOYU4oeXZhbCkpIGNvbnRpbnVlO1xuXG4gICAgdmFyIHJvd1h2YWwgPSBnLmdldFZhbHVlKHJvdywgMCk7XG4gICAgaWYgKHJvd1h2YWwgPD0geHZhbCkgcHJldlJvdyA9IHJvdztcblxuICAgIGlmIChyb3dYdmFsID49IHh2YWwpIHtcbiAgICAgIG5leHRSb3cgPSByb3c7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gW3ByZXZSb3csIG5leHRSb3ddO1xufTtcblxuLy8gRmlsbHMgb3V0IHRoZSBpbmZvIGRpdiBiYXNlZCBvbiBjdXJyZW50IGNvb3JkaW5hdGVzLlxuaGFpcmxpbmVzLnByb3RvdHlwZS51cGRhdGVIYWlybGluZUluZm8gPSBmdW5jdGlvbiB1cGRhdGVIYWlybGluZUluZm8oKSB7XG4gIHZhciBtb2RlID0gJ2Nsb3Nlc3QnO1xuXG4gIHZhciBnID0gdGhpcy5keWdyYXBoXztcbiAgdmFyIHhSYW5nZSA9IGcueEF4aXNSYW5nZSgpO1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQuZWFjaCh0aGlzLmhhaXJsaW5lc18sIGZ1bmN0aW9uIGl0ZXJhdGVIYWlybGluZXNfKGlkeCwgaCkge1xuICAgIC8vIFRvIHVzZSBnZW5lcmF0ZUxlZ2VuZEhUTUwsIHdlIHN5bnRoZXNpemUgYW4gYXJyYXkgb2Ygc2VsZWN0ZWQgcG9pbnRzLlxuICAgIHZhciBzZWxQb2ludHMgPSBbXTtcbiAgICB2YXIgbGFiZWxzID0gZy5nZXRMYWJlbHMoKTtcbiAgICB2YXIgcm93LCBwcmV2Um93LCBuZXh0Um93O1xuXG4gICAgaWYgKCFoLmludGVycG9sYXRlZCkge1xuICAgICAgLy8gXCJjbG9zZXN0IHBvaW50XCIgbW9kZS5cbiAgICAgIC8vIFRPRE8oZGFudmspOiBtYWtlIGZpbmRDbG9zZXN0Um93IG1ldGhvZCBwdWJsaWNcbiAgICAgIHJvdyA9IGcuZmluZENsb3Nlc3RSb3coZy50b0RvbVhDb29yZChoLnh2YWwpKTtcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgZy5udW1Db2x1bW5zKCk7IGkrKykge1xuICAgICAgICBzZWxQb2ludHMucHVzaCh7XG4gICAgICAgICAgY2FudmFzeDogMSwgIC8vIFRPRE8oZGFudmspOiByZWFsIGNvb3JkaW5hdGVcbiAgICAgICAgICBjYW52YXN5OiAxLCAgLy8gVE9ETyhkYW52ayk6IHJlYWwgY29vcmRpbmF0ZVxuICAgICAgICAgIHh2YWw6IGgueHZhbCxcbiAgICAgICAgICB5dmFsOiBnLmdldFZhbHVlKHJvdywgaSksXG4gICAgICAgICAgbmFtZTogbGFiZWxzW2ldXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBcImludGVycG9sYXRlZFwiIG1vZGUuXG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGcubnVtQ29sdW1ucygpOyBpKyspIHtcbiAgICAgICAgdmFyIHByZXZOZXh0Um93ID0gaGFpcmxpbmVzLmZpbmRQcmV2TmV4dFJvd3MoZywgaC54dmFsLCBpKTtcbiAgICAgICAgcHJldlJvdyA9IHByZXZOZXh0Um93WzBdLCBuZXh0Um93ID0gcHJldk5leHRSb3dbMV07XG5cbiAgICAgICAgLy8gRm9yIHgtdmFsdWVzIG91dHNpZGUgdGhlIGRvbWFpbiwgaW50ZXJwb2xhdGUgXCJiZXR3ZWVuXCIgdGhlIGV4dHJlbWVcbiAgICAgICAgLy8gcG9pbnQgYW5kIGl0c2VsZi5cbiAgICAgICAgaWYgKHByZXZSb3cgPT09IG51bGwpIHByZXZSb3cgPSBuZXh0Um93O1xuICAgICAgICBpZiAobmV4dFJvdyA9PT0gbnVsbCkgbmV4dFJvdyA9IHByZXZSb3c7XG5cbiAgICAgICAgLy8gbGluZWFyIGludGVycG9sYXRpb25cbiAgICAgICAgdmFyIHByZXZYID0gZy5nZXRWYWx1ZShwcmV2Um93LCAwKSxcbiAgICAgICAgICAgIG5leHRYID0gZy5nZXRWYWx1ZShuZXh0Um93LCAwKSxcbiAgICAgICAgICAgIHByZXZZID0gZy5nZXRWYWx1ZShwcmV2Um93LCBpKSxcbiAgICAgICAgICAgIG5leHRZID0gZy5nZXRWYWx1ZShuZXh0Um93LCBpKSxcbiAgICAgICAgICAgIGZyYWMgPSBwcmV2Um93ID09IG5leHRSb3cgPyAwIDogKGgueHZhbCAtIHByZXZYKSAvIChuZXh0WCAtIHByZXZYKSxcbiAgICAgICAgICAgIHl2YWwgPSBmcmFjICogbmV4dFkgKyAoMSAtIGZyYWMpICogcHJldlk7XG5cbiAgICAgICAgc2VsUG9pbnRzLnB1c2goe1xuICAgICAgICAgIGNhbnZhc3g6IDEsICAvLyBUT0RPKGRhbnZrKTogcmVhbCBjb29yZGluYXRlXG4gICAgICAgICAgY2FudmFzeTogMSwgIC8vIFRPRE8oZGFudmspOiByZWFsIGNvb3JkaW5hdGVcbiAgICAgICAgICB4dmFsOiBoLnh2YWwsXG4gICAgICAgICAgeXZhbDogeXZhbCxcbiAgICAgICAgICBwcmV2Um93OiBwcmV2Um93LFxuICAgICAgICAgIG5leHRSb3c6IG5leHRSb3csXG4gICAgICAgICAgbmFtZTogbGFiZWxzW2ldXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGF0LmRpdkZpbGxlcl8pIHtcbiAgICAgIHRoYXQuZGl2RmlsbGVyXyhoLmluZm9EaXYsIHtcbiAgICAgICAgY2xvc2VzdFJvdzogcm93LFxuICAgICAgICBwb2ludHM6IHNlbFBvaW50cyxcbiAgICAgICAgaGFpcmxpbmU6IHRoYXQuY3JlYXRlUHVibGljSGFpcmxpbmVfKGgpLFxuICAgICAgICBkeWdyYXBoOiBnXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGh0bWwgPSBEeWdyYXBoLlBsdWdpbnMuTGVnZW5kLmdlbmVyYXRlTGVnZW5kSFRNTChnLCBoLnh2YWwsIHNlbFBvaW50cywgMTApO1xuICAgICAgJCgnLmhhaXJsaW5lLWxlZ2VuZCcsIGguaW5mb0RpdikuaHRtbChodG1sKTtcbiAgICB9XG4gIH0pO1xufTtcblxuLy8gQWZ0ZXIgYSByZXNpemUsIHRoZSBoYWlybGluZSBkaXZzIGNhbiBnZXQgZGV0dGFjaGVkIGZyb20gdGhlIGNoYXJ0LlxuLy8gVGhpcyByZWF0dGFjaGVzIHRoZW0uXG5oYWlybGluZXMucHJvdG90eXBlLmF0dGFjaEhhaXJsaW5lc1RvQ2hhcnRfID0gZnVuY3Rpb24gYXR0YWNoSGFpcmxpbmVzVG9DaGFydF8oKSB7XG4gIHZhciBkaXYgPSB0aGlzLmR5Z3JhcGhfLmdyYXBoRGl2O1xuICAkLmVhY2godGhpcy5oYWlybGluZXNfLCBmdW5jdGlvbiBpdGVyYXRlSGFpcmxpbmVzXyhpZHgsIGgpIHtcbiAgICAkKFtoLmxpbmVEaXYsIGguaW5mb0Rpdl0pLmFwcGVuZFRvKGRpdik7XG4gIH0pO1xufTtcblxuLy8gRGVsZXRlcyBhIGhhaXJsaW5lIGFuZCByZW1vdmVzIGl0IGZyb20gdGhlIGNoYXJ0LlxuaGFpcmxpbmVzLnByb3RvdHlwZS5yZW1vdmVIYWlybGluZSA9IGZ1bmN0aW9uIHJlbW92ZUhhaXJsaW5lKGgpIHtcbiAgdmFyIGlkeCA9IHRoaXMuaGFpcmxpbmVzXy5pbmRleE9mKGgpO1xuICBpZiAoaWR4ID49IDApIHtcbiAgICB0aGlzLmhhaXJsaW5lc18uc3BsaWNlKGlkeCwgMSk7XG4gICAgJChbaC5saW5lRGl2LCBoLmluZm9EaXZdKS5yZW1vdmUoKTtcbiAgfSBlbHNlIHtcbiAgICBEeWdyYXBoLndhcm4oJ1RyaWVkIHRvIHJlbW92ZSBub24tZXhpc3RlbnQgaGFpcmxpbmUuJyk7XG4gIH1cbn07XG5cbmhhaXJsaW5lcy5wcm90b3R5cGUuZGlkRHJhd0NoYXJ0ID0gZnVuY3Rpb24gZGlkRHJhd0NoYXJ0KGUpIHtcbiAgdmFyIGcgPSBlLmR5Z3JhcGg7XG5cbiAgLy8gRWFybHkgb3V0IGluIHRoZSAoY29tbW9uKSBjYXNlIG9mIHplcm8gaGFpcmxpbmVzLlxuICBpZiAodGhpcy5oYWlybGluZXNfLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gIHRoaXMudXBkYXRlSGFpcmxpbmVEaXZQb3NpdGlvbnMoKTtcbiAgdGhpcy5hdHRhY2hIYWlybGluZXNUb0NoYXJ0XygpO1xuICB0aGlzLnVwZGF0ZUhhaXJsaW5lSW5mbygpO1xuICB0aGlzLnVwZGF0ZUhhaXJsaW5lU3R5bGVzKCk7XG59O1xuXG5oYWlybGluZXMucHJvdG90eXBlLmRhdGFEaWRVcGRhdGUgPSBmdW5jdGlvbiBkYXRhRGlkVXBkYXRlKGUpIHtcbiAgLy8gV2hlbiB0aGUgZGF0YSBpbiB0aGUgY2hhcnQgdXBkYXRlcywgdGhlIGhhaXJsaW5lcyBzaG91bGQgc3RheSBpbiB0aGUgc2FtZVxuICAvLyBwb3NpdGlvbiBvbiB0aGUgc2NyZWVuLiBkaWREcmF3Q2hhcnQgc3RvcmVzIGEgZG9tWCBwYXJhbWV0ZXIgZm9yIGVhY2hcbiAgLy8gaGFpcmxpbmUuIFdlIHVzZSB0aGF0IHRvIHJlcG9zaXRpb24gdGhlbSBvbiBkYXRhIHVwZGF0ZXMuXG4gIHZhciBnID0gdGhpcy5keWdyYXBoXztcbiAgJC5lYWNoKHRoaXMuaGFpcmxpbmVzXywgZnVuY3Rpb24gaXRlcmF0ZUhhaXJsaW5lc18oaWR4LCBoKSB7XG4gICAgaWYgKGguaGFzT3duUHJvcGVydHkoJ2RvbVgnKSkge1xuICAgICAgaC54dmFsID0gZy50b0RhdGFYQ29vcmQoaC5kb21YKTtcbiAgICB9XG4gIH0pO1xufTtcblxuaGFpcmxpbmVzLnByb3RvdHlwZS5jbGljayA9IGZ1bmN0aW9uIGNsaWNrKGUpIHtcbiAgaWYgKHRoaXMuYWRkVGltZXJfKSB7XG4gICAgLy8gQW5vdGhlciBjbGljayBpcyBpbiBwcm9ncmVzczsgaWdub3JlIHRoaXMgb25lLlxuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBhcmVhID0gZS5keWdyYXBoLmdldEFyZWEoKTtcbiAgdmFyIHh2YWwgPSB0aGlzLmR5Z3JhcGhfLnRvRGF0YVhDb29yZChlLmNhbnZhc3gpO1xuXG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdGhpcy5hZGRUaW1lcl8gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIGNsaWNrX3Rtb18oKSB7XG4gICAgdGhhdC5hZGRUaW1lcl8gPSBudWxsO1xuICAgIHRoYXQuaGFpcmxpbmVzXy5wdXNoKHRoYXQuY3JlYXRlSGFpcmxpbmUoe3h2YWw6IHh2YWx9KSk7XG5cbiAgICB0aGF0LnVwZGF0ZUhhaXJsaW5lRGl2UG9zaXRpb25zKCk7XG4gICAgdGhhdC51cGRhdGVIYWlybGluZUluZm8oKTtcbiAgICB0aGF0LnVwZGF0ZUhhaXJsaW5lU3R5bGVzKCk7XG4gICAgdGhhdC5hdHRhY2hIYWlybGluZXNUb0NoYXJ0XygpO1xuXG4gICAgJCh0aGF0KS50cmlnZ2VySGFuZGxlcignaGFpcmxpbmVDcmVhdGVkJywge1xuICAgICAgeHZhbDogeHZhbFxuICAgIH0pO1xuICAgICQodGhhdCkudHJpZ2dlckhhbmRsZXIoJ2hhaXJsaW5lc0NoYW5nZWQnLCB7fSk7XG4gIH0sIENMSUNLX0RFTEFZX01TKTtcbn07XG5cbmhhaXJsaW5lcy5wcm90b3R5cGUuZGJsY2xpY2sgPSBmdW5jdGlvbiBkYmxjbGljayhlKSB7XG4gIGlmICh0aGlzLmFkZFRpbWVyXykge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFkZFRpbWVyXyk7XG4gICAgdGhpcy5hZGRUaW1lcl8gPSBudWxsO1xuICB9XG59O1xuXG5oYWlybGluZXMucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95KCkge1xuICB0aGlzLmRldGFjaExhYmVscygpO1xufTtcblxuLy8gUHVibGljIEFQSVxuXG4vKipcbiAqIFRoaXMgaXMgYSByZXN0cmljdGVkIHZpZXcgb2YgdGhpcy5oYWlybGluZXNfIHdoaWNoIGRvZXNuJ3QgZXhwb3NlXG4gKiBpbXBsZW1lbnRhdGlvbiBkZXRhaWxzIGxpa2UgdGhlIGhhbmRsZSBkaXZzLlxuICpcbiAqIEB0eXBlZGVmIHtcbiAqICAgeHZhbDogIG51bWJlciwgICAgICAgLy8geC12YWx1ZSAoaS5lLiBtaWxsaXMgb3IgYSByYXcgbnVtYmVyKVxuICogICBpbnRlcnBvbGF0ZWQ6IGJvb2wsICAvLyBhbHRlcm5hdGl2ZSBpcyB0byBzbmFwIHRvIGNsb3Nlc3RcbiAqICAgc2VsZWN0ZWQ6IGJvb2wgICAgICAgLy8gd2hldGhlciB0aGUgaGFpcmxpbmUgaXMgc2VsZWN0ZWQuXG4gKiB9IFB1YmxpY0hhaXJsaW5lXG4gKi9cblxuLyoqXG4gKiBAcGFyYW0geyFIYWlybGluZX0gaCBJbnRlcm5hbCBoYWlybGluZS5cbiAqIEByZXR1cm4geyFQdWJsaWNIYWlybGluZX0gUmVzdHJpY3RlZCBwdWJsaWMgdmlldyBvZiB0aGUgaGFpcmxpbmUuXG4gKi9cbmhhaXJsaW5lcy5wcm90b3R5cGUuY3JlYXRlUHVibGljSGFpcmxpbmVfID0gZnVuY3Rpb24gY3JlYXRlUHVibGljSGFpcmxpbmVfKGgpIHtcbiAgcmV0dXJuIHtcbiAgICB4dmFsOiBoLnh2YWwsXG4gICAgaW50ZXJwb2xhdGVkOiBoLmludGVycG9sYXRlZCxcbiAgICBzZWxlY3RlZDogaC5zZWxlY3RlZFxuICB9O1xufTtcblxuLyoqXG4gKiBAcmV0dXJuIHshQXJyYXkuPCFQdWJsaWNIYWlybGluZT59IFRoZSBjdXJyZW50IHNldCBvZiBoYWlybGluZXMsIG9yZGVyZWRcbiAqICAgICBmcm9tIGJhY2sgdG8gZnJvbnQuXG4gKi9cbmhhaXJsaW5lcy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5oYWlybGluZXNfLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGggPSB0aGlzLmhhaXJsaW5lc19baV07XG4gICAgcmVzdWx0LnB1c2godGhpcy5jcmVhdGVQdWJsaWNIYWlybGluZV8oaCkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIENhbGxpbmcgdGhpcyB3aWxsIHJlc3VsdCBpbiBhIGhhaXJsaW5lc0NoYW5nZWQgZXZlbnQgYmVpbmcgdHJpZ2dlcmVkLCBub1xuICogbWF0dGVyIHdoZXRoZXIgaXQgY29uc2lzdHMgb2YgYWRkaXRpb25zLCBkZWxldGlvbnMsIG1vdmVzIG9yIG5vIGNoYW5nZXMgYXRcbiAqIGFsbC5cbiAqXG4gKiBAcGFyYW0geyFBcnJheS48IVB1YmxpY0hhaXJsaW5lPn0gaGFpcmxpbmVzIFRoZSBuZXcgc2V0IG9mIGhhaXJsaW5lcyxcbiAqICAgICBvcmRlcmVkIGZyb20gYmFjayB0byBmcm9udC5cbiAqL1xuaGFpcmxpbmVzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoaGFpcmxpbmVzKSB7XG4gIC8vIFJlLXVzZSBkaXZzIGZyb20gdGhlIG9sZCBoYWlybGluZXMgYXJyYXkgc28gZmFyIGFzIHdlIGNhbi5cbiAgLy8gVGhleSdyZSBhbHJlYWR5IGNvcnJlY3RseSB6LW9yZGVyZWQuXG4gIHZhciBhbnlDcmVhdGVkID0gZmFsc2U7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaGFpcmxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGggPSBoYWlybGluZXNbaV07XG5cbiAgICBpZiAodGhpcy5oYWlybGluZXNfLmxlbmd0aCA+IGkpIHtcbiAgICAgIHRoaXMuaGFpcmxpbmVzX1tpXS54dmFsID0gaC54dmFsO1xuICAgICAgdGhpcy5oYWlybGluZXNfW2ldLmludGVycG9sYXRlZCA9IGguaW50ZXJwb2xhdGVkO1xuICAgICAgdGhpcy5oYWlybGluZXNfW2ldLnNlbGVjdGVkID0gaC5zZWxlY3RlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oYWlybGluZXNfLnB1c2godGhpcy5jcmVhdGVIYWlybGluZSh7XG4gICAgICAgIHh2YWw6IGgueHZhbCxcbiAgICAgICAgaW50ZXJwb2xhdGVkOiBoLmludGVycG9sYXRlZCxcbiAgICAgICAgc2VsZWN0ZWQ6IGguc2VsZWN0ZWRcbiAgICAgIH0pKTtcbiAgICAgIGFueUNyZWF0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIElmIHRoZXJlIGFyZSBhbnkgcmVtYWluaW5nIGhhaXJsaW5lcywgZGVzdHJveSB0aGVtLlxuICB3aGlsZSAoaGFpcmxpbmVzLmxlbmd0aCA8IHRoaXMuaGFpcmxpbmVzXy5sZW5ndGgpIHtcbiAgICB0aGlzLnJlbW92ZUhhaXJsaW5lKHRoaXMuaGFpcmxpbmVzX1toYWlybGluZXMubGVuZ3RoXSk7XG4gIH1cblxuICB0aGlzLnVwZGF0ZUhhaXJsaW5lRGl2UG9zaXRpb25zKCk7XG4gIHRoaXMudXBkYXRlSGFpcmxpbmVJbmZvKCk7XG4gIHRoaXMudXBkYXRlSGFpcmxpbmVTdHlsZXMoKTtcbiAgaWYgKGFueUNyZWF0ZWQpIHtcbiAgICB0aGlzLmF0dGFjaEhhaXJsaW5lc1RvQ2hhcnRfKCk7XG4gIH1cblxuICAkKHRoaXMpLnRyaWdnZXJIYW5kbGVyKCdoYWlybGluZXNDaGFuZ2VkJywge30pO1xufTtcblxucmV0dXJuIGhhaXJsaW5lcztcblxufSkoKTtcblxuLyogbG9hZGVyIHdyYXBwZXIgKi9cbkR5Z3JhcGguX3JlcXVpcmUuYWRkKCdkeWdyYXBocy9zcmMvZXh0cmFzL2hhaXJsaW5lcy5qcycsIC8qIGV4cG9ydHMgKi8ge30pO1xufSkoKTtcbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDLFNBQVNBLHlCQUF5QixHQUFHO0VBQ3RDLFlBQVk7O0VB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