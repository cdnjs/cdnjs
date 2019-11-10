(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['d3'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('d3'));
  } else {
    root.MG = factory(root.d3);
  }
}(this, function(d3) {
(typeof window === 'undefined' ? global : window).MG = {version: '2.11'};

//a set of helper functions, some that we've written, others that we've borrowed

MG.convert = {};

MG.convert.date = function(data, accessor, time_format) {
  time_format = (typeof time_format === "undefined") ? '%Y-%m-%d' : time_format;
  var parse_time = d3.timeParse(time_format);
  data = data.map(function(d) {
    d[accessor] = parse_time(d[accessor].trim());
    return d;
  });

  return data;
}

MG.convert.number = function(data, accessor) {
  data = data.map(function(d) {
    d[accessor] = Number(d[accessor]);
    return d;
  });

  return data;
}

MG.time_format = function(utc, specifier) {
  return utc ? d3.utcFormat(specifier) : d3.timeFormat(specifier);
}

function mg_jquery_exists() {
  if (typeof jQuery !== 'undefined' || typeof $ !== 'undefined') {
    return true;
  } else {
    return false;
  }
}

function mg_get_rollover_time_format(args) {
  // if a rollover time format is defined, use that
  if (args.rollover_time_format) {
    return MG.time_format(args.utc_time, args.rollover_time_format);
  }

  switch (args.processed.x_time_frame) {
    case 'millis':
      return MG.time_format(args.utc_time, '%b %e, %Y  %H:%M:%S.%L');
    case 'seconds':
      return MG.time_format(args.utc_time, '%b %e, %Y  %H:%M:%S');
    case 'less-than-a-day':
      return MG.time_format(args.utc_time, '%b %e, %Y  %I:%M%p');
    case 'four-days':
      return MG.time_format(args.utc_time, '%b %e, %Y  %I:%M%p');
  }

  // default
  return MG.time_format(args.utc_time, '%b %e, %Y');
}

function mg_data_in_plot_bounds(datum, args) {
  return datum[args.x_accessor] >= args.processed.min_x &&
    datum[args.x_accessor] <= args.processed.max_x &&
    datum[args.y_accessor] >= args.processed.min_y &&
    datum[args.y_accessor] <= args.processed.max_y;
}

function is_array(thing) {
  return Object.prototype.toString.call(thing) === '[object Array]';
}

function is_function(thing) {
  return Object.prototype.toString.call(thing) === '[object Function]';
}

function is_empty_array(thing) {
  return is_array(thing) && thing.length === 0;
}

function is_object(thing) {
  return Object.prototype.toString.call(thing) === '[object Object]';
}

function is_array_of_arrays(data) {
  var all_elements = data.map(function(d) {
    return is_array(d) === true && d.length > 0;
  });

  return d3.sum(all_elements) === data.length;
}

function is_array_of_objects(data) {
  // is every element of data an object?
  var all_elements = data.map(function(d) {
    return is_object(d) === true;
  });

  return d3.sum(all_elements) === data.length;
}

function is_array_of_objects_or_empty(data) {
  return is_empty_array(data) || is_array_of_objects(data);
}

function pluck(arr, accessor) {
  return arr.map(function(d) {
    return d[accessor] });
}

function count_array_elements(arr) {
  return arr.reduce(function(a, b) { a[b] = a[b] + 1 || 1;
    return a; }, {});
}

function mg_get_bottom(args) {
  return args.height - args.bottom;
}

function mg_get_plot_bottom(args) {
  // returns the pixel location of the bottom side of the plot area.
  return mg_get_bottom(args) - args.buffer;
}

function mg_get_top(args) {
  return args.top;
}

function mg_get_plot_top(args) {
  // returns the pixel location of the top side of the plot area.
  return mg_get_top(args) + args.buffer;
}

function mg_get_left(args) {
  return args.left;
}

function mg_get_plot_left(args) {
  // returns the pixel location of the left side of the plot area.
  return mg_get_left(args) + args.buffer;
}

function mg_get_right(args) {
  return args.width - args.right;
}

function mg_get_plot_right(args) {
  // returns the pixel location of the right side of the plot area.
  return mg_get_right(args) - args.buffer;
}

//////// adding elements, removing elements /////////////

function mg_exit_and_remove(elem) {
  elem.exit().remove();
}

function mg_selectAll_and_remove(svg, cl) {
  svg.selectAll(cl).remove();
}

function mg_add_g(svg, cl) {
  return svg.append('g').classed(cl, true);
}

function mg_remove_element(svg, elem) {
  svg.select(elem).remove();
}

//////// axis helper functions ////////////

function mg_make_rug(args, rug_class) {
  var svg = mg_get_svg_child_of(args.target);
  var all_data = mg_flatten_array(args.data);
  var rug = svg.selectAll('line.' + rug_class).data(all_data);

  rug.enter()
    .append('line')
      .attr('class', rug_class)
      .attr('opacity', 0.3);

  //remove rug elements that are no longer in use
  mg_exit_and_remove(rug);

  //set coordinates of new rug elements
  mg_exit_and_remove(rug);
  return rug;
}

function mg_add_color_accessor_to_rug(rug, args, rug_mono_class) {
  if (args.color_accessor) {
    rug.attr('stroke', args.scalefns.colorf);
    rug.classed(rug_mono_class, false);
  } else {
    rug.attr('stroke', null);
    rug.classed(rug_mono_class, true);
  }
}

function mg_rotate_labels(labels, rotation_degree) {
  if (rotation_degree) {
    labels.attr({
      dy: 0,
      transform: function() {
        var elem = d3.select(this);
        return 'rotate(' + rotation_degree + ' ' + elem.attr('x') + ',' + elem.attr('y') + ')';
      }
    });
  }
}

//////////////////////////////////////////////////

function mg_elements_are_overlapping(labels) {
  labels = labels.node();
  if (!labels) {
    return false;
  }

  for (var i = 0; i < labels.length; i++) {
    if (mg_is_horizontally_overlapping(labels[i], labels)) return true;
  }

  return false;
}

function mg_prevent_horizontal_overlap(labels, args) {
  if (!labels || labels.length == 1) {
    return;
  }

  //see if each of our labels overlaps any of the other labels
  for (var i = 0; i < labels.length; i++) {
    //if so, nudge it up a bit, if the label it intersects hasn't already been nudged
    if (mg_is_horizontally_overlapping(labels[i], labels)) {
      var node = d3.select(labels[i]);
      var newY = +node.attr('y');
      if (newY + 8 >= args.top) {
        newY = args.top - 16;
      }
      node.attr('y', newY);
    }
  }
}

function mg_prevent_vertical_overlap(labels, args) {
  if (!labels || labels.length == 1) {
    return;
  }

  labels.sort(function(b, a) {
    return d3.select(a).attr('y') - d3.select(b).attr('y');
  });

  labels.reverse();

  var overlap_amount, label_i, label_j;

  //see if each of our labels overlaps any of the other labels
  for (var i = 0; i < labels.length; i++) {
    //if so, nudge it up a bit, if the label it intersects hasn't already been nudged
    label_i = d3.select(labels[i]).text();

    for (var j = 0; j < labels.length; j++) {
      label_j = d3.select(labels[j]).text();
      overlap_amount = mg_is_vertically_overlapping(labels[i], labels[j]);

      if (overlap_amount !== false && label_i !== label_j) {
        var node = d3.select(labels[i]);
        var newY = +node.attr('y');
        newY = newY + overlap_amount;
        node.attr('y', newY);
      }
    }
  }
}

function mg_is_vertically_overlapping(element, sibling) {
  var element_bbox = element.getBoundingClientRect();
  var sibling_bbox = sibling.getBoundingClientRect();

  if (element_bbox.top <= sibling_bbox.bottom && element_bbox.top >= sibling_bbox.top) {
    return sibling_bbox.bottom - element_bbox.top;
  }

  return false;
}

function mg_is_horiz_overlap(element, sibling) {
  var element_bbox = element.getBoundingClientRect();
  var sibling_bbox = sibling.getBoundingClientRect();

  if (element_bbox.right >= sibling_bbox.left || element_bbox.top >= sibling_bbox.top) {
    return sibling_bbox.bottom - element_bbox.top;
  }
  return false;
}

function mg_is_horizontally_overlapping(element, labels) {
  var element_bbox = element.getBoundingClientRect();

  for (var i = 0; i < labels.length; i++) {
    if (labels[i] == element) {
      continue;
    }

    //check to see if this label overlaps with any of the other labels
    var sibling_bbox = labels[i].getBoundingClientRect();
    if (element_bbox.top === sibling_bbox.top &&
      !(sibling_bbox.left > element_bbox.right || sibling_bbox.right < element_bbox.left)
    ) {
      return true;
    }
  }

  return false;
}

function mg_infer_type(args, ns) {
    // must return categorical or numerical.
    var testPoint = mg_flatten_array(args.data);

    testPoint = testPoint[0][args[ns + '_accessor']];
    return typeof testPoint === 'string' ? 'categorical' : 'numerical';
  }

function mg_get_svg_child_of(selector_or_node) {
  return d3.select(selector_or_node).select('svg');
}

function mg_flatten_array(arr) {
  var flat_data = [];
  return flat_data.concat.apply(flat_data, arr);
}

function mg_next_id() {
  if (typeof MG._next_elem_id === 'undefined') {
    MG._next_elem_id = 0;
  }

  return 'mg-' + (MG._next_elem_id++);
}

function mg_target_ref(target) {
  if (typeof target === 'string') {
    return mg_normalize(target);

  } else if (target instanceof window.HTMLElement) {
    var target_ref = target.getAttribute('data-mg-uid');
    if (!target_ref) {
      target_ref = mg_next_id();
      target.setAttribute('data-mg-uid', target_ref);
    }

    return target_ref;

  } else {
    console.warn('The specified target should be a string or an HTMLElement.', target);
    return mg_normalize(target);
  }
}

function mg_normalize(string) {
  return string
    .replace(/[^a-zA-Z0-9 _-]+/g, '')
    .replace(/ +?/g, '');
}

function get_pixel_dimension(target, dimension) {
  return Number(d3.select(target).style(dimension).replace(/px/g, ''));
}

function get_width(target) {
  return get_pixel_dimension(target, 'width');
}

function get_height(target) {
  return get_pixel_dimension(target, 'height');
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var each = function(obj, iterator, context) {
  // yanked out of underscore
  var breaker = {};
  if (obj === null) return obj;
  if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
    obj.forEach(iterator, context);
  } else if (obj.length === +obj.length) {
    for (var i = 0, length = obj.length; i < length; i++) {
      if (iterator.call(context, obj[i], i, obj) === breaker) return;
    }
  } else {
    for (var k in obj) {
      if (iterator.call(context, obj[k], k, obj) === breaker) return;
    }
  }

  return obj;
};

function merge_with_defaults(obj) {
  // taken from underscore
  each(Array.prototype.slice.call(arguments, 1), function(source) {
    if (source) {
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
  });

  return obj;
}

MG.merge_with_defaults = merge_with_defaults;

function number_of_values(data, accessor, value) {
  var values = data.filter(function(d) {
    return d[accessor] === value;
  });

  return values.length;
}

function has_values_below(data, accessor, value) {
  var values = data.filter(function(d) {
    return d[accessor] <= value;
  });

  return values.length > 0;
}

function has_too_many_zeros(data, accessor, zero_count) {
  return number_of_values(data, accessor, 0) >= zero_count;
}

function mg_is_date(obj) {
  return Object.prototype.toString.call(obj) === '[object Date]';
}

function mg_is_object(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function mg_is_array(obj) {
  if (Array.isArray) {
    return Array.isArray(obj);
  }

  return Object.prototype.toString.call(obj) === '[object Array]';
}

function mg_is_function(obj) {
  return Object.prototype.toString.call(obj) === '[object Function]';
}

// deep copy
// http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object
MG.clone = function(obj) {
  var copy;

  // Handle the 3 simple types, and null or undefined
  if (null === obj || "object" !== typeof obj) return obj;

  // Handle Date
  if (mg_is_date(obj)) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (mg_is_array(obj)) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = MG.clone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (mg_is_object(obj)) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = MG.clone(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
};

// give us the difference of two int arrays
// http://radu.cotescu.com/javascript-diff-function/
function arr_diff(a, b) {
  var seen = [],
    diff = [],
    i;
  for (i = 0; i < b.length; i++)
    seen[b[i]] = true;
  for (i = 0; i < a.length; i++)
    if (!seen[a[i]])
      diff.push(a[i]);
  return diff;
}

MG.arr_diff = arr_diff;

/**
  Print warning message to the console when a feature has been scheduled for removal

  @author Dan de Havilland (github.com/dandehavilland)
  @date 2014-12
*/
function warn_deprecation(message, untilVersion) {
  console.warn('Deprecation: ' + message + (untilVersion ? '. This feature will be removed in ' + untilVersion + '.' : ' the near future.'));
  console.trace();
}

MG.warn_deprecation = warn_deprecation;

/**
  Truncate a string to fit within an SVG text node
  CSS text-overlow doesn't apply to SVG <= 1.2

  @author Dan de Havilland (github.com/dandehavilland)
  @date 2014-12-02
*/
function truncate_text(textObj, textString, width) {
  var bbox,
    position = 0;

  textObj.textContent = textString;
  bbox = textObj.getBBox();

  while (bbox.width > width) {
    textObj.textContent = textString.slice(0, --position) + '...';
    bbox = textObj.getBBox();

    if (textObj.textContent === '...') {
      break;
    }
  }
}

MG.truncate_text = truncate_text;

/**
  Wrap the contents of a text node to a specific width

  Adapted from bl.ocks.org/mbostock/7555321

  @author Mike Bostock
  @author Dan de Havilland
  @date 2015-01-14
*/
function wrap_text(text, width, token, tspanAttrs) {
  text.each(function() {
    var text = d3.select(this),
      words = text.text().split(token || /\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      y = text.attr("y"),
      dy = 0,
      tspan = text.text(null)
      .append("tspan")
      .attr("x", 0)
      .attr("y", dy + "em")
      .attr(tspanAttrs || {});

    while (!!(word = words.pop())) {
      line.push(word);
      tspan.text(line.join(" "));
      if (width === null || tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text
          .append("tspan")
          .attr("x", 0)
          .attr("y", ++lineNumber * lineHeight + dy + "em")
          .attr(tspanAttrs || {})
          .text(word);
      }
    }
  });
}

MG.wrap_text = wrap_text;

function register(chartType, descriptor, defaults) {
  MG.charts[chartType] = {
    descriptor: descriptor,
    defaults: defaults || {}
  };
}

MG.register = register;

/**
  Record of all registered hooks.
  For internal use only.
*/
MG._hooks = {};

/**
  Add a hook callthrough to the stack.

  Hooks are executed in the order that they were registered.
*/
MG.add_hook = function(name, func, context) {
  var hooks;

  if (!MG._hooks[name]) {
    MG._hooks[name] = [];
  }

  hooks = MG._hooks[name];

  var already_registered =
    hooks.filter(function(hook) {
      return hook.func === func;
    })
    .length > 0;

  if (already_registered) {
    throw 'That function is already registered.';
  }

  hooks.push({
    func: func,
    context: context
  });
};

/**
  Execute registered hooks.

  Optional arguments
*/
MG.call_hook = function(name) {
  var hooks = MG._hooks[name],
    result = [].slice.apply(arguments, [1]),
    processed;

  if (hooks) {
    hooks.forEach(function(hook) {
      if (hook.func) {
        var params = processed || result;

        if (params && params.constructor !== Array) {
          params = [params];
        }

        params = [].concat.apply([], params);
        processed = hook.func.apply(hook.context, params);
      }
    });
  }

  return processed || result;
};

MG.globals = {};
MG.deprecations = {
  rollover_callback: { replacement: 'mouseover', version: '2.0' },
  rollout_callback: { replacement: 'mouseout', version: '2.0' },
  x_rollover_format: { replacement: 'x_mouseover', version: '2.10' },
  y_rollover_format: { replacement: 'y_mouseover', version: '2.10' },
  show_years: { replacement: 'show_secondary_x_label', version: '2.1' },
  xax_start_at_min: { replacement: 'axes_not_compact', version: '2.7' },
  interpolate_tension: { replacement: 'interpolate', version: '2.10' }
};
MG.globals.link = false;
MG.globals.version = "1.1";

MG.charts = {};

MG.data_graphic = function(args) {
  'use strict';
  var defaults = {
    missing_is_zero: false,                     // if true, missing values will be treated as zeros
    missing_is_hidden: false,                   // if true, missing values will appear as broken segments
    missing_is_hidden_accessor: null,           // the accessor that determines the boolean value for missing data points
    legend: '' ,                                // an array identifying the labels for a chart's lines
    legend_target: '',                          // if set, the specified element is populated with a legend
    error: '',                                  // if set, a graph will show an error icon and log the error to the console
    animate_on_load: false,                     // animate lines on load
    top: 65,                                    // the size of the top margin
    title_y_position: 10,                       // how many pixels from the top edge (0) should we show the title at
    center_title_full_width: false,             // center the title over the full graph (i.e. ignore left and right margins)
    bottom: 45,                                 // the size of the bottom margin
    right: 10,                                  // size of the right margin
    left: 50,                                   // size of the left margin
    buffer: 8,                                  // the buffer between the actual chart area and the margins
    width: 350,                                 // the width of the entire graphic
    height: 220,                                // the height of the entire graphic
    full_width: false,                          // sets the graphic width to be the width of the parent element and resizes dynamically
    full_height: false,                         // sets the graphic width to be the width of the parent element and resizes dynamically
    small_height_threshold: 120,                // the height threshold for when smaller text appears
    small_width_threshold: 160,                 // the width  threshold for when smaller text appears
    xax_count: 6,                               // number of x axis ticks
    xax_tick_length: 5,                         // x axis tick length
    axes_not_compact: true,
    yax_count: 3,                               // number of y axis ticks
    yax_tick_length: 5,                         // y axis tick length
    x_extended_ticks: false,                    // extends x axis ticks across chart - useful for tall charts
    y_extended_ticks: false,                    // extends y axis ticks across chart - useful for long charts
    y_scale_type: 'linear',
    max_x: null,
    max_y: null,
    min_x: null,
    min_y: null,                                // if set, y axis starts at an arbitrary value
    min_y_from_data: false,                     // if set, y axis will start at minimum value rather than at 0
    point_size: 2.5,                            // the size of the dot that appears on a line on mouse-over
    x_accessor: 'date',
    xax_units: '',
    x_label: '',
    x_sort: true,
    x_axis: true,
    y_axis: true,
    x_axis_position: 'bottom',
    y_axis_position: 'left',
    x_axis_type: null,                          // TO BE INTRODUCED IN 2.10
    y_axis_type: null,                          // TO BE INTRODUCED IN 2.10
    ygroup_accessor: null,
    xgroup_accessor:null,
    y_padding_percentage: 0.05,                 // for categorical scales
    y_outer_padding_percentage: .1,             // for categorical scales
    ygroup_padding_percentage:.25,              // for categorical scales
    ygroup_outer_padding_percentage: 0,         // for categorical scales
    x_padding_percentage: 0.05,                 // for categorical scales
    x_outer_padding_percentage: .1,             // for categorical scales
    xgroup_padding_percentage:.25,              // for categorical scales
    xgroup_outer_padding_percentage: 0,         // for categorical scales
    y_categorical_show_guides: false,
    x_categorical_show_guide: false,
    rotate_x_labels: 0,
    rotate_y_labels: 0,
    y_accessor: 'value',
    y_label: '',
    yax_units: '',
    yax_units_append: false,
    x_rug: false,
    y_rug: false,
    mouseover_align: 'right',                   // implemented in point.js
    x_mouseover: null,
    y_mouseover: null,
    transition_on_update: true,
    mouseover: null,
    click: null,
    show_rollover_text: true,
    show_confidence_band: null,                 // given [l, u] shows a confidence at each point from l to u
    xax_format: null,                           // xax_format is a function that formats the labels for the x axis.
    area: true,
    chart_type: 'line',
    data: [],
    decimals: 2,                                // the number of decimals in any rollover
    format: 'count',                            // format = {count, percentage}
    inflator: 10/9,                             // for setting y axis max
    linked: false,                              // links together all other graphs with linked:true, so rollovers in one trigger rollovers in the others
    linked_format: '%Y-%m-%d',                  // What granularity to link on for graphs. Default is at day
    list: false,
    baselines: null,                            // sets the baseline lines
    markers: null,                              // sets the marker lines
    scalefns: {},
    scales: {},
    utc_time: false,
    european_clock: false,
    show_year_markers: false,
    show_secondary_x_label: true,
    target: '#viz',
    interpolate: d3.curveCatmullRom.alpha(0),   // interpolation method to use when rendering lines; increase tension if your data is irregular and you notice artifacts
    custom_line_color_map: [],                  // allows arbitrary mapping of lines to colors, e.g. [2,3] will map line 1 to color 2 and line 2 to color 3
    colors: null,                               // UNIMPLEMENTED - allows direct color mapping to line colors. Will eventually require
    max_data_size: null,                        // explicitly specify the the max number of line series, for use with custom_line_color_map
    aggregate_rollover: false,                  // links the lines in a multi-line chart
    show_tooltips: true,                        // if enabled, a chart's description will appear in a tooltip (requires jquery)
    showActivePoint: true                       // If enabled show active data point information in chart
  };

  MG.call_hook('global.defaults', defaults);

  if (!args) { args = {}; }

  var selected_chart = MG.charts[args.chart_type || defaults.chart_type];
  merge_with_defaults(args, selected_chart.defaults, defaults);

  if (args.list) {
    args.x_accessor = 0;
    args.y_accessor = 1;
  }

  // check for deprecated parameters
  for (var key in MG.deprecations) {
    if (args.hasOwnProperty(key)) {
      var deprecation = MG.deprecations[key],
        message = 'Use of `args.' + key + '` has been deprecated',
        replacement = deprecation.replacement,
        version;

      // transparently alias the deprecated
      if (replacement) {
        if (args[replacement]) {
          message += '. The replacement - `args.' + replacement + '` - has already been defined. This definition will be discarded.';
        } else {
          args[replacement] = args[key];
        }
      }

      if (deprecation.warned) {
        continue;
      }

      deprecation.warned = true;

      if (replacement) {
        message += ' in favor of `args.' + replacement + '`';
      }

      warn_deprecation(message, deprecation.version);
    }
  }

  MG.call_hook('global.before_init', args);

  new selected_chart.descriptor(args);

  return args.data;
};

if (mg_jquery_exists()) {
    /* ========================================================================
     * Bootstrap: tooltip.js v3.3.5
     * http://getbootstrap.com/javascript/#tooltip
     * Inspired by the original jQuery.tipsy by Jason Frame
     * ========================================================================
     * Copyright 2011-2015 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */


    +function ($) {
      'use strict';

      // TOOLTIP PUBLIC CLASS DEFINITION
      // ===============================

      var Tooltip = function (element, options) {
        this.type       = null
        this.options    = null
        this.enabled    = null
        this.timeout    = null
        this.hoverState = null
        this.$element   = null
        this.inState    = null

        this.init('tooltip', element, options)
      }

      Tooltip.VERSION  = '3.3.5'

      Tooltip.TRANSITION_DURATION = 150

      Tooltip.DEFAULTS = {
        animation: true,
        placement: 'top',
        selector: false,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: false,
        container: false,
        viewport: {
          selector: 'body',
          padding: 0
        }
      }

      Tooltip.prototype.init = function (type, element, options) {
        this.enabled   = true
        this.type      = type
        this.$element  = $(element)
        this.options   = this.getOptions(options)
        this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
        this.inState   = { click: false, hover: false, focus: false }

        if (this.$element[0] instanceof document.constructor && !this.options.selector) {
          throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
        }

        var triggers = this.options.trigger.split(' ')

        for (var i = triggers.length; i--;) {
          var trigger = triggers[i]

          if (trigger == 'click') {
            this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
          } else if (trigger != 'manual') {
            var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
            var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

            this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
            this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
          }
        }

        this.options.selector ?
          (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
          this.fixTitle()
      }

      Tooltip.prototype.getDefaults = function () {
        return Tooltip.DEFAULTS
      }

      Tooltip.prototype.getOptions = function (options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options)

        if (options.delay && typeof options.delay == 'number') {
          options.delay = {
            show: options.delay,
            hide: options.delay
          }
        }

        return options
      }

      Tooltip.prototype.getDelegateOptions = function () {
        var options  = {}
        var defaults = this.getDefaults()

        this._options && $.each(this._options, function (key, value) {
          if (defaults[key] != value) options[key] = value
        })

        return options
      }

      Tooltip.prototype.enter = function (obj) {
        var self = obj instanceof this.constructor ?
          obj : $(obj.currentTarget).data('bs.' + this.type)

        if (!self) {
          self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
          $(obj.currentTarget).data('bs.' + this.type, self)
        }

        if (obj instanceof $.Event) {
          self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
        }

        if (self.tip().hasClass('in') || self.hoverState == 'in') {
          self.hoverState = 'in'
          return
        }

        clearTimeout(self.timeout)

        self.hoverState = 'in'

        if (!self.options.delay || !self.options.delay.show) return self.show()

        self.timeout = setTimeout(function () {
          if (self.hoverState == 'in') self.show()
        }, self.options.delay.show)
      }

      Tooltip.prototype.isInStateTrue = function () {
        for (var key in this.inState) {
          if (this.inState[key]) return true
        }

        return false
      }

      Tooltip.prototype.leave = function (obj) {
        var self = obj instanceof this.constructor ?
          obj : $(obj.currentTarget).data('bs.' + this.type)

        if (!self) {
          self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
          $(obj.currentTarget).data('bs.' + this.type, self)
        }

        if (obj instanceof $.Event) {
          self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
        }

        if (self.isInStateTrue()) return

        clearTimeout(self.timeout)

        self.hoverState = 'out'

        if (!self.options.delay || !self.options.delay.hide) return self.hide()

        self.timeout = setTimeout(function () {
          if (self.hoverState == 'out') self.hide()
        }, self.options.delay.hide)
      }

      Tooltip.prototype.show = function () {
        var e = $.Event('show.bs.' + this.type)

        if (this.hasContent() && this.enabled) {
          this.$element.trigger(e)

          var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
          if (e.isDefaultPrevented() || !inDom) return
          var that = this

          var $tip = this.tip()

          var tipId = this.getUID(this.type)

          this.setContent()
          $tip.attr('id', tipId)
          this.$element.attr('aria-describedby', tipId)

          if (this.options.animation) $tip.addClass('fade')

          var placement = typeof this.options.placement == 'function' ?
            this.options.placement.call(this, $tip[0], this.$element[0]) :
            this.options.placement

          var autoToken = /\s?auto?\s?/i
          var autoPlace = autoToken.test(placement)
          if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

          $tip
            .detach()
            .css({ top: 0, left: 0, display: 'block' })
            .addClass(placement)
            .data('bs.' + this.type, this)

          this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
          this.$element.trigger('inserted.bs.' + this.type)

          var pos          = this.getPosition()
          var actualWidth  = $tip[0].offsetWidth
          var actualHeight = $tip[0].offsetHeight

          if (autoPlace) {
            var orgPlacement = placement
            var viewportDim = this.getPosition(this.$viewport)

            placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                        placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                        placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                        placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                        placement

            $tip
              .removeClass(orgPlacement)
              .addClass(placement)
          }

          var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

          this.applyPlacement(calculatedOffset, placement)

          var complete = function () {
            var prevHoverState = that.hoverState
            that.$element.trigger('shown.bs.' + that.type)
            that.hoverState = null

            if (prevHoverState == 'out') that.leave(that)
          }

          $.support.transition && this.$tip.hasClass('fade') ?
            $tip
              .one('bsTransitionEnd', complete)
              .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
            complete()
        }
      }

      Tooltip.prototype.applyPlacement = function (offset, placement) {
        var $tip   = this.tip()
        var width  = $tip[0].offsetWidth
        var height = $tip[0].offsetHeight

        // manually read margins because getBoundingClientRect includes difference
        var marginTop = parseInt($tip.css('margin-top'), 10)
        var marginLeft = parseInt($tip.css('margin-left'), 10)

        // we must check for NaN for ie 8/9
        if (isNaN(marginTop))  marginTop  = 0
        if (isNaN(marginLeft)) marginLeft = 0

        offset.top  += marginTop
        offset.left += marginLeft

        // $.fn.offset doesn't round pixel values
        // so we use setOffset directly with our own function B-0
        $.offset.setOffset($tip[0], $.extend({
          using: function (props) {
            $tip.css({
              top: Math.round(props.top),
              left: Math.round(props.left)
            })
          }
        }, offset), 0)

        $tip.addClass('in')

        // check to see if placing tip in new offset caused the tip to resize itself
        var actualWidth  = $tip[0].offsetWidth
        var actualHeight = $tip[0].offsetHeight

        if (placement == 'top' && actualHeight != height) {
          offset.top = offset.top + height - actualHeight
        }

        var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

        if (delta.left) offset.left += delta.left
        else offset.top += delta.top

        var isVertical          = /top|bottom/.test(placement)
        var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
        var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

        $tip.offset(offset)
        this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
      }

      Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
        this.arrow()
          .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
          .css(isVertical ? 'top' : 'left', '')
      }

      Tooltip.prototype.setContent = function () {
        var $tip  = this.tip()
        var title = this.getTitle()

        $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
        $tip.removeClass('fade in top bottom left right')
      }

      Tooltip.prototype.hide = function (callback) {
        var that = this
        var $tip = $(this.$tip)
        var e    = $.Event('hide.bs.' + this.type)

        function complete() {
          if (that.hoverState != 'in') $tip.detach()
          that.$element
            .removeAttr('aria-describedby')
            .trigger('hidden.bs.' + that.type)
          callback && callback()
        }

        this.$element.trigger(e)

        if (e.isDefaultPrevented()) return

        $tip.removeClass('in')

        $.support.transition && $tip.hasClass('fade') ?
          $tip
            .one('bsTransitionEnd', complete)
            .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
          complete()

        this.hoverState = null

        return this
      }

      Tooltip.prototype.fixTitle = function () {
        var $e = this.$element
        if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
          $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
        }
      }

      Tooltip.prototype.hasContent = function () {
        return this.getTitle()
      }

      Tooltip.prototype.getPosition = function ($element) {
        $element   = $element || this.$element

        var el     = $element[0]
        var isBody = el.tagName == 'BODY'

        var elRect    = el.getBoundingClientRect()
        if (elRect.width == null) {
          // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
          elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
        }
        var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
        var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
        var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

        return $.extend({}, elRect, scroll, outerDims, elOffset)
      }

      Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
        return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
               placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
               placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
            /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

      }

      Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
        var delta = { top: 0, left: 0 }
        if (!this.$viewport) return delta

        var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
        var viewportDimensions = this.getPosition(this.$viewport)

        if (/right|left/.test(placement)) {
          var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
          var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
          if (topEdgeOffset < viewportDimensions.top) { // top overflow
            delta.top = viewportDimensions.top - topEdgeOffset
          } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
            delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
          }
        } else {
          var leftEdgeOffset  = pos.left - viewportPadding
          var rightEdgeOffset = pos.left + viewportPadding + actualWidth
          if (leftEdgeOffset < viewportDimensions.left) { // left overflow
            delta.left = viewportDimensions.left - leftEdgeOffset
          } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
            delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
          }
        }

        return delta
      }

      Tooltip.prototype.getTitle = function () {
        var title
        var $e = this.$element
        var o  = this.options

        title = $e.attr('data-original-title')
          || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

        return title
      }

      Tooltip.prototype.getUID = function (prefix) {
        do prefix += ~~(Math.random() * 1000000)
        while (document.getElementById(prefix))
        return prefix
      }

      Tooltip.prototype.tip = function () {
        if (!this.$tip) {
          this.$tip = $(this.options.template)
          if (this.$tip.length != 1) {
            throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
          }
        }
        return this.$tip
      }

      Tooltip.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
      }

      Tooltip.prototype.enable = function () {
        this.enabled = true
      }

      Tooltip.prototype.disable = function () {
        this.enabled = false
      }

      Tooltip.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
      }

      Tooltip.prototype.toggle = function (e) {
        var self = this
        if (e) {
          self = $(e.currentTarget).data('bs.' + this.type)
          if (!self) {
            self = new this.constructor(e.currentTarget, this.getDelegateOptions())
            $(e.currentTarget).data('bs.' + this.type, self)
          }
        }

        if (e) {
          self.inState.click = !self.inState.click
          if (self.isInStateTrue()) self.enter(self)
          else self.leave(self)
        } else {
          self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
        }
      }

      Tooltip.prototype.destroy = function () {
        var that = this
        clearTimeout(this.timeout)
        this.hide(function () {
          that.$element.off('.' + that.type).removeData('bs.' + that.type)
          if (that.$tip) {
            that.$tip.detach()
          }
          that.$tip = null
          that.$arrow = null
          that.$viewport = null
        })
      }


      // TOOLTIP PLUGIN DEFINITION
      // =========================

      function Plugin(option) {
        return this.each(function () {
          var $this   = $(this)
          var data    = $this.data('bs.tooltip')
          var options = typeof option == 'object' && option

          if (!data && /destroy|hide/.test(option)) return
          if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
          if (typeof option == 'string') data[option]()
        })
      }

      var old = $.fn.tooltip

      $.fn.tooltip             = Plugin
      $.fn.tooltip.Constructor = Tooltip


      // TOOLTIP NO CONFLICT
      // ===================

      $.fn.tooltip.noConflict = function () {
        $.fn.tooltip = old
        return this
      }

    }(jQuery);


    /* ========================================================================
     * Bootstrap: popover.js v3.3.5
     * http://getbootstrap.com/javascript/#popovers
     * ========================================================================
     * Copyright 2011-2015 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */


    +function ($) {
      'use strict';

      // POPOVER PUBLIC CLASS DEFINITION
      // ===============================

      var Popover = function (element, options) {
        this.init('popover', element, options)
      }

      if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

      Popover.VERSION  = '3.3.5'

      Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
      })


      // NOTE: POPOVER EXTENDS tooltip.js
      // ================================

      Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

      Popover.prototype.constructor = Popover

      Popover.prototype.getDefaults = function () {
        return Popover.DEFAULTS
      }

      Popover.prototype.setContent = function () {
        var $tip    = this.tip()
        var title   = this.getTitle()
        var content = this.getContent()

        $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
        $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
          this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
        ](content)

        $tip.removeClass('fade top bottom left right in')

        // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
        // this manually by checking the contents.
        if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
      }

      Popover.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
      }

      Popover.prototype.getContent = function () {
        var $e = this.$element
        var o  = this.options

        return $e.attr('data-content')
          || (typeof o.content == 'function' ?
                o.content.call($e[0]) :
                o.content)
      }

      Popover.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
      }


      // POPOVER PLUGIN DEFINITION
      // =========================

      function Plugin(option) {
        return this.each(function () {
          var $this   = $(this)
          var data    = $this.data('bs.popover')
          var options = typeof option == 'object' && option

          if (!data && /destroy|hide/.test(option)) return
          if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
          if (typeof option == 'string') data[option]()
        })
      }

      var old = $.fn.popover

      $.fn.popover             = Plugin
      $.fn.popover.Constructor = Popover


      // POPOVER NO CONFLICT
      // ===================

      $.fn.popover.noConflict = function () {
        $.fn.popover = old
        return this
      }

    }(jQuery);
}

function chart_title(args) {
  'use strict';

  var svg = mg_get_svg_child_of(args.target);

  //remove the current title if it exists
  svg.select('.mg-header').remove();

  if (args.target && args.title) {
    var chartTitle = svg.insert('text')
      .attr('class', 'mg-header')
      .attr('x', args.center_title_full_width ? args.width /2 : (args.width + args.left - args.right) / 2)
      .attr('y', args.title_y_position)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.55em');

    //show the title
    chartTitle.append('tspan')
      .attr('class', 'mg-chart-title')
      .text(args.title);

    //show and activate the description icon if we have a description
    if (args.show_tooltips && args.description && mg_jquery_exists()) {
      chartTitle.append('tspan')
        .attr('class', 'mg-chart-description')
        .attr('dx', '0.3em')
        .text('\uf059');

      //now that the title is an svg text element, we'll have to trigger
      //mouseenter, mouseleave events manually for the popover to work properly
      var $chartTitle = $(chartTitle.node());
      $chartTitle.popover({
        html: true,
        animation: false,
        placement: 'top',
        content: args.description,
        container: args.target,
        trigger: 'manual',
        template: '<div class="popover mg-popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
      }).on('mouseenter', function() {
        d3.selectAll(args.target)
          .selectAll('.mg-popover')
          .remove();

        $(this).popover('show');
        $(d3.select(args.target).select('.popover').node())
          .on('mouseleave', function () {
            $chartTitle.popover('hide');
          });
      }).on('mouseleave', function () {
        setTimeout(function () {
          if (!$('.popover:hover').length) {
            $chartTitle.popover('hide');
          }
        }, 120);
      });
    } else if (args.show_tooltips && args.description && typeof $ === 'undefined') {
      args.error = 'In order to enable tooltips, please make sure you include jQuery.';
    }
  }

  if (args.error) {
    error(args);
  }
}

MG.chart_title = chart_title;

function mg_add_scale_function(args, scalefcn_name, scale, accessor, inflation) {
  args.scalefns[scalefcn_name] = function(di) {
    if (inflation === undefined) return args.scales[scale](di[accessor]);
    else return args.scales[scale](di[accessor]) + inflation;
  };
}

function mg_position(str, args) {
  if (str === 'bottom' || str === 'top') {
    return [mg_get_plot_left(args), mg_get_plot_right(args)];
  }

  if (str === 'left' || str === 'right') {
    return [mg_get_plot_bottom(args), args.top];
  }
}

function mg_cat_position(str, args) {
  if (str === 'bottom' || str === 'top') {
    return [mg_get_plot_left(args), mg_get_plot_right(args)]
  }

  if (str === 'left' || str === 'right') {
    return [mg_get_plot_bottom(args), mg_get_plot_top(args)];
  }
}

function MGScale(args) {
  // big wrapper around d3 scale that automatically formats & calculates scale bounds
  // according to the data, and handles other niceties.
  var scaleArgs = {}
  scaleArgs.use_inflator = false;
  scaleArgs.zero_bottom = false;
  scaleArgs.scaleType = 'numerical';

  this.namespace = function(_namespace) {
    scaleArgs.namespace = _namespace;
    scaleArgs.namespace_accessor_name = scaleArgs.namespace + '_accessor';
    scaleArgs.scale_name = scaleArgs.namespace.toUpperCase();
    scaleArgs.scalefn_name = scaleArgs.namespace + 'f';
    return this;
  }

  this.scaleName = function(scaleName) {
    scaleArgs.scale_name = scaleName.toUpperCase();
    scaleArgs.scalefn_name = scaleName +'f';
    return this;
  }

  this.inflateDomain = function(tf) {
    scaleArgs.use_inflator = tf;
    return this;
  }

  this.zeroBottom = function(tf) {
    scaleArgs.zero_bottom = tf;
    return this;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// all scale domains are either numerical (number, date, etc.) or categorical (factor, label, etc) /////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  // these functions automatically create the d3 scale function and place the domain.

  this.numericalDomainFromData = function() {
    var other_flat_data_arrays = [];

    if (arguments.length > 0) {
      other_flat_data_arrays = arguments;
    }

    // pull out a non-empty array in args.data.
    var illustrative_data;
    for (var i = 0; i < args.data.length; i++) {
      if (args.data[i].length > 0) {
        illustrative_data = args.data[i];
      }
    }
    scaleArgs.is_time_series = mg_is_date(illustrative_data[0][args[scaleArgs.namespace_accessor_name]])
      ? true
      : false;

    mg_add_scale_function(args, scaleArgs.scalefn_name, scaleArgs.scale_name, args[scaleArgs.namespace_accessor_name]);

    mg_min_max_numerical(args, scaleArgs, other_flat_data_arrays, scaleArgs.use_inflator);

    var time_scale = (args.utc_time)
      ? d3.scaleUtc()
      : d3.scaleTime();

    args.scales[scaleArgs.scale_name] = (scaleArgs.is_time_series)
      ? time_scale
      : (mg_is_function(args[scaleArgs.namespace + '_scale_type']))
        ? args.y_scale_type()
        : (args[scaleArgs.namespace + '_scale_type'] === 'log')
          ? d3.scaleLog()
          : d3.scaleLinear();

    args.scales[scaleArgs.scale_name].domain([args.processed['min_' + scaleArgs.namespace], args.processed['max_' + scaleArgs.namespace]]);
    scaleArgs.scaleType = 'numerical';

    return this;
  }

  this.categoricalDomain = function(domain) {
    args.scales[scaleArgs.scale_name] = d3.scaleOrdinal().domain(domain);
    mg_add_scale_function(args, scaleArgs.scalefn_name, scaleArgs.scale_name, args[scaleArgs.namespace_accessor_name]);
    return this;
  }

  this.categoricalDomainFromData = function() {
    // make args.categorical_variables.
    // lets make the categorical variables.
    var all_data = mg_flatten_array(args.data)
    //d3.set(data.map(function(d){return d[args.group_accessor]})).values()
    scaleArgs.categoricalVariables = d3.set(all_data.map(function(d) {
      return d[args[scaleArgs.namespace_accessor_name]] })).values();
    args.scales[scaleArgs.scale_name] = d3.scaleBand()
      .domain(scaleArgs.categoricalVariables);

    scaleArgs.scaleType = 'categorical';
    return this;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////// all scale ranges are either positional (for axes, etc) or arbitrary (colors, size, etc) //////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  this.numericalRange = function(range) {
    if (typeof range === 'string') {
      args
        .scales[scaleArgs.scale_name]
        .range(mg_position(range, args));
    } else {
      args
        .scales[scaleArgs.scale_name]
        .range(range);
    }

    return this;
  }

  this.categoricalRangeBands = function(range, halfway) {
    if (halfway === undefined) halfway = false;

    var namespace = scaleArgs.namespace;
    var paddingPercentage = args[namespace + '_padding_percentage'];
    var outerPaddingPercentage = args[namespace + '_outer_padding_percentage'];
    if (typeof range === 'string') {
      // if string, it's a location. Place it accordingly.
      args.scales[scaleArgs.scale_name]
        .range(mg_position(range, args))
        .paddingInner(paddingPercentage)
        .paddingOuter(outerPaddingPercentage);
    } else {
      args.scales[scaleArgs.scale_name]
        .range(range)
        .paddingInner(paddingPercentage)
        .paddingOuter(outerPaddingPercentage);
    }

    mg_add_scale_function(
      args,
      scaleArgs.scalefn_name,
      scaleArgs.scale_name,
      args[scaleArgs.namespace_accessor_name],
      halfway
        ? args.scales[scaleArgs.scale_name].bandwidth() / 2
        : 0
    );

    return this;
  }

  this.categoricalRange = function(range) {
    args.scales[scaleArgs.scale_name].range(range);
    mg_add_scale_function(args, scaleArgs.scalefn_name, scaleArgs.scale_name, args[scaleArgs.namespace_accessor_name]);
    return this;
  }

  this.categoricalColorRange = function() {
    args.scales[scaleArgs.scale_name] = args.scales[scaleArgs.scale_name].domain().length > 10
      ? d3.scaleOrdinal(d3.schemeCategory20)
      : d3.scaleOrdinal(d3.schemeCategory10);

    args
      .scales[scaleArgs.scale_name]
      .domain(scaleArgs.categoricalVariables);

    mg_add_scale_function(args, scaleArgs.scalefn_name, scaleArgs.scale_name, args[scaleArgs.namespace_accessor_name]);
    return this;
  }

  this.clamp = function(yn) {
    args.scales[scaleArgs.scale_name].clamp(yn);
    return this;
  }

  return this;
}

MG.scale_factory = MGScale;

/////////////////////////////// x, x_accessor, markers, baselines, etc.
function mg_min_max_numerical(args, scaleArgs, additional_data_arrays) {
  // A BIT OF EXPLANATION ABOUT THIS FUNCTION
  // This function pulls out all the accessor values in all the arrays in args.data.
  // We also have this additional argument, additional_data_arrays, which is an array of arrays of raw data values.
  // These values also get concatenated to the data pulled from args.data, and the extents are calculate from that.
  // They are optional.
  //
  // This may seem arbitrary, but it gives us a lot of flexibility. For instance, if we're calculating
  // the min and max for the y axis of a line chart, we're going to want to also factor in baselines (horizontal lines
  // that might potentially be outside of the y value bounds). The easiest way to do this is in the line.js code
  // & scale creation to just flatten the args.baselines array, pull out hte values, and feed it in
  // so it appears in additional_data_arrays.
  var namespace = scaleArgs.namespace;
  var namespace_accessor_name = scaleArgs.namespace_accessor_name;
  var use_inflator = scaleArgs.use_inflator;
  var zero_bottom = scaleArgs.zero_bottom;

  var accessor = args[namespace_accessor_name];

  // add together all relevant data arrays.
  var all_data = mg_flatten_array(args.data)
    .map(function(dp) {
      return dp[accessor] })
    .concat(mg_flatten_array(additional_data_arrays));

  // do processing for log
  if (args[namespace + '_scale_type'] === 'log') {
    all_data = all_data.filter(function(d) {
      return d > 0;
    });
  }

  // use inflator?
  var extents = d3.extent(all_data);
  var min_val = extents[0];
  var max_val = extents[1];

  // bolt scale domain to zero when the right conditions are met:
  // not pulling the bottom of the range from data
  // not zero-bottomed
  // not a time series
  if (zero_bottom && !args['min_' + namespace + '_from_data'] && min_val > 0 && !scaleArgs.is_time_series) {
    min_val = args[namespace + '_scale_type'] === 'log' ? 1 : 0;
  }

  if (args[namespace + '_scale_type'] !== 'log' && min_val < 0 && !scaleArgs.is_time_series) {
    min_val = min_val - (min_val - min_val * args.inflator) * use_inflator;
  }

  if (!scaleArgs.is_time_series) {
    max_val = (max_val < 0) ? max_val + (max_val - max_val * args.inflator) * use_inflator : max_val * (use_inflator ? args.inflator : 1);
  }

  min_val = args['min_' + namespace] || min_val;
  max_val = args['max_' + namespace] || max_val;
  // if there's a single data point, we should custom-set the max values
  // so we're displaying some kind of range
  if (min_val === max_val && args['min_' + namespace] === undefined &&
      args['max_' + namespace] === undefined) {
    if (mg_is_date(min_val)) {
      max_val = new Date(MG.clone(min_val).setDate(min_val.getDate() + 1));
    } else if (typeof min_val === 'number') {
      max_val = min_val + 1;
      mg_force_xax_count_to_be_two(args);
    }
  }

  args.processed['min_' + namespace] = min_val;
  args.processed['max_' + namespace] = max_val;

  MG.call_hook('x_axis.process_min_max', args, args.processed.min_x, args.processed.max_x);
  MG.call_hook('y_axis.process_min_max', args, args.processed.min_y, args.processed.max_y);
}

function mg_categorical_group_color_scale(args) {
  if (args.color_accessor !== false) {
    if (args.ygroup_accessor) {
      // add a custom accessor element.
      if (args.color_accessor === null) {
        args.color_accessor = args.y_accessor;
      } else {}
    }
    if (args.color_accessor !== null) {
      new MG.scale_factory(args)
        .namespace('color')
        .categoricalDomainFromData()
        .categoricalColorRange();
    }
  }
}

function mg_add_color_categorical_scale(args, domain, accessor) {
  args.scales.color = d3.scaleOrdinal(d3.schemeCategory20).domain(domain);
  args.scalefns.color = function(d) {
    return args.scales.color(d[accessor]);
  };
}

function mg_get_categorical_domain(data, accessor) {
  return d3.set(data.map(function(d) {
      return d[accessor]; }))
    .values();
}

function mg_get_color_domain(args) {
  var color_domain;
  if (args.color_domain === null) {
    if (args.color_type === 'number') {
      color_domain = d3.extent(args.data[0], function(d) {
        return d[args.color_accessor]; });
    } else if (args.color_type === 'category') {
      color_domain = mg_get_categorical_domain(args.data[0], args.color_accessor);

    }
  } else {
    color_domain = args.color_domain;
  }
  return color_domain;
}

function mg_get_color_range(args) {
  var color_range;
  if (args.color_range === null) {
    if (args.color_type === 'number') {
      color_range = ['blue', 'red'];
    } else {
      color_range = null;
    }
  } else {
    color_range = args.color_range;
  }
  return color_range;
}

function processScaleTicks (args, axis) {
  var accessor = args[axis + '_accessor'];
  var scale_ticks = args.scales[axis.toUpperCase()].ticks(args[axis + 'ax_count']);
  var max = args.processed['max_' + axis];

  function log10 (val) {
    if (val === 1000) {
      return 3;
    }
    if (val === 1000000) {
      return 7;
    }
    return Math.log(val) / Math.LN10;
  }

  if (args[axis + '_scale_type'] === 'log') {
    // get out only whole logs
    scale_ticks = scale_ticks.filter(function (d) {
      return Math.abs(log10(d)) % 1 < 1e-6 || Math.abs(log10(d)) % 1 > 1 - 1e-6;
    });
  }

  // filter out fraction ticks if our data is ints and if xmax > number of generated ticks
  var number_of_ticks = scale_ticks.length;

  // is our data object all ints?
  var data_is_int = true;
  args.data.forEach(function (d, i) {
    d.forEach(function (d, i) {
      if (d[accessor] % 1 !== 0) {
        data_is_int = false;
        return false;
      }
    });
  });

  if (data_is_int && number_of_ticks > max && args.format === 'count') {
    // remove non-integer ticks
    scale_ticks = scale_ticks.filter(function (d) {
      return d % 1 === 0;
    });
  }
  args.processed[axis + '_ticks'] = scale_ticks;
}

function rugPlacement (args, axisArgs) {
  var position = axisArgs.position;
  var ns = axisArgs.namespace;
  var coordinates = {};
  if (position === 'left') {
    coordinates.x1 = mg_get_left(args) + 1;
    coordinates.x2 = mg_get_left(args) + args.rug_buffer_size;
    coordinates.y1 = args.scalefns[ns + 'f'];
    coordinates.y2 = args.scalefns[ns + 'f'];
  }
  if (position === 'right') {
    coordinates.x1 = mg_get_right(args) - 1,
    coordinates.x2 = mg_get_right(args) - args.rug_buffer_size,
    coordinates.y1 = args.scalefns[ns + 'f'];
    coordinates.y2 = args.scalefns[ns + 'f'];
  }
  if (position === 'top') {
    coordinates.x1 = args.scalefns[ns + 'f'];
    coordinates.x2 = args.scalefns[ns + 'f'];
    coordinates.y1 = mg_get_top(args) + 1;
    coordinates.y2 = mg_get_top(args) + args.rug_buffer_size;
  }
  if (position === 'bottom') {
    coordinates.x1 = args.scalefns[ns + 'f'];
    coordinates.x2 = args.scalefns[ns + 'f'];
    coordinates.y1 = mg_get_bottom(args) - 1;
    coordinates.y2 = mg_get_bottom(args) - args.rug_buffer_size;
  }
  return coordinates;
}

function rimPlacement (args, axisArgs) {
  var ns = axisArgs.namespace;
  var position = axisArgs.position;
  var tick_length = args.processed[ns + '_ticks'].length;
  var ticks = args.processed[ns + '_ticks'];
  var scale = args.scales[ns.toUpperCase()];
  var coordinates = {};

  if (position === 'left') {
    coordinates.x1 = mg_get_left(args);
    coordinates.x2 = mg_get_left(args);
    coordinates.y1 = scale(ticks[0]).toFixed(2);
    coordinates.y2 = scale(ticks[tick_length - 1]).toFixed(2);
  }
  if (position === 'right') {
    coordinates.x1 = mg_get_right(args);
    coordinates.x2 = mg_get_right(args);
    coordinates.y1 = scale(ticks[0]).toFixed(2);
    coordinates.y2 = scale(ticks[tick_length - 1]).toFixed(2);
  }
  if (position === 'top') {
    coordinates.x1 = mg_get_left(args);
    coordinates.x2 = mg_get_right(args);
    coordinates.y1 = mg_get_top(args);
    coordinates.y2 = mg_get_top(args);
  }
  if (position === 'bottom') {
    coordinates.x1 = mg_get_left(args);
    coordinates.x2 = mg_get_right(args);
    coordinates.y1 = mg_get_bottom(args);
    coordinates.y2 = mg_get_bottom(args);
  }

  if (position === 'left' || position === 'right') {
    if (args.axes_not_compact) {
      coordinates.y1 = mg_get_bottom(args);
      coordinates.y2 = mg_get_top(args);
    } else if (tick_length) {
      coordinates.y1 = scale(ticks[0]).toFixed(2);
      coordinates.y2 = scale(ticks[tick_length - 1]).toFixed(2);
    }
  }

  return coordinates;
}

function labelPlacement (args, axisArgs) {
  var position = axisArgs.position;
  var ns = axisArgs.namespace;
  var tickLength = args[ns + 'ax_tick_length'];
  var scale = args.scales[ns.toUpperCase()];
  var coordinates = {};

  if (position === 'left') {
    coordinates.x = mg_get_left(args) - tickLength * 3 / 2;
    coordinates.y = function (d) {
      return scale(d).toFixed(2);
    };
    coordinates.dx = -3;
    coordinates.dy = '.35em';
    coordinates.textAnchor = 'end';
    coordinates.text = function (d) {
      return mg_compute_yax_format(args)(d);
    };
  }
  if (position === 'right') {
    coordinates.x = mg_get_right(args) + tickLength * 3 / 2;
    coordinates.y = function (d) {
      return scale(d).toFixed(2);
    };
    coordinates.dx = 3;
    coordinates.dy = '.35em';
    coordinates.textAnchor = 'start';
    coordinates.text = function (d) {
      return mg_compute_yax_format(args)(d); };
  }
  if (position === 'top') {
    coordinates.x = function (d) {
      return scale(d).toFixed(2);
    };
    coordinates.y = (mg_get_top(args) - tickLength * 7 / 3).toFixed(2);
    coordinates.dx = 0;
    coordinates.dy = '0em';
    coordinates.textAnchor = 'middle';
    coordinates.text = function (d) {
      return mg_default_xax_format(args)(d);
    };
  }
  if (position === 'bottom') {
    coordinates.x = function (d) {
      return scale(d).toFixed(2);
    };
    coordinates.y = (mg_get_bottom(args) + tickLength * 7 / 3).toFixed(2);
    coordinates.dx = 0;
    coordinates.dy = '.50em';
    coordinates.textAnchor = 'middle';
    coordinates.text = function (d) {
      return mg_default_xax_format(args)(d);
    };
  }

  return coordinates;
}

function selectXaxFormat (args) {
  var c = args.chart_type;
  if (!args.processed.xax_format) {
    if (args.xax_format) {
      args.processed.xax_format = args.xax_format;
    } else {
      if (c === 'line' || c === 'point' || c === 'histogram') {
        args.processed.xax_format = mg_default_xax_format(args);
      } else if (c === 'bar') {
        args.processed.xax_format = mg_default_bar_xax_format(args);
      }
    }
  }
}

function secondaryLabels (g, args, axisArgs) {
  if (args.time_series && (args.show_years || args.show_secondary_x_label)) {
    var tf = mg_get_yformat_and_secondary_time_function(args);
    addSecondaryLabelElements(args, axisArgs, g, tf.timeframe, tf.yformat, tf.secondary);
  }
}

function addSecondaryLabelElements (args, axisArgs, g, time_frame, yformat, secondary_function) {
  var years = secondary_function(args.processed.min_x, args.processed.max_x);
  if (years.length === 0) {
    var first_tick = args.scales.X.ticks(args.xax_count)[0];
    years = [first_tick];
  }

  var yg = mg_add_g(g, 'mg-year-marker');
  if (time_frame === 'default' && args.show_year_markers) {
    yearMarkerLine(args, axisArgs, yg, years, yformat);
  }
  if (time_frame != 'years') yearMarkerText(args, axisArgs, yg, years, yformat);
}

function yearMarkerLine (args, axisArgs, g, years, yformat) {
  g.selectAll('.mg-year-marker')
    .data(years).enter()
    .append('line')
    .attr('x1', function (d) {
      return args.scales.X(d).toFixed(2); })
    .attr('x2', function (d) {
      return args.scales.X(d).toFixed(2); })
    .attr('y1', mg_get_top(args))
    .attr('y2', mg_get_bottom(args));
}

function yearMarkerText (args, axisArgs, g, years, yformat) {
  var position = axisArgs.position;
  var ns = axisArgs.namespace;
  var scale = args.scales[ns.toUpperCase()];
  var x, y, dy, textAnchor, textFcn;
  var xAxisTextElement = d3.select(args.target)
    .select('.mg-x-axis text').node().getBoundingClientRect();

  if (position === 'top') {
    x = function (d, i) {
      return scale(d).toFixed(2); };
    y = (mg_get_top(args) - args.xax_tick_length * 7 / 3) - (xAxisTextElement.height);
    dy = '.50em';
    textAnchor = 'middle';
    textFcn = function (d) {
      return yformat(new Date(d)); };
  }
  if (position === 'bottom') {
    x = function (d, i) {
      return scale(d).toFixed(2); };
    y = (mg_get_bottom(args) + args.xax_tick_length * 7 / 3) + (xAxisTextElement.height * 0.8);
    dy = '.50em';
    textAnchor = 'middle';
    textFcn = function (d) {
      return yformat(new Date(d)); };
  }

  g.selectAll('.mg-year-marker')
    .data(years).enter()
    .append('text')
    .attr('x', x)
    .attr('y', y)
    .attr('dy', dy)
    .attr('text-anchor', textAnchor)
    .text(textFcn);
}

function addNumericalLabels (g, args, axisArgs) {
  var ns = axisArgs.namespace;
  var coords = labelPlacement(args, axisArgs);
  var ticks = args.processed[ns + '_ticks'];

  var labels = g.selectAll('.mg-yax-labels')
    .data(ticks).enter()
    .append('text')
    .attr('x', coords.x)
    .attr('dx', coords.dx)
    .attr('y', coords.y)
    .attr('dy', coords.dy)
    .attr('text-anchor', coords.textAnchor)
    .text(coords.text);

  // move the labels if they overlap
  if (ns == 'x') {
    selectXaxFormat(args);
    if (args.time_series && args.european_clock) {
      labels.append('tspan').classed('mg-european-hours', true).text(function (_d, i) {
        var d = new Date(_d);
        if (i === 0) return d3.timeFormat('%H')(d);
        else return '';
      });
      labels.append('tspan').classed('mg-european-minutes-seconds', true).text(function (_d, i) {
        var d = new Date(_d);
        return ':' + args.processed.xax_format(d);
      });
    } else {
      labels.text(function (d) {
        return args.xax_units + args.processed.xax_format(d);
      });
    }
    secondaryLabels(g, args, axisArgs);
  }

  if (mg_elements_are_overlapping(labels)) {
    labels.filter(function (d, i) {
      return (i + 1) % 2 === 0;
    }).remove();

    var svg = mg_get_svg_child_of(args.target);
    svg.selectAll('.mg-' + ns + 'ax-ticks').filter(function (d, i) {
      return (i + 1) % 2 === 0; })
      .remove();
  }
}

function addTickLines (g, args, axisArgs) {
  // name
  var ns = axisArgs.namespace;
  var position = axisArgs.position;
  var scale = args.scales[ns.toUpperCase()];

  var ticks = args.processed[ns + '_ticks'];
  var ticksClass = 'mg-' + ns + 'ax-ticks';
  var extendedTicksClass = 'mg-extended-' + ns + 'ax-ticks';
  var extendedTicks = args[ns + '_extended_ticks'];
  var tickLength = args[ns + 'ax_tick_length'];

  var x1, x2, y1, y2;

  if (position === 'left') {
    x1 = mg_get_left(args);
    x2 = extendedTicks ? mg_get_right(args) : mg_get_left(args) - tickLength;
    y1 = function (d) {
      return scale(d).toFixed(2);
    };
    y2 = function (d) {
      return scale(d).toFixed(2);
    };
  }
  if (position === 'right') {
    x1 = mg_get_right(args);
    x2 = extendedTicks ? mg_get_left(args) : mg_get_right(args) + tickLength;
    y1 = function (d) {
      return scale(d).toFixed(2);
    };
    y2 = function (d) {
      return scale(d).toFixed(2);
    };
  }
  if (position === 'top') {
    x1 = function (d) {
      return scale(d).toFixed(2);
    };
    x2 = function (d) {
      return scale(d).toFixed(2);
    };
    y1 = mg_get_top(args);
    y2 = extendedTicks ? mg_get_bottom(args) : mg_get_top(args) - tickLength;
  }
  if (position === 'bottom') {
    x1 = function (d) {
      return scale(d).toFixed(2);
    };
    x2 = function (d) {
      return scale(d).toFixed(2);
    };
    y1 = mg_get_bottom(args);
    y2 = extendedTicks ? mg_get_top(args) : mg_get_bottom(args) + tickLength;
  }

  g.selectAll('.' + ticksClass)
    .data(ticks).enter()
    .append('line')
    .classed(extendedTicksClass, extendedTicks)
    .attr('x1', x1)
    .attr('x2', x2)
    .attr('y1', y1)
    .attr('y2', y2);
}

function initializeAxisRim (g, args, axisArgs) {
  var namespace = axisArgs.namespace;
  var tick_length = args.processed[namespace + '_ticks'].length;

  var rim = rimPlacement(args, axisArgs);

  if (!args[namespace + '_extended_ticks'] && !args[namespace + '_extended_ticks'] && tick_length) {
    g.append('line')
      .attr('x1', rim.x1)
      .attr('x2', rim.x2)
      .attr('y1', rim.y1)
      .attr('y2', rim.y2);
  }
}

function initializeRug (args, rug_class) {
  var svg = mg_get_svg_child_of(args.target);
  var all_data = mg_flatten_array(args.data);
  var rug = svg.selectAll('line.' + rug_class).data(all_data);

  // set the attributes that do not change after initialization, per
  rug.enter().append('svg:line').attr('class', rug_class).attr('opacity', 0.3);

  // remove rug elements that are no longer in use
  mg_exit_and_remove(rug);

  // set coordinates of new rug elements
  mg_exit_and_remove(rug);
  return rug;
}

function rug (args, axisArgs) {
  'use strict';
  args.rug_buffer_size = args.chart_type === 'point' ? args.buffer / 2 : args.buffer * 2 / 3;

  var rug = initializeRug(args, 'mg-' + axisArgs.namespace + '-rug');
  var rug_positions = rugPlacement(args, axisArgs);
  rug.attr('x1', rug_positions.x1)
    .attr('x2', rug_positions.x2)
    .attr('y1', rug_positions.y1)
    .attr('y2', rug_positions.y2);

  mg_add_color_accessor_to_rug(rug, args, 'mg-' + axisArgs.namespace + '-rug-mono');
}

function categoricalLabelPlacement (args, axisArgs, group) {
  var ns = axisArgs.namespace;
  var position = axisArgs.position;
  var scale = args.scales[ns.toUpperCase()];
  var groupScale = args.scales[(ns + 'group').toUpperCase()];
  var coords = {};
  coords.cat = {};
  coords.group = {};
  // x, y, dy, text-anchor

  if (position === 'left') {
    coords.cat.x = mg_get_plot_left(args) - args.buffer;
    coords.cat.y = function (d) {
      return groupScale(group) + scale(d) + scale.bandwidth() / 2;
    };
    coords.cat.dy = '.35em';
    coords.cat.textAnchor = 'end';
    coords.group.x = mg_get_plot_left(args) - args.buffer;
    coords.group.y = groupScale(group) + (groupScale.bandwidth ? groupScale.bandwidth() / 2 : 0);
    coords.group.dy = '.35em';
    coords.group.textAnchor = args['rotate_' + ns + '_labels'] ? 'end' : 'end';
  }

  if (position === 'right') {
    coords.cat.x = mg_get_plot_right(args) - args.buffer;
    coords.cat.y = function (d) {
      return groupScale(group) + scale(d) + scale.bandwidth() / 2;
    };
    coords.cat.dy = '.35em';
    coords.cat.textAnchor = 'start';
    coords.group.x = mg_get_plot_right(args) - args.buffer;
    coords.group.y = groupScale(group) + (groupScale.bandwidth ? groupScale.bandwidth() / 2 : 0);
    coords.group.dy = '.35em';
    coords.group.textAnchor = 'start';
  }

  if (position === 'top') {
    coords.cat.x = function (d) {
      return groupScale(group) + scale(d) + scale.bandwidth() / 2;
    };
    coords.cat.y = mg_get_plot_top(args) + args.buffer;
    coords.cat.dy = '.35em';
    coords.cat.textAnchor = args['rotate_' + ns + '_labels'] ? 'start' : 'middle';
    coords.group.x = groupScale(group) + (groupScale.bandwidth ? groupScale.bandwidth() / 2 : 0);
    coords.group.y = mg_get_plot_top(args) + args.buffer;
    coords.group.dy = '.35em';
    coords.group.textAnchor = args['rotate_' + ns + '_labels'] ? 'start' : 'middle';
  }

  if (position === 'bottom') {
    coords.cat.x = function (d) {
      return groupScale(group) + scale(d) + scale.bandwidth() / 2;
    };
    coords.cat.y = mg_get_plot_bottom(args) + args.buffer;
    coords.cat.dy = '.35em';
    coords.cat.textAnchor = args['rotate_' + ns + '_labels'] ? 'start' : 'middle';
    coords.group.x = groupScale(group) + (groupScale.bandwidth ? groupScale.bandwidth() / 2 - scale.bandwidth() / 2 : 0);
    coords.group.y = mg_get_plot_bottom(args) + args.buffer;
    coords.group.dy = '.35em';
    coords.group.textAnchor = args['rotate_' + ns + '_labels'] ? 'start' : 'middle';
  }

  return coords;
}

function categoricalLabels (args, axisArgs) {
  var ns = axisArgs.namespace;
  var nsClass = 'mg-' + ns + '-axis';
  var scale = args.scales[ns.toUpperCase()];
  var groupScale = args.scales[(ns + 'group').toUpperCase()];
  var groupAccessor = ns + 'group_accessor';

  var svg = mg_get_svg_child_of(args.target);
  mg_selectAll_and_remove(svg, '.' + nsClass);
  var g = mg_add_g(svg, nsClass);
  var group_g;
  var groups = groupScale.domain && groupScale.domain()
    ? groupScale.domain()
    : ['1'];

  groups.forEach(function (group) {
    // grab group placement stuff.
    var coords = categoricalLabelPlacement(args, axisArgs, group);

    group_g = mg_add_g(g, 'mg-group-' + mg_normalize(group));
    if (args[groupAccessor] !== null) {
      var labels = group_g.append('text')
        .classed('mg-barplot-group-label', true)
        .attr('x', coords.group.x)
        .attr('y', coords.group.y)
        .attr('dy', coords.group.dy)
        .attr('text-anchor', coords.group.textAnchor)
        .text(group);

    } else {
      var labels = group_g.selectAll('text')
        .data(scale.domain())
        .enter()
        .append('text')
        .attr('x', coords.cat.x)
        .attr('y', coords.cat.y)
        .attr('dy', coords.cat.dy)
        .attr('text-anchor', coords.cat.textAnchor)
        .text(String);
    }
    if (args['rotate_' + ns + '_labels']) {
      rotateLabels(labels, args['rotate_' + ns + '_labels']);
    }
  });
}

function categoricalGuides (args, axisArgs) {
  // for each group
  // for each data point

  var ns = axisArgs.namespace;
  var scalef = args.scalefns[ns + 'f'];
  var groupf = args.scalefns[ns + 'groupf'];
  var groupScale = args.scales[(ns + 'group').toUpperCase()];
  var scale = args.scales[ns.toUpperCase()];
  var position = axisArgs.position;

  var svg = mg_get_svg_child_of(args.target);
  var alreadyPlotted = [];

  var x1, x2, y1, y2;
  var grs = (groupScale.domain && groupScale.domain()) ? groupScale.domain() : [null];

  mg_selectAll_and_remove(svg, '.mg-category-guides');
  var g = mg_add_g(svg, 'mg-category-guides');

  grs.forEach(function (group) {
    scale.domain().forEach(function (cat) {
      if (position === 'left' || position === 'right') {
        x1 = mg_get_plot_left(args);
        x2 = mg_get_plot_right(args);
        y1 = scale(cat) + groupScale(group) + scale.bandwidth() / 2;
        y2 = scale(cat) + groupScale(group) + scale.bandwidth() / 2;
      }

      if (position === 'top' || position === 'bottom') {
        x1 = scale(cat) + groupScale(group) + scale.bandwidth() / 2 * (group === null);
        x2 = scale(cat) + groupScale(group) + scale.bandwidth() / 2 * (group === null);
        y1 = mg_get_plot_bottom(args);
        y2 = mg_get_plot_top(args);
      }

      g.append('line')
        .attr('x1', x1)
        .attr('x2', x2)
        .attr('y1', y1)
        .attr('y2', y2)
        .attr('stroke-dasharray', '2,1');
    });

    var first = groupScale(group) + scale(scale.domain()[0]) + scale.bandwidth() / 2 * (group === null || (position !== 'top' && position != 'bottom'));
    var last = groupScale(group) + scale(scale.domain()[scale.domain().length - 1]) + scale.bandwidth() / 2 * (group === null || (position !== 'top' && position != 'bottom'));

    if (position === 'left' || position === 'right') {
      x11 = mg_get_plot_left(args);
      x21 = mg_get_plot_left(args);
      y11 = first;
      y21 = last;

      x12 = mg_get_plot_right(args);
      x22 = mg_get_plot_right(args);
      y12 = first;
      y22 = last;
    }

    if (position === 'bottom' || position === 'top') {
      x11 = first;
      x21 = last;
      y11 = mg_get_plot_bottom(args);
      y21 = mg_get_plot_bottom(args);

      x12 = first;
      x22 = last;
      y12 = mg_get_plot_top(args);
      y22 = mg_get_plot_top(args);
    }

    g.append('line')
      .attr('x1', x11)
      .attr('x2', x21)
      .attr('y1', y11)
      .attr('y2', y21)
      .attr('stroke-dasharray', '2,1');

    g.append('line')
      .attr('x1', x12)
      .attr('x2', x22)
      .attr('y1', y12)
      .attr('y2', y22)
      .attr('stroke-dasharray', '2,1');
  });
}

function rotateLabels (labels, rotation_degree) {
  if (rotation_degree) {
    labels.attr('transform', function () {
      var elem = d3.select(this);
      return 'rotate(' + rotation_degree + ' ' + elem.attr('x') + ',' + elem.attr('y') + ')';
    });

  }
}

function zeroLine (args, axisArgs) {
  var svg = mg_get_svg_child_of(args.target);
  var ns = axisArgs.namespace;
  var position = axisArgs.position;
  var scale = args.scales[ns.toUpperCase()];
  var x1, x2, y1, y2;
  if (position === 'left' || position === 'right') {
    x1 = mg_get_plot_left(args);
    x2 = mg_get_plot_right(args);
    y1 = scale(0) + 1;
    y2 = scale(0) + 1;
  }
  if (position === 'bottom' || position === 'top') {
    y1 = mg_get_plot_top(args);
    y2 = mg_get_plot_bottom(args);
    x1 = scale(0) - 1;
    x2 = scale(0) - 1;
  }

  svg.append('line')
    .attr('x1', x1)
    .attr('x2', x2)
    .attr('y1', y1)
    .attr('y2', y2)
    .attr('stroke', 'black');
}

var mgDrawAxis = {};

mgDrawAxis.categorical = function (args, axisArgs) {
  var ns = axisArgs.namespace;

  categoricalLabels(args, axisArgs);
  categoricalGuides(args, axisArgs);
};

mgDrawAxis.numerical = function (args, axisArgs) {
  var namespace = axisArgs.namespace;
  var axisName = namespace + '_axis';
  var axisClass = 'mg-' + namespace + '-axis';
  var svg = mg_get_svg_child_of(args.target);

  mg_selectAll_and_remove(svg, '.' + axisClass);

  if (!args[axisName]) {
    return this;
  }

  var g = mg_add_g(svg, axisClass);

  processScaleTicks(args, namespace);
  initializeAxisRim(g, args, axisArgs);
  addTickLines(g, args, axisArgs);
  addNumericalLabels(g, args, axisArgs);

  // add label
  if (args[namespace + '_label']) {
    axisArgs.label(svg.select('.mg-' + namespace + '-axis'), args);
  }

  // add rugs
  if (args[namespace + '_rug']) {
    rug(args, axisArgs);
  }

  if (args.show_bar_zero) {
    mg_bar_add_zero_line(args);
  }

  return this;
};

function axisFactory (args) {
  var axisArgs = {};
  axisArgs.type = 'numerical';

  this.namespace = function (ns) {
    // take the ns in the scale, and use it to
    axisArgs.namespace = ns;
    return this;
  };

  this.rug = function (tf) {
    axisArgs.rug = tf;
    return this;
  };

  this.label = function (tf) {
    axisArgs.label = tf;
    return this;
  };

  this.type = function (t) {
    axisArgs.type = t;
    return this;
  };

  this.position = function (pos) {
    axisArgs.position = pos;
    return this;
  };

  this.zeroLine = function (tf) {
    axisArgs.zeroLine = tf;
    return this;
  };

  this.draw = function () {
    mgDrawAxis[axisArgs.type](args, axisArgs);
    return this;
  };

  return this;

}

MG.axis_factory = axisFactory;

/* ================================================================================ */
/* ================================================================================ */
/* ================================================================================ */

function y_rug (args) {
  'use strict';

  if (!args.y_rug) {
    return;
  }

  args.rug_buffer_size = args.chart_type === 'point'
    ? args.buffer / 2
    : args.buffer * 2 / 3;

  var rug = mg_make_rug(args, 'mg-y-rug');

  rug.attr('x1', args.left + 1)
    .attr('x2', args.left + args.rug_buffer_size)
    .attr('y1', args.scalefns.yf)
    .attr('y2', args.scalefns.yf);

  mg_add_color_accessor_to_rug(rug, args, 'mg-y-rug-mono');
}

MG.y_rug = y_rug;

function mg_change_y_extents_for_bars (args, my) {
  if (args.chart_type === 'bar') {
    my.min = 0;
    my.max = d3.max(args.data[0], function (d) {
      var trio = [];
      trio.push(d[args.y_accessor]);

      if (args.baseline_accessor !== null) {
        trio.push(d[args.baseline_accessor]);
      }

      if (args.predictor_accessor !== null) {
        trio.push(d[args.predictor_accessor]);
      }

      return Math.max.apply(null, trio);
    });
  }
  return my;
}

function mg_compute_yax_format (args) {
  var yax_format = args.yax_format;
  if (!yax_format) {
    if (args.format === 'count') {
      // increase decimals if we have small values, useful for realtime data
      if (args.processed.max_y < 0.0001) {
        args.decimals = 6;
      } else if (args.processed.max_y < 0.1) {
        args.decimals = 4;
      }

      yax_format = function (d) {
        var pf;

        if (d < 1.0 && d > -1.0 && d !== 0) {
          // don't scale tiny values
          pf = d3.format(',.' + args.decimals + 'f');
        } else if (d < 1000) {
          pf = d3.format(',.0f');
        } else {
          pf = d3.format(',.2s');
        }

        // are we adding units after the value or before?
        if (args.yax_units_append) {
          return pf(d) + args.yax_units;
        } else {
          return args.yax_units + pf(d);
        }
      };
    } else { // percentage
      yax_format = function (d_) {
        var n = d3.format('.0%');
        return n(d_);
      };
    }
  }
  return yax_format;
}

function mg_bar_add_zero_line (args) {
  var svg = mg_get_svg_child_of(args.target);
  var extents = args.scales.X.domain();
  if (0 >= extents[0] && extents[1] >= 0) {
    var r = args.scales.Y.range();
    var g = args.categorical_groups.length
      ? args.scales.YGROUP(args.categorical_groups[args.categorical_groups.length - 1])
      : args.scales.YGROUP();

    svg.append('svg:line')
      .attr('x1', args.scales.X(0))
      .attr('x2', args.scales.X(0))
      .attr('y1', r[0] + mg_get_plot_top(args))
      .attr('y2', r[r.length - 1] + g)
      .attr('stroke', 'black')
      .attr('opacity', .2);
  }
}

function mg_y_domain_range (args, scale) {
  scale.domain([args.processed.min_y, args.processed.max_y])
    .range([mg_get_plot_bottom(args), args.top]);
  return scale;
}

function mg_define_y_scales (args) {
  var scale = (mg_is_function(args.y_scale_type))
    ? args.y_scale_type()
    : (args.y_scale_type === 'log')
      ? d3.scaleLog()
      : d3.scaleLinear();

  if (args.y_scale_type === 'log') {
    if (args.chart_type === 'histogram') {
      // log histogram plots should start just below 1
      // so that bins with single counts are visible
      args.processed.min_y = 0.2;
    } else {
      if (args.processed.min_y <= 0) {
        args.processed.min_y = 1;
      }
    }
  }
  args.scales.Y = mg_y_domain_range(args, scale);
  args.scales.Y.clamp(args.y_scale_type === 'log');

  // used for ticks and such, and designed to be paired with log or linear
  args.scales.Y_axis = mg_y_domain_range(args, d3.scaleLinear());
}

function mg_add_y_label (g, args) {
  if (args.y_label) {
    g.append('text')
      .attr('class', 'label')
      .attr('x', function () {
        return -1 * (mg_get_plot_top(args) +
        ((mg_get_plot_bottom(args)) - (mg_get_plot_top(args))) / 2);
      })
      .attr('y', function () {
        return args.left / 2;
      })
      .attr('dy', '0.4em')
      .attr('text-anchor', 'middle')
      .text(function (d) {
        return args.y_label;
      })
      .attr('transform', function (d) {
        return 'rotate(-90)';
      });
  }
}

function mg_add_y_axis_rim (g, args) {
  var tick_length = args.processed.y_ticks.length;
  if (!args.x_extended_ticks && !args.y_extended_ticks && tick_length) {
    var y1scale, y2scale;

    if (args.axes_not_compact && args.chart_type !== 'bar') {
      y1scale = args.height - args.bottom;
      y2scale = args.top;
    } else if (tick_length) {
      y1scale = args.scales.Y(args.processed.y_ticks[0]).toFixed(2);
      y2scale = args.scales.Y(args.processed.y_ticks[tick_length - 1]).toFixed(2);
    } else {
      y1scale = 0;
      y2scale = 0;
    }

    g.append('line')
      .attr('x1', args.left)
      .attr('x2', args.left)
      .attr('y1', y1scale)
      .attr('y2', y2scale);
  }
}

function mg_add_y_axis_tick_lines (g, args) {
  g.selectAll('.mg-yax-ticks')
    .data(args.processed.y_ticks).enter()
    .append('line')
    .classed('mg-extended-yax-ticks', args.y_extended_ticks)
    .attr('x1', args.left)
    .attr('x2', function () {
      return (args.y_extended_ticks) ? args.width - args.right : args.left - args.yax_tick_length;
    })
    .attr('y1', function (d) {
      return args.scales.Y(d).toFixed(2);
    })
    .attr('y2', function (d) {
      return args.scales.Y(d).toFixed(2);
    });
}

function mg_add_y_axis_tick_labels (g, args) {
  var yax_format = mg_compute_yax_format(args);
  g.selectAll('.mg-yax-labels')
    .data(args.processed.y_ticks).enter()
    .append('text')
    .attr('x', args.left - args.yax_tick_length * 3 / 2)
    .attr('dx', -3)
    .attr('y', function (d) {
      return args.scales.Y(d).toFixed(2);
    })
    .attr('dy', '.35em')
    .attr('text-anchor', 'end')
    .text(function (d) {
      var o = yax_format(d);
      return o;
    });
}

// TODO ought to be deprecated, only used by histogram
function y_axis (args) {
  if (!args.processed) {
    args.processed = {};
  }

  var svg = mg_get_svg_child_of(args.target);
  MG.call_hook('y_axis.process_min_max', args, args.processed.min_y, args.processed.max_y);
  mg_selectAll_and_remove(svg, '.mg-y-axis');

  if (!args.y_axis) {
    return this;
  }

  var g = mg_add_g(svg, 'mg-y-axis');
  mg_add_y_label(g, args);
  mg_process_scale_ticks(args, 'y');
  mg_add_y_axis_rim(g, args);
  mg_add_y_axis_tick_lines(g, args);
  mg_add_y_axis_tick_labels(g, args);

  if (args.y_rug) {
    y_rug(args);
  }

  return this;
}

MG.y_axis = y_axis;

function mg_add_categorical_labels (args) {
  var svg = mg_get_svg_child_of(args.target);
  mg_selectAll_and_remove(svg, '.mg-y-axis');
  var g = mg_add_g(svg, 'mg-y-axis');
  var group_g;(args.categorical_groups.length ? args.categorical_groups : ['1']).forEach(function (group) {
    group_g = mg_add_g(g, 'mg-group-' + mg_normalize(group));

    if (args.ygroup_accessor !== null) {
      mg_add_group_label(group_g, group, args);
    } else {
      var labels = mg_add_graphic_labels(group_g, group, args);
      mg_rotate_labels(labels, args.rotate_y_labels);
    }
  });
}

function mg_add_graphic_labels (g, group, args) {
  return g.selectAll('text').data(args.scales.Y.domain()).enter().append('svg:text')
    .attr('x', args.left - args.buffer)
    .attr('y', function (d) {
      return args.scales.YGROUP(group) + args.scales.Y(d) + args.scales.Y.bandwidth() / 2;
    })
    .attr('dy', '.35em')
    .attr('text-anchor', 'end')
    .text(String);
}

function mg_add_group_label (g, group, args) {
  g.append('svg:text')
    .classed('mg-barplot-group-label', true)
    .attr('x', args.left - args.buffer)
    .attr('y', args.scales.YGROUP(group) + args.scales.YGROUP.bandwidth() / 2)
    .attr('dy', '.35em')
    .attr('text-anchor', 'end')
    .text(group);
}

function mg_draw_group_lines (args) {
  var svg = mg_get_svg_child_of(args.target);
  var groups = args.scales.YGROUP.domain();
  var first = groups[0];
  var last = groups[groups.length - 1];

  svg.select('.mg-category-guides').selectAll('mg-group-lines')
    .data(groups)
    .enter().append('line')
      .attr('x1', mg_get_plot_left(args))
      .attr('x2', mg_get_plot_left(args))
      .attr('y1', function (d) {
        return args.scales.YGROUP(d);
      })
      .attr('y2', function (d) {
        return args.scales.YGROUP(d) + args.ygroup_height;
      })
      .attr('stroke-width', 1);
}

function mg_y_categorical_show_guides (args) {
  // for each group
  // for each data point
  var svg = mg_get_svg_child_of(args.target);
  var alreadyPlotted = [];
  args.data[0].forEach(function (d) {
    if (alreadyPlotted.indexOf(d[args.y_accessor]) === -1) {
      svg.select('.mg-category-guides').append('line')
        .attr('x1', mg_get_plot_left(args))
        .attr('x2', mg_get_plot_right(args))
        .attr('y1', args.scalefns.yf(d) + args.scalefns.ygroupf(d))
        .attr('y2', args.scalefns.yf(d) + args.scalefns.ygroupf(d))
        .attr('stroke-dasharray', '2,1');
    }
  });
}

function y_axis_categorical (args) {
  if (!args.y_axis) {
    return this;
  }

  mg_add_categorical_labels(args);
  // mg_draw_group_scaffold(args);
  if (args.show_bar_zero) mg_bar_add_zero_line(args);
  if (args.ygroup_accessor) mg_draw_group_lines(args);
  if (args.y_categorical_show_guides) mg_y_categorical_show_guides(args);
  return this;
}

MG.y_axis_categorical = y_axis_categorical;

function x_rug(args) {
  'use strict';

  if(!args.x_rug) {
    return;
  }

  args.rug_buffer_size = args.chart_type === 'point'
    ? args.buffer / 2
    : args.buffer;

  var rug = mg_make_rug(args, 'mg-x-rug');

  rug.attr('x1', args.scalefns.xf)
    .attr('x2', args.scalefns.xf)
    .attr('y1', args.height - args.bottom - args.rug_buffer_size)
    .attr('y2', args.height - args.bottom);

  mg_add_color_accessor_to_rug(rug, args, 'mg-x-rug-mono');
}

MG.x_rug = x_rug;

function mg_add_processed_object(args) {
  if (!args.processed) {
    args.processed = {};
  }
}

// TODO ought to be deprecated, only used by histogram
function x_axis(args) {
  'use strict';

  var svg = mg_get_svg_child_of(args.target);
  mg_add_processed_object(args);

  mg_select_xax_format(args);
  mg_selectAll_and_remove(svg, '.mg-x-axis');

  if (!args.x_axis) {
    return this;
  }

  var g = mg_add_g(svg, 'mg-x-axis');

  mg_add_x_ticks(g, args);
  mg_add_x_tick_labels(g, args);
  if (args.x_label) { mg_add_x_label(g, args); }
  if (args.x_rug) { x_rug(args); }

  return this;
}

MG.x_axis = x_axis;

function x_axis_categorical(args) {
  var svg = mg_get_svg_child_of(args.target);
  var additional_buffer = 0;
  if (args.chart_type === 'bar') {
    additional_buffer = args.buffer + 5;
  }

  mg_add_categorical_scale(args, 'X', args.categorical_variables.reverse(), args.left, mg_get_plot_right(args) - additional_buffer);
  mg_add_scale_function(args, 'xf', 'X', 'value');
  mg_selectAll_and_remove(svg, '.mg-x-axis');

  var g = mg_add_g(svg, 'mg-x-axis');

  if (!args.x_axis) {
    return this;
  }

  mg_add_x_axis_categorical_labels(g, args, additional_buffer);
  return this;
}

function mg_add_x_axis_categorical_labels(g, args, additional_buffer) {
  var labels = g.selectAll('text')
    .data(args.categorical_variables)
    .enter()
    .append('text');

  labels
    .attr('x', function(d) {
      return args.scales.X(d) + args.scales.X.bandwidth() / 2 + (args.buffer) * args.bar_outer_padding_percentage + (additional_buffer / 2);
    })
    .attr('y', mg_get_plot_bottom(args))
    .attr('dy', '.35em')
    .attr('text-anchor', 'middle')
    .text(String);

  if (args.truncate_x_labels) {
    labels.each(function(d, idx) {
      var elem = this, width = args.scales.X.bandwidth();
      truncate_text(elem, d, width);
    });
  }
  mg_rotate_labels(labels, args.rotate_x_labels);
}

MG.x_axis_categorical = x_axis_categorical;

function mg_point_add_color_scale(args) {
  var color_domain, color_range;

  if (args.color_accessor !== null) {
    color_domain = mg_get_color_domain(args);
    color_range = mg_get_color_range(args);

    if (args.color_type === 'number') {
      args.scales.color = d3.scaleLinear()
        .domain(color_domain)
        .range(color_range)
        .clamp(true);
    } else {
      args.scales.color = args.color_range !== null
        ? d3.scaleOrdinal().range(color_range)
        : (color_domain.length > 10
          ? d3.scaleOrdinal(d3.schemeCategory20)
          : d3.scaleOrdinal(d3.schemeCategory10));

      args.scales.color.domain(color_domain);
    }
    mg_add_scale_function(args, 'color', 'color', args.color_accessor);
  }
}

function mg_get_color_domain(args) {
  var color_domain;
  if (args.color_domain === null) {
    if (args.color_type === 'number') {
      color_domain = d3.extent(args.data[0], function(d) {
        return d[args.color_accessor];
      });
    } else if (args.color_type === 'category') {
      color_domain = d3.set(args.data[0]
          .map(function(d) {
            return d[args.color_accessor];
        }))
        .values();

      color_domain.sort();
    }
  } else {
    color_domain = args.color_domain;
  }
  return color_domain;
}

function mg_get_color_range(args) {
  var color_range;
  if (args.color_range === null) {
    if (args.color_type === 'number') {
      color_range = ['blue', 'red'];
    } else {
      color_range = null;
    }
  } else {
    color_range = args.color_range;
  }
  return color_range;
}

function mg_point_add_size_scale(args) {
  var min_size, max_size, size_domain, size_range;
  if (args.size_accessor !== null) {
    size_domain = mg_get_size_domain(args);
    size_range = mg_get_size_range(args);

    args.scales.size = d3.scaleLinear()
      .domain(size_domain)
      .range(size_range)
      .clamp(true);

    mg_add_scale_function(args, 'size', 'size', args.size_accessor);
  }
}

function mg_get_size_domain(args) {
  return (args.size_domain === null)
    ? d3.extent(args.data[0], function(d) { return d[args.size_accessor]; })
    : args.size_domain;
}

function mg_get_size_range(args) {
  var size_range;
  if (args.size_range === null) {
    size_range = [1, 5];
  } else {
    size_range = args.size_range;
  }
  return size_range;
}

function mg_add_x_label(g, args) {
  if (args.x_label) {
    g.append('text')
      .attr('class', 'label')
      .attr('x', function() {
        return mg_get_plot_left(args) + (mg_get_plot_right(args) - mg_get_plot_left(args)) / 2;
      })
      .attr('dx', args.x_label_nudge_x != null ? args.x_label_nudge_x : 0)
      .attr('y', function() {
        var xAxisTextElement = d3.select(args.target)
          .select('.mg-x-axis text').node().getBoundingClientRect();
        return mg_get_bottom(args) + args.xax_tick_length * (7 / 3) + xAxisTextElement.height * 0.8 + 10;
      })
      .attr('dy', '.5em')
      .attr('text-anchor', 'middle')
      .text(function(d) {
        return args.x_label;
      });
  }
}

function mg_default_bar_xax_format(args) {
  return function(d) {
    if (d < 1.0 && d > -1.0 && d !== 0) {
      // don't scale tiny values
      return args.xax_units + d.toFixed(args.decimals);
    } else {
      var pf = d3.format(',.0f');
      return args.xax_units + pf(d);
    }
  };
}

function mg_get_time_frame(diff) {
  // diff should be (max_x - min_x) / 1000, in other words, the difference in seconds.
  var time_frame;
  if (mg_milisec_diff(diff)) {
    time_frame = 'millis';
  } else if (mg_sec_diff(diff)) {
    time_frame = 'seconds';
  } else if (mg_day_diff(diff)) {
    time_frame = 'less-than-a-day';
  } else if (mg_four_days(diff)) {
    time_frame = 'four-days';
  } else if (mg_many_days(diff)) { // a handful of months?
    time_frame = 'many-days';
  } else if (mg_many_months(diff)) {
    time_frame = 'many-months';
  } else if (mg_years(diff)) {
    time_frame = 'years';
  } else {
    time_frame = 'default';
  }
  return time_frame;
}

function mg_milisec_diff(diff) {
  return diff < 10;
}

function mg_sec_diff(diff) {
  return diff < 60;
}

function mg_day_diff(diff) {
  return diff / (60 * 60) <= 24;
}

function mg_four_days(diff) {
  return diff / (60 * 60) <= 24 * 4;
}

function mg_many_days(diff) {
  return diff / (60 * 60 * 24) <= 93;
}

function mg_many_months(diff) {
  return diff / (60 * 60 * 24) < 365 * 2;
}

function mg_years(diff) {
  return diff / (60 * 60 * 24) >= 365 * 2;
}

function mg_get_time_format(utc, diff) {
  var main_time_format;
  if (mg_milisec_diff(diff)) {
    main_time_format = MG.time_format(utc, '%M:%S.%L');
  } else if (mg_sec_diff(diff)) {
    main_time_format = MG.time_format(utc, '%M:%S');
  } else if (mg_day_diff(diff)) {
    main_time_format = MG.time_format(utc, '%H:%M');
  } else if (mg_four_days(diff)) {
    main_time_format = MG.time_format(utc, '%H:%M');
  } else if (mg_many_days(diff)) {
    main_time_format = MG.time_format(utc, '%b %d');
  } else if (mg_many_months(diff)) {
    main_time_format = MG.time_format(utc, '%b');
  } else {
    main_time_format = MG.time_format(utc, '%Y');
  }
  return main_time_format;
}

function mg_process_time_format(args) {
  var diff;
  var main_time_format;
  var time_frame;

  if (args.time_series) {
    diff = (args.processed.max_x - args.processed.min_x) / 1000;
    time_frame = mg_get_time_frame(diff);
    main_time_format = mg_get_time_format(args.utc_time, diff);
  }

  args.processed.main_x_time_format = main_time_format;
  args.processed.x_time_frame = time_frame;
}

function mg_default_xax_format(args) {
  if (args.xax_format) {
    return args.xax_format;
  }

  var data = args.processed.original_data || args.data;
  var flattened = mg_flatten_array(data)[0];
  var test_point_x = flattened[args.processed.original_x_accessor || args.x_accessor];
  if (test_point_x === undefined) {
    test_point_x = flattened;
  }

  return function(d) {
    mg_process_time_format(args);

    if (mg_is_date(test_point_x)) {
      return args.processed.main_x_time_format(new Date(d));
    } else if (typeof test_point_x === 'number') {
      var is_float = d % 1 !== 0;
      var pf;

      if (is_float) {
        pf = d3.format(',.' + args.decimals + 'f');
      } else if (d < 1000) {
        pf = d3.format(',.0f');
      } else {
        pf = d3.format(',.2s');
      }
      return args.xax_units + pf(d);
    } else {
      return args.xax_units + d;
    }
  };
}

function mg_add_x_ticks(g, args) {
  mg_process_scale_ticks(args, 'x');
  mg_add_x_axis_rim(args, g);
  mg_add_x_axis_tick_lines(args, g);
}

function mg_add_x_axis_rim(args, g) {
  var tick_length = args.processed.x_ticks.length;
  var last_i = args.scales.X.ticks(args.xax_count).length - 1;

  if (!args.x_extended_ticks) {
    g.append('line')
      .attr('x1', function() {
        if (args.xax_count === 0) {
          return mg_get_plot_left(args);
        } else if (args.axes_not_compact && args.chart_type !== 'bar') {
          return args.left;
        } else {
          return (args.scales.X(args.scales.X.ticks(args.xax_count)[0])).toFixed(2);
        }
      })
      .attr('x2', function() {
        if (args.xax_count === 0 || (args.axes_not_compact && args.chart_type !== 'bar')) {
          return mg_get_right(args);
        } else {
          return args.scales.X(args.scales.X.ticks(args.xax_count)[last_i]).toFixed(2);
        }
      })
      .attr('y1', args.height - args.bottom)
      .attr('y2', args.height - args.bottom);
  }
}

function mg_add_x_axis_tick_lines(args, g) {
  g.selectAll('.mg-xax-ticks')
    .data(args.processed.x_ticks).enter()
    .append('line')
    .attr('x1', function(d) {
      return args.scales.X(d).toFixed(2); })
    .attr('x2', function(d) {
      return args.scales.X(d).toFixed(2); })
    .attr('y1', args.height - args.bottom)
    .attr('y2', function() {
      return (args.x_extended_ticks) ? args.top : args.height - args.bottom + args.xax_tick_length;
    })
    .attr('class', function() {
      if (args.x_extended_ticks) {
        return 'mg-extended-xax-ticks';
      }
    })
    .classed('mg-xax-ticks', true);
}

function mg_add_x_tick_labels(g, args) {
  mg_add_primary_x_axis_label(args, g);
  mg_add_secondary_x_axis_label(args, g);
}

function mg_add_primary_x_axis_label(args, g) {
  var labels = g.selectAll('.mg-xax-labels')
    .data(args.processed.x_ticks).enter()
    .append('text')
    .attr('x', function(d) {
      return args.scales.X(d).toFixed(2);
    })
    .attr('y', (args.height - args.bottom + args.xax_tick_length * 7 / 3).toFixed(2))
    .attr('dy', '.50em')
    .attr('text-anchor', 'middle');

  if (args.time_series && args.european_clock) {
    labels.append('tspan').classed('mg-european-hours', true).text(function(_d, i) {
      var d = new Date(_d);
      if (i === 0) return d3.timeFormat('%H')(d);
      else return '';
    });
    labels.append('tspan').classed('mg-european-minutes-seconds', true).text(function(_d, i) {
      var d = new Date(_d);
      return ':' + args.processed.xax_format(d);
    });
  } else {
    labels.text(function(d) {
      return args.xax_units + args.processed.xax_format(d);
    });
  }

  // CHECK TO SEE IF OVERLAP for labels. If so,
  // remove half of them. This is a dirty hack.
  // We will need to figure out a more principled way of doing this.
  if (mg_elements_are_overlapping(labels)) {
    labels.filter(function(d, i) {
      return (i + 1) % 2 === 0;
    }).remove();

    var svg = mg_get_svg_child_of(args.target);
    svg.selectAll('.mg-xax-ticks')
      .filter(function(d, i) {
        return (i + 1) % 2 === 0;
      })
      .remove();
  }
}

function mg_add_secondary_x_axis_label(args, g) {
  if (args.time_series && (args.show_years || args.show_secondary_x_label)) {
    var tf = mg_get_yformat_and_secondary_time_function(args);
    mg_add_secondary_x_axis_elements(args, g, tf.timeframe, tf.yformat, tf.secondary);
  }
}

function mg_get_yformat_and_secondary_time_function(args) {
  var tf = {};
  tf.timeframe = args.processed.x_time_frame;
  switch (tf.timeframe) {
    case 'millis':
    case 'seconds':
      tf.secondary = d3.timeDays;
      if (args.european_clock) tf.yformat = MG.time_format(args.utc_time, '%b %d');
      else tf.yformat = MG.time_format(args.utc_time, '%I %p');
      break;
    case 'less-than-a-day':
      tf.secondary = d3.timeDays;
      tf.yformat = MG.time_format(args.utc_time, '%b %d');
      break;
    case 'four-days':
      tf.secondary = d3.timeDays;
      tf.yformat = MG.time_format(args.utc_time, '%b %d');
      break;
    case 'many-days':
      tf.secondary = d3.timeYears;
      tf.yformat = MG.time_format(args.utc_time, '%Y');
      break;
    case 'many-months':
      tf.secondary = d3.timeYears;
      tf.yformat = MG.time_format(args.utc_time, '%Y');
      break;
    default:
      tf.secondary = d3.timeYears;
      tf.yformat = MG.time_format(args.utc_time, '%Y');
  }
  return tf;
}

function mg_add_secondary_x_axis_elements(args, g, time_frame, yformat, secondary_function) {
  var years = secondary_function(args.processed.min_x, args.processed.max_x);
  if (years.length === 0) {
    var first_tick = args.scales.X.ticks(args.xax_count)[0];
    years = [first_tick];
  }

  var yg = mg_add_g(g, 'mg-year-marker');
  if (time_frame === 'default' && args.show_year_markers) {
    mg_add_year_marker_line(args, yg, years, yformat);
  }
  if (time_frame != 'years') mg_add_year_marker_text(args, yg, years, yformat);
}

function mg_add_year_marker_line(args, g, years, yformat) {
  g.selectAll('.mg-year-marker')
    .data(years).enter()
    .append('line')
    .attr('x1', function(d) {
      return args.scales.X(d).toFixed(2);
    })
    .attr('x2', function(d) {
      return args.scales.X(d).toFixed(2);
    })
    .attr('y1', mg_get_top(args))
    .attr('y2', mg_get_bottom(args));
}

function mg_add_year_marker_text(args, g, years, yformat) {
  g.selectAll('.mg-year-marker')
    .data(years).enter()
    .append('text')
    .attr('x', function(d, i) {
      return args.scales.X(d).toFixed(2);
    })
    .attr('y', function() {
      var xAxisTextElement = d3.select(args.target)
        .select('.mg-x-axis text').node().getBoundingClientRect();
      return (mg_get_bottom(args) + args.xax_tick_length * 7 / 3) + (xAxisTextElement.height * 0.8);
    })
    .attr('dy', '.50em')
    .attr('text-anchor', 'middle')
    .text(function(d) {
      return yformat(new Date(d));
    });
}

function mg_min_max_x_for_nonbars(mx, args, data) {
  var extent_x = d3.extent(data, function(d) {
    return d[args.x_accessor];
  });
  mx.min = extent_x[0];
  mx.max = extent_x[1];
}

function mg_min_max_x_for_bars(mx, args, data) {
  mx.min = d3.min(data, function(d) {
    var trio = [
      d[args.x_accessor],
      (d[args.baseline_accessor]) ? d[args.baseline_accessor] : 0,
      (d[args.predictor_accessor]) ? d[args.predictor_accessor] : 0
    ];
    return Math.min.apply(null, trio);
  });

  if (mx.min > 0) mx.min = 0;

  mx.max = d3.max(data, function(d) {
    var trio = [
      d[args.x_accessor],
      (d[args.baseline_accessor]) ? d[args.baseline_accessor] : 0,
      (d[args.predictor_accessor]) ? d[args.predictor_accessor] : 0
    ];
    return Math.max.apply(null, trio);
  });
  return mx;
}

function mg_min_max_x_for_dates(mx) {
  var yesterday = MG.clone(mx.min).setDate(mx.min.getDate() - 1);
  var tomorrow = MG.clone(mx.min).setDate(mx.min.getDate() + 1);
  mx.min = yesterday;
  mx.max = tomorrow;
}

function mg_min_max_x_for_numbers(mx) {
  // TODO do we want to rewrite this?
  mx.min = mx.min - 1;
  mx.max = mx.max + 1;
}

function mg_min_max_x_for_strings(mx) {
  // TODO shouldn't be allowing strings here to be coerced into numbers
  mx.min = Number(mx.min) - 1;
  mx.max = Number(mx.max) + 1;
}

function mg_force_xax_count_to_be_two(args) {
  args.xax_count = 2;
}

function mg_sort_through_data_type_and_set_x_min_max_accordingly(mx, args, data) {
  if (args.chart_type === 'line' || args.chart_type === 'point' || args.chart_type === 'histogram') {
    mg_min_max_x_for_nonbars(mx, args, data);

  } else if (args.chart_type === 'bar') {
    mg_min_max_x_for_bars(mx, args, data);
  }
  // if data set is of length 1, expand the range so that we can build the x-axis
  if (mx.min === mx.max && !(args.min_x && args.max_x)) {
    if (mg_is_date(mx.min)) {
      mg_min_max_x_for_dates(mx);
    } else if (typeof min_x === 'number') {
      mg_min_max_x_for_numbers(mx);
    } else if (typeof min_x === 'string') {
      mg_min_max_x_for_strings(mx);
    }
    // force xax_count to be 2
    mg_force_xax_count_to_be_two(args);
  }
}

function mg_select_xax_format(args) {
  var c = args.chart_type;
  if (!args.processed.xax_format) {
    if (args.xax_format) {
      args.processed.xax_format = args.xax_format;
    } else {
      if (c === 'line' || c === 'point' || c === 'histogram') {
        args.processed.xax_format = mg_default_xax_format(args);
      } else if (c === 'bar') {
        args.processed.xax_format = mg_default_bar_xax_format(args);
      }
    }
  }
}

function mg_merge_args_with_defaults(args) {
  var defaults = {
    target: null,
    title: null,
    description: null
  };

  if (!args) {
    args = {};
  }

  if (!args.processed) {
    args.processed = {};
  }

  args = merge_with_defaults(args, defaults);
  return args;
}

function mg_is_time_series(args) {
  var first_elem = mg_flatten_array(args.processed.original_data || args.data)[0];
  args.time_series = mg_is_date(first_elem[args.processed.original_x_accessor || args.x_accessor]);
}

function mg_init_compute_width(args) {
  var svg_width = parseInt(args.width);
  if (args.full_width) {
    svg_width = get_width(args.target);
  }
  if (args.x_axis_type === 'categorical' && svg_width === null) {
    svg_width = mg_categorical_calculate_height(args, 'x');
  }

  args.width = svg_width;
}

function mg_init_compute_height(args) {
  var svg_height = parseInt(args.height);
  if (args.full_height) {
    svg_height = get_height(args.target);
  }
  if (args.y_axis_type === 'categorical' && svg_height === null) {
    svg_height = mg_categorical_calculate_height(args, 'y');
  }

  args.height = svg_height;
}

function mg_remove_svg_if_chart_type_has_changed(svg, args) {
  if ((!svg.selectAll('.mg-main-line').empty() && args.chart_type !== 'line') ||
    (!svg.selectAll('.mg-points').empty() && args.chart_type !== 'point') ||
    (!svg.selectAll('.mg-histogram').empty() && args.chart_type !== 'histogram') ||
    (!svg.selectAll('.mg-barplot').empty() && args.chart_type !== 'bar')
  ) {
    svg.remove();
  }
}

function mg_add_svg_if_it_doesnt_exist(svg, args) {
  if (mg_get_svg_child_of(args.target).empty()) {
    svg = d3.select(args.target)
      .append('svg')
      .classed('linked', args.linked)
      .attr('width', args.width)
      .attr('height', args.height);
  }
  return svg;
}

function mg_add_clip_path_for_plot_area(svg, args) {
  svg.selectAll('.mg-clip-path').remove();
  svg.append('defs')
    .attr('class', 'mg-clip-path')
    .append('clipPath')
    .attr('id', 'mg-plot-window-' + mg_target_ref(args.target))
    .append('svg:rect')
    .attr('x', mg_get_left(args))
    .attr('y', mg_get_top(args))
    .attr('width', args.width - args.left - args.right - args.buffer)
    .attr('height', args.height - args.top - args.bottom - args.buffer + 1);
}

function mg_adjust_width_and_height_if_changed(svg, args) {
  if (args.width !== Number(svg.attr('width'))) {
    svg.attr('width', args.width);
  }
  if (args.height !== Number(svg.attr('height'))) {
    svg.attr('height', args.height);
  }
}

function mg_set_viewbox_for_scaling(svg, args) {
  // we need to reconsider how we handle automatic scaling
  svg.attr('viewBox', '0 0 ' + args.width + ' ' + args.height);
  if (args.full_width || args.full_height) {
    svg.attr('preserveAspectRatio', 'xMinYMin meet');
  }
}

function mg_remove_missing_classes_and_text(svg) {
  // remove missing class
  svg.classed('mg-missing', false);

  // remove missing text
  svg.selectAll('.mg-missing-text').remove();
  svg.selectAll('.mg-missing-pane').remove();
}

function mg_remove_outdated_lines(svg, args) {
  // if we're updating an existing chart and we have fewer lines than
  // before, remove the outdated lines, e.g. if we had 3 lines, and we're calling
  // data_graphic() on the same target with 2 lines, remove the 3rd line

  var i = 0;

  if (svg.selectAll('.mg-main-line').nodes().length >= args.data.length) {
    // now, the thing is we can't just remove, say, line3 if we have a custom
    // line-color map, instead, see which are the lines to be removed, and delete those
    if (args.custom_line_color_map.length > 0) {
      var array_full_series = function(len) {
        var arr = new Array(len);
        for (var i = 0; i < arr.length; i++) { arr[i] = i + 1; }
        return arr;
      };

      // get an array of lines ids to remove
      var lines_to_remove = arr_diff(
        array_full_series(args.max_data_size),
        args.custom_line_color_map);

      for (i = 0; i < lines_to_remove.length; i++) {
        svg.selectAll('.mg-main-line.mg-line' + lines_to_remove[i] + '-color')
          .remove();
      }
    } else {
      // if we don't have a custom line-color map, just remove the lines from the end
      var num_of_new = args.data.length;
      var num_of_existing = (svg.selectAll('.mg-main-line').nodes()) ? svg.selectAll('.mg-main-line').nodes().length : 0;

      for (i = num_of_existing; i > num_of_new; i--) {
        svg.selectAll('.mg-main-line.mg-line' + i + '-color')
          .remove();
      }
    }
  }
}

function mg_raise_container_error(container, args) {
  if (container.empty()) {
    console.warn('The specified target element "' + args.target + '" could not be found in the page. The chart will not be rendered.');
    return;
  }
}

function categoricalInitialization(args, ns) {
  var which = ns === 'x' ? args.width : args.height;
  mg_categorical_count_number_of_groups(args, ns);
  mg_categorical_count_number_of_lanes(args, ns);
  mg_categorical_calculate_group_length(args, ns, which);
  if (which) mg_categorical_calculate_bar_thickness(args, ns);
}


function mg_categorical_count_number_of_groups(args, ns) {
  var accessor_string = ns + 'group_accessor';
  var accessor = args[accessor_string];
  args.categorical_groups = [];
  if (accessor) {
    var data = args.data[0];
    args.categorical_groups = d3.set(data.map(function(d) {
      return d[accessor] })).values();
  }
}

function mg_categorical_count_number_of_lanes(args, ns) {
  var accessor_string = ns + 'group_accessor';
  var groupAccessor = args[accessor_string];

  args.total_bars = args.data[0].length;
  if (groupAccessor) {
    var group_bars = count_array_elements(pluck(args.data[0], groupAccessor));
    group_bars = d3.max(Object.keys(group_bars).map(function(d) {
      return group_bars[d] }));
    args.bars_per_group = group_bars;
  } else {
    args.bars_per_group = args.data[0].length;
  }
}

function mg_categorical_calculate_group_length(args, ns, which) {
  var groupHeight = ns + 'group_height';
  if (which) {
    var gh = ns === 'y' ?
      (args.height - args.top - args.bottom - args.buffer * 2) / (args.categorical_groups.length || 1) :
      (args.width - args.left - args.right - args.buffer * 2) / (args.categorical_groups.length || 1);

    args[groupHeight] = gh;
  } else {
    var step = (1 + args[ns + '_padding_percentage']) * args.bar_thickness;
    args[groupHeight] = args.bars_per_group * step + args[ns + '_outer_padding_percentage'] * 2 * step; //args.bar_thickness + (((args.bars_per_group-1) * args.bar_thickness) * (args.bar_padding_percentage + args.bar_outer_padding_percentage*2));
  }
}

function mg_categorical_calculate_bar_thickness(args, ns) {
  // take one group height.
  var step = (args[ns + 'group_height']) / (args.bars_per_group + args[ns + '_outer_padding_percentage']);
  args.bar_thickness = step - (step * args[ns + '_padding_percentage']);
}

function mg_categorical_calculate_height(args, ns) {
  var groupContribution = (args[ns + 'group_height']) * (args.categorical_groups.length || 1);

  var marginContribution = ns === 'y'
    ? args.top + args.bottom + args.buffer * 2
    : args.left + args.right + args.buffer * 2;

  return groupContribution + marginContribution +
    (args.categorical_groups.length * args[ns + 'group_height'] * (args[ns + 'group_padding_percentage'] + args[ns + 'group_outer_padding_percentage']));
}

function mg_barchart_extrapolate_group_and_thickness_from_height(args) {
  // we need to set args.bar_thickness, group_height
}

function init(args) {
  'use strict';
  args = arguments[0];
  args = mg_merge_args_with_defaults(args);
  // If you pass in a dom element for args.target, the expectation
  // of a string elsewhere will break.
  var container = d3.select(args.target);
  mg_raise_container_error(container, args);

  var svg = container.selectAll('svg');

  // some things that will need to be calculated if we have a categorical axis.
  if (args.y_axis_type === 'categorical') { categoricalInitialization(args, 'y'); }
  if (args.x_axis_type === 'categorical') { categoricalInitialization(args, 'x'); }

  mg_is_time_series(args);
  mg_init_compute_width(args);
  mg_init_compute_height(args);

  mg_remove_svg_if_chart_type_has_changed(svg, args);
  svg = mg_add_svg_if_it_doesnt_exist(svg, args);

  mg_add_clip_path_for_plot_area(svg, args);
  mg_adjust_width_and_height_if_changed(svg, args);
  mg_set_viewbox_for_scaling(svg, args);
  mg_remove_missing_classes_and_text(svg);
  chart_title(args);
  mg_remove_outdated_lines(svg, args);

  return this;
}

MG.init = init;

function mg_return_label(d) {
  return d.label;
}

function mg_remove_existing_markers(svg) {
  svg.selectAll('.mg-markers').remove();
  svg.selectAll('.mg-baselines').remove();
}

function mg_in_range(args) {
  return function(d) {
    return (args.scales.X(d[args.x_accessor]) >= mg_get_plot_left(args)) && (args.scales.X(d[args.x_accessor]) <= mg_get_plot_right(args));
  };
}

function mg_x_position(args) {
  return function(d) {
    return args.scales.X(d[args.x_accessor]);
  };
}

function mg_x_position_fixed(args) {
  var _mg_x_pos = mg_x_position(args);
  return function(d) {
    return _mg_x_pos(d).toFixed(2);
  };
}

function mg_y_position_fixed(args) {
  var _mg_y_pos = args.scales.Y;
  return function(d) {
    return _mg_y_pos(d.value).toFixed(2);
  };
}

function mg_place_annotations(checker, class_name, args, svg, line_fcn, text_fcn) {
  var g;
  if (checker) {
    g = svg.append('g').attr('class', class_name);
    line_fcn(g, args);
    text_fcn(g, args);
  }
}

function mg_place_markers(args, svg) {
  mg_place_annotations(args.markers, 'mg-markers', args, svg, mg_place_marker_lines, mg_place_marker_text);
}

function mg_place_baselines(args, svg) {
  mg_place_annotations(args.baselines, 'mg-baselines', args, svg, mg_place_baseline_lines, mg_place_baseline_text);
}

function mg_place_marker_lines(gm, args) {
  var x_pos_fixed = mg_x_position_fixed(args);
  gm.selectAll('.mg-markers')
    .data(args.markers.filter(mg_in_range(args)))
    .enter()
    .append('line')
    .attr('x1', x_pos_fixed)
    .attr('x2', x_pos_fixed)
    .attr('y1', args.top)
    .attr('y2', mg_get_plot_bottom(args))
    .attr('class', function(d) {
      return d.lineclass;
    })
    .attr('stroke-dasharray', '3,1');
}

function mg_place_marker_text(gm, args) {
  gm.selectAll('.mg-markers')
    .data(args.markers.filter(mg_in_range(args)))
    .enter()
    .append('text')
      .attr('class', function(d) {
        return d.textclass || ''; })
      .classed('mg-marker-text', true)
      .attr('x', mg_x_position(args))
      .attr('y', args.x_axis_position === 'bottom' ? mg_get_top(args) * 0.95 : mg_get_bottom(args) + args.buffer)
      .attr('text-anchor', 'middle')
      .text(mg_return_label)
      .each(function(d) {
        if (d.click) {
          d3.select(this).style('cursor', 'pointer')
            .on('click', d.click);
        }
        if (d.mouseover) {
          d3.select(this).style('cursor', 'pointer')
            .on('mouseover', d.mouseover);
        }
        if (d.mouseout) {
            d3.select(this).style('cursor', 'pointer')
                .on('mouseout', d.mouseout);
        }
      });

  mg_prevent_horizontal_overlap(gm.selectAll('.mg-marker-text').nodes(), args);
}

function mg_place_baseline_lines(gb, args) {
  var y_pos = mg_y_position_fixed(args);
  gb.selectAll('.mg-baselines')
    .data(args.baselines)
    .enter().append('line')
    .attr('x1', mg_get_plot_left(args))
    .attr('x2', mg_get_plot_right(args))
    .attr('y1', y_pos)
    .attr('y2', y_pos);
}

function mg_place_baseline_text(gb, args) {
  var y_pos = mg_y_position_fixed(args);
  gb.selectAll('.mg-baselines')
    .data(args.baselines)
    .enter().append('text')
    .attr('x', mg_get_plot_right(args))
    .attr('y', y_pos)
    .attr('dy', -3)
    .attr('text-anchor', 'end')
    .text(mg_return_label);
}

function markers(args) {
  'use strict';

  var svg = mg_get_svg_child_of(args.target);
  mg_remove_existing_markers(svg);
  mg_place_markers(args, svg);
  mg_place_baselines(args, svg);
  return this;
}

MG.markers = markers;

function mg_clear_mouseover_container(svg) {
  svg.selectAll('.mg-active-datapoint-container').selectAll('*').remove();
}

function mg_setup_mouseover_container(svg, args) {
  svg.select('.mg-active-datapoint').remove();
  var text_anchor = args.mouseover_align === 'right'
    ? 'end'
    : (args.mouseover_align === 'left'
      ? 'start'
      : 'middle');

  var mouseover_x = (args.mouseover_align === 'right')
    ? mg_get_plot_right(args)
    : (args.mouseover_align === 'left'
      ? mg_get_plot_left(args)
      : (args.width - args.left - args.right) / 2 + args.left);

  var active_datapoint = svg.select('.mg-active-datapoint-container')
    .append('text')
    .attr('class', 'mg-active-datapoint')
    .attr('xml:space', 'preserve')
    .attr('text-anchor', text_anchor);

  // set the rollover text's position; if we have markers on two lines,
  // nudge up the rollover text a bit
  var active_datapoint_y_nudge = 0.75;

  var y_position = (args.x_axis_position === 'bottom')
    ? mg_get_top(args) * active_datapoint_y_nudge
    : mg_get_bottom(args) + args.buffer * 3;

  if (args.markers) {
    var yPos;
    svg.selectAll('.mg-marker-text')
      .each(function() {
        if (!yPos) {
          yPos = d3.select(this).attr('y');
        } else if (yPos !== d3.select(this).attr('y')) {
          active_datapoint_y_nudge = 0.56;
        }
      });
  }

  active_datapoint
    .attr('transform', 'translate(' + mouseover_x + ',' + (y_position) + ')');
}

function mg_mouseover_tspan(svg, text) {
  var tspan = '';
  var cl = null;
  if (arguments.length === 3) cl = arguments[2];
  tspan = svg.append('tspan').text(text);
  if (cl !== null) tspan.classed(cl, true);
  this.tspan = tspan;

  this.bold = function() {
    this.tspan.attr('font-weight', 'bold');
    return this;
  };

  this.font_size = function(pts) {
    this.tspan.attr('font-size', pts);
    return this;
  }

  this.x = function(x) {
    this.tspan.attr('x', x);
    return this;
  };
  this.y = function(y) {
    this.tspan.attr('y', y);
    return this;
  };
  this.elem = function() {
    return this.tspan;
  };
  return this;
}

function mg_reset_text_container(svg) {
  var textContainer = svg.select('.mg-active-datapoint');
  textContainer
    .selectAll('*')
    .remove();
  return textContainer;
}

function mg_mouseover_row(row_number, container, rargs) {
  var lineHeight = 1.1;
  this.rargs = rargs;

  var rrr = container.append('tspan')
    .attr('x', 0)
    .attr('y', (row_number * lineHeight) + 'em');

  this.text = function(text) {
    return mg_mouseover_tspan(rrr, text);
  }
  return this;
}

function mg_mouseover_text(args, rargs) {
  var lineHeight = 1.1;
  this.row_number = 0;
  this.rargs = rargs;
  mg_setup_mouseover_container(rargs.svg, args);

  this.text_container = mg_reset_text_container(rargs.svg);

  this.mouseover_row = function(rargs) {
    var that = this;
    var rrr = mg_mouseover_row(that.row_number, that.text_container, rargs);
    that.row_number += 1;
    return rrr;
  }

  return this;
}

function MG_WindowResizeTracker() {
  var targets = [];

  var Observer;
  if (typeof MutationObserver !== "undefined") {
    Observer = MutationObserver;
  } else if (typeof WebKitMutationObserver !== "undefined") {
    Observer = WebKitMutationObserver;
  }

  function window_listener() {
    targets.forEach(function(target) {
      var svg = d3.select(target).select('svg');

      // skip if svg is not visible
      if (!svg.empty() && (svg.node().parentNode.offsetWidth > 0 || svg.node().parentNode.offsetHeight > 0)) {
        var aspect = svg.attr('width') !== 0 ? (svg.attr('height') / svg.attr('width')) : 0;

        var newWidth = get_width(target);

        svg.attr('width', newWidth);
        svg.attr('height', aspect * newWidth);
      }
    });
  }

  function remove_target(target) {
    var index = targets.indexOf(target);
    if (index !== -1) {
      targets.splice(index, 1);
    }

    if (targets.length === 0) {
      window.removeEventListener('resize', window_listener, true);
    }
  }

  return {
    add_target: function(target) {
      if (targets.length === 0) {
        window.addEventListener('resize', window_listener, true);
      }

      if (targets.indexOf(target) === -1) {
        targets.push(target);

        if (Observer) {
          var observer = new Observer(function(mutations) {
            var targetNode = d3.select(target).node();

            if (!targetNode || mutations.some(
                function(mutation) {
                  for (var i = 0; i < mutation.removedNodes.length; i++) {
                    if (mutation.removedNodes[i] === targetNode) {
                      return true;
                    }
                  }
                })) {
              observer.disconnect();
              remove_target(target);
            }
          });

          observer.observe(d3.select(target).node().parentNode, { childList: true });
        }
      }
    }
  };
}

var mg_window_resize_tracker = new MG_WindowResizeTracker();

function mg_window_listeners(args) {
  mg_if_aspect_ratio_resize_svg(args);
}

function mg_if_aspect_ratio_resize_svg(args) {
  // have we asked the svg to fill a div, if so resize with div
  if (args.full_width || args.full_height) {
    mg_window_resize_tracker.add_target(args.target);
  }
}

if (mg_jquery_exists()) {
    /*!
     * Bootstrap v3.3.1 (http://getbootstrap.com)
     * Copyright 2011-2014 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     */

    /*!
     * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=c3834cc5b59ef727da53)
     * Config saved to config.json and https://gist.github.com/c3834cc5b59ef727da53
     */

    /* ========================================================================
     * Bootstrap: dropdown.js v3.3.1
     * http://getbootstrap.com/javascript/#dropdowns
     * ========================================================================
     * Copyright 2011-2014 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */


    +function ($) {
      'use strict';

      if(typeof $().dropdown == 'function')
        return true;

      // DROPDOWN CLASS DEFINITION
      // =========================

      var backdrop = '.dropdown-backdrop';
      var toggle   = '[data-toggle="dropdown"]';
      var Dropdown = function (element) {
        $(element).on('click.bs.dropdown', this.toggle);
      };

      Dropdown.VERSION = '3.3.1';

      Dropdown.prototype.toggle = function (e) {
        var $this = $(this);

        if ($this.is('.disabled, :disabled')) return;

        var $parent  = getParent($this);
        var isActive = $parent.hasClass('open');

        clearMenus();

        if (!isActive) {
          if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
            // if mobile we use a backdrop because click events don't delegate
            $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus);
          }

          var relatedTarget = { relatedTarget: this };
          $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));

          if (e.isDefaultPrevented()) return;

          $this
            .trigger('focus')
            .attr('aria-expanded', 'true');

          $parent
            .toggleClass('open')
            .trigger('shown.bs.dropdown', relatedTarget);
        }

        return false;
      };

      Dropdown.prototype.keydown = function (e) {
        if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;

        var $this = $(this);

        e.preventDefault();
        e.stopPropagation();

        if ($this.is('.disabled, :disabled')) return;

        var $parent  = getParent($this);
        var isActive = $parent.hasClass('open');

        if ((!isActive && e.which != 27) || (isActive && e.which == 27)) {
          if (e.which == 27) $parent.find(toggle).trigger('focus');
          return $this.trigger('click');
        }

        var desc = ' li:not(.divider):visible a';
        var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc);

        if (!$items.length) return;

        var index = $items.index(e.target);

        if (e.which == 38 && index > 0)                 index--;                        // up
        if (e.which == 40 && index < $items.length - 1) index++;                        // down
        if (!~index)                                      index = 0;

        $items.eq(index).trigger('focus');
      };

      function clearMenus(e) {
        if (e && e.which === 3) return;
        $(backdrop).remove();
        $(toggle).each(function () {
          var $this         = $(this);
          var $parent       = getParent($this);
          var relatedTarget = { relatedTarget: this };

          if (!$parent.hasClass('open')) return;

          $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));

          if (e.isDefaultPrevented()) return;

          $this.attr('aria-expanded', 'false');
          $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget);
        });
      }

      function getParent($this) {
        var selector = $this.attr('data-target');

        if (!selector) {
          selector = $this.attr('href');
          selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
        }

        var $parent = selector && $(selector);

        return $parent && $parent.length ? $parent : $this.parent();
      }


      // DROPDOWN PLUGIN DEFINITION
      // ==========================

      function Plugin(option) {
        return this.each(function () {
          var $this = $(this);
          var data  = $this.data('bs.dropdown');

          if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)));
          if (typeof option == 'string') data[option].call($this);
        });
      }

      var old = $.fn.dropdown;

      $.fn.dropdown             = Plugin;
      $.fn.dropdown.Constructor = Dropdown;


      // DROPDOWN NO CONFLICT
      // ====================

      $.fn.dropdown.noConflict = function () {
        $.fn.dropdown = old;
        return this;
      };


      // APPLY TO STANDARD DROPDOWN ELEMENTS
      // ===================================

      $(document)
        .on('click.bs.dropdown.data-api', clearMenus)
        .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation(); })
        .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
        .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
        .on('keydown.bs.dropdown.data-api', '[role="menu"]', Dropdown.prototype.keydown)
        .on('keydown.bs.dropdown.data-api', '[role="listbox"]', Dropdown.prototype.keydown);

    }(jQuery);
}

MG.button_layout = function(target) {
  'use strict';
  this.target = target;
  this.feature_set = {};
  this.public_name = {};
  this.sorters = {};
  this.manual = [];
  this.manual_map = {};
  this.manual_callback = {};

  this._strip_punctuation = function(s) {
    var punctuationless = s.replace(/[^a-zA-Z0-9 _]+/g, '');
    var finalString = punctuationless.replace(/ +?/g, '');
    return finalString;
  };

  this.data = function(data) {
    this._data = data;
    return this;
  };

  this.manual_button = function(feature, feature_set, callback) {
    this.feature_set[feature] = feature_set;
    this.manual_map[this._strip_punctuation(feature)] = feature;
    this.manual_callback[feature] = callback; // the default is going to be the first feature.
    return this;
  };

  this.button = function(feature) {
    if (arguments.length > 1) {
      this.public_name[feature] = arguments[1];
    }

    if (arguments.length > 2) {
      this.sorters[feature] = arguments[2];
    }

    this.feature_set[feature] = [];
    return this;
  };

  this.callback = function(callback) {
    this._callback = callback;
    return this;
  };

  this.display = function() {
    var callback = this._callback;
    var manual_callback = this.manual_callback;
    var manual_map = this.manual_map;

    var d, f, features, feat;
    features = Object.keys(this.feature_set);

    var mapDtoF = function(f) {
      return d[f]; };

    var i;

    // build out this.feature_set with this.data
    for (i = 0; i < this._data.length; i++) {
      d = this._data[i];
      f = features.map(mapDtoF);
      for (var j = 0; j < features.length; j++) {
        feat = features[j];
        if (this.feature_set[feat].indexOf(f[j]) === -1) {
          this.feature_set[feat].push(f[j]);
        }
      }
    }

    for (feat in this.feature_set) {
      if (this.sorters.hasOwnProperty(feat)) {
        this.feature_set[feat].sort(this.sorters[feat]);
      }
    }

    $(this.target).empty();

    $(this.target).append("<div class='col-lg-12 segments text-center'></div>");

    var dropdownLiAClick = function() {
      var k = $(this).data('key');
      var feature = $(this).data('feature');
      var manual_feature;
      $('.' + feature + '-btns button.btn span.title').html(k);
      if (!manual_map.hasOwnProperty(feature)) {
        callback(feature, k);
      } else {
        manual_feature = manual_map[feature];
        manual_callback[manual_feature](k);
      }

      return false;
    };

    for (var feature in this.feature_set) {
      features = this.feature_set[feature];
      $(this.target + ' div.segments').append(
        '<div class="btn-group ' + this._strip_punctuation(feature) + '-btns text-left">' + // This never changes.
        '<button type="button" class="btn btn-default btn-lg dropdown-toggle" data-toggle="dropdown">' +
        "<span class='which-button'>" + (this.public_name.hasOwnProperty(feature) ? this.public_name[feature] : feature) + "</span>" +
        "<span class='title'>" + (this.manual_callback.hasOwnProperty(feature) ? this.feature_set[feature][0] : 'all') + "</span>" + // if a manual button, don't default to all in label.
        '<span class="caret"></span>' +
        '</button>' +
        '<ul class="dropdown-menu" role="menu">' +
        (!this.manual_callback.hasOwnProperty(feature) ? '<li><a href="#" data-feature="' + feature + '" data-key="all">All</a></li>' : "") +
        (!this.manual_callback.hasOwnProperty(feature) ? '<li class="divider"></li>' : "") +
        '</ul>' + '</div>');

      for (i = 0; i < features.length; i++) {
        if (features[i] !== 'all' && features[i] !== undefined) { // strange bug with undefined being added to manual buttons.
          $(this.target + ' div.' + this._strip_punctuation(feature) + '-btns ul.dropdown-menu').append(
            '<li><a href="#" data-feature="' + this._strip_punctuation(feature) + '" data-key="' + features[i] + '">' + features[i] + '</a></li>'
          );
        }
      }

      $('.' + this._strip_punctuation(feature) + '-btns .dropdown-menu li a').on('click', dropdownLiAClick);
    }

    return this;
  };

  return this;
};

(function() {
  'use strict';

  function mg_line_color_text(elem, d, args) {
    elem.classed('mg-hover-line-color', args.color === null)
      .classed('mg-hover-line' + d.line_id + '-color', args.colors === null)
      .attr('fill', args.colors === null ? '' : args.colors[d.line_id - 1]);
  }

  function mg_line_graph_generators(args, plot, svg) {
    mg_add_line_generator(args, plot);
    mg_add_area_generator(args, plot);
    mg_add_flat_line_generator(args, plot);
    mg_add_confidence_band_generator(args, plot, svg);
  }

  function mg_add_confidence_band_generator(args, plot, svg) {
    plot.existing_band = svg.selectAll('.mg-confidence-band').nodes();
    if (args.show_confidence_band) {
      plot.confidence_area = d3.area()
        .defined(plot.line.defined())
        .x(args.scalefns.xf)
        .y0(function(d) {
          var l = args.show_confidence_band[0];
          if (d[l] != undefined) {
            return args.scales.Y(d[l]);
          } else {
            return args.scales.Y(d[args.y_accessor]);
          }
        })
        .y1(function(d) {
          var u = args.show_confidence_band[1];
          if (d[u] != undefined) {
            return args.scales.Y(d[u]);
          } else {
            return args.scales.Y(d[args.y_accessor]);
          }
        })
        .curve(args.interpolate);
    }
  }

  function mg_add_area_generator(args, plot) {
    plot.area = d3.area()
      .defined(plot.line.defined())
      .x(args.scalefns.xf)
      .y0(args.scales.Y.range()[0])
      .y1(args.scalefns.yf)
      .curve(args.interpolate);
  }

  function mg_add_flat_line_generator(args, plot) {
    plot.flat_line = d3.line()
      .defined(function(d) {
        return (d['_missing'] === undefined || d['_missing'] !== true) && d[args.y_accessor] !== null;
      })
      .x(args.scalefns.xf)
      .y(function() {
        return args.scales.Y(plot.data_median); })
      .curve(args.interpolate);
  }

  function mg_add_line_generator(args, plot) {
    plot.line = d3.line()
      .x(args.scalefns.xf)
      .y(args.scalefns.yf)
      .curve(args.interpolate);

    // if missing_is_zero is not set, then hide data points that fall in missing
    // data ranges or that have been explicitly identified as missing in the
    // data source.
    if (!args.missing_is_zero) {
      // a line is defined if the _missing attrib is not set to true
      // and the y-accessor is not null
      plot.line = plot.line.defined(function(d) {
        return (d['_missing'] === undefined || d['_missing'] !== true) && d[args.y_accessor] !== null;
      });
    }
  }

  function mg_add_confidence_band(args, plot, svg, which_line) {
    if (args.show_confidence_band) {
      var confidenceBand;
      if (svg.select('.mg-confidence-band-' + which_line).empty()) {
        svg.append('path')
          .attr('class', 'mg-confidence-band mg-confidence-band-' + which_line)
      }

      // transition this line's confidence band
      confidenceBand = svg.select('.mg-confidence-band-' + which_line);

      confidenceBand
        .transition()
        .duration(function() {
          return (args.transition_on_update) ? 1000 : 0;
        })
        .attr('d', plot.confidence_area(args.data[which_line - 1]))
        .attr('clip-path', 'url(#mg-plot-window-' + mg_target_ref(args.target) + ')')
    }
  }

  function mg_add_area(args, plot, svg, which_line, line_id) {
    var areas = svg.selectAll('.mg-main-area.mg-area' + line_id);
    if (plot.display_area) {
      // if area already exists, transition it
      if (!areas.empty()) {
        svg.node().appendChild(areas.node());

        areas.transition()
          .duration(plot.update_transition_duration)
          .attr('d', plot.area(args.data[which_line]))
          .attr('clip-path', 'url(#mg-plot-window-' + mg_target_ref(args.target) + ')');
      } else { // otherwise, add the area
        svg.append('path')
          .classed('mg-main-area', true)
          .classed('mg-area' + line_id, true)
          .classed('mg-area-color', args.colors === null)
          .classed('mg-area' + line_id + '-color', args.colors === null)
          .attr('d', plot.area(args.data[which_line]))
          .attr('fill', args.colors === null ? '' : args.colors[line_id - 1])
          .attr('clip-path', 'url(#mg-plot-window-' + mg_target_ref(args.target) + ')');
      }
    } else if (!areas.empty()) {
      areas.remove();
    }
  }

  function mg_default_color_for_path(this_path, line_id) {
    this_path.classed('mg-line-color', true)
             .classed('mg-line' + (line_id) + '-color', true);
  }

  function mg_color_line(args, this_path, which_line, line_id) {
    if (args.colors) {
      // for now, if args.colors is not an array, then keep moving as if nothing happened.
      // if args.colors is not long enough, default to the usual line_id color.
      if (args.colors.constructor === Array) {
        this_path.attr('stroke', args.colors[which_line]);
        if (args.colors.length < which_line + 1) {
          // Go with default coloring.
          // this_path.classed('mg-line' + (line_id) + '-color', true);
          mg_default_color_for_path(this_path, line_id);
        }
      } else {
        // this_path.classed('mg-line' + (line_id) + '-color', true);
        mg_default_color_for_path(this_path, line_id);
      }
    } else {
      // this is the typical workflow
      // this_path.classed('mg-line' + (line_id) + '-color', true);
      mg_default_color_for_path(this_path, line_id);
    }
  }

  function mg_add_line_element(args, plot, this_path, which_line) {
    if (args.animate_on_load) {
      plot.data_median = d3.median(args.data[which_line], function(d) {
        return d[args.y_accessor]; });
      this_path.attr('d', plot.flat_line(args.data[which_line]))
        .transition()
        .duration(1000)
        .attr('d', plot.line(args.data[which_line]))
        .attr('clip-path', 'url(#mg-plot-window-' + mg_target_ref(args.target) + ')');
    } else { // or just add the line
      this_path.attr('d', plot.line(args.data[which_line]))
        .attr('clip-path', 'url(#mg-plot-window-' + mg_target_ref(args.target) + ')');
    }
  }

  function mg_add_line(args, plot, svg, existing_line, which_line, line_id) {
    if (!existing_line.empty()) {
      svg.node().appendChild(existing_line.node());

      var lineTransition = existing_line.transition()
        .duration(plot.update_transition_duration);

      if (!plot.display_area && args.transition_on_update && !args.missing_is_hidden) {
        lineTransition.attrTween('d', path_tween(plot.line(args.data[which_line]), 4));
      } else {
        lineTransition.attr('d', plot.line(args.data[which_line]));
      }
    } else { // otherwise...
      // if we're animating on load, animate the line from its median value
      var this_path = svg.append('path')
        .attr('class', 'mg-main-line mg-line' + line_id);

      mg_color_line(args, this_path, which_line, line_id);
      mg_add_line_element(args, plot, this_path, which_line);
    }
  }

  function mg_add_legend_element(args, plot, which_line, line_id) {
    var this_legend;
    if (args.legend) {
      if (is_array(args.legend)) {
        this_legend = args.legend[which_line];
      } else if (is_function(args.legend)) {
        this_legend = args.legend(args.data[which_line]);
      }

      if (args.legend_target) {
        if (args.colors && args.colors.constructor === Array) {
          plot.legend_text = "<span style='color:" + args.colors[which_line] + "'>&mdash; " +
            this_legend + '&nbsp; </span>' + plot.legend_text;
        } else {
          plot.legend_text = "<span class='mg-line" + line_id + "-legend-color'>&mdash; " +
            this_legend + '&nbsp; </span>' + plot.legend_text;
        }
      } else {
        var anchor_point, anchor_orientation, dx;
        if (args.y_axis_position === 'left') {
          anchor_point = args.data[which_line][args.data[which_line].length - 1];
          anchor_orientation = 'start';
          dx = args.buffer;
        } else {
          anchor_point = args.data[which_line][0];
          anchor_orientation = 'end';
          dx = -args.buffer;
        }
        var legend_text = plot.legend_group.append('svg:text')
          .attr('x', args.scalefns.xf(anchor_point))
          .attr('dx', dx)
          .attr('y', args.scalefns.yf(anchor_point))
          .attr('dy', '.35em')
          .attr('font-size', 10)
          .attr('text-anchor', anchor_orientation)
          .attr('font-weight', '300')
          .text(this_legend);

        if (args.colors && args.colors.constructor === Array) {
          if (args.colors.length < which_line + 1) {
            legend_text.classed('mg-line' + (line_id) + '-legend-color', true);
          } else {
            legend_text.attr('fill', args.colors[which_line]);
          }
        } else {
          legend_text.classed('mg-line-legend-color', true)
            .classed('mg-line' + (line_id) + '-legend-color', true);
        }

        mg_prevent_vertical_overlap(plot.legend_group.selectAll('.mg-line-legend text').nodes(), args);
      }
    }
  }

  function mg_plot_legend_if_legend_target(target, legend) {
    if (target) {
      d3.select(target).html(legend);
    }
  }

  function mg_add_legend_group(args, plot, svg) {
    if (args.legend) plot.legend_group = mg_add_g(svg, 'mg-line-legend');
  }

  function mg_remove_existing_line_rollover_elements(svg) {
    // remove the old rollovers if they already exist
    mg_selectAll_and_remove(svg, '.mg-rollover-rect');
    mg_selectAll_and_remove(svg, '.mg-voronoi');

    // remove the old rollover text and circle if they already exist
    mg_selectAll_and_remove(svg, '.mg-active-datapoint');
    mg_selectAll_and_remove(svg, '.mg-line-rollover-circle');
    //mg_selectAll_and_remove(svg, '.mg-active-datapoint-container');
  }

  function mg_add_rollover_circle(args, svg) {
    // append circle
    var circle = svg.selectAll('.mg-line-rollover-circle')
      .data(args.data)
      .enter().append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 0);

    if (args.colors && args.colors.constructor === Array) {
      circle
        .attr('class', function(d) {
          return 'mg-line' + d.line_id;
        })
        .attr('fill', function(d, i) {
          return args.colors[i];
        })
        .attr('stroke', function(d, i) {
          return args.colors[i];
        });
    } else {
      circle.attr('class', function(d, i) {
        return [
          'mg-line' + d.line_id,
          'mg-line' + d.line_id + '-color',
          'mg-area' + d.line_id + '-color'
        ].join(' ');
      });
    }
    circle.classed('mg-line-rollover-circle', true);
  }

  function mg_set_unique_line_id_for_each_series(args) {
    // update our data by setting a unique line id for each series
    // increment from 1... unless we have a custom increment series
    var line_id = 1;
    for (var i = 0; i < args.data.length; i++) {
      for (var j = 0; j < args.data[i].length; j++) {
        // Index is saved as original line id for the legend values
        args.data[i][j].index = line_id;
        // if custom line-color map is set, use that instead of line_id (For colors)
        if (args.custom_line_color_map.length > 0) {
          args.data[i][j].line_id = args.custom_line_color_map[i];
        } else {
          args.data[i][j].line_id = line_id;
        }
      }
      line_id++;
    }
  }

  function mg_nest_data_for_voronoi(args) {
    return d3.merge(args.data);
  }

  function mg_line_class_string(args) {
    return function(d) {
      var class_string;

      if (args.linked) {
        var v = d[args.x_accessor];
        var formatter = MG.time_format(args.utc_time, args.linked_format);

        // only format when x-axis is date
        var id = (typeof v === 'number') ? (d.line_id - 1) : formatter(v);
        class_string = 'roll_' + id + ' mg-line' + d.line_id;

        if (args.color === null) {
          class_string += ' mg-line' + d.line_id + '-color';
        }
        return class_string;

      } else {
        class_string = 'mg-line' + d.line_id;
        if (args.color === null) class_string += ' mg-line' + d.line_id + '-color';
        return class_string;
      }
    };
  }

  function mg_add_voronoi_rollover(args, svg, rollover_on, rollover_off, rollover_move, rollover_click) {
    var voronoi = d3.voronoi()
      .x(function(d) {
        return args.scales.X(d[args.x_accessor]).toFixed(2); })
      .y(function(d) {
        return args.scales.Y(d[args.y_accessor]).toFixed(2); })
      .extent([
        [args.buffer, args.buffer + args.title_y_position],
        [args.width - args.buffer, args.height - args.buffer]
      ]);

    var g = mg_add_g(svg, 'mg-voronoi');
    g.selectAll('path')
      .data(voronoi.polygons(mg_nest_data_for_voronoi(args)))
      .enter()
      .append('path')
      .filter(function(d) {
        return d !== undefined && d.length > 0; })
      .attr('d', function(d) {
        return d == null ? null : 'M' + d.join('L') + 'Z'; })
      .datum(function(d) {
        return d == null ? null : d.data; }) // because of d3.voronoi, reassign d
      .attr('class', mg_line_class_string(args))
      .on('click', rollover_click)
      .on('mouseover', rollover_on)
      .on('mouseout', rollover_off)
      .on('mousemove', rollover_move);

    mg_configure_voronoi_rollover(args, svg);
  }

  function nest_data_for_aggregate_rollover(args) {
    var data_nested = d3.nest()
      .key(function(d) {
        return d[args.x_accessor]; })
      .entries(d3.merge(args.data));
    data_nested.forEach(function(entry) {
      var datum = entry.values[0];
      entry.key = datum[args.x_accessor];
    });

    if (args.x_sort) {
      return data_nested.sort(function(a, b) {
        return new Date(a.key) - new Date(b.key); });
    } else {
      return data_nested;
    }
  }

  function mg_add_aggregate_rollover(args, svg, rollover_on, rollover_off, rollover_move, rollover_click) {
    // Undo the keys getting coerced to strings, by setting the keys from the values
    // This is necessary for when we have X axis keys that are things like
    var data_nested = nest_data_for_aggregate_rollover(args);

    var xf = data_nested.map(function(di) {
      return args.scales.X(di.key);
    });

    var g = svg.append('g')
      .attr('class', 'mg-rollover-rect');

    g.selectAll('.mg-rollover-rects')
      .data(data_nested).enter()
      .append('rect')
      .attr('x', function(d, i) {
        if (xf.length === 1) return mg_get_plot_left(args);
        else if (i === 0) return xf[i].toFixed(2);
        else return ((xf[i - 1] + xf[i]) / 2).toFixed(2);
      })
      .attr('y', args.top)
      .attr('width', function(d, i) {
        if (xf.length === 1) return mg_get_plot_right(args);
        else if (i === 0) return ((xf[i + 1] - xf[i]) / 2).toFixed(2);
        else if (i === xf.length - 1) return ((xf[i] - xf[i - 1]) / 2).toFixed(2);
        else return ((xf[i + 1] - xf[i - 1]) / 2).toFixed(2);
      })
      .attr('class', function(d) {
        var line_classes = d.values.map(function(datum) {
          var lc = mg_line_class(datum.line_id);
          if (args.colors === null) lc += ' ' + mg_line_color_class(datum.line_id);
          return lc;
        }).join(' ');
        if (args.linked && d.values.length > 0) {
          line_classes += ' ' + mg_rollover_id_class(mg_rollover_format_id(d.values[0], args));
        }

        return line_classes;
      })
      .attr('height', args.height - args.bottom - args.top - args.buffer)
      .attr('opacity', 0)
      .on('click', rollover_click)
      .on('mouseover', rollover_on)
      .on('mouseout', rollover_off)
      .on('mousemove', rollover_move);

    mg_configure_aggregate_rollover(args, svg);
  }

  function mg_configure_singleton_rollover(args, svg) {
    svg.select('.mg-rollover-rect rect')
      .on('mouseover')(args.data[0][0], 0);
  }

  function mg_configure_voronoi_rollover(args, svg) {
    for (var i = 0; i < args.data.length; i++) {
      var j = i + 1;

      if (args.custom_line_color_map.length > 0 &&
        args.custom_line_color_map[i] !== undefined) {
        j = args.custom_line_color_map[i];
      }

      if (args.data[i].length === 1 && !svg.selectAll('.mg-voronoi .mg-line' + j).empty()) {
        svg.selectAll('.mg-voronoi .mg-line' + j)
          .on('mouseover')(args.data[i][0], 0);

        svg.selectAll('.mg-voronoi .mg-line' + j)
          .on('mouseout')(args.data[i][0], 0);
      }
    }
  }

  function mg_line_class(line_id) {
    return 'mg-line' + line_id;
  }

  function mg_line_color_class(line_id) {
    return 'mg-line' + line_id + '-color';
  }

  function mg_rollover_id_class(id) {
    return 'roll_' + id;
  }

  function mg_rollover_format_id(d, args) {
    var v = d[args.x_accessor];
    var formatter = MG.time_format(args.utc_time, args.linked_format);
    // only format when x-axis is date
    return (typeof v === 'number') ? v.toString().replace('.', '_') : formatter(v);
  }

  function mg_add_single_line_rollover(args, svg, rollover_on, rollover_off, rollover_move, rollover_click) {
    // set to 1 unless we have a custom increment series
    var line_id = 1;
    if (args.custom_line_color_map.length > 0) {
      line_id = args.custom_line_color_map[0];
    }

    var g = svg.append('g')
      .attr('class', 'mg-rollover-rect');

    var xf = args.data[0].map(args.scalefns.xf);

    g.selectAll('.mg-rollover-rects')
      .data(args.data[0]).enter()
      .append('rect')
      .attr('class', function(d, i) {
        var cl = mg_line_color_class(line_id) + ' ' + mg_line_class(d.line_id);
        if (args.linked) cl += cl + ' ' + mg_rollover_id_class(mg_rollover_format_id(d, args));
        return cl;
      })
      .attr('x', function(d, i) {
        // if data set is of length 1
        if (xf.length === 1) return mg_get_plot_left(args);
        else if (i === 0) return xf[i].toFixed(2);
        else return ((xf[i - 1] + xf[i]) / 2).toFixed(2);
      })
      .attr('y', function(d, i) {
        return (args.data.length > 1) ? args.scalefns.yf(d) - 6 // multi-line chart sensitivity
          : args.top;
      })
      .attr('width', function(d, i) {
        // if data set is of length 1
        if (xf.length === 1) return mg_get_plot_right(args);
        else if (i === 0) return ((xf[i + 1] - xf[i]) / 2).toFixed(2);
        else if (i === xf.length - 1) return ((xf[i] - xf[i - 1]) / 2).toFixed(2);
        else return ((xf[i + 1] - xf[i - 1]) / 2).toFixed(2);
      })
      .attr('height', function(d, i) {
        return (args.data.length > 1) ? 12 // multi-line chart sensitivity
          : args.height - args.bottom - args.top - args.buffer;
      })
      .attr('opacity', 0)
      .on('click', rollover_click)
      .on('mouseover', rollover_on)
      .on('mouseout', rollover_off)
      .on('mousemove', rollover_move);

    if (mg_is_singleton(args)) {
      mg_configure_singleton_rollover(args, svg);
    }
  }

  function mg_configure_aggregate_rollover(args, svg) {
    var rect = svg.selectAll('.mg-rollover-rect rect');
    var rect_first = rect.nodes()[0][0] || rect.nodes()[0];
    if (args.data.filter(function(d) { return d.length === 1; }).length > 0) {
      rect.on('mouseover')(rect_first.__data__, 0);
    }
  }

  function mg_is_standard_multiline(args) {
    return args.data.length > 1 && !args.aggregate_rollover;
  }

  function mg_is_aggregated_rollover(args) {
    return args.data.length > 1 && args.aggregate_rollover;
  }

  function mg_is_singleton(args) {
    return args.data.length === 1 && args.data[0].length === 1;
  }

  function mg_draw_all_line_elements(args, plot, svg) {
    mg_remove_dangling_bands(plot, svg);

    for (var i = args.data.length - 1; i >= 0; i--) {
      var this_data = args.data[i];

      // passing the data for the current line
      MG.call_hook('line.before_each_series', [this_data, args]);

      // override increment if we have a custom increment series
      var line_id = i + 1;
      if (args.custom_line_color_map.length > 0) {
        line_id = args.custom_line_color_map[i];
      }

      args.data[i].line_id = line_id;

      if (this_data.length === 0) {
        continue;
      }
      var existing_line = svg.select('path.mg-main-line.mg-line' + (line_id));

      mg_add_confidence_band(args, plot, svg, line_id);
      mg_add_area(args, plot, svg, i, line_id);
      mg_add_line(args, plot, svg, existing_line, i, line_id);
      mg_add_legend_element(args, plot, i, line_id);

      // passing the data for the current line
      MG.call_hook('line.after_each_series', [this_data, existing_line, args]);
    }
  }

  function mg_remove_dangling_bands(plot, svg) {
    if (plot.existing_band[0] && plot.existing_band[0].length > svg.selectAll('.mg-main-line').node().length) {
      svg.selectAll('.mg-confidence-band').remove();
    }
  }

  function mg_line_main_plot(args) {
    var plot = {};
    var svg = mg_get_svg_child_of(args.target);

    // remove any old legends if they exist
    mg_selectAll_and_remove(svg, '.mg-line-legend');
    mg_add_legend_group(args, plot, svg);

    plot.data_median = 0;
    plot.update_transition_duration = (args.transition_on_update) ? 1000 : 0;
    plot.display_area = args.area && !args.use_data_y_min && args.data.length <= 1 && args.aggregate_rollover === false;
    plot.legend_text = '';
    mg_line_graph_generators(args, plot, svg);
    plot.existing_band = svg.selectAll('.mg-confidence-band').nodes();

    // should we continue with the default line render? A `line.all_series` hook should return false to prevent the default.
    var continueWithDefault = MG.call_hook('line.before_all_series', [args]);
    if (continueWithDefault !== false) {
      mg_draw_all_line_elements(args, plot, svg);
    }

    mg_plot_legend_if_legend_target(args.legend_target, plot.legend_text);
  }

  function mg_line_rollover_setup(args, graph) {
    var svg = mg_get_svg_child_of(args.target);

    if (args.showActivePoint && svg.selectAll('.mg-active-datapoint-container').nodes().length === 0) {
      mg_add_g(svg, 'mg-active-datapoint-container');
    }

    mg_remove_existing_line_rollover_elements(svg);
    mg_add_rollover_circle(args, svg);
    mg_set_unique_line_id_for_each_series(args);

    if (mg_is_standard_multiline(args)) {
      mg_add_voronoi_rollover(args, svg, graph.rolloverOn(args), graph.rolloverOff(args), graph.rolloverMove(args), graph.rolloverClick(args));
    } else if (mg_is_aggregated_rollover(args)) {
      mg_add_aggregate_rollover(args, svg, graph.rolloverOn(args), graph.rolloverOff(args), graph.rolloverMove(args), graph.rolloverClick(args));
    } else {
      mg_add_single_line_rollover(args, svg, graph.rolloverOn(args), graph.rolloverOff(args), graph.rolloverMove(args), graph.rolloverClick(args));
    }
  }

  function mg_update_rollover_circle(args, svg, d) {
    if (args.aggregate_rollover && args.data.length > 1) {
      // hide the circles in case a non-contiguous series is present
      svg.selectAll('circle.mg-line-rollover-circle')
        .style('opacity', 0);

      d.values.forEach(function(datum, index, list) {
        if (args.missing_is_hidden && list[index]['_missing']) {
          return;
        }

        if (mg_data_in_plot_bounds(datum, args)) mg_update_aggregate_rollover_circle(args, svg, datum);
      });
    } else if ((args.missing_is_hidden && d['_missing']) || d[args.y_accessor] === null) {
      // disable rollovers for hidden parts of the line
      // recall that hidden parts are missing data ranges and possibly also
      // data points that have been explicitly identified as missing
      return;
    } else {
      // show circle on mouse-overed rect
      if (mg_data_in_plot_bounds(d, args)) {
        mg_update_generic_rollover_circle(args, svg, d);
      }
    }
  }

  function mg_update_aggregate_rollover_circle(args, svg, datum) {
    svg.select('circle.mg-line-rollover-circle.mg-line' + datum.line_id)
      .attr('cx', args.scales.X(datum[args.x_accessor]).toFixed(2))
      .attr('cy', args.scales.Y(datum[args.y_accessor]).toFixed(2))
      .attr('r', args.point_size)
      .style('opacity', 1);
  }

  function mg_update_generic_rollover_circle(args, svg, d) {
    svg.selectAll('circle.mg-line-rollover-circle.mg-line' + d.line_id)
      .classed('mg-line-rollover-circle', true)
      .attr('cx', function() {
        return args.scales.X(d[args.x_accessor]).toFixed(2);
      })
      .attr('cy', function() {
        return args.scales.Y(d[args.y_accessor]).toFixed(2);
      })
      .attr('r', args.point_size)
      .style('opacity', 1);
  }

  function mg_trigger_linked_mouseovers(args, d, i) {
    if (args.linked && !MG.globals.link) {
      MG.globals.link = true;
      if (!args.aggregate_rollover || d[args.y_accessor] !== undefined || (d.values && d.values.length > 0)) {
        var datum = d.values ? d.values[0] : d;
        var id = mg_rollover_format_id(datum, args);
        // trigger mouseover on matching line in .linked charts
        d3.selectAll('.' + mg_line_class(datum.line_id) + '.' + mg_rollover_id_class(id))
          .each(function(d) {
            d3.select(this)
              .on('mouseover')(d, i);
          });
      }
    }
  }

  function mg_trigger_linked_mouseouts(args, d, i) {
    if (args.linked && MG.globals.link) {
      MG.globals.link = false;

      var formatter = MG.time_format(args.utc_time, args.linked_format);
      var datums = d.values ? d.values : [d];
      datums.forEach(function(datum) {
        var v = datum[args.x_accessor];
        var id = (typeof v === 'number') ? i : formatter(v);

        // trigger mouseout on matching line in .linked charts
        d3.selectAll('.roll_' + id)
          .each(function(d) {
            d3.select(this)
              .on('mouseout')(d);
          });
      });
    }
  }

  function mg_remove_active_data_points_for_aggregate_rollover(args, svg) {
    svg.selectAll('circle.mg-line-rollover-circle').filter(function(circle) {
        return circle.length > 1;
      })
      .style('opacity', 0);
  }

  function mg_remove_active_data_points_for_generic_rollover(args, svg, d) {
    svg.selectAll('circle.mg-line-rollover-circle.mg-line' + d.line_id)
      .style('opacity', function() {
        var id = d.line_id - 1;

        if (args.custom_line_color_map.length > 0 &&
          args.custom_line_color_map.indexOf(d.line_id) !== undefined
        ) {
          id = args.custom_line_color_map.indexOf(d.line_id);
        }

        if (args.data[id].length === 1) {
          return 1;
        } else {
          return 0;
        }
      });
  }

  function mg_remove_active_text(svg) {
    svg.select('.mg-active-datapoint').text('');
  }

  function lineChart(args) {
    this.init = function(args) {
      this.args = args;

      if (!args.data || args.data.length === 0) {
        args.internal_error = 'No data was supplied';
        internal_error(args);
        return this;
      } else {
        args.internal_error = undefined;
      }

      raw_data_transformation(args);
      process_line(args);

      MG.call_hook('line.before_destroy', this);

      init(args);

      // TODO incorporate markers into calculation of x scales
      new MG.scale_factory(args)
        .namespace('x')
        .numericalDomainFromData()
        .numericalRange('bottom')

      var baselines = (args.baselines || []).map(function(d) {
        return d[args.y_accessor];
      });

      new MG.scale_factory(args)
        .namespace('y')
        .zeroBottom(true)
        .inflateDomain(true)
        .numericalDomainFromData(baselines)
        .numericalRange('left');

      var svg = mg_get_svg_child_of(args.target);

      if (args.x_axis) {
        new MG.axis_factory(args)
          .namespace('x')
          .type('numerical')
          .position(args.x_axis_position)
          .rug(x_rug(args))
          .label(mg_add_x_label)
          .draw();
      }

      if (args.y_axis) {
        new MG.axis_factory(args)
          .namespace('y')
          .type('numerical')
          .position(args.y_axis_position)
          .rug(y_rug(args))
          .label(mg_add_y_label)
          .draw();
      }

      this.markers();
      this.mainPlot();
      this.rollover();
      this.windowListeners();

      MG.call_hook('line.after_init', this);

      return this;
    };

    this.mainPlot = function() {
      mg_line_main_plot(args);
      return this;
    };

    this.markers = function() {
      markers(args);
      return this;
    };

    this.rollover = function() {
      var that = this;
      mg_line_rollover_setup(args, that);
      MG.call_hook('line.after_rollover', args);

      return this;
    };

    this.rolloverClick =  function(args) {
        return function(d, i) {
            if (args.click) {
                args.click(d, i);
            }
        };
    };

    this.rolloverOn = function(args) {
      var svg = mg_get_svg_child_of(args.target);
      var fmt = mg_get_rollover_time_format(args);

      return function(d, i) {
        mg_update_rollover_circle(args, svg, d);
        mg_trigger_linked_mouseovers(args, d, i);

        svg.selectAll('text')
          .filter(function(g, j) {
            return d === g;
          })
          .attr('opacity', 0.3);

        // update rollover text except for missing data points
        if (args.show_rollover_text &&
            !((args.missing_is_hidden && d['_missing']) || d[args.y_accessor] === null)
          ) {
          var mouseover = mg_mouseover_text(args, { svg: svg });
          var row = mouseover.mouseover_row();
          if (args.aggregate_rollover) {
            row.text((args.aggregate_rollover && args.data.length > 1
              ? mg_format_x_aggregate_mouseover
              : mg_format_x_mouseover)(args, d));
          }

          var pts = args.aggregate_rollover && args.data.length > 1
            ? d.values
            : [d];

          pts.forEach(function(di) {
            if (args.aggregate_rollover) {
              row = mouseover.mouseover_row();
            }

            if (args.legend) {
              mg_line_color_text(row.text(args.legend[di.index - 1] + '  ').bold().elem(), di, args);
            }

            mg_line_color_text(row.text('\u2014  ').elem(), di, args);
            if (!args.aggregate_rollover) {
              row.text(mg_format_x_mouseover(args, di));
            }

            row.text(mg_format_y_mouseover(args, di, args.time_series === false));
          })
        }

        if (args.mouseover) {
          args.mouseover(d, i);
        }
      };
    };

    this.rolloverOff = function(args) {
      var svg = mg_get_svg_child_of(args.target);

      return function(d, i) {
        mg_trigger_linked_mouseouts(args, d, i);
        if (args.aggregate_rollover) {
          mg_remove_active_data_points_for_aggregate_rollover(args, svg);
        } else {
          mg_remove_active_data_points_for_generic_rollover(args, svg, d);
        }

        if (args.data[0].length > 1) {
          mg_clear_mouseover_container(svg);
        }

        if (args.mouseout) {
          args.mouseout(d, i);
        }
      };
    };

    this.rolloverMove = function(args) {
      return function(d, i) {
        if (args.mousemove) {
          args.mousemove(d, i);
        }
      };
    };

    this.windowListeners = function() {
      mg_window_listeners(this.args);
      return this;
    };

    this.init(args);
  }

  MG.register('line', lineChart);
}).call(this);

(function() {
  'use strict';

  function histogram(args) {
    this.init = function(args) {
      this.args = args;

      raw_data_transformation(args);
      process_histogram(args);
      init(args);

      new MG.scale_factory(args)
        .namespace('x')
        .numericalDomainFromData()
        .numericalRange('bottom');

      var baselines = (args.baselines || []).map(function(d) {
        return d[args.y_accessor]
      });

      new MG.scale_factory(args)
        .namespace('y')
        .zeroBottom(true)
        .inflateDomain(true)
        .numericalDomainFromData(baselines)
        .numericalRange('left');

      x_axis(args);
      y_axis(args);

      this.mainPlot();
      this.markers();
      this.rollover();
      this.windowListeners();

      return this;
    };

    this.mainPlot = function() {
      var svg = mg_get_svg_child_of(args.target);

      //remove the old histogram, add new one
      svg.selectAll('.mg-histogram').remove();

      var g = svg.append('g')
        .attr('class', 'mg-histogram');

      var bar = g.selectAll('.mg-bar')
        .data(args.data[0])
        .enter().append('g')
        .attr('class', 'mg-bar')
        .attr('transform', function(d) {
          return "translate(" + args.scales.X(d[args.x_accessor]).toFixed(2) + "," + args.scales.Y(d[args.y_accessor]).toFixed(2) + ")";
        });

      //draw bars
      bar.append('rect')
        .attr('x', 1)
        .attr('width', function(d, i) {
          if (args.data[0].length === 1) {
            return (args.scalefns.xf(args.data[0][0]) - args.bar_margin).toFixed(0);
          } else if (i !== args.data[0].length - 1) {
            return (args.scalefns.xf(args.data[0][i + 1]) - args.scalefns.xf(d)).toFixed(0);
          } else {
            return (args.scalefns.xf(args.data[0][1]) - args.scalefns.xf(args.data[0][0])).toFixed(0);
          }
        })
        .attr('height', function(d) {
          if (d[args.y_accessor] === 0) {
            return 0;
          }

          return (args.height - args.bottom - args.buffer - args.scales.Y(d[args.y_accessor])).toFixed(2);
        });

      return this;
    };

    this.markers = function() {
      markers(args);
      return this;
    };

    this.rollover = function() {
      var svg = mg_get_svg_child_of(args.target);

      if (svg.selectAll('.mg-active-datapoint-container').nodes().length === 0) {
        mg_add_g(svg, 'mg-active-datapoint-container');
      }

      //remove the old rollovers if they already exist
      svg.selectAll('.mg-rollover-rect').remove();
      svg.selectAll('.mg-active-datapoint').remove();

      var g = svg.append('g')
        .attr('class', 'mg-rollover-rect');

      //draw rollover bars
      var bar = g.selectAll('.mg-bar')
        .data(args.data[0])
        .enter().append('g')
        .attr('class', function(d, i) {
          if (args.linked) {
            return 'mg-rollover-rects roll_' + i;
          } else {
            return 'mg-rollover-rects';
          }
        })
        .attr('transform', function(d) {
          return "translate(" + (args.scales.X(d[args.x_accessor])) + "," + 0 + ")";
        });

      bar.append('rect')
        .attr('x', 1)
        .attr('y', args.buffer + args.title_y_position)
        .attr('width', function(d, i) {
          //if data set is of length 1
          if (args.data[0].length === 1) {
            return (args.scalefns.xf(args.data[0][0]) - args.bar_margin).toFixed(0);
          } else if (i !== args.data[0].length - 1) {
            return (args.scalefns.xf(args.data[0][i + 1]) - args.scalefns.xf(d)).toFixed(0);
          } else {
            return (args.scalefns.xf(args.data[0][1]) - args.scalefns.xf(args.data[0][0])).toFixed(0);
          }
        })
        .attr('height', function(d) {
          return args.height;
        })
        .attr('opacity', 0)
        .on('mouseover', this.rolloverOn(args))
        .on('mouseout', this.rolloverOff(args))
        .on('mousemove', this.rolloverMove(args));

      return this;
    };

    this.rolloverOn = function(args) {
      var svg = mg_get_svg_child_of(args.target);

      return function(d, i) {
        svg.selectAll('text')
          .filter(function(g, j) {
            return d === g;
          })
          .attr('opacity', 0.3);

        var fmt = args.processed.xax_format || MG.time_format(args.utc_time, '%b %e, %Y');
        var num = format_rollover_number(args);

        svg.selectAll('.mg-bar rect')
          .filter(function(d, j) {
            return j === i;
          })
          .classed('active', true);

        //trigger mouseover on all matching bars
        if (args.linked && !MG.globals.link) {
          MG.globals.link = true;

          //trigger mouseover on matching bars in .linked charts
          d3.selectAll('.mg-rollover-rects.roll_' + i + ' rect')
            .each(function(d) { //use existing i
              d3.select(this).on('mouseover')(d, i);
            });
        }

        //update rollover text
        if (args.show_rollover_text) {
          var mo = mg_mouseover_text(args, { svg: svg });
          var row = mo.mouseover_row();
          row.text('\u259F  ').elem()
            .classed('hist-symbol', true);

          row.text(mg_format_x_mouseover(args, d)); // x
          row.text(mg_format_y_mouseover(args, d, args.time_series === false));
        }

        if (args.mouseover) {
          mg_setup_mouseover_container(svg, args);
          args.mouseover(d, i);
        }
      };
    };

    this.rolloverOff = function(args) {
      var svg = mg_get_svg_child_of(args.target);

      return function(d, i) {
        if (args.linked && MG.globals.link) {
          MG.globals.link = false;

          //trigger mouseout on matching bars in .linked charts
          d3.selectAll('.mg-rollover-rects.roll_' + i + ' rect')
            .each(function(d) { //use existing i
              d3.select(this).on('mouseout')(d, i);
            });
        }

        //reset active bar
        svg.selectAll('.mg-bar rect')
          .classed('active', false);

        //reset active data point text
        mg_clear_mouseover_container(svg);

        if (args.mouseout) {
          args.mouseout(d, i);
        }
      };
    };

    this.rolloverMove = function(args) {
      return function(d, i) {
        if (args.mousemove) {
          args.mousemove(d, i);
        }
      };
    };

    this.windowListeners = function() {
      mg_window_listeners(this.args);
      return this;
    };

    this.init(args);
  }

  var defaults = {
    binned: false,
    bins: null,
    processed_x_accessor: 'x',
    processed_y_accessor: 'y',
    processed_dx_accessor: 'dx',
    bar_margin: 1
  };

  MG.register('histogram', histogram, defaults);
}).call(this);

function point_mouseover(args, svg, d) {
  var mouseover = mg_mouseover_text(args, { svg: svg });
  var row = mouseover.mouseover_row();

  if (args.color_accessor !== null && args.color_type === 'category') {
    var label = d[args.color_accessor];
    row.text(label + '  ').bold().elem().attr('fill', args.scalefns.colorf(d));
  }

  mg_color_point_mouseover(args, row.text('\u25CF   ').elem(), d); // point shape

  row.text(mg_format_x_mouseover(args, d)); // x
  row.text(mg_format_y_mouseover(args, d, args.time_series === false));
}

function mg_color_point_mouseover(args, elem, d) {
  if (args.color_accessor !== null) {
    elem.attr('fill', args.scalefns.colorf(d));
    elem.attr('stroke', args.scalefns.colorf(d));
  } else {
    elem.classed('mg-points-mono', true);
  }
}


(function() {
  'use strict';

  function mg_filter_out_plot_bounds(data, args) {
    // max_x, min_x, max_y, min_y;
    var x = args.x_accessor;
    var y = args.y_accessor;
    var new_data = data.filter(function(d) {
      return (args.min_x === null || d[x] >= args.min_x) &&
        (args.max_x === null || d[x] <= args.max_x) &&
        (args.min_y === null || d[y] >= args.min_y) &&
        (args.max_y === null || d[y] <= args.max_y);
    })
    return new_data;
  }

  function pointChart(args) {
    this.init = function(args) {
      this.args = args;

      // infer y_axis and x_axis type;
      args.x_axis_type = mg_infer_type(args, 'x');
      args.y_axis_type = mg_infer_type(args, 'y');

      raw_data_transformation(args);

      process_point(args);
      init(args);

      var xMaker, yMaker;

      if (args.x_axis_type === 'categorical') {
        xMaker = MG.scale_factory(args)
          .namespace('x')
          .categoricalDomainFromData()
          .categoricalRangeBands([0, args.xgroup_height], args.xgroup_accessor === null);

        if (args.xgroup_accessor) {
          new MG.scale_factory(args)
            .namespace('xgroup')
            .categoricalDomainFromData()
            .categoricalRangeBands('bottom');

        } else {
          args.scales.XGROUP = function(d) {
            return mg_get_plot_left(args) };
          args.scalefns.xgroupf = function(d) {
            return mg_get_plot_left(args) };
        }

        args.scalefns.xoutf = function(d) {
          return args.scalefns.xf(d) + args.scalefns.xgroupf(d)
        };
      } else {
        xMaker = MG.scale_factory(args)
          .namespace('x')
          .inflateDomain(true)
          .zeroBottom(args.y_axis_type === 'categorical')
          .numericalDomainFromData((args.baselines || []).map(function(d) {
            return d[args.x_accessor] }))
          .numericalRange('bottom');

        args.scalefns.xoutf = args.scalefns.xf;
      }

      // y-scale generation. This needs to get simplified.
      if (args.y_axis_type === 'categorical') {
        yMaker = MG.scale_factory(args)
          .namespace('y')
          .zeroBottom(true)
          .categoricalDomainFromData()
          .categoricalRangeBands([0, args.ygroup_height], true);

        if (args.ygroup_accessor) {

          new MG.scale_factory(args)
            .namespace('ygroup')
            .categoricalDomainFromData()
            .categoricalRangeBands('left');

        } else {
          args.scales.YGROUP = function() {
            return mg_get_plot_top(args) };
          args.scalefns.ygroupf = function(d) {
            return mg_get_plot_top(args) };

        }
        args.scalefns.youtf = function(d) {
          return args.scalefns.yf(d) + args.scalefns.ygroupf(d) };

      } else {
        var baselines = (args.baselines || []).map(function(d) {
          return d[args.y_accessor] });
        yMaker = MG.scale_factory(args)
          .namespace('y')
          .inflateDomain(true)
          .zeroBottom(args.x_axis_type === 'categorical')
          .numericalDomainFromData(baselines)
          .numericalRange('left');

        args.scalefns.youtf = function(d) {
          return args.scalefns.yf(d) };
      }

      /////// COLOR accessor
      if (args.color_accessor !== null) {
        var colorScale = MG.scale_factory(args).namespace('color');
        if (args.color_type === 'number') {
          // do the color scale.
          // etiher get color range, or what.
          colorScale
            .numericalDomainFromData(mg_get_color_domain(args))
            .numericalRange(mg_get_color_range(args))
            .clamp(true);
        } else {
          if (args.color_domain) {
            colorScale
              .categoricalDomain(args.color_domain)
              .categoricalRange(args.color_range);
          } else {
            colorScale
              .categoricalDomainFromData()
              .categoricalColorRange();
          }
        }
      }

      if (args.size_accessor) {
        new MG.scale_factory(args).namespace('size')
          .numericalDomainFromData()
          .numericalRange(mg_get_size_range(args))
          .clamp(true);
      }

      new MG.axis_factory(args)
        .namespace('x')
        .type(args.x_axis_type)
        .zeroLine(args.y_axis_type === 'categorical')
        .position(args.x_axis_position)
        .rug(x_rug(args))
        .label(mg_add_x_label)
        .draw();

      new MG.axis_factory(args)
        .namespace('y')
        .type(args.y_axis_type)
        .zeroLine(args.x_axis_type === 'categorical')
        .position(args.y_axis_position)
        .rug(y_rug(args))
        .label(mg_add_y_label)
        .draw();

      this.mainPlot();
      this.markers();
      this.rollover();
      this.windowListeners();

      return this;
    };

    this.markers = function() {
      markers(args);
      if (args.least_squares) {
        add_ls(args);
      }

      return this;
    };

    this.mainPlot = function() {
      var svg = mg_get_svg_child_of(args.target);
      var g;

      var data = mg_filter_out_plot_bounds(args.data[0], args);
      //remove the old points, add new one
      svg.selectAll('.mg-points').remove();

      g = svg.append('g')
        .classed('mg-points', true);


      var pts = g.selectAll('circle')
        .data(data)
        .enter().append('circle')
        .attr('class', function(d, i) {
          return 'path-' + i;
        })
        .attr('cx', args.scalefns.xoutf)
        .attr('cy', function(d) {
          return args.scalefns.youtf(d);
        });

      //are we coloring our points, or just using the default color?
      if (args.color_accessor !== null) {
        pts.attr('fill', args.scalefns.colorf);
        pts.attr('stroke', args.scalefns.colorf);
      } else {
        pts.classed('mg-points-mono', true);
      }

      if (args.size_accessor !== null) {
        pts.attr('r', args.scalefns.sizef);
      } else {
        pts.attr('r', args.point_size);
      }

      return this;
    };

    this.rollover = function() {
      var svg = mg_get_svg_child_of(args.target);

      if (svg.selectAll('.mg-active-datapoint-container').nodes().length === 0) {
        mg_add_g(svg, 'mg-active-datapoint-container');
      }

      //remove the old rollovers if they already exist
      svg.selectAll('.mg-voronoi').remove();

      //add rollover paths
      var voronoi = d3.voronoi()
        .x(args.scalefns.xoutf)
        .y(args.scalefns.youtf)
        .extent([
          [args.buffer, args.buffer + args.title_y_position],
          [args.width - args.buffer, args.height - args.buffer]
        ]);

      var paths = svg.append('g')
        .attr('class', 'mg-voronoi');

      paths.selectAll('path')
        .data(voronoi.polygons(mg_filter_out_plot_bounds(args.data[0], args)))
        .enter().append('path')
        .attr('d', function(d) {
          return d == null ? null : 'M' + d.join(',') + 'Z'; })
        .attr('class', function(d, i) {
          return 'path-' + i;
        })
        .style('fill-opacity', 0)
        .on('mouseover', this.rolloverOn(args))
        .on('mouseout', this.rolloverOff(args))
        .on('mousemove', this.rolloverMove(args));

      if (args.data[0].length === 1) {
        point_mouseover(args, svg, args.data[0][0]);
      }

      return this;
    };

    this.rolloverOn = function(args) {
      var svg = mg_get_svg_child_of(args.target);

      return function(d, i) {
        svg.selectAll('.mg-points circle')
          .classed('selected', false);

        //highlight active point
        var pts = svg.selectAll('.mg-points circle.path-' + i)
          .classed('selected', true);

        if (args.size_accessor) {
          pts.attr('r', function(di) {
            return args.scalefns.sizef(di) + args.active_point_size_increase;
          });
        } else {
          pts.attr('r', args.point_size + args.active_point_size_increase);
        }

        //trigger mouseover on all points for this class name in .linked charts
        if (args.linked && !MG.globals.link) {
          MG.globals.link = true;

          //trigger mouseover on matching point in .linked charts
          d3.selectAll('.mg-voronoi .path-' + i)
            .each(function() {
              d3.select(this).on('mouseover')(d, i);
            });
        }

        if (args.show_rollover_text) {
          point_mouseover(args, svg, d.data);
        }

        if (args.mouseover) {
          args.mouseover(d, i);
        }
      };
    };

    this.rolloverOff = function(args) {
      var svg = mg_get_svg_child_of(args.target);

      return function(d, i) {
        if (args.linked && MG.globals.link) {
          MG.globals.link = false;

          d3.selectAll('.mg-voronoi .path-' + i)
            .each(function() {
              d3.select(this).on('mouseout')(d, i);
            });
        }

        //reset active point
        var pts = svg.selectAll('.mg-points circle')
          .classed('unselected', false)
          .classed('selected', false);

        if (args.size_accessor) {
          pts.attr('r', args.scalefns.sizef);
        } else {
          pts.attr('r', args.point_size);
        }

        //reset active data point text
        if (args.data[0].length > 1) mg_clear_mouseover_container(svg);

        if (args.mouseout) {
          args.mouseout(d, i);
        }
      };
    };

    this.rolloverMove = function(args) {
      return function(d, i) {
        if (args.mousemove) {
          args.mousemove(d, i);
        }
      };
    };

    this.update = function(args) {
      return this;
    };

    this.windowListeners = function() {
      mg_window_listeners(this.args);
      return this;
    };

    this.init(args);
  }

  var defaults = {
    y_padding_percentage: 0.05, // for categorical scales
    y_outer_padding_percentage: .2, // for categorical scales
    ygroup_padding_percentage: 0, // for categorical scales
    ygroup_outer_padding_percentage: 0, // for categorical scales
    x_padding_percentage: 0.05, // for categorical scales
    x_outer_padding_percentage: .2, // for categorical scales
    xgroup_padding_percentage: 0, // for categorical scales
    xgroup_outer_padding_percentage: 0, // for categorical scales
    y_categorical_show_guides: true,
    x_categorical_show_guides: true,
    buffer: 16,
    ls: false,
    lowess: false,
    point_size: 2.5,
    label_accessor: null,
    size_accessor: null,
    color_accessor: null,
    size_range: null, // when we set a size_accessor option, this array determines the size range, e.g. [1,5]
    color_range: null, // e.g. ['blue', 'red'] to color different groups of points
    size_domain: null,
    color_domain: null,
    active_point_size_increase: 1,
    color_type: 'number' // can be either 'number' - the color scale is quantitative - or 'category' - the color scale is qualitative.
  };

  MG.register('point', pointChart, defaults);
}).call(this);

(function() {
  'use strict';

  // TODO add styles to stylesheet instead
  function scaffold(args) {
    var svg = mg_get_svg_child_of(args.target);
    // main margins
    svg.append('line')
      .attr('x1', 0)
      .attr('x2', args.width)
      .attr('y1', args.top)
      .attr('y2', args.top)
      .attr('stroke', 'black');
    svg.append('line')
      .attr('x1', 0)
      .attr('x2', args.width)
      .attr('y1', args.height-args.bottom)
      .attr('y2', args.height-args.bottom)
      .attr('stroke', 'black');

    svg.append('line')
      .attr('x1', args.left)
      .attr('x2', args.left)
      .attr('y1', 0)
      .attr('y2', args.height)
      .attr('stroke', 'black');

    svg.append('line')
      .attr('x1', args.width-args.right)
      .attr('x2', args.width-args.right)
      .attr('y1', 0)
      .attr('y2', args.height)
      .attr('stroke', 'black');

    // plot area margins
    svg.append('line')
      .attr('x1', 0)
      .attr('x2', args.width)
      .attr('y1', args.height-args.bottom-args.buffer)
      .attr('y2', args.height-args.bottom-args.buffer)
      .attr('stroke', 'gray');

    svg.append('line')
      .attr('x1', 0)
      .attr('x2', args.width)
      .attr('y1', args.top+args.buffer)
      .attr('y2', args.top+args.buffer)
      .attr('stroke', 'gray');

    svg.append('line')
      .attr('x1', args.left + args.buffer)
      .attr('x2', args.left + args.buffer)
      .attr('y1', 0)
      .attr('y2', args.height)
      .attr('stroke', 'gray');
    svg.append('line')
      .attr('x1', args.width -args.right - args.buffer)
      .attr('x2', args.width -args.right - args.buffer)
      .attr('y1', 0)
      .attr('y2', args.height)
      .attr('stroke', 'gray');
  }

  // barchart re-write.
  function mg_targeted_legend(args) {
    var labels;
    var plot = '';
    if (args.legend_target) {

      var div = d3.select(args.legend_target).append('div').classed('mg-bar-target-legend', true);
      
      if (args.orientation == 'horizontal') labels = args.scales.Y.domain()
      else labels = args.scales.X.domain();

      labels.forEach(function(label) {
        var outer_span = div.append('span').classed('mg-bar-target-element', true);
        outer_span.append('span')
          .classed('mg-bar-target-legend-shape', true)
          .style('color', args.scales.COLOR(label))
          .text('\u25FC ');
        outer_span.append('span')
          .classed('mg-bar-target-legend-text', true)
          .text(label);

      });
    }
  }

  function legend_on_graph(svg, args) {
    // draw each element at the top right
    // get labels

    var labels;
    if (args.orientation=='horizontal') labels = args.scales.Y.domain()
    else labels = args.scales.X.domain();

    var lineCount = 0;
    var lineHeight = 1.1;
    var g = svg.append('g').classed("mg-bar-legend", true);
    var textContainer = g.append('text');

    //

    textContainer
      .selectAll('*')
      .remove();
    textContainer
      .attr('width', args.right)
      .attr('height', 100)
      .attr('text-anchor', 'start');

    labels.forEach(function(label) {
      var sub_container = textContainer.append('tspan')
        .attr('x', mg_get_plot_right(args))
        .attr('y', args.height / 2)
        .attr('dy', (lineCount * lineHeight) + 'em');
      sub_container.append('tspan')
        .text('\u25a0 ')
        .attr('fill', args.scales.COLOR(label))
        .attr('font-size', 20)
      sub_container.append('tspan')
        .text(label)
        .attr('font-weight', 300)
        .attr('font-size', 10);
      lineCount++;
    })

    // d.values.forEach(function (datum) {
    //   formatted_y = mg_format_y_rollover(args, num, datum);

    //   if (args.y_rollover_format !== null) {
    //     formatted_y = number_rollover_format(args.y_rollover_format, datum, args.y_accessor);
    //   } else {
    //     formatted_y = args.yax_units + num(datum[args.y_accessor]);
    //   }

    //   sub_container = textContainer.append('tspan').attr('x', 0).attr('y', (lineCount * lineHeight) + 'em');
    //   formatted_y = mg_format_y_rollover(args, num, datum);
    //   mouseover_tspan(sub_container, '\u2014  ')
    //     .color(args, datum);
    //   mouseover_tspan(sub_container, formatted_x + ' ' + formatted_y);

    //   lineCount++;
    // });
  }

  function barChart(args) {
    this.args = args;

    this.init = function(args) {
      this.args = args;
      args.x_axis_type = mg_infer_type(args, 'x');
      args.y_axis_type = mg_infer_type(args, 'y');

      // this is specific to how rects work in svg, let's keep track of the bar orientation to
      // plot appropriately.
      if (args.x_axis_type == 'categorical') {
        args.orientation = 'vertical';
      } else if (args.y_axis_type == 'categorical') {
        args.orientation = 'horizontal';
      } else if (args.x_axis_type != 'categorical' && args.y_axis_type != 'categorical') {
        // histogram.
        args.orientation = 'vertical';
      }

      raw_data_transformation(args);

      process_point(args);
      init(args);

      var xMaker, yMaker;

      if (args.x_axis_type === 'categorical') {
        xMaker = MG.scale_factory(args)
          .namespace('x')
          .categoricalDomainFromData()
          .categoricalRangeBands([0, args.xgroup_height], args.xgroup_accessor === null);

        if (args.xgroup_accessor) {
          new MG.scale_factory(args)
            .namespace('xgroup')
            .categoricalDomainFromData()
            .categoricalRangeBands('bottom');

        } else {
          args.scales.XGROUP = function(d) {
            return mg_get_plot_left(args) };
          args.scalefns.xgroupf = function(d) {
            return mg_get_plot_left(args) };
        }

        args.scalefns.xoutf = function(d) {
          return args.scalefns.xf(d) + args.scalefns.xgroupf(d)
        };
      } else {
        xMaker = MG.scale_factory(args)
          .namespace('x')
          .inflateDomain(true)
          .zeroBottom(args.y_axis_type === 'categorical')
          .numericalDomainFromData((args.baselines || []).map(function(d) {
            return d[args.x_accessor] }))
          .numericalRange('bottom');

        args.scalefns.xoutf = args.scalefns.xf;
      }

      // y-scale generation. This needs to get simplified.
      if (args.y_axis_type === 'categorical') {
        yMaker = MG.scale_factory(args)
          .namespace('y')
          .zeroBottom(true)
          .categoricalDomainFromData()
          .categoricalRangeBands([0, args.ygroup_height], true);

        if (args.ygroup_accessor) {

          new MG.scale_factory(args)
            .namespace('ygroup')
            .categoricalDomainFromData()
            .categoricalRangeBands('left');

        } else {
          args.scales.YGROUP = function() {
            return mg_get_plot_top(args) };
          args.scalefns.ygroupf = function(d) {
            return mg_get_plot_top(args) };

        }
        args.scalefns.youtf = function(d) {
          return args.scalefns.yf(d) + args.scalefns.ygroupf(d) };

      } else {
        var baselines = (args.baselines || []).map(function(d) {
          return d[args.y_accessor] });

        yMaker = MG.scale_factory(args)
          .namespace('y')
          .inflateDomain(true)
          .zeroBottom(args.x_axis_type === 'categorical')
          .numericalDomainFromData(baselines)
          .numericalRange('left');

        args.scalefns.youtf = function(d) {
          return args.scalefns.yf(d) };
      }

      if (args.ygroup_accessor !== null) {
        args.ycolor_accessor = args.y_accessor;
        MG.scale_factory(args)
          .namespace('ycolor')
          .scaleName('color')
          .categoricalDomainFromData()
          .categoricalColorRange();
      }

      if (args.xgroup_accessor !== null) {
        args.xcolor_accessor = args.x_accessor;
        MG.scale_factory(args)
          .namespace('xcolor')
          .scaleName('color')
          .categoricalDomainFromData()
          .categoricalColorRange();
      }

      // if (args.ygroup_accessor !== null) {
      //   MG.scale_factory(args)
      //     .namespace('ygroup')
      //     .categoricalDomainFromData()
      //     .categoricalColorRange();
      // }

      new MG.axis_factory(args)
        .namespace('x')
        .type(args.x_axis_type)
        .zeroLine(args.y_axis_type === 'categorical')
        .position(args.x_axis_position)
        .draw();

      new MG.axis_factory(args)
        .namespace('y')
        .type(args.y_axis_type)
        .zeroLine(args.x_axis_type === 'categorical')
        .position(args.y_axis_position)
        .draw();

      //mg_categorical_group_color_scale(args);

      this.mainPlot();
      this.markers();
      this.rollover();
      this.windowListeners();
      //scaffold(args)

      return this;
    };

    this.mainPlot = function() {
      var svg = mg_get_svg_child_of(args.target);
      var data = args.data[0];
      var barplot = svg.select('g.mg-barplot');
      var fresh_render = barplot.empty();

      var bars;
      var predictor_bars;
      var pp, pp0;
      var baseline_marks;

      var perform_load_animation = fresh_render && args.animate_on_load;
      var should_transition = perform_load_animation || args.transition_on_update;
      var transition_duration = args.transition_duration || 1000;

      // draw the plot on first render
      if (fresh_render) {
        barplot = svg.append('g')
          .classed('mg-barplot', true);
      }

      bars = barplot.selectAll('.mg-bar')
        .data(data)
        .enter()
        .append('rect')
          .classed('mg-bar', true)
          .classed('default-bar', args.scales.hasOwnProperty('COLOR') ? false : true);

      // TODO - reimplement

      // reference_accessor {}

      // if (args.predictor_accessor) {
      //   predictor_bars = barplot.selectAll('.mg-bar-prediction')
      //     .data(data.filter(function(d) {
      //       return d.hasOwnProperty(args.predictor_accessor) }));

      //   predictor_bars.exit().remove();

      //   predictor_bars.enter().append('rect')
      //     .classed('mg-bar-prediction', true);
      // }

      // if (args.baseline_accessor) {
      //   baseline_marks = barplot.selectAll('.mg-bar-baseline')
      //     .data(data.filter(function(d) {
      //       return d.hasOwnProperty(args.baseline_accessor) }));

      //   baseline_marks.exit().remove();

      //   baseline_marks.enter().append('line')
      //     .classed('mg-bar-baseline', true);
      // }

      var appropriate_size;

      // setup transitions
      // if (should_transition) {
      //   bars = bars.transition()
      //     .duration(transition_duration);

      //   if (predictor_bars) {
      //     predictor_bars = predictor_bars.transition()
      //       .duration(transition_duration);
      //   }

      //   if (baseline_marks) {
      //     baseline_marks = baseline_marks.transition()
      //       .duration(transition_duration);
      //   }
      // }

      //appropriate_size = args.scales.Y_ingroup.rangeBand()/1.5;
      var length, width, length_type, width_type, length_coord, width_coord,
          length_scalefn, width_scalefn, length_scale, width_scale,
          length_accessor, width_accessor, length_coord_map, width_coord_map,
          length_map, width_map;

      var reference_length_map, reference_length_coord_fn;

      if (args.orientation == 'vertical') {
        length = 'height';
        width = 'width';
        length_type = args.y_axis_type;
        width_type = args.x_axis_type;
        length_coord = 'y';
        width_coord = 'x';
        length_scalefn = length_type == 'categorical' ? args.scalefns.youtf : args.scalefns.yf;
        width_scalefn  = width_type == 'categorical' ? args.scalefns.xoutf : args.scalefns.xf;
        length_scale   = args.scales.Y;
        width_scale     = args.scales.X;
        length_accessor = args.y_accessor;
        width_accessor = args.x_accessor;

        length_coord_map = function(d) {
          var l;
          l = length_scalefn(d);
          if (d[length_accessor] < 0) {
            l = length_scale(0);
          }
          return l;
        }

        length_map = function(d) {
          return Math.abs(length_scalefn(d) - length_scale(0));
        }

        reference_length_map = function(d) {
          return Math.abs(length_scale(d[args.reference_accessor]) - length_scale(0));
        }

        reference_length_coord_fn = function(d){
          return length_scale(d[args.reference_accessor]);
        }
      }

      if (args.orientation == 'horizontal') {
        length = 'width';
        width = 'height';
        length_type = args.x_axis_type;
        width_type = args.y_axis_type;
        length_coord = 'x';
        width_coord = 'y';
        length_scalefn = length_type == 'categorical' ? args.scalefns.xoutf : args.scalefns.xf;
        width_scalefn = width_type == 'categorical' ? args.scalefns.youtf : args.scalefns.yf;
        length_scale = args.scales.X;
        width_scale = args.scales.Y;
        length_accessor = args.x_accessor;
        width_accessor = args.y_accessor;

        length_coord_map = function(d) {
          var l;
          l = length_scale(0);
          return l;
        }

        length_map = function(d) {
          return Math.abs(length_scalefn(d) - length_scale(0));
        }

        reference_length_map = function(d) {
          return Math.abs(length_scale(d[args.reference_accessor]) - length_scale(0));
        }

        reference_length_coord_fn = function(d){
          return length_scale(0);
        }
      }

      // if (perform_load_animation) {
      //   bars.attr(length, 0);

      //   if (predictor_bars) {
      //     predictor_bars.attr(length, 0);
      //   }

      //   // if (baseline_marks) {
      //   //   baseline_marks.attr({
      //   //     x1: args.scales.X(0),
      //   //     x2: args.scales.X(0)
      //   //   });
      //   // }
      // }

      bars.attr(length_coord, length_coord_map);

      // bars.attr(length_coord, 40)
      //bars.attr(width_coord, 70)



      bars.attr(width_coord, function(d) {
        var w;
        if (width_type == 'categorical') {
          w = width_scalefn(d);
        } else {
          w = width_scale(0);
          if (d[width_accessor] < 0) {
            w = width_scalefn(d);
          }
        }
        w = w - args.bar_thickness/2;
        return w;
      });

      if (args.scales.COLOR) {
        bars.attr('fill', args.scalefns.colorf)
      }

      bars
        .attr(length, length_map)
        .attr(width, function(d) {
          return args.bar_thickness;
      });




      if (args.reference_accessor !== null) {
        var reference_data = data.filter(function(d){
          return d.hasOwnProperty(args.reference_accessor);
        })
        var reference_bars = barplot.selectAll('.mg-categorical-reference')
          .data(reference_data)
          .enter()
          .append('rect');

        reference_bars
          .attr(length_coord, reference_length_coord_fn)
          .attr(width_coord, function(d) {
            return width_scalefn(d) - args.reference_thickness/2
          })
          .attr(length, reference_length_map)
          .attr(width, args.reference_thickness);
      }

      if (args.comparison_accessor !== null) {
        var comparison_thickness = null;
        if (args.comparison_thickness === null) {
          comparison_thickness = args.bar_thickness/2;
        } else {
          comparison_thickness = args.comparison_thickness;
        }


        var comparison_data = data.filter(function(d) {
          return d.hasOwnProperty(args.comparison_accessor);
        })
        var comparison_marks = barplot.selectAll('.mg-categorical-comparison')
          .data(comparison_data)
          .enter()
          .append('line');

        comparison_marks
          .attr(length_coord + '1', function(d){return length_scale(d[args.comparison_accessor])})
          .attr(length_coord + '2', function(d){return length_scale(d[args.comparison_accessor])})
          .attr(width_coord + '1',  function(d){
            return width_scalefn(d) - comparison_thickness/2;
          })
          .attr(width_coord + '2', function(d) {
            return width_scalefn(d) + comparison_thickness/2;
          })
          .attr('stroke', 'black')
          .attr('stroke-width', args.comparison_width);
      }

        //bars.attr(width_coord, );
        // bars.attr('width', 50);
        // bars.attr('height', 50);
        // bars.attr('y', function(d){
        //   var y = args.scales.Y(0);
        //   if (d[args.y_accessor] < 0) {
        //     y = args.scalefns.yf(d);
        //   }
        //   return y;
        // });

        // bars.attr('x', function(d){
        //   return 40;
        // })

        // bars.attr('width', function(d){
        //   return 100;
        // });

        // bars.attr('height', 100);

        // bars.attr('fill', 'black');
        // bars.attr('x', function(d) {
        //   var x = args.scales.X(0);
        //   if (d[args.x_accessor] < 0) {
        //     x = args.scalefns.xf(d);
        //   }
        //   return x;
        // })
        // TODO - reimplement.
        // if (args.predictor_accessor) {
        //   predictor_bars
        //     .attr('x', args.scales.X(0))
        //     .attr('y', function(d) {
        //       return args.scalefns.ygroupf(d) + args.scalefns.yf(d) + args.scales.Y.rangeBand() * (7 / 16) // + pp0 * appropriate_size/(pp*2) + appropriate_size / 2;
        //     })
        //     .attr('height', args.scales.Y.rangeBand() / 8) //appropriate_size / pp)
        //     .attr('width', function(d) {
        //       return args.scales.X(d[args.predictor_accessor]) - args.scales.X(0);
        //     });
        // }

      // TODO - reimplement.
      //   if (args.baseline_accessor) {

      //     baseline_marks
      //       .attr('x1', function(d) {
      //         return args.scales.X(d[args.baseline_accessor]); })
      //       .attr('x2', function(d) {
      //         return args.scales.X(d[args.baseline_accessor]); })
      //       .attr('y1', function(d) {
      //         return args.scalefns.ygroupf(d) + args.scalefns.yf(d) + args.scales.Y.rangeBand() / 4
      //       })
      //       .attr('y2', function(d) {
      //         return args.scalefns.ygroupf(d) + args.scalefns.yf(d) + args.scales.Y.rangeBand() * 3 / 4
      //       });
      //   }
        if (args.legend || (args.color_accessor !== null && args.ygroup_accessor !== args.color_accessor)) {
        if (!args.legend_target) legend_on_graph(svg, args);
        else mg_targeted_legend(args);
      }
      return this;
    };

    this.markers = function() {
      markers(args);
      return this;
    };

    this.rollover = function() {
      var svg = mg_get_svg_child_of(args.target);
      var g;

      if (svg.selectAll('.mg-active-datapoint-container').nodes().length === 0) {
        mg_add_g(svg, 'mg-active-datapoint-container');
      }

      //remove the old rollovers if they already exist
      svg.selectAll('.mg-rollover-rect').remove();
      svg.selectAll('.mg-active-datapoint').remove();

      // get orientation
      var length, width, length_type, width_type, length_coord, width_coord,
        length_scalefn, width_scalefn, length_scale, width_scale,
        length_accessor, width_accessor;

      var length_coord_map, width_coord_map, length_map, width_map;

      if (args.orientation == 'vertical') {
        length = 'height';
        width = 'width';
        length_type = args.y_axis_type;
        width_type = args.x_axis_type;
        length_coord = 'y';
        width_coord = 'x';
        length_scalefn = length_type == 'categorical' ? args.scalefns.youtf : args.scalefns.yf;
        width_scalefn  = width_type == 'categorical' ? args.scalefns.xoutf : args.scalefns.xf;
        length_scale   = args.scales.Y;
        width_scale     = args.scales.X;
        length_accessor = args.y_accessor;
        width_accessor = args.x_accessor;

        length_coord_map = function(d){
          return mg_get_plot_top(args);
        }

        length_map = function(d) {
          return args.height -args.top-args.bottom-args.buffer*2
        }
      }

      if (args.orientation == 'horizontal') {
        length = 'width';
        width = 'height';
        length_type = args.x_axis_type;
        width_type = args.y_axis_type;
        length_coord = 'x';
        width_coord = 'y';
        length_scalefn = length_type == 'categorical' ? args.scalefns.xoutf : args.scalefns.xf;
        width_scalefn = width_type == 'categorical' ? args.scalefns.youtf : args.scalefns.yf;
        length_scale = args.scales.X;
        width_scale = args.scales.Y;
        length_accessor = args.x_accessor;
        width_accessor = args.y_accessor;

        length_coord_map = function(d){
          var l;
          l = length_scale(0);
          return l;
        }

        length_map = function(d) {
          return args.width -args.left-args.right-args.buffer*2
        }
      }

      //rollover text
      var rollover_x, rollover_anchor;
      if (args.rollover_align === 'right') {
        rollover_x = args.width - args.right;
        rollover_anchor = 'end';
      } else if (args.rollover_align === 'left') {
        rollover_x = args.left;
        rollover_anchor = 'start';
      } else {
        rollover_x = (args.width - args.left - args.right) / 2 + args.left;
        rollover_anchor = 'middle';
      }

      svg.append('text')
        .attr('class', 'mg-active-datapoint')
        .attr('xml:space', 'preserve')
        .attr('x', rollover_x)
        .attr('y', args.top * 0.75)
        .attr('dy', '.35em')
        .attr('text-anchor', rollover_anchor);

      g = svg.append('g')
        .attr('class', 'mg-rollover-rect');

      //draw rollover bars
      var bars = g.selectAll(".mg-bar-rollover")
        .data(args.data[0]).enter()
        .append("rect")
        .attr('class', 'mg-bar-rollover');

      bars.attr('opacity', 0)
        .attr(length_coord, length_coord_map)
        .attr(width_coord, function(d) {
          var w;
          if (width_type == 'categorical') {
            w = width_scalefn(d);
          } else {
            w = width_scale(0);
            if (d[width_accessor] < 0) {
              w = width_scalefn(d);
            }
          }
          w = w - args.bar_thickness/2;
          return w;
        });

      bars.attr(length, length_map)
      bars.attr(width, function(d) {
        return args.bar_thickness;
      });

      bars
        .on('mouseover', this.rolloverOn(args))
        .on('mouseout', this.rolloverOff(args))
        .on('mousemove', this.rolloverMove(args));

      return this;
    };

    this.rolloverOn = function(args) {
      var svg = mg_get_svg_child_of(args.target);
      var label_accessor = this.is_vertical ? args.x_accessor : args.y_accessor;
      var data_accessor = this.is_vertical ? args.y_accessor : args.x_accessor;
      var label_units = this.is_vertical ? args.yax_units : args.xax_units;

      return function(d, i) {

        var fmt = MG.time_format(args.utc_time, '%b %e, %Y');
        var num = format_rollover_number(args);

        //highlight active bar
        var bar = svg.selectAll('g.mg-barplot .mg-bar')
          .filter(function(d, j) {
            return j === i;
          }).classed('active', true);

        if (args.scales.hasOwnProperty('COLOR')) {
          bar.attr('fill', d3.rgb(args.scalefns.colorf(d)).darker());
        } else {
          bar.classed('default-active', true);
        }

        //update rollover text
        if (args.show_rollover_text) {
          var mouseover = mg_mouseover_text(args, { svg: svg });
          var row = mouseover.mouseover_row();

          if (args.ygroup_accessor) row.text(d[args.ygroup_accessor] + '   ').bold();

          row.text(mg_format_x_mouseover(args, d));
          row.text(args.y_accessor + ': ' + d[args.y_accessor]);
          if (args.predictor_accessor || args.baseline_accessor) {
            row = mouseover.mouseover_row();

            if (args.predictor_accessor) row.text(mg_format_data_for_mouseover(args, d, null, args.predictor_accessor, false))
            if (args.baseline_accessor) row.text(mg_format_data_for_mouseover(args, d, null, args.baseline_accessor, false))
          }
        }
        if (args.mouseover) {
          args.mouseover(d, i);
        }
      };
    };

    this.rolloverOff = function(args) {
      var svg = mg_get_svg_child_of(args.target);

      return function(d, i) {
        //reset active bar
        var bar = svg.selectAll('g.mg-barplot .mg-bar.active').classed('active', false);

        if (args.scales.hasOwnProperty('COLOR')) {
          bar.attr('fill', args.scalefns.colorf(d));
        } else {
          bar.classed('default-active', false);
        }

        //reset active data point text
        svg.select('.mg-active-datapoint')
          .text('');

        mg_clear_mouseover_container(svg);

        if (args.mouseout) {
          args.mouseout(d, i);
        }
      };
    };

    this.rolloverMove = function(args) {
      return function(d, i) {
        if (args.mousemove) {
          args.mousemove(d, i);
        }
      };
    };

    this.windowListeners = function() {
      mg_window_listeners(this.args);
      return this;
    };

    this.init(args);
  }

  var defaults = {
    y_padding_percentage: 0.05, // for categorical scales
    y_outer_padding_percentage: .2, // for categorical scales
    ygroup_padding_percentage: 0, // for categorical scales
    ygroup_outer_padding_percentage: 0, // for categorical scales
    x_padding_percentage: 0.05, // for categorical scales
    x_outer_padding_percentage: .2, // for categorical scales
    xgroup_padding_percentage: 0, // for categorical scales
    xgroup_outer_padding_percentage: 0, // for categorical scales
    buffer: 16,
    y_accessor: 'factor',
    x_accessor: 'value',
    reference_accessor: null,
    comparison_accessor: null,
    secondary_label_accessor: null,
    color_accessor: null,
    color_type: 'category',
    color_domain: null,
    reference_thickness: 1,
    comparison_width: 3,
    comparison_thickness: null,
    legend: false,
    legend_target: null,
    mouseover_align: 'right',
    baseline_accessor: null,
    predictor_accessor: null,
    predictor_proportion: 5,
    show_bar_zero: true,
    binned: true,
    truncate_x_labels: true,
    truncate_y_labels: true
  };

  MG.register('bar', barChart, defaults);

}).call(this);

/*
Data Tables

Along with histograms, bars, lines, and scatters, a simple data table can take you far.
We often just want to look at numbers, organized as a table, where columns are variables,
and rows are data points. Sometimes we want a cell to have a small graphic as the main
column element, in which case we want small multiples. sometimes we want to

var table = New data_table(data)
        .target('div#data-table')
        .title({accessor: 'point_name', align: 'left'})
        .description({accessor: 'description'})
        .number({accessor: ''})

*/

MG.data_table = function(args) {
  'use strict';
  this.args = args;
  this.args.standard_col = { width: 150, font_size: 12, font_weight: 'normal' };
  this.args.columns = [];
  this.formatting_options = [
    ['color', 'color'],
    ['font-weight', 'font_weight'],
    ['font-style', 'font_style'],
    ['font-size', 'font_size']
  ];

  this._strip_punctuation = function(s) {
    var punctuationless = s.replace(/[^a-zA-Z0-9 _]+/g, '');
    var finalString = punctuationless.replace(/ +?/g, '');
    return finalString;
  };

  this._format_element = function(element, value, args) {
    this.formatting_options.forEach(function(fo) {
      var attr = fo[0];
      var key = fo[1];
      if (args[key]) element.style(attr,
        typeof args[key] === 'string' ||
        typeof args[key] === 'number' ?
        args[key] : args[key](value));
    });
  };

  this._add_column = function(_args, arg_type) {
    var standard_column = this.args.standard_col;
    var args = merge_with_defaults(MG.clone(_args), MG.clone(standard_column));
    args.type = arg_type;
    this.args.columns.push(args);
  };

  this.target = function() {
    var target = arguments[0];
    this.args.target = target;
    return this;
  };

  this.title = function() {
    this._add_column(arguments[0], 'title');
    return this;
  };

  this.text = function() {
    this._add_column(arguments[0], 'text');
    return this;
  };

  this.bullet = function() {
    /*
    text label
    main value
    comparative measure
    any number of ranges

    additional args:
    no title
    xmin, xmax
    format: percentage
    xax_formatter
    */
    return this;
  };

  this.sparkline = function() {
    return this;
  };

  this.number = function() {
    this._add_column(arguments[0], 'number');
    return this;
  };

  this.display = function() {
    var args = this.args;

    chart_title(args);

    var target = args.target;
    var table = d3.select(target).append('table').classed('mg-data-table', true);
    var colgroup = table.append('colgroup');
    var thead = table.append('thead');
    var tbody = table.append('tbody');
    var this_column;
    var this_title;

    var tr, th, td_accessor, td_type, td_value, th_text, td_text, td;
    var col;
    var h;

    tr = thead.append('tr');

    for (h = 0; h < args.columns.length; h++) {
      var this_col = args.columns[h];
      td_type = this_col.type;
      th_text = this_col.label;
      th_text = th_text === undefined ? '' : th_text;
      th = tr.append('th')
        .style('width', this_col.width)
        .style('text-align', td_type === 'title' ? 'left' : 'right')
        .text(th_text);

      if (args.show_tooltips && this_col.description && mg_jquery_exists()) {
        th.append('i')
          .classed('fa', true)
          .classed('fa-question-circle', true)
          .classed('fa-inverse', true);

        $(th.node()).popover({
          html: true,
          animation: false,
          content: this_col.description,
          trigger: 'hover',
          placement: 'top',
          container: $(th.node())
        });
      }
    }

    for (h = 0; h < args.columns.length; h++) {
      col = colgroup.append('col');
      if (args.columns[h].type === 'number') {
        col.attr('align', 'char').attr('char', '.');
      }
    }

    for (var i = 0; i < args.data.length; i++) {
      tr = tbody.append('tr');
      for (var j = 0; j < args.columns.length; j++) {
        this_column = args.columns[j];
        td_accessor = this_column.accessor;
        td_value = td_text = args.data[i][td_accessor];
        td_type = this_column.type;

        if (td_type === 'number') {
          //td_text may need to be rounded
          if (this_column.hasOwnProperty('round') && !this_column.hasOwnProperty('format')) {
            // round according to the number value in this_column.round
            td_text = d3.format('0,.' + this_column.round + 'f')(td_text);
          }

          if (this_column.hasOwnProperty('value_formatter')) {
            // provide a function that formats the text according to the function this_column.format.
            td_text = this_column.value_formatter(td_text);
          }

          if (this_column.hasOwnProperty('format')) {
            // this is a shorthand for percentage formatting, and others if need be.
            // supported: 'percentage', 'count', 'temperature'

            if (this_column.round) {
              td_text = Math.round(td_text, this_column.round);
            }

            var this_format = this_column.format;
            var formatter;

            if (this_format === 'percentage') formatter = d3.format('.0%');
            if (this_format === 'count') formatter = d3.format(',.0f');
            if (this_format === 'temperature') formatter = function(t) {
              return t + '°'; };

            td_text = formatter(td_text);
          }

          if (this_column.hasOwnProperty('currency')) {
            // this is another shorthand for formatting according to a currency amount, which gets appended to front of number
            td_text = this_column.currency + td_text;
          }
        }

        td = tr.append('td')
          .classed('table-' + td_type, true)
          .classed('table-' + td_type + '-' + this._strip_punctuation(td_accessor), true)
          .attr('data-value', td_value)
          .style('width', this_column.width)
          .style('text-align', td_type === 'title' || td_type === 'text' ? 'left' : 'right');

        this._format_element(td, td_value, this_column);

        if (td_type === 'title') {
          this_title = td.append('div').text(td_text);
          this._format_element(this_title, td_text, this_column);

          if (args.columns[j].hasOwnProperty('secondary_accessor')) {
            td.append('div')
              .text(args.data[i][args.columns[j].secondary_accessor])
              .classed("secondary-title", true);
          }
        } else {
          td.text(td_text);
        }
      }
    }

    return this;
  };

  return this;
};

(function() {
  'use strict';

  function mg_missing_add_text(svg, args) {
    svg.selectAll('.mg-missing-text').data([args.missing_text])
      .enter().append('text')
      .attr('class', 'mg-missing-text')
      .attr('x', args.width / 2)
      .attr('y', args.height / 2)
      .attr('dy', '.50em')
      .attr('text-anchor', 'middle')
      .text(args.missing_text);
  }

  function mg_missing_x_scale(args) {
    args.scales.X = d3.scaleLinear()
      .domain([0, args.data.length])
      .range([mg_get_plot_left(args), mg_get_plot_right(args)]);
    args.scalefns.yf = function(di) {
      return args.scales.Y(di.y); };
  }

  function mg_missing_y_scale(args) {
    args.scales.Y = d3.scaleLinear()
      .domain([-2, 2])
      .range([args.height - args.bottom - args.buffer * 2, args.top]);
    args.scalefns.xf = function(di) {
      return args.scales.X(di.x); };
  }

  function mg_make_fake_data(args) {
    var data = [];
    for (var x = 1; x <= 50; x++) {
      data.push({ 'x': x, 'y': Math.random() - (x * 0.03) });
    }
    args.data = data;
  }

  function mg_add_missing_background_rect(g, args) {
    g.append('svg:rect')
      .classed('mg-missing-background', true)
      .attr('x', args.buffer)
      .attr('y', args.buffer + args.title_y_position * 2)
      .attr('width', args.width - args.buffer * 2)
      .attr('height', args.height - args.buffer * 2 - args.title_y_position * 2)
      .attr('rx', 15)
      .attr('ry', 15);
  }

  function mg_missing_add_line(g, args) {
    var line = d3.line()
      .x(args.scalefns.xf)
      .y(args.scalefns.yf)
      .curve(args.interpolate);

    g.append('path')
      .attr('class', 'mg-main-line mg-line1-color')
      .attr('d', line(args.data));
  }

  function mg_missing_add_area(g, args) {
    var area = d3.area()
      .x(args.scalefns.xf)
      .y0(args.scales.Y.range()[0])
      .y1(args.scalefns.yf)
      .curve(args.interpolate);

    g.append('path')
      .attr('class', 'mg-main-area mg-area1-color')
      .attr('d', area(args.data));
  }

  function mg_remove_all_children(args) {
    d3.select(args.target).selectAll('svg *').remove();
  }

  function mg_missing_remove_legend(args) {
    if (args.legend_target) {
      d3.select(args.legend_target).html('');
    }
  }

  function missingData(args) {
    this.init = function(args) {
      this.args = args;

      mg_init_compute_width(args);
      mg_init_compute_height(args);

      // create svg if one doesn't exist

      var container = d3.select(args.target);
      mg_raise_container_error(container, args);
      var svg = container.selectAll('svg');
      mg_remove_svg_if_chart_type_has_changed(svg, args);
      svg = mg_add_svg_if_it_doesnt_exist(svg, args);
      mg_adjust_width_and_height_if_changed(svg, args);
      mg_set_viewbox_for_scaling(svg, args);
      mg_remove_all_children(args);

      svg.classed('mg-missing', true);
      mg_missing_remove_legend(args);

      chart_title(args);

      // are we adding a background placeholder
      if (args.show_missing_background) {
        mg_make_fake_data(args);
        mg_missing_x_scale(args);
        mg_missing_y_scale(args);
        var g = mg_add_g(svg, 'mg-missing-pane');

        mg_add_missing_background_rect(g, args);
        mg_missing_add_line(g, args);
        mg_missing_add_area(g, args);
      }

      mg_missing_add_text(svg, args);

      this.windowListeners();

      return this;
    };

    this.windowListeners = function() {
      mg_window_listeners(this.args);
      return this;
    };

    this.init(args);
  }

  var defaults = {
    top: 40, // the size of the top margin
    bottom: 30, // the size of the bottom margin
    right: 10, // size of the right margin
    left: 0, // size of the left margin
    buffer: 8, // the buffer between the actual chart area and the margins
    legend_target: '',
    width: 350,
    height: 220,
    missing_text: 'Data currently missing or unavailable',
    scalefns: {},
    scales: {},
    show_tooltips: true,
    show_missing_background: true
  };

  MG.register('missing-data', missingData, defaults);
}).call(this);

function mg_process_scale_ticks(args, axis) {
  var accessor;
  var scale_ticks;
  var max;

  if (axis === 'x') {
    accessor = args.x_accessor;
    scale_ticks = args.scales.X.ticks(args.xax_count);
    max = args.processed.max_x;
  } else if (axis === 'y') {
    accessor = args.y_accessor;
    scale_ticks = args.scales.Y.ticks(args.yax_count)
    max = args.processed.max_y;
  }

  function log10(val) {
    if (val === 1000) {
      return 3;
    }
    if (val === 1000000) {
      return 7;
    }
    return Math.log(val) / Math.LN10;
  }

  if ((axis === 'x' && args.x_scale_type === 'log') || (axis === 'y' && args.y_scale_type === 'log')) {
    // get out only whole logs
    scale_ticks = scale_ticks.filter(function(d) {
      return Math.abs(log10(d)) % 1 < 1e-6 || Math.abs(log10(d)) % 1 > 1 - 1e-6;
    });
  }

  // filter out fraction ticks if our data is ints and if xmax > number of generated ticks
  var number_of_ticks = scale_ticks.length;

  // is our data object all ints?
  var data_is_int = true;
  args.data.forEach(function(d, i) {
    d.forEach(function(d, i) {
      if (d[accessor] % 1 !== 0) {
        data_is_int = false;
        return false;
      }
    });
  });

  if (data_is_int && number_of_ticks > max && args.format === 'count') {
    // remove non-integer ticks
    scale_ticks = scale_ticks.filter(function(d) {
      return d % 1 === 0;
    });
  }

  if (axis === 'x') {
    args.processed.x_ticks = scale_ticks;
  } else if (axis === 'y') {
    args.processed.y_ticks = scale_ticks;
  }
}

function raw_data_transformation(args) {
  'use strict';

  // dupe our data so we can modify it without adverse effect
  args.data = MG.clone(args.data);

  // we need to account for a few data format cases:
  // #0 {bar1:___, bar2:___}                                    // single object (for, say, bar charts)
  // #1 [{key:__, value:__}, ...]                               // unnested obj-arrays
  // #2 [[{key:__, value:__}, ...], [{key:__, value:__}, ...]]  // nested obj-arrays
  // #3 [[4323, 2343],..]                                       // unnested 2d array
  // #4 [[[4323, 2343],..] , [[4323, 2343],..]]                 // nested 2d array
  args.single_object = false; // for bar charts.
  args.array_of_objects = false;
  args.array_of_arrays = false;
  args.nested_array_of_arrays = false;
  args.nested_array_of_objects = false;

  // is the data object a nested array?

  if (is_array_of_arrays(args.data)) {
    args.nested_array_of_objects = args.data.map(function(d) {
      return is_array_of_objects_or_empty(d);
    }); // Case #2
    args.nested_array_of_arrays = args.data.map(function(d) {
      return is_array_of_arrays(d);
    }); // Case #4
  } else {
    args.array_of_objects = is_array_of_objects(args.data); // Case #1
    args.array_of_arrays = is_array_of_arrays(args.data); // Case #3
  }

  if (args.chart_type === 'line') {
    if (args.array_of_objects || args.array_of_arrays) {
      args.data = [args.data];
    }
  } else {
    if (!(mg_is_array(args.data[0]))) {
      args.data = [args.data];
    }
  }
  // if the y_accessor is an array, break it up and store the result in args.data
  mg_process_multiple_x_accessors(args);
  mg_process_multiple_y_accessors(args);

  // if user supplies keyword in args.color, change to arg.colors.
  // this is so that the API remains fairly sensible and legible.
  if (args.color !== undefined) {
    args.colors = args.color;
  }

  // if user has supplied args.colors, and that value is a string, turn it into an array.
  if (args.colors !== null && typeof args.colors === 'string') {
    args.colors = [args.colors];
  }

  // sort x-axis data
  if (args.chart_type === 'line' && args.x_sort === true) {
    for (var i = 0; i < args.data.length; i++) {
      args.data[i].sort(function(a, b) {
        return a[args.x_accessor] - b[args.x_accessor];
      });
    }
  }

  return this;
}

function mg_process_multiple_accessors(args, which_accessor) {
  // turns an array of accessors into ...
  if (mg_is_array(args[which_accessor])) {
    args.data = args.data.map(function(_d) {
      return args[which_accessor].map(function(ya) {
        return _d.map(function(di) {
          di = MG.clone(di);

          if (di[ya] === undefined) {
            return undefined;
          }

          di['multiline_' + which_accessor] = di[ya];
          return di;
        }).filter(function(di) {
          return di !== undefined;
        });
      });
    })[0];
    args[which_accessor] = 'multiline_' + which_accessor;
  }
}

function mg_process_multiple_x_accessors(args) {
  mg_process_multiple_accessors(args, 'x_accessor');
}

function mg_process_multiple_y_accessors(args) {
  mg_process_multiple_accessors(args, 'y_accessor');
}

MG.raw_data_transformation = raw_data_transformation;

function process_line(args) {
  'use strict';

  var time_frame;

  // do we have a time-series?
  var is_time_series = d3.sum(args.data.map(function(series) {
    return series.length > 0 && mg_is_date(series[0][args.x_accessor]);
  })) > 0;

  // are we replacing missing y values with zeros?
  if ((args.missing_is_zero || args.missing_is_hidden) && args.chart_type === 'line' && is_time_series) {
    for (var i = 0; i < args.data.length; i++) {
      // we need to have a dataset of length > 2, so if it's less than that, skip
      if (args.data[i].length <= 1) {
        continue;
      }

      var first = args.data[i][0];
      var last = args.data[i][args.data[i].length - 1];

      // initialize our new array for storing the processed data
      var processed_data = [];

      // we'll be starting from the day after our first date
      var start_date = MG.clone(first[args.x_accessor]).setDate(first[args.x_accessor].getDate() + 1);

      // if we've set a max_x, add data points up to there
      var from = (args.min_x) ? args.min_x : start_date;
      var upto = (args.max_x) ? args.max_x : last[args.x_accessor];

      time_frame = mg_get_time_frame((upto - from) / 1000);

      if (['four-days', 'many-days', 'many-months', 'years', 'default'].indexOf(time_frame) !== -1 && args.missing_is_hidden_accessor === null) {
        for (var d = new Date(from); d <= upto; d.setDate(d.getDate() + 1)) {
          var o = {};
          d.setHours(0, 0, 0, 0);

          // add the first date item, we'll be starting from the day after our first date
          if (Date.parse(d) === Date.parse(new Date(start_date))) {
            processed_data.push(MG.clone(args.data[i][0]));
          }

          // check to see if we already have this date in our data object
          var existing_o = null;
          args.data[i].forEach(function(val, i) {
            if (Date.parse(val[args.x_accessor]) === Date.parse(new Date(d))) {
              existing_o = val;

              return false;
            }
          });

          // if we don't have this date in our data object, add it and set it to zero
          if (!existing_o) {
            o[args.x_accessor] = new Date(d);
            o[args.y_accessor] = 0;
            o['_missing'] = true; //we want to distinguish between zero-value and missing observations
            processed_data.push(o);
          }

          // if the data point has, say, a 'missing' attribute set or if its
          // y-value is null identify it internally as missing
          else if (existing_o[args.missing_is_hidden_accessor] || existing_o[args.y_accessor] === null) {
            existing_o['_missing'] = true;
            processed_data.push(existing_o);
          }

          //otherwise, use the existing object for that date
          else {
            processed_data.push(existing_o);
          }
        }
      } else {
        for (var j = 0; j < args.data[i].length; j += 1) {
          var obj = MG.clone(args.data[i][j]);
          obj['_missing'] = args.data[i][j][args.missing_is_hidden_accessor];
          processed_data.push(obj);
        }
      }

      // update our date object
      args.data[i] = processed_data;
    }
  }

  return this;
}

MG.process_line = process_line;

function process_histogram(args) {
  'use strict';

  // if args.binned == false, then we need to bin the data appropriately.
  // if args.binned == true, then we need to make sure to compute the relevant computed data.
  // the outcome of either of these should be something in args.computed_data.
  // the histogram plotting function will be looking there for the data to plot.

  // we need to compute an array of objects.
  // each object has an x, y, and dx.

  // histogram data is always single dimension
  var our_data = args.data[0];

  var extracted_data;
  if (args.binned === false) {
    // use d3's built-in layout.histogram functionality to compute what you need.

    if (typeof(our_data[0]) === 'object') {
      // we are dealing with an array of objects. Extract the data value of interest.
      extracted_data = our_data
        .map(function(d) {
          return d[args.x_accessor];
        });
    } else if (typeof(our_data[0]) === 'number') {
      // we are dealing with a simple array of numbers. No extraction needed.
      extracted_data = our_data;
    } else {
      console.log('TypeError: expected an array of numbers, found ' + typeof(our_data[0]));
      return;
    }

    var hist = d3.histogram();
    if (args.bins) {
      hist.thresholds(args.bins);
    }

    var bins = hist(extracted_data);
    args.processed_data = bins.map(function(d) {
      return { 'x': d.x0, 'y': d.length };
    });
  } else {
    // here, we just need to reconstruct the array of objects
    // take the x accessor and y accessor.
    // pull the data as x and y. y is count.

    args.processed_data = our_data.map(function(d) {
      return { 'x': d[args.x_accessor], 'y': d[args.y_accessor] };
    });

    var this_pt;
    var next_pt;

    // we still need to compute the dx component for each data point
    for (var i = 0; i < args.processed_data.length; i++) {
      this_pt = args.processed_data[i];
      if (i === args.processed_data.length - 1) {
        this_pt.dx = args.processed_data[i - 1].dx;
      } else {
        next_pt = args.processed_data[i + 1];
        this_pt.dx = next_pt.x - this_pt.x;
      }
    }
  }

  // capture the original data and accessors before replacing args.data
  if (!args.processed) {
    args.processed = {};
  }
  args.processed.original_data = args.data;
  args.processed.original_x_accessor = args.x_accessor;
  args.processed.original_y_accessor = args.y_accessor;

  args.data = [args.processed_data];
  args.x_accessor = args.processed_x_accessor;
  args.y_accessor = args.processed_y_accessor;

  return this;
}

MG.process_histogram = process_histogram;

// for use with bar charts, etc.
function process_categorical_variables(args) {
  'use strict';

  var extracted_data, processed_data = {},
    pd = [];
  //var our_data = args.data[0];
  var label_accessor = args.bar_orientation === 'vertical' ? args.x_accessor : args.y_accessor;
  var data_accessor = args.bar_orientation === 'vertical' ? args.y_accessor : args.x_accessor;

  return this;
}

MG.process_categorical_variables = process_categorical_variables;

function process_point(args) {
  'use strict';

  var data = args.data[0];
  var x = data.map(function(d) {
    return d[args.x_accessor];
  });
  var y = data.map(function(d) {
    return d[args.y_accessor];
  });

  if (args.least_squares) {
    args.ls_line = least_squares(x, y);
  }

  return this;
}

MG.process_point = process_point;

function add_ls(args) {
  var svg = mg_get_svg_child_of(args.target);
  var data = args.data[0];
  var min_x = d3.min(data, function(d) {
    return d[args.x_accessor]; });
  var max_x = d3.max(data, function(d) {
    return d[args.x_accessor]; });

  d3.select(args.target).selectAll('.mg-least-squares-line').remove();

  svg.append('svg:line')
    .attr('x1', args.scales.X(min_x))
    .attr('x2', args.scales.X(max_x))
    .attr('y1', args.scales.Y(args.ls_line.fit(min_x)))
    .attr('y2', args.scales.Y(args.ls_line.fit(max_x)))
    .attr('class', 'mg-least-squares-line');
}

MG.add_ls = add_ls;

function add_lowess(args) {
  var svg = mg_get_svg_child_of(args.target);
  var lowess = args.lowess_line;

  var line = d3.svg.line()
    .x(function(d) {
      return args.scales.X(d.x); })
    .y(function(d) {
      return args.scales.Y(d.y); })
    .interpolate(args.interpolate);

  svg.append('path')
    .attr('d', line(lowess))
    .attr('class', 'mg-lowess-line');
}

MG.add_lowess = add_lowess;

function lowess_robust(x, y, alpha, inc) {
  // Used http://www.unc.edu/courses/2007spring/biol/145/001/docs/lectures/Oct27.html
  // for the clear explanation of robust lowess.

  // calculate the the first pass.
  var _l;
  var r = [];
  var yhat = d3.mean(y);
  var i;
  for (i = 0; i < x.length; i += 1) { r.push(1); }
  _l = _calculate_lowess_fit(x, y, alpha, inc, r);
  var x_proto = _l.x;
  var y_proto = _l.y;

  // Now, take the fit, recalculate the weights, and re-run LOWESS using r*w instead of w.

  for (i = 0; i < 100; i += 1) {
    r = d3.zip(y_proto, y).map(function(yi) {
      return Math.abs(yi[1] - yi[0]);
    });

    var q = d3.quantile(r.sort(), 0.5);

    r = r.map(function(ri) {
      return _bisquare_weight(ri / (6 * q));
    });

    _l = _calculate_lowess_fit(x, y, alpha, inc, r);
    x_proto = _l.x;
    y_proto = _l.y;
  }

  return d3.zip(x_proto, y_proto).map(function(d) {
    var p = {};
    p.x = d[0];
    p.y = d[1];
    return p;
  });
}

MG.lowess_robust = lowess_robust;

function lowess(x, y, alpha, inc) {
  var r = [];
  for (var i = 0; i < x.length; i += 1) { r.push(1); }
  var _l = _calculate_lowess_fit(x, y, alpha, inc, r);
}

MG.lowess = lowess;

function least_squares(x_, y_) {
  var x, y, xi, yi,
    _x = 0,
    _y = 0,
    _xy = 0,
    _xx = 0;

  var n = x_.length;
  if (mg_is_date(x_[0])) {
    x = x_.map(function(d) {
      return d.getTime();
    });
  } else {
    x = x_;
  }

  if (mg_is_date(y_[0])) {
    y = y_.map(function(d) {
      return d.getTime();
    });
  } else {
    y = y_;
  }

  var xhat = d3.mean(x);
  var yhat = d3.mean(y);
  var numerator = 0,
    denominator = 0;

  for (var i = 0; i < x.length; i++) {
    xi = x[i];
    yi = y[i];
    numerator += (xi - xhat) * (yi - yhat);
    denominator += (xi - xhat) * (xi - xhat);
  }

  var beta = numerator / denominator;
  var x0 = yhat - beta * xhat;

  return {
    x0: x0,
    beta: beta,
    fit: function(x) {
      return x0 + x * beta;
    }
  };
}

MG.least_squares = least_squares;

function _pow_weight(u, w) {
  if (u >= 0 && u <= 1) {
    return Math.pow(1 - Math.pow(u, w), w);
  } else {
    return 0;
  }
}

function _bisquare_weight(u) {
  return _pow_weight(u, 2);
}

function _tricube_weight(u) {
  return _pow_weight(u, 3);
}

function _neighborhood_width(x0, xis) {
  return Array.max(xis.map(function(xi) {
    return Math.abs(x0 - xi);
  }));
}

function _manhattan(x1, x2) {
  return Math.abs(x1 - x2);
}

function _weighted_means(wxy) {
  var wsum = d3.sum(wxy.map(function(wxyi) {
    return wxyi.w; }));

  return {
    xbar: d3.sum(wxy.map(function(wxyi) {
      return wxyi.w * wxyi.x;
    })) / wsum,
    ybar: d3.sum(wxy.map(function(wxyi) {
      return wxyi.w * wxyi.y;
    })) / wsum
  };
}

function _weighted_beta(wxy, xbar, ybar) {
  var num = d3.sum(wxy.map(function(wxyi) {
    return Math.pow(wxyi.w, 2) * (wxyi.x - xbar) * (wxyi.y - ybar);
  }));

  var denom = d3.sum(wxy.map(function(wxyi) {
    return Math.pow(wxyi.w, 2) * Math.pow(wxyi.x - xbar, 2);
  }));

  return num / denom;
}

function _weighted_least_squares(wxy) {
  var ybar, xbar, beta_i, x0;

  var _wm = _weighted_means(wxy);

  xbar = _wm.xbar;
  ybar = _wm.ybar;

  var beta = _weighted_beta(wxy, xbar, ybar);

  return {
    beta: beta,
    xbar: xbar,
    ybar: ybar,
    x0: ybar - beta * xbar

  };
}

function _calculate_lowess_fit(x, y, alpha, inc, residuals) {
  // alpha - smoothing factor. 0 < alpha < 1/
  //
  //
  var k = Math.floor(x.length * alpha);

  var sorted_x = x.slice();

  sorted_x.sort(function(a, b) {
    if (a < b) {
      return -1; } else if (a > b) {
      return 1; }

    return 0;
  });

  var x_max = d3.quantile(sorted_x, 0.98);
  var x_min = d3.quantile(sorted_x, 0.02);

  var xy = d3.zip(x, y, residuals).sort();

  var size = Math.abs(x_max - x_min) / inc;

  var smallest = x_min;
  var largest = x_max;
  var x_proto = d3.range(smallest, largest, size);

  var xi_neighbors;
  var x_i, beta_i, x0_i, delta_i, xbar, ybar;

  // for each prototype, find its fit.
  var y_proto = [];

  for (var i = 0; i < x_proto.length; i += 1) {
    x_i = x_proto[i];

    // get k closest neighbors.
    xi_neighbors = xy.map(function(xyi) {
      return [
        Math.abs(xyi[0] - x_i),
        xyi[0],
        xyi[1],
        xyi[2]
      ];
    }).sort().slice(0, k);

    // Get the largest distance in the neighbor set.
    delta_i = d3.max(xi_neighbors)[0];

    // Prepare the weights for mean calculation and WLS.

    xi_neighbors = xi_neighbors.map(function(wxy) {
      return {
        w: _tricube_weight(wxy[0] / delta_i) * wxy[3],
        x: wxy[1],
        y: wxy[2]
      };
    });

    // Find the weighted least squares, obviously.
    var _output = _weighted_least_squares(xi_neighbors);

    x0_i = _output.x0;
    beta_i = _output.beta;

    //
    y_proto.push(x0_i + beta_i * x_i);
  }

  return { x: x_proto, y: y_proto };
}

function format_rollover_number(args) {
  var num;
  if (args.format === 'count') {
    num = function(d) {
      var is_float = d % 1 !== 0;
      var pf;

      if (is_float) {
        pf = d3.format(',.' + args.decimals + 'f');
      } else {
        pf = d3.format(',.0f');
      }

      // are we adding units after the value or before?
      if (args.yax_units_append) {
        return pf(d) + args.yax_units;
      } else {
        return args.yax_units + pf(d);
      }
    };
  } else {
    num = function(d_) {
      var fmt_string = (args.decimals ? '.' + args.decimals : '') + '%';
      var pf = d3.format(fmt_string);
      return pf(d_);
    };
  }
  return num;
}

var time_rollover_format = function(f, d, accessor, utc) {
  var fd;
  if (typeof f === 'string') {
    fd = MG.time_format(utc, f)(d[accessor]);
  } else if (typeof f === 'function') {
    fd = f(d);
  } else {
    fd = d[accessor];
  }
  return fd;
}

// define our rollover format for numbers
var number_rollover_format = function(f, d, accessor) {
  var fd;
  if (typeof f === 'string') {
    fd = d3.format('s')(d[accessor]);
  } else if (typeof f === 'function') {
    fd = f(d);
  } else {
    fd = d[accessor];
  }
  return fd;
}

function mg_format_y_rollover(args, num, d) {
  var formatted_y;
  if (args.y_mouseover !== null) {
    if (args.aggregate_rollover) {
      formatted_y = number_rollover_format(args.y_mouseover, d, args.y_accessor);
    } else {
      formatted_y = number_rollover_format(args.y_mouseover, d, args.y_accessor);
    }
  } else {
    if (args.time_series) {
      if (args.aggregate_rollover) {
        formatted_y = num(d[args.y_accessor]);
      } else {
        formatted_y = args.yax_units + num(d[args.y_accessor]);
      }
    } else {
      formatted_y = args.y_accessor + ': ' + args.yax_units + num(d[args.y_accessor]);
    }
  }
  return formatted_y;
}

function mg_format_x_rollover(args, fmt, d) {
  var formatted_x;
  if (args.x_mouseover !== null) {
    if (args.time_series) {
      if (args.aggregate_rollover) {
        formatted_x = time_rollover_format(args.x_mouseover, d, 'key', args.utc);
      } else {
        formatted_x = time_rollover_format(args.x_mouseover, d, args.x_accessor, args.utc);
      }
    } else {
      formatted_x = number_rollover_format(args.x_mouseover, d, args.x_accessor);
    }
  } else {
    if (args.time_series) {
      var date;

      if (args.aggregate_rollover && args.data.length > 1) {
        date = new Date(d.key);
      } else {
        date = new Date(+d[args.x_accessor]);
        date.setDate(date.getDate());
      }

      formatted_x = fmt(date) + '  ';
    } else {
      formatted_x = args.x_accessor + ': ' + d[args.x_accessor] + '   ';
    }
  }
  return formatted_x;
}

function mg_format_data_for_mouseover(args, d, mouseover_fcn, accessor, check_time) {
  var formatted_data, formatter;
  var time_fmt = mg_get_rollover_time_format(args);
  if (typeof d[accessor] === 'string') {
    formatter = function(d) {
      return d;
    }
  } else {
    formatter = format_rollover_number(args);
  }

  if (mouseover_fcn !== null) {
    if (check_time) formatted_data = time_rollover_format(mouseover_fcn, d, accessor, args.utc);
    else formatted_data = number_rollover_format(mouseover_fcn, d, accessor);

  } else {
    if (check_time) formatted_data = time_fmt(new Date(+d[accessor])) + '  ';
    else formatted_data = (args.time_series ? '' : accessor + ': ') + formatter(d[accessor]) + '   ';
  }
  return formatted_data;
}

function mg_format_number_mouseover(args, d) {
  return mg_format_data_for_mouseover(args, d, args.x_mouseover, args.x_accessor, false);
}

function mg_format_x_mouseover(args, d) {
  return mg_format_data_for_mouseover(args, d, args.x_mouseover, args.x_accessor, args.time_series);
}

function mg_format_y_mouseover(args, d) {
  return mg_format_data_for_mouseover(args, d, args.y_mouseover, args.y_accessor, false);
}

function mg_format_x_aggregate_mouseover(args, d) {
  return mg_format_data_for_mouseover(args, d, args.x_mouseover, 'key', args.time_series)
}

MG.format_rollover_number = format_rollover_number;

// http://bl.ocks.org/mbostock/3916621
function path_tween(d1, precision) {
  return function() {
    var path0 = this,
      path1 = path0.cloneNode(),
      n0 = path0.getTotalLength() || 0,
      n1 = (path1.setAttribute("d", d1), path1).getTotalLength() || 0;

    // Uniform sampling of distance based on specified precision.
    var distances = [0],
      i = 0,
      dt = precision / Math.max(n0, n1);
    while ((i += dt) < 1) distances.push(i);
    distances.push(1);

    // Compute point-interpolators at each distance.
    var points = distances.map(function(t) {
      var p0 = path0.getPointAtLength(t * n0),
        p1 = path1.getPointAtLength(t * n1);
      return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
    });

    return function(t) {
      return t < 1 ? "M" + points.map(function(p) {
        return p(t);
      }).join("L") : d1;
    };
  };
}

MG.path_tween = path_tween;

// influenced by https://bl.ocks.org/tomgp/c99a699587b5c5465228

function render_markup_for_server(callback) {
  var virtual_window = MG.virtual_window;
  var virtual_d3 = d3.select(virtual_window.document);
  var target = virtual_window.document.createElement('div');

  var original_d3 = global.d3;
  var original_window = global.window;
  var original_document = global.document;
  global.d3 = virtual_d3;
  global.window = virtual_window;
  global.document = virtual_window.document;

  var error;
  try {
    callback(target);
  } catch(e) {
    error = e;
  }

  global.d3 = original_d3;
  global.window = original_window;
  global.document = original_document;

  if (error) {
    throw error;
  }

  /* for some reason d3.select parses jsdom elements incorrectly
   * but it works if we wrap the element in a function.
   */
  return virtual_d3.select(function targetFn() {
    return target;
  }).html();
}

function render_markup_for_client(callback) {
  var target = document.createElement('div');
  callback(target);
  return d3.select(target).html();
}

function render_markup(callback) {
  switch(typeof window) {
    case 'undefined':
      return render_markup_for_server(callback);
    default:
      return render_markup_for_client(callback);
  }
}

function init_virtual_window(jsdom, force) {
  if (MG.virtual_window && !force) {
    return;
  }

  var doc = jsdom.jsdom({
    html: '',
    features: { QuerySelector: true }
  });
  MG.virtual_window = doc.defaultView;
}

MG.render_markup = render_markup;
MG.init_virtual_window = init_virtual_window;

// call this to add a warning icon to a graph and log an error to the console
function error(args) {
  console.error('ERROR : ', args.target, ' : ', args.error);

  d3.select(args.target).select('.mg-chart-title')
    .append('tspan')
      .attr('class', 'fa fa-x fa-exclamation-circle mg-warning')
      .attr('dx', '0.3em')
      .text('\uf06a');
}

function internal_error(args) {
  console.error('INTERNAL ERROR : ', args.target, ' : ', args.internal_error);
}

MG.error = error;

return MG;
}));
