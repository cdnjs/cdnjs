var options = { tail: '' },
    console = require('../../vows/console'),
    stylize = console.stylize,
    puts = console.puts(options);
//
// Console reporter
//
var messages = [], lastContext;

this.name = 'dot-matrix';
this.setStream = function (s) {
    options.stream = s;
};

this.reset = function () {
    messages = [];
    lastContext = null;
};
this.report = function (data) {
    var event = data[1];

    switch (data[0]) {
        case 'subject':
            // messages.push(stylize(event, 'underline') + '\n');
            break;
        case 'context':
            break;
        case 'vow':
            if (event.status === 'honored') {
                puts(stylize('·', 'green'));
            } else if (event.status === 'pending') {
                puts(stylize('-', 'cyan'));
            } else {
                if (lastContext !== event.context) {
                    lastContext = event.context;
                    messages.push('  ' + event.context);
                }
                if (event.status === 'broken') {
                    puts(stylize('✗', 'yellow'));
                    messages.push(console.vowText(event));
                } else if (event.status === 'errored') {
                    puts(stylize('✗', 'red'));
                    messages.push(console.vowText(event));
                }
                messages.push('');
            }
            break;
        case 'end':
            puts(' ');
            break;
        case 'finish':
            if (messages.length) {
                puts('\n\n' + messages.join('\n'));
            } else {
                puts('');
            }
            puts(console.result(event).join('\n'));
            break;
        case 'error':
            puts(console.error(event));
            break;
    }
};

this.print = function (str) {
    puts(str);
};
