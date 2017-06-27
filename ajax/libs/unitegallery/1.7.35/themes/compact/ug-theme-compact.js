
if(typeof g_ugFunctions != "undefined")
	g_ugFunctions.registerTheme("compact");
else 
	jQuery(document).ready(function(){g_ugFunctions.registerTheme("compact")});


/**
 * Grid gallery theme
 */
function UGTheme_compact(){

	var t = this;
	var g_gallery = new UniteGalleryMain(), g_objGallery, g_objects, g_objWrapper; 
	var g_objSlider;
	var g_functions = new UGFunctions();
	var g_objPanel = new UGStripPanel();
	
	//theme options
	var g_options = {
			theme_load_slider:true,					//true, false - load the slider
			theme_load_panel:true,					//true, false - load the thumbs grid panel
			theme_panel_position: "bottom",			//top, bottom, left, right - thumbs panel position
			theme_hide_panel_under_width: 480		//hide panel under certain browser width, if null, don't hide
	};
	
	//global defaults
	var g_defaults = {
			slider_controls_always_on:true,
			slider_enable_text_panel:false,
			slider_vertical_scroll_ondrag: true,
			strippanel_enable_buttons:false			
	};
	
	
	//special defaults for left side panel position
	var g_defaults_left = {
		slider_enable_text_panel:true,
		slider_zoompanel_align_hor: "right",
		slider_fullscreen_button_align_hor: "right",
		slider_play_button_align_hor: "right",
		slider_zoompanel_offset_vert: 9,
		slider_zoompanel_offset_hor: 11,
		slider_play_button_offset_hor: 88,
		slider_play_button_offset_vert: 8,
		slider_fullscreen_button_offset_hor: 52,
		slider_fullscreen_button_offset_vert: 9,
		slider_progress_indicator_align_hor: "right",
		slider_progress_indicator_offset_vert: 36,	
		slider_progress_indicator_offset_hor: 63			
	}
	
	//special defaults for right side panel position
	var g_defaults_right = {
		slider_enable_text_panel:true,
		slider_zoompanel_offset_vert: 9,
		slider_zoompanel_offset_hor: 11,
		slider_play_button_offset_hor: 88,
		slider_play_button_offset_vert: 8,
		slider_fullscreen_button_offset_hor: 52,
		slider_fullscreen_button_offset_vert: 9,
		
		slider_progress_indicator_align_hor: "left",
		slider_progress_indicator_offset_vert: 36,	
		slider_progress_indicator_offset_hor: 63	
		
	}
	
	//special defaults for bottom panel position
	var g_defaults_bottom = {
		
		slider_zoompanel_align_hor: "right",
		slider_zoompanel_offset_vert: 10,
		
		slider_progress_indicator_align_hor: "left",
		slider_progress_indicator_offset_vert: 36,	
		slider_progress_indicator_offset_hor: 16	
	}
	
	//special defaults for top panel position
	var g_defaults_top = {
		slider_zoompanel_align_vert: "bottom",
		slider_zoompanel_offset_vert: 10,
		
		slider_play_button_align_hor: "right",
		slider_play_button_align_vert: "bottom",
		
		slider_fullscreen_button_align_vert: "bottom",	
		slider_fullscreen_button_align_hor: "right",
		
		slider_progress_indicator_align_vert: "bottom",
		slider_progress_indicator_offset_vert: 40
	}
	
	
	//temp variables
	var g_temp = {
		isVertical: false,
		isMobileModeWasEnabled: false
	};
	
	
	/**
	 * Init the theme
	 */
	function initTheme(gallery, customOptions){
		
		g_gallery = gallery;
		
		g_options = jQuery.extend(g_options, customOptions);
				
		modifyOptions(customOptions);
		
		//set gallery options
		g_gallery.setOptions(g_options);
				
		//include gallery elements
		if(g_options.theme_load_panel == true){
			g_objPanel.init(gallery, g_options);
			g_objPanel.setOrientation(g_options.theme_panel_position);
			
		}else
			g_objPanel = null;
		
		if(g_options.theme_load_slider == true)
			g_gallery.initSlider(g_options);
		
		g_objects = gallery.getObjects();
		
		//get some objects for local use
		g_objGallery = jQuery(gallery);		
		g_objWrapper = g_objects.g_objWrapper;
		
		if(g_options.theme_load_slider == true)
			g_objSlider = g_objects.g_objSlider;
		
	}
	
	
	/**
	 * modify options
	 */
	function modifyOptions(customOptions){
				
		g_options = jQuery.extend(g_options, g_defaults);
		
		if(g_options.theme_load_panel == true){
			
			switch(g_options.theme_panel_position){
				case "left":
				case "right":
					g_temp.isVertical = true;
					g_options.strippanel_vertical_type = true;
				break;
			}
		}
		
		
		switch(g_options.theme_panel_position){
			case "left":
				g_options = jQuery.extend(g_options, g_defaults_left);				
			break;
			case "right":
				g_options = jQuery.extend(g_options, g_defaults_right);				
			break;
			case "top":
				g_options = jQuery.extend(g_options, g_defaults_top);
			break;
			case "bottom":
				g_options = jQuery.extend(g_options, g_defaults_bottom);
			break;
		}
		
		g_options = jQuery.extend(g_options, customOptions);
		
	}
	
	
	/**
	 * init all the theme's elements and set them to their places 
	 * according gallery's dimentions.
	 * this function should work on resize too.
	 */
	function initAndPlaceElements(){
		
		//place objects:
		if(g_objPanel){
			initThumbsPanel();
			placeThumbsPanel();
		}
		
		if(g_objSlider){
			g_objSlider.run();
			placeSlider();
		}
		
	}
	
	
	/**
	 * run the theme
	 */
	function runTheme(){
		
		setHtml();
		
		initAndPlaceElements();
		
		initEvents();
	}
	
	
	/**
	 * set gallery html elements
	 */
	function setHtml(){
		
		//add html elements
		g_objWrapper.addClass("ug-theme-grid");
		
		//set panel html
		if(g_objPanel)
			g_objPanel.setHtml();
			
		//set slider html
		if(g_objSlider)
			g_objSlider.setHtml();
		
	}
	
	
	/**
	 * init size of the thumbs panel
	 */
	function initThumbsPanel(){
		
		//set size:
		var objGallerySize = g_gallery.getSize();
			
		if(g_temp.isVertical == false)			
			g_objPanel.setWidth(objGallerySize.width);
		else
			g_objPanel.setHeight(objGallerySize.height);
		
		g_objPanel.run();
	}
	
	
	
	/**
	 * place thumbs panel according the settings
	 */
	function placeThumbsPanel(){
		
		var isNeedToHide = isPanelNeedToHide();
		var isHidden = g_objPanel.isPanelClosed();		
		
		var objPanelElement = g_objPanel.getElement();
		var posVert = "bottom";
		var posHor = "left";
		
		var showClosed = (isNeedToHide || isHidden);
			
		if(showClosed){
			var hiddenDest = g_objPanel.getClosedPanelDest();
			var originalPos =  g_functions.getElementRelativePos(objPanelElement, g_options.theme_panel_position);
			g_objPanel.setClosedState(originalPos);
		}else{
			g_objPanel.setOpenedState();
		}
		
		switch(g_options.theme_panel_position){
			case "right":
			case "left":
				posHor = g_options.theme_panel_position;
				if(showClosed)
					posHor = hiddenDest;
				
			break;		
			case "top":
			case "bottom":				
				posVert = g_options.theme_panel_position;
				if(showClosed)
					posVert = hiddenDest;
			break;
			default:
				throw new Error("Wrong panel position: " + g_options.theme_panel_position);
			break;
		}
		
		g_functions.placeElement(objPanelElement, posHor, posVert, 0, 0);
	} 
	
	
	
	/**
	 * place the slider according the thumbs panel size and position
	 */
	function placeSlider(){
		
		//g_objPanel
		var gallerySize = g_functions.getElementSize(g_objWrapper);
		
		var sliderWidth = gallerySize.width;
		var sliderHeight = gallerySize.height;
		var sliderTop = 0;
		var sliderLeft = 0;
		
		if(g_objPanel){
			
			var panelSize = g_objPanel.getSize();
			
			switch(g_options.theme_panel_position){
				case "left":
					sliderLeft = panelSize.right;
					sliderWidth = gallerySize.width - panelSize.right;	
				break;
				case "right":
					sliderWidth = panelSize.left;					
				break;
				case "top":
					sliderHeight = gallerySize.height - panelSize.bottom;
					sliderTop = panelSize.bottom;
				break;
				case "bottom":
					sliderHeight = panelSize.top;
				break;
			}
			
		}
		
		g_objSlider.setSize(sliderWidth, sliderHeight);
		g_objSlider.setPosition(sliderLeft, sliderTop);
	}

	/**
	 * check if need to hide the panel according the options.
	 */
	function isPanelNeedToHide(){
		
		if(!g_options.theme_hide_panel_under_width)
			return(false);
		
		var windowWidth = jQuery(window).width();
		var hidePanelValue = g_options.theme_hide_panel_under_width;
		
		if(windowWidth <= hidePanelValue)
			return(true);
			
		return(false);
	}

	
	/**
	 * check if need to hide or show panel according the theme_hide_panel_under_width option
	 */
	function checkHidePanel(){
		
		//check hide panel:
		if(!g_options.theme_hide_panel_under_width)
			return(false);
		
			var needToHide = isPanelNeedToHide();
			
			if(needToHide == true){
				g_objPanel.closePanel(true);
				g_temp.isMobileModeWasEnabled = true;
			}
			else{
				if(g_temp.isMobileModeWasEnabled == true){
					g_objPanel.openPanel(true);
					g_temp.isMobileModeWasEnabled = false;
				}
			}
	}
	
	
	/**
	 * on gallery size change - resize the theme.
	 */
	function onSizeChange(){
		
		initAndPlaceElements();
				
		if(g_objPanel)
			checkHidePanel();
		
	}
	
	
	/**
	 * on panel move event
	 */
	function onPanelMove(){
		
		placeSlider();
	}

	
	/**
	 * before items request: hide items, show preloader
	 */
	function onBeforeReqestItems(){
	
		g_gallery.showDisabledOverlay();
	
	}
		
	
	/**
	 * init buttons functionality and events
	 */
	function initEvents(){
						
		g_objGallery.on(g_gallery.events.SIZE_CHANGE,onSizeChange);
		g_objGallery.on(g_gallery.events.GALLERY_BEFORE_REQUEST_ITEMS, onBeforeReqestItems);
		
		if(g_objPanel){
			jQuery(g_objPanel).on(g_objPanel.events.FINISH_MOVE, onPanelMove);
		}
		
	}
	
	
	/**
	 * destroy the theme
	 */
	this.destroy = function(){
		
		g_objGallery.off(g_gallery.events.SIZE_CHANGE);
		g_objGallery.off(g_gallery.events.GALLERY_BEFORE_REQUEST_ITEMS);
		
		if(g_objPanel)
			jQuery(g_objPanel).off(g_objPanel.events.FINISH_MOVE);
		
		g_objPanel.destroy();
		g_objSlider.destroy();
		
	}
	
	
	/**
	 * run the theme setting
	 */
	this.run = function(){
		
		runTheme();
	}
	
	
	/**
	 * init 
	 */
	this.init = function(gallery, customOptions){
				
		initTheme(gallery, customOptions);
	}
	
	
}

