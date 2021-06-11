/*
 Highcharts JS v9.1.1 (2021-06-03)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/themes/grid-light",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,d,b,e){a.hasOwnProperty(d)||(a[d]=e.apply(null,b))}a=a?a._modules:{};b(a,"Extensions/Themes/GridLight.js",[a["Core/Globals.js"],a["Core/DefaultOptions.js"],a["Core/Utilities.js"]],function(a,
b,c){b=b.setOptions;c=c.createElement;c("link",{href:"https://fonts.googleapis.com/css?family=Dosis:400,600",rel:"stylesheet",type:"text/css"},null,document.getElementsByTagName("head")[0]);a.theme={colors:"#7cb5ec #f7a35c #90ee7e #7798BF #aaeeee #ff0066 #eeaaee #55BF3B #DF5353 #7798BF #aaeeee".split(" "),chart:{backgroundColor:null,style:{fontFamily:"Dosis, sans-serif"}},title:{style:{fontSize:"16px",fontWeight:"bold",textTransform:"uppercase"}},tooltip:{borderWidth:0,backgroundColor:"rgba(219,219,216,0.8)",
shadow:!1},legend:{backgroundColor:"#F0F0EA",itemStyle:{fontWeight:"bold",fontSize:"13px"}},xAxis:{gridLineWidth:1,labels:{style:{fontSize:"12px"}}},yAxis:{minorTickInterval:"auto",title:{style:{textTransform:"uppercase"}},labels:{style:{fontSize:"12px"}}},plotOptions:{candlestick:{lineColor:"#404048"}}};b(a.theme)});b(a,"masters/themes/grid-light.src.js",[],function(){})});
//# sourceMappingURL=grid-light.js.map