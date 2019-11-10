/*! videojs-markers - v0.6.1 - 2016-10-24
* Copyright (c) 2016 ; Licensed  */
'use strict';

(function ($, videojs, undefined) {
  // default setting
  var defaultSetting = {
    markerStyle: {
      'width': '7px',
      'border-radius': '30%',
      'background-color': 'red'
    },
    markerTip: {
      display: true,
      text: function text(marker) {
        return "Break: " + marker.text;
      },
      time: function time(marker) {
        return marker.time;
      }
    },
    breakOverlay: {
      display: false,
      displayTime: 3,
      text: function text(marker) {
        return "Break overlay: " + marker.overlayText;
      },
      style: {
        'width': '100%',
        'height': '20%',
        'background-color': 'rgba(0,0,0,0.7)',
        'color': 'white',
        'font-size': '17px'
      }
    },
    onMarkerClick: function onMarkerClick(marker) {},
    onMarkerReached: function onMarkerReached(marker, index) {},
    markers: []
  };

  // create a non-colliding random number
  function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
    return uuid;
  };

  var NULL_INDEX = -1;

  function registerVideoJsMarkersPlugin(options) {
    /**
     * register the markers plugin (dependent on jquery)
     */

    var setting = $.extend(true, {}, defaultSetting, options),
        markersMap = {},
        markersList = [],
        // list of markers sorted by time
    videoWrapper = $(this.el()),
        currentMarkerIndex = NULL_INDEX,
        player = this,
        markerTip = null,
        breakOverlay = null,
        overlayIndex = NULL_INDEX;

    function sortMarkersList() {
      // sort the list by time in asc order
      markersList.sort(function (a, b) {
        return setting.markerTip.time(a) - setting.markerTip.time(b);
      });
    }

    function addMarkers(newMarkers) {
      newMarkers.forEach(function (marker) {
        marker.key = generateUUID();

        videoWrapper.find('.vjs-progress-holder').append(createMarkerDiv(marker));

        // store marker in an internal hash map
        markersMap[marker.key] = marker;
        markersList.push(marker);
      });

      sortMarkersList();
    }

    function getPosition(marker) {
      return setting.markerTip.time(marker) / player.duration() * 100;
    }

    function createMarkerDiv(marker) {
      var markerDiv = $("<div class='vjs-marker'></div>");
      markerDiv.css(setting.markerStyle).css({
        "margin-left": -parseFloat(markerDiv.css("width")) / 2 + 'px',
        "left": getPosition(marker) + '%'
      }).attr("data-marker-key", marker.key).attr("data-marker-time", setting.markerTip.time(marker));

      // add user-defined class to marker
      if (marker.class) {
        markerDiv.addClass(marker.class);
      }

      // bind click event to seek to marker time
      markerDiv.on('click', function (e) {
        var preventDefault = false;
        if (typeof setting.onMarkerClick === "function") {
          // if return false, prevent default behavior
          preventDefault = setting.onMarkerClick(marker) === false;
        }

        if (!preventDefault) {
          var key = $(this).data('marker-key');
          player.currentTime(setting.markerTip.time(markersMap[key]));
        }
      });

      if (setting.markerTip.display) {
        registerMarkerTipHandler(markerDiv);
      }

      return markerDiv;
    }

    function updateMarkers() {
      // update UI for markers whose time changed
      markersList.forEach(function (marker) {
        var markerDiv = videoWrapper.find(".vjs-marker[data-marker-key='" + marker.key + "']");
        var markerTime = setting.markerTip.time(marker);

        if (markerDiv.data('marker-time') !== markerTime) {
          markerDiv.css({ "left": getPosition(marker) + '%' }).attr("data-marker-time", markerTime);
        }
      });
      sortMarkersList();
    }

    function removeMarkers(indexArray) {
      // reset overlay
      if (!!breakOverlay) {
        overlayIndex = NULL_INDEX;
        breakOverlay.css("visibility", "hidden");
      }
      currentMarkerIndex = NULL_INDEX;

      var deleteIndexList = [];
      indexArray.forEach(function (index) {
        var marker = markersList[index];
        if (marker) {
          // delete from memory
          delete markersMap[marker.key];
          deleteIndexList.push(index);

          // delete from dom
          videoWrapper.find(".vjs-marker[data-marker-key='" + marker.key + "']").remove();
        }
      });

      // clean up markers array
      deleteIndexList.reverse();
      deleteIndexList.forEach(function (deleteIndex) {
        markersList.splice(deleteIndex, 1);
      });

      // sort again
      sortMarkersList();
    }

    // attach hover event handler
    function registerMarkerTipHandler(markerDiv) {
      markerDiv.on('mouseover', function () {
        var marker = markersMap[$(markerDiv).data('marker-key')];

        if (!!markerTip) {
          markerTip.find('.vjs-tip-inner').text(setting.markerTip.text(marker));

          // margin-left needs to minus the padding length to align correctly with the marker
          markerTip.css({
            "left": getPosition(marker) + '%',
            "margin-left": -parseFloat(markerTip.width()) / 2 - 5 + 'px',
            "visibility": "visible"
          });
        }
      });

      markerDiv.on('mouseout', function () {
        !!markerTip && markerTip.css("visibility", "hidden");
      });
    }

    function initializeMarkerTip() {
      markerTip = $("<div class='vjs-tip'><div class='vjs-tip-arrow'></div><div class='vjs-tip-inner'></div></div>");
      videoWrapper.find('.vjs-progress-holder').append(markerTip);
    }

    // show or hide break overlays
    function updateBreakOverlay() {
      if (!setting.breakOverlay.display || currentMarkerIndex < 0) {
        return;
      }

      var currentTime = player.currentTime();
      var marker = markersList[currentMarkerIndex];
      var markerTime = setting.markerTip.time(marker);

      if (currentTime >= markerTime && currentTime <= markerTime + setting.breakOverlay.displayTime) {
        if (overlayIndex !== currentMarkerIndex) {
          overlayIndex = currentMarkerIndex;
          breakOverlay && breakOverlay.find('.vjs-break-overlay-text').html(setting.breakOverlay.text(marker));
        }

        breakOverlay && breakOverlay.css('visibility', "visible");
      } else {
        overlayIndex = NULL_INDEX;
        breakOverlay && breakOverlay.css("visibility", "hidden");
      }
    }

    // problem when the next marker is within the overlay display time from the previous marker
    function initializeOverlay() {
      breakOverlay = $("<div class='vjs-break-overlay'><div class='vjs-break-overlay-text'></div></div>").css(setting.breakOverlay.style);
      videoWrapper.append(breakOverlay);
      overlayIndex = NULL_INDEX;
    }

    function onTimeUpdate() {
      onUpdateMarker();
      updateBreakOverlay();
      options.onTimeUpdateAfterMarkerUpdate && options.onTimeUpdateAfterMarkerUpdate();
    }

    function onUpdateMarker() {
      /*
        check marker reached in between markers
        the logic here is that it triggers a new marker reached event only if the player
        enters a new marker range (e.g. from marker 1 to marker 2). Thus, if player is on marker 1 and user clicked on marker 1 again, no new reached event is triggered)
      */
      if (!markersList.length) {
        return;
      }

      var getNextMarkerTime = function getNextMarkerTime(index) {
        if (index < markersList.length - 1) {
          return setting.markerTip.time(markersList[index + 1]);
        }
        // next marker time of last marker would be end of video time
        return player.duration();
      };
      var currentTime = player.currentTime();
      var newMarkerIndex = NULL_INDEX;

      if (currentMarkerIndex !== NULL_INDEX) {
        // check if staying at same marker
        var nextMarkerTime = getNextMarkerTime(currentMarkerIndex);
        if (currentTime >= setting.markerTip.time(markersList[currentMarkerIndex]) && currentTime < nextMarkerTime) {
          return;
        }

        // check for ending (at the end current time equals player duration)
        if (currentMarkerIndex === markersList.length - 1 && currentTime === player.duration()) {
          return;
        }
      }

      // check first marker, no marker is selected
      if (currentTime < setting.markerTip.time(markersList[0])) {
        newMarkerIndex = NULL_INDEX;
      } else {
        // look for new index
        for (var i = 0; i < markersList.length; i++) {
          nextMarkerTime = getNextMarkerTime(i);
          if (currentTime >= setting.markerTip.time(markersList[i]) && currentTime < nextMarkerTime) {
            newMarkerIndex = i;
            break;
          }
        }
      }

      // set new marker index
      if (newMarkerIndex !== currentMarkerIndex) {
        // trigger event if index is not null
        if (newMarkerIndex !== NULL_INDEX && options.onMarkerReached) {
          options.onMarkerReached(markersList[newMarkerIndex], newMarkerIndex);
        }
        currentMarkerIndex = newMarkerIndex;
      }
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
      }
      onTimeUpdate();
      player.on("timeupdate", onTimeUpdate);
    }

    // setup the plugin after we loaded video's meta data
    player.on("loadedmetadata", function () {
      initialize();
    });

    // exposed plugin API
    player.markers = {
      getMarkers: function getMarkers() {
        return markersList;
      },
      next: function next() {
        // go to the next marker from current timestamp
        var currentTime = player.currentTime();
        for (var i = 0; i < markersList.length; i++) {
          var markerTime = setting.markerTip.time(markersList[i]);
          if (markerTime > currentTime) {
            player.currentTime(markerTime);
            break;
          }
        }
      },
      prev: function prev() {
        // go to previous marker
        var currentTime = player.currentTime();
        for (var i = markersList.length - 1; i >= 0; i--) {
          var markerTime = setting.markerTip.time(markersList[i]);
          // add a threshold
          if (markerTime + 0.5 < currentTime) {
            player.currentTime(markerTime);
            return;
          }
        }
      },
      add: function add(newMarkers) {
        // add new markers given an array of index
        addMarkers(newMarkers);
      },
      remove: function remove(indexArray) {
        // remove markers given an array of index
        removeMarkers(indexArray);
      },
      removeAll: function removeAll() {
        var indexArray = [];
        for (var i = 0; i < markersList.length; i++) {
          indexArray.push(i);
        }
        removeMarkers(indexArray);
      },
      updateTime: function updateTime() {
        // notify the plugin to update the UI for changes in marker times
        updateMarkers();
      },
      reset: function reset(newMarkers) {
        // remove all the existing markers and add new ones
        player.markers.removeAll();
        addMarkers(newMarkers);
      },
      destroy: function destroy() {
        // unregister the plugins and clean up even handlers
        player.markers.removeAll();
        breakOverlay && breakOverlay.remove();
        markerTip && markerTip.remove();
        player.off("timeupdate", updateBreakOverlay);
        delete player.markers;
      }
    };
  }

  videojs.plugin('markers', registerVideoJsMarkersPlugin);
})(jQuery, window.videojs);
//# sourceMappingURL=videojs-markers.js.map
