/*!
 * HTMLMinifier v1.2.0 (http://kangax.github.io/html-minifier/)
 * Copyright 2010-2016 Juriy "kangax" Zaytsev
 * Licensed under the MIT license
 */
/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

/*
 * // Use like so:
 * HTMLParser(htmlString, {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * });
 *
 * // or to get an XML string:
 * HTMLtoXML(htmlString);
 *
 * // or to get an XML DOM Document
 * HTMLtoDOM(htmlString);
 *
 * // or to inject into an existing document/DOM node
 * HTMLtoDOM(htmlString, document);
 * HTMLtoDOM(htmlString, document.body);
 *
 */

 /* global ActiveXObject, DOMDocument */

(function(global) {
  'use strict';

  // Regular Expressions for parsing tags and attributes
  var singleAttrIdentifier = /([\w:\.-]+)/,
      singleAttrAssign = /=/,
      singleAttrAssigns = [ singleAttrAssign ],
      singleAttrValues = [
        /"((?:\\.|[^"])*)"/.source, // attr value double quotes
        /'((?:\\.|[^'])*)'/.source, // attr value, single quotes
        /([^>\s]+)/.source          // attr value, no quotes
      ],
      startTagOpen = /^<([\w:-]+)/,
      startTagClose = /\s*(\/?)>/,
      endTag = /^<\/([\w:-]+)[^>]*>/,
      endingSlash = /\/>$/,
      doctype = /^<!DOCTYPE [^>]+>/i;

  var IS_REGEX_CAPTURING_BROKEN = false;
  'x'.replace(/x(.)?/g, function(m, g) {
    IS_REGEX_CAPTURING_BROKEN = g === '';
  });

  // Empty Elements
  var empty = makeMap('area,base,basefont,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr');

  // Inline Elements
  var inline = makeMap('a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,noscript,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,svg,textarea,tt,u,var');

  // Elements that you can, intentionally, leave open
  // (and which close themselves)
  var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source');

  // Attributes that have their values filled in disabled='disabled'
  var fillAttrs = makeMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected');

  // Special Elements (can contain anything)
  var special = makeMap('script,style');

  var reCache = {}, stackedTag, reStackedTag, tagMatch;

  function startTagForHandler( handler ) {
    var customStartTagAttrs;

    var startTagAttrs = new RegExp(
        '(?:\\s*[\\w:\\.-]+'
      +   '(?:\\s*'
      +     '(?:' + joinSingleAttrAssigns(handler) + ')'
      +     '\\s*(?:(?:"[^"]*")|(?:\'[^\']*\')|[^>\\s]+)'
      +   ')?'
      + ')*'
    );

    if ( handler.customAttrSurround ) {
      var attrClauses = [];

      for ( var i = handler.customAttrSurround.length - 1; i >= 0; i-- ) {
        // Capture the custom attribute opening and closing markup surrounding the standard attribute rules
        attrClauses[i] = '(?:\\s*'
          + handler.customAttrSurround[i][0].source
          + '\\s*'
          + startTagAttrs.source
          + '\\s*'
          + handler.customAttrSurround[i][1].source
          + ')';
      }
      attrClauses.unshift(startTagAttrs.source);

      customStartTagAttrs = new RegExp(
        '((?:' + attrClauses.join('|') + ')*)'
      );
    }
    else {
      // No custom attribute wrappers specified, so just capture the standard attribute rules
      customStartTagAttrs = new RegExp('(' + startTagAttrs.source + ')');
    }

    return new RegExp(startTagOpen.source + customStartTagAttrs.source + startTagClose.source);
  }

  function attrForHandler( handler ) {
    var singleAttr = new RegExp(
      singleAttrIdentifier.source
      + '(?:\\s*'
      + '(' + joinSingleAttrAssigns( handler ) + ')'
      + '\\s*'
      + '(?:'
      + singleAttrValues.join('|')
      + ')'
      + ')?'
    );

    if ( handler.customAttrSurround ) {
      var attrClauses = [];
      for ( var i = handler.customAttrSurround.length - 1; i >= 0; i-- ) {
        attrClauses[i] = '(?:'
          + '(' + handler.customAttrSurround[i][0].source + ')\\s*'
          + singleAttr.source
          + '\\s*(' + handler.customAttrSurround[i][1].source + ')'
          + ')';
      }
      attrClauses.unshift('(?:' + singleAttr.source + ')');

      return new RegExp(attrClauses.join('|'), 'g');
    }
    else {
      return new RegExp(singleAttr.source, 'g');
    }
  }

  function joinSingleAttrAssigns( handler ) {
    return singleAttrAssigns.concat(
      handler.customAttrAssign || []
    ).map(function (assign) {
      return '(?:' + assign.source + ')';
    }).join('|');
  }

  var HTMLParser = global.HTMLParser = function( html, handler ) {
    var index, match, stack = [], last = html, prevTag, nextTag;
    stack.last = function() {
      var last = this[ this.length - 1 ];
      return last && last.tag;
    };

    var startTag = startTagForHandler(handler);
    var attr = attrForHandler(handler);

    while ( html ) {
      // Make sure we're not in a script or style element
      if ( !stack.last() || !special[ stack.last() ] ) {

        // Comment:
        if ( /^<!--/.test( html ) ) {
          index = html.indexOf('-->');

          if ( index >= 0 ) {
            if ( handler.comment ) {
              handler.comment( html.substring( 4, index ) );
            }
            html = html.substring( index + 3 );
            prevTag = '';
            continue;
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if ( /^<!\[/.test( html ) ) {
          index = html.indexOf(']>');

          if (index >= 0) {
            if ( handler.comment ) {
              handler.comment( html.substring(2, index + 1 ), true /* non-standard */ );
            }
            html = html.substring( index + 2 );
            prevTag = '';
            continue;
          }
        }

        // Doctype:
        if ( (match = doctype.exec( html )) ) {
          if ( handler.doctype ) {
            handler.doctype( match[0] );
          }
          html = html.substring( match[0].length );
          prevTag = '';
          continue;
        }

        // End tag:
        if ( /^<\//.test( html ) ) {
          match = html.match( endTag );
          if ( match ) {
            html = html.substring( match[0].length );
            match[0].replace( endTag, parseEndTag );
            prevTag = '/' + match[1].toLowerCase();
            continue;
          }

        }
        // Start tag:
        if ( /^</.test( html ) ) {
          match = html.match( startTag );
          if ( match ) {
            html = html.substring( match[0].length );
            match[0].replace( startTag, parseStartTag );
            prevTag = match[1].toLowerCase();
            continue;
          }
        }

        index = html.indexOf('<');

        var text = index < 0 ? html : html.substring( 0, index );
        html = index < 0 ? '' : html.substring( index );

        // next tag
        tagMatch = html.match( startTag );
        if (tagMatch) {
          nextTag = tagMatch[1];
        }
        else {
          tagMatch = html.match( endTag );
          if (tagMatch) {
            nextTag = '/' + tagMatch[1];
          }
          else {
            nextTag = '';
          }
        }

        if ( handler.chars ) {
          handler.chars(text, prevTag, nextTag);
        }
        prevTag = '';

      }
      else {

        stackedTag = stack.last().toLowerCase();
        reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)<\/' + stackedTag + '[^>]*>', 'i'));

        html = html.replace(reStackedTag, function(all, text) {
          if (stackedTag !== 'script' && stackedTag !== 'style' && stackedTag !== 'noscript') {
            text = text
              .replace(/<!--([\s\S]*?)-->/g, '$1')
              .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
          }

          if ( handler.chars ) {
            handler.chars( text );
          }

          return '';
        });

        parseEndTag( '', stackedTag );
      }

      if ( html === last ) {
        throw 'Parse Error: ' + html;
      }
      last = html;
    }

    // Clean up any remaining tags
    parseEndTag();

    function parseStartTag( tag, tagName, rest, unary ) {
      var unarySlash = false;

      while ( !handler.html5 && stack.last() && inline[ stack.last() ]) {
        parseEndTag( '', stack.last() );
      }

      if ( closeSelf[ tagName ] && stack.last() === tagName ) {
        parseEndTag( '', tagName );
      }

      unary = empty[ tagName ] || !!unary;

      var attrs = [];

      rest.replace(attr, function () {
        var name, value, fallbackValue, customOpen, customClose, customAssign, quote;
        var ncp = 7; // number of captured parts, scalar

        // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
        if (IS_REGEX_CAPTURING_BROKEN && arguments[0].indexOf('""') === -1) {
          if (arguments[3] === '') { arguments[3] = undefined; }
          if (arguments[4] === '') { arguments[4] = undefined; }
          if (arguments[5] === '') { arguments[5] = undefined; }
        }

        name = arguments[1];
        if ( name ) {
          customAssign = arguments[2];
          fallbackValue = arguments[3];
          value = fallbackValue || arguments[4] || arguments[5];

          if (customAssign) {
            quote = arguments[0].charAt(name.length + customAssign.length);
            quote = (quote === '\'' || quote === '"') ? quote : '';
          }

        }
        else if ( handler.customAttrSurround ) {
          for ( var i = handler.customAttrSurround.length - 1; i >= 0; i-- ) {
            name = arguments[i * ncp + 7];
            customAssign = arguments[i * ncp + 8];
            if ( name ) {
              fallbackValue = arguments[i * ncp + 9];
              value = fallbackValue
                || arguments[i * ncp + 10]
                || arguments[i * ncp + 11];
              customOpen = arguments[i * ncp + 6];
              customClose = arguments[i * ncp + 12];
              break;
            }
          }
        }

        if ( value === undefined ) {
          value = fillAttrs[name] ? name : fallbackValue;
        }

        attrs.push({
          name: name,
          value: value,
          customAssign: customAssign || '=',
          customOpen:  customOpen || '',
          customClose: customClose || '',
          quote: quote || ''
        });
      });

      if ( !unary ) {
        stack.push( { tag: tagName, attrs: attrs } );
      }
      else {
        unarySlash = tag.match( endingSlash );
      }


      if ( handler.start ) {
        handler.start( tagName, attrs, unary, unarySlash );
      }
    }

    function parseEndTag( tag, tagName ) {
      var pos;

      // If no tag name is provided, clean shop
      if ( !tagName ) {
        pos = 0;
      }
      else {
        // Find the closest opened tag of the same type
        var needle = tagName.toLowerCase();
        for ( pos = stack.length - 1; pos >= 0; pos-- ) {
          if ( stack[ pos ].tag.toLowerCase() === needle ) {
            break;
          }
        }
      }

      if ( pos >= 0 ) {
        // Close all the open elements, up the stack
        for ( var i = stack.length - 1; i >= pos; i-- ) {
          if ( handler.end ) {
            handler.end( stack[ i ].tag, stack[ i ].attrs );
          }
        }

        // Remove the open elements from the stack
        stack.length = pos;
      }
    }
  };

  global.HTMLtoXML = function( html ) {
    var results = '';

    new HTMLParser(html, {
      start: function( tag, attrs, unary ) {
        results += '<' + tag;

        for ( var i = 0; i < attrs.length; i++ ) {
          results += ' ' + attrs[i].name + '="' + (attrs[i].value || '').replace(/"/g, '&#34;') + '"';
        }

        results += (unary ? '/' : '') + '>';
      },
      end: function( tag ) {
        results += '</' + tag + '>';
      },
      chars: function( text ) {
        results += text;
      },
      comment: function( text ) {
        results += '<!--' + text + '-->';
      },
      ignore: function(text) {
        results += text;
      }
    });

    return results;
  };

  global.HTMLtoDOM = function( html, doc ) {
    // There can be only one of these elements
    var one = makeMap('html,head,body,title');

    // Enforce a structure for the document
    var structure = {
      link: 'head',
      base: 'head'
    };

    if ( !doc ) {
      if ( typeof DOMDocument !== 'undefined' ) {
        doc = new DOMDocument();
      }
      else if ( typeof document !== 'undefined' && document.implementation && document.implementation.createDocument ) {
        doc = document.implementation.createDocument('', '', null);
      }
      else if ( typeof ActiveX !== 'undefined' ) {
        doc = new ActiveXObject('Msxml.DOMDocument');
      }

    }
    else {
      doc = doc.ownerDocument ||
        doc.getOwnerDocument && doc.getOwnerDocument() ||
        doc;
    }

    var elems = [],
      documentElement = doc.documentElement ||
        doc.getDocumentElement && doc.getDocumentElement();

    // If we're dealing with an empty document then we
    // need to pre-populate it with the HTML document structure
    if ( !documentElement && doc.createElement ) {
      (function() {
        var html = doc.createElement('html');
        var head = doc.createElement('head');
        head.appendChild( doc.createElement('title') );
        html.appendChild( head );
        html.appendChild( doc.createElement('body') );
        doc.appendChild( html );
      })();
    }

    // Find all the unique elements
    if ( doc.getElementsByTagName ) {
      for ( var i in one ) {
        one[ i ] = doc.getElementsByTagName( i )[0];
      }
    }

    // If we're working with a document, inject contents into
    // the body element
    var curParentNode = one.body;

    new HTMLParser( html, {
      start: function( tagName, attrs, unary ) {
        // If it's a pre-built element, then we can ignore
        // its construction
        if ( one[ tagName ] ) {
          curParentNode = one[ tagName ];
          return;
        }

        var elem = doc.createElement( tagName );

        for ( var attr in attrs ) {
          elem.setAttribute( attrs[ attr ].name, attrs[ attr ].value );
        }

        if ( structure[ tagName ] && typeof one[ structure[ tagName ] ] !== 'boolean' ) {
          one[ structure[ tagName ] ].appendChild( elem );
        }
        else if ( curParentNode && curParentNode.appendChild ) {
          curParentNode.appendChild( elem );
        }

        if ( !unary ) {
          elems.push( elem );
          curParentNode = elem;
        }
      },
      end: function( /* tag */ ) {
        elems.length -= 1;

        // Init the new parentNode
        curParentNode = elems[ elems.length - 1 ];
      },
      chars: function( text ) {
        curParentNode.appendChild( doc.createTextNode( text ) );
      },
      comment: function( /*text*/ ) {
        // create comment node
      },
      ignore: function( /* text */ ) {
        // What to do here?
      }
    });

    return doc;
  };

  function makeMap(str) {
    var obj = {}, items = str.split(',');
    for ( var i = 0; i < items.length; i++ ) {
      obj[ items[i] ] = true;
      obj[ items[i].toUpperCase() ] = true;
    }
    return obj;
  }
})(typeof exports === 'undefined' ? this : exports);

/* global CleanCSS */

(function(global) {
  'use strict';

  var log, HTMLParser;
  if (global.console && global.console.log) {
    log = function(message) {
      // "preserving" `this`
      global.console.log(message);
    };
  }
  else {
    log = function() {};
  }

  if (global.HTMLParser) {
    HTMLParser = global.HTMLParser;
  }
  else if (typeof require === 'function') {
    HTMLParser = require('./htmlparser').HTMLParser;
  }

  var trimWhitespace = function(str) {
    if (typeof str !== 'string') {
      return str;
    }
    return str.replace(/^\s+/, '').replace(/\s+$/, '');
  };
  if (String.prototype.trim) {
    trimWhitespace = function(str) {
      if (typeof str !== 'string') {
        return str;
      }
      return str.trim();
    };
  }

  function collapseWhitespaceAll(str) {
    return str ? str.replace(/[\t\n\r ]+/g, ' ') : str;
  }

  function createMap(values) {
    var map = {};
    values.forEach(function(value) {
      map[value] = 1;
    });
    return function(value) {
      return map[value] === 1;
    };
  }

  function createMapFromString(values) {
    return createMap(values.split(/,/));
  }

  function collapseWhitespace(str, options, trimLeft, trimRight, collapseAll) {
    var lineBreakBefore = '', lineBreakAfter = '';

    if (options.preserveLineBreaks) {
      str = str.replace(/^[\t ]*[\n\r]+[\t\n\r ]*/, function() {
        lineBreakBefore = '\n';
        return '';
      }).replace(/[\t\n\r ]*[\n\r]+[\t ]*$/, function() {
        lineBreakAfter = '\n';
        return '';
      });
    }

    if (trimLeft) {
      str = str.replace(/^\s+/, !lineBreakBefore && options.conservativeCollapse ? ' ' : '');
    }

    if (trimRight) {
      str = str.replace(/\s+$/, !lineBreakAfter && options.conservativeCollapse ? ' ' : '');
    }

    if (collapseAll) {
      // strip non space whitespace then compress spaces to one
      str = collapseWhitespaceAll(str);
    }

    return lineBreakBefore + str + lineBreakAfter;
  }

  // array of non-empty element tags that will maintain a single space outside of them
  var inlineTags = createMapFromString('a,abbr,acronym,b,bdi,bdo,big,button,cite,code,del,dfn,em,font,i,ins,kbd,mark,math,q,rt,rp,s,samp,small,span,strike,strong,sub,sup,svg,time,tt,u,var');
  var selfClosingInlineTags = createMapFromString('comment,img,input');

  function collapseWhitespaceSmart(str, prevTag, nextTag, options) {
    var trimLeft = prevTag && !selfClosingInlineTags(prevTag) &&
      (options.collapseInlineTagWhitespace || prevTag.charAt(0) !== '/' || !inlineTags(prevTag.substr(1)));
    var trimRight = nextTag && !selfClosingInlineTags(nextTag) &&
      (options.collapseInlineTagWhitespace || nextTag.charAt(0) === '/' || !inlineTags(nextTag));
    return collapseWhitespace(str, options, trimLeft, trimRight, prevTag && nextTag);
  }

  function isConditionalComment(text) {
    return ((/\[if[^\]]+\]/).test(text) || (/\s*((?:<!)?\[endif\])$/).test(text));
  }

  function isIgnoredComment(text, options) {
    if (/^!/.test(text)) {
      return true;
    }

    if (options.ignoreCustomComments) {
      for (var i = 0, len = options.ignoreCustomComments.length; i < len; i++) {
        if (options.ignoreCustomComments[i].test(text)) {
          return true;
        }
      }
    }

    return false;
  }

  function isEventAttribute(attrName, options) {
    var patterns = options.customEventAttributes;
    if (patterns) {
      for (var i = patterns.length; i--;) {
        if (patterns[i].test(attrName)) {
          return true;
        }
      }
      return false;
    }
    else {
      return (/^on[a-z]{3,}$/).test(attrName);
    }
  }

  function canRemoveAttributeQuotes(value) {
    // http://mathiasbynens.be/notes/unquoted-attribute-values
    return (/^[^\x20\t\n\f\r"'`=<>]+$/).test(value);
  }

  function attributesInclude(attributes, attribute) {
    for (var i = attributes.length; i--;) {
      if (attributes[i].name.toLowerCase() === attribute) {
        return true;
      }
    }
    return false;
  }

  function isAttributeRedundant(tag, attrName, attrValue, attrs) {
    attrValue = attrValue ? trimWhitespace(attrValue.toLowerCase()) : '';

    return (
        (tag === 'script' &&
        attrName === 'language' &&
        attrValue === 'javascript') ||

        (tag === 'form' &&
        attrName === 'method' &&
        attrValue === 'get') ||

        (tag === 'input' &&
        attrName === 'type' &&
        attrValue === 'text') ||

        (tag === 'script' &&
        attrName === 'charset' &&
        !attributesInclude(attrs, 'src')) ||

        (tag === 'a' &&
        attrName === 'name' &&
        attributesInclude(attrs, 'id')) ||

        (tag === 'area' &&
        attrName === 'shape' &&
        attrValue === 'rect')
    );
  }

  function isScriptTypeAttribute(tag, attrName, attrValue) {
    return (
      tag === 'script' &&
      attrName === 'type' &&
      trimWhitespace(attrValue.toLowerCase()) === 'text/javascript'
    );
  }

  // https://mathiasbynens.be/demo/javascript-mime-type
  // https://developer.mozilla.org/en/docs/Web/HTML/Element/script#attr-type
  var executableScriptsMimetypes = createMap([
    'text/javascript',
    'text/ecmascript',
    'text/jscript',
    'application/javascript',
    'application/x-javascript',
    'application/ecmascript'
  ]);

  function isExecutableScript(tag, attrs) {
    if (tag !== 'script') {
      return false;
    }
    for (var i = 0, len = attrs.length; i < len; i++) {
      var attrName = attrs[i].name.toLowerCase();
      if (attrName === 'type') {
        var attrValue = trimWhitespace(attrs[i].value).split(/;/, 2)[0].toLowerCase();
        return attrValue === '' || executableScriptsMimetypes(attrValue);
      }
    }
    return true;
  }

  function isStyleLinkTypeAttribute(tag, attrName, attrValue) {
    return (
      (tag === 'style' || tag === 'link') &&
      attrName === 'type' &&
      trimWhitespace(attrValue.toLowerCase()) === 'text/css'
    );
  }

  var enumeratedAttributeValues = {
    draggable: ['true', 'false'] // defaults to 'auto'
  };

  function isBooleanAttribute(attrName, attrValue) {
    var isSimpleBoolean = (/^(?:allowfullscreen|async|autofocus|autoplay|checked|compact|controls|declare|default|defaultchecked|defaultmuted|defaultselected|defer|disabled|enabled|formnovalidate|hidden|indeterminate|inert|ismap|itemscope|loop|multiple|muted|nohref|noresize|noshade|novalidate|nowrap|open|pauseonexit|readonly|required|reversed|scoped|seamless|selected|sortable|truespeed|typemustmatch|visible)$/i).test(attrName);
    if (isSimpleBoolean) {
      return true;
    }

    var attrValueEnumeration = enumeratedAttributeValues[attrName.toLowerCase()];
    if (!attrValueEnumeration) {
      return false;
    }
    else {
      return (-1 === attrValueEnumeration.indexOf(attrValue.toLowerCase()));
    }
  }

  function isUriTypeAttribute(attrName, tag) {
    return (
      ((/^(?:a|area|link|base)$/).test(tag) && attrName === 'href') ||
      (tag === 'img' && (/^(?:src|longdesc|usemap)$/).test(attrName)) ||
      (tag === 'object' && (/^(?:classid|codebase|data|usemap)$/).test(attrName)) ||
      (tag === 'q' && attrName === 'cite') ||
      (tag === 'blockquote' && attrName === 'cite') ||
      ((tag === 'ins' || tag === 'del') && attrName === 'cite') ||
      (tag === 'form' && attrName === 'action') ||
      (tag === 'input' && (attrName === 'src' || attrName === 'usemap')) ||
      (tag === 'head' && attrName === 'profile') ||
      (tag === 'script' && (attrName === 'src' || attrName === 'for'))
    );
  }

  function isNumberTypeAttribute(attrName, tag) {
    return (
      ((/^(?:a|area|object|button)$/).test(tag) && attrName === 'tabindex') ||
      (tag === 'input' && (attrName === 'maxlength' || attrName === 'tabindex')) ||
      (tag === 'select' && (attrName === 'size' || attrName === 'tabindex')) ||
      (tag === 'textarea' && (/^(?:rows|cols|tabindex)$/).test(attrName)) ||
      (tag === 'colgroup' && attrName === 'span') ||
      (tag === 'col' && attrName === 'span') ||
      ((tag === 'th' || tag === 'td') && (attrName === 'rowspan' || attrName === 'colspan'))
    );
  }

  function isCanonicalURL(tag, attrs) {
    if (tag !== 'link') {
      return false;
    }
    for (var i = 0, len = attrs.length; i < len; i++) {
      if (attrs[i].name === 'rel' && attrs[i].value === 'canonical') {
        return true;
      }
    }
  }

  var fnPrefix = '!function(){';
  var fnSuffix = '}();';

  function cleanAttributeValue(tag, attrName, attrValue, options, attrs) {
    if (attrValue && isEventAttribute(attrName, options)) {
      attrValue = trimWhitespace(attrValue).replace(/^javascript:\s*/i, '').replace(/\s*;$/, '');
      if (options.minifyJS) {
        var minified = minifyJS(fnPrefix + attrValue + fnSuffix, options.minifyJS);
        return minified.slice(fnPrefix.length, -fnSuffix.length);
      }
      return attrValue;
    }
    else if (attrName === 'class') {
      return collapseWhitespaceAll(trimWhitespace(attrValue));
    }
    else if (isUriTypeAttribute(attrName, tag)) {
      attrValue = trimWhitespace(attrValue);
      if (options.minifyURLs && !isCanonicalURL(tag, attrs)) {
        return minifyURLs(attrValue, options.minifyURLs);
      }
      return attrValue;
    }
    else if (isNumberTypeAttribute(attrName, tag)) {
      return trimWhitespace(attrValue);
    }
    else if (attrName === 'style') {
      attrValue = trimWhitespace(attrValue);
      if (attrValue) {
        attrValue = attrValue.replace(/\s*;\s*$/, '');
      }
      if (options.minifyCSS) {
        return minifyCSS(attrValue, options.minifyCSS, true);
      }
      return attrValue;
    }
    else if (isMetaViewport(tag, attrs) && attrName === 'content') {
      attrValue = attrValue.replace(/\s+/g, '').replace(/[0-9]+\.[0-9]+/g, function(numString) {
        // "0.90000" -> "0.9"
        // "1.0" -> "1"
        // "1.0001" -> "1.0001" (unchanged)
        return (+numString).toString();
      });
    }
    else if (attrValue && options.customAttrCollapse && options.customAttrCollapse.test(attrName)) {
      attrValue = attrValue.replace(/\n+|\r+|\s{2,}/g, '');
    }
    return attrValue;
  }

  function isMetaViewport(tag, attrs) {
    if (tag !== 'meta') {
      return false;
    }
    for (var i = 0, len = attrs.length; i < len; i++) {
      if (attrs[i].name === 'name' && attrs[i].value === 'viewport') {
        return true;
      }
    }
  }

  // Wrap CSS declarations for CleanCSS > 3.x
  // See https://github.com/jakubpawlowicz/clean-css/issues/418
  function wrapCSS(text) {
    return '*{' + text + '}';
  }

  function unwrapCSS(text) {
    var matches = text.match(/^\*\{([\s\S]*)\}$/m);
    if (matches && matches[1]) {
      return matches[1];
    }
    else {
      return text;
    }
  }

  function cleanConditionalComment(comment) {
    return comment
      .replace(/^(\[[^\]]+\]>)\s*/, '$1')
      .replace(/\s*(<!\[endif\])$/, '$1');
  }

  function removeCDATASections(text) {
    return text
      // "/* <![CDATA[ */" or "// <![CDATA["
      .replace(/^(?:\s*\/\*\s*<!\[CDATA\[\s*\*\/|\s*\/\/\s*<!\[CDATA\[.*)/, '')
      // "/* ]]> */" or "// ]]>"
      .replace(/(?:\/\*\s*\]\]>\s*\*\/|\/\/\s*\]\]>)\s*$/, '');
  }

  function processScript(text, options, currentAttrs) {
    for (var i = 0, len = currentAttrs.length; i < len; i++) {
      if (currentAttrs[i].name.toLowerCase() === 'type' &&
          options.processScripts.indexOf(currentAttrs[i].value) > -1) {
        return minify(text, options);
      }
    }
    return text;
  }

  var reStartDelimiter = {
    // account for js + html comments (e.g.: //<!--)
    script: /^\s*(?:\/\/)?\s*<!--.*\n?/,
    style: /^\s*<!--\s*/
  };
  var reEndDelimiter = {
    script: /\s*(?:\/\/)?\s*-->\s*$/,
    style: /\s*-->\s*$/
  };
  function removeComments(text, tag) {
    return text.replace(reStartDelimiter[tag], '').replace(reEndDelimiter[tag], '');
  }

  // Tag omission rules from https://html.spec.whatwg.org/multipage/syntax.html#optional-tags
  // with the following deviations:
  // - retain <body> if followed by <noscript>
  // - </rb>, </rt>, </rtc>, </rp> & </tfoot> follow http://www.w3.org/TR/html5/syntax.html#optional-tags
  var optionalStartTags = createMapFromString('html,head,body,colgroup,tbody');
  var optionalEndTags = createMapFromString('html,head,body,li,dt,dd,p,rb,rt,rtc,rp,optgroup,option,colgroup,caption,thead,tbody,tfoot,tr,td,th');
  var headerTags = createMapFromString('meta,link,script,style,template,noscript');
  var descriptionTags = createMapFromString('dt,dd');
  var pBlockTags = createMapFromString('address,article,aside,blockquote,details,div,dl,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,main,menu,nav,ol,p,pre,section,table,ul');
  var pInlineTags = createMapFromString('a,audio,del,ins,map,noscript,video');
  var rubyTags = createMapFromString('rb,rt,rtc,rp');
  var rtcTag = createMapFromString('rb,rtc,rp');
  var optionTag = createMapFromString('option,optgroup');
  var tableContentTags = createMapFromString('tbody,tfoot');
  var tableSectionTags = createMapFromString('thead,tbody,tfoot');
  var cellTags = createMapFromString('td,th');
  var topLevelTags = createMapFromString('html,head,body');
  var compactTags = createMapFromString('html,body');
  var looseTags = createMapFromString('head,colgroup,caption');

  function canRemoveParentTag(optionalStartTag, tag) {
    switch (optionalStartTag) {
      case 'html':
      case 'head':
        return true;
      case 'body':
        return !headerTags(tag);
      case 'colgroup':
        return tag === 'col';
      case 'tbody':
        return tag === 'tr';
    }
    return false;
  }

  function isStartTagMandatory(optionalEndTag, tag) {
    switch (tag) {
      case 'colgroup':
        return optionalEndTag === 'colgroup';
      case 'tbody':
        return tableSectionTags(optionalEndTag);
    }
    return false;
  }

  function canRemovePrecedingTag(optionalEndTag, tag) {
    switch (optionalEndTag) {
      case 'html':
      case 'head':
      case 'body':
      case 'colgroup':
      case 'caption':
        return true;
      case 'li':
      case 'optgroup':
      case 'tr':
        return tag === optionalEndTag;
      case 'dt':
      case 'dd':
        return descriptionTags(tag);
      case 'p':
        return pBlockTags(tag);
      case 'rb':
      case 'rt':
      case 'rp':
        return rubyTags(tag);
      case 'rtc':
        return rtcTag(tag);
      case 'option':
        return optionTag(tag);
      case 'thead':
      case 'tbody':
        return tableContentTags(tag);
      case 'tfoot':
        return tag === 'tbody';
      case 'td':
      case 'th':
        return cellTags(tag);
    }
    return false;
  }

  var reEmptyAttribute = new RegExp(
    '^(?:class|id|style|title|lang|dir|on(?:focus|blur|change|click|dblclick|mouse(' +
      '?:down|up|over|move|out)|key(?:press|down|up)))$');

  function canDeleteEmptyAttribute(tag, attrName, attrValue) {
    var isValueEmpty = !attrValue || (/^\s*$/).test(attrValue);
    if (isValueEmpty) {
      return (
        (tag === 'input' && attrName === 'value') ||
        reEmptyAttribute.test(attrName));
    }
    return false;
  }

  function canRemoveElement(tag, attrs) {
    if (tag === 'textarea') {
      return false;
    }

    if (tag === 'script') {
      for (var i = attrs.length - 1; i >= 0; i--) {
        if (attrs[i].name === 'src') {
          return false;
        }
      }
    }

    return true;
  }

  function canCollapseWhitespace(tag) {
    return !(/^(?:script|style|pre|textarea)$/.test(tag));
  }

  function canTrimWhitespace(tag) {
    return !(/^(?:pre|textarea)$/.test(tag));
  }

  function normalizeAttribute(attr, attrs, tag, hasUnarySlash, index, options, isLast) {

    var attrName = options.caseSensitive ? attr.name : attr.name.toLowerCase(),
        attrValue = attr.value,
        attrQuote = attr.quote,
        attrFragment,
        emittedAttrValue;

    if ((options.removeRedundantAttributes &&
      isAttributeRedundant(tag, attrName, attrValue, attrs))
      ||
      (options.removeScriptTypeAttributes &&
      isScriptTypeAttribute(tag, attrName, attrValue))
      ||
      (options.removeStyleLinkTypeAttributes &&
      isStyleLinkTypeAttribute(tag, attrName, attrValue))) {
      return '';
    }

    attrValue = cleanAttributeValue(tag, attrName, attrValue, options, attrs);

    if (options.removeEmptyAttributes &&
        canDeleteEmptyAttribute(tag, attrName, attrValue)) {
      return '';
    }

    if (attrValue !== undefined && !options.removeAttributeQuotes ||
        !canRemoveAttributeQuotes(attrValue)) {
      if (!options.preventAttributesEscaping) {
        if (options.quoteCharacter !== undefined) {
          attrQuote = options.quoteCharacter === '\'' ? '\'' : '"';
        }
        else {
          var apos = (attrValue.match(/'/g) || []).length;
          var quot = (attrValue.match(/"/g) || []).length;
          attrQuote = apos < quot ? '\'' : '"';
        }
        if (attrQuote === '"') {
          attrValue = attrValue.replace(/"/g, '&#34;');
        }
        else {
          attrValue = attrValue.replace(/'/g, '&#39;');
        }
      }
      emittedAttrValue = attrQuote + attrValue + attrQuote;
      if (!isLast && !options.removeTagWhitespace) {
        emittedAttrValue += ' ';
      }
    }
    // make sure trailing slash is not interpreted as HTML self-closing tag
    else if (isLast && !hasUnarySlash && !/\/$/.test(attrValue)) {
      emittedAttrValue = attrValue;
    }
    else {
      emittedAttrValue = attrValue + ' ';
    }

    if (attrValue === undefined || (options.collapseBooleanAttributes &&
        isBooleanAttribute(attrName, attrValue))) {
      attrFragment = attrName;
      if (!isLast) {
        attrFragment += ' ';
      }
    }
    else {
      attrFragment = attrName + attr.customAssign + emittedAttrValue;
    }

    return attr.customOpen + attrFragment + attr.customClose;
  }

  function setDefaultTesters(options) {

    var defaultTesters = ['canCollapseWhitespace', 'canTrimWhitespace'];

    for (var i = 0, len = defaultTesters.length; i < len; i++) {
      if (!options[defaultTesters[i]]) {
        options[defaultTesters[i]] = function() {
          return false;
        };
      }
    }
  }

  function minifyURLs(text, options) {
    if (typeof options !== 'object') {
      options = { };
    }

    try {
      // try to get global reference first
      var __RelateUrl = global.RelateUrl;

      if (typeof __RelateUrl === 'undefined' && typeof require === 'function') {
        __RelateUrl = require('relateurl');
      }

      // noop
      if (!__RelateUrl) {
        return text;
      }

      if (__RelateUrl.relate) {
        return __RelateUrl.relate(text, options);
      }
      else {
        return text;
      }
    }
    catch (err) {
      log(err);
    }
    return text;
  }

  function minifyJS(text, options) {
    if (typeof options !== 'object') {
      options = { };
    }
    options.fromString = true;
    var outputOptions = options.output || {};
    outputOptions.inline_script = true;
    options.output = outputOptions;

    try {
      // try to get global reference first
      var __UglifyJS = global.UglifyJS;

      if (typeof __UglifyJS === 'undefined' && typeof require === 'function') {
        __UglifyJS = require('uglify-js');
      }

      // noop
      if (!__UglifyJS) {
        return text;
      }

      if (__UglifyJS.minify) {
        return __UglifyJS.minify(text, options).code;
      }
      else if (__UglifyJS.parse) {

        var ast = __UglifyJS.parse(text);
        ast.figure_out_scope();

        var compressor = __UglifyJS.Compressor();
        var compressedAst = ast.transform(compressor);

        compressedAst.figure_out_scope();
        compressedAst.compute_char_frequency();

        if (options.mangle !== false) {
          compressedAst.mangle_names();
        }

        var stream = __UglifyJS.OutputStream(options.output);
        compressedAst.print(stream);

        return stream.toString();
      }
      else {
        return text;
      }
    }
    catch (err) {
      log(err);
    }
    return text;
  }

  function minifyCSS(text, options, inline) {
    if (typeof options !== 'object') {
      options = { };
    }
    if (typeof options.advanced === 'undefined') {
      options.advanced = false;
    }
    try {
      var cleanCSS;

      if (typeof CleanCSS !== 'undefined') {
        cleanCSS = new CleanCSS(options);
      }
      else if (typeof require === 'function') {
        var CleanCSSModule = require('clean-css');
        cleanCSS = new CleanCSSModule(options);
      }
      if (inline) {
        return unwrapCSS(cleanCSS.minify(wrapCSS(text)).styles);
      }
      else {
        return cleanCSS.minify(text).styles;
      }
    }
    catch (err) {
      log(err);
    }
    return text;
  }

  function uniqueId(value) {
    var id;
    do {
      id = Math.random().toString(36).slice(2);
    } while (~value.indexOf(id));
    return id;
  }

  function minify(value, options) {

    options = options || {};
    var optionsStack = [];

    value = trimWhitespace(value);
    setDefaultTesters(options);

    var results = [ ],
        buffer = [ ],
        charsPrevTag,
        currentChars = '',
        currentTag = '',
        currentAttrs = [],
        stackNoTrimWhitespace = [],
        stackNoCollapseWhitespace = [],
        optionalStartTag = '',
        optionalEndTag = '',
        lint = options.lint,
        t = Date.now(),
        ignoredMarkupChunks = [ ],
        ignoredCustomMarkupChunks = [ ],
        uidIgnore,
        uidAttr;

    if (~value.indexOf('<!-- htmlmin:ignore -->')) {
      uidIgnore = '<!--!' + uniqueId(value) + '-->';
      // temporarily replace ignored chunks with comments,
      // so that we don't have to worry what's there.
      // for all we care there might be
      // completely-horribly-broken-alien-non-html-emoj-cthulhu-filled content
      value = value.replace(/<!-- htmlmin:ignore -->([\s\S]*?)<!-- htmlmin:ignore -->/g, function(match, group1) {
        ignoredMarkupChunks.push(group1);
        return uidIgnore;
      });
    }

    var customFragments = (options.ignoreCustomFragments || [
      /<%[\s\S]*?%>/,
      /<\?[\s\S]*?\?>/
    ]).map(function(re) {
      return re.source;
    });
    if (customFragments.length) {
      var reCustomIgnore = new RegExp('\\s*(?:' + customFragments.join('|') + ')\\s*', 'g');
      // temporarily replace custom ignored fragments with unique attributes
      value = value.replace(reCustomIgnore, function(match) {
        if (!uidAttr) {
          uidAttr = uniqueId(value);
        }
        ignoredCustomMarkupChunks.push(match);
        return ' ' + uidAttr + ' ';
      });
    }

    function _canCollapseWhitespace(tag, attrs) {
      return canCollapseWhitespace(tag) || options.canCollapseWhitespace(tag, attrs);
    }

    function _canTrimWhitespace(tag, attrs) {
      return canTrimWhitespace(tag) || options.canTrimWhitespace(tag, attrs);
    }

    function removeStartTag() {
      var index = buffer.length - 1;
      while (index > 0 && !/^<[^/!]/.test(buffer[index])) {
        index--;
      }
      buffer.length = Math.max(0, index);
    }

    function removeEndTag() {
      var index = buffer.length - 1;
      while (index > 0 && !/^<\//.test(buffer[index])) {
        index--;
      }
      buffer.length = index;
    }

    new HTMLParser(value, {
      html5: typeof options.html5 !== 'undefined' ? options.html5 : true,

      start: function(tag, attrs, unary, unarySlash) {
        var lowerTag = tag.toLowerCase();

        if (lowerTag === 'svg') {
          optionsStack.push(options);
          var nextOptions = {};
          for (var key in options) {
            nextOptions[key] = options[key];
          }
          nextOptions.keepClosingSlash = true;
          nextOptions.caseSensitive = true;
          options = nextOptions;
        }

        tag = options.caseSensitive ? tag : lowerTag;

        currentTag = tag;
        charsPrevTag = tag;
        currentChars = '';
        currentAttrs = attrs;

        var optional = options.removeOptionalTags;
        if (optional) {
          // <html> may be omitted if first thing inside is not comment
          // <head> may be omitted if first thing inside is an element
          // <body> may be omitted if first thing inside is not space, comment, <meta>, <link>, <script>, <style> or <template>
          // <colgroup> may be omitted if first thing inside is <col>
          // <tbody> may be omitted if first thing inside is <tr>
          if (canRemoveParentTag(optionalStartTag, tag)) {
            removeStartTag();
          }
          optionalStartTag = '';
          // end-tag-followed-by-start-tag omission rules
          if (canRemovePrecedingTag(optionalEndTag, tag)) {
            removeEndTag();
            // <colgroup> cannot be omitted if preceding </colgroup> is omitted
            // <tbody> cannot be omitted if preceding </tbody>, </thead> or </tfoot> is omitted
            optional = !isStartTagMandatory(optionalEndTag, tag);
          }
          optionalEndTag = '';
        }

        // set whitespace flags for nested tags (eg. <code> within a <pre>)
        if (options.collapseWhitespace) {
          if (!_canTrimWhitespace(tag, attrs)) {
            stackNoTrimWhitespace.push(tag);
          }
          if (!_canCollapseWhitespace(tag, attrs)) {
            stackNoCollapseWhitespace.push(tag);
          }
        }

        var openTag = '<' + tag;
        var hasUnarySlash = unarySlash && options.keepClosingSlash;

        buffer.push(openTag);

        if (lint) {
          lint.testElement(tag);
        }

        var parts = [ ];
        var token, isLast = true;
        for (var i = attrs.length; --i >= 0; ) {
          if (lint) {
            lint.testAttribute(tag, attrs[i].name.toLowerCase(), attrs[i].value);
          }
          token = normalizeAttribute(attrs[i], attrs, tag, hasUnarySlash, i, options, isLast);
          if (token) {
            isLast = false;
            parts.unshift(token);
          }
        }
        if (parts.length > 0) {
          buffer.push(' ');
          buffer.push.apply(buffer, parts);
        }
        // start tag must never be omitted if it has any attributes
        else if (optional && optionalStartTags(tag)) {
          optionalStartTag = tag;
        }

        buffer.push(buffer.pop() + (hasUnarySlash ? '/' : '') + '>');
      },
      end: function(tag, attrs) {
        var lowerTag = tag.toLowerCase();
        if (lowerTag === 'svg') {
          options = optionsStack.pop();
        }

        tag = options.caseSensitive ? tag : lowerTag;

        if (options.removeOptionalTags) {
          // </html> or </body> may be omitted if not followed by comment
          // </head> may be omitted if not followed by space or comment
          // </p> may be omitted if no more content in non-</a> parent
          // except for </dt> or </thead>, end tags may be omitted if no more content in parent element
          if (optionalEndTag && optionalEndTag !== 'dt' && optionalEndTag !== 'thead' && (optionalEndTag !== 'p' || !pInlineTags(tag))) {
            removeEndTag();
          }
          optionalEndTag = optionalEndTags(tag) ? tag : '';
        }

        // check if current tag is in a whitespace stack
        if (options.collapseWhitespace) {
          if (stackNoTrimWhitespace.length) {
            if (tag === stackNoTrimWhitespace[stackNoTrimWhitespace.length - 1]) {
              stackNoTrimWhitespace.pop();
            }
          }
          else {
            var charsIndex;
            if (buffer.length > 1 && buffer[buffer.length - 1] === '' && /\s+$/.test(buffer[buffer.length - 2])) {
              charsIndex = buffer.length - 2;
            }
            else if (buffer.length > 0 && /\s+$/.test(buffer[buffer.length - 1])) {
              charsIndex = buffer.length - 1;
            }
            if (charsIndex > 0) {
              buffer[charsIndex] = buffer[charsIndex].replace(/\s+$/, function(text) {
                return collapseWhitespaceSmart(text, 'comment', '/' + tag, options);
              });
            }
          }
          if (stackNoCollapseWhitespace.length &&
            tag === stackNoCollapseWhitespace[stackNoCollapseWhitespace.length - 1]) {
            stackNoCollapseWhitespace.pop();
          }
        }

        var isElementEmpty = false;
        if (tag === currentTag) {
          currentTag = '';
          isElementEmpty = currentChars === '';
        }
        if (options.removeEmptyElements && isElementEmpty && canRemoveElement(tag, attrs)) {
          // remove last "element" from buffer
          removeStartTag();
          optionalStartTag = '';
          optionalEndTag = '';
        }
        else {
          // push out everything but the end tag
          results.push.apply(results, buffer);
          buffer = ['</' + tag + '>'];
          charsPrevTag = '/' + tag;
          currentChars = '';
        }
      },
      chars: function(text, prevTag, nextTag) {
        prevTag = prevTag === '' ? 'comment' : prevTag;
        nextTag = nextTag === '' ? 'comment' : nextTag;
        if (options.collapseWhitespace) {
          if (!stackNoTrimWhitespace.length) {
            if (prevTag === 'comment') {
              var removed = buffer[buffer.length - 1] === '';
              if (removed) {
                prevTag = charsPrevTag;
              }
              if (buffer.length > 1 && (removed || currentChars.charAt(currentChars.length - 1) === ' ')) {
                var charsIndex = buffer.length - 2;
                buffer[charsIndex] = buffer[charsIndex].replace(/\s+$/, function(trailingSpaces) {
                  text = trailingSpaces + text;
                  return '';
                });
              }
            }
            text = prevTag || nextTag ? collapseWhitespaceSmart(text, prevTag, nextTag, options) : trimWhitespace(text);
          }
          if (!stackNoCollapseWhitespace.length) {
            text = prevTag && nextTag || nextTag === 'html' ? text : collapseWhitespaceAll(text);
          }
        }
        if (currentTag === 'script' || currentTag === 'style') {
          if (options.removeCommentsFromCDATA) {
            text = removeComments(text, currentTag);
          }
          if (options.removeCDATASectionsFromCDATA) {
            text = removeCDATASections(text);
          }
          if (options.processScripts) {
            text = processScript(text, options, currentAttrs);
          }
        }
        if (options.minifyJS && isExecutableScript(currentTag, currentAttrs)) {
          text = minifyJS(text, options.minifyJS);
          if (text.charAt(text.length - 1) === ';') {
            text = text.slice(0, -1);
          }
        }
        if (currentTag === 'style' && options.minifyCSS) {
          text = minifyCSS(text, options.minifyCSS);
        }
        if (options.removeOptionalTags && text) {
          // <html> may be omitted if first thing inside is not comment
          // <body> may be omitted if first thing inside is not space, comment, <meta>, <link>, <script>, <style> or <template>
          if (optionalStartTag === 'html' || optionalStartTag === 'body' && !/^\s/.test(text)) {
            removeStartTag();
          }
          optionalStartTag = '';
          // </html> or </body> may be omitted if not followed by comment
          // </head>, </colgroup> or </caption> may be omitted if not followed by space or comment
          if (compactTags(optionalEndTag) || looseTags(optionalEndTag) && !/^\s/.test(text)) {
            removeEndTag();
          }
          optionalEndTag = '';
        }
        charsPrevTag = /^\s*$/.test(text) ? prevTag : 'comment';
        currentChars += text;
        if (lint) {
          lint.testChars(text);
        }
        buffer.push(text);
      },
      comment: function(text, nonStandard) {
        var prefix = nonStandard ? '<!' : '<!--';
        var suffix = nonStandard ? '>' : '-->';
        if (options.removeComments) {
          if (isConditionalComment(text)) {
            text = prefix + cleanConditionalComment(text) + suffix;
          }
          else if (isIgnoredComment(text, options)) {
            text = '<!--' + text + '-->';
          }
          else {
            text = '';
          }
        }
        else {
          text = prefix + text + suffix;
        }
        if (options.removeOptionalTags && text) {
          // preceding comments suppress tag omissions
          optionalStartTag = '';
          optionalEndTag = '';
        }
        buffer.push(text);
      },
      doctype: function(doctype) {
        buffer.push(options.useShortDoctype ? '<!DOCTYPE html>' : collapseWhitespaceAll(doctype));
      },
      customAttrAssign: options.customAttrAssign,
      customAttrSurround: options.customAttrSurround
    });

    if (options.removeOptionalTags) {
      // <html> may be omitted if first thing inside is not comment
      // <head> or <body> may be omitted if empty
      if (topLevelTags(optionalStartTag)) {
        removeStartTag();
      }
      // except for </dt> or </thead>, end tags may be omitted if no more content in parent element
      if (optionalEndTag && optionalEndTag !== 'dt' && optionalEndTag !== 'thead') {
        removeEndTag();
      }
    }

    results.push.apply(results, buffer);
    var str = joinResultSegments(results, options);

    if (uidAttr) {
      str = str.replace(new RegExp('(\\s*)' + uidAttr + '(\\s*)', 'g'), function(match, prefix, suffix) {
        var chunk = ignoredCustomMarkupChunks.shift();
        return options.collapseWhitespace ? collapseWhitespace(prefix + chunk + suffix, {
          preserveLineBreaks: options.preserveLineBreaks,
          conservativeCollapse: true
        }, true, true) : chunk;
      });
    }
    if (uidIgnore) {
      str = str.replace(new RegExp(uidIgnore, 'g'), function() {
        return ignoredMarkupChunks.shift();
      });
    }

    log('minified in: ' + (Date.now() - t) + 'ms');
    return str;
  }

  function joinResultSegments(results, options) {
    var str;
    var maxLineLength = options.maxLineLength;
    if (maxLineLength) {
      var token;
      var lines = [];
      var line = '';
      for (var i = 0, len = results.length; i < len; i++) {
        token = results[i];
        if (line.length + token.length < maxLineLength) {
          line += token;
        }
        else {
          lines.push(line.replace(/^\n/, ''));
          line = token;
        }
      }
      lines.push(line);

      str = lines.join('\n');
    }
    else {
      str = results.join('');
    }

    return trimWhitespace(str);
  }

  // for CommonJS enviroments, export everything
  if (typeof exports !== 'undefined') {
    exports.minify = minify;
  }
  else {
    global.minify = minify;
  }

}(typeof exports === 'undefined' ? this : exports));

/*!
 * HTMLLint (to be used in conjunction with HTMLMinifier)
 *
 * Copyright (c) 2010-2013 Juriy "kangax" Zaytsev
 * Licensed under the MIT license.
 *
 */

(function(global) {
  'use strict';

  function isPresentationalElement(tag) {
    return (/^(?:big|small|hr|blink|marquee)$/).test(tag);
  }
  function isDeprecatedElement(tag) {
    return (/^(?:applet|basefont|center|dir|font|isindex|strike)$/).test(tag);
  }
  function isEventAttribute(attrName) {
    return (/^on[a-z]+/).test(attrName);
  }
  function isStyleAttribute(attrName) {
    return (attrName.toLowerCase() === 'style');
  }
  function isDeprecatedAttribute(tag, attrName) {
    return (
      (attrName === 'align' &&
      (/^(?:caption|applet|iframe|img|imput|object|legend|table|hr|div|h[1-6]|p)$/).test(tag)) ||
      (attrName === 'alink' && tag === 'body') ||
      (attrName === 'alt' && tag === 'applet') ||
      (attrName === 'archive' && tag === 'applet') ||
      (attrName === 'background' && tag === 'body') ||
      (attrName === 'bgcolor' && (/^(?:table|t[rdh]|body)$/).test(tag)) ||
      (attrName === 'border' && (/^(?:img|object)$/).test(tag)) ||
      (attrName === 'clear' && tag === 'br') ||
      (attrName === 'code' && tag === 'applet') ||
      (attrName === 'codebase' && tag === 'applet') ||
      (attrName === 'color' && (/^(?:base(?:font)?)$/).test(tag)) ||
      (attrName === 'compact' && (/^(?:dir|[dou]l|menu)$/).test(tag)) ||
      (attrName === 'face' && (/^base(?:font)?$/).test(tag)) ||
      (attrName === 'height' && (/^(?:t[dh]|applet)$/).test(tag)) ||
      (attrName === 'hspace' && (/^(?:applet|img|object)$/).test(tag)) ||
      (attrName === 'language' && tag === 'script') ||
      (attrName === 'link' && tag === 'body') ||
      (attrName === 'name' && tag === 'applet') ||
      (attrName === 'noshade' && tag === 'hr') ||
      (attrName === 'nowrap' && (/^t[dh]$/).test(tag)) ||
      (attrName === 'object' && tag === 'applet') ||
      (attrName === 'prompt' && tag === 'isindex') ||
      (attrName === 'size' && (/^(?:hr|font|basefont)$/).test(tag)) ||
      (attrName === 'start' && tag === 'ol') ||
      (attrName === 'text' && tag === 'body') ||
      (attrName === 'type' && (/^(?:li|ol|ul)$/).test(tag)) ||
      (attrName === 'value' && tag === 'li') ||
      (attrName === 'version' && tag === 'html') ||
      (attrName === 'vlink' && tag === 'body') ||
      (attrName === 'vspace' && (/^(?:applet|img|object)$/).test(tag)) ||
      (attrName === 'width' && (/^(?:hr|td|th|applet|pre)$/).test(tag))
    );
  }
  function isInaccessibleAttribute(attrName, attrValue) {
    return (
      attrName === 'href' &&
      (/^\s*javascript\s*:\s*void\s*(\s+0|\(\s*0\s*\))\s*$/i).test(attrValue)
    );
  }

  function Lint() {
    this.log = [ ];
    this._lastElement = null;
    this._isElementRepeated = false;
  }

  Lint.prototype.testElement = function(tag) {
    if (isDeprecatedElement(tag)) {
      this.log.push(
        'Found <span class="deprecated-element">deprecated</span> <strong><code>&lt;' +
          tag + '&gt;</code></strong> element'
      );
    }
    else if (isPresentationalElement(tag)) {
      this.log.push(
        'Found <span class="presentational-element">presentational</span> <strong><code>&lt;' +
          tag + '&gt;</code></strong> element'
      );
    }
    else {
      this.checkRepeatingElement(tag);
    }
  };

  Lint.prototype.checkRepeatingElement = function(tag) {
    if (tag === 'br' && this._lastElement === 'br') {
      this._isElementRepeated = true;
    }
    else if (this._isElementRepeated) {
      this._reportRepeatingElement();
      this._isElementRepeated = false;
    }
    this._lastElement = tag;
  };

  Lint.prototype._reportRepeatingElement = function() {
    this.log.push('Found <code>&lt;br></code> sequence. Try replacing it with styling.');
  };

  Lint.prototype.testAttribute = function(tag, attrName, attrValue) {
    if (isEventAttribute(attrName)) {
      this.log.push(
        'Found <span class="event-attribute">event attribute</span> (<strong>' +
        attrName + '</strong>) on <strong><code>&lt;' + tag + '&gt;</code></strong> element.'
      );
    }
    else if (isDeprecatedAttribute(tag, attrName)) {
      this.log.push(
        'Found <span class="deprecated-attribute">deprecated</span> <strong>' +
          attrName + '</strong> attribute on <strong><code>&lt;' + tag + '&gt;</code></strong> element.'
      );
    }
    else if (isStyleAttribute(attrName)) {
      this.log.push(
        'Found <span class="style-attribute">style attribute</span> on <strong><code>&lt;' +
          tag + '&gt;</code></strong> element.'
      );
    }
    else if (isInaccessibleAttribute(attrName, attrValue)) {
      this.log.push(
        'Found <span class="inaccessible-attribute">inaccessible attribute</span> ' +
          '(on <strong><code>&lt;' + tag + '&gt;</code></strong> element).'
      );
    }
  };

  Lint.prototype.testChars = function(chars) {
    this._lastElement = '';
    if (/(&nbsp;\s*){2,}/.test(chars)) {
      this.log.push('Found repeating <strong><code>&amp;nbsp;</code></strong> sequence. Try replacing it with styling.');
    }
  };

  Lint.prototype.test = function(tag, attrName, attrValue) {
    this.testElement(tag);
    this.testAttribute(tag, attrName, attrValue);
  };

  Lint.prototype.populate = function(writeToElement) {
    if (this._isElementRepeated) {
      this._reportRepeatingElement();
    }

    if (this.log.length) {
      if (writeToElement) {
        writeToElement.innerHTML = '<ol><li>' + this.log.join('<li>') + '</ol>';
      }
      else {
        var output = ' - ' +
          this.log.join('\n - ')
          .replace(/(<([^>]+)>)/ig, '')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>');

        console.log(output);
      }
    }
  };

  global.HTMLLint = Lint;

})(typeof exports === 'undefined' ? this : exports);
