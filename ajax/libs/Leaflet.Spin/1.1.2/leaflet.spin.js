(function (factory, window) {
    // define an AMD module that relies on 'leaflet'
    if (typeof define === 'function' && define.amd) {
        define(['leaflet','spin.js'], function (L, Spinner) {
            factory(L, Spinner);
        });

    // define a Common JS module that relies on 'leaflet'
    } else if (typeof exports === 'object') {
        module.exports = function (L, Spinner) {
            if (L === undefined) {
                L = require('leaflet');
            }
            if (Spinner === undefined) {
                Spinner = require('spin.js');
            }
            factory(L, Spinner);
            return L;
        };
    // attach your plugin to the global 'L' variable
    } else if (typeof window !== 'undefined' && window.L && window.Spinner) {
        factory(window.L, window.Spinner);
    }
}(function leafletSpinFactory(L, Spinner) {
    var SpinMapMixin = {
        spin: function (state, options) {
            if (!!state) {
                // start spinning !
                if (!this._spinner) {
                    this._spinner = new Spinner(options)
                        .spin(this._container);
                    this._spinning = 0;
                }
                this._spinning++;
            }
            else {
                this._spinning--;
                if (this._spinning <= 0) {
                    // end spinning !
                    if (this._spinner) {
                        this._spinner.stop();
                        this._spinner = null;
                    }
                }
            }
        }
    };

    var SpinMapInitHook = function () {
        this.on('layeradd', function (e) {
            // If added layer is currently loading, spin !
            if (e.layer.loading) this.spin(true);
            if (typeof e.layer.on !== 'function') return;
            e.layer.on('data:loading', function () {
                this.spin(true);
            }, this);
            e.layer.on('data:loaded',  function () {
                this.spin(false);
            }, this);
        }, this);
        this.on('layerremove', function (e) {
            // Clean-up
            if (e.layer.loading) this.spin(false);
            if (typeof e.layer.on !== 'function') return;
            e.layer.off('data:loaded');
            e.layer.off('data:loading');
        }, this);
    };

    L.Map.include(SpinMapMixin);
    L.Map.addInitHook(SpinMapInitHook);
}, window));
