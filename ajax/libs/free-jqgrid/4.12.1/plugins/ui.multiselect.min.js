/*
 jQuery UI Multiselect

 Authors:
  Michael Aufreiter (quasipartikel.at)
  Yanick Rochon (yanick.rochon[at]gmail[dot]com)

 Dual licensed under the MIT (MIT-LICENSE.txt)
 and GPL (GPL-LICENSE.txt) licenses.

 http://www.quasipartikel.at/multiselect/


 Depends:
 ui.core.js
 ui.sortable.js

 Optional:
 localization (http://plugins.jquery.com/project/localisation)
 scrollTo (http://plugins.jquery.com/project/ScrollTo)

 Todo:
  Make batch actions faster
  Implement dynamic insertion through remote calls
*/
(function(b){"function"===typeof define&&define.amd?define(["jquery","./jqdnr","./jqmodal"],b):"object"===typeof exports?b(require("jquery")):b(jQuery)})(function(b){b.widget("ui.multiselect",{options:{sortable:!0,searchable:!0,doubleClickable:!0,animated:"fast",show:"slideDown",hide:"slideUp",dividerLocation:.6,availableFirst:!1,nodeComparator:function(a,b){var d=a.text(),e=b.text();return d==e?0:d<e?-1:1}},_create:function(){this.element.hide();this.id=this.element.attr("id");this.container=b('<div class="ui-multiselect ui-helper-clearfix ui-widget"></div>').insertAfter(this.element);
this.count=0;this.selectedContainer=b('<div class="selected"></div>').appendTo(this.container);this.availableContainer=b('<div class="available"></div>')[this.options.availableFirst?"prependTo":"appendTo"](this.container);this.selectedActions=b('<div class="actions ui-widget-header ui-helper-clearfix"><span class="count">0 '+b.ui.multiselect.locale.itemsCount+'</span><a href="#" class="remove-all">'+b.ui.multiselect.locale.removeAll+"</a></div>").appendTo(this.selectedContainer);this.availableActions=
b('<div class="actions ui-widget-header ui-helper-clearfix"><input type="text" class="search empty ui-widget-content ui-corner-all"/><a href="#" class="add-all">'+b.ui.multiselect.locale.addAll+"</a></div>").appendTo(this.availableContainer);this.selectedList=b('<ul class="selected connected-list"><li class="ui-helper-hidden-accessible"></li></ul>').bind("selectstart",function(){return!1}).appendTo(this.selectedContainer);this.availableList=b('<ul class="available connected-list"><li class="ui-helper-hidden-accessible"></li></ul>').bind("selectstart",
function(){return!1}).appendTo(this.availableContainer);var a=this;this.container.width(this.element.width()+1);this.selectedContainer.width(Math.floor(this.element.width()*this.options.dividerLocation));this.availableContainer.width(Math.floor(this.element.width()*(1-this.options.dividerLocation)));this.selectedList.height(Math.max(this.element.height()-this.selectedActions.height(),1));this.availableList.height(Math.max(this.element.height()-this.availableActions.height(),1));this.options.animated||
(this.options.show="show",this.options.hide="hide");this._populateLists(this.element.find("option"));this.options.sortable&&this.selectedList.sortable({placeholder:"ui-state-highlight",axis:"y",update:function(c,d){a.selectedList.find("li").each(function(){b(this).data("optionLink")&&b(this).data("optionLink").remove().appendTo(a.element)})},receive:function(c,d){d.item.data("optionLink").attr("selected",!0);a.count+=1;a._updateCount();a.selectedList.children(".ui-draggable").each(function(){b(this).removeClass("ui-draggable");
b(this).data("optionLink",d.item.data("optionLink"));b(this).data("idx",d.item.data("idx"));a._applyItemState(b(this),!0)});setTimeout(function(){d.item.remove()},1)}});this.options.searchable?this._registerSearchEvents(this.availableContainer.find("input.search")):b(".search").hide();this.container.find(".remove-all").click(function(){a._populateLists(a.element.find("option").removeAttr("selected"));return!1});this.container.find(".add-all").click(function(){var c=a.element.find("option").not("[selected]");
1<a.availableList.children("li:hidden").length?a.availableList.children("li").each(function(a){b(this).is(":visible")&&b(c[a-1]).attr("selected","selected")}):c.attr("selected","selected");a._populateLists(a.element.find("option"));return!1})},destroy:function(){this.element.show();this.container.remove();b.Widget.prototype.destroy.apply(this,arguments)},_populateLists:function(a){this.selectedList.children(".ui-element").remove();this.availableList.children(".ui-element").remove();this.count=0;var c=
this;b(a.map(function(a){var e=b(this).is("[selected]"),f=c._getOptionNode(this).appendTo(e?c.selectedList:c.availableList).show();e&&(c.count+=1);c._applyItemState(f,e);f.data("idx",a);return f[0]}));this._updateCount();c._filter.apply(this.availableContainer.find("input.search"),[c.availableList])},_updateCount:function(){this.element.trigger("change");this.selectedContainer.find("span.count").text(this.count+" "+b.ui.multiselect.locale.itemsCount)},_getOptionNode:function(a){a=b(a);var c=b('<li class="ui-state-default ui-element" title="'+
(a.attr("title")||a.text())+'"><span class="ui-icon"/>'+a.text()+'<a href="#" class="action"><span class="ui-corner-all ui-icon"/></a></li>').hide();c.data("optionLink",a);return c},_cloneWithData:function(a){var b=a.clone(!1,!1);b.data("optionLink",a.data("optionLink"));b.data("idx",a.data("idx"));return b},_setSelected:function(a,c){a.data("optionLink").attr("selected",c);if(c){var d=this._cloneWithData(a);a[this.options.hide](this.options.animated,function(){b(this).remove()});d.appendTo(this.selectedList).hide()[this.options.show](this.options.animated);
this._applyItemState(d,!0);return d}var e=this.availableList.find("li"),f=this.options.nodeComparator,d=null,g=a.data("idx"),h=f(a,b(e[g]));if(h)for(;0<=g&&g<e.length;){if(0<h?g++:g--,h!=f(a,b(e[g]))){d=e[0<h?g:g+1];break}}else d=e[g];e=this._cloneWithData(a);d?e.insertBefore(b(d)):e.appendTo(this.availableList);a[this.options.hide](this.options.animated,function(){b(this).remove()});e.hide()[this.options.show](this.options.animated);this._applyItemState(e,!1);return e},_applyItemState:function(a,
b){b?(this.options.sortable?a.children("span").addClass("ui-icon-arrowthick-2-n-s").removeClass("ui-helper-hidden").addClass("ui-icon"):a.children("span").removeClass("ui-icon-arrowthick-2-n-s").addClass("ui-helper-hidden").removeClass("ui-icon"),a.find("a.action span").addClass("ui-icon-minus").removeClass("ui-icon-plus"),this._registerRemoveEvents(a.find("a.action"))):(a.children("span").removeClass("ui-icon-arrowthick-2-n-s").addClass("ui-helper-hidden").removeClass("ui-icon"),a.find("a.action span").addClass("ui-icon-plus").removeClass("ui-icon-minus"),
this._registerAddEvents(a.find("a.action")));this._registerDoubleClickEvents(a);this._registerHoverEvents(a)},_filter:function(a){var c=b(this),d=a.children("li");a=d.map(function(){return b(this).text().toLowerCase()});var e=b.trim(c.val().toLowerCase()),f=[];e?(d.hide(),a.each(function(a){-1<this.indexOf(e)&&f.push(a)}),b.each(f,function(){b(d[this]).show()})):d.show()},_registerDoubleClickEvents:function(a){this.options.doubleClickable&&a.dblclick(function(c){0===b(c.target).closest(".action").length&&
a.find("a.action").click()})},_registerHoverEvents:function(a){a.removeClass("ui-state-hover");a.mouseover(function(){b(this).addClass("ui-state-hover")});a.mouseout(function(){b(this).removeClass("ui-state-hover")})},_registerAddEvents:function(a){var c=this;a.click(function(){c._setSelected(b(this).parent(),!0);c.count+=1;c._updateCount();return!1});this.options.sortable&&a.each(function(){b(this).parent().draggable({connectToSortable:c.selectedList,helper:function(){var a=c._cloneWithData(b(this)).width(b(this).width()-
50);a.width(b(this).width());return a},appendTo:c.container,containment:c.container,revert:"invalid"})})},_registerRemoveEvents:function(a){var c=this;a.click(function(){c._setSelected(b(this).parent(),!1);--c.count;c._updateCount();return!1})},_registerSearchEvents:function(a){var c=this;a.focus(function(){b(this).addClass("ui-state-active")}).blur(function(){b(this).removeClass("ui-state-active")}).keypress(function(a){if(13==a.keyCode)return!1}).keyup(function(){c._filter.apply(this,[c.availableList])})}});
b.extend(b.ui.multiselect,{locale:{addAll:"Add all",removeAll:"Remove all",itemsCount:"items selected"}})});
//# sourceMappingURL=ui.multiselect.min.map
