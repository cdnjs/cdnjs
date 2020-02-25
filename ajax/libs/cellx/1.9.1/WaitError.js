export function WaitError() { }
WaitError.prototype = {
    __proto__: Error.prototype,
    constructor: WaitError
};
