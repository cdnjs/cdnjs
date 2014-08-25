// xunit outoput for vows, so we can run things under hudson
//
// The translation to xunit is simple.  Most likely more tags/attributes can be
// added, see: http://ant.1045680.n5.nabble.com/schema-for-junit-xml-output-td1375274.html
//

var puts = require('util').puts;

var buffer       = [],
    curSubject   = null;

function xmlEnc(value) {
    return !value ? value : String(value).replace(/&/g, "&amp;")
                                         .replace(/>/g, "&gt;")
                                         .replace(/</g, "&lt;")
                                         .replace(/"/g, "&quot;")
                                         .replace(/\u001b\[\d{1,2}m/g, '');
}

function tag(name, attribs, single, content) {
    var strAttr = [], t, end = '>';
    for (var attr in attribs) {
        if (attribs.hasOwnProperty(attr)) {
            strAttr.push(attr + '="' + xmlEnc(attribs[attr]) + '"');
        }
    }
    if (single) {
        end = ' />';
    }
    if (strAttr.length) {
        t = '<' + name + ' ' + strAttr.join(' ') + end;
    } else {
        t = '<' + name + end;
    }
    if (typeof content !== 'undefined') {
        return t + content + '</' + name + end;
    }
    return t;
}

function end(name) {
    return '</' + name + '>';
}

function cdata(data) {
    return '<![CDATA[' + xmlEnc(data) + ']]>';
}

this.name = 'xunit';
this.report = function (data) {
    var event = data[1];

    switch (data[0]) {
    case 'subject':
        curSubject = event;
        break;
    case 'context':
        break;
    case 'vow':
        switch (event.status) {
        case 'honored':
            buffer.push(tag('testcase', {classname: curSubject, name: event.context + ': ' + event.title}, true));
            break;
        case 'broken':
            var err = tag('error', {type: 'vows.event.broken', message: 'Broken test'}, false, cdata(event.exception));
            buffer.push(tag('testcase', {classname: curSubject, name: event.context + ': ' + event.title}, false, err));
            break;
        case 'errored':
            var skip = tag('skipped', {type: 'vows.event.errored', message: 'Errored test'}, false, cdata(event.exception));
            buffer.push(tag('testcase', {classname: curSubject, name: event.context + ': ' + event.title}, false, skip));
            break;
        case 'pending':
            // nop
            break;
        }
        break;
    case 'end':
        buffer.push(end('testcase'));
        break;
    case 'finish':
        buffer.unshift(tag('testsuite', {name: 'Vows test', tests: event.total, timestamp: (new Date()).toUTCString(), errors: event.errored, failures: event.broken, skip: event.pending, time: event.time}));
        buffer.push(end('testsuite'));
        puts(buffer.join('\n'));
        break;
    case 'error':
        break;
    }
};

this.print = function (str) { };
