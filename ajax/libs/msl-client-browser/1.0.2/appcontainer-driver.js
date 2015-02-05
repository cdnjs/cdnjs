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
 ** Library to be used to drive the iframe containing the app running on msl-server.
 ** This library requires jquery (1.11.0+)
 **
 **/

/**
 * Creates an iframe inside the current DOM and opens the app via url
 *
 * @param url => url of the app running on msl-server
 **/
openApp = function(url) {
  if($('#mslappcontainer').length <= 0) {
    $("body").append('<div id="mslappcontainerdiv"><iframe id="mslappcontainer" name="mslappcontainer" style="width:100%; height:800px; border:0;" src=""></iframe></div>');
  }
  $('#mslappcontainer').attr('src', url);
}

/**
 * Returns the iframe element 
 *
 **/
getApp = function() {
  checkAppContainerReady();
  return $('#mslappcontainer');
}

/**
 * Returns the element inside the iframe via locator string accepted by jquery
 *
 * @param elementLoc => locator string which can be interpreted by jquery
 * @return element
 **/
getElemFromApp = function(elementLoc) {
  checkAppContainerReady();
  return getApp().contents().find(elementLoc);
}

/**
 * Triggers an event on an element inside the iframe
 *
 * @param elementLoc => locator string which can be interpreted by jquery
 * @param event => event to trigger (event must match the exact method name from jquery without parameters. e.g. keydown()) 
 **/
triggerEventOnApp = function(elementLoc, event) {
  checkAppContainerReady();
  window.frames['mslappcontainer'].eval('$("' + elementLoc + '").' + event + '()');
}

/**
 * Returns the text of an element inside the iframe
 * 
 * @param elementLoc => locator string which can be interpreted by jquery
 * @return text
 **/
getTextFromApp = function(elementLoc) {
  checkAppContainerReady();
  return window.frames['mslappcontainer'].eval('$("' + elementLoc + '").text()');
}

/**
 * Checks whether the iframe exists.  If not, it throws an error.
 *
 **/
checkAppContainerReady = function() {
  if($('#mslappcontainer').length <= 0) {
    throw new Error('App container is not ready.  Please call openApp() first!');
  }  
}

/**
 * Executes eval inside the iframe
 *
 * @param eval => js to evaluate inside iframe
 * @return return value resulting from the execution of eval
 **/
evalOnApp = function(eval) {
  checkAppContainerReady();
  return window.frames['mslappcontainer'].eval(eval);
}
