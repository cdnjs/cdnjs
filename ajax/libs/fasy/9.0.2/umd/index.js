/*! Fasy: index.js
    v9.0.2 (c) 2022 Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
!function UMD(e,n,r,t){"function"==typeof define&&define.amd?(r=Object.values(r),define(e,r,t)):"undefined"!=typeof module&&module.exports?(r=Object.keys(r).map((e=>require(e))),module.exports=t(...r)):(r=Object.values(r).map((e=>n[e])),n[e]=t(...r))}("FA","undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:new Function("return this")(),{"./concurrent.js":"FAConcurrent","./serial.js":"FASerial","./transducers.js":"FATransducers"},(function DEF(e,n,r){"use strict";var t=e,s=n,u=r;let o={};return o={concurrent:t,serial:s,transducers:u},o.concurrent=t,o.serial=s,o.transducers=u,o}));