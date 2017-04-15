// SpryValidationConfirm.js - version 0.3 - Spry Pre-Release 1.6.1
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
this.windows=this.mac=this.linux=false;this.Platform=ua.match(/windows/i)?"windows":(ua.match(/linux/i)?"linux":(ua.match(/mac/i)?"mac":ua.match(/unix/i)?"unix":"unknown"));this[this.Platform]=true;this.v=this.version;if(this.safari&&this.mac&&this.mozilla){this.mozilla=false;}};Spry.is=new Spry.Widget.BrowserSniff();Spry.Widget.ValidationConfirm=function(element,firstInput,options)
{options=Spry.Widget.Utils.firstValid(options,{});if(!this.isBrowserSupported())
return;if(this.init(element,firstInput,options)===false)
return false;var validateOn=['submit'].concat(Spry.Widget.Utils.firstValid(this.options.validateOn,[]));validateOn=validateOn.join(",");this.validateOn=0;this.validateOn=this.validateOn|(validateOn.indexOf('submit')!=-1?Spry.Widget.ValidationConfirm.ONSUBMIT:0);this.validateOn=this.validateOn|(validateOn.indexOf('blur')!=-1?Spry.Widget.ValidationConfirm.ONBLUR:0);this.validateOn=this.validateOn|(validateOn.indexOf('change')!=-1?Spry.Widget.ValidationConfirm.ONCHANGE:0);if(Spry.Widget.ValidationConfirm.onloadDidFire)
this.attachBehaviors();else
Spry.Widget.ValidationConfirm.loadQueue.push(this);};Spry.Widget.ValidationConfirm.ONCHANGE=1;Spry.Widget.ValidationConfirm.ONBLUR=2;Spry.Widget.ValidationConfirm.ONSUBMIT=4;Spry.Widget.ValidationConfirm.prototype.init=function(element,firstInput,options)
{options=Spry.Widget.Utils.firstValid(options,[]);this.options=[];this.element=this.getElement(element);if(!this.element)
{this.showError('The element '+(!element||element==''?'to be validated is not defined!':(element+' doesn\'t exists!')));return false;}
else
{if(this.element.nodeName.toUpperCase()=='INPUT'&&(typeof this.element.type=='undefined'||',RADIO,CHECKBOX,BUTTON,SUBMIT,IMAGE,'.indexOf(','+this.element.type.toUpperCase+',')==-1))
{this.input=this.element;}
else
{this.input=Spry.Widget.Utils.getFirstChildWithNodeNameAtAnyLevel(this.element,'INPUT');}}
if(!this.input)
{this.showError('Element '+element+' doesn\'t contain any form input!');return false;}
var elm=this.getElement(firstInput);this.firstInput=false;if(!elm)
{this.showError('The element '+(!firstInput||firstInput==''?'that contains the value to be validated is not defined!':(firstInput+' doesn\'t exists!')));return false;}
if(elm.nodeName.toUpperCase()!='INPUT')
{this.firstInput=Spry.Widget.Utils.getFirstChildWithNodeNameAtAnyLevel(elm,'INPUT');}
else if(typeof elm.type=='undefined'||',RADIO,CHECKBOX,BUTTON,SUBMIT,IMAGE,'.indexOf(','+elm.type.toUpperCase()+',')==-1)
{this.firstInput=elm;}
if(!this.firstInput)
{this.showError('Element '+firstInput+' doesn\'t contain any form input!');return false;}
this.event_handlers=[];this.validClass="confirmValidState";this.focusClass="confirmFocusState";this.requiredClass="confirmRequiredState";this.invalidClass="confirmInvalidState";options.isRequired=Spry.Widget.Utils.firstValid(options.isRequired,true);options.additionalError=Spry.Widget.Utils.firstValid(options.additionalError,false);if(options.additionalError)
options.additionalError=this.getElement(options.additionalError);Spry.Widget.Utils.setOptions(this,options);Spry.Widget.Utils.setOptions(this.options,options);};Spry.Widget.ValidationConfirm.loadQueue=[];Spry.Widget.ValidationConfirm.onloadDidFire=false;Spry.Widget.ValidationConfirm.prototype.getElement=function(ele)
{if(ele&&typeof ele=="string")
ele=document.getElementById(ele);return ele;};Spry.Widget.ValidationConfirm.processLoadQueue=function(handler)
{Spry.Widget.ValidationConfirm.onloadDidFire=true;var q=Spry.Widget.ValidationConfirm.loadQueue;var qlen=q.length;for(var i=0;i<qlen;i++)
q[i].attachBehaviors();};Spry.Widget.ValidationConfirm.addLoadListener=function(handler)
{if(typeof window.addEventListener!='undefined')
window.addEventListener('load',handler,false);else if(typeof document.addEventListener!='undefined')
document.addEventListener('load',handler,false);else if(typeof window.attachEvent!='undefined')
window.attachEvent('onload',handler);};Spry.Widget.ValidationConfirm.addLoadListener(Spry.Widget.ValidationConfirm.processLoadQueue);Spry.Widget.ValidationConfirm.prototype.destroy=function()
{if(this.event_handlers){for(var i=0;i<this.event_handlers.length;i++)
Spry.Widget.Utils.removeEventListener(this.event_handlers[i][0],this.event_handlers[i][1],this.event_handlers[i][2],false);}
try{delete this.element;}catch(err){};try{delete this.input;}catch(err){};try{delete this.event_handlers;}catch(err){};try{delete this.options;}catch(err){};var q=Spry.Widget.Form.onSubmitWidgetQueue;var qlen=q.length;for(var i=0;i<qlen;i++)
if(q[i]==this)
{q.splice(i,1);break;}};Spry.Widget.ValidationConfirm.prototype.attachBehaviors=function()
{if(this.event_handlers&&this.event_handlers.length>0)
return;var handlers=this.event_handlers;if(this.input)
{var self=this;this.input.setAttribute("AutoComplete","off");if(this.validateOn&Spry.Widget.ValidationConfirm.ONCHANGE)
{var changeEvent=Spry.is.mozilla||Spry.is.opera||Spry.is.safari?"input":Spry.is.ie?"propertychange":"change";handlers.push([this.input,changeEvent,function(e){if(self.isDisabled())return true;return self.validate(e||event);}]);if(Spry.is.mozilla||Spry.is.safari)
handlers.push([this.input,"dragdrop",function(e){if(self.isDisabled())return true;return self.validate(e);}]);else if(Spry.is.ie)
handlers.push([this.input,"drop",function(e){if(self.isDisabled())return true;return self.validate(event);}]);}
handlers.push([this.input,"blur",function(e){if(self.isDisabled())return true;return self.onBlur(e||event);}]);handlers.push([this.input,"focus",function(e){if(self.isDisabled())return true;return self.onFocus(e||event);}]);for(var i=0;i<this.event_handlers.length;i++)
Spry.Widget.Utils.addEventListener(this.event_handlers[i][0],this.event_handlers[i][1],this.event_handlers[i][2],false);this.form=Spry.Widget.Utils.getFirstParentWithNodeName(this.input,"FORM");if(this.form)
{if(!this.form.attachedSubmitHandler&&!this.form.onsubmit)
{this.form.onsubmit=function(e){e=e||event;return Spry.Widget.Form.onSubmit(e,e.srcElement||e.currentTarget)};this.form.attachedSubmitHandler=true;}
if(!this.form.attachedResetHandler)
{Spry.Widget.Utils.addEventListener(this.form,"reset",function(e){var e=e||event;return Spry.Widget.Form.onReset(e,e.srcElement||e.currentTarget)},false);this.form.attachedResetHandler=true;}
Spry.Widget.Form.onSubmitWidgetQueue.push(this);}}};Spry.Widget.ValidationConfirm.prototype.reset=function()
{this.switchClassName(this.element,'');this.switchClassName(this.additionalError,'');this.removeClassName(this.element,this.focusClass);this.removeClassName(this.additionalError,this.focusClass);if(Spry.is.ie)
{this.input.forceFireFirstOnPropertyChange=true;this.input.removeAttribute("forceFireFirstOnPropertyChange");}};Spry.Widget.ValidationConfirm.prototype.validate=function(e)
{if(this.isRequired&&this.input.value=='')
{this.switchClassName(this.element,this.requiredClass);this.switchClassName(this.additionalError,this.requiredClass);return false;}
if(this.input.value.length>0&&this.input.value!=this.firstInput.value)
{this.switchClassName(this.element,this.invalidClass);this.switchClassName(this.additionalError,this.invalidClass);return false;}
this.switchClassName(this.element,this.validClass);this.switchClassName(this.additionalError,this.validClass);return true;};Spry.Widget.ValidationConfirm.prototype.onBlur=function(e)
{this.removeClassName(this.element,this.focusClass);this.removeClassName(this.additionalError,this.focusClass);if(this.validateOn&Spry.Widget.ValidationConfirm.ONBLUR)
this.validate(e);};Spry.Widget.ValidationConfirm.prototype.onFocus=function()
{this.addClassName(this.element,this.focusClass);this.addClassName(this.additionalError,this.focusClass);};Spry.Widget.ValidationConfirm.prototype.switchClassName=function(ele,className)
{var classes=[this.validClass,this.requiredClass,this.invalidClass];for(var i=0;i<classes.length;i++)
this.removeClassName(ele,classes[i]);this.addClassName(ele,className);};Spry.Widget.ValidationConfirm.prototype.addClassName=function(ele,className)
{if(!ele||!className||(ele.className&&ele.className.indexOf(className)!=-1&&ele.className.search(new RegExp("\\b"+className+"\\b"))!=-1))
return;ele.className+=(ele.className?" ":"")+className;};Spry.Widget.ValidationConfirm.prototype.removeClassName=function(ele,className)
{if(!ele||!className||(ele.className&&ele.className.indexOf(className)!=-1&&ele.className.search(new RegExp("\\b"+className+"\\b"))==-1))
return;ele.className=ele.className.replace(new RegExp("\\s*\\b"+className+"\\b","g"),"");};Spry.Widget.ValidationConfirm.prototype.isBrowserSupported=function()
{return Spry.is.ie&&Spry.is.v>=5&&Spry.is.windows||Spry.is.mozilla&&Spry.is.v>=1.4||Spry.is.safari||Spry.is.opera&&Spry.is.v>=9;};Spry.Widget.ValidationConfirm.prototype.isDisabled=function()
{return this.input&&(this.input.disabled||this.input.readOnly)||!this.input;};Spry.Widget.ValidationConfirm.prototype.showError=function(msg)
{alert('Spry.ValidationConfirm ERR: '+msg);};if(!Spry.Widget.Form)Spry.Widget.Form={};if(!Spry.Widget.Form.onSubmitWidgetQueue)Spry.Widget.Form.onSubmitWidgetQueue=[];if(!Spry.Widget.Form.validate)
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
return ret;};Spry.Widget.Utils.getFirstChildWithNodeNameAtAnyLevel=function(node,nodeName)
{var elements=node.getElementsByTagName(nodeName);if(elements){return elements[0];}
return null;};Spry.Widget.Utils.getFirstParentWithNodeName=function(node,nodeName)
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