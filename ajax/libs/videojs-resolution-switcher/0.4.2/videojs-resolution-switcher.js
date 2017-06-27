/*! videojs-resolution-switcher - 2015-7-26
 * Copyright (c) 2016 Kasper Moskwiak
 * Modified by Pierre Kraft
 * Licensed under the Apache-2.0 license. */

(function() {
  /* jshint eqnull: true*/
  /* global require */
  'use strict';
  var videojs = null;
  if(typeof window.videojs === 'undefined' && typeof require === 'function') {
    videojs = require('video.js');
  } else {
    videojs = window.videojs;
  }

  (function(window, videojs) {


    var defaults = {},
        videoJsResolutionSwitcher,
        currentResolution = {}, // stores current resolution
        menuItemsHolder = {}; // stores menuItems

    function setSourcesSanitized(player, sources, label, customSourcePicker) {
      currentResolution = {
        label: label,
        sources: sources
      };
      if(typeof customSourcePicker === 'function'){
        return customSourcePicker(player, sources, label);
      }
      return player.src(sources.map(function(src) {
        return {src: src.src, type: src.type, res: src.res};
      }));
    }

  /*
   * Resolution menu item
   */
  var MenuItem = videojs.getComponent('MenuItem');
  var ResolutionMenuItem = videojs.extend(MenuItem, {
    constructor: function(player, options, onClickListener, label){
      this.onClickListener = onClickListener;
      this.label = label;
      // Sets this.player_, this.options_ and initializes the component
      MenuItem.call(this, player, options);
      this.src = options.src;

      this.on('click', this.onClick);
      this.on('touchstart', this.onClick);

      if (options.initialySelected) {
        this.showAsLabel();
        this.selected(true);

        this.addClass('vjs-selected');
      }
    },
    showAsLabel: function() {
      // Change menu button label to the label of this item if the menu button label is provided
      if(this.label) {
        this.label.innerHTML = this.options_.label;
      }
    },
    onClick: function(customSourcePicker){
      this.onClickListener(this);
      // Remember player state
      var currentTime = this.player_.currentTime();
      var isPaused = this.player_.paused();
      this.showAsLabel();

      // add .current class
      this.addClass('vjs-selected');

      // Hide bigPlayButton
      if(!isPaused){
        this.player_.bigPlayButton.hide();
      }
      if(typeof customSourcePicker !== 'function' &&
        typeof this.options_.customSourcePicker === 'function'){
        customSourcePicker = this.options_.customSourcePicker;
      }
      // Change player source and wait for loadeddata event, then play video
      // loadedmetadata doesn't work right now for flash.
      // Probably because of https://github.com/videojs/video-js-swf/issues/124
      // If player preload is 'none' and then loadeddata not fired. So, we need timeupdate event for seek handle (timeupdate doesn't work properly with flash)
      var handleSeekEvent = 'loadeddata';
      if(this.player_.techName_ !== 'Youtube' && this.player_.preload() === 'none' && this.player_.techName_ !== 'Flash') {
        handleSeekEvent = 'timeupdate';
      }
      setSourcesSanitized(this.player_, this.src, this.options_.label, customSourcePicker).one(handleSeekEvent, function() {
        this.player_.currentTime(currentTime);
        this.player_.handleTechSeeked_();
        if(!isPaused){
          // Start playing and hide loadingSpinner (flash issue ?)
          this.player_.play().handleTechSeeked_();
        }
        this.player_.trigger('resolutionchange');
        });
      }
    });


    /*
     * Resolution menu button
     */
     var MenuButton = videojs.getComponent('MenuButton');
     var ResolutionMenuButton = videojs.extend(MenuButton, {
       constructor: function(player, options, settings, label){
        this.sources = options.sources;
        this.label = label;
        this.label.innerHTML = options.initialySelectedLabel;
        // Sets this.player_, this.options_ and initializes the component
        MenuButton.call(this, player, options, settings);
        this.controlText('Quality');

        if(settings.dynamicLabel){
          this.el().appendChild(label);
        }else{
          var staticLabel = document.createElement('span');
					videojs.addClass(staticLabel, 'vjs-resolution-button-staticlabel');
          this.el().appendChild(staticLabel);
        }
       },
       createItems: function(){
         var menuItems = [];
         var labels = (this.sources && this.sources.label) || {};
         var onClickUnselectOthers = function(clickedItem) {
          menuItems.map(function(item) {
            item.selected(item === clickedItem);
            item.removeClass('vjs-selected');
          });
         };

         for (var key in labels) {
           if (labels.hasOwnProperty(key)) {
            menuItems.push(new ResolutionMenuItem(
              this.player_,
              {
                label: key,
                src: labels[key],
                initialySelected: key === this.options_.initialySelectedLabel,
                customSourcePicker: this.options_.customSourcePicker
              },
              onClickUnselectOthers,
              this.label));
             // Store menu item for API calls
             menuItemsHolder[key] = menuItems[menuItems.length - 1];
            }
         }
         return menuItems;
       }
     });

    /**
     * Initialize the plugin.
     * @param {object} [options] configuration for the plugin
     */
    videoJsResolutionSwitcher = function(options) {
      var settings = videojs.mergeOptions(defaults, options),
          player = this,
          label = document.createElement('span'),
          groupedSrc = {};

			videojs.addClass(label, 'vjs-resolution-button-label');
			
      /**
       * Updates player sources or returns current source URL
       * @param   {Array}  [src] array of sources [{src: '', type: '', label: '', res: ''}]
       * @returns {Object|String|Array} videojs player object if used as setter or current source URL, object, or array of sources
       */
      player.updateSrc = function(src){
        //Return current src if src is not given
        if(!src){ return player.src(); }
        // Dispose old resolution menu button before adding new sources
        if(player.controlBar.resolutionSwitcher){
          player.controlBar.resolutionSwitcher.dispose();
          delete player.controlBar.resolutionSwitcher;
        }
        //Sort sources
        src = src.sort(compareResolutions);
        groupedSrc = bucketSources(src);
        var choosen = chooseSrc(groupedSrc, src);
        var menuButton = new ResolutionMenuButton(player, { sources: groupedSrc, initialySelectedLabel: choosen.label , initialySelectedRes: choosen.res , customSourcePicker: settings.customSourcePicker}, settings, label);
				videojs.addClass(menuButton.el(), 'vjs-resolution-button');
        player.controlBar.resolutionSwitcher = player.controlBar.el_.insertBefore(menuButton.el_, player.controlBar.getChild('fullscreenToggle').el_);
        player.controlBar.resolutionSwitcher.dispose = function(){
          this.parentNode.removeChild(this);
        };
        return setSourcesSanitized(player, choosen.sources, choosen.label);
      };

      /**
       * Returns current resolution or sets one when label is specified
       * @param {String}   [label]         label name
       * @param {Function} [customSourcePicker] custom function to choose source. Takes 3 arguments: player, sources, label. Must return player object.
       * @returns {Object}   current resolution object {label: '', sources: []} if used as getter or player object if used as setter
       */
      player.currentResolution = function(label, customSourcePicker){
        if(label == null) { return currentResolution; }
        if(menuItemsHolder[label] != null){
          menuItemsHolder[label].onClick(customSourcePicker);
        }
        return player;
      };

      /**
       * Returns grouped sources by label, resolution and type
       * @returns {Object} grouped sources: { label: { key: [] }, res: { key: [] }, type: { key: [] } }
       */
      player.getGroupedSrc = function(){
        return groupedSrc;
      };

      /**
       * Method used for sorting list of sources
       * @param   {Object} a - source object with res property
       * @param   {Object} b - source object with res property
       * @returns {Number} result of comparation
       */
      function compareResolutions(a, b){
        if(!a.res || !b.res){ return 0; }
        return (+b.res)-(+a.res);
      }

      /**
       * Group sources by label, resolution and type
       * @param   {Array}  src Array of sources
       * @returns {Object} grouped sources: { label: { key: [] }, res: { key: [] }, type: { key: [] } }
       */
      function bucketSources(src){
        var resolutions = {
          label: {},
          res: {},
          type: {}
        };
        src.map(function(source) {
          initResolutionKey(resolutions, 'label', source);
          initResolutionKey(resolutions, 'res', source);
          initResolutionKey(resolutions, 'type', source);

          appendSourceToKey(resolutions, 'label', source);
          appendSourceToKey(resolutions, 'res', source);
          appendSourceToKey(resolutions, 'type', source);
        });
        return resolutions;
      }

      function initResolutionKey(resolutions, key, source) {
        if(resolutions[key][source[key]] == null) {
          resolutions[key][source[key]] = [];
        }
      }

      function appendSourceToKey(resolutions, key, source) {
        resolutions[key][source[key]].push(source);
      }

      /**
       * Choose src if option.default is specified
       * @param   {Object} groupedSrc {res: { key: [] }}
       * @param   {Array}  src Array of sources sorted by resolution used to find high and low res
       * @returns {Object} {res: string, sources: []}
       */
      function chooseSrc(groupedSrc, src){
        var selectedRes = settings['default']; // use array access as default is a reserved keyword
        var selectedLabel = '';
        if (selectedRes === 'high') {
          selectedRes = src[0].res;
          selectedLabel = src[0].label;
        } else if (selectedRes === 'low' || selectedRes == null || !groupedSrc.res[selectedRes]) {
          // Select low-res if default is low or not set
          selectedRes = src[src.length - 1].res;
          selectedLabel = src[src.length -1].label;
        } else if (groupedSrc.res[selectedRes]) {
          selectedLabel = groupedSrc.res[selectedRes][0].label;
        }
				
        return {res: selectedRes, label: selectedLabel, sources: groupedSrc.res[selectedRes]};
      }
			
			function initResolutionForYt(player){
				// Init resolution
				player.tech_.ytPlayer.setPlaybackQuality('default');
				
				// Capture events
				player.tech_.ytPlayer.addEventListener('onPlaybackQualityChange', function(){
					player.trigger('resolutionchange');
				});
				
				// We must wait for play event
				player.one('play', function(){
					var qualities = player.tech_.ytPlayer.getAvailableQualityLevels();
					// Map youtube qualities names
					var _yts = {
						highres: {res: 1080, label: '1080', yt: 'highres'},
						hd1080: {res: 1080, label: '1080', yt: 'hd1080'}, 
						hd720: {res: 720, label: '720', yt: 'hd720'}, 
						large: {res: 480, label: '480', yt: 'large'},
						medium: {res: 360, label: '360', yt: 'medium'}, 
						small: {res: 240, label: '240', yt: 'small'},
						tiny: {res: 144, label: '144', yt: 'tiny'},
						auto: {res: 0, label: 'auto', yt: 'default'}
					};

					var _sources = [];

					qualities.map(function(q){
						_sources.push({
							src: player.src().src,
							type: player.src().type,
							label: _yts[q].label,
							res: _yts[q].res,
							_yt: _yts[q].yt
						});
					});

					groupedSrc = bucketSources(_sources);

					// Overwrite defualt sourcePicer function
					var _customSourcePicker = function(_player, _sources, _label){
						player.tech_.ytPlayer.setPlaybackQuality(_sources[0]._yt);
						return player;
					};

					var choosen = {label: 'auto', res: 0, sources: groupedSrc.label.auto};
					var menuButton = new ResolutionMenuButton(player, { 
						sources: groupedSrc, 
						initialySelectedLabel: choosen.label, 
						initialySelectedRes: choosen.res, 
						customSourcePicker: _customSourcePicker
					}, settings, label);

					menuButton.el().classList.add('vjs-resolution-button');
					player.controlBar.resolutionSwitcher = player.controlBar.addChild(menuButton);
				});
			}
			
			player.ready(function(){
				if(player.options_.sources.length > 1){
					// tech: Html5 and Flash
					// Create resolution switcher for videos form <source> tag inside <video>
					player.updateSrc(player.options_.sources);
				}
				
				if(player.techName_ === 'Youtube'){
					// tech: YouTube
					initResolutionForYt(player);
				}
			});

    };

    // register the plugin
    videojs.plugin('videoJsResolutionSwitcher', videoJsResolutionSwitcher);
  })(window, videojs);
})();
