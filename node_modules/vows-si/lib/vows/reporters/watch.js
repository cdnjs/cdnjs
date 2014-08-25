var options = {};
var console = require('../../vows/console');
var spec = require('../../vows/reporters/spec');
var stylize = console.stylize,
    puts = console.puts(options);
//
// Console reporter
//
var lastContext;

this.name = 'watch';
this.setStream = function (s) {
    options.stream = s;
};
this.reset = function () {
    lastContext = null;
};
this.report = function (data) {
    var event = data[1];

    switch (data[0]) {
        case 'vow':
            if (['honored', 'pending'].indexOf(event.status) === -1) {
                if (lastContext !== event.context) {
                    lastContext = event.context;
                    puts(console.contextText(event.context));
                }
                puts(console.vowText(event));
                puts('');
            }
            break;
        case 'error':
            puts(console.error(event));
            break;
    }
};
this.print = function (str) {};
