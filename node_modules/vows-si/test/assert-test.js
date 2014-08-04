var vows = require('../lib/vows');
var assert = require('assert');

vows.describe('vows/assert').addBatch({
    "The Assertion module": {
        "`equal`": function () {
            assert.equal("hello world", "hello world");
            assert.equal(1, true);
        },
        "`epsilon`": function() {
            assert.epsilon(1e-5, 0.1+0.2, 0.3);
        },
        "`match`": function () {
            assert.match("hello world", /^[a-z]+ [a-z]+$/);
        },
        "`lengthOf`": function () {
            assert.lengthOf("hello world", 11);
            assert.lengthOf([1, 2, 3], 3);
            assert.lengthOf({goo: true, gies: false}, 2);
        },
        "`isDefined`": function () {
            assert.isDefined(null);
            assertError(assert.isDefined, undefined);
        },
        "`include`": function () {
            assert.include("hello world", "world");
            assert.include([0, 42, 0],    42);
            assert.include({goo:true},    'goo');
        },
        "`deepInclude`": function () {
            assert.deepInclude([{a:'b'},{c:'d'}], {a:'b'});
            assert.deepInclude("hello world", "world");
            assert.deepInclude({goo:true},    'goo');
        },
        "`typeOf`": function () {
            assert.typeOf('goo', 'string');
            assert.typeOf(42,    'number');
            assert.typeOf([],    'array');
            assert.typeOf({},    'object');
            assert.typeOf(false, 'boolean');
        },
        "`instanceOf`": function () {
            assert.instanceOf([], Array);
            assert.instanceOf(function () {}, Function);
        },
        "`isArray`": function () {
            assert.isArray([]);
            assertError(assert.isArray, {});
        },
        "`isString`": function () {
            assert.isString("");
        },
        "`isObject`": function () {
            assert.isObject({});
            assertError(assert.isObject, []);
        },
        "`isNumber`": function () {
            assert.isNumber(0);
        },
        "`isBoolean`": function (){
            assert.isBoolean(true);
            assert.isBoolean(false);
            assertError(assert.isBoolean, 0);
        },
        "`isNan`": function () {
            assert.isNaN(0/0);
        },
        "`isTrue`": function () {
            assert.isTrue(true);
            assertError(assert.isTrue, 1);
        },
        "`isFalse`": function () {
            assert.isFalse(false);
            assertError(assert.isFalse, 0);
        },
        "`isZero`": function () {
            assert.isZero(0);
            assertError(assert.isZero, null);
        },
        "`isNotZero`": function () {
            assert.isNotZero(1);
        },
        "`isUndefined`": function () {
            assert.isUndefined(undefined);
            assertError(assert.isUndefined, null);
        },
        "`isDefined`": function () {
            assert.isDefined(null);
            assertError(assert.isDefined, undefined);
        },
        "`isNull`": function () {
            assert.isNull(null);
            assertError(assert.isNull, 0);
            assertError(assert.isNull, undefined);
        },
        "`isNotNull`": function () {
            assert.isNotNull(0);
        },
        "`greater` and `lesser`": function () {
            assert.greater(5, 4);
            assert.lesser(4, 5);
        },
        "`inDelta`": function () {
            assert.inDelta(42, 40, 5);
            assert.inDelta(42, 40, 2);
            assert.inDelta(42, 42, 0);
            assert.inDelta(3.1, 3.0, 0.2);
            assertError(assert.inDelta, [42, 40, 1]);
        },
        "`isEmpty`": function () {
            assert.isEmpty({});
            assert.isEmpty([]);
            assert.isEmpty("");
        },
        "`isNotEmpty`": function () {
            assert.isNotEmpty({goo:true});
            assert.isNotEmpty([1]);
            assert.isNotEmpty(" ");
            assertError(assert.isNotEmpty, {});
            assertError(assert.isNotEmpty, []);
            assertError(assert.isNotEmpty, "");
        }
    }
}).export(module);

function assertError(assertion, args, fail) {
    if (!Array.isArray(args)) { args = [args]; }
    try {
        assertion.apply(null, args);
        fail = true;
    } catch (e) {/* Success */}

    fail && assert.fail(args.join(' '), assert.AssertionError,
                               "expected an AssertionError for {actual}",
                               "assertError", assertError);
}

