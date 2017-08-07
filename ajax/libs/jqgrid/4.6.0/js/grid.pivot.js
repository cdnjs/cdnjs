/*jshint eqeqeq:false */
/*global jQuery */
(function($){
/**
 * jqGrid pivot functions
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
*/
"use strict";
// To optimize the search we need custom array filter
// This code is taken from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

function _pivotfilter (fn, context) {
	var i,
		value,
		result = [],
		length;

	if (!this || typeof fn !== 'function' || (fn instanceof RegExp)) {
		throw new TypeError();
	}

	length = this.length;

	for (i = 0; i < length; i++) {
		if (this.hasOwnProperty(i)) {
			value = this[i];
			if (fn.call(context, value, i, this)) {
				result.push(value);
				// We need break in order to cancel loop 
				// in case the row is found
				break;
			}
		}
	}
	return result;
}
$.assocArraySize = function(obj) {
    // http://stackoverflow.com/a/6700/11236
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
        	size++;
        }
    }
    return size;
};

$.jgrid.extend({
	pivotSetup : function( data, options ){
		// data should come in json format
		// The function return the new colModel and the transformed data
		// again with group setup options which then will be passed to the grid
		var columns =[],
		pivotrows =[],
		summaries = [],
		member=[],
		groupOptions = {
			grouping : true,
			groupingView :  {
				groupField : [],
				groupSummary: [],
				groupSummaryPos:[]
			}
		},
		headers = [],
		o = $.extend ( {
			rowTotals : false,
			rowTotalsText : 'Total',
			// summary columns
			colTotals : false,
			groupSummary : true,
			groupSummaryPos :  'header',
			frozenStaticCols : false
		}, options || {});
		this.each(function(){

			var 
				row,
				rowindex,
				i,
				
				rowlen = data.length,
				xlen, ylen, aggrlen,
				tmp,
				newObj,
				r=0;
			// utility funcs
			/* 
			 * Filter the data to a given criteria. Return the firt occurance
			 */
			function find(ar, fun, extra) {
				var res;
				res = _pivotfilter.call(ar, fun, extra);
				return res.length > 0 ? res[0] : null;
			}
			/*
			 * Check if the grouped row column exist (See find)
			 * If the row is not find in pivot rows retun null,
			 * otherviese the column
			 */
			function findGroup(item, index) {
				var j = 0, ret = true, i;
				for(i in item) {
					if(item[i] != this[j]) {
						ret =  false;
						break;
					}
					j++;
					if(j>=this.length) {
						break;
					}
				}
				if(ret) {
					rowindex =  index;
				}
				return ret;
			}
			/*
			 * Perform calculations of the pivot values.
			 */
			function calculation(oper, v, field, rc)  {
				var ret;
				switch (oper) {
					case  "sum" : 
						ret = parseFloat(v||0) + parseFloat((rc[field]||0));
						break;
					case "count" :
						if(v==="" || v == null) {
							v=0;
						}
						if(rc.hasOwnProperty(field)) {
							ret = v+1;
						} else {
							ret = 0;
						}
						break;
					case "min" : 
						if(v==="" || v == null) {
							ret = parseFloat(rc[field]||0);
						} else {
							ret =Math.min(parseFloat(v),parseFloat(rc[field]||0));
						}
						break;
					case "max" : 
						if(v==="" || v == null) {
							ret = parseFloat(rc[field]||0);
						} else {
							ret = Math.max(parseFloat(v),parseFloat(rc[field]||0));
						}
						break;
				}
				return ret;
			}
			/*
			 * The function agragates the values of the pivot grid.
			 * Return the current row with pivot summary values
			 */
			function agregateFunc ( row, aggr, value, curr) {
				// default is sum
				var arrln = aggr.length, i, label, j, jv;
				if($.isArray(value)) {
					jv = value.length;
				} else {
					jv = 1;
				}
				member = [];
				member.root = 0;
				for(j=0;j<jv;j++) {
					var  tmpmember = [], vl;
					for(i=0; i < arrln; i++) {
						if(value == null) {
							label = $.trim(aggr[i].member)+"_"+aggr[i].aggregator;
							vl = label;
						} else {
							vl = value[j].replace(/\s+/g, '');
							try {
								label = (arrln === 1 ? vl : vl+"_"+aggr[i].aggregator+"_"+i);
							} catch(e) {}
						}
						curr[label] =  tmpmember[label] = calculation( aggr[i].aggregator, curr[label], aggr[i].member, row);
					}
					member[vl] = tmpmember;
				}
				return curr;
			}
			// Making the row totals without to add in yDimension
			if(o.rowTotals && o.yDimension.length > 0) {
				var dn = o.yDimension[0].dataName;
				o.yDimension.splice(0,0,{dataName:dn});
				o.yDimension[0].converter =  function(){ return '_r_Totals'; };
			}
			// build initial columns (colModel) from xDimension
			xlen = $.isArray(o.xDimension) ? o.xDimension.length : 0;
			ylen = o.yDimension.length;
			aggrlen  = $.isArray(o.aggregates) ? o.aggregates.length : 0;
			if(xlen === 0 || aggrlen === 0) {
				throw("xDimension or aggregates optiona are not set!");
			}
			var colc;
			for(i = 0; i< xlen; i++) {
				colc = {name:o.xDimension[i].dataName, frozen: o.frozenStaticCols};
				colc = $.extend(true, colc, o.xDimension[i]);
				columns.push( colc );
			}
			var groupfields = xlen - 1, tree={};
			//tree = { text: 'root', leaf: false, children: [] };
			//loop over alll the source data
			while( r < rowlen ) {
				row = data[r];
				var xValue = [];
				var yValue = []; 
				tmp = {};
				i = 0;
				// build the data from xDimension
				do {
					xValue[i]  = $.trim(row[o.xDimension[i].dataName]);
					tmp[o.xDimension[i].dataName] = xValue[i];
					i++;
				} while( i < xlen );
				
				var k = 0;
				rowindex = -1;
				// check to see if the row is in our new pivotrow set
				newObj = find(pivotrows, findGroup, xValue);
				if(!newObj) {
					// if the row is not in our set
					k = 0;
					// if yDimension is set
					if(ylen>=1) {
						// build the cols set in yDimension
						for(k=0;k<ylen;k++) {
							yValue[k] = $.trim(row[o.yDimension[k].dataName]);
							// Check to see if we have user defined conditions
							if(o.yDimension[k].converter && $.isFunction(o.yDimension[k].converter)) {
								yValue[k] = o.yDimension[k].converter.call(this, yValue[k], xValue, yValue);
							}
						}
						// make the colums based on aggregates definition 
						// and return the members for late calculation
						tmp = agregateFunc( row, o.aggregates, yValue, tmp );
					} else  if( ylen === 0 ) {
						// if not set use direct the aggregates 
						tmp = agregateFunc( row, o.aggregates, null, tmp );
					}
					// add the result in pivot rows
					pivotrows.push( tmp );
				} else {
					// the pivot exists
					if( rowindex >= 0) {
						k = 0;
						// make the recalculations 
						if(ylen>=1) {
							for(k=0;k<ylen;k++) {
								yValue[k] = $.trim(row[o.yDimension[k].dataName]);
								if(o.yDimension[k].converter && $.isFunction(o.yDimension[k].converter)) {
									yValue[k] = o.yDimension[k].converter.call(this, yValue[k], xValue, yValue);
								}
							}
							newObj = agregateFunc( row, o.aggregates, yValue, newObj );
						} else  if( ylen === 0 ) {
							newObj = agregateFunc( row, o.aggregates, null, newObj );
						}
						// update the row
						pivotrows[rowindex] = newObj;
					}
				}
				var kj=0, current = null,existing = null, kk;
				// Build a JSON tree from the member (see aggregateFunc) 
				// to make later the columns 
				// 
				for (kk in member) {
					if(kj === 0) {
						if (!tree.children||tree.children === undefined){
							tree = { text: kk, level : 0, children: [] };
						}
						current = tree.children;
					} else {
						existing = null;
						for (i=0; i < current.length; i++) {
							if (current[i].text === kk) {
								//current[i].fields=member[kk];
								existing = current[i];
								break;
							}
						}
						if (existing) {
							current = existing.children;
						} else {
							current.push({ children: [], text: kk, level: kj,  fields: member[kk] });
							current = current[current.length - 1].children;
						}
					}
					kj++;
				}
				r++;
			}
			var  lastval=[], initColLen = columns.length, swaplen = initColLen;
			if(ylen>0) {
				headers[ylen-1] = {	useColSpanStyle: false,	groupHeaders: []};
			}
			/*
			 * Recursive function which uses the tree to build the 
			 * columns from the pivot values and set the group Headers
			 */
			function list(items) {
				var l, j, key, k, col;
				for (key in items) { // iterate
					if (items.hasOwnProperty(key)) {
					// write amount of spaces according to level
					// and write name and newline
						if(typeof items[key] !== "object") {
							// If not a object build the header of the appropriate level
							if( key === 'level') {
								if(lastval[items.level] === undefined) {
									lastval[items.level] ='';
									if(items.level>0 && items.text !== '_r_Totals') {
										headers[items.level-1] = {
											useColSpanStyle: false,
											groupHeaders: []
										};
									}
								}
								if(lastval[items.level] !== items.text && items.children.length && items.text !== '_r_Totals') {
									if(items.level>0) {
										headers[items.level-1].groupHeaders.push({
											titleText: items.text
										});
										var collen = headers[items.level-1].groupHeaders.length,
										colpos = collen === 1 ? swaplen : initColLen+(collen-1)*aggrlen;
										headers[items.level-1].groupHeaders[collen-1].startColumnName = columns[colpos].name;
										headers[items.level-1].groupHeaders[collen-1].numberOfColumns = columns.length - colpos;
										initColLen = columns.length;
									}
								}
								lastval[items.level] = items.text;
							}
							// This is in case when the member contain more than one summary item
							if(items.level === ylen  && key==='level' && ylen >0) {
								if( aggrlen > 1){
									var ll=1;
									for( l in items.fields) {
										if(ll===1) {
											headers[ylen-1].groupHeaders.push({startColumnName: l, numberOfColumns: 1, titleText: items.text});
										}
										ll++;
									}
									headers[ylen-1].groupHeaders[headers[ylen-1].groupHeaders.length-1].numberOfColumns = ll-1;
								} else {
									headers.splice(ylen-1,1);
								}
							}
						}
						// if object, call recursively
						if (items[key] != null && typeof items[key] === "object") {
							list(items[key]);
						}
						// Finally build the coulumns
						if( key === 'level') {
							if(items.level >0){
								j=0;
								for(l in items.fields) {
									col = {};
									for(k in o.aggregates[j]) {
										if(o.aggregates[j].hasOwnProperty(k)) {
											switch( k ) {
												case 'member':
												case 'label':
												case 'aggregator':
													break;
												default:
													col[k] = o.aggregates[j][k];
											}
										}
									}
									if(aggrlen>1) {
										col.name = l;
										col.label = o.aggregates[j].label || l;
									} else {
										col.name = items.text;
										col.label = items.text==='_r_Totals' ? o.rowTotalsText : items.text;
									}
									columns.push (col);
									j++;
								}
							}
						}
					}
				}
			}

			list(tree, 0);
			var nm;
			// loop again trougth the pivot rows in order to build grand total 
			if(o.colTotals) {
				var plen = pivotrows.length;
				while(plen--) {
					for(i=xlen;i<columns.length;i++) {
						nm = columns[i].name;
						if(!summaries[nm]) {
							summaries[nm] = parseFloat(pivotrows[plen][nm] || 0);
						} else {
							summaries[nm] += parseFloat(pivotrows[plen][nm] || 0);
						}
					}
				}
			}
			// based on xDimension  levels build grouping 
			if( groupfields > 0) {
				for(i=0;i<groupfields;i++) {
					groupOptions.groupingView.groupField[i] = columns[i].name;
					groupOptions.groupingView.groupSummary[i] = o.groupSummary;
					groupOptions.groupingView.groupSummaryPos[i] = o.groupSummaryPos;
				}
			} else {
				// no grouping is needed
				groupOptions.grouping = false;
			}
			groupOptions.sortname = columns[groupfields].name;
			groupOptions.groupingView.hideFirstGroupCol = true;
		});
		// return the final result.
		return { "colModel" : columns, "rows": pivotrows, "groupOptions" : groupOptions, "groupHeaders" :  headers, summary : summaries };
	},
	jqPivot : function( data, pivotOpt, gridOpt, ajaxOpt) {
		return this.each(function(){
			var $t = this;

			function pivot( data) {
				var pivotGrid = jQuery($t).jqGrid('pivotSetup',data, pivotOpt),
				footerrow = $.assocArraySize(pivotGrid.summary) > 0 ? true : false,
				query= $.jgrid.from(pivotGrid.rows), i;
				for(i=0; i< pivotGrid.groupOptions.groupingView.groupField.length; i++) {
					query.orderBy(pivotGrid.groupOptions.groupingView.groupField[i], "a", 'text', '');
				}
				jQuery($t).jqGrid($.extend({
					datastr: $.extend(query.select(),footerrow ? {userdata:pivotGrid.summary} : {}),
					datatype: "jsonstring",
					footerrow : footerrow,
					userDataOnFooter: footerrow,
					colModel: pivotGrid.colModel,
					viewrecords: true,
					sortname: pivotOpt.xDimension[0].dataName // ?????
				}, gridOpt || {}, pivotGrid.groupOptions));
				var gHead = pivotGrid.groupHeaders;
				if(gHead.length) {
					for( i = 0;i < gHead.length ; i++) {
						if(gHead[i] && gHead[i].groupHeaders.length) {
							jQuery($t).jqGrid('setGroupHeaders',gHead[i]);
						}
					}
				}
				if(pivotOpt.frozenStaticCols) {
					jQuery($t).jqGrid("setFrozenColumns");
				}
			}

			if(typeof data === "string") {
				$.ajax($.extend({
					url : data,
					dataType: 'json',
					success : function(response) {
						pivot($.jgrid.getAccessor(response, ajaxOpt && ajaxOpt.reader ? ajaxOpt.reader: 'rows') );
					}
				}, ajaxOpt || {}) );
			} else {
				pivot( data );
			}
		});
	}
});
})(jQuery);
