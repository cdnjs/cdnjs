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

// AMQ Ajax Adapter for Prototype
// This class provides an adapter interface for the prototype library to perform
// some of the library-dependent tasks...namely logging and ajax.

var org = org || {};
org.activemq = org.activemq || {};

org.activemq.AmqAdapter = {

	init: function(options) {
	},

/**
 *  Implement this method to make an AJAX call to the AjaxServlet. An
 *  options object will accompany this class and will contain the properties
 *  that describe the details of the AJAX call. The options object will
 *  have the following properties:
 *
 *  - method:  'get' or 'post'
 *  - data:    query data to accompany the post or get.
 *  - success: A callback function that is invoked upon successful
 *             completion of the AJAX call. The parameter is:
 *             - data: The result of the AJAX call. In the case of XML
 *                     data should resolve to a Document element.
 *  - error:   A callback when some type of error occurs. The callback
 *             function's parameters should be:
 *             - xhr:    The XmlHttpRequest object.
 *             - status: A text string of the status.
 *             - ex:     The exception that caused the error.
 *  - headers: An object containing additional headers for the ajax request.
 */
	ajax: function(uri, options) {
		request = {
			onSuccess: options.success ? function(xhr, header) {
				if (options.success) {
					var ct = xhr.getResponseHeader("content-type");
					var xml = ct && ct.indexOf("xml") >= 0;
					var data = xml ? xhr.responseXML : xhr.responseText;
					options.success(data);
				}
			} : function() {},
			onFailure: options.error || function() {
			},
			onException: options.error || function() {
			}
		}
		
		if( options.headers ) {
			request.requestHeaders = options.headers;
		}
		
		if (options.method == 'post') {
			request.postBody = options.data;
		} else {
			request.parameters = options.data;
			request.method = 'get';
		}
		
		new Ajax.Request( uri, request );
	},

	log: function(message, exception) {
		if (typeof console != 'undefined' && console.log) console.log(message);
	}

};
