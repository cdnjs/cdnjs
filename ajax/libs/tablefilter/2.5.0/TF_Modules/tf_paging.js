/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- Paging feature v1.3
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
-------------------------------------------------------------------------*/

TF.prototype.SetPaging = function()
/*====================================================
	- Generates paging elements:
		- pages drop-down list
		- previous, next, first, last buttons
=====================================================*/
{
	if(!this.hasGrid && !this.isFirstLoad) return;
	if(!this.paging || (!this.isPagingRemoved && !this.isFirstLoad)) return;
	var f = this.fObj;
	this.pagingTgtId =			f.paging_target_id!=undefined //id of container element
									? f.paging_target_id : null;		
	this.pagingLength =			f.paging_length!=undefined ? f.paging_length : 10; //defines table paging length
	this.resultsPerPageTgtId =	f.results_per_page_target_id!=undefined //id of container element
									? f.results_per_page_target_id : null;
	this.pgSlcCssClass =		f.paging_slc_css_class!=undefined
									? f.paging_slc_css_class :'pgSlc'; //css class for paging select element
	this.pgInpCssClass =		f.paging_inp_css_class!=undefined
									? f.paging_inp_css_class :'pgNbInp'; //css class for paging input element
	this.resultsSlcCssClass =	f.results_slc_css_class!=undefined
									? f.results_slc_css_class :'rspg'; //defines css class for results per page select
	this.resultsSpanCssClass =	f.results_span_css_class!=undefined
									? f.results_span_css_class :'rspgSpan'; //css class for label preceding results per page select
	this.btnNextPageText = 		f.btn_next_page_text!=undefined
									? f.btn_next_page_text : '>'; //defines next page button text
	this.btnPrevPageText =		f.btn_prev_page_text!=undefined
									? f.btn_prev_page_text : '<'; //defines previous page button text
	this.btnLastPageText =		f.btn_last_page_text!=undefined
									? f.btn_last_page_text : '>|'; //defines last page button text
	this.btnFirstPageText =		f.btn_first_page_text!=undefined
									? f.btn_first_page_text : '|<' ; //defines first page button text
	this.btnNextPageHtml =		f.btn_next_page_html!=undefined //defines next page button html
									? f.btn_next_page_html : (!this.enableIcons ? null : 
									'<input type="button" value="" class="'+this.btnPageCssClass+' nextPage" title="Next page" />'); 
	this.btnPrevPageHtml =		f.btn_prev_page_html!=undefined //defines previous page button html
									? f.btn_prev_page_html : (!this.enableIcons ? null : 
									'<input type="button" value="" class="'+this.btnPageCssClass+' previousPage" title="Previous page" />'); 
	this.btnFirstPageHtml =		f.btn_first_page_html!=undefined //defines last page button html
									? f.btn_first_page_html : (!this.enableIcons ? null : 
									'<input type="button" value="" class="'+this.btnPageCssClass+' firstPage" title="First page" />'); 
	this.btnLastPageHtml =		f.btn_last_page_html!=undefined //defines previous page button html
									? f.btn_last_page_html : (!this.enableIcons ? null : 
									'<input type="button" value="" class="'+this.btnPageCssClass+' lastPage" title="Last page" />');
	this.pageText =				f.page_text!=undefined ? f.page_text : ' Page '; //defines text preceeding page selector drop-down
	this.ofText =				f.of_text!=undefined ? f.of_text : ' of '; //defines text after page selector drop-down 
	this.nbPgSpanCssClass = 	f.nb_pages_css_class!=undefined	? f.nb_pages_css_class :'nbpg'; //css class for span containing tot nb of pages
	this.hasPagingBtns =		f.paging_btns==false ? false : true; //enables/disables paging buttons
	this.pagingBtnEvents =		null; //stores paging buttons events
	this.pageSelectorType =		f.page_selector_type!=undefined
									? f.page_selector_type : this.fltTypeSlc; //defines previous page button html
    this.onBeforeChangePage =   tf_IsFn(f.on_before_change_page) ? f.on_before_change_page : null; //calls function before page is changed
    this.onAfterChangePage =    tf_IsFn(f.on_after_change_page) ? f.on_after_change_page : null; //calls function before page is changed
	
	var start_row = this.refRow;
	var nrows = this.nbRows;
	this.nbPages = Math.ceil( (nrows-start_row)/this.pagingLength );//calculates page nb

	//Paging elements events
	if(!this.Evt._Paging.next)
	{
		var o = this;		
		this.Evt._Paging = {// paging buttons events
			slcIndex: function(){ 
				return (o.pageSelectorType==o.fltTypeSlc) 
					? o.pagingSlc.options.selectedIndex 
					: parseInt(o.pagingSlc.value)-1;
			},
			nbOpts: function(){ 
				return (o.pageSelectorType==o.fltTypeSlc) 
				? parseInt(o.pagingSlc.options.length)-1 
				: (o.nbPages-1);
			},
			next: function(){
				if(o.Evt._Paging.nextEvt) o.Evt._Paging.nextEvt();
				var nextIndex = (o.Evt._Paging.slcIndex()<o.Evt._Paging.nbOpts()) 
					? o.Evt._Paging.slcIndex()+1 : 0;
				o.ChangePage(nextIndex);
			},			
			prev: function(){
				if(o.Evt._Paging.prevEvt) o.Evt._Paging.prevEvt();
				var prevIndex = o.Evt._Paging.slcIndex()>0 
					? o.Evt._Paging.slcIndex()-1 : o.Evt._Paging.nbOpts();
				o.ChangePage(prevIndex);
			},			
			last: function(){
				if(o.Evt._Paging.lastEvt) o.Evt._Paging.lastEvt();
				o.ChangePage(o.Evt._Paging.nbOpts());
			},			
			first: function(){
				if(o.Evt._Paging.firstEvt)  o.Evt._Paging.firstEvt();
				o.ChangePage(0);
			},			
			_detectKey: function(e)
			{
				var evt=(e)?e:(window.event)?window.event:null;
				if(evt)
				{
					var key=(evt.charCode)?evt.charCode:
						((evt.keyCode)?evt.keyCode:((evt.which)?evt.which:0));
					if(key=='13'){ 
						if(o.sorted){ o.Filter(); o.ChangePage(o.Evt._Paging.slcIndex()); }
						else o.ChangePage();								
						this.blur(); 
					}
				}//if evt
			},
			nextEvt: null,
			prevEvt: null,
			lastEvt: null,
			firstEvt: null
		}
	}
	
	if(!this.Evt._OnSlcPagesChange)
	{
		this.Evt._OnSlcPagesChange = function()
		/*====================================================
			- onchange event for paging select
		=====================================================*/
		{
			if(o.Evt._Paging._OnSlcPagesChangeEvt)
				o.Evt._Paging._OnSlcPagesChangeEvt();
			o.ChangePage();
			this.blur();
			//ie only: blur is not enough...
			if(this.parentNode && tf_isIE)
				this.parentNode.focus();
		}
	}

	// Paging drop-down list selector
	if(this.pageSelectorType == this.fltTypeSlc)
	{
		var slcPages = tf_CreateElm( this.fltTypeSlc, ['id',this.prfxSlcPages+this.id] );
		slcPages.className = this.pgSlcCssClass;
		slcPages.onchange = this.Evt._OnSlcPagesChange;
	}
	// Paging input selector
	if(this.pageSelectorType == this.fltTypeInp)
	{
		var slcPages = tf_CreateElm( 
			this.fltTypeInp, 
			['id',this.prfxSlcPages+this.id],
			['value',this.currentPageNb]
		);
		slcPages.className = this.pgInpCssClass;
		slcPages.onkeypress = this.Evt._Paging._detectKey;
	}
	
	var btnNextSpan, btnPrevSpan, btnLastSpan, btnFirstSpan;// btns containers
	btnNextSpan = tf_CreateElm('span',['id',this.prfxBtnNextSpan+this.id]);
	btnPrevSpan = tf_CreateElm('span',['id',this.prfxBtnPrevSpan+this.id]);
	btnLastSpan = tf_CreateElm('span',['id',this.prfxBtnLastSpan+this.id]);
	btnFirstSpan = tf_CreateElm('span',['id',this.prfxBtnFirstSpan+this.id]);
	
	if(this.hasPagingBtns)
	{
		if(this.btnNextPageHtml==null)
		{// Next button
			var btn_next = tf_CreateElm( this.fltTypeInp,['id',this.prfxBtnNext+this.id],
				['type','button'],['value',this.btnNextPageText],['title','Next'] );
			btn_next.className = this.btnPageCssClass;
			btn_next.onclick = this.Evt._Paging.next;
			btnNextSpan.appendChild(btn_next);
		} else {
			btnNextSpan.innerHTML = this.btnNextPageHtml;
			btnNextSpan.onclick = this.Evt._Paging.next;
		}
		
		if(this.btnPrevPageHtml==null)
		{// Previous button
			var btn_prev = tf_CreateElm( this.fltTypeInp,['id',this.prfxBtnPrev+this.id],
				['type','button'],['value',this.btnPrevPageText],['title','Previous'] );
			btn_prev.className = this.btnPageCssClass;
			btn_prev.onclick = this.Evt._Paging.prev;
			btnPrevSpan.appendChild(btn_prev);
		} else { 
			btnPrevSpan.innerHTML = this.btnPrevPageHtml;
			btnPrevSpan.onclick = this.Evt._Paging.prev;
		}
		
		if(this.btnLastPageHtml==null)
		{// Last button
			var btn_last = tf_CreateElm( this.fltTypeInp,['id',this.prfxBtnLast+this.id],
				['type','button'],['value',this.btnLastPageText],['title','Last'] );
			btn_last.className = this.btnPageCssClass;
			btn_last.onclick = this.Evt._Paging.last;
			btnLastSpan.appendChild(btn_last);
		} else { 
			btnLastSpan.innerHTML = this.btnLastPageHtml;
			btnLastSpan.onclick = this.Evt._Paging.last;
		}
		
		if(this.btnFirstPageHtml==null)
		{// First button
			var btn_first = tf_CreateElm( this.fltTypeInp,['id',this.prfxBtnFirst+this.id],
				['type','button'],['value',this.btnFirstPageText],['title','First'] );
			btn_first.className = this.btnPageCssClass;
			btn_first.onclick = this.Evt._Paging.first;
			btnFirstSpan.appendChild(btn_first);
		} else { 
			btnFirstSpan.innerHTML = this.btnFirstPageHtml;
			btnFirstSpan.onclick = this.Evt._Paging.first;
		}			
	}//if this.hasPagingBtns
	
	// paging elements (buttons+drop-down list) are added to defined element
	if(this.pagingTgtId==null) this.SetTopDiv();
	var targetEl = ( this.pagingTgtId==null ) ? this.mDiv : tf_Id( this.pagingTgtId );
	
	/***	if paging previously removed this prevents IE memory leak with removeChild 
			used in RemovePaging method. For more info refer to
			http://forums.microsoft.com/MSDN/ShowPost.aspx?PostID=2840253&SiteID=1	***/
	if ( targetEl.innerHTML!='' ) targetEl.innerHTML = '';
	/*** ***/
	
	targetEl.appendChild(btnFirstSpan);
	targetEl.appendChild(btnPrevSpan);
	
	var pgBeforeSpan = tf_CreateElm( 'span',['id',this.prfxPgBeforeSpan+this.id] );
	pgBeforeSpan.appendChild( tf_CreateText(this.pageText) );
	pgBeforeSpan.className = this.nbPgSpanCssClass;
	targetEl.appendChild(pgBeforeSpan);
	targetEl.appendChild(slcPages);
	var pgAfterSpan = tf_CreateElm( 'span',['id',this.prfxPgAfterSpan+this.id] );
	pgAfterSpan.appendChild( tf_CreateText(this.ofText) );
	pgAfterSpan.className = this.nbPgSpanCssClass;
	targetEl.appendChild(pgAfterSpan)
	var pgspan = tf_CreateElm( 'span',['id',this.prfxPgSpan+this.id] );
	pgspan.className = this.nbPgSpanCssClass;
	pgspan.appendChild( tf_CreateText(' '+this.nbPages+' ') );
	targetEl.appendChild(pgspan);
	targetEl.appendChild(btnNextSpan);
	targetEl.appendChild(btnLastSpan);
	this.pagingSlc = tf_Id(this.prfxSlcPages+this.id); //to be easily re-used
	
	// if this.rememberGridValues==true this.SetPagingInfo() is called
	// in ResetGridValues() method
	if( !this.rememberGridValues || this.isPagingRemoved )
		this.SetPagingInfo();
	if( !this.fltGrid )
	{
		this.ValidateAllRows();
		this.SetPagingInfo(this.validRowsIndex);
	}
		
	this.pagingBtnEvents = this.Evt._Paging;
	this.isPagingRemoved = false;
}

TF.prototype.RemovePaging = function()
/*====================================================
	- Removes paging elements
=====================================================*/
{
	if(!this.hasGrid) return;
	if( this.pagingSlc==null ) return;
	var btnNextSpan, btnPrevSpan, btnLastSpan, btnFirstSpan;// btns containers
	var pgBeforeSpan, pgAfterSpan, pgspan;
	btnNextSpan = tf_Id(this.prfxBtnNextSpan+this.id);
	btnPrevSpan = tf_Id(this.prfxBtnPrevSpan+this.id);
	btnLastSpan = tf_Id(this.prfxBtnLastSpan+this.id);
	btnFirstSpan = tf_Id(this.prfxBtnFirstSpan+this.id);
	pgBeforeSpan = tf_Id(this.prfxPgBeforeSpan+this.id);//span containing 'Page' text
	pgAfterSpan = tf_Id(this.prfxPgAfterSpan+this.id);//span containing 'of' text
	pgspan = tf_Id(this.prfxPgSpan+this.id);//span containing nb of pages
	
	this.pagingSlc.parentNode.removeChild(this.pagingSlc);
	
	if( btnNextSpan!=null )
		btnNextSpan.parentNode.removeChild( btnNextSpan );

	if( btnPrevSpan!=null )
		btnPrevSpan.parentNode.removeChild( btnPrevSpan );

	if( btnLastSpan!=null )
		btnLastSpan.parentNode.removeChild( btnLastSpan );

	if( btnFirstSpan!=null )
		btnFirstSpan.parentNode.removeChild( btnFirstSpan );

	if( pgBeforeSpan!=null )
		pgBeforeSpan.parentNode.removeChild( pgBeforeSpan );

	if( pgAfterSpan!=null )
		pgAfterSpan.parentNode.removeChild( pgAfterSpan );

	if( pgspan!=null )
		pgspan.parentNode.removeChild( pgspan );
	
	this.pagingBtnEvents = null;	
	this.pagingSlc = null;
	this.isPagingRemoved = true;
}

TF.prototype.SetPagingInfo = function( validRows )
/*====================================================
	- calculates page # according to valid rows
	- refreshes paging select according to page #
	- Calls GroupByPage method
=====================================================*/
{
	var row = this.tbl.rows;
	var mdiv = ( this.pagingTgtId==null ) ? this.mDiv : tf_Id( this.pagingTgtId );
	var pgspan = tf_Id(this.prfxPgSpan+this.id);
	
	if( validRows!=undefined ) this.validRowsIndex = validRows;//stores valid rows index
	else 
	{
		this.validRowsIndex = [];//re-sets valid rows index

		for(var j=this.refRow; j<this.nbRows; j++)//counts rows to be grouped 
		{
			if(!row[j]) continue;
			var isRowValid = row[j].getAttribute('validRow');
			if(isRowValid=='true' || isRowValid==null)
					this.validRowsIndex.push(j);
		}//for j
	}

	this.nbPages = Math.ceil( this.validRowsIndex.length/this.pagingLength );//calculates nb of pages
	pgspan.innerHTML = this.nbPages; //refresh page nb span 
	if(this.pageSelectorType==this.fltTypeSlc) 
		this.pagingSlc.innerHTML = '';//select clearing shortcut
	
	if( this.nbPages>0 )
	{
		mdiv.style.visibility = 'visible';
		if(this.pageSelectorType==this.fltTypeSlc)
			for(var z=0; z<this.nbPages; z++)
			{
				var currOpt = new Option((z+1),z*this.pagingLength,false,false);
				this.pagingSlc.options[z] = currOpt;
			}
		else this.pagingSlc.value = this.currentPageNb; //input type
		
	} else {/*** if no results paging select and buttons are hidden ***/
		mdiv.style.visibility = 'hidden';
	}
	this.GroupByPage( this.validRowsIndex );
}

TF.prototype.GroupByPage = function( validRows )
/*====================================================
	- Displays current page rows
=====================================================*/
{
	var row = this.tbl.rows;
	var paging_end_row = parseInt( this.startPagingRow ) + parseInt( this.pagingLength );
	
	if( validRows!=undefined ) this.validRowsIndex = validRows;//stores valid rows index

	for(h=0; h<this.validRowsIndex.length; h++)
	{//this loop shows valid rows of current page
		if( h>=this.startPagingRow && h<paging_end_row )
		{
			var r = row[ this.validRowsIndex[h] ];
			if(r.getAttribute('validRow')=='true' || r.getAttribute('validRow')==undefined)
				r.style.display = '';
			if(this.alternateBgs) this.SetRowBg(this.validRowsIndex[h],h);
		} else {
			row[ this.validRowsIndex[h] ].style.display = 'none';
			if(this.alternateBgs) this.RemoveRowBg(this.validRowsIndex[h]);
		}
	}
	
	this.nbVisibleRows = this.validRowsIndex.length;
	this.isStartBgAlternate = false;
	this.ApplyGridProps();//re-applies filter behaviours after filtering process
}
	
TF.prototype.SetPage = function( cmd )
/*====================================================
	- If paging set true shows page according to
	param value (string or number):
		- strings: 'next','previous','last','first' or
		- number: page number
=====================================================*/
{
	if( this.hasGrid && this.paging )
	{
		var btnEvt = this.pagingBtnEvents, cmdtype = typeof cmd;
		if(cmdtype=='string')
		{
			switch(cmd.tf_LCase())
			{
				case 'next':
					btnEvt.next();
				break;
				case 'previous':
					btnEvt.prev();
				break;
				case 'last':
					btnEvt.last();
				break;
				case 'first':
					btnEvt.first();
				break;
				default:
					btnEvt.next();
				break;
			}//switch
		}
		if(cmdtype=='number') this.ChangePage( (cmd-1) );
	}// this.hasGrid 
}

TF.prototype.SetResultsPerPage = function()
/*====================================================
	- Generates results per page select + label
=====================================================*/
{
	if(!this.hasGrid && !this.isFirstLoad) return;
	if( this.resultsPerPageSlc!=null || this.resultsPerPage==null ) return;
	
	//Change nb results per page event
	if(!this.Evt._OnSlcResultsChange)
	{
		var o = this;
		this.Evt._OnSlcResultsChange = function()
		/*====================================================
			- onchange event for results per page select
		=====================================================*/
		{
			o.ChangeResultsPerPage();
			this.blur();
			//ie only: blur is not enough...
			if(this.parentNode && tf_isIE) 
				this.parentNode.focus();
		}
	}
	
	var slcR = tf_CreateElm( this.fltTypeSlc,['id',this.prfxSlcResults+this.id] );
	slcR.className = this.resultsSlcCssClass;
	var slcRText = this.resultsPerPage[0], slcROpts = this.resultsPerPage[1];
	var slcRSpan = tf_CreateElm( 'span',['id',this.prfxSlcResultsTxt+this.id] );
	slcRSpan.className = this.resultsSpanCssClass;
	
	// results per page select is added to defined element
	if(this.resultsPerPageTgtId==null) this.SetTopDiv();
	var targetEl = ( this.resultsPerPageTgtId==null ) ? this.rDiv : tf_Id( this.resultsPerPageTgtId );
	slcRSpan.appendChild(tf_CreateText(slcRText));
	targetEl.appendChild(slcRSpan);
	targetEl.appendChild(slcR);
	
	this.resultsPerPageSlc = tf_Id(this.prfxSlcResults+this.id);
	
	for(var r=0; r<slcROpts.length; r++)
	{
		var currOpt = new Option(slcROpts[r],slcROpts[r],false,false);
		this.resultsPerPageSlc.options[r] = currOpt;
	}
	slcR.onchange = this.Evt._OnSlcResultsChange;
}

TF.prototype.RemoveResultsPerPage = function()
/*====================================================
	- Removes results per page select + label
=====================================================*/
{
	if(!this.hasGrid) return;
	if( this.resultsPerPageSlc==null || this.resultsPerPage==null ) return;
	var slcR, slcRSpan;
	slcR = this.resultsPerPageSlc;
	slcRSpan = tf_Id( this.prfxSlcResultsTxt+this.id );
	if( slcR!=null )
		slcR.parentNode.removeChild( slcR );
	if( slcRSpan!=null )
		slcRSpan.parentNode.removeChild( slcRSpan );
	this.resultsPerPageSlc = null;
}

TF.prototype.ChangePage = function( index )
{
	this.EvtManager(this.Evt.name.changepage,{ pgIndex:index });
}
TF.prototype._ChangePage = function( index )
/*====================================================
	- Changes page
	- Param:
		- index: option index of paging select 
		(numeric value)
=====================================================*/
{
	if( !this.paging ) return;
	if( index==undefined ) 
		index = (this.pageSelectorType==this.fltTypeSlc) ? 
			this.pagingSlc.options.selectedIndex : (this.pagingSlc.value-1);
	if( index>=0 && index<=(this.nbPages-1) )
	{
        if(this.onBeforeChangePage) this.onBeforeChangePage.call(null, this, index);
		this.currentPageNb = parseInt(index)+1;
		if(this.pageSelectorType==this.fltTypeSlc)
			this.pagingSlc.options[index].selected = true;
		else
			this.pagingSlc.value = this.currentPageNb;

		if( this.rememberPageNb ) this.RememberPageNb( this.pgNbCookie );
		this.startPagingRow = (this.pageSelectorType==this.fltTypeSlc)
			? this.pagingSlc.value : (index*this.pagingLength);
		this.GroupByPage();
		if(this.onAfterChangePage) this.onAfterChangePage.call(null, this, index);
	}
}

TF.prototype.ChangeResultsPerPage = function()
{
	this.EvtManager(this.Evt.name.changeresultsperpage);
}
TF.prototype._ChangeResultsPerPage = function()
/*====================================================
	- calculates rows to be displayed in a page
	- method called by nb results per page select
=====================================================*/
{
	if( !this.paging ) return;
	var slcR = this.resultsPerPageSlc;
	var slcPagesSelIndex = (this.pageSelectorType==this.fltTypeSlc) 
		? this.pagingSlc.selectedIndex : parseInt(this.pagingSlc.value-1);
	this.pagingLength = parseInt(slcR.options[slcR.selectedIndex].value);
	this.startPagingRow = this.pagingLength*slcPagesSelIndex;

	if( !isNaN(this.pagingLength) )
	{
		if( this.startPagingRow>=this.nbFilterableRows )
			this.startPagingRow = (this.nbFilterableRows-this.pagingLength);
		this.SetPagingInfo();

		if(this.pageSelectorType==this.fltTypeSlc)
		{
			var slcIndex = (this.pagingSlc.options.length-1<=slcPagesSelIndex ) 
							? (this.pagingSlc.options.length-1) : slcPagesSelIndex;
			this.pagingSlc.options[slcIndex].selected = true;
		}
		if( this.rememberPageLen ) this.RememberPageLength( this.pgLenCookie );
	}//if isNaN
}

TF.prototype.ResetPage = function( name )
{
	this.EvtManager(this.Evt.name.resetpage);
}
TF.prototype._ResetPage = function( name )
/*==============================================
	- re-sets page nb at page re-load
	- Params:
		- name: cookie name (string)
===============================================*/
{
	var pgnb = tf_ReadCookie(name); //reads the cookie
	if( pgnb!='' ) 
		this.ChangePage((pgnb-1));
}

TF.prototype.ResetPageLength = function( name )
{
	this.EvtManager(this.Evt.name.resetpagelength);
}
TF.prototype._ResetPageLength = function( name )
/*==============================================
	- re-sets page length at page re-load
	- Params:
		- name: cookie name (string)
===============================================*/
{
	if(!this.paging) return;
	var pglenIndex = tf_ReadCookie(name); //reads the cookie
	
	if( pglenIndex!='' )
	{
		this.resultsPerPageSlc.options[pglenIndex].selected = true;
		this.ChangeResultsPerPage();
	}
}

TF.prototype.AddPaging = function(filterTable)
/*====================================================
	- Adds paging feature if filter grid bar is 
	already set
	- Param(s):
		- execFilter: if true table is filtered 
		(boolean)
=====================================================*/
{
	if( !this.hasGrid || this.paging ) return;
	this.paging = true;
	this.isPagingRemoved = true; 
	this.SetPaging();
	this.ResetValues();
	if(filterTable) this.Filter();
}
