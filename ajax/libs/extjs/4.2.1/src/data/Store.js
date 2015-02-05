/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * The Store class encapsulates a client side cache of {@link Ext.data.Model Model} objects. Stores load data via a
 * {@link Ext.data.proxy.Proxy Proxy}, and also provide functions for {@link #sort sorting}, {@link #filter filtering}
 * and querying the {@link Ext.data.Model model} instances contained within it.
 *
 * Creating a Store is easy - we just tell it the Model and the Proxy to use for loading and saving its data:
 *
 *      // Set up a {@link Ext.data.Model model} to use in our Store
 *      Ext.define('User', {
 *          extend: 'Ext.data.Model',
 *          fields: [
 *              {name: 'firstName', type: 'string'},
 *              {name: 'lastName',  type: 'string'},
 *              {name: 'age',       type: 'int'},
 *              {name: 'eyeColor',  type: 'string'}
 *          ]
 *      });
 *
 *      var myStore = Ext.create('Ext.data.Store', {
 *          model: 'User',
 *          proxy: {
 *              type: 'ajax',
 *              url: '/users.json',
 *              reader: {
 *                  type: 'json',
 *                  root: 'users'
 *              }
 *          },
 *          autoLoad: true
 *      });
 *
 * In the example above we configured an AJAX proxy to load data from the url '/users.json'. We told our Proxy to use a
 * {@link Ext.data.reader.Json JsonReader} to parse the response from the server into Model object - {@link
 * Ext.data.reader.Json see the docs on JsonReader} for details.
 *
 * ## Inline data
 *
 * Stores can also load data inline. Internally, Store converts each of the objects we pass in as {@link #cfg-data} into
 * Model instances:
 *
 *      Ext.create('Ext.data.Store', {
 *          model: 'User',
 *          data : [
 *              {firstName: 'Ed',    lastName: 'Spencer'},
 *              {firstName: 'Tommy', lastName: 'Maintz'},
 *              {firstName: 'Aaron', lastName: 'Conran'},
 *              {firstName: 'Jamie', lastName: 'Avins'}
 *          ]
 *      });
 *
 * Loading inline data using the method above is great if the data is in the correct format already (e.g. it doesn't
 * need to be processed by a {@link Ext.data.reader.Reader reader}). If your inline data requires processing to decode
 * the data structure, use a {@link Ext.data.proxy.Memory MemoryProxy} instead (see the {@link Ext.data.proxy.Memory
 * MemoryProxy} docs for an example).
 *
 * Additional data can also be loaded locally using {@link #method-add}.
 * 
 * ## Dynamic Loading
 *
 * Stores can be dynamically updated by calling the {@link #method-load} method:
 *
 *     store.load({
 *         params: {
 *             group: 3,
 *             type: 'user'
 *         },
 *         callback: function(records, operation, success) {
 *             // do something after the load finishes
 *         },
 *         scope: this
 *     });
 *
 * Here a bunch of arbitrary parameters is passed along with the load request and a callback function is set
 * up to do something after the loading is over.
 *
 * ## Loading Nested Data
 *
 * Applications often need to load sets of associated data - for example a CRM system might load a User and her Orders.
 * Instead of issuing an AJAX request for the User and a series of additional AJAX requests for each Order, we can load
 * a nested dataset and allow the Reader to automatically populate the associated models. Below is a brief example, see
 * the {@link Ext.data.reader.Reader} intro docs for a full explanation:
 *
 *      var store = Ext.create('Ext.data.Store', {
 *          autoLoad: true,
 *          model: "User",
 *          proxy: {
 *              type: 'ajax',
 *              url: 'users.json',
 *              reader: {
 *                  type: 'json',
 *                  root: 'users'
 *              }
 *          }
 *      });
 *
 * Which would consume a response like this:
 *
 *      {
 *          "users": [{
 *              "id": 1,
 *              "name": "Ed",
 *              "orders": [{
 *                  "id": 10,
 *                  "total": 10.76,
 *                  "status": "invoiced"
 *             },{
 *                  "id": 11,
 *                  "total": 13.45,
 *                  "status": "shipped"
 *             }]
 *          }]
 *      }
 *
 * See the {@link Ext.data.reader.Reader} intro docs for a full explanation.
 *
 * ## Filtering and Sorting
 *
 * Stores can be sorted and filtered - in both cases either remotely or locally. The {@link #cfg-sorters} and
 * {@link #cfg-filters} are held inside {@link Ext.util.MixedCollection MixedCollection} instances to make them easy to manage.
 * Usually it is sufficient to either just specify sorters and filters in the Store configuration or call {@link #sort}
 * or {@link #filter}:
 *
 *      var store = Ext.create('Ext.data.Store', {
 *          model: 'User',
 *          sorters: [{
 *              property: 'age',
 *              direction: 'DESC'
 *          }, {
 *              property: 'firstName',
 *              direction: 'ASC'
 *          }],
 *
 *          filters: [{
 *              property: 'firstName',
 *              value: /Ed/
 *          }]
 *      });
 *
 * The new Store will keep the configured sorters and filters in the MixedCollection instances mentioned above. By
 * default, sorting and filtering are both performed locally by the Store - see {@link #remoteSort} and
 * {@link #remoteFilter} to allow the server to perform these operations instead.
 *
 * Filtering and sorting after the Store has been instantiated is also easy. Calling {@link #filter} adds another filter
 * to the Store and automatically filters the dataset (calling {@link #filter} with no arguments simply re-applies all
 * existing filters). Note that by default {@link #sortOnFilter} is set to true, which means that your sorters are
 * automatically reapplied if using local sorting.
 *
 *     store.filter('eyeColor', 'Brown');
 *
 * Change the sorting at any time by calling {@link #sort}:
 *
 *     store.sort('height', 'ASC');
 *
 * Note that all existing sorters will be removed in favor of the new sorter data (if {@link #sort} is called with no
 * arguments, the existing sorters are just reapplied instead of being removed). To keep existing sorters and add new
 * ones, just add them to the MixedCollection:
 *
 *     store.sorters.add(new Ext.util.Sorter({
 *         property : 'shoeSize',
 *         direction: 'ASC'
 *     }));
 *
 *     store.sort();
 *
 * ## Registering with StoreManager
 *
 * Any Store that is instantiated with a {@link #storeId} will automatically be registered with the {@link
 * Ext.data.StoreManager StoreManager}. This makes it easy to reuse the same store in multiple views:
 *
 *     //this store can be used several times
 *     Ext.create('Ext.data.Store', {
 *         model: 'User',
 *         storeId: 'usersStore'
 *     });
 *
 *     new Ext.List({
 *         store: 'usersStore',
 *         //other config goes here
 *     });
 *
 *     new Ext.view.View({
 *         store: 'usersStore',
 *         //other config goes here
 *     });
 *
 * ## Further Reading
 *
 * Stores are backed up by an ecosystem of classes that enables their operation. To gain a full understanding of these
 * pieces and how they fit together, see:
 *
 *   - {@link Ext.data.proxy.Proxy Proxy} - overview of what Proxies are and how they are used
 *   - {@link Ext.data.Model Model} - the core class in the data package
 *   - {@link Ext.data.reader.Reader Reader} - used by any subclass of {@link Ext.data.proxy.Server ServerProxy} to read a response
 *
 * @author Ed Spencer
 */
Ext.define('Ext.data.Store', {
    extend: 'Ext.data.AbstractStore',

    alias: 'store.store',

    // Required classes must be loaded before the definition callback runs
    // The class definition callback creates a dummy Store which requires that
    // all the classes below have been loaded.
    requires: [
        'Ext.data.StoreManager',
        'Ext.data.Model',
        'Ext.data.proxy.Ajax',
        'Ext.data.proxy.Memory',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json',
        'Ext.data.PageMap',
        'Ext.data.Group'
    ],

    uses: [
        'Ext.ModelManager',
        'Ext.util.Grouper'
    ],

    /**
     * @cfg {Boolean} [remoteSort=false]
     * `true` if the sorting should be performed on the server side, false if it is local only.
     *
     * {@link #buffered Buffered} stores automatically set this to `true`. Buffered stores contain an abitrary
     * subset of the full dataset which depends upon various configurations and which pages have been requested
     * for rendering. Such *sparse* datasets are ineligible for local sorting.
     */
    remoteSort: false,

    /**
     * @cfg {Boolean} [remoteFilter=false]
     * `true` if the grouping should be performed on the server side, false if it is local only.
     *
     * {@link #buffered Buffered} stores automatically set this to `true`. Buffered stores contain an abitrary
     * subset of the full dataset which depends upon various configurations and which pages have been requested
     * for rendering. Such *sparse* datasets are ineligible for local filtering.
     */
    remoteFilter: false,

    /**
     * @cfg {Boolean} [remoteGroup=false]
     * `true` if the grouping should apply on the server side, false if it is local only.  If the
     * grouping is local, it can be applied immediately to the data.  If it is remote, then it will simply act as a
     * helper, automatically sending the grouping information to the server.
     *
     * {@link #buffered Buffered} stores automatically set this to `true`. Buffered stores contain an abitrary
     * subset of the full dataset which depends upon various configurations and which pages have been requested
     * for rendering. Such *sparse* datasets are ineligible for local grouping.
     */
    remoteGroup : false,

    /**
     * @cfg {Boolean} [autoDestroy=false]
     * When a Store is used by only one {@link Ext.view.View DataView}, and should only exist for the lifetime of that view, then
     * configure the autoDestroy flag as `true`. This causes the destruction of the view to trigger the destruction of its Store.
     */

    /**
     * @cfg {String/Ext.data.proxy.Proxy/Object} proxy
     * The Proxy to use for this Store. This can be either a string, a config object or a Proxy instance -
     * see {@link #setProxy} for details.
     */

    /**
     * @cfg {Object[]/Ext.data.Model[]} data
     * Array of Model instances or data objects to load locally. See "Inline data" above for details.
     */

    /**
     * @cfg {String} groupField
     * The field by which to group data in the store. Internally, grouping is very similar to sorting - the
     * groupField and {@link #groupDir} are injected as the first sorter (see {@link #sort}). Stores support a single
     * level of grouping, and groups can be fetched via the {@link #getGroups} method.
     */
    groupField: undefined,

    /**
     * @cfg {String} groupDir
     * The direction in which sorting should be applied when grouping. Supported values are "ASC" and "DESC".
     */
    groupDir: "ASC",

    /**
     * @cfg {Number} trailingBufferZone
     * When {@link #buffered}, the number of extra records to keep cached on the trailing side of scrolling buffer
     * as scrolling proceeds. A larger number means fewer replenishments from the server.
     */
    trailingBufferZone: 25,

    /**
     * @cfg {Number} leadingBufferZone
     * When {@link #buffered}, the number of extra rows to keep cached on the leading side of scrolling buffer
     * as scrolling proceeds. A larger number means fewer replenishments from the server.
     */
    leadingBufferZone: 200,

    /**
     * @cfg {Number} pageSize
     * The number of records considered to form a 'page'. This is used to power the built-in
     * paging using the nextPage and previousPage functions when the grid is paged using a
     * {@link Ext.toolbar.Paging PagingToolbar} Defaults to 25.
     *
     * If this Store is {@link #buffered}, pages are loaded into a page cache before the Store's
     * data is updated from the cache. The pageSize is the number of rows loaded into the cache in one request.
     * This will not affect the rendering of a buffered grid, but a larger page size will mean fewer loads.
     *
     * In a buffered grid, scrolling is monitored, and the page cache is kept primed with data ahead of the
     * direction of scroll to provide rapid access to data when scrolling causes it to be required. Several pages
     * in advance may be requested depending on various parameters.
     *
     * It is recommended to tune the {@link #pageSize}, {@link #trailingBufferZone} and
     * {@link #leadingBufferZone} configurations based upon the conditions pertaining in your deployed application.
     *
     * The provided SDK example `examples/grid/infinite-scroll-grid-tuner.html` can be used to experiment with
     * different settings including simulating Ajax latency.
     */
    pageSize: undefined,

    /**
     * @property {Number} currentPage
     * The page that the Store has most recently loaded (see {@link #loadPage})
     */
    currentPage: 1,

    /**
     * @cfg {Boolean} clearOnPageLoad
     * True to empty the store when loading another page via {@link #loadPage},
     * {@link #nextPage} or {@link #previousPage}. Setting to false keeps existing records, allowing
     * large data sets to be loaded one page at a time but rendered all together.
     */
    clearOnPageLoad: true,

    /**
     * @property {Boolean} loading
     * `true` if the Store is currently loading via its Proxy.
     * @private
     */
    loading: false,

    /**
     * @cfg {Boolean} sortOnFilter
     * For local filtering only, causes {@link #sort} to be called whenever {@link #filter} is called,
     * causing the sorters to be reapplied after filtering.
     */
    sortOnFilter: true,

    /**
     * @cfg {Boolean} buffered
     * Allows the Store to prefetch and cache in a **page cache**, pages of Records, and to then satisfy
     * loading requirements from this page cache.
     *
     * To use buffered Stores, initiate the process by loading the first page. The number of rows rendered are
     * determined automatically, and the range of pages needed to keep the cache primed for scrolling is
     * requested and cached.
     * Example:
     *
     *     myStore.loadPage(1); // Load page 1
     *
     * A {@link Ext.grid.plugin.BufferedRenderer BufferedRenderer} is instantiated which will monitor the scrolling in the grid, and
     * refresh the view's rows from the page cache as needed. It will also pull new data into the page
     * cache when scrolling of the view draws upon data near either end of the prefetched data.
     *
     * The margins which trigger view refreshing from the prefetched data are {@link Ext.grid.plugin.BufferedRenderer#numFromEdge},
     * {@link Ext.grid.plugin.BufferedRenderer#leadingBufferZone} and {@link Ext.grid.plugin.BufferedRenderer#trailingBufferZone}.
     *
     * The margins which trigger loading more data into the page cache are, {@link #leadingBufferZone} and
     * {@link #trailingBufferZone}.
     *
     * By default, only 5 pages of data are cached in the page cache, with pages "scrolling" out of the buffer
     * as the view moves down through the dataset.
     * Setting this value to zero means that no pages are *ever* scrolled out of the page cache, and
     * that eventually the whole dataset may become present in the page cache. This is sometimes desirable
     * as long as datasets do not reach astronomical proportions.
     *
     * Selection state may be maintained across page boundaries by configuring the SelectionModel not to discard
     * records from its collection when those Records cycle out of the Store's primary collection. This is done
     * by configuring the SelectionModel like this:
     *
     *     selModel: {
     *         pruneRemoved: false
     *     }
     *
     */
    buffered: false,

    /**
     * @cfg {Number} purgePageCount
     * *Valid only when used with a {@link Ext.data.Store#buffered buffered} Store.*
     *
     * The number of pages *additional to the required buffered range* to keep in the prefetch cache before purging least recently used records.
     *
     * For example, if the height of the view area and the configured {@link #trailingBufferZone} and {@link #leadingBufferZone} require that there
     * are three pages in the cache, then a `purgePageCount` of 5 ensures that up to 8 pages can be in the page cache any any one time.
     *
     * A value of 0 indicates to never purge the prefetched data.
     */
    purgePageCount: 5,

    /**
     * @cfg {Boolean} [clearRemovedOnLoad=true]
     * `true` to clear anything in the {@link #removed} record collection when the store loads.
     */
    clearRemovedOnLoad: true,

    defaultPageSize: 25,

    // Number of records to load into a buffered grid before it has been bound to a view of known size
    defaultViewSize: 100,

    // Private. Used as parameter to loadRecords
    addRecordsOptions: {
        addRecords: true
    },

    statics: {
        recordIdFn: function(record) {
            return record.internalId;
        },
        recordIndexFn: function(record) {
            return record.index;
        },
        grouperIdFn: function(grouper) {
            return grouper.id || grouper.property;
        },
        groupIdFn: function(group) {
            return group.key;
        }
    },

    /**
     * Creates the store.
     * @param {Object} [config] Config object.
     */
    constructor: function(config) {
        // Clone the config so we don't modify the original config object
        config = Ext.apply({}, config);

        var me = this,
            groupers = config.groupers || me.groupers,
            groupField = config.groupField || me.groupField,
            proxy,
            data;

        /**
         * @event beforeprefetch
         * Fires before a prefetch occurs. Return `false` to cancel.
         * @param {Ext.data.Store} this
         * @param {Ext.data.Operation} operation The associated operation.
         */
        /**
         * @event groupchange
         * Fired whenever the grouping in the grid changes.
         * @param {Ext.data.Store} store The store.
         * @param {Ext.util.Grouper[]} groupers The array of Grouper objects.
         */
        /**
         * @event prefetch
         * Fires whenever records have been prefetched.
         * @param {Ext.data.Store} this
         * @param {Ext.data.Model[]} records An array of records.
         * @param {Boolean} successful `true` if the operation was successful.
         * @param {Ext.data.Operation} operation The associated operation.
         */
        /**
         * @event filterchange
         * Fired whenever the filter set changes.
         * @param {Ext.data.Store} store The store.
         * @param {Ext.util.Filter[]} filters The array of Filter objects.
         */
        data = config.data || me.data;

        if (data) {
            me.inlineData = data;
            delete config.data;
        }

        if (!groupers && groupField) {
            groupers = [{
                property : groupField,
                direction: config.groupDir || me.groupDir
            }];
        
            // Allow a custom getGroupString implementation to prevail
            if (config.getGroupString || (me.getGroupString !== Ext.data.Store.prototype.getGroupString)) {
                groupers[0].getGroupString = function(record) {
                    return me.getGroupString(record);
                }
            }
        }
        delete config.groupers;

        /**
         * @cfg {Ext.util.MixedCollection} groupers
         * The collection of {@link Ext.util.Grouper Groupers} currently applied to this Store.
         */
        me.groupers = new Ext.util.MixedCollection(false, Ext.data.Store.grouperIdFn);
        me.groupers.addAll(me.decodeGroupers(groupers));

        me.groups = new Ext.util.MixedCollection(false, Ext.data.Store.groupIdFn);

        // AbstractStore.constructor initializes the sorters collection
        me.callParent([config]);
        // don't use *config* anymore from here on... use *me* instead...

        if (me.buffered) {
            me.data = new Ext.data.PageMap({
                store: me,
                keyFn: Ext.data.Store.recordIdFn,
                pageSize: me.pageSize,
                maxSize: me.purgePageCount,
                listeners: {
                    // Whenever PageMap gets cleared, it means we re no longer interested in 
                    // any outstanding page prefetches, so cancel tham all
                    clear: me.onPageMapClear,
                    scope: me
                }
            });
            me.pageRequests = {};

            // Sorting, grouping and filtering may only be remote for buffered stores.
            me.remoteSort = me.remoteGroup = me.remoteFilter = true;

            me.sortOnLoad = false;
            me.filterOnLoad = false;
        } else {
           /**
            * @property {Ext.util.MixedCollection/Ext.data.Store.PageMap} data
            * When this Store is not {@link #buffered}, the `data` property is a MixedCollection which holds this store's local cache of records.
            * 
            * When this store *is* {@link #buffered}, the `data` property is a cache of *pages* of records used to satisfy load requests from the Store when the associated view
            * scrolls. Depending on how the {@link #leadingBufferZone buffer zone} and {@link #purgePageCount} are configured,
            * pages which are scrolled out of view may be evicted from the cache, and need to be re-requested from the server
            * when scrolled back into view. For this reason, if using {@link #buffered}, it is recommended that you configure
            * your Model definitions with a unique {@link Ext.data.Model#idProperty} so that records which return to the page
            * cache may be matched against previously selected records. 
            *
            * Pages in the direction of scroll are prefetched from the remote server and loaded into this cache *before*
            * they are needed based upon the {@link #leadingBufferZone buffer zone} so that scrolling can proceed without visible pauses for data loading.
            */
            me.data = new Ext.util.MixedCollection({
                getKey: Ext.data.Store.recordIdFn,
                maintainIndices: true
            });
            me.data.pageSize = me.pageSize;
        }

        // Only sort by group fields if we are doing local grouping
        if (me.remoteGroup) {
            me.remoteSort = true;
        }

        // Keep sorters updated with prepended groupers so that subsequent adds work
        me.sorters.insert(0, me.groupers.getRange());

        proxy = me.proxy;
        data = me.inlineData;

        // Page size for non-buffered Store defaults to 25
        // For a buffered Store, the default page size is taken from the initial call to prefetch.
        if (!me.buffered && !me.pageSize) {
            me.pageSize = me.defaultPageSize;
        }

        // Load inline data
        if (data) {
            if (proxy instanceof Ext.data.proxy.Memory) {
                proxy.data = data;
                me.read();
            } else {
                me.add.apply(me, [data]);
            }
            
            // If there are sorters (These will include any groupers by this stage) and we are sorting locally,
            // then call group. This will sort, and create groups only if this store has groupers.
            if (me.sorters.items.length && !me.remoteSort) {
                me.group(null, null, true);
            }

            delete me.inlineData;
        }
        else if (me.autoLoad) {
            // Defer the load until after the current event handler has finished and set up any associated views.
            Ext.defer(me.load, 1, me, [ typeof me.autoLoad === 'object' ? me.autoLoad : undefined ]);
        }
    },

    onBeforeSort: function() {
        var groupers = this.groupers;
        if (groupers.getCount() > 0) {
            this.sort(groupers.items, 'prepend', false);
        }
    },

    /**
     * @private
     * Normalizes an array of grouper objects, ensuring that they are all Ext.util.Grouper instances
     * @param {Object[]} groupers The groupers array
     * @return {Ext.util.Grouper[]} Array of Ext.util.Grouper objects
     */
    decodeGroupers: function(groupers) {
        if (!Ext.isArray(groupers)) {
            if (groupers === undefined) {
                groupers = [];
            } else {
                groupers = [groupers];
            }
        }

        var length = groupers.length,
            Grouper = Ext.util.Grouper,
            config, i, result = [];

        for (i = 0; i < length; i++) {
            config = groupers[i];

            if (!(config instanceof Grouper)) {
                if (Ext.isString(config)) {
                    config = {
                        property: config
                    };
                }

                config = Ext.apply({
                    root     : 'data',
                    direction: "ASC"
                }, config);

                //support for 3.x style sorters where a function can be defined as 'fn'
                if (config.fn) {
                    config.sorterFn = config.fn;
                }

                //support a function to be passed as a sorter definition
                if (typeof config == 'function') {
                    config = {
                        sorterFn: config
                    };
                }

                // return resulting Groupers in a separate array so as not to mutate passed in data objects.
                result.push(new Grouper(config));
            } else {
                result.push(config);
            }
        }
        return result;
    },

    /**
     * Groups data inside the store.
     * @param {String/Object[]} groupers Either a string name of one of the fields in this Store's
     * configured {@link Ext.data.Model Model}, or an Array of grouper configurations.
     * @param {String} [direction="ASC"] The overall direction to group the data by.
     */
    group: function(groupers, direction, /* private - for initial group */ suppressEvent) {
        var me = this,
            grouper,
            newGroupers;

        // If we were passed groupers, we replace the existing groupers in the sorter collection with the new ones
        if (groupers) {

            // remove existing groupers from the sorter set
            me.sorters.removeAll(me.groupers.items);

            if (Ext.isArray(groupers)) {
                newGroupers = groupers;
            } else if (Ext.isObject(groupers)) {
                newGroupers = [groupers];
            } else if (Ext.isString(groupers)) {
                grouper = me.groupers.get(groupers);

                if (!grouper) {
                    grouper = {
                        property : groupers,
                        direction: direction || 'ASC'
                    };
                    newGroupers = [grouper];
                } else if (direction === undefined) {
                    grouper.toggle();
                } else {
                    grouper.setDirection(direction);
                }
            }

            // If we were passed groupers, replace our grouper collection
            if (newGroupers && newGroupers.length) {
                me.groupers.clear();
                me.groupers.addAll(me.decodeGroupers(newGroupers));
            }

            // Groupers are prepended into sorter set
            me.sorters.insert(0, me.groupers.items);
        }

        if (me.remoteGroup) {
            if (me.buffered) {
                me.data.clear();
                me.loadPage(1, { groupChange: true });
            } else {
                me.load({
                    scope: me,
                    callback: suppressEvent ? null : me.fireGroupChange
                });
            }
        } else {
            me.doSort(me.generateComparator());
            me.constructGroups();
            if (!suppressEvent) {
                me.fireGroupChange();
            }
        }
    },

    getGroupField: function(){
        var first = this.groupers.first(),
            group;

        if (first) {
            group = first.property;
        }   
        return group; 
    },

    constructGroups: function(){
        var me = this,
            data = this.data.items,
            len = data.length,
            groups = me.groups,
            groupValue, i, group, rec;

        groups.clear();

        if (me.isGrouped()) {
            for (i = 0; i < len; ++i) {
                rec = data[i];
                groupValue = me.getGroupString(rec);
                group = groups.get(groupValue);
                if (!group) {
                    group = new Ext.data.Group({
                        key: groupValue,
                        store: me
                    });
                    groups.add(groupValue, group);
                }
                group.add(rec);
            }
        }
    },

    /**
     * Clear any groupers in the store
     */
    clearGrouping: function() {
        var me       = this,
            groupers = me.groupers.items,
            gLen     = groupers.length,
            g;

        // Trim groupers out of the sorter set
        for (g = 0; g < gLen; g++) {
            me.sorters.remove(groupers[g]);
        }
        me.groupers.clear();
        if (me.remoteGroup) {
            if (me.buffered) {
                me.data.clear();
                me.loadPage(1, { groupChange: true });
            } else {
                me.load({
                    scope: me,
                    callback: me.fireGroupChange
                });
            }
        } else {
            me.groups.clear();
            if (me.sorters.length) {
                me.sort();
            } else {
                me.fireEvent('datachanged', me);
                me.fireEvent('refresh', me);
            }
            me.fireGroupChange();
        }
    },

    /**
     * Checks if the store is currently grouped
     * @return {Boolean} `true` if the store is grouped.
     */
    isGrouped: function() {
        return this.groupers.getCount() > 0;
    },

    /**
     * Fires the groupchange event. Abstracted out so we can use it
     * as a callback
     * @private
     */
    fireGroupChange: function() {
        this.fireEvent('groupchange', this, this.groupers);
    },

    /**
     * Returns an array containing the result of applying grouping to the records in this store.
     * See {@link #groupField}, {@link #groupDir} and {@link #getGroupString}. Example for a store
     * containing records with a color field:
     *
     *     var myStore = Ext.create('Ext.data.Store', {
     *         groupField: 'color',
     *         groupDir  : 'DESC'
     *     });
     *
     *     myStore.getGroups(); // returns:
     *     [
     *         {
     *             name: 'yellow',
     *             children: [
     *                 // all records where the color field is 'yellow'
     *             ]
     *         },
     *         {
     *             name: 'red',
     *             children: [
     *                 // all records where the color field is 'red'
     *             ]
     *         }
     *     ]
     *
     * Group contents are effected by filtering.
     *
     * @param {String} [groupName] Pass in an optional groupName argument to access a specific
     * group as defined by {@link #getGroupString}.
     * @return {Object/Object[]} The grouped data
     */
    getGroups: function(requestGroupString) {
        var records = this.data.items,
            length = records.length,
            groups = [],
            pointers = {},
            record,
            groupStr,
            group,
            i;

        for (i = 0; i < length; i++) {
            record = records[i];
            groupStr = this.getGroupString(record);
            group = pointers[groupStr];

            if (group === undefined) {
                group = {
                    name: groupStr,
                    children: []
                };

                groups.push(group);
                pointers[groupStr] = group;
            }

            group.children.push(record);
        }

        return requestGroupString ? pointers[requestGroupString] : groups;
    },

    /**
     * @private
     * For a given set of records and a Grouper, returns an array of arrays - each of which is the set of records
     * matching a certain group.
     */
    getGroupsForGrouper: function(records, grouper) {
        var length = records.length,
            groups = [],
            oldValue,
            newValue,
            record,
            group,
            i;

        for (i = 0; i < length; i++) {
            record = records[i];
            newValue = grouper.getGroupString(record);

            if (newValue !== oldValue) {
                group = {
                    name: newValue,
                    grouper: grouper,
                    records: []
                };
                groups.push(group);
            }

            group.records.push(record);

            oldValue = newValue;
        }

        return groups;
    },

    /**
     * @private
     * This is used recursively to gather the records into the configured Groupers. The data MUST have been sorted for
     * this to work properly (see {@link #getGroupData} and {@link #getGroupsForGrouper}) Most of the work is done by
     * {@link #getGroupsForGrouper} - this function largely just handles the recursion.
     *
     * @param {Ext.data.Model[]} records The set or subset of records to group
     * @param {Number} grouperIndex The grouper index to retrieve
     * @return {Object[]} The grouped records
     */
    getGroupsForGrouperIndex: function(records, grouperIndex) {
        var me = this,
            groupers = me.groupers,
            grouper = groupers.getAt(grouperIndex),
            groups = me.getGroupsForGrouper(records, grouper),
            length = groups.length,
            i;

        if (grouperIndex + 1 < groupers.length) {
            for (i = 0; i < length; i++) {
                groups[i].children = me.getGroupsForGrouperIndex(groups[i].records, grouperIndex + 1);
            }
        }

        for (i = 0; i < length; i++) {
            groups[i].depth = grouperIndex;
        }

        return groups;
    },

    /**
     * @private
     * Returns records grouped by the configured {@link #groupers grouper} configuration. Sample return value (in
     * this case grouping by genre and then author in a fictional books dataset):
     *
     *     [
     *         {
     *             name: 'Fantasy',
     *             depth: 0,
     *             records: [
     *                 //book1, book2, book3, book4
     *             ],
     *             children: [
     *                 {
     *                     name: 'Rowling',
     *                     depth: 1,
     *                     records: [
     *                         //book1, book2
     *                     ]
     *                 },
     *                 {
     *                     name: 'Tolkein',
     *                     depth: 1,
     *                     records: [
     *                         //book3, book4
     *                     ]
     *                 }
     *             ]
     *         }
     *     ]
     *
     * @param {Boolean} [sort=true] `true` to call {@link #sort} before finding groups. Sorting is required to make grouping
     * function correctly so this should only be set to false if the Store is known to already be sorted correctly.
     * @return {Object[]} The group data
     */
    getGroupData: function(sort) {
        var me = this;
        if (sort !== false) {
            me.sort();
        }

        return me.getGroupsForGrouperIndex(me.data.items, 0);
    },

    /**
     * Returns the string to group on for a given model instance. The default implementation of this method returns
     * the model's {@link #groupField}, but this can be overridden to group by an arbitrary string. For example, to
     * group by the first letter of a model's 'name' field, use the following code:
     *
     *     Ext.create('Ext.data.Store', {
     *         groupDir: 'ASC',
     *         getGroupString: function(instance) {
     *             return instance.get('name')[0];
     *         }
     *     });
     *
     * @param {Ext.data.Model} instance The model instance
     * @return {String} The string to compare when forming groups
     */
    getGroupString: function(instance) {
        var group = this.groupers.first();
        if (group) {
            return group.getGroupString(instance);
        }
        return '';
    },

    /**
     * Inserts Model instances into the Store at the given index and fires the {@link #event-add} event.
     * See also {@link #method-add}.
     *
     * @param {Number} index The start index at which to insert the passed Records.
     * @param {Ext.data.Model[]} records An Array of Ext.data.Model objects to add to the store.
     * @return {Ext.data.Model[]} records The added records
     */
    insert: function(index, records) {
        var me = this,
            sync = false,
            i, len, record,
            defaults = me.modelDefaults,
            out;

        // isIterable allows an argument list of multiple records to be passed unchanged (from add)
        if (!Ext.isIterable(records)) {
            out = records = [records];
        } else {
            out = [];
        }
        len = records.length;

        if (len) {
            for (i = 0; i < len; i++) {
                record = records[i];
                if (!record.isModel) {
                    record = me.createModel(record);
                }
                out[i] = record;
                if (defaults) {
                    record.set(defaults);
                }

                record.join(me);
                sync = sync || record.phantom === true;
            }
            // Add records to data in one shot
            me.data.insert(index, out);

            if (me.snapshot) {
                me.snapshot.addAll(out);
            }

            if (me.requireSort) {
                // suspend events so the usual data changed events don't get fired.
                me.suspendEvents();
                me.sort();
                me.resumeEvents();
            }

            if (me.isGrouped()) {
                me.updateGroupsOnAdd(out);
            }

            me.fireEvent('add', me, out, index);
            me.fireEvent('datachanged', me);
            if (me.autoSync && sync && !me.autoSyncSuspended) {
                me.sync();
            }
        }
        return out;
    },

    updateGroupsOnAdd: function(records) {
        var me = this,
            groups = me.groups,
            len = records.length,
            i, groupName, group, rec;

        for (i = 0; i < len; ++i) {
            rec = records[i];
            groupName = me.getGroupString(rec);
            group = groups.getByKey(groupName);
            if (!group) {
                group = groups.add(new Ext.data.Group({
                    key: groupName,
                    store: me
                }));
            }
            group.add(rec);
        }
    },

    updateGroupsOnRemove: function(records) {
        var me = this,
            groups = me.groups,
            len = records.length,
            i, groupName, group, rec;

        for (i = 0; i < len; ++i) {
            rec = records[i];
            groupName = me.getGroupString(rec);
            group = groups.getByKey(groupName);

            if (group) {
                group.remove(rec);
                if (group.records.length === 0) {
                    groups.remove(group);
                }    
            }
        }
    },

    updateGroupsOnUpdate: function(record, modifiedFieldNames){
        var me = this,
            groupField = me.getGroupField(),
            groupName = me.getGroupString(record),
            groups = me.groups,
            len, i, items, group;

        if (modifiedFieldNames && Ext.Array.indexOf(modifiedFieldNames, groupField) !== -1) {

            // Sorting is remote for buffered stores, we cannot update a field which is a sort key
            if (me.buffered) {
                Ext.Error.raise({
                    msg: 'Cannot move records between groups in a buffered store record'
                });
            }

            // First find the old group and remove the record
            items = groups.items;
            for (i = 0, len = items.length; i < len; ++i) {
                group = items[i];
                if (group.contains(record)) {
                    group.remove(record);
                    break;
                }
            }
            group = groups.getByKey(groupName);
            if (!group) {
                group = groups.add(new Ext.data.Group({
                    key: groupName,
                    store: me
                }));
            }
            group.add(record);

            // At this point we know that we're sorted, so re-insert the record.
            // Without adding to the "removed" list or firing events!
            me.data.remove(record);
            me.data.insert(me.data.findInsertionIndex(record, me.generateComparator()), record);

            // Keep subsequent indices up to date
            for (i = 0, len = this.getCount(); i < len; i++) {
                me.data.items[i].index = i;
            }

        } else {
            // some other field changed, just mark the group as dirty
            groups.getByKey(groupName).setDirty();    
        }
    },

    /**
     * Adds Model instance to the Store. This method accepts either:
     *
     * - An array of Model instances or Model configuration objects.
     * - Any number of Model instance or Model configuration object arguments.
     *
     * The new Model instances will be added at the end of the existing collection.
     *
     * Sample usage:
     *
     *     myStore.add({some: 'data'}, {some: 'other data'});
     *
     * Note that if this Store is sorted, the new Model instances will be inserted
     * at the correct point in the Store to maintain the sort order.
     *
     * @param {Ext.data.Model[]/Ext.data.Model.../Object[]/Object...} model An array of Model instances
     * or Model configuration objects, or variable number of Model instance or config arguments.
     * @return {Ext.data.Model[]} The model instances that were added
     */
    add: function(arg) {
        var me = this,
            records,
            length, isSorted;

        //<debug>
        if (me.buffered) {
            Ext.Error.raise({
                msg: 'add method may not be called on a buffered store'
            });
        }
        //</debug>

        // Accept both a single-argument array of records, or any number of record arguments
        if (Ext.isArray(arg)) {
            records = arg;
        } else {
            records = arguments;
        }

        length = records.length;
        isSorted = !me.remoteSort && me.sorters && me.sorters.items.length;

        // If this Store is sorted, and they only passed one Record (99% or use cases)
        // then it's much more efficient to add it sorted than to append and then sort.
        if (isSorted && length === 1) {
            return [ me.addSorted(me.createModel(records[0])) ];
        }

        // If this sort is sorted, set the flag used by the insert method to sort
        // before firing events.
        if (isSorted) {
            me.requireSort = true;
        }

        records = me.insert(me.data.length, records);
        delete me.requireSort;

        return records;
    },

    /**
     * (Local sort only) Inserts the passed Record into the Store at the index where it
     * should go based on the current sort information.
     *
     * @param {Ext.data.Record} record
     */
    addSorted: function(record) {
        var me = this,
            index = me.data.findInsertionIndex(record, me.generateComparator());

        me.insert(index, record);
        return record;
    },

    /**
     * Converts a literal to a model, if it's not a model already
     * @private
     * @param {Ext.data.Model/Object} record The record to create
     * @return {Ext.data.Model}
     */
    createModel: function(record) {
        if (!record.isModel) {
            record = Ext.ModelManager.create(record, this.model);
        }

        return record;
    },

    onUpdate: function(record, type, modifiedFieldNames){
        if (this.isGrouped()) {
            this.updateGroupsOnUpdate(record, modifiedFieldNames);
        }
    },

    /**
     * Calls the specified function for each {@link Ext.data.Model record} in the store.
     *
     * When store is filtered, only loops over the filtered records.
     *
     * @param {Function} fn The function to call. The {@link Ext.data.Model Record} is passed as the first parameter.
     * Returning `false` aborts and exits the iteration.
     * @param {Object} [scope] The scope (this reference) in which the function is executed.
     * Defaults to the current {@link Ext.data.Model record} in the iteration.
     */
    each: function(fn, scope) {
        var data = this.data.items,
            dLen = data.length,
            record, d;

        for (d = 0; d < dLen; d++) {
            record = data[d];
            if (fn.call(scope || record, record, d, dLen) === false) {
                break;
            }
        }
    },

    /**
     * Removes the specified record(s) from the Store, firing the {@link #event-remove} event for each instance that is removed.
     * 
     * A {@link #event-bulkremove} event is called at the end passing all removed records and their indices.
     * plus a single 'datachanged' event after removal.
     *
     * @param {Ext.data.Model/Ext.data.Model[]/Number/Number[]} records Model instance or array of instances to remove or an array of indices from which to remove records.
     */
    remove: function(records, /* private */ isMove, silent) {
        /*
         * Pass the isMove parameter if we know we're going to be re-inserting this record
         */
        isMove = isMove === true;

        var me = this,
            sync = false,
            snapshot = me.snapshot,
            data = me.data,
            i = 0,
            length,
            info = [],
            allRecords = [],
            indexes = [],
            item,
            isNotPhantom,
            index,
            record,
            removeRange,
            removeCount,
            fireRemoveEvent = !silent && me.hasListeners.remove;

        // Remove a single record
        if (records.isModel) {
            records = [records];
            length = 1;
        }

        // Or remove(myRecord)
        else if (Ext.isIterable(records)) {
            length = records.length;
        }

        // Allow remove({start:100: end: 110})
        // Private API used by removeAt to remove multiple, contiguous records
        else if (typeof records === 'object') {
            removeRange = true;
            i = records.start;
            length = records.end + 1;
            removeCount = length - i;
        }

        // Build an array of {record: rec, index: idx} objects to sort into index order.
        // Not necessary if we are removing a contiguous range
        if (!removeRange) {
            for (i = 0; i < length; ++i) {

                record = records[i];

                // Encountered a record index
                if (typeof record == 'number') {
                    index = record;
                    record = data.getAt(index);
                }
                // Removing a record instance
                else {
                    index = me.indexOf(record);
                }

                // Check record. If number passed, it may not exist.
                if (record && index > -1) {
                    info.push({
                        record: record,
                        index: index
                    });
                }

                // record guaranteed to be a record now
                if (snapshot) {
                    snapshot.remove(record);
                }
            }

            // Sort records into ascending order so that removalscan be processed in a deterministic order
            info = Ext.Array.sort(info, function(o1, o2) {
                var index1 = o1.index,
                    index2 = o2.index;

                return index1 === o2.index2 ? 0 : (index1 < index2 ? -1 : 1);
            });

            // The loop below loops through the info array if not removing contiguous range
            i = 0;
            length = info.length;
        }

        // we need to maintain a set of indexes since we're not guaranteed to
        // be removing the records in order
        // Start value of i is calculated!
        for (; i < length; i++) {
            if (removeRange) {
                record = data.getAt(i);
                index = i;
            } else {
                item = info[i];
                record = item.record;
                index = item.index;
            }

            allRecords.push(record);
            indexes.push(index);

            isNotPhantom = record.phantom !== true;
            // don't push phantom records onto removed
            if (!isMove && isNotPhantom) {

                // Store the index the record was removed from so that rejectChanges can re-insert at the correct place.
                // The record's index property won't do, as that is the index in the overall dataset when Store is buffered.
                record.removedFrom = index;
                me.removed.push(record);
            }

            record.unjoin(me);

            // Remove using the index, but subtract any intervening removed records which would cause the data
            // array to shuffle up.
            index -= i;
            sync = sync || isNotPhantom;

            // If we have not been asked to remove a range we must remove individual records
            // and fire the individual remove event..
            if (!removeRange) {
                data.removeAt(index);

                // Only fire individual remove events if not silent, and there are listeners.
                if (fireRemoveEvent) {
                    me.fireEvent('remove', me, record, index, !!isMove);
                }
            }
        }

        // If there was no listener for the single remove event, remove all records
        // from collection in one call
        if (removeRange) {
            data.removeRange(records.start, removeCount);
        }

        if (!silent) {
            me.fireEvent('bulkremove', me, allRecords, indexes, !!isMove);
            me.fireEvent('datachanged', me);
        }
        if (!isMove && me.autoSync && sync && !me.autoSyncSuspended) {
            me.sync();
        }
    },

    /**
     * Removes the model instance(s) at the given index
     * @param {Number} index The record index
     * @param {Number} [count=1] The number of records to delete
     */
    removeAt: function(index, count) {
        var me = this,
            storeCount = me.getCount();

        if (index <= storeCount) {
            if (arguments.length === 1) {
                me.remove([ index ]);
            } else if (count) {
                me.remove({
                    start: index,
                    end: Math.min(index + count, storeCount) - 1
                });
            }
        }
    },

    /**
     * Removes all items from the store.
     *
     * Individual record `{@link #event-remove}` events are not fired by this method.
     *
     * @param {Boolean} [silent=false] Pass `true` to prevent the record `{@link #event-bulkremove}`
     * and `{@link #event-clear}` events from being fired.
     */
    removeAll: function(silent) {
        var me = this,
            snapshot = me.snapshot,
            data = me.data;
            
        if (snapshot) {
            snapshot.removeAll(data.getRange());
        }

        if (me.buffered) {
            if (data) {
                if (silent) {
                    me.suspendEvent('clear');
                }
                data.clear();
                if (silent) {
                    me.resumeEvent('clear');
                }
            }            
        }

        else {
            // Use the remove range interface to remove the entire record set, passing the silent flag to mute the bulkremove event.
            // The remove range interface does not fire individual remove events.
            me.remove({
                start: 0,
                end: me.getCount() - 1
            }, false, silent);
            if (silent !== true) {
                me.fireEvent('clear', me);
            }
        }
    },

    /**
     * Loads data into the Store via the configured {@link #proxy}. This uses the Proxy to make an
     * asynchronous call to whatever storage backend the Proxy uses, automatically adding the retrieved
     * instances into the Store and calling an optional callback if required. Example usage:
     *
     *     store.load({
     *         scope: this,
     *         callback: function(records, operation, success) {
     *             // the {@link Ext.data.Operation operation} object
     *             // contains all of the details of the load operation
     *             console.log(records);
     *         }
     *     });
     *
     * If the callback scope does not need to be set, a function can simply be passed:
     *
     *     store.load(function(records, operation, success) {
     *         console.log('loaded records');
     *     });
     *
     * @param {Object/Function} [options] config object, passed into the Ext.data.Operation object before loading.
     * Additionally `addRecords: true` can be specified to add these records to the existing records, default is
     * to remove the Store's existing records first.
     */
    load: function(options) {
        var me = this;

        options = options || {};

        if (typeof options == 'function') {
            options = {
                callback: options
            };
        }

        options.groupers = options.groupers ||  me.groupers.items;
        options.page = options.page || me.currentPage;
        options.start = (options.start !== undefined) ? options.start : (options.page - 1) * me.pageSize;
        options.limit = options.limit || me.pageSize;
        options.addRecords = options.addRecords || false;

        if (me.buffered) {
            options.limit = me.viewSize || me.defaultViewSize;
            return me.loadToPrefetch(options);
        }
        return me.callParent([options]);
    },

    reload: function(options) {
        var me = this,
            startIdx,
            endIdx,
            startPage,
            endPage,
            i,
            waitForReload,
            bufferZone,
            records,
            count = me.getCount();

        if (!options) {
            options = {};
        }

        // If buffered, we have to clear the page cache and then
        // cache the page range surrounding store's loaded range.
        if (me.buffered) {

            // So that prefetchPage does not consider the store to be fully loaded if the local count is equal to the total count
            delete me.totalCount;

            waitForReload = function() {
                if (me.rangeCached(startIdx, endIdx)) {
                    me.loading = false;
                    me.data.un('pageAdded', waitForReload);
                    records = me.data.getRange(startIdx, endIdx);
                    me.fireEvent('load', me, records, true);
                }
            };
            bufferZone = Math.ceil((me.leadingBufferZone + me.trailingBufferZone) / 2);

            // Get our record index range in the dataset
            startIdx = options.start || (count ? me.getAt(0).index : 0);
            endIdx = startIdx + (options.count || (count ? count : me.pageSize)) - 1;

            // Calculate a page range which encompasses the Store's loaded range plus both buffer zones
            startPage = me.getPageFromRecordIndex(Math.max(startIdx - bufferZone, 0));
            endPage = me.getPageFromRecordIndex(endIdx + bufferZone);

            // Clear cache (with initial flag so that any listening BufferedRenderer does not reset to page 1).
            me.data.clear(true);

            if (me.fireEvent('beforeload', me, options) !== false) {
                me.loading = true;

                // Wait for the requested range to become available in the page map
                // Load the range as soon as the whole range is available
                me.data.on('pageAdded', waitForReload);

                // Recache the page range which encapsulates our visible records
                for (i = startPage; i <= endPage; i++) {
                    me.prefetchPage(i, options);
                }
            }
        } else {
            return me.callParent(arguments);
        }
    },

    /**
     * @private
     * Called internally when a Proxy has completed a load request
     */
    onProxyLoad: function(operation) {
        var me = this,
            resultSet = operation.getResultSet(),
            records = operation.getRecords(),
            successful = operation.wasSuccessful();

        if (me.isDestroyed) {
            return;
        }
        
        if (resultSet) {
            me.totalCount = resultSet.total;
        }

        // Loading should be set to false before loading the records.
        // loadRecords doesn't expose any hooks or events until refresh
        // and datachanged, so by that time loading should be false
        me.loading = false;
        if (successful) {
            me.loadRecords(records, operation);
        }

        if (me.hasListeners.load) {
            me.fireEvent('load', me, records, successful);
        }

        //TODO: deprecate this event, it should always have been 'load' instead. 'load' is now documented, 'read' is not.
        //People are definitely using this so can't deprecate safely until 2.x
        if (me.hasListeners.read) {
            me.fireEvent('read', me, records, successful);
        }

        //this is a callback that would have been passed to the 'read' function and is optional
        Ext.callback(operation.callback, operation.scope || me, [records, operation, successful]);
    },

    //inherit docs
    getNewRecords: function() {
        return this.data.filterBy(this.filterNew).items;
    },

    //inherit docs
    getUpdatedRecords: function() {
        return this.data.filterBy(this.filterUpdated).items;
    },

    /**
     * Filters the loaded set of records by a given set of filters.
     *
     * By default, the passed filter(s) are *added* to the collection of filters being used to filter this Store.
     *
     * To remove existing filters before applying a new set of filters use
     *
     *     // Clear the filter collection without updating the UI
     *     store.clearFilter(true);
     *
     * see {@link #clearFilter}.
     *
     * Alternatively, if filters are configured with an `id`, then existing filters store may be *replaced* by new
     * filters having the same `id`.
     *
     * Filtering by single field:
     *
     *     store.filter("email", /\.com$/);
     *
     * Using multiple filters:
     *
     *     store.filter([
     *         {property: "email", value: /\.com$/},
     *         {filterFn: function(item) { return item.get("age") > 10; }}
     *     ]);
     *
     * Using Ext.util.Filter instances instead of config objects
     * (note that we need to specify the {@link Ext.util.Filter#root root} config option in this case):
     *
     *     store.filter([
     *         Ext.create('Ext.util.Filter', {property: "email", value: /\.com$/, root: 'data'}),
     *         Ext.create('Ext.util.Filter', {filterFn: function(item) { return item.get("age") > 10; }, root: 'data'})
     *     ]);
     *
     * When store is filtered, most of the methods for accessing store data will be working only
     * within the set of filtered records. Two notable exceptions are {@link #queryBy} and
     * {@link #getById}.
     *
     * @param {Object[]/Ext.util.Filter[]/String} [filters] The set of filters to apply to the data.
     * These are stored internally on the store, but the filtering itself is done on the Store's
     * {@link Ext.util.MixedCollection MixedCollection}. See MixedCollection's
     * {@link Ext.util.MixedCollection#filter filter} method for filter syntax.
     * Alternatively, pass in a property string.
     *
     * If no parameters are passed, the Store's existing filter set is applied.
     * @param {String} [value] value to filter by (only if using a property string as the first argument)
     */
    filter: function(filters, value) {
        if (Ext.isString(filters)) {
            filters = {
                property: filters,
                value: value
            };
        }

        var me = this,
            decoded = me.decodeFilters(filters),
            i,
            doLocalSort = me.sorters.length && me.sortOnFilter && !me.remoteSort,
            length = decoded.length;

        // Merge new filters into current filter set.
        for (i = 0; i < length; i++) {
            me.filters.replace(decoded[i]);
        }

        filters = me.filters.items;

        // If there are filters, filter the data.
        // This method can not cut a filter set down to zero, it can only add or replace,
        // so if there are no filters, the store is not filtered, and they did not pass a filter.
        if (filters.length) {
            if (me.remoteFilter) {
                // So that prefetchPage does not consider the store to be fully loaded if the local count is equal to the total count
                delete me.totalCount;

                // For a buffered Store, we have to clear the prefetch cache because the dataset will change upon filtering.
                // Then we must prefetch the new page 1, and when that arrives, reload the visible part of the Store
                // via the guaranteedrange event
                if (me.buffered) {
                    me.data.clear();
                    me.loadPage(1);
                } else {
                    // Reset to the first page, the filter is likely to produce a smaller data set
                    me.currentPage = 1;
                    //the load function will pick up the new filters and request the filtered data from the proxy
                    me.load();
                }
            } else {
                /**
                * @property {Ext.util.MixedCollection} snapshot
                * A pristine (unfiltered) collection of the records in this store. This is used to reinstate
                * records when a filter is removed or changed
                */
                me.snapshot = me.snapshot || me.data.clone();

                // Filter the unfiltered dataset using the filter set
                me.data = me.snapshot.filter(filters);

                // Groups will change when filters change
                me.constructGroups();

                if (doLocalSort) {
                    me.sort();
                } else {
                    // fire datachanged event if it hasn't already been fired by doSort
                    me.fireEvent('datachanged', me);
                    me.fireEvent('refresh', me);
                }
            }
            me.fireEvent('filterchange', me, filters);
        }
    },

    /**
     * Reverts to a view of the Record cache with no filtering applied.
     * @param {Boolean} [suppressEvent] If `true` the filter is cleared silently.
     *
     * For a locally filtered Store, this means that the filter collection is cleared without firing the
     * {@link #datachanged} event.
     *
     * For a remotely filtered Store, this means that the filter collection is cleared, but the store
     * is not reloaded from the server.
     */
    clearFilter: function(suppressEvent) {
        var me = this;

        me.filters.clear();

        if (me.remoteFilter) {

            // In a buffered Store, the meaning of suppressEvent is to simply clear the filters collection
            if (suppressEvent) {
                return;
            }

            // So that prefetchPage does not consider the store to be fully loaded if the local count is equal to the total count
            delete me.totalCount;

            // For a buffered Store, we have to clear the prefetch cache because the dataset will change upon filtering.
            // Then we must prefetch the new page 1, and when that arrives, reload the visible part of the Store
            // via the guaranteedrange event
            if (me.buffered) {
                me.data.clear();
                me.loadPage(1);
            } else {
                // Reset to the first page, clearing a filter will destroy the context of the current dataset
                me.currentPage = 1;
                me.load();
            }
        } else if (me.isFiltered()) {
            me.data = me.snapshot;
            delete me.snapshot;

            // Groups will change when filters change
            me.constructGroups();

            if (suppressEvent !== true) {
                me.fireEvent('datachanged', me);
                me.fireEvent('refresh', me);
            }
        }
        me.fireEvent('filterchange', me, me.filters.items);
    },

    /**
     * Removes an individual Filter from the current {@link #property-filters filter set} using the passed Filter/Filter id and
     * by default, applys the updated filter set to the Store's unfiltered dataset.
     *
     * @param {Mixed} toRemove The id of a Filter to remove from the filter set, or a Filter instance to remove.
     * @param {Boolean} [applyFilters=true] Pass as `false` to remove the filter but not apply the updated filter set.
     *
     * If `null` is passed, all anonymous Filters (Filters with no `id` property) will be removed.
     */
    removeFilter: function(toRemove, applyFilters) {
        var me = this;

        if (!me.remoteFilter && me.isFiltered()) {
            if (toRemove instanceof Ext.util.Filter) {
                me.filters.remove(toRemove);
            } else {
                me.filters.removeAtKey(toRemove);
            }

            if (applyFilters !== false) {

                // Not gone down to zero filters - re-filter Store
                if (me.filters.length) {
                    me.filter();
                }

                // No filters left - let clearFilter do its thing.
                else {
                    me.clearFilter();
                }
            } else {
                me.fireEvent('filterchange', me, me.filters.items);
            }
        }
    },

    /**
     * Adds a new Filter to this Store's {@link #property-filters filter set} and
     * by default, applys the updated filter set to the Store's unfiltered dataset.
     * @param {Object[]/Ext.util.Filter[]} filters The set of filters to add to the current {@link #property-filters filter set}.
     * @param {Boolean} [applyFilters=true] Pass as `false` to add the filter but not apply the updated filter set.
     *
     */
    addFilter: function(filters, applyFilters) {
        var me = this,
            decoded,
            i,
            length;

        // Decode passed filters and replace/add into the filter set
        decoded = me.decodeFilters(filters);
        length = decoded.length;
        for (i = 0; i < length; i++) {
            me.filters.replace(decoded[i]);
        }

        if (applyFilters !== false && me.filters.length) {
            me.filter();
        } else {
            me.fireEvent('filterchange', me, me.filters.items);
        }
    },

    /**
     * Returns `true` if this store is currently filtered
     * @return {Boolean}
     */
    isFiltered: function() {
        var snapshot = this.snapshot;
        return !!(snapshot && snapshot !== this.data);
    },

    /**
     * Filters by a function. The specified function will be called for each
     * Record in this Store. If the function returns `true` the Record is included,
     * otherwise it is filtered out.
     *
     * When store is filtered, most of the methods for accessing store data will be working only
     * within the set of filtered records. Two notable exceptions are {@link #queryBy} and
     * {@link #getById}.
     *
     * @param {Function} fn The function to be called. It will be passed the following parameters:
     *  @param {Ext.data.Model} fn.record The record to test for filtering. Access field values
     *  using {@link Ext.data.Model#get}.
     *  @param {Object} fn.id The ID of the Record passed.
     * @param {Object} [scope] The scope (this reference) in which the function is executed.
     * Defaults to this Store.
     */
    filterBy: function(fn, scope) {
        var me = this;

        me.snapshot = me.snapshot || me.data.clone();
        me.data = me.queryBy(fn, scope || me);
        me.fireEvent('datachanged', me);
        me.fireEvent('refresh', me);
    },

    /**
     * Query all the cached records in this Store using a filtering function. The specified function
     * will be called with each record in this Store. If the function returns `true` the record is
     * included in the results.
     *
     * This method is not effected by filtering, it will always look from all records inside the store
     * no matter if filter is applied or not.
     *
     * @param {Function} fn The function to be called. It will be passed the following parameters:
     *  @param {Ext.data.Model} fn.record The record to test for filtering. Access field values
     *  using {@link Ext.data.Model#get}.
     *  @param {Object} fn.id The ID of the Record passed.
     * @param {Object} [scope] The scope (this reference) in which the function is executed
     * Defaults to this Store.
     * @return {Ext.util.MixedCollection} Returns an Ext.util.MixedCollection of the matched records
     */
    queryBy: function(fn, scope) {
        var me = this;
        return (me.snapshot || me.data).filterBy(fn, scope || me);
    },

    /**
     * Query all the cached records in this Store by name/value pair.
     * The parameters will be used to generated a filter function that is given
     * to the queryBy method.
     *
     * This method compliments queryBy by generating the query function automatically.
     *
     * @param {String} property The property to create the filter function for
     * @param {String/RegExp} value The string/regex to compare the property value to
     * @param {Boolean} [anyMatch=false] `true` if we don't care if the filter value is not the full value.
     * @param {Boolean} [caseSensitive=false] `true` to create a case-sensitive regex.
     * @param {Boolean} [exactMatch=false] `true` to force exact match (^ and $ characters added to the regex).
     * Ignored if `anyMatch` is `true`.
     * @return {Ext.util.MixedCollection} Returns an Ext.util.MixedCollection of the matched records
     */
    query: function(property, value, anyMatch, caseSensitive, exactMatch) {
        var me = this,
            queryFn = me.createFilterFn(property, value, anyMatch, caseSensitive, exactMatch),
            results = me.queryBy(queryFn);

        //create an empty mixed collection for use if queryBy returns null
        if(!results) {
            results = new Ext.util.MixedCollection();
        }

        return results;
    },

    /**
     * Loads an array of data straight into the Store.
     *
     * Using this method is great if the data is in the correct format already (e.g. it doesn't need to be
     * processed by a reader). If your data requires processing to decode the data structure, use a
     * {@link Ext.data.proxy.Memory MemoryProxy} or {@link #loadRawData}.
     *
     * @param {Ext.data.Model[]/Object[]} data Array of data to load. Any non-model instances will be cast
     * into model instances first.
     * @param {Boolean} [append=false] `true` to add the records to the existing records in the store, `false`
     * to remove the old ones first.
     */
    loadData: function(data, append) {
        var length = data.length,
            newData = [],
            i;

        //make sure each data element is an Ext.data.Model instance
        for (i = 0; i < length; i++) {
            newData.push(this.createModel(data[i]));
        }

        this.loadRecords(newData, append ? this.addRecordsOptions : undefined);
    },

    /**
     * Loads data via the bound Proxy's reader
     *
     * Use this method if you are attempting to load data and want to utilize the configured data reader.
     *
     * @param {Object[]} data The full JSON object you'd like to load into the Data store.
     * @param {Boolean} [append=false] `true` to add the records to the existing records in the store, `false`
     * to remove the old ones first.
     */
    loadRawData : function(data, append) {
         var me      = this,
             result  = me.proxy.reader.read(data),
             records = result.records;

         if (result.success) {
             me.totalCount = result.total;
             me.loadRecords(records, append ? me.addRecordsOptions : undefined);
         }
     },

    /**
     * Loads an array of {@link Ext.data.Model model} instances into the store, fires the datachanged event. This should only usually
     * be called internally when loading from the {@link Ext.data.proxy.Proxy Proxy}, when adding records manually use {@link #method-add} instead
     * @param {Ext.data.Model[]} records The array of records to load
     * @param {Object} options
     * @param {Boolean} [options.addRecords=false] Pass `true` to add these records to the existing records, `false` to remove the Store's existing records first.
     * @param {Number}  [options.start] Only used by buffered Stores. The index *within the overall dataset* of the first record in the array.
     */
    loadRecords: function(records, options) {
        var me     = this,
            i      = 0,
            length = records.length,
            start,
            addRecords,
            snapshot = me.snapshot;

        if (options) {
            start = options.start;
            addRecords = options.addRecords;
        }

        if (!addRecords) {
            delete me.snapshot;
            me.clearData(true);
        } else if (snapshot) {
            snapshot.addAll(records);
        }

        me.data.addAll(records);

        if (start !== undefined) {
            for (; i < length; i++) {
                records[i].index = start + i;
                records[i].join(me);
            }
        } else {
            for (; i < length; i++) {
                records[i].join(me);
            }
        }

        /*
         * this rather inelegant suspension and resumption of events is required because both the filter and sort functions
         * fire an additional datachanged event, which is not wanted. Ideally we would do this a different way. The first
         * datachanged event is fired by the call to this.add, above.
         */
        me.suspendEvents();

        if (me.filterOnLoad && !me.remoteFilter) {
            me.filter();
        }

        if (me.sortOnLoad && !me.remoteSort) {
            me.sort(undefined, undefined, undefined, true);
        }

        me.resumeEvents();
        if (me.isGrouped()) {
            me.constructGroups();
        }
        me.fireEvent('datachanged', me);
        me.fireEvent('refresh', me);
    },

    // PAGING METHODS
    /**
     * Loads a given 'page' of data by setting the start and limit values appropriately. Internally this just causes a normal
     * load operation, passing in calculated 'start' and 'limit' params.
     * @param {Number} page The number of the page to load.
     * @param {Object} [options] See options for {@link #method-load}.
     */
    loadPage: function(page, options) {
        var me = this;

        me.currentPage = page;

        // Copy options into a new object so as not to mutate passed in objects
        options = Ext.apply({
            page: page,
            start: (page - 1) * me.pageSize,
            limit: me.pageSize,
            addRecords: !me.clearOnPageLoad
        }, options);

        if (me.buffered) {
            options.limit = me.viewSize || me.defaultViewSize;
            return me.loadToPrefetch(options);
        }
        me.read(options);
    },

    /**
     * Loads the next 'page' in the current data set
     * @param {Object} options See options for {@link #method-load}
     */
    nextPage: function(options) {
        this.loadPage(this.currentPage + 1, options);
    },

    /**
     * Loads the previous 'page' in the current data set
     * @param {Object} options See options for {@link #method-load}
     */
    previousPage: function(options) {
        this.loadPage(this.currentPage - 1, options);
    },

    // private
    clearData: function(isLoad) {
        var me = this,
            records,
            i;

        // We only have to do the unjoining if not buffered. PageMap will unjoin its records when it clears itself.
        // There is a potential for a race condition in stores configured with autoDestroy: true;
        // if loading was initiated but didn't complete by the time the store is destroyed,
        // the data MC may not have been created yet so we have to check for its existence
        // here and below.
        if (!me.buffered && me.data) {
            records = me.data.items;
            i = records.length;
            while (i--) {
                records[i].unjoin(me);
            }
        }

        // Remove all data from the Collection/PageMap. PageMap will perform unjoining.
        if (me.data) {
            me.data.clear();
        }
        
        if (isLoad !== true || me.clearRemovedOnLoad) {
            me.removed.length = 0;
        }
    },

    loadToPrefetch: function(options) {
        var me = this,
            i,
            records,
            dataSetSize,
            prefetchOptions = options,

            // Get the requested record index range in the dataset
            startIdx = options.start,
            endIdx = options.start + options.limit - 1,

            // The end index to load into the store's live record collection
            loadEndIdx = Math.min(endIdx, options.start + (me.viewSize || options.limit) - 1),

            // Calculate a page range which encompasses the requested range plus both buffer zones.
            // The endPage will be adjusted to be in the dataset size range as soon as the first data block returns.
            startPage = me.getPageFromRecordIndex(Math.max(startIdx - me.trailingBufferZone, 0)),
            endPage = me.getPageFromRecordIndex(endIdx + me.leadingBufferZone),

            // Wait for the viewable range to be available
            waitForRequestedRange = function() {
                if (me.rangeCached(startIdx, loadEndIdx)) {
                    me.loading = false;
                    records = me.data.getRange(startIdx, loadEndIdx);
                    me.data.un('pageAdded', waitForRequestedRange);

                    // If there is a listener for guranteedrange then fire that event
                    if (me.hasListeners.guaranteedrange) {
                        me.guaranteeRange(startIdx, loadEndIdx, options.callback, options.scope);
                    }
                    if (options.callback) {
                        options.callback.call(options.scope||me, records, startIdx, endIdx, options);
                    }
                    me.fireEvent('datachanged', me);
                    me.fireEvent('refresh', me);
                    me.fireEvent('load', me, records, true);
                    if (options.groupChange) {
                        me.fireGroupChange();
                    }
                }
            };

        if (me.fireEvent('beforeload', me, options) !== false) {

            // So that prefetchPage does not consider the store to be fully loaded if the local count is equal to the total count
            delete me.totalCount;

            me.loading = true;

            // Any configured callback is handled in waitForRequestedRange above.
            // It should not be processed by onProxyPrefetch.
            if (options.callback) {
                prefetchOptions = Ext.apply({}, options);
                delete prefetchOptions.callback;
            }

            // Load the first page in the range, which will give us the initial total count.
            // Once it is loaded, go ahead and prefetch any subsequent pages, if necessary.
            // The prefetchPage has a check to prevent us loading more than the totalCount,
            // so we don't want to blindly load up <n> pages where it isn't required. 
            me.on('prefetch', function(store, records, successful, operation) {

                if (successful) {
                    // If there is data in the dataset, we can go ahead and add the pageAdded listener which waits for the visible range
                    // and we can also issue the requests to fill the surrounding buffer zones.
                    if ((dataSetSize = me.getTotalCount())) {

                        // Wait for the requested range to become available in the page map
                        me.data.on('pageAdded', waitForRequestedRange);

                        // As soon as we have the size of the dataset, ensure we are not waiting for more than can ever arrive,
                        loadEndIdx = Math.min(loadEndIdx, dataSetSize - 1);

                        // And make sure we never ask for pages beyond the end of the dataset.
                        endPage = me.getPageFromRecordIndex(Math.min(loadEndIdx + me.leadingBufferZone, dataSetSize - 1));

                        for (i = startPage + 1; i <= endPage; ++i) {
                            me.prefetchPage(i, prefetchOptions);
                        }
                    } else {
                        me.fireEvent('datachanged', me);
                        me.fireEvent('refresh', me);
                        me.fireEvent('load', me, records, true);
                    }
                }
                // Unsuccessful prefetch: fire a load event with success false.
                else {
                    me.fireEvent('load', me, records, false);
                }
            }, null, {single: true});

            me.prefetchPage(startPage, prefetchOptions);
        }
    },

    // Buffering
    /**
     * Prefetches data into the store using its configured {@link #proxy}.
     * @param {Object} options (Optional) config object, passed into the Ext.data.Operation object before loading.
     * See {@link #method-load}
     */
    prefetch: function(options) {
        var me = this,
            pageSize = me.pageSize,
            proxy,
            operation;

        // Check pageSize has not been tampered with. That would break page caching
        if (pageSize) {
            if (me.lastPageSize && pageSize != me.lastPageSize) {
                Ext.Error.raise("pageSize cannot be dynamically altered");
            }
            if (!me.data.pageSize) {
                me.data.pageSize = pageSize;
            }
        }

        // Allow first prefetch call to imply the required page size.
        else {
            me.pageSize = me.data.pageSize = pageSize = options.limit;
        }

        // So that we can check for tampering next time through
        me.lastPageSize = pageSize;

        // Always get whole pages.
        if (!options.page) {
            options.page = me.getPageFromRecordIndex(options.start);
            options.start = (options.page - 1) * pageSize;
            options.limit = Math.ceil(options.limit / pageSize) * pageSize;
        }

        // Currently not requesting this page, then request it...
        if (!me.pageRequests[options.page]) {

            // Copy options into a new object so as not to mutate passed in objects
            options = Ext.apply({
                action : 'read',
                filters: me.filters.items,
                sorters: me.sorters.items,
                groupers: me.groupers.items,

                // Generation # of the page map to which the requested records belong.
                // If page map is cleared while this request is in flight, the pageMapGeneration will increment and the payload will be rejected
                pageMapGeneration: me.data.pageMapGeneration
            }, options);

            operation = new Ext.data.Operation(options);

            if (me.fireEvent('beforeprefetch', me, operation) !== false) {
                proxy = me.proxy;
                me.pageRequests[options.page] = proxy.read(operation, me.onProxyPrefetch, me);
                if (proxy.isSynchronous) {
                    delete me.pageRequests[options.page];
                }
            }
        }

        return me;
    },

    /**
     * @private
     * Cancels all pending prefetch requests.
     *
     * This is called when the page map is cleared.
     *
     * Any requests which still make it through will be for the previous pageMapGeneration
     * (pageMapGeneration is incremented upon clear), and so will be rejected upon arrival.
     */
    onPageMapClear: function() {
        var me = this,
            loadingFlag = me.wasLoading,
            reqs = me.pageRequests,
            req,
            page;

        // If any requests return, we no longer respond to them.
        if (me.data.events.pageadded) {
            me.data.events.pageadded.clearListeners();
        }

        // If the page cache gets cleared it's because a full reload is in progress.
        // Setting the loading flag prevents linked Views from displaying the empty text
        // during a load... we don't know whether ther dataset is empty or not.
        me.loading = true;
        me.totalCount = 0;

        // Cancel all outstanding requests
        for (page in reqs) {
            if (reqs.hasOwnProperty(page)) {
                req = reqs[page];
                delete reqs[page];
                delete req.callback;
            }
        }

        // This will update any views. 
        me.fireEvent('clear', me);

        // Restore loading flag. The beforeload event could still veto the process.
        // The flag does not get set for real until we pass the beforeload event.
        me.loading = loadingFlag;
    },

    /**
     * Prefetches a page of data.
     * @param {Number} page The page to prefetch
     * @param {Object} options (Optional) config object, passed into the Ext.data.Operation object before loading.
     * See {@link #method-load}
     */
    prefetchPage: function(page, options) {
        var me = this,
            pageSize = me.pageSize || me.defaultPageSize,
            start = (page - 1) * me.pageSize,
            total = me.totalCount;

        // No more data to prefetch.
        if (total !== undefined && me.getCount() === total) {
            return;
        }

        // Copy options into a new object so as not to mutate passed in objects
        me.prefetch(Ext.applyIf({
            page     : page,
            start    : start,
            limit    : pageSize
        }, options));
    },

    /**
     * Called after the configured proxy completes a prefetch operation.
     * @private
     * @param {Ext.data.Operation} operation The operation that completed
     */
    onProxyPrefetch: function(operation) {
        var me = this,
            resultSet = operation.getResultSet(),
            records = operation.getRecords(),
            successful = operation.wasSuccessful(),
            page = operation.page;

        // Only cache the data if the operation was invoked for the current pageMapGeneration.
        // If the pageMapGeneration has changed since the request was fired off, it will have been cancelled.
        if (operation.pageMapGeneration === me.data.pageMapGeneration) {

            if (resultSet) {
                me.totalCount = resultSet.total;
                me.fireEvent('totalcountchange', me.totalCount);
            }

            // Remove the loaded page from the outstanding pages hash
            if (page !== undefined) {
                delete me.pageRequests[page];
            }

            // Prefetch is broadcast before the page is cached
            me.loading = false;
            me.fireEvent('prefetch', me, records, successful, operation);

            // Add the page into the page map.
            // pageAdded event may trigger the onGuaranteedRange
            if (successful) {
                me.cachePage(records, operation.page);
            }

            //this is a callback that would have been passed to the 'read' function and is optional
            Ext.callback(operation.callback, operation.scope || me, [records, operation, successful]);
        }
    },

    /**
     * Caches the records in the prefetch and stripes them with their server-side
     * index.
     * @private
     * @param {Ext.data.Model[]} records The records to cache
     * @param {Ext.data.Operation} page The associated operation
     */
    cachePage: function(records, page) {
        var me = this,
            len = records.length, i;

        if (!Ext.isDefined(me.totalCount)) {
            me.totalCount = records.length;
            me.fireEvent('totalcountchange', me.totalCount);
        }

        // Add the fetched page into the pageCache
        for (i = 0; i < len; i++) {
            records[i].join(me);
        }
        me.data.addPage(page, records);
    },

    /**
     * Determines if the passed range is available in the page cache.
     * @private
     * @param {Number} start The start index
     * @param {Number} end The end index in the range
     */
    rangeCached: function(start, end) {
        return this.data && this.data.hasRange(start, end);
    },

    /**
     * Determines if the passed page is available in the page cache.
     * @private
     * @param {Number} page The page to find in the page cache.
     */
    pageCached: function(page) {
        return this.data && this.data.hasPage(page);
    },
    
    /**
     * Determines if a request for a page is currently running
     * @private
     * @param {Number} page The page to check for
     */
    pagePending: function(page) {
        return !!this.pageRequests[page];
    },

    /**
     * Determines if the passed range is available in the page cache.
     * @private
     * @deprecated 4.1.0 use {@link #rangeCached} instead
     * @param {Number} start The start index
     * @param {Number} end The end index in the range
     * @return {Boolean}
     */
    rangeSatisfied: function(start, end) {
        return this.rangeCached(start, end);
    },

    /**
     * Determines the page from a record index
     * @param {Number} index The record index
     * @return {Number} The page the record belongs to
     */
    getPageFromRecordIndex: function(index) {
        return Math.floor(index / this.pageSize) + 1;
    },

    /**
     * Handles a guaranteed range being loaded
     * @private
     */
    onGuaranteedRange: function(options) {
        var me = this,
            totalCount = me.getTotalCount(),
            start = options.prefetchStart,
            end = (options.prefetchEnd > totalCount - 1) ? totalCount - 1 : options.prefetchEnd,
            range;

        end = Math.max(0, end);

        //<debug>
        if (start > end) {
            Ext.log({
                level: 'warn',
                msg: 'Start (' + start + ') was greater than end (' + end +
                    ') for the range of records requested (' + start + '-' +
                    options.prefetchEnd + ')' + (this.storeId ? ' from store "' + this.storeId + '"' : '')
            });
        }
        //</debug>

        range = me.data.getRange(start, end);
        if (options.fireEvent !== false) {
            me.fireEvent('guaranteedrange', range, start, end, options);
        }
        if (options.callback) {
            options.callback.call(options.scope || me, range, start, end, options);
        }
    },

    /**
     * Guarantee a specific range, this will load the store with a range (that
     * must be the `pageSize` or smaller) and take care of any loading that may
     * be necessary.
     * @deprecated Use {@link #getRange}
     */
    guaranteeRange: function(start, end, callback, scope, options) {
         options = Ext.apply({
             callback: callback,
             scope: scope
         }, options);
         this.getRange(start, end, options)
     },

    /**
     * Ensures that the specified range of rows is present in the cache.
     *
     * Converts the row range to a page range and then only load pages which are not already
     * present in the page cache.
     */
    prefetchRange: function(start, end) {
        var me = this,
            startPage, endPage, page;
        if (!me.rangeCached(start, end)) {
            startPage = me.getPageFromRecordIndex(start);
            endPage = me.getPageFromRecordIndex(end);

            // Ensure that the page cache's max size is correct.
            // Our purgePageCount is the number of additional pages *outside of the required range* which
            // may be kept in the cache. A purgePageCount of zero means unlimited.
            me.data.maxSize = me.purgePageCount ? (endPage - startPage + 1) + me.purgePageCount : 0;

            // We have the range, but ensure that we have a "buffer" of pages around it.
            for (page = startPage; page <= endPage; page++) {
                if (!me.pageCached(page)) {
                    me.prefetchPage(page);
                }
            }
        }
    },

    primeCache: function(start, end, direction) {
        var me = this;

        // Scrolling up
        if (direction === -1) {
            start = Math.max(start - me.leadingBufferZone, 0);
            end   = Math.min(end   + me.trailingBufferZone, me.totalCount - 1);
        }
        // Scrolling down
        else if (direction === 1) {
            start = Math.max(Math.min(start - me.trailingBufferZone, me.totalCount - me.pageSize), 0);
            end   = Math.min(end + me.leadingBufferZone, me.totalCount - 1);
        }
        // Teleporting
        else {
            start = Math.min(Math.max(Math.floor(start - ((me.leadingBufferZone + me.trailingBufferZone) / 2)), 0), me.totalCount - me.pageSize);
            end =   Math.min(Math.max(Math.ceil (end   + ((me.leadingBufferZone + me.trailingBufferZone) / 2)), 0), me.totalCount - 1);
        }
        me.prefetchRange(start, end);
    },

    // because prefetchData is stored by index
    // this invalidates all of the prefetchedData
    sort: function() {
        var me = this;

        if (me.buffered && me.remoteSort) {
            me.data.clear();
        }
        return me.callParent(arguments);
    },

    // overriden to provide striping of the indexes as sorting occurs.
    // this cannot be done inside of sort because datachanged has already
    // fired and will trigger a repaint of the bound view.
    doSort: function(sorterFn) {
        var me = this,
            range,
            ln,
            i;

        if (me.remoteSort) {

            // For a buffered Store, we have to clear the prefetch cache since it is keyed by the index within the dataset.
            // Then we must prefetch the new page 1, and when that arrives, reload the visible part of the Store
            // via the guaranteedrange event
            if (me.buffered) {
                me.data.clear();
                me.loadPage(1);
            } else {
                //the load function will pick up the new sorters and request the sorted data from the proxy
                me.load();
            }
        } else {
            //<debug>
            if (me.buffered) {
                Ext.Error.raise({
                    msg: 'Local sorting may not be used on a buffered store'
                });
            }
            //</debug>
            me.data.sortBy(sorterFn);
            if (!me.buffered) {
                range = me.getRange();
                ln = range.length;
                for (i = 0; i < ln; i++) {
                    range[i].index = i;
                }
            }
            me.fireEvent('datachanged', me);
            me.fireEvent('refresh', me);
        }
    },

    /**
     * Finds the index of the first matching Record in this store by a specific field value.
     *
     * When store is filtered, finds records only within filter.
     *
     * **IMPORTANT
     *
     * If this store is {@link #buffered}, this can ONLY find records which happen to be cached in the page cache.
     * This will be parts of the dataset around the currently visible zone, or recently visited zones if the pages
     * have not yet been purged from the cache.**
     *
     * @param {String} fieldName The name of the Record field to test.
     * @param {String/RegExp} value Either a string that the field value
     * should begin with, or a RegExp to test against the field.
     * @param {Number} [startIndex=0] The index to start searching at
     * @param {Boolean} [anyMatch=false] True to match any part of the string, not just the beginning
     * @param {Boolean} [caseSensitive=false] True for case sensitive comparison
     * @param {Boolean} [exactMatch=false] True to force exact match (^ and $ characters added to the regex).
     * @return {Number} The matched index or -1
     */
    find: function(property, value, start, anyMatch, caseSensitive, exactMatch) {
        var fn = this.createFilterFn(property, value, anyMatch, caseSensitive, exactMatch);
        return fn ? this.data.findIndexBy(fn, null, start) : -1;
    },

    /**
     * Finds the first matching Record in this store by a specific field value.
     *
     * When store is filtered, finds records only within filter.
     *
     * **IMPORTANT
     *
     * If this store is {@link #buffered}, this can ONLY find records which happen to be cached in the page cache.
     * This will be parts of the dataset around the currently visible zone, or recently visited zones if the pages
     * have not yet been purged from the cache.**
     *
     * @param {String} fieldName The name of the Record field to test.
     * @param {String/RegExp} value Either a string that the field value
     * should begin with, or a RegExp to test against the field.
     * @param {Number} [startIndex=0] The index to start searching at
     * @param {Boolean} [anyMatch=false] True to match any part of the string, not just the beginning
     * @param {Boolean} [caseSensitive=false] True for case sensitive comparison
     * @param {Boolean} [exactMatch=false] True to force exact match (^ and $ characters added to the regex).
     * @return {Ext.data.Model} The matched record or null
     */
    findRecord: function() {
        var me = this,
            index = me.find.apply(me, arguments);
        return index !== -1 ? me.getAt(index) : null;
    },

    /**
     * @private
     * Returns a filter function used to test a the given property's value. Defers most of the work to
     * Ext.util.MixedCollection's createValueMatcher function.
     *
     * @param {String} property The property to create the filter function for
     * @param {String/RegExp} value The string/regex to compare the property value to
     * @param {Boolean} [anyMatch=false] True if we don't care if the filter value is not the full value.
     * @param {Boolean} [caseSensitive=false] True to create a case-sensitive regex.
     * @param {Boolean} [exactMatch=false] True to force exact match (^ and $ characters added to the regex).
     * Ignored if anyMatch is true.
     */
    createFilterFn: function(property, value, anyMatch, caseSensitive, exactMatch) {
        if (Ext.isEmpty(value)) {
            return false;
        }
        value = this.data.createValueMatcher(value, anyMatch, caseSensitive, exactMatch);
        return function(r) {
            return value.test(r.data[property]);
        };
    },

    /**
     * Finds the index of the first matching Record in this store by a specific field value.
     *
     * When store is filtered, finds records only within filter.
     *
     * **IMPORTANT
     *
     * If this store is {@link #buffered}, this can ONLY find records which happen to be cached in the page cache.
     * This will be parts of the dataset around the currently visible zone, or recently visited zones if the pages
     * have not yet been purged from the cache.**
     *
     * @param {String} fieldName The name of the Record field to test.
     * @param {Object} value The value to match the field against.
     * @param {Number} [startIndex=0] The index to start searching at
     * @return {Number} The matched index or -1
     */
    findExact: function(property, value, start) {
        return this.data.findIndexBy(function(rec) {
            return rec.isEqual(rec.get(property), value);
        },
        this, start);
    },

    /**
     * Find the index of the first matching Record in this Store by a function.
     * If the function returns `true` it is considered a match.
     *
     * When store is filtered, finds records only within filter.
     *
     * **IMPORTANT
     *
     * If this store is {@link #buffered}, this can ONLY find records which happen to be cached in the page cache.
     * This will be parts of the dataset around the currently visible zone, or recently visited zones if the pages
     * have not yet been purged from the cache.**
     *
     * @param {Function} fn The function to be called. It will be passed the following parameters:
     *  @param {Ext.data.Model} fn.record The record to test for filtering. Access field values
     *  using {@link Ext.data.Model#get}.
     *  @param {Object} fn.id The ID of the Record passed.
     * @param {Object} [scope] The scope (this reference) in which the function is executed.
     * Defaults to this Store.
     * @param {Number} [startIndex=0] The index to start searching at
     * @return {Number} The matched index or -1
     */
    findBy: function(fn, scope, start) {
        return this.data.findIndexBy(fn, scope, start);
    },

    /**
     * Collects unique values for a particular dataIndex from this store.
     *
     * @param {String} dataIndex The property to collect
     * @param {Boolean} [allowNull] Pass true to allow null, undefined or empty string values
     * @param {Boolean} [bypassFilter] Pass true to collect from all records, even ones which are filtered.
     * @return {Object[]} An array of the unique values
     */
    collect: function(dataIndex, allowNull, bypassFilter) {
        var me = this,
            data = (bypassFilter === true && me.snapshot) ? me.snapshot : me.data;

        return data.collect(dataIndex, 'data', allowNull);
    },

    /**
     * Gets the number of records in store.
     *
     * If using paging, this may not be the total size of the dataset. If the data object
     * used by the Reader contains the dataset size, then the {@link #getTotalCount} function returns
     * the dataset size.  **Note**: see the Important note in {@link #method-load}.
     *
     * When store is filtered, it's the number of records matching the filter.
     *
     * @return {Number} The number of Records in the Store.
     */
    getCount: function() {
        return this.data.getCount();
    },

    /**
     * Returns the total number of {@link Ext.data.Model Model} instances that the {@link Ext.data.proxy.Proxy Proxy}
     * indicates exist. This will usually differ from {@link #getCount} when using paging - getCount returns the
     * number of records loaded into the Store at the moment, getTotalCount returns the number of records that
     * could be loaded into the Store if the Store contained all data
     * @return {Number} The total number of Model instances available via the Proxy. 0 returned if
     * no value has been set via the reader.
     */
    getTotalCount: function() {
        return this.totalCount || 0;
    },

    /**
     * Get the Record at the specified index.
     *
     * The index is effected by filtering.
     *
     * @param {Number} index The index of the Record to find.
     * @return {Ext.data.Model} The Record at the passed index. Returns undefined if not found.
     */
    getAt: function(index) {
        return this.data.getAt(index);
    },

    /**
     * Gathers a range of Records between specified indices.
     * 
     * If this store is {@link #buffered}, the indices are relative to the entire dataset, not the local record cache.
     * 
     * If this store is {@link #buffered}, then the requested data range *may* not be immediately available, and will
     * be returned through a passed callback function.
     *
     * This method is affected by filtering.
     *
     * @param {Number} start The starting index. Defaults to zero for non {@link #buffered} Stores.
     * @param {Number} end The ending index. Defaults to the last Record for non {@link #buffered} Stores.
     * @param {Object} [options] Used when the Store is {@link #buffered] and the range may not be available synchronously.
     *  @param {Object} options.callback A function to call when the range becomes available.
     *  @param {Ext.data.Model[]} options.callback.range The requested range of records.
     *   @param {Number} options.callback.start The delivered start index.
     *   @param {Number} options.callback.end The delivered end index
     *   @param {Number} options.callback.options The passed options object.
     * @return {Ext.data.Model[]} An array of records **if the records are immediately available**. For {@link #buffered}
     * stores, you should pass the callback option **unless you know that the range will be present** - see {@link #rangeCached}.
     */
    getRange: function(start, end, options) {
        //<debug>
        if (options && options.cb) {
            options.callback = options.cb;
            Ext.Error.raise({
                msg: 'guaranteeRange options.cb is deprecated, use options.callback'
            });
        }
        //</debug>

        var me = this,
            requiredStart,
            requiredEnd,
            maxIndex = me.totalCount - 1,
            lastRequestStart = me.lastRequestStart,
            pageAddHandler,
            result;

        options = Ext.apply({
            prefetchStart: start,
            prefetchEnd: end
        }, options);

        if (me.buffered) {
            // Sanity check end point to be within dataset range
            end = (end >= me.totalCount) ? maxIndex : end;

            // We must wait for a slightly wider range to be cached.
            // This is to allow grouping features to peek at the two surrounding records
            // when rendering a *range* of records to see whether the start of the range
            // really is a group start and the end of the range really is a group end.
            requiredStart = start === 0 ? 0 : start - 1;
            requiredEnd = end === maxIndex ? end : end + 1;

            // Keep track of range we are being asked for so we can track direction of movement through the dataset
            me.lastRequestStart = start;

            // If data request can be satisfied from the page cache
            if (me.rangeCached(requiredStart, requiredEnd)) {
                me.onGuaranteedRange(options);
                result = me.data.getRange(start, end);
            }
            // At least some of the requested range needs loading from server
            else {
                // Private event used by the LoadMask class to perform masking when the range required for rendering is not found in the cache
                me.fireEvent('cachemiss', me, start, end);

                // Add a pageAdded listener, and as soon as the requested range is loaded, fire the guaranteedrange event
                pageAddHandler = function(page, records) {
                    if (me.rangeCached(requiredStart, requiredEnd)) {
                        // Private event used by the LoadMask class to unmask when the range required for rendering has been loaded into the cache
                        me.fireEvent('cachefilled', me, start, end);
                        me.data.un('pageAdded', pageAddHandler);
                        me.onGuaranteedRange(options);
                    }
                };
                me.data.on('pageAdded', pageAddHandler);

                // Prioritize the request for the *exact range that the UI is asking for*.
                // When a page request is in flight, it will not be requested again by checking the me.pageRequests hash,
                // so the request after this will only request the *remaining* unrequested pages .
                me.prefetchRange(start, end);

            }
            // Load the pages around the requested range required by the leadingBufferZone and trailingBufferZone.
            me.primeCache(start, end, start < lastRequestStart ? -1 : 1);
        } else {
            result = me.data.getRange(start, end);

            // Someone *may* use the callback interface to process their results even if the store is not buffered and always synchronous
            if (options.callback) {
                options.callback.call(options.scope || me, result, start, end, options)
            }
        }

        return result;
    },

    /**
     * Get the Record with the specified id.
     *
     * This method is not effected by filtering, lookup will be performed from all records
     * inside the store, filtered or not.
     *
     * @param {Mixed} id The id of the Record to find.
     * @return {Ext.data.Model} The Record with the passed id. Returns null if not found.
     */
    getById: function(id) {
        var result = (this.snapshot || this.data).findBy(function(record) {
            return record.getId() === id;
        });
        //<debug>
        if (this.buffered && !result) {
            Ext.Error.raise('getById called for ID that is not present in local cache');
        }
        //</debug>
        return result;
    },

    /**
     * Get the index of the record within the store.
     *
     * When store is filtered, records outside of filter will not be found.
     *
     * @param {Ext.data.Model} record The Ext.data.Model object to find.
     * @return {Number} The index of the passed Record. Returns -1 if not found.
     */
    indexOf: function(record) {
        return this.data.indexOf(record);
    },

    /**
     * Get the index within the entire dataset. From 0 to the totalCount.
     *
     * Like #indexOf, this method is effected by filtering.
     *
     * @param {Ext.data.Model} record The Ext.data.Model object to find.
     * @return {Number} The index of the passed Record. Returns -1 if not found.
     */
    indexOfTotal: function(record) {
        var index = record.index;
        if (index || index === 0) {
            return index;
        }
        return this.indexOf(record);
    },

    /**
     * Get the index within the store of the Record with the passed id.
     *
     * Like #indexOf, this method is effected by filtering.
     *
     * @param {String} id The id of the Record to find.
     * @return {Number} The index of the Record. Returns -1 if not found.
     */
    indexOfId: function(id) {
        return this.indexOf(this.getById(id));
    },

    /*
     * Aggregation methods
     */

    /**
     * Convenience function for getting the first model instance in the store.
     *
     * When store is filtered, will return first item within the filter.
     *
     * @param {Boolean} [grouped] True to perform the operation for each group
     * in the store. The value returned will be an object literal with the key being the group
     * name and the first record being the value. The grouped parameter is only honored if
     * the store has a groupField.
     * @return {Ext.data.Model/undefined} The first model instance in the store, or undefined
     */
    first: function(grouped) {
        var me = this;

        if (grouped && me.isGrouped()) {
            return me.aggregate(function(records) {
                return records.length ? records[0] : undefined;
            }, me, true);
        } else {
            return me.data.first();
        }
    },

    /**
     * Convenience function for getting the last model instance in the store.
     *
     * When store is filtered, will return last item within the filter.
     *
     * @param {Boolean} [grouped] True to perform the operation for each group
     * in the store. The value returned will be an object literal with the key being the group
     * name and the last record being the value. The grouped parameter is only honored if
     * the store has a groupField.
     * @return {Ext.data.Model/undefined} The last model instance in the store, or undefined
     */
    last: function(grouped) {
        var me = this;

        if (grouped && me.isGrouped()) {
            return me.aggregate(function(records) {
                var len = records.length;
                return len ? records[len - 1] : undefined;
            }, me, true);
        } else {
            return me.data.last();
        }
    },

    /**
     * Sums the value of `field` for each {@link Ext.data.Model record} in store
     * and returns the result.
     *
     * When store is filtered, only sums items within the filter.
     *
     * @param {String} field A field in each record
     * @param {Boolean} [grouped] True to perform the operation for each group
     * in the store. The value returned will be an object literal with the key being the group
     * name and the sum for that group being the value. The grouped parameter is only honored if
     * the store has a groupField.
     * @return {Number} The sum
     */
    sum: function(field, grouped) {
        var me = this;

        if (grouped && me.isGrouped()) {
            return me.aggregate(me.getSum, me, true, [field]);
        } else {
            return me.getSum(me.data.items, field);
        }
    },

    // @private, see sum
    getSum: function(records, field) {
        var total = 0,
            i = 0,
            len = records.length;

        for (; i < len; ++i) {
            total += records[i].get(field);
        }

        return total;
    },

    /**
     * Gets the count of items in the store.
     *
     * When store is filtered, only items within the filter are counted.
     *
     * @param {Boolean} [grouped] True to perform the operation for each group
     * in the store. The value returned will be an object literal with the key being the group
     * name and the count for each group being the value. The grouped parameter is only honored if
     * the store has a groupField.
     * @return {Number} the count
     */
    count: function(grouped) {
        var me = this;

        if (grouped && me.isGrouped()) {
            return me.aggregate(function(records) {
                return records.length;
            }, me, true);
        } else {
            return me.getCount();
        }
    },

    /**
     * Gets the minimum value in the store.
     *
     * When store is filtered, only items within the filter are aggregated.
     *
     * @param {String} field The field in each record
     * @param {Boolean} [grouped] True to perform the operation for each group
     * in the store. The value returned will be an object literal with the key being the group
     * name and the minimum in the group being the value. The grouped parameter is only honored if
     * the store has a groupField.
     * @return {Object} The minimum value, if no items exist, undefined.
     */
    min: function(field, grouped) {
        var me = this;

        if (grouped && me.isGrouped()) {
            return me.aggregate(me.getMin, me, true, [field]);
        } else {
            return me.getMin(me.data.items, field);
        }
    },

    // @private, see min
    getMin: function(records, field) {
        var i = 1,
            len = records.length,
            value, min;

        if (len > 0) {
            min = records[0].get(field);
        }

        for (; i < len; ++i) {
            value = records[i].get(field);
            if (value < min) {
                min = value;
            }
        }
        return min;
    },

    /**
     * Gets the maximum value in the store.
     *
     * When store is filtered, only items within the filter are aggregated.
     *
     * @param {String} field The field in each record
     * @param {Boolean} [grouped] True to perform the operation for each group
     * in the store. The value returned will be an object literal with the key being the group
     * name and the maximum in the group being the value. The grouped parameter is only honored if
     * the store has a groupField.
     * @return {Object} The maximum value, if no items exist, undefined.
     */
    max: function(field, grouped) {
        var me = this;

        if (grouped && me.isGrouped()) {
            return me.aggregate(me.getMax, me, true, [field]);
        } else {
            return me.getMax(me.data.items, field);
        }
    },

    // @private, see max
    getMax: function(records, field) {
        var i = 1,
            len = records.length,
            value,
            max;

        if (len > 0) {
            max = records[0].get(field);
        }

        for (; i < len; ++i) {
            value = records[i].get(field);
            if (value > max) {
                max = value;
            }
        }
        return max;
    },

    /**
     * Gets the average value in the store.
     *
     * When store is filtered, only items within the filter are aggregated.
     *
     * @param {String} field The field in each record
     * @param {Boolean} [grouped] True to perform the operation for each group
     * in the store. The value returned will be an object literal with the key being the group
     * name and the group average being the value. The grouped parameter is only honored if
     * the store has a groupField.
     * @return {Object} The average value, if no items exist, 0.
     */
    average: function(field, grouped) {
        var me = this;
        if (grouped && me.isGrouped()) {
            return me.aggregate(me.getAverage, me, true, [field]);
        } else {
            return me.getAverage(me.data.items, field);
        }
    },

    // @private, see average
    getAverage: function(records, field) {
        var i = 0,
            len = records.length,
            sum = 0;

        if (records.length > 0) {
            for (; i < len; ++i) {
                sum += records[i].get(field);
            }
            return sum / len;
        }
        return 0;
    },

    /**
     * Runs the aggregate function for all the records in the store.
     *
     * When store is filtered, only items within the filter are aggregated.
     *
     * @param {Function} fn The function to execute. The function is called with a single parameter,
     * an array of records for that group.
     * @param {Object} [scope] The scope to execute the function in. Defaults to the store.
     * @param {Boolean} [grouped] True to perform the operation for each group
     * in the store. The value returned will be an object literal with the key being the group
     * name and the group average being the value. The grouped parameter is only honored if
     * the store has a groupField.
     * @param {Array} [args] Any arguments to append to the function call
     * @return {Object} An object literal with the group names and their appropriate values.
     */
    aggregate: function(fn, scope, grouped, args) {
        args = args || [];
        if (grouped && this.isGrouped()) {
            var groups = this.getGroups(),
                len = groups.length,
                out = {},
                group, i;

            for (i = 0; i < len; ++i) {
                group = groups[i];
                out[group.name] = this.getAggregate(fn, scope || this, group.children, args);
            }
            return out;
        } else {
            return this.getAggregate(fn, scope, this.data.items, args);
        }
    },

    getAggregate: function(fn, scope, records, args){
        args = args || [];
        return fn.apply(scope || this, [records].concat(args));
    },

    onIdChanged: function(rec, oldId, newId, oldInternalId){
        var snapshot = this.snapshot;
        if (snapshot) {
            snapshot.updateKey(oldInternalId, newId);
        }
        this.data.updateKey(oldInternalId, newId);
        this.callParent(arguments);
    },

    /**
     * Commits all Records with {@link #getModifiedRecords outstanding changes}. To handle updates for changes,
     * subscribe to the Store's {@link #event-update update event}, and perform updating when the third parameter is
     * Ext.data.Record.COMMIT.
     */
    commitChanges : function(){
        var me = this,
            recs = me.getModifiedRecords(),
            len = recs.length,
            i = 0;

        for (; i < len; i++){
            recs[i].commit();
        }

        // Since removals are cached in a simple array we can simply reset it here.
        // Adds and updates are managed in the data MixedCollection and should already be current.
        me.removed.length = 0;
    },

    filterNewOnly: function(item){
        return item.phantom === true;
    },

    // Ideally in the future this will use getModifiedRecords, where there will be a param
    // to getNewRecords & getUpdatedRecords to indicate whether to get only the valid
    // records or grab all of them
    getRejectRecords: function() {
        // Return phantom records + updated records
        return Ext.Array.push(this.data.filterBy(this.filterNewOnly).items, this.getUpdatedRecords());
    },

    /**
     * {@link Ext.data.Model#reject Rejects} outstanding changes on all {@link #getModifiedRecords modified records}
     * and re-insert any records that were removed locally. Any phantom records will be removed.
     */
    rejectChanges : function() {
        var me = this,
            recs = me.getRejectRecords(),
            len = recs.length,
            i = 0,
            rec;

        for (; i < len; i++) {
            rec = recs[i];
            rec.reject();
            if (rec.phantom) {
                me.remove(rec);
            }
        }

        // Restore removed records back to their original positions
        recs = me.removed;
        len = recs.length;
        for (i = 0; i < len; i++) {
            rec = recs[i];
            me.insert(rec.removedFrom || 0, rec);
            rec.reject();
        }

        // Since removals are cached in a simple array we can simply reset it here.
        // Adds and updates are managed in the data MixedCollection and should already be current.
        me.removed.length = 0;
    }
}, function() {
    // A dummy empty store with a fieldless Model defined in it.
    // Just for binding to Views which are instantiated with no Store defined.
    // They will be able to run and render fine, and be bound to a generated Store later.
    Ext.regStore('ext-empty-store', {fields: [], proxy: 'memory'});
});