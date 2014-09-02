/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- Fixed headers feature v1.0 - Deprecated!
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
-------------------------------------------------------------------------*/

TF.prototype.SetFixedHeaders = function()
/*====================================================
	- CSS solution making headers fixed
=====================================================*/
{
	if((!this.hasGrid && !this.isFirstLoad) || !this.fixedHeaders) return;
	if(this.contDiv) return;	
	var thead = tf_Tag(this.tbl,'thead');
	if( thead.length==0 ) return;
	var tbody = tf_Tag(this.tbl,'tbody');	
	if( tbody[0].clientHeight!=0 ) 
	{//firefox returns tbody height
		//previous values
		this.prevTBodyH = tbody[0].clientHeight;
		this.prevTBodyOverflow = tbody[0].style.overflow;
		this.prevTBodyOverflowX = tbody[0].style.overflowX;
		
		tbody[0].style.height = this.tBodyH+'px';
		tbody[0].style.overflow = 'auto';
		tbody[0].style.overflowX = 'hidden';
	} else { //IE returns 0
		// cont div is added to emulate fixed headers behaviour
		var contDiv = tf_CreateElm( 'div',['id',this.prfxContentDiv+this.id] );
		contDiv.className = this.contDivCssClass;
		this.tbl.parentNode.insertBefore(contDiv, this.tbl);
		contDiv.appendChild(this.tbl);
		this.contDiv = tf_Id(this.prfxContentDiv+this.id);
		//prevents headers moving during window scroll (IE)
		this.contDiv.style.position = 'relative';
		
		var theadH = 0;
		var theadTr = tf_Tag(thead[0],'tr');	
		for(var i=0; i<theadTr.length; i++)
		{//css below emulates fixed headers on IE<=6
			theadTr[i].style.cssText += 'position:relative; ' +
										'top:expression(offsetParent.scrollTop);';
			theadH += parseInt(theadTr[i].clientHeight);
		}
		
		this.contDiv.style.height = (this.tBodyH+theadH)+'px';
		
		var tfoot = tf_Tag(this.tbl,'tfoot');
		if( tfoot.length==0 ) return;
		
		var tfootTr = tf_Tag(tfoot[0],'tr');
			
		for(var j=0; j<tfootTr.length; j++)//css below emulates fixed footer on IE<=6
			tfootTr[j].style.cssText += 'position:relative; overflow-x: hidden; ' +
										'top: expression(parentNode.parentNode.offsetHeight >= ' +
										'offsetParent.offsetHeight ? 0 - parentNode.parentNode.offsetHeight + '+ 
										'offsetParent.offsetHeight + offsetParent.scrollTop : 0);';		
	}	
}

TF.prototype.RemoveFixedHeaders = function()
/*====================================================
	- Removes fixed headers
=====================================================*/
{
	if(!this.hasGrid || !this.fixedHeaders ) return;
	if( this.contDiv )//IE additional div
	{
		this.contDiv.parentNode.insertBefore(this.tbl, this.contDiv);
		this.contDiv.parentNode.removeChild( this.contDiv );
		this.contDiv = null;
		var thead = tf_Tag(this.tbl,'thead');
		if( thead.length==0 ) return;
		var theadTr = tf_Tag(thead[0],'tr');
		if( theadTr.length==0 ) return;
		for(var i=0; i<theadTr.length; i++)
			theadTr[i].style.cssText = '';
		var tfoot = tf_Tag(this.tbl,'tfoot');
		if( tfoot.length==0 ) return;		
		var tfootTr = tf_Tag(tfoot[0],'tr');	
		for(var j=0; j<tfootTr.length; j++)
		{
			tfootTr[j].style.position = 'relative';
			tfootTr[j].style.top = '';
			tfootTr[j].style.overeflowX = '';
		}
	} else {
		var tbody = tf_Tag(this.tbl,'tbody');
		if( tbody.length==0 ) return;
		tbody[0].style.height = this.prevTBodyH+'px';
		tbody[0].style.overflow = this.prevTBodyOverflow;
		tbody[0].style.overflowX = this.prevTBodyOverflowX;
	}
}