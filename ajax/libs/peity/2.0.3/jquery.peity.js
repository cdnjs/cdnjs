// Peity jQuery plugin version 2.0.3
// (c) 2014 Ben Pickles
//
// http://benpickles.github.io/peity
//
// Released under MIT license.
(function($, document, Math) {
  var svgElement = function(tag, attrs) {
    var elem = document.createElementNS("http://www.w3.org/2000/svg", tag)

    $.each(attrs, function(name, value) {
      elem.setAttribute(name, value)
    })

    return elem
  }

  // https://gist.github.com/madrobby/3201472
  var svgSupported = "createElementNS" in document && svgElement("svg", {}).createSVGRect

  var pixel = 1 / (window.devicePixelRatio || 1)

  var peity = $.fn.peity = function(type, options) {
    if (svgSupported) {
      this.each(function() {
        var $this = $(this)
        var chart = $this.data("peity")

        if (chart) {
          if (type) chart.type = type
          $.extend(chart.opts, options)
        } else {
          var defaults = peity.defaults[type]
          var data = {}

          $.each($this.data(), function(name, value) {
            if (name in defaults) data[name] = value
          })

          var opts = $.extend({}, defaults, data, options)

          chart = new Peity($this, type, opts)

          $this
            .change(function() { chart.draw() })
            .data("peity", chart)
        }

        chart.draw()
      });
    }

    return this;
  };

  var Peity = function($el, type, opts) {
    this.$el = $el
    this.type = type
    this.opts = opts
  }

  var PeityPrototype = Peity.prototype

  PeityPrototype.draw = function() {
    peity.graphers[this.type].call(this, this.opts)
  }

  PeityPrototype.fill = function() {
    var fill = this.opts.fill
    var func = fill

    if (!$.isFunction(func)) {
      func = function(_, i) {
        return fill[i % fill.length]
      }
    }

    return func
  }

  PeityPrototype.prepare = function(width, height) {
    var $svg

    if (this.svg) {
      $svg = $(this.svg).empty()
    } else {
      this.svg = svgElement("svg", {
        "class": "peity"
      })

      this.$el.hide().after(this.svg)

      $svg = $(this.svg).data("peity", this)
    }

    this.svg.setAttribute("height", height)
    this.svg.setAttribute("width", width)

    return $svg
  }

  PeityPrototype.values = function() {
    return $.map(this.$el.text().split(this.opts.delimiter), function(value) {
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
      delimiter: null,
      diameter: 16,
      fill: ["#ff9900", "#fff4dd", "#ffc66e"]
    },
    function(opts) {
      if (!opts.delimiter) {
        var delimiter = this.$el.text().match(/[^0-9\.]/)
        opts.delimiter = delimiter ? delimiter[0] : ","
      }

      var values = this.values()

      if (opts.delimiter == "/") {
        var v1 = values[0]
        var v2 = values[1]
        values = [v1, Math.max(0, v2 - v1)]
      }

      var i = 0
      var length = values.length
      var sum = 0

      for (; i < length; i++) {
        sum += values[i]
      }

      var $svg = this.prepare(
        opts.width || opts.diameter,
        opts.height || opts.diameter
      )

      var width = $svg.width()
        , height = $svg.height()
        , cx = width / 2
        , cy = height / 2

      var radius = Math.min(cx, cy)
      var pi = Math.PI
      var fill = this.fill()
      var start = -pi / 2

      for (i = 0; i < length; i++) {
        var value = values[i]
          , portion = value / sum
          , node

        if (portion == 0) continue

        if (portion == 1) {
          node = svgElement("circle", {
            cx: cx,
            cy: cy,
            r: radius
          })
        } else {
          var slice = portion * pi * 2
            , end = start + slice
            , x1 = radius * Math.cos(start) + cx
            , y1 = radius * Math.sin(start) + cy
            , x2 = radius * Math.cos(end) + cx
            , y2 = radius * Math.sin(end) + cy

          var d = [
            "M", cx, cy,
            "L", x1, y1,
            "A", radius, radius, 0, slice > pi ? 1 : 0, 1, x2, y2,
            "Z"
          ]

          node = svgElement("path", {
            d: d.join(" ")
          })

          start = end
        }

        node.setAttribute("fill", fill.call(this, value, i, values))

        this.svg.appendChild(node)
      }
    }
  )

  peity.register(
    "line",
    {
      delimiter: ",",
      fill: "#c6d9fd",
      height: 16,
      max: null,
      min: 0,
      stroke: "#4d89f9",
      strokeWidth: 1,
      width: 32
    },
    function(opts) {
      var values = this.values()
      if (values.length == 1) values.push(values[0])
      var max = Math.max.apply(Math, values.concat([opts.max]));
      var min = Math.min.apply(Math, values.concat([opts.min]))

      var $svg = this.prepare(opts.width, opts.height)
        , width = $svg.width()
        , height = $svg.height() - opts.strokeWidth
        , xQuotient = width / (values.length - 1)
        , diff = max - min
        , yQuotient = diff == 0 ? height : height / diff
        , zero = height + (min * yQuotient)
        , coords = [0, zero]

      for (var i = 0; i < values.length; i++) {
        var x = i * xQuotient
        var y = height - (yQuotient * (values[i] - min)) + opts.strokeWidth / 2

        coords.push(x, y)
      }

      coords.push(width, zero)

      var polygon = svgElement("polygon", {
        fill: opts.fill,
        points: coords.join(" ")
      })

      this.svg.appendChild(polygon)

      if (opts.strokeWidth) {
        var polyline = svgElement("polyline", {
          fill: "transparent",
          points: coords.slice(2, coords.length - 2).join(" "),
          stroke: opts.stroke,
          "stroke-width": opts.strokeWidth,
          "stroke-linecap": "square"
        })

        this.svg.appendChild(polyline)
      }
    }
  );

  peity.register(
    'bar',
    {
      delimiter: ",",
      fill: ["#4D89F9"],
      gap: 1,
      height: 16,
      max: null,
      min: 0,
      width: 32
    },
    function(opts) {
      var values = this.values()
      var max = Math.max.apply(Math, values.concat([opts.max]));
      var min = Math.min.apply(Math, values.concat([opts.min]))

      var $svg = this.prepare(opts.width, opts.height)
        , width = $svg.width()
        , height = $svg.height()
        , diff = max - min
        , yQuotient = diff == 0 ? 0 : height / diff
        , gap = opts.gap
        , xQuotient = (width + gap) / values.length
        , fill = this.fill()

      for (var i = 0; i < values.length; i++) {
        var value = values[i]
        var y = height - (yQuotient * (value - min))
        var h = yQuotient * value

        if (h == 0) {
          // Always show a bar even if it represents zero.
          h = pixel

          if (min <= 0 && max > 0 || diff == 0) y -= pixel
        } else if (h < 0) {
          y += h
          h = -h
        }

        var rect = svgElement("rect", {
          fill: fill.call(this, value, i, values),
          x: i * xQuotient,
          y: y,
          width: xQuotient - gap,
          height: h
        })

        this.svg.appendChild(rect)
      }
    }
  );
})(jQuery, document, Math);
