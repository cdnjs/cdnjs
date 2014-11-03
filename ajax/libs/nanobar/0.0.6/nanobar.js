/* http://nanobar.micronube.com/  ||  https://github.com/jacoborus/nanobar/    MIT LICENSE */
var Nanobar = (function () {

	'use strict';
	var addCss, animation, transEvent, createBar, Nanobar,
		css = '.nanobar{float:left;width:100%;height:4px;z-index:9999;}.nanobarbar{width:0;height:100%;float:left;transition:all .3s;}',
		head = document.head || document.getElementsByTagName( 'head' )[0];


	// Create and insert style element in head if not exists
	addCss = function () {
		var s = document.getElementById( 'nanobar-style' );

		if (s === null) {
			s = document.createElement( 'style' );
			s.type = 'text/css';
			s.id = 'nanobar-style';

			head.insertBefore(s, head.firstChild);

			if (s.styleSheet) {   // IE
				s.styleSheet.cssText = css;
			} else {              // the world
				s.appendChild( document.createTextNode( css ));
			}
		}
	}


	// crossbrowser transition animation
	animation = function (){
		var el = document.createElement('fakeelement'),
			transitions = {
			'transition':'transitionend',
			'OTransition':'oTransitionEnd',
			'MozTransition':'transitionend',
			'WebkitTransition':'webkitTransitionEnd'
		}, t;

		for(t in transitions){
			if( el.style[t] !== undefined ){
				return transitions[t];
			}
		}
	};

	// get specific browser animation transition
	transEvent = animation();



	createBar = function ( cont ) {
		// create progress element
		var bar = document.createElement( 'div' );
		bar.setAttribute( 'class', 'nanobarbar' );
		bar.style.background = cont.opts.bg;
		bar.setAttribute( 'on' , '1');
		cont.cont.appendChild( bar );


		// detect transitions ends
		transEvent && bar.addEventListener( transEvent, function() {
			if (bar.style.width === '100%' && bar.getAttribute( 'on' ) === '1' ) {
				bar.setAttribute( 'on' , 0);

				// remove bar from array list
				cont.bars.pop();

				// reduce bar and remove DOM element with delay
				bar.style.height = 0;
				setTimeout( function () {
					cont.cont.removeChild( bar );
				}, 300);
			}
		});

		return bar;
	}



	Nanobar = function (opt) {

		var opts = this.opts = opt || {},
			cont;

		// set options
		opts.bg = opts.bg || '#000';
		this.bars = [];

		// append style
		addCss();

		// create bar container
		cont = this.cont = document.createElement( 'div' );
		cont.setAttribute( 'class', 'nanobar' );
		if (opts.id) {
			cont.id = opts.id;
		}
		if (!opts.target) {
			cont.style.position = 'fixed';
			cont.style.top = '0';
		} else {
			cont.style.position = 'relative';
		}

		// insert container
		if (!opts.target) {
			document.getElementsByTagName( 'body' )[0].appendChild( cont );
		} else {
			opts.target.insertBefore( cont, opts.target.firstChild);
		}

		return this.init();
	};



	Nanobar.prototype.init = function () {
		// create and insert bar in DOM and this.bars array
		var bar =  createBar( this );
		this.bars.unshift( bar);
	};


	Nanobar.prototype.go = function (p) {
		// expand bar
		this.bars[0].style.width = p + '%';

		// create new bar at progress end
		if (p == 100) {
			this.init();
		}
	};

	return Nanobar;
})();