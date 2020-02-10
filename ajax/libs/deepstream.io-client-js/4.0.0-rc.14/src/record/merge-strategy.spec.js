"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var sinon_1 = require("sinon");
var MERGE_STRATEGIES = require("./merge-strategy");
describe('merge strategies @unit', function () {
    var localData;
    var localVersion;
    describe('remote wins', function () {
        beforeEach(function () {
            this.mergeCallback = sinon_1.spy();
            localVersion = 1;
            localData = { type: 'local' };
            MERGE_STRATEGIES.REMOTE_WINS(localData, localVersion, {
                type: 'remote'
            }, 5, this.mergeCallback);
        });
        it('returns the remote data', function () {
            chai_1.expect(this.mergeCallback.calledOnce)
                .to.equal(true);
            chai_1.expect(this.mergeCallback.calledWith(null, { type: 'remote' }))
                .to.equal(true);
        });
    });
    describe('local wins', function () {
        beforeEach(function () {
            this.mergeCallback = sinon_1.spy();
            this.record = {
                get: function () {
                    return {
                        type: 'local'
                    };
                }
            };
            MERGE_STRATEGIES.LOCAL_WINS(localData, localVersion, {
                type: 'remote'
            }, 5, this.mergeCallback);
        });
        it('returns the remote data', function () {
            chai_1.expect(this.mergeCallback.calledOnce)
                .to.equal(true);
            chai_1.expect(this.mergeCallback.calledWith(null, { type: 'local' }))
                .to.equal(true);
        });
    });
});
