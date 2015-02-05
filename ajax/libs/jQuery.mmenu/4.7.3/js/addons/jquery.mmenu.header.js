/*	
 * jQuery mmenu header addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'header';


	$[ _PLUGIN_ ].addons[ _ADDON_ ] = {
	
		//	_init: fired when (re)initiating the plugin
		_init: function( $panels )
		{
			var that = this,
				opts = this.opts[ _ADDON_ ],
				conf = this.conf[ _ADDON_ ];


			//	Update content
			var $header = $('.' + _c.header, this.$menu);
			if ( $header.length )
			{
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
				if ( $[ _PLUGIN_ ].addons.buttonbars )
				{
					$[ _PLUGIN_ ].addons.buttonbars._init.call( this, $header );
				}
			}
		},

		//	_setup: fired once per menu
		_setup: function()
		{
			var that = this,
				opts = this.opts[ _ADDON_ ],
				conf = this.conf[ _ADDON_ ];


			//	Extend shortcut options
			if ( typeof opts == 'boolean' )
			{
				opts = {
					add		: opts,
					update	: opts
				};
			}
			if ( typeof opts != 'object' )
			{
				opts = {};
			}
			if ( typeof opts.content == 'undefined' )
			{
				opts.content = [ 'prev', 'title', 'next' ];
			}
			opts = $.extend( true, {}, $[ _PLUGIN_ ].defaults[ _ADDON_ ], opts );


			this.opts[ _ADDON_ ] = opts;


			//	Add markup
			if ( opts.add )
			{
				if ( opts.content instanceof Array )
				{
					var $content = $( '<div />' );
					for ( var c = 0, l = opts.content.length; c < l; c++ )
					{
						switch ( opts.content[ c ] )
						{
							case 'prev':
							case 'next':
							case 'close':
								$content.append( '<a class="' + _c[ opts.content[ c ] ] + '" href="#"></a>' );
								break;
							
							case 'title':
								$content.append( '<span class="' + _c.title + '"></span>' );
								break;
							
							default:
								$content.append( opts.content[ c ] );
								break;
						}
					}
					$content = $content.html();
				}
				else
				{
					var $content = opts.content;
				}

				$( '<div class="' + _c.header + '" />' )
					.prependTo( this.$menu )
					.append( $content );
				
				this.$menu.addClass( _c.hasheader );
			}
		},

		//	_add: fired once per page load
		_add: function()
		{
			_c = $[ _PLUGIN_ ]._c;
			_d = $[ _PLUGIN_ ]._d;
			_e = $[ _PLUGIN_ ]._e;
	
			_c.add( 'header hasheader prev next close title' );
	
			glbl = $[ _PLUGIN_ ].glbl;
		}
	};


	//	Default options and configuration
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {
		add		: false,
//		content	: [ 'prev', 'title', 'next' ],
		title	: 'Menu',
		update	: false
	};
	$[ _PLUGIN_ ].configuration.classNames[ _ADDON_ ] = {
		panelHeader	: 'Header',
		panelNext	: 'Next',
		panelPrev	: 'Prev'
	};


	var _c, _d, _e, glbl;

})( jQuery );