/*!
* Qoopido.js library v3.2.5, 2014-5-18
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){window.qoopido.register("dom/element/lazyimage",e,["./emerge","../../function/merge"])}(function(e){"use strict";function t(){var e=this,t=e._settings.attribute;o+=1,e.emit(i).one(l,function(t){t.type===m?e.emit(a):e.emit(u),o-=1},!1).setAttribute("src",e.getAttribute(t)).removeAttribute(t)}var r,n={interval:50,threshold:"auto",attribute:"data-lazyimage"},o=0,i="requested",a="loaded",u="failed",c="emerged",m="load",d="error",l="".concat(m," ",d);return r=e["dom/element/emerge"].extend({_constructor:function(i,a){var u=this;r._parent._constructor.call(u,i,e["function/merge"]({},n,a||{})),u.on(c,function m(e){(0===o||1===e.data)&&(u.remove(),u.off(c,m),t.call(u))})}})});