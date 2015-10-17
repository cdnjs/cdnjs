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
 * @website http://formvalidator.net/
 * @license Dual licensed under the MIT or GPL Version 2 licenses
 * @version 2.2.1
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