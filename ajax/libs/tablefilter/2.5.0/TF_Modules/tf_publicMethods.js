/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- Additional handy public methods for developers v1.3
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
-------------------------------------------------------------------------*/
	
TF.prototype.HasGrid = function()
/*====================================================
	- checks if table has a filter grid
	- returns a boolean
=====================================================*/
{
	return this.hasGrid;
}

TF.prototype.GetFiltersId = function()
/*====================================================
	- returns an array containing filters ids
	- Note that hidden filters are also returned
=====================================================*/
{
	if( !this.hasGrid ) return;
	return this.fltIds;
}

TF.prototype.GetValidRowsIndex = function(reCalc)
/*====================================================
	- returns an array containing valid rows indexes 
	(valid rows upon filtering)
=====================================================*/
{
	if( !this.hasGrid ) return;
	if(!reCalc){ return this.validRowsIndex; }
	this.validRowsIndex = [];
	for(var k=this.refRow; k<this.GetRowsNb(true); k++){
		var r = this.tbl.rows[k];
		if(!this.paging){
			if(this.GetRowDisplay(r) != 'none') 
				this.validRowsIndex.push(r.rowIndex);
		} else {
			if(r.getAttribute('validRow') == 'true' || r.getAttribute('validRow') == null)
				this.validRowsIndex.push(r.rowIndex);
		}
	}
	return this.validRowsIndex;
}

TF.prototype.GetFiltersRowIndex = function()
/*====================================================
	- Returns the index of the row containing the 
	filters
=====================================================*/
{
	if( !this.hasGrid ) return;
	return this.filtersRowIndex;
}

TF.prototype.GetHeadersRowIndex = function()
/*====================================================
	- Returns the index of the headers row
=====================================================*/
{
	if( !this.hasGrid ) return;
	return this.headersRow;
}

TF.prototype.GetStartRowIndex = function()
/*====================================================
	- Returns the index of the row from which will 
	start the filtering process (1st filterable row)
=====================================================*/
{
	if( !this.hasGrid ) return;
	return this.refRow;
}

TF.prototype.GetLastRowIndex = function()
/*====================================================
	- Returns the index of the last row
=====================================================*/
{
	if( !this.hasGrid ) return;
	return (this.nbRows-1);
}

//TF.prototype.AddPaging = function(filterTable)
/*====================================================
	- Adds paging feature if filter grid bar is 
	already set
	- Param(s):
		- execFilter: if true table is filtered 
		(boolean)
=====================================================*/
/*{
	if( !this.hasGrid || this.paging ) return;
	this.paging = true; 
	this.isPagingRemoved = true; 
	this.SetPaging();
	if(filterTable) this.Filter();
}*/

TF.prototype.GetHeaderElement = function(colIndex)
/*====================================================
	- returns a header DOM element for a given column
	index
=====================================================*/
{
	var table = (this.gridLayout) ? this.headTbl : this.tbl;
	var header, tHead = tf_Tag(this.tbl,'thead');
	for(var i=0; i<this.nbCells; i++)
	{
		if(i != colIndex) continue;
		if(tHead.length == 0)
			header = table.rows[this.headersRow].cells[i];
		if(tHead.length == 1)
			header = tHead[0].rows[this.headersRow].cells[i];
		break;
	}
	return header;
}

TF.prototype.GetTableData = function()
/*====================================================
	- returns an array containing table data:
	[rowindex,[value1,value2,value3...]]
=====================================================*/
{
	var row = this.tbl.rows;
	for(var k=this.refRow; k<this.nbRows; k++)
	{
		var rowData, cellData;
		rowData = [k,[]];
		var cells = row[k].cells;
		for(var j=0; j<cells.length; j++)
		{// this loop retrieves cell data
			var cell_data = this.GetCellData(j, cells[j]);
			rowData[1].push(cell_data);
		}
		this.tblData.push(rowData)
	}
	return this.tblData;
}

TF.prototype.GetFilteredData = function(includeHeaders)
/*====================================================
	- returns an array containing filtered data:
	[rowindex,[value1,value2,value3...]]
=====================================================*/
{
	if(!this.validRowsIndex) return [];
	var row = this.tbl.rows;
	var filteredData = [];
	if(includeHeaders){
		var table = (this.gridLayout) ? this.headTbl : this.tbl;
		var r = table.rows[this.headersRow];
		var rowData = [r.rowIndex,[]];
		for(var j=0; j<this.nbCells; j++)
		{
			var headerText = this.GetCellData(j, r.cells[j]);
			rowData[1].push(headerText);
		}
		filteredData.push(rowData);
	}
	//for(var i=0; i<this.validRowsIndex.length; i++)
	var validRows = this.GetValidRowsIndex(true); 
	for(var i=0; i<validRows.length; i++)
	{
		var rowData, cellData;
		rowData = [this.validRowsIndex[i],[]];
		var cells = row[this.validRowsIndex[i]].cells;
		for(var j=0; j<cells.length; j++)
		{
			var cell_data = this.GetCellData(j, cells[j]);
			rowData[1].push(cell_data);
		}
		filteredData.push(rowData);
	}
	return filteredData;
}

TF.prototype.GetFilteredDataCol = function(colIndex)
/*====================================================
	- returns an array containing filtered data of a
	specified column. 
	- Params:
		- colIndex: index of the column (number)
	- returned array:
	[value1,value2,value3...]
=====================================================*/
{
	if(colIndex==undefined) return [];
	var data =  this.GetFilteredData();
	var colData = [];
	for(var i=0; i<data.length; i++)
	{
		var r = data[i];
		var d = r[1]; //cols values of current row
		var c = d[colIndex]; //data of searched column
		colData.push(c);
	}
	return colData;
}

TF.prototype.GetConfigObject = function()
/*====================================================
	- returns the original configuration object
=====================================================*/
{
	return this.fObj;
}

TF.prototype.GetImportedModules = function()
/*====================================================
	- returns the modules imported by the 
	tablefilter.js document
=====================================================*/
{
	return this.importedModules || [];
}

TF.prototype.GetFilterableRowsNb = function()
/*====================================================
	- returns the total number of rows that can be
	filtered
=====================================================*/
{
	return this.GetRowsNb(false);
}

