/*	
 * jQuery mmenu offCanvas addon
 * mmenu.frebsite.nl
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'offCanvas';

	var _c, _d, _e, glbl,
		addon_initiated = false;


	$[ _PLUGIN_ ].prototype[ '_addon_' + _ADDON_ ] = function()
	{
		if ( !this.opts[ _ADDON_ ] )
		{
			return this;
		}
		if ( !addon_initiated )
		{
			_initAddon();
		}

		this.opts[ _ADDON_ ] = extendOptions( this.opts[ _ADDON_ ] );
		this.conf[ _ADDON_ ] = extendConfiguration( this.conf[ _ADDON_ ] );
		this.vars.opened = false;

		var opts = this.opts[ _ADDON_ ],
			conf = this.conf[ _ADDON_ ],
			clsn = [ _c.offcanvas ];

		if ( opts.position != 'left' )
		{
			clsn.push( _c.mm( opts.position ) );
		}
		if ( opts.zposition != 'back' )
		{
			clsn.push( _c.mm( opts.zposition ) );
		}

		this.$menu
			.addClass( clsn.join( ' ' ) )
			.parent()
			.removeClass( _c.wrapper );

		this[ _ADDON_ + '_initPage' ]( glbl.$page );
		this[ _ADDON_ + '_initBlocker' ]();
		this[ _ADDON_ + '_initOpenClose' ]();
		this[ _ADDON_ + '_bindCustomEvents' ]();

		this.$menu[ conf.menuInjectMethod + 'To' ]( conf.menuWrapperSelector );
	};


	//	Add to plugin
	$[ _PLUGIN_ ].addons = $[ _PLUGIN_ ].addons || [];
	$[ _PLUGIN_ ].addons.push( _ADDON_ );


	//	Default options and configuration
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {
		position		: 'left',
		zposition		: 'back',
		modal			: false,
		moveBackground	: true
	};
	$[ _PLUGIN_ ].configuration[ _ADDON_ ] = {
		pageNodetype		: 'div',
		pageSelector		: null,
		menuWrapperSelector	: 'body',
		menuInjectMethod	: 'prepend'
	};


	//	Methods
	$[ _PLUGIN_ ].prototype.open = function()
	{
		if ( this.vars.opened )
		{
			return false;
		}

		var that = this;

		this._openSetup();

		//	Without the timeout, the animation won't work because the element had display: none;
		setTimeout(
			function()
			{
				that._openFinish();
			}, 25
		);

		return 'open';
	};

	$[ _PLUGIN_ ].prototype._openSetup = function()
	{
		//	Close others
		glbl.$allMenus.not( this.$menu ).trigger( _e.close );

		//	Store style and position
		glbl.$page.data( _d.style, glbl.$page.attr( 'style' ) || '' );

		//	Trigger window-resize to measure height
		glbl.$wndw.trigger( _e.resize, [ true ] );

		var clsn = [ _c.opened ];

		//	Add options
		if ( this.opts[ _ADDON_ ].modal )
		{
			clsn.push( _c.modal );
		}
		if ( this.opts[ _ADDON_ ].moveBackground )
		{
			clsn.push( _c.background );
		}
		if ( this.opts[ _ADDON_ ].position != 'left' )
		{
			clsn.push( _c.mm( this.opts[ _ADDON_ ].position ) );
		}
		if ( this.opts[ _ADDON_ ].zposition != 'back' )
		{
			clsn.push( _c.mm( this.opts[ _ADDON_ ].zposition ) );
		}
		if ( this.opts.classes )
		{
			clsn.push( this.opts.classes );
		}
		glbl.$html.addClass( clsn.join( ' ' ) );

		//	Open
		this.$menu.addClass( _c.current + ' ' + _c.opened );
	};

	$[ _PLUGIN_ ].prototype._openFinish = function()
	{
		var that = this;

		//	Callback
		this.__transitionend( glbl.$page,
			function()
			{
				that.$menu.trigger( _e.opened );
			}, this.conf.transitionDuration
		);

		//	Opening
		this.vars.opened = true;
		glbl.$html.addClass( _c.opening );
		this.$menu.trigger( _e.opening );
	};

	$[ _PLUGIN_ ].prototype.close = function()
	{
		if ( !this.vars.opened )
		{
			return false;
		}

		var that = this;

		//	Callback
		this.__transitionend( glbl.$page,
			function()
			{
				that.$menu
					.removeClass( _c.current )
					.removeClass( _c.opened );

				glbl.$html
					.removeClass( _c.opened )
					.removeClass( _c.modal )
					.removeClass( _c.background )
					.removeClass( _c.mm( that.opts[ _ADDON_ ].position ) )
					.removeClass( _c.mm( that.opts[ _ADDON_ ].zposition ) );

				if ( that.opts.classes )
				{
					glbl.$html.removeClass( that.opts.classes );
				}

				//	Restore style and position
				glbl.$page.attr( 'style', glbl.$page.data( _d.style ) );

				that.vars.opened = false;
				that.$menu.trigger( _e.closed );

			}, this.conf.transitionDuration
		);

		//	Closing
		glbl.$html.removeClass( _c.opening );
		this.$menu.trigger( _e.closing );

		return 'close';
	};

	$[ _PLUGIN_ ].prototype[ _ADDON_ + '_initBlocker' ] = function()
	{
		var that = this;

		if ( !glbl.$blck )
		{
			glbl.$blck = $( '<div id="' + _c.blocker + '" />' )
				.appendTo( glbl.$body );
		}

		glbl.$blck
			.off( _e.touchstart )
			.on( _e.touchstart,
				function( e )
				{
					e.preventDefault();
					e.stopPropagation();
					glbl.$blck.trigger( _e.mousedown );
				}
			)
			.on( _e.mousedown,
				function( e )
				{
					e.preventDefault();
					if ( !glbl.$html.hasClass( _c.modal ) )
					{
						that.close();
					}
				}
			);
	};
	
	$[ _PLUGIN_ ].prototype[ _ADDON_ + '_initPage' ] = function( $p )
	{
		if ( !$p )
		{
			$p = $(this.conf[ _ADDON_ ].pageSelector, glbl.$body);
			if ( $p.length > 1 )
			{
				$[ _PLUGIN_ ].debug( 'Multiple nodes found for the page-node, all nodes are wrapped in one <' + this.conf[ _ADDON_ ].pageNodetype + '>.' );
				$p = $p.wrapAll( '<' + this.conf[ _ADDON_ ].pageNodetype + ' />' ).parent();
			}
		}

		$p.addClass( _c.page );
		glbl.$page = $p;			
	};

	$[ _PLUGIN_ ].prototype[ _ADDON_ + '_initOpenClose' ] = function()
	{
		var that = this;

		//	Open menu
		var id = this.$menu.attr( 'id' );
		if ( id && id.length )
		{
			if ( this.conf.clone )
			{
				id = _c.umm( id );
			}

			$('a[href="#' + id + '"]')
				.off( _e.click )
				.on( _e.click,
					function( e )
					{
						e.preventDefault();
						that.open();
					}
				);
		}

		//	Close menu
		var id = glbl.$page.attr( 'id' );
		if ( id && id.length )
		{
			$('a[href="#' + id + '"]')
				.on( _e.click,
					function( e )
					{
						e.preventDefault();
						that.close();
					}
				);
		}
	};

	$[ _PLUGIN_ ].prototype[ _ADDON_ + '_bindCustomEvents' ] = function()
	{
		var that = this,
			evnt = _e.open + ' ' + _e.opening + ' ' + _e.opened + ' ' + _e.close + ' ' + _e.closing + ' ' + _e.closed + ' ' + _e.setPage;

		this.$menu
			.off( evnt )
			.on( evnt,
				function( e )
				{
					e.stopPropagation();
				}
			);

		//	Menu-events
		this.$menu
			.on( _e.open,
				function( e )
				{
					that.open();
				}
			)
			.on( _e.close,
				function( e )
				{
					that.close();
				}
			)
			.on( _e.setPage,
				function( e, $p )
				{
					that[ _ADDON_ + '_initPage' ]( $p );
					that[ _ADDON_ + '_initOpenClose' ]();
				}
			);
	};


	function extendOptions( o )
	{
		return o;
	}

	function extendConfiguration( c )
	{
		if ( typeof c.pageSelector != 'string' )
		{
			c.pageSelector = '> ' + c.pageNodetype;
		}
		
		return c;
	}

	function _initAddon()
	{
		addon_initiated = true;

		_c = $[ _PLUGIN_ ]._c;
		_d = $[ _PLUGIN_ ]._d;
		_e = $[ _PLUGIN_ ]._e;

		_c.add( 'offcanvas modal background opening blocker page' );
		_d.add( 'style' );
		_e.add( 'opening opened closing closed setPage' );

		glbl = $[ _PLUGIN_ ].glbl;
		glbl.$allMenus = ( glbl.$allMenus || $() ).add( this.$menu );

		//	Prevent tabbing
		glbl.$wndw
			.on( _e.keydown,
				function( e )
				{
					if ( glbl.$html.hasClass( _c.opened ) )
					{
						if ( e.keyCode == 9 )
						{
							e.preventDefault();
							return false;
						}
					}
				}
			);

		//	Set page min-height to window height
		var _h = 0;
		glbl.$wndw
			.on( _e.resize,
				function( e, force )
				{
					if ( force || glbl.$html.hasClass( _c.opened ) )
					{
						var nh = glbl.$wndw.height();
						if ( force || nh != _h )
						{
							_h = nh;
							glbl.$page.css( 'minHeight', nh );
						}
					}
				}
			);
	}

})( jQuery );