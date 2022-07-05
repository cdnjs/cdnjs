/**
 * @license Highcharts JS v10.2.0 (2022-07-05)
 *
 * (c) 2009-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/themes/sand-signika', ['highcharts'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    'use strict';
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);

            if (typeof CustomEvent === 'function') {
                window.dispatchEvent(
                    new CustomEvent(
                        'HighchartsModuleLoaded',
                        { detail: { path: path, module: obj[path] }
                    })
                );
            }
        }
    }
    _registerModule(_modules, 'Extensions/Themes/SandSignika.js', [_modules['Core/DefaultOptions.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (D, H, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  Sand-Signika theme for Highcharts JS
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var setOptions = D.setOptions;
        var addEvent = U.addEvent,
            createElement = U.createElement;
        /* *
         *
         *  Theme
         *
         * */
        var SandSignikaTheme;
        (function (SandSignikaTheme) {
            /* *
             *
             *  Constants
             *
             * */
            SandSignikaTheme.options = {
                colors: ['#f45b5b', '#8085e9', '#8d4654', '#7798BF', '#aaeeee',
                    '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
                chart: {
                    backgroundColor: null,
                    style: {
                        fontFamily: 'Signika, serif'
                    }
                },
                title: {
                    style: {
                        color: 'black',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }
                },
                subtitle: {
                    style: {
                        color: 'black'
                    }
                },
                tooltip: {
                    borderWidth: 0
                },
                labels: {
                    style: {
                        color: '#6e6e70'
                    }
                },
                legend: {
                    backgroundColor: '#E0E0E8',
                    itemStyle: {
                        fontWeight: 'bold',
                        fontSize: '13px'
                    }
                },
                xAxis: {
                    labels: {
                        style: {
                            color: '#6e6e70'
                        }
                    }
                },
                yAxis: {
                    labels: {
                        style: {
                            color: '#6e6e70'
                        }
                    }
                },
                plotOptions: {
                    series: {
                        shadow: true
                    },
                    candlestick: {
                        lineColor: '#404048'
                    },
                    map: {
                        shadow: false
                    }
                },
                // Highcharts Stock specific
                navigator: {
                    xAxis: {
                        gridLineColor: '#D0D0D8'
                    }
                },
                rangeSelector: {
                    buttonTheme: {
                        fill: 'white',
                        stroke: '#C0C0C8',
                        'stroke-width': 1,
                        states: {
                            select: {
                                fill: '#D0D0D8'
                            }
                        }
                    }
                },
                scrollbar: {
                    trackBorderColor: '#C0C0C8'
                }
            };
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Apply the theme.
             */
            function apply() {
                // Load the fonts
                createElement('link', {
                    href: 'https://fonts.googleapis.com/css?family=Signika:400,700',
                    rel: 'stylesheet',
                    type: 'text/css'
                }, null, document.getElementsByTagName('head')[0]);
                // Add the background image to the container
                addEvent(H.Chart, 'afterGetContainer', function () {
                    // eslint-disable-next-line no-invalid-this
                    this.container.style.background =
                        'url(https://www.highcharts.com/samples/graphics/sand.png)';
                });
                // Apply the theme
                setOptions(SandSignikaTheme.options);
            }
            SandSignikaTheme.apply = apply;
        })(SandSignikaTheme || (SandSignikaTheme = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return SandSignikaTheme;
    });
    _registerModule(_modules, 'masters/themes/sand-signika.src.js', [_modules['Core/Globals.js'], _modules['Extensions/Themes/SandSignika.js']], function (H, SandSignikaTheme) {

        H.theme = SandSignikaTheme.options;
        SandSignikaTheme.apply();

    });
}));