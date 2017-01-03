/**
 * Provides default colors for non-specified things. Should be sub-classed when creating new themes.
 * @private
 */
Ext.define('Ext.chart.theme.Base', {

    /* Begin Definitions */

    requires: ['Ext.chart.theme.Theme'],

    /* End Definitions */

    constructor: function(config) {
        var ident = Ext.identityFn,

            chartTitleDefaults = {
                fillStyle: '#333',
                font: 'bold 18px Arial'
            },

            axisLineDefaults = {
                strokeStyle: '#444',
                lineWidth: 1
            },

            axisLabelDefaults = {
                fillStyle: '#444',
                font: '12px Arial, Helvetica, sans-serif',
                spacing: 2,
                padding: 5,
                renderer: ident
            },

            axisTitleDefaults = {
                fillStyle: '#333',
                font: 'bold 16px Arial'
            },

            axisTitleLeftDefaults = {
                textBaseline: 'top',
                rotate: {
                    x:0, y:0,
                    degrees: 270
                }
            },

            axisTitleRightDefaults = {
                textBaseline: 'bottom',
                rotate: {
                    x:0, y:0,
                    degrees: 90
                }
            },

            seriesDefaults = {
                lineWidth: 1
            },

            seriesLabelDefaults = {
                fillStyle: '#333',
                textBaseline: 'middle',
                textAlign: 'center',
                font: '12px Arial, Helvetica, sans-serif'
            },

            markerDefaults = {
                strokeStyle: '#555',
                radius: 3,
                size: 3
            },

            colorDefaults = [ "#94ae0a", "#115fa6", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111" ],

            darkerColorDefaults = Ext.Array.map(colorDefaults, function(colorString) {
                var color = Ext.draw.Color.fromString(colorString);
                return color.getDarker(0.15).toString();
            });


        Ext.chart.theme.call(this, config, {

            // The default theme configs
            background:         false,
            chartTitle:         Ext.apply({}, chartTitleDefaults),

            axis:               Ext.apply({}, axisLineDefaults),
            axisLabel:          Ext.apply({}, axisLabelDefaults),
            axisTitle:          Ext.apply({}, axisTitleDefaults),
            axisTitleLeft:      Ext.apply({}, axisTitleLeftDefaults),
            axisTitleRight:     Ext.apply({}, axisTitleRightDefaults),

            series:             Ext.apply({}, seriesDefaults),
            seriesLabel:        Ext.apply({}, seriesLabelDefaults),
            marker:             Ext.apply({}, markerDefaults),

            colors:             Ext.Array.clone(colorDefaults),

            seriesThemes:       {
                                    fillStyle: Ext.Array.clone(colorDefaults),
                                    strokeStyle: darkerColorDefaults
                                    // Specific fillStyle and strokeStyle can be defined here,
                                    // otherwise they will be assigned from 'colors'.
                                },
            markerThemes:       {
                                    type: ['circle', 'cross', 'plus', 'square', 'triangle', 'diamond']
                                }
        });
    }
}, function() {
    var themes = Ext.chart.theme,
        names = ['Green', 'Sky', 'Red', 'Purple', 'Blue', 'Yellow'],
        palette = ['#b1da5a', '#4ce0e7', '#e84b67', '#da5abd', '#4d7fe6', '#fec935'],
        categories = [['#f0a50a', '#c20024', '#2044ba', '#810065', '#7eae29'],
                      ['#6d9824', '#87146e', '#2a9196', '#d39006', '#1e40ac'],
                      ['#fbbc29', '#ce2e4e', '#7e0062', '#158b90', '#57880e'],
                      ['#ef5773', '#fcbd2a', '#4f770d', '#1d3eaa', '#9b001f'],
                      ['#7eae29', '#fdbe2a', '#910019', '#27b4bc', '#d74dbc'],
                      ['#44dce1', '#0b2592', '#996e05', '#7fb325', '#b821a1']],
        i, palCount = palette.length, catCount = categories.length;
    
    //Create themes from base colors
    for (i = 0; i < palCount; i++) {
        themes[names[i]] = (function(color) {
            return Ext.extend(themes.Base, {
                constructor: function(config) {
                    themes.Base.prototype.constructor.call(this, Ext.apply({
                        baseColor: color
                    }, config));
                }
            });
        }(palette[i]));
    }
    
    //Create theme from color array
    for (i = 0; i < catCount; i++) {
        themes['Category' + (i + 1)] = (function(category) {
            return Ext.extend(themes.Base, {
                constructor: function(config) {
                    themes.Base.prototype.constructor.call(this, Ext.apply({
                        colors: category
                    }, config));
                }
            });
        }(categories[i]));
    }
});
