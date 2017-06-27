/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
(function(){var a={}.hasOwnProperty;function b(){var g=[];for(var f=0;f<arguments.length;f++){var c=arguments[f];if(!c){continue}var d=typeof c;if(d==="string"||d==="number"){g.push(c)}else{if(Array.isArray(c)){g.push(b.apply(null,c))}else{if(d==="object"){for(var e in c){if(a.call(c,e)&&c[e]){g.push(e)}}}}}}return g.join(" ")}if(typeof module!=="undefined"&&module.exports){module.exports=b}else{if(typeof define==="function"&&typeof define.amd==="object"&&define.amd){define("classnames",[],function(){return b})}else{window.classNames=b}}}());