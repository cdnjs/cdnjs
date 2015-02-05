/*	
 * jQuery mmenu header addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'header';

	var _c, _d, _e, glbl,
		addon_initiated = false;


	$[ _PLUGIN_ ].prototype[ '_init_' + _ADDON_ ] = function( $panels )
	{
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

		if ( !addon_added && opts.add )
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

			if ( opts.update )
			{
				var $titl = $header.find( '.' + _c.title ),
					$prev = $header.find( '.' + _c.prev ),
					$next = $header.find( '.' + _c.next ),
					_page = false;

				if ( glbl.$page )
				{
					_page = '#' + glbl.$page.attr( 'id' );
				}

				if ( !addon_added )
				{
					$prev
						.add( $next )
						.off( _e.click )
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
				}

				$panels
					.each(
						function()
						{
							var $panl = $(this);

							//	Find title, prev and next
							var $ttl = $('.' + that.conf.classNames[ _ADDON_ ].panelHeader, $panl),
								$prv = $('.' + that.conf.classNames[ _ADDON_ ].panelPrev, $panl),
								$nxt = $('.' + that.conf.classNames[ _ADDON_ ].panelNext, $panl),

								_ttl = $ttl.text(),
								_prv = $prv.attr( 'href' ),
								_nxt = $nxt.attr( 'href' );

							if ( !_ttl )
							{
								_ttl = $('.' + _c.subclose, $panl).text();
							}
							if ( !_ttl )
							{
								_ttl = opts.title;
							}
							if ( !_prv )
							{
								_prv = $('.' + _c.subclose, $panl).attr( 'href' );
							}
							
							var _prv_txt = $prv.text(),
								_nxt_txt = $nxt.text();

							//	Update header info
							var updateHeader = function()
							{
								$titl[ _ttl ? 'show' : 'hide' ]();
								$titl.text( _ttl );

								$prev[ _prv ? 'attr' : 'removeAttr' ]( 'href', _prv );
								$prev[ _prv || _prv_txt ? 'show' : 'hide' ]();
								$prev.text( _prv_txt );

								$next[ _nxt ? 'attr' : 'removeAttr' ]( 'href', _nxt );
								$next[ _nxt || _nxt_txt ? 'show' : 'hide' ]();
								$next.text( _nxt_txt );
							};

							$panl.on( _e.open, updateHeader );

							if ( $panl.hasClass( _c.current ) )
							{
								updateHeader();
							}
						}
					);
			}
		}
	};


	//	Add to plugin
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

		_c.add( 'header hasheader prev next title arrow' );

		glbl = $[ _PLUGIN_ ].glbl;
	}

})( jQuery );