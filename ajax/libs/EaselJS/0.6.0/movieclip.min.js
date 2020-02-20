/*
* EaselJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011 gskinner.com, inc.
* 
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs=this.createjs||{};
(function(){var d=function(b,a,c,f){this.initialize(b,a,c,f)},a=d.prototype=new createjs.Container;d.INDEPENDENT="independent";d.SINGLE_FRAME="single";d.SYNCHED="synched";a.startPosition=0;a.loop=!0;a.currentFrame=0;a.timeline=null;a.paused=!1;a.actionsEnabled=!0;a.autoReset=!0;a._synchOffset=0;a._prevPos=-1;a._prevPosition=0;a.Container_initialize=a.initialize;a.initialize=function(b,a,c,f){this.mode=b||d.INDEPENDENT;this.startPosition=a||0;this.loop=c;props={paused:!0,position:a,useTicks:!0};this.Container_initialize();
this.timeline=new createjs.Timeline(null,f,props);this._managed={}};a.isVisible=function(){return!(!this.visible||!(0<this.alpha&&0!=this.scaleX&&0!=this.scaleY))};a.Container_draw=a.draw;a.draw=function(b,a,c){if(this.DisplayObject_draw(b,a))return!0;this._updateTimeline();this.Container_draw(b,a,c)};a.play=function(){this.paused=!1};a.stop=function(){this.paused=!0};a.gotoAndPlay=function(b){this.paused=!1;this._goto(b)};a.gotoAndStop=function(b){this.paused=!0;this._goto(b)};a.clone=function(){throw"MovieClip cannot be cloned.";
};a.toString=function(){return"[MovieClip (name="+this.name+")]"};a.Container__tick=a._tick;a._tick=function(b){!this.paused&&this.mode==d.INDEPENDENT&&(this._prevPosition=0>this._prevPos?0:this._prevPosition+1);this.Container__tick(b)};a._goto=function(b){b=this.timeline.resolve(b);null!=b&&(-1==this._prevPos&&(this._prevPos=NaN),this._prevPosition=b,this._updateTimeline())};a._reset=function(){this._prevPos=-1;this.currentFrame=0};a._updateTimeline=function(){var b=this.timeline,a=b._tweens,c=this.children,
f=this.mode!=d.INDEPENDENT;b.loop=null==this.loop?!0:this.loop;f?b.setPosition(this.startPosition+(this.mode==d.SINGLE_FRAME?0:this._synchOffset),createjs.Tween.NONE):b.setPosition(0>this._prevPos?0:this._prevPosition,this.actionsEnabled?null:createjs.Tween.NONE);this._prevPosition=b._prevPosition;if(this._prevPos!=b._prevPos){this.currentFrame=this._prevPos=b._prevPos;for(var e in this._managed)this._managed[e]=1;for(b=a.length-1;0<=b;b--)e=a[b],f=e._target,f!=this&&(e=e._stepPosition,f instanceof
createjs.DisplayObject?this._addManagedChild(f,e):this._setState(f.state,e));for(b=c.length-1;0<=b;b--)a=c[b].id,1==this._managed[a]&&(this.removeChildAt(b),delete this._managed[a])}};a._setState=function(b,a){if(b)for(var c=0,f=b.length;c<f;c++){var e=b[c],d=e.t,e=e.p,g;for(g in e)d[g]=e[g];this._addManagedChild(d,a)}};a._addManagedChild=function(b,a){b._off||(this.addChild(b),b instanceof d&&(b._synchOffset=a,b.mode==d.INDEPENDENT&&(b.autoReset&&!this._managed[b.id])&&b._reset()),this._managed[b.id]=
2)};createjs.MovieClip=d;var g=function(){throw"MovieClipPlugin cannot be instantiated.";};g.priority=100;g.install=function(){createjs.Tween.installPlugin(g,["startPosition"])};g.init=function(b,a,c){return c};g.step=function(){};g.tween=function(b,a,c,f,e,g){return!(b.target instanceof d)?c:1==g?e[a]:f[a]};g.install()})();
