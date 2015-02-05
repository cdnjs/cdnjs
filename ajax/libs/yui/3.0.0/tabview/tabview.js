(function() {

var M = function(Y) {
    TabView = function(attributes) {
        this.constructor.superclass.constructor.apply(this, arguments);
    };

    TabView.NAME = "tabview";

    TabView.LIST_CLASSNAME = 'yui-tablist';
    TabView.CONTENT_CLASSNAME = 'yui-tabview-content';

    TabView.SELECTORS = {
        tabs: '.' + TabView.LIST_CLASSNAME,
        content: 'div.' + TabView.CONTENT_CLASSNAME 
    };

    TabView.TEMPLATES = {
        list: ['ul', { 'class': TabView.LIST_CLASSNAME }],
        content: ['div', { 'class': TabView.CONTENT_CLASSNAME }]
    };

    var proto = {
        initializer: function(attributes) {
            this._initSubNodes();
        },

        renderer: function() {
            var tabs = this.get('tabs');
            if (tabs) {
                for (var i = 0, len = tabs.length; i < len; ++i) {
                    if (!tabs[i].render) {
                        tabs[i] = new Y.Tab(tabs[i]);
                    }
                    if (tabs[i].get('active')) {
                        this.set('activeTab', tabs[i]);
                    }
                    this.addTab(tabs[i]);
                    tabs[i].render();
                }
            }
        },

        addTab: function(tab, beforeIndex) {
            tab.on('activeChange', function() {
                this._onActiveChange(tab); 
            }, this, true);

            this.fire('addTab', { relatedTarget: tab, before: beforeIndex });
        },

        removeTab: function(item) {
            var tabs = this.get('tabs');
            tabs.splice(this.indexOf(item, 1));
            //this.set('tabs', tabs);
            this.fire('removeTab', { relatedTarget: item });
        },

        indexOf: function(item) {
            var tabs = this.get('tabs');
            for (var i = 0, len = tabs.length; i < len; ++i) {
                if (tabs[i] === item) {
                    return i;
                }
            } 
            return -1; // not found
        },

        getTab: function(index) {
            return this.get('tabs')[index];
        },

        _getNode: function(val) {
            return Y.Node.get(val);
        },

        _initSubNodes: function() {
            this._uiInitSubNode('list');
            this._uiInitSubNode('content');
        },

        _uiInitSubNode: function(name) {
            if (!this.get(name + 'Node')) { // find or create if not provided
                var node = this._root.query(TabView.SELECTORS[name]) || Y.Node.create(TabView.TEMPLATES[name]);
                this.set(name + 'Node', node);
            }
console.log(this.get(name + 'Node').att('class'));

            if (!Y.Node.contains('body', this.get(name + 'Node'))) { // add to root node if not in document
                this._root.appendChild(this.get(name + 'Node'));
            }
            if (!this.get(name + 'Node')) {
                throw new Error('_uiInitNode failed for ' + name);
            }
        },

        _onActiveChange: function(tab) {
            this.set('activeTab', tab);
        },

        _setActiveTab: function(val) {
            var current = this.get('activeTab');
            if (current === val) {
                return;
            }

            if (current) {
                current.set('active', false);
            }
            if (val.get('active') === false) { // avoid inf loop
                val.set('active', true);
            }
        }
    };

    TabView.ATTRS = {
        listNode: {
            set: proto._getNode
        },

        contentNode: {
            set: proto._getNode
        },

        'tabs': {
            readOnly: true
        },

        'length': {
            readOnly: true,
            get: function() {
                return this.get('tabs').length;
            }
        },

        'activeTab': {
            set: proto._setActiveTab
        }
    };

    Y.lang.extend(TabView, Y.Widget, proto);
    Y.TabView = TabView;
};
YUI.add("tabview", M, "3.0.0");
})();
(function() {

var M = function(Y) {

    Tab = function(config) {
        config = Y.lang.merge(config);
        Tab.superclass.constructor.apply(this, arguments);
    };

    Tab.ACTIVATION_EVENT = 'click';

    Tab.CLASSNAMES = {
        label: 'yui-tab-label',
        content: 'yui-tab-content',
        hidden: 'yui-hidden',
        active: 'yui-active'
    };

    Tab.TEMPLATE = ['li']; // TODO: mv to ROOT_TEMPLATE?

    Tab.SELECTORS = {
        label: 'a',
        content: 'div'
    };

    Tab.TEMPLATES = {
        label: ['a', { 'class': Tab.CLASSNAMES.label }],
        content: ['div', { 'class': Tab.CLASSNAMES.content }]
    };


    Tab.NAME = "tab";

    var proto  = {
        initializer: function(config) {
            this._initSubNodes();
        },

        renderer: function() {
            this.renderUI(); // lays down DOM subtree when applicable 
            this.bindUI(); // handle UI events
            this.synchUI();
        },

        createNodes: function () { // TODO: automate?
            this._createNode('label');
            this._createNode('content');
        },

        findNodes: function () { // TODO: automate?
            this._findNode('label');
            this._findNode('content');
        },

        _onActivate: function() {
            this.set('active', true);
        },

        _initSubNodes: function() {
            if (this._root.children().length) { // try and parse from selector
                this.findNodes();
            } else { // create
                this.createNodes();
            }
        },

        _getNode: function(val) {
            return Y.Node.get(val);
        },

        _createNode: function (name) {
            this.set(name + 'Node', Y.Node.create(Tab.TEMPLATES[name]));
        },

        _findNode: function (name) {
            var node = this._root.query(Tab.SELECTORS[name]);
            if (!node) { // not enough DOM provided to continue
                throw new Error('node ' + name + ' not found');
            }

            if (Tab.CLASSNAMES[name]) { // add widget specific classNames as needed
                node.addClass(Tab.CLASSNAMES[name]);
            }

            this.set(name + 'Node', node);
        },

    // UI methods
        renderUI: function() {
            // TODO: automate this for all subnodes?
            if (!Y.Node.contains('body', this.get('labelNode'))) { // add to root node if not in document
                this._root.appendChild(this.get('labelNode'));
            }

            if (!Y.Node.contains('body', this.get('contentNode'))) { // add to root node if not in document
                this._root.appendChild(this.get('contentNode'));
            }
        },

        bindUI: function() {
            this.get('labelNode').on(Tab.ACTIVATION_EVENT,
                    this._onActivate, this, true);

            this.on('activeChange', this._uiSetActive);
            this.on('labelChange', this._uiSetLabel);
            this.on('contentChange', this._uiSetContent);
        },

        synchUI: function() {
            this._uiSetActive();
            this._uiSetLabel();
            this._uiSetContent();
        },

        _uiSetLabel: function() {
            this.get('labelNode').innerHTML(this.get('label'));
        },

        _uiSetContent: function() {
            this.get('contentNode').innerHTML(this.get('content'));
        },

        _uiSetActive: function() {
            if (this.get('active') === true) {
                this.get('labelNode').addClass(Tab.CLASSNAMES.active);
                this.get('contentNode').removeClass(Tab.CLASSNAMES.hidden);
            } else {
                this.get('labelNode').removeClass(Tab.CLASSNAMES.active);
                this.get('contentNode').addClass(Tab.CLASSNAMES.hidden);
            }
        }
    };

    Tab.ATTRS = {
        labelNode: {
            set: proto._getNode
        },

        contentNode: {
            set: proto._getNode
        },

        label: {
            validator: Y.lang.isString,
            value: ''
        },

        content: {
            validator: Y.lang.isString,
            value: ''
        },

        active: {
            set: proto._setActive
        }
    };

    Y.lang.extend(Tab, Y.Widget, proto);
    Y.Tab = Tab;
};


YUI.add("tab", M, "3.0.0");

/*
    // TODO: generate TEMPLATES/SELECTORS from something like this?
    Tab.NODES = [
        {
            name: 'label',
            tag: 'a',
            className: Tab.CLASSNAMES.label
        },

        {
            name: 'content',
            tag: 'div',
            className: Tab.CLASSNAMES.content
        }
    ];
*/

})();
(function() {

var M = function(Y) {

    var tabIO = function() {
        tabIO.superclass.constructor.apply(this, arguments);
    };

    tabIO.NAME = 'tabio';

    var proto = {
        initializer: function(config) {
            this.listen(this.owner, 'activeChange', this.onActiveChange, this, true);
        },

        onActiveChange: function() {
            this.request();
        },

        onSuccess: function(o) {
            this.owner.set('content', o.responseText);
        }
    };

    Y.lang.extend(tabIO, Y.IOPlugin, proto);
    Y.TabIOPlugin = tabIO;
};
YUI.add("tabioplugin", M, "3.0.0");
})();
(function() {

var M = function(Y) {
    var io = function() {
        io.superclass.constructor.apply(this, arguments);
    };

    io.NAME = 'io';
    io.NS = 'io';

    var proto = {
        initializer: function(config) {
        },
    
        request: function() {
            var self = this;
            this._request = Y.io.asyncRequest(
                    this.get('method'),
                    this.get('src'),
                    { success: function() { // TODO: move to events
                        self._onSuccess.apply(self, arguments)}
                    },
                    this.get('handler'),
                    this.get('postData')
            );
        },

        abort: function(callback, isTimeout) {
            Y.io.abort(this._request, callback, isTimeout);
        },

        _onComplete: function() {
            this.onComplete();
            this.fire('complete');
        },
        _onSuccess: function() {
            this.onSuccess.apply(this, arguments);
            this.fire('success');
        },
        _onFailure: function() {
            this.onFailure();
            this.fire('failure');
        },
        toString: function() {
            return 'io Plugin';
        },
        _request: null
    };

    io.ATTRS = {
        'src': {},
        'cacheRequest': {
            value: true
        },
        'timeout': {
            value: false
        },
        'method': {
            value: 'get'
        },
        'postData': {}

    };


    Y.lang.extend(io, Y.Plugin, proto);
    Y.IOPlugin = io;
};
YUI.add("ioplugin", M, "3.0.0");
})();
