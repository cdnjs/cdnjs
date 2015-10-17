/*
Copyright (c) 2010,2011,2012 Morgan Roderick http://roderick.dk
License: MIT - http://mrgnrdrck.mit-license.org

https://github.com/mroderick/PubSubJS
*/
/*jslint white:true, plusplus:true, stupid:true*/
/*global
	setTimeout,
	module,
	exports,
	define,
	require,
	window
*/

(function(root, factory){
	'use strict';

	// CommonJS
	if (typeof exports === 'object'){
		module.exports = factory();

	// AMD
	} else if (typeof define === 'function' && define.amd){
		define(factory);
	// Browser
	} else {
		root.PubSub = factory();
	}
}( ( typeof window === 'object' && window ) || this, function(){

	'use strict';
	
	var PubSub = {
			name: 'PubSubJS',
			version: '1.3.3'
		},
		messages = {},
		lastUid = -1;

	/**
	 *	Returns a function that throws the passed exception, for use as argument for setTimeout
	 *	@param { Object } ex An Error object
	 */
	function throwException( ex ){
		return function reThrowException(){
			throw ex;
		};
	}

	function callSubscriberWithDelayedExceptions( subscriber, message, data ){
		try {
			subscriber( message, data );
		} catch( ex ){
			setTimeout( throwException( ex ), 0);
		}
	}

	function callSubscriberWithImmediateExceptions( subscriber, message, data ){
		subscriber( message, data );
	}

	function deliverMessage( originalMessage, matchedMessage, data, immediateExceptions ){
		var subscribers = messages[matchedMessage],
			callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions,
			i, j; 

		if ( !messages.hasOwnProperty( matchedMessage ) ) {
			return;
		}

		for ( i = 0, j = subscribers.length; i < j; i++ ){
			callSubscriber( subscribers[i].func, originalMessage, data );
		}
	}

	function createDeliveryFunction( message, data, immediateExceptions ){
		return function deliverNamespaced(){
			var topic = String( message ),
				position = topic.lastIndexOf( '.' );

			// deliver the message as it is now
			deliverMessage(message, message, data, immediateExceptions);

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

	function publish( message, data, sync, immediateExceptions ){
		var deliver = createDeliveryFunction( message, data, immediateExceptions ),
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
		return publish( message, data, false, PubSub.immediateExceptions );
	};

	/**
	 *	PubSub.publishSync( message[, data] ) -> Boolean
	 *	- message (String): The message to publish
	 *	- data: The data to pass to subscribers
	 *	Publishes the the message synchronously, passing the data to it's subscribers
	**/
	PubSub.publishSync = function( message, data ){
		return publish( message, data, true, PubSub.immediateExceptions );
	};

	/**
	 *	PubSub.subscribe( message, func ) -> String
	 *	- message (String): The message to subscribe to
	 *	- func (Function): The function to call when a new message is published
	 *	Subscribes the passed function to the passed message. Every returned token is unique and should be stored if 
	 *	you need to unsubscribe
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
			m, i;
		
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
	
	return PubSub;
}));