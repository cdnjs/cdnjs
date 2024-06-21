/* istanbul ignore next */
export const nextTick = globalThis.process?.nextTick ??
    (() => {
        const resolvedPromise = Promise.resolve();
        return (cb) => {
            resolvedPromise.then(cb);
        };
    })();
