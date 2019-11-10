/*!
 * angular-datatables - v0.4.3
 * https://github.com/l-lin/angular-datatables
 * License: MIT
 */
!function(a,b,c,d){"use strict";function e(a,b){function c(a){function c(a,c){function e(){var a="C";return h.dom=h.dom?h.dom:b.dom,-1===h.dom.indexOf(a)&&(h.dom=a+h.dom),h.hasColVis=!0,h}function f(a,b){return d.isString(a)&&(h.oColVis=h.oColVis&&null!==h.oColVis?h.oColVis:{},h.oColVis[a]=b),h}function g(a){if(!d.isFunction(a))throw new Error("The state change must be a function");return h.withColVisOption("fnStateChange",a),h}var h=a(c);return h.withColVis=e,h.withColVisOption=f,h.withColVisStateChange=g,h}var e=a.newOptions,f=a.fromSource,g=a.fromFnPromise;return a.newOptions=function(){return c(e)},a.fromSource=function(a){return c(f,a)},a.fromFnPromise=function(a){return c(g,a)},a}a.decorator("DTOptionsBuilder",c),c.$inject=["$delegate"]}d.module("datatables.colvis",["datatables"]).config(e),e.$inject=["$provide","DT_DEFAULT_OPTIONS"]}(window,document,jQuery,angular);