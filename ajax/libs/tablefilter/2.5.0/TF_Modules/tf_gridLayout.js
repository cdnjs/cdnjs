/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- Grid Layout feature v1.2
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
-------------------------------------------------------------------------*/

TF.prototype.SetGridLayout = function()
/*====================================================
	- generates a grid with fixed headers
=====================================================*/
{
	if(!this.gridLayout) return;
	var f = this.fObj;
	this.gridWidth =			f.grid_width!=undefined ? f.grid_width : null; //defines grid width
	this.gridHeight =			f.grid_height!=undefined ? f.grid_height : null; //defines grid height
	this.gridMainContCssClass = f.grid_cont_css_class!=undefined //defines css class for main container
									? f.grid_cont_css_class : 'grd_Cont';
	this.gridContCssClass =		f.grid_tbl_cont_css_class!=undefined //defines css class for div containing table
									? f.grid_tbl_cont_css_class : 'grd_tblCont';
	this.gridHeadContCssClass = f.grid_tblHead_cont_css_class!=undefined //defines css class for div containing headers' table
									? f.grid_tblHead_cont_css_class : 'grd_headTblCont';
	this.gridInfDivCssClass =	f.grid_inf_grid_css_class!=undefined //defines css class for div containing rows counter, paging etc.
									? f.grid_inf_grid_css_class : 'grd_inf';
	this.gridHeadRowIndex =		f.grid_headers_row_index!=undefined //defines which row contains column headers
									? f.grid_headers_row_index : 0; 
	this.gridHeadRows =			f.grid_headers_rows!=undefined //array of headers row indexes to be placed in header table
									? f.grid_headers_rows : [0];
	this.gridEnableFilters =	f.grid_enable_default_filters!=undefined 
									? f.grid_enable_default_filters : true; //generate filters in table headers
	this.gridDefaultColWidth =	f.grid_default_col_width!=undefined 
									? f.grid_default_col_width : '100px'; //default col width						
	this.gridEnableColResizer =	f.grid_enable_cols_resizer!=undefined 
									? f.grid_enable_cols_resizer : true; //enables/disables columns resizer
	this.gridColResizerPath =	f.grid_cont_col_resizer_path!=undefined //defines col resizer script path
									? f.grid_cont_col_resizer_path : this.basePath+'TFExt_ColsResizer/TFExt_ColsResizer.js';
	
	if(!this.hasColWidth){// in case column widths are not set default width 100px
		this.colWidth = [];
		for(var k=0; k<this.nbCells; k++){
			var colW, cell = this.tbl.rows[this.gridHeadRowIndex].cells[k];
			if(cell.width!='') colW = cell.width;
			else if(cell.style.width!='') colW = parseInt(cell.style.width);
			else colW = this.gridDefaultColWidth;
			this.colWidth[k] = colW;
		}
		this.hasColWidth = true;
	}
	this.SetColWidths(this.gridHeadRowIndex);

	var tblW;//initial table width
	if(this.tbl.width!='') tblW = this.tbl.width;
	else if(this.tbl.style.width!='') tblW = parseInt(this.tbl.style.width);
	else tblW = this.tbl.clientWidth;
	
	//Main container: it will contain all the elements
	this.tblMainCont = tf_CreateElm('div',['id', this.prfxMainTblCont + this.id]);
	this.tblMainCont.className = this.gridMainContCssClass;
	if(this.gridWidth) this.tblMainCont.style.width = this.gridWidth;
	this.tbl.parentNode.insertBefore(this.tblMainCont, this.tbl);
	
	//Table container: div wrapping content table
	this.tblCont = tf_CreateElm('div',['id', this.prfxTblCont + this.id]);
	this.tblCont.className = this.gridContCssClass;
	if(this.gridWidth) this.tblCont.style.width = this.gridWidth;
	if(this.gridHeight) this.tblCont.style.height = this.gridHeight;
	this.tbl.parentNode.insertBefore(this.tblCont, this.tbl);
	var t = this.tbl.parentNode.removeChild(this.tbl);
	this.tblCont.appendChild(t);
	
	//In case table width is expressed in %
	if(this.tbl.style.width == '')
		this.tbl.style.width = (this.__containsStr('%',tblW) 
								? this.tbl.clientWidth : tblW) + 'px';

	var d = this.tblCont.parentNode.removeChild(this.tblCont);
	this.tblMainCont.appendChild(d);
	
	//Headers table container: div wrapping headers table
	this.headTblCont = tf_CreateElm('div',['id', this.prfxHeadTblCont + this.id]);
	this.headTblCont.className = this.gridHeadContCssClass;
	if(this.gridWidth) this.headTblCont.style.width = this.gridWidth;		
	
	//Headers table
	this.headTbl = tf_CreateElm('table',['id', this.prfxHeadTbl + this.id]);
	var tH = tf_CreateElm('tHead'); //IE<7 needs it
	
	//1st row should be headers row, ids are added if not set
	//Those ids are used by the sort feature
	var hRow = this.tbl.rows[this.gridHeadRowIndex];
	var sortTriggers = [];
	for(var n=0; n<this.nbCells; n++){
		var cell = hRow.cells[n];
		var thId = cell.getAttribute('id');
		if(!thId || thId==''){ 
			thId = this.prfxGridTh+n+'_'+this.id 
			cell.setAttribute('id', thId);
		}
		sortTriggers.push(thId);
	}
	
	//Filters row is created
	var filtersRow = tf_CreateElm('tr');
	if(this.gridEnableFilters && this.fltGrid){
		this.externalFltTgtIds = [];
		for(var j=0; j<this.nbCells; j++)
		{
			var fltTdId = this.prfxFlt+j+ this.prfxGridFltTd +this.id;
			var c = tf_CreateElm(this.fltCellTag, ['id', fltTdId]);
			filtersRow.appendChild(c);
			this.externalFltTgtIds[j] = fltTdId;
		}
	} 
	//Headers row are moved from content table to headers table
	for(var i=0; i<this.gridHeadRows.length; i++)
	{
		var headRow = this.tbl.rows[this.gridHeadRows[0]];			
		tH.appendChild(headRow);
	}
	this.headTbl.appendChild(tH);
	if(this.filtersRowIndex == 0) tH.insertBefore(filtersRow,hRow);
	else tH.appendChild(filtersRow);
	
	this.headTblCont.appendChild(this.headTbl);
	this.tblCont.parentNode.insertBefore(this.headTblCont, this.tblCont);
	
	//THead needs to be removed in content table for sort feature
	var thead = tf_Tag(this.tbl,'thead');
	if( thead.length>0 ) this.tbl.removeChild(thead[0]);

	//Headers table style
	this.headTbl.style.width = this.tbl.style.width;
	this.headTbl.style.tableLayout = 'fixed';
	this.tbl.style.tableLayout = 'fixed';
	this.headTbl.cellPadding = this.tbl.cellPadding;
	this.headTbl.cellSpacing = this.tbl.cellSpacing;
	
	//Headers container width
	this.headTblCont.style.width = this.tblCont.clientWidth+'px';
	
	//content table without headers needs col widths to be reset
	this.SetColWidths();
	
	this.tbl.style.width = '';		
	if(tf_isIE || tf_isIE7)	this.headTbl.style.width = '';
	
	//scroll synchronisation
	var o = this; //TF object
	this.tblCont.onscroll = function(){
		o.headTblCont.scrollLeft = this.scrollLeft;
		var _o = this; //this = scroll element
		//New pointerX calc taking into account scrollLeft
		if(!o.isPointerXOverwritten){
			try{					
				TF.Evt.pointerX = function(e)
				{
					e = e || window.event;
					var scrollLeft = tf_StandardBody().scrollLeft + _o.scrollLeft;
					return (e.pageX + _o.scrollLeft) || (e.clientX + scrollLeft);
				}					
				o.isPointerXOverwritten = true;
			} catch(ee) {
				o.isPointerXOverwritten = false;
			}
		}
	}

	/*** Default behaviours activation ***/
	var f = this.fObj==undefined ? {} : this.fObj;
	
	//Sort is enabled if not specified in config object
	if(f.sort != false){
		this.sort = true;
		this.sortConfig.asyncSort = true;
		this.sortConfig.triggerIds = sortTriggers;
	}
	
	if(this.gridEnableColResizer){
		if(!this.hasExtensions){
			this.extensions = {
				name:['ColumnsResizer_'+this.id],
				src:[this.gridColResizerPath], 
				description:['Columns Resizing'],
				initialize:[function(o){ o.SetColsResizer('ColumnsResizer_'+o.id); }]
			}
			this.hasExtensions = true;
		} else {
			if(!this.__containsStr('colsresizer',this.extensions.src.toString().tf_LCase())){
				this.extensions.name.push('ColumnsResizer_'+this.id);
				this.extensions.src.push(this.gridColResizerPath);
				this.extensions.description.push('Columns Resizing');
				this.extensions.initialize.push(function(o){o.SetColsResizer('ColumnsResizer_'+o.id);});
			}  
		}
	}
	
	//Default columns resizer properties for grid layout
	f.col_resizer_cols_headers_table = this.headTbl.getAttribute('id');
	f.col_resizer_cols_headers_index = this.gridHeadRowIndex;
	f.col_resizer_width_adjustment = 0;
	f.col_enable_text_ellipsis = false;
	
	//Cols generation for all browsers excepted IE<=7
	o.tblHasColTag = (tf_Tag(o.tbl,'col').length > 0) ? true : false;
	if(!tf_isIE && !tf_isIE7){
		//Col elements are enough to keep column widths after sorting and filtering
		function createColTags(o)
		{
			if(!o) return;
			for(var k=(o.nbCells-1); k>=0; k--)
			{
				var col = tf_CreateElm( 'col', ['id', o.id+'_col_'+k]);
				o.tbl.firstChild.parentNode.insertBefore(col,o.tbl.firstChild);
				col.style.width = o.colWidth[k];
				o.gridColElms[k] = col;
			}
			o.tblHasColTag = true;
		}
		if(!o.tblHasColTag) createColTags(o);
		else{
			var cols = tf_Tag(o.tbl,'col');
			for(var i=0; i<o.nbCells; i++){
				cols[i].setAttribute('id', o.id+'_col_'+i);
				cols[i].style.width = o.colWidth[i];
				o.gridColElms.push(cols[i]);
			}
		}
	}
	
	//IE <= 7 needs an additional row for widths as col element width is not enough...
	if(tf_isIE || tf_isIE7){
		var tbody = tf_Tag(o.tbl,'tbody'), r;
		if( tbody.length>0 ) r = tbody[0].insertRow(0);
		else r = o.tbl.insertRow(0);
		r.style.height = '0px';
		for(var i=0; i<o.nbCells; i++){
			var col = tf_CreateElm('td', ['id', o.id+'_col_'+i]);
			col.style.width = o.colWidth[i];
			o.tbl.rows[1].cells[i].style.width = '';
			r.appendChild(col);
			o.gridColElms.push(col);
		}
		this.hasGridWidthsRow = true;
		//Data table row with widths expressed
		o.leadColWidthsRow = o.tbl.rows[0];
		o.leadColWidthsRow.setAttribute('validRow','false');
		
		var beforeSortFn = tf_IsFn(f.on_before_sort) ? f.on_before_sort : null;
		f.on_before_sort = function(o,colIndex){
			o.leadColWidthsRow.setAttribute('validRow','false');
			if(beforeSortFn!=null) beforeSortFn.call(null,o,colIndex);
		} 
		
		var afterSortFn = tf_IsFn(f.on_after_sort) ? f.on_after_sort : null;
		f.on_after_sort = function(o,colIndex){
			if(o.leadColWidthsRow.rowIndex != 0){
				var r = o.leadColWidthsRow;
				if( tbody.length>0 )
					tbody[0].moveRow(o.leadColWidthsRow.rowIndex, 0);
				else o.tbl.moveRow(o.leadColWidthsRow.rowIndex, 0);
			}
			if(afterSortFn!=null) afterSortFn.call(null,o,colIndex);
		}	
	}
	
	var afterColResizedFn = tf_IsFn(f.on_after_col_resized) ? f.on_after_col_resized : null;
	f.on_after_col_resized = function(o,colIndex){
		if(colIndex==undefined) return;
		var w = o.crWColsRow.cells[colIndex].style.width;
		var col = o.gridColElms[colIndex];
		col.style.width = w;
		
		var thCW = o.crWColsRow.cells[colIndex].clientWidth;
		var tdCW = o.crWRowDataTbl.cells[colIndex].clientWidth;
		
		if(tf_isIE || tf_isIE7)
			o.tbl.style.width = o.headTbl.clientWidth+'px';
		
		if(thCW != tdCW && !tf_isIE && !tf_isIE7)
			o.headTbl.style.width = o.tbl.clientWidth+'px'; 
		
		if(afterColResizedFn!=null) afterColResizedFn.call(null,o,colIndex);			
	}	
	
	if(this.tbl.clientWidth != this.headTbl.clientWidth)
		this.tbl.style.width = this.headTbl.clientWidth+'px';
	
}

TF.prototype.RemoveGridLayout = function()
/*====================================================
	- removes the grid layout
=====================================================*/
{
	if(!this.gridLayout) return;		
	var t = this.tbl.parentNode.removeChild(this.tbl);
	this.tblMainCont.parentNode.insertBefore(t, this.tblMainCont);
	this.tblMainCont.parentNode.removeChild( this.tblMainCont );

	this.tblMainCont = null;
	this.headTblCont = null;
	this.headTbl = null;
	this.tblCont = null;
	
	this.tbl.outerHTML = this.sourceTblHtml;
	this.tbl = tf_Id(this.id); //needed to keep reference
}