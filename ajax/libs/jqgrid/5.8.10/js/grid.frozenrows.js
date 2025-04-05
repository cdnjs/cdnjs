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
$.jgrid.extend({
	setupFrozenRows : function ( options ){
		var prm = $.extend({
			first : 0,
			last : 0,
			rowids :[],
			//saveFirstLastId : false,
			classes : "frozen-row-class"
		}, options || {});

		return this.each(function(){
			// restrictions
			if(this.p.subGrid === true ||
				this.p.treeGrid === true ||
				//this.p.cellEdit === true ||
				// $t.p.sortable ||
				this.p.scroll ||
				//this.p.frozenColumns === true ||
				//this.p.frozenRows === true||
				this.p.grouping === true)
			{
				return;
			}
			var $t = this, row, pos =0, len =0;
			if(prm.rowids && prm.rowids.length > 0 ) {
				for( let i =0;i<prm.rowids.length; i++ ) {
					let j = $t.rows.length;
					while( j-- ) {
						if($t.rows[j].id === prm.rowids[i]+"") {
							$($t.rows[j]).insertBefore($t.rows[i+1]);
							break;
						}
					}
				}
				len = prm.rowids.length;
			} else if(prm.first > 0) {
				len = prm.first
			} else if(prm.last > 0 ) {
				let j = $t.rows.length;
				len = prm.last;
				for(let i=0; i<prm.last; i++) {
					$($t.rows[j-1]).insertBefore($t.rows[1]);
				}
			} else {
				return;
			}
			for(let i = 0; i < len; i++) {
				row = $t.rows[i+1];
				if(row.classList.contains("jqgrow")) {
					$(row).addClass(prm.classes).css("top", pos + "px");
				}
				pos += $(row).outerHeight();
			}
			$t.p.frozenRows = true;
		});
	},
	setFrozenRows : function (options ) {
		return this.each(function(){
			if( this.p.records > 0 ) {
				$(this).jqGrid("setupFrozenRows", options);
			}

			$(this).on('jqGridAfterGridComplete.setFrozenRows', function () {  
				$(this).jqGrid("setupFrozenRows", options);
			});			
		});
	},
	destroyFrozenRows: function(options) {
		var prm = $.extend({
			classes : "frozen-row-class",
			rowsToScan : 5
		}, options || {});
		return this.each(function(){
			var $t = this;
			for(let i=0; i < prm.rowsToScan; i++) {
				if($t.rows[i+1] && $t.rows[i+1].classList.contains(prm.classes) ) {
					$($t.rows[i+1]).removeClass(prm.classes).css("top","");
				}
			}
			$(this).off('jqGridAfterGridComplete.setFrozenRows');
			$t.p.frozenRows = false;
		});
	}
});
//module end
}));