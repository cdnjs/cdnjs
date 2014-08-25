/**
 * @module Ink.UI.ImageQuery_1
 * Responsive image loading
 * @version 1
 */
 
Ink.createModule('Ink.UI.ImageQuery', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Element_1','Ink.Util.Array_1'], function(Common, Event, Element, InkArray ) {
    'use strict';

    /**
     * @class Ink.UI.ImageQuery
     * @constructor
     * @version 1
     *
     * @param {String|DOMElement}   selector                    Selector or element
     * @param {Object}              [options]                   Options object
     * @param {String|Function}     [options.src]               String or Callback function (that returns a string) with the path to be used to get the images.
     * @param {String|Function}     [options.retina]            String or Callback function (that returns a string) with the path to be used to get RETINA specific images.
     * @param {Array}               [options.queries]           Array of queries
     * @param {String}              [options.queries.label]     Label of the query. Ex. 'small'
     * @param {Number}              [options.queries.width]     Min-width to use this query
     * @param {Function}            [options.onLoad]            Date format string
     *
     * @example
     *      <div class="imageQueryExample all-100 content-center clearfix vspace">
     *          <img src="/assets/imgs/imagequery/small/image.jpg" />
     *      </div>
     *      <script type="text/javascript">
     *      Ink.requireModules( ['Ink.Dom.Selector_1', 'Ink.UI.ImageQuery_1'], function( Selector, ImageQuery ){
     *          var imageQueryElement = Ink.s('.imageQueryExample img');
     *          var imageQueryObj = new ImageQuery('.imageQueryExample img',{
     *              src: '/assets/imgs/imagequery/{:label}/{:file}',
     *              queries: [
     *                  {
     *                      label: 'small',
     *                      width: 480
     *                  },
     *                  {
     *                      label: 'medium',
     *                      width: 640
     *                  },
     *                  {
     *                      label: 'large',
     *                      width: 1024
     *                  }   
     *              ]
     *          });
     *      } );
     *      </script>
     */
    var ImageQuery = function(selector, options){

        /**
         * Get elements, create more ImageQueries if selector finds more than one
         *
         * [improvement] This is a useful pattern. More UI modules could use it.
         */
        this._element = Common.elsOrSelector(selector, 'Ink.UI.ImageQuery', /*required=*/true);

        // In case we have several elements
        for (var i = 1 /* start from second element*/; i < this._element.length; i++) {
            new ImageQuery(this._element[i], options);
        }

        this._element = this._element[0];

        /**
         * Default options, overriden by data-attributes if any.
         * The parameters are:
         * @xparam {array} queries Array of objects that determine the label/name and its min-width to be applied.
         * @xparam {boolean} allowFirstLoad Boolean flag to allow the loading of the first element.
         */
        this._options = Ink.extendObj({
            queries:[],
            onLoad: null
        }, options || {}, Element.data(this._element));

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

        this._init();
    };

    ImageQuery.prototype = {

        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function(){
            // Sort queries by width, in descendant order.
            this._options.queries = InkArray.sortMulti(this._options.queries, 'width').reverse();

            if( typeof this._options.onLoad === 'function' ){
                Event.observe(this._element, 'onload', Ink.bindEvent(this._onLoad, this));
            }

            Event.observe(window, 'resize', Event.throttle(Ink.bindMethod(this, '_onResize'), 400));

            // Imediate call to apply the right images based on the current viewport
            this._onResize();
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

            /**
             * Choosing the right src. The rule is:
             *
             *   "If there is specifically defined in the query object, use that. Otherwise uses the global src."
             *
             * The above rule applies to a retina src.
             */
            var src = current.src || this._options.src;
            if ( window.devicePixelRatio > 1 && ('retina' in this._options ) ) {
                src = current.retina || this._options.retina;
            }

            /**
             * Injects the file variable for usage in the 'templating system' below
             */
            current.file = this._filename;

            /**
             * Since we allow the src to be a callback, let's run it and get the results.
             * For the inside, we're passing the element (img) being processed and the object of the selected query.
             */
            if( typeof src === 'function' ){
                src = src.apply(this,[this._element,current]);
                if( typeof src !== 'string' ){
                    throw '[ImageQuery] :: "src" callback does not return a string';
                }
            }

            /**
             * Replace the values of the existing properties on the query object (except src and retina) in the
             * defined src and/or retina.
             */
            src = src.replace(/{:(.*?)}/g, function(_, prop) {
                return current[prop];
            });

            this._element.src = src;

            // Removes the injected file property
            delete current.file;
        },

        /**
         * Queries are in a descendant order. We want to find the query with the highest width that fits the viewport, therefore the first one.
         */
        _findCurrentQuery: function () {
            /**
             * Gets viewport width
             */
            var viewportWidth = window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth;

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

    return ImageQuery;

});