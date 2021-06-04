/*!
 Bootstrap integration for DataTables' Buttons
 ©2016 SpryMedia Ltd - datatables.net/license
*/
(function(b){"function"===typeof define&&define.amd?define(["jquery","datatables.net-se","datatables.net-buttons"],function(a){return b(a,window,document)}):"object"===typeof exports?module.exports=function(a,c){a||(a=window);if(!c||!c.fn.dataTable)c=require("datatables.net-se")(a,c).$;c.fn.dataTable.Buttons||require("datatables.net-buttons")(a,c);return b(c,a,a.document)}:b(jQuery,window,document)})(function(b,a,c){a=b.fn.dataTable;b.extend(!0,a.Buttons.defaults,{dom:{container:{className:"dt-buttons ui basic buttons"},
button:{tag:"button",className:"ui button"},collection:{tag:"div",className:"ui basic vertical buttons"}}});b(c).on("buttons-popover.dt",function(){var a=!1;b(".dtsp-panesContainer").each(function(){b(this).is("button")||(a=!0)});a&&b(".dtsp-panesContainer").removeClass("vertical buttons")});return a.Buttons});
