/*!
 *  GMAP3 Plugin for JQuery
 *  Version   : 5.1.1
 *  Date      : 2013-05-25
 *  Licence   : GPL v3 : http://www.gnu.org/licenses/gpl.html
 *  Author    : DEMONTE Jean-Baptiste
 *  Contact   : jbdemonte@gmail.com
 *  Web site  : http://gmap3.net
 *
 *  Copyright (c) 2010-2012 Jean-Baptiste DEMONTE
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
;(function ($, undef) {

  /***************************************************************************/
  /*                           GMAP3 DEFAULTS                                */
  /***************************************************************************/
  // defaults are defined later in the code to pass the rails asset pipeline and
  //jasmine while google library is not loaded
  var defaults, gId = 0;

  function initDefaults() {
    if (!defaults) {
      defaults = {
        verbose: false,
        queryLimit: {
          attempt: 5,
          delay: 250, // setTimeout(..., delay + random);
          random: 250
        },
        classes: {
          Map               : google.maps.Map,
          Marker            : google.maps.Marker,
          InfoWindow        : google.maps.InfoWindow,
          Circle            : google.maps.Circle,
          Rectangle         : google.maps.Rectangle,
          OverlayView       : google.maps.OverlayView,
          StreetViewPanorama: google.maps.StreetViewPanorama,
          KmlLayer          : google.maps.KmlLayer,
          TrafficLayer      : google.maps.TrafficLayer,
          BicyclingLayer    : google.maps.BicyclingLayer,
          GroundOverlay     : google.maps.GroundOverlay,
          StyledMapType     : google.maps.StyledMapType,
          ImageMapType      : google.maps.ImageMapType
        },
        map: {
          mapTypeId : google.maps.MapTypeId.ROADMAP,
          center: [46.578498, 2.457275],
          zoom: 2
        },
        overlay: {
          pane: "floatPane",
          content: "",
          offset: {
            x: 0,
            y: 0
          }
        },
        geoloc: {
          getCurrentPosition: {
            maximumAge: 60000,
            timeout: 5000
          }
        }
      }
    }
  }

  function globalId(id, simulate){
    return id !== undef ? id : "gmap3_" + (simulate ? gId + 1 : ++gId);
  }

  /**
   * Return true if current version of Google Maps is equal or above to these in parameter
   * @param version {string} Minimal version required
   * @return {Boolean}
   */
  function googleVersionMin(version) {
    var toInt = function(v){return parseInt(v, 10);},
        // extract the google map version
        gmVersion = google.maps.version.split(".").map(toInt),
        i;
    version = version.split(".").map(toInt);
    for(i = 0; i < version.length; i++) {
        if (gmVersion.hasOwnProperty(i)) {
            if (gmVersion[i] < version[i]) {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
  }

  /**
   * attach events from a container to a sender 
   * todo[
   *  events => { eventName => function, }
   *  onces  => { eventName => function, }  
   *  data   => mixed data         
   * ]
   **/
  function attachEvents($container, args, sender, id, senders){
    if (args.todo.events || args.todo.onces) {
      var context = {
        id: id,
        data: args.todo.data,
        tag: args.todo.tag
      };
      if (args.todo.events){
        $.each(args.todo.events, function(name, f){
          var that = $container, fn = f;
          if ($.isArray(f)) {
            that = f[0];
            fn = f[1]
          }
          google.maps.event.addListener(sender, name, function(event) {
            fn.apply(that, [senders ? senders : sender, event, context]);
          });
        });
      }
      if (args.todo.onces){
        $.each(args.todo.onces, function(name, f){
          var that = $container, fn = f;
          if ($.isArray(f)) {
            that = f[0];
            fn = f[1]
          }
          google.maps.event.addListenerOnce(sender, name, function(event) {
            fn.apply(that, [senders ? senders : sender, event, context]);
          });
        });
      }
    }
  }

  /***************************************************************************/
  /*                                STACK                                    */
  /***************************************************************************/
  
  function Stack (){
    var st = [];
    this.empty = function (){
      return !st.length;
    };
    this.add = function(v){
      st.push(v);
    };
    this.get = function (){
      return st.length ? st[0] : false;
    };
    this.ack = function (){
      st.shift();
    };
  }

  /***************************************************************************/
  /*                                TASK                                     */
  /***************************************************************************/
  
  function Task(ctx, onEnd, todo){
    var session = {},
      that = this, 
      current,
      resolve = {
        latLng:{ // function => bool (=> address = latLng)
          map:false, 
          marker:false, 
          infowindow:false, 
          circle:false, 
          overlay: false,
          getlatlng: false,
          getmaxzoom: false,
          getelevation: false,
          streetviewpanorama: false,
          getaddress: true
        },
        geoloc:{
          getgeoloc: true
        }
      };
      
    if (typeof todo === "string"){
      todo =  unify(todo);
    }
  
    function unify(todo){
      var result = {};
      result[todo] = {};
      return result;
    }
    
    function next(){
      var k;
      for(k in todo){
        if (k in session){ // already run
          continue;
        }
        return k;
      }
    }
    
    this.run = function (){
      var k, opts;
      while(k = next()){
        if (typeof ctx[k] === "function"){
          current = k;
          opts = $.extend(true, {}, defaults[k] || {}, todo[k].options || {});
          if (k in resolve.latLng){
            if (todo[k].values){
              resolveAllLatLng(todo[k].values, ctx, ctx[k], {todo:todo[k], opts:opts, session:session});
            } else {
              resolveLatLng(ctx, ctx[k], resolve.latLng[k], {todo:todo[k], opts:opts, session:session});
            }
          } else if (k in resolve.geoloc){
            geoloc(ctx, ctx[k], {todo:todo[k], opts:opts, session:session});
          } else {
            ctx[k].apply(ctx, [{todo:todo[k], opts:opts, session:session}]);
          }
          return; // wait until ack
        } else {
          session[k] = null;
        }
      }
      onEnd.apply(ctx, [todo, session]);
    };
    
    this.ack = function(result){
      session[current] = result;
      that.run.apply(that, []);
    };
  }
  
  function getKeys(obj){
    var k, keys = [];
    for(k in obj){
      keys.push(k);
    }
    return keys;
  }
  
  function tuple(args, value){
    var todo = {};
    
    // "copy" the common data
    if (args.todo){
      for(var k in args.todo){
        if ((k !== "options") && (k !== "values")){
          todo[k] = args.todo[k];
        }
      }
    }
    // "copy" some specific keys from value first else args.todo
    var i, keys = ["data", "tag", "id", "events",  "onces"];
    for(i=0; i<keys.length; i++){
      copyKey(todo, keys[i], value, args.todo);
    }
    
    // create an extended options
    todo.options = $.extend({}, args.opts || {}, value.options || {});
    
    return todo;
  }
  
  /**
   * copy a key content
   **/
  function copyKey(target, key){
    for(var i=2; i<arguments.length; i++){
      if (key in arguments[i]){
        target[key] = arguments[i][key];
        return;
      }
    }
  }
  
  /***************************************************************************/
  /*                             GEOCODERCACHE                               */
  /***************************************************************************/
  
  function GeocoderCache(){
    var cache = [];
    
    this.get = function(request){
      if (cache.length){
        var i, j, k, item, eq,
          keys = getKeys(request);
        for(i=0; i<cache.length; i++){
          item = cache[i];
          eq = keys.length == item.keys.length;
          for(j=0; (j<keys.length) && eq; j++){
            k = keys[j];
            eq = k in item.request;
            if (eq){
              if ((typeof request[k] === "object") && ("equals" in request[k]) && (typeof request[k] === "function")){
                eq = request[k].equals(item.request[k]);
              } else{
                eq = request[k] === item.request[k];
              }
            }
          }
          if (eq){
            return item.results;
          }
        }
      }
    };
    
    this.store = function(request, results){
      cache.push({request:request, keys:getKeys(request), results:results});
    };
  }

  /***************************************************************************/
  /*                                OVERLAYVIEW                              */
  /***************************************************************************/
  function OverlayView(map, opts, latLng, $div) {
    var that = this, listeners = [];
    
    defaults.classes.OverlayView.call(this);
    this.setMap(map);
    
    this.onAdd = function() {
        var panes = this.getPanes();
        if (opts.pane in panes) {
            $(panes[opts.pane]).append($div);
        }
        $.each("dblclick click mouseover mousemove mouseout mouseup mousedown".split(" "), function(i, name){
            listeners.push(
                google.maps.event.addDomListener($div[0], name, function(e) {
                    $.Event(e).stopPropagation();
                    google.maps.event.trigger(that, name, [e]);
                    that.draw();
                })
            );
        });
        listeners.push(
            google.maps.event.addDomListener($div[0], "contextmenu", function(e) {
                $.Event(e).stopPropagation();
                google.maps.event.trigger(that, "rightclick", [e]);
                that.draw();
            })
        );
    };
    this.getPosition = function(){
        return latLng;
    };
    this.draw = function() {
        var ps = this.getProjection().fromLatLngToDivPixel(latLng);
        $div
            .css("left", (ps.x+opts.offset.x) + "px")
            .css("top" , (ps.y+opts.offset.y) + "px");
    };
    this.onRemove = function() {
      for (var i = 0; i < listeners.length; i++) {
        google.maps.event.removeListener(listeners[i]);
      }
      $div.remove();
    };
    this.hide = function() {
      $div.hide();
    };
    this.show = function() {
      $div.show();
    };
    this.toggle = function() {
      if ($div) {
        if ($div.is(":visible")){
          this.show();
        } else {
          this.hide();
        }
      }
    };
    this.toggleDOM = function() {
      if (this.getMap()) {
        this.setMap(null);
      } else {
        this.setMap(map);
      }
    };
    this.getDOMElement = function() {
      return $div[0];
    };
  }

  /***************************************************************************/
  /*                              CLUSTERING                                 */
  /***************************************************************************/
      
  /**
   * Usefull to get a projection
   * => done in a function, to let dead-code analyser works without google library loaded    
   **/
  function newEmptyOverlay(map, radius){
    function Overlay(){ 
      this.onAdd = function(){};
      this.onRemove = function(){};
      this.draw = function(){};
      return defaults.classes.OverlayView.apply(this, []); 
    }
    Overlay.prototype = defaults.classes.OverlayView.prototype;
    var obj = new Overlay();
    obj.setMap(map); 
    return obj;
  }
  
  /**
   * Class InternalClusterer
   * This class manage clusters thanks to "todo" objects
   * 
   * Note: 
   * Individuals marker are created on the fly thanks to the todo objects, they are 
   * first set to null to keep the indexes synchronised with the todo list
   * This is the "display" function, set by the gmap3 object, which uses theses data 
   * to create markers when clusters are not required
   * To remove a marker, the objects are deleted and set not null in arrays
   *    markers[key]
   *      = null : marker exist but has not been displayed yet
   *      = false : marker has been removed       
   **/
  function InternalClusterer($container, map, raw){
    var updating = false,
      updated = false,
      redrawing = false,
      ready = false,
      enabled = true,
      that = this,
      events =  [],
      store = {},   // combin of index (id1-id2-...) => object
      ids = {},     // unique id => index
      idxs = {},    // index => unique id
      markers = [], // index => marker
      todos = [],   // index => todo or null if removed
      values = [],  // index => value
      overlay = newEmptyOverlay(map, raw.radius),
      timer, projection,
      ffilter, fdisplay, ferror; // callback function
      
    main();

    function prepareMarker(index) {
      if (!markers[index]) {
        delete todos[index].options.map;
        markers[index] = new defaults.classes.Marker(todos[index].options);
        attachEvents($container, {todo: todos[index]}, markers[index], todos[index].id);
      }
    }

    /**
     * return a marker by its id, null if not yet displayed and false if no exist or removed
     **/
    this.getById = function(id){
      if (id in ids) {
        prepareMarker(ids[id]);
        return  markers[ids[id]];
      }
      return false;
    };

    /**
     * remove one object from the store
     **/
    this.rm = function (id) {
      var index = ids[id];
      if (markers[index]){ // can be null
        markers[index].setMap(null);
      }
      delete markers[index];
      markers[index] = false;

      delete todos[index];
      todos[index] = false;

      delete values[index];
      values[index] = false;

      delete ids[id];
      delete idxs[index];
      updated = true;
    };
    
    /**
     * remove a marker by its id
     **/
    this.clearById = function(id){
      if (id in ids){
        this.rm(id);
        return true;
      }
    };

    /**
     * remove objects from the store
     **/
    this.clear = function(last, first, tag){
      var start, stop, step, index, i,
          list = [],
          check = ftag(tag);
      if (last) {
        start = todos.length - 1;
        stop = -1;
        step = -1;
      } else {
        start = 0;
        stop =  todos.length;
        step = 1;
      }
      for (index = start; index != stop; index += step) {
        if (todos[index]) {
          if (!check || check(todos[index].tag)){
            list.push(idxs[index]);
            if (first || last) {
              break;
            }
          }
        }
      }
      for (i = 0; i < list.length; i++) {
        this.rm(list[i]);
      }
    };
    
    // add a "marker todo" to the cluster
    this.add = function(todo, value){
      todo.id = globalId(todo.id);
      this.clearById(todo.id);
      ids[todo.id] = markers.length;
      idxs[markers.length] = todo.id;
      markers.push(null); // null = marker not yet created / displayed
      todos.push(todo);
      values.push(value);
      updated = true;
    };
    
    // add a real marker to the cluster
    this.addMarker = function(marker, todo){
      todo = todo || {};
      todo.id = globalId(todo.id);
      this.clearById(todo.id);
      if (!todo.options){
        todo.options = {};
      }
      todo.options.position = marker.getPosition();
      attachEvents($container, {todo:todo}, marker, todo.id);
      ids[todo.id] = markers.length;
      idxs[markers.length] = todo.id;
      markers.push(marker);
      todos.push(todo);
      values.push(todo.data || {});
      updated = true;
    };
    
    // return a "marker todo" by its index 
    this.todo = function(index){
      return todos[index];
    };
    
    // return a "marker value" by its index 
    this.value = function(index){
      return values[index];
    };

    // return a marker by its index
    this.marker = function(index){
      if (index in markers) {
        prepareMarker(index);
        return  markers[index];
      }
      return false;
    };

    // return a marker by its index
    this.markerIsSet = function(index){
      return Boolean(markers[index]);
    };
    
    // store a new marker instead if the default "false"
    this.setMarker = function(index, marker){
      markers[index] = marker;
    };
    
    // link the visible overlay to the logical data (to hide overlays later)
    this.store = function(cluster, obj, shadow){
      store[cluster.ref] = {obj:obj, shadow:shadow};
    };
    
    // free all objects
    this.free = function(){
      for(var i = 0; i < events.length; i++){
        google.maps.event.removeListener(events[i]);
      }
      events = [];
      
      $.each(store, function(key){
        flush(key);
      });
      store = {};
      
      $.each(todos, function(i){
        todos[i] = null;
      });
      todos = [];
      
      $.each(markers, function(i){
        if (markers[i]){ // false = removed
          markers[i].setMap(null);
          delete markers[i];
        }
      });
      markers = [];
      
      $.each(values, function(i){
        delete values[i];
      });
      values = [];
      
      ids = {};
      idxs = {};
    };
    
    // link the display function
    this.filter = function(f){
      ffilter = f;
      redraw();
    };
    
    // enable/disable the clustering feature
    this.enable = function(value){
      if (enabled != value){
        enabled = value;
        redraw();
      }
    };
    
    // link the display function
    this.display = function(f){
      fdisplay = f;
    };
    
    // link the errorfunction
    this.error = function(f){
      ferror = f;
    };
    
    // lock the redraw
    this.beginUpdate = function(){
      updating = true;
    };
    
    // unlock the redraw
    this.endUpdate = function(){
      updating = false;
      if (updated){
        redraw();
      }
    };

    // extends current bounds with internal markers
    this.autofit = function(bounds){
      for(var i=0; i<todos.length; i++){
        if (todos[i]){
          bounds.extend(todos[i].options.position);
        }
      }
    };
    
    // bind events
    function main(){
      projection = overlay.getProjection();
      if (!projection){
        setTimeout(function(){
          main.apply(that, []);
        },
        25);
        return;
      }
      ready = true;
      events.push(google.maps.event.addListener(map, "zoom_changed", function(){delayRedraw();}));
      events.push(google.maps.event.addListener(map, "bounds_changed", function(){delayRedraw();}));
      redraw();
    }
    
    // flush overlays
    function flush(key){
      if (typeof store[key] === "object"){ // is overlay
        if (typeof(store[key].obj.setMap) === "function") {
          store[key].obj.setMap(null);
        }
        if (typeof(store[key].obj.remove) === "function") {
          store[key].obj.remove();
        }
        if (typeof(store[key].shadow.remove) === "function") {
          store[key].obj.remove();
        }
        if (typeof(store[key].shadow.setMap) === "function") {
          store[key].shadow.setMap(null);
        }
        delete store[key].obj;
        delete store[key].shadow;
      } else if (markers[key]){ // marker not removed
        markers[key].setMap(null);
        // don't remove the marker object, it may be displayed later
      }
      delete store[key];
    }
    
    /**
     * return the distance between 2 latLng couple into meters
     * Params :   
     *  Lat1, Lng1, Lat2, Lng2
     *  LatLng1, Lat2, Lng2
     *  Lat1, Lng1, LatLng2
     *  LatLng1, LatLng2
     **/
    function distanceInMeter(){
      var lat1, lat2, lng1, lng2, e, f, g, h;
      if (arguments[0] instanceof google.maps.LatLng){
        lat1 = arguments[0].lat();
        lng1 = arguments[0].lng();
        if (arguments[1] instanceof google.maps.LatLng){
          lat2 = arguments[1].lat();
          lng2 = arguments[1].lng();
        } else {
          lat2 = arguments[1];
          lng2 = arguments[2];
        }
      } else {
        lat1 = arguments[0];
        lng1 = arguments[1];
        if (arguments[2] instanceof google.maps.LatLng){
          lat2 = arguments[2].lat();
          lng2 = arguments[2].lng();
        } else {
          lat2 = arguments[2];
          lng2 = arguments[3];
        }
      }
      e = Math.PI*lat1/180;
      f = Math.PI*lng1/180;
      g = Math.PI*lat2/180;
      h = Math.PI*lng2/180;
      return 1000*6371 * Math.acos(Math.min(Math.cos(e)*Math.cos(g)*Math.cos(f)*Math.cos(h)+Math.cos(e)*Math.sin(f)*Math.cos(g)*Math.sin(h)+Math.sin(e)*Math.sin(g),1));
    }
    
    // extend the visible bounds 
    function extendsMapBounds(){
      var radius = distanceInMeter(map.getCenter(), map.getBounds().getNorthEast()), 
        circle = new google.maps.Circle({
          center: map.getCenter(),
          radius: 1.25 * radius // + 25%
        });
      return circle.getBounds();
    }
    
    // return an object where keys are store keys 
    function getStoreKeys(){
      var keys = {}, k;
      for(k in store){
        keys[k] = true;
      }
      return keys;
    }
    
    // async the delay function
    function delayRedraw(){
      clearTimeout(timer);
      timer = setTimeout(function(){
        redraw();
      },
      25);
    }
    
    // generate bounds extended by radius
    function extendsBounds(latLng) {
      var p = projection.fromLatLngToDivPixel(latLng),
        ne = projection.fromDivPixelToLatLng(new google.maps.Point(p.x+raw.radius, p.y-raw.radius)),
        sw = projection.fromDivPixelToLatLng(new google.maps.Point(p.x-raw.radius, p.y+raw.radius));
      return new google.maps.LatLngBounds(sw, ne);
    }
    
    // run the clustering process and call the display function
    function redraw(){
      if (updating || redrawing || !ready){
        return;
      }

      var keys = [], used = {},
        zoom = map.getZoom(),
        forceDisabled = ("maxZoom" in raw) && (zoom > raw.maxZoom),
        previousKeys = getStoreKeys(),
        i, j, k, indexes, check = false, bounds, cluster, position, previous, lat, lng, loop;

      // reset flag
      updated = false;

      if (zoom > 3){
        // extend the bounds of the visible map to manage clusters near the boundaries
        bounds = extendsMapBounds();

        // check contain only if boundaries are valid
        check = bounds.getSouthWest().lng() < bounds.getNorthEast().lng();
      }

      // calculate positions of "visibles" markers (in extended bounds)
      for(i=0; i<todos.length; i++){
        if (todos[i] && (!check || bounds.contains(todos[i].options.position)) && (!ffilter || ffilter(values[i]))){
          keys.push(i);
        }
      }

      // for each "visible" marker, search its neighbors to create a cluster
      // we can't do a classical "for" loop, because, analysis can bypass a marker while focusing on cluster
      while(1){
        i=0;
        while(used[i] && (i<keys.length)){ // look for the next marker not used
          i++;
        }
        if (i == keys.length){
          break;
        }

        indexes = [];

        if (enabled && !forceDisabled){
          loop = 10;
          do{
            previous = indexes;
            indexes = [];
            loop--;

            if (previous.length){
              position = bounds.getCenter()
            } else {
              position = todos[ keys[i] ].options.position;
            }
            bounds = extendsBounds(position);

            for(j=i; j<keys.length; j++){
              if (used[j]){
                continue;
              }
              if (bounds.contains(todos[ keys[j] ].options.position)){
                indexes.push(j);
              }
            }
          } while( (previous.length < indexes.length) && (indexes.length > 1) && loop);
        } else {
          for(j=i; j<keys.length; j++){
            if (used[j]){
              continue;
            }
            indexes.push(j);
            break;
          }
        }

        cluster = {indexes:[], ref:[]};
        lat = lng = 0;
        for(k=0; k<indexes.length; k++){
          used[ indexes[k] ] = true;
          cluster.indexes.push(keys[indexes[k]]);
          cluster.ref.push(keys[indexes[k]]);
          lat += todos[ keys[indexes[k]] ].options.position.lat();
          lng += todos[ keys[indexes[k]] ].options.position.lng();
        }
        lat /= indexes.length;
        lng /= indexes.length;
        cluster.latLng = new google.maps.LatLng(lat, lng);

        cluster.ref = cluster.ref.join("-");

        if (cluster.ref in previousKeys){ // cluster doesn't change
          delete previousKeys[cluster.ref]; // remove this entry, these still in this array will be removed
        } else { // cluster is new
          if (indexes.length === 1){ // alone markers are not stored, so need to keep the key (else, will be displayed every time and marker will blink)
            store[cluster.ref] = true;
          }
          fdisplay(cluster);
        }
      }

      // flush the previous overlays which are not still used
      $.each(previousKeys, function(key){
        flush(key);
      });
      redrawing = false;
    }
  }
  
  /**
   * Class Clusterer
   * a facade with limited method for external use
   **/
  function Clusterer(id, internalClusterer){
    this.id = function(){
      return id;
    };
    this.filter = function(f){
      internalClusterer.filter(f);
    };
    this.enable = function(){
      internalClusterer.enable(true);
    };
    this.disable = function(){
      internalClusterer.enable(false);
    };
    this.add = function(marker, todo, lock){
      if (!lock) {
        internalClusterer.beginUpdate();
      }
      internalClusterer.addMarker(marker, todo);
      if (!lock) {
        internalClusterer.endUpdate();
      }
    };
    this.getById = function(id){
      return internalClusterer.getById(id);
    };
    this.clearById = function(id, lock){
      var result;
      if (!lock) {
        internalClusterer.beginUpdate();
      }
      result = internalClusterer.clearById(id);
      if (!lock) {
        internalClusterer.endUpdate();
      }
      return result;
    };
    this.clear = function(last, first, tag, lock){
      if (!lock) {
        internalClusterer.beginUpdate();
      }
      internalClusterer.clear(last, first, tag);
      if (!lock) {
        internalClusterer.endUpdate();
      }
    };
  }
  /***************************************************************************/
  /*                                STORE                                    */
  /***************************************************************************/
  
  function Store(){
    var store = {}, // name => [id, ...]
      objects = {}; // id => object

    function normalize(res) {
      return {
        id: res.id,
        name: res.name,
        object:res.obj,
        tag:res.tag,
        data:res.data
      };
    }
    
    /**
     * add a mixed to the store
     **/
    this.add = function(args, name, obj, sub){
      var todo = args.todo || {},
        id = globalId(todo.id);
      if (!store[name]){
        store[name] = [];
      }
      if (id in objects){ // object already exists: remove it
        this.clearById(id);
      }
      objects[id] = {obj:obj, sub:sub, name:name, id:id, tag:todo.tag, data:todo.data};
      store[name].push(id);
      return id;
    };
    
    /**
     * return a stored object by its id
     **/
    this.getById = function(id, sub, full){
      if (id in objects){
          if (sub) {
            return objects[id].sub
          } else if (full) {
            return normalize(objects[id]);
          }
          return objects[id].obj;

      }
      return false;
    };
    
    /**
     * return a stored value
     **/
    this.get = function(name, last, tag, full){
      var n, id, check = ftag(tag);
      if (!store[name] || !store[name].length){
        return null;
      }
      n = store[name].length;
      while(n){
        n--;
        id = store[name][last ? n : store[name].length - n - 1];
        if (id && objects[id]){
          if (check && !check(objects[id].tag)){
            continue;
          }
          return full ? normalize(objects[id]) : objects[id].obj;
        }
      }
      return null;
    };
    
    /**
     * return all stored values
     **/
    this.all = function(name, tag, full){
      var result = [],
          check = ftag(tag),
          find = function(n){
            var i, id;
            for(i=0; i<store[n].length; i++){
              id = store[n][i];
              if (id && objects[id]){
                if (check && !check(objects[id].tag)){
                  continue;
                }
                result.push(full ? normalize(objects[id]) : objects[id].obj);
              }
            }
          };
      if (name in store){
        find(name);
      } else if (name === undef){ // internal use only
        for(name in store){
          find(name);
        }
      }
      return result;
    };
    
    /**
     * hide and remove an object
     **/
    function rm(obj){
      // Google maps element
      if (typeof(obj.setMap) === "function") {
        obj.setMap(null);
      }
      // jQuery
      if (typeof(obj.remove) === "function") {
        obj.remove();
      }
      // internal (cluster)
      if (typeof(obj.free) === "function") {
        obj.free();
      }
      obj = null;
    }

    /**
     * remove one object from the store
     **/
    this.rm = function(name, check, pop){
      var idx, id;
      if (!store[name]) {
        return false;
      }
      if (check){
        if (pop){
          for(idx = store[name].length - 1; idx >= 0; idx--){
            id = store[name][idx];
            if ( check(objects[id].tag) ){
              break;
            }
          }
        } else {
          for(idx = 0; idx < store[name].length; idx++){
            id = store[name][idx];
            if (check(objects[id].tag)){
              break;
            }
          }
        }
      } else {
        idx = pop ? store[name].length - 1 : 0;
      }
      if ( !(idx in store[name]) ) {
        return false;
      }
      return this.clearById(store[name][idx], idx);
    };
    
    /**
     * remove object from the store by its id
     **/
    this.clearById = function(id, idx){
      if (id in objects){
        var i, name = objects[id].name;
        for(i=0; idx === undef && i<store[name].length; i++){
          if (id === store[name][i]){
            idx = i;
          }
        }
        rm(objects[id].obj);
        if(objects[id].sub){
          rm(objects[id].sub);
        }
        delete objects[id];
        store[name].splice(idx, 1);
        return true;
      }
      return false;
    };
    
    /**
     * return an object from a container object in the store by its id
     * ! for now, only cluster manage this feature 
     **/
    this.objGetById = function(id){
      var result;
      if (store["clusterer"]) {
        for(var idx in store["clusterer"]){
          if ((result = objects[store["clusterer"][idx]].obj.getById(id)) !== false){
            return result;
          }
        }
      }
      return false;
    };
    
    /**
     * remove object from a container object in the store by its id
     * ! for now, only cluster manage this feature 
     **/
    this.objClearById = function(id){
      if (store["clusterer"]) {
        for(var idx in store["clusterer"]){
          if (objects[store["clusterer"][idx]].obj.clearById(id)){
            return true;
          }
        }
      }
      return null;
    };
    
    /**
     * remove objects from the store
     **/
    this.clear = function(list, last, first, tag){
      var k, i, name, check = ftag(tag);
      if (!list || !list.length){
        list = [];
        for(k in store){
          list.push(k);
        }
      } else {
        list = array(list);
      }
      for(i=0; i<list.length; i++){
        name = list[i];
        if (last){
          this.rm(name, check, true);
        } else if (first){
          this.rm(name, check, false);
        } else { // all
          while(this.rm(name, check, false));
        }
      }
    };

    /**
     * remove object from a container object in the store by its tags
     * ! for now, only cluster manage this feature
     **/
    this.objClear = function(list, last, first, tag){
      if (store["clusterer"] && ($.inArray("marker", list) >= 0 || !list.length)) {
        for(var idx in store["clusterer"]){
          objects[store["clusterer"][idx]].obj.clear(last, first, tag);
        }
      }
    };
  }
  
  /***************************************************************************/
  /*                           GMAP3 GLOBALS                                 */
  /***************************************************************************/
  
  var services = {},
    geocoderCache = new GeocoderCache();
    
  //-----------------------------------------------------------------------//
  // Service tools
  //-----------------------------------------------------------------------//
  
  function geocoder(){
    if (!services.geocoder) {
      services.geocoder = new google.maps.Geocoder();
    }
    return services.geocoder;
  }
  
  function directionsService(){
    if (!services.directionsService) {
      services.directionsService = new google.maps.DirectionsService();
    }
    return services.directionsService;
  }
  
  function elevationService(){
    if (!services.elevationService) {
      services.elevationService = new google.maps.ElevationService();
    }
    return services.elevationService;
  }
  
  function maxZoomService(){
    if (!services.maxZoomService) {
      services.maxZoomService = new google.maps.MaxZoomService();
    }
    return services.maxZoomService;
  }
  
  function distanceMatrixService(){
    if (!services.distanceMatrixService) {
      services.distanceMatrixService = new google.maps.DistanceMatrixService();
    }
    return services.distanceMatrixService;
  }
  
  //-----------------------------------------------------------------------//
  // Unit tools
  //-----------------------------------------------------------------------//
  
  function error(){
    if (defaults.verbose){
      var i, err = [];
      if (window.console && (typeof console.error === "function") ){
        for(i=0; i<arguments.length; i++){
          err.push(arguments[i]);
        }
        console.error.apply(console, err);
      } else {
        err = "";
        for(i=0; i<arguments.length; i++){
          err += arguments[i].toString() + " " ;
        }
        alert(err);
      }
    }
  }

  /**
   * return true if mixed is usable as number
   **/
  function numeric(mixed){
    return (typeof(mixed) === "number" || typeof(mixed) === "string") && mixed !== "" && !isNaN(mixed);
  }
  
  /**
   * convert data to array
   **/
  function array(mixed){
    var k, a = [];
    if (mixed !== undef){
      if (typeof(mixed) === "object"){
        if (typeof(mixed.length) === "number") {
          a = mixed;
        } else {
          for(k in mixed) {
            a.push(mixed[k]);
          }
        }
      } else{ 
        a.push(mixed);
      }
    }
    return a;
  }

  /**
   * create a function to check a tag
   */
  function ftag(tag){
    if (tag){
      if (typeof tag === "function"){
        return tag;
      }
      tag = array(tag);
      return function(val){
        if (val === undef){
          return false;
        }
        if (typeof val === "object"){
          for(var i=0; i<val.length; i++){
            if($.inArray(val[i], tag) >= 0){
              return true;
            }
          }
          return false;
        }
        return $.inArray(val, tag) >= 0;
      }
    }
  }
  
  /**
   * convert mixed [ lat, lng ] objet to google.maps.LatLng
   **/
  function toLatLng (mixed, emptyReturnMixed, noFlat){
    var empty = emptyReturnMixed ? mixed : null;
    if (!mixed || (typeof mixed === "string")){
      return empty;
    }
    // defined latLng
    if (mixed.latLng) {
      return toLatLng(mixed.latLng);
    }
    // google.maps.LatLng object
    if (mixed instanceof google.maps.LatLng) {
      return mixed;
    } 
    // {lat:X, lng:Y} object
    else if ( numeric(mixed.lat) ) {
      return new google.maps.LatLng(mixed.lat, mixed.lng);
    }
    // [X, Y] object 
    else if ( !noFlat && $.isArray(mixed)){
      if ( !numeric(mixed[0]) || !numeric(mixed[1]) ) {
        return empty;
      }
      return new google.maps.LatLng(mixed[0], mixed[1]);
    }
    return empty;
  }
  
  /**
   * convert mixed [ sw, ne ] object by google.maps.LatLngBounds
   **/
  function toLatLngBounds(mixed){
    var ne, sw;
    if (!mixed || mixed instanceof google.maps.LatLngBounds) {
      return mixed || null;
    }
    if ($.isArray(mixed)){
      if (mixed.length == 2){
        ne = toLatLng(mixed[0]);
        sw = toLatLng(mixed[1]);
      } else if (mixed.length == 4){
        ne = toLatLng([mixed[0], mixed[1]]);
        sw = toLatLng([mixed[2], mixed[3]]);
      }
    } else {
      if ( ("ne" in mixed) && ("sw" in mixed) ){
        ne = toLatLng(mixed.ne);
        sw = toLatLng(mixed.sw);
      } else if ( ("n" in mixed) && ("e" in mixed) && ("s" in mixed) && ("w" in mixed) ){
        ne = toLatLng([mixed.n, mixed.e]);
        sw = toLatLng([mixed.s, mixed.w]);
      }
    }
    if (ne && sw){
      return new google.maps.LatLngBounds(sw, ne);
    }
    return null;
  }
  
  /**
   * resolveLatLng      
   **/
  function resolveLatLng(ctx, method, runLatLng, args, attempt){
    var latLng = runLatLng ? toLatLng(args.todo, false, true) : false,
      conf = latLng ?  {latLng:latLng} : (args.todo.address ? (typeof(args.todo.address) === "string" ? {address:args.todo.address} : args.todo.address) : false),
      cache = conf ? geocoderCache.get(conf) : false,
      that = this;
    if (conf){
      attempt = attempt || 0; // convert undefined to int
      if (cache){
        args.latLng = cache.results[0].geometry.location;
        args.results = cache.results;
        args.status = cache.status;
        method.apply(ctx, [args]);
      } else {
        if (conf.location){
          conf.location = toLatLng(conf.location);
        }
        if (conf.bounds){
          conf.bounds = toLatLngBounds(conf.bounds);
        }
        geocoder().geocode(
          conf, 
          function(results, status) {
            if (status === google.maps.GeocoderStatus.OK){
              geocoderCache.store(conf, {results:results, status:status});
              args.latLng = results[0].geometry.location;
              args.results = results;
              args.status = status;
              method.apply(ctx, [args]);
            } else if ( (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) && (attempt < defaults.queryLimit.attempt) ){
              setTimeout(
                function(){
                  resolveLatLng.apply(that, [ctx, method, runLatLng, args, attempt+1]);
                },
                defaults.queryLimit.delay + Math.floor(Math.random() * defaults.queryLimit.random)
              );
            } else {
              error("geocode failed", status, conf);
              args.latLng = args.results = false;
              args.status = status;
              method.apply(ctx, [args]);
            }
          }
        );
      }
    } else {
      args.latLng = toLatLng(args.todo, false, true);
      method.apply(ctx, [args]);
    }
  }
  
  function resolveAllLatLng(list, ctx, method, args){
    var that = this, i = -1;
    
    function resolve(){
      // look for next address to resolve
      do{
        i++;
      }while( (i < list.length) && !("address" in list[i]) );
      
      // no address found, so run method 
      if (i >= list.length){
        method.apply(ctx, [args]);
        return;
      }
      
      resolveLatLng(
        that,
        function(args){
          delete args.todo;
          $.extend(list[i], args);
          resolve.apply(that, []); // resolve next (using apply avoid too much recursion)
        },
        true,
        {todo:list[i]}
      );
    }
    resolve();
  }
    
  /**
   * geolocalise the user and return a LatLng
   **/
  function geoloc(ctx, method, args){
    var is_echo = false; // sometime, a kind of echo appear, this trick will notice once the first call is run to ignore the next one
    if (navigator && navigator.geolocation){
       navigator.geolocation.getCurrentPosition(
        function(pos) {
          if (is_echo){
            return;
          }
          is_echo = true;
          args.latLng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
          method.apply(ctx, [args]);
        }, 
        function() {
          if (is_echo){
            return;
          }
          is_echo = true;
          args.latLng = false;
          method.apply(ctx, [args]);
        },
        args.opts.getCurrentPosition
      );
    } else {
      args.latLng = false;
      method.apply(ctx, [args]);
    }
  }

  /***************************************************************************/
  /*                                GMAP3                                    */
  /***************************************************************************/
  
  function Gmap3($this){
    var that = this,
      stack = new Stack(),
      store = new Store(),
      map = null,
      task;
    
    //-----------------------------------------------------------------------//
    // Stack tools
    //-----------------------------------------------------------------------//

    /**
     * store actions to execute in a stack manager
     **/
    this._plan = function(list){
      for(var k = 0; k < list.length; k++) {
        stack.add(new Task(that, end, list[k]));
      }
      run();
    };
    
    /**
     * if not running, start next action in stack
     **/
    function run(){
      if (!task && (task = stack.get())){
        task.run();
      }
    }
    
    /**
     * called when action in finished, to acknoledge the current in stack and start next one
     **/
     function end(){
      task = null;
      stack.ack();
      run.call(that); // restart to high level scope
    }
    
    //-----------------------------------------------------------------------//
    // Tools
    //-----------------------------------------------------------------------//
    
    /**
     * execute callback functions 
     **/
    function callback(args){
      if (args.todo.callback) {
        var params = Array.prototype.slice.call(arguments, 1);
        if (typeof args.todo.callback === "function") {
          args.todo.callback.apply($this, params);
        } else if ($.isArray(args.todo.callback)) {
          if (typeof args.todo.callback[1] === "function") {
            args.todo.callback[1].apply(args.todo.callback[0], params);
          }
        }
      }
    }
    
    /**
     * execute ending functions 
     **/
    function manageEnd(args, obj, id){
      if (id){
        attachEvents($this, args, obj, id);
      }
      callback(args, obj);
      task.ack(obj);
    }
    
    /**
     * initialize the map if not yet initialized
     **/
    function newMap(latLng, args){
      args = args || {};
      if (map) {
        if (args.todo && args.todo.options){
          if (args.todo.options.center) {
            args.todo.options.center = toLatLng(args.todo.options.center);
          }
          map.setOptions(args.todo.options);
        }
      } else {
        var opts = args.opts || $.extend(true, {}, defaults.map, args.todo && args.todo.options ? args.todo.options : {});
        opts.center = latLng || toLatLng(opts.center);
        map = new defaults.classes.Map($this.get(0), opts);
      }
    }
     
    /* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
    => function with latLng resolution
    = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */
    
    /**
     * Initialize google.maps.Map object
     **/
    this.map = function(args){
      newMap(args.latLng, args);
      attachEvents($this, args, map);
      manageEnd(args, map);
    };
    
    /**
     * destroy an existing instance
     **/
    this.destroy = function(args){
      store.clear();
      $this.empty();
      if (map){
        map = null;
      }
      manageEnd(args, true);
    };
    
    /**
     * add an infowindow
     **/
    this.infowindow = function(args){
      var objs = [], multiple = "values" in args.todo;
      if (!multiple){
        if (args.latLng) {
          args.opts.position = args.latLng;
        }
        args.todo.values = [{options:args.opts}];
      }
      $.each(args.todo.values, function(i, value){
        var id, obj, todo = tuple(args, value);
        todo.options.position = todo.options.position ? toLatLng(todo.options.position) : toLatLng(value.latLng);
        if (!map){
          newMap(todo.options.position);
        }
        obj = new defaults.classes.InfoWindow(todo.options);
        if (obj && ((todo.open === undef) || todo.open)){
          if (multiple){
            obj.open(map, todo.anchor ? todo.anchor : undef);
          } else {
            obj.open(map, todo.anchor ? todo.anchor : (args.latLng ? undef : (args.session.marker ? args.session.marker : undef)));
          }
        }
        objs.push(obj);
        id = store.add({todo:todo}, "infowindow", obj);
        attachEvents($this, {todo:todo}, obj, id);
      });
      manageEnd(args, multiple ? objs : objs[0]);
    };
    
    /**
     * add a circle
     **/
    this.circle = function(args){
      var objs = [], multiple = "values" in args.todo;
      if (!multiple){
        args.opts.center = args.latLng || toLatLng(args.opts.center);
        args.todo.values = [{options:args.opts}];
      }
      if (!args.todo.values.length){
        manageEnd(args, false);
        return;
      }
      $.each(args.todo.values, function(i, value){
        var id, obj, todo = tuple(args, value);
        todo.options.center = todo.options.center ? toLatLng(todo.options.center) : toLatLng(value);
        if (!map){
          newMap(todo.options.center);
        }
        todo.options.map = map;
        obj = new defaults.classes.Circle(todo.options);
        objs.push(obj);
        id = store.add({todo:todo}, "circle", obj);
        attachEvents($this, {todo:todo}, obj, id);
      });
      manageEnd(args, multiple ? objs : objs[0]);
    };
    
    /**
     * add an overlay
     **/
    this.overlay = function(args, internal){
      var objs = [], multiple = "values" in args.todo;
      if (!multiple){
        args.todo.values = [{latLng: args.latLng, options: args.opts}];
      }
      if (!args.todo.values.length){
        manageEnd(args, false);
        return;
      }
      if (!OverlayView.__initialised) {
        OverlayView.prototype = new defaults.classes.OverlayView();
        OverlayView.__initialised = true;
      }
      $.each(args.todo.values, function(i, value){
        var id, obj, todo = tuple(args, value),
            $div = $(document.createElement("div")).css({
              border: "none",
              borderWidth: "0px",
              position: "absolute"
            });
        $div.append(todo.options.content);
        obj = new OverlayView(map, todo.options, toLatLng(todo) || toLatLng(value), $div);
        objs.push(obj);
        $div = null; // memory leak
        if (!internal){
          id = store.add(args, "overlay", obj);
          attachEvents($this, {todo:todo}, obj, id);
        }
      });
      if (internal){
        return objs[0];
      }
      manageEnd(args, multiple ? objs : objs[0]);
    };
    
    /**
     * returns address structure from latlng        
     **/
    this.getaddress = function(args){
      callback(args, args.results, args.status);
      task.ack();
    };
    
    /**
     * returns latlng from an address
     **/
    this.getlatlng = function(args){
      callback(args, args.results, args.status);
      task.ack();
    };
    
    /**
     * return the max zoom of a location
     **/
    this.getmaxzoom = function(args){
      maxZoomService().getMaxZoomAtLatLng(
        args.latLng, 
        function(result) {
          callback(args, result.status === google.maps.MaxZoomStatus.OK ? result.zoom : false, status);
          task.ack();
        }
      );
    };
    
    /**
     * return the elevation of a location
     **/
    this.getelevation = function(args){
      var i, locations = [],
        f = function(results, status){
          callback(args, status === google.maps.ElevationStatus.OK ? results : false, status);
          task.ack();
        };
      
      if (args.latLng){
        locations.push(args.latLng);
      } else {
        locations = array(args.todo.locations || []);
        for(i=0; i<locations.length; i++){
          locations[i] = toLatLng(locations[i]);
        }
      }
      if (locations.length){
        elevationService().getElevationForLocations({locations:locations}, f);
      } else {
        if (args.todo.path && args.todo.path.length){
          for(i=0; i<args.todo.path.length; i++){
            locations.push(toLatLng(args.todo.path[i]));
          }
        }
        if (locations.length){
          elevationService().getElevationAlongPath({path:locations, samples:args.todo.samples}, f);
        } else {
          task.ack();
        }
      }
    };
    
    /* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
    => function without latLng resolution
    = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */
    
    /**
     * define defaults values
     **/
    this.defaults = function(args){
      $.each(args.todo, function(name, value){
        if (typeof defaults[name] === "object"){
          defaults[name] = $.extend({}, defaults[name], value);
        } else {
          defaults[name] = value;
        }
      });
      task.ack(true);
    };
    
    /**
     * add a rectangle
     **/
    this.rectangle = function(args){
      var objs = [], multiple = "values" in args.todo;
      if (!multiple){
        args.todo.values = [{options:args.opts}];
      }
      if (!args.todo.values.length){
        manageEnd(args, false);
        return;
      }
      $.each(args.todo.values, function(i, value){
        var id, obj, todo = tuple(args, value);
        todo.options.bounds = todo.options.bounds ? toLatLngBounds(todo.options.bounds) : toLatLngBounds(value);
        if (!map){
          newMap(todo.options.bounds.getCenter());
        }
        todo.options.map = map;
        
        obj = new defaults.classes.Rectangle(todo.options);
        objs.push(obj);
        id = store.add({todo:todo}, "rectangle", obj);
        attachEvents($this, {todo:todo}, obj, id);
      });
      manageEnd(args, multiple ? objs : objs[0]);
    };
    
    /**
     * add a polygone / polyline
     **/
    function poly(args, poly, path){
      var objs = [], multiple = "values" in args.todo;
      if (!multiple){
        args.todo.values = [{options:args.opts}];
      }
      if (!args.todo.values.length){
        manageEnd(args, false);
        return;
      }
      newMap();
      $.each(args.todo.values, function(_, value){
        var id, i, j, obj, todo = tuple(args, value);
        if (todo.options[path]){
          if (todo.options[path][0][0] && $.isArray(todo.options[path][0][0])){
            for(i=0; i<todo.options[path].length; i++){
              for(j=0; j<todo.options[path][i].length; j++){
                todo.options[path][i][j] = toLatLng(todo.options[path][i][j]);
              }
            }
          } else {
            for(i=0; i<todo.options[path].length; i++){
              todo.options[path][i] = toLatLng(todo.options[path][i]);
            }
          }
        }
        todo.options.map = map;
        obj = new google.maps[poly](todo.options);
        objs.push(obj);
        id = store.add({todo:todo}, poly.toLowerCase(), obj);
        attachEvents($this, {todo:todo}, obj, id);
      });
      manageEnd(args, multiple ? objs : objs[0]);
    }
    
    this.polyline = function(args){
      poly(args, "Polyline", "path");
    };
    
    this.polygon = function(args){
      poly(args, "Polygon", "paths");
    };
    
    /**
     * add a traffic layer
     **/
    this.trafficlayer = function(args){
      newMap();
      var obj = store.get("trafficlayer");
      if (!obj){
        obj = new defaults.classes.TrafficLayer();
        obj.setMap(map);
        store.add(args, "trafficlayer", obj);
      }
      manageEnd(args, obj);
    };
    
    /**
     * add a bicycling layer
     **/
    this.bicyclinglayer = function(args){
      newMap();
      var obj = store.get("bicyclinglayer");
      if (!obj){
        obj = new defaults.classes.BicyclingLayer();
        obj.setMap(map);
        store.add(args, "bicyclinglayer", obj);
      }
      manageEnd(args, obj);
    };
    
    /**
     * add a ground overlay
     **/
    this.groundoverlay = function(args){
      args.opts.bounds = toLatLngBounds(args.opts.bounds);
      if (args.opts.bounds){
        newMap(args.opts.bounds.getCenter());
      }
      var id, obj = new defaults.classes.GroundOverlay(args.opts.url, args.opts.bounds, args.opts.opts);
      obj.setMap(map);
      id = store.add(args, "groundoverlay", obj);
      manageEnd(args, obj, id);
    };
    
    /**
     * set a streetview
     **/
    this.streetviewpanorama = function(args){
      if (!args.opts.opts){
        args.opts.opts = {};
      }
      if (args.latLng){
        args.opts.opts.position = args.latLng;
      } else if (args.opts.opts.position){
        args.opts.opts.position = toLatLng(args.opts.opts.position);
      }
      if (args.todo.divId){
        args.opts.container = document.getElementById(args.todo.divId)
      } else if (args.opts.container){
        args.opts.container = $(args.opts.container).get(0);
      }
      var id, obj = new defaults.classes.StreetViewPanorama(args.opts.container, args.opts.opts);
      if (obj){
        map.setStreetView(obj);
      }
      id = store.add(args, "streetviewpanorama", obj);
      manageEnd(args, obj, id);
    };
    
    this.kmllayer = function(args){
      var objs = [], multiple = "values" in args.todo;
      if (!multiple){
        args.todo.values = [{options:args.opts}];
      }
      if (!args.todo.values.length){
        manageEnd(args, false);
        return;
      }
      $.each(args.todo.values, function(i, value){
        var id, obj, options, todo = tuple(args, value);
        if (!map){
          newMap();
        }
        options = todo.options;
        // compatibility 5.0-
        if (todo.options.opts) {
            options = todo.options.opts;
            if (todo.options.url) {
                options.url = todo.options.url;
            }
        }
        // -- end --
        options.map = map;
        if (googleVersionMin("3.10")) {
            obj = new defaults.classes.KmlLayer(options);
        } else {
            obj = new defaults.classes.KmlLayer(options.url, options);
        }
        objs.push(obj);
        id = store.add({todo:todo}, "kmllayer", obj);
        attachEvents($this, {todo:todo}, obj, id);
      });
      manageEnd(args, multiple ? objs : objs[0]);
    };
    
    /**
     * add a fix panel
     **/
     this.panel = function(args){
      newMap();
      var id, x= 0, y=0, $content,
        $div = $(document.createElement("div"));
      
      $div.css({
        position: "absolute",
        zIndex: 1000,
        visibility: "hidden"
      });
        
      if (args.opts.content){
        $content = $(args.opts.content);
        $div.append($content);
        $this.first().prepend($div);
        
        if (args.opts.left !== undef){
          x = args.opts.left;
        } else if (args.opts.right !== undef){
          x = $this.width() - $content.width() - args.opts.right;
        } else if (args.opts.center){
          x = ($this.width() - $content.width()) / 2;
        }
        
        if (args.opts.top !== undef){
          y = args.opts.top;
        } else if (args.opts.bottom !== undef){
          y = $this.height() - $content.height() - args.opts.bottom;
        } else if (args.opts.middle){
          y = ($this.height() - $content.height()) / 2
        }
      
        $div.css({
            top: y,
            left: x,
            visibility: "visible"
        });
      }

      id = store.add(args, "panel", $div);
      manageEnd(args, $div, id);
      $div = null; // memory leak
    };
    
    /**
     * Create an InternalClusterer object
     **/
    function createClusterer(raw){
      var internalClusterer = new InternalClusterer($this, map, raw),
        todo = {},
        styles = {},
        thresholds = [],
        isInt = /^[0-9]+$/,
        calculator,
        k;

      for(k in raw){
        if (isInt.test(k)){
          thresholds.push(1*k); // cast to int
          styles[k] = raw[k];
          styles[k].width = styles[k].width || 0;
          styles[k].height = styles[k].height || 0;
        } else {
          todo[k] = raw[k];
        }
      }
      thresholds.sort(function (a, b) { return a > b});
      
      // external calculator
      if (todo.calculator){
        calculator = function(indexes){
          var data = [];
          $.each(indexes, function(i, index){
            data.push(internalClusterer.value(index));
          });
          return todo.calculator.apply($this, [data]);
        };
      } else {
        calculator = function(indexes){
          return indexes.length;
        };
      }
      
      // set error function
      internalClusterer.error(function(){
        error.apply(that, arguments);
      });
      
      // set display function
      internalClusterer.display(function(cluster){
        var i, style, atodo, obj, offset,
          cnt = calculator(cluster.indexes);
        
        // look for the style to use
        if (raw.force || cnt > 1) {
          for(i = 0; i < thresholds.length; i++) {
            if (thresholds[i] <= cnt) {
              style = styles[thresholds[i]];
            }
          }
        }
        
        if (style){
          offset = style.offset || [-style.width/2, -style.height/2];
          // create a custom overlay command
          // nb: 2 extends are faster that a deeper extend
          atodo = $.extend({}, todo);
          atodo.options = $.extend({
            pane: "overlayLayer",
            content:style.content ? style.content.replace("CLUSTER_COUNT", cnt) : "",
            offset:{
              x: ("x" in offset ? offset.x : offset[0]) || 0,
              y: ("y" in offset ? offset.y : offset[1]) || 0
            }
          },
          todo.options || {});
          
          obj = that.overlay({todo:atodo, opts:atodo.options, latLng:toLatLng(cluster)}, true);
          
          atodo.options.pane = "floatShadow";
          atodo.options.content = $(document.createElement("div")).width(style.width+"px").height(style.height+"px").css({cursor:"pointer"});
          shadow = that.overlay({todo:atodo, opts:atodo.options, latLng:toLatLng(cluster)}, true);
          
          // store data to the clusterer
          todo.data = {
            latLng: toLatLng(cluster),
            markers:[]
          };
          $.each(cluster.indexes, function(i, index){
            todo.data.markers.push(internalClusterer.value(index));
            if (internalClusterer.markerIsSet(index)){
              internalClusterer.marker(index).setMap(null);
            }
          });
          attachEvents($this, {todo:todo}, shadow, undef, {main:obj, shadow:shadow});
          internalClusterer.store(cluster, obj, shadow);
        } else {
          $.each(cluster.indexes, function(i, index){
            internalClusterer.marker(index).setMap(map);
          });
        }
      });
      
      return internalClusterer;
    }
    /**
     *  add a marker
     **/
    this.marker = function(args){
      var multiple = "values" in args.todo,
        init = !map;
      if (!multiple){
        args.opts.position = args.latLng || toLatLng(args.opts.position);
        args.todo.values = [{options:args.opts}];
      }
      if (!args.todo.values.length){
        manageEnd(args, false);
        return;
      }
      if (init){
        newMap();
      }
      
      if (args.todo.cluster && !map.getBounds()){ // map not initialised => bounds not available : wait for map if clustering feature is required
        google.maps.event.addListenerOnce(map, "bounds_changed", function() { that.marker.apply(that, [args]); });
        return;
      }
      if (args.todo.cluster){
        var clusterer, internalClusterer;
        if (args.todo.cluster instanceof Clusterer){
          clusterer = args.todo.cluster;
          internalClusterer = store.getById(clusterer.id(), true);
        } else {
          internalClusterer = createClusterer(args.todo.cluster);
          clusterer = new Clusterer(globalId(args.todo.id, true), internalClusterer);
          store.add(args, "clusterer", clusterer, internalClusterer);
        }
        internalClusterer.beginUpdate();
        
        $.each(args.todo.values, function(i, value){
          var todo = tuple(args, value);
          todo.options.position = todo.options.position ? toLatLng(todo.options.position) : toLatLng(value);
          todo.options.map = map;
          if (init){
            map.setCenter(todo.options.position);
            init = false;
          }
          internalClusterer.add(todo, value);
        });
        
        internalClusterer.endUpdate();
        manageEnd(args, clusterer);
        
      } else {
        var objs = [];
        $.each(args.todo.values, function(i, value){
          var id, obj, todo = tuple(args, value);
          todo.options.position = todo.options.position ? toLatLng(todo.options.position) : toLatLng(value);
          todo.options.map = map;
          if (init){
            map.setCenter(todo.options.position);
            init = false;
          }
          obj = new defaults.classes.Marker(todo.options);
          objs.push(obj);
          id = store.add({todo:todo}, "marker", obj);
          attachEvents($this, {todo:todo}, obj, id);
        });
        manageEnd(args, multiple ? objs : objs[0]);
      }
    };
    
    /**
     * return a route
     **/
    this.getroute = function(args){
      args.opts.origin = toLatLng(args.opts.origin, true);
      args.opts.destination = toLatLng(args.opts.destination, true);
      directionsService().route(
        args.opts,
        function(results, status) {
          callback(args, status == google.maps.DirectionsStatus.OK ? results : false, status);
          task.ack();
        }
      );
    };
    
    /**
     * add a direction renderer
     **/
    this.directionsrenderer = function(args){
      args.opts.map = map;
      var id, obj = new google.maps.DirectionsRenderer(args.opts);
      if (args.todo.divId){
        obj.setPanel(document.getElementById(args.todo.divId));
      } else if (args.todo.container){
        obj.setPanel($(args.todo.container).get(0));
      }
      id = store.add(args, "directionsrenderer", obj);
      manageEnd(args, obj, id);
    };
    
    /**
     * returns latLng of the user        
     **/
    this.getgeoloc = function(args){
      manageEnd(args, args.latLng);
    };
    
    /**
     * add a style
     **/
    this.styledmaptype = function(args){
      newMap();
      var obj = new defaults.classes.StyledMapType(args.todo.styles, args.opts);
      map.mapTypes.set(args.todo.id, obj);
      manageEnd(args, obj);
    };
    
    /**
     * add an imageMapType
     **/
    this.imagemaptype = function(args){
      newMap();
      var obj = new defaults.classes.ImageMapType(args.opts);
      map.mapTypes.set(args.todo.id, obj);
      manageEnd(args, obj);
    };
    
    /**
     * autofit a map using its overlays (markers, rectangles ...)
     **/
    this.autofit = function(args){
      var bounds = new google.maps.LatLngBounds();
      $.each(store.all(), function(i, obj){
        if (obj.getPosition){
          bounds.extend(obj.getPosition());
        } else if (obj.getBounds){
          bounds.extend(obj.getBounds().getNorthEast());
          bounds.extend(obj.getBounds().getSouthWest());
        } else if (obj.getPaths){
          obj.getPaths().forEach(function(path){
            path.forEach(function(latLng){
              bounds.extend(latLng);
            });
          });
        } else if (obj.getPath){
          obj.getPath().forEach(function(latLng){
            bounds.extend(latLng);""
          });
        } else if (obj.getCenter){
          bounds.extend(obj.getCenter());
        } else if (obj instanceof Clusterer){
          obj = store.getById(obj.id(), true);
          if (obj){
            obj.autofit(bounds);
          }
        }
      });

      if (!bounds.isEmpty() && (!map.getBounds() || !map.getBounds().equals(bounds))){
        if ("maxZoom" in args.todo){
          // fitBouds Callback event => detect zoom level and check maxZoom
          google.maps.event.addListenerOnce(
            map, 
            "bounds_changed", 
            function() {
              if (this.getZoom() > args.todo.maxZoom){
                this.setZoom(args.todo.maxZoom);
              }
            }
          );
        }
        map.fitBounds(bounds);
      }
      manageEnd(args, true);
    };
    
    /**
     * remove objects from a map
     **/
    this.clear = function(args){
      if (typeof args.todo === "string"){
        if (store.clearById(args.todo) || store.objClearById(args.todo)){
          manageEnd(args, true);
          return;
        }
        args.todo = {name:args.todo};
      }
      if (args.todo.id){
        $.each(array(args.todo.id), function(i, id){
          store.clearById(id) || store.objClearById(id);
        });
      } else {
        store.clear(array(args.todo.name), args.todo.last, args.todo.first, args.todo.tag);
        store.objClear(array(args.todo.name), args.todo.last, args.todo.first, args.todo.tag);
      }
      manageEnd(args, true);
    };
    
    /**
     * run a function on each items selected
     **/
    this.exec = function(args){
      var that = this;
      $.each(array(args.todo.func), function(i, func){
        $.each(that.get(args.todo, true, args.todo.hasOwnProperty("full") ? args.todo.full : true), function(j, res){
          func.call($this, res);
        });
      });
      manageEnd(args, true);
    };
    
    /**
     * return objects previously created
     **/
    this.get = function(args, direct, full){
      var name, res,
          todo = direct ? args : args.todo;
      if (!direct) {
        full = todo.full;
      }
      if (typeof todo === "string"){
        res = store.getById(todo, false, full) || store.objGetById(todo);
        if (res === false){
          name = todo;
          todo = {};
        }
      } else {
        name = todo.name;
      }
      if (name === "map"){
        res = map;
      }
      if (!res){
        res = [];
        if (todo.id){
            $.each(array(todo.id), function(i, id) {
                res.push(store.getById(id, false, full) || store.objGetById(id));
            });
            if (!$.isArray(todo.id)) {
              res = res[0];
            }
        } else {
          $.each(name ? array(name) : [undef], function(i, aName) {
            var result;
            if (todo.first){
                result = store.get(aName, false, todo.tag, full);
                if (result) res.push(result);
            } else if (todo.all){
                $.each(store.all(aName, todo.tag, full), function(i, result){
                  res.push(result);
                });
            } else {
                result = store.get(aName, true, todo.tag, full);
                if (result) res.push(result);
            }
          });
          if (!todo.all && !$.isArray(name)) {
            res = res[0];
          }
        }
      }
      res = $.isArray(res) || !todo.all ? res : [res];
      if (direct){
        return res;
      } else {
        manageEnd(args, res);
      }
    };

    /**
     * return the distance between an origin and a destination
     *      
     **/
    this.getdistance = function(args){
      var i;
      args.opts.origins = array(args.opts.origins);
      for(i=0; i<args.opts.origins.length; i++){
        args.opts.origins[i] = toLatLng(args.opts.origins[i], true);
      }
      args.opts.destinations = array(args.opts.destinations);
      for(i=0; i<args.opts.destinations.length; i++){
        args.opts.destinations[i] = toLatLng(args.opts.destinations[i], true);
      }
      distanceMatrixService().getDistanceMatrix(
        args.opts,
        function(results, status) {
          callback(args, status === google.maps.DistanceMatrixStatus.OK ? results : false, status);
          task.ack();
        }
      );
    };
    
    /**
     * trigger events on the map 
     **/
    this.trigger = function(args){
      if (typeof args.todo === "string"){
        google.maps.event.trigger(map, args.todo);
      } else {
        var options = [map, args.todo.eventName];
        if (args.todo.var_args) {
            $.each(args.todo.var_args, function(i, v){
              options.push(v);
            });
        }
        google.maps.event.trigger.apply(google.maps.event, options);
      }
      callback(args);
      task.ack();
    };
  }

  /**
   * Return true if get is a direct call
   * it means :
   *   - get is the only key
   *   - get has no callback
   * @param obj {Object} The request to check
   * @return {Boolean}
   */
  function isDirectGet(obj) {
    var k;
    if (!typeof obj === "object" || !obj.hasOwnProperty("get")){
      return false;
    }
    for(k in obj) {
      if (k !== "get") {
        return false;
      }
    }
    return !obj.get.hasOwnProperty("callback");
  }
  
  //-----------------------------------------------------------------------//
  // jQuery plugin
  //-----------------------------------------------------------------------//
    
  $.fn.gmap3 = function(){
    var i, list = [], empty = true, results = [];
    
    // init library
    initDefaults();
    
    // store all arguments in a todo list 
    for(i=0; i<arguments.length; i++){
      if (arguments[i]){
        list.push(arguments[i]);
      }
    }

    // resolve empty call - run init
    if (!list.length) {
      list.push("map");
    }

    // loop on each jQuery object
    $.each(this, function() {
      var $this = $(this), gmap3 = $this.data("gmap3");
      empty = false;
      if (!gmap3){
        gmap3 = new Gmap3($this);
        $this.data("gmap3", gmap3);
      }
      if (list.length === 1 && (list[0] === "get" || isDirectGet(list[0]))){
        if (list[0] === "get") {
          results.push(gmap3.get("map", true));
        } else {
          results.push(gmap3.get(list[0].get, true, list[0].get.full));
        }
      } else {
        gmap3._plan(list);
      }
    });
    
    // return for direct call only 
    if (results.length){
      if (results.length === 1){ // 1 css selector
        return results[0];
      } else {
        return results;
      }
    }
    
    return this;
  }

})(jQuery);
