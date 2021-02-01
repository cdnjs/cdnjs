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
			onEnterCell : null
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
				$("tbody:first>tr:not(.jqgfirstrow)>td:not(:hidden, :has("+focusableElementsSelector+"))", $t).attr("tabindex", -1);
				$("tbody:first>tr:not(.jqgfirstrow)", $t).removeAttr("tabindex");
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
			$($t).on('keydown', function(e) {
				if($t.p.navigationDisabled && $t.p.navigationDisabled === true) {
					return;
				}
				var key = e.which || e.keyCode, nextCell;
				switch(key) {
					case (38) :
						nextCell = getNextVisibleCell(0, -1);
						focusRow = nextCell.row;
						focusCol = nextCell.col;
						e.preventDefault();
						break;
					case (40) :
						nextCell = getNextVisibleCell(0, 1);
						focusRow = nextCell.row;
						focusCol = nextCell.col;
						e.preventDefault();
						break;
					case (37) :
						nextCell = getNextVisibleCell(-1, 0);
						focusRow = nextCell.row;
						focusCol = nextCell.col;
						e.preventDefault();
						break;
					case (39) :
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
					case 35 : //END
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
					case 13 : //Enter
						if( $.isFunction( o.onEnterCell )) {
							o.onEnterCell.call( $t, $t.rows[$t.p.iRow].id ,$t.p.iRow, $t.p.iCol, e);
							e.preventDefault();
						}
						return;

					default:
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
				if($(el).is("td") || $(el).is("th")) {
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
			var $t = this;
			$($t).attr("tabindex","0")
				.off('keydown')
				.off('jqGridBeforeSelectRow.ariaGridClick')
				.off('jqGridCellSelect.ariaGridClick')
				.off('jqGridAfterGridComplete.setAriaGrid');
			var focusableElementsSelector = $.jgrid.focusableElementsList.join();
			$("tbody:first>tr:not(.jqgfirstrow)>td:not(:hidden, :has("+focusableElementsSelector+"))", $t).removeAttr("tabindex").off("focus");
			$("tbody:first>tr:not(.jqgfirstrow)", $t).attr("tabindex", -1);
		});
	},
	ariaHeaderGrid : function() {
		return this.each(function (){
			var $t = this,
			getstyle = $.jgrid.getMethod("getStyleUI"),
			highlight = getstyle($t.p.styleUI+'.common','highlight', true),
			htable = $(".ui-jqgrid-hbox>table:first", "#gbox_"+$t.p.id);
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
						$("div:first",$t.grid.headers[currindex].el).trigger('click');
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
			var htable = $(".ui-jqgrid-hbox>table:first", "#gbox_" + this.p.id);
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
				$t.p.navIndex = navIndex[0].cellIndex ? navIndex[0].cellIndex-1 : 0;
			}, 100);

			$("table.ui-pager-table tr:first", $t.p.pager).on("keydown", function(e) {
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
			$("table.ui-pager-table tr:first", this.p.pager).off("keydown");
		});
	},
	setAriaGrid : function ( p ) {
		var o = $.extend({
			header : true,
			body : true,
			pager : true,
			onEnterCell : null
		}, p || {});
		return this.each(function(){
			if( o.header ) {
				$(this).jqGrid('ariaHeaderGrid');
			}
			if( o.body ) {
				$(this).jqGrid('ariaBodyGrid', {onEnterCell : o.onEnterCell});
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
