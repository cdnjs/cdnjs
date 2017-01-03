// @tag class
/**
 * @class Ext.Loader
 *
 * Ext.Loader is the heart of the new dynamic dependency loading capability in Ext JS 4+. It is most commonly used
 * via the {@link Ext#require} shorthand. Ext.Loader supports both asynchronous and synchronous loading
 * approaches, and leverage their advantages for the best development flow. We'll discuss about the pros and cons of each approach:
 *
 * # Asynchronous Loading #
 *
 * - Advantages:
 *     + Cross-domain
 *     + No web server needed: you can run the application via the file system protocol (i.e: `file://path/to/your/index
 *  .html`)
 *     + Best possible debugging experience: error messages come with the exact file name and line number
 *
 * - Disadvantages:
 *     + Dependencies need to be specified before-hand
 *
 * ### Method 1: Explicitly include what you need: ###
 *
 *     // Syntax
 *     Ext.require({String/Array} expressions);
 *
 *     // Example: Single alias
 *     Ext.require('widget.window');
 *
 *     // Example: Single class name
 *     Ext.require('Ext.window.Window');
 *
 *     // Example: Multiple aliases / class names mix
 *     Ext.require(['widget.window', 'layout.border', 'Ext.data.Connection']);
 *
 *     // Wildcards
 *     Ext.require(['widget.*', 'layout.*', 'Ext.data.*']);
 *
 * ### Method 2: Explicitly exclude what you don't need: ###
 *
 *     // Syntax: Note that it must be in this chaining format.
 *     Ext.exclude({String/Array} expressions)
 *        .require({String/Array} expressions);
 *
 *     // Include everything except Ext.data.*
 *     Ext.exclude('Ext.data.*').require('*');
 *
 *     // Include all widgets except widget.checkbox*,
 *     // which will match widget.checkbox, widget.checkboxfield, widget.checkboxgroup, etc.
 *     Ext.exclude('widget.checkbox*').require('widget.*');
 *
 * # Synchronous Loading on Demand #
 *
 * - Advantages:
 *     + There's no need to specify dependencies before-hand, which is always the convenience of including ext-all.js
 *  before
 *
 * - Disadvantages:
 *     + Not as good debugging experience since file name won't be shown (except in Firebug at the moment)
 *     + Must be from the same domain due to XHR restriction
 *     + Need a web server, same reason as above
 *
 * There's one simple rule to follow: Instantiate everything with Ext.create instead of the `new` keyword
 *
 *     Ext.create('widget.window', { ... }); // Instead of new Ext.window.Window({...});
 *
 *     Ext.create('Ext.window.Window', {}); // Same as above, using full class name instead of alias
 *
 *     Ext.widget('window', {}); // Same as above, all you need is the traditional `xtype`
 *
 * Behind the scene, {@link Ext.ClassManager} will automatically check whether the given class name / alias has already
 *  existed on the page. If it's not, Ext.Loader will immediately switch itself to synchronous mode and automatic load the given
 *  class and all its dependencies.
 *
 * # Hybrid Loading - The Best of Both Worlds #
 *
 * It has all the advantages combined from asynchronous and synchronous loading. The development flow is simple:
 *
 * ### Step 1: Start writing your application using synchronous approach.
 *
 * Ext.Loader will automatically fetch all dependencies on demand as they're needed during run-time. For example:
 *
 *     Ext.onReady(function(){
 *         var window = Ext.widget('window', {
 *             width: 500,
 *             height: 300,
 *             layout: {
 *                 type: 'border',
 *                 padding: 5
 *             },
 *             title: 'Hello Dialog',
 *             items: [{
 *                 title: 'Navigation',
 *                 collapsible: true,
 *                 region: 'west',
 *                 width: 200,
 *                 html: 'Hello',
 *                 split: true
 *             }, {
 *                 title: 'TabPanel',
 *                 region: 'center'
 *             }]
 *         });
 *
 *         window.show();
 *     })
 *
 * ### Step 2: Along the way, when you need better debugging ability, watch the console for warnings like these: ###
 *
 *     [Ext.Loader] Synchronously loading 'Ext.window.Window'; consider adding Ext.require('Ext.window.Window') before your application's code
 *     ClassManager.js:432
 *     [Ext.Loader] Synchronously loading 'Ext.layout.container.Border'; consider adding Ext.require('Ext.layout.container.Border') before your application's code
 *
 * Simply copy and paste the suggested code above `Ext.onReady`, i.e:
 *
 *     Ext.require('Ext.window.Window');
 *     Ext.require('Ext.layout.container.Border');
 *
 *     Ext.onReady(...);
 *
 * Everything should now load via asynchronous mode.
 *
 * # Deployment #
 *
 * It's important to note that dynamic loading should only be used during development on your local machines.
 * During production, all dependencies should be combined into one single JavaScript file. Ext.Loader makes
 * the whole process of transitioning from / to between development / maintenance and production as easy as
 * possible. Internally {@link Ext.Loader#history Ext.Loader.history} maintains the list of all dependencies your application
 * needs in the exact loading sequence. It's as simple as concatenating all files in this array into one,
 * then include it on top of your application.
 *
 * This process will be automated with Sencha Command, to be released and documented towards Ext JS 4 Final.
 *
 * @singleton
 */
Ext.Loader = new function() {
// @define Ext.Loader
// @require Ext.Boot
// @require Ext.Class
// @require Ext.ClassManager
// @require Ext.Function
// @require Ext.Array
// @require Ext.env.Ready

    var Loader = this,
        Manager = Ext.ClassManager, // this is an instance of Ext.Inventory
        Boot = Ext.Boot,
        Class = Ext.Class,
        Ready = Ext.env.Ready,
        alias = Ext.Function.alias,
        dependencyProperties = ['extend', 'mixins', 'requires'],
        isInHistory = {},
        history = [],
        readyListeners = [],
        usedClasses = [],
        _requiresMap = {},
        _missingQueue = {},
        _config = {
            /**
             * @cfg {Boolean} [enabled=true]
             * Whether or not to enable the dynamic dependency loading feature.
             */
            enabled: true,

            /**
             * @cfg {Boolean} [scriptChainDelay=false]
             * millisecond delay between asynchronous script injection (prevents stack
             * overflow on some user agents) 'false' disables delay but potentially
             * increases stack load.
             */
            scriptChainDelay: false,

            /**
             * @cfg {Boolean} [disableCaching=true]
             * Appends current timestamp to script files to prevent caching.
             */
            disableCaching: true,

            /**
             * @cfg {String} [disableCachingParam="_dc"]
             * The get parameter name for the cache buster's timestamp.
             */
            disableCachingParam: '_dc',

            /**
             * @cfg {Object} paths
             * The mapping from namespaces to file paths
             *
             *     {
             *         'Ext': '.', // This is set by default, Ext.layout.container.Container will be
             *                     // loaded from ./layout/Container.js
             *
             *         'My': './src/my_own_folder' // My.layout.Container will be loaded from
             *                                     // ./src/my_own_folder/layout/Container.js
             *     }
             *
             * Note that all relative paths are relative to the current HTML document.
             * If not being specified, for example, `Other.awesome.Class` will simply be
             * loaded from `"./Other/awesome/Class.js"`.
             */
            paths: Manager.paths,

            /**
             * @cfg {Boolean} preserveScripts
             * `false` to remove asynchronously loaded scripts, `true` to retain script
             * element for browser debugger compatibility and improved load performance.
             */
            preserveScripts: true,

            /**
             * @cfg {String} scriptCharset
             * Optional charset to specify encoding of dynamic script content.
             */
            scriptCharset: undefined
        },
        // These configs are delegated to Ext.Script and may need different names:
        delegatedConfigs = {
            disableCaching: true,
            disableCachingParam: true,
            preserveScripts: true,
            scriptChainDelay: 'loadDelay'
        };

    Ext.apply(Loader, {
        /**
         * @private
         */
        isInHistory: isInHistory,

        /**
         * Flag indicating whether there are still files being loaded
         * @private
         */
        isLoading: false,

        /**
         * An array of class names to keep track of the dependency loading order.
         * This is not guaranteed to be the same everytime due to the asynchronous
         * nature of the Loader.
         *
         * @property {Array} history
         */
        history: history,

        /**
         * Configuration
         * @private
         */
        config: _config,

        /**
         * Maintain the list of listeners to execute when all required scripts are fully loaded
         * @private
         */
        readyListeners: readyListeners,

        /**
         * Contains classes referenced in `uses` properties.
         * @private
         */
        optionalRequires: usedClasses,

        /**
         * Map of fully qualified class names to an array of dependent classes.
         * @private
         */
        requiresMap: _requiresMap,

        /** @private */
        hasFileLoadError: false,

        /**
         * The number of scripts loading via loadScript.
         * @private
         */
        scriptsLoading: 0,

        //<debug>
        /**
         * @private
         */
        classesLoading: [],
        //</debug>

        /**
         * @private
         */
        syncModeEnabled: false,

        
        /**
         * @private
         */
        missingQueue: _missingQueue,
        
        init: function () {
            // initalize the default path of the framework
            var scripts = document.getElementsByTagName('script'),
                src = scripts[scripts.length - 1].src,
                path = src.substring(0, src.lastIndexOf('/') + 1),
                meta = Ext._classPathMetadata,
                microloader = Ext.Microloader,
                manifest = Ext.manifest,
                loadOrder, baseUrl, loadlen, l, loadItem;

            //<debug>
            if (src.indexOf("packages/sencha-core/src/") !== -1) {
                path = path + "../../";
            } else if (src.indexOf("/core/src/class/") !== -1) {
                path = path + "../../../";
            }
            //</debug>

            
            if(!Manager.getPath("Ext")) {
                Manager.setPath('Ext', path + 'src');
            }

            // Pull in Cmd generated metadata if available.
            if (meta) {
                Ext._classPathMetadata = null;
                Loader.addClassPathMappings(meta);
            }
            
            if(manifest) {
                loadOrder = manifest.loadOrder;
                // if the manifest paths were calculated as relative to the 
                // bootstrap file, then we need to prepend Boot.baseUrl to the
                // paths before processing
                baseUrl = Ext.Boot.baseUrl;
                if(loadOrder && manifest.bootRelative) {
                    for(loadlen = loadOrder.length, l = 0; l < loadlen; l++) {
                        loadItem = loadOrder[l];
                        loadItem.path = baseUrl + loadItem.path;
                    }                    
                }
            }
            
            if(microloader) {
                Ready.block();
                microloader.onMicroloaderReady(function(){
                    Ready.unblock();
                });
            }
        },

        /**
         * Set the configuration for the loader. This should be called right after ext-(debug).js
         * is included in the page, and before Ext.onReady. i.e:
         *
         *     <script type="text/javascript" src="ext-core-debug.js"></script>
         *     <script type="text/javascript">
         *         Ext.Loader.setConfig({
         *           enabled: true,
         *           paths: {
         *               'My': 'my_own_path'
         *           }
         *         });
         *     </script>
         *     <script type="text/javascript">
         *         Ext.require(...);
         *
         *         Ext.onReady(function() {
         *           // application code here
         *         });
         *     </script>
         *
         * Refer to config options of {@link Ext.Loader} for the list of possible properties
         *
         * @param {Object} config The config object to override the default values
         * @return {Ext.Loader} this
         */
        setConfig: Ext.Function.flexSetter(function (name, value) {
            if (name === 'paths') {
                Loader.setPath(value);
            } else {
                _config[name] = value;

                var delegated = delegatedConfigs[name];
                if (delegated) {
                    Boot.setConfig((delegated === true) ? name : delegated, value);
                }
            }

            return Loader;
        }),

        /**
         * Get the config value corresponding to the specified name. If no name is given, will return the config object
         * @param {String} name The config property name
         * @return {Object}
         */
        getConfig: function(name) {
            return name ? _config[name] : _config;
        },

        /**
         * Sets the path of a namespace.
         * For Example:
         *
         *     Ext.Loader.setPath('Ext', '.');
         *
         * @param {String/Object} name See {@link Ext.Function#flexSetter flexSetter}
         * @param {String} [path] See {@link Ext.Function#flexSetter flexSetter}
         * @return {Ext.Loader} this
         * @method
         */
        setPath: function () {
            // Paths are an Ext.Inventory thing and ClassManager is an instance of that:
            Manager.setPath.apply(Manager, arguments);
            return Loader;
        },

        /**
         * Sets a batch of path entries
         *
         * @param {Object } paths a set of className: path mappings
         * @return {Ext.Loader} this
         */
        addClassPathMappings: function(paths) {
            // Paths are an Ext.Inventory thing and ClassManager is an instance of that:
            Manager.setPath(paths);
            return Loader;
        },

        /**
         * fixes up loader path configs by prepending Ext.Boot#baseUrl to the beginning
         * of the path, then delegates to Ext.Loader#addClassPathMappings
         * @param pathConfig
         */

        addBaseUrlClassPathMappings: function(pathConfig) {
            for(var name in pathConfig) {
                pathConfig[name] = Boot.baseUrl + pathConfig[name];
            }
            Ext.Loader.addClassPathMappings(pathConfig);
        },


        /**
         * Translates a className to a file path by adding the
         * the proper prefix and converting the .'s to /'s. For example:
         *
         *     Ext.Loader.setPath('My', '/path/to/My');
         *
         *     alert(Ext.Loader.getPath('My.awesome.Class')); // alerts '/path/to/My/awesome/Class.js'
         *
         * Note that the deeper namespace levels, if explicitly set, are always resolved first. For example:
         *
         *     Ext.Loader.setPath({
         *         'My': '/path/to/lib',
         *         'My.awesome': '/other/path/for/awesome/stuff',
         *         'My.awesome.more': '/more/awesome/path'
         *     });
         *
         *     alert(Ext.Loader.getPath('My.awesome.Class')); // alerts '/other/path/for/awesome/stuff/Class.js'
         *
         *     alert(Ext.Loader.getPath('My.awesome.more.Class')); // alerts '/more/awesome/path/Class.js'
         *
         *     alert(Ext.Loader.getPath('My.cool.Class')); // alerts '/path/to/lib/cool/Class.js'
         *
         *     alert(Ext.Loader.getPath('Unknown.strange.Stuff')); // alerts 'Unknown/strange/Stuff.js'
         *
         * @param {String} className
         * @return {String} path
         */
        getPath: function(className) {
            // Paths are an Ext.Inventory thing and ClassManager is an instance of that:
            return Manager.getPath(className);
        },

        require: function (expressions, fn, scope, excludes) {
            if (excludes) {
                return Loader.exclude(excludes).require(expressions, fn, scope);
            }

            var classNames = Manager.getNamesByExpression(expressions);

            return Loader.load(classNames, fn, scope);
        },

        syncRequire: function () {
            var wasEnabled = Loader.syncModeEnabled;

            Loader.syncModeEnabled = true;

            var ret = Loader.require.apply(Loader, arguments);

            Loader.syncModeEnabled = wasEnabled;

            return ret;
        },

        exclude: function (excludes) {
            var selector = Manager.select({
                    require: function (classNames, fn, scope) {
                        return Loader.load(classNames, fn, scope);
                    },

                    syncRequire: function (classNames, fn, scope) {
                        var wasEnabled = Loader.syncModeEnabled;

                        Loader.syncModeEnabled = true;

                        var ret = Loader.load(classNames, fn, scope);

                        Loader.syncModeEnabled = wasEnabled;

                        return ret;
                    }
                });

            selector.exclude(excludes);
            return selector;
        },

        load: function (classNames, callback, scope) {
            if (callback) {
                if (callback.length) {
                    // If callback expects arguments, shim it with a function that will map
                    // the requires class(es) from the names we are given.
                    callback = Loader.makeLoadCallback(classNames, callback);
                }
                callback = callback.bind(scope || Ext.global);
            }

            var missingClassNames = [],
                numClasses = classNames.length,
                className, i, numMissing, urls = [],
                state = Manager.classState;
            
            for (i = 0; i < numClasses; ++i) {
                className = Manager.resolveName(classNames[i]);
                if (!Manager.isCreated(className)) {
                    missingClassNames.push(className);
                    _missingQueue[className] = Loader.getPath(className);
                    if(!state[className]) {
                        urls.push(_missingQueue[className]);
                    }
                }
            }

            // If the dynamic dependency feature is not being used, throw an error
            // if the dependencies are not defined
            numMissing = missingClassNames.length;
            if (numMissing) {
                Loader.missingCount += numMissing;
                //<debug>
                Ext.Array.push(Loader.classesLoading, missingClassNames);
                //</debug>

                // We may have come through a requirement triggered via
                // an async load, so we need this to prevent going back
                // through a sync load of the file we just async loaded.
                // This is because the onLoad of the script element has
                // yet to fire.
                // TODO: for non IE9m browsers, Boot.js should switch
                // to async ajax of content and then globalEval once
                // content has arrived
                Ext.each(missingClassNames, function(name, index) {
                    Manager.onExists(function() {
                        var key = Ext.Boot.canonicalUrl(urls[index]),
                            entry = Ext.Boot.scripts[key];
                        if (entry && !entry.done) {
                            Ext.Boot.notifyAll(entry);
                        }
                    }, Loader, name);
                });

                // We check for existence here (onExists vs onCreated) because overrides
                // can come into existence but pause before being created until the target
                // of the override has been created, which may not happen. For normal
                // classes, this timing of this will be equivalent to onCreated.
                Manager.onExists(function () {
                    //<debug>
                    Ext.Array.remove(Loader.classesLoading, missingClassNames);
                    Ext.each(missingClassNames, function(name){
                        Ext.Array.remove(Loader.classesLoading, name);
                    });
                    //</debug>
                    if (callback) {
                        Ext.callback(callback, scope, arguments);
                    }
                    Loader.checkReady();
                }, Loader, missingClassNames);

                if (!_config.enabled) {
                    Ext.Error.raise("Ext.Loader is not enabled, so dependencies cannot be resolved dynamically. " +
                             "Missing required class" + ((missingClassNames.length > 1) ? "es" : "") + 
                             ": " + missingClassNames.join(', '));
                }

                if(urls.length) {
                    Loader.loadScripts({
                        url: urls,
                        // scope: this options object so we can pass these along:
                        _classNames: missingClassNames
                    });
                } else {
                    // need to call checkReady here, as the _missingCoun
                    // may have transitioned from 0 to > 0, meaning we
                    // need to block ready
                    Loader.checkReady();
                }
            } else {
                if (callback) {
                    callback.call(scope);
                }
                // need to call checkReady here, as the _missingCoun
                // may have transitioned from 0 to > 0, meaning we
                // need to block ready
                Loader.checkReady();
            }
            
            if (Loader.syncModeEnabled) {
                // Class may have been just loaded or was already loaded
                if (numClasses === 1) {
                    return Manager.get(classNames[0]);
                }
            }

            return Loader;
        },

        makeLoadCallback: function (classNames, callback) {
            return function () {
                var classes = [],
                    i = classNames.length;

                while (i-- > 0) {
                    classes[i] = Manager.get(classNames[i]);
                }

                return callback.apply(this, classes);
            }
        },
        
        onLoadFailure: function () {
            var options = this,
                onError = options.onError;

            Loader.hasFileLoadError = true;
            --Loader.scriptsLoading;

            if (onError) {
                //TODO: need an adapter to convert to v4 onError signatures
                onError.call(options.userScope, options);
            }
            //<debug>
            else {
                Ext.Error.raise("[Ext.Loader] Some requested files failed to load.");
            }
            //</debug>

            Loader.checkReady();
        },

        onLoadSuccess: function () {
            var options = this,
                onLoad = options.onLoad;

            --Loader.scriptsLoading;
            if (onLoad) {
                //TODO: need an adapter to convert to v4 onLoad signatures
                onLoad.call(options.userScope, options);
                // onLoad can cause more loads to start, so it must run first
            }

            Loader.checkReady();
        },

// TODO: this timing of this needs to be deferred until all classes have had a chance to be created
        //<debug>
        reportMissingClasses: function () {
            if (!Loader.syncModeEnabled && !Loader.scriptsLoading && Loader.isLoading &&
                    !Loader.hasFileLoadError) {
                var missingClasses = [],
                    missingPaths = [];

                for (var missingClassName in _missingQueue) {
                    missingClasses.push(missingClassName);
                    missingPaths.push(_missingQueue[missingClassName]);
                }

                if (missingClasses.length) {
                    throw new Error("The following classes are not declared even if their files have been " +
                        "loaded: '" + missingClasses.join("', '") + "'. Please check the source code of their " +
                        "corresponding files for possible typos: '" + missingPaths.join("', '"));
                }
            }
        },
        //</debug>

        /**
         * Add a new listener to be executed when all required scripts are fully loaded
         *
         * @param {Function} fn The function callback to be executed
         * @param {Object} scope The execution scope (`this`) of the callback function.
         * @param {Boolean} [withDomReady=true] Pass `false` to not also wait for document
         * dom ready.
         * @param {Object} [options] Additional callback options.
         * @param {Number} [options.delay=0] A number of milliseconds to delay.
         * @param {Number} [options.priority=0] Relative priority of this callback. Negative
         * numbers are reserved.
         */
        onReady: function(fn, scope, withDomReady, options) {
            if (withDomReady) {
                Ready.on(fn, scope, options);
            } else {
                var listener = Ready.makeListener(fn, scope, options);

                if (Loader.isLoading) {
                    readyListeners.push(listener);
                } else {
                    Ready.invoke(listener);
                }
            }
        },

        /**
         * @private
         * Ensure that any classes referenced in the `uses` property are loaded.
         */
        addUsedClasses: function (classes) {
            var cls, i, ln;

            if (classes) {
                classes = (typeof classes === 'string') ? [classes] : classes;
                for (i = 0, ln = classes.length; i < ln; i++) {
                    cls = classes[i];
                    if (typeof cls === 'string' && !Ext.Array.contains(usedClasses, cls)) {
                        usedClasses.push(cls);
                    }
                }
            }

            return Loader;
        },

        /**
         * @private
         */
        triggerReady: function() {
            var listener,
                refClasses = usedClasses;

            if (Loader.isLoading && refClasses.length) {
                // Empty the array to eliminate potential recursive loop issue
                usedClasses = [];

                // this may immediately call us back if all 'uses' classes
                // have been loaded
                Loader.require(refClasses);
            } else {
                // Must clear this before calling callbacks. This will cause any new loads
                // to call Ready.block() again. See below for more on this.
                Loader.isLoading = false;

                // These listeners are just those attached directly to Loader to wait for
                // class loading only.
                readyListeners.sort(Ready.sortFn);

                // this method can be called with Loader.isLoading either true or false
                // (can be called with false when all 'uses' classes are already loaded)
                // this may bypass the above if condition
                while (readyListeners.length && !Loader.isLoading) {
                    // we may re-enter triggerReady so we cannot necessarily iterate the
                    // readyListeners array
                    listener = readyListeners.pop();
                    Ready.invoke(listener);
                }

                // If the DOM is also ready, this will fire the normal onReady listeners.
                // An astute observer would note that we may now be back to isLoading and
                // so ask "Why you call unblock?". The reason is that we must match the
                // calls to block and since we transitioned from isLoading to !isLoading
                // here we must call unblock. If we have transitioned back to isLoading in
                // the above loop it will have called block again so the counter will be
                // increased and this call will not reduce the block count to 0. This is
                // done by loadScripts.
                Ready.unblock();
            }
        },

        /**
         * @private
         * @param {String} className
         */
        historyPush: function(className) {
            if (className && !isInHistory[className]) {
                isInHistory[className] = true;
                history.push(className);
            }
            return Loader;
        },

        /**
         * This is an internal method that delegate content loading to the 
         * bootstrap layer.
         * @private
         * @param params
         */
        loadScripts: function(params) {
            var manifest = Ext.manifest,
                loadOrder = manifest && manifest.loadOrder,
                loadOrderMap = manifest && manifest.loadOrderMap,
                options;
            
            ++Loader.scriptsLoading;
            
            // if the load order map hasn't been created, create it now 
            // and cache on the manifest
            if (loadOrder && !loadOrderMap) {
                manifest.loadOrderMap = loadOrderMap = Boot.createLoadOrderMap(loadOrder);
            }

            // verify the loading state, as this may have transitioned us from
            // not loading to loading
            Loader.checkReady();

            options = Ext.apply({
                loadOrder: loadOrder,
                loadOrderMap: loadOrderMap,
                charset: _config.scriptCharset,
                success: Loader.onLoadSuccess,
                failure: Loader.onLoadFailure,
                sync: Loader.syncModeEnabled,
                _classNames: []
            }, params);

            options.userScope = options.scope;
            options.scope = options;

            Boot.load(options);
        },

        /**
         * This method is provide for use by the bootstrap layer.
         * @private
         * @param {String[]} urls
         */
        loadScriptsSync: function(urls) {
            var syncwas = Loader.syncModeEnabled;
            Loader.syncModeEnabled = true;
            Loader.loadScripts({url: urls});
            Loader.syncModeEnabled = syncwas;
        },

        /**
         * This method is provide for use by the bootstrap layer.
         * @private
         * @param {String[]} urls
         */
        loadScriptsSyncBasePrefix: function(urls) {
            var syncwas = Loader.syncModeEnabled;
            Loader.syncModeEnabled = true;
            Loader.loadScripts({url: urls, prependBaseUrl: true});
            Loader.syncModeEnabled = syncwas;
        },
        
        /**
         * Loads the specified script URL and calls the supplied callbacks. If this method
         * is called before {@link Ext#isReady}, the script's load will delay the transition
         * to ready. This can be used to load arbitrary scripts that may contain further
         * {@link Ext#require Ext.require} calls.
         *
         * @param {Object/String/String[]} options The options object or simply the URL(s) to load.
         * @param {String} options.url The URL from which to load the script.
         * @param {Function} [options.onLoad] The callback to call on successful load.
         * @param {Function} [options.onError] The callback to call on failure to load.
         * @param {Object} [options.scope] The scope (`this`) for the supplied callbacks.
         */
        loadScript: function(options) {
            var isString = typeof options === 'string',
                isArray = options instanceof Array,
                isObject = !isArray && !isString,
                url = isObject ? options.url : options,
                onError = isObject && options.onError,
                onLoad = isObject && options.onLoad,
                scope = isObject && options.scope,
                request = {
                    url: url,
                    scope: scope,
                    onLoad: onLoad,
                    onError: onError,
                    _classNames: []
                };

            Loader.loadScripts(request);
        },

        /**
         * @private
         */
        flushMissingQueue: function() {
            var name, val, missingwas = 0, missing = 0;
            
            for(name in _missingQueue) {
                missingwas++;
                val = _missingQueue[name];
                if(Manager.isCreated(name)) {
                    delete _missingQueue[name];
                } else if (Manager.existCache[name] === 2) {
                    delete _missingQueue[name];
                } else {
                    ++missing;
                }
            }
            this.missingCount = missing;
        },

        /**
         * @private
         */
        checkReady: function() {
            var wasLoading = Loader.isLoading,
                isLoading;

            Loader.flushMissingQueue();
            isLoading = Loader.missingCount + Loader.scriptsLoading;
            
            if(isLoading && !wasLoading) {
                Ready.block();
                Loader.isLoading = !!isLoading;
            } else if (!isLoading && wasLoading) {
                Loader.triggerReady();
            }
        }
    });

    /**
     * Loads all classes by the given names and all their direct dependencies; optionally
     * executes the given callback function when finishes, within the optional scope.
     *
     * @param {String/String[]} expressions The class, classes or wildcards to load.
     * @param {Function} [fn] The callback function.
     * @param {Object} [scope] The execution scope (`this`) of the callback function.
     * @member Ext
     * @method require
     */
    Ext.require = alias(Loader, 'require');

    /**
     * Synchronously loads all classes by the given names and all their direct dependencies; optionally
     * executes the given callback function when finishes, within the optional scope.
     *
     * @param {String/String[]} expressions The class, classes or wildcards to load.
     * @param {Function} [fn] The callback function.
     * @param {Object} [scope] The execution scope (`this`) of the callback function.
     * @member Ext
     * @method syncRequire
     */
    Ext.syncRequire = alias(Loader, 'syncRequire');

    /**
     * Explicitly exclude files from being loaded. Useful when used in conjunction with a
     * broad include expression. Can be chained with more `require` and `exclude` methods,
     * for example:
     *
     *     Ext.exclude('Ext.data.*').require('*');
     *
     *     Ext.exclude('widget.button*').require('widget.*');
     *
     * @param {String/String[]} excludes
     * @return {Object} Contains `exclude`, `require` and `syncRequire` methods for chaining.
     * @member Ext
     * @method exclude
     */
    Ext.exclude = alias(Loader, 'exclude');

//<feature classSystem.loader>
    /**
     * @cfg {String[]} requires
     * @member Ext.Class
     * List of classes that have to be loaded before instantiating this class.
     * For example:
     *
     *     Ext.define('Mother', {
     *         requires: ['Child'],
     *         giveBirth: function() {
     *             // we can be sure that child class is available.
     *             return new Child();
     *         }
     *     });
     */
    Class.registerPreprocessor('loader', function(cls, data, hooks, continueFn) {
        //<debug>
        Ext.classSystemMonitor && Ext.classSystemMonitor(cls, 'Ext.Loader#loaderPreprocessor', arguments);
        //</debug>
        
        var me = this,
            dependencies = [],
            dependency,
            className = Manager.getName(cls),
            i, j, ln, subLn, value, propertyName, propertyValue,
            requiredMap;

        /*
        Loop through the dependencyProperties, look for string class names and push
        them into a stack, regardless of whether the property's value is a string, array or object. For example:
        {
              extend: 'Ext.MyClass',
              requires: ['Ext.some.OtherClass'],
              mixins: {
                  thing: 'Foo.bar.Thing';
              }
        }
        which will later be transformed into:
        {
              extend: Ext.MyClass,
              requires: [Ext.some.OtherClass],
              mixins: {
                  thing: Foo.bar.Thing;
              }
        }
        */

        for (i = 0,ln = dependencyProperties.length; i < ln; i++) {
            propertyName = dependencyProperties[i];

            if (data.hasOwnProperty(propertyName)) {
                propertyValue = data[propertyName];

                if (typeof propertyValue == 'string') {
                    dependencies.push(propertyValue);
                }
                else if (propertyValue instanceof Array) {
                    for (j = 0, subLn = propertyValue.length; j < subLn; j++) {
                        value = propertyValue[j];

                        if (typeof value == 'string') {
                            dependencies.push(value);
                        }
                    }
                }
                else if (typeof propertyValue != 'function') {
                    for (j in propertyValue) {
                        if (propertyValue.hasOwnProperty(j)) {
                            value = propertyValue[j];

                            if (typeof value == 'string') {
                                dependencies.push(value);
                            }
                        }
                    }
                }
            }
        }

        if (dependencies.length === 0) {
            return;
        }
        if (className) {
            _requiresMap[className] = dependencies;
        }

        //<debug>
        var deadlockPath = [],
            detectDeadlock;

        /*
        Automatically detect deadlocks before-hand,
        will throw an error with detailed path for ease of debugging. Examples of deadlock cases:

        - A extends B, then B extends A
        - A requires B, B requires C, then C requires A

        The detectDeadlock function will recursively transverse till the leaf, hence it can detect deadlocks
        no matter how deep the path is.
        */

        if (className) {
            requiredMap = Loader.requiredByMap || (Loader.requiredByMap = {});

            for (i = 0,ln = dependencies.length; i < ln; i++) {
                dependency = dependencies[i];
                (requiredMap[dependency] || (requiredMap[dependency] = [])).push(className);
            }

            detectDeadlock = function(cls) {
                deadlockPath.push(cls);

                if (_requiresMap[cls]) {
                    if (Ext.Array.contains(_requiresMap[cls], className)) {
                        Ext.Error.raise("Circular requirement detected! '" + className +
                                "' and '" + deadlockPath[1] + "' mutually require each other. Path: " +
                                deadlockPath.join(' -> ') + " -> " + deadlockPath[0]);
                    }

                    for (i = 0,ln = _requiresMap[cls].length; i < ln; i++) {
                        detectDeadlock(_requiresMap[cls][i]);
                    }
                }
            };

            detectDeadlock(className);
        }

        //</debug>

        (className ? Loader.exclude(className) : Loader).require(dependencies, function() {
            for (i = 0,ln = dependencyProperties.length; i < ln; i++) {
                propertyName = dependencyProperties[i];

                if (data.hasOwnProperty(propertyName)) {
                    propertyValue = data[propertyName];

                    if (typeof propertyValue == 'string') {
                        data[propertyName] = Manager.get(propertyValue);
                    }
                    else if (propertyValue instanceof Array) {
                        for (j = 0, subLn = propertyValue.length; j < subLn; j++) {
                            value = propertyValue[j];

                            if (typeof value == 'string') {
                                data[propertyName][j] = Manager.get(value);
                            }
                        }
                    }
                    else if (typeof propertyValue != 'function') {
                        for (var k in propertyValue) {
                            if (propertyValue.hasOwnProperty(k)) {
                                value = propertyValue[k];

                                if (typeof value == 'string') {
                                    data[propertyName][k] = Manager.get(value);
                                }
                            }
                        }
                    }
                }
            }

            continueFn.call(me, cls, data, hooks);
        });

        return false;
    }, true, 'after', 'className');

    /**
     * @cfg {String[]} uses
     * @member Ext.Class
     * List of optional classes to load together with this class. These aren't neccessarily loaded before
     * this class is created, but are guaranteed to be available before Ext.onReady listeners are
     * invoked. For example:
     *
     *     Ext.define('Mother', {
     *         uses: ['Child'],
     *         giveBirth: function() {
     *             // This code might, or might not work:
     *             // return new Child();
     *
     *             // Instead use Ext.create() to load the class at the spot if not loaded already:
     *             return Ext.create('Child');
     *         }
     *     });
     */
    Manager.registerPostprocessor('uses', function(name, cls, data) {
        //<debug>
        Ext.classSystemMonitor && Ext.classSystemMonitor(cls, 'Ext.Loader#usesPostprocessor', arguments);
        //</debug>
        
        var manifest = Ext.manifest,
            loadOrder = manifest && manifest.loadOrder,
            classes = manifest && manifest.classes,
            uses, clazz, item, len, i, indexMap;

        if (loadOrder) {
            clazz = classes[name];
            if (clazz && !isNaN(i = clazz.idx)) {
                item = loadOrder[i];
                uses = item.uses;
                indexMap = {};
                for (len = uses.length, i = 0; i < len; i++) {
                    indexMap[uses[i]] = true;
                }
                uses = Ext.Boot.getPathsFromIndexes(indexMap, loadOrder, true);
                if (uses.length > 0) {
                    Loader.loadScripts({
                        url: uses,
                        sequential: true
                    });
                }
            }
        }

        if (data.uses) {
            uses = data.uses;
            Loader.addUsedClasses(uses);
        }
    });

    Manager.onCreated(Loader.historyPush);
//</feature>

    Loader.init();
    
};

//-----------------------------------------------------------------------------

Ext._endTime = new Date().getTime();

// This hook is to allow tools like DynaTrace to deterministically detect the availability
// of Ext.onReady. Since Loader takes over Ext.onReady this must be done here and not in
// Ext.env.Ready.
if (Ext._beforereadyhandler){
    Ext._beforereadyhandler();
}
