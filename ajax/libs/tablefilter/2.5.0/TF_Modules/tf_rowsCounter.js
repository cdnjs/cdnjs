/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- Rows counter feature v1.3
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
-------------------------------------------------------------------------*/

TF.prototype.SetRowsCounter = function()
/*====================================================
	- Generates rows counter label
=====================================================*/
{
	if(!this.hasGrid && !this.isFirstLoad) return;
	if( this.rowsCounterSpan!=null ) return;
	var f = this.fObj;
	this.rowsCounterTgtId =		f.rows_counter_target_id!=undefined //id of custom container element
								? f.rows_counter_target_id : null;
	this.rowsCounterDiv =		null; //element containing tot nb rows
	this.rowsCounterSpan =		null; //element containing tot nb rows label
	this.rowsCounterText =		f.rows_counter_text!=undefined ? f.rows_counter_text : 'Rows: '; //defines rows counter text
	this.fromToTextSeparator = 	f.from_to_text_separator!=undefined ? f.from_to_text_separator : '-';
	this.overText = 			f.over_text!=undefined ? f.over_text : ' / ';
	this.totRowsCssClass =		f.tot_rows_css_class!=undefined ? f.tot_rows_css_class : 'tot'; //defines css class rows counter
	this.onBeforeRefreshCounter = tf_IsFn(f.on_before_refresh_counter) ? f.on_before_refresh_counter : null; //callback raised before counter is refreshed
	this.onAfterRefreshCounter = tf_IsFn(f.on_after_refresh_counter) ? f.on_after_refresh_counter : null; //callback raised after counter is refreshed
	var countDiv = tf_CreateElm( 'div',['id',this.prfxCounter+this.id] ); //rows counter container
	countDiv.className = this.totRowsCssClass;
	var countSpan = tf_CreateElm( 'span',['id',this.prfxTotRows+this.id] ); //rows counter label
	var countText = tf_CreateElm( 'span',['id',this.prfxTotRowsTxt+this.id] );
	countText.appendChild( tf_CreateText(this.rowsCounterText) );
	
	// counter is added to defined element
	if(this.rowsCounterTgtId==null) this.SetTopDiv();
	var targetEl = ( this.rowsCounterTgtId==null ) ? this.lDiv : tf_Id( this.rowsCounterTgtId );
	
	//IE only: clears all for sure
	if(this.rowsCounterDiv && tf_isIE)
		this.rowsCounterDiv.outerHTML = '';
	
	if( this.rowsCounterTgtId==null )
	{//default container: 'lDiv'
		countDiv.appendChild(countText);
		countDiv.appendChild(countSpan);
		targetEl.appendChild(countDiv);
	}
	else
	{// custom container, no need to append statusDiv
		targetEl.appendChild(countText);
		targetEl.appendChild(countSpan);
	}
	this.rowsCounterDiv = tf_Id( this.prfxCounter+this.id );
	this.rowsCounterSpan = tf_Id( this.prfxTotRows+this.id );
	
	this.RefreshNbRows();	
}

TF.prototype.RemoveRowsCounter = function()
/*====================================================
	- Removes rows counter label
=====================================================*/
{
	if(!this.hasGrid) return;
	if( this.rowsCounterSpan==null ) return;
	
	if(this.rowsCounterTgtId==null && this.rowsCounterDiv)
	{
		//IE only: clears all for sure
		if(tf_isIE) this.rowsCounterDiv.outerHTML = '';
		else
			this.rowsCounterDiv.parentNode.removeChild( 
				this.rowsCounterDiv
			);
	} else {
		tf_Id( this.rowsCounterTgtId ).innerHTML = '';
	}
	this.rowsCounterSpan = null;
	this.rowsCounterDiv = null;
}

TF.prototype.RefreshNbRows = function(p)
/*====================================================
	- Shows total number of filtered rows
=====================================================*/
{
	if(this.rowsCounterSpan == null) return;
	if(this.onBeforeRefreshCounter) this.onBeforeRefreshCounter.call(null, this, this.rowsCounterSpan);
	var totTxt;
	if(!this.paging)
	{
		if(p!=undefined && p!='') totTxt=p;
		else totTxt = (this.nbFilterableRows - this.nbHiddenRows - (this.hasVisibleRows ? this.visibleRows.length : 0) );
	} else {
		var paging_start_row = parseInt(this.startPagingRow)+((this.nbVisibleRows>0) ? 1 : 0);//paging start row
		var paging_end_row = (paging_start_row+this.pagingLength)-1 <= this.nbVisibleRows 
			? (paging_start_row+this.pagingLength)-1 : this.nbVisibleRows;
		totTxt = paging_start_row+ this.fromToTextSeparator +paging_end_row+ this.overText +this.nbVisibleRows;
	} 
	this.rowsCounterSpan.innerHTML = totTxt;
	if(this.onAfterRefreshCounter) this.onAfterRefreshCounter.call(null, this, this.rowsCounterSpan, totTxt);
}