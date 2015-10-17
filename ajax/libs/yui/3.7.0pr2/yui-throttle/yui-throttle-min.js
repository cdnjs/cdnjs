YUI.add("yui-throttle",function(b,a){
/*! Based on work by Simon Willison: http://gist.github.com/292562 */
b.throttle=function(d,c){c=(c)?c:(b.config.throttleTime||150);if(c===-1){return(function(){d.apply(null,arguments);});}var e=b.Lang.now();return(function(){var f=b.Lang.now();if(f-e>c){e=f;d.apply(null,arguments);}});};},"@VERSION@",{"requires":["yui-base"]});