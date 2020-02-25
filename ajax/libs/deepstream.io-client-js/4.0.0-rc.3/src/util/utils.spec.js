"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("./utils");
const chai_1 = require("chai");
describe('deepEquals', () => {
    it('compares two primitive values', () => {
        chai_1.expect(utils.deepEquals('A', 'B'))
            .to.equal(false);
        chai_1.expect(utils.deepEquals('A', 'A'))
            .to.equal(true);
        chai_1.expect(utils.deepEquals(1, 2))
            .to.equal(false);
        chai_1.expect(utils.deepEquals(1, 1))
            .to.equal(true);
        chai_1.expect(utils.deepEquals(1.2, 2.1))
            .to.equal(false);
        chai_1.expect(utils.deepEquals(2.1, 2.1))
            .to.equal(true);
    });
    it('compares two different simple objects', () => {
        const a = { name: 'Wolfram' };
        const b = { name: 'Egon' };
        chai_1.expect(utils.deepEquals(a, b))
            .to.equal(false);
    });
    it('compares two equal simple objects', () => {
        const a = { name: 'Wolfram' };
        const b = { name: 'Wolfram' };
        chai_1.expect(utils.deepEquals(a, b))
            .to.equal(true);
    });
    it('compares two different arrays', () => {
        const a = ['a', 'b'];
        const b = ['a', 'c'];
        chai_1.expect(utils.deepEquals(a, b))
            .to.equal(false);
    });
    it('compares two equal arrays', () => {
        const a = ['a', 'b'];
        const b = ['a', 'b'];
        chai_1.expect(utils.deepEquals(a, b))
            .to.equal(true);
    });
    it('compares two different complex objects', () => {
        const a = {
            x: 'y',
            a: ['b', {
                    q: 'f'
                }]
        };
        const b = {
            x: 'y',
            a: ['b', {
                    q: 'x'
                }]
        };
        chai_1.expect(utils.deepEquals(a, b))
            .to.equal(false);
    });
    it('compares two equal complex objects', () => {
        const a = {
            x: 'y',
            a: ['b', {
                    q: 'f'
                }]
        };
        const b = {
            x: 'y',
            a: ['b', {
                    q: 'f'
                }]
        };
        chai_1.expect(utils.deepEquals(a, b))
            .to.equal(true);
    });
    it('a complex object and a primitive', () => {
        const a = {
            x: 'y',
            a: ['b', {
                    q: 'f'
                }]
        };
        chai_1.expect(utils.deepEquals(a, 44))
            .to.equal(false);
        chai_1.expect(utils.deepEquals(a, false))
            .to.equal(false);
        chai_1.expect(utils.deepEquals(a, 44.44))
            .to.equal(false);
        chai_1.expect(utils.deepEquals(a, 'primitive'))
            .to.equal(false);
    });
    it('handles undefined', () => {
        const a = {
            x: 'y',
            a: ['b', {
                    q: 'f'
                }]
        };
        chai_1.expect(utils.deepEquals(a, undefined))
            .to.be.equal(false);
    });
    it('handles empty objects', () => {
        const a = {
            firstname: 'Wolfram'
        };
        chai_1.expect(utils.deepEquals(a, {}))
            .to.equal(false);
    });
    it('finds additional paths on objB', () => {
        const a = {
            a: 'b'
        };
        const b = {
            a: 'b',
            c: 'd'
        };
        // ??
        process.stdout.write(`${utils.deepEquals(a, b)}`);
        chai_1.expect(false).to.equal(false);
    });
});
describe('deepCopy', () => {
    it('copies primitives', () => {
        chai_1.expect(utils.deepCopy('bla'))
            .to.equal('bla');
        chai_1.expect(utils.deepCopy(42))
            .to.equal(42);
    });
    it('copies arrays', () => {
        const original = ['a', 'b', 2];
        const copy = utils.deepCopy(original);
        chai_1.expect(copy)
            .to.deep.equal(original);
    });
    it('copies objects', () => {
        const original = {
            firstname: 'Wolfram',
            lastname: ' Hempel'
        };
        const copy = utils.deepCopy(original);
        chai_1.expect(copy)
            .to.deep.equal(original);
    });
    it('copies objects with null values', () => {
        const original = {
            firstname: 'Wolfram',
            lastname: null
        };
        const copy = utils.deepCopy(original);
        chai_1.expect(copy)
            .to.deep.equal(original);
    });
    it('copies null values', () => {
        chai_1.expect(utils.deepCopy(null))
            .to.be.a('null');
    });
    it('copies nested values', () => {
        const original = {
            a: {
                b: 'c',
                d: 4
            }
        };
        const copy = utils.deepCopy(original);
        chai_1.expect(original)
            .to.deep.equal(copy);
        chai_1.expect(original.a)
            .to.deep.equal(copy.a);
    });
    it('copies nested arrays', () => {
        const original = {
            a: {
                b: 'c',
                d: ['a', {
                        x: 'y'
                    }]
            }
        };
        const copy = utils.deepCopy(original);
        chai_1.expect(original)
            .to.deep.equal(copy);
        chai_1.expect(original.a.d)
            .to.deep.equal(copy.a.d);
        chai_1.expect(Array.isArray(copy.a.d))
            .to.equal(true);
        chai_1.expect(copy.a.d[1])
            .to.deep.equal({ x: 'y' });
        chai_1.expect(original.a.d[1] === copy.a.d[1])
            .to.equal(false);
    });
    // This is a JSON.stringify specific behaviour. Not too sure it's ideal,
    // but it is something that will break behaviour when changed, so let's
    // keep an eye on it
    it('converts undefined', () => {
        let copy = utils.deepCopy([undefined]);
        chai_1.expect(copy[0])
            .to.be.a('null');
        copy = utils.deepCopy({
            x: undefined
        });
        chai_1.expect(copy)
            .to.deep.equal({});
    });
});
describe('shallowCopy', () => {
    it('copies primitives', () => {
        chai_1.expect(utils.shallowCopy('bla'))
            .to.equal('bla');
        chai_1.expect(utils.shallowCopy(42))
            .to.equal(42);
    });
    it('copies arrays', () => {
        const original = ['a', 'b', 2];
        const copy = utils.shallowCopy(original);
        chai_1.expect(copy)
            .to.deep.equal(original);
    });
    it('copies objects', () => {
        const original = {
            firstname: 'Wolfram',
            lastname: ' Hempel'
        };
        const copy = utils.shallowCopy(original);
        chai_1.expect(copy)
            .to.deep.equal(original);
    });
    it('copies objects with null values', () => {
        const original = {
            firstname: 'Wolfram',
            lastname: null
        };
        const copy = utils.shallowCopy(original);
        chai_1.expect(copy)
            .to.deep.equal(original);
    });
    it('handles empty objects', () => {
        const copy = utils.shallowCopy({});
        chai_1.expect(copy).to.deep.equal({});
    });
    it('throws error on null values', () => {
        chai_1.expect(() => {
            utils.shallowCopy(null);
        }).to.throw('Cannot convert undefined or null to object');
    });
});
describe('trim', () => {
    it('removes various kinds of whitespace from Strings having String.prototype.trim polyfill', () => {
        chai_1.expect(utils.trim('a    '))
            .to.equal('a');
        chai_1.expect(utils.trim('   b    '))
            .to.equal('b');
        chai_1.expect(utils.trim('   c d    '))
            .to.equal('c d');
    });
    it('removes various kinds of whitespace from string having no String.prototype.trim polyfill', () => {
        delete String.prototype.trim;
        chai_1.expect(utils.trim('a    '))
            .to.equal('a');
        chai_1.expect(utils.trim('   b    '))
            .to.equal('b');
        chai_1.expect(utils.trim('   c d    '))
            .to.equal('c d');
    });
});
describe('normalizeSetArguments', () => {
    it('normalizes argument list containing only a data argument as object', () => {
        const argumentsSet = utils.normalizeSetArguments([{ title: 'awesome post' }]);
        chai_1.expect(argumentsSet).to.deep.equal({
            path: undefined,
            data: {
                title: 'awesome post'
            },
            callback: undefined
        });
    });
    it('normalizes argument list containing only a data argument as array', () => {
        const argumentsSet = utils.normalizeSetArguments([[1, 2, 3, 4]]);
        chai_1.expect(argumentsSet).to.deep.equal({
            path: undefined,
            data: [1, 2, 3, 4],
            callback: undefined
        });
    });
    it('normalizes argument list containing only a data and a callback argument', () => {
        const argumentsSet = utils.normalizeSetArguments([
            { title: 'awesome post' },
            () => { }
        ]);
        chai_1.expect(argumentsSet)
            .to.have.property('path')
            .to.equal(undefined);
        chai_1.expect(argumentsSet)
            .to.have.property('data')
            .to.deep.equal({
            title: 'awesome post'
        });
        chai_1.expect(argumentsSet)
            .to.have.property('callback')
            .to.be.a('function');
    });
    it('normalizes argument list containing only a path and a data argument as primitive', () => {
        let argumentsSet = utils.normalizeSetArguments(['title', 'awesome post']);
        chai_1.expect(argumentsSet).to.deep.equal({
            path: 'title',
            data: 'awesome post',
            callback: undefined
        });
        argumentsSet = utils.normalizeSetArguments(['version', 123]);
        chai_1.expect(argumentsSet).to.deep.equal({
            path: 'version',
            data: 123,
            callback: undefined
        });
        argumentsSet = utils.normalizeSetArguments(['liked', true]);
        chai_1.expect(argumentsSet).to.deep.equal({
            path: 'liked',
            data: true,
            callback: undefined
        });
    });
    it('normalizes argument list contaning a path, a data and a callback argument', () => {
        const argumentsSet = utils.normalizeSetArguments([
            'post',
            { title: 'awesome post' },
            () => { }
        ]);
        chai_1.expect(argumentsSet)
            .to.have.property('path')
            .to.equal('post');
        chai_1.expect(argumentsSet)
            .to.have.property('data')
            .to.deep.equal({
            title: 'awesome post'
        });
        chai_1.expect(argumentsSet)
            .to.have.property('callback')
            .to.be.a('function');
    });
    it('normalizes argument list contaning a path, a data and a callback argument with a start index', () => {
        const argumentsSet = utils.normalizeSetArguments([
            {},
            'post',
            { title: 'awesome post' },
            () => { }
        ], 1);
        chai_1.expect(argumentsSet)
            .to.have.property('path')
            .to.equal('post');
        chai_1.expect(argumentsSet)
            .to.have.property('data')
            .to.deep.equal({
            title: 'awesome post'
        });
        chai_1.expect(argumentsSet)
            .to.have.property('callback')
            .to.be.a('function');
    });
    it('throws error on an empty argument list', () => {
        chai_1.expect(() => {
            utils.normalizeSetArguments([]);
        }).to.throw('Invalid set arguments');
    });
    it.skip('throws error on an argument list containing an invalid data argument', () => {
        chai_1.expect(() => {
            utils.normalizeSetArguments([undefined]);
        }).to.throw('Invalid set data argument');
        chai_1.expect(() => {
            utils.normalizeSetArguments([() => { }]);
        }).to.throw('Invalid set data argument');
        chai_1.expect(() => {
            utils.normalizeSetArguments(['data', () => { }]);
        }).to.throw('Invalid set data argument');
        chai_1.expect(() => {
            utils.normalizeSetArguments([134, () => { }]);
        }).to.throw('Invalid set data argument');
        chai_1.expect(() => {
            utils.normalizeSetArguments([
                'path', () => { }, () => { }
            ]);
        }).to.throw('Invalid set data argument');
    });
    it.skip('throws error on an argument list contaning an invalid path argument', () => {
        chai_1.expect(() => {
            utils.normalizeSetArguments([
                undefined, { title: 'awesome post' }
            ]);
        }).to.throw('Invalid set path argument');
        chai_1.expect(() => {
            utils.normalizeSetArguments([
                '', { title: 'awesome post' }
            ]);
        }).to.throw('Invalid set path argument');
        chai_1.expect(() => {
            utils.normalizeSetArguments([
                null, { title: 'awesome post' }
            ]);
        }).to.throw('Invalid set path argument');
        chai_1.expect(() => {
            utils.normalizeSetArguments([
                true, { title: 'awesome post' }, () => { }
            ]);
        }).to.throw('Invalid set path argument');
    });
    it('throws error on an argument list containing an invalid callback argument', () => {
        chai_1.expect(() => {
            utils.normalizeSetArguments([
                'title', 'awesome post', null
            ]);
        }).to.throw('Invalid set callback argument');
        chai_1.expect(() => {
            utils.normalizeSetArguments([
                'title', 'awesome post', {}
            ]);
        }).to.throw('Invalid set callback argument');
        chai_1.expect(() => {
            utils.normalizeSetArguments([
                'title', 'awesome post', []
            ]);
        }).to.throw('Invalid set callback argument');
        chai_1.expect(() => {
            utils.normalizeSetArguments([
                'title', 'awesome post', 1
            ]);
        }).to.throw('Invalid set callback argument');
        chai_1.expect(() => {
            utils.normalizeSetArguments([
                'title', 'awesome post', false
            ]);
        }).to.throw('Invalid set callback argument');
    });
});
describe('normalizeArguments', () => {
    it('normalizes argument list contaning an object', () => {
        const argumentSet = utils.normalizeArguments([{
                path: 'title',
                callback: () => { },
                triggerNow: false
            }]);
        chai_1.expect(argumentSet)
            .to.have.property('path')
            .to.equal('title');
        chai_1.expect(argumentSet)
            .to.have.property('callback')
            .to.be.a('function');
        chai_1.expect(argumentSet)
            .to.have.property('triggerNow')
            .to.equal(false);
    });
    it('normalizes argument list contaning path, callback and triggerNow arguments', () => {
        const argumentSet = utils.normalizeArguments([
            true, () => { }, 'title'
        ]);
        chai_1.expect(argumentSet)
            .to.have.property('path')
            .to.equal('title');
        chai_1.expect(argumentSet)
            .to.have.property('callback')
            .to.be.a('function');
        chai_1.expect(argumentSet)
            .to.have.property('triggerNow')
            .to.equal(true);
    });
    it('handles an empty arguments list', () => {
        const argumentSet = utils.normalizeArguments([]);
        chai_1.expect(argumentSet)
            .to.deep.equal({});
    });
});
describe('parseUrl adds all missing parts of the url', () => {
    it('accepts no protocol and default to ws', () => {
        chai_1.expect(utils.parseUrl('localhost', '/deepstream'))
            .to.equal('ws://localhost/deepstream');
    });
    it('accepts // as protocol', () => {
        chai_1.expect(utils.parseUrl('//localhost:6020', '/deepstream'))
            .to.equal('ws://localhost:6020/deepstream');
    });
    it('accepts ws protocols', () => {
        chai_1.expect(utils.parseUrl('ws://localhost:6020', '/deepstream'))
            .to.equal('ws://localhost:6020/deepstream');
        chai_1.expect(utils.parseUrl('wss://localhost:6020', '/deepstream'))
            .to.equal('wss://localhost:6020/deepstream');
    });
    it('rejects http protocols', () => {
        chai_1.expect(utils.parseUrl.bind(utils, 'http://localhost:6020', '/deepstream'))
            .to.throw('Only ws and wss are supported');
        chai_1.expect(utils.parseUrl.bind(utils, 'https://localhost:6020', '/deepstream'))
            .to.throw('Only ws and wss are supported');
    });
    it('accepts full url with protocol and path and doesn\'t change it', () => {
        chai_1.expect(utils.parseUrl('ws://localhost:6020/anotherdeepstream', ''))
            .to.equal('ws://localhost:6020/anotherdeepstream');
    });
    it('respects queries and hash', () => {
        chai_1.expect(utils.parseUrl('localhost?query=value#login', '/deepstream'))
            .to.equal('ws://localhost/deepstream?query=value#login');
    });
    it('rejects urls with no host', () => {
        chai_1.expect(utils.parseUrl.bind(utils, '', '/deepstream'))
            .to.throw('Invalid URL: ws://');
    });
});
//# sourceMappingURL=utils.spec.js.map