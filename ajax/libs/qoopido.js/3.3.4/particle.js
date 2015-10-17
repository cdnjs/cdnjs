/*!
* Qoopido.js library v3.3.4, 2014-5-25
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(t){window.qoopido.register("particle",t,["./emitter","./pool/module","./vector/2d"])}(function(t,i,o,e,s,c,n){"use strict";var l,a=t["pool/module"].create(t["vector/2d"]);return l=t.emitter.extend({_velocity:null,_acceleration:null,position:null,velocity:null,acceleration:null,_constructor:function(t,i){this._velocity=a.obtain(0,0),this._acceleration=a.obtain(0,0),this.position=a.obtain(t,i),this.velocity=a.obtain(0,0),this.acceleration=[],l._parent._constructor.call(this)},_obtain:function(t,i){this.position.x=t||0,this.position.y=i||0,this.velocity.x=0,this.velocity.y=0,this.acceleration.length=0},_destroy:function(){this._velocity=this._velocity.dispose(),this._acceleration=this._acceleration.dispose(),this.position=this.position.dispose(),this.velocity=this.velocity.dispose()},update:function(t){t="undefined"!=typeof t?parseFloat(t):1;var i,o;for(i=0;(o=this.acceleration[i])!==n;i++)this.velocity.add(o);this._velocity.x=this.velocity.x*t,this._velocity.y=this.velocity.y*t,this.position.add(this._velocity)}})});