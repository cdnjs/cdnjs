/* istanbul ignore file */
let Map_;
if (typeof navigator != 'undefined' && navigator.userAgent.includes('Edge')) {
    const hasOwn = Object.prototype.hasOwnProperty;
    const KEY_MAP_ID = Symbol('mapId');
    let mapIdCounter = 0;
    const entryStub = {
        value: undefined
    };
    Map_ = function Map(entries) {
        this._entries = { __proto__: null };
        this._objectStamps = null;
        this._first = null;
        this._last = null;
        this.size = 0;
        if (entries) {
            for (let i = 0, l = entries.length; i < l; i++) {
                this.set(entries[i][0], entries[i][1]);
            }
        }
    };
    Map_.prototype = {
        constructor: Map_,
        has(key) {
            return !!this._entries[this._getValueStamp(key)];
        },
        get(key) {
            return (this._entries[this._getValueStamp(key)] || entryStub).value;
        },
        set(key, value) {
            let entries = this._entries;
            let keyStamp = this._getValueStamp(key);
            if (entries[keyStamp]) {
                entries[keyStamp].value = value;
            }
            else {
                let entry = (entries[keyStamp] = {
                    key,
                    keyStamp,
                    value,
                    prev: this._last,
                    next: null
                });
                if (this.size++) {
                    this._last.next = entry;
                }
                else {
                    this._first = entry;
                }
                this._last = entry;
            }
            return this;
        },
        delete(key) {
            let keyStamp = this._getValueStamp(key);
            let entry = this._entries[keyStamp];
            if (!entry) {
                return false;
            }
            if (--this.size) {
                let prev = entry.prev;
                let next = entry.next;
                if (prev) {
                    prev.next = next;
                }
                else {
                    this._first = next;
                }
                if (next) {
                    next.prev = prev;
                }
                else {
                    this._last = prev;
                }
            }
            else {
                this._first = null;
                this._last = null;
            }
            delete this._entries[keyStamp];
            if (this._objectStamps) {
                delete this._objectStamps[keyStamp];
            }
            return true;
        },
        clear() {
            let entries = this._entries;
            for (let stamp in entries) {
                delete entries[stamp];
            }
            this._objectStamps = null;
            this._first = null;
            this._last = null;
            this.size = 0;
        },
        // forEach(cb: Function, context: any) {
        // 	let entry = this._first;
        // 	while (entry) {
        // 		cb.call(context, entry.value, entry.key, this);
        // 		do {
        // 			entry = entry.next;
        // 		} while (entry && !this._entries[entry.keyStamp]);
        // 	}
        // },
        // toString() {
        // 	return '[object Map]';
        // },
        _getValueStamp(value) {
            switch (typeof value) {
                case 'undefined': {
                    return 'undefined';
                }
                case 'object': {
                    if (value === null) {
                        return 'null';
                    }
                    break;
                }
                case 'boolean': {
                    return '?' + value;
                }
                case 'number': {
                    return '+' + value;
                }
                case 'string': {
                    return ',' + value;
                }
            }
            return this._getObjectStamp(value);
        },
        _getObjectStamp(obj) {
            if (!hasOwn.call(obj, KEY_MAP_ID)) {
                if (!Object.isExtensible(obj)) {
                    let stamps = this._objectStamps;
                    let stamp;
                    for (stamp in stamps) {
                        if (stamps[stamp] == obj) {
                            return stamp;
                        }
                    }
                    stamp = String(++mapIdCounter);
                    (stamps || (this._objectStamps = { __proto__: null }))[stamp] = obj;
                    return stamp;
                }
                Object.defineProperty(obj, KEY_MAP_ID, {
                    value: String(++mapIdCounter)
                });
            }
            return obj[KEY_MAP_ID];
        }
    };
    [
        // ['keys', entry => entry.key],
        // ['values', entry => entry.value],
        ['entries', entry => [entry.key, entry.value]]
    ].forEach(settings => {
        let getStepValue = settings[1];
        Map_.prototype[settings[0]] = function () {
            let entries = this._entries;
            let entry;
            let done = false;
            let map = this;
            return {
                next() {
                    if (!done) {
                        if (entry) {
                            do {
                                entry = entry.next;
                            } while (entry && !entries[entry.keyStamp]);
                        }
                        else {
                            entry = map._first;
                        }
                        if (entry) {
                            return {
                                value: getStepValue(entry),
                                done: false
                            };
                        }
                        done = true;
                    }
                    return {
                        value: undefined,
                        done: true
                    };
                }
            };
        };
    });
    Map_.prototype[Symbol.iterator] = Map_.prototype.entries;
}
else {
    Map_ = Map;
}
export { Map_ as Map };
