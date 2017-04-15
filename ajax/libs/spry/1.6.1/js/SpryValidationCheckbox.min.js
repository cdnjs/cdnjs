// SpryValidationCheckbox.js - version 0.10 - Spry Pre-Release 1.6.1
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

var Spry;if(!Spry)Spry={};if(!Spry.Widget)Spry.Widget={};Spry.Widget.ValidationCheckbox=function(element,opts)
{this.init(element);Spry.Widget.Utils.setOptions(this,opts);var validateOn=['submit'].concat(this.validateOn||[]);validateOn=validateOn.join(",");this.validateOn=0|(validateOn.indexOf('submit')!=-1?Spry.Widget.ValidationCheckbox.ONSUBMIT:0);this.validateOn=this.validateOn|(validateOn.indexOf('blur')!=-1?Spry.Widget.ValidationCheckbox.ONBLUR:0);this.validateOn=this.validateOn|(validateOn.indexOf('change')!=-1?Spry.Widget.ValidationCheckbox.ONCHANGE:0);if(!isNaN(this.minSelections)){this.minSelections=(this.minSelections>0)?parseInt(this.minSelections,10):null;}
if(!isNaN(this.maxSelections)){this.maxSelections=(this.maxSelections>0)?parseInt(this.maxSelections,10):null;}
if(this.additionalError)
this.additionalError=this.getElement(this.additionalError);if(Spry.Widget.ValidationCheckbox.onloadDidFire)
this.attachBehaviors();else
Spry.Widget.ValidationCheckbox.loadQueue.push(this);};Spry.Widget.ValidationCheckbox.ONCHANGE=1;Spry.Widget.ValidationCheckbox.ONBLUR=2;Spry.Widget.ValidationCheckbox.ONSUBMIT=4;Spry.Widget.ValidationCheckbox.prototype.init=function(element)
{this.element=this.getElement(element);this.checkboxElements=null;this.additionalError=false;this.form=null;this.event_handlers=[];this.hasFocus=false;this.requiredClass="checkboxRequiredState";this.minSelectionsClass="checkboxMinSelectionsState";this.maxSelectionsClass="checkboxMaxSelectionsState";this.focusClass="checkboxFocusState";this.validClass="checkboxValidState";this.isRequired=true;this.minSelections=null;this.maxSelections=null;this.validateOn=["submit"];};Spry.Widget.ValidationCheckbox.prototype.destroy=function(){if(this.event_handlers)
for(var i=0;i<this.event_handlers.length;i++)
{Spry.Widget.Utils.removeEventListener(this.event_handlers[i][0],this.event_handlers[i][1],this.event_handlers[i][2],false);}
try{delete this.element;}catch(err){}
if(this.checkboxElements)
for(var i=0;i<this.checkboxElements.length;i++)
{try{delete this.checkboxElements[i];}catch(err){}}
try{delete this.checkboxElements;}catch(err){}
try{delete this.form;}catch(err){}
try{delete this.event_handlers;}catch(err){}
var q=Spry.Widget.Form.onSubmitWidgetQueue;var qlen=q.length;for(var i=0;i<qlen;i++){if(q[i]==this){q.splice(i,1);break;}}};Spry.Widget.ValidationCheckbox.onloadDidFire=false;Spry.Widget.ValidationCheckbox.loadQueue=[];Spry.Widget.ValidationCheckbox.prototype.getElement=function(ele)
{if(ele&&typeof ele=="string")
return document.getElementById(ele);return ele;};Spry.Widget.ValidationCheckbox.processLoadQueue=function(handler)
{Spry.Widget.ValidationCheckbox.onloadDidFire=true;var q=Spry.Widget.ValidationCheckbox.loadQueue;var qlen=q.length;for(var i=0;i<qlen;i++)
q[i].attachBehaviors();};Spry.Widget.ValidationCheckbox.addLoadListener=function(handler)
{if(typeof window.addEventListener!='undefined')
window.addEventListener('load',handler,false);else if(typeof document.addEventListener!='undefined')
document.addEventListener('load',handler,false);else if(typeof window.attachEvent!='undefined')
window.attachEvent('onload',handler);};Spry.Widget.ValidationCheckbox.addLoadListener(Spry.Widget.ValidationCheckbox.processLoadQueue);Spry.Widget.ValidationCheckbox.addLoadListener(function(){Spry.Widget.Utils.addEventListener(window,"unload",Spry.Widget.Form.destroyAll,false);});Spry.Widget.ValidationCheckbox.prototype.attachBehaviors=function()
{if(!this.element)
return;if(this.element.nodeName=="INPUT"){this.checkboxElements=[this.element];}else{this.checkboxElements=this.getCheckboxes();}
if(this.checkboxElements){var self=this;this.event_handlers=[];var qlen=this.checkboxElements.length;for(var i=0;i<qlen;i++){this.event_handlers.push([this.checkboxElements[i],"focus",function(e){return self.onFocus(e);}]);this.event_handlers.push([this.checkboxElements[i],"blur",function(e){return self.onBlur(e);}]);if(this.validateOn&Spry.Widget.ValidationCheckbox.ONCHANGE){this.event_handlers.push([this.checkboxElements[i],"click",function(e){return self.onClick(e);}]);}}
for(var i=0;i<this.event_handlers.length;i++){Spry.Widget.Utils.addEventListener(this.event_handlers[i][0],this.event_handlers[i][1],this.event_handlers[i][2],false);}
this.form=Spry.Widget.Utils.getFirstParentWithNodeName(this.element,"FORM");if(this.form){if(!this.form.attachedSubmitHandler&&!this.form.onsubmit){this.form.onsubmit=function(e){e=e||event;return Spry.Widget.Form.onSubmit(e,e.srcElement||e.currentTarget)};this.form.attachedSubmitHandler=true;}
if(!this.form.attachedResetHandler){Spry.Widget.Utils.addEventListener(this.form,"reset",function(e){e=e||event;return Spry.Widget.Form.onReset(e,e.srcElement||e.currentTarget)},false);this.form.attachedResetHandler=true;}
Spry.Widget.Form.onSubmitWidgetQueue.push(this);}}};Spry.Widget.ValidationCheckbox.prototype.getCheckboxes=function(){var arrCheckboxes;var elements=this.element.getElementsByTagName("INPUT");if(elements.length){arrCheckboxes=[];var qlen=elements.length;for(var i=0;i<qlen;i++){if(elements[i].type=="checkbox"){arrCheckboxes.push(elements[i]);}}
return arrCheckboxes;}
return null;};Spry.Widget.ValidationCheckbox.prototype.addClassName=function(ele,className)
{if(!ele||!className||(ele.className&&ele.className.search(new RegExp("\\b"+className+"\\b"))!=-1))
return;ele.className+=(ele.className?" ":"")+className;};Spry.Widget.ValidationCheckbox.prototype.removeClassName=function(ele,className)
{if(!ele||!className||(ele.className&&ele.className.search(new RegExp("\\b"+className+"\\b"))==-1))
return;ele.className=ele.className.replace(new RegExp("\\s*\\b"+className+"\\b","g"),"");};Spry.Widget.ValidationCheckbox.prototype.onFocus=function(e)
{var eventCheckbox=(e.srcElement!=null)?e.srcElement:e.target;if(eventCheckbox.disabled)return;this.hasFocus=true;this.addClassName(this.element,this.focusClass);this.addClassName(this.additionalError,this.focusClass);};Spry.Widget.ValidationCheckbox.prototype.onBlur=function(e)
{var eventCheckbox=(e.srcElement!=null)?e.srcElement:e.target;if(eventCheckbox.disabled)return;this.hasFocus=false;var doValidation=false;if(this.validateOn&Spry.Widget.ValidationCheckbox.ONBLUR)
doValidation=true;if(doValidation)
this.validate();this.removeClassName(this.element,this.focusClass);this.removeClassName(this.additionalError,this.focusClass);};Spry.Widget.ValidationCheckbox.prototype.onClick=function(e){var eventCheckbox=(e.srcElement!=null)?e.srcElement:e.target;if(eventCheckbox.disabled)return;this.validate();};Spry.Widget.ValidationCheckbox.prototype.reset=function(){this.removeClassName(this.element,this.validClass);this.removeClassName(this.element,this.requiredClass);this.removeClassName(this.element,this.minSelectionsClass);this.removeClassName(this.element,this.maxSelectionsClass);this.removeClassName(this.additionalError,this.validClass);this.removeClassName(this.additionalError,this.requiredClass);this.removeClassName(this.additionalError,this.minSelectionsClass);this.removeClassName(this.additionalError,this.maxSelectionsClass);};Spry.Widget.ValidationCheckbox.prototype.validate=function(){this.reset();var nochecked=0;if(this.checkboxElements){var qlen=this.checkboxElements.length;for(var i=0;i<qlen;i++){if(!this.checkboxElements[i].disabled&&this.checkboxElements[i].checked){nochecked++;}}}
if(this.isRequired){if(nochecked==0){this.addClassName(this.element,this.requiredClass);this.addClassName(this.additionalError,this.requiredClass);return false;}}
if(this.minSelections){if(this.minSelections>nochecked){this.addClassName(this.element,this.minSelectionsClass);this.addClassName(this.additionalError,this.minSelectionsClass);return false;}}
if(this.maxSelections){if(this.maxSelections<nochecked){this.addClassName(this.element,this.maxSelectionsClass);this.addClassName(this.additionalError,this.maxSelectionsClass);return false;}}
this.addClassName(this.element,this.validClass);this.addClassName(this.additionalError,this.validClass);return true;};Spry.Widget.ValidationCheckbox.prototype.isDisabled=function(){var ret=true;if(this.checkboxElements){var qlen=this.checkboxElements.length;for(var i=0;i<qlen;i++){if(!this.checkboxElements[i].disabled){ret=false;break;}}}
return ret;};if(!Spry.Widget.Form)Spry.Widget.Form={};if(!Spry.Widget.Form.onSubmitWidgetQueue)Spry.Widget.Form.onSubmitWidgetQueue=[];if(!Spry.Widget.Form.validate){Spry.Widget.Form.validate=function(vform){var isValid=true;var isElementValid=true;var q=Spry.Widget.Form.onSubmitWidgetQueue;var qlen=q.length;for(var i=0;i<qlen;i++){if(!q[i].isDisabled()&&q[i].form==vform){isElementValid=q[i].validate();isValid=isElementValid&&isValid;}}
return isValid;}};if(!Spry.Widget.Form.onSubmit){Spry.Widget.Form.onSubmit=function(e,form)
{if(Spry.Widget.Form.validate(form)==false){return false;}
return true;};};if(!Spry.Widget.Form.onReset){Spry.Widget.Form.onReset=function(e,vform)
{var q=Spry.Widget.Form.onSubmitWidgetQueue;var qlen=q.length;for(var i=0;i<qlen;i++){if(!q[i].isDisabled()&&q[i].form==vform&&typeof(q[i].reset)=='function'){q[i].reset();}}
return true;};};if(!Spry.Widget.Form.destroy){Spry.Widget.Form.destroy=function(form)
{var q=Spry.Widget.Form.onSubmitWidgetQueue;for(var i=0;i<Spry.Widget.Form.onSubmitWidgetQueue.length;i++){if(q[i].form==form&&typeof(q[i].destroy)=='function'){q[i].destroy();i--;}}}};if(!Spry.Widget.Form.destroyAll){Spry.Widget.Form.destroyAll=function()
{var q=Spry.Widget.Form.onSubmitWidgetQueue;for(var i=0;i<Spry.Widget.Form.onSubmitWidgetQueue.length;i++){if(typeof(q[i].destroy)=='function'){q[i].destroy();i--;}}}};if(!Spry.Widget.Utils)Spry.Widget.Utils={};Spry.Widget.Utils.setOptions=function(obj,optionsObj,ignoreUndefinedProps)
{if(!optionsObj)
return;for(var optionName in optionsObj)
{if(ignoreUndefinedProps&&optionsObj[optionName]==undefined)
continue;obj[optionName]=optionsObj[optionName];}};Spry.Widget.Utils.getFirstParentWithNodeName=function(node,nodeName)
{while(node.parentNode&&node.parentNode.nodeName.toLowerCase()!=nodeName.toLowerCase()&&node.parentNode.nodeName!='BODY'){node=node.parentNode;}
if(node.parentNode&&node.parentNode.nodeName.toLowerCase()==nodeName.toLowerCase()){return node.parentNode;}else{return null;}};Spry.Widget.Utils.destroyWidgets=function(container)
{if(typeof container=='string'){container=document.getElementById(container);}
var q=Spry.Widget.Form.onSubmitWidgetQueue;for(var i=0;i<Spry.Widget.Form.onSubmitWidgetQueue.length;i++){if(typeof(q[i].destroy)=='function'&&Spry.Widget.Utils.contains(container,q[i].element)){q[i].destroy();i--;}}};Spry.Widget.Utils.contains=function(who,what)
{if(typeof who.contains=='object'){return what&&who&&(who==what||who.contains(what));}else{var el=what;while(el){if(el==who){return true;}
el=el.parentNode;}
return false;}};Spry.Widget.Utils.addEventListener=function(element,eventType,handler,capture)
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