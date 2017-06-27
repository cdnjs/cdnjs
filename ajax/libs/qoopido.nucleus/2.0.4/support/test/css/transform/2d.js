/*! /support/test/css/transform/2d 2.0.4 | http://nucleus.qoopido.com | (c) 2017 Dirk Lueth */
!function(e){"use strict";function t(t,r){var n=t.defer();return r.then(function(t){var r=e.createElement("div").style;try{r[t]="rotate(30deg)"}catch(e){}/rotate/.test(r[t])?n.resolve():n.reject()},n.reject),n.pledge}provide(["/demand/pledge","../transform"],t)}(document);
//# sourceMappingURL=2d.js.map
