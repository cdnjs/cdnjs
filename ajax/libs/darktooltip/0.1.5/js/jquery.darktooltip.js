/* 
 * DarkTooltip v0.1.5
 * Simple customizable tooltip with confirm option and 3d effects
 * (c)2014 Rubén Torres - rubentdlh@gmail.com
 * Released under the MIT license
 */

(function($) {

	function DarkTooltip(element, options){
		this.bearer = element;
		this.options = options;
		this.delay;
	}

	DarkTooltip.prototype = {
		show: function(){
			//Close all other tooltips
			$('ins.dark-tooltip').hide();
			window.clearTimeout(this.delay);
			this.tooltip.css('display', 'block');
		},

		hide: function(){
			this.tooltip.hide();
		},

		toggle: function(){
			if(this.tooltip.is(":visible")){
				this.hide();
			}else{
				this.show();
			}
		},

		addAnimation: function(){
			switch(this.options.animation){
				case 'none':
					break;
				case 'fadeIn':
					this.tooltip.addClass('animated');
					this.tooltip.addClass('fadeIn');
					break;
				case 'flipIn':
					this.tooltip.addClass('animated');
					this.tooltip.addClass('flipIn');
					break;
			}
		},

		setContent: function(){
			$(this.bearer).css('cursor', 'pointer');
			//Get tooltip content
			if(this.options.content){
				this.content = this.options.content;
			}else if(this.bearer.attr("data-tooltip")){
				this.content = this.bearer.attr("data-tooltip");
			}else{
				console.log("No content for tooltip: " + this.bearer.selector);
				return;
			}
			if(this.content.charAt(0) == '#'){
				$(this.content).hide();
				this.content = $(this.content).html();
				this.contentType='html';
			}else{
				this.contentType='text';
			}
			//Create tooltip container
			this.tooltip = $("<ins class = 'dark-tooltip " + this.options.theme + " " + this.options.size + " " 
				+ this.options.gravity + "'><div>" + this.content + "</div><div class = 'tip'></div></ins>");
			this.tip = this.tooltip.find(".tip");
			
			$(this.bearer).append(this.tooltip);
			//Adjust size for html tooltip
			if(this.contentType == 'html'){
				this.tooltip.css('max-width','none');
			}
			this.tooltip.css('opacity', this.options.opacity);
			this.addAnimation();
			if(this.options.confirm){
				this.addConfirm();
			}
		},

		setPositions: function(){
			var leftPos = 0;
			var topPos = 0;
			var bearerTop = this.bearer.offset().top;
			var bearerLeft = this.bearer.offset().left;
			if(this.bearer.css('position')=='fixed' || this.bearer.css('position')=='absolute'){
				bearerTop=0;
				bearerLeft=0;
			}
			switch(this.options.gravity){
				case 'south':
					leftPos = bearerLeft + this.bearer.outerWidth()/2 - this.tooltip.outerWidth()/2;
					topPos = bearerTop - this.tooltip.outerHeight() - this.tip.outerHeight()/2;
					break;
				case 'west':
					leftPos = bearerLeft + this.bearer.outerWidth() + this.tip.outerWidth()/2;
					topPos = bearerTop + this.bearer.outerHeight()/2 - (this.tooltip.outerHeight()/2);
					break;
				case 'north':
					leftPos = bearerLeft + this.bearer.outerWidth()/2 - (this.tooltip.outerWidth()/2);
					topPos = bearerTop + this.bearer.outerHeight() + this.tip.outerHeight()/2;
					break;
				case 'east':
					leftPos = bearerLeft - this.tooltip.outerWidth() - this.tip.outerWidth()/2;
					topPos = bearerTop + this.bearer.outerHeight()/2 - this.tooltip.outerHeight()/2;
					break;
			}
			this.tooltip.css('left', leftPos);
			this.tooltip.css('top', topPos);
		},

		setEvents: function(){
			var dt = this;
			if(this.options.trigger == "hover" || this.options.trigger == "mouseover" || this.options.trigger == "onmouseover"){
				this.bearer.mouseover( function(){
					dt.setPositions();
					dt.show();
				}).mouseout( function(){
					dt.hide();
				});
			}else if(this.options.trigger == "click" || this.options.trigger == "onclik"){
				this.tooltip.click( function(e){
					e.stopPropagation();
				});
				this.bearer.click( function(e){
					e.preventDefault();
					dt.setPositions();
					dt.toggle();
					e.stopPropagation();
				});
				$('html').click(function(){
					dt.hide();
				})
			}
		},

		activate: function(){
			this.setContent();
			if(this.content){
				this.setEvents();
			}
		},

		addConfirm: function(){
			this.tooltip.append("<ul class = 'confirm'><li class = 'darktooltip-yes'>" 
				+ this.options.yes +"</li><li class = 'darktooltip-no'>"+ this.options.no +"</li></ul>");
			this.setConfirmEvents();
		},

		setConfirmEvents: function(){
			var t = this;
			this.tooltip.find('li.darktooltip-yes').click( function(e){
				t.onYes();
				e.stopPropagation();
			});
			this.tooltip.find('li.darktooltip-no').click( function(e){
				t.onNo();
				e.stopPropagation();
			});
		},

		finalMessage: function(){
			if(this.options.finalMessage){
				var t = this;
				t.tooltip.find('div:first').html(this.options.finalMessage);
				t.tooltip.find('ul').remove();
				t.setPositions();
				setTimeout( function(){
					t.hide();
					t.setContent();
				}, t.options.finalMessageDuration);
			}else{
				this.hide();
			}
		},

		onYes: function(){
			this.options.onYes(this.bearer); 
			this.finalMessage();
		},

		onNo: function(){
			this.options.onNo(this.bearer);
			this.hide();
		}
	}

	$.fn.darkTooltip = function(options) {
		this.each(function(){
			options = $.extend({}, $.fn.darkTooltip.defaults, options);
			var tooltip = new DarkTooltip($(this), options);
			tooltip.activate();
		});	
	}

	$.fn.darkTooltip.defaults = {
        opacity: 0.9,
        content:'',
        size: 'medium',
        gravity: 'south',
        theme: 'dark',
        trigger: 'hover',
        animation: 'none',
        confirm: false,
        yes: 'Yes',
        no: 'No',
        finalMessage: '',
        finalMessageDuration: 1000,
        onYes: function(){},
        onNo: function(){}
    };

})(jQuery);
