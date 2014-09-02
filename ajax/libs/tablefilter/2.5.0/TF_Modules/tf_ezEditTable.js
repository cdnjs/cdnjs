/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- ezEditTable Adapter v1.1
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
-------------------------------------------------------------------------*/

TF.prototype.SetEditable = function()
/*====================================================
	- Sets selection or edition features by loading 
	ezEditTable script by Max Guglielmi
=====================================================*/
{                   
	if(!this.selectable && !this.editable){ return; }    
	var f = this.fObj;
	this.ezEditTableConfig = 	f.ezEditTable_config!=undefined ? f.ezEditTable_config : {};
	this.ezEditTableConfig.name = this.ezEditTableConfig['name']!=undefined ? f.ezEditTable_config.name : 'ezedittable';
	this.ezEditTableConfig.src = this.ezEditTableConfig['src']!=undefined ? f.ezEditTable_config.src : this.basePath+'ezEditTable/ezEditTable.js';
	//ezEditTable stylesheet not imported by default as filtergrid.css applies
	this.ezEditTableConfig.loadStylesheet = this.ezEditTableConfig['loadStylesheet']!=undefined ? f.ezEditTable_config.loadStylesheet : false;
	this.ezEditTableConfig.stylesheet = this.ezEditTableConfig['stylesheet']!=undefined ? f.ezEditTable_config.stylesheet : this.basePath+'ezEditTable/ezEditTable.css';
	this.ezEditTableConfig.stylesheetName = this.ezEditTableConfig['stylesheetName']!=undefined ? f.ezEditTable_config.stylesheetName : 'ezEditTableCss';
	this.ezEditTableConfig.err = 'Failed to instantiate EditTable object.\n"ezEditTable" module may not be available.';
	
	if(tf_IsImported(this.ezEditTableConfig.src)){
		this._EnableEditable();
	} else {
		this.IncludeFile(
			this.ezEditTableConfig.name, 
			this.ezEditTableConfig.src, 
			this._EnableEditable
		);
	}
	if(this.ezEditTableConfig.loadStylesheet && !tf_IsImported(this.ezEditTableConfig.stylesheet, 'link')){
		this.IncludeFile(
			this.ezEditTableConfig.stylesheetName, 
			this.ezEditTableConfig.stylesheet, 
			null, 'link'
		);
	}
}

TF.prototype.RemoveEditable = function()
/*====================================================
	- Removes selection or edition features
=====================================================*/
{
	if(this.ezEditTable){
		if(this.selectable){
			this.ezEditTable.Selection.ClearSelections();
			this.ezEditTable.Selection.Remove();
		}
		if(this.editable) this.ezEditTable.Editable.Remove();
	}
}

TF.prototype.ResetEditable = function()
/*====================================================
	- Resets selection or edition features after
	removal
=====================================================*/
{
	if(this.ezEditTable){
		if(this.selectable) this.ezEditTable.Selection.Set();
		if(this.editable) this.ezEditTable.Editable.Set();
	}
}

TF.prototype._EnableEditable = function(o)
{
	if(!o) o = this;
	//start row for EditTable constructor needs to be calculated
	var startRow;
	var thead = tf_Tag(o.tbl,'thead');
	//if thead exists and startRow not specified, startRow is calculated automatically by EditTable
	if(thead.length > 0 && !o.ezEditTableConfig.startRow) startRow = undefined; 
	//otherwise startRow config property if any or TableFilter refRow
	else startRow = o.ezEditTableConfig.startRow || o.refRow;
	
	//Enables scroll into view feature if not defined	
	o.ezEditTableConfig.scroll_into_view = o.ezEditTableConfig.scroll_into_view!=undefined ? o.ezEditTableConfig.scroll_into_view : true;
	o.ezEditTableConfig.base_path = o.ezEditTableConfig.base_path!=undefined ? o.ezEditTableConfig.base_path : o.basePath + 'ezEditTable/';
	o.ezEditTableConfig.editable = o.editable;
	o.ezEditTableConfig.selection = o.selectable;
	if(o.selectable)
	 o.ezEditTableConfig.default_selection = o.ezEditTableConfig.default_selection!=undefined ? o.ezEditTableConfig.default_selection : 'row';
	//CSS Styles
	o.ezEditTableConfig.active_cell_css = o.ezEditTableConfig.active_cell_css!=undefined ? o.ezEditTableConfig.active_cell_css : 'ezETSelectedCell';
	
	o._lastValidRowIndex = 0;
	o._lastRowIndex = 0;	
	
	if(o.selectable){
		//Row navigation needs to be calculated according to TableFilter's validRowsIndex array 
		function onAfterSelection(et, selecteElm, e){
			if(!o.validRowsIndex) return; //table is not filtered
			var row = et.defaultSelection != 'row' ? selecteElm.parentNode : selecteElm;
			var cell = selecteElm.nodeName=='TD' ? selecteElm : null; //cell for default_selection = 'both' or 'cell'
			var keyCode = e != undefined ? et.Event.GetKey(e) : 0;
			var isRowValid = o.validRowsIndex.tf_Has(row.rowIndex);
			var nextRowIndex;
			var d = (keyCode == 34 || keyCode == 33 ? (o.pagingLength || et.nbRowsPerPage) : 1); //pgup/pgdown keys

			//If next row is not valid, next valid filtered row needs to be calculated
			if(!isRowValid){					
				//Selection direction up/down		
				if(row.rowIndex>o._lastRowIndex){
					if(row.rowIndex >= o.validRowsIndex[o.validRowsIndex.length-1]) //last row
						nextRowIndex = o.validRowsIndex[o.validRowsIndex.length-1];
					else{
						var calcRowIndex = (o._lastValidRowIndex + d);
						if(calcRowIndex > (o.validRowsIndex.length-1))
							nextRowIndex = o.validRowsIndex[o.validRowsIndex.length-1];
						else nextRowIndex = o.validRowsIndex[calcRowIndex];
					}
				} else{
					if(row.rowIndex < o.validRowsIndex[0]) nextRowIndex = o.validRowsIndex[0];//first row
					else{ 
						var v = o.validRowsIndex[o._lastValidRowIndex - d];
						nextRowIndex = v ? v : o.validRowsIndex[0];
					}
				}
				o._lastRowIndex = row.rowIndex;
				DoSelection(nextRowIndex);				
			} else{
				//If filtered row is valid, special calculation for pgup/pgdown keys
				if(keyCode!=34 && keyCode!=33){						
					o._lastValidRowIndex = o.validRowsIndex.tf_IndexByValue(row.rowIndex);
					o._lastRowIndex = row.rowIndex;
				} else {
					if(keyCode == 34){ //pgdown
						if((o._lastValidRowIndex + d) <= (o.validRowsIndex.length-1)) //last row
							nextRowIndex = o.validRowsIndex[o._lastValidRowIndex + d];
						else nextRowIndex = o.validRowsIndex[o.validRowsIndex.length-1];
					} else { //pgup
						if((o._lastValidRowIndex - d) < (o.validRowsIndex[0])) //first row
							nextRowIndex = o.validRowsIndex[0];
						else nextRowIndex = o.validRowsIndex[o._lastValidRowIndex - d];
					}
					o._lastRowIndex = nextRowIndex;
					o._lastValidRowIndex = o.validRowsIndex.tf_IndexByValue(nextRowIndex);
					DoSelection(nextRowIndex);
				}					
			}

			//Next valid filtered row needs to be selected
			function DoSelection(nextRowIndex){
				if(et.defaultSelection == 'row'){ 
					et.Selection.SelectRowByIndex(nextRowIndex);						
				} else {
					et.ClearSelections();
					var cellIndex = selecteElm.cellIndex;
					var row = o.tbl.rows[nextRowIndex];
					if(et.defaultSelection == 'both') et.Selection.SelectRowByIndex(nextRowIndex);
					if(row) et.Selection.SelectCell(row.cells[cellIndex]);
				}
				//Table is filtered
				if(o.validRowsIndex.length != o.GetRowsNb()){
					var row = o.tbl.rows[nextRowIndex];
				   	if(row) row.scrollIntoView(false);
				   	if(cell){
						if(cell.cellIndex==(o.GetCellsNb()-1) && o.gridLayout) o.tblCont.scrollLeft = 100000000;
						else if(cell.cellIndex==0 && o.gridLayout) o.tblCont.scrollLeft = 0;
						else cell.scrollIntoView(false);
				  	}
				}
			}	
		}
		
		//Page navigation has to be enforced whenever selected row is out of the current page range
		function onBeforeSelection(et, selecteElm, e){
			var row = et.defaultSelection != 'row' ? selecteElm.parentNode : selecteElm;
			if(o.paging){
				if(o.nbPages>1){
					et.nbRowsPerPage = o.pagingLength; //page length is re-assigned in case it has changed
					var pagingEndRow = parseInt(o.startPagingRow) + parseInt(o.pagingLength);
					var rowIndex = row.rowIndex;
					if((rowIndex == o.validRowsIndex[o.validRowsIndex.length-1]) && o.currentPageNb!=o.nbPages) o.SetPage('last');
					else if((rowIndex == o.validRowsIndex[0]) && o.currentPageNb!=1) o.SetPage('first');
					else if(rowIndex > o.validRowsIndex[pagingEndRow-1] && rowIndex < o.validRowsIndex[o.validRowsIndex.length-1]) o.SetPage('next');
					else if(rowIndex < o.validRowsIndex[o.startPagingRow] && rowIndex > o.validRowsIndex[0]) o.SetPage('previous');
				}
			}
		}
		
		//Selected row needs to be visible when paging is activated
		if(o.paging){
			o.onAfterChangePage = function(tf, i){
				var row = tf.ezEditTable.Selection.GetActiveRow();
				if(row) row.scrollIntoView(false);
				var cell = tf.ezEditTable.Selection.GetActiveCell();
				if(cell) cell.scrollIntoView(false);
			}
		}
		
		//Rows navigation when rows are filtered is performed with the EditTable row selection callback events
		if(o.ezEditTableConfig.default_selection=='row'){
			var fnB = o.ezEditTableConfig.on_before_selected_row;
			o.ezEditTableConfig.on_before_selected_row = function(){ 
				onBeforeSelection(arguments[0], arguments[1], arguments[2]); 
				if(fnB) fnB.call(null, arguments[0], arguments[1], arguments[2]);
			};
			var fnA = o.ezEditTableConfig.on_after_selected_row;
			o.ezEditTableConfig.on_after_selected_row = function(){ 
				onAfterSelection(arguments[0], arguments[1], arguments[2]); 
				if(fnA) fnA.call(null, arguments[0], arguments[1], arguments[2]);
			};			
		} else { 
			var fnB = o.ezEditTableConfig.on_before_selected_cell;
			o.ezEditTableConfig.on_before_selected_cell = function(){ 
				onBeforeSelection(arguments[0], arguments[1], arguments[2]); 
				if(fnB) fnB.call(null, arguments[0], arguments[1], arguments[2]);
			};
			var fnA = o.ezEditTableConfig.on_after_selected_cell;
			o.ezEditTableConfig.on_after_selected_cell = function(){ 
				onAfterSelection(arguments[0], arguments[1], arguments[2]); 
				if(fnA) fnA.call(null, arguments[0], arguments[1], arguments[2]);
			};
		}		
	}
	if(o.editable){
		//Added or removed rows, TF rows number needs to be re-calculated
		var fnC = o.ezEditTableConfig.on_added_dom_row;
		o.ezEditTableConfig.on_added_dom_row = function(){
			o.nbFilterableRows++;
			if(!o.paging){ o.RefreshNbRows(); } 
			else { 
				o.nbRows++; o.nbVisibleRows++; o.nbFilterableRows++;
				o.paging=false; o.RemovePaging(); o.AddPaging(false); 
			}
			if(o.alternateBgs) o.SetAlternateRows();
			if(fnC) fnC.call(null, arguments[0], arguments[1], arguments[2]);
		};
		if(o.ezEditTableConfig.actions && o.ezEditTableConfig.actions['delete']){
			var fnD = o.ezEditTableConfig.actions['delete'].on_after_submit;
			o.ezEditTableConfig.actions['delete'].on_after_submit = function(){
				o.nbFilterableRows--;
				if(!o.paging){ o.RefreshNbRows(); } 
				else { 
					o.nbRows--; o.nbVisibleRows--; o.nbFilterableRows--;
					o.paging=false; o.RemovePaging(); o.AddPaging(false); 
				}
				if(o.alternateBgs) o.SetAlternateRows();
				if(fnD) fnD.call(null, arguments[0], arguments[1]);
			}
		}
	}
		
	try{
		o.ezEditTable = new EditTable(o.id, o.ezEditTableConfig, startRow);	
		o.ezEditTable.Init();
	} catch(e) { alert(o.ezEditTableConfig.err); }
}