/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- Reset button (clear filters) and Help instructions feature v1.3
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
--------------------------------------------------------------------------
	- Changelog:
		1.1 [12-09-10] 
		Help instructions methods added to this module
		1.2 [31-07-11]
		Button icon shown by default
		1.3 [10-03-12]
		Added year property to help instructions (helpInstrDefaultHtml)
		1.4 [27-04-12]
		Modfied help instructions text
------------------------------------------------------------------------*/

TF.prototype.SetResetBtn = function()
/*====================================================
	- Generates reset button
=====================================================*/
{
	if(!this.hasGrid && !this.isFirstLoad) return;
	if( this.btnResetEl!=null ) return;
	var f = this.fObj;
	this.btnResetTgtId =		f.btn_reset_target_id!=undefined //id of container element
									? f.btn_reset_target_id : null;
	this.btnResetEl =			null; //reset button element
	this.btnResetText =			f.btn_reset_text!=undefined ? f.btn_reset_text : 'Reset'; //defines reset text
	this.btnResetTooltip =		f.btn_reset_tooltip!=undefined ? f.btn_reset_tooltip : 'Clear filters'; //defines reset button tooltip
	this.btnResetHtml = 		f.btn_reset_html!=undefined ? f.btn_reset_html : (!this.enableIcons ? null : //defines reset button innerHtml
									'<input type="button" value="" class="'+this.btnResetCssClass+'" title="'+this.btnResetTooltip+'" />');
	
	var resetspan = tf_CreateElm('span',['id',this.prfxResetSpan+this.id]);
	
	// reset button is added to defined element
	if(this.btnResetTgtId==null) this.SetTopDiv();
	var targetEl = ( this.btnResetTgtId==null ) ? this.rDiv : tf_Id( this.btnResetTgtId );
	targetEl.appendChild(resetspan);

	if(this.btnResetHtml==null)
	{	
		var fltreset = tf_CreateElm( 'a', ['href','javascript:void(0);'] );
		fltreset.className = this.btnResetCssClass;
		fltreset.appendChild(tf_CreateText(this.btnResetText));
		resetspan.appendChild(fltreset);
		fltreset.onclick = this.Evt._Clear;
	} else {
		resetspan.innerHTML = this.btnResetHtml;
		var resetEl = resetspan.firstChild;
		resetEl.onclick = this.Evt._Clear;
	}
	this.btnResetEl = tf_Id(this.prfxResetSpan+this.id).firstChild;	
}

TF.prototype.RemoveResetBtn = function()
/*====================================================
	- Removes reset button
=====================================================*/
{
	if(!this.hasGrid) return;
	if( this.btnResetEl==null ) return;
	var resetspan = tf_Id(this.prfxResetSpan+this.id);
	if( resetspan!=null )
		resetspan.parentNode.removeChild( resetspan );
	this.btnResetEl = null;	
}

TF.prototype.SetHelpInstructions = function()
/*====================================================
	- Generates help instructions
=====================================================*/
{
	if( this.helpInstrBtnEl!=null ) return;
	var f = this.fObj;
	this.helpInstrTgtId = 		f.help_instructions_target_id!=undefined //id of custom container element for instructions
									? f.help_instructions_target_id : null;
	this.helpInstrContTgtId = 	f.help_instructions_container_target_id!=undefined //id of custom container element for instructions
									? f.help_instructions_container_target_id : null;
	this.helpInstrText =		f.help_instructions_text //defines help text
									? f.help_instructions_text : 'Use the filters above each column to filter and limit table data. ' + 
									'Avanced searches can be performed by using the following operators: <br />' +
									'<i>&lt;</i>, <b>&lt;=</b>, <b>&gt;</b>, <b>&gt;=</b>, <b>=</b>, <b>*</b>, <b>!</b>, <b>{</b>, <b>}</b>, <b>||</b>, ' + 
									'<b>&amp;&amp;</b>, <b>[empty]</b>, <b>[nonempty]</b>, <b>rgx:</b><br/> These operators are described here:<br/>' +
									'<a href="http://tablefilter.free.fr/#operators" target="_blank">http://tablefilter.free.fr/#operators</a><hr/>';
	this.helpInstrHtml = 		f.help_instructions_html!=undefined 
									? f.help_instructions_html : null; //defines help innerHtml
	this.helpInstrBtnText = 	f.help_instructions_btn_text!=undefined 
									? f.help_instructions_btn_text : '?'; //defines help button text
	this.helpInstrBtnHtml = 	f.help_instructions_btn_html!=undefined 
									? f.help_instructions_btn_html : null; //defines reset button innerHtml
	this.helpInstrBtnCssClass =	f.help_instructions_btn_css_class!=undefined //defines css class for help button
									? f.help_instructions_btn_css_class : 'helpBtn';
	this.helpInstrContCssClass = f.help_instructions_container_css_class!=undefined //defines css class for help container
									? f.help_instructions_container_css_class : 'helpCont';
	this.helpInstrBtnEl =		null; //help button element
	this.helpInstrContEl =		null; //help content div
	this.helpInstrDefaultHtml = '<div class="helpFooter"><h4>HTML Table Filter Generator v. '+ this.version +'</h4>' + 
								'<a href="http://tablefilter.free.fr" target="_blank">http://tablefilter.free.fr</a><br/>' +
								'<span>&copy;2009-'+ this.year +' Max Guglielmi.</span><div align="center" style="margin-top:8px;">' + 
								'<a href="javascript:;" onclick="window[\'tf_'+ this.id +'\']._ToggleHelp();">Close</a></div></div>';
	
	var helpspan = tf_CreateElm('span',['id',this.prfxHelpSpan+this.id]);
	var helpdiv = tf_CreateElm('div',['id',this.prfxHelpDiv+this.id]);
	
	//help button is added to defined element
	if(this.helpInstrTgtId==null) this.SetTopDiv();
	var targetEl = ( this.helpInstrTgtId==null ) ? this.rDiv : tf_Id( this.helpInstrTgtId );
	targetEl.appendChild(helpspan);
	
	var divContainer = ( this.helpInstrContTgtId==null ) ? helpspan : tf_Id( this.helpInstrContTgtId );
	
	if(this.helpInstrBtnHtml == null)
	{	
		divContainer.appendChild(helpdiv);
		var helplink = tf_CreateElm( 'a', ['href','javascript:void(0);'] );
		helplink.className = this.helpInstrBtnCssClass;
		helplink.appendChild(tf_CreateText(this.helpInstrBtnText));
		helpspan.appendChild(helplink);
		helplink.onclick = this.Evt._OnHelpBtnClick;
	} else {
		helpspan.innerHTML += this.helpInstrBtnHtml;
		var helpEl = helpspan.firstChild;
		helpEl.onclick = this.Evt._OnHelpBtnClick;
		divContainer.appendChild(helpdiv);
	}
	
	if(this.helpInstrHtml == null)
	{
		//helpdiv.appendChild(tf_CreateText(this.helpInstrText));
		helpdiv.innerHTML = this.helpInstrText;
		helpdiv.className = this.helpInstrContCssClass;
		helpdiv.ondblclick = this.Evt._OnHelpBtnClick;
	} else {
		if(this.helpInstrContTgtId) divContainer.appendChild(helpdiv);
		helpdiv.innerHTML = this.helpInstrHtml;
		if(!this.helpInstrContTgtId){
			helpdiv.className = this.helpInstrContCssClass;
			helpdiv.ondblclick = this.Evt._OnHelpBtnClick;
		}
	}
	helpdiv.innerHTML += this.helpInstrDefaultHtml;
	this.helpInstrContEl = helpdiv; 
	this.helpInstrBtnEl = helpspan;
}

TF.prototype.RemoveHelpInstructions = function()
/*====================================================
	- Removes help instructions
=====================================================*/
{
	if(this.helpInstrBtnEl==null) return;
	this.helpInstrBtnEl.parentNode.removeChild(this.helpInstrBtnEl);
	this.helpInstrBtnEl = null;
	if(this.helpInstrContEl==null) return;
	this.helpInstrContEl.parentNode.removeChild(this.helpInstrContEl);
	this.helpInstrContEl = null;
}

TF.prototype._ToggleHelp = function()
/*====================================================
	- Toggles help div
=====================================================*/
{
	if(!this.helpInstrContEl) return;
	var divDisplay = this.helpInstrContEl.style.display;
	if(divDisplay == '' || divDisplay == 'none'){
		this.helpInstrContEl.style.display = 'block';
		var btnLeft = tf_ObjPosition(this.helpInstrBtnEl, [this.helpInstrBtnEl.nodeName])[0];
		if(!this.helpInstrContTgtId)
			this.helpInstrContEl.style.left = (btnLeft - this.helpInstrContEl.clientWidth + 25) + 'px';
	}
	else this.helpInstrContEl.style.display = 'none';
}