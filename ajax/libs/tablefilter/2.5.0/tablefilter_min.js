/*------------------------------------------------------------------------
	- HTML Table Filter Generator v2.5
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
--------------------------------------------------------------------------
Copyright (c) 2009-2012 Max Guglielmi

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
--------------------------------------------------------------------------
	- Special credit to: 
	Cedric Wartel, cnx.claude@free.fr, Florent Hirchy, Váry Péter, 
	Anthony Maes, Nuovella Williams, Fuggerbit, Venkata Seshagiri Rao 
	Raya, Piepiax, Manuel Kern, Baladhandayutham for active contribution 
	and/or inspiration
------------------------------------------------------------------------*/

var TF=function(id)
{if(arguments.length===0){return;}
this.id=id;this.version='2.5';this.year=(new Date()).getFullYear();this.tbl=tf_Id(id);this.startRow=undefined;this.refRow=null;this.headersRow=null;this.fObj=null;this.nbFilterableRows=null;this.nbRows=null;this.nbCells=null;this.hasGrid=false;this.enableModules=true;if(this.tbl!=null&&this.tbl.nodeName.tf_LCase()=='table'&&this.GetRowsNb())
{if(arguments.length>1)
{for(var i=0;i<arguments.length;i++)
{var argtype=typeof arguments[i];switch(argtype.tf_LCase())
{case'number':this.startRow=arguments[i];break;case'object':this.fObj=arguments[i];break;}}}
var f=!this.fObj?{}:this.fObj;this.refRow=this.startRow==undefined?2:(this.startRow+1);try{this.nbCells=this.GetCellsNb(this.refRow)}
catch(e){this.nbCells=this.GetCellsNb(0)}
this.basePath=f.base_path!=undefined?f.base_path:'TableFilter/';if(this.enableModules){this.registeredModules=[];this.alreadyImportedModules=[];this.importedModules=[];this.modulesPath=f.modules_path!=undefined?f.modules_path:this.basePath+'TF_Modules/';this.module={populateSelect:{name:'populateSelect',desc:'Builds select type filters',path:this.modulesPath+'tf_populateSelect.js',loaded:0,init:function(o){o.module.populateSelect.loaded=1;}},populateCheckList:{name:'populateCheckList',desc:'Builds checklist type filters',path:this.modulesPath+'tf_populateCheckList.js',loaded:0,init:function(o){o.module.populateCheckList.loaded=1;}},gridLayout:{name:'gridLayout',desc:'Grid layout feature',path:this.modulesPath+'tf_gridLayout.js',loaded:0,init:function(o){o.module.gridLayout.loaded=1;}},paging:{name:'paging',desc:'Paging feature',path:this.modulesPath+'tf_paging.js',loaded:0,init:function(o){o.module.paging.loaded=1;}},sort:{name:'sort',desc:'Sort feature',path:this.modulesPath+'tf_sort.js',loaded:0,init:function(o){o.module.sort.loaded=1;}},popUpFilters:{name:'popUpFilters',desc:'Filters in pop-up container feature',path:this.modulesPath+'tf_popupFilters.js',loaded:0,init:function(o){o.module.popUpFilters.loaded=1;}},themes:{name:'themes',desc:'Themes loading feature',path:this.modulesPath+'tf_themes.js',loaded:0,init:function(o){o.module.themes.loaded=1;}},colOps:{name:'colOps',desc:'Columns operations feature',path:this.modulesPath+'tf_colOps.js',loaded:0,init:function(o){o.module.colOps.loaded=1;}},fixedHeaders:{name:'fixedHeaders',desc:'Fixed headers feature - Deprecated',path:this.modulesPath+'tf_fixedHeaders.js',loaded:0,init:function(o){o.module.fixedHeaders.loaded=1;}},rowsCounter:{name:'rowsCounter',desc:'Rows counter feature',path:this.modulesPath+'tf_rowsCounter.js',loaded:0,init:function(o){o.module.rowsCounter.loaded=1;}},loader:{name:'loader',desc:'Loader feature',path:this.modulesPath+'tf_loader.js',loaded:0,init:function(o){o.module.loader.loaded=1;}},statusBar:{name:'statusBar',desc:'Status bar feature',path:this.modulesPath+'tf_statusBar.js',loaded:0,init:function(o){o.module.statusBar.loaded=1;}},resetBtn:{name:'resetBtn',desc:'Reset button feature',path:this.modulesPath+'tf_resetBtn.js',loaded:0,init:function(o){o.module.resetBtn.loaded=1;}},helpInstructions:{name:'helpInstructions',desc:'Help, About',path:this.modulesPath+'tf_resetBtn.js',loaded:0,init:function(o){o.module.helpInstructions.loaded=1;}},alternateRows:{name:'alternateRows',desc:'Alternating rows color feature',path:this.modulesPath+'tf_alternateRows.js',loaded:0,init:function(o){o.module.alternateRows.loaded=1;}},cookies:{name:'cookies',desc:'Remember values feature (cookies)',path:this.modulesPath+'tf_cookies.js',loaded:0,init:function(o){o.module.cookies.loaded=1;}},highlightKeywords:{name:'highlightKeywords',desc:'Remember values feature (cookies)',path:this.modulesPath+'tf_highlightKeywords.js',loaded:0,init:function(o){o.module.highlightKeywords.loaded=1;}},refreshFilters:{name:'refreshFilters',desc:'Refresh filters feature',path:this.modulesPath+'tf_refreshFilters.js',loaded:0,init:function(o){o.module.refreshFilters.loaded=1;}},extensions:{name:'extensions',desc:'Extensions loading feature',path:this.modulesPath+'tf_extensions.js',loaded:0,init:function(o){o.module.extensions.loaded=1;}},watermark:{name:'watermark',desc:'Watermark feature',path:this.modulesPath+'tf_watermark.js',loaded:0,init:function(o){o.module.watermark.loaded=1;}},ezEditTable:{name:'ezEditTable',desc:'ezEditTable adapter',path:this.modulesPath+'tf_ezEditTable.js',loaded:0,init:function(o){o.module.ezEditTable.loaded=1;}},publicMethods:{name:'publicMethods',desc:'Additional public methods for developers',path:this.modulesPath+'tf_publicMethods.js',loaded:0,init:function(o){o.module.publicMethods.loaded=1;}}};}
this.fltTypeInp='input';this.fltTypeSlc='select';this.fltTypeMulti='multiple';this.fltTypeCheckList='checklist';this.fltTypeNone='none';this.fltCol=[];for(var i=0;i<this.nbCells;i++){if(this['col'+i]==undefined)
this['col'+i]=(f['col_'+i]==undefined)?this.fltTypeInp:f['col_'+i].tf_LCase();this.fltCol.push(this['col'+i]);}
if(this.enableModules){if(this.fltCol.tf_Has(this.fltTypeSlc)||this.fltCol.tf_Has(this.fltTypeMulti))
this.registeredModules.push(this.module.populateSelect.name);if(this.fltCol.tf_Has(this.fltTypeCheckList))this.registeredModules.push(this.module.populateCheckList.name);}
this.publicMethods=f.public_methods!=undefined?f.public_methods:false;this.fltGrid=f.grid==false?false:true;this.gridLayout=f.grid_layout?true:false;this.hasGridWidthsRow=false;this.gridColElms=[];this.sourceTblHtml=null;if(this.gridLayout){if(this.tbl.outerHTML==undefined)tf_SetOuterHtml();this.sourceTblHtml=this.tbl.outerHTML;}
this.filtersRowIndex=f.filters_row_index!=undefined?f.filters_row_index:0;this.headersRow=f.headers_row_index!=undefined?f.headers_row_index:(this.filtersRowIndex==0?1:0);if(this.gridLayout){if(this.headersRow>1)this.filtersRowIndex=this.headersRow+1;else{this.filtersRowIndex=1;this.headersRow=0;}}
this.fltCellTag=f.filters_cell_tag!=undefined?(f.filters_cell_tag!='th'?'td':'th'):'td';this.fltIds=[];this.fltElms=[];this.searchArgs=null;this.tblData=[];this.validRowsIndex=null;this.fltGridEl=null;this.isFirstLoad=true;this.infDiv=null;this.lDiv=null;this.rDiv=null;this.mDiv=null;this.contDiv=null;this.infDivCssClass=f.inf_div_css_class!=undefined?f.inf_div_css_class:'inf';this.lDivCssClass=f.left_div_css_class!=undefined?f.left_div_css_class:'ldiv';this.rDivCssClass=f.right_div_css_class!=undefined?f.right_div_css_class:'rdiv';this.mDivCssClass=f.middle_div_css_class!=undefined?f.middle_div_css_class:'mdiv';this.contDivCssClass=f.content_div_css_class!=undefined?f.content_div_css_class:'cont';this.stylesheet=f.stylesheet!=undefined?f.stylesheet:this.basePath+'filtergrid.css';this.stylesheetId=this.id+'_style';this.fltsRowCssClass=f.flts_row_css_class!=undefined?f.flts_row_css_class:'fltrow';this.enableIcons=f.enable_icons!=undefined?f.enable_icons:true;this.alternateBgs=f.alternate_rows?true:false;this.hasColWidth=f.col_width?true:false;this.colWidth=this.hasColWidth?f.col_width:null;this.fixedHeaders=f.fixed_headers?true:false;this.tBodyH=f.tbody_height?f.tbody_height:200;this.fltCssClass=f.flt_css_class!=undefined?f.flt_css_class:'flt';this.fltMultiCssClass=f.flt_multi_css_class!=undefined?f.flt_multi_css_class:'flt_multi';this.fltSmallCssClass=f.flt_small_css_class!=undefined?f.flt_small_css_class:'flt_s';this.singleFltCssClass=f.single_flt_css_class!=undefined?f.single_flt_css_class:'single_flt';this.isStartBgAlternate=true;this.rowBgEvenCssClass=f.even_row_css_class!=undefined?f.even_row_css_class:'even';this.rowBgOddCssClass=f.odd_row_css_class!=undefined?f.odd_row_css_class:'odd';this.enterKey=f.enter_key==false?false:true;this.isModFilterFn=f.mod_filter_fn?true:false;this.modFilterFn=this.isModFilterFn?f.mod_filter_fn:null;this.onBeforeFilter=tf_IsFn(f.on_before_filter)?f.on_before_filter:null;this.onAfterFilter=tf_IsFn(f.on_after_filter)?f.on_after_filter:null;this.matchCase=f.match_case?true:false;this.exactMatch=f.exact_match?true:false;this.refreshFilters=f.refresh_filters?true:false;this.disableExcludedOptions=f.disable_excluded_options!=undefined?f.disable_excluded_options:false;this.activeFlt=null;this.activeFilterId=null;this.hasColOperation=f.col_operation?true:false;this.colOperation=null;this.hasVisibleRows=f.rows_always_visible?true:false;this.visibleRows=this.hasVisibleRows?f.rows_always_visible:[];this.searchType=f.search_type!=undefined?f.search_type:'include';this.isExternalFlt=f.external_flt_grid?true:false;this.externalFltTgtIds=f.external_flt_grid_ids!=undefined?f.external_flt_grid_ids:null;this.externalFltEls=[];this.execDelay=f.exec_delay?parseInt(f.exec_delay):100;this.status=f.status?true:false;this.onFiltersLoaded=tf_IsFn(f.on_filters_loaded)?f.on_filters_loaded:null;this.singleSearchFlt=f.single_search_filter?true:false;this.onRowValidated=tf_IsFn(f.on_row_validated)?f.on_row_validated:null;this.customCellDataCols=f.custom_cell_data_cols?f.custom_cell_data_cols:[];this.customCellData=tf_IsFn(f.custom_cell_data)?f.custom_cell_data:null;this.inpWatermark=f.input_watermark!=undefined?f.input_watermark:'';this.inpWatermarkCssClass=f.input_watermark_css_class!=undefined?f.input_watermark_css_class:'fltWatermark';this.isInpWatermarkArray=f.input_watermark!=undefined?(tf_IsArray(f.input_watermark)?true:false):false;this.toolBarTgtId=f.toolbar_target_id!=undefined?f.toolbar_target_id:null;this.helpInstructions=(f.help_instructions!=undefined)?f.help_instructions:null;this.popUpFilters=f.popup_filters!=undefined?f.popup_filters:false;this.markActiveColumns=f.mark_active_columns!=undefined?f.mark_active_columns:false;this.activeColumnsCssClass=f.active_columns_css_class!=undefined?f.active_columns_css_class:'activeHeader';this.onBeforeActiveColumn=tf_IsFn(f.on_before_active_column)?f.on_before_active_column:null;this.onAfterActiveColumn=tf_IsFn(f.on_after_active_column)?f.on_after_active_column:null;this.displayAllText=f.display_all_text!=undefined?f.display_all_text:'';this.enableSlcResetFilter=f.enable_slc_reset_filter!=undefined?f.enable_slc_reset_filter:true;this.enableEmptyOption=f.enable_empty_option?true:false;this.emptyText=f.empty_text!=undefined?f.empty_text:'(Empty)';this.enableNonEmptyOption=f.enable_non_empty_option?true:false;this.nonEmptyText=f.non_empty_text!=undefined?f.non_empty_text:'(Non empty)';this.onSlcChange=f.on_change==false?false:true;this.sortSlc=f.sort_select==false?false:true;this.isSortNumAsc=f.sort_num_asc?true:false;this.sortNumAsc=this.isSortNumAsc?f.sort_num_asc:null;this.isSortNumDesc=f.sort_num_desc?true:false;this.sortNumDesc=this.isSortNumDesc?f.sort_num_desc:null;this.slcFillingMethod=f.slc_filling_method!=undefined?f.slc_filling_method:'createElement';this.fillSlcOnDemand=f.fill_slc_on_demand?true:false;this.activateSlcTooltip=f.activate_slc_tooltip!=undefined?f.activate_slc_tooltip:'Click to activate';this.multipleSlcTooltip=f.multiple_slc_tooltip!=undefined?f.multiple_slc_tooltip:'Use Ctrl key for multiple selections';this.hasCustomSlcOptions=f.custom_slc_options&&tf_IsObj(f.custom_slc_options)?true:false;this.customSlcOptions=f.custom_slc_options!=undefined?f.custom_slc_options:null;this.onBeforeOperation=tf_IsFn(f.on_before_operation)?f.on_before_operation:null;this.onAfterOperation=tf_IsFn(f.on_after_operation)?f.on_after_operation:null;this.checkListDiv=[];this.checkListDivCssClass=f.div_checklist_css_class!=undefined?f.div_checklist_css_class:'div_checklist';this.checkListCssClass=f.checklist_css_class!=undefined?f.checklist_css_class:'flt_checklist';this.checkListItemCssClass=f.checklist_item_css_class!=undefined?f.checklist_item_css_class:'flt_checklist_item';this.checkListSlcItemCssClass=f.checklist_selected_item_css_class!=undefined?f.checklist_selected_item_css_class:'flt_checklist_slc_item';this.activateCheckListTxt=f.activate_checklist_text!=undefined?f.activate_checklist_text:'Click to load data';this.checkListItemDisabledCssClass=f.checklist_item_disabled_css_class!=undefined?f.checklist_item_disabled_css_class:'flt_checklist_item_disabled';this.enableCheckListResetFilter=f.enable_checklist_reset_filter!=undefined?f.enable_checklist_reset_filter:true;this.rgxOperator=f.regexp_operator!=undefined?f.regexp_operator:'rgx:';this.emOperator=f.empty_operator!=undefined?f.empty_operator:'[empty]';this.nmOperator=f.nonempty_operator!=undefined?f.nonempty_operator:'[nonempty]';this.orOperator=f.or_operator!=undefined?f.or_operator:'||';this.anOperator=f.and_operator!=undefined?f.and_operator:'&&';this.grOperator=f.greater_operator!=undefined?f.greater_operator:'>';this.lwOperator=f.lower_operator!=undefined?f.lower_operator:'<';this.leOperator=f.lower_equal_operator!=undefined?f.lower_equal_operator:'<=';this.geOperator=f.greater_equal_operator!=undefined?f.greater_equal_operator:'>=';this.dfOperator=f.different_operator!=undefined?f.different_operator:'!';this.lkOperator=f.like_operator!=undefined?f.like_operator:'*';this.eqOperator=f.equal_operator!=undefined?f.equal_operator:'=';this.stOperator=f.start_with_operator!=undefined?f.start_with_operator:'{';this.enOperator=f.end_with_operator!=undefined?f.end_with_operator:'}';this.curExp=f.cur_exp!=undefined?f.cur_exp:'^[¥£€$]';this.separator=f.separator!=undefined?f.separator:',';this.rowsCounter=f.rows_counter?true:false;this.statusBar=f.status_bar?f.status_bar:false;this.loader=f.loader?true:false;this.displayBtn=f.btn?true:false;this.btnText=f.btn_text!=undefined?f.btn_text:(!this.enableIcons?'Go':'');this.btnCssClass=f.btn_css_class!=undefined?f.btn_css_class:(!this.enableIcons?'btnflt':'btnflt_icon');this.btnReset=f.btn_reset?true:false;this.btnResetCssClass=f.btn_reset_css_class!=undefined?f.btn_reset_css_class:'reset';this.onBeforeReset=tf_IsFn(f.on_before_reset)?f.on_before_reset:null;this.onAfterReset=tf_IsFn(f.on_after_reset)?f.on_after_reset:null;this.paging=f.paging?true:false;this.hasResultsPerPage=f.results_per_page?true:false;this.btnPageCssClass=f.paging_btn_css_class!=undefined?f.paging_btn_css_class:'pgInp';this.pagingSlc=null;this.resultsPerPage=null;this.resultsPerPageSlc=null;this.isPagingRemoved=false;this.nbVisibleRows=0;this.nbHiddenRows=0;this.startPagingRow=0;this.nbPages=0;this.currentPageNb=1;this.sort=f.sort?true:false;this.isSortEnabled=false;this.sorted=false;this.sortConfig=f.sort_config!=undefined?f.sort_config:{};this.sortConfig.name=this.sortConfig['name']!=undefined?f.sort_config.name:'sortabletable';this.sortConfig.src=this.sortConfig['src']!=undefined?f.sort_config.src:this.basePath+'sortabletable.js';this.sortConfig.adapterSrc=this.sortConfig['adapter_src']!=undefined?f.sort_config.adapter_src:this.basePath+'tfAdapter.sortabletable.js';this.sortConfig.initialize=this.sortConfig['initialize']!=undefined?f.sort_config.initialize:function(o){if(o.SetSortTable)o.SetSortTable();};this.sortConfig.sortTypes=this.sortConfig['sort_types']!=undefined?f.sort_config.sort_types:[];this.sortConfig.sortCol=this.sortConfig['sort_col']!=undefined?f.sort_config.sort_col:null;this.sortConfig.asyncSort=this.sortConfig['async_sort']!=undefined?true:false;this.sortConfig.triggerIds=this.sortConfig['sort_trigger_ids']!=undefined?f.sort_config.sort_trigger_ids:[];this.selectable=f.selectable!=undefined?f.selectable:false;this.editable=f.editable!=undefined?f.editable:false;this.onKeyUp=f.on_keyup?true:false;this.onKeyUpDelay=f.on_keyup_delay!=undefined?f.on_keyup_delay:900;this.isUserTyping=null;this.onKeyUpTimer=undefined;this.highlightKeywords=f.highlight_keywords?true:false;this.highlightCssClass=f.highlight_css_class!=undefined?f.highlight_css_class:'keyword';this.highlightedNodes=[];this.defaultDateType=f.default_date_type!=undefined?f.default_date_type:'DMY';this.thousandsSeparator=f.thousands_separator!=undefined?f.thousands_separator:',';this.decimalSeparator=f.decimal_separator!=undefined?f.decimal_separator:'.';this.hasColNbFormat=f.col_number_format?true:false;this.colNbFormat=this.hasColNbFormat?f.col_number_format:null;this.hasColDateType=f.col_date_type?true:false;this.colDateType=this.hasColDateType?f.col_date_type:null;this.msgFilter=f.msg_filter!=undefined?f.msg_filter:'Filtering data...';this.msgPopulate=f.msg_populate!=undefined?f.msg_populate:'Populating filter...';this.msgPopulateCheckList=f.msg_populate_checklist!=undefined?f.msg_populate_checklist:'Populating list...';this.msgChangePage=f.msg_change_page!=undefined?f.msg_change_page:'Collecting paging data...';this.msgClear=f.msg_clear!=undefined?f.msg_clear:'Clearing filters...';this.msgChangeResults=f.msg_change_results!=undefined?f.msg_change_results:'Changing results per page...';this.msgResetValues=f.msg_reset_grid_values!=undefined?f.msg_reset_grid_values:'Re-setting filters values...';this.msgResetPage=f.msg_reset_page!=undefined?f.msg_reset_page:'Re-setting page...';this.msgResetPageLength=f.msg_reset_page_length!=undefined?f.msg_reset_page_length:'Re-setting page length...';this.msgSort=f.msg_sort!=undefined?f.msg_sort:'Sorting data...';this.msgLoadExtensions=f.msg_load_extensions!=undefined?f.msg_load_extensions:'Loading extensions...';this.msgLoadThemes=f.msg_load_themes!=undefined?f.msg_load_themes:'Loading theme(s)...';this.prfxTf='TF';this.prfxFlt='flt';this.prfxValButton='btn';this.prfxInfDiv='inf_';this.prfxLDiv='ldiv_';this.prfxRDiv='rdiv_';this.prfxMDiv='mdiv_';this.prfxContentDiv='cont_';this.prfxCheckListDiv='chkdiv_';this.prfxSlcPages='slcPages_';this.prfxSlcResults='slcResults_';this.prfxSlcResultsTxt='slcResultsTxt_';this.prfxBtnNextSpan='btnNextSpan_';this.prfxBtnPrevSpan='btnPrevSpan_';this.prfxBtnLastSpan='btnLastSpan_';this.prfxBtnFirstSpan='btnFirstSpan_';this.prfxBtnNext='btnNext_';this.prfxBtnPrev='btnPrev_';this.prfxBtnLast='btnLast_';this.prfxBtnFirst='btnFirst_';this.prfxPgSpan='pgspan_';this.prfxPgBeforeSpan='pgbeforespan_';this.prfxPgAfterSpan='pgafterspan_';this.prfxCounter='counter_';this.prfxTotRows='totrows_span_';this.prfxTotRowsTxt='totRowsTextSpan_';this.prfxResetSpan='resetspan_';this.prfxLoader='load_';this.prfxStatus='status_';this.prfxStatusSpan='statusSpan_';this.prfxStatusTxt='statusText_';this.prfxCookieFltsValues='tf_flts_';this.prfxCookiePageNb='tf_pgnb_';this.prfxCookiePageLen='tf_pglen_';this.prfxMainTblCont='gridCont_';this.prfxTblCont='tblCont_';this.prfxHeadTblCont='tblHeadCont_';this.prfxHeadTbl='tblHead_';this.prfxGridFltTd='_td_';this.prfxGridTh='tblHeadTh_';this.prfxHelpSpan='helpSpan_';this.prfxHelpDiv='helpDiv_';this.prfxPopUpSpan='popUpSpan_';this.prfxPopUpDiv='popUpDiv_';this.hasStoredValues=false;this.rememberGridValues=f.remember_grid_values?true:false;this.fltsValuesCookie=this.prfxCookieFltsValues+this.id;this.rememberPageNb=this.paging&&f.remember_page_number?true:false;this.pgNbCookie=this.prfxCookiePageNb+this.id;this.rememberPageLen=this.paging&&f.remember_page_length?true:false;this.pgLenCookie=this.prfxCookiePageLen+this.id;this.cookieDuration=f.set_cookie_duration?parseInt(f.set_cookie_duration):100000;this.hasExtensions=f.extensions?true:false;this.extensions=(this.hasExtensions)?f.extensions:null;this.enableDefaultTheme=f.enable_default_theme?true:false;this.hasThemes=(f.enable_default_theme||(f.themes&&tf_IsObj(f.themes)))?true:false;this.themes=(this.hasThemes)?f.themes:null;this.themesPath=f.themes_path!=undefined?f.themes_path:this.basePath+'TF_Themes/';this.hasBindScript=f.bind_script?true:false;this.bindScript=(this.hasBindScript)?f.bind_script:null;var o=this;this.Evt={name:{filter:'Filter',populateselect:'Populate',populatechecklist:'PopulateCheckList',changepage:'ChangePage',clear:'Clear',changeresultsperpage:'ChangeResults',resetvalues:'ResetValues',resetpage:'ResetPage',resetpagelength:'ResetPageLength',sort:'Sort',loadextensions:'LoadExtensions',loadthemes:'LoadThemes'},_DetectKey:function(e)
{if(!o.enterKey)return;var evt=e||window.event;if(evt)
{var key=(evt.charCode)?evt.charCode:((evt.keyCode)?evt.keyCode:((evt.which)?evt.which:0));if(key=='13')
{o.Filter();tf_CancelEvent(evt);tf_StopEvent(evt);}else{o.isUserTyping=true;window.clearInterval(o.onKeyUpTimer);o.onKeyUpTimer=undefined;}}},_OnKeyUp:function(e)
{if(!o.onKeyUp)return;var evt=e||window.event;var key=(evt.charCode)?evt.charCode:((evt.keyCode)?evt.keyCode:((evt.which)?evt.which:0));o.isUserTyping=false;if(key!=13&&key!=9&&key!=27&&key!=38&&key!=40)
{function filter()
{window.clearInterval(o.onKeyUpTimer);o.onKeyUpTimer=undefined;if(!o.isUserTyping)
{o.Filter();o.isUserTyping=null;}}
if(o.onKeyUpTimer==undefined)
o.onKeyUpTimer=window.setInterval(filter,o.onKeyUpDelay);}else{window.clearInterval(o.onKeyUpTimer);o.onKeyUpTimer=undefined;}},_OnKeyDown:function(e)
{if(!o.onKeyUp)return;o.isUserTyping=true;},_OnInpBlur:function(e)
{if(o.onKeyUp){o.isUserTyping=false;window.clearInterval(o.onKeyUpTimer);}
if(this.value==''&&o.inpWatermark!=''){this.value=(o.isInpWatermarkArray)?o.inpWatermark[this.getAttribute('ct')]:o.inpWatermark;tf_AddClass(this,o.inpWatermarkCssClass);}
if(o.ezEditTable){if(o.editable)o.ezEditTable.Editable.Set();if(o.selectable)o.ezEditTable.Selection.Set();}},_OnInpFocus:function(e)
{var evt=e||window.event;o.activeFilterId=this.getAttribute('id');o.activeFlt=tf_Id(o.activeFilterId);if(!o.isInpWatermarkArray){if(this.value==o.inpWatermark&&o.inpWatermark!=''){this.value='';tf_RemoveClass(this,o.inpWatermarkCssClass);}}else{var inpWatermark=o.inpWatermark[this.getAttribute('ct')];if(this.value==inpWatermark&&inpWatermark!=''){this.value='';tf_RemoveClass(this,o.inpWatermarkCssClass);}}
if(o.popUpFilters){tf_CancelEvent(evt);tf_StopEvent(evt);}
if(o.ezEditTable){if(o.editable)o.ezEditTable.Editable.Remove();if(o.selectable)o.ezEditTable.Selection.Remove();}},_OnSlcFocus:function(e)
{var evt=e||window.event;o.activeFilterId=this.getAttribute('id');o.activeFlt=tf_Id(o.activeFilterId);if(o.fillSlcOnDemand&&this.getAttribute('filled')=='0')
{var ct=this.getAttribute('ct');o.PopulateSelect(ct);if(!tf_isIE)this.setAttribute('filled','1');}
if(o.popUpFilters){tf_CancelEvent(evt);tf_StopEvent(evt);}},_OnSlcChange:function(e)
{var evt=e||window.event;if(o.popUpFilters)tf_StopEvent(evt);if(o.onSlcChange)o.Filter();},_OnSlcBlur:function()
{},_OnCheckListChange:function(e)
{if(!o.Evt._OnCheckListChange.caller)return;o.Evt._OnSlcChange(e);},_OnCheckListClick:function()
{if(o.fillSlcOnDemand&&this.getAttribute('filled')=='0')
{var ct=this.getAttribute('ct');o.PopulateCheckList(ct);o.checkListDiv[ct].onclick=null;o.checkListDiv[ct].title='';}},_OnCheckListFocus:function()
{o.activeFilterId=this.firstChild.getAttribute('id');o.activeFlt=tf_Id(o.activeFilterId);},_OnBtnClick:function()
{o.Filter();},_OnSlcPagesChangeEvt:null,_EnableSlc:function()
{this.firstChild.disabled=false;this.firstChild.focus();this.onclick=null;},_Clear:function()
{o.ClearFilters();},_OnHelpBtnClick:function()
{o._ToggleHelp();},_Paging:{nextEvt:null,prevEvt:null,lastEvt:null,firstEvt:null}};if(this.enableModules){var m=this.module,rm=this.registeredModules;if(this.loader||this.statusBar||this.status||this.hasThemes)
rm.push(m.loader.name);if(this.hasThemes)rm.push(m.themes.name);if(this.paging)rm.push(m.paging.name);if(this.gridLayout)rm.push(m.gridLayout.name);if(this.sort||this.gridLayout)rm.push(m.sort.name);if(this.popUpFilters)rm.push(m.popUpFilters.name);if(this.rowsCounter)rm.push(m.rowsCounter.name);if(this.fixedHeaders)rm.push(m.fixedHeaders.name);if(this.rememberGridValues||this.rememberPageLen||this.rememberPageNb)
rm.push(m.cookies.name);if(this.statusBar||this.status||this.loader||this.hasThemes)rm.push(m.statusBar.name);if(this.btnReset)rm.push(m.resetBtn.name);if((this.helpInstructions||this.helpInstructions==null))rm.push(m.helpInstructions.name);if(this.alternateBgs)rm.push(m.alternateRows.name);if(this.highlightKeywords)rm.push(m.highlightKeywords.name);if(this.refreshFilters)rm.push(m.refreshFilters.name);if(this.hasColOperation)rm.push(m.colOps.name);if(this.selectable||this.editable)rm.push(m.ezEditTable.name);if(this.hasExtensions||this.gridLayout){rm.push(m.extensions.name);if(!rm.tf_Has(m.populateCheckList.name,true))rm.push(m.populateCheckList.name);}
if(this.inpWatermark!='')rm.push(m.watermark.name);if(this.publicMethods||this.hasExtensions||this.refreshFilters||this.popUpFilters||this.markActiveColumns)rm.push(m.publicMethods.name);for(var i=0;i<rm.length;i++){var module=m[rm[i]];if(tf_IsImported(module.path)){module.loaded=1;this.alreadyImportedModules.push(module.name);}else{this.ImportModule(module);this.importedModules.push(module.name)};}}}}
TF.prototype={AddGrid:function()
{if(this.enableModules){if(this.isFirstLoad){var o=this;if(tf_isNotIE){window[this.id+'_DelayAddGrid']=function()
{if(arguments.callee.done)return;setTimeout(function(){o._AddGrid();},1);arguments.callee.done=1;}
tf_AddEvent(window,'load',window[this.id+'_DelayAddGrid']);}else{function checkLoadedModules(){var modulesFullyImported=true;for(var i=0;i<o.registeredModules.length;i++){var module=o.module[o.registeredModules[i]];if(!module.loaded){modulesFullyImported=false;break;}}
if(modulesFullyImported){clearInterval(pe);o._AddGrid();}}
var pe=setInterval(checkLoadedModules,10);}}else this._AddGrid();}else this._AddGrid();},Init:function(){this.AddGrid();},Initialize:function(){this.AddGrid();},init:function(){this.AddGrid();},initialize:function(){this.AddGrid();},_AddGrid:function()
{if(this.hasGrid)return;if(this.gridLayout)this.refRow=this.startRow==undefined?0:this.startRow;if(this.popUpFilters&&((this.filtersRowIndex==0&&this.headersRow==1)||this.gridLayout))this.headersRow=0;var f=!this.fObj?{}:this.fObj;var n=(this.singleSearchFlt)?1:this.nbCells,inpclass;if(window['tf_'+this.id]==undefined)window['tf_'+this.id]=this;this.IncludeFile(this.stylesheetId,this.stylesheet,null,'link');if(this.hasThemes)this._LoadThemes();if(this.gridLayout)
{this.isExternalFlt=true;this.SetGridLayout();this.refRow=(tf_isIE||tf_isIE7)?(this.refRow+1):0;}
if(this.loader)this.SetLoader();if(this.popUpFilters){if(!this.isFirstLoad&&!this.gridLayout){this.headersRow--;}this.SetPopupFilterIcons();}
if(this.hasResultsPerPage)
{this.resultsPerPage=f['results_per_page']!=undefined?f['results_per_page']:this.resultsPerPage;if(this.resultsPerPage.length<2)
this.hasResultsPerPage=false;else
this.pagingLength=this.resultsPerPage[1][0];}
if(!this.fltGrid)
{this.refRow=(this.refRow-1);if(this.gridLayout)this.refRow=0;this.nbFilterableRows=this.GetRowsNb();this.nbVisibleRows=this.nbFilterableRows;this.nbRows=this.nbFilterableRows+this.refRow;}else{if(this.isFirstLoad)
{if(!this.gridLayout){var fltrow;var thead=tf_Tag(this.tbl,'thead');if(thead.length>0)
fltrow=thead[0].insertRow(this.filtersRowIndex);else
fltrow=this.tbl.insertRow(this.filtersRowIndex);if(this.headersRow>1&&this.filtersRowIndex<=this.headersRow&&!this.popUpFilters)this.headersRow++;if(this.popUpFilters)this.headersRow++;if(this.fixedHeaders)this.SetFixedHeaders();fltrow.className=this.fltsRowCssClass;if(this.isExternalFlt&&(!this.gridLayout||this.popUpFilters))fltrow.style.display='none';}
this.nbFilterableRows=this.GetRowsNb();this.nbVisibleRows=this.nbFilterableRows;this.nbRows=this.tbl.rows.length;for(var i=0;i<n;i++){var fltcell=tf_CreateElm(this.fltCellTag);if(this.singleSearchFlt)fltcell.colSpan=this.nbCells;if(!this.gridLayout)fltrow.appendChild(fltcell);inpclass=(i==n-1&&this.displayBtn)?this.fltSmallCssClass:this.fltCssClass;if(this.popUpFilters)this.SetPopupFilter(i);if(this['col'+i]==undefined)
this['col'+i]=(f['col_'+i]==undefined)?this.fltTypeInp:f['col_'+i].tf_LCase();if(this.singleSearchFlt)
{this['col'+i]=this.fltTypeInp;inpclass=this.singleFltCssClass;}
if(this['col'+i]==this.fltTypeSlc||this['col'+i]==this.fltTypeMulti)
{var slc=tf_CreateElm(this.fltTypeSlc,['id',this.prfxFlt+i+'_'+this.id],['ct',i],['filled','0']);if(this['col'+i]==this.fltTypeMulti)
{slc.multiple=this.fltTypeMulti;slc.title=this.multipleSlcTooltip;}
slc.className=(this['col'+i].tf_LCase()==this.fltTypeSlc)?inpclass:this.fltMultiCssClass;if(this.isExternalFlt&&this.externalFltTgtIds&&tf_Id(this.externalFltTgtIds[i]))
{tf_Id(this.externalFltTgtIds[i]).appendChild(slc);this.externalFltEls.push(slc);}else{fltcell.appendChild(slc);}
this.fltIds.push(this.prfxFlt+i+'_'+this.id);if(!this.fillSlcOnDemand)this._PopulateSelect(i);slc.onkeypress=this.Evt._DetectKey;slc.onchange=this.Evt._OnSlcChange;slc.onfocus=this.Evt._OnSlcFocus;slc.onblur=this.Evt._OnSlcBlur;if(this.fillSlcOnDemand)
{var opt0=tf_CreateOpt(this.displayAllText,'');slc.appendChild(opt0);}
if(this.fillSlcOnDemand&&tf_isIE)
{slc.disabled=true;slc.title=this.activateSlcTooltip;slc.parentNode.onclick=this.Evt._EnableSlc;if(this['col'+i]==this.fltTypeMulti)
this.__deferMultipleSelection(slc,0);}}
else if(this['col'+i]==this.fltTypeCheckList)
{var divCont=tf_CreateElm('div',['id',this.prfxCheckListDiv+i+'_'+this.id],['ct',i],['filled','0']);divCont.className=this.checkListDivCssClass;if(this.isExternalFlt&&this.externalFltTgtIds&&tf_Id(this.externalFltTgtIds[i]))
{tf_Id(this.externalFltTgtIds[i]).appendChild(divCont);this.externalFltEls.push(divCont);}else{fltcell.appendChild(divCont);}
this.checkListDiv[i]=divCont;this.fltIds.push(this.prfxFlt+i+'_'+this.id);if(!this.fillSlcOnDemand)this._PopulateCheckList(i);divCont.onclick=this.Evt._OnCheckListFocus;if(this.fillSlcOnDemand)
{divCont.onclick=this.Evt._OnCheckListClick;divCont.appendChild(tf_CreateText(this.activateCheckListTxt));}}
else
{var inptype;(this['col'+i]==this.fltTypeInp)?inptype='text':inptype='hidden';var inp=tf_CreateElm(this.fltTypeInp,['id',this.prfxFlt+i+'_'+this.id],['type',inptype],['ct',i]);if(inptype!='hidden')
inp.value=(this.isInpWatermarkArray)?this.inpWatermark[i]:this.inpWatermark;inp.className=inpclass;if(this.inpWatermark!='')tf_AddClass(inp,this.inpWatermarkCssClass);inp.onfocus=this.Evt._OnInpFocus;if(this.isExternalFlt&&this.externalFltTgtIds&&tf_Id(this.externalFltTgtIds[i]))
{tf_Id(this.externalFltTgtIds[i]).appendChild(inp);this.externalFltEls.push(inp);}else{fltcell.appendChild(inp);}
this.fltIds.push(this.prfxFlt+i+'_'+this.id);inp.onkeypress=this.Evt._DetectKey;inp.onkeydown=this.Evt._OnKeyDown;inp.onkeyup=this.Evt._OnKeyUp;inp.onblur=this.Evt._OnInpBlur;if(this.rememberGridValues)
{var flts=tf_ReadCookie(this.fltsValuesCookie);var reg=new RegExp(this.separator,'g');var flts_values=flts.split(reg);if(flts_values[i]!=' ')
this.SetFilterValue(i,flts_values[i],false);}}
if(i==n-1&&this.displayBtn)
{var btn=tf_CreateElm(this.fltTypeInp,['id',this.prfxValButton+i+'_'+this.id],['type','button'],['value',this.btnText]);btn.className=this.btnCssClass;if(this.isExternalFlt&&this.externalFltTgtIds&&tf_Id(this.externalFltTgtIds[i]))
tf_Id(this.externalFltTgtIds[i]).appendChild(btn);else
fltcell.appendChild(btn);btn.onclick=this.Evt._OnBtnClick;}}}else{this.__resetGrid();}}
if(this.rowsCounter)this.SetRowsCounter();if(this.statusBar)this.SetStatusBar();if(this.fixedHeaders&&!this.isFirstLoad)this.SetFixedHeaders();if(this.paging)this.SetPaging();if(this.hasResultsPerPage&&this.paging)this.SetResultsPerPage();if(this.btnReset)this.SetResetBtn();if(this.helpInstructions)this.SetHelpInstructions();if(this.hasColWidth&&!this.gridLayout)this.SetColWidths();if(this.alternateBgs&&this.isStartBgAlternate)
this.SetAlternateRows();if(this.hasColOperation&&this.fltGrid)
{this.colOperation=f.col_operation;this.SetColOperation();}
if(this.sort)this.SetSort();if(this.selectable||this.editable)this.SetEditable();if(this.hasBindScript)
{if(this.bindScript['src']!=undefined)
{var scriptPath=this.bindScript['src'];var scriptName=(this.bindScript['name']!=undefined)?this.bindScript['name']:'';this.IncludeFile(scriptName,scriptPath,this.bindScript['target_fn']);}}
this.isFirstLoad=false;this.hasGrid=true;if(this.rememberGridValues||this.rememberPageLen||this.rememberPageNb)
this.ResetValues();if(!this.gridLayout)tf_AddClass(this.tbl,this.prfxTf);if(this.loader)this.ShowLoader('none');if(this.hasExtensions)this.LoadExtensions();if(this.onFiltersLoaded)
this.onFiltersLoaded.call(null,this);},EvtManager:function(evt,s)
{var o=this;var slcIndex=(s!=undefined&&s.slcIndex!=undefined)?s.slcIndex:null;var slcExternal=(s!=undefined&&s.slcExternal!=undefined)?s.slcExternal:false;var slcId=(s!=undefined&&s.slcId!=undefined)?s.slcId:null;var pgIndex=(s!=undefined&&s.pgIndex!=undefined)?s.pgIndex:null;function efx(){if(evt!=undefined)
switch(evt)
{case o.Evt.name.filter:(o.isModFilterFn)?o.modFilterFn.call(null,o):o._Filter();break;case o.Evt.name.populateselect:(o.refreshFilters)?o._PopulateSelect(slcIndex,true):o._PopulateSelect(slcIndex,false,slcExternal,slcId);break;case o.Evt.name.populatechecklist:o._PopulateCheckList(slcIndex,slcExternal,slcId);break;case o.Evt.name.changepage:o._ChangePage(pgIndex);break;case o.Evt.name.clear:o._ClearFilters();o._Filter();break;case o.Evt.name.changeresultsperpage:o._ChangeResultsPerPage();break;case o.Evt.name.resetvalues:o._ResetValues();o._Filter();break;case o.Evt.name.resetpage:o._ResetPage(o.pgNbCookie);break;case o.Evt.name.resetpagelength:o._ResetPageLength(o.pgLenCookie);break;case o.Evt.name.sort:void(0);break;case o.Evt.name.loadextensions:o._LoadExtensions();break;case o.Evt.name.loadthemes:o._LoadThemes();break;default:o['_'+evt].call(null,o,s);break;}
if(o.status||o.statusBar)o.StatusMsg('');if(o.loader)o.ShowLoader('none');}
if(this.loader||this.status||this.statusBar)
{try{this.ShowLoader('');this.StatusMsg(o['msg'+evt]);}catch(e){}
window.setTimeout(efx,this.execDelay);}else efx();},ImportModule:function(module)
{if(!module.path||!module.name)return;this.IncludeFile(module.name,module.path,module.init);},RemoveGrid:function()
{if(this.fltGrid&&this.hasGrid)
{var rows=this.tbl.rows;if(this.paging)this.RemovePaging();if(this.statusBar)this.RemoveStatusBar();if(this.rowsCounter)this.RemoveRowsCounter();if(this.btnReset)this.RemoveResetBtn();if(this.helpInstructions||this.helpInstructions==null)this.RemoveHelpInstructions();if(this.paging)this.RemoveResultsPerPage();if(this.isExternalFlt&&!this.popUpFilters)this.RemoveExternalFlts();if(this.fixedHeaders)this.RemoveFixedHeaders();if(this.infDiv)this.RemoveTopDiv();if(this.highlightKeywords)this.UnhighlightAll();if(this.sort)this.RemoveSort();if(this.loader)this.RemoveLoader();if(this.popUpFilters)this.RemovePopupFilters();if(this.markActiveColumns)this.ClearActiveColumns();for(var j=this.refRow;j<this.nbRows;j++)
{rows[j].style.display='';try
{if(rows[j].hasAttribute('validRow'))
rows[j].removeAttribute('validRow');}
catch(e){for(var x=0;x<rows[j].attributes.length;x++)
{if(rows[j].attributes[x].nodeName.tf_LCase()=='validrow')
rows[j].removeAttribute('validRow');}}
if(this.alternateBgs)this.RemoveRowBg(j);}
if(this.fltGrid&&!this.gridLayout)
{this.fltGridEl=rows[this.filtersRowIndex];this.tbl.deleteRow(this.filtersRowIndex);}
if(this.gridLayout)this.RemoveGridLayout();tf_RemoveClass(this.tbl,this.prfxTf);this.activeFlt=null;this.isStartBgAlternate=true;this.hasGrid=false;}},SetTopDiv:function()
{if(this.infDiv!=null)return;var infdiv=tf_CreateElm('div',['id',this.prfxInfDiv+this.id]);infdiv.className=this.infDivCssClass;if(this.toolBarTgtId)
tf_Id(this.toolBarTgtId).appendChild(infdiv);else if(this.fixedHeaders&&this.contDiv)
this.contDiv.parentNode.insertBefore(infdiv,this.contDiv);else if(this.gridLayout){this.tblMainCont.appendChild(infdiv);infdiv.className=this.gridInfDivCssClass;}
else
this.tbl.parentNode.insertBefore(infdiv,this.tbl);this.infDiv=tf_Id(this.prfxInfDiv+this.id);var ldiv=tf_CreateElm('div',['id',this.prfxLDiv+this.id]);ldiv.className=this.lDivCssClass;;infdiv.appendChild(ldiv);this.lDiv=tf_Id(this.prfxLDiv+this.id);var rdiv=tf_CreateElm('div',['id',this.prfxRDiv+this.id]);rdiv.className=this.rDivCssClass;infdiv.appendChild(rdiv);this.rDiv=tf_Id(this.prfxRDiv+this.id);var mdiv=tf_CreateElm('div',['id',this.prfxMDiv+this.id]);mdiv.className=this.mDivCssClass;infdiv.appendChild(mdiv);this.mDiv=tf_Id(this.prfxMDiv+this.id);if(this.helpInstructions==null)this.SetHelpInstructions();},RemoveTopDiv:function()
{if(this.infDiv==null)return;this.infDiv.parentNode.removeChild(this.infDiv);this.infDiv=null;},RemoveExternalFlts:function()
{if(!this.isExternalFlt&&!this.externalFltTgtIds)return;for(var ct=0;ct<this.externalFltTgtIds.length;ct++)
if(tf_Id(this.externalFltTgtIds[ct]))
tf_Id(this.externalFltTgtIds[ct]).innerHTML='';},Filter:function()
{this.EvtManager(this.Evt.name.filter);},_Filter:function()
{if(!this.fltGrid||(!this.hasGrid&&!this.isFirstLoad))return;if(this.onBeforeFilter)this.onBeforeFilter.call(null,this);if(this.inpWatermark!='')this.SetWatermark(false);var row=this.tbl.rows;f=this.fObj!=undefined?this.fObj:[];var hiddenrows=0;this.validRowsIndex=[];var o=this;if(this.highlightKeywords)this.UnhighlightAll();if(this.popUpFilters)this.SetAllPopupFiltersIcon();if(this.markActiveColumns)this.ClearActiveColumns();this.searchArgs=this.GetFiltersValue();var num_cell_data,nbFormat;var re_le=new RegExp(this.leOperator),re_ge=new RegExp(this.geOperator);var re_l=new RegExp(this.lwOperator),re_g=new RegExp(this.grOperator);var re_d=new RegExp(this.dfOperator),re_lk=new RegExp(tf_RegexpEscape(this.lkOperator));var re_eq=new RegExp(this.eqOperator),re_st=new RegExp(this.stOperator);var re_en=new RegExp(this.enOperator),re_an=new RegExp(this.anOperator);var re_cr=new RegExp(this.curExp),re_em=this.emOperator;var re_nm=this.nmOperator,re_re=new RegExp(tf_RegexpEscape(this.rgxOperator));function highlight(str,ok,cell){if(o.highlightKeywords&&ok){str=str.replace(re_lk,'');str=str.replace(re_eq,'');str=str.replace(re_st,'');str=str.replace(re_en,'');var w=str;if(re_le.test(str)||re_ge.test(str)||re_l.test(str)||re_g.test(str)||re_d.test(str))
w=tf_GetNodeText(cell);if(w!='')
tf_HighlightWord(cell,w,o.highlightCssClass,o);}}
function hasArg(sA,cell_data,j)
{var occurence;var hasLO=re_l.test(sA),hasLE=re_le.test(sA);var hasGR=re_g.test(sA),hasGE=re_ge.test(sA);var hasDF=re_d.test(sA),hasEQ=re_eq.test(sA);var hasLK=re_lk.test(sA),hasAN=re_an.test(sA);var hasST=re_st.test(sA),hasEN=re_en.test(sA);var hasEM=(re_em==sA),hasNM=(re_nm==sA);var hasRE=re_re.test(sA);var isLDate=(hasLO&&tf_IsValidDate(sA.replace(re_l,''),dtType));var isLEDate=(hasLE&&tf_IsValidDate(sA.replace(re_le,''),dtType));var isGDate=(hasGR&&tf_IsValidDate(sA.replace(re_g,''),dtType));var isGEDate=(hasGE&&tf_IsValidDate(sA.replace(re_ge,''),dtType));var isDFDate=(hasDF&&tf_IsValidDate(sA.replace(re_d,''),dtType));var isEQDate=(hasEQ&&tf_IsValidDate(sA.replace(re_eq,''),dtType));if(tf_IsValidDate(cell_data,dtType))
{var dte1=tf_FormatDate(cell_data,dtType);if(isLDate)
{var dte2=tf_FormatDate(sA.replace(re_l,''),dtType);occurence=(dte1<dte2);}
else if(isLEDate)
{var dte2=tf_FormatDate(sA.replace(re_le,''),dtType);occurence=(dte1<=dte2);}
else if(isGEDate)
{var dte2=tf_FormatDate(sA.replace(re_ge,''),dtType);occurence=(dte1>=dte2);}
else if(isGDate)
{var dte2=tf_FormatDate(sA.replace(re_g,''),dtType);occurence=(dte1>dte2);}
else if(isDFDate)
{var dte2=tf_FormatDate(sA.replace(re_d,''),dtType);occurence=(dte1.toString()!=dte2.toString());}
else if(isEQDate)
{var dte2=tf_FormatDate(sA.replace(re_eq,''),dtType);occurence=(dte1.toString()==dte2.toString());}
else if(re_lk.test(sA))
{occurence=o.__containsStr(sA.replace(re_lk,''),cell_data,null,false);}
else if(tf_IsValidDate(sA,dtType))
{var dte2=tf_FormatDate(sA,dtType);occurence=(dte1.toString()==dte2.toString());}
else if(hasEM)
occurence=(cell_data.tf_Trim()==''?true:false);else if(hasNM)
occurence=(cell_data.tf_Trim()!=''?true:false);}
else
{if(o.hasColNbFormat&&o.colNbFormat[j]!=null)
{num_cell_data=tf_RemoveNbFormat(cell_data,o.colNbFormat[j]);nbFormat=o.colNbFormat[j];}else{if(o.thousandsSeparator==','&&o.decimalSeparator=='.')
{num_cell_data=tf_RemoveNbFormat(cell_data,'us');nbFormat='us';}else{num_cell_data=tf_RemoveNbFormat(cell_data,'eu');nbFormat='eu';}}
if(hasLE)
occurence=num_cell_data<=tf_RemoveNbFormat(sA.replace(re_le,''),nbFormat);else if(hasGE)
occurence=num_cell_data>=tf_RemoveNbFormat(sA.replace(re_ge,''),nbFormat);else if(hasLO)
occurence=num_cell_data<tf_RemoveNbFormat(sA.replace(re_l,''),nbFormat);else if(hasGR)
occurence=num_cell_data>tf_RemoveNbFormat(sA.replace(re_g,''),nbFormat);else if(hasDF)
occurence=o.__containsStr(sA.replace(re_d,''),cell_data)?false:true;else if(hasLK)
occurence=o.__containsStr(sA.replace(re_lk,''),cell_data,null,false);else if(hasEQ)
occurence=o.__containsStr(sA.replace(re_eq,''),cell_data,null,true);else if(hasST)
occurence=cell_data.indexOf(sA.replace(re_st,''))==0?true:false;else if(hasEN)
{var searchArg=sA.replace(re_en,'');occurence=cell_data.lastIndexOf(searchArg,cell_data.length-1)==(cell_data.length-1)-(searchArg.length-1)&&cell_data.lastIndexOf(searchArg,cell_data.length-1)>-1?true:false;}
else if(hasEM)
occurence=(cell_data.tf_Trim()==''?true:false);else if(hasNM)
occurence=(cell_data.tf_Trim()!=''?true:false);else if(hasRE){try{var searchArg=sA.replace(re_re,'');var rgx=new RegExp(searchArg);occurence=rgx.test(cell_data);}catch(e){occurence=false;}}
else
occurence=o.__containsStr(sA,cell_data,(f['col_'+j]==undefined)?this.fltTypeInp:f['col_'+j]);}
return occurence;}
for(var k=this.refRow;k<this.nbRows;k++)
{if(row[k].style.display=='none')row[k].style.display='';var cell=row[k].cells;var nchilds=cell.length;if(nchilds!=this.nbCells)continue;var occurence=[];var isRowValid=(this.searchType=='include')?true:false;var singleFltRowValid=false;for(var j=0;j<nchilds;j++)
{var sA=this.searchArgs[(this.singleSearchFlt)?0:j];var dtType=(this.hasColDateType)?this.colDateType[j]:this.defaultDateType;if(sA=='')continue;var cell_data=this.GetCellData(j,cell[j]).tf_MatchCase(this.matchCase);var sAOrSplit=sA.split(this.orOperator);var hasMultiOrSA=(sAOrSplit.length>1)?true:false;var sAAndSplit=sA.split(this.anOperator);var hasMultiAndSA=(sAAndSplit.length>1)?true:false;if(hasMultiOrSA||hasMultiAndSA)
{var cS,occur=false;var s=(hasMultiOrSA)?sAOrSplit:sAAndSplit;for(var w=0;w<s.length;w++)
{cS=s[w].tf_Trim();occur=hasArg(cS,cell_data,j);highlight(cS,occur,cell[j]);if(hasMultiOrSA&&occur)break;if(hasMultiAndSA&&!occur)break;}
occurence[j]=occur;}
else{occurence[j]=hasArg(sA.tf_Trim(),cell_data,j);highlight(sA,occurence[j],cell[j]);}
if(!occurence[j])isRowValid=(this.searchType=='include')?false:true;if(this.singleSearchFlt&&occurence[j])singleFltRowValid=true;if(this.popUpFilters)this.SetPopupFilterIcon(j,true);if(this.markActiveColumns){if(k==this.refRow){if(this.onBeforeActiveColumn)this.onBeforeActiveColumn.call(null,this,j);tf_AddClass(this.GetHeaderElement(j),this.activeColumnsCssClass);if(this.onAfterActiveColumn)this.onAfterActiveColumn.call(null,this,j);}}}
if(this.singleSearchFlt&&singleFltRowValid)isRowValid=true;if(!isRowValid)
{this.SetRowValidation(k,false);if(this.hasVisibleRows&&this.visibleRows.tf_Has(k)&&!this.paging)
this.validRowsIndex.push(k);else
hiddenrows++;}else{this.SetRowValidation(k,true);this.validRowsIndex.push(k);if(this.alternateBgs)this.SetRowBg(k,this.validRowsIndex.length);if(this.onRowValidated)this.onRowValidated.call(null,this,k);}}
this.nbVisibleRows=this.validRowsIndex.length;this.nbHiddenRows=hiddenrows;this.isStartBgAlternate=false;if(this.rememberGridValues)this.RememberFiltersValue(this.fltsValuesCookie);if(!this.paging)this.ApplyGridProps();if(this.paging){this.startPagingRow=0;this.currentPageNb=1;this.SetPagingInfo(this.validRowsIndex);}
if(this.onAfterFilter)this.onAfterFilter.call(null,this);},ApplyGridProps:function()
{if(this.activeFlt&&this.activeFlt.nodeName.tf_LCase()==this.fltTypeSlc&&!this.popUpFilters)
{this.activeFlt.blur();if(this.activeFlt.parentNode)this.activeFlt.parentNode.focus();}
if(this.visibleRows)this.SetVisibleRows();if(this.colOperation)this.SetColOperation();if(this.refreshFilters)this.RefreshFiltersGrid();var nr=(!this.paging&&this.hasVisibleRows)?(this.nbVisibleRows-this.visibleRows.length):this.nbVisibleRows;if(this.rowsCounter)this.RefreshNbRows(nr);if(this.inpWatermark!='')this.SetWatermark(true);if(this.popUpFilters)this.CloseAllPopupFilters();},GetColValues:function(colindex,num,exclude)
{if(!this.fltGrid)return;var row=this.tbl.rows;var colValues=[];for(var i=this.refRow;i<this.nbRows;i++)
{var isExludedRow=false;if(exclude!=undefined&&tf_IsObj(exclude))
{isExludedRow=exclude.tf_Has(i);}
var cell=row[i].cells;var nchilds=cell.length;if(nchilds==this.nbCells&&!isExludedRow)
{for(var j=0;j<nchilds;j++)
{if(j==colindex&&row[i].style.display=='')
{var cell_data=this.GetCellData(j,cell[j]).tf_LCase();var nbFormat=this.colNbFormat?this.colNbFormat[colindex]:null;(num)?colValues.push(tf_RemoveNbFormat(cell_data,nbFormat)):colValues.push(cell_data);}}}}
return colValues;},GetFilterValue:function(index)
{if(!this.fltGrid)return;var fltValue;var flt=this.GetFilterElement(index);if(flt==null)return fltValue='';if(this['col'+index]!=this.fltTypeMulti&&this['col'+index]!=this.fltTypeCheckList)
fltValue=flt.value;else if(this['col'+index]==this.fltTypeMulti)
{fltValue='';for(var j=0;j<flt.options.length;j++)
if(flt.options[j].selected)
fltValue=fltValue.concat(flt.options[j].value+' '+
this.orOperator+' ');fltValue=fltValue.substr(0,fltValue.length-4);}
else if(this['col'+index]==this.fltTypeCheckList)
{if(flt.getAttribute('value')!=null)
{fltValue=flt.getAttribute('value');fltValue=fltValue.substr(0,fltValue.length-3);}else fltValue='';}
return fltValue;},GetFiltersValue:function()
{if(!this.fltGrid)return;var searchArgs=[];for(var i=0;i<this.fltIds.length;i++)
searchArgs.push(this.GetFilterValue(i).tf_MatchCase(this.matchCase).tf_Trim());return searchArgs;},GetFilterId:function(index)
{if(!this.fltGrid)return;return this.fltIds[i];},GetFiltersByType:function(type,bool)
{if(!this.fltGrid)return;var arr=[];for(var i=0;i<this.fltIds.length;i++)
{var fltType=this['col'+i];if(fltType==type.tf_LCase())
{var a=(bool)?i:this.fltIds[i];arr.push(a);}}
return arr;},GetFilterElement:function(index)
{if(!this.fltGrid)return null;return tf_Id(this.fltIds[index]);},GetCellsNb:function(rowIndex)
{var tr=(rowIndex==undefined)?this.tbl.rows[0]:this.tbl.rows[rowIndex];return tr.cells.length;},GetRowsNb:function(includeHeaders)
{var s=this.refRow==undefined?0:this.refRow;var ntrs=this.tbl.rows.length;if(includeHeaders){s=0;}
return parseInt(ntrs-s);},GetCellData:function(i,cell)
{if(i==undefined||cell==null)return"";if(this.customCellData&&this.customCellDataCols.tf_Has(i))
return this.customCellData.call(null,this,cell,i);else
return tf_GetNodeText(cell);},GetRowDisplay:function(row)
{if(!this.fltGrid&&!tf_IsObj(row))return;return row.style.display;},SetRowValidation:function(rowIndex,isValid)
{var row=this.tbl.rows[rowIndex];if(!row||(typeof isValid).tf_LCase()!='boolean')return;if(this.hasVisibleRows&&this.visibleRows.tf_Has(rowIndex)&&!this.paging)
isValid=true;var displayFlag=(isValid)?'':'none';var validFlag=(isValid)?'true':'false';row.style.display=displayFlag;if(this.paging)
row.setAttribute('validRow',validFlag);},ValidateAllRows:function()
{if(!this.hasGrid)return;this.validRowsIndex=[];for(var k=this.refRow;k<this.nbFilterableRows;k++)
{this.SetRowValidation(k,true);this.validRowsIndex.push(k);}},SetFilterValue:function(index,searcharg,doFilter)
{if((!this.fltGrid&&!this.isFirstLoad)||this.GetFilterElement(index)==null)return;var slc=this.GetFilterElement(index);var execFilter=(doFilter==undefined)?true:doFilter;searcharg=(searcharg==undefined)?'':searcharg;if(this['col'+index]!=this.fltTypeMulti&&this['col'+index]!=this.fltTypeCheckList){slc.value=searcharg;if(this['col'+index]==this.fltTypeInp&&this.inpWatermark!='')
tf_RemoveClass(slc,this.inpWatermarkCssClass);}
else if(this['col'+index]==this.fltTypeMulti)
{var s=searcharg.split(' '+this.orOperator+' ');var ct=0;for(var j=0;j<slc.options.length;j++)
{if(s=='')slc.options[j].selected=false;if(slc.options[j].value=='')slc.options[j].selected=false;if(slc.options[j].value!=''&&s.tf_Has(slc.options[j].value,true))
{if(tf_isIE)
{var filter=(ct==(s.length-1)&&execFilter)?true:false;this.__deferMultipleSelection(slc,j,filter);ct++;}
else
slc.options[j].selected=true;}}}
else if(this['col'+index]==this.fltTypeCheckList)
{searcharg=searcharg.tf_MatchCase(this.matchCase);var s=searcharg.split(' '+this.orOperator+' ');var fltValue=slc.setAttribute('value','');var fltIndex=slc.setAttribute('indexes','');for(var k=0;k<tf_Tag(slc,'li').length;k++)
{var li=tf_Tag(slc,'li')[k];var lbl=tf_Tag(li,'label')[0];var chk=tf_Tag(li,'input')[0];var lblTxt=tf_GetNodeText(lbl).tf_MatchCase(this.matchCase);if(lblTxt!=''&&s.tf_Has(lblTxt,true))
{chk.checked=true;this.__setCheckListValues(chk);}
else{chk.checked=false;this.__setCheckListValues(chk);}}}},SetColWidths:function(rowIndex)
{if(!this.fltGrid||!this.hasColWidth)return;var o=this,rIndex;if(rowIndex==undefined)rIndex=this.tbl.rows[0].style.display!='none'?0:1;else rIndex=rowIndex;setWidths(this.tbl.rows[rIndex]);function setWidths(row)
{if(!o&&(o.nbCells!=o.colWidth.length))return;if(o.nbCells==row.cells.length)
for(var k=0;k<o.nbCells;k++)
row.cells[k].style.width=o.colWidth[k];}},SetVisibleRows:function()
{if(this.hasGrid&&this.hasVisibleRows&&!this.paging)
{for(var i=0;i<this.visibleRows.length;i++)
{if(this.visibleRows[i]<=this.nbRows)
this.SetRowValidation(this.visibleRows[i],true);}}},ClearFilters:function()
{this.EvtManager(this.Evt.name.clear);},_ClearFilters:function()
{if(!this.fltGrid)return;if(this.onBeforeReset){this.onBeforeReset.call(null,this,this.GetFiltersValue());}
for(var i=0;i<this.fltIds.length;i++)
this.SetFilterValue(i,'');if(this.refreshFilters){this.activeFilterId='';this.RefreshFiltersGrid();}
if(this.rememberPageLen){tf_RemoveCookie(this.pgLenCookie);}
if(this.rememberPageNb){tf_RemoveCookie(this.pgNbCookie);}
if(this.onAfterReset){this.onAfterReset.call(null,this);}},ClearActiveColumns:function()
{for(var i=0;i<this.fltIds.length;i++)
tf_RemoveClass(this.GetHeaderElement(i),this.activeColumnsCssClass);},RefreshGrid:function(config)
{var configObj=!config?this.fObj:config;var hasSort=this.sort;if(hasSort)this.sort=false;this.nbRows=this.GetRowsNb();this.RemoveGrid();window['tf_'+this.id]=new TF(this.id,this.startRow,configObj);this.isFirstLoad=true;this.fltIds=[];this._AddGrid();if(hasSort){this.st.setTBody(this.tbl.tBodies[0]);this.sort=true;}},__resetGrid:function()
{if(this.isFirstLoad)return;if(!this.gridLayout){this.tbl.rows[this.filtersRowIndex].parentNode.insertBefore(this.fltGridEl,this.tbl.rows[this.filtersRowIndex]);}
if(this.isExternalFlt)
{for(var ct=0;ct<this.externalFltTgtIds.length;ct++)
if(tf_Id(this.externalFltTgtIds[ct])){tf_Id(this.externalFltTgtIds[ct]).appendChild(this.externalFltEls[ct]);if(this.gridLayout&&this.externalFltEls[ct].innerHTML==''&&this['col'+ct]!=this.fltTypeInp){if(this['col'+ct]==this.fltTypeSlc||this['col'+ct]==this.fltTypeMulti)
this.PopulateSelect(ct);if(this['col'+ct]==this.fltTypeCheckList)this.PopulateCheckList(ct);}}}
this.nbFilterableRows=this.GetRowsNb();this.nbVisibleRows=this.nbFilterableRows;this.nbRows=this.tbl.rows.length;if(this.isSortEnabled)this.sort=true;if(this.tbl.rows[this.filtersRowIndex].innerHTML=='')
refreshFilters(this);else
if(this.popUpFilters){this.headersRow++;this.SetPopupFilters();}
function refreshFilters(o){o.tbl.deleteRow(o.filtersRowIndex);o.RemoveGrid();o.fltIds=[];o.isFirstLoad=true;if(o.popUpFilters)o.RemovePopupFilters();o._AddGrid();}
if(!this.gridLayout)tf_AddClass(this.tbl,this.prfxTf);this.hasGrid=true;},__containsStr:function(arg,data,fltType,forceMatch)
{var regexp;var modifier=(this.matchCase)?'g':'gi';var exactMatch=(forceMatch==undefined)?this.exactMatch:forceMatch;if(exactMatch||(fltType!=this.fltTypeInp&&fltType!=undefined))
regexp=new RegExp('(^\\s*)'+tf_RegexpEscape(arg)+'(\\s*$)',modifier);else
regexp=new RegExp(tf_RegexpEscape(arg),modifier);return regexp.test(data);},IncludeFile:function(fileId,filePath,callback,type)
{var ftype=(type==undefined)?'script':type;var isImported=tf_IsImported(filePath,ftype);if(isImported)return;var o=this,isLoaded=false,file;var head=tf_Tag(document,'head')[0];if(ftype.tf_LCase()=='link')
file=tf_CreateElm('link',['id',fileId],['type','text/css'],['rel','stylesheet'],['href',filePath]);else
file=tf_CreateElm('script',['id',fileId],['type','text/javascript'],['src',filePath]);file.onload=file.onreadystatechange=function()
{if(!isLoaded&&(!this.readyState||this.readyState=='loaded'||this.readyState=='complete'))
{isLoaded=true;if(typeof callback==='function')callback.call(null,o);}}
file.onerror=function(){throw new Error('TF script could not load:\n'+this.src);}
head.appendChild(file);}}
function tf_GetNodeText(n)
{var s=n.textContent||n.innerText||n.innerHTML.replace(/\<[^<>]+>/g,'');return s.replace(/^\s+/,'').replace(/\s+$/,'').tf_Trim();}
function tf_IsObj(v)
{var isO=false;if((typeof v).tf_LCase()=='string'){if(window[v]&&(typeof window[v]).tf_LCase()=='object')
isO=true;}else{if(v&&(typeof v).tf_LCase()=='object')
isO=true;}
return isO;}
function tf_IsFn(fn)
{return(fn&&fn.constructor==Function);}
function tf_IsArray(obj){return obj.constructor==Array;}
function tf_Id(id)
{return document.getElementById(id);}
function tf_Tag(o,tagname)
{return o.getElementsByTagName(tagname);}
function tf_RegexpEscape(s)
{function escape(e)
{a=new RegExp('\\'+e,'g');s=s.replace(a,'\\'+e);}
chars=new Array('\\','[','^','$','.','|','?','*','+','(',')');for(var e=0;e<chars.length;e++)escape(chars[e]);return s;}
function tf_CreateElm(tag)
{if(tag==undefined||tag==null||tag=='')return;var el=document.createElement(tag);if(arguments.length>1)
{for(var i=0;i<arguments.length;i++)
{var argtype=typeof arguments[i];switch(argtype.tf_LCase())
{case'object':if(arguments[i].length==2)
{el.setAttribute(arguments[i][0],arguments[i][1]);}
break;}}}
return el;}
function tf_CreateText(node)
{return document.createTextNode(node);}
function tf_AddEvent(obj,event_name,func_name,use_capture){if(obj.attachEvent)
obj.attachEvent('on'+event_name,func_name);else if(obj.addEventListener)
obj.addEventListener(event_name,func_name,(use_capture==undefined?false:use_capture));else
obj['on'+event_name]=func_name;}
function tf_RemoveEvent(obj,event_name,func_name,use_capture){if(obj.detachEvent)
obj.detachEvent('on'+event_name,func_name);else if(obj.removeEventListener)
obj.removeEventListener(event_name,func_name,(use_capture==undefined?false:use_capture));else
obj['on'+event_name]=null;}
function tf_StopEvent(e){if(!e)e=window.event;if(e.stopPropagation){e.stopPropagation();}else{e.cancelBubble=true;}}
function tf_CancelEvent(e){if(!e)e=window.event;if(e.preventDefault){e.preventDefault();}else{e.returnValue=false;}}
function tf_ObjPosition(obj,tag){var l=0,t=0;if(obj&&obj.offsetParent&&tag.tf_Has(obj.nodeName.tf_LCase())){do{l+=obj.offsetLeft;t+=obj.offsetTop;}while(obj=obj.offsetParent);}
return[l,t];}
function tf_NumSortAsc(a,b){return(a-b);}
function tf_NumSortDesc(a,b){return(b-a);}
function tf_IgnoreCaseSort(a,b){var x=a.tf_LCase();var y=b.tf_LCase();return((x<y)?-1:((x>y)?1:0));}
String.prototype.tf_MatchCase=function(mc){if(!mc)return this.tf_LCase();else return this.toString();}
String.prototype.tf_Trim=function()
{return this.replace(/(^[\s\xA0]*)|([\s\xA0]*$)/g,'');}
String.prototype.tf_LCase=function(){return this.toLowerCase();}
String.prototype.tf_UCase=function(){return this.toUpperCase();}
Array.prototype.tf_Has=function(s,mc){var sCase=(mc==undefined)?false:mc;for(i=0;i<this.length;i++)
if(this[i].toString().tf_MatchCase(sCase)==s)return true;return false;}
Array.prototype.tf_IndexByValue=function(s,mc){var sCase=(mc==undefined)?false:mc;for(i=0;i<this.length;i++)
if(this[i].toString().tf_MatchCase(sCase)==s)return i;return(-1);}
window['tf_isIE']=(window.innerHeight)?false:/msie|MSIE 6/.test(navigator.userAgent)?true:false;window['tf_isIE7']=(window.innerHeight)?false:/msie|MSIE 7/.test(navigator.userAgent)?true:false;function tf_HasClass(elm,cl){if(!elm)return false;return elm.className.match(new RegExp('(\\s|^)'+cl+'(\\s|$)'));}
function tf_AddClass(elm,cl){if(!elm)return;if(!tf_HasClass(elm,cl))
elm.className+=' '+cl;}
function tf_RemoveClass(elm,cl){if(!elm)return;if(!tf_HasClass(elm,cl))return;var reg=new RegExp('(\\s|^)'+cl+'(\\s|$)');elm.className=elm.className.replace(reg,'');}
function tf_IsValidDate(dateStr,format){if(format==null){format='DMY';}
format=format.toUpperCase();if(format.length!=3){if(format=='DDMMMYYYY'){var d=tf_FormatDate(dateStr,format);dateStr=d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();format='DMY';}}
if((format.indexOf('M')==-1)||(format.indexOf('D')==-1)||(format.indexOf('Y')==-1)){format='DMY';}
if(format.substring(0,1)=='Y'){var reg1=/^\d{2}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;var reg2=/^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;}else if(format.substring(1,2)=='Y'){var reg1=/^\d{1,2}(\-|\/|\.)\d{2}\1\d{1,2}$/;var reg2=/^\d{1,2}(\-|\/|\.)\d{4}\1\d{1,2}$/;}else{var reg1=/^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{2}$/;var reg2=/^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/;}
if((reg1.test(dateStr)==false)&&(reg2.test(dateStr)==false)){return false;}
var parts=dateStr.split(RegExp.$1);if(format.substring(0,1)=='M'){var mm=parts[0];}else
if(format.substring(1,2)=='M'){var mm=parts[1];}else{var mm=parts[2];}
if(format.substring(0,1)=='D'){var dd=parts[0];}else
if(format.substring(1,2)=='D'){var dd=parts[1];}else{var dd=parts[2];}
if(format.substring(0,1)=='Y'){var yy=parts[0];}else
if(format.substring(1,2)=='Y'){var yy=parts[1];}else{var yy=parts[2];}
if(parseFloat(yy)<=50){yy=(parseFloat(yy)+2000).toString();}
if(parseFloat(yy)<=99){yy=(parseFloat(yy)+1900).toString();}
var dt=new Date(parseFloat(yy),parseFloat(mm)-1,parseFloat(dd),0,0,0,0);if(parseFloat(dd)!=dt.getDate()){return false;}
if(parseFloat(mm)-1!=dt.getMonth()){return false;}
return true;}
function tf_FormatDate(dateStr,format){if(format===null){format='DMY';}
if(!dateStr||dateStr===''){return new Date(1001,0,1);}
var oDate,parts;function y2kDate(yr){if(yr==undefined)return 0;if(yr.length>2)return yr;var y;if(yr<=99&&yr>50)
y='19'+yr;if(yr<50||yr=='00')
y='20'+yr;return y;}
function mmm2mm(mmm){if(mmm==undefined){return 0;}
var mondigit;var MONTH_NAMES=new Array('january','february','march','april','may','june','july','august','september','october','november','december','jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec');for(var m_i=0;m_i<MONTH_NAMES.length;m_i++){var month_name=MONTH_NAMES[m_i];if(mmm.toLowerCase()===month_name){mondigit=m_i+1;break;}}
if((mondigit>11)||(mondigit<23)){mondigit=mondigit-12;}
if((mondigit<1)||(mondigit>12)){return 0;}
return mondigit;}
switch(format.toUpperCase()){case'DDMMMYYYY':parts=dateStr.replace(/[- \/.]/g,' ').split(' ');oDate=new Date(y2kDate(parts[2]),mmm2mm(parts[1])-1,parts[0]);break;case'DMY':parts=dateStr.replace(/^(0?[1-9]|[12][0-9]|3[01])([- \/.])(0?[1-9]|1[012])([- \/.])((\d\d)?\d\d)$/,'$1 $3 $5').split(' ');oDate=new Date(y2kDate(parts[2]),parts[1]-1,parts[0]);break;case'MDY':parts=dateStr.replace(/^(0?[1-9]|1[012])([- \/.])(0?[1-9]|[12][0-9]|3[01])([- \/.])((\d\d)?\d\d)$/,'$1 $3 $5').split(' ');oDate=new Date(y2kDate(parts[2]),parts[0]-1,parts[1]);break;case'YMD':parts=dateStr.replace(/^((\d\d)?\d\d)([- \/.])(0?[1-9]|1[012])([- \/.])(0?[1-9]|[12][0-9]|3[01])$/,'$1 $4 $6').split(' ');oDate=new Date(y2kDate(parts[0]),parts[1]-1,parts[2]);break;default:parts=dateStr.replace(/^(0?[1-9]|[12][0-9]|3[01])([- \/.])(0?[1-9]|1[012])([- \/.])((\d\d)?\d\d)$/,'$1 $3 $5').split(' ');oDate=new Date(y2kDate(parts[2]),parts[1]-1,parts[0]);break;}
return oDate;}
function tf_RemoveNbFormat(data,format){if(data==null)return;if(format==null)format='us';var n=data;if(format.tf_LCase()=='us')
n=+n.replace(/[^\d\.-]/g,'');else
n=+n.replace(/[^\d\,-]/g,'').replace(',','.');return n;}
function tf_IsImported(filePath,type){var isImported=false;var importType=(type==undefined)?'script':type;var attr=importType=='script'?'src':'href';var files=tf_Tag(document,importType);for(var i=0;i<files.length;i++)
{if(files[i][attr]==undefined)continue;if(files[i][attr].match(filePath))
{isImported=true;break;}}
return isImported;}
function tf_IsStylesheetImported(stylesheet){var isImported=false;if(!document.styleSheets)return isImported;var s=document.styleSheets;var regexp=new RegExp(stylesheet);for(var i=0;i<s.length;i++){if(s[i].imports){var imp=s[i].imports;for(var j=0;j<imp.length;j++){if(imp[j].href.tf_LCase()==stylesheet.tf_LCase()){isImported=true;break;}}}else{var r=(s[i].cssRules?s[i].cssRules:s[i].rules);for(var j=0;j<r.length;j++){if(regexp.test(r[j].cssText)){isImported=true;break;}}}}
return isImported;}
function tf_WriteCookie(name,value,hours){var expire='';if(hours!=null)
{expire=new Date((new Date()).getTime()+hours*3600000);expire='; expires='+expire.toGMTString();}
document.cookie=name+'='+escape(value)+expire;}
function tf_ReadCookie(name){var cookieValue='';var search=name+'=';if(document.cookie.length>0)
{offset=document.cookie.indexOf(search);if(offset!=-1)
{offset+=search.length;end=document.cookie.indexOf(';',offset);if(end==-1)end=document.cookie.length;cookieValue=unescape(document.cookie.substring(offset,end))}}
return cookieValue;}
function tf_CookieValueArray(name,separator){if(separator==undefined)separator=',';var val=tf_ReadCookie(name);var arr=val.split(separator);return arr;}
function tf_CookieValueByIndex(name,index,separator){if(separator==undefined)separator=',';var val=tf_CookieValueArray(name,separator);return val[index];}
function tf_RemoveCookie(name){tf_WriteCookie(name,'',-1);}
function tf_SetOuterHtml(){if(document.body.__defineGetter__){if(HTMLElement){var element=HTMLElement.prototype;if(element.__defineGetter__){element.__defineGetter__("outerHTML",function(){var parent=this.parentNode;var el=tf_CreateElm(parent.tagName);el.appendChild(this);var shtml=el.innerHTML;parent.appendChild(this);return shtml;});}}}
if(element.__defineSetter__){HTMLElement.prototype.__defineSetter__("outerHTML",function(sHTML){var r=this.ownerDocument.createRange();r.setStartBefore(this);var df=r.createContextualFragment(sHTML);this.parentNode.replaceChild(df,this);return sHTML;});}}
function setFilterGrid(id)
{if(arguments.length===0){return;}
window['tf_'+id]=new TF(arguments[0],arguments[1],arguments[2]);window['tf_'+id].AddGrid();return window['tf_'+id];}
window['tf_isNotIE']=!(/msie|MSIE/.test(navigator.userAgent));tf_AddEvent(window,(tf_isNotIE||(typeof window.addEventListener=='function')?'DOMContentLoaded':'load'),initFilterGrid);function initFilterGrid(){if(!document.getElementsByTagName){return;}
var tbls=tf_Tag(document,'table'),config;for(var i=0;i<tbls.length;i++){var cTbl=tbls[i],cTblId=cTbl.getAttribute('id');if(tf_HasClass(cTbl,'filterable')&&cTblId){if(tf_IsObj(cTblId+'_config')){config=window[cTblId+'_config'];}else{config=undefined;}
window[cTblId+'_isUnob']=true;setFilterGrid(cTblId,config);}}}
function grabEBI(id){return tf_Id(id);}
function grabTag(obj,tagname){return tf_Tag(obj,tagname);}
function tf_GetCellText(n){return tf_GetNodeText(n);}
function tf_isObject(varname){return tf_IsObj(varname);}
function tf_isObj(v){return tf_IsObj(v);}
function tf_isFn(fn){return tf_IsFn(fn);}
function tf_isArray(obj){return tf_IsArray(obj);}
function tf_addEvent(obj,event_name,func_name){return tf_AddEvent(obj,event_name,func_name);}
function tf_removeEvent(obj,event_name,func_name){return tf_RemoveEvent(obj,event_name,func_name);}
function tf_addClass(elm,cl){tf_AddClass(elm,cl);}
function tf_removeClass(elm,cl){return tf_RemoveClass(elm,cl);}
function tf_hasClass(elm,cl){return tf_HasClass(elm,cl);}
function tf_isValidDate(dateStr,format){return tf_IsValidDate(dateStr,format);}
function tf_formatDate(dateStr,format){return tf_FormatDate(dateStr,format);}
function tf_removeNbFormat(data,format){return tf_RemoveNbFormat(data,format);}