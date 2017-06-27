/*! videojs-markers - v0.4.0 - 2014-12-14
* Copyright (c) 2014 ; Licensed  */
/*! videojs-markers !*/
'use strict'; 

(function($, videojs, undefined) {
   //default setting
   var defaultSetting = {
      markerStyle: {
         'width':'7px',
         'border-radius': '30%',
         'background-color': 'red'
      },
      markerTip: {
         display: true,
         text: function(marker) {
            return "Break: "+ marker.text;
         }
      },
      breakOverlay:{
         display: false,
         displayTime: 3,
         text: function(marker) {
            return "Break overlay: " + marker.overlayText;
         },
         style: {
            'width':'100%',
            'height': '20%',
            'background-color': 'rgba(0,0,0,0.7)',
            'color': 'white',
            'font-size': '17px'
         }
      },
      onMarkerReached: function(marker) {},
      markers: []
   };
   
   // create a non-colliding random number
   function generateUUID() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
         var r = (d + Math.random()*16)%16 | 0;
         d = Math.floor(d/16);
         return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
   };
   
   function registerVideoJsMarkersPlugin(options) {
      /**
       * register the markers plugin (dependent on jquery)
       */
   
      var setting      = $.extend(true, {}, defaultSetting, options),
          markers      = {},
          markersList  = [], // list of markers sorted by time
          videoWrapper = $(this.el()),
          player       = this,
          markerTip    = null,
          breakOverlay = null,
          overlayIndex;
          
      function sortMarkersList() {
         // sort the list by time in asc order
         markersList.sort(function(a, b){return a.time - b.time});
      }
      
      function addMarkers(newMarkers) {
         // create the markers
         var duration = player.duration();
         
         $.each(newMarkers, function(index, marker) {
            marker.position = (marker.time / duration) * 100;
            marker.key = generateUUID();
            marker.div = $("<div class='vjs-marker' data-marker-index='" + marker.key + "'></div>");
            
            marker.div.css(setting.markerStyle)
                      .css({"margin-left" : -parseFloat(marker.div.css("width"))/2 + 'px', 
                            "left" : marker.position + '%'});
            
            // add user-defined class to marker
            if (marker.class) {
               marker.div.addClass(marker.class);
            }
            
            marker.text = marker.text || "";
            marker.overlayText = marker.overlayText || "";
            
            videoWrapper.find('.vjs-progress-control').append(marker.div);
            
            // store marker in an internal hash map
            markers[marker.key] = marker;
            markersList.push(marker);
            
            // register event handlers
            //bind click event to seek to marker time
            marker.div.on('click', function(e) {
               var key = $(this).data('marker-index');
               player.currentTime(markers[key].time);
            });
            
            if (setting.markerTip.display) {
               registerMarkerTipHandler(marker.div);
            }
         });
         
         sortMarkersList();
      }
      
      function removeMarkers(indexArray) {
         // reset overlay
         if (breakOverlay){
             overlayIndex = -1;
             breakOverlay.css("visibility", "hidden");
         }

         for (var i = 0; i < indexArray.length; i++) {
            var index = indexArray[i];
            var marker = markersList[index];
            if (marker) {
               // delete from memory
               delete markers[marker.key];
               markersList[index] = null;
               
               // delete from dom
               videoWrapper.find(".vjs-marker[data-marker-index='" + marker.key +"']").remove();
            }
         }
         
         // clean up array
         for (var i = markersList.length - 1; i >=0; i--) {
            if (markersList[i] === null) {
               markersList.splice(i, 1);
            }
         }
         
         // sort again
         sortMarkersList();
      }
      
      // attach hover event handler
      function registerMarkerTipHandler(markerDiv) {
         
         markerDiv.on('mouseover', function(){
            var id = $(this).data('marker-index');
            
            markerTip.find('.vjs-tip-inner').text(setting.markerTip.text(markers[id]));
            
            // margin-left needs to minus the padding length to align correctly with the marker
            markerTip.css({"left" : markers[id].position + '%',
                           "margin-left" : -parseFloat(markerTip.css("width"))/2 - 5 + 'px',
                           "visibility"  : "visible"});
            
         }).on('mouseout',function(){
            markerTip.css("visibility", "hidden");
         });
      }
      
      function initializeMarkerTip() {
         markerTip = $("<div class='vjs-tip'><div class='vjs-tip-arrow'></div><div class='vjs-tip-inner'></div></div>");
         videoWrapper.find('.vjs-progress-control').append(markerTip);
      }
      
      // show or hide break overlays
      function updateBreakOverlay() {
         var currentTime = player.currentTime();
         
         if(overlayIndex == -1){
            //check if playback enters any break period
            $.each(markers, function(index, marker){
               if (currentTime >= marker.time && currentTime <= (marker.time + setting.breakOverlay.displayTime)) {
                  overlayIndex = marker.key;
                  breakOverlay.find('.vjs-break-overlay-text').text(setting.breakOverlay.text(marker));
                  breakOverlay.css('visibility', "visible");
                  
                  // trigger event
                  if(options.onMarkerReached) {
                    options.onMarkerReached(marker);
                  }

                  return false;
               }
            });
         }else{
            //overlay is on, check if we left the break period yet
            if (currentTime < markers[overlayIndex].time ||
               currentTime > markers[overlayIndex].time + setting.breakOverlay.displayTime) {
               overlayIndex = -1;
               breakOverlay.css("visibility", "hidden");
            }
         }
      }
      
      // problem when the next marker is within the overlay display time from the previous marker
      function initializeOverlay() {
         breakOverlay = $("<div class='vjs-break-overlay'><div class='vjs-break-overlay-text'></div></div>")
            .css(setting.breakOverlay.style);
         videoWrapper.append(breakOverlay);
         overlayIndex = -1;
      }
      
      
      // setup the whole thing
      function initialize() {
         if (setting.markerTip.display) {
            initializeMarkerTip();
         }
      
         // remove existing markers if already initialized
         player.markers.removeAll();
         addMarkers(options.markers);
                  
         if (setting.breakOverlay.display) {
            initializeOverlay();
            //bind timeupdate handle for displaying break overlays
            player.on("timeupdate", updateBreakOverlay);
         }
      }
      
      // setup the plugin after we loaded video's meta data
      player.on("loadedmetadata", function() {
         initialize();
      });
      
      // exposed plugin API
      player.markers = {
         next : function() {
            // go to the next marker from current timestamp
            var currentTime = player.currentTime();
            for (var i = 0; i < markersList.length; i++) {
               if (markersList[i].time > currentTime) {
                  player.currentTime(markersList[i].time);
                  return false;
               }
            }
         },
         prev : function() {
            // go to previous marker
            var currentTime = player.currentTime();
            for (var i = markersList.length - 1; i >=0 ; i--) {
               // add a threshold
               if (markersList[i].time + 0.5 < currentTime) {
                  player.currentTime(markersList[i].time);
                  return false;
               }
            }
         },
         add : function(newMarkers) {
            // add new markers given an array of index
            addMarkers(newMarkers);
         },
         remove: function(indexArray) {
            // remove markers given an array of index
            removeMarkers(indexArray);
         },
         removeAll: function(){
            var indexArray = [];
            for (var i = 0; i < markersList.length; i++) {
               indexArray.push(i);
            }
            removeMarkers(indexArray);
         },
         reset: function(newMarkers){
            // remove all the existing markers and add new ones
            player.markers.removeAll();
            addMarkers(newMarkers);
         },
         destroy: function(){
            // unregister the plugins and clean up even handlers
            player.markers.removeAll();
            breakOverlay.remove();
            markerTip.remove();
            player.off("timeupdate", updateBreakOverlay);
            delete player.markers;
            delete player.getMarkers;
         },
      };
   }

   videojs.plugin('markers', registerVideoJsMarkersPlugin);

})(jQuery, window.videojs);
