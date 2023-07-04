"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("babel-polyfill");
const bluebird_1 = __importDefault(require("bluebird"));
const _1 = require(".");
const tweenable_1 = require("./tweenable");
const now = _1.Tweenable.now;
let tweenable, state;
beforeEach(() => {
    tweenable = new _1.Tweenable();
});
afterEach(() => {
    (0, tweenable_1.resetList)();
    _1.Tweenable.now = now;
});
test('can accept initial state', () => {
    tweenable = new _1.Tweenable({ x: 5 });
    _1.Tweenable.now = () => 0;
    tweenable.tween({
        to: { x: 10 },
        duration: 1000,
        render: function (_state) {
            state = _state;
        },
    });
    _1.Tweenable.now = () => 500;
    (0, tweenable_1.processTweens)();
    expect(state.x).toEqual(7.5);
});
describe('#tween', () => {
    test('midpoints of a tween are correctly computed', () => {
        _1.Tweenable.now = () => 0;
        tweenable.tween({
            from: { x: 0 },
            to: { x: 100 },
            duration: 1000,
        });
        expect(tweenable.state.x).toEqual(0);
        _1.Tweenable.now = () => 500;
        (0, tweenable_1.processTweens)();
        expect(tweenable.state.x).toEqual(50);
        _1.Tweenable.now = () => 1000;
        (0, tweenable_1.processTweens)();
        expect(tweenable.state.x).toEqual(100);
        _1.Tweenable.now = () => 100000;
        (0, tweenable_1.processTweens)();
        expect(tweenable.state.x).toEqual(100);
    });
    test('render handler receives timestamp offset', () => {
        _1.Tweenable.now = () => 0;
        let capturedOffset;
        tweenable.tween({
            from: { x: 0 },
            to: { x: 100 },
            duration: 1000,
            render: function (_state, offset) {
                capturedOffset = offset;
            },
        });
        _1.Tweenable.now = () => 500;
        (0, tweenable_1.processTweens)();
        expect(capturedOffset).toEqual(500);
    });
    describe('custom easing functions', () => {
        let easingFn = (pos) => pos * 2;
        test('can be given an easing function directly', () => {
            _1.Tweenable.now = () => 0;
            tweenable.tween({
                from: { x: 0 },
                to: { x: 10 },
                duration: 1000,
                easing: easingFn,
            });
            expect(tweenable.state.x).toEqual(0);
            _1.Tweenable.now = () => 500;
            (0, tweenable_1.processTweens)();
            expect(tweenable.state.x).toEqual(10);
            _1.Tweenable.now = () => 1000;
            (0, tweenable_1.processTweens)();
            expect(tweenable.state.x).toEqual(20);
        });
        test('can be given an Object of easing functions directly', () => {
            _1.Tweenable.now = () => 0;
            tweenable.tween({
                from: { x: 0 },
                to: { x: 10 },
                duration: 1000,
                easing: { x: easingFn },
            });
            expect(tweenable.state.x).toEqual(0);
            _1.Tweenable.now = () => 500;
            (0, tweenable_1.processTweens)();
            expect(tweenable.state.x).toEqual(10);
            _1.Tweenable.now = () => 1000;
            (0, tweenable_1.processTweens)();
            expect(tweenable.state.x).toEqual(20);
        });
        test('supports tokens', () => {
            _1.Tweenable.now = () => 0;
            easingFn = pos => pos;
            tweenable.tween({
                from: { x: 'rgb(0,0,0)' },
                to: { x: 'rgb(255,255,255)' },
                duration: 1000,
                easing: { x: easingFn },
            });
            expect(tweenable.state.x).toEqual('rgb(0,0,0)');
            _1.Tweenable.now = () => 500;
            (0, tweenable_1.processTweens)();
            expect(tweenable.state.x).toEqual('rgb(127,127,127)');
            _1.Tweenable.now = () => 1000;
            (0, tweenable_1.processTweens)();
            expect(tweenable.state.x).toEqual('rgb(255,255,255)');
        });
    });
    describe('cubic bezier array easing', () => {
        test('accepts bezier point array for easing', () => {
            _1.Tweenable.now = () => 0;
            tweenable.tween({
                from: { x: 0 },
                to: { x: 10 },
                duration: 1000,
                easing: [0, 1, 0, 1],
            });
            expect(tweenable.state.x).toEqual(0);
            _1.Tweenable.now = () => 500;
            (0, tweenable_1.processTweens)();
            expect(tweenable.state.x).toEqual(9.914547270233196);
            _1.Tweenable.now = () => 1000;
            (0, tweenable_1.processTweens)();
            expect(tweenable.state.x).toEqual(10);
        });
        test('defaults to linear bezier point array for easing', () => {
            _1.Tweenable.now = () => 0;
            tweenable.tween({
                from: { x: 0 },
                to: { x: 10 },
                duration: 1000,
                easing: [],
            });
            expect(tweenable.state.x).toEqual(0);
            _1.Tweenable.now = () => 500;
            (0, tweenable_1.processTweens)();
            expect(tweenable.state.x).toEqual(5);
            _1.Tweenable.now = () => 1000;
            (0, tweenable_1.processTweens)();
            expect(tweenable.state.x).toEqual(10);
        });
    });
    describe('lifecycle hooks', () => {
        let testState;
        describe('render', () => {
            test('receives the current state', () => {
                _1.Tweenable.now = () => 0;
                tweenable = new _1.Tweenable();
                tweenable.tween({
                    from: { x: 0 },
                    to: { x: 10 },
                    duration: 500,
                    render: currentState => (testState = currentState),
                });
                _1.Tweenable.now = () => 250;
                (0, tweenable_1.processTweens)();
                expect(testState).toEqual({ x: 5 });
            });
        });
        describe('start', () => {
            test('receives the current state', () => {
                _1.Tweenable.now = () => 0;
                tweenable = new _1.Tweenable();
                tweenable.tween({
                    from: { x: 0 },
                    to: { x: 10 },
                    duration: 500,
                    start: currentState => (testState = currentState),
                });
                _1.Tweenable.now = () => 500;
                (0, tweenable_1.processTweens)();
                expect(testState).toEqual({ x: 0 });
            });
        });
    });
    describe('promise support', () => {
        test('supports third party libraries', () => {
            const { _promiseCtor } = tweenable.tween({
                promise: bluebird_1.default,
                from: { x: 0 },
                to: { x: 10 },
                duration: 500,
            });
            expect(_promiseCtor).toEqual(bluebird_1.default);
        });
        describe('resolution', () => {
            let testState;
            beforeAll(() => {
                _1.Tweenable.now = () => 0;
                tweenable = new _1.Tweenable();
                const tween = tweenable
                    .tween({
                    from: { x: 0 },
                    to: { x: 10 },
                    duration: 500,
                })
                    .then(promisedData => {
                    testState = promisedData.state;
                    return promisedData;
                });
                _1.Tweenable.now = () => 500;
                (0, tweenable_1.processTweens)();
                return tween;
            });
            test('resolves with final state', () => {
                expect(testState).toEqual({ x: 10 });
            });
        });
        describe('finally', () => {
            test('runs finally with no parameters', done => {
                _1.Tweenable.now = () => 0;
                tweenable = new _1.Tweenable();
                const tween = tweenable.tween({
                    from: { x: 0 },
                    to: { x: 10 },
                    duration: 500,
                });
                tween
                    .catch(_ => _)
                    .finally((state) => {
                    expect(state).toEqual(undefined);
                    done();
                });
                _1.Tweenable.now = () => 250;
                (0, tweenable_1.processTweens)();
                tween.cancel();
            });
        });
        describe('rejection', () => {
            let testState;
            test('rejects with final state', done => {
                _1.Tweenable.now = () => 0;
                tweenable = new _1.Tweenable();
                const tween = tweenable.tween({
                    from: { x: 0 },
                    to: { x: 10 },
                    duration: 500,
                });
                tween.catch(promisedData => {
                    testState = promisedData.state;
                    return promisedData;
                });
                _1.Tweenable.now = () => 250;
                (0, tweenable_1.processTweens)();
                tween.cancel();
                // Needs to be deferred to the next tick so the catch handler runs
                setTimeout(() => {
                    expect(testState).toEqual({ x: 5 });
                    done();
                });
            });
        });
    });
    describe('re-tweening previously paused tweens', () => {
        test('uses correct _timestamp', () => {
            _1.Tweenable.now = () => 0;
            tweenable.tween({});
            _1.Tweenable.now = () => 250;
            tweenable.pause();
            expect(tweenable._timestamp).toEqual(0);
            _1.Tweenable.now = () => 500;
            tweenable.tween();
            expect(tweenable._timestamp).toEqual(500);
        });
    });
    describe('tween is already running', () => {
        test('stops the old tween and starts the new one', () => {
            _1.Tweenable.now = () => 0;
            tweenable = new _1.Tweenable();
            tweenable.tween({
                from: { x: 0 },
                to: { x: 10 },
                duration: 500,
            });
            _1.Tweenable.now = () => 250;
            (0, tweenable_1.processTweens)();
            jest.spyOn(tweenable, 'stop');
            tweenable.tween({
                from: { x: 10 },
                to: { x: 20 },
                duration: 500,
            });
            expect(tweenable.stop).toHaveBeenCalled();
            expect(tweenable.isPlaying).toEqual(true);
        });
    });
    describe('config reuse', () => {
        test('reuses relevant config data from previous tweens', () => {
            const start = (_) => _;
            const render = (_) => _;
            _1.Tweenable.now = () => 0;
            tweenable = new _1.Tweenable();
            tweenable.tween({
                from: { x: 0 },
                to: { x: 10 },
                duration: 500,
                start,
                render,
            });
            _1.Tweenable.now = () => 500;
            (0, tweenable_1.processTweens)();
            tweenable.tween({
                to: { x: 20 },
            });
            expect(tweenable._start).toBe(start);
            expect(tweenable._render).toBe(render);
            expect(tweenable._currentState).toEqual({ x: 10 });
            expect(tweenable._targetState).toEqual({ x: 20 });
        });
    });
});
describe('#hasEnded', () => {
    test('Only trigger after the end of the tween', () => {
        tweenable = new _1.Tweenable();
        tweenable.tween({
            from: { x: 0 },
            to: { x: 10 },
            duration: 500,
        });
        expect(tweenable.hasEnded).toBe(false);
        tweenable.seek(500);
        expect(tweenable.hasEnded).toBe(true);
    });
    test('Triggers again after restarting the tween', () => {
        tweenable = new _1.Tweenable();
        tweenable.tween({
            from: { x: 0 },
            to: { x: 10 },
            duration: 500,
        });
        tweenable.seek(500);
        expect(tweenable.hasEnded).toBe(true);
        tweenable.seek(0);
        expect(tweenable.hasEnded).toBe(false);
    });
});
describe('#resume', () => {
    beforeEach(() => {
        _1.Tweenable.now = () => 0;
    });
    test('calls tween if not called previously', () => {
        jest.spyOn(tweenable, 'tween');
        tweenable.resume();
        expect(tweenable.tween).toHaveBeenCalled();
    });
    test('shifts timestamp to account for amount of time paused', () => {
        tweenable.tween();
        expect(tweenable._timestamp).toEqual(0);
        _1.Tweenable.now = () => 500;
        tweenable.pause();
        _1.Tweenable.now = () => 750;
        tweenable.resume();
        expect(tweenable._timestamp).toEqual(250);
    });
});
describe('#pause', () => {
    test('moves the end time of the tween', () => {
        _1.Tweenable.now = () => 0;
        tweenable.tween({
            from: { x: 0 },
            to: { x: 100 },
            duration: 1000,
        });
        _1.Tweenable.now = () => 500;
        (0, tweenable_1.processTweens)();
        expect(tweenable.state.x).toEqual(50);
        tweenable.pause();
        _1.Tweenable.now = () => 2000;
        tweenable.resume();
        (0, tweenable_1.processTweens)();
        expect(tweenable.state.x).toEqual(50);
        _1.Tweenable.now = () => 2500;
        (0, tweenable_1.processTweens)();
        expect(tweenable.state.x).toEqual(100);
    });
});
describe('#seek', () => {
    test('forces the tween to a specific point on the timeline', () => {
        _1.Tweenable.now = () => 0;
        tweenable.tween({
            from: { x: 0 },
            to: { x: 100 },
            duration: 1000,
        });
        tweenable.seek(500);
        expect(tweenable._timestamp).toEqual(-500);
    });
    test('provides correct value to render handler via seek() (issue #77)', () => {
        let computedX;
        tweenable = new _1.Tweenable(undefined, {
            from: { x: 0 },
            to: { x: 100 },
            duration: 1000,
            render: function (state) {
                computedX = state.x;
            },
        });
        tweenable.seek(500);
        expect(computedX).toEqual(50);
    });
    test('The seek() parameter cannot be less than 0', () => {
        _1.Tweenable.now = () => 0;
        tweenable.tween({
            from: { x: 0 },
            to: { x: 100 },
            duration: 1000,
        });
        tweenable.seek(-500);
        expect(tweenable._timestamp).toEqual(0);
    });
    test('no-ops if seeking to the current millisecond', () => {
        let renderHandlerCallCount = 0;
        _1.Tweenable.now = () => 0;
        tweenable.tween({
            from: { x: 0 },
            to: { x: 100 },
            duration: 1000,
            render: () => {
                renderHandlerCallCount++;
            },
        });
        tweenable.seek(50);
        expect(renderHandlerCallCount).toEqual(1);
        tweenable.stop();
        tweenable.seek(50);
        expect(renderHandlerCallCount).toEqual(1);
    });
    test('keeps time reference (rel #60)', () => {
        tweenable = new _1.Tweenable({}, {
            from: { x: 0 },
            to: { x: 100 },
            duration: 100,
        });
        // express a delay in time between the both time it's called
        // TODO: This could probably be written in a much clearer way.
        _1.Tweenable.now = () => {
            _1.Tweenable.now = () => {
                return 100;
            };
            return 98;
        };
        let callCount = 0;
        tweenable.stop = () => {
            callCount += 1;
            return tweenable;
        };
        tweenable.seek(98);
        expect(callCount).toEqual(0);
    });
});
describe('#stop', () => {
    test('stop(undefined) leaves a tween where it was stopped', () => {
        _1.Tweenable.now = () => 0;
        tweenable.tween({
            from: { x: 0 },
            to: { x: 100 },
            duration: 1000,
        });
        _1.Tweenable.now = () => 500;
        (0, tweenable_1.processTweens)();
        tweenable.stop();
        expect(tweenable.state.x).toEqual(50);
        expect(tweenable._isPlaying).toEqual(false);
    });
    test('stop(true) skips a tween to the end', () => {
        const tweenable = new _1.Tweenable();
        _1.Tweenable.now = () => 0;
        tweenable.tween({
            from: { x: 0 },
            to: { x: 100 },
            duration: 1000,
        });
        _1.Tweenable.now = () => 500;
        (0, tweenable_1.processTweens)();
        tweenable.stop(true);
        expect(tweenable.state.x).toEqual(100);
    });
    describe('repeated calls (#105)', () => {
        describe('first tween is stopped twice', () => {
            beforeEach(() => {
                _1.Tweenable.now = () => 0;
                const tweenable = (0, _1.tween)({
                    from: { x: 0 },
                    to: { x: 10 },
                    duration: 500,
                });
                (0, _1.tween)({
                    from: { x: 0 },
                    to: { x: 10 },
                    duration: 500,
                });
                _1.Tweenable.now = () => 250;
                (0, tweenable_1.processTweens)();
                tweenable.stop(true);
                tweenable.stop(true);
            });
            test('does not break when multiple tweens are running and stop() is called twice', () => {
                expect(true).toBeTruthy();
            });
        });
        describe('second tween is stopped twice', () => {
            beforeEach(() => {
                _1.Tweenable.now = () => 0;
                (0, _1.tween)({
                    from: { x: 0 },
                    to: { x: 10 },
                    duration: 500,
                });
                const tweenable = (0, _1.tween)({
                    from: { x: 0 },
                    to: { x: 10 },
                    duration: 500,
                });
                _1.Tweenable.now = () => 250;
                (0, tweenable_1.processTweens)();
                tweenable.stop(true);
                tweenable.stop(true);
            });
            test('does not break when multiple tweens are running and stop() is called twice', () => {
                expect(true).toBeTruthy();
            });
        });
    });
});
describe('cancel', () => {
    test('rejects a tween promise', done => {
        _1.Tweenable.now = () => 0;
        const tweenable = new _1.Tweenable();
        (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield tweenable.tween({
                    from: { x: 0 },
                    to: { x: 10 },
                    duration: 500,
                });
            }
            catch (e) {
                expect(e.state.x).toEqual(5);
                done();
            }
        }))();
        // This needs to be deferred until after the async closure above runs.
        setTimeout(() => {
            _1.Tweenable.now = () => 250;
            (0, tweenable_1.processTweens)();
            tweenable.cancel();
        });
    });
});
describe('#setScheduleFunction', () => {
    test('calling setScheduleFunction change the internal schedule function', () => {
        const mockScheduleFunctionCalls = [];
        function mockScheduleFunction(fn, delay) {
            mockScheduleFunctionCalls.push({ fn, delay });
        }
        _1.Tweenable.setScheduleFunction(mockScheduleFunction);
        _1.Tweenable.now = () => 0;
        tweenable.tween({
            from: { x: 0 },
            to: { x: 100 },
            duration: 1000,
        });
        _1.Tweenable.now = () => 500;
        (0, tweenable_1.scheduleUpdate)();
        tweenable.stop(true);
        expect(mockScheduleFunctionCalls.length).toBeTruthy();
        expect(typeof mockScheduleFunctionCalls[0].fn).toEqual('function');
        expect(typeof mockScheduleFunctionCalls[0].delay).toEqual('number');
    });
});
describe('delay support', () => {
    test('tween does not start until delay is met', () => {
        _1.Tweenable.now = () => 0;
        tweenable.tween({
            from: { x: 0 },
            to: { x: 10 },
            delay: 500,
            duration: 1000,
        });
        expect(tweenable.state.x).toEqual(0);
        _1.Tweenable.now = () => 250;
        (0, tweenable_1.processTweens)();
        expect(tweenable.state.x).toEqual(0);
        _1.Tweenable.now = () => 1000;
        (0, tweenable_1.processTweens)();
        expect(tweenable.state.x).toEqual(5);
        _1.Tweenable.now = () => 1500;
        (0, tweenable_1.processTweens)();
        expect(tweenable.state.x).toEqual(10);
        _1.Tweenable.now = () => 99999;
        (0, tweenable_1.processTweens)();
        expect(tweenable.state.x).toEqual(10);
    });
    test('pause() functionality is not affected by delay', () => {
        const delay = 5000;
        _1.Tweenable.now = () => 0;
        tweenable.tween({
            from: { x: 0 },
            to: { x: 100 },
            delay: delay,
            duration: 1000,
        });
        _1.Tweenable.now = () => 500 + delay;
        (0, tweenable_1.processTweens)();
        expect(tweenable.state.x).toEqual(50);
        tweenable.pause();
        _1.Tweenable.now = () => 2000 + delay;
        tweenable.resume();
        (0, tweenable_1.processTweens)();
        expect(tweenable.state.x).toEqual(50);
        _1.Tweenable.now = () => 2500 + delay;
        (0, tweenable_1.processTweens)();
        expect(tweenable.state.x).toEqual(100);
    });
});
describe('static tween', () => {
    test('midpoints of a tween are correctly computed', () => {
        _1.Tweenable.now = () => 0;
        const tweenable = (0, _1.tween)({
            from: { x: 0 },
            to: { x: 100 },
            duration: 1000,
        });
        expect(tweenable.state.x).toEqual(0);
        _1.Tweenable.now = () => 500;
        (0, tweenable_1.processTweens)();
        expect(tweenable.state.x).toEqual(50);
        _1.Tweenable.now = () => 1000;
        (0, tweenable_1.processTweens)();
        expect(tweenable.state.x).toEqual(100);
        _1.Tweenable.now = () => 100000;
        (0, tweenable_1.processTweens)();
        expect(tweenable.state.x).toEqual(100);
    });
});
describe('linked tween list', () => {
    let head, middle, tail;
    beforeEach(() => {
        head = new _1.Tweenable();
        middle = new _1.Tweenable();
        tail = new _1.Tweenable();
    });
    describe('single tweenable', () => {
        beforeEach(() => {
            tweenable.tween({});
        });
        describe('adding to the list', () => {
            test('tween becomes both head and tail', () => {
                expect((0, tweenable_1.getListHead)()).toBe(tweenable);
                expect((0, tweenable_1.getListTail)()).toBe(tweenable);
                expect(tweenable._previous).toBe(null);
                expect(tweenable._next).toBe(null);
            });
        });
        describe('removing from the list', () => {
            describe('pause', () => {
                test('resets head and tail', () => {
                    tweenable.pause();
                    expect((0, tweenable_1.getListHead)()).toBe(null);
                    expect((0, tweenable_1.getListTail)()).toBe(null);
                    expect(tweenable._previous).toBe(null);
                    expect(tweenable._next).toBe(null);
                });
            });
            describe('stop', () => {
                test('resets head and tail', () => {
                    tweenable.stop();
                    expect((0, tweenable_1.getListHead)()).toBe(null);
                    expect((0, tweenable_1.getListTail)()).toBe(null);
                    expect(tweenable._previous).toBe(null);
                    expect(tweenable._next).toBe(null);
                });
            });
        });
    });
    describe('two tweenables', () => {
        beforeEach(() => {
            head.tween({});
            tail.tween({});
        });
        describe('adding to the list', () => {
            test('head and tail are linked up', () => {
                expect((0, tweenable_1.getListHead)()).toBe(head);
                expect((0, tweenable_1.getListTail)()).toBe(tail);
                expect(head._previous).toBe(null);
                expect(head._next).toBe(tail);
                expect(tail._previous).toBe(head);
                expect(tail._next).toBe(null);
            });
        });
        describe('removing from the list', () => {
            describe('removing the head', () => {
                test('orphans the tail', () => {
                    head.stop();
                    expect((0, tweenable_1.getListHead)()).toBe(tail);
                    expect((0, tweenable_1.getListTail)()).toBe(tail);
                    expect(head._previous).toBe(null);
                    expect(head._next).toBe(null);
                    expect(tail._previous).toBe(null);
                    expect(tail._next).toBe(null);
                });
            });
            describe('removing the tail', () => {
                test('orphans the head', () => {
                    tail.stop();
                    expect((0, tweenable_1.getListHead)()).toBe(head);
                    expect((0, tweenable_1.getListTail)()).toBe(head);
                    expect(head._previous).toBe(null);
                    expect(head._next).toBe(null);
                    expect(tail._previous).toBe(null);
                    expect(tail._next).toBe(null);
                });
            });
        });
    });
    describe('more than two tweenables', () => {
        beforeEach(() => {
            head.tween({});
            middle.tween({});
            tail.tween({});
        });
        describe('adding to the list', () => {
            test('nodes are linked up', () => {
                expect((0, tweenable_1.getListHead)()).toBe(head);
                expect((0, tweenable_1.getListTail)()).toBe(tail);
                expect(head._previous).toBe(null);
                expect(head._next).toBe(middle);
                expect(middle._previous).toBe(head);
                expect(middle._next).toBe(tail);
                expect(tail._previous).toBe(middle);
                expect(tail._next).toBe(null);
            });
        });
        describe('removing from the list', () => {
            describe('removing the middle', () => {
                beforeEach(() => {
                    middle.stop();
                });
                test('updates links', () => {
                    expect((0, tweenable_1.getListHead)()).toBe(head);
                    expect((0, tweenable_1.getListTail)()).toBe(tail);
                    expect(head._previous).toBe(null);
                    expect(head._next).toBe(tail);
                    expect(middle._previous).toBe(null);
                    expect(middle._next).toBe(null);
                    expect(tail._previous).toBe(head);
                    expect(tail._next).toBe(null);
                });
            });
        });
    });
});
