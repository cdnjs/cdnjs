// SpryValidation.js - Spry Pre-Release 1.6.1
// 
// Combined Spry Validation scripts from Adobe's Github Repo for inclusion on CDNJS.com
// From: https://github.com/adobe/Spry.git
// Issues: https://github.com/thetrickster/Spry/issues
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

Spry.Widget.BrowserSniff = function()
{
	var b = navigator.appName.toString();
	var up = navigator.platform.toString();
	var ua = navigator.userAgent.toString();

	this.mozilla = this.ie = this.opera = this.safari = false;
	var re_opera = /Opera.([0-9\.]*)/i;
	var re_msie = /MSIE.([0-9\.]*)/i;
	var re_gecko = /gecko/i;
	var re_safari = /(applewebkit|safari)\/([\d\.]*)/i;
	var r = false;

	if ( (r = ua.match(re_opera))) {
		this.opera = true;
		this.version = parseFloat(r[1]);
	} else if ( (r = ua.match(re_msie))) {
		this.ie = true;
		this.version = parseFloat(r[1]);
	} else if ( (r = ua.match(re_safari))) {
		this.safari = true;
		this.version = parseFloat(r[2]);
	} else if (ua.match(re_gecko)) {
		var re_gecko_version = /rv:\s*([0-9\.]+)/i;
		r = ua.match(re_gecko_version);
		this.mozilla = true;
		this.version = parseFloat(r[1]);
	}
	this.windows = this.mac = this.linux = false;

	this.Platform = ua.match(/windows/i) ? "windows" :
					(ua.match(/linux/i) ? "linux" :
					(ua.match(/mac/i) ? "mac" :
					ua.match(/unix/i)? "unix" : "unknown"));
	this[this.Platform] = true;
	this.v = this.version;

	if (this.safari && this.mac && this.mozilla) {
		this.mozilla = false;
	}
};

Spry.is = new Spry.Widget.BrowserSniff();

Spry.Widget.ValidationCheckbox = function(element, opts)
{
	this.init(element);
	
	Spry.Widget.Utils.setOptions(this, opts);

	// set validateOn flags
	var validateOn = ['submit'].concat(this.validateOn || []);
	validateOn = validateOn.join(",");
	this.validateOn = 0 | (validateOn.indexOf('submit') != -1 ? Spry.Widget.ValidationCheckbox.ONSUBMIT : 0);
	this.validateOn = this.validateOn | (validateOn.indexOf('blur') != -1 ? Spry.Widget.ValidationCheckbox.ONBLUR : 0);
	this.validateOn = this.validateOn | (validateOn.indexOf('change') != -1 ? Spry.Widget.ValidationCheckbox.ONCHANGE : 0);
	
	// sanity checks
	if (!isNaN(this.minSelections)) {
		this.minSelections = (this.minSelections > 0)? parseInt(this.minSelections, 10): null;
	}
	if (!isNaN(this.maxSelections)) {
		this.maxSelections = (this.maxSelections > 0)? parseInt(this.maxSelections, 10): null;
	}

	if (this.additionalError)
		this.additionalError = this.getElement(this.additionalError);
	// Unfortunately in some browsers like Safari, the Stylesheets our
	// page depends on may not have been loaded at the time we are called.
	// This means we have to defer attaching our behaviors until after the
	// onload event fires, since some of our behaviors rely on dimensions
	// specified in the CSS.

	if (Spry.Widget.ValidationCheckbox.onloadDidFire)
		this.attachBehaviors();
	else 
		Spry.Widget.ValidationCheckbox.loadQueue.push(this);
};

Spry.Widget.ValidationCheckbox.ONCHANGE = 1;
Spry.Widget.ValidationCheckbox.ONBLUR = 2;
Spry.Widget.ValidationCheckbox.ONSUBMIT = 4;

Spry.Widget.ValidationCheckbox.prototype.init = function(element)
{
	this.element = this.getElement(element);
	this.checkboxElements = null;
	this.additionalError = false;
	this.form = null;
	this.event_handlers = [];
	
	 // this.element can be either the container (<span>)
	 // or the <input type="checkbox"> element, when no error messages are used.
	this.hasFocus = false;
	this.requiredClass = "checkboxRequiredState";
	this.minSelectionsClass = "checkboxMinSelectionsState";
	this.maxSelectionsClass = "checkboxMaxSelectionsState";
	this.focusClass = "checkboxFocusState";
	this.validClass = "checkboxValidState";
	
	this.isRequired = true;
	
	this.minSelections = null;
	this.maxSelections = null;
	
	this.validateOn = ["submit"];  // change, submit (blur ?)
};

Spry.Widget.ValidationCheckbox.prototype.destroy = function() {
	if (this.event_handlers)
		for (var i=0; i<this.event_handlers.length; i++)
		{
			Spry.Widget.Utils.removeEventListener(this.event_handlers[i][0], this.event_handlers[i][1], this.event_handlers[i][2], false);
		}
	try { delete this.element; } catch(err) {}
	if (this.checkboxElements)
		for(var i=0; i<this.checkboxElements.length; i++)
		{
			try { delete this.checkboxElements[i];} catch(err) {}
		}
	try { delete this.checkboxElements; } catch(err) {}
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

Spry.Widget.ValidationCheckbox.onloadDidFire = false;
Spry.Widget.ValidationCheckbox.loadQueue = [];

Spry.Widget.ValidationCheckbox.prototype.getElement = function(ele)
{
	if (ele && typeof ele == "string")
		return document.getElementById(ele);
	return ele;
};

Spry.Widget.ValidationCheckbox.processLoadQueue = function(handler)
{
	Spry.Widget.ValidationCheckbox.onloadDidFire = true;
	var q = Spry.Widget.ValidationCheckbox.loadQueue;
	var qlen = q.length;
	for (var i = 0; i < qlen; i++)
		q[i].attachBehaviors();
};

Spry.Widget.ValidationCheckbox.addLoadListener = function(handler)
{
	if (typeof window.addEventListener != 'undefined')
		window.addEventListener('load', handler, false);
	else if (typeof document.addEventListener != 'undefined')
		document.addEventListener('load', handler, false);
	else if (typeof window.attachEvent != 'undefined')
		window.attachEvent('onload', handler);
};

Spry.Widget.ValidationCheckbox.addLoadListener(Spry.Widget.ValidationCheckbox.processLoadQueue);
Spry.Widget.ValidationCheckbox.addLoadListener(function(){
	Spry.Widget.Utils.addEventListener(window, "unload", Spry.Widget.Form.destroyAll, false);
});

Spry.Widget.ValidationCheckbox.prototype.attachBehaviors = function()
{
	if (!this.element)
		return;
	// find the INPUT type="checkbox" element(s) inside current container
	if (this.element.nodeName == "INPUT") {
		this.checkboxElements = [this.element];
	} else {
		this.checkboxElements = this.getCheckboxes();
	}
	if (this.checkboxElements) {
		var self = this;
		this.event_handlers = [];

		var qlen = this.checkboxElements.length;
		for (var i = 0; i < qlen; i++) {
			// focus
			this.event_handlers.push([this.checkboxElements[i], "focus", function(e) { return self.onFocus(e); }]);
			// blur
			this.event_handlers.push([this.checkboxElements[i], "blur", function(e) { return self.onBlur(e); }]);
			// add click instead of onChange
			if (this.validateOn & Spry.Widget.ValidationCheckbox.ONCHANGE) {
				this.event_handlers.push([this.checkboxElements[i], "click", function(e) { return self.onClick(e); }]);
			}
		}

		for (var i=0; i<this.event_handlers.length; i++) {
			Spry.Widget.Utils.addEventListener(this.event_handlers[i][0], this.event_handlers[i][1], this.event_handlers[i][2], false);
		}

		// submit
		this.form = Spry.Widget.Utils.getFirstParentWithNodeName(this.element, "FORM");
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

Spry.Widget.ValidationCheckbox.prototype.getCheckboxes = function() {
	var arrCheckboxes;
	var elements  = this.element.getElementsByTagName("INPUT");
	if (elements.length) {
		arrCheckboxes = [];
		var qlen = elements.length;
		for (var i = 0; i < qlen; i++) {
			if (elements[i].type == "checkbox") {
				arrCheckboxes.push(elements[i]);
			}
		}
		return arrCheckboxes;
	}
	return null;
};

Spry.Widget.ValidationCheckbox.prototype.addClassName = function(ele, className)
{
	if (!ele || !className || (ele.className && ele.className.search(new RegExp("\\b" + className + "\\b")) != -1))
		return;
	ele.className += (ele.className ? " " : "") + className;
};

Spry.Widget.ValidationCheckbox.prototype.removeClassName = function(ele, className)
{
	if (!ele || !className || (ele.className && ele.className.search(new RegExp("\\b" + className + "\\b")) == -1))
		return;
	ele.className = ele.className.replace(new RegExp("\\s*\\b" + className + "\\b", "g"), "");
};



Spry.Widget.ValidationCheckbox.prototype.onFocus = function(e)
{
	var eventCheckbox = (e.srcElement != null) ? e.srcElement : e.target;
 	if (eventCheckbox.disabled) return;
 	
	this.hasFocus = true;
	this.addClassName(this.element, this.focusClass);
	this.addClassName(this.additionalError, this.focusClass);
};

Spry.Widget.ValidationCheckbox.prototype.onBlur = function(e)
{
	var eventCheckbox = (e.srcElement != null) ? e.srcElement : e.target;
	if (eventCheckbox.disabled) return;
	
	this.hasFocus = false;
	var doValidation = false;
	if (this.validateOn & Spry.Widget.ValidationCheckbox.ONBLUR)
		doValidation = true;
	if (doValidation)
		this.validate();
	this.removeClassName(this.element, this.focusClass);
	this.removeClassName(this.additionalError, this.focusClass);
	
};

Spry.Widget.ValidationCheckbox.prototype.onClick = function(e) {
	var eventCheckbox = (e.srcElement != null) ? e.srcElement : e.target;
	if (eventCheckbox.disabled) return;
	
	this.validate();
};

Spry.Widget.ValidationCheckbox.prototype.reset = function() {
	this.removeClassName(this.element, this.validClass);
	this.removeClassName(this.element, this.requiredClass);
	this.removeClassName(this.element, this.minSelectionsClass);
	this.removeClassName(this.element, this.maxSelectionsClass);
	this.removeClassName(this.additionalError, this.validClass);
	this.removeClassName(this.additionalError, this.requiredClass);
	this.removeClassName(this.additionalError, this.minSelectionsClass);
	this.removeClassName(this.additionalError, this.maxSelectionsClass);
};

Spry.Widget.ValidationCheckbox.prototype.validate = function() {
	this.reset();

	var nochecked = 0;
	if (this.checkboxElements) {
		var qlen = this.checkboxElements.length;
		for (var i = 0; i < qlen; i++) {
			if (!this.checkboxElements[i].disabled && this.checkboxElements[i].checked) {
				nochecked++;
			}
		}
	}

	// check isRequired
	if (this.isRequired) {
		if (nochecked == 0) {
			this.addClassName(this.element, this.requiredClass);
			this.addClassName(this.additionalError, this.requiredClass);
			return false;
		}
	}
	if (this.minSelections) {
		if (this.minSelections > nochecked) {
			this.addClassName(this.element, this.minSelectionsClass);
			this.addClassName(this.additionalError, this.minSelectionsClass);
			return false;
		}
	}
	if (this.maxSelections) {
		if (this.maxSelections < nochecked) {
			this.addClassName(this.element, this.maxSelectionsClass);
			this.addClassName(this.additionalError, this.maxSelectionsClass);
			return false;
		}
	}
	this.addClassName(this.element, this.validClass);
	this.addClassName(this.additionalError, this.validClass);
	return true;
};

Spry.Widget.ValidationCheckbox.prototype.isDisabled = function() {
	var ret = true;
	if (this.checkboxElements) {
		var qlen = this.checkboxElements.length;
		for (var i = 0; i < qlen; i++) {
			if (!this.checkboxElements[i].disabled) {
				ret = false;
				break;
			}
		}
	}
	return ret;
};

Spry.Widget.ValidationConfirm = function(element, firstInput, options)
{
	options = Spry.Widget.Utils.firstValid(options, {});

	if (!this.isBrowserSupported())
		return;

	if (this.init(element, firstInput, options) === false)
		return false;

	var validateOn = ['submit'].concat(Spry.Widget.Utils.firstValid(this.options.validateOn, []));
	validateOn = validateOn.join(",");

	this.validateOn = 0;
	this.validateOn = this.validateOn | (validateOn.indexOf('submit') != -1 ? Spry.Widget.ValidationConfirm.ONSUBMIT : 0);
	this.validateOn = this.validateOn | (validateOn.indexOf('blur') != -1 ? Spry.Widget.ValidationConfirm.ONBLUR : 0);
	this.validateOn = this.validateOn | (validateOn.indexOf('change') != -1 ? Spry.Widget.ValidationConfirm.ONCHANGE : 0);

	if (Spry.Widget.ValidationConfirm.onloadDidFire)
		this.attachBehaviors();
	else
		Spry.Widget.ValidationConfirm.loadQueue.push(this);
};

Spry.Widget.ValidationConfirm.ONCHANGE = 1;
Spry.Widget.ValidationConfirm.ONBLUR = 2;
Spry.Widget.ValidationConfirm.ONSUBMIT = 4;

Spry.Widget.ValidationConfirm.prototype.init = function(element, firstInput, options)
{
	options = Spry.Widget.Utils.firstValid(options, []);
	this.options = [];
	this.element = this.getElement(element);
	if (!this.element)
	{
		this.showError('The element ' + (!element || element == ''?'to be validated is not defined!': (element + ' doesn\'t exists!')));
		return false;
	}
	else
	{
		if (this.element.nodeName.toUpperCase() == 'INPUT' && (typeof this.element.type == 'undefined' || ',RADIO,CHECKBOX,BUTTON,SUBMIT,IMAGE,'.indexOf(',' +this.element.type.toUpperCase +',') == -1 ))
		{
			this.input = this.element;
		}
		else
		{
			this.input = Spry.Widget.Utils.getFirstChildWithNodeNameAtAnyLevel(this.element, 'INPUT');
		}
	}
	if (!this.input)
	{
		this.showError('Element ' + element + ' doesn\'t contain any form input!');
		return false;
	}
	var elm = this.getElement(firstInput);
	this.firstInput = false;
	if (!elm)
	{
		this.showError('The element ' + (!firstInput || firstInput == ''?'that contains the value to be validated is not defined!': (firstInput + ' doesn\'t exists!')));
		return false;
	}
	if (elm.nodeName.toUpperCase() != 'INPUT')
	{
		this.firstInput = Spry.Widget.Utils.getFirstChildWithNodeNameAtAnyLevel(elm, 'INPUT');
	}
	else if (typeof elm.type == 'undefined' || ',RADIO,CHECKBOX,BUTTON,SUBMIT,IMAGE,'.indexOf(','+elm.type.toUpperCase()+',') == -1)
	{
		this.firstInput = elm;
	}
	if (!this.firstInput)
	{
		this.showError('Element '+firstInput + ' doesn\'t contain any form input!');
		return false;
	}

	this.event_handlers = [];

	this.validClass = "confirmValidState";
	this.focusClass = "confirmFocusState";
	this.requiredClass = "confirmRequiredState";
	this.invalidClass = "confirmInvalidState";

	options.isRequired = Spry.Widget.Utils.firstValid(options.isRequired, true);

	options.additionalError = Spry.Widget.Utils.firstValid(options.additionalError, false);
	if (options.additionalError)
		options.additionalError = this.getElement(options.additionalError);

	Spry.Widget.Utils.setOptions(this, options);
	Spry.Widget.Utils.setOptions(this.options, options);
};

Spry.Widget.ValidationConfirm.loadQueue = [];
Spry.Widget.ValidationConfirm.onloadDidFire = false;

Spry.Widget.ValidationConfirm.prototype.getElement = function(ele)
{
	if (ele && typeof ele == "string")
		 ele=document.getElementById(ele);
	return ele;
};

Spry.Widget.ValidationConfirm.processLoadQueue = function(handler)
{
	Spry.Widget.ValidationConfirm.onloadDidFire = true;
	var q = Spry.Widget.ValidationConfirm.loadQueue;
	var qlen = q.length;
	for (var i = 0; i < qlen; i++)
		q[i].attachBehaviors();
};
Spry.Widget.ValidationConfirm.addLoadListener = function(handler)
{
	if (typeof window.addEventListener != 'undefined')
		window.addEventListener('load', handler, false);
	else if (typeof document.addEventListener != 'undefined')
		document.addEventListener('load', handler, false);
	else if (typeof window.attachEvent != 'undefined')
		window.attachEvent('onload', handler);
};
Spry.Widget.ValidationConfirm.addLoadListener(Spry.Widget.ValidationConfirm.processLoadQueue);


Spry.Widget.ValidationConfirm.prototype.destroy = function()
{
	if (this.event_handlers){
		for (var i=0; i<this.event_handlers.length; i++)
			Spry.Widget.Utils.removeEventListener(this.event_handlers[i][0], this.event_handlers[i][1], this.event_handlers[i][2], false);
	}
	try { delete this.element;} catch(err) {};
	try { delete this.input;} catch(err) {};
	try { delete this.event_handlers;} catch(err) {};
	try { delete this.options;}catch(err) {};

	var q = Spry.Widget.Form.onSubmitWidgetQueue;
	var qlen = q.length;
	for (var i = 0; i < qlen; i++)
		if (q[i] == this)
		{
			q.splice(i, 1);
			break;
		}
};
Spry.Widget.ValidationConfirm.prototype.attachBehaviors = function()
{
	if (this.event_handlers && this.event_handlers.length > 0)
		return;

	var handlers = this.event_handlers;
	if (this.input)
	{
		var self = this;
		this.input.setAttribute("AutoComplete", "off");
		if (this.validateOn & Spry.Widget.ValidationConfirm.ONCHANGE)
		{
			var changeEvent = 
				Spry.is.mozilla || Spry.is.opera || Spry.is.safari?"input":
				Spry.is.ie?"propertychange":
				"change";
			handlers.push([this.input, changeEvent, function(e){if (self.isDisabled()) return true; return self.validate(e||event);}]);

			if (Spry.is.mozilla || Spry.is.safari)
				handlers.push([this.input, "dragdrop", function(e){if (self.isDisabled()) return true; return self.validate(e);}]);
			else if (Spry.is.ie)
				handlers.push([this.input, "drop", function(e){if (self.isDisabled()) return true; return self.validate(event);}]);
		}
		handlers.push([this.input, "blur", function(e) {if (self.isDisabled()) return true; return self.onBlur(e||event);}]);
		handlers.push([this.input, "focus", function(e) { if (self.isDisabled()) return true; return self.onFocus(e || event); }]);

		for (var i=0; i<this.event_handlers.length; i++)
			Spry.Widget.Utils.addEventListener(this.event_handlers[i][0], this.event_handlers[i][1], this.event_handlers[i][2], false);

		// submit
		this.form = Spry.Widget.Utils.getFirstParentWithNodeName(this.input, "FORM");
		if (this.form)
		{
			// if no "onSubmit" handler has been attached to the current form, attach one
			if (!this.form.attachedSubmitHandler && !this.form.onsubmit)
			{
				this.form.onsubmit = function(e) { e = e || event; return Spry.Widget.Form.onSubmit(e, e.srcElement || e.currentTarget) };
				this.form.attachedSubmitHandler = true;
			}
			if (!this.form.attachedResetHandler)
			{
				Spry.Widget.Utils.addEventListener(this.form, "reset", function(e) {var e = e || event; return Spry.Widget.Form.onReset(e, e.srcElement || e.currentTarget) }, false);
				this.form.attachedResetHandler = true;
			}
			// add the currrent widget to the "onSubmit" check queue;
			Spry.Widget.Form.onSubmitWidgetQueue.push(this);
		}
	}
};
Spry.Widget.ValidationConfirm.prototype.reset = function()
{
	this.switchClassName(this.element, '');
	this.switchClassName(this.additionalError, '');
	this.removeClassName(this.element, this.focusClass);
	this.removeClassName(this.additionalError, this.focusClass);
	if (Spry.is.ie)
	{
		this.input.forceFireFirstOnPropertyChange = true;
		this.input.removeAttribute("forceFireFirstOnPropertyChange");
	}
};

Spry.Widget.ValidationConfirm.prototype.validate = function(e)
{
	if (this.isRequired && this.input.value == '')
	{
		this.switchClassName(this.element, this.requiredClass);
		this.switchClassName(this.additionalError, this.requiredClass);
		return false;
	}
	if (this.input.value.length > 0 && this.input.value != this.firstInput.value)
	{
		this.switchClassName(this.element, this.invalidClass);
		this.switchClassName(this.additionalError, this.invalidClass);
		return false;
	}
	this.switchClassName(this.element, this.validClass);
	this.switchClassName(this.additionalError, this.validClass);
	return true;
};

Spry.Widget.ValidationConfirm.prototype.onBlur = function(e)
{
	this.removeClassName(this.element, this.focusClass);
	this.removeClassName(this.additionalError, this.focusClass);

	if (this.validateOn & Spry.Widget.ValidationConfirm.ONBLUR)
		this.validate(e);
};
Spry.Widget.ValidationConfirm.prototype.onFocus = function()
{
	this.addClassName(this.element, this.focusClass);
	this.addClassName(this.additionalError, this.focusClass);
};
Spry.Widget.ValidationConfirm.prototype.switchClassName = function(ele, className)
{
	var classes = [this.validClass, this.requiredClass, this.invalidClass];
	for (var i =0; i< classes.length; i++)
		this.removeClassName(ele, classes[i]);

	this.addClassName(ele, className);
};
Spry.Widget.ValidationConfirm.prototype.addClassName = function(ele, className)
{
	if (!ele || !className || (ele.className && ele.className.indexOf(className) != -1 && ele.className.search(new RegExp("\\b" + className + "\\b")) != -1))
		return;
	ele.className += (ele.className ? " " : "") + className;
};
Spry.Widget.ValidationConfirm.prototype.removeClassName = function(ele, className)
{
	if (!ele || !className || (ele.className && ele.className.indexOf(className) != -1 && ele.className.search(new RegExp("\\b" + className + "\\b")) == -1))
		return;
	ele.className = ele.className.replace(new RegExp("\\s*\\b" + className + "\\b", "g"), "");
};
Spry.Widget.ValidationConfirm.prototype.isBrowserSupported = function()
{
	return Spry.is.ie && Spry.is.v >= 5 && Spry.is.windows
		||
	Spry.is.mozilla && Spry.is.v >= 1.4
		||
	Spry.is.safari
		||
	Spry.is.opera && Spry.is.v >= 9;
};

Spry.Widget.ValidationConfirm.prototype.isDisabled = function()
{
	return this.input && (this.input.disabled || this.input.readOnly) || !this.input;
};
Spry.Widget.ValidationConfirm.prototype.showError = function(msg)
{
	alert('Spry.ValidationConfirm ERR: ' + msg);
};

Spry.Widget.ValidationRadio = function(element, opts)
{
	this.init(element);

	Spry.Widget.Utils.setOptions(this, opts);

	// set validateOn flags
	var validateOn = ['submit'].concat(this.validateOn || []);
	validateOn = validateOn.join(",");
	this.validateOn = 0 | (validateOn.indexOf('submit') != -1 ? Spry.Widget.ValidationRadio.ONSUBMIT : 0);
	this.validateOn = this.validateOn | (validateOn.indexOf('blur') != -1 ? Spry.Widget.ValidationRadio.ONBLUR : 0);
	this.validateOn = this.validateOn | (validateOn.indexOf('change') != -1 ? Spry.Widget.ValidationRadio.ONCHANGE : 0);

	if (this.additionalError)
		this.additionalError = this.getElement(this.additionalError);

	// Unfortunately in some browsers like Safari, the Stylesheets our
	// page depends on may not have been loaded at the time we are called.
	// This means we have to defer attaching our behaviors until after the
	// onload event fires, since some of our behaviors rely on dimensions
	// specified in the CSS.

	if (Spry.Widget.ValidationRadio.onloadDidFire)
		this.attachBehaviors();
	else 
		Spry.Widget.ValidationRadio.loadQueue.push(this);
};

Spry.Widget.ValidationRadio.ONCHANGE = 1;
Spry.Widget.ValidationRadio.ONBLUR = 2;
Spry.Widget.ValidationRadio.ONSUBMIT = 4;

Spry.Widget.ValidationRadio.prototype.init = function(element)
{
	this.element = this.getElement(element);
	this.additionalError = false;
	this.radioElements = null;
	this.form = null;
	this.event_handlers = [];
	
	 // this.element can be either the container (<span>)
	 // or the <input type="radio"> element, when no error messages are used.
	this.requiredClass = "radioRequiredState";
	this.focusClass = "radioFocusState";
	this.invalidClass = "radioInvalidState";
	this.validClass = "radioValidState";

	this.emptyValue = "";
	this.invalidValue = null;
	this.isRequired = true;
	this.validateOn = ["submit"]; // change, submit (blur ?)
};

Spry.Widget.ValidationRadio.onloadDidFire = false;
Spry.Widget.ValidationRadio.loadQueue = [];

Spry.Widget.ValidationRadio.prototype.getElement = function(ele)
{
	if (ele && typeof ele == "string")
		return document.getElementById(ele);
	return ele;
};

Spry.Widget.ValidationRadio.processLoadQueue = function(handler)
{
	Spry.Widget.ValidationRadio.onloadDidFire = true;
	var q = Spry.Widget.ValidationRadio.loadQueue;
	var qlen = q.length;
	for (var i = 0; i < qlen; i++)
		q[i].attachBehaviors();
};

Spry.Widget.ValidationRadio.addLoadListener = function(handler)
{
	if (typeof window.addEventListener != 'undefined')
		window.addEventListener('load', handler, false);
	else if (typeof document.addEventListener != 'undefined')
		document.addEventListener('load', handler, false);
	else if (typeof window.attachEvent != 'undefined')
		window.attachEvent('onload', handler);
};

Spry.Widget.ValidationRadio.addLoadListener(Spry.Widget.ValidationRadio.processLoadQueue);
Spry.Widget.ValidationRadio.addLoadListener(function(){
	Spry.Widget.Utils.addEventListener(window, "unload", Spry.Widget.Form.destroyAll, false);
});

Spry.Widget.ValidationRadio.prototype.attachBehaviors = function()
{
	if (!this.element)
		return;
	// find the INPUT type="Radio" element(s) inside current container
	if (this.element.nodeName == "INPUT") {
		this.radioElements = [this.element];
	} else {
		this.radioElements = this.getRadios();
	}
	if (this.radioElements) {
		var self = this;
		this.event_handlers = [];

		var qlen = this.radioElements.length;
		for (var i = 0; i < qlen; i++) {
			// focus
			this.event_handlers.push([this.radioElements[i], "focus", function(e) { return self.onFocus(e); }]);
			// blur
			this.event_handlers.push([this.radioElements[i], "blur", function(e) { return self.onBlur(e); }]);
			// add click instead of onChange
			if (this.validateOn & Spry.Widget.ValidationRadio.ONCHANGE) {
				this.event_handlers.push([this.radioElements[i], "click", function(e) { return self.onClick(e); }]);
			}
		}

		for (var i=0; i<this.event_handlers.length; i++) {
			Spry.Widget.Utils.addEventListener(this.event_handlers[i][0], this.event_handlers[i][1], this.event_handlers[i][2], false);
		}

		// submit
		this.form = Spry.Widget.Utils.getFirstParentWithNodeName(this.element, "FORM");
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

Spry.Widget.ValidationRadio.prototype.getRadios = function()
{
	var arrRadios;
	var elements  = this.element.getElementsByTagName("INPUT");
	if (elements.length) {
		arrRadios = [];
		var qlen = elements.length;
		for (var i = 0; i < qlen; i++)
		{
			if (elements[i].getAttribute('type').toLowerCase() == "radio")
				arrRadios.push(elements[i]);
		}
		return arrRadios;
	}
	return null;
};

Spry.Widget.ValidationRadio.prototype.addClassName = function(ele, className)
{
	if (!ele || !className || (ele.className && ele.className.search(new RegExp("\\b" + className + "\\b")) != -1))
		return;
	ele.className += (ele.className ? " " : "") + className;
};

Spry.Widget.ValidationRadio.prototype.removeClassName = function(ele, className)
{
	if (!ele || !className || (ele.className && ele.className.search(new RegExp("\\b" + className + "\\b")) == -1))
		return;
	ele.className = ele.className.replace(new RegExp("\\s*\\b" + className + "\\b", "g"), "");
};

Spry.Widget.ValidationRadio.prototype.onFocus = function(e)
{
	var eventRadio = (e.srcElement != null) ? e.srcElement : e.target;
 	if (eventRadio.disabled) return;
 
	this.addClassName(this.element, this.focusClass);
	this.addClassName(this.additionalError, this.focusClass);
};

Spry.Widget.ValidationRadio.prototype.onBlur = function(e)
{
	var eventRadio = (e.srcElement != null) ? e.srcElement : e.target;
	if (eventRadio.disabled) return;

	var doValidation = false;
	if (this.validateOn & Spry.Widget.ValidationRadio.ONBLUR)
		doValidation = true;
	if (doValidation)
		this.validate();
	this.removeClassName(this.element, this.focusClass);
	this.removeClassName(this.additionalError, this.focusClass);
};

Spry.Widget.ValidationRadio.prototype.onClick = function(e) {
	var eventRadio = (e.srcElement != null) ? e.srcElement : e.target;
	if (eventRadio.disabled) return;
	this.validate();
};

Spry.Widget.ValidationRadio.prototype.reset = function()
{
	this.removeClassName(this.element, this.validClass);
	this.removeClassName(this.element, this.requiredClass);
	this.removeClassName(this.element, this.invalidClass);
	this.removeClassName(this.additionalError, this.validClass);
	this.removeClassName(this.additionalError, this.requiredClass);
	this.removeClassName(this.additionalError, this.invalidClass);
};

Spry.Widget.ValidationRadio.prototype.validate = function()
{
	this.reset();
	var nochecked = 0;
	var invalid = 0;
	var required = 0;
	if (this.radioElements)
	{
		var qlen = this.radioElements.length;
		for (var i = 0; i < qlen; i++)
		{
			if (!this.radioElements[i].disabled && this.radioElements[i].checked)
			{
				if (this.radioElements[i].value == this.emptyValue){
					required++;
				}else if (this.invalidValue && this.radioElements[i].value == this.invalidValue){
					invalid++;
				}else{
					nochecked++;
				}
			}
		}
	}
	if (this.invalidValue && invalid != 0)
	{
		this.addClassName(this.element, this.invalidClass);
		this.addClassName(this.additionalError, this.invalidClass);
		return false;
	}

	// check isRequired
	if (this.isRequired && (nochecked == 0 || required != 0))
	{
			this.addClassName(this.element, this.requiredClass);
			this.addClassName(this.additionalError, this.requiredClass);
			return false;
	}
	this.addClassName(this.element, this.validClass);
	this.addClassName(this.additionalError, this.validClass);
	return true;
};

Spry.Widget.ValidationRadio.prototype.isDisabled = function()
{
	var ret = true;
	if (this.radioElements) {
		var qlen = this.radioElements.length;
		for (var i = 0; i < qlen; i++)
		{
			if (!this.radioElements[i].disabled)
			{
				ret = false;
				break;
			}
		}
	}
	return ret;
};

Spry.Widget.ValidationRadio.prototype.destroy = function()
{
	if (this.event_handlers)
		for (var i=0; i<this.event_handlers.length; i++)
		{
			Spry.Widget.Utils.removeEventListener(this.event_handlers[i][0], this.event_handlers[i][1], this.event_handlers[i][2], false);
		}
	try { delete this.element; } catch(err) {}
	if (this.radioElements)
		for(var i=0; i < this.radioElements.length; i++)
		{
			try { delete this.radioElements[i];} catch(err) {}
		}
	try { delete this.radioElements; } catch(err) {}
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

Spry.Widget.ValidationTextarea = function(element, options){
	
	options = Spry.Widget.Utils.firstValid(options, {});
	this.flags = {locked: false};
	this.options = {};
	this.element = element;
	this.init(element);

	if (!this.isBrowserSupported()){
		return;	
	}

	options.useCharacterMasking = Spry.Widget.Utils.firstValid(options.useCharacterMasking, true);
	options.hint = Spry.Widget.Utils.firstValid(options.hint, '');
	options.isRequired = Spry.Widget.Utils.firstValid(options.isRequired, true);
	options.additionalError = Spry.Widget.Utils.firstValid(options.additionalError, false);

	Spry.Widget.Utils.setOptions(this, options);
	Spry.Widget.Utils.setOptions(this.options, options);

	if (options.additionalError)
		this.additionalError = this.getElement(options.additionalError);

	//make sure we validate at least on submit
	var validateOn = ['submit'].concat(Spry.Widget.Utils.firstValid(this.options.validateOn, []));
	validateOn = validateOn.join(",");
	this.validateOn = 0;
	this.validateOn = this.validateOn | (validateOn.indexOf('submit') != -1 ? Spry.Widget.ValidationTextarea.ONSUBMIT : 0);
	this.validateOn = this.validateOn | (validateOn.indexOf('blur') != -1 ? Spry.Widget.ValidationTextarea.ONBLUR : 0);
	this.validateOn = this.validateOn | (validateOn.indexOf('change') != -1 ? Spry.Widget.ValidationTextarea.ONCHANGE : 0);

	if (Spry.Widget.ValidationTextarea.onloadDidFire){
		this.attachBehaviors();
	}else{
		Spry.Widget.ValidationTextarea.loadQueue.push(this);
	}
};

Spry.Widget.ValidationTextarea.ONCHANGE = 1;
Spry.Widget.ValidationTextarea.ONBLUR = 2;
Spry.Widget.ValidationTextarea.ONSUBMIT = 4;

Spry.Widget.ValidationTextarea.INITIAL = 'Initial';
Spry.Widget.ValidationTextarea.REQUIRED = 'Required';
Spry.Widget.ValidationTextarea.INVALID = 'Invalid Format';
Spry.Widget.ValidationTextarea.MINIMUM = 'Minimum Number of Chars Not Met';
Spry.Widget.ValidationTextarea.MAXIMUM = 'Maximum Number of Chars Exceeded';
Spry.Widget.ValidationTextarea.VALID = 'Valid';

Spry.Widget.ValidationTextarea.prototype.init = function(element)
{
	this.element = this.getElement(element);
	this.event_handlers = [];

	this.requiredClass = "textareaRequiredState";
	this.invalidCharsMaxClass = "textareaMaxCharsState";
	this.invalidCharsMinClass = "textareaMinCharsState";
	this.validClass = "textareaValidState";
	this.focusClass = "textareaFocusState";
	this.hintClass = "textareaHintState";
	this.textareaFlashClass = "textareaFlashState";

	this.isMaxInvalid = false;
	this.isMinInvalid = false;
	this.isRequireInvalid = false;
	
	this.safariClicked = false;
	this.state = Spry.Widget.ValidationTextarea.INITIAL;
};

Spry.Widget.ValidationTextarea.prototype.destroy = function() {
	if (this.event_handlers)
		for (var i=0; i<this.event_handlers.length; i++) {
			Spry.Widget.Utils.removeEventListener(this.event_handlers[i][0], this.event_handlers[i][1], this.event_handlers[i][2], false);
		}
	try { delete this.element; } catch(err) {}
	try { delete this.input; } catch(err) {}
	try { delete this.counterEl; } catch(err) {}
	try { delete this.form; } catch(err) {}
	try { delete this.event_handlers; } catch(err) {}
	try { this.cursorPosition.destroy(); } catch(err) {}
	try { delete this.cursorPosition; } catch(err) {}
	try { this.initialCursor.destroy(); } catch(err) {}
	try { delete this.initialCursor; } catch(err) {}

	var q = Spry.Widget.Form.onSubmitWidgetQueue;
	var qlen = q.length;
	for (var i = 0; i < qlen; i++) {
		if (q[i] == this) {
			q.splice(i, 1);
			break;
		}
	}
};

Spry.Widget.ValidationTextarea.prototype.isDisabled = function() {
	return this.input && (this.input.disabled || this.input.readOnly) || !this.input;
};

Spry.Widget.ValidationTextarea.prototype.getElement = function(ele)
{
	if (ele && typeof ele == "string")
		return document.getElementById(ele);
	return ele;
};


Spry.Widget.ValidationTextarea.addLoadListener = function(handler){
	if (typeof window.addEventListener != 'undefined'){
		window.addEventListener('load', handler, false);
	}else if (typeof document.addEventListener != 'undefined'){
		document.addEventListener('load', handler, false);
	}else if (typeof window.attachEvent != 'undefined'){
		window.attachEvent('onload', handler);
	}
};

Spry.Widget.ValidationTextarea.processLoadQueue = function(handler){
	Spry.Widget.ValidationTextarea.onloadDidFire = true;
	var q = Spry.Widget.ValidationTextarea.loadQueue;
	var qlen = q.length;
	for (var i = 0; i < qlen; i++){
		q[i].attachBehaviors();
	}
};

Spry.Widget.ValidationTextarea.onloadDidFire = false;
Spry.Widget.ValidationTextarea.loadQueue = [];
Spry.Widget.ValidationTextarea.addLoadListener(Spry.Widget.ValidationTextarea.processLoadQueue);
Spry.Widget.ValidationTextarea.addLoadListener(function(){
	Spry.Widget.Utils.addEventListener(window, "unload", Spry.Widget.Form.destroyAll, false);
});

Spry.Widget.ValidationTextarea.prototype.isBrowserSupported = function()
{
	return Spry.is.ie && Spry.is.v >= 5 && Spry.is.windows
		||
	Spry.is.mozilla && Spry.is.v >= 1.4
		||
	Spry.is.safari
		||
	Spry.is.opera && Spry.is.v >= 9;
};

/* 
 * register our input to different event notifiers 
 *
 */
Spry.Widget.ValidationTextarea.prototype.attachBehaviors = function()
{
	if (this.element){
		if (this.element.nodeName == "TEXTAREA") {
			this.input = this.element;
		} else {
			this.input = Spry.Widget.Utils.getFirstChildWithNodeNameAtAnyLevel(this.element, "TEXTAREA");
		}
	}
	if (this.options && this.options.counterType && (this.options.counterType == 'chars_count' || this.options.counterType == 'chars_remaining')){
			this.counterEl = document.getElementById(this.options.counterId);
			this.counterChar();
	}

	if (this.input) {
		this.input.setAttribute("AutoComplete", "off");
		this.putHint();
		this.cursorPosition = new Spry.Widget.SelectionDescriptor(this.input);

		var self = this;
		this.event_handlers = [];

		//attach the pattern related event handlers (to stop invalid keys) 
		if (this.useCharacterMasking) {
			if (Spry.is.ie){
				this.event_handlers.push([this.input, "propertychange", function(e) { return self.onKeyEvent(e || event); }]);
				this.event_handlers.push([this.input, "drop", function(e) { return self.onDrop (e || event); }]);
				this.event_handlers.push([this.input, "keypress", function(e) { return self.onKeyPress(e || event); }]);
			} else{
				this.event_handlers.push([this.input, "keydown", function(e) { return self.onKeyDown(e); }]);
				this.event_handlers.push([this.input, "keypress", function(e) { return self.safariKeyPress(e); }]);
				this.event_handlers.push([this.input, "keyup", function(e) { return self.safariValidate(e); }]);
				if (Spry.is.safari){
					this.event_handlers.push([this.input, "mouseup", function(e) { return self.safariMouseUp(e); }]);
					this.event_handlers.push([this.input, "mousedown", function(e) { return self.safariMouseDown(e); }]);
				} else {
					//Firefox bug: 355219
					//this.event_handlers.push([this.input, "input", function(e) { self.onKeyEvent(e); return true;}]);
					this.event_handlers.push([this.input, "dragdrop", function(e) { return self.onKeyEvent(e); }]);
					this.event_handlers.push([this.input, "dragenter", function(e) { self.removeHint(); return self.onKeyDown(e); }]);
					this.event_handlers.push([this.input, "dragexit", function(e) { return self.putHint(); }]);
				}
			}
			// we need to save an initial state in case of invalid input
			this.event_handlers.push([this.input, "keydown", function(e) {return self.onKeyDown(e || event); }]);
		}

		this.event_handlers.push([this.input, "focus", function(e) { return self.onFocus(e || event); }]);
		this.event_handlers.push([this.input, "mousedown", function(e) { return self.onMouseDown(e || event); }]);
		this.event_handlers.push([this.input, "blur", function(e) { return self.onBlur(e || event); }]);

		if (this.validateOn & Spry.Widget.ValidationTextarea.ONCHANGE){
				if (Spry.is.ie){
						this.event_handlers.push([this.input, "propertychange", function(e) { return self.onChange(e || event); }]);
						this.event_handlers.push([this.input, "drop", function(e) { return self.onChange(e || event); }]);
				} else{
						this.event_handlers.push([this.input, "keydown", function(e) { return self.onKeyDown(e); }]);
						this.event_handlers.push([this.input, "keypress", function(e) { return self.safariChangeKeyPress(e); }]);
						this.event_handlers.push([this.input, "keyup", function(e) { return self.safariChangeValidate(e); }]);
						if (Spry.is.safari){
							this.event_handlers.push([this.input, "mouseup", function(e) { return self.safariChangeMouseUp(e); }]);
							this.event_handlers.push([this.input, "mousedown", function(e) { return self.safariMouseDown(e); }]);
						} else {
							// Firefox bug: 355219
							//this.event_handlers.push([this.input, "input", function(e) { return self.onChange(e); }]);
							this.event_handlers.push([this.input, "dragdrop", function(e) {return self.onChange(e); }]);
							this.event_handlers.push([this.input, "dragenter", function(e) { self.removeHint(); return self.onKeyDown(e); }]);
							this.event_handlers.push([this.input, "dragexit", function(e) { return self.putHint(); }]);
						}
				}
		}
		// The counter should be called directly when no enforcement or change restrictions exists
		if (! (this.validateOn & Spry.Widget.ValidationTextarea.ONCHANGE) && !this.useCharacterMasking){
				if (Spry.is.ie){
						this.event_handlers.push([this.input, "propertychange", function(e) { return self.counterChar(); }]);
						this.event_handlers.push([this.input, "drop", function(e) { return self.counterChar(); }]);
				} else{
						this.event_handlers.push([this.input, "keypress", function(e) { return self.counterChar(); }]);
						this.event_handlers.push([this.input, "keyup", function(e) { return self.counterChar(); }]);
						if (Spry.is.safari){
							this.event_handlers.push([this.input, "mouseup", function(e) { return self.counterChar(); }]);
						} else {
							// Firefox bug: 355219
							//this.event_handlers.push([this.input, "input", function(e) { return self.onChange(e); }]);
							this.event_handlers.push([this.input, "dragdrop", function(e) {return self.counterChar(); }]);
						}
				}
		}

		for (var i=0; i<this.event_handlers.length; i++) {
			Spry.Widget.Utils.addEventListener(this.event_handlers[i][0], this.event_handlers[i][1], this.event_handlers[i][2], false);
		}

		this.form = Spry.Widget.Utils.getFirstParentWithNodeName(this.input, "FORM");
		if (this.form) {
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
	this.saveState();
};

Spry.Widget.ValidationTextarea.prototype.onTyping = function(e){
	if (this.input.disabled == true || this.input.readOnly == true){
			return;	
	}

	if (!this.initialCursor){
		this.initialCursor = this.cursorPosition;	
	}
	// on IE a stack overflow appears
	if (this.flags.locked){
			return true;
	}

	var val = this.input.value;

	var ret = true;
	
	if (this.flags.hintOn){
		return true;
	}
 	if (e && this.input && this.options && this.options.maxChars > 0 && ret){
		if ( val.length > this.options.maxChars  && 
							((!Spry.Widget.Utils.isSpecialKey(e) && this.cursorPosition.start == this.cursorPosition.end) ||
				 			 (Spry.Widget.Utils.isSpecialKey(e) && val != this.initialValue) ||
				 				this.cursorPosition.start != this.cursorPosition.end)
			 ){
					// cut the extra chars and display error
					this.flags.locked = true;
					var initial = this.initialValue;
					var start = this.initialCursor.start;
					var end = this.initialCursor.end;
					if (initial.length && this.initialCursor.end < initial.length) {
							// we try to behave more like maxlength textfield
							var tmp = end - start + this.options.maxChars - initial.length;
							var newValue = initial.substring(0, start) + val.substring(start, start+tmp) + initial.substring(end, initial.length < this.options.maxChars ? initial.length:this.options.maxChars);
							end = start + tmp;
					}else{
							var newValue = val.substring(0, this.options.maxChars);
							end = start = this.options.maxChars;
					}
					if (Spry.is.ie) {
						this.input.innerText = newValue;
					} else {
						this.input.value = newValue;
					}
					this.redTextFlash();
					this.cursorPosition.moveTo(end, end);
					this.flags.locked = false;
					ret = false;
			} else{
					this.setState(Spry.Widget.ValidationTextarea.VALID);
					this.isMaxInvalid = false;
			}
	}
	this.counterChar();
	return ret;
};

Spry.Widget.ValidationTextarea.prototype.validateMinRequired = function(val){
	var oldInvalid = false;
	if (typeof this.notFireMinYet == 'undefined'){
		this.notFireMinYet = false;
	}else{
		oldInvalid = true;
		this.notFireMinYet = true;
	}
	if (this.onBlurOn){
		this.notFireMinYet = true;
	}else if (!this.onKeyEventOn){
		this.notFireMinYet = true;
	}

	if (this.input && this.options && this.options.isRequired){
			if (val.length > 0 && this.isRequireInvalid && (!this.hint || (this.hint && !this.flags.hintOn) || (this.hint && val != this.hint))){
						this.switchClassName(this.validClass);
						this.setState(Spry.Widget.ValidationTextarea.VALID);
						this.isRequireInvalid = false;
			}else if ((val.length == 0 || !(!this.hint || (this.hint && !this.flags.hintOn) || (this.hint && val != this.hint))) && (!this.isRequireInvalid || oldInvalid)){
						if (this.notFireMinYet || Spry.is.ie){
							this.switchClassName(this.requiredClass);
							this.setState(Spry.Widget.ValidationTextarea.REQUIRED);
						}
						this.isRequireInvalid = true;
						this.isMinInvalid = false;
			}
	}
	if (this.input && this.options && this.options.minChars > 0 && !this.isRequireInvalid){
			if (val.length >= this.options.minChars && (!this.hint || (this.hint && !this.flags.hintOn) || (this.hint && val != this.hint)) && this.isMinInvalid){
						this.switchClassName(this.validClass);
						this.setState(Spry.Widget.ValidationTextarea.VALID);
						this.isMinInvalid = false;
			}else if ( (val.length < this.options.minChars || (this.hint && val == this.hint && this.flags.hintOn)) && !this.isMinInvalid){
						this.switchClassName(this.invalidCharsMinClass);
						this.setState(Spry.Widget.ValidationTextarea.MINIMUM);
						this.isMinInvalid = true;
			}
	}
};
Spry.Widget.ValidationTextarea.prototype.counterChar = function(){
	if (!this.counterEl || !this.options || !this.options.counterType || (this.options.counterType != 'chars_remaining' && this.options.counterType != 'chars_count')){
		return;	
	}

	if (this.options.counterType == 'chars_remaining') {
		if (this.options.maxChars > 0){
			if (this.flags.hintOn){
				this.setCounterElementValue(this.options.maxChars);
			} else {
				if (this.options.maxChars > this.input.value.length){
					this.setCounterElementValue(this.options.maxChars - this.input.value.length);
				}else{
					this.setCounterElementValue(0);
				}
			}
		}
	} else {
		if (this.flags.hintOn){
			this.setCounterElementValue(0);
		} else {
			if (this.useCharacterMasking && typeof this.options.maxChars != 'undefined' && this.options.maxChars < this.input.value.length){
				this.setCounterElementValue(this.options.maxChars);
			} else {
				this.setCounterElementValue(this.input.value.length);
			}
		}
	}
};

Spry.Widget.ValidationTextarea.prototype.setCounterElementValue = function(val){
		if ( this.counterEl.nodeName.toLowerCase() != 'input' && 
			this.counterEl.nodeName.toLowerCase() != 'textarea' &&
			this.counterEl.nodeName.toLowerCase() != 'select' &&
			this.counterEl.nodeName.toLowerCase() != 'img'){
			this.counterEl.innerHTML = val;
		}
};
Spry.Widget.ValidationTextarea.prototype.reset = function() {
	this.removeHint();
	this.removeClassName(this.requiredClass);
	this.removeClassName(this.invalidCharsMinClass);
	this.removeClassName(this.invalidCharsMaxClass);
	this.removeClassName(this.validClass);
	this.setState(Spry.Widget.ValidationTextarea.INITIAL);
	var self = this;
	setTimeout(function() {self.putHint();self.counterChar();}, 10);
};

Spry.Widget.ValidationTextarea.prototype.validate = function(){
	if (this.input.disabled == true || this.input.readOnly == true){
			return true;	
	}

  if (this.validateOn & Spry.Widget.ValidationTextarea.ONSUBMIT) {
    this.removeHint();
  }
  
	var val = this.input.value;
	this.validateMinRequired(val);

	var ret = !this.isMinInvalid && !this.isRequireInvalid;

	if (ret && this.options.maxChars > 0 && !this.useCharacterMasking){
			if (val.length <= this.options.maxChars || (this.hint && this.hint == val && this.flags.hintOn))	{
					this.switchClassName(this.validClass);
					this.setState(Spry.Widget.ValidationTextarea.VALID);
				  this.isMaxInvalid = false;
			}else{
					this.switchClassName(this.invalidCharsMaxClass);
					this.setState(Spry.Widget.ValidationTextarea.MAXIMUM);
					this.isMaxInvalid = true;	
			}
	}
	ret = ret && !this.isMaxInvalid;
	if (ret) {
		this.switchClassName(this.validClass);
	}
	this.counterChar();	
	return ret;
};

Spry.Widget.ValidationTextarea.prototype.setState = function(newstate){
	this.state = newstate;
};

Spry.Widget.ValidationTextarea.prototype.getState = function(){
	return this.state;
};

Spry.Widget.ValidationTextarea.prototype.removeHint = function()
{
	if (this.flags.hintOn) 
	{
		this.flags.locked = true;
		this.input.value = "";
		this.flags.locked = false;
		this.flags.hintOn = false;
		this.removeClassName(this.hintClass);
	}
};

Spry.Widget.ValidationTextarea.prototype.putHint = function()
{
	if(this.hint && this.input.value == "") {
		this.flags.hintOn = true;
		this.input.value = this.hint;
		this.addClassName(this.hintClass);
	}
};

Spry.Widget.ValidationTextarea.prototype.redTextFlash = function()
{
	var self = this;
	this.addClassName(this.textareaFlashClass);
	setTimeout(function() {
		self.removeClassName(self.textareaFlashClass)
	}, 200);
};


Spry.Widget.ValidationTextarea.prototype.onKeyPress = function(e)
{
	//ENTER has length 2 on IE Windows, so will exceed maxLength on proximity
	if (Spry.is.ie && Spry.is.windows && e.keyCode == 13) {
		if ( (this.initialCursor.length + this.options.maxChars - this.input.value.length) < 2) {
			Spry.Widget.Utils.stopEvent(e);
			return false;
		}
	}
};

Spry.Widget.ValidationTextarea.prototype.onKeyDown = function(e)
{ 
	this.saveState();
	this.keyCode = e.keyCode;
	return true;
};

/*
 * hadle for the max chars restrictions
 * if key pressed or the input text is invalid it returns false
 * 
 */
Spry.Widget.ValidationTextarea.prototype.onKeyEvent = function(e){
	// on IE we look only for this input value changes
	if (e.type == 'propertychange' && e.propertyName != 'value'){
			return true;
	}

	var allow = this.onTyping(e);

	if (!allow){
		Spry.Widget.Utils.stopEvent(e);
	}
	//return allow;
};

/*
 * handle for the min or required value
 * if the input text is invalid it returns false
 * 
 */
Spry.Widget.ValidationTextarea.prototype.onChange = function(e){
	if (Spry.is.ie && e && e.type == 'propertychange' && e.propertyName != 'value') {
		return true;
	}

	if (this.flags.drop) {
		//delay this if it's a drop operation
		var self = this;
		setTimeout(function() {
			self.flags.drop = false;
			self.onChange(null);
		}, 0);
		return true;
	}
	if (this.flags.hintOn) {
		return true;
	}
	this.onKeyEventOn = true;
	var answer = this.validate();
	this.onKeyEventOn = false;
	return answer;
};

Spry.Widget.ValidationTextarea.prototype.onMouseDown = function(e)
{
	if (this.flags.active) {
		//mousedown fires before focus
		//avoid double saveState on first focus by mousedown by checking if the control has focus
		//do nothing if it's not focused because saveState will be called onfocus
		this.saveState();
	}
};

Spry.Widget.ValidationTextarea.prototype.onDrop = function(e)
{
	//mark that a drop operation is in progress to avoid race conditions with event handlers for other events
	//especially onchange and onfocus
	this.flags.drop = true;
	this.removeHint();

	if (Spry.is.ie) {
		var rng = document.body.createTextRange();
		rng.moveToPoint(e.x, e.y);
		rng.select();
	}

	this.saveState();
	this.flags.active = true;
	this.addClassName(this.focusClass);
};

Spry.Widget.ValidationTextarea.prototype.onFocus = function(e)
{
	if (this.flags.drop) {
		return;
	}
	this.removeHint();
	this.saveState();
	this.flags.active = true;
	this.addClassName(this.focusClass);
};

Spry.Widget.ValidationTextarea.prototype.onBlur = function(e){
	this.removeClassName(this.focusClass);

	if (this.validateOn & Spry.Widget.ValidationTextarea.ONBLUR) {
		this.onBlurOn = true;
		this.validate();
		this.onBlurOn = false;
	}

	this.flags.active = false;
	var self = this;
	setTimeout(function() {self.putHint();}, 10);
};

Spry.Widget.ValidationTextarea.prototype.safariMouseDown = function(e){
	this.safariClicked = true;
};
Spry.Widget.ValidationTextarea.prototype.safariChangeMouseUp = function(e){
		if (!this.safariClicked){
			this.onKeyDown(e); 
			return this.safariChangeValidate(e, false);
		}else{
			this.safariClicked = false;
			return true;
		}
};

Spry.Widget.ValidationTextarea.prototype.safariMouseUp = function(e){
		if (!this.safariClicked){
			this.onKeyDown(e);
			return this.safariValidate(e, false);
		}else{
			this.safariClicked = false;
			return true;
		}
};

Spry.Widget.ValidationTextarea.prototype.safariKeyPress = function(e){
	this.safariFlag = new Date();
	return this.safariValidate(e, true);
};

Spry.Widget.ValidationTextarea.prototype.safariValidate = function(e, recall)
{
	if (e.keyCode && Spry.Widget.Utils.isSpecialKey(e) && e.keyCode != 8 && e.keyCode != 46){
		return true;
	}
	var answer = this.onTyping(e);

	// the answer to this is not yet final - we schedule another closing check
	if (new Date() - this.safariFlag < 1000 && recall){
		var self = this;
		setTimeout(function(){self.safariValidate(e, false);}, 1000);
	}
	return answer;
};

Spry.Widget.ValidationTextarea.prototype.safariChangeKeyPress = function(e){
	this.safariChangeFlag = new Date();
	return this.safariChangeValidate(e, true);
};

Spry.Widget.ValidationTextarea.prototype.safariChangeValidate = function(e, recall){
	
	if(e.keyCode && Spry.Widget.Utils.isSpecialKey(e) && e.keyCode != 8 && e.keyCode != 46){
		return true;	
	}
	var answer = this.onChange(e);

	// the answer to this is not yet final - we schedule another closing check
	if (new Date() - this.safariChangeFlag < 1000 && recall){
		var self = this;
		setTimeout(function(){ self.safariChangeValidate(e, false);}, 1000 - new Date() + this.safariChangeFlag);
	}
	return answer;
};

/*
 * save an initial state of the input to restore if the value is invalid
 * 
 */
Spry.Widget.ValidationTextarea.prototype.saveState = function(e){
	
	// we don't need this initial value that is already invalid
	if (this.options.maxChars > 0 && this.input.value.length > this.options.maxChars){
		return;
	}
	this.cursorPosition.update();
	if (!this.flags.hintOn){
		this.initialValue = this.input.value;
	}else{
		this.initialValue = '';
	}
	this.initialCursor = this.cursorPosition; 
	return true;
};

Spry.Widget.ValidationTextarea.prototype.checkClassName = function(ele, className){
	if (!ele || !className){
		return false;
	}
	if (typeof ele == 'string' ) {
		ele = document.getElementById(ele);
		if (!ele){
			return false;	
		}
	}
	if (!ele.className){
		ele.className = ' ';
	}
	return ele;
};

Spry.Widget.ValidationTextarea.prototype.switchClassName = function (className){
	var classes = [this.invalidCharsMaxClass, this.validClass, this.requiredClass, this.invalidCharsMinClass];

	for (var k = 0; k < classes.length; k++){
		if (classes[k] != className){
				this.removeClassName(classes[k]);			
		}
	}

	this.addClassName(className);
};

Spry.Widget.ValidationTextarea.prototype.addClassName = function(clssName){
	var ele = this.checkClassName(this.element, clssName);
	var add = this.checkClassName(this.additionalError, clssName);

	if (!ele || ele.className.search(new RegExp("\\b" + clssName + "\\b")) != -1){
	  return;
	}
	this.element.className += ' ' + clssName;
	if (add)
		add.className += ' ' + clssName;
};

Spry.Widget.ValidationTextarea.prototype.removeClassName = function(className){
	var ele = this.checkClassName(this.element, className);
	var add = this.checkClassName(this.additionalError, className);
	if (!ele){
	  return;	
	}
	ele.className = ele.className.replace(new RegExp("\\s*\\b" + className + "\\b", "g"), '');
	if (add){
		add.className = add.className.replace(new RegExp("\\s*\\b" + className + "\\b", "g"), '');
	}
}; 

/**
 * SelectionDescriptor is a wrapper for input type text selection methods and properties 
 * as implemented by various  browsers
 */
Spry.Widget.SelectionDescriptor = function (element)
{
	this.element = element;
	this.update();
};

Spry.Widget.SelectionDescriptor.prototype.update = function()
{
	if (Spry.is.ie && Spry.is.windows) {
		var sel = this.element.ownerDocument.selection;
		if (this.element.nodeName == "TEXTAREA") {
			if (sel.type != 'None') {
				try{var range = sel.createRange();}catch(err){return;}
				if (range.parentElement() == this.element){
					var range_all = this.element.ownerDocument.body.createTextRange();
					range_all.moveToElementText(this.element);
					for (var sel_start = 0; range_all.compareEndPoints('StartToStart', range) < 0; sel_start ++){
						range_all.moveStart('character', 1);
					}
					this.start = sel_start;
					// create a selection of the whole this.element
					range_all = this.element.ownerDocument.body.createTextRange();
					range_all.moveToElementText(this.element);
					for (var sel_end = 0; range_all.compareEndPoints('StartToEnd', range) < 0; sel_end++){
						range_all.moveStart('character', 1);
					}
					this.end = sel_end;
					this.length = this.end - this.start;
					// get selected and surrounding text
					this.text = range.text;
		 		}
			}        
		} else if (this.element.nodeName == "INPUT"){
			try{this.range = sel.createRange();}catch(err){return;}
			this.length = this.range.text.length;
			var clone = this.range.duplicate();
			this.start = -clone.moveStart("character", -10000);
			clone = this.range.duplicate();
			clone.collapse(false);
			this.end = -clone.moveStart("character", -10000);
			this.text = this.range.text;
		}
	} else {
		var tmp = this.element;
		var selectionStart = 0;
		var selectionEnd = 0;
        
		try { selectionStart = tmp.selectionStart;} catch(err) {}
		try { selectionEnd = tmp.selectionEnd;} catch(err) {}

		if (Spry.is.safari) {
			if (selectionStart == 2147483647) {
				selectionStart = 0;
			}
			if (selectionEnd == 2147483647) {
				selectionEnd = 0;
			}
		}
		this.start = selectionStart;
		this.end = selectionEnd;
		this.length = selectionEnd - selectionStart;
		this.text = this.element.value.substring(selectionStart, selectionEnd);
	}
};
Spry.Widget.SelectionDescriptor.prototype.destroy = function() {
	try { delete this.range} catch(err) {}
	try { delete this.element} catch(err) {}
};

Spry.Widget.SelectionDescriptor.prototype.moveTo = function(start, end)
{
	if (Spry.is.ie && Spry.is.windows) {
		if (this.element.nodeName == "TEXTAREA") {
			var ta_range = this.element.createTextRange();
			this.range = this.element.createTextRange();
			this.range.move("character", start);
			this.range.moveEnd("character", end - start);
			
			var c1 = this.range.compareEndPoints("StartToStart", ta_range);
			if (c1 < 0) {
				this.range.setEndPoint("StartToStart", ta_range);
			}

			var c2 = this.range.compareEndPoints("EndToEnd", ta_range);
			if (c2 > 0) {
				this.range.setEndPoint("EndToEnd", ta_range);
			}
		} else if (this.element.nodeName == "INPUT"){
			this.range = this.element.ownerDocument.selection.createRange();
			this.range.move("character", -10000);
			this.start = this.range.moveStart("character", start);
			this.end = this.start + this.range.moveEnd("character", end - start);
		}
		this.range.select();
	} else {
		this.start = start;
		try { this.element.selectionStart = start; } catch(err) {}
		this.end = end;
		try { this.element.selectionEnd = end; } catch(err) {}
	}
	this.ignore = true;
	this.update();
};

//////////////////////////////////////////////////////////////////////
//
// Spry.Widget.Form - common for all widgets
//
//////////////////////////////////////////////////////////////////////

if (!Spry.Widget.Form) Spry.Widget.Form = {};
if (!Spry.Widget.Form.onSubmitWidgetQueue) Spry.Widget.Form.onSubmitWidgetQueue = [];

if (!Spry.Widget.Form.validate)
{
	Spry.Widget.Form.validate = function(vform)
	{
		var isValid = true;
		var isElementValid = true;
		var q = Spry.Widget.Form.onSubmitWidgetQueue;
		var qlen = q.length;
		for (var i = 0; i < qlen; i++)
			if (!q[i].isDisabled() && q[i].form == vform)
			{
				isElementValid = q[i].validate();
				isValid = isElementValid && isValid;
			}
		return isValid;
	};
};

if (!Spry.Widget.Form.onSubmit)
{
	Spry.Widget.Form.onSubmit = function(e, form)
	{
		if (Spry.Widget.Form.validate(form) == false)
			return false;
		return true;
	};
};

if (!Spry.Widget.Form.onReset)
{
	Spry.Widget.Form.onReset = function(e, vform)
	{
		var q = Spry.Widget.Form.onSubmitWidgetQueue;
		var qlen = q.length;
		for (var i = 0; i < qlen; i++)
			if (!q[i].isDisabled() && q[i].form == vform && typeof(q[i].reset) == 'function')
				q[i].reset();
		return true;
	};
};

if (!Spry.Widget.Form.destroy)
{
	Spry.Widget.Form.destroy = function(form)
	{
		var q = Spry.Widget.Form.onSubmitWidgetQueue;
		for (var i = 0; i < Spry.Widget.Form.onSubmitWidgetQueue.length; i++)
			if (q[i].form == form && typeof(q[i].destroy) == 'function')
			{
				q[i].destroy();
				i--;
			}
	}
};

if (!Spry.Widget.Form.destroyAll)
{
	Spry.Widget.Form.destroyAll = function()
	{
		var q = Spry.Widget.Form.onSubmitWidgetQueue;
		for (var i = 0; i < Spry.Widget.Form.onSubmitWidgetQueue.length; i++)
			if (typeof(q[i].destroy) == 'function')
			{
				q[i].destroy();
				i--;
			}
	}
};

//////////////////////////////////////////////////////////////////////
//
// Spry.Widget.Utils
//
//////////////////////////////////////////////////////////////////////

if (!Spry.Widget.Utils)	Spry.Widget.Utils = {};

Spry.Widget.Utils.punycode_constants = {
	base : 36, tmin : 1, tmax : 26, skew : 38, damp : 700,
  initial_bias : 72, initial_n : 0x80, delimiter : 0x2D,
  maxint : 2<<26-1
};

Spry.Widget.Utils.punycode_encode_digit = function (d) {
  return String.fromCharCode(d + 22 + 75 * (d < 26));
};

Spry.Widget.Utils.punycode_adapt = function (delta, numpoints, firsttime) {
	delta = firsttime ? delta / this.punycode_constants.damp : delta >> 1;
	delta += delta / numpoints;
	
	for (var k = 0; delta > ((this.punycode_constants.base - this.punycode_constants.tmin) * this.punycode_constants.tmax) / 2; k += this.punycode_constants.base) {
		delta /= this.punycode_constants.base - this.punycode_constants.tmin;
	}
	return k + (this.punycode_constants.base - this.punycode_constants.tmin + 1) * delta / (delta + this.punycode_constants.skew);
};

/**
 * returns a 	Punicode representation of a UTF-8 string
 * adapted from http://tools.ietf.org/html/rfc3492
 */
Spry.Widget.Utils.punycode_encode = function (input, max_out) {
	var inputc = input.split("");
	input = [];
	for(var i=0; i<inputc.length; i++) {
		input.push(inputc[i].charCodeAt(0));
	}
	var output = '';

  var h, b, j, m, q, k, t;
	var input_len = input.length;
  var n = this.punycode_constants.initial_n;
  var delta = 0;
  var bias = this.punycode_constants.initial_bias;
  var out = 0;

  for (j = 0; j < input_len; j++) {
		if (input[j] < 128) {
			if (max_out - out < 2) {
				return false;
			}
			output += String.fromCharCode(input[j]);
			out++;
		}
	}

	h = b = out;
	if (b > 0) {
		output += String.fromCharCode(this.punycode_constants.delimiter);
		out++;
	}

  while (h < input_len)	{
		for (m = this.punycode_constants.maxint, j = 0; j < input_len; j++) {
			if (input[j] >= n && input[j] < m) {
				m = input[j];
			}
		}
		if (m - n > (this.punycode_constants.maxint - delta) / (h + 1)) {
			return false;
		}
		
		delta += (m - n) * (h + 1);
		n = m;

		for (j = 0; j < input_len; j++) {
			if (input[j] < n ) {
				if (++delta == 0) {
					return false;
				}
			}

			if (input[j] == n) {
				for (q = delta, k = this.punycode_constants.base; true; k += this.punycode_constants.base) {
					if (out >= max_out) {
						return false;
					}

					t = k <= bias ? this.punycode_constants.tmin : k >= bias + this.punycode_constants.tmax ? this.punycode_constants.tmax : k - bias;
					if (q < t) {
						break;
					}

					output += this.punycode_encode_digit(t + (q - t) % (this.punycode_constants.base - t));
					out++;
					q = (q - t) / (this.punycode_constants.base - t);
				}

				output += this.punycode_encode_digit(q);
				out++;
				bias = this.punycode_adapt(delta, h + 1, h == b);
				delta = 0;
				h++;
			}
		}
		delta++, n++;
	}

  return output;
};

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

Spry.Widget.Utils.firstValid = function()
{
	var ret = null;
	for(var i=0; i<Spry.Widget.Utils.firstValid.arguments.length; i++)
		if (typeof Spry.Widget.Utils.firstValid.arguments[i] != 'undefined')
		{
			ret = Spry.Widget.Utils.firstValid.arguments[i];
			break;
		}
	return ret;
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
Spry.Widget.Utils.specialCharacters = ",8,9,16,17,18,20,27,33,34,35,36,37,38,40,45,144,192,63232,";
Spry.Widget.Utils.specialSafariNavKeys = "63232,63233,63234,63235,63272,63273,63275,63276,63277,63289,";
Spry.Widget.Utils.specialNotSafariCharacters = "39,46,91,92,93,";

Spry.Widget.Utils.specialCharacters += Spry.Widget.Utils.specialSafariNavKeys;

if (!Spry.is.safari) {
	Spry.Widget.Utils.specialCharacters += Spry.Widget.Utils.specialNotSafariCharacters;
}

Spry.Widget.Utils.isSpecialKey = function (ev) {
	return Spry.Widget.Utils.specialCharacters.indexOf("," + ev.keyCode + ",") != -1;
};

Spry.Widget.Utils.getCharacterFromEvent = function(e){
	var keyDown = e.type == "keydown";

	var code = null;
	var character = null;
	if(Spry.is.mozilla && !keyDown){
		if(e.charCode){
			character = String.fromCharCode(e.charCode);
		} else {
			code = e.keyCode;
		}
	} else {
		code = e.keyCode || e.which;
		if (code != 13) {
			character = String.fromCharCode(code);
		}
	}

	if (Spry.is.safari) {
		if (keyDown) {
			code = e.keyCode || e.which;
			character = String.fromCharCode(code);
		} else {
			code = e.keyCode || e.which;
			if (Spry.Widget.Utils.specialCharacters.indexOf("," + code + ",") != -1) {
				character = null;
			} else {
				character = String.fromCharCode(code);
			}
		}
	}

	if(Spry.is.opera) {
		if (Spry.Widget.Utils.specialCharacters.indexOf("," + code + ",") != -1) {
			character = null;
		} else {
			character = String.fromCharCode(code);
		}
	}

	return character;
};

Spry.Widget.Utils.getFirstChildWithNodeNameAtAnyLevel = function(node, nodeName) {
	var elements  = node.getElementsByTagName(nodeName);
	if (elements) {
		return elements[0];
	}
	return null;
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
			&& node.parentNode.nodeName != 'BODY')
		node = node.parentNode;


	if (node.parentNode && node.parentNode.nodeName.toLowerCase() == nodeName.toLowerCase())
		return node.parentNode;
	else
		return null;
};
Spry.Widget.Utils.getOptionRealValue = function(option, alternate)
{
	var value = Spry.Widget.Utils.firstValid(option, alternate);
	if (value !== false)
		value = parseInt(value, 10);

	if (isNaN(value) || value < 0)
		value = false;

	return value;
};

Spry.Widget.Utils.getValidChildrenWithNodeNameAtAnyLevel = function(node, nodeName, type)
{
	var elements  = node.getElementsByTagName(nodeName);
	var to_return = [];
	var j=0;
	if (elements)
	{
		for (var i=0; i < elements.length; i++)
			if (typeof elements[i].type != 'undefined' && elements[i].type.toUpperCase() == type.toUpperCase())
			{
				to_return[j] = elements[i];
				j++;
			}
	}
	return to_return;
};
Spry.Widget.Utils.getFirstParentWithNodeName = function(node, nodeName)
{
	while (node.parentNode
			&& node.parentNode.nodeName.toLowerCase() != nodeName.toLowerCase()
			&& node.parentNode.nodeName != 'BODY')
		node = node.parentNode;


	if (node.parentNode && node.parentNode.nodeName.toLowerCase() == nodeName.toLowerCase())
		return node.parentNode;
	else
		return null;
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

Spry.Widget.Utils.stopEvent = function(ev)
{
	try
	{
		this.stopPropagation(ev);
		this.preventDefault(ev);
	}
	catch (e) {}
};

/**
 * Stops event propagation
 * @param {Event} ev the event
 */
Spry.Widget.Utils.stopPropagation = function(ev)
{
	if (ev.stopPropagation)
	{
		ev.stopPropagation();
	}
	else
	{
		ev.cancelBubble = true;
	}
};

/**
 * Prevents the default behavior of the event
 * @param {Event} ev the event
 */
Spry.Widget.Utils.preventDefault = function(ev)
{
	if (ev.preventDefault)
	{
		ev.preventDefault();
	}
	else
	{
		ev.returnValue = false;
	}
};
