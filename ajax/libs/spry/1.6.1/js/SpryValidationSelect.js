// SpryValidationSelect.js - version 0.10 - Spry Pre-Release 1.6.1
//
// Copyright (c) 2006. Adobe Systems Incorporated.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//   * Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//   * Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//   * Neither the name of Adobe Systems Incorporated nor the names of its
//     contributors may be used to endorse or promote products derived from this
//     software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

var Spry;
if (!Spry) Spry = {};
if (!Spry.Widget) Spry.Widget = {};

Spry.Widget.ValidationSelect = function(element, opts)
{
	this.init(element);

	Spry.Widget.Utils.setOptions(this, opts);

	// set validateOn flags
	var validateOn = ['submit'].concat(this.validateOn || []);
	validateOn = validateOn.join(",");
	this.validateOn = 0 | (validateOn.indexOf('submit') != -1 ? Spry.Widget.ValidationSelect.ONSUBMIT : 0);
	this.validateOn = this.validateOn | (validateOn.indexOf('blur') != -1 ? Spry.Widget.ValidationSelect.ONBLUR : 0);
	this.validateOn = this.validateOn | (validateOn.indexOf('change') != -1 ? Spry.Widget.ValidationSelect.ONCHANGE : 0);

	if (this.additionalError)
		this.additionalError = this.getElement(this.additionalError);

	// Unfortunately in some browsers like Safari, the Stylesheets our
	// page depends on may not have been loaded at the time we are called.
	// This means we have to defer attaching our behaviors until after the
	// onload event fires, since some of our behaviors rely on dimensions
	// specified in the CSS.

	if (Spry.Widget.ValidationSelect.onloadDidFire)
		this.attachBehaviors();
	else 
		Spry.Widget.ValidationSelect.loadQueue.push(this);
};

Spry.Widget.ValidationSelect.ONCHANGE = 1;
Spry.Widget.ValidationSelect.ONBLUR = 2;
Spry.Widget.ValidationSelect.ONSUBMIT = 4;

Spry.Widget.ValidationSelect.prototype.init = function(element)
{
	this.element = this.getElement(element);
	this.additionalError = false;
	this.selectElement = null;
	this.form = null;
	this.event_handlers = [];
	
	 // this.element can be either the container (<span>)
	 // or the <select> element, when no error messages are used.
	
	this.requiredClass = "selectRequiredState";
	this.invalidClass = "selectInvalidState";
	this.focusClass = "selectFocusState";
	this.validClass = "selectValidState";
	
	this.emptyValue = "";
	this.invalidValue = null;
	this.isRequired = true;
	
	this.validateOn = ["submit"];  // change, blur, submit
	// flag used to avoid cascade validation when both 
	// onChange and onBlur events are used to trigger validation
	this.validatedByOnChangeEvent = false;
};

Spry.Widget.ValidationSelect.prototype.destroy = function() {
	if (this.event_handlers)
		for (var i=0; i<this.event_handlers.length; i++) {
			Spry.Widget.Utils.removeEventListener(this.event_handlers[i][0], this.event_handlers[i][1], this.event_handlers[i][2], false);
		}
	try { delete this.element; } catch(err) {}
	try { delete this.selectElement; } catch(err) {}
	try { delete this.form; } catch(err) {}
	try { delete this.event_handlers; } catch(err) {}

	var q = Spry.Widget.Form.onSubmitWidgetQueue;
	var qlen = q.length;
	for (var i = 0; i < qlen; i++) {
		if (q[i] == this) {
			q.splice(i, 1);
			break;
		}
	}
};

Spry.Widget.ValidationSelect.onloadDidFire = false;
Spry.Widget.ValidationSelect.loadQueue = [];

Spry.Widget.ValidationSelect.prototype.getElement = function(ele)
{
	if (ele && typeof ele == "string")
		return document.getElementById(ele);
	return ele;
};

Spry.Widget.ValidationSelect.processLoadQueue = function(handler)
{
	Spry.Widget.ValidationSelect.onloadDidFire = true;
	var q = Spry.Widget.ValidationSelect.loadQueue;
	var qlen = q.length;
	for (var i = 0; i < qlen; i++)
		q[i].attachBehaviors();
};

Spry.Widget.ValidationSelect.addLoadListener = function(handler)
{
	if (typeof window.addEventListener != 'undefined')
		window.addEventListener('load', handler, false);
	else if (typeof document.addEventListener != 'undefined')
		document.addEventListener('load', handler, false);
	else if (typeof window.attachEvent != 'undefined')
		window.attachEvent('onload', handler);
};

Spry.Widget.ValidationSelect.addLoadListener(Spry.Widget.ValidationSelect.processLoadQueue);
Spry.Widget.ValidationSelect.addLoadListener(function(){
	Spry.Widget.Utils.addEventListener(window, "unload", Spry.Widget.Form.destroyAll, false);
});

Spry.Widget.ValidationSelect.prototype.attachBehaviors = function()
{
	// find the SELECT element inside current container
	if (this.element.nodeName == "SELECT") {
		this.selectElement = this.element;
	} else {
		this.selectElement = Spry.Widget.Utils.getFirstChildWithNodeNameAtAnyLevel(this.element, "SELECT");
	}

	if (this.selectElement) {
		var self = this;
		this.event_handlers = [];
		// focus
		// attach on beforeactivate instead of focus for
		//      - IE 6 (to overcome this bug: setting a class name onfocus does not affect the open dropdown)
		//      - IE 7 (to overcome this bug: setting a class name, closes the select)
		var focusEventName = "focus";
		var ua = navigator.userAgent.match(/msie (\d+)\./i);
		if (ua) {
			ua = parseInt(ua[1], 10);
			if (ua >= 6) {
				focusEventName = "beforeactivate";
			}
		}
		this.event_handlers.push([this.selectElement, focusEventName, function(e) { if (self.isDisabled()) return true; return self.onFocus(e); }]);
		// blur
		this.event_handlers.push([this.selectElement, "blur", function(e) { if (self.isDisabled()) return true; return self.onBlur(e); }]);
		// change
		if (this.validateOn & Spry.Widget.ValidationSelect.ONCHANGE) {
			this.event_handlers.push([this.selectElement, "change", function(e) { if (self.isDisabled()) return true; return self.onChange(e); }]);
			this.event_handlers.push([this.selectElement, "keypress", function(e) { if (self.isDisabled()) return true; return self.onChange(e); }]);
		}

		for (var i=0; i<this.event_handlers.length; i++) {
			Spry.Widget.Utils.addEventListener(this.event_handlers[i][0], this.event_handlers[i][1], this.event_handlers[i][2], false);
		}

		// submit
		this.form = Spry.Widget.Utils.getFirstParentWithNodeName(this.selectElement, "FORM");
		if (this.form) {
			// if no "onSubmit" handler has been attached to the current form, attach one
			if (!this.form.attachedSubmitHandler && !this.form.onsubmit) {
				this.form.onsubmit = function(e) { e = e || event; return Spry.Widget.Form.onSubmit(e, e.srcElement || e.currentTarget) };
				this.form.attachedSubmitHandler = true;                 
			}
			if (!this.form.attachedResetHandler) {
				Spry.Widget.Utils.addEventListener(this.form, "reset", function(e) { e = e || event; return Spry.Widget.Form.onReset(e, e.srcElement || e.currentTarget) }, false);
				this.form.attachedResetHandler = true;                 
			}
			// add the currrent widget to the "onSubmit" check queue;
			Spry.Widget.Form.onSubmitWidgetQueue.push(this);
		}
	}
};


Spry.Widget.ValidationSelect.prototype.addClassName = function(ele, className)
{
	if (!ele || !className || (ele.className && ele.className.search(new RegExp("\\b" + className + "\\b")) != -1))
		return;
	ele.className += (ele.className ? " " : "") + className;
};

Spry.Widget.ValidationSelect.prototype.removeClassName = function(ele, className)
{
	if (!ele || !className || (ele.className && ele.className.search(new RegExp("\\b" + className + "\\b")) == -1))
		return;
	ele.className = ele.className.replace(new RegExp("\\s*\\b" + className + "\\b", "g"), "");
};



Spry.Widget.ValidationSelect.prototype.onFocus = function(e)
{
	this.hasFocus = true;
	this.validatedByOnChangeEvent = false;
	this.addClassName(this.element, this.focusClass);
	this.addClassName(this.additionalError, this.focusClass);
};

Spry.Widget.ValidationSelect.prototype.onBlur = function(e)
{
	this.hasFocus = false;
	var doValidation = false;
	if (this.validateOn & Spry.Widget.ValidationSelect.ONBLUR)
		doValidation = true;
	if (doValidation && !this.validatedByOnChangeEvent)
		this.validate();
	this.removeClassName(this.element, this.focusClass);
	this.removeClassName(this.additionalError, this.focusClass);
};

Spry.Widget.ValidationSelect.prototype.onChange = function(e)
{
	this.hasFocus = false;
	this.validate();
	this.validatedByOnChangeEvent = true;
};

Spry.Widget.ValidationSelect.prototype.reset = function() {
	this.removeClassName(this.element, this.requiredClass);
	this.removeClassName(this.element, this.invalidClass);
	this.removeClassName(this.element, this.validClass);
	this.removeClassName(this.additionalError, this.requiredClass);
	this.removeClassName(this.additionalError, this.invalidClass);
	this.removeClassName(this.additionalError, this.validClass);
};

Spry.Widget.ValidationSelect.prototype.validate = function() {
	this.reset();
	// check isRequired
	if (this.isRequired) {
		// there are no options, or no option has been selected
		if (this.selectElement.options.length == 0 || this.selectElement.selectedIndex == -1) {
			this.addClassName(this.element, this.requiredClass);
			this.addClassName(this.additionalError, this.requiredClass);
			return false;
		}
		// the current selected option has no "value" attribute
		// when no value is set, browsers implement different behaviour for the value property
		// IE: value = blank string ("")
		// FF, Opera: value = option text
		if (this.selectElement.options[this.selectElement.selectedIndex].getAttribute("value") == null) {
			this.addClassName(this.element, this.requiredClass);
			this.addClassName(this.additionalError, this.requiredClass);
			return false;
		}
		// the current selected option has blank string ("") value
		if (this.selectElement.options[this.selectElement.selectedIndex].value == this.emptyValue) {
			this.addClassName(this.element, this.requiredClass);
			this.addClassName(this.additionalError, this.requiredClass);
			return false;
		}
		// the current selected option has "disabled" attribute
		// IE 6 allows to select such options
		if (this.selectElement.options[this.selectElement.selectedIndex].disabled) {
			this.addClassName(this.element, this.requiredClass);
			this.addClassName(this.additionalError, this.requiredClass);
			return false;
		}
	}
	if (this.invalidValue) {
		if (this.selectElement.options.length > 0 && 
			this.selectElement.selectedIndex != -1 &&
			this.selectElement.options[this.selectElement.selectedIndex].value == this.invalidValue) {
			this.addClassName(this.element, this.invalidClass);
			this.addClassName(this.additionalError, this.invalidClass);
			return false;
		}
	}
	this.addClassName(this.element, this.validClass);
	this.addClassName(this.additionalError, this.validClass);
	return true;
};

Spry.Widget.ValidationSelect.prototype.isDisabled = function() {
	return this.selectElement.disabled;	
};

//////////////////////////////////////////////////////////////////////
//
// Spry.Widget.Form - common for all widgets
//
//////////////////////////////////////////////////////////////////////

if (!Spry.Widget.Form) Spry.Widget.Form = {};
if (!Spry.Widget.Form.onSubmitWidgetQueue) Spry.Widget.Form.onSubmitWidgetQueue = [];

if (!Spry.Widget.Form.validate) {
	Spry.Widget.Form.validate = function(vform) {
		var isValid = true;
		var isElementValid = true;
		var q = Spry.Widget.Form.onSubmitWidgetQueue;
		var qlen = q.length;
		for (var i = 0; i < qlen; i++) {
			if (!q[i].isDisabled() && q[i].form == vform) {
				isElementValid = q[i].validate();
				isValid = isElementValid && isValid;
			}
		}
		return isValid;
	}
};

if (!Spry.Widget.Form.onSubmit) {
	Spry.Widget.Form.onSubmit = function(e, form)
	{
		if (Spry.Widget.Form.validate(form) == false) {
			return false;
		}
		return true;
	};
};

if (!Spry.Widget.Form.onReset) {
	Spry.Widget.Form.onReset = function(e, vform)
	{
		var q = Spry.Widget.Form.onSubmitWidgetQueue;
		var qlen = q.length;
		for (var i = 0; i < qlen; i++) {
			if (!q[i].isDisabled() && q[i].form == vform && typeof(q[i].reset) == 'function') {
				q[i].reset();
			}
		}
		return true;
	};
};

if (!Spry.Widget.Form.destroy) {
	Spry.Widget.Form.destroy = function(form)
	{
		var q = Spry.Widget.Form.onSubmitWidgetQueue;
		for (var i = 0; i < Spry.Widget.Form.onSubmitWidgetQueue.length; i++) {
			if (q[i].form == form && typeof(q[i].destroy) == 'function') {
				q[i].destroy();
				i--;
			}
		}
	}
};

if (!Spry.Widget.Form.destroyAll) {
	Spry.Widget.Form.destroyAll = function()
	{
		var q = Spry.Widget.Form.onSubmitWidgetQueue;
		for (var i = 0; i < Spry.Widget.Form.onSubmitWidgetQueue.length; i++) {
			if (typeof(q[i].destroy) == 'function') {
				q[i].destroy();
				i--;
			}
		}
	}
};

//////////////////////////////////////////////////////////////////////
//
// Spry.Widget.Utils
//
//////////////////////////////////////////////////////////////////////

if (!Spry.Widget.Utils)	Spry.Widget.Utils = {};

Spry.Widget.Utils.setOptions = function(obj, optionsObj, ignoreUndefinedProps)
{
	if (!optionsObj)
		return;
	for (var optionName in optionsObj)
	{
		if (ignoreUndefinedProps && optionsObj[optionName] == undefined)
			continue;
		obj[optionName] = optionsObj[optionName];
	}
};


Spry.Widget.Utils.getFirstChildWithNodeNameAtAnyLevel = function(node, nodeName)
{
	var elements  = node.getElementsByTagName(nodeName);
	if (elements) {
		return elements[0];
	}
	return null;
};

Spry.Widget.Utils.getFirstParentWithNodeName = function(node, nodeName)
{
	while (node.parentNode
			&& node.parentNode.nodeName.toLowerCase() != nodeName.toLowerCase()
			&& node.parentNode.nodeName != 'BODY') {
		node = node.parentNode;
	}

	if (node.parentNode && node.parentNode.nodeName.toLowerCase() == nodeName.toLowerCase()) {
		return node.parentNode;
	} else {
		return null;
	}
};

Spry.Widget.Utils.destroyWidgets = function (container)
{
	if (typeof container == 'string') {
		container = document.getElementById(container);
	}

	var q = Spry.Widget.Form.onSubmitWidgetQueue;
	for (var i = 0; i < Spry.Widget.Form.onSubmitWidgetQueue.length; i++) {
		if (typeof(q[i].destroy) == 'function' && Spry.Widget.Utils.contains(container, q[i].element)) {
			q[i].destroy();
			i--;
		}
	}
};

Spry.Widget.Utils.contains = function (who, what)
{
	if (typeof who.contains == 'object') {
		return what && who && (who == what || who.contains(what));
	} else {
		var el = what;
		while(el) {
			if (el == who) {
				return true;
			}
			el = el.parentNode;
		}
		return false;
	}
};

Spry.Widget.Utils.addEventListener = function(element, eventType, handler, capture)
{
	try
	{
		if (element.addEventListener)
			element.addEventListener(eventType, handler, capture);
		else if (element.attachEvent)
			element.attachEvent("on" + eventType, handler, capture);
	}
	catch (e) {}
};

Spry.Widget.Utils.removeEventListener = function(element, eventType, handler, capture)
{
	try
	{
		if (element.removeEventListener)
			element.removeEventListener(eventType, handler, capture);
		else if (element.detachEvent)
			element.detachEvent("on" + eventType, handler, capture);
	}
	catch (e) {}
};


