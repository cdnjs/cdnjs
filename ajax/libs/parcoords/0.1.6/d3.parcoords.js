d3.parcoords = function(config) {
  var __ = {
    data: [],
    dimensions: [],
    types: {},
    brushed: false,
    mode: "default",
    rate: 10,
    width: 600,
    height: 300,
    margin: { top: 24, right: 0, bottom: 12, left: 0 },
    color: "#069",
    composite: "source-over",
    alpha: "0.7"
  };

  extend(__, config);

  var pc = function(selection) {
    selection = pc.selection = d3.select(selection);

    __.width = selection[0][0].clientWidth;
    __.height = selection[0][0].clientHeight;

    // canvas data layers
    ["extents", "shadows", "marks", "foreground", "highlight"].forEach(function(layer) {
      canvas[layer] = selection
        .append("canvas")
        .attr("class", layer)[0][0];
      ctx[layer] = canvas[layer].getContext("2d");
    });

    // svg tick and brush layers
    pc.svg = selection
      .append("svg")
        .attr("width", __.width)
        .attr("height", __.height)
      .append("svg:g")
        .attr("transform", "translate(" + __.margin.left + "," + __.margin.top + ")");

    return pc;
  };

  var events = d3.dispatch.apply(this,["render", "resize", "highlight", "brush"].concat(d3.keys(__))),
      w = function() { return __.width - __.margin.right - __.margin.left; },
      h = function() { return __.height - __.margin.top - __.margin.bottom },
      flags = {
        brushable: false,
        reorderable: false,
        axes: false,
        interactive: false,
        shadows: false,
        debug: false
      },
      xscale = d3.scale.ordinal(),
      yscale = {},
      dragging = {},
      line = d3.svg.line(),
      axis = d3.svg.axis().orient("left").ticks(5),
      g, // groups for axes, brushes
      ctx = {},
      canvas = {};

  // side effects for setters
  var side_effects = d3.dispatch.apply(this,d3.keys(__))
    .on("composite", function(d) { ctx.foreground.globalCompositeOperation = d.value; })
    .on("alpha", function(d) { ctx.foreground.globalAlpha = d.value; })
    .on("width", function(d) { pc.resize(); })
    .on("height", function(d) { pc.resize(); })
    .on("margin", function(d) { pc.resize(); })
    .on("rate", function(d) { rqueue.rate(d.value); })
    .on("data", function(d) { 
      if (flags.shadows) paths(__.data, ctx.shadows);
    })
    .on("dimensions", function(d) {
      xscale.domain(__.dimensions);
      if (flags.interactive) pc.render().updateAxes();
    });

  pc.toString = function() { return "Parallel Coordinates: " + __.dimensions.length + " dimensions (" + d3.keys(__.data[0]).length + " total) , " + __.data.length + " rows"; };

  // expose the state of the chart
  pc.state = __;
  pc.flags = flags;

  // create getter/setters
  getset(pc, __, events);

  // expose events
  d3.rebind(pc, events, "on");

  // tick formatting
  d3.rebind(pc, axis, "ticks", "orient", "tickValues", "tickSubdivide", "tickSize", "tickPadding", "tickFormat");

  pc.autoscale = function() {
    // xscale
    xscale.rangePoints([0, w()], 1);

    // yscale
    __.dimensions.forEach(function(k) {
      yscale[k] = d3.scale.linear()
        .domain(d3.extent(__.data, function(d) { return +d[k]; }))
        .range([h()+1, 1])
    });

    // canvas sizes 
    pc.selection.selectAll("canvas")
        .style("margin-top", __.margin.top + "px") 
        .style("margin-left", __.margin.left + "px") 
        .attr("width", w()+2)
        .attr("height", h()+2)

    // default styles, needs to be set when canvas width changes
    ctx.foreground.strokeStyle = __.color;
    ctx.foreground.lineWidth = 1.4;
    ctx.foreground.globalCompositeOperation = __.composite;
    ctx.foreground.globalAlpha = __.alpha;
    ctx.highlight.lineWidth = 3;
    ctx.shadows.strokeStyle = "#dadada";
    ctx.extents.strokeStyle = "rgba(140,140,140,0.25)";
    ctx.extents.fillStyle = "rgba(255,255,255,0.4)";

    return this;
  };

  pc.detectDimensions = function() {
    pc.types(d3.parcoords.detectDimensionTypes(__.data));
    pc.dimensions(d3.parcoords.quantitative(__.data));
    return this;
  };

  var rqueue = d3.renderQueue(path_foreground)
    .rate(50)
    .clear(function() { pc.clear('foreground'); });

  pc.render = function() {
    // try to autodetect dimensions and create scales
    if (!__.dimensions.length) pc.detectDimensions();
    if (!(__.dimensions[0] in yscale)) pc.autoscale();

    pc.render[__.mode]();

    events.render.call(this);
    return this;
  };

  pc.render.default = function() {
    pc.clear('foreground');
    if (__.brushed) {
      __.brushed.forEach(path_foreground);
    } else {
      __.data.forEach(path_foreground);
    }
  };

  pc.render.queue = function() {
    if (__.brushed) {
      rqueue(__.brushed);
    } else {
      rqueue(__.data);
    }
  };

  pc.shadows = function() {
    flags.shadows = true;
    if (__.data.length > 0) paths(__.data, ctx.shadows);
    return this;
  };

  pc.axisDots = function() {
    var ctx = pc.ctx.marks;
    ctx.globalAlpha = d3.min([1/Math.pow(data.length, 1/2), 1]);
    __.data.forEach(function(d) {
      __.dimensions.map(function(p,i) {
        ctx.fillRect(position(p)-0.75,yscale[p](d[p])-0.75,1.5,1.5);
      });
    });
    return this;
  };

  pc.clear = function(layer) {
    ctx[layer].clearRect(0,0,w()+2,h()+2);
    return this;
  };

  pc.createAxes = function() {
    if (g) pc.removeAxes(); 

    // Add a group element for each dimension.
    g = pc.svg.selectAll(".dimension")
        .data(__.dimensions, function(d) { return d; })
      .enter().append("svg:g")
        .attr("class", "dimension")
        .attr("transform", function(d) { return "translate(" + xscale(d) + ")"; })

    // Add an axis and title.
    g.append("svg:g")
        .attr("class", "axis")
        .attr("transform", "translate(0,0)")
        .each(function(d) { d3.select(this).call(axis.scale(yscale[d])); })
      .append("svg:text")
        .attr({
          "text-anchor": "middle",
          "y": 0,
          "transform": "translate(0,-12)",
          "x": 0,
          "class": "label"
        })
        .text(String)

    flags.axes= true;
    return this;
  };

  pc.removeAxes = function() {
    g.remove();
    return this;
  };

  pc.updateAxes = function() {
    var g_data = pc.svg.selectAll(".dimension")
        .data(__.dimensions, function(d) { return d; })

    g_data.enter().append("svg:g")
        .attr("class", "dimension")
        .attr("transform", function(p) { return "translate(" + position(p) + ")"; })
        .style("opacity", 0)
        .append("svg:g")
        .attr("class", "axis")
        .attr("transform", "translate(0,0)")
        .each(function(d) { d3.select(this).call(axis.scale(yscale[d])); })
      .append("svg:text")
        .attr({
          "text-anchor": "middle",
          "y": 0,
          "transform": "translate(0,-12)",
          "x": 0,
          "class": "label"
        })
        .text(String);

    g_data.exit().remove();

    g = pc.svg.selectAll(".dimension");

    g.transition().duration(1100)
      .attr("transform", function(p) { return "translate(" + position(p) + ")"; })
      .style("opacity", 1)
   if (flags.shadows) paths(__.data, ctx.shadows);
    return this;
  };

  pc.brushable = function() {
    if (!g) pc.createAxes(); 

    // Add and store a brush for each axis.
    g.append("svg:g")
        .attr("class", "brush")
        .each(function(d) {
          d3.select(this).call(
            yscale[d].brush = d3.svg.brush()
              .y(yscale[d])
              .on("brush", pc.brush)
          );
        })
      .selectAll("rect")
        .style("visibility", null)
        .attr("x", -15)
        .attr("width", 30)
    flags.brushable = true;
    return this;
  };

  // Jason Davies, http://bl.ocks.org/1341281
  pc.reorderable = function() {
    if (!g) pc.createAxes(); 

    g.style("cursor", "move")
      .call(d3.behavior.drag()
        .on("dragstart", function(d) {
          dragging[d] = this.__origin__ = xscale(d);
        })
        .on("drag", function(d) {
          dragging[d] = Math.min(w(), Math.max(0, this.__origin__ += d3.event.dx));
          __.dimensions.sort(function(a, b) { return position(a) - position(b); });
          xscale.domain(__.dimensions);
          pc.render();
          g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
        })
        .on("dragend", function(d) {
          delete this.__origin__;
          delete dragging[d];
          d3.select(this).transition().attr("transform", "translate(" + xscale(d) + ")");
          pc.render();
        }));
    flags.reorderable = true;
    return this;
  };

  pc.interactive = function() {
    flags.interactive = true;
    return this;
  };

  // Get data within brushes
  pc.brush = function() {
    __.brushed = selected();  
    pc.render();
    //extent_area();
    events.brush.call(pc,__.brushed);
  };

  // expose a few objects
  pc.xscale = xscale;
  pc.yscale = yscale;
  pc.ctx = ctx;
  pc.canvas = canvas;
  pc.g = function() { return g; };

  // TODO
  pc.brushReset = function(dimension) {
    yscale[dimension].brush.clear()(
      pc.g()
        .filter(function(p) {
          return dimension == p;
        })
    )
    return this;
  };

  // rescale for height, width and margins
  pc.resize = function() {
    // selection size
    pc.selection.select("svg") 
      .attr("width", __.width)
      .attr("height", __.height)
    pc.svg.attr("transform", "translate(" + __.margin.left + "," + __.margin.top + ")");

    // scales
    pc.autoscale();

    // axes
    if (g) {
      g.attr("transform", function(d) { return "translate(" + xscale(d) + ")"; })
      g.selectAll("g.axis").each(function(d) { d3.select(this).call(axis.scale(yscale[d])); })
    };
 
    pc.render();
    events.resize.call(this, {width: __.width, height: __.height, margin: __.margin});
    return this;
  };

  // highlight an array of data
  pc.highlight = function(data) {
    pc.clear("highlight");
    d3.select(canvas.foreground).classed("faded", true);
    data.forEach(path_highlight);
    events.highlight.call(this,data);
    return this;
  };

  // clear highlighting
  pc.unhighlight = function(data) {
    pc.clear("highlight");
    d3.select(canvas.foreground).classed("faded", false);
    return this;
  };

  // draw single polyline
  function color_path(d, ctx) {
    ctx.strokeStyle = d3.functor(__.color)(d);
    ctx.beginPath();
    __.dimensions.map(function(p,i) {
      if (i == 0) {
        ctx.moveTo(position(p),yscale[p](d[p]));
      } else { 
        ctx.lineTo(position(p),yscale[p](d[p]));
      }
    });
    ctx.stroke();
  };

  // draw many polylines of the same color
  function paths(data, ctx) {
    ctx.clearRect(-1,-1,w()+2,h()+2);
    ctx.beginPath();
    data.forEach(function(d) {
      __.dimensions.map(function(p,i) {
        if (i == 0) {
          ctx.moveTo(position(p),yscale[p](d[p]));
        } else { 
          ctx.lineTo(position(p),yscale[p](d[p]));
        }
      });
    });
    ctx.stroke();
  };

  function extent_area() {
    pc.clear('extents');

    // no active brushes
    var actives = __.dimensions.filter(is_brushed);
    if (actives.length == 0) return;

    // create envelope
    var ctx = pc.ctx.extents;
    ctx.beginPath();
    __.dimensions.map(function(p,i) {
      if (i == 0) {
        ctx.moveTo(xscale(p), brush_max(p));
      } else { 
        ctx.lineTo(xscale(p), brush_max(p));
      }
    });
    __.dimensions.reverse().map(function(p,i) {
      ctx.lineTo(xscale(p), brush_min(p));
    });
    ctx.fill();
    ctx.stroke();
  };

  function is_brushed(p) { 
    return !yscale[p].brush.empty();
  };

  function brush_max(p) {
    return is_brushed(p) ? yscale[p](yscale[p].brush.extent()[1]) : 0;
  };

  function brush_min(p) {
    return is_brushed(p) ? yscale[p](yscale[p].brush.extent()[0]) : h();
  };

  function position(d) {
    var v = dragging[d];
    return v == null ? xscale(d) : v;
  }

  // data within extents
  function selected() {
    var actives = __.dimensions.filter(is_brushed),
        extents = actives.map(function(p) { return yscale[p].brush.extent(); });

    return __.data
      .filter(function(d) {
        return actives.every(function(p, dimension) {
          return extents[dimension][0] <= d[p] && d[p] <= extents[dimension][1];
        });
      });
  };

  function path_foreground(d) {
    return color_path(d, ctx.foreground);
  };

  function path_highlight(d) {
    return color_path(d, ctx.highlight);
  };

  // getter/setter with event firing
  function getset(obj,state,events)  {
    d3.keys(state).forEach(function(key) {   
      obj[key] = function(x) {
        if (!arguments.length) return state[key];
        var old = state[key];
        state[key] = x;
        side_effects[key].call(pc,{"value": x, "previous": old});
        events[key].call(pc,{"value": x, "previous": old});
        return obj;
      };
    });
  };

  function extend(target, source) {
    for (key in source) {
      target[key] = source[key];
    }
    return target;
  };

  return pc;
};

d3.parcoords.version = "0.1.6";

// quantitative dimensions based on numerical or null values in the first row
d3.parcoords.quantitative = function(data) {
  return d3.keys(data[0])
    .filter(function(col) {
      var v = data[0][col];
      return (parseFloat(v) == v) && (v != null);
    });
};

// a better "typeof" from this post: http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable
d3.parcoords.toType = function(v) {
  return ({}).toString.call(v).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
};

// try to coerce to number before returning type
d3.parcoords.toTypeCoerceNumbers = function(v) {
  if ((parseFloat(v) == v) && (v != null)) return "number";
  return d3.parcoords.toType(v);
};

// attempt to determine types of each dimension based on first row of data
d3.parcoords.detectDimensionTypes = function(data) {
  var types = {}
  d3.keys(data[0])
    .forEach(function(col) {
      types[col] = d3.parcoords.toTypeCoerceNumbers(data[0][col]);
    });
  return types;
};

// pairs of adjacent dimensions
d3.parcoords.adjacent_pairs = function(arr) {
  var ret = [];
  for (var i = 0; i < arr.length-1; i++) {
    ret.push([arr[i],arr[i+1]]);
  };
  return ret;
};

d3.renderQueue = (function(func) {
  var _queue = [],                  // data to be rendered
      _rate = 10,                 // number of calls per frame
      _invalidate = function() {},  // invalidate last render queue
      _clear = function() {};       // clearing function

  var rq = function(data) {
    if (data) rq.data(data);
    _invalidate();
    _clear();
    rq.render();
  };

  rq.render = function() {
    var valid = true;
    _invalidate = rq.invalidate = function() {
      valid = false;
    };

    function doFrame() {
      if (!valid) return true;
      if (!_queue.length) return true;
      var chunk = _queue.splice(0,_rate);
      chunk.map(func);
      timer_frame(doFrame);
    }

    doFrame();
  };

  rq.data = function(data) {
    _invalidate();
    _queue = data.slice(0);
    return rq;
  };

  rq.add = function(data) {
    _queue = _queue.concat(data);
  };

  rq.rate = function(value) {
    if (!arguments.length) return _rate;
    _rate = value;
    return rq;
  };

  rq.remaining = function() {
    return _queue.length;
  };

  // clear the canvas
  rq.clear = function(func) {
    if (!arguments.length) {
      _clear();
      return rq;
    }
    _clear = func;
    return rq;
  };

  rq.invalidate = _invalidate;

  var timer_frame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(callback) { setTimeout(callback, 17); };

  return rq;
});
