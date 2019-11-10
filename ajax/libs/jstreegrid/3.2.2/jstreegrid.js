/*
 * http://github.com/deitch/jstree-grid
 *
 * This plugin handles adding a grid to a tree to display additional data
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 * 
 * Works only with jstree version >= 3.0.0
 *
 * $Date: 2015-06-01 $
 * $Revision:  3.2.2 $
 */

/*jslint nomen:true */
/*jshint unused:vars */
/*global navigator, document, jQuery, define */

/* AMD support added by jochenberger per https://github.com/deitch/jstree-grid/pull/49
 *
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'jstree'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
	var renderAWidth, renderATitle, getIndent, htmlstripre, findLastClosedNode, BLANKRE = /^\s*$/g,
		IDREGEX = /[\\:&!^|()\[\]<>@*'+~#";,= \/${}%]/g,
	SPECIAL_TITLE = "_DATA_", LEVELINDENT = 24, bound = false, styled = false, GRIDCELLID_PREFIX = "jsgrid_",GRIDCELLID_POSTFIX = "_col";
	
	/*jslint regexp:true */
	htmlstripre = /<\/?[^>]+>/gi;
	/*jslint regexp:false */
	
	getIndent = function(node,tree) {
		var div, i, li, width;
		
		// did we already save it for this tree?
		tree._gridSettings = tree._gridSettings || {};
		if (tree._gridSettings.indent > 0) {
			width = tree._gridSettings.indent;
		} else {
			// create a new div on the DOM but not visible on the page
			div = $("<div></div>");
			i = node.prev("i");
			li = i.parent();
			// add to that div all of the classes on the tree root
			div.addClass(tree.get_node("#",true).attr("class"));
		
			// move the li to the temporary div root
			li.appendTo(div);
			
			// attach to the body quickly
			div.appendTo($("body"));
		
			// get the width
			width = i.width() || LEVELINDENT;
		
			// detach the li from the new div and destroy the new div
			li.detach();
			div.remove();
			
			// save it for the future
			tree._gridSettings.indent = width;
		}
		
		
		return(width);
		
	};
	
	findLastClosedNode = function (tree,id) {
		// first get our node
		var ret, node = tree.get_node(id), children = node.children;
		// is it closed?
		if (!children || children.length <= 0 || !node.state.opened) {
			ret = id;
		} else {
			ret = findLastClosedNode(tree,children[children.length-1]);
		}
		return(ret);
	};

	renderAWidth = function(node,tree) {
		var depth, width,
		fullWidth = parseInt(tree.settings.grid.columns[0].width,10) + parseInt(tree._gridSettings.treeWidthDiff,10);
		// need to use a selector in jquery 1.4.4+
		depth = tree.get_node(node).parents.length;
		width = fullWidth - depth*getIndent(node,tree);
		// the following line is no longer needed, since we are doing this inside a <td>
		//a.css({"vertical-align": "top", "overflow":"hidden"});
		return(fullWidth);
	};
	renderATitle = function(node,t,tree) {
		var a = node.get(0).tagName.toLowerCase() === "a" ? node : node.children("a"), title, col = tree.settings.grid.columns[0];
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

	$.jstree.defaults.grid = {
		width: 25
	};

	$.jstree.plugins.grid = function(options,parent) {
		this._initialize = function () {
			if (!this._initialized) {
				var s = this.settings.grid || {}, styles,	container = this.element, gridparent = container.parent(), i,
				gs = this._gridSettings = {
					columns : s.columns || [],
					treeClass : "jstree-grid-col-0",
					context: s.contextmenu || false,
					columnWidth : s.width,
					defaultConf : {"*display":"inline","*+display":"inline"},
					isThemeroller : !!this._data.themeroller,
					treeWidthDiff : 0,
					resizable : s.resizable,
					indent: 0
				}, cols = gs.columns, treecol = 0;
				// find which column our tree shuld go in
				for (i=0;i<s.columns.length;i++) {
					if (s.columns[i].tree) {
						// save which column it was
						treecol = i;
						// do not check any others
						break;
					}
				}
				this.treecol = treecol;
			
				var msie = /msie/.test(navigator.userAgent.toLowerCase());
				if (msie) {
					var version = parseFloat(navigator.appVersion.split("MSIE")[1]);
					if (version < 8) {
						gs.defaultConf.display = "inline";
						gs.defaultConf.zoom = "1";
					}
				}
			
				// set up the classes we need
				if (!styled) {
					styled = true;
					styles = [
						'.jstree-grid-cell {vertical-align: top; overflow:hidden;margin-left:0;position:relative;width: 100%;padding-left:7px;white-space: nowrap;}',
						'.jstree-grid-cell span {margin-right:0px;margin-right:0px;*display:inline;*+display:inline;white-space: nowrap;}',
						'.jstree-grid-separator {position:relative; height:24px; float:right;margin-left: -2px; border-width: 0 2px 0 0; *display:inline; *+display:inline; margin-right:0px;width:0px;}',
	          '.jstree-grid-header-cell {overflow: hidden; white-space: nowrap;padding: 1px 3px 2px 5px;}',
						'.jstree-grid-header-themeroller {border: 0; padding: 1px 3px;}',
						'.jstree-grid-header-regular {background-color: #EBF3FD;}',
						'.jstree-grid-resizable-separator {cursor: col-resize;}',
						'.jstree-grid-separator-regular {border-color: #d0d0d0; border-style: solid;}',
						'.jstree-grid-cell-themeroller {border: none !important; background: transparent !important;}',
						'.jstree-grid-table {table-layout: fixed; width: 100%;}',
						'.jstree-grid-width-auto {width:auto;display:block;}',
						'.jstree-grid-col-0 {width: 100%;}'
					];

					$('<style type="text/css">'+styles.join("\n")+'</style>').appendTo("head");
				}
				this.table = $("<table></table>").addClass("jstree-grid-table");
				this.gridWrapper = $("<div></div>").addClass("jstree-grid-wrapper").appendTo(gridparent).append(this.table);
				this.dataRow = $("<tr></tr>");
				this.headerRow = $("<tr></tr>");
				this.colgroup = $("<colgroup></colgroup>");
				this.table.append(this.colgroup);
				this.table.append(this.headerRow);
				this.table.append(this.dataRow);
				// create the data columns
				for (i=0;i<cols.length;i++) {
					this.dataRow.append($("<td></td>").addClass("jstree-grid-cell"));
				}
				this.dataRow.children("td:eq("+treecol+")").append(container);
				
				this._initialized = true;
			}
		};
		this.init = function (el,options) { 
			parent.init.call(this,el,options);
			this._initialize();
		};
		this.bind = function () {
			parent.bind.call(this);
			this._initialize();
			this.element
			.on("move_node.jstree create_node.jstree clean_node.jstree change_node.jstree", $.proxy(function (e, data) { 
				var target = this.get_node(data || "#",true);
				this._prepare_grid(target);
			}, this))
			.on("delete_node.jstree",$.proxy(function (e,data) {
				if (data.node.id !== undefined) {
					var dataRow = this.dataRow, removeNodes = [data.node.id], i;
					// add children to remove list
					if (data.node && data.node.children_d) {
						removeNodes = removeNodes.concat(data.node.children_d);
					}
					for (i=0;i<removeNodes.length;i++) {
						dataRow.find("div."+GRIDCELLID_PREFIX+removeNodes[i]+GRIDCELLID_POSTFIX).remove();
					}
				}
			}, this))
			.on("close_node.jstree",$.proxy(function (e,data) {
				this._hide_grid(data.node);
			}, this))
			.on("open_node.jstree",$.proxy(function (e,data) {
			}, this))
			.on("load_node.jstree",$.proxy(function (e,data) {
			}, this))
			.on("loaded.jstree", $.proxy(function (e) {
				this._prepare_headers();
				this.element.trigger("loaded_grid.jstree");
				}, this))
			.on("ready.jstree",$.proxy(function (e,data) {
				// find the line-height of the first known node
				var lh = this.element.find("li a:first").css("line-height");
				$('<style type="text/css">td.jstree-grid-cell {line-height: '+lh+'}</style>').appendTo("head");

				// add container classes to the wrapper
				this.gridWrapper.addClass(this.element.attr("class"));
								
			},this))
			.on("move_node.jstree",$.proxy(function(e,data){
				var node = data.new_instance.element;
				//renderAWidth(node,this);
				// check all the children, because we could drag a tree over
				node.find("li > a").each($.proxy(function(i,elm){
					//renderAWidth($(elm),this);
				},this));
				
			},this))
			.on("hover_node.jstree",$.proxy(function(node,selected,event){
				var id = selected.node.id;
				if (this._hover_node !== null && this._hover_node !== undefined) {
					this.dataRow.find("."+GRIDCELLID_PREFIX+this._hover_node+GRIDCELLID_POSTFIX).removeClass("jstree-hovered");
				}
				this._hover_node = id;
				this.dataRow.find("."+GRIDCELLID_PREFIX+id+GRIDCELLID_POSTFIX).addClass("jstree-hovered");
			},this))
			.on("dehover_node.jstree",$.proxy(function(node,selected,event){
				var id = selected.node.id;
				this._hover_node = null;
				this.dataRow.find("."+GRIDCELLID_PREFIX+id+GRIDCELLID_POSTFIX).removeClass("jstree-hovered");
			},this))
			.on("select_node.jstree",$.proxy(function(node,selected,event){
				var id = selected.node.id;
				this.dataRow.find("."+GRIDCELLID_PREFIX+id+GRIDCELLID_POSTFIX).addClass("jstree-clicked");
				this.get_node(selected.node.id,true).children("div.jstree-grid-cell").addClass("jstree-clicked");
			},this))
			.on("deselect_node.jstree",$.proxy(function(node,selected,event){
				var id = selected.node.id;
				this.dataRow.find("."+GRIDCELLID_PREFIX+id+GRIDCELLID_POSTFIX).removeClass("jstree-clicked");
			},this))
			.on("deselect_all.jstree",$.proxy(function(node,selected,event){
				// get all of the ids that were unselected
				var ids = selected.node || [], i;
				for (i=0;i<ids.length;i++) {
					this.dataRow.find("."+GRIDCELLID_PREFIX+ids[i]+GRIDCELLID_POSTFIX).removeClass("jstree-clicked");
				}
			},this))
			.on("search.jstree", $.proxy(function (e, data) {
				// search sometimes filters, so we need to hide all of the appropriate grid cells as well, and show only the matches
				var dataRow = this.dataRow;
				if(this._data.search.som) {
					if(data.nodes.length) {
						// hide all of the grid cells
						dataRow.find('div.jstree-grid-cell').hide();
						// show only those that match
						data.nodes.add(data.nodes.parentsUntil(".jstree")).filter(".jstree-node").each(function (i,node) {
							var id = node.id;
							if (id) {
								dataRow.find("."+GRIDCELLID_PREFIX+id+GRIDCELLID_POSTFIX).show();
							}
						});
					}
				}
				return true;
			}, this))
			;
			if (this._gridSettings.isThemeroller) {
				this.element
					.on("select_node.jstree",$.proxy(function(e,data){
						data.rslt.obj.children("a").nextAll("div").addClass("ui-state-active");
					},this))
					.on("deselect_node.jstree deselect_all.jstree",$.proxy(function(e,data){
						data.rslt.obj.children("a").nextAll("div").removeClass("ui-state-active");
					},this))
					.on("hover_node.jstree",$.proxy(function(e,data){
						data.rslt.obj.children("a").nextAll("div").addClass("ui-state-hover");
					},this))
					.on("dehover_node.jstree",$.proxy(function(e,data){
						data.rslt.obj.children("a").nextAll("div").removeClass("ui-state-hover");
					},this));
			}
		};
		// tear down the tree entirely
		this.teardown = function() {
			var gw = this.gridWrapper, container = this.element, gridparent = gw.parent();
			container.detach();
			gw.remove();
			gridparent.append(container);
			parent.teardown.call(this);
		};
		// clean the grid in case of redraw or refresh entire tree
		this._clean_grid = function (target,id) {
			var dataRow = this.dataRow;
			if (target) {
				dataRow.find("div."+GRIDCELLID_PREFIX+id+GRIDCELLID_POSTFIX).remove();
			} else {
				// get all of the `div` children in all of the `td` in dataRow except for :first (that is the tree itself) and remove
				dataRow.children("td:gt(0)").find("div").remove();
			}
		};
		// prepare the headers
		this._prepare_headers = function() {
			var header, i, col, gs = this._gridSettings,cols = gs.columns || [], width, defaultWidth = gs.columnWidth, resizable = gs.resizable || false,
			cl, ccl, val, margin, last, tr = gs.isThemeroller, classAdd = (tr?"themeroller":"regular"), puller,
			hasHeaders = false, gridparent = this.gridparent, colgroup,
			conf = gs.defaultConf, isClickedSep = false, oldMouseX = 0, newMouseX = 0,
			currentTree = null, colNum = 0, toResize = {}, clickedSep = null, borPadWidth = 0, totalWidth = 0;
			// save the original parent so we can reparent on destroy
			this.parent = gridparent;
			
			
			// set up the wrapper, if not already done
			header = this.headerRow;
			header.addClass((tr?"ui-widget-header ":"")+"jstree-grid-header jstree-grid-header-"+classAdd);
			colgroup = this.colgroup;
			
			// create the headers
			for (i=0;i<cols.length;i++) {
				col = $("<col/>");
				col.appendTo(colgroup);
				cl = cols[i].headerClass || "";
				ccl = cols[i].columnClass || "";
				val = cols[i].header || "";
				if (val) {hasHeaders = true;}
				width = cols[i].width || defaultWidth;
				borPadWidth = tr ? 1+6 : 2+8; // account for the borders and padding
				width -= borPadWidth;
				margin = i === 0 ? 3 : 0;
				col.css({width:width});
				last = $("<th></th>").css(conf).css({"margin-left": margin}).addClass((tr?"ui-widget-header ":"")+"jstree-grid-header jstree-grid-header-cell jstree-grid-header-"+classAdd+" "+cl+" "+ccl).html(val).appendTo(header);
				totalWidth += last.outerWidth();
				puller = $("<div class='jstree-grid-separator jstree-grid-separator-"+classAdd+(tr ? " ui-widget-header" : "")+(resizable? " jstree-grid-resizable-separator":"")+"'>&nbsp;</div>").appendTo(last);
			}
			// get rid of last puller
			puller.remove();
			last.addClass((tr?"ui-widget-header ":"")+"jstree-grid-header jstree-grid-header-last jstree-grid-header-"+classAdd);
			// if there is no width given for the last column, do it via automatic
			if (cols[cols.length-1].width === undefined) {
				totalWidth -= width;
				col.css({width:"auto"});
				last.addClass("jstree-grid-width-auto").next(".jstree-grid-separator").remove();
			}
			if (hasHeaders) {
				// save the offset of the div from the body
				gs.divOffset = header.parent().offset().left;
				gs.header = header;
			} else {
				this.headerRow.css("display","none");				
			}

			if (!bound && resizable) {
				bound = true;
				$(document).mouseup(function () {
					var  i, ref, cols, widths, headers, w;
					if (isClickedSep) {
						ref = $.jstree.reference(currentTree);
						cols = ref.settings.grid.columns;
						headers = colgroup.children("col");
						widths = [];
						if (isNaN(colNum) || colNum < 0) { ref._gridSettings.treeWidthDiff = currentTree.find("ins:eq(0)").width() + currentTree.find("a:eq(0)").width() - ref._gridSettings.columns[0].width; }
						isClickedSep = false;
						for (i=0;i<cols.length;i++) {
							w = parseFloat(headers[i].style.width);
							widths[i] = {w: w, r: i===colNum };
							ref._gridSettings.columns[i].width = w;
						}
						
						currentTree.trigger("resize_column.jstree-grid", widths);
					}
				}).mousemove(function (e) {
						if (isClickedSep) {
							newMouseX = e.clientX;
							var diff = newMouseX - oldMouseX,
							oldPrevHeaderInner, oldNextHeaderInner, 
							oldPrevColWidth, oldNextColWidth, newPrevColWidth,
							newNextColWidth;

							if (diff !== 0){
								oldPrevHeaderInner = toResize.prevHeader.width();
								oldNextHeaderInner = toResize.nextHeader.width();
								oldPrevColWidth = parseFloat(toResize.prevCol.css("width"));
								oldNextColWidth = parseFloat(toResize.nextCol.css("width"));
								
								// make sure that diff cannot be beyond the left/right limits
								diff = diff < 0 ? Math.max(diff,-oldPrevHeaderInner) : Math.min(diff,oldNextHeaderInner);
								newPrevColWidth = (oldPrevColWidth+diff)+"px";
								newNextColWidth = (oldNextColWidth-diff)+"px";
								
								// only do this if we are not shrinking past 0 on left or right - and limit it to that amount
								if ((diff < 0 && oldPrevHeaderInner > 0) || (diff > 0 && oldNextHeaderInner > 0)) {
									toResize.prevCol.width(newPrevColWidth);
									if (!toResize.nextHeader.hasClass("jstree-grid-width-auto")) {
										toResize.nextCol.width(newNextColWidth);
									}
									oldMouseX = newMouseX;
								}
							}
						}
					});
				header.on("selectstart", ".jstree-grid-resizable-separator", function () { return false; })
					.on("mousedown", ".jstree-grid-resizable-separator", function (e) {
						var headerWrapper;
						clickedSep = $(this);
						isClickedSep = true;
						currentTree = clickedSep.closest(".jstree-grid-wrapper").find(".jstree");
						oldMouseX = e.clientX;
						colNum = clickedSep.closest("th").prevAll("th").length;
						toResize.prevCol = colgroup.children("col:eq("+colNum+")");
						toResize.nextCol = toResize.prevCol.next("col");
						toResize.prevHeader = clickedSep.closest("th");
						toResize.nextHeader = toResize.prevHeader.next("th");
						// the max rightmost position we will allow is the right-most of the wrapper minus a buffer (10)
						headerWrapper = clickedSep.parent();
						return false;
					});
			}
		};
		/*
		 * Override redraw_node to correctly insert the grid
		 */
		this.redraw_node = function(obj, deep, is_callback, force_render) {
			// first allow the parent to redraw the node
			obj = parent.redraw_node.call(this, obj, deep, is_callback, force_render);
			// next prepare the grid
			if(obj) {
				this._prepare_grid(obj);
			}
			return obj;
		};
		this.refresh = function () {
			this._clean_grid();
			return parent.refresh.call(this);
		};
		this._hide_grid = function (node) {
			var dataRow = this.dataRow, children = node && node.children_d ? node.children_d : [], i;
			// go through each column, remove all children with the correct ID name
			for (i=0;i<children.length;i++) {
				dataRow.find("td div."+GRIDCELLID_PREFIX+children[i]+GRIDCELLID_POSTFIX).remove();
			}
		};
		this.holdingCells = {};
		this.getHoldingCells = function (obj,col,hc) {
			var ret = $(), children = obj.children||[], child, i;
			// run through each child, render it, and then render its children recursively
			for (i=0;i<children.length;i++) {
				child = GRIDCELLID_PREFIX+children[i]+GRIDCELLID_POSTFIX+col;
				if (hc[child]) {
					ret = ret.add(hc[child]).add(this.getHoldingCells(this.get_node(children[i]),col,hc));
					delete hc[child];
				}
			}
			return(ret);
		};
		/**
		 * put a grid cell in edit mode (input field to edit the data)
		 * @name edit(obj, col)
		 * @param  {mixed} obj
		 * @param  {obj} col definition
		 * @param  {element} cell element, either span or wrapping div
		 */
		this._edit = function (obj, col, element) {
			if(!obj) { return false; }
			if (element) {
				element = $(element);
				if (element.prop("tagName").toLowerCase() === "div") {
					element = element.children("span:first");
				}
			} else {
				// need to find the element - later
				return false;
			}
			var rtl = this._data.core.rtl,
				w  = this.element.width(),
				t = obj.data[col.value],
				h1 = $("<"+"div />", { css : { "position" : "absolute", "top" : "-200px", "left" : (rtl ? "0px" : "-1000px"), "visibility" : "hidden" } }).appendTo("body"),
				h2 = $("<"+"input />", {
						"value" : t,
						"class" : "jstree-rename-input",
						"css" : {
							"padding" : "0",
							"border" : "1px solid silver",
							"box-sizing" : "border-box",
							"display" : "inline-block",
							"height" : (this._data.core.li_height) + "px",
							"lineHeight" : (this._data.core.li_height) + "px",
							"width" : "150px" // will be set a bit further down
						},
						"blur" : $.proxy(function () {
							var v = h2.val();
							// save the value if changed
							if(v === "" || v === t) { 
								v = t; 
							} else {
								obj.data[col.value] = v;
								this.element.trigger('update_cell.jstree-grid',{node:obj, col:col.value, value:v, old:t});
								this._prepare_grid(this.get_node(obj,true));
							}
							h2.remove();
							element.show();
						}, this),
						"keydown" : function (event) {
							var key = event.which;
							if(key === 27) {
								this.value = t;
							}
							if(key === 27 || key === 13 || key === 37 || key === 38 || key === 39 || key === 40 || key === 32) {
								event.stopImmediatePropagation();
							}
							if(key === 27 || key === 13) {
								event.preventDefault();
								this.blur();
							}
						},
						"click" : function (e) { e.stopImmediatePropagation(); },
						"mousedown" : function (e) { e.stopImmediatePropagation(); },
						"keyup" : function (event) {
							h2.width(Math.min(h1.text("pW" + this.value).width(),w));
						},
						"keypress" : function(event) {
							if(event.which === 13) { return false; }
						}
					}),
				fn = {
						fontFamily		: element.css('fontFamily')		|| '',
						fontSize		: element.css('fontSize')			|| '',
						fontWeight		: element.css('fontWeight')		|| '',
						fontStyle		: element.css('fontStyle')		|| '',
						fontStretch		: element.css('fontStretch')		|| '',
						fontVariant		: element.css('fontVariant')		|| '',
						letterSpacing	: element.css('letterSpacing')	|| '',
						wordSpacing		: element.css('wordSpacing')		|| ''
				};
			element.hide();
			element.parent().append(h2);
			h2.css(fn).width(Math.min(h1.text("pW" + h2[0].value).width(),w))[0].select();
		};
		this._prepare_grid = function (obj) {
			var gs = this._gridSettings, c = gs.treeClass, _this = this, t, cols = gs.columns || [], width, tr = gs.isThemeroller, 
			tree = this.element,
			classAdd = (tr?"themeroller":"regular"), img, objData = this.get_node(obj),
			defaultWidth = gs.columnWidth, conf = gs.defaultConf, cellClickHandler = function (tree,node,val,col,t) {
				return function(e) {
					node = tree.find("#"+node.attr("id"));
					node.children(".jstree-anchor").trigger("click.jstree",e);
					tree.trigger("select_cell.jstree-grid", [{value: val,column: col.header,node: node,grid:$(this),sourceName: col.value}]);
				};
			}, cellRightClickHandler = function (tree,node,val,col,t) {
				return function (e) {
					if (gs.context) {
						e.preventDefault();
						$.vakata.context.show(this,{ 'x' : e.pageX, 'y' : e.pageY },{
							"edit":{label:"Edit","action": function (data) {
								var obj = t.get_node(node);
								_this._edit(obj,col,e.target);
							}}
						});
					}
				};
			},
			i, val, cl, wcl, ccl, a, last, valClass, wideValClass, span, paddingleft, title, gridCellName, gridCellParentId, gridCellParent,
			gridCellPrev, gridCellPrevId, gridCellNext, gridCellNextId, gridCellChild, gridCellChildId, 
			col, content, tmpWidth, dataRow = this.dataRow, dataCell, lid = objData.id,
			peers = this.get_node(objData.parent).children,
			// find my position in the list of peers. "peers" is the list of everyone at my level under my parent, in order
			pos = jQuery.inArray(lid,peers),
			hc = this.holdingCells, rendered = false, closed;
			// get our column definition
			t = $(obj);
			
			// find the a children
			a = t.children("a");
			
			if (a.length === 1) {
				closed = !objData.state.opened;
				gridCellName = GRIDCELLID_PREFIX+lid+GRIDCELLID_POSTFIX;
				gridCellName = gridCellName.replace(IDREGEX,'\\$&');
				gridCellParentId = objData.parent === "#" ? null : GRIDCELLID_PREFIX+objData.parent+GRIDCELLID_POSTFIX;
				a.addClass(c);
				//renderAWidth(a,_this);
				renderATitle(a,t,_this);
				last = a;
				for (i=0;i<cols.length;i++) {
					if (this.treecol === i) {
						continue;
					}
					col = cols[i];
					dataCell = dataRow.children("td:eq("+i+")");
					// get the cellClass, the wideCellClass, and the columnClass
					cl = col.cellClass || "";
					wcl = col.wideCellClass || "";
					ccl = col.columnClass || "";

					// add a column class to the dataCell
					dataCell.addClass(ccl);


					// get the contents of the cell - value could be a string or a function
					if (col.value !== undefined && col.value !== null) {
						if (typeof(col.value) === "function") {
							val = col.value(objData);
						} else if (objData.data !== null && objData.data !== undefined && objData.data[col.value] !== undefined) {
							val = objData.data[col.value];
						} else {
							val = "";
						}
					} else {
						val = "";
					}

					// put images instead of text if needed
					if (col.images) {
					img = col.images[val] || col.images["default"];
					if (img) {content = img[0] === "*" ? '<span class="'+img.substr(1)+'"></span>' : '<img src="'+img+'">';}
					} else { content = val; }
					
					// content cannot be blank, or it messes up heights
					if (content === undefined || content === null || BLANKRE.test(content)) {
						content = "&nbsp;";
					}

					// get the valueClass
					valClass = col.valueClass && objData.data !== null && objData.data !== undefined ? objData.data[col.valueClass] || "" : "";
					if (valClass && col.valueClassPrefix && col.valueClassPrefix !== "") {
						valClass = col.valueClassPrefix + valClass;
					}
					// get the wideValueClass
					wideValClass = col.wideValueClass && objData.data !== null && objData.data !== undefined ? objData.data[col.wideValueClass] || "" : "";
					if (wideValClass && col.wideValueClassPrefix && col.wideValueClassPrefix !== "") {
						wideValClass = col.wideValueClassPrefix + wideValClass;
					}
					// get the title
					title = col.title && objData.data !== null && objData.data !== undefined ? objData.data[col.title] || "" : "";
					// strip out HTML
					title = title.replace(htmlstripre, '');
					
					// get the width
					paddingleft = 7;
					width = col.width || defaultWidth;
					width = tmpWidth || (width - paddingleft);
					
					last = dataCell.children("div#"+gridCellName+i);
					if (!last || last.length < 1) {
						last = $("<div></div>");
						$("<span></span>").appendTo(last);
						last.attr("id",gridCellName+i);
						last.addClass(gridCellName);

					}
					// we need to put it in the dataCell - after the parent, but the position matters
					// if we have no parent, then we are one of the root nodes, but still need to look at peers


					// if we are first, i.e. pos === 0, we go right after the parent;
					// if we are not first, and our previous peer (one before us) is closed, we go right after the previous peer cell
					// if we are not first, and our previous peer is opened, then we have to find its youngest & lowest closed child (incl. leaf)
					//
					// probably be much easier to go *before* our next one
					// but that one might not be drawn yet
					// here is the logic for jstree drawing:
					//   it draws peers from first to last or from last to first
					//   it draws children before a parent
					// 
					// so I can rely on my *parent* not being drawn, but I cannot rely on my previous peer or my next peer being drawn
					
					// so we do the following:
					//   1- We are the first child: install after the parent
					//   2- Our previous peer is already drawn: install after the previous peer
					//   3- Our previous peer is not drawn, we have a child that is drawn: install right before our first child
					//   4- Our previous peer is not drawn, we have no child that is drawn, our next peer is drawn: install right before our next peer
					//   5- Our previous peer is not drawn, we have no child that is drawn, our next peer is not drawn: install right after parent
					gridCellPrevId = GRIDCELLID_PREFIX+ (pos <=0 ? objData.parent : findLastClosedNode(this,peers[pos-1])) +GRIDCELLID_POSTFIX+i;
					gridCellPrev = dataCell.find("div#"+gridCellPrevId);
					gridCellNextId = GRIDCELLID_PREFIX+ (pos >= peers.length-1 ? "NULL" : peers[pos+1]) +GRIDCELLID_POSTFIX+i;
					gridCellNext = dataCell.find("div#"+gridCellNextId);
					gridCellChildId = GRIDCELLID_PREFIX+ (objData.children && objData.children.length > 0 ? objData.children[0] : "NULL") +GRIDCELLID_POSTFIX+i;
					gridCellChild = dataCell.find("div#"+gridCellChildId);
					gridCellParent = dataCell.find("div#"+gridCellParentId+i);


					// if our parent is already drawn, then we put this in the right order under our parent
					if (gridCellParentId) {
						if (gridCellParent && gridCellParent.length > 0) {
							if (gridCellPrev && gridCellPrev.length > 0) {
								last.insertAfter(gridCellPrev);
							} else if (gridCellChild && gridCellChild.length > 0) {
								last.insertBefore(gridCellChild);
							} else if (gridCellNext && gridCellNext.length > 0) {
								last.insertBefore(gridCellNext);
							} else {
								last.insertAfter(gridCellParent);
							}
							rendered = true;
						} else {
							// if you parent is not drawn, we put it in the holding cells, and then sort when the parent comes in
							hc[gridCellName+i] = last;
							rendered = false;
						}
					} else {
						if (gridCellPrev && gridCellPrev.length > 0) {
							last.insertAfter(gridCellPrev);
						} else if (gridCellChild && gridCellChild.length > 0) {
							last.insertBefore(gridCellChild);
						} else if (gridCellNext && gridCellNext.length > 0) {
							last.insertBefore(gridCellNext);
						} else {
							last.appendTo(dataCell);
						}
						rendered = true;
					}

					// do we have any children waiting for this cell?
					if (rendered) {
						last.after(this.getHoldingCells(objData,i,hc));
					}
					// need to make the height of this match the line height of the tree. How?
					span = last.children("span");

					// create a span inside the div, so we can control what happens in the whole div versus inside just the text/background
					span.addClass(cl+" "+valClass).html(content);
					last = last.css(conf).addClass("jstree-grid-cell jstree-grid-cell-"+classAdd+" "+wcl+ " " + wideValClass + (tr?" ui-state-default":"")).addClass("jstree-grid-col-"+i);
					// add click handler for clicking inside a grid cell
					last.click(cellClickHandler(tree,t,val,col,this));
					last.on("contextmenu",cellRightClickHandler(tree,t,val,col,this));
					
					if (title) {
						span.attr("title",title);
					}

				}		
				last.addClass("jstree-grid-cell-last"+(tr?" ui-state-default":""));
				// if there is no width given for the last column, do it via automatic
				if (cols[cols.length-1].width === undefined) {
					last.addClass("jstree-grid-width-auto").next(".jstree-grid-separator").remove();
				}
			}
			this.element.css({'overflow-y':'auto !important'});			
		};

		// need to do alternating background colors or borders
	};
}));
