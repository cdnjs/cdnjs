/*!
   Copyright 2015 SpryMedia Ltd.

 License      MIT - http://datatables.net/license/mit

 This feature plug-in for DataTables will automatically change the DataTables
 page length in order to fit inside its container. This can be particularly
 useful for control panels and other interfaces which resize dynamically with
 the user's browser window instead of scrolling.

 Page resizing in DataTables can be enabled by using any one of the following
 options:

 * Setting the `scrollResize` parameter in the DataTables initialisation to
   be true - i.e. `scrollResize: true`
 * Setting the `scrollResize` parameter to be true in the DataTables
   defaults (thus causing all tables to have this feature) - i.e.
   `$.fn.dataTable.defaults.scrollResize = true`.
 * Creating a new instance: `new $.fn.dataTable.ScrollResize( table );` where
   `table` is a DataTable's API instance.
 ScrollResize for DataTables v1.0.0
 2015 SpryMedia Ltd - datatables.net/license
*/
(function(a){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(e){return a(e,window,document)}):"object"===typeof exports?module.exports=function(e,g){e||(e=window);g&&g.fn.dataTable||(g=require("datatables.net")(e,g).$);return a(g,e,e.document)}:a(jQuery,window,document)})(function(a,e,g,n){var l=function(c){var d=this,b=c.table();this.s={dt:c,host:a(b.container()).parent(),header:a(b.header()),footer:a(b.footer()),body:a(b.body()),container:a(b.container()),table:a(b.node())};
b=this.s.host;"static"===b.css("position")&&b.css("position","relative");c.on("draw",function(){d._size()});this._attach();this._size()};l.prototype={_size:function(){var c=this.s,d=c.dt,b=d.table(),k=a(c.table).offset().top,f=c.host.height(),h=a("div.dataTables_scrollBody",b.container());f=f-k-(c.container.height()-(k+h.height()));a("div.dataTables_scrollBody",b.container()).css({maxHeight:f,height:f});d.fixedColumns&&d.fixedColumns().relayout()},_attach:function(){var c=this,d=a("<iframe/>").css({position:"absolute",
top:0,left:0,height:"100%",width:"100%",zIndex:-1,border:0}).attr("frameBorder","0").attr("src","about:blank");d[0].onload=function(){var b=this.contentDocument.body,k=b.offsetHeight,f=this.contentDocument;(f.defaultView||f.parentWindow).onresize=function(){var h=b.clientHeight||b.offsetHeight,m=f.documentElement.clientHeight;!h&&m&&(h=m);h!==k&&(k=h,c._size())}};d.appendTo(this.s.host).attr("data","about:blank")}};a.fn.dataTable.ScrollResize=l;a.fn.DataTable.ScrollResize=l;a(g).on("init.dt",function(c,
d){"dt"===c.namespace&&(c=new a.fn.dataTable.Api(d),(d.oInit.scrollResize||a.fn.dataTable.defaults.scrollResize)&&new l(c))})});
