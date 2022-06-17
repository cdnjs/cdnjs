/*!
 Bootstrap 5 styling wrapper for Scroller
 ©2018 SpryMedia Ltd - datatables.net/license
*/
(function(c){"function"===typeof define&&define.amd?define(["jquery","datatables.net-bs5","datatables.net-scroller"],function(a){return c(a,window,document)}):"object"===typeof exports?module.exports=function(a,b){a||(a=window);b&&b.fn.dataTable||(b=require("datatables.net-bs5")(a,b).$);b.fn.dataTable.Scroller||require("datatables.net-scroller")(a,b);return c(b,a,a.document)}:c(jQuery,window,document)})(function(c,a,b,d){return c.fn.dataTable});
