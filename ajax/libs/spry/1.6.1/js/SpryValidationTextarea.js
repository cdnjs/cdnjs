// SpryValidationTextarea.js - version 0.17 - Spry Pre-Release 1.6.1
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

Spry.Widget.Utils.firstValid = function() {
	var ret = null;
	for(var i=0; i<Spry.Widget.Utils.firstValid.arguments.length; i++) {
		if (typeof(Spry.Widget.Utils.firstValid.arguments[i]) != 'undefined') {
			ret = Spry.Widget.Utils.firstValid.arguments[i];
			break;
		}
	}
	return ret;
};

Spry.Widget.Utils.specialSafariNavKeys = ",63232,63233,63234,63235,63272,63273,63275,63276,63277,63289,";

Spry.Widget.Utils.specialCharacters = ",8,9,16,17,18,20,27,33,34,35,36,37,38,39,40,45,46,91,92,93,144,192,63232,";
Spry.Widget.Utils.specialCharacters += Spry.Widget.Utils.specialSafariNavKeys;

Spry.Widget.Utils.isSpecialKey = function (ev) {
	return Spry.Widget.Utils.specialCharacters.indexOf("," + ev.keyCode + ",") != -1;
};

Spry.Widget.Utils.getFirstChildWithNodeNameAtAnyLevel = function(node, nodeName) {
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
