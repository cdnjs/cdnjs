;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * 过滤XSS攻击
 *
 * @author 老雷<leizongmin@gmail.com>
 */

/*
 * 默认HTML标签白名单
 * 标签名=>属性列表
 */
var defaultWhiteList = {
  h1:     [],
  h2:     [],
  h3:     [],
  h4:     [],
  h5:     [],
  h6:     [],
  hr:     [],
  span:   [],
  strong: [],
  b:      [],
  i:      [],
  br:     [],
  p:      [],
  pre:    [],
  code:   [],
  a:      ['target', 'href', 'title'],
  img:    ['src', 'alt', 'title', 'width', 'height'],
  div:    [],
  table:  ['width', 'border'],
  tr:     ['rowspan'],
  td:     ['width', 'colspan'],
  th:     ['width', 'colspan'],
  tbody:  [],
  thead:  [],
  ul:     [],
  li:     [],
  ol:     [],
  dl:     [],
  dt:     [],
  em:     [],
  cite:   [],
  section:[],
  header: [],
  footer: [],
  blockquote: [],
  audio:  ['autoplay', 'controls', 'loop', 'preload', 'src'],
  video:  ['autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width']
};

// 正则表达式
var REGEXP_LT = /</g;
var REGEXP_GT = />/g;
var REGEXP_QUOTE = /"/g;
var REGEXP_ATTR_NAME = /[^a-zA-Z0-9_:\.\-]/img;
var REGEXP_ATTR_VALUE_1 = /&#([a-zA-Z0-9]*);?/img;
var REGEXP_ATTR_VALUE_COLON = /&colon;?/img;
var REGEXP_ATTR_VALUE_NEWLINE = /&newline;?/img;
var REGEXP_DEFAULT_ON_TAG_ATTR_1 = /\/\*|\*\//mg;
var REGEXP_DEFAULT_ON_TAG_ATTR_2 = /^[\s"'`]*((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/ig;
var REGEXP_DEFAULT_ON_TAG_ATTR_3 = /\/\*|\*\//mg;
var REGEXP_DEFAULT_ON_TAG_ATTR_4 = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/ig;
var REGEXP_DEFAULT_ON_TAG_ATTR_5 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:/ig;
var REGEXP_DEFAULT_ON_TAG_ATTR_6 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:\s*image\//ig;


/**
 * 过滤属性值
 *
 * @param {String} tag 标签名
 * @param {String} attr 属性名
 * @param {String} value 属性值
 * @return {String} 若不需要修改属性值，不返回任何值
 */
function defaultOnTagAttr (tag, attr, value) {
  if (attr === 'href' || attr === 'src') {
    // 过滤 href 和 src 属性
    // javascript:
    REGEXP_DEFAULT_ON_TAG_ATTR_1.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_1.test(value)) {
      return '#';
    }
    // /*注释*/
    REGEXP_DEFAULT_ON_TAG_ATTR_2.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_2.test(value)) {
      return '#';
    }
    // data:
    REGEXP_DEFAULT_ON_TAG_ATTR_5.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_5.test(value)) {
      // 允许 data: image/* 类型
      REGEXP_DEFAULT_ON_TAG_ATTR_6.lastIndex = 0;
      if (!REGEXP_DEFAULT_ON_TAG_ATTR_6.test(value)) {
        return '#';
      }
    }
  } else if (attr === 'style') {
    // 过滤 style 属性 （这个xss漏洞较老了，可能已经不适用）
    // javascript:
    REGEXP_DEFAULT_ON_TAG_ATTR_3.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_3.test(value)) {
      return '#';
    }
    // /*注释*/
    REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
      return '';
    }
  }
}

/**
 * 过滤非白名单的标签
 *
 * @param {String} tag 标签名
 * @param {String} html 标签HTML代码（包括属性值）
 * @param {Object} options 更多属性：
 *                   position：在返回的HTML代码中的开始位置
 *                   originalPosition：在原HTML代码中的开始位置
 *                   isClosing：是否为闭合标签，如</a>
 * @return {String} 若不返回任何值，则默认替换<>为&lt;&gt;
 */
function defaultOnIgnoreTag (tag, html, options) {
  return noTag(html);
}


/**
 * 转换<>为&lt; &gt
 *
 * @param {String} text
 * @return {String}
 */
function noTag (text) {
  return text.replace(REGEXP_LT, '&lt;').replace(REGEXP_GT, '&gt;');
}

/**
 * 清除不可见字符
 *
 * @param {String} str
 * @return {String}
 */
function clearNonPrintableCharacter (str) {
  var str2 = '';
  for (var i = 0, len = str.length; i < len; i++) {
    str2 += str.charCodeAt(i) < 32 ? ' ' : str.charAt(i);
  }
  return str2.trim();
}

/**
 * 对双引号进行转义
 *
 * @param {String} str
 * @return {String} str
 */
function escapeQuotes (str) {
  return str.replace(REGEXP_QUOTE, '&quote;');
}

/**
 * 对html实体编码进行转义
 *
 * @param {String} str
 * @return {String}
 */
function escapeHtmlEntities (str) {
  return str.replace(REGEXP_ATTR_VALUE_1, function replaceUnicode (str, code) {
    return (code[0] === 'x' || code[0] === 'X')
            ? String.fromCharCode(parseInt(code.substr(1), 16))
            : String.fromCharCode(parseInt(code, 10));
  });
}

/**
 * 对html5新增的危险实体编码进行转义
 *
 * @param {String} str
 * @return {String}
 */
function escapeDangerHtml5Entities (str) {
  return str.replace(REGEXP_ATTR_VALUE_COLON, ':')
            .replace(REGEXP_ATTR_VALUE_NEWLINE, ' ');
}

/**
 * 对属性值进行转义
 *
 * @param {String} str
 * @return {String}
 */
function safeAttrValue (str) {
  // 去掉两边的空白字符
  str = str.trim();

  // 过滤双引号
  str = escapeQuotes(str);

  // 转换HTML实体编码
  str = escapeHtmlEntities(str);

  // 转换危险的HTML5新增实体编码
  str = escapeDangerHtml5Entities(str);

  // 清除不可见字符
  str = clearNonPrintableCharacter(str);

  return str;
}

/**
 * XSS过滤对象
 *
 * @param {Object} options 选项：whiteList, onTagAttr, onIgnoreTag
 */
function FilterXSS (options) {
  'use strict';

  this.options = options = options || {};
  this.whiteList = options.whiteList || exports.whiteList;
  this.onTagAttr = options.onTagAttr || exports.onTagAttr;
  this.onIgnoreTag = options.onIgnoreTag || exports.onIgnoreTag;
}

/**
 * 过滤不合法的属性
 *
 * @param {String} tagName 标签名称
 * @param {String} attrs 标签属性部分
 * @return {String}
 */
FilterXSS.prototype.filterAttributes = function (tagName, attrs) {
  'use strict';

  tagName = tagName.toLowerCase();
  var me = this;
  var whites = this.whiteList[tagName];
  var lastPos = 0;
  var _attrs = '';
  var tmpName = false;
  var hasSprit = false;

  var addAttr = function (name, value) {
    name =  name.trim();
    if (!hasSprit && name === '/') {
      hasSprit = true;
      return;
    }
    name = name.replace(REGEXP_ATTR_NAME, '').toLowerCase();
    if (name.length < 1) return;
    if (whites.indexOf(name) !== -1) {
      if (value) {
        // 先对属性值进行转义
        value = safeAttrValue(value);
        // 使用用户自定义的 onTagAttr 再过滤
        var newValue = me.onTagAttr(tagName, name, value);
        if (typeof newValue !== 'undefined') {
          value = newValue;
        }
      }
      _attrs += name + (value ? '="' + value + '"' : '') + ' ';
    }
  };

  for (var i = 0, len = attrs.length; i < len; i++) {
    var c = attrs.charAt(i),v;
    if (tmpName === false && c === '=') {
      tmpName = attrs.slice(lastPos, i);
      lastPos = i + 1;
      continue;
    }
    if (tmpName !== false) {
      if (i === lastPos && (c === '"' || c === "'")) {
        var j = attrs.indexOf(c, i + 1);
        if (j === -1) {
          break;
        } else {
          v = attrs.slice(lastPos + 1, j).trim();
          addAttr(tmpName, v);
          tmpName = false;
          i = j;
          lastPos = i + 1;
          continue;
        }
      }
    }
    if (c === ' ') {
      v = attrs.slice(lastPos, i).trim();
      if (tmpName === false) {
        addAttr(v);
      } else {
        addAttr(tmpName, v);
      }
      tmpName = false;
      lastPos = i + 1;
      continue;
    }
  }

  if (lastPos < attrs.length) {
    if (tmpName === false) {
      addAttr(attrs.slice(lastPos));
    } else {
      addAttr(tmpName, attrs.slice(lastPos));
    }
  }
  if (hasSprit) _attrs += '/';

  return _attrs.trim();
};

/**
 * 检查标签是否合法
 *
 * @param {String} tag 标签文本，如“<a”
 * @param {Number} currentPos 原HTML的当前位置
 * @param {Number} targetPos 生成的HTML的当前位置
 */
FilterXSS.prototype.addNewTag = function (tag, currentPos, targetPos) {
  'use strict';

  var rethtml = '';
  var tagName;
  var hasSprit;
  var spos = tag.slice(0, 2) === '</' ? 2 : 1;

  var i = tag.indexOf(' ');
  if (i === -1) {
    tagName = tag.slice(spos, tag.length - 1).trim();
  } else {
    tagName = tag.slice(spos, i + 1).trim();
  }
  tagName = tagName.toLowerCase();

  // 检查标签是否以“/”结尾
  if (tagName.slice(-1) === '/') {
    tagName = tagName.slice(0, -1);
    hasSprit = true;
  } else {
    hasSprit = false;
  }

  if (tagName in this.whiteList) {
    // 过滤不合法的属性
    if (i === -1) {
      rethtml += tag.slice(0, spos) + tagName + (hasSprit ? ' />' : '>');
    } else {
      var attrs = this.filterAttributes(tagName, tag.slice(i + 1, tag.length - 1).trim());
      rethtml += tag.slice(0, spos) + tagName + (attrs.length > 0 ? ' ' + attrs : '') + '>';
    }
  } else {
    // 过滤不合法的标签
    var options = {
      isClosing:        (spos === 2),
      position:         targetPos,
      originalPosition: currentPos - tag.length + 1
    };
    var tagHtml = this.onIgnoreTag(tagName, tag, options);
    if (typeof tagHtml === 'undefined') {
      tagHtml = noTag(tag);
    }
    rethtml += tagHtml;
  }

  return rethtml;
};

/**
 * 开始处理
 *
 * @param {String} html
 * @return {String}
 */
FilterXSS.prototype.process = function (html) {
  'use strict';

  var rethtml = '';
  var lastPos = 0;
  var tagStart = false;
  var quoteStart = false;
  var currentPos = 0;
  var len = 0;

  // 逐个分析字符
  for (currentPos = 0, len = html.length; currentPos < len; currentPos++) {
    var c = html.charAt(currentPos);
    if (tagStart === false) {
      if (c === '<') {
        tagStart = currentPos;
        continue;
      }
    } else {
      if (quoteStart === false) {
        if (c === '<') {
          rethtml += noTag(html.slice(lastPos, currentPos));
          tagStart = currentPos;
          lastPos = currentPos;
          continue;
        }
        if (c === '>') {
          rethtml += noTag(html.slice(lastPos, tagStart));
          rethtml += this.addNewTag(html.slice(tagStart, currentPos + 1), currentPos, rethtml.length);
          lastPos = currentPos + 1;
          tagStart = false;
          continue;
        }
        if (c === '"' || c === "'") {
          quoteStart = c;
          continue;
        }
      } else {
        if (c === quoteStart) {
          quoteStart = false;
          continue;
        }
      }
    }
  }
  if (lastPos < html.length) {
    rethtml += noTag(html.substr(lastPos));
  }

  return rethtml;
};

/**
 * XSS过滤
 *
 * @param {String} html 要过滤的HTML代码
 * @param {Object} options 选项：whiteList, onTagAttr, onIgnoreTag
 * @return {String}
 */
function filterXSS (html, options) {
  var xss = new FilterXSS(options);
  return xss.process(html);
}

// 默认配置
exports = module.exports = filterXSS;
exports.FilterXSS = FilterXSS;
exports.whiteList = defaultWhiteList;
exports.onTagAttr = defaultOnTagAttr;
exports.onIgnoreTag = defaultOnIgnoreTag;

// 工具函数
exports.utils = require('./utils');

// 在浏览器端使用
if (typeof window !== 'undefined') {
  if(!Array.indexOf){
    Array.prototype.indexOf = function(item){
        for(var i=0;i<this.length;i++){
            if(this[i] == item) return i;
        }
        return -1;
    };
  }
  if(!Array.forEach){
    Array.prototype.forEach = function(fn){
       for(var i=0;i<this.length;i++) fn(this[i],i,this);
    };
  }
  if(!String.trim){
    String.prototype.trim = function(){
        return this.replace(/(^\s*)|(\s*$)/g,"");
    };
  }
  window.filterXSS = module.exports;
}

},{"./utils":2}],2:[function(require,module,exports){
/**
 * 工具函数
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var utils = module.exports;

/**
 * 过滤代码块
 *
 * @param {array} tags 要隐藏的标签列表
 * @param {function} next 对不在列表中的标签的处理函数
 */
utils.tagFilter = function (tags, next) {
  if (typeof(next) !== 'function') {
    next = function () {};
  }
  var hidden = [];
  var posStart = false;
  return {
    onIgnoreTag: function (tag, html, options) {
      if (tags.indexOf(tag) !== -1) {
        var ret = '[removed]';
        if (posStart !== false && options.isClosing) {
          var end = options.position + ret.length;
          hidden.push([posStart, end]);
          posStart = false;
        } else {
          posStart = options.position;
        }
        return ret;
      } else {
        return next(tag, html, options);
      }
    },
    filter: function (html) {
      var rethtml = '';
      var lastPos = 0;
      hidden.forEach(function (pos) {
        rethtml += html.slice(lastPos, pos[0]);
        lastPos = pos[1];
      });
      rethtml += html.slice(lastPos);
      return rethtml;
    }
  };
};


},{}]},{},[1])
;