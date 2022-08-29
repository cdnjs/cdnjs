/*
 Highcharts JS v10.2.1 (2022-08-29)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/themes/grid",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,c,b,d){a.hasOwnProperty(c)||(a[c]=d.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:c,module:a[c]}})))}a=a?a._modules:{};b(a,"Extensions/Themes/Grid.js",
[a["Core/DefaultOptions.js"]],function(a){var c=a.setOptions,b;(function(a){a.options={colors:"#058DC7 #50B432 #ED561B #DDDF00 #24CBE5 #64E572 #FF9655 #FFF263 #6AF9C4".split(" "),chart:{backgroundColor:{linearGradient:{x1:0,y1:0,x2:1,y2:1},stops:[[0,"rgb(255, 255, 255)"],[1,"rgb(240, 240, 255)"]]},borderWidth:2,plotBackgroundColor:"rgba(255, 255, 255, .9)",plotShadow:!0,plotBorderWidth:1},title:{style:{color:"#000",font:'bold 16px "Trebuchet MS", Verdana, sans-serif'}},subtitle:{style:{color:"#666666",
font:'bold 12px "Trebuchet MS", Verdana, sans-serif'}},xAxis:{gridLineWidth:1,lineColor:"#000",tickColor:"#000",labels:{style:{color:"#000",font:"11px Trebuchet MS, Verdana, sans-serif"}},title:{style:{color:"#333",fontWeight:"bold",fontSize:"12px",fontFamily:"Trebuchet MS, Verdana, sans-serif"}}},yAxis:{minorTickInterval:"auto",lineColor:"#000",lineWidth:1,tickWidth:1,tickColor:"#000",labels:{style:{color:"#000",font:"11px Trebuchet MS, Verdana, sans-serif"}},title:{style:{color:"#333",fontWeight:"bold",
fontSize:"12px",fontFamily:"Trebuchet MS, Verdana, sans-serif"}}},legend:{itemStyle:{font:"9pt Trebuchet MS, Verdana, sans-serif",color:"black"},itemHoverStyle:{color:"#039"},itemHiddenStyle:{color:"gray"}},labels:{style:{color:"#99b"}},navigation:{buttonOptions:{theme:{stroke:"#CCCCCC"}}}};a.apply=function(){c(a.options)}})(b||(b={}));return b});b(a,"masters/themes/grid.src.js",[a["Core/Globals.js"],a["Extensions/Themes/Grid.js"]],function(a,b){a.theme=b.options;b.apply()})});
//# sourceMappingURL=grid.js.map