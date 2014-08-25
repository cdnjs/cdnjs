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
_yuitest_coverage["build/tabview-base/tabview-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/tabview-base/tabview-base.js",
    code: []
};
_yuitest_coverage["build/tabview-base/tabview-base.js"].code=["YUI.add('tabview-base', function (Y, NAME) {","","var getClassName = Y.ClassNameManager.getClassName,","    TABVIEW = 'tabview',","    TAB = 'tab',","    PANEL = 'panel',","    SELECTED = 'selected',","    EMPTY_OBJ = {},","    DOT = '.',","","    _classNames = {","        tabview: getClassName(TABVIEW),","        tabviewPanel: getClassName(TABVIEW, PANEL),","        tabviewList: getClassName(TABVIEW, 'list'),","        tab: getClassName(TAB),","        tabLabel: getClassName(TAB, 'label'),","        tabPanel: getClassName(TAB, PANEL),","        selectedTab: getClassName(TAB, SELECTED),","        selectedPanel: getClassName(TAB, PANEL, SELECTED)","    },","","    _queries = {","        tabview: DOT + _classNames.tabview,","        tabviewList: '> ul',","        tab: '> ul > li',","        tabLabel: '> ul > li > a',","        tabviewPanel: '> div',","        tabPanel: '> div > div',","        selectedTab: '> ul > ' + DOT + _classNames.selectedTab,","        selectedPanel: '> div ' + DOT + _classNames.selectedPanel","    },","","    TabviewBase = function() {","        this.init.apply(this, arguments);","    };","","TabviewBase.NAME = 'tabviewBase';","TabviewBase._queries = _queries;","TabviewBase._classNames = _classNames;","","Y.mix(TabviewBase.prototype, {","    init: function(config) {","        config = config || EMPTY_OBJ;","        this._node = config.host || Y.one(config.node);","","        this.refresh();","    },","","    initClassNames: function(index) {","        Y.Object.each(_queries, function(query, name) {","            // this === tabview._node","            if (_classNames[name]) {","                var result = this.all(query);","                ","                if (index !== undefined) {","                    result = result.item(index);","                }","","                if (result) {","                    result.addClass(_classNames[name]);","                }","            }","        }, this._node);","","        this._node.addClass(_classNames.tabview);","    },","","    _select: function(index) {","        var node = this._node,","            oldItem = node.one(_queries.selectedTab),","            oldContent = node.one(_queries.selectedPanel),","            newItem = node.all(_queries.tab).item(index),","            newContent = node.all(_queries.tabPanel).item(index);","","        if (oldItem) {","            oldItem.removeClass(_classNames.selectedTab);","        }","","        if (oldContent) {","            oldContent.removeClass(_classNames.selectedPanel);","        }","","        if (newItem) {","            newItem.addClass(_classNames.selectedTab);","        }","","        if (newContent) {","            newContent.addClass(_classNames.selectedPanel);","        }","    },","","    initState: function() {","        var node = this._node,","            activeNode = node.one(_queries.selectedTab),","            activeIndex = activeNode ?","                    node.all(_queries.tab).indexOf(activeNode) : 0;","","        this._select(activeIndex);","    },","","    // collapse extra space between list-items","    _scrubTextNodes: function() {","        this._node.one(_queries.tabviewList).get('childNodes').each(function(node) {","            if (node.get('nodeType') === 3) { // text node","                node.remove();","            }","        });","    },","","    // base renderer only enlivens existing markup","    refresh: function() {","        this._scrubTextNodes();","        this.initClassNames();","        this.initState();","        this.initEvents();","    },","","    tabEventName: 'click',","","    initEvents: function() {","        // TODO: detach prefix for delegate?","        // this._node.delegate('tabview|' + this.tabEventName),","        this._node.delegate(this.tabEventName,","            this.onTabEvent,","            _queries.tab,","            this","        );","    },","","    onTabEvent: function(e) {","        e.preventDefault();","        this._select(this._node.all(_queries.tab).indexOf(e.currentTarget));","    },","","    destroy: function() {","        this._node.detach(this.tabEventName);","    }","});","","Y.TabviewBase = TabviewBase;","","","}, '@VERSION@', {\"requires\": [\"node-event-delegate\", \"classnamemanager\", \"skin-sam-tabview\"]});"];
_yuitest_coverage["build/tabview-base/tabview-base.js"].lines = {"1":0,"3":0,"34":0,"37":0,"38":0,"39":0,"41":0,"43":0,"44":0,"46":0,"50":0,"52":0,"53":0,"55":0,"56":0,"59":0,"60":0,"65":0,"69":0,"75":0,"76":0,"79":0,"80":0,"83":0,"84":0,"87":0,"88":0,"93":0,"98":0,"103":0,"104":0,"105":0,"112":0,"113":0,"114":0,"115":0,"123":0,"131":0,"132":0,"136":0,"140":0};
_yuitest_coverage["build/tabview-base/tabview-base.js"].functions = {"TabviewBase:33":0,"init:42":0,"(anonymous 2):50":0,"initClassNames:49":0,"_select:68":0,"initState:92":0,"(anonymous 3):103":0,"_scrubTextNodes:102":0,"refresh:111":0,"initEvents:120":0,"onTabEvent:130":0,"destroy:135":0,"(anonymous 1):1":0};
_yuitest_coverage["build/tabview-base/tabview-base.js"].coveredLines = 41;
_yuitest_coverage["build/tabview-base/tabview-base.js"].coveredFunctions = 13;
_yuitest_coverline("build/tabview-base/tabview-base.js", 1);
YUI.add('tabview-base', function (Y, NAME) {

_yuitest_coverfunc("build/tabview-base/tabview-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/tabview-base/tabview-base.js", 3);
var getClassName = Y.ClassNameManager.getClassName,
    TABVIEW = 'tabview',
    TAB = 'tab',
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
        tabLabel: '> ul > li > a',
        tabviewPanel: '> div',
        tabPanel: '> div > div',
        selectedTab: '> ul > ' + DOT + _classNames.selectedTab,
        selectedPanel: '> div ' + DOT + _classNames.selectedPanel
    },

    TabviewBase = function() {
        _yuitest_coverfunc("build/tabview-base/tabview-base.js", "TabviewBase", 33);
_yuitest_coverline("build/tabview-base/tabview-base.js", 34);
this.init.apply(this, arguments);
    };

_yuitest_coverline("build/tabview-base/tabview-base.js", 37);
TabviewBase.NAME = 'tabviewBase';
_yuitest_coverline("build/tabview-base/tabview-base.js", 38);
TabviewBase._queries = _queries;
_yuitest_coverline("build/tabview-base/tabview-base.js", 39);
TabviewBase._classNames = _classNames;

_yuitest_coverline("build/tabview-base/tabview-base.js", 41);
Y.mix(TabviewBase.prototype, {
    init: function(config) {
        _yuitest_coverfunc("build/tabview-base/tabview-base.js", "init", 42);
_yuitest_coverline("build/tabview-base/tabview-base.js", 43);
config = config || EMPTY_OBJ;
        _yuitest_coverline("build/tabview-base/tabview-base.js", 44);
this._node = config.host || Y.one(config.node);

        _yuitest_coverline("build/tabview-base/tabview-base.js", 46);
this.refresh();
    },

    initClassNames: function(index) {
        _yuitest_coverfunc("build/tabview-base/tabview-base.js", "initClassNames", 49);
_yuitest_coverline("build/tabview-base/tabview-base.js", 50);
Y.Object.each(_queries, function(query, name) {
            // this === tabview._node
            _yuitest_coverfunc("build/tabview-base/tabview-base.js", "(anonymous 2)", 50);
_yuitest_coverline("build/tabview-base/tabview-base.js", 52);
if (_classNames[name]) {
                _yuitest_coverline("build/tabview-base/tabview-base.js", 53);
var result = this.all(query);
                
                _yuitest_coverline("build/tabview-base/tabview-base.js", 55);
if (index !== undefined) {
                    _yuitest_coverline("build/tabview-base/tabview-base.js", 56);
result = result.item(index);
                }

                _yuitest_coverline("build/tabview-base/tabview-base.js", 59);
if (result) {
                    _yuitest_coverline("build/tabview-base/tabview-base.js", 60);
result.addClass(_classNames[name]);
                }
            }
        }, this._node);

        _yuitest_coverline("build/tabview-base/tabview-base.js", 65);
this._node.addClass(_classNames.tabview);
    },

    _select: function(index) {
        _yuitest_coverfunc("build/tabview-base/tabview-base.js", "_select", 68);
_yuitest_coverline("build/tabview-base/tabview-base.js", 69);
var node = this._node,
            oldItem = node.one(_queries.selectedTab),
            oldContent = node.one(_queries.selectedPanel),
            newItem = node.all(_queries.tab).item(index),
            newContent = node.all(_queries.tabPanel).item(index);

        _yuitest_coverline("build/tabview-base/tabview-base.js", 75);
if (oldItem) {
            _yuitest_coverline("build/tabview-base/tabview-base.js", 76);
oldItem.removeClass(_classNames.selectedTab);
        }

        _yuitest_coverline("build/tabview-base/tabview-base.js", 79);
if (oldContent) {
            _yuitest_coverline("build/tabview-base/tabview-base.js", 80);
oldContent.removeClass(_classNames.selectedPanel);
        }

        _yuitest_coverline("build/tabview-base/tabview-base.js", 83);
if (newItem) {
            _yuitest_coverline("build/tabview-base/tabview-base.js", 84);
newItem.addClass(_classNames.selectedTab);
        }

        _yuitest_coverline("build/tabview-base/tabview-base.js", 87);
if (newContent) {
            _yuitest_coverline("build/tabview-base/tabview-base.js", 88);
newContent.addClass(_classNames.selectedPanel);
        }
    },

    initState: function() {
        _yuitest_coverfunc("build/tabview-base/tabview-base.js", "initState", 92);
_yuitest_coverline("build/tabview-base/tabview-base.js", 93);
var node = this._node,
            activeNode = node.one(_queries.selectedTab),
            activeIndex = activeNode ?
                    node.all(_queries.tab).indexOf(activeNode) : 0;

        _yuitest_coverline("build/tabview-base/tabview-base.js", 98);
this._select(activeIndex);
    },

    // collapse extra space between list-items
    _scrubTextNodes: function() {
        _yuitest_coverfunc("build/tabview-base/tabview-base.js", "_scrubTextNodes", 102);
_yuitest_coverline("build/tabview-base/tabview-base.js", 103);
this._node.one(_queries.tabviewList).get('childNodes').each(function(node) {
            _yuitest_coverfunc("build/tabview-base/tabview-base.js", "(anonymous 3)", 103);
_yuitest_coverline("build/tabview-base/tabview-base.js", 104);
if (node.get('nodeType') === 3) { // text node
                _yuitest_coverline("build/tabview-base/tabview-base.js", 105);
node.remove();
            }
        });
    },

    // base renderer only enlivens existing markup
    refresh: function() {
        _yuitest_coverfunc("build/tabview-base/tabview-base.js", "refresh", 111);
_yuitest_coverline("build/tabview-base/tabview-base.js", 112);
this._scrubTextNodes();
        _yuitest_coverline("build/tabview-base/tabview-base.js", 113);
this.initClassNames();
        _yuitest_coverline("build/tabview-base/tabview-base.js", 114);
this.initState();
        _yuitest_coverline("build/tabview-base/tabview-base.js", 115);
this.initEvents();
    },

    tabEventName: 'click',

    initEvents: function() {
        // TODO: detach prefix for delegate?
        // this._node.delegate('tabview|' + this.tabEventName),
        _yuitest_coverfunc("build/tabview-base/tabview-base.js", "initEvents", 120);
_yuitest_coverline("build/tabview-base/tabview-base.js", 123);
this._node.delegate(this.tabEventName,
            this.onTabEvent,
            _queries.tab,
            this
        );
    },

    onTabEvent: function(e) {
        _yuitest_coverfunc("build/tabview-base/tabview-base.js", "onTabEvent", 130);
_yuitest_coverline("build/tabview-base/tabview-base.js", 131);
e.preventDefault();
        _yuitest_coverline("build/tabview-base/tabview-base.js", 132);
this._select(this._node.all(_queries.tab).indexOf(e.currentTarget));
    },

    destroy: function() {
        _yuitest_coverfunc("build/tabview-base/tabview-base.js", "destroy", 135);
_yuitest_coverline("build/tabview-base/tabview-base.js", 136);
this._node.detach(this.tabEventName);
    }
});

_yuitest_coverline("build/tabview-base/tabview-base.js", 140);
Y.TabviewBase = TabviewBase;


}, '@VERSION@', {"requires": ["node-event-delegate", "classnamemanager", "skin-sam-tabview"]});
