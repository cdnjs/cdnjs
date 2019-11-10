/*! iGrowl v3.0.1
	Copyright (c) 2014 Catalin Covic 
	https://github.com/catc 
*/

;( function($) {
	'use strict';
	
	var animStart = 'webkitAnimationStart oanimationstart MSAnimationStart animationstart',
		animEnd = 'webkitAnimationEnd oanimationend MSAnimationEnd animationend',
	
		growlTemplate = '<div class="igrowl animated" role="alert"><div class="igrowl-text"></div><button class="igrowl-dismiss i-times"></button></div>';


	var iGrowl = function(options){
		options = $.extend(true, {}, $.iGrowl.prototype.defaults, options);
		this.options = options;
		
		this.template = setContent(options);

		render.call(this);
		return this;
	},

	// builds notification (title, message, icon)
	setContent = function(options){
		// if no title or message, throw error
		if ( !options.title && !options.message ) throw new Error('You must enter at least a title or message.');

		var template = $(growlTemplate);

		// small
		if ( options.small ) { template.addClass('igrowl-small'); }

		// type
		template.addClass('igrowl-'+options.type);


		// image / icon
		if ( options.image.src ) {
			template.prepend('<div class="igrowl-img '+ options.image.class +'"><img src="'+ options.image.src +'"</div>');
		} else if (options.icon) {
			template.prepend('<div class="igrowl-icon i-'+ options.icon + '"></div>');
		}

		// title + message
		if ( options.title ) template.find('.igrowl-text').prepend('<div class="igrowl-title">' + options.title + '</div>');
		if ( options.message ) template.find('.igrowl-text').append('<div class="igrowl-message">' + options.message + '</div>');

		// link
		if ( options.link ){ template.addClass('igrowl-link').children('.igrowl-icon, .igrowl-text').wrapAll('<a href="' + options.link +'" target="_' + options.target + '" />'); }

		template.attr('alert-placement', options.placement.x + ' ' + options.placement.y );
		return template;
	},

	// sets css position and appends to body
	render = function(){
		var options = this.options,
			template = this.template;

		var last = $('.igrowl[alert-placement="' + options.placement.x + ' ' + options.placement.y +'"]').last(),
			y = options.offset.y,
			growl = this;

		// vertical alignment - place after last element of type (if it exists)
		if ( last.length ) {
			y = parseInt( last.css( options.placement.y ), 10) + last.outerHeight() + options.spacing;
		}
		template.css( options.placement.y, y );


		// horizontal alignment
		if ( options.placement.x === "center" ) { 
			template.addClass('igrowl-center'); 
		}  else { 
			template.css( options.placement.x, options.offset.x ); 
		}

		$('body').append(template);

		// add animation class - if enabled
		if ( options.animation ) {
			// if animation isn't supported, ensure dismiss controls are activated
			var noAnimFallback = setTimeout(function(){
				controls.call(growl);
			}, 1001);

			template
				.addClass( options.animShow )
				.one(animStart, function(e){
					if ( typeof options.onShow === 'function' ) options.onShow();
				})
				.one(animEnd, function(e) {
					controls.call(growl);

					// cancel no-animation fallback
					clearTimeout(noAnimFallback);
				});

		} else {
			controls.call(growl);
		}
	},

	// sets up auto-dismiss after delay, and dismiss button
	controls = function(){
		var options = this.options,
			template = this.template;

		// callback once alert is visible/animation complete
		if ( typeof options.onShown === 'function' ) options.onShown();
		
		var growl = this;
		
		// after delay, dismiss alert
		if ( options.delay > 0 ){
			setTimeout( function(){
				growl.dismiss();
			}, options.delay);
		}

		// set up dismiss button
		template.find('.igrowl-dismiss').on('click', function(){
			growl.dismiss();
		});
	},

	updatePosition = function(){
		var options = this.options,
			template = $(this.template);

		template.nextAll('.igrowl[alert-placement="' + options.placement.x + ' ' + options.placement.y +'"]').each(function(i, alert){
			// sets y as: 	current - ( alert to be dismissed height + alert to be dismissed spacing)
			var y = parseInt( $(this).css( options.placement.y ), 10) - template.outerHeight() - options.spacing;
			$(alert).css(options.placement.y, y);
		});
		template.remove();
	};


	iGrowl.prototype = {
		// hides alert
		dismiss: function(){
			var options = this.options,
				template = this.template,
				growl = this;

			if ( options.animation ) {
				this.template
					.removeClass( options.animShow )
					.addClass( options.animHide )
					.one(animStart, function(e){
						if ( typeof options.onHide === 'function' ) options.onHide();
					})
					.one(animEnd, function(e){
						if ( typeof options.onHidden === 'function' ) options.onHidden();
						updatePosition.call(growl);
					});

				// fallback in case animation event listener fails
				setTimeout( function(){
					template.hide();
					updatePosition.call(growl);
				}, 1500 );

			} else {
				template.hide();
				if ( typeof options.onHidden === 'function' ) options.onHidden();
				updatePosition.call(growl);
			}

		}
	};


	// initiate growl
	$.iGrowl = function(settings){
		// generate alert
		var growl = new iGrowl (settings);
		return growl;
	};

	// dismiss all alerts
	$.iGrowl.prototype.dismissAll = function(placement){
		if ( placement === 'all' ) { $('.igrowl button').trigger('click'); } 
		else { $('.igrowl[alert-placement="'+placement+'"] button').trigger('click'); }
	};

	// default settings
	$.iGrowl.prototype.defaults = {
		type : 			'info',
		title : 		null,
		message : 		null,
		link : 			null,
		target : 		'self',
		
		icon : 			null,
		image : {
			src : null,
			class : null
		},
		
		small : 		false,
		delay : 		2500,
		spacing :  		30,
		placement : {
			x : 	'right',
			y :		'top'
		},
		offset : {
			x : 	20,
			y : 	20
		},

		animation : 	true,
		animShow : 		'bounceIn',
		animHide : 		'bounceOut',
		onShow : 		null,
		onShown : 		null,
		onHide : 		null,
		onHidden : 		null,

	};


})( jQuery );





