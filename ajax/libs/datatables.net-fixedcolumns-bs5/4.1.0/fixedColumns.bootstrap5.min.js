/*!
 Bootstrap 5 integration for DataTables' FixedColumns
 ©2016 SpryMedia Ltd - datatables.net/license
*/
(function(c){"function"===typeof define&&define.amd?define(["jquery","datatables.net-bs5","datatables.net-fixedcolumns"],function(b){return c(b)}):"object"===typeof exports?module.exports=function(b,a){b||(b=window);a&&a.fn.dataTable||(a=require("datatables.net-bs5")(b,a).$);a.fn.dataTable.SearchPanes||require("datatables.net-fixedcolumns")(b,a);return c(a)}:c(jQuery)})(function(c){return c.fn.dataTable.fixedColumns});
