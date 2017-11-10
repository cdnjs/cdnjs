/*! Embedly jQuery - v3.0.3 - 2013-03-25
 * https://github.com/embedly/embedly-jquery
 * Copyright (c) 2013 Sean Creeley
 * Licensed BSD
 */ 
(function($) {

  /*
   *  Util Functions
   */

  // Defaults for Embedly.
  var defaults = {
    key:              null,
    endpoint:         'oembed',         // default endpoint is oembed (preview and objectify available too)
    secure:           null,            // use https endpoint vs http
    query:            {},
    method:           'replace',        // embed handling option for standard callback
    addImageStyles:   true,             // add style="" attribute to images for query.maxwidth and query.maxhidth
    wrapElement:      'div',            // standard wrapper around all returned embeds
    className:        'embed',          // class on the wrapper element
    batch:            20,                // Default Batch Size.
    urlRe:            null
  };

  var urlRe = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  function none(obj){
    return obj === null || obj === undefined;
  }
  // Split a list into a bunch of batchs.
  function batch(list, split){
    var batches = [], current = [];
    $.each(list, function(i, obj){
      current.push(obj);
      if (current.length === split){
        batches.push(current);
        current = [];
      }
    });
    if (current.length !== 0){
      batches.push(current);
    }
    return batches;
  }
  // Make an argument a list
  function listify(obj){
    if (none(obj)){
      return [];
    } else if (!$.isArray(obj)){
      return [obj];
    }
    return obj;
  }

  // From: http://bit.ly/T9SjVv
  function zip(arrays) {
    return $.map(arrays[0], function(_,i){
      return [$.map(arrays, function(array){return array[i];})];
    });
  }

  /* Keeper
   *
   * alittle wrapper around Deferred that lets us keep track of
   * all the callbacks that we have.
   */
  var Keeper = function (len, each, after) {
    this.init(len, each, after);
  };
  Keeper.prototype = {

    init: function(urls){
      this.urls = urls;
      this.count = 0;
      this.results = {};
      this._deferred = $.Deferred();
    },
    // Only 2 methods we really care about.
    notify : function(result) {
      // Store the result.
      this.results[result.original_url] = result;
      // Increase the count.
      this.count++;
      // Notify the success functions
      this._deferred.notify.apply(this._deferred, [result]);
      // If all the callbacks have completed, do your thing.
      if (this.count === this.urls.length){
        // This sorts the results in the manner in which they were added.
        var self = this;
        var results = $.map(this.urls, function(url){ return self.results[url];});
        this._deferred.resolve(results);
      }
      return this;
    },
    state: function() {
      return this._deferred.state.apply(this._deferred, arguments);
    }
  };
  window.Keeper = Keeper;

  // direct API for dealing with the
  var API = function () {};
  API.prototype = {
    /*
      For dealing directly with Embedly's API.

      options: {
        key: 'Your API key'
        secure: false,
        query: {
          maxwidth: 500,
          colors: true,
        }
      }
    */
    defaults: {},

    log: function(level, message){
      if (!none(window.console) && !none(window.console[level])){
        window.console[level].apply(window.console, [message]);
      }
    },
    // Based on the method and options, build the url,
    build: function(method, urls, options){
      // Technically, not great.
      options = none(options) ? {}: options;
      // Base method.

      var secure = options.secure;
      if (none(secure)){
        // If the secure param was not see, use the protocol instead.
        secure = window.location.protocol === 'https:'? true:false;
      }

      var base = (secure ? 'https': 'http') +
        '://api.embed.ly/' + (method === 'objectify' ? '2/' : '1/') + method;

      // Base Query;
      var query = none(options.query) ? {} : options.query;
      query.key = options.key;
      base += '?'+$.param(query);

      // Add the urls the way we like.
      base += '&urls='+ $.map(urls, encodeURIComponent).join(',');

      return base;
    },
    // Batch a bunch of URLS up for processing. Will split longer lists out
    // into many batches and return the callback on each and after on done.
    ajax: function(method, urls, options){

      // Use the defaults.
      options = $.extend({}, defaults, $.embedly.defaults, typeof options === 'object' && options);

      if (none(options.key)){
        this.log('error', 'Embedly jQuery requires an API Key. Please sign up for one at http://embed.ly');
        return null;
      }

      // Everything is dealt with in lists.
      urls = listify(urls);

      // add a keeper that holds everything till we are good to go.
      var keeper = new Keeper(urls);

      var valid_urls = [], rejects = [], valid;
      // Debunk the invalid urls right now.
      $.each(urls, function(i, url){
        valid = false;
        // Make sure it's a URL
        if (urlRe.test(url)){
          valid = true;
          // If the urlRe has been defined make sure it works.
          if (options.urlRe !== null && options.urlRe.test && !options.urlRe.test(url)){
            valid = false;
          }
        }
        // deal with the valid urls
        if(valid === true){
          valid_urls.push(url);
        } else {
          // Notify the keeper that we have a bad url.
          rejects.push({
            url: url,
            original_url: url,
            error: true,
            invalid: true,
            type: 'error',
            error_message: 'Invalid URL "'+ url+'"'
          });
        }
      });

      // Put everything into batches, even if these is only one.
      var batches = batch(valid_urls, options.batch), self = this;

      // Actually make those calls.
      $.each(batches, function(i, batch){
        $.ajax({
          url: self.build(method, batch, options),
          dataType: 'jsonp',
          success: function(data){
            // We zip together the urls and the data so we have the original_url
            $.each(zip([batch, data]), function(i, obj){
              var result = obj[1];
              result.original_url = obj[0];
              result.invalid = false;
              keeper.notify(result);
            });
          }
        });
      });

      if (rejects.length){
        // set a short timeout so we can set up progress and done, otherwise
        // the progress notifier will not get all the events.
        setTimeout(function(){
          $.each(rejects, function(i, reject){
            keeper.notify(reject);
          });
        }, 1);
      }

      return keeper._deferred;
    },

    // Wrappers around ajax.
    oembed: function(urls, options){
      return this.ajax('oembed', urls, options);
    },
    preview: function(urls, options){
      return this.ajax('preview', urls, options);
    },
    objectify: function(urls, options){
      return this.ajax('objectify', urls, options);
    },
    extract: function(urls, options){
      return this.ajax('extract', urls, options);
    }
  };

  var Embedly = function (element, url, options) {
    this.init(element, url, options);
  };

  Embedly.prototype = {
    init: function(elem, original_url, options){
      this.elem = elem;
      this.$elem = $(elem);
      this.original_url = original_url;
      this.options = options;
      this.loaded = $.Deferred();

      // Sets up some triggers.
      var self = this;
      this.loaded.done(function(){
        self.$elem.trigger('loaded', [self]);
      });

      // So you can listen when the tag has been initialized;
      this.$elem.trigger('initialized', [this]);
    },
    progress: function(obj){
      $.extend(this, obj);

      // if there is a custom display method, use it.
      if (this.options.display){
        this.options.display.apply(this.elem, [this, this.elem]);
      }
      // We only have a simple case for oEmbed. Everything else should be a custom
      // success method.
      else if(this.options.endpoint === 'oembed'){
        this.display();
      }

      // Notifies all listeners that the data has been loaded.
      this.loaded.resolve(this);
    },
    imageStyle: function(){
      var style = [], units;
      if (this.options.addImageStyles) {
        if (this.options.query.maxwidth) {
          units = isNaN(parseInt(this.options.query.maxwidth, 10)) ? '' : 'px';
            style.push("max-width: " + (this.options.query.maxwidth)+units);
        }
        if (this.options.query.maxheight) {
          units = isNaN(parseInt(this.options.query.maxheight,10)) ? '' : 'px';
            style.push("max-height: " + (this.options.query.maxheight)+units);
          }
       }
       return style.join(';');
    },

    display: function(){
      // Ignore errors
      if (this.type === 'error'){
        return false;
      }

      // Image Style.
      this.style = this.imageStyle();

      var html;
      if (this.type === 'photo'){
        html = "<a href='" + this.original_url + "' target='_blank'>";
        html += "<img style='" + this.style + "' src='" + this.url + "' alt='" + this.title + "' /></a>";
      } else if (this.type === 'video' || this.type === 'rich'){
        html = this.html;
      } else {
        this.title = this.title || this.url;
        html = this.thumbnail_url ? "<img src='" + this.thumbnail_url + "' class='thumb' style='" + this.style + "'/>" : "";
        html += "<a href='" + this.original_url + "'>" + this.title + "</a>";
        html += this.provider_name ? "<a href='" + this.provider_url + "' class='provider'>" + this.provider_name + "</a>" : "";
        html += this.description ? '<div class="description">' + this.description + '</div>' : '';
      }

      if (this.options.wrapElement) {
        html = '<' + this.options.wrapElement+ ' class="' + this.options.className + '">' + html + '</' + this.options.wrapElement + '>';
      }

      this.code = html;
      // Yay.
      if (this.options.method === 'replace'){
        this.$elem.replaceWith(this.code);
      } else if (this.options.method === 'after'){
        this.$elem.after(this.code);
      } else if (this.options.method === 'afterParent'){
        this.$elem.parent().after(this.code);
      } else if (this.options.method === 'replaceParent'){
        this.$elem.parent().replaceWith(this.code);
      }
      // for DOM elements we add the oembed object as a data field to that element and trigger a custom event called oembed
      // with the custom event, developers can do any number of custom interactions with the data that is returned.
      this.$elem.trigger('displayed', [this]);
    }
  };

  // Sets up a generic API for use.
  $.embedly = new API();

  $.fn.embedly = function ( options ) {
    if (options === undefined || typeof options === 'object') {

      // Use the defaults
      options = $.extend({}, defaults, $.embedly.defaults, typeof options === 'object' && options);

      // Kill these early.
      if (none(options.key)){
        $.embedly.log('error', 'Embedly jQuery requires an API Key. Please sign up for one at http://embed.ly');
        return this.each($.noop);
      }
      // Keep track of the nodes we are working on so we can add them to the
      // progress events.
      var nodes = {};

      // Create the node.
      var create = function (elem){
        if (!$.data($(elem), 'embedly')) {
          var url = $(elem).attr('href');

          var node = new Embedly(elem, url, options);
          $.data(elem, 'embedly', node);

          if (nodes.hasOwnProperty(url)){
            nodes[url].push(node);
          } else {
            nodes[url] = [node];
          }
        }
      };

      // Find everything with a URL on it.
      var elems = this.each(function () {
        if ( !none($(this).attr('href')) ){
          create(this);
        } else {
          $(this).find('a').each(function(){
            if ( ! none($(this).attr('href')) ){
              create(this);
            }
          });
        }
      });

      // set up the api call.
      var deferred = $.embedly.ajax(options.endpoint,
        $.map(nodes, function(value, key) {return key;}),
        options)
        .progress(function(obj){
          $.each(nodes[obj.original_url], function(i, node){
            node.progress(obj);
          });
        });

      if (options.progress){
        deferred.progress(options.progress);
      }
      if (options.done){
        deferred.done(options.done);
      }
      return elems;
    }
  };

  // Custom selector.
  $.expr[':'].embedly = function(elem) {
    return ! none($(elem).data('embedly'));
  };

}(jQuery));
