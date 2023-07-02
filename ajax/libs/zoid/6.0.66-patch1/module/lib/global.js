import { isSameDomain } from 'cross-domain-utils/src';

import { __ZOID__ } from '../constants';

export function globalFor(win) {

    if (!isSameDomain(win)) {
        return;
    }

    if (!win[__ZOID__]) {
        win[__ZOID__] = {};
    }

    return win[__ZOID__];
}

export function localGlobal() {
    var global = globalFor(window);

    if (!global) {
        throw new Error('Could not get local global');
    }

    return global;
}

export var global = localGlobal();