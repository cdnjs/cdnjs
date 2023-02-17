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
(function _extras_superAnnotations_wrapper() {
  'use strict';

  var Dygraph;
  if (window.Dygraph) {
    Dygraph = window.Dygraph;
  } else if (typeof module !== 'undefined') {
    Dygraph = require('../dygraph');
    if (typeof Dygraph.NAME === 'undefined' && typeof Dygraph["default"] !== 'undefined') Dygraph = Dygraph["default"];
  }
  /* end of loader wrapper header */

  Dygraph.Plugins.SuperAnnotations = function _extras_superAnnotations_closure() {
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
    annotations.prototype.toString = function toString() {
      return "SuperAnnotations Plugin";
    };
    annotations.prototype.activate = function activate(g) {
      this.dygraph_ = g;
      this.annotations_ = [];
      return {
        didDrawChart: this.didDrawChart,
        pointClick: this.pointClick // TODO(danvk): implement in dygraphs
      };
    };

    annotations.prototype.detachLabels = function detachLabels() {
      for (var i = 0; i < this.annotations_.length; i++) {
        var a = this.annotations_[i];
        $(a.lineDiv).remove();
        $(a.infoDiv).remove();
        this.annotations_[i] = null;
      }
      this.annotations_ = [];
    };
    annotations.prototype.annotationWasDragged = function annotationWasDragged(a, event, ui) {
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
    annotations.prototype.makeAnnotationEditable = function makeAnnotationEditable(a) {
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
    annotations.prototype.createAnnotation = function createAnnotation(a) {
      var self = this;
      var color = this.getColorForSeries_(a.series);
      var $lineDiv = $('<div />').css({
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
        'start': function draggableStart(event, ui) {
          $(this).css({
            'bottom': ''
          });
          a.isDragging = true;
        },
        'drag': function draggableDrag(event, ui) {
          self.annotationWasDragged(a, event, ui);
        },
        'stop': function draggableStop(event, ui) {
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
      $infoDiv.on('click', '.annotation-kill-button', function clickKill() {
        that.removeAnnotation(a);
        $(that).triggerHandler('annotationDeleted', a);
        $(that).triggerHandler('annotationsChanged', {});
      });
      $infoDiv.on('dblclick', function dblclick() {
        that.makeAnnotationEditable(a);
      });
      $infoDiv.on('click', '.annotation-update', function clickUpdate() {
        self.extractUpdatedProperties_($infoDiv.get(0), a);
        a.editable = false;
        self.updateAnnotationInfo();
        $(that).triggerHandler('annotationEdited', a);
        $(that).triggerHandler('annotationsChanged', {});
      });
      $infoDiv.on('click', '.annotation-cancel', function clickCancel() {
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
    annotations.prototype.findPointIndex_ = function findPointIndex_(series, xval) {
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
    annotations.prototype.getColorForSeries_ = function getColorForSeries_(series) {
      var colors = this.dygraph_.getColors();
      var col = this.dygraph_.getLabels().indexOf(series);
      if (col == -1) return null;
      return colors[(col - 1) % colors.length];
    };

    // Moves a hairline's divs to the top of the z-ordering.
    annotations.prototype.moveAnnotationToTop = function moveAnnotationToTop(a) {
      var div = this.dygraph_.graphDiv;
      $(a.infoDiv).appendTo(div);
      $(a.lineDiv).appendTo(div);
      var idx = this.annotations_.indexOf(a);
      this.annotations_.splice(idx, 1);
      this.annotations_.push(a);
    };

    // Positions existing hairline divs.
    annotations.prototype.updateAnnotationDivPositions = function updateAnnotationDivPositions() {
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
      $.each(this.annotations_, function annotationsLoop_(idx, a) {
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
    annotations.prototype.updateAnnotationInfo = function updateAnnotationInfo() {
      var g = this.dygraph_;
      var that = this;
      var templateDiv = $('#annotation-template').get(0);
      $.each(this.annotations_, function annotationsLoop_(idx, a) {
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
    annotations.prototype.createPublicAnnotation_ = function createPublicAnnotation_(a, opt_props) {
      var displayAnnotation = $.extend({}, a, opt_props);
      delete displayAnnotation['infoDiv'];
      delete displayAnnotation['lineDiv'];
      delete displayAnnotation['isDragging'];
      delete displayAnnotation['editable'];
      return displayAnnotation;
    };

    // Fill out a div using the values in the annotation object.
    // The div's html is expected to have text of the form "{{key}}"
    annotations.prototype.getTemplateHTML = function getTemplateHTML(div, a) {
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
        if (typeof v == 'object') continue; // e.g. infoDiv or lineDiv
        html = html.replace(new RegExp('\{\{' + k + '\}\}', 'g'), v);
      }
      return html;
    };

    // Update the annotation object by looking for elements with a 'dg-ann-field'
    // attribute. For example, <input type='text' dg-ann-field='text' /> will have
    // its value placed in the 'text' attribute of the annotation.
    annotations.prototype.extractUpdatedProperties_ = function extractUpdatedProperties_(div, a) {
      $(div).find('[dg-ann-field]').each(function fieldLoop_(idx, el) {
        var k = $(el).attr('dg-ann-field');
        var v = $(el).val();
        a[k] = v;
      });
    };

    // After a resize, the hairline divs can get dettached from the chart.
    // This reattaches them.
    annotations.prototype.attachAnnotationsToChart_ = function attachAnnotationsToChart_() {
      var div = this.dygraph_.graphDiv;
      $.each(this.annotations_, function annotationsLoop_(idx, a) {
        // Re-attaching an editable div to the DOM can clear its focus.
        // This makes typing really difficult!
        if (a.editable) return;
        $([a.lineDiv, a.infoDiv]).appendTo(div);
      });
    };

    // Deletes a hairline and removes it from the chart.
    annotations.prototype.removeAnnotation = function removeAnnotation(a) {
      var idx = this.annotations_.indexOf(a);
      if (idx >= 0) {
        this.annotations_.splice(idx, 1);
        $([a.lineDiv, a.infoDiv]).remove();
      } else {
        Dygraph.warn('Tried to remove non-existent annotation.');
      }
    };
    annotations.prototype.didDrawChart = function didDrawChart(e) {
      var g = e.dygraph;

      // Early out in the (common) case of zero annotations.
      if (this.annotations_.length === 0) return;
      this.updateAnnotationDivPositions();
      this.attachAnnotationsToChart_();
      this.updateAnnotationInfo();
    };
    annotations.prototype.pointClick = function pointClick(e) {
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
    annotations.prototype.destroy = function destroy() {
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
    annotations.prototype.get = function get() {
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
    annotations.prototype.set = function set(annotations) {
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

  /* loader wrapper */
  Dygraph._require.add('dygraphs/src/extras/super-annotations.js', /* exports */{});
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXh0cmFzX3N1cGVyQW5ub3RhdGlvbnNfd3JhcHBlciIsIkR5Z3JhcGgiLCJ3aW5kb3ciLCJtb2R1bGUiLCJyZXF1aXJlIiwiTkFNRSIsIlBsdWdpbnMiLCJTdXBlckFubm90YXRpb25zIiwiX2V4dHJhc19zdXBlckFubm90YXRpb25zX2Nsb3N1cmUiLCJhbm5vdGF0aW9ucyIsIm9wdF9vcHRpb25zIiwiYW5ub3RhdGlvbnNfIiwibGFzdFdpZHRoXyIsImxhc3RIZWlnaHQiLCJkeWdyYXBoXyIsImRlZmF1bHRBbm5vdGF0aW9uUHJvcGVydGllc18iLCIkIiwiZXh0ZW5kIiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJhY3RpdmF0ZSIsImciLCJkaWREcmF3Q2hhcnQiLCJwb2ludENsaWNrIiwiZGV0YWNoTGFiZWxzIiwiaSIsImxlbmd0aCIsImEiLCJsaW5lRGl2IiwicmVtb3ZlIiwiaW5mb0RpdiIsImFubm90YXRpb25XYXNEcmFnZ2VkIiwiZXZlbnQiLCJ1aSIsImFyZWEiLCJnZXRBcmVhIiwib2xkWUZyYWMiLCJ5RnJhYyIsIm5ld1lGcmFjIiwib2Zmc2V0VG9wIiwib2Zmc2V0SGVpZ2h0IiwieSIsImgiLCJtb3ZlQW5ub3RhdGlvblRvVG9wIiwidXBkYXRlQW5ub3RhdGlvbkRpdlBvc2l0aW9ucyIsInVwZGF0ZUFubm90YXRpb25JbmZvIiwidHJpZ2dlckhhbmRsZXIiLCJhbm5vdGF0aW9uIiwibWFrZUFubm90YXRpb25FZGl0YWJsZSIsImVkaXRhYmxlIiwiZWRpdGFibGVUZW1wbGF0ZURpdiIsImdldCIsImlubmVySFRNTCIsImdldFRlbXBsYXRlSFRNTCIsInRvZ2dsZUNsYXNzIiwiY3JlYXRlQW5ub3RhdGlvbiIsInNlbGYiLCJjb2xvciIsImdldENvbG9yRm9yU2VyaWVzXyIsInNlcmllcyIsIiRsaW5lRGl2IiwiY3NzIiwiYWRkQ2xhc3MiLCIkaW5mb0RpdiIsImNsb25lIiwicmVtb3ZlQXR0ciIsInNob3ciLCJ0aGF0IiwiZHJhZ2dhYmxlIiwiZHJhZ2dhYmxlU3RhcnQiLCJpc0RyYWdnaW5nIiwiZHJhZ2dhYmxlRHJhZyIsImRyYWdnYWJsZVN0b3AiLCJvbiIsImNsaWNrS2lsbCIsInJlbW92ZUFubm90YXRpb24iLCJkYmxjbGljayIsImNsaWNrVXBkYXRlIiwiZXh0cmFjdFVwZGF0ZWRQcm9wZXJ0aWVzXyIsImNsaWNrQ2FuY2VsIiwiZmluZFBvaW50SW5kZXhfIiwieHZhbCIsImNvbCIsImdldExhYmVscyIsImluZGV4T2YiLCJsb3dJZHgiLCJoaWdoSWR4IiwibnVtUm93cyIsImlkeCIsIk1hdGgiLCJmbG9vciIsInhBdElkeCIsImdldFZhbHVlIiwiY29sb3JzIiwiZ2V0Q29sb3JzIiwiZGl2IiwiZ3JhcGhEaXYiLCJhcHBlbmRUbyIsInNwbGljZSIsInB1c2giLCJsYXlvdXQiLCJjaGFydExlZnQiLCJ4IiwiY2hhcnRSaWdodCIsInciLCJjaGFydFRvcCIsImNoYXJ0Qm90dG9tIiwicG9zIiwiZmluZFBvcyIsImJveCIsImVhY2giLCJhbm5vdGF0aW9uc0xvb3BfIiwicm93X2NvbCIsImhpZGUiLCJ4eSIsInRvRG9tQ29vcmRzIiwicG9pbnRZIiwibGluZUhlaWdodCIsInVuZGVmaW5lZCIsIm1pbiIsInZpc2libGUiLCJ0b2dnbGUiLCJ0ZW1wbGF0ZURpdiIsImNyZWF0ZVB1YmxpY0Fubm90YXRpb25fIiwib3B0X3Byb3BzIiwiZGlzcGxheUFubm90YXRpb24iLCJyb3ciLCJ5T3B0VmlldyIsIm9wdGlvbnNWaWV3Rm9yQXhpc18iLCJ4T3B0VmlldyIsInh2ZiIsImdldE9wdGlvbkZvckF4aXMiLCJjYWxsIiwiZ2V0T3B0aW9uIiwiaHRtbCIsImsiLCJ2IiwicmVwbGFjZSIsIlJlZ0V4cCIsImZpbmQiLCJmaWVsZExvb3BfIiwiZWwiLCJhdHRyIiwidmFsIiwiYXR0YWNoQW5ub3RhdGlvbnNUb0NoYXJ0XyIsIndhcm4iLCJlIiwiZHlncmFwaCIsInByZXZlbnREZWZhdWx0IiwicG9pbnQiLCJuYW1lIiwiZGVzdHJveSIsInJlc3VsdCIsInNldCIsImFueUNyZWF0ZWQiLCJvbGRBIiwiX3JlcXVpcmUiLCJhZGQiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvZXh0cmFzL3N1cGVyLWFubm90YXRpb25zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDEzIERhbiBWYW5kZXJrYW0gKGRhbnZka0BnbWFpbC5jb20pXG4gKiBNSVQtbGljZW5jZWQ6IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKlxuICogTm90ZTogVGhpcyBwbHVnaW4gcmVxdWlyZXMgalF1ZXJ5IGFuZCBqUXVlcnkgVUkgRHJhZ2dhYmxlLlxuICpcbiAqIFNlZSBoaWdoLWxldmVsIGRvY3VtZW50YXRpb24gYXQgLi4vLi4vZG9jcy9oYWlybGluZXMtYW5ub3RhdGlvbnMucGRmXG4gKi9cblxuLyogbG9hZGVyIHdyYXBwZXIgdG8gYWxsb3cgYnJvd3NlciB1c2UgYW5kIEVTNiBpbXBvcnRzICovXG4oZnVuY3Rpb24gX2V4dHJhc19zdXBlckFubm90YXRpb25zX3dyYXBwZXIoKSB7XG4ndXNlIHN0cmljdCc7XG52YXIgRHlncmFwaDtcbmlmICh3aW5kb3cuRHlncmFwaCkge1xuICBEeWdyYXBoID0gd2luZG93LkR5Z3JhcGg7XG59IGVsc2UgaWYgKHR5cGVvZihtb2R1bGUpICE9PSAndW5kZWZpbmVkJykge1xuICBEeWdyYXBoID0gcmVxdWlyZSgnLi4vZHlncmFwaCcpO1xuICBpZiAodHlwZW9mKER5Z3JhcGguTkFNRSkgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZihEeWdyYXBoLmRlZmF1bHQpICE9PSAndW5kZWZpbmVkJylcbiAgICBEeWdyYXBoID0gRHlncmFwaC5kZWZhdWx0O1xufVxuLyogZW5kIG9mIGxvYWRlciB3cmFwcGVyIGhlYWRlciAqL1xuXG5EeWdyYXBoLlBsdWdpbnMuU3VwZXJBbm5vdGF0aW9ucyA9IChmdW5jdGlvbiBfZXh0cmFzX3N1cGVyQW5ub3RhdGlvbnNfY2xvc3VyZSgpIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogVGhlc2UgYXJlIGp1c3QgdGhlIGJhc2ljIHJlcXVpcmVtZW50cyAtLSBhbm5vdGF0aW9ucyBjYW4gaGF2ZSB3aGF0ZXZlciBvdGhlclxuICogcHJvcGVydGllcyB0aGUgY29kZSB0aGF0IGRpc3BsYXlzIHRoZW0gd2FudHMgdGhlbSB0byBoYXZlLlxuICpcbiAqIEB0eXBlZGVmIHtcbiAqICAgeHZhbDogIG51bWJlciwgICAgICAvLyB4LXZhbHVlIChpLmUuIG1pbGxpcyBvciBhIHJhdyBudW1iZXIpXG4gKiAgIHNlcmllczogc3RyaW5nLCAgICAgLy8gc2VyaWVzIG5hbWVcbiAqICAgeUZyYWM6ID9udW1iZXIsICAgICAvLyB5LXBvc2l0aW9uaW5nLiBEZWZhdWx0IGlzIGEgZmV3IHB4IGFib3ZlIHRoZSBwb2ludC5cbiAqICAgbGluZURpdjogIUVsZW1lbnQgICAvLyB2ZXJ0aWNhbCBkaXYgY29ubmVjdGluZyBwb2ludCB0byBpbmZvIGRpdi5cbiAqICAgaW5mb0RpdjogIUVsZW1lbnQgICAvLyBkaXYgY29udGFpbmluZyBpbmZvIGFib3V0IHRoZSBhbm5vdGF0aW9uLlxuICogfSBBbm5vdGF0aW9uXG4gKi9cblxudmFyIGFubm90YXRpb25zID0gZnVuY3Rpb24gYW5ub3RhdGlvbnMob3B0X29wdGlvbnMpIHtcbiAgLyogQHR5cGUgeyFBcnJheS48IUFubm90YXRpb24+fSAqL1xuICB0aGlzLmFubm90YXRpb25zXyA9IFtdO1xuICAvLyBVc2VkIHRvIGRldGVjdCByZXNpemVzICh3aGljaCByZXF1aXJlIHRoZSBkaXZzIHRvIGJlIHJlcG9zaXRpb25lZCkuXG4gIHRoaXMubGFzdFdpZHRoXyA9IC0xO1xuICB0aGlzLmxhc3RIZWlnaHQgPSAtMTtcbiAgdGhpcy5keWdyYXBoXyA9IG51bGw7XG5cbiAgb3B0X29wdGlvbnMgPSBvcHRfb3B0aW9ucyB8fCB7fTtcbiAgdGhpcy5kZWZhdWx0QW5ub3RhdGlvblByb3BlcnRpZXNfID0gJC5leHRlbmQoe1xuICAgICd0ZXh0JzogJ0Rlc2NyaXB0aW9uJ1xuICB9LCBvcHRfb3B0aW9uc1snZGVmYXVsdEFubm90YXRpb25Qcm9wZXJ0aWVzJ10pO1xufTtcblxuYW5ub3RhdGlvbnMucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiBcIlN1cGVyQW5ub3RhdGlvbnMgUGx1Z2luXCI7XG59O1xuXG5hbm5vdGF0aW9ucy5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbiBhY3RpdmF0ZShnKSB7XG4gIHRoaXMuZHlncmFwaF8gPSBnO1xuICB0aGlzLmFubm90YXRpb25zXyA9IFtdO1xuXG4gIHJldHVybiB7XG4gICAgZGlkRHJhd0NoYXJ0OiB0aGlzLmRpZERyYXdDaGFydCxcbiAgICBwb2ludENsaWNrOiB0aGlzLnBvaW50Q2xpY2sgIC8vIFRPRE8oZGFudmspOiBpbXBsZW1lbnQgaW4gZHlncmFwaHNcbiAgfTtcbn07XG5cbmFubm90YXRpb25zLnByb3RvdHlwZS5kZXRhY2hMYWJlbHMgPSBmdW5jdGlvbiBkZXRhY2hMYWJlbHMoKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hbm5vdGF0aW9uc18ubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYSA9IHRoaXMuYW5ub3RhdGlvbnNfW2ldO1xuICAgICQoYS5saW5lRGl2KS5yZW1vdmUoKTtcbiAgICAkKGEuaW5mb0RpdikucmVtb3ZlKCk7XG4gICAgdGhpcy5hbm5vdGF0aW9uc19baV0gPSBudWxsO1xuICB9XG4gIHRoaXMuYW5ub3RhdGlvbnNfID0gW107XG59O1xuXG5hbm5vdGF0aW9ucy5wcm90b3R5cGUuYW5ub3RhdGlvbldhc0RyYWdnZWQgPSBmdW5jdGlvbiBhbm5vdGF0aW9uV2FzRHJhZ2dlZChhLCBldmVudCwgdWkpIHtcbiAgdmFyIGcgPSB0aGlzLmR5Z3JhcGhfO1xuICB2YXIgYXJlYSA9IGcuZ2V0QXJlYSgpO1xuICB2YXIgb2xkWUZyYWMgPSBhLnlGcmFjO1xuXG4gIHZhciBpbmZvRGl2ID0gYS5pbmZvRGl2O1xuICB2YXIgbmV3WUZyYWMgPSAoKGluZm9EaXYub2Zmc2V0VG9wICsgaW5mb0Rpdi5vZmZzZXRIZWlnaHQpIC0gYXJlYS55KSAvIGFyZWEuaDtcbiAgaWYgKG5ld1lGcmFjID09IG9sZFlGcmFjKSByZXR1cm47XG5cbiAgYS55RnJhYyA9IG5ld1lGcmFjO1xuXG4gIHRoaXMubW92ZUFubm90YXRpb25Ub1RvcChhKTtcbiAgdGhpcy51cGRhdGVBbm5vdGF0aW9uRGl2UG9zaXRpb25zKCk7XG4gIHRoaXMudXBkYXRlQW5ub3RhdGlvbkluZm8oKTtcbiAgJCh0aGlzKS50cmlnZ2VySGFuZGxlcignYW5ub3RhdGlvbk1vdmVkJywge1xuICAgIGFubm90YXRpb246IGEsXG4gICAgb2xkWUZyYWM6IG9sZFlGcmFjLFxuICAgIG5ld1lGcmFjOiBhLnlGcmFjXG4gIH0pO1xuICAkKHRoaXMpLnRyaWdnZXJIYW5kbGVyKCdhbm5vdGF0aW9uc0NoYW5nZWQnLCB7fSk7XG59O1xuXG5hbm5vdGF0aW9ucy5wcm90b3R5cGUubWFrZUFubm90YXRpb25FZGl0YWJsZSA9IGZ1bmN0aW9uIG1ha2VBbm5vdGF0aW9uRWRpdGFibGUoYSkge1xuICBpZiAoYS5lZGl0YWJsZSA9PSB0cnVlKSByZXR1cm47XG4gIHRoaXMubW92ZUFubm90YXRpb25Ub1RvcChhKTtcblxuICAvLyBOb3RlOiB3ZSBoYXZlIHRvIGZpbGwgb3V0IHRoZSBIVE1MIG91cnNlbHZlcyBiZWNhdXNlXG4gIC8vIHVwZGF0ZUFubm90YXRpb25JbmZvKCkgd29uJ3QgdG91Y2ggZWRpdGFibGUgYW5ub3RhdGlvbnMuXG4gIGEuZWRpdGFibGUgPSB0cnVlO1xuICB2YXIgZWRpdGFibGVUZW1wbGF0ZURpdiA9ICQoJyNhbm5vdGF0aW9uLWVkaXRhYmxlLXRlbXBsYXRlJykuZ2V0KDApO1xuICBhLmluZm9EaXYuaW5uZXJIVE1MID0gdGhpcy5nZXRUZW1wbGF0ZUhUTUwoZWRpdGFibGVUZW1wbGF0ZURpdiwgYSk7XG4gICQoYS5pbmZvRGl2KS50b2dnbGVDbGFzcygnZWRpdGFibGUnLCAhIWEuZWRpdGFibGUpO1xuICAkKHRoaXMpLnRyaWdnZXJIYW5kbGVyKCdiZWdhbkVkaXRBbm5vdGF0aW9uJywgYSk7XG59O1xuXG4vLyBUaGlzIGNyZWF0ZXMgdGhlIGhhaXJsaW5lIG9iamVjdCBhbmQgcmV0dXJucyBpdC5cbi8vIEl0IGRvZXMgbm90IHBvc2l0aW9uIGl0IGFuZCBkb2VzIG5vdCBhdHRhY2ggaXQgdG8gdGhlIGNoYXJ0LlxuYW5ub3RhdGlvbnMucHJvdG90eXBlLmNyZWF0ZUFubm90YXRpb24gPSBmdW5jdGlvbiBjcmVhdGVBbm5vdGF0aW9uKGEpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHZhciBjb2xvciA9IHRoaXMuZ2V0Q29sb3JGb3JTZXJpZXNfKGEuc2VyaWVzKTtcblxuICB2YXIgJGxpbmVEaXYgPSAkKCc8ZGl2IC8+JykuY3NzKHtcbiAgICAnd2lkdGgnOiAnMXB4JyxcbiAgICAnbGVmdCc6ICczcHgnLFxuICAgICdiYWNrZ3JvdW5kJzogJ2JsYWNrJyxcbiAgICAnaGVpZ2h0JzogJzEwMCUnLFxuICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXG4gICAgLy8gVE9ETyhkYW52ayk6IHVzZSBib3JkZXItY29sb3IgaGVyZSBmb3IgY29uc2lzdGVuY3k/XG4gICAgJ2JhY2tncm91bmQtY29sb3InOiBjb2xvcixcbiAgICAnei1pbmRleCc6IDEwXG4gIH0pLmFkZENsYXNzKCdkeWdyYXBoLWFubm90YXRpb24tbGluZScpO1xuXG4gIHZhciAkaW5mb0RpdiA9ICQoJyNhbm5vdGF0aW9uLXRlbXBsYXRlJykuY2xvbmUoKS5yZW1vdmVBdHRyKCdpZCcpLmNzcyh7XG4gICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxuICAgICAgJ2JvcmRlci1jb2xvcic6IGNvbG9yLFxuICAgICAgJ3otaW5kZXgnOiAxMFxuICAgIH0pXG4gICAgLnNob3coKTtcblxuICAkLmV4dGVuZChhLCB7XG4gICAgbGluZURpdjogJGxpbmVEaXYuZ2V0KDApLFxuICAgIGluZm9EaXY6ICRpbmZvRGl2LmdldCgwKVxuICB9KTtcblxuICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgJGluZm9EaXYuZHJhZ2dhYmxlKHtcbiAgICAnc3RhcnQnOiBmdW5jdGlvbiBkcmFnZ2FibGVTdGFydChldmVudCwgdWkpIHtcbiAgICAgICQodGhpcykuY3NzKHsnYm90dG9tJzogJyd9KTtcbiAgICAgIGEuaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgfSxcbiAgICAnZHJhZyc6IGZ1bmN0aW9uIGRyYWdnYWJsZURyYWcoZXZlbnQsIHVpKSB7XG4gICAgICBzZWxmLmFubm90YXRpb25XYXNEcmFnZ2VkKGEsIGV2ZW50LCB1aSk7XG4gICAgfSxcbiAgICAnc3RvcCc6IGZ1bmN0aW9uIGRyYWdnYWJsZVN0b3AoZXZlbnQsIHVpKSB7XG4gICAgICAkKHRoaXMpLmNzcyh7J3RvcCc6ICcnfSk7XG4gICAgICBhLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgIHNlbGYudXBkYXRlQW5ub3RhdGlvbkRpdlBvc2l0aW9ucygpO1xuICAgIH0sXG4gICAgJ2F4aXMnOiAneScsXG4gICAgJ2NvbnRhaW5tZW50JzogJ3BhcmVudCdcbiAgfSk7XG5cbiAgLy8gVE9ETyhkYW52ayk6IHVzZSAnb24nIGluc3RlYWQgb2YgZGVsZWdhdGUvZGJsY2xpY2tcbiAgJGluZm9EaXYub24oJ2NsaWNrJywgJy5hbm5vdGF0aW9uLWtpbGwtYnV0dG9uJywgZnVuY3Rpb24gY2xpY2tLaWxsKCkge1xuICAgIHRoYXQucmVtb3ZlQW5ub3RhdGlvbihhKTtcbiAgICAkKHRoYXQpLnRyaWdnZXJIYW5kbGVyKCdhbm5vdGF0aW9uRGVsZXRlZCcsIGEpO1xuICAgICQodGhhdCkudHJpZ2dlckhhbmRsZXIoJ2Fubm90YXRpb25zQ2hhbmdlZCcsIHt9KTtcbiAgfSk7XG5cbiAgJGluZm9EaXYub24oJ2RibGNsaWNrJywgZnVuY3Rpb24gZGJsY2xpY2soKSB7XG4gICAgdGhhdC5tYWtlQW5ub3RhdGlvbkVkaXRhYmxlKGEpO1xuICB9KTtcbiAgJGluZm9EaXYub24oJ2NsaWNrJywgJy5hbm5vdGF0aW9uLXVwZGF0ZScsIGZ1bmN0aW9uIGNsaWNrVXBkYXRlKCkge1xuICAgIHNlbGYuZXh0cmFjdFVwZGF0ZWRQcm9wZXJ0aWVzXygkaW5mb0Rpdi5nZXQoMCksIGEpO1xuICAgIGEuZWRpdGFibGUgPSBmYWxzZTtcbiAgICBzZWxmLnVwZGF0ZUFubm90YXRpb25JbmZvKCk7XG4gICAgJCh0aGF0KS50cmlnZ2VySGFuZGxlcignYW5ub3RhdGlvbkVkaXRlZCcsIGEpO1xuICAgICQodGhhdCkudHJpZ2dlckhhbmRsZXIoJ2Fubm90YXRpb25zQ2hhbmdlZCcsIHt9KTtcbiAgfSk7XG4gICRpbmZvRGl2Lm9uKCdjbGljaycsICcuYW5ub3RhdGlvbi1jYW5jZWwnLCBmdW5jdGlvbiBjbGlja0NhbmNlbCgpIHtcbiAgICBhLmVkaXRhYmxlID0gZmFsc2U7XG4gICAgc2VsZi51cGRhdGVBbm5vdGF0aW9uSW5mbygpO1xuICAgICQodGhhdCkudHJpZ2dlckhhbmRsZXIoJ2NhbmNlbEVkaXRBbm5vdGF0aW9uJywgYSk7XG4gIH0pO1xuXG4gIHJldHVybiBhO1xufTtcblxuLy8gRmluZCB0aGUgaW5kZXggb2YgYSBwb2ludCBpbiBhIHNlcmllcy5cbi8vIFJldHVybnMgYSAyLWVsZW1lbnQgYXJyYXksIFtyb3csIGNvbF0sIHdoaWNoIGNhbiBiZSB1c2VkIHdpdGhcbi8vIGR5Z3JhcGguZ2V0VmFsdWUoKSB0byBnZXQgdGhlIHZhbHVlIGF0IHRoaXMgcG9pbnQuXG4vLyBSZXR1cm5zIG51bGwgaWYgdGhlcmUncyBubyBtYXRjaC5cbmFubm90YXRpb25zLnByb3RvdHlwZS5maW5kUG9pbnRJbmRleF8gPSBmdW5jdGlvbiBmaW5kUG9pbnRJbmRleF8oc2VyaWVzLCB4dmFsKSB7XG4gIHZhciBjb2wgPSB0aGlzLmR5Z3JhcGhfLmdldExhYmVscygpLmluZGV4T2Yoc2VyaWVzKTtcbiAgaWYgKGNvbCA9PSAtMSkgcmV0dXJuIG51bGw7XG5cbiAgdmFyIGxvd0lkeCA9IDAsIGhpZ2hJZHggPSB0aGlzLmR5Z3JhcGhfLm51bVJvd3MoKSAtIDE7XG4gIHdoaWxlIChsb3dJZHggPD0gaGlnaElkeCkge1xuICAgIHZhciBpZHggPSBNYXRoLmZsb29yKChsb3dJZHggKyBoaWdoSWR4KSAvIDIpO1xuICAgIHZhciB4QXRJZHggPSB0aGlzLmR5Z3JhcGhfLmdldFZhbHVlKGlkeCwgMCk7XG4gICAgaWYgKHhBdElkeCA9PSB4dmFsKSB7XG4gICAgICByZXR1cm4gW2lkeCwgY29sXTtcbiAgICB9IGVsc2UgaWYgKHhBdElkeCA8IHh2YWwpIHtcbiAgICAgIGxvd0lkeCA9IGlkeCArIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhpZ2hJZHggPSBpZHggLSAxO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbmFubm90YXRpb25zLnByb3RvdHlwZS5nZXRDb2xvckZvclNlcmllc18gPSBmdW5jdGlvbiBnZXRDb2xvckZvclNlcmllc18oc2VyaWVzKSB7XG4gIHZhciBjb2xvcnMgPSB0aGlzLmR5Z3JhcGhfLmdldENvbG9ycygpO1xuICB2YXIgY29sID0gdGhpcy5keWdyYXBoXy5nZXRMYWJlbHMoKS5pbmRleE9mKHNlcmllcyk7XG4gIGlmIChjb2wgPT0gLTEpIHJldHVybiBudWxsO1xuXG4gIHJldHVybiBjb2xvcnNbKGNvbCAtIDEpICUgY29sb3JzLmxlbmd0aF07XG59O1xuXG4vLyBNb3ZlcyBhIGhhaXJsaW5lJ3MgZGl2cyB0byB0aGUgdG9wIG9mIHRoZSB6LW9yZGVyaW5nLlxuYW5ub3RhdGlvbnMucHJvdG90eXBlLm1vdmVBbm5vdGF0aW9uVG9Ub3AgPSBmdW5jdGlvbiBtb3ZlQW5ub3RhdGlvblRvVG9wKGEpIHtcbiAgdmFyIGRpdiA9IHRoaXMuZHlncmFwaF8uZ3JhcGhEaXY7XG4gICQoYS5pbmZvRGl2KS5hcHBlbmRUbyhkaXYpO1xuICAkKGEubGluZURpdikuYXBwZW5kVG8oZGl2KTtcblxuICB2YXIgaWR4ID0gdGhpcy5hbm5vdGF0aW9uc18uaW5kZXhPZihhKTtcbiAgdGhpcy5hbm5vdGF0aW9uc18uc3BsaWNlKGlkeCwgMSk7XG4gIHRoaXMuYW5ub3RhdGlvbnNfLnB1c2goYSk7XG59O1xuXG4vLyBQb3NpdGlvbnMgZXhpc3RpbmcgaGFpcmxpbmUgZGl2cy5cbmFubm90YXRpb25zLnByb3RvdHlwZS51cGRhdGVBbm5vdGF0aW9uRGl2UG9zaXRpb25zID0gZnVuY3Rpb24gdXBkYXRlQW5ub3RhdGlvbkRpdlBvc2l0aW9ucygpIHtcbiAgdmFyIGxheW91dCA9IHRoaXMuZHlncmFwaF8uZ2V0QXJlYSgpO1xuICB2YXIgY2hhcnRMZWZ0ID0gbGF5b3V0LngsIGNoYXJ0UmlnaHQgPSBsYXlvdXQueCArIGxheW91dC53O1xuICB2YXIgY2hhcnRUb3AgPSBsYXlvdXQueSwgY2hhcnRCb3R0b20gPSBsYXlvdXQueSArIGxheW91dC5oO1xuICB2YXIgZGl2ID0gdGhpcy5keWdyYXBoXy5ncmFwaERpdjtcbiAgdmFyIHBvcyA9IER5Z3JhcGguZmluZFBvcyhkaXYpO1xuICB2YXIgYm94ID0gW2xheW91dC54ICsgcG9zLngsIGxheW91dC55ICsgcG9zLnldO1xuICBib3gucHVzaChib3hbMF0gKyBsYXlvdXQudyk7XG4gIGJveC5wdXNoKGJveFsxXSArIGxheW91dC5oKTtcblxuICB2YXIgZyA9IHRoaXMuZHlncmFwaF87XG5cbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkLmVhY2godGhpcy5hbm5vdGF0aW9uc18sIGZ1bmN0aW9uIGFubm90YXRpb25zTG9vcF8oaWR4LCBhKSB7XG4gICAgdmFyIHJvd19jb2wgPSB0aGF0LmZpbmRQb2ludEluZGV4XyhhLnNlcmllcywgYS54dmFsKTtcbiAgICBpZiAocm93X2NvbCA9PSBudWxsKSB7XG4gICAgICAkKFthLmxpbmVEaXYsIGEuaW5mb0Rpdl0pLmhpZGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVE9ETyhkYW52ayk6IG9ubHkgZG8gdGhpcyBpZiB0aGV5J3JlIGludmlzaWJsZT9cbiAgICAgICQoW2EubGluZURpdiwgYS5pbmZvRGl2XSkuc2hvdygpO1xuICAgIH1cbiAgICB2YXIgeHkgPSBnLnRvRG9tQ29vcmRzKGEueHZhbCwgZy5nZXRWYWx1ZShyb3dfY29sWzBdLCByb3dfY29sWzFdKSk7XG4gICAgdmFyIHggPSB4eVswXSwgcG9pbnRZID0geHlbMV07XG5cbiAgICB2YXIgbGluZUhlaWdodCA9IDY7ICAvLyBUT0RPKGRhbnZrKTogb3B0aW9uP1xuXG4gICAgdmFyIHkgPSBwb2ludFk7XG4gICAgaWYgKGEueUZyYWMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgeSA9IGxheW91dC55ICsgbGF5b3V0LmggKiBhLnlGcmFjO1xuICAgIH0gZWxzZSB7XG4gICAgICB5IC09IGxpbmVIZWlnaHQ7XG4gICAgfVxuXG4gICAgdmFyIGxpbmVIZWlnaHQgPSB5IDwgcG9pbnRZID8gKHBvaW50WSAtIHkpIDogKHkgLSBwb2ludFkgLSBhLmluZm9EaXYub2Zmc2V0SGVpZ2h0KTtcbiAgICAkKGEubGluZURpdikuY3NzKHtcbiAgICAgICdsZWZ0JzogeCArICdweCcsXG4gICAgICAndG9wJzogTWF0aC5taW4oeSwgcG9pbnRZKSArICdweCcsXG4gICAgICAnaGVpZ2h0JzogbGluZUhlaWdodCArICdweCdcbiAgICB9KTtcbiAgICAkKGEuaW5mb0RpdikuY3NzKHtcbiAgICAgICdsZWZ0JzogeCArICdweCcsXG4gICAgfSk7XG4gICAgaWYgKCFhLmlzRHJhZ2dpbmcpIHtcbiAgICAgIC8vIGpRdWVyeSBVSSBkcmFnZ2FibGUgbGlrZXMgdG8gc2V0ICd0b3AnLCB3aGVyZWFzIHN1cGVyYW5ub3RhdGlvbnMgc2V0c1xuICAgICAgLy8gJ2JvdHRvbScuIFNldHRpbmcgYm90aCB3aWxsIG1ha2UgdGhlIGFubm90YXRpb24gZ3JvdyBhbmQgY29udHJhY3QgYXNcbiAgICAgIC8vIHRoZSB1c2VyIGRyYWdzIGl0LCB3aGljaCBsb29rcyBiYWQuXG4gICAgICAkKGEuaW5mb0RpdikuY3NzKHtcbiAgICAgICAgJ2JvdHRvbSc6IChkaXYub2Zmc2V0SGVpZ2h0IC0geSkgKyAncHgnXG4gICAgICB9KSAgLy8uZHJhZ2dhYmxlKFwib3B0aW9uXCIsIFwiY29udGFpbm1lbnRcIiwgYm94KTtcblxuICAgICAgdmFyIHZpc2libGUgPSAoeCA+PSBjaGFydExlZnQgJiYgeCA8PSBjaGFydFJpZ2h0KSAmJlxuICAgICAgICAgICAgICAgICAgICAocG9pbnRZID49IGNoYXJ0VG9wICYmIHBvaW50WSA8PSBjaGFydEJvdHRvbSk7XG4gICAgICAkKFthLmluZm9EaXYsIGEubGluZURpdl0pLnRvZ2dsZSh2aXNpYmxlKTtcbiAgICB9XG4gIH0pO1xufTtcblxuLy8gRmlsbHMgb3V0IHRoZSBpbmZvIGRpdiBiYXNlZCBvbiBjdXJyZW50IGNvb3JkaW5hdGVzLlxuYW5ub3RhdGlvbnMucHJvdG90eXBlLnVwZGF0ZUFubm90YXRpb25JbmZvID0gZnVuY3Rpb24gdXBkYXRlQW5ub3RhdGlvbkluZm8oKSB7XG4gIHZhciBnID0gdGhpcy5keWdyYXBoXztcblxuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciB0ZW1wbGF0ZURpdiA9ICQoJyNhbm5vdGF0aW9uLXRlbXBsYXRlJykuZ2V0KDApO1xuICAkLmVhY2godGhpcy5hbm5vdGF0aW9uc18sIGZ1bmN0aW9uIGFubm90YXRpb25zTG9vcF8oaWR4LCBhKSB7XG4gICAgLy8gV2Ugc2hvdWxkIG5ldmVyIHVwZGF0ZSBhbiBlZGl0YWJsZSBkaXYgLS0gZG9pbmcgc28gbWF5IGtpbGwgdW5zYXZlZFxuICAgIC8vIGVkaXRzIHRvIGFuIGFubm90YXRpb24uXG4gICAgJChhLmluZm9EaXYpLnRvZ2dsZUNsYXNzKCdlZGl0YWJsZScsICEhYS5lZGl0YWJsZSk7XG4gICAgaWYgKGEuZWRpdGFibGUpIHJldHVybjtcbiAgICBhLmluZm9EaXYuaW5uZXJIVE1MID0gdGhhdC5nZXRUZW1wbGF0ZUhUTUwodGVtcGxhdGVEaXYsIGEpO1xuICB9KTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHshQW5ub3RhdGlvbn0gYSBJbnRlcm5hbCBhbm5vdGF0aW9uXG4gKiBAcmV0dXJuIHshUHVibGljQW5ub3RhdGlvbn0gYSB2aWV3IG9mIHRoZSBhbm5vdGF0aW9uIGZvciB0aGUgcHVibGljIEFQSS5cbiAqL1xuYW5ub3RhdGlvbnMucHJvdG90eXBlLmNyZWF0ZVB1YmxpY0Fubm90YXRpb25fID0gZnVuY3Rpb24gY3JlYXRlUHVibGljQW5ub3RhdGlvbl8oYSwgb3B0X3Byb3BzKSB7XG4gIHZhciBkaXNwbGF5QW5ub3RhdGlvbiA9ICQuZXh0ZW5kKHt9LCBhLCBvcHRfcHJvcHMpO1xuICBkZWxldGUgZGlzcGxheUFubm90YXRpb25bJ2luZm9EaXYnXTtcbiAgZGVsZXRlIGRpc3BsYXlBbm5vdGF0aW9uWydsaW5lRGl2J107XG4gIGRlbGV0ZSBkaXNwbGF5QW5ub3RhdGlvblsnaXNEcmFnZ2luZyddO1xuICBkZWxldGUgZGlzcGxheUFubm90YXRpb25bJ2VkaXRhYmxlJ107XG4gIHJldHVybiBkaXNwbGF5QW5ub3RhdGlvbjtcbn07XG5cbi8vIEZpbGwgb3V0IGEgZGl2IHVzaW5nIHRoZSB2YWx1ZXMgaW4gdGhlIGFubm90YXRpb24gb2JqZWN0LlxuLy8gVGhlIGRpdidzIGh0bWwgaXMgZXhwZWN0ZWQgdG8gaGF2ZSB0ZXh0IG9mIHRoZSBmb3JtIFwie3trZXl9fVwiXG5hbm5vdGF0aW9ucy5wcm90b3R5cGUuZ2V0VGVtcGxhdGVIVE1MID0gZnVuY3Rpb24gZ2V0VGVtcGxhdGVIVE1MKGRpdiwgYSkge1xuICB2YXIgZyA9IHRoaXMuZHlncmFwaF87XG4gIHZhciByb3dfY29sID0gdGhpcy5maW5kUG9pbnRJbmRleF8oYS5zZXJpZXMsIGEueHZhbCk7XG4gIGlmIChyb3dfY29sID09IG51bGwpIHJldHVybjsgIC8vIHBlcmhhcHMgaXQncyBubyBsb25nZXIgYSByZWFsIHBvaW50P1xuICB2YXIgcm93ID0gcm93X2NvbFswXTtcbiAgdmFyIGNvbCA9IHJvd19jb2xbMV07XG5cbiAgdmFyIHlPcHRWaWV3ID0gZy5vcHRpb25zVmlld0ZvckF4aXNfKCd5MScpOyAgLy8gVE9ETzogc3VwcG9ydCBzZWNvbmRhcnksIHRvb1xuICB2YXIgeE9wdFZpZXcgPSBnLm9wdGlvbnNWaWV3Rm9yQXhpc18oJ3gnKTtcbiAgdmFyIHh2ZiA9IGcuZ2V0T3B0aW9uRm9yQXhpcygndmFsdWVGb3JtYXR0ZXInLCAneCcpO1xuXG4gIHZhciB4ID0geHZmLmNhbGwoZywgYS54dmFsLCB4T3B0Vmlldyk7XG4gIHZhciB5ID0gZy5nZXRPcHRpb24oJ3ZhbHVlRm9ybWF0dGVyJywgYS5zZXJpZXMpLmNhbGwoXG4gICAgICBnLCBnLmdldFZhbHVlKHJvdywgY29sKSwgeU9wdFZpZXcpO1xuXG4gIHZhciBkaXNwbGF5QW5ub3RhdGlvbiA9IHRoaXMuY3JlYXRlUHVibGljQW5ub3RhdGlvbl8oYSwge3g6eCwgeTp5fSk7XG4gIHZhciBodG1sID0gZGl2LmlubmVySFRNTDtcbiAgZm9yICh2YXIgayBpbiBkaXNwbGF5QW5ub3RhdGlvbikge1xuICAgIHZhciB2ID0gZGlzcGxheUFubm90YXRpb25ba107XG4gICAgaWYgKHR5cGVvZih2KSA9PSAnb2JqZWN0JykgY29udGludWU7ICAvLyBlLmcuIGluZm9EaXYgb3IgbGluZURpdlxuICAgIGh0bWwgPSBodG1sLnJlcGxhY2UobmV3IFJlZ0V4cCgnXFx7XFx7JyArIGsgKyAnXFx9XFx9JywgJ2cnKSwgdik7XG4gIH1cbiAgcmV0dXJuIGh0bWw7XG59O1xuXG4vLyBVcGRhdGUgdGhlIGFubm90YXRpb24gb2JqZWN0IGJ5IGxvb2tpbmcgZm9yIGVsZW1lbnRzIHdpdGggYSAnZGctYW5uLWZpZWxkJ1xuLy8gYXR0cmlidXRlLiBGb3IgZXhhbXBsZSwgPGlucHV0IHR5cGU9J3RleHQnIGRnLWFubi1maWVsZD0ndGV4dCcgLz4gd2lsbCBoYXZlXG4vLyBpdHMgdmFsdWUgcGxhY2VkIGluIHRoZSAndGV4dCcgYXR0cmlidXRlIG9mIHRoZSBhbm5vdGF0aW9uLlxuYW5ub3RhdGlvbnMucHJvdG90eXBlLmV4dHJhY3RVcGRhdGVkUHJvcGVydGllc18gPSBmdW5jdGlvbiBleHRyYWN0VXBkYXRlZFByb3BlcnRpZXNfKGRpdiwgYSkge1xuICAkKGRpdikuZmluZCgnW2RnLWFubi1maWVsZF0nKS5lYWNoKGZ1bmN0aW9uIGZpZWxkTG9vcF8oaWR4LCBlbCkge1xuICAgIHZhciBrID0gJChlbCkuYXR0cignZGctYW5uLWZpZWxkJyk7XG4gICAgdmFyIHYgPSAkKGVsKS52YWwoKTtcbiAgICBhW2tdID0gdjtcbiAgfSk7XG59O1xuXG4vLyBBZnRlciBhIHJlc2l6ZSwgdGhlIGhhaXJsaW5lIGRpdnMgY2FuIGdldCBkZXR0YWNoZWQgZnJvbSB0aGUgY2hhcnQuXG4vLyBUaGlzIHJlYXR0YWNoZXMgdGhlbS5cbmFubm90YXRpb25zLnByb3RvdHlwZS5hdHRhY2hBbm5vdGF0aW9uc1RvQ2hhcnRfID0gZnVuY3Rpb24gYXR0YWNoQW5ub3RhdGlvbnNUb0NoYXJ0XygpIHtcbiAgdmFyIGRpdiA9IHRoaXMuZHlncmFwaF8uZ3JhcGhEaXY7XG4gICQuZWFjaCh0aGlzLmFubm90YXRpb25zXywgZnVuY3Rpb24gYW5ub3RhdGlvbnNMb29wXyhpZHgsIGEpIHtcbiAgICAvLyBSZS1hdHRhY2hpbmcgYW4gZWRpdGFibGUgZGl2IHRvIHRoZSBET00gY2FuIGNsZWFyIGl0cyBmb2N1cy5cbiAgICAvLyBUaGlzIG1ha2VzIHR5cGluZyByZWFsbHkgZGlmZmljdWx0IVxuICAgIGlmIChhLmVkaXRhYmxlKSByZXR1cm47XG5cbiAgICAkKFthLmxpbmVEaXYsIGEuaW5mb0Rpdl0pLmFwcGVuZFRvKGRpdik7XG4gIH0pO1xufTtcblxuLy8gRGVsZXRlcyBhIGhhaXJsaW5lIGFuZCByZW1vdmVzIGl0IGZyb20gdGhlIGNoYXJ0LlxuYW5ub3RhdGlvbnMucHJvdG90eXBlLnJlbW92ZUFubm90YXRpb24gPSBmdW5jdGlvbiByZW1vdmVBbm5vdGF0aW9uKGEpIHtcbiAgdmFyIGlkeCA9IHRoaXMuYW5ub3RhdGlvbnNfLmluZGV4T2YoYSk7XG4gIGlmIChpZHggPj0gMCkge1xuICAgIHRoaXMuYW5ub3RhdGlvbnNfLnNwbGljZShpZHgsIDEpO1xuICAgICQoW2EubGluZURpdiwgYS5pbmZvRGl2XSkucmVtb3ZlKCk7XG4gIH0gZWxzZSB7XG4gICAgRHlncmFwaC53YXJuKCdUcmllZCB0byByZW1vdmUgbm9uLWV4aXN0ZW50IGFubm90YXRpb24uJyk7XG4gIH1cbn07XG5cbmFubm90YXRpb25zLnByb3RvdHlwZS5kaWREcmF3Q2hhcnQgPSBmdW5jdGlvbiBkaWREcmF3Q2hhcnQoZSkge1xuICB2YXIgZyA9IGUuZHlncmFwaDtcblxuICAvLyBFYXJseSBvdXQgaW4gdGhlIChjb21tb24pIGNhc2Ugb2YgemVybyBhbm5vdGF0aW9ucy5cbiAgaWYgKHRoaXMuYW5ub3RhdGlvbnNfLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gIHRoaXMudXBkYXRlQW5ub3RhdGlvbkRpdlBvc2l0aW9ucygpO1xuICB0aGlzLmF0dGFjaEFubm90YXRpb25zVG9DaGFydF8oKTtcbiAgdGhpcy51cGRhdGVBbm5vdGF0aW9uSW5mbygpO1xufTtcblxuYW5ub3RhdGlvbnMucHJvdG90eXBlLnBvaW50Q2xpY2sgPSBmdW5jdGlvbiBwb2ludENsaWNrKGUpIHtcbiAgLy8gUHJldmVudCBhbnkgb3RoZXIgYmVoYXZpb3IgYmFzZWQgb24gdGhpcyBjbGljaywgZS5nLiBjcmVhdGlvbiBvZiBhIGhhaXJsaW5lLlxuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgdmFyIGEgPSAkLmV4dGVuZCh7fSwgdGhpcy5kZWZhdWx0QW5ub3RhdGlvblByb3BlcnRpZXNfLCB7XG4gICAgc2VyaWVzOiBlLnBvaW50Lm5hbWUsXG4gICAgeHZhbDogZS5wb2ludC54dmFsXG4gIH0pO1xuICB0aGlzLmFubm90YXRpb25zXy5wdXNoKHRoaXMuY3JlYXRlQW5ub3RhdGlvbihhKSk7XG5cbiAgdGhpcy51cGRhdGVBbm5vdGF0aW9uRGl2UG9zaXRpb25zKCk7XG4gIHRoaXMudXBkYXRlQW5ub3RhdGlvbkluZm8oKTtcbiAgdGhpcy5hdHRhY2hBbm5vdGF0aW9uc1RvQ2hhcnRfKCk7XG5cbiAgJCh0aGlzKS50cmlnZ2VySGFuZGxlcignYW5ub3RhdGlvbkNyZWF0ZWQnLCBhKTtcbiAgJCh0aGlzKS50cmlnZ2VySGFuZGxlcignYW5ub3RhdGlvbnNDaGFuZ2VkJywge30pO1xuXG4gIC8vIEFubm90YXRpb25zIHNob3VsZCBiZWdpbiBsaWZlIGVkaXRhYmxlLlxuICB0aGlzLm1ha2VBbm5vdGF0aW9uRWRpdGFibGUoYSk7XG59O1xuXG5hbm5vdGF0aW9ucy5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gIHRoaXMuZGV0YWNoTGFiZWxzKCk7XG59O1xuXG4vLyBQdWJsaWMgQVBJXG5cbi8qKlxuICogVGhpcyBpcyBhIHJlc3RyaWN0ZWQgdmlldyBvZiB0aGlzLmFubm90YXRpb25zXyB3aGljaCBkb2Vzbid0IGV4cG9zZVxuICogaW1wbGVtZW50YXRpb24gZGV0YWlscyBsaWtlIHRoZSBsaW5lIC8gaW5mbyBkaXZzLlxuICpcbiAqIEB0eXBlZGVmIHtcbiAqICAgeHZhbDogIG51bWJlciwgICAgICAvLyB4LXZhbHVlIChpLmUuIG1pbGxpcyBvciBhIHJhdyBudW1iZXIpXG4gKiAgIHNlcmllczogc3RyaW5nLCAgICAgLy8gc2VyaWVzIG5hbWVcbiAqIH0gUHVibGljQW5ub3RhdGlvblxuICovXG5cbi8qKlxuICogQHJldHVybiB7IUFycmF5LjwhUHVibGljQW5ub3RhdGlvbj59IFRoZSBjdXJyZW50IHNldCBvZiBhbm5vdGF0aW9ucywgb3JkZXJlZFxuICogICAgIGZyb20gYmFjayB0byBmcm9udC5cbiAqL1xuYW5ub3RhdGlvbnMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYW5ub3RhdGlvbnNfLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzdWx0LnB1c2godGhpcy5jcmVhdGVQdWJsaWNBbm5vdGF0aW9uXyh0aGlzLmFubm90YXRpb25zX1tpXSkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIENhbGxpbmcgdGhpcyB3aWxsIHJlc3VsdCBpbiBhbiBhbm5vdGF0aW9uc0NoYW5nZWQgZXZlbnQgYmVpbmcgdHJpZ2dlcmVkLCBub1xuICogbWF0dGVyIHdoZXRoZXIgaXQgY29uc2lzdHMgb2YgYWRkaXRpb25zLCBkZWxldGlvbnMsIG1vdmVzIG9yIG5vIGNoYW5nZXMgYXRcbiAqIGFsbC5cbiAqXG4gKiBAcGFyYW0geyFBcnJheS48IVB1YmxpY0Fubm90YXRpb24+fSBhbm5vdGF0aW9ucyBUaGUgbmV3IHNldCBvZiBhbm5vdGF0aW9ucyxcbiAqICAgICBvcmRlcmVkIGZyb20gYmFjayB0byBmcm9udC5cbiAqL1xuYW5ub3RhdGlvbnMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChhbm5vdGF0aW9ucykge1xuICAvLyBSZS11c2UgZGl2cyBmcm9tIHRoZSBvbGQgYW5ub3RhdGlvbnMgYXJyYXkgc28gZmFyIGFzIHdlIGNhbi5cbiAgLy8gVGhleSdyZSBhbHJlYWR5IGNvcnJlY3RseSB6LW9yZGVyZWQuXG4gIHZhciBhbnlDcmVhdGVkID0gZmFsc2U7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYW5ub3RhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYSA9IGFubm90YXRpb25zW2ldO1xuXG4gICAgaWYgKHRoaXMuYW5ub3RhdGlvbnNfLmxlbmd0aCA+IGkpIHtcbiAgICAgIC8vIE9ubHkgdGhlIGRpdnMgbmVlZCB0byBiZSBwcmVzZXJ2ZWQuXG4gICAgICB2YXIgb2xkQSA9IHRoaXMuYW5ub3RhdGlvbnNfW2ldO1xuICAgICAgdGhpcy5hbm5vdGF0aW9uc19baV0gPSAkLmV4dGVuZCh7XG4gICAgICAgIGluZm9EaXY6IG9sZEEuaW5mb0RpdixcbiAgICAgICAgbGluZURpdjogb2xkQS5saW5lRGl2XG4gICAgICB9LCBhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hbm5vdGF0aW9uc18ucHVzaCh0aGlzLmNyZWF0ZUFubm90YXRpb24oYSkpO1xuICAgICAgYW55Q3JlYXRlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLy8gSWYgdGhlcmUgYXJlIGFueSByZW1haW5pbmcgYW5ub3RhdGlvbnMsIGRlc3Ryb3kgdGhlbS5cbiAgd2hpbGUgKGFubm90YXRpb25zLmxlbmd0aCA8IHRoaXMuYW5ub3RhdGlvbnNfLmxlbmd0aCkge1xuICAgIHRoaXMucmVtb3ZlQW5ub3RhdGlvbih0aGlzLmFubm90YXRpb25zX1thbm5vdGF0aW9ucy5sZW5ndGhdKTtcbiAgfVxuXG4gIHRoaXMudXBkYXRlQW5ub3RhdGlvbkRpdlBvc2l0aW9ucygpO1xuICB0aGlzLnVwZGF0ZUFubm90YXRpb25JbmZvKCk7XG4gIGlmIChhbnlDcmVhdGVkKSB7XG4gICAgdGhpcy5hdHRhY2hBbm5vdGF0aW9uc1RvQ2hhcnRfKCk7XG4gIH1cblxuICAkKHRoaXMpLnRyaWdnZXJIYW5kbGVyKCdhbm5vdGF0aW9uc0NoYW5nZWQnLCB7fSk7XG59O1xuXG5yZXR1cm4gYW5ub3RhdGlvbnM7XG5cbn0pKCk7XG5cbi8qIGxvYWRlciB3cmFwcGVyICovXG5EeWdyYXBoLl9yZXF1aXJlLmFkZCgnZHlncmFwaHMvc3JjL2V4dHJhcy9zdXBlci1hbm5vdGF0aW9ucy5qcycsIC8qIGV4cG9ydHMgKi8ge30pO1xufSkoKTtcbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDLFNBQVNBLGdDQUFnQyxHQUFHO0VBQzdDLFlBQVk7O0VBQ1osSUFBSUMsT0FBTztFQUNYLElBQUlDLE1BQU0sQ0FBQ0QsT0FBTyxFQUFFO0lBQ2xCQSxPQUFPLEdBQUdDLE1BQU0sQ0FBQ0QsT0FBTztFQUMxQixDQUFDLE1BQU0sSUFBSSxPQUFPRSxNQUFPLEtBQUssV0FBVyxFQUFFO0lBQ3pDRixPQUFPLEdB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