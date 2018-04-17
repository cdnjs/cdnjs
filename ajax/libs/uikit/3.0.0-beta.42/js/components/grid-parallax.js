/*! UIkit 3.0.0-beta.42 | http://www.getuikit.com | (c) 2014 - 2017 YOOtheme | MIT License */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('uikitgrid_parallax', factory) :
	(global.UIkitGrid_parallax = factory());
}(this, (function () { 'use strict';

function plugin(UIkit) {

    if (plugin.installed) {
        return;
    }

    var ref = UIkit.util;
    var addClass = ref.addClass;
    var css = ref.css;
    var scrolledOver = ref.scrolledOver;
    var sortBy = ref.sortBy;
    var toFloat = ref.toFloat;

    UIkit.component('grid-parallax', UIkit.components.grid.extend({

        props: {
            target: String,
            translate: Number
        },

        defaults: {
            target: false,
            translate: 150
        },

        computed: {

            translate: function translate(ref) {
                var translate = ref.translate;

                return Math.abs(translate);
            }

        },

        init: function init() {
            addClass(this.$el, 'uk-grid');
        },

        disconnected: function disconnected() {
            this.reset();
            css(this.$el, 'marginBottom', '');
        },

        update: [

            {

                read: function read(ref) {
                    var rows = ref.rows;

                    return {
                        columns: rows && rows[0] && rows[0].length || 0,
                        rows: rows && rows.map(function (elements) { return sortBy(elements, 'offsetLeft'); })
                    };
                },

                write: function write(ref) {
                    var columns = ref.columns;

                    css(this.$el, 'marginBottom', columns > 1
                        ? this.translate + toFloat(css(css(this.$el, 'marginBottom', ''), 'marginBottom'))
                        : '');
                },

                events: ['load', 'resize']
            },

            {

                read: function read() {
                    return {scrolled: scrolledOver(this.$el) * this.translate};
                },

                write: function write(ref) {
                    var rows = ref.rows;
                    var columns = ref.columns;
                    var scrolled = ref.scrolled;


                    if (!rows || columns === 1 || !scrolled) {
                        return this.reset();
                    }

                    rows.forEach(function (row) { return row.forEach(function (el, i) { return css(el, 'transform', ("translateY(" + (i % 2 ? scrolled : scrolled / 8) + "px)")); }
                        ); }
                    );

                },

                events: ['scroll', 'load', 'resize']
            }
        ],

        methods: {

            reset: function reset() {
                css(this.$el.children, 'transform', '');
            }

        }

    }));

    UIkit.components.gridParallax.options.update.unshift({

        read: function read() {
            this.reset();
        },

        events: ['load', 'resize']

    });

}

if (!false && typeof window !== 'undefined' && window.UIkit) {
    window.UIkit.use(plugin);
}

return plugin;

})));
