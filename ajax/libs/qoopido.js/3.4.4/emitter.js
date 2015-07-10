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
!function(e){window.qoopido.register("emitter",e,["./base"])}(function(e,t,n,r,i,s,l){"use strict";function o(e,t){var n=t.charAt(0).toUpperCase()+t.slice(1);return e._mapped[t]=e[t],function(){var r,i=Array.prototype.slice.call(arguments);return e.emit.apply(e,["pre"+n,i]),r=e._mapped[t].apply(e,i),e.emit.apply(e,["post"+n,i,r]),r}}var p=/^(_|extend$|create$|on$|one$|off$|emit$|get.+)/;return e.base.extend({_mapped:null,_listener:null,_temp:null,_constructor:function(){var e,t=this;t._mapped={},t._listener={};for(e in t)"function"==typeof t[e]&&p.test(e)===!1&&(t[e]=o(t,e))},on:function(e,t){var n,r,i=this;for(e=e.split(" "),n=0;(r=e[n])!==l;n++)(i._listener[r]=i._listener[r]||[]).push(t);return i},one:function(e,t,n){n=n!==!1;var r=this;return r.on(e,function i(s){r.off(n===!0?s:e,i),t.apply(this,arguments)}),r},off:function(e,t){var n,r,i,s,o=this;if(e)for(e=e.split(" "),n=0;(r=e[n])!==l;n++)if(o._listener[r]=o._listener[r]||[],t)for(i=0;(s=o._listener[r][i])!==l;i++)s===t&&(o._listener[r].splice(i,1),i--);else o._listener[r].length=0;else for(r in o._listener)o._listener[r].length=0;return o},emit:function(e){var t,n,r=this;if(e!==l){for(r._listener[e]=r._listener[e]||[],r._temp=r._listener[e].slice(),t=0;(n=r._temp[t])!==l;t++)n.apply(r,arguments);r._temp.length=0}return r}})});