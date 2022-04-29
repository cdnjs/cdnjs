/*
 Highcharts JS v10.1.0 (2022-04-29)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/themes/sand-signika",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,c,b,d){a.hasOwnProperty(c)||(a[c]=d.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:c,module:a[c]}})))}a=a?a._modules:{};
b(a,"Extensions/Themes/SandSignika.js",[a["Core/DefaultOptions.js"],a["Core/Globals.js"],a["Core/Utilities.js"]],function(a,c,b){var d=a.setOptions,f=b.addEvent,g=b.createElement,e;(function(a){a.options={colors:"#f45b5b #8085e9 #8d4654 #7798BF #aaeeee #ff0066 #eeaaee #55BF3B #DF5353 #7798BF #aaeeee".split(" "),chart:{backgroundColor:null,style:{fontFamily:"Signika, serif"}},title:{style:{color:"black",fontSize:"16px",fontWeight:"bold"}},subtitle:{style:{color:"black"}},tooltip:{borderWidth:0},labels:{style:{color:"#6e6e70"}},
legend:{backgroundColor:"#E0E0E8",itemStyle:{fontWeight:"bold",fontSize:"13px"}},xAxis:{labels:{style:{color:"#6e6e70"}}},yAxis:{labels:{style:{color:"#6e6e70"}}},plotOptions:{series:{shadow:!0},candlestick:{lineColor:"#404048"},map:{shadow:!1}},navigator:{xAxis:{gridLineColor:"#D0D0D8"}},rangeSelector:{buttonTheme:{fill:"white",stroke:"#C0C0C8","stroke-width":1,states:{select:{fill:"#D0D0D8"}}}},scrollbar:{trackBorderColor:"#C0C0C8"}};a.apply=function(){g("link",{href:"https://fonts.googleapis.com/css?family=Signika:400,700",
rel:"stylesheet",type:"text/css"},null,document.getElementsByTagName("head")[0]);f(c.Chart,"afterGetContainer",function(){this.container.style.background="url(https://www.highcharts.com/samples/graphics/sand.png)"});d(a.options)}})(e||(e={}));return e});b(a,"masters/themes/sand-signika.src.js",[a["Core/Globals.js"],a["Extensions/Themes/SandSignika.js"]],function(a,b){a.theme=b.options;b.apply()})});
//# sourceMappingURL=sand-signika.js.map