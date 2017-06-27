// Peity jQuery plugin version 0.3.3
// (c) 2010 Ben Pickles
//
// http://benpickles.github.com/peity/
//
// Released under MIT license.
(function($, document) {
  var peity = $.fn.peity = function(type, options) {
    if (document.createElement("canvas").getContext) {
      this.each(function() {
        $(this).change(function() {
          var value = $(this).html();
          peity.graphers[type]($(this), $.extend({}, peity.defaults[type], options));
          $(this).trigger("chart:changed", value);
        }).trigger("change");
      });
    }

    return this;
  };

  peity.graphers = {};
  peity.defaults = {};

  peity.add = function(type, defaults, grapher){
    peity.graphers[type] = grapher;
    peity.defaults[type] = defaults;
  };

  function createCanvas(width, height) {
    var canvas = document.createElement("canvas")
    canvas.setAttribute("width", width)
    canvas.setAttribute("height", height)
    return canvas
  }

  peity.add(
    'pie',
    {
      colours: ['#FFF4DD', '#FF9900'],
      delimeter: '/',
      radius: 16
    },
    function($this, opts) {
      var centre = opts.radius / 2;
      var values = $this.text().split(opts.delimeter)
      var v1 = parseFloat(values[0]);
      var v2 = parseFloat(values[1]);
      var adjust = -Math.PI / 2;
      var slice = (v1 / v2) * Math.PI * 2;

      var elem = createCanvas(opts.radius, opts.radius)
      var canvas = elem.getContext("2d");

      // Plate.
      canvas.beginPath();
      canvas.moveTo(centre, centre);
      canvas.arc(centre, centre, centre, 0, Math.PI * 2, false);
      canvas.fillStyle = opts.colours[0];
      canvas.fill();

      // Slice of pie.
      canvas.beginPath();
      canvas.moveTo(centre, centre);
      canvas.arc(centre, centre, centre, adjust, slice + adjust, false);
      canvas.fillStyle = opts.colours[1];
      canvas.fill();

      $this.wrapInner($("<span>").hide()).append(elem)
  });

  peity.add(
    "line",
    {
      colour: "#c6d9fd",
      strokeColour: "#4d89f9",
      strokeWidth: 1,
      delimeter: ",",
      height: 16,
      max: null,
      width: 32
    },
    function($this, opts) {
      var elem = createCanvas(opts.width, opts.height)
      var values = $this.text().split(opts.delimeter)
      var max = Math.max.apply(Math, values.concat([opts.max]));
      var ratio = opts.height / max;
      var width = opts.width / (values.length - 1);
      var coords = [];
      var i;

      var canvas = elem.getContext("2d");
      canvas.beginPath();
      canvas.moveTo(0, opts.height);

      for (i = 0; i < values.length; i++) {
        var height = ratio * values[i];
        var x = i * width;
        var y = opts.height - height;
        coords.push({ x: x, y: y });
        canvas.lineTo(x, y);
      }

      canvas.lineTo(opts.width, opts.height);
      canvas.fillStyle = opts.colour;
      canvas.fill();

      canvas.beginPath();
      canvas.moveTo(0, coords[0].y);
      for (i = 0; i < coords.length; i++) {
        canvas.lineTo(coords[i].x, coords[i].y);
      }
      canvas.lineWidth = opts.strokeWidth;
      canvas.strokeStyle = opts.strokeColour;
      canvas.stroke();

      $this.wrapInner($("<span>").hide()).append(elem)
    }
  );

  peity.add(
    'bar',
    {
      colour: "#4D89F9",
      delimeter: ",",
      height: 16,
      max: null,
      width: 32
    },
    function($this, opts) {
      var elem = createCanvas(opts.width, opts.height)
      var values = $this.text().split(opts.delimeter)
      var max = Math.max.apply(Math, values.concat([opts.max]));
      var ratio = opts.height / max;
      var width = opts.width / values.length;

      var canvas = elem.getContext("2d");
      canvas.fillStyle = opts.colour;

      for (var i = 0; i < values.length; i++) {
        var height = ratio * values[i];
        var x = i * width;
        var y = opts.height - height;

        canvas.fillRect(x, y, width, height);
      }

      $this.wrapInner($("<span>").hide()).append(elem)
    }
  );
})(jQuery, document);
