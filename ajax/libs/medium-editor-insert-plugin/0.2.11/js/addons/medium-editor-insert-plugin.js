/*! 
 * medium-editor-insert-plugin v0.2.11 - jQuery insert plugin for MediumEditor
 *
 * https://github.com/orthes/medium-editor-insert-plugin
 * 
 * Copyright (c) 2014 Pavel Linkesch (http://linkesch.sk)
 * Released under the MIT license
 */

/* global MediumEditor */

(function ($) {
  /*
  * Private storage of registered addons
  */
  var addons = {};

  /**
  * Extend MediumEditor functions if the editor exists
  */
  if (MediumEditor && typeof(MediumEditor) === "function") {
      /**
      * Extend MediumEditor's serialize function to get rid of unnecesarry Medium Editor Insert Plugin stuff
      *
      * @return {object} content Object containing HTML content of each element
      */

      MediumEditor.prototype.serialize = function () {
        var i, j,
            elementid,
            content = {},
            $clone, $inserts, $insert, $insertData, html;
        for (i = 0; i < this.elements.length; i += 1) {
          elementid = (this.elements[i].id !== '') ? this.elements[i].id : 'element-' + i;

          $clone = $(this.elements[i]).clone();
          $inserts = $('.mediumInsert', $clone);
          for (j = 0; j < $inserts.length; j++) {
            $insert = $($inserts[j]);
            $insertData = $('.mediumInsert-placeholder', $insert).children();
            if ($insertData.length === 0) {
              $insert.remove();
            } else {
              $insert.removeAttr('contenteditable');
              $('img[draggable]', $insert).removeAttr('draggable');
              if ($insert.hasClass('small')) {
                $insertData.addClass('small');
              }
              $('.mediumInsert-buttons', $insert).remove();
              $insertData.unwrap();
            }
          }

          html = $clone.html().trim();
          content[elementid] = {
            value: html
          };
        }
        return content;
      };

      /**
      * Extend MediumEditor's deactivate function to call $.fn.mediumInsert.insert.disable function
      *
      * @return {void}
      */

      MediumEditor.prototype.deactivate = function () {
        var i;
        if (!this.isActive) {
          return false;
        }
        this.isActive = false;

        if (this.toolbar !== undefined) {
          this.toolbar.style.display = 'none';
        }

        document.documentElement.removeEventListener('mouseup', this.checkSelectionWrapper);

        for (i = 0; i < this.elements.length; i += 1) {
          this.elements[i].removeEventListener('keyup', this.checkSelectionWrapper);
          this.elements[i].removeEventListener('blur', this.checkSelectionWrapper);
          this.elements[i].removeAttribute('contentEditable');
        }

        $.fn.mediumInsert.insert.$el.mediumInsert('disable');
      };

      /**
      * Extend MediumEditor's activate function to call $.fn.mediumInsert.insert.enable function
      *
      * @return {void}
      */

      MediumEditor.prototype.activate = function () {
        var i;
        if (this.isActive) {
          return false;
        }

        if (this.toolbar !== undefined) {
          this.toolbar.style.display = 'block';
        }

        this.isActive = true;
        for (i = 0; i < this.elements.length; i += 1) {
          this.elements[i].setAttribute('contentEditable', true);
        }
        this.bindSelect();

        $.fn.mediumInsert.insert.$el.mediumInsert('enable');
      };
  }

  /**
  * Medium Editor Insert Plugin
  *
  * @param {object} options Options for the plugin
  * @param {void}
  */

  $.fn.mediumInsert = function (options) {

    if (typeof options === 'string' && $.fn.mediumInsert.insert[options]) {
      $.fn.mediumInsert.insert[options]();
    } else {
      $.fn.mediumInsert.settings = $.extend($.fn.mediumInsert.settings, options);



      /**
      * Initial plugin loop
      */

      return this.each(function () {
        $(this).addClass('medium-editor-insert-plugin');

        var blocks = 'p, h1, h2, h3, h4, h5, h6, ol, ul, blockquote';
        $(this).on('dragover drop', blocks, function (e) {
          e.preventDefault();
          return false;
        });

        $.fn.mediumInsert.insert.init($(this));

        $.each($.fn.mediumInsert.settings.addons, function (i) {
          var addonOptions = $.fn.mediumInsert.settings.addons[i];
          addonOptions.$el = $.fn.mediumInsert.insert.$el;
          addons[i].init(addonOptions);
        });
      });
    }
  };


  /**
  * Settings
  */
  $.fn.mediumInsert.settings = {
    enabled: true,
    beginning: false,
    addons: {
      images: {},
      embeds: {}
    }
  };

  /**
  * Register new addon
  */
  $.fn.mediumInsert.registerAddon = function(name, addon){
    addons[name] = addon;
  };

  /**
  * Get registered addon
  */
  $.fn.mediumInsert.getAddon = function(name){
    return addons[name];
  };


  /**
  * Addon Initialization
  */

  $.fn.mediumInsert.insert = {

    /**
    * Insert initial function
    *
    * @param {element} el Parent container element
    * @return {void}
    */

    init: function ($el) {
      this.$el = $el;
      this.isFirefox = navigator.userAgent.match(/firefox/i);
      this.setPlaceholders();
      this.setEvents();
    },

    /**
    * Deselect selected text
    *
    * @return {void}
    */

    deselect: function () {
      document.getSelection().removeAllRanges();
    },

    /**
    * Disable the plugin
    *
    * @return {void}
    */

    disable: function () {
      $.fn.mediumInsert.settings.enabled = false;

      $.fn.mediumInsert.insert.$el.find('.mediumInsert-buttons').addClass('hide');
    },

    /**
    * Enable the plugin
    *
    * @return {void}
    */

    enable: function () {
      $.fn.mediumInsert.settings.enabled = true;

      $.fn.mediumInsert.insert.$el.find('.mediumInsert-buttons').removeClass('hide');
    },

    /**
    * Return max id in #mediumInsert-*
    *
    * @return {int} max (Max number, -1 if no placeholders exist)
    */
    getMaxId: function () {
      var max = -1;

      $('div[id^="mediumInsert-"]').each(function () {
        var id = parseInt($(this).attr('id').split('-')[1], 10);
        if (id > max) {
          max = id;
        }
      });

      return max;
    },

    /**
    * Return insert buttons optionally filtered by addon name
    *
    * @param {string} addon Addon name of addon to display only
    * @return {void}
    */
    getButtons: function (addon) {
      var editor = $.fn.mediumInsert.settings.editor,
          buttonLabels = (editor && editor.options) ? editor.options.buttonLabels : '',
          buttons = '<div class="mediumInsert-buttons">'+
            '<a class="mediumInsert-buttonsShow">+</a>'+
            '<ul class="mediumInsert-buttonsOptions medium-editor-toolbar medium-editor-toolbar-active">';

      if (Object.keys($.fn.mediumInsert.settings.addons).length === 0) {
        return false;
      }

      if (typeof addon === 'undefined') {
        $.each($.fn.mediumInsert.settings.addons, function (i) {
          buttons += '<li>' + addons[i].insertButton(buttonLabels) + '</li>';
        });
      } else {
        buttons += '<li>' + addons[addon].insertButton(buttonLabels) + '</li>';
      }

      buttons += '</ul></div>';

      return buttons;
    },

    /**
    * Method setting placeholders
    *
    * @return {void}
    */

    setPlaceholders: function () {
      var that = this,
          $el = $.fn.mediumInsert.insert.$el,
          editor = $.fn.mediumInsert.settings.editor,
          buttonLabels = (editor && editor.options) ? editor.options.buttonLabels : '',
          insertBlock = this.getButtons(),
          $firstEl;

      if (insertBlock === false) {
        return false;
      }

      insertBlock = '<div class="mediumInsert" contenteditable="false">'+
        insertBlock +
        '<div class="mediumInsert-placeholder"></div>'+
      '</div>';

      if ($el.is(':empty')) {
        $el.html('<p><br></p>');
      }

      $el.keyup(function () {
        var $lastChild = $el.children(':last'),
            i;

        // Fix #39
        // After deleting all content (ctrl+A and delete) in Firefox, all content is deleted and only <br> appears
        // To force placeholder to appear, set <p><br></p> as content of the $el
        if ($el.html() === '' || $el.html() === '<br>') {
          $el.html('<p><br></p>');
        }

        if ($lastChild.hasClass('mediumInsert') && $lastChild.find('.mediumInsert-placeholder').children().length > 0) {
          $el.append('<p><br></p>');
        }

        // Fix not deleting placeholder in Firefox
        // by removing all empty placeholders
        if (this.isFirefox){
          $('.mediumInsert .mediumInsert-placeholder:empty', $el).each(function () {
            $(this).parent().remove();
          });
        }

        i = that.getMaxId() +1;

        var blocks = 'p, h1, h2, h3, h4, h5, h6, ol, ul, blockquote';

        if ($.fn.mediumInsert.settings.beginning) {
          $firstEl = $el.children(blocks).first();
          if ($firstEl.prev().hasClass('mediumInsert') === false) {
            $firstEl.before(insertBlock);
            $firstEl.prev('.mediumInsert').attr('id', 'mediumInsert-'+ i).addClass('mediumInsert-first');
            i++;
          }
        }

        $el.children(blocks).each(function () {
          if ($(this).next().hasClass('mediumInsert') === false) {
            $(this).after(insertBlock);
            $(this).next('.mediumInsert').attr('id', 'mediumInsert-'+ i);
          }
          i++;
        });

      }).keyup();
    },


    /**
    * Set events on placeholders
    *
    * @return {void}
    */

    setEvents: function () {
      var that = this,
          $el = $.fn.mediumInsert.insert.$el;

      $el.on('selectstart', '.mediumInsert', function (e) {
        e.preventDefault();
        return false;
      });

      $el.on('blur', function () {
        var $clone = $(this).clone(),
            cloneHtml;

        $clone.find('.mediumInsert').remove();
        cloneHtml = $clone.html().replace(/^\s+|\s+$/g, '');

        if (cloneHtml === '' || cloneHtml === '<p><br></p>') {
          $(this).addClass('medium-editor-placeholder');
        }
      });


      // Fix #29
      // Sometimes in Firefox when you hit enter, <br type="_moz"> appears instead of <p><br></p>
      // If it happens, force to wrap the <br> into a paragraph
      $el.on('keypress', function (e) {
        if (that.isFirefox) {
          if (e.keyCode === 13) {
            //wrap content text in p to avoid firefox problems
            $el.contents().each((function() {
              return function(index, field) {
                if (field.nodeName === '#text') {
                  document.execCommand('insertHTML', false, "<p>" + field.data + "</p>");
                  return field.remove();
                }
              };
            })(this));
            //Firefox add extra br tag inside p tag
            var latestPTag = $el.find('p').last();
            if (latestPTag.text().length > 0) {
              latestPTag.find('br').remove();
            }
          }
        }
      });

      // Fix #39
      // For some reason Chrome doesn't "select-all", when the last placeholder is visible.
      // So it's needed to hide it when the user "selects all", and show it again when they presses any other key.
      $el.on('keydown', function (e) {
        // Fix Select-all using (ctrl + a) in chrome
        if (navigator.userAgent.match(/chrome/i)) {
          $el.children().last().removeClass('hide');
          if ( (e.ctrlKey || e.metaKey) && e.which === 65) {
            e.preventDefault();
            if($el.find('p').text().trim().length === 0) {
              return false;
            }

            $el.children().last().addClass('hide');
            return document.execCommand('selectAll', false, null);
          }
        }
      });

      $el.on('click', '.mediumInsert-buttons a.mediumInsert-buttonsShow', function () {
        var $options = $(this).siblings('.mediumInsert-buttonsOptions'),
            $placeholder = $(this).parent().siblings('.mediumInsert-placeholder');

        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
          $options.hide();

          $('a', $options).show();
        } else {
          $(this).addClass('active');
          $options.show();

          $('a', $options).each(function () {
            var aClass = $(this).attr('class').split('action-')[1],
                plugin = aClass.split('-')[0];
            if ($('.mediumInsert-'+ plugin, $placeholder).length > 0) {
              $('a:not(.action-'+ aClass +')', $options).hide();
            }
          });
        }

        that.deselect();
      });

      $el.on('mouseleave', '.mediumInsert', function () {
        $('a.mediumInsert-buttonsShow', this).removeClass('active');
        $('.mediumInsert-buttonsOptions', this).hide();
      });

      $el.on('click', '.mediumInsert-buttons .mediumInsert-action', function (e) {
        e.preventDefault();

        var addon = $(this).data('addon'),
            action = $(this).data('action'),
            $placeholder = $(this).parents('.mediumInsert-buttons').siblings('.mediumInsert-placeholder');

        if (addons[addon] && addons[addon][action]) {
          addons[addon][action]($placeholder);
        }

        $(this).parents('.mediumInsert').mouseleave();
      });
    }

  };

}(jQuery));
