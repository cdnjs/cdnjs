/*
 * (C) Copyright 2014 Mock Service Layer Contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */

/**
 **
 ** Test Library to be used in conjunction with web-server.js
 **
 **/


/**
 * Method to register mock response. Once you register, whenever server receives a request matching
 * the registered requestPath, it will respond with a fake response
 *
 * @param server => url of web-server.js running on node
 * @param port => port number of web-server.js running on node
 * @param configurations => Json object that contains the requestPath, contentType, responseText, delayTime, headers, function.
 **/
setMockRespond = function(server, port, configurations)
{
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
	
	if(configurations['eval'] !== undefined && typeof configurations['eval'] === 'function')
	{
		configurations['eval'] = configurations['eval'].toString();
	}
	
    xmlHttp.open( 'POST', 'http://' + server + ':' + port + '/mock/fakerespond', false );
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(configurations));
}


/**
 * Method to register a template to be used when mocking responses. Once registered, pass the same id 
 * used to register the template along with a map containing the key-value pairs that are to be replaced.
 *
 * @param server => url of web-server.js running on node
 * @param port => port number of web-server.js running on node
 * @param template => a template in the form of a string 
 * @param id => the id to be used as a key for the template which is used when setting a fake response
 *
 **/
registerTemplate = function(server, port, template, id)
{
	var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();

	var body = {};
    body.template= template;
    body.id = id;
	
    xmlHttp.open( 'POST', 'http://' + server + ':' + port + '/mock/template', false );
    xmlHttp.setRequestHeader('Content-Type', 'application/json');

    xmlHttp.send(JSON.stringify(body));
}

/**
 * Method to register intercept XHR. Once you register, whenever server receives a request matching
 * the registered requestPath, it will intercept and store for later retrieval
 *
 * @param server => url of web-server.js running on node
 * @param port => port number of web-server.js running on node
 * @param requestPath => path which you want to intercept.
 *
 **/
setInterceptXHR = function(server, port, requestPath)
{
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
	
	var body = {};
    body.requestPath= requestPath;

    xmlHttp.open( 'POST', 'http://' + server + ':' + port + '/mock/interceptxhr', false );
    xmlHttp.setRequestHeader('Content-Type', 'application/json');

    xmlHttp.send(JSON.stringify(body));
}

/**
 * Method to retrieve intercepted XHRs. Use in conjunction with setInterceptXHR()
 *
 * @param server => url of web-server.js running on node
 * @param port => port number of web-server.js running on node
 * @param requestPath => path which you have intercepted.
 * @param callback => method to call to validate. responseText will be provided to callback
 *                    responseText is an object containing the following:
 *                          {xhr_1={obj1, obj2..}, xhr_2={obj1, obj2..}...}
 *                              where obj#={xhr,post}.
 *                              xhr will have url obj, method type, and body
 *
 **/
getInterceptedXHR = function(server, port, requestPath, callback)
{
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
	
	var body = {};
    body.requestPath= requestPath;

    xmlHttp.open( 'POST', 'http://' + server + ':' + port + '/mock/getinterceptedxhr', false );
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status==200) {
            callback(xmlHttp.responseText);
        }
    }

    xmlHttp.send(JSON.stringify(body));

}

/**
 * Method to set up parameters that will be ignored in the URL.
 *  *
 * @param server => url of web-server.js running on node
 * @param port => port number of web-server.js running on node
 * @param params => parameters that will be ignored in the app URL, type is string. 
 *                  For example,if we set ignore paramB, URL http://aa.bb.com/result?paramA=123&paramB=456 will be treated as http://aa.bb.com/result?paramA=123
 **/
setParamIgnored = function(server, port, params)
{
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();

	var body = {};
    body.requestPath= params;
	
    xmlHttp.open( 'POST', 'http://' + server + ':' + port + '/setIgnoreFlag', false );
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(body));
}

/**
 * Method to delete registered mock response.
 *  *
 * @param server => url of web-server.js running on node
 * @param port => port number of web-server.js running on node
 * @param requestPath => mock response path that needs to be deleted, if empty then delete all the registered mock responses.
 **/
unRegisterMock = function(server, port, requestPath)
{
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
	
	var body = {};
    body.requestPath= requestPath;

    xmlHttp.open( 'POST', 'http://' + server + ':' + port + '/unregisterMock', false );
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(body));
}
