/*
 * Lightcase - jQuery Plugin
 * The smart and flexible Lightbox Plugin.
 *
 * @author		Cornel Boppart <cornel@bopp-art.com>
 * @copyright	Author
 *
 * @version		1.1.4 (01/02/2013)
 */

jQuery.noConflict();

(function($) {
	window.lightcase = {
		cache : {}
		
		,labels : {
			'errorMessage' : 'Could not found the requested source...'
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
		 * @param	array	options
		 * @return	void
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
		 * @param	array	options
		 * @return	void
		 */
		,start : function(options) {
			lightcase.objectData = lightcase.getObjectData(this);
			lightcase.dimensions = lightcase.getDimensions();
			lightcase.settings = $.extend({
				id : 'lightcase-case'
				,tempIdPrefix : 'lightcase-temp-'
				,transition : 'elastic'
				,speedIn : 250
				,speedOut : 250
				,maxWidth : 800
				,maxHeight : 500
				,forceWidth : false
				,forceHeight : false
				,disableShrink : false
				,shrinkFactor : .75
				,overlayOpacity : .85
				,slideshow : false
				,timeout : 5000
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
				,iframe : {
					width : 'auto'
					,height : 'auto'
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
				,errorMessage : '<p class="lightcase-error">' + lightcase.labels['errorMessage'] + '</p>'
				,markup : function() {
					$('body').append(
						$overlay = $('<div id="lightcase-overlay"></div>')
						,$loading = $('<div id="lightcase-loading"></div>')
						,$case = $('<div id=' + lightcase.settings.id + '></div>')
					);
					$case.append(
						$content = $('<div class="content"></div>')
						,$close = $('<a href="#" class="close">' + lightcase.labels['close'] + '</a>')
						,$sequenceInfo = $('<div class="sequenceInfo"></div>')
						,$title = $('<h4 class="title"></h4>')
						,$caption = $('<p class="caption"></p>')
					);
					$content.append(
						$contentInner = $('<div class="contentInner"></div>')
						,$nav = $('<div class="nav"></div>')
					);
					$nav.append(
						$prev = $('<a href="#" class="prev"><span>' + lightcase.labels['navigator.prev'] + '</span></a>').hide()
						,$next = $('<a href="#" class="next"><span>' + lightcase.labels['navigator.next'] + '</span></a>').hide()
						,$play = $('<a href="#" class="play"><span>' + lightcase.labels['navigator.play'] + '</span></a>').hide()
						,$pause = $('<a href="#" class="pause"><span>' + lightcase.labels['navigator.pause'] + '</span></a>').hide()
					);
				}
				,onStart : function() {}
				,onFinish : function() {}
			}, options);

			lightcase.addElements();
			lightcase.lightcaseOpen();
		}

		/**
		 * Gets the object data
		 *
		 * @param	object	$object
		 * @return	array	objectData
		 */
		,getObjectData : function($object) {
		 	var objectData = {
				$link : $object
				,title : $object.attr('title')
				,caption : $object.children('img').attr('alt')
				,url : lightcase.verifyDataUrl($object.attr('href'))
				,rel : $object.attr('data-rel')
				,type : lightcase.verifyDataType($object.attr('href'))
				,isPartOfSequence : lightcase.isPartOfSequence($object.attr('data-rel'), ':')
				,isPartOfSequenceWithSlideshow : lightcase.isPartOfSequence($object.attr('data-rel'), ':slideshow')
				,currentIndex : $('[data-rel="' + $object.attr('data-rel') + '"]').index($object)
				,sequenceLength : $('[data-rel="' + $object.attr('data-rel') + '"]').length
			};

				// Add sequence info to objectData
			objectData.sequenceInfo = (objectData.currentIndex + 1) + lightcase.labels['sequenceInfo.of'] + objectData.sequenceLength

			return objectData;
		}

		/**
		 * Verifies if the link is part of a sequence
		 *
		 * @param	string	rel
		 * @param	string	expression
		 * @return	boolean
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
		 * @return	boolean
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
		 * @return	void
		 */
		,loadContent : function() {
			if (lightcase.cache.originalObject) {
				lightcase.restoreObject();
			}
		
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
					var $object = $('<div class="inlineWrap"></div>');
					$object.html(lightcase.cloneObject($(lightcase.objectData.url)));

						// Add custom attributes from lightcase.settings
					$.each(lightcase.settings.inline, function(name, value) {
						$object.css(name, value);
					});
					break;
				case 'ajax' :
					var $object = $('<div class="inlineWrap"></div>');
					break;
				case 'flash' :
					var classid = $.browser.msie ? 'clsid: D27CDB6E-AE6D-11cf-96B8-444553540000' : 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'
						,$object = $('<object classid="' + classid + '"></object>')
						,$param = $('<param name="movie" value="' + lightcase.objectData.url + '"></param>')
						,$embed = $('<embed src="' + lightcase.objectData.url + '" type="application/x-shockwave-flash"></embed>');

						// Add custom attributes from lightcase.settings
					$.each(lightcase.settings.flash, function(name, value) {
						$param.append('<param name="' + name + '" value="' + value + '"></param>');
						$embed.attr(name, value);
					});

						// Append param and embed tags to the object
					$object.append($param, $embed);
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
			
				// Load object
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
							,success : function(data, textStatus, jqXHR) {
								$object.html(data);
								lightcase.showContent($contentInner);
							}
							,error : function(jqXHR, textStatus, errorThrown) {
								lightcase.error();
							}
						})
					);
					break;
				case 'flash' :
					lightcase.showContent($object.children('embed'));
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
		 * Throws an error if something went wrong
		 *
		 * @return	void
		 */
		,error : function() {
			lightcase.objectData.type = 'error';
			var $object = $('<div class="inlineWrap"></div>');

			$object.html(lightcase.settings.errorMessage);
			$contentInner.html($object);

			lightcase.showContent($contentInner);
		}

		/**
		 * Calculates the dimensions to fit content
		 *
		 * @param	object	$object
		 * @return	void
		 */
		,calculateDimensions : function($object) {
			lightcase.cleanupDimensions();

				// Force shrinkFactor to 1 for mobile devices
			var deviceAgent = navigator.userAgent.toLowerCase()
				,agentId = deviceAgent.match(/(iphone|ipod|ipad|android|blackberry|symbian)/);

			if (agentId) {
				lightcase.settings.shrinkFactor = 1;
			}

				// Set default dimensions
			var dimensions = {
				objectWidth : $object.attr('width') ? $object.attr('width') : $object.outerWidth()
				,objectHeight : $object.attr('height') ? $object.attr('height') : $object.outerHeight()
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
					case 'video' :
						if (dimensions.differenceWidthAsPercent > 100) {
							dimensions.objectWidth = dimensions.maxWidth;
							dimensions.objectHeight = parseInt(dimensions.objectHeight / dimensions.differenceWidthAsPercent * 100);
						}
						if (dimensions.differenceHeightAsPercent > 100 && dimensions.differenceWidthAsPercent < dimensions.differenceHeightAsPercent) {
							dimensions.objectWidth = parseInt(dimensions.maxWidth / dimensions.differenceHeightAsPercent * dimensions.differenceWidthAsPercent);
							dimensions.objectHeight = parseInt(dimensions.objectHeight / dimensions.differenceHeightAsPercent * 100);
						}
	
							// For images set objectHeight always to auto
						if (lightcase.objectData.type === 'image') {
							dimensions.objectHeight = 'auto';
						}
						break;
					case 'error' :
						if (isNaN(dimensions.objectWidth) || dimensions.objectWidth > dimensions.maxWidth) {
							dimensions.objectWidth = dimensions.maxWidth;
						}
	
							// Set objectHeight always to auto
						dimensions.objectHeight = 'auto';
						break;
					default :
						if ((isNaN(dimensions.objectWidth) || dimensions.objectWidth > dimensions.maxWidth) && !lightcase.settings.forceWidth) {
							dimensions.objectWidth = dimensions.maxWidth;
						}
						if ((isNaN(dimensions.objectHeight) || dimensions.objectHeight > dimensions.maxHeight) && !lightcase.settings.forceHeight) {
							dimensions.objectHeight = dimensions.maxHeight;
						}
				}
			}

			lightcase.adjustDimensions($object, dimensions);
		}

		/**
		 * Adjusts the dimensions
		 *
		 * @param	object	$object
		 * @param	array	dimensions
		 * @return	void
		 */
		,adjustDimensions : function($object, dimensions) {
				// Remove attribute width/height
			$object.removeAttr('width').removeAttr('height');

			$object.css({
				'width' : dimensions.objectWidth
				,'height' : dimensions.objectHeight
			});

			if (lightcase.objectData.type === 'video') {
				$contentInner.children().css({
					'width' : $object.outerWidth()
					,'height' : $object.outerHeight()
				});
			} else {
				$contentInner.css({
					'width' : $object.outerWidth()
					,'height' : $object.outerHeight()
				});
			}

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
		 * @param	string	process
		 * @return	void
		 */
		,loading : function(process) {
			if (process === 'start') {
				$case.addClass('loading');
				$loading.show();
			} else if (process === 'end') {
				$case.removeClass('loading');
				$loading.hide();
			}
		}

		/**
		 * Gets the client screen dimensions
		 *
		 * @return	array	dimensions
		 */
		,getDimensions : function() {
			var dimensions = {
				windowWidth : $(window).width()
				,windowHeight : $(window).height()
			};

			return dimensions;
		}

		/**
		 * Verifies the url
		 *
		 * @param	string	dataUrl
		 * @return	string	dataUrl	Clean url for processing content
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
		 * @param	string	url
		 * @return	string	Array key if expression matched, else false
		 */
		,verifyDataType : function(url) {
			var url = lightcase.verifyDataUrl(url);

			var type = {
				'image' : 'jpg,jpeg,gif,png,bmp'
				,'flash' : 'swf'
				,'video' : 'mp4,mov,ogv,ogg,webm'
				,'iframe' : 'html,php'
				,'ajax' : 'txt'
				,'inline' : '#'
			};

			if (url) {
				for (var key in type) {
					var suffixArr = type[key].split(',');

					for (i = 0; i < suffixArr.length; i++) {
						var suffix = suffixArr[i]
							, regexp = new RegExp('\.(' + suffix + ')$', 'i')
							// Verify only only the last 4 characters of string
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
		 * @return	void
		 */
		,addElements : function() {
			if ($('#' + lightcase.settings.id).length) {
				return;
			}

			lightcase.settings.markup();
		}

		/**
		 * Shows the loaded content
		 *
		 * @param	object	$object
		 * @return	void
		 */
		,showContent : function($object) {
				// Adds class with the object type
			$case.attr('class', 'type-' + lightcase.objectData.type);

			lightcase.calculateDimensions($object);

				// Call hook function on finish
			lightcase.settings.onFinish();

			switch (lightcase.settings.transition) {
				case 'elastic' :
					if ($case.css('opacity') < 1 && !$.browser.msie) {
						$case.css({
							'opacity' : 0
							,'-moz-transform' : 'scale(0.1)'
							,'-webkit-transform' : 'scale(0.1)'
							,'-o-transform' : 'scale(0.1)'
							,'transform' : 'scale(0.1)'
						});
						$contentInner.stop().fadeTo(lightcase.settings.speedIn, 1);
						$case.css({
							'opacity' : 1
							,'-moz-transform' : 'scale(1)'
							,'-moz-transition' : lightcase.settings.speedIn + 'ms ease-out'
							,'-webkit-transform' : 'scale(1)'
							,'-webkit-transition' : lightcase.settings.speedIn + 'ms ease-out'
							,'-o-transform' : 'scale(1)'
							,'-o-transition' : lightcase.settings.speedIn + 'ms ease-out'
							,'transform' : 'scale(1)'
							,'transition' : lightcase.settings.speedIn + 'ms ease-out'
						});
						break;
					}
				case 'fade' :
				case 'fadeInline' :
				case 'elastic' :
					$case.stop().fadeTo(lightcase.settings.speedIn, 1);
					$contentInner.stop().fadeTo(lightcase.settings.speedIn, 1);
					break;
				default :
					$case.stop().fadeTo(0, 1);
			}

				// End loading
			lightcase.loading('end');
			lightcase.busy = false;

				// If slideshow is enabled, start timeout.
			if (lightcase.isSlideshowEnabled()) {
					// Only start the timeout if slideshow is not pausing
				if (!$nav.hasClass('paused')) {
					lightcase.startTimeout();
				}
			}
		}

		/**
		 * Processes the content to show
		 *
		 * @return	void
		 */
		,processContent : function() {
			lightcase.busy = true;

			switch (lightcase.settings.transition) {
				case 'fade' :
					if ($case.is(':hidden')) {
						$case.stop().fadeTo(0, 0, function() {
							lightcase.loadContent();
						});
					} else {
						$case.stop().fadeTo(lightcase.settings.speedOut, 0, function() {
							lightcase.loadContent();
						});
					}
					break;
				case 'fadeInline' : case 'elastic' :
					if ($case.is(':hidden')) {
						$case.stop().fadeTo(0, 0);
						$contentInner.stop().fadeTo(0, 0, function() {
							lightcase.loadContent();
						});
					} else {
						$contentInner.stop().fadeTo(lightcase.settings.speedOut, 0, function() {
							lightcase.loadContent();
						});
					}
					break;
				default :
					$case.stop().fadeTo(0, 0);
					lightcase.loadContent();
			}
		}

		/**
		 * Handles events for gallery buttons
		 *
		 * @return	void
		 */
		,handleEvents : function() {
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

				// Unbind and hide navigator buttons as default
			$nav.children('a').unbind('click').hide();
				// Unbind swipe events
			$case.unbind('swipeleft').unbind('swiperight');

			if (lightcase.settings.useKeys === true) {
				lightcase.handleKeyEvents();
			}

			if (!lightcase.objectData.isPartOfSequence) {
				return;
			} else {
				lightcase.nav = lightcase.setNavigation();

				$prev.click(function(event) {
					event.preventDefault();
					lightcase.nav.$prevItem.click();
					if (lightcase.isSlideshowEnabled()) {
						lightcase.stopTimeout();
					}
				});
				$next.click(function(event) {
					event.preventDefault();
					lightcase.nav.$nextItem.click();
					if (lightcase.isSlideshowEnabled()) {
						lightcase.stopTimeout();
					}
				});

					// Swiping support for mobile devices
				$case.on('swipeleft', function(event) {
					event.preventDefault();
					lightcase.nav.$nextItem.click();
					if (lightcase.isSlideshowEnabled()) {
						lightcase.stopTimeout();
					}
				});
				$case.on('swiperight', function(event) {
					event.preventDefault();
					lightcase.nav.$prevItem.click();
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
			}
		}

		/**
		 * Enables the events for keys
		 *
		 * @return	void
		 */
		,handleKeyEvents : function() {
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
		 * @return	void
		 */
		,startTimeout : function() {
			$play.hide();
			$pause.show();

			$nav.removeClass('paused');
			$next.unbind('timeoutClick').dequeue();

			$next.bind('timeoutClick', function() {
				lightcase.nav.$nextItem.click();
			}).delay(lightcase.settings.timeout).queue(function() {
				$next.trigger('timeoutClick');
			});
		}

		/**
		 * Stops the slideshow timeout
		 *
		 * @return	void
		 */
		,stopTimeout : function() {
			$play.show();
			$pause.hide();

			$nav.addClass('paused');
			$next.unbind('timeoutClick');
		}

		/**
		 * Sets the navigator buttons (prev/next)
		 *
		 * @return	array	items
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
		 * @param	object	$object
		 * @return	object	$clone
		 */
		,cloneObject : function($object) {
			var $clone = $object.clone()
				,objectId = $object.attr('id');
				
				// If element is hidden, cache the object and remove
			if ($object.is(':hidden')) {
				lightcase.cacheObjectData($object);
				$object.attr('id', lightcase.settings.tempIdPrefix + objectId).empty();
			} else {
					// Prevent duplicated id's
				$clone.removeAttr('id');
			}
			
			return $clone.show();
		}
		
		/**
		 * Caches the object data
		 *
		 * @param	object	$object
		 * @return	void
		 */
		,cacheObjectData : function($object) {
			$.data($object, 'cache', {
				id : $object.attr('id')
				,content : $object.html()
			});
			
			lightcase.cache.originalObject = $object;
		}
		
		/**
		 * Restore object from cache
		 *
		 * @return	void
		 */
		,restoreObject : function() {
			var $object = $('[id^="' + lightcase.settings.tempIdPrefix + '"]');
		
			$object.attr('id', $.data(lightcase.cache.originalObject, 'cache').id);
			$object.html($.data(lightcase.cache.originalObject, 'cache').content);
		}
		
		/**
		 * Enters into the lightcase view
		 *
		 * @return	void
		 */
		,lightcaseOpen : function() {
			lightcase.open = true;
			$overlay.css('opacity', lightcase.settings.overlayOpacity);

			switch (lightcase.settings.transition) {
				case 'fade' :
				case 'fadeInline' :
				case 'elastic' :
					$overlay.stop().fadeIn(lightcase.settings.speedIn, function() {
						lightcase.handleEvents();
						lightcase.processContent();
					});
					break;
				default :
					$overlay.show();
					lightcase.handleEvents();
					lightcase.processContent();
			}
		}

		/**
		 * Escapes from the lightcase view
		 *
		 * @return	void
		 */
		,lightcaseClose : function() {
			lightcase.open = false;
			$loading.hide();

			switch (lightcase.settings.transition) {
				case 'fade' :
				case 'fadeInline' :
				case 'elastic' :
					$case.stop().fadeOut(lightcase.settings.speedOut, function() {
						$overlay.stop().fadeOut(lightcase.settings.speedOut, function() {
							lightcase.cleanup();
						});
					});
					break;
				default :
					lightcase.cleanup();
			}
		}

		/**
		 * Cleans up the dimensions
		 *
		 * @return	void
		 */
		,cleanupDimensions : function() {
			$case.css({
				'width' : ''
				,'-moz-transform' : ''
				,'-moz-transition' : ''
				,'-webkit-transform' : ''
				,'-webkit-transition' : ''
				,'-o-transform' : ''
				,'-o-transition' : ''
				,'-o-transition-property' : ''
				,'-o-transition-delay' : ''
				,'-o-transition-duration' : ''
				,'-o-transition-timing-function' : ''
				,'transition' : ''
				,'transform' : ''
			});
			$contentInner.css({
				'width' : ''
				,'height' : ''
			});
		}

		/**
		 * Cleanup after aborting lightcase
		 *
		 * @return	void
		 */
		,cleanup : function() {
			lightcase.cleanupDimensions();
			if (lightcase.isSlideshowEnabled()) {
				lightcase.stopTimeout();
				$nav.removeClass('paused');
			}

			$loading.hide();
			$overlay.hide();

			$case.hide().removeAttr('style').removeAttr('class');
			$contentInner.empty();
			
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
})(jQuery);