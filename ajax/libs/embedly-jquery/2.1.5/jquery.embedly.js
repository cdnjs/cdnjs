/*
 * Embedly JQuery v2.1.5
 * ==============
 * This library allows you to easily embed objects on any page.
 * 
 * Requirements:
 * -------------
 * jquery-1.3 or higher
 *
 * Usage:
 * ------
 * There are two ways to interact with this lib. One exposes a simple method to call embedly directly
 *
 * >>> $.embedly('http://www.youtube.com/watch?v=LfamTmY5REw', {}, function(oembed){ alert(oembed.title);});
 * 
 * The oembed is either a json object or null
 * 
 * You can also reference it this way, which will try and replace every link on the page with an embed
 * 
 * Documentation is availiable at http://github.com/embedly/embedly-jquery
 *
 * $('a').embedly();
 * 
 * The Options Are as Follows
 * 
 *  maxWidth : null,
 *  maxHeight: null,
 *  autoplay: null,
 *  width: null,
 *  urlRe : null,
 *  method : 'replace',
 *  wrapElement : 'div', 
 *  className : 'embed',
 *  addImageStyles : true,
 *  wmode : null} //after
 * 
 * http://api.embed.ly/tools/generator - generate your own regex for only sources you want
 * 
 */

 (function($){
   window.embedlyURLre = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
   
   $.embedly = $.embedly || {}
   if ( $.embedly.version ) { return; }

   $.embedly.version = "2.1.1";
   
   $.extend({
     embedly: function(urls, options, callback){
       var elems = [];
       var path = "http://api.embed.ly/";
       var defaults = {
         endpoint:         'oembed',        // default endpoint is oembed (preview and objectify available too)
         maxWidth:         null,             // force a maxWidth on all returned media
         maxHeight:        null,             // force a maxHeight on all returned media
         secure:           false,            // use https endpoint vs http
         wmode:            'opaque',         // for flash elements set a wmode
         autoplay:         null,             // tell videos to autoplay
         width:            null,             // force a width on all video/rich media
         method:           'replace',        // embed handling option for standard callback
         addImageStyles:   true,             // add style="" attribute to images for maxWidth and maxHeight
         wrapElement:      'div',            // standard wrapper around all returned embeds
         className:        'embed',          // class on the wrapper element
         urlRe:            null,             // custom regex function
         key:              null,             // an embed.ly key
         elems:            [],               // array to hold nodes
         success:          null,             // default callback
         error:            null              // error-handling function
       };
       var settings;
       if (typeof options != "undefined")
         settings = $.extend(defaults, options);
       else
         settings = defaults;
       if (!settings.urlRe) {settings.urlRe = window.embedlyURLre; }
       if (typeof urls == "string") urls = new Array(urls);
       if (typeof callback != "undefined"){ settings.success = callback; }
       if (settings.secure) path='https://api.embed.ly/';
       if (settings.success == null) {
         settings.success = function(oembed, dict){
           var _a, elem = $(dict.node);
           if (! (oembed) ) { return null; }
           if ((_a = settings.method) === 'replace') { return elem.replaceWith(oembed.code); } 
           else if (_a === 'after') { return elem.after(oembed.code); } 
           else if (_a === 'afterParent') { return elem.parent().after(oembed.code); }
           else if (_a === 'replaceParent') { return elem.parent().replaceWith(oembed.code); }
         }
       }
       if (settings.error == null) {
         settings.error = function(node, dict){
           // we don't by default handle error cases
           // node is the jQuery representation of the <a> tag
           // dict contains error information
         }
       }
       var urlValid = function(url){
         return settings.urlRe.test(url);
       }

       var getParams = function(urls){
         var _p = "urls="+urls;
         if (settings.maxWidth != null) {_p += '&maxwidth='+ settings.maxWidth;}
         else if (typeof dimensions != "undefined") { _p += '&maxwidth='+ dimensions.width;}
         if (settings.maxHeight != null) {_p += '&maxheight=' +settings.maxHeight;}
         _p += '&wmode='+ settings.wmode;
         if (typeof settings.key == "string") _p += "&key="+settings.key;
         if (typeof settings.autoplay == "string") _p += "&autoplay="+settings.autoplay;
         if (settings.width) _p += "&width="+settings.width;
         return _p;
       }
       var getUrl = function(){
         if (typeof settings.key == "string"){
           if (settings.endpoint.search(/objectify/i) >= 0)
             return path + '2/objectify';
           else if (settings.endpoint.search(/preview/i) >= 0)
             return path + '1/preview';
         }
         return path + "1/oembed";
       }

       var processEmbed = function(oembed, dict) {
           // bypass any embed processing for preview, objectify endpoints
           // for advanced users only
           if(settings.endpoint != 'oembed'){
             return settings.success(oembed, dict);
           }
           
           var _a, code, style, title;
           if ((_a = oembed.type) === 'photo') {
               title = oembed.title || '';
               style = [];
               if (settings.addImageStyles) {
                   if (settings.maxWidth) {
                     units = isNaN(parseInt(settings.maxWidth)) ? '' : 'px';
                       style.push("max-width: " + (settings.maxWidth)+units);
                   }
                   if (settings.maxHeight) {
                     units = isNaN(parseInt(settings.maxHeight)) ? '' : 'px';
                       style.push("max-height: " + (settings.maxHeight)+units);
                   }
               }
               style = style.join(';');
               code = "<a href='" + dict.url + "' target='_blank'><img style='" + style + "' src='" + oembed.url + "' alt='" + title + "' /></a>";
           } else if (_a === 'video') {
               code = oembed.html;
           } else if (_a === 'rich') {
               code = oembed.html;
           } else {
               title = oembed.title || dict.url;
               thumb = oembed.thumbnail_url ? '<img src="'+oembed.thumbnail_url+'" class="thumb" />' : '';
               description = oembed.description;
               provider = oembed.provider_name ? '<a href="'+oembed.provider_url+'" class="provider">'+oembed.provider_name+'</a> - ' : '';
               code = thumb+"<a href='" + dict.url + "'>" + title + "</a>";
               code += provider;
               code += description;
           }
           if (settings.wrapElement && settings.wrapElement == 'div' && $.browser.msie && $.browser.version < 9)
               settings.wrapElement = 'span';
           if (settings.wrapElement) {
               code = '<' + settings.wrapElement+ ' class="'+settings.className+'">' + code + '</'+settings.wrapElement+'>';
           }
           oembed.code = code;
           // for DOM elements we add the oembed object as a data field to that element and trigger a custom event called oembed
           // with the custom event, developers can do any number of custom interactions with the data that is returned.
           if (typeof dict.node != "undefined") { $(dict.node).data('oembed', oembed).trigger('embedly-oembed', [oembed]);  }
           return settings.success(oembed, dict);
       }

       var processBatch = function(batch){
         var data, embed, urls, dimensions;
         urls = $.map(batch,
         function(e, i) {
             if (i == 0) {
                 if ( e.node !== null){
                   node = $(e.node);
                   dimensions = {
                     "width": node.parent().width(),
                     "height": node.parent().height()
                   };
                 }
             }
             return encodeURIComponent(e.url);
         }).join(',');
         $.ajax({
             url: getUrl(),
             dataType: 'jsonp',
             data: getParams(urls),
             success: function(data) {
                 return $.each(data,
                 function(index, elem) {
                     return elem.type != 'error' ? processEmbed(elem, batch[index]) : settings.error(batch[index].node, elem);
                 });
             }
         });
       }
       $.each(urls, function(i, v){
         node = typeof settings.elems !== "undefined" ? settings.elems[i] : null;
         if(typeof node != "undefined" && !urlValid(v)){ 
           $(node).data('oembed', false); 
         }
         var err = {url: v, error_code:400, error_message:'HTTP 400: Bad Request', type:'error'};
         return (v && urlValid(v)) ? elems.push({'url':v, 'node':node }) : settings.error(node, err);
       });
       var _a = [];
       var _b = elems.length;
       for (var i = 0; (0 <= _b ? i < _b: i > _b); i += 20) {
           _a = _a.concat(processBatch(elems.slice(i, i + 20)));
       }
       if(settings.elems){
         return settings.elems;
       } else
         return this;
     }
   });

   $.fn.embedly = function(options, callback){
     var settings = typeof options != "undefined" ? options : {};
     // callback is a legacy option, we should be moving towards including a success method in the options
     if (typeof callback != "undefined") {options.success = callback; }
     //settings.elems = this;
     var urls = new Array();
     var nodes = new Array();
     this.each(function(){
         if (typeof $(this).attr('href') != "undefined"){
           urls.push($(this).attr('href'));
           nodes.push($(this));
         } else {
           $(this).find('a').each(function(){
             urls.push($(this).attr('href'));
             nodes.push($(this));
           });
         }
         settings.elems = nodes;
     });
     var elems = $.embedly(urls, settings);
     return this;
   };
 })(jQuery);