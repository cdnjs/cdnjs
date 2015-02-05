/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- Refresh filters feature v1.0
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
-------------------------------------------------------------------------*/

TF.prototype.RefreshFiltersGrid = function()
/*====================================================
	- retrieves select, multiple and checklist filters
	- calls method repopulating filters
=====================================================*/
{
	var slcA1 = this.GetFiltersByType( this.fltTypeSlc,true );
	var slcA2 = this.GetFiltersByType( this.fltTypeMulti,true );
	var slcA3 = this.GetFiltersByType( this.fltTypeCheckList,true );
	var slcIndex = slcA1.concat(slcA2);
	slcIndex = slcIndex.concat(slcA3);

	if( this.activeFilterId!=null )//for paging
	{
		var activeFlt = this.activeFilterId.split('_')[0];
		activeFlt = activeFlt.split(this.prfxFlt)[1];
		var slcSelectedValue;
		for(var i=0; i<slcIndex.length; i++)
		{
			var curSlc = tf_Id(this.fltIds[slcIndex[i]]);
			slcSelectedValue = this.GetFilterValue( slcIndex[i] );
			if(activeFlt!=slcIndex[i] || (this.paging && slcA1.tf_Has(slcIndex[i]) && activeFlt==slcIndex[i] ) || 
				( !this.paging && (slcA3.tf_Has(slcIndex[i]) || slcA2.tf_Has(slcIndex[i]) )) || 
				slcSelectedValue==this.displayAllText )
			{
				if(slcA3.tf_Has(slcIndex[i]))
					this.checkListDiv[slcIndex[i]].innerHTML = '';
				else curSlc.innerHTML = '';
				
				if(this.fillSlcOnDemand) { //1st option needs to be inserted
					var opt0 = tf_CreateOpt(this.displayAllText,'');
					if(curSlc) curSlc.appendChild( opt0 );
				}
				
				if(slcA3.tf_Has(slcIndex[i]))
					this._PopulateCheckList(slcIndex[i]);
				else
					this._PopulateSelect(slcIndex[i],true);
					
				this.SetFilterValue(slcIndex[i],slcSelectedValue);
			}
		}// for i
	}
}