(function(root, factory) {
//  if(typeof exports === 'object' && typeof module === 'object')
//    factory(require("Bokeh"));
//  else if(typeof define === 'function' && define.amd)
//    define(["Bokeh"], factory);
//  else if(typeof exports === 'object')
//    factory(require("Bokeh"));
//  else
    factory(root["Bokeh"]);
})(this, function(Bokeh) {
  var define;
  return (function(modules, aliases, entry) {
    if (Bokeh != null) {
      return Bokeh.register_plugin(modules, aliases, entry);
    } else {
      throw new Error("Cannot find Bokeh. You have to load it prior to loading plugins.");
    }
  })
({
370: /*api/charts*/
function _(require, module, exports) {
    var sprintf_js_1 = require(367    /* sprintf-js */);
    var palettes = require(376    /* ./palettes */);
    var array_1 = require(22    /* ../core/util/array */);
    var types_1 = require(43    /* ../core/util/types */);
    var models_1 = require(375    /* ./models */);
    function num2hexcolor(num) {
        return sprintf_js_1.sprintf('#%06x', num);
    }
    function hexcolor2rgb(color) {
        var r = parseInt(color.substr(1, 2), 16);
        var g = parseInt(color.substr(3, 2), 16);
        var b = parseInt(color.substr(5, 2), 16);
        return [
            r,
            g,
            b
        ];
    }
    function is_dark(_a) {
        var r = _a[0], g = _a[1], b = _a[2];
        var l = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return l >= 0.6;
    }
    function norm_palette(palette) {
        if (palette === void 0) {
            palette = 'Spectral11';
        }
        if (types_1.isArray(palette))
            return palette;
        else {
            return palettes[palette].map(num2hexcolor);
        }
    }
    function pie(data, opts) {
        if (opts === void 0) {
            opts = {};
        }
        var labels = [];
        var values = [];
        for (var i = 0; i < Math.min(data.labels.length, data.values.length); i++) {
            if (data.values[i] > 0) {
                labels.push(data.labels[i]);
                values.push(data.values[i]);
            }
        }
        var start_angle = opts.start_angle != null ? opts.start_angle : 0;
        var end_angle = opts.end_angle != null ? opts.end_angle : start_angle + 2 * Math.PI;
        var angle_span = Math.abs(end_angle - start_angle);
        var to_radians = function (x) {
            return angle_span * x;
        };
        var total_value = array_1.sum(values);
        var normalized_values = values.map(function (v) {
            return v / total_value;
        });
        var cumulative_values = array_1.cumsum(normalized_values);
        var end_angles = cumulative_values.map(function (v) {
            return start_angle + to_radians(v);
        });
        var start_angles = [start_angle].concat(end_angles.slice(0, -1));
        var half_angles = array_1.zip(start_angles, end_angles).map(function (_a) {
            var start = _a[0], end = _a[1];
            return (start + end) / 2;
        });
        var cx;
        var cy;
        if (opts.center == null) {
            cx = 0;
            cy = 0;
        } else if (types_1.isArray(opts.center)) {
            cx = opts.center[0];
            cy = opts.center[1];
        } else {
            cx = opts.center.x;
            cy = opts.center.y;
        }
        var inner_radius = opts.inner_radius != null ? opts.inner_radius : 0;
        var outer_radius = opts.outer_radius != null ? opts.outer_radius : 1;
        var palette = norm_palette(opts.palette);
        var colors = [];
        for (var i = 0; i < normalized_values.length; i++)
            colors.push(palette[i % palette.length]);
        var text_colors = colors.map(function (c) {
            return is_dark(hexcolor2rgb(c)) ? 'white' : 'black';
        });
        function to_cartesian(r, alpha) {
            return [
                r * Math.cos(alpha),
                r * Math.sin(alpha)
            ];
        }
        var half_radius = (inner_radius + outer_radius) / 2;
        var _a = array_1.unzip(half_angles.map(function (half_angle) {
                return to_cartesian(half_radius, half_angle);
            })), text_cx = _a[0], text_cy = _a[1];
        text_cx = text_cx.map(function (x) {
            return x + cx;
        });
        text_cy = text_cy.map(function (y) {
            return y + cy;
        });
        var text_angles = half_angles.map(function (a) {
            if (a >= Math.PI / 2 && a <= 3 * Math.PI / 2)
                return a + Math.PI;
            else
                return a;
        });
        var source = new models_1.ColumnDataSource({
            data: {
                labels: labels,
                values: values,
                percentages: normalized_values.map(function (v) {
                    return sprintf_js_1.sprintf('%.2f%%', v * 100);
                }),
                start_angles: start_angles,
                end_angles: end_angles,
                text_angles: text_angles,
                colors: colors,
                text_colors: text_colors,
                text_cx: text_cx,
                text_cy: text_cy
            }
        });
        var g1 = new models_1.AnnularWedge({
            x: cx,
            y: cy,
            inner_radius: inner_radius,
            outer_radius: outer_radius,
            start_angle: { field: 'start_angles' },
            end_angle: { field: 'end_angles' },
            line_color: null,
            line_width: 1,
            fill_color: { field: 'colors' }
        });
        var h1 = new models_1.AnnularWedge({
            x: cx,
            y: cy,
            inner_radius: inner_radius,
            outer_radius: outer_radius,
            start_angle: { field: 'start_angles' },
            end_angle: { field: 'end_angles' },
            line_color: null,
            line_width: 1,
            fill_color: { field: 'colors' },
            fill_alpha: 0.8
        });
        var r1 = new models_1.GlyphRenderer({
            data_source: source,
            glyph: g1,
            hover_glyph: h1
        });
        var g2 = new models_1.Text({
            x: { field: 'text_cx' },
            y: { field: 'text_cy' },
            text: { field: opts.slice_labels || 'labels' },
            angle: { field: 'text_angles' },
            text_align: 'center',
            text_baseline: 'middle',
            text_color: { field: 'text_colors' },
            text_font_size: '9pt'
        });
        var r2 = new models_1.GlyphRenderer({
            data_source: source,
            glyph: g2
        });
        var xdr = new models_1.DataRange1d({
            renderers: [r1],
            range_padding: 0.2
        });
        var ydr = new models_1.DataRange1d({
            renderers: [r1],
            range_padding: 0.2
        });
        var plot = new models_1.Plot({
            x_range: xdr,
            y_range: ydr
        });
        if (opts.width != null)
            plot.plot_width = opts.width;
        if (opts.height != null)
            plot.plot_height = opts.height;
        plot.add_renderers(r1, r2);
        var tooltip = '<div>@labels</div><div><b>@values</b> (@percentages)</div>';
        var hover = new models_1.HoverTool({
            renderers: [r1],
            tooltips: tooltip
        });
        plot.add_tools(hover);
        return plot;
    }
    exports.pie = pie;
    function bar(data, opts) {
        if (opts === void 0) {
            opts = {};
        }
        var column_names = data[0];
        var rows = data.slice(1);
        var columns = column_names.map(function (_) {
            return [];
        });
        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
            var row = rows_1[_i];
            for (var i = 0; i < row.length; i++) {
                columns[i].push(row[i]);
            }
        }
        var labels = columns[0].map(function (v) {
            return v.toString();
        });
        columns = columns.slice(1);
        var yaxis = new models_1.CategoricalAxis();
        var ydr = new models_1.FactorRange({ factors: labels });
        var yscale = new models_1.CategoricalScale();
        var xformatter;
        if (opts.axis_number_format != null)
            xformatter = new models_1.NumeralTickFormatter({ format: opts.axis_number_format });
        else
            xformatter = new models_1.BasicTickFormatter();
        var xaxis = new models_1.LinearAxis({ formatter: xformatter });
        var xdr = new models_1.DataRange1d({ start: 0 });
        var xscale = new models_1.LinearScale();
        var palette = norm_palette(opts.palette);
        var stacked = opts.stacked != null ? opts.stacked : false;
        var orientation = opts.orientation != null ? opts.orientation : 'horizontal';
        var renderers = [];
        if (stacked) {
            var left = [];
            var right = [];
            var _loop_1 = function (i) {
                var bottom = [];
                var top_1 = [];
                for (var j = 0; j < labels.length; j++) {
                    var label = labels[j];
                    if (i == 0) {
                        left.push(0);
                        right.push(columns[i][j]);
                    } else {
                        left[j] += columns[i - 1][j];
                        right[j] += columns[i][j];
                    }
                    bottom.push([
                        label,
                        -0.5
                    ]);
                    top_1.push([
                        label,
                        0.5
                    ]);
                }
                var source = new models_1.ColumnDataSource({
                    data: {
                        left: array_1.copy(left),
                        right: array_1.copy(right),
                        top: top_1,
                        bottom: bottom,
                        labels: labels,
                        values: columns[i],
                        columns: columns[i].map(function (_) {
                            return column_names[i + 1];
                        })
                    }
                });
                var g1 = new models_1.Quad({
                    left: { field: 'left' },
                    bottom: { field: 'bottom' },
                    right: { field: 'right' },
                    top: { field: 'top' },
                    line_color: null,
                    fill_color: palette[i % palette.length]
                });
                var r1 = new models_1.GlyphRenderer({
                    data_source: source,
                    glyph: g1
                });
                renderers.push(r1);
            };
            for (var i = 0; i < columns.length; i++) {
                _loop_1(i);
            }
        } else {
            var dy = 1 / columns.length;
            var _loop_2 = function (i) {
                var left = [];
                var right = [];
                var bottom = [];
                var top_2 = [];
                for (var j = 0; j < labels.length; j++) {
                    var label = labels[j];
                    left.push(0);
                    right.push(columns[i][j]);
                    bottom.push([
                        label,
                        i * dy - 0.5
                    ]);
                    top_2.push([
                        label,
                        (i + 1) * dy - 0.5
                    ]);
                }
                var source = new models_1.ColumnDataSource({
                    data: {
                        left: left,
                        right: right,
                        top: top_2,
                        bottom: bottom,
                        labels: labels,
                        values: columns[i],
                        columns: columns[i].map(function (_) {
                            return column_names[i + 1];
                        })
                    }
                });
                var g1 = new models_1.Quad({
                    left: { field: 'left' },
                    bottom: { field: 'bottom' },
                    right: { field: 'right' },
                    top: { field: 'top' },
                    line_color: null,
                    fill_color: palette[i % palette.length]
                });
                var r1 = new models_1.GlyphRenderer({
                    data_source: source,
                    glyph: g1
                });
                renderers.push(r1);
            };
            for (var i = 0; i < columns.length; i++) {
                _loop_2(i);
            }
        }
        if (orientation == 'vertical') {
            _a = [
                ydr,
                xdr
            ], xdr = _a[0], ydr = _a[1];
            _b = [
                yaxis,
                xaxis
            ], xaxis = _b[0], yaxis = _b[1];
            _c = [
                yscale,
                xscale
            ], xscale = _c[0], yscale = _c[1];
            for (var _d = 0, renderers_1 = renderers; _d < renderers_1.length; _d++) {
                var r = renderers_1[_d];
                var data_1 = r.data_source.data;
                _e = [
                    data_1.bottom,
                    data_1.left
                ], data_1.left = _e[0], data_1.bottom = _e[1];
                _f = [
                    data_1.top,
                    data_1.right
                ], data_1.right = _f[0], data_1.top = _f[1];
            }
        }
        var plot = new models_1.Plot({
            x_range: xdr,
            y_range: ydr,
            x_scale: xscale,
            y_scale: yscale
        });
        if (opts.width != null)
            plot.plot_width = opts.width;
        if (opts.height != null)
            plot.plot_height = opts.height;
        plot.add_renderers.apply(plot, renderers);
        plot.add_layout(yaxis, 'left');
        plot.add_layout(xaxis, 'below');
        var tooltip = '<div>@labels</div><div>@columns:&nbsp<b>@values</b></div>';
        var anchor;
        var attachment;
        if (orientation == 'horizontal') {
            anchor = 'center_right';
            attachment = 'horizontal';
        } else {
            anchor = 'top_center';
            attachment = 'vertical';
        }
        var hover = new models_1.HoverTool({
            renderers: renderers,
            tooltips: tooltip,
            point_policy: 'snap_to_data',
            anchor: anchor,
            attachment: attachment
        });
        plot.add_tools(hover);
        return plot;
        var _a, _b, _c, _e, _f;
    }
    exports.bar = bar;    
},
371: /*api/gridplot*/
function _(require, module, exports) {
    var models_1 = require(375    /* ./models */);
    function or_else(value, default_value) {
        if (value === undefined)
            return default_value;
        else
            return value;
    }
    function nope() {
        throw new Error('this shouldn\'t have happened');
    }
    function gridplot(children, opts) {
        if (opts === void 0) {
            opts = {};
        }
        var toolbar_location = or_else(opts.toolbar_location, 'above');
        var sizing_mode = or_else(opts.sizing_mode, 'fixed');
        var merge_tools = or_else(opts.merge_tools, true);
        var tools = [];
        var rows = [];
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var row = children_1[_i];
            var row_tools = [];
            var row_children = [];
            for (var _a = 0, row_1 = row; _a < row_1.length; _a++) {
                var item = row_1[_a];
                if (item == null) {
                    var width = 0;
                    var height = 0;
                    for (var _b = 0, row_2 = row; _b < row_2.length; _b++) {
                        var neighbor = row_2[_b];
                        if (neighbor instanceof models_1.Plot) {
                            width = neighbor.plot_width;
                            height = neighbor.plot_height;
                            break;
                        }
                    }
                    item = new models_1.Spacer({
                        width: width,
                        height: height
                    });
                } else if (item instanceof models_1.Plot) {
                    row_tools.push.apply(row_tools, item.toolbar.tools);
                    item.toolbar_location = null;
                }
                item.sizing_mode = sizing_mode;
                row_children.push(item);
            }
            tools.push.apply(tools, row_tools);
            rows.push(new models_1.Row({
                children: row_children,
                sizing_mode: sizing_mode
            }));
        }
        var grid = new models_1.Column({
            children: rows,
            sizing_mode: sizing_mode
        });
        if (!merge_tools || toolbar_location == null)
            return grid;
        var toolbar_sizing_mode;
        if (sizing_mode == 'fixed') {
            if (toolbar_location == 'above' || toolbar_location == 'below')
                toolbar_sizing_mode = 'scale_width';
            else
                toolbar_sizing_mode = 'scale_height';
        } else
            toolbar_sizing_mode = sizing_mode;
        var toolbar = new models_1.ToolbarBox({
            toolbar: new models_1.ProxyToolbar({ tools: tools }),
            toolbar_location: toolbar_location,
            sizing_mode: toolbar_sizing_mode
        });
        switch (toolbar_location) {
        case 'above':
            return new models_1.Column({
                children: [
                    toolbar,
                    grid
                ],
                sizing_mode: sizing_mode
            });
        case 'below':
            return new models_1.Column({
                children: [
                    grid,
                    toolbar
                ],
                sizing_mode: sizing_mode
            });
        case 'left':
            return new models_1.Row({
                children: [
                    toolbar,
                    grid
                ],
                sizing_mode: sizing_mode
            });
        case 'right':
            return new models_1.Row({
                children: [
                    grid,
                    toolbar
                ],
                sizing_mode: sizing_mode
            });
        default:
            return nope();
        }
    }
    exports.gridplot = gridplot;    
},
372: /*api/index*/
function _(require, module, exports) {
    var tslib_1 = require(369    /* tslib */);
    // api/bokeh.d.ts
    var LinAlg = require(373    /* ./linalg */);
    exports.LinAlg = LinAlg;
    // api/charts.d.ts
    var Charts = require(370    /* ./charts */);
    exports.Charts = Charts;
    // api/plotting.d.ts
    var Plotting = require(377    /* ./plotting */);
    exports.Plotting = Plotting;
    // api/typings/models/document.d.ts
    var document_1 = require(48    /* ../document */);
    exports.Document = document_1.Document;
    // api/typings/bokeh.d.ts
    var sprintf_js_1 = require(367    /* sprintf-js */);
    exports.sprintf = sprintf_js_1.sprintf;
    // api/typings/models/*.d.ts
    tslib_1.__exportStar(require(375    /* ./models */), exports);    
},
373: /*api/linalg*/
function _(require, module, exports) {
    var tslib_1 = require(369    /* tslib */);
    tslib_1.__exportStar(require(31    /* ../core/util/object */), exports);
    tslib_1.__exportStar(require(22    /* ../core/util/array */), exports);
    tslib_1.__exportStar(require(38    /* ../core/util/string */), exports);
    tslib_1.__exportStar(require(43    /* ../core/util/types */), exports);
    tslib_1.__exportStar(require(29    /* ../core/util/eq */), exports);    
},
374: /*api/main*/
function _(require, module, exports) {
    var tslib_1 = require(369    /* tslib */);
    tslib_1.__exportStar(require(372    /* ./index */), exports);    
},
375: /*api/models*/
function _(require, module, exports) {
    var tslib_1 = require(369    /* tslib */);
    tslib_1.__exportStar(require(136    /* ../models/index */), exports);    
},
376: /*api/palettes*/
function _(require, module, exports) {
    exports.YlGn3 = [
        3253076,
        11394446,
        16252089
    ];
    exports.YlGn4 = [
        2327619,
        7915129,
        12773017,
        16777164
    ];
    exports.YlGn5 = [
        26679,
        3253076,
        7915129,
        12773017,
        16777164
    ];
    exports.YlGn6 = [
        26679,
        3253076,
        7915129,
        11394446,
        14282915,
        16777164
    ];
    exports.YlGn7 = [
        23090,
        2327619,
        4303709,
        7915129,
        11394446,
        14282915,
        16777164
    ];
    exports.YlGn8 = [
        23090,
        2327619,
        4303709,
        7915129,
        11394446,
        14282915,
        16252089,
        16777189
    ];
    exports.YlGn9 = [
        17705,
        26679,
        2327619,
        4303709,
        7915129,
        11394446,
        14282915,
        16252089,
        16777189
    ];
    exports.YlGnBu3 = [
        2916280,
        8375739,
        15595697
    ];
    exports.YlGnBu4 = [
        2252456,
        4306628,
        10607284,
        16777164
    ];
    exports.YlGnBu5 = [
        2438292,
        2916280,
        4306628,
        10607284,
        16777164
    ];
    exports.YlGnBu6 = [
        2438292,
        2916280,
        4306628,
        8375739,
        13101492,
        16777164
    ];
    exports.YlGnBu7 = [
        797828,
        2252456,
        1937856,
        4306628,
        8375739,
        13101492,
        16777164
    ];
    exports.YlGnBu8 = [
        797828,
        2252456,
        1937856,
        4306628,
        8375739,
        13101492,
        15595697,
        16777177
    ];
    exports.YlGnBu9 = [
        531800,
        2438292,
        2252456,
        1937856,
        4306628,
        8375739,
        13101492,
        15595697,
        16777177
    ];
    exports.GnBu3 = [
        4432586,
        11066805,
        14742491
    ];
    exports.GnBu4 = [
        2854078,
        8113348,
        12248252,
        15792616
    ];
    exports.GnBu5 = [
        551084,
        4432586,
        8113348,
        12248252,
        15792616
    ];
    exports.GnBu6 = [
        551084,
        4432586,
        8113348,
        11066805,
        13429701,
        15792616
    ];
    exports.GnBu7 = [
        546974,
        2854078,
        5157843,
        8113348,
        11066805,
        13429701,
        15792616
    ];
    exports.GnBu8 = [
        546974,
        2854078,
        5157843,
        8113348,
        11066805,
        13429701,
        14742491,
        16252144
    ];
    exports.GnBu9 = [
        540801,
        551084,
        2854078,
        5157843,
        8113348,
        11066805,
        13429701,
        14742491,
        16252144
    ];
    exports.BuGn3 = [
        2925151,
        10082505,
        15070713
    ];
    exports.BuGn4 = [
        2329413,
        6734500,
        11723490,
        15595771
    ];
    exports.BuGn5 = [
        27948,
        2925151,
        6734500,
        11723490,
        15595771
    ];
    exports.BuGn6 = [
        27948,
        2925151,
        6734500,
        10082505,
        13429990,
        15595771
    ];
    exports.BuGn7 = [
        22564,
        2329413,
        4304502,
        6734500,
        10082505,
        13429990,
        15595771
    ];
    exports.BuGn8 = [
        22564,
        2329413,
        4304502,
        6734500,
        10082505,
        13429990,
        15070713,
        16252157
    ];
    exports.BuGn9 = [
        17435,
        27948,
        2329413,
        4304502,
        6734500,
        10082505,
        13429990,
        15070713,
        16252157
    ];
    exports.PuBuGn3 = [
        1872025,
        10927579,
        15524592
    ];
    exports.PuBuGn4 = [
        164234,
        6793679,
        12437985,
        16183287
    ];
    exports.PuBuGn5 = [
        93273,
        1872025,
        6793679,
        12437985,
        16183287
    ];
    exports.PuBuGn6 = [
        93273,
        1872025,
        6793679,
        10927579,
        13685222,
        16183287
    ];
    exports.PuBuGn7 = [
        91216,
        164234,
        3576000,
        6793679,
        10927579,
        13685222,
        16183287
    ];
    exports.PuBuGn8 = [
        91216,
        164234,
        3576000,
        6793679,
        10927579,
        13685222,
        15524592,
        16775163
    ];
    exports.PuBuGn9 = [
        83510,
        93273,
        164234,
        3576000,
        6793679,
        10927579,
        13685222,
        15524592,
        16775163
    ];
    exports.PuBu3 = [
        2854078,
        10927579,
        15525874
    ];
    exports.PuBu4 = [
        356528,
        7645647,
        12437985,
        15855350
    ];
    exports.PuBu5 = [
        285325,
        2854078,
        7645647,
        12437985,
        15855350
    ];
    exports.PuBu6 = [
        285325,
        2854078,
        7645647,
        10927579,
        13685222,
        15855350
    ];
    exports.PuBu7 = [
        216699,
        356528,
        3576000,
        7645647,
        10927579,
        13685222,
        15855350
    ];
    exports.PuBu8 = [
        216699,
        356528,
        3576000,
        7645647,
        10927579,
        13685222,
        15525874,
        16775163
    ];
    exports.PuBu9 = [
        145496,
        285325,
        356528,
        3576000,
        7645647,
        10927579,
        13685222,
        15525874,
        16775163
    ];
    exports.BuPu3 = [
        8935079,
        10403034,
        14740724
    ];
    exports.BuPu4 = [
        8929693,
        9213638,
        11783651,
        15595771
    ];
    exports.BuPu5 = [
        8458108,
        8935079,
        9213638,
        11783651,
        15595771
    ];
    exports.BuPu6 = [
        8458108,
        8935079,
        9213638,
        10403034,
        12571622,
        15595771
    ];
    exports.BuPu7 = [
        7209323,
        8929693,
        9202609,
        9213638,
        10403034,
        12571622,
        15595771
    ];
    exports.BuPu8 = [
        7209323,
        8929693,
        9202609,
        9213638,
        10403034,
        12571622,
        14740724,
        16252157
    ];
    exports.BuPu9 = [
        5046347,
        8458108,
        8929693,
        9202609,
        9213638,
        10403034,
        12571622,
        14740724,
        16252157
    ];
    exports.RdPu3 = [
        12917642,
        16424885,
        16638173
    ];
    exports.RdPu4 = [
        11403646,
        16214177,
        16495801,
        16706530
    ];
    exports.RdPu5 = [
        7995767,
        12917642,
        16214177,
        16495801,
        16706530
    ];
    exports.RdPu6 = [
        7995767,
        12917642,
        16214177,
        16424885,
        16565696,
        16706530
    ];
    exports.RdPu7 = [
        7995767,
        11403646,
        14496919,
        16214177,
        16424885,
        16565696,
        16706530
    ];
    exports.RdPu8 = [
        7995767,
        11403646,
        14496919,
        16214177,
        16424885,
        16565696,
        16638173,
        16775155
    ];
    exports.RdPu9 = [
        4784234,
        7995767,
        11403646,
        14496919,
        16214177,
        16424885,
        16565696,
        16638173,
        16775155
    ];
    exports.PuRd3 = [
        14490743,
        13210823,
        15196655
    ];
    exports.PuRd4 = [
        13505110,
        14640560,
        14136792,
        15855350
    ];
    exports.PuRd5 = [
        9961539,
        14490743,
        14640560,
        14136792,
        15855350
    ];
    exports.PuRd6 = [
        9961539,
        14490743,
        14640560,
        13210823,
        13941210,
        15855350
    ];
    exports.PuRd7 = [
        9502783,
        13505110,
        15149450,
        14640560,
        13210823,
        13941210,
        15855350
    ];
    exports.PuRd8 = [
        9502783,
        13505110,
        15149450,
        14640560,
        13210823,
        13941210,
        15196655,
        16250105
    ];
    exports.PuRd9 = [
        6750239,
        9961539,
        13505110,
        15149450,
        14640560,
        13210823,
        13941210,
        15196655,
        16250105
    ];
    exports.OrRd3 = [
        14895667,
        16628612,
        16705736
    ];
    exports.OrRd4 = [
        14102559,
        16551257,
        16632970,
        16707801
    ];
    exports.OrRd5 = [
        11730944,
        14895667,
        16551257,
        16632970,
        16707801
    ];
    exports.OrRd6 = [
        11730944,
        14895667,
        16551257,
        16628612,
        16635038,
        16707801
    ];
    exports.OrRd7 = [
        10027008,
        14102559,
        15689032,
        16551257,
        16628612,
        16635038,
        16707801
    ];
    exports.OrRd8 = [
        10027008,
        14102559,
        15689032,
        16551257,
        16628612,
        16635038,
        16705736,
        16775148
    ];
    exports.OrRd9 = [
        8323072,
        11730944,
        14102559,
        15689032,
        16551257,
        16628612,
        16635038,
        16705736,
        16775148
    ];
    exports.YlOrRd3 = [
        15743776,
        16691788,
        16772512
    ];
    exports.YlOrRd4 = [
        14883356,
        16616764,
        16698460,
        16777138
    ];
    exports.YlOrRd5 = [
        12386342,
        15743776,
        16616764,
        16698460,
        16777138
    ];
    exports.YlOrRd6 = [
        12386342,
        15743776,
        16616764,
        16691788,
        16701814,
        16777138
    ];
    exports.YlOrRd7 = [
        11599910,
        14883356,
        16535082,
        16616764,
        16691788,
        16701814,
        16777138
    ];
    exports.YlOrRd8 = [
        11599910,
        14883356,
        16535082,
        16616764,
        16691788,
        16701814,
        16772512,
        16777164
    ];
    exports.YlOrRd9 = [
        8388646,
        12386342,
        14883356,
        16535082,
        16616764,
        16691788,
        16701814,
        16772512,
        16777164
    ];
    exports.YlOrBr3 = [
        14245646,
        16696399,
        16775100
    ];
    exports.YlOrBr4 = [
        13388802,
        16685353,
        16701838,
        16777172
    ];
    exports.YlOrBr5 = [
        10040324,
        14245646,
        16685353,
        16701838,
        16777172
    ];
    exports.YlOrBr6 = [
        10040324,
        14245646,
        16685353,
        16696399,
        16704401,
        16777172
    ];
    exports.YlOrBr7 = [
        9186564,
        13388802,
        15495188,
        16685353,
        16696399,
        16704401,
        16777172
    ];
    exports.YlOrBr8 = [
        9186564,
        13388802,
        15495188,
        16685353,
        16696399,
        16704401,
        16775100,
        16777189
    ];
    exports.YlOrBr9 = [
        6694150,
        10040324,
        13388802,
        15495188,
        16685353,
        16696399,
        16704401,
        16775100,
        16777189
    ];
    exports.Purples3 = [
        7695281,
        12369372,
        15724021
    ];
    exports.Purples4 = [
        6967715,
        10394312,
        13355490,
        15921399
    ];
    exports.Purples5 = [
        5515151,
        7695281,
        10394312,
        13355490,
        15921399
    ];
    exports.Purples6 = [
        5515151,
        7695281,
        10394312,
        12369372,
        14342891,
        15921399
    ];
    exports.Purples7 = [
        4854918,
        6967715,
        8420794,
        10394312,
        12369372,
        14342891,
        15921399
    ];
    exports.Purples8 = [
        4854918,
        6967715,
        8420794,
        10394312,
        12369372,
        14342891,
        15724021,
        16579581
    ];
    exports.Purples9 = [
        4128893,
        5515151,
        6967715,
        8420794,
        10394312,
        12369372,
        14342891,
        15724021,
        16579581
    ];
    exports.Blues3 = [
        3244733,
        10406625,
        14609399
    ];
    exports.Blues4 = [
        2191797,
        7057110,
        12441575,
        15725567
    ];
    exports.Blues5 = [
        545180,
        3244733,
        7057110,
        12441575,
        15725567
    ];
    exports.Blues6 = [
        545180,
        3244733,
        7057110,
        10406625,
        13032431,
        15725567
    ];
    exports.Blues7 = [
        542100,
        2191797,
        4362950,
        7057110,
        10406625,
        13032431,
        15725567
    ];
    exports.Blues8 = [
        542100,
        2191797,
        4362950,
        7057110,
        10406625,
        13032431,
        14609399,
        16251903
    ];
    exports.Blues9 = [
        536683,
        545180,
        2191797,
        4362950,
        7057110,
        10406625,
        13032431,
        14609399,
        16251903
    ];
    exports.Greens3 = [
        3253076,
        10607003,
        15070688
    ];
    exports.Greens4 = [
        2329413,
        7652470,
        12248243,
        15595753
    ];
    exports.Greens5 = [
        27948,
        3253076,
        7652470,
        12248243,
        15595753
    ];
    exports.Greens6 = [
        27948,
        3253076,
        7652470,
        10607003,
        13101504,
        15595753
    ];
    exports.Greens7 = [
        23090,
        2329413,
        4303709,
        7652470,
        10607003,
        13101504,
        15595753
    ];
    exports.Greens8 = [
        23090,
        2329413,
        4303709,
        7652470,
        10607003,
        13101504,
        15070688,
        16252149
    ];
    exports.Greens9 = [
        17435,
        27948,
        2329413,
        4303709,
        7652470,
        10607003,
        13101504,
        15070688,
        16252149
    ];
    exports.Oranges3 = [
        15095053,
        16625259,
        16705230
    ];
    exports.Oranges4 = [
        14239489,
        16616764,
        16629381,
        16707038
    ];
    exports.Oranges5 = [
        10892803,
        15095053,
        16616764,
        16629381,
        16707038
    ];
    exports.Oranges6 = [
        10892803,
        15095053,
        16616764,
        16625259,
        16634018,
        16707038
    ];
    exports.Oranges7 = [
        9186564,
        14239745,
        15821075,
        16616764,
        16625259,
        16634018,
        16707038
    ];
    exports.Oranges8 = [
        9186564,
        14239745,
        15821075,
        16616764,
        16625259,
        16634018,
        16705230,
        16774635
    ];
    exports.Oranges9 = [
        8333060,
        10892803,
        14239745,
        15821075,
        16616764,
        16625259,
        16634018,
        16705230,
        16774635
    ];
    exports.Reds3 = [
        14560550,
        16552562,
        16703698
    ];
    exports.Reds4 = [
        13309981,
        16476746,
        16559761,
        16704985
    ];
    exports.Reds5 = [
        10817301,
        14560550,
        16476746,
        16559761,
        16704985
    ];
    exports.Reds6 = [
        10817301,
        14560550,
        16476746,
        16552562,
        16563105,
        16704985
    ];
    exports.Reds7 = [
        10027021,
        13309981,
        15678252,
        16476746,
        16552562,
        16563105,
        16704985
    ];
    exports.Reds8 = [
        10027021,
        13309981,
        15678252,
        16476746,
        16552562,
        16563105,
        16703698,
        16774640
    ];
    exports.Reds9 = [
        6750221,
        10817301,
        13309981,
        15678252,
        16476746,
        16552562,
        16563105,
        16703698,
        16774640
    ];
    exports.Greys3 = [
        6513507,
        12434877,
        15790320
    ];
    exports.Greys4 = [
        5395026,
        9868950,
        13421772,
        16250871
    ];
    exports.Greys5 = [
        2434341,
        6513507,
        9868950,
        13421772,
        16250871
    ];
    exports.Greys6 = [
        2434341,
        6513507,
        9868950,
        12434877,
        14277081,
        16250871
    ];
    exports.Greys7 = [
        2434341,
        5395026,
        7566195,
        9868950,
        12434877,
        14277081,
        16250871
    ];
    exports.Greys8 = [
        2434341,
        5395026,
        7566195,
        9868950,
        12434877,
        14277081,
        15790320,
        16777215
    ];
    exports.Greys9 = [
        0,
        2434341,
        5395026,
        7566195,
        9868950,
        12434877,
        14277081,
        15790320,
        16777215
    ];
    exports.Greys10 = [
        0,
        1842204,
        3684408,
        5592405,
        7434609,
        9276813,
        11184810,
        13027014,
        14869218,
        16777215
    ];
    exports.Greys11 = [
        0,
        1644825,
        3355443,
        5000268,
        6710886,
        8355711,
        10066329,
        11711154,
        13421772,
        15066597,
        16777215
    ];
    exports.Greys256 = [
        0,
        65793,
        131586,
        197379,
        263172,
        328965,
        394758,
        460551,
        526344,
        592137,
        657930,
        723723,
        789516,
        855309,
        921102,
        986895,
        1052688,
        1118481,
        1184274,
        1250067,
        1315860,
        1381653,
        1447446,
        1513239,
        1579032,
        1644825,
        1710618,
        1776411,
        1842204,
        1907997,
        1973790,
        2039583,
        2105376,
        2171169,
        2236962,
        2302755,
        2368548,
        2434341,
        2500134,
        2565927,
        2631720,
        2697513,
        2763306,
        2829099,
        2894892,
        2960685,
        3026478,
        3092271,
        3158064,
        3223857,
        3289650,
        3355443,
        3421236,
        3487029,
        3552822,
        3618615,
        3684408,
        3750201,
        3815994,
        3881787,
        3947580,
        4013373,
        4079166,
        4144959,
        4210752,
        4276545,
        4342338,
        4408131,
        4473924,
        4539717,
        4605510,
        4671303,
        4737096,
        4802889,
        4868682,
        4934475,
        5000268,
        5066061,
        5131854,
        5197647,
        5263440,
        5329233,
        5395026,
        5460819,
        5526612,
        5592405,
        5658198,
        5723991,
        5789784,
        5855577,
        5921370,
        5987163,
        6052956,
        6118749,
        6184542,
        6250335,
        6316128,
        6381921,
        6447714,
        6513507,
        6579300,
        6645093,
        6710886,
        6776679,
        6842472,
        6908265,
        6974058,
        7039851,
        7105644,
        7171437,
        7237230,
        7303023,
        7368816,
        7434609,
        7500402,
        7566195,
        7631988,
        7697781,
        7763574,
        7829367,
        7895160,
        7960953,
        8026746,
        8092539,
        8158332,
        8224125,
        8289918,
        8355711,
        8421504,
        8487297,
        8553090,
        8618883,
        8684676,
        8750469,
        8816262,
        8882055,
        8947848,
        9013641,
        9079434,
        9145227,
        9211020,
        9276813,
        9342606,
        9408399,
        9474192,
        9539985,
        9605778,
        9671571,
        9737364,
        9803157,
        9868950,
        9934743,
        10000536,
        10066329,
        10132122,
        10197915,
        10263708,
        10329501,
        10395294,
        10461087,
        10526880,
        10592673,
        10658466,
        10724259,
        10790052,
        10855845,
        10921638,
        10987431,
        11053224,
        11119017,
        11184810,
        11250603,
        11316396,
        11382189,
        11447982,
        11513775,
        11579568,
        11645361,
        11711154,
        11776947,
        11842740,
        11908533,
        11974326,
        12040119,
        12105912,
        12171705,
        12237498,
        12303291,
        12369084,
        12434877,
        12500670,
        12566463,
        12632256,
        12698049,
        12763842,
        12829635,
        12895428,
        12961221,
        13027014,
        13092807,
        13158600,
        13224393,
        13290186,
        13355979,
        13421772,
        13487565,
        13553358,
        13619151,
        13684944,
        13750737,
        13816530,
        13882323,
        13948116,
        14013909,
        14079702,
        14145495,
        14211288,
        14277081,
        14342874,
        14408667,
        14474460,
        14540253,
        14606046,
        14671839,
        14737632,
        14803425,
        14869218,
        14935011,
        15000804,
        15066597,
        15132390,
        15198183,
        15263976,
        15329769,
        15395562,
        15461355,
        15527148,
        15592941,
        15658734,
        15724527,
        15790320,
        15856113,
        15921906,
        15987699,
        16053492,
        16119285,
        16185078,
        16250871,
        16316664,
        16382457,
        16448250,
        16514043,
        16579836,
        16645629,
        16711422,
        16777215
    ];
    exports.PuOr3 = [
        10063555,
        16250871,
        15835968
    ];
    exports.PuOr4 = [
        6175897,
        11709394,
        16627811,
        15098113
    ];
    exports.PuOr5 = [
        6175897,
        11709394,
        16250871,
        16627811,
        15098113
    ];
    exports.PuOr6 = [
        5515144,
        10063555,
        14211819,
        16703670,
        15835968,
        11753478
    ];
    exports.PuOr7 = [
        5515144,
        10063555,
        14211819,
        16250871,
        16703670,
        15835968,
        11753478
    ];
    exports.PuOr8 = [
        5515144,
        8418220,
        11709394,
        14211819,
        16703670,
        16627811,
        14713364,
        11753478
    ];
    exports.PuOr9 = [
        5515144,
        8418220,
        11709394,
        14211819,
        16250871,
        16703670,
        16627811,
        14713364,
        11753478
    ];
    exports.PuOr10 = [
        2949195,
        5515144,
        8418220,
        11709394,
        14211819,
        16703670,
        16627811,
        14713364,
        11753478,
        8338184
    ];
    exports.PuOr11 = [
        2949195,
        5515144,
        8418220,
        11709394,
        14211819,
        16250871,
        16703670,
        16627811,
        14713364,
        11753478,
        8338184
    ];
    exports.BrBG3 = [
        5944492,
        16119285,
        14201701
    ];
    exports.BrBG4 = [
        99697,
        8441281,
        14664317,
        10903834
    ];
    exports.BrBG5 = [
        99697,
        8441281,
        16119285,
        14664317,
        10903834
    ];
    exports.BrBG6 = [
        91742,
        5944492,
        13101797,
        16181443,
        14201701,
        9195786
    ];
    exports.BrBG7 = [
        91742,
        5944492,
        13101797,
        16119285,
        16181443,
        14201701,
        9195786
    ];
    exports.BrBG8 = [
        91742,
        3512207,
        8441281,
        13101797,
        16181443,
        14664317,
        12550445,
        9195786
    ];
    exports.BrBG9 = [
        91742,
        3512207,
        8441281,
        13101797,
        16119285,
        16181443,
        14664317,
        12550445,
        9195786
    ];
    exports.BrBG10 = [
        15408,
        91742,
        3512207,
        8441281,
        13101797,
        16181443,
        14664317,
        12550445,
        9195786,
        5517317
    ];
    exports.BrBG11 = [
        15408,
        91742,
        3512207,
        8441281,
        13101797,
        16119285,
        16181443,
        14664317,
        12550445,
        9195786,
        5517317
    ];
    exports.PRGn3 = [
        8372091,
        16250871,
        11505091
    ];
    exports.PRGn4 = [
        34871,
        10935200,
        12756431,
        8073876
    ];
    exports.PRGn5 = [
        34871,
        10935200,
        16250871,
        12756431,
        8073876
    ];
    exports.PRGn6 = [
        1800247,
        8372091,
        14282963,
        15193320,
        11505091,
        7744131
    ];
    exports.PRGn7 = [
        1800247,
        8372091,
        14282963,
        16250871,
        15193320,
        11505091,
        7744131
    ];
    exports.PRGn8 = [
        1800247,
        5942881,
        10935200,
        14282963,
        15193320,
        12756431,
        10055851,
        7744131
    ];
    exports.PRGn9 = [
        1800247,
        5942881,
        10935200,
        14282963,
        16250871,
        15193320,
        12756431,
        10055851,
        7744131
    ];
    exports.PRGn10 = [
        17435,
        1800247,
        5942881,
        10935200,
        14282963,
        15193320,
        12756431,
        10055851,
        7744131,
        4194379
    ];
    exports.PRGn11 = [
        17435,
        1800247,
        5942881,
        10935200,
        14282963,
        16250871,
        15193320,
        12756431,
        10055851,
        7744131,
        4194379
    ];
    exports.PiYG3 = [
        10606442,
        16250871,
        15311817
    ];
    exports.PiYG4 = [
        5090342,
        12116358,
        15840986,
        13638795
    ];
    exports.PiYG5 = [
        5090342,
        12116358,
        16250871,
        15840986,
        13638795
    ];
    exports.PiYG6 = [
        5083681,
        10606442,
        15136208,
        16638191,
        15311817,
        12917629
    ];
    exports.PiYG7 = [
        5083681,
        10606442,
        15136208,
        16250871,
        16638191,
        15311817,
        12917629
    ];
    exports.PiYG8 = [
        5083681,
        8371265,
        12116358,
        15136208,
        16638191,
        15840986,
        14579630,
        12917629
    ];
    exports.PiYG9 = [
        5083681,
        8371265,
        12116358,
        15136208,
        16250871,
        16638191,
        15840986,
        14579630,
        12917629
    ];
    exports.PiYG10 = [
        2581529,
        5083681,
        8371265,
        12116358,
        15136208,
        16638191,
        15840986,
        14579630,
        12917629,
        9306450
    ];
    exports.PiYG11 = [
        2581529,
        5083681,
        8371265,
        12116358,
        15136208,
        16250871,
        16638191,
        15840986,
        14579630,
        12917629,
        9306450
    ];
    exports.RdBu3 = [
        6793679,
        16250871,
        15698530
    ];
    exports.RdBu4 = [
        356784,
        9618910,
        16033154,
        13238304
    ];
    exports.RdBu5 = [
        356784,
        9618910,
        16250871,
        16033154,
        13238304
    ];
    exports.RdBu6 = [
        2188972,
        6793679,
        13755888,
        16636871,
        15698530,
        11671595
    ];
    exports.RdBu7 = [
        2188972,
        6793679,
        13755888,
        16250871,
        16636871,
        15698530,
        11671595
    ];
    exports.RdBu8 = [
        2188972,
        4428739,
        9618910,
        13755888,
        16636871,
        16033154,
        14049357,
        11671595
    ];
    exports.RdBu9 = [
        2188972,
        4428739,
        9618910,
        13755888,
        16250871,
        16636871,
        16033154,
        14049357,
        11671595
    ];
    exports.RdBu10 = [
        340065,
        2188972,
        4428739,
        9618910,
        13755888,
        16636871,
        16033154,
        14049357,
        11671595,
        6750239
    ];
    exports.RdBu11 = [
        340065,
        2188972,
        4428739,
        9618910,
        13755888,
        16250871,
        16636871,
        16033154,
        14049357,
        11671595,
        6750239
    ];
    exports.RdGy3 = [
        10066329,
        16777215,
        15698530
    ];
    exports.RdGy4 = [
        4210752,
        12237498,
        16033154,
        13238304
    ];
    exports.RdGy5 = [
        4210752,
        12237498,
        16777215,
        16033154,
        13238304
    ];
    exports.RdGy6 = [
        5066061,
        10066329,
        14737632,
        16636871,
        15698530,
        11671595
    ];
    exports.RdGy7 = [
        5066061,
        10066329,
        14737632,
        16777215,
        16636871,
        15698530,
        11671595
    ];
    exports.RdGy8 = [
        5066061,
        8882055,
        12237498,
        14737632,
        16636871,
        16033154,
        14049357,
        11671595
    ];
    exports.RdGy9 = [
        5066061,
        8882055,
        12237498,
        14737632,
        16777215,
        16636871,
        16033154,
        14049357,
        11671595
    ];
    exports.RdGy10 = [
        1710618,
        5066061,
        8882055,
        12237498,
        14737632,
        16636871,
        16033154,
        14049357,
        11671595,
        6750239
    ];
    exports.RdGy11 = [
        1710618,
        5066061,
        8882055,
        12237498,
        14737632,
        16777215,
        16636871,
        16033154,
        14049357,
        11671595,
        6750239
    ];
    exports.RdYlBu3 = [
        9551835,
        16777151,
        16551257
    ];
    exports.RdYlBu4 = [
        2915254,
        11262441,
        16625249,
        14096668
    ];
    exports.RdYlBu5 = [
        2915254,
        11262441,
        16777151,
        16625249,
        14096668
    ];
    exports.RdYlBu6 = [
        4552116,
        9551835,
        14742520,
        16703632,
        16551257,
        14102567
    ];
    exports.RdYlBu7 = [
        4552116,
        9551835,
        14742520,
        16777151,
        16703632,
        16551257,
        14102567
    ];
    exports.RdYlBu8 = [
        4552116,
        7646673,
        11262441,
        14742520,
        16703632,
        16625249,
        16018755,
        14102567
    ];
    exports.RdYlBu9 = [
        4552116,
        7646673,
        11262441,
        14742520,
        16777151,
        16703632,
        16625249,
        16018755,
        14102567
    ];
    exports.RdYlBu10 = [
        3225237,
        4552116,
        7646673,
        11262441,
        14742520,
        16703632,
        16625249,
        16018755,
        14102567,
        10813478
    ];
    exports.RdYlBu11 = [
        3225237,
        4552116,
        7646673,
        11262441,
        14742520,
        16777151,
        16703632,
        16625249,
        16018755,
        14102567,
        10813478
    ];
    exports.Spectral3 = [
        10081684,
        16777151,
        16551257
    ];
    exports.Spectral4 = [
        2851770,
        11263396,
        16625249,
        14096668
    ];
    exports.Spectral5 = [
        2851770,
        11263396,
        16777151,
        16625249,
        14096668
    ];
    exports.Spectral6 = [
        3311805,
        10081684,
        15136152,
        16703627,
        16551257,
        13975119
    ];
    exports.Spectral7 = [
        3311805,
        10081684,
        15136152,
        16777151,
        16703627,
        16551257,
        13975119
    ];
    exports.Spectral8 = [
        3311805,
        6734501,
        11263396,
        15136152,
        16703627,
        16625249,
        16018755,
        13975119
    ];
    exports.Spectral9 = [
        3311805,
        6734501,
        11263396,
        15136152,
        16777151,
        16703627,
        16625249,
        16018755,
        13975119
    ];
    exports.Spectral10 = [
        6180770,
        3311805,
        6734501,
        11263396,
        15136152,
        16703627,
        16625249,
        16018755,
        13975119,
        10355010
    ];
    exports.Spectral11 = [
        6180770,
        3311805,
        6734501,
        11263396,
        15136152,
        16777151,
        16703627,
        16625249,
        16018755,
        13975119,
        10355010
    ];
    exports.RdYlGn3 = [
        9555808,
        16777151,
        16551257
    ];
    exports.RdYlGn4 = [
        1742401,
        10934634,
        16625249,
        14096668
    ];
    exports.RdYlGn5 = [
        1742401,
        10934634,
        16777151,
        16625249,
        14096668
    ];
    exports.RdYlGn6 = [
        1742928,
        9555808,
        14282635,
        16703627,
        16551257,
        14102567
    ];
    exports.RdYlGn7 = [
        1742928,
        9555808,
        14282635,
        16777151,
        16703627,
        16551257,
        14102567
    ];
    exports.RdYlGn8 = [
        1742928,
        6733155,
        10934634,
        14282635,
        16703627,
        16625249,
        16018755,
        14102567
    ];
    exports.RdYlGn9 = [
        1742928,
        6733155,
        10934634,
        14282635,
        16777151,
        16703627,
        16625249,
        16018755,
        14102567
    ];
    exports.RdYlGn10 = [
        26679,
        1742928,
        6733155,
        10934634,
        14282635,
        16703627,
        16625249,
        16018755,
        14102567,
        10813478
    ];
    exports.RdYlGn11 = [
        26679,
        1742928,
        6733155,
        10934634,
        14282635,
        16777151,
        16703627,
        16625249,
        16018755,
        14102567,
        10813478
    ];
    exports.Inferno3 = [
        4456788,
        2133900,
        16639780
    ];
    exports.Inferno4 = [
        3,
        7871597,
        15558693,
        16580260
    ];
    exports.Inferno5 = [
        3,
        5574509,
        12203605,
        16354313,
        16580260
    ];
    exports.Inferno6 = [
        3,
        4262247,
        9643367,
        14438457,
        16491530,
        16580260
    ];
    exports.Inferno7 = [
        3,
        3279197,
        7871597,
        12203605,
        15558693,
        16495384,
        16580260
    ];
    exports.Inferno8 = [
        3,
        2558802,
        6493294,
        10365283,
        13780802,
        16088085,
        16432933,
        16580260
    ];
    exports.Inferno9 = [
        3,
        2034759,
        5574509,
        8921450,
        12203605,
        14899250,
        16354313,
        16304433,
        16580260
    ];
    exports.Inferno10 = [
        3,
        1706816,
        4852586,
        7871597,
        10759264,
        13451847,
        15558693,
        16488710,
        16240442,
        16580260
    ];
    exports.Inferno11 = [
        3,
        1444665,
        4262247,
        6952814,
        9643367,
        12203605,
        14438457,
        15889690,
        16491530,
        16176450,
        16580260
    ];
    exports.Inferno256 = [
        3,
        4,
        6,
        65543,
        65801,
        65803,
        131342,
        131600,
        197138,
        262932,
        262934,
        328728,
        394267,
        460061,
        525855,
        591393,
        657187,
        722726,
        854056,
        919594,
        985389,
        1050927,
        1182258,
        1247796,
        1313590,
        1444665,
        1510203,
        1641278,
        1706816,
        1838147,
        1903685,
        2034759,
        2100298,
        2231116,
        2362190,
        2493264,
        2558802,
        2689876,
        2820694,
        2951768,
        3017306,
        3148380,
        3279197,
        3410271,
        3475808,
        3606881,
        3737954,
        3869028,
        3934565,
        4065638,
        4196710,
        4262247,
        4393576,
        4524649,
        4590185,
        4721514,
        4852586,
        4918379,
        5049451,
        5180780,
        5246316,
        5377644,
        5443181,
        5574509,
        5705581,
        5771373,
        5902701,
        5968238,
        6099566,
        6230638,
        6296430,
        6427758,
        6493294,
        6624622,
        6690158,
        6821486,
        6952814,
        7018350,
        7149678,
        7215214,
        7346542,
        7477613,
        7543405,
        7674733,
        7740269,
        7871597,
        8002669,
        8068460,
        8199532,
        8265324,
        8396651,
        8462187,
        8593515,
        8724586,
        8790378,
        8921450,
        8987241,
        9118313,
        9249641,
        9315432,
        9446504,
        9512295,
        9643367,
        9774694,
        9840230,
        9971557,
        10037348,
        10168420,
        10234211,
        10365283,
        10496610,
        10562401,
        10693473,
        10759264,
        10890335,
        10956127,
        11087454,
        11218525,
        11284316,
        11415643,
        11481435,
        11612506,
        11678297,
        11809624,
        11875159,
        12006486,
        12072278,
        12203605,
        12269396,
        12400467,
        12466258,
        12532049,
        12663376,
        12729167,
        12860494,
        12926285,
        13057612,
        13123147,
        13188938,
        13320265,
        13386056,
        13451847,
        13583430,
        13649220,
        13715011,
        13780802,
        13912129,
        13977920,
        14043711,
        14109502,
        14241085,
        14306875,
        14372666,
        14438457,
        14504504,
        14570295,
        14636086,
        14702132,
        14833459,
        14899250,
        14965297,
        15031088,
        15096878,
        15097389,
        15163180,
        15229227,
        15295018,
        15361064,
        15426855,
        15492902,
        15558693,
        15559203,
        15625250,
        15691041,
        15757087,
        15757342,
        15823389,
        15889436,
        15889690,
        15955737,
        15956248,
        16022038,
        16088085,
        16088596,
        16154642,
        16154897,
        16220944,
        16221454,
        16287501,
        16287756,
        16288267,
        16354313,
        16354824,
        16355336,
        16421127,
        16421638,
        16422150,
        16422662,
        16488710,
        16489222,
        16489734,
        16489991,
        16490503,
        16491016,
        16491530,
        16492043,
        16492557,
        16493070,
        16493584,
        16494098,
        16494612,
        16494870,
        16495384,
        16495898,
        16496412,
        16496926,
        16431905,
        16432419,
        16432933,
        16433448,
        16368426,
        16368940,
        16369455,
        16304433,
        16304948,
        16305463,
        16240442,
        16240956,
        16175935,
        16176450,
        16111429,
        16111944,
        16046923,
        16047183,
        15982162,
        15982678,
        15983193,
        15918173,
        15918688,
        15853668,
        15853928,
        15854444,
        15854960,
        15855220,
        15855737,
        15856253,
        15922049,
        15922309,
        15988361,
        16054157,
        16119953,
        16186005,
        16251801,
        16383133,
        16448928,
        16580260
    ];
    exports.Magma3 = [
        3,
        11875961,
        16514239
    ];
    exports.Magma4 = [
        3,
        7413633,
        15753309,
        16514239
    ];
    exports.Magma5 = [
        3,
        5181819,
        11875961,
        16483936,
        16514239
    ];
    exports.Magma6 = [
        3,
        3870575,
        9185664,
        14502248,
        16621420,
        16514239
    ];
    exports.Magma7 = [
        3,
        2822494,
        7413633,
        11875961,
        15753309,
        16690806,
        16514239
    ];
    exports.Magma8 = [
        3,
        2232656,
        6100862,
        9907327,
        13714030,
        16282972,
        16693631,
        16514239
    ];
    exports.Magma9 = [
        3,
        1773636,
        5181819,
        8463745,
        11875961,
        15028323,
        16483936,
        16695942,
        16514239
    ];
    exports.Magma10 = [
        3,
        1511228,
        4394869,
        7413633,
        10366590,
        13319793,
        15753309,
        16552806,
        16697227,
        16514239
    ];
    exports.Magma11 = [
        3,
        1314101,
        3870575,
        6494591,
        9185664,
        11875961,
        14502248,
        16150107,
        16621420,
        16633232,
        16514239
    ];
    exports.Magma256 = [
        3,
        4,
        6,
        65543,
        65801,
        65803,
        131597,
        131599,
        197393,
        262931,
        263189,
        328727,
        394521,
        460059,
        525853,
        591647,
        657186,
        722980,
        788774,
        854568,
        920106,
        985900,
        1051695,
        1117233,
        1183027,
        1314101,
        1379896,
        1445434,
        1511228,
        1576767,
        1708097,
        1773636,
        1839174,
        1970249,
        2036043,
        2101581,
        2232656,
        2298194,
        2429269,
        2494807,
        2625881,
        2756956,
        2822494,
        2953312,
        3084386,
        3149925,
        3280999,
        3412072,
        3477354,
        3608428,
        3739502,
        3870575,
        3936113,
        4067186,
        4198259,
        4329332,
        4394869,
        4525942,
        4657015,
        4722808,
        4853881,
        4919417,
        5050746,
        5181819,
        5247611,
        5378684,
        5444476,
        5575549,
        5706877,
        5772670,
        5903742,
        5969534,
        6100862,
        6166399,
        6297727,
        6363263,
        6494591,
        6625920,
        6691456,
        6822784,
        6888576,
        7019648,
        7085440,
        7216769,
        7282305,
        7413633,
        7544705,
        7610497,
        7741825,
        7807361,
        7938689,
        8004225,
        8135553,
        8266881,
        8332417,
        8463745,
        8529281,
        8660609,
        8726145,
        8857473,
        8988801,
        9054337,
        9185664,
        9251200,
        9382528,
        9513600,
        9579392,
        9710464,
        9776256,
        9907327,
        10038655,
        10104191,
        10235519,
        10366590,
        10432382,
        10563454,
        10694782,
        10760317,
        10891645,
        10957181,
        11088508,
        11219836,
        11285371,
        11416699,
        11547771,
        11613562,
        11744634,
        11875961,
        11941497,
        12072824,
        12138360,
        12269687,
        12401015,
        12466550,
        12597877,
        12728949,
        12794740,
        12926068,
        12991603,
        13122930,
        13254258,
        13319793,
        13451120,
        13516912,
        13648239,
        13714030,
        13845101,
        13910893,
        14042220,
        14108011,
        14239338,
        14305129,
        14436457,
        14502248,
        14568039,
        14699366,
        14765158,
        14830949,
        14962276,
        15028323,
        15094114,
        15159906,
        15225953,
        15357280,
        15423072,
        15489119,
        15554911,
        15620958,
        15621469,
        15687261,
        15753309,
        15819100,
        15885148,
        15951196,
        15951707,
        16017499,
        16083547,
        16084059,
        16150107,
        16150619,
        16216411,
        16216924,
        16282972,
        16283484,
        16349532,
        16350045,
        16350557,
        16416606,
        16416862,
        16417375,
        16483424,
        16483936,
        16484449,
        16484962,
        16551011,
        16551523,
        16552036,
        16552549,
        16552806,
        16618855,
        16619368,
        16619881,
        16620394,
        16620907,
        16621420,
        16621934,
        16622191,
        16622704,
        16688753,
        16689267,
        16689780,
        16690293,
        16690806,
        16691064,
        16691577,
        16692091,
        16692604,
        16693117,
        16693631,
        16694144,
        16694402,
        16694915,
        16695429,
        16695942,
        16696456,
        16696969,
        16697227,
        16697741,
        16698254,
        16633232,
        16633746,
        16634259,
        16634517,
        16635031,
        16635544,
        16636058,
        16636572,
        16637085,
        16637343,
        16637857,
        16638371,
        16573349,
        16573862,
        16574120,
        16574634,
        16575148,
        16575662,
        16576176,
        16576689,
        16576947,
        16577461,
        16577975,
        16512953,
        16513467,
        16513725,
        16514239
    ];
    exports.Plasma3 = [
        788358,
        13256312,
        15726625
    ];
    exports.Plasma4 = [
        788358,
        10164126,
        15497299,
        15726625
    ];
    exports.Plasma5 = [
        788358,
        8127143,
        13256312,
        16225089,
        15726625
    ];
    exports.Plasma6 = [
        788358,
        6946983,
        11545231,
        14705761,
        16557621,
        15726625
    ];
    exports.Plasma7 = [
        788358,
        6029477,
        10164126,
        13256312,
        15497299,
        16626223,
        15726625
    ];
    exports.Plasma8 = [
        788358,
        5374371,
        8980645,
        12071561,
        14309992,
        15959880,
        16628523,
        15726625
    ];
    exports.Plasma9 = [
        788358,
        4850336,
        8127143,
        11018902,
        13256312,
        15035228,
        16225089,
        16630568,
        15726625
    ];
    exports.Plasma10 = [
        788358,
        4522910,
        7471272,
        10164126,
        12334725,
        14112364,
        15497299,
        16424250,
        16566054,
        15726625
    ];
    exports.Plasma11 = [
        788358,
        4195228,
        6946983,
        9375139,
        11545231,
        13256312,
        14705761,
        15827532,
        16557621,
        16567333,
        15726625
    ];
    exports.Plasma256 = [
        788358,
        1050503,
        1246857,
        1377930,
        1574539,
        1771148,
        1902221,
        2033038,
        2164111,
        2295184,
        2426257,
        2557330,
        2688403,
        2819476,
        2950292,
        3081365,
        3212438,
        3343511,
        3409048,
        3540120,
        3671193,
        3802266,
        3867546,
        3998619,
        4129692,
        4195228,
        4326301,
        4457374,
        4522910,
        4653727,
        4784799,
        4850336,
        4981409,
        5112481,
        5178018,
        5308834,
        5374371,
        5505443,
        5636515,
        5702052,
        5833124,
        5898405,
        6029477,
        6160549,
        6226086,
        6357158,
        6422694,
        6553767,
        6619303,
        6750375,
        6815911,
        6946983,
        7078056,
        7143592,
        7274664,
        7340200,
        7471272,
        7536808,
        7667880,
        7733672,
        7864744,
        7930280,
        8061608,
        8127143,
        8258471,
        8324007,
        8455335,
        8520871,
        8652198,
        8717990,
        8783782,
        8914853,
        8980645,
        9111972,
        9177764,
        9309348,
        9375139,
        9440931,
        9572258,
        9638049,
        9769377,
        9835168,
        9900960,
        10032287,
        10098078,
        10164126,
        10295453,
        10361244,
        10427035,
        10492827,
        10624154,
        10689945,
        10755736,
        10821527,
        10953111,
        11018902,
        11084693,
        11150484,
        11281811,
        11347602,
        11413393,
        11479184,
        11545231,
        11611023,
        11676814,
        11808141,
        11873932,
        11939723,
        12005514,
        12071561,
        12137352,
        12203143,
        12268934,
        12334725,
        12400516,
        12466307,
        12532098,
        12598145,
        12663936,
        12729728,
        12795519,
        12861310,
        12927101,
        12992892,
        13058683,
        13124730,
        13190521,
        13256312,
        13322103,
        13387894,
        13453685,
        13519477,
        13585268,
        13651315,
        13717106,
        13717361,
        13783152,
        13848943,
        13914734,
        13980525,
        14046573,
        14112364,
        14112619,
        14178410,
        14244201,
        14309992,
        14375783,
        14441830,
        14442086,
        14507877,
        14573668,
        14639459,
        14639714,
        14705761,
        14771552,
        14837344,
        14903135,
        14903390,
        14969437,
        15035228,
        15035483,
        15101274,
        15167066,
        15233113,
        15233368,
        15299159,
        15364950,
        15365205,
        15431252,
        15497044,
        15497299,
        15563090,
        15563601,
        15629392,
        15695183,
        15695438,
        15761485,
        15761741,
        15827532,
        15893579,
        15893834,
        15959625,
        15959880,
        16025927,
        16026183,
        16091974,
        16092485,
        16158276,
        16158531,
        16159042,
        16224833,
        16225089,
        16291136,
        16291391,
        16291902,
        16357693,
        16357948,
        16423995,
        16424250,
        16424762,
        16425017,
        16491064,
        16491319,
        16491574,
        16557621,
        16557877,
        16558388,
        16558643,
        16559154,
        16559409,
        16625457,
        16625712,
        16626223,
        16626478,
        16626989,
        16627245,
        16627756,
        16628011,
        16628523,
        16628778,
        16629289,
        16629801,
        16630056,
        16630568,
        16630823,
        16631334,
        16566054,
        16566566,
        16567077,
        16567333,
        16567845,
        16502820,
        16503076,
        16503588,
        16438564,
        16438820,
        16439332,
        16374052,
        16374564,
        16309540,
        16310052,
        16244772,
        16245285,
        16180261,
        16180517,
        16115494,
        16116006,
        16050726,
        15985702,
        15986214,
        15921190,
        15921446,
        15856422,
        15791397,
        15791651,
        15726625
    ];
    exports.Viridis3 = [
        4456788,
        2133900,
        16639780
    ];
    exports.Viridis4 = [
        4456788,
        3172237,
        3520376,
        16639780
    ];
    exports.Viridis5 = [
        4456788,
        3887498,
        2133900,
        6015074,
        16639780
    ];
    exports.Viridis6 = [
        4456788,
        4211591,
        2717838,
        2271108,
        7983441,
        16639780
    ];
    exports.Viridis7 = [
        4456788,
        4471170,
        3172237,
        2133900,
        3520376,
        9295428,
        16639780
    ];
    exports.Viridis8 = [
        4456788,
        4600190,
        3562124,
        2588302,
        2007175,
        4833645,
        10344762,
        16639780
    ];
    exports.Viridis9 = [
        4456788,
        4664186,
        3887498,
        2912654,
        2133900,
        2600320,
        6015074,
        11197234,
        16639780
    ];
    exports.Viridis10 = [
        4456788,
        4663159,
        4082057,
        3172237,
        2458254,
        2006153,
        3520376,
        7064921,
        11722028,
        16639780
    ];
    exports.Viridis11 = [
        4456788,
        4727668,
        4211591,
        3432077,
        2717838,
        2133900,
        2271108,
        4374129,
        7983441,
        12246567,
        16639780
    ];
    exports.Viridis256 = [
        4456788,
        4457045,
        4457303,
        4523352,
        4523610,
        4524123,
        4589916,
        4590430,
        4590687,
        4591201,
        4656994,
        4657507,
        4657765,
        4658278,
        4658535,
        4658793,
        4659306,
        4725099,
        4725356,
        4725870,
        4726127,
        4726384,
        4726897,
        4727154,
        4727411,
        4727668,
        4662645,
        4662902,
        4663159,
        4663416,
        4663929,
        4664186,
        4664443,
        4599164,
        4599676,
        4599933,
        4600190,
        4534911,
        4535423,
        4535680,
        4535937,
        4470657,
        4471170,
        4405891,
        4406147,
        4406404,
        4341124,
        4341381,
        4341893,
        4276614,
        4276870,
        4211591,
        4211847,
        4146567,
        4147080,
        4081800,
        4082057,
        4016777,
        4017033,
        4017289,
        3952010,
        3952266,
        3887242,
        3887498,
        3822219,
        3822475,
        3757195,
        3757451,
        3692171,
        3692428,
        3627148,
        3627404,
        3562124,
        3562380,
        3497100,
        3497356,
        3432077,
        3432333,
        3367053,
        3367309,
        3302029,
        3302285,
        3237005,
        3237261,
        3237517,
        3172237,
        3172493,
        3107213,
        3107469,
        3042190,
        3042446,
        3042702,
        2977422,
        2977678,
        2912398,
        2912654,
        2912910,
        2847630,
        2847886,
        2782606,
        2782862,
        2783118,
        2717838,
        2718094,
        2652814,
        2652814,
        2653070,
        2587790,
        2588046,
        2588302,
        2523022,
        2523278,
        2523534,
        2458254,
        2458509,
        2393229,
        2393485,
        2393741,
        2328461,
        2328717,
        2328973,
        2263437,
        2263693,
        2263949,
        2198669,
        2198924,
        2199180,
        2133900,
        2134156,
        2134412,
        2069132,
        2069387,
        2069643,
        2069899,
        2070155,
        2004874,
        2005130,
        2005386,
        2005386,
        2005641,
        2005897,
        2006153,
        2006408,
        2006664,
        2006920,
        2007175,
        2072967,
        2073222,
        2073478,
        2139269,
        2139525,
        2205317,
        2205572,
        2271108,
        2336899,
        2337154,
        2402946,
        2468737,
        2534529,
        2600320,
        2666111,
        2731903,
        2797694,
        2863485,
        2929021,
        3060348,
        3126139,
        3191930,
        3323258,
        3389049,
        3520376,
        3586167,
        3717494,
        3783030,
        3914357,
        4045684,
        4111475,
        4242802,
        4374129,
        4505200,
        4570991,
        4702318,
        4833645,
        4964972,
        5096043,
        5227369,
        5358696,
        5490023,
        5621350,
        5752421,
        5883748,
        6015074,
        6211937,
        6343008,
        6474335,
        6605661,
        6802524,
        6933595,
        7064921,
        7196248,
        7392854,
        7524181,
        7655508,
        7852114,
        7983441,
        8180303,
        8311374,
        8508236,
        8639307,
        8836169,
        8967495,
        9164102,
        9295428,
        9492035,
        9623361,
        9819967,
        9951294,
        10147900,
        10344762,
        10475832,
        10672695,
        10869301,
        11000627,
        11197234,
        11394096,
        11525166,
        11722028,
        11918635,
        12049705,
        12246567,
        12443174,
        12574500,
        12771106,
        12967713,
        13099039,
        13295646,
        13492253,
        13623580,
        13820187,
        13951258,
        14148121,
        14344728,
        14475800,
        14672664,
        14803736,
        15000344,
        15197209,
        15328281,
        15524890,
        15656219,
        15852828,
        15983902,
        16180767,
        16311841,
        16442914,
        16639780
    ];
    exports.Accent3 = [
        8374655,
        12496596,
        16629894
    ];
    exports.Accent4 = [
        8374655,
        12496596,
        16629894,
        16777113
    ];
    exports.Accent5 = [
        8374655,
        12496596,
        16629894,
        16777113,
        3697840
    ];
    exports.Accent6 = [
        8374655,
        12496596,
        16629894,
        16777113,
        3697840,
        15729279
    ];
    exports.Accent7 = [
        8374655,
        12496596,
        16629894,
        16777113,
        3697840,
        15729279,
        12540695
    ];
    exports.Accent8 = [
        8374655,
        12496596,
        16629894,
        16777113,
        3697840,
        15729279,
        12540695,
        6710886
    ];
    exports.Dark2_3 = [
        1810039,
        14245634,
        7696563
    ];
    exports.Dark2_4 = [
        1810039,
        14245634,
        7696563,
        15149450
    ];
    exports.Dark2_5 = [
        1810039,
        14245634,
        7696563,
        15149450,
        6727198
    ];
    exports.Dark2_6 = [
        1810039,
        14245634,
        7696563,
        15149450,
        6727198,
        15117058
    ];
    exports.Dark2_7 = [
        1810039,
        14245634,
        7696563,
        15149450,
        6727198,
        15117058,
        10909213
    ];
    exports.Dark2_8 = [
        1810039,
        14245634,
        7696563,
        15149450,
        6727198,
        15117058,
        10909213,
        6710886
    ];
    exports.Paired3 = [
        10931939,
        2062516,
        11722634
    ];
    exports.Paired4 = [
        10931939,
        2062516,
        11722634,
        3383340
    ];
    exports.Paired5 = [
        10931939,
        2062516,
        11722634,
        3383340,
        16489113
    ];
    exports.Paired6 = [
        10931939,
        2062516,
        11722634,
        3383340,
        16489113,
        14883356
    ];
    exports.Paired7 = [
        10931939,
        2062516,
        11722634,
        3383340,
        16489113,
        14883356,
        16629615
    ];
    exports.Paired8 = [
        10931939,
        2062516,
        11722634,
        3383340,
        16489113,
        14883356,
        16629615,
        16744192
    ];
    exports.Paired9 = [
        10931939,
        2062516,
        11722634,
        3383340,
        16489113,
        14883356,
        16629615,
        16744192,
        13284054
    ];
    exports.Paired10 = [
        10931939,
        2062516,
        11722634,
        3383340,
        16489113,
        14883356,
        16629615,
        16744192,
        13284054,
        6962586
    ];
    exports.Paired11 = [
        10931939,
        2062516,
        11722634,
        3383340,
        16489113,
        14883356,
        16629615,
        16744192,
        13284054,
        6962586,
        16777113
    ];
    exports.Paired12 = [
        10931939,
        2062516,
        11722634,
        3383340,
        16489113,
        14883356,
        16629615,
        16744192,
        13284054,
        6962586,
        16777113,
        11622696
    ];
    exports.Pastel1_3 = [
        16495790,
        11783651,
        13429701
    ];
    exports.Pastel1_4 = [
        16495790,
        11783651,
        13429701,
        14601188
    ];
    exports.Pastel1_5 = [
        16495790,
        11783651,
        13429701,
        14601188,
        16701862
    ];
    exports.Pastel1_6 = [
        16495790,
        11783651,
        13429701,
        14601188,
        16701862,
        16777164
    ];
    exports.Pastel1_7 = [
        16495790,
        11783651,
        13429701,
        14601188,
        16701862,
        16777164,
        15063229
    ];
    exports.Pastel1_8 = [
        16495790,
        11783651,
        13429701,
        14601188,
        16701862,
        16777164,
        15063229,
        16636652
    ];
    exports.Pastel1_9 = [
        16495790,
        11783651,
        13429701,
        14601188,
        16701862,
        16777164,
        15063229,
        16636652,
        15921906
    ];
    exports.Pastel2_3 = [
        11789005,
        16633260,
        13358568
    ];
    exports.Pastel2_4 = [
        11789005,
        16633260,
        13358568,
        16042724
    ];
    exports.Pastel2_5 = [
        11789005,
        16633260,
        13358568,
        16042724,
        15136201
    ];
    exports.Pastel2_6 = [
        11789005,
        16633260,
        13358568,
        16042724,
        15136201,
        16773806
    ];
    exports.Pastel2_7 = [
        11789005,
        16633260,
        13358568,
        16042724,
        15136201,
        16773806,
        15852236
    ];
    exports.Pastel2_8 = [
        11789005,
        16633260,
        13358568,
        16042724,
        15136201,
        16773806,
        15852236,
        13421772
    ];
    exports.Set1_3 = [
        14948892,
        3636920,
        5091146
    ];
    exports.Set1_4 = [
        14948892,
        3636920,
        5091146,
        9981603
    ];
    exports.Set1_5 = [
        14948892,
        3636920,
        5091146,
        9981603,
        16744192
    ];
    exports.Set1_6 = [
        14948892,
        3636920,
        5091146,
        9981603,
        16744192,
        16777011
    ];
    exports.Set1_7 = [
        14948892,
        3636920,
        5091146,
        9981603,
        16744192,
        16777011,
        10901032
    ];
    exports.Set1_8 = [
        14948892,
        3636920,
        5091146,
        9981603,
        16744192,
        16777011,
        10901032,
        16220607
    ];
    exports.Set1_9 = [
        14948892,
        3636920,
        5091146,
        9981603,
        16744192,
        16777011,
        10901032,
        16220607,
        10066329
    ];
    exports.Set2_3 = [
        6734501,
        16551266,
        9281739
    ];
    exports.Set2_4 = [
        6734501,
        16551266,
        9281739,
        15174339
    ];
    exports.Set2_5 = [
        6734501,
        16551266,
        9281739,
        15174339,
        10934356
    ];
    exports.Set2_6 = [
        6734501,
        16551266,
        9281739,
        15174339,
        10934356,
        16767279
    ];
    exports.Set2_7 = [
        6734501,
        16551266,
        9281739,
        15174339,
        10934356,
        16767279,
        15058068
    ];
    exports.Set2_8 = [
        6734501,
        16551266,
        9281739,
        15174339,
        10934356,
        16767279,
        15058068,
        11776947
    ];
    exports.Set3_3 = [
        9294791,
        16777139,
        12499674
    ];
    exports.Set3_4 = [
        9294791,
        16777139,
        12499674,
        16482418
    ];
    exports.Set3_5 = [
        9294791,
        16777139,
        12499674,
        16482418,
        8434131
    ];
    exports.Set3_6 = [
        9294791,
        16777139,
        12499674,
        16482418,
        8434131,
        16626786
    ];
    exports.Set3_7 = [
        9294791,
        16777139,
        12499674,
        16482418,
        8434131,
        16626786,
        11787881
    ];
    exports.Set3_8 = [
        9294791,
        16777139,
        12499674,
        16482418,
        8434131,
        16626786,
        11787881,
        16567781
    ];
    exports.Set3_9 = [
        9294791,
        16777139,
        12499674,
        16482418,
        8434131,
        16626786,
        11787881,
        16567781,
        14277081
    ];
    exports.Set3_10 = [
        9294791,
        16777139,
        12499674,
        16482418,
        8434131,
        16626786,
        11787881,
        16567781,
        14277081,
        12353725
    ];
    exports.Set3_11 = [
        9294791,
        16777139,
        12499674,
        16482418,
        8434131,
        16626786,
        11787881,
        16567781,
        14277081,
        12353725,
        13429701
    ];
    exports.Set3_12 = [
        9294791,
        16777139,
        12499674,
        16482418,
        8434131,
        16626786,
        11787881,
        16567781,
        14277081,
        12353725,
        13429701,
        16772463
    ];
    exports.Category10_3 = [
        2062260,
        16744206,
        2924588
    ];
    exports.Category10_4 = [
        2062260,
        16744206,
        2924588,
        14034728
    ];
    exports.Category10_5 = [
        2062260,
        16744206,
        2924588,
        14034728,
        9725885
    ];
    exports.Category10_6 = [
        2062260,
        16744206,
        2924588,
        14034728,
        9725885,
        9197131
    ];
    exports.Category10_7 = [
        2062260,
        16744206,
        2924588,
        14034728,
        9725885,
        9197131,
        14907330
    ];
    exports.Category10_8 = [
        2062260,
        16744206,
        2924588,
        14034728,
        9725885,
        9197131,
        14907330,
        8355711
    ];
    exports.Category10_9 = [
        2062260,
        16744206,
        2924588,
        14034728,
        9725885,
        9197131,
        14907330,
        8355711,
        12369186
    ];
    exports.Category10_10 = [
        2062260,
        16744206,
        2924588,
        14034728,
        9725885,
        9197131,
        14907330,
        8355711,
        12369186,
        1556175
    ];
    exports.Category20_3 = [
        2062260,
        11454440,
        16744206
    ];
    exports.Category20_4 = [
        2062260,
        11454440,
        16744206,
        16759672
    ];
    exports.Category20_5 = [
        2062260,
        11454440,
        16744206,
        16759672,
        2924588
    ];
    exports.Category20_6 = [
        2062260,
        11454440,
        16744206,
        16759672,
        2924588,
        10018698
    ];
    exports.Category20_7 = [
        2062260,
        11454440,
        16744206,
        16759672,
        2924588,
        10018698,
        14034728
    ];
    exports.Category20_8 = [
        2062260,
        11454440,
        16744206,
        16759672,
        2924588,
        10018698,
        14034728,
        16750742
    ];
    exports.Category20_9 = [
        2062260,
        11454440,
        16744206,
        16759672,
        2924588,
        10018698,
        14034728,
        16750742,
        9725885
    ];
    exports.Category20_10 = [
        2062260,
        11454440,
        16744206,
        16759672,
        2924588,
        10018698,
        14034728,
        16750742,
        9725885,
        12955861
    ];
    exports.Category20_11 = [
        2062260,
        11454440,
        16744206,
        16759672,
        2924588,
        10018698,
        14034728,
        16750742,
        9725885,
        12955861,
        9197131
    ];
    exports.Category20_12 = [
        2062260,
        11454440,
        16744206,
        16759672,
        2924588,
        10018698,
        14034728,
        16750742,
        9725885,
        12955861,
        9197131,
        12885140
    ];
    exports.Category20_13 = [
        2062260,
        11454440,
        16744206,
        16759672,
        2924588,
        10018698,
        14034728,
        16750742,
        9725885,
        12955861,
        9197131,
        12885140,
        14907330
    ];
    exports.Category20_14 = [
        2062260,
        11454440,
        16744206,
        16759672,
        2924588,
        10018698,
        14034728,
        16750742,
        9725885,
        12955861,
        9197131,
        12885140,
        14907330,
        16234194
    ];
    exports.Category20_15 = [
        2062260,
        11454440,
        16744206,
        16759672,
        2924588,
        10018698,
        14034728,
        16750742,
        9725885,
        12955861,
        9197131,
        12885140,
        14907330,
        16234194,
        8355711
    ];
    exports.Category20_16 = [
        2062260,
        11454440,
        16744206,
        16759672,
        2924588,
        10018698,
        14034728,
        16750742,
        9725885,
        12955861,
        9197131,
        12885140,
        14907330,
        16234194,
        8355711,
        13092807
    ];
    exports.Category20_17 = [
        2062260,
        11454440,
        16744206,
        16759672,
        2924588,
        10018698,
        14034728,
        16750742,
        9725885,
        12955861,
        9197131,
        12885140,
        14907330,
        16234194,
        8355711,
        13092807,
        12369186
    ];
    exports.Category20_18 = [
        2062260,
        11454440,
        16744206,
        16759672,
        2924588,
        10018698,
        14034728,
        16750742,
        9725885,
        12955861,
        9197131,
        12885140,
        14907330,
        16234194,
        8355711,
        13092807,
        12369186,
        14408589
    ];
    exports.Category20_19 = [
        2062260,
        11454440,
        16744206,
        16759672,
        2924588,
        10018698,
        14034728,
        16750742,
        9725885,
        12955861,
        9197131,
        12885140,
        14907330,
        16234194,
        8355711,
        13092807,
        12369186,
        14408589,
        1556175
    ];
    exports.Category20_20 = [
        2062260,
        11454440,
        16744206,
        16759672,
        2924588,
        10018698,
        14034728,
        16750742,
        9725885,
        12955861,
        9197131,
        12885140,
        14907330,
        16234194,
        8355711,
        13092807,
        12369186,
        14408589,
        1556175,
        10410725
    ];
    exports.Category20b_3 = [
        3750777,
        5395619,
        7040719
    ];
    exports.Category20b_4 = [
        3750777,
        5395619,
        7040719,
        10264286
    ];
    exports.Category20b_5 = [
        3750777,
        5395619,
        7040719,
        10264286,
        6519097
    ];
    exports.Category20b_6 = [
        3750777,
        5395619,
        7040719,
        10264286,
        6519097,
        9216594
    ];
    exports.Category20b_7 = [
        3750777,
        5395619,
        7040719,
        10264286,
        6519097,
        9216594,
        11915115
    ];
    exports.Category20b_8 = [
        3750777,
        5395619,
        7040719,
        10264286,
        6519097,
        9216594,
        11915115,
        13556636
    ];
    exports.Category20b_9 = [
        3750777,
        5395619,
        7040719,
        10264286,
        6519097,
        9216594,
        11915115,
        13556636,
        9202993
    ];
    exports.Category20b_10 = [
        3750777,
        5395619,
        7040719,
        10264286,
        6519097,
        9216594,
        11915115,
        13556636,
        9202993,
        12426809
    ];
    exports.Category20b_11 = [
        3750777,
        5395619,
        7040719,
        10264286,
        6519097,
        9216594,
        11915115,
        13556636,
        9202993,
        12426809,
        15186514
    ];
    exports.Category20b_12 = [
        3750777,
        5395619,
        7040719,
        10264286,
        6519097,
        9216594,
        11915115,
        13556636,
        9202993,
        12426809,
        15186514,
        15190932
    ];
    exports.Category20b_13 = [
        3750777,
        5395619,
        7040719,
        10264286,
        6519097,
        9216594,
        11915115,
        13556636,
        9202993,
        12426809,
        15186514,
        15190932,
        8666169
    ];
    exports.Category20b_14 = [
        3750777,
        5395619,
        7040719,
        10264286,
        6519097,
        9216594,
        11915115,
        13556636,
        9202993,
        12426809,
        15186514,
        15190932,
        8666169,
        11356490
    ];
    exports.Category20b_15 = [
        3750777,
        5395619,
        7040719,
        10264286,
        6519097,
        9216594,
        11915115,
        13556636,
        9202993,
        12426809,
        15186514,
        15190932,
        8666169,
        11356490,
        14049643
    ];
    exports.Category20b_16 = [
        3750777,
        5395619,
        7040719,
        10264286,
        6519097,
        9216594,
        11915115,
        13556636,
        9202993,
        12426809,
        15186514,
        15190932,
        8666169,
        11356490,
        14049643,
        15177372
    ];
    exports.Category20b_17 = [
        3750777,
        5395619,
        7040719,
        10264286,
        6519097,
        9216594,
        11915115,
        13556636,
        9202993,
        12426809,
        15186514,
        15190932,
        8666169,
        11356490,
        14049643,
        15177372,
        8077683
    ];
    exports.Category20b_18 = [
        3750777,
        5395619,
        7040719,
        10264286,
        6519097,
        9216594,
        11915115,
        13556636,
        9202993,
        12426809,
        15186514,
        15190932,
        8666169,
        11356490,
        14049643,
        15177372,
        8077683,
        10834324
    ];
    exports.Category20b_19 = [
        3750777,
        5395619,
        7040719,
        10264286,
        6519097,
        9216594,
        11915115,
        13556636,
        9202993,
        12426809,
        15186514,
        15190932,
        8666169,
        11356490,
        14049643,
        15177372,
        8077683,
        10834324,
        13528509
    ];
    exports.Category20b_20 = [
        3750777,
        5395619,
        7040719,
        10264286,
        6519097,
        9216594,
        11915115,
        13556636,
        9202993,
        12426809,
        15186514,
        15190932,
        8666169,
        11356490,
        14049643,
        15177372,
        8077683,
        10834324,
        13528509,
        14589654
    ];
    exports.Category20c_3 = [
        3244733,
        7057110,
        10406625
    ];
    exports.Category20c_4 = [
        3244733,
        7057110,
        10406625,
        13032431
    ];
    exports.Category20c_5 = [
        3244733,
        7057110,
        10406625,
        13032431,
        15095053
    ];
    exports.Category20c_6 = [
        3244733,
        7057110,
        10406625,
        13032431,
        15095053,
        16616764
    ];
    exports.Category20c_7 = [
        3244733,
        7057110,
        10406625,
        13032431,
        15095053,
        16616764,
        16625259
    ];
    exports.Category20c_8 = [
        3244733,
        7057110,
        10406625,
        13032431,
        15095053,
        16616764,
        16625259,
        16634018
    ];
    exports.Category20c_9 = [
        3244733,
        7057110,
        10406625,
        13032431,
        15095053,
        16616764,
        16625259,
        16634018,
        3253076
    ];
    exports.Category20c_10 = [
        3244733,
        7057110,
        10406625,
        13032431,
        15095053,
        16616764,
        16625259,
        16634018,
        3253076,
        7652470
    ];
    exports.Category20c_11 = [
        3244733,
        7057110,
        10406625,
        13032431,
        15095053,
        16616764,
        16625259,
        16634018,
        3253076,
        7652470,
        10607003
    ];
    exports.Category20c_12 = [
        3244733,
        7057110,
        10406625,
        13032431,
        15095053,
        16616764,
        16625259,
        16634018,
        3253076,
        7652470,
        10607003,
        13101504
    ];
    exports.Category20c_13 = [
        3244733,
        7057110,
        10406625,
        13032431,
        15095053,
        16616764,
        16625259,
        16634018,
        3253076,
        7652470,
        10607003,
        13101504,
        7695281
    ];
    exports.Category20c_14 = [
        3244733,
        7057110,
        10406625,
        13032431,
        15095053,
        16616764,
        16625259,
        16634018,
        3253076,
        7652470,
        10607003,
        13101504,
        7695281,
        10394312
    ];
    exports.Category20c_15 = [
        3244733,
        7057110,
        10406625,
        13032431,
        15095053,
        16616764,
        16625259,
        16634018,
        3253076,
        7652470,
        10607003,
        13101504,
        7695281,
        10394312,
        12369372
    ];
    exports.Category20c_16 = [
        3244733,
        7057110,
        10406625,
        13032431,
        15095053,
        16616764,
        16625259,
        16634018,
        3253076,
        7652470,
        10607003,
        13101504,
        7695281,
        10394312,
        12369372,
        14342891
    ];
    exports.Category20c_17 = [
        3244733,
        7057110,
        10406625,
        13032431,
        15095053,
        16616764,
        16625259,
        16634018,
        3253076,
        7652470,
        10607003,
        13101504,
        7695281,
        10394312,
        12369372,
        14342891,
        6513507
    ];
    exports.Category20c_18 = [
        3244733,
        7057110,
        10406625,
        13032431,
        15095053,
        16616764,
        16625259,
        16634018,
        3253076,
        7652470,
        10607003,
        13101504,
        7695281,
        10394312,
        12369372,
        14342891,
        6513507,
        9868950
    ];
    exports.Category20c_19 = [
        3244733,
        7057110,
        10406625,
        13032431,
        15095053,
        16616764,
        16625259,
        16634018,
        3253076,
        7652470,
        10607003,
        13101504,
        7695281,
        10394312,
        12369372,
        14342891,
        6513507,
        9868950,
        12434877
    ];
    exports.Category20c_20 = [
        3244733,
        7057110,
        10406625,
        13032431,
        15095053,
        16616764,
        16625259,
        16634018,
        3253076,
        7652470,
        10607003,
        13101504,
        7695281,
        10394312,
        12369372,
        14342891,
        6513507,
        9868950,
        12434877,
        14277081
    ];
    exports.Colorblind3 = [
        29362,
        15113984,
        15787074
    ];
    exports.Colorblind4 = [
        29362,
        15113984,
        15787074,
        40563
    ];
    exports.Colorblind5 = [
        29362,
        15113984,
        15787074,
        40563,
        5682409
    ];
    exports.Colorblind6 = [
        29362,
        15113984,
        15787074,
        40563,
        5682409,
        13983232
    ];
    exports.Colorblind7 = [
        29362,
        15113984,
        15787074,
        40563,
        5682409,
        13983232,
        13400487
    ];
    exports.Colorblind8 = [
        29362,
        15113984,
        15787074,
        40563,
        5682409,
        13983232,
        13400487,
        0
    ];
    exports.YlGn = {
        YlGn3: exports.YlGn3,
        YlGn4: exports.YlGn4,
        YlGn5: exports.YlGn5,
        YlGn6: exports.YlGn6,
        YlGn7: exports.YlGn7,
        YlGn8: exports.YlGn8,
        YlGn9: exports.YlGn9
    };
    exports.YlGnBu = {
        YlGnBu3: exports.YlGnBu3,
        YlGnBu4: exports.YlGnBu4,
        YlGnBu5: exports.YlGnBu5,
        YlGnBu6: exports.YlGnBu6,
        YlGnBu7: exports.YlGnBu7,
        YlGnBu8: exports.YlGnBu8,
        YlGnBu9: exports.YlGnBu9
    };
    exports.GnBu = {
        GnBu3: exports.GnBu3,
        GnBu4: exports.GnBu4,
        GnBu5: exports.GnBu5,
        GnBu6: exports.GnBu6,
        GnBu7: exports.GnBu7,
        GnBu8: exports.GnBu8,
        GnBu9: exports.GnBu9
    };
    exports.BuGn = {
        BuGn3: exports.BuGn3,
        BuGn4: exports.BuGn4,
        BuGn5: exports.BuGn5,
        BuGn6: exports.BuGn6,
        BuGn7: exports.BuGn7,
        BuGn8: exports.BuGn8,
        BuGn9: exports.BuGn9
    };
    exports.PuBuGn = {
        PuBuGn3: exports.PuBuGn3,
        PuBuGn4: exports.PuBuGn4,
        PuBuGn5: exports.PuBuGn5,
        PuBuGn6: exports.PuBuGn6,
        PuBuGn7: exports.PuBuGn7,
        PuBuGn8: exports.PuBuGn8,
        PuBuGn9: exports.PuBuGn9
    };
    exports.PuBu = {
        PuBu3: exports.PuBu3,
        PuBu4: exports.PuBu4,
        PuBu5: exports.PuBu5,
        PuBu6: exports.PuBu6,
        PuBu7: exports.PuBu7,
        PuBu8: exports.PuBu8,
        PuBu9: exports.PuBu9
    };
    exports.BuPu = {
        BuPu3: exports.BuPu3,
        BuPu4: exports.BuPu4,
        BuPu5: exports.BuPu5,
        BuPu6: exports.BuPu6,
        BuPu7: exports.BuPu7,
        BuPu8: exports.BuPu8,
        BuPu9: exports.BuPu9
    };
    exports.RdPu = {
        RdPu3: exports.RdPu3,
        RdPu4: exports.RdPu4,
        RdPu5: exports.RdPu5,
        RdPu6: exports.RdPu6,
        RdPu7: exports.RdPu7,
        RdPu8: exports.RdPu8,
        RdPu9: exports.RdPu9
    };
    exports.PuRd = {
        PuRd3: exports.PuRd3,
        PuRd4: exports.PuRd4,
        PuRd5: exports.PuRd5,
        PuRd6: exports.PuRd6,
        PuRd7: exports.PuRd7,
        PuRd8: exports.PuRd8,
        PuRd9: exports.PuRd9
    };
    exports.OrRd = {
        OrRd3: exports.OrRd3,
        OrRd4: exports.OrRd4,
        OrRd5: exports.OrRd5,
        OrRd6: exports.OrRd6,
        OrRd7: exports.OrRd7,
        OrRd8: exports.OrRd8,
        OrRd9: exports.OrRd9
    };
    exports.YlOrRd = {
        YlOrRd3: exports.YlOrRd3,
        YlOrRd4: exports.YlOrRd4,
        YlOrRd5: exports.YlOrRd5,
        YlOrRd6: exports.YlOrRd6,
        YlOrRd7: exports.YlOrRd7,
        YlOrRd8: exports.YlOrRd8,
        YlOrRd9: exports.YlOrRd9
    };
    exports.YlOrBr = {
        YlOrBr3: exports.YlOrBr3,
        YlOrBr4: exports.YlOrBr4,
        YlOrBr5: exports.YlOrBr5,
        YlOrBr6: exports.YlOrBr6,
        YlOrBr7: exports.YlOrBr7,
        YlOrBr8: exports.YlOrBr8,
        YlOrBr9: exports.YlOrBr9
    };
    exports.Purples = {
        Purples3: exports.Purples3,
        Purples4: exports.Purples4,
        Purples5: exports.Purples5,
        Purples6: exports.Purples6,
        Purples7: exports.Purples7,
        Purples8: exports.Purples8,
        Purples9: exports.Purples9
    };
    exports.Blues = {
        Blues3: exports.Blues3,
        Blues4: exports.Blues4,
        Blues5: exports.Blues5,
        Blues6: exports.Blues6,
        Blues7: exports.Blues7,
        Blues8: exports.Blues8,
        Blues9: exports.Blues9
    };
    exports.Greens = {
        Greens3: exports.Greens3,
        Greens4: exports.Greens4,
        Greens5: exports.Greens5,
        Greens6: exports.Greens6,
        Greens7: exports.Greens7,
        Greens8: exports.Greens8,
        Greens9: exports.Greens9
    };
    exports.Oranges = {
        Oranges3: exports.Oranges3,
        Oranges4: exports.Oranges4,
        Oranges5: exports.Oranges5,
        Oranges6: exports.Oranges6,
        Oranges7: exports.Oranges7,
        Oranges8: exports.Oranges8,
        Oranges9: exports.Oranges9
    };
    exports.Reds = {
        Reds3: exports.Reds3,
        Reds4: exports.Reds4,
        Reds5: exports.Reds5,
        Reds6: exports.Reds6,
        Reds7: exports.Reds7,
        Reds8: exports.Reds8,
        Reds9: exports.Reds9
    };
    exports.Greys = {
        Greys3: exports.Greys3,
        Greys4: exports.Greys4,
        Greys5: exports.Greys5,
        Greys6: exports.Greys6,
        Greys7: exports.Greys7,
        Greys8: exports.Greys8,
        Greys9: exports.Greys9,
        Greys10: exports.Greys10,
        Greys11: exports.Greys11,
        Greys256: exports.Greys256
    };
    exports.PuOr = {
        PuOr3: exports.PuOr3,
        PuOr4: exports.PuOr4,
        PuOr5: exports.PuOr5,
        PuOr6: exports.PuOr6,
        PuOr7: exports.PuOr7,
        PuOr8: exports.PuOr8,
        PuOr9: exports.PuOr9,
        PuOr10: exports.PuOr10,
        PuOr11: exports.PuOr11
    };
    exports.BrBG = {
        BrBG3: exports.BrBG3,
        BrBG4: exports.BrBG4,
        BrBG5: exports.BrBG5,
        BrBG6: exports.BrBG6,
        BrBG7: exports.BrBG7,
        BrBG8: exports.BrBG8,
        BrBG9: exports.BrBG9,
        BrBG10: exports.BrBG10,
        BrBG11: exports.BrBG11
    };
    exports.PRGn = {
        PRGn3: exports.PRGn3,
        PRGn4: exports.PRGn4,
        PRGn5: exports.PRGn5,
        PRGn6: exports.PRGn6,
        PRGn7: exports.PRGn7,
        PRGn8: exports.PRGn8,
        PRGn9: exports.PRGn9,
        PRGn10: exports.PRGn10,
        PRGn11: exports.PRGn11
    };
    exports.PiYG = {
        PiYG3: exports.PiYG3,
        PiYG4: exports.PiYG4,
        PiYG5: exports.PiYG5,
        PiYG6: exports.PiYG6,
        PiYG7: exports.PiYG7,
        PiYG8: exports.PiYG8,
        PiYG9: exports.PiYG9,
        PiYG10: exports.PiYG10,
        PiYG11: exports.PiYG11
    };
    exports.RdBu = {
        RdBu3: exports.RdBu3,
        RdBu4: exports.RdBu4,
        RdBu5: exports.RdBu5,
        RdBu6: exports.RdBu6,
        RdBu7: exports.RdBu7,
        RdBu8: exports.RdBu8,
        RdBu9: exports.RdBu9,
        RdBu10: exports.RdBu10,
        RdBu11: exports.RdBu11
    };
    exports.RdGy = {
        RdGy3: exports.RdGy3,
        RdGy4: exports.RdGy4,
        RdGy5: exports.RdGy5,
        RdGy6: exports.RdGy6,
        RdGy7: exports.RdGy7,
        RdGy8: exports.RdGy8,
        RdGy9: exports.RdGy9,
        RdGy10: exports.RdGy10,
        RdGy11: exports.RdGy11
    };
    exports.RdYlBu = {
        RdYlBu3: exports.RdYlBu3,
        RdYlBu4: exports.RdYlBu4,
        RdYlBu5: exports.RdYlBu5,
        RdYlBu6: exports.RdYlBu6,
        RdYlBu7: exports.RdYlBu7,
        RdYlBu8: exports.RdYlBu8,
        RdYlBu9: exports.RdYlBu9,
        RdYlBu10: exports.RdYlBu10,
        RdYlBu11: exports.RdYlBu11
    };
    exports.Spectral = {
        Spectral3: exports.Spectral3,
        Spectral4: exports.Spectral4,
        Spectral5: exports.Spectral5,
        Spectral6: exports.Spectral6,
        Spectral7: exports.Spectral7,
        Spectral8: exports.Spectral8,
        Spectral9: exports.Spectral9,
        Spectral10: exports.Spectral10,
        Spectral11: exports.Spectral11
    };
    exports.RdYlGn = {
        RdYlGn3: exports.RdYlGn3,
        RdYlGn4: exports.RdYlGn4,
        RdYlGn5: exports.RdYlGn5,
        RdYlGn6: exports.RdYlGn6,
        RdYlGn7: exports.RdYlGn7,
        RdYlGn8: exports.RdYlGn8,
        RdYlGn9: exports.RdYlGn9,
        RdYlGn10: exports.RdYlGn10,
        RdYlGn11: exports.RdYlGn11
    };
    exports.Inferno = {
        Inferno3: exports.Inferno3,
        Inferno4: exports.Inferno4,
        Inferno5: exports.Inferno5,
        Inferno6: exports.Inferno6,
        Inferno7: exports.Inferno7,
        Inferno8: exports.Inferno8,
        Inferno9: exports.Inferno9,
        Inferno10: exports.Inferno10,
        Inferno11: exports.Inferno11,
        Inferno256: exports.Inferno256
    };
    exports.Magma = {
        Magma3: exports.Magma3,
        Magma4: exports.Magma4,
        Magma5: exports.Magma5,
        Magma6: exports.Magma6,
        Magma7: exports.Magma7,
        Magma8: exports.Magma8,
        Magma9: exports.Magma9,
        Magma10: exports.Magma10,
        Magma11: exports.Magma11,
        Magma256: exports.Magma256
    };
    exports.Plasma = {
        Plasma3: exports.Plasma3,
        Plasma4: exports.Plasma4,
        Plasma5: exports.Plasma5,
        Plasma6: exports.Plasma6,
        Plasma7: exports.Plasma7,
        Plasma8: exports.Plasma8,
        Plasma9: exports.Plasma9,
        Plasma10: exports.Plasma10,
        Plasma11: exports.Plasma11,
        Plasma256: exports.Plasma256
    };
    exports.Viridis = {
        Viridis3: exports.Viridis3,
        Viridis4: exports.Viridis4,
        Viridis5: exports.Viridis5,
        Viridis6: exports.Viridis6,
        Viridis7: exports.Viridis7,
        Viridis8: exports.Viridis8,
        Viridis9: exports.Viridis9,
        Viridis10: exports.Viridis10,
        Viridis11: exports.Viridis11,
        Viridis256: exports.Viridis256
    };
    exports.Accent = {
        Accent3: exports.Accent3,
        Accent4: exports.Accent4,
        Accent5: exports.Accent5,
        Accent6: exports.Accent6,
        Accent7: exports.Accent7,
        Accent8: exports.Accent8
    };
    exports.Dark2 = {
        Dark2_3: exports.Dark2_3,
        Dark2_4: exports.Dark2_4,
        Dark2_5: exports.Dark2_5,
        Dark2_6: exports.Dark2_6,
        Dark2_7: exports.Dark2_7,
        Dark2_8: exports.Dark2_8
    };
    exports.Paired = {
        Paired3: exports.Paired3,
        Paired4: exports.Paired4,
        Paired5: exports.Paired5,
        Paired6: exports.Paired6,
        Paired7: exports.Paired7,
        Paired8: exports.Paired8,
        Paired9: exports.Paired9,
        Paired10: exports.Paired10,
        Paired11: exports.Paired11,
        Paired12: exports.Paired12
    };
    exports.Pastel1 = {
        Pastel1_3: exports.Pastel1_3,
        Pastel1_4: exports.Pastel1_4,
        Pastel1_5: exports.Pastel1_5,
        Pastel1_6: exports.Pastel1_6,
        Pastel1_7: exports.Pastel1_7,
        Pastel1_8: exports.Pastel1_8,
        Pastel1_9: exports.Pastel1_9
    };
    exports.Pastel2 = {
        Pastel2_3: exports.Pastel2_3,
        Pastel2_4: exports.Pastel2_4,
        Pastel2_5: exports.Pastel2_5,
        Pastel2_6: exports.Pastel2_6,
        Pastel2_7: exports.Pastel2_7,
        Pastel2_8: exports.Pastel2_8
    };
    exports.Set1 = {
        Set1_3: exports.Set1_3,
        Set1_4: exports.Set1_4,
        Set1_5: exports.Set1_5,
        Set1_6: exports.Set1_6,
        Set1_7: exports.Set1_7,
        Set1_8: exports.Set1_8,
        Set1_9: exports.Set1_9
    };
    exports.Set2 = {
        Set2_3: exports.Set2_3,
        Set2_4: exports.Set2_4,
        Set2_5: exports.Set2_5,
        Set2_6: exports.Set2_6,
        Set2_7: exports.Set2_7,
        Set2_8: exports.Set2_8
    };
    exports.Set3 = {
        Set3_3: exports.Set3_3,
        Set3_4: exports.Set3_4,
        Set3_5: exports.Set3_5,
        Set3_6: exports.Set3_6,
        Set3_7: exports.Set3_7,
        Set3_8: exports.Set3_8,
        Set3_9: exports.Set3_9,
        Set3_10: exports.Set3_10,
        Set3_11: exports.Set3_11,
        Set3_12: exports.Set3_12
    };
    exports.Category10 = {
        Category10_3: exports.Category10_3,
        Category10_4: exports.Category10_4,
        Category10_5: exports.Category10_5,
        Category10_6: exports.Category10_6,
        Category10_7: exports.Category10_7,
        Category10_8: exports.Category10_8,
        Category10_9: exports.Category10_9,
        Category10_10: exports.Category10_10
    };
    exports.Category20 = {
        Category20_3: exports.Category20_3,
        Category20_4: exports.Category20_4,
        Category20_5: exports.Category20_5,
        Category20_6: exports.Category20_6,
        Category20_7: exports.Category20_7,
        Category20_8: exports.Category20_8,
        Category20_9: exports.Category20_9,
        Category20_10: exports.Category20_10,
        Category20_11: exports.Category20_11,
        Category20_12: exports.Category20_12,
        Category20_13: exports.Category20_13,
        Category20_14: exports.Category20_14,
        Category20_15: exports.Category20_15,
        Category20_16: exports.Category20_16,
        Category20_17: exports.Category20_17,
        Category20_18: exports.Category20_18,
        Category20_19: exports.Category20_19,
        Category20_20: exports.Category20_20
    };
    exports.Category20b = {
        Category20b_3: exports.Category20b_3,
        Category20b_4: exports.Category20b_4,
        Category20b_5: exports.Category20b_5,
        Category20b_6: exports.Category20b_6,
        Category20b_7: exports.Category20b_7,
        Category20b_8: exports.Category20b_8,
        Category20b_9: exports.Category20b_9,
        Category20b_10: exports.Category20b_10,
        Category20b_11: exports.Category20b_11,
        Category20b_12: exports.Category20b_12,
        Category20b_13: exports.Category20b_13,
        Category20b_14: exports.Category20b_14,
        Category20b_15: exports.Category20b_15,
        Category20b_16: exports.Category20b_16,
        Category20b_17: exports.Category20b_17,
        Category20b_18: exports.Category20b_18,
        Category20b_19: exports.Category20b_19,
        Category20b_20: exports.Category20b_20
    };
    exports.Category20c = {
        Category20c_3: exports.Category20c_3,
        Category20c_4: exports.Category20c_4,
        Category20c_5: exports.Category20c_5,
        Category20c_6: exports.Category20c_6,
        Category20c_7: exports.Category20c_7,
        Category20c_8: exports.Category20c_8,
        Category20c_9: exports.Category20c_9,
        Category20c_10: exports.Category20c_10,
        Category20c_11: exports.Category20c_11,
        Category20c_12: exports.Category20c_12,
        Category20c_13: exports.Category20c_13,
        Category20c_14: exports.Category20c_14,
        Category20c_15: exports.Category20c_15,
        Category20c_16: exports.Category20c_16,
        Category20c_17: exports.Category20c_17,
        Category20c_18: exports.Category20c_18,
        Category20c_19: exports.Category20c_19,
        Category20c_20: exports.Category20c_20
    };
    exports.Colorblind = {
        Colorblind3: exports.Colorblind3,
        Colorblind4: exports.Colorblind4,
        Colorblind5: exports.Colorblind5,
        Colorblind6: exports.Colorblind6,
        Colorblind7: exports.Colorblind7,
        Colorblind8: exports.Colorblind8
    };    /****************************************************************************
 * License regarding the Viridis, Magma, Plasma and Inferno colormaps
 * New matplotlib colormaps by Nathaniel J. Smith, Stefan van der Walt,
 * and (in the case of viridis) Eric Firing.
 *
 * The Viridis, Magma, Plasma, and Inferno color maps are released under the
 * CC0 license / public domain dedication. We would appreciate credit if you
 * use or redistribute these colormaps, but do not impose any legal
 * restrictions.
 *
 * To the extent possible under law, the persons who associated CC0 with
 * mpl-colormaps have waived all copyright and related or neighboring rights
 * to mpl-colormaps.
 *
 * You should have received a copy of the CC0 legalcode along with this
 * work.  If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
 ****************************************************************************
 * This product includes color specifications and designs developed by
 * Cynthia Brewer (http://colorbrewer2.org/).  The Brewer colormaps are
 * licensed under the Apache v2 license. You may obtain a copy of the
 * License at http://www.apache.org/licenses/LICENSE-2.0
 ****************************************************************************
 * License regarding the D3 color palettes (Category10, Category20,
 * Category20b, and Category 20c):
 *
 * Copyright 2010-2015 Mike Bostock
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * * Neither the name of the author nor the names of contributors may be used to
 *   endorse or promote products derived from this software without specific
 *   prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 ****************************************************************************
 */
          
},
377: /*api/plotting*/
function _(require, module, exports) {
    var tslib_1 = require(369    /* tslib */);
    /* XXX: partial */
    var sprintf_js_1 = require(367    /* sprintf-js */);
    var document_1 = require(48    /* ../document */);
    var embed = require(49    /* ../embed */);
    var embed_1 = require(49    /* ../embed */);
    var models = require(375    /* ./models */);
    var dom_1 = require(5    /* ../core/dom */);
    var string_1 = require(38    /* ../core/util/string */);
    var eq_1 = require(29    /* ../core/util/eq */);
    var array_1 = require(22    /* ../core/util/array */);
    var object_1 = require(31    /* ../core/util/object */);
    var types_1 = require(43    /* ../core/util/types */);
    var models_1 = require(375    /* ./models */);
    var gridplot_1 = require(371    /* ./gridplot */);
    exports.gridplot = gridplot_1.gridplot;
    var _default_tooltips = [
        [
            'index',
            '$index'
        ],
        [
            'data (x, y)',
            '($x, $y)'
        ],
        [
            'screen (x, y)',
            '($sx, $sy)'
        ]
    ];
    var _default_tools = 'pan,wheel_zoom,box_zoom,save,reset,help';
    var _known_tools = {
        pan: function () {
            return new models.PanTool({ dimensions: 'both' });
        },
        xpan: function () {
            return new models.PanTool({ dimensions: 'width' });
        },
        ypan: function () {
            return new models.PanTool({ dimensions: 'height' });
        },
        xwheel_pan: function () {
            return new models.WheelPanTool({ dimension: 'width' });
        },
        ywheel_pan: function () {
            return new models.WheelPanTool({ dimension: 'height' });
        },
        wheel_zoom: function () {
            return new models.WheelZoomTool({ dimensions: 'both' });
        },
        xwheel_zoom: function () {
            return new models.WheelZoomTool({ dimensions: 'width' });
        },
        ywheel_zoom: function () {
            return new models.WheelZoomTool({ dimensions: 'height' });
        },
        zoom_in: function () {
            return new models.ZoomInTool({ dimensions: 'both' });
        },
        xzoom_in: function () {
            return new models.ZoomInTool({ dimensions: 'width' });
        },
        yzoom_in: function () {
            return new models.ZoomInTool({ dimensions: 'height' });
        },
        zoom_out: function () {
            return new models.ZoomOutTool({ dimensions: 'both' });
        },
        xzoom_out: function () {
            return new models.ZoomOutTool({ dimensions: 'width' });
        },
        yzoom_out: function () {
            return new models.ZoomOutTool({ dimensions: 'height' });
        },
        click: function () {
            return new models.TapTool({ behavior: 'inspect' });
        },
        tap: function () {
            return new models.TapTool();
        },
        crosshair: function () {
            return new models.CrosshairTool();
        },
        box_select: function () {
            return new models.BoxSelectTool();
        },
        xbox_select: function () {
            return new models.BoxSelectTool({ dimensions: 'width' });
        },
        ybox_select: function () {
            return new models.BoxSelectTool({ dimensions: 'height' });
        },
        poly_select: function () {
            return new models.PolySelectTool();
        },
        lasso_select: function () {
            return new models.LassoSelectTool();
        },
        box_zoom: function () {
            return new models.BoxZoomTool({ dimensions: 'both' });
        },
        xbox_zoom: function () {
            return new models.BoxZoomTool({ dimensions: 'width' });
        },
        ybox_zoom: function () {
            return new models.BoxZoomTool({ dimensions: 'height' });
        },
        hover: function () {
            return new models.HoverTool({ tooltips: _default_tooltips });
        },
        save: function () {
            return new models.SaveTool();
        },
        previewsave: function () {
            return new models.SaveTool();
        },
        undo: function () {
            return new models.UndoTool();
        },
        redo: function () {
            return new models.RedoTool();
        },
        reset: function () {
            return new models.ResetTool();
        },
        help: function () {
            return new models.HelpTool();
        }
    };
    function _with_default(value, default_value) {
        return value === undefined ? default_value : value;
    }
    var Figure = function (_super) {
        tslib_1.__extends(Figure, _super);
        function Figure(attributes, options) {
            if (attributes === void 0) {
                attributes = {};
            }
            if (options === void 0) {
                options = {};
            }
            var _this = this;
            var attrs = object_1.clone(attributes);
            var tools = _with_default(attrs.tools, _default_tools);
            delete attrs.tools;
            attrs.x_range = Figure._get_range(attrs.x_range);
            attrs.y_range = Figure._get_range(attrs.y_range);
            var x_axis_type = attrs.x_axis_type === undefined ? 'auto' : attrs.x_axis_type;
            var y_axis_type = attrs.y_axis_type === undefined ? 'auto' : attrs.y_axis_type;
            delete attrs.x_axis_type;
            delete attrs.y_axis_type;
            attrs.x_scale = Figure._get_scale(attrs.x_range, x_axis_type);
            attrs.y_scale = Figure._get_scale(attrs.y_range, y_axis_type);
            var x_minor_ticks = attrs.x_minor_ticks != null ? attrs.x_minor_ticks : 'auto';
            var y_minor_ticks = attrs.y_minor_ticks != null ? attrs.y_minor_ticks : 'auto';
            delete attrs.x_minor_ticks;
            delete attrs.y_minor_ticks;
            var x_axis_location = attrs.x_axis_location != null ? attrs.x_axis_location : 'below';
            var y_axis_location = attrs.y_axis_location != null ? attrs.y_axis_location : 'left';
            delete attrs.x_axis_location;
            delete attrs.y_axis_location;
            var x_axis_label = attrs.x_axis_label != null ? attrs.x_axis_label : '';
            var y_axis_label = attrs.y_axis_label != null ? attrs.y_axis_label : '';
            delete attrs.x_axis_label;
            delete attrs.y_axis_label;
            if (attrs.width !== undefined) {
                if (attrs.plot_width === undefined) {
                    attrs.plot_width = attrs.width;
                } else {
                    throw new Error('both \'width\' and \'plot_width\' can\'t be given at the same time');
                }
                delete attrs.width;
            }
            if (attrs.height !== undefined) {
                if (attrs.plot_height === undefined) {
                    attrs.plot_height = attrs.height;
                } else {
                    throw new Error('both \'height\' and \'plot_height\' can\'t be given at the same time');
                }
                delete attrs.height;
            }
            _this = _super.call(this, attrs, options) || this;
            _this._process_axis_and_grid(x_axis_type, x_axis_location, x_minor_ticks, x_axis_label, attrs.x_range, 0);
            _this._process_axis_and_grid(y_axis_type, y_axis_location, y_minor_ticks, y_axis_label, attrs.y_range, 1);
            _this.add_tools.apply(_this, _this._process_tools(tools));
            _this._legend = new models.Legend({
                plot: _this,
                items: []
            });
            _this.add_renderers(_this._legend);
            return _this;
        }
        Figure.initClass = function () {
            this.prototype._vectorable = [
                'fill_color',
                'fill_alpha',
                'line_color',
                'line_alpha',
                'line_width',
                'text_color',
                'text_alpha',
                'text_font_size'
            ];
            this.prototype._default_color = '#1f77b4';
            this.prototype._default_alpha = 1;
        };
        Object.defineProperty(Figure.prototype, 'xgrid', {
            get: function () {
                return this.renderers.filter(function (r) {
                    return r instanceof models_1.Grid && r.dimension === 0;
                })[0];    // TODO
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Figure.prototype, 'ygrid', {
            get: function () {
                return this.renderers.filter(function (r) {
                    return r instanceof models_1.Grid && r.dimension === 1;
                })[0];    // TODO
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Figure.prototype, 'xaxis', {
            get: function () {
                return this.below.concat(this.above).filter(function (r) {
                    return r instanceof models_1.Axis;
                })[0];    // TODO
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Figure.prototype, 'yaxis', {
            get: function () {
                return this.left.concat(this.right).filter(function (r) {
                    return r instanceof models_1.Axis;
                })[0];    // TODO
            },
            enumerable: true,
            configurable: true
        });
        Figure.prototype.annular_wedge = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._glyph(models.AnnularWedge, 'x,y,inner_radius,outer_radius,start_angle,end_angle', args);
        };
        Figure.prototype.annulus = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._glyph(models.Annulus, 'x,y,inner_radius,outer_radius', args);
        };
        Figure.prototype.arc = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._glyph(models.Arc, 'x,y,radius,start_angle,end_angle', args);
        };
        Figure.prototype.bezier = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._glyph(models.Bezier, 'x0,y0,x1,y1,cx0,cy0,cx1,cy1', args);
        };
        Figure.prototype.circle = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._glyph(models.Circle, 'x,y', args);
        };
        Figure.prototype.ellipse = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._glyph(models.Ellipse, 'x,y,width,height', args);
        };
        Figure.prototype.image = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._glyph(models.Image, 'color_mapper,image,rows,cols,x,y,dw,dh', args);
        };
        Figure.prototype.image_rgba = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._glyph(models.ImageRGBA, 'image,rows,cols,x,y,dw,dh', args);
        };
        Figure.prototype.image_url = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._glyph(models.ImageURL, 'url,x,y,w,h', args);
        };
        Figure.prototype.line = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._glyph(models.Line, 'x,y', args);
        };
        Figure.prototype.multi_line = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._glyph(models.MultiLine, 'xs,ys', args);
        };
        Figure.prototype.oval = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._glyph(models.Oval, 'x,y,width,height', args);
        };
        Figure.prototype.patch = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._glyph(models.Patch, 'x,y', args);
        };
        Figure.prototype.patches = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._glyph(models.Patches, 'xs,ys', args);
        };
        Figure.prototype.quad = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._glyph(models.Quad, 'left,right,bottom,top', args);
        };
        Figure.prototype.quadratic = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._glyph(models.Quadratic, 'x0,y0,x1,y1,cx,cy', args);
        };
        Figure.prototype.ray = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._glyph(models.Ray, 'x,y,length', args);
        };
        Figure.prototype.rect = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._glyph(models.Rect, 'x,y,width,height', args);
        };
        Figure.prototype.segment = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._glyph(models.Segment, 'x0,y0,x1,y1', args);
        };
        Figure.prototype.text = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._glyph(models.Text, 'x,y,text', args);
        };
        Figure.prototype.wedge = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._glyph(models.Wedge, 'x,y,radius,start_angle,end_angle', args);
        };
        Figure.prototype.asterisk = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._marker(models.Asterisk, args);
        };
        Figure.prototype.circle_cross = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._marker(models.CircleCross, args);
        };
        Figure.prototype.circle_x = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._marker(models.CircleX, args);
        };
        Figure.prototype.cross = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._marker(models.Cross, args);
        };
        Figure.prototype.diamond = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._marker(models.Diamond, args);
        };
        Figure.prototype.diamond_cross = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._marker(models.DiamondCross, args);
        };
        Figure.prototype.inverted_triangle = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._marker(models.InvertedTriangle, args);
        };
        Figure.prototype.square = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._marker(models.Square, args);
        };
        Figure.prototype.square_cross = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._marker(models.SquareCross, args);
        };
        Figure.prototype.square_x = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._marker(models.SquareX, args);
        };
        Figure.prototype.triangle = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._marker(models.Triangle, args);
        };
        Figure.prototype.x = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this._marker(models.X, args);
        };
        Figure.prototype._pop_colors_and_alpha = function (cls, attrs, prefix, default_color, default_alpha) {
            if (prefix === void 0) {
                prefix = '';
            }
            if (default_color === void 0) {
                default_color = this._default_color;
            }
            if (default_alpha === void 0) {
                default_alpha = this._default_alpha;
            }
            var result = {};
            var color = _with_default(attrs[prefix + 'color'], default_color);
            var alpha = _with_default(attrs[prefix + 'alpha'], default_alpha);
            delete attrs[prefix + 'color'];
            delete attrs[prefix + 'alpha'];
            var _update_with = function (name, default_value) {
                if (cls.prototype.props[name] != null) {
                    result[name] = _with_default(attrs[prefix + name], default_value);
                    return delete attrs[prefix + name];
                }
            };
            _update_with('fill_color', color);
            _update_with('line_color', color);
            _update_with('text_color', 'black');
            _update_with('fill_alpha', alpha);
            _update_with('line_alpha', alpha);
            _update_with('text_alpha', alpha);
            return result;
        };
        Figure.prototype._find_uniq_name = function (data, name) {
            var i = 1;
            while (true) {
                var new_name = name + '__' + i;
                if (data[new_name] != null) {
                    i += 1;
                } else {
                    return new_name;
                }
            }
        };
        Figure.prototype._fixup_values = function (cls, data, attrs) {
            for (var name_1 in attrs) {
                var value = attrs[name_1];
                var prop = cls.prototype.props[name_1];
                if (prop != null) {
                    if (prop.type.prototype.dataspec) {
                        if (value != null) {
                            if (types_1.isArray(value)) {
                                var field = void 0;
                                if (data[name_1] != null) {
                                    if (data[name_1] !== value) {
                                        field = this._find_uniq_name(data, name_1);
                                        data[field] = value;
                                    } else {
                                        field = name_1;
                                    }
                                } else {
                                    field = name_1;
                                    data[field] = value;
                                }
                                attrs[name_1] = { field: field };
                            } else if (types_1.isNumber(value) || types_1.isString(value)) {
                                attrs[name_1] = { value: value };
                            }
                        }
                    }
                }
            }
        };
        Figure.prototype._glyph = function (cls, params, args) {
            var attrs;
            params = params.split(',');
            if (args.length === 1) {
                attrs = args[0];
                attrs = object_1.clone(attrs);
            } else {
                attrs = object_1.clone(args[args.length - 1]);
                for (var i = 0; i < params.length; i++) {
                    var param = params[i];
                    attrs[param] = args[i];
                }
            }
            var legend = this._process_legend(attrs.legend, attrs.source);
            delete attrs.legend;
            var has_sglyph = array_1.any(Object.keys(attrs), function (key) {
                return string_1.startsWith(key, 'selection_');
            });
            var has_hglyph = array_1.any(Object.keys(attrs), function (key) {
                return string_1.startsWith(key, 'hover_');
            });
            var glyph_ca = this._pop_colors_and_alpha(cls, attrs);
            var nsglyph_ca = this._pop_colors_and_alpha(cls, attrs, 'nonselection_', undefined, 0.1);
            var sglyph_ca = has_sglyph ? this._pop_colors_and_alpha(cls, attrs, 'selection_') : {};
            var hglyph_ca = has_hglyph ? this._pop_colors_and_alpha(cls, attrs, 'hover_') : {};
            var source = attrs.source != null ? attrs.source : new models.ColumnDataSource();
            var data = object_1.clone(source.data);
            delete attrs.source;
            this._fixup_values(cls, data, glyph_ca);
            this._fixup_values(cls, data, nsglyph_ca);
            this._fixup_values(cls, data, sglyph_ca);
            this._fixup_values(cls, data, hglyph_ca);
            this._fixup_values(cls, data, attrs);
            source.data = data;
            var _make_glyph = function (cls, attrs, extra_attrs) {
                return new cls(object_1.extend({}, attrs, extra_attrs));
            };
            var glyph = _make_glyph(cls, attrs, glyph_ca);
            var nsglyph = _make_glyph(cls, attrs, nsglyph_ca);
            var sglyph = has_sglyph ? _make_glyph(cls, attrs, sglyph_ca) : null;
            var hglyph = has_hglyph ? _make_glyph(cls, attrs, hglyph_ca) : null;
            var glyph_renderer = new models_1.GlyphRenderer({
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
        Figure.prototype._marker = function (cls, args) {
            return this._glyph(cls, 'x,y', args);
        };
        Figure._get_range = function (range) {
            if (range == null) {
                return new models.DataRange1d();
            }
            if (range instanceof models.Range) {
                return range;
            }
            if (types_1.isArray(range)) {
                if (array_1.all(range, types_1.isString)) {
                    return new models.FactorRange({ factors: range });
                }
                if (range.length === 2) {
                    return new models.Range1d({
                        start: range[0],
                        end: range[1]
                    });
                }
            }
            throw new Error('unable to determine proper range for: \'' + range + '\'');
        };
        Figure._get_scale = function (range_input, axis_type) {
            if (range_input instanceof models.DataRange1d || range_input instanceof models.Range1d) {
                switch (axis_type) {
                case null:
                case 'auto':
                case 'linear':
                case 'datetime':
                    return new models.LinearScale();
                case 'log':
                    return new models.LogScale();
                }
            }
            if (range_input instanceof models.FactorRange) {
                return new models.CategoricalScale();
            }
            throw new Error('unable to determine proper scale for: \'' + range_input + '\'');
        };
        Figure.prototype._process_axis_and_grid = function (axis_type, axis_location, minor_ticks, axis_label, rng, dim) {
            var axiscls = this._get_axis_class(axis_type, rng);
            if (axiscls != null) {
                if (axiscls === models.LogAxis) {
                    if (dim === 0) {
                        this.x_scale = new models.LogScale();
                    } else {
                        this.y_scale = new models.LogScale();
                    }
                }
                var axis = new axiscls();
                if (axis.ticker instanceof models.ContinuousTicker) {
                    axis.ticker.num_minor_ticks = this._get_num_minor_ticks(axiscls, minor_ticks);
                }
                if (axis_label.length !== 0) {
                    axis.axis_label = axis_label;
                }
                var grid = new models.Grid({
                    dimension: dim,
                    ticker: axis.ticker
                });
                if (axis_location !== null) {
                    this.add_layout(axis, axis_location);
                }
                this.add_layout(grid);
            }
        };
        Figure.prototype._get_axis_class = function (axis_type, range) {
            switch (axis_type) {
            case null:
                return null;
            case 'linear':
                return models.LinearAxis;
            case 'log':
                return models.LogAxis;
            case 'datetime':
                return models.DatetimeAxis;
            case 'auto':
                if (range instanceof models.FactorRange)
                    return models.CategoricalAxis;
                else
                    return models.LinearAxis;
            // TODO: return models.DatetimeAxis (Date type)
            default:
                throw new Error('shouldn\'t have happened');
            }
        };
        Figure.prototype._get_num_minor_ticks = function (axis_class, num_minor_ticks) {
            if (types_1.isNumber(num_minor_ticks)) {
                if (num_minor_ticks <= 1) {
                    throw new Error('num_minor_ticks must be > 1');
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
        Figure.prototype._process_tools = function (tools) {
            if (types_1.isString(tools))
                tools = tools.split(/\s*,\s*/).filter(function (tool) {
                    return tool.length > 0;
                });
            var objs = function () {
                var result = [];
                for (var _i = 0, tools_1 = tools; _i < tools_1.length; _i++) {
                    var tool = tools_1[_i];
                    if (types_1.isString(tool)) {
                        if (_known_tools.hasOwnProperty(tool)) {
                            result.push(_known_tools[tool]());
                        } else {
                            throw new Error('unknown tool type: ' + tool);
                        }
                    } else {
                        result.push(tool);
                    }
                }
                return result;
            }();
            return objs;
        };
        Figure.prototype._process_legend = function (legend, source) {
            var legend_item_label = null;
            if (legend != null) {
                if (types_1.isString(legend)) {
                    legend_item_label = { value: legend };
                    if (source != null && source.column_names != null) {
                        if (array_1.includes(source.column_names, legend)) {
                            legend_item_label = { field: legend };
                        }
                    }
                } else {
                    legend_item_label = legend;
                }
            }
            return legend_item_label;
        };
        Figure.prototype._update_legend = function (legend_item_label, glyph_renderer) {
            var added = false;
            for (var _i = 0, _a = this._legend.items; _i < _a.length; _i++) {
                var item = _a[_i];
                if (eq_1.isEqual(item.label, legend_item_label)) {
                    if (item.label.value != null) {
                        item.renderers.push(glyph_renderer);
                        added = true;
                        break;
                    }
                    if (item.label.field != null && glyph_renderer.data_source === item.renderers[0].data_source) {
                        item.renderers.push(glyph_renderer);
                        added = true;
                        break;
                    }
                }
            }
            if (!added) {
                var new_item = new models.LegendItem({
                    label: legend_item_label,
                    renderers: [glyph_renderer]
                });
                return this._legend.items.push(new_item);
            }
        };
        return Figure;
    }(models_1.Plot);
    exports.Figure = Figure;
    Figure.initClass();
    exports.figure = function (attributes, options) {
        if (attributes === void 0) {
            attributes = {};
        }
        if (options === void 0) {
            options = {};
        }
        return new Figure(attributes, options);
    };
    exports.show = function (obj, target) {
        var element;
        var multiple = types_1.isArray(obj);
        var doc = new document_1.Document();
        if (!multiple) {
            doc.add_root(obj);
        } else {
            for (var _i = 0, obj_1 = obj; _i < obj_1.length; _i++) {
                var _obj = obj_1[_i];
                doc.add_root(_obj);
            }
        }
        if (target == null) {
            element = document.body;
        } else if (types_1.isString(target)) {
            element = document.querySelector(target);
            if (element == null) {
                throw new Error('\'' + target + '\' selector didn\'t match any elements');
            }
        } else if (target instanceof HTMLElement) {
            element = target;
        } else if (typeof $ !== 'undefined' && $ !== null && target instanceof $) {
            element = target[0];
        } else {
            throw new Error('target should be HTMLElement, string selector, $ or null');
        }
        var root = dom_1.div({ class: embed_1.BOKEH_ROOT });
        element.appendChild(root);
        var views = embed.add_document_standalone(doc, root);
        if (!multiple) {
            return views[obj.id];
        } else {
            return views;
        }
    };
    exports.color = function (r, g, b) {
        return sprintf_js_1.sprintf('#%02x%02x%02x', r, g, b);
    };    
}
}, {"api/charts":370,"api/gridplot":371,"api/index":372,"api/linalg":373,"api/main":374,"api/models":375,"api/palettes":376,"api/plotting":377}, 374);
})

//# sourceMappingURL=bokeh-api.js.map
