/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- Sort feature v1.0
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
-------------------------------------------------------------------------*/

TF.prototype.SetSort = function()
/*====================================================
	- Sets sorting feature by loading 
	WebFX Sortable Table 1.12 by Erik Arvidsson
	and TF adapter by Max Guglielmi
=====================================================*/
{
	var fn = this.Evt._EnableSort;
	if(!tf_IsFn(fn)){
		var o = this;
		this.Evt._EnableSort = function()
		/*====================================================
			- enables table sorting
		=====================================================*/
		{
			if(o.isSortEnabled && !o.gridLayout) return; //gridLayout needs sort to be re-enabled
			if(tf_IsImported(o.sortConfig.adapterSrc))
				o.sortConfig.initialize.call(null,o);
			else
				o.IncludeFile(
					o.sortConfig.name+'_adapter',
					o.sortConfig.adapterSrc,
					function(){ o.sortConfig.initialize.call(null,o); }
				);
		}
	}

	if(tf_IsImported(this.sortConfig.src))
		this.Evt._EnableSort();
	else
		this.IncludeFile(
			this.sortConfig.name, 
			this.sortConfig.src, 
			this.Evt._EnableSort
		);
}

TF.prototype.RemoveSort = function()
/*====================================================
	- removes sorting feature
=====================================================*/
{
	if(!this.sort) return;
	this.sort = false;
	//this.isSortEnabled = false;		
}

TF.prototype.Sort = function()
{
	this.EvtManager(this.Evt.name.sort);
}