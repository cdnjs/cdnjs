/**
 * sonnyJS v0.1.3
 * www.github.com/felixmaier/sonnyJS
 * @author Felix Maier
 */

(function() { 'use strict'

    var root = this;

    /**
     * Shorten document.querySelector()
     */
    var $ = function() {
        return document.querySelector(arguments[0]);
    };

    /**
     * Static namespace-class for sonnyJS
     */
    var SONNY = SONNY || {};

    /**
     * Version of sonny
     */
    SONNY.VERSION = "0.1.3";

    /**
     * Default page path where sonny templates are stored
     */
    SONNY.PAGEPATH = "view/";

    /**
     * Filetype sonny has to process
     */
    SONNY.FILETYPE = ".html";

    /**
     * Sonny extension to differentiate
     */
    SONNY.STORAGE_EXT = "SY::";

    /**
     * Check if browser history manipulation is avaible
     */
    SONNY.HISTORY = window.history && typeof window.onpopstate === 'object' ? true : false;

    /**
     * Check if browser supports local storage
     */
    SONNY.LOCALSTORAGE = typeof(Storage) !== "undefined" || window.localStorage !== undefined ? true : false;

    /**
     * Save original host url
     */
    SONNY.ORIGINALHISTORY = window.location.href;

    /**
     * Counts initialized sonny instances
     */
    SONNY.INITIALIZED = 0;

    /**
     * Displays current sonny version in the console
     */
    SONNY.SHOWVERSION = false;

    /**
     * Manages all virtual pages
     * Get each unvirtualized page from the sonny instance
     * Get each page file and virtualize it
     * Callback after everything got loaded and stored successfully
     */
    SONNY.Virtualiser = function(resolve) {

        var self = this;

        if (!SONNY.LOADED) {
            this.init(this.VIRTUALPAGES, function(result) {
                self.PAGES = result;
                self.PAGES = self.interpreter.Includes(result);
                SONNY.LOADED = true;
                resolve();
                /**
                 * Automatically render the start page defined from the settings object
                 */
                if (self.STARTPAGE) {
                    self.renderer.render(self.STARTPAGE);	
				}
                /**
                 * Got adressbar parameters
                 * Used to withstand on page refreshes
                 * Don't render adressbar params if current page matches with it
                 */
                else if (self.history && self.history.additionalURL.length && self.CURRENTPAGE !== self.history.additionalURL) {
                    self.renderer.render(self.history.additionalURL + SONNY.FILETYPE);
                }
            });
        }

    };

    SONNY.Virtualiser.prototype.constructor = SONNY.Virtualiser;

    /**
     * Compile every page into an virtual page
     * @param data (object)
     */
    SONNY.Virtualiser.prototype.init = function(data, resolve) {

        var self = this;

        var page = {};

        /**
         * Object to array conversion
         */
        if (typeof data === 'object') {
            var oldData = data;
            var newData = [];
            Object.keys(data).forEach( function(key)  {
                newData.push(data[key]);
            });
            if (newData.length) data = newData;
        }

        var _virtualise = function(data) {
            if (typeof data[0] === 'string') {
                self.GET(SONNY.PAGEPATH + data[0], function(resp) {
                    
                    if (page[data[0]])
                    throw new Error("Multiple definition of " + page[data[0]].path + "!");
                            
                    var compiler = self.compiler;

                    var DOM = compiler.DOM(resp);

                    if (DOM.tagName !== 'APP') throw new Error('Missing "app" tag in ' + data[0] + '!');

                    var DOMOBJECT = compiler.HTML(DOM);
                        DOMOBJECT.content = DOMOBJECT.inside;
                        DOMOBJECT.path = data[0];

                        delete DOMOBJECT.inside;

                        page[data.shift()] = new SONNY.Page(DOMOBJECT);

                        if (data.length) _virtualise(data);
                        else resolve(page);
                    
                }); 
            }
        }
        
        _virtualise(data);

    };

    /**
     * Add a page object to the pageInstances
     * @param: url (string) : public/home
     */
    SONNY.Virtualiser.prototype.GET = function(url, resolve) {
        var request = new SONNY.GET();
        request.onload = function() {
            if (this.status === 200) {
                resolve(this.responseText);
            } else {
                throw new Error("Status code was " + this.status);
            }
        };
        request.open('GET', url + "?" + (new Date()).getTime(), true);
        if (request.overrideMimeType) request.overrideMimeType('text/html');
        request.send(null);
    };

    /**
     * Represents a page object
     * @param name (string) name of the page
     * @param server (boolean) page requires server values
     * @param content (object) content of the page to render
     * @param includes (integer) counts amount of included external pages
     * @param ready (boolean) page is in an ready to be rendered state
     */
    SONNY.Page = function(page) {
        this.name = String(page["sy-sitename"]);
        this.path = String(page.path);
        this.requireServer = Boolean(page["sy-requireserver"]) || false;
        this.content = page.content;
        this.includes = 0;
        this.renderedTimes = 0;
        this.global = Boolean(page.global) || false;
        this.ready = true;
    };

    SONNY.Page.prototype.constructor = SONNY.Page;

    /**
     * Interprets sonny pages
     * @methods loops
     */
    SONNY.Interpreter = function() {

        if (arguments[0]) this.__instance = arguments[0];

    };

    SONNY.Interpreter.prototype.constructor = SONNY.Interpreter;


    /**
     * Finds include keys in objects
     * Replace include element with virtual sonny page content
     * @param object (object) sonny page object
     */
    SONNY.Interpreter.prototype.Includes = function(object) {

        var self = this;

        var pageObject = object;

        var _initialize = function(data) {
            for (var ii in data) {
                if (typeof data[ii] === 'object') {
                    _initialize(data[ii]);
                    if (data.content) { 
                        pageObject = data;
                        data.content = _inherit(data.content);
                    }
                }
            }
            return data;
        };

        var _inherit = function(object) {
            for (var ii in object) {
                if (typeof object[ii] === "object") {
                    object[ii] = _inherit(object[ii]);
                    if (object[ii].key && object[ii].key === "syinclude") {
                        pageObject.includes++;
                        var result = _inherit(self.__instance.renderer.get(object[ii].page + SONNY.FILETYPE)).content; 
                        object.splice(ii, !false);
                        object.splice.apply(_inherit(object), [ii, 0].concat(result));
                    }
                }
            }
            return object;
        };

        return _initialize(pageObject);
    }

    /**
     * Compiler to virtualise html and render objects
     */
    SONNY.Compiler = function() {

        if (arguments[0]) this.__instance = arguments[0];

    };

    SONNY.Compiler.prototype.constructor = SONNY.Compiler;

    /**
     * Compile a html string into dom html
     * @param html (string)
     */
    SONNY.Compiler.prototype.DOM = function(html) {
        var HTMLDOM = document.implementation.createHTMLDocument("html");
            HTMLDOM.documentElement.innerHTML = html;
        return HTMLDOM.body.children[0];
    };

    /**
     * Compile html to an json object
     */
    SONNY.Compiler.prototype.HTML = function(object) {
        if (!object instanceof Object) throw new Error("Received arguments of invalid type");
        var virtualPage = {};
        virtualPage.key = object.tagName.toLowerCase();
        if (object.hasAttribute) {
            for (var ii = 0; ii < object.attributes.length; ii++) {
                virtualPage[object.attributes[ii].name] = object.attributes[ii].value;
            }
        }
        if (object.hasChildNodes()) {
            var child = object.firstChild;
            if (child.nodeType === 3 && child.data.trim() !== '') {
                virtualPage.text = child.data;
            }

            if ((child.nodeType === 3 && child.nextSibling) || child.nodeType === 1) {
                virtualPage.inside = [];
            }

            while (child) {
                if (child.nodeType === 1) {
                    virtualPage.inside.push(this.HTML(child));
                }
                child = child.nextSibling;
            }
        }
        return virtualPage;
    };

    /**
     * Compile json object into dom html
     */
    SONNY.Compiler.prototype.JSON = function(data, include) {

        var element,
            array = [];

        var self = this;

        var _compile = function(data) {

            if (data.key !== "syinclude") {
            for (var key in data) {
                
                if (key === "key") {
                    element = document.createElement(data.key);
                } else if (key === "text") {
                    element.innerHTML = data.text;
                } else {
                    if (key === "inside") {
                        if (data.inside) {
                            for (var ii = 0; ii < data.inside.length; ++ii) {
                                var insideElements = self.JSON(data.inside[ii]);
                                for (var ll in insideElements) {
                                    element.appendChild(insideElements[ll]);
                                }
                            }
                        }
                    } else {
                        try {
                            // Don't render backups
                            if (element && key !== "backup") element.setAttribute(key, data[key]);
                        } catch (e) {
                            throw new Error("JSON rendering failed: " + e);
                        }
                    }
                }
            }

            element = new SONNY.Vivifier(self.__instance).vivify(element);

            array.push(element);
            
            }

        };

        _compile(data);

        return array;
    };

    /**
     * Search for specific attributes in dom element
     * @param element (dom)
     */
    SONNY.Vivifier = function() {

        this.instance = arguments[0] || this;

    };

    SONNY.Vivifier.prototype.constructor = SONNY.Vivifier;

    /**
     * Search for specific attributes in dom element
     * @param element (dom)
     */
    SONNY.Vivifier.prototype.vivify = function(element) {

        var self = this;

        var LOAD = "sy-load";
        var MINMAX = "sy-min-max";
        var ACTION = "sy-action";
        var IMAGE = "sy-image";

        if (!element) throw new Error("Invalid element type!");

        if (element.attributes[LOAD]) {
            if (element.attributes[LOAD].value.match(":")) {
                element = this.addListeners(element, LOAD);
            } else {
                element.addEventListener('click', function() {
                    self.instance.render(element.attributes[LOAD].value + SONNY.FILETYPE);
                });
            }
        }
        return element;
    };

    /**
     * Add multiple event listeners to dom
     * @param element (dom)
     */
    SONNY.Vivifier.prototype.addListeners = function(element, type) {
        var self = this;
        var listeners = element.attributes[type].value.split(":");
        if (listeners[0].split("&").length >= 2) {
            listeners = listeners[0].match("&") ? listeners[0].split("&") : listeners;
            for (var ii = 0; ii < listeners.length; ii++) {
                listeners[ii].trim();
                element.addEventListener(listeners[ii], function() {
                    self.instance.render(element.attributes[type].value.split(":")[1] + SONNY.FILETYPE);
                });
            }
        } else {
            element.addEventListener(listeners[0], function() {
                self.instance.render(listeners[1] + SONNY.FILETYPE);
            });
        }
        return element;
    };

    /**
     * Render a virtual page
     */
    SONNY.Renderer = function() {

        if (arguments[0]) this.__instance = arguments[0];

    };

    SONNY.Renderer.prototype.constructor = SONNY.Renderer;

    /**
     * Render a page, attach it after successful compile
     * @param page (string) : public/home
     */
    SONNY.Renderer.prototype.render = function(page) {

        var self = this;

        if (page.match(SONNY.FILETYPE)) {
            page = page.split(SONNY.FILETYPE)[0];
        }

        if (!page instanceof String) throw new Error("Invalid page format!");

        this.page = this.get(page + SONNY.FILETYPE);

        /**
         * Ignore global pages
         */
        if (!this.page.global) this.__instance.CURRENTPAGE = page;

        this.page.rendered = this.compile(this.page);

        var result = this.compile(this.page);

        this.attach(this.page);

        if (SONNY.HISTORY && !arguments[1] && !this.page.global) {
            this.__instance.history.update(this.__instance.CURRENTPAGE);
        }

    };

    /**
     * @param page (string) : public/home
     * Clean the sonny instance page container for new content
     */
    SONNY.Renderer.prototype.kill = function() {
        if (!arguments[0]) {
            if (this.__instance.CONTAINERS.BODY) {
                this.__instance.CONTAINERS.BODY.innerHTML = "";
            }
        } else {
            switch(arguments[0]) {
                case "local":
                    this.__instance.CONTAINERS.BODY.innerHTML = "";
                    break;
                case "global":
                    this.__instance.CONTAINERS.GLOBALBODY.innerHTML = "";
                    break;
            }
        }
    };

    /**
     * Compile a virtual page to dom html
     * @param page (SONNY.Page)
     */
    SONNY.Renderer.prototype.compile = function(page) {
        var compiler = new SONNY.Compiler(this);
        var array = [];

        page = page.content || page;

        for (var ii in page) {
            array.push(compiler.JSON(page[ii]));
        }

        /**
         * Dont kill the local container if some global content gets rendered
         */
        if (!this.page.global) this.kill();

        return array;
    };

    /**
     * Parse dom html to the page container
     * @param page (html)
     */
    SONNY.Renderer.prototype.attach = function(page) {

        var self = this;

        var _attach = function(data, type) {
            if (data.rendered) {
                for (var ii in data.rendered) {
                    for (var kk in data.rendered[ii]) {
                        self.__instance.CONTAINERS[type].appendChild(data.rendered[ii][kk]);
                    }
                }
            }
        }

        if (page.global) {
            _attach(page, "GLOBALBODY");
        } else {
            _attach(page, "BODY");
        }
    };

    /**
     * Extract virtual page from instance
     * @param page (string) : public/home
     */
    SONNY.Renderer.prototype.get = function(page) {

        var self = this;
    
        var data;
    
        var _fetch = function(data) {
            if (self.__instance.PAGES[data]) return self.__instance.PAGES[data];
            else throw new Error("The page " + page + " does not exist or was not successfully loaded!");
        }

        return _fetch(page);
    };

    /**
     * Extends notification api
     */
    SONNY.Notifications = function() {

        if (arguments[0]) this.__instance = arguments[0];

        if (!("Notification" in window)) return;

        this.notifySupport = true;

        this.notification = null;

        this.permission = Notification.permission;

    };

    SONNY.Notifications.prototype.constructor = SONNY.Notifications;


    /**
     * Display a desktop notification
     * @param object (object) *object.title
     */
    SONNY.Notifications.prototype.show = function(object) {

        if (!this.notifySupport || !this.__instance.DISPLAYNOTIFICATIONS) return;

        if (this.permission === "granted") {
            if (typeof object !== 'object') return;

            /**
             * A title is necessary to define!
             */
            this.notification = new Notification(object.title, {
                tag: object.tag ? object.tag : null,
                body: object.message ? object.message : null,
                iconUrl: object.iconUrl ? object.iconUrl : null,
                icon: object.icon ? object.icon : null
            });

        } else if (this.permission !== 'denied') {
            this.getPermission(object);
        }
    };

    /**
     * Ask user for permission to display desktop notifications
     * @param object (object)
     */
    SONNY.Notifications.prototype.getPermission = function(object) {
        var self = this;
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                self.show(object);
            }
        });
    };

    /**
     * Connection over socket.io
     */
    SONNY.Connection = function() {

        if (!window.io) throw new Error("SonnyJS requires Socket.IO!");

        if (arguments[0]) this.__instance = arguments[0];
        else throw new Error("SONNY.Connection requires an instance parameter!");

        this.connected = false;
        
        this.socket = io( window.location.host + ":" + this.__instance.CONNECTIONPORT );

        this.connected = true;

        this.__instance.ONLINE = true;

        this.notifications = this.__instance.notify;

        this.init();

    };

    SONNY.Connection.prototype.constructor = SONNY.Connection;

    /**
     * Initialize an connection
     * Display a notification after connected successfully
     */
    SONNY.Connection.prototype.init = function() {

        var self = this;

        /**
         * Handles successful connections
         * Show a notification on success
         */
        this.socket.on('connect', function() {
            self.notifications.show({
                title: "SONNY.Connection",
                message: "Connection established!",
                icon: "http://sonnyjs.org/favicon-96x96.png"
            });
        });

        /**
         * Handles unsuccessful connections
         * Show a notification on success
         */
        this.socket.on('disconnect', function() {
            self.socket.disconnect();
            self.notifications.show({
                title: "SONNY.Connection",
                message: "Connection closed!",
                icon: "http://sonnyjs.org/favicon-96x96.png"
            });
        });

    };

    /**
     * Manipulates browser history and adressbar
     * Used to bring back the feeling of non single page applications
     */
    SONNY.HistoryManager = function() {

        if (arguments[0]) this.__instance = arguments[0];

        if (!SONNY.HISTORY) return;

        this.originalURL = "";

        this.additionalURL = "";

        this.init();

    };

    SONNY.HistoryManager.prototype.constructor = SONNY.HistoryManager;

    /**
     * Initialize the history manager
     * Grab the current url and process additional question mark signs
     */
    SONNY.HistoryManager.prototype.init = function() {

        var self = this;

        this.originalURL = SONNY.ORIGINALHISTORY;

        var originalURL = SONNY.ORIGINALHISTORY;

        var regex = new RegExp("\\?", "g");
            if (regex.test(originalURL)) {
                var splittedURL = originalURL.split("?");
                if (splittedURL[0] !== SONNY.ORIGINALHISTORY) {
                    SONNY.ORIGINALHISTORY = splittedURL[0];
                    this.originalURL = SONNY.ORIGINALHISTORY;
                }
                if (splittedURL.length) {
                    this.additionalURL = splittedURL[1];
                }
            }

        /**
         * Extend default forward and back buttons
         * Calls renderer with second param to avoid circular reference in history
         */
        window.onpopstate = function(event) {
            if (event.state && event.state !== null) {
                self.__instance.renderer.render(event.state, []);
            }
        };

    };

    /**
     * Update the adressbar with received value
     */
    SONNY.HistoryManager.prototype.update = function(value) {
        history.pushState(value, value, this.originalURL + "?" + value);
    };

    /**
     * Allows cross window communication
     * Detects page crashes and allows communication between multiple opened windows
     */
    SONNY.StorageManager = function() {

        if (arguments[0]) this.__instance = arguments[0];
        else throw new Error("SONNY.StorageManager requires an instance parameter!");

        if (!SONNY.LOCALSTORAGE) return;

        this.StorageName = null;

        this.Storage = null;

        this.activeWindows = 1;

        this.__instance.GLOBALKEYS = {};

        this.EmptyStorageTemplate = { initialized: true };

        this.init();

    };

    SONNY.StorageManager.prototype.constructor = SONNY.StorageManager;


    /**
     * Create a new global localstorage key
     */
    SONNY.StorageManager.prototype.init = function() {

        var self = this;

        this.synchonize();

        this.StorageName = SONNY.STORAGE_EXT + "Instance::" + (new Date()).getTime();

        /**
         * Key does not exist yet
         */
        if (!localStorage[this.StorageName]) {
            localStorage.setItem(this.StorageName, JSON.stringify(this.EmptyStorageTemplate));
        }

        this.Storage = JSON.parse(localStorage[this.StorageName]);

        /**
         * Make sure to delete old sonny keys
         * Since beforeunload is not a safe method
         */
        for (var ii in localStorage) {
            if (ii.match(SONNY.STORAGE_EXT + "Instance::") && ii !== self.StorageName) {
                localStorage.removeItem(ii);
            }
        }

        /**
         * Delete the current storage key
         */
        window.addEventListener('beforeunload', function(){
            localStorage.removeItem(self.StorageName);
        });

        /**
         * Listen for storage changes
         * Update instance global keys on differences
         */
        window.addEventListener('storage', function(e) {
            /**
             * Update active window amount
             */
            self.countWindows();
            /**
             * Someone or something deleted us o.O
             * Recreate us
             */
            if (!localStorage[self.StorageName]) {
                localStorage.setItem(self.StorageName, JSON.stringify(self.Storage));
            }
            /**
             * Update local key from localstorage change
             */
            self.synchonize();
        });

    };

    /**
     * Callback all global keys on a storage change
     */
    SONNY.StorageManager.prototype.onupdate = function(resolve) {

        var self = this;

        var storageObject = {};

        window.addEventListener('storage', function() {
            for (var ii in localStorage) {
                if (ii.match(SONNY.STORAGE_EXT) && !ii.match(SONNY.STORAGE_EXT + "Instance")) {
                    storageObject[ii.split("::")[1]] = localStorage[ii];
                    resolve(storageObject);
                }
            } 
        });
    };
    
    /**
     * Check if key already exists in the storage
     */
    SONNY.StorageManager.prototype.keyExists = function(key) {
        if (!this.__instance.GLOBALKEYS[key] && !localStorage[SONNY.STORAGE_EXT + key]) {
            return false;
        }
        return true;
    };

    /**
     * Create a global key in the storage
     */
    SONNY.StorageManager.prototype.createKey = function(object) {
        if (!this.keyExists(object.name)) {
            this.__instance.GLOBALKEYS[object.name] = object.data;
            localStorage.setItem(SONNY.STORAGE_EXT + object.name, object.data);
        }
    };

    /**
     * Delete a specific global key from the storage
     */
    SONNY.StorageManager.prototype.deleteKey = function(object) {
        delete this.__instance.GLOBALKEYS[object.name];
        localStorage.removeItem(SONNY.STORAGE_EXT + object.name);
    };

    /**
     * Update a global key in the storage
     */
    SONNY.StorageManager.prototype.updateKey = function(object) {
        if (this.keyExists(object.name)) {
            this.__instance.GLOBALKEYS[object.name] = object.data;
            localStorage.setItem(SONNY.STORAGE_EXT + object.name, object.data);
        }
    };

    /**
     * Delete a specific global key from the storage
     */
    SONNY.StorageManager.prototype.synchonize = function() {
        var storageObject = {};
        for (var ii in localStorage) {
            if (ii.match(SONNY.STORAGE_EXT) && !ii.match(SONNY.STORAGE_EXT + "Instance")) {
                storageObject[ii.split("::")[1]] = localStorage[ii];
                if (this.__instance.GLOBALKEYS[ii.split("::")[1]]) { 
                    this.__instance.GLOBALKEYS[ii.split("::")[1]] = localStorage[ii];
                } else if (!this.__instance.GLOBALKEYS[ii.split("::")[1]]) { 
                    this.__instance.GLOBALKEYS[ii.split("::")[1]] = localStorage[ii];
                }
            }
        }
        return storageObject;
    };

    /**
     * Count the amount of active sonny windows
     * @return amount of windows
     */
    SONNY.StorageManager.prototype.countWindows = function() {
        this.activeWindows = 0;
        for (var ii in localStorage) {
            if (ii.match(SONNY.STORAGE_EXT + "Instance::")) {
                this.activeWindows++;
            }
        }
        return this.activeWindows;
    };

    /**
     * A instance represents the core of a website session.
     * @param Page/settings object
     */
    SONNY.Instance = function(data, resolve) {

        /**
         * Increase global sonny initialized counter
         * to prevent multiple sonny instances
         */
        if (++SONNY.INITIALIZED > !false) throw new Error("Cannot run multiple sonny instances!");

        /**
         * Store myself in a variable to be visible in async operations
         */
        var self = this;

        /**
         * Displays a (chrome specific) message in the console
         */
        this.Greet();

        /**
         * Clone this instance
         */
        this.INSTANCE = this;

        /**
         * If defined, the page value will be rendered automatically after everything has loaded successfully
         */
        this.STARTPAGE = null;

        /**
         * Object to store containers sonny uses
         * Stores a local and global container
         */
        this.CONTAINERS = {};

        /**
         * The element container where a page get rendered into
         */
        this.CONTAINERS.BODYCONTAINER = "syContainer";

        /**
         * The element container where a page get rendered into
         */
        this.CONTAINERS.GLOBALCONTAINER = "syGlobal";

        /**
         * The current page a user is located
         */
        this.CURRENTPAGE = null;

        /**
         * The current window width
         */
        this.WIDTH = window.innerWidth;

        /**
         * The current window height
         */
        this.HEIGHT = window.innerHeight;

        /**
         * Is sonny in fullscreen mode or not?
         */
        this.FULLSCREEN = false;

        /**
         * A socket io connection has successfully established
         */
        this.ONLINE = false;

        /**
         * Either the user wants a socket io connection or not
         * Can be changed by the settings instance param
         */
        this.CONNECTION = false;

        /**
         * Default sonny socket io connection port
         * Can be changed by the settings instance param
         */
        this.CONNECTIONPORT = 9005;

        /**
         * Display sonnys notifications by default
         */
        this.DISPLAYNOTIFICATIONS = true;

        /**
         * Overwrite local instance settings by users's instance settings object
         */
        this.processSettings(data);

        /**
         * Save all unvirtualized pages
         */
        this.VIRTUALPAGES = data;

        /**
         * Either on a mobile platform or os
         */
        this.isMobile();

        /**
         * Update local instance size settings
         */
        this.resize();

        /**
         * Check if we already have access to the page parse container
         */
        this.CONTAINERS.BODY = $(this.CONTAINERS.BODYCONTAINER) || null;

        /**
         * Check if we already have access to the page parse container
         */
        this.CONTAINERS.GLOBALBODY = $(this.GLOBALCONTAINER) || null;

        /**
         * Local renderer to render virtualized pages
         * @param this instance
         */
        this.renderer = new SONNY.Renderer(this);

        /**
         * Local interpreter to interpret virtualized page objects
         * @param this instance
         */
        this.interpreter = new SONNY.Interpreter(this);

        /**
         * Local compiler to virtualize HTML pages
         */
        this.compiler = new SONNY.Compiler(this);

        /**
         * Local notifications
         */
        this.notify = new SONNY.Notifications(this);

        /**
         * Simplifies the management of the browser history
         * Manipulates the adressbar
         */
        this.history = new SONNY.HistoryManager(this);

        /**
         * Create a page container if not already existing
         * Call virtualiser after successfully preparing the page container
         */
        this.createContainer(function() {
            SONNY.Virtualiser.call(self, function() {
                /**
                 * Initialize a new connection
                 */
                self.CONNECTION ? self.CONNECTION = new SONNY.Connection(self) : null;
                /**
                 * Let the developer know everything succeeded
                 */
                resolve();
            });
        });

    };

    SONNY.Instance.prototype = Object.create(SONNY.Virtualiser.prototype);

    SONNY.Instance.prototype.constructor = SONNY.Instance;


    /**
     * Create the page container
     * Wait for the lazy slow document
     */
    SONNY.Instance.prototype.createContainer = function(resolve) {
        var self = this;
        window.addEventListener('DOMContentLoaded', function() {
            if (!self.CONTAINERS.BODY && !self.CONTAINERS.BODY) {
                var localContainer = document.createElement(self.CONTAINERS.BODYCONTAINER),
                    globalContainer = document.createElement(self.CONTAINERS.GLOBALCONTAINER);
                self.CONTAINERS.BODY = $("body");
				self.CONTAINERS.BODY.appendChild(globalContainer);
                self.CONTAINERS.BODY.appendChild(localContainer);
                self.CONTAINERS.BODY = $(localContainer.tagName.toLowerCase());
                self.CONTAINERS.GLOBALBODY = $(globalContainer.tagName.toLowerCase());
            }
            resolve();
        });
    };

    /**
     * Process settings from instance declaration
     * @param object.Settings
     */
    SONNY.Instance.prototype.processSettings = function(object) {
        if (object.Settings) {
            if (!object.Settings instanceof Object) throw new Error("Invalid settings type");
            for (var ii in object.Settings) {
                if (object.Settings[ii] === null || object.Settings[ii] === undefined) throw new Error(ii + " value is invalid");
                var original = ii;
                ii = String(ii.toUpperCase());
                if (this[ii] !== undefined || this[ii] === null) {
                    this[ii] = object.Settings[original];
                }
            }
            delete object.Settings;
        }
    };

    /**
     * Displays a hello message in the console
     * and a special message in chrome browsers
     */
    SONNY.Instance.prototype.Greet = function() {
        if ( navigator.userAgent.toLowerCase().indexOf('chrome') > -1 ) {
            var args = [
                '%c sonny.js ' + SONNY.VERSION + ' ->%c http://www.sonnyjs.org/ ',
                'color: #d9d9d9; background: #000',
                'background: #000'
            ];
            console.log.apply(console, args);
        } else if (window['console']) {
            console.info('sonny.js ' + SONNY.VERSION + ' -> http://www.sonnyjs.org/');
        }
    };

    /**
     * Mobile device detection
     */
    SONNY.Instance.prototype.isMobile = function() {
        if (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i)) {
            this.MOBILE = true;
        } else {
            this.MOBILE = false;
        }
    };

    /**
     * Listens for a window resize, updates instance variables on resizement
     */
    SONNY.Instance.prototype.resize = function() {

        var self = this;

        window.addEventListener('resize', function() {
            self.WIDTH = window.innerWidth;
            self.HEIGHT = window.innerHeight;
        });
    };

    /**
     * Cross browser fullscreen toggle
     * @return true if fullscreen else false
     */
    SONNY.Instance.prototype.toggleFullscreen = function() {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
            this.FULLSCREEN = true;
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            this.FULLSCREEN = false;
        }
        return this.FULLSCREEN;
    };

    /**
     * Cross browser ajax request
     */
    SONNY.GET = function() {
        var activexmodes = ['Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.3.0', 'Microsoft.XMLHTTP'];

        if (window.ActiveXObject) {
            for (var ii = 0; ii < activexmodes.length; ++ii) {
                try {
                    return new window.ActiveXObject(activexmodes[ii]);
                } catch (e) {
                    throw new Error(e);
                }
            }
        } else if (window.XMLHttpRequest) {
            return new window.XMLHttpRequest();
        } else {
            return false;
        }
    };

    if (window.SONNY) throw new Error("SonnyJS was already declared in this scope!");

    root.SONNY = SONNY;

}).call(this);
