/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- Watermark feature v1.0
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
-------------------------------------------------------------------------*/

TF.prototype.SetWatermark = function(set)
/*====================================================
	- inserts or removes input watermark
	- Params:
		- set: if true inserts watermark (boolean)
=====================================================*/
{
	if( !this.fltGrid ) return;
	if(this.inpWatermark!=''){ //Not necessary if empty
		var set = (set || set==undefined) ? true : false;
		for(var i=0; i<this.fltIds.length; i++){
			if(this['col'+i]!=this.fltTypeInp) continue; //only input type filters
			var inpWatermark = (!this.isInpWatermarkArray ? this.inpWatermark : this.inpWatermark[i]);
			if(this.GetFilterValue(i) == (set ? '' : inpWatermark)){
				this.SetFilterValue(i,(!set ? '' : inpWatermark));
				tf_AddClass(this.GetFilterElement(i), this.inpWatermarkCssClass);
			}
		}
	}
}