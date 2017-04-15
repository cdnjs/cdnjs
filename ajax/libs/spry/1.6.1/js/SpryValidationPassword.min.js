// SpryValidationPassword.js - version 0.3 - Spry Pre-Release 1.6.1
//
// Copyright (c) 2007. Adobe Systems Incorporated.
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

var Spry;if(!Spry)Spry={};if(!Spry.Widget)Spry.Widget={};Spry.Widget.BrowserSniff=function()
{var b=navigator.appName.toString();var up=navigator.platform.toString();var ua=navigator.userAgent.toString();this.mozilla=this.ie=this.opera=this.safari=false;var re_opera=/Opera.([0-9\.]*)/i;var re_msie=/MSIE.([0-9\.]*)/i;var re_gecko=/gecko/i;var re_safari=/(applewebkit|safari)\/([\d\.]*)/i;var r=false;if((r=ua.match(re_opera))){this.opera=true;this.version=parseFloat(r[1]);}else if((r=ua.match(re_msie))){this.ie=true;this.version=parseFloat(r[1]);}else if((r=ua.match(re_safari))){this.safari=true;this.version=parseFloat(r[2]);}else if(ua.match(re_gecko)){var re_gecko_version=/rv:\s*([0-9\.]+)/i;r=ua.match(re_gecko_version);this.mozilla=true;this.version=parseFloat(r[1]);}
this.windows=this.mac=this.linux=false;this.Platform=ua.match(/windows/i)?"windows":(ua.match(/linux/i)?"linux":(ua.match(/mac/i)?"mac":ua.match(/unix/i)?"unix":"unknown"));this[this.Platform]=true;this.v=this.version;if(this.safari&&this.mac&&this.mozilla){this.mozilla=false;}};Spry.is=new Spry.Widget.BrowserSniff();Spry.Widget.ValidationPassword=function(element,options)
{options=Spry.Widget.Utils.firstValid(options,{});if(!this.isBrowserSupported())
return;if(this.init(element,options)===false)
return false;var validateOn=['submit'].concat(Spry.Widget.Utils.firstValid(this.options.validateOn,[]));validateOn=validateOn.join(",");this.validateOn=0;this.validateOn=this.validateOn|(validateOn.indexOf('submit')!=-1?Spry.Widget.ValidationPassword.ONSUBMIT:0);this.validateOn=this.validateOn|(validateOn.indexOf('blur')!=-1?Spry.Widget.ValidationPassword.ONBLUR:0);this.validateOn=this.validateOn|(validateOn.indexOf('change')!=-1?Spry.Widget.ValidationPassword.ONCHANGE:0);if(Spry.Widget.ValidationPassword.onloadDidFire)
this.attachBehaviors();else
Spry.Widget.ValidationPassword.loadQueue.push(this);};Spry.Widget.ValidationPassword.ONCHANGE=1;Spry.Widget.ValidationPassword.ONBLUR=2;Spry.Widget.ValidationPassword.ONSUBMIT=4;Spry.Widget.ValidationPassword.prototype.init=function(element,options)
{options=Spry.Widget.Utils.firstValid(options,[]);this.options=[];this.element=this.getElement(element);if(!this.element)
{return false;}
else
{if(this.element.nodeName.toUpperCase()=='INPUT'&&typeof this.element.type!='undefined'&&this.element.type.toUpperCase()=='PASSWORD')
{this.input=this.element;}
else
{var inputs=Spry.Widget.Utils.getValidChildrenWithNodeNameAtAnyLevel(this.element,'INPUT','PASSWORD');if(inputs&&inputs.length>0)
this.input=inputs[0];else
this.input=false;}}
if(!this.input)
return false;this.event_handlers=[];this.validClass="passwordValidState";this.focusClass="passwordFocusState";this.requiredClass="passwordRequiredState";this.invalidStrengthClass="passwordInvalidStrengthState";this.invalidCharsMinClass="passwordMinCharsState";this.invalidCharsMaxClass="passwordMaxCharsState";this.invalidCustomClass="passwordCustomState";options.isRequired=Spry.Widget.Utils.firstValid(options.isRequired,true);options.additionalError=Spry.Widget.Utils.firstValid(options.additionalError,false);if(options.additionalError)
options.additionalError=this.getElement(options.additionalError);var getRealValue=Spry.Widget.Utils.getOptionRealValue;options.minChars=getRealValue(options.minChars,false);options.maxChars=getRealValue(options.maxChars,false);if(options.maxChars)
this.input.removeAttribute("maxLength");options.minAlphaChars=getRealValue(options.minAlphaChars,false);options.maxAlphaChars=getRealValue(options.maxAlphaChars,false);options.minUpperAlphaChars=getRealValue(options.minUpperAlphaChars,false);options.maxUpperAlphaChars=getRealValue(options.maxUpperAlphaChars,false);options.minSpecialChars=getRealValue(options.minSpecialChars,false);options.maxSpecialChars=getRealValue(options.maxSpecialChars,false);options.minNumbers=getRealValue(options.minNumbers,false);options.maxNumbers=getRealValue(options.maxNumbers,false);if((options.minAlphaChars!==false&&options.maxAlphaChars!==false&&options.minAlphaChars>options.maxAlphaChars)||(options.minUpperAlphaChars!==false&&options.maxUpperAlphaChars!==false&&options.minUpperAlphaChars>options.maxUpperAlphaChars)||(options.minSpecialChars!==false&&options.maxSpecialChars!==false&&options.minSpecialChars>options.maxSpecialChars)||(options.minNumbers!==false&&options.maxNumbers!==false&&options.minNumbers>options.maxNumbers)||(options.maxUpperAlphaChars!==false&&options.maxAlphaChars!==false&&options.maxUpperAlphaChars>options.maxAlphaChars)||(options.maxChars!==false&&options.minAlphaChars+options.minUpperAlphaChars+options.minSpecialChars+options.minNumbers>options.maxChars))
{this.showError('Invalid Strength Options!');return false;}
Spry.Widget.Utils.setOptions(this,options);Spry.Widget.Utils.setOptions(this.options,options);};Spry.Widget.ValidationPassword.loadQueue=[];Spry.Widget.ValidationPassword.onloadDidFire=false;Spry.Widget.ValidationPassword.prototype.getElement=function(ele)
{if(ele&&typeof ele=="string")
ele=document.getElementById(ele);return ele;};Spry.Widget.ValidationPassword.processLoadQueue=function(handler)
{Spry.Widget.ValidationPassword.onloadDidFire=true;var q=Spry.Widget.ValidationPassword.loadQueue;var qlen=q.length;for(var i=0;i<qlen;i++)
q[i].attachBehaviors();};Spry.Widget.ValidationPassword.addLoadListener=function(handler)
{if(typeof window.addEventListener!='undefined')
window.addEventListener('load',handler,false);else if(typeof document.addEventListener!='undefined')
document.addEventListener('load',handler,false);else if(typeof window.attachEvent!='undefined')
window.attachEvent('onload',handler);};Spry.Widget.ValidationPassword.addLoadListener(Spry.Widget.ValidationPassword.processLoadQueue);Spry.Widget.ValidationPassword.prototype.destroy=function()
{if(this.event_handlers)
for(var i=0;i<this.event_handlers.length;i++)
Spry.Widget.Utils.removeEventListener(this.event_handlers[i][0],this.event_handlers[i][1],this.event_handlers[i][2],false);try{delete this.element;}catch(err){};try{delete this.input;}catch(err){};try{delete this.event_handlers;}catch(err){};try{delete this.options;}catch(err){};var q=Spry.Widget.Form.onSubmitWidgetQueue;var qlen=q.length;for(var i=0;i<qlen;i++)
if(q[i]==this)
{q.splice(i,1);break;}};Spry.Widget.ValidationPassword.prototype.attachBehaviors=function()
{if(this.event_handlers&&this.event_handlers.length>0)
return;var handlers=this.event_handlers;if(this.input)
{var self=this;this.input.setAttribute("AutoComplete","off");if(this.validateOn&Spry.Widget.ValidationPassword.ONCHANGE)
{var changeEvent=Spry.is.mozilla||Spry.is.opera||Spry.is.safari?"input":Spry.is.ie?"propertychange":"change";handlers.push([this.input,changeEvent,function(e){if(self.isDisabled())return true;return self.validate(e||event);}]);if(Spry.is.mozilla||Spry.is.safari)
handlers.push([this.input,"dragdrop",function(e){if(self.isDisabled())return true;return self.validate(e);}]);else if(Spry.is.ie)
handlers.push([this.input,"drop",function(e){if(self.isDisabled())return true;return self.validate(event);}]);}
handlers.push([this.input,"blur",function(e){if(self.isDisabled())return true;return self.onBlur(e||event);}]);handlers.push([this.input,"focus",function(e){if(self.isDisabled())return true;return self.onFocus(e||event);}]);for(var i=0;i<this.event_handlers.length;i++)
Spry.Widget.Utils.addEventListener(this.event_handlers[i][0],this.event_handlers[i][1],this.event_handlers[i][2],false);this.form=Spry.Widget.Utils.getFirstParentWithNodeName(this.input,"FORM");if(this.form)
{if(!this.form.attachedSubmitHandler&&!this.form.onsubmit)
{this.form.onsubmit=function(e){e=e||event;return Spry.Widget.Form.onSubmit(e,e.srcElement||e.currentTarget)};this.form.attachedSubmitHandler=true;}
if(!this.form.attachedResetHandler)
{Spry.Widget.Utils.addEventListener(this.form,"reset",function(e){var e=e||event;return Spry.Widget.Form.onReset(e,e.srcElement||e.currentTarget)},false);this.form.attachedResetHandler=true;}
Spry.Widget.Form.onSubmitWidgetQueue.push(this);}}};Spry.Widget.ValidationPassword.prototype.reset=function()
{this.switchClassName(this.element,'');this.switchClassName(this.additionalError,'');this.removeClassName(this.element,this.focusClass);this.removeClassName(this.additionalError,this.focusClass);if(Spry.is.ie)
{this.input.forceFireFirstOnPropertyChange=true;this.input.removeAttribute("forceFireFirstOnPropertyChange");}};Spry.Widget.ValidationPassword.prototype.validateLength=function(e)
{var opt=this.options;if(this.isRequired&&this.input.value=='')
return this.requiredClass;if(opt.minChars>0&&this.input.value.length<opt.minChars)
return this.invalidCharsMinClass;if(opt.maxChars!==false&&this.input.value.length>opt.maxChars)
return this.invalidCharsMaxClass;return true;};Spry.Widget.ValidationPassword.prototype.validateStrength=function(e)
{var opt=this.options;var value=this.input.value;if(opt.minAlphaChars!==false||opt.maxAlphaChars!==false)
{var alphaChars=value.replace(/[^a-z]/ig,'').length;if((opt.maxAlphaChars!==false&&alphaChars>opt.maxAlphaChars)||(opt.minAlphaChars!==false&&alphaChars<opt.minAlphaChars))
return false;}
if(opt.minUpperAlphaChars!==false||opt.maxUpperAlphaChars!==false)
{var upperAlphaChars=value.replace(/[^A-Z]/g,'').length;if((opt.maxUpperAlphaChars!==false&&upperAlphaChars>opt.maxUpperAlphaChars)||(opt.minUpperAlphaChars!==false&&upperAlphaChars<opt.minUpperAlphaChars))
return false;}
if(opt.minNumbers!==false||opt.maxNumbers!==false)
{var numbers=value.replace(/[^0-9]/g,'').length;if((opt.maxNumbers!==false&&numbers>opt.maxNumbers)||(opt.minNumbers!==false&&numbers<opt.minNumbers))
return false;}
if(opt.minSpecialChars!==false||opt.maxSpecialChars!==false)
{var specials=value.replace(/[a-z0-9]/ig,'').length;if((opt.maxSpecialChars!==false&&specials>opt.maxSpecialChars)||(opt.minSpecialChars!==false&&specials<opt.minSpecialChars))
return false;}
return true;};Spry.Widget.ValidationPassword.prototype.validate=function(e)
{var vLength=this.validateLength(e);if(vLength!==true)
{this.switchClassName(this.element,vLength);this.switchClassName(this.additionalError,vLength);return false;}
var vStrength=this.validateStrength(e);if(vStrength!==true)
{this.switchClassName(this.element,this.invalidStrengthClass);this.switchClassName(this.additionalError,this.invalidStrengthClass);return false;}
if(typeof this.options.validation=='function')
{var customValidation=this.options.validation(this.input.value,this.options);if(customValidation!==true)
{this.switchClassName(this.element,this.invalidCustomClass);return false;}}
this.switchClassName(this.element,this.validClass);this.switchClassName(this.additionalError,this.validClass);return true;};Spry.Widget.ValidationPassword.prototype.onBlur=function(e)
{this.removeClassName(this.element,this.focusClass);this.removeClassName(this.additionalError,this.focusClass);if(this.validateOn&Spry.Widget.ValidationPassword.ONBLUR)
this.validate(e);};Spry.Widget.ValidationPassword.prototype.onFocus=function()
{this.addClassName(this.element,this.focusClass);this.addClassName(this.additionalError,this.focusClass);};Spry.Widget.ValidationPassword.prototype.switchClassName=function(ele,className)
{var classes=[this.validClass,this.requiredClass,this.invalidCharsMaxClass,this.invalidCharsMinClass,this.invalidStrengthClass,this.invalidCustomClass];for(var i=0;i<classes.length;i++)
this.removeClassName(ele,classes[i]);this.addClassName(ele,className);};Spry.Widget.ValidationPassword.prototype.addClassName=function(ele,className)
{if(!ele||!className||(ele.className&&ele.className.indexOf(className)!=-1&&ele.className.search(new RegExp("\\b"+className+"\\b"))!=-1))
return;ele.className+=(ele.className?" ":"")+className;};Spry.Widget.ValidationPassword.prototype.removeClassName=function(ele,className)
{if(!ele||!className||(ele.className&&ele.className.indexOf(className)!=-1&&ele.className.search(new RegExp("\\b"+className+"\\b"))==-1))
return;ele.className=ele.className.replace(new RegExp("\\s*\\b"+className+"\\b","g"),"");};Spry.Widget.ValidationPassword.prototype.isBrowserSupported=function()
{return Spry.is.ie&&Spry.is.v>=5&&Spry.is.windows||Spry.is.mozilla&&Spry.is.v>=1.4||Spry.is.safari||Spry.is.opera&&Spry.is.v>=9;};Spry.Widget.ValidationPassword.prototype.isDisabled=function()
{return this.input&&(this.input.disabled||this.input.readOnly)||!this.input;};Spry.Widget.ValidationPassword.prototype.showError=function(msg)
{alert('Spry.ValidationPassword ERR: '+msg);};if(!Spry.Widget.Form)Spry.Widget.Form={};if(!Spry.Widget.Form.onSubmitWidgetQueue)Spry.Widget.Form.onSubmitWidgetQueue=[];if(!Spry.Widget.Form.validate)
{Spry.Widget.Form.validate=function(vform)
{var isValid=true;var isElementValid=true;var q=Spry.Widget.Form.onSubmitWidgetQueue;var qlen=q.length;for(var i=0;i<qlen;i++)
if(!q[i].isDisabled()&&q[i].form==vform)
{isElementValid=q[i].validate();isValid=isElementValid&&isValid;}
return isValid;};};if(!Spry.Widget.Form.onSubmit)
{Spry.Widget.Form.onSubmit=function(e,form)
{if(Spry.Widget.Form.validate(form)==false)
return false;return true;};};if(!Spry.Widget.Form.onReset)
{Spry.Widget.Form.onReset=function(e,vform)
{var q=Spry.Widget.Form.onSubmitWidgetQueue;var qlen=q.length;for(var i=0;i<qlen;i++)
if(!q[i].isDisabled()&&q[i].form==vform&&typeof(q[i].reset)=='function')
q[i].reset();return true;};};if(!Spry.Widget.Form.destroy)
{Spry.Widget.Form.destroy=function(form)
{var q=Spry.Widget.Form.onSubmitWidgetQueue;for(var i=0;i<Spry.Widget.Form.onSubmitWidgetQueue.length;i++)
if(q[i].form==form&&typeof(q[i].destroy)=='function')
{q[i].destroy();i--;}}};if(!Spry.Widget.Form.destroyAll)
{Spry.Widget.Form.destroyAll=function()
{var q=Spry.Widget.Form.onSubmitWidgetQueue;for(var i=0;i<Spry.Widget.Form.onSubmitWidgetQueue.length;i++)
if(typeof(q[i].destroy)=='function')
{q[i].destroy();i--;}}};if(!Spry.Widget.Utils)Spry.Widget.Utils={};Spry.Widget.Utils.setOptions=function(obj,optionsObj,ignoreUndefinedProps)
{if(!optionsObj)
return;for(var optionName in optionsObj)
{if(ignoreUndefinedProps&&optionsObj[optionName]==undefined)
continue;obj[optionName]=optionsObj[optionName];}};Spry.Widget.Utils.firstValid=function()
{var ret=null;for(var i=0;i<Spry.Widget.Utils.firstValid.arguments.length;i++)
if(typeof Spry.Widget.Utils.firstValid.arguments[i]!='undefined')
{ret=Spry.Widget.Utils.firstValid.arguments[i];break;}
return ret;};Spry.Widget.Utils.getOptionRealValue=function(option,alternate)
{var value=Spry.Widget.Utils.firstValid(option,alternate);if(value!==false)
value=parseInt(value,10);if(isNaN(value)||value<0)
value=false;return value;};Spry.Widget.Utils.getValidChildrenWithNodeNameAtAnyLevel=function(node,nodeName,type)
{var elements=node.getElementsByTagName(nodeName);var to_return=[];var j=0;if(elements)
{for(var i=0;i<elements.length;i++)
if(typeof elements[i].type!='undefined'&&elements[i].type.toUpperCase()==type.toUpperCase())
{to_return[j]=elements[i];j++;}}
return to_return;};Spry.Widget.Utils.getFirstParentWithNodeName=function(node,nodeName)
{while(node.parentNode&&node.parentNode.nodeName.toLowerCase()!=nodeName.toLowerCase()&&node.parentNode.nodeName!='BODY')
node=node.parentNode;if(node.parentNode&&node.parentNode.nodeName.toLowerCase()==nodeName.toLowerCase())
return node.parentNode;else
return null;};Spry.Widget.Utils.addEventListener=function(element,eventType,handler,capture)
{try
{if(element.addEventListener)
element.addEventListener(eventType,handler,capture);else if(element.attachEvent)
element.attachEvent("on"+eventType,handler,capture);}
catch(e){}};Spry.Widget.Utils.removeEventListener=function(element,eventType,handler,capture)
{try
{if(element.removeEventListener)
element.removeEventListener(eventType,handler,capture);else if(element.detachEvent)
element.detachEvent("on"+eventType,handler,capture);}
catch(e){}};