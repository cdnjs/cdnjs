YUI.add('tabview', function(Y) {

var getClassName = Y.ClassNameManager.getClassName,
    TABVIEW = 'tabview',
    TAB = 'tab',
    CONTENT = 'content',
    PANEL = 'panel',
    SELECTED = 'selected',
    EMPTY_OBJ = {},
    DOT = '.',

    _classNames = {
        tabview: getClassName(TABVIEW),
        tabviewPanel: getClassName(TABVIEW, PANEL),
        tabviewList: getClassName(TABVIEW, 'list'),
        tab: getClassName(TAB),
        tabLabel: getClassName(TAB, 'label'),
        tabPanel: getClassName(TAB, PANEL),
        selectedTab: getClassName(TAB, SELECTED),
        selectedPanel: getClassName(TAB, PANEL, SELECTED)
    },

    _queries = {
        tabview: DOT + _classNames.tabview,
        tabviewList: '> ul',
        tab: '> ul > li',
        tabLabel: '> ul > li > a ',
        tabviewPanel: '> div',
        tabPanel: '> div > div',
        selectedTab: '> ul > ' + DOT + _classNames.selectedTab,
        selectedPanel: '> div ' + DOT + _classNames.selectedPanel
    },

    TabviewBase = function(config) {
        this.init.apply(this, arguments);
    };

TabviewBase.NAME = 'tabviewBase';
TabviewBase._queries = _queries;
TabviewBase._classNames = _classNames;

Y.mix(TabviewBase.prototype, {
    init: function(config) {
        config = config || EMPTY_OBJ;
        this._node = config.host || Y.one(config.node);

        this.refresh();
    },

    initClassNames: function(index) {
        Y.Object.each(_queries, function(query, name) {
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
        var node = this._node,
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
        var node = this._node,
            activeNode = node.one(_queries.selectedTab),
            activeIndex = activeNode ?
                    node.all(_queries.tab).indexOf(activeNode) : 0;

        this._select(activeIndex);
    },

    // collapse extra space between list-items
    _scrubTextNodes: function() {
        this._node.one(_queries.tabviewList).get('childNodes').each(function(node) {
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
            _queries.tab,
            this
        );
    },

    onTabEvent: function(e) {
        e.preventDefault();
        this._select(this._node.all(_queries.tab).indexOf(e.currentTarget));
    },

    destroy: function() {
        this._node.detach(this.tabEventName);
    }
});

Y.TabviewBase = TabviewBase;
/**
 * The TabView module 
 *
 * @module tabview
 */

var _queries = Y.TabviewBase._queries,
    _classNames = Y.TabviewBase._classNames,
    DOT = '.',
    _isGeckoIEWin = ((Y.UA.gecko || Y.UA.ie) && navigator.userAgent.indexOf("Windows") > -1),
    getClassName = Y.ClassNameManager.getClassName,

    /**
     * Provides a tabbed widget interface 
     * @param config {Object} Object literal specifying tabview configuration properties.
     *
     * @class TabView
     * @constructor
     * @extends Widget
     */
    TabView = Y.Base.create('tabView', Y.Widget, [Y.WidgetParent], {
    _afterChildRemoved: function(e) { // update the selected tab when removed
        var i = e.index,
            selection = this.get('selection');

        if (!selection) { // select previous item if selection removed
            selection = this.item(i - 1) || this.item(0);
            if (selection) {
                selection.set('selected', 1);
            }
        }
    },

    _initAria: function() {
        var contentBox = this.get('contentBox'),
            tablist = contentBox.one(_queries.tabviewList);

        if (tablist) {
            tablist.setAttrs({
                //'aria-labelledby': 
                role: tablist
            });
        }

        //  Since the anchor's "href" attribute has been removed, the
        //  element will not fire the click event in Firefox when the
        //  user presses the enter key.  To fix this, dispatch the
        //  "click" event to the anchor when the user presses the
        //  enter key.
     
        if (_isGeckoIEWin) {
            tabView.delegate('keydown', function (event) {
                if (event.charCode === 13) {
                    this.simulate("click");
                }
     
            }, ">ul>li>a");
     
        }
    },

    bindUI: function() {
        //  Use the Node Focus Manager to add keyboard support:
        //  Pressing the left and right arrow keys will move focus
        //  among each of the tabs.
        this.get('contentBox').plug(Y.Plugin.NodeFocusManager, {
                        descendants: _queries.tabLabel,
                        keys: { next: 'down:39', // Right arrow
                                previous: 'down:37' },  // Left arrow
                        circular: true
                    });

        this.after('removeChild', this._afterChildRemoved);
    },
    
    renderUI: function() {
        var contentBox = this.get('contentBox'); 
        this._renderListBox(contentBox);
        this._renderPanelBox(contentBox);
        this._renderTabs(contentBox);
        this._setDefSelection(contentBox);

    },

    _setDefSelection: function() {
        //  If no tab is selected, select the first tab.
        var firstItem = this.item(0);
        if (!this.get('selection') && firstItem) {
            firstItem.set('selected', 1);
        }
    },

    _renderListBox: function(contentBox) {
        var list = contentBox.one(_queries.tabviewList);
        if (!list) {
            contentBox.append(TabView.LIST_TEMPLATE);
        } else {
            list.addClass(_classNames.tabviewList);
        }
    },

    _renderPanelBox: function(contentBox) {
        var panel = contentBox.one(_queries.tabviewPanel);
        if (!panel) {
            contentBox.append(TabView.PANEL_TEMPLATE);
        } else {
            panel.addClass(_classNames.tabviewPanel);
        }
    },

    _renderTabs: function(contentBox) {
        var tabs = contentBox.all(_queries.tab),
            panels = contentBox.all(_queries.tabPanel),
            tabview = this;

        if (tabs) { // add classNames and fill in Tab fields from markup when possible
            tabs.addClass(_classNames.tab);
            contentBox.all(_queries.tabLabel).addClass(_classNames.tabLabel);
            contentBox.all(_queries.tabPanel).addClass(_classNames.tabPanel);

            tabs.each(function(node, i) {
                var panelNode = panels.item(i);
                tabview.add({
                    boundingBox: node,
                    contentBox: node.one(DOT + _classNames.tabLabel),
                    label: node.one(DOT + _classNames.tabLabel).get('text'),
                    content: panelNode ? panelNode.get('innerHTML') : null
                });
            });
        }

    }
}, {

    LIST_TEMPLATE: '<ul class="' + _classNames.tabviewList + '"></ul>',
    PANEL_TEMPLATE: '<div class="' + _classNames.tabviewPanel + '"></div>',

    ATTRS: {
        defaultChildType: {  
            value: 'Tab'
        },

        tabIndex: {
            value: null
            //validator: '_validTabIndex'
        }
    }
});

Y.TabView = TabView;
var Lang = Y.Lang,
    _queries = Y.TabviewBase._queries,
    _classNames = Y.TabviewBase._classNames,
    _isGeckoIEWin = ((Y.UA.gecko || Y.UA.ie) && navigator.userAgent.indexOf("Windows") > -1),
    getClassName = Y.ClassNameManager.getClassName;

/**
 * Provides Tab instances for use with TabView
 * @param config {Object} Object literal specifying tabview configuration properties.
 *
 * @class Tab
 * @constructor
 * @extends Widget
 */
Y.Tab = Y.Base.create('tab', Y.Widget, [Y.WidgetChild], {
    BOUNDING_TEMPLATE: '<li class="' + _classNames.tab + '"></li>',
    CONTENT_TEMPLATE: '<a class="' + _classNames.tabLabel + '"></a>',
    PANEL_TEMPLATE: '<div class="' + _classNames.tabPanel + '"></div>',

    _uiSetSelectedPanel: function(selected) {
        this.get('panelNode').toggleClass(_classNames.selectedPanel, selected);
    },

    _afterTabSelectedChange: function(event) {
       this._uiSetSelectedPanel(event.newVal);
    },

    _afterParentChange: function(e) {
        if (!e.newVal) {
            this._remove();
        } else {
            this._add();
        }
    },

    _initAria: function() {
        var anchor = this.get('contentBox'),
            id = anchor.get('id'),
            panel = this.get('panelNode');
 
        if (!id) {
            id = Y.guid();
            anchor.set('id', id);
        }
        //  Apply the ARIA roles, states and properties to each tab
        anchor.set('role', 'tab');
        anchor.get('parentNode').set('role', 'presentation');
 
 
        //  Remove the "href" attribute from the anchor element to
        //  prevent JAWS and NVDA from reading the value of the "href"
        //  attribute when the anchor is focused
 
        if (_isGeckoIEWin) {
            anchor.removeAttribute('href');
        }
 
        //  Apply the ARIA roles, states and properties to each panel
 
        panel.setAttrs({
            role: 'tabpanel',
            'aria-labelledby': id
        });
    },

    syncUI: function() {
        this._uiSetSelectedPanel(this.get('selected'));
    },

    bindUI: function() {
       this.after('selectedChange', this._afterTabSelectedChange);
       this.after('parentChange', this._afterParentChange);
    },

    renderUI: function() {
        var parentContentBox = this.get('parent').get('contentBox'),
            contentBox = this.get('contentBox');

        this._renderLabel(contentBox, parentContentBox);
        this._renderPanel(contentBox, parentContentBox);
        this._initAria();
    },

    _renderLabel: function(contentBox, parentContentBox) {
        var label = this.get('label');
        contentBox.setContent(label);
        parentContentBox.one(_queries.tabviewList).appendChild(this.get('boundingBox'));
    },

    _renderPanel: function(contentBox, parentContentBox) {
        var panel = parentContentBox.all(_queries.tabPanel).item(this.get('index'));
        if (!panel) {
            panel = Y.Node.create(this.PANEL_TEMPLATE);
            panel.setContent(this.get('content'));
            parentContentBox.one(_queries.tabviewPanel).appendChild(panel);
        }

        this._set('panelNode', panel);
    },

    _add: function() {
        var parentNode = this.get('parent').get('contentBox'),
            list = parentNode.one(_queries.tabviewList),
            tabviewPanel = parentNode.one(_queries.tabviewPanel);
        if (list) {
            list.appendChild(this.get('boundingBox'));
        }

        if (tabviewPanel) {
            tabviewPanel.appendChild(this.get('panelNode'));
        }
    },
    
    _remove: function() {
        this.get('boundingBox').remove();
        this.get('panelNode').remove();
    },

    _onActivate: function(e) {
         if (e.target === this) {
             //  Prevent the browser from navigating to the URL specified by the 
             //  anchor's href attribute.
             e.domEvent.preventDefault();
             e.target.set('selected', 1);
         }
    },
    
    initializer: function() {
       this.publish(this.get('triggerEvent'), { 
           defaultFn: this._onActivate
       });
    }
}, {
    ATTRS: {
        /**
         * @attribute triggerEvent
         * @default "click" 
         * @type String
         */
        triggerEvent: {
            value: 'click'
        },

        /**
         * @attribute label
         * @type String
         */
        label: { 
            validator: Lang.isString
        },

        /**
         * @attribute label
         * @type String
         */
        content: {
            validator: Lang.isString
        },

        panelNode: {},
        
        tabIndex: {
            value: null,
            validator: '_validTabIndex'
        }        

    },

    HTML_PARSER: {
        selection: function(contentBox) {
            return this.get('boundingBox').hasClass(_classNames.selectedTab);
        }
    }

});


}, '@VERSION@' ,{requires:['substitute', 'node-focusmanager', 'tabview-base', 'widget', 'widget-parent', 'widget-child']});
