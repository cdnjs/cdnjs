/*	
 * jQuery mmenu counters addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'counters';

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
	};


	//	Add to plugin
	$[ _PLUGIN_ ].addons.push( _ADDON_ );


	//	Defaults
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {
		add		: false,
		update	: false
	};
	$[ _PLUGIN_ ].configuration.classNames[ _ADDON_ ] = {
		counter: 'Counter'
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

		_c.add( 'counter search noresultsmsg' );
		_d.add( 'updatecounter' );

		glbl = $[ _PLUGIN_ ].glbl;
	}

})( jQuery );