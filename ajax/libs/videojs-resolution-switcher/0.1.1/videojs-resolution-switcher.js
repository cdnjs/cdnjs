/*! videojs-resolution-switcher - v0.0.0 - 2015-7-26
 * Copyright (c) 2015 Kasper Moskwiak
 * Licensed under the Apache-2.0 license. */
(function(window, videojs) {
  'use strict';

  var defaults = {},
      videoJsResolutionSwitcher,
      groupedSrc;

  /**
   * Initialize the plugin.
   * @param options (optional) {object} configuration for the plugin
   */
  videoJsResolutionSwitcher = function(options) {
    var settings = videojs.mergeOptions(defaults, options),
        player = this,
        label = document.createElement('span');

    label.classList.add('vjs-resolution-button-label');

    /*
     * Resolution menu item
     */
    var MenuItem = videojs.getComponent('MenuItem');
    var ResolutionMenuItem = videojs.extend(MenuItem, {
      constructor: function(player, options){

        MenuItem.call(this, player, options);
        this.src = options.src;
        this.type = options.type;

        this.on('click', this.onClick);
        this.on('touchstart', this.onClick);
      },
      onClick: function(){
        // Hide bigPlayButton
        player.bigPlayButton.hide();
        // Remember player state
        var currentTime = player.currentTime();
        var isPaused = player.paused();
        // Change menu button label
        label.innerHTML = this.options_.label;
        // Change player source and wait for loadedmetadata event, then play video
        player.src({src: this.src, type: this.type}).one( 'loadedmetadata', function() {
          player.currentTime(currentTime);
          if(!isPaused){ player.play(); }
          player.trigger('resolutionchange');
        });
      }
    });


   /*
    * Resolution menu button
    */
    var MenuButton = videojs.getComponent('MenuButton');
    var ResolutionMenuButton = videojs.extend(MenuButton, {
      constructor: function(player, options){
        this.sources = options.sources;
        MenuButton.call(this, player, options);
        this.controlText('Quality');

        if(settings.dynamicLabel){
          this.el().appendChild(label);
        }else{
          var staticLabel = document.createElement('span');
          staticLabel.classList.add('vjs-resolution-button-staticlabel');
          this.el().appendChild(staticLabel);
        }
      },
      createItems: function(){
        var sources = this.sources;
        var menuItems = [];
        for(var i = 0; i < sources.length; i++){
          menuItems.push(new ResolutionMenuItem(player, {
            label: sources[i].label,
            src: sources[i].src,
            type: sources[i].type
          }));
        }
        return menuItems;
      }
    });


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
      var menuButton = new ResolutionMenuButton(player, { sources: src });
      menuButton.el().classList.add('vjs-resolution-button');
      player.controlBar.resolutionSwitcher = player.controlBar.addChild(menuButton);
      var newSource = chooseSrc(src);
      label.innerHTML = newSource.label;
      player.src(newSource);
    };

    /**
     * Method used for sorting list of sources
     * @param   {Object} a source object with res property
     * @param   {Object} b source object with res property
     * @returns {Number} result of comparation
     */
    function compareResolutions(a, b){
      if(!a.res || !b.res){ return 0; }
      return (+b.res)-(+a.res);
    }

    /**
     * Group sources by label, resolution and type
     * @param   {Array}  src Array of sources
     * @returns {Object} grouped sources: { label: {}, res: {}, type: {} }
     */
    function bucketSources(src){
      var resolutions = {
        label: {},
        res: {},
        type: {}
      };
      for(var i = 0; i<src.length; i++){
        resolutions.label[src[i].label] = resolutions.label[src[i].label] || [];
        resolutions.res[src[i].res] = resolutions.res[src[i].res] || [];
        resolutions.type[src[i].type] = resolutions.type[src[i].type] || [];
        resolutions.label[src[i].label].push(src[i]);
        resolutions.res[src[i].res].push(src[i]);
        resolutions.type[src[i].type].push(src[i]);
      }
      return resolutions;
    }

    /**
     * Choose src if option.default is specified
     * @param   {Array}  src Array of sources
     * @returns {Object} source object
     */
    function chooseSrc(src){
      if(settings.default === 'low'){ return src[src.length - 1]; }
      if(settings.default === 'high'){ return src[0]; }
      if(groupedSrc.res[settings.default]){ return groupedSrc.res[settings.default][0]; }
      return src[src.length - 1];
    }

    // Create resolution switcher for videos form <source> tag inside <video>
    if(player.options_.sources.length > 1){
      player.updateSrc(player.options_.sources);
    }

  };

  // register the plugin
  videojs.plugin('videoJsResolutionSwitcher', videoJsResolutionSwitcher);
})(window, window.videojs);
