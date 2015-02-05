/* http://nanobar.micronube.com/  ||  https://github.com/jacoborus/nanobar/    MIT LICENSE */
var Nanobar = function (options) {
	'use strict';
	var addCss, style, n, animation;
	n = this;
	var opts = options || {};
	opts.bg = opts.bg || '#000';

	// Generate css style element
	style = '.nanobarbar{width:0;height:100%;float:left;}' +
			'.nanobarbar.active{transition: all 0.3s;}' +
			'.goOut{margin-top:-4px;opacity:0}' +
			'.nanobar{float:left;width:100%;height:4px;z-index:9999;}';


	// Create style element in document
	addCss = function (css) {
		var s = document.getElementById( 'nanobar-style' );

		if (s === null) {
			s = document.createElement( 'style' );
			s.setAttribute( 'type', 'text/css' );
			s.setAttribute( 'id', 'nanobar-style');
			document.getElementsByTagName( 'head' )[0].appendChild( s );
			if (s.styleSheet) {   // IE
				s.styleSheet.cssText = css;
			} else {              // the world
				s.appendChild( document.createTextNode( css ));
			}
		}
	};

	// crossbrowser transition animation
	animation = function (){
		var t;
		var el = document.createElement('fakeelement');
		var transitions = {
			'transition':'transitionend',
			'OTransition':'oTransitionEnd',
			'MozTransition':'transitionend',
			'WebkitTransition':'webkitTransitionEnd'
		};

		for(t in transitions){
			if( el.style[t] !== undefined ){
				return transitions[t];
			}
		}
	};

	// append style
	addCss( style );


	// create progress container
	this.container = document.createElement( 'div' );
	this.container.setAttribute( 'class', 'nanobar' );
	if (opts.id) {
		this.container.setAttribute( 'id', opts.id );
	}
	if (!opts.target) {
		this.container.style.position = 'fixed';
		this.container.style.top = '0';
	} else {
		this.container.style.position = 'relative';
	}

	// create progress element
	this.bar = document.createElement( 'div' );
	this.bar.setAttribute( 'class', 'nanobarbar' );
	this.bar.style.background = opts.bg;
	this.container.appendChild( this.bar );

	if (!opts.target) {
		document.getElementsByTagName( 'body' )[0].appendChild( this.container );
	} else {
		opts.target.insertBefore( this.container, opts.target.firstChild);
	}

	// detect transitions end
	var transitionEvent = animation();
	transitionEvent && this.bar.addEventListener(transitionEvent, function() {
		if (n.bar.style.width === '100%' && n.bar.style.height === '100%') {
			n.finish();
		}
	});
	return this.init();
};


Nanobar.prototype.init = function () {
	this.bar.className = 'nanobarbar';
	this.bar.style.height = '100%';
	this.bar.style.width = 0;
	var n = this;
	setTimeout( function (){
		n.bar.className = 'nanobarbar active';
	}, 1);
};


Nanobar.prototype.finish = function () {
	var n = this;
	this.bar.style.height = 0 ;
	setTimeout( function (){
		n.init();
	}, 300);
};


Nanobar.prototype.go = function (p) {
	this.bar.style.width = p + '%';
};
