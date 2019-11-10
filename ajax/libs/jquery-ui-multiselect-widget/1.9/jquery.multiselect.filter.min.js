/*
 * jQuery MultiSelect UI Widget Filtering Plugin 1.1
 * Copyright (c) 2011 Eric Hynds
 *
 * http://www.erichynds.com/jquery/jquery-ui-multiselect-widget/
 *
 * Depends:
 *   - jQuery UI MultiSelect widget
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
*/
(function(b){var j=/[\-\[\]{}()*+?.,\\^$|#\s]/g;b.widget("ech.multiselectfilter",{options:{label:"Filter:",width:null,placeholder:"Enter keywords"},_create:function(){var a=this,c=this.options,e=this.instance=b(this.element).data("multiselect");this.header=e.menu.find(".ui-multiselect-header").addClass("ui-multiselect-hasfilter");c=this.wrapper=b('<div class="ui-multiselect-filter">'+(c.label.length?c.label:"")+'<input placeholder="'+c.placeholder+'" type="search"'+(/\d/.test(c.width)?'style="width:'+ c.width+'px"':"")+" /></div>").prependTo(this.header);this.inputs=e.menu.find('input[type="checkbox"], input[type="radio"]');this.input=c.find("input").bind({keydown:function(d){d.which===13&&d.preventDefault()},keyup:b.proxy(a._handler,a),click:b.proxy(a._handler,a)});this.updateCache();e._toggleChecked=function(d,g){var h=g&&g.length?g:this.labels.find("input");h.not(a.instance._isOpen?":disabled, :hidden":":disabled").attr("checked",d);this.update();var f=h.map(function(){return this.value}).get(); this.element.find("option").filter(function(){return!this.disabled&&b.inArray(this.value,f)>-1}).attr({selected:d,"aria-selected":d})};b(document).bind("multiselectrefresh",function(){a.updateCache();a._handler()})},_handler:function(a){var c=b.trim(this.input[0].value.toLowerCase()),e=this.rows,d=this.inputs,g=this.cache;if(c){e.hide();var h=RegExp(c.replace(j,"\\$&"),"gi");this._trigger("filter",a,b.map(g,function(f,i){if(f.search(h)!==-1){e.eq(i).show();return d.get(i)}return null}))}else e.show(); this.instance.menu.find(".ui-multiselect-optgroup-label").each(function(){var f=b(this);f[f.nextUntil(".ui-multiselect-optgroup-label").filter(":visible").length?"show":"hide"]()})},updateCache:function(){this.rows=this.instance.menu.find(".ui-multiselect-checkboxes li:not(.ui-multiselect-optgroup-label)");this.cache=this.element.children().map(function(){var a=b(this);if(this.tagName.toLowerCase()==="optgroup")a=a.children();if(!a.val().length)return null;return a.map(function(){return this.innerHTML.toLowerCase()}).get()}).get()}, widget:function(){return this.wrapper},destroy:function(){b.Widget.prototype.destroy.call(this);this.input.val("").trigger("keyup");this.wrapper.remove()}})})(jQuery);