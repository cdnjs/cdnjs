/*!
 * angular-datatables - v0.5.3
 * https://github.com/l-lin/angular-datatables
 * License: MIT
 */
"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="datatables.columnfilter"),function(a,b,c,d){"use strict";function e(a){function b(a){function b(a,b){function c(a){return d.hasColumnFilter=!0,a&&(d.columnFilterOptions=a),d}var d=a(b);return d.withColumnFilter=c,d}var c=a.newOptions,d=a.fromSource,e=a.fromFnPromise;return a.newOptions=function(){return b(c)},a.fromSource=function(a){return b(d,a)},a.fromFnPromise=function(a){return b(e,a)},a}a.decorator("DTOptionsBuilder",b),b.$inject=["$delegate"]}function f(a){function b(a,b){a&&a.hasColumnFilter&&b.dataTable.columnFilter(a.columnFilterOptions)}var c={postRender:b};a.registerPlugin(c)}d.module("datatables.columnfilter",["datatables"]).config(e).run(f),e.$inject=["$provide"],f.$inject=["DTRendererService"]}(window,document,jQuery,angular);