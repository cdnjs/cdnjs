/*!
 * stroll.js 1.0 - CSS scroll effects
 * http://lab.hakim.se/scroll-effects
 * MIT licensed
 * 
 * Created by Hakim El Hattab, http://hakim.se
 */
(function(){var b=[];
var h=false;function f(){if(h){requestAnimFrame(f);for(var k=0,j=b.length;k<j;k++){b[k].update();}}}function g(n){if(e(n)||!n.nodeName||/^(ul|li)$/i.test(n.nodeName)===false){return false;
}var k=Array.prototype.slice.apply(n.children);var l=n.offsetHeight;for(var m=0,j=k.length;m<j;m++){k[m]._offsetTop=k[m].offsetTop;k[m]._offsetHeight=k[m].offsetHeight;
}b.push({domElement:n,update:function(s){var t=n.pageYOffset||n.scrollTop,r=t+l;if(t!==n.lastTop){n.lastTop=t;for(var p=0,o=k.length;p<o;p++){var q=k[p];
var u=q.className;if(q._offsetTop+q._offsetHeight<t){if(u.indexOf("past")===-1){q.classList.add("past");}}else{if(q._offsetTop>r){if(u.indexOf("future")===-1){q.classList.add("future");
}}else{if(u.length){q.classList.remove("past");q.classList.remove("future");}}}}}}});if(b.length===1){h=true;f();}}function a(p){for(var n=0;n<b.length;
n++){if(b[n].domElement==p){b.splice(n,1);n--;var l=Array.prototype.slice.apply(p.children);for(var m=0,k=l.length;m<k;m++){var o=l[m];o.classList.remove("past");
o.classList.remove("future");}}}if(b.length===0){h=false;}}function e(l){for(var k=0,j=b.length;k<j;k++){if(b[k].domElement==l){return true;}}return false;
}function c(m,n){var l,j;if(typeof m==="string"){var k=document.querySelectorAll(m);for(l=0,j=k.length;l<j;l++){n.call(null,k[l]);}}else{if(typeof m==="object"&&typeof m.length==="number"){for(l=0,j=m.length;
l<j;l++){n.call(null,m[l]);}}else{if(m.nodeName){n.call(null,m);}else{throw"Stroll target was of unexpected type.";}}}}function d(){return !!document.body.classList;
}window.stroll={bind:function(i){if(d()){c(i,g);}},unbind:function(i){if(d()){c(i,a);}}};window.requestAnimFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(i){window.setTimeout(i,1000/60);
};})();})();