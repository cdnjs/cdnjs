/*
 * http://github.com/deitch/jstree-grid
 *
 * This plugin handles adding a grid to a tree to display additional data
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Works only with jstree version >= 3.3.0
 *
 * $Date: 2017-04-19 $
 * $Revision:  3.8.2 $
 */

/*jslint nomen:true */
/*jshint unused:vars */
/*global console, navigator, document, jQuery, define, localStorage */

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
	var BLANKRE = /^\s*$/g,
		IDREGEX = /[\\:&!^|()\[\]<>@*'+~#";,= \/${}%]/g, escapeId = function (id) {
			return (id||"").replace(IDREGEX,'\\$&');
		}, NODE_DATA_ATTR = "data-jstreegrid", COL_DATA_ATTR = "data-jstreegrid-column",
		SEARCHCLASS = "jstree-search",
	SPECIAL_TITLE = "_DATA_", LEVELINDENT = 24, styled = false,
		MINCOLWIDTH = 10,
		generateCellId = function (tree,id) {
			return("jstree_"+tree+"_grid_"+escapeId(id)+"_col");
		},
    getIds = function (nodes) {
      return $.makeArray(nodes.map(function(){return this.id;}));
    },
    findDataCell = function (uniq, ids, col, scope) {
      if (scope == undefined) { scope = $(); };
			if (ids === null || ids === undefined || ids.length === 0) {
        return scope;
      }
      var ret = $(), columns = [].concat(col), cellId;
      if (typeof (ids) === "string") {
        cellId = generateCellId(uniq,ids);
				ret = columns.map(function (col) {
					return "#"+cellId+col;
				}).join(", ");
			} else {
				ret = []
				ids.forEach(function (elm,i) {
          var cellId = generateCellId(uniq,elm);
					ret = ret.concat(columns.map(function (col) {
						return "#"+cellId+col;
					}));
				});
        ret = ret.join(", ");
			}
      return columns.length ==1 ?  scope.find(ret) : $(ret);
		},
		isClickedSep = false, toResize = null, oldMouseX = 0, newMouseX = 0,

	/*jslint regexp:true */
	htmlstripre = /<\/?[^>]+>/gi,
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

	},

	copyData = function (fromtree,from,totree,to,recurse) {
		var i, j;
	  to.data = $.extend(true, {}, from.data);
		if (from && from.children_d && recurse) {
			for(i = 0, j = from.children_d.length; i < j; i++) {
			   copyData(fromtree,fromtree.get_node(from.children_d[i]),totree,totree.get_node(to.children_d[i]),recurse);
			}
		}
	},

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
	},

	renderAWidth = function(node,tree) {
		var depth, width,
		fullWidth = parseInt(tree.settings.grid.columns[0].width,10) + parseInt(tree._gridSettings.treeWidthDiff,10);
		// need to use a selector in jquery 1.4.4+
		depth = tree.get_node(node).parents.length;
		width = fullWidth - depth*getIndent(node,tree);
		// the following line is no longer needed, since we are doing this inside a <td>
		//a.css({"vertical-align": "top", "overflow":"hidden"});
		return(fullWidth);
	},
	renderATitle = function(node,t,tree) {
		var a = node.hasClass("jstree-anchor") ? node : node.children("[class~='jstree-anchor']"), title, col = tree.settings.grid.columns[0];
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
	},
	getCellData = function (value,data) {
		var val;
		// get the contents of the cell - value could be a string or a function
		if (value !== undefined && value !== null) {
			if (typeof(value) === "function") {
				val = value(data);
			} else if (data.data !== null && data.data !== undefined && data.data[value] !== undefined) {
				val = data.data[value];
			} else {
				val = "";
			}
		} else {
			val = "";
		}
		return val;
	};

	$.jstree.defaults.grid = {
		width: 'auto'
	};

	$.jstree.plugins.grid = function(options,parent) {
		this._initialize = function () {
			if (!this._initialized) {
				var s = this.settings.grid || {}, styles,	container = this.element, i,
				gs = this._gridSettings = {
					columns : s.columns || [],
					treeClass : "jstree-grid-col-0",
					context: s.contextmenu || false,
					columnWidth : s.columnWidth,
					defaultConf : {"*display":"inline","*+display":"inline"},
					isThemeroller : !!this._data.themeroller,
					treeWidthDiff : 0,
					resizable : s.resizable,
					draggable : s.draggable,
					stateful: s.stateful,
					indent: 0,
					sortOrder: 'text',
					sortAsc: true,
					caseInsensitive: s.caseInsensitive,
					fixedHeader: s.fixedHeader !== false,
					width: s.width,
					height: s.height,
					gridcontextmenu : s.gridcontextmenu,
					treecol: 0,
          gridcols: []
				}, cols = gs.columns, treecol = 0, columnSearch = false;
				if(gs.gridcontextmenu === true) {
					gs.gridcontextmenu = function (grid,tree,node,val,col,t,target) {
						return {
							"edit": {
								label: "Edit",
								"action": function (data) {
									var obj = t.get_node(node);
									grid._edit(obj,col,target);
								}
							}
						}
					}
				} else if (gs.gridcontextmenu === false) {
					gs.gridcontextmenu = false;
				}
				// find which column our tree shuld go in
        for (var i = 0, len = s.columns.length;i<len;i++) {
					if (s.columns[i].tree) {
						// save which column it was
						treecol = i;
						gs.treecol = treecol;
					} else {
            gs.gridcols.push(i);
          }
				}
				// set a unique ID for this table
				this.uniq = Math.ceil(Math.random()*1000);
				this.rootid = container.attr("id");

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
						'.jstree-grid-separator {position:absolute; top:0; right:0; height:24px; margin-left: -2px; border-width: 0 2px 0 0; *display:inline; *+display:inline; margin-right:0px;width:0px;}',
						'.jstree-grid-header-cell {overflow: hidden; white-space: nowrap;padding: 1px 3px 2px 5px; cursor: default;}',
						'.jstree-grid-header-themeroller {border: 0; padding: 1px 3px;}',
            '.jstree-grid-header-regular {position:relative; background-color: #EBF3FD; z-index: 1;}',
            '.jstree-grid-hidden {display: none;}',
						'.jstree-grid-resizable-separator {cursor: col-resize; width: 2px;}',
						'.jstree-grid-separator-regular {border-color: #d0d0d0; border-style: solid;}',
						'.jstree-grid-cell-themeroller {border: none !important; background: transparent !important;}',
						'.jstree-grid-wrapper {table-layout: fixed; width: 100%; overflow: auto; position: relative;}',
						'.jstree-grid-midwrapper {display: table-row;}',
						'.jstree-grid-width-auto {width:auto;display:block;}',
						'.jstree-grid-column {display: table-cell; overflow: hidden;}',
						'.jstree-grid-ellipsis {text-overflow: ellipsis;}',
						'.jstree-grid-col-0 {width: 100%;}'
					];
					$('<style type="text/css">'+styles.join("\n")+'</style>').appendTo("head");
				}
				this.gridWrapper = $("<div></div>").addClass("jstree-grid-wrapper").insertAfter(container);
				this.midWrapper = $("<div></div>").addClass("jstree-grid-midwrapper").appendTo(this.gridWrapper);
				// set the wrapper width
				if (s.width) {
					this.gridWrapper.width(s.width);
				}
				if (s.height) {
					this.gridWrapper.height(s.height);
				}
				// create the data columns
        for (var i = 0, len = cols.length;i<len;i++) {
					// create the column
					$("<div></div>").addClass("jstree-default jstree-grid-column jstree-grid-column-"+i+" jstree-grid-column-root-"+this.rootid).appendTo(this.midWrapper);
				}
				this.midWrapper.children("div:eq("+treecol+")").append(container);
				container.addClass("jstree-grid-cell");

				//move header with scroll
				if (gs.fixedHeader) {
					this.gridWrapper.scroll(function() {
						$(this).find('.jstree-grid-header').css('top', $(this).scrollTop());
					});
				}

				// copy original sort function
				var defaultSort = $.proxy(this.settings.sort, this);

				// override sort function
				this.settings.sort = function (a, b) {
					var bigger, colrefs = this.colrefs;

					if (gs.sortOrder==='text') {
						var caseInsensitiveSort = this.get_text(a).toLowerCase().localeCompare(this.get_text(b).toLowerCase());
						bigger = gs.caseInsensitive ? (caseInsensitiveSort === 1) : (defaultSort(a, b) === 1);
					} else {
						// gs.sortOrder just refers to the unique random name for this column
						// we need to get the correct value
						var nodeA = this.get_node(a), nodeB = this.get_node(b),
						value = colrefs[gs.sortOrder].value,
						valueA = typeof(value) === 'function' ? value(nodeA) : nodeA.data[value],
						valueB = typeof(value) === 'function' ? value(nodeB) : nodeB.data[value];
						if(typeof(valueA) && typeof(valueB) !== 'undefined') {
						  bigger = gs.caseInsensitive ? valueA.toLowerCase() > valueB.toLowerCase(): valueA > valueB ;
						}
					}

					if (!gs.sortAsc)
						bigger = !bigger;

					return bigger ? 1 : -1;
				};

				// sortable columns when jQuery UI is available
				if (gs.draggable) {
					if (!$.ui || !$.ui.sortable) {
						console.warn('[jstree-grid] draggable option requires jQuery UI');
					} else {
						var from, to;

						$(this.midWrapper).sortable({
							axis: "x",
							handle: ".jstree-grid-header",
							cancel: ".jstree-grid-separator",
							start: function (event, ui) {
								from = ui.item.index();
							},
							stop: function (event, ui) {
								to = ui.item.index();
								gs.columns.splice(to, 0, gs.columns.splice(from, 1)[0]);
							}
						});
					}
				}

//public function. validate searchObject keys, set columnSearch flag, calls jstree search and reset columnSearch flag
				this.searchColumn = function (searchObj) {
					var validatedSearchObj = {};

					if(typeof searchObj == 'object') {
						for(var columnIndex in searchObj) {
							if(searchObj.hasOwnProperty(columnIndex)) {
								// keys should be the index of a column. This means the following:
								// only integers and smaller than the number of columns and bigger or equal to 0
								// (possilbe idea for in the future: ability to set key as a more human readable term like the column header and then map it here to an index)
								if (columnIndex % 1 === 0 && columnIndex < cols.length && columnIndex >= 0) {
									validatedSearchObj[columnIndex] = searchObj[columnIndex];
								}
							}
						}
					}
					columnSearch = validatedSearchObj;

					if(Object.keys(validatedSearchObj).length !== 0){
						//the search string doesn't matter. we'll use the search string in the columnSearch object!
						this.search('someValue');
					} else { // nothing to search so reset jstree's search by passing an empty string
						this.search('');
					}
					columnSearch = false;
				}


				// set default search for each column with no user defined search function (used when doing a columnSearch)
        for (var i = 0, len = cols.length; i<len; i++) {
					var column = cols[i];
					if (typeof(column.search_callback) !== "function") {
						// no search callback so set default function
						column.search_callback = function (str, columnValue, node, column) {
							var f = new $.vakata.search(str, true, { caseSensitive : searchSettings.case_sensitive, fuzzy : searchSettings.fuzzy });

							return f.search(columnValue).isMatch;

						};
					}
				}

				// if there was no overridden search_callback, we will provide it
				// it will use the default per-node search algorithm, augmented by searching our data nodes
				var searchSettings = this.settings.search;
				var omniSearchCallback = searchSettings.search_callback;

				if(!omniSearchCallback){
					omniSearchCallback = function (str,node) {
							var i, f = new $.vakata.search(str, true, { caseSensitive : searchSettings.case_sensitive, fuzzy : searchSettings.fuzzy }),
							matched = f.search(node.text).isMatch,
							col;

							// only bother looking in each cell if it was not yet matched
							if (!matched) {
                for (var i = 0, len = cols.length;i<len;i++) {
									if (treecol === i) {
										continue;
									}
									col = cols[i];
									matched = f.search(getCellData(col.value,node)).isMatch;
									if (matched) {
										break;
									}
								}
							}
							return matched;
					}
				}

				searchSettings.search_callback = function (str,node) {
					var matched = false;
					if(columnSearch){
						//using logical AND for column searches (more options in the future)
						for(var columnIndex in columnSearch) {
							if(columnSearch.hasOwnProperty(columnIndex)) {
								var searchValue = columnSearch[columnIndex];
								if(searchValue == ''){
									continue;
								}
								var col = cols[columnIndex];
								if(treecol == columnIndex){
									matched = col.search_callback(searchValue, node.text, node, col)
								} else {
									matched = col.search_callback(searchValue, getCellData(col.value,node), node, col)
								}

								if(!matched){
									break; //found one that didn't match
								}
							}
						}

						container.trigger("columnSearch_grid.jstree");
					} else {
						matched =  omniSearchCallback(str, node);
						container.trigger("omniSearch_grid.jstree");
					}
					return matched;
				};
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
        var target = this.get_node(data || "#", true);
        var id = _guid();
        this._detachColumns(id);
        this._prepare_grid(target);
        this._reattachColumns(id);
			}, this))
			.on("delete_node.jstree",$.proxy(function (e,data) {
				if (data.node.id !== undefined) {
					var grid = this.gridWrapper, removeNodes = [data.node.id], i;
					// add children to remove list
					if (data.node && data.node.children_d) {
						removeNodes = removeNodes.concat(data.node.children_d);
					}
					findDataCell(this.uniq,removeNodes,this._gridSettings.gridcols).remove();
				}
			}, this))
      .on("show_node.jstree", $.proxy(function (e, data) {
        this._hideOrShowTree(data.node, false);
      }, this))
      .on("hide_node.jstree", $.proxy(function (e, data) {
        this._hideOrShowTree(data.node, true);
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
				var anchorHeight = this.element.find("[class~='jstree-anchor']:first").outerHeight(), q,
				cls = this.element.attr("class") || "";
				$('<style type="text/css">div.jstree-grid-cell-root-'+this.rootid+' {line-height: '+anchorHeight+'px; height: '+anchorHeight+'px;}</style>').appendTo("head");

				// add container classes to the wrapper - EXCEPT those that are added by jstree, i.e. "jstree" and "jstree-*"
				q = cls.split(/\s+/).map(function(i){
				  var match = i.match(/^jstree(-|$)/);
				  return (match ? "" : i);
				});
				this.gridWrapper.addClass(q.join(" "));

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
					findDataCell(this.uniq,this._hover_node,this._gridSettings.gridcols).removeClass("jstree-hovered");
				}
				this._hover_node = id;
				findDataCell(this.uniq,id,this._gridSettings.gridcols).addClass("jstree-hovered");
			},this))
			.on("dehover_node.jstree",$.proxy(function(node,selected,event){
				var id = selected.node.id;
				this._hover_node = null;
				findDataCell(this.uniq,id,this._gridSettings.gridcols).removeClass("jstree-hovered");
			},this))
			.on("select_node.jstree",$.proxy(function(node,selected,event){
				var id = selected.node.id;
				findDataCell(this.uniq,id,this._gridSettings.gridcols).addClass("jstree-clicked");
				this.get_node(selected.node.id,true).children("div.jstree-grid-cell").addClass("jstree-clicked");
			},this))
			.on("deselect_node.jstree",$.proxy(function(node,selected,event){
				var id = selected.node.id;
				findDataCell(this.uniq,id,this._gridSettings.gridcols).removeClass("jstree-clicked");
			},this))
			.on("deselect_all.jstree",$.proxy(function(node,selected,event){
				// get all of the ids that were unselected
				var ids = selected.node || [], i;
				findDataCell(this.uniq,ids,this._gridSettings.gridcols).removeClass("jstree-clicked");
			},this))
			.on("search.jstree", $.proxy(function (e, data) {
				// search sometimes filters, so we need to hide all of the appropriate grid cells as well, and show only the matches
				var grid = this.gridWrapper, that = this, nodesToShow, startTime = new Date().getTime(),
        ids = getIds(data.nodes.filter(".jstree-node")), endTime;
				this.holdingCells = {};
        if (data.nodes.length) {
          var id = _guid();
					// save the cells we will hide
					var cells = grid.find('div.jstree-grid-cell-regular');
          this._detachColumns(id);
					if(this._data.search.som) {
						// create the list of nodes we want to look at
						if(this._data.search.smc) {
							nodesToShow = data.nodes.add(data.nodes.find('.jstree-node'));
						}
						nodesToShow = (nodesToShow || data.nodes).add(data.nodes.parentsUntil(".jstree"));

						// hide all of the grid cells
						cells.hide();
						// show only those that match
						nodesToShow.filter(".jstree-node").each(function (i,node) {
							var id = node.id;
							if (id) {
                that._prepare_grid(node);
                for (var i = 0, len = that._gridSettings.gridcols.length; i < len; i++) {
                  if (i === that._gridSettings.treecol) { continue; }
                  findDataCell(that.uniq, id, that._gridSettings.gridcols[i], $(that._domManipulation.columns[i])).show();
                }
							}
						});
					}

          for (var i = 0, len = this._gridSettings.gridcols.length; i < len; i++) {
            if (i === this._gridSettings.treecol) { continue; }
            findDataCell(that.uniq, ids, this._gridSettings.gridcols[i], $(this._domManipulation.columns[i])).addClass(SEARCHCLASS);
          }
          this._reattachColumns(id);
          endTime = new Date().getTime();
          this.element.trigger("search-complete.jstree-grid", [{time:endTime-startTime}]);
				}
				return true;
			}, this))
			.on("clear_search.jstree", $.proxy(function (e, data) {
				// search has been cleared, so we need to show all rows
				var grid = this.gridWrapper, ids = getIds(data.nodes.filter(".jstree-node"));
				grid.find('div.jstree-grid-cell').show();
				findDataCell(this.uniq,ids,this._gridSettings.gridcols).removeClass(SEARCHCLASS);
				return true;
			}, this))
			.on("copy_node.jstree", function (e, data) {
				var newtree = data.new_instance, oldtree = data.old_instance, obj = newtree.get_node(data.node,true);
        copyData(oldtree, data.original, newtree, data.node, true);
        newtree._detachColumns(obj.id);
        newtree._prepare_grid(obj);
        newtree._reattachColumns(obj.id);
				return true;
			})
			.on("show_ellipsis.jstree", $.proxy(function (e, data) {
				this.gridWrapper.find(".jstree-grid-cell").add(".jstree-grid-header", this.gridWrapper).addClass("jstree-grid-ellipsis");
				return true;
			}, this))
			.on("hide_ellipsis.jstree", $.proxy(function (e, data) {
				this.gridWrapper.find(".jstree-grid-cell").add(".jstree-grid-header", this.gridWrapper).removeClass("jstree-grid-ellipsis");
				return true;
			}, this))
			.on("enable_node.jstree", $.proxy(function (e, data) {
				var id = data.node.id;
				findDataCell(this.uniq,id,this._gridSettings.gridcols).removeClass("jstree-disabled");
				this.get_node(data.node.id,true).children("div.jstree-grid-cell").removeClass("jstree-disabled");
			}, this))
			.on("disable_node.jstree", $.proxy(function (e, data) {
				var id = data.node.id;
				findDataCell(this.uniq,id,this._gridSettings.gridcols).addClass("jstree-disabled");
				this.get_node(data.node.id,true).children("div.jstree-grid-cell").addClass("jstree-disabled");
			}, this))
			;
			if (this._gridSettings.isThemeroller) {
				this.element
					.on("select_node.jstree",$.proxy(function(e,data){
						data.rslt.obj.children("[class~='jstree-anchor']").nextAll("div").addClass("ui-state-active");
					},this))
					.on("deselect_node.jstree deselect_all.jstree",$.proxy(function(e,data){
						data.rslt.obj.children("[class~='jstree-anchor']").nextAll("div").removeClass("ui-state-active");
					},this))
					.on("hover_node.jstree",$.proxy(function(e,data){
						data.rslt.obj.children("[class~='jstree-anchor']").nextAll("div").addClass("ui-state-hover");
					},this))
					.on("dehover_node.jstree",$.proxy(function(e,data){
						data.rslt.obj.children("[class~='jstree-anchor']").nextAll("div").removeClass("ui-state-hover");
					},this));
			}

			if (this._gridSettings.stateful) {
				this.element
					.on("resize_column.jstree-grid",$.proxy(function(e,col,width){
						localStorage['jstree-root-'+this.rootid+'-column-'+col] = width;
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
			var grid = this.gridWrapper;
			if (target) {
				findDataCell(this.uniq,id,this._gridSettings.gridcols).remove();
			} else {
				// get all of the `div` children in all of the `td` in dataRow except for :first (that is the tree itself) and remove
				grid.find("div.jstree-grid-cell-regular").remove();
			}
		};
		// prepare the headers
		this._prepare_headers = function() {
			var header, i, col, _this = this, gs = this._gridSettings,cols = gs.columns || [], width, defaultWidth = gs.columnWidth, resizable = gs.resizable || false,
			cl, ccl, val, name, last, tr = gs.isThemeroller, classAdd = (tr?"themeroller":"regular"), puller,
			hasHeaders = false, gridparent = this.gridparent, rootid = this.rootid,
			conf = gs.defaultConf, coluuid,
			borPadWidth = 0, totalWidth = 0;

			// save the original parent so we can reparent on destroy
			this.parent = gridparent;

			// save the references to columns by unique ID
			this.colrefs = {};


			// create the headers
      for (var i = 0, len = cols.length;i<len;i++) {
				//col = $("<col/>");
				//col.appendTo(colgroup);
				cl = cols[i].headerClass || "";
				ccl = cols[i].columnClass || "";
				val = cols[i].header || "";
				do {
					coluuid = String(Math.floor(Math.random()*10000));
				} while(this.colrefs[coluuid] !== undefined);
				// create a unique name for this column
				name = cols[i].value ? coluuid : "text";
				this.colrefs[name] = cols[i];

				if (val) {hasHeaders = true;}
				if(gs.stateful && localStorage['jstree-root-'+rootid+'-column-'+i])
					width = localStorage['jstree-root-'+rootid+'-column-'+i];
				else
					width = cols[i].width || defaultWidth;

				var minWidth = cols[i].minWidth || width;
				var maxWidth = cols[i].maxWidth || width;

				// we only deal with borders if width is not auto and not percentages
				borPadWidth = tr ? 1+6 : 2+8; // account for the borders and padding
				if (width !== 'auto' && typeof(width) !== "string") {
					width -= borPadWidth;
				}
				col = this.midWrapper.children("div.jstree-grid-column-"+i);
				last = $("<div></div>").css(conf).addClass("jstree-grid-div-"+this.uniq+"-"+i+" "+(tr?"ui-widget-header ":"")+" jstree-grid-header jstree-grid-header-cell jstree-grid-header-"+classAdd+" "+cl+" "+ccl).html(val);
				last.addClass((tr?"ui-widget-header ":"")+"jstree-grid-header jstree-grid-header-"+classAdd);
				if (this.settings.core.themes.ellipsis === true){
				  last.addClass('jstree-grid-ellipsis');
				}
				last.prependTo(col);
				last.attr(COL_DATA_ATTR, name);
				totalWidth += last.outerWidth();
				puller = $("<div class='jstree-grid-separator jstree-grid-separator-"+classAdd+(tr ? " ui-widget-header" : "")+(resizable? " jstree-grid-resizable-separator":"")+"'>&nbsp;</div>").appendTo(last);
				col.width(width);
				col.css("min-width", minWidth);
				col.css("max-width", maxWidth);
			}

			last.addClass((tr?"ui-widget-header ":"")+"jstree-grid-header jstree-grid-header-last jstree-grid-header-"+classAdd);
			// if there is no width given for the last column, do it via automatic
			if (cols[cols.length-1].width === undefined) {
				totalWidth -= width;
				col.css({width:"auto"});
				last.addClass("jstree-grid-width-auto").next(".jstree-grid-separator").remove();
			}
			if (hasHeaders) {
				// save the offset of the div from the body
				//gs.divOffset = header.parent().offset().left;
				gs.header = header;
			} else {
				$("div.jstree-grid-header").hide();
			}

			if (!this.bound && resizable) {
				this.bound = true;
				$(document).mouseup(function () {
					var ref, cols, width, headers, currentTree, colNum;
					if (isClickedSep) {
						colNum = toResize.prevAll(".jstree-grid-column").length;
						currentTree = toResize.closest(".jstree-grid-wrapper").find(".jstree");
						ref = $.jstree.reference(currentTree);
						cols = ref.settings.grid.columns;
						headers = toResize.parent().children("div.jstree-grid-column");
						if (isNaN(colNum) || colNum < 0) { ref._gridSettings.treeWidthDiff = currentTree.find("ins:eq(0)").width() + currentTree.find("[class~='jstree-anchor']:eq(0)").width() - ref._gridSettings.columns[0].width; }
						width = ref._gridSettings.columns[colNum].width = parseFloat(toResize.css("width"));
						isClickedSep = false;
						toResize = null;

						currentTree.trigger("resize_column.jstree-grid", [colNum,width]);
					}
				}).mousemove(function (e) {
						if (isClickedSep) {
							newMouseX = e.pageX;
							var diff = newMouseX - oldMouseX,
							oldPrevHeaderInner,
							oldPrevColWidth, newPrevColWidth;

							if (diff !== 0){
								oldPrevHeaderInner = toResize.width();
								oldPrevColWidth = parseFloat(toResize.css("width"));

								// handle a Chrome issue with columns set to auto
								// thanks to Brabus https://github.com/side-by-side
								if (!oldPrevColWidth) {oldPrevColWidth = toResize.innerWidth();}

								// make sure that diff cannot be beyond the left/right limits
								diff = diff < 0 ? Math.max(diff,-oldPrevHeaderInner) : diff;
								newPrevColWidth = oldPrevColWidth+diff;

								// only do this if we are not shrinking past 0 on left - and limit it to that amount
								if ((diff > 0 || oldPrevHeaderInner > 0) && newPrevColWidth > MINCOLWIDTH) {
									toResize.width(newPrevColWidth+"px");
									toResize.css("min-width",newPrevColWidth+"px");
									toResize.css("max-width",newPrevColWidth+"px");
									oldMouseX = newMouseX;
								}
							}
						}
					});
				this.gridWrapper.on("selectstart", ".jstree-grid-resizable-separator", function () {
					return false;
				}).on("mousedown", ".jstree-grid-resizable-separator", function (e) {
					isClickedSep = true;
					oldMouseX = e.pageX;
					toResize = $(this).closest("div.jstree-grid-column");
					// the max rightmost position we will allow is the right-most of the wrapper minus a buffer (10)
					return false;
				})
				.on("dblclick", ".jstree-grid-resizable-separator", function (e) {
					var clickedSep = $(this), col = clickedSep.closest("div.jstree-grid-column"),
					oldPrevColWidth = parseFloat(col.css("width")), newWidth = 0, diff,
					colNum = col.prevAll(".jstree-grid-column").length,
					oldPrevHeaderInner = col.width(), newPrevColWidth;


					//find largest width
					col.find(".jstree-grid-cell").each(function() {
						var item = $(this), width;
						item.css("position", "absolute");
						item.css("width", "auto");
						width = item.outerWidth();
						item.css("position", "relative");

						if (width>newWidth) {
							newWidth = width;
						}
					});

					diff = newWidth-oldPrevColWidth;

					// make sure that diff cannot be beyond the left limits
					diff = diff < 0 ? Math.max(diff,-oldPrevHeaderInner) : diff;
					newPrevColWidth = (oldPrevColWidth+diff)+"px";

					col.width(newPrevColWidth);
					col.css("min-width",newPrevColWidth);
					col.css("max-width",newPrevColWidth);

					$(this).closest(".jstree-grid-wrapper").find(".jstree").trigger("resize_column.jstree-grid",[colNum,newPrevColWidth]);
				})
				.on("click", ".jstree-grid-separator", function (e) {
					// don't sort after resize
					e.stopPropagation();
				});
			}
			this.gridWrapper.on("click", ".jstree-grid-header-cell", function (e) {
				if (!_this.sort) {
					return;
				}

				// get column
				var name = $(this).attr(COL_DATA_ATTR);

				// sort order
				var symbol;
				if (gs.sortOrder === name && gs.sortAsc === true) {
					gs.sortAsc = false;
					symbol = "&darr;";
				} else {
					gs.sortOrder = name;
					gs.sortAsc = true;
					symbol = "&uarr;";
				}

				// add sort arrow
				$(this.closest('.jstree-grid-wrapper')).find(".jstree-grid-sort-icon").remove();
				$("<span></span>").addClass("jstree-grid-sort-icon").appendTo($(this)).html(symbol);

				// sort by column
				var rootNode = _this.get_node('#');
				_this.sort(rootNode, true);
				_this.redraw_node(rootNode, true);
			});

    };

    this._domManipulation = null; // We'll store the column nodes in this object and an id for the grid-node that started the manipulation { id: "id of the node that started the manipulation", columns: { Key-Value-Pair col-No: Column }}

    function _guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }
    /*
     * Trys to detach the tree columns on massive dom manipulations
     */
    this._detachColumns = function (id) {
      // if the columns are not detached, then detach them
      if (this._domManipulation == null) {
        var cols = this._gridSettings.columns || [], treecol = this._gridSettings.treecol, mw = this.midWrapper;
        this._domManipulation = { id: id, columns: {} };
        for (var i = 0, len = cols.length; i < len; i++) {
          //if (treecol === i) {
          //  continue;
          //}
          this._domManipulation.columns[i] = mw.children(".jstree-grid-column-" + i)[0];
          this._domManipulation.columns[i].parentNode.removeChild(this._domManipulation.columns[i]);
        }
      }
      return this._domManipulation;
    }

    this._reattachColumns = function (id) {
      if (this._domManipulation == null) { return false; }
      if (this._domManipulation.id === id) {
        var cols = this._gridSettings.columns || [], treecol = this._gridSettings.treecol, mw = this.midWrapper;
        for (var i = 0, len = cols.length; i < len; i++) {
          //if (treecol === i) {
          //  continue;
          //}
          mw[0].appendChild(this._domManipulation.columns[i]);
        }
        this._domManipulation = null;
      }
      return true;
    }

    /*
		 * Override open_node to detach the columns before redrawing child-nodes, and do reattach them afterwarts
		 */
    this.open_node = function (obj, callback, animation) {
      var isArray = $.isArray(obj);
      var node = null;
      if (!isArray) {
        node = this.get_node(obj);
        if (node.id === "#") { return; } // wtf??? we ar in the root and do not need a open!
      }
      var id = isArray ? _guid() : node.id;
      this._detachColumns(id);
      var ret = parent.open_node.call(this, obj, callback, animation);
      this._reattachColumns(id);
      return ret;
    }

		/*
		 * Override redraw_node to correctly insert the grid
		 */
    this.redraw_node = function (obj, deep, is_callback, force_render) {
      var id = $.isArray(obj) ? _guid() : this.get_node(obj).id;
      // we detach the columns once
      this._detachColumns(id);
			// first allow the parent to redraw the node
			obj = parent.redraw_node.call(this, obj, deep, is_callback, force_render);
			// next prepare the grid for a redrawn node - but only if ths node is not hidden (search does that)
      if (obj) {
        this._prepare_grid(obj);
      }
      // don't forget to reattach
      this._reattachColumns(id);
			return obj;
		};
		this.refresh = function () {
			this._clean_grid();
			return parent.refresh.apply(this,arguments);
		};
		/*
		 * Override set_id to update cell attributes
		 */
		this.set_id = function (obj, id) {
			var old, uniq = this.uniq;
			if(obj) {
				old = obj.id;
			}
			var result = parent.set_id.apply(this,arguments);
			if(result) {
				if (old !== undefined) {
					var grid = this.gridWrapper, oldNodes = [old], i;
					// get children
					if (obj && obj.children_d) {
						oldNodes = oldNodes.concat(obj.children_d);
					}
					// update id in children
					findDataCell(uniq,oldNodes,this._gridSettings.gridcols)
						.attr(NODE_DATA_ATTR, obj.id)
						.removeClass(generateCellId(uniq,old))
						.addClass(generateCellId(uniq,obj.id))
						.each(function(i,node) {
							$(node).attr('id', generateCellId(uniq,obj.id)+(i+1));
						});
				}
			}
			return result;
    };

    this._hideOrShowTree = function(node, hide) {
      //Hides or shows a tree
      this._detachColumns(node.id);
      // show cells in each detachted column
      this._hideOrShowNode(node, hide, this._gridSettings.columns || [], this._gridSettings.treecol);
      this._reattachColumns(node.id);
    }
    this._hideOrShowNode = function(node, hide, cols, treecol) {
      //Hides or shows a node with recursive calls to all open child-nodes
      for (var i = 0, len = cols.length; i < len; i++) {
        if (i === treecol) { continue; }
        var cells = findDataCell(this.uniq, node.id, i, $(this._domManipulation.columns[i]));
        if (hide) {
          cells.addClass("jstree-grid-hidden");
        } else {
          cells.removeClass("jstree-grid-hidden");
        }
      }
      if (node.state.opened && node.children) {
        for (var i = 0, len = node.children.length; i < len; i++) {
          this._hideOrShowNode(this.get_node(node.children[i]), hide, cols, treecol);
        }
      }
    }
    this._hide_grid = function (node) {
      if (!node) { return true; }
      this._detachColumns(node.id);
      var children = node.children ? node.children : [], cols = this._gridSettings.columns || [], treecol = this._gridSettings.treecol;
      // try to remove all children
      for (var i = 0, len = children.length; i < len; i++) {
        var child = this.get_node(children[i]);
        // go through each column, remove all children with the correct ID name
        for (var j = 0, lenj = cols.length; j < lenj; j++) {
          if (j === treecol) { continue; }
          findDataCell(this.uniq, child.id, j, $(this._domManipulation.columns[j])).remove();
        }
        if (child.state.opened) { this._hide_grid(child);}
      }


      this._reattachColumns(node.id);
		};
		this.holdingCells = {};
    this.getHoldingCells = function (obj, col, hc) {
      if (obj.state.hidden || !obj.state.opened) { return $(); }
      var ret = $(), children = obj.children || [], child, i, uniq = this.uniq;
      // run through each child, render it, and then render its children recursively
      for (i = 0; i < children.length; i++) {
        child = generateCellId(uniq, children[i]) + col;
        if (hc[child]) {
          ret = ret.add(hc[child]).add(this.getHoldingCells(this.get_node(children[i]), col, hc));
          //delete hc[child];
        }
      }
      return (ret);
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
			if (!obj.data) {obj.data = {};}
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
                this.element.trigger('update_cell.jstree-grid', { node: obj, col: col.value, value: v, old: t });
                var id = _guid();
                this._detachColumns(id);
                this._prepare_grid(this.get_node(obj, true));
                this._reattachColumns(id);
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

		this.grid_hide_column = function (col) {
			this.midWrapper.find(".jstree-grid-column-"+col).hide();
		};
		this.grid_show_column = function (col) {
			this.midWrapper.find(".jstree-grid-column-"+col).show();
		};

		this._prepare_grid = function (obj) {
			var gs = this._gridSettings, c = gs.treeClass, _this = this, t,
			cols = gs.columns || [], width, tr = gs.isThemeroller, uniq = this.uniq,
			treecol = gs.treecol,
			tree = this.element, rootid = this.rootid,
			classAdd = (tr?"themeroller":"regular"), img, objData = this.get_node(obj),
			defaultWidth = gs.columnWidth, conf = gs.defaultConf, cellClickHandler = function (tree,node,val,col,t) {
				return function(e) {
					//node = tree.find("#"+node.attr("id"));
					var event = jQuery.Event("select_cell.jstree-grid");
 					tree.trigger(event, [{value: val,column: col.header,node: node,grid:$(this),sourceName: col.value}]);
 					if (!event.isDefaultPrevented()) {
 						node.children(".jstree-anchor").trigger("click.jstree",e);
 					}
				};
			}, cellRightClickHandler = function (tree,node,val,col,t) {
				return function (e) {
					if (gs.gridcontextmenu) {
						e.preventDefault();
						$.vakata.context.show(this,{ 'x' : e.pageX, 'y' : e.pageY }, gs.gridcontextmenu(_this,tree,node,val,col,t,e.target));
					}
				};
			},
			hoverInHandler = function (node, jsTreeInstance) {
				return function() { jsTreeInstance.hover_node(node); };
			},
			hoverOutHandler = function (node, jsTreeInstance) {
				return function() { jsTreeInstance.dehover_node(node); };
			},
			i, val, cl, wcl, ccl, a, last, valClass, wideValClass, span, paddingleft, title, gridCellName, gridCellParentId, gridCellParent,
			gridCellPrev, gridCellPrevId, gridCellNext, gridCellNextId, gridCellChild, gridCellChildId,
			col, content, tmpWidth, mw = this.midWrapper, column, lid = objData.id,
			highlightSearch, isClicked,
			peers = this.get_node(objData.parent).children,
			// find my position in the list of peers. "peers" is the list of everyone at my level under my parent, in order
			pos = $.inArray(lid,peers),
			hc = this.holdingCells, rendered = false, closed;
			// get our column definition
			t = $(obj);

			// find the a children
			a = t.children("[class~='jstree-anchor']");
			highlightSearch = a.hasClass(SEARCHCLASS);
			isClicked = a.hasClass("jstree-clicked");

			if (a.length === 1) {
				closed = !objData.state.opened;
				gridCellName = generateCellId(uniq,lid);
				gridCellParentId = objData.parent === "#" ? null : objData.parent;
				a.addClass(c);
				//renderAWidth(a,_this);
				renderATitle(a,t,_this);
        last = a;

        // calculate position ids once
        gridCellPrevId = pos <= 0 ? objData.parent : findLastClosedNode(this, peers[pos - 1]);
        gridCellNextId = pos >= peers.length - 1 ? "NULL" : peers[pos + 1];
        gridCellChildId = objData.children && objData.children.length > 0 ? objData.children[0] : "NULL";

				// find which column our tree shuld go in
				var s = this.settings.grid;
        for (var i = 0, len = cols.length;i<len;i++) {
					if (treecol === i) {
						continue;
					}
					col = cols[i];
          column = this._domManipulation == null ? mw.children("div:eq(" + i + ")") : $(this._domManipulation.columns[i]); //Geht the detached column not mw.children("div:eq("+i+")");
					// get the cellClass, the wideCellClass, and the columnClass
					cl = col.cellClass || "";
					wcl = col.wideCellClass || "";
					ccl = col.columnClass || "";

					// add a column class to the Column
          column.addClass(ccl);


					// get the contents of the cell - value could be a string or a function
					val = getCellData(col.value,objData);

					if (typeof(col.format) === "function") {
						val = col.format(val);
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
					if (width !== 'auto') {
						width = tmpWidth || (width - paddingleft);
					}

          last = findDataCell(uniq, lid, i, column);
					if (!last || last.length < 1) {
						last = $("<div></div>");
						$("<span></span>").appendTo(last);
						last.attr("id",gridCellName+i);
						last.addClass(gridCellName);
						last.attr(NODE_DATA_ATTR,lid);
						if (highlightSearch) {
							last.addClass(SEARCHCLASS);
						} else {
							last.removeClass(SEARCHCLASS);
						}
						if (isClicked) {
							last.addClass("jstree-clicked");
						} else {
							last.removeClass("jstree-clicked");
						}
						if (this.settings.core.themes.ellipsis === true && i !== treecol) {
							last.addClass('jstree-grid-ellipsis');
						}

          }

          // we need to check the hidden-state and see if we need to hide the node
          if (objData.state.hidden) {
            last.addClass("jstree-grid-hidden");
          } else {
            last.removeClass("jstree-grid-hidden");
          }

					// ditto for the disabled-state and disabling the node
					if (objData.state.disabled) {
						last.addClass('jstree-disabled');
					} else {
						last.removeClass('jstree-disabled');
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
          gridCellPrev = findDataCell(uniq, gridCellPrevId, i, column);
          gridCellNext = findDataCell(uniq, gridCellNextId, i, column);
          gridCellChild = findDataCell(uniq, gridCellChildId, i, column);
          gridCellParent = findDataCell(uniq, gridCellParentId, i, column);


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
							rendered = false;
						}
						// always put it in the holding cells, and then sort when the parent comes in, in case parent is (re)drawn later
						hc[gridCellName+i] = last;
					} else {
						if (gridCellPrev && gridCellPrev.length > 0) {
							last.insertAfter(gridCellPrev);
						} else if (gridCellChild && gridCellChild.length > 0) {
							last.insertBefore(gridCellChild);
						} else if (gridCellNext && gridCellNext.length > 0) {
							last.insertBefore(gridCellNext);
						} else {
							last.appendTo(column);
						}
						rendered = true;
					}
					// do we have any children waiting for this cell? walk down through the children/grandchildren/etc tree
					if (rendered) {
						var toRen = this.getHoldingCells(objData,i,hc);
						last.after(toRen);
					}
					// need to make the height of this match the line height of the tree. How?
					span = last.children("span");

					// create a span inside the div, so we can control what happens in the whole div versus inside just the text/background
					span.addClass(cl+" "+valClass).html(content);
					last = last.css(conf).addClass("jstree-grid-cell jstree-grid-cell-regular jstree-grid-cell-root-"+rootid+" jstree-grid-cell-"+classAdd+" "+wcl+ " " + wideValClass + (tr?" ui-state-default":"")).addClass("jstree-grid-col-"+i).addClass("jstree-animated");
					// add click handler for clicking inside a grid cell
					last.click(cellClickHandler(tree,t,val,col,this));
					last.on("contextmenu",cellRightClickHandler(tree,t,val,col,this));
					last.hover(hoverInHandler(t, this), hoverOutHandler(t, this));

					if (title) {
						span.attr("title",title);
					}

					tree.trigger("render_cell.jstree-grid", [{value: val, column: col.header, node: t, sourceName: col.value}]);
				}
				last.addClass("jstree-grid-cell-last"+(tr?" ui-state-default":""));
				// if there is no width given for the last column, do it via automatic
				if (cols[cols.length-1].width === undefined) {
					last.addClass("jstree-grid-width-auto").next(".jstree-grid-separator").remove();
				}
			}
			this.element.css({'overflow-y':'auto !important'});
		};
		// clean up holding cells
		this.holdingCells = {};

		// need to do alternating background colors or borders
	};
}));

