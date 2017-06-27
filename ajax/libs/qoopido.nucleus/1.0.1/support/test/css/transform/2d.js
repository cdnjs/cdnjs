/*! /support/test/css/transform/2d 1.0.1 | http://nucleus.qoopido.com | (c) 2015 Dirk Lueth */
!function(e){"use strict";function t(t,r){var n=t.defer();return r.then(function(t){var r=e.createElement("div").style;try{r[t]="rotate(30deg)"}catch(c){}/rotate/.test(r[t])?n.resolve():n.reject()},n.reject),n.pledge}provide(["/demand/pledge","../transform"],t)}(document);
//# sourceMappingURL=2d.js.map
