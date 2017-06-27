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
!function(e){var r=[];Object.defineProperty||r.push("./queryselectorall"),window.qoopido.register("polyfill/document/queryselector",e,r)}(function(e,r,t,l,o,u){"use strict";return u.querySelector?u.querySelector:u.querySelector=function(e){var r=u.querySelectorAll(e);return r.length?r[0]:null}});