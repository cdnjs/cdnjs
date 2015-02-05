/*	
 * jQuery mmenu offCanvas addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'offCanvas';


	$[ _PLUGIN_ ].addons[ _ADDON_ ] = {

		//	_init: fired when (re)initiating the plugin
		_init: function( $panels ) {},

		//	_setup: fired once per menu
		_setup: function()
		{
			if ( !this.opts[ _ADDON_ ] )
			{
				return;
			}

			var that = this,
				opts = this.opts[ _ADDON_ ],
				conf = this.conf[ _ADDON_ ];


			//	Extend shortcut configuration
			if ( typeof conf.pageSelector != 'string' )
			{
				conf.pageSelector = '> ' + conf.pageNodetype;
			}


			glbl.$allMenus = ( glbl.$allMenus || $() ).add( this.$menu );


			//	Setup the menu
			this.vars.opened = false;
			
			var clsn = [ _c.offcanvas ];
	
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

			
			//	Setup the page
			this.setPage( glbl.$page );


			//	Setup the UI blocker and the window
			this[ _ADDON_ + '_initBlocker' ]();
			this[ _ADDON_ + '_initWindow' ]();


			//	Add events
			this.$menu
				.on( _e.open + ' ' + _e.opening + ' ' + _e.opened + ' ' + 
					_e.close + ' ' + _e.closing + ' ' + _e.closed + ' ' + _e.setPage,
					function( e )
					{
						e.stopPropagation();
					}
				)
				.on( _e.open + ' ' + _e.close + ' ' + _e.setPage,
					function( e )
					{
						that[ e.type ]();
					}
				);


			//	Append to the body
			this.$menu[ conf.menuInjectMethod + 'To' ]( conf.menuWrapperSelector );
		},

		//	_add: fired once per page load
		_add: function()
		{
			_c = $[ _PLUGIN_ ]._c;
			_d = $[ _PLUGIN_ ]._d;
			_e = $[ _PLUGIN_ ]._e;

			_c.add( 'offcanvas slideout modal background opening blocker page' );
			_d.add( 'style' );
			_e.add( 'opening opened closing closed setPage' );
	
			glbl = $[ _PLUGIN_ ].glbl;
		},

		//	_clickAnchor: prevents default behavior when clicking an anchor
		_clickAnchor: function( $a, inMenu )
		{
			if ( !this.opts[ _ADDON_ ] )
			{
				return false;
			}

			//	Open menu
			var id = this.$menu.attr( 'id' );
			if ( id && id.length )
			{
				if ( this.conf.clone )
				{
					id = _c.umm( id );
				}
				if ( $a.is( '[href="#' + id + '"]' ) )
				{
					this.open();
					return true;
				}
			}
			
			//	Close menu
			if ( !glbl.$page )
			{
				return;
			}
			var id = glbl.$page.attr( 'id' );
			if ( id && id.length )
			{
				if ( $a.is( '[href="#' + id + '"]' ) )
				{
					this.close();
					return true;
				}
			}

			return false;
		}
	};


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
			}, this.conf.openingInterval
		);

		return 'open';
	};

	$[ _PLUGIN_ ].prototype._openSetup = function()
	{
		var that = this;

		//	Close other menus
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
		setTimeout(function(){
            that.vars.opened = true;
        },this.conf.openingInterval);

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
	
	$[ _PLUGIN_ ].prototype.setPage = function( $page )
	{
		if ( !$page )
		{
			$page = $(this.conf[ _ADDON_ ].pageSelector, glbl.$body);
			if ( $page.length > 1 )
			{
				$page = $page.wrapAll( '<' + this.conf[ _ADDON_ ].pageNodetype + ' />' ).parent();
			}
		}

		$page.addClass( _c.page + ' ' + _c.slideout );
		glbl.$page = $page;			
	};

	$[ _PLUGIN_ ].prototype[ _ADDON_ + '_initWindow' ] = function()
	{
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


		//	Once fired, it can be removed
		$[ _PLUGIN_ ].prototype[ _ADDON_ + '_initWindow' ] = function() {};
	};

	$[ _PLUGIN_ ].prototype[ _ADDON_ + '_initBlocker' ] = function()
	{
		var that = this;
		var $blck = $( '<div id="' + _c.blocker + '" class="' + _c.slideout + '" />' )
			.appendTo( glbl.$body );
			
		$blck
			.on( _e.touchstart,
				function( e )
				{
					e.preventDefault();
					e.stopPropagation();
					$blck.trigger( _e.mousedown );
				}
			)
			.on( _e.mousedown,
				function( e )
				{
					e.preventDefault();
					if ( !glbl.$html.hasClass( _c.modal ) )
					{
						glbl.$allMenus.trigger( _e.close );
					}
				}
			);


		//	Once fired, it can be removed
		$[ _PLUGIN_ ].prototype[ _ADDON_ + '_initBlocker' ] = function() {};
	};


	var _c, _d, _e, glbl;

})( jQuery );