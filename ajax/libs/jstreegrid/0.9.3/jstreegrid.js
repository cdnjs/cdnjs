/*
 * jsTreeGrid 0.97
 * http://jsorm.com/
 *
 * This plugin handles adding a grid to a tree to display additional data
 *
 * Dual licensed under the MIT and GPL licenses (same as jQuery):
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 * 
 * Created for Tufin www.tufin.com
 * Contributed to public source through the good offices of Tufin
 *
 * $Date: 2010-10-28 $
 * $Revision:  $
 */

/*jslint nomen:false */
/*global window, document, jQuery*/

(function ($) {
	var renderAWidth, renderATitle, htmlstripre, SPECIAL_TITLE = "_DATA_";
	/*jslint regexp:false */
	htmlstripre = /<\/?[^>]+>/gi;
	/*jslint regexp:true */

	renderAWidth = function(node,tree) {
		var depth, a = node.get(0).tagName.toLowerCase() === "a" ? node : node.children("a"),
		width = tree.data.grid.columns[0].width;
		// need to use a selector in jquery 1.4.4+
		depth = a.parentsUntil(tree.get_container().get(0).tagName+".jstree").filter("li").length;
		width = width - depth*18;
		a.css({width: width, "vertical-align": "top", "overflow":"hidden"});
	};
	renderATitle = function(node,t,tree) {
		var a = node.get(0).tagName.toLowerCase() === "a" ? node : node.children("a"), title, col = tree.data.grid.columns[0];
		// get the title
		title = "";
		if (col.title) {
			if (col.title === SPECIAL_TITLE) {
				title = tree.get_text(t);
			} else if (t.attr(col.title)) {
				title = t.attr(col.title);
			}
		}
		// strip out HTML
		title = title.replace(htmlstripre, '');
		if (title) {
			a.attr("title",title);
		}
	};

	$.jstree.plugin("grid", {
		__init : function () { 
			var s = this._get_settings().grid || {};
			this.data.grid.columns = s.columns || []; 
			this.data.grid.treeClass = "jstree-grid";
			this.data.grid.columnWidth = s.width;
			this.data.grid.defaultConf = {display: "inline-block"};
			this.data.grid.isThemeroller = !!this.data.themeroller;
			
			if ($.browser.msie && parseInt($.browser.version.substr(0,1),10) < 8) {
				this.data.grid.defaultConf.display = "inline";
				this.data.grid.defaultConf.zoom = "1";
			}
			
			// set up the classes we need
			if (this.data.grid.isThemeroller) {
				$('<style type="text/css">.jstree-grid-header {border-width: 0 1px 0 0; padding: 1px 3px;}\n.jstree-grid-cell {padding-left: 4px; border: none !important; background: transparent !important;}</style>').appendTo($("head"));
			} else {
				$('<style type="text/css">.jstree-grid-header {border-left: 1px solid #eeeeee;border-right: 1px solid #d0d0d0;background-color: #EBF3FD;}\n.jstree-grid-cell {padding-left: 4px;}</style>').appendTo($("head"));
			}

			this.get_container().bind("open_node.jstree create_node.jstree clean_node.jstree change_node.jstree", $.proxy(function (e, data) { 
					var target = data && data.rslt && data.rslt.obj ? data.rslt.obj : e.target;
					target = $(target);
					this._prepare_grid(target);
				}, this))
			.bind("loaded.jstree", $.proxy(function (e) {
				this._prepare_headers();
				this._prepare_grid();
				this.get_container().trigger("loaded_grid.jstree");
				}, this))
			.bind("move_node.jstree",$.proxy(function(e,data){
				var node = data.rslt.o;
				renderAWidth(node,this);
				// check all the children, because we could drag a tree over
				node.find("li > a").each($.proxy(function(i,elm){
					renderAWidth($(elm),this);
				},this));
				
			},this));
			if (this.data.grid.isThemeroller) {
				this.get_container()
					.bind("select_node.jstree",$.proxy(function(e,data){
						data.rslt.obj.children("a").nextAll("div").addClass("ui-state-active");
					},this))
					.bind("deselect_node.jstree deselect_all.jstree",$.proxy(function(e,data){
						data.rslt.obj.children("a").nextAll("div").removeClass("ui-state-active");
					},this))
					.bind("hover_node.jstree",$.proxy(function(e,data){
						data.rslt.obj.children("a").nextAll("div").addClass("ui-state-hover");
					},this))
					.bind("dehover_node.jstree",$.proxy(function(e,data){
						data.rslt.obj.children("a").nextAll("div").removeClass("ui-state-hover");
					},this));
			}
			
		},
		__destroy : function() {
			var parent = this.data.grid.parent, container = this.get_container();
			container.detach();
			$("div.jstree-grid-wrapper",parent).remove();
			parent.append(container);
		},
		defaults : {
			width: 25
		},
		_fn : { 
			_prepare_headers : function() {
				var header, i, cols = this.data.grid.columns || [], width, defaultWidth = this.data.grid.columnWidth, cl, val, margin, last, tr = this.data.grid.isThemeroller,
				cHeight, hHeight, container = this.get_container(), parent = container.parent(), hasHeaders = 0,
				conf = this.data.grid.defaultConf;
				// save the original parent so we can reparent on destroy
				this.data.grid.parent = parent;
				
				
				// set up the wrapper, if not already done
				header = this.data.grid.header || $("<div></div>").addClass((tr?"ui-widget-header ":"")+"jstree-grid-header");
				
				// create the headers
				for (i=0;i<cols.length;i++) {
					cl = cols[i].headerClass || "";
					val = cols[i].header || "";
					if (val) {hasHeaders = true;}
					width = cols[i].width || defaultWidth;
					width -= tr ? 1+6 : 2+8; // account for the borders and padding
					margin = i === 0 ? 3 : 0;
					last = $("<div></div>").css(conf).css({"margin-left": margin,"width":width, "padding": "1 3 2 5"}).addClass((tr?"ui-widget-header ":"")+"jstree-grid-header "+cl).text(val).appendTo(header);
				}		
				last.addClass((tr?"ui-widget-header ":"")+"jstree-grid-header");
				// did we have any real columns?
				if (hasHeaders) {
					$("<div></div>").addClass("jstree-grid-wrapper").appendTo(parent).append(header).append(container);
					// save the offset of the div from the body
					this.data.grid.divOffset = header.parent().offset().left;
					this.data.grid.header = header;
				}
				
			},
			_prepare_grid : function(obj) {
				var c = this.data.grid.treeClass, _this = this, t, cols = this.data.grid.columns || [], width, tr = this.data.grid.isThemeroller, img,
				defaultWidth = this.data.grid.columnWidth, divOffset = this.data.grid.divOffset, conf = this.data.grid.defaultConf;
				obj = !obj || obj === -1 ? this.get_container() : this._get_node(obj);
				// get our column definition
				obj.each(function () {
					var i, val, cl, wcl, a, last, valClass, wideValClass, span, paddingleft, title, isAlreadyGrid, col, content, s;
					t = $(this);
					
					// find the a children
					a = t.children("a");
					isAlreadyGrid = a.hasClass(c);
					
					if (a.length === 1) {
						a.addClass(c);
						renderAWidth(a,_this);
						renderATitle(a,t,_this);
						last = a;
						for (i=1;i<cols.length;i++) {
							col = cols[i];
							s = col.source || "attr";
							// get the cellClass and the wideCellClass
							cl = col.cellClass || "";
							wcl = col.wideCellClass || "";


							// get the contents of the cell
							if (s === "attr") { val = col.value && t.attr(col.value) ? t.attr(col.value) : "";
							} else if (s === "metadata") { val = col.value && t.data(col.value) ? t.data(col.value) : ""; }

							// put images instead of text if needed
							if (col.images) {
							img = col.images[val] || col.images["default"];
							if (img) {content = img[0] === "*" ? '<span class="'+img.substr(1)+'"></span>' : '<img src="'+img+'">';}
							} else { content = val; }

							// get the valueClass
							valClass = col.valueClass && t.attr(col.valueClass) ? t.attr(col.valueClass) : "";
							if (valClass && col.valueClassPrefix && col.valueClassPrefix !== "") {
								valClass = col.valueClassPrefix + valClass;
							}
							// get the wideValueClass
							wideValClass = col.wideValueClass && t.attr(col.wideValueClass) ? t.attr(col.wideValueClass) : "";
							if (wideValClass && col.wideValueClassPrefix && col.wideValueClassPrefix !== "") {
								wideValClass = col.wideValueClassPrefix + wideValClass;
							}
							// get the title
							title = col.title && t.attr(col.title) ? t.attr(col.title) : "";
							// strip out HTML
							title = title.replace(htmlstripre, '');
							
							// get the width
							paddingleft = 7;
							width = col.width || defaultWidth;
							width = width - paddingleft;
							
							last = isAlreadyGrid ? a.nextAll("div:eq("+(i-1)+")") : $("<div></div>").insertAfter(last);
							span = isAlreadyGrid ? last.children("span") : $("<span></span>").appendTo(last);

							// create a span inside the div, so we can control what happens in the whole div versus inside just the text/background
							span.addClass(cl+" "+valClass).css("display","inline-block").html(content).click(function () {
								$(this).trigger("select_cell.jstree-grid", [{value: val,column: col.header,node: $(this).closest("li"),sourceName: col.value,sourceType: s}]);
							});
							last = last.css(conf).css({width: width,"padding-left":paddingleft+"px"}).addClass("jstree-grid-cell "+wcl+ " " + wideValClass + (tr?" ui-state-default":""));
							
							if (title) {
								span.attr("title",title);
							}

						}		
						last.addClass("jstree-grid-cell-last"+(tr?" ui-state-default":""));
					}
				});
				if(obj.is("li")) { this._repair_state(obj); }
				else { obj.find("> ul > li").each(function () { _this._repair_state(this); }); }
			}
		}
		// need to do alternating background colors or borders
	});
}(jQuery));
