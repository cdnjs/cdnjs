/*
Copyright 2014, modulex-swf@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 06:39:42 GMT
*/
modulex.add("swf", ["dom"], function(require, exports, module) {
var dom = require("dom");
/*
combined modules:
swf
swf/ua
*/
var swfUa, _swf_;
swfUa = function (exports) {
  /**
   * @ignore
   * Flash UA 探测
   * @author oicuicu@gmail.com
   */
  var fpvCached, firstRun = true, win = window;
  function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  }
  /*
   获取 Flash 版本号
   返回数据 [M, S, R] 若未安装，则返回 undefined
   */
  function getFlashVersion() {
    var ver, SF = 'ShockwaveFlash';
    // for NPAPI see: http://en.wikipedia.org/wiki/NPAPI
    if (navigator.plugins && navigator.mimeTypes.length) {
      ver = (navigator.plugins['Shockwave Flash'] || 0).description;
    } else {
      // for ActiveX see:	http://en.wikipedia.org/wiki/ActiveX
      // https://github.com/kissyteam/kissy/issues/586
      try {
        ver = new win.ActiveXObject(SF + '.' + SF).GetVariable('$version');
      } catch (ex) {
      }
    }
    // 插件没安装或有问题时，ver 为 undefined
    if (!ver) {
      return undefined;
    }
    // 插件安装正常时，ver 为 "Shockwave Flash 10.1 r53" or "WIN 10,1,53,64"
    return getArrayVersion(ver);
  }
  /*
   getArrayVersion("10.1.r53") => ["10", "1", "53"]
   */
  function getArrayVersion(ver) {
    return ver.match(/\d+/g).splice(0, 3);
  }
  /*
   格式：主版本号Major.次版本号Minor(小数点后3位，占3位)修正版本号Revision(小数点后第4至第8位，占5位)
   ver 参数不符合预期时，返回 0
   getNumberVersion("10.1 r53") => 10.00100053
   getNumberVersion(["10", "1", "53"]) => 10.00100053
   getNumberVersion(12.2) => 12.2
   */
  function getNumberVersion(ver) {
    var arr = typeof ver === 'string' ? getArrayVersion(ver) : ver, ret = ver;
    if (isArray(arr)) {
      ret = parseFloat(arr[0] + '.' + pad(arr[1], 3) + pad(arr[2], 5));
    }
    return ret || 0;
  }
  /*
   pad(12, 5) => "00012"
   */
  function pad(num, n) {
    num = num || 0;
    num += '';
    var padding = n + 1 - num.length;
    return new Array(padding > 0 ? padding : 0).join('0') + num;
  }
  /**
   * Get flash version
   * @param {Boolean} [force] whether to avoid getting from cache
   * @returns {String[]} eg: ["11","0","53"]
   * @member SWF
   * @static
   */
  function fpv(force) {
    // 考虑 new ActiveX 和 try catch 的 性能损耗，延迟初始化到第一次调用时
    if (force || firstRun) {
      firstRun = false;
      fpvCached = getFlashVersion();
    }
    return fpvCached;
  }
  /**
   * Checks whether current version is greater than or equal the specific version.
   * @param {String} ver eg. "10.1.53"
   * @param {Boolean} force whether to avoid get current version from cache
   * @returns {Boolean}
   * @member SWF
   * @static
   */
  function fpvGTE(ver, force) {
    return getNumberVersion(fpv(force)) >= getNumberVersion(ver);
  }
  exports = {
    fpv: fpv,
    fpvGTE: fpvGTE
  };
  return exports;
}();
_swf_ = function (exports) {
  var Dom = dom;
  var FlashUA = swfUa;
  var swfUrl = './swf/expressInstall.swf';
  var OLD_IE = !!window.ActiveXObject, TYPE = 'application/x-shockwave-flash', CID = 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000', FLASHVARS = 'flashvars', EMPTY = '', LT = '<', GT = '>', doc = document, fpv = FlashUA.fpv, fpvGEQ = FlashUA.fpvGEQ, fpvGTE = FlashUA.fpvGTE, OBJECT_TAG = 'object', encode = encodeURIComponent, PARAMS = {
      wmode: EMPTY,
      allowscriptaccess: EMPTY,
      allownetworking: EMPTY,
      allowfullscreen: EMPTY,
      play: 'false',
      loop: EMPTY,
      menu: EMPTY,
      quality: EMPTY,
      scale: EMPTY,
      salign: EMPTY,
      bgcolor: EMPTY,
      devicefont: EMPTY,
      hasPriority: EMPTY,
      base: EMPTY,
      swliveconnect: EMPTY,
      seamlesstabbing: EMPTY
    };
  var defaultConfig = {
    expressInstall: require.toUrl(swfUrl),
    version: '9',
    params: {},
    attrs: {},
    render: document.body,
    document: doc,
    htmlMode: 'default'
  };
  var guid = 1;
  function SWF(config) {
    var self = this;
    var key;
    config = config || {};
    for (key in defaultConfig) {
      if (!(key in config)) {
        config[key] = defaultConfig[key];
      }
    }
    for (key in config) {
      self[key] = config[key];
    }
    var expressInstall = self.expressInstall, swf, html, id, htmlMode = self.htmlMode, flashVars, params = self.params, attrs = self.attrs, doc = self.document, placeHolder = Dom.create('<span>', undefined, doc), elBefore = self.elBefore, installedSrc = self.src, version = self.version;
    id = attrs.id = attrs.id || 'ks-swf-' + +new Date() + '-' + guid++;
    if (!fpv()) {
      self.status = SWF.Status.NOT_INSTALLED;
      return;
    }
    if (version && !fpvGTE(version)) {
      self.status = SWF.Status.TOO_LOW;
      if (expressInstall) {
        installedSrc = expressInstall;
        if (!('width' in attrs) || !/%$/.test(attrs.width) && parseInt(attrs.width, 10) < 310) {
          attrs.width = '310';
        }
        if (!('height' in attrs) || !/%$/.test(attrs.height) && parseInt(attrs.height, 10) < 137) {
          attrs.height = '137';
        }
        flashVars = params.flashVars = params.flashVars || {};
        flashVars.MMredirectURL = location.href;
        flashVars.MMplayerType = OLD_IE ? 'ActiveX' : 'PlugIn';
        flashVars.MMdoctitle = doc.title.slice(0, 47) + ' - Flash Player Installation';
      }
    }
    if (htmlMode === 'full') {
      html = _stringSWFFull(installedSrc, attrs, params);
    } else {
      html = _stringSWFDefault(installedSrc, attrs, params);
    }
    self.html = html;
    if (elBefore) {
      Dom.insertBefore(placeHolder, elBefore);
    } else {
      Dom.append(placeHolder, self.render);
    }
    if ('outerHTML' in placeHolder) {
      placeHolder.outerHTML = html;
    } else {
      placeHolder.parentNode.replaceChild(Dom.create(html), placeHolder);
    }
    swf = Dom.get('#' + id, doc);
    if (htmlMode === 'full') {
      if (OLD_IE) {
        self.swfObject = swf;
      } else {
        self.swfObject = swf.parentNode;
      }
    } else {
      self.swfObject = swf;
    }
    self.el = swf;
    if (!self.status) {
      self.status = SWF.Status.SUCCESS;
    }
  }
  SWF.prototype = {
    constructor: SWF,
    get: function (name) {
      return this[name];
    },
    set: function (name, v) {
      this[name] = v;
    },
    callSWF: function (func, args) {
      var swf = this.el, ret, params;
      args = args || [];
      try {
        if (swf[func]) {
          ret = swf[func].apply(swf, args);
        }
      } catch (e) {
        params = '';
        if (args.length !== 0) {
          params = '"' + args.join('", "') + '"';
        }
        ret = new Function('swf', 'return swf.' + func + '(' + params + ');')(swf);
      }
      return ret;
    },
    destroy: function () {
      var self = this;
      var swfObject = self.swfObject;
      if (OLD_IE) {
        swfObject.style.display = 'none';
        (function remove() {
          if (swfObject.readyState === 4) {
            removeObjectInIE(swfObject);
          } else {
            setTimeout(remove, 10);
          }
        }());
      } else {
        swfObject.parentNode.removeChild(swfObject);
      }
    }
  };
  SWF.getSrc = function (swf) {
    swf = Dom.get(swf);
    var srcElement = getSrcElements(swf)[0], nodeName = srcElement && Dom.nodeName(srcElement);
    if (nodeName === 'embed') {
      return Dom.attr(srcElement, 'src');
    } else if (nodeName === 'object') {
      return Dom.attr(srcElement, 'data');
    } else if (nodeName === 'param') {
      return Dom.attr(srcElement, 'value');
    }
    return null;
  };
  SWF.Status = {
    TOO_LOW: 'flash version is too low',
    NOT_INSTALLED: 'flash is not installed',
    SUCCESS: 'success'
  };
  SWF.HtmlMode = {
    DEFAULT: 'default',
    FULL: 'full'
  };
  SWF.fpv = fpv;
  SWF.fpvGEQ = fpvGEQ;
  SWF.fpvGTE = fpvGTE;
  function removeObjectInIE(obj) {
    for (var i in obj) {
      if (typeof obj[i] === 'function') {
        obj[i] = null;
      }
    }
    obj.parentNode.removeChild(obj);
  }
  function getSrcElements(swf) {
    var url = '', params, i, param, elements = [], nodeName = Dom.nodeName(swf);
    if (nodeName === 'object') {
      url = Dom.attr(swf, 'data');
      if (url) {
        elements.push(swf);
      }
      params = swf.childNodes;
      for (i = 0; i < params.length; i++) {
        param = params[i];
        if (param.nodeType === 1) {
          if ((Dom.attr(param, 'name') || '').toLowerCase() === 'movie') {
            elements.push(param);
          } else if (Dom.nodeName(param) === 'embed') {
            elements.push(param);
          } else if (Dom.nodeName(params[i]) === 'object') {
            elements.push(param);
          }
        }
      }
    } else if (nodeName === 'embed') {
      elements.push(swf);
    }
    return elements;
  }
  function collectionParams(params) {
    var par = EMPTY;
    for (var k in params) {
      var v = params[k];
      k = k.toLowerCase();
      if (k in PARAMS) {
        par += stringParam(k, v);
      } else if (k === FLASHVARS) {
        par += stringParam(k, toFlashVars(v));
      }
    }
    return par;
  }
  function _stringSWFDefault(src, attrs, params) {
    return _stringSWF(src, attrs, params, OLD_IE) + LT + '/' + OBJECT_TAG + GT;
  }
  function _stringSWF(src, attrs, params, ie) {
    var res, attr = EMPTY, par = EMPTY;
    for (var k in attrs) {
      var v = attrs[k];
      attr += stringAttr(k, v);
    }
    if (ie) {
      attr += stringAttr('classid', CID);
      par += stringParam('movie', src);
    } else {
      attr += stringAttr('data', src);
      attr += stringAttr('type', TYPE);
    }
    par += collectionParams(params);
    res = LT + OBJECT_TAG + attr + GT + par;
    return res;
  }
  function _stringSWFFull(src, attrs, params) {
    var outside, inside;
    if (OLD_IE) {
      outside = _stringSWF(src, attrs, params, 1);
      delete attrs.id;
      delete attrs.style;
      inside = _stringSWF(src, attrs, params, 0);
    } else {
      inside = _stringSWF(src, attrs, params, 0);
      delete attrs.id;
      delete attrs.style;
      outside = _stringSWF(src, attrs, params, 1);
    }
    return outside + inside + LT + '/' + OBJECT_TAG + GT + LT + '/' + OBJECT_TAG + GT;
  }
  function toFlashVars(obj) {
    var arr = [];
    var ret;
    for (var prop in obj) {
      var data = obj[prop];
      if (data) {
        arr.push(prop + '=' + encode(data));
      }
    }
    ret = arr.join('&');
    return ret;
  }
  function stringParam(key, value) {
    return '<param name="' + key + '" value="' + value + '"></param>';
  }
  function stringAttr(key, value) {
    return ' ' + key + '=' + '"' + value + '"';
  }
  exports = SWF;
  SWF.version = '1.0.1';
  return exports;
}();
module.exports = _swf_;
});