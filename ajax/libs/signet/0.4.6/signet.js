(function() {
  var authors, deferConsole, drawLinks, drawSignet, getMetaList, links, measureTextWidth, supportsLogBackgroundImage, textFont, textFontSize, textLineHeight, _ref;

  if (((_ref = window.console) != null ? _ref.log : void 0) == null) {
    return;
  }

  getMetaList = function(name) {
    var content, element, head, _ref1;
    head = document.head || document.getElementsByTagName("head")[0];
    content = (_ref1 = head.querySelector("meta[name='" + name + "']")) != null ? _ref1.content : void 0;
    if (content) {
      return (function() {
        var _i, _len, _ref2, _results;
        _ref2 = content.split(',');
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          element = _ref2[_i];
          _results.push(typeof element.trim === "function" ? element.trim() : void 0);
        }
        return _results;
      })();
    }
    return void 0;
  };

  authors = getMetaList('signet:authors');

  links = getMetaList('signet:links');

  textFont = '400 12px "Helvetica Neue", Helvetica, Arial, sans-serif';

  textFontSize = 12;

  textLineHeight = 16;

  supportsLogBackgroundImage = (function() {
    var isFF, isIE, isOpera, isSafari, operaSupport, safariSupport;
    isIE = function() {
      return /MSIE/.test(navigator.userAgent);
    };
    isFF = function() {
      return /Firefox/.test(navigator.userAgent);
    };
    isOpera = function() {
      return /OPR/.test(navigator.userAgent) && /Opera/.test(navigator.vendor);
    };
    isSafari = function() {
      return /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    };
    safariSupport = function() {
      var m;
      m = navigator.userAgent.match(/AppleWebKit\/(\d+)\.(\d+)(\.|\+|\s)/);
      if (!m) {
        return false;
      }
      return 537.38 <= parseInt(m[1], 10) + (parseInt(m[2], 10) / 100);
    };
    operaSupport = function() {
      var m;
      m = navigator.userAgent.match(/OPR\/(\d+)\./);
      if (!m) {
        return false;
      }
      return 15 <= parseInt(m[1], 10);
    };
    return !isIE() && !isFF() && (!isOpera() || operaSupport()) && (!isSafari() || safariSupport());
  })();

  deferConsole = function(fn) {
    var callable, i, messages, old, type, types, _fn, _i, _len;
    types = ['log', 'debug', 'warn', 'error'];
    old = {};
    callable = {};
    messages = [];
    i = types.length;
    _fn = function(type) {
      old[type] = console[type];
      callable[type] = function() {
        return old[type].apply(console, arguments);
      };
      return console[type] = function() {
        messages.push([type, arguments]);
        return void 0;
      };
    };
    for (i = _i = 0, _len = types.length; _i < _len; i = ++_i) {
      type = types[i];
      _fn(type);
    }
    return setTimeout(function() {
      var block, message, _j, _len1, _results;
      for (_j = 0, _len1 = types.length; _j < _len1; _j++) {
        type = types[_j];
        console[type] = old[type];
      }
      fn();
      _results = [];
      while (messages.length) {
        block = messages.shift();
        type = block[0];
        message = block[1];
        _results.push(console[type].apply(console, message));
      }
      return _results;
    }, 0);
  };

  drawSignet = function() {
    var author, authorHeight, barHeight, barTop, barWidth, canvas, canvasHeight, canvasWidth, colors, context, drawRectangle, drawText, height, hue, i, imageCSS, individualBarLeft, individualBarWidth, j, leftOffsetHack, letter, lineHeightHack, repeatHack, _i, _j, _k, _len, _len1, _len2, _ref1;
    if (!(authors != null ? authors.length : void 0)) {
      return;
    }
    if (!supportsLogBackgroundImage) {
      console.log("Author" + (authors.length === 1 ? '' : 's') + ":");
      for (_i = 0, _len = authors.length; _i < _len; _i++) {
        author = authors[_i];
        console.log(author);
      }
      return;
    }
    canvasHeight = 480;
    canvasWidth = ((_ref1 = document.body) != null ? _ref1.clientWidth : void 0) || 480;
    authorHeight = 20;
    barHeight = authorHeight / 2;
    barWidth = 60;
    height = authors.length * authorHeight + 25;
    repeatHack = 14;
    lineHeightHack = -35;
    leftOffsetHack = -24;
    canvas = document.createElement('canvas');
    canvas.height = 1000;
    canvas.width = canvasWidth;
    context = canvas.getContext('2d');
    context.font = textFont;
    drawRectangle = function(left, top, width, height, color) {
      context.fillStyle = color;
      return context.fillRect(left, top + repeatHack, width, height);
    };
    drawText = function(text, top) {
      context.fillStyle = '#444';
      return context.fillText(text, barWidth + 10, top + repeatHack);
    };
    drawRectangle(0, -repeatHack, canvasWidth, height, 'white');
    for (i = _j = 0, _len1 = authors.length; _j < _len1; i = ++_j) {
      author = authors[i];
      drawText(author, (authorHeight * i) + 14);
      colors = author.replace(/\s/g, '');
      barTop = authorHeight * i + ((authorHeight - barHeight) / 2);
      for (j = _k = 0, _len2 = colors.length; _k < _len2; j = ++_k) {
        letter = colors[j];
        individualBarLeft = Math.floor((barWidth * j) / colors.length);
        individualBarWidth = Math.ceil(((barWidth * (j + 1)) / colors.length) - individualBarLeft);
        hue = ((letter.toLowerCase().charCodeAt(0) * 2) + (colors.toLowerCase().charCodeAt(0) * 5)) % 256;
        drawRectangle(individualBarLeft, barTop, individualBarWidth, barHeight, "hsl(" + hue + ", 80%, 80%)");
      }
    }
    imageCSS = "font-size: 0; line-height: " + (height + lineHeightHack) + "px; padding: " + (Math.floor(height / 2)) + "px " + canvasWidth + "px " + (Math.ceil(height / 2)) + "px 0; background-image: url(\"" + (canvas.toDataURL()) + "\"); margin-left: " + leftOffsetHack + "px";
    return console.log('%c ', imageCSS);
  };

  drawLinks = function() {
    var IMAGES, domain, domainPart, domainPartWidth, i, image, img, leftMargin, link, linksArgs, pathPart, pathPartWidth, whiteCoverWidth, _i, _j, _len, _len1;
    if (!(links != null ? links.length : void 0)) {
      return;
    }
    if (!supportsLogBackgroundImage) {
      for (_i = 0, _len = links.length; _i < _len; _i++) {
        link = links[_i];
        console.log(link);
      }
      return;
    }
    IMAGES = {
      'twitter.com': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAGFBMVEWEu/Tf7fxirPK41vg3nPABj+4omO/+//+b16fMAAAAVklEQVR42lXNQRJEUQRDUSRh/ztu8QZd/46cokrMpz/zMR+CBSwrzFBLlbFDYYbdlLegxFq2crzlTu3MrH6p7hF0onDM4inGtJs+PaK0EdYdA8iD+ekHsEgEIt/uHNUAAAAASUVORK5CYII=',
      'github.com': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAGFBMVEVCQUIsKyu8u7ugn6B7envc29wSERH+/v6nd/awAAAAWklEQVQIHT3BiQ0CQBDEsNkv6b9jEDphR70tqD01Ojyjcfgbc9C9M9sNl4Xz52BTxCdUYH0WAuuzkILz54rKUpnT68Dm2GV0+Lo4TJ820EanqrWhNert6c2pH7EtBBOlbNv9AAAAAElFTkSuQmCC',
      'plus.google.com': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAFVBMVEXic2r88vHLOCDzzMnpoJvVDQDdSzg1eZqZAAAAWklEQVR42lXPORIDQAgDQV3o/082a5x4qhR0QADaajb1hRWy4bhyTEbHMb/rHzHJPIau3bdlG9MDksZSConCRlHFfr7bCTNTerodC+fYmrbTHtUk0I/SfXB9AElwAxEwF7nBAAAAAElFTkSuQmCC'
    };
    linksArgs = ['%c\n', 'line-height: 0; font-size: 0'];
    for (i = _j = 0, _len1 = links.length; _j < _len1; i = ++_j) {
      link = links[i];
      domainPart = link.replace(/(https?:\/\/[^\/]+(\/|$))(.*)/, '$1');
      pathPart = link.substr(domainPart.length);
      domainPartWidth = measureTextWidth(domainPart);
      pathPartWidth = measureTextWidth(pathPart);
      image = null;
      for (domain in IMAGES) {
        img = IMAGES[domain];
        if ((new RegExp("^(https?://)?(www\.)?" + domain + "/", 'i')).test(link)) {
          image = img;
          break;
        }
      }
      if (image) {
        linksArgs[0] += "%c" + link + "%c %c %c\n";
        leftMargin = -domainPartWidth;
      } else {
        linksArgs[0] += "%c" + link + "\n";
        leftMargin = 0;
      }
      linksArgs.push("-webkit-font-smoothing: antialiased; font: " + textFont + "; margin-left: " + leftMargin + "px");
      if (image) {
        whiteCoverWidth = 42;
        leftMargin = -pathPartWidth - whiteCoverWidth;
        linksArgs.push("background: #fff; line-height: " + textLineHeight + "px; padding: " + ((textLineHeight / 2) + 2) + "px " + (whiteCoverWidth / 2) + "px " + ((textLineHeight / 2) + 2) + "px " + (whiteCoverWidth / 2) + "px; font-size: 0; margin-left: " + leftMargin + "px");
        leftMargin = -(whiteCoverWidth / 2) + 2;
        linksArgs.push("background: #fff url(" + image + "); line-height: " + textLineHeight + "px; padding: 11px 14px 3px 0; font-size: 0; margin-left: " + leftMargin + "px");
        linksArgs.push('');
      }
    }
    return console.log.apply(console, linksArgs);
  };

  measureTextWidth = function(text) {
    var canvas, context;
    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    context.font = textFont;
    return context.measureText(text).width;
  };

  deferConsole(function() {
    drawSignet();
    return drawLinks();
  });

}).call(this);
