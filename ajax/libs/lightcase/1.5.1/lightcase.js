/*
 * Lightcase - jQuery Plugin
 * The smart and flexible Lightbox Plugin.
 *
 * @author		Cornel Boppart <cornel@bopp-art.com>
 * @copyright	Author
 *
 * @version		1.5.1 (21/04/2014)
 */

;(function($) {
	window.lightcase = {
		cache : {}
		
		,support : {}

		,labels : {
			'errorMessage' : 'Source could not be found...'
			,'sequenceInfo.of' : ' of '
			,'close' : 'Close'
			,'navigator.prev' : 'Prev'
			,'navigator.next' : 'Next'
			,'navigator.play' : 'Play'
			,'navigator.pause' : 'Pause'
		}

		/**
		 * Initializes the plugin
		 *
		 * @param	{object}	options
		 * @return	{void}
		 */
		,init : function(options) {
			$(this).unbind('click').click(function(event) {
				event.preventDefault();
				$(this).lightcase('start', options);
			});
		}

		/**
		 * Starts the plugin
		 *
		 * @param	{object}	options
		 * @return	{void}
		 */
		,start : function(options) {
			lightcase.settings = $.extend({
				idPrefix : 'lightcase-'
				,classPrefix : 'lightcase-'
				,transition : 'elastic'
				,transitionIn : null
				,transitionOut : null
				,cssTransitions : true
				,speedIn : 350
				,speedOut : 250
				,maxWidth : 800
				,maxHeight : 500
				,forceWidth : false
				,forceHeight : false
				,liveResize : true
				,fullScreenModeForMobile : true
				,mobileMatchExpression : /(iphone|ipod|ipad|android|blackberry|symbian)/
				,disableShrink : false
				,shrinkFactor : .75
				,overlayOpacity : .9
				,slideshow : false
				,timeout : 5000
				,swipe : true
				,useKeys : true
				,navigateEndless : true
				,closeOnOverlayClick : true
				,showTitle : true
				,showCaption : true
				,showSequenceInfo : true
				,inline : {
					width : 'auto'
					,height : 'auto'
				}
				,ajax : {
					width : 'auto'
					,height : 'auto'
					,type : 'get'
					,dataType : 'html'
					,data : {}
				}
				,iframe : {
					width : 800
					,height : 500
					,frameborder : 0
				}
				,flash : {
					width : 400
					,height : 205
					,wmode : 'transparent'
				}
				,video : {
					width : 400
					,height : 225
					,poster : ''
					,preload : 'auto'
					,controls : true
					,autobuffer : true
					,autoplay : true
					,loop : false
				}
				,type : null
				,typeMapping : {
					'image' : 'jpg,jpeg,gif,png,bmp'
					,'flash' : 'swf'
					,'video' : 'mp4,mov,ogv,ogg,webm'
					,'iframe' : 'html,php'
					,'ajax' : 'txt'
					,'inline' : '#'
				}
				,errorMessage : function() {
					return '<p class="' + lightcase.settings.classPrefix + 'error">' + lightcase.labels['errorMessage'] + '</p>';
				}
				,markup : function() {
					$('body').append(
						$overlay = $('<div id="' + lightcase.settings.idPrefix + 'overlay"></div>')
						,$loading = $('<div id="' + lightcase.settings.idPrefix + 'loading"></div>')
						,$case = $('<div id="' + lightcase.settings.idPrefix + 'case" aria-hidden="true" role="dialog"></div>')
					);
					$case.append(
						$content = $('<div class="' + lightcase.settings.classPrefix + 'content"></div>')
						,$info = $('<div class="' + lightcase.settings.classPrefix + 'info"></div>')
						,$close = $('<a href="#" class="' + lightcase.settings.classPrefix + 'close">' + lightcase.labels['close'] + '</a>')
					);
					$info.append(
						$sequenceInfo = $('<div class="' + lightcase.settings.classPrefix + 'sequenceInfo"></div>')
						,$title = $('<h4 class="' + lightcase.settings.classPrefix + 'title"></h4>')
						,$caption = $('<p class="' + lightcase.settings.classPrefix + 'caption"></p>')
					);
					$content.append(
						$contentInner = $('<div class="' + lightcase.settings.classPrefix + 'contentInner"></div>')
						,$nav = $('<div class="' + lightcase.settings.classPrefix + 'nav"></div>')
					);
					$nav.append(
						$prev = $('<a href="#" class="' + lightcase.settings.classPrefix + 'prev"><span>' + lightcase.labels['navigator.prev'] + '</span></a>').hide()
						,$next = $('<a href="#" class="' + lightcase.settings.classPrefix + 'next"><span>' + lightcase.labels['navigator.next'] + '</span></a>').hide()
						,$play = $('<a href="#" class="' + lightcase.settings.classPrefix + 'play"><span>' + lightcase.labels['navigator.play'] + '</span></a>').hide()
						,$pause = $('<a href="#" class="' + lightcase.settings.classPrefix + 'pause"><span>' + lightcase.labels['navigator.pause'] + '</span></a>').hide()
					);
				}
				,onInit : function() {}
				,onStart : function() {}
				,onFinish : function() {}
			}, options);
			
			lightcase.objectData = lightcase.getObjectData(this);
			lightcase.dimensions = lightcase.getDimensions();

				// Call hook function on initialization
			lightcase.settings.onInit();

			lightcase.addElements();
			lightcase.lightcaseOpen();
		}
		
		/**
		 * Gets the object data
		 *
		 * @param	{object}	$object
		 * @return	{object}	objectData
		 */
		,getObjectData : function($object) {
		 	var objectData = {
				$link : $object
				,title : $object.attr('title')
				,caption : $object.children('img').attr('alt')
				,url : lightcase.verifyDataUrl($object.attr('data-href') || $object.attr('href'))
				,requestType : lightcase.settings.ajax.type
				,requestData : lightcase.settings.ajax.data
				,responseDataType : lightcase.settings.ajax.dataType
				,rel : $object.attr('data-rel')
				,type : lightcase.settings.type || lightcase.verifyDataType($object.attr('data-href') || $object.attr('href'))
				,isPartOfSequence : lightcase.isPartOfSequence($object.attr('data-rel'), ':')
				,isPartOfSequenceWithSlideshow : lightcase.isPartOfSequence($object.attr('data-rel'), ':slideshow')
				,currentIndex : $('[data-rel="' + $object.attr('data-rel') + '"]').index($object)
				,sequenceLength : $('[data-rel="' + $object.attr('data-rel') + '"]').length
			};

				// Add sequence info to objectData
			objectData.sequenceInfo = (objectData.currentIndex + 1) + lightcase.labels['sequenceInfo.of'] + objectData.sequenceLength;

			return objectData;
		}

		/**
		 * Verifies if the link is part of a sequence
		 *
		 * @param	{string}	rel
		 * @param	{string}	expression
		 * @return	{boolean}
		 */
		,isPartOfSequence : function(rel, expression) {
			var getSimilarLinks = $('[data-rel="' + rel + '"]')
				,regexp = new RegExp(expression);

			if (regexp.test(rel) && getSimilarLinks.length > 1) {
				return true;
			} else {
				return false;
			}
		}

		/**
		 * Verifies if the slideshow should be enabled
		 *
		 * @return	{boolean}
		 */
		,isSlideshowEnabled : function() {
			if (lightcase.objectData.isPartOfSequence && (lightcase.settings.slideshow === true || lightcase.objectData.isPartOfSequenceWithSlideshow === true)) {
				return true;
			} else {
				return false;
			}
		}

		/**
		 * Loads the new content to show
		 *
		 * @return	{void}
		 */
		,loadContent : function() {
			if (lightcase.cache.originalObject) {
				lightcase.restoreObject();
			}
			
			lightcase.createObject();
		}
		
		/**
		 * Creates a new object
		 *
		 * @return	{void}
		 */
		,createObject : function() {
				// Create object
			switch (lightcase.objectData.type) {
				case 'image' :
					var $object = $(new Image());
					$object.attr({
							// The time expression is required to prevent the binding of an image load
						'src' : lightcase.objectData.url + '?random=' + (new Date()).getTime()
						,'alt' : lightcase.objectData.title
					});
					break;
				case 'inline' :
					var $object = $('<div class="' + lightcase.settings.classPrefix + 'inlineWrap"></div>');
					$object.html(lightcase.cloneObject($(lightcase.objectData.url)));

						// Add custom attributes from lightcase.settings
					$.each(lightcase.settings.inline, function(name, value) {
						$object.attr('data-' + name, value);
					});
					break;
				case 'ajax' :
					var $object = $('<div class="' + lightcase.settings.classPrefix + 'inlineWrap"></div>');
						
						// Add custom attributes from lightcase.settings
					$.each(lightcase.settings.ajax, function(name, value) {
						if (name !== 'data') {
							$object.attr('data-' + name, value);
						}
					});
					break;
				case 'flash' :
					var $object = $('<embed src="' + lightcase.objectData.url + '" type="application/x-shockwave-flash"></embed>');

						// Add custom attributes from lightcase.settings
					$.each(lightcase.settings.flash, function(name, value) {
						$object.attr(name, value);
					});
					break;
				case 'video' :
					var $object = $('<video></video>');
					$object.attr('src', lightcase.objectData.url);

						// Add custom attributes from lightcase.settings
					$.each(lightcase.settings.video, function(name, value) {
						$object.attr(name, value);
					});
					break;
				default :
					var $object = $('<iframe></iframe>');
					$object.attr({
						'src' : lightcase.objectData.url
					});

						// Add custom attributes from lightcase.settings
					$.each(lightcase.settings.iframe, function(name, value) {
						$object.attr(name, value);
					});
			}
			
			lightcase.addObject($object);
			lightcase.loadObject($object);
		}
		
		/**
		 * Adds the new object to the markup
		 *
		 * @param	{object}	$object
		 * @return	{void}
		 */
		,addObject : function($object) {
				// Add object to content holder
			$contentInner.html($object);

				// Start loading
			lightcase.loading('start');

				// Call hook function on start
			lightcase.settings.onStart();

				// Add sequenceInfo to the content holder or hide if its empty
			if (lightcase.settings.showSequenceInfo === true && lightcase.objectData.isPartOfSequence) {
				$sequenceInfo.html(lightcase.objectData.sequenceInfo);
				$sequenceInfo.show();
			} else {
				$sequenceInfo.empty();
				$sequenceInfo.hide();
			}
				// Add title to the content holder or hide if its empty
			if (lightcase.settings.showTitle === true && lightcase.objectData.title !== undefined && lightcase.objectData.title !== '') {
				$title.html(lightcase.objectData.title);
				$title.show();
			} else {
				$title.empty();
				$title.hide();
			}
				// Add caption to the content holder or hide if its empty
			if (lightcase.settings.showCaption === true && lightcase.objectData.caption !== undefined && lightcase.objectData.caption !== '') {
				$caption.html(lightcase.objectData.caption);
				$caption.show();
			} else {
				$caption.empty();
				$caption.hide();
			}
		}
		
		/**
		 * Loads the new object
		 *
		 * @param	{object}	$object
		 * @return	{void}
		 */
		,loadObject : function($object) {
				// Load the object
			switch (lightcase.objectData.type) {
				case 'inline' :
					if ($(lightcase.objectData.url)) {
						lightcase.showContent($object);
					} else {
						lightcase.error();
					}
					break;
				case 'ajax' :
					$.ajax(
						$.extend({}, lightcase.settings.ajax, {
							url : lightcase.objectData.url
							,type : lightcase.objectData.requestType
							,dataType : lightcase.objectData.requestDataType
							,data : lightcase.objectData.requestData
							,success : function(data, textStatus, jqXHR) {
									// Unserialize if data is transeferred as json
								if (lightcase.objectData.responseDataType === 'json') {
									data = $.parseJSON(data);
								}
								$object.html(data);
								lightcase.showContent($object);
							}
							,error : function(jqXHR, textStatus, errorThrown) {
								lightcase.error();
							}
						})
					);
					break;
				case 'flash' :
					lightcase.showContent($object);
					break;
				case 'video' :
					if (typeof($object.get(0).canPlayType) === 'function' || $case.find('video').length === 0) {
						lightcase.showContent($object);
					} else {
						lightcase.error();
					}
					break;
				default :
					if (lightcase.objectData.url) {
						$object.load(function() {
							lightcase.showContent($object);
						});
						$object.error(function() {
							lightcase.error();
						});
					} else {
						lightcase.error();
					}
			}
		}

		/**
		 * Throws an error message if something went wrong
		 *
		 * @return	{void}
		 */
		,error : function() {
			lightcase.objectData.type = 'error';
			var $object = $('<div class="' + lightcase.settings.classPrefix + 'inlineWrap"></div>');

			$object.html(lightcase.settings.errorMessage);
			$contentInner.html($object);

			lightcase.showContent($contentInner);
		}
		
		/**
		 * Calculates the dimensions to fit content
		 *
		 * @param	{object}	$object
		 * @return	{void}
		 */
		,calculateDimensions : function($object) {
			lightcase.cleanupDimensions();
			
				// Set default dimensions
			var dimensions = {
				objectWidth : $object.attr('width') ? $object.attr('width') : $object.attr('data-width') 
				,objectHeight : $object.attr('height') ? $object.attr('height') : $object.attr('data-height')
				,maxWidth : parseInt(lightcase.dimensions.windowWidth * lightcase.settings.shrinkFactor)
				,maxHeight : parseInt(lightcase.dimensions.windowHeight * lightcase.settings.shrinkFactor)
			};
			
			if (!lightcase.settings.disableShrink) {
					// If the auto calculated maxWidth/maxHeight greather than the userdefined one, use that.
				if (dimensions.maxWidth > lightcase.settings.maxWidth) {
					dimensions.maxWidth = lightcase.settings.maxWidth;
				}
				if (dimensions.maxHeight > lightcase.settings.maxHeight) {
					dimensions.maxHeight = lightcase.settings.maxHeight;
				}
				
					// Calculate the difference between screen width/height and image width/height
				dimensions.differenceWidthAsPercent = parseInt(100 / dimensions.maxWidth * dimensions.objectWidth);
				dimensions.differenceHeightAsPercent = parseInt(100 / dimensions.maxHeight * dimensions.objectHeight);
				
				switch (lightcase.objectData.type) {
					case 'image' :
					case 'flash' :
					case 'video' :
						if (dimensions.differenceWidthAsPercent > 100 && dimensions.differenceWidthAsPercent > dimensions.differenceHeightAsPercent) {
							dimensions.objectWidth = dimensions.maxWidth;
							dimensions.objectHeight = parseInt(dimensions.objectHeight / dimensions.differenceWidthAsPercent * 100);
						}
						if (dimensions.differenceHeightAsPercent > 100 && dimensions.differenceHeightAsPercent > dimensions.differenceWidthAsPercent) {
							dimensions.objectWidth = parseInt(dimensions.objectWidth / dimensions.differenceHeightAsPercent * 100);
							dimensions.objectHeight = dimensions.maxHeight;
						}
						if (dimensions.differenceHeightAsPercent > 100 && dimensions.differenceWidthAsPercent < dimensions.differenceHeightAsPercent) {
							dimensions.objectWidth = parseInt(dimensions.maxWidth / dimensions.differenceHeightAsPercent * dimensions.differenceWidthAsPercent);
							dimensions.objectHeight = dimensions.maxHeight;
						}
	
						break;
					case 'error' :
						if (!isNaN(dimensions.objectWidth) && dimensions.objectWidth > dimensions.maxWidth) {
							dimensions.objectWidth = dimensions.maxWidth;
						}
						
						break;
					default :
						if ((isNaN(dimensions.objectWidth) || dimensions.objectWidth > dimensions.maxWidth) && !lightcase.settings.forceWidth) {
							dimensions.objectWidth = dimensions.maxWidth;
						}
						if (((isNaN(dimensions.objectHeight) && dimensions.objectHeight !== 'auto') || dimensions.objectHeight > dimensions.maxHeight) && !lightcase.settings.forceHeight) {
							dimensions.objectHeight = dimensions.maxHeight;
						}
				}
			}

			lightcase.adjustDimensions($object, dimensions);
		}

		/**
		 * Adjusts the dimensions
		 *
		 * @param	{object}	$object
		 * @param	{object}	dimensions
		 * @return	{void}
		 */
		,adjustDimensions : function($object, dimensions) {
				// Adjust width and height
			$object.css({
				'width' : dimensions.objectWidth
				,'height' : dimensions.objectHeight
				,'max-width' : $object.attr('data-max-width') ? $object.attr('data-max-width') : dimensions.maxWidth
				,'max-height' : $object.attr('data-max-height') ? $object.attr('data-max-height') : dimensions.maxHeight
			});
			
			$contentInner.css({
				'width' : $object.outerWidth()
				,'height' : $object.outerHeight()
				,'max-width' : '100%'
			});
			
			$case.css({
				'width' : $contentInner.outerWidth()
			});

				// Adjust margin
			$case.css({
				'margin-top' : parseInt(-($case.outerHeight() / 2))
				,'margin-left' : parseInt(-($case.outerWidth() / 2))
			});
		}

		/**
		 * Handles the loading
		 *
		 * @param	{string}	process
		 * @return	{void}
		 */
		,loading : function(process) {
			if (process === 'start') {
				$case.addClass(lightcase.settings.classPrefix + 'loading');
				$loading.show();
			} else if (process === 'end') {
				$case.removeClass(lightcase.settings.classPrefix + 'loading');
				$loading.hide();
			}
		}

		/**
		 * Gets the client screen dimensions
		 *
		 * @return	{object}	dimensions
		 */
		,getDimensions : function() {
			return {
				windowWidth : $(window).innerWidth()
				,windowHeight : $(window).innerHeight()
			};
		}

		/**
		 * Verifies the url
		 *
		 * @param	{string}	dataUrl
		 * @return	{string}	dataUrl	Clean url for processing content
		 */
		,verifyDataUrl : function(dataUrl) {
			if (!dataUrl || dataUrl === undefined || dataUrl === '') {
				return false;
			}

			if (dataUrl.indexOf('#') > -1) {
				dataUrl = dataUrl.split('#');
				dataUrl = '#' + dataUrl[dataUrl.length - 1];
			}

			return dataUrl;
		}

		/**
		 * Verifies the data type of the content to load
		 *
		 * @param	{string}			url
		 * @return	{string|boolean}	Array key if expression matched, else false
		 */
		,verifyDataType : function(url) {
			var url = lightcase.verifyDataUrl(url)
				,typeMapping = lightcase.settings.typeMapping;

			if (url) {
				for (var key in typeMapping) {
					var suffixArr = typeMapping[key].split(',');

					for (var i = 0; i < suffixArr.length; i++) {
						var suffix = suffixArr[i]
							,regexp = new RegExp('\.(' + suffix + ')$', 'i')
								// Verify only the last 4 characters of the string
							,str = url.split('?')[0].substr(-4);

						if (regexp.test(str) === true) {
							return key;
						} else if (key === 'inline' && (url.indexOf(suffix) > -1 || !url)) {
							return key;
						}
					}
				}
			}

				// If no expression matched, return 'iframe'.
			return 'iframe';
		}

		/**
		 * Extends html markup with the essential tags
		 *
		 * @return	{void}
		 */
		,addElements : function() {
			if ($('[id^="' + lightcase.settings.idPrefix + '"]').length) {
				return;
			}

			lightcase.settings.markup();
		}

		/**
		 * Shows the loaded content
		 *
		 * @param	{object}	$object
		 * @return	{void}
		 */
		,showContent : function($object) {
				// Adds class with the object type
			$case.attr('class', 'type-' + lightcase.objectData.type);
			
			lightcase.cache.object = $object;
			lightcase.calculateDimensions($object);

				// Call hook function on finish
			lightcase.settings.onFinish();
			
			switch (lightcase.settings.transitionIn) {
				case 'scrollTop' :
				case 'scrollRight' :
				case 'scrollBottom' :
				case 'scrollLeft' :
				case 'scrollHorizontal' :
				case 'scrollVertical' :
					lightcase.transition.scroll($case, 'in', lightcase.settings.speedIn);
					lightcase.transition.fade($contentInner, 'in', lightcase.settings.speedIn);
					break;
				case 'elastic' :
					if ($case.css('opacity') < 1) {
						lightcase.transition.zoom($case, 'in', lightcase.settings.speedIn);
						lightcase.transition.fade($contentInner, 'in', lightcase.settings.speedIn);
					}
				case 'fade' :
				case 'fadeInline' :
					lightcase.transition.fade($case, 'in', lightcase.settings.speedIn);
					lightcase.transition.fade($contentInner, 'in', lightcase.settings.speedIn);
					break;
				default :
					lightcase.transition.fade($case, 'in', 0);
			}

				// End loading
			lightcase.loading('end');
			lightcase.busy = false;
		}
		
		/**
		 * Processes the content to show
		 *
		 * @return	{void}
		 */
		,processContent : function() {
			lightcase.busy = true;
			
			switch (lightcase.settings.transitionOut) {
				case 'scrollTop' :
				case 'scrollRight' :
				case 'scrollBottom' :
				case 'scrollLeft' :
				case 'scrollVertical' :
				case 'scrollHorizontal' :
					if ($case.is(':hidden')) {
						lightcase.transition.fade($case, 'out', 0, 0, function() {
							lightcase.loadContent();
						});
						lightcase.transition.fade($contentInner, 'out', 0);
					} else {
						lightcase.transition.scroll($case, 'out', lightcase.settings.speedOut, function() {
							lightcase.loadContent();
						});
						lightcase.transition.fade($contentInner, 'out', 0);
					}
					break;
				case 'fade' :
					if ($case.is(':hidden')) {
						lightcase.transition.fade($case, 'out', 0, 0, function() {
							lightcase.loadContent();
						});
					} else {
						lightcase.transition.fade($case, 'out', lightcase.settings.speedOut, 0, function() {
							lightcase.loadContent();
						});
					}
					break;
				case 'fadeInline' :
				case 'elastic' :
					if ($case.is(':hidden')) {
						lightcase.transition.fade($case, 'out', 0, 0, function() {
							lightcase.loadContent();
						});
					} else {
						lightcase.transition.fade($contentInner, 'out', lightcase.settings.speedOut, 0, function() {
							lightcase.loadContent();
						});
					}
					break;
				default :
					lightcase.transition.fade($case, 'out', 0, 0, function() {
						lightcase.loadContent();
					});
			}
		}

		/**
		 * Handles events for gallery buttons
		 *
		 * @return	{void}
		 */
		,handleEvents : function() {
			lightcase.unbindEvents();
			
			$nav.children().hide();
			
				// If slideshow is enabled, show play/pause and start timeout.
			if (lightcase.isSlideshowEnabled()) {
				$play.show();
				$pause.show();
				
					// Only start the timeout if slideshow is not pausing
				if (!$nav.hasClass(lightcase.settings.classPrefix + 'paused')) {
					lightcase.startTimeout();
				}
			}
			
			if (lightcase.settings.liveResize) {
				$(window).resize(function() {
					if (lightcase.isSlideshowEnabled()) {
						lightcase.stopTimeout();
					}
					if (lightcase.open) {
						lightcase.dimensions = lightcase.getDimensions();
						lightcase.calculateDimensions(lightcase.cache.object);
					}
				});
			}
			
			$close.click(function(event) {
				event.preventDefault();
				lightcase.lightcaseClose();
			});

			if (lightcase.settings.closeOnOverlayClick === true) {
				$overlay.css('cursor', 'pointer').click(function(event) {
					event.preventDefault();
					
					lightcase.lightcaseClose();
				});
			}
			
			if (lightcase.settings.useKeys === true) {
				lightcase.addKeyEvents();
			}
			if (!lightcase.objectData.isPartOfSequence) {
				return;
			} else {
				lightcase.nav = lightcase.setNavigation();

				$prev.click(function(event) {
					event.preventDefault();
					
					$prev.unbind('click');
					lightcase.cache.action = 'prev';
					lightcase.nav.$prevItem.click();
					
					if (lightcase.isSlideshowEnabled()) {
						lightcase.stopTimeout();
					}
				});
				
				$next.click(function(event) {
					event.preventDefault();
					
					$next.unbind('click');
					lightcase.cache.action = 'next';
					lightcase.nav.$nextItem.click();
					
					if (lightcase.isSlideshowEnabled()) {
						lightcase.stopTimeout();
					}
				});
				
				if (lightcase.isSlideshowEnabled()) {
					$play.click(function(event) {
						event.preventDefault();
						lightcase.startTimeout();
					});
					$pause.click(function(event) {
						event.preventDefault();
						lightcase.stopTimeout();
					});
				}
				
					// Enable swiping if activated
				if (lightcase.settings.swipe === true) {
					if ($.isPlainObject($.event.special.swipeleft)) {
						$case.on('swipeleft', function(event) {
							event.preventDefault();
							$next.click();
							if (lightcase.isSlideshowEnabled()) {
								lightcase.stopTimeout();
							}
						});
					}
					if ($.isPlainObject($.event.special.swiperight)) {
						$case.on('swiperight', function(event) {
							event.preventDefault();
							$prev.click();
							if (lightcase.isSlideshowEnabled()) {
								lightcase.stopTimeout();
							}
						});
					}
				}
			}
		}
		
		/**
		 * Adds the key events
		 *
		 * @return	{void}
		 */
		,addKeyEvents : function() {
			$(document).keyup(function(event) {
					// Do nothing if lightcase is in process
				if (lightcase.busy) {
					return;
				}

				switch (event.keyCode) {
						// Escape key
					case 27 :
						$close.click();
						break;
						// Backward key
					case 37 :
						if (lightcase.objectData.isPartOfSequence) {
							$prev.click();
						}
						break;
						// Forward key
					case 39 :
						if (lightcase.objectData.isPartOfSequence) {
							$next.click();
						}
						break;
				}
			});
		}

		/**
		 * Starts the slideshow timeout
		 *
		 * @return	{void}
		 */
		,startTimeout : function() {
			$play.hide();
			$pause.show();
			
			lightcase.cache.action = 'next';
			
			$nav.removeClass(lightcase.settings.classPrefix + 'paused');

			lightcase.timeout = setTimeout(function() {
				lightcase.nav.$nextItem.click();
			}, lightcase.settings.timeout);
		}

		/**
		 * Stops the slideshow timeout
		 *
		 * @return	{void}
		 */
		,stopTimeout : function() {
			$play.show();
			$pause.hide();
			
			$nav.addClass(lightcase.settings.classPrefix + 'paused');
			
			clearTimeout(lightcase.timeout);
		}

		/**
		 * Sets the navigator buttons (prev/next)
		 *
		 * @return	{object}	items
		 */
		,setNavigation : function() {
			var $links = $('[data-rel="' + lightcase.objectData.rel + '"]')
				,currentIndex = lightcase.objectData.currentIndex
				,prevIndex = currentIndex - 1
				,nextIndex = currentIndex + 1
				,sequenceLength = lightcase.objectData.sequenceLength - 1
				,items = {
					$prevItem : $links.eq(prevIndex)
					,$nextItem : $links.eq(nextIndex)
				};

			if (currentIndex > 0) {
				$prev.show();
			} else {
				items.$prevItem = $links.eq(sequenceLength);
			}
			if (nextIndex <= sequenceLength) {
				$next.show();
			} else {
				items.$nextItem = $links.eq(0);
			}

			if (lightcase.settings.navigateEndless === true) {
				$prev.show();
				$next.show();
			}

			return items;
		}

		/**
		 * Clones the object for inline elements
		 *
		 * @param	{object}	$object
		 * @return	{object}	$clone
		 */
		,cloneObject : function($object) {
			var $clone = $object.clone()
				,objectId = $object.attr('id');
				
				// If element is hidden, cache the object and remove
			if ($object.is(':hidden')) {
				lightcase.cacheObjectData($object);
				$object.attr('id', lightcase.settings.idPrefix + 'temp-' + objectId).empty();
			} else {
					// Prevent duplicated id's
				$clone.removeAttr('id');
			}
			
			return $clone.show();
		}
		
		/**
		 * Verifies if it is a mobile device
		 *
		 * @return	{boolean}
		 */
		,isMobileDevice : function() {
			var deviceAgent = navigator.userAgent.toLowerCase()
				,agentId = deviceAgent.match(lightcase.settings.mobileMatchExpression);
			
			return agentId ? true : false;
		}
		
		/**
		 * Verifies if css transitions are supported
		 *
		 * @return	{string|boolean}	The transition prefix if supported, else false.
		 */
		,isTransitionSupported : function() {
			var body = $('body').get(0)
				,isTransitionSupported = false
				,transitionMapping = {
					'transition' : ''
					,'WebkitTransition' : '-webkit-'
					,'MozTransition' : '-moz-'
					,'OTransition' : '-o-'
					,'MsTransition' : '-ms-'
				};
				
			for (var key in transitionMapping) {
				if (key in body.style) {
					lightcase.support.transition = transitionMapping[key];
					isTransitionSupported = true;
				}
			}
			
			return isTransitionSupported;
		}
		
		/**
		 * Transition types
		 *
		 */
		,transition : {
			/**
			 * Fades in/out the object
			 *
			 * @param	{object}	$object
			 * @param	{string}	type
			 * @param	{number}	speed
			 * @param	{number}	opacity
			 * @param	{function}	callback
			 * @return	{void}		Animates an object
			 */
			fade : function($object, type, speed, opacity, callback) {
				var isInTransition = type === 'in'
					,startTransition = {}
					,startOpacity = $object.css('opacity')
					,endTransition = {}
					,endOpacity = opacity ? opacity : isInTransition ? 1 : 0
				
				if (!lightcase.open && isInTransition) return;
					
				startTransition['opacity'] = startOpacity;
				endTransition['opacity'] = endOpacity;
					
				$object.css(startTransition).show();
					
					// Css transition
				if (lightcase.support.transitions) {
					endTransition[lightcase.support.transition + 'transition'] = speed + 'ms ease-out';
					
					setTimeout(function() {
						$object.css(endTransition);
					}, 0);
					
					setTimeout(function() {
						$object.css(lightcase.support.transition + 'transition', '');
						
						if (callback && (lightcase.open || !isInTransition)) {
							callback();
						}
					}, speed);
				} else {
						// Fallback to js transition
					$object.stop();
					$object.animate(endTransition, speed, callback);
				}
			}
			
			/**
			 * Scrolls in/out the object
			 *
			 * @param	{object}	$object
			 * @param	{string}	type
			 * @param	{number}	speed
			 * @param	{function}	callback
			 * @return	{void}		Animates an object
			 */
			,scroll : function($object, type, speed, callback) {
				var isInTransition = type === 'in'
					,transition = isInTransition ? lightcase.settings.transitionIn : lightcase.settings.transitionOut
					,direction = 'left'
					,startTransition = {}
					,startOpacity = isInTransition ? 0 : 1
					,startOffset = isInTransition ? '-50%' : '50%'
					,endTransition = {}
					,endOpacity = isInTransition ? 1 : 0
					,endOffset = isInTransition ? '50%' : '-50%';
				
				if (!lightcase.open && isInTransition) return;
				
				switch (transition) {
					case 'scrollTop' :
						direction = 'top';
						break;
					case 'scrollRight' :
						startOffset = isInTransition ? '150%' : '50%';
						endOffset = isInTransition ? '50%' : '150%';
						break;
					case 'scrollBottom' :
						direction = 'top';
						startOffset = isInTransition ? '150%' : '50%';
						endOffset = isInTransition ? '50%' : '150%';
						break;
					case 'scrollHorizontal' : 
						startOffset = isInTransition ? '150%' : '50%';
						endOffset = isInTransition ? '50%' : '-50%';
						break;
					case 'scrollVertical' :
						direction = 'top';
						startOffset = isInTransition ? '-50%' : '50%';
						endOffset = isInTransition ? '50%' : '150%';
						break;
				}
				
				if (lightcase.cache.action === 'prev') {
					switch (transition) {
						case 'scrollHorizontal' : 
							startOffset = isInTransition ? '-50%' : '50%';
							endOffset = isInTransition ? '50%' : '150%';
							break;
						case 'scrollVertical' : 
							startOffset = isInTransition ? '150%' : '50%';
							endOffset = isInTransition ? '50%' : '-50%';
							break;
					}
				}
				
				startTransition['opacity'] = startOpacity;
				startTransition[direction] = startOffset;
				
				endTransition['opacity'] = endOpacity;
				endTransition[direction] = endOffset;
					
				$object.css(startTransition).show();
				
					// Css transition
				if (lightcase.support.transitions) {
					endTransition[lightcase.support.transition + 'transition'] = speed + 'ms ease-out';
					
					setTimeout(function() {
						$object.css(endTransition);
					}, 0);
					
					setTimeout(function() {
						$object.css(lightcase.support.transition + 'transition', '');

						if (callback && (lightcase.open || !isInTransition)) {
							callback();
						}
					}, speed);
				} else {
						// Fallback to js transition
					$object.stop();
					$object.animate(endTransition, speed, callback);
				}
			}
			
			/**
			 * Zooms in/out the object
			 *
			 * @param	{object}	$object
			 * @param	{string}	type
			 * @param	{number}	speed
			 * @param	{function}	callback
			 * @return	{void}		Animates an object
			 */
			,zoom : function($object, type, speed, callback) {
				var isInTransition = type === 'in'
					,startTransition = {}
					,startOpacity = $object.css('opacity')
					,startScale = isInTransition ? 'scale(0.75)' : 'scale(1)'
					,endTransition = {}
					,endOpacity = isInTransition ? 1 : 0
					,endScale = isInTransition ? 'scale(1)' : 'scale(0.75)';
					
				if (!lightcase.open && isInTransition) return;
					
				startTransition['opacity'] = startOpacity;
				startTransition[lightcase.support.transition + 'transform'] = startScale;
				
				endTransition['opacity'] = endOpacity;
					
				$object.css(startTransition).show();
				
					// Css transition
				if (lightcase.support.transitions) {
					endTransition[lightcase.support.transition + 'transform'] = endScale;
					endTransition[lightcase.support.transition + 'transition'] = speed + 'ms ease-out';
					
					setTimeout(function() {
						$object.css(endTransition);
					}, 0);
					
					setTimeout(function() {
						$object.css(lightcase.support.transition + 'transform', '');
						$object.css(lightcase.support.transition + 'transition', '');
						
						if (callback && (lightcase.open || !isInTransition)) {
							callback();
						}
					}, speed);
				} else {
						// Fallback to js transition
					$object.stop();
					$object.animate(endTransition, speed, callback);
				}
			}
		}
		
		/**
		 * Caches the object data
		 *
		 * @param	{object}	$object
		 * @return	{void}
		 */
		,cacheObjectData : function($object) {
			$.data($object, 'cache', {
				id : $object.attr('id')
				,content : $object.html()
			});
			
			lightcase.cache.originalObject = $object;
		}
		
		/**
		 * Restores the object from cache
		 *
		 * @return	void
		 */
		,restoreObject : function() {
			var $object = $('[id^="' + lightcase.settings.idPrefix + 'temp-"]');
		
			$object.attr('id', $.data(lightcase.cache.originalObject, 'cache').id);
			$object.html($.data(lightcase.cache.originalObject, 'cache').content);
		}
		
		/**
		 * Enters into the lightcase view
		 *
		 * @return	{void}
		 */
		,lightcaseOpen : function() {
			lightcase.open = true;
			
			lightcase.support.transitions = lightcase.settings.cssTransitions ? lightcase.isTransitionSupported() : false;
			lightcase.support.mobileDevice = lightcase.isMobileDevice();
			
			if (lightcase.support.mobileDevice) {
				$('html').addClass(lightcase.settings.classPrefix + 'isMobileDevice');
				
				if (lightcase.settings.fullScreenModeForMobile) {
					lightcase.switchToFullScreenMode();
				}
			}
			
			if (!lightcase.settings.transitionIn) {
				lightcase.settings.transitionIn = lightcase.settings.transition;
			}
			if (!lightcase.settings.transitionOut) {
				lightcase.settings.transitionOut = lightcase.settings.transition;
			}
			
			switch (lightcase.settings.transitionIn) {
				case 'fade' :
				case 'fadeInline' :
				case 'elastic' :
				case 'scrollTop' :
				case 'scrollRight' :
				case 'scrollBottom' :
				case 'scrollLeft' :
				case 'scrollVertical' :
				case 'scrollHorizontal' :
					if ($case.is(':hidden')) {
						$overlay.css('opacity', 0);
						$case.css('opacity', 0);
						$contentInner.css('opacity', 0);
					}
					lightcase.transition.fade($overlay, 'in', lightcase.settings.speedIn, lightcase.settings.overlayOpacity, function() {
						lightcase.handleEvents();
						lightcase.processContent();
					});
					break;
				default :
					lightcase.transition.fade($overlay, 'in', 0, lightcase.settings.overlayOpacity, function() {
						lightcase.handleEvents();
						lightcase.processContent();
					});
			}
			
			$('html').addClass(lightcase.settings.classPrefix + 'open');
			$case.attr('aria-hidden', 'false');
		}

		/**
		 * Escapes from the lightcase view
		 *
		 * @return	{void}
		 */
		,lightcaseClose : function() {
			lightcase.open = false;
			$loading.hide();
			
			lightcase.unbindEvents();
			
			if (lightcase.isSlideshowEnabled()) {
				lightcase.stopTimeout();
			}
			
			$('html').removeClass(lightcase.settings.classPrefix + 'open');
			$case.attr('aria-hidden', 'true');
			
			switch (lightcase.settings.transitionOut) {
				case 'fade' :
				case 'fadeInline' :
				case 'scrollTop' :
				case 'scrollRight' :
				case 'scrollBottom' :
				case 'scrollLeft' :
				case 'scrollVertical' :
				case 'scrollHorizontal' :
					lightcase.transition.fade($case, 'out', lightcase.settings.speedOut, 0, function() {
						lightcase.transition.fade($overlay, 'out', lightcase.settings.speedOut, 0, function() {
							lightcase.cleanup();
						});
					});
					break;
				case 'elastic' :
					lightcase.transition.zoom($case, 'out', lightcase.settings.speedOut, function() {
						lightcase.transition.fade($overlay, 'out', lightcase.settings.speedOut, 0, function() {
							lightcase.cleanup();
						});
					});
					break;
				default :
					lightcase.cleanup();
			}
		}
		
		/**
		 * Switches to the fullscreen mode
		 *
		 * @return	{void}
		 */
		,switchToFullScreenMode : function() {
			lightcase.settings.shrinkFactor = 1;
			lightcase.settings.overlayOpacity = 1;
			
			if (lightcase.settings.transitionIn !== 'none') {
				lightcase.settings.transitionIn = 'fade';
			}
			if (lightcase.settings.transitionOut !== 'none') {
				lightcase.settings.transitionOut = 'fade';
			}
			
			$('html').addClass(lightcase.settings.classPrefix + 'fullScreenMode');
		}
		
		/**
		 * Unbinds all given events
		 *
		 * @return	{void}
		 */
		,unbindEvents : function() {
				// Unbind overlay event
			$overlay.unbind('click');

				// Unbind key events
			$(document).unbind('keyup');
			
				// Unbind swipe events
			$case.unbind('swipeleft').unbind('swiperight');
			
				// Unbind navigator events
			$nav.children('a').unbind('click');
			
				// Unbind close event
			$close.unbind('click');
		}

		/**
		 * Cleans up the dimensions
		 *
		 * @return	{void}
		 */
		,cleanupDimensions : function() {
			var opacity = $contentInner.css('opacity');
			
			$case.css({
				'width' : ''
				,'height' : ''
				,'top' : ''
				,'left' : ''
				,'margin-top' : ''
				,'margin-left' : ''
			});
			
			$contentInner.removeAttr('style').css('opacity', opacity);
			$contentInner.children().removeAttr('style');
		}

		/**
		 * Cleanup after aborting lightcase
		 *
		 * @return	{void}
		 */
		,cleanup : function() {
			lightcase.cleanupDimensions();
			if (lightcase.isSlideshowEnabled()) {
				lightcase.stopTimeout();
				$nav.removeClass(lightcase.settings.classPrefix + 'paused');
			}

			$loading.hide();
			$overlay.hide();

			$case.hide().removeAttr('class');
			$contentInner.empty().hide();
			$info.children().empty();
			
			if (lightcase.cache.originalObject) {
				lightcase.restoreObject();
			}
			
				// Restore cache
			lightcase.cache = {};
		}
	};

	$.fn.lightcase = function(method) {
			// Method calling logic
		if (lightcase[method]) {
			return lightcase[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return lightcase.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.lightcase');
		}
	};
}(jQuery));