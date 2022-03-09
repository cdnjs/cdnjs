/*jshint eqeqeq:false */
/*global jQuery, define */
(function( factory ) {
	"use strict";
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"./grid.base"
		], factory );
	} else {
		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
"use strict";
//module begin
$.extend($.jgrid,{
	focusableElementsList : [
		'>a[href]',
		'>button:not([disabled])',
		'>area[href]',
		'>input:not([disabled])',
		'>select:not([disabled])',
		'>textarea:not([disabled])',
		'>iframe',
		'>object',
		'>embed',
		'>*[tabindex]',
		'>*[contenteditable]'
	]
});
$.jgrid.extend({
	ariaBodyGrid : function ( p ) {
		var o = $.extend({
			onEnterCell : null,
			onKeyCheck : null
		}, p || {});

		return this.each(function (){
			var $t = this,
			getstyle = $.jgrid.getMethod("getStyleUI"),
			highlight = getstyle($t.p.styleUI+'.common','highlight', true);

			// basic functions
			function isValidCell(row, col) {
				return (
					!isNaN(row) &&
					!isNaN(col) &&
					row >= 0 &&
					col >= 0 &&
					$t.rows.length &&
					row < $t.rows.length &&
					col < $t.p.colModel.length
				);
			};
			function getNextCell( dirX, dirY) {
				var row = $t.p.iRow + dirY; // set the default one when initialize grid
				var col = $t.p.iCol + dirX; // set the default .................
				var rowCount = $t.rows.length;
				var isLeftRight = dirX !== 0;

				if (!rowCount) {
					return false;
				}
				var colCount = $t.p.colModel.length;
				if (isLeftRight) {
					if (col < 0 && row >= 2) {
						col = colCount - 1;
						row--;
					}
					if (col >= colCount) {
						col = 0;
						row++;
					}
				}
				if (!isLeftRight) {
					if (row < 1) {
						col--;
						row = rowCount - 1;
						if ($t.rows[row] && col >= 0 && !$t.rows[row].cells[col]) {
						// Sometimes the bottom row is not completely filled in. In this case,
						// jump to the next filled in cell.
							row--;
						}
					}
					else if (row >= rowCount || !$t.rows[row].cells[col]) {
						row = 1;
						col++;
					}
				}
				if (isValidCell(row, col)) {
					return {
						row: row,
						col: col
					};
				} else if (isValidCell($t.p.iRow, $t.p.iCol)) {
					return {
						row: $t.p.iRow,
						col: $t.p.iCol
					};
				} else {
					return false;
				}
			}
			function getNextVisibleCell(dirX, dirY) {
				var nextCell = getNextCell( dirX, dirY);
				if (!nextCell) {
					return false;
				}

				while ( $($t.rows[nextCell.row].cells[nextCell.col]).is(":hidden") ) {
					$t.p.iRow = nextCell.row;
					$t.p.iCol = nextCell.col;
					nextCell = getNextCell(dirX, dirY);
					if ($t.p.iRow  === nextCell.row && $t.p.iCol  === nextCell.col) {
						// There are no more cells to try if getNextCell returns the current cell
						return false;
					}
				}
				if( dirY !== 0 ) {
					$($t).jqGrid('setSelection', $t.rows[nextCell.row].id, false, null, false);
				}

				return nextCell;
			}
			function movePage ( dir ) {
				var curpage = $t.p.page, last =$t.p.lastpage;
				curpage = curpage + dir;
				if( curpage <= 0) {
					curpage = 1;
				}
				if( curpage > last ) {
					curpage = last;
				}
				if(  $t.p.page === curpage ) {
					return;
				}
				$t.p.page = curpage;
				$t.grid.populate();
			}
			var focusableElementsSelector = $.jgrid.focusableElementsList.join();
			function hasFocusableChild( el) {
				return $(focusableElementsSelector, el)[0];
			}
			$($t).removeAttr("tabindex");
			$($t).on('jqGridAfterGridComplete.setAriaGrid', function( e ) {
				//var grid = e.target;
				$("tbody", $t).first().find(">tr:not(.jqgfirstrow)>td:not(:hidden, :has("+focusableElementsSelector+"))").attr("tabindex", -1);
				$("tbody", $t).first().find(">tr:not(.jqgfirstrow)").removeAttr("tabindex");
				if($t.p.iRow !== undefined && $t.p.iCol !== undefined) {
					if($t.rows[$t.p.iRow]) {
					$($t.rows[$t.p.iRow].cells[$t.p.iCol])
						.attr('tabindex', 0)
						.focus( function() { $(this).addClass(highlight);})
						.blur( function () { $(this).removeClass(highlight);});
					}
				}
			});
			$t.p.iRow = 1;
			$t.p.iCol = $.jgrid.getFirstVisibleCol( $t );

			var focusRow=0, focusCol=0; // set the dafualt one
			var custAct = $.jgrid.isFunction( o.customCellAction ) ? o.customCellAction : false;
			var onKeyCheck = $.jgrid.isFunction(o.onKeyCheck) ? o.onKeyCheck : false;
			$($t).on('keydown', function(e) {
				if($t.p.navigationDisabled && $t.p.navigationDisabled === true) {
					return;
				}
				if(e.target.id.startsWith("jqs_"+$t.p.id)) {
					return;
				}
				if(onKeyCheck) {
					if(!onKeyCheck.call($t,e.target) ) {
						return;
					}
				}
				var key = e.which || e.keyCode, nextCell;
				switch(key) {
					case (38) : // DOWN
						nextCell = getNextVisibleCell(0, -1);
						focusRow = nextCell.row;
						focusCol = nextCell.col;
						e.preventDefault();
						break;
					case (40) : // UP
						nextCell = getNextVisibleCell(0, 1);
						focusRow = nextCell.row;
						focusCol = nextCell.col;
						e.preventDefault();
						break;
					case (37) : // LEFT
						nextCell = getNextVisibleCell(-1, 0);
						focusRow = nextCell.row;
						focusCol = nextCell.col;
						e.preventDefault();
						break;
					case (39) : // RIGHT
						nextCell = getNextVisibleCell(1, 0);
						focusRow = nextCell.row;
						focusCol = nextCell.col;
						e.preventDefault();
						break;
					case 36 : // HOME
						if(e.ctrlKey) {
							focusRow = 1;
						} else {
							focusRow = $t.p.iRow;
						}
						focusCol = 0;
						e.preventDefault();
						break;
					case 35 : // END
						if(e.ctrlKey) {
							focusRow = $t.rows.length - 1;
						} else {
							focusRow = $t.p.iRow;
						}
						focusCol = $t.p.colModel.length - 1;
						e.preventDefault();
						break;
					case 33 : // PAGEUP

						movePage( -1 );
						focusCol = $t.p.iCol;
						focusRow = $t.p.iRow;
						e.preventDefault();
						break;
					case 34 : // PAGEDOWN
						movePage( 1 );
						focusCol = $t.p.iCol;
						focusRow = $t.p.iRow;
						if(focusRow > $t.rows.length-1) {
							focusRow = $t.rows.length-1;
							$t.p.iRow = $t.rows.length-1;
						}
						e.preventDefault();
						break;
					case 13 : // Enter
						if( $.jgrid.isFunction( o.onEnterCell )) {
							o.onEnterCell.call( $t, $t.rows[$t.p.iRow].id ,$t.p.iRow, $t.p.iCol, e);
							e.preventDefault();
						}
						return;
					case 113 : // F2
						try{
							$($t).jqGrid('editCell', $t.p.iRow, $t.p.iCol, true, e);
						} catch(e){}
					default:
						if( custAct ) {
							custAct.call($t, $t.rows[$t.p.iRow].id ,$t.p.iRow, $t.p.iCol, e);
						}
						return;
				}
				$($t).jqGrid("focusBodyCell", focusRow, focusCol, getstyle, highlight);
			});
			$($t).on('jqGridBeforeSelectRow.ariaGridClick',function() {
				return false;
			});
			$($t).on('jqGridCellSelect.ariaGridClick', function(el1, id, status,tdhtml, e) {
				var el = e.target;
				if($t.p.iRow > 0 && $t.p.iCol >=0) {
					$($t.rows[$t.p.iRow].cells[$t.p.iCol]).attr("tabindex", -1);
				}
				if($(el).is("td") || $(el).is("th") || el.id.startsWith("jqs_"+$t.p.id)) {
					$t.p.iCol = el.cellIndex;
				} else {
					return;
				}
				var row = $(el).closest("tr.jqgrow");
				$t.p.iRow = row[0].rowIndex;
				$(el).attr("tabindex", 0)
					.addClass(highlight)
					.focus()
					.blur(function(){$(this).removeClass(highlight);});
			});
			$t.p.ariaBody = true;
		});
	},
	excelLikeGrid : function ( p ) {
		var o = $.extend({
			beforeDeleteCell : null,
			customCellAction : null,
			customUndoFunction : null,
			specialChars : [
				'~', '!','@', '#', '$','%','^','&','*','(',')','_', '+','{','}', ':', '"', '|','<','>','?',',','.','/',';','\\','[',']' 
			],
			addonChars : false, // ^[а-я]$/i
			onKeyCheck : null
		}, p || {});

		return this.each(function (){
			var $t = this,
			getstyle = $.jgrid.getMethod("getStyleUI"),
			highlight = getstyle($t.p.styleUI+'.common','highlight', true);
			$t.p.F2key = false;
			// basic functions
			function isValidCell(row, col) {
				return (
					!isNaN(row) &&
					!isNaN(col) &&
					row >= 0 &&
					col >= 0 &&
					$t.rows.length &&
					row < $t.rows.length &&
					col < $t.p.colModel.length
				);
			};
			function getNextCell( dirX, dirY) {
				var row = $t.p.iRow + dirY; // set the default one when initialize grid
				var col = $t.p.iCol + dirX; // set the default .................
				var rowCount = $t.rows.length;
				var isLeftRight = dirX !== 0;
				var collimit = 	$t.p.frozenColumns ? $t.p.frozenColCount + 1 : 0;
				if (!rowCount) {
					return false;
				}

				var colCount = $t.p.colModel.length;
				if (isLeftRight) {
					if (col < collimit ) {
						col = collimit;//colCount - 1;
						//row--;
					}
					if (col === colCount) {
						col = colCount;
						//row++;
					}
				}
				if (!isLeftRight) {
					//if (row < 1) {
						//col--;
						//row = rowCount - 1;
						if ($t.rows[row] && col >= 0 && !$t.rows[row].cells[col]) {
						// Sometimes the bottom row is not completely filled in. In this case,
						// jump to the next filled in cell.
							row--;
						}
					//}
					//else if (row >= rowCount || !$t.rows[row].cells[col]) {
						//row = 1;
						//col++;
					//}
					//console.log(row, col);
				}
				if (isValidCell(row, col)) {
					return {
						row: row,
						col: col
					};
				} else if (isValidCell($t.p.iRow, $t.p.iCol)) {
					return {
						row: $t.p.iRow,
						col: $t.p.iCol
					};
				} else {
					return false;
				}
			}
			function getNextVisibleCell(dirX, dirY) {
				var nextCell = getNextCell( dirX, dirY);
				if (!nextCell) {
					return false;
				}

				while ( $($t.rows[nextCell.row].cells[nextCell.col]).is(":hidden") ) {
					$t.p.iRow = nextCell.row;
					$t.p.iCol = nextCell.col;
					nextCell = getNextCell(dirX, dirY);
					if ($t.p.iRow  === nextCell.row && $t.p.iCol  === nextCell.col) {
						// There are no more cells to try if getNextCell returns the current cell
						return false;
					}
				}
				if( dirY !== 0 ) {
					$($t).jqGrid('setSelection', $t.rows[nextCell.row].id, false, null, false);
				}

				return nextCell;
			}
			function movePage ( dir ) {
				var curpage = $t.p.page, last =$t.p.lastpage;
				curpage = curpage + dir;
				if( curpage <= 0) {
					curpage = 1;
				}
				if( curpage > last ) {
					curpage = last;
				}
				if(  $t.p.page === curpage ) {
					return;
				}
				$t.p.page = curpage;
				$t.grid.populate();
			}
			var focusableElementsSelector = $.jgrid.focusableElementsList.join();
			function hasFocusableChild( el) {
				return $(focusableElementsSelector, el)[0];
			}
			$($t).removeAttr("tabindex");
			$($t).on('jqGridAfterGridComplete.setAriaGrid', function( e ) {
				//var grid = e.target;
				$("tbody", $t).first().find(">tr:not(.jqgfirstrow)>td:not(:hidden, :has("+focusableElementsSelector+"))").attr("tabindex", -1);
				$("tbody", $t).first().find(">tr:not(.jqgfirstrow)").removeAttr("tabindex");
				if($t.p.iRow !== undefined && $t.p.iCol !== undefined) {
					if($t.rows[$t.p.iRow]) {
					$($t.rows[$t.p.iRow].cells[$t.p.iCol])
						.attr('tabindex', 0)
						.focus( function() { $(this).addClass(highlight);})
						.blur( function () { $(this).removeClass(highlight);});
					}
				}
			});
			$t.p.iRow = 1;
			$t.p.iCol = $.jgrid.getFirstVisibleCol( $t );
			$t.p.ariaBody = true;

			var focusRow=0, focusCol=0; // set the dafualt one
			var custAct = $.jgrid.isFunction( o.customCellAction ) ? o.customCellAction : false;
			var delCell = $.jgrid.isFunction( o.beforeDeleteCell ) ? o.beforeDeleteCell : false;
			var aKeys = new Set(o.specialChars);

			//var lastVisibleCol = $.jgrid.getLastVisibleCol( $t );
			//var firstVisibleCol = $.jgrid.getFirstVisibleCol( $t );

			var paste_to_cell = false;
			$t.addEventListener('paste', function (event) {
				if(paste_to_cell) {
					var paste = (event.clipboardData || window.clipboardData).getData('text');
					$($t).jqGrid('saveCell', $t.p.iRow, $t.p.iCol, paste);
					paste_to_cell = false;
				}
			});

			var onKeyCheck = $.jgrid.isFunction(o.onKeyCheck) ? o.onKeyCheck : false;
			$($t).on('keydown', function(e) {
				if($t.p.navigationDisabled && $t.p.navigationDisabled === true) {
					return;
				}
				if(e.target.id.startsWith("jqs_"+$t.p.id)) {
					return;
				}
				if(onKeyCheck) {
					if(!onKeyCheck.call($t,e.target) ) {
						return;
					}
				}
				var key = e.which || e.keyCode, nextCell;
				var ctrl = e.ctrlKey ? e.ctrlKey : ((key === 17) ? true : false); // ctrl detection

				switch(key) {
					case (38) : // UP
						nextCell = getNextVisibleCell(0, -1);
						focusRow = nextCell.row;
						focusCol = nextCell.col;
						e.preventDefault();
						break;
					case (40) : // DOWN
					case 13 : // Enter
						nextCell = getNextVisibleCell(0, 1);
						focusRow = nextCell.row;
						focusCol = nextCell.col;
						e.preventDefault();
						break;
					case (37) : // LEFT
						nextCell = getNextVisibleCell(-1, 0);
						focusRow = nextCell.row;
						focusCol = nextCell.col;
						e.preventDefault();
						break;
					case (39) : // RIGHT
						nextCell = getNextVisibleCell(1, 0);
						focusRow = nextCell.row;
						focusCol = nextCell.col;
						e.preventDefault();
						break;
					case 36 : // HOME
						if(e.ctrlKey) {
							focusRow = 1;
						} else {
							focusRow = $t.p.iRow;
						}
						focusCol = $t.p.frozenColumns ? $t.p.frozenColCount + 1 : 0;
						e.preventDefault();
						break;
					case 35 : // END
						if(e.ctrlKey) {
							focusRow = $t.rows.length - 1;
						} else {
							focusRow = $t.p.iRow;
						}
						focusCol = $t.p.colModel.length - 1;
						e.preventDefault();
						break;
					case 33 : // PAGEUP

						movePage( -1 );
						focusCol = $t.p.iCol;
						focusRow = $t.p.iRow;
						e.preventDefault();
						break;
					case 34 : // PAGEDOWN
						movePage( 1 );
						focusCol = $t.p.iCol;
						focusRow = $t.p.iRow;
						if(focusRow > $t.rows.length-1) {
							focusRow = $t.rows.length-1;
							$t.p.iRow = $t.rows.length-1;
						}
						e.preventDefault();
						break;
					case 9 : //TAB
						if (e.shiftKey) {
							nextCell = getNextVisibleCell(-1, 0);
						} else {
							nextCell = getNextVisibleCell(1, 0);

						}
						focusRow = nextCell.row;
						focusCol = nextCell.col;
						e.preventDefault();
					break;
					case 113 : // F2
						try{
							$($t).jqGrid('editCell', $t.p.iRow, $t.p.iCol, true, e, false);
							$t.p.F2key = true;
						} catch(e){}
						break;
					case 8: // DEL, BACKSPACE
					case 46:
						var retDel = true;
						if( delCell ) {
							retDel = delCell.call($t, $t.rows[$t.p.iRow].id ,$t.p.iRow, $t.p.iCol, e);
						}
						if(retDel === true) {
							$($t).jqGrid('saveCell', $t.p.iRow, $t.p.iCol, "");
						}
						break;
					case 86:
						if(ctrl) {
							paste_to_cell = true;
							return true;
							break;
						}
					case 90:
						if(ctrl) {
							var undofunc = true; 
							if( $.jgrid.isFunction( o.customUndoFunction ) ) {
								undofunc = o.customUndoFunction.call($t, $t.rows[$t.p.iRow].id ,$t.p.iRow, $t.p.iCol, e);
							}
							if( undofunc && $t.p.savedValues
								    && $($t).jqGrid('getCell', $t.rows[$t.p.iRow].id, $t.p.colModel[$t.p.iCol].name, false)  === $t.p.savedValues.newvalue 
								    && $t.p.iRow ===  $t.p.savedValues.indexRow) {
								// undo
								$($t).jqGrid('saveCell', $t.p.iRow, $t.p.iCol, $t.p.savedValues.oldvalue);
							}
							return true;
							break;
						}
					default:
						var isLetter = /^[a-z]$/i.test(e.key);
						var isNumber = /^[0-9]$/i.test(e.key);
						var other = false;
						if(o.addonChars) {
							other = o.addonChars.test(e.key);
						}

						if(isLetter || isNumber || aKeys.has(e.key) || other) {
							$($t).jqGrid('editCell', $t.p.iRow, $t.p.iCol, true, e, true);
						}
						if( custAct ) {
							custAct.call($t, $t.rows[$t.p.iRow].id ,$t.p.iRow, $t.p.iCol, e);
						}
						return;
				}
				$($t).jqGrid("focusBodyCell", focusRow, focusCol, getstyle, highlight);
			});
			$($t).on('jqGridBeforeSelectRow.ariaGridClick',function() {
				return false;
			});
			$($t).on('jqGridCellSelect.ariaGridClick', function(el1, id, status,tdhtml, e) {
				var el = e.target;
				if($t.p.iRow > 0 && $t.p.iCol >=0) {
					$($t.rows[$t.p.iRow].cells[$t.p.iCol]).attr("tabindex", -1);
				}
				if($(el).is("td") || $(el).is("th") || el.id.startsWith("jqs_"+$t.p.id)) {
					$t.p.iCol = el.cellIndex;
				} else {
					return;
				}
				if($t.p.savedRow.length) {
					$($t).jqGrid("saveCell",$t.p.savedRow[0].id,$t.p.savedRow[0].ic);
				}
				var row = $(el).closest("tr.jqgrow");
				$t.p.iRow = row[0].rowIndex;
				$(el).attr("tabindex", 0)
					.addClass(highlight)
					.focus()
					.blur(function(){$(this).removeClass(highlight);});
			}).on('jqGridDblClickRow.ariaGridDblClick', function(el1,id, iRow, iCol, e){
				$($t).jqGrid('editCell', iRow, iCol, true, e, false);
				$t.p.F2key = true;
			});
		});
	},
	focusBodyCell : function(focusRow, focusCol, _s, _h) {
		return this.each(function (){
			var $t = this,
			getstyle = !_s ? $.jgrid.getMethod("getStyleUI") : _s,
			highlight = !_h ? getstyle($t.p.styleUI+'.common','highlight', true) : _h,
			focusableElementsSelector = $.jgrid.focusableElementsList.join(),
			fe;
			function hasFocusableChild( el) {
				return $(focusableElementsSelector, el)[0];
			}

			if(focusRow !== undefined && focusCol !== undefined) {
				if (!isNaN($t.p.iRow) && !isNaN($t.p.iCol) && $t.p.iCol >= 0) {
					fe = hasFocusableChild($t.rows[$t.p.iRow].cells[$t.p.iCol]);
					if( fe ) {
						$(fe).attr('tabindex', -1);
					} else {
						$($t.rows[$t.p.iRow].cells[$t.p.iCol]).attr('tabindex', -1);
					}
				}

			} else  {
				focusRow = $t.p.iRow;
				focusCol = $t.p.iCol;
			}
			focusRow = parseInt(focusRow, 10);
			focusCol = parseInt(focusCol, 10);
			if(focusRow > 0 && focusCol >=0) {
				fe = hasFocusableChild($t.rows[focusRow].cells[focusCol]);
				if( fe ) {
					$(fe).attr('tabindex', 0)
					.addClass(highlight)
					.focus()
					.blur( function () { $(this).removeClass(highlight); });
				}  else {
					$($t.rows[focusRow].cells[focusCol])
						.attr('tabindex', 0)
						.addClass(highlight)
						.focus()
						.blur(function () { $(this).removeClass(highlight); });
			}
			$t.p.iRow = focusRow;
			$t.p.iCol = focusCol;
			}
		});
	},
	resetAriaBody : function() {
		return this.each(function(){
			var $t = this, paste_to_cell = false;;
			$t.p.ariaBody = false;
			$($t).attr("tabindex","0")
				.off('keydown')
				.off('jqGridBeforeSelectRow.ariaGridClick')
				.off('jqGridCellSelect.ariaGridClick')
				.off('jqGridAfterGridComplete.setAriaGrid');
			var focusableElementsSelector = $.jgrid.focusableElementsList.join();
			$("tbody",$t).first().find(">tr:not(.jqgfirstrow)>td:not(:hidden, :has("+focusableElementsSelector+"))").removeAttr("tabindex").off("focus");
			$("tbody",$t).first().find(">tr:not(.jqgfirstrow)").attr("tabindex", -1);
			try {
				$t.removeEventListener('paste', function(event) {
					if(paste_to_cell) {
						var paste = (event.clipboardData || window.clipboardData).getData('text');
						$($t).jqGrid('saveCell', $t.p.iRow, $t.p.iCol, paste);
						paste_to_cell = false;
					}
				}, true);
			} catch(e) {}
		});
	},
	ariaHeaderGrid : function() {
		return this.each(function (){
			var $t = this,
			getstyle = $.jgrid.getMethod("getStyleUI"),
			highlight = getstyle($t.p.styleUI+'.common','highlight', true),
			htable = $("#gbox_"+$t.p.id).find(".ui-jqgrid-hbox>table").first();
			$('tr.ui-jqgrid-labels', htable).on("keydown", function(e) {
				var currindex = $t.p.selHeadInd;
				var key = e.which || e.keyCode;
				var len = $t.grid.headers.length;

				switch (key) {
					case 37: // left
						if(currindex-1 >= 0) {
							currindex--;
							while( $($t.grid.headers[currindex].el).is(':hidden') && currindex-1 >= 0) {
								currindex--;
								if(currindex < 0) {
									break;
								}
							}
							if(currindex >= 0) {
								$($t.grid.headers[currindex].el).focus();
								$($t.grid.headers[$t.p.selHeadInd].el).attr("tabindex", "-1");
								$t.p.selHeadInd = currindex;
								e.preventDefault();
							}
						}

						break;
					case 39: // right
						if(currindex+1 < len) {
							currindex++;
							while( $($t.grid.headers[currindex].el).is(':hidden') && currindex+1 <len) {
								currindex++;
								if( currindex > len-1) {
									break;
								}
							}
							if( currindex < len) {
								$($t.grid.headers[currindex].el).focus();
								$($t.grid.headers[$t.p.selHeadInd].el).attr("tabindex", "-1");
								$t.p.selHeadInd = currindex;
								e.preventDefault();
							}
						}
						break;
					case 13: // enter
						$($t.grid.headers[currindex].el).find("div").first().trigger('click');
						e.preventDefault();
						break;
					default:
						return;
				}
			});
			$('tr.ui-jqgrid-labels>th:not(:hidden)', htable).attr("tabindex", -1).focus(function(){
				$(this).addClass(highlight).attr("tabindex", "0");
			}).blur(function(){
				$(this).removeClass(highlight);
			});
			$t.p.selHeadInd = $.jgrid.getFirstVisibleCol( $t );
			$($t.grid.headers[$t.p.selHeadInd].el).attr("tabindex","0");
		});
	},
	focusHeaderCell : function( index) {
		return this.each( function(){
			var $t = this;
			if(index === undefined) {
				index = $t.p.selHeadInd;
			}
			if(index >= 0 && index < $t.p.colModel.length) {
				$($t.grid.headers[$t.p.selHeadInd].el).attr("tabindex", "-1");
				$($t.grid.headers[index].el).focus();
				$t.p.selHeadInd = index;
			}
		});
	},
	resetAriaHeader : function() {
		return this.each(function(){
			var htable = $("#gbox_" + this.p.id).find(".ui-jqgrid-hbox>table").first();
			$('tr.ui-jqgrid-labels', htable).off("keydown");
			$('tr.ui-jqgrid-labels>th:not(:hidden)', htable).removeAttr("tabindex").off("focus blur");
		});
	},
	ariaPagerGrid : function () {
		return this.each( function(){
			var $t = this,
			getstyle = $.jgrid.getMethod("getStyleUI"),
			highlight = getstyle($t.p.styleUI+'.common','highlight', true),
				disabled = "."+getstyle($t.p.styleUI+'.common','disabled', true),
				cels = $(".ui-pg-button",$t.p.pager),
				len = cels.length;

			cels.attr("tabindex","-1").focus(function(){
				$(this).addClass(highlight);
			}).blur(function(){
				$(this).removeClass(highlight);
			});

			$t.p.navIndex = 0;
			setTimeout( function() { // make another decision here
				var navIndex = cels.not(disabled).first().attr("tabindex", "0");
				$t.p.navIndex = (navIndex[0] && navIndex[0].cellIndex) ? navIndex[0].cellIndex-1 : 0;
			}, 100);

			$($t.p.pager).find("table.ui-pager-table tr").first().on("keydown", function(e) {
				var key = e.which || e.keyCode;

				var indexa = $t.p.navIndex;//currindex;
				switch (key) {
					case 37: // left
						if(indexa-1 >= 0) {
							indexa--;
							while( $(cels[indexa]).is(disabled) && indexa-1 >= 0) {
								indexa--;
								if(indexa < 0) {
									break;
								}
							}
							if(indexa >= 0) {
								$(cels[$t.p.navIndex]).attr("tabindex","-1");
								$(cels[indexa]).attr("tabindex","0").focus();
								$t.p.navIndex = indexa;
							}

							e.preventDefault();
						}
						break;
					case 39: // right
						if(indexa+1 < len) {
							indexa++;
							while( $(cels[indexa]).is(disabled) && indexa+1 < len + 1) {
								indexa++;
								if( indexa > len-1) {
									break;
								}
							}
							if( indexa < len) {
								$(cels[$t.p.navIndex]).attr("tabindex","-1");
								$(cels[indexa]).attr("tabindex","0").focus();
								$t.p.navIndex = indexa;
							}
							e.preventDefault();
						}
						break;
					case 13: // enter
						$(cels[indexa]).trigger('click');
						e.preventDefault();
						break;
					default:
						return;
				}
			});
		});
	},
	focusPagerCell : function( index) {
		return this.each( function(){
			var $t = this,
				cels = $(".ui-pg-button",$t.p.pager),
				len = cels.length;
			if(index === undefined) {
				index = $t.p.navIndex;
			}
			if(index >= 0 && index < len) {
				$(cels[$t.p.navIndex]).attr("tabindex","-1");
				$(cels[index]).attr("tabindex","0").focus();
				$t.p.navIndex = index;
			}
		});
	},
	resetAriaPager : function() {
		return this.each(function(){
			$(".ui-pg-button",this.p.pager).removeAttr("tabindex").off("focus");;
			$(this.p.pager).find("table.ui-pager-table tr").first().off("keydown");
		});
	},
	setAriaGrid : function ( p ) {
		var o = $.extend({
			header : true,
			body : true,
			pager : true,
			onEnterCell : null,
			customCellAction : null,
			excel : false
		}, p || {});
		return this.each(function(){
			if( o.header ) {
				$(this).jqGrid('ariaHeaderGrid');
			}
			if( o.body ) {
				if(o.excel) {
					$(this).jqGrid('excelLikeGrid', o);
				} else {
					$(this).jqGrid('ariaBodyGrid', o);
			}
			}
			if( o.pager ) {
				$(this).jqGrid('ariaPagerGrid');
			}
		});
	},
	resetAriaGrid : function( p ) {
		var o = $.extend({
			header : true,
			body : true,
			pager : true
		}, p || {});
		return this.each(function(){
			var $t = this;
			if( o.body ) {
				$($t).jqGrid('resetAriaBody');
			}
			if( o.header ) {
				$($t).jqGrid('resetAriaHeader');
			}
			if( o.pager ) {
				$($t).jqGrid('resetAriaPager');
			}
		});
	}
// end aria grid
});
//module end
}));
