/*	
 * jQuery mmenu header addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'header';


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
			if ( opts.content )
			{
				var content = opts.content;
			}
			else
			{
				var content = '';
				for ( var a = 0, l = opts.add.length; a < l; a++ )
				{
					switch ( opts.add[ a ] )
					{
						case 'prev':
						case 'next':
						case 'close':
							content += '<a class="' + _c[ opts.add[ a ] ] + '" href="#"></a>';
							break;
						
						case 'title':
							content += '<span class="' + _c.title + '"></span>';
							break;
						
						default:
							content += opts.add[ a ];
							break;
					}
				}
			}

			$( '<div class="' + _c.header + '" />' )
				.prependTo( this.$menu )
				.append( content );
		}

		var $header = $('div.' + _c.header, this.$menu);
		if ( $header.length )
		{
			this.$menu.addClass( _c.hasheader );

			//	Auto-update the title, prev- and next button
			if ( opts.update )
			{
				var $titl = $header.find( '.' + _c.title ),
					$prev = $header.find( '.' + _c.prev ),
					$next = $header.find( '.' + _c.next ),
					$clse = $header.find( '.' + _c.close ),
					_page = false;

				if ( glbl.$page )
				{
					_page = '#' + glbl.$page.attr( 'id' );
					$clse.attr( 'href', _page );
				}

				$panels
					.each(
						function()
						{
							var $panl = $(this);

							//	Find title, prev and next
							var $ttl = $panl.find('.' + that.conf.classNames[ _ADDON_ ].panelHeader),
								$prv = $panl.find('.' + that.conf.classNames[ _ADDON_ ].panelPrev),
								$nxt = $panl.find('.' + that.conf.classNames[ _ADDON_ ].panelNext);

							var _ttl = $ttl.html(),
								_prv = $prv.attr( 'href' ),
								_nxt = $nxt.attr( 'href' );
								
							var _prv_txt = $prv.html(),
								_nxt_txt = $nxt.html();

							if ( !_ttl )
							{
								_ttl = $panl.find('.' + _c.subclose).html();
							}
							if ( !_ttl )
							{
								_ttl = opts.title;
							}
							if ( !_prv )
							{
								_prv = $panl.find('.' + _c.subclose).attr( 'href' );
							}

							//	Update header info
							var updateHeader = function()
							{
								$titl[ _ttl ? 'show' : 'hide' ]();
								$titl.html( _ttl );

								$prev[ _prv ? 'attr' : 'removeAttr' ]( 'href', _prv );
								$prev[ _prv || _prv_txt ? 'show' : 'hide' ]();
								$prev.html( _prv_txt );

								$next[ _nxt ? 'attr' : 'removeAttr' ]( 'href', _nxt );
								$next[ _nxt || _nxt_txt ? 'show' : 'hide' ]();
								$next.html( _nxt_txt );
							};

							$panl.on( _e.open, updateHeader );

							if ( $panl.hasClass( _c.current ) )
							{
								updateHeader();
							}
						}
					);
			}

			//	Init other add-ons
			if ( typeof this._init_buttonbars == 'function' )
			{
				this._init_buttonbars( $header );
			}
		}
	};


	//	Add to plugin
	$[ _PLUGIN_ ].addons.push( _ADDON_ );


	//	Defaults
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {
		add		: false,
		content	: false,
		title	: 'Menu',
		update	: false
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
		if ( o.add && !( o.add instanceof Array ) )
		{
			o.add = [ 'prev', 'title', 'next' ];
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

		_c.add( 'header hasheader prev next close title' );

		glbl = $[ _PLUGIN_ ].glbl;
	}

	var _c, _d, _e, glbl,
		addon_initiated = false;

})( jQuery );