/*!
 * Amplify Core 1.1.2
 *
 * Copyright 2011 - 2013 appendTo LLC. (http://appendto.com/team)
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 *
 * http://amplifyjs.com
 */
(function(e,t){var n=[].slice,r={},i=e.amplify={publish:function(e){if(typeof e!="string")throw new Error("You must provide a valid topic to publish.");var t=n.call(arguments,1),i,s,o,u=0,a;if(!r[e])return!0;i=r[e].slice();for(o=i.length;u<o;u++){s=i[u],a=s.callback.apply(s.context,t);if(a===!1)break}return a!==!1},subscribe:function(e,t,n,i){if(typeof e!="string")throw new Error("You must provide a valid topic to create a subscription.");arguments.length===3&&typeof n=="number"&&(i=n,n=t,t=null),arguments.length===2&&(n=t,t=null),i=i||10;var s=0,o=e.split(/\s/),u=o.length,a;for(;s<u;s++){e=o[s],a=!1,r[e]||(r[e]=[]);var f=r[e].length-1,l={callback:n,context:t,priority:i};for(;f>=0;f--)if(r[e][f].priority<=i){r[e].splice(f+1,0,l),a=!0;break}a||r[e].unshift(l)}return n},unsubscribe:function(e,t,n){if(typeof e!="string")throw new Error("You must provide a valid topic to remove a subscription.");arguments.length===2&&(n=t,t=null);if(!r[e])return;var i=r[e].length,s=0;for(;s<i;s++)r[e][s].callback===n&&(!t||r[e][s].context===t)&&(r[e].splice(s,1),s--,i--)}}})(this)