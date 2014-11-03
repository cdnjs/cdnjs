// Backbone.BabySitter
// -------------------
// v0.0.6
//
// Copyright (c)2013 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://github.com/babysitterjs/backbone.babysitter

Backbone.ChildViewContainer=function(i,t){var e=function(i){this._views={},this._indexByModel={},this._indexByCustom={},this._updateLength(),t.each(i,this.add,this)};t.extend(e.prototype,{add:function(i,t){var e=i.cid;this._views[e]=i,i.model&&(this._indexByModel[i.model.cid]=e),t&&(this._indexByCustom[t]=e),this._updateLength()},findByModel:function(i){return this.findByModelCid(i.cid)},findByModelCid:function(i){var t=this._indexByModel[i];return this.findByCid(t)},findByCustom:function(i){var t=this._indexByCustom[i];return this.findByCid(t)},findByIndex:function(i){return t.values(this._views)[i]},findByCid:function(i){return this._views[i]},remove:function(i){var e=i.cid;i.model&&delete this._indexByModel[i.model.cid],t.any(this._indexByCustom,function(i,t){return i===e?(delete this._indexByCustom[t],!0):void 0},this),delete this._views[e],this._updateLength()},call:function(i){this.apply(i,t.tail(arguments))},apply:function(i,e){t.each(this._views,function(n){t.isFunction(n[i])&&n[i].apply(n,e||[])})},_updateLength:function(){this.length=t.size(this._views)}});var n=["forEach","each","map","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","toArray","first","initial","rest","last","without","isEmpty","pluck"];return t.each(n,function(i){e.prototype[i]=function(){var e=t.values(this._views),n=[e].concat(t.toArray(arguments));return t[i].apply(t,n)}}),e}(Backbone,_);
//@ sourceMappingURL=backbone.babysitter.map