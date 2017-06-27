if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/tabview/tabview.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/tabview/tabview.js",
    code: []
};
_yuitest_coverage["build/tabview/tabview.js"].code=["YUI.add('tabview', function (Y, NAME) {","","/**"," * The TabView module"," *"," * @module tabview"," */","","var _queries = Y.TabviewBase._queries,","    _classNames = Y.TabviewBase._classNames,","    DOT = '.',","","    /**","     * Provides a tabbed widget interface","     * @param config {Object} Object literal specifying tabview configuration properties.","     *","     * @class TabView","     * @constructor","     * @extends Widget","     * @uses WidgetParent","     */","    TabView = Y.Base.create('tabView', Y.Widget, [Y.WidgetParent], {","    _afterChildAdded: function() {","        this.get('contentBox').focusManager.refresh();","    },","","    _defListNodeValueFn: function() {","        return Y.Node.create(TabView.LIST_TEMPLATE);","    },","","    _defPanelNodeValueFn: function() {","        return Y.Node.create(TabView.PANEL_TEMPLATE);","    },","","    _afterChildRemoved: function(e) { // update the selected tab when removed","        var i = e.index,","            selection = this.get('selection');","","        if (!selection) { // select previous item if selection removed","            selection = this.item(i - 1) || this.item(0);","            if (selection) {","                selection.set('selected', 1);","            }","        }","","        this.get('contentBox').focusManager.refresh();","    },","","    _initAria: function() {","        var contentBox = this.get('contentBox'),","            tablist = contentBox.one(_queries.tabviewList);","","        if (tablist) {","            tablist.setAttrs({","                //'aria-labelledby':","                role: 'tablist'","            });","        }","    },","","    bindUI: function() {","        //  Use the Node Focus Manager to add keyboard support:","        //  Pressing the left and right arrow keys will move focus","        //  among each of the tabs.","","        this.get('contentBox').plug(Y.Plugin.NodeFocusManager, {","                        descendants: DOT + _classNames.tabLabel,","                        keys: { next: 'down:39', // Right arrow","                                previous: 'down:37' },  // Left arrow","                        circular: true","                    });","","        this.after('render', this._setDefSelection);","        this.after('addChild', this._afterChildAdded);","        this.after('removeChild', this._afterChildRemoved);","    },","    ","    renderUI: function() {","        var contentBox = this.get('contentBox');","        this._renderListBox(contentBox);","        this._renderPanelBox(contentBox);","        this._childrenContainer = this.get('listNode');","        this._renderTabs(contentBox);","    },","","    _setDefSelection: function() {","        //  If no tab is selected, select the first tab.","        var selection = this.get('selection') || this.item(0);","","        this.some(function(tab) {","            if (tab.get('selected')) {","                selection = tab;","                return true;","            }","        });","        if (selection) {","            // TODO: why both needed? (via widgetParent/Child)?","            this.set('selection', selection);","            selection.set('selected', 1);","        }","    },","","    _renderListBox: function(contentBox) {","        var node = this.get('listNode');","        if (!node.inDoc()) {","            contentBox.append(node);","        }","    },","","    _renderPanelBox: function(contentBox) {","        var node = this.get('panelNode');","        if (!node.inDoc()) {","            contentBox.append(node);","        }","    },","","    _renderTabs: function(contentBox) {","        var tabs = contentBox.all(_queries.tab),","            panelNode = this.get('panelNode'),","            panels = (panelNode) ? this.get('panelNode').get('children') : null,","            tabview = this;","","        if (tabs) { // add classNames and fill in Tab fields from markup when possible","            tabs.addClass(_classNames.tab);","            contentBox.all(_queries.tabLabel).addClass(_classNames.tabLabel);","            contentBox.all(_queries.tabPanel).addClass(_classNames.tabPanel);","","            tabs.each(function(node, i) {","                var panelNode = (panels) ? panels.item(i) : null;","                tabview.add({","                    boundingBox: node,","                    contentBox: node.one(DOT + _classNames.tabLabel),","                    panelNode: panelNode","                });","            });","        }","    }","}, {","","    LIST_TEMPLATE: '<ul class=\"' + _classNames.tabviewList + '\"></ul>',","    PANEL_TEMPLATE: '<div class=\"' + _classNames.tabviewPanel + '\"></div>',","","    ATTRS: {","        defaultChildType: {","            value: 'Tab'","        },","","        listNode: {","            setter: function(node) {","                node = Y.one(node);","                if (node) {","                    node.addClass(_classNames.tabviewList);","                }","                return node;","            },","","            valueFn: '_defListNodeValueFn'","        },","","        panelNode: {","            setter: function(node) {","                node = Y.one(node);","                if (node) {","                    node.addClass(_classNames.tabviewPanel);","                }","                return node;","            },","","            valueFn: '_defPanelNodeValueFn'","        },","","        tabIndex: {","            value: null","            //validator: '_validTabIndex'","        }","    },","","    HTML_PARSER: {","        listNode: _queries.tabviewList,","        panelNode: _queries.tabviewPanel","    }","});","","Y.TabView = TabView;","var Lang = Y.Lang,","    _classNames = Y.TabviewBase._classNames;","","/**"," * Provides Tab instances for use with TabView"," * @param config {Object} Object literal specifying tabview configuration properties."," *"," * @class Tab"," * @constructor"," * @extends Widget"," * @uses WidgetChild"," */","Y.Tab = Y.Base.create('tab', Y.Widget, [Y.WidgetChild], {","    BOUNDING_TEMPLATE: '<li class=\"' + _classNames.tab + '\"></li>',","    CONTENT_TEMPLATE: '<a class=\"' + _classNames.tabLabel + '\"></a>',","    PANEL_TEMPLATE: '<div class=\"' + _classNames.tabPanel + '\"></div>',","","    _uiSetSelectedPanel: function(selected) {","        this.get('panelNode').toggleClass(_classNames.selectedPanel, selected);","    },","","    _afterTabSelectedChange: function(event) {","       this._uiSetSelectedPanel(event.newVal);","    },","","    _afterParentChange: function(e) {","        if (!e.newVal) {","            this._remove();","        } else {","            this._add();","        }","    },","","    _initAria: function() {","        var anchor = this.get('contentBox'),","            id = anchor.get('id'),","            panel = this.get('panelNode');"," ","        if (!id) {","            id = Y.guid();","            anchor.set('id', id);","        }","        //  Apply the ARIA roles, states and properties to each tab","        anchor.set('role', 'tab');","        anchor.get('parentNode').set('role', 'presentation');"," "," ","        //  Apply the ARIA roles, states and properties to each panel","        panel.setAttrs({","            role: 'tabpanel',","            'aria-labelledby': id","        });","    },","","    syncUI: function() {","        this.set('label', this.get('label'));","        this.set('content', this.get('content'));","        this._uiSetSelectedPanel(this.get('selected'));","    },","","    bindUI: function() {","       this.after('selectedChange', this._afterTabSelectedChange);","       this.after('parentChange', this._afterParentChange);","    },","","    renderUI: function() {","        this._renderPanel();","        this._initAria();","    },","","    _renderPanel: function() {","        this.get('parent').get('panelNode')","            .appendChild(this.get('panelNode'));","    },","","    _add: function() {","        var parent = this.get('parent').get('contentBox'),","            list = parent.get('listNode'),","            panel = parent.get('panelNode');","","        if (list) {","            list.appendChild(this.get('boundingBox'));","        }","","        if (panel) {","            panel.appendChild(this.get('panelNode'));","        }","    },","    ","    _remove: function() {","        this.get('boundingBox').remove();","        this.get('panelNode').remove();","    },","","    _onActivate: function(e) {","         if (e.target === this) {","             //  Prevent the browser from navigating to the URL specified by the","             //  anchor's href attribute.","             e.domEvent.preventDefault();","             e.target.set('selected', 1);","         }","    },","    ","    initializer: function() {","       this.publish(this.get('triggerEvent'), {","           defaultFn: this._onActivate","       });","    },","","    _defLabelGetter: function() {","        return this.get('contentBox').getHTML();","    },","","    _defLabelSetter: function(label) {","        var labelNode = this.get('contentBox');","        if (labelNode.getHTML() !== label) { // Avoid rewriting existing label.","            labelNode.setHTML(label);","        }","        return label;","    },","","    _defContentSetter: function(content) {","        var panel = this.get('panelNode');","        if (panel.getHTML() !== content) { // Avoid rewriting existing content.","            panel.setHTML(content);","        }","        return content;","    },","","    _defContentGetter: function() {","        return this.get('panelNode').getHTML();","    },","","    // find panel by ID mapping from label href","    _defPanelNodeValueFn: function() {","        var href = this.get('contentBox').get('href') || '',","            parent = this.get('parent'),","            hashIndex = href.indexOf('#'),","            panel;","","        href = href.substr(hashIndex);","","        if (href.charAt(0) === '#') { // in-page nav, find by ID","            panel = Y.one(href);","            if (panel) {","                panel.addClass(_classNames.tabPanel);","            }","        }","","        // use the one found by id, or else try matching indices","        if (!panel && parent) {","            panel = parent.get('panelNode')","                    .get('children').item(this.get('index'));","        }","","        if (!panel) { // create if none found","            panel = Y.Node.create(this.PANEL_TEMPLATE);","        }","        return panel;","    }","}, {","    ATTRS: {","        /**","         * @attribute triggerEvent","         * @default \"click\"","         * @type String","         */","        triggerEvent: {","            value: 'click'","        },","","        /**","         * @attribute label","         * @type HTML","         */","        label: {","            setter: '_defLabelSetter',","            getter: '_defLabelGetter'","        },","","        /**","         * @attribute content","         * @type HTML","         */","        content: {","            setter: '_defContentSetter',","            getter: '_defContentGetter'","        },","","        /**","         * @attribute panelNode","         * @type Y.Node","         */","        panelNode: {","            setter: function(node) {","                node = Y.one(node);","                if (node) {","                    node.addClass(_classNames.tabPanel);","                }","                return node;","            },","            valueFn: '_defPanelNodeValueFn'","        },","        ","        tabIndex: {","            value: null,","            validator: '_validTabIndex'","        }","","    },","","    HTML_PARSER: {","        selected: function() {","            var ret = (this.get('boundingBox').hasClass(_classNames.selectedTab)) ?","                        1 : 0;","            return ret;","        }","    }","","});","","","}, '@VERSION@', {","    \"requires\": [","        \"widget\",","        \"widget-parent\",","        \"widget-child\",","        \"tabview-base\",","        \"node-pluginhost\",","        \"node-focusmanager\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/tabview/tabview.js"].lines = {"1":0,"9":0,"24":0,"28":0,"32":0,"36":0,"39":0,"40":0,"41":0,"42":0,"46":0,"50":0,"53":0,"54":0,"66":0,"73":0,"74":0,"75":0,"79":0,"80":0,"81":0,"82":0,"83":0,"88":0,"90":0,"91":0,"92":0,"93":0,"96":0,"98":0,"99":0,"104":0,"105":0,"106":0,"111":0,"112":0,"113":0,"118":0,"123":0,"124":0,"125":0,"126":0,"128":0,"129":0,"130":0,"150":0,"151":0,"152":0,"154":0,"162":0,"163":0,"164":0,"166":0,"184":0,"185":0,"197":0,"203":0,"207":0,"211":0,"212":0,"214":0,"219":0,"223":0,"224":0,"225":0,"228":0,"229":0,"233":0,"240":0,"241":0,"242":0,"246":0,"247":0,"251":0,"252":0,"256":0,"261":0,"265":0,"266":0,"269":0,"270":0,"275":0,"276":0,"280":0,"283":0,"284":0,"289":0,"295":0,"299":0,"300":0,"301":0,"303":0,"307":0,"308":0,"309":0,"311":0,"315":0,"320":0,"325":0,"327":0,"328":0,"329":0,"330":0,"335":0,"336":0,"340":0,"341":0,"343":0,"380":0,"381":0,"382":0,"384":0,"398":0,"400":0};
_yuitest_coverage["build/tabview/tabview.js"].functions = {"_afterChildAdded:23":0,"_defListNodeValueFn:27":0,"_defPanelNodeValueFn:31":0,"_afterChildRemoved:35":0,"_initAria:49":0,"bindUI:61":0,"renderUI:78":0,"(anonymous 2):90":0,"_setDefSelection:86":0,"_renderListBox:103":0,"_renderPanelBox:110":0,"(anonymous 3):128":0,"_renderTabs:117":0,"setter:149":0,"setter:161":0,"_uiSetSelectedPanel:202":0,"_afterTabSelectedChange:206":0,"_afterParentChange:210":0,"_initAria:218":0,"syncUI:239":0,"bindUI:245":0,"renderUI:250":0,"_renderPanel:255":0,"_add:260":0,"_remove:274":0,"_onActivate:279":0,"initializer:288":0,"_defLabelGetter:294":0,"_defLabelSetter:298":0,"_defContentSetter:306":0,"_defContentGetter:314":0,"_defPanelNodeValueFn:319":0,"setter:379":0,"selected:397":0,"(anonymous 1):1":0};
_yuitest_coverage["build/tabview/tabview.js"].coveredLines = 114;
_yuitest_coverage["build/tabview/tabview.js"].coveredFunctions = 35;
_yuitest_coverline("build/tabview/tabview.js", 1);
YUI.add('tabview', function (Y, NAME) {

/**
 * The TabView module
 *
 * @module tabview
 */

_yuitest_coverfunc("build/tabview/tabview.js", "(anonymous 1)", 1);
_yuitest_coverline("build/tabview/tabview.js", 9);
var _queries = Y.TabviewBase._queries,
    _classNames = Y.TabviewBase._classNames,
    DOT = '.',

    /**
     * Provides a tabbed widget interface
     * @param config {Object} Object literal specifying tabview configuration properties.
     *
     * @class TabView
     * @constructor
     * @extends Widget
     * @uses WidgetParent
     */
    TabView = Y.Base.create('tabView', Y.Widget, [Y.WidgetParent], {
    _afterChildAdded: function() {
        _yuitest_coverfunc("build/tabview/tabview.js", "_afterChildAdded", 23);
_yuitest_coverline("build/tabview/tabview.js", 24);
this.get('contentBox').focusManager.refresh();
    },

    _defListNodeValueFn: function() {
        _yuitest_coverfunc("build/tabview/tabview.js", "_defListNodeValueFn", 27);
_yuitest_coverline("build/tabview/tabview.js", 28);
return Y.Node.create(TabView.LIST_TEMPLATE);
    },

    _defPanelNodeValueFn: function() {
        _yuitest_coverfunc("build/tabview/tabview.js", "_defPanelNodeValueFn", 31);
_yuitest_coverline("build/tabview/tabview.js", 32);
return Y.Node.create(TabView.PANEL_TEMPLATE);
    },

    _afterChildRemoved: function(e) { // update the selected tab when removed
        _yuitest_coverfunc("build/tabview/tabview.js", "_afterChildRemoved", 35);
_yuitest_coverline("build/tabview/tabview.js", 36);
var i = e.index,
            selection = this.get('selection');

        _yuitest_coverline("build/tabview/tabview.js", 39);
if (!selection) { // select previous item if selection removed
            _yuitest_coverline("build/tabview/tabview.js", 40);
selection = this.item(i - 1) || this.item(0);
            _yuitest_coverline("build/tabview/tabview.js", 41);
if (selection) {
                _yuitest_coverline("build/tabview/tabview.js", 42);
selection.set('selected', 1);
            }
        }

        _yuitest_coverline("build/tabview/tabview.js", 46);
this.get('contentBox').focusManager.refresh();
    },

    _initAria: function() {
        _yuitest_coverfunc("build/tabview/tabview.js", "_initAria", 49);
_yuitest_coverline("build/tabview/tabview.js", 50);
var contentBox = this.get('contentBox'),
            tablist = contentBox.one(_queries.tabviewList);

        _yuitest_coverline("build/tabview/tabview.js", 53);
if (tablist) {
            _yuitest_coverline("build/tabview/tabview.js", 54);
tablist.setAttrs({
                //'aria-labelledby':
                role: 'tablist'
            });
        }
    },

    bindUI: function() {
        //  Use the Node Focus Manager to add keyboard support:
        //  Pressing the left and right arrow keys will move focus
        //  among each of the tabs.

        _yuitest_coverfunc("build/tabview/tabview.js", "bindUI", 61);
_yuitest_coverline("build/tabview/tabview.js", 66);
this.get('contentBox').plug(Y.Plugin.NodeFocusManager, {
                        descendants: DOT + _classNames.tabLabel,
                        keys: { next: 'down:39', // Right arrow
                                previous: 'down:37' },  // Left arrow
                        circular: true
                    });

        _yuitest_coverline("build/tabview/tabview.js", 73);
this.after('render', this._setDefSelection);
        _yuitest_coverline("build/tabview/tabview.js", 74);
this.after('addChild', this._afterChildAdded);
        _yuitest_coverline("build/tabview/tabview.js", 75);
this.after('removeChild', this._afterChildRemoved);
    },
    
    renderUI: function() {
        _yuitest_coverfunc("build/tabview/tabview.js", "renderUI", 78);
_yuitest_coverline("build/tabview/tabview.js", 79);
var contentBox = this.get('contentBox');
        _yuitest_coverline("build/tabview/tabview.js", 80);
this._renderListBox(contentBox);
        _yuitest_coverline("build/tabview/tabview.js", 81);
this._renderPanelBox(contentBox);
        _yuitest_coverline("build/tabview/tabview.js", 82);
this._childrenContainer = this.get('listNode');
        _yuitest_coverline("build/tabview/tabview.js", 83);
this._renderTabs(contentBox);
    },

    _setDefSelection: function() {
        //  If no tab is selected, select the first tab.
        _yuitest_coverfunc("build/tabview/tabview.js", "_setDefSelection", 86);
_yuitest_coverline("build/tabview/tabview.js", 88);
var selection = this.get('selection') || this.item(0);

        _yuitest_coverline("build/tabview/tabview.js", 90);
this.some(function(tab) {
            _yuitest_coverfunc("build/tabview/tabview.js", "(anonymous 2)", 90);
_yuitest_coverline("build/tabview/tabview.js", 91);
if (tab.get('selected')) {
                _yuitest_coverline("build/tabview/tabview.js", 92);
selection = tab;
                _yuitest_coverline("build/tabview/tabview.js", 93);
return true;
            }
        });
        _yuitest_coverline("build/tabview/tabview.js", 96);
if (selection) {
            // TODO: why both needed? (via widgetParent/Child)?
            _yuitest_coverline("build/tabview/tabview.js", 98);
this.set('selection', selection);
            _yuitest_coverline("build/tabview/tabview.js", 99);
selection.set('selected', 1);
        }
    },

    _renderListBox: function(contentBox) {
        _yuitest_coverfunc("build/tabview/tabview.js", "_renderListBox", 103);
_yuitest_coverline("build/tabview/tabview.js", 104);
var node = this.get('listNode');
        _yuitest_coverline("build/tabview/tabview.js", 105);
if (!node.inDoc()) {
            _yuitest_coverline("build/tabview/tabview.js", 106);
contentBox.append(node);
        }
    },

    _renderPanelBox: function(contentBox) {
        _yuitest_coverfunc("build/tabview/tabview.js", "_renderPanelBox", 110);
_yuitest_coverline("build/tabview/tabview.js", 111);
var node = this.get('panelNode');
        _yuitest_coverline("build/tabview/tabview.js", 112);
if (!node.inDoc()) {
            _yuitest_coverline("build/tabview/tabview.js", 113);
contentBox.append(node);
        }
    },

    _renderTabs: function(contentBox) {
        _yuitest_coverfunc("build/tabview/tabview.js", "_renderTabs", 117);
_yuitest_coverline("build/tabview/tabview.js", 118);
var tabs = contentBox.all(_queries.tab),
            panelNode = this.get('panelNode'),
            panels = (panelNode) ? this.get('panelNode').get('children') : null,
            tabview = this;

        _yuitest_coverline("build/tabview/tabview.js", 123);
if (tabs) { // add classNames and fill in Tab fields from markup when possible
            _yuitest_coverline("build/tabview/tabview.js", 124);
tabs.addClass(_classNames.tab);
            _yuitest_coverline("build/tabview/tabview.js", 125);
contentBox.all(_queries.tabLabel).addClass(_classNames.tabLabel);
            _yuitest_coverline("build/tabview/tabview.js", 126);
contentBox.all(_queries.tabPanel).addClass(_classNames.tabPanel);

            _yuitest_coverline("build/tabview/tabview.js", 128);
tabs.each(function(node, i) {
                _yuitest_coverfunc("build/tabview/tabview.js", "(anonymous 3)", 128);
_yuitest_coverline("build/tabview/tabview.js", 129);
var panelNode = (panels) ? panels.item(i) : null;
                _yuitest_coverline("build/tabview/tabview.js", 130);
tabview.add({
                    boundingBox: node,
                    contentBox: node.one(DOT + _classNames.tabLabel),
                    panelNode: panelNode
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

        listNode: {
            setter: function(node) {
                _yuitest_coverfunc("build/tabview/tabview.js", "setter", 149);
_yuitest_coverline("build/tabview/tabview.js", 150);
node = Y.one(node);
                _yuitest_coverline("build/tabview/tabview.js", 151);
if (node) {
                    _yuitest_coverline("build/tabview/tabview.js", 152);
node.addClass(_classNames.tabviewList);
                }
                _yuitest_coverline("build/tabview/tabview.js", 154);
return node;
            },

            valueFn: '_defListNodeValueFn'
        },

        panelNode: {
            setter: function(node) {
                _yuitest_coverfunc("build/tabview/tabview.js", "setter", 161);
_yuitest_coverline("build/tabview/tabview.js", 162);
node = Y.one(node);
                _yuitest_coverline("build/tabview/tabview.js", 163);
if (node) {
                    _yuitest_coverline("build/tabview/tabview.js", 164);
node.addClass(_classNames.tabviewPanel);
                }
                _yuitest_coverline("build/tabview/tabview.js", 166);
return node;
            },

            valueFn: '_defPanelNodeValueFn'
        },

        tabIndex: {
            value: null
            //validator: '_validTabIndex'
        }
    },

    HTML_PARSER: {
        listNode: _queries.tabviewList,
        panelNode: _queries.tabviewPanel
    }
});

_yuitest_coverline("build/tabview/tabview.js", 184);
Y.TabView = TabView;
_yuitest_coverline("build/tabview/tabview.js", 185);
var Lang = Y.Lang,
    _classNames = Y.TabviewBase._classNames;

/**
 * Provides Tab instances for use with TabView
 * @param config {Object} Object literal specifying tabview configuration properties.
 *
 * @class Tab
 * @constructor
 * @extends Widget
 * @uses WidgetChild
 */
_yuitest_coverline("build/tabview/tabview.js", 197);
Y.Tab = Y.Base.create('tab', Y.Widget, [Y.WidgetChild], {
    BOUNDING_TEMPLATE: '<li class="' + _classNames.tab + '"></li>',
    CONTENT_TEMPLATE: '<a class="' + _classNames.tabLabel + '"></a>',
    PANEL_TEMPLATE: '<div class="' + _classNames.tabPanel + '"></div>',

    _uiSetSelectedPanel: function(selected) {
        _yuitest_coverfunc("build/tabview/tabview.js", "_uiSetSelectedPanel", 202);
_yuitest_coverline("build/tabview/tabview.js", 203);
this.get('panelNode').toggleClass(_classNames.selectedPanel, selected);
    },

    _afterTabSelectedChange: function(event) {
       _yuitest_coverfunc("build/tabview/tabview.js", "_afterTabSelectedChange", 206);
_yuitest_coverline("build/tabview/tabview.js", 207);
this._uiSetSelectedPanel(event.newVal);
    },

    _afterParentChange: function(e) {
        _yuitest_coverfunc("build/tabview/tabview.js", "_afterParentChange", 210);
_yuitest_coverline("build/tabview/tabview.js", 211);
if (!e.newVal) {
            _yuitest_coverline("build/tabview/tabview.js", 212);
this._remove();
        } else {
            _yuitest_coverline("build/tabview/tabview.js", 214);
this._add();
        }
    },

    _initAria: function() {
        _yuitest_coverfunc("build/tabview/tabview.js", "_initAria", 218);
_yuitest_coverline("build/tabview/tabview.js", 219);
var anchor = this.get('contentBox'),
            id = anchor.get('id'),
            panel = this.get('panelNode');
 
        _yuitest_coverline("build/tabview/tabview.js", 223);
if (!id) {
            _yuitest_coverline("build/tabview/tabview.js", 224);
id = Y.guid();
            _yuitest_coverline("build/tabview/tabview.js", 225);
anchor.set('id', id);
        }
        //  Apply the ARIA roles, states and properties to each tab
        _yuitest_coverline("build/tabview/tabview.js", 228);
anchor.set('role', 'tab');
        _yuitest_coverline("build/tabview/tabview.js", 229);
anchor.get('parentNode').set('role', 'presentation');
 
 
        //  Apply the ARIA roles, states and properties to each panel
        _yuitest_coverline("build/tabview/tabview.js", 233);
panel.setAttrs({
            role: 'tabpanel',
            'aria-labelledby': id
        });
    },

    syncUI: function() {
        _yuitest_coverfunc("build/tabview/tabview.js", "syncUI", 239);
_yuitest_coverline("build/tabview/tabview.js", 240);
this.set('label', this.get('label'));
        _yuitest_coverline("build/tabview/tabview.js", 241);
this.set('content', this.get('content'));
        _yuitest_coverline("build/tabview/tabview.js", 242);
this._uiSetSelectedPanel(this.get('selected'));
    },

    bindUI: function() {
       _yuitest_coverfunc("build/tabview/tabview.js", "bindUI", 245);
_yuitest_coverline("build/tabview/tabview.js", 246);
this.after('selectedChange', this._afterTabSelectedChange);
       _yuitest_coverline("build/tabview/tabview.js", 247);
this.after('parentChange', this._afterParentChange);
    },

    renderUI: function() {
        _yuitest_coverfunc("build/tabview/tabview.js", "renderUI", 250);
_yuitest_coverline("build/tabview/tabview.js", 251);
this._renderPanel();
        _yuitest_coverline("build/tabview/tabview.js", 252);
this._initAria();
    },

    _renderPanel: function() {
        _yuitest_coverfunc("build/tabview/tabview.js", "_renderPanel", 255);
_yuitest_coverline("build/tabview/tabview.js", 256);
this.get('parent').get('panelNode')
            .appendChild(this.get('panelNode'));
    },

    _add: function() {
        _yuitest_coverfunc("build/tabview/tabview.js", "_add", 260);
_yuitest_coverline("build/tabview/tabview.js", 261);
var parent = this.get('parent').get('contentBox'),
            list = parent.get('listNode'),
            panel = parent.get('panelNode');

        _yuitest_coverline("build/tabview/tabview.js", 265);
if (list) {
            _yuitest_coverline("build/tabview/tabview.js", 266);
list.appendChild(this.get('boundingBox'));
        }

        _yuitest_coverline("build/tabview/tabview.js", 269);
if (panel) {
            _yuitest_coverline("build/tabview/tabview.js", 270);
panel.appendChild(this.get('panelNode'));
        }
    },
    
    _remove: function() {
        _yuitest_coverfunc("build/tabview/tabview.js", "_remove", 274);
_yuitest_coverline("build/tabview/tabview.js", 275);
this.get('boundingBox').remove();
        _yuitest_coverline("build/tabview/tabview.js", 276);
this.get('panelNode').remove();
    },

    _onActivate: function(e) {
         _yuitest_coverfunc("build/tabview/tabview.js", "_onActivate", 279);
_yuitest_coverline("build/tabview/tabview.js", 280);
if (e.target === this) {
             //  Prevent the browser from navigating to the URL specified by the
             //  anchor's href attribute.
             _yuitest_coverline("build/tabview/tabview.js", 283);
e.domEvent.preventDefault();
             _yuitest_coverline("build/tabview/tabview.js", 284);
e.target.set('selected', 1);
         }
    },
    
    initializer: function() {
       _yuitest_coverfunc("build/tabview/tabview.js", "initializer", 288);
_yuitest_coverline("build/tabview/tabview.js", 289);
this.publish(this.get('triggerEvent'), {
           defaultFn: this._onActivate
       });
    },

    _defLabelGetter: function() {
        _yuitest_coverfunc("build/tabview/tabview.js", "_defLabelGetter", 294);
_yuitest_coverline("build/tabview/tabview.js", 295);
return this.get('contentBox').getHTML();
    },

    _defLabelSetter: function(label) {
        _yuitest_coverfunc("build/tabview/tabview.js", "_defLabelSetter", 298);
_yuitest_coverline("build/tabview/tabview.js", 299);
var labelNode = this.get('contentBox');
        _yuitest_coverline("build/tabview/tabview.js", 300);
if (labelNode.getHTML() !== label) { // Avoid rewriting existing label.
            _yuitest_coverline("build/tabview/tabview.js", 301);
labelNode.setHTML(label);
        }
        _yuitest_coverline("build/tabview/tabview.js", 303);
return label;
    },

    _defContentSetter: function(content) {
        _yuitest_coverfunc("build/tabview/tabview.js", "_defContentSetter", 306);
_yuitest_coverline("build/tabview/tabview.js", 307);
var panel = this.get('panelNode');
        _yuitest_coverline("build/tabview/tabview.js", 308);
if (panel.getHTML() !== content) { // Avoid rewriting existing content.
            _yuitest_coverline("build/tabview/tabview.js", 309);
panel.setHTML(content);
        }
        _yuitest_coverline("build/tabview/tabview.js", 311);
return content;
    },

    _defContentGetter: function() {
        _yuitest_coverfunc("build/tabview/tabview.js", "_defContentGetter", 314);
_yuitest_coverline("build/tabview/tabview.js", 315);
return this.get('panelNode').getHTML();
    },

    // find panel by ID mapping from label href
    _defPanelNodeValueFn: function() {
        _yuitest_coverfunc("build/tabview/tabview.js", "_defPanelNodeValueFn", 319);
_yuitest_coverline("build/tabview/tabview.js", 320);
var href = this.get('contentBox').get('href') || '',
            parent = this.get('parent'),
            hashIndex = href.indexOf('#'),
            panel;

        _yuitest_coverline("build/tabview/tabview.js", 325);
href = href.substr(hashIndex);

        _yuitest_coverline("build/tabview/tabview.js", 327);
if (href.charAt(0) === '#') { // in-page nav, find by ID
            _yuitest_coverline("build/tabview/tabview.js", 328);
panel = Y.one(href);
            _yuitest_coverline("build/tabview/tabview.js", 329);
if (panel) {
                _yuitest_coverline("build/tabview/tabview.js", 330);
panel.addClass(_classNames.tabPanel);
            }
        }

        // use the one found by id, or else try matching indices
        _yuitest_coverline("build/tabview/tabview.js", 335);
if (!panel && parent) {
            _yuitest_coverline("build/tabview/tabview.js", 336);
panel = parent.get('panelNode')
                    .get('children').item(this.get('index'));
        }

        _yuitest_coverline("build/tabview/tabview.js", 340);
if (!panel) { // create if none found
            _yuitest_coverline("build/tabview/tabview.js", 341);
panel = Y.Node.create(this.PANEL_TEMPLATE);
        }
        _yuitest_coverline("build/tabview/tabview.js", 343);
return panel;
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
         * @type HTML
         */
        label: {
            setter: '_defLabelSetter',
            getter: '_defLabelGetter'
        },

        /**
         * @attribute content
         * @type HTML
         */
        content: {
            setter: '_defContentSetter',
            getter: '_defContentGetter'
        },

        /**
         * @attribute panelNode
         * @type Y.Node
         */
        panelNode: {
            setter: function(node) {
                _yuitest_coverfunc("build/tabview/tabview.js", "setter", 379);
_yuitest_coverline("build/tabview/tabview.js", 380);
node = Y.one(node);
                _yuitest_coverline("build/tabview/tabview.js", 381);
if (node) {
                    _yuitest_coverline("build/tabview/tabview.js", 382);
node.addClass(_classNames.tabPanel);
                }
                _yuitest_coverline("build/tabview/tabview.js", 384);
return node;
            },
            valueFn: '_defPanelNodeValueFn'
        },
        
        tabIndex: {
            value: null,
            validator: '_validTabIndex'
        }

    },

    HTML_PARSER: {
        selected: function() {
            _yuitest_coverfunc("build/tabview/tabview.js", "selected", 397);
_yuitest_coverline("build/tabview/tabview.js", 398);
var ret = (this.get('boundingBox').hasClass(_classNames.selectedTab)) ?
                        1 : 0;
            _yuitest_coverline("build/tabview/tabview.js", 400);
return ret;
        }
    }

});


}, '@VERSION@', {
    "requires": [
        "widget",
        "widget-parent",
        "widget-child",
        "tabview-base",
        "node-pluginhost",
        "node-focusmanager"
    ],
    "skinnable": true
});
