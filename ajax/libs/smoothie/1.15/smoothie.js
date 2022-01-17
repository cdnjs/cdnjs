// MIT License:
//
// Copyright (c) 2010-2013, Joe Walnes
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * Smoothie Charts - http://smoothiecharts.org/
 * (c) 2010-2013, Joe Walnes
 *
 * v1.0: Main charting library, by Joe Walnes
 * v1.1: Auto scaling of axis, by Neil Dunn
 * v1.2: fps (frames per second) option, by Mathias Petterson
 * v1.3: Fix for divide by zero, by Paul Nikitochkin
 * v1.4: Set minimum, top-scale padding, remove timeseries, add optional timer to reset bounds, by Kelley Reynolds
 * v1.5: Set default frames per second to 50... smoother.
 *       .start(), .stop() methods for conserving CPU, by Dmitry Vyal
 *       options.interpolation = 'bezier' or 'line', by Dmitry Vyal
 *       options.maxValue to fix scale, by Dmitry Vyal
 * v1.6: minValue/maxValue will always get converted to floats, by Przemek Matylla
 * v1.7: options.grid.fillStyle may be a transparent color, by Dmitry A. Shashkin
 *       Smooth rescaling, by Kostas Michalopoulos
 * v1.8: Set max length to customize number of live points in the dataset with options.maxDataSetLength, by Krishna Narni
 * v1.9: Display timestamps along the bottom, by Nick and Stev-io
 *       (https://groups.google.com/forum/?fromgroups#!topic/smoothie-charts/-Ywse8FCpKI%5B1-25%5D)
 *       Refactored by Krishna Narni, to support timestamp formatting function
 * v1.10: Switch to requestAnimationFrame, removed the now obsoleted options.fps, by Gergely Imreh
 * v1.11: options.grid.sharpLines option added, by @drewnoakes
 *        Addressed warning seen in Firefox when seriesOption.fillStyle undefined, by @drewnoakes
 * v1.12: Support for horizontalLines added, by @drewnoakes
 *        Support for yRangeFunction callback added, by @drewnoakes
 * v1.13: Fixed typo (#32), by @alnikitich
 * v1.14: Timer cleared when last TimeSeries removed (#23), by @davidgaleano
 *        Fixed diagonal line on chart at start/end of data stream, by @drewnoakes
 * v1.15: Support for npm package (#18), by @dominictarr
 *        Fixed broken removeTimeSeries function (#24) by @davidgaleano
 *        Minor performance and tidying, by @drewnoakes
 */

;(function (exports) {

function TimeSeries(options) {
  options = options || {};
  options.resetBoundsInterval = options.resetBoundsInterval || 3000; // Reset the max/min bounds after this many milliseconds
  options.resetBounds = options.resetBounds === undefined ? true : options.resetBounds; // Enable or disable the resetBounds timer
  this.options = options;
  this.data = [];
  
  this.maxValue = Number.NaN; // The maximum value ever seen in this time series.
  this.minValue = Number.NaN; // The minimum value ever seen in this time series.
}

// Reset the min and max for this timeseries so the graph rescales itself
TimeSeries.prototype.resetBounds = function() {
  this.maxValue = Number.NaN;
  this.minValue = Number.NaN;
  for (var i = 0; i < this.data.length; i++) {
    this.maxValue = !isNaN(this.maxValue) ? Math.max(this.maxValue, this.data[i][1]) : this.data[i][1];
    this.minValue = !isNaN(this.minValue) ? Math.min(this.minValue, this.data[i][1]) : this.data[i][1];
  }
};

TimeSeries.prototype.append = function(timestamp, value) {
  this.data.push([timestamp, value]);
  this.maxValue = !isNaN(this.maxValue) ? Math.max(this.maxValue, value) : value;
  this.minValue = !isNaN(this.minValue) ? Math.min(this.minValue, value) : value;
};

TimeSeries.prototype.dropOldData = function(oldestValidTime, maxDataSetLength) {
  // We must always keep one expired data point as we need this to draw the
  // line that comes into the chart from the left, but any points prior to that can be removed.
  var removeCount = 0;
  while (this.data.length - removeCount >= maxDataSetLength && this.data[removeCount + 1][0] < oldestValidTime) {
    removeCount++;
  }
  if (removeCount !== 0) {
    this.data.splice(0, removeCount);
  }
};

function SmoothieChart(options) {
  // Defaults
  options = options || {};
  options.grid = options.grid || {};
  options.grid.fillStyle = options.grid.fillStyle || '#000000';
  options.grid.strokeStyle = options.grid.strokeStyle || '#777777';
  options.grid.lineWidth = typeof(options.grid.lineWidth) === 'undefined' ? 1 : options.grid.lineWidth;
  options.grid.sharpLines = !!options.grid.sharpLines;
  options.grid.millisPerLine = options.grid.millisPerLine || 1000;
  options.grid.verticalSections = typeof(options.grid.verticalSections) === 'undefined' ? 2 : options.grid.verticalSections;
  options.millisPerPixel = options.millisPerPixel || 20;
  options.maxValueScale = options.maxValueScale || 1;
  // NOTE there are no default values for 'minValue' and 'maxValue'
  options.labels = options.labels || { fillStyle:'#ffffff' };
  options.interpolation = options.interpolation || "bezier";
  options.scaleSmoothing = options.scaleSmoothing || 0.125;
  options.maxDataSetLength = options.maxDataSetLength || 2; 
  options.timestampFormatter = options.timestampFormatter || null;
  options.horizontalLines = options.horizontalLines || [];
  this.options = options;
  this.seriesSet = [];
  this.currentValueRange = 1;
  this.currentVisMinValue = 0;
}

// Based on http://inspirit.github.com/jsfeat/js/compatibility.js
SmoothieChart.AnimateCompatibility = (function() {
  var lastTime = 0,
      requestAnimationFrame = function(callback, element) {
        var requestAnimationFrame =
          window.requestAnimationFrame        ||
          window.webkitRequestAnimationFrame  ||
          window.mozRequestAnimationFrame     ||
          window.oRequestAnimationFrame       ||
          window.msRequestAnimationFrame      ||
          function(callback) {
            var currTime = new Date().getTime(),
                timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                id = window.setTimeout(function() {
                  callback(currTime + timeToCall);
                }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
          };
        return requestAnimationFrame.call(window, callback, element);
      },
      cancelAnimationFrame = function(id) {
        var cancelAnimationFrame =
          window.cancelAnimationFrame ||
          function(id) {
            clearTimeout(id);
          };
        return cancelAnimationFrame.call(window, id);
      };

  return {
    requestAnimationFrame: requestAnimationFrame,
    cancelAnimationFrame: cancelAnimationFrame
  };
})();

SmoothieChart.prototype.addTimeSeries = function(timeSeries, options) {
  this.seriesSet.push({timeSeries: timeSeries, options: options || {}});
  if (this.options.resetBounds && this.seriesSet.length === 1) {
    // Periodically reset the bounds, as requested
    var self = this;
    this.boundsTimerId = setInterval(function() { self.resetBounds(); }, options.resetBoundsInterval);
  }
};

SmoothieChart.prototype.removeTimeSeries = function(timeSeries) {
  var numSeries = this.seriesSet.length;
  for (var i = 0; i < numSeries; i++) {
    if (this.seriesSet[i].timeSeries === timeSeries) {
      this.seriesSet.splice(i, 1);
      break;
    }
  }
  if (this.options.resetBounds && this.seriesSet.length === 0) {
    // Stop resetting the bounds, if we were, as no more series exist
    clearInterval(this.boundsTimerId);
  }
};

SmoothieChart.prototype.streamTo = function(canvas, delay) {
  this.canvas = canvas;
  this.delay = delay;
  this.start();
};

SmoothieChart.prototype.start = function() {
  if (!this.frame) {
    this.animate();
  }
};

SmoothieChart.prototype.animate = function() {
  this.frame = SmoothieChart.AnimateCompatibility.requestAnimationFrame(this.animate.bind(this));
  this.render(this.canvas, new Date().getTime() - (this.delay || 0));
};

SmoothieChart.prototype.stop = function() {
  if (this.frame) {
    SmoothieChart.AnimateCompatibility.cancelAnimationFrame( this.frame );
    delete this.frame;
  }
};

// Sample timestamp formatting function 
SmoothieChart.timeFormatter = function(date) {
  function pad2(number) { return (number < 10 ? '0' : '') + number }
  return pad2(date.getHours()) + ':' + pad2(date.getMinutes()) + ':' + pad2(date.getSeconds());
};

SmoothieChart.prototype.updateValueRange = function() {
  // Calculate the current scale of the chart, from all time series.
  var options = this.options,
      maxValue = Number.NaN,
      minValue = Number.NaN;

  for (var d = 0; d < this.seriesSet.length; d++) {
    // TODO(ndunn): We could calculate / track these values as they stream in.
    var timeSeries = this.seriesSet[d].timeSeries;
    if (!isNaN(timeSeries.maxValue)) {
      maxValue = !isNaN(maxValue) ? Math.max(maxValue, timeSeries.maxValue) : timeSeries.maxValue;
    }

    if (!isNaN(timeSeries.minValue)) {
      minValue = !isNaN(minValue) ? Math.min(minValue, timeSeries.minValue) : timeSeries.minValue;
    }
  }

  // Scale the maxValue to add padding at the top if required
  if (options.maxValue != null) {
    maxValue = options.maxValue;
  } else {
    maxValue *= options.maxValueScale;
  }

  // Set the minimum if we've specified one
  if (options.minValue != null) {
    minValue = options.minValue;
  }

  // If a custom range function is set, call it
  if (this.yRangeFunction) {
    var range = this.yRangeFunction({min: minValue, max: maxValue});
    minValue = range.min;
    maxValue = range.max;
  }

  if (!isNaN(maxValue) && !isNaN(minValue)) {
    var targetValueRange = maxValue - minValue;
    this.currentValueRange += options.scaleSmoothing * (targetValueRange - this.currentValueRange);
    this.currentVisMinValue += options.scaleSmoothing * (minValue - this.currentVisMinValue);
  }

  this.valueRange = { min: minValue, max: maxValue };
};

SmoothieChart.prototype.render = function(canvas, time) {
  // Round time down to pixel granularity, so motion appears smoother.
  time -= time % this.options.millisPerPixel;

  var self = this,
      context = canvas.getContext("2d"),
      options = this.options,
      dimensions = { top: 0, left: 0, width: canvas.clientWidth, height: canvas.clientHeight },
      // Calculate the threshold time for the oldest data points.
      oldestValidTime = time - (dimensions.width * options.millisPerPixel),
      valueToYPixel = function(value) {
        var offset = value - self.currentVisMinValue;
        return self.currentValueRange === 0
          ? dimensions.height
          : dimensions.height - (Math.round((offset / self.currentValueRange) * dimensions.height));
      },
      timeToXPixel = function(t) {
        return Math.round(dimensions.width - ((time - t) / options.millisPerPixel));
      };

  this.updateValueRange();

  // Save the state of the canvas context, any transformations applied in this method
  // will get removed from the stack at the end of this method when .restore() is called.
  context.save();

  // Move the origin.
  context.translate(dimensions.left, dimensions.top);
  
  // Create a clipped rectangle - anything we draw will be constrained to this rectangle.
  // This prevents the occasional pixels from curves near the edges overrunning and creating
  // screen cheese (that phrase should need no explanation).
  context.beginPath();
  context.rect(0, 0, dimensions.width, dimensions.height);
  context.clip();

  // Clear the working area.
  context.save();
  context.fillStyle = options.grid.fillStyle;
  context.clearRect(0, 0, dimensions.width, dimensions.height);
  context.fillRect(0, 0, dimensions.width, dimensions.height);
  context.restore();

  // Grid lines....
  context.save();
  context.lineWidth = options.grid.lineWidth;
  context.strokeStyle = options.grid.strokeStyle;
  // Vertical (time) dividers.
  if (options.grid.millisPerLine > 0) {
    for (var t = time - (time % options.grid.millisPerLine);
         t >= oldestValidTime;
         t -= options.grid.millisPerLine) {
      var gx = timeToXPixel(t);
      if (options.grid.sharpLines) {
        gx -= 0.5;
      }
      context.beginPath();
      context.moveTo(gx, 0);
      context.lineTo(gx, dimensions.height);
      context.stroke();
      context.closePath();
      // To display timestamps along the bottom
      // May have to adjust millisPerLine to display non-overlapping timestamps, depending on the canvas size
      if (options.timestampFormatter) {
        // Formats the timestamp based on user specified formatting function
        // SmoothieChart.timeFormatter function above is one such formatting option
        var tx = new Date(t),
            ts = options.timestampFormatter(tx),
            textWidth = (context.measureText(ts).width / 2) + context.measureText(minValueString).width + 4;
        if (gx < dimensions.width - textWidth) {
          context.fillStyle = options.labels.fillStyle;
          // Insert the time string so it doesn't overlap on the minimum value
          context.fillText(ts, gx - (context.measureText(ts).width / 2), dimensions.height - 2);
        }
      }
    }
  }

  // Horizontal (value) dividers.
  for (var v = 1; v < options.grid.verticalSections; v++) {
    var gy = Math.round(v * dimensions.height / options.grid.verticalSections);
    if (options.grid.sharpLines) {
      gy -= 0.5;
    }
    context.beginPath();
    context.moveTo(0, gy);
    context.lineTo(dimensions.width, gy);
    context.stroke();
    context.closePath();
  }
  // Bounding rectangle.
  context.beginPath();
  context.strokeRect(0, 0, dimensions.width, dimensions.height);
  context.closePath();
  context.restore();

  // Draw any horizontal lines...
  if (options.horizontalLines && options.horizontalLines.length) {
    for (var hl = 0; hl < options.horizontalLines.length; hl++) {
      var line = options.horizontalLines[hl],
          hly = Math.round(valueToYPixel(line.value)) - 0.5;
      context.strokeStyle = line.color || '#ffffff';
      context.lineWidth = line.lineWidth || 1;
      context.beginPath();
      context.moveTo(0, hly);
      context.lineTo(dimensions.width, hly);
      context.stroke();
      context.closePath();
    }
  }

  // For each data set...
  for (var d = 0; d < this.seriesSet.length; d++) {
    context.save();
    var timeSeries = this.seriesSet[d].timeSeries,
        dataSet = timeSeries.data,
        seriesOptions = this.seriesSet[d].options;

    // Delete old data that's moved off the left of the chart.
    timeSeries.dropOldData(oldestValidTime, options.maxDataSetLength);

    // Set style for this dataSet.
    context.lineWidth = seriesOptions.lineWidth || 1;
    context.strokeStyle = seriesOptions.strokeStyle || '#ffffff';
    // Draw the line...
    context.beginPath();
    // Retain lastX, lastY for calculating the control points of bezier curves.
    var firstX = 0, lastX = 0, lastY = 0;
    for (var i = 0; i < dataSet.length && dataSet.length !== 1; i++) {
      var x = timeToXPixel(dataSet[i][0]),
          y = valueToYPixel(dataSet[i][1]);

      if (i === 0) {
        firstX = x;
        context.moveTo(x, y);
      } else {
        switch (options.interpolation) {
          case "line": {
            context.lineTo(x,y);
            break;
          }
          case "bezier":
          default: {
            // Great explanation of Bezier curves: http://en.wikipedia.org/wiki/Bezier_curve#Quadratic_curves
            //
            // Assuming A was the last point in the line plotted and B is the new point,
            // we draw a curve with control points P and Q as below.
            //
            // A---P
            //     |
            //     |
            //     |
            //     Q---B
            //
            // Importantly, A and P are at the same y coordinate, as are B and Q. This is
            // so adjacent curves appear to flow as one.
            //
            context.bezierCurveTo( // startPoint (A) is implicit from last iteration of loop
              Math.round((lastX + x) / 2), lastY, // controlPoint1 (P)
              Math.round((lastX + x)) / 2, y, // controlPoint2 (Q)
              x, y); // endPoint (B)
            break;
          }
        }
      }

      lastX = x; lastY = y;
    }

    if (dataSet.length > 1) {
      if (seriesOptions.fillStyle) {
        // Close up the fill region.
        context.lineTo(dimensions.width + seriesOptions.lineWidth + 1, lastY);
        context.lineTo(dimensions.width + seriesOptions.lineWidth + 1, dimensions.height + seriesOptions.lineWidth + 1);
        context.lineTo(firstX, dimensions.height + seriesOptions.lineWidth);
        context.fillStyle = seriesOptions.fillStyle;
        context.fill();
      }

      context.stroke();
      context.closePath();
    }
    context.restore();
  }

  // Draw the axis values on the chart.
  if (!options.labels.disabled && !isNaN(this.valueRange.min) && !isNaN(this.valueRange.max)) {
    context.fillStyle = options.labels.fillStyle;
    var maxValueString = parseFloat(this.valueRange.max).toFixed(2),
        minValueString = parseFloat(this.valueRange.min).toFixed(2);
    context.fillText(maxValueString, dimensions.width - context.measureText(maxValueString).width - 2, 10);
    context.fillText(minValueString, dimensions.width - context.measureText(minValueString).width - 2, dimensions.height - 2);
  }

  context.restore(); // See .save() above.
};

exports.TimeSeries = TimeSeries;
exports.SmoothieChart = SmoothieChart;

})(typeof exports === 'undefined' ?  this : exports);

