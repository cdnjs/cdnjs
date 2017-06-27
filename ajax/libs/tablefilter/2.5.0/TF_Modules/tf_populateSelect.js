/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- Populate Select filters feature v1.2
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
-------------------------------------------------------------------------*/

TF.prototype.PopulateSelect = function(colIndex,isExternal,extSlcId)
{ 
	this.EvtManager(
		this.Evt.name.populateselect,
		{ slcIndex:colIndex, slcExternal:isExternal, slcId:extSlcId }
	); 
}

TF.prototype._PopulateSelect = function(colIndex,isRefreshed,isExternal,extSlcId)
/*====================================================
	- populates drop-down filters
=====================================================*/
{
	isExternal = (isExternal==undefined) ? false : isExternal;
	var slcId = this.fltIds[colIndex];
	if( tf_Id(slcId)==null && !isExternal ) return;
	if( tf_Id(extSlcId)==null && isExternal ) return;
	var slc = (!isExternal) ? tf_Id(slcId) : tf_Id(extSlcId);
	var o = this, row = this.tbl.rows;
	var fillMethod = this.slcFillingMethod.tf_LCase();
	var optArray = [], slcInnerHtml = '', opt0;
	var isCustomSlc = (this.hasCustomSlcOptions  //custom select test
						&& this.customSlcOptions.cols.tf_Has(colIndex));
	var optTxt = []; //custom selects text
	var activeFlt;
	if(isRefreshed && this.activeFilterId){
		activeFlt = this.activeFilterId.split('_')[0];
		activeFlt = activeFlt.split(this.prfxFlt)[1];
	}

	/*** remember grid values ***/
	var flts_values = [], fltArr = [];
	if(this.rememberGridValues)
	{
		flts_values = tf_CookieValueArray(this.fltsValuesCookie, this.separator);
		if(flts_values != undefined && flts_values.toString().tf_Trim() != ''){
			if(this.hasCustomSlcOptions && this.customSlcOptions.cols.tf_Has(colIndex)){
				fltArr.push(flts_values[colIndex]);
			} else { fltArr = flts_values[colIndex].split(' '+o.orOperator+' '); }
		}			
	}

	var excludedOpts = null, filteredDataCol = null;
	if(isRefreshed && this.disableExcludedOptions){ excludedOpts = []; filteredDataCol = []; }

	for(var k=this.refRow; k<this.nbRows; k++)
	{
		// always visible rows don't need to appear on selects as always valid
		if( this.hasVisibleRows && this.visibleRows.tf_Has(k) && !this.paging ) 
			continue;

		var cell = row[k].cells;
		var nchilds = cell.length;

		if(nchilds == this.nbCells && !isCustomSlc)
		{// checks if row has exact cell #
			for(var j=0; j<nchilds; j++)// this loop retrieves cell data
			{
				if((colIndex==j && (!isRefreshed || (isRefreshed && this.disableExcludedOptions))) ||
					(colIndex==j && isRefreshed && ((row[k].style.display == '' && !this.paging) || 
					( this.paging && (!this.validRowsIndex || (this.validRowsIndex && this.validRowsIndex.tf_Has(k)))
						&& ((activeFlt==undefined || activeFlt==colIndex)  || (activeFlt!=colIndex && this.validRowsIndex.tf_Has(k) ))) )))
				{
					var cell_data = this.GetCellData(j, cell[j]);
					var cell_string = cell_data.tf_MatchCase(this.matchCase);//Váry Péter's patch
					// checks if celldata is already in array
					if(!optArray.tf_Has(cell_string,this.matchCase)) optArray.push(cell_data);
					
					if(isRefreshed && this.disableExcludedOptions){
						if(!filteredDataCol[j]) filteredDataCol[j] = this.GetFilteredDataCol(j);
						if(!filteredDataCol[j].tf_Has(cell_string,this.matchCase) 
							&& !excludedOpts.tf_Has(cell_string,this.matchCase) && !this.isFirstLoad) excludedOpts.push(cell_data);
					}
				}//if colIndex==j
			}//for j
		}//if
	}//for k
	
	//Retrieves custom values
	if(isCustomSlc)
	{
		var customValues = this.__getCustomValues(colIndex);
		optArray = customValues[0];
		optTxt = customValues[1];
	}
	
	if(this.sortSlc && !isCustomSlc){
		if (!this.matchCase){ 
			optArray.sort(tf_IgnoreCaseSort); 
			if(excludedOpts) excludedOpts.sort(tf_IgnoreCaseSort); 
		} else { optArray.sort(); if(excludedOpts){ excludedOpts.sort(); } }
	}

	if(this.sortNumAsc && this.sortNumAsc.tf_Has(colIndex))
	{//asc sort
		try{
			optArray.sort( tf_NumSortAsc );
			if(excludedOpts) excludedOpts.sort( tf_NumSortAsc );
			if(isCustomSlc) optTxt.sort( tf_NumSortAsc );
		} catch(e) {
			optArray.sort(); if(excludedOpts){ excludedOpts.sort(); } 
			if(isCustomSlc) optTxt.sort();
		}//in case there are alphanumeric values
	}
	if(this.sortNumDesc && this.sortNumDesc.tf_Has(colIndex))
	{//desc sort
		try{
			optArray.sort( tf_NumSortDesc ); 
			if(excludedOpts) excludedOpts.sort( tf_NumSortDesc );
			if(isCustomSlc) optTxt.sort( tf_NumSortDesc );
		} catch(e) {
			optArray.sort(); if(excludedOpts){ excludedOpts.sort(); }
			if(isCustomSlc) optTxt.sort();
		}//in case there are alphanumeric values
	}
	
	AddOpts();//populates drop-down
	
	function AddOpt0()
	{// adds 1st option
		if( fillMethod == 'innerhtml' )
			slcInnerHtml += '<option value="">'+o.displayAllText+'</option>';
		else {
			var opt0 = tf_CreateOpt((!o.enableSlcResetFilter ? '' : o.displayAllText),'');
			if(!o.enableSlcResetFilter) opt0.style.display = 'none';
			slc.appendChild(opt0);
			if(o.enableEmptyOption){
				var opt1 = tf_CreateOpt(o.emptyText,o.emOperator);
				slc.appendChild(opt1);
			}
			if(o.enableNonEmptyOption){
				var opt2 = tf_CreateOpt(o.nonEmptyText,o.nmOperator);
				slc.appendChild(opt2);
			}
		}
	}
	
	function AddOpts()
	{// populates select
		var slcValue = slc.value;
		slc.innerHTML = '';
		AddOpt0();			
		
		for(var y=0; y<optArray.length; y++)
		{	
			if(optArray[y]=='') continue;
			var val = optArray[y]; //option value
			var lbl = (isCustomSlc) ? optTxt[y] : optArray[y]; //option text
			var isDisabled = false;
			if(isRefreshed && o.disableExcludedOptions && 
				excludedOpts.tf_Has(val.tf_MatchCase(o.matchCase), o.matchCase))
				isDisabled = true;
			
			if( fillMethod == 'innerhtml' )
			{
				var slcAttr = '';
				if( o.fillSlcOnDemand && slcValue==optArray[y] )
					slcAttr = 'selected="selected"';
				slcInnerHtml += '<option value="'+val+'" '
									+slcAttr+ (isDisabled ? 'disabled="disabled"' : '')+'>'+lbl+'</option>';
			} else {
				var opt;
				//fill select on demand
				if(o.fillSlcOnDemand && slcValue==optArray[y] && o['col'+colIndex]==o.fltTypeSlc)
					opt = tf_CreateOpt( lbl, val, true );
				else{
					if( o['col'+colIndex]!=o.fltTypeMulti )
						opt = tf_CreateOpt( lbl, val,
											(flts_values[colIndex]!=' ' && val==flts_values[colIndex]) 
											? true : false 	);
					else
					{
						opt = tf_CreateOpt( lbl, val,
											(fltArr.tf_Has(optArray[y].tf_MatchCase(o.matchCase),o.matchCase) 
												|| fltArr.toString().indexOf(val)!= -1)  
											? true : false 	);
					}
				}
				if(isDisabled) opt.disabled = true;
				slc.appendChild(opt);
			}
		}// for y

		if( fillMethod == 'innerhtml' )	slc.innerHTML += slcInnerHtml;
		slc.setAttribute('filled','1');			
	}// fn AddOpt
}

TF.prototype.__deferMultipleSelection = function(slc,index,filter)
/*====================================================
	- IE bug: it seems there is no way to make 
	multiple selections programatically, only last 
	selection is kept (multiple select previously 
	populated via DOM)
	- Work-around: defer selection with a setTimeout
	If you find a more elegant solution to 
	this let me know ;-)
	- For the moment only this solution seems 
	to work!
	- Params: 
		- slc = select object (select obj)
		- index to be selected (integer)
		- execute filtering (boolean)
=====================================================*/
{
	if(slc.nodeName.tf_LCase() != 'select') return;
	var doFilter = (filter==undefined) ? false : filter;
	var o = this;
	window.setTimeout(
		function(){
			slc.options[0].selected = false;
			
			if(slc.options[index].value=='') 
				slc.options[index].selected = false;
			else
			slc.options[index].selected = true; 
			if(doFilter) o.Filter();
		},
		.1
	);
}

TF.prototype.__getCustomValues = function(colIndex)
/*====================================================
	- Returns an array [[values],[texts]] with 
	custom values for a given filter
	- Param: column index (integer)
=====================================================*/
{
	if(colIndex==undefined) return;
	var isCustomSlc = (this.hasCustomSlcOptions  //custom select test
						&& this.customSlcOptions.cols.tf_Has(colIndex));
	if(!isCustomSlc) return;
	var optTxt = [], optArray = [];
	var index = this.customSlcOptions.cols.tf_IndexByValue(colIndex);
	var slcValues = this.customSlcOptions.values[index];
	var slcTexts = this.customSlcOptions.texts[index];
	var slcSort = this.customSlcOptions.sorts[index];
	for(var r=0; r<slcValues.length; r++)
	{
		optArray.push(slcValues[r]);
		if(slcTexts[r]!=undefined)
			optTxt.push(slcTexts[r]);
		else
			optTxt.push(slcValues[r]);
	}
	if(slcSort)
	{
		optArray.sort();
		optTxt.sort();
	}
	return [optArray,optTxt];
}

function tf_CreateOpt(text,value,isSel)
/*====================================================
	- creates an option element and returns it:
		- text: displayed text (string)
		- value: option value (string)
		- isSel: is selected option (boolean)
=====================================================*/
{
	var isSelected = isSel ? true : false;
	var opt = (isSelected) 
		? tf_CreateElm('option',['value',value],['selected','true'])
		: tf_CreateElm('option',['value',value]);
	opt.appendChild(tf_CreateText(text));
	return opt;
}