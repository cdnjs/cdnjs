/*!
* Qoopido.js library v3.4.4, 2014-6-15
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*//*!
* Qoopido.js library
*
* version: 3.4.4
* date:    2014-6-15
* author:  Dirk Lueth <info@qoopido.com>
* website: https://github.com/dlueth/qoopido.js
*
* Copyright (c) 2014 Dirk Lueth
*
* Dual licensed under the MIT and GPL licenses.
* - http://www.opensource.org/licenses/mit-license.php
* - http://www.gnu.org/copyleft/gpl.html
*/
!function(t){var e=["../element","../../proxy","../../function/merge","../../url","../../support","../../support/capability/datauri","../../support/element/canvas/todataurl/png","../../transport/xhr"];window.qoopido.register("dom/element/shrinkimage",t,e)}(function(t,e,n,i,a,o){"use strict";function r(e,n){e=t.url.resolve(v.exec(e)[1]),n=n?!0:!1;var i=this,a=t["function/merge"]({},i._settings,t.url.getParameter(e)),o=a.target||(e=e.split("?")[0]).replace(w,"".concat(".q",a.quality,".shrunk"));n||i.removeAttribute(i._settings.attribute).hide(),t.support.testMultiple("/capability/datauri","/element/canvas/todataurl/png").then(a.debug).then(function(){switch(typeof b[o]){case"object":b[o].one(k,function(t){c.call(i,t.data,n)}),i.emit(x);break;case"string":c.call(i,b[o],n);break;default:b[o]=p.create(o,n?null:i._element).one(q,function(t){t.type===k?(b[o]=t.data,i.emit(_),c.call(i,t.data,n)):(b[o]=e,c.call(i,e,n))},!1)}})["catch"](function(){b[o]=e,c.call(i,e,n)})}function c(t,e){var n=this;e?(n.setStyle("backgroundImage","url("+t+")"),n.emit(k),n.off()):n.one(A,function(){n.show(),n.emit(k),n.off()}).setAttribute("src",t)}function l(t){var e=this;t.get(e._url).then(function(t){try{var n=h.parse(t.data);n.width=parseInt(n.width,10),n.height=parseInt(n.height,10),s.call(e,n)}catch(i){e.emit(I)}},function(){e.emit(I)})}function s(t){var n,i,a=this,r=function(r){return n=f?e.pool.dom.obtain("canvas"):o.createElement("canvas"),n.style.display="none",n.width=t.width,n.height=t.height,i=n.getContext("2d"),i.clearRect(0,0,t.width,t.height),i.drawImage(a.element,0,0,t.width,t.height),a.one(A,c).setAttribute("src",t.alpha),u(r)},c=function(e){var o;return i.globalCompositeOperation="xor",i.drawImage(a.element,0,0,t.width,t.height),o=n.toDataURL("image/png"),l(),a.emit(k,o),u(e)},l=function(){n&&n.dispose&&n.dispose(),a.element.dispose&&a.element.dispose()};a.one(R,function(t){t.type===A?r.call(this,t):(l(),a.emit(I))},!1).setAttribute("src",t.main)}function u(t){return t.preventDefault(),t.stopPropagation(),!1}var d,p,h=a.JSON,g=n.pop(),m={attribute:"data-"+g,quality:80,debug:!1},f=e.pool&&e.pool.dom,b={},y=new RegExp('^url\\x28"{0,1}data:image/shrink,(.+?)"{0,1}\\x29$',"i"),v=new RegExp('^(?:url\\x28"{0,1}|)(?:data:image/shrink,|)(.+?)(?:"{0,1}\\x29|)$',"i"),w=new RegExp("\\.png$","i"),x="queued",_="cached",k="loaded",I="failed",q="".concat(k," ",I),A="load",E="error",R="".concat(A," ",E);return d=t["dom/element"].extend({_constructor:function(e,n){var i,a,o=this;d._parent._constructor.call(o,e),o._settings=n=t["function/merge"]({},m,n),i=o.getAttribute(n.attribute),a=o.getStyle("backgroundImage"),"IMG"===o.type&&r.call(o,i),"none"!==a&&y.test(a)&&r.call(o,a,!0)},hide:function(){this.setStyles({visibility:"hidden",opacity:0})},show:function(){this.setStyles({visibility:"",opacity:""})}}),p=t["dom/element"].extend({_url:null,_constructor:function(n,i){var a=this;i||(i=f?e.pool.dom.obtain("img"):o.createElement("img")),p._parent._constructor.call(a,i),a._url=n,l.call(a,t["transport/xhr"])}}),d},window);