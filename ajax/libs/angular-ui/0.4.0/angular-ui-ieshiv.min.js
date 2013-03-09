/**
 * AngularUI - The companion suite for AngularJS
 * @version v0.4.0 - 2013-02-15
 * @link http://angular-ui.github.com
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(e){var t=window.ieShivDebug||!1,n=["ngInclude","ngPluralize","ngView","ngSwitch","uiCurrency","uiCodemirror","uiDate","uiEvent","uiKeypress","uiKeyup","uiKeydown","uiMask","uiMapInfoWindow","uiMapMarker","uiMapPolyline","uiMapPolygon","uiMapRectangle","uiMapCircle","uiMapGroundOverlay","uiModal","uiReset","uiScrollfix","uiSelect2","uiShow","uiHide","uiToggle","uiSortable","uiTinymce"];window.myCustomTags=window.myCustomTags||[],n.push.apply(n,window.myCustomTags);var r=function(e){var t=[],n=e.replace(/([A-Z])/g,function(e){return" "+e.toLowerCase()}),r=n.split(" "),i=r[0],s=r.slice(1).join("-");return t.push(i+":"+s),t.push(i+"-"+s),t.push("x-"+i+"-"+s),t.push("data-"+i+"-"+s),t};for(var i=0,s=n.length;i<s;i++){var o=r(n[i]);for(var u=0,a=o.length;u<a;u++){var f=o[u];document.createElement(f)}}})(window);