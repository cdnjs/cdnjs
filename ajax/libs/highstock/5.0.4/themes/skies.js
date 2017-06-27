/**
 * @license Highcharts JS v5.0.4 (2016-11-22)
 *
 * (c) 2009-2016 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = root.document ?
            factory(root) :
            factory;
    } else {
        root.Highcharts = factory(root);
    }
}(typeof window !== 'undefined' ? window : this, function(win) {
    var Highcharts = (function() {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        'use strict';
        /* global window */
        var win = window,
            doc = win.document;

        var SVG_NS = 'http://www.w3.org/2000/svg',
            userAgent = (win.navigator && win.navigator.userAgent) || '',
            svg = doc && doc.createElementNS && !!doc.createElementNS(SVG_NS, 'svg').createSVGRect,
            isMS = /(edge|msie|trident)/i.test(userAgent) && !window.opera,
            vml = !svg,
            isFirefox = /Firefox/.test(userAgent),
            hasBidiBug = isFirefox && parseInt(userAgent.split('Firefox/')[1], 10) < 4; // issue #38

        var Highcharts = win.Highcharts ? win.Highcharts.error(16, true) : {
            product: 'Highcharts',
            version: '5.0.4',
            deg2rad: Math.PI * 2 / 360,
            doc: doc,
            hasBidiBug: hasBidiBug,
            hasTouch: doc && doc.documentElement.ontouchstart !== undefined,
            isMS: isMS,
            isWebKit: /AppleWebKit/.test(userAgent),
            isFirefox: isFirefox,
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(userAgent),
            SVG_NS: SVG_NS,
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: svg,
            vml: vml,
            win: win,
            charts: [],
            marginNames: ['plotTop', 'marginRight', 'marginBottom', 'plotLeft'],
            noop: function() {
                return undefined;
            }
        };
        return Highcharts;
    }());
    (function(Highcharts) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         * 
         * Skies theme for Highcharts JS
         * @author Torstein Honsi
         */

        'use strict';
        Highcharts.theme = {
            colors: ['#514F78', '#42A07B', '#9B5E4A', '#72727F', '#1F949A', '#82914E', '#86777F', '#42A07B'],
            chart: {
                className: 'skies',
                borderWidth: 0,
                plotShadow: true,
                plotBackgroundImage: 'http://www.highcharts.com/demo/gfx/skies.jpg',
                plotBackgroundColor: {
                    linearGradient: [0, 0, 250, 500],
                    stops: [
                        [0, 'rgba(255, 255, 255, 1)'],
                        [1, 'rgba(255, 255, 255, 0)']
                    ]
                },
                plotBorderWidth: 1
            },
            title: {
                style: {
                    color: '#3E576F',
                    font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
                }
            },
            subtitle: {
                style: {
                    color: '#6D869F',
                    font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
                }
            },
            xAxis: {
                gridLineWidth: 0,
                lineColor: '#C0D0E0',
                tickColor: '#C0D0E0',
                labels: {
                    style: {
                        color: '#666',
                        fontWeight: 'bold'
                    }
                },
                title: {
                    style: {
                        color: '#666',
                        font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
                    }
                }
            },
            yAxis: {
                alternateGridColor: 'rgba(255, 255, 255, .5)',
                lineColor: '#C0D0E0',
                tickColor: '#C0D0E0',
                tickWidth: 1,
                labels: {
                    style: {
                        color: '#666',
                        fontWeight: 'bold'
                    }
                },
                title: {
                    style: {
                        color: '#666',
                        font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
                    }
                }
            },
            legend: {
                itemStyle: {
                    font: '9pt Trebuchet MS, Verdana, sans-serif',
                    color: '#3E576F'
                },
                itemHoverStyle: {
                    color: 'black'
                },
                itemHiddenStyle: {
                    color: 'silver'
                }
            },
            labels: {
                style: {
                    color: '#3E576F'
                }
            }
        };

        // Apply the theme
        Highcharts.setOptions(Highcharts.theme);

    }(Highcharts));
}));
