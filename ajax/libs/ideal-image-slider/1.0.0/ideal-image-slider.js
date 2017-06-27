/*
 * Ideal Image Slider v1.0.0
 *
 * By Gilbert Pellegrom
 * http://gilbert.pellegrom.me
 *
 * Free to use and abuse under the MIT license.
 * https://raw.githubusercontent.com/gilbitron/Ideal-Image-Slider/master/LICENSE
 */

var IdealImageSlider = (function() {
	"use strict";

	/*
	 * Helper functions
	 */
	var _deepExtend = function(out) {
		out = out || {};
		for(var i = 1; i < arguments.length; i++){
			var obj = arguments[i];
			if(!obj)
				continue;
			for(var key in obj){
				if(obj.hasOwnProperty(key)){
					if(typeof obj[key] === 'object')
						deepExtend(out[key], obj[key]);
					else
						out[key] = obj[key];
				}
			}
		}
		return out;
	};

	var _addClass = function(el, className) {
		if(!className) return;
		if(el.classList){
			el.classList.add(className);
		} else {
			el.className += ' ' + className;
		}
	};

	var _removeClass = function(el, className) {
		if(el.classList){
			el.classList.remove(className);
		} else {
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	};

	var _toArray = function(obj) {
		return Array.prototype.slice.call(obj);
	}

	var _arrayRemove = function(array, from, to) {
		var rest = array.slice((to || from) + 1 || array.length);
		array.length = from < 0 ? array.length + from : from;
		return array.push.apply(array, rest);
	};

	var _loadImg = function(slide, callback) {
		if(!slide.style.backgroundImage){
			var img = new Image();
			img.setAttribute('src', slide.getAttribute('data-src'));
			img.onload = function() {
				slide.style.backgroundImage = 'url('+ slide.getAttribute('data-src') +')';
				if(typeof(callback) === 'function') callback(this);
			};
		}
	};

	var _isHighDPI = function(){
	    var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
				          (min--moz-device-pixel-ratio: 1.5),\
				          (-o-min-device-pixel-ratio: 3/2),\
				          (min-resolution: 1.5dppx)";
	    if (window.devicePixelRatio > 1)
	        return true;
	    if (window.matchMedia && window.matchMedia(mediaQuery).matches)
	        return true;
	    return false;
	}


	// Touch event listeners
	var ce=function(e,n){var a=document.createEvent("CustomEvent");a.initCustomEvent(n,true,true,e.target);e.target.dispatchEvent(a);a=null;return false},
		nm=true,sp={x:0,y:0},ep={x:0,y:0},
		touch={
			touchstart:function(e){sp={x:e.touches[0].pageX,y:e.touches[0].pageY}},
			touchmove:function(e){nm=false;ep={x:e.touches[0].pageX,y:e.touches[0].pageY}},
			touchend:function(e){if(nm){ce(e,'fc')}else{var x=ep.x-sp.x,xr=Math.abs(x),y=ep.y-sp.y,yr=Math.abs(y);if(Math.max(xr,yr)>20){ce(e,(xr>yr?(x<0?'swl':'swr'):(y<0?'swu':'swd')))}};nm=true},
			touchcancel:function(e){nm=false}
		};
	for(var a in touch){document.addEventListener(a,touch[a],false);}

	/*
	 * Slider class
	 */
	var Slider = function(args) {
		// Defaults
		this.settings = {
			selector: '',
			height: 400, // Required but can be set by CSS
			interval: 4000,
			transitionDuration: 700,
			effect: 'slide',
			disableNav: false,
			previousNavSelector: '',
			nextNavSelector: '',
			classes: {
				container: 'ideal-image-slider',
				slide: 'iis-slide',
				previousSlide: 'iis-previous-slide',
				currentSlide: 'iis-current-slide',
				nextSlide: 'iis-next-slide',
				previousNav: 'iis-previous-nav',
				nextNav: 'iis-next-nav',
				animating: 'iis-is-animating',
				directionPrevious: 'iis-direction-previous',
				directionNext: 'iis-direction-next'
			},
			onInit: function(){},
			onStart: function(){},
			onStop: function(){},
			onDestroy: function(){},
			beforeChange: function(){},
			afterChange: function(){}
		}

		// Parse args
		if(typeof args === 'string'){
			this.settings.selector = args;
		}
		else if(typeof args === 'object'){
			_deepExtend(this.settings, args);
		}

		// Slider (container) element
		var sliderEl = document.querySelector(this.settings.selector);
		if(!sliderEl) return null;
		sliderEl.setAttribute('role', 'listbox');

		// Slides
		var origChildren = _toArray(sliderEl.children),
			validSlides = [];
		sliderEl.innerHTML = '';
		Array.prototype.forEach.call(origChildren, function(slide, i){
			if(slide instanceof HTMLImageElement || slide instanceof HTMLAnchorElement){
				var slideEl = document.createElement('a'),
					href = '',
					target = '';

				if(slide instanceof HTMLAnchorElement){
					href = slide.getAttribute('href');
					target = slide.getAttribute('target');

					var img = slide.querySelector('img');
					if(img !== null){
						slide = img;
					} else {
						return;
					}
				}

				if(typeof slide.dataset !== 'undefined'){
					_deepExtend(slideEl.dataset, slide.dataset);
					if(slide.dataset.src){
						// Use data-src for on-demand loading
						slideEl.dataset.src = slide.dataset.src;
					} else {
						slideEl.dataset.src = slide.src;
					}

					// HiDPI support
					if(_isHighDPI() && slide.dataset['src-2x']){
						slideEl.dataset.src = slide.dataset['src-2x'];
					}
				} else {
					// IE
					if(slide.getAttribute('data-src')){
						slideEl.setAttribute('data-src', slide.getAttribute('data-src'));
					} else {
						slideEl.setAttribute('data-src', slide.getAttribute('src'));
					}
				}

				if(href) slideEl.setAttribute('href', href);
				if(target) slideEl.setAttribute('target', target);
				if(slide.getAttribute('className')) _addClass(slideEl, slide.getAttribute('className'));
				if(slide.getAttribute('id')) slideEl.setAttribute('id', slide.id);
				if(slide.getAttribute('alt')) slideEl.innerHTML = slide.getAttribute('alt');
				slideEl.setAttribute('role', 'option');

				slideEl.style.cssText += '-webkit-transition-duration:'+ this.settings.transitionDuration +'ms;-moz-transition-duration:'+ this.settings.transitionDuration +'ms;-o-transition-duration:'+ this.settings.transitionDuration +'ms;transition-duration:'+ this.settings.transitionDuration +'ms;';

				sliderEl.appendChild(slideEl);
				validSlides.push(slideEl);
			}
		}.bind(this));
		var slides = validSlides;
		if(slides.length <= 1) return null;

		// Create navigation
		if(!this.settings.disableNav){
			var previousNav, nextNav;
			if(this.settings.previousNavSelector){
				previousNav = document.querySelector(this.settings.previousNavSelector);
			} else {
				previousNav = document.createElement('a');
				sliderEl.appendChild(previousNav);
			}
			if(this.settings.nextNavSelector){
				nextNav = document.querySelector(this.settings.nextNavSelector);
			} else {
				nextNav = document.createElement('a');
				sliderEl.appendChild(nextNav);
			}

			_addClass(previousNav, this.settings.classes.previousNav);
			_addClass(nextNav, this.settings.classes.nextNav);
			previousNav.addEventListener('click', (function(){
				this.stop();
				this.previousSlide();
			}).bind(this));
			nextNav.addEventListener('click', (function(){
				this.stop();
				this.nextSlide();
			}).bind(this));

			// Touch Navigation
			if('ontouchstart' in document.documentElement){
				previousNav.style.display = 'none';
				nextNav.style.display = 'none';

				sliderEl.addEventListener('swr', function(){
					this.stop();
					this.previousSlide();
				}.bind(this), false);
				sliderEl.addEventListener('swl', function(){
					this.stop();
					this.nextSlide();
				}.bind(this), false);
			}
		}

		// Create internal attributes
		this._attributes = {
			container: sliderEl,
			slides: slides,
			previousSlide: typeof slides[slides.length-1] !== 'undefined' ? slides[slides.length-1] : slides[0],
			currentSlide: slides[0],
			nextSlide: typeof slides[1] !== 'undefined' ? slides[1] : slides[0],
			timerId: 0,
			// Used in destroy()
			origChildren: origChildren,
			// For touch nav
			touchX: null,
			touchY: null,
			touchIsMoving: false
		};

		// Set height
		if(this.settings.height){
			this._attributes.container.style.height = this.settings.height +'px';
		}

		// Add classes
		_addClass(sliderEl, this.settings.classes.container);
		_addClass(sliderEl, 'iis-effect-'+ this.settings.effect);
		Array.prototype.forEach.call(this._attributes.slides, function(slide, i){
			_addClass(slide, this.settings.classes.slide);
		}.bind(this));
		_addClass(this._attributes.previousSlide, this.settings.classes.previousSlide);
		_addClass(this._attributes.currentSlide, this.settings.classes.currentSlide);
		_addClass(this._attributes.nextSlide, this.settings.classes.nextSlide);

		// Load first image
		_loadImg(this._attributes.currentSlide, (function(){
			this.settings.onInit.apply(this);
		}).bind(this));
		// Preload next images
		_loadImg(this._attributes.previousSlide);
		_loadImg(this._attributes.nextSlide);
	};

	Slider.prototype.get = function(attribute) {
		if(this._attributes.hasOwnProperty(attribute)){
			return this._attributes[attribute];
		}
	};

	Slider.prototype.set = function(attribute, value) {
		return (this._attributes[attribute] = value);
	};

	Slider.prototype.start = function() {
		this._attributes.timerId = setInterval(this.nextSlide.bind(this), this.settings.interval);
		this.settings.onStart.apply(this);
	};

	Slider.prototype.stop = function() {
		clearInterval(this._attributes.timerId);
		this._attributes.timerId = 0;
		this.settings.onStop.apply(this);
	};

	Slider.prototype.previousSlide = function() {
		this.settings.beforeChange.apply(this);
		_removeClass(this._attributes.previousSlide, this.settings.classes.previousSlide);
		_removeClass(this._attributes.currentSlide, this.settings.classes.currentSlide);
		_removeClass(this._attributes.nextSlide, this.settings.classes.nextSlide);

		var slides = this._attributes.slides,
			index = slides.indexOf(this._attributes.currentSlide);
		this._attributes.nextSlide = this._attributes.currentSlide;
		this._attributes.previousSlide = slides[index-2];
		this._attributes.currentSlide = slides[index-1];
		if(typeof this._attributes.currentSlide === 'undefined' &&
		typeof this._attributes.previousSlide === 'undefined'){
			this._attributes.currentSlide = slides[slides.length-1];
			this._attributes.previousSlide = slides[slides.length-2];
		} else {
			if(typeof this._attributes.previousSlide === 'undefined'){
				this._attributes.previousSlide = slides[slides.length-1];
			}
		}

		// Preload next image
		_loadImg(this._attributes.previousSlide);

		_addClass(this._attributes.previousSlide, this.settings.classes.previousSlide);
		_addClass(this._attributes.currentSlide, this.settings.classes.currentSlide);
		_addClass(this._attributes.nextSlide, this.settings.classes.nextSlide);

		_addClass(this._attributes.container, this.settings.classes.directionPrevious);
		setTimeout(function(){
			_removeClass(this._attributes.container, this.settings.classes.directionPrevious);
		}.bind(this), this.settings.transitionDuration);

		if(this.settings.transitionDuration){
			_addClass(this._attributes.container, this.settings.classes.animating);
			setTimeout(function(){
				_removeClass(this._attributes.container, this.settings.classes.animating);
			}.bind(this), this.settings.transitionDuration);
		}
		this.settings.afterChange.apply(this);
	};

	Slider.prototype.nextSlide = function() {
		this.settings.beforeChange.apply(this);
		_removeClass(this._attributes.previousSlide, this.settings.classes.previousSlide);
		_removeClass(this._attributes.currentSlide, this.settings.classes.currentSlide);
		_removeClass(this._attributes.nextSlide, this.settings.classes.nextSlide);

		var slides = this._attributes.slides,
			index = slides.indexOf(this._attributes.currentSlide);
		this._attributes.previousSlide = this._attributes.currentSlide;
		this._attributes.currentSlide = slides[index+1];
		this._attributes.nextSlide = slides[index+2];
		if(typeof this._attributes.currentSlide === 'undefined' &&
		   typeof this._attributes.nextSlide === 'undefined'){
			this._attributes.currentSlide = slides[0];
			this._attributes.nextSlide = slides[1];
		} else {
			if(typeof this._attributes.nextSlide === 'undefined'){
				this._attributes.nextSlide = slides[0];
			}
		}

		// Preload next image
		_loadImg(this._attributes.nextSlide);

		_addClass(this._attributes.previousSlide, this.settings.classes.previousSlide);
		_addClass(this._attributes.currentSlide, this.settings.classes.currentSlide);
		_addClass(this._attributes.nextSlide, this.settings.classes.nextSlide);

		_addClass(this._attributes.container, this.settings.classes.directionNext);
		setTimeout(function(){
			_removeClass(this._attributes.container, this.settings.classes.directionNext);
		}.bind(this), this.settings.transitionDuration);

		if(this.settings.transitionDuration){
			_addClass(this._attributes.container, this.settings.classes.animating);
			setTimeout(function(){
				_removeClass(this._attributes.container, this.settings.classes.animating);
			}.bind(this), this.settings.transitionDuration);
		}
		this.settings.afterChange.apply(this);
	};

	Slider.prototype.gotoSlide = function(index) {
		this.settings.beforeChange.apply(this);
		this.stop();

		_removeClass(this._attributes.previousSlide, this.settings.classes.previousSlide);
		_removeClass(this._attributes.currentSlide, this.settings.classes.currentSlide);
		_removeClass(this._attributes.nextSlide, this.settings.classes.nextSlide);

		index--; // Index should be 1-indexed
		var slides = this._attributes.slides;
		this._attributes.previousSlide = slides[index-1];
		this._attributes.currentSlide = slides[index];
		this._attributes.nextSlide = slides[index+1];
		if(typeof this._attributes.previousSlide === 'undefined'){
			this._attributes.previousSlide = slides[slides.length-1];
		}
		if(typeof this._attributes.nextSlide === 'undefined'){
			this._attributes.nextSlide = slides[0];
		}

		// Load images
		_loadImg(this._attributes.previousSlide);
		_loadImg(this._attributes.currentSlide);
		_loadImg(this._attributes.nextSlide);

		_addClass(this._attributes.previousSlide, this.settings.classes.previousSlide);
		_addClass(this._attributes.currentSlide, this.settings.classes.currentSlide);
		_addClass(this._attributes.nextSlide, this.settings.classes.nextSlide);

		if(this.settings.transitionDuration){
			_addClass(this._attributes.container, this.settings.classes.animating);
			setTimeout(function(){
				_removeClass(this._attributes.container, this.settings.classes.animating);
			}.bind(this), this.settings.transitionDuration);
		}
		this.settings.afterChange.apply(this);
	};

	Slider.prototype.destroy = function() {
		clearInterval(this._attributes.timerId);
		this._attributes.timerId = 0;

		this._attributes.container.innerHTML = '';
		Array.prototype.forEach.call(this._attributes.origChildren, function(child, i){
			this._attributes.container.appendChild(child);
		}.bind(this));

		_removeClass(this._attributes.container, this.settings.classes.container);
		_removeClass(this._attributes.container, 'iis-effect-'+ this.settings.effect);
		this._attributes.container.style.height = '';

		this.settings.onDestroy.apply(this);
	};

	return {
		Slider: Slider
	};

})();
