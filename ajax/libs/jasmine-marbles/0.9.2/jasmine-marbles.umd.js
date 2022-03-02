(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/testing'), require('lodash'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define(['exports', 'rxjs/testing', 'lodash', 'rxjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['jasmine-marbles'] = {}, global.Rx, global._, global.Rx));
}(this, (function (exports, testing, lodash, rxjs) { 'use strict';

    /* istanbul ignore file */
    /**
     * @see https://github.com/ReactiveX/rxjs/blob/master/spec/helpers/observableMatcher.ts
     */
    function stringify(x) {
        return JSON.stringify(x, function (_key, value) {
            if (Array.isArray(value)) {
                return ('[' +
                    value.map(function (i) {
                        return '\n\t' + stringify(i);
                    }) +
                    '\n]');
            }
            return value;
        })
            .replace(/\\"/g, '"')
            .replace(/\\t/g, '\t')
            .replace(/\\n/g, '\n');
    }
    /**
     * @see https://github.com/ReactiveX/rxjs/blob/master/spec/helpers/observableMatcher.ts
     */
    function deleteErrorNotificationStack(marble) {
        const { notification } = marble;
        if (notification) {
            const { kind, error } = notification;
            if (kind === 'E' && error instanceof Error) {
                notification.error = { name: error.name, message: error.message };
            }
        }
        return marble;
    }
    /**
     * @see https://github.com/ReactiveX/rxjs/blob/master/spec/helpers/observableMatcher.ts
     */
    function observableMatcher(actual, expected) {
        if (Array.isArray(actual) && Array.isArray(expected)) {
            actual = actual.map(deleteErrorNotificationStack);
            expected = expected.map(deleteErrorNotificationStack);
            const passed = lodash.isEqual(actual, expected);
            if (passed) {
                expect(passed).toBe(true);
                return;
            }
            let message = '\nExpected \n';
            actual.forEach((x) => (message += `\t${stringify(x)}\n`));
            message += '\t\nto deep equal \n';
            expected.forEach((x) => (message += `\t${stringify(x)}\n`));
            fail(message);
        }
        else {
            expect(actual).toEqual(expected);
        }
    }

    let scheduler;
    function initTestScheduler() {
        scheduler = new testing.TestScheduler(observableMatcher);
        scheduler['runMode'] = true;
    }
    function getTestScheduler() {
        if (scheduler) {
            return scheduler;
        }
        throw new Error('No test scheduler initialized');
    }
    function resetTestScheduler() {
        scheduler = null;
    }

    class TestColdObservable extends rxjs.Observable {
        constructor(marbles, values, error) {
            super();
            this.marbles = marbles;
            this.values = values;
            this.error = error;
            const scheduler = getTestScheduler();
            const cold = scheduler.createColdObservable(marbles, values, error);
            this.source = cold;
        }
        getSubscriptions() {
            return this.source['subscriptions'];
        }
    }
    class TestHotObservable extends rxjs.Observable {
        constructor(marbles, values, error) {
            super();
            this.marbles = marbles;
            this.values = values;
            this.error = error;
            const scheduler = getTestScheduler();
            const hot = scheduler.createHotObservable(marbles, values, error);
            this.source = hot;
        }
        getSubscriptions() {
            return this.source['subscriptions'];
        }
    }

    function mapSymbolsToNotifications(marbles, messagesArg) {
        const messages = messagesArg.slice();
        const result = {};
        for (let i = 0; i < marbles.length; i++) {
            const symbol = marbles[i];
            switch (symbol) {
                case ' ':
                case '-':
                case '^':
                case '(':
                case ')':
                    break;
                case '#':
                case '|': {
                    messages.shift();
                    break;
                }
                default: {
                    if ((symbol.match(/^[0-9]$/) && i === 0) || marbles[i - 1] === ' ') {
                        const buffer = marbles.slice(i);
                        const match = buffer.match(/^([0-9]+(?:\.[0-9]+)?)(ms|s|m) /);
                        if (match) {
                            i += match[0].length - 1;
                        }
                        break;
                    }
                    const message = messages.shift();
                    result[symbol] = message.notification;
                }
            }
        }
        return result;
    }

    function unparseMarble(result, assignSymbolFn) {
        const FRAME_TIME_FACTOR = 10; // need to be up to date with `TestScheduler.frameTimeFactor`
        let frames = 0;
        let marble = '';
        let isInGroup = false;
        let groupMembersAmount = 0;
        let index = 0;
        const isNextMessageInTheSameFrame = () => {
            const nextMessage = result[index + 1];
            return nextMessage && nextMessage.frame === result[index].frame;
        };
        result.forEach((testMessage, i) => {
            index = i;
            const framesDiff = testMessage.frame - frames;
            const emptyFramesAmount = framesDiff > 0 ? framesDiff / FRAME_TIME_FACTOR : 0;
            marble += '-'.repeat(emptyFramesAmount);
            if (isNextMessageInTheSameFrame()) {
                if (!isInGroup) {
                    marble += '(';
                }
                isInGroup = true;
            }
            switch (testMessage.notification.kind) {
                case 'N':
                    marble += assignSymbolFn(testMessage.notification);
                    break;
                case 'E':
                    marble += '#';
                    break;
                case 'C':
                    marble += '|';
                    break;
            }
            if (isInGroup) {
                groupMembersAmount += 1;
            }
            if (!isNextMessageInTheSameFrame() && isInGroup) {
                marble += ')';
                isInGroup = false;
                frames += (groupMembersAmount + 1) * FRAME_TIME_FACTOR;
                groupMembersAmount = 0;
            }
            else {
                frames = testMessage.frame + FRAME_TIME_FACTOR;
            }
        });
        return marble;
    }

    /*
     * Based on source code found in rxjs library
     * https://github.com/ReactiveX/rxjs/blob/master/src/testing/TestScheduler.ts
     *
     */
    function materializeInnerObservable(observable, outerFrame) {
        const messages = [];
        const scheduler = getTestScheduler();
        observable.subscribe({
            next: (value) => {
                messages.push({
                    frame: scheduler.frame - outerFrame,
                    notification: {
                        kind: 'N',
                        value,
                        error: undefined,
                    },
                });
            },
            error: (error) => {
                messages.push({
                    frame: scheduler.frame - outerFrame,
                    notification: {
                        kind: 'E',
                        value: undefined,
                        error,
                    },
                });
            },
            complete: () => {
                messages.push({
                    frame: scheduler.frame - outerFrame,
                    notification: {
                        kind: 'C',
                        value: undefined,
                        error: undefined,
                    },
                });
            },
        });
        return messages;
    }
    function toHaveSubscriptionsComparer(actual, marbles) {
        const marblesArray = typeof marbles === 'string' ? [marbles] : marbles;
        const results = marblesArray.map((marbles) => testing.TestScheduler.parseMarblesAsSubscriptions(marbles));
        expect(results).toEqual(actual.getSubscriptions());
        return { pass: true, message: () => '' };
    }
    function toBeObservableComparer(actual, fixture) {
        const results = [];
        const scheduler = getTestScheduler();
        scheduler.schedule(() => {
            actual.subscribe({
                next: (x) => {
                    let value = x;
                    // Support Observable-of-Observables
                    if (x instanceof rxjs.Observable) {
                        value = materializeInnerObservable(value, scheduler.frame);
                    }
                    results.push({
                        frame: scheduler.frame,
                        notification: {
                            kind: 'N',
                            value,
                            error: undefined,
                        },
                    });
                },
                error: (error) => {
                    results.push({
                        frame: scheduler.frame,
                        notification: {
                            kind: 'E',
                            value: undefined,
                            error,
                        },
                    });
                },
                complete: () => {
                    results.push({
                        frame: scheduler.frame,
                        notification: {
                            kind: 'C',
                            value: undefined,
                            error: undefined,
                        },
                    });
                },
            });
        });
        scheduler.flush();
        const expected = testing.TestScheduler.parseMarbles(fixture.marbles, fixture.values, fixture.error, true, true);
        try {
            expect(results).toEqual(expected);
            return { pass: true, message: () => '' };
        }
        catch (e) {
            const mapNotificationToSymbol = buildNotificationToSymbolMapper(fixture.marbles, expected, lodash.isEqual);
            const receivedMarble = unparseMarble(results, mapNotificationToSymbol);
            const message = formatMessage(fixture.marbles, expected, receivedMarble, results);
            return { pass: false, message: () => message };
        }
    }
    function buildNotificationToSymbolMapper(expectedMarbles, expectedMessages, equalityFn) {
        const symbolsToNotificationsMap = mapSymbolsToNotifications(expectedMarbles, expectedMessages);
        return (notification) => {
            const mapped = Object.keys(symbolsToNotificationsMap).find((key) => equalityFn(symbolsToNotificationsMap[key], notification));
            return mapped || '?';
        };
    }
    function formatMessage(expectedMarbles, expectedMessages, receivedMarbles, receivedMessages) {
        return `
    Expected: ${expectedMarbles},
    Received: ${receivedMarbles},
    
    Expected:
    ${JSON.stringify(expectedMessages)}
    
    Received:
    ${JSON.stringify(receivedMessages)},
  `;
    }

    function hot(marbles, values, error) {
        return new TestHotObservable(marbles.trim(), values, error);
    }
    function cold(marbles, values, error) {
        return new TestColdObservable(marbles.trim(), values, error);
    }
    function time(marbles) {
        return getTestScheduler().createTime(marbles.trim());
    }
    function addMatchers() {
        /**
         * expect.extend is an API exposed by jest-circus,
         * the default runner as of Jest v27. If that method
         * is not available, assume we're in a Jasmine test
         * environment.
         */
        if (!expect.extend) {
            jasmine.addMatchers({
                toHaveSubscriptions: () => ({
                    compare: toHaveSubscriptionsComparer,
                }),
                toBeObservable: (_utils) => ({
                    compare: toBeObservableComparer,
                }),
            });
        }
        else {
            expect.extend({
                toHaveSubscriptions: toHaveSubscriptionsComparer,
                toBeObservable: toBeObservableComparer,
            });
        }
    }
    function setupEnvironment() {
        beforeAll(() => addMatchers());
        beforeEach(() => initTestScheduler());
        afterEach(() => {
            getTestScheduler().flush();
            resetTestScheduler();
        });
    }
    setupEnvironment();

    exports.addMatchers = addMatchers;
    exports.cold = cold;
    exports.getTestScheduler = getTestScheduler;
    exports.hot = hot;
    exports.initTestScheduler = initTestScheduler;
    exports.resetTestScheduler = resetTestScheduler;
    exports.setupEnvironment = setupEnvironment;
    exports.time = time;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
