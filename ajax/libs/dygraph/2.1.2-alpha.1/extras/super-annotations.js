"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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

Dygraph.Plugins.SuperAnnotations = function () {
  "use strict";

  /**
   * These are just the basic requirements -- annotations can have whatever other
   * properties the code that displays them wants them to have.
   *
   * @typedef {
   *   xval:  number,      // x-value (i.e. millis or a raw number)
   *   series: string,     // series name
   *   yFrac: ?number,     // y-positioning. Default is a few px above the point.
   *   lineDiv: !Element   // vertical div connecting point to info div.
   *   infoDiv: !Element   // div containing info about the annotation.
   * } Annotation
   */
  var annotations = function annotations(opt_options) {
    /* @type {!Array.<!Annotation>} */
    this.annotations_ = [];
    // Used to detect resizes (which require the divs to be repositioned).
    this.lastWidth_ = -1;
    this.lastHeight = -1;
    this.dygraph_ = null;
    opt_options = opt_options || {};
    this.defaultAnnotationProperties_ = $.extend({
      'text': 'Description'
    }, opt_options['defaultAnnotationProperties']);
  };
  annotations.prototype.toString = function () {
    return "SuperAnnotations Plugin";
  };
  annotations.prototype.activate = function (g) {
    this.dygraph_ = g;
    this.annotations_ = [];
    return {
      didDrawChart: this.didDrawChart,
      pointClick: this.pointClick // TODO(danvk): implement in dygraphs
    };
  };

  annotations.prototype.detachLabels = function () {
    for (var i = 0; i < this.annotations_.length; i++) {
      var a = this.annotations_[i];
      $(a.lineDiv).remove();
      $(a.infoDiv).remove();
      this.annotations_[i] = null;
    }
    this.annotations_ = [];
  };
  annotations.prototype.annotationWasDragged = function (a, event, ui) {
    var g = this.dygraph_;
    var area = g.getArea();
    var oldYFrac = a.yFrac;
    var infoDiv = a.infoDiv;
    var newYFrac = (infoDiv.offsetTop + infoDiv.offsetHeight - area.y) / area.h;
    if (newYFrac == oldYFrac) return;
    a.yFrac = newYFrac;
    this.moveAnnotationToTop(a);
    this.updateAnnotationDivPositions();
    this.updateAnnotationInfo();
    $(this).triggerHandler('annotationMoved', {
      annotation: a,
      oldYFrac: oldYFrac,
      newYFrac: a.yFrac
    });
    $(this).triggerHandler('annotationsChanged', {});
  };
  annotations.prototype.makeAnnotationEditable = function (a) {
    if (a.editable == true) return;
    this.moveAnnotationToTop(a);

    // Note: we have to fill out the HTML ourselves because
    // updateAnnotationInfo() won't touch editable annotations.
    a.editable = true;
    var editableTemplateDiv = $('#annotation-editable-template').get(0);
    a.infoDiv.innerHTML = this.getTemplateHTML(editableTemplateDiv, a);
    $(a.infoDiv).toggleClass('editable', !!a.editable);
    $(this).triggerHandler('beganEditAnnotation', a);
  };

  // This creates the hairline object and returns it.
  // It does not position it and does not attach it to the chart.
  annotations.prototype.createAnnotation = function (a) {
    var self = this;
    var color = this.getColorForSeries_(a.series);
    var $lineDiv = $('<div/>').css({
      'width': '1px',
      'left': '3px',
      'background': 'black',
      'height': '100%',
      'position': 'absolute',
      // TODO(danvk): use border-color here for consistency?
      'background-color': color,
      'z-index': 10
    }).addClass('dygraph-annotation-line');
    var $infoDiv = $('#annotation-template').clone().removeAttr('id').css({
      'position': 'absolute',
      'border-color': color,
      'z-index': 10
    }).show();
    $.extend(a, {
      lineDiv: $lineDiv.get(0),
      infoDiv: $infoDiv.get(0)
    });
    var that = this;
    $infoDiv.draggable({
      'start': function start(event, ui) {
        $(this).css({
          'bottom': ''
        });
        a.isDragging = true;
      },
      'drag': function drag(event, ui) {
        self.annotationWasDragged(a, event, ui);
      },
      'stop': function stop(event, ui) {
        $(this).css({
          'top': ''
        });
        a.isDragging = false;
        self.updateAnnotationDivPositions();
      },
      'axis': 'y',
      'containment': 'parent'
    });

    // TODO(danvk): use 'on' instead of delegate/dblclick
    $infoDiv.on('click', '.annotation-kill-button', function () {
      that.removeAnnotation(a);
      $(that).triggerHandler('annotationDeleted', a);
      $(that).triggerHandler('annotationsChanged', {});
    });
    $infoDiv.on('dblclick', function () {
      that.makeAnnotationEditable(a);
    });
    $infoDiv.on('click', '.annotation-update', function () {
      self.extractUpdatedProperties_($infoDiv.get(0), a);
      a.editable = false;
      self.updateAnnotationInfo();
      $(that).triggerHandler('annotationEdited', a);
      $(that).triggerHandler('annotationsChanged', {});
    });
    $infoDiv.on('click', '.annotation-cancel', function () {
      a.editable = false;
      self.updateAnnotationInfo();
      $(that).triggerHandler('cancelEditAnnotation', a);
    });
    return a;
  };

  // Find the index of a point in a series.
  // Returns a 2-element array, [row, col], which can be used with
  // dygraph.getValue() to get the value at this point.
  // Returns null if there's no match.
  annotations.prototype.findPointIndex_ = function (series, xval) {
    var col = this.dygraph_.getLabels().indexOf(series);
    if (col == -1) return null;
    var lowIdx = 0,
      highIdx = this.dygraph_.numRows() - 1;
    while (lowIdx <= highIdx) {
      var idx = Math.floor((lowIdx + highIdx) / 2);
      var xAtIdx = this.dygraph_.getValue(idx, 0);
      if (xAtIdx == xval) {
        return [idx, col];
      } else if (xAtIdx < xval) {
        lowIdx = idx + 1;
      } else {
        highIdx = idx - 1;
      }
    }
    return null;
  };
  annotations.prototype.getColorForSeries_ = function (series) {
    var colors = this.dygraph_.getColors();
    var col = this.dygraph_.getLabels().indexOf(series);
    if (col == -1) return null;
    return colors[(col - 1) % colors.length];
  };

  // Moves a hairline's divs to the top of the z-ordering.
  annotations.prototype.moveAnnotationToTop = function (a) {
    var div = this.dygraph_.graphDiv;
    $(a.infoDiv).appendTo(div);
    $(a.lineDiv).appendTo(div);
    var idx = this.annotations_.indexOf(a);
    this.annotations_.splice(idx, 1);
    this.annotations_.push(a);
  };

  // Positions existing hairline divs.
  annotations.prototype.updateAnnotationDivPositions = function () {
    var layout = this.dygraph_.getArea();
    var chartLeft = layout.x,
      chartRight = layout.x + layout.w;
    var chartTop = layout.y,
      chartBottom = layout.y + layout.h;
    var div = this.dygraph_.graphDiv;
    var pos = Dygraph.findPos(div);
    var box = [layout.x + pos.x, layout.y + pos.y];
    box.push(box[0] + layout.w);
    box.push(box[1] + layout.h);
    var g = this.dygraph_;
    var that = this;
    $.each(this.annotations_, function (idx, a) {
      var row_col = that.findPointIndex_(a.series, a.xval);
      if (row_col == null) {
        $([a.lineDiv, a.infoDiv]).hide();
        return;
      } else {
        // TODO(danvk): only do this if they're invisible?
        $([a.lineDiv, a.infoDiv]).show();
      }
      var xy = g.toDomCoords(a.xval, g.getValue(row_col[0], row_col[1]));
      var x = xy[0],
        pointY = xy[1];
      var lineHeight = 6; // TODO(danvk): option?

      var y = pointY;
      if (a.yFrac !== undefined) {
        y = layout.y + layout.h * a.yFrac;
      } else {
        y -= lineHeight;
      }
      var lineHeight = y < pointY ? pointY - y : y - pointY - a.infoDiv.offsetHeight;
      $(a.lineDiv).css({
        'left': x + 'px',
        'top': Math.min(y, pointY) + 'px',
        'height': lineHeight + 'px'
      });
      $(a.infoDiv).css({
        'left': x + 'px'
      });
      if (!a.isDragging) {
        // jQuery UI draggable likes to set 'top', whereas superannotations sets
        // 'bottom'. Setting both will make the annotation grow and contract as
        // the user drags it, which looks bad.
        $(a.infoDiv).css({
          'bottom': div.offsetHeight - y + 'px'
        }); //.draggable("option", "containment", box);

        var visible = x >= chartLeft && x <= chartRight && pointY >= chartTop && pointY <= chartBottom;
        $([a.infoDiv, a.lineDiv]).toggle(visible);
      }
    });
  };

  // Fills out the info div based on current coordinates.
  annotations.prototype.updateAnnotationInfo = function () {
    var g = this.dygraph_;
    var that = this;
    var templateDiv = $('#annotation-template').get(0);
    $.each(this.annotations_, function (idx, a) {
      // We should never update an editable div -- doing so may kill unsaved
      // edits to an annotation.
      $(a.infoDiv).toggleClass('editable', !!a.editable);
      if (a.editable) return;
      a.infoDiv.innerHTML = that.getTemplateHTML(templateDiv, a);
    });
  };

  /**
   * @param {!Annotation} a Internal annotation
   * @return {!PublicAnnotation} a view of the annotation for the public API.
   */
  annotations.prototype.createPublicAnnotation_ = function (a, opt_props) {
    var displayAnnotation = $.extend({}, a, opt_props);
    delete displayAnnotation['infoDiv'];
    delete displayAnnotation['lineDiv'];
    delete displayAnnotation['isDragging'];
    delete displayAnnotation['editable'];
    return displayAnnotation;
  };

  // Fill out a div using the values in the annotation object.
  // The div's html is expected to have text of the form "{{key}}"
  annotations.prototype.getTemplateHTML = function (div, a) {
    var g = this.dygraph_;
    var row_col = this.findPointIndex_(a.series, a.xval);
    if (row_col == null) return; // perhaps it's no longer a real point?
    var row = row_col[0];
    var col = row_col[1];
    var yOptView = g.optionsViewForAxis_('y1'); // TODO: support secondary, too
    var xOptView = g.optionsViewForAxis_('x');
    var xvf = g.getOptionForAxis('valueFormatter', 'x');
    var x = xvf.call(g, a.xval, xOptView);
    var y = g.getOption('valueFormatter', a.series).call(g, g.getValue(row, col), yOptView);
    var displayAnnotation = this.createPublicAnnotation_(a, {
      x: x,
      y: y
    });
    var html = div.innerHTML;
    for (var k in displayAnnotation) {
      var v = displayAnnotation[k];
      if (_typeof(v) == 'object') continue; // e.g. infoDiv or lineDiv
      html = html.replace(new RegExp('\{\{' + k + '\}\}', 'g'), v);
    }
    return html;
  };

  // Update the annotation object by looking for elements with a 'dg-ann-field'
  // attribute. For example, <input type='text' dg-ann-field='text' /> will have
  // its value placed in the 'text' attribute of the annotation.
  annotations.prototype.extractUpdatedProperties_ = function (div, a) {
    $(div).find('[dg-ann-field]').each(function (idx, el) {
      var k = $(el).attr('dg-ann-field');
      var v = $(el).val();
      a[k] = v;
    });
  };

  // After a resize, the hairline divs can get dettached from the chart.
  // This reattaches them.
  annotations.prototype.attachAnnotationsToChart_ = function () {
    var div = this.dygraph_.graphDiv;
    $.each(this.annotations_, function (idx, a) {
      // Re-attaching an editable div to the DOM can clear its focus.
      // This makes typing really difficult!
      if (a.editable) return;
      $([a.lineDiv, a.infoDiv]).appendTo(div);
    });
  };

  // Deletes a hairline and removes it from the chart.
  annotations.prototype.removeAnnotation = function (a) {
    var idx = this.annotations_.indexOf(a);
    if (idx >= 0) {
      this.annotations_.splice(idx, 1);
      $([a.lineDiv, a.infoDiv]).remove();
    } else {
      Dygraph.warn('Tried to remove non-existent annotation.');
    }
  };
  annotations.prototype.didDrawChart = function (e) {
    var g = e.dygraph;

    // Early out in the (common) case of zero annotations.
    if (this.annotations_.length === 0) return;
    this.updateAnnotationDivPositions();
    this.attachAnnotationsToChart_();
    this.updateAnnotationInfo();
  };
  annotations.prototype.pointClick = function (e) {
    // Prevent any other behavior based on this click, e.g. creation of a hairline.
    e.preventDefault();
    var a = $.extend({}, this.defaultAnnotationProperties_, {
      series: e.point.name,
      xval: e.point.xval
    });
    this.annotations_.push(this.createAnnotation(a));
    this.updateAnnotationDivPositions();
    this.updateAnnotationInfo();
    this.attachAnnotationsToChart_();
    $(this).triggerHandler('annotationCreated', a);
    $(this).triggerHandler('annotationsChanged', {});

    // Annotations should begin life editable.
    this.makeAnnotationEditable(a);
  };
  annotations.prototype.destroy = function () {
    this.detachLabels();
  };

  // Public API

  /**
   * This is a restricted view of this.annotations_ which doesn't expose
   * implementation details like the line / info divs.
   *
   * @typedef {
   *   xval:  number,      // x-value (i.e. millis or a raw number)
   *   series: string,     // series name
   * } PublicAnnotation
   */

  /**
   * @return {!Array.<!PublicAnnotation>} The current set of annotations, ordered
   *     from back to front.
   */
  annotations.prototype.get = function () {
    var result = [];
    for (var i = 0; i < this.annotations_.length; i++) {
      result.push(this.createPublicAnnotation_(this.annotations_[i]));
    }
    return result;
  };

  /**
   * Calling this will result in an annotationsChanged event being triggered, no
   * matter whether it consists of additions, deletions, moves or no changes at
   * all.
   *
   * @param {!Array.<!PublicAnnotation>} annotations The new set of annotations,
   *     ordered from back to front.
   */
  annotations.prototype.set = function (annotations) {
    // Re-use divs from the old annotations array so far as we can.
    // They're already correctly z-ordered.
    var anyCreated = false;
    for (var i = 0; i < annotations.length; i++) {
      var a = annotations[i];
      if (this.annotations_.length > i) {
        // Only the divs need to be preserved.
        var oldA = this.annotations_[i];
        this.annotations_[i] = $.extend({
          infoDiv: oldA.infoDiv,
          lineDiv: oldA.lineDiv
        }, a);
      } else {
        this.annotations_.push(this.createAnnotation(a));
        anyCreated = true;
      }
    }

    // If there are any remaining annotations, destroy them.
    while (annotations.length < this.annotations_.length) {
      this.removeAnnotation(this.annotations_[annotations.length]);
    }
    this.updateAnnotationDivPositions();
    this.updateAnnotationInfo();
    if (anyCreated) {
      this.attachAnnotationsToChart_();
    }
    $(this).triggerHandler('annotationsChanged', {});
  };
  return annotations;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEeWdyYXBoIiwiUGx1Z2lucyIsIlN1cGVyQW5ub3RhdGlvbnMiLCJhbm5vdGF0aW9ucyIsIm9wdF9vcHRpb25zIiwiYW5ub3RhdGlvbnNfIiwibGFzdFdpZHRoXyIsImxhc3RIZWlnaHQiLCJkeWdyYXBoXyIsImRlZmF1bHRBbm5vdGF0aW9uUHJvcGVydGllc18iLCIkIiwiZXh0ZW5kIiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJhY3RpdmF0ZSIsImciLCJkaWREcmF3Q2hhcnQiLCJwb2ludENsaWNrIiwiZGV0YWNoTGFiZWxzIiwiaSIsImxlbmd0aCIsImEiLCJsaW5lRGl2IiwicmVtb3ZlIiwiaW5mb0RpdiIsImFubm90YXRpb25XYXNEcmFnZ2VkIiwiZXZlbnQiLCJ1aSIsImFyZWEiLCJnZXRBcmVhIiwib2xkWUZyYWMiLCJ5RnJhYyIsIm5ld1lGcmFjIiwib2Zmc2V0VG9wIiwib2Zmc2V0SGVpZ2h0IiwieSIsImgiLCJtb3ZlQW5ub3RhdGlvblRvVG9wIiwidXBkYXRlQW5ub3RhdGlvbkRpdlBvc2l0aW9ucyIsInVwZGF0ZUFubm90YXRpb25JbmZvIiwidHJpZ2dlckhhbmRsZXIiLCJhbm5vdGF0aW9uIiwibWFrZUFubm90YXRpb25FZGl0YWJsZSIsImVkaXRhYmxlIiwiZWRpdGFibGVUZW1wbGF0ZURpdiIsImdldCIsImlubmVySFRNTCIsImdldFRlbXBsYXRlSFRNTCIsInRvZ2dsZUNsYXNzIiwiY3JlYXRlQW5ub3RhdGlvbiIsInNlbGYiLCJjb2xvciIsImdldENvbG9yRm9yU2VyaWVzXyIsInNlcmllcyIsIiRsaW5lRGl2IiwiY3NzIiwiYWRkQ2xhc3MiLCIkaW5mb0RpdiIsImNsb25lIiwicmVtb3ZlQXR0ciIsInNob3ciLCJ0aGF0IiwiZHJhZ2dhYmxlIiwiaXNEcmFnZ2luZyIsIm9uIiwicmVtb3ZlQW5ub3RhdGlvbiIsImV4dHJhY3RVcGRhdGVkUHJvcGVydGllc18iLCJmaW5kUG9pbnRJbmRleF8iLCJ4dmFsIiwiY29sIiwiZ2V0TGFiZWxzIiwiaW5kZXhPZiIsImxvd0lkeCIsImhpZ2hJZHgiLCJudW1Sb3dzIiwiaWR4IiwiTWF0aCIsImZsb29yIiwieEF0SWR4IiwiZ2V0VmFsdWUiLCJjb2xvcnMiLCJnZXRDb2xvcnMiLCJkaXYiLCJncmFwaERpdiIsImFwcGVuZFRvIiwic3BsaWNlIiwicHVzaCIsImxheW91dCIsImNoYXJ0TGVmdCIsIngiLCJjaGFydFJpZ2h0IiwidyIsImNoYXJ0VG9wIiwiY2hhcnRCb3R0b20iLCJwb3MiLCJmaW5kUG9zIiwiYm94IiwiZWFjaCIsInJvd19jb2wiLCJoaWRlIiwieHkiLCJ0b0RvbUNvb3JkcyIsInBvaW50WSIsImxpbmVIZWlnaHQiLCJ1bmRlZmluZWQiLCJtaW4iLCJ2aXNpYmxlIiwidG9nZ2xlIiwidGVtcGxhdGVEaXYiLCJjcmVhdGVQdWJsaWNBbm5vdGF0aW9uXyIsIm9wdF9wcm9wcyIsImRpc3BsYXlBbm5vdGF0aW9uIiwicm93IiwieU9wdFZpZXciLCJvcHRpb25zVmlld0ZvckF4aXNfIiwieE9wdFZpZXciLCJ4dmYiLCJnZXRPcHRpb25Gb3JBeGlzIiwiY2FsbCIsImdldE9wdGlvbiIsImh0bWwiLCJrIiwidiIsInJlcGxhY2UiLCJSZWdFeHAiLCJmaW5kIiwiZWwiLCJhdHRyIiwidmFsIiwiYXR0YWNoQW5ub3RhdGlvbnNUb0NoYXJ0XyIsIndhcm4iLCJlIiwiZHlncmFwaCIsInByZXZlbnREZWZhdWx0IiwicG9pbnQiLCJuYW1lIiwiZGVzdHJveSIsInJlc3VsdCIsInNldCIsImFueUNyZWF0ZWQiLCJvbGRBIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V4dHJhcy9zdXBlci1hbm5vdGF0aW9ucy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxMyBEYW4gVmFuZGVya2FtIChkYW52ZGtAZ21haWwuY29tKVxuICogTUlULWxpY2VuY2VkOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICpcbiAqIE5vdGU6IFRoaXMgcGx1Z2luIHJlcXVpcmVzIGpRdWVyeSBhbmQgalF1ZXJ5IFVJIERyYWdnYWJsZS5cbiAqXG4gKiBTZWUgaGlnaC1sZXZlbCBkb2N1bWVudGF0aW9uIGF0IC4uLy4uL2RvY3MvaGFpcmxpbmVzLWFubm90YXRpb25zLnBkZlxuICovXG5cbi8qZ2xvYmFsIER5Z3JhcGg6ZmFsc2UgKi9cblxuRHlncmFwaC5QbHVnaW5zLlN1cGVyQW5ub3RhdGlvbnMgPSAoZnVuY3Rpb24oKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFRoZXNlIGFyZSBqdXN0IHRoZSBiYXNpYyByZXF1aXJlbWVudHMgLS0gYW5ub3RhdGlvbnMgY2FuIGhhdmUgd2hhdGV2ZXIgb3RoZXJcbiAqIHByb3BlcnRpZXMgdGhlIGNvZGUgdGhhdCBkaXNwbGF5cyB0aGVtIHdhbnRzIHRoZW0gdG8gaGF2ZS5cbiAqXG4gKiBAdHlwZWRlZiB7XG4gKiAgIHh2YWw6ICBudW1iZXIsICAgICAgLy8geC12YWx1ZSAoaS5lLiBtaWxsaXMgb3IgYSByYXcgbnVtYmVyKVxuICogICBzZXJpZXM6IHN0cmluZywgICAgIC8vIHNlcmllcyBuYW1lXG4gKiAgIHlGcmFjOiA/bnVtYmVyLCAgICAgLy8geS1wb3NpdGlvbmluZy4gRGVmYXVsdCBpcyBhIGZldyBweCBhYm92ZSB0aGUgcG9pbnQuXG4gKiAgIGxpbmVEaXY6ICFFbGVtZW50ICAgLy8gdmVydGljYWwgZGl2IGNvbm5lY3RpbmcgcG9pbnQgdG8gaW5mbyBkaXYuXG4gKiAgIGluZm9EaXY6ICFFbGVtZW50ICAgLy8gZGl2IGNvbnRhaW5pbmcgaW5mbyBhYm91dCB0aGUgYW5ub3RhdGlvbi5cbiAqIH0gQW5ub3RhdGlvblxuICovXG5cbnZhciBhbm5vdGF0aW9ucyA9IGZ1bmN0aW9uKG9wdF9vcHRpb25zKSB7XG4gIC8qIEB0eXBlIHshQXJyYXkuPCFBbm5vdGF0aW9uPn0gKi9cbiAgdGhpcy5hbm5vdGF0aW9uc18gPSBbXTtcbiAgLy8gVXNlZCB0byBkZXRlY3QgcmVzaXplcyAod2hpY2ggcmVxdWlyZSB0aGUgZGl2cyB0byBiZSByZXBvc2l0aW9uZWQpLlxuICB0aGlzLmxhc3RXaWR0aF8gPSAtMTtcbiAgdGhpcy5sYXN0SGVpZ2h0ID0gLTE7XG4gIHRoaXMuZHlncmFwaF8gPSBudWxsO1xuXG4gIG9wdF9vcHRpb25zID0gb3B0X29wdGlvbnMgfHwge307XG4gIHRoaXMuZGVmYXVsdEFubm90YXRpb25Qcm9wZXJ0aWVzXyA9ICQuZXh0ZW5kKHtcbiAgICAndGV4dCc6ICdEZXNjcmlwdGlvbidcbiAgfSwgb3B0X29wdGlvbnNbJ2RlZmF1bHRBbm5vdGF0aW9uUHJvcGVydGllcyddKTtcbn07XG5cbmFubm90YXRpb25zLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gXCJTdXBlckFubm90YXRpb25zIFBsdWdpblwiO1xufTtcblxuYW5ub3RhdGlvbnMucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24oZykge1xuICB0aGlzLmR5Z3JhcGhfID0gZztcbiAgdGhpcy5hbm5vdGF0aW9uc18gPSBbXTtcblxuICByZXR1cm4ge1xuICAgIGRpZERyYXdDaGFydDogdGhpcy5kaWREcmF3Q2hhcnQsXG4gICAgcG9pbnRDbGljazogdGhpcy5wb2ludENsaWNrICAvLyBUT0RPKGRhbnZrKTogaW1wbGVtZW50IGluIGR5Z3JhcGhzXG4gIH07XG59O1xuXG5hbm5vdGF0aW9ucy5wcm90b3R5cGUuZGV0YWNoTGFiZWxzID0gZnVuY3Rpb24oKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hbm5vdGF0aW9uc18ubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYSA9IHRoaXMuYW5ub3RhdGlvbnNfW2ldO1xuICAgICQoYS5saW5lRGl2KS5yZW1vdmUoKTtcbiAgICAkKGEuaW5mb0RpdikucmVtb3ZlKCk7XG4gICAgdGhpcy5hbm5vdGF0aW9uc19baV0gPSBudWxsO1xuICB9XG4gIHRoaXMuYW5ub3RhdGlvbnNfID0gW107XG59O1xuXG5hbm5vdGF0aW9ucy5wcm90b3R5cGUuYW5ub3RhdGlvbldhc0RyYWdnZWQgPSBmdW5jdGlvbihhLCBldmVudCwgdWkpIHtcbiAgdmFyIGcgPSB0aGlzLmR5Z3JhcGhfO1xuICB2YXIgYXJlYSA9IGcuZ2V0QXJlYSgpO1xuICB2YXIgb2xkWUZyYWMgPSBhLnlGcmFjO1xuXG4gIHZhciBpbmZvRGl2ID0gYS5pbmZvRGl2O1xuICB2YXIgbmV3WUZyYWMgPSAoKGluZm9EaXYub2Zmc2V0VG9wICsgaW5mb0Rpdi5vZmZzZXRIZWlnaHQpIC0gYXJlYS55KSAvIGFyZWEuaDtcbiAgaWYgKG5ld1lGcmFjID09IG9sZFlGcmFjKSByZXR1cm47XG5cbiAgYS55RnJhYyA9IG5ld1lGcmFjO1xuXG4gIHRoaXMubW92ZUFubm90YXRpb25Ub1RvcChhKTtcbiAgdGhpcy51cGRhdGVBbm5vdGF0aW9uRGl2UG9zaXRpb25zKCk7XG4gIHRoaXMudXBkYXRlQW5ub3RhdGlvbkluZm8oKTtcbiAgJCh0aGlzKS50cmlnZ2VySGFuZGxlcignYW5ub3RhdGlvbk1vdmVkJywge1xuICAgIGFubm90YXRpb246IGEsXG4gICAgb2xkWUZyYWM6IG9sZFlGcmFjLFxuICAgIG5ld1lGcmFjOiBhLnlGcmFjXG4gIH0pO1xuICAkKHRoaXMpLnRyaWdnZXJIYW5kbGVyKCdhbm5vdGF0aW9uc0NoYW5nZWQnLCB7fSk7XG59O1xuXG5hbm5vdGF0aW9ucy5wcm90b3R5cGUubWFrZUFubm90YXRpb25FZGl0YWJsZSA9IGZ1bmN0aW9uKGEpIHtcbiAgaWYgKGEuZWRpdGFibGUgPT0gdHJ1ZSkgcmV0dXJuO1xuICB0aGlzLm1vdmVBbm5vdGF0aW9uVG9Ub3AoYSk7XG5cbiAgLy8gTm90ZTogd2UgaGF2ZSB0byBmaWxsIG91dCB0aGUgSFRNTCBvdXJzZWx2ZXMgYmVjYXVzZVxuICAvLyB1cGRhdGVBbm5vdGF0aW9uSW5mbygpIHdvbid0IHRvdWNoIGVkaXRhYmxlIGFubm90YXRpb25zLlxuICBhLmVkaXRhYmxlID0gdHJ1ZTtcbiAgdmFyIGVkaXRhYmxlVGVtcGxhdGVEaXYgPSAkKCcjYW5ub3RhdGlvbi1lZGl0YWJsZS10ZW1wbGF0ZScpLmdldCgwKTtcbiAgYS5pbmZvRGl2LmlubmVySFRNTCA9IHRoaXMuZ2V0VGVtcGxhdGVIVE1MKGVkaXRhYmxlVGVtcGxhdGVEaXYsIGEpO1xuICAkKGEuaW5mb0RpdikudG9nZ2xlQ2xhc3MoJ2VkaXRhYmxlJywgISFhLmVkaXRhYmxlKTtcbiAgJCh0aGlzKS50cmlnZ2VySGFuZGxlcignYmVnYW5FZGl0QW5ub3RhdGlvbicsIGEpO1xufTtcblxuLy8gVGhpcyBjcmVhdGVzIHRoZSBoYWlybGluZSBvYmplY3QgYW5kIHJldHVybnMgaXQuXG4vLyBJdCBkb2VzIG5vdCBwb3NpdGlvbiBpdCBhbmQgZG9lcyBub3QgYXR0YWNoIGl0IHRvIHRoZSBjaGFydC5cbmFubm90YXRpb25zLnByb3RvdHlwZS5jcmVhdGVBbm5vdGF0aW9uID0gZnVuY3Rpb24oYSkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdmFyIGNvbG9yID0gdGhpcy5nZXRDb2xvckZvclNlcmllc18oYS5zZXJpZXMpO1xuXG4gIHZhciAkbGluZURpdiA9ICQoJzxkaXYvPicpLmNzcyh7XG4gICAgJ3dpZHRoJzogJzFweCcsXG4gICAgJ2xlZnQnOiAnM3B4JyxcbiAgICAnYmFja2dyb3VuZCc6ICdibGFjaycsXG4gICAgJ2hlaWdodCc6ICcxMDAlJyxcbiAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxuICAgIC8vIFRPRE8oZGFudmspOiB1c2UgYm9yZGVyLWNvbG9yIGhlcmUgZm9yIGNvbnNpc3RlbmN5P1xuICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogY29sb3IsXG4gICAgJ3otaW5kZXgnOiAxMFxuICB9KS5hZGRDbGFzcygnZHlncmFwaC1hbm5vdGF0aW9uLWxpbmUnKTtcblxuICB2YXIgJGluZm9EaXYgPSAkKCcjYW5ub3RhdGlvbi10ZW1wbGF0ZScpLmNsb25lKCkucmVtb3ZlQXR0cignaWQnKS5jc3Moe1xuICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcbiAgICAgICdib3JkZXItY29sb3InOiBjb2xvcixcbiAgICAgICd6LWluZGV4JzogMTBcbiAgICB9KVxuICAgIC5zaG93KCk7XG5cbiAgJC5leHRlbmQoYSwge1xuICAgIGxpbmVEaXY6ICRsaW5lRGl2LmdldCgwKSxcbiAgICBpbmZvRGl2OiAkaW5mb0Rpdi5nZXQoMClcbiAgfSk7XG5cbiAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICRpbmZvRGl2LmRyYWdnYWJsZSh7XG4gICAgJ3N0YXJ0JzogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG4gICAgICAkKHRoaXMpLmNzcyh7J2JvdHRvbSc6ICcnfSk7XG4gICAgICBhLmlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgIH0sXG4gICAgJ2RyYWcnOiBmdW5jdGlvbihldmVudCwgdWkpIHtcbiAgICAgIHNlbGYuYW5ub3RhdGlvbldhc0RyYWdnZWQoYSwgZXZlbnQsIHVpKTtcbiAgICB9LFxuICAgICdzdG9wJzogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG4gICAgICAkKHRoaXMpLmNzcyh7J3RvcCc6ICcnfSk7XG4gICAgICBhLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgIHNlbGYudXBkYXRlQW5ub3RhdGlvbkRpdlBvc2l0aW9ucygpO1xuICAgIH0sXG4gICAgJ2F4aXMnOiAneScsXG4gICAgJ2NvbnRhaW5tZW50JzogJ3BhcmVudCdcbiAgfSk7XG5cbiAgLy8gVE9ETyhkYW52ayk6IHVzZSAnb24nIGluc3RlYWQgb2YgZGVsZWdhdGUvZGJsY2xpY2tcbiAgJGluZm9EaXYub24oJ2NsaWNrJywgJy5hbm5vdGF0aW9uLWtpbGwtYnV0dG9uJywgZnVuY3Rpb24oKSB7XG4gICAgdGhhdC5yZW1vdmVBbm5vdGF0aW9uKGEpO1xuICAgICQodGhhdCkudHJpZ2dlckhhbmRsZXIoJ2Fubm90YXRpb25EZWxldGVkJywgYSk7XG4gICAgJCh0aGF0KS50cmlnZ2VySGFuZGxlcignYW5ub3RhdGlvbnNDaGFuZ2VkJywge30pO1xuICB9KTtcblxuICAkaW5mb0Rpdi5vbignZGJsY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICB0aGF0Lm1ha2VBbm5vdGF0aW9uRWRpdGFibGUoYSk7XG4gIH0pO1xuICAkaW5mb0Rpdi5vbignY2xpY2snLCAnLmFubm90YXRpb24tdXBkYXRlJywgZnVuY3Rpb24oKSB7XG4gICAgc2VsZi5leHRyYWN0VXBkYXRlZFByb3BlcnRpZXNfKCRpbmZvRGl2LmdldCgwKSwgYSk7XG4gICAgYS5lZGl0YWJsZSA9IGZhbHNlO1xuICAgIHNlbGYudXBkYXRlQW5ub3RhdGlvbkluZm8oKTtcbiAgICAkKHRoYXQpLnRyaWdnZXJIYW5kbGVyKCdhbm5vdGF0aW9uRWRpdGVkJywgYSk7XG4gICAgJCh0aGF0KS50cmlnZ2VySGFuZGxlcignYW5ub3RhdGlvbnNDaGFuZ2VkJywge30pO1xuICB9KTtcbiAgJGluZm9EaXYub24oJ2NsaWNrJywgJy5hbm5vdGF0aW9uLWNhbmNlbCcsIGZ1bmN0aW9uKCkge1xuICAgIGEuZWRpdGFibGUgPSBmYWxzZTtcbiAgICBzZWxmLnVwZGF0ZUFubm90YXRpb25JbmZvKCk7XG4gICAgJCh0aGF0KS50cmlnZ2VySGFuZGxlcignY2FuY2VsRWRpdEFubm90YXRpb24nLCBhKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vLyBGaW5kIHRoZSBpbmRleCBvZiBhIHBvaW50IGluIGEgc2VyaWVzLlxuLy8gUmV0dXJucyBhIDItZWxlbWVudCBhcnJheSwgW3JvdywgY29sXSwgd2hpY2ggY2FuIGJlIHVzZWQgd2l0aFxuLy8gZHlncmFwaC5nZXRWYWx1ZSgpIHRvIGdldCB0aGUgdmFsdWUgYXQgdGhpcyBwb2ludC5cbi8vIFJldHVybnMgbnVsbCBpZiB0aGVyZSdzIG5vIG1hdGNoLlxuYW5ub3RhdGlvbnMucHJvdG90eXBlLmZpbmRQb2ludEluZGV4XyA9IGZ1bmN0aW9uKHNlcmllcywgeHZhbCkge1xuICB2YXIgY29sID0gdGhpcy5keWdyYXBoXy5nZXRMYWJlbHMoKS5pbmRleE9mKHNlcmllcyk7XG4gIGlmIChjb2wgPT0gLTEpIHJldHVybiBudWxsO1xuXG4gIHZhciBsb3dJZHggPSAwLCBoaWdoSWR4ID0gdGhpcy5keWdyYXBoXy5udW1Sb3dzKCkgLSAxO1xuICB3aGlsZSAobG93SWR4IDw9IGhpZ2hJZHgpIHtcbiAgICB2YXIgaWR4ID0gTWF0aC5mbG9vcigobG93SWR4ICsgaGlnaElkeCkgLyAyKTtcbiAgICB2YXIgeEF0SWR4ID0gdGhpcy5keWdyYXBoXy5nZXRWYWx1ZShpZHgsIDApO1xuICAgIGlmICh4QXRJZHggPT0geHZhbCkge1xuICAgICAgcmV0dXJuIFtpZHgsIGNvbF07XG4gICAgfSBlbHNlIGlmICh4QXRJZHggPCB4dmFsKSB7XG4gICAgICBsb3dJZHggPSBpZHggKyAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBoaWdoSWR4ID0gaWR4IC0gMTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5hbm5vdGF0aW9ucy5wcm90b3R5cGUuZ2V0Q29sb3JGb3JTZXJpZXNfID0gZnVuY3Rpb24oc2VyaWVzKSB7XG4gIHZhciBjb2xvcnMgPSB0aGlzLmR5Z3JhcGhfLmdldENvbG9ycygpO1xuICB2YXIgY29sID0gdGhpcy5keWdyYXBoXy5nZXRMYWJlbHMoKS5pbmRleE9mKHNlcmllcyk7XG4gIGlmIChjb2wgPT0gLTEpIHJldHVybiBudWxsO1xuXG4gIHJldHVybiBjb2xvcnNbKGNvbCAtIDEpICUgY29sb3JzLmxlbmd0aF07XG59O1xuXG4vLyBNb3ZlcyBhIGhhaXJsaW5lJ3MgZGl2cyB0byB0aGUgdG9wIG9mIHRoZSB6LW9yZGVyaW5nLlxuYW5ub3RhdGlvbnMucHJvdG90eXBlLm1vdmVBbm5vdGF0aW9uVG9Ub3AgPSBmdW5jdGlvbihhKSB7XG4gIHZhciBkaXYgPSB0aGlzLmR5Z3JhcGhfLmdyYXBoRGl2O1xuICAkKGEuaW5mb0RpdikuYXBwZW5kVG8oZGl2KTtcbiAgJChhLmxpbmVEaXYpLmFwcGVuZFRvKGRpdik7XG5cbiAgdmFyIGlkeCA9IHRoaXMuYW5ub3RhdGlvbnNfLmluZGV4T2YoYSk7XG4gIHRoaXMuYW5ub3RhdGlvbnNfLnNwbGljZShpZHgsIDEpO1xuICB0aGlzLmFubm90YXRpb25zXy5wdXNoKGEpO1xufTtcblxuLy8gUG9zaXRpb25zIGV4aXN0aW5nIGhhaXJsaW5lIGRpdnMuXG5hbm5vdGF0aW9ucy5wcm90b3R5cGUudXBkYXRlQW5ub3RhdGlvbkRpdlBvc2l0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbGF5b3V0ID0gdGhpcy5keWdyYXBoXy5nZXRBcmVhKCk7XG4gIHZhciBjaGFydExlZnQgPSBsYXlvdXQueCwgY2hhcnRSaWdodCA9IGxheW91dC54ICsgbGF5b3V0Lnc7XG4gIHZhciBjaGFydFRvcCA9IGxheW91dC55LCBjaGFydEJvdHRvbSA9IGxheW91dC55ICsgbGF5b3V0Lmg7XG4gIHZhciBkaXYgPSB0aGlzLmR5Z3JhcGhfLmdyYXBoRGl2O1xuICB2YXIgcG9zID0gRHlncmFwaC5maW5kUG9zKGRpdik7XG4gIHZhciBib3ggPSBbbGF5b3V0LnggKyBwb3MueCwgbGF5b3V0LnkgKyBwb3MueV07XG4gIGJveC5wdXNoKGJveFswXSArIGxheW91dC53KTtcbiAgYm94LnB1c2goYm94WzFdICsgbGF5b3V0LmgpO1xuXG4gIHZhciBnID0gdGhpcy5keWdyYXBoXztcblxuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQuZWFjaCh0aGlzLmFubm90YXRpb25zXywgZnVuY3Rpb24oaWR4LCBhKSB7XG4gICAgdmFyIHJvd19jb2wgPSB0aGF0LmZpbmRQb2ludEluZGV4XyhhLnNlcmllcywgYS54dmFsKTtcbiAgICBpZiAocm93X2NvbCA9PSBudWxsKSB7XG4gICAgICAkKFthLmxpbmVEaXYsIGEuaW5mb0Rpdl0pLmhpZGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVE9ETyhkYW52ayk6IG9ubHkgZG8gdGhpcyBpZiB0aGV5J3JlIGludmlzaWJsZT9cbiAgICAgICQoW2EubGluZURpdiwgYS5pbmZvRGl2XSkuc2hvdygpO1xuICAgIH1cbiAgICB2YXIgeHkgPSBnLnRvRG9tQ29vcmRzKGEueHZhbCwgZy5nZXRWYWx1ZShyb3dfY29sWzBdLCByb3dfY29sWzFdKSk7XG4gICAgdmFyIHggPSB4eVswXSwgcG9pbnRZID0geHlbMV07XG5cbiAgICB2YXIgbGluZUhlaWdodCA9IDY7ICAvLyBUT0RPKGRhbnZrKTogb3B0aW9uP1xuXG4gICAgdmFyIHkgPSBwb2ludFk7XG4gICAgaWYgKGEueUZyYWMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgeSA9IGxheW91dC55ICsgbGF5b3V0LmggKiBhLnlGcmFjO1xuICAgIH0gZWxzZSB7XG4gICAgICB5IC09IGxpbmVIZWlnaHQ7XG4gICAgfVxuXG4gICAgdmFyIGxpbmVIZWlnaHQgPSB5IDwgcG9pbnRZID8gKHBvaW50WSAtIHkpIDogKHkgLSBwb2ludFkgLSBhLmluZm9EaXYub2Zmc2V0SGVpZ2h0KTtcbiAgICAkKGEubGluZURpdikuY3NzKHtcbiAgICAgICdsZWZ0JzogeCArICdweCcsXG4gICAgICAndG9wJzogTWF0aC5taW4oeSwgcG9pbnRZKSArICdweCcsXG4gICAgICAnaGVpZ2h0JzogbGluZUhlaWdodCArICdweCdcbiAgICB9KTtcbiAgICAkKGEuaW5mb0RpdikuY3NzKHtcbiAgICAgICdsZWZ0JzogeCArICdweCcsXG4gICAgfSk7XG4gICAgaWYgKCFhLmlzRHJhZ2dpbmcpIHtcbiAgICAgIC8vIGpRdWVyeSBVSSBkcmFnZ2FibGUgbGlrZXMgdG8gc2V0ICd0b3AnLCB3aGVyZWFzIHN1cGVyYW5ub3RhdGlvbnMgc2V0c1xuICAgICAgLy8gJ2JvdHRvbScuIFNldHRpbmcgYm90aCB3aWxsIG1ha2UgdGhlIGFubm90YXRpb24gZ3JvdyBhbmQgY29udHJhY3QgYXNcbiAgICAgIC8vIHRoZSB1c2VyIGRyYWdzIGl0LCB3aGljaCBsb29rcyBiYWQuXG4gICAgICAkKGEuaW5mb0RpdikuY3NzKHtcbiAgICAgICAgJ2JvdHRvbSc6IChkaXYub2Zmc2V0SGVpZ2h0IC0geSkgKyAncHgnXG4gICAgICB9KSAgLy8uZHJhZ2dhYmxlKFwib3B0aW9uXCIsIFwiY29udGFpbm1lbnRcIiwgYm94KTtcblxuICAgICAgdmFyIHZpc2libGUgPSAoeCA+PSBjaGFydExlZnQgJiYgeCA8PSBjaGFydFJpZ2h0KSAmJlxuICAgICAgICAgICAgICAgICAgICAocG9pbnRZID49IGNoYXJ0VG9wICYmIHBvaW50WSA8PSBjaGFydEJvdHRvbSk7XG4gICAgICAkKFthLmluZm9EaXYsIGEubGluZURpdl0pLnRvZ2dsZSh2aXNpYmxlKTtcbiAgICB9XG4gIH0pO1xufTtcblxuLy8gRmlsbHMgb3V0IHRoZSBpbmZvIGRpdiBiYXNlZCBvbiBjdXJyZW50IGNvb3JkaW5hdGVzLlxuYW5ub3RhdGlvbnMucHJvdG90eXBlLnVwZGF0ZUFubm90YXRpb25JbmZvID0gZnVuY3Rpb24oKSB7XG4gIHZhciBnID0gdGhpcy5keWdyYXBoXztcblxuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciB0ZW1wbGF0ZURpdiA9ICQoJyNhbm5vdGF0aW9uLXRlbXBsYXRlJykuZ2V0KDApO1xuICAkLmVhY2godGhpcy5hbm5vdGF0aW9uc18sIGZ1bmN0aW9uKGlkeCwgYSkge1xuICAgIC8vIFdlIHNob3VsZCBuZXZlciB1cGRhdGUgYW4gZWRpdGFibGUgZGl2IC0tIGRvaW5nIHNvIG1heSBraWxsIHVuc2F2ZWRcbiAgICAvLyBlZGl0cyB0byBhbiBhbm5vdGF0aW9uLlxuICAgICQoYS5pbmZvRGl2KS50b2dnbGVDbGFzcygnZWRpdGFibGUnLCAhIWEuZWRpdGFibGUpO1xuICAgIGlmIChhLmVkaXRhYmxlKSByZXR1cm47XG4gICAgYS5pbmZvRGl2LmlubmVySFRNTCA9IHRoYXQuZ2V0VGVtcGxhdGVIVE1MKHRlbXBsYXRlRGl2LCBhKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7IUFubm90YXRpb259IGEgSW50ZXJuYWwgYW5ub3RhdGlvblxuICogQHJldHVybiB7IVB1YmxpY0Fubm90YXRpb259IGEgdmlldyBvZiB0aGUgYW5ub3RhdGlvbiBmb3IgdGhlIHB1YmxpYyBBUEkuXG4gKi9cbmFubm90YXRpb25zLnByb3RvdHlwZS5jcmVhdGVQdWJsaWNBbm5vdGF0aW9uXyA9IGZ1bmN0aW9uKGEsIG9wdF9wcm9wcykge1xuICB2YXIgZGlzcGxheUFubm90YXRpb24gPSAkLmV4dGVuZCh7fSwgYSwgb3B0X3Byb3BzKTtcbiAgZGVsZXRlIGRpc3BsYXlBbm5vdGF0aW9uWydpbmZvRGl2J107XG4gIGRlbGV0ZSBkaXNwbGF5QW5ub3RhdGlvblsnbGluZURpdiddO1xuICBkZWxldGUgZGlzcGxheUFubm90YXRpb25bJ2lzRHJhZ2dpbmcnXTtcbiAgZGVsZXRlIGRpc3BsYXlBbm5vdGF0aW9uWydlZGl0YWJsZSddO1xuICByZXR1cm4gZGlzcGxheUFubm90YXRpb247XG59O1xuXG4vLyBGaWxsIG91dCBhIGRpdiB1c2luZyB0aGUgdmFsdWVzIGluIHRoZSBhbm5vdGF0aW9uIG9iamVjdC5cbi8vIFRoZSBkaXYncyBodG1sIGlzIGV4cGVjdGVkIHRvIGhhdmUgdGV4dCBvZiB0aGUgZm9ybSBcInt7a2V5fX1cIlxuYW5ub3RhdGlvbnMucHJvdG90eXBlLmdldFRlbXBsYXRlSFRNTCA9IGZ1bmN0aW9uKGRpdiwgYSkge1xuICB2YXIgZyA9IHRoaXMuZHlncmFwaF87XG4gIHZhciByb3dfY29sID0gdGhpcy5maW5kUG9pbnRJbmRleF8oYS5zZXJpZXMsIGEueHZhbCk7XG4gIGlmIChyb3dfY29sID09IG51bGwpIHJldHVybjsgIC8vIHBlcmhhcHMgaXQncyBubyBsb25nZXIgYSByZWFsIHBvaW50P1xuICB2YXIgcm93ID0gcm93X2NvbFswXTtcbiAgdmFyIGNvbCA9IHJvd19jb2xbMV07XG5cbiAgdmFyIHlPcHRWaWV3ID0gZy5vcHRpb25zVmlld0ZvckF4aXNfKCd5MScpOyAgLy8gVE9ETzogc3VwcG9ydCBzZWNvbmRhcnksIHRvb1xuICB2YXIgeE9wdFZpZXcgPSBnLm9wdGlvbnNWaWV3Rm9yQXhpc18oJ3gnKTtcbiAgdmFyIHh2ZiA9IGcuZ2V0T3B0aW9uRm9yQXhpcygndmFsdWVGb3JtYXR0ZXInLCAneCcpO1xuXG4gIHZhciB4ID0geHZmLmNhbGwoZywgYS54dmFsLCB4T3B0Vmlldyk7XG4gIHZhciB5ID0gZy5nZXRPcHRpb24oJ3ZhbHVlRm9ybWF0dGVyJywgYS5zZXJpZXMpLmNhbGwoXG4gICAgICBnLCBnLmdldFZhbHVlKHJvdywgY29sKSwgeU9wdFZpZXcpO1xuXG4gIHZhciBkaXNwbGF5QW5ub3RhdGlvbiA9IHRoaXMuY3JlYXRlUHVibGljQW5ub3RhdGlvbl8oYSwge3g6eCwgeTp5fSk7XG4gIHZhciBodG1sID0gZGl2LmlubmVySFRNTDtcbiAgZm9yICh2YXIgayBpbiBkaXNwbGF5QW5ub3RhdGlvbikge1xuICAgIHZhciB2ID0gZGlzcGxheUFubm90YXRpb25ba107XG4gICAgaWYgKHR5cGVvZih2KSA9PSAnb2JqZWN0JykgY29udGludWU7ICAvLyBlLmcuIGluZm9EaXYgb3IgbGluZURpdlxuICAgIGh0bWwgPSBodG1sLnJlcGxhY2UobmV3IFJlZ0V4cCgnXFx7XFx7JyArIGsgKyAnXFx9XFx9JywgJ2cnKSwgdik7XG4gIH1cbiAgcmV0dXJuIGh0bWw7XG59O1xuXG4vLyBVcGRhdGUgdGhlIGFubm90YXRpb24gb2JqZWN0IGJ5IGxvb2tpbmcgZm9yIGVsZW1lbnRzIHdpdGggYSAnZGctYW5uLWZpZWxkJ1xuLy8gYXR0cmlidXRlLiBGb3IgZXhhbXBsZSwgPGlucHV0IHR5cGU9J3RleHQnIGRnLWFubi1maWVsZD0ndGV4dCcgLz4gd2lsbCBoYXZlXG4vLyBpdHMgdmFsdWUgcGxhY2VkIGluIHRoZSAndGV4dCcgYXR0cmlidXRlIG9mIHRoZSBhbm5vdGF0aW9uLlxuYW5ub3RhdGlvbnMucHJvdG90eXBlLmV4dHJhY3RVcGRhdGVkUHJvcGVydGllc18gPSBmdW5jdGlvbihkaXYsIGEpIHtcbiAgJChkaXYpLmZpbmQoJ1tkZy1hbm4tZmllbGRdJykuZWFjaChmdW5jdGlvbihpZHgsIGVsKSB7XG4gICAgdmFyIGsgPSAkKGVsKS5hdHRyKCdkZy1hbm4tZmllbGQnKTtcbiAgICB2YXIgdiA9ICQoZWwpLnZhbCgpO1xuICAgIGFba10gPSB2O1xuICB9KTtcbn07XG5cbi8vIEFmdGVyIGEgcmVzaXplLCB0aGUgaGFpcmxpbmUgZGl2cyBjYW4gZ2V0IGRldHRhY2hlZCBmcm9tIHRoZSBjaGFydC5cbi8vIFRoaXMgcmVhdHRhY2hlcyB0aGVtLlxuYW5ub3RhdGlvbnMucHJvdG90eXBlLmF0dGFjaEFubm90YXRpb25zVG9DaGFydF8gPSBmdW5jdGlvbigpIHtcbiAgdmFyIGRpdiA9IHRoaXMuZHlncmFwaF8uZ3JhcGhEaXY7XG4gICQuZWFjaCh0aGlzLmFubm90YXRpb25zXywgZnVuY3Rpb24oaWR4LCBhKSB7XG4gICAgLy8gUmUtYXR0YWNoaW5nIGFuIGVkaXRhYmxlIGRpdiB0byB0aGUgRE9NIGNhbiBjbGVhciBpdHMgZm9jdXMuXG4gICAgLy8gVGhpcyBtYWtlcyB0eXBpbmcgcmVhbGx5IGRpZmZpY3VsdCFcbiAgICBpZiAoYS5lZGl0YWJsZSkgcmV0dXJuO1xuXG4gICAgJChbYS5saW5lRGl2LCBhLmluZm9EaXZdKS5hcHBlbmRUbyhkaXYpO1xuICB9KTtcbn07XG5cbi8vIERlbGV0ZXMgYSBoYWlybGluZSBhbmQgcmVtb3ZlcyBpdCBmcm9tIHRoZSBjaGFydC5cbmFubm90YXRpb25zLnByb3RvdHlwZS5yZW1vdmVBbm5vdGF0aW9uID0gZnVuY3Rpb24oYSkge1xuICB2YXIgaWR4ID0gdGhpcy5hbm5vdGF0aW9uc18uaW5kZXhPZihhKTtcbiAgaWYgKGlkeCA+PSAwKSB7XG4gICAgdGhpcy5hbm5vdGF0aW9uc18uc3BsaWNlKGlkeCwgMSk7XG4gICAgJChbYS5saW5lRGl2LCBhLmluZm9EaXZdKS5yZW1vdmUoKTtcbiAgfSBlbHNlIHtcbiAgICBEeWdyYXBoLndhcm4oJ1RyaWVkIHRvIHJlbW92ZSBub24tZXhpc3RlbnQgYW5ub3RhdGlvbi4nKTtcbiAgfVxufTtcblxuYW5ub3RhdGlvbnMucHJvdG90eXBlLmRpZERyYXdDaGFydCA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGcgPSBlLmR5Z3JhcGg7XG5cbiAgLy8gRWFybHkgb3V0IGluIHRoZSAoY29tbW9uKSBjYXNlIG9mIHplcm8gYW5ub3RhdGlvbnMuXG4gIGlmICh0aGlzLmFubm90YXRpb25zXy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICB0aGlzLnVwZGF0ZUFubm90YXRpb25EaXZQb3NpdGlvbnMoKTtcbiAgdGhpcy5hdHRhY2hBbm5vdGF0aW9uc1RvQ2hhcnRfKCk7XG4gIHRoaXMudXBkYXRlQW5ub3RhdGlvbkluZm8oKTtcbn07XG5cbmFubm90YXRpb25zLnByb3RvdHlwZS5wb2ludENsaWNrID0gZnVuY3Rpb24oZSkge1xuICAvLyBQcmV2ZW50IGFueSBvdGhlciBiZWhhdmlvciBiYXNlZCBvbiB0aGlzIGNsaWNrLCBlLmcuIGNyZWF0aW9uIG9mIGEgaGFpcmxpbmUuXG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICB2YXIgYSA9ICQuZXh0ZW5kKHt9LCB0aGlzLmRlZmF1bHRBbm5vdGF0aW9uUHJvcGVydGllc18sIHtcbiAgICBzZXJpZXM6IGUucG9pbnQubmFtZSxcbiAgICB4dmFsOiBlLnBvaW50Lnh2YWxcbiAgfSk7XG4gIHRoaXMuYW5ub3RhdGlvbnNfLnB1c2godGhpcy5jcmVhdGVBbm5vdGF0aW9uKGEpKTtcblxuICB0aGlzLnVwZGF0ZUFubm90YXRpb25EaXZQb3NpdGlvbnMoKTtcbiAgdGhpcy51cGRhdGVBbm5vdGF0aW9uSW5mbygpO1xuICB0aGlzLmF0dGFjaEFubm90YXRpb25zVG9DaGFydF8oKTtcblxuICAkKHRoaXMpLnRyaWdnZXJIYW5kbGVyKCdhbm5vdGF0aW9uQ3JlYXRlZCcsIGEpO1xuICAkKHRoaXMpLnRyaWdnZXJIYW5kbGVyKCdhbm5vdGF0aW9uc0NoYW5nZWQnLCB7fSk7XG5cbiAgLy8gQW5ub3RhdGlvbnMgc2hvdWxkIGJlZ2luIGxpZmUgZWRpdGFibGUuXG4gIHRoaXMubWFrZUFubm90YXRpb25FZGl0YWJsZShhKTtcbn07XG5cbmFubm90YXRpb25zLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZGV0YWNoTGFiZWxzKCk7XG59O1xuXG4vLyBQdWJsaWMgQVBJXG5cbi8qKlxuICogVGhpcyBpcyBhIHJlc3RyaWN0ZWQgdmlldyBvZiB0aGlzLmFubm90YXRpb25zXyB3aGljaCBkb2Vzbid0IGV4cG9zZVxuICogaW1wbGVtZW50YXRpb24gZGV0YWlscyBsaWtlIHRoZSBsaW5lIC8gaW5mbyBkaXZzLlxuICpcbiAqIEB0eXBlZGVmIHtcbiAqICAgeHZhbDogIG51bWJlciwgICAgICAvLyB4LXZhbHVlIChpLmUuIG1pbGxpcyBvciBhIHJhdyBudW1iZXIpXG4gKiAgIHNlcmllczogc3RyaW5nLCAgICAgLy8gc2VyaWVzIG5hbWVcbiAqIH0gUHVibGljQW5ub3RhdGlvblxuICovXG5cbi8qKlxuICogQHJldHVybiB7IUFycmF5LjwhUHVibGljQW5ub3RhdGlvbj59IFRoZSBjdXJyZW50IHNldCBvZiBhbm5vdGF0aW9ucywgb3JkZXJlZFxuICogICAgIGZyb20gYmFjayB0byBmcm9udC5cbiAqL1xuYW5ub3RhdGlvbnMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hbm5vdGF0aW9uc18ubGVuZ3RoOyBpKyspIHtcbiAgICByZXN1bHQucHVzaCh0aGlzLmNyZWF0ZVB1YmxpY0Fubm90YXRpb25fKHRoaXMuYW5ub3RhdGlvbnNfW2ldKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogQ2FsbGluZyB0aGlzIHdpbGwgcmVzdWx0IGluIGFuIGFubm90YXRpb25zQ2hhbmdlZCBldmVudCBiZWluZyB0cmlnZ2VyZWQsIG5vXG4gKiBtYXR0ZXIgd2hldGhlciBpdCBjb25zaXN0cyBvZiBhZGRpdGlvbnMsIGRlbGV0aW9ucywgbW92ZXMgb3Igbm8gY2hhbmdlcyBhdFxuICogYWxsLlxuICpcbiAqIEBwYXJhbSB7IUFycmF5LjwhUHVibGljQW5ub3RhdGlvbj59IGFubm90YXRpb25zIFRoZSBuZXcgc2V0IG9mIGFubm90YXRpb25zLFxuICogICAgIG9yZGVyZWQgZnJvbSBiYWNrIHRvIGZyb250LlxuICovXG5hbm5vdGF0aW9ucy5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24oYW5ub3RhdGlvbnMpIHtcbiAgLy8gUmUtdXNlIGRpdnMgZnJvbSB0aGUgb2xkIGFubm90YXRpb25zIGFycmF5IHNvIGZhciBhcyB3ZSBjYW4uXG4gIC8vIFRoZXkncmUgYWxyZWFkeSBjb3JyZWN0bHkgei1vcmRlcmVkLlxuICB2YXIgYW55Q3JlYXRlZCA9IGZhbHNlO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFubm90YXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGEgPSBhbm5vdGF0aW9uc1tpXTtcblxuICAgIGlmICh0aGlzLmFubm90YXRpb25zXy5sZW5ndGggPiBpKSB7XG4gICAgICAvLyBPbmx5IHRoZSBkaXZzIG5lZWQgdG8gYmUgcHJlc2VydmVkLlxuICAgICAgdmFyIG9sZEEgPSB0aGlzLmFubm90YXRpb25zX1tpXTtcbiAgICAgIHRoaXMuYW5ub3RhdGlvbnNfW2ldID0gJC5leHRlbmQoe1xuICAgICAgICBpbmZvRGl2OiBvbGRBLmluZm9EaXYsXG4gICAgICAgIGxpbmVEaXY6IG9sZEEubGluZURpdlxuICAgICAgfSwgYSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYW5ub3RhdGlvbnNfLnB1c2godGhpcy5jcmVhdGVBbm5vdGF0aW9uKGEpKTtcbiAgICAgIGFueUNyZWF0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIElmIHRoZXJlIGFyZSBhbnkgcmVtYWluaW5nIGFubm90YXRpb25zLCBkZXN0cm95IHRoZW0uXG4gIHdoaWxlIChhbm5vdGF0aW9ucy5sZW5ndGggPCB0aGlzLmFubm90YXRpb25zXy5sZW5ndGgpIHtcbiAgICB0aGlzLnJlbW92ZUFubm90YXRpb24odGhpcy5hbm5vdGF0aW9uc19bYW5ub3RhdGlvbnMubGVuZ3RoXSk7XG4gIH1cblxuICB0aGlzLnVwZGF0ZUFubm90YXRpb25EaXZQb3NpdGlvbnMoKTtcbiAgdGhpcy51cGRhdGVBbm5vdGF0aW9uSW5mbygpO1xuICBpZiAoYW55Q3JlYXRlZCkge1xuICAgIHRoaXMuYXR0YWNoQW5ub3RhdGlvbnNUb0NoYXJ0XygpO1xuICB9XG5cbiAgJCh0aGlzKS50cmlnZ2VySGFuZGxlcignYW5ub3RhdGlvbnNDaGFuZ2VkJywge30pO1xufTtcblxucmV0dXJuIGFubm90YXRpb25zO1xuXG59KSgpO1xuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUFBLE9BQU8sQ0FBQ0MsT0FBTyxDQUFDQyxnQkFBZ0IsR0FBSSxZQUFXO0VBRS9DLFlBQVk7O0VBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBRUEsSUFBSUMsV0FBVyxHQUFHLFNBQWRBLFdBQVcsQ0FBWUMsV0FBVyxFQUFFO0lBQ3RDO0lBQ0EsSUFBSSxDQUFDQyxZQUFZLEdBQUcsRUFBRTtJQUN0QjtJQUNBLElBQUksQ0FBQ0MsVUFBVSxHQUFHLENBQUMsQ0FBQztJQUNwQixJQUFJLENBQUNDLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDcEIsSUFBSSxDQUFDQyxRQUFRLEdBQUcsSUFBSTtJQUVwQkosV0FBVyxHQUFHQSxXQUFXLElBQUksQ0FBQyxDQUFDO0lBQy9CLElBQUksQ0FBQ0ssNEJBQTRCLEdBQUdDLENBQUMsQ0FBQ0MsTUFBTSxDQUFDO01BQzNDLE1BQU0sRUFBRTtJQUNWLENBQUMsRUFBRVAsV0FBVyxDQUFDLDZCQUE2QixDQUFDLENBQUM7RUFDaEQsQ0FBQztFQUVERCxXQUFXLENBQUNTLFNBQVMsQ0FBQ0MsUUFBUSxHQUFHLFlBQVc7SUFDMUMsT0FBTyx5QkFBeUI7RUFDbEMsQ0FBQztFQUVEVixXQUFXLENBQUNTLFNBQVMsQ0FBQ0UsUUFBUSxHQUFHLFVBQVNDLENBQUMsRUFBRTtJQUMzQyxJQUFJLENBQUNQLFFBQVEsR0FBR08sQ0FBQztJQUNqQixJQUFJLENBQUNWLFlBQVksR0FBRyxFQUFFO0lBRXRCLE9BQU87TUFDTFcsWUFBWSxFQUFFLElBQUksQ0FBQ0EsWUFBWTtNQUMvQkMsVUFBVSxFQUFFLElBQUksQ0FBQ0EsVUFBVSxDQUFFO0lBQy9CLENBQUM7RUFDSCxDQUFDOztFQUVEZCxXQUFXLENBQUNTLFNBQVMsQ0FBQ00sWUFBWSxHQUFHLFlBQVc7SUFDOUMsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsSUFBSSxDQUFDZCxZQUFZLENBQUNlLE1BQU0sRUFBRUQsQ0FBQyxFQUFFLEVBQUU7TUFDakQsSUFBSUUsQ0FBQyxHQUFHLElBQUksQ0FBQ2hCLFlBQVksQ0FBQ2MsQ0FBQyxDQUFDO01BQzVCVCxDQUFDLENBQUNXLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLENBQUNDLE1BQU0sRUFBRTtNQUNyQmIsQ0FBQyxDQUFDVyxDQUFDLENBQUNHLE9BQU8sQ0FBQyxDQUFDRCxNQUFNLEVBQUU7TUFDckIsSUFBSSxDQUFDbEIsWUFBWSxDQUFDYyxDQUFDLENBQUMsR0FBRyxJQUFJO0lBQzdCO0lBQ0EsSUFBSSxDQUFDZCxZQUFZLEdBQUcsRUFBRTtFQUN4QixDQUFDO0VBRURGLFdBQVcsQ0FBQ1MsU0FBUyxDQUFDYSxvQkFBb0IsR0FBRyxVQUFTSixDQUFDLEVBQUVLLEtBQUssRUFBRUMsRUFBRSxFQUFFO0lBQ2xFLElBQUlaLENBQUMsR0FBRyxJQUFJLENBQUNQLFFBQVE7SUFDckIsSUFBSW9CLElBQUksR0FBR2IsQ0FBQyxDQUFDYyxPQUFPLEVBQUU7SUFDdEIsSUFBSUMsUUFBUSxHQUFHVCxDQUFDLENBQUNVLEtBQUs7SUFFdEIsSUFBSVAsT0FBTyxHQUFHSCxDQUFDLENBQUNHLE9BQU87SUFDdkIsSUFBSVEsUUFBUSxHQUFHLENBQUVSLE9BQU8sQ0FBQ1MsU0FBUyxHQUFHVCxPQUFPLENBQUNVLFlBQVksR0FBSU4sSUFBSSxDQUFDTyxDQUFDLElBQUlQLElBQUksQ0FBQ1EsQ0FBQztJQUM3RSxJQUFJSixRQUFRLElBQUlGLFFBQVEsRUFBRTtJQUUxQlQsQ0FBQyxDQUFDVSxLQUFLLEdBQUdDLFFBQVE7SUFFbEIsSUFBSSxDQUFDSyxtQkFBbUIsQ0FBQ2hCLENBQUMsQ0FBQztJQUMzQixJQUFJLENBQUNpQiw0QkFBNEIsRUFBRTtJQUNuQyxJQUFJLENBQUNDLG9CQUFvQixFQUFFO0lBQzNCN0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDOEIsY0FBYyxDQUFDLGlCQUFpQixFQUFFO01BQ3hDQyxVQUFVLEVBQUVwQixDQUFDO01BQ2JTLFFBQVEsRUFBRUEsUUFBUTtNQUNsQkUsUUFBUSxFQUFFWCxDQUFDLENBQUNVO0lBQ2QsQ0FBQyxDQUFDO0lBQ0ZyQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM4QixjQUFjLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDbEQsQ0FBQztFQUVEckMsV0FBVyxDQUFDUyxTQUFTLENBQUM4QixzQkFBc0IsR0FBRyxVQUFTckIsQ0FBQyxFQUFFO0lBQ3pELElBQUlBLENBQUMsQ0FBQ3NCLFFBQVEsSUFBSSxJQUFJLEVBQUU7SUFDeEIsSUFBSSxDQUFDTixtQkFBbUIsQ0FBQ2hCLENBQUMsQ0FBQzs7SUFFM0I7SUFDQTtJQUNBQSxDQUFDLENBQUNzQixRQUFRLEdBQUcsSUFBSTtJQUNqQixJQUFJQyxtQkFBbUIsR0FBR2xDLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDbUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNuRXhCLENBQUMsQ0FBQ0csT0FBTyxDQUFDc0IsU0FBUyxHQUFHLElBQUksQ0FBQ0MsZUFBZSxDQUFDSCxtQkFBbUIsRUFBRXZCLENBQUMsQ0FBQztJQUNsRVgsQ0FBQyxDQUFDVyxDQUFDLENBQUNHLE9BQU8sQ0FBQyxDQUFDd0IsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMzQixDQUFDLENBQUNzQixRQUFRLENBQUM7SUFDbERqQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM4QixjQUFjLENBQUMscUJBQXFCLEVBQUVuQixDQUFDLENBQUM7RUFDbEQsQ0FBQzs7RUFFRDtFQUNBO0VBQ0FsQixXQUFXLENBQUNTLFNBQVMsQ0FBQ3FDLGdCQUFnQixHQUFHLFVBQVM1QixDQUFDLEVBQUU7SUFDbkQsSUFBSTZCLElBQUksR0FBRyxJQUFJO0lBRWYsSUFBSUMsS0FBSyxHQUFHLElBQUksQ0FBQ0Msa0JBQWtCLENBQUMvQixDQUFDLENBQUNnQyxNQUFNLENBQUM7SUFFN0MsSUFBSUMsUUFBUSxHQUFHNUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDNkMsR0FBRyxDQUFDO01BQzdCLE9BQU8sRUFBRSxLQUFLO01BQ2QsTUFBTSxFQUFFLEtBQUs7TUFDYixZQUFZLEVBQUUsT0FBTztNQUNyQixRQUFRLEVBQUUsTUFBTTtNQUNoQixVQUFVLEVBQUUsVUFBVTtNQUN0QjtNQUNBLGtCQUFrQixFQUFFSixLQUFLO01BQ3pCLFNBQVMsRUFBRTtJQUNiLENBQUMsQ0FBQyxDQUFDSyxRQUFRLENBQUMseUJBQXlCLENBQUM7SUFFdEMsSUFBSUMsUUFBUSxHQUFHL0MsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUNnRCxLQUFLLEVBQUUsQ0FBQ0MsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDSixHQUFHLENBQUM7TUFDbEUsVUFBVSxFQUFFLFVBQVU7TUFDdEIsY0FBYyxFQUFFSixLQUFLO01BQ3JCLFNBQVMsRUFBRTtJQUNiLENBQUMsQ0FBQyxDQUNEUyxJQUFJLEVBQUU7SUFFVGxELENBQUMsQ0FBQ0MsTUFBTSxDQUFDVSxDQUFDLEVBQUU7TUFDVkMsT0FBTyxFQUFFZ0MsUUFBUSxDQUFDVCxHQUFHLENBQUMsQ0FBQyxDQUFDO01BQ3hCckIsT0FBTyxFQUFFaUMsUUFBUSxDQUFDWixHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUM7SUFFRixJQUFJZ0IsSUFBSSxHQUFHLElBQUk7SUFFZkosUUFBUSxDQUFDSyxTQUFTLENBQUM7TUFDakIsT0FBTyxFQUFFLGVBQVNwQyxLQUFLLEVBQUVDLEVBQUUsRUFBRTtRQUMzQmpCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzZDLEdBQUcsQ0FBQztVQUFDLFFBQVEsRUFBRTtRQUFFLENBQUMsQ0FBQztRQUMzQmxDLENBQUMsQ0FBQzBDLFVBQVUsR0FBRyxJQUFJO01BQ3JCLENBQUM7TUFDRCxNQUFNLEVBQUUsY0FBU3JDLEtBQUssRUFBRUMsRUFBRSxFQUFFO1FBQzFCdUIsSUFBSSxDQUFDekIsb0JBQW9CLENBQUNKLENBQUMsRUFBRUssS0FBSyxFQUFFQyxFQUFFLENBQUM7TUFDekMsQ0FBQztNQUNELE1BQU0sRUFBRSxjQUFTRCxLQUFLLEVBQUVDLEVBQUUsRUFBRTtRQUMxQmpCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzZDLEdBQUcsQ0FBQztVQUFDLEtBQUssRUFBRTtRQUFFLENBQUMsQ0FBQztRQUN4QmxDLENBQUMsQ0FBQzBDLFVBQVUsR0FBRyxLQUFLO1FBQ3BCYixJQUFJLENBQUNaLDRCQUE0QixFQUFFO01BQ3JDLENBQUM7TUFDRCxNQUFNLEVBQUUsR0FBRztNQUNYLGFBQWEsRUFBRTtJQUNqQixDQUFDLENBQUM7O0lBRUY7SUFDQW1CLFFBQVEsQ0FBQ08sRUFBRSxDQUFDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxZQUFXO01BQ3pESCxJQUFJLENBQUNJLGdCQUFnQixDQUFDNUMsQ0FBQyxDQUFDO01BQ3hCWCxDQUFDLENBQUNtRCxJQUFJLENBQUMsQ0FBQ3JCLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRW5CLENBQUMsQ0FBQztNQUM5Q1gsQ0FBQyxDQUFDbUQsSUFBSSxDQUFDLENBQUNyQixjQUFjLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQyxDQUFDO0lBRUZpQixRQUFRLENBQUNPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBVztNQUNqQ0gsSUFBSSxDQUFDbkIsc0JBQXNCLENBQUNyQixDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0lBQ0ZvQyxRQUFRLENBQUNPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsWUFBVztNQUNwRGQsSUFBSSxDQUFDZ0IseUJBQXlCLENBQUNULFFBQVEsQ0FBQ1osR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFeEIsQ0FBQyxDQUFDO01BQ2xEQSxDQUFDLENBQUNzQixRQUFRLEdBQUcsS0FBSztNQUNsQk8sSUFBSSxDQUFDWCxvQkFBb0IsRUFBRTtNQUMzQjdCLENBQUMsQ0FBQ21ELElBQUksQ0FBQyxDQUFDckIsY0FBYyxDQUFDLGtCQUFrQixFQUFFbkIsQ0FBQyxDQUFDO01BQzdDWCxDQUFDLENBQUNtRCxJQUFJLENBQUMsQ0FBQ3JCLGNBQWMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDLENBQUM7SUFDRmlCLFFBQVEsQ0FBQ08sRUFBRSxDQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxZQUFXO01BQ3BEM0MsQ0FBQyxDQUFDc0IsUUFBUSxHQUFHLEtBQUs7TUFDbEJPLElBQUksQ0FBQ1gsb0JBQW9CLEVBQUU7TUFDM0I3QixDQUFDLENBQUNtRCxJQUFJLENBQUMsQ0FBQ3JCLGNBQWMsQ0FBQyxzQkFBc0IsRUFBRW5CLENBQUMsQ0FBQztJQUNuRCxDQUFDLENBQUM7SUFFRixPQUFPQSxDQUFDO0VBQ1YsQ0FBQzs7RUFFRDtFQUNBO0VBQ0E7RUFDQTtFQUNBbEIsV0FBVyxDQUFDUyxTQUFTLENBQUN1RCxlQUFlLEdBQUcsVUFBU2QsTUFBTSxFQUFFZSxJQUFJLEVBQUU7SUFDN0QsSUFBSUMsR0FBRyxHQUFHLElBQUksQ0FBQzdELFFBQVEsQ0FBQzhELFNBQVMsRUFBRSxDQUFDQyxPQUFPLENBQUNsQixNQUFNLENBQUM7SUFDbkQsSUFBSWdCLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLElBQUk7SUFFMUIsSUFBSUcsTUFBTSxHQUFHLENBQUM7TUFBRUMsT0FBTyxHQUFHLElBQUksQ0FBQ2pFLFFBQVEsQ0FBQ2tFLE9BQU8sRUFBRSxHQUFHLENBQUM7SUFDckQsT0FBT0YsTUFBTSxJQUFJQyxPQUFPLEVBQUU7TUFDeEIsSUFBSUUsR0FBRyxHQUFHQyxJQUFJLENBQUNDLEtBQUssQ0FBQyxDQUFDTCxNQUFNLEdBQUdDLE9BQU8sSUFBSSxDQUFDLENBQUM7TUFDNUMsSUFBSUssTUFBTSxHQUFHLElBQUksQ0FBQ3RFLFFBQVEsQ0FBQ3VFLFFBQVEsQ0FBQ0osR0FBRyxFQUFFLENBQUMsQ0FBQztNQUMzQyxJQUFJRyxNQUFNLElBQUlWLElBQUksRUFBRTtRQUNsQixPQUFPLENBQUNPLEdBQUcsRUFBRU4sR0FBRyxDQUFDO01BQ25CLENBQUMsTUFBTSxJQUFJUyxNQUFNLEdBQUdWLElBQUksRUFBRTtRQUN4QkksTUFBTSxHQUFHRyxHQUFHLEdBQUcsQ0FBQztNQUNsQixDQUFDLE1BQU07UUFDTEYsT0FBTyxHQUFHRSxHQUFHLEdBQUcsQ0FBQztNQUNuQjtJQUNGO0lBQ0EsT0FBTyxJQUFJO0VBQ2IsQ0FBQztFQUVEeEUsV0FBVyxDQUFDUyxTQUFTLENBQUN3QyxrQkFBa0IsR0FBRyxVQUFTQyxNQUFNLEVBQUU7SUFDMUQsSUFBSTJCLE1BQU0sR0FBRyxJQUFJLENBQUN4RSxRQUFRLENBQUN5RSxTQUFTLEVBQUU7SUFDdEMsSUFBSVosR0FBRyxHQUFHLElBQUksQ0FBQzdELFFBQVEsQ0FBQzhELFNBQVMsRUFBRSxDQUFDQyxPQUFPLENBQUNsQixNQUFNLENBQUM7SUFDbkQsSUFBSWdCLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLElBQUk7SUFFMUIsT0FBT1csTUFBTSxDQUFDLENBQUNYLEdBQUcsR0FBRyxDQUFDLElBQUlXLE1BQU0sQ0FBQzVELE1BQU0sQ0FBQztFQUMxQyxDQUFDOztFQUVEO0VBQ0FqQixXQUFXLENBQUNTLFNBQVMsQ0FBQ3lCLG1CQUFtQixHQUFHLFVBQVNoQixDQUFDLEVBQUU7SUFDdEQsSUFBSTZELEdBQUcsR0FBRyxJQUFJLENBQUMxRSxRQUFRLENBQUMyRSxRQUFRO0lBQ2hDekUsQ0FBQyxDQUFDVyxDQUFDLENBQUNHLE9BQU8sQ0FBQyxDQUFDNEQsUUFBUSxDQUFDRixHQUFHLENBQUM7SUFDMUJ4RSxDQUFDLENBQUNXLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLENBQUM4RCxRQUFRLENBQUNGLEdBQUcsQ0FBQztJQUUxQixJQUFJUCxHQUFHLEdBQUcsSUFBSSxDQUFDdEUsWUFBWSxDQUFDa0UsT0FBTyxDQUFDbEQsQ0FBQyxDQUFDO0lBQ3RDLElBQUksQ0FBQ2hCLFlBQVksQ0FBQ2dGLE1BQU0sQ0FBQ1YsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNoQyxJQUFJLENBQUN0RSxZQUFZLENBQUNpRixJQUFJLENBQUNqRSxDQUFDLENBQUM7RUFDM0IsQ0FBQzs7RUFFRDtFQUNBbEIsV0FBVyxDQUFDUyxTQUFTLENBQUMwQiw0QkFBNEIsR0FBRyxZQUFXO0lBQzlELElBQUlpRCxNQUFNLEdBQUcsSUFBSSxDQUFDL0UsUUFBUSxDQUFDcUIsT0FBTyxFQUFFO0lBQ3BDLElBQUkyRCxTQUFTLEdBQUdELE1BQU0sQ0FBQ0UsQ0FBQztNQUFFQyxVQUFVLEdBQUdILE1BQU0sQ0FBQ0UsQ0FBQyxHQUFHRixNQUFNLENBQUNJLENBQUM7SUFDMUQsSUFBSUMsUUFBUSxHQUFHTCxNQUFNLENBQUNwRCxDQUFDO01BQUUwRCxXQUFXLEdBQUdOLE1BQU0sQ0FBQ3BELENBQUMsR0FBR29ELE1BQU0sQ0FBQ25ELENBQUM7SUFDMUQsSUFBSThDLEdBQUcsR0FBRyxJQUFJLENBQUMxRSxRQUFRLENBQUMyRSxRQUFRO0lBQ2hDLElBQUlXLEdBQUcsR0FBRzlGLE9BQU8sQ0FBQytGLE9BQU8sQ0FBQ2IsR0FBRyxDQUFDO0lBQzlCLElBQUljLEdBQUcsR0FBRyxDQUFDVCxNQUFNLENBQUNFLENBQUMsR0FBR0ssR0FBRyxDQUFDTCxDQUFDLEVBQUVGLE1BQU0sQ0FBQ3BELENBQUMsR0FBRzJELEdBQUcsQ0FBQzNELENBQUMsQ0FBQztJQUM5QzZELEdBQUcsQ0FBQ1YsSUFBSSxDQUFDVSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUdULE1BQU0sQ0FBQ0ksQ0FBQyxDQUFDO0lBQzNCSyxHQUFHLENBQUNWLElBQUksQ0FBQ1UsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHVCxNQUFNLENBQUNuRCxDQUFDLENBQUM7SUFFM0IsSUFBSXJCLENBQUMsR0FBRyxJQUFJLENBQUNQLFFBQVE7SUFFckIsSUFBSXFELElBQUksR0FBRyxJQUFJO0lBQ2ZuRCxDQUFDLENBQUN1RixJQUFJLENBQUMsSUFBSSxDQUFDNUYsWUFBWSxFQUFFLFVBQVNzRSxHQUFHLEVBQUV0RCxDQUFDLEVBQUU7TUFDekMsSUFBSTZFLE9BQU8sR0FBR3JDLElBQUksQ0FBQ00sZUFBZSxDQUFDOUMsQ0FBQyxDQUFDZ0MsTUFBTSxFQUFFaEMsQ0FBQyxDQUFDK0MsSUFBSSxDQUFDO01BQ3BELElBQUk4QixPQUFPLElBQUksSUFBSSxFQUFFO1FBQ25CeEYsQ0FBQyxDQUFDLENBQUNXLENBQUMsQ0FBQ0MsT0FBTyxFQUFFRCxDQUFDLENBQUNHLE9BQU8sQ0FBQyxDQUFDLENBQUMyRSxJQUFJLEVBQUU7UUFDaEM7TUFDRixDQUFDLE1BQU07UUFDTDtRQUNBekYsQ0FBQyxDQUFDLENBQUNXLENBQUMsQ0FBQ0MsT0FBTyxFQUFFRCxDQUFDLENBQUNHLE9BQU8sQ0FBQyxDQUFDLENBQUNvQyxJQUFJLEVBQUU7TUFDbEM7TUFDQSxJQUFJd0MsRUFBRSxHQUFHckYsQ0FBQyxDQUFDc0YsV0FBVyxDQUFDaEYsQ0FBQyxDQUFDK0MsSUFBSSxFQUFFckQsQ0FBQyxDQUFDZ0UsUUFBUSxDQUFDbUIsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUNsRSxJQUFJVCxDQUFDLEdBQUdXLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFBRUUsTUFBTSxHQUFHRixFQUFFLENBQUMsQ0FBQyxDQUFDO01BRTdCLElBQUlHLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBRTs7TUFFckIsSUFBSXBFLENBQUMsR0FBR21FLE1BQU07TUFDZCxJQUFJakYsQ0FBQyxDQUFDVSxLQUFLLEtBQUt5RSxTQUFTLEVBQUU7UUFDekJyRSxDQUFDLEdBQUdvRCxNQUFNLENBQUNwRCxDQUFDLEdBQUdvRCxNQUFNLENBQUNuRCxDQUFDLEdBQUdmLENBQUMsQ0FBQ1UsS0FBSztNQUNuQyxDQUFDLE1BQU07UUFDTEksQ0FBQyxJQUFJb0UsVUFBVTtNQUNqQjtNQUVBLElBQUlBLFVBQVUsR0FBR3BFLENBQUMsR0FBR21FLE1BQU0sR0FBSUEsTUFBTSxHQUFHbkUsQ0FBQyxHQUFLQSxDQUFDLEdBQUdtRSxNQUFNLEdBQUdqRixDQUFDLENBQUNHLE9BQU8sQ0FBQ1UsWUFBYTtNQUNsRnhCLENBQUMsQ0FBQ1csQ0FBQyxDQUFDQyxPQUFPLENBQUMsQ0FBQ2lDLEdBQUcsQ0FBQztRQUNmLE1BQU0sRUFBRWtDLENBQUMsR0FBRyxJQUFJO1FBQ2hCLEtBQUssRUFBRWIsSUFBSSxDQUFDNkIsR0FBRyxDQUFDdEUsQ0FBQyxFQUFFbUUsTUFBTSxDQUFDLEdBQUcsSUFBSTtRQUNqQyxRQUFRLEVBQUVDLFVBQVUsR0FBRztNQUN6QixDQUFDLENBQUM7TUFDRjdGLENBQUMsQ0FBQ1csQ0FBQyxDQUFDRyxPQUFPLENBQUMsQ0FBQytCLEdBQUcsQ0FBQztRQUNmLE1BQU0sRUFBRWtDLENBQUMsR0FBRztNQUNkLENBQUMsQ0FBQztNQUNGLElBQUksQ0FBQ3BFLENBQUMsQ0FBQzBDLFVBQVUsRUFBRTtRQUNqQjtRQUNBO1FBQ0E7UUFDQXJELENBQUMsQ0FBQ1csQ0FBQyxDQUFDRyxPQUFPLENBQUMsQ0FBQytCLEdBQUcsQ0FBQztVQUNmLFFBQVEsRUFBRzJCLEdBQUcsQ0FBQ2hELFlBQVksR0FBR0MsQ0FBQyxHQUFJO1FBQ3JDLENBQUMsQ0FBQyxFQUFFOztRQUVKLElBQUl1RSxPQUFPLEdBQUlqQixDQUFDLElBQUlELFNBQVMsSUFBSUMsQ0FBQyxJQUFJQyxVQUFVLElBQ2pDWSxNQUFNLElBQUlWLFFBQVEsSUFBSVUsTUFBTSxJQUFJVCxXQUFZO1FBQzNEbkYsQ0FBQyxDQUFDLENBQUNXLENBQUMsQ0FBQ0csT0FBTyxFQUFFSCxDQUFDLENBQUNDLE9BQU8sQ0FBQyxDQUFDLENBQUNxRixNQUFNLENBQUNELE9BQU8sQ0FBQztNQUMzQztJQUNGLENBQUMsQ0FBQztFQUNKLENBQUM7O0VBRUQ7RUFDQXZHLFdBQVcsQ0FBQ1MsU0FBUyxDQUFDMkIsb0JBQW9CLEdBQUcsWUFBVztJQUN0RCxJQUFJeEIsQ0FBQyxHQUFHLElBQUksQ0FBQ1AsUUFBUTtJQUVyQixJQUFJcUQsSUFBSSxHQUFHLElBQUk7SUFDZixJQUFJK0MsV0FBVyxHQUFHbEcsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUNtQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xEbkMsQ0FBQyxDQUFDdUYsSUFBSSxDQUFDLElBQUksQ0FBQzVGLFlBQVksRUFBRSxVQUFTc0UsR0FBRyxFQUFFdEQsQ0FBQyxFQUFFO01BQ3pDO01BQ0E7TUFDQVgsQ0FBQyxDQUFDVyxDQUFDLENBQUNHLE9BQU8sQ0FBQyxDQUFDd0IsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMzQixDQUFDLENBQUNzQixRQUFRLENBQUM7TUFDbEQsSUFBSXRCLENBQUMsQ0FBQ3NCLFFBQVEsRUFBRTtNQUNoQnRCLENBQUMsQ0FBQ0csT0FBTyxDQUFDc0IsU0FBUyxHQUFHZSxJQUFJLENBQUNkLGVBQWUsQ0FBQzZELFdBQVcsRUFBRXZGLENBQUMsQ0FBQztJQUM1RCxDQUFDLENBQUM7RUFDSixDQUFDOztFQUVEO0FBQ0E7QUFDQTtBQUNBO0VBQ0FsQixXQUFXLENBQUNTLFNBQVMsQ0FBQ2lHLHVCQUF1QixHQUFHLFVBQVN4RixDQUFDLEVBQUV5RixTQUFTLEVBQUU7SUFDckUsSUFBSUMsaUJBQWlCLEdBQUdyRyxDQUFDLENBQUNDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRVUsQ0FBQyxFQUFFeUYsU0FBUyxDQUFDO0lBQ2xELE9BQU9DLGlCQUFpQixDQUFDLFNBQVMsQ0FBQztJQUNuQyxPQUFPQSxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFDbkMsT0FBT0EsaUJBQWlCLENBQUMsWUFBWSxDQUFDO0lBQ3RDLE9BQU9BLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztJQUNwQyxPQUFPQSxpQkFBaUI7RUFDMUIsQ0FBQzs7RUFFRDtFQUNBO0VBQ0E1RyxXQUFXLENBQUNTLFNBQVMsQ0FBQ21DLGVBQWUsR0FBRyxVQUFTbUMsR0FBRyxFQUFFN0QsQ0FBQyxFQUFFO0lBQ3ZELElBQUlOLENBQUMsR0FBRyxJQUFJLENBQUNQLFFBQVE7SUFDckIsSUFBSTBGLE9BQU8sR0FBRyxJQUFJLENBQUMvQixlQUFlLENBQUM5QyxDQUFDLENBQUNnQyxNQUFNLEVBQUVoQyxDQUFDLENBQUMrQyxJQUFJLENBQUM7SUFDcEQsSUFBSThCLE9BQU8sSUFBSSxJQUFJLEVBQUUsT0FBTyxDQUFFO0lBQzlCLElBQUljLEdBQUcsR0FBR2QsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNwQixJQUFJN0IsR0FBRyxHQUFHNkIsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUVwQixJQUFJZSxRQUFRLEdBQUdsRyxDQUFDLENBQUNtRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFFO0lBQzdDLElBQUlDLFFBQVEsR0FBR3BHLENBQUMsQ0FBQ21HLG1CQUFtQixDQUFDLEdBQUcsQ0FBQztJQUN6QyxJQUFJRSxHQUFHLEdBQUdyRyxDQUFDLENBQUNzRyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUM7SUFFbkQsSUFBSTVCLENBQUMsR0FBRzJCLEdBQUcsQ0FBQ0UsSUFBSSxDQUFDdkcsQ0FBQyxFQUFFTSxDQUFDLENBQUMrQyxJQUFJLEVBQUUrQyxRQUFRLENBQUM7SUFDckMsSUFBSWhGLENBQUMsR0FBR3BCLENBQUMsQ0FBQ3dHLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRWxHLENBQUMsQ0FBQ2dDLE1BQU0sQ0FBQyxDQUFDaUUsSUFBSSxDQUNoRHZHLENBQUMsRUFBRUEsQ0FBQyxDQUFDZ0UsUUFBUSxDQUFDaUMsR0FBRyxFQUFFM0MsR0FBRyxDQUFDLEVBQUU0QyxRQUFRLENBQUM7SUFFdEMsSUFBSUYsaUJBQWlCLEdBQUcsSUFBSSxDQUFDRix1QkFBdUIsQ0FBQ3hGLENBQUMsRUFBRTtNQUFDb0UsQ0FBQyxFQUFDQSxDQUFDO01BQUV0RCxDQUFDLEVBQUNBO0lBQUMsQ0FBQyxDQUFDO0lBQ25FLElBQUlxRixJQUFJLEdBQUd0QyxHQUFHLENBQUNwQyxTQUFTO0lBQ3hCLEtBQUssSUFBSTJFLENBQUMsSUFBSVYsaUJBQWlCLEVBQUU7TUFDL0IsSUFBSVcsQ0FBQyxHQUFHWCxpQkFBaUIsQ0FBQ1UsQ0FBQyxDQUFDO01BQzVCLElBQUksUUFBT0MsQ0FBQyxLQUFLLFFBQVEsRUFBRSxTQUFTLENBQUU7TUFDdENGLElBQUksR0FBR0EsSUFBSSxDQUFDRyxPQUFPLENBQUMsSUFBSUMsTUFBTSxDQUFDLE1BQU0sR0FBR0gsQ0FBQyxHQUFHLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRUMsQ0FBQyxDQUFDO0lBQzlEO0lBQ0EsT0FBT0YsSUFBSTtFQUNiLENBQUM7O0VBRUQ7RUFDQTtFQUNBO0VBQ0FySCxXQUFXLENBQUNTLFNBQVMsQ0FBQ3NELHlCQUF5QixHQUFHLFVBQVNnQixHQUFHLEVBQUU3RCxDQUFDLEVBQUU7SUFDakVYLENBQUMsQ0FBQ3dFLEdBQUcsQ0FBQyxDQUFDMkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM1QixJQUFJLENBQUMsVUFBU3RCLEdBQUcsRUFBRW1ELEVBQUUsRUFBRTtNQUNuRCxJQUFJTCxDQUFDLEdBQUcvRyxDQUFDLENBQUNvSCxFQUFFLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLGNBQWMsQ0FBQztNQUNsQyxJQUFJTCxDQUFDLEdBQUdoSCxDQUFDLENBQUNvSCxFQUFFLENBQUMsQ0FBQ0UsR0FBRyxFQUFFO01BQ25CM0csQ0FBQyxDQUFDb0csQ0FBQyxDQUFDLEdBQUdDLENBQUM7SUFDVixDQUFDLENBQUM7RUFDSixDQUFDOztFQUVEO0VBQ0E7RUFDQXZILFdBQVcsQ0FBQ1MsU0FBUyxDQUFDcUgseUJBQXlCLEdBQUcsWUFBVztJQUMzRCxJQUFJL0MsR0FBRyxHQUFHLElBQUksQ0FBQzFFLFFBQVEsQ0FBQzJFLFFBQVE7SUFDaEN6RSxDQUFDLENBQUN1RixJQUFJLENBQUMsSUFBSSxDQUFDNUYsWUFBWSxFQUFFLFVBQVNzRSxHQUFHLEVBQUV0RCxDQUFDLEVBQUU7TUFDekM7TUFDQTtNQUNBLElBQUlBLENBQUMsQ0FBQ3NCLFFBQVEsRUFBRTtNQUVoQmpDLENBQUMsQ0FBQyxDQUFDVyxDQUFDLENBQUNDLE9BQU8sRUFBRUQsQ0FBQyxDQUFDRyxPQUFPLENBQUMsQ0FBQyxDQUFDNEQsUUFBUSxDQUFDRixHQUFHLENBQUM7SUFDekMsQ0FBQyxDQUFDO0VBQ0osQ0FBQzs7RUFFRDtFQUNBL0UsV0FBVyxDQUFDUyxTQUFTLENBQUNxRCxnQkFBZ0IsR0FBRyxVQUFTNUMsQ0FBQyxFQUFFO0lBQ25ELElBQUlzRCxHQUFHLEdBQUcsSUFBSSxDQUFDdEUsWUFBWSxDQUFDa0UsT0FBTyxDQUFDbEQsQ0FBQyxDQUFDO0lBQ3RDLElBQUlzRCxHQUFHLElBQUksQ0FBQyxFQUFFO01BQ1osSUFBSSxDQUFDdEUsWUFBWSxDQUFDZ0YsTUFBTSxDQUFDVixHQUFHLEVBQUUsQ0FBQyxDQUFDO01BQ2hDakUsQ0FBQyxDQUFDLENBQUNXLENBQUMsQ0FBQ0MsT0FBTyxFQUFFRCxDQUFDLENBQUNHLE9BQU8sQ0FBQyxDQUFDLENBQUNELE1BQU0sRUFBRTtJQUNwQyxDQUFDLE1BQU07TUFDTHZCLE9BQU8sQ0FBQ2tJLElBQUksQ0FBQywwQ0FBMEMsQ0FBQztJQUMxRDtFQUNGLENBQUM7RUFFRC9ILFdBQVcsQ0FBQ1MsU0FBUyxDQUFDSSxZQUFZLEdBQUcsVUFBU21ILENBQUMsRUFBRTtJQUMvQyxJQUFJcEgsQ0FBQyxHQUFHb0gsQ0FBQyxDQUFDQyxPQUFPOztJQUVqQjtJQUNBLElBQUksSUFBSSxDQUFDL0gsWUFBWSxDQUFDZSxNQUFNLEtBQUssQ0FBQyxFQUFFO0lBRXBDLElBQUksQ0FBQ2tCLDRCQUE0QixFQUFFO0lBQ25DLElBQUksQ0FBQzJGLHlCQUF5QixFQUFFO0lBQ2hDLElBQUksQ0FBQzFGLG9CQUFvQixFQUFFO0VBQzdCLENBQUM7RUFFRHBDLFdBQVcsQ0FBQ1MsU0FBUyxDQUFDSyxVQUFVLEdBQUcsVUFBU2tILENBQUMsRUFBRTtJQUM3QztJQUNBQSxDQUFDLENBQUNFLGNBQWMsRUFBRTtJQUVsQixJQUFJaEgsQ0FBQyxHQUFHWCxDQUFDLENBQUNDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNGLDRCQUE0QixFQUFFO01BQ3RENEMsTUFBTSxFQUFFOEUsQ0FBQyxDQUFDRyxLQUFLLENBQUNDLElBQUk7TUFDcEJuRSxJQUFJLEVBQUUrRCxDQUFDLENBQUNHLEtBQUssQ0FBQ2xFO0lBQ2hCLENBQUMsQ0FBQztJQUNGLElBQUksQ0FBQy9ELFlBQVksQ0FBQ2lGLElBQUksQ0FBQyxJQUFJLENBQUNyQyxnQkFBZ0IsQ0FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBRWhELElBQUksQ0FBQ2lCLDRCQUE0QixFQUFFO0lBQ25DLElBQUksQ0FBQ0Msb0JBQW9CLEVBQUU7SUFDM0IsSUFBSSxDQUFDMEYseUJBQXlCLEVBQUU7SUFFaEN2SCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM4QixjQUFjLENBQUMsbUJBQW1CLEVBQUVuQixDQUFDLENBQUM7SUFDOUNYLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzhCLGNBQWMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQzs7SUFFaEQ7SUFDQSxJQUFJLENBQUNFLHNCQUFzQixDQUFDckIsQ0FBQyxDQUFDO0VBQ2hDLENBQUM7RUFFRGxCLFdBQVcsQ0FBQ1MsU0FBUyxDQUFDNEgsT0FBTyxHQUFHLFlBQVc7SUFDekMsSUFBSSxDQUFDdEgsWUFBWSxFQUFFO0VBQ3JCLENBQUM7O0VBRUQ7O0VBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztFQUVBO0FBQ0E7QUFDQTtBQUNBO0VBQ0FmLFdBQVcsQ0FBQ1MsU0FBUyxDQUFDaUMsR0FBRyxHQUFHLFlBQVc7SUFDckMsSUFBSTRGLE1BQU0sR0FBRyxFQUFFO0lBQ2YsS0FBSyxJQUFJdEgsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLElBQUksQ0FBQ2QsWUFBWSxDQUFDZSxNQUFNLEVBQUVELENBQUMsRUFBRSxFQUFFO01BQ2pEc0gsTUFBTSxDQUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQ3VCLHVCQUF1QixDQUFDLElBQUksQ0FBQ3hHLFlBQVksQ0FBQ2MsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRTtJQUNBLE9BQU9zSCxNQUFNO0VBQ2YsQ0FBQzs7RUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0F0SSxXQUFXLENBQUNTLFNBQVMsQ0FBQzhILEdBQUcsR0FBRyxVQUFTdkksV0FBVyxFQUFFO0lBQ2hEO0lBQ0E7SUFDQSxJQUFJd0ksVUFBVSxHQUFHLEtBQUs7SUFDdEIsS0FBSyxJQUFJeEgsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHaEIsV0FBVyxDQUFDaUIsTUFBTSxFQUFFRCxDQUFDLEVBQUUsRUFBRTtNQUMzQyxJQUFJRSxDQUFDLEdBQUdsQixXQUFXLENBQUNnQixDQUFDLENBQUM7TUFFdEIsSUFBSSxJQUFJLENBQUNkLFlBQVksQ0FBQ2UsTUFBTSxHQUFHRCxDQUFDLEVBQUU7UUFDaEM7UUFDQSxJQUFJeUgsSUFBSSxHQUFHLElBQUksQ0FBQ3ZJLFlBQVksQ0FBQ2MsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQ2QsWUFBWSxDQUFDYyxDQUFDLENBQUMsR0FBR1QsQ0FBQyxDQUFDQyxNQUFNLENBQUM7VUFDOUJhLE9BQU8sRUFBRW9ILElBQUksQ0FBQ3BILE9BQU87VUFDckJGLE9BQU8sRUFBRXNILElBQUksQ0FBQ3RIO1FBQ2hCLENBQUMsRUFBRUQsQ0FBQyxDQUFDO01BQ1AsQ0FBQyxNQUFNO1FBQ0wsSUFBSSxDQUFDaEIsWUFBWSxDQUFDaUYsSUFBSSxDQUFDLElBQUksQ0FBQ3JDLGdCQUFnQixDQUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFDaERzSCxVQUFVLEdBQUcsSUFBSTtNQUNuQjtJQUNGOztJQUVBO0lBQ0EsT0FBT3hJLFdBQVcsQ0FBQ2lCLE1BQU0sR0FBRyxJQUFJLENBQUNmLFlBQVksQ0FBQ2UsTUFBTSxFQUFFO01BQ3BELElBQUksQ0FBQzZDLGdCQUFnQixDQUFDLElBQUksQ0FBQzVELFlBQVksQ0FBQ0YsV0FBVyxDQUFDaUIsTUFBTSxDQUFDLENBQUM7SUFDOUQ7SUFFQSxJQUFJLENBQUNrQiw0QkFBNEIsRUFBRTtJQUNuQyxJQUFJLENBQUNDLG9CQUFvQixFQUFFO0lBQzNCLElBQUlvRyxVQUFVLEVBQUU7TUFDZCxJQUFJLENBQUNWLHlCQUF5QixFQUFFO0lBQ2xDO0lBRUF2SCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM4QixjQUFjLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDbEQsQ0FBQztFQUVELE9BQU9yQyxXQUFXO0FBRWxCLENBQUMsRUFBRyJ9