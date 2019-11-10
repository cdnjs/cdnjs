/*! 
 * medium-editor-insert-plugin v0.2.9 - jQuery insert plugin for MediumEditor
 *
 * https://github.com/orthes/medium-editor-insert-plugin
 * 
 * Copyright (c) 2014 Pavel Linkesch (http://linkesch.sk)
 * Released under the MIT license
 */

(function ($) {

  $.fn.mediumInsert.registerAddon('embeds', {

    /**
    * Embed default options
    */

    default: {
      urlPlaceholder: 'type or paste url here'
    },

    /**
     * Embeds initial function
     * @return {void}
     */
    init : function (options) {
      this.options = $.extend(this.default, options);
      this.$el = $.fn.mediumInsert.insert.$el;
      this.setEmbedButtonEvents();
      this.preparePreviousEmbeds();
    },

    insertButton : function (buttonLabels) {
      var label = 'Embed';
      if (buttonLabels == 'fontawesome' || typeof buttonLabels === 'object' && !!(buttonLabels.fontawesome)) {
        label = '<i class="fa fa-code"></i>';
      }
      return '<button data-addon="embeds" data-action="add" class="medium-editor-action mediumInsert-action">' + label + '</button>';
    },

    /**
     * Add embed to $placeholder
     * @param {element} $placeholder $placeholder to add embed to
     * @return {void}
     */
    add : function ($placeholder) {
      $.fn.mediumInsert.insert.deselect();


      var formHtml = '<div class="medium-editor-toolbar-form-anchor mediumInsert-embedsWire" style="display: block;"><input type="text" value="" placeholder="' + this.options.urlPlaceholder + '" class="mediumInsert-embedsText"></div>';
      $(formHtml).appendTo($placeholder.prev());
      setTimeout(function () {
        $placeholder.prev().find('input').focus();
      }, 50);

      $.fn.mediumInsert.insert.deselect();

      this.currentPlaceholder = $placeholder;
      $(".mediumInsert-embedsText").focus();
    },

    /**
    * Make existing embeds interactive
    *
    * @return {void}
    */

    preparePreviousEmbeds: function () {
      this.$el.find('.mediumInsert-embeds').each(function() {
        var $parent = $(this).parent();
        $parent.html('<div class="mediumInsert-placeholder" draggable="true">' + $parent.html() + '</div>');
      });
    },

    setEmbedButtonEvents : function () {
      var that = this;
      $(document).on('keypress', 'input.mediumInsert-embedsText', function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
          that.setEnterActionEvents();
          that.removeToolbar();
        }
      });

      this.$el.on('blur', '.mediumInsert-embedsText', function () {
        that.removeToolbar();
      });

    },
    setEnterActionEvents : function () {
      var that = this;
      if ($.fn.mediumInsert.settings.enabled === false) {
        return false;
      }

      var url = $("input.mediumInsert-embedsText").val();
      if (!url) {
        return false;
      }
      var embed_tag = that.convertUrlToEmbedTag(url);
      if (!embed_tag) {
        alert('Incorrect URL format specified');
        return false;
      } else {
        embed_tag = $('<div class="mediumInsert-embeds"></div>').append(embed_tag);
        that.currentPlaceholder.append(embed_tag);

        that.currentPlaceholder.closest('[data-medium-element]').trigger('keyup').trigger('input');
      }
    },

    removeToolbar : function () {
      $(".mediumInsert-embedsWire").remove();
    },

    convertUrlToEmbedTag : function (url) {
      var embed_tag = url.replace(/\n?/g, '').replace(/^((http(s)?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|v\/)?)([a-zA-Z0-9-_]+)(.*)?$/, '<div class="video"><iframe width="420" height="315" src="//www.youtube.com/embed/$7" frameborder="0" allowfullscreen></iframe></div>')
        .replace(/http:\/\/vimeo\.com\/(\d+)$/, '<iframe src="//player.vimeo.com/video/$1" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')

        // TWITTER EMBEDDING NEEDS REWORK! Serialized version of embeded Twitter status is unusable because the Twitter script complitely removes blockquote element and replaces it with iframe
        //.replace(/https:\/\/twitter\.com\/(\w+)\/status\/(\d+)\/?$/, '<blockquote class="twitter-tweet" lang="en"><a href="https://twitter.com/$1/statuses/$2"></a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>')

        // FACEBOOK EMBEDDING NEEDS REWORK! Similarly to Twitter, FB script removes .fb-post element and replaces it with iframe, which is unusable after serializing editor's content
        //.replace(/https:\/\/www\.facebook\.com\/(\w+)\/posts\/(\d+)$/, '<div id="fb-root"></div><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/en_US/all.js#xfbml=1"; fjs.parentNode.insertBefore(js, fjs); }(document, "script", "facebook-jssdk"));</script><div class="fb-post" data-href="https://www.facebook.com/$1/posts/$2"></div>')

        .replace(/http:\/\/instagram\.com\/p\/(.+)\/?$/, '<span class="instagram"><iframe src="//instagram.com/p/$1/embed/" width="612" height="710" frameborder="0" scrolling="no" allowtransparency="true"></iframe></span>');
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(embed_tag) ? embed_tag : false;
    }

  });

}(jQuery));
