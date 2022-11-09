/*!
   Copyright 2018 SpryMedia Ltd.

 License      MIT - http://datatables.net/license/mit

 This feature plug-in for DataTables will automatically insert temporary rows
 into a DataTable that draws a page that is less than the configured page
 length. This can be handy to ensure that your table always as (e.g.) 10 rows
 visible.

 Filler rows have the class `dt-rowFill--filler` assigned to them allowing for
 additional styling (e.g. reducing opacity).

 To enable for a table add `rowFill: true` to your DataTables configuration.
 RowFill for DataTables v1.0.0
 2018 SpryMedia Ltd - datatables.net/license
*/
(function(a){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(c){return a(c,window,document)}):"object"===typeof exports?module.exports=function(c,d){c||(c=window);d&&d.fn.dataTable||(d=require("datatables.net")(c,d).$);return a(d,c,c.document)}:a(jQuery,window,document)})(function(a,c,d,n){var f=function(b,e){e=b.table();this.s={dt:b,body:a(e.body())};this._attach()};f.prototype={_attach:function(){var b=this.s.dt,e=this.s.body;b.on("draw",function(){var m=b.columns(":visible").count(),
g=b.rows({page:"current"}).count(),k="even",l="odd";0===g&&(g=1);0===g%2&&(k="odd",l="even");for(var h=0;h<b.page.len()-g;h++)e.append(a('<tr><td colspan="'+m+'">&nbsp;</td></tr>').addClass(0===h%2?k:l).addClass("dt-rowFill--filler"))})}};a.fn.dataTable.RowFill=f;a.fn.DataTable.RowFill=f;a(d).on("preInit.dt",function(b,e){"dt"===b.namespace&&(b=new a.fn.dataTable.Api(e),(e.oInit.rowFill||a.fn.dataTable.defaults.rowFill)&&new f(b))})});
