/*! HTML - v0.10.0 - 2013-08-25
* http://nbubna.github.io/HTML/
* Copyright (c) 2013 ESHA Research; Licensed MIT, GPL */
(function(window, document, HTML) {
    "use strict";

    var fn = HTML._.fn.stringify = function(markup, indent) {
        var s = '';
        this.each(function(el) {
            s += _.print(el, markup||false, indent||'');
        });
        return s;
    },
    _ = fn._ = {
        map: Array.prototype.map,
        specialPrefix: '_',
        markup: {
            '\n': '<br>',
            '<': '<span class="markup">&lt;</span>',
            '>': '<span class="markup">&gt;</span>',
            '</': '<span class="markup">&lt;/</span>',
            '\t': '&nbsp;&nbsp;&nbsp;&nbsp;'
        },
        plain: {
            '\n': '\n',
            '<': '<',
            '>': '>',
            '</': '</',
            '/>': '/>',
            '\t': '    '
        },
        type: {
            attr: 'attr',
            string: 'string',
            tag: 'tag',
        },
        print: function(el, markup, indent) {
            var tag = el.tagName.toLowerCase(),
                code = markup ? _.markup : _.plain,
                line = _.isInline(el) ? '' : code['\n'],
                content = _.content(el, markup, indent+code['\t'], line),
                attrs = _.attrs(el, markup),
                special = markup ? _.special(el) : [];

            if (markup) {
                tag = _.mark(tag, _.type.tag);
            }
            var open = _.mark(code['<'] + tag + (attrs ? ' '+attrs : '') + code['>'], special),
                close = _.mark(code['</'] + tag + code['>'], special);
            if (content && line) {
                content = line + content + line + indent;
            }
            return indent + open + content + close;
        },
        isInline: function(el) {
            return (el.currentStyle || window.getComputedStyle(el,'')).display === 'inline' ||
                el.tagName.match(/^(H\d|LI)$/i);
        },
        content: function(el, markup, indent, line) {
            var s = [];
            for (var i=0, m= el.childNodes.length; i<m; i++) {
                var node = el.childNodes[i];
                if (node.tagName) {
                    s.push(_.print(node, markup, line ? indent : ''));
                } else if (node.nodeType === 3) {
                    var text = node.textContent.replace(/^\s+|\s+$/g, ' ');
                    if (text.match(/[^\s]/)) {
                        s.push(text);
                    }
                }
            }
            return s.join(line);
        },
        attrs: function(el, markup) {
            return _.map.call(el.attributes, function(attr) {
                var name = attr.nodeName,
                    value = attr.nodeValue;
                if (!markup || name.indexOf(_.specialPrefix) !== 0) {
                    return markup ? _.mark(name+'=', _.type.attr) + _.mark('"'+value+'"', _.type.string)
                                  : name+'="'+value+'"';
                }
            }).filter(_.notEmpty).join(' ');
        },
        special: function(el) {
            return _.map.call(el.attributes, function(attr) {
                var name = attr.nodeName;
                if (name.indexOf(_.specialPrefix) === 0) {
                    return name.substr(1)+'="'+attr.nodeValue+'"';
                }
            }).filter(_.notEmpty);
        },
        mark: function(value, attrs) {
            if (attrs.length) {
                if (typeof attrs === "string"){ attrs = ['class="'+attrs+'"']; }
                return '<span '+attrs.join(' ')+'>'+value+'</span>';
            }
            return value;
        },
        notEmpty: function(s) {
            return s !== undefined && s !== null && s !== '';
        }
    };

})(window, document, document.documentElement);
