/*!
 Foundation integration for DataTables' Buttons
 ©2016 SpryMedia Ltd - datatables.net/license
*/
(function(b){"function"===typeof define&&define.amd?define(["jquery","datatables.net-zf","datatables.net-buttons"],function(a){return b(a,window,document)}):"object"===typeof exports?module.exports=function(a,c){a||(a=window);if(!c||!c.fn.dataTable)c=require("datatables.net-zf")(a,c).$;c.fn.dataTable.Buttons||require("datatables.net-buttons")(a,c);return b(c,a,a.document)}:b(jQuery,window,document)})(function(b,a,c){a=b.fn.dataTable;b.extend(!0,a.Buttons.defaults,{dom:{container:{tag:"div",className:"dt-buttons button-group"},
buttonContainer:{tag:null,className:""},button:{tag:"a",className:"button small",active:"secondary"},buttonLiner:{tag:null},collection:6===a.ext.foundationVersion?{tag:"div",className:"dropdown-pane is-open button-group stacked"}:{tag:"ul",className:"f-dropdown open dropdown-pane is-open",button:{tag:"li",className:"small",active:"active",disabled:"disabled"},buttonLiner:{tag:"a"}}}});a.ext.buttons.collection.className="dropdown";b(c).on("buttons-popover.dt",function(){var a=!1;b(".dtsp-panesContainer").each(function(){b(this).is("button")||
(a=!0)});a&&b(".dtsp-panesContainer").removeClass("button-group stacked")});return a.Buttons});
