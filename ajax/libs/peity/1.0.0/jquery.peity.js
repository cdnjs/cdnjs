// Peity jQuery plugin version 1.0.0
// (c) 2012 Ben Pickles
//
// http://benpickles.github.com/peity
//
// Released under MIT license.
(function($, document, Math, devicePixelRatio) {
  var canvasSupported = document.createElement("canvas").getContext

  var peity = $.fn.peity = function(type, options) {
    if (canvasSupported) {
      this.each(function() {
        var defaults = peity.defaults[type]
        var data = {}
        var $this = $(this)

        $.each($this.data(), function(name, value) {
          if (name in defaults) data[name] = value
        })

        var opts = $.extend({}, defaults, data, options)
        var chart = new Peity($this, type, opts)
        chart.draw()

        $this.change(function() {
          chart.draw()
        })
      });
    }

    return this;
  };

  var Peity = function($elem, type, opts) {
    this.$elem = $elem
    this.type = type
    this.opts = opts
  }

  var PeityPrototype = Peity.prototype

  PeityPrototype.colours = function() {
    var colours = this.opts.colours
    var func = colours

    if (!$.isFunction(func)) {
      func = function(_, i) {
        return colours[i % colours.length]
      }
    }

    return func
  }

  PeityPrototype.draw = function() {
    peity.graphers[this.type].call(this, this.opts)
  }

  PeityPrototype.prepareCanvas = function(width, height) {
    var canvas = this.canvas

    if (canvas) {
      this.context.clearRect(0, 0, canvas.width, canvas.height)
    } else {
      canvas = $("<canvas>").attr({
        height: height * devicePixelRatio,
        width: width * devicePixelRatio
      })

      if (devicePixelRatio != 1) {
        canvas.css({
          height: height,
          width: width
        })
      }

      this.canvas = canvas = canvas[0]
      this.context = canvas.getContext("2d")
      this.$elem.hide().before(canvas)
    }

    return canvas
  }

  PeityPrototype.values = function() {
    return $.map(this.$elem.text().split(this.opts.delimiter), function(value) {
      return parseFloat(value)
    })
  }

  peity.defaults = {}
  peity.graphers = {}

  peity.register = function(type, defaults, grapher) {
    this.defaults[type] = defaults
    this.graphers[type] = grapher
  }

  peity.register(
    'pie',
    {
      colours: ["#ff9900", "#fff4dd", "#ffc66e"],
      delimiter: null,
      diameter: 16
    },
    function(opts) {
      if (!opts.delimiter) {
        var delimiter = this.$elem.text().match(/[^0-9\.]/)
        opts.delimiter = delimiter ? delimiter[0] : ","
      }

      var values = this.values()

      if (opts.delimiter == "/") {
        var v1 = values[0]
        var v2 = values[1]
        values = [v1, v2 - v1]
      }

      var i = 0
      var length = values.length
      var sum = 0

      for (; i < length; i++) {
        sum += values[i]
      }

      var canvas = this.prepareCanvas(opts.diameter, opts.diameter)
      var context = this.context
      var half = canvas.width / 2
      var pi = Math.PI
      var colours = this.colours()

      context.save()
      context.translate(half, half)
      context.rotate(-pi / 2)

      for (i = 0; i < length; i++) {
        var value = values[i]
        var slice = (value / sum) * pi * 2

        context.beginPath()
        context.moveTo(0, 0)
        context.arc(0, 0, half, 0, slice, false)
        context.fillStyle = colours.call(this, value, i, values)
        context.fill()
        context.rotate(slice)
      }

      context.restore()
    }
  )

  peity.register(
    "line",
    {
      colour: "#c6d9fd",
      strokeColour: "#4d89f9",
      strokeWidth: 1,
      delimiter: ",",
      height: 16,
      max: null,
      min: 0,
      width: 32
    },
    function(opts) {
      var values = this.values()
      if (values.length == 1) values.push(values[0])
      var max = Math.max.apply(Math, values.concat([opts.max]));
      var min = Math.min.apply(Math, values.concat([opts.min]))

      var canvas = this.prepareCanvas(opts.width, opts.height)
      var context = this.context
      var width = canvas.width
      var height = canvas.height
      var xQuotient = width / (values.length - 1)
      var yQuotient = height / (max - min)

      var coords = [];
      var i;

      context.beginPath();
      context.moveTo(0, height + (min * yQuotient))

      for (i = 0; i < values.length; i++) {
        var x = i * xQuotient
        var y = height - (yQuotient * (values[i] - min))

        coords.push({ x: x, y: y });
        context.lineTo(x, y);
      }

      context.lineTo(width, height + (min * yQuotient))
      context.fillStyle = opts.colour;
      context.fill();

      if (opts.strokeWidth) {
        context.beginPath();
        context.moveTo(0, coords[0].y);
        for (i = 0; i < coords.length; i++) {
          context.lineTo(coords[i].x, coords[i].y);
        }
        context.lineWidth = opts.strokeWidth * devicePixelRatio;
        context.strokeStyle = opts.strokeColour;
        context.stroke();
      }
    }
  );

  peity.register(
    'bar',
    {
      colours: ["#4D89F9"],
      delimiter: ",",
      height: 16,
      max: null,
      min: 0,
      spacing: devicePixelRatio,
      width: 32
    },
    function(opts) {
      var values = this.values()
      var max = Math.max.apply(Math, values.concat([opts.max]));
      var min = Math.min.apply(Math, values.concat([opts.min]))

      var canvas = this.prepareCanvas(opts.width, opts.height)
      var context = this.context

      var width = canvas.width
      var height = canvas.height
      var yQuotient = height / (max - min)
      var space = opts.spacing
      var xQuotient = (width + space) / values.length
      var colours = this.colours()

      for (var i = 0; i < values.length; i++) {
        var value = values[i]
        var x = i * xQuotient
        var y = height - (yQuotient * (value - min))

        context.fillStyle = colours.call(this, value, i, values)
        context.fillRect(x, y, xQuotient - space, yQuotient * values[i])
      }
    }
  );
})(jQuery, document, Math, window.devicePixelRatio || 1);
