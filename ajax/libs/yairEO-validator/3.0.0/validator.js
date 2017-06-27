/*
    Validator v2.0.3
    (c) Yair Even Or
    https://github.com/yairEO/validator

    Do not sell this software or use it as part of a package which is sold
*/


function FormValidator(texts, settings){
    if( texts )
        this.texts = $.extend({}, this.texts, texts);

    this.settings = $.extend(true, {}, this.defaults, this.settings)
}

FormValidator.prototype = {
    // Validation error texts
    texts : {
        invalid         : 'inupt is not as expected',
        short           : 'input is too short',
        long            : 'input is too long',
        checked         : 'must be checked',
        empty           : 'please put something here',
        select          : 'Please select an option',
        number_min      : 'too low',
        number_max      : 'too high',
        url             : 'invalid URL',
        number          : 'not a number',
        email           : 'email address is invalid',
        email_repeat    : 'emails do not match',
        date            : 'invalid date',
        password_repeat : 'passwords do not match',
        no_match        : 'no match',
        complete        : 'input is not complete'
    },

    // default settings
    defaults : {
        regex : {
            url          : /^(https?:\/\/)?([\w\d\-_]+\.+[A-Za-z]{2,})+\/?/,
            phone        : /^\+?([0-9]|[-|' '])+$/i,
            numeric      : /^[0-9]+$/i,
            alphanumeric : /^[a-zA-Z0-9]+$/i,
            email        : {
                illegalChars : /[\(\)\<\>\,\;\:\\\/\"\[\]]/,
                filter       : /^.+@.+\..{2,6}$/ // exmaple email "steve@s-i.photo"
            }
        },
        alerts  : true,
        classes : {
            item  : 'field',
            alert : 'alert',
            bad   : 'bad'
        }
    },

    // Tests (per type)
    // each test return "true" when passes and a string of error text otherwise
    tests : {
        sameAsPlaceholder : function( $field, data ){
            if( $field.prop('placeholder') )
                return data.value != $field.prop('placeholder') || this.texts.empty;
            else
                return true;
        },

        hasValue : function( value ){
            return value ? true : this.texts.empty;
        },

        // 'linked' is a special test case for inputs which their values should be equal to each other (ex. confirm email or retype password)
        linked : function(a, b, type){
            if( b != a && a && b ){
                // choose a specific message or a general one
                return this.texts[type + '_repeat'] || this.texts.no_match;
            }
            return true;
        },

        email : function($field, data){
            if ( !this.settings.regex.email.filter.test( data.value ) || data.value.match( this.settings.regex.email.illegalChars ) ){
                return this.texts.email;
            }

            return true;
        },

        // a "skip" will skip some of the tests (needed for keydown validation)
        text : function($field, data){
            // make sure there are at least X number of words, each at least 2 chars long.
            // for example 'john F kenedy' should be at least 2 words and will pass validation
            if( data.validateWords ){
                var words = data.value.split(' ');
                // iterate on all the words
                var wordsLength = function(len){
                    for( var w = words.length; w--; )
                        if( words[w].length < len )
                            return this.texts.short;
                    return true;
                };

                if( words.length < data.validateWords || !wordsLength(2) )
                    return this.texts.complete;

                return true;
            }

            if( data.lengthRange && data.value.length < data.lengthRange[0] ){
                return this.texts.short;
            }

            // check if there is max length & field length is greater than the allowed
            if( data.lengthRange && data.lengthRange[1] && data.value.length > data.lengthRange[1] ){
                return this.texts.long;
            }

            // check if the field's value should obey any length limits, and if so, make sure the length of the value is as specified
            if( data.lengthLimit && data.lengthLimit.length ){
                while( data.lengthLimit.length ){
                    if( data.lengthLimit.pop() == data.value.length ){
                        return true;
                    }
                }

                return this.texts.complete;
            }

            if( data.pattern ){
                var regex, jsRegex;

                switch( data.pattern ){
                    case 'alphanumeric' :
                        regex = this.settings.regex.alphanumeric
                        break;
                    case 'numeric' :
                        regex = this.settings.regex.numeric
                        break;
                    case 'phone' :
                        regex = this.settings.regex.phone
                        break;
                    default :
                        regex = data.pattern;
                }
                try{
                    jsRegex = new RegExp(regex).test(data.value);
                    if( data.value && !jsRegex ){
                        return this.texts.invalid;
                    }
                }
                catch(err){
                    console.warn(err, $field[0], 'regex is invalid');
                    return this.texts.invalid;
                }
            }

            return true;
        },

        number : function( $field, data ){
            var a = data.value;
            // if not not a number
            if( isNaN(parseFloat(a)) && !isFinite(a) ){
                return this.texts.number;
            }
            // not enough numbers
            else if( data.lengthRange && a.length < data.lengthRange[0] ){
                return this.texts.short;
            }
            // check if there is max length & field length is greater than the allowed
            else if( data.lengthRange && data.lengthRange[1] && a.length > data.lengthRange[1] ){
                return this.texts.long;
            }
            else if( data.minmax[0] && (a|0) < data.minmax[0] ){
                return this.texts.number_min;
            }
            else if( data.minmax[1] && (a|0) > data.minmax[1] ){
                return this.texts.number_max;
            }

            return true;
        },

        // Date is validated in European format (day,month,year)
        date : function( $field, data ){
            var day, A = data.value.split(/[-./]/g), i;
            // if there is native HTML5 support:
            if( $field[0].valueAsNumber )
                return true;

            for( i = A.length; i--; ){
                if( isNaN(parseFloat( data.value )) && !isFinite(data.value) )
                    return this.texts.date;
            }
            try{
                day = new Date(A[2], A[1]-1, A[0]);
                if( day.getMonth()+1 == A[1] && day.getDate() == A[0] )
                    return true;
                return this.texts.date;
            }
            catch(er){
                return this.texts.date;
            }
        },

        url : function( $field, data ){
            // minimalistic URL validation
            if( !this.settings.regex.url.test(data.value) )
                return this.texts.url;

            return true;
        },

        hidden : function( $field, data ){
            if( data.lengthRange && data.value.length < data.lengthRange[0] )
                return this.texts.short;

            if( data.pattern ){
                if( data.pattern == 'alphanumeric' && !this.settings.regex.alphanumeric.test(data.value) )
                    return this.texts.invalid;
            }

            return true;
        },

        select : function( $field, data ){
            return data.value ? true : this.texts.select;
        },

        checkbox : function( $field, data ){
            if( $field[0].checked ) return true;

            return this.texts.checked;
        }
    },

    /**
     * Marks an field as invalid
     * @param  {jQuery Object} $field
     * @param  {String} text
     * @return {jQuery Object} - The message element for the field
     */
    mark : function( $field, text ){
        if( !text || !$field || !$field.length )
            return false;

        var that = this;

        // check if not already marked as 'bad' and add the 'alert' object.
        // if already is marked as 'bad', then make sure the text is set again because i might change depending on validation
        var $item = $field.closest('.' + this.settings.classes.item),
            $alert = $item.find('.'+this.settings.classes.alert),
            warning;

        if( this.settings.alerts ){
            if( $alert.length )
                $alert.html(text);
            else{
                warning = $('<div class="'+ this.settings.classes.alert +'">').html( text );
                $item.append( warning );
            }
        }

        $item.removeClass(this.settings.classes.bad);

        // a delay so the "alert" could be transitioned via CSS
        setTimeout(function(){
            $item.addClass( that.settings.classes.bad );
        }, 0);

        return warning;
    },

    /* un-marks invalid fields
    */
    unmark : function( $field ){
        if( !$field || !$field.length ){
            console.warn('no "field" argument, null or DOM object not found');
            return false;
        }

        $field.closest('.' + this.settings.classes.item)
             .removeClass(this.settings.classes.bad)
             .find('.'+ this.settings.classes.alert).remove();
    },

    /**
     * Normalize types if needed & return the results of the test (per field)
     * @param  {String} type  [form field type]
     * @param  {*}      value
     * @return {Boolean} - validation test result
     */
    testByType : function( $field, data ){
        data = $.extend({}, data); // clone the data

        var type = data.type;

        if( type == 'tel' )
            data.pattern = data.pattern || 'phone';

        if( !type || type == 'password' || type == 'tel' || type == 'search' || type == 'file' )
            type = 'text';

        return this.tests[type] ? this.tests[type].call(this, $field, data) : true;
    },

    prepareFieldData : function( $field ){
        var data     = $field.data(),
            nodeName = $field[0].nodeName.toLowerCase() ;

        data.value   = $field[0].value.replace(/^\s+|\s+$/g, "") // cache the value of the field and trim it
        data.valid   = true             // initialize validity of field
        data.type    = $field.attr('type');   // every field starts as 'valid=true' until proven otherwise
        data.pattern = $field.attr('pattern');

        // Special treatment
        if( nodeName === "select" )
            data.type = "select";

        else if( nodeName === "textarea" )
            data.type = "text";

        /* Gather Custom data attributes for specific validation:
        */
        data.validateWords = data['validateWords']       || 0;
        data.lengthRange   = data['validateLengthRange'] ? (data['validateLengthRange']+'').split(',') : [1];
        data.lengthLimit   = data['validateLength']      ? (data['validateLength']+'').split(',') : false;
        data.minmax        = data['validateMinmax']      ? (data['validateMinmax']+'').split(',') : false; // for type 'number', defines the minimum and/or maximum for the value as a number.

        return data;
    },

    /**
     * Validations per-character keypress
     * @param  {DOM Object} elm
     * @return {Boolean}
     */
    keypress : function( elm ){
        var that = this,
            deferred = new $.Deferred();
        // a hack to let some time pass so the latest value will be read
        setTimeout(function(){
            var $field = $(elm),
                data = that.prepareFieldData( $field ),
                test = that.testByType( $field, data );
            //  String.fromCharCode(e.charCode)

            //if( e.charCode ){
            deferred.resolve( test );
           // }
        }, 0);

        return deferred;
    },

    /* Checks a single form field by it's type and specific (custom) attributes
    * {DOM Object}     - the field to be checked
    * {Boolean} silent - don't mark a field and only return if it passed the validation or not
    */
    checkField : function( field, silent ){
        var $field = $(field);

        this.unmark( $field );

        // skip testing fields whom their type is not HIDDEN but they are HIDDEN via CSS.
        if( field.type !='hidden' && $field.is(':hidden') )
            return { valid:true, error:"" }

        var linkedTo,
            testResult,
            optional = $field.hasClass('optional'),
            data = this.prepareFieldData( $field ),
            form = $field.closest('form'); // if the field is part of a form, then cache it

        // check if field has any value
        /* Validate the field's value is different than the placeholder attribute (and attribute exists)
        *  this is needed when fixing the placeholders for older browsers which does not support them.
        *  in this case, make sure the "placeholder" jQuery plugin was even used before proceeding
        */

        // first, check if the field even has any value
        testResult = this.tests.hasValue.call(this, data.value);

        // if the field has value, check if that value is same as placeholder
        if( testResult === true )
            testResult = this.tests.sameAsPlaceholder.call(this, $field, data );

        data.valid = optional || testResult === true;

        if( optional && !data.value ){
            return { valid:true, error:"" }
        }

        if( testResult !== true )
            data.valid = false;

        // validate by type of field. use 'attr()' is proffered to get the actual value and not what the browsers sees for unsupported types.
        if( data.valid ){
            testResult = this.testByType($field, data);
            data.valid = testResult === true ? true : false;
        }

        // if this field is linked to another field (their values should be the same)
        if( data.valid && data.validateLinked ){
            if( data['validateLinked'].indexOf('#') == 0 )
                linkedTo = $(data['validateLinked'])
            else if( form.length )
                linkedTo = form.find(':input[name=' + data['validateLinked'] + ']');
            else
                linkedTo = $(':input[name=' + data['validateLinked'] + ']');

            testResult = this.tests.linked.call(this, field.value, linkedTo.val(), data.type );
            data.valid = testResult === true ? true : false;
        }

        if( !silent )
            this[data.valid ? "unmark" : "mark"]( $field, testResult ); // mark / unmark the field

        return {
            valid : data.valid,
            error : data.valid === true ? "" : testResult
        };
    },

    checkAll : function( $form ){
        $form = $($form);

        if( $form.length == 0 ){
            console.warn('element not found');
            return false;
        }

        var that = this,
            result = {
                valid  : true,  // overall form validation flag
                fields : []     // array of objects (per form field)
            },
            validField,
            // get all the input/textareas/select fields which are required or optional (meaning, they need validation only if they were filled)
            fieldsToCheck = $form.find(':input').filter('[required=required], .required, .optional').not('[disabled=disabled]');

        fieldsToCheck.each(function(){
            var fieldData = that.checkField(this);
            // use an AND operation, so if any of the fields returns 'false' then the submitted result will be also FALSE
            result.valid = !!(result.valid * fieldData.valid);

            result.fields.push({
                field   : this,
                error   : fieldData.error,
                valid   : !!fieldData.valid
            })
        });

        return result;
    }
}
