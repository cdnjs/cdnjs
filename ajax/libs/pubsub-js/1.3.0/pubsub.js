/*
Copyright (c) 2010,2011,2012 Morgan Roderick http://roderick.dk
License: MIT - http://mrgnrdrck.mit-license.org

https://github.com/mroderick/PubSubJS
*/
/*jslint white:true, plusplus:true */
/*global
	setTimeout,
	module,
	exports,
	define
*/
(function(root){
	"use strict";
	
	var PubSub = {
			name: 'PubSubJS',
			version: '1.3.0'
		},
		messages = {},
		lastUid = -1;

	// Export the PubSub object for **Node.js** and **"CommonJS"**, with
	// backwards-compatibility for the old `require()` API. If we're not in
	// CommonJS, add `PubSub` to the global object via a string identifier for
	// the Closure Compiler "advanced" mode. Registration as an AMD module
	// via define() happens at the end of this file.
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = PubSub;
		}
		exports.PubSub = PubSub;
	} else {
		root.PubSub = PubSub;
	}

	/**
	 *	Returns a function that throws the passed exception, for use as argument for setTimeout
	 *	@param { Object } ex An Error object
	 */
	function throwException( ex ){
		return function reThrowException(){
			throw ex;
		};
	}

	function callSubscriber( subscriber, message, data ){
		try {
			subscriber( message, data );
		} catch( ex ){
			setTimeout( throwException( ex ), 0);
		}
	}

	function deliverMessage( originalMessage, matchedMessage, data ){
		var subscribers = messages[matchedMessage],
			i, j; 

		if ( !messages.hasOwnProperty( matchedMessage ) ) {
			return;
		}

		for ( i = 0, j = subscribers.length; i < j; i++ ){
			callSubscriber( subscribers[i].func, originalMessage, data );
		}
	}

	function createDeliveryFunction( message, data ){
		return function deliverNamespaced(){
			var topic = String( message ),
				position = topic.lastIndexOf( '.' );

			// deliver the message as it is now
			deliverMessage(message, message, data);

			// trim the hierarchy and deliver message to each level
			while( position !== -1 ){
				topic = topic.substr( 0, position );
				position = topic.lastIndexOf('.');
				deliverMessage( message, topic, data );
			}
		};
	}

	function messageHasSubscribers( message ){
		var topic = String( message ),
			found = messages.hasOwnProperty( topic ),
			position = topic.lastIndexOf( '.' );

		while ( !found && position !== -1 ){
			topic = topic.substr( 0, position );
			position = topic.lastIndexOf('.');
			found = messages.hasOwnProperty( topic );
		}

		return found;
	}

	function publish( message, data, sync ){
		var deliver = createDeliveryFunction( message, data ),
			hasSubscribers = messageHasSubscribers( message );

		if ( !hasSubscribers ){
			return false;
		}

		if ( sync === true ){
			deliver();
		} else {
			setTimeout( deliver, 0 );
		}
		return true;
	}

	/**
	 *	PubSub.publish( message[, data] ) -> Boolean
	 *	- message (String): The message to publish
	 *	- data: The data to pass to subscribers
	 *	Publishes the the message, passing the data to it's subscribers
	**/
	PubSub.publish = function( message, data ){
		return publish( message, data, false );
	};

	/**
	 *	PubSub.publishSync( message[, data] ) -> Boolean
	 *	- message (String): The message to publish
	 *	- data: The data to pass to subscribers
	 *	Publishes the the message synchronously, passing the data to it's subscribers
	**/
	PubSub.publishSync = function( message, data ){
		return publish( message, data, true );
	};

	/**
	 *	PubSub.subscribe( message, func ) -> String
	 *	- message (String): The message to subscribe to
	 *	- func (Function): The function to call when a new message is published
	 *	Subscribes the passed function to the passed message. Every returned token is unique and should be stored if you need to unsubscribe
	**/
	PubSub.subscribe = function( message, func ){
		// message is not registered yet
		if ( !messages.hasOwnProperty( message ) ){
			messages[message] = [];
		}

		// forcing token as String, to allow for future expansions without breaking usage
		// and allow for easy use as key names for the 'messages' object
		var token = String(++lastUid);
		messages[message].push( { token : token, func : func } );

		// return token for unsubscribing
		return token;
	};

	/**
	 *	PubSub.unsubscribe( tokenOrFunction ) -> String | Boolean
	 *  - tokenOrFunction (String|Function): The token of the function to unsubscribe or func passed in on subscribe
	 *  Unsubscribes a specific subscriber from a specific message using the unique token 
	 *  or if using Function as argument, it will remove all subscriptions with that function	
	**/
	PubSub.unsubscribe = function( tokenOrFunction ){
		var isToken = typeof tokenOrFunction === 'string',
			key = isToken ? 'token' : 'func',
			succesfulReturnValue = isToken ? tokenOrFunction : true,

			result = false,
			m, i, j;
		
		for ( m in messages ){
			if ( messages.hasOwnProperty( m ) ){
				for ( i = messages[m].length-1 ; i >= 0; i-- ){
					if ( messages[m][i][key] === tokenOrFunction ){
						messages[m].splice( i, 1 );
						result = succesfulReturnValue;

						// tokens are unique, so we can just return here
						if ( isToken ){
							return result;
						}
					}
				}
			}
		}

		return result;
	};
	
	// AMD define happens at the end for compatibility with AMD loaders
	// that don't enforce next-turn semantics on modules.
	if (typeof define === 'function' && define.amd) {
		define('pubsub', function definition(){
			return PubSub;
		});
	}
}( typeof window !== 'undefined' && window || this));