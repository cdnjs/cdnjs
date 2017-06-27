/*!
 * angular-datatables - v0.5.3
 * https://github.com/l-lin/angular-datatables
 * License: MIT
 */
"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="datatables.fixedheader"),function(a,b,c,d){"use strict";function e(a){function b(a){function b(a,b){function c(a){return d.hasFixedHeader=!0,a&&(d.fixedHeaderOptions=a),d}var d=a(b);return d.withFixedHeader=c,d}var c=a.newOptions,d=a.fromSource,e=a.fromFnPromise;return a.newOptions=function(){return b(c)},a.fromSource=function(a){return b(d,a)},a.fromFnPromise=function(a){return b(e,a)},a}a.decorator("DTOptionsBuilder",b),b.$inject=["$delegate"]}function f(a){function b(a,b){a&&a.hasFixedHeader&&new c.fn.dataTable.FixedHeader(b.DataTable,a.fixedHeaderOptions)}var d={postRender:b};a.registerPlugin(d)}d.module("datatables.fixedheader",["datatables"]).config(e).run(f),e.$inject=["$provide"],f.$inject=["DTRendererService"]}(window,document,jQuery,angular);