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

var TF = function(id)
/*====================================================
	- TF object constructor
	- Params:
			- id: table id (string)
			- refRow (optional): row index (number)
			- config (optional): configuration 
			object (literal object)
=====================================================*/
{
	if(arguments.length === 0){ return; }
	this.id = id;
	this.version = '2.5';
	this.year = (new Date()).getFullYear();
	this.tbl = tf_Id(id);
	this.startRow = undefined;
	this.refRow = null;
	this.headersRow = null;
	this.fObj = null;
	this.nbFilterableRows = null;
	this.nbRows = null;
	this.nbCells = null;
	this.hasGrid = false;
	this.enableModules = true;

	if(this.tbl != null && this.tbl.nodeName.tf_LCase() == 'table' && this.GetRowsNb())
    {
		if(arguments.length>1)
        {
            for(var i=0; i<arguments.length; i++)
            {
                var argtype = typeof arguments[i];
                switch(argtype.tf_LCase())
                {
                    case 'number':
                        this.startRow = arguments[i];
                    break;
                    case 'object':
                        this.fObj = arguments[i];
                    break;
                }//switch                           
            }//for
        }//if
		
		var f = !this.fObj ? {} : this.fObj;
		
		//Start row et cols nb
		this.refRow = this.startRow==undefined ? 2 : (this.startRow+1);
		try{ this.nbCells = this.GetCellsNb(this.refRow) }
		catch(e){ this.nbCells = this.GetCellsNb(0) }
		
		this.basePath = f.base_path!=undefined ? f.base_path : 'TableFilter/'; //default script base path
		
		if(this.enableModules){
			/*** Modules: features of the script ***/
			this.registeredModules = []; //modules to be loaded
			this.alreadyImportedModules = []; //modules already imported in the page
			this.importedModules = []; //modules imported by the TF script
			this.modulesPath = f.modules_path!=undefined ? f.modules_path : this.basePath+'TF_Modules/'; //js modules files path
			this.module = {
				populateSelect:{ name:'populateSelect', desc:'Builds select type filters', 
					path: this.modulesPath + 'tf_populateSelect.js', loaded:0,
					init: function(o) { o.module.populateSelect.loaded = 1; }			
				},
				populateCheckList:{ name:'populateCheckList', desc:'Builds checklist type filters', 
					path: this.modulesPath + 'tf_populateCheckList.js', loaded:0,
					init: function(o) { o.module.populateCheckList.loaded = 1; }
				},
				gridLayout: { name:'gridLayout', desc:'Grid layout feature', 
					path: this.modulesPath + 'tf_gridLayout.js', loaded:0,
					init: function(o) { o.module.gridLayout.loaded = 1; }
				},
				paging: { name:'paging', desc:'Paging feature', 
					path: this.modulesPath + 'tf_paging.js', loaded:0, 
					init: function(o) { o.module.paging.loaded = 1; }
				},
				sort: { name:'sort', desc:'Sort feature', 
					path: this.modulesPath + 'tf_sort.js', loaded:0, 
					init: function(o) { o.module.sort.loaded = 1; }
				},
				popUpFilters: { name:'popUpFilters', desc:'Filters in pop-up container feature', 
					path: this.modulesPath + 'tf_popupFilters.js', loaded:0,
					init: function(o) { o.module.popUpFilters.loaded = 1; }
				},
				themes: { name:'themes', desc:'Themes loading feature', 
					path: this.modulesPath + 'tf_themes.js', loaded:0, 
					init: function(o) { o.module.themes.loaded = 1; }
				},
				colOps: { name:'colOps', desc:'Columns operations feature', 
					path:this.modulesPath + 'tf_colOps.js', loaded:0, 
					init: function(o){ o.module.colOps.loaded = 1; }
				},
				fixedHeaders: {	name:'fixedHeaders', desc:'Fixed headers feature - Deprecated', 
					path:this.modulesPath + 'tf_fixedHeaders.js', loaded:0, 
					init: function(o){ o.module.fixedHeaders.loaded = 1; }
				},
				rowsCounter: { name:'rowsCounter', desc:'Rows counter feature', 
					path:this.modulesPath + 'tf_rowsCounter.js', loaded:0, 
					init: function(o){ o.module.rowsCounter.loaded = 1; }
				},			
				loader: { name:'loader', desc:'Loader feature', 
					path:this.modulesPath + 'tf_loader.js', loaded:0,
					init: function(o){ o.module.loader.loaded = 1; }
				},
				statusBar: { name:'statusBar', desc:'Status bar feature', 
					path:this.modulesPath + 'tf_statusBar.js', loaded:0, 
					init: function(o){ o.module.statusBar.loaded = 1; }
				},
				resetBtn:{ name:'resetBtn', desc:'Reset button feature', 
					path:this.modulesPath + 'tf_resetBtn.js', loaded:0, 
					init: function(o){ o.module.resetBtn.loaded = 1; }
				},
				helpInstructions:{ name:'helpInstructions', desc:'Help, About', 
					path:this.modulesPath + 'tf_resetBtn.js', loaded:0, 
					init: function(o){ o.module.helpInstructions.loaded = 1; }
				},
				alternateRows:{ name:'alternateRows', desc:'Alternating rows color feature', 
					path:this.modulesPath + 'tf_alternateRows.js', loaded:0,
					init: function(o){ o.module.alternateRows.loaded = 1; }
				},
				cookies:{ name:'cookies', desc:'Remember values feature (cookies)', 
					path:this.modulesPath + 'tf_cookies.js', loaded:0,
					init: function(o){ o.module.cookies.loaded = 1; }
				},
				highlightKeywords:{	name:'highlightKeywords', desc:'Remember values feature (cookies)', 
					path:this.modulesPath + 'tf_highlightKeywords.js', loaded:0,
					init: function(o){ o.module.highlightKeywords.loaded = 1; }
				},
				refreshFilters:{ name:'refreshFilters', desc:'Refresh filters feature', 
					path:this.modulesPath + 'tf_refreshFilters.js', loaded:0, 
					init: function(o){ o.module.refreshFilters.loaded = 1; }
				},
				extensions:{ name:'extensions', desc:'Extensions loading feature', 
					path:this.modulesPath + 'tf_extensions.js', loaded:0,
					init: function(o){ o.module.extensions.loaded = 1; }
				},
				watermark:{ name:'watermark', desc:'Watermark feature', 
					path:this.modulesPath + 'tf_watermark.js', loaded:0,
					init: function(o){ o.module.watermark.loaded = 1; }
				},
				ezEditTable:{ name:'ezEditTable', desc:'ezEditTable adapter', 
					path:this.modulesPath + 'tf_ezEditTable.js', loaded:0,
					init: function(o){ o.module.ezEditTable.loaded = 1; }
				},
				publicMethods:{ name:'publicMethods', desc:'Additional public methods for developers', 
					path:this.modulesPath + 'tf_publicMethods.js', loaded:0,
					init: function(o){ o.module.publicMethods.loaded = 1; }
				}
			};
		}
		/*** filter types ***/
		this.fltTypeInp =			'input';
		this.fltTypeSlc =			'select';
		this.fltTypeMulti =			'multiple';
		this.fltTypeCheckList =		'checklist';
		this.fltTypeNone =			'none';
		this.fltCol = 				[]; //filter type of each column
		
		for(var i=0; i<this.nbCells; i++){
			if(this['col'+i]==undefined)
				this['col'+i] = (f['col_'+i]==undefined) 
					? this.fltTypeInp : f['col_'+i].tf_LCase();
			this.fltCol.push(this['col'+i]);
		}
		
		if(this.enableModules){
			//Registers select and checklist scripts if needed
			if(this.fltCol.tf_Has(this.fltTypeSlc) || 
				this.fltCol.tf_Has(this.fltTypeMulti)) 
				this.registeredModules.push(this.module.populateSelect.name);
			if(this.fltCol.tf_Has(this.fltTypeCheckList)) this.registeredModules.push(this.module.populateCheckList.name);
		}
		
		/*** Developer additional methods ***/
		this.publicMethods = f.public_methods!=undefined ? f.public_methods : false;
		
		/*** filters' grid properties ***/
		this.fltGrid = 				f.grid==false ? false : true; //enables/disables filter grid
		
		/*** Grid layout ***/
		this.gridLayout = 			f.grid_layout ? true : false; //enables/disables grid layout (fixed headers)		
		this.hasGridWidthsRow =		false; //flag indicating if the grid has an additional row for column widths (IE<=7)
		this.gridColElms =			[];
		this.sourceTblHtml =		null;
		if(this.gridLayout){
			if(this.tbl.outerHTML==undefined) tf_SetOuterHtml();  //Firefox does not support outerHTML property...
			this.sourceTblHtml = 		this.tbl.outerHTML; //original table html
		}												
		/*** ***/
								
		this.filtersRowIndex =		f.filters_row_index!=undefined ? f.filters_row_index : 0;
		this.headersRow =			f.headers_row_index!=undefined ? f.headers_row_index : (this.filtersRowIndex==0 ? 1 : 0);
		if(this.gridLayout){
			if(this.headersRow>1) this.filtersRowIndex = this.headersRow+1;
			else{ this.filtersRowIndex = 1; this.headersRow = 0; }
		}
		this.fltCellTag =			f.filters_cell_tag!=undefined //defines tag of the cells containing filters (td/th)
										? (f.filters_cell_tag!='th' ? 'td' : 'th') : 'td';		
		this.fltIds = 				[]; //stores filters ids
		this.fltElms =				[]; //stores filters DOM elements
		this.searchArgs =			null; //stores filters values
		this.tblData =				[]; //stores table data
		this.validRowsIndex =		null; //stores valid rows indexes (rows visible upon filtering)
		this.fltGridEl =			null; //stores filters row element
		this.isFirstLoad =			true; //is first load boolean 
		this.infDiv =				null; //container div for paging elements, reset btn etc.
		this.lDiv =					null; //div for rows counter
		this.rDiv =					null; //div for reset button and results per page select
		this.mDiv =					null; //div for paging elements
		this.contDiv =				null; //table container div for fixed headers (IE only)
		this.infDivCssClass =		f.inf_div_css_class!=undefined	//defines css class for div containing
										? f.inf_div_css_class : 'inf'; //paging elements, rows counter etc.
		this.lDivCssClass =			f.left_div_css_class!=undefined	//defines css class for left div 
										? f.left_div_css_class : 'ldiv';
		this.rDivCssClass =			f.right_div_css_class!=undefined //defines css class for right div 
										? f.right_div_css_class : 'rdiv';
		this.mDivCssClass =			f.middle_div_css_class!=undefined //defines css class for mid div 
										? f.middle_div_css_class : 'mdiv';
		this.contDivCssClass =		f.content_div_css_class!=undefined 
										? f.content_div_css_class : 'cont';	//table container div css class
		
		/*** filters' grid appearance ***/
		this.stylesheet =   		f.stylesheet!=undefined ? f.stylesheet : this.basePath+'filtergrid.css'; //stylesheet file
		this.stylesheetId =			this.id + '_style';
		this.fltsRowCssClass =		f.flts_row_css_class!=undefined //defines css class for filters row
										? f.flts_row_css_class : 'fltrow';
		this.enableIcons =			f.enable_icons!=undefined ? f.enable_icons : true; //enables/disables icons (paging, reset button)		
		this.alternateBgs =			f.alternate_rows ? true : false; //enables/disbles rows alternating bg colors
		this.hasColWidth =			f.col_width ? true : false; //defines widths of columns
		this.colWidth =				this.hasColWidth ? f.col_width : null;
		this.fixedHeaders =			f.fixed_headers ? true : false; //enables/disables fixed headers
		this.tBodyH = 				f.tbody_height ? f.tbody_height : 200; //tbody height if fixed headers enabled
		this.fltCssClass =			f.flt_css_class!=undefined //defines css class for filters
										? f.flt_css_class : 'flt';
		this.fltMultiCssClass =		f.flt_multi_css_class!=undefined //defines css class for multiple selects filters
										? f.flt_multi_css_class : 'flt_multi';
		this.fltSmallCssClass =		f.flt_small_css_class!=undefined //defines css class for filters
										? f.flt_small_css_class : 'flt_s';
		this.singleFltCssClass =	f.single_flt_css_class!=undefined //defines css class for single-filter
										? f.single_flt_css_class : 'single_flt';	
		this.isStartBgAlternate =	true;
		this.rowBgEvenCssClass =	f.even_row_css_class!=undefined //defines css class for even rows
										? f.even_row_css_class :'even';
		this.rowBgOddCssClass =		f.odd_row_css_class!=undefined //defines css class for odd rows
										? f.odd_row_css_class :'odd';
		
		/*** filters' grid behaviours ***/
		this.enterKey =				f.enter_key==false ? false : true; //enables/disables enter key
		this.isModFilterFn = 		f.mod_filter_fn ? true : false; //enables/disables alternative fn call		
		this.modFilterFn =			this.isModFilterFn ? f.mod_filter_fn : null;// used by tf_DetectKey fn
		this.onBeforeFilter =		tf_IsFn(f.on_before_filter) //calls function before filtering starts
										? f.on_before_filter : null;
		this.onAfterFilter =		tf_IsFn(f.on_after_filter) //calls function after filtering
										? f.on_after_filter : null;								
		this.matchCase =			f.match_case ? true : false; //enables/disables case sensitivity
		this.exactMatch =			f.exact_match ? true : false; //enables/disbles exact match for search
		this.refreshFilters =		f.refresh_filters ? true : false; //refreshes drop-down lists upon validation
		this.disableExcludedOptions = f.disable_excluded_options!=undefined ? f.disable_excluded_options : false; //wheter excluded options are disabled
		this.activeFlt =			null; //stores active filter element
		this.activeFilterId =		null; //id of active filter
		this.hasColOperation =		f.col_operation ? true : false; //enables/disbles column operation(sum,mean)
		this.colOperation =			null;
		this.hasVisibleRows = 		f.rows_always_visible ? true : false; //enables always visible rows
		this.visibleRows =			this.hasVisibleRows ? f.rows_always_visible : [];//array containing always visible rows
		this.searchType =			f.search_type!=undefined //defines search type: include or exclude
										? f.search_type : 'include';
		this.isExternalFlt =		f.external_flt_grid ? true : false; //enables/disables external filters generation
		this.externalFltTgtIds =	f.external_flt_grid_ids!=undefined //array containing ids of external elements containing filters
										? f.external_flt_grid_ids : null;
		this.externalFltEls =		[]; //stores filters elements if isExternalFlt is true		
		this.execDelay =			f.exec_delay ? parseInt(f.exec_delay) : 100; //delays filtering process if loader true
		this.status =				f.status ? true : false; //enables/disables status messages
		this.onFiltersLoaded =		tf_IsFn(f.on_filters_loaded) //calls function when filters grid loaded
										? f.on_filters_loaded : null;
		this.singleSearchFlt =		f.single_search_filter ? true : false; //enables/disables single filter search
		this.onRowValidated =		tf_IsFn(f.on_row_validated) //calls function after row is validated
									 	? f.on_row_validated : null;
		this.customCellDataCols =	f.custom_cell_data_cols ? f.custom_cell_data_cols : []; //array defining columns for customCellData event 	
		this.customCellData =		tf_IsFn(f.custom_cell_data) //calls custom function for retrieving cell data
									 	? f.custom_cell_data : null;
		this.inpWatermark = 		f.input_watermark!=undefined ? f.input_watermark : ''; //input watermark text array
		this.inpWatermarkCssClass =	f.input_watermark_css_class!=undefined //defines css class for input watermark
										? f.input_watermark_css_class : 'fltWatermark';
		this.isInpWatermarkArray =	f.input_watermark!=undefined
										? (tf_IsArray(f.input_watermark) ? true : false) : false;
		this.toolBarTgtId =			f.toolbar_target_id!=undefined //id of toolbar container element
										? f.toolbar_target_id : null;
		this.helpInstructions = 	(f.help_instructions!=undefined) ? f.help_instructions : null; //enables/disables help div
		this.popUpFilters =			f.popup_filters!=undefined ? f.popup_filters : false; //popup filters
		this.markActiveColumns =	f.mark_active_columns!=undefined ? f.mark_active_columns : false; //active columns color
		this.activeColumnsCssClass = f.active_columns_css_class!=undefined //defines css class for active column header
										? f.active_columns_css_class : 'activeHeader';
		this.onBeforeActiveColumn = tf_IsFn(f.on_before_active_column) //calls function before active column header is marked
										? f.on_before_active_column : null;
		this.onAfterActiveColumn = tf_IsFn(f.on_after_active_column) //calls function after active column header is marked
										? f.on_after_active_column : null;
		
		/*** selects customisation and behaviours ***/
		this.displayAllText =		f.display_all_text!=undefined ? f.display_all_text : ''; //defines 1st option text
		this.enableSlcResetFilter = f.enable_slc_reset_filter!=undefined ? f.enable_slc_reset_filter : true;
		this.enableEmptyOption =	f.enable_empty_option ? true : false; //enables/disables empty option in combo-box filters
		this.emptyText =			f.empty_text!=undefined ? f.empty_text : '(Empty)'; //defines empty option text
		this.enableNonEmptyOption =	f.enable_non_empty_option ? true : false; //enables/disables non empty option in combo-box filters
		this.nonEmptyText =			f.non_empty_text!=undefined ? f.non_empty_text : '(Non empty)'; //defines empty option text
		this.onSlcChange = 			f.on_change==false ? false : true; //enables/disables onChange event on combo-box 
		this.sortSlc =				f.sort_select==false ? false : true; //enables/disables select options sorting
		this.isSortNumAsc =			f.sort_num_asc ? true : false; //enables/disables ascending numeric options sorting
		this.sortNumAsc =			this.isSortNumAsc ? f.sort_num_asc : null;
		this.isSortNumDesc =		f.sort_num_desc ? true : false; //enables/disables descending numeric options sorting
		this.sortNumDesc =			this.isSortNumDesc ? f.sort_num_desc : null;
		this.slcFillingMethod =		f.slc_filling_method!=undefined //sets select filling method: 'innerHTML' or 
										? f.slc_filling_method : 'createElement';	//'createElement'
		this.fillSlcOnDemand =		f.fill_slc_on_demand ? true : false; //enabled selects are populated on demand
		this.activateSlcTooltip =	f.activate_slc_tooltip!=undefined //IE only, tooltip text appearing on select 
										? f.activate_slc_tooltip : 'Click to activate'; // before it is populated
		this.multipleSlcTooltip =	f.multiple_slc_tooltip!=undefined //tooltip text appearing on multiple select 
										? f.multiple_slc_tooltip : 'Use Ctrl key for multiple selections';
		this.hasCustomSlcOptions =	f.custom_slc_options && tf_IsObj(f.custom_slc_options)
										? true : false;	
		this.customSlcOptions =		f.custom_slc_options!=undefined
										? f.custom_slc_options : null;
		this.onBeforeOperation =	tf_IsFn(f.on_before_operation) //calls function before col operation
										? f.on_before_operation : null;
		this.onAfterOperation =		tf_IsFn(f.on_after_operation) //calls function after col operation
										? f.on_after_operation : null;
		
		/*** checklist customisation and behaviours ***/
		this.checkListDiv = 		[]; //checklist container div
		this.checkListDivCssClass = f.div_checklist_css_class!=undefined 
										? f.div_checklist_css_class : 'div_checklist'; //defines css class for div containing checklist filter
		this.checkListCssClass =	f.checklist_css_class!=undefined //defines css class for checklist filters
										? f.checklist_css_class : 'flt_checklist';
		this.checkListItemCssClass = f.checklist_item_css_class!=undefined //defines css class for checklist item (li)
										? f.checklist_item_css_class : 'flt_checklist_item';
		this.checkListSlcItemCssClass = f.checklist_selected_item_css_class!=undefined //defines css class for selected checklist item (li)
										? f.checklist_selected_item_css_class : 'flt_checklist_slc_item';								
		this.activateCheckListTxt =	f.activate_checklist_text!=undefined //Load on demand text 
										? f.activate_checklist_text : 'Click to load data';
		this.checkListItemDisabledCssClass = f.checklist_item_disabled_css_class!=undefined //defines css class for checklist filters
											? f.checklist_item_disabled_css_class : 'flt_checklist_item_disabled';
		this.enableCheckListResetFilter = f.enable_checklist_reset_filter!=undefined ? f.enable_checklist_reset_filter : true;
		
		/*** Filter operators ***/
		this.rgxOperator =			f.regexp_operator!=undefined ? f.regexp_operator : 'rgx:';
		this.emOperator =			f.empty_operator!=undefined ? f.empty_operator : '[empty]';
		this.nmOperator =			f.nonempty_operator!=undefined ? f.nonempty_operator : '[nonempty]';		
		this.orOperator =			f.or_operator!=undefined ? f.or_operator : '||';
		this.anOperator =			f.and_operator!=undefined ? f.and_operator : '&&';
		this.grOperator = 			f.greater_operator!=undefined ? f.greater_operator : '>';
		this.lwOperator =			f.lower_operator!=undefined ? f.lower_operator : '<';
		this.leOperator =			f.lower_equal_operator!=undefined ? f.lower_equal_operator : '<=';
		this.geOperator =			f.greater_equal_operator!=undefined ? f.greater_equal_operator : '>=';
		this.dfOperator =			f.different_operator!=undefined ? f.different_operator : '!';
		this.lkOperator =			f.like_operator!=undefined ? f.like_operator : '*';
		this.eqOperator =			f.equal_operator!=undefined ? f.equal_operator : '=';
		this.stOperator =			f.start_with_operator!=undefined ? f.start_with_operator : '{';
		this.enOperator =			f.end_with_operator!=undefined ? f.end_with_operator : '}';
		this.curExp =				f.cur_exp!=undefined ? f.cur_exp : '^[¥£€$]';
		this.separator = 			f.separator!=undefined ? f.separator : ',';
		
		/*** rows counter ***/
		this.rowsCounter = 			f.rows_counter ? true : false; //show/hides rows counter		
		
		/*** status bar ***/
		this.statusBar =			f.status_bar ? f.status_bar : false; //show/hides status bar			
		
		/*** loader ***/
		this.loader =				f.loader ? true : false; //enables/disables loader					
		
		/*** validation - reset buttons/links ***/
		this.displayBtn =			f.btn ? true : false; //show/hides filter's validation button
		this.btnText =				f.btn_text!=undefined ? f.btn_text : (!this.enableIcons ? 'Go' : ''); //defines validation button text
		this.btnCssClass =			f.btn_css_class!=undefined ? f.btn_css_class : (!this.enableIcons ? 'btnflt' : 'btnflt_icon'); //defines css class for validation button
		this.btnReset = 			f.btn_reset ? true : false; //show/hides reset link
		this.btnResetCssClass =		f.btn_reset_css_class!=undefined //defines css class for reset button
									? f.btn_reset_css_class :'reset';
		this.onBeforeReset = 		tf_IsFn(f.on_before_reset) ? f.on_before_reset : null; //callback function before filters are cleared
		this.onAfterReset = 		tf_IsFn(f.on_after_reset) ? f.on_after_reset : null; //callback function after filters are cleared
		
		/*** paging ***/
		this.paging =				f.paging ? true : false; //enables/disables table paging		
		this.hasResultsPerPage =	f.results_per_page ? true : false; //enables/disables results per page drop-down
		this.btnPageCssClass =		f.paging_btn_css_class!=undefined
										? f.paging_btn_css_class :'pgInp'; //css class for paging buttons (previous,next,etc.)
		this.pagingSlc =			null; //stores paging select element
		this.resultsPerPage =		null; //stores results per page text and values
		this.resultsPerPageSlc =	null; //results per page select element
		this.isPagingRemoved =		false; //indicates if paging elements were previously removed
		this.nbVisibleRows	=		0; //nb visible rows
		this.nbHiddenRows =			0; //nb hidden rows
		this.startPagingRow =		0; //1st row index of current page
		this.nbPages = 				0; //total nb of pages
		this.currentPageNb =		1; //current page nb
		
		/*** webfx sort adapter ***/
		this.sort =					f.sort ? true : false; //enables/disables default table sorting
		this.isSortEnabled =		false; //indicates if sort is set (used in tfAdapter.sortabletable.js)
		this.sorted =				false; //indicates if tables was sorted
		this.sortConfig =			f.sort_config!=undefined ? f.sort_config : {};
		this.sortConfig.name =		this.sortConfig['name']!=undefined ? f.sort_config.name : 'sortabletable';
		this.sortConfig.src =		this.sortConfig['src']!=undefined ? f.sort_config.src : this.basePath+'sortabletable.js';
		this.sortConfig.adapterSrc = this.sortConfig['adapter_src']!=undefined ? f.sort_config.adapter_src : this.basePath+'tfAdapter.sortabletable.js';
		this.sortConfig.initialize =this.sortConfig['initialize']!=undefined ? f.sort_config.initialize : function(o){ if(o.SetSortTable) o.SetSortTable(); };
		this.sortConfig.sortTypes =	this.sortConfig['sort_types']!=undefined ? f.sort_config.sort_types : [];
		this.sortConfig.sortCol =	this.sortConfig['sort_col']!=undefined ? f.sort_config.sort_col : null;
		this.sortConfig.asyncSort =	this.sortConfig['async_sort']!=undefined ? true : false;
		this.sortConfig.triggerIds = this.sortConfig['sort_trigger_ids']!=undefined ? f.sort_config.sort_trigger_ids : [];									
		
		/*** ezEditTable extension ***/
    	this.selectable =			f.selectable!=undefined ? f.selectable : false; //enables/disables table selection feature
		this.editable =				f.editable!=undefined ? f.editable : false; //enables/disables editable table feature
		    		
		/*** onkeyup event ***/
		this.onKeyUp =				f.on_keyup ? true : false; //enables/disables onkeyup event, table is filtered when user stops typing
		this.onKeyUpDelay =			f.on_keyup_delay!=undefined ? f.on_keyup_delay : 900; //onkeyup delay timer (msecs)
		this.isUserTyping = 		null; //typing indicator
		this.onKeyUpTimer = 		undefined;		
		
		/*** keyword highlighting ***/
		this.highlightKeywords = 	f.highlight_keywords ? true : false; //enables/disables keyword highlighting
		this.highlightCssClass =	f.highlight_css_class!=undefined ? f.highlight_css_class : 'keyword'; //defines css class for highlighting
		this.highlightedNodes = 	[];
		
		/*** data types ***/
		this.defaultDateType =		f.default_date_type!=undefined //defines default date type (european DMY)
										? f.default_date_type : 'DMY';
		this.thousandsSeparator =	f.thousands_separator!=undefined //defines default thousands separator 
										? f.thousands_separator : ','; //US = ',' EU = '.'
		this.decimalSeparator = 	f.decimal_separator!=undefined //defines default decimal separator 
										? f.decimal_separator : '.'; //US & javascript = '.' EU = ','
		this.hasColNbFormat = 		f.col_number_format ? true : false; //enables number format per column
		this.colNbFormat = 			this.hasColNbFormat ? f.col_number_format : null; //array containing columns nb formats
		this.hasColDateType = 		f.col_date_type ? true : false; //enables date type per column
		this.colDateType =			this.hasColDateType ? f.col_date_type : null; //array containing columns date type
		
		/*** status messages ***/
		this.msgFilter =			f.msg_filter!=undefined //filtering
										? f.msg_filter : 'Filtering data...'; 
		this.msgPopulate =			f.msg_populate!=undefined //populating drop-downs
										? f.msg_populate : 'Populating filter...'; 
		this.msgPopulateCheckList =	f.msg_populate_checklist!=undefined //populating drop-downs
										? f.msg_populate_checklist : 'Populating list...'; 
		this.msgChangePage =		f.msg_change_page!=undefined //changing paging page
										? f.msg_change_page : 'Collecting paging data...';
		this.msgClear =				f.msg_clear!=undefined //clearing filters
										? f.msg_clear : 'Clearing filters...';
		this.msgChangeResults =		f.msg_change_results!=undefined //changing nb results/page
										? f.msg_change_results : 'Changing results per page...';
		this.msgResetValues =		f.msg_reset_grid_values!=undefined //re-setting grid values
										? f.msg_reset_grid_values : 'Re-setting filters values...';
		this.msgResetPage =			f.msg_reset_page!=undefined //re-setting page
										? f.msg_reset_page : 'Re-setting page...';
		this.msgResetPageLength =	f.msg_reset_page_length!=undefined //re-setting page length
										? f.msg_reset_page_length : 'Re-setting page length...';
		this.msgSort =				f.msg_sort!=undefined //table sorting
										? f.msg_sort : 'Sorting data...';
		this.msgLoadExtensions =	f.msg_load_extensions!=undefined //extensions loading
										? f.msg_load_extensions : 'Loading extensions...';
		this.msgLoadThemes =		f.msg_load_themes!=undefined //themes loading
										? f.msg_load_themes : 'Loading theme(s)...';			

		/*** ids prefixes ***/
		this.prfxTf =				'TF'; //css class name added to table
		this.prfxFlt =				'flt'; //filters (inputs - selects)
		this.prfxValButton =		'btn'; //validation button
		this.prfxInfDiv =			'inf_'; //container div for paging elements, rows counter etc.
		this.prfxLDiv =				'ldiv_'; //left div
		this.prfxRDiv =				'rdiv_'; //right div
		this.prfxMDiv =				'mdiv_'; //middle div
		this.prfxContentDiv =		'cont_'; //table container if fixed headers enabled
		this.prfxCheckListDiv =		'chkdiv_'; //checklist filter container div
		this.prfxSlcPages =			'slcPages_'; //pages select
		this.prfxSlcResults = 		'slcResults_'; //results per page select
		this.prfxSlcResultsTxt =	'slcResultsTxt_'; //label preciding results per page select	
		this.prfxBtnNextSpan =		'btnNextSpan_'; //span containing next page button
		this.prfxBtnPrevSpan =		'btnPrevSpan_'; //span containing previous page button
		this.prfxBtnLastSpan =		'btnLastSpan_'; //span containing last page button
		this.prfxBtnFirstSpan =		'btnFirstSpan_'; //span containing first page button
		this.prfxBtnNext =			'btnNext_'; //next button
		this.prfxBtnPrev =			'btnPrev_'; //previous button
		this.prfxBtnLast =			'btnLast_'; //last button
		this.prfxBtnFirst =			'btnFirst_'; //first button
		this.prfxPgSpan =			'pgspan_'; //span for tot nb pages
		this.prfxPgBeforeSpan =		'pgbeforespan_'; //span preceding pages select (contains 'Page')
		this.prfxPgAfterSpan =		'pgafterspan_'; //span following pages select (contains ' of ')
		this.prfxCounter =			'counter_'; //rows counter div
		this.prfxTotRows =			'totrows_span_'; //nb displayed rows label
		this.prfxTotRowsTxt =		'totRowsTextSpan_'; //label preceding nb rows label
		this.prfxResetSpan =		'resetspan_'; //span containing reset button
		this.prfxLoader =			'load_'; //loader div
		this.prfxStatus =			'status_'; //status bar div
		this.prfxStatusSpan =		'statusSpan_'; //status bar label
		this.prfxStatusTxt =		'statusText_';//text preceding status bar label
		this.prfxCookieFltsValues =	'tf_flts_'; //filter values cookie
		this.prfxCookiePageNb =		'tf_pgnb_'; //page nb cookie
		this.prfxCookiePageLen = 	'tf_pglen_'; //page length cookie
		this.prfxMainTblCont =		'gridCont_'; //div containing grid elements if grid_layout true
		this.prfxTblCont =			'tblCont_'; //div containing table if grid_layout true
		this.prfxHeadTblCont = 		'tblHeadCont_'; //div containing headers table if grid_layout true
		this.prfxHeadTbl =			'tblHead_';	//headers' table if grid_layout true
		this.prfxGridFltTd =		'_td_'; //id of td containing the filter if grid_layout true
		this.prfxGridTh =			'tblHeadTh_'; //id of th containing column header if grid_layout true
		this.prfxHelpSpan =			'helpSpan_'; //id prefix for help elements
		this.prfxHelpDiv =			'helpDiv_'; //id prefix for help elements
		this.prfxPopUpSpan =		'popUpSpan_'; //id prefix for pop-up filter span
		this.prfxPopUpDiv =			'popUpDiv_'; //id prefix for pop-up div containing filter

		/*** cookies ***/
		this.hasStoredValues =		false;
		this.rememberGridValues =	f.remember_grid_values ? true : false; //remembers filters values on page load
		this.fltsValuesCookie =		this.prfxCookieFltsValues + this.id; //cookie storing filter values
		this.rememberPageNb =		this.paging && f.remember_page_number
										? true : false; //remembers page nb on page load	
		this.pgNbCookie =			this.prfxCookiePageNb + this.id; //cookie storing page nb
		this.rememberPageLen =		this.paging && f.remember_page_length
										? true : false; //remembers page length on page load
		this.pgLenCookie =			this.prfxCookiePageLen + this.id; //cookie storing page length
		this.cookieDuration =		f.set_cookie_duration 
										? parseInt(f.set_cookie_duration) :100000; //cookie duration
		
		/*** extensions ***/
		this.hasExtensions =		f.extensions ? true : false; //imports external script
		this.extensions =			(this.hasExtensions) ? f.extensions : null;
		
		/*** themes ***/
		this.enableDefaultTheme =	f.enable_default_theme ? true : false;	
		this.hasThemes =			(f.enable_default_theme 
										|| (f.themes && tf_IsObj(f.themes))) ? true : false; //imports themes
		this.themes =				(this.hasThemes) ? f.themes : null;
		this.themesPath =			f.themes_path!=undefined ? f.themes_path : this.basePath+'TF_Themes/'; //themes path

		/***(deprecated: backward compatibility) ***/
		this.hasBindScript =		f.bind_script ? true : false; //imports external script
		this.bindScript =			(this.hasBindScript) ? f.bind_script : null;
		
		/*** TF events ***/
		var o = this;
		this.Evt = {
			name: {
				filter: 'Filter',
				populateselect: 'Populate',
				populatechecklist: 'PopulateCheckList',
				changepage: 'ChangePage',
				clear: 'Clear',
				changeresultsperpage: 'ChangeResults',
				resetvalues: 'ResetValues',
				resetpage: 'ResetPage',
				resetpagelength: 'ResetPageLength',
				sort: 'Sort',
				loadextensions: 'LoadExtensions',
				loadthemes: 'LoadThemes'			
			},
			_DetectKey: function(e)
			/*====================================================
				- common fn that detects return key for a given
				element (onkeypress for inputs)
			=====================================================*/
			{
				if(!o.enterKey) return;
				var evt = e || window.event;
				if(evt)
				{
					var key=(evt.charCode)?evt.charCode:
						((evt.keyCode)?evt.keyCode:((evt.which)?evt.which:0));
					if(key=='13')
					{
						o.Filter();
						tf_CancelEvent(evt);
						tf_StopEvent(evt);						
					} else { 
						o.isUserTyping = true;
						window.clearInterval(o.onKeyUpTimer);
						o.onKeyUpTimer = undefined; 
					}
				}//if evt
			},
			_OnKeyUp: function(e)
			/*====================================================
				- onkeyup event for text filters 
				(onKeyUp property)
			=====================================================*/
			{
				if(!o.onKeyUp) return;
				var evt = e || window.event;
				var key=(evt.charCode)?evt.charCode:
						((evt.keyCode)?evt.keyCode:((evt.which)?evt.which:0));
				o.isUserTyping = false;
				
				if(key!=13 && key!=9 && key!=27 && key!=38 && key!=40)
				{
					function filter()
					{
						window.clearInterval(o.onKeyUpTimer);
						o.onKeyUpTimer = undefined;
						if(!o.isUserTyping)
						{
							o.Filter();
							o.isUserTyping = null;			
						}
					}
					if(o.onKeyUpTimer==undefined)
						o.onKeyUpTimer = window.setInterval(filter, o.onKeyUpDelay);
				} else { 
					window.clearInterval(o.onKeyUpTimer); 
					o.onKeyUpTimer = undefined; 
				}
			},
			_OnKeyDown: function(e)
			/*====================================================
				- onkeydown event for input filters 
				(onKeyUp property)
			=====================================================*/
			{
				if(!o.onKeyUp) return;
				o.isUserTyping = true;
			},
			_OnInpBlur: function(e)
			/*====================================================
				- onblur event for input filters (onKeyUp property)
			=====================================================*/
			{
				if(o.onKeyUp){
					o.isUserTyping = false; 
					window.clearInterval(o.onKeyUpTimer);
				}
				//Watermark
				if(this.value == '' && o.inpWatermark != ''){ 
					this.value = (o.isInpWatermarkArray) 
						? o.inpWatermark[this.getAttribute('ct')]  : o.inpWatermark;
					tf_AddClass(this, o.inpWatermarkCssClass);
				}
				if(o.ezEditTable){
				  if(o.editable) o.ezEditTable.Editable.Set();
				  if(o.selectable) o.ezEditTable.Selection.Set();
				}
			},
			_OnInpFocus: function(e)
			/*====================================================
				- onfocus event for input filters
			=====================================================*/
			{
				var evt = e || window.event;
				o.activeFilterId = this.getAttribute('id');
				o.activeFlt = tf_Id(o.activeFilterId);
				//Watermark
				if(!o.isInpWatermarkArray){
					if(this.value == o.inpWatermark && o.inpWatermark != ''){					
						this.value = ''; 
						tf_RemoveClass(this, o.inpWatermarkCssClass);
					}
				} else {
					var inpWatermark = o.inpWatermark[this.getAttribute('ct')];
					if(this.value == inpWatermark && inpWatermark != ''){ 
						this.value = '';
						tf_RemoveClass(this, o.inpWatermarkCssClass);
					}
				}
				if(o.popUpFilters){
					tf_CancelEvent(evt);
					tf_StopEvent(evt);
				}
				if(o.ezEditTable){
				  	if(o.editable) o.ezEditTable.Editable.Remove();
				  	if(o.selectable) o.ezEditTable.Selection.Remove();
				}
			},
			_OnSlcFocus: function(e)
			/*====================================================
				- onfocus event for select filters
			=====================================================*/
			{
				var evt = e || window.event;
				o.activeFilterId = this.getAttribute('id');
				o.activeFlt = tf_Id(o.activeFilterId);
				if(o.fillSlcOnDemand && this.getAttribute('filled') == '0')
				{// select is populated when element has focus
					var ct = this.getAttribute('ct');
					o.PopulateSelect(ct);
					if(!tf_isIE) this.setAttribute('filled','1');
				}
				if(o.popUpFilters){
					tf_CancelEvent(evt);
					tf_StopEvent(evt);
				}
			},
			_OnSlcChange: function(e)
			/*====================================================
				- onchange event for select filters
			=====================================================*/
			{
				var evt = e || window.event;
				if(o.popUpFilters) tf_StopEvent(evt);
				if(o.onSlcChange) o.Filter();
			},
			_OnSlcBlur: function()
			/*====================================================
				- onblur event for select filters
			=====================================================*/
			{	
			},
			_OnCheckListChange: function(e)
			/*====================================================
				- onchange event for checklist filters
			=====================================================*/
			{
				//Checks caller is not null
				if(!o.Evt._OnCheckListChange.caller) return;
				o.Evt._OnSlcChange(e);
			},
			_OnCheckListClick: function()
			/*====================================================
				- onclick event for checklist filters
			=====================================================*/
			{
				if(o.fillSlcOnDemand && this.getAttribute('filled') == '0')
				{
					var ct = this.getAttribute('ct');
					o.PopulateCheckList(ct);
					o.checkListDiv[ct].onclick = null;
					o.checkListDiv[ct].title = '';
				}
			},
			_OnCheckListFocus: function()
			/*====================================================
				- onclick event for checklist filter container
			=====================================================*/
			{
				o.activeFilterId = this.firstChild.getAttribute('id');
				o.activeFlt = tf_Id(o.activeFilterId);
			},
			_OnBtnClick: function()
			/*====================================================
				- onclick event for validation button 
				(btn property)
			=====================================================*/
			{
				o.Filter();
			},
			_OnSlcPagesChangeEvt: null, //used by sort adapter
			_EnableSlc: function()
			/*====================================================
				- onclick event slc parent node (enables filters)
				IE only
			=====================================================*/
			{
				this.firstChild.disabled = false;							
				this.firstChild.focus();							
				this.onclick = null;
			},
			_Clear: function()
			/*====================================================
				- clears filters
			=====================================================*/
			{
				o.ClearFilters();
			},
			_OnHelpBtnClick: function()
			/*====================================================
				- Help button onclick event
			=====================================================*/
			{
				o._ToggleHelp();
			},
			_Paging: { //used by sort adapter
				nextEvt: null,
				prevEvt: null,
				lastEvt: null,
				firstEvt: null
			}
		};
		
		if(this.enableModules){
			//Register modules to be imported
			var m = this.module, rm = this.registeredModules;
			if(this.loader || this.statusBar || this.status || this.hasThemes /*|| this.publicMethods*/) 
				rm.push(m.loader.name);
			if(this.hasThemes /*|| this.publicMethods*/) rm.push(m.themes.name);
			if(this.paging /*|| this.publicMethods*/) rm.push(m.paging.name);
			if(this.gridLayout/* || this.publicMethods*/) rm.push(m.gridLayout.name);
			if(this.sort || this.gridLayout /*|| this.publicMethods*/) rm.push(m.sort.name);
			if(this.popUpFilters /*|| this.publicMethods*/) rm.push(m.popUpFilters.name);
			if(this.rowsCounter /*|| this.publicMethods*/) rm.push(m.rowsCounter.name);
			if(this.fixedHeaders /*|| this.publicMethods*/) rm.push(m.fixedHeaders.name);
			if(this.rememberGridValues || this.rememberPageLen || this.rememberPageNb /*|| this.publicMethods*/)
				rm.push(m.cookies.name);
			if(this.statusBar|| this.status || this.loader || this.hasThemes /*|| this.publicMethods*/) rm.push(m.statusBar.name);
			if(this.btnReset /*|| this.publicMethods*/) rm.push(m.resetBtn.name);
			if((this.helpInstructions || this.helpInstructions==null)/*|| this.publicMethods*/) rm.push(m.helpInstructions.name);
			if(this.alternateBgs /*|| this.publicMethods*/) rm.push(m.alternateRows.name);
			if(this.highlightKeywords /*|| this.publicMethods*/) rm.push(m.highlightKeywords.name);
			if(this.refreshFilters /*|| this.publicMethods*/) rm.push(m.refreshFilters.name);
			if(this.hasColOperation /*|| this.publicMethods*/) rm.push(m.colOps.name);
			if(this.selectable || this.editable) rm.push(m.ezEditTable.name);
			if(this.hasExtensions || this.gridLayout /*|| this.publicMethods*/){				
				rm.push(m.extensions.name);
				if(!rm.tf_Has(m.populateCheckList.name, true)) rm.push(m.populateCheckList.name);
			}
			if(this.inpWatermark != '') rm.push(m.watermark.name);
			if(this.publicMethods || this.hasExtensions || this.refreshFilters ||
				this.popUpFilters || this.markActiveColumns) rm.push(m.publicMethods.name);

			//Import modules
			for(var i=0; i<rm.length; i++){
				var module = m[rm[i]];
				if(tf_IsImported(module.path)){
					module.loaded = 1;
					this.alreadyImportedModules.push(module.name);
				} else { this.ImportModule(module); this.importedModules.push(module.name) };
			}
		}		
    }//if tbl!=null		
}

TF.prototype = {
	
	AddGrid: function()
	{
		if(this.enableModules){
			if(this.isFirstLoad){
				var o = this;
				if(tf_isNotIE){
					window[this.id + '_DelayAddGrid'] = function()
					{
						if(arguments.callee.done) return;
						//Chrome & Safari do not seem to fire window.onload event
						//Sorry for this ugly solution, one more ;-)
						setTimeout(function(){ o._AddGrid(); },1);
						arguments.callee.done = 1;
					}
					tf_AddEvent(window, 'load', window[this.id + '_DelayAddGrid']);
				} else {
					//Under IE script continues execution before dynamically imported scripts are fully loaded
					function checkLoadedModules(){
						var modulesFullyImported = true;						
						for(var i=0; i<o.registeredModules.length; i++){
							var module = o.module[o.registeredModules[i]];
							if(!module.loaded){ 
								modulesFullyImported = false;
								break;
							}
						}
						if(modulesFullyImported){ 
							clearInterval(pe);
							o._AddGrid();
						}
					}
					var pe = setInterval(checkLoadedModules, 10);
				}

			} else this._AddGrid();
		} else this._AddGrid();
	}, Init : function(){ this.AddGrid(); }, Initialize : function(){ this.AddGrid(); },
	init : function(){ this.AddGrid(); }, initialize : function(){ this.AddGrid(); },
	
	_AddGrid: function()
	/*====================================================
		- adds row with filtering grid bar and sets grid 
		behaviours and layout
	=====================================================*/
	{
		if(this.hasGrid) return;
		if(this.gridLayout) this.refRow = this.startRow==undefined ? 0 : this.startRow;
		if(this.popUpFilters && ((this.filtersRowIndex==0 && this.headersRow == 1) || this.gridLayout)) this.headersRow = 0;
		var f = !this.fObj ? {} : this.fObj;
		var n = (this.singleSearchFlt) ? 1 : this.nbCells, inpclass;
		if(window['tf_'+this.id] == undefined) window['tf_'+this.id] = this;

		//loads stylesheet if not imported
		//Issues with browsers != IE, IE rules in this case
		this.IncludeFile(this.stylesheetId, this.stylesheet, null, 'link');
		
		//loads theme
		if(this.hasThemes) this._LoadThemes();

		if(this.gridLayout)
		{
			this.isExternalFlt = true;
			this.SetGridLayout();
			//Once grid generated 1st filterable row is 0 again
			this.refRow = (tf_isIE || tf_isIE7) ? (this.refRow+1) : 0;
		}
				
		if(this.loader) this.SetLoader();
		
		if(this.popUpFilters){ if(!this.isFirstLoad && !this.gridLayout){ this.headersRow--; } this.SetPopupFilterIcons(); }
		
		if(this.hasResultsPerPage)
		{ 
			this.resultsPerPage = f['results_per_page']!=undefined   
				? f['results_per_page'] : this.resultsPerPage;
			if(this.resultsPerPage.length<2)
				this.hasResultsPerPage = false;
			else
				this.pagingLength = this.resultsPerPage[1][0];
		}
		
		if(!this.fltGrid)
		{//filters grid is not genetared
			this.refRow = (this.refRow-1);
			if(this.gridLayout) this.refRow = 0;
			this.nbFilterableRows = this.GetRowsNb();
			this.nbVisibleRows = this.nbFilterableRows;
			this.nbRows = this.nbFilterableRows + this.refRow;
		} else {
			if(this.isFirstLoad)
			{
				if(!this.gridLayout){
					var fltrow;
					var thead = tf_Tag(this.tbl,'thead');
					if(thead.length>0)
						fltrow = thead[0].insertRow(this.filtersRowIndex);
					else
						fltrow = this.tbl.insertRow(this.filtersRowIndex);

					if(this.headersRow>1 && this.filtersRowIndex <= this.headersRow && !this.popUpFilters) this.headersRow++;  
					if(this.popUpFilters) this.headersRow++;
					
					if(this.fixedHeaders) this.SetFixedHeaders();
					
					fltrow.className = this.fltsRowCssClass;
					//Disable for grid_layout
					if(this.isExternalFlt && (!this.gridLayout || this.popUpFilters)) fltrow.style.display = 'none';				
				}
				
				this.nbFilterableRows = this.GetRowsNb();
				this.nbVisibleRows = this.nbFilterableRows;
				this.nbRows = this.tbl.rows.length;
				
				for(var i=0; i<n; i++){// this loop adds filters
					var fltcell = tf_CreateElm(this.fltCellTag);
					if(this.singleSearchFlt) fltcell.colSpan = this.nbCells;
					if(!this.gridLayout) fltrow.appendChild(fltcell);
					inpclass = (i==n-1 && this.displayBtn) ? this.fltSmallCssClass : this.fltCssClass;
					
					if(this.popUpFilters) this.SetPopupFilter(i);
					
					if(this['col'+i]==undefined)
						this['col'+i] = (f['col_'+i]==undefined) 
							? this.fltTypeInp : f['col_'+i].tf_LCase();
							
					if(this.singleSearchFlt)
					{//only 1 input for single search
						this['col'+i] = this.fltTypeInp;
						inpclass = this.singleFltCssClass;
					}
	
					if(this['col'+i]==this.fltTypeSlc || this['col'+i]==this.fltTypeMulti)
					{//selects					
						var slc = tf_CreateElm(this.fltTypeSlc,
							['id',this.prfxFlt+i+'_'+this.id],
							['ct',i],['filled','0']);
						if(this['col'+i]==this.fltTypeMulti)
						{
							slc.multiple = this.fltTypeMulti;
							slc.title = this.multipleSlcTooltip;
						}
						slc.className = (this['col'+i].tf_LCase()==this.fltTypeSlc) 
							? inpclass : this.fltMultiCssClass;// for ie<=6
						
						if(this.isExternalFlt && this.externalFltTgtIds && tf_Id(this.externalFltTgtIds[i]))
						{//filter is appended in desired element
							tf_Id(this.externalFltTgtIds[i]).appendChild(slc);
							this.externalFltEls.push(slc);
						} else {
							fltcell.appendChild(slc);
						}
						
						this.fltIds.push(this.prfxFlt+i+'_'+this.id);
						
						if(!this.fillSlcOnDemand) this._PopulateSelect(i);
						
						slc.onkeypress = this.Evt._DetectKey;
						slc.onchange = this.Evt._OnSlcChange;
						slc.onfocus = this.Evt._OnSlcFocus;
						slc.onblur = this.Evt._OnSlcBlur;
						
						if(this.fillSlcOnDemand)
						{//1st option is created here since PopulateSelect isn't invoked
							var opt0 = tf_CreateOpt(this.displayAllText,'');
							slc.appendChild(opt0);						
						}
						
						/* 	Code below for IE: it prevents select options to
							slide out before select it-self is populated.
							This is an unexpeted behavior for users since at
							1st click options are empty. Work around: 
							select is disabled and by clicking on element 
							(parent td), users enable drop-down and select is
							populated at same time.  */
						if(this.fillSlcOnDemand && tf_isIE)
						{
							slc.disabled = true;
							slc.title = this.activateSlcTooltip;
							slc.parentNode.onclick = this.Evt._EnableSlc;
							if(this['col'+i]==this.fltTypeMulti)
								this.__deferMultipleSelection(slc,0);
						}
					}
					
					else if(this['col'+i]==this.fltTypeCheckList)
					{// checklist
						var divCont = tf_CreateElm('div',
										['id',this.prfxCheckListDiv+i+'_'+this.id],
										['ct',i],['filled','0']);
						divCont.className = this.checkListDivCssClass;
						
						if(this.isExternalFlt && this.externalFltTgtIds
							&& tf_Id(this.externalFltTgtIds[i]))
						{//filter is appended in desired element
							tf_Id(this.externalFltTgtIds[i]).appendChild(divCont);
							this.externalFltEls.push(divCont);
						} else {
							fltcell.appendChild(divCont);
						}
						
						this.checkListDiv[i] = divCont;
						this.fltIds.push(this.prfxFlt+i+'_'+this.id);
						if(!this.fillSlcOnDemand) this._PopulateCheckList(i);
						
						divCont.onclick = this.Evt._OnCheckListFocus;
						
						if(this.fillSlcOnDemand)
						{
							divCont.onclick = this.Evt._OnCheckListClick;
							divCont.appendChild(tf_CreateText(this.activateCheckListTxt));
						}
					}
					
					else
					{
						var inptype;
						(this['col'+i]==this.fltTypeInp) ? inptype='text' : inptype='hidden';//show/hide input	
						var inp = tf_CreateElm(this.fltTypeInp,['id',this.prfxFlt+i+'_'+this.id],['type',inptype],['ct',i]);	
						if(inptype!='hidden')
							inp.value = (this.isInpWatermarkArray) ? this.inpWatermark[i] : this.inpWatermark;					
						inp.className = inpclass;// for ie<=6
						if(this.inpWatermark!='') tf_AddClass(inp, this.inpWatermarkCssClass); //watermark css class
						inp.onfocus = this.Evt._OnInpFocus;
						
						if(this.isExternalFlt && this.externalFltTgtIds && tf_Id(this.externalFltTgtIds[i]))
						{//filter is appended in desired element
							tf_Id(this.externalFltTgtIds[i]).appendChild(inp);
							this.externalFltEls.push(inp);
						} else {
							fltcell.appendChild(inp);
						}
						
						this.fltIds.push(this.prfxFlt+i+'_'+this.id);
						
						inp.onkeypress = this.Evt._DetectKey;
						inp.onkeydown = this.Evt._OnKeyDown;
						inp.onkeyup = this.Evt._OnKeyUp;
						inp.onblur = this.Evt._OnInpBlur;
						
						if(this.rememberGridValues)
						{
							var flts = tf_ReadCookie(this.fltsValuesCookie); //reads the cookie
							var reg = new RegExp(this.separator,'g');
							var flts_values = flts.split(reg); //creates an array with filters' values
							if(flts_values[i]!=' ')
								this.SetFilterValue(i,flts_values[i],false);					
						}
					}
					
					if(i==n-1 && this.displayBtn)// this adds validation button
					{
						var btn = tf_CreateElm(this.fltTypeInp,['id',this.prfxValButton+i+'_'+this.id],
												['type','button'], ['value',this.btnText]);
						btn.className = this.btnCssClass;
						
						if(this.isExternalFlt && this.externalFltTgtIds && tf_Id(this.externalFltTgtIds[i])) 
						//filter is appended in desired element
							tf_Id(this.externalFltTgtIds[i]).appendChild(btn);
						else
							fltcell.appendChild(btn);
						
						btn.onclick = this.Evt._OnBtnClick;				
					}//if
					
				}// for i
				
			} else {
				this.__resetGrid();			
			}//if isFirstLoad
		}//if this.fltGrid
		
		/* Filter behaviours */	
		if(this.rowsCounter) this.SetRowsCounter();
		if(this.statusBar) this.SetStatusBar();
		if(this.fixedHeaders && !this.isFirstLoad) this.SetFixedHeaders();
		if(this.paging)	this.SetPaging();
		if(this.hasResultsPerPage && this.paging) this.SetResultsPerPage();
		if(this.btnReset) this.SetResetBtn();
		if(this.helpInstructions) this.SetHelpInstructions();
		
		if(this.hasColWidth && !this.gridLayout) this.SetColWidths();

		if(this.alternateBgs && this.isStartBgAlternate)
			this.SetAlternateRows(); //1st time only if no paging and rememberGridValues

		if(this.hasColOperation && this.fltGrid)
		{
			this.colOperation = f.col_operation;
			this.SetColOperation();
		}

		if(this.sort) this.SetSort();
		if(this.selectable || this.editable) this.SetEditable();

		/* Deprecated Loads external script */
		if(this.hasBindScript)
		{
			if(this.bindScript['src']!=undefined)
			{
				var scriptPath = this.bindScript['src'];
				var scriptName = (this.bindScript['name']!=undefined)
									? this.bindScript['name'] : '';
				this.IncludeFile(scriptName,scriptPath,this.bindScript['target_fn']);
			}
		}//if bindScript
		/* */
		
		this.isFirstLoad = false;
		this.hasGrid = true;
		
		if(this.rememberGridValues || this.rememberPageLen || this.rememberPageNb)
			this.ResetValues();
		
		//TF css class is added to table
		if(!this.gridLayout) tf_AddClass(this.tbl, this.prfxTf); 
		
		if(this.loader) this.ShowLoader('none');

		/* Loads extensions */
		if(this.hasExtensions) this.LoadExtensions();		
		
		if(this.onFiltersLoaded)
			this.onFiltersLoaded.call(null,this);

	},// AddGrid
	
	EvtManager: function(evt,s)
	/*====================================================
		- TF events manager
		- Params: 
			- event name (string)
			- config object (optional literal object)
	=====================================================*/
	{
		var o = this;
		var slcIndex = (s!=undefined && s.slcIndex!=undefined) ? s.slcIndex : null;
		var slcExternal = (s!=undefined && s.slcExternal!=undefined) ? s.slcExternal : false;
		var slcId = (s!=undefined && s.slcId!=undefined) ? s.slcId : null;
		var pgIndex = (s!=undefined && s.pgIndex!=undefined) ? s.pgIndex : null;
		function efx(){
			if(evt!=undefined)
			switch(evt)
			{
				case o.Evt.name.filter:
					(o.isModFilterFn) 
						? o.modFilterFn.call(null,o)
						: o._Filter();
				break;
				case o.Evt.name.populateselect:
					(o.refreshFilters) 
						? o._PopulateSelect(slcIndex,true) 
						: o._PopulateSelect(slcIndex,false,slcExternal,slcId);
				break;
				case o.Evt.name.populatechecklist:
					o._PopulateCheckList(slcIndex,slcExternal,slcId);
				break;
				case o.Evt.name.changepage:
					o._ChangePage(pgIndex);
				break;
				case o.Evt.name.clear:
					o._ClearFilters(); 
					o._Filter();
				break;
				case o.Evt.name.changeresultsperpage:
					o._ChangeResultsPerPage();
				break;
				case o.Evt.name.resetvalues:
					o._ResetValues();					
					o._Filter();
				break;
				case o.Evt.name.resetpage:
					o._ResetPage(o.pgNbCookie);
				break;
				case o.Evt.name.resetpagelength:
					o._ResetPageLength(o.pgLenCookie);
				break;
				case o.Evt.name.sort:
					void(0);
				break;
				case o.Evt.name.loadextensions:
					o._LoadExtensions();
				break;
				case o.Evt.name.loadthemes:
					o._LoadThemes();
				break;
				default: //to be used by extensions events when needed
					o['_'+evt].call(null,o,s);
				break;
			}
			if(o.status || o.statusBar) o.StatusMsg('');
			if(o.loader) o.ShowLoader('none');
		}

		if(this.loader || this.status || this.statusBar)
		{
			try{
				this.ShowLoader('');
				this.StatusMsg(o['msg'+evt]);
			} catch(e){}
			window.setTimeout(efx,this.execDelay);
		} else efx();
	},
	
	ImportModule: function(module)
	{
		if(!module.path || !module.name) return;
		this.IncludeFile(module.name, module.path, module.init);
	},
	
	RemoveGrid: function()
	/*====================================================
		- removes a filter grid
	=====================================================*/
	{
		if(this.fltGrid && this.hasGrid)
		{
			var rows = this.tbl.rows;
			if(this.paging) this.RemovePaging();
			if(this.statusBar) this.RemoveStatusBar();
			if(this.rowsCounter) this.RemoveRowsCounter();
			if(this.btnReset) this.RemoveResetBtn();
			if(this.helpInstructions || this.helpInstructions==null) this.RemoveHelpInstructions();
			if(this.paging) this.RemoveResultsPerPage();
			if(this.isExternalFlt && !this.popUpFilters) this.RemoveExternalFlts();
			if(this.fixedHeaders) this.RemoveFixedHeaders();
			if(this.infDiv) this.RemoveTopDiv();
			if(this.highlightKeywords) this.UnhighlightAll();
			if(this.sort) this.RemoveSort();
			if(this.loader) this.RemoveLoader();
			if(this.popUpFilters) this.RemovePopupFilters();
			if(this.markActiveColumns) this.ClearActiveColumns();
			
			for(var j=this.refRow; j<this.nbRows; j++)
			{//this loop shows all rows and removes validRow attribute			
				rows[j].style.display = '';
				try
				{ 
					if(rows[j].hasAttribute('validRow')) 
						rows[j].removeAttribute('validRow');
				} //ie<=6 doesn't support hasAttribute method
				catch(e){
					for(var x = 0; x < rows[j].attributes.length; x++) 
					{
						if(rows[j].attributes[x].nodeName.tf_LCase()=='validrow') 
							rows[j].removeAttribute('validRow');
					}//for x
				}//catch(e)
				
				//removes alterning colors
				if(this.alternateBgs) this.RemoveRowBg(j);
				
			}//for j
	
			if(this.fltGrid && !this.gridLayout)
			{
				this.fltGridEl = rows[this.filtersRowIndex];			
				this.tbl.deleteRow(this.filtersRowIndex);
			}
			if(this.gridLayout) this.RemoveGridLayout();
			tf_RemoveClass(this.tbl, this.prfxTf);
			this.activeFlt = null;
			this.isStartBgAlternate = true;
			this.hasGrid = false;
	
		}//if this.fltGrid
	},
	
	SetTopDiv: function()
	/*====================================================
		- Generates div above table where paging,
		reset button, rows counter label etc. are placed
	=====================================================*/
	{
		if(this.infDiv!=null) return;
	
		/*** container div ***/
		var infdiv = tf_CreateElm('div',['id',this.prfxInfDiv+this.id]);
		infdiv.className = this.infDivCssClass;// setAttribute method doesn't seem to work on ie<=6
		
		if(this.toolBarTgtId) //custom container
			tf_Id(this.toolBarTgtId).appendChild(infdiv);
		else if(this.fixedHeaders && this.contDiv) //fixed headers
			this.contDiv.parentNode.insertBefore(infdiv, this.contDiv);
		else if(this.gridLayout){ //grid-layout
			this.tblMainCont.appendChild(infdiv);
			infdiv.className = this.gridInfDivCssClass;
		}
		else //default location: above table
			this.tbl.parentNode.insertBefore(infdiv, this.tbl);
		this.infDiv = tf_Id(this.prfxInfDiv+this.id);
		
		/*** left div containing rows # displayer ***/
		var ldiv = tf_CreateElm('div',['id',this.prfxLDiv+this.id]);
		ldiv.className = this.lDivCssClass;/*'ldiv'*/;
		infdiv.appendChild(ldiv);
		this.lDiv = tf_Id(this.prfxLDiv+this.id);		
		
		/*** 	right div containing reset button 
				+ nb results per page select 	***/	
		var rdiv = tf_CreateElm('div',['id',this.prfxRDiv+this.id]);
		rdiv.className = this.rDivCssClass/*'rdiv'*/;
		infdiv.appendChild(rdiv);
		this.rDiv = tf_Id(this.prfxRDiv+this.id);
		
		/*** mid div containing paging elements ***/
		var mdiv = tf_CreateElm('div',['id',this.prfxMDiv+this.id]);
		mdiv.className = this.mDivCssClass/*'mdiv'*/;						
		infdiv.appendChild(mdiv);
		this.mDiv = tf_Id(this.prfxMDiv+this.id);
		
		if(this.helpInstructions==null) this.SetHelpInstructions();
	},
	
	RemoveTopDiv: function()
	/*====================================================
		- Removes div above table where paging,
		reset button, rows counter label etc. are placed
	=====================================================*/
	{
		if(this.infDiv==null) return;
		this.infDiv.parentNode.removeChild(this.infDiv);
		this.infDiv = null;
	},
	
	RemoveExternalFlts: function()
	/*====================================================
		- removes external filters
	=====================================================*/
	{
		if(!this.isExternalFlt && !this.externalFltTgtIds) return;
		for(var ct=0; ct<this.externalFltTgtIds.length; ct++)
			if(tf_Id(this.externalFltTgtIds[ct]))
				tf_Id(this.externalFltTgtIds[ct]).innerHTML = '';
	},
	
	Filter: function()
	{
		this.EvtManager(this.Evt.name.filter); 
	},
	_Filter: function()
	/*====================================================
		- Filtering fn
		- retrieves data from each td in every single tr
		and compares to search string for current
		column
		- tr is hidden if all search strings are not 
		found
	=====================================================*/
	{
		if(!this.fltGrid || (!this.hasGrid && !this.isFirstLoad)) return;
		//invokes eventual onbefore method
		if(this.onBeforeFilter) this.onBeforeFilter.call(null,this);
		
		if(this.inpWatermark != '') this.SetWatermark(false);
		
		var row = this.tbl.rows;	
		f = this.fObj!=undefined ? this.fObj : [];
		var hiddenrows = 0;
		this.validRowsIndex = [];
		var o = this;		
		
		//removes keyword highlighting
		if(this.highlightKeywords) this.UnhighlightAll();
		//removes popup filters active icons 
		if(this.popUpFilters) this.SetAllPopupFiltersIcon();
		//removes active column header class
		if(this.markActiveColumns) this.ClearActiveColumns();
		//search args re-init
		this.searchArgs = this.GetFiltersValue(); 
		
		var num_cell_data, nbFormat;
		var re_le = new RegExp(this.leOperator), re_ge = new RegExp(this.geOperator);
		var re_l = new RegExp(this.lwOperator), re_g = new RegExp(this.grOperator);
		var re_d = new RegExp(this.dfOperator), re_lk = new RegExp(tf_RegexpEscape(this.lkOperator));
		var re_eq = new RegExp(this.eqOperator), re_st = new RegExp(this.stOperator);
		var re_en = new RegExp(this.enOperator), re_an = new RegExp(this.anOperator);
		var re_cr = new RegExp(this.curExp), re_em = this.emOperator;
		var re_nm = this.nmOperator, re_re = new RegExp(tf_RegexpEscape(this.rgxOperator));
		
		function highlight(str,ok,cell){//keyword highlighting
			if(o.highlightKeywords && ok){
				str = str.replace(re_lk,'');
				str = str.replace(re_eq,'');
				str = str.replace(re_st,'');
				str = str.replace(re_en,'');
				var w = str;
				if(re_le.test(str) || re_ge.test(str) || re_l.test(str) || re_g.test(str) || re_d.test(str))	
					w = tf_GetNodeText(cell);
				if(w!='')
					tf_HighlightWord(cell,w,o.highlightCssClass,o);
			}
		}
		
		//looks for search argument in current row
		function hasArg(sA,cell_data,j)
		{
			var occurence;
			//Search arg operator tests
			var hasLO = re_l.test(sA), hasLE = re_le.test(sA);
			var hasGR = re_g.test(sA), hasGE = re_ge.test(sA);
			var hasDF = re_d.test(sA), hasEQ = re_eq.test(sA);
			var hasLK = re_lk.test(sA), hasAN = re_an.test(sA);
			var hasST = re_st.test(sA), hasEN = re_en.test(sA);
			var hasEM = (re_em == sA), hasNM = (re_nm == sA);
			var hasRE = re_re.test(sA);
			
			//Search arg dates tests
			var isLDate = (hasLO && tf_IsValidDate(sA.replace(re_l,''),dtType));
			var isLEDate = (hasLE && tf_IsValidDate(sA.replace(re_le,''),dtType));
			var isGDate = (hasGR && tf_IsValidDate(sA.replace(re_g,''),dtType));
			var isGEDate = (hasGE && tf_IsValidDate(sA.replace(re_ge,''),dtType));
			var isDFDate = (hasDF && tf_IsValidDate(sA.replace(re_d,''),dtType));
			var isEQDate = (hasEQ && tf_IsValidDate(sA.replace(re_eq,''),dtType));

			if(tf_IsValidDate(cell_data,dtType))
			{//dates
				var dte1 = tf_FormatDate(cell_data,dtType);
				if(isLDate) 
				{// lower date
					var dte2 = tf_FormatDate(sA.replace(re_l,''),dtType);
					occurence = (dte1 < dte2);
				}
				else if(isLEDate) 
				{// lower equal date
					var dte2 = tf_FormatDate(sA.replace(re_le,''),dtType);
					occurence = (dte1 <= dte2);
				}
				else if(isGEDate) 
				{// greater equal date
					var dte2 = tf_FormatDate(sA.replace(re_ge,''),dtType);
					occurence = (dte1 >= dte2);
				}
				else if(isGDate) 
				{// greater date
					var dte2 = tf_FormatDate(sA.replace(re_g,''),dtType);
					occurence = (dte1 > dte2);
				}
				else if(isDFDate) 
				{// different date
					var dte2 = tf_FormatDate(sA.replace(re_d,''),dtType);
					occurence = (dte1.toString() != dte2.toString());
				}
				else if(isEQDate) 
				{// equal date
					var dte2 = tf_FormatDate(sA.replace(re_eq,''),dtType);
					occurence = (dte1.toString() == dte2.toString());
				}
				else if(re_lk.test(sA)) // searched keyword with * operator doesn't have to be a date
				{// like date
					occurence = o.__containsStr(sA.replace(re_lk,''),cell_data,null,false);
				}
				else if(tf_IsValidDate(sA,dtType))
				{
					var dte2 = tf_FormatDate(sA,dtType);
					occurence = (dte1.toString() == dte2.toString());
				}
				else if(hasEM) //empty
					occurence = (cell_data.tf_Trim()=='' ? true : false);
				
				else if(hasNM) //non-empty
					occurence = (cell_data.tf_Trim()!='' ? true : false);
			}
			
			else 
			{						
				//first numbers need to be formated
				if(o.hasColNbFormat && o.colNbFormat[j]!=null)
				{
					num_cell_data = tf_RemoveNbFormat(cell_data,o.colNbFormat[j]);
					nbFormat = o.colNbFormat[j];
				} else {
					if(o.thousandsSeparator==',' && o.decimalSeparator=='.')
					{
						num_cell_data = tf_RemoveNbFormat(cell_data,'us');
						nbFormat = 'us';
					} else {
						num_cell_data = tf_RemoveNbFormat(cell_data,'eu');
						nbFormat = 'eu';
					}
				}
				
				// first checks if there is any operator (<,>,<=,>=,!,*,=,{,},rgx:)
				if(hasLE) //lower equal
					occurence = num_cell_data <= tf_RemoveNbFormat(sA.replace(re_le,''),nbFormat);
				
				else if(hasGE) //greater equal
					occurence = num_cell_data >= tf_RemoveNbFormat(sA.replace(re_ge,''),nbFormat);
				
				else if(hasLO) //lower
					occurence = num_cell_data < tf_RemoveNbFormat(sA.replace(re_l,''),nbFormat);
					
				else if(hasGR) //greater
					occurence = num_cell_data > tf_RemoveNbFormat(sA.replace(re_g,''),nbFormat);							
					
				else if(hasDF) //different
					occurence = o.__containsStr(sA.replace(re_d,''),cell_data) ? false : true;
			
				else if(hasLK) //like
					occurence = o.__containsStr(sA.replace(re_lk,''),cell_data,null,false);
				
				else if(hasEQ) //equal
					occurence = o.__containsStr(sA.replace(re_eq,''),cell_data,null,true);
				
				else if(hasST) //starts with
					occurence = cell_data.indexOf(sA.replace(re_st,''))==0 ? true : false;
				
				else if(hasEN) //ends with
				{
					var searchArg = sA.replace(re_en,'');
					occurence = cell_data.lastIndexOf(searchArg,cell_data.length-1)==(cell_data.length-1)-(searchArg.length-1)
						&& cell_data.lastIndexOf(searchArg,cell_data.length-1) > -1
						? true : false;
				}
				
				else if(hasEM) //empty
					occurence = (cell_data.tf_Trim()=='' ? true : false);
				
				else if(hasNM) //non-empty
					occurence = (cell_data.tf_Trim()!='' ? true : false);
 
				else if(hasRE){ //regexp
					try{ //in case regexp fires an exception
						var searchArg = sA.replace(re_re,''); //operator is removed
						var rgx = new RegExp(searchArg); 
						occurence = rgx.test(cell_data);
					} catch(e) { occurence = false; }
				}
				
				else
					occurence = o.__containsStr(sA,cell_data,(f['col_'+j]==undefined) ? this.fltTypeInp : f['col_'+j]);

			}//else
			return occurence;
		}//fn
		
		for(var k=this.refRow; k<this.nbRows; k++)
		{
			/*** if table already filtered some rows are not visible ***/
			if(row[k].style.display == 'none') row[k].style.display = '';
					
			var cell = row[k].cells;
			var nchilds = cell.length;	
			
			// checks if row has exact cell #
			if(nchilds != this.nbCells) continue;
	
			var occurence = [];
			var isRowValid = (this.searchType=='include') ? true : false;
			var singleFltRowValid = false; //only for single filter search
			
			for(var j=0; j<nchilds; j++)
			{// this loop retrieves cell data
				var sA = this.searchArgs[(this.singleSearchFlt) ? 0 : j]; //searched keyword
				var dtType = (this.hasColDateType) ? this.colDateType[j] : this.defaultDateType;
				if(sA=='') continue;
				
				var cell_data = this.GetCellData(j, cell[j]).tf_MatchCase(this.matchCase);
	
				var sAOrSplit = sA.split(this.orOperator);//multiple search parameter operator ||
				var hasMultiOrSA = (sAOrSplit.length>1) ? true : false;//multiple search || parameter boolean
				var sAAndSplit = sA.split(this.anOperator);//multiple search parameter operator &&
				var hasMultiAndSA = (sAAndSplit.length>1) ? true : false;//multiple search && parameter boolean

				if(hasMultiOrSA || hasMultiAndSA)
				{//multiple sarch parameters
					var cS, occur = false;
					var s = (hasMultiOrSA) ? sAOrSplit : sAAndSplit;
					for(var w=0; w<s.length; w++)
					{
						cS = s[w].tf_Trim();
						occur = hasArg(cS,cell_data,j);
						highlight(cS,occur,cell[j]);
						if(hasMultiOrSA && occur) break;
						if(hasMultiAndSA && !occur) break;
					}
					occurence[j] = occur;
				}
				else {//single search parameter		
					occurence[j] = hasArg(sA.tf_Trim(),cell_data,j);
					highlight(sA,occurence[j],cell[j]);
				}//else single param
				
				if(!occurence[j]) isRowValid = (this.searchType=='include') ? false : true;
				if(this.singleSearchFlt && occurence[j]) singleFltRowValid = true;
				if(this.popUpFilters) this.SetPopupFilterIcon(j, true);
				if(this.markActiveColumns){
					if(k == this.refRow){
						if(this.onBeforeActiveColumn) this.onBeforeActiveColumn.call(null, this, j);
						tf_AddClass(this.GetHeaderElement(j), this.activeColumnsCssClass);
						if(this.onAfterActiveColumn) this.onAfterActiveColumn.call(null, this, j);
					}
				}
			}//for j
			
			if(this.singleSearchFlt && singleFltRowValid) isRowValid = true;
			
			if(!isRowValid)
			{
				this.SetRowValidation(k,false);
				// always visible rows need to be counted as valid
				if(this.hasVisibleRows && this.visibleRows.tf_Has(k) && !this.paging)
					this.validRowsIndex.push(k);
				else
					hiddenrows++;
			} else {
				this.SetRowValidation(k,true);
				this.validRowsIndex.push(k);
				if(this.alternateBgs) this.SetRowBg(k,this.validRowsIndex.length);
				if(this.onRowValidated) this.onRowValidated.call(null,this,k);
			}
			
		}// for k
		
		this.nbVisibleRows = this.validRowsIndex.length;
		this.nbHiddenRows = hiddenrows;
		this.isStartBgAlternate = false;
		if(this.rememberGridValues) this.RememberFiltersValue(this.fltsValuesCookie);
		if(!this.paging) this.ApplyGridProps();//applies filter props after filtering process
		if(this.paging){ 
			this.startPagingRow = 0; 
			this.currentPageNb = 1;
			this.SetPagingInfo(this.validRowsIndex); 
		}//starts paging process
		//invokes eventual onafter function
		if(this.onAfterFilter) this.onAfterFilter.call(null,this);
	},
	
	ApplyGridProps: function()
	/*====================================================
		- checks methods that should be called
		after filtering and/or paging process
	=====================================================*/
	{
		if(this.activeFlt && this.activeFlt.nodeName.tf_LCase()==this.fltTypeSlc && !this.popUpFilters)
		{// blurs active filter (IE)
			this.activeFlt.blur(); 
			if(this.activeFlt.parentNode) this.activeFlt.parentNode.focus();
		}
		
		if(this.visibleRows) this.SetVisibleRows();//shows rows always visible
		if(this.colOperation) this.SetColOperation();//makes operation on a col
		if(this.refreshFilters) this.RefreshFiltersGrid();//re-populates drop-down filters
		var nr = (!this.paging && this.hasVisibleRows) 
					? (this.nbVisibleRows - this.visibleRows.length) : this.nbVisibleRows;
		if(this.rowsCounter) this.RefreshNbRows(nr);//refreshes rows counter
		
		if(this.inpWatermark != '') this.SetWatermark(true);
		if(this.popUpFilters) this.CloseAllPopupFilters();
	},
	
	GetColValues: function(colindex,num,exclude)
	/*====================================================
		- returns an array containing cell values of
		a column
		- needs following args:
			- column index (number)
			- a boolean set to true if we want only 
			numbers to be returned
			- array containing rows index to be excluded
			from returned values
	=====================================================*/
	{
		if(!this.fltGrid) return;
		var row = this.tbl.rows;
		var colValues = [];
	
		for(var i=this.refRow; i<this.nbRows; i++)//iterates rows
		{
			var isExludedRow = false;
			if(exclude!=undefined && tf_IsObj(exclude))
			{ // checks if current row index appears in exclude array
				isExludedRow = exclude.tf_Has(i); //boolean
			}
			var cell = row[i].cells;
			var nchilds = cell.length;
			
			if(nchilds == this.nbCells && !isExludedRow)
			{// checks if row has exact cell # and is not excluded
				for(var j=0; j<nchilds; j++)// this loop retrieves cell data
				{
					if(j==colindex && row[i].style.display=='')
					{
						var cell_data = this.GetCellData(j, cell[j]).tf_LCase();
						var nbFormat = this.colNbFormat ? this.colNbFormat[colindex] : null;
						(num) ? colValues.push(tf_RemoveNbFormat(cell_data,nbFormat)) 
								: colValues.push(cell_data);
					}//if j==k
				}//for j
			}//if nchilds == this.nbCells
		}//for i
		return colValues;	
	},
	
	GetFilterValue: function(index)
	/*====================================================
		- Returns value of a specified filter
		- Params:
			- index: filter column index (numeric value)
	=====================================================*/
	{
		if(!this.fltGrid) return;
		var fltValue;
		var flt = this.GetFilterElement(index);
		if(flt==null) return fltValue='';
		
		if(this['col'+index]!=this.fltTypeMulti && 
			this['col'+index]!=this.fltTypeCheckList)
			fltValue = flt.value;
		else if(this['col'+index] == this.fltTypeMulti)
		{//mutiple select
			fltValue = '';
			for(var j=0; j<flt.options.length; j++) 
				if(flt.options[j].selected)
					fltValue = fltValue.concat(
								flt.options[j].value+' ' +
								this.orOperator + ' '
								);
			//removes last operator ||
			fltValue = fltValue.substr(0,fltValue.length-4);
		}
		else if(this['col'+index]==this.fltTypeCheckList)
		{//checklist
			if(flt.getAttribute('value')!=null)
			{
				fltValue = flt.getAttribute('value');
				//removes last operator ||
				fltValue = fltValue.substr(0,fltValue.length-3);
			} else fltValue = '';
		}			
		return fltValue;
	},
	
	GetFiltersValue: function()
	/*====================================================
		- Returns the value of every single filter
	=====================================================*/
	{
		if(!this.fltGrid) return;
		var searchArgs = [];
		for(var i=0; i<this.fltIds.length; i++)
			searchArgs.push(
				this.GetFilterValue(i).tf_MatchCase(this.matchCase).tf_Trim()
			);
		return searchArgs;
	},
	
	GetFilterId: function(index)
	/*====================================================
		- Returns filter id of a specified column
		- Params:
			- index: column index (numeric value)
	=====================================================*/
	{
		if(!this.fltGrid) return;
		return this.fltIds[i];
	},
	
	GetFiltersByType: function(type,bool)
	/*====================================================
		- returns an array containing ids of filters of a 
		specified type (inputs or selects)
		- Note that hidden filters are also returned
		- Needs folllowing args:
			- filter type string ('input','select',
			'multiple')
			- optional boolean: if set true method
			returns column indexes otherwise filters ids
	=====================================================*/
	{
		if(!this.fltGrid) return;
		var arr = [];
		for(var i=0; i<this.fltIds.length; i++)
		{
			var fltType = this['col'+i];
			if(fltType == type.tf_LCase())
			{
				var a = (bool) ? i : this.fltIds[i];
				arr.push(a);
			}
		}
		return arr;
	},
	
	GetFilterElement: function(index)
	/*====================================================
		- returns filter DOM element for a given column
		index
	=====================================================*/
	{
		if(!this.fltGrid) return null;
		return tf_Id(this.fltIds[index]);
	},
	
	GetCellsNb: function(rowIndex)
	/*====================================================
		- returns number of cells in a row
		- if rowIndex param is passed returns number of 
		cells of specified row (number)
	=====================================================*/
	{
		var tr = (rowIndex == undefined) ? this.tbl.rows[0] : this.tbl.rows[rowIndex];
		return tr.cells.length;
	},
	
	GetRowsNb: function(includeHeaders)
	/*====================================================
		- returns total nb of filterable rows starting 
		from reference row if defined
		- Param:
			- includeHeaders: if true header rows are
			included in calculation(= table rows number)
	=====================================================*/
	{
		var s = this.refRow==undefined ? 0 : this.refRow;
		var ntrs = this.tbl.rows.length;
		if(includeHeaders){ s = 0; }
		return parseInt(ntrs-s);
	},
	
	GetCellData: function(i, cell)
	/*====================================================
		- returns text content of a given cell
		- Params:
			- i: index of the column (number)
			- cell: td DOM object
	=====================================================*/
	{
		if(i==undefined || cell==null) return "";
		//First checks for customCellData event
		if(this.customCellData && this.customCellDataCols.tf_Has(i))
			return this.customCellData.call(null,this,cell,i);
		else
			return tf_GetNodeText(cell);
	},
	
	GetRowDisplay: function(row)
	{
		if(!this.fltGrid && !tf_IsObj(row)) return;
		return row.style.display;
	},
	
	SetRowValidation: function(rowIndex,isValid)
	/*====================================================
		- Validates/unvalidates row by setting 'validRow' 
		attribute and shows/hides row
		- Params:
			- rowIndex: index of the row (number)
			- isValid: boolean
	=====================================================*/
	{
		var row = this.tbl.rows[rowIndex];
		if(!row || (typeof isValid).tf_LCase()!='boolean') return;
	
		// always visible rows are valid
		if(this.hasVisibleRows && this.visibleRows.tf_Has(rowIndex) && !this.paging)
			isValid = true;
		
		var displayFlag = (isValid) ? '' : 'none';
		var validFlag = (isValid) ? 'true' : 'false';		
		row.style.display = displayFlag;
		
		if(this.paging) 
			row.setAttribute('validRow',validFlag);
	},
	
	ValidateAllRows: function()
	/*====================================================
		- Validates all filterable rows
	=====================================================*/
	{
		if(!this.hasGrid) return;
		this.validRowsIndex = [];
		for(var k=this.refRow; k<this.nbFilterableRows; k++)
		{
			this.SetRowValidation(k,true);
			this.validRowsIndex.push(k);
		}
	},
	
	SetFilterValue: function(index,searcharg,doFilter)
	/*====================================================
		- Inserts value in a specified filter
		- Params:
			- index: filter column index (numeric value)
			- searcharg: search string
			- doFilter: optional boolean for multiple
			selects: executes filtering when multiple 
			select populated... IE only!
	=====================================================*/
	{
		if((!this.fltGrid && !this.isFirstLoad) || this.GetFilterElement(index)==null) return;
		var slc = this.GetFilterElement(index);
		var execFilter = (doFilter==undefined) ? true : doFilter;
		searcharg = (searcharg==undefined) ? '' : searcharg;
		
		if(this['col'+index]!=this.fltTypeMulti && 
			this['col'+index]!=this.fltTypeCheckList){
			slc.value = searcharg;
			if(this['col'+index]==this.fltTypeInp && this.inpWatermark!='')
				tf_RemoveClass(slc, this.inpWatermarkCssClass);
		}
			
		else if(this['col'+index] == this.fltTypeMulti)
		{//multiple selects
			var s = searcharg.split(' '+this.orOperator+' ');
			var ct = 0; //keywords counter
			for(var j=0; j<slc.options.length; j++) 
			{
				if(s=='') slc.options[j].selected = false;
				if(slc.options[j].value=='') slc.options[j].selected = false;
				if(slc.options[j].value!='' && s.tf_Has(slc.options[j].value,true))
				{
					if(tf_isIE)
					{// IE multiple selection work-around
						//when last value reached filtering can be executed
						var filter = (ct==(s.length-1) && execFilter) ? true : false;
						this.__deferMultipleSelection(slc,j,filter);
						ct++;
					}					
					else
						slc.options[j].selected = true;
				}//if
			}//for j
		}
		
		else if(this['col'+index]==this.fltTypeCheckList)
		{//checklist
			searcharg = searcharg.tf_MatchCase(this.matchCase);
			var s = searcharg.split(' '+this.orOperator+' ');
			var fltValue = slc.setAttribute('value','');
			var fltIndex = slc.setAttribute('indexes','');
			for(var k=0; k<tf_Tag(slc,'li').length; k++) 
			{
				var li = tf_Tag(slc,'li')[k];
				var lbl = tf_Tag(li,'label')[0];
				var chk = tf_Tag(li,'input')[0];
				var lblTxt = tf_GetNodeText(lbl).tf_MatchCase(this.matchCase);
				if(lblTxt!='' && s.tf_Has(lblTxt,true))
				{
					chk.checked = true;
					this.__setCheckListValues(chk);
				}
				else{ 
					chk.checked = false;
					this.__setCheckListValues(chk);
				}
			}
		}
	},

	SetColWidths: function(rowIndex)
	/*====================================================
		- sets coluun widths in pixels
	=====================================================*/
	{
		if(!this.fltGrid || !this.hasColWidth) return;
		var o = this, rIndex;
		if(rowIndex==undefined) rIndex = this.tbl.rows[0].style.display!='none' ? 0 : 1;
		else rIndex = rowIndex;
		setWidths(this.tbl.rows[rIndex]);

		function setWidths(row)
		{
			if(!o && (o.nbCells!=o.colWidth.length)) return;
			if(o.nbCells==row.cells.length)
				for(var k=0; k<o.nbCells; k++)
					row.cells[k].style.width = o.colWidth[k];
		}
	},
	
	SetVisibleRows: function()
	/*====================================================
		- makes a row always visible
		- Note this works only if paging is false
	=====================================================*/
	{
		if(this.hasGrid && this.hasVisibleRows && !this.paging)
		{
			for(var i=0; i<this.visibleRows.length; i++)
			{
				if(this.visibleRows[i]<=this.nbRows)//row index cannot be > nrows
					this.SetRowValidation(this.visibleRows[i],true);
			}//for i
		}//if hasGrid
	},
	
	ClearFilters: function()
	{ 
		this.EvtManager(this.Evt.name.clear); 
	},	
	_ClearFilters: function()
	/*====================================================
		- clears grid filters
	=====================================================*/
	{
		if(!this.fltGrid) return;
		if(this.onBeforeReset){ this.onBeforeReset.call(null, this, this.GetFiltersValue()); }
		for(var i=0; i<this.fltIds.length; i++)
			this.SetFilterValue(i,'');
		if(this.refreshFilters){
			this.activeFilterId = '';	
			this.RefreshFiltersGrid();
		}
		if(this.rememberPageLen){ tf_RemoveCookie(this.pgLenCookie); }
		if(this.rememberPageNb){ tf_RemoveCookie(this.pgNbCookie); }
		if(this.onAfterReset){ this.onAfterReset.call(null, this); }
	},
		
	ClearActiveColumns: function()
	/*====================================================
		- clears active columns header class name
	=====================================================*/
	{
		for(var i=0; i<this.fltIds.length; i++)
			tf_RemoveClass(this.GetHeaderElement(i), this.activeColumnsCssClass);
	},
	
	RefreshGrid: function(config)
	/*====================================================
		- Re-generates filters grid
	=====================================================*/
	{
		var configObj = !config ? this.fObj : config;
		var hasSort = this.sort;
		if(hasSort) this.sort = false; //sort property is set to false in order to avoid sort object re-instanciation
		this.nbRows = this.GetRowsNb(); //in case table is refreshed
		this.RemoveGrid();
		window['tf_'+this.id] = new TF(this.id, this.startRow, configObj);
		this.isFirstLoad = true;
		this.fltIds = [];
		this._AddGrid();
		if(hasSort){
			//New tbody content needs to be referenced in sortabletable script with setTBody() method
			//this.st =  SortableTable object
			this.st.setTBody(this.tbl.tBodies[0]); //Note this is a method of the Sortable Table 1.12 script (Erik Arvidsson)
			this.sort = true; //finally sort property is enabled again
		}
	},
	
	/*====================================================
		- Private methods
	=====================================================*/
	
	__resetGrid: function()
	/*====================================================
		- Only used by AddGrid() method
		- Resets filtering grid bar if previously removed
	=====================================================*/
	{
		if(this.isFirstLoad) return;
		
		// grid was removed, grid row element is stored in fltGridEl property
		if(!this.gridLayout){
			this.tbl.rows[this.filtersRowIndex].parentNode.insertBefore( 
				this.fltGridEl,
				this.tbl.rows[this.filtersRowIndex]
			);
		}
		
		if(this.isExternalFlt)
		{// filters are appended in external placeholders elements
			for(var ct=0; ct<this.externalFltTgtIds.length; ct++)
				if(tf_Id(this.externalFltTgtIds[ct])){
					tf_Id(this.externalFltTgtIds[ct]).appendChild(this.externalFltEls[ct]);
					
					//IE special treatment for gridLayout, appended filters are empty
					if(this.gridLayout && this.externalFltEls[ct].innerHTML=='' && this['col'+ct] != this.fltTypeInp){
						if(this['col'+ct] == this.fltTypeSlc || this['col'+ct] == this.fltTypeMulti) 
							this.PopulateSelect(ct);
						if(this['col'+ct] == this.fltTypeCheckList) this.PopulateCheckList(ct);
					}
				}
		}
				
		this.nbFilterableRows = this.GetRowsNb();
		this.nbVisibleRows = this.nbFilterableRows;
		this.nbRows = this.tbl.rows.length;
		if(this.isSortEnabled) this.sort = true;

		if(this.tbl.rows[this.filtersRowIndex].innerHTML=='')
			refreshFilters(this);
		else
			if(this.popUpFilters){ this.headersRow++; this.SetPopupFilters(); }
			
		/*** 	ie bug work-around, filters need to be re-generated
				since row is empty; insertBefore method doesn't seem to work properly 
				with previously generated DOM nodes modified by innerHTML 	***/
		function refreshFilters(o){
			o.tbl.deleteRow(o.filtersRowIndex);
			o.RemoveGrid();
			o.fltIds = [];
			o.isFirstLoad = true;
			if(o.popUpFilters) o.RemovePopupFilters();
			o._AddGrid();
		}
		
		if(!this.gridLayout) tf_AddClass(this.tbl, this.prfxTf);
		this.hasGrid = true;
	},
	
	__containsStr: function(arg,data,fltType,forceMatch)
	/*==============================================
		- Checks if data contains searched arg,
		returns a boolean
		- Params:
			- arg: searched string
			- data: data string
			- fltType: filter type (string, 
			exact match by default for selects - 
			optional)
			- forceMatch: boolean forcing exact
			match (optional)
	===============================================*/
	{
		// Improved by Cedric Wartel (cwl)
		// automatic exact match for selects and special characters are now filtered
		var regexp;
		var modifier = (this.matchCase) ? 'g' : 'gi';
		var exactMatch = (forceMatch==undefined) ? this.exactMatch : forceMatch;
		if(exactMatch || (fltType!=this.fltTypeInp && fltType!=undefined))//Váry Péter's patch
			regexp = new RegExp('(^\\s*)'+tf_RegexpEscape(arg)+'(\\s*$)', modifier);							
		else
			regexp = new RegExp(tf_RegexpEscape(arg), modifier);
		return regexp.test(data);
	},
	
	IncludeFile: function(fileId, filePath, callback, type)
	{
		var ftype = (type==undefined) ? 'script' : type;
		var isImported = tf_IsImported(filePath, ftype);
		if(isImported) return;
		var o = this, isLoaded = false, file;			
		var head = tf_Tag(document,'head')[0];
		
		if(ftype.tf_LCase() == 'link')
			file = tf_CreateElm(
						'link', ['id',fileId], ['type','text/css'],
						['rel','stylesheet'], ['href',filePath]
					);
		else
			file = tf_CreateElm(
						'script', ['id',fileId], 
						['type','text/javascript'], ['src',filePath]
					);
		
		file.onload = file.onreadystatechange = function()
		{//Browser <> IE onload event works only for scripts, not for stylesheets
			if(!isLoaded && 
				(!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) 
			{
				isLoaded = true;
				if(typeof callback === 'function')	callback.call(null,o);
			}
		}
		file.onerror = function(){ 
			throw new Error('TF script could not load:\n' + this.src);
		}
		head.appendChild(file);
	}
}

/* --- */

/*====================================================
	- General TF utility fns below
=====================================================*/

function tf_GetNodeText(n)
/*====================================================
	- returns text + text of child nodes of a node
=====================================================*/
{
	var s = n.textContent || n.innerText || n.innerHTML.replace(/\<[^<>]+>/g, '');
	return s.replace(/^\s+/, '').replace(/\s+$/, '').tf_Trim();
	//return s.tf_Trim();
}

function tf_IsObj(v)
/*====================================================
	- checks if var exists and is an object
	- returns a boolean
=====================================================*/
{
	var isO = false;
	if((typeof v).tf_LCase()=='string'){
		if(window[v] && (typeof window[v]).tf_LCase()=='object')
			isO = true;
	} else {
		if(v && (typeof v).tf_LCase()=='object')
			isO = true;
	}
	return isO;
}

function tf_IsFn(fn)
/*====================================================
	- checks if passed param is a function
	- returns a boolean
=====================================================*/
{
	return (fn && fn.constructor == Function);
}

function tf_IsArray(obj){
/*====================================================
	- checks if passed param is an array
	- returns a boolean
=====================================================*/
	return obj.constructor == Array;
}

function tf_Id(id)
/*====================================================
	- this is just a getElementById shortcut
=====================================================*/
{
	return document.getElementById(id);
}

function tf_Tag(o,tagname)
/*====================================================
	- this is just a getElementsByTagName shortcut
=====================================================*/
{
	return o.getElementsByTagName(tagname);
}

function tf_RegexpEscape(s)
/*====================================================
	- escapes special characters [\^$.|?*+() 
	for regexp
	- Many thanks to Cedric Wartel for this fn
=====================================================*/
{
	// traite les caractères spéciaux [\^$.|?*+()
	//remplace le carctère c par \c
	function escape(e)
	{
		a = new RegExp('\\'+e,'g');
		s = s.replace(a,'\\'+e);
	}

	chars = new Array('\\','[','^','$','.','|','?','*','+','(',')');
	//for(e in chars) escape(chars[e]); // compatibility issue with prototype
	for(var e=0; e<chars.length; e++) escape(chars[e]);
	return s;
}

function tf_CreateElm(tag)
/*====================================================
	- creates an html element with its attributes
	- accepts the following params:
		- a string defining the html tag
		to create
		- an undetermined # of arrays containing the
		couple 'attribute name','value' ['id','myId']
=====================================================*/
{
	if(tag==undefined || tag==null || tag=='') return;
	var el = document.createElement(tag);		
	if(arguments.length>1)
	{
		for(var i=0; i<arguments.length; i++)
		{
			var argtype = typeof arguments[i];
			switch(argtype.tf_LCase())
			{
				case 'object':
					if(arguments[i].length==2)
					{						
						el.setAttribute(arguments[i][0],arguments[i][1]);
					}//if array length==2
				break;
			}//switch
		}//for i
	}//if args
	return el;	
}

function tf_CreateText(node)
/*====================================================
	- this is just a document.createTextNode shortcut
=====================================================*/
{
	return document.createTextNode(node);
}

function tf_AddEvent(obj,event_name,func_name,use_capture){
	if(obj.attachEvent)
		obj.attachEvent('on'+event_name, func_name);
	else if(obj.addEventListener)
		obj.addEventListener(event_name,func_name,(use_capture==undefined ? false : use_capture));
	else
		obj['on'+event_name] = func_name;
}

function tf_RemoveEvent(obj,event_name,func_name,use_capture){
	if(obj.detachEvent)
		obj.detachEvent('on'+event_name,func_name);
	else if(obj.removeEventListener)
		obj.removeEventListener(event_name,func_name,(use_capture==undefined ? false : use_capture));
	else
		obj['on'+event_name] = null;
}

function tf_StopEvent(e){
	if(!e) e = window.event;
	if(e.stopPropagation) {
		e.stopPropagation();
	} else {
		e.cancelBubble = true;
	}
}

function tf_CancelEvent(e){
	if(!e) e = window.event;
	if(e.preventDefault) {
		e.preventDefault();
	} else {
		e.returnValue = false;
	}
}

function tf_ObjPosition(obj, tag){
	var l = 0, t = 0;
	if (obj && obj.offsetParent && tag.tf_Has(obj.nodeName.tf_LCase())) {
		do {
			  l += obj.offsetLeft;
			  t += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return [l,t];
}

function tf_NumSortAsc(a, b){ return (a-b); }

function tf_NumSortDesc(a, b){ return (b-a); }

function tf_IgnoreCaseSort(a, b){
	var x = a.tf_LCase();
	var y = b.tf_LCase();
	return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

String.prototype.tf_MatchCase = function (mc){
	if(!mc) return this.tf_LCase();
	else return this.toString();
}

String.prototype.tf_Trim = function()
{//optimised by Anthony Maes
	return this.replace(/(^[\s\xA0]*)|([\s\xA0]*$)/g,'');
}

String.prototype.tf_LCase = function(){
	return this.toLowerCase();
}

String.prototype.tf_UCase = function(){
	return this.toUpperCase();
}

Array.prototype.tf_Has = function(s,mc){
	//return this.indexOf(s) >= 0;
	var sCase = (mc==undefined) ? false : mc;
	for (i=0; i<this.length; i++)
		if(this[i].toString().tf_MatchCase(sCase)==s) return true;
	return false;
}

Array.prototype.tf_IndexByValue = function(s,mc){
	var sCase = (mc==undefined) ? false : mc;
	for (i=0; i<this.length; i++)
		if(this[i].toString().tf_MatchCase(sCase)==s) return i;
	return (-1);
}

// Is this IE 6? the ultimate browser sniffer ;-)
//window['tf_isIE'] = (window.innerHeight) ? false : true;
window['tf_isIE'] = (window.innerHeight) ? false : /msie|MSIE 6/.test(navigator.userAgent) ? true : false;
window['tf_isIE7'] = (window.innerHeight) ? false : /msie|MSIE 7/.test(navigator.userAgent) ? true : false;

function tf_HasClass(elm,cl){
	if(!elm) return false;
	return elm.className.match(new RegExp('(\\s|^)'+cl+'(\\s|$)'));
}

function tf_AddClass(elm,cl){
	if(!elm) return;
	if(!tf_HasClass(elm,cl))
		elm.className += ' '+cl;
}

function tf_RemoveClass(elm,cl){
	if(!elm) return;
	if(!tf_HasClass(elm,cl)) return;
	var reg = new RegExp('(\\s|^)'+cl+'(\\s|$)');
	elm.className = elm.className.replace(reg,'');
}

function tf_IsValidDate(dateStr, format){
	if(format == null) { format = 'DMY'; }
	format = format.toUpperCase();
	if(format.length != 3) { 
		if(format=='DDMMMYYYY'){
			var d = tf_FormatDate(dateStr, format);
			dateStr = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
			format = 'DMY';
		}
	}
	if((format.indexOf('M') == -1) || (format.indexOf('D') == -1) ||
		(format.indexOf('Y') == -1)) { format = 'DMY'; }
	if(format.substring(0, 1) == 'Y') { // If the year is first
		  var reg1 = /^\d{2}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
		  var reg2 = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
	} else if(format.substring(1, 2) == 'Y') { // If the year is second
		  var reg1 = /^\d{1,2}(\-|\/|\.)\d{2}\1\d{1,2}$/;
		  var reg2 = /^\d{1,2}(\-|\/|\.)\d{4}\1\d{1,2}$/;
	} else { // The year must be third
		  var reg1 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{2}$/;
		  var reg2 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/;
	}
	// If it doesn't conform to the right format (with either a 2 digit year or 4 digit year), fail
	if((reg1.test(dateStr) == false) && (reg2.test(dateStr) == false)) { return false; }
	var parts = dateStr.split(RegExp.$1); // Split into 3 parts based on what the divider was
	// Check to see if the 3 parts end up making a valid date
	if(format.substring(0, 1) == 'M') { var mm = parts[0]; } else
		if(format.substring(1, 2) == 'M') { var mm = parts[1]; } else { var mm = parts[2]; }
	if(format.substring(0, 1) == 'D') { var dd = parts[0]; } else
		if(format.substring(1, 2) == 'D') { var dd = parts[1]; } else { var dd = parts[2]; }
	if(format.substring(0, 1) == 'Y') { var yy = parts[0]; } else
		if(format.substring(1, 2) == 'Y') { var yy = parts[1]; } else { var yy = parts[2]; }
	if(parseFloat(yy) <= 50) { yy = (parseFloat(yy) + 2000).toString(); }
	if(parseFloat(yy) <= 99) { yy = (parseFloat(yy) + 1900).toString(); }
	var dt = new Date(parseFloat(yy), parseFloat(mm)-1, parseFloat(dd), 0, 0, 0, 0);
	if(parseFloat(dd) != dt.getDate()) { return false; }
	if(parseFloat(mm)-1 != dt.getMonth()) { return false; }
	return true;
}

function tf_FormatDate(dateStr, format){
	if(format === null){ format = 'DMY'; }
	if(!dateStr || dateStr === ''){ return new Date(1001, 0, 1); }
	var oDate, parts;
	
	function y2kDate(yr){
		if(yr == undefined) return 0;
		if(yr.length>2) return yr;
		var y;
		if(yr <= 99 && yr>50) //>50 belong to 1900
			y = '19' + yr;
		if(yr<50 || yr =='00') //<50 belong to 2000
			y = '20' + yr;
		return y;
	}
	
	function mmm2mm(mmm){
		if(mmm == undefined){ return 0; }
		var mondigit;
		var MONTH_NAMES = new Array(
			'january','february','march','april','may','june','july','august','september','october','november','december',
			'jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'
		);
		for (var m_i=0; m_i < MONTH_NAMES.length; m_i++){
				var month_name = MONTH_NAMES[m_i];
				if (mmm.toLowerCase() === month_name){
					mondigit = m_i+1;
					break;
				}
		}
	 	if ((mondigit > 11) || (mondigit < 23)){ mondigit = mondigit - 12; }
	 	if ((mondigit < 1) || (mondigit > 12)){ return 0; }
		return mondigit;
	}
	
	switch(format.toUpperCase()){
		case 'DDMMMYYYY':
			parts = dateStr.replace(/[- \/.]/g,' ').split(' ');
			oDate = new Date(y2kDate(parts[2]),mmm2mm(parts[1])-1,parts[0]);
		break;
		case 'DMY':
			parts = dateStr.replace(/^(0?[1-9]|[12][0-9]|3[01])([- \/.])(0?[1-9]|1[012])([- \/.])((\d\d)?\d\d)$/,'$1 $3 $5').split(' ');
			oDate = new Date(y2kDate(parts[2]),parts[1]-1,parts[0]);
		break;
		case 'MDY':
			parts = dateStr.replace(/^(0?[1-9]|1[012])([- \/.])(0?[1-9]|[12][0-9]|3[01])([- \/.])((\d\d)?\d\d)$/,'$1 $3 $5').split(' ');
			oDate = new Date(y2kDate(parts[2]),parts[0]-1,parts[1]);
		break;
		case 'YMD':
			parts = dateStr.replace(/^((\d\d)?\d\d)([- \/.])(0?[1-9]|1[012])([- \/.])(0?[1-9]|[12][0-9]|3[01])$/,'$1 $4 $6').split(' ');
			oDate = new Date(y2kDate(parts[0]),parts[1]-1,parts[2]);
		break;
		default: //in case format is not correct
			parts = dateStr.replace(/^(0?[1-9]|[12][0-9]|3[01])([- \/.])(0?[1-9]|1[012])([- \/.])((\d\d)?\d\d)$/,'$1 $3 $5').split(' ');
			oDate = new Date(y2kDate(parts[2]),parts[1]-1,parts[0]);
		break;
	}
	return oDate;
}

function tf_RemoveNbFormat(data,format){
	if(data==null) return;
	if(format==null) format = 'us';
	var n = data;
	if(format.tf_LCase()=='us')
		n =+ n.replace(/[^\d\.-]/g,'');
	else
		n =+ n.replace(/[^\d\,-]/g,'').replace(',','.');
	return n;
}

function tf_IsImported(filePath,type){
	var isImported = false; 
	var importType = (type==undefined) ? 'script' : type;
	var attr = importType == 'script' ? 'src' : 'href';
	var files = tf_Tag(document,importType);
	for (var i=0; i<files.length; i++)
	{
		if(files[i][attr] == undefined) continue;
		if(files[i][attr].match(filePath))
		{
			isImported = true;	
			break;
		}
	}
	return isImported;
}

function tf_IsStylesheetImported(stylesheet){
	var isImported = false;
	if(!document.styleSheets) return isImported;
	var s = document.styleSheets;
	var regexp = new RegExp(stylesheet);
	for(var i=0; i<s.length; i++){
		if(s[i].imports){ //IE
			var imp = s[i].imports;
			for(var j=0; j<imp.length; j++){
				if(imp[j].href.tf_LCase() == stylesheet.tf_LCase()){
					isImported = true; break;
				}
			}
		} else {
			var r =  (s[i].cssRules ? s[i].cssRules : s[i].rules);
			for(var j=0; j<r.length; j++){
				if(regexp.test(r[j].cssText)){ 
					isImported = true; break;
				}
			}
		}
	}
	return isImported;
}

function tf_WriteCookie(name, value, hours){
	var expire = '';
	if(hours != null)
	{
		expire = new Date((new Date()).getTime() + hours * 3600000);
		expire = '; expires=' + expire.toGMTString();
	}
	document.cookie = name + '=' + escape(value) + expire;
}

function tf_ReadCookie(name){
	var cookieValue = '';
	var search = name + '=';
	if(document.cookie.length > 0)
	{ 
		offset = document.cookie.indexOf(search);
		if(offset != -1)
		{ 
			offset += search.length;
			end = document.cookie.indexOf(';', offset);
			if(end == -1) end = document.cookie.length;
			cookieValue = unescape(document.cookie.substring(offset, end))
		}
	}
	return cookieValue;
}

function tf_CookieValueArray(name, separator){
	if(separator==undefined) separator = ',';
	var val = tf_ReadCookie(name); //reads the cookie 
	var arr = val.split(separator); //creates an array with filters' values
	return arr;
}

function tf_CookieValueByIndex(name, index, separator){
	if(separator==undefined) separator = ',';
	var val = tf_CookieValueArray(name, separator); //reads the cookie
	return val[index];
}

function tf_RemoveCookie(name){
	tf_WriteCookie(name,'',-1);
}

//Firefox does not support outerHTML property
function tf_SetOuterHtml(){
	if(document.body.__defineGetter__) {
		if(HTMLElement) {
			var element = HTMLElement.prototype;
			if(element.__defineGetter__) {
				element.__defineGetter__("outerHTML",
					function(){
						var parent = this.parentNode;
						var el = tf_CreateElm(parent.tagName);
						el.appendChild(this);
						var shtml = el.innerHTML;
						parent.appendChild(this);
						return shtml;
					}
				);
			}
		}
	}
	
	if(element.__defineSetter__) {
		HTMLElement.prototype.__defineSetter__("outerHTML", function(sHTML) {
		   var r = this.ownerDocument.createRange();
		   r.setStartBefore(this);
		   var df = r.createContextualFragment(sHTML);
		   this.parentNode.replaceChild(df, this);	
		   return sHTML;
		});
	}
}
/* --- */

function setFilterGrid(id)
/*====================================================
	- Sets filters grid bar
	- Calls TF Constructor and generates grid bar
	- Params:
			- id: table id (string)
			- refRow (optional): row index (number)
			- config (optional): configuration 
			object (literal object)
	- Returns TF object
=====================================================*/
{
	if(arguments.length === 0){ return; }
	window['tf_'+id] = new TF(arguments[0], arguments[1], arguments[2]);
	window['tf_'+id].AddGrid();
	return window['tf_'+id];
}

/*===BEGIN removable section===========================
	- Unobtrusive grid bar generation using 
	'filterable' class
	- If you don't use it you can remove safely this 
	section
/*=====================================================*/
window['tf_isNotIE'] = !(/msie|MSIE/.test(navigator.userAgent));
tf_AddEvent(window, (tf_isNotIE || (typeof window.addEventListener == 'function') ? 'DOMContentLoaded' : 'load'), initFilterGrid);

function initFilterGrid(){
	if(!document.getElementsByTagName){ return; }
	var tbls = tf_Tag(document,'table'), config;
	for (var i=0; i<tbls.length; i++){
		var cTbl = tbls[i], cTblId = cTbl.getAttribute('id');
		if(tf_HasClass(cTbl,'filterable') && cTblId){
			if(tf_IsObj(cTblId+'_config')){
				config = window[cTblId+'_config'];
			} else { config = undefined; }
			window[cTblId+'_isUnob'] = true;
			setFilterGrid(cTblId,config);
		}
	}// for i
}
/*===END removable section===========================*/

/*====================================================
	- Backward compatibility fns
=====================================================*/
function grabEBI(id){ return tf_Id(id); }
function grabTag(obj,tagname){ return tf_Tag(obj,tagname); }
function tf_GetCellText(n){ return tf_GetNodeText(n); }
function tf_isObject(varname){ return tf_IsObj(varname); }
function tf_isObj(v){ return tf_IsObj(v); }
function tf_isFn(fn){ return tf_IsFn(fn); }
function tf_isArray(obj){ return tf_IsArray(obj); }
function tf_addEvent(obj,event_name,func_name){ return tf_AddEvent(obj,event_name,func_name); }
function tf_removeEvent(obj,event_name,func_name){ return tf_RemoveEvent(obj,event_name,func_name); }
function tf_addClass(elm,cl){ tf_AddClass(elm,cl); }
function tf_removeClass(elm,cl){ return tf_RemoveClass(elm,cl); }
function tf_hasClass(elm,cl){ return tf_HasClass(elm,cl); }
function tf_isValidDate(dateStr,format){ return tf_IsValidDate(dateStr,format); }
function tf_formatDate(dateStr,format){ return tf_FormatDate(dateStr,format); }
function tf_removeNbFormat(data,format){ return tf_RemoveNbFormat(data,format); }
/* --- */
