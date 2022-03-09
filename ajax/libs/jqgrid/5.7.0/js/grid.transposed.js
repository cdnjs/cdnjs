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
	transposeSetup : function( data, options ){
		// return the final result.
		var columns =[], rows=[],  model = false,
		o = $.extend ( {}, options || {});
		this.each(function(){
			// trnsform data and build colModel
			var keys = Object.keys(data[o.baseindex]), rowobj, col;
			if(o.excludeSrcCols.length) {
				keys = keys.filter(function(item) {
					return !o.excludeSrcCols.includes(item);
				});
			}
			// for all columns
			for(var i =0; i<  keys.length; i++) {
				rowobj = {}, col=0;
				
				rowobj["col_name"] = keys[i];
				
				if(!model) {
					// build colmodel first item
					columns.push({name:"col_name"});
				}
				col++;
				  
				 
				// loop in every row and put it as column
				for(var j=0; j< data.length; j++) {
					var tmp = data[j];
					rowobj[o.nameprefix + col]= tmp[keys[i]];
					if(!model) {
						// colModel next items
						columns.push({name:o.nameprefix + col, label : o.labelprefix + col});
					}
					col++;
				}
				// colModel is build
				model = true;
				rows.push(rowobj);
			}
		});
		return { "colModel" : columns, "rows": rows };
	},
	jqTranspose : function( data, transpOpt, gridOpt, ajaxOpt) {
		transpOpt = $.extend ( {
			nameprefix : "col",  // prefix for the creted name in colModel + index
			labelprefix : "value ", // prefix for the colNames titles + index
			baseindex : 0, // which is the base index from source data to transpose rows to cols
			beforeCreateGrid : null, // even befor creating the jqGrid. passed is a object 
									// containing colModel and data (rows)
			RowAsHeader : 0,
			loadMsg : false,
			excludeSrcCols :[]
		}, transpOpt || {} );
		return this.each(function(){
			var $t = this,
				regional = (gridOpt && gridOpt.regional) ? gridOpt.regional : "en";
			if(transpOpt.loadMsg) {
				$("<div class='loading_pivot ui-state-default ui-state-active row'>"+$.jgrid.getRegional($t, "regional."+regional+".defaults.loadtext")+"</div>").insertBefore($t).show();
			}

			function transpose( data, o) {
				if(!$.isArray(data)) {
					//throw "data provides is not an array";
					data = [];
				}
				var transpGrid = jQuery($t).jqGrid('transposeSetup',data, transpOpt);
				if($.jgrid.isFunction(transpOpt.beforeCreateGrid)) {
					transpOpt.beforeCreateGrid.call($t, transpGrid, data);
				}
				if(o.RowAsHeader !== false 
						&& o.RowAsHeader >=0 
						&& transpGrid.rows.length 
						&& o.RowAsHeader < transpGrid.rows.length) {

					var labels = transpGrid.rows[o.RowAsHeader], i=0;
					for(var key in labels) {
						if(labels.hasOwnProperty(key)) {
							transpGrid.colModel[i].label = labels[key];
						}
						i++;
					}
					transpGrid.rows.splice(o.RowAsHeader,1);
				}
				var query= $.jgrid.from.call($t, transpGrid.rows);
				jQuery($t).jqGrid($.extend(true, {
					datastr: query.select(),
					datatype: "jsonstring",
					colModel: transpGrid.colModel,
					jsonReader : {
						repeatitems : false
					},
					viewrecords: true
					//sortname: transpOpt.xDimension[0].dataName // ?????
				}, gridOpt || {}));
				if(transpOpt.loadMsg) {
					$(".loading_pivot").remove();
				}
			}
						
			if(typeof data === "string") {
				$.ajax($.extend({
					url : data,
					dataType: 'json',
					success : function(response) {
						transpose($.jgrid.getAccessor(response, ajaxOpt && ajaxOpt.reader ? ajaxOpt.reader: 'rows'), transpOpt );
					}
				}, ajaxOpt || {}) );
			} else {
				transpose( data, transpOpt );
			}
		});
	}
});
//module end
}));
