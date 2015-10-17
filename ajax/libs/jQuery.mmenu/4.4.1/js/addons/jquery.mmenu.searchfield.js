/*	
 * jQuery mmenu searchfield addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'searchfield';


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


		//	Add the searchfield(s)
		if ( opts.add )
		{
			switch( opts.addTo )
			{
				case 'menu':
					var $wrapper = this.$menu;
					break;

				case 'panels':
					var $wrapper = $panels;
					break;

				default:
					var $wrapper = $(opts.addTo, this.$menu).filter( '.' + _c.panel );
					break;
			}

			if ( $wrapper.length )
			{
				$wrapper.each(
					function()
					{
						//	Add the searchfield
						var $panl = $(this),
							_node = $panl.is( '.' + _c.list ) ? 'li' : 'div';

						if ( !$panl.children( _node + '.' + _c.search ).length )
						{
							if ( $panl.is( '.' + _c.menu ) )
							{
								var $wrpr = that.$menu,
									insrt = 'prependTo';
							}
							else
							{
								var $wrpr = $panl.children().first(),
									insrt = ( $wrpr.is( '.' + _c.subtitle ) )
										? 'insertAfter'
										: 'insertBefore';
							}

							$( '<' + _node + ' class="' + _c.search + '" />' )
								.append( '<input placeholder="' + opts.placeholder + '" type="text" autocomplete="off" />' )
								[ insrt ]( $wrpr );
						}

						if ( opts.noResults )
						{
							if ( $panl.is( '.' + _c.menu ) )
							{
								$panl = $panl.children( '.' + _c.panel ).first();
							}
							_node = $panl.is( '.' + _c.list ) ? 'li' : 'div';

							if ( !$panl.children( _node + '.' + _c.noresultsmsg ).length )
							{
								$( '<' + _node + ' class="' + _c.noresultsmsg + '" />' )
									.html( opts.noResults )
									.appendTo( $panl );
							}
						}
					}
				);
			}
		}

		if ( this.$menu.children( 'div.' + _c.search ).length )
		{
			this.$menu.addClass( _c.hassearch );
		}

		//	Search through list items
		if ( opts.search )
		{
			var $search = $('.' + _c.search, this.$menu);
			if ( $search.length )
			{
				$search
					.each(
						function()
						{
							var $srch = $(this);

							if ( opts.addTo == 'menu' )
							{
								var $pnls = $('.' + _c.panel, that.$menu),
									$panl = that.$menu;
							}
							else
							{
								var $pnls = $srch.closest( '.' + _c.panel ),
									$panl = $pnls;
							}
							var $inpt = $srch.children( 'input' ),
								$itms = that.__findAddBack( $pnls, '.' + _c.list ).children( 'li' ),
								$lbls = $itms.filter( '.' + _c.label ),
								$rslt = $itms
									.not( '.' + _c.subtitle )
									.not( '.' + _c.label )
									.not( '.' + _c.search )
									.not( '.' + _c.noresultsmsg );

							var _searchText = '> a';
							if ( !opts.showLinksOnly )
							{
								_searchText += ', > span';
							}

							$inpt
								.off( _e.keyup + ' ' + _e.change )
								.on( _e.keyup,
									function( e )
									{
										if ( !preventKeypressSearch( e.keyCode ) )
										{
											$srch.trigger( _e.search );
										}
									}
								)
								.on( _e.change,
									function( e )
									{
										$srch.trigger( _e.search );
									}
								);
			
							$srch
								.off( _e.reset + ' ' + _e.search )
								.on( _e.reset + ' ' + _e.search,
									function( e )
									{
										e.stopPropagation();
									}
								)
								.on( _e.reset,
									function( e )
									{
										$srch.trigger( _e.search, [ '' ] );
									}
								)
								.on( _e.search,
									function( e, query )
									{
										if ( typeof query == 'string' )
										{
											$inpt.val( query );
										}
										else
										{
											query = $inpt.val();
										}
										query = query.toLowerCase();

										//	Scroll to top
										$pnls.scrollTop( 0 );
			
										//	Search through items
										$rslt
											.add( $lbls )
											.addClass( _c.hidden );

										$rslt
											.each(
												function()
												{
													var $item = $(this);
													if ( $(_searchText, $item).text().toLowerCase().indexOf( query ) > -1 )
													{
														$item.add( $item.prevAll( '.' + _c.label ).first() ).removeClass( _c.hidden );
													}
												}
											);
	
										//	Update parent for submenus
										$( $pnls.get().reverse() ).each(
											function( i )
											{
												var $panl = $(this),
													$prnt = $panl.data( _d.parent );
	
												if ( $prnt )
												{
													var $i = $panl.add( $panl.find( '> .' + _c.list ) ).find( '> li' )
														.not( '.' + _c.subtitle )
														.not( '.' + _c.search )
														.not( '.' + _c.noresultsmsg )
														.not( '.' + _c.label )
														.not( '.' + _c.hidden );
			
													if ( $i.length )
													{
														$prnt
															.removeClass( _c.hidden )
															.removeClass( _c.nosubresults )
															.prevAll( '.' + _c.label ).first().removeClass( _c.hidden );
													}
													else if ( opts.addTo == 'menu' )
													{
														if ( $panl.hasClass( _c.opened ) )
														{
															//	Compensate the timeout for the opening animation
															setTimeout(
																function()
																{
																	$prnt.trigger( _e.open );
																}, ( i + 1 ) * ( that.conf.openingInterval * 1.5 )
															);
														}
														$prnt.addClass( _c.nosubresults );
													}
												}
											}
										);
	
										//	Show/hide no results message
										$panl[ $rslt.not( '.' + _c.hidden ).length ? 'removeClass' : 'addClass' ]( _c.noresults );
									}
								);
						}
					);
			}
		}
	};


	//	Add to plugin
	$[ _PLUGIN_ ].addons.push( _ADDON_ );


	//	Defaults
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {
		add				: false,
		addTo			: 'menu',
		search			: false,
//		showLinksOnly	: true,
		placeholder		: 'Search',
		noResults		: 'No results found.'
	};
	

	function preventKeypressSearch( c )
	{
		switch( c )
		{
			case 9:		//	tab
			case 16:	//	shift
			case 17:	//	control
			case 18:	//	alt
			case 37:	//	left
			case 38:	//	top
			case 39:	//	right
			case 40:	//	bottom
				return true;
		}
		return false;
	}


	function extendOptions( o )
	{
		if ( typeof o == 'boolean' )
		{
			o = {
				add		: o,
				search	: o
			};
		}
		if ( typeof o != 'object' )
		{
			o = {};
		}
		o = $.extend( true, {}, $[ _PLUGIN_ ].defaults[ _ADDON_ ], o );

		if ( typeof o.showLinksOnly != 'boolean' )
		{
			o.showLinksOnly = ( o.addTo == 'menu' );
		}
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

		_c.add( 'search hassearch noresultsmsg noresults nosubresults' );
		_e.add( 'search reset change' );

		glbl = $[ _PLUGIN_ ].glbl;
	}

	var _c, _d, _e, glbl,
		addon_initiated = false;

})( jQuery );