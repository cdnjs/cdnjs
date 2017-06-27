/*!
 * medium-editor-insert-plugin v0.2.6 - jQuery insert plugin for MediumEditor
 *
 * Addon Initialization
 *
 * https://github.com/orthes/medium-editor-insert-plugin
 *
 * Copyright (c) 2013 Pavel Linkesch (http://linkesch.sk)
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
            $insertData = $('.mediumInsert-placeholder, .mediumInsert-embeds', $insert).children();
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
    * Method setting placeholders
    *
    * @return {void}
    */

    setPlaceholders: function () {
      var that = this,
          $el = $.fn.mediumInsert.insert.$el,
          editor = $.fn.mediumInsert.settings.editor,
          buttonLabels = (editor && editor.options) ? editor.options.buttonLabels : '',
          insertBlock = '<ul class="mediumInsert-buttonsOptions medium-editor-toolbar medium-editor-toolbar-active">';

      if (Object.keys($.fn.mediumInsert.settings.addons).length === 0) {
        return false;
      }

      $.each($.fn.mediumInsert.settings.addons, function (i) {
        insertBlock += '<li>' + addons[i].insertButton(buttonLabels) + '</li>';
      });

      insertBlock += '</ul>';
      insertBlock = '<div class="mediumInsert" contenteditable="false">'+
        '<div class="mediumInsert-buttons">'+
          '<a class="mediumInsert-buttonsShow">+</a>'+
          insertBlock +
        '</div>'+
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

/*!
 * medium-editor-insert-plugin v0.2.6 - jQuery insert plugin for MediumEditor
 *
 * Images Addon
 *
 * https://github.com/orthes/medium-editor-insert-plugin
 *
 * Copyright (c) 2013 Pavel Linkesch (http://linkesch.sk)
 * Released under the MIT license
 */

(function ($) {

  $.fn.mediumInsert.registerAddon('images', {

    /**
    * Images default options
    */

    default: {
      /**
      * Active or inactive image's drag and drop
      */
      useDragAndDrop: true,

      /**
      * Relative path to a script that handles file uploads
      */
      imagesUploadScript: 'upload.php',

      /**
      * Relative path to a script that handles file deleting
      */
      imagesDeleteScript: 'delete.php',

      /**
      * Format data before sending them to server while uploading an image
      *
      * @param {File} file File to upload
      * @return {object} formData FormData instance
      */
      formatData: function (file) {
        var formData = new FormData();
        formData.append('file', file);
        return formData;
      },

      /**
      * Upload single file
      *
      * @param {element} $placeholder Placeholder to add image to
      * @param {File} file File to upload
      * @param {object} that Context
      * @param {void}
      */
      uploadFile: function ($placeholder, file, that) {
        $.ajax({
          type: "post",
          url: that.options.imagesUploadScript,
          xhr: function () {
            var xhr = new XMLHttpRequest();
            xhr.upload.onprogress = that.updateProgressBar;
            return xhr;
          },
          cache: false,
          contentType: false,
          complete: function (jqxhr) {
            that.uploadCompleted(jqxhr, $placeholder);
          },
          processData: false,
          data: that.options.formatData(file)
        });
      },

      /**
      * Makes ajax call for deleting a file on a server
      *
      * @param {string} file File name
      * @param {object} that Context
      * @return {void}
      */
      deleteFile: function (file, that) {
        $.ajax({
          type: "post",
          url: that.options.imagesDeleteScript,
          data: {
            file: file
          }
        });
      }
    },


    /**
    * Images initial function
    *
    * @param {object} options Options to overide defaults
    * @return {void}
    */

    init: function (options) {
      if (options && options.$el) {
        this.$el = options.$el;
      }
      this.options = $.extend(this.default, options);

      this.setImageEvents();

      if (this.options.useDragAndDrop === true){
        this.setDragAndDropEvents();
      }

      this.preparePreviousImages();

    },


    /**
    * Returns insert button
    *
    * @param {string} buttonLabels
    * @return {string}
    */

    insertButton: function(buttonLabels){
      var label = 'Img';
      if (buttonLabels == 'fontawesome' || typeof buttonLabels === 'object' && !!(buttonLabels.fontawesome)) {
        label = '<i class="fa fa-picture-o"></i>';
      }
      return '<button data-addon="images" data-action="add" class="medium-editor-action medium-editor-action-image mediumInsert-action">'+label+'</button>';
    },

    /**
    * Make existing images interactive
    *
    * @return {void}
    */

    preparePreviousImages: function () {
      this.$el.find('.mediumInsert-images').each(function() {
        var $parent = $(this).parent();
        $parent.html('<div class="mediumInsert-placeholder" draggable="true">' + $parent.html() + '</div>');
      });
    },

    /**
    * Add image to placeholder
    *
    * @param {element} $placeholder Placeholder to add image to
    * @return {element} $selectFile <input type="file"> element
    */

    add: function ($placeholder) {
      var that = this,
          $selectFile, files;

      $selectFile = $('<input type="file">').click();
      $selectFile.change(function () {
        files = this.files;
        that.uploadFiles($placeholder, files, that);
      });

      $.fn.mediumInsert.insert.deselect();

      return $selectFile;
    },

    /**
    * Update progressbar while upload
    *
    * @param {event} e XMLHttpRequest.upload.onprogress event
    * @return {void}
    */

    updateProgressBar: function (e) {
      var $progress = $('.progress:first', this.$el),
          complete;

      if (e.lengthComputable) {
        complete = e.loaded / e.total * 100;
        complete = complete ? complete : 0;
        $progress.attr('value', complete);
        $progress.html(complete);
      }
    },

    /**
    * Show uploaded image after upload completed
    *
    * @param {jqXHR} jqxhr jqXHR object
    * @return {void}
    */

    uploadCompleted: function (jqxhr, $placeholder) {
      var $progress = $('.progress:first', $placeholder),
          $img;

      $progress.attr('value', 100);
      $progress.html(100);

      if (jqxhr.responseText) {
        $progress.before('<figure class="mediumInsert-images"><img src="'+ jqxhr.responseText +'" draggable="true" alt=""></figure>');
        $img = $progress.siblings('img');

        $img.load(function () {
          $img.parent().mouseleave().mouseenter();
        });
      } else {
        $progress.before('<div class="mediumInsert-error">There was a problem uploading the file.</div>');

        setTimeout(function () {
          $('.mediumInsert-error:first', $placeholder).fadeOut(function () {
            $(this).remove();
          });
        }, 3000);
      }

      $progress.remove();

      $placeholder.closest('[data-medium-element]').trigger('keyup').trigger('input');
    },

    /**
    * Upload single file
    *
    * @param {element} $placeholder Placeholder to add image to
    * @param {File} file File to upload
    * @param {object} that Context
    * @param {void}
    */

    uploadFile: function ($placeholder, file, that) {
      return that.options.uploadFile($placeholder, file, that);
    },

    /**
    * Lopp though files, check file types and call uploadFile() function on each file that passes
    *
    * @param {element} placeholder Placeholder to add image to
    * @param {FileList} files Files to upload
    * @param {object} that Context
    * @return {void}
    */

    uploadFiles: function ($placeholder, files, that) {
      var acceptedTypes = {
        'image/png': true,
        'image/jpeg': true,
        'image/gif': true
      };

      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        if (acceptedTypes[file.type] === true) {
          $placeholder.append('<progress class="progress" min="0" max="100" value="0">0</progress>');

          that.uploadFile($placeholder, file, that);
        }
      }
    },

    /**
    * Makes ajax call for deleting a file on a server
    *
    * @param {string} file File name
    * @param {object} that Context
    * @return {void}
    */

    deleteFile: function (file, that) {
      return that.options.deleteFile(file, that);
    },

    /**
    * Set image events displaying remove and resize buttons
    *
    * @return {void}
    */

    setImageEvents: function () {
      var that = this;

      this.$el.on('mouseenter', '.mediumInsert-images', function () {
        var $img = $('img', this),
            positionTop,
            positionLeft;

        if ($.fn.mediumInsert.settings.enabled === false) {
          return;
        }

        if ($img.length > 0) {
          $(this).append('<a class="mediumInsert-imageRemove"></a>');

          if ($(this).parent().parent().hasClass('small')) {
            $(this).append('<a class="mediumInsert-imageResizeBigger"></a>');
          } else {
            $(this).append('<a class="mediumInsert-imageResizeSmaller"></a>');
          }

          positionTop = $img.position().top + parseInt($img.css('margin-top'), 10);
          positionLeft = $img.position().left + $img.width() -30;
          $('.mediumInsert-imageRemove', this).css({
            'right': 'auto',
            'top': positionTop,
            'left': positionLeft
          });
          $('.mediumInsert-imageResizeBigger, .mediumInsert-imageResizeSmaller', this).css({
            'right': 'auto',
            'top': positionTop,
            'left': positionLeft-31
          });
        }
      });

      this.$el.on('mouseleave', '.mediumInsert-images', function () {
        $('.mediumInsert-imageRemove, .mediumInsert-imageResizeSmaller, .mediumInsert-imageResizeBigger', this).remove();
      });

      this.$el.on('click', '.mediumInsert-imageResizeSmaller', function () {
        $(this).parent().parent().parent().addClass('small');
        $(this).parent().mouseleave().mouseleave();

        $.fn.mediumInsert.insert.deselect();
        $(this).closest('[data-medium-element]').trigger('keyup').trigger('input');
      });

      this.$el.on('click', '.mediumInsert-imageResizeBigger', function () {
        $(this).parent().parent().parent().removeClass('small');
        $(this).parent().mouseleave().mouseleave();

        $.fn.mediumInsert.insert.deselect();
        $(this).closest('[data-medium-element]').trigger('keyup').trigger('input');
      });

      this.$el.on('click', '.mediumInsert-imageRemove', function () {
        var img = $(this).siblings('img').attr('src');

        if ($(this).parent().siblings().length === 0) {
          $(this).parent().parent().parent().removeClass('small');
        }
        $(this).parent().remove();

        that.deleteFile(img, that);

        $.fn.mediumInsert.insert.deselect();
        $(this).closest('[data-medium-element]').trigger('keyup').trigger('input');
      });
    },

    /**
    * Set drag and drop events
    *
    * @return {void}
    */

    setDragAndDropEvents: function () {
      var that = this,
          dropSuccessful = false,
          dropSort = false,
          dropSortIndex, dropSortParent;

      $(document).on('dragover', 'body', function () {
        if ($.fn.mediumInsert.settings.enabled === false) {
          return;
        }

        $(this).addClass('hover');
      });

      $(document).on('dragend', 'body', function () {
        if ($.fn.mediumInsert.settings.enabled === false) {
          return;
        }

        $(this).removeClass('hover');
      });

      this.$el.on('dragover', '.mediumInsert', function () {
        if ($.fn.mediumInsert.settings.enabled === false) {
          return;
        }

        $(this).addClass('hover');
        $(this).attr('contenteditable', true);
      });

      this.$el.on('dragleave', '.mediumInsert', function () {
        if ($.fn.mediumInsert.settings.enabled === false) {
          return;
        }

        $(this).removeClass('hover');
        $(this).attr('contenteditable', false);
      });

      this.$el.on('dragstart', '.mediumInsert .mediumInsert-images img', function () {
        if ($.fn.mediumInsert.settings.enabled === false) {
          return;
        }

        dropSortIndex = $(this).parent().index();
        dropSortParent = $(this).parent().parent().parent().attr('id');
      });

      this.$el.on('dragend', '.mediumInsert .mediumInsert-images img', function (e) {
        if ($.fn.mediumInsert.settings.enabled === false) {
          return;
        }

        if (dropSuccessful === true) {
          if ($(e.originalEvent.target.parentNode).siblings().length === 0) {
            $(e.originalEvent.target.parentNode).parent().parent().removeClass('small');
          }
          $(e.originalEvent.target.parentNode).mouseleave();
          $(e.originalEvent.target.parentNode).remove();
          dropSuccessful = false;
          dropSort = false;

          $(this).closest('[data-medium-element]').trigger('keyup').trigger('input');
        }
      });

      this.$el.on('dragover', '.mediumInsert .mediumInsert-images img', function (e) {
        if ($.fn.mediumInsert.settings.enabled === false) {
          return;
        }

        e.preventDefault();
      });

      this.$el.on('drop', '.mediumInsert .mediumInsert-images img', function () {
        var index, $dragged, finalIndex;

        if ($.fn.mediumInsert.settings.enabled === false) {
          return;
        }


        if (dropSortParent !== $(this).parent().parent().parent().attr('id')) {
          dropSort = false;
          dropSortIndex = dropSortParent = null;
          return;
        }

        index = parseInt(dropSortIndex, 10);

        // Sort
        $dragged = $(this).parent().parent().find('.mediumInsert-images:nth-child('+ (index+1) +')');
        finalIndex = $(this).parent().index();
        if(index < finalIndex) {
          $dragged.insertAfter($(this).parent());
        } else if(index > finalIndex) {
          $dragged.insertBefore($(this).parent());
        }

        $dragged.mouseleave();

        dropSort = true;
        dropSortIndex = null;

        $(this).closest('[data-medium-element]').trigger('keyup').trigger('input');
      });

      this.$el.on('drop', '.mediumInsert', function (e) {
        var files;

        e.preventDefault();

        if ($.fn.mediumInsert.settings.enabled === false) {
          return;
        }

        $(this).removeClass('hover');
        $('body').removeClass('hover');
        $(this).attr('contenteditable', false);

        files = e.originalEvent.dataTransfer.files;
        if (files.length > 0) {
          // File upload
          that.uploadFiles($('.mediumInsert-placeholder', this), files, that);
        } else if (dropSort === true) {
          dropSort = false;
        } else {
          // Image move from block to block
          $('.mediumInsert-placeholder', this).append('<div class="mediumInsert-images">'+ e.originalEvent.dataTransfer.getData('text/html') +'</div>');
          $('meta', this).remove();
          dropSuccessful = true;
        }
      });
    }
  });
}(jQuery));

/*!
 * medium-editor-insert-plugin v0.2.6 - jQuery insert plugin for MediumEditor
 *
 * Maps Addon
 *
 * https://github.com/orthes/medium-editor-insert-plugin
 *
 * Copyright (c) 2013 Pavel Linkesch (http://linkesch.sk)
 * Released under the MIT license
 */

(function ($) {

  $.fn.mediumInsert.registerAddon('maps', {

    /**
    * Maps initial function
    * @return {void}
    */

    init: function () {
      this.$el = $.fn.mediumInsert.insert.$el;
    },

    insertButton: function(buttonLabels){
      var label = 'Map';
      if (buttonLabels == 'fontawesome' || typeof buttonLabels === 'object' && !!(buttonLabels.fontawesome)) {
        label = '<i class="fa fa-map-marker"></i>';
      }
      return '<button data-addon="maps" data-action="add" class="medium-editor-action medium-editor-action-image mediumInsert-action">'+label+'</button>';
    },

    /**
    * Add map to placeholder
    * @param {element} placeholder Placeholder to add map to
    * @return {void}
    */

    add: function (placeholder) {
      $.fn.mediumInsert.insert.deselect();

      placeholder.append('<div class="mediumInsert-maps">Map - Coming soon...</div>');
    }

  });

}(jQuery));

/*!
 * medium-editor-insert-plugin v0.2.6 - jQuery insert plugin for MediumEditor
 *
 * Tables Addon
 *
 * https://github.com/orthes/medium-editor-insert-plugin
 *
 * Copyright (c) 2014 Vexus2 (https://github.com/vexus2)
 * Released under the MIT license
 */

(function ($) {

  $.fn.mediumInsert.registerAddon('tables', {

    /**
    * Table default options
    */

    default: {
      defaultRows: 2,
      defaultCols: 2
    },

    /**
     * Tables initial function
     * @return {void}
     */
    init : function (options) {
      this.options = $.extend(this.default, options);
      this.$el = $.fn.mediumInsert.insert.$el;
      this.setTableButtonEvents();
    },

    insertButton : function (buttonLabels) {
      var label = 'Table';
      if (buttonLabels == 'fontawesome' || typeof buttonLabels === 'object' && !!(buttonLabels.fontawesome)) {
        label = '<i class="fa fa-table"></i>';
      }
      return '<button data-addon="tables" data-action="add" class="medium-editor-action medium-editor-action-image mediumInsert-action">' + label + '</button>';
    },

    /**
     * Add table to $placeholder
     * @param {element} $placeholder $placeholder to add embed to
     * @return {void}
     */
    add : function ($placeholder) {
      $.fn.mediumInsert.insert.deselect();

      var formHtml = '<div class="medium-editor-toolbar-form-anchor mediumInsert-tableDemoBox"><table><tr><td></td><td><label>cols:<input type="text" value="' + this.options.defaultCols + '" class="mediumInsert-tableCols" /></label></td></tr><tr><td><label>rows:<input type="text" value="' + this.options.defaultRows + '" class="mediumInsert-tableRows" /></label></td><td><table class="mediumInsert-demoTable"></table></td></tr><tr><td></td><td><label><button class="mediumInsert-tableReadyButton">insert</button></label></td></tr></table></</div>';
      $(formHtml).appendTo($placeholder.prev());
      this.updateDemoTable();

      setTimeout(function () {
        $placeholder.prev().find('input').focus();
      }, 50);

      $.fn.mediumInsert.insert.deselect();
      this.currentPlaceholder = $placeholder;
    },

    setTableButtonEvents : function () {
      var that = this;

      $(document).on('keyup',
                     'input.mediumInsert-tableRows, input.mediumInsert-tableCols',
                     function() { that.updateDemoTable(); });

      $(document).on('click', function(e) {
        if ($(e.target).parents('.mediumInsert-buttons').length === 0) {
          that.removeToolbar();
        }
      });

      $(document).on('click', 'button.mediumInsert-tableReadyButton', function() {
        that.setEnterActionEvents();
        that.removeToolbar();
      });
    },

    getDimensions : function () {
      return {
        rows: parseFloat($('input.mediumInsert-tableRows').val()) || 1,
        cols: parseFloat($('input.mediumInsert-tableCols').val()) || 1
      };
    },

    buildTable : function (table) {
      var i, j, $row,
        dimensions = this.getDimensions(),
        $table = $(table);

      for (i = 0; i < dimensions.rows; i++) {
        $row = $('<tr>');
        for (j = 0; j < dimensions.cols; j++) {
          $row.append('<td>');
        }
        $table.append($row);
      }
    },

    updateDemoTable : function () {
      var $demoTable = $('table.mediumInsert-demoTable');

      $demoTable.empty();
      this.buildTable($demoTable);
    },

    setEnterActionEvents : function () {
      var that = this;
      if ($.fn.mediumInsert.settings.enabled === false) {
        return false;
      }

      var $table = $('<table class="mediumInsert-table">');
      that.buildTable($table);

      that.currentPlaceholder.parent().after($table);
      that.currentPlaceholder.closest('[data-medium-element]').trigger('keyup').trigger('input');
    },

    removeToolbar : function () {
      $(".mediumInsert-tableDemoBox").remove();
    }

  });

}(jQuery));

/*!
 * medium-editor-insert-plugin v0.2.6 - jQuery insert plugin for MediumEditor
 *
 * Embeds Addon
 *
 * https://github.com/orthes/medium-editor-insert-plugin
 *
 * Copyright (c) 2014 Vexus2 (https://github.com/vexus2)
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
    },

    insertButton : function (buttonLabels) {
      var label = 'Embed';
      if (buttonLabels == 'fontawesome' || typeof buttonLabels === 'object' && !!(buttonLabels.fontawesome)) {
        label = '<i class="fa fa-code"></i>';
      }
      return '<button data-addon="embeds" data-action="add" class="medium-editor-action medium-editor-action-image mediumInsert-action">' + label + '</button>';
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
        that.currentPlaceholder.parent().append(embed_tag);

        that.currentPlaceholder.closest('[data-medium-element]').trigger('keyup').trigger('input');
      }
    },

    removeToolbar : function () {
      $(".mediumInsert-embedsWire").remove();
    },

    convertUrlToEmbedTag : function (url) {
      var embed_tag = url.replace(/\n?/g, '').replace(/^((http(s)?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|v\/)?)([a-zA-Z0-9-_]+)(.*)?$/, '<div class="video"><iframe width="420" height="315" src="//www.youtube.com/v/$7&amp;fs=1" frameborder="0" allowfullscreen></iframe></div>')
        .replace(/http:\/\/vimeo\.com\/(\d+)$/, '<iframe src="//player.vimeo.com/video/$1" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
        .replace(/https:\/\/twitter\.com\/(\w+)\/status\/(\d+)\/?$/, '<blockquote class="twitter-tweet" lang="en"><a href="https://twitter.com/$1/statuses/$2"></a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>')
        .replace(/https:\/\/www\.facebook\.com\/(\w+)\/posts\/(\d+)$/, '<div id="fb-root"></div><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/en_US/all.js#xfbml=1"; fjs.parentNode.insertBefore(js, fjs); }(document, "script", "facebook-jssdk"));</script><div class="fb-post" data-href="https://www.facebook.com/$1/posts/$2"></div>')
        .replace(/http:\/\/instagram\.com\/p\/(.+)\/?$/, '<span class="instagram"><iframe src="//instagram.com/p/$1/embed/" width="612" height="710" frameborder="0" scrolling="no" allowtransparency="true"></iframe></span>');
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(embed_tag) ? embed_tag : false;
    }

  });

}(jQuery));
