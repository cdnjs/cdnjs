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
!function(x){window.qoopido.register("function/unique/uuid",x)}(function(){"use strict";function x(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(r,function(x){var n=16*Math.random()|0,r="x"===x?n:3&n|8;return r.toString(16)})}var n={},r=new RegExp("[xy]","g");return function(){var r;do r=x();while("undefined"!=typeof n[r]);return n[r]=!0,r}});