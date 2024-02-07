import { ZalgoPromise } from 'zalgo-promise/src';

export function memoized(target, name, descriptor) {
    var method = descriptor.value;

    descriptor.value = function memoizedFunction() {

        this.__memoized__ = this.__memoized__ || {};

        if (!this.__memoized__.hasOwnProperty(name)) {
            this.__memoized__[name] = method.apply(this, arguments);
        }

        return this.__memoized__[name];
    };

    descriptor.value.displayName = name + ':memoized';
}

export function promise(target, name, descriptor) {
    var method = descriptor.value;

    descriptor.value = function promisifiedFunction() {
        return ZalgoPromise['try'](method, this, arguments);
    };

    descriptor.value.displayName = name + ':promisified';
}