/**
Select (dropdown) input

@class select
@extends abstract
@example
<a href="#" id="status" data-type="select" data-pk="1" data-url="post.php" data-original-title="Select status"></a>
<script>
$(function(){
    $('#status').editable({
        value: 2,    
        source: [
              {value: 1, text: 'Active'},
              {value: 2, text: 'Blocked'},
              {value: 3, text: 'Deleted'}
           ]
        }
    });
});
</script>
**/
(function ($) {

    var Select = function (options) {
        this.init('select', options, Select.defaults);
    };

    $.fn.editableform.utils.inherit(Select, $.fn.editableform.types.abstract);

    $.extend(Select.prototype, {
        render: function () {
            Select.superclass.render.call(this);
            var deferred = $.Deferred();
            this.error = null;
            this.sourceData = null;
            this.prependData = null;
            this.onSourceReady(function () {
                this.renderOptions();
                deferred.resolve();
            }, function () {
                this.error = this.options.sourceError;
                deferred.resolve();
            });

            return deferred.promise();
        },

        html2value: function (html) {
            return null; //it's not good idea to set value by text for SELECT. Better set NULL
        },

        value2html: function (value, element) {
            var deferred = $.Deferred();
            this.onSourceReady(function () {
                var i, text = '';
                if($.isArray(this.sourceData)) {
                    for(i=0; i<this.sourceData.length; i++){
                        /*jshint eqeqeq: false*/
                        if(this.sourceData[i].value == value) {
                        /*jshint eqeqeq: true*/                            
                            text = this.sourceData[i].text;
                            break; 
                        }
                    } 
                }
                Select.superclass.value2html(text, element);
                deferred.resolve();
            }, function () {
                Select.superclass.value2html(this.options.sourceError, element);
                deferred.resolve();
            });

            return deferred.promise();
        },  

        // ------------- additional functions ------------

        onSourceReady: function (success, error) {
            //if allready loaded just call success
            if($.isArray(this.sourceData)) {
                success.call(this);
                return; 
            }

            // try parse json in single quotes (for double quotes jquery does automatically)
            try {
                this.options.source = $.fn.editableform.utils.tryParseJson(this.options.source, false);
            } catch (e) {
                error.call(this);
                return;
            }

            //loading from url
            if (typeof this.options.source === 'string') {
                var cacheID = this.options.source + (this.options.name ? '-' + this.options.name : ''),
                cache;

                if (!$(document).data(cacheID)) {
                    $(document).data(cacheID, {});
                }
                cache = $(document).data(cacheID);

                //check for cached data
                if (cache.loading === false && cache.sourceData) { //take source from cache
                    this.sourceData = cache.sourceData;
                    success.call(this);
                    return;
                } else if (cache.loading === true) { //cache is loading, put callback in stack to be called later
                    cache.callbacks.push($.proxy(function () {
                        this.sourceData = cache.sourceData;
                        success.call(this);
                    }, this));

                    //also collecting error callbacks
                    cache.err_callbacks.push($.proxy(error, this));
                    return;
                } else { //no cache yet, activate it
                    cache.loading = true;
                    cache.callbacks = [];
                    cache.err_callbacks = [];
                }

                //loading sourceData from server
                $.ajax({
                    url: this.options.source,
                    type: 'get',
                    cache: false,
                    data: {name: this.options.name},
                    dataType: 'json',
                    success: $.proxy(function (data) {
                        cache.loading = false;
                        // this.options.source = data;
                        this.sourceData = this.makeArray(data);
                        if($.isArray(this.sourceData)) {
                            this.doPrepend();
                            //store result in cache
                            cache.sourceData = this.sourceData;
                            success.call(this);
                            $.each(cache.callbacks, function () { this.call(); }); //run success callbacks for other fields
                        } else {
                            error.call(this);
                            $.each(cache.err_callbacks, function () { this.call(); }); //run error callbacks for other fields
                        }
                    }, this),
                    error: $.proxy(function () {
                        cache.loading = false;
                        error.call(this);
                        $.each(cache.err_callbacks, function () { this.call(); }); //run error callbacks for other fields
                    }, this)
                });
            } else { //options as json/array
                this.sourceData = this.makeArray(this.options.source);
                if($.isArray(this.sourceData)) {
                    this.doPrepend();
                    success.call(this);   
                } else {
                    error.call(this);
                }
            }
        },

        doPrepend: function () {
            if(this.options.prepend === null || this.options.prepend === undefined) {
                return;  
            }
            
            if(!$.isArray(this.prependData)) {
                //try parse json in single quotes
                this.options.prepend = $.fn.editableform.utils.tryParseJson(this.options.prepend, true);
                if (typeof this.options.prepend === 'string') {
                    this.options.prepend = {'': this.options.prepend};
                }              
                this.prependData = this.makeArray(this.options.prepend);
            }

            if($.isArray(this.prependData) && $.isArray(this.sourceData)) {
                this.sourceData = this.prependData.concat(this.sourceData);
            }
        },

        renderOptions: function() {
            if(!$.isArray(this.sourceData)) {
                return;
            }

            for(var i=0; i<this.sourceData.length; i++) {
                this.$input.append($('<option>', {value: this.sourceData[i].value}).text(this.sourceData[i].text)); 
            }
        },

        /**
        * convert data to array suitable for sourceData, e.g. [{value: 1, text: 'abc'}, {...}]
        */
        makeArray: function(data) {
            var count, obj, result = [], iterateEl;
            if(!data || typeof data === 'string') {
                return null; 
            }

            if($.isArray(data)) { //array
                iterateEl = function (k, v) {
                    obj = {value: k, text: v};
                    if(count++ >= 2) {
                        return false;// exit each if object has more than one value
                    }
                };
            
                for(var i = 0; i < data.length; i++) {
                    if(typeof data[i] === 'object') {
                        count = 0;
                        $.each(data[i], iterateEl);
                        if(count === 1) {
                            result.push(obj); 
                        } else if(count > 1 && data[i].hasOwnProperty('value') && data[i].hasOwnProperty('text')) {
                            result.push(data[i]);
                        } else {
                            //data contains incorrect objects
                        }
                    } else {
                        result.push({value: i, text: data[i]}); 
                    }
                }
            } else {  //object
                $.each(data, function (k, v) {
                    result.push({value: k, text: v});
                });  
            }
            return result;
        }

    });      

    Select.defaults = $.extend({}, $.fn.editableform.types.abstract.defaults, {
        /**
        @property tpl 
        @default <select></select>
        **/         
        tpl:'<select></select>',
        /**
        Source data for dropdown list. If string - considered ajax url to load items. Otherwise should be an array.
        Array format is: <code>[{value: 1, text: "text"}, {...}]</code><br>
        For compability it also supports format <code>{value1: text1, value2: text2 ...}</code> but it does not guarantee elements order.      

        @property source 
        @type string|array|object
        @default null
        **/         
        source:null, 
        /**
        Data automatically prepended to the begining of dropdown list.
        
        @property prepend 
        @type string|array|object
        @default false
        **/         
        prepend:false,
        /**
        Error message shown when list cannot be loaded (e.g. ajax error)
        
        @property sourceError 
        @type string
        @default Error when loading options
        **/          
        sourceError: 'Error when loading options'
    });

    $.fn.editableform.types.select = Select;      

}(window.jQuery));
