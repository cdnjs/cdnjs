/*! /function/unique/uuid 1.1.1 | http://nucleus.qoopido.com | (c) 2016 Dirk Lueth */
!function(){"use strict";function x(){function x(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(r,function(x){var n=16*Math.random()|0;return("x"===x?n:3&n|8).toString(16)})}var n={},r=new RegExp("[xy]","g");return function(){var r;do r=x();while(n[r]);return n[r]=1,r}}provide(x)}();
//# sourceMappingURL=uuid.js.map
