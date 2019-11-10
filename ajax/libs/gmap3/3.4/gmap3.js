/*
 *  GMAP3 Plugin for JQuery 
 *  Version   : 3.4
 *  Date      : July 04, 2011
 *  Licence   : GPL v3 : http://www.gnu.org/licenses/gpl.html  
 *  Author    : DEMONTE Jean-Baptiste
 *  Contact   : jbdemonte@gmail.com
 *  Web site  : http://gmap3.net
 *   
 *  Copyright (c) 2010-2011 Jean-Baptiste DEMONTE
 *  All rights reserved.
 *   
 * Redistribution and use in source and binary forms, with or without 
 * modification, are permitted provided that the following conditions are met:
 * 
 *   - Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *   - Redistributions in binary form must reproduce the above 
 *     copyright notice, this list of conditions and the following 
 *     disclaimer in the documentation and/or other materials provided 
 *     with the distribution.
 *   - Neither the name of the author nor the names of its contributors 
 *     may be used to endorse or promote products derived from this 
 *     software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE 
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE 
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF 
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
 * POSSIBILITY OF SUCH DAMAGE.
 */
 
(function ($) {
  
  /***************************************************************************/
  /*                                STACK                                    */
  /***************************************************************************/
  function Stack (){
    var st={};
    this.init = function (id){
      if (!st[id]){
        st[id] = [];
      }
    }
    this.empty = function (id){
      var i;
      if (!st[id]) {
        return true;
      }    
      for(i = 0; i < st[id].length; i++){
        if (st[id][i]){
          return false
        }
      }
      return true;
    }
    this.add = function (id, v){
      this.init(id);
      st[id].push(v);
    }
    this.addNext = function (id, v){
      var t=[], i, k = 0;
      this.init(id);
      for(i = 0; i < st[id].length; i++){
        if (!st[id][i]){
          continue;
        }
        if (k == 1) {
          t.push(v);
        }
        t.push(st[id][i]);
        k++;
      }
      if (k < 2) {
        t.push(v);
      }
      st[id] = t;
    }
    this.get = function (id){
      var i;
      if (st[id]){
        for(i = 0; i < st[id].length; i++){
          if (st[id][i]) {
            return st[id][i];
          }
        }
      }
      return false;
    }
    this.ack = function (id){
      var i;
      if (st[id]) {
        for(i = 0; i < st[id].length; i++){                     
          if (st[id][i]) {
            delete st[id][i];
            break;
          }
        }
        if (this.empty(id)){
          delete st[id];
        }
      }
    }
  }
  /***************************************************************************/
  /*                              CLUSTERER                                  */
  /***************************************************************************/

  function Clusterer(){
    var markers = [], events=[], stored=[], latest=[], redrawing = false, redraw;
    
    this.events = function(){
      for(var i=0; i<arguments.length; i++){
        events.push(arguments[i]);
      }
    }
    
    this.startRedraw = function(){
      if (!redrawing){
        redrawing = true;
        return true;
      }
      return false;
    }
    
    this.endRedraw = function(){
      redrawing = false;
    }
    
    this.redraw = function(){
      var i, args = [], that = this; 
      for(i=0; i<arguments.length; i++){
        args.push(arguments[i]);
      }
      if (this.startRedraw){
        redraw.apply(that, args);
        this.endRedraw();
      } else {
        setTimeout(function(){
            that.redraw.apply(that, args);
          },
          50
        );
      }
    };
    
    this.setRedraw = function(fnc){
      redraw  = fnc;
    }
    
    this.store = function(data, obj){
      stored.push({data:data, obj:obj});
    }
    
    this.free = function(){
      for(var i = 0; i < events.length; i++){
        google.maps.event.removeListener(events[i]);
      }
      events=[];
      this.freeAll();
    }
    
    this.freeIndex = function(i){
      if (typeof(stored[i].obj.setMap) === 'function') {
        stored[i].obj.setMap(null);
      }
      if (typeof(stored[i].obj.remove) === 'function') {
        stored[i].obj.remove();
      }
      delete stored[i].obj;
      delete stored[i].data;
      delete stored[i];
    }
    
    this.freeAll = function(){
      var i;
      for(i = 0; i < stored.length; i++){
        if (stored[i]) {
          this.freeIndex(i);
        }
      }
      stored = [];
    }
    
    this.freeDiff = function(clusters){
      var i, j, same = {}, idx = [];
      for(i=0; i<clusters.length; i++){
        idx.push( clusters[i].idx.join('-') );
      }
      for(i = 0; i < stored.length; i++){
        if (!stored[i]) {
          continue;
        }
        j = $.inArray(stored[i].data.idx.join('-'), idx);
        if (j >= 0){
          same[j] = true;
        } else {
          this.freeIndex(i);
        }
      }
      return same;
    }
    
    this.add = function(latLng, marker){
      markers.push({latLng:latLng, marker:marker});
    }
    
    this.get = function(i){
      return markers[i];
    }
    
    this.clusters = function(map, radius, force){
      var proj = map.getProjection(),
          nwP = proj.fromLatLngToPoint(
            new google.maps.LatLng(
                map.getBounds().getNorthEast().lat(),
                map.getBounds().getSouthWest().lng()
            )
          ),
          i, j, j2, p, x, y, k, k2, 
          z = map.getZoom(),
          pos = {}, 
          saved = {},
          unik = {},
          clusters = [],
          cluster,
          chk,
          lat, lng, keys, cnt,
          bounds = map.getBounds();
      
      cnt = 0;
      keys = {};
      for(i = 0; i < markers.length; i++){
        if (!bounds.contains(markers[i].latLng)){
          continue;
        }
        p = proj.fromLatLngToPoint(markers[i].latLng);
        pos[i] = [
          Math.floor((p.x - nwP.x) * Math.pow(2, z)),
          Math.floor((p.y - nwP.y) * Math.pow(2, z))
        ];
        keys[i] = true;
        cnt++;
      }
      // check if visible markers have changed 
      if (!force){
        for(k = 0; k < latest.length; k++){
          if( k in keys ){
            cnt--;
          } else {
            break;
          }
        }
        if (!cnt){
          return false; // no change
        }
      }
      
      // save current keys to check later if an update has been done 
      latest = keys;
      
      keys = [];
      for(i in pos){
        x = pos[i][0];
        y = pos[i][1];
        if ( !(x in saved) ){
          saved[x] = {};
        }
        if (!( y in saved[x]) ) {
          saved[x][y] = i;
          unik[i] = {};
          keys.push(i);
        }
        unik[ saved[x][y] ][i] = true;
      }
      radius = Math.pow(radius, 2);
      delete(saved);
      
      k = 0;
      while(1){
        while((k <keys.length) && !(keys[k] in unik)){
          k++;
        }
        if (k == keys.length){
          break;
        }
        i = keys[k];
        lat = pos[i][0];
        lng = pos[i][1];
        saved = null;
        
        do{
          cluster = {lat:0, lng:0, idx:[]};
          for(k2 = k; k2<keys.length; k2++){
            if (!(keys[k2] in unik)){
              continue;
            }
            j = keys[k2];
            if ( Math.pow(lat - pos[j][0], 2) + Math.pow(lng-pos[j][1], 2) <= radius ){
              for(j2 in unik[j]){
                cluster.lat += markers[j2].latLng.lat();
                cluster.lng += markers[j2].latLng.lng();
                cluster.idx.push(j2);
              }
            }
          }
          cluster.lat /= cluster.idx.length;
          cluster.lng /= cluster.idx.length;
          if (!saved){
            chk = cluster.idx.length > 1;
            saved = cluster;
          } else {
            chk = cluster.idx.length > saved.idx.length;
            if (chk){
              saved = cluster;
            }
          }
          if (chk){
            p = proj.fromLatLngToPoint( new google.maps.LatLng(saved.lat, saved.lng) );
            lat = Math.floor((p.x - nwP.x) * Math.pow(2, z));
            lng = Math.floor((p.y - nwP.y) * Math.pow(2, z));
          }
         } while(chk);
         
         for(k2 = 0; k2 < saved.idx.length; k2++){
          if (saved.idx[k2] in unik){
            delete(unik[saved.idx[k2]]);
          }
         }
        clusters.push(saved);
      }
      return clusters;
    }
    
    this.getBounds = function(){
      var i, bounds = new google.maps.LatLngBounds();
      for(i = 0; i < markers.length; i++){
        bounds.extend(markers[i].latLng);
      }
      return bounds;
    }
  }

  /***************************************************************************/
  /*                                GMAP3                                    */
  /***************************************************************************/
  
  var gmap3 = {
    _ids:{},
    _properties:['events','onces','options','apply', 'callback', 'data', 'tag'],
    
    _default:{
      verbose:false,
      unit: 'mi',
      init:{
        mapTypeId : google.maps.MapTypeId.ROADMAP,
        center:[46.578498,2.457275],
        zoom: 2
      }
    },
    _running:{
    },
    _stack: new Stack(),
    /**
     * @desc create default structure if not existing
     **/
    _init: function($this, id){
      if (!this._ids[id]) {
        this._ids[id] = {
          $this:$this,
          styles: {},
          stored:{},
          map:null
        };
      }
    },
    /**
     * @desc store actions to do in a stack manager
     **/
    _plan: function($this, id, list){
      var k;
      this._init($this, id);
      for(k = 0; k < list.length; k++) {
        this._stack.add(id, list[k] );
      }
      this._run(id);
    },
    /**
     * @desc return true if action has to be executed directly
     **/
    _isDirect: function(id, todo){
      var action = this._ival(todo, 'action'),
          directs = {
            distance    :true,
            earthradius :true,
            get         :true
          };
      return action in directs;
    },
    /**
     * @desc execute action directly
     **/
    _direct: function(id, todo){
      var action = this._ival(todo, 'action');
      if (action.substr(0,1) == ':'){
        action = action.substr(1);
      }
      return this[action](id, $.extend({}, action in this._default ? this._default[action] : {}, todo.args ? todo.args : todo));
    }, 
    /**
     * @desc store one action to do in a stack manager after the first
     **/
    _planNext: function(id, a){
      var $this = this._jObject(id);
      this._init($this, id);
      this._stack.addNext(id, a);
    },
    /**
     * @desc called when action in finished, to acknoledge the current in stack and start next one
     **/
    _end: function(id){
      delete this._running[id];
      this._stack.ack(id);
      this._run(id);
    },
    /**
     * @desc if not running, start next action in stack
     **/
    _run: function(id){
      if (this._running[id]) return;
      var a = this._stack.get(id);
      if (!a) return;
      this._running[id] = true;
      this._proceed(id, a);
    },
    
    _geocoder: null,
    _getGeocoder: function(){
      if (!this._geocoder) this._geocoder = new google.maps.Geocoder();
      return this._geocoder;
    },
    
    _directionsService: null,
    _getDirectionsService: function(){
      if (!this._directionsService) this._directionsService = new google.maps.DirectionsService();
      return this._directionsService;
    },
    
    _elevationService: null,
    _getElevationService: function(){
      if (!this._elevationService) this._elevationService = new google.maps.ElevationService();
      return this._elevationService;
    },
    
    _maxZoomService:null,
    _getMaxZoomService: function(){
      if (!this._maxZoomService) this._maxZoomService = new google.maps.MaxZoomService();
      return this._maxZoomService;
    },
    
    _getMap: function( id ){
      return this._ids[id].map;
    },
    
    _setMap: function (id, map){
      this._ids[id].map = map;
    },
    
    _jObject: function( id ){
      return this._ids[id].$this;
    },
    
    _addStyle: function(id, styleId, style){
      this._ids[id].styles[ styleId ] = style;
    },
    
    _getStyles: function(id){
      return this._ids[id].styles;
    },
    
    _getStyle: function(id, styleId){
      return this._ids[id].styles[ styleId ];
    },
    
    _styleExist: function(id, styleId){
      return this._ids[id] && this._ids[id].styles[ styleId ];
    },
    
    _getDirectionRenderer: function(id){
      return this._getStored(id, 'directionrenderer');
    },
    
    _exist: function(id){
      return this._ids[id].map ? true : false;
    },
    
    /**
     * @desc return last non-null object
     **/
    _getStored: function(id, name, last, tag){
      if (!this._ids[id].stored[name] || !this._ids[id].stored[name].length){
        return null;
      }
      var t = this._ids[id].stored[name],
          i,
          idx = last ? t.length : -1,
          add = last ? -1 : 1;
      for(i=0; i<t.length; i++){
        idx += add;
        if (t[idx]){
          if (tag !== undefined) {
            if ( (t[idx].tag === undefined) || ($.inArray(t[idx].tag, tag) < 0) ){
              continue;
            }
          }
          return t[idx].obj;
        }
      }
      return null;
    },
    
    /**
     * @desc return an object from its reference
     **/
    _getStoredId: function(id, ref){
      ref = ref.split('-');
      if ((ref.length == 2) && this._ids[id].stored[ref[0]] && this._ids[id].stored[ref[0]][ref[1]]){
        return this._ids[id].stored[ref[0]][ref[1]].obj;
      }
      return null;
    },
    
    /**
     * @desc add an object in the stored structure
     **/
    _store: function(id, name, obj, todo){
      name = name.toLowerCase();
      if (!this._ids[id].stored[name]){
        this._ids[id].stored[name] = [];
      }
      this._ids[id].stored[name].push({obj:obj, tag:this._ival(todo, 'tag')});
      return name + '-' + (this._ids[id].stored[name].length-1);
    },
    
    /**
     * @desc remove an object from the stored structure
     **/
    _unstore: function(id, name, tag, pop){
      var idx, t = this._ids[id].stored[name];
      if (!t) return false;
      if (tag !== undefined){
        if (pop){
          for(idx = t.length - 1; idx >= 0; idx--){
            if ( (t[idx] !== undefined) && (t[idx].tag !== undefined) && ($.inArray(t[idx].tag, tag) >= 0) ){
              break;
            }
          }
        } else {
          for(idx = 0; idx < t.length; idx++){
            if ( (t[idx] !== undefined) && (t[idx].tag !== undefined) && ($.inArray(t[idx].tag, tag) >= 0) ){
              break;
            }
          }
        }
      } else {
        idx = pop ? t.length - 1 : 0;
      }
      if ( !(idx in t) ) {
        return false;
      }
      // Google Map element
      if (typeof(t[idx].obj.setMap) === 'function') {
        t[idx].obj.setMap(null);
      }
      // JQuery
      if (typeof(t[idx].obj.remove) === 'function') {
        t[idx].obj.remove();
      }
      // internal (cluster)
      if (typeof(t[idx].obj.free) === 'function') {
        t[idx].obj.free();
      }
      delete t[idx].obj;
      if (tag !== undefined){
        this._ids[id].stored[name] = this._rmFromArray(t,idx);
      } else {
        if (pop) {
          t.pop();
        } else {
          t.shift();
        }
      }
      return true;
    },
    
    /**
     * @desc manage remove objects
     **/
    _clear: function(id, list, last, first, tag){
      var n, i;
      if (!list || !list.length){
        list = [];
        for(k in this._ids[id].stored){ 
          list.push(k);
        }
      } else {
        list = this._array(list);
      }
      for(i = 0; i < list.length; i++){
        if (list[i]){
          n = list[i].toLowerCase();
          if (!this._ids[id].stored[n]) continue;
          if (last){
            this._unstore(id, n, tag, true);
          } else if (first){
            this._unstore(id, n, tag, false);
          } else {
            while (this._unstore(id, n, tag, false));
          }
        }
      }
    },
    
    /**
     * @desc return true if "init" action must be run
     **/
    _autoInit: function(name){
      var i,
          names = [
            'init', 
            'geolatlng', 
            'getlatlng', 
            'getroute',
            'getelevation', 
            'addstyledmap',
            'setdefault', 
            'destroy'
          ];
      if ( !name ) {
        return true;
      }
      for(i = 0; i < names.length; i++){
        if (names[i] === name) {
          return false;
        }
      }
      return true;
    },
    /**
     * @desc call functions associated
     * @param
     *  id      : string
     *  action  : string : function wanted
     *     
     *  options : {}
     *     
     *    O1    : {}
     *    O2    : {}
     *    ...
     *    On    : {}
     *      => On : option : {}
     *          action : string : function name
     *          ... (depending of functions called)
     *             
     *  args    : [] : parameters for directs call to map
     *  target? : object : replace map to call function 
     **/
    _proceed: function(id, todo){
      todo = todo || {};
      var action = this._ival(todo, 'action') || 'init',
          iaction = action.toLowerCase(),
          ok = true,
          target = this._ival(todo, 'target'), 
          args = this._ival(todo, 'args'),
          map, out;
      if ( !this._exist(id) && this._autoInit(iaction) ){
        this.init(id, $.extend({}, this._default.init, todo.args && todo.args.map ? todo.args.map : todo.map ? todo.map : {}), true);
      }
      if (!target && !args && (iaction in this) && (typeof(this[iaction]) === 'function')){
        // framework functions
        this[iaction](id, $.extend({}, iaction in this._default ? this._default[iaction] : {}, todo.args ? todo.args : todo)); // call fnc and extends defaults data
      } else {
        if (target && (typeof(target) === 'object')){
          if (typeof(target[action]) === 'function'){
            out = target[action].apply(target, todo.args ? todo.args : []);
          } else ok = false;
        // gm direct function :  no result so not rewrited, directly wrapped using array "args" as parameters (ie. setOptions, addMapType, ...)
        } else {
          map = this._getMap(id);
          if (typeof(map[action]) === 'function'){
            out = map[action].apply(map, todo.args ? todo.args : [] );
          } else ok = false;
        }
        if (!ok && this._default.verbose) alert("unknown action : " + action);
        this._callback(id, out, todo);
        this._end(id);
      }
    },
    
    /**
     * @desc call a function of framework or google map object of the instance
     * @param
     *  id      : string : instance
     *  fncName : string : function name
     *  ... (depending on function called)
     **/
    _call: function(/* id, fncName [, ...] */){
      if ( (arguments.length < 2) || (!this._exist(arguments[0])) ){
        return ;
      }
      var i, id = arguments[0],
          fname = arguments[1],
          map = this._getMap(id),
          args = [];
      if (typeof(map[ fname ]) !== 'function') {
        return;
      }
      for(i=2; i<arguments.length; i++){
        args.push(arguments[i]);
      }
      return map[ fname ].apply( map, args );
    },
    
    /**
     * @desc convert data to array
     **/
    _array: function(mixed){
      var k, a = [];
      if (mixed !== undefined){
        if (typeof(mixed) === 'object'){
          for(k in mixed) {
            a.push(mixed[k]);
          }
        } else{ 
          a.push(mixed);
        }
      }
      return a;
    },
    
    /**
     * @desc create a new Array without some entries
     **/
     _rmFromArray: function(a, key){
      var k, r = [];
      for(k in a){
        if (k != key){
          r.push(a[k]);
        }
      }
      return r;
     },
    
    /**
     * @desc init if not and manage map subcall (zoom, center)
     **/
    _subcall: function(id, todo, latLng){
      var opts = {};
      if (!todo.map) return;
      if (!latLng) {
        latLng = this._ival(todo.map, 'latlng');
      }
      if (!this._exist(id)){
        if (latLng) {
          opts = {center:latLng};
        }
        this.init(id, $.extend({}, todo.map, opts), true);
      } else { 
        if (todo.map.center && latLng) this._call(id, "setCenter", latLng);
        if (todo.map.zoom !== undefined) this._call(id, "setZoom", todo.map.zoom);
        if (todo.map.mapTypeId !== undefined) this._call(id, "setMapTypeId", todo.map.mapTypeId);
      }
    },
    
    /**
     * @desc attach an event to a sender (once) 
     **/
    _attachEvent: function(id, sender, name, f, data, once){
      var that=this, $o = this._jObject(id);
      google.maps.event['addListener'+(once?'Once':'')](sender, name, function(event) {
        f.apply($o, [sender, event, data]);
      });
    },
    
    /**
     * @desc attach events from a container to a sender 
     * todo[
     *  events => { eventName => function, }
     *  onces  => { eventName => function, }  
     *  data   => mixed data         
     * ]
     **/
    _attachEvents : function(id, sender, todo){
      var name;
      if (!todo) return
      if (todo.events){
        for(name in todo.events){
          if (typeof(todo.events[name]) === 'function'){
            this._attachEvent(id, sender, name, todo.events[name], todo.data, false);
          }
        }
      }
      if (todo.onces){
        for(name in todo.onces){
          if (typeof(todo.onces[name]) === 'function'){
            this._attachEvent(id, sender, name, todo.onces[name], todo.data, true);
          }
        }
      }
    },
    
    /**
     * @desc execute callback functions 
     **/
    _callback: function(mixed, result, todo){
      var k, $j;
      if (typeof(todo.callback) === 'function') {
        $j = typeof(mixed) === 'number' ? this._jObject(mixed) : mixed;
        todo.callback.apply($j, [result]);
      } else if (typeof(todo.callback) === 'object') {
        for(k in todo.callback){
          if (!$j) $j = typeof(mixed) === 'number' ? this._jObject(mixed) : mixed;
          if (typeof(todo.callback[k]) === 'function') todo.callback[k].apply($j, [result]);
        }
      }
    },
    
    /**
     * @desc execute end functions 
     **/
    _manageEnd: function(id, sender, todo, internal){
      var k, c;
      if (sender && (typeof(sender) === 'object')){
        this._attachEvents(id, sender, todo);
        for(k in todo.apply){
          c = todo.apply[k];
          if(!c.action) continue;
          if (typeof(sender[c.action]) !== 'function') { 
            continue;
          }
          if (c.args) {
            sender[c.action].apply(sender, c.args);
          } else {
            sender[c.action]();
          }
        }
      }
      if (!internal) {
        this._callback(id, sender, todo);
        this._end(id);
      }
    },
    
    /**
     * @desc return true if mixed is usable as number
     **/
    _isNumeric: function (mixed){
      return (typeof(mixed) === 'number' || typeof(mixed) === 'string') && mixed !== '' && !isNaN(mixed);
    },
    
    /**
     *  @desc convert mixed [ lat, lng ] objet by google.maps.LatLng
     **/
    _latLng: function(mixed, emptyReturnMixed, noFlat){
      var k, latLng={}, i=0,
          empty = emptyReturnMixed ? mixed : null;
      if (!mixed || (typeof(mixed) === 'string')){
        return empty;
      }
      if (mixed.latLng) {
        return this._latLng(mixed.latLng);
      }
      if (typeof(mixed.lat) === 'function') {
        return mixed;
      } else if ( this._isNumeric(mixed.lat) ) {
        return new google.maps.LatLng(mixed.lat, mixed.lng);
      } else if ( !noFlat ){
        for(k in mixed){
          if ( !this._isNumeric(mixed[k]) ) return empty;
          latLng[i?'lng':'lat'] = mixed[k];
          if (i) break;
          i++;
        }
        if (i) return new google.maps.LatLng(latLng.lat, latLng.lng);
      }
      return empty;
    },
    
    _count: function(mixed){
      var k, c = 0;
      for(k in mixed) c++;
      return c;
    },
    
    /**
     * @desc convert mixed [ sw, ne ] object by google.maps.LatLngBounds
     **/
    _latLngBounds: function(mixed, flatAllowed, emptyReturnMixed){
      var empty, cnt, ne, sw, k, t, ok, nesw, i;
      if (!mixed) {
        return null;
      }
      empty = emptyReturnMixed ? mixed : null;
      if (typeof(mixed.getCenter) === 'function') {
        return mixed;
      }
      cnt = this._count(mixed);
      if (cnt == 2){
        if (mixed.ne && mixed.sw){
          ne = this._latLng(mixed.ne);
          sw = this._latLng(mixed.sw);
        } else {
          for(k in mixed){
            if (!ne) {
              ne = this._latLng(mixed[k]);
            } else {
              sw = this._latLng(mixed[k]);
            }
          }
        }
        if (sw && ne) return new google.maps.LatLngBounds(sw, ne);
        return empty;
      } else if (cnt == 4){
        t = ['n', 'e', 's', 'w'];
        ok=true;
        for(i in t) ok &= this._isNumeric(mixed[t[i]]);
        if (ok) return new google.maps.LatLngBounds(this._latLng([mixed.s, mixed.w]), this._latLng([mixed.n, mixed.e]));
        if (flatAllowed){
          i=0;
          nesw={};
          for(k in mixed){
            if (!this._isNumeric(mixed[k])) return empty;
            nesw[t[i]] = mixed[k];
            i++;
          }
          return new google.maps.LatLngBounds(this._latLng([nesw.s, nesw.w]), this._latLng([nesw.n, nesw.e]));
        }
      }
      return empty;
    },
    
    /**
     * @desc search an (insensitive) key
     **/
    _ikey: function(object, key){
      if (key.toLowerCase){
        key = key.toLowerCase();
        for(var k in object){
          if (k.toLowerCase && (k.toLowerCase() == key)) return k;
        }
      }
      return false;
    },
    
    /**
     * @desc search an (insensitive) key
     **/
    _ival: function(object, key, def){
      var k = this._ikey(object, key);
      if ( k ) return object[k];
      return def;
    },
    
    /**
     * @desc return true if at least one key is set in object
     * nb: keys in lowercase
     **/
    _hasKey: function(object, keys){
      var n, k;
      if (!object || !keys) return false;
      for(n in object){
        if (n.toLowerCase){
          n = n.toLowerCase();
          for(k in keys){
            if (n == keys[k]) return true;
          }
        }
      }
      return false;
    },
    
    /**
     * @desc return a standard object
     * nb: include in lowercase
     **/
    _extractObject: function(todo, include, r){
      if (this._hasKey(todo, this._properties) || this._hasKey(todo, include)){
        var k, p, ip, r={};
        for(k in this._properties){
          p=this._properties[k];
          ip = this._ikey(todo, p);
          r[p] = ip ? todo[ip] : {};
        }
        for(k in include){
          p=include [k];
          ip = this._ikey(todo, p);
          if (ip) r[p] = todo[ip];
        }
        return r;
      } else {
        r.options= {};
        for(k in todo){
          if (k === 'action') continue;
          r.options[k] = todo[k];
        }
        return r;
      }
    },
    
    /**
     * @desc identify object from object list or parameters list : [ objectName:{data} ] or [ otherObject:{}, ] or [ object properties ]
     * nb: include, exclude in lowercase
     **/
    _object: function(name, todo, include, exclude){
      var k = this._ikey(todo, name),
          p, r = {}, keys=['map'], 
          cb='callback';
      r[cb] = this._ival(todo, cb);
      if (k) return this._extractObject(todo[k], include, r);
      for(k in exclude) keys.push(exclude[k]);
      if (!this._hasKey(todo, keys)) r = this._extractObject(todo, include, r);
      for(k in this._properties){
        p=this._properties[k];
        if (!r[p]) r[p] = {};
      }
      return r;
    },
    
    /**
     * @desc Returns the geographical coordinates from an address and call internal method
     **/
    _resolveLatLng: function(id, todo, method, all){
      var address = this._ival(todo, 'address'),
          region, params,
          that = this, cb;
      if ( address ){
          cb = function(results, status) {
          if (status == google.maps.GeocoderStatus.OK){
            that[method](id, todo, all ? results : results[0].geometry.location);
          } else {
            if (that._default.verbose){
              alert('Geocode error : ' + status);
            }
            that[method](id, todo, false);
          }
        };
        if (typeof(address) === 'object'){
          params = address;
        } else {
          params = { 'address': address };
          region = this._ival(todo, 'region');
          if (region){
            params.region = region;
          }
        }
        this._getGeocoder().geocode( params, cb );
      } else {
        this[method](id, todo, this._latLng(todo, false, true));
      }
    },
    
    /*============================*/
    /*          PUBLIC            */
    /*============================*/
    
    /**
     * @desc Destroy an existing instance
     **/
    destroy: function(id, todo){
      var k, $j;
      if (this._ids[id]){
        this._clear(id);
        this._ids[id].$this.empty();
        if (this._ids[id].bl) delete this._ids[id].bl;
        for(k in this._ids[id].styles){
          delete this._ids[id].styles[ k ];
        }
        delete this._ids[id].map;
        $j = this._jObject(id);
        delete this._ids[id];
        this._callback($j, null, todo);
      }
      this._end(id);
    },
    
    /**
     * @desc Initialize google map object an attach it to the dom element (using id)
     **/
    init: function(id, todo, internal){
      var o, opts, map, styles, k, $this;
      if ( (id == '') || (this._exist(id)) ) return this._end(id);
      o = this._object('map', todo);
      if ( (typeof(o.options.center) === 'boolean') && o.options.center) {
        return false; // wait for an address resolution
      }
      opts = $.extend({}, this._default.init, o.options);
      if (!opts.center) {
        opts.center = [this._default.init.center.lat, this._default.init.center.lng];
      }
      opts.center = this._latLng(opts.center);
      $this = this._jObject(id);
      this._setMap(id, new google.maps.Map($this.get(0), opts));
      map = this._getMap(id);
      
      // add previous added styles
      styles = this._getStyles( id );
      for(k in styles) map.mapTypes.set(k, styles[k]);
      
      this._manageEnd(id, map, o, internal);
      return true;
    },
    
    /**
     * @desc Returns the geographical coordinates from an address
     **/
    getlatlng: function(id, todo){
      this._resolveLatLng(id, todo, '_getLatLng', true);
    },
    _getLatLng: function(id, todo, results){
      this._manageEnd(id, results, todo);
    },
    
    /**
     * @desc Return address from latlng        
     **/
    getaddress: function(id, todo){
      var callback,
          $this = this._jObject(id),
          latLng = this._latLng(todo, false, true),
          address = this._ival(todo, 'address'),
          params = latLng ?  {latLng:latLng} : ( address ? (typeof(address) === 'string' ? {address:address} : address) : null),
          cb = this._ival(todo, 'callback');
      if (params && cb && typeof(cb) === 'function') {
        callback = function(results, status) {
          var out = status == google.maps.GeocoderStatus.OK ? results : false;
          cb.apply($this, [out, status]);
        };
        this._getGeocoder().geocode(params, callback);
      }
      this._end(id);
    },
    
    /**
     * @desc Return a route
     **/
    getroute: function(id, todo){
      var callback,
          $this = this._jObject(id),
          cb = this._ival(todo, 'callback');
      if ( (typeof(cb) === 'function') && todo.options ) {
        todo.options.origin = this._latLng(todo.options.origin, true);
        todo.options.destination = this._latLng(todo.options.destination, true);
        callback = function(results, status) {
          var out = status == google.maps.DirectionsStatus.OK ? results : false;
          cb.apply($this, [out, status]);
        };
        this._getDirectionsService().route( todo.options, callback );
      }
      this._end(id);
    },
    /**
     *  @desc return elevation
     **/
    getelevation: function(id, todo){
      var callback, latLng, ls, k, path, samples,
          locations = [],
          $this = this._jObject(id),
          cb = this._ival(todo, 'callback'),
          latLng = this._ival(todo, 'latlng');
      if (cb && typeof(cb) === 'function') {
        callback = function(results, status) {
          var out = status == google.maps.ElevationStatus.OK ? results : false;
          cb.apply($this, [out, status]);
        };
        if (latLng){
          locations.push( this._latLng(latLng) );
        } else {
          ls = this._ival(todo, 'locations');
          if (ls){
            for(k in ls){
              locations.push( this._latLng(ls[k]) );
            }
          }
        }
        if (locations.length){
          this._getElevationService().getElevationForLocations({locations:locations}, callback);
        } else {
          path = this._ival(todo, 'path');
          samples = this._ival(todo, 'samples');
          if (path && samples){
            for(k in path){
              locations.push(this._latLng(path[k]));
            }
            if (locations.length){
              this._getElevationService().getElevationAlongPath( {path:locations, samples:samples}, callback );
            }
          }
        }
      }
      this._end(id);
    },
    
    /**
     * @desc Add a marker to a map after address resolution
     * if [infowindow] add an infowindow attached to the marker   
     **/
    addmarker: function(id, todo){
      this._resolveLatLng(id, todo, '_addMarker');
    },
    
    _addMarker: function(id, todo, latLng, internal){
      var result, oi, to,
          n = 'marker', niw = 'infowindow',
          o = this._object(n, todo, ['to']);
      if (!internal){
        if (!latLng) {
          this._manageEnd(id, false, o);
          return;
        }
        this._subcall(id, todo, latLng);
      } else if (!latLng){
        return;
      }
      if (o.to){
        to = this._getStoredId(id, o.to);
        result = to && (typeof(to.add) === 'function');
        if (result){
          to.add(latLng, todo);
          if (typeof(to.redraw) === 'function'){
            to.redraw();
          }
        }
        if (!internal){
          this._manageEnd(id, result, o);
        }
      } else {
        o.options.position = latLng;
        o.options.map = this._getMap(id);
        result = new google.maps.Marker(o.options);
        if ( todo[niw] ){
          oi = this._object(niw, todo[niw], ['open']);
          if ( (oi['open'] === undefined) || oi['open'] ) {
            oi.apply = this._array(oi.apply);
            oi.apply.unshift({action:'open', args:[this._getMap(id), result]});
          }
          oi.action = 'add'+niw;
          this._planNext(id, oi); 
        }
        if (!internal){
          this._store(id, n, result, o);
          this._manageEnd(id, result, o);
        }
      }
      return result;
    },
    
    /**
     * @desc Add markers (without address resolution)
     **/
    addmarkers: function(id, todo){
      if (this._ival(todo, 'clusters')){
        this._addclusteredmarkers(id, todo);
      } else {
        this._addmarkers(id, todo);
      }
    },
    _addmarkers: function(id, todo){
      var result, o, k, latLng, marker, options = {}, tmp, to,
          n = 'marker',
          markers = this._ival(todo, 'markers');
      this._subcall(id, todo);
      if ( !markers || (typeof(markers) !== 'object') ) {
        return this._end(id);
      }
      o = this._object(n, todo, ['to', 'markers']);
      
      if (o.to){
        to = this._getStoredId(id, o.to);
        result = to && (typeof(to.add) === 'function');
        if (result){
          for(k in markers){
            latLng = this._latLng(markers[k]);
            if (!latLng) continue;
            to.add(latLng, markers[k]);
          }
          if (typeof(to.redraw) === 'function'){
            to.redraw();
          }
        }
        this._manageEnd(id, result, o);
      } else {
        $.extend(true, options, o.options);
        options.map = this._getMap(id);
        result = [];
        for(k in markers){
          latLng = this._latLng(markers[k]);
          if (!latLng) continue;
          if (markers[k].options){
            tmp = {};
            $.extend(true, tmp, options, markers[k].options);
            o.options = tmp;
          } else {
            o.options = options;
          }
          o.options.position = latLng;
          marker = new google.maps.Marker(o.options);
          result.push(marker);
          o.data = markers[k].data;
          o.tag = markers[k].tag;
          this._store(id, n, marker, o);
          this._manageEnd(id, marker, o, true);
        }
        o.options = options; // restore previous for futur use
        this._callback(id, result, todo);
        this._end(id);
      }
    },
    
    getscale: function(id, todo, internal){
      var map = this._getMap(id),
          zoom = map.getZoom(),
          scales = [
            77.864462034120315,
            45.42785688110077,
            16.220730575856892,
            6.879509682822463,
            3.5034960477802986,
            1.8034610362879133,
            0.9127181102723314,
            0.4598746767146186,
            0.23053567913908648,
            0.11545247438886701,
            0.05775371939320953,
            0.02881647975962874,
            0.014414070716531697,
            0.007207618499622224,
            0.003603886381819732,
            0.0018015948787526637,
            0.0009008246767800296,
            0.0004504160086085826,
            0.00022520761796505934,
            0.00011260535432642145,
            0.00005630113180858676
          ];
      scale = scales[zoom];
      if (!internal){
        this._callback(id, scale, todo);
        this._end(id);
      }
      return scale;
    },
    _addclusteredmarkers:function(id, todo){
      var clusterer, i, latLng, storeId,
          that = this,
          radius = this._ival(todo, 'radius'),
          markers = this._ival(todo, 'markers'),
          styles = this._ival(todo, 'clusters');
          
      if (! this._getMap(id).getBounds() ){ // map not initialised => bounds not available
        // wait for map
        google.maps.event.addListenerOnce(
          this._getMap(id), 
          'bounds_changed', 
          function() {
            that._addclusteredmarkers(id, todo);
          }
        );
        return;
      }
      
      if (typeof(radius) === 'number'){
        clusterer = new Clusterer();
        for (i = 0 ; i < markers.length; i++){
          latLng = this._latLng(markers[i]);
          clusterer.add(latLng, markers[i]);
        }
        storeId = this._initClusters(id, todo, clusterer, radius, styles);
      }
      
      this._callback(id, storeId, todo);
      this._end(id);
    },
    
    _initClusters: function(id, todo, clusterer, radius, styles){
      var that=this, 
          map = this._getMap(id);
          
      clusterer.setRedraw(function(force){
        var same, clusters = clusterer.clusters(map, radius, force);
        if (clusters){
          same = clusterer.freeDiff(clusters);
          that._displayClusters(id, todo, clusterer, clusters, same, styles);
        }
      });
      
      clusterer.events(
        google.maps.event.addListener(
          map, 
          'zoom_changed',
          function() {
            clusterer.redraw(true);
          }
        ),
        google.maps.event.addListener(
          map, 
          'bounds_changed',
          function() {
            clusterer.redraw();
          }
        )
      );
      
      clusterer.redraw();
      return this._store(id, 'cluster', clusterer, todo);
    },
    
    _displayClusters: function(id, todo, clusterer, clusters, same, styles){
      var k, i, ii, m, done, obj, cluster, options = {}, tmp,
          atodo,
          ctodo = this._ival(todo, 'cluster') || {},
          mtodo = this._ival(todo, 'marker') || todo;
      for(i = 0; i < clusters.length; i++){
        if (i in same){
          continue;
        }
        cluster = clusters[i];
        done = false;
        if (cluster.idx.length > 1){
          m = 0;
          for(k in styles){
            if ( (k > m) && (k <= cluster.idx.length) ){
              m = k;
            }
          }
          if (styles[m]){
            atodo = {
              content:styles[m].content.replace('CLUSTER_COUNT', cluster.idx.length),
              offset:{
                x: -this._ival(styles[m], 'width')/2,
                y: -this._ival(styles[m], 'height')/2
              }
            };
            obj = this._addOverlay(id, atodo, this._latLng(cluster), true);
            
            ctodo.data = {
              latLng: this._latLng(cluster),
              markers:[]
            };
            for(ii=0; ii<cluster.idx.length; ii++){
              ctodo.data.markers.push(
                clusterer.get(cluster.idx[ii]).marker
              );
            }
            this._attachEvents(id, obj, ctodo);
            clusterer.store(cluster, obj);
            done = true;
          }
        }
        if (!done){
          $.extend(true, options, mtodo.options);
          for(ii = 0; ii <cluster.idx.length; ii++){
            m = clusterer.get(cluster.idx[ii]);
            mtodo.latLng = m.latLng;
            mtodo.data = m.marker.data;
            mtodo.tag = m.marker.tag;
            if (m.marker.options){
              tmp = {};
              $.extend(true, tmp, options, m.marker.options);
              mtodo.options = tmp;
            } else {
              mtodo.options = options;
            }
            obj = this._addMarker(id, mtodo, mtodo.latLng, true);
            this._attachEvents(id, obj, mtodo);
            clusterer.store(cluster, obj);
          }
          mtodo.options = options; // restore previous for futur use
        }
      }
    },
    
    /**
     * @desc Add an infowindow after address resolution
     **/
    addinfowindow: function(id, todo){ 
      this._resolveLatLng(id, todo, '_addInfoWindow');
    },
    _addInfoWindow: function(id, todo, latLng){
      var o, infowindow, args = [],
          n = 'infowindow';
      this._subcall(id, todo, latLng);
      o = this._object(n, todo, ['open', 'anchor']);
      if (latLng) {
        o.options.position = latLng;
      }
      infowindow = new google.maps.InfoWindow(o.options);
      if ( (o.open === undefined) || o.open ){
        o.apply = this._array(o.apply);
        args.push(this._getMap(id));
        if (o.anchor){
          args.push(o.anchor);
        }
        o.apply.unshift({action:'open', args:args});
      }
      this._store(id, n, infowindow, o);
      this._manageEnd(id, infowindow, o);
    },
    
    /**
     * @desc add a polygone / polylin on a map
     **/
    addpolyline: function(id, todo){
      this._addPoly(id, todo, 'Polyline', 'path');
    },
    addpolygon: function(id, todo){
      this._addPoly(id, todo, 'Polygon', 'paths');
    },
    _addPoly: function(id, todo, poly, path){
      var i, 
          obj, latLng, 
          o = this._object(poly.toLowerCase(), todo, [path]);
      if (o[path]){
        o.options[path] = [];
        for(i = 0; i < o[path].length; i++){
          latLng = this._latLng(o[path][i]);
          if (latLng){
            o.options[path].push(this._latLng(o[path][i]));
          }
        }
      }
      obj = new google.maps[poly](o.options);
      obj.setMap(this._getMap(id));
      this._store(id, poly.toLowerCase(), obj, o);
      this._manageEnd(id, obj, o);
    },
    
    /**
     * @desc add a circle   
     **/
    addcircle: function(id, todo){
      this._resolveLatLng(id, todo, '_addCircle');
    },
    _addCircle: function(id, todo, latLng ){
      var c, n = 'circle',
          o = this._object(n, todo);
      if (!latLng) latLng = this._latLng(o.options.center);
      if (!latLng) return this._manageEnd(id, false, o);
      this._subcall(id, todo, latLng);
      o.options.center = latLng;
      o.options.map = this._getMap(id);
      c = new google.maps.Circle(o.options);
      this._store(id, n, c, o);
      this._manageEnd(id, c, o);
    },
    
    /**
     * @desc add a rectangle   
     **/
    addrectangle: function(id, todo){
      this._resolveLatLng(id, todo, '_addRectangle');
    },
    _addRectangle: function(id, todo, latLng ){
      var r, n = 'rectangle',
          o = this._object(n, todo);
      o.options.bounds = this._latLngBounds(o.options.bounds, true);
      if (!o.options.bounds) return this._manageEnd(id, false, o);
      this._subcall(id, todo, o.options.bounds.getCenter());
      o.options.map = this._getMap(id);
      r = new google.maps.Rectangle(o.options);
      this._store(id, n, r, o);
      this._manageEnd(id, r, o);
    },
    
    /**
     * @desc add an overlay to a map after address resolution
     **/
    addoverlay: function(id, todo){
      this._resolveLatLng(id, todo, '_addOverlay');
    },
    _addOverlay: function(id, todo, latLng, internal){
      var ov, map,
          o = this._object('overlay', todo),
          opts =  $.extend({
                    pane: 'floatPane',
                    content: '',
                    offset:{
                      x:0,y:0
                    }
                  },
                  o.options),
          $div = $('<div></div>'),
          listeners = [];
      
      this._subcall(id, todo, latLng);
      map = this._getMap(id);
       
      $div
        .css('border', 'none')
        .css('borderWidth', '0px')
        .css('position', 'absolute');
      $div.append($(opts.content));
      
      function f() {
       google.maps.OverlayView.call(this);
        this.setMap(map);
      }            
      
      f.prototype = new google.maps.OverlayView();
      
      f.prototype.onAdd = function() {
        var panes = this.getPanes();
        if (opts.pane in panes) {
          $(panes[opts.pane]).append($div);
        }
      }
      f.prototype.draw = function() {
        var overlayProjection = this.getProjection(),
            ps = overlayProjection.fromLatLngToDivPixel(latLng),
            that = this;
            
        $div
          .css('left', (ps.x+opts.offset.x) + 'px')
          .css('top' , (ps.y+opts.offset.y) + 'px');
        
        $.each( ("dblclick click mouseover mousemove mouseout mouseup mousedown").split(" "), function( i, name ) {
          listeners.push(
            google.maps.event.addDomListener($div[0], name, function(e) {
              google.maps.event.trigger(that, name);
            })
          );
        });
        listeners.push(
          google.maps.event.addDomListener($div[0], "contextmenu", function(e) {
            google.maps.event.trigger(that, "rightclick");
          })
        );
      }
      f.prototype.onRemove = function() {
        for (var i = 0; i < listeners.length; i++) {
          google.maps.event.removeListener(listeners[i]);
        }
        $div.remove();
      }
      f.prototype.hide = function() {
        $div.hide();
      }
      f.prototype.show = function() {
        $div.show();
      }
      f.prototype.toggle = function() {
        if ($div) {
          if ($div.is(':visible')){
            this.show();
          } else {
            this.hide();
          }
        }
      }
      f.prototype.toggleDOM = function() {
        if (this.getMap()) {
          this.setMap(null);
        } else {
          this.setMap(map);
        }
      }
      f.prototype.getDOMElement = function() {
        return $div[0];
      }
      ov = new f();
      if (!internal){
        this._store(id, 'overlay', ov, o);
        this._manageEnd(id, ov, o);
      }
      return ov;
    },
    
    /**
     * @desc add fixed panel to a map
     **/
    addfixpanel: function(id, todo){
      var n = 'fixpanel',
          o = this._object(n, todo),
          x=0, y=0, $c, $div;
      if (o.options.content){
        $c = $(o.options.content);
        
        if (o.options.left !== undefined){
          x = o.options.left;
        } else if (o.options.right !== undefined){
          x = this._jObject(id).width() - $c.width() - o.options.right;
        } else if (o.options.center){
          x = (this._jObject(id).width() - $c.width()) / 2;
        }
        
        if (o.options.top !== undefined){
          y = o.options.top;
        } else if (o.options.bottom !== undefined){
          y = this._jObject(id).height() - $c.height() - o.options.bottom;
        } else if (o.options.middle){
          y = (this._jObject(id).height() - $c.height()) / 2
        }
      
        $div = $('<div></div>')
                .css('position', 'absolute')
                .css('top', y+'px')
                .css('left', x+'px')
                .css('z-index', '1000')
                .append(o.options.content);
        
        this._jObject(id).first().prepend($div);
        this._attachEvents(id, this._getMap(id), o);
        this._store(id, n, $div, o);
        this._callback(id, $div, o);
      }
      this._end(id);
    },
    
    /**
     * @desc Add a direction renderer to a map
     **/
    adddirectionsrenderer: function(id, todo, internal){
      var n = 'directionrenderer',
          dr, o = this._object(n, todo, ['panelId']);
      this._clear(id, n);
      o.options.map = this._getMap(id);
      dr = new google.maps.DirectionsRenderer(o.options);
      if (o.panelId) {
        dr.setPanel(document.getElementById(o.panelId));
      }
      this._store(id, n, dr, o);
      this._manageEnd(id, dr, o, internal);
    },
    
    /**
     * @desc Set direction panel to a dom element from it ID
     **/
    setdirectionspanel: function(id, todo){
      var dr, o = this._object('directionpanel', todo, ['id']);
      if (o.id) {
        dr = this._getDirectionRenderer(id);
        dr.setPanel(document.getElementById(o.id));
      }
      this._manageEnd(id, dr, o);
    },
    
    /**
     * @desc Set directions on a map (create Direction Renderer if needed)
     **/
    setdirections: function(id, todo){
      var dr, o = this._object('directions', todo);
      if (todo) o.options.directions = todo.directions ? todo.directions : (todo.options && todo.options.directions ? todo.options.directions : null);
      if (o.options.directions) {
        dr = this._getDirectionRenderer(id);
        if (!dr) {
          this.adddirectionsrenderer(id, o, true);
          dr = this._getDirectionRenderer(id);
        } else {
          dr.setDirections(o.options.directions);
        }
      }
      this._manageEnd(id, dr, o);
    },
    
    /**
     * @desc set a streetview to a map
     **/
    setstreetview: function(id, todo){
      var o = this._object('streetview', todo, ['id']),
          panorama;
      if (o.options.position){
        o.options.position = this._latLng(o.options.position);
      }
      panorama = new google.maps.StreetViewPanorama(document.getElementById(o.id),o.options);
      this._getMap(id).setStreetView(panorama);
      this._manageEnd(id, panorama, o);
    },
    
    /**
     * @desc add a kml layer to a map
     **/
    addkmllayer: function(id, todo){
      var n = 'kmllayer',
          o = this._object(n, todo, ['url']),
          kml;
      o.options.map = this._getMap(id);
      kml = new google.maps.KmlLayer(o.url, o.options);
      this._store(id, n, kml, o);
      this._manageEnd(id, kml, o);
    },
    
    /**
     * @desc add a traffic layer to a map
     **/
    addtrafficlayer: function(id, todo){
      var n = 'trafficlayer', 
          o = this._object(n, todo),
          tl = this._getStored(id, n);
      if (!tl){
        tl = new google.maps.TrafficLayer();
        tl.setMap(this._getMap(id));
        this._store(id, n, tl, o);
      }
      this._manageEnd(id, tl, o);
    },
    
    /**
     * @desc set a bicycling layer to a map
     **/
    addbicyclinglayer: function(id, todo){
      var n = 'bicyclinglayer',
          o = this._object(n, todo),
          bl = this._getStored(id, n);
      if (!bl){
        bl = new google.maps.BicyclingLayer();
        bl.setMap(this._getMap(id));
        this._store(id, n, bl, o);
      }
      this._manageEnd(id, bl, o);
    },
    
    
    /**
     * @desc add a ground overlay to a map
     **/
    addgroundoverlay: function(id, todo){
      var n = 'groundoverlay',
          o = this._object(n, todo, ['bounds', 'url']),
          ov;
      o.bounds = this._latLngBounds(o.bounds);
      if (o.bounds && o.url){
        ov = new google.maps.GroundOverlay(o.url, o.bounds);
        ov.setMap(this._getMap(id));
        this._store(id, n, ov, o);
      }
      this._manageEnd(id, ov, o);
    },
    
    /**
     * @desc Geolocalise the user and return a LatLng
     **/
    geolatlng: function(id, todo){
      var geo,
          cb = this._ival(todo, 'callback'),
          $this = this._jObject(id);
      if (typeof(cb) === 'function') {
        if(navigator.geolocation) {
          browserSupportFlag = true;
          navigator.geolocation.getCurrentPosition(function(position) {
            var out = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            cb.apply($this, [out]);
          }, function() {
            var out = false;
            cb.apply($this, [out]);
          });
        } else if (google.gears) {
          browserSupportFlag = true;
          geo = google.gears.factory.create('beta.geolocation');
          geo.getCurrentPosition(function(position) {
            var out = new google.maps.LatLng(position.latitude,position.longitude);
            cb.apply($this, [out]);
          }, function() {
            out = false;
            cb.apply($this, [out]);
          });
        } else {
            out = false;
            cb.apply($this, [out]);
        }
      }
      this._end(id);
    },
    
    /**
     * @desc Add a style to a map
     **/
    addstyledmap: function(id, todo, internal){
      var o = this._object('styledmap', todo, ['id', 'style']),
          style;
      if  (o.style && o.id && !this._styleExist(id, o.id)) {
        style = new google.maps.StyledMapType(o.style, o.options);
        this._addStyle(id, o.id, style);
        if (this._getMap(id)) this._getMap(id).mapTypes.set(o.id, style);
      }
      this._manageEnd(id, style, o, internal);
    },
    
    /**
     * @desc Set a style to a map (add it if needed)
     **/
    setstyledmap: function(id, todo){
      var o = this._object('styledmap', todo, ['id', 'style']),
          style;
      if (o.id) {
        this.addstyledmap(id, o, true);
        style = this._getStyle(id, o.id);
        if (style) {
          this._getMap(id).setMapTypeId(o.id);
          this._callback(id, style, todo);
        }
      }
      this._manageEnd(id, style, o);
    },
    
    /**
     * @desc Remove objects from a map
     **/
    clear: function(id, todo){
      var list = this._array(this._ival(todo, 'list') || this._ival(todo, 'name')),
          last = this._ival(todo, 'last', false),
          first = this._ival(todo, 'first', false),
          tag = this._ival(todo, 'tag');
      if (tag !== undefined){
        tag = this._array(tag);
      }
      this._clear(id, list, last, first, tag);
      this._end(id);
    },
    
    /**
     * @desc Return Google object(s) wanted
     **/
    get: function(id, todo){
      var name = this._ival(todo, 'name') || 'map',
          first= this._ival(todo, 'first'),
          all  = this._ival(todo, 'all'),
          tag = this._ival(todo, 'tag'),
          r, i, t;
      name = name.toLowerCase();
      if (tag !== undefined){
        tag = this._array(tag);
      }
      if (name == 'map'){
        return this._getMap(id);
      }
      if (first){
        return this._getStored(id, name, false, tag);
      } else if (all){
        r = new Array();
        t = this._ids[id].stored[name];
        if (t){
          for(i = 0; i < t.length; i++){
            if (!t[i]){
              continue;
            }
            if (tag !== undefined) {
              if ( (t[i].tag === undefined) || ($.inArray(t[i].tag, tag) < 0) ){
                continue;
              }
            }
            r.push(t[i].obj);
          }
        }
        return r;
      } else {
        return this._getStored(id, name, true, tag);
      }
    },
    
    /**
     * @desc return the radius of the earth depending on the unit
     **/
    earthradius: function(unit){
      unit = unit ? unit : this._default.unit;
      return (typeof(unit) === 'string' && (unit.toLowerCase() === 'km')) ? 6371 : 3959;
    },
    
    /**
     * @desc the distance between 2 latLng depending on the unit
     **/
    distance: function(id, todo){
      var unit = this._ival(todo, 'unit'),
          a = this._latLng(this._ival(todo, 'a')),
          b = this._latLng(this._ival(todo, 'b')),
          e,f,g,h, dist;
      if (a && b){
        e=(Math.PI*a.lat()/180);
        f=(Math.PI*a.lng()/180);
        g=(Math.PI*b.lat()/180);
        h=(Math.PI*b.lng()/180);
        dist = this.earthradius(unit)*Math.acos(Math.min(Math.cos(e)*Math.cos(g)*Math.cos(f)*Math.cos(h)+Math.cos(e)*Math.sin(f)*Math.cos(g)*Math.sin(h)+Math.sin(e)*Math.sin(g),1)); 
      }
      return dist;
    },
    
    /**
     * @desc return the max zoom of a latlng
     **/
    getmaxzoom: function(id, todo){
      this._resolveLatLng(id, todo, '_getMaxZoom');
    },
    _getMaxZoom: function(id, todo, latLng){
      var callback,
          $this = this._jObject(id), 
          cb = this._ival(todo, 'callback');
      if (cb && typeof(cb) === 'function') {
        callback = function(result) {
          var zoom = result.status == google.maps.MaxZoomStatus.OK ? result.zoom : false;
          cb.apply($this, [zoom, result.status]);
        };
        this._getMaxZoomService().getMaxZoomAtLatLng(latLng, callback);
      }
      this._end(id);
    },
  
    /**
     * @desc modify default values
     **/
    setdefault: function(id, todo, internal){
      for(var k in todo){
        if (typeof(this._default[k]) === 'object'){
          this._default[k] = jQuery.extend({}, this._default[k], todo[k]);
        } else {
          this._default[k] = todo[k];
        }
      }
      if (!internal){
        this._end(id);
      }
    },
    /**
     * @desc : autofit a map using its overlays (markers, rectangles ...)
     **/
    autofit: function(id, todo, internal){
      var n, i, stored, obj, empty = true, bounds = new google.maps.LatLngBounds();
      if (id in this._ids){
        for(n in this._ids[id].stored){
          stored = this._ids[id].stored[n];
          for(i = 0; i < stored.length; i++){
            obj = stored[i].obj;
            if (obj.getPosition){
              bounds.extend(obj.getPosition());
              empty = false;
            } else if (obj.getBounds){
              bounds.extend(obj.getBounds().getNorthEast());
              bounds.extend(obj.getBounds().getSouthWest());
              empty = false;
            } else if (obj.getPaths){
              obj.getPaths().forEach(function(path){
                path.forEach(function(latLng){
                  bounds.extend(latLng);
                  empty = false;
                });
              });
            } else if (obj.getPath){
              obj.getPath().forEach(function(latLng){
                bounds.extend(latLng);
                empty = false;
              });
            } else if (obj.getCenter){
              bounds.extend(obj.getCenter());
              empty = false;
            }
          }
        }
        if (!empty){
          this._getMap(id).fitBounds(bounds);
        }
      }
      if (!internal){
        this._manageEnd(id, empty ? false : bounds, todo, internal);
      }
    }
    
  };
  
  var globalId = 0;
  
  $.fn.gmap3 = function(){
    var a,i,
        todo = [],
        results = [],
        empty = true;
    for(i=0; i<arguments.length; i++){
      a = arguments[i] || {};
      if (typeof(a) === 'string'){
        a = {action:a};
      }
      if (a.action && (a.action.substr(0, 1) == ':')){
        a.action = a.action.substr(1);
      }
      todo.push(a);
    }
    if (!todo.length) todo.push({});
    $.each(this, function() {
      var $this = $(this),
          id = $this.data('id');
      empty = false;
      if (!id){
        id = ++globalId;
        $this.data('id', id);
      }
      if (todo.length == 1){
        if (gmap3._isDirect(id, todo[0])){
          results.push(gmap3._direct(id, todo[0]));
        } else {
          gmap3._plan($this, id, todo);
        }
      } else {
        gmap3._plan($this, id, todo);
      }
    });
    if (results.length){
      if (results.length === 1){ // 1 css selector
        return results[0];
      } else {
        return results;
      }
    }
    if (empty && (arguments.length == 2) && (typeof(arguments[0]) === 'string') && (arguments[0].toLowerCase() === 'setdefault')){
      gmap3.setdefault(0, arguments[1], true);
    }
    return this;
  }

}(jQuery));
