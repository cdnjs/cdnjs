/**
* Filterizr is a jQuery plugin that sorts, shuffles and applies stunning filters over
* responsive galleries using CSS3 transitions and custom CSS effects.
*
* @author Yiotis Kaltsikis
* @see {@link http://yiotis.net/filterizr}
* @version 1.2.3
* @license MIT License
*/

(function(global, $) {

    'use strict';

    //Make sure jQuery exists
    if (!$) throw new Error('Filterizr requires jQuery to work.');

    /**
    * Modified version of Jake Gordon's Bin Packing algorithm used for Filterizr's 'packed' layout
    * @see {@link https://github.com/jakesgordon/bin-packing}
    */
    var Packer = function(w) {
        this.init(w);
    };

    Packer.prototype = {
        init: function(w) {
            this.root = { x: 0, y: 0, w: w };
        },
        fit: function(blocks) {
            var n, node, block, len = blocks.length;
            var h = len > 0 ? blocks[0].h : 0;
            this.root.h = h;
            for (n = 0; n < len ; n++) {
                block = blocks[n];
                if ((node = this.findNode(this.root, block.w, block.h)))
                block.fit = this.splitNode(node, block.w, block.h);
                else
                block.fit = this.growDown(block.w, block.h);
            }
        },
        findNode: function(root, w, h) {
            if (root.used)
            return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
            else if ((w <= root.w) && (h <= root.h))
            return root;
            else
            return null;
        },
        splitNode: function(node, w, h) {
            node.used = true;
            node.down  = { x: node.x,     y: node.y + h, w: node.w,     h: node.h - h };
            node.right = { x: node.x + w, y: node.y,     w: node.w - w, h: h          };
            return node;
        },
        growDown: function(w, h) {
            var node;
            this.root = {
                used: true,
                x: 0,
                y: 0,
                w: this.root.w,
                h: this.root.h + h,
                down:  { x: 0, y: this.root.h, w: this.root.w, h: h },
                right: this.root
            };
            if ((node = this.findNode(this.root, w, h)))
            return this.splitNode(node, w, h);
            else
            return null;
        }
    };

    /**
    * Only Filterizr method extracted on jQuery.fn.
    * Instantiates a new Filterizr or calls any of the public Filterizr methods.
    * @return {jQuery} this - to facilitate jQuery method chaining.
    */
    $.fn.filterizr = function() {
        var self = this, args = arguments;
        //Create the Filterizr obj as an internal private property on the current object
        //to serve as a private namespace
        if (!self._fltr) {
            self._fltr = $.fn.filterizr.prototype.init(self.selector, (typeof args[0] === 'object' ? args[0] : undefined));
        }
        //Call all public Filterizr methods through the private Filterizr object
        if (typeof args[0] === 'string') {
            if (args[0].lastIndexOf('_') > -1) throw new Error('Filterizr error: You cannot call private methods');
            if (typeof self._fltr[args[0]] === 'function') {
                self._fltr[args[0]](args[1], args[2]);
            }
            else throw new Error('Filterizr error: There is no such function');
        }
        return self;
    };

    /**
    * Filterizr prototype
    */
    $.fn.filterizr.prototype = {

        /**
        * Filterizr constructor.
        * @param {string} [selector] - the selector of your container.
        * @param {Object} [options] - user options to override defaults.
        * @constructor
        */
        init: function(selector, options) {
            var self = $(selector).extend($.fn.filterizr.prototype);
            //Default options
            self.options = {
                animationDuration: 0.5,
                callbacks: {
                    onFilteringStart: function() { },
                    onFilteringEnd: function() { },
                    onShufflingStart: function() { },
                    onShufflingEnd: function() { },
                    onSortingStart: function() { },
                    onSortingEnd: function() { }
                },
                delay: 0,
                delayMode: 'progressive',
                easing: 'ease-out',
                filter: 'all',
                filterOutCss: {
                    'opacity': 0,
                    'transform': 'scale(0.5)'
                },
                filterInCss: {
                    'opacity': 1,
                    'transform': 'scale(1)'
                },
                layout: 'sameSize',
                selector: (typeof selector === 'string') ? selector : '.filtr-container',
                setupControls: true
            };
            //No arguments constructor
            if (arguments.length === 0) {
                selector = self.options.selector;
                options  = self.options;
            }
            //One argument constructor (only options)
            if (arguments.length === 1 && typeof arguments[0] === 'object') options = arguments[0];
            //If options argument provided, override defaults
            if (options) {
                self.setOptions(options);
            }
            //Private properties
            self.css({ //Cache reference to container as jQuery obj and init its CSS
                'padding' : 0,
                'position': 'relative'
            });
            self._lastCategory = 0; //Highest value in data-category of .filtr-items
            self._isAnimating  = false;
            self._isShuffling  = false;
            self._isSorting    = false;
            //.filtr-item collections
            self._mainArray   = self._getFiltrItems();
            self._subArrays   = self._makeSubarrays();
            self._activeArray = self._getCollectionByFilter(self.options.filter);
            //Used for multiple category filtering
            self._toggledCategories = { };
            //Used for search feature
            self._typedText = $('input[data-search]').val() || '';
            //Generate unique ID for resize events
            self._uID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
            //Set up Filterizr events
            self._setupEvents();
            //Set up standard Filterizr controls (for multiple Filterizrs in your scene, set to false)
            if (self.options.setupControls) self._setupControls();
            //Start Filterizr!
            self.filter(self.options.filter);
            return self;
        },

        /***********************************
        * Public methods
        ***********************************/
        /**
        * Filters the items
        * @param {number} targetFilter - the applied filter towards which items transition
        */
        filter: function(targetFilter) {
            var self   = this,
                target = self._getCollectionByFilter(targetFilter);

            self.options.filter = targetFilter;
            self.trigger('filteringStart');
            //Filter items
            self._handleFiltering(target);
            //Apply search filter on top if activated
            if (self._isSearchActivated()) self.search(self._typedText);
        },

        /**
        * Toggles filters on/off and renders the new collection
        * @param {number} toggledFilter - the filter to toggle
        */
        toggleFilter: function(toggledFilter) {
            var self   = this,
                target = [], i = 0;

            self.trigger('filteringStart');
            //Toggle the toggledFilter in the active categories
            //If undefined (in case of window resize) ignore
            if (toggledFilter) {
                if (!self._toggledCategories[toggledFilter])
                    self._toggledCategories[toggledFilter] = true;
                else
                    delete self._toggledCategories[toggledFilter];
            }

            //If a filter is toggled on then display only items belonging to that category
            if (self._multifilterModeOn()) {
                target = self._makeMultifilterArray();
                //Filter items
                self._handleFiltering(target);
                //Apply search filter on top if activated
                if (self._isSearchActivated()) self.search(self._typedText);
            }
            //If all filters toggled off then display unfiltered gallery
            else {
                //Filter items
                self.filter('all');
                //Apply search filter on top if activated
                if (self._isSearchActivated()) self.search(self._typedText);
            }
        },

        /**
        * Searches the contents of .filtr-item elements, filters them and renders the results
        * @param {string} text to search in contents of .filtr-item elements
        */
        search: function(text) {
            var self   = this,
                //get active category
                array  = self._multifilterModeOn() ?
                            self._makeMultifilterArray() :
                            self._getCollectionByFilter(self.options.filter),
                target = [], i = 0;

            if (self._isSearchActivated()) {
                for (i = 0; i < array.length; i++) {
                    //Check if the text typed in the textbox is contained in the .filtr-item element
                    //and add it to the target array
                    var containsText = array[i].text().toLowerCase().indexOf(text.toLowerCase()) > -1;
                    if (containsText) {
                        target.push(array[i]);
                    }
                }
            }
            //Show the results
            if (target.length > 0) {
                self._handleFiltering(target);
            }
            //If there are no results
            else {
                //and search is activated, show blank
                if (self._isSearchActivated()) {
                    for (i = 0; i < self._activeArray.length; i++) {
                        self._activeArray[i]._filterOut();
                    }
                }
                //if search is not activated display gallery with last applied filter
                else {
                    self._handleFiltering(array);
                }
            }
        },

        /**
        * Shuffles the active collection and rearranges it on screen
        */
        shuffle: function() {
            var self = this;

            //ShufflingStart callback
            self._isAnimating = true;
            self._isShuffling = true;
            self.trigger('shufflingStart');

            self._mainArray = self._fisherYatesShuffle(self._mainArray);
            self._subArrays = self._makeSubarrays();

            var target = self._multifilterModeOn() ?
                            self._makeMultifilterArray() :
                            self._getCollectionByFilter(self.options.filter);

            if (self._isSearchActivated())
                self.search(self._typedText);
            else
                self._placeItems(target);
        },

        /**
        * Sorts the active collection and rearranges it on screen.
        * @param {string} [attr] - attr based on which to sort (default: 'domIndex' / possible: 'domIndex', 'sortData', 'w', 'h').
        * @param {string} [sortOrder] - asc/desc (default: 'asc').
        */
        sort: function(attr, sortOrder) {
            var self  = this;
            //Set defaults
            attr 	  = attr      || 'domIndex';
            sortOrder = sortOrder || 'asc';

            //SortingStart callback
            self._isAnimating = true;
            self._isSorting   = true;
            self.trigger('sortingStart');

            //Register sort attr on all elements if it is a user-defined data-attribute
            var isUserAttr = attr !== 'domIndex' && attr !== 'sortData' && attr !== 'w' && attr!== 'h';
            if (isUserAttr) {
                for (var i = 0; i < self._mainArray.length; i++) {
                    self._mainArray[i][attr] = self._mainArray[i].data(attr);
                }
            }
            //Sort items
            self._mainArray.sort(self._comparator(attr, sortOrder));
            self._subArrays = self._makeSubarrays();
            //Place sorted collection to new positions
            var target = self._multifilterModeOn() ?
                            self._makeMultifilterArray() :
                            self._getCollectionByFilter(self.options.filter);

            if (self._isSearchActivated())
                self.search(self._typedText);
            else
                self._placeItems(target);
        },

        /**
        * Overrides the default options with the user-provided ones.
        * @param {object} options - the user-provided options to override defaults.
        */
        setOptions: function(options) {
            var self = this, i = 0;
            //Override options
            for (var prop in options) {
                self.options[prop] = options[prop];
            }
            //If the user tries to override animationDuration, easing, delay or delayMode
            if (self._mainArray && (options.animationDuration || options.delay || options.easing || options.delayMode)) {
                for (i = 0; i < self._mainArray.length; i++) {
                    self._mainArray[i].css('transition', 'all ' + self.options.animationDuration + 's ' +  self.options.easing + ' ' + self._mainArray[i]._calcDelay() + 'ms');
                }
            }
            //If the user tries to override a callback, make sure undefined callbacks are set to empty functions
            if (options.callbacks) {
                if (!options.callbacks.onFilteringStart)
                    self.options.callbacks.onFilteringStart = function() { };
                if (!options.callbacks.onFilteringEnd)
                    self.options.callbacks.onFilteringEnd = function() { };
                if (!options.callbacks.onShufflingStart)
                    self.options.callbacks.onShufflingStart = function() { };
                if (!options.callbacks.onShufflingEnd)
                    self.options.callbacks.onShufflingEnd = function() { };
                if (!options.callbacks.onSortingStart)
                    self.options.callbacks.onSortingStart = function() { };
                if (!options.callbacks.onSortingEnd)
                    self.options.callbacks.onSortingEnd = function() { };
            }
            //If the user has not defined a transform property in their CSS, add it
            //while overriding, including translates for movement
            if (!self.options.filterInCss.transform)  self.options.filterInCss.transform  = 'translate3d(0,0,0)';
            if (!self.options.filterOutCss.transform) self.options.filterOutCss.transform = 'translate3d(0,0,0)';
        },

        /***********************************
        * Private & helper methods
        ***********************************/
        /**
        * Finds all .filtr-item elements in the .filtr-container and sets them up before returning them in an array.
        * @return {Object[]}  all .filtr-item elements contained in Filterizr's container.
        * @private
        */
        _getFiltrItems: function() {
            var self       = this,
            filtrItems = $(self.find('.filtr-item')),
            itemsArray = [];

            $.each(filtrItems, function(i, e) {
                //Set item up as Filtr object & push to array
                var item = $(e).extend(FiltrItemProto)._init(i, self);
                itemsArray.push(item);
            });
            return itemsArray;
        },

        /**
        * Divide .filtr-item elements into sub-arrays based on data-category attribute.
        * @return {Object[Object[self._lastCategory]]} Array of arrays including items grouped by data-category.
        * @private
        */
        _makeSubarrays: function() {
            var self = this,
            subArrays = [];

            for (var i = 0; i < self._lastCategory; i++) subArrays.push([]);

            //Populate the sub-arrays
            for (i = 0; i < self._mainArray.length; i++) {
                //Multiple categories scenario
                if (typeof self._mainArray[i]._category === 'object') {
                    var length = self._mainArray[i]._category.length;
                    for (var x = 0; x < length; x++) {
                        subArrays[self._mainArray[i]._category[x] - 1].push(self._mainArray[i]);
                    }
                }
                //Single category
                else subArrays[self._mainArray[i]._category - 1].push(self._mainArray[i]);
            }
            return subArrays;
        },

        /**
        * Make a .filtr-item array based on the activated filters
        * @return {Object[]} array consisting of the .filtr-item elements belonging to active filters
        * @private
        */
        _makeMultifilterArray: function() {
            var self   = this,
                target = [], addedMap = {};

            for (var i = 0; i < self._mainArray.length; i++) {
                //If the item belongs to multiple categories
                var item = self._mainArray[i],
                    belongsToCategory = false,
                    isUnique = item.domIndex in addedMap === false;
                //Check if item belongs to categories whose filters are toggled on
                if (Array.isArray(item._category)) {
                    for (var x = 0; x < item._category.length; x++) {
                        if (item._category[x] in self._toggledCategories) {
                            belongsToCategory = true;
                            break;
                        }
                    }
                }
                else {
                    if (item._category in self._toggledCategories) belongsToCategory = true;
                }
                //If the item is not already visible and belongs to a category
                //of the toggled on filters push it to target collection
                if (isUnique && belongsToCategory) {
                    addedMap[item.domIndex] = true;
                    target.push(item);
                }
            }
            return target;
        },

        /**
        * Detect and set up preset controls.
        * @private
        */
        _setupControls: function() {
            var self = this;
            //Filter controls
            $('*[data-filter]').click(function() {
                var targetFilter = $(this).data('filter');
                //Exit case
                if (self.options.filter === targetFilter) return;
                self.filter(targetFilter);
            });
            //Multiple filter controls
            $('*[data-multifilter]').click(function() {
                var targetFilter = $(this).data('multifilter');
                if (targetFilter === 'all') {
                    self._toggledCategories = { };
                    self.filter('all');
                }
                else {
                    self.toggleFilter(targetFilter);
                }
            });
            //Shuffle control
            $('*[data-shuffle]').click(function() {
                self.shuffle();
            });
            //Sort controls
            $('*[data-sortAsc]').click(function() {
                var sortAttr = $('*[data-sortOrder]').val();
                self.sort(sortAttr, 'asc');
            });
            $('*[data-sortDesc]').click(function() {
                var sortAttr = $('*[data-sortOrder]').val();
                self.sort(sortAttr, 'desc');
            });
            //Search control
            $('input[data-search]').keyup(function() {
                self._typedText = $(this).val();
                self._delayEvent(function() {
                    self.search(self._typedText);
                }, 250, self._uID);
            });
        },

        /**
        * Set up window and Filterizr events.
        * @private
        */
        _setupEvents: function() {
            var self = this;
            //Window resize event
            $(global).resize(function() {
                self._delayEvent(function() {
                    self.trigger('resizeFiltrContainer');
                }, 250, self._uID);
            });
            //Filterizr events
            self
            //Container resize event
            .on('resizeFiltrContainer', function() {
                if (self._multifilterModeOn())
                    self.toggleFilter();
                else
                    self.filter(self.options.filter);
            })
            //onFilteringStart event
            .on('filteringStart', function() {
                self.options.callbacks.onFilteringStart();
            })
            //onFilteringEnd event
            .on('filteringEnd', function() {
                self.options.callbacks.onFilteringEnd();
            })
            //onShufflingStart event
            .on('shufflingStart', function() {
                self._isShuffling = true;
                self.options.callbacks.onShufflingStart();
            })
            //onFilteringEnd event
            .on('shufflingEnd', function() {
                self.options.callbacks.onShufflingEnd();
                self._isShuffling = false;
            })
            //onSortingStart event
            .on('sortingStart', function() {
                self._isSorting = true;
                self.options.callbacks.onSortingStart();
            })
            //onSortingEnd event
            .on('sortingEnd', function() {
                self.options.callbacks.onSortingEnd();
                self._isSorting = false;
            });
        },

        /**
        * Calculates the final positions of items being filtered in, updates the height of .filtr-container.
        * @return {Object[]} array of future item positions.
        * @private
        */
        _calcItemPositions: function() {
            var self  = this,
                array = self._activeArray,
            //Container data
            containerHeight = 0,
            cols = Math.round(self.width() / self.find('.filtr-item').outerWidth()),
            rows = 0,
            //Item data
            itemWidth  = array[0].outerWidth(),
            itemHeight = 0,
            //Position calculation vars
            left = 0, top = 0,
            //Loop vars
            i = 0, x = 0,
            //Array of positions to return
            posArray = [];

            //Layout for items of varying sizes
            if (self.options.layout === 'packed') {
                //Cache current item width/height
                $.each(self._activeArray, function(i, e) {
                    e._updateDimensions();
                });
                //Instantiate new Packer, set up grid
                var packer = new Packer(self.outerWidth());
                packer.fit(self._activeArray);
                for (i = 0; i < array.length; i++) {
                    posArray.push({
                        left: array[i].fit.x,
                        top: array[i].fit.y
                    });
                }
                containerHeight = packer.root.h;
            }
            //Horizontal layout
            if (self.options.layout === 'horizontal') {
                rows = 1;
                for (i = 1; i <= array.length; i++) {
                    itemWidth = array[i - 1].outerWidth();
                    itemHeight = array[i - 1].outerHeight();
                    posArray.push({
                        left: left,
                        top: top
                    });
                    left += itemWidth;
                    if (containerHeight < itemHeight) containerHeight = itemHeight;
                }
            }
            //Vertical layout
            else if (self.options.layout === 'vertical') {
                for (i = 1; i <= array.length; i++) {
                    itemHeight = array[i - 1].outerHeight();
                    posArray.push({
                        left: left,
                        top: top
                    });
                    top += itemHeight;
                }
                containerHeight = top;
            }
            //Layout of items for same height and varying width
            else if (self.options.layout === 'sameHeight') {
                rows = 1;
                var rowWidth = self.outerWidth();
                for (i = 1; i <= array.length; i++) {
                    itemWidth = array[i - 1].width();
                    var itemOuterWidth = array[i - 1].outerWidth(),
                    nextItemWidth = 0;
                    if (array[i]) nextItemWidth = array[i].width();
                    posArray.push({
                        left: left,
                        top: top
                    });
                    x = left + itemWidth + nextItemWidth;
                    if (x > rowWidth) {
                        x 	 = 0;
                        left = 0;
                        top  += array[0].outerHeight();
                        rows++;
                    }
                    else left += itemOuterWidth;
                }
                containerHeight = rows * array[0].outerHeight();
            }
            //Layout for items of same width and varying height
            else if (self.options.layout === 'sameWidth') {
                //Get positions
                for (i = 1; i <= array.length; i++) {
                    posArray.push({
                        left: left,
                        top: top
                    });
                    if (i % cols === 0) rows++;
                    left += itemWidth;
                    top = 0;
                    if (rows > 0) {
                        x = rows;
                        while (x > 0) {
                            top += array[i - (cols * x)].outerHeight();
                            x--;
                        }
                    }
                    if (i % cols === 0) left = 0;
                }
                //Calculate containerHeight
                for (i = 0; i < cols; i++) {
                    var columnHeight = 0, index = i;
                    while(array[index]) {
                        columnHeight += array[index].outerHeight();
                        index += cols;
                    }
                    if (columnHeight > containerHeight) {
                        containerHeight = columnHeight;
                        columnHeight = 0;
                    }
                    else
                    columnHeight = 0;
                }
            }
            //Layout for items of exactly same size
            else if (self.options.layout === 'sameSize') {
                for (i = 1; i <= array.length; i++) {
                    //Push first point at (left: 0, top: 0)
                    posArray.push({
                        left: left,
                        top: top
                    });
                    //Set left and top properties for next point before next iteration
                    left += itemWidth;
                    //On row change calc new top and reset left
                    if (i % cols === 0) {
                        top += array[0].outerHeight();
                        left = 0;
                    }
                }
                rows = Math.ceil(array.length / cols);
                containerHeight = rows * array[0].outerHeight();
            }
            //Update the height of .filtr-container based on new positions
            self.css('height', containerHeight);
            return posArray;
        },

        /**
        * Handles filtering in/out and reposition items when transition between categories
        * @param {Object[]} the target array towards which to filter
        * @private
        */
        _handleFiltering: function(target) {
            var self = this,
                toFilterOut = self._getArrayOfUniqueItems(self._activeArray, target);
            //Minimize all .filtr-item elements that are not the same between categories
            for (var i = 0; i < toFilterOut.length; i++) {
                toFilterOut[i]._filterOut();
            }
            self._activeArray = target;
            //Reposition same items and filter in new
            self._placeItems(target);
        },

        /**
        * Determines if the user is using data-multifilter controls or simple data-filter controls
        * @return {boolean} indicating whether multiple filter mode is on
        * @private
        */
        _multifilterModeOn: function() {
            var self = this;
            return Object.keys(self._toggledCategories).length > 0;
        },

        /**
        * Determines if the user has something typed in the search box
        * @return {boolean} indicating whether the user has searched
        * @private
        */
        _isSearchActivated: function() {
            var self = this;
            return self._typedText.length > 0;
        },

        /**
        * Places .filtr-item elements on the grid positions
        * @param {Object[]} arr - an array consisting of .filtr-item elements
        * @private
        */
        _placeItems: function(arr) {
            var self = this;
            //Tag gallery state as animating
            self._isAnimating = true;
            //Recalculate positions and filter in items
            self._itemPositions = self._calcItemPositions();
            for (var i = 0; i < arr.length; i++) {
                arr[i]._filterIn(self._itemPositions[i]);
            }
        },

        /**
        * Returns item collection based on a certain filter
        * @param {string|number} filter of category to return
        * @return {Object[]} one of the item collections based on filter
        * @private
        */
        _getCollectionByFilter: function(filter) {
            var self = this;
            return filter === 'all' ? self._mainArray : self._subArrays[filter - 1];
        },

        /**
        * Used to make deep copies of the predefined filters
        * in the options for the filterIn/Out methods of items.
        * @see _filterIn and _filterOut methods in FiltrItemProto.
        * @param {Object} obj - is the source object to make a deep copy from.
        * @return {Object} Deep copy of the obj param.
        * @private
        */
        _makeDeepCopy: function(obj) {
            var r = {};
            for (var p in obj) r[p] = obj[p];
            return r;
        },

        /**
        * Comparator factory used to produce camparers for sorting.
        * @see Filterizr.prototype.sort.
        * @param {string} prop - property based on which to sort ('domIndex', 'sortData', 'w', 'h')
        * @param {string} sortOrder - 'asc'/'desc'
        * @return {function} comparer which takes arguments
        * @private
        */
        _comparator: function(prop, sortOrder) {
            return function(a, b) {
                if (sortOrder === 'asc') {
                    if (a[prop] < b[prop])
                    return -1;
                    else if (a[prop] > b[prop])
                    return 1;
                    else
                    return 0;
                }
                else if (sortOrder === 'desc') {
                    if (b[prop] < a[prop])
                    return -1;
                    else if (b[prop] > a[prop])
                    return 1;
                    else
                    return 0;
                }
            };
        },

        /**
        * Modified version of Jeffery To's array intersection method
        * @see {@link http://www.falsepositives.com/index.php/2009/12/01/javascript-function-to-get-the-intersect-of-2-arrays/}
        * @return {Object[]} a disjoint array containing the elements of the first array not found in the second
        * @private
        */
        _getArrayOfUniqueItems: function(arr1, arr2) {
            var r = [], o = {}, l = arr2.length, i, v;
            for (i = 0; i < l; i++) {
                o[arr2[i].domIndex] = true;
            }
            l = arr1.length;
            for (i = 0; i < l; i++) {
                v = arr1[i];
                if (!(v.domIndex in o)) {
                    r.push(v);
                }
            }
            return r;
        },

        /**
        * Brahn's take on CMS's solution to calling the window.resize event at set
        * intervals in multiple places in the code using a Java-like UUID with a regexp
        * @see {@link http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed}
        * @return {function} which calls the callback or just clears the timer
        * @private
        */
        _delayEvent: (function () {
            var self = this, timers = {};
            return function (callback, ms, uniqueId) {
                if (uniqueId === null) {
                    throw Error("UniqueID needed");
                }
                if (timers[uniqueId]) {
                    clearTimeout (timers[uniqueId]);
                }
                timers[uniqueId] = setTimeout(callback, ms);
            };
        })(),

        /**
        * Fisher-Yates array shuffling algorithm implemented for JavaScript.
        * @return {Object[]} shuffled array.
        * @private
        */
        _fisherYatesShuffle: function shuffle(array) {
            var m = array.length, t, i;
            // While there remain elements to shuffle…
            while (m) {
                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);
                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
            return array;
        }
    };

    /**
    * FiltrItem Prototype
    */
    var FiltrItemProto = {

        /**
        * Transforms a jQuery item with .filtr-item class into a FiltrItem.
        * @param {number} index - initial item order based on position in DOM.
        * @param {Filterizr} parent - reference to Filterizr container containing this Filtr Item.
        * @return {jQuery} this - to facilitate method chaining.
        * @constructor
        */
        _init: function(index, parent) {
            var self = this, delay = 0;
            //Private item properties
            self._parent   = parent;			  //Ref to parent Filterizr object
            self._category = self._getCategory(); //data-category values
            self._lastPos  = {};				  //Used for animations
            //Public properties - used for sorting
            self.domIndex = index;
            self.sortData = self.data('sort');
            //Item Dimensions used for Bin Packing algorithm (packed layout) and sorting.
            self.w = 0;
            self.h = 0;
            //self states
            self._isFilteredOut = true;
            self._filteringOut  = false;
            self._filteringIn   = false;
            //Determine delay & set initial item styles
            self.css(parent.options.filterOutCss)
            .css({
                '-webkit-backface-visibility': 'hidden',
                'perspective': '1000px',
                '-webkit-perspective': '1000px',
                '-webkit-transform-style': 'preserve-3d',
                'position': 'absolute',
                'transition': 'all ' + parent.options.animationDuration + 's ' + parent.options.easing + ' ' + self._calcDelay() + 'ms'
            });
            //Events
            self.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
                self._onTransitionEnd();
            });
            return self;
        },

        /**
        * Updates the dimensions (width/height) of the item.
        * @private
        */
        _updateDimensions: function() {
            var self = this;
            self.w = self.outerWidth();
            self.h = self.outerHeight();
        },

        /**
        * Calculates and returns the value of delay to apply to transition-delay in ms, depending on delayMode
        * @return {number} value to apply to transition-delay in ms.
        * @private
        */
        _calcDelay: function() {
            var self = this, r = 0;
            if (self._parent.options.delayMode === 'progressive')
            r = self._parent.options.delay * self.domIndex;
            else
            if (self.domIndex % 2 === 0) r = self._parent.options.delay;
            return r;
        },

        /**
        * Determines which categories this items belongs to and updates the _lastCategory prop of Filterizr.
        * @throws {InvalidArgumentException} data-category of .filtr-item elements must be integer or string of integers delimited by ', '
        * @return {Object[]|number} the categories this item belongs to.
        * @private
        */
        _getCategory: function() {
            var self = this,
                ret  = self.data('category');
            //If more than one category provided
            if (typeof ret === 'string') {
                ret = ret.split(', ');
                for (var i = 0; i < ret.length; i++) {
                    //Error checking: make sure data-category has an integer as its value
                    if (isNaN(parseInt(ret[i]))) {
                        throw new Error('Filterizr: the value of data-category must be a number, starting from value 1 and increasing.');
                    }
                    if (parseInt(ret[i]) > self._parent._lastCategory) {
                        self._parent._lastCategory = parseInt(ret[i]);
                    }
                }
            }
            else {
                if (ret > self._parent._lastCategory)
                    self._parent._lastCategory = ret;
            }
            return ret;
        },

        /**
        * Handles the transitionEnd event.
        * @private
        */
        _onTransitionEnd: function() {
            var self = this;
            //finished filtering out
            if (self._filteringOut) {
                $(self).addClass('filteredOut');
                self._isFilteredOut = true;
                self._filteringOut  = false;
            }
            //finished filtering in
            else if (self._filteringIn) {
                self._isFilteredOut = false;
                self._filteringIn 	= false;
            }
            //if animating trigger filteringEnd event once on parent
            if (self._parent._isAnimating) {
                if (self._parent._isShuffling)
                    self._parent.trigger('shufflingEnd');
                else if (self._parent._isSorting)
                    self._parent.trigger('sortingEnd');
                else
                    self._parent.trigger('filteringEnd');
                self._parent._isAnimating = false;
            }
        },

        /**
        * Filters out the item.
        * @private
        */
        _filterOut: function() {
            var self         = this,
                filterOutCss = self._parent._makeDeepCopy(self._parent.options.filterOutCss);
            //Auto add translate to transform over user-defined filterOut styles
            filterOutCss.transform += ' translate3d(' + self._lastPos.left + 'px,' + self._lastPos.top + 'px, 0)';
            //Play animation
            self.css(filterOutCss);
            //Make unclickable
            self.css('pointer-events', 'none');
            //Tag as filteringOut for transitionend event
            self._filteringOut = true;
        },

        /**
        * Filters in the item.
        * @param {Object} targetPos - is the position to move to with transform-translate
        * @private
        */
        _filterIn: function(targetPos) {
            var self        = this,
                filterInCss = self._parent._makeDeepCopy(self._parent.options.filterInCss);
            //Remove the filteredOut class
            $(self).removeClass('filteredOut');
            //Tag as filtering in for transitionend event
            self._filteringIn = true;
            self._lastPos     = targetPos;
            //Make clickable
            self.css('pointer-events', 'auto');
            //Auto add translate to transform over user-defined filterIn styles
            filterInCss.transform += ' translate3d(' + targetPos.left + 'px,' + targetPos.top + 'px, 0)';
            //Play animation
            self.css(filterInCss);
        }
    };

})(this, jQuery);
