/*! Multiple.js - v0.0.1 - 2016-04-09
* http://NeXTs.github.com/Multiple.js/
* Copyright (c) 2015 Denis Lukov; Licensed MIT */

;(function(root, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else root['Multiple'] = definition();
}(this, function() {
	"use strict"

	// http://stackoverflow.com/a/4819886/1221082
	var isMobile = 'ontouchstart' in window || navigator.maxTouchPoints;
	// http://stackoverflow.com/a/12625907/1221082
	var isWebkit = 'WebkitAppearance' in document.documentElement.style;

	// Force webkit repaint on resize
	isWebkit && window.addEventListener('resize', function(e){
		document.body.style.visibility = 'hidden';
		e = document.body.offsetHeight;
		document.body.style.visibility = '';
	});

	var Multiple = function(options) {
		if( ! (this instanceof Multiple)) return new Multiple(options);

		['selector', 'background', 'affectText', 'opacity'].forEach(function(option) {
			this[option] = options[option];
		}.bind(this));

		this.className = 'multiple-' + (isMobile ? 'mobile' : 'desktop') + (this.affectText ? '-text' : '');
		this.update(this.background);
	}

	Multiple.prototype = {
		constructor: Multiple,
		each: function(select, callback, nodes) {
			Array.prototype.slice.call(nodes ? select : document.querySelectorAll(select)).forEach(callback.bind(this));
		},
		// #f95 or #ff9955 or rgb(255,153,85) -> rgba(255,102,0,0.666)
		setOpacity: function(styles) {
			return styles.replace(/#\b([a-f\d]{3}|[a-f\d]{6})\b/gi, function(full, hex) {
			  	var rgb = hex.match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) });
				return 'rgb(' + rgb.join(',') + ')';
			}).replace(/rgb\((.[^\)]*)\)/gi, function(full, rgb) {
				var min, a = (255 - (min = Math.min.apply(Math, (rgb = rgb.split(','))))) / 255,
					rgba = this.opacity === true
						? rgb.map(function(channel) { return 0 | (channel - min) / a }).concat((0|1000*a)/1000)
						: rgb.concat(this.opacity);
				return 'rgba(' + rgba.join(',') + ')';
			}.bind(this));
		},
		// linear-gradient(#fff, #000) -> -webkit-*, -moz-*, -ms-*, -o-*
		setVendors: function(styles, textMode) {
			var result = textMode ? [] : [styles];
			if(/-gradient\(/i.test(styles) || textMode) ['webkit', 'moz', 'ms', 'o'].forEach(function(vendor, i) {
				if(textMode && i) return;
				result.unshift((textMode ? '-webkit-linear-gradient(transparent,transparent),' : '') + styles.replace(/([^,\s]*-gradient\()/gi, '-' + vendor + '-$1'));
	  		});
			return result;
		},
		setStyles: function(selector, styles, textMode) {
			if(this.opacity) styles = this.setOpacity(styles);
			this.styleTag.innerHTML = selector + '{background-image:' + this.setVendors(styles, textMode).join(';\nbackground-image:') + '}';
		},
		renderTag: function(className) {
			var tag = document.createElement('div');
			tag.className = className;
			return tag;
		},
		update: function(styles) {
			this.each(this.selector, function(elem) {
				if(elem.getAttribute('data-multiple')) return;
				if( ! isMobile || this.affectText) return elem.classList.add(this.className);

				var wrapperTag = this.renderTag(this.className + '-wrapper'),
					contentTag = this.renderTag(this.className + '-content');
				this.each(elem.childNodes, function(child) { contentTag.appendChild(child) }, true);
				elem.appendChild(wrapperTag);
				wrapperTag.appendChild(this.renderTag(this.className));
				wrapperTag.appendChild(contentTag);
				elem.setAttribute('data-multiple', true);
			});

			if( ! styles) return;
			if( ! this.styleTag) document.head.appendChild(this.styleTag = document.createElement('style'));
			if( ! isMobile || ! this.affectText) this.setStyles(this.selector + (isMobile ? ' ' : '') + '.' + this.className + (isMobile ? ':before' : ''), styles, this.affectText);
			if(this.affectText) this.styleTag.innerHTML += this.selector + '.' + this.className + '{color:' + this.affectText + '}';
		},
		destroy: function() {
			this.styleTag.parentNode && this.styleTag.parentNode.removeChild(this.styleTag) && delete this.styleTag;
			this.each(this.selector, function(elem) {
				elem.classList.remove(this.className);
				elem.removeAttribute('data-multiple');

				if( ! isMobile || this.affectText) return;
				this.each(elem.children[0].children[1].childNodes, function(child) { elem.appendChild(child) }, true);
				elem.removeChild(elem.children[0]);
			});
		}
	}

	return Multiple;
}));