var eyes = require('eyes').inspector({ stream: null, styles: false });

// Stylize a string
this.stylize = function stylize(str, style) {
    if (module.exports.nocolor) {
      return str;
    }
    
    var styles = {
        'bold'      : [1,  22],
        'italic'    : [3,  23],
        'underline' : [4,  24],
        'cyan'      : [96, 39],
        'yellow'    : [33, 39],
        'green'     : [32, 39],
        'red'       : [31, 39],
        'grey'      : [90, 39],
        'green-hi'  : [92, 32],
    };
    return '\033[' + styles[style][0] + 'm' + str +
           '\033[' + styles[style][1] + 'm';
};

var $ = this.$ = function (str) {
    str = new(String)(str);

    ['bold', 'grey', 'yellow', 'red', 'green', 'white', 'cyan', 'italic'].forEach(function (style) {
        Object.defineProperty(str, style, {
            get: function () {
                return exports.$(exports.stylize(this, style));
            }
        });
    });
    return str;
};

this.puts = function (options) {
    var stylize = exports.stylize;
    options.stream || (options.stream = process.stdout);
    options.tail = options.tail || '';

    return function (args) {
        args = Array.prototype.slice.call(arguments);
        if (!options.raw) {
            args = args.map(function (a) {
                return a.replace(/`([^`]+)`/g,   function (_, capture) { return stylize(capture, 'italic') })
                        .replace(/\*([^*]+)\*/g, function (_, capture) { return stylize(capture, 'bold') })
                        .replace(/\n/g, function (_, capture) { return ' \n  ' } );
            });
        }
        return options.stream.write(args.join('\n') + options.tail);
    };
};

this.result = function (event) {
    var result = [], buffer = [], time = '', header;
    var complete = event.honored + event.pending + event.errored + event.broken;
    var status = (event.errored && 'errored') || (event.broken && 'broken') ||
                 (event.honored && 'honored') || (event.pending && 'pending');

    if (event.total === 0) {
        return [$("Could not find any tests to run.").bold.red];
    }

    event.honored && result.push($(event.honored).bold + " honored");
    event.broken  && result.push($(event.broken).bold  + " broken");
    event.errored && result.push($(event.errored).bold + " errored");
    event.pending && result.push($(event.pending).bold + " pending");

    if (complete < event.total) {
        result.push($(event.total - complete).bold + " dropped");
    }

    result = result.join(' ∙ ');

    header = {
        honored: '✓ ' + $('OK').bold.green,
        broken:  '✗ ' + $('Broken').bold.yellow,
        errored: '✗ ' + $('Errored').bold.red,
        pending: '- ' + $('Pending').bold.cyan
    }[status] + ' » ';

    if (typeof(event.time) === 'number') {
        time = ' (' + event.time.toFixed(3) + 's)';
        time = this.stylize(time, 'grey');
    }
    buffer.push(header + result + time + '\n');

    return buffer;
};

this.inspect = function inspect(val) {
    if (module.exports.nocolor) {
      return eyes(val);
    }
    
    return '\033[1m' + eyes(val) + '\033[22m';
};

this.error = function (obj) {
    var string  = '✗ ' + $('Errored ').red + '» ';
        string += $(obj.error).red.bold                         + '\n';
        string += (obj.context ? '    in ' + $(obj.context).red + '\n': '');
        string += '    in ' + $(obj.suite.subject).red          + '\n';
        string += '    in ' + $(obj.suite._filename).red;

    return string;
};

this.contextText = function (event) {
    return '  ' + event;
};

this.vowText = function (event) {
    var buffer = [];

    buffer.push('   ' + {
        honored: ' ✓ ',
        broken:  ' ✗ ',
        errored: ' ✗ ',
        pending: ' - '
    }[event.status] + this.stylize(event.title, ({
        honored: 'green',
        broken:  'yellow',
        errored: 'red',
        pending: 'cyan'
    })[event.status]));

    if (event.status === 'broken') {
        buffer.push('      » ' + event.exception);
    } else if (event.status === 'errored') {
        if (event.exception.type === 'promise') {
            buffer.push('      » ' + this.stylize("An unexpected error was caught: " +
                           this.stylize(event.exception.error, 'bold'), 'red'));
        } else {
            buffer.push('    ' + this.stylize(event.exception, 'red'));
        }
    }
    return buffer.join('\n');
};
