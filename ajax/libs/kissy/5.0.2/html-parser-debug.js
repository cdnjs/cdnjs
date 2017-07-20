/*
Copyright 2014, modulex-html-parser@1.0.2
MIT Licensed
build time: Thu, 16 Oct 2014 03:56:54 GMT
*/
modulex.add("html-parser", [], function(require, exports, module) {

/*
combined modules:
html-parser
html-parser/dtd
html-parser/util
html-parser/lexer/lexer
html-parser/lexer/cursor
html-parser/lexer/page
html-parser/lexer/index
html-parser/nodes/text
html-parser/nodes/node
html-parser/nodes/cdata
html-parser/nodes/attribute
html-parser/nodes/tag
html-parser/base
html-parser/nodes/comment
html-parser/parser
html-parser/nodes/fragment
html-parser/nodes/document
html-parser/scanner
html-parser/scanners/tag-scanner
html-parser/scanners/special-scanners
html-parser/scanners/quote-cdata-scanner
html-parser/scanners/cdata-scanner
html-parser/scanners/textarea-scanner
html-parser/writer/basic
html-parser/writer/beautify
html-parser/writer/minify
html-parser/writer/filter
*/
var htmlParserUtil, htmlParserLexerCursor, htmlParserLexerIndex, htmlParserNodesNode, htmlParserNodesAttribute, htmlParserBase, htmlParserScannersSpecialScanners, htmlParserScannersCdataScanner, htmlParserScannersTextareaScanner, htmlParserWriterBasic, htmlParserWriterMinify, htmlParserWriterFilter, htmlParserDtd, htmlParserLexerPage, htmlParserNodesText, htmlParserNodesCdata, htmlParserNodesTag, htmlParserNodesComment, htmlParserNodesFragment, htmlParserNodesDocument, htmlParserScannersTagScanner, htmlParserScannersQuoteCdataScanner, htmlParserWriterBeautify, htmlParserLexerLexer, htmlParserScanner, htmlParserParser, htmlParser;
htmlParserUtil = function (exports) {
  function mix(r, s) {
    if (s) {
      for (var p in s) {
        r[p] = s[p];
      }
    }
  }
  function Noop() {
  }
  var RE_TRIM = /^[\s\xa0]+|[\s\xa0]+$/g;
  var trim = String.prototype.trim;
  exports = {
    isBooleanAttribute: function (attrName) {
      return /^(?:checked|disabled|selected|readonly|defer|multiple|nohref|noshape|nowrap|noresize|compact|ismap)$/i.test(attrName);
    },
    collapseWhitespace: function (str) {
      return str.replace(/[\s\xa0]+/g, ' ');
    },
    isLetter: function (ch) {
      return 'a' <= ch && 'z' >= ch || 'A' <= ch && 'Z' >= ch;
    },
    isValidAttributeNameStartChar: function (ch) {
      return !this.isWhitespace(ch) && ch !== '"' && ch !== '\'' && ch !== '>' && ch !== '' < '' && ch !== '/' && ch !== '=';
    },
    isWhitespace: function (ch) {
      return /^[\s\xa0]$/.test(ch);
    },
    merge: function () {
      var ret = {};
      for (var i = 0, l = arguments.length; i < l; i++) {
        mix(ret, arguments[i]);
      }
      return ret;
    },
    mix: mix,
    each: function (arr, fn) {
      if (arr) {
        for (var i = 0, l = arr.length; i < l; i++) {
          if (fn(arr[i], i) === false) {
            break;
          }
        }
      }
    },
    extend: function (Sub, Parent, proto, statics) {
      Sub.superclass = Noop.prototype = Parent.prototype;
      var subProto = Sub.prototype = new Noop();
      subProto.constructor = Sub;
      mix(subProto, proto);
      mix(Sub, statics);
      return Sub;
    },
    indexOf: function (item, arr) {
      for (var i = 0, l = arr.length; i < l; i++) {
        if (arr[i] === item) {
          return i;
        }
      }
      return -1;
    },
    trim: trim ? function (str) {
      return str == null ? '' : trim.call(str);
    } : function (str) {
      return str == null ? '' : (str + '').replace(RE_TRIM, '');
    }
  };
  return exports;
}();
htmlParserLexerCursor = function (exports) {
  function Cursor(offset) {
    this.position = offset || 0;
  }
  Cursor.prototype = {
    constructor: Cursor,
    advance: function () {
      this.position++;
    },
    clone: function () {
      var c = new Cursor();
      c.position = this.position;
      return c;
    },
    retreat: function () {
      this.position = Math.max(--this.position, 0);
    }
  };
  exports = Cursor;
  return exports;
}();
htmlParserLexerIndex = function (exports) {
  function Index() {
    this.lineCursors = [];
  }
  Index.prototype = {
    constructor: Index,
    add: function (cursor) {
      var index = indexOfCursorForInsert(this.lineCursors, cursor);
      if (index !== -1) {
        this.lineCursors.splice(index, 0, cursor.clone());
      }
    },
    remove: function (cursor) {
      var cs = this.lineCursors;
      var index = indexOfCursor(this.lineCursors, cursor);
      if (index !== -1) {
        cs.splice(index, 1);
      }
    },
    row: function (cursor) {
      var cs = this.lineCursors;
      for (var i = 0; i < cs.length; i++) {
        if (cs[i].position > cursor.position) {
          return i - 1;
        }
      }
      return i;
    },
    col: function (cursor) {
      var linePosition = 0, lineCursor = this.lineCursors[this.row(cursor) - 1];
      if (lineCursor) {
        linePosition = lineCursor.position;
      }
      return cursor.position - linePosition;
    }
  };
  function indexOfCursor(cs, c) {
    var cPosition = c.position;
    for (var i = 0; i < cs.length; i++) {
      var iPosition = cs[i].position;
      if (iPosition === cPosition) {
        return i;
      } else if (iPosition < cPosition) {
        return -1;
      }
    }
    return -1;
  }
  function indexOfCursorForInsert(cs, c) {
    var cPosition = c.position;
    for (var i = 0; i < cs.length; i++) {
      var iPosition = cs[i].position;
      if (iPosition === cPosition) {
        return -1;
      } else if (iPosition > cPosition) {
        return i;
      }
    }
    return i;
  }
  exports = Index;
  return exports;
}();
htmlParserNodesNode = function (exports) {
  function lineCount(str) {
    var i = 0;
    str.replace(/\n/g, function () {
      i++;
    });
    return i;
  }
  function Node(page, startPosition, endPosition) {
    this.parentNode = null;
    this.page = page;
    this.startPosition = startPosition;
    this.endPosition = endPosition;
    this.nodeName = null;
    this.previousSibling = null;
    this.nextSibling = null;
  }
  Node.prototype = {
    constructor: Node,
    getStartLine: function () {
      if (this.page) {
        if ('startLine' in this) {
          return this.startLine;
        }
        this.startLine = lineCount(this.page.getText(0, this.startPosition));
      }
      return -1;
    },
    getEndLine: function () {
      if (this.page) {
        if ('endLine' in this) {
          return this.endLine;
        }
        this.endLine = lineCount(this.page.getText(0, this.endPosition));
      }
      return -1;
    },
    toHtml: function () {
      if (this.page && this.page.getText) {
        return this.page.getText(this.startPosition, this.endPosition);
      }
      return '';
    },
    toDebugString: function () {
      var ret = [], self = this;
      ret.push(self.nodeName + '  [ ' + self.startPosition + '|' + self.getStartLine() + ' : ' + self.endPosition + '|' + self.getEndLine() + ' ]\n');
      ret.push(self.toHtml());
      return ret.join('');
    }
  };
  exports = Node;
  return exports;
}();
htmlParserNodesAttribute = function (exports) {
  var util = htmlParserUtil;
  function Attribute(name, assignment, value, quote) {
    this.nodeType = 2;
    this.name = name;
    this.assignment = assignment;
    this.value = value;
    this.quote = quote;
  }
  Attribute.prototype = {
    clone: function () {
      var ret = new Attribute();
      util.mix(ret, this);
      return ret;
    },
    equals: function (other) {
      return this.name === other.name && this.value === other.value && this.nodeType === other.nodeType;
    }
  };
  Attribute.prototype.clone = function () {
    var ret = new Attribute();
    util.mix(ret, this);
    return ret;
  };
  exports = Attribute;
  return exports;
}();
htmlParserBase = function (exports) {
  exports = {};
  return exports;
}();
htmlParserScannersSpecialScanners = function (exports) {
  exports = {};
  return exports;
}();
htmlParserScannersCdataScanner = function (exports) {
  exports = {
    scan: function (tag, lexer, opts) {
      var content = lexer.parseCDATA(opts.quoteSmart, tag.nodeName), position = lexer.getPosition(), node = lexer.nextNode();
      if (node) {
        if (node.nodeType !== 1 || !(node.isEndTag() && node.tagName === tag.tagName)) {
          lexer.setPosition(position);
          node = null;
        }
      }
      tag.closed = true;
      if (content) {
        tag.appendChild(content);
      }
    }
  };
  return exports;
}();
htmlParserScannersTextareaScanner = function (exports) {
  var CDataScanner = htmlParserScannersCdataScanner;
  var SpecialScanners = htmlParserScannersSpecialScanners;
  exports = SpecialScanners.textarea = {
    scan: function (tag, lexer, opts) {
      opts = opts || {};
      CDataScanner.scan(tag, lexer, opts);
    }
  };
  return exports;
}();
htmlParserWriterBasic = function (exports) {
  var util = htmlParserUtil;
  var isBooleanAttribute = util.isBooleanAttribute;
  function escapeAttrValue(str) {
    return String(str).replace(/'/g, '&quot;');
  }
  function BasicWriter() {
    this.output = [];
  }
  BasicWriter.prototype = {
    constructor: BasicWriter,
    append: function () {
      var o = this.output, args = arguments, arg;
      for (var i = 0; i < args.length; i++) {
        arg = args[i];
        if (arg.length > 1) {
          for (var j = 0; j < arg.length; j++) {
            o.push(arg.charAt(j));
          }
        } else {
          o.push(arg);
        }
      }
      return this;
    },
    openTag: function (el) {
      this.append('<', el.tagName);
    },
    openTagClose: function (el) {
      if (el.isSelfClosed) {
        this.append(' ', '/');
      }
      this.append('>');
    },
    closeTag: function (el) {
      this.append('</', el.tagName, '>');
    },
    attribute: function (attr) {
      var value = attr.value || '', name = attr.name;
      if (isBooleanAttribute(name) && !value) {
        value = name;
      }
      this.append(' ', name, '="', escapeAttrValue(value), '"');
    },
    text: function (text) {
      this.append(text);
    },
    cdata: function (cdata) {
      this.append(cdata);
    },
    comment: function (comment) {
      this.append('<!--' + comment + '-->');
    },
    getHtml: function () {
      return this.output.join('');
    }
  };
  htmlParserBase.BasicWriter = exports = BasicWriter;
  return exports;
}();
htmlParserWriterMinify = function (exports) {
  var BasicWriter = htmlParserWriterBasic;
  var util = htmlParserUtil;
  var trim = util.trim, isBooleanAttribute = util.isBooleanAttribute, collapseWhitespace = util.collapseWhitespace, reEmptyAttribute = new RegExp('^(?:class|id|style|title|lang|dir|on' + '(?:focus|blur|change|click|dblclick|mouse(' + '?:down|up|over|move|out)|key(?:press|down|up)))$');
  function escapeAttrValue(str) {
    return String(str).replace(/"/g, '&quot;');
  }
  function canDeleteEmptyAttribute(tag, attr) {
    var attrValue = attr.value || '', attrName = attr.name;
    if (!trim(attrValue)) {
      return tag === 'input' && attrName === 'value' || reEmptyAttribute.test(attrName);
    }
    return 0;
  }
  function canRemoveAttributeQuotes(value) {
    return !/[ "'=<>`]/.test(value);
  }
  function isAttributeRedundant(el, attr) {
    var tag = el.nodeName, attrName = attr.name, attrValue = attr.value || '';
    attrValue = trim(attrValue.toLowerCase());
    return tag === 'script' && attrName === 'language' && attrValue === 'javascript' || tag === 'form' && attrName === 'method' && attrValue === 'get' || tag === 'input' && attrName === 'type' && attrValue === 'text' || tag === 'script' && attrName === 'type' && attrValue === 'text/javascript' || tag === 'style' && attrName === 'type' && attrValue === 'text/css' || tag === 'area' && attrName === 'shape' && attrValue === 'rect';
  }
  function isConditionalComment(text) {
    return /\[if[^\]]+\]/.test(text);
  }
  function isEventAttribute(attrName) {
    return /^on[a-z]+/.test(attrName);
  }
  function isUriTypeAttribute(attrName, tag) {
    return /^(?:a|area|link|base)$/.test(tag) && attrName === 'href' || tag === 'img' && /^(?:src|longdesc|usemap)$/.test(attrName) || tag === 'object' && /^(?:classid|codebase|data|usemap)$/.test(attrName) || tag === 'q' && attrName === 'cite' || tag === 'blockquote' && attrName === 'cite' || (tag === 'ins' || tag === 'del') && attrName === 'cite' || tag === 'form' && attrName === 'action' || tag === 'input' && (attrName === 'src' || attrName === 'usemap') || tag === 'head' && attrName === 'profile' || tag === 'script' && (attrName === 'src' || attrName === 'for');
  }
  function isNumberTypeAttribute(attrName, tag) {
    return /^(?:a|area|object|button)$/.test(tag) && attrName === 'tabindex' || tag === 'input' && (attrName === 'maxlength' || attrName === 'tabindex') || tag === 'select' && (attrName === 'size' || attrName === 'tabindex') || tag === 'textarea' && /^(?:rows|cols|tabindex)$/.test(attrName) || tag === 'colgroup' && attrName === 'span' || tag === 'col' && attrName === 'span' || (tag === 'th' || tag === 'td') && (attrName === 'rowspan' || attrName === 'colspan');
  }
  function cleanAttributeValue(el, attr) {
    var tag = el.nodeName, attrName = attr.name, attrValue = attr.value || '';
    if (isEventAttribute(attrName)) {
      attrValue = trim(attrValue).replace(/^javascript:[\s\xa0]*/i, '').replace(/[\s\xa0]*;$/, '');
    } else if (attrName === 'class') {
      attrValue = collapseWhitespace(trim(attrValue));
    } else if (isUriTypeAttribute(attrName, tag) || isNumberTypeAttribute(attrName, tag)) {
      attrValue = trim(attrValue);
    } else if (attrName === 'style') {
      attrValue = trim(attrValue).replace(/[\s\xa0]*;[\s\xa0]*$/, '');
    }
    return attrValue;
  }
  function cleanConditionalComment(comment) {
    return comment.replace(/^(\[[^\]]+\]>)[\s\xa0]*/, '$1').replace(/[\s\xa0]*(<!\[endif\])$/, '$1');
  }
  function removeCDATASections(text) {
    return trim(text).replace(/^(?:[\s\xa0]*\/\*[\s\xa0]*<!\[CDATA\[[\s\xa0]*\*\/|[\s\xa0]*\/\/[\s\xa0]*<!\[CDATA\[.*)/, '').replace(/(?:\/\*[\s\xa0]*\]\]>[\s\xa0]*\*\/|\/\/[\s\xa0]*\]\]>)[\s\xa0]*$/, '');
  }
  function MinifyWriter() {
    var self = this;
    MinifyWriter.superclass.constructor.apply(self, arguments);
    self.inPre = 0;
  }
  util.extend(MinifyWriter, BasicWriter, {
    comment: function (text) {
      if (isConditionalComment(text)) {
        text = cleanConditionalComment(text);
        MinifyWriter.superclass.comment.call(this, text);
      }
    },
    openTag: function (el) {
      var self = this;
      if (el.tagName === 'pre') {
        self.inPre = 1;
      }
      MinifyWriter.superclass.openTag.apply(self, arguments);
    },
    closeTag: function (el) {
      var self = this;
      if (el.tagName === 'pre') {
        self.inPre = 0;
      }
      MinifyWriter.superclass.closeTag.apply(self, arguments);
    },
    cdata: function (cdata) {
      cdata = removeCDATASections(cdata);
      MinifyWriter.superclass.cdata.call(this, cdata);
    },
    attribute: function (attr, el) {
      var self = this, name = attr.name, normalizedValue, value = attr.value || '';
      if (canDeleteEmptyAttribute(el, attr) || isAttributeRedundant(el, attr)) {
        return;
      }
      if (isBooleanAttribute(name)) {
        self.append(' ', name);
        return;
      }
      normalizedValue = escapeAttrValue(cleanAttributeValue(el, attr));
      if (!(value && canRemoveAttributeQuotes(value))) {
        normalizedValue = '"' + normalizedValue + '"';
      }
      self.append(' ', name, '=', normalizedValue);
    },
    text: function (text) {
      var self = this;
      if (!self.inPre) {
        text = collapseWhitespace(text);
      }
      self.append(text);
    }
  });
  exports = MinifyWriter;
  return exports;
}();
htmlParserWriterFilter = function (exports) {
  var util = htmlParserUtil;
  function Filter() {
    this.tagNames = [];
    this.attributeNames = [];
    this.tags = [];
    this.comment = [];
    this.text = [];
    this.cdata = [];
    this.attributes = [];
    this.root = [];
  }
  function findIndexToInsert(arr, p) {
    for (var i = 0; arr && i < arr.length; i++) {
      if (arr[i].priority > p) {
        return i;
      }
    }
    return arr.length;
  }
  function filterName(arr, v) {
    for (var i = 0; arr && i < arr.length; i++) {
      var items = arr[i].value;
      util.each(items, function (item) {
        v = v.replace(item[0], item[1]);
      });
    }
    return v;
  }
  function filterFn(arr, args, el) {
    var item, i, ret;
    for (i = 0; arr && i < arr.length; i++) {
      item = arr[i].value;
      if ((ret = item.apply(null, args)) === false) {
        return false;
      }
      if (el && ret && ret !== el) {
        if (typeof ret === 'string') {
          if (el.toHtml() === ret) {
            return el;
          }
          el.nodeValue = ret;
          ret = el;
        }
        return this.onNode(ret);
      }
    }
    return el;
  }
  function filterAttr(arr, attrNode, el, _default) {
    for (var i = 0; arr && i < arr.length; i++) {
      var item = arr[i].value, ret, name = attrNode.name;
      if (item[name] && (ret = item[name].call(null, attrNode.value, el)) === false) {
        return ret;
      }
      if (typeof ret === 'string') {
        attrNode.value = ret;
      }
    }
    return _default;
  }
  Filter.prototype = {
    constructor: Filter,
    addRules: function (rules, priority) {
      priority = priority || 10;
      for (var r in rules) {
        var holder = this[r];
        if (holder) {
          var index = findIndexToInsert(holder, priority);
          holder.splice(index, 0, {
            value: rules[r],
            priority: priority
          });
        }
      }
    },
    onTagName: function (v) {
      return filterName(this.tagNames, v);
    },
    onAttributeName: function (v) {
      return filterName(this.attributeNames, v);
    },
    onText: function (el) {
      return filterFn.call(this, this.text, [
        el.toHtml(),
        el
      ], el);
    },
    onCData: function (el) {
      return filterFn.call(this, this.cdata, [
        el.toHtml(),
        el
      ], el);
    },
    onAttribute: function (attrNode, el) {
      return filterAttr(this.attributes, attrNode, el, attrNode);
    },
    onComment: function (el) {
      return filterFn.call(this, this.comment, [
        el.toHtml(),
        el
      ], el);
    },
    onNode: function (el) {
      var t = el.nodeType;
      if (t === 1) {
        return this.onTag(el);
      } else if (t === 3) {
        return this.onText(el);
      } else if (t === 8) {
        return this.onComment(el);
      }
    },
    onFragment: function (el) {
      return filterFn.call(this, this.root, [el], el);
    },
    onTag: function (el) {
      var filters = [
          '^',
          el.tagName,
          '$'
        ], tags = this.tags, ret;
      for (var i = 0; i < filters.length; i++) {
        var filter = filters[i];
        for (var j = 0; j < tags.length; j++) {
          var element = tags[j].value;
          if (element[filter]) {
            if ((ret = element[filter](el)) === false) {
              return false;
            }
            if (ret && ret !== el) {
              return this.onNode(ret);
            }
            if (!el.tagName) {
              return el;
            }
          }
        }
      }
      return el;
    }
  };
  exports = Filter;
  return exports;
}();
htmlParserDtd = function (exports) {
  var util = htmlParserUtil;
  var merge = util.merge, A = {
      isindex: 1,
      fieldset: 1
    }, B = {
      input: 1,
      button: 1,
      select: 1,
      textarea: 1,
      label: 1
    }, C = merge({ a: 1 }, B), D = merge({ iframe: 1 }, C), E = {
      hr: 1,
      ul: 1,
      menu: 1,
      div: 1,
      blockquote: 1,
      noscript: 1,
      table: 1,
      center: 1,
      address: 1,
      dir: 1,
      pre: 1,
      h5: 1,
      dl: 1,
      h4: 1,
      noframes: 1,
      h6: 1,
      ol: 1,
      h1: 1,
      h3: 1,
      h2: 1
    }, F = {
      ins: 1,
      del: 1,
      script: 1,
      style: 1
    }, G = merge({
      b: 1,
      acronym: 1,
      bdo: 1,
      'var': 1,
      '#text': 1,
      abbr: 1,
      code: 1,
      br: 1,
      i: 1,
      cite: 1,
      kbd: 1,
      u: 1,
      strike: 1,
      s: 1,
      tt: 1,
      strong: 1,
      q: 1,
      samp: 1,
      em: 1,
      dfn: 1,
      span: 1
    }, F), H = merge({
      sub: 1,
      img: 1,
      object: 1,
      sup: 1,
      basefont: 1,
      map: 1,
      applet: 1,
      font: 1,
      big: 1,
      small: 1
    }, G), I = merge({ p: 1 }, H), J = merge({ iframe: 1 }, H, B), K = {
      img: 1,
      noscript: 1,
      br: 1,
      kbd: 1,
      center: 1,
      button: 1,
      basefont: 1,
      h5: 1,
      h4: 1,
      samp: 1,
      h6: 1,
      ol: 1,
      h1: 1,
      h3: 1,
      h2: 1,
      form: 1,
      font: 1,
      '#text': 1,
      select: 1,
      menu: 1,
      ins: 1,
      abbr: 1,
      label: 1,
      code: 1,
      table: 1,
      script: 1,
      cite: 1,
      input: 1,
      iframe: 1,
      strong: 1,
      textarea: 1,
      noframes: 1,
      big: 1,
      small: 1,
      span: 1,
      hr: 1,
      sub: 1,
      bdo: 1,
      'var': 1,
      div: 1,
      object: 1,
      sup: 1,
      strike: 1,
      dir: 1,
      map: 1,
      dl: 1,
      applet: 1,
      del: 1,
      isindex: 1,
      fieldset: 1,
      ul: 1,
      b: 1,
      acronym: 1,
      a: 1,
      blockquote: 1,
      i: 1,
      u: 1,
      s: 1,
      tt: 1,
      address: 1,
      q: 1,
      pre: 1,
      p: 1,
      em: 1,
      dfn: 1
    }, L = merge({ a: 1 }, J), M = { tr: 1 }, N = { '#text': 1 }, O = merge({ param: 1 }, K), P = merge({ form: 1 }, A, D, E, I), Q = { li: 1 }, R = {
      style: 1,
      script: 1
    }, headTags = {
      base: 1,
      link: 1,
      meta: 1,
      title: 1
    }, T = merge(headTags, R), U = {
      head: 1,
      body: 1
    }, V = { html: 1 };
  var block = {
    address: 1,
    blockquote: 1,
    center: 1,
    dir: 1,
    div: 1,
    dl: 1,
    fieldset: 1,
    form: 1,
    h1: 1,
    h2: 1,
    h3: 1,
    h4: 1,
    h5: 1,
    h6: 1,
    hr: 1,
    isindex: 1,
    menu: 1,
    noframes: 1,
    ol: 1,
    p: 1,
    pre: 1,
    table: 1,
    ul: 1
  };
  var dtd = exports = {
    $nonBodyContent: merge(V, U, headTags),
    $block: block,
    $blockLimit: {
      body: 1,
      div: 1,
      td: 1,
      th: 1,
      caption: 1,
      form: 1
    },
    $inline: L,
    $body: merge({
      script: 1,
      style: 1
    }, block),
    $cdata: {
      script: 1,
      style: 1
    },
    $empty: {
      area: 1,
      base: 1,
      br: 1,
      col: 1,
      hr: 1,
      img: 1,
      input: 1,
      link: 1,
      meta: 1,
      param: 1
    },
    $listItem: {
      dd: 1,
      dt: 1,
      li: 1
    },
    $list: {
      ul: 1,
      ol: 1,
      dl: 1
    },
    $nonEditable: {
      applet: 1,
      button: 1,
      embed: 1,
      iframe: 1,
      map: 1,
      object: 1,
      option: 1,
      script: 1,
      textarea: 1,
      param: 1
    },
    $removeEmpty: {
      abbr: 1,
      acronym: 1,
      address: 1,
      b: 1,
      bdo: 1,
      big: 1,
      cite: 1,
      code: 1,
      del: 1,
      dfn: 1,
      em: 1,
      font: 1,
      i: 1,
      ins: 1,
      label: 1,
      kbd: 1,
      q: 1,
      s: 1,
      samp: 1,
      small: 1,
      span: 1,
      strike: 1,
      strong: 1,
      sub: 1,
      sup: 1,
      tt: 1,
      u: 1,
      'var': 1
    },
    $tabIndex: {
      a: 1,
      area: 1,
      button: 1,
      input: 1,
      object: 1,
      select: 1,
      textarea: 1
    },
    $tableContent: {
      caption: 1,
      col: 1,
      colgroup: 1,
      tbody: 1,
      td: 1,
      tfoot: 1,
      th: 1,
      thead: 1,
      tr: 1
    },
    html: U,
    head: T,
    style: N,
    body: P,
    base: {},
    link: {},
    meta: {},
    title: N,
    col: {},
    tr: {
      td: 1,
      th: 1
    },
    img: {},
    colgroup: { col: 1 },
    noscript: P,
    td: P,
    br: {},
    th: P,
    center: P,
    kbd: L,
    button: merge(I, E),
    basefont: {},
    h5: L,
    h4: L,
    samp: L,
    h6: L,
    ol: Q,
    h1: L,
    h3: L,
    option: N,
    h2: L,
    form: merge(A, D, E, I),
    select: {
      optgroup: 1,
      option: 1
    },
    font: L,
    ins: L,
    menu: Q,
    abbr: L,
    label: L,
    table: {
      thead: 1,
      col: 1,
      tbody: 1,
      tr: 1,
      colgroup: 1,
      caption: 1,
      tfoot: 1
    },
    code: L,
    script: N,
    tfoot: M,
    cite: L,
    li: P,
    input: {},
    iframe: P,
    strong: L,
    textarea: N,
    noframes: P,
    big: L,
    small: L,
    span: L,
    hr: {},
    dt: L,
    sub: L,
    optgroup: { option: 1 },
    param: {},
    bdo: L,
    'var': L,
    div: P,
    object: O,
    sup: L,
    dd: P,
    strike: L,
    area: {},
    dir: Q,
    map: merge({
      area: 1,
      form: 1,
      p: 1
    }, A, F, E),
    applet: O,
    dl: {
      dt: 1,
      dd: 1
    },
    del: L,
    isindex: {},
    fieldset: merge({ legend: 1 }, K),
    thead: M,
    ul: Q,
    acronym: L,
    b: L,
    a: J,
    blockquote: P,
    caption: L,
    i: L,
    u: L,
    tbody: M,
    s: L,
    address: merge(D, I),
    tt: L,
    legend: L,
    q: L,
    pre: merge(G, C),
    p: L,
    em: L,
    dfn: L
  };
  var i, html5Tags = [
      'article',
      'figure',
      'nav',
      'aside',
      'section',
      'footer'
    ];
  for (var p in dtd) {
    for (var p2 in dtd[p]) {
      if (p2 === 'div') {
        for (i = 0; i < html5Tags.length; i++) {
          dtd[p][html5Tags[i]] = dtd[p][p2];
        }
      }
    }
  }
  for (i = 0; i < html5Tags.length; i++) {
    dtd[html5Tags[i]] = dtd.div;
  }
  return exports;
}();
htmlParserLexerPage = function (exports) {
  var Index = htmlParserLexerIndex;
  function Page(source) {
    this.source = source;
    this.lineIndex = new Index();
  }
  Page.prototype = {
    constructor: Page,
    getChar: function (cursor) {
      var source = this.source;
      var i = cursor.position;
      if (i >= source.length) {
        return -1;
      }
      var ret = source.charAt(i);
      cursor.advance();
      if ('\r' === ret) {
        ret = '\n';
        i = cursor.position;
        var next = source.charAt(i);
        if (next === '\n') {
          cursor.advance();
        }
      }
      if ('\n' === ret) {
        this.lineIndex.add(cursor);
      }
      return ret;
    },
    ungetChar: function (cursor) {
      var source = this.source;
      cursor.retreat();
      var i = cursor.position, ch = source.charAt(i);
      if (ch === '\n' && 0 !== i) {
        ch = source.charAt(i - 1);
        if ('\r' === ch) {
          cursor.retreat();
        }
      }
    },
    getText: function (start, end) {
      return this.source.slice(start, end);
    },
    row: function (cursor) {
      return this.lineIndex.row(cursor);
    },
    col: function (cursor) {
      return this.lineIndex.col(cursor);
    }
  };
  exports = Page;
  return exports;
}();
htmlParserNodesText = function (exports) {
  var Node = htmlParserNodesNode;
  var util = htmlParserUtil;
  function Text(v) {
    if (typeof v === 'string') {
      this.nodeValue = v;
      Text.superclass.constructor.apply(this, [
        null,
        -1,
        -1
      ]);
    } else {
      Text.superclass.constructor.apply(this, arguments);
      this.nodeValue = this.toHtml();
    }
    this.nodeType = 3;
    this.nodeName = '#text';
  }
  util.extend(Text, Node, {
    writeHtml: function (writer, filter) {
      var ret;
      if (!filter || (ret = filter.onText(this)) !== false) {
        if (ret) {
          if (this !== ret) {
            ret.writeHtml(writer, filter);
            return;
          }
        }
        writer.text(this.toHtml());
      }
    },
    toHtml: function () {
      if (this.nodeValue) {
        return this.nodeValue;
      } else {
        return Text.superclass.toHtml.apply(this, arguments);
      }
    }
  });
  exports = Text;
  return exports;
}();
htmlParserNodesCdata = function (exports) {
  var Text = htmlParserNodesText;
  var util = htmlParserUtil;
  function CData() {
    CData.superclass.constructor.apply(this, arguments);
    this.nodeType = 4;
    this.nodeName = '#cdata';
  }
  util.extend(CData, Text, {
    writeHtml: function (writer, filter) {
      var ret;
      if (!filter || (ret = filter.onCData(this)) !== false) {
        if (ret) {
          if (this !== ret) {
            ret.writeHtml(writer, filter);
            return;
          }
        }
        writer.cdata(this.toHtml());
      }
    }
  });
  exports = CData;
  return exports;
}();
htmlParserNodesTag = function (exports) {
  var Node = htmlParserNodesNode;
  var Attribute = htmlParserNodesAttribute;
  var Dtd = htmlParserDtd;
  var util = htmlParserUtil;
  var base = htmlParserBase;
  function createTag(self, tagName, attrs) {
    self.nodeName = self.tagName = tagName.toLowerCase();
    self._updateSelfClosed();
    util.each(attrs, function (v, n) {
      self.setAttribute(n, v);
    });
  }
  function Tag(page, startPosition, endPosition, attributes) {
    var self = this;
    self.childNodes = [];
    self.firstChild = null;
    self.lastChild = null;
    self.attributes = attributes || [];
    self.nodeType = 1;
    if (typeof page === 'string') {
      createTag.apply(null, [self].concat([].slice.call(arguments, 0)));
    } else {
      Tag.superclass.constructor.apply(self, arguments);
      attributes = self.attributes;
      if (attributes[0]) {
        self.nodeName = attributes[0].name.toLowerCase();
        self.tagName = self.nodeName.replace(/\//, '');
        self._updateSelfClosed();
        attributes.splice(0, 1);
      }
      var lastAttr = attributes[attributes.length - 1], lastSlash = !!(lastAttr && /\/$/.test(lastAttr.name));
      if (lastSlash) {
        attributes.length = attributes.length - 1;
      }
      self.isSelfClosed = self.isSelfClosed || lastSlash;
      self.closed = self.isSelfClosed;
    }
    self.closedStartPosition = -1;
    self.closedEndPosition = -1;
  }
  function refreshChildNodes(self) {
    var c = self.childNodes;
    self.firstChild = c[0];
    self.lastChild = c[c.length - 1];
    if (c.length >= 1) {
      c[0].nextSibling = c[0].nextSibling = null;
      c[0].parentNode = self;
    }
    if (c.length > 1) {
      for (var i = 0; i < c.length - 1; i++) {
        c[i].nextSibling = c[i + 1];
        c[i + 1].previousSibling = c[i];
        c[i + 1].parentNode = self;
      }
      c[c.length - 1].nextSibling = null;
    }
  }
  util.extend(Tag, Node, {
    _updateSelfClosed: function () {
      var self = this;
      self.isSelfClosed = !!Dtd.$empty[self.nodeName];
      if (!self.isSelfClosed) {
        self.isSelfClosed = /\/$/.test(self.nodeName);
      }
      self.closed = self.isSelfClosed;
    },
    clone: function () {
      var ret = new Tag(), attrs = [];
      util.each(this.attributes, function (a) {
        attrs.push(a.clone());
      });
      util.mix(ret, {
        childNodes: [],
        firstChild: null,
        lastChild: null,
        attributes: attrs,
        nodeType: this.nodeType,
        nodeName: this.nodeName,
        tagName: this.tagName,
        isSelfClosed: this.isSelfClosed,
        closed: this.closed,
        closedStartPosition: this.closedStartPosition,
        closedEndPosition: this.closedEndPosition
      });
      return ret;
    },
    setTagName: function (v) {
      var self = this;
      self.nodeName = self.tagName = v;
      if (v) {
        self._updateSelfClosed();
      }
    },
    equals: function (tag) {
      if (!tag || this.nodeName !== tag.nodeName) {
        return 0;
      }
      if (this.nodeType !== tag.nodeType) {
        return 0;
      }
      if (this.attributes.length !== tag.attributes.length) {
        return 0;
      }
      for (var i = 0; i < this.attributes.length; i++) {
        if (!this.attributes[i].equals(tag.attributes[i])) {
          return 0;
        }
      }
      return 1;
    },
    isEndTag: function () {
      return /^\//.test(this.nodeName);
    },
    appendChild: function (node) {
      this.childNodes.push(node);
      refreshChildNodes(this);
    },
    replace: function (ref) {
      var sibling = ref.parentNode.childNodes, index = util.indexOf(ref, sibling);
      sibling[index] = this;
      refreshChildNodes(ref.parentNode);
    },
    replaceChild: function (newC, refC) {
      var self = this, childNodes = self.childNodes;
      var index = util.indexOf(refC, childNodes);
      childNodes[index] = newC;
      refreshChildNodes(self);
    },
    prepend: function (node) {
      this.childNodes.unshift(node);
      refreshChildNodes(this);
    },
    insertBefore: function (ref) {
      var sibling = ref.parentNode.childNodes, index = util.indexOf(ref, sibling);
      sibling.splice(index, 0, this);
      refreshChildNodes(ref.parentNode);
    },
    insertAfter: function (ref) {
      var sibling = ref.parentNode.childNodes, index = util.indexOf(ref, sibling);
      if (index === sibling.length - 1) {
        ref.parentNode.appendChild(this);
      } else {
        this.insertBefore(ref.parentNode.childNodes[[index + 1]]);
      }
    },
    empty: function () {
      this.childNodes = [];
      refreshChildNodes(this);
    },
    removeChild: function (node) {
      var sibling = node.parentNode.childNodes, index = util.indexOf(node, sibling);
      sibling.splice(index, 1);
      refreshChildNodes(node.parentNode);
    },
    getAttribute: function (name) {
      var attr = findAttributeByName(this.attributes, name);
      return attr && attr.value;
    },
    setAttribute: function (name, value) {
      var attr = findAttributeByName(this.attributes, name);
      if (attr) {
        attr.value = value;
      } else {
        this.attributes.push(new Attribute(name, '=', value, '"'));
      }
    },
    removeAttribute: function (name) {
      var attr = findAttributeByName(this.attributes, name);
      if (attr) {
        var index = util.indexOf(attr, this.attributes);
        this.attributes.splice(index, 1);
      }
    },
    filterChildren: function () {
      var self = this;
      if (!self.isChildrenFiltered) {
        var writer = new base.BasicWriter();
        self._writeChildrenHTML(writer);
        var parser = new base.Parser(writer.getHtml()), children = parser.parse().childNodes;
        self.empty();
        util.each(children, function (c) {
          self.appendChild(c);
        });
        self.isChildrenFiltered = 1;
      }
    },
    writeHtml: function (writer, filter) {
      var self = this, tmp, attrName, tagName = self.tagName;
      if (tagName === '!doctype') {
        writer.append(this.toHtml() + '\n');
        return;
      }
      self.__filter = filter;
      self.isChildrenFiltered = 0;
      if (filter) {
        if (!(tagName = filter.onTagName(tagName))) {
          return;
        }
        self.tagName = tagName;
        tmp = filter.onTag(self);
        if (tmp === false) {
          return;
        }
        if (tmp) {
          self = tmp;
        }
        if (self.nodeType !== 1) {
          self.writeHtml(writer, filter);
          return;
        }
        if (!self.tagName) {
          self._writeChildrenHTML(writer);
          return;
        }
      }
      writer.openTag(self);
      var attributes = self.attributes;
      for (var i = 0; i < attributes.length; i++) {
        var attr = attributes[i];
        attrName = attr.name;
        if (filter) {
          if (!(attrName = filter.onAttributeName(attrName, self))) {
            continue;
          }
          attr.name = attrName;
          if (filter.onAttribute(attr, self) === false) {
            continue;
          }
        }
        writer.attribute(attr, self);
      }
      writer.openTagClose(self);
      if (!self.isSelfClosed) {
        self._writeChildrenHTML(writer);
        writer.closeTag(self);
      }
    },
    _writeChildrenHTML: function (writer) {
      var self = this, filter = self.isChildrenFiltered ? 0 : self.__filter;
      util.each(self.childNodes, function (child) {
        child.writeHtml(writer, filter);
      });
    },
    outerHtml: function () {
      var writer = new base.BasicWriter();
      this.writeHtml(writer);
      return writer.getHtml();
    }
  });
  function findAttributeByName(attributes, name) {
    if (attributes && attributes.length) {
      for (var i = 0; i < attributes.length; i++) {
        if (attributes[i].name === name) {
          return attributes[i];
        }
      }
    }
    return null;
  }
  exports = Tag;
  return exports;
}();
htmlParserNodesComment = function (exports) {
  var Text = htmlParserNodesText;
  var util = htmlParserUtil;
  function Comment() {
    Comment.superclass.constructor.apply(this, arguments);
    this.nodeType = 8;
    this.nodeName = '#comment';
  }
  util.extend(Comment, Text, {
    writeHtml: function (writer, filter) {
      var ret;
      if (!filter || (ret = filter.onComment(this)) !== false) {
        if (ret) {
          if (this !== ret) {
            ret.writeHtml(writer, filter);
            return;
          }
        }
        writer.comment(this.toHtml());
      }
    },
    toHtml: function () {
      if (this.nodeValue) {
        return this.nodeValue;
      } else {
        var value = Text.superclass.toHtml.apply(this, arguments);
        return value.substring(4, value.length - 3);
      }
    }
  });
  exports = Comment;
  return exports;
}();
htmlParserNodesFragment = function (exports) {
  var Tag = htmlParserNodesTag;
  var util = htmlParserUtil;
  function Fragment() {
    this.childNodes = [];
    this.nodeType = 9;
    this.nodeName = '#fragment';
  }
  util.extend(Fragment, Tag, {
    writeHtml: function (writer, filter) {
      this.__filter = filter;
      this.isChildrenFiltered = 0;
      if (filter) {
        filter.onFragment(this);
      }
      this._writeChildrenHTML(writer);
    }
  });
  exports = Fragment;
  return exports;
}();
htmlParserNodesDocument = function (exports) {
  var Tag = htmlParserNodesTag;
  var util = htmlParserUtil;
  function Document() {
    this.childNodes = [];
    this.nodeType = 9;
    this.nodeName = '#document';
  }
  util.extend(Document, Tag, {
    writeHtml: function (writer, filter) {
      this.__filter = filter;
      this._writeChildrenHTML(writer);
    }
  });
  exports = Document;
  return exports;
}();
htmlParserScannersTagScanner = function (exports) {
  var dtd = htmlParserDtd;
  var Tag = htmlParserNodesTag;
  var SpecialScanners = htmlParserScannersSpecialScanners;
  var util = htmlParserUtil;
  var wrapper = {
    li: 'ul',
    dt: 'dl',
    dd: 'dl'
  };
  var impliedEndTag = {
    dd: { dl: 1 },
    dt: { dl: 1 },
    li: {
      ul: 1,
      ol: 1
    },
    option: { select: 1 },
    optgroup: { select: 1 }
  };
  function fixCloseTagByDtd(tag, opts) {
    tag.closed = 1;
    if (!opts.fixByDtd) {
      return 0;
    }
    var valid = 1, childNodes = [].concat(tag.childNodes);
    util.each(childNodes, function (c) {
      if (!canHasNodeAsChild(tag, c)) {
        valid = 0;
        return false;
      }
    });
    if (valid) {
      return 0;
    }
    var holder = tag.clone(), prev = tag, recursives = [];
    function closeCurrentHolder() {
      if (holder.childNodes.length) {
        holder.insertAfter(prev);
        prev = holder;
        holder = tag.clone();
      }
    }
    for (var i = 0; i < childNodes.length; i++) {
      var c = childNodes[i];
      if (canHasNodeAsChild(holder, c)) {
        holder.appendChild(c);
      } else {
        if (c.nodeType !== 1) {
          continue;
        }
        var currentChildName = c.tagName;
        if (dtd.$listItem[currentChildName]) {
          closeCurrentHolder();
          var pTagName = wrapper[c.tagName], pTag = new Tag();
          pTag.nodeName = pTag.tagName = pTagName;
          while (i < childNodes.length) {
            if (childNodes[i].tagName === currentChildName) {
              pTag.appendChild(childNodes[i]);
            } else if (childNodes[i].nodeType === 3 && util.trim(childNodes[i].toHtml())) {
              break;
            }
            i++;
          }
          pTag.insertAfter(prev);
          prev = pTag;
          i--;
          continue;
        }
        closeCurrentHolder();
        if (!c.equals(holder)) {
          if (canHasNodeAsChild(c, holder)) {
            holder = tag.clone();
            util.each(c.childNodes, function (cc) {
              holder.appendChild(cc);
            });
            c.empty();
            c.insertAfter(prev);
            prev = c;
            c.appendChild(holder);
            recursives.push(holder);
            holder = tag.clone();
          } else {
            c.insertAfter(prev);
            prev = c;
          }
        } else {
          c.insertAfter(prev);
          prev = c;
        }
      }
    }
    if (holder.childNodes.length) {
      holder.insertAfter(prev);
    }
    tag.parentNode.removeChild(tag);
    util.each(recursives, function (r) {
      fixCloseTagByDtd(r, opts);
    });
    return 1;
  }
  function canHasNodeAsChild(tag, node) {
    if (tag.nodeType === 9) {
      return 1;
    }
    if (!dtd[tag.tagName]) {
      throw new Error('dtd[' + tag.tagName + '] === undefined!');
    }
    if (node.nodeType === 8) {
      return 1;
    }
    var nodeName = node.tagName || node.nodeName;
    return !!dtd[tag.tagName][nodeName];
  }
  exports = {
    scan: function (tag, lexer, opts) {
      function closeStackOpenTag(end, from) {
        for (i = end; i > from; i--) {
          var currentStackItem = stack[i], preStackItem = stack[i - 1];
          preStackItem.appendChild(currentStackItem);
          fixCloseTagByDtd(currentStackItem, opts);
        }
        tag = stack[from];
        stack.length = from;
      }
      function processImpliedEndTag(node) {
        var needFix = 0, endParentTagName;
        if (endParentTagName = impliedEndTag[node.tagName]) {
          var from = stack.length - 1, parent = stack[from];
          while (parent && !(parent.tagName in endParentTagName)) {
            if (parent.tagName === node.tagName) {
              needFix = 1;
              break;
            }
            from--;
            parent = stack[from];
          }
          if (needFix) {
            closeStackOpenTag(stack.length - 1, from - 1);
          }
        }
        return needFix;
      }
      var node, i, stack;
      stack = opts.stack = opts.stack || [];
      do {
        node = lexer.nextNode();
        if (node) {
          if (node.nodeType === 1) {
            if (node.isEndTag() && node.tagName === tag.tagName) {
              node = null;
            } else if (!node.isEndTag()) {
              if (SpecialScanners[node.tagName]) {
                SpecialScanners[node.tagName].scan(node, lexer, opts);
                tag.appendChild(node);
              } else {
                if (node.isSelfClosed) {
                  tag.appendChild(node);
                } else {
                  stack.push(tag);
                  if (processImpliedEndTag(node)) {
                    stack.push(tag);
                  }
                  tag = node;
                }
              }
            } else if (node.isEndTag()) {
              var index = -1;
              for (i = stack.length - 1; i >= 0; i--) {
                var c = stack[i];
                if (c.tagName === node.tagName) {
                  index = i;
                  break;
                }
              }
              if (index !== -1) {
                stack[stack.length - 1].appendChild(tag);
                fixCloseTagByDtd(tag, opts);
                closeStackOpenTag(stack.length - 1, index);
                node = null;
              }
            }
          } else {
            tag.appendChild(node);
          }
        }
        if (node === null) {
          if (stack.length > 0) {
            node = stack[stack.length - 1];
            if (!SpecialScanners[node.tagName]) {
              stack.length = stack.length - 1;
              node.appendChild(tag);
              fixCloseTagByDtd(tag, opts);
              tag = node;
            } else {
              node = null;
            }
          }
        }
      } while (node);
      fixCloseTagByDtd(tag, opts);
    }
  };
  return exports;
}();
htmlParserScannersQuoteCdataScanner = function (exports) {
  var CDataScanner = htmlParserScannersCdataScanner;
  var Dtd = htmlParserDtd;
  var SpecialScanners = htmlParserScannersSpecialScanners;
  var scanObj = exports = {
    scan: function (tag, lexer, opts) {
      opts = opts || {};
      opts.quoteSmart = 1;
      CDataScanner.scan(tag, lexer, opts);
      opts.quoteSmart = 0;
    }
  };
  for (var t in Dtd.$cdata) {
    SpecialScanners[t] = scanObj;
  }
  return exports;
}();
htmlParserWriterBeautify = function (exports) {
  var BasicWriter = htmlParserWriterBasic;
  var dtd = htmlParserDtd;
  var util = htmlParserUtil;
  function BeautifyWriter() {
    var self = this;
    BeautifyWriter.superclass.constructor.apply(self, arguments);
    self.inPre = 0;
    self.indentChar = '\t';
    self.indentLevel = 0;
    self.allowIndent = 0;
    self.rules = {};
    var beauty = util.merge(dtd.$nonBodyContent, dtd.$block, dtd.$listItem, dtd.$tableContent, {
      select: 1,
      script: 1,
      style: 1
    });
    for (var e in beauty) {
      self.setRules(e, {
        allowIndent: 1,
        breakBeforeOpen: 1,
        breakAfterOpen: 1,
        breakBeforeClose: 1,
        breakAfterClose: 1
      });
    }
    util.each([
      'p',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6'
    ], function (e) {
      self.setRules(e, {
        allowIndent: 0,
        breakAfterOpen: 0,
        breakBeforeClose: 0
      });
    });
    self.setRules('option', { breakBeforeOpen: 1 });
    self.setRules('optiongroup', { breakBeforeOpen: 1 });
    self.setRules('br', { breakAfterOpen: 1 });
    self.setRules('title', {
      allowIndent: 0,
      breakBeforeClose: 0,
      breakAfterOpen: 0
    });
    self.setRules('pre', {
      breakAfterOpen: 1,
      allowIndent: 0
    });
  }
  util.extend(BeautifyWriter, BasicWriter, {
    indentation: function () {
      if (!this.inPre) {
        this.append(new Array(this.indentLevel + 1).join(this.indentChar));
      }
      this.allowIndent = 0;
    },
    lineBreak: function () {
      var o = this.output;
      if (!this.inPre && o.length) {
        for (var j = o.length - 1; j >= 0; j--) {
          if (!/[\r\n\t ]/.test(o[j])) {
            break;
          }
        }
        o.length = j + 1;
        this.append('\n');
      }
      this.allowIndent = 1;
    },
    setRules: function (tagName, rule) {
      if (!this.rules[tagName]) {
        this.rules[tagName] = {};
      }
      util.mix(this.rules[tagName], rule);
    },
    openTag: function (el) {
      var tagName = el.tagName, rules = this.rules[tagName] || {};
      if (this.allowIndent) {
        this.indentation();
      } else if (rules.breakBeforeOpen) {
        this.lineBreak();
        this.indentation();
      }
      BeautifyWriter.superclass.openTag.apply(this, arguments);
    },
    openTagClose: function (el) {
      var tagName = el.tagName;
      var rules = this.rules[tagName] || {};
      if (el.isSelfClosed) {
        this.append(' />');
      } else {
        this.append('>');
        if (rules.allowIndent) {
          this.indentLevel++;
        }
      }
      if (rules.breakAfterOpen) {
        this.lineBreak();
      }
      if (tagName === 'pre') {
        this.inPre = 1;
      }
    },
    closeTag: function (el) {
      var self = this, tagName = el.tagName, rules = self.rules[tagName] || {};
      if (rules.allowIndent) {
        self.indentLevel--;
      }
      if (self.allowIndent) {
        self.indentation();
      } else if (rules.breakBeforeClose) {
        self.lineBreak();
        self.indentation();
      }
      BeautifyWriter.superclass.closeTag.apply(self, arguments);
      if (tagName === 'pre') {
        self.inPre = 0;
      }
      if (rules.breakAfterClose) {
        self.lineBreak();
      }
    },
    text: function (text) {
      if (this.allowIndent) {
        this.indentation();
      }
      if (!this.inPre) {
        text = util.collapseWhitespace(text);
      }
      this.append(text);
    },
    comment: function (comment) {
      if (this.allowIndent) {
        this.indentation();
      }
      this.append('<!--' + comment + '-->');
    },
    cdata: function (text) {
      if (this.allowIndent) {
        this.indentation();
      }
      this.append(util.trim(text));
    }
  });
  exports = BeautifyWriter;
  return exports;
}();
htmlParserLexerLexer = function (exports) {
  var Cursor = htmlParserLexerCursor;
  var NEGATIVE_1 = 0 - 1;
  var Page = htmlParserLexerPage;
  var TextNode = htmlParserNodesText;
  var CData = htmlParserNodesCdata;
  var util = htmlParserUtil;
  var Attribute = htmlParserNodesAttribute;
  var TagNode = htmlParserNodesTag;
  var CommentNode = htmlParserNodesComment;
  function Lexer(text, cfg) {
    var self = this;
    self.page = new Page(text);
    self.cursor = new Cursor();
    self.nodeFactory = this;
    this.cfg = cfg || {};
  }
  Lexer.prototype = {
    constructor: Lexer,
    setPosition: function (p) {
      this.cursor.position = p;
    },
    getPosition: function () {
      return this.cursor.position;
    },
    nextNode: function (quoteSmart) {
      var self = this, start, ch, ret, cursor = self.cursor, page = self.page;
      start = cursor.position;
      ch = page.getChar(cursor);
      switch (ch) {
      case -1:
        ret = null;
        break;
      case '<':
        ch = page.getChar(cursor);
        if (ch === -1) {
          ret = self.makeString(start, cursor.position);
        } else if (ch === '/' || util.isLetter(ch)) {
          page.ungetChar(cursor);
          ret = self.parseTag(start);
        } else if ('!' === ch || '?' === ch) {
          ch = page.getChar(cursor);
          if (ch === -1) {
            ret = self.makeString(start, cursor.position);
          } else {
            if ('>' === ch) {
              ret = self.makeComment(start, cursor.position);
            } else {
              page.ungetChar(cursor);
              if ('-' === ch) {
                ret = self.parseComment(start, quoteSmart);
              } else {
                page.ungetChar(cursor);
                ret = self.parseTag(start);
              }
            }
          }
        } else {
          page.ungetChar(cursor);
          ret = self.parseString(start, quoteSmart);
        }
        break;
      default:
        page.ungetChar(cursor);
        ret = self.parseString(start, quoteSmart);
        break;
      }
      return ret;
    },
    makeComment: function (start, end) {
      var length, ret;
      length = end - start;
      if (0 !== length) {
        if (2 > length) {
          return this.makeString(start, end);
        }
        ret = this.nodeFactory.createCommentNode(this.page, start, end);
      } else {
        ret = null;
      }
      return ret;
    },
    makeString: function (start, end) {
      var ret = null, l;
      l = end - start;
      if (l > 0) {
        ret = this.nodeFactory.createStringNode(this.page, start, end);
      }
      return ret;
    },
    makeCData: function (start, end) {
      var ret = null, l;
      l = end - start;
      if (l > 0) {
        ret = this.nodeFactory.createCDataNode(this.page, start, end);
      }
      return ret;
    },
    makeTag: function (start, end, attributes) {
      var length, ret;
      length = end - start;
      if (0 !== length) {
        if (2 > length) {
          return this.makeString(start, end);
        }
        ret = this.nodeFactory.createTagNode(this.page, start, end, attributes);
      } else {
        ret = null;
      }
      return ret;
    },
    createTagNode: function (page, start, end, attributes) {
      return new TagNode(page, start, end, attributes);
    },
    createStringNode: function (page, start, end) {
      return new TextNode(page, start, end);
    },
    createCDataNode: function (page, start, end) {
      return new CData(page, start, end);
    },
    createCommentNode: function (page, start, end) {
      return new CommentNode(page, start, end);
    },
    parseTag: function (start) {
      function checkError() {
        if (strict && ch === -1 && attributes.length) {
          throw new Error(attributes[0].name + ' syntax error at row ' + (page.row(cursor) + 1) + ' , col ' + (page.col(cursor) + 1));
        }
      }
      var done, bookmarks = [], attributes = [], ch, cfg = this.cfg, strict = cfg.strict, page = this.page, state = 0, cursor = this.cursor;
      bookmarks[0] = cursor.position;
      while (!done) {
        bookmarks[state + 1] = cursor.position;
        ch = page.getChar(cursor);
        switch (state) {
        case 0:
          if (ch === -1 || '>' === ch || '<' === ch) {
            if ('<' === ch) {
              page.ungetChar(cursor);
              bookmarks[state + 1] = cursor.position;
            }
            done = true;
          } else {
            if (!attributes.length) {
              if (ch === '/' || util.isValidAttributeNameStartChar(ch)) {
                state = 1;
              }
            } else if (ch === '/' || util.isValidAttributeNameStartChar(ch)) {
              state = 1;
            }
          }
          break;
        case 1:
          if (NEGATIVE_1 === ch || '>' === ch || '<' === ch) {
            if ('<' === ch) {
              page.ungetChar(cursor);
              bookmarks[state + 1] = cursor.getPosition;
            }
            this.standalone(attributes, bookmarks);
            done = true;
          } else if (util.isWhitespace(ch)) {
            bookmarks[6] = bookmarks[2];
            state = 6;
          } else if ('=' === ch) {
            state = 2;
          }
          break;
        case 2:
          if (NEGATIVE_1 === ch || '>' === ch) {
            this.standalone(attributes, bookmarks);
            done = true;
          } else if ('\'' === ch) {
            state = 4;
            bookmarks[4] = bookmarks[3];
          } else if ('"' === ch) {
            state = 5;
            bookmarks[5] = bookmarks[3];
          } else if (!util.isWhitespace(ch)) {
            state = 3;
          }
          break;
        case 3:
          if (NEGATIVE_1 === ch || '>' === ch) {
            this.naked(attributes, bookmarks);
            done = true;
          } else if (util.isWhitespace(ch)) {
            this.naked(attributes, bookmarks);
            bookmarks[0] = bookmarks[4];
            state = 0;
          }
          break;
        case 4:
          if (NEGATIVE_1 === ch) {
            this.singleQuote(attributes, bookmarks);
            done = true;
          } else if ('\'' === ch) {
            this.singleQuote(attributes, bookmarks);
            bookmarks[0] = bookmarks[5] + 1;
            state = 0;
          }
          break;
        case 5:
          if (NEGATIVE_1 === ch) {
            this.doubleQuote(attributes, bookmarks);
            done = true;
          } else if ('"' === ch) {
            this.doubleQuote(attributes, bookmarks);
            bookmarks[0] = bookmarks[6] + 1;
            state = 0;
          }
          break;
        case 6:
          if (NEGATIVE_1 === ch) {
            this.standalone(attributes, bookmarks);
            bookmarks[0] = bookmarks[6];
            page.ungetChar(cursor);
            state = 0;
          } else if ('=' === ch) {
            bookmarks[2] = bookmarks[6];
            bookmarks[3] = bookmarks[7];
            state = 2;
          } else if (!util.isWhitespace(ch)) {
            this.standalone(attributes, bookmarks);
            bookmarks[0] = bookmarks[6];
            page.ungetChar(cursor);
            state = 0;
          }
          break;
        default:
          throw new Error('how ** did we get in state ' + state);
        }
        checkError();
      }
      return this.makeTag(start, cursor.position, attributes);
    },
    parseComment: function (start, quoteSmart) {
      var done, ch, page = this.page, cursor = this.cursor, state;
      done = false;
      state = 0;
      while (!done) {
        ch = page.getChar(cursor);
        if (NEGATIVE_1 === ch) {
          done = true;
        } else {
          switch (state) {
          case 0:
            if ('>' === ch) {
              done = true;
            } else if ('-' === ch) {
              state = 1;
            } else {
              return this.parseString(start, quoteSmart);
            }
            break;
          case 1:
            if ('-' === ch) {
              ch = page.getChar(cursor);
              if (NEGATIVE_1 === ch) {
                done = true;
              } else if ('>' === ch) {
                done = true;
              } else {
                page.ungetChar(cursor);
                state = 2;
              }
            } else {
              return this.parseString(start, quoteSmart);
            }
            break;
          case 2:
            if ('-' === ch) {
              state = 3;
            } else if (NEGATIVE_1 === ch) {
              return this.parseString(start, quoteSmart);
            }
            break;
          case 3:
            if ('-' === ch) {
              state = 4;
            } else {
              state = 2;
            }
            break;
          case 4:
            if ('>' === ch) {
              done = true;
            } else if (!util.isWhitespace(ch)) {
              state = 2;
            }
            break;
          default:
            throw new Error('how ** did we get in state ' + state);
          }
        }
      }
      return this.makeComment(start, cursor.position);
    },
    parseString: function (start, quoteSmart) {
      var done = 0, ch, page = this.page, cursor = this.cursor, quote = 0;
      while (!done) {
        ch = page.getChar(cursor);
        if (NEGATIVE_1 === ch) {
          done = 1;
        } else if (quoteSmart && 0 === quote && ('"' === ch || '\'' === ch)) {
          quote = ch;
        } else if (quoteSmart && 0 !== quote && '\\' === ch) {
          ch = page.getChar(cursor);
          if (NEGATIVE_1 !== ch && '\\' !== ch && ch !== quote) {
            page.ungetChar(cursor);
          }
        } else if (quoteSmart && ch === quote) {
          quote = 0;
        } else if (quoteSmart && 0 === quote && ch === '/') {
          ch = page.getChar(cursor);
          if (NEGATIVE_1 === ch) {
            done = 1;
          } else if ('/' === ch) {
            do {
              ch = page.getChar(cursor);
            } while (NEGATIVE_1 !== ch && '\n' !== ch);
          } else if ('*' === ch) {
            do {
              do {
                ch = page.getChar(cursor);
              } while (NEGATIVE_1 !== ch && '*' !== ch);
              ch = page.getChar(cursor);
              if (ch === '*') {
                page.ungetChar(cursor);
              }
            } while (NEGATIVE_1 !== ch && '/' !== ch);
          } else {
            page.ungetChar(cursor);
          }
        } else if (0 === quote && '<' === ch) {
          ch = page.getChar(cursor);
          if (NEGATIVE_1 === ch) {
            done = 1;
          } else if ('/' === ch || util.isLetter(ch) || '!' === ch || '?' === ch) {
            done = 1;
            page.ungetChar(cursor);
            page.ungetChar(cursor);
          } else {
            page.ungetChar(cursor);
          }
        }
      }
      return this.makeString(start, cursor.position);
    },
    parseCDATA: function (quoteSmart, tagName) {
      var start, state, done, quote, ch, end, comment, mCursor = this.cursor, mPage = this.page;
      start = mCursor.position;
      state = 0;
      done = false;
      quote = '';
      comment = false;
      while (!done) {
        ch = mPage.getChar(mCursor);
        switch (state) {
        case 0:
          switch (ch) {
          case -1:
            done = true;
            break;
          case '\'':
            if (quoteSmart && !comment) {
              if ('' === quote) {
                quote = '\'';
              } else if ('\'' === quote) {
                quote = '';
              }
            }
            break;
          case '"':
            if (quoteSmart && !comment) {
              if ('' === quote) {
                quote = '"';
              } else if ('"' === quote) {
                quote = '';
              }
            }
            break;
          case '\\':
            if (quoteSmart) {
              if ('' !== quote) {
                ch = mPage.getChar(mCursor);
                if (NEGATIVE_1 === ch) {
                  done = true;
                } else if (ch !== '\\' && ch !== quote) {
                  mPage.ungetChar(mCursor);
                }
              }
            }
            break;
          case '/':
            if (quoteSmart) {
              if ('' === quote) {
                ch = mPage.getChar(mCursor);
                if (NEGATIVE_1 === ch) {
                  done = true;
                } else if ('/' === ch) {
                  comment = true;
                } else if ('*' === ch) {
                  do {
                    do {
                      ch = mPage.getChar(mCursor);
                    } while (NEGATIVE_1 !== ch && '*' !== ch);
                    ch = mPage.getChar(mCursor);
                    if (ch === '*') {
                      mPage.ungetChar(mCursor);
                    }
                  } while (NEGATIVE_1 !== ch && '/' !== ch);
                } else {
                  mPage.ungetChar(mCursor);
                }
              }
            }
            break;
          case '\n':
            comment = false;
            break;
          case '<':
            if (quoteSmart) {
              if ('' === quote) {
                state = 1;
              }
            } else {
              state = 1;
            }
            break;
          default:
            break;
          }
          break;
        case 1:
          switch (ch) {
          case -1:
            done = true;
            break;
          case '/':
            if (!tagName || mPage.getText(mCursor.position, mCursor.position + tagName.length) === tagName && !mPage.getText(mCursor.position + tagName.length, mCursor.position + tagName.length + 1).match(/\w/)) {
              state = 2;
            } else {
              state = 0;
            }
            break;
          case '!':
            ch = mPage.getChar(mCursor);
            if (NEGATIVE_1 === ch) {
              done = true;
            } else if ('-' === ch) {
              ch = mPage.getChar(mCursor);
              if (NEGATIVE_1 === ch) {
                done = true;
              } else if ('-' === ch) {
                state = 3;
              } else {
                state = 0;
              }
            } else {
              state = 0;
            }
            break;
          default:
            state = 0;
            break;
          }
          break;
        case 2:
          comment = false;
          if (NEGATIVE_1 === ch) {
            done = true;
          } else if (util.isLetter(ch)) {
            done = true;
            mPage.ungetChar(mCursor);
            mPage.ungetChar(mCursor);
            mPage.ungetChar(mCursor);
          } else {
            state = 0;
          }
          break;
        case 3:
          comment = false;
          if (NEGATIVE_1 === ch) {
            done = true;
          } else if ('-' === ch) {
            ch = mPage.getChar(mCursor);
            if (NEGATIVE_1 === ch) {
              done = true;
            } else if ('-' === ch) {
              ch = mPage.getChar(mCursor);
              if (NEGATIVE_1 === ch) {
                done = true;
              } else if ('>' === ch) {
                state = 0;
              } else {
                mPage.ungetChar(mCursor);
                mPage.ungetChar(mCursor);
              }
            } else {
              mPage.ungetChar(mCursor);
            }
          }
          break;
        default:
          throw new Error('unexpected ' + state);
        }
      }
      end = mCursor.position;
      return this.makeCData(start, end);
    },
    singleQuote: function (attributes, bookmarks) {
      var page = this.page;
      attributes.push(new Attribute(page.getText(bookmarks[1], bookmarks[2]), '=', page.getText(bookmarks[4] + 1, bookmarks[5]), '\''));
    },
    doubleQuote: function (attributes, bookmarks) {
      var page = this.page;
      attributes.push(new Attribute(page.getText(bookmarks[1], bookmarks[2]), '=', page.getText(bookmarks[5] + 1, bookmarks[6]), '"'));
    },
    standalone: function (attributes, bookmarks) {
      var page = this.page;
      attributes.push(new Attribute(page.getText(bookmarks[1], bookmarks[2])));
    },
    naked: function (attributes, bookmarks) {
      var page = this.page;
      attributes.push(new Attribute(page.getText(bookmarks[1], bookmarks[2]), '=', page.getText(bookmarks[3], bookmarks[4])));
    }
  };
  exports = Lexer;
  return exports;
}();
htmlParserScanner = function (exports) {
  var TagScanner = htmlParserScannersTagScanner;
  var SpecialScanners = htmlParserScannersSpecialScanners;
  htmlParserScannersQuoteCdataScanner;
  htmlParserScannersTextareaScanner;
  exports = {
    getScanner: function (nodeName) {
      return SpecialScanners[nodeName] || TagScanner;
    }
  };
  return exports;
}();
htmlParserParser = function (exports) {
  var util = htmlParserUtil;
  var dtd = htmlParserDtd;
  var Tag = htmlParserNodesTag;
  var Fragment = htmlParserNodesFragment;
  var Lexer = htmlParserLexerLexer;
  var Document = htmlParserNodesDocument;
  var Scanner = htmlParserScanner;
  function Parser(html, opts) {
    html = util.trim(html);
    this.originalHTML = html;
    if (/^(<!doctype|<html|<body)/i.test(html)) {
      html = '<document>' + html + '</document>';
    } else {
      html = '<body>' + html + '</body>';
    }
    this.lexer = new Lexer(html);
    this.opts = opts || {};
  }
  Parser.prototype = {
    constructor: Parser,
    elements: function () {
      var root, doc, lexer = this.lexer, opts = this.opts;
      doc = root = lexer.nextNode();
      if (root.tagName !== 'document') {
        doc = new Document();
        doc.appendChild(root);
      }
      doc.nodeType = 9;
      Scanner.getScanner('div').scan(root, lexer, opts);
      var body = fixBody(doc);
      if (body && opts.autoParagraph) {
        autoParagraph(body);
      }
      postProcess(doc);
      var originalHTML = this.originalHTML, fragment = new Fragment(), cs;
      if (/^(<!doctype|<html|<body)/i.test(originalHTML)) {
        cs = doc.childNodes;
      } else {
        cs = body.childNodes;
      }
      util.each(cs, function (c) {
        fragment.appendChild(c);
      });
      return fragment;
    },
    parse: function () {
      return this.elements();
    }
  };
  function fixBody(doc) {
    var body = findTagWithName(doc, 'body', 3);
    if (body) {
      var parent = body.parentNode, sibling = parent.childNodes, bodyIndex = util.indexOf(body, sibling);
      if (bodyIndex !== sibling.length - 1) {
        var fixes = sibling.slice(bodyIndex + 1, sibling.length);
        for (var i = 0; i < fixes.length; i++) {
          parent.removeChild(fixes[i]);
          if (fixes[i].tagName === 'body') {
            util.each(fixes[i].childNodes, function (c) {
              body.appendChild(c);
            });
          } else {
            body.appendChild(fixes[i]);
          }
        }
      }
    }
    return body;
  }
  function autoParagraph(doc) {
    var childNodes = doc.childNodes, c, i, pDtd = dtd.p, needFix = 0;
    for (i = 0; i < childNodes.length; i++) {
      c = childNodes[i];
      if (c.nodeType === 3 || c.nodeType === 1 && pDtd[c.nodeName]) {
        needFix = 1;
        break;
      }
    }
    if (needFix) {
      var newChildren = [], holder = new Tag();
      holder.nodeName = holder.tagName = 'p';
      for (i = 0; i < childNodes.length; i++) {
        c = childNodes[i];
        if (c.nodeType === 3 || c.nodeType === 1 && pDtd[c.nodeName]) {
          holder.appendChild(c);
        } else {
          if (holder.childNodes.length) {
            newChildren.push(holder);
            holder = holder.clone();
          }
          newChildren.push(c);
        }
      }
      if (holder.childNodes.length) {
        newChildren.push(holder);
      }
      doc.empty();
      for (i = 0; i < newChildren.length; i++) {
        doc.appendChild(newChildren[i]);
      }
    }
  }
  function findTagWithName(root, tagName, level) {
    if (level === 0) {
      return 0;
    }
    if (typeof level === 'number') {
      level--;
    }
    var r, childNodes = root.childNodes;
    if (childNodes) {
      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i].tagName === tagName) {
          return childNodes[i];
        }
        if (r = findTagWithName(childNodes[i], tagName, level)) {
          return r;
        }
      }
    }
    return 0;
  }
  function postProcess(doc) {
    var childNodes = [].concat(doc.childNodes);
    for (var i = 0; i < childNodes.length; i++) {
      if (childNodes[i].nodeName === 'html') {
        var html = childNodes[i];
        for (var j = 0; j < i; j++) {
          if (childNodes[j].nodeType === 3 && !util.trim(childNodes[j].toHtml())) {
            doc.removeChild(childNodes[j]);
          }
        }
        while (html.firstChild && html.firstChild.nodeType === 3 && !util.trim(html.firstChild.toHtml())) {
          html.removeChild(html.firstChild);
        }
        break;
      }
    }
  }
  htmlParserBase.Parser = exports = Parser;
  return exports;
}();
htmlParser = function (exports) {
  var DTD = htmlParserDtd;
  var Lexer = htmlParserLexerLexer;
  var Parser = htmlParserParser;
  var BasicWriter = htmlParserWriterBasic;
  var BeautifyWriter = htmlParserWriterBeautify;
  var MinifyWriter = htmlParserWriterMinify;
  var Filter = htmlParserWriterFilter;
  var CData = htmlParserNodesCdata;
  var Comment = htmlParserNodesComment;
  var Tag = htmlParserNodesTag;
  var Text = htmlParserNodesText;
  exports = {
    version: '1.0.2',
    Utils: htmlParserUtil,
    CData: CData,
    Comment: Comment,
    Node: htmlParserNodesNode,
    Tag: Tag,
    Text: Text,
    Lexer: Lexer,
    Parser: Parser,
    BasicWriter: BasicWriter,
    BeautifyWriter: BeautifyWriter,
    MinifyWriter: MinifyWriter,
    Filter: Filter,
    DTD: DTD,
    serialize: function (n, filter) {
      var basicWriter = new BasicWriter();
      n.writeHtml(basicWriter, filter);
      return basicWriter.getHtml();
    },
    parse: function (html) {
      return new Parser(html).parse();
    }
  };
  return exports;
}();
module.exports = htmlParser;
});