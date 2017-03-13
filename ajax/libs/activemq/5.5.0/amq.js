/**
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// AMQ Ajax handler
// This class provides the main API for using the Ajax features of AMQ. It
// allows JMS messages to be sent and received from javascript when used
// with the org.apache.activemq.web.MessageListenerServlet.
//
// This version of the file provides an adapter interface for the jquery library
// and a namespace for the Javascript file, private/public variables and
// methods, and other scripting niceties. -- jim cook 2007/08/28

var org = org || {};
org.activemq = org.activemq || {};

org.activemq.Amq = function() {
	var connectStatusHandler;

	// Just a shortcut to eliminate some redundant typing.
	var adapter = org.activemq.AmqAdapter;

	if (typeof adapter == 'undefined') {
		throw 'An org.activemq.AmqAdapter must be declared before the amq.js script file.'
	}

	// The URI of the AjaxServlet.
	var uri;

	// The number of seconds that the long-polling socket will stay connected.
	// Best to keep this to a value less than one minute.
	var timeout;

	// A session should not be considered initialized until the JSESSIONID is returned
	// from the initial GET request.  Otherwise subscription POSTS may register the
	// subscription with the wrong session.
	var sessionInitialized = false;

	// This callback will be called after the first GET request returns.
	var sessionInitializedCallback;	

	// Poll delay. if set to positive integer, this is the time to wait in ms
	// before sending the next poll after the last completes.
	var pollDelay;

	// Inidicates whether logging is active or not. Not by default.
	var logging = false;

	// 5 second delay if an error occurs during poll. This could be due to
	// server capacity problems or a timeout condition.
	var pollErrorDelay = 5000;

	// Map of handlers that will respond to message receipts. The id used during
	// addListener(id, destination, handler) is used to key the callback
	// handler.  
	var messageHandlers = {};

	// Indicates whether an AJAX post call is in progress.
	var batchInProgress = false;

	// A collection of pending messages that accumulate when an AJAX call is in
	// progress. These messages will be delivered as soon as the current call
	// completes. The array contains objects in the format { destination,
	// message, messageType }.
	var messageQueue = [];

  // String to distinguish this client from others sharing the same session.
  // This can occur when multiple browser windows or tabs using amq.js simultaneously.
  // All windows share the same JESSIONID, but need to consume messages independently.
  var clientId = null;
  
	/**
	 * Iterate over the returned XML and for each message in the response, 
	 * invoke the handler with the matching id.
	 */
	var messageHandler = function(data) {
		var response = data.getElementsByTagName("ajax-response");
		if (response != null && response.length == 1) {
			connectStatusHandler(true);
			var responses = response[0].childNodes;    // <response>
			for (var i = 0; i < responses.length; i++) {
				var responseElement = responses[i];

				// only process nodes of type element.....
				if (responseElement.nodeType != 1) continue;

				var id = responseElement.getAttribute('id');

				var handler = messageHandlers[id];

				if (logging && handler == null) {
					adapter.log('No handler found to match message with id = ' + id);
					continue;
				}

				// Loop thru and handle each <message>
				for (var j = 0; j < responseElement.childNodes.length; j++) {
					handler(responseElement.childNodes[j]);
				}
			}
		}
	};

	var errorHandler = function(xhr, status, ex) {
		connectStatusHandler(false);
		if (logging) adapter.log('Error occurred in ajax call. HTTP result: ' +
		                         xhr.status + ', status: ' + status);
	}

	var pollErrorHandler = function(xhr, status, ex) {
		connectStatusHandler(false);
		if (status === 'error' && xhr.status === 0) {
			if (logging) adapter.log('Server connection dropped.');
			setTimeout(function() { sendPoll(); }, pollErrorDelay);
			return;
		}
		if (logging) adapter.log('Error occurred in poll. HTTP result: ' +
		                         xhr.status + ', status: ' + status);
		setTimeout(function() { sendPoll(); }, pollErrorDelay);
	}

	var pollHandler = function(data) {
		try {
			messageHandler(data);
		} catch(e) {
			if (logging) adapter.log('Exception in the poll handler: ' + data, e);
			throw(e);
		} finally {
			setTimeout(sendPoll, pollDelay);
		}
	};

	var initHandler = function(data) {
		sessionInitialized = true;
		if(sessionInitializedCallback) {
			sessionInitializedCallback();
		}
		sendPoll();
	}

	var sendPoll = function() {
		// Workaround IE6 bug where it caches the response
		// Generate a unique query string with date and random
		var now = new Date();
		var timeoutArg = sessionInitialized ? timeout : 0.001;
		var data = 'timeout=' + timeoutArg * 1000
				 + '&d=' + now.getTime()
				 + '&r=' + Math.random();
		var successCallback = sessionInitialized ? pollHandler : initHandler;

		var options = { method: 'get',
			data: addClientId( data ),
			success: successCallback,
			error: pollErrorHandler};
		adapter.ajax(uri, options);
	};

	var sendJmsMessage = function(destination, message, type, headers) {
		var message = {
			destination: destination,
			message: message,
			messageType: type
		};
		// Add message to outbound queue
		if (batchInProgress) {
			messageQueue[messageQueue.length] = {message:message, headers:headers};
		} else {
			org.activemq.Amq.startBatch();
			adapter.ajax(uri, { method: 'post',
				data: addClientId( buildParams( [message] ) ),
				error: errorHandler,
				headers: headers,
				success: org.activemq.Amq.endBatch});
		}
	};

	var buildParams = function(msgs) {
		var s = [];
		for (var i = 0, c = msgs.length; i < c; i++) {
			if (i != 0) s[s.length] = '&';
			s[s.length] = ((i == 0) ? 'destination' : 'd' + i);
			s[s.length] = '=';
			s[s.length] = msgs[i].destination;
			s[s.length] = ((i == 0) ? '&message' : '&m' + i);
			s[s.length] = '=';
			s[s.length] = msgs[i].message;
			s[s.length] = ((i == 0) ? '&type' : '&t' + i);
			s[s.length] = '=';
			s[s.length] = msgs[i].messageType;
		}
		return s.join('');
	}
	
	// add clientId to data if it exists, before passing data to ajax connection adapter.
	var addClientId = function( data ) {
		var output = data || '';
		if( clientId ) {
			if( output.length > 0 ) {
				output += '&';
			}
			output += 'clientId='+clientId;
		}
		return output;
	}

	return {
		// optional clientId can be supplied to allow multiple clients (browser windows) within the same session.
		init : function(options) {
			connectStatusHandler = options.connectStatusHandler || function(connected){};
			uri = options.uri || '/amq';
			pollDelay = typeof options.pollDelay == 'number' ? options.pollDelay : 0;
			timeout = typeof options.timeout == 'number' ? options.timeout : 25;
			logging = options.logging;
			sessionInitializedCallback = options.sessionInitializedCallback
			clientId = options.clientId;
			adapter.init(options);
			sendPoll();
			
		},
		    
		startBatch : function() {
			batchInProgress = true;
		},

		endBatch : function() {
			if (messageQueue.length > 0) {
				var messagesToSend = [];
				var messagesToQueue = [];
				var outgoingHeaders = null;
				
				// we need to ensure that messages which set headers are sent by themselves.
				// if 2 'listen' messages were sent together, and a 'selector' header were added to one of them,
				// AMQ would add the selector to both 'listen' commands.
				for(i=0;i<messageQueue.length;i++) {
					// a message with headers should always be sent by itself.	if other messages have been added, send this one later.
					if ( messageQueue[ i ].headers && messagesToSend.length == 0 ) {
						messagesToSend[ messagesToSend.length ] = messageQueue[ i ].message;
						outgoingHeaders = messageQueue[ i ].headers;
					} else if ( ! messageQueue[ i ].headers && ! outgoingHeaders ) {
						messagesToSend[ messagesToSend.length ] = messageQueue[ i ].message;
					} else {
						messagesToQueue[ messagesToQueue.length ] = messageQueue[ i ];
					}
				}
				var body = buildParams(messagesToSend);
				messageQueue = messagesToQueue;
				org.activemq.Amq.startBatch();
				adapter.ajax(uri, {
					method: 'post',
					headers: outgoingHeaders,
					data: addClientId( body ),
					success: org.activemq.Amq.endBatch, 
					error: errorHandler});
			} else {
				batchInProgress = false;
			}
		},

		// Send a JMS message to a destination (eg topic://MY.TOPIC).  Message
		// should be xml or encoded xml content.
		sendMessage : function(destination, message) {
			sendJmsMessage(destination, message, 'send');
		},

		// Listen on a channel or topic.
		// handler must be a function taking a message argument
		//
		// Supported options:
		//  selector: If supplied, it should be a SQL92 string like "property-name='value'"
		//            http://activemq.apache.org/selectors.html
		//
		// Example: addListener( 'handler', 'topic://test-topic', function(msg) { return msg; }, { selector: "property-name='property-value'" } )
		addListener : function(id, destination, handler, options) {
			messageHandlers[id] = handler;
			var headers = options && options.selector ? {selector:options.selector} : null;
			sendJmsMessage(destination, id, 'listen', headers);
		},

		// remove Listener from channel or topic.
		removeListener : function(id, destination) {
			messageHandlers[id] = null;
			sendJmsMessage(destination, id, 'unlisten');
		},
		
		// for unit testing
		getMessageQueue: function() {
			return messageQueue;
		},
		testPollHandler: function( data ) {
			return pollHandler( data );
		}
	};
}();
