/*	
 * jQuery mmenu v4.3.6
 * @requires jQuery 1.7.0 or later
 *
 * mmenu.frebsite.nl
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * Dual licensed under the MIT license:
 * http://en.wikipedia.org/wiki/MIT_License
 */


(function( $ ) {

	var _PLUGIN_	= 'mmenu',
		_VERSION_	= '4.3.6';


	//	Plugin already excists
	if ( $[ _PLUGIN_ ] )
	{
		return;
	}


	//	Global variables
	var _c = {}, _d = {}, _e = {},
		plugin_initiated = false;

	var glbl = {
		$wndw: null,
		$html: null,
		$body: null
	};


	$[ _PLUGIN_ ] = function( $menu, opts, conf )
	{
		this.$menu	= $menu;
		this.opts	= opts
		this.conf	= conf;
		this.vars	= {};

		this._init();

		return this;
	};

	$[ _PLUGIN_ ].uniqueId = 0;

	$[ _PLUGIN_ ].prototype = {

		_init: function()
		{
			this.opts = extendOptions( this.opts, this.conf, this.$menu );
	
			this._initMenu();
			this._initPanels();
			this._initLinks();
			this._bindCustomEvents();

			if ( $[ _PLUGIN_ ].addons )
			{
				for ( var a = 0; a < $[ _PLUGIN_ ].addons.length; a++ )
				{
					if ( typeof this[ '_addon_' + $[ _PLUGIN_ ].addons[ a ] ] == 'function' )
					{
						this[ '_addon_' + $[ _PLUGIN_ ].addons[ a ] ]();
					}
				}
			}
		},

		_bindCustomEvents: function()
		{
			var that = this;

			//	Panel-events
			var $panels = this.$menu.find( this.opts.isMenu && !this.opts.slidingSubmenus ? 'ul, ol' : '.' + _c.panel );
			$panels
				.off( _e.toggle + ' ' + _e.open + ' ' + _e.close )
				.on( _e.toggle + ' ' + _e.open + ' ' + _e.close,
					function( e )
					{
						e.stopPropagation();
					}
				);

			if ( this.opts.slidingSubmenus )
			{
				$panels
					.on( _e.open,
						function( e )
						{
							return that._openSubmenuHorizontal( $(this) );
						}
					);
			}
			else
			{
				$panels
					.on( _e.toggle,
						function( e )
						{
							var $t = $(this);
							return $t.triggerHandler( $t.parent().hasClass( _c.opened ) ? _e.close : _e.open );
						}
					)
					.on( _e.open,
						function( e )
						{
							$(this).parent().addClass( _c.opened );
							return 'open';
						}
					)
					.on( _e.close,
						function( e )
						{
							$(this).parent().removeClass( _c.opened );
							return 'close';
						}
					);
			}
		},

		_initMenu: function()
		{
			var that = this;

			//	Clone if needed
			if ( this.opts.offCanvas && this.conf.clone )
			{
				this.$menu = this.$menu.clone( true );
				this.$menu.add( this.$menu.find( '*' ) ).filter( '[id]' ).each(
					function()
					{
						$(this).attr( 'id', _c.mm( $(this).attr( 'id' ) ) );
					}
				);
			}

			//	Strip whitespace
			this.$menu.contents().each(
				function()
				{
					if ( $(this)[ 0 ].nodeType == 3 )
					{
						$(this).remove();
					}
				}
			);

			this.$menu
				.parent()
				.addClass( _c.wrapper );

			var clsn = [ _c.menu ];

			//	Add direction class
			clsn.push( _c.mm( this.opts.slidingSubmenus ? 'horizontal' : 'vertical' ) );

			//	Add options classes
			if ( this.opts.classes )
			{
				clsn.push( this.opts.classes );
			}
			if ( this.opts.isMenu )
			{
				clsn.push( _c.ismenu );
			}

			this.$menu.addClass( clsn.join( ' ' ) );
		},
		_initPanels: function()
		{
			var that = this;


			//	Refactor List class
			this.__refactorClass( $('.' + this.conf.classNames.list, this.$menu), this.conf.classNames.list, 'list' );

			//	Add List class
			if ( this.opts.isMenu )
			{
				$('ul, ol', this.$menu)
					.not( '.mm-nolist' )
					.addClass( _c.list );
			}

			var $lis = $('.' + _c.list + ' > li', this.$menu);

			//	Refactor Selected class
			this.__refactorClass( $lis, this.conf.classNames.selected, 'selected' );

			//	Refactor Label class
			this.__refactorClass( $lis, this.conf.classNames.label, 'label' );

			//	Refactor Spacer class
			this.__refactorClass( $lis, this.conf.classNames.spacer, 'spacer' );

			//	setSelected-event
			$lis
				.off( _e.setSelected )
				.on( _e.setSelected,
					function( e, selected )
					{
						e.stopPropagation();
	
						$lis.removeClass( _c.selected );
						if ( typeof selected != 'boolean' )
						{
							selected = true;
						}
						if ( selected )
						{
							$(this).addClass( _c.selected );
						}
					}
				);

			//	Refactor Panel class
			this.__refactorClass( $('.' + this.conf.classNames.panel, this.$menu), this.conf.classNames.panel, 'panel' );

			//	Add Panel class
			this.$menu
				.children()
				.filter( this.conf.panelNodetype )
				.add( this.$menu.find( '.' + _c.list ).children().children().filter( this.conf.panelNodetype ) )
				.addClass( _c.panel );

			var $panels = $('.' + _c.panel, this.$menu);

			//	Add an ID to all panels
			$panels
				.each(
					function( i )
					{
						var $t = $(this),
							id = $t.attr( 'id' ) || that.__getUniqueId();

						$t.attr( 'id', id );
					}
			);

			//	Add open and close links to menu items
			$panels
				.find( '.' + _c.panel )
				.each(
					function( i )
					{
						var $t = $(this),
							$u = $t.is( 'ul, ol' ) ? $t : $t.find( 'ul ,ol' ).first(),
							$l = $t.parent(),
							$a = $l.find( '> a, > span' ),
							$p = $l.closest( '.' + _c.panel );

						$t.data( _d.parent, $l );

						if ( $l.parent().is( '.' + _c.list ) )
						{
							var $btn = $( '<a class="' + _c.subopen + '" href="#' + $t.attr( 'id' ) + '" />' ).insertBefore( $a );
							if ( !$a.is( 'a' ) )
							{
								$btn.addClass( _c.fullsubopen );
							}
							if ( that.opts.slidingSubmenus )
							{
								$u.prepend( '<li class="' + _c.subtitle + '"><a class="' + _c.subclose + '" href="#' + $p.attr( 'id' ) + '">' + $a.text() + '</a></li>' );
							}
						}
					}
				);

			//	Link anchors to panels
			var evt = this.opts.slidingSubmenus ? _e.open : _e.toggle;
			$panels
				.each(
					function( i )
					{
						var $opening = $(this),
							id = $opening.attr( 'id' );

						$('a[href="#' + id + '"]', that.$menu)
							.off( _e.click )
							.on( _e.click,
								function( e )
								{
									e.preventDefault();
									$opening.trigger( evt );
								}
							);
					}
			);

			if ( this.opts.slidingSubmenus )
			{
				//	Add opened-classes
				var $selected = $('.' + _c.list + ' > li.' + _c.selected, this.$menu);
				$selected
					.parents( 'li' )
					.removeClass( _c.selected )
					.end()
					.add( $selected.parents( 'li' ) )
					.each(
						function()
						{
							var $t = $(this),
								$u = $t.find( '> .' + _c.panel );

							if ( $u.length )
							{
								$t.parents( '.' + _c.panel ).addClass( _c.subopened );
								$u.addClass( _c.opened );
							}
						}
					)
					.closest( '.' + _c.panel )
					.addClass( _c.opened )
					.parents( '.' + _c.panel )
					.addClass( _c.subopened );
			}
			else
			{
				//	Replace Selected-class with opened-class in parents from .Selected
				var $selected = $('li.' + _c.selected, this.$menu);
				$selected
					.parents( 'li' )
					.removeClass( _c.selected )
					.end()
					.add( $selected.parents( 'li' ) )
					.addClass( _c.opened );
			}

			//	Set current opened
			var $current = $panels.filter( '.' + _c.opened );
			if ( !$current.length )
			{
				$current = $panels.first();
			}
			$current
				.addClass( _c.opened )
				.last()
				.addClass( _c.current );

			//	Rearrange markup
			if ( this.opts.slidingSubmenus )
			{
				$panels
					.not( $current.last() )
					.addClass( _c.hidden )
					.end()
					.find( '.' + _c.panel )
					.appendTo( this.$menu );
			}
		},
		_initLinks: function()
		{
			var that = this;
	
			$('.' + _c.list + ' > li > a', this.$menu)
				.not( '.' + _c.subopen )
				.not( '.' + _c.subclose )
				.not( '[rel="external"]' )
				.not( '[target="_blank"]' )
				.off( _e.click )
				.on( _e.click,
					function( e )
					{
						var $t = $(this),
							href = $t.attr( 'href' ) || '';

						//	Set selected item
						if ( that.__valueOrFn( that.opts.onClick.setSelected, $t ) )
						{
							$t.parent().trigger( _e.setSelected );
						}

						//	Prevent default / don't follow link. Default: false
						var preventDefault = that.__valueOrFn( that.opts.onClick.preventDefault, $t, href.slice( 0, 1 ) == '#' );
						if ( preventDefault )
						{
							e.preventDefault();
						}

						//	Block UI. Default: false if preventDefault, true otherwise
						if ( that.__valueOrFn( that.opts.onClick.blockUI, $t, !preventDefault ) )
						{
							glbl.$html.addClass( _c.blocking );
						}

						//	Close menu. Default: true if preventDefault, false otherwise
						if ( that.__valueOrFn( that.opts.onClick.close, $t, preventDefault ) )
						{
							that.$menu.triggerHandler( _e.close );
						}
					}
				);
		},

		_openSubmenuHorizontal: function( $opening )
		{
			if ( $opening.hasClass( _c.current ) )
			{
				return false;
			}

			var $panels = $('.' + _c.panel, this.$menu),
				$current = $panels.filter( '.' + _c.current );
	
			$panels
				.removeClass( _c.highest )
				.removeClass( _c.current )
				.not( $opening )
				.not( $current )
				.addClass( _c.hidden );
	
			if ( $opening.hasClass( _c.opened ) )
			{
				$current
					.addClass( _c.highest )
					.removeClass( _c.opened )
					.removeClass( _c.subopened );
			}
			else
			{
				$opening
					.addClass( _c.highest );

				$current
					.addClass( _c.subopened );
			}
	
			$opening
				.removeClass( _c.hidden )
				.addClass( _c.current );
	
			//	Without the timeout, the animation won't work because the element had display: none;
			setTimeout(
				function()
				{
					$opening
						.removeClass( _c.subopened )
						.addClass( _c.opened );
				}, this.conf.openingInterval
			);

			return 'open';
		},

		_update: function( fn )
		{
			if ( !this.updates )
			{
				this.updates = [];
			}
			if ( typeof fn == 'function' )
			{
				this.updates.push( fn );
			}
			else
			{
				for ( var u = 0, l = this.updates.length; u < l; u++ )
				{
					this.updates[ u ].call( this, fn );
				}
			}
		},

		__valueOrFn: function( o, $e, d )
		{
			if ( typeof o == 'function' )
			{
				return o.call( $e[ 0 ] );
			}
			if ( typeof o == 'undefined' && typeof d != 'undefined' )
			{
				return d;
			}
			return o;
		},
		
		__refactorClass: function( $e, o, c )
		{
			$e.filter( '.' + o )
				.removeClass( o )
				.addClass( _c[ c ] );
		},
		
		__transitionend: function( $e, fn, duration )
		{
			var _ended = false,
				_fn = function()
				{
					if ( !_ended )
					{
						fn.call( $e[ 0 ] );
					}
					_ended = true;
				};
	
			$e.one( _e.transitionend, _fn );
			$e.one( _e.webkitTransitionEnd, _fn );
			setTimeout( _fn, duration * 1.1 );
		},
		
		__getUniqueId: function()
		{
			return _c.mm( $[ _PLUGIN_ ].uniqueId++ );
		}
	};


	$.fn[ _PLUGIN_ ] = function( opts, conf )
	{
		//	First time plugin is fired
		if ( !plugin_initiated )
		{
			_initPlugin();
		}

		//	Extend options
		opts = extendOptions( opts, conf );
		conf = extendConfiguration( conf );

		return this.each(
			function()
			{
				var $menu = $(this);
				if ( $menu.data( _PLUGIN_ ) )
				{
					return;
				}
				$menu.data( _PLUGIN_, new $[ _PLUGIN_ ]( $menu, opts, conf ) );
			}
		);
	};

	$[ _PLUGIN_ ].version = _VERSION_;
	
	$[ _PLUGIN_ ].defaults = {
		classes			: '',
		slidingSubmenus	: true,
		onClick			: {
//			close				: true,
//			blockUI				: null,
//			preventDefault		: null,
			setSelected			: true
		}
	};
	$[ _PLUGIN_ ].configuration = {
		panelNodetype		: 'ul, ol, div',
		transitionDuration	: 400,
		openingInterval		: 25,
		classNames	: {
			panel		: 'Panle',
			list		: 'List',
			selected	: 'Selected',
			label		: 'Label',
			spacer		: 'Spacer'
		}
	};



	/*
		SUPPORT
	*/
	(function() {

		var wd = window.document,
			ua = window.navigator.userAgent;

		var _touch 				= 'ontouchstart' in wd,
			_overflowscrolling	= 'WebkitOverflowScrolling' in wd.documentElement.style,
			_oldAndroidBrowser	= (function() {
				if ( ua.indexOf( 'Android' ) >= 0 )
				{
					return 2.4 > parseFloat( ua.slice( ua.indexOf( 'Android' ) +8 ) );
				}
				return false;
			})();

		$[ _PLUGIN_ ].support = {

			touch: _touch,
			oldAndroidBrowser: _oldAndroidBrowser,
			overflowscrolling: (function() {
				if ( !_touch )
				{
					return true;
				}
				if ( _overflowscrolling )
				{
					return true;
				}
				if ( _oldAndroidBrowser )
				{
					return false;
				}
				return true;
			})()
		};
	})();


	/*
		DEBUG
	*/
	$[ _PLUGIN_ ].debug = function( msg ) {};
	$[ _PLUGIN_ ].deprecated = function( depr, repl )
	{
		if ( typeof console != 'undefined' && typeof console.warn != 'undefined' )
		{
			console.warn( 'MMENU: ' + depr + ' is deprecated, use ' + repl + ' instead.' );
		}
	};


	function extendOptions( o, c, $m )
	{

		if ( $m )
		{
			if ( typeof o != 'object' )
			{
				o = {};
			}
			if ( typeof o.isMenu != 'boolean' )
			{
				var $c = $m.children();
				o.isMenu = ( $c.length == 1 && $c.is( c.panelNodetype ) );
			}
			return o;
		}
		
		//	Extend from defaults
		o = $.extend( true, {}, $[ _PLUGIN_ ].defaults, o );


		//	DEPRECATED
		if ( o.position == 'top' || o.position == 'bottom' )
		{
			if ( o.zposition == 'back' || o.zposition == 'next' )
			{
				$[ _PLUGIN_ ].deprecated( 'Using position "' + o.position + '" in combination with zposition "' + o.zposition + '"', 'zposition "front"' );
				o.zposition = 'front';
			}
		}
		for ( var a = [ 'position', 'zposition', 'modal', 'moveBackground' ], b = 0, l = a.length; b < l; b++ )
		{
			if ( typeof o[ a[ b ] ] != 'undefined' )
			{
				$[ _PLUGIN_ ].deprecated( 'The option "' + a[ b ] + '"', 'offCanvas.' + a[ b ] );
				o.offCanvas = o.offCanvas || {};
				o.offCanvas[ a[ b ] ] = o[ a[ b ] ];
			}
		}
		//	/DEPRECATED


		return o;
	}
	function extendConfiguration( c )
	{
		c = $.extend( true, {}, $[ _PLUGIN_ ].configuration, c )


		//	DEPRECATED
		for ( var a = [ 'panel', 'list', 'selected', 'label', 'spacer' ], b = 0, l = a.length; b < l; b++ )
		{
			if ( typeof c[ a[ b ] + 'Class' ] != 'undefined' )
			{
				$[ _PLUGIN_ ].deprecated( 'The configuration option "' + a[ b ] + 'Class"', 'classNames.' + a[ b ] );
				c.classNames[ a[ b ] ] = c[ a[ b ] + 'Class' ];
			}
		}
		if ( typeof c.counterClass != 'undefined' )
		{
			$[ _PLUGIN_ ].deprecated( 'The configuration option "counterClass"', 'classNames.counters.counter' );
			c.classNames.counters = c.classNames.counters || {};
			c.classNames.counters.counter = c.counterClass;
		}
		if ( typeof c.collapsedClass != 'undefined' )
		{
			$[ _PLUGIN_ ].deprecated( 'The configuration option "collapsedClass"', 'classNames.labels.collapsed' );
			c.classNames.labels = c.classNames.labels || {};
			c.classNames.labels.collapsed = c.collapsedClass;
		}
		if ( typeof c.header != 'undefined' )
		{
			for ( var a = [ 'panelHeader', 'panelNext', 'panelPrev' ], b = 0, l = a.length; b < l; b++ )
			{
				if ( typeof c.header[ a[ b ] + 'Class' ] != 'undefined' )
				{
					$[ _PLUGIN_ ].deprecated( 'The configuration option "header.' + a[ b ] + 'Class"', 'classNames.header.' + a[ b ] );
					c.classNames.header = c.classNames.header || {};
					c.classNames.header[ a[ b ] ] = c.header[ a[ b ] + 'Class' ];
				}
			}
		}
		for ( var a = [ 'pageNodetype', 'pageSelector', 'menuWrapperSelector', 'menuInjectMethod' ], b = 0, l = a.length; b < l; b++ )
		{
			if ( typeof c[ a[ b ] ] != 'undefined' )
			{
				$[ _PLUGIN_ ].deprecated( 'The configuration option "' + a[ b ] + '"', 'offCanvas.' + a[ b ] );
				c.offCanvas = c.offCanvas || {};
				c.offCanvas[ a[ b ] ] = c[ a[ b ] ];
			}
		}
		//	/DEPRECATED


		return c;
	}

	function _initPlugin()
	{
		plugin_initiated = true;
	
		glbl.$wndw = $(window);
		glbl.$html = $('html');
		glbl.$body = $('body');

		//	Classnames, Datanames, Eventnames
		$.each( [ _c, _d, _e ],
			function( i, o )
			{
				o.add = function( c )
				{
					c = c.split( ' ' );
					for ( var d in c )
					{
						o[ c[ d ] ] = o.mm( c[ d ] );
					}
				};
			}
		);

		//	Classnames
		_c.mm = function( c ) { return 'mm-' + c; };
		_c.add( 'wrapper menu ismenu inline panel list subtitle selected label spacer current highest hidden opened subopened subopen fullsubopen subclose' );
		_c.umm = function( c )
		{
			if ( c.slice( 0, 3 ) == 'mm-' )
			{
				c = c.slice( 3 );
			}
			return c;
		};

		//	Datanames
		_d.mm = function( d ) { return 'mm-' + d; };
		_d.add( 'parent' );

		//	Eventnames
		_e.mm = function( e ) { return e + '.mm'; };
		_e.add( 'toggle open close setSelected transitionend webkitTransitionEnd mousedown mouseup touchstart touchmove touchend scroll resize click keydown keyup' );

		$[ _PLUGIN_ ]._c = _c;
		$[ _PLUGIN_ ]._d = _d;
		$[ _PLUGIN_ ]._e = _e;

		$[ _PLUGIN_ ].glbl = glbl;
	}


})( jQuery );