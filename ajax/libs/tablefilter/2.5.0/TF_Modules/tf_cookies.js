/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- Remember values features (cookies) v1.1
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
-------------------------------------------------------------------------*/

TF.prototype.RememberFiltersValue = function( name )
/*==============================================
	- stores filters' values in a cookie
	when Filter() method is called
	- Params:
		- name: cookie name (string)
	- credits to Florent Hirchy
===============================================*/
{
	var flt_values = [];
	for(var i=0; i<this.fltIds.length; i++)
	{//creates an array with filters' values
		value = this.GetFilterValue(i);
		if (value == '') value = ' ';
		flt_values.push(value);
	}
	flt_values.push(this.fltIds.length); //adds array size
	tf_WriteCookie(
		name,
		flt_values.join(this.separator),
		this.cookieDuration
	); //writes cookie  
}

TF.prototype.RememberPageNb = function( name )
/*==============================================
	- stores page number value in a cookie
	when ChangePage method is called
	- Params:
		- name: cookie name (string)
===============================================*/
{
	tf_WriteCookie(
		name,
		this.currentPageNb,
		this.cookieDuration
	); //writes cookie  
}

TF.prototype.RememberPageLength = function( name )
/*==============================================
	- stores page length value in a cookie
	when ChangePageLength method is called
	- Params:
		- name: cookie name (string)
===============================================*/
{
	tf_WriteCookie(
		name,
		this.resultsPerPageSlc.selectedIndex,
		this.cookieDuration
	); //writes cookie
}

TF.prototype.ResetValues = function()
{ 
	this.EvtManager(this.Evt.name.resetvalues); 
}

TF.prototype._ResetValues = function()
/*==============================================
	- re-sets grid values when page is 
	re-loaded. It invokes ResetGridValues,
	ResetPage and ResetPageLength methods
	- Params:
		- name: cookie name (string)
===============================================*/
{
	if(this.rememberGridValues && this.fillSlcOnDemand) //only fillSlcOnDemand
		this.ResetGridValues(this.fltsValuesCookie);
	if(this.rememberPageLen) this.ResetPageLength( this.pgLenCookie );
	if(this.rememberPageNb) this.ResetPage( this.pgNbCookie );		
}	

TF.prototype.ResetGridValues = function( name )
/*==============================================
	- re-sets filters' values when page is 
	re-loaded if load on demand is enabled
	- Params:
		- name: cookie name (string)
	- credits to Florent Hirchy
===============================================*/
{
	if(!this.fillSlcOnDemand) return;
	var flts = tf_ReadCookie(name); //reads the cookie
	var reg = new RegExp(this.separator,'g');	
	var flts_values = flts.split(reg); //creates an array with filters' values
	var slcFltsIndex = this.GetFiltersByType(this.fltTypeSlc, true);
	var multiFltsIndex = this.GetFiltersByType(this.fltTypeMulti, true);
	
	if(flts_values[(flts_values.length-1)] == this.fltIds.length)
	{//if the number of columns is the same as before page reload
		for(var i=0; i<(flts_values.length - 1); i++)
		{			
			if (flts_values[i]==' ') continue;				
			if(this['col'+i]==this.fltTypeSlc || this['col'+i]==this.fltTypeMulti)
			{// if fillSlcOnDemand, drop-down needs to contain stored value(s) for filtering
				var slc = tf_Id( this.fltIds[i] );
				slc.options[0].selected = false;
				
				if( slcFltsIndex.tf_Has(i) )
				{//selects
					var opt = tf_CreateOpt(flts_values[i],flts_values[i],true);
					slc.appendChild(opt);
					this.hasStoredValues = true;
				}
				if(multiFltsIndex.tf_Has(i))
				{//multiple select
					var s = flts_values[i].split(' '+this.orOperator+' ');
					for(j=0; j<s.length; j++)
					{
						if(s[j]=='') continue;
						var opt = tf_CreateOpt(s[j],s[j],true);
						slc.appendChild(opt);
						this.hasStoredValues = true;
						
						if(tf_isIE)
						{// IE multiple selection work-around
							this.__deferMultipleSelection(slc,j,false);
							hasStoredValues = false;
						}
					}
				}// if multiFltsIndex
			}
			else if(this['col'+i]==this.fltTypeCheckList)
			{
				var divChk = this.checkListDiv[i];
				divChk.title = divChk.innerHTML;
				divChk.innerHTML = '';
				
				var ul = tf_CreateElm('ul',['id',this.fltIds[i]],['colIndex',i]);
				ul.className = this.checkListCssClass;

				var li0 = tf_CreateCheckItem(this.fltIds[i]+'_0', '', this.displayAllText);
				li0.className = this.checkListItemCssClass;
				ul.appendChild(li0);

				divChk.appendChild(ul);
				
				var s = flts_values[i].split(' '+this.orOperator+' ');
				for(j=0; j<s.length; j++)
				{
					if(s[j]=='') continue;
					var li = tf_CreateCheckItem(this.fltIds[i]+'_'+(j+1), s[j], s[j]);
					li.className = this.checkListItemCssClass;
					ul.appendChild(li);
					li.check.checked = true;
					this.__setCheckListValues(li.check);
					this.hasStoredValues = true;
				}					
			}
		}//end for
		
		if(!this.hasStoredValues && this.paging) this.SetPagingInfo();
	}//end if
}