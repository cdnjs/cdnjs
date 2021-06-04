/*!
 DataTables styling wrapper for FixedColumns
 ©2018 SpryMedia Ltd - datatables.net/license
*/
(function(c){"function"===typeof define&&define.amd?define(["jquery","datatables.net-dt","datatables.net-fixedcolumns"],function(a){return c(a,window,document)}):"object"===typeof exports?module.exports=function(a,b){a||(a=window);if(!b||!b.fn.dataTable)b=require("datatables.net-dt")(a,b).$;b.fn.dataTable.FixedColumns||require("datatables.net-fixedcolumns")(a,b);return c(b,a,a.document)}:c(jQuery,window,document)})(function(c){return c.fn.dataTable});
