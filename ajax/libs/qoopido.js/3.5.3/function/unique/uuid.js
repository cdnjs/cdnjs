/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(x){window.qoopido.register("function/unique/uuid",x)}(function(){"use strict";function x(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(r,function(x){var n=16*Math.random()|0,r="x"===x?n:3&n|8;return r.toString(16)})}var n={},r=new RegExp("[xy]","g");return function(){var r;do r=x();while("undefined"!=typeof n[r]);return n[r]=!0,r}});