//
//     custom-elements-builder 0.3.1 http://tmorin.github.io/custom-elements-builder
//     Custom Elements Builder (ceb) is ... a builder for Custom Elements.
//     Buil date: 2015-03-03
//     Copyright 2015-2015 Thibault Morin
//     Available under MIT license
//
(function (g, factory) {
    'use strict';

    // Export the **ceb-feature-frp-rx** function according the detected loader.

    /* istanbul ignore next */
    if(typeof exports === 'object') {
        module.exports = factory(require('ceb-feature-frp'), require('rx'));
    } else if(typeof define === 'function' && define.amd) {
        define('ceb-feature-frp-rx', ['ceb-feature-frp', 'rx'], factory);
    } else {
        g.cebFeatureFrp = factory(g.cebFeatureFrp, g.Rx);
    }

}(this, function (cebFeatureFrp, Rx) {
    'use strict';

    cebFeatureFrp.libraries.Rx = {};

    cebFeatureFrp.libraries.Rx.propertyObserverFactory = function () {
        return new Rx.Subject();
    };

    cebFeatureFrp.libraries.Rx.propertyObservableInterceptor = function (next, el, propName, value) {
        next(value);
        el[propName + 'Observer'].onNext(value);
    };

    cebFeatureFrp.libraries.Rx.disposeDisposable = function (observer) {
        if(observer.dispose) {
            observer.dispose();
        }
    };

    return cebFeatureFrp;
}));