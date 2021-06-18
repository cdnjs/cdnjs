"use strict";/*!
 * jquery.sumoselect - v3.0.3
 * http://hemantnegi.github.io/jquery.sumoselect
 * 2016-12-12
 *
 * Copyright 2015 Hemant Negi
 * Email : hemant.frnz@gmail.com
 * Compressor http://refresh-sf.com/
 */(function(a){'use strict';"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"==typeof exports?a(jQuery):module.exports=a(require("jquery"))})(function(a){'namespace sumo';a.fn.SumoSelect=function(b){// This is the easiest way to have default options.
var c=a.extend({placeholder:"Select Here",// Dont change it here.
csvDispCount:3,// display no. of items in multiselect. 0 to display all.
captionFormat:"{0} Selected",// format of caption text. you can set your locale.
captionFormatAllSelected:"{0} all selected!",// format of caption text when all elements are selected. set null to use captionFormat. It will not work if there are disabled elements in select.
floatWidth:400,// Screen width of device at which the list is rendered in floating popup fashion.
forceCustomRendering:!1,// force the custom modal on all devices below floatWidth resolution.
nativeOnDevice:["Android","BlackBerry","iPhone","iPad","iPod","Opera Mini","IEMobile","Silk"],//
outputAsCSV:!1,// true to POST data as csv ( false for Html control array ie. default select )
csvSepChar:",",// separation char in csv mode
okCancelInMulti:!1,// display ok cancel buttons in desktop mode multiselect also.
isClickAwayOk:!1,// for okCancelInMulti=true. sets whether click outside will trigger Ok or Cancel (default is cancel).
triggerChangeCombined:!0,// im multi select mode whether to trigger change event on individual selection or combined selection.
selectAll:!1,// to display select all button in multiselect mode.|| also select all will not be available on mobile devices.
search:!1,// to display input for filtering content. selectAlltext will be input text placeholder
searchText:"Search...",// placeholder for search input
searchFn:function searchFn(a,b){// search function
return 0>a.toLowerCase().indexOf(b.toLowerCase())},noMatch:"No matches for \"{0}\"",prefix:"",// some prefix usually the field name. eg. '<b>Hello</b>'
locale:["OK","Cancel","Select All"],// all text that is used. don't change the index.
up:!1,// set true to open upside.
showTitle:!0// set to false to prevent title (tooltip) from appearing
},b),d=this.each(function(){var d=this;// the original select object.
this.sumo||!a(this).is("select")||(//already initialized
this.sumo={E:a(d),//the jquery object of original select element.
is_multi:a(d).attr("multiple"),//if its a multiple select
select:"",caption:"",placeholder:"",optDiv:"",CaptionCont:"",ul:"",is_floating:!1,is_opened:!1,//backdrop: '',
mob:!1,// if to open device default select
Pstate:[],lastUnselected:null,createElems:function createElems(){var b=this;//break for mobile rendring.. if forceCustomRendering is false
return b.E.wrap("<div class=\"SumoSelect\" tabindex=\"0\" role=\"button\" aria-expanded=\"false\">"),b.select=b.E.parent(),b.caption=a("<span>"),b.CaptionCont=a("<p class=\"CaptionCont SelectBox ".concat(b.E.attr("class"),"\" ><label><i></i></label></p>")).attr("style",b.E.attr("style")).prepend(b.caption),b.select.append(b.CaptionCont),b.is_multi||(c.okCancelInMulti=!1),b.E.attr("disabled")&&b.select.addClass("disabled").removeAttr("tabindex"),c.outputAsCSV&&b.is_multi&&b.E.attr("name")&&(b.select.append(a("<input class=\"HEMANT123\" type=\"hidden\" />").attr("name",b.E.attr("name")).val(b.getSelStr())),b.E.removeAttr("name")),b.isMobile()&&!c.forceCustomRendering?void b.setNativeMobile():void(//hide original select
//## Creating the list...
//branch for floating list in low res devices.
//Creating the markup for the available options
b.E.attr("name")&&b.select.addClass("sumo_"+b.E.attr("name").replace(/\[\]/,"")),b.E.addClass("SumoUnder").attr("tabindex","-1"),b.optDiv=a("<div class=\"optWrapper "+(c.up?"up":"")+"\">"),b.floatingList(),b.ul=a("<ul class=\"options\">"),b.optDiv.append(b.ul),c.selectAll&&b.is_multi&&b.SelAll(),c.search&&b.Search(),b.ul.append(b.prepItems(b.E.children())),b.is_multi&&b.multiSelelect(),b.select.append(b.optDiv),b.basicEvents(),b.selAllState());// if there is a name attr in select add a class to container div
},prepItems:function prepItems(b,c){var d=[],e=this;return a(b).each(function(b,f){f=a(f),d.push(f.is("optgroup")?a("<li class=\"group "+(f[0].disabled?"disabled":"")+"\"><label></label><ul></ul></li>").find("label").text(f.attr("label")).end().find("ul").append(e.prepItems(f.children(),f[0].disabled)).end():e.createLi(f,c))}),d},//## Creates a LI element from a given option and binds events to it
//## returns the jquery instance of li (not inserted in dom)
createLi:function createLi(b,c){var d=this;b.attr("value")||b.attr("value",b.val());var e=a("<li class=\"opt\"><label>"+b.html()+"</label></li>");return e.data("opt",b),b.data("li",e),d.is_multi&&e.prepend("<span><i></i></span>"),(b[0].disabled||c)&&(e=e.addClass("disabled")),d.onOptClick(e),b[0].selected&&e.addClass("selected"),b.attr("class")&&e.addClass(b.attr("class")),b.attr("title")&&e.attr("title",b.attr("title")),e},//## Returns the selected items as string in a Multiselect.
getSelStr:function getSelStr(){// get the pre selected items.
var b=[];return this.E.find("option:checked").each(function(){b.push(a(this).val())}),b.join(c.csvSepChar)},//## THOSE OK/CANCEL BUTTONS ON MULTIPLE SELECT.
multiSelelect:function multiSelelect(){var b=this;b.optDiv.addClass("multiple"),b.okbtn=a("<p tabindex=\"0\" class=\"btnOk\">"+c.locale[0]+"</p>").click(function(){//if combined change event is set.
b._okbtn(),b.hideOpts()}),b.cancelBtn=a("<p tabindex=\"0\" class=\"btnCancel\">"+c.locale[1]+"</p>").click(function(){b._cnbtn(),b.hideOpts()});var d=b.okbtn.add(b.cancelBtn);// handling keyboard navigation on ok cancel buttons.
b.optDiv.append(a("<div class=\"MultiControls\">").append(d)),d.on("keydown.sumo",function(c){var d=a(this);switch(c.which){case 32:// space
case 13:d.trigger("click");break;case 9://tab
if(d.hasClass("btnOk"))return;break;case 27:return b._cnbtn(),void b.hideOpts();}c.stopPropagation(),c.preventDefault()})},_okbtn:function _okbtn(){var a=this,b=0;//if combined change event is set.
c.triggerChangeCombined&&(a.E.find("option:checked").length===a.Pstate.length?a.E.find("option").each(function(c,d){d.selected&&0>a.Pstate.indexOf(c)&&(b=1)}):b=1,b&&(a.callChange(),a.setText()))},_cnbtn:function _cnbtn(){var a=this;//remove all selections
a.E.find("option:checked").each(function(){this.selected=!1}),a.optDiv.find("li.selected").removeClass("selected");//restore selections from saved state.
for(var b=0;b<a.Pstate.length;b++)a.E.find("option")[a.Pstate[b]].selected=!0,a.ul.find("li.opt").eq(a.Pstate[b]).addClass("selected");a.selAllState()},SelAll:function SelAll(){var b=this;b.is_multi&&(b.selAll=a("<p class=\"select-all\"><span><i></i></span><label>"+c.locale[2]+"</label></p>"),b.optDiv.addClass("selall"),b.selAll.on("click",function(){b.selAll.toggleClass("selected"),b.toggSelAll(b.selAll.hasClass("selected"),1)}),b.optDiv.prepend(b.selAll))},// search module (can be removed if not required.)
Search:function Search(){var d=this,e=d.CaptionCont.addClass("search"),f=a("<p class=\"no-match\">"),g=b.searchFn&&"function"==typeof b.searchFn?b.searchFn:c.searchFn;d.ftxt=a("<input type=\"text\" class=\"search-txt\" value=\"\" placeholder=\""+c.searchText+"\">").on("click",function(a){a.stopPropagation()}),e.append(d.ftxt),d.optDiv.children("ul").after(f),d.ftxt.on("keyup.sumo",function(){var b=d.optDiv.find("ul.options li.opt").each(function(b,c){var e=a(c),f=e.data("opt")[0];f.hidden=g(e.text(),d.ftxt.val()),e.toggleClass("hidden",f.hidden)}).not(".hidden");f.html(c.noMatch.replace(/\{0\}/g,"<em></em>")).toggle(!b.length),f.find("em").text(d.ftxt.val()),d.selAllState()})},selAllState:function selAllState(){var b=this;if(c.selectAll&&b.is_multi){var d=0,f=0;b.optDiv.find("li.opt").not(".hidden").each(function(b,c){a(c).hasClass("selected")&&d++,a(c).hasClass("disabled")||f++}),d==f?b.selAll.removeClass("partial").addClass("selected"):0===d?b.selAll.removeClass("selected partial"):b.selAll.addClass("partial")}},showOpts:function showOpts(){var b=this;if(!b.E.attr("disabled")){if(b.E.trigger("sumo:opening",b),b.is_opened=!0,b.select.addClass("open").attr("aria-expanded","true"),b.E.trigger("sumo:opened",b),b.ftxt?b.ftxt.focus():b.select.focus(),a(document).on("click.sumo",function(a){if(!b.select.is(a.target)// if the target of the click isn't the container...
&&0===b.select.has(a.target).length){// ... nor a descendant of the container
if(!b.is_opened)return;b.hideOpts(),c.okCancelInMulti&&(c.isClickAwayOk?b._okbtn():b._cnbtn())}}),b.is_floating){var d=b.optDiv.children("ul").outerHeight()+2;// +2 is clear fix
b.is_multi&&(d+=parseInt(b.optDiv.css("padding-bottom"))),b.optDiv.css("height",d),a("body").addClass("sumoStopScroll")}b.setPstate()}// if select is disabled then retrun
},//maintain state when ok/cancel buttons are available storing the indexes.
setPstate:function setPstate(){var a=this;a.is_multi&&(a.is_floating||c.okCancelInMulti)&&(a.Pstate=[],a.E.find("option").each(function(b,c){c.selected&&a.Pstate.push(b)}))},callChange:function callChange(){this.E.get().forEach(function(a){a.dispatchEvent(new Event("change")),a.dispatchEvent(new Event("click"))})},hideOpts:function hideOpts(){var b=this;b.is_opened&&(b.E.trigger("sumo:closing",b),b.is_opened=!1,b.select.removeClass("open").attr("aria-expanded","true").find("ul li.sel").removeClass("sel"),b.E.trigger("sumo:closed",b),a(document).off("click.sumo"),a("body").removeClass("sumoStopScroll"),c.search&&(b.ftxt.val(""),b.ftxt.trigger("keyup.sumo")))},setOnOpen:function setOnOpen(){var a=this,b=a.optDiv.find("li.opt:not(.hidden)").eq(c.search?0:a.E[0].selectedIndex);b.hasClass("disabled")&&(b=b.next(":not(disabled)"),!b.length)||(a.optDiv.find("li.sel").removeClass("sel"),b.addClass("sel"),a.showOpts())},nav:function nav(a){var b,d=this,e=d.ul.find("li.opt:not(.disabled, .hidden)"),f=d.ul.find("li.opt.sel:not(.hidden)"),g=e.index(f);if(d.is_opened&&f.length){if(a&&0<g)b=e.eq(g-1);else if(!a&&g<e.length-1&&-1<g)b=e.eq(g+1);else return;// if no items before or after
f.removeClass("sel"),f=b.addClass("sel");// setting sel item to visible view.
var h=d.ul,i=h.scrollTop(),j=f.position().top+i;j>=i+h.height()-f.outerHeight()&&h.scrollTop(j-h.height()+f.outerHeight()),j<i&&h.scrollTop(j)}else d.setOnOpen()},basicEvents:function basicEvents(){var b=this;b.CaptionCont.click(function(a){b.E.trigger("click"),b.is_opened?b.hideOpts():b.showOpts(),a.stopPropagation()}),b.select.on("keydown.sumo",function(a){switch(a.which){case 38:b.nav(!0);break;case 40:b.nav(!1);break;case 65:// shortcut ctrl + a to select all and ctrl + shift + a to unselect all.
if(b.is_multi&&a.ctrlKey){b.toggSelAll(!a.shiftKey,1);break}else return;case 32:// space
if(c.search&&b.ftxt.is(a.target))return;break;case 13:b.is_opened?b.optDiv.find("ul li.sel").trigger("click"):b.setOnOpen();break;case 9:return void(c.okCancelInMulti||b.hideOpts());case 27:return c.okCancelInMulti&&b._cnbtn(),void b.hideOpts();default:return;// exit this handler for other keys
}a.preventDefault()}),a(window).on("resize.sumo",function(){b.floatingList()})},onOptClick:function onOptClick(b){var d=this;b.click(function(){var b=a(this);b.hasClass("disabled")||(d.is_multi?(b.toggleClass("selected"),b.data("opt")[0].selected=b.hasClass("selected"),!1===b.data("opt")[0].selected&&(d.lastUnselected=b.data("opt")[0].textContent),d.selAllState()):(b.parent().find("li.selected").removeClass("selected"),b.toggleClass("selected"),b.data("opt")[0].selected=!0),!(d.is_multi&&c.triggerChangeCombined&&(d.is_floating||c.okCancelInMulti))&&(d.setText(),d.callChange()),!d.is_multi&&d.hideOpts())})},// fixed some variables that were not explicitly typed (michc)
setText:function setText(){var b=this;if(b.placeholder="",b.is_multi){//selected options.
for(var d=b.E.find(":checked").not(":disabled"),e=0;e<d.length;e++)if(e+1>=c.csvDispCount&&c.csvDispCount){b.placeholder=d.length===b.E.find("option").length&&c.captionFormatAllSelected?c.captionFormatAllSelected.replace(/\{0\}/g,d.length)+",":c.captionFormat.replace(/\{0\}/g,d.length)+",";break}else b.placeholder+=a(d[e]).text()+", ";b.placeholder=b.placeholder.replace(/,([^,]*)$/,"$1")}else b.placeholder=b.E.find(":checked").not(":disabled").text();var f=!1;b.placeholder||(f=!0,b.placeholder=b.E.attr("placeholder"),!b.placeholder&&(//if placeholder is there then set it
b.placeholder=b.E.find("option:disabled:checked").text())),b.placeholder=b.placeholder?c.prefix+" "+b.placeholder:c.placeholder,b.caption.text(b.placeholder),c.showTitle&&b.CaptionCont.attr("title",b.placeholder);//set the hidden field if post as csv is true.
var g=b.select.find("input.HEMANT123");return g.length&&g.val(b.getSelStr()),f?b.caption.addClass("placeholder"):b.caption.removeClass("placeholder"),b.placeholder},isMobile:function isMobile(){// Adapted from http://www.detectmobilebrowsers.com
// Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
for(var a=navigator.userAgent||navigator.vendor||window.opera,b=0;b<c.nativeOnDevice.length;b++)if(0<a.toString().toLowerCase().indexOf(c.nativeOnDevice[b].toLowerCase()))return c.nativeOnDevice[b];return!1},setNativeMobile:function setNativeMobile(){var a=this;//.css('height', O.select.outerHeight());
a.E.addClass("SelectClass"),a.mob=!0,a.E.change(function(){a.setText()})},floatingList:function floatingList(){var b=this;//called on init and also on resize.
//O.is_floating = true if window width is < specified float width
//set class isFloating
//toggle class according to okCancelInMulti flag only when it is not floating
b.is_floating=a(window).width()<=c.floatWidth,b.optDiv.toggleClass("isFloating",b.is_floating),b.is_floating||b.optDiv.css("height",""),b.optDiv.toggleClass("okCancelInMulti",c.okCancelInMulti&&!b.is_floating)},//HELPERS FOR OUTSIDERS
// validates range of given item operations
vRange:function vRange(a){var b=this,c=b.E.find("option");if(c.length<=a||0>a)throw"index out of bounds";return b},//toggles selection on c as boolean.
toggSel:function toggSel(b,c){var d,e=this;"number"==typeof c?(e.vRange(c),d=e.E.find("option")[c]):d=e.E.find("option[value=\""+c+"\"]")[0]||0;!d||d.disabled||d.selected!==b&&(d.selected=b,!e.mob&&a(d).data("li").toggleClass("selected",b),e.callChange(),e.setPstate(),e.setText(),e.selAllState())},//toggles disabled on c as boolean.
toggDis:function toggDis(a,b){var c=this.vRange(b);c.E.find("option")[b].disabled=a,a&&(c.E.find("option")[b].selected=!1),c.mob||c.optDiv.find("ul.options li").eq(b).toggleClass("disabled",a).removeClass("selected"),c.setText()},// toggle disable/enable on complete select control
toggSumo:function toggSumo(a){var b=this;return b.enabled=a,b.select.toggleClass("disabled",a),a?(b.E.attr("disabled","disabled"),b.select.removeAttr("tabindex")):(b.E.removeAttr("disabled"),b.select.attr("tabindex","0")),b},// toggles all option on c as boolean.
// set direct=false/0 bypasses okCancelInMulti behaviour.
toggSelAll:function toggSelAll(b,c){var d=this;d.E.find("option:not(:disabled,:hidden)").each(function(c,d){var e=d.selected,f=a(d).data("li");f.hasClass("hidden")||(!b?e&&f.trigger("click"):!e&&f.trigger("click"))}),c||(!d.mob&&d.selAll&&d.selAll.removeClass("partial").toggleClass("selected",!!b),d.callChange(),d.setText(),d.setPstate())},/* outside accessibility options
         which can be accessed from the element instance.
         */reload:function reload(){var b=this.unload();return a(b).SumoSelect(c)},unload:function unload(){var a=this;return a.select.before(a.E),a.E.show(),c.outputAsCSV&&a.is_multi&&a.select.find("input.HEMANT123").length&&a.E.attr("name",a.select.find("input.HEMANT123").attr("name")),a.select.remove(),delete d.sumo,d},//## add a new option to select at a given index.
add:function add(b,c,e){if("undefined"==typeof b)throw"No value to add";var f=this,g=f.E.find("option");"number"==typeof c&&(e=c,c=b),"undefined"==typeof c&&(c=b);var h=a("<option></option>").val(b).html(c);if(g.length<e)throw"index out of bounds";return"undefined"==typeof e||g.length===e?(f.E.append(h),!f.mob&&f.ul.append(f.createLi(h))):(g.eq(e).before(h),!f.mob&&f.ul.find("li.opt").eq(e).before(f.createLi(h))),d},//## removes an item at a given index.
remove:function remove(a){var b=this.vRange(a);b.E.find("option").eq(a).remove(),b.mob||b.optDiv.find("ul.options li").eq(a).remove(),b.setText()},// removes all but the selected one
removeAll:function removeAll(){for(var a=this,b=a.E.find("option"),c=b.length-1;0<=c;c--)!0!==b[c].selected&&a.remove(c)},find:function find(a){var b=this,c=b.E.find("option");for(var d in c)if(c[d].value===a)return parseInt(d);return-1},//## Select an item at a given index.
selectItem:function selectItem(a){this.toggSel(!0,a)},//## UnSelect an iten at a given index.
unSelectItem:function unSelectItem(a){this.toggSel(!1,a)},//## Select all items  of the select.
selectAll:function selectAll(){this.toggSelAll(!0)},//## UnSelect all items of the select.
unSelectAll:function unSelectAll(){this.toggSelAll(!1)},//## Disable an iten at a given index.
disableItem:function disableItem(a){this.toggDis(!0,a)},//## Removes disabled an iten at a given index.
enableItem:function enableItem(a){this.toggDis(!1,a)},//## New simple methods as getter and setter are not working fine in ie8-
//## variable to check state of control if enabled or disabled.
enabled:!0,//## Enables the control
enable:function enable(){return this.toggSumo(!1)},//## Disables the control
disable:function disable(){return this.toggSumo(!0)},init:function init(){var a=this;return a.createElems(),a.setText(),a}},d.sumo.init())});return 1===d.length?d[0]:d}});
