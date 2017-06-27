(function() {
  var $, Morris;

  $ = jQuery;

  Morris = {};

  Morris.Line = (function() {

    function Line(options) {
      if (!(this instanceof Morris.Line)) return new Morris.Line(options);
      if (typeof options.element === 'string') {
        this.el = $(document.getElementById(options.element));
      } else {
        this.el = $(options.element);
      }
      this.options = $.extend({}, this.defaults, options);
      if (this.options.data === void 0 || this.options.data.length === 0) return;
      this.el.addClass('graph-initialised');
      this.precalc();
      this.redraw();
    }

    Line.prototype.defaults = {
      lineWidth: 3,
      pointSize: 4,
      lineColors: ['#0b62a4', '#7A92A3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed'],
      ymax: 'auto',
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
      parseTime: true
    };

    Line.prototype.precalc = function() {
      var ykey, ymax, _i, _j, _len, _ref, _ref2, _results,
        _this = this;
      this.options.data.sort(function(a, b) {
        return (a[_this.options.xkey] < b[_this.options.xkey]) - (b[_this.options.xkey] < a[_this.options.xkey]);
      });
      this.columnLabels = $.map(this.options.data, function(d) {
        return d[_this.options.xkey];
      });
      this.seriesLabels = this.options.labels;
      this.series = [];
      _ref = this.options.ykeys;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ykey = _ref[_i];
        this.series.push($.map(this.options.data, function(d) {
          return d[ykey];
        }));
      }
      if (this.options.parseTime) {
        this.xvals = $.map(this.columnLabels, function(x) {
          return _this.parseYear(x);
        });
      } else {
        this.xvals = (function() {
          _results = [];
          for (var _j = _ref2 = this.columnLabels.length - 1; _ref2 <= 0 ? _j <= 0 : _j >= 0; _ref2 <= 0 ? _j++ : _j--){ _results.push(_j); }
          return _results;
        }).apply(this);
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
          return this.options.ymax = Math.max(parseInt(this.options.ymax.slice(5), 10), ymax);
        } else {
          return this.options.ymax = ymax;
        }
      }
    };

    Line.prototype.redraw = function() {
      var c, circle, columns, coords, dx, dy, height, hideHover, hilight, hover, hoverHeight, hoverMargins, hoverSet, i, label, labelBox, labelText, left, lineInterval, path, pointGrow, pointShrink, prevHilight, prevLabelMargin, s, seriesCoords, seriesPoints, touchHandler, transX, transY, updateHilight, updateHover, v, width, x, xLabel, xLabelMargin, y, yLabel, yLabels, _i, _j, _len, _len2, _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8,
        _this = this;
      this.el.empty();
      this.r = new Raphael(this.el[0]);
      left = this.measureText(this.options.ymax, this.options.gridTextSize).width + this.options.marginLeft;
      width = this.el.width() - left - this.options.marginRight;
      height = this.el.height() - this.options.marginTop - this.options.marginBottom;
      dx = width / (this.xmax - this.xmin);
      dy = height / this.options.ymax;
      transX = function(x) {
        if (_this.xvals.length === 1) {
          return left + width / 2;
        } else {
          return left + (x - _this.xmin) * dx;
        }
      };
      transY = function(y) {
        return _this.options.marginTop + height - y * dy;
      };
      lineInterval = height / (this.options.numLines - 1);
      for (i = 0, _ref = this.options.numLines - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        y = this.options.marginTop + i * lineInterval;
        v = Math.round((this.options.numLines - 1 - i) * this.options.ymax / (this.options.numLines - 1));
        this.r.text(left - this.options.marginLeft / 2, y, v).attr('font-size', this.options.gridTextSize).attr('fill', this.options.gridTextColor).attr('text-anchor', 'end');
        this.r.path("M" + left + "," + y + 'H' + (left + width)).attr('stroke', this.options.gridLineColor).attr('stroke-width', this.options.gridStrokeWidth);
      }
      prevLabelMargin = null;
      xLabelMargin = 50;
      for (i = _ref2 = Math.ceil(this.xmin), _ref3 = Math.floor(this.xmax); _ref2 <= _ref3 ? i <= _ref3 : i >= _ref3; _ref2 <= _ref3 ? i++ : i--) {
        labelText = this.options.parseTime ? i : this.columnLabels[this.columnLabels.length - i - 1];
        label = this.r.text(transX(i), this.options.marginTop + height + this.options.marginBottom / 2, labelText).attr('font-size', this.options.gridTextSize).attr('fill', this.options.gridTextColor);
        labelBox = label.getBBox();
        if (prevLabelMargin === null || prevLabelMargin <= labelBox.x) {
          prevLabelMargin = labelBox.x + labelBox.width + xLabelMargin;
        } else {
          label.remove();
        }
      }
      columns = (function() {
        var _i, _len, _ref4, _results;
        _ref4 = this.xvals;
        _results = [];
        for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
          x = _ref4[_i];
          _results.push(transX(x));
        }
        return _results;
      }).call(this);
      seriesCoords = [];
      _ref4 = this.series;
      for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
        s = _ref4[_i];
        seriesCoords.push($.map(s, function(y, i) {
          return {
            x: columns[i],
            y: transY(y)
          };
        }));
      }
      for (i = _ref5 = seriesCoords.length - 1; _ref5 <= 0 ? i <= 0 : i >= 0; _ref5 <= 0 ? i++ : i--) {
        coords = seriesCoords[i];
        if (coords.length > 1) {
          path = this.createPath(coords, this.options.marginTop, left, this.options.marginTop + height, left + width);
          this.r.path(path).attr('stroke', this.options.lineColors[i]).attr('stroke-width', this.options.lineWidth);
        }
      }
      seriesPoints = (function() {
        var _ref6, _results;
        _results = [];
        for (i = 0, _ref6 = seriesCoords.length - 1; 0 <= _ref6 ? i <= _ref6 : i >= _ref6; 0 <= _ref6 ? i++ : i--) {
          _results.push([]);
        }
        return _results;
      })();
      for (i = _ref6 = seriesCoords.length - 1; _ref6 <= 0 ? i <= 0 : i >= 0; _ref6 <= 0 ? i++ : i--) {
        _ref7 = seriesCoords[i];
        for (_j = 0, _len2 = _ref7.length; _j < _len2; _j++) {
          c = _ref7[_j];
          circle = this.r.circle(c.x, c.y, this.options.pointSize).attr('fill', this.options.lineColors[i]).attr('stroke-width', 1).attr('stroke', '#ffffff');
          seriesPoints[i].push(circle);
        }
      }
      hoverHeight = this.options.hoverFontSize * 1.5 * (this.series.length + 1);
      hover = this.r.rect(-10, -hoverHeight / 2 - this.options.hoverPaddingY, 20, hoverHeight + this.options.hoverPaddingY * 2, 10).attr('fill', this.options.hoverFillColor).attr('stroke', this.options.hoverBorderColor).attr('stroke-width', this.options.hoverBorderWidth).attr('opacity', this.options.hoverOpacity);
      xLabel = this.r.text(0, (this.options.hoverFontSize * 0.75) - hoverHeight / 2, '').attr('fill', this.options.hoverLabelColor).attr('font-weight', 'bold').attr('font-size', this.options.hoverFontSize);
      hoverSet = this.r.set();
      hoverSet.push(hover);
      hoverSet.push(xLabel);
      yLabels = [];
      for (i = 0, _ref8 = this.series.length - 1; 0 <= _ref8 ? i <= _ref8 : i >= _ref8; 0 <= _ref8 ? i++ : i--) {
        yLabel = this.r.text(0, this.options.hoverFontSize * 1.5 * (i + 1.5) - hoverHeight / 2, '').attr('fill', this.options.lineColors[i]).attr('font-size', this.options.hoverFontSize);
        yLabels.push(yLabel);
        hoverSet.push(yLabel);
      }
      updateHover = function(index) {
        var i, maxLabelWidth, xloc, yloc, _ref9;
        hoverSet.show();
        xLabel.attr('text', _this.columnLabels[index]);
        for (i = 0, _ref9 = _this.series.length - 1; 0 <= _ref9 ? i <= _ref9 : i >= _ref9; 0 <= _ref9 ? i++ : i--) {
          yLabels[i].attr('text', "" + _this.seriesLabels[i] + ": " + (_this.commas(_this.series[i][index])));
        }
        maxLabelWidth = Math.max.apply(null, $.map(yLabels, function(l) {
          return l.getBBox().width;
        }));
        maxLabelWidth = Math.max(maxLabelWidth, xLabel.getBBox().width);
        hover.attr('width', maxLabelWidth + _this.options.hoverPaddingX * 2);
        hover.attr('x', -_this.options.hoverPaddingX - maxLabelWidth / 2);
        yloc = Math.min.apply(null, $.map(_this.series, function(s) {
          return transY(s[index]);
        }));
        if (yloc > hoverHeight + _this.options.hoverPaddingY * 2 + _this.options.hoverMargin + _this.options.marginTop) {
          yloc = yloc - hoverHeight / 2 - _this.options.hoverPaddingY - _this.options.hoverMargin;
        } else {
          yloc = yloc + hoverHeight / 2 + _this.options.hoverPaddingY + _this.options.hoverMargin;
        }
        yloc = Math.max(_this.options.marginTop + hoverHeight / 2 + _this.options.hoverPaddingY, yloc);
        yloc = Math.min(_this.options.marginTop + height - hoverHeight / 2 - _this.options.hoverPaddingY, yloc);
        xloc = Math.min(left + width - maxLabelWidth / 2 - _this.options.hoverPaddingX, columns[index]);
        xloc = Math.max(left + maxLabelWidth / 2 + _this.options.hoverPaddingX, xloc);
        return hoverSet.attr('transform', "t" + xloc + "," + yloc);
      };
      hideHover = function() {
        return hoverSet.hide();
      };
      hoverMargins = $.map(columns.slice(1), function(x, i) {
        return (x + columns[i]) / 2;
      });
      prevHilight = null;
      pointGrow = Raphael.animation({
        r: this.options.pointSize + 3
      }, 25, 'linear');
      pointShrink = Raphael.animation({
        r: this.options.pointSize
      }, 25, 'linear');
      hilight = function(index) {
        var i, _ref10, _ref9;
        if (prevHilight !== null && prevHilight !== index) {
          for (i = 0, _ref9 = seriesPoints.length - 1; 0 <= _ref9 ? i <= _ref9 : i >= _ref9; 0 <= _ref9 ? i++ : i--) {
            seriesPoints[i][prevHilight].animate(pointShrink);
          }
        }
        if (index !== null && prevHilight !== index) {
          for (i = 0, _ref10 = seriesPoints.length - 1; 0 <= _ref10 ? i <= _ref10 : i >= _ref10; 0 <= _ref10 ? i++ : i--) {
            seriesPoints[i][index].animate(pointGrow);
          }
          updateHover(index);
        }
        prevHilight = index;
        if (index === null) return hideHover();
      };
      updateHilight = function(x) {
        var hoverIndex, _ref9, _results;
        x -= _this.el.offset().left;
        _results = [];
        for (hoverIndex = _ref9 = hoverMargins.length; _ref9 <= 0 ? hoverIndex <= 0 : hoverIndex >= 0; _ref9 <= 0 ? hoverIndex++ : hoverIndex--) {
          if (hoverIndex === 0 || hoverMargins[hoverIndex - 1] > x) {
            hilight(hoverIndex);
            break;
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };
      this.el.mousemove(function(evt) {
        return updateHilight(evt.pageX);
      });
      if (this.options.hideHover) {
        this.el.mouseout(function(evt) {
          return hilight(null);
        });
      }
      touchHandler = function(evt) {
        var touch;
        touch = evt.originalEvent.touches[0] || evt.originalEvent.changedTouches[0];
        updateHilight(touch.pageX);
        return touch;
      };
      this.el.bind('touchstart', touchHandler);
      this.el.bind('touchmove', touchHandler);
      this.el.bind('touchend', touchHandler);
      return hilight(this.options.hideHover ? null : 0);
    };

    Line.prototype.createPath = function(coords, top, left, bottom, right) {
      var c, g, grads, i, ix, lc, lg, path, x1, x2, y1, y2, _ref;
      path = "";
      if (this.options.smooth) {
        grads = this.gradients(coords);
        for (i = 0, _ref = coords.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
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

    Line.prototype.measureText = function(text, fontSize) {
      var ret, tt;
      if (fontSize == null) fontSize = 12;
      tt = this.r.text(100, 100, text).attr('font-size', fontSize);
      ret = tt.getBBox();
      tt.remove();
      return ret;
    };

    Line.prototype.parseYear = function(date) {
      var day, m, month, n, o, p, s, timestamp, weeks, y1, y2, year;
      s = date.toString();
      m = s.match(/^(\d+) Q(\d)$/);
      n = s.match(/^(\d+)-(\d+)$/);
      o = s.match(/^(\d+)-(\d+)-(\d+)$/);
      p = s.match(/^(\d+) W(\d+)$/);
      if (m) {
        return parseInt(m[1], 10) + (parseInt(m[2], 10) * 3 - 1) / 12;
      } else if (p) {
        year = parseInt(p[1], 10);
        y1 = new Date(year, 0, 1);
        y2 = new Date(year + 1, 0, 1);
        if (y1.getDay() !== 4) y1.setMonth(0, 1 + ((4 - y1.getDay()) + 7) % 7);
        if (y2.getDay() !== 4) y2.setMonth(0, 1 + ((4 - y2.getDay()) + 7) % 7);
        weeks = Math.ceil((y2 - y1) / 604800000);
        return parseInt(p[1], 10) + (parseInt(p[2], 10) - 1) / weeks;
      } else if (n) {
        return parseInt(n[1], 10) + (parseInt(n[2], 10) - 1) / 12;
      } else if (o) {
        year = parseInt(o[1], 10);
        month = parseInt(o[2], 10);
        day = parseInt(o[3], 10);
        timestamp = new Date(year, month - 1, day).getTime();
        y1 = new Date(year, 0, 1).getTime();
        y2 = new Date(year + 1, 0, 1).getTime();
        return year + (timestamp - y1) / (y2 - y1);
      } else {
        return parseInt(date, 10);
      }
    };

    Line.prototype.commas = function(num) {
      return Math.max(0, num).toFixed(0).replace(/(?=(?:\d{3})+$)(?!^)/g, ',');
    };

    return Line;

  })();

  window.Morris = Morris;

}).call(this);
