/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- Loader feature v1.1
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
-------------------------------------------------------------------------*/

TF.prototype.SetLoader = function()
/*====================================================
	- generates loader div
=====================================================*/
{
	if( this.loaderDiv!=null ) return;
	var f = this.fObj;
	this.loaderTgtId =			f.loader_target_id!=undefined //id of container element
									? f.loader_target_id : null;
	this.loaderDiv =			null; //div containing loader
	this.loaderText =			f.loader_text!=undefined ? f.loader_text : 'Loading...'; //defines loader text
	this.loaderHtml =			f.loader_html!=undefined ? f.loader_html : null; //defines loader innerHtml
	this.loaderCssClass = 		f.loader_css_class!=undefined //defines css class for loader div
									? f.loader_css_class : 'loader';
	this.loaderCloseDelay =		200; //delay for hiding loader
	this.onShowLoader =			tf_IsFn(f.on_show_loader) //calls function before loader is displayed
									? f.on_show_loader : null;
	this.onHideLoader =			tf_IsFn(f.on_hide_loader) //calls function after loader is closed
									? f.on_hide_loader : null;
	var containerDiv = tf_CreateElm( 'div',['id',this.prfxLoader+this.id] );
	containerDiv.className = this.loaderCssClass;// for ie<=6
	//containerDiv.style.display = 'none';
	var targetEl = (this.loaderTgtId==null) 
		? (this.gridLayout ? this.tblCont : this.tbl.parentNode) : tf_Id( this.loaderTgtId );
	if(this.loaderTgtId==null) targetEl.insertBefore(containerDiv, this.tbl);
	else targetEl.appendChild( containerDiv );
	this.loaderDiv = tf_Id(this.prfxLoader+this.id);
	if(this.loaderHtml==null) 
		this.loaderDiv.appendChild( tf_CreateText(this.loaderText) );
	else this.loaderDiv.innerHTML = this.loaderHtml;
}

TF.prototype.RemoveLoader = function()
/*====================================================
	- removes loader div
=====================================================*/
{
	if( this.loaderDiv==null ) return;
	var targetEl = (this.loaderTgtId==null) 
		? (this.gridLayout ? this.tblCont : this.tbl.parentNode) : tf_Id( this.loaderTgtId );
	targetEl.removeChild(this.loaderDiv);
	this.loaderDiv = null;
}

TF.prototype.ShowLoader = function(p)
/*====================================================
	- displays/hides loader div
=====================================================*/
{
	if(!this.loader || !this.loaderDiv) return;
	if(this.loaderDiv.style.display==p) return;
	var o = this;

	function displayLoader(){ 
		if(!o.loaderDiv) return;
		if(o.onShowLoader && p!='none') 
			o.onShowLoader.call(null,o);
		o.loaderDiv.style.display = p;
		if(o.onHideLoader && p=='none') 
			o.onHideLoader.call(null,o);
	}

	var t = (p=='none') ? this.loaderCloseDelay : 1;
	window.setTimeout(displayLoader,t);
}