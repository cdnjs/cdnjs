/*
Copyright (c) 2010 Morgan Roderick http://roderick.dk

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/*jslint white:true, plusplus:true */
/*global setTimeout */
/** section: PubSub
 *  PubSubJS is a dependency free library for doing ['publish/subscribe'](http://en.wikipedia.org/wiki/Publish/subscribe)
 *  messaging in JavaScript.
 *  
 *  In order to not have surprising behaviour where the execution chain generates more than one message, 
 *  publication of messages with PubSub are done asyncronously (this also helps keep your code responsive, by 
 *  dividing work into smaller chunks, allowing the event loop to do it's business).
 *
 *  If you're feeling adventurous, you can also use syncronous message publication, which can lead to some very
 *  confusing conditions, when one message triggers publication of another message in the same execution chain.
 *  Don't say I didn't warn you.
 * 
 *  ##### Examples
 *  
 *      // create a function to receive the message
 *      var mySubscriber = function( msg, data ){
 *          console.log( msg, data );
 *      };
 * 
 *      // add the function to the list of subscribers to a particular message
 *      // we're keeping the returned token, in order to be able to unsubscribe from the message later on
 *      var token = PubSub.subscribe( 'MY MESSAGE', mySubscriber );
 *
 *      // publish a message asyncronously
 *      PubSub.publish( 'MY MESSAGE', 'hello world!' );
 *      
 *      // publish a message syncronously, which is faster by orders of magnitude, but will get confusing
 *      // when one message triggers new messages in the same execution chain
 *      // USE WITH CATTION, HERE BE DRAGONS!!!
 *      PubSub.publishSync( 'MY MESSAGE', 'hello world!' );
 *      
 *      // unsubscribe from further messages, using setTimeout to allow for easy pasting of this code into an example :-)
 *      setTimeout(function(){
 *          PubSub.unsubscribe( token );
 *      }, 0)
**/ 
var PubSub = {};
(function(p){
    "use strict";
    
    p.version = "1.0.2";
    
    var messages = {},
		lastUid = -1;
    
	function publish( message, data, sync ){
        // if there are no subscribers to this message, just return here
        if ( !messages.hasOwnProperty( message ) ){
            return false;
        }
        
		function deliverMessage(){
            var subscribers = messages[message],
				throwException = function(e){
	                return function(){
	                    throw e;
	                };
	            },
				i, j; 
            for ( i = 0, j = subscribers.length; i < j; i++ ){
                try {
                    subscribers[i].func( message, data );
                } catch( e ){
                    setTimeout( throwException(e), 0);
                }
            }
        }
        
        if ( sync === true ){
            deliverMessage();
        } else {
            setTimeout( deliverMessage, 0 );
        }
        return true;
    }

    /**
     *  PubSub.publish( message[, data] ) -> Boolean
     *  - message (String): The message to publish
     *  - data: The data to pass to subscribers
     *  - sync (Boolean): Forces publication to be syncronous, which is more confusing, but faster
     *  Publishes the the message, passing the data to it's subscribers
    **/
    p.publish = function( message, data ){
        return publish( message, data, false );
    };

    /**
     *  PubSub.publishSync( message[, data] ) -> Boolean
     *  - message (String): The message to publish
     *  - data: The data to pass to subscribers
     *  - sync (Boolean): Forces publication to be syncronous, which is more confusing, but faster
     *  Publishes the the message synchronously, passing the data to it's subscribers
    **/
    p.publishSync = function( message, data ){
        return publish( message, data, true );
    };

    /**
     *  PubSub.subscribe( message, func ) -> String
     *  - message (String): The message to subscribe to
     *  - func (Function): The function to call when a new message is published
     *  Subscribes the passed function to the passed message. Every returned token is unique and should be stored if you need to unsubscribe
    **/
    p.subscribe = function( message, func ){
        // message is not registered yet
        if ( !messages.hasOwnProperty( message ) ){
            messages[message] = [];
        }

        // forcing token as String, to allow for future expansions without breaking usage
        // and allow for easy use as key names for the 'messages' object
        var token = (++lastUid).toString();
        messages[message].push( { token : token, func : func } );

        // return token for unsubscribing
        return token;
    };

    /**
     *  PubSub.unsubscribe( token ) -> String | Boolean
     *  - token (String): The token of the function to unsubscribe
     *  Unsubscribes a specific subscriber from a specific message using the unique token
    **/
    p.unsubscribe = function( token ){
		var m, i, j;
        for ( m in messages ){
            if ( messages.hasOwnProperty( m ) ){
                for ( i = 0, j = messages[m].length; i < j; i++ ){
                    if ( messages[m][i].token === token ){
                        messages[m].splice( i, 1 );
                        return token;
                    }
                }
            }
        }
        return false;
    };
}(PubSub));