/*!
 * JqTree 1.4.6
 * 
 * Copyright 2018 Marco Braak
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},o.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=21)}([function(e,t,o){"use strict";var n;t.__esModule=!0,function(e){e[e.Before=1]="Before",e[e.After=2]="After",e[e.Inside=3]="Inside",e[e.None=4]="None"}(n=t.Position||(t.Position={})),t.position_names={before:n.Before,after:n.After,inside:n.Inside,none:n.None},t.getPositionName=function(e){for(var o in t.position_names)if(t.position_names.hasOwnProperty(o)&&t.position_names[o]===e)return o;return""},t.getPosition=function(e){return t.position_names[e]};var r=function(){function e(t,o,n){void 0===o&&(o=!1),void 0===n&&(n=e),this.name="",this.setData(t),this.children=[],this.parent=null,o&&(this.id_mapping={},this.tree=this,this.node_class=n)}return e.prototype.setData=function(e){var t=this,o=function(e){null!=e&&(t.name=e)};if(e)if("object"!=typeof e)o(e);else for(var n in e)if(e.hasOwnProperty(n)){var r=e[n];"label"===n?o(r):"children"!==n&&(this[n]=r)}},e.prototype.loadFromData=function(e){this.removeChildren();for(var t=0,o=e;t<o.length;t++){var n=o[t],r=new this.tree.node_class(n);this.addChild(r),"object"==typeof n&&n.children&&r.loadFromData(n.children)}},e.prototype.addChild=function(e){this.children.push(e),e._setParent(this)},e.prototype.addChildAtPosition=function(e,t){this.children.splice(t,0,e),e._setParent(this)},e.prototype.removeChild=function(e){e.removeChildren(),this._removeChild(e)},e.prototype.getChildIndex=function(e){return jQuery.inArray(e,this.children)},e.prototype.hasChildren=function(){return 0!==this.children.length},e.prototype.isFolder=function(){return this.hasChildren()||this.load_on_demand},e.prototype.iterate=function(e){var t=function(o,n){if(o.children)for(var r=0,i=o.children;r<i.length;r++){var s=i[r];e(s,n)&&s.hasChildren()&&t(s,n+1)}};t(this,0)},e.prototype.moveNode=function(e,t,o){e.parent&&!e.isParentOf(t)&&(e.parent._removeChild(e),o===n.After?t.parent&&t.parent.addChildAtPosition(e,t.parent.getChildIndex(t)+1):o===n.Before?t.parent&&t.parent.addChildAtPosition(e,t.parent.getChildIndex(t)):o===n.Inside&&t.addChildAtPosition(e,0))},e.prototype.getData=function(e){function t(e){return e.map(function(e){var o={};for(var n in e)if(-1===["parent","children","element","tree"].indexOf(n)&&Object.prototype.hasOwnProperty.call(e,n)){var r=e[n];o[n]=r}return e.hasChildren()&&(o.children=t(e.children)),o})}return void 0===e&&(e=!1),t(e?[this]:this.children)},e.prototype.getNodeByName=function(e){return this.getNodeByCallback(function(t){return t.name===e})},e.prototype.getNodeByCallback=function(e){var t=null;return this.iterate(function(o){return!e(o)||(t=o,!1)}),t},e.prototype.addAfter=function(e){if(this.parent){var t=new this.tree.node_class(e),o=this.parent.getChildIndex(this);return this.parent.addChildAtPosition(t,o+1),"object"==typeof e&&e.children&&e.children.length&&t.loadFromData(e.children),t}return null},e.prototype.addBefore=function(e){if(this.parent){var t=new this.tree.node_class(e),o=this.parent.getChildIndex(this);return this.parent.addChildAtPosition(t,o),"object"==typeof e&&e.children&&e.children.length&&t.loadFromData(e.children),t}return null},e.prototype.addParent=function(e){if(this.parent){var t=new this.tree.node_class(e);t._setParent(this.tree);for(var o=this.parent,n=0,r=o.children;n<r.length;n++){var i=r[n];t.addChild(i)}return o.children=[],o.addChild(t),t}return null},e.prototype.remove=function(){this.parent&&(this.parent.removeChild(this),this.parent=null)},e.prototype.append=function(e){var t=new this.tree.node_class(e);return this.addChild(t),"object"==typeof e&&e.children&&e.children.length&&t.loadFromData(e.children),t},e.prototype.prepend=function(e){var t=new this.tree.node_class(e);return this.addChildAtPosition(t,0),"object"==typeof e&&e.children&&e.children.length&&t.loadFromData(e.children),t},e.prototype.isParentOf=function(e){for(var t=e.parent;t;){if(t===this)return!0;t=t.parent}return!1},e.prototype.getLevel=function(){for(var e=0,t=this;t.parent;)e+=1,t=t.parent;return e},e.prototype.getNodeById=function(e){return this.id_mapping[e]},e.prototype.addNodeToIndex=function(e){null!=e.id&&(this.id_mapping[e.id]=e)},e.prototype.removeNodeFromIndex=function(e){null!=e.id&&delete this.id_mapping[e.id]},e.prototype.removeChildren=function(){var e=this;this.iterate(function(t){return e.tree.removeNodeFromIndex(t),!0}),this.children=[]},e.prototype.getPreviousSibling=function(){if(this.parent){var e=this.parent.getChildIndex(this)-1;return e>=0?this.parent.children[e]:null}return null},e.prototype.getNextSibling=function(){if(this.parent){var e=this.parent.getChildIndex(this)+1;return e<this.parent.children.length?this.parent.children[e]:null}return null},e.prototype.getNodesByProperty=function(e,t){return this.filter(function(o){return o[e]===t})},e.prototype.filter=function(e){var t=[];return this.iterate(function(o){return e(o)&&t.push(o),!0}),t},e.prototype.getNextNode=function(e){if(void 0===e&&(e=!0),e&&this.hasChildren()&&this.is_open)return this.children[0];if(this.parent){var t=this.getNextSibling();return t||this.parent.getNextNode(!1)}return null},e.prototype.getPreviousNode=function(){if(this.parent){var e=this.getPreviousSibling();return e?e.hasChildren()&&e.is_open?e.getLastChild():e:this.getParent()}return null},e.prototype.getParent=function(){return this.parent&&this.parent.parent?this.parent:null},e.prototype.getLastChild=function(){if(this.hasChildren()){var e=this.children[this.children.length-1];return e.hasChildren()&&e.is_open?e.getLastChild():e}return null},e.prototype.initFromData=function(e){var t,o=this,n=function(e){for(var t=0,n=e;t<n.length;t++){var r=n[t],i=new o.tree.node_class("");i.initFromData(r),o.addChild(i)}};t=e,o.setData(t),t.children&&n(t.children)},e.prototype._setParent=function(e){this.parent=e,this.tree=e.tree,this.tree.addNodeToIndex(this)},e.prototype._removeChild=function(e){this.children.splice(this.getChildIndex(e),1),this.tree.removeNodeFromIndex(e)},e}();t.Node=r},function(e,t,o){"use strict";t.__esModule=!0,t.isInt=function(e){return"number"==typeof e&&e%1==0},t.isFunction=function(e){return"function"==typeof e},t.html_escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")},t.getBoolString=function(e){return e?"true":"false"}},function(e,t,o){"use strict";t.__esModule=!0;var n=function(){function e(e,t){this.$el=jQuery(e);var o=this.constructor.defaults;this.options=jQuery.extend({},o,t)}return e.register=function(t,o){var n=function(){return"simple_widget_"+o};function r(t,o){var n=jQuery.data(t,o);return n&&n instanceof e?n:null}jQuery.fn[o]=function(o){for(var i=[],s=1;s<arguments.length;s++)i[s-1]=arguments[s];if(void 0===o||"object"==typeof o)return function(e,o){for(var i=n(),s=0,a=e.get();s<a.length;s++){var l=a[s];if(!r(l,i)){var d=new t(l,o);jQuery.data(l,i)||jQuery.data(l,i,d),d._init()}}return e}(this,o);if("string"==typeof o&&"_"!==o[0]){var a=o;return"destroy"===a?function(e){for(var t=n(),o=0,i=e.get();o<i.length;o++){var s=i[o],a=r(s,t);a&&a.destroy(),jQuery.removeData(s,t)}}(this):"get_widget_class"===a?t:function(t,o,r){for(var i=null,s=0,a=t.get();s<a.length;s++){var l=a[s],d=jQuery.data(l,n());if(d&&d instanceof e){var h=d[o];h&&"function"==typeof h&&(i=h.apply(d,r))}}return i}(this,a,i)}}},e.prototype.destroy=function(){this._deinit()},e.prototype._init=function(){},e.prototype._deinit=function(){},e.defaults={},e}();t.default=n},function(e,t){e.exports=jQuery},function(e,t,o){"use strict";var n,r=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)});t.__esModule=!0;var i=o(0),s=function(){function e(e,t){this.init(e,t)}return e.prototype.init=function(e,t){this.node=e,this.tree_widget=t,e.element||(e.element=this.tree_widget.element.get(0)),this.$element=jQuery(e.element)},e.prototype.addDropHint=function(e){return this.mustShowBorderDropHint(e)?new l(this.$element,this.tree_widget._getScrollLeft()):new d(this.node,this.$element,e)},e.prototype.select=function(e){var t=this.getLi();t.addClass("jqtree-selected"),t.attr("aria-selected","true");var o=this.getSpan();o.attr("tabindex",this.tree_widget.options.tabIndex),e&&o.focus()},e.prototype.deselect=function(){var e=this.getLi();e.removeClass("jqtree-selected"),e.attr("aria-selected","false");var t=this.getSpan();t.removeAttr("tabindex"),t.blur()},e.prototype.getUl=function(){return this.$element.children("ul:first")},e.prototype.getSpan=function(){return this.$element.children(".jqtree-element").find("span.jqtree-title")},e.prototype.getLi=function(){return this.$element},e.prototype.mustShowBorderDropHint=function(e){return e===i.Position.Inside},e}();t.NodeElement=s;var a=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype.open=function(e,t,o){var n=this;if(void 0===t&&(t=!0),void 0===o&&(o="fast"),!this.node.is_open){this.node.is_open=!0;var r=this.getButton();r.removeClass("jqtree-closed"),r.html("");var i=r.get(0);if(i){var s=this.tree_widget.renderer.opened_icon_element.cloneNode(!1);i.appendChild(s)}var a=function(){n.getLi().removeClass("jqtree-closed"),n.getSpan().attr("aria-expanded","true"),e&&e(n.node),n.tree_widget._triggerEvent("tree.open",{node:n.node})};t?this.getUl().slideDown(o,a):(this.getUl().show(),a())}},t.prototype.close=function(e,t){var o=this;if(void 0===e&&(e=!0),void 0===t&&(t="fast"),this.node.is_open){this.node.is_open=!1;var n=this.getButton();n.addClass("jqtree-closed"),n.html("");var r=n.get(0);if(r){var i=this.tree_widget.renderer.closed_icon_element.cloneNode(!1);r.appendChild(i)}var s=function(){o.getLi().addClass("jqtree-closed"),o.getSpan().attr("aria-expanded","false"),o.tree_widget._triggerEvent("tree.close",{node:o.node})};e?this.getUl().slideUp(t,s):(this.getUl().hide(),s())}},t.prototype.mustShowBorderDropHint=function(e){return!this.node.is_open&&e===i.Position.Inside},t.prototype.getButton=function(){return this.$element.children(".jqtree-element").find("a.jqtree-toggler")},t}(s);t.FolderElement=a;var l=function(){function e(e,t){var o=e.children(".jqtree-element"),n=e.width()||0,r=Math.max(n+t-4,0),i=o.outerHeight()||0,s=Math.max(i-4,0);this.$hint=jQuery('<span class="jqtree-border"></span>'),o.append(this.$hint),this.$hint.css({width:r,height:s})}return e.prototype.remove=function(){this.$hint.remove()},e}();t.BorderDropHint=l;var d=function(){function e(e,t,o){this.$element=t,this.node=e,this.$ghost=jQuery('<li class="jqtree_common jqtree-ghost"><span class="jqtree_common jqtree-circle"></span>\n            <span class="jqtree_common jqtree-line"></span></li>'),o===i.Position.After?this.moveAfter():o===i.Position.Before?this.moveBefore():o===i.Position.Inside&&(e.isFolder()&&e.is_open?this.moveInsideOpenFolder():this.moveInside())}return e.prototype.remove=function(){this.$ghost.remove()},e.prototype.moveAfter=function(){this.$element.after(this.$ghost)},e.prototype.moveBefore=function(){this.$element.before(this.$ghost)},e.prototype.moveInsideOpenFolder=function(){jQuery(this.node.children[0].element).before(this.$ghost)},e.prototype.moveInside=function(){this.$element.after(this.$ghost),this.$ghost.addClass("jqtree-inside")},e}()},function(e,t,o){"use strict";t.__esModule=!0;var n=function(){function e(e){this.tree_widget=e,this.clear()}return e.prototype.getSelectedNode=function(){var e=this.getSelectedNodes();return!!e.length&&e[0]},e.prototype.getSelectedNodes=function(){if(this.selected_single_node)return[this.selected_single_node];var e=[];for(var t in this.selected_nodes)if(this.selected_nodes.hasOwnProperty(t)){var o=this.tree_widget.getNodeById(t);o&&e.push(o)}return e},e.prototype.getSelectedNodesUnder=function(e){if(this.selected_single_node)return e.isParentOf(this.selected_single_node)?[this.selected_single_node]:[];var t=[];for(var o in this.selected_nodes)if(this.selected_nodes.hasOwnProperty(o)){var n=this.tree_widget.getNodeById(o);n&&e.isParentOf(n)&&t.push(n)}return t},e.prototype.isNodeSelected=function(e){return!!e&&(null!=e.id?!!this.selected_nodes[e.id]:!!this.selected_single_node&&this.selected_single_node.element===e.element)},e.prototype.clear=function(){this.selected_nodes={},this.selected_single_node=null},e.prototype.removeFromSelection=function(e,t){var o=this;void 0===t&&(t=!1),null==e.id?this.selected_single_node&&e.element===this.selected_single_node.element&&(this.selected_single_node=null):(delete this.selected_nodes[e.id],t&&e.iterate(function(){return delete o.selected_nodes[e.id],!0}))},e.prototype.addToSelection=function(e){null!=e.id?this.selected_nodes[e.id]=!0:this.selected_single_node=e},e}();t.default=n},function(e,t,o){"use strict";t.__esModule=!0;var n=function(){function e(e){this.tree_widget=e,this.previous_top=-1,this.is_initialized=!1}return e.prototype.checkScrolling=function(){this.ensureInit(),this.checkVerticalScrolling(),this.checkHorizontalScrolling()},e.prototype.scrollToY=function(e){if(this.ensureInit(),this.$scroll_parent)this.$scroll_parent[0].scrollTop=e;else{var t=this.tree_widget.$el.offset(),o=t?t.top:0;jQuery(document).scrollTop(e+o)}},e.prototype.isScrolledIntoView=function(e){var t,o,n,r;this.ensureInit();var i,s=e.height()||0;this.$scroll_parent?(r=0,o=this.$scroll_parent.height()||0,t=(n=((i=e.offset())?i.top:0)-this.scroll_parent_top)+s):(o=(r=jQuery(window).scrollTop()||0)+(jQuery(window).height()||0),t=(n=(i=e.offset())?i.top:0)+s);return t<=o&&n>=r},e.prototype.getScrollLeft=function(){return this.$scroll_parent&&this.$scroll_parent.scrollLeft()||0},e.prototype.initScrollParent=function(){var e=this,t=function(){e.scroll_parent_top=0,e.$scroll_parent=null};"fixed"===this.tree_widget.$el.css("position")&&t();var o=function(){var t=["overflow","overflow-y"],o=function(e){for(var o=0,n=t;o<n.length;o++){var r=n[o],i=e.css(r);if("auto"===i||"scroll"===i)return!0}return!1};if(o(e.tree_widget.$el))return e.tree_widget.$el;for(var n=0,r=e.tree_widget.$el.parents().get();n<r.length;n++){var i=r[n],s=jQuery(i);if(o(s))return s}return null}();if(o&&o.length&&"HTML"!==o[0].tagName){this.$scroll_parent=o;var n=this.$scroll_parent.offset();this.scroll_parent_top=n?n.top:0}else t();this.is_initialized=!0},e.prototype.ensureInit=function(){this.is_initialized||this.initScrollParent()},e.prototype.handleVerticalScrollingWithScrollParent=function(e){var t=this.$scroll_parent&&this.$scroll_parent[0];t&&(this.scroll_parent_top+t.offsetHeight-e.bottom<20?(t.scrollTop+=20,this.tree_widget.refreshHitAreas(),this.previous_top=-1):e.top-this.scroll_parent_top<20&&(t.scrollTop-=20,this.tree_widget.refreshHitAreas(),this.previous_top=-1))},e.prototype.handleVerticalScrollingWithDocument=function(e){var t=jQuery(document).scrollTop()||0;e.top-t<20?jQuery(document).scrollTop(t-20):(jQuery(window).height()||0)-(e.bottom-t)<20&&jQuery(document).scrollTop(t+20)},e.prototype.checkVerticalScrolling=function(){var e=this.tree_widget.dnd_handler&&this.tree_widget.dnd_handler.hovered_area;e&&e.top!==this.previous_top&&(this.previous_top=e.top,this.$scroll_parent?this.handleVerticalScrollingWithScrollParent(e):this.handleVerticalScrollingWithDocument(e))},e.prototype.checkHorizontalScrolling=function(){var e=this.tree_widget.dnd_handler&&this.tree_widget.dnd_handler.position_info;e&&(this.$scroll_parent?this.handleHorizontalScrollingWithParent(e):this.handleHorizontalScrollingWithDocument(e))},e.prototype.handleHorizontalScrollingWithParent=function(e){var t=this.$scroll_parent,o=t&&t.offset();if(t&&o){var n=t[0],r=n.scrollLeft+n.clientWidth<n.scrollWidth,i=n.scrollLeft>0,s=o.left+n.clientWidth,a=o.left,l=e.page_x>s-20,d=e.page_x<a+20;l&&r?n.scrollLeft=Math.min(n.scrollLeft+20,n.scrollWidth):d&&i&&(n.scrollLeft=Math.max(n.scrollLeft-20,0))}},e.prototype.handleHorizontalScrollingWithDocument=function(e){var t=jQuery(document),o=t.scrollLeft()||0,n=jQuery(window).width()||0,r=o>0,i=e.page_x>n-20,s=e.page_x-o<20;i?t.scrollLeft(o+20):s&&r&&t.scrollLeft(Math.max(o-20,0))},e}();t.default=n},function(e,t,o){"use strict";t.__esModule=!0;var n=o(1),r=function(){function e(e){this.tree_widget=e}return e.prototype.saveState=function(){var e=JSON.stringify(this.getState());this.tree_widget.options.onSetStateFromStorage?this.tree_widget.options.onSetStateFromStorage(e):this.supportsLocalStorage()&&localStorage.setItem(this.getKeyName(),e)},e.prototype.getStateFromStorage=function(){var e=this._loadFromStorage();return e?this._parseState(e):null},e.prototype.getState=function(){var e,t=this;return{open_nodes:(e=[],t.tree_widget.tree.iterate(function(t){return t.is_open&&t.id&&t.hasChildren()&&e.push(t.id),!0}),e),selected_node:t.tree_widget.getSelectedNodes().map(function(e){return e.id})}},e.prototype.setInitialState=function(e){if(e){var t=!1;return e.open_nodes&&(t=this._openInitialNodes(e.open_nodes)),e.selected_node&&(this._resetSelection(),this._selectInitialNodes(e.selected_node)),t}return!1},e.prototype.setInitialStateOnDemand=function(e,t){e?this._setInitialStateOnDemand(e.open_nodes,e.selected_node,t):t()},e.prototype.getNodeIdToBeSelected=function(){var e=this.getStateFromStorage();return e&&e.selected_node?e.selected_node[0]:null},e.prototype._parseState=function(e){var t=jQuery.parseJSON(e);return t&&t.selected_node&&n.isInt(t.selected_node)&&(t.selected_node=[t.selected_node]),t},e.prototype._loadFromStorage=function(){return this.tree_widget.options.onGetStateFromStorage?this.tree_widget.options.onGetStateFromStorage():this.supportsLocalStorage()?localStorage.getItem(this.getKeyName()):void 0},e.prototype._openInitialNodes=function(e){for(var t=!1,o=0,n=e;o<n.length;o++){var r=n[o],i=this.tree_widget.getNodeById(r);i&&(i.load_on_demand?t=!0:i.is_open=!0)}return t},e.prototype._selectInitialNodes=function(e){for(var t=0,o=0,n=e;o<n.length;o++){var r=n[o],i=this.tree_widget.getNodeById(r);i&&(t+=1,this.tree_widget.select_node_handler&&this.tree_widget.select_node_handler.addToSelection(i))}return 0!==t},e.prototype._resetSelection=function(){var e=this.tree_widget.select_node_handler;e&&e.getSelectedNodes().forEach(function(t){e.removeFromSelection(t)})},e.prototype._setInitialStateOnDemand=function(e,t,o){var n=this,r=0,i=e,s=function(){for(var e=[],s=0,l=i;s<l.length;s++){var d=l[s],h=n.tree_widget.getNodeById(d);h?h.is_loading||(h.load_on_demand?a(h):n.tree_widget._openNode(h,!1,null)):e.push(d)}i=e,n._selectInitialNodes(t)&&n.tree_widget._refreshElements(null),0===r&&o()},a=function(e){r+=1,n.tree_widget._openNode(e,!1,function(){r-=1,s()})};s()},e.prototype.getKeyName=function(){return"string"==typeof this.tree_widget.options.saveState?this.tree_widget.options.saveState:"tree"},e.prototype.supportsLocalStorage=function(){return null==this._supportsLocalStorage&&(this._supportsLocalStorage=function(){if(null==localStorage)return!1;try{var e="_storage_test";sessionStorage.setItem(e,"value"),sessionStorage.removeItem(e)}catch(e){return!1}return!0}()),this._supportsLocalStorage},e}();t.default=r},function(e,t,o){"use strict";var n,r=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)});t.__esModule=!0;var i=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.mouseDown=function(e){if(1===e.which){var o=t._handleMouseDown(t._getPositionInfo(e));return o&&e.preventDefault(),o}},t.mouseMove=function(e){return t._handleMouseMove(e,t._getPositionInfo(e))},t.mouseUp=function(e){return t._handleMouseUp(t._getPositionInfo(e))},t.touchStart=function(e){var o=e.originalEvent;if(!(o.touches.length>1)){var n=o.changedTouches[0];return t._handleMouseDown(t._getPositionInfo(n))}},t.touchMove=function(e){var o=e.originalEvent;if(!(o.touches.length>1)){var n=o.changedTouches[0];return t._handleMouseMove(e,t._getPositionInfo(n))}},t.touchEnd=function(e){var o=e.originalEvent;if(!(o.touches.length>1)){var n=o.changedTouches[0];return t._handleMouseUp(t._getPositionInfo(n))}},t}return r(t,e),t.prototype.setMouseDelay=function(e){this.mouse_delay=e},t.prototype._init=function(){this.$el.on("mousedown.mousewidget",this.mouseDown),this.$el.on("touchstart.mousewidget",this.touchStart),this.is_mouse_started=!1,this.mouse_delay=0,this._mouse_delay_timer=null,this._is_mouse_delay_met=!0,this.mouse_down_info=null},t.prototype._deinit=function(){this.$el.off("mousedown.mousewidget"),this.$el.off("touchstart.mousewidget");var e=jQuery(document);e.off("mousemove.mousewidget"),e.off("mouseup.mousewidget")},t.prototype._handleMouseDown=function(e){if(this.is_mouse_started&&this._handleMouseUp(e),this.mouse_down_info=e,this._mouseCapture(e))return this._handleStartMouse(),!0},t.prototype._handleStartMouse=function(){var e=jQuery(document);e.on("mousemove.mousewidget",this.mouseMove),e.on("touchmove.mousewidget",this.touchMove),e.on("mouseup.mousewidget",this.mouseUp),e.on("touchend.mousewidget",this.touchEnd),this.mouse_delay&&this._startMouseDelayTimer()},t.prototype._startMouseDelayTimer=function(){var e=this;this._mouse_delay_timer&&clearTimeout(this._mouse_delay_timer),this._mouse_delay_timer=setTimeout(function(){e._is_mouse_delay_met=!0},this.mouse_delay),this._is_mouse_delay_met=!1},t.prototype._handleMouseMove=function(e,t){return this.is_mouse_started?(this._mouseDrag(t),e.preventDefault()):!(!this.mouse_delay||this._is_mouse_delay_met)||(this.mouse_down_info&&(this.is_mouse_started=!1!==this._mouseStart(this.mouse_down_info)),this.is_mouse_started?this._mouseDrag(t):this._handleMouseUp(t),!this.is_mouse_started)},t.prototype._getPositionInfo=function(e){return{page_x:e.pageX,page_y:e.pageY,target:e.target,original_event:e}},t.prototype._handleMouseUp=function(e){var t=jQuery(document);t.off("mousemove.mousewidget"),t.off("touchmove.mousewidget"),t.off("mouseup.mousewidget"),t.off("touchend.mousewidget"),this.is_mouse_started&&(this.is_mouse_started=!1,this._mouseStop(e))},t}(o(2).default);t.default=i},function(e,t,o){"use strict";t.__esModule=!0;var n=function(){function e(t){var o=this;this.handleKeyDown=function(t){if(!o.canHandleKeyboard())return!0;switch(t.which){case e.DOWN:return o.moveDown();case e.UP:return o.moveUp();case e.RIGHT:return o.moveRight();case e.LEFT:return o.moveLeft();default:return!0}},this.tree_widget=t,t.options.keyboardSupport&&jQuery(document).on("keydown.jqtree",this.handleKeyDown)}return e.prototype.deinit=function(){jQuery(document).off("keydown.jqtree")},e.prototype.moveDown=function(){var e=this.tree_widget.getSelectedNode();return!!e&&this.selectNode(e.getNextNode())},e.prototype.moveUp=function(){var e=this.tree_widget.getSelectedNode();return!!e&&this.selectNode(e.getPreviousNode())},e.prototype.moveRight=function(){var e=this.tree_widget.getSelectedNode();return!e||(!e.isFolder()||(e.is_open?this.selectNode(e.getNextNode()):(this.tree_widget.openNode(e),!1)))},e.prototype.moveLeft=function(){var e=this.tree_widget.getSelectedNode();return!e||(e.isFolder()&&e.is_open?(this.tree_widget.closeNode(e),!1):this.selectNode(e.getParent()))},e.prototype.selectNode=function(e){return!e||(this.tree_widget.selectNode(e),this.tree_widget.scroll_handler&&!this.tree_widget.scroll_handler.isScrolledIntoView(jQuery(e.element).find(".jqtree-element"))&&this.tree_widget.scrollToNode(e),!1)},e.prototype.canHandleKeyboard=function(){return this.tree_widget.options.keyboardSupport&&this.isFocusOnTree()&&null!=this.tree_widget.getSelectedNode()},e.prototype.isFocusOnTree=function(){var e=document.activeElement;return e&&"SPAN"===e.tagName&&this.tree_widget._containsElement(e)},e.LEFT=37,e.UP=38,e.RIGHT=39,e.DOWN=40,e}();t.default=n},function(e,t,o){"use strict";t.__esModule=!0;var n=o(1),r=function(){function e(e){this.tree_widget=e,this.opened_icon_element=this.createButtonElement(e.options.openedIcon),this.closed_icon_element=this.createButtonElement(e.options.closedIcon)}return e.prototype.render=function(e){e&&e.parent?this.renderFromNode(e):this.renderFromRoot()},e.prototype.renderFromRoot=function(){var e=this.tree_widget.element;e.empty(),this.createDomElements(e[0],this.tree_widget.tree.children,!0,1)},e.prototype.renderFromNode=function(e){var t=jQuery(e.element),o=this.createLi(e,e.getLevel());this.attachNodeData(e,o),t.after(o),t.remove(),e.children&&this.createDomElements(o,e.children,!1,e.getLevel()+1)},e.prototype.createDomElements=function(e,t,o,n){var r=this.createUl(o);e.appendChild(r);for(var i=0,s=t;i<s.length;i++){var a=s[i],l=this.createLi(a,n);r.appendChild(l),this.attachNodeData(a,l),a.hasChildren()&&this.createDomElements(l,a.children,!1,n+1)}},e.prototype.attachNodeData=function(e,t){e.element=t,jQuery(t).data("node",e)},e.prototype.createUl=function(e){var t,o;e?(t="jqtree-tree",o="tree",this.tree_widget.options.rtl&&(t+=" jqtree-rtl")):(t="",o="group");var n=document.createElement("ul");return n.className="jqtree_common "+t,n.setAttribute("role",o),n},e.prototype.createLi=function(e,t){var o=Boolean(this.tree_widget.select_node_handler&&this.tree_widget.select_node_handler.isNodeSelected(e)),n=e.isFolder()?this.createFolderLi(e,t,o):this.createNodeLi(e,t,o);return this.tree_widget.options.onCreateLi&&this.tree_widget.options.onCreateLi(e,jQuery(n),o),n},e.prototype.createFolderLi=function(e,t,o){var n=this.getButtonClasses(e),r=this.getFolderClasses(e,o),i=e.is_open?this.opened_icon_element:this.closed_icon_element,s=document.createElement("li");s.className="jqtree_common "+r,s.setAttribute("role","presentation");var a=document.createElement("div");a.className="jqtree-element jqtree_common",a.setAttribute("role","presentation"),s.appendChild(a);var l=document.createElement("a");return l.className=n,l.appendChild(i.cloneNode(!0)),l.setAttribute("role","presentation"),l.setAttribute("aria-hidden","true"),this.tree_widget.options.buttonLeft&&a.appendChild(l),a.appendChild(this.createTitleSpan(e.name,t,o,e.is_open,!0)),this.tree_widget.options.buttonLeft||a.appendChild(l),s},e.prototype.createNodeLi=function(e,t,o){var n=["jqtree_common"];o&&n.push("jqtree-selected");var r=n.join(" "),i=document.createElement("li");i.className=r,i.setAttribute("role","presentation");var s=document.createElement("div");return s.className="jqtree-element jqtree_common",s.setAttribute("role","presentation"),i.appendChild(s),s.appendChild(this.createTitleSpan(e.name,t,o,e.is_open,!1)),i},e.prototype.createTitleSpan=function(e,t,o,r,i){var s=document.createElement("span"),a="jqtree-title jqtree_common";return i&&(a+=" jqtree-title-folder"),s.className=a,s.setAttribute("role","treeitem"),s.setAttribute("aria-level",""+t),s.setAttribute("aria-selected",n.getBoolString(o)),s.setAttribute("aria-expanded",n.getBoolString(r)),o&&s.setAttribute("tabindex",this.tree_widget.options.tabIndex),s.innerHTML=this.escapeIfNecessary(e),s},e.prototype.getButtonClasses=function(e){var t=["jqtree-toggler","jqtree_common"];return e.is_open||t.push("jqtree-closed"),this.tree_widget.options.buttonLeft?t.push("jqtree-toggler-left"):t.push("jqtree-toggler-right"),t.join(" ")},e.prototype.getFolderClasses=function(e,t){var o=["jqtree-folder"];return e.is_open||o.push("jqtree-closed"),t&&o.push("jqtree-selected"),e.is_loading&&o.push("jqtree-loading"),o.join(" ")},e.prototype.escapeIfNecessary=function(e){return this.tree_widget.options.autoEscape?n.html_escape(e):e},e.prototype.createButtonElement=function(e){if("string"==typeof e){var t=document.createElement("div");return t.innerHTML=e,document.createTextNode(t.innerHTML)}return jQuery(e)[0]},e}();t.default=r},function(e,t,o){"use strict";var n,r=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)});t.__esModule=!0;var i=o(3),s=o(0),a=o(1),l=function(){function e(e){this.tree_widget=e,this.hovered_area=null,this.hit_areas=[],this.is_dragging=!1,this.current_item=null,this.position_info=null}return e.prototype.mouseCapture=function(e){var t=i(e.target);if(!this.mustCaptureElement(t))return null;if(this.tree_widget.options.onIsMoveHandle&&!this.tree_widget.options.onIsMoveHandle(t))return null;var o=this.tree_widget._getNodeElement(t);return o&&this.tree_widget.options.onCanMove&&(this.tree_widget.options.onCanMove(o.node)||(o=null)),this.current_item=o,null!=this.current_item},e.prototype.generateHitAreas=function(){if(this.current_item){var e=new d(this.tree_widget.tree,this.current_item.node,this.getTreeDimensions().bottom);this.hit_areas=e.generate()}else this.hit_areas=[]},e.prototype.mouseStart=function(e){if(this.current_item){this.refresh();var t=i(e.target).offset(),o=t?t.left:0,n=t?t.top:0,r=this.current_item.node,s=this.tree_widget.options.autoEscape?a.html_escape(r.name):r.name;return this.drag_element=new h(s,e.page_x-o,e.page_y-n,this.tree_widget.element),this.is_dragging=!0,this.position_info=e,this.current_item.$element.addClass("jqtree-moving"),!0}return!1},e.prototype.mouseDrag=function(e){if(this.current_item&&this.drag_element){this.drag_element.move(e.page_x,e.page_y),this.position_info=e;var t=this.findHoveredArea(e.page_x,e.page_y);return this.canMoveToArea(t)&&t?(t.node.isFolder()||this.stopOpenFolderTimer(),this.hovered_area!==t&&(this.hovered_area=t,this.mustOpenFolderTimer(t)?this.startOpenFolderTimer(t.node):this.stopOpenFolderTimer(),this.updateDropHint())):(this.removeHover(),this.removeDropHint(),this.stopOpenFolderTimer()),t||this.tree_widget.options.onDragMove&&this.tree_widget.options.onDragMove(this.current_item.node,e.original_event),!0}return!1},e.prototype.mouseStop=function(e){this.moveItem(e),this.clear(),this.removeHover(),this.removeDropHint(),this.removeHitAreas();var t=this.current_item;return this.current_item&&(this.current_item.$element.removeClass("jqtree-moving"),this.current_item=null),this.is_dragging=!1,this.position_info=null,!this.hovered_area&&t&&this.tree_widget.options.onDragStop&&this.tree_widget.options.onDragStop(t.node,e.original_event),!1},e.prototype.refresh=function(){this.removeHitAreas(),this.current_item&&(this.generateHitAreas(),this.current_item=this.tree_widget._getNodeElementForNode(this.current_item.node),this.is_dragging&&this.current_item.$element.addClass("jqtree-moving"))},e.prototype.mustCaptureElement=function(e){return!e.is("input,select,textarea")},e.prototype.canMoveToArea=function(e){if(e&&this.current_item){if(this.tree_widget.options.onCanMoveTo){var t=s.getPositionName(e.position);return this.tree_widget.options.onCanMoveTo(this.current_item.node,e.node,t)}return!0}return!1},e.prototype.removeHitAreas=function(){this.hit_areas=[]},e.prototype.clear=function(){this.drag_element&&(this.drag_element.remove(),this.drag_element=null)},e.prototype.removeDropHint=function(){this.previous_ghost&&this.previous_ghost.remove()},e.prototype.removeHover=function(){this.hovered_area=null},e.prototype.findHoveredArea=function(e,t){var o=this.getTreeDimensions();if(e<o.left||t<o.top||e>o.right||t>o.bottom)return null;for(var n=0,r=this.hit_areas.length;n<r;){var i=n+r>>1,s=this.hit_areas[i];if(t<s.top)r=i;else{if(!(t>s.bottom))return s;n=i+1}}return null},e.prototype.mustOpenFolderTimer=function(e){var t=e.node;return t.isFolder()&&!t.is_open&&e.position===s.Position.Inside},e.prototype.updateDropHint=function(){if(this.hovered_area){this.removeDropHint();var e=this.tree_widget._getNodeElementForNode(this.hovered_area.node);this.previous_ghost=e.addDropHint(this.hovered_area.position)}},e.prototype.startOpenFolderTimer=function(e){var t=this;this.stopOpenFolderTimer(),this.open_folder_timer=setTimeout(function(){t.tree_widget._openNode(e,t.tree_widget.options.slide,function(){t.refresh(),t.updateDropHint()})},this.tree_widget.options.openFolderDelay)},e.prototype.stopOpenFolderTimer=function(){this.open_folder_timer&&(clearTimeout(this.open_folder_timer),this.open_folder_timer=null)},e.prototype.moveItem=function(e){var t=this;if(this.current_item&&this.hovered_area&&this.hovered_area.position!==s.Position.None&&this.canMoveToArea(this.hovered_area)){var o=this.current_item.node,n=this.hovered_area.node,r=this.hovered_area.position,i=o.parent;r===s.Position.Inside&&(this.hovered_area.node.is_open=!0);var a=function(){t.tree_widget.tree.moveNode(o,n,r),t.tree_widget.element.empty(),t.tree_widget._refreshElements(null)};this.tree_widget._triggerEvent("tree.move",{move_info:{moved_node:o,target_node:n,position:s.getPositionName(r),previous_parent:i,do_move:a,original_event:e.original_event}}).isDefaultPrevented()||a()}},e.prototype.getTreeDimensions=function(){var e=this.tree_widget.element.offset();if(e){var t=this.tree_widget.element,o=t.width()||0,n=t.height()||0,r=e.left+this.tree_widget._getScrollLeft();return{left:r,top:e.top,right:r+o,bottom:e.top+n+16}}return{left:0,top:0,right:0,bottom:0}},e}();t.DragAndDropHandler=l;var d=function(e){function t(t,o,n){var r=e.call(this,t)||this;return r.current_node=o,r.tree_bottom=n,r}return r(t,e),t.prototype.generate=function(){return this.positions=[],this.last_top=0,this.iterate(),this.generateHitAreas(this.positions)},t.prototype.generateHitAreas=function(e){for(var t=-1,o=[],n=[],r=0,i=e;r<i.length;r++){var s=i[r];s.top!==t&&o.length&&(o.length&&this.generateHitAreasForGroup(n,o,t,s.top),t=s.top,o=[]),o.push(s)}return this.generateHitAreasForGroup(n,o,t,this.tree_bottom),n},t.prototype.handleOpenFolder=function(e,t){return e!==this.current_node&&(e.children[0]!==this.current_node&&this.addPosition(e,s.Position.Inside,this.getTop(t)),!0)},t.prototype.handleClosedFolder=function(e,t,o){var n=this.getTop(o);e===this.current_node?this.addPosition(e,s.Position.None,n):(this.addPosition(e,s.Position.Inside,n),t!==this.current_node&&this.addPosition(e,s.Position.After,n))},t.prototype.handleFirstNode=function(e){e!==this.current_node&&this.addPosition(e,s.Position.Before,this.getTop(i(e.element)))},t.prototype.handleAfterOpenFolder=function(e,t){e===this.current_node||t===this.current_node?this.addPosition(e,s.Position.None,this.last_top):this.addPosition(e,s.Position.After,this.last_top)},t.prototype.handleNode=function(e,t,o){var n=this.getTop(o);e===this.current_node?this.addPosition(e,s.Position.None,n):this.addPosition(e,s.Position.Inside,n),t===this.current_node||e===this.current_node?this.addPosition(e,s.Position.None,n):this.addPosition(e,s.Position.After,n)},t.prototype.getTop=function(e){var t=e.offset();return t?t.top:0},t.prototype.addPosition=function(e,t,o){var n={top:o,bottom:0,node:e,position:t};this.positions.push(n),this.last_top=o},t.prototype.generateHitAreasForGroup=function(e,t,o,n){for(var r=Math.min(t.length,4),i=Math.round((n-o)/r),s=o,a=0;a<r;){var l=t[a];e.push({top:s,bottom:s+i,node:l.node,position:l.position}),s+=i,a+=1}},t}(function(){function e(e){this.tree=e}return e.prototype.iterate=function(){var e=this,t=!0,o=function(n,r){var s=(n.is_open||!n.element)&&n.hasChildren(),a=null;if(n.element){if(!(a=i(n.element)).is(":visible"))return;t&&(e.handleFirstNode(n),t=!1),n.hasChildren()?n.is_open?e.handleOpenFolder(n,a)||(s=!1):e.handleClosedFolder(n,r,a):e.handleNode(n,r,a)}if(s){var l=n.children.length;n.children.forEach(function(e,t){o(n.children[t],t===l-1?null:n.children[t+1])}),n.is_open&&a&&e.handleAfterOpenFolder(n,r)}};o(this.tree,null)},e}());t.HitAreasGenerator=d;var h=function(){function e(e,t,o,n){this.offset_x=t,this.offset_y=o,this.$element=i('<span class="jqtree-title jqtree-dragging">'+e+"</span>"),this.$element.css("position","absolute"),n.append(this.$element)}return e.prototype.move=function(e,t){this.$element.offset({left:e-this.offset_x,top:t-this.offset_y})},e.prototype.remove=function(){this.$element.remove()},e}()},function(e,t,o){"use strict";t.__esModule=!0;t.default="1.4.6"},function(e,t,o){"use strict";var n,r=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)});t.__esModule=!0;var i=o(12),s=o(3),a=o(11),l=o(10),d=o(9),h=o(8),u=o(7),p=o(6),c=o(5),_=o(2),f=o(0),g=o(1),m=o(4),v=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._handleClick=function(e){var o=t._getClickTarget(e.target);if(o)if("button"===o.type)t.toggle(o.node,t.options.slide),e.preventDefault(),e.stopPropagation();else if("label"===o.type){var n=o.node;t._triggerEvent("tree.click",{node:n,click_event:e}).isDefaultPrevented()||t._selectNode(n,!0)}},t._handleDblclick=function(e){var o=t._getClickTarget(e.target);o&&"label"===o.type&&t._triggerEvent("tree.dblclick",{node:o.node,click_event:e})},t._handleContextmenu=function(e){var o=s(e.target).closest("ul.jqtree-tree .jqtree-element");if(o.length){var n=t._getNode(o);if(n)return e.preventDefault(),e.stopPropagation(),t._triggerEvent("tree.contextmenu",{node:n,click_event:e}),!1}return null},t}return r(t,e),t.prototype.toggle=function(e,t){var o=null==t?this.options.slide:t;return e.is_open?this.closeNode(e,o):this.openNode(e,o),this.element},t.prototype.getTree=function(){return this.tree},t.prototype.selectNode=function(e){return this._selectNode(e,!1),this.element},t.prototype.getSelectedNode=function(){return!!this.select_node_handler&&this.select_node_handler.getSelectedNode()},t.prototype.toJson=function(){return JSON.stringify(this.tree.getData())},t.prototype.loadData=function(e,t){return this._loadData(e,t),this.element},t.prototype.loadDataFromUrl=function(e,t,o){return"string"==typeof e?this._loadDataFromUrl(e,t,o):this._loadDataFromUrl(null,e,t),this.element},t.prototype.reload=function(e){return this._loadDataFromUrl(null,null,e),this.element},t.prototype.getNodeById=function(e){return this.tree.getNodeById(e)},t.prototype.getNodeByName=function(e){return this.tree.getNodeByName(e)},t.prototype.getNodesByProperty=function(e,t){return this.tree.getNodesByProperty(e,t)},t.prototype.getNodeByHtmlElement=function(e){return this._getNode(s(e))},t.prototype.getNodeByCallback=function(e){return this.tree.getNodeByCallback(e)},t.prototype.openNode=function(e,t,o){var n=this,r=function(){var e,r;return g.isFunction(t)?(e=t,r=null):(r=t,e=o),null==r&&(r=n.options.slide),[r,e]}(),i=r[0],s=r[1];return e&&this._openNode(e,i,s),this.element},t.prototype.closeNode=function(e,t){var o=null==t?this.options.slide:t;return e.isFolder()&&(new m.FolderElement(e,this).close(o,this.options.animationSpeed),this._saveState()),this.element},t.prototype.isDragging=function(){return!!this.dnd_handler&&this.dnd_handler.is_dragging},t.prototype.refreshHitAreas=function(){return this.dnd_handler&&this.dnd_handler.refresh(),this.element},t.prototype.addNodeAfter=function(e,t){var o=t.addAfter(e);return o&&this._refreshElements(t.parent),o},t.prototype.addNodeBefore=function(e,t){var o=t.addBefore(e);return o&&this._refreshElements(t.parent),o},t.prototype.addParentNode=function(e,t){var o=t.addParent(e);return o&&this._refreshElements(o.parent),o},t.prototype.removeNode=function(e){return e.parent&&this.select_node_handler&&(this.select_node_handler.removeFromSelection(e,!0),e.remove(),this._refreshElements(e.parent)),this.element},t.prototype.appendNode=function(e,t){var o=t||this.tree,n=o.append(e);return this._refreshElements(o),n},t.prototype.prependNode=function(e,t){var o=t||this.tree,n=o.prepend(e);return this._refreshElements(o),n},t.prototype.updateNode=function(e,t){var o=t.id&&t.id!==e.id;return o&&this.tree.removeNodeFromIndex(e),e.setData(t),o&&this.tree.addNodeToIndex(e),"object"==typeof t&&t.children&&(e.removeChildren(),t.children.length&&e.loadFromData(t.children)),this.renderer.renderFromNode(e),this._selectCurrentNode(),this.element},t.prototype.moveNode=function(e,t,o){var n=f.getPosition(o);return this.tree.moveNode(e,t,n),this._refreshElements(null),this.element},t.prototype.getStateFromStorage=function(){if(this.save_state_handler)return this.save_state_handler.getStateFromStorage()},t.prototype.addToSelection=function(e,t){return void 0===t&&(t=!0),e&&this.select_node_handler&&(this.select_node_handler.addToSelection(e),this._getNodeElementForNode(e).select(t),this._saveState()),this.element},t.prototype.getSelectedNodes=function(){return this.select_node_handler?this.select_node_handler.getSelectedNodes():[]},t.prototype.isNodeSelected=function(e){return!!this.select_node_handler&&this.select_node_handler.isNodeSelected(e)},t.prototype.removeFromSelection=function(e){return this.select_node_handler&&(this.select_node_handler.removeFromSelection(e),this._getNodeElementForNode(e).deselect(),this._saveState()),this.element},t.prototype.scrollToNode=function(e){if(this.scroll_handler){var t=s(e.element).offset(),o=t?t.top:0,n=this.$el.offset(),r=o-(n?n.top:0);this.scroll_handler.scrollToY(r)}return this.element},t.prototype.getState=function(){if(this.save_state_handler)return this.save_state_handler.getState()},t.prototype.setState=function(e){return this.save_state_handler&&(this.save_state_handler.setInitialState(e),this._refreshElements(null)),this.element},t.prototype.setOption=function(e,t){return this.options[e]=t,this.element},t.prototype.moveDown=function(){return this.key_handler&&this.key_handler.moveDown(),this.element},t.prototype.moveUp=function(){return this.key_handler&&this.key_handler.moveUp(),this.element},t.prototype.getVersion=function(){return i.default},t.prototype.testGenerateHitAreas=function(e){return this.dnd_handler?(this.dnd_handler.current_item=this._getNodeElementForNode(e),this.dnd_handler.generateHitAreas(),this.dnd_handler.hit_areas):[]},t.prototype._triggerEvent=function(e,t){var o=s.Event(e);return s.extend(o,t),this.element.trigger(o),o},t.prototype._openNode=function(e,t,o){var n=this;void 0===t&&(t=!0);var r=function(e,t,o){new m.FolderElement(e,n).open(o,t,n.options.animationSpeed)};if(e.isFolder())if(e.load_on_demand)this._loadFolderOnDemand(e,t,o);else{for(var i=e.parent;i;)i.parent&&r(i,!1,null),i=i.parent;r(e,t,o),this._saveState()}},t.prototype._refreshElements=function(e){this.renderer.render(e),this._triggerEvent("tree.refresh")},t.prototype._getNodeElementForNode=function(e){return e.isFolder()?new m.FolderElement(e,this):new m.NodeElement(e,this)},t.prototype._getNodeElement=function(e){var t=this._getNode(e);return t?this._getNodeElementForNode(t):null},t.prototype._containsElement=function(e){var t=this._getNode(s(e));return null!=t&&t.tree===this.tree},t.prototype._getScrollLeft=function(){return this.scroll_handler&&this.scroll_handler.getScrollLeft()||0},t.prototype._init=function(){e.prototype._init.call(this),this.element=this.$el,this.mouse_delay=300,this.is_initialized=!1,this.options.rtl=this._getRtlOption(),null===this.options.closedIcon&&(this.options.closedIcon=this._getDefaultClosedIcon()),this.renderer=new l.default(this),null!=u.default?this.save_state_handler=new u.default(this):this.options.saveState=!1,null!=c.default&&(this.select_node_handler=new c.default(this)),null!=a.DragAndDropHandler?this.dnd_handler=new a.DragAndDropHandler(this):this.options.dragAndDrop=!1,null!=p.default&&(this.scroll_handler=new p.default(this)),null!=d.default&&null!=c.default&&(this.key_handler=new d.default(this)),this._initData(),this.element.click(this._handleClick),this.element.dblclick(this._handleDblclick),this.options.useContextMenu&&this.element.on("contextmenu",this._handleContextmenu)},t.prototype._deinit=function(){this.element.empty(),this.element.off(),this.key_handler&&this.key_handler.deinit(),this.tree=new f.Node({},!0),e.prototype._deinit.call(this)},t.prototype._mouseCapture=function(e){return!(!this.options.dragAndDrop||!this.dnd_handler)&&this.dnd_handler.mouseCapture(e)},t.prototype._mouseStart=function(e){return!(!this.options.dragAndDrop||!this.dnd_handler)&&this.dnd_handler.mouseStart(e)},t.prototype._mouseDrag=function(e){if(this.options.dragAndDrop&&this.dnd_handler){var t=this.dnd_handler.mouseDrag(e);return this.scroll_handler&&this.scroll_handler.checkScrolling(),t}return!1},t.prototype._mouseStop=function(e){return!(!this.options.dragAndDrop||!this.dnd_handler)&&this.dnd_handler.mouseStop(e)},t.prototype._initData=function(){this.options.data?this._loadData(this.options.data,null):this._getDataUrlInfo(null)?this._loadDataFromUrl(null,null,null):this._loadData([],null)},t.prototype._getDataUrlInfo=function(e){var t,o=this,n=this.options.dataUrl||this.element.data("url"),r=function(t){if(e&&e.id){var n={node:e.id};t.data=n}else{var r=o._getNodeIdToBeSelected();if(r){n={selected_node:r};t.data=n}}};return"function"==typeof n?n(e):"string"==typeof n?(r(t={url:n}),t):"object"==typeof n?(r(n),n):n},t.prototype._getNodeIdToBeSelected=function(){return this.options.saveState&&this.save_state_handler?this.save_state_handler.getNodeIdToBeSelected():null},t.prototype._initTree=function(e){var t=this,o=function(){t.is_initialized||(t.is_initialized=!0,t._triggerEvent("tree.init"))};this.tree=new this.options.nodeClass(null,!0,this.options.nodeClass),this.select_node_handler&&this.select_node_handler.clear(),this.tree.loadFromData(e);var n=this._setInitialState();this._refreshElements(null),n?this._setInitialStateOnDemand(o):o()},t.prototype._setInitialState=function(){var e=this,t=function(){if(e.options.saveState&&e.save_state_handler){var t=e.save_state_handler.getStateFromStorage();return t?[!0,e.save_state_handler.setInitialState(t)]:[!1,!1]}return[!1,!1]}(),o=t[0],n=t[1];return o||(n=function(){if(!1===e.options.autoOpen)return!1;var t=e._getAutoOpenMaxLevel(),o=!1;return e.tree.iterate(function(e,n){return e.load_on_demand?(o=!0,!1):!!e.hasChildren()&&(e.is_open=!0,n!==t)}),o}()),n},t.prototype._setInitialStateOnDemand=function(e){var t,o,n,r=this;(function(){if(r.options.saveState&&r.save_state_handler){var t=r.save_state_handler.getStateFromStorage();return!!t&&(r.save_state_handler.setInitialStateOnDemand(t,e),!0)}return!1})()||(t=r._getAutoOpenMaxLevel(),o=0,(n=function(){r.tree.iterate(function(e,i){return e.load_on_demand?(e.is_loading||function(e){o+=1,r._openNode(e,!1,function(){o-=1,n()})}(e),!1):(r._openNode(e,!1,null),i!==t)}),0===o&&e()})())},t.prototype._getAutoOpenMaxLevel=function(){return!0===this.options.autoOpen?-1:parseInt(this.options.autoOpen,10)},t.prototype._getClickTarget=function(e){var t=s(e),o=t.closest(".jqtree-toggler");if(o.length){if(n=this._getNode(o))return{type:"button",node:n}}else{var n,r=t.closest(".jqtree-element");if(r.length)if(n=this._getNode(r))return{type:"label",node:n}}return null},t.prototype._getNode=function(e){var t=e.closest("li.jqtree_common");return 0===t.length?null:t.data("node")},t.prototype._saveState=function(){this.options.saveState&&this.save_state_handler&&this.save_state_handler.saveState()},t.prototype._selectCurrentNode=function(){var e=this.getSelectedNode();if(e){var t=this._getNodeElementForNode(e);t&&t.select(!0)}},t.prototype._deselectCurrentNode=function(){var e=this.getSelectedNode();e&&this.removeFromSelection(e)},t.prototype._getDefaultClosedIcon=function(){return this.options.rtl?"&#x25c0;":"&#x25ba;"},t.prototype._getRtlOption=function(){if(null!=this.options.rtl)return this.options.rtl;var e=this.element.data("rtl");return null!=e&&!1!==e},t.prototype._notifyLoading=function(e,t,o){this.options.onLoading&&this.options.onLoading(e,t,o)},t.prototype._selectNode=function(e,t){var o=this;if(void 0===t&&(t=!1),this.select_node_handler){var n=function(){o.options.saveState&&o.save_state_handler&&o.save_state_handler.saveState()};if(!e)return this._deselectCurrentNode(),void n();if(o.options.onCanSelectNode?o.options.selectable&&o.options.onCanSelectNode(e):o.options.selectable){if(this.select_node_handler.isNodeSelected(e))t&&(this._deselectCurrentNode(),this._triggerEvent("tree.select",{node:null,previous_node:e}));else{var r=this.getSelectedNode();this._deselectCurrentNode(),this.addToSelection(e),this._triggerEvent("tree.select",{node:e,deselected_node:r}),(i=e.parent)&&i.parent&&!i.is_open&&o.openNode(i,!1)}var i;n()}}},t.prototype._loadData=function(e,t){e&&(this._triggerEvent("tree.load_data",{tree_data:e}),t?(this._deselectNodes(t),this._loadSubtree(e,t)):this._initTree(e),this.isDragging()&&this.dnd_handler&&this.dnd_handler.refresh())},t.prototype._deselectNodes=function(e){if(this.select_node_handler)for(var t=0,o=this.select_node_handler.getSelectedNodesUnder(e);t<o.length;t++){var n=o[t];this.select_node_handler.removeFromSelection(n)}},t.prototype._loadSubtree=function(e,t){t.loadFromData(e),t.load_on_demand=!1,t.is_loading=!1,this._refreshElements(t)},t.prototype._loadDataFromUrl=function(e,t,o){var n,r=this,i=null,a=e,l=function(){i&&(i.removeClass("jqtree-loading"),r._notifyLoading(!1,t,i))},d=function(e){l(),r._loadData(e,t),o&&"function"==typeof o&&o()},h=function(e){var t=function(e){return r.options.dataFilter?r.options.dataFilter(e):e}(function(e){return e instanceof Array||"object"==typeof e?e:null!=e?s.parseJSON(e):[]}(e));d(t)},u=function(e){l(),r.options.onLoadFailed&&r.options.onLoadFailed(e)};return e||(a=this._getDataUrlInfo(t)),(i=t?s(t.element):r.element).addClass("jqtree-loading"),r._notifyLoading(!0,t,i),a?a instanceof Array?void d(a):(n="string"==typeof a?{url:a}:(a.method||(a.method="get"),a),void s.ajax(s.extend({},n,{method:null!=a.method?a.method.toUpperCase():"GET",cache:!1,dataType:"json",success:h,error:u}))):void l()},t.prototype._loadFolderOnDemand=function(e,t,o){var n=this;void 0===t&&(t=!0),e.is_loading=!0,this._loadDataFromUrl(null,e,function(){n._openNode(e,t,o)})},t.defaults={animationSpeed:"fast",autoOpen:!1,saveState:!1,dragAndDrop:!1,selectable:!0,useContextMenu:!0,onCanSelectNode:null,onSetStateFromStorage:null,onGetStateFromStorage:null,onCreateLi:null,onIsMoveHandle:null,onCanMove:null,onCanMoveTo:null,onLoadFailed:null,autoEscape:!0,dataUrl:null,closedIcon:null,openedIcon:"&#x25bc;",slide:!0,nodeClass:f.Node,dataFilter:null,keyboardSupport:!0,openFolderDelay:500,rtl:!1,onDragMove:null,onDragStop:null,buttonLeft:!0,onLoading:null,tabIndex:0},t}(h.default);_.default.register(v,"tree")},,,,,,,,function(e,t,o){e.exports=o(13)}]);e;
    };
    return SaveStateHandler;
}());
exports["default"] = SaveStateHandler;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
/*
This widget does the same a the mouse widget in jqueryui.
*/
var simple_widget_1 = __webpack_require__(2);
var MouseWidget = /** @class */ (function (_super) {
    __extends(MouseWidget, _super);
    function MouseWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mouseDown = function (e) {
            // Is left mouse button?
            if (e.which !== 1) {
                return;
            }
            var result = _this._handleMouseDown(_this._getPositionInfo(e));
            if (result) {
                e.preventDefault();
            }
            return result;
        };
        _this.mouseMove = function (e) {
            return _this._handleMouseMove(e, _this._getPositionInfo(e));
        };
        _this.mouseUp = function (e) {
            return _this._handleMouseUp(_this._getPositionInfo(e));
        };
        _this.touchStart = function (e) {
            var touch_event = e.originalEvent;
            if (touch_event.touches.length > 1) {
                return;
            }
            var touch = touch_event.changedTouches[0];
            return _this._handleMouseDown(_this._getPositionInfo(touch));
        };
        _this.touchMove = function (e) {
            var touch_event = e.originalEvent;
            if (touch_event.touches.length > 1) {
                return;
            }
            var touch = touch_event.changedTouches[0];
            return _this._handleMouseMove(e, _this._getPositionInfo(touch));
        };
        _this.touchEnd = function (e) {
            var touch_event = e.originalEvent;
            if (touch_event.touches.length > 1) {
                return;
            }
            var touch = touch_event.changedTouches[0];
            return _this._handleMouseUp(_this._getPositionInfo(touch));
        };
        return _this;
    }
    MouseWidget.prototype.setMouseDelay = function (mouse_delay) {
        this.mouse_delay = mouse_delay;
    };
    MouseWidget.prototype._init = function () {
        this.$el.on("mousedown.mousewidget", this.mouseDown);
        this.$el.on("touchstart.mousewidget", this.touchStart);
        this.is_mouse_started = false;
        this.mouse_delay = 0;
        this._mouse_delay_timer = null;
        this._is_mouse_delay_met = true;
        this.mouse_down_info = null;
    };
    MouseWidget.prototype._deinit = function () {
        this.$el.off("mousedown.mousewidget");
        this.$el.off("touchstart.mousewidget");
        var $document = jQuery(document);
        $document.off("mousemove.mousewidget");
        $document.off("mouseup.mousewidget");
    };
    MouseWidget.prototype._handleMouseDown = function (position_info) {
        // We may have missed mouseup (out of window)
        if (this.is_mouse_started) {
            this._handleMouseUp(position_info);
        }
        this.mouse_down_info = position_info;
        if (!this._mouseCapture(position_info)) {
            return;
        }
        this._handleStartMouse();
        return true;
    };
    MouseWidget.prototype._handleStartMouse = function () {
        var $document = jQuery(document);
        $document.on("mousemove.mousewidget", this.mouseMove);
        $document.on("touchmove.mousewidget", this.touchMove);
        $document.on("mouseup.mousewidget", this.mouseUp);
        $document.on("touchend.mousewidget", this.touchEnd);
        if (this.mouse_delay) {
            this._startMouseDelayTimer();
        }
    };
    MouseWidget.prototype._startMouseDelayTimer = function () {
        var _this = this;
        if (this._mouse_delay_timer) {
            clearTimeout(this._mouse_delay_timer);
        }
        this._mouse_delay_timer = setTimeout(function () {
            _this._is_mouse_delay_met = true;
        }, this.mouse_delay);
        this._is_mouse_delay_met = false;
    };
    MouseWidget.prototype._handleMouseMove = function (e, position_info) {
        if (this.is_mouse_started) {
            this._mouseDrag(position_info);
            return e.preventDefault();
        }
        if (this.mouse_delay && !this._is_mouse_delay_met) {
            return true;
        }
        if (this.mouse_down_info) {
            this.is_mouse_started =
                this._mouseStart(this.mouse_down_info) !== false;
        }
        if (this.is_mouse_started) {
            this._mouseDrag(position_info);
        }
        else {
            this._handleMouseUp(position_info);
        }
        return !this.is_mouse_started;
    };
    MouseWidget.prototype._getPositionInfo = function (e) {
        return {
            page_x: e.pageX,
            page_y: e.pageY,
            target: e.target,
            original_event: e
        };
    };
    MouseWidget.prototype._handleMouseUp = function (position_info) {
        var $document = jQuery(document);
        $document.off("mousemove.mousewidget");
        $document.off("touchmove.mousewidget");
        $document.off("mouseup.mousewidget");
        $document.off("touchend.mousewidget");
        if (this.is_mouse_started) {
            this.is_mouse_started = false;
            this._mouseStop(position_info);
        }
    };
    return MouseWidget;
}(simple_widget_1["default"]));
exports["default"] = MouseWidget;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var KeyHandler = /** @class */ (function () {
    function KeyHandler(tree_widget) {
        var _this = this;
        this.handleKeyDown = function (e) {
            if (!_this.canHandleKeyboard()) {
                return true;
            }
            else {
                var key = e.which;
                switch (key) {
                    case KeyHandler.DOWN:
                        return _this.moveDown();
                    case KeyHandler.UP:
                        return _this.moveUp();
                    case KeyHandler.RIGHT:
                        return _this.moveRight();
                    case KeyHandler.LEFT:
                        return _this.moveLeft();
                    default:
                        return true;
                }
            }
        };
        this.tree_widget = tree_widget;
        if (tree_widget.options.keyboardSupport) {
            jQuery(document).on("keydown.jqtree", this.handleKeyDown);
        }
    }
    KeyHandler.prototype.deinit = function () {
        jQuery(document).off("keydown.jqtree");
    };
    KeyHandler.prototype.moveDown = function () {
        var node = this.tree_widget.getSelectedNode();
        if (node) {
            return this.selectNode(node.getNextNode());
        }
        else {
            return false;
        }
    };
    KeyHandler.prototype.moveUp = function () {
        var node = this.tree_widget.getSelectedNode();
        if (node) {
            return this.selectNode(node.getPreviousNode());
        }
        else {
            return false;
        }
    };
    KeyHandler.prototype.moveRight = function () {
        var node = this.tree_widget.getSelectedNode();
        if (!node) {
            return true;
        }
        else if (!node.isFolder()) {
            return true;
        }
        else {
            // folder node
            if (node.is_open) {
                // Right moves to the first child of an open node
                return this.selectNode(node.getNextNode());
            }
            else {
                // Right expands a closed node
                this.tree_widget.openNode(node);
                return false;
            }
        }
    };
    KeyHandler.prototype.moveLeft = function () {
        var node = this.tree_widget.getSelectedNode();
        if (!node) {
            return true;
        }
        else if (node.isFolder() && node.is_open) {
            // Left on an open node closes the node
            this.tree_widget.closeNode(node);
            return false;
        }
        else {
            // Left on a closed or end node moves focus to the node's parent
            return this.selectNode(node.getParent());
        }
    };
    KeyHandler.prototype.selectNode = function (node) {
        if (!node) {
            return true;
        }
        else {
            this.tree_widget.selectNode(node);
            if (this.tree_widget.scroll_handler &&
                !this.tree_widget.scroll_handler.isScrolledIntoView(jQuery(node.element).find(".jqtree-element"))) {
                this.tree_widget.scrollToNode(node);
            }
            return false;
        }
    };
    KeyHandler.prototype.canHandleKeyboard = function () {
        return (this.tree_widget.options.keyboardSupport &&
            this.isFocusOnTree() &&
            this.tree_widget.getSelectedNode() != null);
    };
    KeyHandler.prototype.isFocusOnTree = function () {
        var active_element = document.activeElement;
        return (active_element &&
            active_element.tagName === "SPAN" &&
            this.tree_widget._containsElement(active_element));
    };
    KeyHandler.LEFT = 37;
    KeyHandler.UP = 38;
    KeyHandler.RIGHT = 39;
    KeyHandler.DOWN = 40;
    return KeyHandler;
}());
exports["default"] = KeyHandler;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var util_1 = __webpack_require__(1);
var ElementsRenderer = /** @class */ (function () {
    function ElementsRenderer(tree_widget) {
        this.tree_widget = tree_widget;
        this.opened_icon_element = this.createButtonElement(tree_widget.options.openedIcon);
        this.closed_icon_element = this.createButtonElement(tree_widget.options.closedIcon);
    }
    ElementsRenderer.prototype.render = function (from_node) {
        if (from_node && from_node.parent) {
            this.renderFromNode(from_node);
        }
        else {
            this.renderFromRoot();
        }
    };
    ElementsRenderer.prototype.renderFromRoot = function () {
        var $element = this.tree_widget.element;
        $element.empty();
        this.createDomElements($element[0], this.tree_widget.tree.children, true, 1);
    };
    ElementsRenderer.prototype.renderFromNode = function (node) {
        // remember current li
        var $previous_li = jQuery(node.element);
        // create element
        var li = this.createLi(node, node.getLevel());
        this.attachNodeData(node, li);
        // add element to dom
        $previous_li.after(li);
        // remove previous li
        $previous_li.remove();
        // create children
        if (node.children) {
            this.createDomElements(li, node.children, false, node.getLevel() + 1);
        }
    };
    ElementsRenderer.prototype.createDomElements = function (element, children, is_root_node, level) {
        var ul = this.createUl(is_root_node);
        element.appendChild(ul);
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            var li = this.createLi(child, level);
            ul.appendChild(li);
            this.attachNodeData(child, li);
            if (child.hasChildren()) {
                this.createDomElements(li, child.children, false, level + 1);
            }
        }
    };
    ElementsRenderer.prototype.attachNodeData = function (node, li) {
        node.element = li;
        jQuery(li).data("node", node);
    };
    ElementsRenderer.prototype.createUl = function (is_root_node) {
        var class_string;
        var role;
        if (!is_root_node) {
            class_string = "";
            role = "group";
        }
        else {
            class_string = "jqtree-tree";
            role = "tree";
            if (this.tree_widget.options.rtl) {
                class_string += " jqtree-rtl";
            }
        }
        var ul = document.createElement("ul");
        ul.className = "jqtree_common " + class_string;
        ul.setAttribute("role", role);
        return ul;
    };
    ElementsRenderer.prototype.createLi = function (node, level) {
        var is_selected = Boolean(this.tree_widget.select_node_handler &&
            this.tree_widget.select_node_handler.isNodeSelected(node));
        var li = node.isFolder()
            ? this.createFolderLi(node, level, is_selected)
            : this.createNodeLi(node, level, is_selected);
        if (this.tree_widget.options.onCreateLi) {
            this.tree_widget.options.onCreateLi(node, jQuery(li), is_selected);
        }
        return li;
    };
    ElementsRenderer.prototype.createFolderLi = function (node, level, is_selected) {
        var button_classes = this.getButtonClasses(node);
        var folder_classes = this.getFolderClasses(node, is_selected);
        var icon_element = node.is_open
            ? this.opened_icon_element
            : this.closed_icon_element;
        // li
        var li = document.createElement("li");
        li.className = "jqtree_common " + folder_classes;
        li.setAttribute("role", "presentation");
        // div
        var div = document.createElement("div");
        div.className = "jqtree-element jqtree_common";
        div.setAttribute("role", "presentation");
        li.appendChild(div);
        // button link
        var button_link = document.createElement("a");
        button_link.className = button_classes;
        button_link.appendChild(icon_element.cloneNode(true));
        button_link.setAttribute("role", "presentation");
        button_link.setAttribute("aria-hidden", "true");
        if (this.tree_widget.options.buttonLeft) {
            div.appendChild(button_link);
        }
        // title span
        div.appendChild(this.createTitleSpan(node.name, level, is_selected, node.is_open, true));
        if (!this.tree_widget.options.buttonLeft) {
            div.appendChild(button_link);
        }
        return li;
    };
    ElementsRenderer.prototype.createNodeLi = function (node, level, is_selected) {
        var li_classes = ["jqtree_common"];
        if (is_selected) {
            li_classes.push("jqtree-selected");
        }
        var class_string = li_classes.join(" ");
        // li
        var li = document.createElement("li");
        li.className = class_string;
        li.setAttribute("role", "presentation");
        // div
        var div = document.createElement("div");
        div.className = "jqtree-element jqtree_common";
        div.setAttribute("role", "presentation");
        li.appendChild(div);
        // title span
        div.appendChild(this.createTitleSpan(node.name, level, is_selected, node.is_open, false));
        return li;
    };
    ElementsRenderer.prototype.createTitleSpan = function (node_name, level, is_selected, is_open, is_folder) {
        var title_span = document.createElement("span");
        var classes = "jqtree-title jqtree_common";
        if (is_folder) {
            classes += " jqtree-title-folder";
        }
        title_span.className = classes;
        title_span.setAttribute("role", "treeitem");
        title_span.setAttribute("aria-level", "" + level);
        title_span.setAttribute("aria-selected", util_1.getBoolString(is_selected));
        title_span.setAttribute("aria-expanded", util_1.getBoolString(is_open));
        if (is_selected) {
            title_span.setAttribute("tabindex", this.tree_widget.options.tabIndex);
        }
        title_span.innerHTML = this.escapeIfNecessary(node_name);
        return title_span;
    };
    ElementsRenderer.prototype.getButtonClasses = function (node) {
        var classes = ["jqtree-toggler", "jqtree_common"];
        if (!node.is_open) {
            classes.push("jqtree-closed");
        }
        if (this.tree_widget.options.buttonLeft) {
            classes.push("jqtree-toggler-left");
        }
        else {
            classes.push("jqtree-toggler-right");
        }
        return classes.join(" ");
    };
    ElementsRenderer.prototype.getFolderClasses = function (node, is_selected) {
        var classes = ["jqtree-folder"];
        if (!node.is_open) {
            classes.push("jqtree-closed");
        }
        if (is_selected) {
            classes.push("jqtree-selected");
        }
        if (node.is_loading) {
            classes.push("jqtree-loading");
        }
        return classes.join(" ");
    };
    ElementsRenderer.prototype.escapeIfNecessary = function (value) {
        if (this.tree_widget.options.autoEscape) {
            return util_1.html_escape(value);
        }
        else {
            return value;
        }
    };
    ElementsRenderer.prototype.createButtonElement = function (value) {
        if (typeof value === "string") {
            // convert value to html
            var div = document.createElement("div");
            div.innerHTML = value;
            return document.createTextNode(div.innerHTML);
        }
        else {
            return jQuery(value)[0];
        }
    };
    return ElementsRenderer;
}());
exports["default"] = ElementsRenderer;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var jQuery = __webpack_require__(3);
var node_1 = __webpack_require__(0);
var util_1 = __webpack_require__(1);
var DragAndDropHandler = /** @class */ (function () {
    function DragAndDropHandler(tree_widget) {
        this.tree_widget = tree_widget;
        this.hovered_area = null;
        this.hit_areas = [];
        this.is_dragging = false;
        this.current_item = null;
        this.position_info = null;
    }
    DragAndDropHandler.prototype.mouseCapture = function (position_info) {
        var $element = jQuery(position_info.target);
        if (!this.mustCaptureElement($element)) {
            return null;
        }
        if (this.tree_widget.options.onIsMoveHandle &&
            !this.tree_widget.options.onIsMoveHandle($element)) {
            return null;
        }
        var node_element = this.tree_widget._getNodeElement($element);
        if (node_element && this.tree_widget.options.onCanMove) {
            if (!this.tree_widget.options.onCanMove(node_element.node)) {
                node_element = null;
            }
        }
        this.current_item = node_element;
        return this.current_item != null;
    };
    DragAndDropHandler.prototype.generateHitAreas = function () {
        if (!this.current_item) {
            this.hit_areas = [];
        }
        else {
            var hit_areas_generator = new HitAreasGenerator(this.tree_widget.tree, this.current_item.node, this.getTreeDimensions().bottom);
            this.hit_areas = hit_areas_generator.generate();
        }
    };
    DragAndDropHandler.prototype.mouseStart = function (position_info) {
        if (!this.current_item) {
            return false;
        }
        else {
            this.refresh();
            var offset = jQuery(position_info.target).offset();
            var left = offset ? offset.left : 0;
            var top_1 = offset ? offset.top : 0;
            var node = this.current_item.node;
            var node_name = this.tree_widget.options.autoEscape
                ? util_1.html_escape(node.name)
                : node.name;
            this.drag_element = new DragElement(node_name, position_info.page_x - left, position_info.page_y - top_1, this.tree_widget.element);
            this.is_dragging = true;
            this.position_info = position_info;
            this.current_item.$element.addClass("jqtree-moving");
            return true;
        }
    };
    DragAndDropHandler.prototype.mouseDrag = function (position_info) {
        if (!this.current_item || !this.drag_element) {
            return false;
        }
        else {
            this.drag_element.move(position_info.page_x, position_info.page_y);
            this.position_info = position_info;
            var area = this.findHoveredArea(position_info.page_x, position_info.page_y);
            var can_move_to = this.canMoveToArea(area);
            if (can_move_to && area) {
                if (!area.node.isFolder()) {
                    this.stopOpenFolderTimer();
                }
                if (this.hovered_area !== area) {
                    this.hovered_area = area;
                    // If this is a closed folder, start timer to open it
                    if (this.mustOpenFolderTimer(area)) {
                        this.startOpenFolderTimer(area.node);
                    }
                    else {
                        this.stopOpenFolderTimer();
                    }
                    this.updateDropHint();
                }
            }
            else {
                this.removeHover();
                this.removeDropHint();
                this.stopOpenFolderTimer();
            }
            if (!area) {
                if (this.tree_widget.options.onDragMove) {
                    this.tree_widget.options.onDragMove(this.current_item.node, position_info.original_event);
                }
            }
            return true;
        }
    };
    DragAndDropHandler.prototype.mouseStop = function (position_info) {
        this.moveItem(position_info);
        this.clear();
        this.removeHover();
        this.removeDropHint();
        this.removeHitAreas();
        var current_item = this.current_item;
        if (this.current_item) {
            this.current_item.$element.removeClass("jqtree-moving");
            this.current_item = null;
        }
        this.is_dragging = false;
        this.position_info = null;
        if (!this.hovered_area && current_item) {
            if (this.tree_widget.options.onDragStop) {
                this.tree_widget.options.onDragStop(current_item.node, position_info.original_event);
            }
        }
        return false;
    };
    DragAndDropHandler.prototype.refresh = function () {
        this.removeHitAreas();
        if (this.current_item) {
            this.generateHitAreas();
            this.current_item = this.tree_widget._getNodeElementForNode(this.current_item.node);
            if (this.is_dragging) {
                this.current_item.$element.addClass("jqtree-moving");
            }
        }
    };
    DragAndDropHandler.prototype.mustCaptureElement = function ($element) {
        return !$element.is("input,select,textarea");
    };
    DragAndDropHandler.prototype.canMoveToArea = function (area) {
        if (!area || !this.current_item) {
            return false;
        }
        else if (this.tree_widget.options.onCanMoveTo) {
            var position_name = node_1.getPositionName(area.position);
            return this.tree_widget.options.onCanMoveTo(this.current_item.node, area.node, position_name);
        }
        else {
            return true;
        }
    };
    DragAndDropHandler.prototype.removeHitAreas = function () {
        this.hit_areas = [];
    };
    DragAndDropHandler.prototype.clear = function () {
        if (this.drag_element) {
            this.drag_element.remove();
            this.drag_element = null;
        }
    };
    DragAndDropHandler.prototype.removeDropHint = function () {
        if (this.previous_ghost) {
            this.previous_ghost.remove();
        }
    };
    DragAndDropHandler.prototype.removeHover = function () {
        this.hovered_area = null;
    };
    DragAndDropHandler.prototype.findHoveredArea = function (x, y) {
        var dimensions = this.getTreeDimensions();
        if (x < dimensions.left ||
            y < dimensions.top ||
            x > dimensions.right ||
            y > dimensions.bottom) {
            return null;
        }
        var low = 0;
        var high = this.hit_areas.length;
        while (low < high) {
            // tslint:disable-next-line: no-bitwise
            var mid = (low + high) >> 1;
            var area = this.hit_areas[mid];
            if (y < area.top) {
                high = mid;
            }
            else if (y > area.bottom) {
                low = mid + 1;
            }
            else {
                return area;
            }
        }
        return null;
    };
    DragAndDropHandler.prototype.mustOpenFolderTimer = function (area) {
        var node = area.node;
        return (node.isFolder() &&
            !node.is_open &&
            area.position === node_1.Position.Inside);
    };
    DragAndDropHandler.prototype.updateDropHint = function () {
        if (!this.hovered_area) {
            return;
        }
        // remove previous drop hint
        this.removeDropHint();
        // add new drop hint
        var node_element = this.tree_widget._getNodeElementForNode(this.hovered_area.node);
        this.previous_ghost = node_element.addDropHint(this.hovered_area.position);
    };
    DragAndDropHandler.prototype.startOpenFolderTimer = function (folder) {
        var _this = this;
        var openFolder = function () {
            _this.tree_widget._openNode(folder, _this.tree_widget.options.slide, function () {
                _this.refresh();
                _this.updateDropHint();
            });
        };
        this.stopOpenFolderTimer();
        this.open_folder_timer = setTimeout(openFolder, this.tree_widget.options.openFolderDelay);
    };
    DragAndDropHandler.prototype.stopOpenFolderTimer = function () {
        if (this.open_folder_timer) {
            clearTimeout(this.open_folder_timer);
            this.open_folder_timer = null;
        }
    };
    DragAndDropHandler.prototype.moveItem = function (position_info) {
        var _this = this;
        if (this.current_item &&
            this.hovered_area &&
            this.hovered_area.position !== node_1.Position.None &&
            this.canMoveToArea(this.hovered_area)) {
            var moved_node_1 = this.current_item.node;
            var target_node_1 = this.hovered_area.node;
            var position_1 = this.hovered_area.position;
            var previous_parent = moved_node_1.parent;
            if (position_1 === node_1.Position.Inside) {
                this.hovered_area.node.is_open = true;
            }
            var doMove = function () {
                _this.tree_widget.tree.moveNode(moved_node_1, target_node_1, position_1);
                _this.tree_widget.element.empty();
                _this.tree_widget._refreshElements(null);
            };
            var event_1 = this.tree_widget._triggerEvent("tree.move", {
                move_info: {
                    moved_node: moved_node_1,
                    target_node: target_node_1,
                    position: node_1.getPositionName(position_1),
                    previous_parent: previous_parent,
                    do_move: doMove,
                    original_event: position_info.original_event
                }
            });
            if (!event_1.isDefaultPrevented()) {
                doMove();
            }
        }
    };
    DragAndDropHandler.prototype.getTreeDimensions = function () {
        // Return the dimensions of the tree. Add a margin to the bottom to allow
        // to drag-and-drop after the last element.
        var offset = this.tree_widget.element.offset();
        if (!offset) {
            return { left: 0, top: 0, right: 0, bottom: 0 };
        }
        else {
            var el = this.tree_widget.element;
            var width = el.width() || 0;
            var height = el.height() || 0;
            var left = offset.left + this.tree_widget._getScrollLeft();
            return {
                left: left,
                top: offset.top,
                right: left + width,
                bottom: offset.top + height + 16
            };
        }
    };
    return DragAndDropHandler;
}());
exports.DragAndDropHandler = DragAndDropHandler;
var VisibleNodeIterator = /** @class */ (function () {
    function VisibleNodeIterator(tree) {
        this.tree = tree;
    }
    VisibleNodeIterator.prototype.iterate = function () {
        var _this = this;
        var is_first_node = true;
        var _iterateNode = function (node, next_node) {
            var must_iterate_inside = (node.is_open || !node.element) && node.hasChildren();
            var $element = null;
            if (node.element) {
                $element = jQuery(node.element);
                if (!$element.is(":visible")) {
                    return;
                }
                if (is_first_node) {
                    _this.handleFirstNode(node);
                    is_first_node = false;
                }
                if (!node.hasChildren()) {
                    _this.handleNode(node, next_node, $element);
                }
                else if (node.is_open) {
                    if (!_this.handleOpenFolder(node, $element)) {
                        must_iterate_inside = false;
                    }
                }
                else {
                    _this.handleClosedFolder(node, next_node, $element);
                }
            }
            if (must_iterate_inside) {
                var children_length_1 = node.children.length;
                node.children.forEach(function (_, i) {
                    if (i === children_length_1 - 1) {
                        _iterateNode(node.children[i], null);
                    }
                    else {
                        _iterateNode(node.children[i], node.children[i + 1]);
                    }
                });
                if (node.is_open && $element) {
                    _this.handleAfterOpenFolder(node, next_node);
                }
            }
        };
        _iterateNode(this.tree, null);
    };
    return VisibleNodeIterator;
}());
var HitAreasGenerator = /** @class */ (function (_super) {
    __extends(HitAreasGenerator, _super);
    function HitAreasGenerator(tree, current_node, tree_bottom) {
        var _this = _super.call(this, tree) || this;
        _this.current_node = current_node;
        _this.tree_bottom = tree_bottom;
        return _this;
    }
    HitAreasGenerator.prototype.generate = function () {
        this.positions = [];
        this.last_top = 0;
        this.iterate();
        return this.generateHitAreas(this.positions);
    };
    HitAreasGenerator.prototype.generateHitAreas = function (positions) {
        var previous_top = -1;
        var group = [];
        var hit_areas = [];
        for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
            var position = positions_1[_i];
            if (position.top !== previous_top && group.length) {
                if (group.length) {
                    this.generateHitAreasForGroup(hit_areas, group, previous_top, position.top);
                }
                previous_top = position.top;
                group = [];
            }
            group.push(position);
        }
        this.generateHitAreasForGroup(hit_areas, group, previous_top, this.tree_bottom);
        return hit_areas;
    };
    HitAreasGenerator.prototype.handleOpenFolder = function (node, $element) {
        if (node === this.current_node) {
            // Cannot move inside current item
            // Stop iterating
            return false;
        }
        // Cannot move before current item
        if (node.children[0] !== this.current_node) {
            this.addPosition(node, node_1.Position.Inside, this.getTop($element));
        }
        // Continue iterating
        return true;
    };
    HitAreasGenerator.prototype.handleClosedFolder = function (node, next_node, $element) {
        var top = this.getTop($element);
        if (node === this.current_node) {
            // Cannot move after current item
            this.addPosition(node, node_1.Position.None, top);
        }
        else {
            this.addPosition(node, node_1.Position.Inside, top);
            // Cannot move before current item
            if (next_node !== this.current_node) {
                this.addPosition(node, node_1.Position.After, top);
            }
        }
    };
    HitAreasGenerator.prototype.handleFirstNode = function (node) {
        if (node !== this.current_node) {
            this.addPosition(node, node_1.Position.Before, this.getTop(jQuery(node.element)));
        }
    };
    HitAreasGenerator.prototype.handleAfterOpenFolder = function (node, next_node) {
        if (node === this.current_node || next_node === this.current_node) {
            // Cannot move before or after current item
            this.addPosition(node, node_1.Position.None, this.last_top);
        }
        else {
            this.addPosition(node, node_1.Position.After, this.last_top);
        }
    };
    HitAreasGenerator.prototype.handleNode = function (node, next_node, $element) {
        var top = this.getTop($element);
        if (node === this.current_node) {
            // Cannot move inside current item
            this.addPosition(node, node_1.Position.None, top);
        }
        else {
            this.addPosition(node, node_1.Position.Inside, top);
        }
        if (next_node === this.current_node || node === this.current_node) {
            // Cannot move before or after current item
            this.addPosition(node, node_1.Position.None, top);
        }
        else {
            this.addPosition(node, node_1.Position.After, top);
        }
    };
    HitAreasGenerator.prototype.getTop = function ($element) {
        var offset = $element.offset();
        return offset ? offset.top : 0;
    };
    HitAreasGenerator.prototype.addPosition = function (node, position, top) {
        var area = {
            top: top,
            bottom: 0,
            node: node,
            position: position
        };
        this.positions.push(area);
        this.last_top = top;
    };
    HitAreasGenerator.prototype.generateHitAreasForGroup = function (hit_areas, positions_in_group, top, bottom) {
        // limit positions in group
        var position_count = Math.min(positions_in_group.length, 4);
        var area_height = Math.round((bottom - top) / position_count);
        var area_top = top;
        var i = 0;
        while (i < position_count) {
            var position = positions_in_group[i];
            hit_areas.push({
                top: area_top,
                bottom: area_top + area_height,
                node: position.node,
                position: position.position
            });
            area_top += area_height;
            i += 1;
        }
    };
    return HitAreasGenerator;
}(VisibleNodeIterator));
exports.HitAreasGenerator = HitAreasGenerator;
var DragElement = /** @class */ (function () {
    function DragElement(node_name, offset_x, offset_y, $tree) {
        this.offset_x = offset_x;
        this.offset_y = offset_y;
        this.$element = jQuery("<span class=\"jqtree-title jqtree-dragging\">" + node_name + "</span>");
        this.$element.css("position", "absolute");
        $tree.append(this.$element);
    }
    DragElement.prototype.move = function (page_x, page_y) {
        this.$element.offset({
            left: page_x - this.offset_x,
            top: page_y - this.offset_y
        });
    };
    DragElement.prototype.remove = function () {
        this.$element.remove();
    };
    return DragElement;
}());


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var version = "1.4.6";
exports["default"] = version;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var version_1 = __webpack_require__(12);
var jQuery = __webpack_require__(3);
var drag_and_drop_handler_1 = __webpack_require__(11);
var elements_renderer_1 = __webpack_require__(10);
var key_handler_1 = __webpack_require__(9);
var mouse_widget_1 = __webpack_require__(8);
var save_state_handler_1 = __webpack_require__(7);
var scroll_handler_1 = __webpack_require__(6);
var select_node_handler_1 = __webpack_require__(5);
var simple_widget_1 = __webpack_require__(2);
var node_1 = __webpack_require__(0);
var util_1 = __webpack_require__(1);
var node_element_1 = __webpack_require__(4);
var JqTreeWidget = /** @class */ (function (_super) {
    __extends(JqTreeWidget, _super);
    function JqTreeWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._handleClick = function (e) {
            var click_target = _this._getClickTarget(e.target);
            if (click_target) {
                if (click_target.type === "button") {
                    _this.toggle(click_target.node, _this.options.slide);
                    e.preventDefault();
                    e.stopPropagation();
                }
                else if (click_target.type === "label") {
                    var node = click_target.node;
                    var event_1 = _this._triggerEvent("tree.click", {
                        node: node,
                        click_event: e
                    });
                    if (!event_1.isDefaultPrevented()) {
                        _this._selectNode(node, true);
                    }
                }
            }
        };
        _this._handleDblclick = function (e) {
            var click_target = _this._getClickTarget(e.target);
            if (click_target && click_target.type === "label") {
                _this._triggerEvent("tree.dblclick", {
                    node: click_target.node,
                    click_event: e
                });
            }
        };
        _this._handleContextmenu = function (e) {
            var $div = jQuery(e.target).closest("ul.jqtree-tree .jqtree-element");
            if ($div.length) {
                var node = _this._getNode($div);
                if (node) {
                    e.preventDefault();
                    e.stopPropagation();
                    _this._triggerEvent("tree.contextmenu", {
                        node: node,
                        click_event: e
                    });
                    return false;
                }
            }
            return null;
        };
        return _this;
    }
    JqTreeWidget.prototype.toggle = function (node, slide_param) {
        var slide = slide_param == null ? this.options.slide : slide_param;
        if (node.is_open) {
            this.closeNode(node, slide);
        }
        else {
            this.openNode(node, slide);
        }
        return this.element;
    };
    JqTreeWidget.prototype.getTree = function () {
        return this.tree;
    };
    JqTreeWidget.prototype.selectNode = function (node) {
        this._selectNode(node, false);
        return this.element;
    };
    JqTreeWidget.prototype.getSelectedNode = function () {
        if (this.select_node_handler) {
            return this.select_node_handler.getSelectedNode();
        }
        else {
            return false;
        }
    };
    JqTreeWidget.prototype.toJson = function () {
        return JSON.stringify(this.tree.getData());
    };
    JqTreeWidget.prototype.loadData = function (data, parent_node) {
        this._loadData(data, parent_node);
        return this.element;
    };
    /*
    signatures:
    - loadDataFromUrl(url, parent_node=null, on_finished=null)
        loadDataFromUrl('/my_data');
        loadDataFromUrl('/my_data', node1);
        loadDataFromUrl('/my_data', node1, function() { console.log('finished'); });
        loadDataFromUrl('/my_data', null, function() { console.log('finished'); });

    - loadDataFromUrl(parent_node=null, on_finished=null)
        loadDataFromUrl();
        loadDataFromUrl(node1);
        loadDataFromUrl(null, function() { console.log('finished'); });
        loadDataFromUrl(node1, function() { console.log('finished'); });
    */
    JqTreeWidget.prototype.loadDataFromUrl = function (param1, param2, param3) {
        if (typeof param1 === "string") {
            // first parameter is url
            this._loadDataFromUrl(param1, param2, param3);
        }
        else {
            // first parameter is not url
            this._loadDataFromUrl(null, param1, param2);
        }
        return this.element;
    };
    JqTreeWidget.prototype.reload = function (on_finished) {
        this._loadDataFromUrl(null, null, on_finished);
        return this.element;
    };
    JqTreeWidget.prototype.getNodeById = function (node_id) {
        return this.tree.getNodeById(node_id);
    };
    JqTreeWidget.prototype.getNodeByName = function (name) {
        return this.tree.getNodeByName(name);
    };
    JqTreeWidget.prototype.getNodesByProperty = function (key, value) {
        return this.tree.getNodesByProperty(key, value);
    };
    JqTreeWidget.prototype.getNodeByHtmlElement = function (element) {
        return this._getNode(jQuery(element));
    };
    JqTreeWidget.prototype.getNodeByCallback = function (callback) {
        return this.tree.getNodeByCallback(callback);
    };
    JqTreeWidget.prototype.openNode = function (node, param1, param2) {
        var _this = this;
        var parseParams = function () {
            var on_finished;
            var slide;
            if (util_1.isFunction(param1)) {
                on_finished = param1;
                slide = null;
            }
            else {
                slide = param1;
                on_finished = param2;
            }
            if (slide == null) {
                slide = _this.options.slide;
            }
            return [slide, on_finished];
        };
        var _a = parseParams(), slide = _a[0], on_finished = _a[1];
        if (node) {
            this._openNode(node, slide, on_finished);
        }
        return this.element;
    };
    JqTreeWidget.prototype.closeNode = function (node, slide_param) {
        var slide = slide_param == null ? this.options.slide : slide_param;
        if (node.isFolder()) {
            new node_element_1.FolderElement(node, this).close(slide, this.options.animationSpeed);
            this._saveState();
        }
        return this.element;
    };
    JqTreeWidget.prototype.isDragging = function () {
        if (this.dnd_handler) {
            return this.dnd_handler.is_dragging;
        }
        else {
            return false;
        }
    };
    JqTreeWidget.prototype.refreshHitAreas = function () {
        if (this.dnd_handler) {
            this.dnd_handler.refresh();
        }
        return this.element;
    };
    JqTreeWidget.prototype.addNodeAfter = function (new_node_info, existing_node) {
        var new_node = existing_node.addAfter(new_node_info);
        if (new_node) {
            this._refreshElements(existing_node.parent);
        }
        return new_node;
    };
    JqTreeWidget.prototype.addNodeBefore = function (new_node_info, existing_node) {
        var new_node = existing_node.addBefore(new_node_info);
        if (new_node) {
            this._refreshElements(existing_node.parent);
        }
        return new_node;
    };
    JqTreeWidget.prototype.addParentNode = function (new_node_info, existing_node) {
        var new_node = existing_node.addParent(new_node_info);
        if (new_node) {
            this._refreshElements(new_node.parent);
        }
        return new_node;
    };
    JqTreeWidget.prototype.removeNode = function (node) {
        if (node.parent && this.select_node_handler) {
            this.select_node_handler.removeFromSelection(node, true); // including children
            node.remove();
            this._refreshElements(node.parent);
        }
        return this.element;
    };
    JqTreeWidget.prototype.appendNode = function (new_node_info, parent_node_param) {
        var parent_node = parent_node_param || this.tree;
        var node = parent_node.append(new_node_info);
        this._refreshElements(parent_node);
        return node;
    };
    JqTreeWidget.prototype.prependNode = function (new_node_info, parent_node_param) {
        var parent_node = !parent_node_param ? this.tree : parent_node_param;
        var node = parent_node.prepend(new_node_info);
        this._refreshElements(parent_node);
        return node;
    };
    JqTreeWidget.prototype.updateNode = function (node, data) {
        var id_is_changed = data.id && data.id !== node.id;
        if (id_is_changed) {
            this.tree.removeNodeFromIndex(node);
        }
        node.setData(data);
        if (id_is_changed) {
            this.tree.addNodeToIndex(node);
        }
        if (typeof data === "object" && data.children) {
            node.removeChildren();
            if (data.children.length) {
                node.loadFromData(data.children);
            }
        }
        this.renderer.renderFromNode(node);
        this._selectCurrentNode();
        return this.element;
    };
    JqTreeWidget.prototype.moveNode = function (node, target_node, position) {
        var position_index = node_1.getPosition(position);
        this.tree.moveNode(node, target_node, position_index);
        this._refreshElements(null);
        return this.element;
    };
    JqTreeWidget.prototype.getStateFromStorage = function () {
        if (this.save_state_handler) {
            return this.save_state_handler.getStateFromStorage();
        }
    };
    JqTreeWidget.prototype.addToSelection = function (node, mustSetFocus) {
        if (mustSetFocus === void 0) { mustSetFocus = true; }
        if (node && this.select_node_handler) {
            this.select_node_handler.addToSelection(node);
            this._getNodeElementForNode(node).select(mustSetFocus);
            this._saveState();
        }
        return this.element;
    };
    JqTreeWidget.prototype.getSelectedNodes = function () {
        if (!this.select_node_handler) {
            return [];
        }
        else {
            return this.select_node_handler.getSelectedNodes();
        }
    };
    JqTreeWidget.prototype.isNodeSelected = function (node) {
        if (!this.select_node_handler) {
            return false;
        }
        else {
            return this.select_node_handler.isNodeSelected(node);
        }
    };
    JqTreeWidget.prototype.removeFromSelection = function (node) {
        if (this.select_node_handler) {
            this.select_node_handler.removeFromSelection(node);
            this._getNodeElementForNode(node).deselect();
            this._saveState();
        }
        return this.element;
    };
    JqTreeWidget.prototype.scrollToNode = function (node) {
        if (this.scroll_handler) {
            var node_offset = jQuery(node.element).offset();
            var node_top = node_offset ? node_offset.top : 0;
            var tree_offset = this.$el.offset();
            var tree_top = tree_offset ? tree_offset.top : 0;
            var top_1 = node_top - tree_top;
            this.scroll_handler.scrollToY(top_1);
        }
        return this.element;
    };
    JqTreeWidget.prototype.getState = function () {
        if (this.save_state_handler) {
            return this.save_state_handler.getState();
        }
    };
    JqTreeWidget.prototype.setState = function (state) {
        if (this.save_state_handler) {
            this.save_state_handler.setInitialState(state);
            this._refreshElements(null);
        }
        return this.element;
    };
    JqTreeWidget.prototype.setOption = function (option, value) {
        this.options[option] = value;
        return this.element;
    };
    JqTreeWidget.prototype.moveDown = function () {
        if (this.key_handler) {
            this.key_handler.moveDown();
        }
        return this.element;
    };
    JqTreeWidget.prototype.moveUp = function () {
        if (this.key_handler) {
            this.key_handler.moveUp();
        }
        return this.element;
    };
    JqTreeWidget.prototype.getVersion = function () {
        return version_1["default"];
    };
    JqTreeWidget.prototype.testGenerateHitAreas = function (moving_node) {
        if (!this.dnd_handler) {
            return [];
        }
        else {
            this.dnd_handler.current_item = this._getNodeElementForNode(moving_node);
            this.dnd_handler.generateHitAreas();
            return this.dnd_handler.hit_areas;
        }
    };
    JqTreeWidget.prototype._triggerEvent = function (event_name, values) {
        var event = jQuery.Event(event_name);
        jQuery.extend(event, values);
        this.element.trigger(event);
        return event;
    };
    JqTreeWidget.prototype._openNode = function (node, slide, on_finished) {
        var _this = this;
        if (slide === void 0) { slide = true; }
        var doOpenNode = function (_node, _slide, _on_finished) {
            var folder_element = new node_element_1.FolderElement(_node, _this);
            folder_element.open(_on_finished, _slide, _this.options.animationSpeed);
        };
        if (node.isFolder()) {
            if (node.load_on_demand) {
                this._loadFolderOnDemand(node, slide, on_finished);
            }
            else {
                var parent_1 = node.parent;
                while (parent_1) {
                    // nb: do not open root element
                    if (parent_1.parent) {
                        doOpenNode(parent_1, false, null);
                    }
                    parent_1 = parent_1.parent;
                }
                doOpenNode(node, slide, on_finished);
                this._saveState();
            }
        }
    };
    /*
    Redraw the tree or part of the tree.
     from_node: redraw this subtree
    */
    JqTreeWidget.prototype._refreshElements = function (from_node) {
        this.renderer.render(from_node);
        this._triggerEvent("tree.refresh");
    };
    JqTreeWidget.prototype._getNodeElementForNode = function (node) {
        if (node.isFolder()) {
            return new node_element_1.FolderElement(node, this);
        }
        else {
            return new node_element_1.NodeElement(node, this);
        }
    };
    JqTreeWidget.prototype._getNodeElement = function ($element) {
        var node = this._getNode($element);
        if (node) {
            return this._getNodeElementForNode(node);
        }
        else {
            return null;
        }
    };
    JqTreeWidget.prototype._containsElement = function (element) {
        var node = this._getNode(jQuery(element));
        return node != null && node.tree === this.tree;
    };
    JqTreeWidget.prototype._getScrollLeft = function () {
        return ((this.scroll_handler && this.scroll_handler.getScrollLeft()) || 0);
    };
    JqTreeWidget.prototype._init = function () {
        _super.prototype._init.call(this);
        this.element = this.$el;
        this.mouse_delay = 300;
        this.is_initialized = false;
        this.options.rtl = this._getRtlOption();
        if (this.options.closedIcon === null) {
            this.options.closedIcon = this._getDefaultClosedIcon();
        }
        this.renderer = new elements_renderer_1["default"](this);
        if (save_state_handler_1["default"] != null) {
            this.save_state_handler = new save_state_handler_1["default"](this);
        }
        else {
            this.options.saveState = false;
        }
        if (select_node_handler_1["default"] != null) {
            this.select_node_handler = new select_node_handler_1["default"](this);
        }
        if (drag_and_drop_handler_1.DragAndDropHandler != null) {
            this.dnd_handler = new drag_and_drop_handler_1.DragAndDropHandler(this);
        }
        else {
            this.options.dragAndDrop = false;
        }
        if (scroll_handler_1["default"] != null) {
            this.scroll_handler = new scroll_handler_1["default"](this);
        }
        if (key_handler_1["default"] != null && select_node_handler_1["default"] != null) {
            this.key_handler = new key_handler_1["default"](this);
        }
        this._initData();
        this.element.click(this._handleClick);
        this.element.dblclick(this._handleDblclick);
        if (this.options.useContextMenu) {
            this.element.on("contextmenu", this._handleContextmenu);
        }
    };
    JqTreeWidget.prototype._deinit = function () {
        this.element.empty();
        this.element.off();
        if (this.key_handler) {
            this.key_handler.deinit();
        }
        this.tree = new node_1.Node({}, true);
        _super.prototype._deinit.call(this);
    };
    JqTreeWidget.prototype._mouseCapture = function (position_info) {
        if (this.options.dragAndDrop && this.dnd_handler) {
            return this.dnd_handler.mouseCapture(position_info);
        }
        else {
            return false;
        }
    };
    JqTreeWidget.prototype._mouseStart = function (position_info) {
        if (this.options.dragAndDrop && this.dnd_handler) {
            return this.dnd_handler.mouseStart(position_info);
        }
        else {
            return false;
        }
    };
    JqTreeWidget.prototype._mouseDrag = function (position_info) {
        if (this.options.dragAndDrop && this.dnd_handler) {
            var result = this.dnd_handler.mouseDrag(position_info);
            if (this.scroll_handler) {
                this.scroll_handler.checkScrolling();
            }
            return result;
        }
        else {
            return false;
        }
    };
    JqTreeWidget.prototype._mouseStop = function (position_info) {
        if (this.options.dragAndDrop && this.dnd_handler) {
            return this.dnd_handler.mouseStop(position_info);
        }
        else {
            return false;
        }
    };
    JqTreeWidget.prototype._initData = function () {
        if (this.options.data) {
            this._loadData(this.options.data, null);
        }
        else {
            var data_url = this._getDataUrlInfo(null);
            if (data_url) {
                this._loadDataFromUrl(null, null, null);
            }
            else {
                this._loadData([], null);
            }
        }
    };
    JqTreeWidget.prototype._getDataUrlInfo = function (node) {
        var _this = this;
        var data_url = this.options.dataUrl || this.element.data("url");
        var getUrlFromString = function () {
            var url_info = { url: data_url };
            setUrlInfoData(url_info);
            return url_info;
        };
        var setUrlInfoData = function (url_info) {
            if (node && node.id) {
                // Load on demand of a subtree; add node parameter
                var data = { node: node.id };
                // tslint:disable-next-line: no-string-literal
                url_info["data"] = data;
            }
            else {
                // Add selected_node parameter
                var selected_node_id = _this._getNodeIdToBeSelected();
                if (selected_node_id) {
                    var data = { selected_node: selected_node_id };
                    // tslint:disable-next-line: no-string-literal
                    url_info["data"] = data;
                }
            }
        };
        if (typeof data_url === "function") {
            return data_url(node);
        }
        else if (typeof data_url === "string") {
            return getUrlFromString();
        }
        else if (typeof data_url === "object") {
            setUrlInfoData(data_url);
            return data_url;
        }
        else {
            return data_url;
        }
    };
    JqTreeWidget.prototype._getNodeIdToBeSelected = function () {
        if (this.options.saveState && this.save_state_handler) {
            return this.save_state_handler.getNodeIdToBeSelected();
        }
        else {
            return null;
        }
    };
    JqTreeWidget.prototype._initTree = function (data) {
        var _this = this;
        var doInit = function () {
            if (!_this.is_initialized) {
                _this.is_initialized = true;
                _this._triggerEvent("tree.init");
            }
        };
        this.tree = new this.options.nodeClass(null, true, this.options.nodeClass);
        if (this.select_node_handler) {
            this.select_node_handler.clear();
        }
        this.tree.loadFromData(data);
        var must_load_on_demand = this._setInitialState();
        this._refreshElements(null);
        if (!must_load_on_demand) {
            doInit();
        }
        else {
            // Load data on demand and then init the tree
            this._setInitialStateOnDemand(doInit);
        }
    };
    // Set initial state, either by restoring the state or auto-opening nodes
    // result: must load nodes on demand?
    JqTreeWidget.prototype._setInitialState = function () {
        var _this = this;
        var restoreState = function () {
            // result: is state restored, must load on demand?
            if (!(_this.options.saveState && _this.save_state_handler)) {
                return [false, false];
            }
            else {
                var state = _this.save_state_handler.getStateFromStorage();
                if (!state) {
                    return [false, false];
                }
                else {
                    var must_load_on_demand_1 = _this.save_state_handler.setInitialState(state);
                    // return true: the state is restored
                    return [true, must_load_on_demand_1];
                }
            }
        };
        var autoOpenNodes = function () {
            // result: must load on demand?
            if (_this.options.autoOpen === false) {
                return false;
            }
            var max_level = _this._getAutoOpenMaxLevel();
            var must_load_on_demand = false;
            _this.tree.iterate(function (node, level) {
                if (node.load_on_demand) {
                    must_load_on_demand = true;
                    return false;
                }
                else if (!node.hasChildren()) {
                    return false;
                }
                else {
                    node.is_open = true;
                    return level !== max_level;
                }
            });
            return must_load_on_demand;
        };
        // tslint:disable-next-line: prefer-const
        var _a = restoreState(), is_restored = _a[0], must_load_on_demand = _a[1];
        if (!is_restored) {
            must_load_on_demand = autoOpenNodes();
        }
        return must_load_on_demand;
    };
    // Set the initial state for nodes that are loaded on demand
    // Call cb_finished when done
    JqTreeWidget.prototype._setInitialStateOnDemand = function (cb_finished) {
        var _this = this;
        var restoreState = function () {
            if (!(_this.options.saveState && _this.save_state_handler)) {
                return false;
            }
            else {
                var state = _this.save_state_handler.getStateFromStorage();
                if (!state) {
                    return false;
                }
                else {
                    _this.save_state_handler.setInitialStateOnDemand(state, cb_finished);
                    return true;
                }
            }
        };
        var autoOpenNodes = function () {
            var max_level = _this._getAutoOpenMaxLevel();
            var loading_count = 0;
            var loadAndOpenNode = function (node) {
                loading_count += 1;
                _this._openNode(node, false, function () {
                    loading_count -= 1;
                    openNodes();
                });
            };
            var openNodes = function () {
                _this.tree.iterate(function (node, level) {
                    if (node.load_on_demand) {
                        if (!node.is_loading) {
                            loadAndOpenNode(node);
                        }
                        return false;
                    }
                    else {
                        _this._openNode(node, false, null);
                        return level !== max_level;
                    }
                });
                if (loading_count === 0) {
                    cb_finished();
                }
            };
            openNodes();
        };
        if (!restoreState()) {
            autoOpenNodes();
        }
    };
    JqTreeWidget.prototype._getAutoOpenMaxLevel = function () {
        if (this.options.autoOpen === true) {
            return -1;
        }
        else {
            return parseInt(this.options.autoOpen, 10);
        }
    };
    JqTreeWidget.prototype._getClickTarget = function (element) {
        var $target = jQuery(element);
        var $button = $target.closest(".jqtree-toggler");
        if ($button.length) {
            var node = this._getNode($button);
            if (node) {
                return {
                    type: "button",
                    node: node
                };
            }
        }
        else {
            var $el = $target.closest(".jqtree-element");
            if ($el.length) {
                var node = this._getNode($el);
                if (node) {
                    return {
                        type: "label",
                        node: node
                    };
                }
            }
        }
        return null;
    };
    JqTreeWidget.prototype._getNode = function ($element) {
        var $li = $element.closest("li.jqtree_common");
        if ($li.length === 0) {
            return null;
        }
        else {
            return $li.data("node");
        }
    };
    JqTreeWidget.prototype._saveState = function () {
        if (this.options.saveState && this.save_state_handler) {
            this.save_state_handler.saveState();
        }
    };
    JqTreeWidget.prototype._selectCurrentNode = function () {
        var node = this.getSelectedNode();
        if (node) {
            var node_element = this._getNodeElementForNode(node);
            if (node_element) {
                node_element.select(true);
            }
        }
    };
    JqTreeWidget.prototype._deselectCurrentNode = function () {
        var node = this.getSelectedNode();
        if (node) {
            this.removeFromSelection(node);
        }
    };
    JqTreeWidget.prototype._getDefaultClosedIcon = function () {
        if (this.options.rtl) {
            // triangle to the left
            return "&#x25c0;";
        }
        else {
            // triangle to the right
            return "&#x25ba;";
        }
    };
    JqTreeWidget.prototype._getRtlOption = function () {
        if (this.options.rtl != null) {
            return this.options.rtl;
        }
        else {
            var data_rtl = this.element.data("rtl");
            if (data_rtl != null && data_rtl !== false) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    JqTreeWidget.prototype._notifyLoading = function (is_loading, node, $el) {
        if (this.options.onLoading) {
            this.options.onLoading(is_loading, node, $el);
        }
    };
    JqTreeWidget.prototype._selectNode = function (node, must_toggle) {
        var _this = this;
        if (must_toggle === void 0) { must_toggle = false; }
        if (!this.select_node_handler) {
            return;
        }
        var canSelect = function () {
            if (_this.options.onCanSelectNode) {
                return (_this.options.selectable &&
                    _this.options.onCanSelectNode(node));
            }
            else {
                return _this.options.selectable;
            }
        };
        var openParents = function () {
            var parent = node.parent;
            if (parent && parent.parent && !parent.is_open) {
                _this.openNode(parent, false);
            }
        };
        var saveState = function () {
            if (_this.options.saveState && _this.save_state_handler) {
                _this.save_state_handler.saveState();
            }
        };
        if (!node) {
            // Called with empty node -> deselect current node
            this._deselectCurrentNode();
            saveState();
            return;
        }
        if (!canSelect()) {
            return;
        }
        if (this.select_node_handler.isNodeSelected(node)) {
            if (must_toggle) {
                this._deselectCurrentNode();
                this._triggerEvent("tree.select", {
                    node: null,
                    previous_node: node
                });
            }
        }
        else {
            var deselected_node = this.getSelectedNode();
            this._deselectCurrentNode();
            this.addToSelection(node);
            this._triggerEvent("tree.select", {
                node: node,
                deselected_node: deselected_node
            });
            openParents();
        }
        saveState();
    };
    JqTreeWidget.prototype._loadData = function (data, parent_node) {
        if (!data) {
            return;
        }
        else {
            this._triggerEvent("tree.load_data", { tree_data: data });
            if (parent_node) {
                this._deselectNodes(parent_node);
                this._loadSubtree(data, parent_node);
            }
            else {
                this._initTree(data);
            }
            if (this.isDragging() && this.dnd_handler) {
                this.dnd_handler.refresh();
            }
        }
    };
    JqTreeWidget.prototype._deselectNodes = function (parent_node) {
        if (this.select_node_handler) {
            var selected_nodes_under_parent = this.select_node_handler.getSelectedNodesUnder(parent_node);
            for (var _i = 0, selected_nodes_under_parent_1 = selected_nodes_under_parent; _i < selected_nodes_under_parent_1.length; _i++) {
                var n = selected_nodes_under_parent_1[_i];
                this.select_node_handler.removeFromSelection(n);
            }
        }
    };
    JqTreeWidget.prototype._loadSubtree = function (data, parent_node) {
        parent_node.loadFromData(data);
        parent_node.load_on_demand = false;
        parent_node.is_loading = false;
        this._refreshElements(parent_node);
    };
    JqTreeWidget.prototype._loadDataFromUrl = function (url_info_param, parent_node, on_finished) {
        var _this = this;
        var $el = null;
        var url_info = url_info_param;
        var addLoadingClass = function () {
            $el = parent_node ? jQuery(parent_node.element) : _this.element;
            $el.addClass("jqtree-loading");
            _this._notifyLoading(true, parent_node, $el);
        };
        var removeLoadingClass = function () {
            if ($el) {
                $el.removeClass("jqtree-loading");
                _this._notifyLoading(false, parent_node, $el);
            }
        };
        var parseUrlInfo = function () {
            if (typeof url_info === "string") {
                return { url: url_info };
            }
            if (!url_info.method) {
                url_info.method = "get";
            }
            return url_info;
        };
        var handeLoadData = function (data) {
            removeLoadingClass();
            _this._loadData(data, parent_node);
            if (on_finished && typeof on_finished === "function") {
                on_finished();
            }
        };
        var getDataFromResponse = function (response) {
            return response instanceof Array || typeof response === "object"
                ? response
                : response != null
                    ? jQuery.parseJSON(response)
                    : [];
        };
        var filterData = function (data) {
            return _this.options.dataFilter ? _this.options.dataFilter(data) : data;
        };
        var handleSuccess = function (response) {
            var data = filterData(getDataFromResponse(response));
            handeLoadData(data);
        };
        var handleError = function (response) {
            removeLoadingClass();
            if (_this.options.onLoadFailed) {
                _this.options.onLoadFailed(response);
            }
        };
        var loadDataFromUrlInfo = function () {
            var _url_info = parseUrlInfo();
            jQuery.ajax(jQuery.extend({}, _url_info, {
                method: url_info.method != null
                    ? url_info.method.toUpperCase()
                    : "GET",
                cache: false,
                dataType: "json",
                success: handleSuccess,
                error: handleError
            }));
        };
        if (!url_info_param) {
            // Generate url for node
            url_info = this._getDataUrlInfo(parent_node);
        }
        addLoadingClass();
        if (!url_info) {
            removeLoadingClass();
            return;
        }
        else if (url_info instanceof Array) {
            handeLoadData(url_info);
            return;
        }
        else {
            loadDataFromUrlInfo();
            return;
        }
    };
    JqTreeWidget.prototype._loadFolderOnDemand = function (node, slide, on_finished) {
        var _this = this;
        if (slide === void 0) { slide = true; }
        node.is_loading = true;
        this._loadDataFromUrl(null, node, function () {
            _this._openNode(node, slide, on_finished);
        });
    };
    JqTreeWidget.defaults = {
        animationSpeed: "fast",
        autoOpen: false,
        saveState: false,
        dragAndDrop: false,
        selectable: true,
        useContextMenu: true,
        onCanSelectNode: null,
        onSetStateFromStorage: null,
        onGetStateFromStorage: null,
        onCreateLi: null,
        onIsMoveHandle: null,
        // Can this node be moved?
        onCanMove: null,
        // Can this node be moved to this position? function(moved_node, target_node, position)
        onCanMoveTo: null,
        onLoadFailed: null,
        autoEscape: true,
        dataUrl: null,
        // The symbol to use for a closed node - ► BLACK RIGHT-POINTING POINTER
        // http://www.fileformat.info/info/unicode/char/25ba/index.htm
        closedIcon: null,
        // The symbol to use for an open node - ▼ BLACK DOWN-POINTING TRIANGLE
        // http://www.fileformat.info/info/unicode/char/25bc/index.htm
        openedIcon: "&#x25bc;",
        slide: true,
        nodeClass: node_1.Node,
        dataFilter: null,
        keyboardSupport: true,
        openFolderDelay: 500,
        rtl: false,
        onDragMove: null,
        onDragStop: null,
        buttonLeft: true,
        onLoading: null,
        tabIndex: 0
    };
    return JqTreeWidget;
}(mouse_widget_1["default"]));
simple_widget_1["default"].register(JqTreeWidget, "tree");


/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ })
/******/ ]);