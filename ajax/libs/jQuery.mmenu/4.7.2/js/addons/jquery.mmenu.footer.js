/*	
 * jQuery mmenu footer addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'footer';


	$[ _PLUGIN_ ].addons[ _ADDON_ ] = {
	
		//	_init: fired when (re)initiating the plugin
		_init: function( $panels )
		{
			var that = this,
				opts = this.opts[ _ADDON_ ];


			//	Update content
			var $footer = $('div.' + _c.footer, this.$menu);
			if ( $footer.length )
			{
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
				if ( $[ _PLUGIN_ ].addons.buttonbars )
				{
					$[ _PLUGIN_ ].addons.buttonbars._init.call( this, $footer );
				}
			}
		},

		//	_setup: fired once per menu
		_setup: function()
		{
			var opts = this.opts[ _ADDON_ ];


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
			opts = $.extend( true, {}, $[ _PLUGIN_ ].defaults[ _ADDON_ ], opts );


			this.opts[ _ADDON_ ] = opts;
			

			//	Add markup
			if ( opts.add )
			{
				var content = opts.content
					? opts.content
					: opts.title;
	
				$( '<div class="' + _c.footer + '" />' )
					.appendTo( this.$menu )
					.append( content );

				this.$menu.addClass( _c.hasfooter );
			}
		},

		//	_add: fired once per page load
		_add: function()
		{
			_c = $[ _PLUGIN_ ]._c;
			_d = $[ _PLUGIN_ ]._d;
			_e = $[ _PLUGIN_ ]._e;
	
			_c.add( 'footer hasfooter' );
	
			glbl = $[ _PLUGIN_ ].glbl;
		}
	};


	//	Default options and configuration
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {
		add		: false,
		content	: false,
		title	: '',
		update	: false
	};
	$[ _PLUGIN_ ].configuration.classNames[ _ADDON_ ] = {
		panelFooter: 'Footer'
	};


	var _c, _d, _e, glbl;

})( jQuery );