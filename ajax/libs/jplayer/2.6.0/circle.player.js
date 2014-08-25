/*
 * CirclePlayer for the jPlayer Plugin (jQuery)
 * http://www.jplayer.org
 *
 * Copyright (c) 2009 - 2012 Happyworm Ltd
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * Version: 1.0.1 (jPlayer 2.1.0+)
 * Date: 30th May 2011
 *
 * Author: Mark J Panaghiston @thepag
 *
 * CirclePlayer prototype developed by:
 * Mark Boas @maboa
 * Silvia Benvenuti @aulentina
 * Jussi Kalliokoski @quinirill
 *
 * Inspired by :
 * Neway @imneway http://imneway.net/ http://forrst.com/posts/Untitled-CPt
 * and
 * Liam McKay @liammckay http://dribbble.com/shots/50882-Purple-Play-Pause
 *
 * Standing on the shoulders of :
 * John Resig @jresig
 * Mark Panaghiston @thepag
 * Louis-Rémi Babé @Louis_Remi
 */


var CirclePlayer = function(jPlayerSelector, media, options) {
	var	self = this,

		defaults = {
			// solution: "flash, html", // For testing Flash with CSS3
			supplied: "m4a, oga",
			// Android 2.3 corrupts media element if preload:"none" is used.
			// preload: "none", // No point preloading metadata since no times are displayed. It helps keep the buffer state correct too.
			cssSelectorAncestor: "#cp_container_1",
			cssSelector: {
				play: ".cp-play",
				pause: ".cp-pause"
			}
		},

		cssSelector = {
			bufferHolder: ".cp-buffer-holder",
			buffer1: ".cp-buffer-1",
			buffer2: ".cp-buffer-2",
			progressHolder: ".cp-progress-holder",
			progress1: ".cp-progress-1",
			progress2: ".cp-progress-2",
			circleControl: ".cp-circle-control"
		};

	this.cssClass = {
		gt50: "cp-gt50",
		fallback: "cp-fallback"
	};

	this.spritePitch = 104;
	this.spriteRatio = 0.24; // Number of steps / 100

	this.player = $(jPlayerSelector);
	this.media = $.extend({}, media);
	this.options = $.extend(true, {}, defaults, options); // Deep copy

	this.cssTransforms = Modernizr.csstransforms;
	this.audio = {};
	this.dragging = false; // Indicates if the progressbar is being 'dragged'.

	this.eventNamespace = ".CirclePlayer"; // So the events can easily be removed in destroy.

	this.jq = {};
	$.each(cssSelector, function(entity, cssSel) {
		self.jq[entity] = $(self.options.cssSelectorAncestor + " " + cssSel);
	});

	this._initSolution();
	this._initPlayer();
};

CirclePlayer.prototype = {
	_createHtml: function() {
	},
	_initPlayer: function() {
		var self = this;
		this.player.jPlayer(this.options);

		this.player.bind($.jPlayer.event.ready + this.eventNamespace, function(event) {
			if(event.jPlayer.html.used && event.jPlayer.html.audio.available) {
				self.audio = $(this).data("jPlayer").htmlElement.audio;
			}
			$(this).jPlayer("setMedia", self.media);
			self._initCircleControl();
		});

		this.player.bind($.jPlayer.event.play + this.eventNamespace, function(event) {
			$(this).jPlayer("pauseOthers");
		});

		// This event fired as play time increments
		this.player.bind($.jPlayer.event.timeupdate + this.eventNamespace, function(event) {
			if (!self.dragging) {
				self._timeupdate(event.jPlayer.status.currentPercentAbsolute);
			}
		});

		// This event fired as buffered time increments
		this.player.bind($.jPlayer.event.progress + this.eventNamespace, function(event) {
			var percent = 0;
			if((typeof self.audio.buffered === "object") && (self.audio.buffered.length > 0)) {
				if(self.audio.duration > 0) {
					var bufferTime = 0;
					for(var i = 0; i < self.audio.buffered.length; i++) {
						bufferTime += self.audio.buffered.end(i) - self.audio.buffered.start(i);
						// console.log(i + " | start = " + self.audio.buffered.start(i) + " | end = " + self.audio.buffered.end(i) + " | bufferTime = " + bufferTime + " | duration = " + self.audio.duration);
					}
					percent = 100 * bufferTime / self.audio.duration;
				} // else the Metadata has not been read yet.
				// console.log("percent = " + percent);
			} else { // Fallback if buffered not supported
				// percent = event.jPlayer.status.seekPercent;
				percent = 0; // Cleans up the inital conditions on all browsers, since seekPercent defaults to 100 when object is undefined.
			}
			self._progress(percent); // Problem here at initial condition. Due to the Opera clause above of buffered.length > 0 above... Removing it means Opera's white buffer ring never shows like with polyfill.
			// Firefox 4 does not always give the final progress event when buffered = 100%
		});

		this.player.bind($.jPlayer.event.ended + this.eventNamespace, function(event) {
			self._resetSolution();
		});
	},
	_initSolution: function() {
		if (this.cssTransforms) {
			this.jq.progressHolder.show();
			this.jq.bufferHolder.show();
		}
		else {
			this.jq.progressHolder.addClass(this.cssClass.gt50).show();
			this.jq.progress1.addClass(this.cssClass.fallback);
			this.jq.progress2.hide();
			this.jq.bufferHolder.hide();
		}
		this._resetSolution();
	},
	_resetSolution: function() {
		if (this.cssTransforms) {
			this.jq.progressHolder.removeClass(this.cssClass.gt50);
			this.jq.progress1.css({'transform': 'rotate(0deg)'});
			this.jq.progress2.css({'transform': 'rotate(0deg)'}).hide();
		}
		else {
			this.jq.progress1.css('background-position', '0 ' + this.spritePitch + 'px');
		}
	},
	_initCircleControl: function() {
		var self = this;
		this.jq.circleControl.grab({
			onstart: function(){
				self.dragging = true;
			}, onmove: function(event){
				var pc = self._getArcPercent(event.position.x, event.position.y);
				self.player.jPlayer("playHead", pc).jPlayer("play");
				self._timeupdate(pc);
			}, onfinish: function(event){
				self.dragging = false;
				var pc = self._getArcPercent(event.position.x, event.position.y);
				self.player.jPlayer("playHead", pc).jPlayer("play");
			}
		});
	},
	_timeupdate: function(percent) {
		var degs = percent * 3.6+"deg";

		var spriteOffset = (Math.floor((Math.round(percent))*this.spriteRatio)-1)*-this.spritePitch;

		if (percent <= 50) {
			if (this.cssTransforms) {
				this.jq.progressHolder.removeClass(this.cssClass.gt50);
				this.jq.progress1.css({'transform': 'rotate(' + degs + ')'});
				this.jq.progress2.hide();
			} else { // fall back
				this.jq.progress1.css('background-position', '0 '+spriteOffset+'px');
			}
		} else if (percent <= 100) {
			if (this.cssTransforms) {
				this.jq.progressHolder.addClass(this.cssClass.gt50);
				this.jq.progress1.css({'transform': 'rotate(180deg)'});
				this.jq.progress2.css({'transform': 'rotate(' + degs + ')'});
				this.jq.progress2.show();
			} else { // fall back
				this.jq.progress1.css('background-position', '0 '+spriteOffset+'px');
			}
		}
	},
	_progress: function(percent) {
		var degs = percent * 3.6+"deg";

		if (this.cssTransforms) {
			if (percent <= 50) {
				this.jq.bufferHolder.removeClass(this.cssClass.gt50);
				this.jq.buffer1.css({'transform': 'rotate(' + degs + ')'});
				this.jq.buffer2.hide();
			} else if (percent <= 100) {
				this.jq.bufferHolder.addClass(this.cssClass.gt50);
				this.jq.buffer1.css({'transform': 'rotate(180deg)'});
				this.jq.buffer2.show();
				this.jq.buffer2.css({'transform': 'rotate(' + degs + ')'});
			}
		}
	},
	_getArcPercent: function(pageX, pageY) {
		var	offset	= this.jq.circleControl.offset(),
			x	= pageX - offset.left - this.jq.circleControl.width()/2,
			y	= pageY - offset.top - this.jq.circleControl.height()/2,
			theta	= Math.atan2(y,x);

		if (theta > -1 * Math.PI && theta < -0.5 * Math.PI) {
			theta = 2 * Math.PI + theta;
		}

		// theta is now value between -0.5PI and 1.5PI
		// ready to be normalized and applied

		return (theta + Math.PI / 2) / 2 * Math.PI * 10;
	},
	setMedia: function(media) {
		this.media = $.extend({}, media);
		this.player.jPlayer("setMedia", this.media);
	},
	play: function(time) {
		this.player.jPlayer("play", time);
	},
	pause: function(time) {
		this.player.jPlayer("pause", time);
	},
	destroy: function() {
		this.player.unbind(this.eventNamespace);
		this.player.jPlayer("destroy");
	}
};
