
if(typeof g_ugFunctions != "undefined")
	g_ugFunctions.registerTheme("video");
else 
	jQuery(document).ready(function(){g_ugFunctions.registerTheme("video")});


/**
 * Video gallery theme
 * themes: right-thumb | right-title-only | right-no-thumb | bottom-text
 */
function UGTheme_video(){

	var t = this;
	var g_gallery = new UniteGalleryMain(), g_objGallery, g_objects, g_objWrapper; 
	var g_objPlayer = new UGVideoPlayer(), g_objButtonsPanel, g_buttonPrev, g_buttonNext;
	var g_functions = new UGFunctions();
	var g_objPanel = new UGStripPanel();
	

	//theme options
	var g_options = {
			theme_skin: "right-thumb",			//right-thumb | right-title-only | right-no-thumb | bottom-thumb
			theme_autoplay: false,				//autoplay videos at start.  true / false. Don't working on mobiles.
			theme_next_video_onend:false, 		//go to next video automatically when the video ends
			theme_disable_panel_timeout: 2500	//How much time the right panel will be disabled. in ms
	};
	
	//global defaults
	var g_defaults = {
			gallery_width:1100,
			slider_controls_always_on:true,
			strippanel_enable_handle:false,
			strippanel_enable_buttons: false,
			strip_space_between_thumbs: 0,
			strippanel_padding_top: 0,
			strippanel_padding_bottom: 0,
			strippanel_padding_left: 0,
			strippanel_padding_right: 0,
			strippanel_vertical_type:true
	};
		
	
	//temp variables
	var g_temp = {
			panel_position:"right",
			isVertical: true,
			putButtonsPanel: false,
			isFirstChange: true,
			playerRatio:null,
	};
	
	
	/**
	 * Init the theme
	 */
	function initTheme(gallery, customOptions){
		
		g_gallery = gallery;
		
		g_options = jQuery.extend(g_options, g_defaults);
		
		g_options = jQuery.extend(g_options, customOptions);
		g_options.strippanel_vertical_type = true;
		
		modifyOptions();
		
		//set gallery options
		g_gallery.setOptions(g_options);
		if(g_temp.isVertical == false)
			g_gallery.setFuncCustomHeight(getHeightByWidthOnResize);
		
		//set panel options		
		g_objPanel.init(gallery, g_options);			
		g_objPanel.setOrientation(g_temp.panel_position);
		
		g_objPanel.setCustomThumbs(setHtmlThumb);
		
		g_objPanel.setDisabledAtStart(g_options.theme_disable_panel_timeout);
		
		var galleryID = g_gallery.getGalleryID();
				
		//set player options
		g_objPlayer.init(g_options, true, galleryID);
		
		g_objects = gallery.getObjects();		
		g_objGallery = jQuery(gallery);
		g_objWrapper = g_objects.g_objWrapper;
		
	}
	
	
	/**
	 * modify options
	 */
	function modifyOptions(){
		
		switch(g_options.theme_skin){
			case "right-no-thumb":
			case "right-title-only":
				g_temp.putButtonsPanel = true;
			break;
			case "bottom-text":
				g_temp.panel_position = "bottom";				
			break;
		}
		
		//set isVertical
		switch(g_temp.panel_position){
			case "top":
			case "bottom":
				g_temp.isVertical = false;
				g_options.strippanel_vertical_type = false;
			break;
		}
		
	}
	
	
	/**
	 * init all the theme's elements and set them to their places 
	 * according gallery's dimentions.
	 * this function should work on resize too.
	 */
	function initAndPlaceElements(){
				
		//place objects:
		initThumbsPanel();
		placeThumbsPanel();
		placePlayer();
		
		if(g_objButtonsPanel)
			resizeAndPlaceButtonsPanel();
		
	}
	
	
	/**
	 * run the theme
	 */
	function runTheme(){
		
		setHtml();
		
		initAndPlaceElements();
		
		initEvents();
		
		g_objPlayer.show();
		
	}
	
	
	
	
	/**
	 * set gallery html elements
	 */
	function setHtml(){
				
		//add html elements
		g_objWrapper.addClass("ug-theme-video ug-videoskin-"+g_options.theme_skin);
		
		g_objPanel.setHtml();
		g_objPlayer.setHtml(g_objWrapper);
		
		//add buttons panel
		if(g_temp.putButtonsPanel == true){
						
			var html = "<div class='ug-video-buttons-panel'>";
			html += "<div href='javascript:void(0)' class='ug-button-prev-video'></div>"
			html += "<div href='javascript:void(0)' class='ug-button-next-video'></div>"
			html += "</div>"
			
			g_objWrapper.append(html);
			
			g_objButtonsPanel = g_objWrapper.children(".ug-video-buttons-panel");
			g_buttonPrev = g_objButtonsPanel.children(".ug-button-prev-video");
			g_buttonNext = g_objButtonsPanel.children(".ug-button-next-video");
						
		}
		
	}
	
		
	
	/**
	 * custom function foe drawing thumb
	 */
	function setHtmlThumb(objThumbWrapper, objItem){

		var showDesc = true;
		var showIcon = false;
		
		switch(g_options.theme_skin){
			case "right-title-only":
				showDesc = false;
			break;
			case "right-thumb":
				showIcon = true;
			break;
		}
		
		var html = "<div class='ug-thumb-inner'>";

		if(showIcon == true){
			html += "<div class='ug-thumb-icon' style='background-image:url(\""+objItem.urlThumb+"\")'></div>";
			html += "<div class='ug-thumb-right'>";
		}
			
		html += "<div class='ug-thumb-title'>" + objItem.title + "</div>";
		
		if(showDesc == true)
			html += "<div class='ug-thumb-desc'>" + objItem.description + "</div>";
		
		if(showIcon == true)
			html += "</div>";	//thumb right end
		
		html += "</div>";
		
		objThumbWrapper.html(html);
	
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
			
		var objPanelElement = g_objPanel.getElement();
		
		switch(g_temp.panel_position){
			default:
			case "right":
				g_functions.placeElement(objPanelElement, "right", 0);
			break;
			case "bottom":
				g_functions.placeElement(objPanelElement, 0, "bottom");
			break;
		}
		
	} 
	
	
	
	/**
	 * place the player according the thumbs panel size and position
	 */
	function placePlayer(){
		
		var gallerySize = g_functions.getElementSize(g_objWrapper);
		var panelSize = g_objPanel.getSize();			
		
		var playerWidth = gallerySize.width;
		var playerHeight = gallerySize.height;
		var playerTop = 0;
		var playerLeft = 0;
		
		if(g_objPanel){
			
			var panelSize = g_objPanel.getSize();
			
			switch(g_temp.panel_position){
				case "left":
					playerLeft = panelSize.right;
					playerWidth = gallerySize.width - panelSize.right;	
				break;
				case "right":
					playerWidth = panelSize.left;					
				break;
				case "top":
					playerHeight = gallerySize.height - panelSize.bottom;
					playerTop = panelSize.bottom;
				break;
				case "bottom":
					playerHeight = panelSize.top;
				break;
			}
			
		}
		
		
		if(g_objButtonsPanel && g_objButtonsPanel.is(":visible")){
			var buttonsPanelSize = g_functions.getElementSize(g_objButtonsPanel);
			var buttonsHeight = buttonsPanelSize.height;
			playerHeight -= buttonsHeight;
		}
		
		//set size
		g_objPlayer.setSize(playerWidth, playerHeight);
		
		//place
		var objPlayer = g_objPlayer.getObject();
		g_functions.placeElement(objPlayer, playerLeft, playerTop);
		
		//remember player ratio
		if(g_temp.playerRatio == null)
			g_temp.playerRatio = playerHeight / playerWidth;
		
	}

	
	/**
	 * resize and place buttons panel
	 */
	function resizeAndPlaceButtonsPanel(){
		
		if(!g_objButtonsPanel)
			return(false);
		
		if(g_objButtonsPanel.is(":visible") == false)
			return(false);
		
		var playerObj = g_objPlayer.getObject();
		var playerSize = g_functions.getElementSize(playerObj);
		
		g_objButtonsPanel.width(playerSize.width);
		
		//position to the bottom of the gallery
		g_functions.placeElement(g_objButtonsPanel, 0, "bottom");
	}
	
	
	/**
	 * get height by width and raetio on resize
	 */
	function getHeightByWidthOnResize(objSize){
		
		initThumbsPanel();
		var objPanelSize = g_objPanel.getSize();
		var thumbsHeight = objPanelSize.height;
		var newWidth = objSize.width;
		
		var playerHeight = g_temp.playerRatio * newWidth;
		var newHeight = playerHeight + thumbsHeight;
		
		return(newHeight);
	}
	
	
	/**
	 * on gallery size change - resize the theme.
	 */
	function onSizeChange(){
		
		initAndPlaceElements();
	}
	
	
	/**
	 * on item change function
	 */
	function onItemChange(){
		
		var isAutoplay = g_options.theme_autoplay;
		
		var selectedItem = g_gallery.getSelectedItem();
		
		switch(selectedItem.type){
			case "youtube":
				g_objPlayer.playYoutube(selectedItem.videoid, isAutoplay);
			break;
			case "vimeo":
				g_objPlayer.playVimeo(selectedItem.videoid, isAutoplay);
			break;
			case "html5video":
				g_objPlayer.playHtml5Video(selectedItem.videoogv, selectedItem.videowebm, selectedItem.videomp4, selectedItem.urlImage, isAutoplay);
			break;
			case "wistia":
				g_objPlayer.playWistia(selectedItem.videoid, isAutoplay);
			break;			
			case "soundcloud":
				g_objPlayer.playSoundCloud(selectedItem.trackid, isAutoplay);
			break;
		}
		
		g_temp.isFirstChange = false;
		
	}
	
	
	/**
	 * on video ended playing
	 */
	function onVideoEnded(){
		
		if(g_options.theme_next_video_onend == true)
			g_gallery.nextItem();
				
	}
	
	
	/**
	 * init buttons functionality and events
	 */
	function initEvents(){
		
		g_objGallery.on(g_gallery.events.SIZE_CHANGE, onSizeChange);
		g_objGallery.on(g_gallery.events.ITEM_CHANGE, onItemChange);
		
		g_objPlayer.initEvents();
		
		if(g_options.theme_next_video_onend == true)
			jQuery(g_objPlayer).on(g_objPlayer.events.VIDEO_ENDED, onVideoEnded);
		
		//init buttons panel events:		
		if(g_objButtonsPanel){
			
			g_functions.setButtonMobileReady(g_buttonPrev);
			g_gallery.setPrevButton(g_buttonPrev);
			
			g_functions.setButtonMobileReady(g_buttonNext);
			g_gallery.setNextButton(g_buttonNext);
						
		}
		
	}
	
	/**
	 * destroy the theme
	 */
	this.destroy = function(){
		
		g_objGallery.off(g_gallery.events.SIZE_CHANGE);
		g_objGallery.off(g_gallery.events.ITEM_CHANGE);
		g_objPlayer.destroy();
		if(g_objButtonsPanel){
			g_functions.destroyButton(g_buttonPrev);
			g_functions.destroyButton(g_buttonNext);
		}
		
		if(g_options.theme_next_video_onend == true)
			jQuery(g_objPlayer).off(g_objPlayer.events.VIDEO_ENDED);
		
		if(g_objPanel)
			g_objPanel.destroy();
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

