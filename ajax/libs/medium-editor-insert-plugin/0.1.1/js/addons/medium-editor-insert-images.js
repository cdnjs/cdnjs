/*! 
 * medium-editor-insert-plugin v0.1.1 - jQuery insert plugin for MediumEditor
 *
 * Images Addon
 *
 * https://github.com/orthes/medium-editor-images-plugin
 * 
 * Copyright (c) 2013 Pavel Linkesch (http://linkesch.sk)
 * Released under the MIT license
 */

(function ($) {
  
  $.fn.mediumInsert.images = {
    
    /**
    * Images initial function
    * @return {void}
    */
    
    init: function () {
      this.$el = $.fn.mediumInsert.insert.$el;
      
      this.setImageEvents();
      this.setDragAndDropEvents();
    },
      
    /**
    * Add image to placeholder
    * @param {element} $placeholder Placeholder to add image to
    * @return {element} $selectFile <input type="file"> element
    */
    
    add: function ($placeholder) {
      var that = this, 
          $selectFile, files;

      $selectFile = $('<input type="file">').click();
      $selectFile.change(function () {
        files = this.files;
        that.uploadFiles($placeholder, files); 
      });
        
      $.fn.mediumInsert.insert.deselect();
      
      return $selectFile;
    },
      
    /**
    * Update progressbar while upload
    * @param {event} e XMLHttpRequest.upload.onprogress event
    * @return {void}
    */
    
    updateProgressBar: function (e) {
      var $progress = $('.progress:first', this.$el),
          complete;
        
      if (e.lengthComputable) {
        complete = (e.loaded / e.total * 100 | 0);
        $progress.attr('value', complete);
        $progress.html(complete);
      }
    },
    
    /**
    * Show uploaded image after upload completed
    * @param {event} e XMLHttpRequest.onload event
    * @return {void}
    */
      
    uploadCompleted: function (e) {
      var $progress = $('.progress:first', this.$el),
          $img;
        
      $progress.attr('value', 100);
      $progress.html(100);
                          
      $progress.before('<span class="mediumInsert-images"><img src="'+ e.currentTarget.response +'" draggable="true" alt=""></span>');
      $img = $progress.siblings('img');
      $progress.remove();
                
      $img.load(function () {
        $img.parent().mouseleave().mouseenter();
      });
    },  
      
      
    /**
    * Upload files, display progress bar and finally uploaded file
    * @param {element} placeholder Placeholder to add image to
    * @param {FileList} files Files to upload
    * @return {void}
    */
      
    uploadFiles: function ($placeholder, files) {
      var acceptedTypes = {
        'image/png': true,
        'image/jpeg': true,
        'image/gif': true
      };
      
      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        if (acceptedTypes[file.type] === true) {
          var formData = new FormData();
          formData.append('file', file);
          
          $placeholder.append('<progress class="progress" min="0" max="100" value="0">0</progress>');
          
          var xhr = new XMLHttpRequest();
          xhr.open('POST', $.fn.mediumInsert.settings.imagesUploadScript);
            
          xhr.send(formData);
            
          xhr.upload.onprogress = this.updateProgressBar;
          xhr.onload = this.uploadCompleted;
        }
      }
    },
      
    /**
    * Set image events displaying remove and resize buttons
    * @return {void} 
    */
      
    setImageEvents: function () {
      this.$el.on('mouseenter', '.mediumInsert-images', function () {
        var $img = $('img', this),
            positionTop,
            positionLeft;
            
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
      });
        
      this.$el.on('click', '.mediumInsert-imageResizeBigger', function () {
        $(this).parent().parent().parent().removeClass('small');
        $(this).parent().mouseleave().mouseleave();
          
        $.fn.mediumInsert.insert.deselect();
      });
        
      this.$el.on('click', '.mediumInsert-imageRemove', function () {
        if ($(this).parent().siblings().length === 0) {
          $(this).parent().parent().parent().removeClass('small');
        }
        $(this).parent().remove();
          
        $.fn.mediumInsert.insert.deselect();
      });
    },
    
    /**
    * Set drag and drop evnets
    * @return {void}
    */
  
    setDragAndDropEvents: function () {
      var that = this,
          dropSuccessful = false,
          dropSort = false,
          dropSortIndex, dropSortParent;
    
      $(document).on('dragover', 'body', function () {
        $(this).addClass('hover');
      });
      
      $(document).on('dragend', 'body', function () {
        $(this).removeClass('hover');
      });
    
      this.$el.on('dragover', '.mediumInsert', function () {
        $(this).addClass('hover');  
        $(this).attr('contenteditable', true);
      });
      
      this.$el.on('dragleave', '.mediumInsert', function () {
        $(this).removeClass('hover');  
        $(this).attr('contenteditable', false);
      });
      
      this.$el.on('dragstart', '.mediumInsert .mediumInsert-images img', function (e) {
        dropSortIndex = $(this).parent().index();
        dropSortParent = $(this).parent().parent().parent().attr('id');
      });
      
      this.$el.on('dragend', '.mediumInsert .mediumInsert-images img', function (e) {
        if (dropSuccessful === true) {
          if ($(e.originalEvent.target.parentNode).siblings().length === 0) {
            $(e.originalEvent.target.parentNode).parent().parent().removeClass('small'); 
          }
          $(e.originalEvent.target.parentNode).mouseleave();
          $(e.originalEvent.target.parentNode).remove();  
          dropSuccessful = false;
          dropSort = false;
        }
      });
      
      this.$el.on('dragover', '.mediumInsert .mediumInsert-images img', function (e) {
        e.preventDefault();
      });
      
      this.$el.on('drop', '.mediumInsert .mediumInsert-images img', function (e) {
        var index, $dragged, finalIndex;
        
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
      });
  
      this.$el.on('drop', '.mediumInsert', function (e) {
        var files;
        
        e.preventDefault();
        $(this).removeClass('hover');
        $('body').removeClass('hover');
        $(this).attr('contenteditable', false);  

        files = e.originalEvent.dataTransfer.files;   
        if (files.length > 0) {
          // File upload
          that.uploadFiles($('.mediumInsert-placeholder', this), files);   
        } else if (dropSort === true) {
          dropSort = false;
        } else {
          // Image move from block to block
          $('.mediumInsert-placeholder', this).append('<span class="mediumInsert-images">'+ e.originalEvent.dataTransfer.getData('text/html') +'</span>'); 
          $('meta', this).remove();
          dropSuccessful = true;
        }
      });
      
    }
    
  };
  
}(jQuery));