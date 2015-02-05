/*	
 * jQuery mmenu fixedElements addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'fixedElements';


	$[ _PLUGIN_ ].prototype[ '_init_' + _ADDON_ ] = function( $panels )
	{
		if ( !this.opts.offCanvas )
		{
			return;
		}

		if ( !addon_initiated )
		{
			_initAddon();
		}

		var addon_added = this.vars[ _ADDON_ + '_added' ];
		this.vars[ _ADDON_ + '_added' ] = true;

		if ( !addon_added )
		{
			this.opts[ _ADDON_ ] = extendOptions( this.opts[ _ADDON_ ] );
			this.conf[ _ADDON_ ] = extendConfiguration( this.conf[ _ADDON_ ] );
		}

		var that = this,
			opts = this.opts[ _ADDON_ ],
			conf = this.conf[ _ADDON_ ];


		//	Refactor fixed classes
		this.__refactorClass( $('div, span, a', glbl.$page), this.conf.classNames[ _ADDON_ ].fixedTop, 'fixed-top' );
		this.__refactorClass( $('div, span, a', glbl.$page), this.conf.classNames[ _ADDON_ ].fixedBottom, 'fixed-bottom' );


		if ( addon_added )
		{
			return;
		}


		//	Position the elements
		var $tops, $bots;
		this.$menu
			.on( _e.opening, 
				function( e )
				{
					var _top = $(window).scrollTop(),
						_bot = glbl.$page.height() - _top - glbl.$wndw.height();

					$tops = $('.' + _c[ 'fixed-top' ]);
					$bots = $('.' + _c[ 'fixed-bottom' ]);

					$tops.css({
						'-webkit-transform': 'translateY( ' + _top + 'px )',
						'transform': 'translateY( ' + _top + 'px )'
					});
					$bots.css({
						'-webkit-transform': 'translateY( -' + _bot + 'px )',
						'transform': 'translateY( -' + _bot + 'px )'
					});
				}
			)
			.on( _e.closed,
				function( e )
				{
					$tops.add( $bots ).css({
						'-webkit-transform': 'none',
						'transform': 'none'
					});
				}
			);
	};


	//	Add to plugin
	$[ _PLUGIN_ ].addons.push( _ADDON_ );


	//	Defaults
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {};
	$[ _PLUGIN_ ].configuration.classNames[ _ADDON_ ] = {
		fixedTop 	: 'FixedTop',
		fixedBottom	: 'FixedBottom'
	};


	function extendOptions( o )
	{
		return o;
	}

	function extendConfiguration( c )
	{
		return c;
	}
	
	function _initAddon()
	{
		addon_initiated = true;

		_c = $[ _PLUGIN_ ]._c;
		_d = $[ _PLUGIN_ ]._d;
		_e = $[ _PLUGIN_ ]._e;

		_c.add( 'fixed-top fixed-bottom' );

		glbl = $[ _PLUGIN_ ].glbl;
	}

	var _c, _d, _e, glbl,
		addon_initiated = false;

})( jQuery );