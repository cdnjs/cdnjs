/*!
 * jQuery Smart Web App Banner (Add to Home Screen)
 * Copyright (c) 2014 Kurt Zenisek @ kzeni.com
 * Version: 1.4 (24-MAY-2014)
 * Requires: jQuery v1.7 or later
 */
;(function($){
	$.fn.smartWebBanner = function(options){

		// Find out about the device being used
		var iPad = navigator.userAgent.match(/iPad/i) != null; // Check if using an iPad
		var iPhone = navigator.userAgent.match(/iPhone/i) != null; // Check if using an iPhone
		var Safari = (/Safari/i).test(navigator.appVersion) && !(/CriOS/i).test(navigator.appVersion); // Check if using Safari (making sure to exclude Chrome for iOS)
		var standalone = navigator.standalone; // Check if it's already a standalone web app or running within a webui view of an app (not mobile safari)
		// Detect iOS version
		function iOSversion(){ // From http://stackoverflow.com/a/14223920
			if(iPhone||iPad){ // Must be iOS device, otherwise returns an error
				var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
				return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
			}else{
				return false;
			}
		}
		var ver = iOSversion();
		if(ver[0] <= 6) // They're running iOS 6 or earlier
			var iOS7 = false;
		else // Mark iOS 7 styling as true. This will need to be revisited if a new style is introduced in a future version of iOS.
			var iOS7 = true;

		// Find out about the website itself
		var origHtmlMargin = parseFloat($('html').css('margin-top')); // Get the original margin-top of the HTML element so we can take that into account
		var bannerHeight; // Make variable global (updated in createBanner)
		var originalTitle = document.title; // Save the page's <title>
		var originalURL = window.location.href; // Save the page's url

		if(typeof options == 'string'){ // If they specified a command (like "show" or "hide")
			bannerHeight = $('#smartWebBanner').height(); // Accomodate different sized banners
			if(typeof opts == 'undefined')
				var opts = $.fn.smartWebBanner.defaults;
			switch(options){
				case 'show':
					if(!$('#smartWebBanner').hasClass('shown')){
						showBanner();
					}
					return false;
				case 'hide':
					if($('#smartWebBanner').hasClass('shown')){
						origHtmlMargin = origHtmlMargin-bannerHeight; // The "original" value actually includes the banner's added margin when this is called so we need to take it out
						closeBanner();
					}
					return false;
			}
		}else{ // Check for options
			var opts = $.extend({}, $.fn.smartWebBanner.defaults, options);
		}

		if(opts.autoApp && $('meta[name="apple-mobile-web-app-capable"]').length == 0) // Auto-add web app capable tag if it's missing
			$('head').append('<meta name="apple-mobile-web-app-capable" content="yes" />');

		function createBanner(){
			$('body').append('<div id="smartWebBanner"><a href="#" id="swb-close">X</a><a href="#" id="swb-icon"></a><div id="swb-info"><strong>'+opts.title+'</strong><span>'+opts.author+'</span></div><a href="#" id="swb-save">Save</a></div><div id="swb-instructions">Tap <span class="icon"></span> and then <strong>Add to Home Screen.</strong><div class="arrow"></div></div>');
			if(iPad)
				$('#smartWebBanner,#swb-instructions').addClass('ipad');
			if(!iPad && !iPhone)
				$('#swb-instructions').html('<strong>It appears this isn\'t an iOS device.</strong> This is a preview of the iPhone popup design though.');
			if(opts.showFree)
				$('#smartWebBanner').addClass('free');
			if(opts.theme.toLowerCase() == 'auto'){
				if(iOS7)
					$('#smartWebBanner,#swb-instructions').addClass('ios7');
				else
					$('#smartWebBanner,#swb-instructions').addClass('ios6');
			}
			if(opts.theme.toLowerCase() == 'ios 7')
				$('#smartWebBanner,#swb-instructions').addClass('ios7');
			if(opts.theme.toLowerCase() == 'ios 6')
				$('#smartWebBanner,#swb-instructions').addClass('ios6');
			if(opts.theme.toLowerCase() == 'dark')
				$('#smartWebBanner,#swb-instructions').addClass('dark');
			if(opts.useIcon){
				if($('link[rel="apple-touch-icon-precomposed"]').length > 0){
					iconURL = $('link[rel="apple-touch-icon-precomposed"]').attr('href');
				}else if($('link[rel="apple-touch-icon"]').length > 0){
					iconURL = $('link[rel="apple-touch-icon"]').attr('href');
					if(opts.iconGloss != false) // Don't auto-add gloss if they chose to not show it
						$('#swb-icon').addClass('gloss');
				}
				if(opts.iconGloss == true) // Add gloss no matter what since they want to show it
					$('#swb-icon').addClass('gloss');
				if(opts.iconOverwrite != '')
					iconURL = opts.iconOverwrite;
				$('#swb-icon').css('background-image','url('+iconURL+')');
			}
			if(!opts.useIcon || !iconURL){
				$('#smartWebBanner').addClass('no-icon');
			}
			bannerHeight = $('#smartWebBanner').height(); // Accomodate different sized banners
		}
		function showBanner(){
			$('#smartWebBanner').stop().animate({
				top:0
			},opts.speedIn).addClass('shown');
			$('html').animate({
				marginTop:origHtmlMargin+bannerHeight
			},opts.speedIn);
			$('#swb-close').on('click',function(){
				closeBanner();
				return false;
			});
			$('#swb-save,#swb-icon').on('click',function(){
				showInstructions();
				return false;
			});
		}
		function closeBanner(){
			$('#smartWebBanner').stop().animate({
				top:-(bannerHeight+(bannerHeight/3))
			},opts.speedOut).removeClass('shown');
			$('html').animate({
				marginTop:origHtmlMargin
			},opts.speedOut);
			hideInstructions();
			setCookie('swb-closed','true',opts.daysHidden);
		}
		function showInstructions(){
			$('#swb-instructions').fadeIn(opts.popupSpeedIn);
			if(opts.titleSwap) // Swap out the page's <title> with the specified title
				document.title = opts.title;
			if(opts.url) // Swap out the page's url with the specified url
				history.replaceState(null,null,opts.url);
			if(opts.popupDuration != 0)
				setTimeout(function(){hideInstructions();},opts.popupDuration);
			setCookie('swb-saved','true',opts.daysReminder);
		}
		function hideInstructions(){
			$('#swb-instructions').fadeOut(opts.popupSpeedOut);
			if(opts.titleSwap) // Swap the page's <title> back to the original since they should've added it to their home screen by now & we might as well use what the title was before
				setTimeout(function(){document.title = originalTitle;},12000);
			if(opts.url) // Swap out the page's url back to the original since they should've added it to their home screen by now & we might as well use what the url was before
				setTimeout(function(){history.replaceState(null,null,originalURL);},12000);
		}
		function setCookie(name,value,exdays){
			var exdate = new Date();
			exdate.setDate(exdate.getDate()+exdays);
			var value=escape(value)+((exdays==null)?'':'; expires='+exdate.toUTCString());
			document.cookie=name+'='+value+'; path=/;';
		}
		function getCookie(name){
			var i,x,y,ARRcookies = document.cookie.split(";");
			for(i=0;i<ARRcookies.length;i++){
				x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
				y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
				x = x.replace(/^\s+|\s+$/g,"");
				if(x==name){
					return unescape(y);
				}
			}
		}

		if(opts.debug || ((iPhone || iPad) && Safari && !standalone && typeof getCookie('swb-closed') == 'undefined' && typeof getCookie('swb-saved') == 'undefined')){ // Show if debug. Show if iPhone/iPad in Mobile Safari & don't have cookies already.
			createBanner();
			showBanner();
		}

	};

	// override these globally if you like (they are all optional)
	$.fn.smartWebBanner.defaults = {
		title: 'Web App', // What the title of the "app" should be in the banner
		titleSwap: true, // Whether or not to use the title specified here has the default label of the home screen icon (otherwise uses the page's <title> tag)
		url: '', // URL to mask the page as before saving to home screen (allows for having it save the homepage of a site no matter what page the visitor is on)
		author: 'Save to Home Screen', // What the author of the "app" should be in the banner
		speedIn: 300, // Show animation speed of the banner
		speedOut: 400, // Close animation speed of the banner
		useIcon: true, // Whether or not it should show site's apple touch icon (located via <link> tag)
		iconOverwrite: '', // Force the URL of the icon (even if found via <link> tag)
		iconGloss: 'auto', // Whether or not to show the gloss over the icon (true/false/"auto" [auto doesn't show if precomposed <link> tag is used])
		showFree: true, // Whether or not to show "Free" at bottom of info
		daysHidden: 15, // Duration to hide the banner after being closed (0 = always show banner)
		daysReminder: 90, // Duration to hide the banner after "Save" is clicked *separate from when the close button is clicked* (0 = always show banner)
		popupDuration: 6000, // How long the instructions are shown before fading out (0 = show until manually closed)
		popupSpeedIn: 200, // Show animation speed of the popup
		popupSpeedOut: 900, // Close animation speed of the popup
		theme: 'auto', // Change between "auto" (detect iOS version), "iOS 6", "iOS 7", and "dark" theme to fit your site design & visitors
		autoApp: false, // Whether or not it should auto-add the mobile-web-app meta tag that makes it open as an app rather than in mobile safari
		debug: false // Whether or not it should always be shown (even for non-iOS devices & if cookies have previously been set) *This is helpful for testing and/or previewing
	};
})(jQuery);
