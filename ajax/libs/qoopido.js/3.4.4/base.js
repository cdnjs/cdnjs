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
!function(e,t,o,n,r,c){"use strict";function i(e){for(var t;(t=e.replace(l,""))!==e;)e=t;return e.replace(g,"")}var u,s,p=t.shared=t.shared||{},a=t.modules=t.modules||{},d=[],f=new RegExp("^\\.+\\/"),l=new RegExp("(?:\\/|)[^\\/]*\\/\\.\\."),g=new RegExp("(^\\/)|\\.\\/","g");u=t.register=function(e,t,u,s){var d,l=e.split("/");return a[e]?a[e]:(d=function(){if(u){var d,g,y,w=l.slice(0,-1).join("/");for(d=0;(g=u[d])!==c;d++)y=f.test(g),y&&(g=i(w+"/"+g)),!a[g]&&arguments[d]&&(a[g]=arguments[d]),y&&!a[g]&&"undefined"!=typeof console&&console.error("".concat("[Qoopido.js] ",e,": Could not load dependency ",g))}return a[e]=t(a,p,l,o,n,r,c),s&&s(a[e]),a[e]},void("undefined"!=typeof module&&module.exports?module.exports=define(d):"function"==typeof define&&define.amd?u?define(u,d):define(d):d()))},s=t.registerSingleton=function(e,t,o){u(e,t,o,function(t){a[e]=t.create()})},Object.create||d.push("./polyfill/object/create"),Object.getOwnPropertyNames||d.push("./polyfill/object/getownpropertynames"),Object.getOwnPropertyDescriptor&&function(){try{return Object.getOwnPropertyDescriptor({x:0},"x"),!0}catch(e){return!1}}()||d.push("./polyfill/object/getownpropertydescriptor"),u("base",e,d)}(function(e,t,o,n,r,c,i){"use strict";function u(e){var t,o,n={},r=Object.getOwnPropertyNames(e);for(t=0;(o=r[t])!==i;t++)n[o]=Object.getOwnPropertyDescriptor(e,o);return n}function s(){"undefined"!=typeof console&&console.error("[Qoopido.js] Operation prohibited on an actual instance")}return{create:function(){var e,t=Object.create(this,u(this));return t._constructor&&(e=t._constructor.apply(t,arguments)),t.create=t.extend=s,e||t},extend:function(e){return e=e||{},e._parent=this,Object.create(this,u(e))}}},window.qoopido=window.qoopido||{},navigator,window,document);