/**
 * jQuery Form Validator Module: File
 * ------------------------------------------
 * Created by Victor Jonsson <http://www.victorjonsson.se>
 *
 * The following validators will be added by this module:
 *  - mime type
 *  - file size
 *  - file extension
 *
 * @website http://formvalidator.net/#file-validators
 * @license MIT
 * @version 2.2.81
 */
(function($, window) {

    'use strict';

    var SUPPORTS_FILE_READER = typeof window.FileReader != 'undefined',

      /**
      * @return {Array}
      */
      _getTypes = function($input) {
        var allowedTypes = $.split( ($input.valAttr('allowing') || '').toLowerCase() );
        if( $.inArray('jpg', allowedTypes) > -1 && $.inArray('jpeg', allowedTypes) == -1)
          allowedTypes.push('jpeg');
        else if( $.inArray('jpeg', allowedTypes) > -1 && $.inArray('jpg', allowedTypes) == -1)
          allowedTypes.push('jpg');
        return allowedTypes;
      },

      /**
      * @param {Object} obj
      * @param {String} key
      * @param {String} insert
      * @param {Object} lang
      */
      _generateErrorMsg = function(obj, key, insert, lang) {
        var msg = lang[key] || '';
        obj.errorMessageKey = ''; // only use message attached to this object
        obj.errorMessage = msg.replace('\%s', insert);
      },

      /**
      * @param {String} msg
      */
      _log = function(msg) {
        if( window.console && window.console.log ) {
          window.console.log(msg);
        }
      },

      /**
       * @param {String} imgPath
       * @param {Function} successCallback
       * @param {Function} errCallback
       * @private
       */
      _loadImage = function(imgPath, successCallback, errCallback) {
        var reader = new FileReader(),
          image  = new Image();

        reader.readAsDataURL(imgPath);

        reader.onload = function(fileObj) {

          image.onload = function() {
            $(window).trigger('imageValidation', [this]);
            successCallback(this);
          };

          image.onerror= function() {
            errCallback();
          };

          image.src = fileObj.target.result;

        };
      };

    /*
     * Validate mime type (falls back on validate_extension in older browsers)
     */
    $.formUtils.addValidator({
        name : 'mime',
        validatorFunction : function(str, $input, conf, language) {

            if( SUPPORTS_FILE_READER ) {
                var valid = true,
                    files = $input.get(0).files || [],
                    mime = '',
                    allowedTypes = _getTypes($input);

                if( files.length ) {
                    $.each(files, function(i, file) {
                        valid = false;
                        mime = file.type || '';
                        $.each(allowedTypes, function(j, type) {
                            valid = mime.indexOf(type) > -1;
                            if( valid ) {
                                return false;
                            }
                        });
                        return valid;
                    });

                    if( !valid ) {
                        _log('Trying to upload a file with mime type '+mime+' which is not allowed');
                        _generateErrorMsg(this, 'wrongFileType', allowedTypes.join(', '), language);
                    }
                }

                return valid;

            } else {
                _log('FileReader not supported by browser, will check file extension');
                return $.formUtils.validators.validate_extension.validatorFunction(str, $input, conf, language);
            }
        },
        errorMessage : '',
        errorMessageKey: 'wrongFileType'
    });

    /**
     * Validate file extension
     */
    $.formUtils.addValidator({
        name : 'extension',
        validatorFunction : function(value, $input, conf, language) {
            var valid = true,
                _this = this,
                allowedTypes = _getTypes($input);

            $.each($input.get(0).files || [value], function(i, file) {
                var val = typeof file == 'string' ? file : (file.value || file.fileName || file.name),
                    ext = val.substr( val.lastIndexOf('.')+1 );

                if( $.inArray(ext.toLowerCase(), allowedTypes) == -1 ) {
                    valid = false;
                    _generateErrorMsg(_this, 'wrongFileType', allowedTypes.join(', '), language);
                    return false;
                }
            });

            return valid;
        },
        errorMessage : '',
        errorMessageKey: 'wrongFileType'
    });

    /**
     * Validate file size
     */
    $.formUtils.addValidator({
        name : 'size',
        validatorFunction : function(val, $input, conf, language) {
            var maxSize = $input.valAttr('max-size');
            if( !maxSize ) {
                _log('Input "'+$input.attr('name')+'" is missing data-validation-max-size attribute');
                return true;
            } else if( !SUPPORTS_FILE_READER ) {
                return true; // no fallback available
            }

            var maxBytes = $.formUtils.convertSizeNameToBytes(maxSize),
                valid = true;

            $.each($input.get(0).files || [], function(i, file) {
                valid = file.size <= maxBytes;
                return valid;
            });

            if( !valid ) {
                _generateErrorMsg(this, 'wrongFileSize', maxSize, language);
            }
            return valid;
        },
        errorMessage : '',
        errorMessageKey: 'wrongFileSize'
    });

    /**
     * Make this function accessible via formUtils for unit tests
     * @param {String} sizeName
     * @return {Number}
     */
    $.formUtils.convertSizeNameToBytes = function(sizeName) {
        sizeName = sizeName.toUpperCase();
        if( sizeName.substr(sizeName.length-1, 1) == 'M' ) {
            return parseInt(sizeName.substr(0, sizeName.length-1), 10) * 1024 * 1024;
        } else if( sizeName.substr(sizeName.length-2, 2) == 'MB' ) {
            return parseInt(sizeName.substr(0, sizeName.length-2), 10) * 1024 * 1024;
        } else if( sizeName.substr(sizeName.length-2, 2) == 'KB' ) {
            return parseInt(sizeName.substr(0, sizeName.length-2), 10) * 1024;
        } else if( sizeName.substr(sizeName.length-1, 1) == 'B' ) {
            return parseInt(sizeName.substr(0, sizeName.length-1), 10);
        } else {
            return parseInt(sizeName, 10);
        }
    };

    var disableFormSubmit = function() {
      return false;
    };

   /**
    * Attach dimension check onto formUtils only for unit testing purpose
    * @param {HTMLImageElement} img
    * @param {String} dimDeclaration
    * @param {Boolean|String} Returns error message if image was invalid, false otherwise
    */
    $.formUtils.checkImageDimension = function(img, dimDeclaration, language) {
      var error = false,
          restrictedDim = {width:0, height:0},
          getDimRestriction = function(dimDeclaration) {
            dimDeclaration = dimDeclaration.replace('min', '').replace('max', '');
            var chunks = dimDeclaration.split('x');
            restrictedDim.width = chunks[0];
            restrictedDim.height = chunks[1] ? chunks[1] : chunks[0];
          },
          minDeclaration = false,
          maxDeclaration = false,
          declarationParts = dimDeclaration.split('-');

      if( declarationParts.length == 1 ) {
        if( declarationParts[0].indexOf('min') === 0 ) {
          minDeclaration = declarationParts[0];
        } else {
          maxDeclaration = declarationParts[0];
        }
      } else {
        minDeclaration = declarationParts[0];
        maxDeclaration = declarationParts[1];
      }

      if( minDeclaration ) {
        // check min
        getDimRestriction(minDeclaration);
        if( img.width < restrictedDim.width || img.height < restrictedDim.height )  {
          error = language.imageTooSmall + ' ('+language.min+' '+restrictedDim.width+'x'+restrictedDim.height+'px)';
        }
      }

      if( !error && maxDeclaration ) {
        // Check max
        getDimRestriction(maxDeclaration);
        if( img.width > restrictedDim.width || img.height > restrictedDim.height ) {
          if( img.width > restrictedDim.width ) {
            error = language.imageTooWide +' '+restrictedDim.width+'px';
          } else {
            error = language.imageTooTall +' '+restrictedDim.height+'px';
          }
          error += ' ('+language.max+' '+restrictedDim.width+'x'+restrictedDim.height+'px)';
        }
      }

      return error;
    };

    /**
     * Attach ratio validation onto formUtils only for unit testing purpose
     * @param {HTMLImageElement} img
     * @param {String} dimDeclaration
     * @param {Boolean|String} Returns error message if image was invalid, false otherwise
     */
    $.formUtils.checkImageRatio = function(img, ratioDeclaration, language) {
      var ratio = img.width / img.height,
          minRatio = false,
          maxRatio = false,
          calculateRatio = function(declaration) {
            var dims = declaration.replace('max', '').replace('min', '').split(':');
            return dims[0] / dims[1];
          },
          declarationParts = ratioDeclaration.split('-'),
          isWithin = function(val, min, max) {
            return val >= min && val <= max;
          };

        if( declarationParts.length == 1 ) {
          if( ratio !== calculateRatio(declarationParts[0]) )
            return language.imageRatioNotAccepted;
        }
        else if( declarationParts.length == 2 && !isWithin(ratio, calculateRatio(declarationParts[0]), calculateRatio(declarationParts[1])) ) {
          return language.imageRatioNotAccepted;
        }

        return false;
    };

    /**
     * Validate image dimension
     */
    $.formUtils.addValidator({
      name : 'dimension',
      validatorFunction : function(val, $input, conf, language, $form) {

        if( SUPPORTS_FILE_READER ) {
          var hasCorrectDim = true,
            file = $input.get(0).files || [];

          if( $input.attr('data-validation').indexOf('mime') == -1) {
            alert('You should validate file type being jpg, gif or png on input '+$input[0].name);
            return false;
          }
          else if( file.length > 1 ) {
            alert('Validating image dimensions does not support inputs allowing multiple files');
            return false;
          } else if( file.length == 0) {
            return true;
          }

          if( $input.valAttr('has-valid-dim') ) {
            return true;
          }
          else if( $input.valAttr('has-not-valid-dim') ) {
            this.errorMessage = language['wrongFileDim'] + ' '+$input.valAttr('has-not-valid-dim');
            return false;
          }
          else if($.formUtils.eventType == 'keyup') {
            return null;
          }

          var wasFormSubmit = false;

          if( $.formUtils.isValidatingEntireForm ) {
            wasFormSubmit = true;
            $.formUtils.haltValidation = true;
            $form
              .bind('submit', disableFormSubmit)
              .addClass('on-blur');
          }

          _loadImage(file[0], function(img) {
            var error = false;

            if( $input.valAttr('dimension') )
              error = $.formUtils.checkImageDimension(img, $input.valAttr('dimension'), language);

            if( !error && $input.valAttr('ratio') )
              error = $.formUtils.checkImageRatio(img, $input.valAttr('ratio'), language);

            // Set validation result flag on input
            if( error ) {
              $input.valAttr('has-not-valid-dim', error);
            }
            else {
              $input.valAttr('has-valid-dim', 'true');
            }

            // Remove validation flag when input changed
            if( !$input.valAttr('has-keyup-event') ) {
              $input
                .valAttr('has-keyup-event', '1')
                .bind('keyup change', function(evt) {
                  if( evt.keyCode != 9 && evt.keyCode != 16 ) {
                    $(this)
                      .valAttr('has-not-valid-dim', false)
                      .valAttr('has-valid-dim', false);
                  }
                });
            }

            if( wasFormSubmit ) {
              $.formUtils.haltValidation = false;
              $form
                .removeClass('on-blur')
                .get(0).onsubmit = function() {};

              $form.unbind('submit', disableFormSubmit);
              $form.trigger('submit'); // fire submit once more

            } else {
              $input.trigger('blur'); // triggers the validation once more
            }

          }, function(err) {
            throw err;
          });

          return true;
        }

        return hasCorrectDim;
      },
      errorMessage : '',
      errorMessageKey: '' // error message created dynamically
    //  errorMessageKey: 'wrongFileDim'
    });

    /*
     * This event listener will remove error messages for file
     * inputs when file changes
     */
    $(window).one('validatorsLoaded formValidationSetup', function(evt, $form) {
        var $inputs;
        if( $form ) {
            $inputs = $form.find('input[type="file"]');
        } else {
            $inputs = $('input[type="file"]');
        }

        $inputs.filter('*[data-validation]').bind('change', function() {
            $(this)
                .removeClass('error')
                .parent()
                .find('.form-error').remove();
        });
    });

})(jQuery, window);
