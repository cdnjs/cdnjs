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

palettes = require("./palettes");

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

},{"../document":"document","../embed":"embed","./models":"api/models","./palettes":"api/palettes","jquery":"jquery","sprintf":"sprintf","underscore":"underscore"}],"api/linalg":[function(require,module,exports){
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
  LegendItem: require("../models/annotations/legend_item").Model,
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
  Grid: require("../models/grids/grid").Model,
  ImageSource: require("../models/tiles/image_source").Model,
  LayoutDOM: require("../models/layouts/layout_dom").Model,
  Row: require("../models/layouts/row").Model,
  Column: require("../models/layouts/column").Model,
  Spacer: require("../models/layouts/spacer").Model,
  WidgetBox: require("../models/layouts/widget_box").Model,
  GMapPlot: require("../models/plots/gmap_plot").Model,
  LinearColorMapper: require("../models/mappers/linear_color_mapper").Model,
  Asterisk: require('../models/markers/index').Asterisk.Model,
  CircleCross: require('../models/markers/index').CircleCross.Model,
  CircleX: require('../models/markers/index').CircleX.Model,
  Cross: require('../models/markers/index').Cross.Model,
  Diamond: require('../models/markers/index').Diamond.Model,
  DiamondCross: require('../models/markers/index').DiamondCross.Model,
  InvertedTriangle: require('../models/markers/index').InvertedTriangle.Model,
  Square: require('../models/markers/index').Square.Model,
  SquareCross: require('../models/markers/index').SquareCross.Model,
  SquareX: require('../models/markers/index').SquareX.Model,
  Triangle: require('../models/markers/index').Triangle.Model,
  X: require('../models/markers/index').X.Model,
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
  ToolEvents: require("../models/tools/tool_events").Model,
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

},{"../model":"model","../models/annotations/arrow":"models/annotations/arrow","../models/annotations/arrow_head":"models/annotations/arrow_head","../models/annotations/box_annotation":"models/annotations/box_annotation","../models/annotations/color_bar":"models/annotations/color_bar","../models/annotations/label":"models/annotations/label","../models/annotations/label_set":"models/annotations/label_set","../models/annotations/legend":"models/annotations/legend","../models/annotations/legend_item":"models/annotations/legend_item","../models/annotations/poly_annotation":"models/annotations/poly_annotation","../models/annotations/span":"models/annotations/span","../models/annotations/title":"models/annotations/title","../models/annotations/tooltip":"models/annotations/tooltip","../models/axes/axis":"models/axes/axis","../models/axes/categorical_axis":"models/axes/categorical_axis","../models/axes/continuous_axis":"models/axes/continuous_axis","../models/axes/datetime_axis":"models/axes/datetime_axis","../models/axes/linear_axis":"models/axes/linear_axis","../models/axes/log_axis":"models/axes/log_axis","../models/callbacks/customjs":"models/callbacks/customjs","../models/callbacks/open_url":"models/callbacks/open_url","../models/formatters/basic_tick_formatter":"models/formatters/basic_tick_formatter","../models/formatters/categorical_tick_formatter":"models/formatters/categorical_tick_formatter","../models/formatters/datetime_tick_formatter":"models/formatters/datetime_tick_formatter","../models/formatters/func_tick_formatter":"models/formatters/func_tick_formatter","../models/formatters/numeral_tick_formatter":"models/formatters/numeral_tick_formatter","../models/formatters/printf_tick_formatter":"models/formatters/printf_tick_formatter","../models/formatters/tick_formatter":"models/formatters/tick_formatter","../models/glyphs/annular_wedge":"models/glyphs/annular_wedge","../models/glyphs/annulus":"models/glyphs/annulus","../models/glyphs/arc":"models/glyphs/arc","../models/glyphs/bezier":"models/glyphs/bezier","../models/glyphs/circle":"models/glyphs/circle","../models/glyphs/ellipse":"models/glyphs/ellipse","../models/glyphs/glyph":"models/glyphs/glyph","../models/glyphs/image":"models/glyphs/image","../models/glyphs/image_rgba":"models/glyphs/image_rgba","../models/glyphs/image_url":"models/glyphs/image_url","../models/glyphs/line":"models/glyphs/line","../models/glyphs/multi_line":"models/glyphs/multi_line","../models/glyphs/oval":"models/glyphs/oval","../models/glyphs/patch":"models/glyphs/patch","../models/glyphs/patches":"models/glyphs/patches","../models/glyphs/quad":"models/glyphs/quad","../models/glyphs/quadratic":"models/glyphs/quadratic","../models/glyphs/ray":"models/glyphs/ray","../models/glyphs/rect":"models/glyphs/rect","../models/glyphs/segment":"models/glyphs/segment","../models/glyphs/text":"models/glyphs/text","../models/glyphs/wedge":"models/glyphs/wedge","../models/grids/grid":"models/grids/grid","../models/layouts/column":"models/layouts/column","../models/layouts/layout_dom":"models/layouts/layout_dom","../models/layouts/row":"models/layouts/row","../models/layouts/spacer":"models/layouts/spacer","../models/layouts/widget_box":"models/layouts/widget_box","../models/mappers/linear_color_mapper":"models/mappers/linear_color_mapper","../models/markers/index":"models/markers/index","../models/plots/gmap_plot":"models/plots/gmap_plot","../models/plots/plot":"models/plots/plot","../models/ranges/data_range":"models/ranges/data_range","../models/ranges/data_range1d":"models/ranges/data_range1d","../models/ranges/factor_range":"models/ranges/factor_range","../models/ranges/range":"models/ranges/range","../models/ranges/range1d":"models/ranges/range1d","../models/renderers/glyph_renderer":"models/renderers/glyph_renderer","../models/renderers/guide_renderer":"models/renderers/guide_renderer","../models/renderers/renderer":"models/renderers/renderer","../models/sources/ajax_data_source":"models/sources/ajax_data_source","../models/sources/column_data_source":"models/sources/column_data_source","../models/sources/data_source":"models/sources/data_source","../models/tickers/adaptive_ticker":"models/tickers/adaptive_ticker","../models/tickers/basic_ticker":"models/tickers/basic_ticker","../models/tickers/categorical_ticker":"models/tickers/categorical_ticker","../models/tickers/composite_ticker":"models/tickers/composite_ticker","../models/tickers/continuous_ticker":"models/tickers/continuous_ticker","../models/tickers/datetime_ticker":"models/tickers/datetime_ticker","../models/tickers/days_ticker":"models/tickers/days_ticker","../models/tickers/fixed_ticker":"models/tickers/fixed_ticker","../models/tickers/log_ticker":"models/tickers/log_ticker","../models/tickers/months_ticker":"models/tickers/months_ticker","../models/tickers/single_interval_ticker":"models/tickers/single_interval_ticker","../models/tickers/ticker":"models/tickers/ticker","../models/tickers/years_ticker":"models/tickers/years_ticker","../models/tiles/bbox_tile_source":"models/tiles/bbox_tile_source","../models/tiles/dynamic_image_renderer":"models/tiles/dynamic_image_renderer","../models/tiles/image_source":"models/tiles/image_source","../models/tiles/mercator_tile_source":"models/tiles/mercator_tile_source","../models/tiles/quadkey_tile_source":"models/tiles/quadkey_tile_source","../models/tiles/tile_renderer":"models/tiles/tile_renderer","../models/tiles/tile_source":"models/tiles/tile_source","../models/tiles/tms_tile_source":"models/tiles/tms_tile_source","../models/tiles/wmts_tile_source":"models/tiles/wmts_tile_source","../models/tools/actions/help_tool":"models/tools/actions/help_tool","../models/tools/actions/redo_tool":"models/tools/actions/redo_tool","../models/tools/actions/reset_tool":"models/tools/actions/reset_tool","../models/tools/actions/save_tool":"models/tools/actions/save_tool","../models/tools/actions/undo_tool":"models/tools/actions/undo_tool","../models/tools/gestures/box_select_tool":"models/tools/gestures/box_select_tool","../models/tools/gestures/box_zoom_tool":"models/tools/gestures/box_zoom_tool","../models/tools/gestures/lasso_select_tool":"models/tools/gestures/lasso_select_tool","../models/tools/gestures/pan_tool":"models/tools/gestures/pan_tool","../models/tools/gestures/poly_select_tool":"models/tools/gestures/poly_select_tool","../models/tools/gestures/resize_tool":"models/tools/gestures/resize_tool","../models/tools/gestures/tap_tool":"models/tools/gestures/tap_tool","../models/tools/gestures/wheel_zoom_tool":"models/tools/gestures/wheel_zoom_tool","../models/tools/inspectors/crosshair_tool":"models/tools/inspectors/crosshair_tool","../models/tools/inspectors/hover_tool":"models/tools/inspectors/hover_tool","../models/tools/tool":"models/tools/tool","../models/tools/tool_events":"models/tools/tool_events","../models/tools/toolbar":"models/tools/toolbar","../models/tools/toolbar_base":"models/tools/toolbar_base","../models/tools/toolbar_box":"models/tools/toolbar_box"}],"api/palettes":[function(require,module,exports){
var _, palettes;

_ = require("underscore");

palettes = {
  YlGn: {
    YlGn3: [0x31a354, 0xaddd8e, 0xf7fcb9],
    YlGn4: [0x238443, 0x78c679, 0xc2e699, 0xffffcc],
    YlGn5: [0x006837, 0x31a354, 0x78c679, 0xc2e699, 0xffffcc],
    YlGn6: [0x006837, 0x31a354, 0x78c679, 0xaddd8e, 0xd9f0a3, 0xffffcc],
    YlGn7: [0x005a32, 0x238443, 0x41ab5d, 0x78c679, 0xaddd8e, 0xd9f0a3, 0xffffcc],
    YlGn8: [0x005a32, 0x238443, 0x41ab5d, 0x78c679, 0xaddd8e, 0xd9f0a3, 0xf7fcb9, 0xffffe5],
    YlGn9: [0x004529, 0x006837, 0x238443, 0x41ab5d, 0x78c679, 0xaddd8e, 0xd9f0a3, 0xf7fcb9, 0xffffe5]
  },
  YlGnBu: {
    YlGnBu3: [0x2c7fb8, 0x7fcdbb, 0xedf8b1],
    YlGnBu4: [0x225ea8, 0x41b6c4, 0xa1dab4, 0xffffcc],
    YlGnBu5: [0x253494, 0x2c7fb8, 0x41b6c4, 0xa1dab4, 0xffffcc],
    YlGnBu6: [0x253494, 0x2c7fb8, 0x41b6c4, 0x7fcdbb, 0xc7e9b4, 0xffffcc],
    YlGnBu7: [0x0c2c84, 0x225ea8, 0x1d91c0, 0x41b6c4, 0x7fcdbb, 0xc7e9b4, 0xffffcc],
    YlGnBu8: [0x0c2c84, 0x225ea8, 0x1d91c0, 0x41b6c4, 0x7fcdbb, 0xc7e9b4, 0xedf8b1, 0xffffd9],
    YlGnBu9: [0x081d58, 0x253494, 0x225ea8, 0x1d91c0, 0x41b6c4, 0x7fcdbb, 0xc7e9b4, 0xedf8b1, 0xffffd9]
  },
  GnBu: {
    GnBu3: [0x43a2ca, 0xa8ddb5, 0xe0f3db],
    GnBu4: [0x2b8cbe, 0x7bccc4, 0xbae4bc, 0xf0f9e8],
    GnBu5: [0x0868ac, 0x43a2ca, 0x7bccc4, 0xbae4bc, 0xf0f9e8],
    GnBu6: [0x0868ac, 0x43a2ca, 0x7bccc4, 0xa8ddb5, 0xccebc5, 0xf0f9e8],
    GnBu7: [0x08589e, 0x2b8cbe, 0x4eb3d3, 0x7bccc4, 0xa8ddb5, 0xccebc5, 0xf0f9e8],
    GnBu8: [0x08589e, 0x2b8cbe, 0x4eb3d3, 0x7bccc4, 0xa8ddb5, 0xccebc5, 0xe0f3db, 0xf7fcf0],
    GnBu9: [0x084081, 0x0868ac, 0x2b8cbe, 0x4eb3d3, 0x7bccc4, 0xa8ddb5, 0xccebc5, 0xe0f3db, 0xf7fcf0]
  },
  BuGn: {
    BuGn3: [0x2ca25f, 0x99d8c9, 0xe5f5f9],
    BuGn4: [0x238b45, 0x66c2a4, 0xb2e2e2, 0xedf8fb],
    BuGn5: [0x006d2c, 0x2ca25f, 0x66c2a4, 0xb2e2e2, 0xedf8fb],
    BuGn6: [0x006d2c, 0x2ca25f, 0x66c2a4, 0x99d8c9, 0xccece6, 0xedf8fb],
    BuGn7: [0x005824, 0x238b45, 0x41ae76, 0x66c2a4, 0x99d8c9, 0xccece6, 0xedf8fb],
    BuGn8: [0x005824, 0x238b45, 0x41ae76, 0x66c2a4, 0x99d8c9, 0xccece6, 0xe5f5f9, 0xf7fcfd],
    BuGn9: [0x00441b, 0x006d2c, 0x238b45, 0x41ae76, 0x66c2a4, 0x99d8c9, 0xccece6, 0xe5f5f9, 0xf7fcfd]
  },
  PuBuGn: {
    PuBuGn3: [0x1c9099, 0xa6bddb, 0xece2f0],
    PuBuGn4: [0x02818a, 0x67a9cf, 0xbdc9e1, 0xf6eff7],
    PuBuGn5: [0x016c59, 0x1c9099, 0x67a9cf, 0xbdc9e1, 0xf6eff7],
    PuBuGn6: [0x016c59, 0x1c9099, 0x67a9cf, 0xa6bddb, 0xd0d1e6, 0xf6eff7],
    PuBuGn7: [0x016450, 0x02818a, 0x3690c0, 0x67a9cf, 0xa6bddb, 0xd0d1e6, 0xf6eff7],
    PuBuGn8: [0x016450, 0x02818a, 0x3690c0, 0x67a9cf, 0xa6bddb, 0xd0d1e6, 0xece2f0, 0xfff7fb],
    PuBuGn9: [0x014636, 0x016c59, 0x02818a, 0x3690c0, 0x67a9cf, 0xa6bddb, 0xd0d1e6, 0xece2f0, 0xfff7fb]
  },
  PuBu: {
    PuBu3: [0x2b8cbe, 0xa6bddb, 0xece7f2],
    PuBu4: [0x0570b0, 0x74a9cf, 0xbdc9e1, 0xf1eef6],
    PuBu5: [0x045a8d, 0x2b8cbe, 0x74a9cf, 0xbdc9e1, 0xf1eef6],
    PuBu6: [0x045a8d, 0x2b8cbe, 0x74a9cf, 0xa6bddb, 0xd0d1e6, 0xf1eef6],
    PuBu7: [0x034e7b, 0x0570b0, 0x3690c0, 0x74a9cf, 0xa6bddb, 0xd0d1e6, 0xf1eef6],
    PuBu8: [0x034e7b, 0x0570b0, 0x3690c0, 0x74a9cf, 0xa6bddb, 0xd0d1e6, 0xece7f2, 0xfff7fb],
    PuBu9: [0x023858, 0x045a8d, 0x0570b0, 0x3690c0, 0x74a9cf, 0xa6bddb, 0xd0d1e6, 0xece7f2, 0xfff7fb]
  },
  BuPu: {
    BuPu3: [0x8856a7, 0x9ebcda, 0xe0ecf4],
    BuPu4: [0x88419d, 0x8c96c6, 0xb3cde3, 0xedf8fb],
    BuPu5: [0x810f7c, 0x8856a7, 0x8c96c6, 0xb3cde3, 0xedf8fb],
    BuPu6: [0x810f7c, 0x8856a7, 0x8c96c6, 0x9ebcda, 0xbfd3e6, 0xedf8fb],
    BuPu7: [0x6e016b, 0x88419d, 0x8c6bb1, 0x8c96c6, 0x9ebcda, 0xbfd3e6, 0xedf8fb],
    BuPu8: [0x6e016b, 0x88419d, 0x8c6bb1, 0x8c96c6, 0x9ebcda, 0xbfd3e6, 0xe0ecf4, 0xf7fcfd],
    BuPu9: [0x4d004b, 0x810f7c, 0x88419d, 0x8c6bb1, 0x8c96c6, 0x9ebcda, 0xbfd3e6, 0xe0ecf4, 0xf7fcfd]
  },
  RdPu: {
    RdPu3: [0xc51b8a, 0xfa9fb5, 0xfde0dd],
    RdPu4: [0xae017e, 0xf768a1, 0xfbb4b9, 0xfeebe2],
    RdPu5: [0x7a0177, 0xc51b8a, 0xf768a1, 0xfbb4b9, 0xfeebe2],
    RdPu6: [0x7a0177, 0xc51b8a, 0xf768a1, 0xfa9fb5, 0xfcc5c0, 0xfeebe2],
    RdPu7: [0x7a0177, 0xae017e, 0xdd3497, 0xf768a1, 0xfa9fb5, 0xfcc5c0, 0xfeebe2],
    RdPu8: [0x7a0177, 0xae017e, 0xdd3497, 0xf768a1, 0xfa9fb5, 0xfcc5c0, 0xfde0dd, 0xfff7f3],
    RdPu9: [0x49006a, 0x7a0177, 0xae017e, 0xdd3497, 0xf768a1, 0xfa9fb5, 0xfcc5c0, 0xfde0dd, 0xfff7f3]
  },
  PuRd: {
    PuRd3: [0xdd1c77, 0xc994c7, 0xe7e1ef],
    PuRd4: [0xce1256, 0xdf65b0, 0xd7b5d8, 0xf1eef6],
    PuRd5: [0x980043, 0xdd1c77, 0xdf65b0, 0xd7b5d8, 0xf1eef6],
    PuRd6: [0x980043, 0xdd1c77, 0xdf65b0, 0xc994c7, 0xd4b9da, 0xf1eef6],
    PuRd7: [0x91003f, 0xce1256, 0xe7298a, 0xdf65b0, 0xc994c7, 0xd4b9da, 0xf1eef6],
    PuRd8: [0x91003f, 0xce1256, 0xe7298a, 0xdf65b0, 0xc994c7, 0xd4b9da, 0xe7e1ef, 0xf7f4f9],
    PuRd9: [0x67001f, 0x980043, 0xce1256, 0xe7298a, 0xdf65b0, 0xc994c7, 0xd4b9da, 0xe7e1ef, 0xf7f4f9]
  },
  OrRd: {
    OrRd3: [0xe34a33, 0xfdbb84, 0xfee8c8],
    OrRd4: [0xd7301f, 0xfc8d59, 0xfdcc8a, 0xfef0d9],
    OrRd5: [0xb30000, 0xe34a33, 0xfc8d59, 0xfdcc8a, 0xfef0d9],
    OrRd6: [0xb30000, 0xe34a33, 0xfc8d59, 0xfdbb84, 0xfdd49e, 0xfef0d9],
    OrRd7: [0x990000, 0xd7301f, 0xef6548, 0xfc8d59, 0xfdbb84, 0xfdd49e, 0xfef0d9],
    OrRd8: [0x990000, 0xd7301f, 0xef6548, 0xfc8d59, 0xfdbb84, 0xfdd49e, 0xfee8c8, 0xfff7ec],
    OrRd9: [0x7f0000, 0xb30000, 0xd7301f, 0xef6548, 0xfc8d59, 0xfdbb84, 0xfdd49e, 0xfee8c8, 0xfff7ec]
  },
  YlOrRd: {
    YlOrRd3: [0xf03b20, 0xfeb24c, 0xffeda0],
    YlOrRd4: [0xe31a1c, 0xfd8d3c, 0xfecc5c, 0xffffb2],
    YlOrRd5: [0xbd0026, 0xf03b20, 0xfd8d3c, 0xfecc5c, 0xffffb2],
    YlOrRd6: [0xbd0026, 0xf03b20, 0xfd8d3c, 0xfeb24c, 0xfed976, 0xffffb2],
    YlOrRd7: [0xb10026, 0xe31a1c, 0xfc4e2a, 0xfd8d3c, 0xfeb24c, 0xfed976, 0xffffb2],
    YlOrRd8: [0xb10026, 0xe31a1c, 0xfc4e2a, 0xfd8d3c, 0xfeb24c, 0xfed976, 0xffeda0, 0xffffcc],
    YlOrRd9: [0x800026, 0xbd0026, 0xe31a1c, 0xfc4e2a, 0xfd8d3c, 0xfeb24c, 0xfed976, 0xffeda0, 0xffffcc]
  },
  YlOrBr: {
    YlOrBr3: [0xd95f0e, 0xfec44f, 0xfff7bc],
    YlOrBr4: [0xcc4c02, 0xfe9929, 0xfed98e, 0xffffd4],
    YlOrBr5: [0x993404, 0xd95f0e, 0xfe9929, 0xfed98e, 0xffffd4],
    YlOrBr6: [0x993404, 0xd95f0e, 0xfe9929, 0xfec44f, 0xfee391, 0xffffd4],
    YlOrBr7: [0x8c2d04, 0xcc4c02, 0xec7014, 0xfe9929, 0xfec44f, 0xfee391, 0xffffd4],
    YlOrBr8: [0x8c2d04, 0xcc4c02, 0xec7014, 0xfe9929, 0xfec44f, 0xfee391, 0xfff7bc, 0xffffe5],
    YlOrBr9: [0x662506, 0x993404, 0xcc4c02, 0xec7014, 0xfe9929, 0xfec44f, 0xfee391, 0xfff7bc, 0xffffe5]
  },
  Purples: {
    Purples3: [0x756bb1, 0xbcbddc, 0xefedf5],
    Purples4: [0x6a51a3, 0x9e9ac8, 0xcbc9e2, 0xf2f0f7],
    Purples5: [0x54278f, 0x756bb1, 0x9e9ac8, 0xcbc9e2, 0xf2f0f7],
    Purples6: [0x54278f, 0x756bb1, 0x9e9ac8, 0xbcbddc, 0xdadaeb, 0xf2f0f7],
    Purples7: [0x4a1486, 0x6a51a3, 0x807dba, 0x9e9ac8, 0xbcbddc, 0xdadaeb, 0xf2f0f7],
    Purples8: [0x4a1486, 0x6a51a3, 0x807dba, 0x9e9ac8, 0xbcbddc, 0xdadaeb, 0xefedf5, 0xfcfbfd],
    Purples9: [0x3f007d, 0x54278f, 0x6a51a3, 0x807dba, 0x9e9ac8, 0xbcbddc, 0xdadaeb, 0xefedf5, 0xfcfbfd]
  },
  Blues: {
    Blues3: [0x3182bd, 0x9ecae1, 0xdeebf7],
    Blues4: [0x2171b5, 0x6baed6, 0xbdd7e7, 0xeff3ff],
    Blues5: [0x08519c, 0x3182bd, 0x6baed6, 0xbdd7e7, 0xeff3ff],
    Blues6: [0x08519c, 0x3182bd, 0x6baed6, 0x9ecae1, 0xc6dbef, 0xeff3ff],
    Blues7: [0x084594, 0x2171b5, 0x4292c6, 0x6baed6, 0x9ecae1, 0xc6dbef, 0xeff3ff],
    Blues8: [0x084594, 0x2171b5, 0x4292c6, 0x6baed6, 0x9ecae1, 0xc6dbef, 0xdeebf7, 0xf7fbff],
    Blues9: [0x08306b, 0x08519c, 0x2171b5, 0x4292c6, 0x6baed6, 0x9ecae1, 0xc6dbef, 0xdeebf7, 0xf7fbff]
  },
  Greens: {
    Greens3: [0x31a354, 0xa1d99b, 0xe5f5e0],
    Greens4: [0x238b45, 0x74c476, 0xbae4b3, 0xedf8e9],
    Greens5: [0x006d2c, 0x31a354, 0x74c476, 0xbae4b3, 0xedf8e9],
    Greens6: [0x006d2c, 0x31a354, 0x74c476, 0xa1d99b, 0xc7e9c0, 0xedf8e9],
    Greens7: [0x005a32, 0x238b45, 0x41ab5d, 0x74c476, 0xa1d99b, 0xc7e9c0, 0xedf8e9],
    Greens8: [0x005a32, 0x238b45, 0x41ab5d, 0x74c476, 0xa1d99b, 0xc7e9c0, 0xe5f5e0, 0xf7fcf5],
    Greens9: [0x00441b, 0x006d2c, 0x238b45, 0x41ab5d, 0x74c476, 0xa1d99b, 0xc7e9c0, 0xe5f5e0, 0xf7fcf5]
  },
  Oranges: {
    Oranges3: [0xe6550d, 0xfdae6b, 0xfee6ce],
    Oranges4: [0xd94701, 0xfd8d3c, 0xfdbe85, 0xfeedde],
    Oranges5: [0xa63603, 0xe6550d, 0xfd8d3c, 0xfdbe85, 0xfeedde],
    Oranges6: [0xa63603, 0xe6550d, 0xfd8d3c, 0xfdae6b, 0xfdd0a2, 0xfeedde],
    Oranges7: [0x8c2d04, 0xd94801, 0xf16913, 0xfd8d3c, 0xfdae6b, 0xfdd0a2, 0xfeedde],
    Oranges8: [0x8c2d04, 0xd94801, 0xf16913, 0xfd8d3c, 0xfdae6b, 0xfdd0a2, 0xfee6ce, 0xfff5eb],
    Oranges9: [0x7f2704, 0xa63603, 0xd94801, 0xf16913, 0xfd8d3c, 0xfdae6b, 0xfdd0a2, 0xfee6ce, 0xfff5eb]
  },
  Reds: {
    Reds3: [0xde2d26, 0xfc9272, 0xfee0d2],
    Reds4: [0xcb181d, 0xfb6a4a, 0xfcae91, 0xfee5d9],
    Reds5: [0xa50f15, 0xde2d26, 0xfb6a4a, 0xfcae91, 0xfee5d9],
    Reds6: [0xa50f15, 0xde2d26, 0xfb6a4a, 0xfc9272, 0xfcbba1, 0xfee5d9],
    Reds7: [0x99000d, 0xcb181d, 0xef3b2c, 0xfb6a4a, 0xfc9272, 0xfcbba1, 0xfee5d9],
    Reds8: [0x99000d, 0xcb181d, 0xef3b2c, 0xfb6a4a, 0xfc9272, 0xfcbba1, 0xfee0d2, 0xfff5f0],
    Reds9: [0x67000d, 0xa50f15, 0xcb181d, 0xef3b2c, 0xfb6a4a, 0xfc9272, 0xfcbba1, 0xfee0d2, 0xfff5f0]
  },
  Greys: {
    Greys3: [0x636363, 0xbdbdbd, 0xf0f0f0],
    Greys4: [0x525252, 0x969696, 0xcccccc, 0xf7f7f7],
    Greys5: [0x252525, 0x636363, 0x969696, 0xcccccc, 0xf7f7f7],
    Greys6: [0x252525, 0x636363, 0x969696, 0xbdbdbd, 0xd9d9d9, 0xf7f7f7],
    Greys7: [0x252525, 0x525252, 0x737373, 0x969696, 0xbdbdbd, 0xd9d9d9, 0xf7f7f7],
    Greys8: [0x252525, 0x525252, 0x737373, 0x969696, 0xbdbdbd, 0xd9d9d9, 0xf0f0f0, 0xffffff],
    Greys9: [0x000000, 0x252525, 0x525252, 0x737373, 0x969696, 0xbdbdbd, 0xd9d9d9, 0xf0f0f0, 0xffffff],
    Greys10: [0x000000, 0x1c1c1c, 0x383838, 0x555555, 0x717171, 0x8d8d8d, 0xaaaaaa, 0xc6c6c6, 0xe2e2e2, 0xffffff],
    Greys11: [0x000000, 0x191919, 0x333333, 0x4c4c4c, 0x666666, 0x7f7f7f, 0x999999, 0xb2b2b2, 0xcccccc, 0xe5e5e5, 0xffffff],
    Greys256: [0x000000, 0x010101, 0x020202, 0x030303, 0x040404, 0x050505, 0x060606, 0x070707, 0x080808, 0x090909, 0x0a0a0a, 0x0b0b0b, 0x0c0c0c, 0x0d0d0d, 0x0e0e0e, 0x0f0f0f, 0x101010, 0x111111, 0x121212, 0x131313, 0x141414, 0x151515, 0x161616, 0x171717, 0x181818, 0x191919, 0x1a1a1a, 0x1b1b1b, 0x1c1c1c, 0x1d1d1d, 0x1e1e1e, 0x1f1f1f, 0x202020, 0x212121, 0x222222, 0x232323, 0x242424, 0x252525, 0x262626, 0x272727, 0x282828, 0x292929, 0x2a2a2a, 0x2b2b2b, 0x2c2c2c, 0x2d2d2d, 0x2e2e2e, 0x2f2f2f, 0x303030, 0x313131, 0x323232, 0x333333, 0x343434, 0x353535, 0x363636, 0x373737, 0x383838, 0x393939, 0x3a3a3a, 0x3b3b3b, 0x3c3c3c, 0x3d3d3d, 0x3e3e3e, 0x3f3f3f, 0x404040, 0x414141, 0x424242, 0x434343, 0x444444, 0x454545, 0x464646, 0x474747, 0x484848, 0x494949, 0x4a4a4a, 0x4b4b4b, 0x4c4c4c, 0x4d4d4d, 0x4e4e4e, 0x4f4f4f, 0x505050, 0x515151, 0x525252, 0x535353, 0x545454, 0x555555, 0x565656, 0x575757, 0x585858, 0x595959, 0x5a5a5a, 0x5b5b5b, 0x5c5c5c, 0x5d5d5d, 0x5e5e5e, 0x5f5f5f, 0x606060, 0x616161, 0x626262, 0x636363, 0x646464, 0x656565, 0x666666, 0x676767, 0x686868, 0x696969, 0x6a6a6a, 0x6b6b6b, 0x6c6c6c, 0x6d6d6d, 0x6e6e6e, 0x6f6f6f, 0x707070, 0x717171, 0x727272, 0x737373, 0x747474, 0x757575, 0x767676, 0x777777, 0x787878, 0x797979, 0x7a7a7a, 0x7b7b7b, 0x7c7c7c, 0x7d7d7d, 0x7e7e7e, 0x7f7f7f, 0x808080, 0x818181, 0x828282, 0x838383, 0x848484, 0x858585, 0x868686, 0x878787, 0x888888, 0x898989, 0x8a8a8a, 0x8b8b8b, 0x8c8c8c, 0x8d8d8d, 0x8e8e8e, 0x8f8f8f, 0x909090, 0x919191, 0x929292, 0x939393, 0x949494, 0x959595, 0x969696, 0x979797, 0x989898, 0x999999, 0x9a9a9a, 0x9b9b9b, 0x9c9c9c, 0x9d9d9d, 0x9e9e9e, 0x9f9f9f, 0xa0a0a0, 0xa1a1a1, 0xa2a2a2, 0xa3a3a3, 0xa4a4a4, 0xa5a5a5, 0xa6a6a6, 0xa7a7a7, 0xa8a8a8, 0xa9a9a9, 0xaaaaaa, 0xababab, 0xacacac, 0xadadad, 0xaeaeae, 0xafafaf, 0xb0b0b0, 0xb1b1b1, 0xb2b2b2, 0xb3b3b3, 0xb4b4b4, 0xb5b5b5, 0xb6b6b6, 0xb7b7b7, 0xb8b8b8, 0xb9b9b9, 0xbababa, 0xbbbbbb, 0xbcbcbc, 0xbdbdbd, 0xbebebe, 0xbfbfbf, 0xc0c0c0, 0xc1c1c1, 0xc2c2c2, 0xc3c3c3, 0xc4c4c4, 0xc5c5c5, 0xc6c6c6, 0xc7c7c7, 0xc8c8c8, 0xc9c9c9, 0xcacaca, 0xcbcbcb, 0xcccccc, 0xcdcdcd, 0xcecece, 0xcfcfcf, 0xd0d0d0, 0xd1d1d1, 0xd2d2d2, 0xd3d3d3, 0xd4d4d4, 0xd5d5d5, 0xd6d6d6, 0xd7d7d7, 0xd8d8d8, 0xd9d9d9, 0xdadada, 0xdbdbdb, 0xdcdcdc, 0xdddddd, 0xdedede, 0xdfdfdf, 0xe0e0e0, 0xe1e1e1, 0xe2e2e2, 0xe3e3e3, 0xe4e4e4, 0xe5e5e5, 0xe6e6e6, 0xe7e7e7, 0xe8e8e8, 0xe9e9e9, 0xeaeaea, 0xebebeb, 0xececec, 0xededed, 0xeeeeee, 0xefefef, 0xf0f0f0, 0xf1f1f1, 0xf2f2f2, 0xf3f3f3, 0xf4f4f4, 0xf5f5f5, 0xf6f6f6, 0xf7f7f7, 0xf8f8f8, 0xf9f9f9, 0xfafafa, 0xfbfbfb, 0xfcfcfc, 0xfdfdfd, 0xfefefe, 0xffffff]
  },
  PuOr: {
    PuOr3: [0x998ec3, 0xf7f7f7, 0xf1a340],
    PuOr4: [0x5e3c99, 0xb2abd2, 0xfdb863, 0xe66101],
    PuOr5: [0x5e3c99, 0xb2abd2, 0xf7f7f7, 0xfdb863, 0xe66101],
    PuOr6: [0x542788, 0x998ec3, 0xd8daeb, 0xfee0b6, 0xf1a340, 0xb35806],
    PuOr7: [0x542788, 0x998ec3, 0xd8daeb, 0xf7f7f7, 0xfee0b6, 0xf1a340, 0xb35806],
    PuOr8: [0x542788, 0x8073ac, 0xb2abd2, 0xd8daeb, 0xfee0b6, 0xfdb863, 0xe08214, 0xb35806],
    PuOr9: [0x542788, 0x8073ac, 0xb2abd2, 0xd8daeb, 0xf7f7f7, 0xfee0b6, 0xfdb863, 0xe08214, 0xb35806],
    PuOr10: [0x2d004b, 0x542788, 0x8073ac, 0xb2abd2, 0xd8daeb, 0xfee0b6, 0xfdb863, 0xe08214, 0xb35806, 0x7f3b08],
    PuOr11: [0x2d004b, 0x542788, 0x8073ac, 0xb2abd2, 0xd8daeb, 0xf7f7f7, 0xfee0b6, 0xfdb863, 0xe08214, 0xb35806, 0x7f3b08]
  },
  BrBG: {
    BrBG3: [0x5ab4ac, 0xf5f5f5, 0xd8b365],
    BrBG4: [0x018571, 0x80cdc1, 0xdfc27d, 0xa6611a],
    BrBG5: [0x018571, 0x80cdc1, 0xf5f5f5, 0xdfc27d, 0xa6611a],
    BrBG6: [0x01665e, 0x5ab4ac, 0xc7eae5, 0xf6e8c3, 0xd8b365, 0x8c510a],
    BrBG7: [0x01665e, 0x5ab4ac, 0xc7eae5, 0xf5f5f5, 0xf6e8c3, 0xd8b365, 0x8c510a],
    BrBG8: [0x01665e, 0x35978f, 0x80cdc1, 0xc7eae5, 0xf6e8c3, 0xdfc27d, 0xbf812d, 0x8c510a],
    BrBG9: [0x01665e, 0x35978f, 0x80cdc1, 0xc7eae5, 0xf5f5f5, 0xf6e8c3, 0xdfc27d, 0xbf812d, 0x8c510a],
    BrBG10: [0x003c30, 0x01665e, 0x35978f, 0x80cdc1, 0xc7eae5, 0xf6e8c3, 0xdfc27d, 0xbf812d, 0x8c510a, 0x543005],
    BrBG11: [0x003c30, 0x01665e, 0x35978f, 0x80cdc1, 0xc7eae5, 0xf5f5f5, 0xf6e8c3, 0xdfc27d, 0xbf812d, 0x8c510a, 0x543005]
  },
  PRGn: {
    PRGn3: [0x7fbf7b, 0xf7f7f7, 0xaf8dc3],
    PRGn4: [0x008837, 0xa6dba0, 0xc2a5cf, 0x7b3294],
    PRGn5: [0x008837, 0xa6dba0, 0xf7f7f7, 0xc2a5cf, 0x7b3294],
    PRGn6: [0x1b7837, 0x7fbf7b, 0xd9f0d3, 0xe7d4e8, 0xaf8dc3, 0x762a83],
    PRGn7: [0x1b7837, 0x7fbf7b, 0xd9f0d3, 0xf7f7f7, 0xe7d4e8, 0xaf8dc3, 0x762a83],
    PRGn8: [0x1b7837, 0x5aae61, 0xa6dba0, 0xd9f0d3, 0xe7d4e8, 0xc2a5cf, 0x9970ab, 0x762a83],
    PRGn9: [0x1b7837, 0x5aae61, 0xa6dba0, 0xd9f0d3, 0xf7f7f7, 0xe7d4e8, 0xc2a5cf, 0x9970ab, 0x762a83],
    PRGn10: [0x00441b, 0x1b7837, 0x5aae61, 0xa6dba0, 0xd9f0d3, 0xe7d4e8, 0xc2a5cf, 0x9970ab, 0x762a83, 0x40004b],
    PRGn11: [0x00441b, 0x1b7837, 0x5aae61, 0xa6dba0, 0xd9f0d3, 0xf7f7f7, 0xe7d4e8, 0xc2a5cf, 0x9970ab, 0x762a83, 0x40004b]
  },
  PiYG: {
    PiYG3: [0xa1d76a, 0xf7f7f7, 0xe9a3c9],
    PiYG4: [0x4dac26, 0xb8e186, 0xf1b6da, 0xd01c8b],
    PiYG5: [0x4dac26, 0xb8e186, 0xf7f7f7, 0xf1b6da, 0xd01c8b],
    PiYG6: [0x4d9221, 0xa1d76a, 0xe6f5d0, 0xfde0ef, 0xe9a3c9, 0xc51b7d],
    PiYG7: [0x4d9221, 0xa1d76a, 0xe6f5d0, 0xf7f7f7, 0xfde0ef, 0xe9a3c9, 0xc51b7d],
    PiYG8: [0x4d9221, 0x7fbc41, 0xb8e186, 0xe6f5d0, 0xfde0ef, 0xf1b6da, 0xde77ae, 0xc51b7d],
    PiYG9: [0x4d9221, 0x7fbc41, 0xb8e186, 0xe6f5d0, 0xf7f7f7, 0xfde0ef, 0xf1b6da, 0xde77ae, 0xc51b7d],
    PiYG10: [0x276419, 0x4d9221, 0x7fbc41, 0xb8e186, 0xe6f5d0, 0xfde0ef, 0xf1b6da, 0xde77ae, 0xc51b7d, 0x8e0152],
    PiYG11: [0x276419, 0x4d9221, 0x7fbc41, 0xb8e186, 0xe6f5d0, 0xf7f7f7, 0xfde0ef, 0xf1b6da, 0xde77ae, 0xc51b7d, 0x8e0152]
  },
  RdBu: {
    RdBu3: [0x67a9cf, 0xf7f7f7, 0xef8a62],
    RdBu4: [0x0571b0, 0x92c5de, 0xf4a582, 0xca0020],
    RdBu5: [0x0571b0, 0x92c5de, 0xf7f7f7, 0xf4a582, 0xca0020],
    RdBu6: [0x2166ac, 0x67a9cf, 0xd1e5f0, 0xfddbc7, 0xef8a62, 0xb2182b],
    RdBu7: [0x2166ac, 0x67a9cf, 0xd1e5f0, 0xf7f7f7, 0xfddbc7, 0xef8a62, 0xb2182b],
    RdBu8: [0x2166ac, 0x4393c3, 0x92c5de, 0xd1e5f0, 0xfddbc7, 0xf4a582, 0xd6604d, 0xb2182b],
    RdBu9: [0x2166ac, 0x4393c3, 0x92c5de, 0xd1e5f0, 0xf7f7f7, 0xfddbc7, 0xf4a582, 0xd6604d, 0xb2182b],
    RdBu10: [0x053061, 0x2166ac, 0x4393c3, 0x92c5de, 0xd1e5f0, 0xfddbc7, 0xf4a582, 0xd6604d, 0xb2182b, 0x67001f],
    RdBu11: [0x053061, 0x2166ac, 0x4393c3, 0x92c5de, 0xd1e5f0, 0xf7f7f7, 0xfddbc7, 0xf4a582, 0xd6604d, 0xb2182b, 0x67001f]
  },
  RdGy: {
    RdGy3: [0x999999, 0xffffff, 0xef8a62],
    RdGy4: [0x404040, 0xbababa, 0xf4a582, 0xca0020],
    RdGy5: [0x404040, 0xbababa, 0xffffff, 0xf4a582, 0xca0020],
    RdGy6: [0x4d4d4d, 0x999999, 0xe0e0e0, 0xfddbc7, 0xef8a62, 0xb2182b],
    RdGy7: [0x4d4d4d, 0x999999, 0xe0e0e0, 0xffffff, 0xfddbc7, 0xef8a62, 0xb2182b],
    RdGy8: [0x4d4d4d, 0x878787, 0xbababa, 0xe0e0e0, 0xfddbc7, 0xf4a582, 0xd6604d, 0xb2182b],
    RdGy9: [0x4d4d4d, 0x878787, 0xbababa, 0xe0e0e0, 0xffffff, 0xfddbc7, 0xf4a582, 0xd6604d, 0xb2182b],
    RdGy10: [0x1a1a1a, 0x4d4d4d, 0x878787, 0xbababa, 0xe0e0e0, 0xfddbc7, 0xf4a582, 0xd6604d, 0xb2182b, 0x67001f],
    RdGy11: [0x1a1a1a, 0x4d4d4d, 0x878787, 0xbababa, 0xe0e0e0, 0xffffff, 0xfddbc7, 0xf4a582, 0xd6604d, 0xb2182b, 0x67001f]
  },
  RdYlBu: {
    RdYlBu3: [0x91bfdb, 0xffffbf, 0xfc8d59],
    RdYlBu4: [0x2c7bb6, 0xabd9e9, 0xfdae61, 0xd7191c],
    RdYlBu5: [0x2c7bb6, 0xabd9e9, 0xffffbf, 0xfdae61, 0xd7191c],
    RdYlBu6: [0x4575b4, 0x91bfdb, 0xe0f3f8, 0xfee090, 0xfc8d59, 0xd73027],
    RdYlBu7: [0x4575b4, 0x91bfdb, 0xe0f3f8, 0xffffbf, 0xfee090, 0xfc8d59, 0xd73027],
    RdYlBu8: [0x4575b4, 0x74add1, 0xabd9e9, 0xe0f3f8, 0xfee090, 0xfdae61, 0xf46d43, 0xd73027],
    RdYlBu9: [0x4575b4, 0x74add1, 0xabd9e9, 0xe0f3f8, 0xffffbf, 0xfee090, 0xfdae61, 0xf46d43, 0xd73027],
    RdYlBu10: [0x313695, 0x4575b4, 0x74add1, 0xabd9e9, 0xe0f3f8, 0xfee090, 0xfdae61, 0xf46d43, 0xd73027, 0xa50026],
    RdYlBu11: [0x313695, 0x4575b4, 0x74add1, 0xabd9e9, 0xe0f3f8, 0xffffbf, 0xfee090, 0xfdae61, 0xf46d43, 0xd73027, 0xa50026]
  },
  Spectral: {
    Spectral3: [0x99d594, 0xffffbf, 0xfc8d59],
    Spectral4: [0x2b83ba, 0xabdda4, 0xfdae61, 0xd7191c],
    Spectral5: [0x2b83ba, 0xabdda4, 0xffffbf, 0xfdae61, 0xd7191c],
    Spectral6: [0x3288bd, 0x99d594, 0xe6f598, 0xfee08b, 0xfc8d59, 0xd53e4f],
    Spectral7: [0x3288bd, 0x99d594, 0xe6f598, 0xffffbf, 0xfee08b, 0xfc8d59, 0xd53e4f],
    Spectral8: [0x3288bd, 0x66c2a5, 0xabdda4, 0xe6f598, 0xfee08b, 0xfdae61, 0xf46d43, 0xd53e4f],
    Spectral9: [0x3288bd, 0x66c2a5, 0xabdda4, 0xe6f598, 0xffffbf, 0xfee08b, 0xfdae61, 0xf46d43, 0xd53e4f],
    Spectral10: [0x5e4fa2, 0x3288bd, 0x66c2a5, 0xabdda4, 0xe6f598, 0xfee08b, 0xfdae61, 0xf46d43, 0xd53e4f, 0x9e0142],
    Spectral11: [0x5e4fa2, 0x3288bd, 0x66c2a5, 0xabdda4, 0xe6f598, 0xffffbf, 0xfee08b, 0xfdae61, 0xf46d43, 0xd53e4f, 0x9e0142]
  },
  RdYlGn: {
    RdYlGn3: [0x91cf60, 0xffffbf, 0xfc8d59],
    RdYlGn4: [0x1a9641, 0xa6d96a, 0xfdae61, 0xd7191c],
    RdYlGn5: [0x1a9641, 0xa6d96a, 0xffffbf, 0xfdae61, 0xd7191c],
    RdYlGn6: [0x1a9850, 0x91cf60, 0xd9ef8b, 0xfee08b, 0xfc8d59, 0xd73027],
    RdYlGn7: [0x1a9850, 0x91cf60, 0xd9ef8b, 0xffffbf, 0xfee08b, 0xfc8d59, 0xd73027],
    RdYlGn8: [0x1a9850, 0x66bd63, 0xa6d96a, 0xd9ef8b, 0xfee08b, 0xfdae61, 0xf46d43, 0xd73027],
    RdYlGn9: [0x1a9850, 0x66bd63, 0xa6d96a, 0xd9ef8b, 0xffffbf, 0xfee08b, 0xfdae61, 0xf46d43, 0xd73027],
    RdYlGn10: [0x006837, 0x1a9850, 0x66bd63, 0xa6d96a, 0xd9ef8b, 0xfee08b, 0xfdae61, 0xf46d43, 0xd73027, 0xa50026],
    RdYlGn11: [0x006837, 0x1a9850, 0x66bd63, 0xa6d96a, 0xd9ef8b, 0xffffbf, 0xfee08b, 0xfdae61, 0xf46d43, 0xd73027, 0xa50026]
  },
  Inferno: {
    Inferno3: [0x440154, 0x208f8c, 0xfde724],
    Inferno4: [0x000003, 0x781c6d, 0xed6825, 0xfcfea4],
    Inferno5: [0x000003, 0x550f6d, 0xba3655, 0xf98c09, 0xfcfea4],
    Inferno6: [0x000003, 0x410967, 0x932567, 0xdc5039, 0xfba40a, 0xfcfea4],
    Inferno7: [0x000003, 0x32095d, 0x781c6d, 0xba3655, 0xed6825, 0xfbb318, 0xfcfea4],
    Inferno8: [0x000003, 0x270b52, 0x63146e, 0x9e2963, 0xd24742, 0xf57c15, 0xfabf25, 0xfcfea4],
    Inferno9: [0x000003, 0x1f0c47, 0x550f6d, 0x88216a, 0xba3655, 0xe35832, 0xf98c09, 0xf8c931, 0xfcfea4],
    Inferno10: [0x000003, 0x1a0b40, 0x4a0b6a, 0x781c6d, 0xa42c60, 0xcd4247, 0xed6825, 0xfb9906, 0xf7cf3a, 0xfcfea4],
    Inferno11: [0x000003, 0x160b39, 0x410967, 0x6a176e, 0x932567, 0xba3655, 0xdc5039, 0xf2751a, 0xfba40a, 0xf6d542, 0xfcfea4],
    Inferno256: [0x000003, 0x000004, 0x000006, 0x010007, 0x010109, 0x01010b, 0x02010e, 0x020210, 0x030212, 0x040314, 0x040316, 0x050418, 0x06041b, 0x07051d, 0x08061f, 0x090621, 0x0a0723, 0x0b0726, 0x0d0828, 0x0e082a, 0x0f092d, 0x10092f, 0x120a32, 0x130a34, 0x140b36, 0x160b39, 0x170b3b, 0x190b3e, 0x1a0b40, 0x1c0c43, 0x1d0c45, 0x1f0c47, 0x200c4a, 0x220b4c, 0x240b4e, 0x260b50, 0x270b52, 0x290b54, 0x2b0a56, 0x2d0a58, 0x2e0a5a, 0x300a5c, 0x32095d, 0x34095f, 0x350960, 0x370961, 0x390962, 0x3b0964, 0x3c0965, 0x3e0966, 0x400966, 0x410967, 0x430a68, 0x450a69, 0x460a69, 0x480b6a, 0x4a0b6a, 0x4b0c6b, 0x4d0c6b, 0x4f0d6c, 0x500d6c, 0x520e6c, 0x530e6d, 0x550f6d, 0x570f6d, 0x58106d, 0x5a116d, 0x5b116e, 0x5d126e, 0x5f126e, 0x60136e, 0x62146e, 0x63146e, 0x65156e, 0x66156e, 0x68166e, 0x6a176e, 0x6b176e, 0x6d186e, 0x6e186e, 0x70196e, 0x72196d, 0x731a6d, 0x751b6d, 0x761b6d, 0x781c6d, 0x7a1c6d, 0x7b1d6c, 0x7d1d6c, 0x7e1e6c, 0x801f6b, 0x811f6b, 0x83206b, 0x85206a, 0x86216a, 0x88216a, 0x892269, 0x8b2269, 0x8d2369, 0x8e2468, 0x902468, 0x912567, 0x932567, 0x952666, 0x962666, 0x982765, 0x992864, 0x9b2864, 0x9c2963, 0x9e2963, 0xa02a62, 0xa12b61, 0xa32b61, 0xa42c60, 0xa62c5f, 0xa72d5f, 0xa92e5e, 0xab2e5d, 0xac2f5c, 0xae305b, 0xaf315b, 0xb1315a, 0xb23259, 0xb43358, 0xb53357, 0xb73456, 0xb83556, 0xba3655, 0xbb3754, 0xbd3753, 0xbe3852, 0xbf3951, 0xc13a50, 0xc23b4f, 0xc43c4e, 0xc53d4d, 0xc73e4c, 0xc83e4b, 0xc93f4a, 0xcb4049, 0xcc4148, 0xcd4247, 0xcf4446, 0xd04544, 0xd14643, 0xd24742, 0xd44841, 0xd54940, 0xd64a3f, 0xd74b3e, 0xd94d3d, 0xda4e3b, 0xdb4f3a, 0xdc5039, 0xdd5238, 0xde5337, 0xdf5436, 0xe05634, 0xe25733, 0xe35832, 0xe45a31, 0xe55b30, 0xe65c2e, 0xe65e2d, 0xe75f2c, 0xe8612b, 0xe9622a, 0xea6428, 0xeb6527, 0xec6726, 0xed6825, 0xed6a23, 0xee6c22, 0xef6d21, 0xf06f1f, 0xf0701e, 0xf1721d, 0xf2741c, 0xf2751a, 0xf37719, 0xf37918, 0xf47a16, 0xf57c15, 0xf57e14, 0xf68012, 0xf68111, 0xf78310, 0xf7850e, 0xf8870d, 0xf8880c, 0xf88a0b, 0xf98c09, 0xf98e08, 0xf99008, 0xfa9107, 0xfa9306, 0xfa9506, 0xfa9706, 0xfb9906, 0xfb9b06, 0xfb9d06, 0xfb9e07, 0xfba007, 0xfba208, 0xfba40a, 0xfba60b, 0xfba80d, 0xfbaa0e, 0xfbac10, 0xfbae12, 0xfbb014, 0xfbb116, 0xfbb318, 0xfbb51a, 0xfbb71c, 0xfbb91e, 0xfabb21, 0xfabd23, 0xfabf25, 0xfac128, 0xf9c32a, 0xf9c52c, 0xf9c72f, 0xf8c931, 0xf8cb34, 0xf8cd37, 0xf7cf3a, 0xf7d13c, 0xf6d33f, 0xf6d542, 0xf5d745, 0xf5d948, 0xf4db4b, 0xf4dc4f, 0xf3de52, 0xf3e056, 0xf3e259, 0xf2e45d, 0xf2e660, 0xf1e864, 0xf1e968, 0xf1eb6c, 0xf1ed70, 0xf1ee74, 0xf1f079, 0xf1f27d, 0xf2f381, 0xf2f485, 0xf3f689, 0xf4f78d, 0xf5f891, 0xf6fa95, 0xf7fb99, 0xf9fc9d, 0xfafda0, 0xfcfea4]
  },
  Magma: {
    Magma3: [0x000003, 0xb53679, 0xfbfcbf],
    Magma4: [0x000003, 0x711f81, 0xf0605d, 0xfbfcbf],
    Magma5: [0x000003, 0x4f117b, 0xb53679, 0xfb8660, 0xfbfcbf],
    Magma6: [0x000003, 0x3b0f6f, 0x8c2980, 0xdd4968, 0xfd9f6c, 0xfbfcbf],
    Magma7: [0x000003, 0x2b115e, 0x711f81, 0xb53679, 0xf0605d, 0xfeae76, 0xfbfcbf],
    Magma8: [0x000003, 0x221150, 0x5d177e, 0x972c7f, 0xd1426e, 0xf8755c, 0xfeb97f, 0xfbfcbf],
    Magma9: [0x000003, 0x1b1044, 0x4f117b, 0x812581, 0xb53679, 0xe55063, 0xfb8660, 0xfec286, 0xfbfcbf],
    Magma10: [0x000003, 0x170f3c, 0x430f75, 0x711f81, 0x9e2e7e, 0xcb3e71, 0xf0605d, 0xfc9366, 0xfec78b, 0xfbfcbf],
    Magma11: [0x000003, 0x140d35, 0x3b0f6f, 0x63197f, 0x8c2980, 0xb53679, 0xdd4968, 0xf66e5b, 0xfd9f6c, 0xfdcd90, 0xfbfcbf],
    Magma256: [0x000003, 0x000004, 0x000006, 0x010007, 0x010109, 0x01010b, 0x02020d, 0x02020f, 0x030311, 0x040313, 0x040415, 0x050417, 0x060519, 0x07051b, 0x08061d, 0x09071f, 0x0a0722, 0x0b0824, 0x0c0926, 0x0d0a28, 0x0e0a2a, 0x0f0b2c, 0x100c2f, 0x110c31, 0x120d33, 0x140d35, 0x150e38, 0x160e3a, 0x170f3c, 0x180f3f, 0x1a1041, 0x1b1044, 0x1c1046, 0x1e1049, 0x1f114b, 0x20114d, 0x221150, 0x231152, 0x251155, 0x261157, 0x281159, 0x2a115c, 0x2b115e, 0x2d1060, 0x2f1062, 0x301065, 0x321067, 0x341068, 0x350f6a, 0x370f6c, 0x390f6e, 0x3b0f6f, 0x3c0f71, 0x3e0f72, 0x400f73, 0x420f74, 0x430f75, 0x450f76, 0x470f77, 0x481078, 0x4a1079, 0x4b1079, 0x4d117a, 0x4f117b, 0x50127b, 0x52127c, 0x53137c, 0x55137d, 0x57147d, 0x58157e, 0x5a157e, 0x5b167e, 0x5d177e, 0x5e177f, 0x60187f, 0x61187f, 0x63197f, 0x651a80, 0x661a80, 0x681b80, 0x691c80, 0x6b1c80, 0x6c1d80, 0x6e1e81, 0x6f1e81, 0x711f81, 0x731f81, 0x742081, 0x762181, 0x772181, 0x792281, 0x7a2281, 0x7c2381, 0x7e2481, 0x7f2481, 0x812581, 0x822581, 0x842681, 0x852681, 0x872781, 0x892881, 0x8a2881, 0x8c2980, 0x8d2980, 0x8f2a80, 0x912a80, 0x922b80, 0x942b80, 0x952c80, 0x972c7f, 0x992d7f, 0x9a2d7f, 0x9c2e7f, 0x9e2e7e, 0x9f2f7e, 0xa12f7e, 0xa3307e, 0xa4307d, 0xa6317d, 0xa7317d, 0xa9327c, 0xab337c, 0xac337b, 0xae347b, 0xb0347b, 0xb1357a, 0xb3357a, 0xb53679, 0xb63679, 0xb83778, 0xb93778, 0xbb3877, 0xbd3977, 0xbe3976, 0xc03a75, 0xc23a75, 0xc33b74, 0xc53c74, 0xc63c73, 0xc83d72, 0xca3e72, 0xcb3e71, 0xcd3f70, 0xce4070, 0xd0416f, 0xd1426e, 0xd3426d, 0xd4436d, 0xd6446c, 0xd7456b, 0xd9466a, 0xda4769, 0xdc4869, 0xdd4968, 0xde4a67, 0xe04b66, 0xe14c66, 0xe24d65, 0xe44e64, 0xe55063, 0xe65162, 0xe75262, 0xe85461, 0xea5560, 0xeb5660, 0xec585f, 0xed595f, 0xee5b5e, 0xee5d5d, 0xef5e5d, 0xf0605d, 0xf1615c, 0xf2635c, 0xf3655c, 0xf3675b, 0xf4685b, 0xf56a5b, 0xf56c5b, 0xf66e5b, 0xf6705b, 0xf7715b, 0xf7735c, 0xf8755c, 0xf8775c, 0xf9795c, 0xf97b5d, 0xf97d5d, 0xfa7f5e, 0xfa805e, 0xfa825f, 0xfb8460, 0xfb8660, 0xfb8861, 0xfb8a62, 0xfc8c63, 0xfc8e63, 0xfc9064, 0xfc9265, 0xfc9366, 0xfd9567, 0xfd9768, 0xfd9969, 0xfd9b6a, 0xfd9d6b, 0xfd9f6c, 0xfda16e, 0xfda26f, 0xfda470, 0xfea671, 0xfea873, 0xfeaa74, 0xfeac75, 0xfeae76, 0xfeaf78, 0xfeb179, 0xfeb37b, 0xfeb57c, 0xfeb77d, 0xfeb97f, 0xfebb80, 0xfebc82, 0xfebe83, 0xfec085, 0xfec286, 0xfec488, 0xfec689, 0xfec78b, 0xfec98d, 0xfecb8e, 0xfdcd90, 0xfdcf92, 0xfdd193, 0xfdd295, 0xfdd497, 0xfdd698, 0xfdd89a, 0xfdda9c, 0xfddc9d, 0xfddd9f, 0xfddfa1, 0xfde1a3, 0xfce3a5, 0xfce5a6, 0xfce6a8, 0xfce8aa, 0xfceaac, 0xfcecae, 0xfceeb0, 0xfcf0b1, 0xfcf1b3, 0xfcf3b5, 0xfcf5b7, 0xfbf7b9, 0xfbf9bb, 0xfbfabd, 0xfbfcbf]
  },
  Plasma: {
    Plasma3: [0x0c0786, 0xca4678, 0xeff821],
    Plasma4: [0x0c0786, 0x9b179e, 0xec7853, 0xeff821],
    Plasma5: [0x0c0786, 0x7c02a7, 0xca4678, 0xf79341, 0xeff821],
    Plasma6: [0x0c0786, 0x6a00a7, 0xb02a8f, 0xe06461, 0xfca635, 0xeff821],
    Plasma7: [0x0c0786, 0x5c00a5, 0x9b179e, 0xca4678, 0xec7853, 0xfdb22f, 0xeff821],
    Plasma8: [0x0c0786, 0x5201a3, 0x8908a5, 0xb83289, 0xda5a68, 0xf38748, 0xfdbb2b, 0xeff821],
    Plasma9: [0x0c0786, 0x4a02a0, 0x7c02a7, 0xa82296, 0xca4678, 0xe56b5c, 0xf79341, 0xfdc328, 0xeff821],
    Plasma10: [0x0c0786, 0x45039e, 0x7200a8, 0x9b179e, 0xbc3685, 0xd7566c, 0xec7853, 0xfa9d3a, 0xfcc726, 0xeff821],
    Plasma11: [0x0c0786, 0x40039c, 0x6a00a7, 0x8f0da3, 0xb02a8f, 0xca4678, 0xe06461, 0xf1824c, 0xfca635, 0xfccc25, 0xeff821],
    Plasma256: [0x0c0786, 0x100787, 0x130689, 0x15068a, 0x18068b, 0x1b068c, 0x1d068d, 0x1f058e, 0x21058f, 0x230590, 0x250591, 0x270592, 0x290593, 0x2b0594, 0x2d0494, 0x2f0495, 0x310496, 0x330497, 0x340498, 0x360498, 0x380499, 0x3a049a, 0x3b039a, 0x3d039b, 0x3f039c, 0x40039c, 0x42039d, 0x44039e, 0x45039e, 0x47029f, 0x49029f, 0x4a02a0, 0x4c02a1, 0x4e02a1, 0x4f02a2, 0x5101a2, 0x5201a3, 0x5401a3, 0x5601a3, 0x5701a4, 0x5901a4, 0x5a00a5, 0x5c00a5, 0x5e00a5, 0x5f00a6, 0x6100a6, 0x6200a6, 0x6400a7, 0x6500a7, 0x6700a7, 0x6800a7, 0x6a00a7, 0x6c00a8, 0x6d00a8, 0x6f00a8, 0x7000a8, 0x7200a8, 0x7300a8, 0x7500a8, 0x7601a8, 0x7801a8, 0x7901a8, 0x7b02a8, 0x7c02a7, 0x7e03a7, 0x7f03a7, 0x8104a7, 0x8204a7, 0x8405a6, 0x8506a6, 0x8607a6, 0x8807a5, 0x8908a5, 0x8b09a4, 0x8c0aa4, 0x8e0ca4, 0x8f0da3, 0x900ea3, 0x920fa2, 0x9310a1, 0x9511a1, 0x9612a0, 0x9713a0, 0x99149f, 0x9a159e, 0x9b179e, 0x9d189d, 0x9e199c, 0x9f1a9b, 0xa01b9b, 0xa21c9a, 0xa31d99, 0xa41e98, 0xa51f97, 0xa72197, 0xa82296, 0xa92395, 0xaa2494, 0xac2593, 0xad2692, 0xae2791, 0xaf2890, 0xb02a8f, 0xb12b8f, 0xb22c8e, 0xb42d8d, 0xb52e8c, 0xb62f8b, 0xb7308a, 0xb83289, 0xb93388, 0xba3487, 0xbb3586, 0xbc3685, 0xbd3784, 0xbe3883, 0xbf3982, 0xc03b81, 0xc13c80, 0xc23d80, 0xc33e7f, 0xc43f7e, 0xc5407d, 0xc6417c, 0xc7427b, 0xc8447a, 0xc94579, 0xca4678, 0xcb4777, 0xcc4876, 0xcd4975, 0xce4a75, 0xcf4b74, 0xd04d73, 0xd14e72, 0xd14f71, 0xd25070, 0xd3516f, 0xd4526e, 0xd5536d, 0xd6556d, 0xd7566c, 0xd7576b, 0xd8586a, 0xd95969, 0xda5a68, 0xdb5b67, 0xdc5d66, 0xdc5e66, 0xdd5f65, 0xde6064, 0xdf6163, 0xdf6262, 0xe06461, 0xe16560, 0xe26660, 0xe3675f, 0xe3685e, 0xe46a5d, 0xe56b5c, 0xe56c5b, 0xe66d5a, 0xe76e5a, 0xe87059, 0xe87158, 0xe97257, 0xea7356, 0xea7455, 0xeb7654, 0xec7754, 0xec7853, 0xed7952, 0xed7b51, 0xee7c50, 0xef7d4f, 0xef7e4e, 0xf0804d, 0xf0814d, 0xf1824c, 0xf2844b, 0xf2854a, 0xf38649, 0xf38748, 0xf48947, 0xf48a47, 0xf58b46, 0xf58d45, 0xf68e44, 0xf68f43, 0xf69142, 0xf79241, 0xf79341, 0xf89540, 0xf8963f, 0xf8983e, 0xf9993d, 0xf99a3c, 0xfa9c3b, 0xfa9d3a, 0xfa9f3a, 0xfaa039, 0xfba238, 0xfba337, 0xfba436, 0xfca635, 0xfca735, 0xfca934, 0xfcaa33, 0xfcac32, 0xfcad31, 0xfdaf31, 0xfdb030, 0xfdb22f, 0xfdb32e, 0xfdb52d, 0xfdb62d, 0xfdb82c, 0xfdb92b, 0xfdbb2b, 0xfdbc2a, 0xfdbe29, 0xfdc029, 0xfdc128, 0xfdc328, 0xfdc427, 0xfdc626, 0xfcc726, 0xfcc926, 0xfccb25, 0xfccc25, 0xfcce25, 0xfbd024, 0xfbd124, 0xfbd324, 0xfad524, 0xfad624, 0xfad824, 0xf9d924, 0xf9db24, 0xf8dd24, 0xf8df24, 0xf7e024, 0xf7e225, 0xf6e425, 0xf6e525, 0xf5e726, 0xf5e926, 0xf4ea26, 0xf3ec26, 0xf3ee26, 0xf2f026, 0xf2f126, 0xf1f326, 0xf0f525, 0xf0f623, 0xeff821]
  },
  Viridis: {
    Viridis3: [0x440154, 0x208f8c, 0xfde724],
    Viridis4: [0x440154, 0x30678d, 0x35b778, 0xfde724],
    Viridis5: [0x440154, 0x3b518a, 0x208f8c, 0x5bc862, 0xfde724],
    Viridis6: [0x440154, 0x404387, 0x29788e, 0x22a784, 0x79d151, 0xfde724],
    Viridis7: [0x440154, 0x443982, 0x30678d, 0x208f8c, 0x35b778, 0x8dd644, 0xfde724],
    Viridis8: [0x440154, 0x46317e, 0x365a8c, 0x277e8e, 0x1ea087, 0x49c16d, 0x9dd93a, 0xfde724],
    Viridis9: [0x440154, 0x472b7a, 0x3b518a, 0x2c718e, 0x208f8c, 0x27ad80, 0x5bc862, 0xaadb32, 0xfde724],
    Viridis10: [0x440154, 0x472777, 0x3e4989, 0x30678d, 0x25828e, 0x1e9c89, 0x35b778, 0x6bcd59, 0xb2dd2c, 0xfde724],
    Viridis11: [0x440154, 0x482374, 0x404387, 0x345e8d, 0x29788e, 0x208f8c, 0x22a784, 0x42be71, 0x79d151, 0xbade27, 0xfde724],
    Viridis256: [0x440154, 0x440255, 0x440357, 0x450558, 0x45065a, 0x45085b, 0x46095c, 0x460b5e, 0x460c5f, 0x460e61, 0x470f62, 0x471163, 0x471265, 0x471466, 0x471567, 0x471669, 0x47186a, 0x48196b, 0x481a6c, 0x481c6e, 0x481d6f, 0x481e70, 0x482071, 0x482172, 0x482273, 0x482374, 0x472575, 0x472676, 0x472777, 0x472878, 0x472a79, 0x472b7a, 0x472c7b, 0x462d7c, 0x462f7c, 0x46307d, 0x46317e, 0x45327f, 0x45347f, 0x453580, 0x453681, 0x443781, 0x443982, 0x433a83, 0x433b83, 0x433c84, 0x423d84, 0x423e85, 0x424085, 0x414186, 0x414286, 0x404387, 0x404487, 0x3f4587, 0x3f4788, 0x3e4888, 0x3e4989, 0x3d4a89, 0x3d4b89, 0x3d4c89, 0x3c4d8a, 0x3c4e8a, 0x3b508a, 0x3b518a, 0x3a528b, 0x3a538b, 0x39548b, 0x39558b, 0x38568b, 0x38578c, 0x37588c, 0x37598c, 0x365a8c, 0x365b8c, 0x355c8c, 0x355d8c, 0x345e8d, 0x345f8d, 0x33608d, 0x33618d, 0x32628d, 0x32638d, 0x31648d, 0x31658d, 0x31668d, 0x30678d, 0x30688d, 0x2f698d, 0x2f6a8d, 0x2e6b8e, 0x2e6c8e, 0x2e6d8e, 0x2d6e8e, 0x2d6f8e, 0x2c708e, 0x2c718e, 0x2c728e, 0x2b738e, 0x2b748e, 0x2a758e, 0x2a768e, 0x2a778e, 0x29788e, 0x29798e, 0x287a8e, 0x287a8e, 0x287b8e, 0x277c8e, 0x277d8e, 0x277e8e, 0x267f8e, 0x26808e, 0x26818e, 0x25828e, 0x25838d, 0x24848d, 0x24858d, 0x24868d, 0x23878d, 0x23888d, 0x23898d, 0x22898d, 0x228a8d, 0x228b8d, 0x218c8d, 0x218d8c, 0x218e8c, 0x208f8c, 0x20908c, 0x20918c, 0x1f928c, 0x1f938b, 0x1f948b, 0x1f958b, 0x1f968b, 0x1e978a, 0x1e988a, 0x1e998a, 0x1e998a, 0x1e9a89, 0x1e9b89, 0x1e9c89, 0x1e9d88, 0x1e9e88, 0x1e9f88, 0x1ea087, 0x1fa187, 0x1fa286, 0x1fa386, 0x20a485, 0x20a585, 0x21a685, 0x21a784, 0x22a784, 0x23a883, 0x23a982, 0x24aa82, 0x25ab81, 0x26ac81, 0x27ad80, 0x28ae7f, 0x29af7f, 0x2ab07e, 0x2bb17d, 0x2cb17d, 0x2eb27c, 0x2fb37b, 0x30b47a, 0x32b57a, 0x33b679, 0x35b778, 0x36b877, 0x38b976, 0x39b976, 0x3bba75, 0x3dbb74, 0x3ebc73, 0x40bd72, 0x42be71, 0x44be70, 0x45bf6f, 0x47c06e, 0x49c16d, 0x4bc26c, 0x4dc26b, 0x4fc369, 0x51c468, 0x53c567, 0x55c666, 0x57c665, 0x59c764, 0x5bc862, 0x5ec961, 0x60c960, 0x62ca5f, 0x64cb5d, 0x67cc5c, 0x69cc5b, 0x6bcd59, 0x6dce58, 0x70ce56, 0x72cf55, 0x74d054, 0x77d052, 0x79d151, 0x7cd24f, 0x7ed24e, 0x81d34c, 0x83d34b, 0x86d449, 0x88d547, 0x8bd546, 0x8dd644, 0x90d643, 0x92d741, 0x95d73f, 0x97d83e, 0x9ad83c, 0x9dd93a, 0x9fd938, 0xa2da37, 0xa5da35, 0xa7db33, 0xaadb32, 0xaddc30, 0xafdc2e, 0xb2dd2c, 0xb5dd2b, 0xb7dd29, 0xbade27, 0xbdde26, 0xbfdf24, 0xc2df22, 0xc5df21, 0xc7e01f, 0xcae01e, 0xcde01d, 0xcfe11c, 0xd2e11b, 0xd4e11a, 0xd7e219, 0xdae218, 0xdce218, 0xdfe318, 0xe1e318, 0xe4e318, 0xe7e419, 0xe9e419, 0xece41a, 0xeee51b, 0xf1e51c, 0xf3e51e, 0xf6e61f, 0xf8e621, 0xfae622, 0xfde724]
  },
  Accent: {
    Accent3: [0x7fc97f, 0xbeaed4, 0xfdc086],
    Accent4: [0x7fc97f, 0xbeaed4, 0xfdc086, 0xffff99],
    Accent5: [0x7fc97f, 0xbeaed4, 0xfdc086, 0xffff99, 0x386cb0],
    Accent6: [0x7fc97f, 0xbeaed4, 0xfdc086, 0xffff99, 0x386cb0, 0xf0027f],
    Accent7: [0x7fc97f, 0xbeaed4, 0xfdc086, 0xffff99, 0x386cb0, 0xf0027f, 0xbf5b17],
    Accent8: [0x7fc97f, 0xbeaed4, 0xfdc086, 0xffff99, 0x386cb0, 0xf0027f, 0xbf5b17, 0x666666]
  },
  Dark2: {
    Dark2_3: [0x1b9e77, 0xd95f02, 0x7570b3],
    Dark2_4: [0x1b9e77, 0xd95f02, 0x7570b3, 0xe7298a],
    Dark2_5: [0x1b9e77, 0xd95f02, 0x7570b3, 0xe7298a, 0x66a61e],
    Dark2_6: [0x1b9e77, 0xd95f02, 0x7570b3, 0xe7298a, 0x66a61e, 0xe6ab02],
    Dark2_7: [0x1b9e77, 0xd95f02, 0x7570b3, 0xe7298a, 0x66a61e, 0xe6ab02, 0xa6761d],
    Dark2_8: [0x1b9e77, 0xd95f02, 0x7570b3, 0xe7298a, 0x66a61e, 0xe6ab02, 0xa6761d, 0x666666]
  },
  Paired: {
    Paired3: [0xa6cee3, 0x1f78b4, 0xb2df8a],
    Paired4: [0xa6cee3, 0x1f78b4, 0xb2df8a, 0x33a02c],
    Paired5: [0xa6cee3, 0x1f78b4, 0xb2df8a, 0x33a02c, 0xfb9a99],
    Paired6: [0xa6cee3, 0x1f78b4, 0xb2df8a, 0x33a02c, 0xfb9a99, 0xe31a1c],
    Paired7: [0xa6cee3, 0x1f78b4, 0xb2df8a, 0x33a02c, 0xfb9a99, 0xe31a1c, 0xfdbf6f],
    Paired8: [0xa6cee3, 0x1f78b4, 0xb2df8a, 0x33a02c, 0xfb9a99, 0xe31a1c, 0xfdbf6f, 0xff7f00],
    Paired9: [0xa6cee3, 0x1f78b4, 0xb2df8a, 0x33a02c, 0xfb9a99, 0xe31a1c, 0xfdbf6f, 0xff7f00, 0xcab2d6],
    Paired10: [0xa6cee3, 0x1f78b4, 0xb2df8a, 0x33a02c, 0xfb9a99, 0xe31a1c, 0xfdbf6f, 0xff7f00, 0xcab2d6, 0x6a3d9a],
    Paired11: [0xa6cee3, 0x1f78b4, 0xb2df8a, 0x33a02c, 0xfb9a99, 0xe31a1c, 0xfdbf6f, 0xff7f00, 0xcab2d6, 0x6a3d9a, 0xffff99],
    Paired12: [0xa6cee3, 0x1f78b4, 0xb2df8a, 0x33a02c, 0xfb9a99, 0xe31a1c, 0xfdbf6f, 0xff7f00, 0xcab2d6, 0x6a3d9a, 0xffff99, 0xb15928]
  },
  Pastel1: {
    Pastel1_3: [0xfbb4ae, 0xb3cde3, 0xccebc5],
    Pastel1_4: [0xfbb4ae, 0xb3cde3, 0xccebc5, 0xdecbe4],
    Pastel1_5: [0xfbb4ae, 0xb3cde3, 0xccebc5, 0xdecbe4, 0xfed9a6],
    Pastel1_6: [0xfbb4ae, 0xb3cde3, 0xccebc5, 0xdecbe4, 0xfed9a6, 0xffffcc],
    Pastel1_7: [0xfbb4ae, 0xb3cde3, 0xccebc5, 0xdecbe4, 0xfed9a6, 0xffffcc, 0xe5d8bd],
    Pastel1_8: [0xfbb4ae, 0xb3cde3, 0xccebc5, 0xdecbe4, 0xfed9a6, 0xffffcc, 0xe5d8bd, 0xfddaec],
    Pastel1_9: [0xfbb4ae, 0xb3cde3, 0xccebc5, 0xdecbe4, 0xfed9a6, 0xffffcc, 0xe5d8bd, 0xfddaec, 0xf2f2f2]
  },
  Pastel2: {
    Pastel2_3: [0xb3e2cd, 0xfdcdac, 0xcbd5e8],
    Pastel2_4: [0xb3e2cd, 0xfdcdac, 0xcbd5e8, 0xf4cae4],
    Pastel2_5: [0xb3e2cd, 0xfdcdac, 0xcbd5e8, 0xf4cae4, 0xe6f5c9],
    Pastel2_6: [0xb3e2cd, 0xfdcdac, 0xcbd5e8, 0xf4cae4, 0xe6f5c9, 0xfff2ae],
    Pastel2_7: [0xb3e2cd, 0xfdcdac, 0xcbd5e8, 0xf4cae4, 0xe6f5c9, 0xfff2ae, 0xf1e2cc],
    Pastel2_8: [0xb3e2cd, 0xfdcdac, 0xcbd5e8, 0xf4cae4, 0xe6f5c9, 0xfff2ae, 0xf1e2cc, 0xcccccc]
  },
  Set1: {
    Set1_3: [0xe41a1c, 0x377eb8, 0x4daf4a],
    Set1_4: [0xe41a1c, 0x377eb8, 0x4daf4a, 0x984ea3],
    Set1_5: [0xe41a1c, 0x377eb8, 0x4daf4a, 0x984ea3, 0xff7f00],
    Set1_6: [0xe41a1c, 0x377eb8, 0x4daf4a, 0x984ea3, 0xff7f00, 0xffff33],
    Set1_7: [0xe41a1c, 0x377eb8, 0x4daf4a, 0x984ea3, 0xff7f00, 0xffff33, 0xa65628],
    Set1_8: [0xe41a1c, 0x377eb8, 0x4daf4a, 0x984ea3, 0xff7f00, 0xffff33, 0xa65628, 0xf781bf],
    Set1_9: [0xe41a1c, 0x377eb8, 0x4daf4a, 0x984ea3, 0xff7f00, 0xffff33, 0xa65628, 0xf781bf, 0x999999]
  },
  Set2: {
    Set2_3: [0x66c2a5, 0xfc8d62, 0x8da0cb],
    Set2_4: [0x66c2a5, 0xfc8d62, 0x8da0cb, 0xe78ac3],
    Set2_5: [0x66c2a5, 0xfc8d62, 0x8da0cb, 0xe78ac3, 0xa6d854],
    Set2_6: [0x66c2a5, 0xfc8d62, 0x8da0cb, 0xe78ac3, 0xa6d854, 0xffd92f],
    Set2_7: [0x66c2a5, 0xfc8d62, 0x8da0cb, 0xe78ac3, 0xa6d854, 0xffd92f, 0xe5c494],
    Set2_8: [0x66c2a5, 0xfc8d62, 0x8da0cb, 0xe78ac3, 0xa6d854, 0xffd92f, 0xe5c494, 0xb3b3b3]
  },
  Set3: {
    Set3_3: [0x8dd3c7, 0xffffb3, 0xbebada],
    Set3_4: [0x8dd3c7, 0xffffb3, 0xbebada, 0xfb8072],
    Set3_5: [0x8dd3c7, 0xffffb3, 0xbebada, 0xfb8072, 0x80b1d3],
    Set3_6: [0x8dd3c7, 0xffffb3, 0xbebada, 0xfb8072, 0x80b1d3, 0xfdb462],
    Set3_7: [0x8dd3c7, 0xffffb3, 0xbebada, 0xfb8072, 0x80b1d3, 0xfdb462, 0xb3de69],
    Set3_8: [0x8dd3c7, 0xffffb3, 0xbebada, 0xfb8072, 0x80b1d3, 0xfdb462, 0xb3de69, 0xfccde5],
    Set3_9: [0x8dd3c7, 0xffffb3, 0xbebada, 0xfb8072, 0x80b1d3, 0xfdb462, 0xb3de69, 0xfccde5, 0xd9d9d9],
    Set3_10: [0x8dd3c7, 0xffffb3, 0xbebada, 0xfb8072, 0x80b1d3, 0xfdb462, 0xb3de69, 0xfccde5, 0xd9d9d9, 0xbc80bd],
    Set3_11: [0x8dd3c7, 0xffffb3, 0xbebada, 0xfb8072, 0x80b1d3, 0xfdb462, 0xb3de69, 0xfccde5, 0xd9d9d9, 0xbc80bd, 0xccebc5],
    Set3_12: [0x8dd3c7, 0xffffb3, 0xbebada, 0xfb8072, 0x80b1d3, 0xfdb462, 0xb3de69, 0xfccde5, 0xd9d9d9, 0xbc80bd, 0xccebc5, 0xffed6f]
  }
};


/* License regarding the Viridis, Magma, Plasma and Inferno color maps */

module.exports = _.extend({}, palettes, palettes.YlGn, palettes.YlGnBu, palettes.GnBu, palettes.BuGn, palettes.PuBuGn, palettes.PuBu, palettes.BuPu, palettes.RdPu, palettes.PuRd, palettes.OrRd, palettes.YlOrRd, palettes.YlOrBr, palettes.Purples, palettes.Blues, palettes.Greens, palettes.Oranges, palettes.Reds, palettes.Greys, palettes.PuOr, palettes.BrBG, palettes.PRGn, palettes.PiYG, palettes.RdBu, palettes.RdGy, palettes.RdYlBu, palettes.Spectral, palettes.RdYlGn, palettes.Inferno, palettes.Magma, palettes.Plasma, palettes.Viridis);

},{"underscore":"underscore"}],"api/plotting":[function(require,module,exports){
var $, BOKEH_ROOT, Document, Figure, _, _default_tools, _default_tooltips, _known_tools, _with_default, color, embed, figure, gridplot, models, show, sprintf,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

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
      dimensions: 'both'
    });
  },
  xpan: function(plot) {
    return new models.PanTool({
      plot: plot,
      dimensions: 'width'
    });
  },
  ypan: function(plot) {
    return new models.PanTool({
      plot: plot,
      dimensions: 'height'
    });
  },
  wheel_zoom: function(plot) {
    return new models.WheelZoomTool({
      plot: plot,
      dimensions: 'both'
    });
  },
  xwheel_zoom: function(plot) {
    return new models.WheelZoomTool({
      plot: plot,
      dimensions: 'width'
    });
  },
  ywheel_zoom: function(plot) {
    return new models.WheelZoomTool({
      plot: plot,
      dimensions: 'height'
    });
  },
  zoom_in: function(plot) {
    return new models.ZoomInTool({
      plot: plot,
      dimensions: 'both'
    });
  },
  xzoom_in: function(plot) {
    return new models.ZoomInTool({
      plot: plot,
      dimensions: 'width'
    });
  },
  yzoom_in: function(plot) {
    return new models.ZoomInTool({
      plot: plot,
      dimensions: 'height'
    });
  },
  zoom_out: function(plot) {
    return new models.ZoomOutTool({
      plot: plot,
      dimensions: 'both'
    });
  },
  xzoom_out: function(plot) {
    return new models.ZoomOutTool({
      plot: plot,
      dimensions: 'width'
    });
  },
  yzoom_out: function(plot) {
    return new models.ZoomOutTool({
      plot: plot,
      dimensions: 'height'
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
      dimensions: 'width'
    });
  },
  ybox_select: function(plot) {
    return new models.BoxSelectTool({
      plot: plot,
      dimensions: 'height'
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
      dimensions: 'both'
    });
  },
  xbox_zoom: function(plot) {
    return new models.BoxZoomTool({
      plot: plot,
      dimensions: 'width'
    });
  },
  ybox_zoom: function(plot) {
    return new models.BoxZoomTool({
      plot: plot,
      dimensions: 'height'
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
      plot: this,
      items: []
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

  Figure.prototype.circle = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.Circle, "x,y", args);
  };

  Figure.prototype.ellipse = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._glyph(models.Ellipse, "x,y,width,height", args);
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
    legend = this._process_legend(attrs.legend, attrs.source);
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

  Figure.prototype._process_legend = function(legend, source) {
    var legend_item_label;
    legend_item_label = null;
    if (legend != null) {
      if (_.isString(legend)) {
        legend_item_label = {
          value: legend
        };
        if ((source != null) && (source.column_names != null)) {
          if (indexOf.call(source.column_names, legend) >= 0) {
            legend_item_label = {
              field: legend
            };
          }
        }
      } else {
        legend_item_label = legend;
      }
    }
    return legend_item_label;
  };

  Figure.prototype._update_legend = function(legend_item_label, glyph_renderer) {
    var added, item, j, len, new_item, ref;
    added = false;
    ref = this._legend.items;
    for (j = 0, len = ref.length; j < len; j++) {
      item = ref[j];
      if (_.isEqual(item.label, legend_item_label)) {
        if (item.label.value != null) {
          item.renderers.push(glyph_renderer);
          added = true;
          break;
        }
        if ((item.label.field != null) && glyph_renderer.data_source === item.renderers[0].data_source) {
          item.renderers.push(glyph_renderer);
          added = true;
          break;
        }
      }
    }
    if (!added) {
      new_item = new models.LegendItem({
        label: legend_item_label,
        renderers: [glyph_renderer]
      });
      return this._legend.items.push(new_item);
    }
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
