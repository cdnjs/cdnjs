/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2013 Einar Lielmanis and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.


 CSS Beautifier
---------------

    Written by Harutyun Amirjanyan, (amirjanyan@gmail.com)

    Based on code initially developed by: Einar Lielmanis, <elfz@laacz.lv>
        http://jsbeautifier.org/

    Usage:
        css_beautify(source_text);
        css_beautify(source_text, options);

    The options are:
        indent_size (default 4)          — indentation size,
        indent_char (default space)      — character to indent with,

    e.g

    css_beautify(css_source_text, {
      'indent_size': 1,
      'indent_char': '\t'
    });
*/

// http://www.w3.org/TR/CSS21/syndata.html#tokenization
// http://www.w3.org/TR/css3-syntax/

(function() {
    function css_beautify(source_text, options) {
        options = options || {};
        var indentSize = options.indent_size || 4;
        var indentCharacter = options.indent_char || ' ';

        // compatibility
        if (typeof indentSize === "string") {
            indentSize = parseInt(indentSize, 10);
        }


        // tokenizer
        var whiteRe = /^\s+$/;
        var wordRe = /[\w$\-_]/;

        var pos = -1, ch;
        function next() {
            ch = source_text.charAt(++pos);
            return ch;
        }
        function peek() {
            return source_text.charAt(pos+1);
        }
        function eatString(comma) {
            var start = pos;
            while(next()){
                if (ch === "\\"){
                    next();
                    next();
                } else if (ch === comma) {
                    break;
                } else if (ch === "\n") {
                    break;
                }
            }
            return source_text.substring(start, pos + 1);
        }

        function eatWhitespace() {
            var start = pos;
            while (whiteRe.test(peek())) {
                pos++;
            }
            return pos !== start;
        }

        function skipWhitespace() {
            var start = pos;
            do{
            }while (whiteRe.test(next()));
            return pos !== start + 1;
        }

        function eatComment() {
            var start = pos;
            next();
            while (next()) {
                if (ch === "*" && peek() === "/") {
                    pos ++;
                    break;
                }
            }

            return source_text.substring(start, pos + 1);
        }


        function lookBack(str) {
            return source_text.substring(pos-str.length, pos).toLowerCase() === str;
        }

        // printer
        var indentString = source_text.match(/^[\r\n]*[\t ]*/)[0];
        var singleIndent = Array(indentSize + 1).join(indentCharacter);
        var indentLevel = 0;
        function indent() {
            indentLevel++;
            indentString += singleIndent;
        }
        function outdent() {
            indentLevel--;
            indentString = indentString.slice(0, -indentSize);
        }

        var print = {};
        print["{"] = function(ch) {
            print.singleSpace();
            output.push(ch);
            print.newLine();
        };
        print["}"] = function(ch) {
            print.newLine();
            output.push(ch);
            print.newLine();
        };

        print.newLine = function(keepWhitespace) {
            if (!keepWhitespace) {
                while (whiteRe.test(output[output.length - 1])) {
                    output.pop();
                }
            }

            if (output.length) {
                output.push('\n');
            }
            if (indentString) {
                output.push(indentString);
            }
        };
        print.singleSpace = function() {
            if (output.length && !whiteRe.test(output[output.length - 1])) {
                output.push(' ');
            }
        };
        var output = [];
        if (indentString) {
            output.push(indentString);
        }
        /*_____________________--------------------_____________________*/

        while(true) {
            var isAfterSpace = skipWhitespace();

            if (!ch) {
                break;
            }


            if (ch === '{') {
                indent();
                print["{"](ch);
            } else if (ch === '}') {
                outdent();
                print["}"](ch);
            } else if (ch === '"' || ch === '\'') {
                output.push(eatString(ch));
            } else if (ch === ';') {
                output.push(ch, '\n', indentString);
            } else if (ch === '/' && peek() === '*') { // comment
                print.newLine();
                output.push(eatComment(), "\n", indentString);
            } else if (ch === '(') { // may be a url
                if (lookBack("url")) {
                  output.push(ch);
                  eatWhitespace();
                  if (next()) {
                    if (ch !== ')' && ch !== '"' && ch !== '\'') {
                        output.push(eatString(')'));
                    } else {
                        pos--;
                    }
                  }
                } else {
                  if (isAfterSpace) {
                      print.singleSpace();
                  }
                  output.push(ch);
                  eatWhitespace();
                }
            } else if (ch === ')') {
                output.push(ch);
            } else if (ch === ',') {
                eatWhitespace();
                output.push(ch);
                print.singleSpace();
            } else if (ch === ']') {
                output.push(ch);
            }  else if (ch === '[' || ch === '=') { // no whitespace before or after
                eatWhitespace();
                output.push(ch);
            } else {
                if (isAfterSpace) {
                    print.singleSpace();
                }

                output.push(ch);
            }
        }


        var sweetCode = output.join('').replace(/[\n ]+$/, '');
        return sweetCode;
    }

    if (typeof define === "function") {
        // Add support for require.js
        define(function(require, exports, module) {
            exports.css_beautify = css_beautify;
        });
    } else if (typeof exports !== "undefined") {
        // Add support for CommonJS. Just put this file somewhere on your require.paths
        // and you will be able to `var html_beautify = require("beautify").html_beautify`.
        exports.css_beautify = css_beautify;
    } else if (typeof window !== "undefined") {
        // If we're running a web page and don't have either of the above, add our one global
        window.css_beautify = css_beautify;
    } else if (typeof global !== "undefined") {
        // If we don't even have window, try global.
        global.css_beautify = css_beautify;
    }

}());
