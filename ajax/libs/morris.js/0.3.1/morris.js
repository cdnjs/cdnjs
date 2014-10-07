(function() {
  var $, Morris, minutesSpecHelper, secondsSpecHelper,
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Morris = window.Morris = {};

  $ = jQuery;

  Morris.EventEmitter = (function() {

    function EventEmitter() {}

    EventEmitter.prototype.on = function(name, handler) {
      if (this.handlers == null) {
        this.handlers = {};
      }
      if (this.handlers[name] == null) {
        this.handlers[name] = [];
      }
      return this.handlers[name].push(handler);
    };

    EventEmitter.prototype.fire = function() {
      var args, handler, name, _i, _len, _ref, _results;
      name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if ((this.handlers != null) && (this.handlers[name] != null)) {
        _ref = this.handlers[name];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          handler = _ref[_i];
          _results.push(handler.apply(null, args));
        }
        return _results;
      }
    };

    return EventEmitter;

  })();

  Morris.commas = function(num) {
    var absnum, intnum, ret, strabsnum;
    if (num === null) {
      return "n/a";
    } else {
      ret = num < 0 ? "-" : "";
      absnum = Math.abs(num);
      intnum = Math.floor(absnum).toFixed(0);
      ret += intnum.replace(/(?=(?:\d{3})+$)(?!^)/g, ',');
      strabsnum = absnum.toString();
      if (strabsnum.length > intnum.length) {
        ret += strabsnum.slice(intnum.length);
      }
      return ret;
    }
  };

  Morris.pad2 = function(number) {
    return (number < 10 ? '0' : '') + number;
  };

  Morris.Donut = (function() {

    Donut.prototype.defaults = {
      colors: ['#0B62A4', '#3980B5', '#679DC6', '#95BBD7', '#B0CCE1', '#095791', '#095085', '#083E67', '#052C48', '#042135'],
      formatter: Morris.commas
    };

    function Donut(options) {
      this.select = __bind(this.select, this);
      if (!(this instanceof Morris.Donut)) {
        return new Morris.Donut(options);
      }
      if (typeof options.element === 'string') {
        this.el = $(document.getElementById(options.element));
      } else {
        this.el = $(options.element);
      }
      this.options = $.extend({}, this.defaults, options);
      if (this.el === null || this.el.length === 0) {
        throw new Error("Graph placeholder not found.");
      }
      if (options.data === void 0 || options.data.length === 0) {
        return;
      }
      this.data = options.data;
      this.el.addClass('graph-initialised');
      this.redraw();
    }

    Donut.prototype.redraw = function() {
      var C, cx, cy, d, idx, last, max_value, min, next, seg, total, w, x, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
      this.el.empty();
      this.r = new Raphael(this.el[0]);
      cx = this.el.width() / 2;
      cy = this.el.height() / 2;
      w = (Math.min(cx, cy) - 10) / 3;
      total = 0;
      _ref = this.data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        total += x.value;
      }
      min = 5 / (2 * w);
      C = 1.9999 * Math.PI - min * this.data.length;
      last = 0;
      idx = 0;
      this.segments = [];
      _ref1 = this.data;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        d = _ref1[_j];
        next = last + min + C * (d.value / total);
        seg = new Morris.DonutSegment(cx, cy, w * 2, w, last, next, this.options.colors[idx % this.options.colors.length], d);
        seg.render(this.r);
        this.segments.push(seg);
        seg.on('hover', this.select);
        last = next;
        idx += 1;
      }
      this.text1 = this.r.text(cx, cy - 10, '').attr({
        'font-size': 15,
        'font-weight': 800
      });
      this.text2 = this.r.text(cx, cy + 10, '').attr({
        'font-size': 14
      });
      max_value = Math.max.apply(null, (function() {
        var _k, _len2, _ref2, _results;
        _ref2 = this.data;
        _results = [];
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          d = _ref2[_k];
          _results.push(d.value);
        }
        return _results;
      }).call(this));
      idx = 0;
      _ref2 = this.data;
      _results = [];
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        d = _ref2[_k];
        if (d.value === max_value) {
          this.select(idx);
          break;
        }
        _results.push(idx += 1);
      }
      return _results;
    };

    Donut.prototype.select = function(idx) {
      var s, segment, _i, _len, _ref;
      _ref = this.segments;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        s = _ref[_i];
        s.deselect();
      }
      if (typeof idx === 'number') {
        segment = this.segments[idx];
      } else {
        segment = idx;
      }
      segment.select();
      return this.setLabels(segment.data.label, this.options.formatter(segment.data.value));
    };

    Donut.prototype.setLabels = function(label1, label2) {
      var inner, maxHeightBottom, maxHeightTop, maxWidth, text1bbox, text1scale, text2bbox, text2scale;
      inner = (Math.min(this.el.width() / 2, this.el.height() / 2) - 10) * 2 / 3;
      maxWidth = 1.8 * inner;
      maxHeightTop = inner / 2;
      maxHeightBottom = inner / 3;
      this.text1.attr({
        text: label1,
        transform: ''
      });
      text1bbox = this.text1.getBBox();
      text1scale = Math.min(maxWidth / text1bbox.width, maxHeightTop / text1bbox.height);
      this.text1.attr({
        transform: "S" + text1scale + "," + text1scale + "," + (text1bbox.x + text1bbox.width / 2) + "," + (text1bbox.y + text1bbox.height)
      });
      this.text2.attr({
        text: label2,
        transform: ''
      });
      text2bbox = this.text2.getBBox();
      text2scale = Math.min(maxWidth / text2bbox.width, maxHeightBottom / text2bbox.height);
      return this.text2.attr({
        transform: "S" + text2scale + "," + text2scale + "," + (text2bbox.x + text2bbox.width / 2) + "," + text2bbox.y
      });
    };

    return Donut;

  })();

  Morris.DonutSegment = (function(_super) {

    __extends(DonutSegment, _super);

    function DonutSegment(cx, cy, inner, outer, p0, p1, color, data) {
      this.cx = cx;
      this.cy = cy;
      this.inner = inner;
      this.outer = outer;
      this.color = color;
      this.data = data;
      this.deselect = __bind(this.deselect, this);

      this.select = __bind(this.select, this);

      this.sin_p0 = Math.sin(p0);
      this.cos_p0 = Math.cos(p0);
      this.sin_p1 = Math.sin(p1);
      this.cos_p1 = Math.cos(p1);
      this.long = (p1 - p0) > Math.PI ? 1 : 0;
      this.path = this.calcSegment(this.inner + 3, this.inner + this.outer - 5);
      this.selectedPath = this.calcSegment(this.inner + 3, this.inner + this.outer);
      this.hilight = this.calcArc(this.inner);
    }

    DonutSegment.prototype.calcArcPoints = function(r) {
      return [this.cx + r * this.sin_p0, this.cy + r * this.cos_p0, this.cx + r * this.sin_p1, this.cy + r * this.cos_p1];
    };

    DonutSegment.prototype.calcSegment = function(r1, r2) {
      var ix0, ix1, iy0, iy1, ox0, ox1, oy0, oy1, _ref, _ref1;
      _ref = this.calcArcPoints(r1), ix0 = _ref[0], iy0 = _ref[1], ix1 = _ref[2], iy1 = _ref[3];
      _ref1 = this.calcArcPoints(r2), ox0 = _ref1[0], oy0 = _ref1[1], ox1 = _ref1[2], oy1 = _ref1[3];
      return ("M" + ix0 + "," + iy0) + ("A" + r1 + "," + r1 + ",0," + this.long + ",0," + ix1 + "," + iy1) + ("L" + ox1 + "," + oy1) + ("A" + r2 + "," + r2 + ",0," + this.long + ",1," + ox0 + "," + oy0) + "Z";
    };

    DonutSegment.prototype.calcArc = function(r) {
      var ix0, ix1, iy0, iy1, _ref;
      _ref = this.calcArcPoints(r), ix0 = _ref[0], iy0 = _ref[1], ix1 = _ref[2], iy1 = _ref[3];
      return ("M" + ix0 + "," + iy0) + ("A" + r + "," + r + ",0," + this.long + ",0," + ix1 + "," + iy1);
    };

    DonutSegment.prototype.render = function(r) {
      var _this = this;
      this.arc = r.path(this.hilight).attr({
        stroke: this.color,
        'stroke-width': 2,
        opacity: 0
      });
      return this.seg = r.path(this.path).attr({
        fill: this.color,
        stroke: 'white',
        'stroke-width': 3
      }).hover(function() {
        return _this.fire('hover', _this);
      });
    };

    DonutSegment.prototype.select = function() {
      if (!this.selected) {
        this.seg.animate({
          path: this.selectedPath
        }, 150, '<>');
        this.arc.animate({
          opacity: 1
        }, 150, '<>');
        return this.selected = true;
      }
    };

    DonutSegment.prototype.deselect = function() {
      if (this.selected) {
        this.seg.animate({
          path: this.path
        }, 150, '<>');
        this.arc.animate({
          opacity: 0
        }, 150, '<>');
        return this.selected = false;
      }
    };

    return DonutSegment;

  })(Morris.EventEmitter);

  Morris.Line = (function() {

    function Line(options) {
      this.updateHilight = __bind(this.updateHilight, this);

      this.hilight = __bind(this.hilight, this);

      this.updateHover = __bind(this.updateHover, this);

      this.transY = __bind(this.transY, this);

      this.transX = __bind(this.transX, this);

      var touchHandler,
        _this = this;
      if (!(this instanceof Morris.Line)) {
        return new Morris.Line(options);
      }
      if (typeof options.element === 'string') {
        this.el = $(document.getElementById(options.element));
      } else {
        this.el = $(options.element);
      }
      if (this.el === null || this.el.length === 0) {
        throw new Error("Graph placeholder not found.");
      }
      this.options = $.extend({}, this.defaults, options);
      if (typeof this.options.units === 'string') {
        this.options.postUnits = options.units;
      }
      if (this.options.data === void 0 || this.options.data.length === 0) {
        return;
      }
      this.el.addClass('graph-initialised');
      this.r = new Raphael(this.el[0]);
      this.pointGrow = Raphael.animation({
        r: this.options.pointSize + 3
      }, 25, 'linear');
      this.pointShrink = Raphael.animation({
        r: this.options.pointSize
      }, 25, 'linear');
      this.elementWidth = null;
      this.elementHeight = null;
      this.dirty = false;
      this.prevHilight = null;
      this.el.mousemove(function(evt) {
        return _this.updateHilight(evt.pageX);
      });
      if (this.options.hideHover) {
        this.el.mouseout(function(evt) {
          return _this.hilight(null);
        });
      }
      touchHandler = function(evt) {
        var touch;
        touch = evt.originalEvent.touches[0] || evt.originalEvent.changedTouches[0];
        _this.updateHilight(touch.pageX);
        return touch;
      };
      this.el.bind('touchstart', touchHandler);
      this.el.bind('touchmove', touchHandler);
      this.el.bind('touchend', touchHandler);
      this.seriesLabels = this.options.labels;
      this.setData(this.options.data);
    }

    Line.prototype.defaults = {
      lineWidth: 3,
      pointSize: 4,
      lineColors: ['#0b62a4', '#7A92A3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed'],
      pointWidths: [1],
      pointStrokeColors: ['#ffffff'],
      pointFillColors: [],
      ymax: 'auto',
      ymin: 'auto 0',
      marginTop: 25,
      marginRight: 25,
      marginBottom: 30,
      marginLeft: 25,
      numLines: 5,
      gridLineColor: '#aaa',
      gridTextColor: '#888',
      gridTextSize: 12,
      gridStrokeWidth: 0.5,
      hoverPaddingX: 10,
      hoverPaddingY: 5,
      hoverMargin: 10,
      hoverFillColor: '#fff',
      hoverBorderColor: '#ccc',
      hoverBorderWidth: 2,
      hoverOpacity: 0.95,
      hoverLabelColor: '#444',
      hoverFontSize: 12,
      smooth: true,
      hideHover: false,
      parseTime: true,
      preUnits: '',
      postUnits: '',
      dateFormat: function(x) {
        return new Date(x).toString();
      },
      xLabels: 'auto',
      xLabelFormat: null
    };

    Line.prototype.setData = function(data, redraw) {
      var d, series_data, ykey, ymax, ymin, _i, _j, _k, _len, _len1, _ref, _ref1, _ref2, _results,
        _this = this;
      if (redraw == null) {
        redraw = true;
      }
      this.options.data = data.slice(0);
      if (this.options.parseTime) {
        this.options.data.sort(function(a, b) {
          return (a[_this.options.xkey] < b[_this.options.xkey]) - (b[_this.options.xkey] < a[_this.options.xkey]);
        });
      } else {
        this.options.data.reverse();
      }
      this.columnLabels = $.map(this.options.data, function(d) {
        return d[_this.options.xkey];
      });
      this.series = [];
      _ref = this.options.ykeys;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ykey = _ref[_i];
        series_data = [];
        _ref1 = this.options.data;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          d = _ref1[_j];
          series_data.push((function() {
            switch (typeof d[ykey]) {
              case 'number':
                return d[ykey];
              case 'string':
                return parseFloat(d[ykey]);
              default:
                return null;
            }
          })());
        }
        this.series.push(series_data);
      }
      if (this.options.parseTime) {
        this.xvals = $.map(this.columnLabels, function(x) {
          return Morris.parseDate(x);
        });
      } else {
        this.xvals = (function() {
          _results = [];
          for (var _k = _ref2 = this.columnLabels.length - 1; _ref2 <= 0 ? _k <= 0 : _k >= 0; _ref2 <= 0 ? _k++ : _k--){ _results.push(_k); }
          return _results;
        }).apply(this);
      }
      if (this.options.parseTime) {
        this.columnLabels = $.map(this.columnLabels, function(d) {
          if (typeof d === 'number') {
            return _this.options.dateFormat(d);
          } else {
            return d;
          }
        });
      }
      this.xmin = Math.min.apply(null, this.xvals);
      this.xmax = Math.max.apply(null, this.xvals);
      if (this.xmin === this.xmax) {
        this.xmin -= 1;
        this.xmax += 1;
      }
      if (typeof this.options.ymax === 'string' && this.options.ymax.slice(0, 4) === 'auto') {
        ymax = Math.max.apply(null, Array.prototype.concat.apply([], this.series));
        if (this.options.ymax.length > 5) {
          this.ymax = Math.max(parseInt(this.options.ymax.slice(5), 10), ymax);
        } else {
          this.ymax = ymax;
        }
      } else if (typeof this.options.ymax === 'string') {
        this.ymax = parseInt(this.options.ymax, 10);
      } else {
        this.ymax = this.options.ymax;
      }
      if (typeof this.options.ymin === 'string' && this.options.ymin.slice(0, 4) === 'auto') {
        ymin = Math.min.apply(null, Array.prototype.concat.apply([], this.series));
        if (this.options.ymin.length > 5) {
          this.ymin = Math.min(parseInt(this.options.ymin.slice(5), 10), ymin);
        } else {
          this.ymin = ymin;
        }
      } else if (typeof this.options.ymin === 'string') {
        this.ymin = parseInt(this.options.ymin, 10);
      } else {
        this.ymin = this.options.ymin;
      }
      if (this.ymin === this.ymax) {
        if (this.ymin === !0) {
          this.ymin -= 1;
        }
        this.ymax += 1;
      }
      this.yInterval = (this.ymax - this.ymin) / (this.options.numLines - 1);
      if (this.yInterval > 0 && this.yInterval < 1) {
        this.precision = -Math.floor(Math.log(this.yInterval) / Math.log(10));
      } else {
        this.precision = 0;
      }
      this.dirty = true;
      if (redraw) {
        return this.redraw();
      }
    };

    Line.prototype.calc = function() {
      var h, s, scoords, w, x, _i, _len, _ref,
        _this = this;
      w = this.el.width();
      h = this.el.height();
      if (this.elementWidth !== w || this.elementHeight !== h || this.dirty) {
        this.elementWidth = w;
        this.elementHeight = h;
        this.dirty = false;
        this.maxYLabelWidth = Math.max(this.measureText(this.yAxisFormat(this.ymin), this.options.gridTextSize).width, this.measureText(this.yAxisFormat(this.ymax), this.options.gridTextSize).width);
        this.left = this.maxYLabelWidth + this.options.marginLeft;
        this.width = this.el.width() - this.left - this.options.marginRight;
        this.height = this.el.height() - this.options.marginTop - this.options.marginBottom;
        this.dx = this.width / (this.xmax - this.xmin);
        this.dy = this.height / (this.ymax - this.ymin);
        this.columns = (function() {
          var _i, _len, _ref, _results;
          _ref = this.xvals;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            x = _ref[_i];
            _results.push(this.transX(x));
          }
          return _results;
        }).call(this);
        this.seriesCoords = [];
        _ref = this.series;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          s = _ref[_i];
          scoords = [];
          $.each(s, function(i, y) {
            if (y === null) {
              return scoords.push(null);
            } else {
              return scoords.push({
                x: _this.columns[i],
                y: _this.transY(y)
              });
            }
          });
          this.seriesCoords.push(scoords);
        }
        return this.hoverMargins = $.map(this.columns.slice(1), function(x, i) {
          return (x + _this.columns[i]) / 2;
        });
      }
    };

    Line.prototype.transX = function(x) {
      if (this.xvals.length === 1) {
        return this.left + this.width / 2;
      } else {
        return this.left + (x - this.xmin) * this.dx;
      }
    };

    Line.prototype.transY = function(y) {
      return this.options.marginTop + this.height - (y - this.ymin) * this.dy;
    };

    Line.prototype.redraw = function() {
      this.r.clear();
      this.calc();
      this.drawGrid();
      this.drawSeries();
      this.drawHover();
      return this.hilight(this.options.hideHover ? null : 0);
    };

    Line.prototype.drawGrid = function() {
      var drawLabel, firstY, i, l, labelText, lastY, lineY, prevLabelMargin, v, xLabelMargin, y, ypos, _i, _j, _k, _len, _ref, _ref1, _ref2, _results, _results1,
        _this = this;
      firstY = this.ymin;
      lastY = this.ymax;
      for (lineY = _i = firstY, _ref = this.yInterval; firstY <= lastY ? _i <= lastY : _i >= lastY; lineY = _i += _ref) {
        v = parseFloat(lineY.toFixed(this.precision));
        y = this.transY(v);
        this.r.text(this.left - this.options.marginLeft / 2, y, this.yAxisFormat(v)).attr('font-size', this.options.gridTextSize).attr('fill', this.options.gridTextColor).attr('text-anchor', 'end');
        this.r.path("M" + this.left + "," + y + "H" + (this.left + this.width)).attr('stroke', this.options.gridLineColor).attr('stroke-width', this.options.gridStrokeWidth);
      }
      ypos = this.options.marginTop + this.height + this.options.marginBottom / 2;
      xLabelMargin = 50;
      prevLabelMargin = null;
      drawLabel = function(labelText, xpos) {
        var label, labelBox;
        label = _this.r.text(_this.transX(xpos), ypos, labelText).attr('font-size', _this.options.gridTextSize).attr('fill', _this.options.gridTextColor);
        labelBox = label.getBBox();
        if ((prevLabelMargin === null || prevLabelMargin <= labelBox.x) && labelBox.x >= 0 && (labelBox.x + labelBox.width) < _this.el.width()) {
          return prevLabelMargin = labelBox.x + labelBox.width + xLabelMargin;
        } else {
          return label.remove();
        }
      };
      if (this.options.parseTime) {
        if (this.columnLabels.length === 1 && this.options.xLabels === 'auto') {
          return drawLabel(this.columnLabels[0], this.xvals[0]);
        } else {
          _ref1 = Morris.labelSeries(this.xmin, this.xmax, this.width, this.options.xLabels, this.options.xLabelFormat);
          _results = [];
          for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
            l = _ref1[_j];
            _results.push(drawLabel(l[0], l[1]));
          }
          return _results;
        }
      } else {
        _results1 = [];
        for (i = _k = 0, _ref2 = this.columnLabels.length; 0 <= _ref2 ? _k <= _ref2 : _k >= _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
          labelText = this.columnLabels[this.columnLabels.length - i - 1];
          _results1.push(drawLabel(labelText, i));
        }
        return _results1;
      }
    };

    Line.prototype.drawSeries = function() {
      var c, circle, coords, i, path, _i, _j, _ref, _ref1, _results;
      for (i = _i = _ref = this.seriesCoords.length - 1; _ref <= 0 ? _i <= 0 : _i >= 0; i = _ref <= 0 ? ++_i : --_i) {
        coords = $.map(this.seriesCoords[i], function(c) {
          return c;
        });
        if (coords.length > 1) {
          path = this.createPath(coords, this.options.marginTop, this.left, this.options.marginTop + this.height, this.left + this.width);
          this.r.path(path).attr('stroke', this.colorForSeries(i)).attr('stroke-width', this.options.lineWidth);
        }
      }
      this.seriesPoints = (function() {
        var _j, _ref1, _results;
        _results = [];
        for (i = _j = 0, _ref1 = this.seriesCoords.length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
          _results.push([]);
        }
        return _results;
      }).call(this);
      _results = [];
      for (i = _j = _ref1 = this.seriesCoords.length - 1; _ref1 <= 0 ? _j <= 0 : _j >= 0; i = _ref1 <= 0 ? ++_j : --_j) {
        _results.push((function() {
          var _k, _len, _ref2, _results1;
          _ref2 = this.seriesCoords[i];
          _results1 = [];
          for (_k = 0, _len = _ref2.length; _k < _len; _k++) {
            c = _ref2[_k];
            if (c === null) {
              circle = null;
            } else {
              circle = this.r.circle(c.x, c.y, this.options.pointSize).attr('fill', this.pointFillColorForSeries(i) || this.colorForSeries(i)).attr('stroke-width', this.strokeWidthForSeries(i)).attr('stroke', this.strokeForSeries(i));
            }
            _results1.push(this.seriesPoints[i].push(circle));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    Line.prototype.createPath = function(coords, top, left, bottom, right) {
      var c, g, grads, i, ix, lc, lg, path, x1, x2, y1, y2, _i, _ref;
      path = "";
      if (this.options.smooth) {
        grads = this.gradients(coords);
        for (i = _i = 0, _ref = coords.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          c = coords[i];
          if (i === 0) {
            path += "M" + c.x + "," + c.y;
          } else {
            g = grads[i];
            lc = coords[i - 1];
            lg = grads[i - 1];
            ix = (c.x - lc.x) / 4;
            x1 = lc.x + ix;
            y1 = Math.min(bottom, lc.y + ix * lg);
            x2 = c.x - ix;
            y2 = Math.min(bottom, c.y - ix * g);
            path += "C" + x1 + "," + y1 + "," + x2 + "," + y2 + "," + c.x + "," + c.y;
          }
        }
      } else {
        path = "M" + $.map(coords, function(c) {
          return "" + c.x + "," + c.y;
        }).join("L");
      }
      return path;
    };

    Line.prototype.gradients = function(coords) {
      return $.map(coords, function(c, i) {
        if (i === 0) {
          return (coords[1].y - c.y) / (coords[1].x - c.x);
        } else if (i === (coords.length - 1)) {
          return (c.y - coords[i - 1].y) / (c.x - coords[i - 1].x);
        } else {
          return (coords[i + 1].y - coords[i - 1].y) / (coords[i + 1].x - coords[i - 1].x);
        }
      });
    };

    Line.prototype.drawHover = function() {
      var i, yLabel, _i, _ref, _results;
      this.hoverHeight = this.options.hoverFontSize * 1.5 * (this.series.length + 1);
      this.hover = this.r.rect(-10, -this.hoverHeight / 2 - this.options.hoverPaddingY, 20, this.hoverHeight + this.options.hoverPaddingY * 2, 10).attr('fill', this.options.hoverFillColor).attr('stroke', this.options.hoverBorderColor).attr('stroke-width', this.options.hoverBorderWidth).attr('opacity', this.options.hoverOpacity);
      this.xLabel = this.r.text(0, (this.options.hoverFontSize * 0.75) - this.hoverHeight / 2, '').attr('fill', this.options.hoverLabelColor).attr('font-weight', 'bold').attr('font-size', this.options.hoverFontSize);
      this.hoverSet = this.r.set();
      this.hoverSet.push(this.hover);
      this.hoverSet.push(this.xLabel);
      this.yLabels = [];
      _results = [];
      for (i = _i = 0, _ref = this.series.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        yLabel = this.r.text(0, this.options.hoverFontSize * 1.5 * (i + 1.5) - this.hoverHeight / 2, '').attr('fill', this.colorForSeries(i)).attr('font-size', this.options.hoverFontSize);
        this.yLabels.push(yLabel);
        _results.push(this.hoverSet.push(yLabel));
      }
      return _results;
    };

    Line.prototype.updateHover = function(index) {
      var i, maxLabelWidth, xloc, yloc, _i, _ref,
        _this = this;
      this.hoverSet.show();
      this.xLabel.attr('text', this.columnLabels[index]);
      for (i = _i = 0, _ref = this.series.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.yLabels[i].attr('text', "" + this.seriesLabels[i] + ": " + (this.yLabelFormat(this.series[i][index])));
      }
      maxLabelWidth = Math.max.apply(null, $.map(this.yLabels, function(l) {
        return l.getBBox().width;
      }));
      maxLabelWidth = Math.max(maxLabelWidth, this.xLabel.getBBox().width);
      this.hover.attr('width', maxLabelWidth + this.options.hoverPaddingX * 2);
      this.hover.attr('x', -this.options.hoverPaddingX - maxLabelWidth / 2);
      yloc = Math.min.apply(null, $.map(this.series, function(s) {
        return _this.transY(s[index]);
      }));
      if (yloc > this.hoverHeight + this.options.hoverPaddingY * 2 + this.options.hoverMargin + this.options.marginTop) {
        yloc = yloc - this.hoverHeight / 2 - this.options.hoverPaddingY - this.options.hoverMargin;
      } else {
        yloc = yloc + this.hoverHeight / 2 + this.options.hoverPaddingY + this.options.hoverMargin;
      }
      yloc = Math.max(this.options.marginTop + this.hoverHeight / 2 + this.options.hoverPaddingY, yloc);
      yloc = Math.min(this.options.marginTop + this.height - this.hoverHeight / 2 - this.options.hoverPaddingY, yloc);
      xloc = Math.min(this.left + this.width - maxLabelWidth / 2 - this.options.hoverPaddingX, this.columns[index]);
      xloc = Math.max(this.left + maxLabelWidth / 2 + this.options.hoverPaddingX, xloc);
      return this.hoverSet.attr('transform', "t" + xloc + "," + yloc);
    };

    Line.prototype.hideHover = function() {
      return this.hoverSet.hide();
    };

    Line.prototype.hilight = function(index) {
      var i, _i, _j, _ref, _ref1;
      if (this.prevHilight !== null && this.prevHilight !== index) {
        for (i = _i = 0, _ref = this.seriesPoints.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          if (this.seriesPoints[i][this.prevHilight]) {
            this.seriesPoints[i][this.prevHilight].animate(this.pointShrink);
          }
        }
      }
      if (index !== null && this.prevHilight !== index) {
        for (i = _j = 0, _ref1 = this.seriesPoints.length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
          if (this.seriesPoints[i][index]) {
            this.seriesPoints[i][index].animate(this.pointGrow);
          }
        }
        this.updateHover(index);
      }
      this.prevHilight = index;
      if (index === null) {
        return this.hideHover();
      }
    };

    Line.prototype.updateHilight = function(x) {
      var hoverIndex, _i, _ref, _results;
      x -= this.el.offset().left;
      _results = [];
      for (hoverIndex = _i = _ref = this.hoverMargins.length; _ref <= 0 ? _i <= 0 : _i >= 0; hoverIndex = _ref <= 0 ? ++_i : --_i) {
        if (hoverIndex === 0 || this.hoverMargins[hoverIndex - 1] > x) {
          this.hilight(hoverIndex);
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Line.prototype.measureText = function(text, fontSize) {
      var ret, tt;
      if (fontSize == null) {
        fontSize = 12;
      }
      tt = this.r.text(100, 100, text).attr('font-size', fontSize);
      ret = tt.getBBox();
      tt.remove();
      return ret;
    };

    Line.prototype.yAxisFormat = function(label) {
      return this.yLabelFormat(label);
    };

    Line.prototype.yLabelFormat = function(label) {
      return "" + this.options.preUnits + (Morris.commas(label)) + this.options.postUnits;
    };

    Line.prototype.colorForSeries = function(index) {
      return this.options.lineColors[index % this.options.lineColors.length];
    };

    Line.prototype.strokeWidthForSeries = function(index) {
      return this.options.pointWidths[index % this.options.pointWidths.length];
    };

    Line.prototype.strokeForSeries = function(index) {
      return this.options.pointStrokeColors[index % this.options.pointStrokeColors.length];
    };

    Line.prototype.pointFillColorForSeries = function(index) {
      return this.options.pointFillColors[index % this.options.pointFillColors.length];
    };

    return Line;

  })();

  Morris.parseDate = function(date) {
    var isecs, m, msecs, n, o, offsetmins, p, q, r, ret, secs;
    if (typeof date === 'number') {
      return date;
    }
    m = date.match(/^(\d+) Q(\d)$/);
    n = date.match(/^(\d+)-(\d+)$/);
    o = date.match(/^(\d+)-(\d+)-(\d+)$/);
    p = date.match(/^(\d+) W(\d+)$/);
    q = date.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+)(Z|([+-])(\d\d):?(\d\d))?$/);
    r = date.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+):(\d+(\.\d+)?)(Z|([+-])(\d\d):?(\d\d))?$/);
    if (m) {
      return new Date(parseInt(m[1], 10), parseInt(m[2], 10) * 3 - 1, 1).getTime();
    } else if (n) {
      return new Date(parseInt(n[1], 10), parseInt(n[2], 10) - 1, 1).getTime();
    } else if (o) {
      return new Date(parseInt(o[1], 10), parseInt(o[2], 10) - 1, parseInt(o[3], 10)).getTime();
    } else if (p) {
      ret = new Date(parseInt(p[1], 10), 0, 1);
      if (ret.getDay() !== 4) {
        ret.setMonth(0, 1 + ((4 - ret.getDay()) + 7) % 7);
      }
      return ret.getTime() + parseInt(p[2], 10) * 604800000;
    } else if (q) {
      if (!q[6]) {
        return new Date(parseInt(q[1], 10), parseInt(q[2], 10) - 1, parseInt(q[3], 10), parseInt(q[4], 10), parseInt(q[5], 10)).getTime();
      } else {
        offsetmins = 0;
        if (q[6] !== 'Z') {
          offsetmins = parseInt(q[8], 10) * 60 + parseInt(q[9], 10);
          if (q[7] === '+') {
            offsetmins = 0 - offsetmins;
          }
        }
        return Date.UTC(parseInt(q[1], 10), parseInt(q[2], 10) - 1, parseInt(q[3], 10), parseInt(q[4], 10), parseInt(q[5], 10) + offsetmins);
      }
    } else if (r) {
      secs = parseFloat(r[6]);
      isecs = Math.floor(secs);
      msecs = Math.round((secs - isecs) * 1000);
      if (!r[8]) {
        return new Date(parseInt(r[1], 10), parseInt(r[2], 10) - 1, parseInt(r[3], 10), parseInt(r[4], 10), parseInt(r[5], 10), isecs, msecs).getTime();
      } else {
        offsetmins = 0;
        if (r[8] !== 'Z') {
          offsetmins = parseInt(r[10], 10) * 60 + parseInt(r[11], 10);
          if (r[9] === '+') {
            offsetmins = 0 - offsetmins;
          }
        }
        return Date.UTC(parseInt(r[1], 10), parseInt(r[2], 10) - 1, parseInt(r[3], 10), parseInt(r[4], 10), parseInt(r[5], 10) + offsetmins, isecs, msecs);
      }
    } else {
      return new Date(parseInt(date, 10), 0, 1).getTime();
    }
  };

  Morris.labelSeries = function(dmin, dmax, pxwidth, specName, xLabelFormat) {
    var d, d0, ddensity, name, ret, s, spec, t, _i, _len, _ref;
    ddensity = 200 * (dmax - dmin) / pxwidth;
    d0 = new Date(dmin);
    spec = Morris.LABEL_SPECS[specName];
    if (spec === void 0) {
      _ref = Morris.AUTO_LABEL_ORDER;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        s = Morris.LABEL_SPECS[name];
        if (ddensity >= s.span) {
          spec = s;
          break;
        }
      }
    }
    if (spec === void 0) {
      spec = Morris.LABEL_SPECS["second"];
    }
    if (xLabelFormat) {
      spec = $.extend({}, spec, {
        fmt: xLabelFormat
      });
    }
    d = spec.start(d0);
    ret = [];
    while ((t = d.getTime()) <= dmax) {
      if (t >= dmin) {
        ret.push([spec.fmt(d), t]);
      }
      spec.incr(d);
    }
    return ret;
  };

  minutesSpecHelper = function(interval) {
    return {
      span: interval * 60 * 1000,
      start: function(d) {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours());
      },
      fmt: function(d) {
        return "" + (Morris.pad2(d.getHours())) + ":" + (Morris.pad2(d.getMinutes()));
      },
      incr: function(d) {
        return d.setMinutes(d.getMinutes() + interval);
      }
    };
  };

  secondsSpecHelper = function(interval) {
    return {
      span: interval * 1000,
      start: function(d) {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());
      },
      fmt: function(d) {
        return "" + (Morris.pad2(d.getHours())) + ":" + (Morris.pad2(d.getMinutes())) + ":" + (Morris.pad2(d.getSeconds()));
      },
      incr: function(d) {
        return d.setSeconds(d.getSeconds() + interval);
      }
    };
  };

  Morris.LABEL_SPECS = {
    "year": {
      span: 17280000000,
      start: function(d) {
        return new Date(d.getFullYear(), 0, 1);
      },
      fmt: function(d) {
        return "" + (d.getFullYear());
      },
      incr: function(d) {
        return d.setFullYear(d.getFullYear() + 1);
      }
    },
    "month": {
      span: 2419200000,
      start: function(d) {
        return new Date(d.getFullYear(), d.getMonth(), 1);
      },
      fmt: function(d) {
        return "" + (d.getFullYear()) + "-" + (Morris.pad2(d.getMonth() + 1));
      },
      incr: function(d) {
        return d.setMonth(d.getMonth() + 1);
      }
    },
    "day": {
      span: 86400000,
      start: function(d) {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
      },
      fmt: function(d) {
        return "" + (d.getFullYear()) + "-" + (Morris.pad2(d.getMonth() + 1)) + "-" + (Morris.pad2(d.getDate()));
      },
      incr: function(d) {
        return d.setDate(d.getDate() + 1);
      }
    },
    "hour": minutesSpecHelper(60),
    "30min": minutesSpecHelper(30),
    "15min": minutesSpecHelper(15),
    "10min": minutesSpecHelper(10),
    "5min": minutesSpecHelper(5),
    "minute": minutesSpecHelper(1),
    "30sec": secondsSpecHelper(30),
    "15sec": secondsSpecHelper(15),
    "10sec": secondsSpecHelper(10),
    "5sec": secondsSpecHelper(5),
    "second": secondsSpecHelper(1)
  };

  Morris.AUTO_LABEL_ORDER = ["year", "month", "day", "hour", "30min", "15min", "10min", "5min", "minute", "30sec", "15sec", "10sec", "5sec", "second"];

}).call(this);
