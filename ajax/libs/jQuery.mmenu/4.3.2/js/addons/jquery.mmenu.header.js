/*	
 * jQuery mmenu header addon
 * mmenu.frebsite.nl
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'header';

	var _c, _d, _e, glbl,
		addon_initiated = false;


	$[ _PLUGIN_ ].prototype[ '_addon_' + _ADDON_ ] = function()
	{
		if ( !addon_initiated )
		{
			_initAddon();
		}

		this.opts[ _ADDON_ ] = extendOptions( this.opts[ _ADDON_ ] );
		this.conf[ _ADDON_ ] = extendConfiguration( this.conf[ _ADDON_ ] );

		var that = this,
			opts = this.opts[ _ADDON_ ],
			conf = this.conf[ _ADDON_ ];


		if ( opts.add )
		{
			var content = opts.content
				? opts.content
				:  '<a class="' + _c.prev + '" href="#"></a><span class="' + _c.title + '"></span><a class="' + _c.next + '" href="#"></a>';

			$( '<div class="' + _c.header + '" />' )
				.prependTo( this.$menu )
				.append( content );
		}


		var $header = $('div.' + _c.header, this.$menu);
		if ( $header.length )
		{
			this.$menu.addClass( _c.hasheader );
		}


		if ( opts.update )
		{
			if ( $header.length )
			{
				var $titl = $header.find( '.' + _c.title ),
					$prev = $header.find( '.' + _c.prev ),
					$next = $header.find( '.' + _c.next ),
					_page = false;
				
				if ( glbl.$page )
				{
					_page = '#' + glbl.$page.attr( 'id' );
				}

				$prev
					.add( $next )
					.on( _e.click,
						function( e )
						{
							e.preventDefault();
							e.stopPropagation();
	
							var href = $(this).attr( 'href' );
							if ( href !== '#' )
							{
								if ( _page && href == _page )
								{
									that.$menu.trigger( _e.close );
								}
								else
								{
									$(href, that.$menu).trigger( _e.open );
								}
							}
						}
					);

				$('.' + _c.panel, this.$menu)
					.each(
						function()
						{
							var $t = $(this);

							//	Find title, prev and next
							var titl = $('.' + that.conf.classNames[ _ADDON_ ].panelHeader, $t).text(),
								prev = $('.' + that.conf.classNames[ _ADDON_ ].panelPrev, $t).attr( 'href' ),
								next = $('.' + that.conf.classNames[ _ADDON_ ].panelNext, $t).attr( 'href' );

							if ( !titl )
							{
								titl = $('.' + _c.subclose, $t).text();
							}
							if ( !titl )
							{
								titl = opts.title;
							}
							if ( !prev )
							{
								prev = $('.' + _c.subclose, $t).attr( 'href' );
							}

							//	Update header info
							var updateHeader = function()
							{
								$titl[ titl ? 'show' : 'hide' ]().text( titl );
								$prev[ prev ? 'show' : 'hide' ]().attr( 'href', prev );
								$next[ next ? 'show' : 'hide' ]().attr( 'href', next );
							};

							$t.on( _e.open,
								function( e )
								{
									updateHeader();
								}
							);

							if ( $t.hasClass( _c.current ) )
							{
								updateHeader();
							}
						}
					);
			}
		}
	};


	//	Add to plugin
	$[ _PLUGIN_ ].addons = $[ _PLUGIN_ ].addons || [];
	$[ _PLUGIN_ ].addons.push( _ADDON_ );


	//	Defaults
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {
		add		: false,
		content	: false,
		update	: false,
		title	: 'Menu',
	};
	$[ _PLUGIN_ ].configuration.classNames[ _ADDON_ ] = {
		panelHeader	: 'Header',
		panelNext	: 'Next',
		panelPrev	: 'Prev'
	};


	function extendOptions( o )
	{
		if ( typeof o == 'boolean' )
		{
			o = {
				add		: o,
				update	: o
			};
		}
		if ( typeof o != 'object' )
		{
			o = {};
		}
		o = $.extend( true, {}, $[ _PLUGIN_ ].defaults[ _ADDON_ ], o );

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

		_c.add( 'header hasheader prev next title titletext' );

		glbl = $[ _PLUGIN_ ].glbl;
	}

})( jQuery );