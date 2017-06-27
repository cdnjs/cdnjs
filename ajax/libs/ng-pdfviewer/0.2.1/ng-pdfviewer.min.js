/*
 AngularJS PDF viewer directive using pdf.js.

 https://github.com/akrennmair/ng-pdfviewer 

 MIT license
*/
angular.module("ngPDFViewer",[]).directive("pdfviewer",["$parse",function(){var d=null,e=null;return{restrict:"E",template:"<canvas></canvas>",scope:{onPageLoad:"&",loadProgress:"&",src:"@",id:"="},controller:["$scope",function(a){a.pageNum=1;a.pdfDoc=null;a.scale=1;a.documentProgress=function(c){a.loadProgress&&a.loadProgress({state:"loading",loaded:c.loaded,total:c.total})};a.loadPDF=function(c){console.log("loadPDF ",c);PDFJS.getDocument(c,null,null,a.documentProgress).then(function(b){a.pdfDoc=
b;a.renderPage(a.pageNum,function(){a.loadProgress&&a.loadProgress({state:"finished",loaded:0,total:0})})},function(b){console.log("PDF load error: "+b);a.loadProgress&&a.loadProgress({state:"error",loaded:0,total:0})})};a.renderPage=function(c,b){console.log("renderPage ",c);a.pdfDoc.getPage(c).then(function(c){var e=c.getViewport(a.scale),f=d.getContext("2d");d.height=e.height;d.width=e.width;c.render({canvasContext:f,viewport:e}).then(function(){b&&b(!0);a.$apply(function(){a.onPageLoad({page:a.pageNum,
total:a.pdfDoc.numPages})})},function(){b&&b(!1);console.log("page.render failed")})})};a.$on("pdfviewer.nextPage",function(c,b){b===e&&a.pageNum<a.pdfDoc.numPages&&(a.pageNum++,a.renderPage(a.pageNum))});a.$on("pdfviewer.prevPage",function(c,b){b===e&&1<a.pageNum&&(a.pageNum--,a.renderPage(a.pageNum))});a.$on("pdfviewer.gotoPage",function(c,b,d){b===e&&(1<=d&&d<=a.pdfDoc.numPages)&&(a.pageNum=d,a.renderPage(a.pageNum))})}],link:function(a,c,b){d=c.find("canvas")[0];e=b.id;b.$observe("src",function(b){console.log("src attribute changed, new value is",
b);void 0!==b&&(null!==b&&""!==b)&&(a.pageNum=1,a.loadPDF(a.src))})}}}]).service("PDFViewerService",["$rootScope",function(d){return{nextPage:function(){d.$broadcast("pdfviewer.nextPage")},prevPage:function(){d.$broadcast("pdfviewer.prevPage")},Instance:function(e){return{prevPage:function(){d.$broadcast("pdfviewer.prevPage",e)},nextPage:function(){d.$broadcast("pdfviewer.nextPage",e)},gotoPage:function(a){d.$broadcast("pdfviewer.gotoPage",e,a)}}}}}]);
//@ sourceMappingURL=dist/ng-pdfviewer.min.map
