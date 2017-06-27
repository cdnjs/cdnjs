/*
* iziModal | v1.2.0
* http://izimodal.marcelodolce.com
* by Marcelo Dolce.
*/
(function($){

	"use strict";

	var PLUGIN_NAME = 'iziModal';

	var STATES = {
		CLOSING: 'closing',
		CLOSED: 'closed',
		OPENING: 'opening',
		OPENED: 'opened',
		DESTROYED: 'destroyed'
	};

	function whichAnimationEvent(){
		var t,
			el = document.createElement("fakeelement");

		var animations = {
			"animation"      : "animationend",
			"OAnimation"     : "oAnimationEnd",
			"MozAnimation"   : "animationend",
			"WebkitAnimation": "webkitAnimationEnd"
		};
		for (t in animations){
			if (el.style[t] !== undefined){
				return animations[t];
			}
		}
	}
	var animationEvent = whichAnimationEvent();

	var isMobile = false;
	if (/Mobi/.test(navigator.userAgent)) {
	    isMobile = true;
	}

	var iziModal = function (element, options) {
		this.init(element, options);
	};

	iziModal.prototype = {

		constructor: iziModal,

		init: function (element, options) {
			
			var that = this;

			this.$element = $(element);
			this.id = this.$element.attr('id');
			this.state = STATES.CLOSED;
			this.options = options;
			this.timer = null;
			this.timerTimeout = null;
			this.isFullscreen = false;
            this.headerHeight = 0;
			this.$header = $('<div class="'+PLUGIN_NAME+'-header"><h2 class="'+PLUGIN_NAME+'-header-title">' + options.title + '</h2><p class="'+PLUGIN_NAME+'-header-subtitle">' + options.subtitle + '</p><a href="javascript:void(0)" class="'+PLUGIN_NAME+'-button '+PLUGIN_NAME+'-button-close" data-'+PLUGIN_NAME+'-close></a></div>');
            this.$overlay = $('<div class="'+PLUGIN_NAME+'-overlay" style="background-color:'+options.overlayColor+'"></div>');

            if (options.fullscreen === true) {
            	this.$header.append('<a href="javascript:void(0)" class="'+PLUGIN_NAME+'-button '+PLUGIN_NAME+'-button-fullscreen" data-'+PLUGIN_NAME+'-fullscreen></a>');
            	this.$header.css('padding-right', '76px');
            }

			if (options.timeoutProgressbar === true && !isNaN(options.timeout) && options.timeout !== false && options.timeout !== 0) {
				this.$header.prepend('<div class="'+PLUGIN_NAME+'-progressbar"><div style="background-color:'+options.timeoutProgressbarColor+'"></div></div>');
            }

            if (options.subtitle === '') {
        		this.$header.addClass(PLUGIN_NAME+'-noSubtitle');
            }

            if (options.iframe === true) {
                this.$element.html('<div class="'+PLUGIN_NAME+'-wrap"><div class="'+PLUGIN_NAME+'-content '+PLUGIN_NAME+'-content-loader"><iframe class="'+PLUGIN_NAME+'-iframe"></iframe>' + this.$element.html() + "</div></div>");
                
	            if (options.iframeHeight !== null) {
	                this.$element.find('.'+PLUGIN_NAME+'-iframe').css('height', options.iframeHeight);
	            }

            } else {
            	this.$element.html('<div class="'+PLUGIN_NAME+'-wrap"><div class="'+PLUGIN_NAME+'-content">' + this.$element.html() + '</div></div>');
            }
            
            $(document.body).find('style[rel='+this.id+']').remove();

            if(typeof options.padding !== 'undefined' || options.padding !== 0)
                this.$element.find('.'+PLUGIN_NAME+'-content').css('padding', options.padding);


            if (options.title !== "" || options.subtitle !== "") {

                if (options.headerColor !== null) {
                    this.$element.css('border-bottom', '3px solid ' + options.headerColor + '');
                    this.$header.css('background', this.options.headerColor);
                }
                if (options.iconClass !== null) {
                    this.$header.prepend('<i class="'+PLUGIN_NAME+'-header-icon ' + options.iconClass + '"></i>');
                    this.$header.find("."+PLUGIN_NAME+'-header-icon').css('color', options.iconColor);
                }
                this.$element.prepend(this.$header);
            }

			var separators = /%|px|em|cm/,
				wClear = String(options.width).split(separators),
				w = String(options.width),
				medida = "px";
				wClear = String(wClear).split(",")[0];

			if(isNaN(options.width)){
				if( String(options.width).indexOf("%") != -1){
					medida = "%";
				} else {
					medida = w.slice("-2");
				}
			}

            this.$element.css({
                'margin-left': -(wClear / 2) + medida,
                'max-width': parseInt(wClear) + medida
            });

			this.mediaQueries = '<style rel="' + this.id + '">@media handheld, only screen and (max-width: ' + wClear + 'px) { #' + this.$element[0].id + '{ width: 100% !important; max-width: 100% !important; margin-left: 0 !important; left: 0 !important; } }</style>';
        	$(document.body).append(this.mediaQueries);

            this.$element.addClass(PLUGIN_NAME + " " + options.theme);

			if(options.openFullscreen === true){
			    that.isFullscreen = true;
			    that.$element.addClass('isFullscreen');
			}

            // Adjusting vertical positioning
            this.$element.css('margin-top', parseInt(-(this.$element.innerHeight() / 2)) + 'px');

            if(this.$element.find('.'+PLUGIN_NAME+'-header').length){
            	this.$element.css('overflow', 'hidden');
            }

            // Close when button pressed
            this.$element.on('click', '[data-'+PLUGIN_NAME+'-close]', function (e) {
                e.preventDefault();
                that.close();
            });

            // Expand when button pressed
            this.$element.on('click', '[data-'+PLUGIN_NAME+'-fullscreen]', function (e) {
                e.preventDefault();
                if(that.isFullscreen === true){
					that.isFullscreen = false;
	                that.$element.removeClass('isFullscreen');
                } else {
	                that.isFullscreen = true;
	                that.$element.addClass('isFullscreen');
                }
            });
		},

		toggle: function () {

			if(this.state == STATES.OPENED){
				this.close();
			}
			if(this.state == STATES.CLOSED){
				this.open();
			}

		},

		open: function (param) {

			var that = this;

			if (param && typeof(param) === "function") {
		        param(that);
		    }

			if(this.options.iframe === true){

				var href = null;
				if(this.options.iframeURL !== null){
					href = this.options.iframeURL;
				} else {
					try {
						href = param.target.href;
						if(href !== undefined){
							href = param.target.href;
						}
					} catch(e) {
						console.warn(e);
					}
				}
			    this.$element.find('.'+PLUGIN_NAME+'-iframe').attr('src', href);
			}

            this.$element.trigger(STATES.OPENING);
			this.state = STATES.OPENING;

			// console.info('[ '+PLUGIN_NAME+' | '+this.id+' ] Opening...');

			if (this.options.bodyOverflow || isMobile){
				$(document.body).css('overflow', 'hidden');
			}

			if (that.options.onOpening && typeof(that.options.onOpening) === "function") {
		        that.options.onOpening(this);
		    }

			function opened(){
		    	that.$element.trigger(STATES.OPENED);
				that.state = STATES.OPENED;

			    // console.info('[ '+PLUGIN_NAME+' | '+that.id+' ] Opened.');

				if (that.options.onOpened && typeof(that.options.onOpened) === "function") {
			        that.options.onOpened(that);
			    }
			}

			this.$overlay.appendTo('body');

			if (this.options.transitionInOverlay) {
				this.$overlay.addClass(this.options.transitionInOverlay);
			}

			if (this.options.transitionInModal !== '') {

				this.$element.addClass(this.options.transitionInModal).show();

				this.$element.find('.'+PLUGIN_NAME+'-wrap').one(animationEvent, function () {

				    that.$element.removeClass(that.options.transitionInModal);
				    that.$overlay.removeClass(that.options.transitionInOverlay);

					opened();
				});

			} else {
				this.$element.show();
				opened();
			}

			if (this.options.timeout !== false && !isNaN(this.options.timeout) && this.options.timeout !== false && this.options.timeout !== 0) {

				if (this.options.timeoutProgressbar === true) {

					var progressBar = {
	                    hideEta: null,
	                    maxHideTime: null,
	                    el: this.$element.find('.'+PLUGIN_NAME+'-progressbar > div'),
	                    updateProgress: function()
	                    {
		                    var percentage = ((progressBar.hideEta - (new Date().getTime())) / progressBar.maxHideTime) * 100;
		                    progressBar.el.width(percentage + '%');
		                    if(percentage < 0){
		                    	that.close();	                    	
		                    }	                    	
	                    }
	                };
					if (this.options.timeout > 0) {
                        progressBar.maxHideTime = parseFloat(this.options.timeout);
                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                        this.timerTimeout = setInterval(progressBar.updateProgress, 10);
                    }

				} else {

					this.timerTimeout = setTimeout(function(){
						that.close();
					}, that.options.timeout);
				}
			}

            // Close on overlay click
            if (this.options.overlayClose && !this.$element.hasClass(this.options.transitionOutModal)) {
            	that.$overlay.click(function () {
                    that.close();
            	});
            }

			if (this.options.focusInput){
		    	that.$element.find(':input:not(button):enabled:visible:first').focus(); // Focus on the first field
			}
			
			(function updateTimer(){
		    	that.recalculateLayout();					
			    that.timer = setTimeout(updateTimer, 200);
			})();

            // Close when the Escape key is pressed
            $(document).keydown(function (e) {
                if (that.options.closeOnEscape && e.keyCode === 27) {
                    that.close();
                }
            });

		},

		close: function (param) {

			var that = this;

			if (param && typeof(param) === "function") {
		        param(that);
		    }

            $(document).off("keydown");

			this.state = STATES.CLOSING;
			this.$element.trigger(STATES.CLOSING);
			// console.info('[ '+PLUGIN_NAME+' | '+this.id+' ] Closing...');

            clearTimeout(this.timer);
            clearTimeout(this.timerTimeout);

			if (that.options.onClosing && typeof(that.options.onClosing) === "function") {
		        that.options.onClosing(this);
		    }

			function closed(){

                if (that.options.iframe === true) {
                    that.$element.find('.'+PLUGIN_NAME+'-iframe').attr('src', "");
                }

				if (that.options.bodyOverflow || isMobile){
					$(document.body).css('overflow', 'initial');
				}

				$(document.body).removeClass(PLUGIN_NAME+'-attached');

                that.$element.trigger(STATES.CLOSED);
                that.state = STATES.CLOSED;
                
                // console.info('[ '+PLUGIN_NAME+' | '+that.id+' ] Closed.');

				if (that.options.onClosed && typeof(that.options.onClosed) === "function") {
			        that.options.onClosed(that);
			    }
			}

            if (this.options.transitionOutModal !== '') {

                this.$element.attr('class', PLUGIN_NAME + " " + this.options.transitionOutModal + " " + this.options.theme + " " + String((this.isFullscreen === true) ? 'isFullscreen' : ''));
				this.$overlay.attr('class', PLUGIN_NAME + "-overlay " + this.options.transitionOutOverlay);

                this.$element.one(animationEvent, function () {
                    
                    if( that.$element.hasClass(that.options.transitionOutModal) ){

                        that.$element.removeClass(that.options.transitionOutModal).hide();
                        that.$overlay.removeClass(that.options.transitionOutOverlay).remove();
                        
						closed();
                    }
                });
            }
            else {
                this.$element.hide();
                this.$overlay.remove();
                
                closed();
            }
		},

		destroy: function () {
			var e = $.Event('destroy');

			this.$element.trigger(e);

            $(document).off("keydown");

			clearTimeout(this.timer);
			clearTimeout(this.timerTimeout);

			if (this.options.iframe === true) {
				this.$element.find('.'+PLUGIN_NAME+'-iframe').remove();
			}
			this.$element.html(this.$element.find('.'+PLUGIN_NAME+'-content').html());

			$(document.body).find('style[rel='+this.id+']').remove();

			this.$element.off('click', '[data-'+PLUGIN_NAME+'-close]');

			this.$element
				.off('.'+PLUGIN_NAME)
				.removeData(PLUGIN_NAME)
				.attr('style', '');
			
			this.$overlay.remove();
			this.$element.trigger(STATES.DESTROYED);
			this.$element = null;
		},

		getState: function(){

			console.info(this.state);
			
			return this.state;
		},

		setTitle: function(title){

			if (this.options.title !== null) {
				
				this.$header.find('.'+PLUGIN_NAME+'-header-title').html(title);

				this.options.title = title;
			}
		},

		setSubtitle: function(subtitle){

			if (this.options.subtitle !== null) {
				
				this.$header.find('.'+PLUGIN_NAME+'-header-subtitle').html(subtitle);

				this.options.subtitle = subtitle;
			}
		},

		setIconClass: function(iconClass){

			if (this.options.iconClass !== null) {
				
				this.$header.find('.'+PLUGIN_NAME+'-header-icon').attr('class', PLUGIN_NAME+'-header-icon ' + iconClass);

				this.options.iconClass = iconClass;
			}
		},

		setHeaderColor: function(headerColor){

	        if (this.options.headerColor !== null) {
	            this.$element.css('border-bottom', '3px solid ' + headerColor + '');
	            this.$header.css('background', headerColor);

	            this.options.headerColor = headerColor;
	        }
		},

		startLoading: function(){
			if( !this.$element.find('.'+PLUGIN_NAME+'-loader').length ){
				this.$element.append('<div class="'+PLUGIN_NAME+'-loader '+this.options.transitionInOverlay+'"></div>');
			}
		},

		stopLoading: function(){
			var that = this;
			this.$element.find('.'+PLUGIN_NAME+'-loader').removeClass(this.options.transitionInOverlay).addClass(this.options.transitionOutOverlay);
			this.$element.find('.'+PLUGIN_NAME+'-loader').one(animationEvent, function () {
                that.$element.find('.'+PLUGIN_NAME+'-loader').removeClass(that.options.transitionOutOverlay).remove();
            });
		},

		recalculateLayout: function(){

            if(this.$element.find('.'+PLUGIN_NAME+'-header').length){
            	this.headerHeight = parseInt(this.$element.find('.'+PLUGIN_NAME+'-header').innerHeight()) + 2/*border bottom of modal*/;
            	this.$element.css('overflow', 'hidden');
            }

            var windowHeight = $(window).height(),
                contentHeight = this.$element.find('.'+PLUGIN_NAME+'-content')[0].scrollHeight,
                modalMargin = parseInt(-((this.$element.innerHeight() + 1) / 2)) + 'px';

            if(this.state == STATES.OPENED || this.state == STATES.OPENING){

				if (this.options.iframe === true) {

					// Se a altura da janela é menor que o modal com iframe
					if(windowHeight < (this.options.iframeHeight + this.headerHeight) || this.isFullscreen === true){

						$(document.body).addClass(PLUGIN_NAME+'-attached');

						this.$element.find('.'+PLUGIN_NAME+'-iframe').css({
							'height': parseInt(windowHeight - this.headerHeight) + 'px',
						});

					} else {
						$(document.body).removeClass(PLUGIN_NAME+'-attached');

					    this.$element.find('.'+PLUGIN_NAME+'-iframe').css({
					        'height': parseInt(this.options.iframeHeight) + 'px',
					    });
					}

				} else {

	                if (windowHeight > (contentHeight + this.headerHeight)) {
						$(document.body).removeClass(PLUGIN_NAME+'-attached');
	                    this.$element.find('.'+PLUGIN_NAME+'-wrap').css({'height': 'auto'});
	                }

                	if (this.$element.innerHeight() > windowHeight || this.$element.innerHeight() < contentHeight) {
						$(document.body).addClass(PLUGIN_NAME+'-attached');

	                    this.$element.find('.'+PLUGIN_NAME+'-wrap').css({
	                        'height': parseInt(windowHeight - this.headerHeight) + 'px',
	                    });
	                }

                    var scrollTop = this.$element.find('.'+PLUGIN_NAME+'-wrap').scrollTop(),
                    	internoHeight = this.$element.find('.'+PLUGIN_NAME+'-content').innerHeight(),
                    	externoHeight = this.$element.find('.'+PLUGIN_NAME+'-wrap').innerHeight();	

	                if ((externoHeight + scrollTop) < (internoHeight - 50)) {
	                    this.$element.addClass('hasScroll');
	                } else {
	                    this.$element.removeClass('hasScroll');
	                }

				}
            }

            // Corrige margin-top caso o modal sofra alterações na altura de seu conteúdo
            if (this.$element.css('margin-top') != modalMargin && this.$element.css('margin-top') != "0px") {
                this.$element.css('margin-top', modalMargin);
            }
		}

	};

	$.fn[PLUGIN_NAME] = function (option, args) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data(PLUGIN_NAME),
				options = $.extend({}, $.fn.iziModal.defaults, $this.data(), typeof option == 'object' && option);

			if (!data && (!option || typeof option == 'object')){
				$this.data(PLUGIN_NAME, (data = new iziModal(this, options)));
			}
			if (typeof option == 'string' && typeof data != 'undefined'){
				data[option].apply(data, [].concat(args));
			}
			else if (options.autoOpen){ // Automatically open the modal if autoOpen setted true
				data.open();
			}
		});
	};

	$.fn[PLUGIN_NAME].defaults = {
	    title: '',
	    subtitle: '',
	    theme: '',
	    headerColor: '#88A0B9',
	    overlayColor: 'rgba(0, 0, 0, 0.4)',
	    iconColor: '',
	    iconClass: null,
	    width: 600,
	    padding: 0,
	    iframe: false,
	    iframeHeight: 400,
	    iframeURL: null,
	    overlayClose: true,
	    closeOnEscape: true,
	    bodyOverflow: false,
	    focusInput: true,
	    autoOpen: false,
	    fullscreen: false,
	    openFullscreen: false,
	    timeout: false,
	    timeoutProgressbar: false,
	    timeoutProgressbarColor: 'rgba(255,255,255,0.5)',
	    transitionInModal: 'transitionIn',
	    transitionOutModal: 'transitionOut',
	    transitionInOverlay: 'fadeIn',
	    transitionOutOverlay: 'fadeOut',
        onOpening: function() {},
        onOpened: function() {},
        onClosing: function() {},
        onClosed: function() {}
	};

	$.fn[PLUGIN_NAME].Constructor = iziModal;

}).call(this, window.jQuery);