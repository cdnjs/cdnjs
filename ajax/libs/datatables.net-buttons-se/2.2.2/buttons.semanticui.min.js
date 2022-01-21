/*!
 Bootstrap integration for DataTables' Buttons
 ©2016 SpryMedia Ltd - datatables.net/license
*/
(function(b){"function"===typeof define&&define.amd?define(["jquery","datatables.net-se","datatables.net-buttons"],function(a){return b(a,window,document)}):"object"===typeof exports?module.exports=function(a,c){a||(a=window);c&&c.fn.dataTable||(c=require("datatables.net-se")(a,c).$);c.fn.dataTable.Buttons||require("datatables.net-buttons")(a,c);return b(c,a,a.document)}:b(jQuery,window,document)})(function(b,a,c,e){a=b.fn.dataTable;b.extend(!0,a.Buttons.defaults,{dom:{container:{className:"dt-buttons ui basic buttons"},
button:{tag:"button",className:"dt-button ui button",spacerClass:"dt-button ui button"},collection:{tag:"div",className:"ui basic vertical buttons",closeButton:!1},splitWrapper:{tag:"div",className:"dt-btn-split-wrapper buttons",closeButton:!1},splitDropdown:{tag:"button",text:"&#x25BC;",className:"ui floating button dt-btn-split-drop dropdown icon",closeButton:!1},splitDropdownButton:{tag:"button",className:"dt-btn-split-drop-button ui button",closeButton:!1}}});b(c).on("buttons-popover.dt",function(){var d=
!1;b(".dtsp-panesContainer").each(function(){b(this).is("button")||(d=!0)});d&&b(".dtsp-panesContainer").removeClass("vertical buttons")});return a.Buttons});
