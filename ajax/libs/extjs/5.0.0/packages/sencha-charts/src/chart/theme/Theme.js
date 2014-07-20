/**
 * @class Ext.chart.theme.Theme
 * 
 * Provides chart theming.
 * 
 * Used as mixins by Ext.chart.AbstractChart.
 */
Ext.define('Ext.chart.theme.Theme', (

// This callback is executed right after when the class is created. This scope refers to the newly created class itself
function() {
   /* Theme constructor: takes either a complex object with styles like:
  
   {
        axis:               { fill: '#000', 'stroke-width': 1},
        axisLabelTop:       { fill: '#000', 'stroke-width': 1},
        axisLabelLeft:      { fill: '#000', 'stroke-width': 1},
        axisLabelRight:     { fill: '#000', 'stroke-width': 1},
        axisLabelBottom:    { fill: '#000', 'stroke-width': 1},
        axisTitleTop:       { fill: '#000', 'stroke-width': 1},
        axisTitleLeft:      { fill: '#000', 'stroke-width': 1},
        axisTitleRight:     { fill: '#000', 'stroke-width': 1},
        axisTitleBottom:    { fill: '#000', 'stroke-width': 1},

        series:             { 'stroke-width': 1 },
        seriesLabel:        { fill: '#333', font: '12px Arial' },
        marker:             { fill: '#000', stroke: '#555', radius: 3, size: 3 },

        seriesThemes: [
            { fill: '#C6DBEF' }, { fill: '#9ECAE1' }, { fill: '#6BAED6' }, 
            { fill: '#4292C6' }, { fill: '#2171B5' }, { fill: '#084594' }
        ],

        markerThemes: [
            { fill: '#084594', type: 'circle' }, 
            { fill: '#2171B5', type: 'cross' },
            { fill: '#4292C6', type: 'plus' }
        ]
    }
  
  ...or also takes just an array of colors and creates the complex object:
  
  {
      colors: ['#aaa', '#bcd', '#eee']
  }
  
  ...or takes just a base color and makes a theme from it
  
  {
      baseColor: '#bce'
  }
  
  To create a new theme you may add it to the Themes object:
    
  Ext.define('Ext.chart.theme.Dracula', {
      extend: 'Ext.chart.theme.Theme',
      constructor: function(config) {
          Ext.chart.theme.Base.prototype.constructor.call(this, Ext.apply({
              baseColor: '#mybasecolor'
          }, config));
      }
  });

  //Proposal:
  Ext.chart.theme.MyNewTheme = Ext.chart.createTheme('#basecolor');
  
  ...and then to use it provide the name of the theme (as a lower case string) in the chart config.
  
  {
      theme: 'mynewtheme'
  }
 */

(function() {
    Ext.chart = Ext.chart || {};
    Ext.chart.theme = function(config, base) {
        config = config || {};
        var i = 0, d = Ext.Date.now(), l, colors, color,
            seriesThemes, markerThemes,
            seriesTheme, markerTheme,
            key, gradients = [],
            midColor, midL;
        
        if (config.baseColor) {
            midColor = Ext.draw.Color.fromString(config.baseColor);
            midL = midColor.getHSL()[2];
            if (midL < 0.15) {
                midColor = midColor.getLighter(0.3);
            } else if (midL < 0.3) {
                midColor = midColor.getLighter(0.15);
            } else if (midL > 0.85) {
                midColor = midColor.getDarker(0.3);
            } else if (midL > 0.7) {
                midColor = midColor.getDarker(0.15);
            }
            config.colors = [ midColor.getDarker(0.3).toString(),
                              midColor.getDarker(0.15).toString(),
                              midColor.toString(),
                              midColor.getLighter(0.12).toString(),
                              midColor.getLighter(0.24).toString(),
                              midColor.getLighter(0.31).toString() ];

            delete config.baseColor;
        }
        if (config.colors) {
            colors = config.colors;
            base.colors = Ext.Array.clone(colors);

            seriesThemes = base.seriesThemes;
            seriesThemes.fillStyle = Ext.Array.clone(colors);

            markerThemes = base.markerThemes;
            markerThemes.fillStyle = Ext.Array.clone(colors);
        }
        //the user is configuring something in particular (either markers, series or pie slices)
        for (key in base) {
            if (key in config) {
                if (Ext.isObject(config[key]) && Ext.isObject(base[key])) {
                    Ext.apply(base[key], config[key]);
                } else {
                    base[key] = config[key];
                }
            }
        }
        {
            // Import some theme configs for compatibility with ExtJS.
            // axisLabelTop/Right/Bottom/Left and axisTitleTop/Bottom
            // are deprecated. Use axisLabel and axisTitle instead.
            var axisLabel = config.axisLabel || config.axisLabelTop || config.axisLabelRight || config.axisLabelBottom || config.axisLabelLeft,
                axisTitle = config.axisTitle || config.axisTitleTop || config.axisTitleBottom;
            if (axisLabel) {
                base.axisLabel = Ext.apply({}, axisLabel);
            }
            if (axisTitle) {
                base.axisTitle = Ext.apply({}, axisTitle);
            }
        }
        if (config.useGradients) {
            colors = base.colors || (function () {
                var ans = [];
                for (i = 0, seriesThemes = base.seriesThemes, l = seriesThemes.length; i < l; i++) {
                    ans.push(seriesThemes[i].fill || seriesThemes[i].stroke);
                }
                return ans;
            }());
            for (i = 0, l = colors.length; i < l; i++) {
                midColor = Ext.draw.Color.fromString(colors[i]);
                if (midColor) {
                    color = midColor.getDarker(0.1).toString();
                    midColor = midColor.toString();
                    key = 'theme-' + midColor.substr(1) + '-' + color.substr(1) + '-' + d;
                    gradients.push({
                        id: key,
                        angle: 45,
                        stops: {
                            0: {
                                color: midColor.toString()
                            },
                            100: {
                                color: color.toString()
                            }
                        }
                    });
                    colors[i] = 'url(#' + key + ')'; 
                }
            }
            base.gradients = gradients;
            base.colors = colors;
        }
        /* TODO:ps Complete theming for axes and titles
        base.axis = Ext.apply(base.axis || {}, config.axis || {});
        base.axisLabel = Ext.apply(base.axisLabel || {}, config.axisLabel || {});
        base.axisTitle = Ext.apply(base.axisTitle || {}, config.axisTitle || {});
        */
        Ext.apply(this, base);
    };
}());

return {
    mixinId: 'themeManager',

    requires: ['Ext.draw.Color'],

    defaultTheme: 'Base',

    initTheme: function(theme) {
        var me = this,
            themes = Ext.chart.theme,
            key, gradients, themeAttrs;
        if (theme) {
            theme = theme.split(':');
            for (key in themes) {
                if (key == theme[0]) {
                    gradients = (theme[1] == 'gradients');
                    themeAttrs = new themes[key]({
                        useGradients: gradients
                    });
                    return themeAttrs;
                }
            }
            //<debug>
            Ext.Logger.error('No theme found named "' + theme + '"');
            //</debug>
        }
        return themeAttrs;
    }
};

})());
