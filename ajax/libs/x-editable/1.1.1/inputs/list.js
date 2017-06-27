/**
List - abstract class for inputs that have source option loaded from js array or via ajax

@class list
@extends abstract
**/
(function ($) {

    var List = function (options) {
       
    };

    $.fn.editableform.utils.inherit(List, $.fn.editableform.types.abstract);

    $.extend(List.prototype, {
        render: function () {
            List.superclass.render.call(this);
            var deferred = $.Deferred();
            this.error = null;
            this.sourceData = null;
            this.prependData = null;
            this.onSourceReady(function () {
                this.renderList();
                deferred.resolve();
            }, function () {
                this.error = this.options.sourceError;
                deferred.resolve();
            });

            return deferred.promise();
        },

        html2value: function (html) {
            return null; //can't set value by text
        },
        
        value2html: function (value, element) {
            var deferred = $.Deferred();
            this.onSourceReady(function () {
                this.value2htmlFinal(value, element);
                deferred.resolve();
            }, function () {
                List.superclass.value2html(this.options.sourceError, element);
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
                    data: this.options.name ? {name: this.options.name} : {},
                    dataType: 'json',
                    success: $.proxy(function (data) {
                        cache.loading = false;
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

        /*
         renders input list
        */
        renderList: function() {
            // this method should be overwritten in child class
        },
       
         /*
         set element's html by value
        */
        value2htmlFinal: function(value, element) {
            // this method should be overwritten in child class
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
                        result.push({value: data[i], text: data[i]}); 
                    }
                }
            } else {  //object
                $.each(data, function (k, v) {
                    result.push({value: k, text: v});
                });  
            }
            return result;
        },
        
        //search for item by particular value
        itemByVal: function(val) {
            if($.isArray(this.sourceData)) {
                for(var i=0; i<this.sourceData.length; i++){
                    /*jshint eqeqeq: false*/
                    if(this.sourceData[i].value == val) {
                    /*jshint eqeqeq: true*/                            
                        return this.sourceData[i];
                    }
                }
            }
        }        

    });      

    List.defaults = $.extend({}, $.fn.editableform.types.abstract.defaults, {
        /**
        Source data for list. If string - considered ajax url to load items. Otherwise should be an array.
        Array format is: <code>[{value: 1, text: "text"}, {...}]</code><br>
        For compability it also supports format <code>{value1: "text1", value2: "text2" ...}</code> but it does not guarantee elements order.      

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
        Error message when list cannot be loaded (e.g. ajax error)
        
        @property sourceError 
        @type string
        @default Error when loading list
        **/          
        sourceError: 'Error when loading list'
    });

    $.fn.editableform.types.list = List;      

}(window.jQuery));