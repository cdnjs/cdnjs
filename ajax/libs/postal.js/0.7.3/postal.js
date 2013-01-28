/*
 postal
 Author: Jim Cowart (http://freshbrewedcode.com/jimcowart)
 License: Dual licensed MIT (http://www.opensource.org/licenses/mit-license) & GPL (http://www.opensource.org/licenses/gpl-license)
 Version 0.7.3
 */
(function ( root, doc, factory ) {
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define( ["underscore"], function ( _ ) {
			return factory( _, root, doc );
		} );
	} else {
		// Browser globals
		factory( root._, root, doc );
	}
}( this, document, function ( _, global, document, undefined ) {

	var DEFAULT_CHANNEL = "/",
		DEFAULT_PRIORITY = 50,
		DEFAULT_DISPOSEAFTER = 0,
		SYSTEM_CHANNEL = "postal",
		NO_OP = function () {
		};
	
	var ConsecutiveDistinctPredicate = function () {
		var previous;
		return function ( data ) {
			var eq = false;
			if ( _.isString( data ) ) {
				eq = data === previous;
				previous = data;
			}
			else {
				eq = _.isEqual( data, previous );
				previous = _.clone( data );
			}
			return !eq;
		};
	};
	var DistinctPredicate = function () {
	  var previous = [];
	
	  return function (data) {
	    var isDistinct = !_.any(previous, function (p) {
	      if (_.isObject(data) || _.isArray(data)) {
	        return _.isEqual(data, p);
	      }
	      return data === p;
	    });
	    if (isDistinct) {
	      previous.push(data);
	    }
	    return isDistinct;
	  };
	};
	var ChannelDefinition = function ( channelName, defaultTopic ) {
		this.channel = channelName || DEFAULT_CHANNEL;
		this._topic = defaultTopic || "";
	};
	
	ChannelDefinition.prototype = {
		subscribe : function () {
			var len = arguments.length;
			if ( len === 1 ) {
				return new SubscriptionDefinition( this.channel, this._topic, arguments[0] );
			}
			else if ( len === 2 ) {
				return new SubscriptionDefinition( this.channel, arguments[0], arguments[1] );
			}
		},
	
		publish : function ( obj ) {
			var _obj = obj || {};
			var envelope = {
				channel : this.channel,
				topic : this._topic,
				data : _obj
			};
			// If this is an envelope....
			if ( _obj.topic && _obj.data ) {
				envelope = _obj;
				envelope.channel = envelope.channel || this.channel;
			}
			envelope.timeStamp = new Date();
			postal.configuration.bus.publish( envelope );
			return envelope;
		},
	
		topic : function ( topic ) {
			if ( topic === this._topic ) {
				return this;
			}
			return new ChannelDefinition( this.channel, topic );
		}
	};
	
	var SubscriptionDefinition = function ( channel, topic, callback ) {
		this.channel = channel;
		this.topic = topic;
		this.callback = callback;
		this.priority = DEFAULT_PRIORITY;
		this.constraints = new Array( 0 );
		this.maxCalls = DEFAULT_DISPOSEAFTER;
		this.onHandled = NO_OP;
		this.context = null;
		postal.configuration.bus.publish( {
			channel : SYSTEM_CHANNEL,
			topic : "subscription.created",
			timeStamp : new Date(),
			data : {
				event : "subscription.created",
				channel : channel,
				topic : topic
			}
		} );
	
		postal.configuration.bus.subscribe( this );
	
	};
	
	SubscriptionDefinition.prototype = {
		unsubscribe : function () {
			postal.configuration.bus.unsubscribe( this );
			postal.configuration.bus.publish( {
				channel : SYSTEM_CHANNEL,
				topic : "subscription.removed",
				timeStamp : new Date(),
				data : {
					event : "subscription.removed",
					channel : this.channel,
					topic : this.topic
				}
			} );
		},
	
		defer : function () {
			var fn = this.callback;
			this.callback = function ( data ) {
				setTimeout( fn, 0, data );
			};
			return this;
		},
	
		disposeAfter : function ( maxCalls ) {
			if ( _.isNaN( maxCalls ) || maxCalls <= 0 ) {
				throw "The value provided to disposeAfter (maxCalls) must be a number greater than zero.";
			}
	
			var fn = this.onHandled;
			var dispose = _.after( maxCalls, _.bind( function () {
				this.unsubscribe( this );
			}, this ) );
	
			this.onHandled = function () {
				fn.apply( this.context, arguments );
				dispose();
			};
			return this;
		},
	
	  distinctUntilChanged : function () {
			this.withConstraint( new ConsecutiveDistinctPredicate() );
			return this;
		},
	
		distinct : function () {
			this.withConstraint( new DistinctPredicate() );
			return this;
		},
	
		withConstraint : function ( predicate ) {
			if ( !_.isFunction( predicate ) ) {
				throw "Predicate constraint must be a function";
			}
			this.constraints.push( predicate );
			return this;
		},
	
		withConstraints : function ( predicates ) {
			var self = this;
			if ( _.isArray( predicates ) ) {
				_.each( predicates, function ( predicate ) {
					self.withConstraint( predicate );
				} );
			}
			return self;
		},
	
		withContext : function ( context ) {
			this.context = context;
			return this;
		},
	
		withDebounce : function ( milliseconds ) {
			if ( _.isNaN( milliseconds ) ) {
				throw "Milliseconds must be a number";
			}
			var fn = this.callback;
			this.callback = _.debounce( fn, milliseconds );
			return this;
		},
	
		withDelay : function ( milliseconds ) {
			if ( _.isNaN( milliseconds ) ) {
				throw "Milliseconds must be a number";
			}
			var fn = this.callback;
			this.callback = function ( data ) {
				setTimeout( function () {
					fn( data );
				}, milliseconds );
			};
			return this;
		},
	
		withPriority : function ( priority ) {
			if ( _.isNaN( priority ) ) {
				throw "Priority must be a number";
			}
			this.priority = priority;
			postal.configuration.bus.changePriority( this );
			return this;
		},
	
		withThrottle : function ( milliseconds ) {
			if ( _.isNaN( milliseconds ) ) {
				throw "Milliseconds must be a number";
			}
			var fn = this.callback;
			this.callback = _.throttle( fn, milliseconds );
			return this;
		},
	
		subscribe : function ( callback ) {
			this.callback = callback;
			return this;
		}
	};
	
	var bindingsResolver = {
		cache : { },
	
		compare : function ( binding, topic ) {
			if ( this.cache[topic] && this.cache[topic][binding] ) {
				return true;
			}
			var pattern = ("^" + binding.replace( /\./g, "\\." )            // escape actual periods
										.replace( /\*/g, "[A-Z,a-z,0-9]*" ) // asterisks match any alpha-numeric 'word'
										.replace( /#/g, ".*" ) + "$")       // hash matches 'n' # of words (+ optional on start/end of topic)
										.replace( "\\..*$", "(\\..*)*$" )   // fix end of topic matching on hash wildcards
										.replace( "^.*\\.", "^(.*\\.)*" );  // fix beginning of topic matching on hash wildcards
			var rgx = new RegExp( pattern );
			var result = rgx.test( topic );
			if ( result ) {
				if ( !this.cache[topic] ) {
					this.cache[topic] = {};
				}
				this.cache[topic][binding] = true;
			}
			return result;
		},
	
		reset : function () {
			this.cache = {};
		}
	};
	
	var localBus = {
	
		addWireTap : function ( callback ) {
			var self = this;
			self.wireTaps.push( callback );
			return function () {
				var idx = self.wireTaps.indexOf( callback );
				if ( idx !== -1 ) {
					self.wireTaps.splice( idx, 1 );
				}
			};
		},
	
		changePriority : function ( subDef ) {
			var idx, found;
			if ( this.subscriptions[subDef.channel] && this.subscriptions[subDef.channel][subDef.topic] ) {
				this.subscriptions[subDef.channel][subDef.topic] = _.without( this.subscriptions[subDef.channel][subDef.topic], subDef );
				idx = this.subscriptions[subDef.channel][subDef.topic].length - 1;
				for ( ; idx >= 0; idx-- ) {
					if ( this.subscriptions[subDef.channel][subDef.topic][idx].priority <= subDef.priority ) {
						this.subscriptions[subDef.channel][subDef.topic].splice( idx + 1, 0, subDef );
						found = true;
						break;
					}
				}
				if ( !found ) {
					this.subscriptions[subDef.channel][subDef.topic].unshift( subDef );
				}
			}
		},
	
		publish : function ( envelope ) {
			_.each( this.wireTaps, function ( tap ) {
				tap( envelope.data, envelope );
			} );
	
			if ( this.subscriptions[envelope.channel] ) {
				_.each( this.subscriptions[envelope.channel], function ( topic ) {
					// TODO: research faster ways to handle this than _.clone
					_.each( _.clone( topic ), function ( subDef ) {
						if ( postal.configuration.resolver.compare( subDef.topic, envelope.topic ) ) {
							if ( _.all( subDef.constraints, function ( constraint ) {
								return constraint( envelope.data, envelope );
							} ) ) {
								if ( typeof subDef.callback === 'function' ) {
									subDef.callback.apply( subDef.context, [envelope.data, envelope] );
									subDef.onHandled();
								}
							}
						}
					} );
				} );
			}
	
		},
	
		reset : function () {
			if ( this.subscriptions ) {
				_.each( this.subscriptions, function ( channel ) {
					_.each( channel, function ( topic ) {
						while ( topic.length ) {
							topic.pop().unsubscribe();
						}
					} );
				} );
				this.subscriptions = {};
			}
		},
	
		subscribe : function ( subDef ) {
			var idx, found, fn, channel = this.subscriptions[subDef.channel], subs;
	
			if ( !channel ) {
				channel = this.subscriptions[subDef.channel] = {};
			}
			subs = this.subscriptions[subDef.channel][subDef.topic];
			if ( !subs ) {
				subs = this.subscriptions[subDef.channel][subDef.topic] = new Array( 0 );
			}
			subs.push( subDef );
			return subDef;
		},
	
		subscriptions : {},
	
		wireTaps : new Array( 0 ),
	
		unsubscribe : function ( config ) {
			if ( this.subscriptions[config.channel][config.topic] ) {
				var len = this.subscriptions[config.channel][config.topic].length,
					idx = 0;
				for ( ; idx < len; idx++ ) {
					if ( this.subscriptions[config.channel][config.topic][idx] === config ) {
						this.subscriptions[config.channel][config.topic].splice( idx, 1 );
						break;
					}
				}
			}
		}
	};
	
	var publishPicker = {
			"1" : function ( envelope ) {
				if ( !envelope ) {
					throw new Error( "publishing from the 'global' postal.publish call requires a valid envelope." );
				}
				envelope.channel = envelope.channel || DEFAULT_CHANNEL;
				envelope.timeStamp = new Date();
				postal.configuration.bus.publish( envelope );
				return envelope;
			},
			"2" : function ( topic, data ) {
				var envelope = { channel : DEFAULT_CHANNEL, topic : topic, timeStamp : new Date(), data : data };
				postal.configuration.bus.publish( envelope );
				return envelope;
			},
			"3" : function ( channel, topic, data ) {
				var envelope = { channel : channel, topic : topic, timeStamp : new Date(), data : data };
				postal.configuration.bus.publish( envelope );
				return envelope;
			}
		},
		channelPicker = {
			"1" : function ( chn ) {
				var channel = chn, topic, options = {};
				if ( Object.prototype.toString.call( channel ) === "[object String]" ) {
					channel = DEFAULT_CHANNEL;
					topic = chn;
				}
				else {
					channel = chn.channel || DEFAULT_CHANNEL;
					topic = chn.topic;
					options = chn.options || options;
				}
				return new postal.channelTypes[ options.type || "local" ]( channel, topic );
			},
			"2" : function ( chn, tpc ) {
				var channel = chn, topic = tpc, options = {};
				if ( Object.prototype.toString.call( tpc ) === "[object Object]" ) {
					channel = DEFAULT_CHANNEL;
					topic = chn;
					options = tpc;
				}
				return new postal.channelTypes[ options.type || "local" ]( channel, topic );
			},
			"3" : function ( channel, topic, options ) {
				return new postal.channelTypes[ options.type || "local" ]( channel, topic );
			}
		},
		sessionInfo = {};
	
	// save some setup time, albeit tiny
	localBus.subscriptions[SYSTEM_CHANNEL] = {};
	
	var postal = {
		configuration : {
			bus : localBus,
			resolver : bindingsResolver,
			DEFAULT_CHANNEL : DEFAULT_CHANNEL,
			DEFAULT_PRIORITY : DEFAULT_PRIORITY,
			DEFAULT_DISPOSEAFTER : DEFAULT_DISPOSEAFTER,
			SYSTEM_CHANNEL : SYSTEM_CHANNEL
		},
	
		channelTypes : {
			local : ChannelDefinition
		},
	
		channel : function () {
			var len = arguments.length;
			if ( channelPicker[len] ) {
				return channelPicker[len].apply( this, arguments );
			}
		},
	
		subscribe : function ( options ) {
			var callback = options.callback,
				topic = options.topic,
				channel = options.channel || DEFAULT_CHANNEL;
			return new SubscriptionDefinition( channel, topic, callback );
		},
	
		publish : function () {
			var len = arguments.length;
			if ( publishPicker[len] ) {
				return publishPicker[len].apply( this, arguments );
			}
		},
	
		addWireTap : function ( callback ) {
			return this.configuration.bus.addWireTap( callback );
		},
	
		linkChannels : function ( sources, destinations ) {
			var result = [];
			if ( !_.isArray( sources ) ) {
				sources = [sources];
			}
			if ( !_.isArray( destinations ) ) {
				destinations = [destinations];
			}
			_.each( sources, function ( source ) {
				var sourceTopic = source.topic || "#";
				_.each( destinations, function ( destination ) {
					var destChannel = destination.channel || DEFAULT_CHANNEL;
					result.push(
						postal.subscribe( {
							channel : source.channel || DEFAULT_CHANNEL,
							topic : source.topic || "#",
							callback : function ( data, env ) {
								var newEnv = _.clone( env );
								newEnv.topic = _.isFunction( destination.topic ) ? destination.topic( env.topic ) : destination.topic || env.topic;
								newEnv.channel = destChannel;
								newEnv.data = data;
								postal.publish( newEnv );
							}
						} )
					);
				} );
			} );
			return result;
		},
	
		utils : {
			getSubscribersFor : function () {
				var channel = arguments[ 0 ],
					tpc = arguments[ 1 ],
					result = [];
				if ( arguments.length === 1 ) {
					if ( Object.prototype.toString.call( channel ) === "[object String]" ) {
						channel = postal.configuration.DEFAULT_CHANNEL;
						tpc = arguments[ 0 ];
					}
					else {
						channel = arguments[ 0 ].channel || postal.configuration.DEFAULT_CHANNEL;
						tpc = arguments[ 0 ].topic;
					}
				}
				if ( postal.configuration.bus.subscriptions[ channel ] &&
					postal.configuration.bus.subscriptions[ channel ].hasOwnProperty( tpc ) ) {
					result = postal.configuration.bus.subscriptions[ channel ][ tpc ];
				}
				return result;
			},
	
			reset : function () {
				postal.configuration.bus.reset();
				postal.configuration.resolver.reset();
			}
		}
	};

	global.postal = postal;
	return postal;
} ));