/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- Popup filters feature v1.2
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
-------------------------------------------------------------------------*/

TF.prototype.SetPopupFilterIcons = function()
/*====================================================
	- generates popup filters div
=====================================================*/
{
	if(!this.popUpFilters) return;	
	this.isExternalFlt = true; //external filters behaviour is enabled
	var f = this.fObj;
	this.popUpImgFlt = 			f.popup_filters_image!=undefined //filter icon path
									? f.popup_filters_image : this.themesPath+'icn_filter.gif';
	this.popUpImgFltActive = 	f.popup_filters_image_active!=undefined //active filter icon path
									? f.popup_filters_image_active : this.themesPath+'icn_filterActive.gif';
	this.popUpImgFltHtml =		f.popup_filters_image_html!=undefined 
									? f.popup_filters_image_html : '<img src="'+ this.popUpImgFlt +'" alt="Column filter" />';
	this.popUpDivCssClass =		f.popup_div_css_class!=undefined //defines css class for popup div containing filter
									? f.popup_div_css_class : 'popUpFilter';
	this.onBeforePopUpOpen =	tf_IsFn(f.on_before_popup_filter_open) //callback function before popup filtes is opened
									? f.on_before_popup_filter_open : null;
	this.onAfterPopUpOpen =		tf_IsFn(f.on_after_popup_filter_open) //callback function after popup filtes is opened
									? f.on_after_popup_filter_open : null;
	this.onBeforePopUpClose =	tf_IsFn(f.on_before_popup_filter_close) //callback function before popup filtes is closed
									? f.on_before_popup_filter_close : null;
	this.onAfterPopUpClose =	tf_IsFn(f.on_after_popup_filter_close) //callback function after popup filtes is closed
									? f.on_after_popup_filter_close : null;
	this.externalFltTgtIds = [];
	this.popUpFltSpans = []; //stores filters spans
	this.popUpFltImgs = []; //stores filters icons
	this.popUpFltElms = !this.popUpFltElmCache ? [] : this.popUpFltElmCache; //stores filters containers
	this.popUpFltAdjustToContainer = true;
	
	var o = this;
	for(var i=0; i<this.nbCells; i++){
		if(this['col'+i] == this.fltTypeNone) continue;
		var popUpSpan = tf_CreateElm('span', ['id', this.prfxPopUpSpan+this.id+'_'+i], ['ci',i]); 
		popUpSpan.innerHTML = this.popUpImgFltHtml;
		var header = this.GetHeaderElement(i);
		header.appendChild(popUpSpan);
		popUpSpan.onclick = function(e){
			var evt = e || window.event;
			var colIndex = parseInt(this.getAttribute('ci'));
			o.CloseAllPopupFilters(colIndex);
			o.TogglePopupFilter(colIndex);
			
			if(o.popUpFltAdjustToContainer){
				var popUpDiv = o.popUpFltElms[colIndex];
				var header = o.GetHeaderElement(colIndex);
				var headerWidth = header.clientWidth * .95;
				if(!tf_isNotIE){
					var headerLeft = tf_ObjPosition(header, [header.nodeName])[0];
					popUpDiv.style.left = (headerLeft) + 'px';
				}
				popUpDiv.style.width = parseInt(headerWidth)  + 'px';
			}
			tf_CancelEvent(evt);
			tf_StopEvent(evt);
		};
		this.popUpFltSpans[i] = popUpSpan;
		this.popUpFltImgs[i] = popUpSpan.firstChild;
	}
}

TF.prototype.SetPopupFilters = function()
/*====================================================
	- generates all popup filters div
=====================================================*/
{
	for(var i=0; i<this.popUpFltElmCache.length; i++)
		this.SetPopupFilter(i, this.popUpFltElmCache[i]);
}

TF.prototype.SetPopupFilter = function(colIndex, div)
/*====================================================
	- generates a popup filters div for specifies
	column
=====================================================*/
{
	var popUpDiv = !div ? tf_CreateElm('div', ['id', this.prfxPopUpDiv+this.id+'_'+colIndex]) : div;
	popUpDiv.className = this.popUpDivCssClass;
	this.externalFltTgtIds.push(this.prfxPopUpDiv+this.id+'_'+colIndex);
	var header = this.GetHeaderElement(colIndex);
	header.insertBefore(popUpDiv, header.firstChild);
	popUpDiv.onclick = function(e){ tf_StopEvent(e || window.event); };
	this.popUpFltElms[colIndex] = popUpDiv;
}

TF.prototype.TogglePopupFilter = function(colIndex)
/*====================================================
	- toggles popup filters div
=====================================================*/
{
	var popUpFltElm = this.popUpFltElms[colIndex];
	if(popUpFltElm.style.display == 'none' || popUpFltElm.style.display == ''){
		if(this.onBeforePopUpOpen!=null) this.onBeforePopUpOpen.call(null,this, this.popUpFltElms[colIndex],colIndex);
		popUpFltElm.style.display = 'block';
		if(this['col'+colIndex] == this.fltTypeInp) this.GetFilterElement(colIndex).focus();
		if(this.onAfterPopUpOpen!=null) this.onAfterPopUpOpen.call(null,this, this.popUpFltElms[colIndex],colIndex);
	} else {
		if(this.onBeforePopUpClose!=null) this.onBeforePopUpClose.call(null,this, this.popUpFltElms[colIndex],colIndex);
		popUpFltElm.style.display = 'none';
		if(this.onAfterPopUpClose!=null) this.onAfterPopUpClose.call(null,this, this.popUpFltElms[colIndex],colIndex);
	}
}

TF.prototype.CloseAllPopupFilters = function(exceptColIndex)
/*====================================================
	- closes all popup filters
=====================================================*/
{
	for(var i=0; i<this.popUpFltElms.length; i++){
		if(i == exceptColIndex) continue;
		var popUpFltElm = this.popUpFltElms[i];
		if(popUpFltElm) popUpFltElm.style.display = 'none';
	}
}

TF.prototype.RemovePopupFilters = function()
/*====================================================
	- removes popup filters div
=====================================================*/
{
	this.popUpFltElmCache = [];
	for(var i=0; i<this.popUpFltElms.length; i++){
		var popUpFltElm = this.popUpFltElms[i];
		var popUpFltSpan = this.popUpFltSpans[i];
		if(popUpFltElm){
			popUpFltElm.parentNode.removeChild(popUpFltElm);
			this.popUpFltElmCache[i] = popUpFltElm;
		}
		popUpFltElm = null;
		if(popUpFltSpan) popUpFltSpan.parentNode.removeChild(popUpFltSpan);
		popUpFltSpan = null;
	}
}

TF.prototype.SetPopupFilterIcon = function(colIndex, active)
/*====================================================
	- sets inactive or active filter icon 
=====================================================*/
{
	var activeImg = active==undefined ? true : active;
	if(this.popUpFltImgs[colIndex])
		this.popUpFltImgs[colIndex].src = (active) ? this.popUpImgFltActive : this.popUpImgFlt;
}

TF.prototype.SetAllPopupFiltersIcon = function(active)
/*====================================================
	- sets inactive or active filter icon for all
	filters
=====================================================*/
{
	var activeImg = active==undefined ? false : active;
	for(var i=0; i<this.popUpFltImgs.length; i++)
		this.SetPopupFilterIcon(i, false);
}
