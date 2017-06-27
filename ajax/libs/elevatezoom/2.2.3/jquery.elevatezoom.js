/*
 *	jQuery elevateZoom 2.2.3
 *	Demo's and documentation:
 *	www.elevateweb.co.uk/image-zoom
 *
 *	Copyright (c) 2012 Andrew Eades
 *	www.elevateweb.co.uk
 *
 *	Dual licensed under the GPL and MIT licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


if ( typeof Object.create !== 'function' ) {
	Object.create = function( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	};
}

(function( $, window, document, undefined ) {
	var ElevateZoom = {
			init: function( options, elem ) {
				var self = this;

				self.elem = elem;
				self.$elem = $( elem );

				self.imageSrc = self.$elem.data("zoom-image") ? self.$elem.data("zoom-image") : self.$elem.attr("src");

				self.options = $.extend( {}, $.fn.elevateZoom.options, options );

				//TINT OVERRIDE SETTINGS
				if(self.options.tint) {
					self.options.lensColour = "none", //colour of the lens background
					self.options.lensOpacity =  "1" //opacity of the lens
				}
				//INNER OVERRIDE SETTINGS
				if(self.options.zoomType == "inner") {self.options.showLens = false;}


				//Remove alt on hover

				self.$elem.parent().removeAttr('title').removeAttr('alt');

				self.zoomImage = self.imageSrc;

				self.refresh( 1 );



				//Create the image swap from the gallery 
				$('#'+self.options.gallery + ' a').click( function(e) { 

					//stop any link on the a tag from working
					e.preventDefault();

					//call the swap image function            
					if($(this).data("zoom-image")){self.zoomImagePre = $(this).data("zoom-image")}
					else{self.zoomImagePre = $(this).data("image");}
					self.swaptheimage($(this).data("image"), self.zoomImagePre);
					return false;
				});

			},

			refresh: function( length ) {
				var self = this;

				setTimeout(function() {
					self.fetch(self.imageSrc);

				}, length || self.options.refresh );
			},

			fetch: function(imgsrc) {
				//get the image
				var self = this;
				var newImg = new Image();
				newImg.onload = function() {
					//set the large image dimensions - used to calculte ratio's
					self.largeWidth = newImg.width;
					self.largeHeight = newImg.height;
					//once image is loaded start the calls
					self.startZoom();
					self.currentImage = self.imageSrc;
					//let caller know image has been loaded
					self.options.onZoomedImageLoaded();
				}
				newImg.src = imgsrc; // this must be done AFTER setting onload

				return;

			},

			startZoom: function( ) {
				var self = this;
				//get dimensions of the non zoomed image
				self.nzWidth = self.$elem.width();
				self.nzHeight = self.$elem.height();

				//get offset of the non zoomed image
				self.nzOffset = self.$elem.offset();
				//calculate the width ratio of the large/small image
				self.widthRatio = self.largeWidth / self.nzWidth;
				self.heightRatio = self.largeHeight / self.nzHeight; 


//				if window zoom        
				if(self.options.zoomType == "window") {
					self.zoomWindowStyle = "overflow: hidden;"
						+ "background-position: 0px 0px;background-color:white;text-align:center;"
						+ "width: " + String(self.options.zoomWindowWidth) + "px;"
						+ "height: " + String(self.options.zoomWindowHeight)
						+ "px;float: left;"
						+ "display: none;z-index:100"
						+ "px;border: " + String(self.options.borderSize) 
						+ "px solid " + self.options.borderColour 
						+ ";background-repeat: no-repeat;"
						+ "position: absolute;";
				}
//				if inner  zoom    
				if(self.options.zoomType == "inner") {
					self.zoomWindowStyle = "overflow: hidden;"
						+ "background-position: 0px 0px;"
						+ "width: " + String(self.nzWidth) + "px;"
						+ "height: " + String(self.nzHeight)
						+ "px;float: left;"
						+ "display: none;"
						+ "cursor:"+(self.options.cursor)+";"
						+ "px solid " + self.options.borderColour 
						+ ";background-repeat: no-repeat;"
						+ "position: absolute;";
				}    



				//lens style for window zoom
				if(self.options.zoomType == "window") {


					// adjust images less than the window height

					if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
						lensHeight = self.nzHeight;              
					}
					else{
						lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
					}
					if(self.largeWidth < self.options.zoomWindowWidth){
						lensWidth = self.nzHWidth;
					}       
					else{
						lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
					}


					self.lensStyle = "background-position: 0px 0px;width: " + String((self.options.zoomWindowWidth)/self.widthRatio) + "px;height: " + String((self.options.zoomWindowHeight)/self.heightRatio)
					+ "px;float: right;display: none;"
					+ "overflow: hidden;"
					+ "z-index: 999;"   
					+ "-webkit-transform: translateZ(0);"               
					+ "opacity:"+(self.options.lensOpacity)+";filter: alpha(opacity = "+(self.options.lensOpacity*100)+"); zoom:1;"
					+ "width:"+lensWidth+"px;"
					+ "height:"+lensHeight+"px;"
					+ "background-color:"+(self.options.lensColour)+";"					
					+ "cursor:"+(self.options.cursor)+";"
					+ "border: "+(self.options.lensBorder)+"px" +
					" solid black;background-repeat: no-repeat;position: absolute;";
				} 


				//tint style
				self.tintStyle = "display: block;"
					+ "position: absolute;"
					+ "background-color: "+self.options.tintColour+";"	
					+ "filter:alpha(opacity=0);"		
					+ "opacity: 0;"	
					+ "width: " + self.nzWidth + "px;"
					+ "height: " + self.nzHeight + "px;"

					;

				//lens style for lens zoom with optional round for modern browsers
				self.lensRound = '';
				if(self.options.zoomType == "lens") {
					self.lensStyle = "background-position: 0px 0px;"
						+ "float: left;display: none;"
						+ "border: " + String(self.options.borderSize) + "px solid " + self.options.borderColour+";"
						+ "width:"+ String(self.options.lensSize) +"px;"
						+ "height:"+ String(self.options.lensSize)+"px;"
						+ "background-repeat: no-repeat;position: absolute;";


				}


				//does not round in all browsers
				if(self.options.lensShape == "round") {
					self.lensRound = "border-top-left-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"
					+ "border-top-right-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"
					+ "border-bottom-left-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"
					+ "border-bottom-right-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;";

				}

				//create the div's                                                + ""
				//self.zoomContainer = $('<div/>').addClass('zoomContainer').css({"position":"relative", "height":self.nzHeight, "width":self.nzWidth});

				self.zoomContainer = $('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:'+self.nzOffset.left+'px;top:'+self.nzOffset.top+'px;height:'+self.nzHeight+'px;width:'+self.nzWidth+'px;"></div>');
				$('body').append(self.zoomContainer);	


				//this will add overflow hidden and contrain the lens on lens mode       
				if(self.options.containLensZoom && self.options.zoomType == "lens"){
					self.zoomContainer.css("overflow", "hidden");
				}
				if(self.options.zoomType != "inner") {
					self.zoomLens = $("<div class='zoomLens' style='" + self.lensStyle + self.lensRound +"'>&nbsp;</div>")
					.appendTo(self.zoomContainer)
					.click(function () {
						self.$elem.trigger('click');
					});
				}



				if(self.options.tint) {
					self.tintContainer = $('<div/>').addClass('tintContainer');	
					self.zoomTint = $("<div class='zoomTint' style='"+self.tintStyle+"'></div>");


					self.zoomLens.wrap(self.tintContainer);


					self.zoomTintcss = self.zoomLens.after(self.zoomTint);	

					//if tint enabled - set an image to show over the tint

					self.zoomTintImage = $('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: '+self.nzWidth+'px; height: '+self.nzHeight+'px;" src="'+self.imageSrc+'">')
					.appendTo(self.zoomLens)
					.click(function () {

						self.$elem.trigger('click');
					});

				}



				//create zoom window 
				if(isNaN(self.options.zoomWindowPosition)){
					self.zoomWindow = $("<div style='z-index:999;left:"+(self.windowOffsetLeft)+"px;top:"+(self.windowOffsetTop)+"px;" + self.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>")
					.appendTo('body')
					.click(function () {
						self.$elem.trigger('click');
					});
				}else{
					self.zoomWindow = $("<div style='z-index:999;left:"+(self.windowOffsetLeft)+"px;top:"+(self.windowOffsetTop)+"px;" + self.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>")
					.appendTo(self.zoomContainer)
					.click(function () {
						self.$elem.trigger('click');
					});
				}              
				self.zoomWindowContainer = $('<div/>').addClass('zoomWindowContainer').css("width",self.options.zoomWindowWidth);
				self.zoomWindow.wrap(self.zoomWindowContainer);


				//  self.captionStyle = "text-align: left;background-color: black;color: white;font-weight: bold;padding: 10px;font-family: sans-serif;font-size: 11px";                                                                                                                                                                                                                                          
				// self.zoomCaption = $('<div class="elevatezoom-caption" style="'+self.captionStyle+'display: block; width: 280px;">INSERT ALT TAG</div>').appendTo(self.zoomWindow.parent());

				//set image attibutes
				if(self.options.tint) {
					//	zoomLens.css({ backgroundImage: "url('" + imageSrc + "')" }); 
				}

				if(self.options.zoomType == "lens") {
					self.zoomLens.css({ backgroundImage: "url('" + self.imageSrc + "')" }); 
				}
				if(self.options.zoomType == "window") {
					self.zoomWindow.css({ backgroundImage: "url('" + self.imageSrc + "')" }); 
				}
				if(self.options.zoomType == "inner") {
					self.zoomWindow.css({ backgroundImage: "url('" + self.imageSrc + "')" }); 
				}
				/*-------------------END THE ZOOM WINDOW AND LENS----------------------------------*/
				//touch events
				self.$elem.bind('touchmove', function(e){    
					e.preventDefault();
					var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];  
					self.setPosition(touch); 
				});  
				self.zoomContainer.bind('touchmove', function(e){ 
					if(self.options.zoomType == "inner") {
						if(self.options.zoomWindowFadeIn){        
							self.zoomWindow.stop(true, true).fadeIn(self.options.zoomWindowFadeIn);
						}
						else{self.zoomWindow.show();}

					}
					e.preventDefault();
					var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];  
					self.setPosition(touch); 

				});  	
				self.zoomContainer.bind('touchend', function(e){ 
					self.zoomWindow.hide();
					if(self.options.showLens) {self.zoomLens.hide();}
					if(self.options.tint) {self.zoomTint.hide();}
				});  	

				self.$elem.bind('touchend', function(e){ 
					self.zoomWindow.hide();
					if(self.options.showLens) {self.zoomLens.hide();}
					if(self.options.tint) {self.zoomTint.hide();}
				});  	
				if(self.options.showLens) {
					self.zoomLens.bind('touchmove', function(e){ 

						e.preventDefault();
						var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];  
						self.setPosition(touch); 
					});    


					self.zoomLens.bind('touchend', function(e){ 
						self.zoomWindow.hide();
						if(self.options.showLens) {self.zoomLens.hide();}
						if(self.options.tint) {self.zoomTint.hide();}
					});  
				}
				//Needed to work in IE
				self.$elem.bind('mousemove', function(e){
					//make sure on orientation change the setposition is not fired
					if(self.lastX !== e.clientX || self.lastY !== e.clientY){
						self.setPosition(e);
					}   
					self.lastX = e.clientX;
					self.lastY = e.clientY;    

				});  	

				self.zoomContainer.bind('mousemove', function(e){  
					//make sure on orientation change the setposition is not fired 
					if(self.lastX !== e.clientX || self.lastY !== e.clientY){
						self.setPosition(e);
					}   
					self.lastX = e.clientX;
					self.lastY = e.clientY;    
				});  	
				if(self.options.zoomType != "inner") {
					self.zoomLens.bind('mousemove', function(e){ 
						//make sure on orientation change the setposition is not fired
						if(self.lastX !== e.clientX || self.lastY !== e.clientY){
							self.setPosition(e);
						}   
						self.lastX = e.clientX;
						self.lastY = e.clientY;    
					});
				}
				if(self.options.tint) {
					self.zoomTint.bind('mousemove', function(e){ 
						//make sure on orientation change the setposition is not fired
						if(self.lastX !== e.clientX || self.lastY !== e.clientY){
							self.setPosition(e);
						}   
						self.lastX = e.clientX;
						self.lastY = e.clientY;    
					});

				}
				if(self.options.zoomType == "inner") {
					self.zoomWindow.bind('mousemove', function(e) {
						//make sure on orientation change the setposition is not fired
						if(self.lastX !== e.clientX || self.lastY !== e.clientY){
							self.setPosition(e);
						}   
						self.lastX = e.clientX;
						self.lastY = e.clientY;    
					});

				}


				//  lensFadeOut: 500,  zoomTintFadeIn
				self.zoomContainer.mouseenter(function(){

					if(self.options.zoomType == "inner") {
						if(self.options.zoomWindowFadeIn){        
							self.zoomWindow.stop(true, true).fadeIn(self.options.zoomWindowFadeIn);
						}
						else{self.zoomWindow.show();}

					}
					if(self.options.zoomType == "window") {

						if(self.options.zoomWindowFadeIn){        
							self.zoomWindow.stop(true, true).fadeIn(self.options.zoomWindowFadeIn);
						}
						else{self.zoomWindow.show();}

					}
					if(self.options.showLens) {

						if(self.options.lensFadeIn){        
							self.zoomLens.stop(true, true).fadeIn(self.options.lensFadeIn);
						}
						else{self.zoomLens.show();}         

					}
					if(self.options.tint) {

						if(self.options.zoomTintFadeIn){        
							self.zoomTint.stop(true, true).fadeIn(self.options.zoomTintFadeIn);
						}
						else{self.zoomTint.show();}

						//  self.zoomTint.show();


					}
				}).mouseleave(function(){

					self.zoomWindow.hide();
					if(self.options.showLens) {self.zoomLens.hide();}

					if(self.options.tint) {
						self.zoomTint.hide(); 
					}
				});
				//end ove image

				self.$elem.mouseenter(function(){

					if(self.options.zoomType == "inner") {
						if(self.options.zoomWindowFadeIn){        
							self.zoomWindow.stop(true, true).fadeIn(self.options.zoomWindowFadeIn);
						}
						else{self.zoomWindow.show();}

					}
					if(self.options.zoomType == "window") {

						if(self.options.zoomWindowFadeIn){        
							self.zoomWindow.stop(true, true).fadeIn(self.options.zoomWindowFadeIn);
						}
						else{self.zoomWindow.show();}

					}
					if(self.options.showLens) {

						if(self.options.lensFadeIn){        
							self.zoomLens.stop(true, true).fadeIn(self.options.lensFadeIn);
						}
						else{self.zoomLens.show();}         

					}
					if(self.options.tint) {

						if(self.options.zoomTintFadeIn){        
							self.zoomTint.stop(true, true).fadeIn(self.options.zoomTintFadeIn);
						}
						else{self.zoomTint.show();}

						//  self.zoomTint.show();


					}
				}).mouseleave(function(){

					self.zoomWindow.hide();
					if(self.options.showLens) {self.zoomLens.hide();}

					if(self.options.tint) {
						self.zoomTint.hide(); 
					}
				});
				//end ove image

				if(self.options.zoomType != "inner") {

					self.zoomLens.mouseenter(function(){
						if(self.options.zoomType == "inner") {
							if(self.options.zoomWindowFadeIn){

								self.zoomWindow.stop(true, true).fadeIn(self.options.zoomWindowFadeIn);
							}
							else{

								self.zoomWindow.show();
							}
						}
						if(self.options.zoomType == "window") {self.zoomWindow.show();}
						if(self.options.showLens) {self.zoomLens.show();}
						if(self.options.tint) {self.zoomTint.show(); }
					}).mouseleave(function(){


						if(self.options.zoomWindowFadeOut){        
							self.zoomWindow.stop(true, true).fadeOut(self.options.zoomWindowFadeOut);
						}
						else{self.zoomWindow.hide();}


						if(self.options.zoomType != "inner") {
							self.zoomLens.hide();
						}
						if(self.options.tint) {self.zoomTint.hide(); }
					});
				}


				if(self.options.tint) {
					self.zoomTint.mouseenter(function(){
						if(self.options.zoomType == "inner") {self.zoomWindow.show();}
						if(self.options.zoomType == "window") {self.zoomWindow.show();}
						if(self.options.showLens) {self.zoomLens.show();}
						self.zoomTint.show(); 

					}).mouseleave(function(){

						self.zoomWindow.hide();
						if(self.options.zoomType != "inner") {
							self.zoomLens.hide();
						}
						self.zoomTint.hide(); 

					});
				}

				if(self.options.zoomType == "inner") {
					self.zoomWindow.mouseenter(function(){
						if(self.options.zoomType == "inner") {self.zoomWindow.show();}
						if(self.options.zoomType == "window") {self.zoomWindow.show();}
						if(self.options.showLens) {self.zoomLens.show();}


					}).mouseleave(function(){

						if(self.options.zoomWindowFadeOut){        
							self.zoomWindow.stop(true, true).fadeOut(self.options.zoomWindowFadeOut);
						}
						else{self.zoomWindow.hide();}
						if(self.options.zoomType != "inner") {
							self.zoomLens.hide();
						}


					});
				} 
			},

			setPosition: function(e) {

				var self = this;


				//recaclc offset each time in case the image moves
				//this can be caused by other on page elements
				self.nzHeight = self.$elem.height();
				self.nzWidth = self.$elem.width();
				self.nzOffset = self.$elem.offset();

				if(self.options.tint) {
					self.zoomTint.css({ top: 0});
					self.zoomTint.css({ left: 0});
				}
				//set responsive       
//				will checking if the image needs changing before running this code work faster?
				if(self.options.responsive){
					if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
						lensHeight = self.nzHeight;              
					}
					else{
						lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
					}
					if(self.largeWidth < self.options.zoomWindowWidth){
						lensWidth = self.nzHWidth;
					}       
					else{
						lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
					}
					self.widthRatio = self.largeWidth / self.nzWidth;
					self.heightRatio = self.largeHeight / self.nzHeight; 
					self.zoomLens.css({ width: String((self.options.zoomWindowWidth)/self.widthRatio) + 'px', height: String((self.options.zoomWindowHeight)/self.heightRatio) + 'px' }) 
//					end responsive image change
				}

				//container fix
				self.zoomContainer.css({ top: self.nzOffset.top});
				self.zoomContainer.css({ left: self.nzOffset.left});
				self.mouseLeft = parseInt(e.pageX - self.nzOffset.left);
				self.mouseTop = parseInt(e.pageY - self.nzOffset.top);
				//calculate the Location of the Lens

				//calculate the bound regions - but only if zoom window
				if(self.options.zoomType == "window") {
					self.Etoppos = (self.mouseTop < (self.zoomLens.height()/2));
					self.Eboppos = (self.mouseTop > self.nzHeight - (self.zoomLens.height()/2)-(self.options.lensBorder*2));
					self.Eloppos = (self.mouseLeft < 0+((self.zoomLens.width()/2))); 
					self.Eroppos = (self.mouseLeft > (self.nzWidth - (self.zoomLens.width()/2)-(self.options.lensBorder*2)));  
				}
				//calculate the bound regions - but only for inner zoom
				if(self.options.zoomType == "inner"){ 
					self.Etoppos = (self.mouseTop < (self.nzHeight/2)/self.heightRatio );
					self.Eboppos = (self.mouseTop > self.nzHeight - ((self.nzHeight/2)/self.heightRatio));
					self.Eloppos = (self.mouseLeft < 0+((self.nzWidth/2)/self.widthRatio));
					self.Eroppos = (self.mouseLeft > (self.nzWidth - (self.nzWidth/2)/self.widthRatio-(self.options.lensBorder*2)));  
				}

				// if the mouse position of the slider is one of the outerbounds, then hide  window and lens
				if (self.mouseLeft < 0 || self.mouseTop <= 0 || self.mouseLeft > self.nzWidth || self.mouseTop > self.nzHeight ) {				          
					self.zoomWindow.hide();
					if(self.options.showLens) {self.zoomLens.hide();}
					if(self.options.tint) {self.zoomTint.hide();}
					return;
				}
				//else continue with operations
				else {

					//should already be visible - but make sure
					if(self.options.zoomType == "window") {self.zoomWindow.show();}
					if(self.options.tint) {self.zoomTint.show();}

					//lens options
					if(self.options.showLens) {
						self.zoomLens.show();
						//set background position of lens
						self.lensLeftPos = String(self.mouseLeft - self.zoomLens.width() / 2);
						self.lensTopPos = String(self.mouseTop - self.zoomLens.height() / 2);
					}
					//adjust the background position if the mouse is in one of the outer regions 

					//Top region
					if(self.Etoppos){
						self.lensTopPos = 0;
					}
					//Left Region
					if(self.Eloppos){
						self.windowLeftPos = 0;
						self.lensLeftPos = 0;
						self.tintpos=0;
					}     
					//Set bottom and right region for window mode
					if(self.options.zoomType == "window") {
						if(self.Eboppos){
							self.lensTopPos = Math.max( (self.nzHeight)-self.zoomLens.height()-(self.options.lensBorder*2), 0 );
						} 
						if(self.Eroppos){
							self.lensLeftPos = (self.nzWidth-(self.zoomLens.width())-(self.options.lensBorder*2));
						}  
					}  
					//Set bottom and right region for inner mode
					if(self.options.zoomType == "inner") {
						if(self.Eboppos){
							self.lensTopPos = Math.max( (self.nzHeight)-(self.options.lensBorder*2), 0 );
						} 
						if(self.Eroppos){
							self.lensLeftPos = (self.nzWidth-(self.nzWidth)-(self.options.lensBorder*2));
						}  
					}
					//if lens zoom
					if(self.options.zoomType == "lens") {
						self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomLens.width() / 2) * (-1));   
						self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomLens.height() / 2) * (-1));
						self.zoomLens.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });
						self.setWindowPostition(e);  
					}
					//if tint zoom   
					if(self.options.tint) {
						self.setTintPosition(e);

					}
					//set the css background position 
					if(self.options.zoomType == "window") {
						self.setWindowPostition(e);   
					}
					if(self.options.zoomType == "inner") {
						self.setWindowPostition(e);   
					}
					if(self.options.showLens) {
						self.zoomLens.css({ left: self.lensLeftPos + 'px', top: self.lensTopPos + 'px' })  
					}

				} //end else



			},
			setLensPostition: function( e ) {


			},
			setWindowPostition: function( e ) {
				//return obj.slice( 0, count );
				var self = this;

				if(!isNaN(self.options.zoomWindowPosition)){

					switch (self.options.zoomWindowPosition) { 
					case 1: //done         
						self.windowOffsetTop = (self.options.zoomWindowOffety);//DONE - 1
						self.windowOffsetLeft =(+self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;
					case 2:
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin

							self.windowOffsetTop = ((self.options.zoomWindowHeight/2)-(self.nzHeight/2))*(-1);
							self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						}
						else{ //negative margin

						}
						break;
					case 3: //done        
						self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize*2)); //DONE 3,9
						self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;      
					case 4: //done  
						self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
						self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;
					case 5: //done  
						self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
						self.windowOffsetLeft =(self.nzWidth-self.zoomWindow.width()-(self.options.borderSize*2)); //DONE - 5,15
						break;
					case 6: 
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin
							self.windowOffsetTop = (self.nzHeight);  //DONE - 4,5,6,7,8

							self.windowOffsetLeft =((self.options.zoomWindowWidth/2)-(self.nzWidth/2)+(self.options.borderSize*2))*(-1);  
						}
						else{ //negative margin

						}


						break;
					case 7: //done  
						self.windowOffsetTop = (self.nzHeight);  //DONE - 4,5,6,7,8
						self.windowOffsetLeft = 0; //DONE 7, 13
						break;
					case 8: //done  
						self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 9:  //done  
						self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize*2)); //DONE 3,9
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 10: 
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin

							self.windowOffsetTop = ((self.options.zoomWindowHeight/2)-(self.nzHeight/2))*(-1);
							self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						}
						else{ //negative margin

						}
						break;
					case 11: 
						self.windowOffsetTop = (self.options.zoomWindowOffety);
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 12: //done  
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 13: //done  
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(0); //DONE 7, 13
						break;
					case 14: 
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin
							self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16

							self.windowOffsetLeft =((self.options.zoomWindowWidth/2)-(self.nzWidth/2)+(self.options.borderSize*2))*(-1);  
						}
						else{ //negative margin

						}

						break;
					case 15://done   
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(self.nzWidth-self.zoomWindow.width()-(self.options.borderSize*2)); //DONE - 5,15
						break;
					case 16:  //done  
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;            
					default: //done  
						self.windowOffsetTop = (self.options.zoomWindowOffety);//DONE - 1
					self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
					} 
				} //end isNAN
				else{
//					WE CAN POSITION IN A CLASS - ASSUME THAT ANY STRING PASSED IS
					self.externalContainer = $('#'+self.options.zoomWindowPosition);
					self.externalContainerWidth = self.externalContainer.width();
					self.externalContainerHeight = self.externalContainer.height();
					self.externalContainerOffset = self.externalContainer.offset();

					self.windowOffsetTop = self.externalContainerOffset.top;//DONE - 1
					self.windowOffsetLeft =self.externalContainerOffset.left; //DONE 1, 2, 3, 4, 16

				}
				self.windowOffsetTop = self.windowOffsetTop + self.options.zoomWindowOffety;
				self.windowOffsetLeft = self.windowOffsetLeft + self.options.zoomWindowOffetx;

				self.zoomWindow.css({ top: self.windowOffsetTop});
				self.zoomWindow.css({ left: self.windowOffsetLeft});

				if(self.options.zoomType == "inner") {
					self.zoomWindow.css({ top: 0});
					self.zoomWindow.css({ left: 0});

				}


				self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1));   
				self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));
				if(self.Etoppos){self.windowTopPos = 0;}
				if(self.Eloppos){self.windowLeftPos = 0;}     
				if(self.Eboppos){self.windowTopPos = (self.largeHeight-self.zoomWindow.height())*(-1);} 
				if(self.Eroppos){self.windowLeftPos = ((self.largeWidth-self.zoomWindow.width())*(-1));}    
				//set the css background position 


				if(self.options.zoomType == "window") {

					//overrides for images not zoomable
					if(self.widthRatio <= 1){
						self.windowLeftPos = 0;
					}

					if(self.heightRatio <= 1){
						self.windowTopPos = 0;
					}

					// adjust images less than the window height

					if(self.largeHeight < self.options.zoomWindowHeight){
						self.windowTopPos = 0;
					}
					if(self.largeWidth < self.options.zoomWindowWidth){
						self.windowLeftPos = 0;
					}       

					//set the zoomwindow background position
					if (self.options.easing){

						$.easing.zoomsmoothmove = function (x, t, b, c, d) {
							// return -c *(t/=d)*(t-2) + b;
							//return c * Math.sin(t/d * (Math.PI/2)) + b;  //easeoutsin
							// return -c *(t/=d)*(t-2) + b;//easeoutquad
							return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;     //ease out expo
						}; 
						//check support for x/y background position
						var $div = $('<div style="background-position: 3px 5px">');
						$.support.bgPos   = $div.css('backgroundPosition')  === "3px 5px" ? true : false;
						$.support.bgPosXY = $div.css('backgroundPositionX') === "3px" ? true : false;
						$div = null;

						//if no xy support
						if ($.support.bgPos && !$.support.bgPosXY) {
							var bgpos = 'background-position', cc = $.camelCase;
							function normalize(value) {
								var h = '100%', z = '0px', options = {top : z, bottom: h, left: z, right: h};
								return options[value] || value;
							}
							$.each(['x', 'y'], function (i, v) {
								var camelCase = cc(bgpos + '-' + v);
								$.cssHooks[camelCase] = {
										get: function (elem) {
											var pos = $.css(elem, bgpos).split(/\s+/, 2);
											return normalize(pos[i]);
										},
										set: function (elem, value) {
											var pos = $.css(elem, bgpos).split(/\s+/, 2);
											pos[i] = normalize(value);
											$.style(elem, bgpos, pos.join(' '));
										}
								};
								$.fx.step[camelCase] = function (fx) {
									$.style(fx.elem, fx.prop, fx.now);
								};
							});
							//
							self.zoomWindow.stop().animate({
								backgroundPositionY: self.windowTopPos,
								backgroundPositionX: self.windowLeftPos
							},{queue:false,duration:self.options.easingDuration,easing:'zoomsmoothmove'});
						}
						else{
							self.zoomWindow.animate({
								'background-position-x': self.windowLeftPos,
								'background-position-y': self.windowTopPos
							},{queue:false,duration:self.options.easingDuration,easing:'zoomsmoothmove'});
						}



					}
					else{
						self.zoomWindow.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });       
					}


				}
				//set the css background position 
				if(self.options.zoomType == "inner") {

					self.zoomWindow.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });
				}
			},
			setTintPosition: function(e){
				var self = this;
				self.nzOffset = self.$elem.offset();
				self.tintpos = String(((e.pageX - self.nzOffset.left)-(self.zoomLens.width() / 2)) * (-1)); 
				self.tintposy = String(((e.pageY - self.nzOffset.top) - self.zoomLens.height() / 2) * (-1));	
				if(self.Etoppos){
					self.tintposy = 0;
				}
				if(self.Eloppos){
					self.tintpos=0;
				}     
				if(self.Eboppos){
					self.tintposy = (self.nzHeight-self.zoomLens.height()-(self.options.lensBorder*2))*(-1);
				} 
				if(self.Eroppos){
					self.tintpos = ((self.nzWidth-self.zoomLens.width()-(self.options.lensBorder*2))*(-1));
				}    
				if(self.options.tint) {
					self.zoomTint.css({opacity:self.options.tintOpacity}).animate().fadeIn("slow"); 
					self.zoomTintImage.css({'left': self.tintpos-self.options.lensBorder+'px'});
					self.zoomTintImage.css({'top': self.tintposy-self.options.lensBorder+'px'});
				}
			},

			swaptheimage: function(smallimage, largeimage){
				var self = this;
				var newImg = new Image(); 
				newImg.onload = function() {
					self.largeWidth = newImg.width;
					self.largeHeight = newImg.height;
					self.zoomImage = largeimage;
					self.swapAction(smallimage, largeimage);
					return;              
				}          
				newImg.src = largeimage; // this must be done AFTER setting onload

			},
			swapAction: function(smallimage, largeimage){


				var self = this;    

				var newImg2 = new Image(); 
				newImg2.onload = function() {
					//re-calculate values
					self.nzHeight = newImg2.height;
					self.nzWidth = newImg2.width;


					self.doneCallback();  
					return;      
				}          
				newImg2.src = smallimage; 

				//swaps the main image
				//self.$elem.attr("src",smallimage);
				//swaps the zoom image
				self.zoomWindow.css({ backgroundImage: "url('" + largeimage + "')" }); 

				self.currentImage = largeimage;

				self.$elem.attr("src",smallimage);       
			},
			doneCallback: function(){

				var self = this;


				if(self.options.tint) {
					self.zoomTintImage.attr("src",largeimage);
					//self.zoomTintImage.attr("width",elem.data("image"));
					self.zoomTintImage.attr("height",self.$elem.height());
					//self.zoomTintImage.attr('src') = elem.data("image");
					self.zoomTintImage.css({ height: self.$elem.height()}); 
					self.zoomTint.css({ height: self.$elem.height()});

				}
				self.nzOffset = self.$elem.offset();
				self.nzWidth = self.$elem.width();
				self.nzHeight = self.$elem.height();
				//   alert("THIS");
				//ratio of the large to small image
				self.widthRatio = self.largeWidth / self.nzWidth;
				self.heightRatio = self.largeHeight / self.nzHeight; 

				//NEED TO ADD THE LENS SIZE FOR ROUND
				// adjust images less than the window height

				if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
					lensHeight = self.nzHeight;              
				}
				else{
					lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
				}
				if(self.largeWidth < self.options.zoomWindowWidth){
					lensWidth = self.nzHWidth;
				}       
				else{
					lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
				}


				self.zoomLens.css('width', lensWidth);    

				self.zoomLens.css('height', lensHeight); 





			},
			getCurrentImage: function(){
				var self = this;  
				return self.zoomImage; 
			}, 
			getGalleryList: function(){
				var self = this;   
				//loop through the gallery options and set them in list for fancybox
				self.gallerylist = [];
				if (self.options.gallery){ 


					$('#'+self.options.gallery + ' a').each(function() {

						var img_src = '';
						if($(this).data("zoom-image")){
							img_src = $(this).data("zoom-image");
						}
						else if($(this).data("image")){
							img_src = $(this).data("image");
						}			
						//put the current image at the start
						if(img_src == self.zoomImage){
							self.gallerylist.unshift({
								href: ''+img_src+'',
								title: $(this).find('img').attr("title")
							});	
						}
						else{
							self.gallerylist.push({
								href: ''+img_src+'',
								title: $(this).find('img').attr("title")
							});
						}


					});
				}                                                       
				//if no gallery - return current image
				else{
					self.gallerylist.push({
						href: ''+self.zoomImage+'',
						title: $(this).find('img').attr("title")
					}); 
				}
				return self.gallerylist;

			}

	};




	$.fn.elevateZoom = function( options ) {
		return this.each(function() {
			var elevate = Object.create( ElevateZoom );

			elevate.init( options, this );

			$.data( this, 'elevateZoom', elevate );

		});
	};

	$.fn.elevateZoom.options = {
			easing: false,
			easingType: 'zoomdefault',
			easingDuration: 2000,
			lensSize: 200,
			zoomWindowWidth: 400,
			zoomWindowHeight: 400,
			zoomWindowOffetx: 0,
			zoomWindowOffety: 0,
			zoomWindowPosition: 1,
			lensFadeIn: false,
			lensFadeOut: false,
			debug: false,
			zoomWindowFadeIn: false,
			zoomWindowFadeOut: false,
			zoomWindowAlwaysShow: false,
			zoomTintFadeIn: false,
			zoomTintFadeOut: false,
			borderSize: 4,
			showLens: true,
			borderColour: "#888",
			lensBorder: 1,
			lensShape: "square", //can be "round"
			zoomType: "window", //window is default,  also "lens" available -
			containLensZoom: false,
			lensColour: "white", //colour of the lens background
			lensOpacity: 0.4, //opacity of the lens
			lenszoom: false,
			tint: false, //enable the tinting
			tintColour: "#333", //default tint color, can be anything, red, #ccc, rgb(0,0,0)
			tintOpacity: 0.4, //opacity of the tint
			gallery: false,
			cursor:"default", // user should set to what they want the cursor as, if they have set a click function
			responsive:false,
			onComplete: $.noop,
			onZoomedImageLoaded: function() {}
	};

})( jQuery, window, document );
