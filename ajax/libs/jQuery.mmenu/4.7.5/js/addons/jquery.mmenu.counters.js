/*	
 * jQuery mmenu counters addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'counters';


	$[ _PLUGIN_ ].addons[ _ADDON_ ] = {
	
		//	_init: fired when (re)initiating the plugin
		_init: function( $panels )
		{			
			var that = this,
				opts = this.opts[ _ADDON_ ],
				conf = this.conf[ _ADDON_ ];


			//	Refactor counter class
			this.__refactorClass( $('em', $panels), this.conf.classNames[ _ADDON_ ].counter, 'counter' );


			//	Add the counters
			if ( opts.add )
			{
				$panels
					.each(
						function()
						{
							var $prnt = $(this).data( _d.parent );
							if ( $prnt )
							{
								if ( !$prnt.find( '> em.' + _c.counter ).length )
								{
									$prnt.prepend( $( '<em class="' + _c.counter + '" />' ) );
								}
							}
						}
				);
			}


			//	Update the counter
			if ( opts.update )
			{
				$panels
					.each(
						function()
						{
							var $panl = $(this),
								$prnt = $panl.data( _d.parent );
	
							if ( $prnt )
							{
								var $cntr = $prnt.find( '> em.' + _c.counter );
								if ( $cntr.length )
								{
									if ( !$panl.is( '.' + _c.list ) )
									{
										$panl = $panl.find( '> .' + _c.list );
									}
									if ( $panl.length && !$panl.data( _d.updatecounter ) )
									{
										$panl.data( _d.updatecounter, true );
										that._update(
											function()
											{
												var $lis = $panl.children()
													.not( '.' + _c.label )
													.not( '.' + _c.subtitle )
													.not( '.' + _c.hidden )
													.not( '.' + _c.search )
													.not( '.' + _c.noresultsmsg );
		
												$cntr.html( $lis.length );
											}
										);
									}
								}
							}
						}
					);
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
		},

		//	_add: fired once per page load
		_add: function()
		{
			_c = $[ _PLUGIN_ ]._c;
			_d = $[ _PLUGIN_ ]._d;
			_e = $[ _PLUGIN_ ]._e;
	
			_c.add( 'counter search noresultsmsg' );
			_d.add( 'updatecounter' );
	
			glbl = $[ _PLUGIN_ ].glbl;
		}
	};


	//	Default options and configuration
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {
		add		: false,
		update	: false
	};
	$[ _PLUGIN_ ].configuration.classNames[ _ADDON_ ] = {
		counter: 'Counter'
	};


	var _c, _d, _e, glbl;

})( jQuery );