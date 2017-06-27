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
_yuitest_coverage["build/test-console/test-console.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/test-console/test-console.js",
    code: []
};
_yuitest_coverage["build/test-console/test-console.js"].code=["YUI.add('test-console', function (Y, NAME) {","","/**","Provides a specialized log console widget that's pre-configured to display YUI","Test output with no extra configuration.","","@example","","    <div id=\"log\" class=\"yui3-skin-sam\"></div>","","    <script>","    YUI().use('test-console', function (Y) {","        // ... set up your test cases here ...","","        // Render the console inside the #log div, then run the tests.","        new Y.Test.Console().render('#log');","        Y.Test.Runner.run();","    });","    </script>","","@module test-console","@namespace Test","@class Console","@extends Console","@constructor","","@param {Object} [config] Config attributes.","    @param {Object} [config.filters] Category filter configuration.","","@since 3.5.0","**/","","function TestConsole() {","    TestConsole.superclass.constructor.apply(this, arguments);","}","","Y.namespace('Test').Console = Y.extend(TestConsole, Y.Console, {","    initializer: function (config) {","        this.on('entry', this._onEntry);","","        this.plug(Y.Plugin.ConsoleFilters, {","            category: Y.merge({","                info  : true,","                pass  : false,","                fail  : true,","                status: false","            }, (config && config.filters) || {}),","","            defaultVisibility: false,","","            source: {","                TestRunner: true","            }","        });","","        Y.Test.Runner.on('complete', Y.bind(this._parseCoverage, this));","    },","","    // -- Protected Coverage Parser ---------------------------------------------","    /**","    * Parses YUITest coverage results if they are available and logs them.","    * @method _parseCoverage","    * @private","    */","    _parseCoverage: function() {","        var coverage = Y.Test.Runner.getCoverage();","        if (!coverage) {","            return;","        }","","        var cov = {","            lines: {","                hit: 0,","                miss: 0,","                total: 0,","                percent: 0","            },","            functions: {","                hit: 0,","                miss: 0,","                total: 0,","                percent: 0","            }","        };","","        Y.Object.each(coverage, function(info) {","            cov.lines.total += info.coveredLines;","            cov.lines.hit += info.calledLines;","            cov.lines.miss += (info.coveredLines - info.calledLines);","            cov.lines.percent = Math.floor((cov.lines.hit / cov.lines.total) * 100);","            ","            cov.functions.total += info.coveredFunctions;","            cov.functions.hit += info.calledFunctions;","            cov.functions.miss += (info.coveredFunctions - info.calledFunctions);","            cov.functions.percent = Math.floor((cov.functions.hit / cov.functions.total) * 100);","        });","","        ","        var coverageLog = 'Lines: Hit:' + cov.lines.hit + ' Missed:' + cov.lines.miss + ' Total:' + cov.lines.total + ' Percent:' + cov.lines.percent + '%\\n';","        coverageLog += 'Functions: Hit:' + cov.functions.hit + ' Missed:' + cov.functions.miss + ' Total:' + cov.functions.total + ' Percent:' + cov.functions.percent + '%';","","        this.log('Coverage: ' + coverageLog, 'info', 'TestRunner');","    },","","    // -- Protected Event Handlers ---------------------------------------------","    _onEntry: function (e) {","        var msg = e.message;","","        if (msg.category === 'info'","                && /\\s(?:case|suite)\\s|yuitests\\d+|began/.test(msg.message)) {","            msg.category = 'status';","        } else if (msg.category === 'fail') {","            this.printBuffer();","        }","    }","}, {","    NAME: 'testConsole',","","    ATTRS: {","        entryTemplate: {","            value:","                '<div class=\"{entry_class} {cat_class} {src_class}\">' +","                    '<div class=\"{entry_content_class}\">{message}</div>' +","                '</div>'","        },","","        height: {","            value: '350px'","        },","","        newestOnTop: {","            value: false","        },","","        style: {","            value: 'block'","        },","","        width: {","            value: Y.UA.ie && Y.UA.ie < 9 ? '100%' : 'inherit'","        }","    }","});","","","}, '@VERSION@', {\"requires\": [\"console-filters\", \"test\"], \"skinnable\": true});"];
_yuitest_coverage["build/test-console/test-console.js"].lines = {"1":0,"33":0,"34":0,"37":0,"39":0,"41":0,"56":0,"66":0,"67":0,"68":0,"71":0,"86":0,"87":0,"88":0,"89":0,"90":0,"92":0,"93":0,"94":0,"95":0,"99":0,"100":0,"102":0,"107":0,"109":0,"111":0,"112":0,"113":0};
_yuitest_coverage["build/test-console/test-console.js"].functions = {"TestConsole:33":0,"initializer:38":0,"(anonymous 2):86":0,"_parseCoverage:65":0,"_onEntry:106":0,"(anonymous 1):1":0};
_yuitest_coverage["build/test-console/test-console.js"].coveredLines = 28;
_yuitest_coverage["build/test-console/test-console.js"].coveredFunctions = 6;
_yuitest_coverline("build/test-console/test-console.js", 1);
YUI.add('test-console', function (Y, NAME) {

/**
Provides a specialized log console widget that's pre-configured to display YUI
Test output with no extra configuration.

@example

    <div id="log" class="yui3-skin-sam"></div>

    <script>
    YUI().use('test-console', function (Y) {
        // ... set up your test cases here ...

        // Render the console inside the #log div, then run the tests.
        new Y.Test.Console().render('#log');
        Y.Test.Runner.run();
    });
    </script>

@module test-console
@namespace Test
@class Console
@extends Console
@constructor

@param {Object} [config] Config attributes.
    @param {Object} [config.filters] Category filter configuration.

@since 3.5.0
**/

_yuitest_coverfunc("build/test-console/test-console.js", "(anonymous 1)", 1);
_yuitest_coverline("build/test-console/test-console.js", 33);
function TestConsole() {
    _yuitest_coverfunc("build/test-console/test-console.js", "TestConsole", 33);
_yuitest_coverline("build/test-console/test-console.js", 34);
TestConsole.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/test-console/test-console.js", 37);
Y.namespace('Test').Console = Y.extend(TestConsole, Y.Console, {
    initializer: function (config) {
        _yuitest_coverfunc("build/test-console/test-console.js", "initializer", 38);
_yuitest_coverline("build/test-console/test-console.js", 39);
this.on('entry', this._onEntry);

        _yuitest_coverline("build/test-console/test-console.js", 41);
this.plug(Y.Plugin.ConsoleFilters, {
            category: Y.merge({
                info  : true,
                pass  : false,
                fail  : true,
                status: false
            }, (config && config.filters) || {}),

            defaultVisibility: false,

            source: {
                TestRunner: true
            }
        });

        _yuitest_coverline("build/test-console/test-console.js", 56);
Y.Test.Runner.on('complete', Y.bind(this._parseCoverage, this));
    },

    // -- Protected Coverage Parser ---------------------------------------------
    /**
    * Parses YUITest coverage results if they are available and logs them.
    * @method _parseCoverage
    * @private
    */
    _parseCoverage: function() {
        _yuitest_coverfunc("build/test-console/test-console.js", "_parseCoverage", 65);
_yuitest_coverline("build/test-console/test-console.js", 66);
var coverage = Y.Test.Runner.getCoverage();
        _yuitest_coverline("build/test-console/test-console.js", 67);
if (!coverage) {
            _yuitest_coverline("build/test-console/test-console.js", 68);
return;
        }

        _yuitest_coverline("build/test-console/test-console.js", 71);
var cov = {
            lines: {
                hit: 0,
                miss: 0,
                total: 0,
                percent: 0
            },
            functions: {
                hit: 0,
                miss: 0,
                total: 0,
                percent: 0
            }
        };

        _yuitest_coverline("build/test-console/test-console.js", 86);
Y.Object.each(coverage, function(info) {
            _yuitest_coverfunc("build/test-console/test-console.js", "(anonymous 2)", 86);
_yuitest_coverline("build/test-console/test-console.js", 87);
cov.lines.total += info.coveredLines;
            _yuitest_coverline("build/test-console/test-console.js", 88);
cov.lines.hit += info.calledLines;
            _yuitest_coverline("build/test-console/test-console.js", 89);
cov.lines.miss += (info.coveredLines - info.calledLines);
            _yuitest_coverline("build/test-console/test-console.js", 90);
cov.lines.percent = Math.floor((cov.lines.hit / cov.lines.total) * 100);
            
            _yuitest_coverline("build/test-console/test-console.js", 92);
cov.functions.total += info.coveredFunctions;
            _yuitest_coverline("build/test-console/test-console.js", 93);
cov.functions.hit += info.calledFunctions;
            _yuitest_coverline("build/test-console/test-console.js", 94);
cov.functions.miss += (info.coveredFunctions - info.calledFunctions);
            _yuitest_coverline("build/test-console/test-console.js", 95);
cov.functions.percent = Math.floor((cov.functions.hit / cov.functions.total) * 100);
        });

        
        _yuitest_coverline("build/test-console/test-console.js", 99);
var coverageLog = 'Lines: Hit:' + cov.lines.hit + ' Missed:' + cov.lines.miss + ' Total:' + cov.lines.total + ' Percent:' + cov.lines.percent + '%\n';
        _yuitest_coverline("build/test-console/test-console.js", 100);
coverageLog += 'Functions: Hit:' + cov.functions.hit + ' Missed:' + cov.functions.miss + ' Total:' + cov.functions.total + ' Percent:' + cov.functions.percent + '%';

        _yuitest_coverline("build/test-console/test-console.js", 102);
this.log('Coverage: ' + coverageLog, 'info', 'TestRunner');
    },

    // -- Protected Event Handlers ---------------------------------------------
    _onEntry: function (e) {
        _yuitest_coverfunc("build/test-console/test-console.js", "_onEntry", 106);
_yuitest_coverline("build/test-console/test-console.js", 107);
var msg = e.message;

        _yuitest_coverline("build/test-console/test-console.js", 109);
if (msg.category === 'info'
                && /\s(?:case|suite)\s|yuitests\d+|began/.test(msg.message)) {
            _yuitest_coverline("build/test-console/test-console.js", 111);
msg.category = 'status';
        } else {_yuitest_coverline("build/test-console/test-console.js", 112);
if (msg.category === 'fail') {
            _yuitest_coverline("build/test-console/test-console.js", 113);
this.printBuffer();
        }}
    }
}, {
    NAME: 'testConsole',

    ATTRS: {
        entryTemplate: {
            value:
                '<div class="{entry_class} {cat_class} {src_class}">' +
                    '<div class="{entry_content_class}">{message}</div>' +
                '</div>'
        },

        height: {
            value: '350px'
        },

        newestOnTop: {
            value: false
        },

        style: {
            value: 'block'
        },

        width: {
            value: Y.UA.ie && Y.UA.ie < 9 ? '100%' : 'inherit'
        }
    }
});


}, '@VERSION@', {"requires": ["console-filters", "test"], "skinnable": true});
