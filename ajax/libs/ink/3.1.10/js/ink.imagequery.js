/**
 * Responsive image loading
 * @module Ink.UI.ImageQuery_1
 * @version 1
 */
 
Ink.createModule('Ink.UI.ImageQuery', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Element_1','Ink.Util.Array_1'], function(Common, Event, Element, InkArray ) {
    'use strict';

    /**
     * @class Ink.UI.ImageQuery
     * @constructor
     * @version 1
     *
     * @param {String|Element}      selector                    Selector or element
     * @param {Object}              [options]                   Options object
     * @param {String|Function}     [options.src]               A template string in which '{:width}' or '{:label}' will be expanded into the corresponding properties of the `query` object, or a function which takes the query object and should return a src string, for more flexibility.
     * @param {String|Function}     [options.retina]            String or Callback function (that returns a string) with the path to be used to get RETINA specific images.
     * @param {Array}               [options.queries]           Array of queries. Each query object contains the following properties:
     * @param {String}              [options.queries.label]     Label of the query. Ex. 'small'.
     * @param {Number}              [options.queries.width]     Min-width to use this query.
     * @param {String}              [options.queries.src]       If you don't want to specify a "string template" in options.src, you can also specify an image source in each query by setting this option.
     * @param {Function}            [options.onLoad]            A function to be attached to the image 'load' event. Called when an image is loaded into this img (occurs several times because the user may resize the page, causing the image's "load" event to be called several times).
     *
     * @sample Ink_UI_ImageQuery_1.html
     */
    function ImageQuery() {
        Common.BaseUIComponent.apply(this, arguments);
    }

    ImageQuery._name = 'ImageQuery_1';

    ImageQuery._optionDefinition = {
        src: ['String'],
        retina: ['String', undefined],
        queries: ['Object'],
        onLoad: ['Function', null]
    };

    ImageQuery.prototype = {

        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function(){
            // /**
            //  * Get elements, create more ImageQueries if selector finds more than one
            //  *
            //  * [improvement] This is a useful pattern. More UI modules could use it.
            //  */
            // this._element = Common.elsOrSelector(selector, 'Ink.UI.ImageQuery', /*required=*/true);

            // // In case we have several elements
            // for (var i = 1 /* start from second element*/; i < this._element.length; i++) {
            //     new ImageQuery(this._element[i], options);
            // }

            // this._element = this._element[0];
            /**
             * Determining the original basename (with the querystring) of the file.
             */
            var pos;
            if( (pos=this._element.src.lastIndexOf('?')) !== -1 ){
                var search = this._element.src.substr(pos);
                this._filename = this._element.src.replace(search,'').split('/').pop()+search;
            } else {
                this._filename = this._element.src.split('/').pop();
            }

            if (!this._options.queries) { this._options.queries = []; }

            // Sort queries by width, in descendant order.
            this._options.queries = InkArray.sortMulti(this._options.queries, 'width').reverse();

            if( typeof this._options.onLoad === 'function' ){
                Event.observe(this._element, 'load', Ink.bindEvent(this._onLoad, this));
            }

            // Imediate call to apply the right images based on the current viewport
            this._onResize();

            Event.observe(window, 'resize', Event.throttle(Ink.bindMethod(this, '_onResize'), 400));
        },

        /**
         * Handles the resize event (as specified in the _init function)
         *
         * @method _onResize
         * @private
         */
        _onResize: function(){
            if( !this._options.queries.length ){
                return;
            }

            var current = this._findCurrentQuery();

            this._element.src = this.getQuerySrc(current);
        },

        /**
         * Queries are in a descendant order. We want to find the query with the highest width that fits the viewport, therefore the first one.
         */
        _findCurrentQuery: function () {
            /**
             * Gets viewport width
             */
            var viewportWidth = Element.viewportWidth();

            var queries = this._options.queries;
            var last = queries.length - 1;

            for( var query=0; query < last; query+=1 ){
                if (queries[query].width <= viewportWidth){
                    return queries[query];
                }
            }

            return queries[last];
        },

        /**
         * @method getQuerySrc
         * @param {Object} query A query object, comprised of:
         * @param {Number} [query.width] The minimum viewport width in which this query is active.
         * @param {String} [query.label] The label for this query. Used in the template strings.
         * @param {String|Function} [query.src=this.getOption('src')] Exactly the same as `options-src`. If you pass this, `options.src` will be overridden. A template string in which '{:width}' or '{:label}' will be expanded into the corresponding properties of the `query` object, or a function which takes the query object and should return a src string, for more flexibility.
         **/
        getQuerySrc: function (query) {
            /**
             * Choosing the right src. The rule is:
             *
             *   "If there is specifically defined in the query object, use that. Otherwise uses the global src."
             *
             * The above rule applies to a retina src.
             */
            var src = query.src || this._options.src;

            if ( window.devicePixelRatio > 1 && (this._options.retina !== undefined) ) {
                src = query.retina || this._options.retina;
            }

            /**
             * Injects the file variable for usage in the 'templating system' below
             */
            query.file = this._filename;

            /**
             * Since we allow the src to be a callback, let's run it and get the results.
             * For the inside, we're passing the element (img) being processed and the object of the selected query.
             */
            if( typeof src === 'function' ){
                src = src.apply(this,[this._element,query]);
                if( typeof src !== 'string' ){
                    throw '[ImageQuery] :: "src" callback does not return a string';
                }
            }

            /**
             * Replace the values of the existing properties on the query object (except src and retina) in the
             * defined src and/or retina.
             */
            src = src.replace(/{:(.*?)}/g, function(_, prop) {
                return query[prop];
            });

            // Removes the injected file property
            delete query.file;

            return src;
        },

        /**
         * Handles the element loading (img onload) event
         *
         * @method _onLoad
         * @private
         */
        _onLoad: function(){
            /**
             * Since we allow a callback for this let's run it.
             */
            this._options.onLoad.call(this);
        }

    };

    Common.createUIComponent(ImageQuery);

    return ImageQuery;

});
