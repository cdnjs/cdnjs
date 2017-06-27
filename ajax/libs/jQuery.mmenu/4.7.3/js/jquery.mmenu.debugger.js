/*	
 * Debugger for jQuery mmenu
 * Include this file after including the jquery.mmenu plugin to debug your menu.
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu';
	
	if ( typeof console == 'undefined' )
	{
		return false;
	}


	var glbl = $[ _PLUGIN_ ].glbl,
		_c = $[ _PLUGIN_ ]._c,
		_d = $[ _PLUGIN_ ]._d,
		_e = $[ _PLUGIN_ ]._e;


	function debug( msg )
	{
		console.log( 'MMENU: ' + msg );
	};
	function deprecated( depr, repl, vers )
	{
		var msg = 'MMENU: ' + depr + 'is deprecated';

		if ( vers )
		{
			msg += ' as of version ' + vers;
		}
		if ( repl )
		{
			msg += ', use ' + repl + ' instead.';
		}
		else
		{
			msg += '.';
		}
		console.warn( msg );
	};


	$[ _PLUGIN_ ].prototype.___deprecated = function()
	{

		//	Options 4.1
		if ( this.opts.onClick && typeof this.opts.onClick.setLocationHref != 'undefined' )
		{
			deprecated( 'onClick.setLocationHref option', '!onClick.preventDefault', '4.1' );
			if ( typeof this.opts.onClick.setLocationHref == 'boolean' )
			{
				this.opts.onClick.preventDefault = !this.opts.onClick.setLocationHref;
			}
		}

		//	Options 4.3
		for ( var a = [ 'position', 'zposition', 'modal', 'moveBackground' ], b = 0, l = a.length; b < l; b++ )
		{
			if ( typeof this.opts[ a[ b ] ] != 'undefined' )
			{
				deprecated( 'The option "' + a[ b ] + '"', 'offCanvas.' + a[ b ], '4.3' );
				this.opts.offCanvas = this.opts.offCanvas || {};
				this.opts.offCanvas[ a[ b ] ] = this.opts[ a[ b ] ];
			}
		}

		//	Options 4.2
		if ( this.opts.offCanvas )
		{
			if ( this.opts.offCanvas.position == 'top' || this.opts.offCanvas.position == 'bottom' )
			{
				if ( this.opts.offCanvas.zposition == 'back' || this.opts.offCanvas.zposition == 'next' )
				{
					deprecated( 'Using offCanvas.position "' + this.opts.offCanvas.position + '" in combination with offCanvas.zposition "' + this.opts.offCanvas.zposition + '"', 'offCanvas.zposition "front"', '4.2' );
					this.opts.offCanvas.zposition = 'front';
				}
			}
		}
		
		//	Options 4.6
		if ( this.opts.header )
		{
			if ( this.opts.header.add instanceof Array )
			{
				deprecated( 'An array for the header.add option', 'header.content', '4.6' );
				this.opts.header.content = this.opts.header.add;
				this.opts.header.add = true;
			}
		}



		//	Configuration 4.1
		if ( typeof this.conf.panelNodeType != 'undefined' )
		{
			deprecated( 'panelNodeType configuration option', 'panelNodetype' );
			this.conf.panelNodetype = this.conf.panelNodeType;
		}

		//	Configuration 4.3
		for ( var a = [ 'panel', 'list', 'selected', 'label', 'spacer' ], b = 0, l = a.length; b < l; b++ )
		{
			if ( typeof this.conf[ a[ b ] + 'Class' ] != 'undefined' )
			{
				deprecated( 'The configuration option "' + a[ b ] + 'Class"', 'classNames.' + a[ b ], '4.3' );
				this.conf.classNames[ a[ b ] ] = this.conf[ a[ b ] + 'Class' ];
			}
		}
		if ( typeof this.conf.counterClass != 'undefined' )
		{
			deprecated( 'The configuration option "counterClass"', 'classNames.counters.counter', '4.3' );
			this.conf.classNames.counters = this.conf.classNames.counters || {};
			this.conf.classNames.counters.counter = this.conf.counterClass;
		}
		if ( typeof this.conf.collapsedClass != 'undefined' )
		{
			deprecated( 'The configuration option "collapsedClass"', 'classNames.labels.collapsed', '4,3' );
			this.conf.classNames.labels = this.conf.classNames.labels || {};
			this.conf.classNames.labels.collapsed = this.conf.collapsedClass;
		}
		if ( typeof this.conf.header != 'undefined' )
		{
			for ( var a = [ 'panelHeader', 'panelNext', 'panelPrev' ], b = 0, l = a.length; b < l; b++ )
			{
				if ( typeof this.conf.header[ a[ b ] + 'Class' ] != 'undefined' )
				{
					deprecated( 'The configuration option "header.' + a[ b ] + 'Class"', 'classNames.header.' + a[ b ], '4.3' );
					this.conf.classNames.header = this.conf.classNames.header || {};
					this.conf.classNames.header[ a[ b ] ] = this.conf.header[ a[ b ] + 'Class' ];
				}
			}
		}
		for ( var a = [ 'pageNodetype', 'pageSelector', 'menuWrapperSelector', 'menuInjectMethod' ], b = 0, l = a.length; b < l; b++ )
		{
			if ( typeof this.conf[ a[ b ] ] != 'undefined' )
			{
				deprecated( 'The configuration option "' + a[ b ] + '"', 'offCanvas.' + a[ b ], '4.3' );
				this.conf.offCanvas = this.conf.offCanvas || {};
				this.conf.offCanvas[ a[ b ] ] = this.conf[ a[ b ] ];
			}
		}

		//	Vendors 4.4
		if ( Hammer.VERSION < 2 )
		{
			deprecated( 'Older version of the Hammer library', 'version 2 or newer', '4.4' );
			return;
		}
	};


	$[ _PLUGIN_ ].prototype.___debug = function()
	{

		//	background color
		if ( this.opts.zposition == 'back' )
		{
			var bg = $('body').css( 'background-color' );
			if ( typeof bg == 'undefined' || bg  == '' || bg == 'transparent' )
			{
				debug( 'Set a background-color for the <BODY />.' );
			}
		}

		//	incompattible with iconbar
		var fxSlide 	= ( this.opts.classes.indexOf( 'mm-slide' ) > -1 ),
			fxZoom		= ( this.opts.classes.indexOf( 'mm-zoom-menu' ) > -1 ),
			iconbar		= ( $[ _PLUGIN_ ].glbl.$page && parseInt( $[ _PLUGIN_ ].glbl.$page.css( 'padding-right' ) ) > 0 ),
			position	= this.opts.offCanvas.position,
			zposition	= this.opts.offCanvas.zposition;
		
		if ( iconbar )
		{
			//	iconbar + effects
			if ( fxSlide || fxZoom )
			{
				debug( 'Don\'t use the "iconbar" extension in combination with the "' + ( fxSlide ? 'mm-slide' : 'mm-zoom-menu' ) + '" effect.' );
			}
			
			//	iconbar + (z)position
			if ( this.opts.offCanvas )
			{
				if ( position != 'left' )
				{
					debug( 'Don\'t use the "iconbar" extension in combination with the "offCanvas.position" option set to "' + position + '".' );
				}
				if ( zposition != 'back' )
				{
					debug( 'Don\'t use the "iconbar" extension in combination with the "offCanvas.zposition" option set to "' + zposition + '".' );
				}
			}
		}
		
		//	effects + (z)position
		if ( fxSlide || fxZoom )
		{
			if ( position == 'top' || position == 'bottom' )
			{
				debug( 'Don\'t use the "' + ( fxSlide ? 'mm-slide' : 'mm-zoom-menu' ) + '" effect in combination with the "offCanvas.position" option set to "' + position + '".' );
			}
			if ( zposition != 'back' )
			{
				debug( 'Don\'t use the "' + ( fxSlide ? 'mm-slide' : 'mm-zoom-menu' ) + '" effect in combination with the "offCanvas.zposition" option set to "' + zposition + '".' );
			}
		}
	};


})( jQuery );