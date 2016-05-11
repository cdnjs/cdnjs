/*Copyrights for code authored by Yahoo Inc. is licensed under the following terms:
MIT License
Copyright  2015 Yahoo Inc.
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
;(function(window, document, navigator, undefined) {
var utils, error, defaultOptions, isSupported, isWebCamGIFSupported, isExistingImagesGIFSupported, isExistingVideoGIFSupported, NeuQuant, processFrameWorker, gifWriter, AnimatedGIF, getBase64GIF, existingImages, screenShot, videoStream, stopVideoStreaming, createAndGetGIF, existingVideo, existingWebcam, createGIF, takeSnapShot, API;
utils = function () {
  var utils = {
    'URL': window.URL || window.webkitURL || window.mozURL || window.msURL,
    'getUserMedia': function () {
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      return getUserMedia ? getUserMedia.bind(navigator) : getUserMedia;
    }(),
    'requestAnimFrame': window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame,
    'requestTimeout': function (callback, delay) {
      callback = callback || utils.noop;
      delay = delay || 0;
      if (!utils.requestAnimFrame) {
        return setTimeout(callback, delay);
      }
      var start = new Date().getTime(), handle = new Object(), requestAnimFrame = utils.requestAnimFrame;
      function loop() {
        var current = new Date().getTime(), delta = current - start;
        delta >= delay ? callback.call() : handle.value = requestAnimFrame(loop);
      }
      handle.value = requestAnimFrame(loop);
      return handle;
    },
    'Blob': window.Blob || window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
    'btoa': function () {
      var btoa = window.btoa || function (input) {
        var output = '', i = 0, l = input.length, key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=', chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        while (i < l) {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = (chr1 & 3) << 4 | chr2 >> 4;
          enc3 = (chr2 & 15) << 2 | chr3 >> 6;
          enc4 = chr3 & 63;
          if (isNaN(chr2))
            enc3 = enc4 = 64;
          else if (isNaN(chr3))
            enc4 = 64;
          output = output + key.charAt(enc1) + key.charAt(enc2) + key.charAt(enc3) + key.charAt(enc4);
        }
        return output;
      };
      return btoa ? btoa.bind(window) : function () {
      };
    }(),
    'isObject': function (obj) {
      return obj && Object.prototype.toString.call(obj) === '[object Object]';
    },
    'isEmptyObject': function (obj) {
      return utils.isObject(obj) && !Object.keys(obj).length;
    },
    'isArray': function (arr) {
      return arr && Array.isArray(arr);
    },
    'isFunction': function (func) {
      return func && typeof func === 'function';
    },
    'isElement': function (elem) {
      return elem && elem.nodeType === 1;
    },
    'isString': function (value) {
      return typeof value === 'string' || Object.prototype.toString.call(value) === '[object String]';
    },
    'isSupported': {
      'canvas': function () {
        var el = document.createElement('canvas');
        return el && el.getContext && el.getContext('2d');
      },
      'webworkers': function () {
        return window.Worker;
      },
      'blob': function () {
        return utils.Blob;
      },
      'Uint8Array': function () {
        return window.Uint8Array;
      },
      'Uint32Array': function () {
        return window.Uint32Array;
      },
      'videoCodecs': function () {
        var testEl = document.createElement('video'), supportObj = {
            'mp4': false,
            'h264': false,
            'ogv': false,
            'ogg': false,
            'webm': false
          };
        try {
          if (testEl && testEl.canPlayType) {
            supportObj.mp4 = testEl.canPlayType('video/mp4; codecs="mp4v.20.8"') !== '';
            supportObj.h264 = (testEl.canPlayType('video/mp4; codecs="avc1.42E01E"') || testEl.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')) !== '';
            supportObj.ogv = testEl.canPlayType('video/ogg; codecs="theora"') !== '';
            supportObj.ogg = testEl.canPlayType('video/ogg; codecs="theora"') !== '';
            supportObj.webm = testEl.canPlayType('video/webm; codecs="vp8, vorbis"') !== -1;
          }
        } catch (e) {
        }
        return supportObj;
      }()
    },
    'noop': function () {
    },
    'each': function (collection, callback) {
      var x, len;
      if (utils.isArray(collection)) {
        x = -1;
        len = collection.length;
        while (++x < len) {
          if (callback(x, collection[x]) === false) {
            break;
          }
        }
      } else if (utils.isObject(collection)) {
        for (x in collection) {
          if (collection.hasOwnProperty(x)) {
            if (callback(x, collection[x]) === false) {
              break;
            }
          }
        }
      }
    },
    'mergeOptions': function deepMerge(defaultOptions, userOptions) {
      if (!utils.isObject(defaultOptions) || !utils.isObject(userOptions) || !Object.keys) {
        return;
      }
      var newObj = {};
      utils.each(defaultOptions, function (key, val) {
        newObj[key] = defaultOptions[key];
      });
      utils.each(userOptions, function (key, val) {
        var currentUserOption = userOptions[key];
        if (!utils.isObject(currentUserOption)) {
          newObj[key] = currentUserOption;
        } else {
          if (!defaultOptions[key]) {
            newObj[key] = currentUserOption;
          } else {
            newObj[key] = deepMerge(defaultOptions[key], currentUserOption);
          }
        }
      });
      return newObj;
    },
    'setCSSAttr': function (elem, attr, val) {
      if (!utils.isElement(elem)) {
        return;
      }
      if (utils.isString(attr) && utils.isString(val)) {
        elem.style[attr] = val;
      } else if (utils.isObject(attr)) {
        utils.each(attr, function (key, val) {
          elem.style[key] = val;
        });
      }
    },
    'removeElement': function (node) {
      if (!utils.isElement(node)) {
        return;
      }
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
    },
    'createWebWorker': function (content) {
      if (!utils.isString(content)) {
        return {};
      }
      try {
        var blob = new utils.Blob([content], { 'type': 'text/javascript' }), objectUrl = utils.URL.createObjectURL(blob), worker = new Worker(objectUrl);
        return {
          'objectUrl': objectUrl,
          'worker': worker
        };
      } catch (e) {
        return '' + e;
      }
    },
    'getExtension': function (src) {
      return src.substr(src.lastIndexOf('.') + 1, src.length);
    },
    'getFontSize': function (options) {
      options = options || {};
      if (!document.body || options.resizeFont === false) {
        return options.fontSize;
      }
      var text = options.text, containerWidth = options.gifWidth, fontSize = parseInt(options.fontSize, 10), minFontSize = parseInt(options.minFontSize, 10), div = document.createElement('div'), span = document.createElement('span');
      div.setAttribute('width', containerWidth);
      div.appendChild(span);
      span.innerHTML = text;
      span.style.fontSize = fontSize + 'px';
      span.style.textIndent = '-9999px';
      span.style.visibility = 'hidden';
      document.body.appendChild(span);
      while (span.offsetWidth > containerWidth && fontSize >= minFontSize) {
        span.style.fontSize = --fontSize + 'px';
      }
      document.body.removeChild(span);
      return fontSize + 'px';
    },
    'webWorkerError': false
  };
  return utils;
}();
error = function (utils) {
  var error = {
    'validate': function (skipObj) {
      skipObj = utils.isObject(skipObj) ? skipObj : {};
      var errorObj = {};
      utils.each(error.validators, function (indece, currentValidator) {
        var errorCode = currentValidator.errorCode;
        if (!skipObj[errorCode] && !currentValidator.condition) {
          errorObj = currentValidator;
          errorObj.error = true;
          return false;
        }
      });
      delete errorObj.condition;
      return errorObj;
    },
    'isValid': function (skipObj) {
      var errorObj = error.validate(skipObj), isValid = errorObj.error !== true ? true : false;
      return isValid;
    },
    'validators': [
      {
        'condition': utils.isFunction(utils.getUserMedia),
        'errorCode': 'getUserMedia',
        'errorMsg': 'The getUserMedia API is not supported in your browser'
      },
      {
        'condition': utils.isSupported.canvas(),
        'errorCode': 'canvas',
        'errorMsg': 'Canvas elements are not supported in your browser'
      },
      {
        'condition': utils.isSupported.webworkers(),
        'errorCode': 'webworkers',
        'errorMsg': 'The Web Workers API is not supported in your browser'
      },
      {
        'condition': utils.isFunction(utils.URL),
        'errorCode': 'window.URL',
        'errorMsg': 'The window.URL API is not supported in your browser'
      },
      {
        'condition': utils.isSupported.blob(),
        'errorCode': 'window.Blob',
        'errorMsg': 'The window.Blob File API is not supported in your browser'
      },
      {
        'condition': utils.isSupported.Uint8Array(),
        'errorCode': 'window.Uint8Array',
        'errorMsg': 'The window.Uint8Array function constructor is not supported in your browser'
      },
      {
        'condition': utils.isSupported.Uint32Array(),
        'errorCode': 'window.Uint32Array',
        'errorMsg': 'The window.Uint32Array function constructor is not supported in your browser'
      }
    ],
    'messages': {
      'videoCodecs': {
        'errorCode': 'videocodec',
        'errorMsg': 'The video codec you are trying to use is not supported in your browser'
      }
    }
  };
  return error;
}(utils);
defaultOptions = {
  'sampleInterval': 10,
  'numWorkers': 2,
  'gifWidth': 200,
  'gifHeight': 200,
  'interval': 0.1,
  'numFrames': 10,
  'keepCameraOn': false,
  'images': [],
  'video': null,
  'webcamVideoElement': null,
  'cameraStream': null,
  'text': '',
  'fontWeight': 'normal',
  'fontSize': '16px',
  'minFontSize': '10px',
  'resizeFont': false,
  'fontFamily': 'sans-serif',
  'fontColor': '#ffffff',
  'textAlign': 'center',
  'textBaseline': 'bottom',
  'textXCoordinate': null,
  'textYCoordinate': null,
  'progressCallback': function (captureProgress) {
  },
  'completeCallback': function () {
  },
  'saveRenderingContexts': false,
  'savedRenderingContexts': [],
  'crossOrigin': 'Anonymous'
};
isSupported = function () {
  return error.isValid();
};
isWebCamGIFSupported = function () {
  return error.isValid();
};
isExistingImagesGIFSupported = function () {
  var skipObj = { 'getUserMedia': true };
  return error.isValid(skipObj);
};
isExistingVideoGIFSupported = function (codecs) {
  var isSupported = false, hasValidCodec = false;
  if (utils.isArray(codecs) && codecs.length) {
    utils.each(codecs, function (indece, currentCodec) {
      if (utils.isSupported.videoCodecs[currentCodec]) {
        hasValidCodec = true;
      }
    });
    if (!hasValidCodec) {
      return false;
    }
  } else if (utils.isString(codecs) && codecs.length) {
    if (!utils.isSupported.videoCodecs[codecs]) {
      return false;
    }
  }
  return error.isValid({ 'getUserMedia': true });
};
NeuQuant = function () {
  function NeuQuant() {
    var netsize = 256;
    var prime1 = 499;
    var prime2 = 491;
    var prime3 = 487;
    var prime4 = 503;
    var minpicturebytes = 3 * prime4;
    var maxnetpos = netsize - 1;
    var netbiasshift = 4;
    var ncycles = 100;
    var intbiasshift = 16;
    var intbias = 1 << intbiasshift;
    var gammashift = 10;
    var gamma = 1 << gammashift;
    var betashift = 10;
    var beta = intbias >> betashift;
    var betagamma = intbias << gammashift - betashift;
    var initrad = netsize >> 3;
    var radiusbiasshift = 6;
    var radiusbias = 1 << radiusbiasshift;
    var initradius = initrad * radiusbias;
    var radiusdec = 30;
    var alphabiasshift = 10;
    var initalpha = 1 << alphabiasshift;
    var alphadec;
    var radbiasshift = 8;
    var radbias = 1 << radbiasshift;
    var alpharadbshift = alphabiasshift + radbiasshift;
    var alpharadbias = 1 << alpharadbshift;
    var thepicture;
    var lengthcount;
    var samplefac;
    var network;
    var netindex = [];
    var bias = [];
    var freq = [];
    var radpower = [];
    function NeuQuantConstructor(thepic, len, sample) {
      var i;
      var p;
      thepicture = thepic;
      lengthcount = len;
      samplefac = sample;
      network = new Array(netsize);
      for (i = 0; i < netsize; i++) {
        network[i] = new Array(4);
        p = network[i];
        p[0] = p[1] = p[2] = (i << netbiasshift + 8) / netsize | 0;
        freq[i] = intbias / netsize | 0;
        bias[i] = 0;
      }
    }
    function colorMap() {
      var map = [];
      var index = new Array(netsize);
      for (var i = 0; i < netsize; i++)
        index[network[i][3]] = i;
      var k = 0;
      for (var l = 0; l < netsize; l++) {
        var j = index[l];
        map[k++] = network[j][0];
        map[k++] = network[j][1];
        map[k++] = network[j][2];
      }
      return map;
    }
    function inxbuild() {
      var i;
      var j;
      var smallpos;
      var smallval;
      var p;
      var q;
      var previouscol;
      var startpos;
      previouscol = 0;
      startpos = 0;
      for (i = 0; i < netsize; i++) {
        p = network[i];
        smallpos = i;
        smallval = p[1];
        for (j = i + 1; j < netsize; j++) {
          q = network[j];
          if (q[1] < smallval) {
            smallpos = j;
            smallval = q[1];
          }
        }
        q = network[smallpos];
        if (i != smallpos) {
          j = q[0];
          q[0] = p[0];
          p[0] = j;
          j = q[1];
          q[1] = p[1];
          p[1] = j;
          j = q[2];
          q[2] = p[2];
          p[2] = j;
          j = q[3];
          q[3] = p[3];
          p[3] = j;
        }
        if (smallval != previouscol) {
          netindex[previouscol] = startpos + i >> 1;
          for (j = previouscol + 1; j < smallval; j++) {
            netindex[j] = i;
          }
          previouscol = smallval;
          startpos = i;
        }
      }
      netindex[previouscol] = startpos + maxnetpos >> 1;
      for (j = previouscol + 1; j < 256; j++) {
        netindex[j] = maxnetpos;
      }
    }
    function learn() {
      var i;
      var j;
      var b;
      var g;
      var r;
      var radius;
      var rad;
      var alpha;
      var step;
      var delta;
      var samplepixels;
      var p;
      var pix;
      var lim;
      if (lengthcount < minpicturebytes) {
        samplefac = 1;
      }
      alphadec = 30 + (samplefac - 1) / 3;
      p = thepicture;
      pix = 0;
      lim = lengthcount;
      samplepixels = lengthcount / (3 * samplefac);
      delta = samplepixels / ncycles | 0;
      alpha = initalpha;
      radius = initradius;
      rad = radius >> radiusbiasshift;
      if (rad <= 1) {
        rad = 0;
      }
      for (i = 0; i < rad; i++) {
        radpower[i] = alpha * ((rad * rad - i * i) * radbias / (rad * rad));
      }
      if (lengthcount < minpicturebytes) {
        step = 3;
      } else if (lengthcount % prime1 !== 0) {
        step = 3 * prime1;
      } else {
        if (lengthcount % prime2 !== 0) {
          step = 3 * prime2;
        } else {
          if (lengthcount % prime3 !== 0) {
            step = 3 * prime3;
          } else {
            step = 3 * prime4;
          }
        }
      }
      i = 0;
      while (i < samplepixels) {
        b = (p[pix + 0] & 255) << netbiasshift;
        g = (p[pix + 1] & 255) << netbiasshift;
        r = (p[pix + 2] & 255) << netbiasshift;
        j = contest(b, g, r);
        altersingle(alpha, j, b, g, r);
        if (rad !== 0) {
          alterneigh(rad, j, b, g, r);
        }
        pix += step;
        if (pix >= lim) {
          pix -= lengthcount;
        }
        i++;
        if (delta === 0) {
          delta = 1;
        }
        if (i % delta === 0) {
          alpha -= alpha / alphadec;
          radius -= radius / radiusdec;
          rad = radius >> radiusbiasshift;
          if (rad <= 1) {
            rad = 0;
          }
          for (j = 0; j < rad; j++) {
            radpower[j] = alpha * ((rad * rad - j * j) * radbias / (rad * rad));
          }
        }
      }
    }
    function map(b, g, r) {
      var i;
      var j;
      var dist;
      var a;
      var bestd;
      var p;
      var best;
      bestd = 1000;
      best = -1;
      i = netindex[g];
      j = i - 1;
      while (i < netsize || j >= 0) {
        if (i < netsize) {
          p = network[i];
          dist = p[1] - g;
          if (dist >= bestd) {
            i = netsize;
          } else {
            i++;
            if (dist < 0) {
              dist = -dist;
            }
            a = p[0] - b;
            if (a < 0) {
              a = -a;
            }
            dist += a;
            if (dist < bestd) {
              a = p[2] - r;
              if (a < 0) {
                a = -a;
              }
              dist += a;
              if (dist < bestd) {
                bestd = dist;
                best = p[3];
              }
            }
          }
        }
        if (j >= 0) {
          p = network[j];
          dist = g - p[1];
          if (dist >= bestd) {
            j = -1;
          } else {
            j--;
            if (dist < 0) {
              dist = -dist;
            }
            a = p[0] - b;
            if (a < 0) {
              a = -a;
            }
            dist += a;
            if (dist < bestd) {
              a = p[2] - r;
              if (a < 0) {
                a = -a;
              }
              dist += a;
              if (dist < bestd) {
                bestd = dist;
                best = p[3];
              }
            }
          }
        }
      }
      return best;
    }
    function process() {
      learn();
      unbiasnet();
      inxbuild();
      return colorMap();
    }
    function unbiasnet() {
      var i;
      var j;
      for (i = 0; i < netsize; i++) {
        network[i][0] >>= netbiasshift;
        network[i][1] >>= netbiasshift;
        network[i][2] >>= netbiasshift;
        network[i][3] = i;
      }
    }
    function alterneigh(rad, i, b, g, r) {
      var j;
      var k;
      var lo;
      var hi;
      var a;
      var m;
      var p;
      lo = i - rad;
      if (lo < -1) {
        lo = -1;
      }
      hi = i + rad;
      if (hi > netsize) {
        hi = netsize;
      }
      j = i + 1;
      k = i - 1;
      m = 1;
      while (j < hi || k > lo) {
        a = radpower[m++];
        if (j < hi) {
          p = network[j++];
          try {
            p[0] -= a * (p[0] - b) / alpharadbias | 0;
            p[1] -= a * (p[1] - g) / alpharadbias | 0;
            p[2] -= a * (p[2] - r) / alpharadbias | 0;
          } catch (e) {
          }
        }
        if (k > lo) {
          p = network[k--];
          try {
            p[0] -= a * (p[0] - b) / alpharadbias | 0;
            p[1] -= a * (p[1] - g) / alpharadbias | 0;
            p[2] -= a * (p[2] - r) / alpharadbias | 0;
          } catch (e) {
          }
        }
      }
    }
    function altersingle(alpha, i, b, g, r) {
      var n = network[i];
      var alphaMult = alpha / initalpha;
      n[0] -= alphaMult * (n[0] - b) | 0;
      n[1] -= alphaMult * (n[1] - g) | 0;
      n[2] -= alphaMult * (n[2] - r) | 0;
    }
    function contest(b, g, r) {
      var i;
      var dist;
      var a;
      var biasdist;
      var betafreq;
      var bestpos;
      var bestbiaspos;
      var bestd;
      var bestbiasd;
      var n;
      bestd = ~(1 << 31);
      bestbiasd = bestd;
      bestpos = -1;
      bestbiaspos = bestpos;
      for (i = 0; i < netsize; i++) {
        n = network[i];
        dist = n[0] - b;
        if (dist < 0) {
          dist = -dist;
        }
        a = n[1] - g;
        if (a < 0) {
          a = -a;
        }
        dist += a;
        a = n[2] - r;
        if (a < 0) {
          a = -a;
        }
        dist += a;
        if (dist < bestd) {
          bestd = dist;
          bestpos = i;
        }
        biasdist = dist - (bias[i] >> intbiasshift - netbiasshift);
        if (biasdist < bestbiasd) {
          bestbiasd = biasdist;
          bestbiaspos = i;
        }
        betafreq = freq[i] >> betashift;
        freq[i] -= betafreq;
        bias[i] += betafreq << gammashift;
      }
      freq[bestpos] += beta;
      bias[bestpos] -= betagamma;
      return bestbiaspos;
    }
    NeuQuantConstructor.apply(this, arguments);
    var exports = {};
    exports.map = map;
    exports.process = process;
    return exports;
  }
  return NeuQuant;
}();
processFrameWorker = function (NeuQuant) {
  var workerCode = function () {
    try {
      self.onmessage = function (ev) {
        var data = ev.data || {};
        var response;
        if (data.gifshot) {
          response = workerMethods.run(data);
          postMessage(response);
        }
      };
    } catch (e) {
    }
    var workerMethods = {
      'dataToRGB': function (data, width, height) {
        var i = 0, length = width * height * 4, rgb = [];
        while (i < length) {
          rgb.push(data[i++]);
          rgb.push(data[i++]);
          rgb.push(data[i++]);
          i++;
        }
        return rgb;
      },
      'componentizedPaletteToArray': function (paletteRGB) {
        var paletteArray = [], i, r, g, b;
        for (i = 0; i < paletteRGB.length; i += 3) {
          r = paletteRGB[i];
          g = paletteRGB[i + 1];
          b = paletteRGB[i + 2];
          paletteArray.push(r << 16 | g << 8 | b);
        }
        return paletteArray;
      },
      'processFrameWithQuantizer': function (imageData, width, height, sampleInterval) {
        var rgbComponents = this.dataToRGB(imageData, width, height), nq = new NeuQuant(rgbComponents, rgbComponents.length, sampleInterval), paletteRGB = nq.process(), paletteArray = new Uint32Array(this.componentizedPaletteToArray(paletteRGB)), numberPixels = width * height, indexedPixels = new Uint8Array(numberPixels), k = 0, i, r, g, b;
        for (i = 0; i < numberPixels; i++) {
          r = rgbComponents[k++];
          g = rgbComponents[k++];
          b = rgbComponents[k++];
          indexedPixels[i] = nq.map(r, g, b);
        }
        return {
          pixels: indexedPixels,
          palette: paletteArray
        };
      },
      'run': function (frame) {
        var width = frame.width, height = frame.height, imageData = frame.data, palette = frame.palette, sampleInterval = frame.sampleInterval;
        return this.processFrameWithQuantizer(imageData, width, height, sampleInterval);
      }
    };
    return workerMethods;
  };
  return workerCode;
}(NeuQuant);
gifWriter = function gifWriter(buf, width, height, gopts) {
  var p = 0;
  gopts = gopts === undefined ? {} : gopts;
  var loop_count = gopts.loop === undefined ? null : gopts.loop;
  var global_palette = gopts.palette === undefined ? null : gopts.palette;
  if (width <= 0 || height <= 0 || width > 65535 || height > 65535)
    throw 'Width/Height invalid.';
  function check_palette_and_num_colors(palette) {
    var num_colors = palette.length;
    if (num_colors < 2 || num_colors > 256 || num_colors & num_colors - 1)
      throw 'Invalid code/color length, must be power of 2 and 2 .. 256.';
    return num_colors;
  }
  buf[p++] = 71;
  buf[p++] = 73;
  buf[p++] = 70;
  buf[p++] = 56;
  buf[p++] = 57;
  buf[p++] = 97;
  var gp_num_colors_pow2 = 0;
  var background = 0;
  buf[p++] = width & 255;
  buf[p++] = width >> 8 & 255;
  buf[p++] = height & 255;
  buf[p++] = height >> 8 & 255;
  buf[p++] = (global_palette !== null ? 128 : 0) | gp_num_colors_pow2;
  buf[p++] = background;
  buf[p++] = 0;
  if (loop_count !== null) {
    if (loop_count < 0 || loop_count > 65535)
      throw 'Loop count invalid.';
    buf[p++] = 33;
    buf[p++] = 255;
    buf[p++] = 11;
    buf[p++] = 78;
    buf[p++] = 69;
    buf[p++] = 84;
    buf[p++] = 83;
    buf[p++] = 67;
    buf[p++] = 65;
    buf[p++] = 80;
    buf[p++] = 69;
    buf[p++] = 50;
    buf[p++] = 46;
    buf[p++] = 48;
    buf[p++] = 3;
    buf[p++] = 1;
    buf[p++] = loop_count & 255;
    buf[p++] = loop_count >> 8 & 255;
    buf[p++] = 0;
  }
  var ended = false;
  this.addFrame = function (x, y, w, h, indexed_pixels, opts) {
    if (ended === true) {
      --p;
      ended = false;
    }
    opts = opts === undefined ? {} : opts;
    if (x < 0 || y < 0 || x > 65535 || y > 65535)
      throw 'x/y invalid.';
    if (w <= 0 || h <= 0 || w > 65535 || h > 65535)
      throw 'Width/Height invalid.';
    if (indexed_pixels.length < w * h)
      throw 'Not enough pixels for the frame size.';
    var using_local_palette = true;
    var palette = opts.palette;
    if (palette === undefined || palette === null) {
      using_local_palette = false;
      palette = global_palette;
    }
    if (palette === undefined || palette === null)
      throw 'Must supply either a local or global palette.';
    var num_colors = check_palette_and_num_colors(palette);
    var min_code_size = 0;
    while (num_colors >>= 1)
      ++min_code_size;
    num_colors = 1 << min_code_size;
    var delay = opts.delay === undefined ? 0 : opts.delay;
    var disposal = opts.disposal === undefined ? 0 : opts.disposal;
    if (disposal < 0 || disposal > 3)
      throw 'Disposal out of range.';
    var use_transparency = false;
    var transparent_index = 0;
    if (opts.transparent !== undefined && opts.transparent !== null) {
      use_transparency = true;
      transparent_index = opts.transparent;
      if (transparent_index < 0 || transparent_index >= num_colors)
        throw 'Transparent color index.';
    }
    if (disposal !== 0 || use_transparency || delay !== 0) {
      buf[p++] = 33;
      buf[p++] = 249;
      buf[p++] = 4;
      buf[p++] = disposal << 2 | (use_transparency === true ? 1 : 0);
      buf[p++] = delay & 255;
      buf[p++] = delay >> 8 & 255;
      buf[p++] = transparent_index;
      buf[p++] = 0;
    }
    buf[p++] = 44;
    buf[p++] = x & 255;
    buf[p++] = x >> 8 & 255;
    buf[p++] = y & 255;
    buf[p++] = y >> 8 & 255;
    buf[p++] = w & 255;
    buf[p++] = w >> 8 & 255;
    buf[p++] = h & 255;
    buf[p++] = h >> 8 & 255;
    buf[p++] = using_local_palette === true ? 128 | min_code_size - 1 : 0;
    if (using_local_palette === true) {
      for (var i = 0, il = palette.length; i < il; ++i) {
        var rgb = palette[i];
        buf[p++] = rgb >> 16 & 255;
        buf[p++] = rgb >> 8 & 255;
        buf[p++] = rgb & 255;
      }
    }
    p = GifWriterOutputLZWCodeStream(buf, p, min_code_size < 2 ? 2 : min_code_size, indexed_pixels);
  };
  this.end = function () {
    if (ended === false) {
      buf[p++] = 59;
      ended = true;
    }
    return p;
  };
  function GifWriterOutputLZWCodeStream(buf, p, min_code_size, index_stream) {
    buf[p++] = min_code_size;
    var cur_subblock = p++;
    var clear_code = 1 << min_code_size;
    var code_mask = clear_code - 1;
    var eoi_code = clear_code + 1;
    var next_code = eoi_code + 1;
    var cur_code_size = min_code_size + 1;
    var cur_shift = 0;
    var cur = 0;
    function emit_bytes_to_buffer(bit_block_size) {
      while (cur_shift >= bit_block_size) {
        buf[p++] = cur & 255;
        cur >>= 8;
        cur_shift -= 8;
        if (p === cur_subblock + 256) {
          buf[cur_subblock] = 255;
          cur_subblock = p++;
        }
      }
    }
    function emit_code(c) {
      cur |= c << cur_shift;
      cur_shift += cur_code_size;
      emit_bytes_to_buffer(8);
    }
    var ib_code = index_stream[0] & code_mask;
    var code_table = {};
    emit_code(clear_code);
    for (var i = 1, il = index_stream.length; i < il; ++i) {
      var k = index_stream[i] & code_mask;
      var cur_key = ib_code << 8 | k;
      var cur_code = code_table[cur_key];
      if (cur_code === undefined) {
        cur |= ib_code << cur_shift;
        cur_shift += cur_code_size;
        while (cur_shift >= 8) {
          buf[p++] = cur & 255;
          cur >>= 8;
          cur_shift -= 8;
          if (p === cur_subblock + 256) {
            buf[cur_subblock] = 255;
            cur_subblock = p++;
          }
        }
        if (next_code === 4096) {
          emit_code(clear_code);
          next_code = eoi_code + 1;
          cur_code_size = min_code_size + 1;
          code_table = {};
        } else {
          if (next_code >= 1 << cur_code_size)
            ++cur_code_size;
          code_table[cur_key] = next_code++;
        }
        ib_code = k;
      } else {
        ib_code = cur_code;
      }
    }
    emit_code(ib_code);
    emit_code(eoi_code);
    emit_bytes_to_buffer(1);
    if (cur_subblock + 1 === p) {
      buf[cur_subblock] = 0;
    } else {
      buf[cur_subblock] = p - cur_subblock - 1;
      buf[p++] = 0;
    }
    return p;
  }
};
AnimatedGIF = function (utils, frameWorkerCode, NeuQuant, GifWriter) {
  var AnimatedGIF = function (options) {
    this.canvas = null;
    this.ctx = null;
    this.repeat = 0;
    this.frames = [];
    this.numRenderedFrames = 0;
    this.onRenderCompleteCallback = utils.noop;
    this.onRenderProgressCallback = utils.noop;
    this.workers = [];
    this.availableWorkers = [];
    this.generatingGIF = false;
    this.options = options;
    this.initializeWebWorkers(options);
  };
  AnimatedGIF.prototype = {
    'workerMethods': frameWorkerCode(),
    'initializeWebWorkers': function (options) {
      var processFrameWorkerCode = NeuQuant.toString() + '(' + frameWorkerCode.toString() + '());', webWorkerObj, objectUrl, webWorker, numWorkers, x = -1, workerError = '';
      numWorkers = options.numWorkers;
      while (++x < numWorkers) {
        webWorkerObj = utils.createWebWorker(processFrameWorkerCode);
        if (utils.isObject(webWorkerObj)) {
          objectUrl = webWorkerObj.objectUrl;
          webWorker = webWorkerObj.worker;
          this.workers.push({
            'worker': webWorker,
            'objectUrl': objectUrl
          });
          this.availableWorkers.push(webWorker);
        } else {
          workerError = webWorkerObj;
          utils.webWorkerError = !!webWorkerObj;
        }
      }
      this.workerError = workerError;
      this.canvas = document.createElement('canvas');
      this.canvas.width = options.gifWidth;
      this.canvas.height = options.gifHeight;
      this.ctx = this.canvas.getContext('2d');
      this.frames = [];
    },
    'getWorker': function () {
      return this.availableWorkers.pop();
    },
    'freeWorker': function (worker) {
      this.availableWorkers.push(worker);
    },
    'byteMap': function () {
      var byteMap = [];
      for (var i = 0; i < 256; i++) {
        byteMap[i] = String.fromCharCode(i);
      }
      return byteMap;
    }(),
    'bufferToString': function (buffer) {
      var numberValues = buffer.length, str = '', x = -1;
      while (++x < numberValues) {
        str += this.byteMap[buffer[x]];
      }
      return str;
    },
    'onFrameFinished': function (progressCallback) {
      var self = this, frames = self.frames, options = self.options;
      hasExistingImages = !!(options.images || []).length;
      allDone = frames.every(function (frame) {
        return !frame.beingProcessed && frame.done;
      });
      self.numRenderedFrames++;
      if (hasExistingImages) {
        progressCallback(self.numRenderedFrames / frames.length);
      }
      self.onRenderProgressCallback(self.numRenderedFrames * 0.75 / frames.length);
      if (allDone) {
        if (!self.generatingGIF) {
          self.generateGIF(frames, self.onRenderCompleteCallback);
        }
      } else {
        utils.requestTimeout(function () {
          self.processNextFrame();
        }, 1);
      }
    },
    'processFrame': function (position) {
      var AnimatedGifContext = this, options = this.options, progressCallback = options.progressCallback, sampleInterval = options.sampleInterval, frames = this.frames, frame, worker, done = function (ev) {
          var data = ev.data;
          delete frame.data;
          frame.pixels = Array.prototype.slice.call(data.pixels);
          frame.palette = Array.prototype.slice.call(data.palette);
          frame.done = true;
          frame.beingProcessed = false;
          AnimatedGifContext.freeWorker(worker);
          AnimatedGifContext.onFrameFinished(progressCallback);
        };
      frame = frames[position];
      if (frame.beingProcessed || frame.done) {
        this.onFrameFinished();
        return;
      }
      frame.sampleInterval = sampleInterval;
      frame.beingProcessed = true;
      frame.gifshot = true;
      worker = this.getWorker();
      if (worker) {
        worker.onmessage = done;
        worker.postMessage(frame);
      } else {
        done({ 'data': AnimatedGifContext.workerMethods.run(frame) });
      }
    },
    'startRendering': function (completeCallback) {
      this.onRenderCompleteCallback = completeCallback;
      for (var i = 0; i < this.options.numWorkers && i < this.frames.length; i++) {
        this.processFrame(i);
      }
    },
    'processNextFrame': function () {
      var position = -1;
      for (var i = 0; i < this.frames.length; i++) {
        var frame = this.frames[i];
        if (!frame.done && !frame.beingProcessed) {
          position = i;
          break;
        }
      }
      if (position >= 0) {
        this.processFrame(position);
      }
    },
    'generateGIF': function (frames, callback) {
      var buffer = [], gifOptions = { 'loop': this.repeat }, options = this.options, interval = options.interval, existingImages = options.images, hasExistingImages = !!existingImages.length, height = options.gifHeight, width = options.gifWidth, gifWriter = new GifWriter(buffer, width, height, gifOptions), onRenderProgressCallback = this.onRenderProgressCallback, delay = hasExistingImages ? interval * 100 : 0, bufferToString, gif;
      this.generatingGIF = true;
      utils.each(frames, function (iterator, frame) {
        var framePalette = frame.palette;
        onRenderProgressCallback(0.75 + 0.25 * frame.position * 1 / frames.length);
        gifWriter.addFrame(0, 0, width, height, frame.pixels, {
          palette: framePalette,
          delay: delay
        });
      });
      gifWriter.end();
      onRenderProgressCallback(1);
      this.frames = [];
      this.generatingGIF = false;
      if (utils.isFunction(callback)) {
        bufferToString = this.bufferToString(buffer);
        gif = 'data:image/gif;base64,' + utils.btoa(bufferToString);
        callback(gif);
      }
    },
    'setRepeat': function (r) {
      this.repeat = r;
    },
    'addFrame': function (element, gifshotOptions) {
      gifshotOptions = utils.isObject(gifshotOptions) ? gifshotOptions : {};
      var self = this, ctx = self.ctx, options = self.options, width = options.gifWidth, height = options.gifHeight, gifHeight = gifshotOptions.gifHeight, gifWidth = gifshotOptions.gifWidth, text = gifshotOptions.text, fontWeight = gifshotOptions.fontWeight, fontSize = utils.getFontSize(gifshotOptions), fontFamily = gifshotOptions.fontFamily, fontColor = gifshotOptions.fontColor, textAlign = gifshotOptions.textAlign, textBaseline = gifshotOptions.textBaseline, textXCoordinate = gifshotOptions.textXCoordinate ? gifshotOptions.textXCoordinate : textAlign === 'left' ? 1 : textAlign === 'right' ? width : width / 2, textYCoordinate = gifshotOptions.textYCoordinate ? gifshotOptions.textYCoordinate : textBaseline === 'top' ? 1 : textBaseline === 'center' ? height / 2 : height, font = fontWeight + ' ' + fontSize + ' ' + fontFamily, imageData;
      try {
        ctx.drawImage(element, 0, 0, width, height);
        if (text) {
          ctx.font = font;
          ctx.fillStyle = fontColor;
          ctx.textAlign = textAlign;
          ctx.textBaseline = textBaseline;
          ctx.fillText(text, textXCoordinate, textYCoordinate);
        }
        imageData = ctx.getImageData(0, 0, width, height);
        self.addFrameImageData(imageData);
      } catch (e) {
        return '' + e;
      }
    },
    'addFrameImageData': function (imageData) {
      var frames = this.frames, imageDataArray = imageData.data;
      this.frames.push({
        'data': imageDataArray,
        'width': imageData.width,
        'height': imageData.height,
        'palette': null,
        'dithering': null,
        'done': false,
        'beingProcessed': false,
        'position': frames.length
      });
    },
    'onRenderProgress': function (callback) {
      this.onRenderProgressCallback = callback;
    },
    'isRendering': function () {
      return this.generatingGIF;
    },
    'getBase64GIF': function (completeCallback) {
      var self = this, onRenderComplete = function (gif) {
          self.destroyWorkers();
          utils.requestTimeout(function () {
            completeCallback(gif);
          }, 0);
        };
      self.startRendering(onRenderComplete);
    },
    'destroyWorkers': function () {
      if (this.workerError) {
        return;
      }
      var workers = this.workers;
      utils.each(workers, function (iterator, workerObj) {
        var worker = workerObj.worker, objectUrl = workerObj.objectUrl;
        worker.terminate();
        utils.URL.revokeObjectURL(objectUrl);
      });
    }
  };
  return AnimatedGIF;
}(utils, processFrameWorker, NeuQuant, gifWriter);
getBase64GIF = function getBase64GIF(animatedGifInstance, callback) {
  animatedGifInstance.getBase64GIF(function (image) {
    callback({
      'error': false,
      'errorCode': '',
      'errorMsg': '',
      'image': image
    });
  });
};
existingImages = function (obj) {
  var images = obj.images, imagesLength = obj.imagesLength, callback = obj.callback, options = obj.options, skipObj = {
      'getUserMedia': true,
      'window.URL': true
    }, errorObj = error.validate(skipObj), loadedImages = [], loadedImagesLength = 0, tempImage, ag;
  if (errorObj.error) {
    return callback(errorObj);
  }
  ag = new AnimatedGIF(options);
  utils.each(images, function (index, currentImage) {
    if (utils.isElement(currentImage)) {
      if (options.crossOrigin) {
        currentImage.crossOrigin = options.crossOrigin;
      }
      loadedImages[index] = currentImage;
      loadedImagesLength += 1;
      if (loadedImagesLength === imagesLength) {
        addLoadedImagesToGif();
      }
    } else if (utils.isString(currentImage)) {
      tempImage = document.createElement('img');
      if (options.crossOrigin) {
        tempImage.crossOrigin = options.crossOrigin;
      }
      tempImage.onerror = function (e) {
        if (loadedImages.length > index) {
          loadedImages[index] = undefined;
        }
      }(function (tempImage) {
        tempImage.onload = function () {
          loadedImages[index] = tempImage;
          loadedImagesLength += 1;
          if (loadedImagesLength === imagesLength) {
            addLoadedImagesToGif();
          }
          utils.removeElement(tempImage);
        };
      }(tempImage));
      tempImage.src = currentImage;
      utils.setCSSAttr(tempImage, {
        'position': 'fixed',
        'opacity': '0'
      });
      document.body.appendChild(tempImage);
    }
  });
  function addLoadedImagesToGif() {
    utils.each(loadedImages, function (index, loadedImage) {
      if (loadedImage) {
        ag.addFrame(loadedImage, options);
      }
    });
    getBase64GIF(ag, callback);
  }
};
screenShot = {
  getGIF: function (options, callback) {
    callback = utils.isFunction(callback) ? callback : utils.noop;
    var canvas = document.createElement('canvas'), context, existingImages = options.images, hasExistingImages = !!existingImages.length, videoElement = options.videoElement, keepCameraOn = options.keepCameraOn, webcamVideoElement = options.webcamVideoElement, cameraStream = options.cameraStream, gifWidth = +options.gifWidth, gifHeight = +options.gifHeight, videoWidth = options.videoWidth, videoHeight = options.videoHeight, sampleInterval = +options.sampleInterval, numWorkers = +options.numWorkers, crop = options.crop, interval = +options.interval, waitBetweenFrames = hasExistingImages ? 0 : interval * 1000, progressCallback = options.progressCallback, savedRenderingContexts = options.savedRenderingContexts, saveRenderingContexts = options.saveRenderingContexts, renderingContextsToSave = [], numFrames = savedRenderingContexts.length ? savedRenderingContexts.length : options.numFrames, pendingFrames = numFrames, ag = new AnimatedGIF(options), text = options.text, fontWeight = options.fontWeight, fontSize = utils.getFontSize(options), fontFamily = options.fontFamily, fontColor = options.fontColor, textAlign = options.textAlign, textBaseline = options.textBaseline, textXCoordinate = options.textXCoordinate ? options.textXCoordinate : textAlign === 'left' ? 1 : textAlign === 'right' ? gifWidth : gifWidth / 2, textYCoordinate = options.textYCoordinate ? options.textYCoordinate : textBaseline === 'top' ? 1 : textBaseline === 'center' ? gifHeight / 2 : gifHeight, font = fontWeight + ' ' + fontSize + ' ' + fontFamily, sourceX = crop ? Math.floor(crop.scaledWidth / 2) : 0, sourceWidth = crop ? videoWidth - crop.scaledWidth : 0, sourceY = crop ? Math.floor(crop.scaledHeight / 2) : 0, sourceHeight = crop ? videoHeight - crop.scaledHeight : 0, captureFrames = function captureFrame() {
        var framesLeft = pendingFrames - 1;
        if (savedRenderingContexts.length) {
          context.putImageData(savedRenderingContexts[numFrames - pendingFrames], 0, 0);
          finishCapture();
        } else {
          drawVideo();
        }
        function drawVideo() {
          try {
            if (sourceWidth > videoWidth) {
              sourceWidth = videoWidth;
            }
            if (sourceHeight > videoHeight) {
              sourceHeight = videoHeight;
            }
            if (sourceX < 0) {
              sourceX = 0;
            }
            if (sourceY < 0) {
              sourceY = 0;
            }
            context.drawImage(videoElement, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, gifWidth, gifHeight);
            finishCapture();
          } catch (e) {
            if (e.name === 'NS_ERROR_NOT_AVAILABLE') {
              utils.requestTimeout(drawVideo, 100);
            } else {
              throw e;
            }
          }
        }
        function finishCapture() {
          pendingFrames = framesLeft;
          var processedFrames = numFrames - pendingFrames;
          var imageData;
          var data;
          var rgba;
          var isBlackFrame;
          if (saveRenderingContexts) {
            renderingContextsToSave.push(context.getImageData(0, 0, gifWidth, gifHeight));
          }
          if (text) {
            context.font = font;
            context.fillStyle = fontColor;
            context.textAlign = textAlign;
            context.textBaseline = textBaseline;
            context.fillText(text, textXCoordinate, textYCoordinate);
          }
          imageData = context.getImageData(0, 0, gifWidth, gifHeight);
          data = imageData.data;
          rgba = data[0] + data[1] + data[2] + data[3];
          isBlackFrame = rgba === 0;
          if (!isBlackFrame) {
            ag.addFrameImageData(imageData);
          } else if (processedFrames === 1 && numFrames === 1) {
            drawVideo();
          }
          progressCallback(processedFrames / numFrames);
          if (framesLeft > 0) {
            utils.requestTimeout(captureFrame, waitBetweenFrames);
          }
          if (!pendingFrames) {
            ag.getBase64GIF(function (image) {
              callback({
                'error': false,
                'errorCode': '',
                'errorMsg': '',
                'image': image,
                'cameraStream': cameraStream,
                'videoElement': videoElement,
                'webcamVideoElement': webcamVideoElement,
                'savedRenderingContexts': renderingContextsToSave,
                'keepCameraOn': keepCameraOn
              });
            });
          }
        }
      };
    numFrames = numFrames != null ? numFrames : 10;
    interval = interval != null ? interval : 0.1;
    canvas.width = gifWidth;
    canvas.height = gifHeight;
    context = canvas.getContext('2d');
    (function capture() {
      if (!savedRenderingContexts.length && videoElement.currentTime === 0) {
        utils.requestTimeout(capture, 100);
        return;
      }
      captureFrames();
    }());
  },
  'getCropDimensions': function (obj) {
    var width = obj.videoWidth, height = obj.videoHeight, gifWidth = obj.gifWidth, gifHeight = obj.gifHeight, result = {
        width: 0,
        height: 0,
        scaledWidth: 0,
        scaledHeight: 0
      };
    if (width > height) {
      result.width = Math.round(width * (gifHeight / height)) - gifWidth;
      result.scaledWidth = Math.round(result.width * (height / gifHeight));
    } else {
      result.height = Math.round(height * (gifWidth / width)) - gifHeight;
      result.scaledHeight = Math.round(result.height * (width / gifWidth));
    }
    return result;
  }
};
videoStream = {
  'loadedData': false,
  'defaultVideoDimensions': {
    'width': 640,
    'height': 480
  },
  'findVideoSize': function findVideoSizeMethod(obj) {
    findVideoSizeMethod.attempts = findVideoSizeMethod.attempts || 0;
    var self = this, videoElement = obj.videoElement, cameraStream = obj.cameraStream, completedCallback = obj.completedCallback;
    if (!videoElement) {
      return;
    }
    if (videoElement.videoWidth > 0 && videoElement.videoHeight > 0) {
      videoElement.removeEventListener('loadeddata', self.findVideoSize);
      completedCallback({
        'videoElement': videoElement,
        'cameraStream': cameraStream,
        'videoWidth': videoElement.videoWidth,
        'videoHeight': videoElement.videoHeight
      });
    } else {
      if (findVideoSizeMethod.attempts < 10) {
        findVideoSizeMethod.attempts += 1;
        utils.requestTimeout(function () {
          self.findVideoSize(obj);
        }, 200);
      } else {
        completedCallback({
          'videoElement': videoElement,
          'cameraStream': cameraStream,
          'videoWidth': self.defaultVideoDimensions.width,
          'videoHeight': self.defaultVideoDimensions.height
        });
      }
    }
  },
  'onStreamingTimeout': function (callback) {
    if (utils.isFunction(callback)) {
      callback({
        'error': true,
        'errorCode': 'getUserMedia',
        'errorMsg': 'There was an issue with the getUserMedia API - Timed out while trying to start streaming',
        'image': null,
        'cameraStream': {}
      });
    }
  },
  'stream': function (obj) {
    var self = this, existingVideo = utils.isArray(obj.existingVideo) ? obj.existingVideo[0] : obj.existingVideo, videoElement = obj.videoElement, cameraStream = obj.cameraStream, streamedCallback = obj.streamedCallback, completedCallback = obj.completedCallback;
    if (utils.isFunction(streamedCallback)) {
      streamedCallback();
    }
    if (existingVideo) {
      if (utils.isString(existingVideo)) {
        videoElement.src = existingVideo;
        videoElement.innerHTML = '<source src="' + existingVideo + '" type="video/' + utils.getExtension(existingVideo) + '" />';
      }
    } else if (videoElement.mozSrcObject) {
      videoElement.mozSrcObject = cameraStream;
    } else if (utils.URL) {
      videoElement.src = utils.URL.createObjectURL(cameraStream);
    }
    videoElement.play();
    utils.requestTimeout(function checkLoadedData() {
      checkLoadedData.count = checkLoadedData.count || 0;
      if (self.loadedData === true) {
        self.findVideoSize({
          'videoElement': videoElement,
          'cameraStream': cameraStream,
          'completedCallback': completedCallback
        });
        self.loadedData = false;
      } else {
        checkLoadedData.count += 1;
        if (checkLoadedData.count > 10) {
          self.findVideoSize({
            'videoElement': videoElement,
            'cameraStream': cameraStream,
            'completedCallback': completedCallback
          });
        } else {
          checkLoadedData();
        }
      }
    }, 100);
  },
  'startStreaming': function (obj) {
    var self = this, errorCallback = utils.isFunction(obj.error) ? obj.error : utils.noop, streamedCallback = utils.isFunction(obj.streamed) ? obj.streamed : utils.noop, completedCallback = utils.isFunction(obj.completed) ? obj.completed : utils.noop, existingVideo = obj.existingVideo, webcamVideoElement = obj.webcamVideoElement, videoElement = utils.isElement(existingVideo) ? existingVideo : webcamVideoElement ? webcamVideoElement : document.createElement('video'), lastCameraStream = obj.lastCameraStream, crossOrigin = obj.crossOrigin, options = obj.options, cameraStream;
    if (crossOrigin) {
      videoElement.crossOrigin = options.crossOrigin;
    }
    videoElement.autoplay = true;
    videoElement.loop = true;
    videoElement.muted = true;
    videoElement.addEventListener('loadeddata', function (event) {
      self.loadedData = true;
    });
    if (existingVideo) {
      self.stream({
        'videoElement': videoElement,
        'existingVideo': existingVideo,
        'completedCallback': completedCallback
      });
    } else if (lastCameraStream) {
      self.stream({
        'videoElement': videoElement,
        'cameraStream': lastCameraStream,
        'streamedCallback': streamedCallback,
        'completedCallback': completedCallback
      });
    } else {
      utils.getUserMedia({ 'video': true }, function (stream) {
        self.stream({
          'videoElement': videoElement,
          'cameraStream': stream,
          'streamedCallback': streamedCallback,
          'completedCallback': completedCallback
        });
      }, errorCallback);
    }
  },
  startVideoStreaming: function (callback, options) {
    options = options || {};
    var self = this, noGetUserMediaSupportTimeout, timeoutLength = options.timeout !== undefined ? options.timeout : 0, originalCallback = options.callback, webcamVideoElement = options.webcamVideoElement;
    if (timeoutLength > 0) {
      noGetUserMediaSupportTimeout = utils.requestTimeout(function () {
        self.onStreamingTimeout(originalCallback);
      }, 10000);
    }
    this.startStreaming({
      'error': function () {
        originalCallback({
          'error': true,
          'errorCode': 'getUserMedia',
          'errorMsg': 'There was an issue with the getUserMedia API - the user probably denied permission',
          'image': null,
          'cameraStream': {}
        });
      },
      'streamed': function () {
        clearTimeout(noGetUserMediaSupportTimeout);
      },
      'completed': function (obj) {
        var cameraStream = obj.cameraStream, videoElement = obj.videoElement, videoWidth = obj.videoWidth, videoHeight = obj.videoHeight;
        callback({
          'cameraStream': cameraStream,
          'videoElement': videoElement,
          'videoWidth': videoWidth,
          'videoHeight': videoHeight
        });
      },
      'lastCameraStream': options.lastCameraStream,
      'webcamVideoElement': webcamVideoElement,
      'crossOrigin': options.crossOrigin,
      'options': options
    });
  },
  'stopVideoStreaming': function (obj) {
    obj = utils.isObject(obj) ? obj : {};
    var cameraStream = obj.cameraStream, videoElement = obj.videoElement, keepCameraOn = obj.keepCameraOn, webcamVideoElement = obj.webcamVideoElement;
    if (!keepCameraOn && cameraStream && utils.isFunction(cameraStream.stop)) {
      cameraStream.stop();
    }
    if (utils.isElement(videoElement) && !webcamVideoElement) {
      videoElement.pause();
      if (utils.isFunction(utils.URL.revokeObjectURL) && !utils.webWorkerError) {
        if (videoElement.src) {
          utils.URL.revokeObjectURL(videoElement.src);
        }
      }
      utils.removeElement(videoElement);
    }
  }
};
stopVideoStreaming = function (obj) {
  obj = utils.isObject(obj) ? obj : {};
  var options = utils.isObject(obj.options) ? obj.options : {}, cameraStream = obj.cameraStream, videoElement = obj.videoElement, webcamVideoElement = obj.webcamVideoElement, keepCameraOn = obj.keepCameraOn;
  videoStream.stopVideoStreaming({
    'cameraStream': cameraStream,
    'videoElement': videoElement,
    'keepCameraOn': keepCameraOn,
    'webcamVideoElement': webcamVideoElement
  });
};
createAndGetGIF = function (obj, callback) {
  var options = obj.options || {}, images = options.images, video = options.video, numFrames = +options.numFrames, cameraStream = obj.cameraStream, videoElement = obj.videoElement, videoWidth = obj.videoWidth, videoHeight = obj.videoHeight, gifWidth = +options.gifWidth, gifHeight = +options.gifHeight, cropDimensions = screenShot.getCropDimensions({
      'videoWidth': videoWidth,
      'videoHeight': videoHeight,
      'gifHeight': gifHeight,
      'gifWidth': gifWidth
    }), completeCallback = callback;
  options.crop = cropDimensions;
  options.videoElement = videoElement;
  options.videoWidth = videoWidth;
  options.videoHeight = videoHeight;
  options.cameraStream = cameraStream;
  if (!utils.isElement(videoElement)) {
    return;
  }
  videoElement.width = gifWidth + cropDimensions.width;
  videoElement.height = gifHeight + cropDimensions.height;
  if (!options.webcamVideoElement) {
    utils.setCSSAttr(videoElement, {
      'position': 'fixed',
      'opacity': '0'
    });
    document.body.appendChild(videoElement);
  }
  videoElement.play();
  screenShot.getGIF(options, function (obj) {
    if ((!images || !images.length) && (!video || !video.length)) {
      stopVideoStreaming(obj);
    }
    completeCallback(obj);
  });
};
existingVideo = function (obj) {
  var existingVideo = obj.existingVideo, callback = obj.callback, options = obj.options, skipObj = {
      'getUserMedia': true,
      'window.URL': true
    }, errorObj = error.validate(skipObj), loadedImages = 0, videoType, videoSrc, tempImage, ag;
  if (errorObj.error) {
    return callback(errorObj);
  }
  if (utils.isElement(existingVideo) && existingVideo.src) {
    videoSrc = existingVideo.src;
    videoType = utils.getExtension(videoSrc);
    if (!utils.isSupported.videoCodecs[videoType]) {
      return callback(error.messages.videoCodecs);
    }
  } else if (utils.isArray(existingVideo)) {
    utils.each(existingVideo, function (iterator, videoSrc) {
      videoType = videoSrc.substr(videoSrc.lastIndexOf('.') + 1, videoSrc.length);
      if (utils.isSupported.videoCodecs[videoType]) {
        existingVideo = videoSrc;
        return false;
      }
    });
  }
  videoStream.startStreaming({
    'completed': function (obj) {
      obj.options = options || {};
      createAndGetGIF(obj, callback);
    },
    'existingVideo': existingVideo,
    'crossOrigin': options.crossOrigin,
    'options': options
  });
};
existingWebcam = function (obj) {
  var lastCameraStream = obj.lastCameraStream, callback = obj.callback, webcamVideoElement = obj.webcamVideoElement, options = obj.options;
  if (!isWebCamGIFSupported()) {
    return callback(error.validate());
  }
  if (options.savedRenderingContexts.length) {
    screenShot.getWebcamGIF(options, function (obj) {
      callback(obj);
    });
    return;
  }
  videoStream.startVideoStreaming(function (obj) {
    obj.options = options || {};
    createAndGetGIF(obj, callback);
  }, {
    'lastCameraStream': lastCameraStream,
    'callback': callback,
    'webcamVideoElement': webcamVideoElement,
    'crossOrigin': options.crossOrigin
  });
};
createGIF = function (userOptions, callback) {
  callback = utils.isFunction(userOptions) ? userOptions : callback;
  userOptions = utils.isObject(userOptions) ? userOptions : {};
  if (!utils.isFunction(callback)) {
    return;
  }
  var options = utils.mergeOptions(defaultOptions, userOptions) || {}, lastCameraStream = userOptions.cameraStream, images = options.images, imagesLength = images ? images.length : 0, video = options.video, webcamVideoElement = options.webcamVideoElement;
  options = utils.mergeOptions(options, {
    'gifWidth': Math.floor(options.gifWidth),
    'gifHeight': Math.floor(options.gifHeight)
  });
  if (imagesLength) {
    existingImages({
      'images': images,
      'imagesLength': imagesLength,
      'callback': callback,
      'options': options
    });
  } else if (video) {
    existingVideo({
      'existingVideo': video,
      'callback': callback,
      'options': options
    });
  } else {
    existingWebcam({
      'lastCameraStream': lastCameraStream,
      'callback': callback,
      'webcamVideoElement': webcamVideoElement,
      'options': options
    });
  }
};
takeSnapShot = function (userOptions, callback) {
  callback = utils.isFunction(userOptions) ? userOptions : callback;
  userOptions = utils.isObject(userOptions) ? userOptions : {};
  if (!utils.isFunction(callback)) {
    return;
  }
  var mergedOptions = utils.mergeOptions(defaultOptions, userOptions), options = utils.mergeOptions(mergedOptions, {
      'interval': 0.1,
      'numFrames': 1,
      'gifWidth': Math.floor(mergedOptions.gifWidth),
      'gifHeight': Math.floor(mergedOptions.gifHeight)
    });
  createGIF(options, callback);
};
API = function (utils, error, defaultOptions, isSupported, isWebCamGIFSupported, isExistingImagesGIFSupported, isExistingVideoGIFSupported, createGIF, takeSnapShot, stopVideoStreaming) {
  var gifshot = {
    'utils': utils,
    'error': error,
    'defaultOptions': defaultOptions,
    'createGIF': createGIF,
    'takeSnapShot': takeSnapShot,
    'stopVideoStreaming': stopVideoStreaming,
    'isSupported': isSupported,
    'isWebCamGIFSupported': isWebCamGIFSupported,
    'isExistingVideoGIFSupported': isExistingVideoGIFSupported,
    'isExistingImagesGIFSupported': isExistingImagesGIFSupported,
    'VERSION': '0.3.2'
  };
  return gifshot;
}(utils, error, defaultOptions, isSupported, isWebCamGIFSupported, isExistingImagesGIFSupported, isExistingVideoGIFSupported, createGIF, takeSnapShot, stopVideoStreaming);
(function (API) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return API;
    });
  } else if (typeof exports !== 'undefined') {
    module.exports = API;
  } else {
    window.gifshot = API;
  }
}(API));
}(typeof window !== "undefined" ? window : {}, typeof document !== "undefined" ? document : { createElement: function() {} }, typeof window !== "undefined" ? window.navigator : {}));