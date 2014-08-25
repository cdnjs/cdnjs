/*!

 handlebars v1.2.0

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/

define("lib/handlebars.js", 
  ["./handlebars.runtime","./handlebars/compiler/ast","./handlebars/compiler/base","./handlebars/compiler/compiler","./handlebars/compiler/javascript-compiler","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    
    /*globals Handlebars: true */
    var Handlebars = __dependency1__["default"];

    // Compiler imports
    var AST = __dependency2__["default"];
    var Parser = __dependency3__.parser;
    var parse = __dependency3__.parse;
    var Compiler = __dependency4__.Compiler;
    var compile = __dependency4__.compile;
    var precompile = __dependency4__.precompile;
    var JavaScriptCompiler = __dependency5__["default"];

    var _create = Handlebars.create;
    var create = function() {
      var hb = _create();

      hb.compile = function(input, options) {
        return compile(input, options, hb);
      };
      hb.precompile = precompile;

      hb.AST = AST;
      hb.Compiler = Compiler;
      hb.JavaScriptCompiler = JavaScriptCompiler;
      hb.Parser = Parser;
      hb.parse = parse;

      return hb;
    };

    Handlebars = create();
    Handlebars.create = create;

    __exports__["default"] = Handlebars;
  });
define("handlebars", function(){});
