var util = require('util');

var options = { tail: '\n' };
var console = require('../../vows/console');
var stylize = console.stylize,
    puts = console.puts(options);
//
// Console reporter
//

this.name = 'spec';
this.setStream = function (s) {
    options.stream = s;
};
this.report = function (data) {
    var event = data[1];

    switch (data[0]) {
        case 'subject':
            puts('\n♢ ' + stylize(event, 'bold') + '\n');
            break;
        case 'context':
            puts(console.contextText(event));
            break;
        case 'vow':
            puts(console.vowText(event));
            break;
        case 'end':
            util.print('\n');
            break;
        case 'finish':
            puts(console.result(event).join('\n'));
            break;
        case 'error':
            puts(console.error(event));
            break;
    }
};

this.print = function (str) {
    util.print(str);
};
