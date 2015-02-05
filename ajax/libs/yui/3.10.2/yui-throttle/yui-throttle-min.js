YUI.add("yui-throttle",function(e,t){
/*! Based on work by Simon Willison: http://gist.github.com/292562 */
;e.throttle=function(t,n){n=n?n:e.config.throttleTime||150;if(n===-1)return function(){t.apply(this,arguments)};var r=e.Lang.now();return function(){var i=e.Lang.now();i-r>n&&(r=i,t.apply(this,arguments))}}},"@VERSION@",{requires:["yui-base"]});
