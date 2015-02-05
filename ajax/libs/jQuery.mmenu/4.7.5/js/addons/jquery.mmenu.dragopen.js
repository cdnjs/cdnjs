/*	
 * jQuery mmenu dragOpen addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'dragOpen';


	$[ _PLUGIN_ ].addons[ _ADDON_ ] = {
	
		//	_init: fired when (re)initiating the plugin
		_init: function( $panels ) {},

		//	_setup: fired once per menu
		_setup: function()
		{
			if ( !this.opts.offCanvas )
			{
				return;
			}

			var that = this,
				opts = this.opts[ _ADDON_ ],
				conf = this.conf[ _ADDON_ ];


			//	Extend shortcut options
			if ( typeof opts == 'boolean' )
			{
				opts = {
					open: opts
				};
			}
			if ( typeof opts != 'object' )
			{
				opts = {};
			}
			opts = $.extend( true, {}, $[ _PLUGIN_ ].defaults[ _ADDON_ ], opts );
			

			//	Drag open			
			if ( opts.open )
			{
				if ( Hammer.VERSION < 2 )
				{
					return;
				}

				//	Set up variables
				var drag			= {},
					_stage 			= 0,
					_direction 		= false,
					_dimension		= false,
					_distance 		= 0,
					_maxDistance 	= 0;
	
				var new_distance, drag_distance, css_value, pointer_pos;
	
				switch( this.opts.offCanvas.position )
				{
					case 'left':
					case 'right':
						drag.events		= 'panleft panright';
						drag.typeLower	= 'x';
						drag.typeUpper	= 'X';
						
						_dimension		= 'width';
						break;
	
					case 'top':
					case 'bottom':
						drag.events		= 'panup pandown';
						drag.typeLower	= 'y';
						drag.typeUpper	= 'Y';
	
						_dimension = 'height';
						break;
				}
				
				switch( this.opts.offCanvas.position )
				{
					case 'left':
					case 'top':
						drag.negative 	= false;
						break;
					
					case 'right':
					case 'bottom':
						drag.negative 	= true;
						break;
				}

				switch( this.opts.offCanvas.position )
				{
					case 'left':
						drag.open_dir 	= 'right';
						drag.close_dir 	= 'left';
						break;
	
					case 'right':
						drag.open_dir 	= 'left';
						drag.close_dir 	= 'right';
						break;
	
					case 'top':
						drag.open_dir 	= 'down';
						drag.close_dir 	= 'up';
						break;
	
					case 'bottom':
						drag.open_dir 	= 'up';
						drag.close_dir 	= 'down';
						break;
				}
	
				var $dragNode = this.__valueOrFn( opts.pageNode, this.$menu, glbl.$page );

				if ( typeof $dragNode == 'string' )
				{
					$dragNode = $($dragNode);
				}

				var $dragg = glbl.$page;

				switch ( this.opts.offCanvas.zposition )
				{
					case 'front':
						$dragg = this.$menu;
						break;
	
					case 'next':
						$dragg = $dragg.add( this.$menu );
						break;
				};
	
	
				//	Bind events
				var _hammer = new Hammer( $dragNode[ 0 ], opts.vendors.hammer );

				_hammer
					.on( 'panstart',
						function( e )
						{
							pointer_pos = e.center[ drag.typeLower ];
							switch( that.opts.offCanvas.position )
							{
								case 'right':
								case 'bottom':
									if ( pointer_pos >= glbl.$wndw[ _dimension ]() - opts.maxStartPos )
									{
										_stage = 1;
									}
									break;
	
								default:
									if ( pointer_pos <= opts.maxStartPos )
									{
										_stage = 1;
									}
									break;
							}
							_direction = drag.open_dir;
						}
					)
					.on( drag.events + ' panend',
						function( e )
						{
							if ( _stage > 0 )
							{
								e.preventDefault();
							}
						}
					)
					.on( drag.events,
						function( e )
						{
	
							new_distance = e[ 'delta' + drag.typeUpper ];
							if ( drag.negative )
							{
								new_distance = -new_distance;
							}
	
							if ( new_distance != _distance )
							{
								_direction = ( new_distance >= _distance )
									? drag.open_dir
									: drag.close_dir;
							}
	
							_distance = new_distance;
	
							if ( _distance > opts.threshold )
							{
								if ( _stage == 1 )
								{
									if ( glbl.$html.hasClass( _c.opened ) )
									{
										return;
									}
									_stage = 2;
	
									that._openSetup();
									that.$menu.trigger( _e.opening );
									glbl.$html.addClass( _c.dragging );
	
									_maxDistance = minMax( 
										glbl.$wndw[ _dimension ]() * conf[ _dimension ].perc, 
										conf[ _dimension ].min, 
										conf[ _dimension ].max
									);
								}
							}
							if ( _stage == 2 )
							{
								drag_distance = minMax( _distance, 10, _maxDistance ) - ( that.opts.offCanvas.zposition == 'front' ? _maxDistance : 0 );
								if ( drag.negative )
								{
									drag_distance = -drag_distance;
								}
								css_value = 'translate' + drag.typeUpper + '(' + drag_distance + 'px )';
	
								$dragg.css({
									'-webkit-transform': '-webkit-' + css_value,	
									'transform': css_value
								});
							}
						}
					)
					.on( 'panend',
						function( e )
						{
							if ( _stage == 2 )
							{
								glbl.$html.removeClass( _c.dragging );
								$dragg.css( 'transform', '' );
								that[ _direction == drag.open_dir ? '_openFinish' : 'close' ]();
							}
				        	_stage = 0;
					    }
					);
			}
		},

		//	_add: fired once per page load
		_add: function()
		{
			if ( typeof Hammer != 'function' )
			{
				$[ _PLUGIN_ ].addons[ _ADDON_ ]._init = function() {};
				$[ _PLUGIN_ ].addons[ _ADDON_ ]._setup = function() {};

				return;
			}

			_c = $[ _PLUGIN_ ]._c;
			_d = $[ _PLUGIN_ ]._d;
			_e = $[ _PLUGIN_ ]._e;
	
			_c.add( 'dragging' );
	
			glbl = $[ _PLUGIN_ ].glbl;
		}
	};


	//	Default options and configuration
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {
		open		: false,
//		pageNode	: null,
		maxStartPos	: 100,
		threshold	: 50,
		vendors		: {
			hammer		: {}
		}
	};
	$[ _PLUGIN_ ].configuration[ _ADDON_ ] = {
		width	: {
			perc	: 0.8,
			min		: 140,
			max		: 440
		},
		height	: {
			perc	: 0.8,
			min		: 140,
			max		: 880
		}
	};


	var _c, _d, _e, glbl;


	function minMax( val, min, max )
	{
		if ( val < min )
		{
			val = min;
		}
		if ( val > max )
		{
			val = max;
		}
		return val;
	}

})( jQuery );