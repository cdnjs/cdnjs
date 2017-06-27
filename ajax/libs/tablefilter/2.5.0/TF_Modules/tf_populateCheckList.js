/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- Populate Checklist filters feature v1.2
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
-------------------------------------------------------------------------*/

TF.prototype.PopulateCheckList = function(colIndex, isExternal, extFltId)
{
	this.EvtManager(
		this.Evt.name.populatechecklist,
		{ slcIndex:colIndex, slcExternal:isExternal, slcId:extFltId }
	); 
}

TF.prototype._PopulateCheckList = function(colIndex, isExternal, extFltId)
/*====================================================
	- populates checklist filters
=====================================================*/
{
	isExternal = (isExternal==undefined) ? false : isExternal;
	var divFltId = this.prfxCheckListDiv+colIndex+'_'+this.id;
	if( tf_Id(divFltId)==null && !isExternal ) return;
	if( tf_Id(extFltId)==null && isExternal ) return;
	var flt = (!isExternal) ? this.checkListDiv[colIndex] : tf_Id(extFltId);
	var ul = tf_CreateElm('ul',['id',this.fltIds[colIndex]],['colIndex',colIndex]);
	ul.className = this.checkListCssClass;
	ul.onchange = this.Evt._OnCheckListChange;
	var o = this, row = this.tbl.rows;
	var optArray = [];
	var isCustomSlc = (this.hasCustomSlcOptions  //custom select test
						&& this.customSlcOptions.cols.tf_Has(colIndex));
	var optTxt = []; //custom selects text
	var activeFlt;
	if(this.refreshFilters && this.activeFilterId){
		activeFlt = this.activeFilterId.split('_')[0];
		activeFlt = activeFlt.split(this.prfxFlt)[1];
	}

	var excludedOpts = null, filteredDataCol = null;
	if(this.refreshFilters && this.disableExcludedOptions){ excludedOpts = []; filteredDataCol = []; }
	
	for(var k=this.refRow; k<this.nbRows; k++)
	{
		// always visible rows don't need to appear on selects as always valid
		if( this.hasVisibleRows && this.visibleRows.tf_Has(k) && !this.paging ) 
			continue;

		var cells = row[k].cells;
		var ncells = cells.length;

		if(ncells == this.nbCells && !isCustomSlc)
		{// checks if row has exact cell #
			for(var j=0; j<ncells; j++)
			{// this loop retrieves cell data
				if((colIndex==j && (!this.refreshFilters || (this.refreshFilters && this.disableExcludedOptions))) || 
					(colIndex==j && this.refreshFilters && ((row[k].style.display == '' && !this.paging) || 
					(this.paging && ((activeFlt==undefined || activeFlt==colIndex ) ||(activeFlt!=colIndex && this.validRowsIndex.tf_Has(k))) ))))
				{
					var cell_data = this.GetCellData(j, cells[j]);
					var cell_string = cell_data.tf_MatchCase(this.matchCase);//Váry Péter's patch
					// checks if celldata is already in array
					if(!optArray.tf_Has(cell_string,this.matchCase)) optArray.push(cell_data);
					
					if(this.refreshFilters && this.disableExcludedOptions){
						if(!filteredDataCol[j]) filteredDataCol[j] = this.GetFilteredDataCol(j);
						if(!filteredDataCol[j].tf_Has(cell_string,this.matchCase) 
							&& !excludedOpts.tf_Has(cell_string,this.matchCase) && !this.isFirstLoad) excludedOpts.push(cell_data);
					}
				}
			}
		}
	}
	
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
		} else { optArray.sort(); if(excludedOpts){ excludedOpts.sort(); }  }
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

	AddChecks(this.separator);
	
	function AddTChecks()
	{// adds 1st option
		var chkCt = 1;
		var li0 = tf_CreateCheckItem(o.fltIds[colIndex]+'_0', '', o.displayAllText);
		li0.className = o.checkListItemCssClass;
		ul.appendChild(li0);
		li0.check.onclick = function(e){ o.__setCheckListValues(this); ul.onchange.call(null, e); };
		if(!o.enableCheckListResetFilter) li0.style.display = 'none';
		
		if(tf_isIE)
		{//IE: label looses check capability
			li0.label.onclick = function(){ li0.check.click(); };
		}
		
		if(o.enableEmptyOption){
			var li1 = tf_CreateCheckItem(o.fltIds[colIndex]+'_1', o.emOperator, o.emptyText);
			li1.className = o.checkListItemCssClass;
			ul.appendChild(li1);
			li1.check.onclick = function(e){ o.__setCheckListValues(this); ul.onchange.call(null, e); };				
			if(tf_isIE)
			{//IE: label looses check capability
				li1.label.onclick = function(){ li1.check.click(); };
			}
			chkCt++;
		}
		
		if(o.enableNonEmptyOption){
			var li2 = tf_CreateCheckItem(o.fltIds[colIndex]+'_2', o.nmOperator, o.nonEmptyText);
			li2.className = o.checkListItemCssClass;
			ul.appendChild(li2);
			li2.check.onclick = function(e){ o.__setCheckListValues(this); ul.onchange.call(null, e); };
			if(tf_isIE)
			{//IE: label looses check capability
				li2.label.onclick = function(){ li2.check.click(); };
			}
			chkCt++;
		}
		return chkCt;
	}
	
	function AddChecks(separator)
	{		
		var chkCt = AddTChecks();
		
		var flts_values = [], fltArr = []; //remember grid values
		var tmpVal = tf_CookieValueByIndex(o.fltsValuesCookie, colIndex, separator);
		if(tmpVal != undefined && tmpVal.tf_Trim().length > 0){
			if(o.hasCustomSlcOptions && o.customSlcOptions.cols.tf_Has(colIndex)){
				fltArr.push(tmpVal);
			} else { fltArr = tmpVal.split(' '+o.orOperator+' '); }
		}

		for(var y=0; y<optArray.length; y++)
		{				
			var val = optArray[y]; //item value
			var lbl = (isCustomSlc) ? optTxt[y] : val; //item text
			var li = tf_CreateCheckItem(o.fltIds[colIndex]+'_'+(y+chkCt), val, lbl);
			li.className = o.checkListItemCssClass;
			if(o.refreshFilters && o.disableExcludedOptions && 
				excludedOpts.tf_Has(val.tf_MatchCase(o.matchCase), o.matchCase)){ 
					tf_AddClass(li, o.checkListItemDisabledCssClass);
					li.check.disabled = true;
					li.disabled = true;
			} else
				li.check.onclick = function(e){ o.__setCheckListValues(this); ul.onchange.call(null, e); };
			ul.appendChild(li);

			if(val=='') li.style.display = 'none'; //item is hidden

			/*** remember grid values ***/
			if(o.rememberGridValues)
			{
				if((o.hasCustomSlcOptions && o.customSlcOptions.cols.tf_Has(colIndex) 
					&& fltArr.toString().indexOf(val)!= -1) 
					|| fltArr.tf_Has(val.tf_MatchCase(o.matchCase),o.matchCase))
				{
					li.check.checked = true;
					o.__setCheckListValues(li.check);
				}			
			}
			
			if(tf_isIE)
			{//IE: label looses check capability
				li.label.onclick = function(){ this.firstChild.click(); };	
			}
		}
	}
	
	if(this.fillSlcOnDemand) flt.innerHTML = '';
	flt.appendChild(ul);
	flt.setAttribute('filled','1');
	
	/*** remember grid values IE only, items remain un-checked ***/
	if(o.rememberGridValues && tf_isIE)
	{
		var slcIndexes = ul.getAttribute('indexes');
		if(slcIndexes != null)
		{
			var indSplit = slcIndexes.split(',');//items indexes
			for(var n=0; n<indSplit.length; n++)
			{
				var cChk = tf_Id(this.fltIds[colIndex]+'_'+indSplit[n]); //checked item
				if(cChk) cChk.checked = true;
			}
		}
	}
}

TF.prototype.__setCheckListValues = function(o)
/*====================================================
	- Sets checked items information of a checklist
=====================================================*/
{
	if(o==null) return;
	var chkValue = o.value; //checked item value
	var chkIndex = parseInt(o.id.split('_')[2]);
	var filterTag = 'ul', itemTag = 'li';
	var n = o;
	
	//ul tag search
	while(n.nodeName.tf_LCase() != filterTag)
		n = n.parentNode;

	if(n.nodeName.tf_LCase() != filterTag) return;
	
	var li = n.childNodes[chkIndex];
	var colIndex = n.getAttribute('colIndex');
	var fltValue = n.getAttribute('value'); //filter value (ul tag)
	var fltIndexes = n.getAttribute('indexes'); //selected items (ul tag)

	if(o.checked)		
	{
		if(chkValue=='')
		{//show all item
			if((fltIndexes!=null && fltIndexes!=''))
			{
				var indSplit = fltIndexes.split(this.separator);//items indexes
				for(var u=0; u<indSplit.length; u++)
				{//checked items loop
					var cChk = tf_Id(this.fltIds[colIndex]+'_'+indSplit[u]); //checked item
					if(cChk)
					{ 
						cChk.checked = false;
						tf_RemoveClass(
							n.childNodes[indSplit[u]],
							this.checkListSlcItemCssClass
						);
					}
				}
			}
			n.setAttribute('value', '');
			n.setAttribute('indexes', '');
			
		} else {
			fltValue = (fltValue) ? fltValue : '';
			chkValue = (fltValue+' '+chkValue +' '+this.orOperator).tf_Trim();
			chkIndex = fltIndexes + chkIndex + this.separator;
			n.setAttribute('value', chkValue );
			n.setAttribute('indexes', chkIndex);
			//1st option unchecked
			if(tf_Id(this.fltIds[colIndex]+'_0'))
				tf_Id(this.fltIds[colIndex]+'_0').checked = false; 
		}
		
		if(li.nodeName.tf_LCase() == itemTag)
		{
			tf_RemoveClass(n.childNodes[0],this.checkListSlcItemCssClass);
			tf_AddClass(li,this.checkListSlcItemCssClass);
		}
	} else { //removes values and indexes
		if(chkValue!='')
		{
			var replaceValue = new RegExp(tf_RegexpEscape(chkValue+' '+this.orOperator));
			fltValue = fltValue.replace(replaceValue,'');
			n.setAttribute('value', fltValue.tf_Trim());
			
			var replaceIndex = new RegExp(tf_RegexpEscape(chkIndex + this.separator));
			fltIndexes = fltIndexes.replace(replaceIndex,'');
			n.setAttribute('indexes', fltIndexes);
		}
		if(li.nodeName.tf_LCase() == itemTag)
			tf_RemoveClass(li,this.checkListSlcItemCssClass);
	}
}


function tf_CreateCheckItem(chkIndex, chkValue, labelText)
/*====================================================
	- creates an checklist item and returns it
	- accepts the following params:
		- chkIndex: index of check item (number)
		- chkValue: check item value (string)
		- labelText: check item label text (string)
=====================================================*/
{
	if(chkIndex==undefined || chkValue==undefined || labelText==undefined )
		return;
	var li = tf_CreateElm('li');
	var label = tf_CreateElm('label',['for',chkIndex]);
	var check = tf_CreateElm( 'input',
					['id',chkIndex],
					['name',chkIndex],
					['type','checkbox'],
					['value',chkValue] );
	label.appendChild(check);
	label.appendChild(tf_CreateText(labelText));
	li.appendChild(label);
	li.label = label;
	li.check = check;
	return li;
}