/*	
 * jQuery mmenu footer addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'footer';


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
				: opts.title;

			$( '<div class="' + _c.footer + '" />' )
				.appendTo( this.$menu )
				.append( content );
		}

		var $footer = $('div.' + _c.footer, this.$menu);
		if ( $footer.length )
		{
			this.$menu.addClass( _c.hasfooter );

			//	Auto-update the footer content
			if ( opts.update )
			{
				$panels
					.each(
						function()
						{
							var $panl = $(this);

							//	Find content
							var $cnt = $('.' + that.conf.classNames[ _ADDON_ ].panelFooter, $panl),
								_cnt = $cnt.html();

							if ( !_cnt )
							{
								_cnt = opts.title;
							}

							//	Update footer info
							var updateFooter = function()
							{
								$footer[ _cnt ? 'show' : 'hide' ]();
								$footer.html( _cnt );
							};

							$panl.on( _e.open, updateFooter );

							if ( $panl.hasClass( _c.current ) )
							{
								updateFooter();
							}
						}
					);
			}

			//	Init other add-ons
			if ( typeof this._init_buttonbars == 'function' )
			{
				this._init_buttonbars( $footer );
			}
		}
	};


	//	Add to plugin
	$[ _PLUGIN_ ].addons.push( _ADDON_ );


	//	Defaults
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {
		add		: false,
		content	: false,
		title	: '',
		update	: false
	};
	$[ _PLUGIN_ ].configuration.classNames[ _ADDON_ ] = {
		panelFooter: 'Footer'
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

		_c.add( 'footer hasfooter' );

		glbl = $[ _PLUGIN_ ].glbl;
	}

	var _c, _d, _e, glbl,
		addon_initiated = false;

})( jQuery );