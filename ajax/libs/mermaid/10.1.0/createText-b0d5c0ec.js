import { l as log } from "./commonDb-89160e91.js";
import { p as decodeEntities } from "./mermaidAPI-c841a67f.js";
var CR_NEWLINE_R = /\r\n?/g;
var TAB_R = /\t/g;
var FORMFEED_R = /\f/g;
var preprocess = function preprocess2(source) {
  return source.replace(CR_NEWLINE_R, "\n").replace(FORMFEED_R, "").replace(TAB_R, "    ");
};
var populateInitialState = function populateInitialState2(givenState, defaultState) {
  var state = givenState || {};
  if (defaultState != null) {
    for (var prop in defaultState) {
      if (Object.prototype.hasOwnProperty.call(defaultState, prop)) {
        state[prop] = defaultState[prop];
      }
    }
  }
  return state;
};
var parserFor = function parserFor2(rules, defaultState) {
  var ruleList = Object.keys(rules).filter(function(type) {
    var rule = rules[type];
    if (rule == null || rule.match == null) {
      return false;
    }
    var order = rule.order;
    if ((typeof order !== "number" || !isFinite(order)) && typeof console !== "undefined") {
      console.warn("simple-markdown: Invalid order for rule `" + type + "`: " + String(order));
    }
    return true;
  });
  ruleList.sort(function(typeA, typeB) {
    var ruleA = rules[typeA];
    var ruleB = rules[typeB];
    var orderA = ruleA.order;
    var orderB = ruleB.order;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    var secondaryOrderA = ruleA.quality ? 0 : 1;
    var secondaryOrderB = ruleB.quality ? 0 : 1;
    if (secondaryOrderA !== secondaryOrderB) {
      return secondaryOrderA - secondaryOrderB;
    } else if (typeA < typeB) {
      return -1;
    } else if (typeA > typeB) {
      return 1;
    } else {
      return 0;
    }
  });
  var latestState;
  var nestedParse = function nestedParse2(source, state) {
    var result = [];
    state = state || latestState;
    latestState = state;
    while (source) {
      var ruleType = null;
      var rule = null;
      var capture = null;
      var quality4 = NaN;
      var i = 0;
      var currRuleType = ruleList[0];
      var currRule = rules[currRuleType];
      do {
        var currOrder2 = currRule.order;
        var prevCaptureStr = state.prevCapture == null ? "" : state.prevCapture[0];
        var currCapture = currRule.match(source, state, prevCaptureStr);
        if (currCapture) {
          var currQuality = currRule.quality ? currRule.quality(currCapture, state, prevCaptureStr) : 0;
          if (!(currQuality <= quality4)) {
            ruleType = currRuleType;
            rule = currRule;
            capture = currCapture;
            quality4 = currQuality;
          }
        }
        i++;
        currRuleType = ruleList[i];
        currRule = rules[currRuleType];
      } while (
        // keep looping while we're still within the ruleList
        currRule && // if we don't have a match yet, continue
        (!capture || // or if we have a match, but the next rule is
        // at the same order, and has a quality measurement
        // functions, then this rule must have a quality
        // measurement function (since they are sorted before
        // those without), and we need to check if there is
        // a better quality match
        currRule.order === currOrder2 && currRule.quality)
      );
      if (rule == null || capture == null) {
        throw new Error("Could not find a matching rule for the below content. The rule with highest `order` should always match content provided to it. Check the definition of `match` for '" + ruleList[ruleList.length - 1] + "'. It seems to not match the following source:\n" + source);
      }
      if (capture.index) {
        throw new Error("`match` must return a capture starting at index 0 (the current parse index). Did you forget a ^ at the start of the RegExp?");
      }
      var parsed = rule.parse(capture, nestedParse2, state);
      if (Array.isArray(parsed)) {
        Array.prototype.push.apply(result, parsed);
      } else {
        if (parsed == null || typeof parsed !== "object") {
          throw new Error("parse() function returned invalid parse result: '".concat(parsed, "'"));
        }
        if (parsed.type == null) {
          parsed.type = ruleType;
        }
        result.push(parsed);
      }
      state.prevCapture = capture;
      source = source.substring(state.prevCapture[0].length);
    }
    return result;
  };
  var outerParse = function outerParse2(source, state) {
    latestState = populateInitialState(state, defaultState);
    if (!latestState.inline && !latestState.disableAutoBlockNewlines) {
      source = source + "\n\n";
    }
    latestState.prevCapture = null;
    return nestedParse(preprocess(source), latestState);
  };
  return outerParse;
};
var inlineRegex = function inlineRegex2(regex) {
  var match3 = function match4(source, state, prevCapture) {
    if (state.inline) {
      return regex.exec(source);
    } else {
      return null;
    }
  };
  match3.regex = regex;
  return match3;
};
var blockRegex = function blockRegex2(regex) {
  var match3 = function match4(source, state) {
    if (state.inline) {
      return null;
    } else {
      return regex.exec(source);
    }
  };
  match3.regex = regex;
  return match3;
};
var anyScopeRegex = function anyScopeRegex2(regex) {
  var match3 = function match4(source, state) {
    return regex.exec(source);
  };
  match3.regex = regex;
  return match3;
};
var TYPE_SYMBOL = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 60103;
var reactElement = function reactElement2(type, key, props) {
  var element = {
    $$typeof: TYPE_SYMBOL,
    type,
    key: key == null ? void 0 : key,
    ref: null,
    props,
    _owner: null
  };
  return element;
};
var htmlTag = function htmlTag2(tagName, content, attributes, isClosed) {
  attributes = attributes || {};
  isClosed = typeof isClosed !== "undefined" ? isClosed : true;
  var attributeString = "";
  for (var attr in attributes) {
    var attribute = attributes[attr];
    if (
      // $FlowFixMe
      Object.prototype.hasOwnProperty.call(attributes, attr) && attribute
    ) {
      attributeString += " " + sanitizeText(attr) + '="' + sanitizeText(attribute) + '"';
    }
  }
  var unclosedTag = "<" + tagName + attributeString + ">";
  if (isClosed) {
    return unclosedTag + content + "</" + tagName + ">";
  } else {
    return unclosedTag;
  }
};
var EMPTY_PROPS = {};
var sanitizeUrl = function sanitizeUrl2(url) {
  if (url == null) {
    return null;
  }
  try {
    var prot = new URL(url, "https://localhost").protocol;
    if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
      return null;
    }
  } catch (e) {
    return null;
  }
  return url;
};
var SANITIZE_TEXT_R = /[<>&"']/g;
var SANITIZE_TEXT_CODES = {
  "<": "&lt;",
  ">": "&gt;",
  "&": "&amp;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
  "`": "&#96;"
};
var sanitizeText = function sanitizeText2(text) {
  return String(text).replace(SANITIZE_TEXT_R, function(chr) {
    return SANITIZE_TEXT_CODES[chr];
  });
};
var UNESCAPE_URL_R = /\\([^0-9A-Za-z\s])/g;
var unescapeUrl = function unescapeUrl2(rawUrlString) {
  return rawUrlString.replace(UNESCAPE_URL_R, "$1");
};
var parseInline = function parseInline2(parse2, content, state) {
  var isCurrentlyInline = state.inline || false;
  state.inline = true;
  var result = parse2(content, state);
  state.inline = isCurrentlyInline;
  return result;
};
var parseBlock = function parseBlock2(parse2, content, state) {
  var isCurrentlyInline = state.inline || false;
  state.inline = false;
  var result = parse2(content + "\n\n", state);
  state.inline = isCurrentlyInline;
  return result;
};
var parseCaptureInline = function parseCaptureInline2(capture, parse2, state) {
  return {
    content: parseInline(parse2, capture[1], state)
  };
};
var ignoreCapture = function ignoreCapture2() {
  return {};
};
var LIST_BULLET = "(?:[*+-]|\\d+\\.)";
var LIST_ITEM_PREFIX = "( *)(" + LIST_BULLET + ") +";
var LIST_ITEM_PREFIX_R = new RegExp("^" + LIST_ITEM_PREFIX);
var LIST_ITEM_R = new RegExp(LIST_ITEM_PREFIX + "[^\\n]*(?:\\n(?!\\1" + LIST_BULLET + " )[^\\n]*)*(\n|$)", "gm");
var BLOCK_END_R = /\n{2,}$/;
var INLINE_CODE_ESCAPE_BACKTICKS_R = /^ (?= *`)|(` *) $/g;
var LIST_BLOCK_END_R = BLOCK_END_R;
var LIST_ITEM_END_R = / *\n+$/;
var LIST_R = new RegExp("^( *)(" + LIST_BULLET + ") [\\s\\S]+?(?:\n{2,}(?! )(?!\\1" + LIST_BULLET + " )\\n*|\\s*\n*$)");
var LIST_LOOKBEHIND_R = /(?:^|\n)( *)$/;
var TABLES = function() {
  var TABLE_ROW_SEPARATOR_TRIM = /^ *\| *| *\| *$/g;
  var TABLE_CELL_END_TRIM = / *$/;
  var TABLE_RIGHT_ALIGN = /^ *-+: *$/;
  var TABLE_CENTER_ALIGN = /^ *:-+: *$/;
  var TABLE_LEFT_ALIGN = /^ *:-+ *$/;
  var parseTableAlignCapture = function parseTableAlignCapture2(alignCapture) {
    if (TABLE_RIGHT_ALIGN.test(alignCapture)) {
      return "right";
    } else if (TABLE_CENTER_ALIGN.test(alignCapture)) {
      return "center";
    } else if (TABLE_LEFT_ALIGN.test(alignCapture)) {
      return "left";
    } else {
      return null;
    }
  };
  var parseTableAlign = function parseTableAlign2(source, parse2, state, trimEndSeparators) {
    if (trimEndSeparators) {
      source = source.replace(TABLE_ROW_SEPARATOR_TRIM, "");
    }
    var alignText = source.trim().split("|");
    return alignText.map(parseTableAlignCapture);
  };
  var parseTableRow = function parseTableRow2(source, parse2, state, trimEndSeparators) {
    var prevInTable = state.inTable;
    state.inTable = true;
    var tableRow = parse2(source.trim(), state);
    state.inTable = prevInTable;
    var cells = [[]];
    tableRow.forEach(function(node, i) {
      if (node.type === "tableSeparator") {
        if (!trimEndSeparators || i !== 0 && i !== tableRow.length - 1) {
          cells.push([]);
        }
      } else {
        if (node.type === "text" && (tableRow[i + 1] == null || tableRow[i + 1].type === "tableSeparator")) {
          node.content = node.content.replace(TABLE_CELL_END_TRIM, "");
        }
        cells[cells.length - 1].push(node);
      }
    });
    return cells;
  };
  var parseTableCells = function parseTableCells2(source, parse2, state, trimEndSeparators) {
    var rowsText = source.trim().split("\n");
    return rowsText.map(function(rowText) {
      return parseTableRow(rowText, parse2, state, trimEndSeparators);
    });
  };
  var parseTable = function parseTable2(trimEndSeparators) {
    return function(capture, parse2, state) {
      state.inline = true;
      var header = parseTableRow(capture[1], parse2, state, trimEndSeparators);
      var align = parseTableAlign(capture[2], parse2, state, trimEndSeparators);
      var cells = parseTableCells(capture[3], parse2, state, trimEndSeparators);
      state.inline = false;
      return {
        type: "table",
        header,
        align,
        cells
      };
    };
  };
  return {
    parseTable: parseTable(true),
    parseNpTable: parseTable(false),
    TABLE_REGEX: /^ *(\|.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/,
    NPTABLE_REGEX: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/
  };
}();
var LINK_INSIDE = "(?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*";
var LINK_HREF_AND_TITLE = `\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*`;
var AUTOLINK_MAILTO_CHECK_R = /mailto:/i;
var parseRef = function parseRef2(capture, state, refNode) {
  var ref = (capture[2] || capture[1]).replace(/\s+/g, " ").toLowerCase();
  if (state._defs && state._defs[ref]) {
    var def = state._defs[ref];
    refNode.target = def.target;
    refNode.title = def.title;
  }
  state._refs = state._refs || {};
  state._refs[ref] = state._refs[ref] || [];
  state._refs[ref].push(refNode);
  return refNode;
};
var currOrder = 0;
var defaultRules = {
  Array: {
    react: function react(arr, output, state) {
      var oldKey = state.key;
      var result = [];
      for (var i = 0, key = 0; i < arr.length; i++, key++) {
        state.key = "" + i;
        var node = arr[i];
        if (node.type === "text") {
          node = {
            type: "text",
            content: node.content
          };
          for (; i + 1 < arr.length && arr[i + 1].type === "text"; i++) {
            node.content += arr[i + 1].content;
          }
        }
        result.push(output(node, state));
      }
      state.key = oldKey;
      return result;
    },
    html: function html(arr, output, state) {
      var result = "";
      for (var i = 0; i < arr.length; i++) {
        var node = arr[i];
        if (node.type === "text") {
          node = {
            type: "text",
            content: node.content
          };
          for (; i + 1 < arr.length && arr[i + 1].type === "text"; i++) {
            node.content += arr[i + 1].content;
          }
        }
        result += output(node, state);
      }
      return result;
    }
  },
  heading: {
    order: currOrder++,
    match: blockRegex(/^ *(#{1,6})([^\n]+?)#* *(?:\n *)+\n/),
    parse: function(_parse) {
      function parse2(_x, _x2, _x3) {
        return _parse.apply(this, arguments);
      }
      parse2.toString = function() {
        return _parse.toString();
      };
      return parse2;
    }(function(capture, parse2, state) {
      return {
        level: capture[1].length,
        content: parseInline(parse2, capture[2].trim(), state)
      };
    }),
    react: function react2(node, output, state) {
      return reactElement("h" + node.level, state.key, {
        children: output(node.content, state)
      });
    },
    html: function html2(node, output, state) {
      return htmlTag("h" + node.level, output(node.content, state));
    }
  },
  nptable: {
    order: currOrder++,
    match: blockRegex(TABLES.NPTABLE_REGEX),
    parse: TABLES.parseNpTable,
    react: null,
    html: null
  },
  lheading: {
    order: currOrder++,
    match: blockRegex(/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/),
    parse: function(_parse2) {
      function parse2(_x4, _x5, _x6) {
        return _parse2.apply(this, arguments);
      }
      parse2.toString = function() {
        return _parse2.toString();
      };
      return parse2;
    }(function(capture, parse2, state) {
      return {
        type: "heading",
        level: capture[2] === "=" ? 1 : 2,
        content: parseInline(parse2, capture[1], state)
      };
    }),
    react: null,
    html: null
  },
  hr: {
    order: currOrder++,
    match: blockRegex(/^( *[-*_]){3,} *(?:\n *)+\n/),
    parse: ignoreCapture,
    react: function react3(node, output, state) {
      return reactElement("hr", state.key, EMPTY_PROPS);
    },
    html: function html3(node, output, state) {
      return "<hr>";
    }
  },
  codeBlock: {
    order: currOrder++,
    match: blockRegex(/^(?:    [^\n]+\n*)+(?:\n *)+\n/),
    parse: function(_parse3) {
      function parse2(_x7, _x8, _x9) {
        return _parse3.apply(this, arguments);
      }
      parse2.toString = function() {
        return _parse3.toString();
      };
      return parse2;
    }(function(capture, parse2, state) {
      var content = capture[0].replace(/^    /gm, "").replace(/\n+$/, "");
      return {
        lang: void 0,
        content
      };
    }),
    react: function react4(node, output, state) {
      var className = node.lang ? "markdown-code-" + node.lang : void 0;
      return reactElement("pre", state.key, {
        children: reactElement("code", null, {
          className,
          children: node.content
        })
      });
    },
    html: function html4(node, output, state) {
      var className = node.lang ? "markdown-code-" + node.lang : void 0;
      var codeBlock = htmlTag("code", sanitizeText(node.content), {
        class: className
      });
      return htmlTag("pre", codeBlock);
    }
  },
  fence: {
    order: currOrder++,
    match: blockRegex(/^ *(`{3,}|~{3,}) *(?:(\S+) *)?\n([\s\S]+?)\n?\1 *(?:\n *)+\n/),
    parse: function(_parse4) {
      function parse2(_x10, _x11, _x12) {
        return _parse4.apply(this, arguments);
      }
      parse2.toString = function() {
        return _parse4.toString();
      };
      return parse2;
    }(function(capture, parse2, state) {
      return {
        type: "codeBlock",
        lang: capture[2] || void 0,
        content: capture[3]
      };
    }),
    react: null,
    html: null
  },
  blockQuote: {
    order: currOrder++,
    match: blockRegex(/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/),
    parse: function(_parse5) {
      function parse2(_x13, _x14, _x15) {
        return _parse5.apply(this, arguments);
      }
      parse2.toString = function() {
        return _parse5.toString();
      };
      return parse2;
    }(function(capture, parse2, state) {
      var content = capture[0].replace(/^ *> ?/gm, "");
      return {
        content: parse2(content, state)
      };
    }),
    react: function react5(node, output, state) {
      return reactElement("blockquote", state.key, {
        children: output(node.content, state)
      });
    },
    html: function html5(node, output, state) {
      return htmlTag("blockquote", output(node.content, state));
    }
  },
  list: {
    order: currOrder++,
    // $FlowFixMe
    match: function match(source, state) {
      var prevCaptureStr = state.prevCapture == null ? "" : state.prevCapture[0];
      var isStartOfLineCapture = LIST_LOOKBEHIND_R.exec(prevCaptureStr);
      var isListBlock = state._list || !state.inline;
      if (isStartOfLineCapture && isListBlock) {
        source = isStartOfLineCapture[1] + source;
        return LIST_R.exec(source);
      } else {
        return null;
      }
    },
    parse: function(_parse6) {
      function parse2(_x16, _x17, _x18) {
        return _parse6.apply(this, arguments);
      }
      parse2.toString = function() {
        return _parse6.toString();
      };
      return parse2;
    }(function(capture, parse2, state) {
      var bullet = capture[2];
      var ordered = bullet.length > 1;
      var start = ordered ? +bullet : void 0;
      var items = capture[0].replace(LIST_BLOCK_END_R, "\n").match(LIST_ITEM_R);
      var lastItemWasAParagraph = false;
      var itemContent = items.map(function(item, i) {
        var prefixCapture = LIST_ITEM_PREFIX_R.exec(item);
        var space = prefixCapture ? prefixCapture[0].length : 0;
        var spaceRegex = new RegExp("^ {1," + space + "}", "gm");
        var content = item.replace(spaceRegex, "").replace(LIST_ITEM_PREFIX_R, "");
        var isLastItem = i === items.length - 1;
        var containsBlocks = content.indexOf("\n\n") !== -1;
        var thisItemIsAParagraph = containsBlocks || isLastItem && lastItemWasAParagraph;
        lastItemWasAParagraph = thisItemIsAParagraph;
        var oldStateInline = state.inline;
        var oldStateList = state._list;
        state._list = true;
        var adjustedContent;
        if (thisItemIsAParagraph) {
          state.inline = false;
          adjustedContent = content.replace(LIST_ITEM_END_R, "\n\n");
        } else {
          state.inline = true;
          adjustedContent = content.replace(LIST_ITEM_END_R, "");
        }
        var result = parse2(adjustedContent, state);
        state.inline = oldStateInline;
        state._list = oldStateList;
        return result;
      });
      return {
        ordered,
        start,
        items: itemContent
      };
    }),
    react: function react6(node, output, state) {
      var ListWrapper = node.ordered ? "ol" : "ul";
      return reactElement(ListWrapper, state.key, {
        start: node.start,
        children: node.items.map(function(item, i) {
          return reactElement("li", "" + i, {
            children: output(item, state)
          });
        })
      });
    },
    html: function html6(node, output, state) {
      var listItems = node.items.map(function(item) {
        return htmlTag("li", output(item, state));
      }).join("");
      var listTag = node.ordered ? "ol" : "ul";
      var attributes = {
        start: node.start
      };
      return htmlTag(listTag, listItems, attributes);
    }
  },
  def: {
    order: currOrder++,
    // TODO(aria): This will match without a blank line before the next
    // block element, which is inconsistent with most of the rest of
    // simple-markdown.
    match: blockRegex(/^ *\[([^\]]+)\]: *<?([^\s>]*)>?(?: +["(]([^\n]+)[")])? *\n(?: *\n)*/),
    parse: function(_parse7) {
      function parse2(_x19, _x20, _x21) {
        return _parse7.apply(this, arguments);
      }
      parse2.toString = function() {
        return _parse7.toString();
      };
      return parse2;
    }(function(capture, parse2, state) {
      var def = capture[1].replace(/\s+/g, " ").toLowerCase();
      var target = capture[2];
      var title = capture[3];
      if (state._refs && state._refs[def]) {
        state._refs[def].forEach(function(refNode) {
          refNode.target = target;
          refNode.title = title;
        });
      }
      state._defs = state._defs || {};
      state._defs[def] = {
        target,
        title
      };
      return {
        def,
        target,
        title
      };
    }),
    react: function react7() {
      return null;
    },
    html: function html7() {
      return "";
    }
  },
  table: {
    order: currOrder++,
    match: blockRegex(TABLES.TABLE_REGEX),
    parse: TABLES.parseTable,
    react: function react8(node, output, state) {
      var getStyle = function getStyle2(colIndex) {
        return node.align[colIndex] == null ? {} : {
          textAlign: node.align[colIndex]
        };
      };
      var headers = node.header.map(function(content, i) {
        return reactElement("th", "" + i, {
          style: getStyle(i),
          scope: "col",
          children: output(content, state)
        });
      });
      var rows = node.cells.map(function(row, r) {
        return reactElement("tr", "" + r, {
          children: row.map(function(content, c) {
            return reactElement("td", "" + c, {
              style: getStyle(c),
              children: output(content, state)
            });
          })
        });
      });
      return reactElement("table", state.key, {
        children: [reactElement("thead", "thead", {
          children: reactElement("tr", null, {
            children: headers
          })
        }), reactElement("tbody", "tbody", {
          children: rows
        })]
      });
    },
    html: function html8(node, output, state) {
      var getStyle = function getStyle2(colIndex) {
        return node.align[colIndex] == null ? "" : "text-align:" + node.align[colIndex] + ";";
      };
      var headers = node.header.map(function(content, i) {
        return htmlTag("th", output(content, state), {
          style: getStyle(i),
          scope: "col"
        });
      }).join("");
      var rows = node.cells.map(function(row) {
        var cols = row.map(function(content, c) {
          return htmlTag("td", output(content, state), {
            style: getStyle(c)
          });
        }).join("");
        return htmlTag("tr", cols);
      }).join("");
      var thead = htmlTag("thead", htmlTag("tr", headers));
      var tbody = htmlTag("tbody", rows);
      return htmlTag("table", thead + tbody);
    }
  },
  newline: {
    order: currOrder++,
    match: blockRegex(/^(?:\n *)*\n/),
    parse: ignoreCapture,
    react: function react9(node, output, state) {
      return "\n";
    },
    html: function html9(node, output, state) {
      return "\n";
    }
  },
  paragraph: {
    order: currOrder++,
    match: blockRegex(/^((?:[^\n]|\n(?! *\n))+)(?:\n *)+\n/),
    parse: parseCaptureInline,
    react: function react10(node, output, state) {
      return reactElement("div", state.key, {
        className: "paragraph",
        children: output(node.content, state)
      });
    },
    html: function html10(node, output, state) {
      var attributes = {
        class: "paragraph"
      };
      return htmlTag("div", output(node.content, state), attributes);
    }
  },
  escape: {
    order: currOrder++,
    // We don't allow escaping numbers, letters, or spaces here so that
    // backslashes used in plain text still get rendered. But allowing
    // escaping anything else provides a very flexible escape mechanism,
    // regardless of how this grammar is extended.
    match: inlineRegex(/^\\([^0-9A-Za-z\s])/),
    parse: function(_parse8) {
      function parse2(_x22, _x23, _x24) {
        return _parse8.apply(this, arguments);
      }
      parse2.toString = function() {
        return _parse8.toString();
      };
      return parse2;
    }(function(capture, parse2, state) {
      return {
        type: "text",
        content: capture[1]
      };
    }),
    react: null,
    html: null
  },
  tableSeparator: {
    order: currOrder++,
    // $FlowFixMe
    match: function match2(source, state) {
      if (!state.inTable) {
        return null;
      }
      return /^ *\| */.exec(source);
    },
    parse: function parse() {
      return {
        type: "tableSeparator"
      };
    },
    // These shouldn't be reached, but in case they are, be reasonable:
    react: function react11() {
      return " | ";
    },
    html: function html11() {
      return " &vert; ";
    }
  },
  autolink: {
    order: currOrder++,
    match: inlineRegex(/^<([^: >]+:\/[^ >]+)>/),
    parse: function(_parse9) {
      function parse2(_x25, _x26, _x27) {
        return _parse9.apply(this, arguments);
      }
      parse2.toString = function() {
        return _parse9.toString();
      };
      return parse2;
    }(function(capture, parse2, state) {
      return {
        type: "link",
        content: [{
          type: "text",
          content: capture[1]
        }],
        target: capture[1]
      };
    }),
    react: null,
    html: null
  },
  mailto: {
    order: currOrder++,
    match: inlineRegex(/^<([^ >]+@[^ >]+)>/),
    parse: function(_parse10) {
      function parse2(_x28, _x29, _x30) {
        return _parse10.apply(this, arguments);
      }
      parse2.toString = function() {
        return _parse10.toString();
      };
      return parse2;
    }(function(capture, parse2, state) {
      var address = capture[1];
      var target = capture[1];
      if (!AUTOLINK_MAILTO_CHECK_R.test(target)) {
        target = "mailto:" + target;
      }
      return {
        type: "link",
        content: [{
          type: "text",
          content: address
        }],
        target
      };
    }),
    react: null,
    html: null
  },
  url: {
    order: currOrder++,
    match: inlineRegex(/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/),
    parse: function(_parse11) {
      function parse2(_x31, _x32, _x33) {
        return _parse11.apply(this, arguments);
      }
      parse2.toString = function() {
        return _parse11.toString();
      };
      return parse2;
    }(function(capture, parse2, state) {
      return {
        type: "link",
        content: [{
          type: "text",
          content: capture[1]
        }],
        target: capture[1],
        title: void 0
      };
    }),
    react: null,
    html: null
  },
  link: {
    order: currOrder++,
    match: inlineRegex(new RegExp("^\\[(" + LINK_INSIDE + ")\\]\\(" + LINK_HREF_AND_TITLE + "\\)")),
    parse: function(_parse12) {
      function parse2(_x34, _x35, _x36) {
        return _parse12.apply(this, arguments);
      }
      parse2.toString = function() {
        return _parse12.toString();
      };
      return parse2;
    }(function(capture, parse2, state) {
      var link = {
        content: parse2(capture[1], state),
        target: unescapeUrl(capture[2]),
        title: capture[3]
      };
      return link;
    }),
    react: function react12(node, output, state) {
      return reactElement("a", state.key, {
        href: sanitizeUrl(node.target),
        title: node.title,
        children: output(node.content, state)
      });
    },
    html: function html12(node, output, state) {
      var attributes = {
        href: sanitizeUrl(node.target),
        title: node.title
      };
      return htmlTag("a", output(node.content, state), attributes);
    }
  },
  image: {
    order: currOrder++,
    match: inlineRegex(new RegExp("^!\\[(" + LINK_INSIDE + ")\\]\\(" + LINK_HREF_AND_TITLE + "\\)")),
    parse: function(_parse13) {
      function parse2(_x37, _x38, _x39) {
        return _parse13.apply(this, arguments);
      }
      parse2.toString = function() {
        return _parse13.toString();
      };
      return parse2;
    }(function(capture, parse2, state) {
      var image = {
        alt: capture[1],
        target: unescapeUrl(capture[2]),
        title: capture[3]
      };
      return image;
    }),
    react: function react13(node, output, state) {
      return reactElement("img", state.key, {
        src: sanitizeUrl(node.target),
        alt: node.alt,
        title: node.title
      });
    },
    html: function html13(node, output, state) {
      var attributes = {
        src: sanitizeUrl(node.target),
        alt: node.alt,
        title: node.title
      };
      return htmlTag("img", "", attributes, false);
    }
  },
  reflink: {
    order: currOrder++,
    match: inlineRegex(new RegExp(
      // The first [part] of the link
      "^\\[(" + LINK_INSIDE + ")\\]\\s*\\[([^\\]]*)\\]"
    )),
    parse: function(_parse14) {
      function parse2(_x40, _x41, _x42) {
        return _parse14.apply(this, arguments);
      }
      parse2.toString = function() {
        return _parse14.toString();
      };
      return parse2;
    }(function(capture, parse2, state) {
      return parseRef(capture, state, {
        type: "link",
        content: parse2(capture[1], state)
      });
    }),
    react: null,
    html: null
  },
  refimage: {
    order: currOrder++,
    match: inlineRegex(new RegExp(
      // The first [part] of the link
      "^!\\[(" + LINK_INSIDE + ")\\]\\s*\\[([^\\]]*)\\]"
    )),
    parse: function(_parse15) {
      function parse2(_x43, _x44, _x45) {
        return _parse15.apply(this, arguments);
      }
      parse2.toString = function() {
        return _parse15.toString();
      };
      return parse2;
    }(function(capture, parse2, state) {
      return parseRef(capture, state, {
        type: "image",
        alt: capture[1]
      });
    }),
    react: null,
    html: null
  },
  em: {
    order: currOrder,
    match: inlineRegex(new RegExp(
      // only match _s surrounding words.
      "^\\b_((?:__|\\\\[\\s\\S]|[^\\\\_])+?)_\\b|^\\*(?=\\S)((?:\\*\\*|\\\\[\\s\\S]|\\s+(?:\\\\[\\s\\S]|[^\\s\\*\\\\]|\\*\\*)|[^\\s\\*\\\\])+?)\\*(?!\\*)"
    )),
    quality: function quality(capture) {
      return capture[0].length + 0.2;
    },
    parse: function(_parse16) {
      function parse2(_x46, _x47, _x48) {
        return _parse16.apply(this, arguments);
      }
      parse2.toString = function() {
        return _parse16.toString();
      };
      return parse2;
    }(function(capture, parse2, state) {
      return {
        content: parse2(capture[2] || capture[1], state)
      };
    }),
    react: function react14(node, output, state) {
      return reactElement("em", state.key, {
        children: output(node.content, state)
      });
    },
    html: function html14(node, output, state) {
      return htmlTag("em", output(node.content, state));
    }
  },
  strong: {
    order: currOrder,
    match: inlineRegex(/^\*\*((?:\\[\s\S]|[^\\])+?)\*\*(?!\*)/),
    quality: function quality2(capture) {
      return capture[0].length + 0.1;
    },
    parse: parseCaptureInline,
    react: function react15(node, output, state) {
      return reactElement("strong", state.key, {
        children: output(node.content, state)
      });
    },
    html: function html15(node, output, state) {
      return htmlTag("strong", output(node.content, state));
    }
  },
  u: {
    order: currOrder++,
    match: inlineRegex(/^__((?:\\[\s\S]|[^\\])+?)__(?!_)/),
    quality: function quality3(capture) {
      return capture[0].length;
    },
    parse: parseCaptureInline,
    react: function react16(node, output, state) {
      return reactElement("u", state.key, {
        children: output(node.content, state)
      });
    },
    html: function html16(node, output, state) {
      return htmlTag("u", output(node.content, state));
    }
  },
  del: {
    order: currOrder++,
    match: inlineRegex(/^~~(?=\S)((?:\\[\s\S]|~(?!~)|[^\s~\\]|\s(?!~~))+?)~~/),
    parse: parseCaptureInline,
    react: function react17(node, output, state) {
      return reactElement("del", state.key, {
        children: output(node.content, state)
      });
    },
    html: function html17(node, output, state) {
      return htmlTag("del", output(node.content, state));
    }
  },
  inlineCode: {
    order: currOrder++,
    match: inlineRegex(/^(`+)([\s\S]*?[^`])\1(?!`)/),
    parse: function(_parse17) {
      function parse2(_x49, _x50, _x51) {
        return _parse17.apply(this, arguments);
      }
      parse2.toString = function() {
        return _parse17.toString();
      };
      return parse2;
    }(function(capture, parse2, state) {
      return {
        content: capture[2].replace(INLINE_CODE_ESCAPE_BACKTICKS_R, "$1")
      };
    }),
    react: function react18(node, output, state) {
      return reactElement("code", state.key, {
        children: node.content
      });
    },
    html: function html18(node, output, state) {
      return htmlTag("code", sanitizeText(node.content));
    }
  },
  br: {
    order: currOrder++,
    match: anyScopeRegex(/^ {2,}\n/),
    parse: ignoreCapture,
    react: function react19(node, output, state) {
      return reactElement("br", state.key, EMPTY_PROPS);
    },
    html: function html19(node, output, state) {
      return "<br>";
    }
  },
  text: {
    order: currOrder++,
    // Here we look for anything followed by non-symbols,
    // double newlines, or double-space-newlines
    // We break on any symbol characters so that this grammar
    // is easy to extend without needing to modify this regex
    match: anyScopeRegex(/^[\s\S]+?(?=[^0-9A-Za-z\s\u00c0-\uffff]|\n\n| {2,}\n|\w+:\S|$)/),
    parse: function(_parse18) {
      function parse2(_x52, _x53, _x54) {
        return _parse18.apply(this, arguments);
      }
      parse2.toString = function() {
        return _parse18.toString();
      };
      return parse2;
    }(function(capture, parse2, state) {
      return {
        content: capture[0]
      };
    }),
    react: function react20(node, output, state) {
      return node.content;
    },
    html: function html20(node, output, state) {
      return sanitizeText(node.content);
    }
  }
};
var ruleOutput = function ruleOutput2(rules, property) {
  if (!property && typeof console !== "undefined") {
    console.warn("simple-markdown ruleOutput should take 'react' or 'html' as the second argument.");
  }
  var nestedRuleOutput = function nestedRuleOutput2(ast, outputFunc, state) {
    return rules[ast.type][property](ast, outputFunc, state);
  };
  return nestedRuleOutput;
};
var reactFor = function reactFor2(outputFunc) {
  var nestedOutput = function nestedOutput2(ast, state) {
    state = state || {};
    if (Array.isArray(ast)) {
      var oldKey = state.key;
      var result = [];
      var lastResult = null;
      for (var i = 0; i < ast.length; i++) {
        state.key = "" + i;
        var nodeOut = nestedOutput2(ast[i], state);
        if (typeof nodeOut === "string" && typeof lastResult === "string") {
          lastResult = lastResult + nodeOut;
          result[result.length - 1] = lastResult;
        } else {
          result.push(nodeOut);
          lastResult = nodeOut;
        }
      }
      state.key = oldKey;
      return result;
    } else {
      return outputFunc(ast, nestedOutput2, state);
    }
  };
  return nestedOutput;
};
var htmlFor = function htmlFor2(outputFunc) {
  var nestedOutput = function nestedOutput2(ast, state) {
    state = state || {};
    if (Array.isArray(ast)) {
      return ast.map(function(node) {
        return nestedOutput2(node, state);
      }).join("");
    } else {
      return outputFunc(ast, nestedOutput2, state);
    }
  };
  return nestedOutput;
};
var outputFor = function outputFor2(rules, property) {
  var defaultState = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (!property) {
    throw new Error("simple-markdown: outputFor: `property` must be defined. if you just upgraded, you probably need to replace `outputFor` with `reactFor`");
  }
  var latestState;
  var arrayRule = rules.Array || defaultRules.Array;
  var arrayRuleCheck = arrayRule[property];
  if (!arrayRuleCheck) {
    throw new Error("simple-markdown: outputFor: to join nodes of type `" + property + "` you must provide an `Array:` joiner rule with that type, Please see the docs for details on specifying an Array rule.");
  }
  var arrayRuleOutput = arrayRuleCheck;
  var nestedOutput = function nestedOutput2(ast, state) {
    state = state || latestState;
    latestState = state;
    if (Array.isArray(ast)) {
      return arrayRuleOutput(ast, nestedOutput2, state);
    } else {
      return rules[ast.type][property](ast, nestedOutput2, state);
    }
  };
  var outerOutput = function outerOutput2(ast, state) {
    latestState = populateInitialState(state, defaultState);
    return nestedOutput(ast, latestState);
  };
  return outerOutput;
};
var defaultRawParse = parserFor(defaultRules);
var defaultBlockParse = function defaultBlockParse2(source, state) {
  state = state || {};
  state.inline = false;
  return defaultRawParse(source, state);
};
var defaultInlineParse = function defaultInlineParse2(source, state) {
  state = state || {};
  state.inline = true;
  return defaultRawParse(source, state);
};
var defaultImplicitParse = function defaultImplicitParse2(source, state) {
  var isBlock = BLOCK_END_R.test(source);
  state = state || {};
  state.inline = !isBlock;
  return defaultRawParse(source, state);
};
var defaultReactOutput = outputFor(defaultRules, "react");
var defaultHtmlOutput = outputFor(defaultRules, "html");
var markdownToReact = function markdownToReact2(source, state) {
  return defaultReactOutput(defaultBlockParse(source, state), state);
};
var markdownToHtml = function markdownToHtml2(source, state) {
  return defaultHtmlOutput(defaultBlockParse(source, state), state);
};
var ReactMarkdown = function ReactMarkdown2(props) {
  var divProps = {};
  for (var prop in props) {
    if (prop !== "source" && // $FlowFixMe
    Object.prototype.hasOwnProperty.call(props, prop)) {
      divProps[prop] = props[prop];
    }
  }
  divProps.children = markdownToReact(props.source);
  return reactElement("div", null, divProps);
};
var SimpleMarkdown = {
  defaultRules,
  parserFor,
  outputFor,
  inlineRegex,
  blockRegex,
  anyScopeRegex,
  parseInline,
  parseBlock,
  // default wrappers:
  markdownToReact,
  markdownToHtml,
  ReactMarkdown,
  defaultBlockParse,
  defaultInlineParse,
  defaultImplicitParse,
  defaultReactOutput,
  defaultHtmlOutput,
  preprocess,
  sanitizeText,
  sanitizeUrl,
  unescapeUrl,
  htmlTag,
  reactElement,
  // deprecated:
  defaultRawParse,
  ruleOutput,
  reactFor,
  htmlFor,
  defaultParse: function defaultParse() {
    if (typeof console !== "undefined") {
      console.warn("defaultParse is deprecated, please use `defaultImplicitParse`");
    }
    return defaultImplicitParse.apply(null, arguments);
  },
  defaultOutput: function defaultOutput() {
    if (typeof console !== "undefined") {
      console.warn("defaultOutput is deprecated, please use `defaultReactOutput`");
    }
    return defaultReactOutput.apply(null, arguments);
  }
};
function preprocessMarkdown(markdown) {
  const withoutMultipleNewlines = markdown.replace(/\n{2,}/g, "\n");
  const withoutExtraSpaces = withoutMultipleNewlines.replace(/^\s+/gm, "");
  return withoutExtraSpaces;
}
function markdownToLines(markdown) {
  const preprocessedMarkdown = preprocessMarkdown(markdown);
  const mdParse = SimpleMarkdown.defaultBlockParse;
  const syntaxTree = mdParse(preprocessedMarkdown);
  let lines = [[]];
  let currentLine = 0;
  function processNode(node, parentType) {
    if (node.type === "text") {
      const textLines = node.content.split("\n");
      textLines.forEach((textLine, index) => {
        if (index !== 0) {
          currentLine++;
          lines.push([]);
        }
        textLine.split(" ").forEach((word) => {
          if (word) {
            lines[currentLine].push({ content: word, type: parentType || "normal" });
          }
        });
      });
    } else if (node.type === "strong" || node.type === "em") {
      node.content.forEach((contentNode) => {
        processNode(contentNode, node.type);
      });
    }
  }
  syntaxTree.forEach((treeNode) => {
    if (treeNode.type === "paragraph") {
      treeNode.content.forEach((contentNode) => {
        processNode(contentNode);
      });
    }
  });
  return lines;
}
function markdownToHTML(markdown) {
  const mdParse = SimpleMarkdown.defaultBlockParse;
  const syntaxTree = mdParse(markdown);
  function output(node) {
    if (node.type === "text") {
      return node.content.replace(/\n/g, "<br/>");
    } else if (node.type === "strong") {
      return `<strong>${node.content.map(output).join("")}</strong>`;
    } else if (node.type === "em") {
      return `<em>${node.content.map(output).join("")}</em>`;
    } else if (node.type === "paragraph") {
      return `<p>${node.content.map(output).join("")}</p>`;
    } else {
      return "";
    }
  }
  return syntaxTree.map(output).join("");
}
function applyStyle(dom, styleFn) {
  if (styleFn) {
    dom.attr("style", styleFn);
  }
}
function addHtmlSpan(element, node, width, classes) {
  const fo = element.append("foreignObject");
  const div = fo.append("xhtml:div");
  const label = node.label;
  const labelClass = node.isNode ? "nodeLabel" : "edgeLabel";
  div.html(
    `<span class="${labelClass} ${classes}" ` + (node.labelStyle ? 'style="' + node.labelStyle + '"' : "") + ">" + label + "</span>"
  );
  applyStyle(div, node.labelStyle);
  div.style("display", "table-cell");
  div.style("white-space", "nowrap");
  div.style("max-width", width + "px");
  div.attr("xmlns", "http://www.w3.org/1999/xhtml");
  let bbox = div.node().getBoundingClientRect();
  if (bbox.width === width) {
    div.style("display", "table");
    div.style("white-space", "break-spaces");
    div.style("width", width + "px");
    bbox = div.node().getBoundingClientRect();
  }
  fo.style("width", bbox.width);
  fo.style("height", bbox.height);
  return fo.node();
}
function createTspan(textElement, lineIndex, lineHeight) {
  return textElement.append("tspan").attr("class", "text-outer-tspan").attr("x", 0).attr("y", lineIndex * lineHeight - 0.1 + "em").attr("dy", lineHeight + "em");
}
function createFormattedText(width, g, structuredText, addBackground = false) {
  const lineHeight = 1.1;
  const labelGroup = g.append("g");
  let bkg = labelGroup.insert("rect").attr("class", "background");
  const textElement = labelGroup.append("text").attr("y", "-10.1");
  let lineIndex = -1;
  structuredText.forEach((line) => {
    lineIndex++;
    let tspan = createTspan(textElement, lineIndex, lineHeight);
    let words = [...line].reverse();
    let currentWord;
    let wrappedLine = [];
    while (words.length) {
      currentWord = words.pop();
      wrappedLine.push(currentWord);
      updateTextContentAndStyles(tspan, wrappedLine);
      if (tspan.node().getComputedTextLength() > width) {
        wrappedLine.pop();
        words.push(currentWord);
        updateTextContentAndStyles(tspan, wrappedLine);
        wrappedLine = [];
        lineIndex++;
        tspan = createTspan(textElement, lineIndex, lineHeight);
      }
    }
  });
  if (addBackground) {
    const bbox = textElement.node().getBBox();
    const padding = 2;
    bkg.attr("x", -padding).attr("y", -padding).attr("width", bbox.width + 2 * padding).attr("height", bbox.height + 2 * padding);
    return labelGroup.node();
  } else {
    return textElement.node();
  }
}
function updateTextContentAndStyles(tspan, wrappedLine) {
  tspan.text("");
  wrappedLine.forEach((word, index) => {
    const innerTspan = tspan.append("tspan").attr("font-style", word.type === "em" ? "italic" : "normal").attr("class", "text-inner-tspan").attr("font-weight", word.type === "strong" ? "bold" : "normal");
    if (index === 0) {
      innerTspan.text(word.content);
    } else {
      innerTspan.text(" " + word.content);
    }
  });
}
const createText = (el, text = "", {
  style = "",
  isTitle = false,
  classes = "",
  useHtmlLabels = true,
  isNode = true,
  width,
  addSvgBackground = false
} = {}) => {
  log.info("createText", text, style, isTitle, classes, useHtmlLabels, isNode, addSvgBackground);
  if (useHtmlLabels) {
    const htmlText = markdownToHTML(text);
    const node = {
      isNode,
      label: decodeEntities(htmlText).replace(
        /fa[blrs]?:fa-[\w-]+/g,
        (s) => `<i class='${s.replace(":", " ")}'></i>`
      ),
      labelStyle: style.replace("fill:", "color:")
    };
    let vertexNode = addHtmlSpan(el, node, width, classes);
    return vertexNode;
  } else {
    const structuredText = markdownToLines(text);
    const special = ['"', "'", ".", ",", ":", ";", "!", "?", "(", ")", "[", "]", "{", "}"];
    let lastWord;
    structuredText.forEach((line) => {
      line.forEach((word) => {
        if (special.includes(word.content) && lastWord) {
          lastWord.content += word.content;
          word.content = "";
        }
        lastWord = word;
      });
    });
    const svgLabel = createFormattedText(width, el, structuredText, addSvgBackground);
    return svgLabel;
  }
};
export {
  createText as c
};
//# sourceMappingURL=createText-b0d5c0ec.js.map
