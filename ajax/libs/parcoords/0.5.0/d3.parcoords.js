d3.parcoords = function(config) {
  var __ = {
    data: [],
    dimensions: [],
    dimensionTitles: {},
    types: {},
    brushed: false,
    mode: "default",
    rate: 20,
    width: 600,
    height: 300,
    margin: { top: 24, right: 0, bottom: 12, left: 0 },
    color: "#069",
    composite: "source-over",
    alpha: 0.7,
    bundlingStrength: 0.5,
    bundleDimension: null,
    smoothness: 0.25,
    showControlPoints: false,
    hideAxis : []
  };

  extend(__, config);
var pc = function(selection) {
  selection = pc.selection = d3.select(selection);

  __.width = selection[0][0].clientWidth;
  __.height = selection[0][0].clientHeight;

  // canvas data layers
  ["shadows", "marks", "foreground", "highlight"].forEach(function(layer) {
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
var events = d3.dispatch.apply(this,["render", "resize", "highlight", "brush", "brushend", "axesreorder"].concat(d3.keys(__))),
    w = function() { return __.width - __.margin.right - __.margin.left; },
    h = function() { return __.height - __.margin.top - __.margin.bottom; },
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
    canvas = {},
    clusterCentroids = [];

// side effects for setters
var side_effects = d3.dispatch.apply(this,d3.keys(__))
  .on("composite", function(d) { ctx.foreground.globalCompositeOperation = d.value; })
  .on("alpha", function(d) { ctx.foreground.globalAlpha = d.value; })
  .on("width", function(d) { pc.resize(); })
  .on("height", function(d) { pc.resize(); })
  .on("margin", function(d) { pc.resize(); })
  .on("rate", function(d) { rqueue.rate(d.value); })
  .on("data", function(d) {
    if (flags.shadows){paths(__.data, ctx.shadows);}
  })
  .on("dimensions", function(d) {
    xscale.domain(__.dimensions);
    if (flags.interactive){pc.render().updateAxes();}
  })
  .on("bundleDimension", function(d) {
	  if (!__.dimensions.length) pc.detectDimensions();
	  if (!(__.dimensions[0] in yscale)) pc.autoscale();
	  if (typeof d.value === "number") {
		  if (d.value < __.dimensions.length) {
			  __.bundleDimension = __.dimensions[d.value];
		  } else if (d.value < __.hideAxis.length) {
			  __.bundleDimension = __.hideAxis[d.value];
		  }
	  } else {
		  __.bundleDimension = d.value;
	  }

	  __.clusterCentroids = compute_cluster_centroids(__.bundleDimension);
  })
  .on("hideAxis", function(d) {
	  if (!__.dimensions.length) pc.detectDimensions();
	  pc.dimensions(without(__.dimensions, d.value));
  });

// expose the state of the chart
pc.state = __;
pc.flags = flags;

// create getter/setters
getset(pc, __, events);

// expose events
d3.rebind(pc, events, "on");

// tick formatting
d3.rebind(pc, axis, "ticks", "orient", "tickValues", "tickSubdivide", "tickSize", "tickPadding", "tickFormat");

// getter/setter with event firing
function getset(obj,state,events)  {
  d3.keys(state).forEach(function(key) {
    obj[key] = function(x) {
      if (!arguments.length) {
		return state[key];
	}
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

function without(arr, item) {
  return arr.filter(function(elem) { return item.indexOf(elem) === -1; })
};
pc.autoscale = function() {
  // yscale
  var defaultScales = {
    "date": function(k) {
      return d3.time.scale()
        .domain(d3.extent(__.data, function(d) {
          return d[k] ? d[k].getTime() : null;
        }))
        .range([h()+1, 1]);
    },
    "number": function(k) {
      return d3.scale.linear()
        .domain(d3.extent(__.data, function(d) { return +d[k]; }))
        .range([h()+1, 1]);
    },
    "string": function(k) {
      return d3.scale.ordinal()
        .domain(__.data.map(function(p) { return p[k]; }))
        .rangePoints([h()+1, 1]);
    }
  };

  __.dimensions.forEach(function(k) {
    yscale[k] = defaultScales[__.types[k]](k);
  });

  __.hideAxis.forEach(function(k) {
    yscale[k] = defaultScales[__.types[k]](k);
  });

  // hack to remove ordinal dimensions with many values
  pc.dimensions(pc.dimensions().filter(function(p,i) {
    var uniques = yscale[p].domain().length;
    if (__.types[p] == "string" && (uniques > 60 || uniques < 2)) {
      return false;
    }
    return true;
  }));

  // xscale
  xscale.rangePoints([0, w()], 1);

  // canvas sizes
  pc.selection.selectAll("canvas")
      .style("margin-top", __.margin.top + "px")
      .style("margin-left", __.margin.left + "px")
      .attr("width", w()+2)
      .attr("height", h()+2);

  // default styles, needs to be set when canvas width changes
  ctx.foreground.strokeStyle = __.color;
  ctx.foreground.lineWidth = 1.4;
  ctx.foreground.globalCompositeOperation = __.composite;
  ctx.foreground.globalAlpha = __.alpha;
  ctx.highlight.lineWidth = 3;
  ctx.shadows.strokeStyle = "#dadada";

  return this;
};

pc.scale = function(d, domain) {
	yscale[d].domain(domain);

	return this;
};

pc.flip = function(d) {
	//yscale[d].domain().reverse();					// does not work
	yscale[d].domain(yscale[d].domain().reverse()); // works

	return this;
};

pc.commonScale = function(global, type) {
	var t = type || "number";
	if (typeof global === 'undefined') {
		global = true;
	}

	// scales of the same type
	var scales = __.dimensions.concat(__.hideAxis).filter(function(p) {
		return __.types[p] == t;
	});

	if (global) {
		var extent = d3.extent(scales.map(function(p,i) {
				return yscale[p].domain();
			}).reduce(function(a,b) {
				return a.concat(b);
			}));

		scales.forEach(function(d) {
			yscale[d].domain(extent);
		});

	} else {
		scales.forEach(function(k) {
			yscale[k].domain(d3.extent(__.data, function(d) { return +d[k]; }));
		});
	}

	// update centroids
	if (__.bundleDimension !== null) {
		pc.bundleDimension(__.bundleDimension);
	}

	return this;
};pc.detectDimensions = function() {
  pc.types(pc.detectDimensionTypes(__.data));
  pc.dimensions(d3.keys(pc.types()));
  return this;
};

// a better "typeof" from this post: http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable
pc.toType = function(v) {
  return ({}).toString.call(v).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};

// try to coerce to number before returning type
pc.toTypeCoerceNumbers = function(v) {
  if ((parseFloat(v) == v) && (v != null)) {
	return "number";
}
  return pc.toType(v);
};

// attempt to determine types of each dimension based on first row of data
pc.detectDimensionTypes = function(data) {
  var types = {};
  d3.keys(data[0])
    .forEach(function(col) {
      types[col] = pc.toTypeCoerceNumbers(data[0][col]);
    });
  return types;
};
pc.render = function() {
  // try to autodetect dimensions and create scales
  if (!__.dimensions.length) pc.detectDimensions();
  if (!(__.dimensions[0] in yscale)) pc.autoscale();

  pc.render[__.mode]();

  events.render.call(this);
  return this;
};

pc.render['default'] = function() {
  pc.clear('foreground');
  if (__.brushed) {
    __.brushed.forEach(path_foreground);
  } else {
    __.data.forEach(path_foreground);
  }
};

var rqueue = d3.renderQueue(path_foreground)
  .rate(50)
  .clear(function() { pc.clear('foreground'); });

pc.render.queue = function() {
  if (__.brushed) {
    rqueue(__.brushed);
  } else {
    rqueue(__.data);
  }
};
function compute_cluster_centroids(d) {

	var clusterCentroids = d3.map();
	var clusterCounts = d3.map();
	// determine clusterCounts
	__.data.forEach(function(row) {
		var scaled = yscale[d](row[d]);
		if (!clusterCounts.has(scaled)) {
			clusterCounts.set(scaled, 0);
		}
		var count = clusterCounts.get(scaled);
		clusterCounts.set(scaled, count + 1);
	});

	__.data.forEach(function(row) {
		__.dimensions.map(function(p, i) {
			var scaled = yscale[d](row[d]);
			if (!clusterCentroids.has(scaled)) {
				var map = d3.map();
				clusterCentroids.set(scaled, map);
			}
			if (!clusterCentroids.get(scaled).has(p)) {
				clusterCentroids.get(scaled).set(p, 0);
			}
			var value = clusterCentroids.get(scaled).get(p);
			value += yscale[p](row[p]) / clusterCounts.get(scaled);
			clusterCentroids.get(scaled).set(p, value);
		});
	});

	return clusterCentroids;

}

function compute_centroids(row) {
	var centroids = [];

	var p = __.dimensions;
	var cols = p.length;
	var a = 0.5;			// center between axes
	for (var i = 0; i < cols; ++i) {
		// centroids on 'real' axes
		var x = position(p[i]);
		var y = yscale[p[i]](row[p[i]]);
		centroids.push($V([x, y]));

		// centroids on 'virtual' axes
		if (i < cols - 1) {
			var cx = x + a * (position(p[i+1]) - x);
			var cy = y + a * (yscale[p[i+1]](row[p[i+1]]) - y);
			if (__.bundleDimension !== null) {
				var leftCentroid = __.clusterCentroids.get(yscale[__.bundleDimension](row[__.bundleDimension])).get(p[i]);
				var rightCentroid = __.clusterCentroids.get(yscale[__.bundleDimension](row[__.bundleDimension])).get(p[i+1]);
				var centroid = 0.5 * (leftCentroid + rightCentroid);
				cy = centroid + (1 - __.bundlingStrength) * (cy - centroid);
			}
			centroids.push($V([cx, cy]));
		}
	}

	return centroids;
}

function compute_control_points(centroids) {

	var cols = centroids.length;
	var a = __.smoothness;
	var cps = [];

	cps.push(centroids[0]);
	cps.push($V([centroids[0].e(1) + a*2*(centroids[1].e(1)-centroids[0].e(1)), centroids[0].e(2)]));
	for (var col = 1; col < cols - 1; ++col) {
		var mid = centroids[col];
		var left = centroids[col - 1];
		var right = centroids[col + 1];

		var diff = left.subtract(right);
		cps.push(mid.add(diff.x(a)));
		cps.push(mid);
		cps.push(mid.subtract(diff.x(a)));
	}
	cps.push($V([centroids[cols-1].e(1) + a*2*(centroids[cols-2].e(1)-centroids[cols-1].e(1)), centroids[cols-1].e(2)]));
	cps.push(centroids[cols - 1]);

	return cps;

};pc.shadows = function() {
	flags.shadows = true;
	if (__.data.length > 0) {
		paths(__.data, ctx.shadows);
	}
	return this;
};

// draw little dots on the axis line where data intersects
pc.axisDots = function() {
	var ctx = pc.ctx.marks;
	ctx.globalAlpha = d3.min([ 1 / Math.pow(data.length, 1 / 2), 1 ]);
	__.data.forEach(function(d) {
		__.dimensions.map(function(p, i) {
			ctx.fillRect(position(p) - 0.75, yscale[p](d[p]) - 0.75, 1.5, 1.5);
		});
	});
	return this;
};

// draw single cubic bezier curve
function single_curve(d, ctx) {

	var centroids = compute_centroids(d);
	var cps = compute_control_points(centroids);

	ctx.moveTo(cps[0].e(1), cps[0].e(2));
	for (var i = 1; i < cps.length; i += 3) {
		if (__.showControlPoints) {
			for (var j = 0; j < 3; j++) {
				ctx.fillRect(cps[i+j].e(1), cps[i+j].e(2), 2, 2);
			}
		}
		ctx.bezierCurveTo(cps[i].e(1), cps[i].e(2), cps[i+1].e(1), cps[i+1].e(2), cps[i+2].e(1), cps[i+2].e(2));
	}
};

// draw single polyline
function color_path(d, i, ctx) {
	ctx.strokeStyle = d3.functor(__.color)(d, i);
	ctx.beginPath();
	if (__.bundleDimension === null || (__.bundlingStrength === 0 && __.smoothness == 0)) {
		single_path(d, ctx);
	} else {
		single_curve(d, ctx);
	}
	ctx.stroke();
};

// draw many polylines of the same color
function paths(data, ctx) {
	ctx.clearRect(-1, -1, w() + 2, h() + 2);
	ctx.beginPath();
	data.forEach(function(d) {
		if (__.bundleDimension === null || (__.bundlingStrength === 0 && __.smoothness == 0)) {
			single_path(d, ctx);
		} else {
			single_curve(d, ctx);
		}
	});
	ctx.stroke();
};

function single_path(d, ctx) {
	__.dimensions.map(function(p, i) {
		if (i == 0) {
			ctx.moveTo(position(p), yscale[p](d[p]));
		} else {
			ctx.lineTo(position(p), yscale[p](d[p]));
		}
	});
}

function path_foreground(d, i) {
	return color_path(d, i, ctx.foreground);
};

function path_highlight(d, i) {
	return color_path(d, i, ctx.highlight);
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
      .attr("transform", function(d) { return "translate(" + xscale(d) + ")"; });

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
      .text(function(d) {
        return d in __.dimensionTitles ? __.dimensionTitles[d] : d;  // dimension display names
      });

  flags.axes= true;
  return this;
};

pc.removeAxes = function() {
  g.remove();
  return this;
};

pc.updateAxes = function() {
  var g_data = pc.svg.selectAll(".dimension")
      .data(__.dimensions, function(d) { return d; });

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
    .style("opacity", 1);

  pc.svg.selectAll(".axis").transition().duration(1100)
  	.each(function(d) { d3.select(this).call(axis.scale(yscale[d])); });

  if (flags.shadows) paths(__.data, ctx.shadows);
  if (flags.brushable) pc.brushable();
  if (flags.reorderable) pc.reorderable();
  return this;
};

// Jason Davies, http://bl.ocks.org/1341281
pc.reorderable = function() {
  if (!g) pc.createAxes();

  // Keep track of the order of the axes to verify if the order has actually
  // changed after a drag ends. Changed order might have consequence (e.g.
  // strums that need to be reset).
  var dimsAtDragstart;

  g.style("cursor", "move")
    .call(d3.behavior.drag()
      .on("dragstart", function(d) {
        dragging[d] = this.__origin__ = xscale(d);
        dimsAtDragstart = __.dimensions.slice();
      })
      .on("drag", function(d) {
        dragging[d] = Math.min(w(), Math.max(0, this.__origin__ += d3.event.dx));
        __.dimensions.sort(function(a, b) { return position(a) - position(b); });
        xscale.domain(__.dimensions);
        pc.render();
        g.attr("transform", function(d) { return "translate(" + position(d) + ")"; });
      })
      .on("dragend", function(d) {
        // Let's see if the order has changed and send out an event if so.
        var orderChanged = dimsAtDragstart.some(function(d, i) {
          return d !== __.dimensions[i];
        });

        if (orderChanged) {
          events.axesreorder.call(pc, __.dimensions);
        }

        delete this.__origin__;
        delete dragging[d];
        d3.select(this).transition().attr("transform", "translate(" + xscale(d) + ")");
        pc.render();
      }));
  flags.reorderable = true;
  return this;
};

// pairs of adjacent dimensions
pc.adjacent_pairs = function(arr) {
  var ret = [];
  for (var i = 0; i < arr.length-1; i++) {
    ret.push([arr[i],arr[i+1]]);
  };
  return ret;
};

var brush = {
  modes: {
    "None": {
      install: function(pc) {},           // Nothing to be done.
      uninstall: function(pc) {},         // Nothing to be done.
      selected: function() { return []; } // Nothing to return
    }
  },
  mode: "None",
  predicate: "AND",
  currentMode: function() {
    return this.modes[this.mode];
  }
};

// This function can be used for 'live' updates of brushes. That is, during the
// specification of a brush, this method can be called to update the view.
//
// @param newSelection - The new set of data items that is currently contained
//                       by the brushes
function brushUpdated(newSelection) {
  __.brushed = newSelection;
  events.brush.call(pc,__.brushed);
  pc.render();
}

function brushPredicate(predicate) {
  if (!arguments.length) { return brush.predicate; }

  predicate = String(predicate).toUpperCase();
  if (predicate !== "AND" && predicate !== "OR") {
    throw "Invalid predicate " + predicate;
  }

  brush.predicate = predicate;
  __.brushed = brush.currentMode().selected();
  pc.render();
  return pc;
}

pc.brushModes = function() {
  return Object.getOwnPropertyNames(brush.modes);
};

pc.brushMode = function(mode) {
  if (arguments.length === 0) {
    return brush.mode;
  }

  if (pc.brushModes().indexOf(mode) === -1) {
    throw "pc.brushmode: Unsupported brush mode: " + mode;
  }

  // Make sure that we don't trigger unnecessary events by checking if the mode
  // actually changes.
  if (mode !== brush.mode) {
    // When changing brush modes, the first thing we need to do is clearing any
    // brushes from the current mode, if any.
    if (brush.mode !== "None") {
      pc.brushReset();
    }

    // Next, we need to 'uninstall' the current brushMode.
    brush.modes[brush.mode].uninstall(pc);
    // Finally, we can install the requested one.
    brush.mode = mode;
    brush.modes[brush.mode].install();
    if (mode === "None") {
      delete pc.brushPredicate;
    } else {
      pc.brushPredicate = brushPredicate;
    }
  }

  return pc;
};

// brush mode: 1D-Axes

(function() {
  var brushes = {};

  function is_brushed(p) {
    return !brushes[p].empty();
  }

  // data within extents
  function selected() {
    var actives = __.dimensions.filter(is_brushed),
        extents = actives.map(function(p) { return brushes[p].extent(); });

    // We don't want to return the full data set when there are no axes brushed.
    // Actually, when there are no axes brushed, by definition, no items are
    // selected. So, let's avoid the filtering and just return false.
    //if (actives.length === 0) return false;

    // Resolves broken examples for now. They expect to get the full dataset back from empty brushes
    if (actives.length === 0) return __.data;

    // test if within range
    var within = {
      "date": function(d,p,dimension) {
        return extents[dimension][0] <= d[p] && d[p] <= extents[dimension][1]
      },
      "number": function(d,p,dimension) {
        return extents[dimension][0] <= d[p] && d[p] <= extents[dimension][1]
      },
      "string": function(d,p,dimension) {
        return extents[dimension][0] <= yscale[p](d[p]) && yscale[p](d[p]) <= extents[dimension][1]
      }
    };

    return __.data
      .filter(function(d) {
        switch(brush.predicate) {
        case "AND":
          return actives.every(function(p, dimension) {
            return within[__.types[p]](d,p,dimension);
          });
        case "OR":
          return actives.some(function(p, dimension) {
            return within[__.types[p]](d,p,dimension);
          });
        default:
          throw "Unknown brush predicate " + __.brushPredicate;
        }
      });
  };

  function brushExtents() {
    var extents = {};
    __.dimensions.forEach(function(d) {
      var brush = brushes[d];
      if (!brush.empty()) {
        var extent = brush.extent();
        extent.sort(d3.ascending);
        extents[d] = extent;
      }
    });
    return extents;
  }

  function brushFor(axis) {
    var brush = d3.svg.brush();

    brush
      .y(yscale[axis])
      .on("brushstart", function() { d3.event.sourceEvent.stopPropagation() })
      .on("brush", function() {
        brushUpdated(selected());
      })
      .on("brushend", function() {
        events.brushend.call(pc, __.brushed);
      });

    brushes[axis] = brush;
    return brush;
  }

  function brushReset(dimension) {
    __.brushed = false;
    if (g) {
      g.selectAll('.brush')
        .each(function(d) {
          d3.select(this).call(
            brushes[d].clear()
          );
        });
      pc.render();
    }
    return this;
  };

  function install() {
    if (!g) pc.createAxes();

    // Add and store a brush for each axis.
    g.append("svg:g")
      .attr("class", "brush")
      .each(function(d) {
        d3.select(this).call(brushFor(d));
      })
      .selectAll("rect")
        .style("visibility", null)
        .attr("x", -15)
        .attr("width", 30);

    pc.brushExtents = brushExtents;
    pc.brushReset = brushReset;
    return pc;
  }

  brush.modes["1D-axes"] = {
    install: install,
    uninstall: function() {
      g.selectAll(".brush").remove();
      brushes = {};
      delete pc.brushExtents;
      delete pc.brushReset;
    },
    selected: selected
  }
})();
// brush mode: 2D-strums
// bl.ocks.org/syntagmatic/5441022

(function() {
  var strums = {},
      strumCanvas;

  function drawStrum(strum) {
    var svg = pc.selection.select("svg").select("g#strums"),
        id = strum.dims.i;

    var line = svg.selectAll("line#strum-" + id)
      .data([strum]);

    line.enter()
      .append("line")
      .attr("id", "strum-" + id)
      .attr("class", "strum");

    line
      .attr("x1", function(d) { return d.p1[0]; })
      .attr("y1", function(d) { return d.p1[1]; })
      .attr("x2", function(d) { return d.p2[0]; })
      .attr("y2", function(d) { return d.p2[1]; })
      .attr("stroke", "black")
      .attr("stroke-width", 2);
  }

  function dimensionsForPoint(p) {
    var dims = { i: -1, left: undefined, right: undefined };
    __.dimensions.some(function(dim, i) {
      if (xscale(dim) < p[0]) {
        var next = __.dimensions[i + 1];
        dims.i = i;
        dims.left = dim;
        dims.right = next;
        return false;
      }
      return true;
    });

    if (dims.left === undefined) {
      // Event on the left side of the first axis.
      dims.i = 0;
      dims.left = __.dimensions[0];
      dims.right = __.dimensions[1];
    } else if (dims.right === undefined) {
      // Event on the right side of the last axis
      dims.i = __.dimensions.length - 1;
      dims.right = dims.left;
      dims.left = __.dimensions[__.dimensions.length - 2];
    }

    return dims;
  }

  function onDragStart() {
    // First we need to determine between which two axes the sturm was started.
    // This will determine the freedom of movement, because a strum can
    // logically only happen between two axes, so no movement outside these axes
    // should be allowed.
    return function() {
      var p = d3.mouse(strumCanvas),
          dims = dimensionsForPoint(p),
          strum = {
            p1: p,
            dims: dims,
            minX: xscale(dims.left),
            maxX: xscale(dims.right)
          };

      strums[dims.i] = strum;
      strums.active = dims.i;

      // Make sure that the point is within the bounds
      strum.p1[0] = Math.min(Math.max(strum.minX, p[0]), strum.maxX);
      strum.p1[1] = p[1];
      strum.p2 = strum.p1.slice();
    };
  }

  function onDrag() {
    return function() {
      var ev = d3.event,
          strum = strums[strums.active];

      // Make sure that the point is within the bounds
      strum.p2[0] = Math.min(Math.max(strum.minX + 1, ev.x), strum.maxX);
      strum.p2[1] = ev.y - __.margin.top;
      drawStrum(strum);
    };
  }

  function containmentTest(strum, width) {
    var p1 = [strum.p1[0] - strum.minX, strum.p1[1] - strum.minX],
        p2 = [strum.p2[0] - strum.minX, strum.p2[1] - strum.minX],
        m1 = 1 - width / p1[0],
        b1 = p1[1] * (1 - m1),
        m2 = 1 - width / p2[0],
        b2 = p2[1] * (1 - m2);

    // test if point falls between lines
    return function(p) {
      var x = p[0],
          y = p[1],
          y1 = m1 * x + b1,
          y2 = m2 * x + b2;

      if (y > Math.min(y1, y2) && y < Math.max(y1, y2)) {
        return true;
      }

      return false;
    };
  }

  function selected() {
    var ids = Object.getOwnPropertyNames(strums),
        brushed = __.data;

    // Get the ids of the currently active strums.
    ids = ids.filter(function(d) {
      return !isNaN(d);
    });

    function crossesStrum(d, id) {
      var strum = strums[id],
          test = containmentTest(strum, strums.width(id)),
          d1 = strum.dims.left,
          d2 = strum.dims.right,
          y1 = yscale[d1],
          y2 = yscale[d2],
          point = [y1(d[d1]) - strum.minX, y2(d[d2]) - strum.minX];
      return test(point);
    }

    if (ids.length === 0) { return brushed; }

    return brushed.filter(function(d) {
      switch(brush.predicate) {
      case "AND":
        return ids.every(function(id) { return crossesStrum(d, id); });
      case "OR":
        return ids.some(function(id) { return crossesStrum(d, id); });
      default:
        throw "Unknown brush predicate " + __.brushPredicate;
      }
    });
  }

  function removeStrum() {
    var strum = strums[strums.active],
        svg = pc.selection.select("svg").select("g#strums");

    delete strums[strums.active];
    strums.active = undefined;
    svg.selectAll("line#strum-" + strum.dims.i).remove();
  }

  function onDragEnd() {
    return function() {
      var brushed = __.data,
          strum = strums[strums.active];

      // Okay, somewhat unexpected, but not totally unsurprising, a mousclick is
      // considered a drag without move. So we have to deal with that case
      if (strum && strum.p1[0] === strum.p2[0] && strum.p1[1] === strum.p2[1]) {
        removeStrum(strums);
      }

      brushed = selected(strums);
      strums.active = undefined;
      __.brushed = brushed.length === __.data.length ? false : brushed;
      events.brushend.call(pc, __.brushed);
      pc.render();
    };
  }

  function brushReset(strums) {
    return function() {
      var ids = Object.getOwnPropertyNames(strums).filter(function(d) {
        return !isNaN(d);
      });

      ids.forEach(function(d) {
        strums.active = d;
        removeStrum(strums);
      });
      onDragEnd(strums)();
    };
  }

  function install() {
    var drag = d3.behavior.drag();

    // Add a canvas to catch the mouse events, used to set the strums.
    strumCanvas = pc.selection.insert("canvas", "svg")
      .attr("class", "strums")
      .style("margin-top", __.margin.top + "px")
      .style("margin-left", __.margin.left + "px")
      .attr("width", w()+2)
      .attr("height", h()+2)[0][0];

    // Map of current strums. Strums are stored per segment of the PC. A segment,
    // being the area between two axes. The left most area is indexed at 0.
    strums.active = undefined;
    // Returns the width of the PC segment where currently a strum is being
    // placed. NOTE: even though they are evenly spaced in our current
    // implementation, we keep for when non-even spaced segments are supported as
    // well.
    strums.width = function(id) {
      var strum = strums[id];

      if (strum === undefined) {
        return undefined;
      }

      return strum.maxX - strum.minX;
    };

    pc.on("axesreorder.strums", function() {
      var ids = Object.getOwnPropertyNames(strums).filter(function(d) {
        return !isNaN(d);
      });

      // Checks if the first dimension is directly left of the second dimension.
      function consecutive(first, second) {
        var length = __.dimensions.length;
        return __.dimensions.some(function(d, i) {
          return (d === first)
            ? i + i < length && __.dimensions[i + 1] === second
            : false;
        });
      }

      if (ids.length > 0) { // We have some strums, which might need to be removed.
        ids.forEach(function(d) {
          var dims = strums[d].dims;
          strums.active = d;
          // If the two dimensions of the current strum are not next to each other
          // any more, than we'll need to remove the strum. Otherwise we keep it.
          if (!consecutive(dims.left, dims.right)) {
            removeStrum(strums);
          }
        });
        onDragEnd(strums)();
      }
    });

    // Add a new svg group in which we draw the strums.
    pc.selection.select("svg").append("g")
      .attr("id", "strums")
      .attr("transform", "translate(" + __.margin.left + "," + __.margin.top + ")");

    // Install the required brushReset function
    pc.brushReset = brushReset(strums);

    drag
      .on("dragstart", onDragStart(strums))
      .on("drag", onDrag(strums))
      .on("dragend", onDragEnd(strums));

    // NOTE: The styling needs to be done here and not in the css. This is because
    //       for 1D brushing, the canvas layers should not listen to
    //       pointer-events.
    // FIXME: Like brushable, strumming can only be enabled and not disabled at
    //        this point. So, if we want to be able to switch between the two (or
    //        possibly more in the future) methods.
    d3.select(strumCanvas)
      .style("pointer-events", "auto")
      .style("z-index", 1000)
      .call(drag);
  }

  brush.modes["2D-strums"] = {
    install: install,
    uninstall: function() {
      pc.selection.select("canvas.strums").remove();
      pc.selection.select("svg").select("g#strums").remove();
      pc.on("axesreorder.strums", undefined);
      delete pc.brushReset;

      strumCanvas = undefined;
    },
    selected: selected
  };

}());

pc.interactive = function() {
  flags.interactive = true;
  return this;
};

// expose a few objects
pc.xscale = xscale;
pc.yscale = yscale;
pc.ctx = ctx;
pc.canvas = canvas;
pc.g = function() { return g; };

// rescale for height, width and margins
// TODO currently assumes chart is brushable, and destroys old brushes
pc.resize = function() {
  // selection size
  pc.selection.select("svg")
    .attr("width", __.width)
    .attr("height", __.height)
  pc.svg.attr("transform", "translate(" + __.margin.left + "," + __.margin.top + ")");

  // FIXME: the current brush state should pass through
  if (flags.brushable) pc.brushReset();

  // scales
  pc.autoscale();

  // axes, destroys old brushes.
  if (g) pc.createAxes();
  if (flags.shadows) paths(__.data, ctx.shadows);
  if (flags.brushable) pc.brushable();
  if (flags.reorderable) pc.reorderable();

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

// calculate 2d intersection of line a->b with line c->d
// points are objects with x and y properties
pc.intersection =  function(a, b, c, d) {
  return {
    x: ((a.x * b.y - a.y * b.x) * (c.x - d.x) - (a.x - b.x) * (c.x * d.y - c.y * d.x)) / ((a.x - b.x) * (c.y - d.y) - (a.y - b.y) * (c.x - d.x)),
    y: ((a.x * b.y - a.y * b.x) * (c.y - d.y) - (a.y - b.y) * (c.x * d.y - c.y * d.x)) / ((a.x - b.x) * (c.y - d.y) - (a.y - b.y) * (c.x - d.x))
  };
};

function position(d) {
  var v = dragging[d];
  return v == null ? xscale(d) : v;
}
pc.version = "0.5.0";
  // this descriptive text should live with other introspective methods
  pc.toString = function() { return "Parallel Coordinates: " + __.dimensions.length + " dimensions (" + d3.keys(__.data[0]).length + " total) , " + __.data.length + " rows"; };

  return pc;
};

d3.renderQueue = (function(func) {
  var _queue = [],                  // data to be rendered
      _rate = 10,                   // number of calls per frame
      _clear = function() {},       // clearing function
      _i = 0;                       // current iteration

  var rq = function(data) {
    if (data) rq.data(data);
    rq.invalidate();
    _clear();
    rq.render();
  };

  rq.render = function() {
    _i = 0;
    var valid = true;
    rq.invalidate = function() { valid = false; };

    function doFrame() {
      if (!valid) return true;
      if (_i > _queue.length) return true;

      // Typical d3 behavior is to pass a data item *and* its index. As the
      // render queue splits the original data set, we'll have to be slightly
      // more carefull about passing the correct index with the data item.
      var end = Math.min(_i + _rate, _queue.length);
      for (var i = _i; i < end; i++) {
        func(_queue[i], i);
      }
      _i += _rate;
    }

    d3.timer(doFrame);
  };

  rq.data = function(data) {
    rq.invalidate();
    _queue = data.slice(0);
    return rq;
  };

  rq.rate = function(value) {
    if (!arguments.length) return _rate;
    _rate = value;
    return rq;
  };

  rq.remaining = function() {
    return _queue.length - _i;
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

  rq.invalidate = function() {};

  return rq;
});
