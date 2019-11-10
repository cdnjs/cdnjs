/*!
 * angular-datatables - v0.4.3
 * https://github.com/l-lin/angular-datatables
 * License: MIT
 */
!function(a,b,c,d){"use strict";function e(a,b){function c(a){function c(a,c){function d(){var a="S";return e.dom=e.dom?e.dom:b.dom,-1===e.dom.indexOf(a)&&(e.dom=e.dom+a),e}var e=a(c);return e.withScroller=d,e}var d=a.newOptions,e=a.fromSource,f=a.fromFnPromise;return a.newOptions=function(){return c(d)},a.fromSource=function(a){return c(e,a)},a.fromFnPromise=function(a){return c(f,a)},a}a.decorator("DTOptionsBuilder",c),c.$inject=["$delegate"]}d.module("datatables.scroller",["datatables"]).config(e),e.$inject=["$provide","DT_DEFAULT_OPTIONS"]}(window,document,jQuery,angular);