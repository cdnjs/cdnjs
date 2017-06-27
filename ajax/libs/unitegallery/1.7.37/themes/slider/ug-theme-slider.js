
if(typeof g_ugFunctions != "undefined")
	g_ugFunctions.registerTheme("slider");
else 
	jQuery(document).ready(function(){g_ugFunctions.registerTheme("slider")});


/**
 * Slider gallery theme
 */
function UGTheme_slider(){

	var t = this;
	var g_gallery = new UniteGalleryMain(), g_objGallery, g_objects, g_objWrapper; 
	var g_objThumbs, g_objSlider; 
	var g_functions = new UGFunctions();
	
	
	//theme options
	var g_options = {
		
	};
	
	
	var g_defaults = {
		gallery_autoplay: true,
		
		slider_scale_mode:"fill",
		slider_controls_always_on:true,
		slider_enable_text_panel:false,
		slider_controls_appear_ontap: true,			//appear controls on tap event on touch devices			
		slider_enable_bullets: true,
		slider_enable_arrows: true,
		slider_enable_play_button: false,
		slider_enable_fullscreen_button:false,
		slider_enable_zoom_panel: false,
		slider_vertical_scroll_ondrag: true
	};
	
	
	/**
	 * init 
	 */
	this.init = function(gallery, customOptions){
		
		g_gallery = gallery;
		
		g_options = jQuery.extend(g_options, g_defaults);
		g_options = jQuery.extend(g_options, customOptions);
		
		//set gallery options
		g_gallery.setOptions(g_options);
		
		g_gallery.initSlider(g_options);
		
		g_objects = gallery.getObjects();
		
		//get some objects for local use
		g_objGallery = jQuery(gallery);		
		g_objWrapper = g_objects.g_objWrapper;
		g_objSlider = g_objects.g_objSlider;
	}

	
	/**
	 * set gallery html elements
	 */
	function setHtml(){
		
		//add html elements
		g_objWrapper.addClass("ug-theme-slider");
		
		//set slider html
		if(g_objSlider)
			g_objSlider.setHtml();
	}
	
	
	/**
	 * place the slider according the thumbs panel size and position
	 */
	function placeSlider(){
		
		 var sliderHeight = g_gallery.getHeight();
		 var sliderWidth = g_gallery.getWidth();
		 
		 g_objSlider.setSize(sliderWidth, sliderHeight);
		 g_objSlider.setPosition(0, 0);		
	}
	

	
	/**
	 * on gallery size change - resize the theme.
	 */
	function onSizeChange(){
			
		placeSlider();
				
	}
	
	
	/**
	 * init buttons functionality and events
	 */
	function initEvents(){
						
		g_objGallery.on(g_gallery.events.SIZE_CHANGE,onSizeChange);
		//g_objGallery.on(g_gallery.events.ITEM_CHANGE,onItemChange);
	}

	/**
	 * init all the theme's elements and set them to their places 
	 * according gallery's dimentions.
	 * this function should work on resize too.
	 */
	function initAndPlaceElements(){
		placeSlider();
		g_objSlider.run();
		
	}
	
	/**
	 * run the theme setting
	 */
	this.run = function(){
		
		setHtml();
			
		initAndPlaceElements();
		
		initEvents();
	}

	
}
