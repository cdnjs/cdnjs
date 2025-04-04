'use strict';

var TYPE_STRING = 'string';
var TYPE_EXPRESSION = 'expression';
var TYPE_RAW = 'raw';
var TYPE_ESCAPE = 'escape';

function wrapString(token) {
    var value = new String(token.value);
    value.line = token.line;
    value.start = token.start;
    value.end = token.end;
    return value;
}

function Token(type, value, prevToken) {
    this.type = type;
    this.value = value;
    this.script = null;

    if (prevToken) {
        this.line = prevToken.line + prevToken.value.split(/\n/).length - 1;
        if (this.line === prevToken.line) {
            this.start = prevToken.end;
        } else {
            this.start = prevToken.value.length - prevToken.value.lastIndexOf('\n') - 1;
        }
    } else {
        this.line = 0;
        this.start = 0;
    }

    this.end = this.start + this.value.length;
}

/**
 * 将模板转换为 Tokens
 * @param {string}      source
 * @param {Object[]}    rules     @see defaults.rules
 * @param {Object}      context
 * @return {Object[]}
 */
var tplTokenizer = function tplTokenizer(source, rules) {
    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var tokens = [new Token(TYPE_STRING, source)];

    for (var i = 0; i < rules.length; i++) {
        var rule = rules[i];
        var flags = rule.test.ignoreCase ? 'ig' : 'g';
        var regexp = new RegExp(rule.test.source, flags);

        for (var _i = 0; _i < tokens.length; _i++) {
            var token = tokens[_i];
            var prevToken = tokens[_i - 1];

            if (token.type !== TYPE_STRING) {
                continue;
            }

            var match = void 0,
                index = 0;
            var substitute = [];
            var value = token.value;

            while ((match = regexp.exec(value)) !== null) {
                if (match.index > index) {
                    prevToken = new Token(TYPE_STRING, value.slice(index, match.index), prevToken);
                    substitute.push(prevToken);
                }

                prevToken = new Token(TYPE_EXPRESSION, match[0], prevToken);
                match[0] = wrapString(prevToken);
                prevToken.script = rule.use.apply(context, match);
                substitute.push(prevToken);

                index = match.index + match[0].length;
            }

            if (index < value.length) {
                prevToken = new Token(TYPE_STRING, value.slice(index), prevToken);
                substitute.push(prevToken);
            }

            tokens.splice.apply(tokens, [_i, 1].concat(substitute));
            _i += substitute.length - 1;
        }
    }

    return tokens;
};

tplTokenizer.TYPE_STRING = TYPE_STRING;
tplTokenizer.TYPE_EXPRESSION = TYPE_EXPRESSION;
tplTokenizer.TYPE_RAW = TYPE_RAW;
tplTokenizer.TYPE_ESCAPE = TYPE_ESCAPE;

module.exports = tplTokenizer;