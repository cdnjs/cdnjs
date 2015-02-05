/**********************************************************
************************ Hoverizr *************************

Hoverizr is an image manipulation jQuery plug in taking 
advantage of the new canvas element which is getting more 
and more popular.

Currently it allows you to use three different, dynamic
effects:
	1. Grayscale - Default
	2. Blur
	3. Color Inversion

You can define your own options or following the trends 
it can be responsive by default.
	
You can read more about Hoverizr and see some Demos at:
		http://www.iliasiovis.com/hoverizr/

Fork on GitHub:
		https://github.com/iliasiovis/Hoverizr/

CC 2011 - Ilias Iovis | iliasiovis.com
***********************************************************
**********************************************************/


(function( $ ){
$.fn.hoverizr = function(options) {

	//Defaults
	var defaults = {
		'effect':        "grayscale", //options include: 'grayscale', 'invert', 'blur'. 'noise' is under construction
		'overlay':       "top",  //manipulated image can be on 'top' or 'bottom'
		'container':     "overlayed", //name of the class of the generated div wrapping the img and the canvas element
		'width':         "responsive", //can be 'responsive' fixed width, ex. 500 or 'inherit' from the image
		'height':        "auto", //please change the height default only if you plan to use a fixed width on your initialization
		'stretch':       "no", //if you set a fixed width for image and div the img aspect ratio will not change - it will crop the image and canvas outside, if set to "yes" the image and canvas will stretch to fill the fixed width and height you chose
		'speedIn':       "slow", // 'slow', 'fast' or time in milliseconds, ex 1500
		'speedOut':      "fast" // same as above
	};

	//inherit from provided configuration
	var options = $.extend(defaults, options);
	
	//Workaround for responsive max-width glitch when initializing the canvas element
	if($('img').css('maxWidth') != "none"){
		var maxwidth = 1;
		$('img').css('maxWidth',"none");
	} else{
		var maxwidth = 0;
	}

	
	//start img manipulation for each selected img tag
	this.each(function(){
	
	
		//add elements and default styles
		$(this).wrap('<div class="'+ options.container +'" />');
		$(this).parent('.'+ options.container +'').css({'position':'relative'});
		$(this).parent('.'+ options.container +'').append('<canvas class="canv"></canvas>');
		$(this).next('.canv').css({'position':'absolute','top':'0','left':'0','z-index':10});
		
		
		if(options.overlay == "top"){
			$(this).css({'z-index':-1});
		}else {
			$(this).css({'z-index':1});
			$(this).next('.canv').css({'display':'none'});
		}
		
		var width = $(this).width();
		var height = $(this).height();
		
		
		
		
		$(this).next('.canv').attr({"width": width ,"height": height});
		var canvas = $(this).next('.canv').get(0);
		var context = canvas.getContext("2d");
		//if(options.effect != "noise"){
		var image = $(this).get(0);
		context.drawImage(image, 0, 0);
		//}
		
		
		if(options.effect != 'noise' && 'blur'){
			try {
			  try { 
				var imgd = context.getImageData(0, 0, width, height)  
			  } catch (e) { 
				netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
				var imgd = context.getImageData(0, 0, width, height) 
			  } 						 
			} catch (e) {
			  throw new Error("unable to access image data: " + e)
			} 
			//alert("Pixel an (0,0): rgba("+imgd.data[4]+", "+imgd.data[5]+", "+imgd.data[6]+","+imgd.data[6]+")");
			
			var pix = imgd.data;
		}
		
		
		switch(options.effect)
		{
		case "invert":
			//Color Inversion Effect
			for (var i = 0, n = pix.length; i < n; i += 4) {
				pix[i  ] = 255 - pix[i  ]; // red
				pix[i+1] = 255 - pix[i+1]; // green
				pix[i+2] = 255 - pix[i+2]; // blue
			// i+3 is alpha (the fourth element)
			}
			break;
	
		case "blur":
			//Blur Effect
			var pass, x, y;
			// Loop for each blur pass.
			var imgb = new Image;
			imgb.src = $(this).attr('src');
			context.globalAlpha = 0.0625;
			//for (pass = 1; pass <= 1; pass += 1) {
				for (y = -3; y < 3; y += 1) {
					for (x = -3; x < 3; x += 1) {
						context.drawImage(imgb, x, y);
					}
				}
			//}
			context.globalAlpha = 1;
			break;
			
		default:
			//Default is set to Grayscale Effect
			for (var i = 0, n = pix.length; i < n; i += 4) {
				var grayscale = pix[i  ] * .3 + pix[i+1] * .59 + pix[i+2] * .11; //Very luminus grayscale formula
				//var grayscale = (pix[i  ] + pix[i+1] + pix[i+2])/3   - average grayscale formula
				//var grayscale = (pix[i  ] + pix[i+1] + pix[i+2])/3   - 
				pix[i  ] = grayscale; 	// red
				pix[i+1] = grayscale; 	// green
				pix[i+2] = grayscale; 	// blue
				// i+3 is alpha (the fourth element)
			}
			break;
		}
		
		
		if(options.effect != ("blur"||"noise"))
		{
		context.putImageData(imgd, 0, 0);
		}
		
		if(options.width == "responsive"){
			//make img div & canvas responsive - Glitchy
			$(this).next('.canv').css({'max-width':'100%'});
			$(this).css({'max-width':'100%'});
			$(this).parent('.'+ options.container +'').css({'width':'100%'});
		} else if(options.stretch == "no"){
			//$(this).next('.canv').css({'width': options.width, 'height': options.height});
			//$(this).css({'width': options.width, 'height': options.height});
			$(this).parent('.'+ options.container +'').css({'width': options.width, 'height': options.height, overflow: "hidden"});
		} else {
			$(this).next('.canv').css({'width': options.width, 'height': options.height});
			$(this).css({'width': options.width, 'height': options.height});
			$(this).parent('.'+ options.container +'').css({'width': options.width, 'height': options.height});
		}
	});
	
	
	//restore img max-width if responsive
	if(maxwidth == 1){
		$('img').css('maxWidth', "100%");
	}


	
	//hover effect
	if(options.overlay == "top"){
		this.parent('.'+ options.container +'').hover(function() {
			$(this).children('.canv').stop(true,true).fadeOut(options.speedOut);
			},function() {
			$(this).children('.canv').stop(true,true).fadeIn(options.speedIn);
		});
	} else {
		this.parent('.'+ options.container +'').hover(function() {
			$(this).children('.canv').stop(true,true).fadeIn(options.speedOut);
			},function() {
			$(this).children('.canv').stop(true,true).fadeOut(options.speedIn);
		});
	}
	
};
})( jQuery );