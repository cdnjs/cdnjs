/*!
 DataTables integration for DataTables' FixedColumns
 ©2016 SpryMedia Ltd - datatables.net/license
*/
(function(c){"function"===typeof define&&define.amd?define(["jquery","datatables.net-dt","datatables.net-fixedcolumns"],function(b){return c(b)}):"object"===typeof exports?module.exports=function(b,a){b||(b=window);a&&a.fn.dataTable||(a=require("datatables.net-dt")(b,a).$);a.fn.dataTable.FixedColumns||require("datatables.net-fixedcolumns")(b,a);return c(a)}:c(jQuery)})(function(c){return c.fn.dataTable.fixedColumns});
