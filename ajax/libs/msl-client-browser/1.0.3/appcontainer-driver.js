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
 * @return Element object
 **/
getElement = function(elementLoc) {
  checkAppContainerReady();
  return new Element(elementLoc);
}

/* 
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
doEval = function(eval) {
  checkAppContainerReady();
  return window.frames['mslappcontainer'].eval(eval);
}

function Element(locator) {
  this.locator = locator;
}

/*****************/
/** Text Events **/
/*****************/
Element.prototype.val = function(str) {
  if(str != undefined) {
    window.frames['mslappcontainer'].eval('$("' + this.locator + '").val("' + str + '")');
  }else {
    return window.frames['mslappcontainer'].eval('$("' + this.locator + '").val()');
  }
}

Element.prototype.text = function() {
  return window.frames['mslappcontainer'].eval('$("' + this.locator + '").text()');
}

/*********************/
/** Keyboard Events **/
/*********************/
Element.prototype.keydown = function() {
  window.frames['mslappcontainer'].eval('$("' + this.locator + '").keydown()');
}

Element.prototype.keypress = function() {
  window.frames['mslappcontainer'].eval('$("' + this.locator + '").keypress()');
}

Element.prototype.keyup = function() {
  window.frames['mslappcontainer'].eval('$("' + this.locator + '").keyup()');
}

/******************/
/** Mouse Events **/
/******************/
Element.prototype.click = function() {
  window.frames['mslappcontainer'].eval('$("' + this.locator + '").click()');
}

Element.prototype.dblclick = function() {
  window.frames['mslappcontainer'].eval('$("' + this.locator + '").dblclick()');
}

Element.prototype.focusout = function() {
  window.frames['mslappcontainer'].eval('$("' + this.locator + '").focusout()');
}

Element.prototype.hover = function() {
  window.frames['mslappcontainer'].eval('$("' + this.locator + '").hover()');
}

Element.prototype.mousedown = function() {
  window.frames['mslappcontainer'].eval('$("' + this.locator + '").mousedown()');
}

Element.prototype.mouseenter = function() {
  window.frames['mslappcontainer'].eval('$("' + this.locator + '").mouseenter()');
}

Element.prototype.mouseleave = function() {
  window.frames['mslappcontainer'].eval('$("' + this.locator + '").mouseleave()');
}

Element.prototype.mousemove = function() {
  window.frames['mslappcontainer'].eval('$("' + this.locator + '").mousemove()');
}

Element.prototype.mouseout = function() {
  window.frames['mslappcontainer'].eval('$("' + this.locator + '").mouseout()');
}

Element.prototype.mouseover = function() {
  window.frames['mslappcontainer'].eval('$("' + this.locator + '").mouseover()');
}

Element.prototype.mouseup = function() {
  window.frames['mslappcontainer'].eval('$("' + this.locator + '").mouseup()');
}

Element.prototype.toggle = function() {
  window.frames['mslappcontainer'].eval('$("' + this.locator + '").toggle()');
}

Element.prototype.size = function() {
  return window.frames['mslappcontainer'].eval('$("' + this.locator + '").size()');
}
