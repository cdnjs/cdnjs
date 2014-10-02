/*
    Run `npm test` to run tests
*/

var xml = require('../lib/xml');
var expect = require('chai').expect;

describe('xml module', function(done) {

    it('can be have no elements', function(done) {
        expect(xml()).to.be.empty;
        expect(xml([])).to.be.empty;
        expect(xml('test')).to.equal('test');
        expect(xml('test')).to.equal('test');
        expect(xml('scotch & whisky')).to.equal('scotch &amp; whisky');
        expect(xml('bob\'s escape character')).to.equal('bob&apos;s escape character');
        done();
    });

    it('works with simple options', function(done) {
        expect(xml([ { a: {} }])).to.equal('<a/>');
        expect(xml([ { a: null }])).to.equal('<a/>');
        expect(xml([ { a: [] }])).to.equal('<a></a>');
        expect(xml([ { a: -1 }])).to.equal('<a>-1</a>');
        expect(xml([ { a: false }])).to.equal('<a>false</a>');
        expect(xml([ { a: 'test' }])).to.equal('<a>test</a>');
        expect(xml( { a: {} })).to.equal('<a/>');
        expect(xml( { a: null })).to.equal('<a/>');
        expect(xml( { a: [] })).to.equal('<a></a>');
        expect(xml( { a: -1 })).to.equal('<a>-1</a>');
        expect(xml( { a: false })).to.equal('<a>false</a>');
        expect(xml( { a: 'test' })).to.equal('<a>test</a>');
        expect(xml([ { a: 'test' }, { b: 123 }, { c: -0.5 } ])).to.equal('<a>test</a><b>123</b><c>-0.5</c>');
        done();
    });

    it('works with deeply nested objects', function(done) {
        expect(xml([ { a: [ { b: [ { c: 1 }, { c: 2 }, { c: 3 } ] } ] }]), '<a><b><c>1</c><c>2</c><c>3</c></b></a>');
        done();
    });

    it('indents property', function(done) {
        expect(xml([ { a: [ { b: [ { c: 1 }, { c: 2 }, { c: 3 } ] } ] }], true)).to.equal('<a>\n    <b>\n        <c>1</c>\n        <c>2</c>\n        <c>3</c>\n    </b>\n</a>');
        expect(xml([ { a: [ { b: [ { c: 1 }, { c: 2 }, { c: 3 } ] } ] }], '  ')).to.equal('<a>\n  <b>\n    <c>1</c>\n    <c>2</c>\n    <c>3</c>\n  </b>\n</a>');
        expect(xml([ { a: [ { b: [ { c: 1 }, { c: 2 }, { c: 3 } ] } ] }], '\t')).to.equal('<a>\n\t<b>\n\t\t<c>1</c>\n\t\t<c>2</c>\n\t\t<c>3</c>\n\t</b>\n</a>');
        expect(xml({guid:[{_attr:{premalink:true}},'content']},true)).to.equal('<guid premalink="true">content</guid>');
        done();
    });

    it('supports xml attributes', function(done) {
        expect(xml([ { b: { _attr: {} } } ]), '<b/>');
        expect(xml([ { a: { _attr: { attribute1: 'some value', attribute2: 12345 } } } ])).to.equal('<a attribute1="some value" attribute2="12345"/>');
        expect(xml([ { a: [{ _attr: { attribute1: 'some value', attribute2: 12345 } }] } ])).to.equal('<a attribute1="some value" attribute2="12345"></a>');
        expect(xml([ { a: [{ _attr: { attribute1: 'some value', attribute2: 12345 } }, 'content'] } ])).to.equal('<a attribute1="some value" attribute2="12345">content</a>');
        done();
    });

    it('supports cdata', function(done) {
        expect(xml([ { a: { _cdata: 'This is some <strong>CDATA</strong>' } } ])).to.equal('<a><![CDATA[This is some <strong>CDATA</strong>]]></a>');
        expect(xml([ { a: { _attr: { attribute1: 'some value', attribute2: 12345 },  _cdata: 'This is some <strong>CDATA</strong>' } } ])).to.equal('<a attribute1="some value" attribute2="12345"><![CDATA[This is some <strong>CDATA</strong>]]></a>');
        expect(xml([ { a: { _cdata: 'This is some <strong>CDATA</strong> with ]]> and then again ]]>' } } ])).to.equal('<a><![CDATA[This is some <strong>CDATA</strong> with ]]]]><![CDATA[> and then again ]]]]><![CDATA[>]]></a>');
        done();
    });

    it('supports encoding', function(done) {
        expect(xml([ { a: [ {  _attr: { anglebrackets: 'this is <strong>strong</strong>', url: 'http://google.com?s=opower&y=fun' } }, 'text'] } ]), '<a anglebrackets="this is &lt;strong&gt;strong&lt;/strong&gt;" url="http://google.com?s=opower&amp;y=fun">text</a>');
        done();
    });

    it('supports stream interface', function (done) {
        var elem = xml.element({ _attr: { decade: '80s', locale: 'US'} });
        var xmlStream = xml({ toys: elem }, { stream: true });
        var results = ['<toys decade="80s" locale="US">','<toy>Transformers</toy>','<toy><name>He-man</name></toy>','<toy>GI Joe</toy>','</toys>'];

        xmlStream.on('data', function (stanza) {
            expect(stanza).to.equal(results.shift());
        });
        xmlStream.on('close', function () {
            expect(results).to.be.be.empty;
            done();
        });

        elem.push({ toy: 'Transformers' });
        elem.push({ toy: [ { name: 'He-man' } ] });
        setTimeout(function () {
            elem.push({ toy: 'GI Joe' });
            elem.close();
        }, 10);
    });

    it('xml declaration options', function(done) {
        expect(xml([ { a: 'test' }], { declaration: true })).to.equal('<?xml version="1.0" encoding="UTF-8"?><a>test</a>');
        expect(xml([ { a: 'test' }], { declaration: {encoding: 'foo' }})).to.equal('<?xml version="1.0" encoding="foo"?><a>test</a>');
        expect(xml([ { a: 'test' }], { declaration: {standalone: 'yes' }})).to.equal('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><a>test</a>');
        expect(xml([ { a: 'test' }], { declaration: false })).to.equal('<a>test</a>');
        expect(xml([ { a: 'test' }], { declaration: true, indent: '\n' })).to.equal('<?xml version="1.0" encoding="UTF-8"?>\n<a>test</a>');
        expect(xml([ { a: 'test' }], {})).to.equal('<a>test</a>');
        done();
    });

});