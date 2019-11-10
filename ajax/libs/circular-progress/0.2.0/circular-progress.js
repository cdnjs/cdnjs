(function () {
  var autoscale, extendCtx, ctxProperties, CircularProgress;

  ctxProperties = ['fillStyle', 'font', 'globalAlpha', 'globalCompositeOperation',
        'lineCap', 'lineDashOffset', 'lineJoin', 'lineWidth',
        'miterLimit', 'shadowBlur', 'shadowColor', 'shadowOffsetX',
        'shadowOffsetY', 'strokeStyle', 'textAlign', 'textBaseLine'];

  // autoscale function from https://github.com/component/autoscale-canvas
  autoscale = function (canvas) {
    var ctx = canvas.getContext('2d'),
    ratio = window.devicePixelRatio || 1;

    if (1 !== ratio) {
      canvas.style.width = canvas.width + 'px';
      canvas.style.height = canvas.height + 'px';
      canvas.width *= ratio;
      canvas.height *= ratio;
      ctx.scale(ratio, ratio);
    }

    return canvas;
  };

  extendCtx = function (ctx, options) {
    for (var i in options) {
      if (ctxProperties.indexOf(i) === -1) continue;

      ctx[i] = options[i];
    }
  };

  CircularProgress = this.CircularProgress = function (options) {
    var ctx, i, property;

    options = options || {};
    this.el = document.createElement('canvas');

    this.options = options;

    options.text = options.text || {};
    options.text.value = options.text.value || null;

    ctx = this.el.getContext('2d');

    for (i in ctxProperties) {
      property = ctxProperties[i];
      options[property]= typeof options[property] !== 'undefined' ? options[property] : ctx[property];
    }

    if (options.radius) this.radius(options.radius);
  };

  CircularProgress.prototype.update = function (value) {
    this._percent = value;
    this.draw();
    return this;
  };

  CircularProgress.prototype.radius = function (value) {
    var size = value * 2;
    this.el.width = size;
    this.el.height = size;
    autoscale(this.el);
    return this;
  };

  CircularProgress.prototype.draw = function () {
    var tw, text, fontSize,
        options = this.options,
        ctx = this.el.getContext('2d'),
        percent = Math.min(this._percent, 100),
        ratio = window.devicePixelRatio || 1,
        angle = Math.PI * 2 * percent / 100,
        size = this.el.width / ratio,
        half = size / 2,
        x = half,
        y = half;

    ctx.clearRect(0, 0, size, size);

    // initial circle
    if (options.initial) {
      extendCtx(ctx, options);
      extendCtx(ctx, options.initial);

      ctx.beginPath();
      ctx.arc(x, y, half - ctx.lineWidth, 0, 2 * Math.PI, false);
      ctx.stroke();
    }

    // progress circle
    extendCtx(ctx, options);

    ctx.beginPath();
    ctx.arc(x, y, half - ctx.lineWidth, 0, angle, false);
    ctx.stroke();

    // text
    if (options.text) {
      extendCtx(ctx, options);
      extendCtx(ctx, options.text);
    }

    text = options.text.value === null ? (percent | 0) + '%' : '';
    tw = ctx.measureText(text).width;
    fontSize = ctx.font.match(/(\d+)px/);
    fontSize = fontSize ? fontSize[1] : 0;

    ctx.fillText(text, x - tw / 2 + 1, y + fontSize / 2 - 1);

    return this;
  };

}).call(this);