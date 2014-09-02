/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- Alternating rows color feature v1.0
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
-------------------------------------------------------------------------*/

TF.prototype.SetRowBg = function(rIndex,index)
/*====================================================
	- sets row background color
	- Params:
		- rIndex: row index (numeric value)
		- index: valid row collection index needed to
		calculate bg color
=====================================================*/
{
	if(!this.alternateBgs || isNaN(rIndex)) return;
	var rows = this.tbl.rows;
	var i = (index==undefined) ? rIndex : index;
	this.RemoveRowBg(rIndex);
	tf_AddClass(
		rows[rIndex],
		(i%2) ? this.rowBgEvenCssClass : this.rowBgOddCssClass
	);
}

TF.prototype.RemoveRowBg = function(index)
/*====================================================
	- removes row background color
	- Params:
		- index: row index (numeric value)
=====================================================*/
{
	if(isNaN(index)) return;
	var rows = this.tbl.rows;
	tf_RemoveClass(rows[index],this.rowBgOddCssClass);
	tf_RemoveClass(rows[index],this.rowBgEvenCssClass);
}

TF.prototype.SetAlternateRows = function()
/*====================================================
	- alternates row colors for better readability
=====================================================*/
{
	if( !this.hasGrid && !this.isFirstLoad ) return;
	var rows = this.tbl.rows;
	var noValidRowsIndex = this.validRowsIndex==null;
	var beginIndex = (noValidRowsIndex) ? this.refRow : 0; //1st index
	var indexLen = (noValidRowsIndex) // nb indexes
		? (this.nbFilterableRows+beginIndex) : this.validRowsIndex.length;

	var idx = 0;
	for(var j=beginIndex; j<indexLen; j++)//alternates bg color
	{
		var rIndex = (noValidRowsIndex) ? j : this.validRowsIndex[j];
		this.SetRowBg(rIndex,idx);
		idx++;
	}
}

TF.prototype.RemoveAlternateRows = function()
/*====================================================
	- removes alternate row colors
=====================================================*/
{
	if(!this.hasGrid) return;
	var row = this.tbl.rows;
	for(var i=this.refRow; i<this.nbRows; i++)
		this.RemoveRowBg(i);
	this.isStartBgAlternate = true;
}