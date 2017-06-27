YUI.add('tabview-base', function (Y, NAME) {

var getClassName = Y.ClassNameManager.getClassName,
    TABVIEW = 'tabview',
    TAB = 'tab',
    PANEL = 'panel',
    SELECTED = 'selected',
    EMPTY_OBJ = {},
    DOT = '.',

    TabviewBase = function() {
        this.init.apply(this, arguments);
    };

TabviewBase.NAME = 'tabviewBase';
TabviewBase._classNames = {
    tabview: getClassName(TABVIEW),
    tabviewPanel: getClassName(TABVIEW, PANEL),
    tabviewList: getClassName(TABVIEW, 'list'),
    tab: getClassName(TAB),
    tabLabel: getClassName(TAB, 'label'),
    tabPanel: getClassName(TAB, PANEL),
    selectedTab: getClassName(TAB, SELECTED),
    selectedPanel: getClassName(TAB, PANEL, SELECTED)
};
TabviewBase._queries = {
    tabview: DOT + TabviewBase._classNames.tabview,
    tabviewList: '> ul',
    tab: '> ul > li',
    tabLabel: '> ul > li > a',
    tabviewPanel: '> div',
    tabPanel: '> div > div',
    selectedTab: '> ul > ' + DOT + TabviewBase._classNames.selectedTab,
    selectedPanel: '> div ' + DOT + TabviewBase._classNames.selectedPanel
};

Y.mix(TabviewBase.prototype, {
    init: function(config) {
        config = config || EMPTY_OBJ;
        this._node = config.host || Y.one(config.node);

        this.refresh();
    },

    initClassNames: function(index) {
        var _classNames = Y.TabviewBase._classNames;

        Y.Object.each(Y.TabviewBase._queries, function(query, name) {
            // this === tabview._node
            if (_classNames[name]) {
                var result = this.all(query);

                if (index !== undefined) {
                    result = result.item(index);
                }

                if (result) {
                    result.addClass(_classNames[name]);
                }
            }
        }, this._node);

        this._node.addClass(_classNames.tabview);
    },

    _select: function(index) {
        var _classNames = Y.TabviewBase._classNames,
            _queries = Y.TabviewBase._queries,
            node = this._node,
            oldItem = node.one(_queries.selectedTab),
            oldContent = node.one(_queries.selectedPanel),
            newItem = node.all(_queries.tab).item(index),
            newContent = node.all(_queries.tabPanel).item(index);

        if (oldItem) {
            oldItem.removeClass(_classNames.selectedTab);
        }

        if (oldContent) {
            oldContent.removeClass(_classNames.selectedPanel);
        }

        if (newItem) {
            newItem.addClass(_classNames.selectedTab);
        }

        if (newContent) {
            newContent.addClass(_classNames.selectedPanel);
        }
    },

    initState: function() {
        var _queries = Y.TabviewBase._queries,
            node = this._node,
            activeNode = node.one(_queries.selectedTab),
            activeIndex = activeNode ?
                    node.all(_queries.tab).indexOf(activeNode) : 0;

        this._select(activeIndex);
    },

    // collapse extra space between list-items
    _scrubTextNodes: function() {
        this._node.one(Y.TabviewBase._queries.tabviewList).get('childNodes').each(function(node) {
            if (node.get('nodeType') === 3) { // text node
                node.remove();
            }
        });
    },

    // base renderer only enlivens existing markup
    refresh: function() {
        this._scrubTextNodes();
        this.initClassNames();
        this.initState();
        this.initEvents();
    },

    tabEventName: 'click',

    initEvents: function() {
        // TODO: detach prefix for delegate?
        // this._node.delegate('tabview|' + this.tabEventName),
        this._node.delegate(this.tabEventName,
            this.onTabEvent,
            Y.TabviewBase._queries.tab,
            this
        );
    },

    onTabEvent: function(e) {
        e.preventDefault();
        this._select(this._node.all(Y.TabviewBase._queries.tab).indexOf(e.currentTarget));
    },

    destroy: function() {
        this._node.detach(this.tabEventName);
    }
});

Y.TabviewBase = TabviewBase;


}, '@VERSION@', {"requires": ["node-event-delegate", "classnamemanager"]});
