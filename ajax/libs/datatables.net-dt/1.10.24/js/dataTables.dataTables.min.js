/*!
 DataTables styling integration
 ©2018 SpryMedia Ltd - datatables.net/license
*/
(function(b){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(a){return b(a,window,document)}):"object"===typeof exports?module.exports=function(a,c){a||(a=window);if(!c||!c.fn.dataTable)c=require("datatables.net")(a,c).$;return b(c,a,a.document)}:b(jQuery,window,document)})(function(b){return b.fn.dataTable});
