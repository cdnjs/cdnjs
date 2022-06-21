/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 751:
/***/ ((module) => {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),

/***/ 41:
/***/ ((module) => {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),

/***/ 34:
/***/ ((module) => {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ 735:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

(function(){
  var crypt = __webpack_require__(41),
      utf8 = __webpack_require__(751).utf8,
      isBuffer = __webpack_require__(34),
      bin = __webpack_require__(751).bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message) && message.constructor !== Uint8Array)
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();


/***/ }),

/***/ 475:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

;// CONCATENATED MODULE: ./worker/src/i18n/zh_CN.json
const zh_CN_namespaceObject = JSON.parse('{"LANG":"中文 - 简体","EMPTY_HCONFIG":"配置文件是空的，请安装","START_INSTALL":"开始安装","CHECK_LOGIN_SUCCESS":"已登录！","CHECK_LOGIN_ERROR":"Ooops！尚未登陆！","ATTENDANCE_SUCCESS":"签到成功！","COMING_SOON":"即将到来！","UNKNOW_ACTION":"未知的操作","UNKNOW_ERROR":"未知的错误","DASHBOARD":"仪表盘","GH_UPLOAD_SUCCESS":"上传文件到Github成功！","GH_UPLOAD_ERROR":"上传文件到Github失败！","GH_DELETE_SUCCESS":"从Github删除文件成功！","GH_DELETE_ERROR":"从Github删除文件失败！","GH_GET_SUCCESS":"获取文件成功！","GH_LIST_SUCCESS":"列表成功！","GH_TREELIST_SUCCESS":"树状列表成功！","NEED_UPDATE":"需要更新！","NEED_NOT_UPDATE":"不需要更新！","HTALK":"HTALK组件信息","HTALK_INIT_SUCCESS":"初始化成功！","HTALK_GET_SUCCESS":"在${1}的状态下,已成功获得说说数据"}');
;// CONCATENATED MODULE: ./worker/src/i18n/en_US.json
const en_US_namespaceObject = JSON.parse('{"LANG":"English - United States of America","EMPTY_HCONFIG":"The configuration file is empty, please install!","START_INSTALL":"Installation has started","CHECK_LOGIN_SUCCESS":"Already logged in!","CHECK_LOGIN_ERROR":"Ooops! You are not logged in yet!","ATTENDANCE_SUCCESS":"check-in successfully!","COMING_SOON":"Coming soon!","UNKNOW_ACTION":"Unknown action","UNKNOW_ERROR":"Unknown error","DASHBOARD":"Dashboard","GH_UPLOAD_SUCCESS":"Upload file to GitHub successfully!","GH_UPLOAD_ERROR":"Error to upload file to GitHub!","GH_DELETE_SUCCESS":"File deleted from GitHub successfully!","GH_DELETE_ERROR":"Error to delete file from GitHub!","GH_GET_SUCCESS":"The file was successfully obtained!","GH_LIST_SUCCESS":"List successfully!","GH_TREELIST_SUCCESS":"Trees list successfully!","NEED_UPDATE":"Need to be updated!!!","NEED_NOT_UPDATE":"No need to be updated"}');
;// CONCATENATED MODULE: ./worker/src/i18n/language.js


const all_lan = {
    zh_CN: zh_CN_namespaceObject,
    en_US: en_US_namespaceObject
}
const langtype = (() => {
    try {
        let lan = hpp_language
        if (!all_lan[lan]) {
            return 'zh_CN'
        }
        return lan
    } catch (n) {
        return 'zh_CN'
    }
})()

const language_lang = all_lan[langtype]
;// CONCATENATED MODULE: ./worker/src/scaffold.js
const getCookie = (request, name) => {
    let result = ""
    const cookieString = request.headers.get("Cookie")
    if (cookieString) {
        const cookies = cookieString.split(";")
        cookies.forEach(cookie => {
            const cookiePair = cookie.split("=", 2)
            const cookieName = cookiePair[0].trim()
            if (cookieName === name) {
                const cookieVal = cookiePair[1]
                result = cookieVal
            }
        })
    }
    return result
}

const getJsonLength = (jsonData) => {

    var jsonLength = 0;

    for (var item in jsonData) {

        jsonLength++;

    }

    return jsonLength;
}

const rp = (path) => {
    return path.split('?')[0]
}
const getname = (path) => {
    const urllist = path.split('/')
    return urllist[getJsonLength(urllist) - 1]
}
const getsuffix = (path) => {
    const suffixlist = getname(path).split('.')
    return suffixlist[getJsonLength(suffixlist) - 1]
}

const genjsonres = (msg, code, status, content) => {
    let m = msg ? msg : "未知的错误"
    let c = (code || code == 0) ? code : "-1"
    let s = status ? status : 500
    let co = content ? content : ''
    let r = {
        msg: String(m),
        code: c,
        content: String(co)
    }
    return new Response(JSON.stringify(r), {
        status: s, headers: {
            "content-type": "application/javascript; charset=utf-8",
            "Access-Control-Allow-Origin": '*'
        }
    })
}

;// CONCATENATED MODULE: ./worker/src/gethtml.js

const gethtml = {

  loginhtml: (config, hinfo) => {
    const gc = { "#58C9B9": "#9DC8C8", "#77AF9C": "#D7FFF1", "#0396FF": "#ABDCFF" }
    const hc = (() => {
      let y = []
      for (var i in gc) {
        y.push(i)
      }
      return y
    })()
    const c = hc[Math.floor(Math.random() * hc.length)];
    return `
    <!DOCTYPE html>
    <html lang="zh-cmn-Hans">
     <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
      <title>后台</title>
      <style>
      
.wrapper{
      background: linear-gradient(to bottom right,${c} 0,${gc[c]} 100%)!important;
}
button{
  color:${c}!important
}
      </style>
      <link rel="stylesheet" href="${hinfo.CDN}login/login.css" /> 
     </head>
     <body>
      <div id="all">
       <div class="wrapper">
        <div class="bg-container">
         <div class="container">
          <h1 style="margin: 0;" id="bar">Welcome</h1>
          <form class="form" id="fm">
           <input id="username" type="text" placeholder="用户名" value="" name="username" />
           <input id="password" type="password" placeholder="密码" value="" name="password" />
           <button type="button" id="login-button">登录</button>
           <br />
           <br />
           <a href="https://github.com/HexoPlusPlus/HexoPlusPlus" id="tips" style="color: #fff;">💗${hinfo.ver}</a>
          </form>
         </div>
        </div>
        <ul class="bg-bubbles">
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
        </ul>
       </div>
      </div>
      <script src="${hinfo.CDN}login/login.js"></script>
      </body>
    </html>
    `},
  dash404: `<div class="content"><div class="container-fluid"><div class="row"><div class="col-md-12"><div class="card"><div class="card-header card-header-primary"><h4 class="card-title">404</h4><p class="card-category">我们不知道您的需求</p></div></br><div class="card-body"><a href="/hpp/admin/dash/home">回到主页</a></div></div></div></div></div></div>`,
  dashhome: (config, hinfo) => {
    return `<div class="content">
<div class="container-fluid">
  <div class="row">
  ${(() => {
        if (config.hexo.switch) {
          return `<div class="col-lg-6 col-md-6 col-sm-6">
  <div class="card card-stats">
    <div class="card-header card-header-warning card-header-icon">
      <div class="card-icon">
        <i class="fa fa-file"></i>
      </div>
      <p class="card-category">总文档数</p>
      <h3 class="card-title" id="document_all">NaN
        <small>个</small>
      </h3>
    </div>
    <div class="card-footer">
    <div class="stats">
        <a href="/hpp/admin/dash/edit" style="color: #cf6ae0 !important"><i class="fa fa-pencil"></i>前往管理</a>
      </div>
    </div>
  </div>
</div>`} else { return '' }
      })()}
    


${(() => {
        if (config.img.switch) {
          return `<div class="col-lg-6 col-md-6 col-sm-6">
<div class="card card-stats">
  <div class="card-header card-header-success card-header-icon">
    <div class="card-icon">
      <i class="fa fa-image"></i>
    </div>
    <p class="card-category">总图片数</p>
    <h3 class="card-title" id="img_all">NaN
      <small>张</small>
    </h3>
  </div>
  <div class="card-footer">
  <div class="stats">
      <a href="/hpp/admin/dash/img_man" style="color: #cf6ae0 !important"><i class="fa fa-upload"></i>前往管理</a>
    </div>
  </div>
</div>
</div>`
        } else { return '' }
      })()}
    
    <div class="col-lg-6 col-md- col-sm-6">
      <a href="javascript:checkUpdate()">
      <div class="card card-stats">
        <div class="card-header card-header-info card-header-icon">
          <div class="card-icon">
            <i class="fa fa-upload"></i>
          </div>
          <p class="card-category">当前版本</p>
          <h3 class="card-title">${hinfo.ver}</h3>
        </div>
        <div class="card-footer">
          <div class="stats">
            <i class="material-icons">update</i>点击更新
          </div>
        </div>
      </div>
    </a>
    </div>
    
    
    
    <div class="col-lg-6 col-md-6 col-sm-6">
      <a href="https://jq.qq.com/?_wv=1027&k=rAcnhzqK" target="_blank">
      <div class="card card-stats">
        <div class="card-header card-header-success card-header-icon">
          <div class="card-icon">
            <i class="fa fa-qq"></i>
          </div>
          <h3 class="card-title">QQ群聊天去？</h3>
        </div>
        <div class="card-footer">
        诚聘小白鼠(bushi
        </div>
      </div>
    </a>
    </div>
    
    <div class="col-lg-6 col-md-6 col-sm-6">
      <a href="https://hexoplusplus.js.org" target="_blank">
      <div class="card card-stats">
        <div class="card-header card-header-normal card-header-icon">
          <div class="card-icon">
            <i class="fa fa-book"></i>
          </div>
          <h3 class="card-title">文档地址</h3>
        </div>
        <div class="card-footer">有多少人没看文档来提issues？
        </div>
      </div>
    </a>
    </div>
    
    <div class="col-lg-6 col-md-6 col-sm-6">
      <a href="https://github.com/HexoPlusPlus/HexoPlusPlus" target="_blank">
      <div class="card card-stats">
        <div class="card-header card-header-primary card-header-icon">
          <div class="card-icon">
            <i class="fa fa-github"></i>
          </div>
          <h3 class="card-title">Github</h3>
        </div>
        <div class="card-footer">
        欢迎PR
        </div>
      </div>
    </a>
    </div>
    
  </div>
</div>
</div>`},
  dashedit: `<div class="content">
<div class="container-fluid">
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header card-header-primary">
          <h4 class="card-title">书写</h4>
          <p class="card-category">Wrtie</p>
        </div>
      </br>
        <div class="card-body">
                  <div class="col-md-8">
                      <label class="bmd-label-floating">文件选择</label>
                      <select id="choo" class="form-control form-control-chosen" style="display: inline;"></select>
                      <button type="submit" class="btn btn-success" onclick="javascript:hpp_get_md()">获取文章</button>
                      <button type="submit" class="btn btn-normal" onclick="javascript:hpp_get_draft()">获取艹稿</button>
                      <button type="submit" class="btn btn-danger" onclick="javascript:hpp_del_index()">徒手清索引</button>
                  </div>
                
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>内容</label>
                      <div class="form-group" id="hpp_doc_editor">
                        
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" class="btn btn-normal pull-right" onclick="javascript:hpp_upload_draft()">发布艹稿</button>
                <button type="submit" class="btn btn-primary pull-right" onclick="javascript:hpp_upload_md()">发布文件</button>
                <div class="clearfix"></div>
                <input type="file" name="upload" id="upload_md" style="display:none"/>
                <form id="upform" enctype='multipart/form-data' style="display:none;">
<div class="form-group">
<label for="upteainput">上传文件</label>
<input type="file" id="input">
</div>
</form>
        </div>
      </div>
    </div>
  </div>
</div>
</div>`,
  dasheditjs: (config, hinfo) => {
    return `<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/npm/notyf/notyf.min.css' /> 
<script src="https://cdn.jsdelivr.net/npm/notyf/notyf.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/indrimuska/jquery-editable-select/dist/jquery-editable-select.min.js"></script>
<script src='${hinfo.CDN}edit.js'></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.plugins.min.js"></script>
<link rel="stylesheet" href="${hinfo.CDN}OwO.min.css">
<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.5.0/build/highlight.min.js"></script>
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.5.0/build/styles/${config.dash.hljsstyle}.min.css' />`
  },
  dashtalk: `<div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header card-header-primary">
              <h4 class="card-title">说说</h4>
              <p class="card-category">Talk</p>
            </div>
          </br>
            <div class="card-body">
                      
                    
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>书写</label>
                          <div class="form-group" id="hpp_talk_editor"></div>
                        </div>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary pull-right" onclick="javascript:hpp_upload_md()">Upload</button>
                    <div class="clearfix"></div>
                    <input type="file" name="upload" id="upload_md" style="display:none"/>
                    <form id="upform" enctype='multipart/form-data' style="display:none;">
<div class="form-group">
    <label for="upteainput">上传文件</label>
    <input type="file" id="input">
</div>
</form><div id="hpp_talk"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`,
  dashtalkjs: (config, hinfo) => {
    return `<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/npm/notyf/notyf.min.css' /> 
    <script src="https://cdn.jsdelivr.net/npm/notyf/notyf.min.js"></script>
    <link rel="stylesheet" href="${hinfo.CDN}talk.css" />
    <script src='${hinfo.CDN}talk.js'></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.plugins.min.js"></script>
    <link rel="stylesheet" href="${hinfo.CDN}OwO.min.css">
<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.5.0/build/highlight.min.js"></script>
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.5.0/build/styles/${config.dash.hljsstyle}.min.css' />`
  },
  dashdocs: `
<div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">文章列表</h4>
                  <p class="card-category">这里列出了你所有文章</p>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
				  <input type="text" id="search_Input" onkeyup="hpp_search()" placeholder="搜索文章...">
                    <table class="table" id="hpp_table">
                      <thead class="text-primary">
                        <th>
                          名称
                        </th>
                        <th>
                          大小
                        </th>
                        <th>发布状态</th><th></th>
                        <th></th><th></th><th></th>
                      </thead>
                      <tbody id="tbody_doc">
						
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`,
  dashimg: `<div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header card-header-primary">
                <h4 class="card-title ">图片列表</h4>
                <p class="card-category">这里列出了你所有图片</p>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                <input type="text" id="search_Input" onkeyup="hpp_search()" placeholder="搜索图片...">
                  <table class="table" id="hpp_table">
                    <thead class=" text-primary">
                      <th>
                        名称
                      </th>
                      <th>
                        大小
                      </th><th>预览</th>
                      <th></th>
                      <th></th><th></th><th></th><th></th>
                    </thead>
                    <tbody id="tbody_img">
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`,
  dashtool: `<div class="content">
    <div class="container-fluid">
      <div class="row">
    
        
        <div class="col-lg-6 col-md-6 col-sm-6">
          <a href="javascript:hpp_artitalk_into_hpptalk()">
          <div class="card card-stats">
            <div class="card-header card-header-primary card-header-icon">
              <div class="card-icon">
                <i class="fa fa-download"></i>
              </div>
              <h3 class="card-title">从Artitalk中导入</h3>
            </div>
            <div class="card-footer">这不是抢生意啊喂
            </div>
          </div>
        </a>
        </div>
        
        <div class="col-lg-6 col-md-6 col-sm-6">
          <a href="javascript:hpp_del_all()">
          <div class="card card-stats">
            <div class="card-header card-header-danger card-header-icon">
              <div class="card-icon">
                <i class="fa fa-close"></i>
              </div>
              <h3 class="card-title">销毁配置</h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <i class="material-icons text-danger">warning</i>高危操作，你知道会发生什么的
              </div>
            </div>
          </div>
        </a>
        </div>
        
        
      </div>
    </div>
  </div>`,
  dashimgjs: (config, hinfo) => {
    return `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/brutaldesign/swipebox/src/css/swipebox.css">
    <script src='${hinfo.CDN}img_man.js'></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.plugins.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/brutaldesign/swipebox/src/js/jquery.swipebox.min.js"></script>`

  },
  dashhomejs: (config, hinfo) => {
    return `<script src='${hinfo.CDN}home.js'></script>`
  },
  dashdocsjs: (hinfo) => {
    return `<script src='${hinfo.CDN}doc_man.js'></script>`
  },
  dashtooljs: (hinfo) => {
    return `<script src='${hinfo.CDN}tool.js'></script>`
  },
  errorpage: (errormsg, hinfo, b) => {
    b = b ? b : [
      { url: "https://hexoplusplus.js.org", des: "文档" },
      { url: "https://github.com/HexoPlusPlus/HexoPlusPlus", des: "Github" },
      { url: "https://jq.qq.com/?_wv=1027&k=rAcnhzqK", des: "QQ群寻求帮助" }
    ]
    return `
    <!DOCTYPE html>
    <html lang="en" class="no-js">
      <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
            <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" /> 
            <title>HexoPlusPlusError</title>
            <link rel="stylesheet" type="text/css" href="${hinfo.CDN}error/error.css" />
      </head>
      <body>
        <div class="container demo-2">
          <div class="content">
                    <div id="large-header" class="large-header">
                        <canvas id="demo-canvas"></canvas>
                        <h1 class="main-title"><span>Error</span></h1>
                    </div>
                    <div class="codrops-header">
                        <h1>HexoPlusPlus 异常<span>${errormsg}</span></h1>
                        <nav class="codrops-demos">
                ${(function () {
        let rpb = ""
        for (var k = 0; k < getJsonLength(b); k++) {
          if (!!(b[k])) {
            rpb += `<a class="current-demo" href="${b[k].url}">${b[k].des}</a>\n`
          }
        }
        return rpb
      })()}
                        </nav>
                    </div>
                </div>
        </div>
            <script src="${hinfo.CDN}error/error.js"></script>
      </body>
    </html>
    `
  },


  dash_head: (config, hinfo, ainfo) => {
    return `<!DOCTYPE html>            <html lang="en">
            
            <head>
              <meta charset="utf-8" />
              <link rel="apple-touch-icon" sizes="76x76" href="${config.dash.icon}">
              <link rel="icon" type="image/png" href="${config.dash.icon}">
              <title>${config.dash.title}</title>
              <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
              <link href="${hinfo.CDN}dash/theme/${(() => { if (config.dash.dark) { return 'dark' } else { return 'light' } })()}.css" rel="stylesheet" />
              
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/indrimuska/jquery-editable-select/dist/jquery-editable-select.min.css">
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css">
              <script>
              //这个脚本的用途是前端变量传递
              const config = ${JSON.stringify(config)}
              </script>
            </head>
            <body class="${(() => { if (config.dash.dark) { return 'dark-edition' } else { return '' } })()}">
              <div class="wrapper ">
                <div class="sidebar" data-color="${config.dash.color}" data-background-color="${(() => { if (config.dash.dark) { return 'default' } else { return config.dash.bgcolor } })()}" data-image="${config.dash.back}">
                  <div class="logo"><a class="simple-text logo-normal">${config.dash.title}</a></div>
                  <div class="sidebar-wrapper">
                    <ul class="nav">
                    
                  
                      <li class="nav-item${ainfo.hpp_home_act}">
                        <a class="nav-link" href="/hpp/admin/dash/home">
                          <i class="material-icons">dashboard</i>
                          <p>主页</p>
                        </a>
                      </li>

                      ${(() => {
        if (config.hexo.switch) {
          return `
                        <li class="nav-item${ainfo.hpp_edit_act}">
                          <a class="nav-link" href="/hpp/admin/dash/edit">
                            <i class="material-icons">create</i>
                            <p>书写</p>
                          </a>
                        </li>
                        
                        <li class="nav-item${ainfo.hpp_site_act}">
                          <a class="nav-link" href="/hpp/admin/dash/site">
                          <i class="mdui-icon material-icons">wifi_tethering</i>
                            <p>站点</p>
                          </a>
                        </li>

                        <li class="nav-item${ainfo.hpp_docs_man_act}">
                        <a class="nav-link" href="/hpp/admin/dash/docs_man">
                          <i class="material-icons">descriptionoutlined</i>
                          <p>文档管理</p>
                        </a>
                      </li>
                        
                        `} else { return '' }
      })()}


                      


                      ${(() => {
        if (config.talk.switch.htalk) {
          return `
                        <li class="nav-item${ainfo.hpp_talk_act}">
                          <a class="nav-link" href="/hpp/admin/dash/talk">
                            <i class="material-icons">chat</i>
                            <p>说说</p>
                          </a>
                        </li>
                        
                        `} else { return '' }
      })()}


                      


      ${(() => {
        if (config.img.switch && config.img.type == "gh") {
          return `
                        
                      <li class="nav-item${ainfo.hpp_img_man_act}">
                      <a class="nav-link" href="/hpp/admin/dash/img_man">
                        <i class="material-icons">imagerounded</i>
                        <p>图片管理</p>
                      </a>
                    </li>
                        
                        `} else { return '' }
      })()}



                      



                      <li class="nav-item${ainfo.hpp_tool_act}">
                        <a class="nav-link" href="/hpp/admin/dash/tool">
                          <i class="material-icons">widgets</i>
                          <p>工具</p>
                        </a>
                      </li>
                      <li class="nav-item${ainfo.hpp_set_act}">
                        <a class="nav-link" href="/hpp/admin/install?step=end">
                          <i class="material-icons">settings</i>
                          <p>设置</p>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="main-panel">
                  <!-- Navbar -->
                  <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                    <div class="container-fluid">
                      <div class="navbar-wrapper">
                        <a class="navbar-brand" href="javascript:;">HexoPlusPlus后台</a>
                      </div>
                      <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="navbar-toggler-icon icon-bar"></span>
                        <span class="navbar-toggler-icon icon-bar"></span>
                        <span class="navbar-toggler-icon icon-bar"></span>
                      </button>
                      <div class="collapse navbar-collapse justify-content-end">
                        <ul class="navbar-nav">
                          <li class="nav-item dropdown">
                            <a class="nav-link" href="javascript:;" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <img src="${config.hpp_userimage}" style="width: 30px;border-radius: 50%;border: 0;">
                              <p class="d-lg-none d-md-block">
                                Account
                              </p>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownProfile">
                              <a class="dropdown-item" id="kick">签到</a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item" id="logout">退出</a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </nav>
                  <!-- End Navbar --> 
            
            <!--innerHTMLSTART-->`},
  dash_foot: (hinfo, hpp_js) => {
    return `
              <!--innerHTMLEND-->
  </div>
  </div>
  <script src="${hinfo.CDN}dash/theme/dash.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert/dist/sweetalert.min.js"></script>
  ${hpp_js}
  </body>
  
  </html>`
  }
}

;// CONCATENATED MODULE: ./worker/src/config.js
const formatconfig = async () => {
    const config = await HKV.get("hconfig", { type: "json" })
    if (config === null) { return defaultconfig }
    config.hexo.docpath = config.hexo.gh_root + "source/_posts/"
    config.hexo.draftpath = config.hexo.gh_root + "source/_drafts/"
    return config
}

const defaultconfig = {
    installed: true,
    dash: {
        image: "https://cdn.jsdelivr.net/gh/ChenYFan/CDN@master/img/hpp_upload/1612610340000.jpg",
        icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@master/doc_img/icon.png",
        title: "HexoPlusPlus小飞机✈",
        dark: true,
        bgcolor: "default",//black | white | default
        color: "danger",//purple | azure | green | orange | danger | rose
        usericon: "",
        cors: "*",
        OwO: "https://cdn.jsdelivr.net/gh/2X-ercha/Twikoo-Magic@master/hppowo.json",
        back: "https://cdn.jsdelivr.net/gh/ChenYFan-Tester/DailyGet@gh-pages/bingpic/bing.jpg",
        lazyimg: "https://cdn.jsdelivr.net/gh/ChenYFan/blog@master/themes/fluid/source/img/loading.gif",
        hljsstyle: "github"
    },
    hexo: {
        switch: true,
        type: "gh",
        gh_username: "",
        gh_reponame: "",
        gh_branch: "",
        gh_token: "",
        gh_root: "/",
        gh_dispatch_token: ""
    },

    img: {
        switch: true,
        type: "gh", //custom
        gh_username: "",
        gh_reponame: "",
        gh_branch: "",
        gh_token: "",
        gh_root: "/",


        c_url: "",
        c_post_name: "file",
        c_headers: {

        },
        c_body: {

        }

    },
    cloudflare: {
        account_identifier: "",
        Auth_Key: "",
        Auth_Email: "",
        script_name: ""
    },
    talk: {
        switch: {
            htalk: true,
            artitalk: {
                agent: false,
                feign: false
            }
        },
        artitalk_agent_config: {
            APPID: "",
            APPKEY: ""
        }

    }
}
;// CONCATENATED MODULE: ./worker/src/github/getlist.js

async function ghlist(config) {
  const username = config.username
  const reponame = config.reponame
  const path = (() => {
    const pathsplit = config.path.split('/')
    let formatpath = ""
    for (var i = 0; i < pathsplit.length - 1; i++) {
      if (pathsplit[i] != "") {
        formatpath += `/${pathsplit[i]}`
      }
    }
    return formatpath
  })()
  const branch = config.branch || 'main'
  const token = config.token || ''
  const url = encodeURI(`https://api.github.com/repos/${username}/${reponame}/contents${path}?ref=${branch}`)
  const init = {
    method: 'GET',
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "user-agent": 'HexoPlusPlus Github Filer',
      "Authorization": "token " + token
    }
  }
  if (token == '') { delete init.headers.Authorization }
  return await (await fetch(url, init)).json()
}


async function ghtreelist(config) {
  const username = config.username
  const reponame = config.reponame
  const path = (() => {
    const pathsplit = config.path.split('/')
    let formatpath = ""
    for (var i = 0; i < pathsplit.length - 1; i++) {
      if (pathsplit[i] != "") {
        formatpath += `/${pathsplit[i]}`
      }
    }
    return formatpath
  })()
  const branch = config.branch || 'main'
  const token = config.token || ''
  const url = encodeURI(`https://api.github.com/repos/${username}/${reponame}/contents${path}?ref=${branch}`)
  const init = {
    method: 'GET',
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "user-agent": 'HexoPlusPlus Github Filer',
      "Authorization": "token " + token
    }
  }
  if (token == '') { delete init.headers.Authorization }
  return fetch_bfs([], url, init)
}



async function fetch_bfs(arr, url, getinit) {
  try {
    const hpp_getlist = await (await fetch(url, getinit)).json()
    for (var i = 0; i < getJsonLength(hpp_getlist); i++) {
      if (hpp_getlist[i]["type"] != "dir") {
        arr.push(hpp_getlist[i])
      } else {
        await fetch_bfs(arr, hpp_getlist[i]["_links"]["self"], getinit)
      }
    }
    return arr;
  } catch (lo1) { return [] }
}
;// CONCATENATED MODULE: ./worker/src/github/getsha.js

async function ghsha(config) {
    const list = await ghlist(config)
    try {
        return list.filter(function (fp) {
            return `/${fp.path}` == `${config.path}`
        })[0]["sha"]
    }
    catch (e) {
        return ''
    }
}
;// CONCATENATED MODULE: ./worker/src/github/manager.js

async function ghupload(config) {
  const username = config.username
  const reponame = config.reponame
  const path = config.path
  const branch = config.branch || 'main'
  const token = config.token || ''
  const sha = config.sha || await ghsha(config)
  const message = config.message || 'Upload By HexoPlusPlus With Love'
  const base64file = config.file
  const method = 'PUT'
  const url = encodeURI(`https://api.github.com/repos/${username}/${reponame}/contents${path}?ref=${branch}`)
  let body = {
    branch: branch, message: message, content: base64file, sha: sha
  }

  let init = {
    body: JSON.stringify(body),
    method: method,
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "user-agent": 'HexoPlusPlus Github Filer',
      "Authorization": "token " + token
    }
  }

  if (token == '') {
    delete init.headers.Authorization
  }
  return fetch(url, init)
}


async function ghdel(config) {
  const username = config.username
  const reponame = config.reponame
  const path = config.path
  const branch = config.branch || 'main'
  const token = config.token
  const sha = config.sha || await ghsha(config)
  const message = config.message || 'Delete By HexoPlusPlus With Love'
  const method = 'DELETE'
  const url = encodeURI(`https://api.github.com/repos/${username}/${reponame}/contents${path}?ref=${branch}`)
  const body = {
    branch: branch, message: message, sha: sha
  }
  console.log(body)
  let init = {
    body: JSON.stringify(body),
    method: method,
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "user-agent": 'HexoPlusPlus Github Filer',
      "Authorization": "token " + token
    }
  }
  if (token == '') {
    delete init.headers.Authorization
  }
  return fetch(url, init)
}


async function ghget(config) {
  const username = config.username
  const reponame = config.reponame
  const path = config.path
  const branch = config.branch || 'main'
  const token = config.token || ''
  const url = encodeURI(`https://raw.githubusercontent.com/${username}/${reponame}/${branch}${path}`)
  let init = { headers: { Accept: "application/vnd.github.v3.raw", Authorization: `token ${token}` } }
  if (token == '') {
    delete init.headers.Authorization
  }
  return fetch(url, init)
}


async function ghstar(config) {
  const token = config.token || (() => { return false })()
  const url = `https://api.github.com/user/starred/HexoPlusPlus/HexoPlusPlus`
  let init = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "user-agent": 'HexoPlusPlus Github Filer',
      "Authorization": `token ${token}`
    },
    method: "PUT"
  }
  const res = await fetch(url, init)
  return res.status == 204 ? true : false
}


;// CONCATENATED MODULE: ./worker/src/update.js

const hppupdate = async (config, newest) => {
    let ver = 'dist'
    if (!newest) {
        ver = await ghlatver({
            username: "HexoPlusPlus",
            reponame: "HexoPlusPlus",
            token: config.hpp_githubdoctoken || config.hpp_githubimagetoken || ''
        })
    }
    const url = `https://raw.githubusercontent.com/HexoPlusPlus/HexoPlusPlus/${ver}/index.worker.js`


    const script = await (await fetch(url)).text()
    const up_init = {
        body: script,
        method: "PUT",
        headers: {
            "content-type": "application/javascript",
            "X-Auth-Key": config.hpp_CF_Auth_Key,
            "X-Auth-Email": config.hpp_Auth_Email
        }
    }
    const update_resul = await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${config.hpp_account_identifier}/workers/scripts/${config.hpp_script_name}`, up_init)).json()
    if (update_resul["success"]) {
        return genjsonres('更新是成功的!', 0, 200)
    } else {
        return genjsonres('更新是失败的!', -1, 500)
    }


}
async function getlatinfo(config) {
    const token = config.hpp_githubdoctoken || config.hpp_githubimagetoken || ''
    const url = `https://api.github.com/repos/HexoPlusPlus/HexoPlusPlus/releases/latest`
    let init = {
      method: 'GET',
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "user-agent": 'HexoPlusPlus Github Filer',
        "Authorization": "token " + token
      }
    }
    if (token == '') {
      delete init.headers.Authorization
    }
    return (await (await fetch(url, init)).json())
  }
  
  
  async function ghlatver(config) {
    return (await getlatinfo(config))["tag_name"]
  }
  
  async function ghlatinfo(config) {
    return (await getlatinfo(config))["body"]
  }
  
;// CONCATENATED MODULE: ./worker/src/router/router.js







const githubroute = async (request, config, hinfo) => {
    try {
        let r, rs, name, msgd, hpp_list_index
        const apireq = await request.json()
        switch (apireq.action) {
            case 'add':
                r = await ghupload({
                    file: apireq.file,
                    username: apireq.username,
                    reponame: apireq.reponame,
                    path: apireq.path,
                    branch: apireq.branch,
                    token: apireq.token
                })
                rs = r.status
                if (rs == 200 || rs == 201) {
                    /*
                    if (rs == 201) {
                        await HKV.delete("hpp_doc_list_index");
                        return genjsonres('新建文档成功！', 0, rs)
                    }*/
                    return genjsonres(language_lang.GH_UPLOAD_SUCCESS, 0, rs)
                } else {
                    return genjsonres(language_lang.GH_UPLOAD_ERROR, 1, rs)
                }
            case 'get':
                r = await ghget({
                    username: apireq.username,
                    reponame: apireq.reponame,
                    path: apireq.path,
                    branch: apireq.branch,
                    token: apireq.token
                })
                if (apireq.json) {
                    return genjsonres(language_lang.GH_GET_SUCCESS, 0, 200, await r.text())
                } else {
                    return r
                }

            case 'del':
                r = await ghdel({
                    username: apireq.username,
                    reponame: apireq.reponame,
                    path: apireq.path,
                    branch: apireq.branch,
                    token: apireq.token
                })
                rs = r.status
                if (rs == 200) {
                    return genjsonres(language_lang.GH_DELETE_SUCCESS, 0, rs)
                } else {
                    return genjsonres(language_lang.GH_DELETE_ERROR, 1, rs)
                }
            case 'list':
                return genjsonres(language_lang.GH_LIST_SUCCESS, 0, 200, JSON.stringify(await ghlist({
                    username: apireq.username,
                    reponame: apireq.reponame,
                    path: apireq.path,
                    branch: apireq.branch,
                    token: apireq.token
                })))
            case 'listtree':
                return genjsonres(language_lang.GH_TREELIST_SUCCESS, 0, 200, JSON.stringify(await ghtreelist({
                    username: apireq.username,
                    reponame: apireq.reponame,
                    path: apireq.path,
                    branch: apireq.branch,
                    token: apireq.token
                })))

            /*
            case 'adddoc':
                r = await ghupload({
                    file: apireq.file,
                    username: config.hpp_githubdocusername,
                    reponame: config.hpp_githubdocrepo,
                    path: config.githubdocpath,
                    branch: config.hpp_githubdocbranch,
                    filename: apireq.filename,
                    token: config.hpp_githubdoctoken
                })
                rs = r.status
                if (rs == 200 || rs == 201) {
                    if (rs == 201) { await HKV.delete("hpp_doc_list_index"); return genjsonres('新建文档成功！', 0, rs) }
                    return genjsonres('上传文档成功！', 0, rs)
                } else {
                    return genjsonres('上传/新建文档失败！', 1, rs)
                }
            case 'adddraft':

                r = await ghupload({
                    file: apireq.file,
                    username: config.hpp_githubdocusername,
                    reponame: config.hpp_githubdocrepo,
                    path: config.githubdocdraftpath,
                    branch: config.hpp_githubdocbranch,
                    filename: apireq.filename,
                    token: config.hpp_githubdoctoken
                })
                rs = r.status
                if (rs == 200 || rs == 201) {
                    if (rs == 201) { await HKV.delete("hpp_doc_draft_list_index"); return genjsonres('上传草稿成功！', 0, rs) }
                    return genjsonres('上传草稿成功！', 0, rs)
                } else {
                    return genjsonres('上传/新建草稿失败！', -1, rs)
                }
            case 'addimg':
                name = `${Date.parse(new Date())}.${apireq.suffix}`
                r = await ghupload({
                    file: apireq.file,
                    username: config.hpp_githubimageusername,
                    reponame: config.hpp_githubimagerepo,
                    path: config.githubimagepath,
                    branch: config.hpp_githubimagebranch,
                    filename: name,
                    token: config.hpp_githubimagetoken
                })
                rs = r.status

                if (rs == 200 || rs == 201) {
                    const jsdurl = `https://cdn.jsdelivr.net/gh/${config.hpp_githubimageusername}/${config.hpp_githubimagerepo}@${config.hpp_githubimagebranch}${config.hpp_githubimagepath}${name}`

                    return genjsonres('上传图片成功！', 0, rs, jsdurl)
                } else {
                    return genjsonres('上传图片失败！', -1, rs)
                }
            case 'deldoc':
                r = await ghdel({
                    username: config.hpp_githubdocusername,
                    reponame: config.hpp_githubdocrepo,
                    path: config.githubdocpath,
                    branch: config.hpp_githubdocbranch,
                    filename: apireq.filename,
                    token: config.hpp_githubdoctoken
                })
                rs = r.status
                if (rs == 200) {
                    await HKV.delete("hpp_doc_list_index")
                    return genjsonres('删除文档成功！', 0, rs)
                } else {
                    return genjsonres('删除文档失败！', -1, rs)
                }
            case 'deldraft':
                r = await ghdel({
                    username: config.hpp_githubdocusername,
                    reponame: config.hpp_githubdocrepo,
                    path: config.githubdocdraftpath,
                    branch: config.hpp_githubdocbranch,
                    filename: apireq.filename,
                    token: config.hpp_githubdoctoken
                })
                rs = r.status
                if (rs == 200) {
                    await HKV.delete("hpp_doc_list_index")
                    return genjsonres('删除艹稿成功！', 0, rs)
                } else {
                    return genjsonres('删除艹稿失败！', -1, rs)
                }

            case 'delimg':
                r = await ghdel({
                    username: config.hpp_githubimageusername,
                    reponame: config.hpp_githubimagerepo,
                    path: config.githubimagepath,
                    branch: config.hpp_githubimagebranch,
                    filename: apireq.filename,
                    token: config.hpp_githubimagetoken
                })
                rs = r.status
                if (rs == 200) {
                    await HKV.delete("hpp_doc_list_index")
                    return genjsonres('删除图片成功！', 0, rs)
                } else {
                    return genjsonres('删除图片失败！', -1, rs)
                }
            case 'getdoc':
                return ghget({
                    username: config.hpp_githubdocusername,
                    reponame: config.hpp_githubdocrepo,
                    path: config.githubdocpath,
                    branch: config.hpp_githubdocbranch,
                    filename: apireq.filename,
                    token: config.hpp_githubdoctoken
                })
            case 'getdraft':
                return ghget({
                    username: config.hpp_githubdocusername,
                    reponame: config.hpp_githubdocrepo,
                    path: config.githubdocdraftpath,
                    branch: config.hpp_githubdocbranch,
                    filename: apireq.filename,
                    token: config.hpp_githubdoctoken
                })
            case 'getscaffolds':
                return ghget({
                    username: config.hpp_githubdocusername,
                    reponame: config.hpp_githubdocrepo,
                    path: `${config.hpp_githubdocroot}scaffolds/`,
                    branch: config.hpp_githubdocbranch,
                    filename: 'post.md',
                    token: config.hpp_githubdoctoken
                })
            case 'getdoclist':

                hpp_list_index = await HKV.get("hpp_doc_list_index")
                if (hpp_list_index === null) {
                    hpp_list_index = JSON.stringify(await ghtreelist({
                        username: config.hpp_githubdocusername,
                        reponame: config.hpp_githubdocrepo,
                        path: config.githubdocpath,
                        branch: config.hpp_githubdocbranch,
                        token: config.hpp_githubdoctoken
                    }))
                    if (!hinfo.dev) {
                        await HKV.put("hpp_doc_list_index", hpp_list_index)
                        msgd = '没有命中缓存,获取文章列表成功！'
                    } else {

                        msgd = '没有命中缓存,处于开发模式,获取文章列表成功！'
                    }
                } else {
                    msgd = '命中了缓存,获取文章列表成功！'
                }
                return genjsonres(msgd, 0, 200, hpp_list_index)

            case 'getdraftlist':

                hpp_list_index = await HKV.get("hpp_doc_draft_list_index")
                if (hpp_list_index === null) {
                    hpp_list_index = JSON.stringify(await ghtreelist({
                        username: config.hpp_githubdocusername,
                        reponame: config.hpp_githubdocrepo,
                        path: config.githubdocdraftpath,
                        branch: config.hpp_githubdocbranch,
                        token: config.hpp_githubdoctoken
                    }))
                    if (!hinfo.dev) {
                        await HKV.put("hpp_doc_draft_list_index", hpp_list_index)
                        msgd = '没有命中缓存,获取艹稿列表成功！'
                    } else {
                        msgd = '没有命中缓存,处于开发模式,获取艹稿列表成功！'
                    }
                } else {
                    msgd = '命中了缓存,获取艹稿列表成功！'
                }
                return genjsonres(msgd, 0, 200, hpp_list_index)


            case 'getimglist':

                hpp_list_index = await HKV.get("hpp_img_list_index")
                if (hpp_list_index === null) {
                    hpp_list_index = JSON.stringify(await ghtreelist({
                        username: config.hpp_githubimageusername,
                        reponame: config.hpp_githubimagerepo,
                        path: config.githubimagepath,
                        branch: config.hpp_githubimagebranch,
                        token: config.hpp_githubimagetoken
                    }))
                    if (!hinfo.dev) {
                        await HKV.put("hpp_img_list_index", hpp_list_index)
                        msgd = '没有命中缓存,获取图片列表成功！'
                    } else {
                        msgd = '没有命中缓存,处于开发模式,获取图片列表成功！'
                    }
                } else {
                    msgd = '命中了缓存,获取图片列表成功！'
                }
                return genjsonres(msgd, 0, 200, hpp_list_index)
            case 'delindex':
                await HKV.delete("hpp_doc_draft_list_index")
                await HKV.delete("hpp_doc_list_index")
                await HKV.delete("hpp_img_list_index")
                return genjsonres('清除索引缓存成功!', 0, 200)
                */
            default:
                return genjsonres(language_lang.UNKNOW_ACTION, -1, 500)
        }
    } catch (lo) { return genjsonres(language_lang.UNKNOW_ERROR, -1, 500, lo) }
}

const dashroute = async (request, config, hinfo) => {
    const req = request
    const urlStr = req.url
    const urlObj = new URL(urlStr)
    const path = urlObj.href.substr(urlObj.origin.length)
    let hpp_js = ""
    let ainfo = {
        hpp_home_act: "",
        hpp_edit_act: "",
        hpp_site_act: "",
        hpp_talk_act: "",
        hpp_docs_man_act: "",
        hpp_img_man_act: "",
        hpp_tool_act: "",
        hpp_set_act: ""
    }
    let hpp_init = gethtml.dash404
    if (rp(path) == "/hpp/admin/dash/home") {
        ainfo.hpp_home_act = " active"
        hpp_init = gethtml.dashhome(config, hinfo)
        hpp_js = gethtml.dashhomejs(config, hinfo)
    }
    if (rp(path) == "/hpp/admin/dash/edit") {
        ainfo.hpp_edit_act = " active"
        hpp_init = gethtml.dashedit
        hpp_js = gethtml.dasheditjs(config, hinfo)
    }
    if (rp(path) == "/hpp/admin/dash/site") {
        ainfo.hpp_site_act = " active"
        hpp_init = gethtml.dashsite
        hpp_js = gethtml.dashsitejs(config, hinfo)
    }
    if (rp(path) == "/hpp/admin/dash/talk") {
        ainfo.hpp_talk_act = " active"
        hpp_init = gethtml.dashtalk
        hpp_js = gethtml.dashtalkjs(config, hinfo)
    }
    if (rp(path) == "/hpp/admin/dash/docs_man") {
        ainfo.hpp_docs_man_act = " active"
        hpp_init = gethtml.dashdocs
        hpp_js = gethtml.dashdocsjs(hinfo)

    }
    if (rp(path) == "/hpp/admin/dash/img_man") {
        ainfo.hpp_img_man_act = " active"
        hpp_init = gethtml.dashimg
        hpp_js = gethtml.dashimgjs(hinfo)
    }
    if (rp(path) == "/hpp/admin/dash/tool") {
        ainfo.hpp_tool_act = " active"
        hpp_init = gethtml.dashtool
        hpp_js = gethtml.dashtooljs(hinfo)
    }
    let hpp_dash_head = gethtml.dash_head(config, hinfo, ainfo)
    let hpp_dash_foot = gethtml.dash_foot(hinfo, hpp_js)
    let hpp_dash = `${hpp_dash_head}${hpp_init}${hpp_dash_foot}`
    return new Response(hpp_dash, {
        headers: { "content-type": "text/html;charset=UTF-8" }
    })


}

const updateroute = async (request, config, hinfo) => {
    try {
        const apireq = await request.json()
        switch (apireq.action) {
            case 'update':
                if (apireq.dev) {
                    return hppupdate(config, true)
                } else {
                    return hppupdate(config, false)
                }
            case 'check':
                if (await ghlatver(config, false) == hinfo.ver) {
                    return genjsonres(language_lang.NEED_UPDATE, 0, 200)
                } else {
                    return genjsonres(language_lang.NEED_NOT_UPDATE, 1, 200, await ghlatinfo(config))
                }
            default:
                return genjsonres(language_lang.UNKNOW_ACTION, -1, 500)
        }
    } catch (lo) { throw lo }
}
;// CONCATENATED MODULE: ./worker/src/talk/htalk/genres.js

async function genres(config, msg, code, status, content) {
    m = msg ? `${language_lang.HTALK}:${msg}` : `${language_lang.HTALK}:${language_lang.UNKNOW_ERROR}`
    c = code ? code : "-1"
    s = status ? status : 500
    co = content ? content : ''
    r = {
        msg: m,
        code: c,
        content: co
    }
    return new Response(JSON.stringify(r), {
        status: s, headers: {
            "content-type": "application/javascript; charset=utf-8",
            "Access-Control-Allow-Origin": config.hpp_cors
        }
    })

}
;// CONCATENATED MODULE: ./worker/src/talk/htalk/index.js


async function htalk(config, request, loginstatus, hinfo) {
    try {
        const r = await request.json()
        let limit, start, htalk, p, hres, add, talk_init
        login = loginstatus || false
        if (login) {
            switch (r.action) {
                case 'initialization':
                    await HKV.put("htalk", "{}")
                    return genres(config, `${language_lang.HTALK}:${language_lang.HTALK_INIT_SUCCESS}`, 200, 0, '')
                case 'get':
                    htalk = await HKV.get("htalk", { type: "json" });
                    limit = r.limit
                    start = r.start || htalk.nid
                    hres = []
                    p = start
                    for (var i = 0; i < limit; i++) {
                        if (!!(htalk["data"][p])) {
                            hres.push(htalk["data"][p])
                            p--
                        } else {
                            i--
                            p--
                        }
                    }
                    return genres(config, language_lang.HTALK_GET_SUCCESS.replace("${1}", (function () { if (login) { return '已登录' } else { return '未登录' } })()), 200, 0, JSON.stringify(hres))

                case 'add':
                    htalk = await HKV.get("htalk", { type: "json" })
                    add = {
                        id: htalk["nid"] + 1,
                        time: r.time,
                        name: r.name || hinfo.username,
                        avatar: r.avatar,
                        content: r.content,
                        visible: true
                    }
                    htalk.data.push(add);
                    htalk.nid += 1

                    await HKV.put("htalk", JSON.stringify(htalk))
                    return genres(config, `已成功上传说说数据`, 200, 0, '')
                case 'del':
                    htalk = await HKV.get("htalk", { type: "json" })
                    delete htalk.data[r.id]
                    await HKV.put("htalk", JSON.stringify(htalk))
                    return genres(config, `已成功删除id为${r.id}的数据`, 200, 0, '')
                case 'visible':
                    htalk = await HKV.get("htalk", { type: "json" })
                    htalk.data[r.id].visible = htalk.data[r.id].visible ? false : true
                    await HKV.put("htalk", JSON.stringify(htalk))
                    return genres(config, `已改变id为${r.id}的数据的可见性`, 200, 0, '')


                case 'inputartitalk':


                    htalk = await HKV.get("htalk", { type: "json" })
                    for (var i = 0; i < r.ctx.length; i++) {
                        htalk.nid++;
                        talk_init = {
                            id: hpp_talk_id,
                            time: r.ctx[i].updatedAt.split('T')[0],
                            name: hinfo.username,
                            avatar: r.ctx[i].avatar,
                            content: r.ctx[i].atContentHtml,
                            visible: "True"
                        }
                        htalk.data[htalk.nid] = talk_init
                    }
                    await HKV.put("htalk", JSON.stringify(htalk))
                    return genres(config, `已导入${r.ctx.length}条!`, 200, 0, '')
                default:
                    return genres(config, `未知的操作`, 500, -1, '')
            }
        } else {
            switch (r.action) {
                case 'get':
                    htalk = await HKV.get("htalk", { type: "json" });
                    limit = r.limit
                    start = r.start || htalk.nid
                    hres = []
                    p = start
                    for (var i = 0; i < limit; i++) {
                        if ((function () { try { return htalk["data"][p]["visible"] } catch (m) { return false } }()) && !!(htalk["data"][p])) {
                            hres.push(htalk["data"][p])
                            p--
                        } else {
                            i--
                            p--
                        }
                    }
                    return genres(config, `在${(function () { if (login) { return '已登录' } else { return '未登录' } })()}的状态下,已成功获得说说数据`, 200, 0, JSON.stringify(hres))
                default:
                    return genres(config, `未知的操作`, 500, -1, '')
            }
        }
    }
    catch (lo2) { return genres(config, lo2, 500, -1, '') }
}
;// CONCATENATED MODULE: ./worker/src/getblogeractive.js
async function genactiveres(config) {
    var k = (Date.parse(new Date()) - (await HKV.get("hpp_activetime"))) / 1000
    if (k < 30) {
        return genactres(config, '博主刚刚还在这里')
    }
    else if (k < 60) {
        return genactres(config, `博主在${Math.round(k)}秒前离开`)
    }
    else if (k < 3600) {
        return genactres(config, `博主在${Math.round(k / 60)}分钟前偷偷瞄了一眼博客`)
    }
    else {
        return genactres(config, `博主在${Math.round(k / 3600)}小时前活跃了一次`)
    }
}

function genactres(config, t) {
    return new Response(`document.getElementById("bloggeractivetime").innerHTML='${t}'`, {
        headers: {
            "content-type": "application/javascript; charset=utf-8",
            "Access-Control-Allow-Origin": config.hpp_cors
        }
    })
}
;// CONCATENATED MODULE: ./worker/src/install.js
const install = (config, hinfo, request) => {
    return new Response(``)
    /*
    if (rp(path) == '/hpp/admin/api/upconfig') {
              const config_r = JSON.stringify(await request.text())
              await HKV.put("hpp_config", config_r)
              return new Response("OK")
            }
            if (rp(path) == "/hpp/admin/install") {
              let hpp_installhtml = gethtml.installhtml(config, hinfo)
              return new Response(hpp_installhtml, {
                headers: { "content-type": "text/html;charset=UTF-8" }
              })
    
            }
            */

    /*
    CDN = hinfo.CDN
    hpp_ver = hinfo.ver
    return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width">
      <title>欢迎 | ${hpp_ver}</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mdui@1.0.1/dist/css/mdui.min.css"/>
    </head>
    <body style="mdui-theme-layout-dark">
    <div class="mdui-container">
      <div class="mdui-toolbar">
        <a id="_menu" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">menu</i></a>
        <span class="mdui-typo-title">${hpp_ver}安装</span>
        <div class="mdui-toolbar-spacer"></div>
      </div>
    </div>
    
    <div class="mdui-drawer mdui-drawer-close" id="drawer" style="background-color:#fff">
      <ul class="mdui-list" id="_li">
      <li class="mdui-list-item mdui-ripple">
      <a href="https://hexoplusplus.js.org">
          <div class="mdui-list-item-content">寻求帮助</div></a></li><li class="mdui-list-item mdui-ripple">
          <a href="https://github.com/hexoplusplus/hexoplusplus">
          <div class="mdui-list-item-content">项目地址</div></a></li><li class="mdui-list-item mdui-ripple">
          <a href="https://jq.qq.com/?_wv=1027&k=rAcnhzqK">
          <div class="mdui-list-item-content">加群帮助</div></a>
        </li>
    </ul></div>
    
    <div class="mdui-container">
    
      <div class="mdui-row">
        <div class="mdui-m-b-3">
          <div class="mdui-panel" id="panel">
            <div class="mdui-panel-item mdui-panel-item-open " id="item-1">
              <div class="mdui-panel-item-header">基础配置(必填)</div>
              <div class="mdui-panel-item-body">
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">域名</label>
        <input class="mdui-textfield-input" id="hpp_domain" value="${config["hpp_domain"] || domain}"/>
      </div>
      
      
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">头像地址</label>
        <input class="mdui-textfield-input" id="hpp_userimage" value="${config["hpp_userimage"]}"/>
      </div>
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">标题</label>
        <input class="mdui-textfield-input" id="hpp_title" value="${config["hpp_title"]}"/>
      </div>
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">icon地址</label>
        <input class="mdui-textfield-input" id="hpp_usericon" value="${config["hpp_usericon"]}"/>
      </div>
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">跨域请求</label>
        <input class="mdui-textfield-input" id="hpp_cors" value="${config["hpp_cors"]}"/>
      </div>
      
      
                  
      
      
              </div>
            </div>
        
        <div class="mdui-panel-item mdui-panel-item-open " id="item-1">
              <div class="mdui-panel-item-header">面板配置(必填)</div>
              <div class="mdui-panel-item-body">
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">OWOJSON地址</label>
        <input class="mdui-textfield-input" id="hpp_OwO" value="${config["hpp_OwO"]}"/>
      </div>
      
      
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">面板背景图片</label>
        <input class="mdui-textfield-input" id="hpp_back" value="${config["hpp_back"]}"/>
      </div>
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">懒加载图片</label>
        <input class="mdui-textfield-input" id="hpp_lazy_img" value="${config["hpp_lazy_img"]}"/>
      </div>
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">高亮样式</label>
        <input class="mdui-textfield-input" id="hpp_highlight_style" value="${config["hpp_highlight_style"]}"/>
      </div>
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">面板选项卡颜色</label>
        <input class="mdui-textfield-input" id="hpp_color" value="${config["hpp_color"]}"/>
      </div>
      
                    <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">面板选项框颜色</label>
        <input class="mdui-textfield-input" id="hpp_bg_color" value="${config["hpp_bg_color"]}"/>
      </div>
                    <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">面板主题色</label>
        <input class="mdui-textfield-input" id="hpp_theme_mode" value="${config["hpp_theme_mode"]}"/>
      </div>
                  
                   <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">列表限制数量</label>
        <input class="mdui-textfield-input" id="hpp_page_limit" value="${config["hpp_page_limit"]}"/>
      </div>
                  
      
              </div>
            </div>
        
        
        <div class="mdui-panel-item mdui-panel-item-open " id="item-1">
              <div class="mdui-panel-item-header">Github文档配置</div>
              <div class="mdui-panel-item-body">
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github文档仓库Token</label>
        <input class="mdui-textfield-input" id="hpp_githubdoctoken" value="${config["hpp_githubdoctoken"]}"/>
      </div>
      
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github文档仓库用户名</label>
        <input class="mdui-textfield-input" id="hpp_githubdocusername" value="${config["hpp_githubdocusername"]}"/>
      </div>
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github文档仓库名</label>
        <input class="mdui-textfield-input" id="hpp_githubdocrepo" value="${config["hpp_githubdocrepo"]}"/>
      </div>
      
                    <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github文档仓库根目录</label>
        <input class="mdui-textfield-input" id="hpp_githubdocroot" value="${config["hpp_githubdocroot"]}"/>
      </div>
                  
                     <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github文档仓库分支</label>
        <input class="mdui-textfield-input" id="hpp_githubdocbranch" value="${config["hpp_githubdocbranch"]}"/>
      </div>
      
      
       <label class="mdui-switch">
            <input type="checkbox" id="yuque"/>
             <i class="mdui-switch-icon"></i> 使用语雀对接
          </label>
                     
      <div id="hpp_yuque" style="display:none">
      
       <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github语雀仓库用户名</label>
        <input class="mdui-textfield-input" id="hpp_githubyuqueusername" value="${config["hpp_githubyuqueusername"]}"/>
      </div>
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github语雀仓库名</label>
        <input class="mdui-textfield-input" id="hpp_githubyuquerepo" value="${config["hpp_githubyuquerepo"]}"/>
      </div>
      
              <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github语雀TOKEN</label>
        <input class="mdui-textfield-input" id="hpp_githubyuquetoken" value="${config["hpp_githubyuquetoken"]}"/>
      </div>
      
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">语雀识别码【请自行手滚键盘，不得留空】</label>
        <input class="mdui-textfield-input" id="hpp_yuquetoken" value="${config["hpp_yuquetoken"]}"/>
      </div>
      
      
      </div>
      
      
              </div>
            </div>
        
        <div class="mdui-panel-item mdui-panel-item-open " id="item-1">
              <div class="mdui-panel-item-header">图床配置</div>
              <div class="mdui-panel-item-body">
          
          
      <label class="mdui-switch">
            <input type="checkbox" id="hpp_img"/>
            使用Github图床，由HPP托管 <i class="mdui-switch-icon"></i>  自定义图床 
          </label>
      
      <div id="githubimg" >
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github图片仓库Token</label>
        <input class="mdui-textfield-input" id="hpp_githubimagetoken" value="${config["hpp_githubimagetoken"]}"/>
      </div>
      
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github图片仓库用户名</label>
        <input class="mdui-textfield-input" id="hpp_githubimageusername" value="${config["hpp_githubimageusername"]}"/>
      </div>
      
      
                    <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github图片仓库名</label>
        <input class="mdui-textfield-input" id="hpp_githubimagerepo" value="${config["hpp_githubimagerepo"]}"/>
      </div>
                   <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github图片仓库路径</label>
        <input class="mdui-textfield-input" id="hpp_githubimagepath" value="${config["hpp_githubimagepath"]}"/>
      </div>
                     <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github图片仓库分支</label>
        <input class="mdui-textfield-input" id="hpp_githubimagebranch" value="${config["hpp_githubimagebranch"]}"/>
      </div>
                     
      
      
      
              </div>
          
            <div id="ownimg" style="display:none">
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">自定义接口地址</label>
        <input class="mdui-textfield-input" id="hpp_ownimgurl" value="${config["hpp_ownimgurl"]}"/>
      </div>
      
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">POST参数名</label>
        <input class="mdui-textfield-input" id="hpp_ownimgname" value="${config["hpp_ownimgname"]}"/>
      </div>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">JSON路径</label>
        <input class="mdui-textfield-input" id="hpp_ownimgjsonpath" value="${config["hpp_ownimgjsonpath"]}"/>
      </div>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">自定义头</label>
        <input class="mdui-textfield-input" id="hpp_ownimgheader" value="${config["hpp_ownimgheader"]}"/>
      </div>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">自定义method</label>
        <input class="mdui-textfield-input" id="hpp_ownimgmethod" value="${config["hpp_ownimgmethod"]}"/>
      </div>
      
              </div>
          
          
          </div>
            </div>
        
        
        
        <div class="mdui-panel-item mdui-panel-item-open " id="item-1">
              <div class="mdui-panel-item-header">Github私有Page配置</div>
              <div class="mdui-panel-item-body">
       <label class="mdui-switch">
            <input type="checkbox" id="hpp_githubpage"/>
            <i class="mdui-switch-icon"></i> 开启PrivatePage模式 
          </label><div id="hpp_githubpage_ctx" style="display:none">
      
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">GithubPage仓库Token</label>
        <input class="mdui-textfield-input" id="hpp_githubpagetoken" value="${config["hpp_githubpagetoken"]}"/>
      </div>
      
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">GithubPage仓库用户名</label>
        <input class="mdui-textfield-input" id="hpp_githubpageusername" value="${config["hpp_githubpageusername"]}"/>
      </div>
      
      
                    <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">GithubPage仓库名</label>
        <input class="mdui-textfield-input" id="hpp_githubpagerepo" value="${config["hpp_githubpagerepo"]}"/>
      </div>
                   <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">GithubPage仓库根</label>
        <input class="mdui-textfield-input" id="hpp_githubpageroot" value="${config["hpp_githubpageroot"]}"/>
      </div>
                     <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">GithubPage仓库分支</label>
        <input class="mdui-textfield-input" id="hpp_githubpagebranch" value="${config["hpp_githubpagebranch"]}"/>
      </div>
                     
      
      
      
              </div></div>
            </div>
        
        
        
        
        
        
        
        
        <div class="mdui-panel-item mdui-panel-item-open " id="item-1">
              <div class="mdui-panel-item-header">CloudFlare配置(必填)</div>
              <div class="mdui-panel-item-body">
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Global API Key</label>
        <input class="mdui-textfield-input" id="hpp_CF_Auth_Key" value="${config["hpp_CF_Auth_Key"]}"/>
      </div>
      
      
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">目标Workers名称</label>
        <input class="mdui-textfield-input" id="hpp_script_name" value="${config["hpp_script_name"]}"/>
      </div>
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Workers账户ID</label>
        <input class="mdui-textfield-input" id="hpp_account_identifier" value="${config["hpp_account_identifier"]}"/>
      </div>
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">账户登录邮箱</label>
        <input class="mdui-textfield-input" id="hpp_Auth_Email" value="${config["hpp_Auth_Email"]}"/>
      </div>
      
      
                  
                     
      
      
      
              </div>
            </div>
        
        
        <div class="mdui-panel-item mdui-panel-item-open " id="item-1">
              <div class="mdui-panel-item-header">TwikooPlusPlus</div>
              <div class="mdui-panel-item-body">
           <label class="mdui-switch">
            <input type="checkbox" id="hpp_twikoo"/>
            <i class="mdui-switch-icon"></i>	开启TwikooPlusPlus功能
          </label>
          
          <div id="hpp_twikoo_ctx" style="display:none">
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Twikoo环境ID</label>
        <input class="mdui-textfield-input" id="hpp_twikoo_envId" value="${config["hpp_twikoo_envId"]}"/>
      </div>
      
      
              
      
                  
                     
      
      
      
              </div></div>
            </div>
        
        <div class="mdui-panel-item mdui-panel-item-open " id="item-1">
              <div class="mdui-panel-item-header">附加配置</div>
              <div class="mdui-panel-item-body">
                
      
      
               <label class="mdui-switch">
            <input type="checkbox" id="hpp_autodate"/>
            <i class="mdui-switch-icon"></i>	自动签到功能
          </label>
      
                  
                     
      
      
      
              </div>
            </div>
        
        
          </div>
        </div>
      </div>
    <button class="mdui-btn mdui-btn-raised mdui-center" onclick="upload()" id="bbb">提交配置</button>
    </div>
      <div class="mdui-dialog" id="dialogerr">
        <div class="mdui-dialog-title">出错了！</div>
        <div class="mdui-dialog-content">上传失败！可能是网络原因，请重试</div>
      </div>
      
        <div class="mdui-dialog" id="dialogok">
        <div class="mdui-dialog-title">上传成功！</div>
        <div class="mdui-dialog-content">点击OK进入主面板</div>
      <div class="mdui-dialog-actions">
          <button class="mdui-btn mdui-ripple" onclick="window.location.reload()">OK</button>
        </div>
      </div>
    <script src="https://cdn.jsdelivr.net/npm/mdui@1.0.1/dist/js/mdui.min.js"></script>
    
    <script>
    document.getElementById('hpp_img').checked = ${config["hpp_img"]}
    document.getElementById('hpp_githubpage').checked = ${config["hpp_githubpage"]}
    document.getElementById('hpp_twikoo').checked = ${config["hpp_twikoo"]}
    document.getElementById('hpp_autodate').checked = ${config["hpp_autodate"]}
    document.getElementById('hpp_yuque').checked = ${config["hpp_yuque"]}
    </script>
    <script src="${CDN}install.js"></script>
    </body>
    </html>`*/

}
;// CONCATENATED MODULE: ./worker/src/hpage/index.js
const hpage = (config) => {
    return new Response(lang.COMING_SOON)
    /* 
            if (hpp_githubpage != "true") {
        
              
            } else {
              let p = path.split("?")[0].substr(1)
              let init
              if (p.split("/").slice(-1) == "") { p += "index.html" }
              if (p == "2021/04/02/en/index.html" && urlObj.searchParams.get('pass') != "1234") {
                init = { headers: { "content-type": "text/html; charset=utf-8" } }
                let anss = `<html>
        <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
        <meta charset="UTF-8"> 
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta name="renderer" content="webkit"> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>该文章已被加密</title>
        </head>
        <body>
            <div class="main">
                <img class="alert" alt="文章已被加密" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAACACAMAAADjwgEwAAAAOVBMVEUAAAD5dBr7dRj4dBn/cBD5cxr4cxn6chj7dBj/cBj5cxr5dBn6cxn4dBn5cxr6dRX5cxr5cxr5dBoQJfbPAAAAEnRSTlMAgD/AEPDgYEAgoLCQcFAw0J/MNdW8AAADg0lEQVR42s3b7W7iMBSEYWftxA75At//xW7VZRWnQ3WkvOKE+VmJMtjxg8Ek4Iy5e8zdmsLFSXmoz8QSrsw61CZxDJdlrsf0OVyUR5WALrDJh3SZ68uswT1rfZ3e/dpNff0lMTjnVr/yEVO01SZdWae6Z/CFNzYXxxa+kttqwTHl2ORHl95zWBrvl/BMM0e34JZ8XC+6phwWtD7ptv95uWBBdzIVMm0luGTshVYB+B5ccvt12Ubnt8Xt91Vb3JyzX/rk5Jy+cr2M3Jyzl8nMnOO6Bewc103TMee4btw5rpsmA+e4bm7O2boh57huS9twyaODc7Zu43fBR3J1bni1q0/Pv0bgHNNNl3cGzgHdyouhmqBzXLf9SZ2c01HXKsA5pptWcXJOV6hWAc5R3bQKcI7qplUcnLs3uhlV1Ln5bboZVd7rXGqdMKuoQ9ObdDOqAOeAbkYVY0fOdTOqAOeAblLFEOAdutlVbOe4bmYV4BzQzahiOId104DPrVw3uwp3zv5fdhXgHNDNqAKcs3Sbw4kqhnNAN7vK25yLhlFGFcM5pJtdBTtn65ZPVDGcY7rZVbhzpgmgitgEdQNV5DUx3UAV5pxebaCKOMd0A1WYcyoTqKJWIt1AFeSczi6rou+rQDdQBTmnEoAqzLn9cfvjYBXdmQLdQBXgnOrGq+j7PNANVAHOiW6gCnBO2idQBTunuvEqtnPoxE2rgJXJdNMqyCt8OqsnH8A5NoZ6HgScoyf5+ykZ+raGr7f97PCWwD4I6iYnquCbPa4b/0aA6OZwgo9/NwV2IEC3950YeP7GTp1DuhkBzpkDx2M7x3XTAOfMRWZn7OJwn5YETjCQbjqtw8qc47o95GHAOaTbUptswDmkm/6aPwLnsG65HpKQc/rqtvP3fRTgHNUt1kM67tx49u6RqR6SgXNIt30097mlzpXT5G+1zQD2c3zvFmV+kHM6aedgieDBz2GZyN5t2+87TGQ/131PGdu7pa7/Hs/M9nPDD2i3cCqllA3s5/bnjqKbY4bDDLXFQOiwxJaGe/BP2gcihCLQuiZKlV1f58zNDmr9lNtLSyg+C8jeKrSXbX/pCqqHxdyvwTO6j53qnvu8/nFLfgz1uGXJ9SMy/sP3A3J7fhq7Pv34f21fnkUWt3eUtDTVSzPL1u6SKGfjrV6TvtM98bhccMlMOYWXSWXpHJNLaPMXZ8oyOMxlLIsAAAAASUVORK5CYII=">
                <form action="" method="GET" class="hpp-side-form">
                    <h2 class="pw-tip">该文章已被加密</h2>
                    <input type="password" name="pass" placeholder="请输入访问密码查看" required><button type="submit">提交</button>
                    
                    
                </form>
                <a href="/" class="return-home" title="点击回到网站首页">- 返回首页 - </a>
            </div>
            <style type="text/css">
            *{font-family:"Microsoft Yahei",微软雅黑,"Helvetica Neue",Helvetica,"Hiragino Sans GB","WenQuanYi Micro Hei",sans-serif;box-sizing:border-box;margin:0px;padding:0px;font-size:14px;-webkit-transition:.2s;-moz-transition:.2s;-ms-transition:.2s;-o-transition:.2s;transition:.2s}
            html,body{width:100%;height:100%}
            body{background-color:#F4F6F9;color:#768093}
            input,button{font-size:1em;border-radius:3px;-webkit-appearance:none}
            input{width:100%;padding:5px;box-sizing:border-box;border:1px solid #e5e9ef;background-color:#f4f5f7;resize:vertical}
            input:focus{background-color:#fff;outline:none}
            button{border:0;background:#6abd09;color:#fff;cursor:pointer;opacity:1;user-select:none}
            button:hover,button:focus{opacity:.9}
            button:active{opacity:1}
            .main{width:100%;max-width:500px;height:300px;padding:30px;background-color:#fff;border-radius:2px;box-shadow:0 10px 60px 0 rgba(29,29,31,0.09);transition:all .12s ease-out;position:absolute;left:0;top:0;bottom:0;right:0;margin:auto;text-align:center}
            .alert{width:80px}
            .hpp-side-form{margin-bottom:28px}
            .hpp-side-form input{float:left;padding:2px 10px;width:77%;height:37px;border:1px solid #ebebeb;border-right-color:transparent;border-radius:2px 0 0 2px;line-height:37px}
            .hpp-side-form button{position:relative;overflow:visible;width:23%;height:37px;border-radius:0 2px 2px 0;text-transform:uppercase}
            .pw-tip{font-weight:normal;font-size:26px;text-align:center;margin:25px auto}
            #pw-error {color: red;margin-top: 15px;margin-bottom: -20px;}
            .return-home{text-decoration:none;color:#b1b1b1;font-size:16px}
            .return-home:hover{color:#1E9FFF;letter-spacing:5px}
            </style>
        </body>
        </html>`
                return new Response(anss, init)
              }
              const anss = await fetch(`https://raw.githubusercontent.com/${hpp_githubpageusername}/${hpp_githubpagerepo}/${hpp_githubpagebranch}${hpp_githubpageroot}${p}`, { headers: { Accept: "application/vnd.github.v3.raw", Authorization: `token ${hpp_githubpagetoken}` } })
        
              if (await anss.status == 404) { init = { headers: { "content-type": "text/html; charset=utf-8" } }; return new Response(await (await fetch(`https://raw.githubusercontent.com/${hpp_githubpageusername}/${hpp_githubpagerepo}/${hpp_githubpagebranch}${hpp_githubpageroot}404.html`, { headers: { Accept: "application/vnd.github.v3.raw", Authorization: `token ${hpp_githubpagetoken}` } })).text(), init) }
              if ((p.split("/").slice(-1))[0].split(".")[1] == "html") {
                init = { headers: { "content-type": "text/html; charset=utf-8" } }
                return new Response(await anss.text(), init)
              }
              if ((p.split("/").slice(-1))[0].split(".")[1] == "js") {
                init = { headers: { "content-type": "application/javascript; charset=utf-8" } }
                return new Response(await anss.text(), init)
              }
              if ((p.split("/").slice(-1))[0].split(".")[1] == "css") {
                init = { headers: { "content-type": "text/css; charset=utf-8" } }
                return new Response(await anss.text(), init)
              }
              return new Response(anss, init)
        
        
            }
        
            */
}
;// CONCATENATED MODULE: ./worker/kernel.js
const md5 = __webpack_require__(735)
;









let hinfo = {
  ver: "HexoPlusPlus@2.0.0β3",
  CDN: `https://hppstatic.pages.dev/`,
  dev: true
}

if (hinfo.dev) { hinfo.CDN = 'https://127.0.0.1:9999/' }


let hpp_logstatus
async function hexoplusplus(request) {
  try {
    hpp_logstatus = false
    const req = request
    const urlStr = req.url
    const urlObj = new URL(urlStr)
    const path = urlObj.href.substr(urlObj.origin.length)
    const domain = (urlStr.split('/'))[2]
    const username = hpp_username.split(",");
    const password = hpp_password.split(",");
    const maph = new Map(request.headers);
    hinfo.username = username

    if (rp(path) == '/hpp/lang') {
      return new Response(language_lang.LANG)
    }





    /*HPP Auth:Cookie&Basic*/
    for (var w = 0; w < getJsonLength(username); w++) {
      if ((getCookie(request, "h_cookie_auth") == `${md5(username[w])}:${md5(password[w])}`) || ((() => { try { if (maph.get('h_basic_auth') == `${md5(username[w])}:${md5(password[w])}`) { return true } else { return false } } catch (p) { return false } })())) {
        hpp_logstatus = true
      }
    }

    const config = await formatconfig()


    if (rp(path) == '/hpp/admin/install' && hpp_logstatus) {
      return install(config, hinfo, request)
    }

    if (!config.installed && hpp_logstatus) {
      return new Response(gethtml.errorpage(language_lang.EMPTY_HCONFIG, hinfo, [
        { url: `/hpp/admin/install`, des: language_lang.START_INSTALL }
      ]), {
        headers: { "content-type": "text/html;charset=UTF-8" }
      })
    }

    if (path.startsWith('/hpp/admin')) {
      if (rp(path) == "/hpp/admin/check") {
        if (hpp_logstatus) {
          return genjsonres(language_lang.CHECK_LOGIN_SUCCESS, 0, 200)
        } else {
          return genjsonres(language_lang.CHECK_LOGIN_ERROR, -1, 403)
        }
      }

      if (hpp_logstatus) {

        /*主面板*/
        if (path.startsWith("/hpp/admin/dash")) {
          return dashroute(request, config, hinfo)
        }

        /*GithubAPI*/
        if (rp(path) == '/hpp/admin/api/github') {

          return githubroute(request, config, hinfo)
        }
        /*更新*/
        if (rp(path) == '/hpp/admin/api/update') {
          return updateroute(request, config, hinfo)
        }

        /*签到*/
        if (rp(path) == '/hpp/admin/api/kick') {
          const now = Date.now(new Date())
          await HKV.put("hpp_activetime", now)
          return genjsonres(language_lang.ATTENDANCE_SUCCESS, 0, 200, "")
        }

        /*HTALK*/
        if (rp(path) == '/hpp/admin/api/talk/htalk') {
          return htalk(config, request, hpp_loginstatus, hinfo)
        }


        if (rp(path) == '/hpp/admin/api/talk/artitalk') {
          return new Response(language_lang.COMING_SOON)
        }


      }
      else {
        if (rp(path) == '/hpp/admin/login') {
          return new Response(gethtml.loginhtml(config, hinfo), {
            headers: { "content-type": "text/html;charset=UTF-8" }
          })
        }

        return Response.redirect(`https://${domain}/hpp/admin/login`, 302)
      }
      return Response.redirect(`https://${domain}/hpp/admin/dash/home`, 302)
    }
    if (path.startsWith('/hpp/api')) {
      /*游客端API*/
      /*获得最近活跃时间*/
      if (rp(path) == "/hpp/api/getblogeractive") {
        return genactiveres(config)
      }

      if (path.startsWith('/hpp/api/talk/')) {
        /*HTALK游客端*/
        if (rp(path) == "/hpp/api/talk/htalk") {
          return htalk(config, request, false, hinfo)
        }

        if (rp(path) == '/hpp/api/talk/artitalk') {
          return new Response(language_lang.COMING_SOON)
        }
      }
      if (path.startsWith('/hpp/api/comment/')) {

        /*评论区，Feign为KV+Worker伪装后端，Agent为代理和隐藏前端重要数据*/
        if (rp(path) == "/hpp/api/comment/Feign_Valine") {
          return new Response(language_lang.COMING_SOON)
        }
        if (rp(path) == "/hpp/api/comment/Agent_Valine") {
          return new Response(language_lang.COMING_SOON)
        }



        if (rp(path) == "/hpp/api/comment/Feign_Waline") {
          return new Response(language_lang.COMING_SOON)
        }
        if (rp(path) == "/hpp/api/comment/Agent_Waline") {
          return new Response(language_lang.COMING_SOON)
        }


        if (rp(path) == "/hpp/api/comment/Feign_Artalk") {
          return new Response(language_lang.COMING_SOON)
        }
        if (rp(path) == "/hpp/api/comment/Agent_Artalk") {
          return new Response(language_lang.COMING_SOON)
        }


        if (rp(path) == "/hpp/api/comment/Feign_Twikoo") {
          return new Response(language_lang.COMING_SOON)
        }
        if (rp(path) == "/hpp/api/comment/Feign_Twikoo") {
          return new Response(language_lang.COMING_SOON)
        }

        if (rp(path) == "/hpp/api/comment/Agent_Disqus") {
          return new Response(language_lang.COMING_SOON)
        }

        if (rp(path) == "/hpp/api/comment/Agent_Gitalk") {
          return new Response(language_lang.COMING_SOON)
        }
      }

    }

    /*HPAGE：支持PrivateRepo，提供类似于WorkerSite的功能*/
    if (config.hpp_hpage) {
      return hpage(config)
    }


    return new Response(gethtml.errorpage(language_lang.UNKNOW_ACTION, hinfo, [
      { url: `/hpp/admin/dash/home`, des: language_lang.DASHBOARD }
    ]), {
      headers: { "content-type": "text/html;charset=UTF-8" }
    })
  } catch (e) {

    return new Response(gethtml.errorpage(e, hinfo), {
      headers: { "content-type": "text/html;charset=UTF-8" }
    })

  }
}

;// CONCATENATED MODULE: ./worker/index.js

addEventListener("fetch", event => {
  event.respondWith(hexoplusplus(event.request))
})


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module doesn't tell about it's top-level declarations so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(475);
/******/ 	
/******/ })()
;