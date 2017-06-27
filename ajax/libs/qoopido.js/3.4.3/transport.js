/*!
* Qoopido.js library v3.4.3, 2014-6-11
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*//*!
* Qoopido.js library
*
* version: 3.4.3
* date:    2014-6-11
* author:  Dirk Lueth <info@qoopido.com>
* website: https://github.com/dlueth/qoopido.js
*
* Copyright (c) 2014 Dirk Lueth
*
* Dual licensed under the MIT and GPL licenses.
* - http://www.opensource.org/licenses/mit-license.php
* - http://www.gnu.org/copyleft/gpl.html
*/
!function(n){window.qoopido.register("transport",n,["./base","./function/merge"])}(function(n){"use strict";var e;return e=n.base.extend({setup:function(e){var t=this;return t._settings=n["function/merge"]({},t._settings,e),t},serialize:function(n,e){var t,o,i,r=[];for(t in n)o=e?"".concat(e,"[",t,"]"):t,i=n[t],r.push("object"==typeof i?this.serialize(i,o):"".concat(encodeURIComponent(o),"=",encodeURIComponent(i)));return r.join("&")}})},window,document);