(function() { var define = undefined; return (function outer(modules, cache, entry) {
  if (typeof Bokeh !== "undefined") {
    var _ = Bokeh._;

    for (var name in modules) {
      Bokeh.require.modules[name] = modules[name];
    }

    for (var i = 0; i < entry.length; i++) {
        var exports = Bokeh.require(entry[i]);

        if (_.isObject(exports.models)) {
          Bokeh.Models.register_locations(exports.models);
        }

        _.extend(Bokeh, _.omit(exports, "models"));
    }
  } else {
    throw new Error("Cannot find Bokeh. You have to load it prior to loading plugins.");
  }
})
({"api":[function(require,module,exports){
var _;

_ = require("underscore");

module.exports = {
  LinAlg: require("./api/linalg"),
  Charts: require("./api/charts"),
  Plotting: require("./api/plotting"),
  Document: require("./document").Document,
  sprintf: require("sprintf")
};

_.extend(module.exports, require("./api/models"));

},{"./api/charts":"api/charts","./api/linalg":"api/linalg","./api/models":"api/models","./api/plotting":"api/plotting","./document":"document","sprintf":"sprintf","underscore":"underscore"}],"api/charts":[function(require,module,exports){
var $, Document, _, bar, cumsum, embed, hexcolor2rgb, is_dark, models, num2hexcolor, palettes, pie, sprintf, sum;

_ = require("underscore");

$ = require("jquery");

sprintf = require("sprintf");

Document = require("../document").Document;

embed = require("../embed");

models = require("./models");

palettes = require("../palettes/palettes");

sum = function(array) {
  return array.reduce(((function(_this) {
    return function(a, b) {
      return a + b;
    };
  })(this)), 0);
};

cumsum = function(array) {
  var result;
  result = [];
  array.reduce((function(a, b, i) {
    return result[i] = a + b;
  }), 0);
  return result;
};

num2hexcolor = function(num) {
  return sprintf("#%06x", num);
};

hexcolor2rgb = function(color) {
  var b, g, r;
  r = parseInt(color.substr(1, 2), 16);
  g = parseInt(color.substr(3, 2), 16);
  b = parseInt(color.substr(5, 2), 16);
  return [r, g, b];
};

is_dark = function(arg) {
  var b, g, l, r;
  r = arg[0], g = arg[1], b = arg[2];
  l = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return l >= 0.6;
};

pie = function(data, opts) {
  var angle_span, colors, cumulative_values, cx, cy, end_angle, end_angles, g1, g2, h1, half_angles, half_radius, hover, i, inner_radius, k, labels, normalized_values, outer_radius, palette, plot, r1, r2, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, source, start_angle, start_angles, text_angles, text_colors, text_cx, text_cy, to_cartesian, to_radians, tooltip, total_value, values, xdr, ydr;
  if (opts == null) {
    opts = {};
  }
  labels = [];
  values = [];
  for (i = k = 0, ref = Math.min(data.labels.length, data.values.length); 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
    if (data.values[i] > 0) {
      labels.push(data.labels[i]);
      values.push(data.values[i]);
    }
  }
  start_angle = (ref1 = opts.start_angle) != null ? ref1 : 0;
  end_angle = (ref2 = opts.end_angle) != null ? ref2 : start_angle + 2 * Math.PI;
  angle_span = Math.abs(end_angle - start_angle);
  to_radians = function(x) {
    return angle_span * x;
  };
  total_value = sum(values);
  normalized_values = values.map(function(v) {
    return v / total_value;
  });
  cumulative_values = cumsum(normalized_values);
  end_angles = cumulative_values.map(function(v) {
    return start_angle + to_radians(v);
  });
  start_angles = [start_angle].concat(end_angles.slice(0, -1));
  half_angles = _.zip(start_angles, end_angles).map((function(_this) {
    return function(arg) {
      var end, start;
      start = arg[0], end = arg[1];
      return (start + end) / 2;
    };
  })(this));
  if (opts.center == null) {
    cx = 0;
    cy = 0;
  } else if (_.isArray(opts.center)) {
    cx = opts.center[0];
    cy = opts.center[1];
  } else {
    cx = opts.center.x;
    cy = opts.center.y;
  }
  inner_radius = (ref3 = opts.inner_radius) != null ? ref3 : 0;
  outer_radius = (ref4 = opts.outer_radius) != null ? ref4 : 1;
  if (_.isArray(opts.palette)) {
    palette = opts.palette;
  } else {
    palette = palettes[(ref5 = opts.palette) != null ? ref5 : "Spectral11"].map(num2hexcolor);
  }
  colors = (function() {
    var m, ref6, results;
    results = [];
    for (i = m = 0, ref6 = normalized_values.length; 0 <= ref6 ? m < ref6 : m > ref6; i = 0 <= ref6 ? ++m : --m) {
      results.push(palette[i % palette.length]);
    }
    return results;
  })();
  text_colors = colors.map(function(c) {
    if (is_dark(hexcolor2rgb(c))) {
      return "white";
    } else {
      return "black";
    }
  });
  to_cartesian = function(r, alpha) {
    return [r * Math.cos(alpha), r * Math.sin(alpha)];
  };
  half_radius = (inner_radius + outer_radius) / 2;
  ref6 = _.unzip(half_angles.map((function(_this) {
    return function(half_angle) {
      return to_cartesian(half_radius, half_angle);
    };
  })(this))), text_cx = ref6[0], text_cy = ref6[1];
  text_cx = text_cx.map(function(x) {
    return x + cx;
  });
  text_cy = text_cy.map(function(y) {
    return y + cy;
  });
  text_angles = half_angles.map(function(a) {
    if (a >= Math.PI / 2 && a <= 3 * Math.PI / 2) {
      return a + Math.PI;
    } else {
      return a;
    }
  });
  source = new Bokeh.ColumnDataSource({
    data: {
      labels: labels,
      values: values,
      percentages: normalized_values.map((function(_this) {
        return function(v) {
          return sprintf("%.2f%%", v * 100);
        };
      })(this)),
      start_angles: start_angles,
      end_angles: end_angles,
      text_angles: text_angles,
      colors: colors,
      text_colors: text_colors,
      text_cx: text_cx,
      text_cy: text_cy
    }
  });
  g1 = new models.AnnularWedge({
    x: cx,
    y: cy,
    inner_radius: inner_radius,
    outer_radius: outer_radius,
    start_angle: {
      field: "start_angles"
    },
    end_angle: {
      field: "end_angles"
    },
    line_color: null,
    line_width: 1,
    fill_color: {
      field: "colors"
    }
  });
  h1 = new models.AnnularWedge({
    x: cx,
    y: cy,
    inner_radius: inner_radius,
    outer_radius: outer_radius,
    start_angle: {
      field: "start_angles"
    },
    end_angle: {
      field: "end_angles"
    },
    line_color: null,
    line_width: 1,
    fill_color: {
      field: "colors"
    },
    fill_alpha: 0.8
  });
  r1 = new models.GlyphRenderer({
    data_source: source,
    glyph: g1,
    hover_glyph: h1
  });
  g2 = new models.Text({
    x: {
      field: "text_cx"
    },
    y: {
      field: "text_cy"
    },
    text: {
      field: (ref7 = opts.slice_labels) != null ? ref7 : "labels"
    },
    angle: {
      field: "text_angles"
    },
    text_align: "center",
    text_baseline: "middle",
    text_color: {
      field: "text_colors"
    },
    text_font_size: "9pt"
  });
  r2 = new models.GlyphRenderer({
    data_source: source,
    glyph: g2
  });
  xdr = new models.DataRange1d({
    renderers: [r1],
    range_padding: 0.2
  });
  ydr = new models.DataRange1d({
    renderers: [r1],
    range_padding: 0.2
  });
  plot = new models.Plot({
    x_range: xdr,
    y_range: ydr
  });
  if (opts.width != null) {
    plot.plot_width = opts.width;
  }
  if (opts.height != null) {
    plot.plot_height = opts.height;
  }
  plot.add_renderers(r1, r2);
  tooltip = "<div>@labels</div><div><b>@values</b> (@percentages)</div>";
  hover = new models.HoverTool({
    renderers: [r1],
    tooltips: tooltip
  });
  plot.add_tools(hover);
  return plot;
};

bar = function(data, opts) {
  var anchor, attachment, bottom, column_names, columns, dy, g1, hover, i, j, k, label, labels, left, len, len1, len2, len3, len4, m, n, name, o, orientation, p, palette, plot, q, r, r1, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, renderers, right, row, rows, s, source, stacked, tooltip, top, v, xaxis, xdr, xformatter, yaxis, ydr;
  if (opts == null) {
    opts = {};
  }
  column_names = data[0];
  rows = data.slice(1);
  columns = (function() {
    var k, len, results;
    results = [];
    for (k = 0, len = column_names.length; k < len; k++) {
      name = column_names[k];
      results.push([]);
    }
    return results;
  })();
  for (k = 0, len = rows.length; k < len; k++) {
    row = rows[k];
    for (i = m = 0, len1 = row.length; m < len1; i = ++m) {
      v = row[i];
      columns[i].push(v);
    }
  }
  labels = _.map(columns[0], function(v) {
    return v.toString();
  });
  columns = columns.slice(1);
  yaxis = new models.CategoricalAxis();
  ydr = new models.FactorRange({
    factors: labels
  });
  if (opts.axis_number_format != null) {
    xformatter = new models.NumeralTickFormatter({
      format: opts.axis_number_format
    });
  } else {
    xformatter = new models.BasicTickFormatter();
  }
  xaxis = new models.LinearAxis({
    formatter: xformatter
  });
  xdr = new models.DataRange1d({
    start: 0
  });
  if (_.isArray(opts.palette)) {
    palette = opts.palette;
  } else {
    palette = palettes[(ref = opts.palette) != null ? ref : "Spectral11"].map(num2hexcolor);
  }
  stacked = (ref1 = opts.stacked) != null ? ref1 : false;
  orientation = (ref2 = opts.orientation) != null ? ref2 : "horizontal";
  renderers = [];
  if (stacked) {
    left = [];
    right = [];
    for (i = n = 0, ref3 = columns.length; 0 <= ref3 ? n < ref3 : n > ref3; i = 0 <= ref3 ? ++n : --n) {
      bottom = [];
      top = [];
      for (j = o = 0, len2 = labels.length; o < len2; j = ++o) {
        label = labels[j];
        if (i === 0) {
          left.push(0);
          right.push(columns[i][j]);
        } else {
          left[j] += columns[i - 1][j];
          right[j] += columns[i][j];
        }
        bottom.push(label + ":0");
        top.push(label + ":1");
      }
      source = new Bokeh.ColumnDataSource({
        data: {
          left: _.clone(left),
          right: _.clone(right),
          top: top,
          bottom: bottom,
          labels: labels,
          values: columns[i],
          columns: (function() {
            var len3, p, ref4, results;
            ref4 = columns[i];
            results = [];
            for (p = 0, len3 = ref4.length; p < len3; p++) {
              v = ref4[p];
              results.push(column_names[i + 1]);
            }
            return results;
          })()
        }
      });
      g1 = new models.Quad({
        left: {
          field: "left"
        },
        bottom: {
          field: "bottom"
        },
        right: {
          field: "right"
        },
        top: {
          field: "top"
        },
        line_color: null,
        fill_color: palette[i % palette.length]
      });
      r1 = new models.GlyphRenderer({
        data_source: source,
        glyph: g1
      });
      renderers.push(r1);
    }
  } else {
    dy = 1 / columns.length;
    for (i = p = 0, ref4 = columns.length; 0 <= ref4 ? p < ref4 : p > ref4; i = 0 <= ref4 ? ++p : --p) {
      left = [];
      right = [];
      bottom = [];
      top = [];
      for (j = q = 0, len3 = labels.length; q < len3; j = ++q) {
        label = labels[j];
        left.push(0);
        right.push(columns[i][j]);
        bottom.push(label + ":" + (i * dy));
        top.push(label + ":" + ((i + 1) * dy));
      }
      source = new Bokeh.ColumnDataSource({
        data: {
          left: left,
          right: right,
          top: top,
          bottom: bottom,
          labels: labels,
          values: columns[i],
          columns: (function() {
            var len4, ref5, results, s;
            ref5 = columns[i];
            results = [];
            for (s = 0, len4 = ref5.length; s < len4; s++) {
              v = ref5[s];
              results.push(column_names[i + 1]);
            }
            return results;
          })()
        }
      });
      g1 = new models.Quad({
        left: {
          field: "left"
        },
        bottom: {
          field: "bottom"
        },
        right: {
          field: "right"
        },
        top: {
          field: "top"
        },
        line_color: null,
        fill_color: palette[i % palette.length]
      });
      r1 = new models.GlyphRenderer({
        data_source: source,
        glyph: g1
      });
      renderers.push(r1);
    }
  }
  if (orientation === "vertical") {
    ref5 = [ydr, xdr], xdr = ref5[0], ydr = ref5[1];
    ref6 = [yaxis, xaxis], xaxis = ref6[0], yaxis = ref6[1];
    for (s = 0, len4 = renderers.length; s < len4; s++) {
      r = renderers[s];
      data = r.data_source.data;
      ref7 = [data.bottom, data.left], data.left = ref7[0], data.bottom = ref7[1];
      ref8 = [data.top, data.right], data.right = ref8[0], data.top = ref8[1];
    }
  }
  plot = new models.Plot({
    x_range: xdr,
    y_range: ydr
  });
  if (opts.width != null) {
    plot.plot_width = opts.width;
  }
  if (opts.height != null) {
    plot.plot_height = opts.height;
  }
  plot.add_renderers.apply(plot, renderers);
  plot.add_layout(yaxis, "left");
  plot.add_layout(xaxis, "below");
  tooltip = "<div>@labels</div><div>@columns:&nbsp<b>@values</b></div>";
  if (orientation === "horizontal") {
    anchor = "right_center";
    attachment = "horizontal";
  } else {
    anchor = "top_center";
    attachment = "vertical";
  }
  hover = new models.HoverTool({
    renderers: renderers,
    tooltips: tooltip,
    point_policy: "snap_to_data",
    anchor: anchor,
    attachment: attachment,
    show_arrow: opts.show_arrow
  });
  plot.add_tools(hover);
  return plot;
};

module.exports = {
  pie: pie,
  bar: bar
};

},{"../document":"document","../embed":"embed","../palettes/palettes":"palettes/palettes","./models":"api/models","jquery":"jquery","sprintf":"sprintf","underscore":"underscore"}],"api/linalg":[function(require,module,exports){
"use strict";
function transpose(array) {
    var rows = array.length;
    var cols = array[0].length;
    var transposed = [];
    for (var j = 0; j < cols; j++) {
        transposed[j] = [];
        for (var i = 0; i < rows; i++) {
            transposed[j][i] = array[i][j];
        }
    }
    return transposed;
}
exports.transpose = transpose;
function linspace(start, stop, num) {
    if (num === void 0) { num = 100; }
    var step = (stop - start) / (num - 1);
    var array = new Array(num);
    for (var i = 0; i < num; i++) {
        array[i] = start + step * i;
    }
    return array;
}
exports.linspace = linspace;
function arange(start, stop, step) {
    if (step === void 0) { step = 1; }
    var num = Math.ceil((stop - start) / step);
    var array = new Array(num);
    for (var i = 0; i < num; i++) {
        array[i] = start + step * i;
    }
    return array;
}
exports.arange = arange;

},{}],"api/models":[function(require,module,exports){
module.exports = {
  Arrow: require("../models/annotations/arrow").Model,
  OpenHead: require("../models/annotations/arrow_head").OpenHead,
  NormalHead: require("../models/annotations/arrow_head").NormalHead,
  VeeHead: require("../models/annotations/arrow_head").VeeHead,
  BoxAnnotation: require("../models/annotations/box_annotation").Model,
  ColorBar: require("../models/annotations/color_bar").Model,
  Label: require("../models/annotations/label").Model,
  LabelSet: require("../models/annotations/label_set").Model,
  Legend: require("../models/annotations/legend").Model,
  PolyAnnotation: require("../models/annotations/poly_annotation").Model,
  Span: require("../models/annotations/span").Model,
  Title: require("../models/annotations/title").Model,
  Tooltip: require("../models/annotations/tooltip").Model,
  Axis: require("../models/axes/axis").Model,
  ContinuousAxis: require("../models/axes/continuous_axis").Model,
  LinearAxis: require("../models/axes/linear_axis").Model,
  LogAxis: require("../models/axes/log_axis").Model,
  CategoricalAxis: require("../models/axes/categorical_axis").Model,
  DatetimeAxis: require("../models/axes/datetime_axis").Model,
  OpenURL: require("../models/callbacks/open_url").Model,
  CustomJS: require("../models/callbacks/customjs").Model,
  TickFormatter: require("../models/formatters/tick_formatter").Model,
  BasicTickFormatter: require("../models/formatters/basic_tick_formatter").Model,
  LogTickFormatter: require("../models/formatters/basic_tick_formatter").Model,
  CategoricalTickFormatter: require("../models/formatters/categorical_tick_formatter").Model,
  DatetimeTickFormatter: require("../models/formatters/datetime_tick_formatter").Model,
  FuncTickFormatter: require("../models/formatters/func_tick_formatter").Model,
  NumeralTickFormatter: require("../models/formatters/numeral_tick_formatter").Model,
  PrintfTickFormatter: require("../models/formatters/printf_tick_formatter").Model,
  Glyph: require("../models/glyphs/glyph").Model,
  AnnularWedge: require("../models/glyphs/annular_wedge").Model,
  Annulus: require("../models/glyphs/annulus").Model,
  Arc: require("../models/glyphs/arc").Model,
  Bezier: require("../models/glyphs/bezier").Model,
  Circle: require("../models/glyphs/circle").Model,
  Ellipse: require("../models/glyphs/ellipse").Model,
  ImageRGBA: require("../models/glyphs/image_rgba").Model,
  Image: require("../models/glyphs/image").Model,
  ImageURL: require("../models/glyphs/image_url").Model,
  Line: require("../models/glyphs/line").Model,
  MultiLine: require("../models/glyphs/multi_line").Model,
  Oval: require("../models/glyphs/oval").Model,
  Patch: require("../models/glyphs/patch").Model,
  Patches: require("../models/glyphs/patches").Model,
  Quad: require("../models/glyphs/quad").Model,
  Quadratic: require("../models/glyphs/quadratic").Model,
  Ray: require("../models/glyphs/ray").Model,
  Rect: require("../models/glyphs/rect").Model,
  Segment: require("../models/glyphs/segment").Model,
  Text: require("../models/glyphs/text").Model,
  Wedge: require("../models/glyphs/wedge").Model,
  Gear: require("../models/glyphs/gear").Model,
  Grid: require("../models/grids/grid").Model,
  ImageSource: require("../models/tiles/image_source").Model,
  LayoutDOM: require("../models/layouts/layout_dom").Model,
  Row: require("../models/layouts/row").Model,
  Column: require("../models/layouts/column").Model,
  Spacer: require("../models/layouts/spacer").Model,
  WidgetBox: require("../models/layouts/widget_box").Model,
  GMapPlot: require("../models/plots/gmap_plot").Model,
  LinearColorMapper: require("../models/mappers/linear_color_mapper").Model,
  markers: [require('../models/markers/index')],
  Model: require("../model").Model,
  Plot: require("../models/plots/plot").Model,
  Range: require("../models/ranges/range").Model,
  Range1d: require("../models/ranges/range1d").Model,
  DataRange: require("../models/ranges/data_range").Model,
  DataRange1d: require("../models/ranges/data_range1d").Model,
  FactorRange: require("../models/ranges/factor_range").Model,
  Renderer: require("../models/renderers/renderer").Model,
  TileRenderer: require("../models/tiles/tile_renderer").Model,
  DynamicImageRenderer: require("../models/tiles/dynamic_image_renderer").Model,
  GlyphRenderer: require("../models/renderers/glyph_renderer").Model,
  GuideRenderer: require("../models/renderers/guide_renderer").Model,
  DataSource: require("../models/sources/data_source").Model,
  ColumnDataSource: require("../models/sources/column_data_source").Model,
  AjaxDataSource: require("../models/sources/ajax_data_source").Model,
  Ticker: require("../models/tickers/ticker").Model,
  ContinuousTicker: require("../models/tickers/continuous_ticker").Model,
  FixedTicker: require("../models/tickers/fixed_ticker").Model,
  AdaptiveTicker: require("../models/tickers/adaptive_ticker").Model,
  CompositeTicker: require("../models/tickers/composite_ticker").Model,
  SingleIntervalTicker: require("../models/tickers/single_interval_ticker").Model,
  DaysTicker: require("../models/tickers/days_ticker").Model,
  MonthsTicker: require("../models/tickers/months_ticker").Model,
  YearsTicker: require("../models/tickers/years_ticker").Model,
  BasicTicker: require("../models/tickers/basic_ticker").Model,
  LogTicker: require("../models/tickers/log_ticker").Model,
  CategoricalTicker: require("../models/tickers/categorical_ticker").Model,
  DatetimeTicker: require("../models/tickers/datetime_ticker").Model,
  TileSource: require("../models/tiles/tile_source").Model,
  MercatorTileSource: require("../models/tiles/mercator_tile_source").Model,
  TMSTileSource: require("../models/tiles/tms_tile_source").Model,
  WMTSTileSource: require("../models/tiles/wmts_tile_source").Model,
  QUADKEYTileSource: require("../models/tiles/quadkey_tile_source").Model,
  BBoxTileSource: require("../models/tiles/bbox_tile_source").Model,
  ToolbarBase: require("../models/tools/toolbar_base").Model,
  Toolbar: require("../models/tools/toolbar").Model,
  ToolbarBox: require("../models/tools/toolbar_box").Model,
  ToolEvents: require("../common/tool_events").Model,
  Tool: require("../models/tools/tool").Model,
  PanTool: require("../models/tools/gestures/pan_tool").Model,
  WheelZoomTool: require("../models/tools/gestures/wheel_zoom_tool").Model,
  SaveTool: require("../models/tools/actions/save_tool").Model,
  UndoTool: require("../models/tools/actions/undo_tool").Model,
  RedoTool: require("../models/tools/actions/redo_tool").Model,
  ResetTool: require("../models/tools/actions/reset_tool").Model,
  ResizeTool: require("../models/tools/gestures/resize_tool").Model,
  CrosshairTool: require("../models/tools/inspectors/crosshair_tool").Model,
  BoxZoomTool: require("../models/tools/gestures/box_zoom_tool").Model,
  BoxSelectTool: require("../models/tools/gestures/box_select_tool").Model,
  LassoSelectTool: require("../models/tools/gestures/lasso_select_tool").Model,
  PolySelectTool: require("../models/tools/gestures/poly_select_tool").Model,
  TapTool: require("../models/tools/gestures/tap_tool").Model,
  HoverTool: require("../models/tools/inspectors/hover_tool").Model,
  HelpTool: require("../models/tools/actions/help_tool").Model
};

},{"../common/tool_events":"common/tool_events","../model":"model","../models/annotations/arrow":"models/annotations/arrow","../models/annotations/arrow_head":"models/annotations/arrow_head","../models/annotations/box_annotation":"models/annotations/box_annotation","../models/annotations/color_bar":"models/annotations/color_bar","../models/annotations/label":"models/annotations/label","../models/annotations/label_set":"models/annotations/label_set","../models/annotations/legend":"models/annotations/legend","../models/annotations/poly_annotation":"models/annotations/poly_annotation","../models/annotations/span":"models/annotations/span","../models/annotations/title":"models/annotations/title","../models/annotations/tooltip":"models/annotations/tooltip","../models/axes/axis":"models/axes/axis","../models/axes/categorical_axis":"models/axes/categorical_axis","../models/axes/continuous_axis":"models/axes/continuous_axis","../models/axes/datetime_axis":"models/axes/datetime_axis","../models/axes/linear_axis":"models/axes/linear_axis","../models/axes/log_axis":"models/axes/log_axis","../models/callbacks/customjs":"models/callbacks/customjs","../models/callbacks/open_url":"models/callbacks/open_url","../models/formatters/basic_tick_formatter":"models/formatters/basic_tick_formatter","../models/formatters/categorical_tick_formatter":"models/formatters/categorical_tick_formatter","../models/formatters/datetime_tick_formatter":"models/formatters/datetime_tick_formatter","../models/formatters/func_tick_formatter":"models/formatters/func_tick_formatter","../models/formatters/numeral_tick_formatter":"models/formatters/numeral_tick_formatter","../models/formatters/printf_tick_formatter":"models/formatters/printf_tick_formatter","../models/formatters/tick_formatter":"models/formatters/tick_formatter","../models/glyphs/annular_wedge":"models/glyphs/annular_wedge","../models/glyphs/annulus":"models/glyphs/annulus","../models/glyphs/arc":"models/glyphs/arc","../models/glyphs/bezier":"models/glyphs/bezier","../models/glyphs/circle":"models/glyphs/circle","../models/glyphs/ellipse":"models/glyphs/ellipse","../models/glyphs/gear":"models/glyphs/gear","../models/glyphs/glyph":"models/glyphs/glyph","../models/glyphs/image":"models/glyphs/image","../models/glyphs/image_rgba":"models/glyphs/image_rgba","../models/glyphs/image_url":"models/glyphs/image_url","../models/glyphs/line":"models/glyphs/line","../models/glyphs/multi_line":"models/glyphs/multi_line","../models/glyphs/oval":"models/glyphs/oval","../models/glyphs/patch":"models/glyphs/patch","../models/glyphs/patches":"models/glyphs/patches","../models/glyphs/quad":"models/glyphs/quad","../models/glyphs/quadratic":"models/glyphs/quadratic","../models/glyphs/ray":"models/glyphs/ray","../models/glyphs/rect":"models/glyphs/rect","../models/glyphs/segment":"models/glyphs/segment","../models/glyphs/text":"models/glyphs/text","../models/glyphs/wedge":"models/glyphs/wedge","../models/grids/grid":"models/grids/grid","../models/layouts/column":"models/layouts/column","../models/layouts/layout_dom":"models/layouts/layout_dom","../models/layouts/row":"models/layouts/row","../models/layouts/spacer":"models/layouts/spacer","../models/layouts/widget_box":"models/layouts/widget_box","../models/mappers/linear_color_mapper":"models/mappers/linear_color_mapper","../models/markers/index":"models/markers/index","../models/plots/gmap_plot":"models/plots/gmap_plot","../models/plots/plot":"models/plots/plot","../models/ranges/data_range":"models/ranges/data_range","../models/ranges/data_range1d":"models/ranges/data_range1d","../models/ranges/factor_range":"models/ranges/factor_range","../models/ranges/range":"models/ranges/range","../models/ranges/range1d":"models/ranges/range1d","../models/renderers/glyph_renderer":"models/renderers/glyph_renderer","../models/renderers/guide_renderer":"models/renderers/guide_renderer","../models/renderers/renderer":"models/renderers/renderer","../models/sources/ajax_data_source":"models/sources/ajax_data_source","../models/sources/column_data_source":"models/sources/column_data_source","../models/sources/data_source":"models/sources/data_source","../models/tickers/adaptive_ticker":"models/tickers/adaptive_ticker","../models/tickers/basic_ticker":"models/tickers/basic_ticker","../models/tickers/categorical_ticker":"models/tickers/categorical_ticker","../models/tickers/composite_ticker":"models/tickers/composite_ticker","../models/tickers/continuous_ticker":"models/tickers/continuous_ticker","../models/tickers/datetime_ticker":"models/tickers/datetime_ticker","../models/tickers/days_ticker":"models/tickers/days_ticker","../models/tickers/fixed_ticker":"models/tickers/fixed_ticker","../models/tickers/log_ticker":"models/tickers/log_ticker","../models/tickers/months_ticker":"models/tickers/months_ticker","../models/tickers/single_interval_ticker":"models/tickers/single_interval_ticker","../models/tickers/ticker":"models/tickers/ticker","../models/tickers/years_ticker":"models/tickers/years_ticker","../models/tiles/bbox_tile_source":"models/tiles/bbox_tile_source","../models/tiles/dynamic_image_renderer":"models/tiles/dynamic_image_renderer","../models/tiles/image_source":"models/tiles/image_source","../models/tiles/mercator_tile_source":"models/tiles/mercator_tile_source","../models/tiles/quadkey_tile_source":"models/tiles/quadkey_tile_source","../models/tiles/tile_renderer":"models/tiles/tile_renderer","../models/tiles/tile_source":"models/tiles/tile_source","../models/tiles/tms_tile_source":"models/tiles/tms_tile_source","../models/tiles/wmts_tile_source":"models/tiles/wmts_tile_source","../models/tools/actions/help_tool":"models/tools/actions/help_tool","../models/tools/actions/redo_tool":"models/tools/actions/redo_tool","../models/tools/actions/reset_tool":"models/tools/actions/reset_tool","../models/tools/actions/save_tool":"models/tools/actions/save_tool","../models/tools/actions/undo_tool":"models/tools/actions/undo_tool","../models/tools/gestures/box_select_tool":"models/tools/gestures/box_select_tool","../models/tools/gestures/box_zoom_tool":"models/tools/gestures/box_zoom_tool","../models/tools/gestures/lasso_select_tool":"models/tools/gestures/lasso_select_tool","../models/tools/gestures/pan_tool":"models/tools/gestures/pan_tool","../models/tools/gestures/poly_select_tool":"models/tools/gestures/poly_select_tool","../models/tools/gestures/resize_tool":"models/tools/gestures/resize_tool","../models/tools/gestures/tap_tool":"models/tools/gestures/tap_tool","../models/tools/gestures/wheel_zoom_tool":"models/tools/gestures/wheel_zoom_tool","../models/tools/inspectors/crosshair_tool":"models/tools/inspectors/crosshair_tool","../models/tools/inspectors/hover_tool":"models/tools/inspectors/hover_tool","../models/tools/tool":"models/tools/tool","../models/tools/toolbar":"models/tools/toolbar","../models/tools/toolbar_base":"models/tools/toolbar_base","../models/tools/toolbar_box":"models/tools/toolbar_box"}],"api/plotting":[function(require,module,exports){
var $, BOKEH_ROOT, Document, Figure, _, _default_tools, _default_tooltips, _known_tools, _with_default, color, embed, figure, gridplot, models, show, sprintf,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

_ = require("underscore");

$ = require("jquery");

sprintf = require("sprintf");

Document = require("../document").Document;

embed = require("../embed");

BOKEH_ROOT = require("../embed").BOKEH_ROOT;

models = require("./models");

_default_tooltips = [["index", "$index"], ["data (x, y)", "($x, $y)"], ["canvas (x, y)", "($sx, $sy)"]];

_default_tools = "pan,wheel_zoom,box_zoom,save,reset,help";

_known_tools = {
  pan: function(plot) {
    return new models.PanTool({
      plot: plot,
      dimensions: ["width", "height"]
    });
  },
  xpan: function(plot) {
    return new models.PanTool({
      plot: plot,
      dimensions: ["width"]
    });
  },
  ypan: function(plot) {
    return new models.PanTool({
      plot: plot,
      dimensions: ["height"]
    });
  },
  wheel_zoom: function(plot) {
    return new models.WheelZoomTool({
      plot: plot,
      dimensions: ["width", "height"]
    });
  },
  xwheel_zoom: function(plot) {
    return new models.WheelZoomTool({
      plot: plot,
      dimensions: ["width"]
    });
  },
  ywheel_zoom: function(plot) {
    return new models.WheelZoomTool({
      plot: plot,
      dimensions: ["height"]
    });
  },
  resize: function(plot) {
    return new models.ResizeTool({
      plot: plot
    });
  },
  click: function(plot) {
    return new models.TapTool({
      plot: plot,
      behavior: "inspect"
    });
  },
  tap: function(plot) {
    return new models.TapTool({
      plot: plot
    });
  },
  crosshair: function(plot) {
    return new models.CrosshairTool({
      plot: plot
    });
  },
  box_select: function(plot) {
    return new models.BoxSelectTool({
      plot: plot
    });
  },
  xbox_select: function(plot) {
    return new models.BoxSelectTool({
      plot: plot,
      dimensions: ['width']
    });
  },
  ybox_select: function(plot) {
    return new models.BoxSelectTool({
      plot: plot,
      dimensions: ['height']
    });
  },
  poly_select: function(plot) {
    return new models.PolySelectTool({
      plot: plot
    });
  },
  lasso_select: function(plot) {
    return new models.LassoSelectTool({
      plot: plot
    });
  },
  box_zoom: function(plot) {
    return new models.BoxZoomTool({
      plot: plot,
      dimensions: ['width', 'height']
    });
  },
  xbox_zoom: function(plot) {
    return new models.BoxZoomTool({
      plot: plot,
      dimensions: ['width']
    });
  },
  ybox_zoom: function(plot) {
    return new models.BoxZoomTool({
      plot: plot,
      dimensions: ['height']
    });
  },
  hover: function(plot) {
    return new models.HoverTool({
      plot: plot,
      tooltips: _default_tooltips
    });
  },
  save: function(plot) {
    return new models.SaveTool({
      plot: plot
    });
  },
  previewsave: function(plot) {
    return new models.SaveTool({
      plot: plot
    });
  },
  undo: function(plot) {
    return new models.UndoTool({
      plot: plot
    });
  },
  redo: function(plot) {
    return new models.RedoTool({
      plot: plot
    });
  },
  reset: function(plot) {
    return new models.ResetTool({
      plot: plot
    });
  },
  help: function(plot) {
    return new models.HelpTool({
      plot: plot
    });
  }
};

_with_default = function(value, default_value) {
  if (value === void 0) {
    return default_value;
  } else {
    return value;
  }
};

Figure = (function(superClass) {
  extend(Figure, superClass);

  function Figure(attributes, options) {
    var attrs, ref, ref1, ref2, ref3, ref4, ref5, tools, x_axis_label, x_axis_location, x_axis_type, x_minor_ticks, y_axis_label, y_axis_location, y_axis_type, y_minor_ticks;
    if (attributes == null) {
      attributes = {};
    }
    if (options == null) {
      options = {};
    }
    attrs = _.clone(attributes);
    tools = _with_default(attrs.tools, _default_tools);
    delete attrs.tools;
    attrs.x_range = this._get_range(attrs.x_range);
    attrs.y_range = this._get_range(attrs.y_range);
    x_axis_type = _.isUndefined(attrs.x_axis_type) ? "auto" : attrs.x_axis_type;
    y_axis_type = _.isUndefined(attrs.y_axis_type) ? "auto" : attrs.y_axis_type;
    delete attrs.x_axis_type;
    delete attrs.y_axis_type;
    x_minor_ticks = (ref = attrs.x_minor_ticks) != null ? ref : "auto";
    y_minor_ticks = (ref1 = attrs.y_minor_ticks) != null ? ref1 : "auto";
    delete attrs.x_minor_ticks;
    delete attrs.y_minor_ticks;
    x_axis_location = (ref2 = attrs.x_axis_location) != null ? ref2 : "below";
    y_axis_location = (ref3 = attrs.y_axis_location) != null ? ref3 : "left";
    delete attrs.x_axis_location;
    delete attrs.y_axis_location;
    x_axis_label = (ref4 = attrs.x_axis_label) != null ? ref4 : "";
    y_axis_label = (ref5 = attrs.y_axis_label) != null ? ref5 : "";
    delete attrs.x_axis_label;
    delete attrs.y_axis_label;
    if (!_.isUndefined(attrs.width)) {
      if (_.isUndefined(attrs.plot_width)) {
        attrs.plot_width = attrs.width;
      } else {
        throw new Error("both 'width' and 'plot_width' can't be given at the same time");
      }
      delete attrs.width;
    }
    if (!_.isUndefined(attrs.height)) {
      if (_.isUndefined(attrs.plot_height)) {
        attrs.plot_height = attrs.height;
      } else {
        throw new Error("both 'height' and 'plot_height' can't be given at the same time");
      }
      delete attrs.height;
    }
    Figure.__super__.constructor.call(this, attrs, options);
    this._process_guides(0, x_axis_type, x_axis_location, x_minor_ticks, x_axis_label);
    this._process_guides(1, y_axis_type, y_axis_location, y_minor_ticks, y_axis_label);
    this.add_tools.apply(this, this._process_tools(tools));
    this._legend = new models.Legend({
      plot: this
    });
    this.add_renderers(this._legend);
  }

  Object.defineProperty(Figure.prototype, "xgrid", {
    get: function() {
      return this.renderers.filter(function(r) {
        return r instanceof models.Grid && r.dimension === 0;
      })[0];
    }
  });

  Object.defineProperty(Figure.prototype, "ygrid", {
    get: function() {
      return this.renderers.filter(function(r) {
        return r instanceof models.Grid && r.dimension === 1;
      })[0];
    }
  });

  Object.defineProperty(Figure.prototype, "xaxis", {
    get: function() {
      return this.below.concat(this.above).filter(function(r) {
        return r instanceof models.Axis;
      })[0];
    }
  });

  Object.defineProperty(Figure.prototype, "yaxis", {
    get: function() {
      return this.left.concat(this.right).filter(function(r) {
        return r instanceof models.Axis;
      })[0];
    }
  });

  Figure.prototype.annular_wedge = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.AnnularWedge, "x,y,inner_radius,outer_radius,start_angle,end_angle", args);
  };

  Figure.prototype.annulus = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.Annulus, "x,y,inner_radius,outer_radius", args);
  };

  Figure.prototype.arc = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.Arc, "x,y,radius,start_angle,end_angle", args);
  };

  Figure.prototype.bezier = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.Bezier, "x0,y0,x1,y1,cx0,cy0,cx1,cy1", args);
  };

  Figure.prototype.ellipse = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.Ellipse, "x,y,width,height", args);
  };

  Figure.prototype.gear = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.Gear, "x,y,module,teeth", args);
  };

  Figure.prototype.image = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.Image, "color_mapper,image,rows,cols,x,y,dw,dh", args);
  };

  Figure.prototype.image_rgba = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.ImageRGBA, "image,rows,cols,x,y,dw,dh", args);
  };

  Figure.prototype.image_url = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.ImageURL, "url,x,y,w,h", args);
  };

  Figure.prototype.line = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.Line, "x,y", args);
  };

  Figure.prototype.multi_line = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.MultiLine, "xs,ys", args);
  };

  Figure.prototype.oval = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.Oval, "x,y,width,height", args);
  };

  Figure.prototype.patch = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.Patch, "x,y", args);
  };

  Figure.prototype.patches = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.Patches, "xs,ys", args);
  };

  Figure.prototype.quad = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.Quad, "left,right,bottom,top", args);
  };

  Figure.prototype.quadratic = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.Quadratic, "x0,y0,x1,y1,cx,cy", args);
  };

  Figure.prototype.ray = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.Ray, "x,y,length", args);
  };

  Figure.prototype.rect = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.Rect, "x,y,width,height", args);
  };

  Figure.prototype.segment = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.Segment, "x0,y0,x1,y1", args);
  };

  Figure.prototype.text = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.Text, "x,y,text", args);
  };

  Figure.prototype.wedge = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.Wedge, "x,y,radius,start_angle,end_angle", args);
  };

  Figure.prototype.asterisk = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._marker(models.Asterisk, args);
  };

  Figure.prototype.circle = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._marker(models.Circle, args);
  };

  Figure.prototype.circle_cross = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._marker(models.CircleCross, args);
  };

  Figure.prototype.circle_x = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._marker(models.CircleX, args);
  };

  Figure.prototype.cross = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._marker(models.Cross, args);
  };

  Figure.prototype.diamond = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._marker(models.Diamond, args);
  };

  Figure.prototype.diamond_cross = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._marker(models.DiamondCross, args);
  };

  Figure.prototype.inverted_triangle = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._marker(models.InvertedTriangle, args);
  };

  Figure.prototype.square = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._marker(models.Square, args);
  };

  Figure.prototype.square_cross = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._marker(models.SquareCross, args);
  };

  Figure.prototype.square_x = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._marker(models.SquareX, args);
  };

  Figure.prototype.triangle = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._marker(models.Triangle, args);
  };

  Figure.prototype.x = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._marker(models.X, args);
  };

  Figure.prototype._vectorable = ["fill_color", "fill_alpha", "line_color", "line_alpha", "line_width", "text_color", "text_alpha", "text_font_size"];

  Figure.prototype._default_color = "#1f77b4";

  Figure.prototype._default_alpha = 1.0;

  Figure.prototype._pop_colors_and_alpha = function(cls, attrs, prefix, default_color, default_alpha) {
    var _update_with, alpha, color, result;
    if (prefix == null) {
      prefix = "";
    }
    if (default_color == null) {
      default_color = this._default_color;
    }
    if (default_alpha == null) {
      default_alpha = this._default_alpha;
    }
    result = {};
    color = _with_default(attrs[prefix + "color"], default_color);
    alpha = _with_default(attrs[prefix + "alpha"], default_alpha);
    delete attrs[prefix + "color"];
    delete attrs[prefix + "alpha"];
    _update_with = function(name, default_value) {
      if (cls.prototype.props[name] != null) {
        result[name] = _with_default(attrs[prefix + name], default_value);
        return delete attrs[prefix + name];
      }
    };
    _update_with("fill_color", color);
    _update_with("line_color", color);
    _update_with("text_color", "black");
    _update_with("fill_alpha", alpha);
    _update_with("line_alpha", alpha);
    _update_with("text_alpha", alpha);
    return result;
  };

  Figure.prototype._find_uniq_name = function(data, name) {
    var i, new_name;
    i = 1;
    while (true) {
      new_name = name + "__" + i;
      if (data[new_name] != null) {
        i += 1;
      } else {
        return new_name;
      }
    }
  };

  Figure.prototype._fixup_values = function(cls, data, attrs) {
    var name, results, value;
    results = [];
    for (name in attrs) {
      value = attrs[name];
      results.push((function(_this) {
        return function(name, value) {
          var field, prop;
          prop = cls.prototype.props[name];
          if (prop != null) {
            if (prop.type.prototype.dataspec) {
              if (value != null) {
                if (_.isArray(value)) {
                  if (data[name] != null) {
                    if (data[name] !== value) {
                      field = _this._find_uniq_name(data, name);
                      data[field] = value;
                    } else {
                      field = name;
                    }
                  } else {
                    field = name;
                    data[field] = value;
                  }
                  return attrs[name] = {
                    field: field
                  };
                } else if (_.isNumber(value) || _.isString(value)) {
                  return attrs[name] = {
                    value: value
                  };
                }
              }
            }
          }
        };
      })(this)(name, value));
    }
    return results;
  };

  Figure.prototype._glyph = function(cls, params, args) {
    var _make_glyph, attrs, data, fn, glyph, glyph_ca, glyph_renderer, has_hglyph, has_sglyph, hglyph, hglyph_ca, i, j, k, legend, len, nsglyph, nsglyph_ca, opts, param, ref, ref1, sglyph, sglyph_ca, source;
    params = params.split(",");
    if (args.length === 1) {
      attrs = args[0];
      attrs = _.clone(attrs);
    } else {
      ref = args, args = 2 <= ref.length ? slice.call(ref, 0, j = ref.length - 1) : (j = 0, []), opts = ref[j++];
      attrs = _.clone(opts);
      fn = function(param, i) {
        return attrs[param] = args[i];
      };
      for (i = k = 0, len = params.length; k < len; i = ++k) {
        param = params[i];
        fn(param, i);
      }
    }
    legend = attrs.legend;
    delete attrs.legend;
    has_sglyph = _.any(_.keys(attrs), function(key) {
      return key.startsWith("selection_");
    });
    has_hglyph = _.any(_.keys(attrs), function(key) {
      return key.startsWith("hover_");
    });
    glyph_ca = this._pop_colors_and_alpha(cls, attrs);
    nsglyph_ca = this._pop_colors_and_alpha(cls, attrs, "nonselection_", void 0, 0.1);
    sglyph_ca = has_sglyph ? this._pop_colors_and_alpha(cls, attrs, "selection_") : {};
    hglyph_ca = has_hglyph ? this._pop_colors_and_alpha(cls, attrs, "hover_") : {};
    source = (ref1 = attrs.source) != null ? ref1 : new models.ColumnDataSource();
    data = _.clone(source.data);
    delete attrs.source;
    this._fixup_values(cls, data, glyph_ca);
    this._fixup_values(cls, data, nsglyph_ca);
    this._fixup_values(cls, data, sglyph_ca);
    this._fixup_values(cls, data, hglyph_ca);
    this._fixup_values(cls, data, attrs);
    source.data = data;
    _make_glyph = (function(_this) {
      return function(cls, attrs, extra_attrs) {
        return new cls(_.extend({}, attrs, extra_attrs));
      };
    })(this);
    glyph = _make_glyph(cls, attrs, glyph_ca);
    nsglyph = _make_glyph(cls, attrs, nsglyph_ca);
    sglyph = has_sglyph ? _make_glyph(cls, attrs, sglyph_ca) : null;
    hglyph = has_hglyph ? _make_glyph(cls, attrs, hglyph_ca) : null;
    glyph_renderer = new models.GlyphRenderer({
      data_source: source,
      glyph: glyph,
      nonselection_glyph: nsglyph,
      selection_glyph: sglyph,
      hover_glyph: hglyph
    });
    if (legend != null) {
      this._update_legend(legend, glyph_renderer);
    }
    this.add_renderers(glyph_renderer);
    return glyph_renderer;
  };

  Figure.prototype._marker = function(cls, args) {
    return this._glyph(cls, "x,y", args);
  };

  Figure.prototype._get_range = function(range) {
    if (range == null) {
      return new models.DataRange1d();
    }
    if (range instanceof models.Range) {
      return range;
    }
    if (_.isArray(range)) {
      if (_.all(function(x) {
        var j, len, results;
        results = [];
        for (j = 0, len = range.length; j < len; j++) {
          x = range[j];
          results.push(_.isString(x));
        }
        return results;
      })) {
        return new models.FactorRange({
          factors: range
        });
      }
      if (range.length === 2) {
        return new models.Range1d({
          start: range[0],
          end: range[1]
        });
      }
    }
  };

  Figure.prototype._process_guides = function(dim, axis_type, axis_location, minor_ticks, axis_label) {
    var axis, axiscls, grid, range;
    range = dim === 0 ? this.x_range : this.y_range;
    axiscls = this._get_axis_class(axis_type, range);
    if (axiscls != null) {
      if (axiscls === models.LogAxis) {
        if (dim === 0) {
          this.x_mapper_type = 'log';
        } else {
          this.y_mapper_type = 'log';
        }
      }
      axis = new axiscls();
      if (axis.ticker instanceof models.ContinuousTicker) {
        axis.ticker.num_minor_ticks = this._get_num_minor_ticks(axiscls, minor_ticks);
      }
      if (axis_label.length !== 0) {
        axis.axis_label = axis_label;
      }
      grid = new models.Grid({
        dimension: dim,
        ticker: axis.ticker
      });
      this.add_layout(axis, axis_location);
      return this.add_layout(grid);
    }
  };

  Figure.prototype._get_axis_class = function(axis_type, range) {
    if (axis_type == null) {
      return null;
    }
    if (axis_type === "linear") {
      return models.LinearAxis;
    }
    if (axis_type === "log") {
      return models.LogAxis;
    }
    if (axis_type === "datetime") {
      return models.DatetimeAxis;
    }
    if (axis_type === "auto") {
      if (range instanceof models.FactorRange) {
        return models.CategoricalAxis;
      } else {
        return models.LinearAxis;
      }
    }
  };

  Figure.prototype._get_num_minor_ticks = function(axis_class, num_minor_ticks) {
    if (_.isNumber(num_minor_ticks)) {
      if (num_minor_ticks <= 1) {
        throw new Error("num_minor_ticks must be > 1");
      }
      return num_minor_ticks;
    }
    if (num_minor_ticks == null) {
      return 0;
    }
    if (num_minor_ticks === 'auto') {
      if (axis_class === models.LogAxis) {
        return 10;
      }
      return 5;
    }
  };

  Figure.prototype._process_tools = function(tools) {
    var objs, tool;
    if (_.isString(tools)) {
      tools = tools.split(/\s*,\s*/);
    }
    objs = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = tools.length; j < len; j++) {
        tool = tools[j];
        if (_.isString(tool)) {
          results.push(_known_tools[tool](this));
        } else {
          results.push(tool);
        }
      }
      return results;
    }).call(this);
    return objs;
  };

  Figure.prototype._update_legend = function(legend_name, glyph_renderer) {
    var j, legends, len, name, ref, renderers;
    legends = _.clone(this._legend.legends);
    for (j = 0, len = legends.length; j < len; j++) {
      ref = legends[j], name = ref[0], renderers = ref[1];
      if (name === legend_name) {
        renderers.push(glyph_renderer);
        this._legend.legends = legends;
        return;
      }
    }
    legends.push([legend_name, [glyph_renderer]]);
    return this._legend.legends = legends;
  };

  return Figure;

})(models.Plot);

figure = function(attributes, options) {
  if (attributes == null) {
    attributes = {};
  }
  if (options == null) {
    options = {};
  }
  return new Figure(attributes, options);
};

show = function(obj, target) {
  var _obj, div, doc, j, len, multiple, views;
  multiple = _.isArray(obj);
  doc = new Document();
  if (!multiple) {
    doc.add_root(obj);
  } else {
    for (j = 0, len = obj.length; j < len; j++) {
      _obj = obj[j];
      doc.add_root(_obj);
    }
  }
  div = $("<div class=" + BOKEH_ROOT + ">");
  $(target != null ? target : "body").append(div);
  views = embed.add_document_standalone(doc, div);
  if (!multiple) {
    return views[obj.id];
  } else {
    return views;
  }
};

color = function(r, g, b) {
  return sprintf("#%02x%02x%02x", r, g, b);
};

gridplot = function(children, options) {
  var grid, item, j, k, l, layout, len, len1, len2, neighbor, row, row_children, row_tools, rows, sizing_mode, toolbar, toolbar_location, toolbar_sizing_mode, tools;
  if (options == null) {
    options = {};
  }
  toolbar_location = _.isUndefined(options.toolbar_location) ? 'above' : options.toolbar_location;
  sizing_mode = _.isUndefined(options.sizing_mode) ? 'fixed' : options.sizing_mode;
  toolbar_sizing_mode = options.sizing_mode === 'fixed' ? 'scale_width' : sizing_mode;
  tools = [];
  rows = [];
  for (j = 0, len = children.length; j < len; j++) {
    row = children[j];
    row_tools = [];
    row_children = [];
    for (k = 0, len1 = row.length; k < len1; k++) {
      item = row[k];
      if (item instanceof models.Plot) {
        row_tools = row_tools.concat(item.toolbar.tools);
        item.toolbar_location = null;
      }
      if (item === null) {
        for (l = 0, len2 = row.length; l < len2; l++) {
          neighbor = row[l];
          if (neighbor instanceof models.Plot) {
            break;
          }
        }
        item = new models.Spacer({
          width: neighbor.plot_width,
          height: neighbor.plot_height
        });
      }
      if (item instanceof models.LayoutDOM) {
        item.sizing_mode = sizing_mode;
        row_children.push(item);
      } else {
        throw new Error("only LayoutDOM items can be inserted into Grid");
      }
    }
    tools = tools.concat(row_tools);
    row = new models.Row({
      children: row_children,
      sizing_mode: sizing_mode
    });
    rows.push(row);
  }
  grid = new models.Column({
    children: rows,
    sizing_mode: sizing_mode
  });
  layout = (function() {
    if (toolbar_location) {
      toolbar = new models.ToolbarBox({
        tools: tools,
        sizing_mode: toolbar_sizing_mode,
        toolbar_location: toolbar_location
      });
      switch (toolbar_location) {
        case 'above':
          return new models.Column({
            children: [toolbar, grid],
            sizing_mode: sizing_mode
          });
        case 'below':
          return new models.Column({
            children: [grid, toolbar],
            sizing_mode: sizing_mode
          });
        case 'left':
          return new models.Row({
            children: [toolbar, grid],
            sizing_mode: sizing_mode
          });
        case 'right':
          return new models.Row({
            children: [grid, toolbar],
            sizing_mode: sizing_mode
          });
      }
    } else {
      return grid;
    }
  })();
  return layout;
};

module.exports = {
  Figure: Figure,
  figure: figure,
  show: show,
  color: color,
  gridplot: gridplot
};

},{"../document":"document","../embed":"embed","./models":"api/models","jquery":"jquery","sprintf":"sprintf","underscore":"underscore"}]},{},["api"])

 })()/*
Copyright (c) 2012, Continuum Analytics, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright notice,
this list of conditions and the following disclaimer in the documentation
and/or other materials provided with the distribution.

Neither the name of Continuum Analytics nor the names of any contributors
may be used to endorse or promote products derived from this software 
without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE 
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE 
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF 
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF 
THE POSSIBILITY OF SUCH DAMAGE.
*/

//# sourceMappingURL=bokeh-api.js.map
