/*!
   Copyright 2015 SpryMedia Ltd.

 License      MIT - http://datatables.net/license/mit

 This feature plug-in for DataTables will automatically change the DataTables
 page length in order to fit inside its container. This can be particularly
 useful for control panels and other interfaces which resize dynamically with
 the user's browser window instead of scrolling.

 Page resizing in DataTables can be enabled by using any one of the following
 options:

 * Adding the class `pageResize` to the HTML table
 * Setting the `pageResize` parameter in the DataTables initialisation to
   be true - i.e. `pageResize: true`
 * Setting the `pageResize` parameter to be true in the DataTables
   defaults (thus causing all tables to have this feature) - i.e.
   `$.fn.dataTable.defaults.pageResize = true`.
 * Creating a new instance: `new $.fn.dataTable.PageResize( table );` where
   `table` is a DataTable's API instance.

 For more detailed information please see:
     http://datatables.net/blog/2015-04-10
 PageResize for DataTables v1.0.0
 2015 SpryMedia Ltd - datatables.net/license
*/
(function(b){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(e){return b(e,window,document)}):"object"===typeof exports?module.exports=function(e,f){e||(e=window);f&&f.fn.dataTable||(f=require("datatables.net")(e,f).$);return b(f,e,e.document)}:b(jQuery,window,document)})(function(b,e,f,p){var l=function(a,d){var c=a.table();this.s={dt:a,host:b(c.container()).parent(),header:b(c.header()),footer:b(c.footer()),body:b(c.body()),container:b(c.container()),table:b(c.node()),
delta:d};a=this.s.host;"static"===a.css("position")&&a.css("position","relative");this._attach();this._size()};l.prototype={_size:function(){var a=this.s,d=a.dt,c=d.table(),k=b(a.table).offset().top,g=b("tr",a.body);g=g.eq(1<g.length?1:0).height();var h=a.host.height(),n=c.header().parentNode!==c.body().parentNode,m=a.delta;n||(c.header()&&(h-=a.header.height()),c.footer()&&(h-=a.footer.height()));h=h-k-(a.container.height()-(k+a.table.height()));!isNaN(parseFloat(m))&&isFinite(m)&&(h-=m);a=Math.floor(h/
g);Infinity!==a&&-Infinity!==a&&!isNaN(a)&&0<a&&a!==d.page.len()&&d.page.len(a).draw()},_attach:function(){var a=this,d=b("<object/>").css({position:"absolute",top:0,left:0,height:"100%",width:"100%",zIndex:-1}).attr("type","text/html");d[0].onload=function(){var c=this.contentDocument.body,k=c.offsetHeight;this.contentDocument.defaultView.onresize=function(){var g=c.clientHeight||c.offsetHeight;g!==k&&(k=g,a._size())}};d.appendTo(this.s.host).attr("data","about:blank")}};b.fn.dataTable.PageResize=
l;b.fn.DataTable.PageResize=l;b(f).on("preInit.dt",function(a,d){"dt"===a.namespace&&(a=new b.fn.dataTable.Api(d),(b(a.table().node()).hasClass("pageResize")||d.oInit.pageResize||b.fn.dataTable.defaults.pageResize)&&new l(a,d.oInit.pageResizeManualDelta))})});
