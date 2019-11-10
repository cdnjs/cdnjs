/*! /base 2.0.0 | http://nucleus.qoopido.com | (c) 2016 Dirk Lueth */
!function(){"use strict";function t(t){function e(){}var r=Object.create,n=Object.defineProperty,o=Object.getOwnPropertyDescriptor,c=Object.getOwnPropertyNames;return e.extend=function(e){var i=this,p=e.prototype,u={};return c(p).forEach(function(t){u[t]=o(p,t)}),u.constructor=t(e),e.prototype=r(i.prototype||i,u),!e["final"]&&n(e,"extend",t(i.extend,!0)),e},e}provide(["./function/descriptor/generate"],t)}();
//# sourceMappingURL=base.js.map
