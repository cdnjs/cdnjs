'use strict';

var charts = {};
var globals = {};
globals.link = false;

function moz_chart() {
    var moz = {};
    moz.defaults = {};
    moz.defaults.all = {
        error: '',                    // if set, a graph will show an error icon and log the error to the console
        animate_on_load: false,       // animate lines on load
        top: 40,                      // the size of the top margin
        bottom: 30,                   // the size of the bottom margin
        right: 10,                    // size of the right margin
        left: 50,                     // size of the left margin
        buffer: 8,                    // the buffer between the actual chart area and the margins
        width: 350,                   // the width of the entire graphic
        height: 220,                  // the height of the entire graphic
        small_height_threshold: 120,  // the height threshold for when smaller text appears
        small_width_threshold: 160,   // the width  threshold for when smaller text appears
        small_text: false,            // coerces small text regardless of graphic size
        xax_count: 6,                 // number of x axis ticks
        xax_tick: 5,                  // x axis tick length
        yax_count: 5,                 // number of y axis ticks
        yax_tick: 5,                  // y axis tick length
        x_extended_ticks: false,      // extends x axis ticks across chart - useful for tall charts
        y_extended_ticks: false,      // extends y axis ticks across chart - useful for long charts
        y_scale_type: 'linear',
        max_x: null,
        max_y: null,
        min_x: null,
        min_y: null,
        point_size: 2.5,              // the size of the dot that appears on a line on mouse-over
        x_accessor: 'date',
        xax_units: '',
        x_label: '',
        x_axis: true,
        y_axis: true,
        y_accessor: 'value',
        y_label: '',
        yax_units: '',
        transition_on_update: true,
        rollover_callback: null,
        show_rollover_text: true,
        show_confidence_band: null,   // given [l, u] shows a confidence at each point from l to u
        xax_format: function(d) {
            var df = d3.time.format('%b %d');
            var pf = d3.formatPrefix(d);

            // format as date or not, of course user can pass in 
            // a custom function if desired
            return (this.x_accessor == 'date') 
                ? df(d)
                : pf.scale(d) + pf.symbol;
        },
        area: true,
        chart_type: 'line',   
        data: [],
        decimals: 2,                  // the number of decimals in any rollover
        format: 'count',              // format = {count, percentage}
        inflator: 10/9,               // for setting y axis max
        linked: false,                // links together all other graphs with linked:true, so rollovers in one trigger rollovers in the others
        list: false,
        baselines: null,              // sets the baseline lines
        markers: null,                // sets the marker lines
        scalefns: {},
        scales: {},
        show_years: true,
        target: '#viz',
        interpolate: 'cardinal',       // interpolation method to use when rendering lines
        custom_line_color_map: [],     // allows arbitrary mapping of lines to colors, e.g. [2,3] will map line 1 to color 2 and line 2 to color 3
        max_data_size: null            // explicitly specify the the max number of line series, for use with custom_line_color_map
    }
    moz.defaults.point = {
        ls: false,
        lowess: false
    }
    moz.defaults.histogram = {
        rollover_callback: function(d, i) {
            $('#histogram svg .active_datapoint')
                .html('Frequency Count: ' + d.y);
        },
        binned: false,
        bins: null,
        processed_x_accessor: 'x',
        processed_y_accessor: 'y',
        processed_dx_accessor: 'dx',
        bar_margin: 1
    }
    moz.defaults.bar = {
        y_accessor: 'factor',
        x_accessor: 'value',
        binned: false,
        padding_percentage: .1,
        outer_padding_percentage: .1,
        height:500,
        top:20
    }
    moz.defaults.missing = {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: 350,
        height: 220
    }

    var args = arguments[0];
    if (!args) { args = {}; }
    //args = merge_with_defaults(args, moz.defaults.all);

    var g = '';
    if (args.list) {
        args.x_accessor = 0;
        args.y_accessor = 1;
    }
    
    //build the chart
    if(args.chart_type == 'missing-data'){
        args = merge_with_defaults(moz.defaults.missing, args);
        charts.missing(args);
    }
    else if(args.chart_type == 'point'){
        var a = merge_with_defaults(moz.defaults.point, moz.defaults.all);
        args = merge_with_defaults(args, a);
        charts.point(args).mainPlot().markers().rollover();
    }
    else if(args.chart_type == 'histogram'){
        var a = merge_with_defaults(moz.defaults.histogram, moz.defaults.all);
        args = merge_with_defaults(args, a);
        charts.histogram(args).mainPlot().markers().rollover();
    }
    else if (args.chart_type == 'bar'){
        var a = merge_with_defaults(moz.defaults.bar, moz.defaults.all);
        args = merge_with_defaults(args, a);
        charts.bar(args).mainPlot().markers().rollover();
    }
    else {
        args = merge_with_defaults(args, moz.defaults.all);
        charts.line(args).markers().mainPlot().rollover();
    }

    return args.data;
}

function chart_title(args) {
    //is chart title different than existing, if so, clear the fine 
    //gentleman, otherwise, move along
    if(args.title && args.title !== $(args.target + ' h2.chart_title').text())
        $(args.target + ' h2.chart_title').remove();
    else
        return;

    if (args.target && args.title) {
        //only show question mark if there's a description
        var optional_question_mark = (args.description)
            ? '<i class="fa fa-question-circle fa-inverse"></i>'
            : '';
    
        $(args.target).prepend('<h2 class="chart_title">' 
            + args.title + optional_question_mark + '</h2>');
            
        //activate the question mark if we have a description
        if (args.description){
            $(args.target + ' h2.chart_title')
                .popover({'content': args.description,
                    'trigger':'hover', 'placement': 'top'});
        }   
    }
    
    if(args.error) {
        error(args);
    }
}

function y_axis(args) {
    var svg = d3.select(args.target + ' svg');
    var g;

    var min_y, max_y;

    args.scalefns.yf = function(di) {
        return args.scales.Y(di[args.y_accessor]);
    }

    var min_y, max_y;

    var _set = false;
    for (var i=0; i < args.data.length; i++) {
        var a = args.data[i];

        if (args.y_scale_type == 'log') {
            // filter positive values
            a = a.filter(function(d) { return d[args.y_accessor] > 0; });
        }

        if (a.length > 0) {
            // get min/max in one pass
            var extent = d3.extent(a,function(d) {
                return d[args.y_accessor];
            });

            if (!_set) {
                // min_y and max_y haven't been set
                min_y = extent[0];
                max_y = extent[1];
                _set = true;
            } else {
                min_y = Math.min(extent[0], min_y);
                max_y = Math.max(extent[1], max_y);
            }
        }
    }

    min_y = args.min_y ? args.min_y : min_y;
    max_y = args.max_y ? args.max_y : max_y;

    if (args.y_scale_type != 'log') {
        // we are currently saying that if the min val > 0, set 0 as min y.
        if (min_y >= 0){
            min_y = 0;
            args.y_axis_negative = false;
        } else {
            min_y = min_y  - (max_y * (args.inflator-1));
            args.y_axis_negative = true;
        }
    }

    if (args.y_scale_type == 'log'){
        if (args.chart_type == 'histogram') {
            // log histogram plots should start just below 1
            // so that bins with single counts are visible
            min_y = 0.2;
        } else {
            if (min_y <= 0) {
                min_y = 1;
            }
        }
        args.scales.Y = d3.scale.log()
        .domain([min_y, max_y * args.inflator])
        .range([args.height - args.bottom - args.buffer, args.top])
        .clamp(true);
    } else {
        args.scales.Y = d3.scale.linear()
            .domain([min_y, max_y * args.inflator])
            .range([args.height - args.bottom - args.buffer, args.top]);
    }

    // used for ticks and such, and designed to be paired with log or linear.
    args.scales.Y_axis = d3.scale.linear()
            .domain([min_y, max_y * args.inflator])
            .range([args.height - args.bottom - args.buffer, args.top]);

    var yax_format;
    if (args.format == 'count') {
        yax_format = function(f) {
            if (f < 1.0) {
                // Don't scale tiny values.
                return args.yax_units + d3.round(f, args.decimals);
            } else {
                var pf = d3.formatPrefix(f);
                return args.yax_units + pf.scale(f) + pf.symbol;
            }
        };
    }
    else {
        yax_format = function(d_) {
            var n = d3.format('%p');
            return n(d_);
        }
    }

    //remove the old y-axis, add new one
    if($(args.target + ' svg .y-axis').length > 0) {
        $(args.target + ' svg .y-axis')
            .remove();
    }

    if (!args.y_axis) return this;

    //y axis
    g = svg.append('g')
        .classed('y-axis', true)
        .classed('y-axis-small', args.use_small_class);

    //are we adding a label?
    if(args.y_label) {
        g.append('text')
            .attr('class', 'label')
            .attr('x', function() {
                return -1 * (args.top + args.buffer + 
                        ((args.height - args.bottom - args.buffer)
                            - (args.top + args.buffer)) / 2);
            })
            .attr('y', function() {
                return args.left / 2;
            })
            .attr("dy", "0.4em")
            .attr('text-anchor', 'middle')
            .text(function(d) {
                return args.y_label;
            })
            .attr("transform", function(d) {
                return "rotate(-90)";
            });
    }

    var scale_ticks = args.scales.Y.ticks(args.yax_count);

    function log10(val) {
         //return Math.log(val) / Math.LN10;
         if (val==1000){
            return 3;
         }
         if (val==1000000){
            return 7;
         }
         return Math.log(val) / Math.LN10;
    }
    if (args.y_scale_type == 'log'){
        // get out only whole logs.
        scale_ticks = scale_ticks.filter(function(d){
            return Math.abs(log10(d)) % 1 < 1e-6 || Math.abs(log10(d)) % 1 > 1-1e-6;
        });

    } 

    var last_i = scale_ticks.length-1;
    if(!args.x_extended_ticks && !args.y_extended_ticks) {
        g.append('line')
            .attr('x1', args.left)
            .attr('x2', args.left)
            .attr('y1', args.scales.Y(scale_ticks[0]))
            .attr('y2', args.scales.Y(scale_ticks[last_i]));
    }

    //add y ticks
    g.selectAll('.yax-ticks')
        .data(scale_ticks).enter()
            .append('line')
                .classed('extended-y-ticks', args.y_extended_ticks)
                .attr('x1', args.left)
                .attr('x2', function() {
                    return (args.y_extended_ticks)
                        ? args.width - args.right
                        : args.left - args.yax_tick;
                })
                .attr('y1', args.scales.Y)
                .attr('y2', args.scales.Y);

    g.selectAll('.yax-labels')
        .data(scale_ticks).enter()
            .append('text')
                .attr('x', args.left - args.yax_tick * 3 / 2)
                .attr('dx', -3).attr('y', args.scales.Y)
                .attr('dy', '.35em')
                .attr('text-anchor', 'end')
                .text(function(d, i) {
                    var o = yax_format(d);
                    return o;
                })

    return this;
}

function y_axis_categorical(args) {
    // first, come up with y_axis 
    args.scales.Y = d3.scale.ordinal()
        .domain(args.categorical_variables)
        .rangeRoundBands([args.height - args.bottom - args.buffer, args.top], args.padding_percentage, args.outer_padding_percentage);

    args.scalefns.yf = function(di) {
        return args.scales.Y(di[args.y_accessor]);
    }

    var svg = d3.select(args.target + ' svg');
    var g = svg.append('g')
        .classed('y-axis', true)
        .classed('y-axis-small', args.use_small_class);


    if (!args.y_axis) return this;

    g.selectAll('text').data(args.categorical_variables).enter().append('svg:text')
        .attr('x', args.left)
        .attr('y', function(d){return args.scales.Y(d) + args.scales.Y.rangeBand()/2 })
        .attr('dy', '.35em')
        .attr('text-anchor', 'end')
        .text(String)
    // plot labels


    return this;
}

function x_axis(args) {
    var svg = d3.select(args.target + ' svg');
    var g;
    var min_x;
    var max_x;

    args.scalefns.xf = function(di) {
        return args.scales.X(di[args.x_accessor]);
    }

    var last_i;
    if (args.chart_type == 'line'){
        for(var i=0; i<args.data.length; i++) {
            last_i = args.data[i].length-1;

            if(args.data[i][0][args.x_accessor] < min_x || !min_x)
                min_x = args.data[i][0][args.x_accessor];

            if(args.data[i][last_i][args.x_accessor] > max_x || !max_x)
                max_x = args.data[i][last_i][args.x_accessor];
        }    
    } else if (args.chart_type == 'point') {
        max_x = d3.max(args.data[0], function(d){return d[args.x_accessor]});
        min_x = d3.min(args.data[0], function(d){return d[args.x_accessor]});
    }
    else if (args.chart_type == 'histogram') {
        min_x = d3.min(args.data[0], function(d){return d[args.x_accessor]});
        max_x = d3.max(args.data[0], function(d){return d[args.x_accessor]});
        
        //force override xax_format
        //todo revisit to see if this makes sense        
        args.xax_format = function(f) {
            if (f < 1.0) {
                //don't scale tiny values
                return args.yax_units + d3.round(f, args.decimals);
            }
            else {
                var pf = d3.formatPrefix(f);
                return args.xax_units + pf.scale(f) + pf.symbol;
            }
        }
    } else if (args.chart_type = 'bar') {

        //min_x = d3.min(args.data[0], function(d){return d[args.value_accessor]});
        min_x = 0; // TODO: think about what actually makes sense.
        max_x = d3.max(args.data[0], function(d){return d[args.x_accessor]});
        args.xax_format = function(f) {
            if (f < 1.0) {
                //don't scale tiny values
                return args.yax_units + d3.round(f, args.decimals);
            }
            else {
                var pf = d3.formatPrefix(f);
                return args.xax_units + pf.scale(f) + pf.symbol;
            }
        }
    }

    min_x = args.min_x ? args.min_x : min_x;
    max_x = args.max_x ? args.max_x : max_x;
    args.x_axis_negative = false;
    if (!args.time_series) {
        if (min_x < 0){
            min_x = min_x  - (max_x * (args.inflator-1));
            args.x_axis_negative = true;
        }
    }

    // this is for some charts that might need additional buffer, such as the bar chart.
    var additional_buffer;

    if (args.chart_type == 'bar'){
        additional_buffer = args.buffer*5;
    } else {
        additional_buffer = 0;
    }

    args.scales.X = (args.time_series) 
        ? d3.time.scale() 
        : d3.scale.linear();
    args.scales.X
        .domain([min_x, max_x])
        .range([args.left + args.buffer, args.width - args.right - args.buffer - additional_buffer]);

    //remove the old x-axis, add new one
    if($(args.target + ' svg .x-axis').length > 0) {
        $(args.target + ' svg .x-axis')
            .remove();
    }

    if (!args.x_axis) return this;

    //x axis
    g = svg.append('g')
        .classed('x-axis', true)
        .classed('x-axis-small', args.use_small_class);

    var last_i = args.scales.X.ticks(args.xax_count).length-1;


    //are we adding a label?
    if(args.x_label) {
        g.append('text')
            .attr('class', 'label')
            .attr('x', function() {
                return args.left + args.buffer
                    + ((args.width - args.right - args.buffer)
                        - (args.left + args.buffer)) / 2;
            })
            .attr('y', args.height - args.bottom / 2)
            .attr('dy', '.50em')
            .attr('text-anchor', 'middle')
            .text(function(d) {
                return args.x_label;
            })
    }

    if(args.chart_type != 'bar' && !args.x_extended_ticks && !args.y_extended_ticks) {
        //extend axis line across bottom, rather than from domain's min..max
        g.append('line')
            .attr('x1', 
                args.concise == false ?
                args.left + args.buffer :
                args.scales.X(args.scales.X.ticks(args.xax_count)[0]))
            .attr('x2', 
                args.concise == false ? 
                args.width - args.right - args.buffer :
                args.scales.X(args.scales.X.ticks(args.xax_count)[last_i]))
            .attr('y1', args.height - args.bottom)
            .attr('y2', args.height - args.bottom);
    }

    //add x ticks
    g.selectAll('.xax-ticks')
        .data(args.scales.X.ticks(args.xax_count)).enter()
            .append('line')
                .attr('x1', args.scales.X)
                .attr('x2', args.scales.X)
                .attr('y1', args.height - args.bottom)
                .attr('y2', function() {
                    return (args.x_extended_ticks)
                        ? args.top
                        : args.height - args.bottom + args.xax_tick;
                })
                .attr('class', function() {
                    if(args.x_extended_ticks)
                        return 'extended-x-ticks';
                });
    g.selectAll('.xax-labels')
        .data(args.scales.X.ticks(args.xax_count)).enter()
            .append('text')
                .attr('x', args.scales.X)
                .attr('y', args.height - args.bottom + args.xax_tick * 7 / 3)
                .attr('dy', '.50em')
                .attr('text-anchor', 'middle')
                .text(function(d) {
                    return args.xax_units + args.xax_format(d);
                })

    //are we adding years to x-axis
    if (args.time_series && args.show_years) {
        var min_x;
        var max_x;

        for (var i=0; i<args.data.length; i++) {
            last_i = args.data[i].length-1;

            if(args.data[i][0][args.x_accessor] < min_x || !min_x)
                min_x = args.data[i][0][args.x_accessor];
            if(args.data[i][last_i][args.x_accessor] > max_x || !max_x)
                max_x = args.data[i][last_i][args.x_accessor];
        }

        var years = d3.time.years(min_x, max_x);

        if (years.length == 0){
            var first_tick = args.scales.X.ticks(args.xax_count)[0];
            years = [first_tick];
        }

        //append year marker to x-axis group
        g = g.append('g')
            .classed('year-marker', true)
            .classed('year-marker-small', args.use_small_class); 

        g.selectAll('.year_marker')
            .data(years).enter()
                .append('line')
                    .attr('x1', args.scales.X)
                    .attr('x2', args.scales.X)
                    .attr('y1', args.top)
                    .attr('y2', args.height - args.bottom);

        var yformat = d3.time.format('%Y');
        g.selectAll('.year_marker')
            .data(years).enter()
                .append('text')
                    .attr('x', args.scales.X)
                    .attr('y', args.height - args.buffer + args.xax_tick)
                    .attr('dy', args.use_small_class ? -3 : (args.y_extended_ticks) ? -6 : 0 )
                    .attr('text-anchor', 'middle')
                    .text(function(d) {
                        return yformat(d);
                    });
    };    

    return this;
}

function init(args) {
    var defaults = {
        target: null,
        title: null,
        description: null
    };

    var args = arguments[0];
    if (!args) { args = {}; }
    args = merge_with_defaults(args, defaults);

    //this is how we're dealing with passing in a single array of data, 
    //but with the intention of using multiple values for multilines, etc.

    //do we have a time_series?
    if($.type(args.data[0][0][args.x_accessor]) == 'date') {
        args.time_series = true;
    }
    else {
        args.time_series = false;
    }

    var linked;

    //add svg if it doesn't already exist
    if($(args.target).is(':empty')) {
        //add svg
        d3.select(args.target)
            .append('svg')
                .classed('linked', args.linked)
                .attr('width', args.width)
                .attr('height', args.height);
    }

    var svg = d3.select(args.target).selectAll('svg');

    // remove missing class
    svg.classed('missing', false);
    // remove missing text
    svg.selectAll('.missing-text').remove();

    //add chart title if it's different than existing one
    chart_title(args);

    //we kind of need axes in all cases
    args.use_small_class = args.height - args.top - args.bottom - args.buffer 
            <= args.small_height_threshold 
        && args.width - args.left-args.right - args.buffer*2 
            <= args.small_width_threshold 
        || args.small_text;

    //draw axes


    //if we're updating an existing chart and we have fewer lines than
    //before, remove the outdated lines, e.g. if we had 3 lines, and we're calling
    //moz_chart() on the same target with 2 lines, remove the 3rd line
    if(args.data.length < $(args.target + ' svg .main-line').length) {
        //now, the thing is we can't just remove, say, line3 if we have a custom
        //line-color map, instead, see which are the lines to be removed, and delete those    
        if(args.custom_line_color_map.length > 0) {
            var array_full_series = function(len) {
                var arr = new Array(len);
                for(var i=0;i<arr.length;i++) { arr[i] = i+1; }
                return arr;
            }

            //get an array of lines ids to remove
            var lines_to_remove = arrDiff(
                array_full_series(args.max_data_size), 
                args.custom_line_color_map);

            for(var i=0; i<lines_to_remove.length; i++) {
                $(args.target + ' svg .main-line.line' + lines_to_remove[i] + '-color')
                    .remove();
            }
        }
        //if we don't have a customer line-color map, just remove the lines from the end
        else {
            var num_of_new = args.data.length;
            var num_of_existing = $(args.target + ' svg .main-line').length;

            for(var i=num_of_existing; i>num_of_new; i--) {
                $(args.target + ' svg .main-line.line' + i + '-color').remove();
            }
        }
    }

    return this;
}

function markers(args) {
    var svg = d3.select(args.target + ' svg');
    var gm;
    var gb;

    if(args.markers) {
        if($(args.target + ' svg .markers').length > 0) {
            $(args.target + ' svg .markers')
                .remove();
        }

        gm = svg.append('g')
            .attr('class', 'markers');

        gm.selectAll('.markers')
            .data(args.markers)
            .enter().append('line')
                .attr('x1', function(d) {
                    return args.scales.X(d[args.x_accessor])
                })
                .attr('x2', function(d) {
                    return args.scales.X(d[args.x_accessor])
                })
                .attr('y1', args.top)
                .attr('y2', function() {
                    return args.height - args.bottom - args.buffer;
                })
                .attr('stroke-dasharray', '3,1');

        gm.selectAll('.markers')
            .data(args.markers)
            .enter().append('text')
                .attr('x', function(d) {
                    return args.scales.X(d[args.x_accessor])
                })
                .attr('y', args.top - 8)
                .attr('text-anchor', 'middle')
                .text(function(d) {
                    return d['label'];
                });
    }

    if(args.baselines) {
        svg.selectAll('.baselines').remove();
        gb = svg.append('g')
            .attr('class', 'baselines');

        gb.selectAll('.baselines')
            .data(args.baselines)
            .enter().append('line')
                .attr('x1', args.left + args.buffer)
                .attr('x2', args.width-args.right-args.buffer)
                .attr('y1', function(d){
                    return args.scales.Y(d['value'])})
                .attr('y2', function(d){return args.scales.Y(d['value'])});

        gb.selectAll('.baselines')
            .data(args.baselines)
            .enter().append('text')
                .attr('x', args.width-args.right - args.buffer)
                .attr('y', function(d){return args.scales.Y(d['value'])})
                .attr('dy', -3)
                .attr('text-anchor', 'end')
                .text(function(d) {
                    return d['label'];
                });
    }

    return this;
}

var button_layout = function(target){
    this.target = target;
    this.feature_set = {};
    this.public_name = {};
    this.sorters = {};

    this.data = function(data){
        this._data = data;
        return this;
    }

    this.button = function(feature){
        var sorter, the_label;
        if (arguments.length>1) {
            this.public_name[feature] = arguments[1];
        } 
        if (arguments.length>2) {
            this.sorters[feature] = arguments[2];
        }

        this.feature_set[feature] = [];
        return this;
    }

    this.callback = function(callback){
        this._callback = callback;
        return this;
    }

    this.display = function(){
        var callback = this._callback;
        var d,f, features, feat;
        features = Object.keys(this.feature_set);
        // build out this.feature_set with this.data.
        for (var i=0; i < this._data.length; i++){
            d = this._data[i];
            f = features.map(function(f){return d[f]});
            for (var j=0;j<features.length;j++){
                feat=features[j]; 
                //if (!this.feature_set.hasOwnProperty(feat))     this.feature_set[feat]=[];
                if (this.feature_set[feat].indexOf(f[j])==-1)   this.feature_set[feat].push(f[j]);
            }
        }
        for (var feat in this.feature_set){
            if (this.sorters.hasOwnProperty(feat)){
                this.feature_set[feat].sort(this.sorters[feat]);
            }
        }
        // for (var k in Object.keys(this.sorters)){
        //     if (this.sorters[k] != null){
        //         // this.feature_set.
        //     }
        // }
        $(this.target).empty();
        
        $(this.target).append("<div class='col-lg-12 segments text-center'></>");
        for (var feature in this.feature_set){
            features = this.feature_set[feature];
            $(this.target + ' div.segments').append(
                '<div class="btn-group '+strip_punctuation(feature)+'-btns text-left">'+
                    '<button type="button" class="btn btn-default btn-lg dropdown-toggle" data-toggle="dropdown">' +
                        "<span class='which-button'>" + (this.public_name.hasOwnProperty(feature) ? this.public_name[feature] : feature) +"</span>" +
                        "<span class='title'>all</span>" +
                        '<span class="caret"></span>' + 
                    '</button>' +
                    '<ul class="dropdown-menu" role="menu">' +
                        '<li><a href="#" data-feature="'+feature+'" data-key="all">All</a></li>' +
                        '<li class="divider"></li>' +
                    '</ul>'
            + '</div>');
            for (var i=0;i<features.length;i++){
                if (features[i] != 'all'){
                    $(this.target + ' div.' + strip_punctuation(feature) + '-btns ul.dropdown-menu').append(
                    '<li><a href="#" data-feature="' + strip_punctuation(feature) + '" data-key="' + features[i] + '">' 
                        + features[i] + '</a></li>'
                    ); 
                }
            };
            $('.'+ strip_punctuation(feature) + '-btns .dropdown-menu li a').on('click', function() {
                var k = $(this).data('key'); 
                var feature = $(this).data('feature');
                $('.' + strip_punctuation(feature) + '-btns button.btn span.title').html(k);
                callback(feature, k);
                return false;
            })
        }

        return this;
    }

    return this
}

charts.line = function(args) {
    this.args = args;

    this.init = function(args) {
        raw_data_transformation(args);
        process_line(args);
        init(args);
        x_axis(args);
        y_axis(args);
        return this;
    }

    this.mainPlot = function() {
        var svg = d3.select(args.target + ' svg');
        var g;
        var data_median = 0;

        //main area
        var area = d3.svg.area()
            .x(args.scalefns.xf)
            .y0(args.scales.Y.range()[0])
            .y1(args.scalefns.yf)
            .interpolate(args.interpolate);

        //confidence band
        var confidence_area;
        if(args.show_confidence_band) {
            var confidence_area = d3.svg.area()
                .x(args.scalefns.xf)
                .y0(function(d) {
                    var l = args.show_confidence_band[0];
                    return args.scales.Y(d[l]);
                })
                .y1(function(d) {
                    var u = args.show_confidence_band[1];
                    return args.scales.Y(d[u]);
                })
                .interpolate(args.interpolate);
        }

        //main line
        var line = d3.svg.line()
            .x(args.scalefns.xf)
            .y(args.scalefns.yf)
            .interpolate(args.interpolate);

        //for animating line on first load
        var flat_line = d3.svg.line()
            .x(args.scalefns.xf)
            .y(function() { return args.scales.Y(data_median); })
            .interpolate(args.interpolate);

        for(var i=args.data.length-1; i>=0; i--) {
            //override increment if we have a custom increment series
            var line_id = i+1;
            if(args.custom_line_color_map.length > 0) {
                line_id = args.custom_line_color_map[i];
            }

            //add confidence band
            if(args.show_confidence_band) {
                svg.append('path')
                    .attr('class', 'confidence-band')
                    .attr('d', confidence_area(args.data[i]));
            }

            //add the area
            if(args.area && !args.y_axis_negative && args.data.length <= 1) {
                //if area already exists, transition it
                if($(args.target + ' svg path.area' + (line_id) + '-color').length > 0) {
                    d3.selectAll(args.target + ' svg path.area' + (line_id) + '-color')
                        .transition()
                            .duration(function() {
                                return (args.transition_on_update) ? 1000 : 0;
                            })
                            .attr('d', area(args.data[i]));
                }
                else { //otherwise, add the area
                    svg.append('path')
                        .attr('class', 'main-area ' + 'area' + (line_id) + '-color')
                        .attr('d', area(args.data[i]));
                }
            }

            //add the line, if it already exists, transition the fine gentleman
            if($(args.target + ' svg path.line' + (line_id) + '-color').length > 0) {
                d3.selectAll(args.target + ' svg path.line' + (line_id) + '-color')
                    .transition()
                        .duration(function() {
                            return (args.transition_on_update) ? 1000 : 0;
                        })
                        .attr('d', line(args.data[i]));
            }
            else { //otherwise...
                //if we're animating on load, animate the line from its median value
                if(args.animate_on_load) {
                    data_median = d3.median(args.data[i], function(d) {
                        return d[args.y_accessor];
                    })

                    svg.append('path')
                        .attr('class', 'main-line ' + 'line' + (line_id) + '-color')
                        .attr('d', flat_line(args.data[i]))
                        .transition()
                            .duration(1000)
                            .attr('d', line(args.data[i]));
                }
                else { //or just add the line
                    svg.append('path')
                        .attr('class', 'main-line ' + 'line' + (line_id) + '-color')
                        .attr('d', line(args.data[i]));
                }
            }
        }	    

        return this;
    }

    this.markers = function() {
        markers(args);
        return this;
    };

    this.rollover = function() {
        var svg = d3.select(args.target + ' svg');
        var g;

        //remove the old rollovers if they already exist
        if($(args.target + ' svg .transparent-rollover-rect').length > 0) {
            $(args.target + ' svg .transparent-rollover-rect').remove();
        }
        if($(args.target + ' svg .voronoi').length > 0) {
            $(args.target + ' svg .voronoi').remove();
        }

        //rollover text
        svg.append('text')
            .attr('class', 'active_datapoint')
            .attr('xml:space', 'preserve')
            .attr('x', args.width - args.right)
            .attr('y', args.top / 2)
            .attr('text-anchor', 'end');
                
        //append circle
        svg.append('circle')
            .classed('line_rollover_circle', true)
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 0);

        //update our data by setting a unique line id for each series
        //increment from 1... unless we have a custom increment series
        var line_id = 1;

        for(var i=0;i<args.data.length;i++) {
            for(var j=0;j<args.data[i].length;j++) {
                //if custom line-color map is set, use that instead of line_id
                if(args.custom_line_color_map.length > 0) {
                    args.data[i][j]['line_id'] = args.custom_line_color_map[i];
                }
                else {
                    args.data[i][j]['line_id'] = line_id;
                }
            }
            line_id++;
        }

        //for multi-line, use voronoi
        if(args.data.length > 1) {
            //main rollover
            var voronoi = d3.geom.voronoi()
                .x(function(d) { return args.scales.X(d[args.x_accessor]); })
                .y(function(d) { return args.scales.Y(d[args.y_accessor]); });
        
            var g = svg.append('g')
                .attr('class', 'voronoi')

            //we'll be using these when constructing the voronoi rollovers
            var data_nested = d3.nest()
                .key(function(d) { return args.scales.X(d[args.x_accessor]) + "," + args.scales.Y(d[args.y_accessor]); })
                .rollup(function(v) { return v[0]; })
                .entries(d3.merge(args.data.map(function(d) { return d; })))
                .map(function(d) { return d.values; });

            //add the voronoi rollovers
            g.selectAll('path')
                .data(voronoi(data_nested))
                .enter()
                    .append('path')
                        .attr("d", function(d) { return "M" + d.join("L") + "Z"; })
                        .datum(function(d) { return d.point; }) //because of d3.nest, reassign d
                        .attr('class', function(d) {
                            if(args.linked) {
                                var v = d[args.x_accessor];
                                var formatter = d3.time.format('%Y-%m-%d');
                                
                                return 'line' + d['line_id'] + '-color ' + 'roll_' + formatter(v);
                            }
                            else {
                                return 'line' + d['line_id'] + '-color';
                            }
                        })
                        .on('mouseover', this.rolloverOn(args))
                        .on('mouseout', this.rolloverOff(args));
        }
        //for single line, use rects
        else {
            //set to 1 unless we have a custom increment series
            var line_id = 1;
            if(args.custom_line_color_map.length > 0) {
                line_id = args.custom_line_color_map[0];
            }

            var g = svg.append('g')
                .attr('class', 'transparent-rollover-rect')

            var xf = args.data[0].map(args.scalefns.xf);

            g.selectAll('.rollover-rects')
                .data(args.data[0]).enter()
                    .append('rect')
                        .attr('class', function(d, i) {
                            if(args.linked) {
                                var v = d[args.x_accessor];
                                var formatter = d3.time.format('%Y-%m-%d');
                                
                                //only format when y-axis is date
                                var id = (typeof v === 'number')
                                        ? i
                                        : formatter(v);
                                        
                                return 'line' + line_id + '-color ' + 'roll_' + id;
                            }
                            else {
                                return 'line' + line_id + '-color';
                            }
                        })
                        .attr('x', function(d, i) {
                            if (i == 0) {
                                return xf[i];
                            } else {
                                return (xf[i-1] + xf[i])/2;
                            }
                        })
                        .attr('y', function(d, i) {
                            return (args.data.length > 1)
                                ? args.scalefns.yf(d) - 6 //multi-line chart sensitivity
                                : args.top;
                        })
                        .attr('width', function(d, i) {
                            if (i == 0) {
                                return (xf[i+1] - xf[i])/2;
                            } else if (i == xf.length - 1) {
                                return (xf[i] - xf[i-1])/2;
                            } else {
                                return (xf[i+1] - xf[i-1])/2;
                            }
                        })
                        .attr('height', function(d, i) {
                            return (args.data.length > 1)
                                ? 12 //multi-line chart sensitivity
                                : args.height - args.bottom - args.top - args.buffer;
                        })
                        .attr('opacity', 0)
                        .on('mouseover', this.rolloverOn(args))
                        .on('mouseout', this.rolloverOff(args));
        }

        return this;
    }

    this.rolloverOn = function(args) {
        var svg = d3.select(args.target + ' svg');
        var x_formatter = d3.time.format('%Y-%m-%d');

        return function(d, i) {
            //show circle on mouse-overed rect
            svg.selectAll('circle.line_rollover_circle')
                .attr('class', "")
                .attr('class', 'area' + d['line_id'] + '-color')
                .classed('line_rollover_circle', true)
                .attr('cx', function() {
                    return args.scales.X(d[args.x_accessor]);
                })
                .attr('cy', function() {
                    return args.scales.Y(d[args.y_accessor]);
                })
                .attr('r', args.point_size)
                .style('opacity', 1);
     
            //trigger mouseover on all rects for this date in .linked charts
            if(args.linked && !globals.link) {
                globals.link = true;

                var v = d[args.x_accessor];
                var formatter = d3.time.format('%Y-%m-%d');

                //only format when y-axis is date
                var id = (typeof v === 'number')
                        ? i
                        : formatter(v);

                //trigger mouseover on matching line in .linked charts
                d3.selectAll('.line' + d['line_id'] + '-color.roll_' + id)
                    .each(function(d, i) {
                        d3.select(this).on('mouseover')(d,i);
                })
            }    

            svg.selectAll('text')
                .filter(function(g, j) {
                    return d == g;
                })
                .attr('opacity', 0.3);

            var fmt = d3.time.format('%b %e, %Y');

            if (args.format == 'count') {
                var num = function(d_) {
                    var is_float = d_ % 1 != 0;
                    var n = d3.format("0,000");
                    d_ = is_float ? d3.round(d_, args.decimals) : d_;
                    return n(d_);
                }
            }
            else {
                var num = function(d_) {
                    var fmt_string = (args.decimals ? '.' + args.decimals : '' ) + '%';
                    var n = d3.format(fmt_string);
                    return n(d_);
                }
            }

            //update rollover text
            if (args.show_rollover_text) {
                svg.select('.active_datapoint')
                    .text(function() {
                        if(args.time_series) {
                            var dd = new Date(+d[args.x_accessor]);
                            dd.setDate(dd.getDate());

                            return fmt(dd) + '  ' + args.yax_units 
                                + num(d[args.y_accessor]);
                        }
                        else {
                            return args.x_accessor + ': ' + d[args.x_accessor] 
                                + ', ' + args.y_accessor + ': ' + args.yax_units 
                                + num(d[args.y_accessor]);
                        }
                    });                
            }

            if(args.rollover_callback) {
                args.rollover_callback(d, i);
            }
        }
    }

    this.rolloverOff = function(args) {
        var svg = d3.select(args.target + ' svg');

        return function(d, i) {
            if(args.linked && globals.link) {
                globals.link = false;

                var v = d[args.x_accessor];
                var formatter = d3.time.format('%Y-%m-%d');

                //only format when y-axis is date
                var id = (typeof v === 'number')
                        ? i
                        : formatter(v);

                d3.selectAll('.roll_' + id)
                    .each(function(d, i){
                        d3.select(this).on('mouseout')(d);
                });
            }

            //remove active datapoint text on mouse out
            svg.selectAll('circle.line_rollover_circle')
                .style('opacity', 0);

            svg.select('.active_datapoint')
                .text('');
        }
    }

    this.init(args);
    return this;
}

charts.histogram = function(args) {
    this.args = args;

    this.init = function(args) {
        raw_data_transformation(args);
        process_histogram(args);
        init(args);
        x_axis(args);
        y_axis(args);
        return this;
    }

    this.mainPlot = function() {
        var svg = d3.select(args.target + ' svg');
        var g;

        //remove the old histogram, add new one
        if($(args.target + ' svg .histogram').length > 0) {
            $(args.target + ' svg .histogram')
                .remove();
        }

        var g = svg.append("g")
            .attr("class", "histogram");

        var bar = g.selectAll(".bar")
            .data(args.data[0])
                .enter().append("g")
                    .attr("class", "bar")
                    .attr("transform", function(d) {
                        return "translate(" + args.scales.X(d[args.x_accessor]) 
                            + "," + args.scales.Y(d[args.y_accessor]) + ")";
                        });

        //draw bars
        bar.append("rect")
            .attr("x", 1)
            .attr("width", function(d, i) {
                return args.scalefns.xf(args.data[0][1])
                    - args.scalefns.xf(args.data[0][0])
                    - args.bar_margin;
            })
            .attr("height", function(d) {
                if(d[args.y_accessor] == 0)
                    return 0;

                return args.height - args.bottom - args.buffer 
                    - args.scales.Y(d[args.y_accessor]);
            });

        return this;
    }

    this.markers = function() {
        markers(args);
        return this;
    };

    this.rollover = function() {
        var svg = d3.select(args.target + ' svg');
        var g;
        
        //remove the old rollovers if they already exist
        if($(args.target + ' svg .transparent-rollover-rect').length > 0) {
            $(args.target + ' svg .transparent-rollover-rect').remove();
        }
        if($(args.target + ' svg .active_datapoint').length > 0) {
            $(args.target + ' svg .active_datapoint').remove();
        }

        //rollover text
        svg.append('text')
            .attr('class', 'active_datapoint')
            .attr('xml:space', 'preserve')
            .attr('x', args.width - args.right)
            .attr('y', args.top / 2)
            .attr('text-anchor', 'end');

        var g = svg.append('g')
            .attr('class', 'transparent-rollover-rect')

        //draw rollover bars
        var bar = g.selectAll(".bar")
            .data(args.data[0])
                .enter().append("g")
                    .attr("class", "rollover-rects")
                    .attr("transform", function(d) {
                        return "translate(" + (args.scales.X(d[args.x_accessor])) + "," + 0 + ")";
                    });

        bar.append("rect")
            .attr("x", 1)
            .attr("y", 0)
            .attr("width", function(d, i) {
                if (i != args.data[0].length - 1) {
                    return args.scalefns.xf(args.data[0][i + 1]) 
                        - args.scalefns.xf(d);
                }
                else {
                    return args.scalefns.xf(args.data[0][1])
                        - args.scalefns.xf(args.data[0][0]);
                }
            })
            .attr("height", function(d) {
                return args.height;
            })
            .attr('opacity', 0)
            .on('mouseover', this.rolloverOn(args))
            .on('mouseout', this.rolloverOff(args));
    }

    this.rolloverOn = function(args) {
        var svg = d3.select(args.target + ' svg');
        var x_formatter = d3.time.format('%Y-%m-%d');

        return function(d, i) {
            svg.selectAll('text')
                .filter(function(g, j) {
                    return d == g;
                })
                .attr('opacity', 0.3);

            var fmt = d3.time.format('%b %e, %Y');
        
            if (args.format == 'count') {
                var num = function(d_) {
                    var is_float = d_ % 1 != 0;
                    var n = d3.format("0,000");
                    d_ = is_float ? d3.round(d_, args.decimals) : d_;
                    return n(d_);
                }
            }
            else {
                var num = function(d_) {
                    var fmt_string = (args.decimals ? '.' + args.decimals : '' ) + '%';
                    var n = d3.format(fmt_string);
                    return n(d_);
                }
            }

            //highlight active bar
            d3.selectAll($(args.target + ' svg .bar :eq(' + i + ')'))
                .classed('active', true);

            //update rollover text
            if (args.show_rollover_text) {
                svg.select('.active_datapoint')
                    .text(function() {
                        if(args.time_series) {
                            var dd = new Date(+d[args.x_accessor]);
                            dd.setDate(dd.getDate());
                            
                            return fmt(dd) + '  ' + args.yax_units 
                                + num(d[args.y_accessor]);
                        }
                        else {
                            return args.x_accessor + ': ' + num(d[args.x_accessor]) 
                                + ', ' + args.y_accessor + ': ' + args.yax_units 
                                + num(d[args.y_accessor]);
                        }
                    });                
            }

            if(args.rollover_callback) {
                args.rollover_callback(d, i);
            }
        }
    }

    this.rolloverOff = function(args) {
        var svg = d3.select(args.target + ' svg');

        return function(d, i) {
            //reset active bar
            d3.selectAll($(args.target + ' svg .bar :eq(' + i + ')'))
                .classed('active', false);
            
            //reset active data point text
            svg.select('.active_datapoint')
                .text('');
        }
    }

    this.init(args);
    return this;
}

charts.point = function(args) {
    this.args = args;

    this.init = function(args) {
        raw_data_transformation(args);
        process_point(args);
        init(args);
        x_axis(args);
        y_axis(args);
        return this;
    }

    this.markers = function() {
        markers(args);
        if (args.least_squares){
            add_ls(args);
        }
        // if (args.lowess){
        //     add_lowess(args);
        // }
        return this
    }

    this.mainPlot = function() {
        var svg = d3.select(args.target + ' svg');
        var g;

        // plot the points, pretty straight-forward
        g = svg.append('g')
            .classed('points', true);

        g.selectAll('circle')
            .data(args.data[0])
            .enter().append('svg:circle')
                .attr('cx', args.scalefns.xf)
                .attr('cy', args.scalefns.yf)
                .attr('r', 2);

        return this;
    }

    this.rollover = function() {
        var svg = d3.select(args.target + ' svg');

        var clips = svg.append('g')
                .attr('id', 'point-clips');

        var paths = svg.append('g')
            .attr('id', 'point-paths');

        //remove rollover text if it already exists
        if($(args.target + ' svg .active_datapoint').length > 0) {
            $(args.target + ' svg .active_datapoint').remove();
        }
        
        //add rollover text
        svg.append('text')
            .attr('class', 'active_datapoint')
            .attr('xml:space', 'preserve')
            .attr('x', args.width - args.right)
            .attr('y', args.top / 2)
            .attr('text-anchor', 'end');
        
        clips.selectAll('clipPath')
            .data(args.data[0])
                .enter().append('clipPath')
                    .attr('id', function(d, i) { return 'clip-'+i;})
                    .append('circle')
                        .attr('cx', args.scalefns.xf)
                        .attr('cy', args.scalefns.yf)
                        .attr('r', 20);

        var voronoi = d3.geom.voronoi()
            .x(args.scalefns.xf)
            .y(args.scalefns.yf);

        paths.selectAll('path')
            .data(voronoi(args.data[0]))
            .enter().append('path')
                .attr('d', function(d) { 
                    return 'M' + d.join(',') + 'Z';
                })
                .attr('id', function(d,i) { 
                    return 'path-' + i;
                })
                .attr('clip-path', function(d,i) {
                    return 'url(#clip-'+i+')';
                })
                .style('fill-opacity', 0)
                .on('mouseover', this.rolloverOn(args))
                .on('mouseout', this.rolloverOff(args));

        return this;
    }

    this.rolloverOn = function(args) {
        var svg = d3.select(args.target + ' svg');

        return function(d, i){
            svg.selectAll('.points circle')
                .classed('unselected', true);

            var fmt = d3.time.format('%b %e, %Y');
        
            if (args.format == 'count') {
                var num = function(d_) {
                    var is_float = d_ % 1 != 0;
                    var n = d3.format("0,000");
                    d_ = is_float ? d3.round(d_, args.decimals) : d_;
                    return n(d_);
                }
            }
            else {
                var num = function(d_) {
                    var fmt_string = (args.decimals ? '.' + args.decimals : '' ) + '%';
                    var n = d3.format(fmt_string);
                    return n(d_);
                }
            }

            //highlight active point
            svg.selectAll('.points circle')
                .filter(function(g,j){return i == j})
                .classed('unselected', false)
                .classed('selected', true)
                .attr('r', 3);

            //update rollover text
            if (args.show_rollover_text) {
                svg.select('.active_datapoint')
                    .text(function() {
                        if(args.time_series) {
                            var dd = new Date(+d['point'][args.x_accessor]);
                            dd.setDate(dd.getDate());
                            
                            return fmt(dd) + '  ' + args.yax_units 
                                + num(d['point'][args.y_accessor]);
                        }
                        else {
                            return args.x_accessor + ': ' + num(d['point'][args.x_accessor]) 
                                + ', ' + args.y_accessor + ': ' + args.yax_units 
                                + num(d['point'][args.y_accessor]);
                        }
                    });                
            }
        }
    }

    this.rolloverOff = function(args) {
        var svg = d3.select(args.target + ' svg');

        return function(d,i){
            //reset active point
            svg.selectAll('.points circle')
                .classed('unselected', false)
                .classed('selected', false)
                .attr('r', 2);

            //reset active data point text
            svg.select('.active_datapoint')
                .text('');
        }
    }

    this.update = function(args) {
        return this;
    }

    this.init(args);

    return this;
}

// BARCHART:
// x - function that processes data
//     - pass in a feature name, get a count
//     - have raw feature: value function
// - need a way of changing the y axis and x axis
// - need to sort out rollovers
charts.bar = function(args) {
    this.args = args;

    this.init = function(args) {
        raw_data_transformation(args);
        process_categorical_variables(args);
        init(args);
        x_axis(args);
        y_axis_categorical(args);
        return this;
    }

    this.mainPlot = function() {
        var svg = d3.select(args.target + ' svg');
        var g;

        //remove the old histogram, add new one
        if($(args.target + ' svg .barplot').length > 0) {
            $(args.target + ' svg .barplot')
                .remove();
        }

        var data = args.data[0];
        var g = svg.append('g')
            .classed('barplot', true);

        g.selectAll('.bar')
            .data(data).enter().append('rect')
            .classed('bar', true)
            .attr('x', args.scales.X(0))
            .attr('y', args.scalefns.yf)
            .attr('height', args.scales.Y.rangeBand())
            .attr('width', function(d){ return args.scalefns.xf(d) - args.scales.X(0)});

        return this;
    }

    this.markers = function() {
        markers(args);
        return this;
    };

    this.rollover = function() {
        var svg = d3.select(args.target + ' svg');
        var g;
        
        //remove the old rollovers if they already exist
        if($(args.target + ' svg .transparent-rollover-rect').length > 0) {
            $(args.target + ' svg .transparent-rollover-rect').remove();
        }
        if($(args.target + ' svg .active_datapoint').length > 0) {
            $(args.target + ' svg .active_datapoint').remove();
        }

        //rollover text
        svg.append('text')
            .attr('class', 'active_datapoint')
            .attr('xml:space', 'preserve')
            .attr('x', args.width - args.right)
            .attr('y', args.top / 2)
            .attr('dy', '.35em')
            .attr('text-anchor', 'end');

        var g = svg.append('g')
            .attr('class', 'transparent-rollover-rect')

        //draw rollover bars
        var bar = g.selectAll(".bar")
            .data(args.data[0])
                .enter().append("rect")
                    .attr("x", args.scales.X(0))
                    .attr("y", args.scalefns.yf)
                    .attr('width', args.width)
                    .attr('height', args.scales.Y.rangeBand()+2)
                    .attr('opacity', 0)
                    .on('mouseover', this.rolloverOn(args))
                    .on('mouseout', this.rolloverOff(args));
    }

    this.rolloverOn = function(args) {
        var svg = d3.select(args.target + ' svg');
        var x_formatter = d3.time.format('%Y-%m-%d');

        return function(d, i) {
            svg.selectAll('text')
                .filter(function(g, j) {
                    return d == g;
                })
                .attr('opacity', 0.3);

            var fmt = d3.time.format('%b %e, %Y');
        
            if (args.format == 'count') {
                var num = function(d_) {
                    var is_float = d_ % 1 != 0;
                    var n = d3.format("0,000");
                    d_ = is_float ? d3.round(d_, args.decimals) : d_;
                    return n(d_);
                }
            }
            else {
                var num = function(d_) {
                    var fmt_string = (args.decimals ? '.' + args.decimals : '' ) + '%';
                    var n = d3.format(fmt_string);
                    return n(d_);
                }
            }

            //highlight active bar
            d3.selectAll($(args.target + ' svg g.barplot .bar:eq(' + i + ')'))
                .classed('active', true);

            //update rollover text
            if (args.show_rollover_text) {
                svg.select('.active_datapoint')
                    .text(function() {
                        if(args.time_series) {
                            var dd = new Date(+d[args.x_accessor]);
                            dd.setDate(dd.getDate());
                            
                            return fmt(dd) + '  ' + args.yax_units 
                                + num(d[args.y_accessor]);
                        }
                        else {
                            return d[args.y_accessor] + ': ' + num(d[args.x_accessor]);
                        }
                    });                
            }

            if(args.rollover_callback) {
                args.rollover_callback(d, i);
            }
        }
    }

    this.rolloverOff = function(args) {
        var svg = d3.select(args.target + ' svg');

        return function(d, i) {
            //reset active bar
            d3.selectAll($(args.target + ' svg g.barplot .bar:eq(' + i + ')'))
                .classed('active', false);
            
            //reset active data point text
            svg.select('.active_datapoint')
                .text('');
        }
    }

    this.init(args);
    return this;
}

charts.missing = function(args) {
    this.args = args;

    this.init = function(args) {
        chart_title(args);

        // create svg if one doesn't exist
        d3.select(args.target).selectAll('svg').data([args])
          .enter().append('svg')
            .attr('width', args.width)
            .attr('height', args.height);

        // delete child elements
        d3.select(args.target).selectAll('svg *').remove()

        var svg = d3.select(args.target).select('svg')

        // add missing class
        svg.classed('missing', true);

        svg.append('rect')
            .attr('class', 'missing-pane')
            .attr('x', args.left)
            .attr('y', args.top)
            .attr('width', args.width - (args.left * 2))
            .attr('height', args.height - (args.top * 2));

        var missing_text = 'Data currently missing or unavailable';

        // add missing text
        svg.selectAll('.missing_text').data([missing_text])
          .enter().append('text')
            .attr('class', 'missing-text')
            .attr('x', args.width / 2)
            .attr('y', args.height / 2)
            .attr('dy', '.50em')
            .attr('text-anchor', 'middle')
            .text(missing_text)  

        return this;
    }

    this.init(args);
    return this;
}

function raw_data_transformation(args){
    //do we need to turn json data to 2d array?

    if(!$.isArray(args.data[0]))
        args.data = [args.data];
    //

    if ($.isArray(args.y_accessor)){
        args.data = args.data.map(function(_d){
            return args.y_accessor.map(function(ya){
                return _d.map(function(di){
                    di = clone(di);
                    di['multiline_y_accessor'] = di[ya];
                    return di;
                })
            })
        })[0];
        args.y_accessor = 'multiline_y_accessor';
    }

    //sort x-axis data.
    if (args.chart_type == 'line'){
        for(var i=0; i<args.data.length; i++) {
            args.data[i].sort(function(a, b) {
                return a[args.x_accessor] - b[args.x_accessor];
            });
        }
    }
    return this
}

function process_line(args){
    return this;
}

function process_histogram(args){
    // if args.binned=False, then we need to bin the data appropriately.
    // if args.binned=True, then we need to make sure to compute the relevant computed data.
    // the outcome of either of these should be something in args.computed_data.
    // the histogram plotting function will be looking there for the data to plot.

    // we need to compute an array of objects.
    // each object has an x, y, and dx.

    // histogram data is always single dimension
    var our_data = args.data[0];
    var extracted_data;
    if (args.binned==false){
        // use d3's built-in layout.histogram functionality to compute what you need.

        if (typeof(our_data[0]) == 'object'){
            // we are dealing with an array of objects. Extract the data value of interest.
            extracted_data = our_data
                .map(function(d){ 
                    return d[args.x_accessor];
                });
        } else if (typeof(our_data[0]) == 'number'){
            // we are dealing with a simple array of numbers. No extraction needed.
            extracted_data = our_data;
        } 
        else {
            console.log('TypeError: expected an array of numbers, found ' + typeof(our_data[0]));
            return;
        }

        var hist = d3.layout.histogram()
        if (args.bins){
            hist = hist.bins(args.bins);
        }
        args.processed_data = hist(extracted_data)
            .map(function(d){
                // extract only the data we need per data point.
                return {'x': d['x'], 'y':d['y'], 'dx': d['dx']};
            })
    } else {
        // here, we just need to reconstruct the array of objects
        // take the x accessor and y accessor.
        // pull the data as x and y. y is count.

        args.processed_data = our_data.map(function(d){
            return {'x': d[args.x_accessor], 'y': d[args.y_accessor]}
        });
        var this_pt;
        var next_pt;
        // we still need to compute the dx component for each data point
        for (var i=0; i < args.processed_data.length; i++){
            this_pt = args.processed_data[i];
            if (i == args.processed_data.length-1){
                this_pt.dx = args.processed_data[i-1].dx;
            } else {
                next_pt = args.processed_data[i+1];
                this_pt.dx = next_pt.x - this_pt.x;
            }
        }
    }
    args.data = [args.processed_data];
    args.x_accessor = args.processed_x_accessor;
    args.y_accessor = args.processed_y_accessor;
    return this;
}

function process_categorical_variables(args){
    // For use with bar charts, etc.

    var extracted_data, processed_data={}, pd=[];
    var our_data = args.data[0];
    args.categorical_variables = [];

    if (args.binned == false){
        if (typeof(our_data[0]) == 'object') {
            // we are dealing with an array of objects. Extract the data value of interest.
            extracted_data = our_data
                .map(function(d){ 
                    return d[args.y_accessor];
                });
        } else {
            extracted_data = our_data;
        }
        var this_dp;
        for (var i=0; i< extracted_data.length; i++){
            this_dp=extracted_data[i];
            if (args.categorical_variables.indexOf(this_dp) == -1) args.categorical_variables.push(this_dp)
            if (!processed_data.hasOwnProperty(this_dp)) processed_data[this_dp]=0;
            
            processed_data[this_dp]+=1;
        }
        processed_data = Object.keys(processed_data).map(function(d){
            var obj = {};
            obj[args.x_accessor] = processed_data[d];
            obj[args.y_accessor] = d;
            return obj;
        })
    } else {
        // nothing needs to really happen here.
        processed_data = our_data;
    }
    args.data = [processed_data];
    return this;
}

function process_point(args){

    var data = args.data[0];
    var x = data.map(function(d){return d[args.x_accessor]});
    var y = data.map(function(d){return d[args.y_accessor]});
    if (args.least_squares){
        args.ls_line = least_squares(x,y);    
    }
    
    //args.lowess_line = lowess_robust(x,y, .5, 100)
    return this;

}

function add_ls(args){
    var svg = d3.select(args.target + ' svg');
    var data = args.data[0];
    //var min_x = d3.min(data, function(d){return d[args.x_accessor]});
    //var max_x = d3.max(data, function(d){return d[args.x_accessor]});
    var min_x = args.scales.X.ticks(args.xax_count)[0];
    var max_x = args.scales.X.ticks(args.xax_count)[args.scales.X.ticks(args.xax_count).length-1];
    
    svg.append('svg:line')
        .attr('x1', args.scales.X(min_x))
        .attr('x2', args.scales.X(max_x))
        .attr('y1', args.scales.Y(args.ls_line.fit(min_x)) )
        .attr('y2', args.scales.Y(args.ls_line.fit(max_x)) )
        .attr('stroke-width', 1)
        .attr('stroke', 'red');
}

function add_lowess(args){
    var svg = d3.select(args.target + ' svg');
    var lowess = args.lowess_line;

    var line = d3.svg.line()
        .x(function(d){return args.scales.X(d.x)})
        .y(function(d){return args.scales.Y(d.y)})
            .interpolate(args.interpolate);
    svg.append('path')
        .attr('d', line(lowess))
        .attr('stroke', 'red')
        .attr('fill', 'none');
}

function lowess_robust(x, y, alpha, inc){
    // Used http://www.unc.edu/courses/2007spring/biol/145/001/docs/lectures/Oct27.html
    // for the clear explanation of robust lowess.

    // calculate the the first pass.
    var _l;
    var r = [];
    var yhat = d3.mean(y);
    for (var i = 0; i < x.length; i += 1) {r.push(1)};
    _l = _calculate_lowess_fit(x,y,alpha, inc, r);
    var x_proto = _l.x;
    var y_proto = _l.y;

    // Now, take the fit, recalculate the weights, and re-run LOWESS using r*w instead of w.

    for (var i = 0; i < 100; i += 1){

        r = d3.zip(y_proto, y).map(function(yi){
        return Math.abs(yi[1] - yi[0])
        })

        var q = d3.quantile(r.sort(), .5)

        r = r.map(function(ri){
            return _bisquare_weight(ri / (6 * q))
        })

        _l = _calculate_lowess_fit(x,y,alpha,inc, r);
        x_proto = _l.x;
        y_proto = _l.y;
    }

    return d3.zip(x_proto, y_proto).map(function(d){
        var p = {};
        p.x = d[0];
        p.y = d[1];
        return p;
    });

}

function lowess(x, y, alpha, inc){
    var r = [];
    for (var i = 0; i < x.length; i += 1) {r.push(1)}
    var _l = _calculate_lowess_fit(x, y, alpha, inc, r);

}

function least_squares(x, y) {
    var xi, yi,
        _x  = 0,
        _y  = 0,
        _xy = 0,
        _xx = 0;

    var n = x.length;

    var xhat = d3.mean(x);
    var yhat = d3.mean(y);
    var numerator = 0, denominator = 0;
    var xi, yi;
    for (var i=0; i < x.length; i++){
        xi = x[i];
        yi = y[i];
        numerator += (xi - xhat) * (yi - yhat);
        denominator += (xi - xhat) * (xi - xhat)
    }

    var beta = numerator / denominator;
    var x0 = yhat - beta * xhat;


    return {
        x0:x0, 
        beta:beta, 
        fit:function(x){
            return x0 + x * beta;
    }}
}

function _pow_weight(u, w){
    if (u >= 0 && u <= 1) {
        return Math.pow(1 - Math.pow(u,w), w)
    } else {
        return 0
    }
}

function _bisquare_weight(u){
    return _pow_weight(u, 2);
}

function _tricube_weight(u){
    return _pow_weight(u, 3);
}

function _neighborhood_width(x0, xis){
    return Array.max(xis.map(function(xi){
        return Math.abs(x0 - xi)
    }))
}

function _manhattan(x1,x2){
    return Math.abs(x1-x2)
}

function _weighted_means(wxy){
    var wsum = d3.sum(wxy.map(function(wxyi){return wxyi.w}));
    
    return {
        xbar:d3.sum(wxy.map(function(wxyi){
            return wxyi.w * wxyi.x
        })) / wsum,
        ybar:d3.sum(wxy.map(function(wxyi){
            return wxyi.w * wxyi.y
        })) / wsum
    }
}

function _weighted_beta(wxy, xbar, ybar){
    var num = d3.sum(wxy.map(function(wxyi){
        return Math.pow(wxyi.w, 2) * (wxyi.x - xbar) * (wxyi.y - ybar)
    }))
    var denom = d3.sum(wxy.map(function(wxyi){
        return Math.pow(wxyi.w, 2) * (Math.pow(wxyi.x - xbar), 2)
    }))
    return num / denom;
}

function _weighted_least_squares(wxy){

    var ybar, xbar, beta_i, x0;

    var _wm = _weighted_means(wxy);

    xbar = _wm.xbar;
    ybar = _wm.ybar;

    var beta = _weighted_beta(wxy, xbar, ybar)

    return {
        beta : beta,
        xbar : xbar,
        ybar : ybar,
        x0   : ybar - beta * xbar

    }
    return num / denom
}

function _calculate_lowess_fit(x, y, alpha, inc, residuals){
    // alpha - smoothing factor. 0 < alpha < 1/
    // 
    //
    var k = Math.floor(x.length * alpha);

    var sorted_x = x.slice();

    sorted_x.sort(function(a,b){
        if (a < b) {return -1}
        else if (a > b) {return 1}
        return 0
    });
    var x_max = d3.quantile(sorted_x, .98);
    var x_min = d3.quantile(sorted_x, .02); 

    var xy = d3.zip(x, y, residuals).sort();

    var size = Math.abs(x_max - x_min) / inc;

    var smallest = x_min// - size;
    var largest = x_max// + size;
    var x_proto = d3.range(smallest, largest, size);
    
    var xi_neighbors;
    var x_i, beta_i, x0_i, delta_i, xbar, ybar;

    // for each prototype, find its fit.
    var y_proto = [];

    for (var i = 0; i < x_proto.length; i += 1){

        x_i = x_proto[i]

        // get k closest neighbors.
        xi_neighbors = xy.map(function(xyi){
            return [
                Math.abs(xyi[0] - x_i), 
                xyi[0], 
                xyi[1],
                xyi[2]]
        }).sort().slice(0, k)

        // Get the largest distance in the neighbor set.
        delta_i = d3.max(xi_neighbors)[0]

        // Prepare the weights for mean calculation and WLS.

        xi_neighbors = xi_neighbors.map(function(wxy){
            return {
                w : _tricube_weight(wxy[0] / delta_i) * wxy[3], 
                x : wxy[1], 
                y  :wxy[2]
            }})
        
        // Find the weighted least squares, obviously.
        var _output = _weighted_least_squares(xi_neighbors)

        x0_i = _output.x0;
        beta_i = _output.beta;

        // 
        y_proto.push(x0_i + beta_i * x_i)
    }
    return {x:x_proto, y:y_proto};
}

//a set of helper functions, some that we've written, others that we've borrowed
function modify_time_period(data, past_n_days) {
    //splice time period
    var data_spliced = clone(data);
    if(past_n_days != '') {
        for(var i=0; i<data_spliced.length; i++) {
            var from = data_spliced[i].length - past_n_days;
            data_spliced[i].splice(0,from);
        }
    }

    return data_spliced;
}

function convert_dates(data, x_accessor) {
    data = data.map(function(d) {
        var fff = d3.time.format('%Y-%m-%d');
        d[x_accessor] = fff.parse(d[x_accessor]);
        return d;
    });

    return data;
}

var each = function(obj, iterator, context) {
    // yanked out of underscore
    if (obj == null) return obj;
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
}

function merge_with_defaults(obj) {
    // taken from underscore
    each(Array.prototype.slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    })
    
    return obj;
}

function number_of_values(data, accessor, value) {
    var values = data.filter(function(d){
        return d[accessor] === value;
    })
    
    return values.length;
}

function has_values_below(data, accessor, value) {
    var values = data.filter(function(d){
        return d[accessor] <= value;
    })
    
    return values.length > 0;
}


function has_too_many_zeros(data, accessor, zero_count) {
    return number_of_values(data, accessor, 0) >= zero_count;
}

//deep copy
//http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object
function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }
    
    throw new Error("Unable to copy obj! Its type isn't supported.");
}

//give us the difference of two int arrays
//http://radu.cotescu.com/javascript-diff-function/
function arrDiff(a,b) {
    var seen = [], diff = [];
    for ( var i = 0; i < b.length; i++)
        seen[b[i]] = true;
    for ( var i = 0; i < a.length; i++)
        if (!seen[a[i]])
            diff.push(a[i]);
    return diff;
}

//call this to add a warning icon to a graph and log an error to the console
function error(args) {
    var error = '<i class="fa fa-x fa-exclamation-circle warning"></i>';
    console.log('ERROR : ', args.target, ' : ', args.error);
    
    $(args.target + ' .chart_title').append(error);
}

