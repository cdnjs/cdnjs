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

function TestConsole() {
    TestConsole.superclass.constructor.apply(this, arguments);
}

Y.namespace('Test').Console = Y.extend(TestConsole, Y.Console, {
    initializer: function (config) {
        this.on('entry', this._onEntry);

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

        Y.Test.Runner.on('complete', Y.bind(this._parseCoverage, this));
    },

    // -- Protected Coverage Parser ---------------------------------------------
    /**
    * Parses YUITest coverage results if they are available and logs them.
    * @method _parseCoverage
    * @private
    */
    _parseCoverage: function() {
        var coverage = Y.Test.Runner.getCoverage();
        if (!coverage) {
            return;
        }

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

        Y.Object.each(coverage, function(info) {
            cov.lines.total += info.coveredLines;
            cov.lines.hit += info.calledLines;
            cov.lines.miss += (info.coveredLines - info.calledLines);
            cov.lines.percent = Math.floor((cov.lines.hit / cov.lines.total) * 100);
            
            cov.functions.total += info.coveredFunctions;
            cov.functions.hit += info.calledFunctions;
            cov.functions.miss += (info.coveredFunctions - info.calledFunctions);
            cov.functions.percent = Math.floor((cov.functions.hit / cov.functions.total) * 100);
        });

        
        var coverageLog = 'Lines: Hit:' + cov.lines.hit + ' Missed:' + cov.lines.miss + ' Total:' + cov.lines.total + ' Percent:' + cov.lines.percent + '%\n';
        coverageLog += 'Functions: Hit:' + cov.functions.hit + ' Missed:' + cov.functions.miss + ' Total:' + cov.functions.total + ' Percent:' + cov.functions.percent + '%';

        this.log('Coverage: ' + coverageLog, 'info', 'TestRunner');
    },

    // -- Protected Event Handlers ---------------------------------------------
    _onEntry: function (e) {
        var msg = e.message;

        if (msg.category === 'info'
                && /\s(?:case|suite)\s|yuitests\d+|began/.test(msg.message)) {
            msg.category = 'status';
        } else if (msg.category === 'fail') {
            this.printBuffer();
        }
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
