var Pizza = {
  version : '0.2.1',

  settings : {
    donut: false,
    donut_inner_ratio: 0.4,   // between 0 and 1
    percent_offset: 35,       // relative to radius
    show_text: true,       // show or hide the percentage on the chart.
    animation_speed: 500,
    always_show_text: false,
    show_grid: true,
    bar_spacer: 100,
    bar_intervals: 6,
    animation_type: 'elastic' // options: backin, backout, bounce, easein, 
                              //          easeinout, easeout, linear
  },

  NS : 'http://www.w3.org/2000/svg',

  init : function (scope, options) {
    var self = this;
    this.scope = scope || document.body;

    var charts = $('[data-pie-id], [data-line-id], [data-bar-id]', this.scope);

    $.extend(true, this.settings, options);

    if (charts.length > 0) {
      charts.each(function () {
        return self.build($(this), options);
      });
    } else if ($(this.scope).is('[data-pie-id]') 
      || $(this.scope).is('[data-line-id]') 
      || $(this.scope).is('[data-bar-id]')) {
      this.build($(this.scope), options);
    }

    this.events();
  },

  events : function () {
    var self = this;

    $(window).off('.pizza').on('resize.pizza', self.throttle(function () {
      self.init();
    }, 500));

    $(this.scope).off('.pizza');

    this.pie_events();
    this.line_events();
    this.bar_events();
  },

  build : function(legend, options) {
    legend.data('settings', $.extend({}, this.settings, options, legend.data('options')));

    this.data(legend, options || {});

    if (legend.data('pie-id')) {
      this.update_DOM(this.pie(legend));
    } else if (legend.data('line-id')) {
      this.update_DOM(this.line(legend));
    } else if (legend.data('bar-id')) {
      this.update_DOM(this.bar(legend));
    }
  },

  data : function (legend, options) {
    var data = [],
        count = 0;

    $('li', legend).each(function () {
      var segment = $(this);

      if (options.data) {
        data.push({
          value: options.data[segment.index()],
          text: segment.data('text'), 
          color: segment.css('color'),
          segment: segment
        });
      } else {
        data.push({
          x : segment.data('x'),
          y : segment.data('y'),
          value: segment.data('value'),
          text: segment.data('text'), 
          color: segment.css('color'),
          segment: segment
        });
      }
    });

    return legend.data('graph-data', data);
  },

  update_DOM : function (parts) {
    var legend = parts[0],
        graph = parts[1];

    return $(this.identifier(legend)).html(graph);
  },

  animate : function (el, cx, cy, settings, scale) {
    var self = this,
        scale = scale || 1.05;

    el.hover(function (e) {
        var path = Snap(e.target),
            text = Snap(path.node.nextSibling);

        path.animate({
          transform: 's' + scale + ' ' + scale + ' ' + cx + ' ' + cy
        }, settings.animation_speed, mina[settings.animation_type]);

        if (!/text/.test(text.node.nodeName)) return;

        text.touchend(function () {
          Snap(path).animate({
            transform: 's' + scale + ' ' + scale + ' ' + cx + ' ' + cy
          }, settings.animation_speed, mina[settings.animation_type]);
        });

        if (settings.show_text) {
          text.animate({
            opacity: 1
          }, settings.animation_speed);
          text.touchend(function () {
            text.animate({
              opacity: 1
            }, settings.animation_speed);
          });
        }

      }, function (e) {
        var path = Snap(e.target),
            text = Snap(path.node.nextSibling);

        path.animate({
          transform: 's1 1 ' + cx + ' ' + cy
        }, settings.animation_speed, mina[settings.animation_type]);

        if (!/text/.test(text.node.nodeName)) return;

        text.animate({
          opacity: 0
        }, settings.animation_speed);
      });

  },

  parse_options : function (string, percent, value) {
    var matches = string.match(/{{(percent|value)}}/g),
        output = '';

    for (var i = 0; i < matches.length; i++) {

      if (/percent/i.test(matches[i])) {
        output = string.replace(matches[i], [Math.ceil(percent), '%'].join(''));
      }

      if (/value/i.test(matches[i])) {
        output = output.replace(matches[i], value);
      }
    }

    return output;
  },

  svg : function (legend, settings) {
    var container = $(this.identifier(legend)),
        svg = $('svg', container),
        width = container.width(),
        pie = legend.attr('data-pie-id'),
        height = container.height();

    if (svg.length > 0) {
      svg = svg[0];
    } else {
      var svg = this.svg_obj('svg');
      svg.width = width;
      svg.height = height;
    }

    if (pie) {
      var view_box = '-' + settings.percent_offset + ' -' + settings.percent_offset + ' ' + 
      (width + (settings.percent_offset * 1.5)) + ' ' + 
      (width + (settings.percent_offset * 1.5));
    } else {
      var view_box = '-' + settings.percent_offset + ' -' + settings.percent_offset + ' ' + 
      (width + (settings.percent_offset * 1.6)) + ' ' + 
      (height + (settings.percent_offset * 1.6));
    }

    this.set_attr(svg, {width: '100%', height: '100%', viewBox: view_box});

    return svg;
  },

  identifier : function (legend) {
    id = legend.data('pie-id') || legend.data('bar-id') || legend.data('line-id');
    return '#' + id;
  },

  throttle : function(fun, delay) {
    var timer = null;
    return function () {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fun.apply(context, args);
      }, delay);
    };
  },

  svg_obj : function (type) {
    return document.createElementNS(this.NS, type);
  },

  ticks: function (min, max, count) {
    var span = max - min,
        step = Math.pow(10, Math.floor(Math.log(span / count) / Math.LN10)),
        err = count / span * step;

    // Filter ticks to get closer to the desired count.
    if (err <= .15) step *= 10;
    else if (err <= .35) step *= 5;
    else if (err <= .75) step *= 2;

    // Round start and stop values to step interval.
    var tstart = Math.ceil(min / step) * step,
        tstop = Math.floor(max / step) * step + step * .5,
        ticks = [],
        x;

    // now generate ticks
    for (i=tstart; i < tstop; i += step) {
        ticks.push(i);  
    } 
    return ticks;
  },

  set_attr : function (node, attrs) {

    for (attr in attrs) {
      node.setAttribute(attr, attrs[attr]);
    }

    return this;
  },

  flip : function (node, h) {
    node.setAttribute('transform', 'translate(0, ' + h +') scale(1, -1)');
  }
};
$.extend(Pizza, {
  bar: function (legend) {
    var settings = legend.data('settings'),
        svg = this.svg(legend, settings),
        data = legend.data('graph-data'),
        current_offset = 0,
        container = $(this.identifier(legend)),
        base_width = container.outerWidth(),
        base_height = container.outerHeight(),
        max = min = 0,
        total = 0,
        spacer = settings.bar_spacer * (settings.bar_spacer/ base_width),
        interval = (base_width - (data.length * spacer)) / data.length;

    if (interval < 10) {
      spacer = 1;
      interval = (base_width - (data.length * spacer)) / data.length;
    }

    for (var i = 0; i < data.length; i++) {
      if (max < data[i].value) max = data[i].value;
      if (min > data[i].value) min = data[i].value;
      total += data[i].value;
    }

    var existing_group = $('g[data-id=bars]', svg);

    if (existing_group.length > 0) {
      var g = existing_group[0];
    } else {
      var g = this.svg_obj('g');
      g.setAttribute('data-id', 'bars');
    }

    if (settings.show_grid) {
      this.assemble_grid(svg, min, max, base_width, base_height, settings);
    }

    g.setAttribute('transform', 'translate(0, ' + (base_height) +') scale(1, -1)');

    for (var i = 0; i < data.length; i++) {
      var y = (base_height) * (data[i].value / max);

      var existing_rect = $('rect[data-id=r' + i +']', g);

      if (existing_rect.length > 0) {
        var rect = existing_rect[0];
      } else {
        var rect = this.svg_obj('rect');
        rect.setAttribute('data-id', 'r' + i);
      }

      if (current_offset === 0) {
        var new_offset = current_offset;
      } else {
        var new_offset = current_offset + spacer;
      }

      rect.setAttribute('data-y', y);

      this.set_attr(rect, {
        x : new_offset,
        y : 0,
        width : interval,
        height : 0,
        fill: data[i].color,
        stroke: settings.stroke_color,
        'strokeWidth': settings.stroke_width
      });

      Snap(rect).animate({height: y}, 1500, mina[settings.animation_type]);

      current_offset = new_offset + interval;

      if (existing_group.length < 1) {
        g.appendChild(rect);
        this.animate_bar(Snap(rect), y, settings);
      }
    }

    if (existing_group.length < 1) {
      svg.appendChild(g);
    }

    return [legend, svg];
  },

  animate_bar : function (el, y, settings) {
    var self = this,
        $el = $(el),
        new_y = y + 15;

    el.hover(function (e) {
        var path = Snap(e.target);

        path.animate({
          height: new_y
        }, settings.animation_speed, mina[settings.animation_type]);

      }, function (e) {
        var path = Snap(e.target);

        path.animate({
          height: y
        }, settings.animation_speed, mina[settings.animation_type]);
      });

  },

  assemble_grid : function (svg, min, max, width, height, settings) {
    var existing_group = $('g[data-id=bars]', svg);

    if (existing_group.length > 0) {
      var line_g = $('g[data-id=grid]', svg)[0],
          text_g = $('g[data-id=labels]', svg)[0];
    } else {
      var line_g = this.svg_obj('g'),
          text_g = this.svg_obj('g');

      line_g.setAttribute('data-id', 'grid');
      text_g.setAttribute('data-id', 'labels');
    }

    var ticks = this.ticks(min, max, settings.bar_intervals),
        ticks_length = i = ticks.length,
        interval = height/(ticks_length-1),
        total_tick_height = 0;

    while (i--) {
      if (existing_group.length > 0) {
        var line = $('line[data-id=l' + i + ']', line_g)[0],
            text = $('text[data-id=t' + i + ']', text_g)[0];
      } else {
        var line = this.svg_obj('line'),
            text = this.svg_obj('text');

        line.setAttribute('data-id', 'l' + i);
        text.setAttribute('data-id', 't' + i);
      }

      var line_height = total_tick_height + interval;

      this.set_attr(line, {
          x1 : 0,
          x2 : width,
          y1 : line_height,
          y2 : line_height,
          stroke : 'gray',
          'stroke-width' : 1,
          'stroke-dasharray' : '5,5'
        })
        .set_attr(text, {
          x : -8,
          y : line_height + 5,
          'text-anchor': 'end'
        });

      text.innerHTML = ticks[i];

      if (existing_group.length < 1) {
        line_g.appendChild(line);
        text_g.appendChild(text);
      }
      
      total_tick_height = line_height;
    }

    line_g.setAttribute('transform', 'translate(0, -' + total_tick_height / ticks_length + ')');
    text_g.setAttribute('transform', 'translate(0, -' + total_tick_height / ticks_length + ')');

    if (existing_group.length < 1) {
      svg.appendChild(line_g);
      svg.appendChild(text_g);
    }

  },

  bar_events : function () {
    var self = this;

    $(this.scope).on('mouseenter.pizza mouseleave.pizza touchstart.pizza', '[data-bar-id] li', function (e) {
      var parent = $(this).parent(),
          path = $('#' + parent.attr('data-bar-id') + ' rect[data-id=r' + $(this).index() + ']')[0],
          settings = $(this).parent().data('settings'),
          new_height = parseInt(path.getAttribute('data-y'), 10) + 15;

      if (/start/i.test(e.type)) {
        $(path).siblings('rect').each(function () {
          if (this.nodeName) {
            Snap(path).animate({
              height: path.getAttribute('data-y')
            }, settings.animation_speed, mina[settings.animation_type]);
          }
        });
      }

      if (/enter|start/i.test(e.type)) {
        Snap(path).animate({
          height: new_height
        }, settings.animation_speed, mina[settings.animation_type]);
      } else {
        Snap(path).animate({
          height: path.getAttribute('data-y')
        }, settings.animation_speed, mina[settings.animation_type]);
      }
    });
  }
});
$.extend(Pizza, {
  line : function (legend) {
    var settings = legend.data('settings'),
        svg = this.svg(legend, settings),
        container = $(this.identifier(legend)),
        width = container.outerWidth(),
        height = container.outerHeight(),
        data = legend.data('graph-data'),
        max_x = max_y = min_x = min_y = total_x = total_y = 0,
        i = data.length,
        points = '';

    for (var i = 0; i < data.length; i++) {
      if (data[i].x > max_x) max_x = data[i].x;
      if (data[i].y > max_y) max_y = data[i].y;
      if (min_x > data[i].x) min_x = data[i].x;
      if (min_y > data[i].y) min_y = data[i].y;
      total_x += data[i].x;
      total_y += data[i].y;
    }

    var existing_group = $('g[data-id=line]', svg);

    if (existing_group.length > 0) {
      var line_g = $('g[data-id=line]', svg)[0],
          circle_g = $('g[data-id=points]', svg)[0],
          polyline = $('path[data-id=path]', line_g)[0];
    } else {
      var polyline = this.svg_obj('path'),
          line_g = this.svg_obj('g'),
          circle_g = this.svg_obj('g');

      line_g.setAttribute('data-id', 'line');
      circle_g.setAttribute('data-id', 'points');
      polyline.setAttribute('data-id', 'path');
    }

    for (var i = 0; i < data.length; i++) {
      if (existing_group.length > 0) {
        var circle = $('circle[data-id=c' + i + ']', circle_g)[0];
      } else {
        var circle = this.svg_obj('circle');

        circle.setAttribute('data-id', 'c' + i);
      }

      var x = (data[i].x / max_x) * width,
          y = (data[i].y / max_y) * height;

      points += x + ',' + y + ' ';
      this.set_attr(circle, {cx: x, cy: y,r: 0,fill: data[i.color],
        'data-value': data[i].x + ', ' + data[i].y,
        'data-tooltip': '',
        'title': data[i].x + ', ' + data[i].y,
        'class': 'has-tip tip-top'});

      Snap(circle).animate({
        r: 4
      }, 1500, mina[settings.animation_type]);

      this.animate(Snap(circle), x, y, settings, 2);

      if (existing_group.length < 1) {
        circle_g.appendChild(circle);
      }
    }

    this.flip(circle_g, height);
    this.flip(line_g, height);

    if (settings.show_grid) {
      this.assemble_grid_x(svg, min_x, max_x, width, height, settings);
      this.assemble_grid_y(svg, min_y, max_y, width, height, settings);
    }
    var v = this.points_to_path(points);

    this.set_attr(polyline, {d:v, fill: 'none', stroke: 'black', 'stroke-width': 2});

    if (existing_group.length < 1) {
      line_g.appendChild(polyline);
      svg.appendChild(line_g);
    }

    if (existing_group.length < 1) {
      svg.appendChild(circle_g);
    }

    return [legend, svg];
  },

  assemble_grid_x : function (svg, min, max, width, height, settings) {
    var existing_group = $('g[data-id=gridx]', svg);

    if (existing_group.length > 0) {
      var line_g = existing_group[0],
          text_g = $('g[data-id=labelx]', svg)[0];
    } else {
      var line_g = this.svg_obj('g'),
          text_g = this.svg_obj('g');

      line_g.setAttribute('data-id', 'gridx');
      text_g.setAttribute('data-id', 'labelx');
    }

    var ticks = this.ticks(min, max, settings.bar_intervals).reverse(),
        ticks_length = i = ticks.length,
        total_tick_width = 0,
        interval = width/(ticks_length-1);

    while (i--) {
      if (existing_group.length > 0) {
        var line = $('line[data-id=l' + i + ']', line_g)[0],
            text = $('text[data-id=t' + i + ']', text_g)[0];
      } else {
        var line = this.svg_obj('line'),
            text = this.svg_obj('text');

        line.setAttribute('data-id', 'l' + i);
        text.setAttribute('data-id', 't' + i);
      }

      var line_width = total_tick_width + interval;

      this.set_attr(line, {
          x1 : line_width,
          x2 : line_width,
          y1 : 0,
          y2 : height,
          stroke : 'gray',
          'stroke-width' : 1,
          'stroke-dasharray' : '5,5'
        })
        .set_attr(text, {
          y: height + 20,
          x: line_width - interval,
          'text-anchor': 'middle'
        });

      if (existing_group.length < 1) {
        text.innerHTML = ticks[i];
        text_g.appendChild(text);
        line_g.appendChild(line);
      }

      total_tick_width = line_width;
    }

    line_g.setAttribute('transform', 'translate(-' + interval + ', 0)');

    if (existing_group.length < 1) {
      svg.appendChild(line_g);
      svg.appendChild(text_g);
    }
  },

  assemble_grid_y : function (svg, min, max, width, height, settings) {
    var existing_group = $('g[data-id=gridy]', svg);

    if (existing_group.length > 0) {
      var line_g = existing_group[0],
          text_g = $('g[data-id=labely]', svg)[0];
    } else {
      var line_g = this.svg_obj('g'),
          text_g = this.svg_obj('g');

      line_g.setAttribute('data-id', 'gridy');
      text_g.setAttribute('data-id', 'labely');
    }

    var ticks = this.ticks(min, max, settings.bar_intervals),
        ticks_length = i = ticks.length,
        total_tick_height = 0;

    while (i--) {
      if (existing_group.length > 0) {
        var line = $('line[data-id=l' + i + ']', line_g)[0],
            text = $('text[data-id=t' + i + ']', text_g)[0];
      } else {
        var line = this.svg_obj('line'),
            text = this.svg_obj('text');

        line.setAttribute('data-id', 'l' + i);
        text.setAttribute('data-id', 't' + i);
      }

      var line_height = total_tick_height + (height/(ticks_length-1));

      this.set_attr(line, {
          x1 : 0,
          x2 : width,
          y1 : line_height,
          y2 : line_height,
          stroke : 'gray',
          'stroke-width' : 1,
          'stroke-dasharray' : '5,5'
        })
        .set_attr(text, {
          x : -8,
          y : line_height + 5,
          'text-anchor': 'end'
        });

      if (existing_group.length < 1) {
        text_g.appendChild(text);
        line_g.appendChild(line);
        text.innerHTML = ticks[i];
      }

      total_tick_height = line_height;
    }

    line_g.setAttribute('transform', 'translate(0, -' + total_tick_height / ticks_length + ')');
    text_g.setAttribute('transform', 'translate(0, -' + total_tick_height / ticks_length + ')');

    if (existing_group.length < 1) {
      svg.appendChild(line_g);
      svg.appendChild(text_g);
    }

  },

  points_to_path : function (points) {
    var points = points.split(/\s+|,/);
    var x0=points.shift(), y0=points.shift();
    var pathdata = 'M'+x0+','+y0+'L'+points.join(' ');
    return ['M'+x0+','+y0+'L'].concat(points).join(' ');
  },

  line_events : function () {
    $(this.scope).on('mouseenter.pizza mouseleave.pizza touchstart.pizza', '[data-line-id] li', function (e) {
      var parent = $(this).parent(),
          path = $('#' + parent.data('line-id') + ' circle[data-id="c' + $(this).index() + '"]')[0],
          settings = $(this).parent().data('settings');

      if (/start/i.test(e.type)) {
        $(path).siblings('circle').each(function () {
          if (this.nodeName) {
            Snap(path).animate({
              transform: 's1 1 ' + path.getAttribute('cx') + ' ' + path.getAttribute('cy')
            }, settings.animation_speed, mina[settings.animation_type]);
          }
        });
      }

      if (/enter|start/i.test(e.type)) {
        Snap(path).animate({
          transform: 's2 2 ' + path.getAttribute('cx') + ' ' + path.getAttribute('cy')
        }, settings.animation_speed, mina[settings.animation_type]);
        $(path).trigger('mouseenter')
      } else {
        Snap(path).animate({
          transform: 's1 1 ' + path.getAttribute('cx') + ' ' + path.getAttribute('cy')
        }, settings.animation_speed, mina[settings.animation_type]);
        $(path).trigger('mouseout')
      }
    });
  }

});
$.extend(Pizza, {
  pie : function (legend) {
    // pie chart concept from JavaScript the 
    // Definitive Guide 6th edition by David Flanagan
    var settings = legend.data('settings'),
        svg = this.svg(legend, settings),
        data = legend.data('graph-data'),
        total = 0,
        angles = [],
        start_angle = 0,
        container = $(this.identifier(legend)),
        base = container.outerWidth();

    for (var i = 0; i < data.length; i++) {
      total += data[i].value;
    }

    for (var i = 0; i < data.length; i++) {
      angles[i] = data[i].value / total * Math.PI * 2;
    }

    if(angles.length == 1) angles[0] = Math.PI * 2 - 0.0001; // if 1

    for (var i = 0; i < data.length; i++) {
      var end_angle = start_angle + angles[i];
      var cx = (base / 2),
          cy = (base / 2),
          r = ((base / 2) * 0.85);

      if (!settings.donut) {
        // Compute the two points where our wedge intersects the circle
        // These formulas are chosen so that an angle of 0 is at 12 o'clock
        // and positive angles increase clockwise
        var x1 = cx + r * Math.sin(start_angle);
        var y1 = cy - r * Math.cos(start_angle);
        var x2 = cx + r * Math.sin(end_angle);
        var y2 = cy - r * Math.cos(end_angle);

        // This is a flag for angles larger than than a half circle
        // It is required by the SVG arc drawing component
        var big = 0;
        if (end_angle - start_angle > Math.PI) big = 1;

        // This string holds the path details
        var d = "M" + cx + "," + cy +  // Start at circle center
            " L" + x1 + "," + y1 +     // Draw line to (x1,y1)
            " A" + r + "," + r +       // Draw an arc of radius r
            " 0 " + big + " 1 " +      // Arc details...
            x2 + "," + y2 +            // Arc goes to to (x2,y2)
            " Z";                      // Close path back to (cx,cy)
      }

      var existing_path = $('path[data-id="s' + i + '"]', svg);

      if (existing_path.length > 0) {
        var path = existing_path[0];
      } else {
        var path = this.svg_obj('path');
      }

      var percent = (data[i].value / total) * 100.0;

      var existing_text = $('text[data-id="s' + i + '"]', svg);

      if (existing_text.length > 0) {
        var text = existing_text[0];

        text.setAttribute('x', cx + (r + settings.percent_offset) * Math.sin(start_angle + (angles[i] / 2)));
        text.setAttribute('y', cy - (r + settings.percent_offset) * Math.cos(start_angle + (angles[i] / 2)));

      } else {

        if (data[i].text) {
          var visible_text = this.parse_options(data[i].text, percent, data[i].value);
        } else {
          var visible_text = Math.ceil(percent) + '%';
        }
        var text = this.svg_obj('text');

        text.setAttribute('x', cx + (r + settings.percent_offset) * Math.sin(start_angle + (angles[i] / 2)));
        text.setAttribute('y', cy - (r + settings.percent_offset) * Math.cos(start_angle + (angles[i] / 2)));
        text.innerHTML = visible_text;
      }

      text.setAttribute('text-anchor', 'middle');

      if (settings.always_show_text) {
        Snap(text).animate({
          opacity: 1
        }, settings.animation_speed);
      } else {
        Snap(text).attr({
          opacity: 0
        }, settings.animation_speed);
      }

      text.setAttribute('data-id', 's' + i);

      if (settings.donut) {
        this.annular_sector(path, {
          centerX:cx, centerY:cy,
          startDegrees:start_angle, endDegrees:end_angle,
          innerRadius: (r * settings.donut_inner_ratio), outerRadius:r
        });
      } else {
        path.setAttribute('d', d);
      }

      this.set_attr(path, {
        fill: data[i].color,
        stroke: settings.stroke_color,
        'strokeWidth': settings.stroke_width,
        'data-cx' : cx,
        'data-cy' : cy,
        'data-id' : 's' + i
      });

      var existing_group = $('g[data-id=g' + i + ']', svg);

      if (existing_group.length < 1) {
        var g = this.svg_obj('g');

        g.setAttribute('data-id', 'g' + i);
        g.appendChild(path);
        g.appendChild(text);
        svg.appendChild(g);

        this.animate(Snap(path), cx, cy, settings);
      }

      // The next wedge begins where this one ends
      start_angle = end_angle;
    }

    return [legend, svg];
  },

  annular_sector : function (path, options) {
    var opts = optionsWithDefaults(options);

    var p = [ // points
      [opts.cx + opts.r2*Math.sin(opts.startRadians),
       opts.cy - opts.r2*Math.cos(opts.startRadians)],
      [opts.cx + opts.r2*Math.sin(opts.closeRadians),
       opts.cy - opts.r2*Math.cos(opts.closeRadians)],
      [opts.cx + opts.r1*Math.sin(opts.closeRadians),
       opts.cy - opts.r1*Math.cos(opts.closeRadians)],
      [opts.cx + opts.r1*Math.sin(opts.startRadians),
       opts.cy - opts.r1*Math.cos(opts.startRadians)],
    ];

    var angleDiff = opts.closeRadians - opts.startRadians;
    var largeArc = (angleDiff % (Math.PI*2)) > Math.PI ? 1 : 0;
    var cmds = [];
    cmds.push("M"+p[0].join());                                // Move to P0
    cmds.push("A"+[opts.r2,opts.r2,0,largeArc,1,p[1]].join()); // Arc to  P1
    cmds.push("L"+p[2].join());                                // Line to P2
    cmds.push("A"+[opts.r1,opts.r1,0,largeArc,0,p[3]].join()); // Arc to  P3
    cmds.push("z");                                // Close path (Line to P0)
    path.setAttribute('d',cmds.join(' '));

    function optionsWithDefaults(o){
      // Create a new object so that we don't mutate the original
      var o2 = {
        cx           : o.centerX || 0,
        cy           : o.centerY || 0,
        startRadians : (o.startDegrees || 0),
        closeRadians : (o.endDegrees   || 0),
      };

      var t = o.thickness!==undefined ? o.thickness : 100;
      if (o.innerRadius!==undefined)      o2.r1 = o.innerRadius;
      else if (o.outerRadius!==undefined) o2.r1 = o.outerRadius - t;
      else                                o2.r1 = 200           - t;
      if (o.outerRadius!==undefined)      o2.r2 = o.outerRadius;
      else                                o2.r2 = o2.r1         + t;

      if (o2.r1<0) o2.r1 = 0;
      if (o2.r2<0) o2.r2 = 0;

      return o2;
    }
  },

  pie_events : function () {
    $(this.scope).on('mouseenter.pizza mouseleave.pizza touchstart.pizza', '[data-pie-id] li', function (e) {
      var parent = $(this).parent(),
          path = $('#' + parent.attr('data-pie-id') + ' path[data-id="s' + $(this).index() + '"]')[0],
          text = path.nextSibling,
          settings = $(this).parent().data('settings');

      if (/start/i.test(e.type)) {
        $(path).siblings('path').each(function () {
          if (this.nodeName) {
            Snap(path).animate({
              transform: 's1 1 ' + path.getAttribute('data-cx') + ' ' + path.getAttribute('data-cy')
            }, settings.animation_speed, mina[settings.animation_type]);
            Snap($(this).next()[0]).animate({
              opacity: 0
            }, settings.animation_speed);
          }
        });
      }

      if (/enter|start/i.test(e.type)) {
        Snap(path).animate({
          transform: 's1.05 1.05 ' + path.getAttribute('data-cx') + ' ' + path.getAttribute('data-cy')
        }, settings.animation_speed, mina[settings.animation_type]);

        if (settings.show_text) {
          Snap(text).animate({
            opacity: 1
          }, settings.animation_speed);
        }
      } else {
        Snap(path).animate({
          transform: 's1 1 ' + path.getAttribute('data-cx') + ' ' + path.getAttribute('data-cy')
        }, settings.animation_speed, mina[settings.animation_type]);
        Snap(text).animate({
          opacity: 0
        }, settings.animation_speed);
      }
    });
  }
});