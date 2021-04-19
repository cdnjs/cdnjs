(function (root, factory) {

  var pluginName = 'PolygonAvatar';

  if (typeof define === 'function' && define.amd) {
    define([], factory(pluginName));
  } else if (typeof exports === 'object') {
    module.exports = factory(pluginName);
  } else {
    root[pluginName] = factory(pluginName);
  }
}(this, function (pluginName) {

  'use strict';
  const progressBarColorDefault = '#4ff461';
  const borderColorDefault = '#1d2333';
  const progressBgColorDefault = '#293249';
  const pictureBgDefault = '#000';
  const onlineColorDefault = '#40d04f';
  const offlineColorDefault = '#888888';
  const levelBgColorDefault = '#7750f8';

  var defaults = {
    selector: '.polyavatar',
    classToAdd: "loaded",
    sides: 6,
    percentage: 0.98,
    rotation: -Math.PI * 0.5,
    image: '',
    animated: true,
    hasImage: false,
    showProgress: true,
    border: true,
    progressBarColor: progressBarColorDefault,
    borderColor: borderColorDefault,
    progressBgColor: progressBgColorDefault,
    onlineColor: onlineColorDefault,
    offlineColor: offlineColorDefault,
    levelBgColor: levelBgColorDefault
  };

  /**
   * Merge defaults with user options
   * @param {Object} defaults Default settings
   * @param {Object} options User options
   */
  var extend = function (target, options) {
    var prop, extended = {};
    for (prop in defaults) {
      if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
        extended[prop] = defaults[prop];
      }
    }
    for (prop in options) {
      if (Object.prototype.hasOwnProperty.call(options, prop)) {
        extended[prop] = options[prop];
      }
    }
    return extended;
  };

  /**
   * Helper Functions
   @private
   */
  var point = function (x, y) {
    return {
      x,
      y
    }
  }

  var polygon = function (sides, radius, outerSpace, rot = 0) {
    var i = 0;
    const step = Math.PI * 2 / sides,
      path = [];
    while (i < sides) {
      var pt = point((Math.cos(i * step + rot) * radius) + outerSpace, (Math.sin((i++) * step + rot) * radius) + outerSpace);
      path.push(pt);
    }
    return path;
  }

  var setImg = function (bg, canvas, width, ctx, outerSpace) {
    var img;
    if (bg instanceof Image) {
      img = bg;
    } else {
      img = new Image();
      img.src = bg;
    }

    if (img.complete) {
      setImageBackground(canvas, width, ctx, img, outerSpace);
    } else {
      img.onload = function () {
        setImageBackground(canvas, width, ctx, img, outerSpace);
      };
    }

    return img;
  }

  var setImageBackground = function (canvas, width, ctx, img, outerSpace) {
    var imgWidth = img.width,
      imgHeight = img.height,
      percentWidth = width / imgWidth,
      percentHeight = width / imgHeight,
      percentImage = percentHeight > percentWidth ? percentHeight : percentWidth,
      newWidth = imgWidth * percentImage * (outerSpace === 0 ? 1 : 0.85 - (width / outerSpace) / 100),
      newHeight = imgHeight * percentImage * (outerSpace === 0 ? 1 : 0.85 - (width / outerSpace) / 100),
      offsetWidth = -(newWidth / 2) + outerSpace,
      offsetHeight = -(newHeight / 2) + outerSpace;

    ctx.save();
    ctx.clip();
    if (canvas.clip) {
      if (canvas.checkSupportCompositeMode(ctx, "destination-in")) {
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight, offsetWidth, offsetHeight, newWidth, newHeight);
        canvas.makeClipMask.call(canvas);
      } else {
        canvas.makeClipMask.call(canvas);
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight, offsetWidth, offsetHeight, newWidth, newHeight);
      }
    } else {
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight, offsetWidth, offsetHeight, newWidth, newHeight);
    }
    ctx.restore();
  };

  function roundedPath(ctx, path, width, radius) {
    var i = 0,
      p1 = path[i++],
      p2 = path[i];
    const len = path.length
    ctx.lineCap = 'butt';
    ctx.moveTo((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
    while (i <= len) {
      p1 = p2;
      p2 = path[(++i) % len];
      ctx.arcTo(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2, width / radius);
    }
  }

  function drawCircle(ctx, centerX, centerY, radius, style, strokeStyle) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = style;
    ctx.fill();

    ctx.lineWidth = radius / 4.5;
    if (strokeStyle === undefined) {
      ctx.strokeStyle = shadeColor(ctx.fillStyle, -30);
    } else {
      ctx.strokeStyle = strokeStyle;
    }

    ctx.stroke();
  }

  var strokeRoundedPath = function (ctx, cx, cy, path, width, radius, style, barWidth) {
    ctx.setTransform(1, 0, 0, 1, cx, cy);
    ctx.lineWidth = barWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = style;
    ctx.beginPath();
    roundedPath(ctx, path, width, radius);
    ctx.closePath();
    ctx.stroke();
  }

  var fillRoundedPath = function (canvas, ctx, outerSpace, cx, cy, path, width, radius, style, img) {
    ctx.setTransform(1, 0, 0, 1, cx, cy);
    ctx.fillStyle = style;
    ctx.beginPath();
    roundedPath(ctx, path, width, radius);
    ctx.fill();

    if (img !== undefined) {
      setImageBackground(canvas, width, ctx, img, outerSpace);
    }
  }

  var fillStatusCircle = function (canvas, ctx, cx, cy, radius, style, borderColor) {
    ctx.lineDashOffset = 1;
    var centerX = canvas.width / 4;
    var centerY = canvas.height - (canvas.height / 4);

    ctx.setTransform(1, 0, 0, 1, cx, cy);
    drawCircle(ctx, centerX, centerY, radius, style, borderColor);
  }

  var fillLevelCircle = function (canvas, ctx, cx, cy, radius, style) {
    ctx.lineDashOffset = 1;
    var centerX = canvas.width - (canvas.width / 4);
    var centerY = canvas.height / 4;

    ctx.setTransform(1, 0, 0, 1, cx, cy);
    drawCircle(ctx, centerX, centerY, radius, style);
  }

  function fillLevelNumber(ctx, width, number, pos, miniPolygonRadius) {
      let xFactor = number < 10 ? 4 : 2;
      let yFactor = number < 10 ? 2.5 : 2.5;
      
      if(width <= 32){
        xFactor = number < 10 ? 1 : 3;
        yFactor = number < 10 ? 2.1 : 2;
        miniPolygonRadius *= 1.1;
      }
      if(width <= 40){
        xFactor = number < 10 ? 8 : 2.8;
        yFactor = number < 10 ? 2.1 : 2.3;
        miniPolygonRadius *= 1.2;
      }
      else if(width <= 64){
        xFactor = number < 10 ? 5.5 : 2.1;
        yFactor = number < 10 ? 2.5 : 2.5;
        miniPolygonRadius *= 1.2;
      }
      else if(width <= 256){
        xFactor = number < 10 ? 4 : 2;
        yFactor = number < 10 ? 2.5 : 2.5;
      }

      ctx.setTransform(1, 0, 0, 1, pos, pos);
      ctx.font = miniPolygonRadius + "px Arial";
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.fillText(number, 0 - miniPolygonRadius / xFactor, 0 + miniPolygonRadius / yFactor);
      ctx.fill();
  }

  function shadeColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }

  var render = function (canvas, ctx, options, outerSpace, polyRadius, bgPoly, hexPoly, hexPolyInner, hexBar, width, barWidth, inset, cornerRadius, approxLineLen, percentage, progress) {
    if (percentage === undefined && progress == undefined) {
      progress = 0.0;
      percentage = setPercentage(canvas, options.percentage);
    }

    var currentProgress = progress % 1;
    if (options.animated === false) {
      currentProgress = percentage;
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fillRoundedPath(canvas, ctx, outerSpace, polyRadius, polyRadius, bgPoly, width, cornerRadius, options.borderColor);
    fillRoundedPath(canvas, ctx, outerSpace, polyRadius, polyRadius, hexPoly, width, cornerRadius, options.progressBgColor);
    fillRoundedPath(canvas, ctx, outerSpace, polyRadius, polyRadius, hexPolyInner, width, cornerRadius - barWidth * inset * 2, pictureBgDefault, options.img);
    ctx.lineDashOffset = approxLineLen - currentProgress * approxLineLen;

    if (options.showProgress === true) {
      if (options.animated === true) {
        strokeRoundedPath(ctx, polyRadius, polyRadius, hexBar, width, cornerRadius - barWidth * inset, options.progressBarColor, barWidth);

        if (currentProgress < percentage) {
          progress += 0.01;
          requestAnimationFrame(function () {
            render(canvas, ctx, options, outerSpace, polyRadius, bgPoly, hexPoly, hexPolyInner, hexBar, width, barWidth, inset, cornerRadius, approxLineLen, percentage, progress, options.progressBarColor);
          });
        }
      } else {
        strokeRoundedPath(ctx, polyRadius, polyRadius, hexBar, width, cornerRadius - barWidth * inset, options.progressBarColor, barWidth);
      }
    }

    if (options.online !== undefined) {
      fillStatusCircle(canvas, ctx, 0, 0, canvas.width / 12, (options.online ? options.onlineColor : options.offlineColor), options.borderColor);
    }

    if (options.sides > 4 && outerSpace > 0 && options.levelNumber > 0) {
      let polyRadiusFactor = 3;
      let miniPolygonRadiusFactor = 0.8;
      let posFactor = 3.65;

      if(width <= 32){
      }
      if(width <= 40){
        polyRadiusFactor =  2;
        miniPolygonRadiusFactor = 0.9;
        posFactor = 3;
      }
      else if(width <= 64){
        polyRadiusFactor =  2;
        miniPolygonRadiusFactor = 0.9;
        posFactor = 3;
      }


      const miniPolygonRadius = polyRadius / polyRadiusFactor;
      const miniInnerPolygonRadius = miniPolygonRadius * miniPolygonRadiusFactor;
      const pos = width - (width / posFactor);

      const bgLevelNumber = polygon(options.sides, miniPolygonRadius, 1, options.rotation);
      const bgLevelNumberInner = polygon(options.sides, miniInnerPolygonRadius, 1, options.rotation);
      fillRoundedPath(canvas, ctx, outerSpace, pos, pos, bgLevelNumber, width, cornerRadius, options.borderColor);
      fillRoundedPath(canvas, ctx, outerSpace, pos, pos, bgLevelNumberInner, width, cornerRadius, options.levelBgColor);
      fillLevelNumber(ctx, width, options.levelNumber, pos, miniPolygonRadius);
    }
  }

  var setPercentage = function (canvas, optionsPerc) {
    var perc = optionsPerc;
    if (canvas.dataset.percentage && defaults.percentage === optionsPerc) {
      perc = parseFloat(canvas.dataset.percentage);
    }
    if (perc >= 1) {
      perc = defaults.percentage;
    }
    return perc;
  }

  /**
   * Plugin Object
   * @param {Object} options User options
   * @constructor
   */
  function Plugin(options) {
    this.options = extend(defaults, options);
    this.init(); // Initialization Code Here
  }

  /**
   * Plugin prototype
   * @public
   * @constructor
   */
  Plugin.prototype = {
    init: function () {
      // find all matching DOM elements.
      // makes `.selectors` object available to instance.
      this.elements = document.querySelectorAll(this.options.selector);

      this.options.hasImage = this.options.image !== '';
      if (this.options.sides < 3) {
        this.options.sides = 3;
      }

      for (var i = 0; i < this.elements.length; i++) {
        const canvas = this.elements[i];
        canvas.classList.add(this.options.classToAdd);

        const width = canvas.width;

        const barWidth = width / 24;
        const outerSpace = this.options.border === true ? ((width / 100) * 10) : 0;
        const cornerRadius = barWidth * 2 + 10;
        const bgRadius = (width / 2);
        const polyRadius = (width / 2) - outerSpace;
        const inset = 0.5;
        const barRadius = polyRadius - barWidth * inset;
        const approxLineLen = (barRadius * Math.PI * 2) * defaults.percentage;

        const bgPoly = polygon(this.options.sides, bgRadius, outerSpace, this.options.rotation);
        const hexPoly = polygon(this.options.sides, polyRadius, outerSpace, this.options.rotation);
        const hexPolyInner = polygon(this.options.sides, polyRadius - barWidth * 2 * inset, outerSpace, this.options.rotation);;
        const hexBar = polygon(this.options.sides, barRadius, outerSpace, this.options.rotation);

        const ctx = canvas.getContext("2d");
        ctx.setLineDash([approxLineLen]);

        var obj = this;
        if (obj.options.hasImage === true) {
          obj.options.img = setImg(obj.options.image, canvas, width, ctx, outerSpace);
          obj.options.img.onload = function (x) {
            render(canvas, ctx, obj.options, outerSpace, polyRadius, bgPoly, hexPoly, hexPolyInner, hexBar, width, barWidth, inset, cornerRadius, approxLineLen);
          }
        } else {
          render(canvas, ctx, obj.options, outerSpace, polyRadius, bgPoly, hexPoly, hexPolyInner, hexBar, width, barWidth, inset, cornerRadius, approxLineLen);
        }
      }
    }, // #! init
    destroy: function () {
      // Remove any event listeners and undo any "init" actions here...
    },
    showOptions: function () {
      console.log(this.options)
    }
  };
  return Plugin;
}));