/*!
   Copyright 2014 SpryMedia Ltd.

 License      MIT - http://datatables.net/license/mit

 This feature plug-in for DataTables will highlight search terms in the
 DataTable as they are entered into the main search input element, or via the
 `search()` API method.

 It depends upon the jQuery Highlight plug-in by Bartek Szopka:
    http://bartaz.github.io/sandbox.js/jquery.highlight.js

 Search highlighting in DataTables can be enabled by:

 * Adding the class `searchHighlight` to the HTML table
 * Setting the `searchHighlight` parameter in the DataTables initialisation to
   be true
 * Setting the `searchHighlight` parameter to be true in the DataTables
   defaults (thus causing all tables to have this feature) - i.e.
   `$.fn.dataTable.defaults.searchHighlight = true`.

 For more detailed information please see:
     http://datatables.net/blog/2014-10-22
 SearchHighlight for DataTables v1.0.1
 2014 SpryMedia Ltd - datatables.net/license
*/
(function(h,g,c){function e(d,b){d.unhighlight();b.rows({filter:"applied"}).data().length&&(b.columns().every(function(){this.nodes().flatten().to$().unhighlight({className:"column_highlight"});this.nodes().flatten().to$().highlight(this.search().trim().split(/\s+/),{className:"column_highlight"})}),d.highlight(b.search().trim().split(/\s+/)))}c(g).on("init.dt.dth",function(d,b,k){if("dt"===d.namespace){var a=new c.fn.dataTable.Api(b),f=c(a.table().body());if(c(a.table().node()).hasClass("searchHighlight")||
b.oInit.searchHighlight||c.fn.dataTable.defaults.searchHighlight)a.on("draw.dt.dth column-visibility.dt.dth column-reorder.dt.dth",function(){e(f,a)}).on("destroy",function(){a.off("draw.dt.dth column-visibility.dt.dth column-reorder.dt.dth")}),a.search()&&e(f,a)}})})(window,document,jQuery);
