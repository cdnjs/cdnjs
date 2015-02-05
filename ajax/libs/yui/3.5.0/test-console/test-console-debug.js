YUI.add('test-console', function(Y) {

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


}, '@VERSION@' ,{skinnable:true, requires:['console-filters', 'test']});
