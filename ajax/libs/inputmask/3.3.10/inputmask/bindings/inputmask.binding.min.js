/*!
* bindings/inputmask.binding.min.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2017 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.10
*/

!function(a){"function"==typeof define&&define.amd?define(["jquery","../inputmask","../global/document"],a):"object"==typeof exports?module.exports=a(require("jquery"),require("../inputmask"),require("../global/document")):a(jQuery,window.Inputmask,document)}(function(a,t,n){a(n).ajaxComplete(function(n,i,e){-1!==a.inArray("html",e.dataTypes)&&a(".inputmask, [data-inputmask], [data-inputmask-mask], [data-inputmask-alias]").each(function(a,n){void 0===n.inputmask&&t().mask(n)})}).ready(function(){a(".inputmask, [data-inputmask], [data-inputmask-mask], [data-inputmask-alias]").each(function(a,n){void 0===n.inputmask&&t().mask(n)})})});