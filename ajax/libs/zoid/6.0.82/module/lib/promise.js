import { ZalgoPromise } from 'zalgo-promise/src';

/*  DeNodeify
    ---------

    Turns a method from a function which accepts a callback, into a function which returns a promise.
*/

export function denodeify(method) {

    return function denodeifyWrapper() {

        var self = this;
        var args = Array.prototype.slice.call(arguments);

        if (args.length >= method.length) {
            return ZalgoPromise.resolve(method.apply(self, args));
        }

        return new ZalgoPromise(function (resolve, reject) {
            args.push(function (err, result) {

                if (err && !(err instanceof Error)) {
                    throw new Error('Passed non-Error object in callback: [ ' + err + ' ] -- callbacks should either be called with callback(new Error(...)) or callback(null, result).');
                }

                return err ? reject(err) : resolve(result);
            });
            method.apply(self, args);
        });
    };
}

export function promisify(method) {
    return function promisifyWRapper() {
        var _this = this,
            _arguments = arguments;

        return ZalgoPromise['try'](function () {
            return method.apply(_this, _arguments);
        });
    };
}

export function delay() {
    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    return new ZalgoPromise(function (resolve) {
        setTimeout(resolve, time);
    });
}

export function cycle(method) {
    return ZalgoPromise['try'](method).then(function () {
        return cycle(method);
    });
}