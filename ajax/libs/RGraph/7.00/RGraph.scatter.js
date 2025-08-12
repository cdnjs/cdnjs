    // o---------------------------------------------------------------------------------o
    // | This file is part of the RGraph package - you can learn more at:                |
    // |                                                                                 |
    // |                       https://www.rgraph.net/license.html                       |
    // |                                                                                 |
    // | RGraph is dual-licensed under the Open Source GPL license. That means that it's |
    // | free to use and there are no restrictions on what you can use RGraph for!       |
    // | If the GPL license does not suit you however, then there's an inexpensive       |
    // | commercial license option available. See the URL above for more details.        |
    // o---------------------------------------------------------------------------------o

    RGraph = window.RGraph || {isrgraph:true,isRGraph:true,rgraph:true};




    //
    // The scatter graph constructor
    //
    RGraph.Scatter = function (conf)
    {
        this.data = new Array(conf.data.length);

        // Store the data set(s)
        this.data = RGraph.arrayClone(conf.data, true);


        // Convert objects to arrays
        for (let i=0; i<this.data.length; ++i) {

            // Single dataset
            if (   RGraph.isObject(conf.data[i])
                && (RGraph.isNumber(this.data[i].x) || RGraph.isString(this.data[i].x))
                && (RGraph.isNumber(this.data[i].y) || RGraph.isString(this.data[i].y))) {

                    conf.data[i] = [
                        conf.data[i].x,
                        conf.data[i].y,
                        conf.data[i].color || undefined,
                        typeof conf.data[i].tooltip === 'string' ? conf.data[i].tooltip : undefined
                    ];

            // Multiple datasets
            } else if (RGraph.isArray(conf.data[i])) {
                for (let j=0; j<conf.data[i].length; ++j) {
                    if (RGraph.isObject(conf.data[i][j])) {
                        conf.data[i][j] = [
                            conf.data[i][j].x,
                            conf.data[i][j].y,
                            conf.data[i][j].color || undefined,
                            typeof conf.data[i][j].tooltip === 'string' ? conf.data[i][j].tooltip : undefined
                        ];
                    }
                }
            }
        }



        // Account for just one dataset being given
        if (typeof conf.data === 'object' && typeof conf.data[0] === 'object' && (typeof conf.data[0][0] === 'number' || typeof conf.data[0][0] === 'string')) {
            var tmp = RGraph.arrayClone(conf.data, true);
            conf.data = new Array();
            conf.data[0] = RGraph.arrayClone(tmp, true);
        }
        
        this.data = RGraph.arrayClone(conf.data, true);
        











        //
        // Create the sequential indexes map arrays
        //
        this.dataIndexMapGroupedToSequential = [];
        this.dataIndexMapSequentialToGrouped = [];
        
        for (let dataset=0,seq=0; dataset<this.data.length; ++dataset) {
            for (let index=0; index<this.data[dataset].length; ++index,++seq) {
        
            // Ensure the arrays are initialised
                if (!RGraph.isArray(this.dataIndexMapGroupedToSequential[dataset])) {
                    this.dataIndexMapGroupedToSequential[dataset] = [];
                }
                if (!RGraph.isArray(this.dataIndexMapGroupedToSequential[dataset][index])) {
                    this.dataIndexMapGroupedToSequential[dataset][index] = [];
                }
                
                this.dataIndexMapGroupedToSequential[dataset][index] = seq;
                this.dataIndexMapSequentialToGrouped[seq] = [dataset, index];
            }
        }
                //
        // End of creating the sequential indexes map arrays
        //









        // If necessary convert X/Y values passed as strings
        // to numbers
        for (var i=0,len=this.data.length; i<len; ++i) { // Datasets
            for (var j=0,len2=this.data[i].length; j<len2; ++j) { // Points

                // Handle the conversion of X values
                if (typeof this.data[i][j] === 'object' && !RGraph.isNullish(this.data[i][j]) && typeof this.data[i][j][0] === 'string') {
                    if (this.data[i][j][0].match(/^[.0-9]+$/)) {
                        this.data[i][j][0] = parseFloat(this.data[i][j][0]);
                    } else if (this.data[i][j][0] === '') {
                        this.data[i][j][0] = 0;
                    }
                }

                // Handle the conversion of Y values
                if (typeof this.data[i][j] === 'object' && !RGraph.isNullish(this.data[i][j]) && typeof this.data[i][j][1] === 'string') {
                    if (this.data[i][j][1].match(/[.0-9]+/)) {
                        this.data[i][j][1] = parseFloat(this.data[i][j][1]);
                    } else if (this.data[i][j][1] === '') {
                        this.data[i][j][1] = 0;
                    }
                }
            }
        }
        
        // Store a copy of the data that won't be touched
        this.unmodified_data = RGraph.arrayClone(this.data, true);

        this.id                     = conf.id;
        this.canvas                 = document.getElementById(this.id);
        this.canvas.__object__      = this;
        this.context                = this.canvas.getContext ? this.canvas.getContext('2d') : null;
        this.max                    = 0;
        this.type                   = 'scatter';
        this.isRGraph               = true;
        this.isrgraph               = true;
        this.rgraph                 = true;
        this.uid                    = RGraph.createUID();
        this.canvas.uid             = this.canvas.uid ? this.canvas.uid : RGraph.createUID();
        this.colorsParsed           = false;
        this.coords                 = [];
        this.coordsText             = [];
        this.coordsBubble           = [];
        this.coordsTrendline        = [];
        this.original_colors        = [];
        this.firstDraw              = true; // After the first draw this will be false
        this.stopAnimationRequested = false;// Used to control the animations




        // Various config properties
        this.properties = {
            backgroundBarsCount:        null,
            backgroundBarsColor1:       'rgba(0,0,0,0)',
            backgroundBarsColor2:       'rgba(0,0,0,0)',
            backgroundHbars:            null,
            backgroundVbars:            null,
            backgroundGrid:             true,
            backgroundGridLinewidth:    1,
            backgroundGridColor:        '#ddd',
            backgroundGridHsize:        20,
            backgroundGridVsize:        20,
            backgroundGridVlines:       true,
            backgroundGridHlines:       true,
            backgroundGridBorder:       true,
            backgroundGridAutofit:      true,
            backgroundGridAutofitAlign: true,
            backgroundGridHlinesCount:  5,
            backgroundGridVlinesCount:  20,
            backgroundGridDashed:       false,
            backgroundGridDotted:       false,
            backgroundGridDashArray:    null,
            backgroundImage:            null,
            backgroundImageStretch:     true,
            backgroundImageX:           null,
            backgroundImageY:           null,
            backgroundImageW:           null,
            backgroundImageH:           null,
            backgroundImageAlign:       null,
            backgroundColor:            null,
            backgroundBorder:           false,
            backgroundBorderLinewidth:  1,
            backgroundBorderColor:      '#aaa',
            backgroundBorderDashed:     false,
            backgroundBorderDotted:     false,
            backgroundBorderDashArray:  null,


            colors:                     [], // This is used internally for the tooltip key
            colorsBubbleGraduated:      true,
            colorsBubbleStroke:         null,
            
            textColor:                  'black',
            textFont:                   'Arial, Verdana, sans-serif',
            textSize:                   12,
            textBold:                   false,
            textItalic:                 false,
            textAccessible:             false,
            textAccessibleOverflow:     'visible',
            textAccessiblePointerevents:false,
            text:                       null,
            
            tooltips:                   [], // Default must be an empty array
            tooltipsEffect:             'slide',
            tooltipsEvent:              'onmousemove',
            tooltipsHotspot:            3,
            tooltipsCssClass:           'RGraph_tooltip',
            tooltipsCss:                null,
            tooltipsHighlight:          true,
            tooltipsPersistent:         false,
            tooltipsCoordsPage:         false,
            tooltipsFormattedThousand:  ',',
            tooltipsFormattedPoint:     '.',
            tooltipsFormattedDecimals:  0,
            tooltipsFormattedUnitsPre:  '',
            tooltipsFormattedUnitsPost: '',
            tooltipsFormattedKeyColors: null,
            tooltipsFormattedKeyColorsShape: 'square',
            tooltipsFormattedKeyLabels: [],
            tooltipsFormattedListType:  'ul',
            tooltipsFormattedListItems: null,
            tooltipsFormattedTableHeaders: null,
            tooltipsFormattedTableData: null,
            tooltipsPointer:            true,
            tooltipsPointerOffsetx:     0,
            tooltipsPointerOffsety:     0,
            tooltipsPositionStatic:     true,
            tooltipsHotspotIgnore:      null,


            xaxis:                      true,
            xaxisLinewidth:             1,
            xaxisColor:                 'black',
            xaxisTickmarks:             true,
            xaxisTickmarksLength:       3,
            xaxisTickmarksLastLeft:     null,
            xaxisTickmarksLastRight:    null,
            xaxisTickmarksCount:        null,
            xaxisLabels:                null,
            xaxisLabelsFormattedDecimals: 0,
            xaxisLabelsFormattedPoint: '.',
            xaxisLabelsFormattedThousand: ',',
            xaxisLabelsFormattedUnitsPre: '',
            xaxisLabelsFormattedUnitsPost: '',
            xaxisLabelsCount:           null,
            xaxisLabelsSize:            null,
            xaxisLabelsFont:            null,
            xaxisLabelsItalic:          null,
            xaxisLabelsBold:            null,
            xaxisLabelsColor:           null,
            xaxisLabelsOffsetx:         0,
            xaxisLabelsOffsety:         0,
            xaxisLabelsHalign:          null,
            xaxisLabelsValign:          null,
            xaxisLabelsPosition:        'section',
            xaxisLabelsSpecificAlign:   'left',
            xaxisPosition:              'bottom',
            xaxisLabelsAngle:           0,
            xaxisTitle:                 '',
            xaxisTitleBold:             null,
            xaxisTitleSize:             null,
            xaxisTitleFont:             null,
            xaxisTitleColor:            null,
            xaxisTitleItalic:           null,
            xaxisTitlePos:              null,
            xaxisTitleOffsetx:          0,
            xaxisTitleOffsety:          0,
            xaxisTitleX:                null,
            xaxisTitleY:                null,
            xaxisTitleHalign:           'center',
            xaxisTitleValign:           'top',
            xaxisScale:                 false,
            xaxisScaleMin:              0,
            xaxisScaleMax:              null,
            xaxisScaleUnitsPre:         '',
            xaxisScaleUnitsPost:        '',
            xaxisScaleLabelsCount:      10,
            xaxisScaleFormatter:        null,
            xaxisScaleDecimals:         0,
            xaxisScaleThousand:         ',',
            xaxisScalePoint:            '.',

            yaxis:                    true,
            yaxisLinewidth:           1,
            yaxisColor:               'black',
            yaxisTickmarks:           true,
            yaxisTickmarksCount:      null,
            yaxisTickmarksLastTop:    null,
            yaxisTickmarksLastBottom: null,
            yaxisTickmarksLength:     3,
            yaxisScale:               true,
            yaxisScaleMin:            0,
            yaxisScaleMax:            null,
            yaxisScaleUnitsPre:       '',
            yaxisScaleUnitsPost:      '',
            yaxisScaleDecimals:       0,
            yaxisScalePoint:          '.',
            yaxisScaleThousand:       ',',
            yaxisScaleRound:          false,
            yaxisScaleInvert:         false,
            yaxisScaleFormatter:      null,
            yaxisLabelsSpecific:      null,
            yaxisLabelsCount:         5,
            yaxisLabelsOffsetx:       0,
            yaxisLabelsOffsety:       0,
            yaxisLabelsHalign:        null,
            yaxisLabelsValign:        null,
            yaxisLabelsFont:          null,
            yaxisLabelsSize:          null,
            yaxisLabelsColor:         null,
            yaxisLabelsBold:          null,
            yaxisLabelsItalic:        null,
            yaxisLabelsPosition:      'edge',
            yaxisPosition:            'left',
            yaxisTitle:               '',
            yaxisTitleBold:           null,
            yaxisTitleSize:           null,
            yaxisTitleFont:           null,
            yaxisTitleColor:          null,
            yaxisTitleItalic:         null,
            yaxisTitlePos:            null,
            yaxisTitleX:              null,
            yaxisTitleY:              null,
            yaxisTitleOffsetx:        0,
            yaxisTitleOffsety:        0,
            yaxisTitleHalign:         null,
            yaxisTitleValign:         null,
            yaxisTitleAccessible:     null,
            
            tickmarksStyle:             'cross',
            tickmarksStyleImageHalign:  'center',
            tickmarksStyleImageValign:  'center',
            tickmarksStyleImageOffsetx: 0,
            tickmarksStyleImageOffsety: 0,
            tickmarksSize:              5,
            
            marginLeft:                 35,
            marginRight:                35,
            marginTop:                  35,
            marginBottom:               35,

            title:                      '',
            titleBold:                  true,
            titleItalic:                null,
            titleFont:                  null,
            titleSize:                  null,
            titleItalic:                null,
            titleX:                     null,
            titleY:                     null,
            titleHalign:                null,
            titleValign:                null,
            titleOffsetx:               0,
            titleOffsety:               0,
            titleSubtitle:        '',
            titleSubtitleSize:    null,
            titleSubtitleColor:   '#aaa',
            titleSubtitleFont:    null,
            titleSubtitleBold:    null,
            titleSubtitleItalic:  null,
            titleSubtitleOffsetx: 0,
            titleSubtitleOffsety: 0,

            labelsIngraph:              null,
            labelsIngraphFont:          null,
            labelsIngraphSize:          null,
            labelsIngraphColor:         null,
            labelsIngraphBold:          null,
            labelsIngraphItalic:        null,
            labelsIngraphOffsetx:       0,
            labelsIngraphOffsety:       0,
            labelsAbove:                false,
            labelsAboveSize:            null,
            labelsAboveFont:            null,
            labelsAboveColor:           null,
            labelsAboveBold:            null,
            labelsAboveItalic:          null,
            labelsAboveDecimals:        0,
            labelsAboveOffsetx:         0,
            labelsAboveOffsety:         0,
            
            contextmenu:                null,
            
            colorsDefault:              'black',

            crosshairs:                 false,
            crosshairsHline:            true,
            crosshairsVline:            true,
            crosshairsColor:            '#333',
            crosshairsLinewidth:        1,
            crosshairsCoords:           false,
            crosshairsCoordsFixed:      false,
            crosshairsCoordsLabelsX:    'X',
            crosshairsCoordsLabelsY:    'Y',
            crosshairsCoordsFormatterX: null,
            crosshairsCoordsFormatterY: null,
            crosshairsSnapToScale: false,

            annotatable:                false,
            annotatableColor:           'black',
            annotatableLinewidth:       1,
            
            lasso:                      false,
            lassoFill:                  '#0064',
            lassoStroke:                '#006',
            lassoLinewidth:             1,
            lassoHighlightLinewidth:    1,
            lassoHighlightStroke:       'transparent',
            lassoHighlightFill:         'red',
            lassoCallback:              null,
            lassoClearCallback:         null,
            lassoPersist:               false,
            lassoPersistLocal:          true,
            lassoPersistLoad:           null,
            lassoPersistSave:           null,

            line:                       false,
            lineLinewidth:              1,
            lineColors:                 ['green', 'red','blue','orange','pink','brown','black','gray'],
            lineShadowColor:            'rgba(0,0,0,0)',
            lineShadowBlur:             2,
            lineShadowOffsetx:          3,
            lineShadowOffsety:          3,
            lineStepped:                false,
            lineVisible:                true,

            key:                        null,
            keyBackground:              'white',
            keyPosition:                'graph',
            keyHalign:                  'right',
            keyShadow:                  false,
            keyShadowColor:             '#666',
            keyShadowBlur:              3,
            keyShadowOffsetx:           2,
            keyShadowOffsety:           2,
            keyPositionGutterBoxed:     false,
            keyPositionX:               null,
            keyPositionY:               null,
            keyInteractive:             false,
            keyInteractiveHighlightChartFill: 'rgba(255,0,0,0.9)',
            keyInteractiveHighlightLabel:     'rgba(255,0,0,0.2)',
            keyColorShape:              'square',
            keyRounded:                 true,
            keyLinewidth:               1,
            keyColors:                  null,
            keyLabelsColor:             null,
            keyLabelsFont:              null,
            keyLabelsSize:              null,
            keyLabelsBold:              null,
            keyLabelsItalic:            null,
            keyLabelsOffsetx:           0,
            keyLabelsOffsety:           0,
            keyFormattedDecimals:       0,
            keyFormattedPoint:          '.',
            keyFormattedThousand:       ',',
            keyFormattedUnitsPre:       '',
            keyFormattedUnitsPost:      '',
            keyFormattedValueSpecific:  null,
            keyFormattedItemsCount:     null,

            boxplotWidth:               10,
            boxplotCapped:              true,

            trendline:                  false,
            trendlineColors:            ['gray'],
            trendlineLinewidth:         1,
            trendlineMargin:            15,
            trendlineDashed:            true,
            trendlineDotted:            false,
            trendlineDashArray:         null,
            trendlineClipping:          null,

            highlightStroke:            'rgba(0,0,0,0)',
            highlightFill:              'rgba(255,255,255,0.7)',
            
            bubbleMin:                  0,
            bubbleMax:                  null,
            bubbleWidth:                null,
            bubbleData:                 null,
            bubbleLinewidth:            1,
            bubbleShadow:               false,
            bubbleShadowColor:          '#aaa',
            bubbleShadowOffsetx:        2,
            bubbleShadowOffsety:        2,
            bubbleShadowBlur:           3,

            marimekkoLinewidth:               10,
            marimekkoColors:                  ['#faa', '#afa', '#aaf', '#ffa', '#faf', '#aff'],
            marimekkoColorsSequential:        false,
            marimekkoColorsStroke:            'white',
            marimekkoLabels:                  null,
            marimekkoLabelsColor:             null,
            marimekkoLabelsSize:              null,
            marimekkoLabelsFont:              null,
            marimekkoLabelsBold:              null,
            marimekkoLabelsItalic:            null,
            marimekkoLabelsOffsetx:           0,
            marimekkoLabelsOffsety:           0,
            marimekkoLabelsFormattedDecimals: 0,
            marimekkoLabelsFormattedPoint:    '.',
            marimekkoLabelsFormattedThousand: ',',
            marimekkoLabelsFormattedUnitsPre: '',
            marimekkoLabelsFormattedUnitsPost:'',
            marimekkoLabelsIngraph:           false,
            marimekkoLabelsIngraphColor:      null,
            marimekkoLabelsIngraphSize:       10,
            marimekkoLabelsIngraphFont:       null,
            marimekkoLabelsIngraphBold:       null,
            marimekkoLabelsIngraphItalic:     null,
            marimekkoLabelsIngraphUnitsPre:   '',
            marimekkoLabelsIngraphUnitsPost:  '',
            marimekkoLabelsIngraphPoint:      '.',
            marimekkoLabelsIngraphThousand:   ',',
            marimekkoLabelsIngraphDecimals:   0,
            marimekkoLabelsIngraphOffsetx:    0,
            marimekkoLabelsIngraphOffsety:    0,
            marimekkoLabelsIngraphBackgroundFill: '#fffa',
            marimekkoLabelsIngraphBackgroundStroke: 'transparent',
            marimekkoLabelsIngraphSpecific:   null,
            
            adjustable:                 false,
            adjustableOnly:             null,

            clearto:                    'rgba(0,0,0,0)',
            
            outofbounds:                false,

            animationTrace:             false,
            animationTraceClip:         1,
            
            horizontalLines:            null,
            
            events:                     {},
            
            scale:                      true,
            scaleFactor:                2,
            antialiasTranslate:         false
        };




        //
        // These are the properties that get scaled up if the
        // scale option is enabled.
        //
        this.properties_scale = [

            'backgroundGridLinewidth',
            'backgroundGridHsize',
            'backgroundGridVsize',
            'backgroundImageX',
            'backgroundImageY',
            'backgroundImageW',
            'backgroundImageH',
            'backgroundBorderLinewidth',
            'backgroundBorderDashArray',
            
            'marginTop',
            'marginBottom',
            'marginLeft',
            'marginRight',

            'tickmarksStyleImageOffsetx',
            'tickmarksStyleImageOffsety',
            'tickmarksSize',
            
            'labelsIngraphSize',
            'labelsIngraphOffsetx',
            'labelsIngraphOffsety',
            'labelsAboveSize',
            'labelsAboveOffset',
            'labelsAboveOffsetx',
            'labelsAboveOffsety',
            
            'yaxisLinewidth',
            'yaxisTickmarksLength',
            'yaxisLabelsOffsetx',
            'yaxisLabelsOffsety',
            'yaxisLabelsSize',
            'yaxisTitleSize',
            'yaxisTitleX',
            'yaxisTitleY',
            'yaxisTitleOffsetx',
            'yaxisTitleOffsety',
            
            'xaxisLinewidth',
            'xaxisTickmarksLength',
            'xaxisLabelsSize',
            'xaxisLabelsOffsetx',
            'xaxisLabelsOffsety',
            'xaxisTitleSize',
            'xaxisTitleOffsetx',
            'xaxisTitleOffsety',
            'xaxisTitleX',
            'xaxisTitleY',
            
            'textSize',
            
            'titleX',
            'titleY',
            'titleSize',
            'titleOffsetx',
            'titleOffsety',
            'titleSubtitleSize',
            'titleSubtitleOffsetx',
            'titleSubtitleOffsety',
            
            'shadowOffsetx',
            'shadowOffsety',
            'shadowBlur',
            
            'keyShadowBlur',
            'keyShadowOffsetx',
            'keyShadowOffsety',
            'keyPositionX',
            'keyPositionY',
            'keyInteractiveHighlightChartLinewidth',
            'keyLinewidth',
            'keyLabelsSize',
            'keyLabelsOffsetx',
            'keyLabelsOffsety',
            
            'crosshairsLinewidth',
            
            'linewidth',
            
            'tooltipsHotspot',
            
            
            'annotatableLinewidth',
            
            'errorbarsCappedWidth',
            'errorbarsLinewidth',
            
            'lassoLinewidth',
            'lassoHighlightLinewidth',
            
            'lineLinewidth',
            'lineShadowBlur',
            'lineShadowOffsetx',
            'lineShadowOffsety',
            'lineDash',
            
            'trendlineLinewidth',
            'trendlineMargin',
            'trendlineDashArray',
            
            'bubbleWidth',
            'bubbleLinewidth',
            'bubbleShadowBlur',
            'bubbleShadowOffsetx',
            'bubbleShadowOffsety',
            
            'marimekkoLinewidth',
            'marimekkoLabelsSize',
            'marimekkoLabelsOffsetx',
            'marimekkoLabelsOffsety',
            'marimekkoLabelsIngraphSize',
            'marimekkoLabelsIngraphOffsetx',
            'marimekkoLabelsIngraphyffsetx'
        ];









        //
        // Add the reverse look-up table  for property names
        // so that property names can be specified in any case.
        //
        this.properties_lowercase_map = [];
        for (var i in this.properties) {
            if (typeof i === 'string') {
                this.properties_lowercase_map[i.toLowerCase()] = i;
            }
        }

        //
        // This allows the data points to be given as dates as well as numbers. Formats supported by RGraph.parseDate() are accepted.
        // 
        // ALSO: unrelated but this loop is also used to convert null values to an
        // empty array
        //
        for (var i=0; i<this.data.length; ++i) {
            for (var j=0; j<this.data[i].length; ++j) {
                
                // Convert null data points to an empty erray
                if ( RGraph.isNullish(this.data[i][j]) ) {
                    this.data[i][j] = [];
                }

                // Allow for the X point to be dates
                if (this.data[i][j] && typeof this.data[i][j][0] == 'string') {
                    this.data[i][j][0] = RGraph.parseDate(this.data[i][j][0]);
                }
            }
        }


        //
        // Now make the data_arr array - all the data as one big
        // array
        //
        this.data_arr = [];

        for (var i=0; i<this.data.length; ++i) {
            for (var j=0; j<this.data[i].length; ++j) {
                this.data_arr.push(this.data[i][j]);
            }
        }

        // Create the $ objects so that they can be used
        for (var i=0; i<this.data_arr.length; ++i) {
            this['$' + i] = {}
        }


        // Check for support
        if (!this.canvas) {
            alert('[SCATTER] No canvas support');
            return;
        }



        // Easy access to  properties and the path function
        var properties = this.properties;
        this.path      = RGraph.pathObjectFunction;
        
        
        //
        // "Decorate" the object with the generic effects if the effects library has been included
        //
        if (RGraph.Effects && typeof RGraph.Effects.decorate === 'function') {
            RGraph.Effects.decorate(this);
        }
        
        
        
        // Add the responsive method. This method resides in the common file.
        this.responsive = RGraph.responsive;








        //
        // A simple setter
        // 
        // @param string name  The name of the property to set
        // @param string value The value of the property
        //
        this.set = function (name)
        {
            var value = typeof arguments[1] === 'undefined' ? null : arguments[1];

            // Go through all of the properties and make sure
            // that they're using the correct capitalisation
            if (typeof name === 'string') {
                name = this.properties_lowercase_map[name.toLowerCase()] || name;
            }

            // Reset the colorsParsed flag if required
            if (   name === 'backgroundVbars'
                || name === 'backgroundHbars'
                || name === 'lineColors'
                || name === 'colorsDefault'
                || name === 'crosshairsColor'
                || name === 'highlightStroke'
                || name === 'highlightFill'
                || name === 'backgroundBarsColor1'
                || name === 'backgroundBarsColor2'
                || name === 'backgroundGridColor'
                || name === 'backgroundColor'
                || name === 'axesColor'
                || name === 'marimekkoColors'
                || name === 'marimekkoColorsStrokeroke'
                || name === 'marimekkoLabelsIngraphBackgroundStroke'
                || name === 'marimekkoLabelsIngraphBackgroundFill') {
                this.colorsParsed = false;
            }

            // the number of arguments is only one and it's an
            // object - parse it for configuration data and return.
            if (arguments.length === 1 && typeof arguments[0] === 'object') {
                for (i in arguments[0]) {
                    if (typeof i === 'string') {
                        this.set(i, arguments[0][i]);
                    }
                }

                return this;
            }

            properties[name] = value;


            
            // If a single tooltip has been given add it to each datapiece
            if (name === 'tooltips' && typeof value === 'string') {
                this.populateTooltips();
            }

            return this;
        };








        //
        // A simple getter
        // 
        // @param string name  The name of the property to set
        //
        this.get = function (name)
        {
            // Go through all of the properties and make sure
            // that they're using the correct capitalisation
            name = this.properties_lowercase_map[name.toLowerCase()] || name;

            return properties[name];
        };








        //
        // The function you call to draw the Scatter chart
        //
        this.draw = function ()
        {
            // MUST be the first thing that's done - but only
            // once!!
            RGraph.runOnce(`scale-up-the-canvas-once-in-the-draw-function-${this.id}-${this.uid}`,  () =>
            {
                // Note that we're in an arrow function so the
                // 'this' variable is OK to be used and refers
                // to the RGraph Line chart object.
                RGraph.scale(this);
            });





            // MUST be the first thing done!
            if (typeof properties.backgroundImage === 'string') {
                RGraph.drawBackgroundImage(this);
            }


            //
            // Fire the onbeforedraw event
            //
            RGraph.fireCustomEvent(this, 'onbeforedraw');









            // Translate half a pixel for antialiasing purposes - but
            // only if it hasn't been done already
            //
            // The old style antialias fix
            //
            if (   !this.properties.scale
                && this.properties.antialiasTranslate
                && !this.canvas.__rgraph_aa_translated__) {

                this.context.translate(0.5,0.5);
            
                this.canvas.__rgraph_aa_translated__ = true;
            }
    
            //
            // Parse the colors. This allows for simple gradient syntax
            //
            if (!this.colorsParsed) {
                this.parseColors();
                
                // Don't want to do this again
                this.colorsParsed = true;
            }
    



            //
            // Stop this growing uncontrollably
            //
            this.coordsText = [];


            //
            // Populate the labels string/array if its a string
            //
            if (properties.xaxisLabels && properties.xaxisLabels.length) {
                //
                // If the labels option is a string then turn it
                // into an array.
                //
                if (typeof properties.xaxisLabels === 'string') {
                    properties.xaxisLabels = RGraph.arrayPad({
                        array:  [],
                        length: properties.xaxisLabelsCount,
                        value:  properties.xaxisLabels
                    });
                }

                for (var i=0; i<properties.xaxisLabels.length; ++i) {
                
                    if (typeof properties.xaxisLabels[i] === 'object' && properties.xaxisLabels[i].length === 2) {
                        var label = properties.xaxisLabels[i][0];
                    } else {
                        var label = properties.xaxisLabels[i];
                    }
                
                    label = RGraph.labelSubstitution({
                        object:    this,
                        text:      label,
                        index:     i,
                        value:     this.data[0][i],
                        decimals:  properties.xaxisLabelsFormattedDecimals  || 0,
                        unitsPre:  properties.xaxisLabelsFormattedUnitsPre  || '',
                        unitsPost: properties.xaxisLabelsFormattedUnitsPost || '',
                        thousand:  properties.xaxisLabelsFormattedThousand  || ',',
                        point:     properties.xaxisLabelsFormattedPoint     || '.'
                    });

                    if (typeof properties.xaxisLabels[i] === 'object' && properties.xaxisLabels[i].length === 2) {
                        properties.xaxisLabels[i][0] = label;
                    } else {
                        properties.xaxisLabels[i] = label;
                    }
                }
            }


            //
            // Make the margins easy ro access
            //
            this.marginLeft   = properties.marginLeft;
            this.marginRight  = properties.marginRight;
            this.marginTop    = properties.marginTop;
            this.marginBottom = properties.marginBottom;
    
            // Go through all the data points and see if a tooltip has been given
            this.hasTooltips = false;
            var overHotspot  = false;

            // Reset the coords array
            this.coords = [];
    
            //
            // This facilitates the xmax, xmin and X values being dates
            //
            if (typeof properties.xaxisScaleMin == 'string') properties.xaxisScaleMin = RGraph.parseDate(properties.xaxisScaleMin);
            if (typeof properties.xaxisScaleMax == 'string') properties.xaxisScaleMax = RGraph.parseDate(properties.xaxisScaleMax);

            //
            // Look for tooltips and populate the tooltips
            // 
            // NB 26/01/2011 Updated so that the tooltips property is ALWAYS populated
            //
            //if (!RGraph.ISOLD) {
                this.set('tooltips', []);
                for (var i=0,len=this.data.length; i<len; i+=1) {
                    for (var j =0,len2=this.data[i].length;j<len2; j+=1) {
    
                        if (this.data[i][j] && this.data[i][j][3]) {
                            properties.tooltips.push(this.data[i][j][3]);
                            this.hasTooltips = true;
                        } else {
                            properties.tooltips.push(null);
                        }
                    }
                }
            //}

            // Reset the maximum value
            this.max = 0;
    
            // Work out the maximum Y value
            //if (properties.ymax && properties.ymax > 0) {
            if (typeof properties.yaxisScaleMax === 'number') {

                this.max   = properties.yaxisScaleMax;
                this.min   = properties.yaxisScaleMin ? properties.yaxisScaleMin : 0;


                this.scale2 = RGraph.getScale({object: this, options: {
                    'scale.max':          this.max,
                    'scale.min':          this.min,
                    'scale.strict':       true,
                    'scale.thousand':     properties.yaxisScaleThousand,
                    'scale.point':        properties.yaxisScalePoint,
                    'scale.decimals':     properties.yaxisScaleDecimals,
                    'scale.labels.count': properties.yaxisLabelsCount,
                    'scale.round':        properties.yaxisScaleRound,
                    'scale.units.pre':    properties.yaxisScaleUnitsPre,
                    'scale.units.post':   properties.yaxisScaleUnitsPost
                }});
                
                this.max = this.scale2.max;
                this.min = this.scale2.min;
                var decimals = properties.yaxisScaleDecimals;
    
            } else {
    
                var i = 0;
                var j = 0;

                for (i=0,len=this.data.length; i<len; i+=1) {
                    for (j=0,len2=this.data[i].length; j<len2; j+=1) {
                        if (!RGraph.isNullish(this.data[i][j]) && this.data[i][j][1] != null) {
                            this.max = Math.max(this.max, typeof this.data[i][j][1] == 'object' ? RGraph.arrayMax(this.data[i][j][1]) : Math.abs(this.data[i][j][1]));
                        }
                    }
                }
    
                this.min   = properties.yaxisScaleMin ? properties.yaxisScaleMin : 0;

                this.scale2 = RGraph.getScale({object: this, options: {
                    'scale.max':          this.max,
                    'scale.min':          this.min,
                    'scale.thousand':     properties.yaxisScaleThousand,
                    'scale.point':        properties.yaxisScalePoint,
                    'scale.decimals':     properties.yaxisScaleDecimals,
                    'scale.labels.count': properties.yaxisLabelsCount,
                    'scale.round':        properties.yaxisScaleRound,
                    'scale.units.pre':    properties.yaxisScaleUnitsPre,
                    'scale.units.post':   properties.yaxisScaleUnitsPost
                }});

                this.max = this.scale2.max;
                this.min = this.scale2.min;
            }
    
            this.grapharea = this.canvas.height - this.marginTop - this.marginBottom;
    




            //
            // Install clipping
            //
            // MUST be the first thing that's done after the
            // beforedraw event
            //
            if (!RGraph.isNullish(this.properties.clip)) {
                RGraph.clipTo.start(this, this.properties.clip);
            }




            // Progressively Draw the chart
            RGraph.Background.draw(this);
    
            //
            // Draw any horizontal bars that have been specified
            //
            if (properties.backgroundHbars && properties.backgroundHbars.length) {
                RGraph.drawBars(this);
            }
    
            //
            // Draw any vertical bars that have been specified
            //
            if (properties.backgroundVbars && properties.backgroundVbars.length) {
                this.drawVBars();
            }

            //
            // Draw an X scale
            //
            if (!properties.xaxisScaleMax) {
              
                var xmax = 0;
                var xmin = properties.xaxisScaleMin;
              
                for (var ds=0,len=this.data.length; ds<len; ds+=1) {
                    for (var point=0,len2=this.data[ds].length; point<len2; point+=1) {
                        xmax = Math.max(xmax, this.data[ds][point][0]);
                    }
                }
            } else {
                xmax = properties.xaxisScaleMax;
                xmin = properties.xaxisScaleMin
            }

            if (properties.xaxisScale) {
                this.xscale2 = RGraph.getScale({object: this, options: {
                    'scale.max':          xmax,
                    'scale.min':          xmin,
                    'scale.decimals':     properties.xaxisScaleDecimals,
                    'scale.point':        properties.xaxisScalePoint,
                    'scale.thousand':     properties.xaxisScaleThousand,
                    'scale.units.pre':    properties.xaxisScaleUnitsPre,
                    'scale.units.post':   properties.xaxisScaleUnitsPost,
                    'scale.labels.count': properties.xaxisLabelsCount,
                    'scale.strict':       true
                }});

                this.set('xaxisScaleMax', this.xscale2.max);
            }

            this.drawAxes();







            this.drawLabels();

            // Clip the canvas so that the trace2 effect is facilitated
            if (properties.animationTrace) {
                this.context.save();
                this.context.beginPath();
                this.context.rect(0, 0, this.canvas.width * properties.animationTraceClip, this.canvas.height);
                this.context.clip();
            }

                for(i=0; i<this.data.length; ++i) {
                    
                    this.drawMarks(i);

                    // Draw bubbles
                    if (RGraph.isArray(properties.bubbleData)) {
                        this.drawBubble(i);
                    }
        
                    // Set the shadow
                    this.context.shadowColor   = properties.lineShadowColor;
                    this.context.shadowOffsetX = properties.lineShadowOffsetx;
                    this.context.shadowOffsetY = properties.lineShadowOffsety;
                    this.context.shadowBlur    = properties.lineShadowBlur;
    
                    this.drawLine(i);
        
                    // Turn the shadow off
                    RGraph.noShadow(this);
                }
        
        
                if (properties.line) {
                    for (var i=0,len=this.data.length;i<len; i+=1) {
                        this.drawMarks(i); // Call this again so the tickmarks appear over the line
                    }
                }
            
            
                //
                // Draw a trendline if requested
                //
                if (properties.trendline) {
                    for (var i=0; i<this.data.length; ++i) {
                        if (properties.trendline === true || (typeof properties.trendline === 'object' && properties.trendline[i] === true) ) {
                            this.drawTrendline(i);
                        }
                    }
                }
            
            if (properties.animationTrace) {
                this.context.restore();
            }
    
    
    
            //
            // Setup the context menu if required
            //
            if (properties.contextmenu) {
                RGraph.showContext(this);
            }
    
            
            
            //
            // Draw the key if necessary
            //

            if (properties.key && properties.key.length) {
                RGraph.drawKey(
                    this,
                    properties.key,
                    this.isMarimekko ? properties.marimekkoColors : properties.lineColors
                );
            }
    
    
            //
            // Draw " above" labels if enabled
            //
            if (properties.labelsAbove) {
                this.drawAboveLabels();
            }
    
            //
            // Draw the "in graph" labels, using the member function, NOT the shared function in RGraph.common.core.js
            //
            this.drawInGraphLabels(this);




            //
            // Add custom text thats specified
            //
            RGraph.addCustomText(this);







            // Draw any custom lines that have been defined
            RGraph.drawHorizontalLines(this);







            // Draw any custom lines that have been defined
            this.installLasso();


            //
            // Draw a Marimekko chart
            //
            if (this.isMarimekko) {
                this.drawMarimekko();
            }



    
    
    
    
            //
            // This installs the event listeners
            //
            RGraph.installEventListeners(this);
            
            //
            // End clipping
            //
            if (!RGraph.isNullish(this.properties.clip)) {
                RGraph.clipTo.end();
            }


            //
            // Fire the onfirstdraw event
            //
            if (this.firstDraw) {
                this.firstDraw = false;
                RGraph.fireCustomEvent(this, 'onfirstdraw');
                this.firstDrawFunc();
            }



            //
            // Fire the RGraph draw event
            //
            RGraph.fireCustomEvent(this, 'ondraw');









            //
            // Install any inline responsive configuration. This
            // should be last in the draw function - even after
            // the draw events.
            //
            RGraph.installInlineResponsive(this);








            return this;
        }








        //
        // Draws the axes of the scatter graph
        //
        this.drawAxes = function ()
        {
            this.context.lineCap = 'square';

            // Draw the X axis
            RGraph.drawXAxis(this);
            
            // Draw the Y axis
            RGraph.drawYAxis(this);

            // Reset the linewidth back to one
            //
            this.context.lineWidth = 1;
        };








        //
        // Draws the labels on the scatter graph
        //
        this.drawLabels = function ()
        {
            // Nothing to do here because the labels are drawn in the RGraph.drawXAxis() and
            // RGrapth.drawYAxis functions
        };








        //
        // Draws the actual scatter graph marks
        // 
        // @param i integer The dataset index
        //
        this.drawMarks = function (i)
        {
            //
            //  Reset the coords array
            //
            this.coords[i] = [];
    
            //
            // Plot the values
            //
            var xmax          = properties.xaxisScaleMax;
            var default_color = properties.colorsDefault;

            for (var j=0,len=this.data[i].length; j<len; j+=1) {
                //
                // This is here because tooltips are optional
                //
                var data_points = this.data[i];
                
                // Allow for null points
                if (RGraph.isNullish(data_points[j])) {
                    continue;
                }

                var xCoord  = data_points[j][0];
                var yCoord  = data_points[j][1];
                var color   = data_points[j][2] ? data_points[j][2] : default_color;
                var tooltip = (data_points[j] && data_points[j][3]) ? data_points[j][3] : null;
    

                this.drawMark(
                    i,
                    xCoord,
                    yCoord,
                    xmax,
                    this.scale2.max,
                    color,
                    tooltip,
                    this.coords[i],
                    data_points,
                    j
                );
            }
        };








        //
        // Draws a single scatter mark
        //
        this.drawMark = function (data_set_index, x, y, xMax, yMax, color, tooltip, coords, data, data_index)
        {
            var tickmarks = properties.tickmarksStyle,
                tickSize  = properties.tickmarksSize,
                xMin      = properties.xaxisScaleMin,
                x         = ((x - xMin) / (xMax - xMin)) * (this.canvas.width - this.marginLeft - this.marginRight),
                originalX = x,
                originalY = y;

            //
            // This allows the tickmarks property to be an array
            //
            if (tickmarks && typeof tickmarks == 'object') {
                tickmarks = tickmarks[data_set_index];
            }
    
    
            //
            // This allows the ticksize property to be an array
            //
            if (typeof tickSize == 'object') {
                var tickSize     = tickSize[data_set_index];
                var halfTickSize = tickSize / 2;
            } else {
                var halfTickSize = tickSize / 2;
            }
    
    
            //
            // This bit is for boxplots only
            //
            if (   y
                && typeof y === 'object'
                && typeof y[0] === 'number'
                && typeof y[1] === 'number'
                && typeof y[2] === 'number'
                && typeof y[3] === 'number'
                && typeof y[4] === 'number'
               ) {
    
                this.set('boxplot', true);
    
    
                var y0   = this.getYCoord(y[0], properties.outofbounds),
                    y1   = this.getYCoord(y[1], properties.outofbounds),
                    y2   = this.getYCoord(y[2], properties.outofbounds),
                    y3   = this.getYCoord(y[3], properties.outofbounds),
                    y4   = this.getYCoord(y[4], properties.outofbounds),
                    col1 = y[5],
                    col2 = y[6],
                    boxWidth = typeof y[7]  == 'number' ? y[7] : properties.boxplotWidth;
    
    
            } else {
    
                //
                // The new way of getting the Y coord. This function (should) handle everything
                //
                var yCoord = this.getYCoord(y, properties.outofbounds);
            }
    
            //
            // Account for the X axis being at the centre
            //
            // This is so that points are on the graph, and not the gutter - which helps
            x += this.marginLeft;
    
    
    
    
            this.context.beginPath();
            
            // Color
            this.context.strokeStyle = color;
    
    
    
            //
            // Boxplots
            //
            if (properties.boxplot) {

                // boxWidth is a scale value, so convert it to a pixel vlue
                boxWidth = (boxWidth / properties.xaxisScaleMax) * (this.canvas.width - this.marginLeft - this.marginRight);
    
                var halfBoxWidth = boxWidth / 2;
    
                if (properties.lineVisible) {
                    this.context.beginPath();
                        
                        // Set the outline color of the box

                        if (typeof y[8] === 'string') {
                            this.context.strokeStyle = y[8];
                        }
                        this.context.strokeRect(x - halfBoxWidth, y1, boxWidth, y3 - y1);
            
                        // Draw the upper coloured box if a value is specified
                        if (col1) {
                            this.context.fillStyle = col1;
                            this.context.fillRect(x - halfBoxWidth, y1, boxWidth, y2 - y1);
                        }
            
                        // Draw the lower coloured box if a value is specified
                        if (col2) {
                            this.context.fillStyle = col2;
                            this.context.fillRect(x - halfBoxWidth, y2, boxWidth, y3 - y2);
                        }
                    this.context.stroke();
        
                    // Now draw the whiskers
                    this.context.beginPath();
                    if (properties.boxplotCapped) {
                        this.context.moveTo(x - halfBoxWidth, Math.round(y0));
                        this.context.lineTo(x + halfBoxWidth, Math.round(y0));
                    }
        
                    this.context.moveTo(Math.round(x), y0);
                    this.context.lineTo(Math.round(x ), y1);
        
                    if (properties.boxplotCapped) {
                        this.context.moveTo(x - halfBoxWidth, Math.round(y4));
                        this.context.lineTo(x + halfBoxWidth, Math.round(y4));
                    }
        
                    this.context.moveTo(Math.round(x), y4);
                    this.context.lineTo(Math.round(x), y3);

                    this.context.stroke();
                }
            }
    
    
            //
            // Draw the tickmark, but not for boxplots
            //
            if (properties.lineVisible && typeof y == 'number' && !y0 && !y1 && !y2 && !y3 && !y4) {
    
                if (tickmarks == 'circle') {
                    this.context.arc(x, yCoord, halfTickSize, 0, 6.28, 0);
                    this.context.fillStyle = color;
                    this.context.fill();
                
                } else if (tickmarks == 'plus') {
    
                    this.context.moveTo(x, yCoord - halfTickSize);
                    this.context.lineTo(x, yCoord + halfTickSize);
                    this.context.moveTo(x - halfTickSize, yCoord);
                    this.context.lineTo(x + halfTickSize, yCoord);
                    this.context.stroke();
                
                } else if (tickmarks == 'square') {
                    this.context.strokeStyle = color;
                    this.context.fillStyle = color;
                    this.context.fillRect(
                        x - halfTickSize,
                        yCoord - halfTickSize,
                        tickSize,
                        tickSize
                    );
    
                } else if (tickmarks == 'cross') {
    
                    this.context.moveTo(x - halfTickSize, yCoord - halfTickSize);
                    this.context.lineTo(x + halfTickSize, yCoord + halfTickSize);
                    this.context.moveTo(x + halfTickSize, yCoord - halfTickSize);
                    this.context.lineTo(x - halfTickSize, yCoord + halfTickSize);
                    
                    this.context.stroke();
                
                //
                // Diamond shape tickmarks
                //
                } else if (tickmarks == 'diamond') {
                    this.context.fillStyle = this.context.strokeStyle;
    
                    this.context.moveTo(x, yCoord - halfTickSize);
                    this.context.lineTo(x + halfTickSize, yCoord);
                    this.context.lineTo(x, yCoord + halfTickSize);
                    this.context.lineTo(x - halfTickSize, yCoord);
                    this.context.lineTo(x, yCoord - halfTickSize);
    
                    this.context.fill();
                    this.context.stroke();
    
                //
                // Custom tickmark style
                //
                } else if (typeof tickmarks == 'function') {
    
                    var graphWidth  = this.canvas.width - this.marginLeft - this.marginRight,
                        graphheight = this.canvas.height - this.marginTop - this.marginBottom,
                        xVal = ((x - this.marginLeft) / graphWidth) * xMax,
                        yVal = ((graphheight - (yCoord - this.marginTop)) / graphheight) * yMax;
    
                    tickmarks(this, data, x, yCoord, xVal, yVal, xMax, yMax, color, data_set_index, data_index)

















                //
                // Image based tickmark
                //
                // lineData, xPos, yPos, color, isShadow, prevX, prevY, tickmarks, index
                } else if (
                           typeof tickmarks === 'string' &&
                            (
                             tickmarks.substr(0, 6) === 'image:'  ||
                             tickmarks.substr(0, 5) === 'data:'   ||
                             tickmarks.substr(0, 1) === '/'       ||
                             tickmarks.substr(0, 3) === '../'     ||
                             tickmarks.substr(0, 7) === 'images/' ||
                             tickmarks.substr(0, 8) === '/images/'
                            )
                          ) {
    
                    var img = new Image();
                    
                    if (tickmarks.substr(0, 6) === 'image:') {
                        img.src = tickmarks.substr(6);
                    } else {
                        img.src = tickmarks;
                    }
    
                    var obj = this;
                    img.onload = function ()
                    {
                        var width  = this.width * scaleFactor;
                        var height = this.height * scaleFactor;

                        if (properties.tickmarksStyleImageHalign === 'center') x -= (this.width / 2);
                        if (properties.tickmarksStyleImageHalign === 'right')  x -= this.width;

                        if (properties.tickmarksStyleImageValign === 'center') yCoord -= (this.height / 2);
                        if (properties.tickmarksStyleImageValign === 'bottom') yCoord -= this.height;
                        
                        x += properties.tickmarksStyleImageOffsetx;
                        yCoord += properties.tickmarksStyleImageOffsety;
    
                        obj.context.drawImage(this, x, yCoord, width, height);
                    }





                //
                // No tickmarks
                //
                } else if (tickmarks === null) {
        
                //
                // Unknown tickmark type
                //
                } else {
                    alert('[SCATTER] (' + this.id + ') Unknown tickmark style: ' + tickmarks );
                }
            }
    
            //
            // Add the tickmark to the coords array
            //

            if (   properties.boxplot
                && typeof y0 === 'number'
                && typeof y1 === 'number'
                && typeof y2 === 'number'
                && typeof y3 === 'number'
                && typeof y4 === 'number') {
    
                x      = [x - halfBoxWidth, x + halfBoxWidth];
                yCoord = [y0, y1, y2, y3, y4];
            }
    
            coords.push([x, yCoord, tooltip]);
        };








        //
        // Draws an optional line connecting the tick marks.
        // 
        // @param i The index of the dataset to use
        //
        this.drawLine = function (i)
        {
            if (typeof properties.lineVisible == 'boolean' && properties.lineVisible == false) {
                return;
            }
    
            if (properties.line && this.coords[i].length >= 2) {
            
                if (properties.lineDash && typeof this.context.setLineDash === 'function') {
                    this.context.setLineDash(properties.lineDash);
                }

                this.context.lineCap     = 'round';
                this.context.lineJoin    = 'round';
                this.context.lineWidth   = this.getLineWidth(i);// i is the index of the set of coordinates
                this.context.strokeStyle = properties.lineColors[i];

                this.context.beginPath();

                    var prevY = null;
                    var currY = null;
        
                    for (var j=0,len=this.coords[i].length; j<len; j+=1) {
                    
        
                        var xPos = this.coords[i][j][0];
                        var yPos = this.coords[i][j][1];
                        
                        if (j > 0) prevY = this.coords[i][j - 1][1];
                        currY = yPos;
    
                        if (j == 0 || RGraph.isNullish(prevY) || RGraph.isNullish(currY)) {
                            this.context.moveTo(xPos, yPos);
                        } else {
                        
                            // Stepped?
                            var stepped = properties.lineStepped;
        
                            if (   (typeof stepped == 'boolean' && stepped)
                                || (typeof stepped == 'object' && stepped[i])
                               ) {
                                this.context.lineTo(this.coords[i][j][0], this.coords[i][j - 1][1]);
                            }
        
                            this.context.lineTo(xPos, yPos);
                        }
                    }
                this.context.stroke();
            
                //
                // Set the linedash back to the default
                //
                if (properties.lineDash && typeof this.context.setLineDash === 'function') {
                    //this.context.setLineDash([1,0]);
                    this.context.setLineDash([]);
                }
            }

            //
            // Set the linewidth back to 1
            //
            this.context.lineWidth = 1;
        };








        //
        // Returns the linewidth
        // 
        // @param number i The index of the "line" (/set of coordinates)
        //
        this.getLineWidth = function (i)
        {
            var linewidth = properties.lineLinewidth;
            
            if (typeof linewidth == 'number') {
                return linewidth;
            
            } else if (typeof linewidth == 'object') {
                if (linewidth[i]) {
                    return linewidth[i];
                } else {
                    return linewidth[0];
                }
    
                alert('[SCATTER] Error! The linewidth property should be a single number or an array of one or more numbers');
            }
        };








        //
        // Draws vertical bars. Line chart doesn't use a horizontal scale, hence this function
        // is not common
        //
        this.drawVBars = function ()
        {
            var vbars = properties.backgroundVbars;
            var graphWidth = this.canvas.width - this.marginLeft - this.marginRight;

            if (vbars) {
            
                var xmax = properties.xaxisScaleMax;
                var xmin = properties.xaxisScaleMin;
                
                for (var i=0,len=vbars.length; i<len; i+=1) {
                    
                    var key = i;
                    var value = vbars[key];

                    //
                    // Accomodate date/time values
                    //
                    if (typeof value[0] == 'string') value[0] = RGraph.parseDate(value[0]);
                    if (typeof value[1] == 'string') value[1] = RGraph.parseDate(value[1]) - value[0];

                    var x     = (( (value[0] - xmin) / (xmax - xmin) ) * graphWidth) + this.marginLeft;
                    var width = (value[1] / (xmax - xmin) ) * graphWidth;

                    this.context.fillStyle = value[2];
                    this.context.fillRect(x, this.marginTop, width, (this.canvas.height - this.marginTop - this.marginBottom));
                }
            }
        };








        //
        // Draws in-graph labels.
        // 
        // @param object obj The graph object
        //
        this.drawInGraphLabels = function (obj)
        {
            var labels  = obj.get('labelsIngraph');
            var labels_processed = [];
            var scaleFactor = RGraph.getScaleFactor(this);

            if (!labels) {
                return;
            }
    
            // Defaults
            var fgcolor   = 'black';
            var bgcolor   = 'white';
            var direction = 1;

    
            var textConf = RGraph.getTextConf({
                object: this,
                prefix: 'labelsIngraph'
            });

            //
            // Preprocess the labels array. Numbers are expanded
            //
            for (var i=0,len=labels.length; i<len; i+=1) {
                if (typeof labels[i] == 'number') {
                    for (var j=0; j<labels[i]; ++j) {
                        labels_processed.push(null);
                    }
                } else if (typeof labels[i] == 'string' || typeof labels[i] == 'object') {
                    labels_processed.push(labels[i]);
                
                } else {
                    labels_processed.push('');
                }
            }

            //
            // Turn off any shadow
            //
            RGraph.noShadow(obj);
    
            if (labels_processed && labels_processed.length > 0) {
    
                var i=0;
    
                for (var set=0; set<obj.coords.length; ++set) {
                    for (var point = 0; point<obj.coords[set].length; ++point) {
                        if (labels_processed[i]) {
                            var x = obj.coords[set][point][0] + properties.labelsIngraphOffsetx;
                            var y = obj.coords[set][point][1] + properties.labelsIngraphOffsety;
                            var length = typeof labels_processed[i][4] == 'number' ? labels_processed[i][4] : 25;
                                
                            var text_x = x;
                            var text_y = y - (5 * scaleFactor) - (length * scaleFactor);
    
                            this.context.moveTo(x, y - (5 * scaleFactor));
                            this.context.lineTo(x, y - (5 * scaleFactor)- (length * scaleFactor));
                            
                            this.context.stroke();
                            this.context.beginPath();
                            
                            // This draws the arrow
                            this.context.moveTo(x, y - (5 * scaleFactor));
                            this.context.lineTo(x - (3 * scaleFactor), y - (10 * scaleFactor));
                            this.context.lineTo(x + (3 * scaleFactor), y - (10 * scaleFactor));
                            this.context.closePath();

                            this.context.beginPath();
                                // Fore ground color
                                this.context.fillStyle = (typeof labels_processed[i] == 'object' && typeof labels_processed[i][1] == 'string') ? labels_processed[i][1] : 'black';
                                
                                RGraph.text({
                                    
                              object: this,
                                
                                font:   textConf.font,
                                size:   textConf.size,
                                color:  textConf.color,
                                bold:   textConf.bold,
                                italic: textConf.italic,

                                    x:            text_x,
                                    y:            text_y,
                                    text:         (typeof labels_processed[i] == 'object' && typeof labels_processed[i][0] == 'string') ? labels_processed[i][0] : labels_processed[i],
                                    valign:       'bottom',
                                    halign:       'center',
                                    bounding:     true,
                                    boundingFill: (typeof labels_processed[i] == 'object' && typeof labels_processed[i][2] == 'string') ? labels_processed[i][2] : 'white',
                                    tag:          'labels.ingraph'
                                });
                            this.context.fill();
                        }
                        
                        i++;
                    }
                }
            }
        };








        //
        // This function makes it much easier to get the (if any) point that is currently being hovered over.
        // 
        // @param object e The event object
        //
        this.getShape = function (e)
        {
            var mouseXY     = RGraph.getMouseXY(e);
            var mouseX      = mouseXY[0];
            var mouseY      = mouseXY[1];
            var overHotspot = false;
            var offset      = properties.tooltipsHotspot; // This is how far the hotspot extends

            if (this.isMarimekko) {

                for (var i=0,seq=0; i<this.coordsMarimekko.length; ++i) {
                    for (var j=0; j<this.coordsMarimekko[i].length; ++j) {

                        let coords = this.coordsMarimekko[i][j];

                        if (    mouseX > coords[0]
                             && mouseX < (coords[0] + coords[2])
                             && mouseY > coords[1]
                             && mouseY < (coords[1] + coords[3])
                             && (this.properties.clip ? RGraph.clipTo.test(this, mouseX, mouseY) : true)
                            ) {
                            // Determine the tooltip
                            var tooltip = null;
                            if (RGraph.isString(this.get('marimekkoTooltips'))) {
                                tooltip = this.get('marimekkoTooltips');
                            } else if ( RGraph.isArray(this.get('marimekkoTooltips')) && RGraph.isString(this.get('marimekkoTooltips')[seq])) {
                                tooltip = this.get('marimekkoTooltips')[seq];
                            }
                            
                            if (RGraph.parseTooltipText) {
                                tooltip = RGraph.parseTooltipText(tooltip, seq);
                            }

                            // Return the shape array
                            return {
                            object: this,
                                 x: coords[0],
                                 y: coords[1],
                             width: coords[2],
                            height: coords[3],
                           tooltip: tooltip,
                           dataset: i,
                             index: j,
                   sequentialIndex: seq
                            };
                        }

                        ++seq;
                        
                    }
                }

            } else {
                for (var set=0,len=this.coords.length; set<len; ++set) {
                    for (var i=0,len2=this.coords[set].length; i<len2; ++i) {

                        var x = this.coords[set][i][0];
                        var y = this.coords[set][i][1];
                        var tooltip = this.data[set][i][3];
                        
                        var seq = this.dataIndexMapGroupedToSequential[set][i];

                        var bubbleMin  = this.properties.bubbleMin;
                        var bubbleMax  = this.properties.bubbleMax;
                        var bubbleData = this.properties.bubbleData;
                        var maxWidth   = this.properties.bubbleWidth;
                        var isBubble   =    RGraph.isNumber(bubbleMin)
                                         && RGraph.isNumber(bubbleMax)
                                         && RGraph.isArray(bubbleData)
                                         && RGraph.isNumber(bubbleData[seq]);
                        if (isBubble) {

                            // Get the width of the bubble from the coordinates
                            var bubbleWidth = this.coordsBubble[set][i][2];

                            // Get the mouse distance from the center
                            // of the point
                            var hypLength = RGraph.getHypLength(mouseX, mouseY, x, y);
                        }
                        
                        // Add highlight so that we can observe the hotspot
                        //this.path('lw 1 b a % % % 0 6.29 false s gray', x, y, bubbleWidth)

                        if (typeof y == 'number') {
                            if (   ((isBubble && hypLength <= bubbleWidth) || (mouseX <= (x + offset) && mouseX >= (x - offset) && mouseY <= (y + offset) && mouseY >= (y - offset)))
                                && (this.properties.clip ? RGraph.clipTo.test(this, mouseX, mouseY) : true)) {


    
                                if (RGraph.parseTooltipText) {
                                    var tooltip = RGraph.parseTooltipText(this.data[set][i][3], 0);
                                }
    
                                var sequentialIndex = i;
        
                                for (var ds=(set-1); ds >=0; --ds) {
                                    sequentialIndex += this.data[ds].length;
                                }
    
                                
                                
                                
    
                                // Should the point be ignored?
                                if (RGraph.tooltipsHotspotIgnore(this, sequentialIndex)) {
                                    return;
                                }
    
    
    
    
                                return {
                                    object: this,
                                         x: x,
                                         y: y,
                                   tooltip: typeof tooltip === 'string' ? tooltip : null,
                                   dataset: set,
                                     index: i,
                           sequentialIndex: sequentialIndex
                                };
                            }
    
    
    
    
                        } else if (RGraph.isNullish(y)) {
                            // Nothing to see here
    
    
    
    
    
                        // Boxplots
                        } else {
    
                            var mark = this.data[set][i];
    
                            //
                            // Determine the width
                            //
                            var width = properties.boxplotWidth;
                            
                            if (typeof mark[1][7] === 'number') {
                                width = mark[1][7];
                            }
    
                            if (   typeof x === 'object'
                                && mouseX > x[0]
                                && mouseX < x[1]
                                && mouseY > y[1]
                                && mouseY < y[3]
                                ) {
    
                                var tooltip = RGraph.parseTooltipText(this.data[set][i][3], 0);
    
                                // Determine the sequential index
                                var sequentialIndex = i;    
                                for (var ds=(set-1); ds >=0; --ds) {
                                    sequentialIndex += this.data[ds].length;
                                }
    
                                return {
                                 object: this,
                                      x: x[0],
                                      y: y[3],
                                  width: Math.abs(x[1] - x[0]),
                                 height: Math.abs(y[1] - y[3]),
                                dataset: set,
                                  index: i,
                        sequentialIndex: sequentialIndex,
                                tooltip: tooltip
                                };
                            }
                        }
                    }
                }
            }
        };








        //
        // Draws the above line labels
        //
        this.drawAboveLabels = function ()
        {
            var size       = properties.labelsAboveSize;
            var font       = properties.textFont;
            var units_pre  = properties.yaxisScaleUnitsPre;
            var units_post = properties.yaxisScaleUnitsPost;
            
            var textConf = RGraph.getTextConf({
                object: this,
                prefix: 'labelsAbove'
            });
    
            for (var set=0,len=this.coords.length; set<len; ++set) {
                for (var point=0,len2=this.coords[set].length; point<len2; ++point) {
                    
                    var x_val = this.data[set][point][0];
                    var y_val = this.data[set][point][1];
                    
                    if (!RGraph.isNullish(y_val)) {
                        
                        // Use the top most value from a box plot
                        if (RGraph.isArray(y_val)) {
                            var max = 0;
                            for (var i=0; i<y_val; ++i) {
                                max = Math.max(max, y_val[i]);
                            }
                            
                            y_val = max;
                        }
                        
                        var x_pos = this.coords[set][point][0];
                        var y_pos = this.coords[set][point][1];


                        var xvalueFormatter = properties.labelsAboveFormatterX;
                        var yvalueFormatter = properties.labelsAboveFormatterY;

                        RGraph.text({
                                    
                      object: this,

                        font:   textConf.font,
                        size:   textConf.size,
                        color:  textConf.color,
                        bold:   textConf.bold,
                        italic: textConf.italic,

                            x:            x_pos + properties.labelsAboveOffsetx,
                            y:            y_pos - 5 - size + properties.labelsAboveOffsety,
                            
                            text:         
                                (typeof xvalueFormatter === 'function' ? xvalueFormatter(this, x_val) : x_val.toFixed(properties.labelsAboveDecimals)) +
                                ', ' +
                                (typeof yvalueFormatter === 'function' ? yvalueFormatter(this, y_val) : y_val.toFixed(properties.labelsAboveDecimals)),
                            
                            valign:       'bottom',
                            halign:       'center',
                            bounding:     true,
                            boundingFill: 'rgba(255, 255, 255, 0.7)',
                            boundingStroke: 'rgba(0,0,0,0.1)',
                            tag:          'labels.above'
                        });
                    }
                }
            }
        };








        //
        // When you click on the chart, this method can return the Y value at that point. It works for any point on the
        // chart (that is inside the gutters) - not just points within the Bars.
        // 
        // @param object e The event object
        //
        this.getYValue = function (arg)
        {
            if (arg.length == 2) {
                var mouseX = arg[0];
                var mouseY = arg[1];
            } else {
                var mouseCoords = RGraph.getMouseXY(arg);
                var mouseX      = mouseCoords[0];
                var mouseY      = mouseCoords[1];
            }
            
            var obj = this;
    
            if (   mouseY < this.marginTop
                || mouseY > (this.canvas.height - this.marginBottom)
                //|| mouseX < this.marginLeft
                //|| mouseX > (this.canvas.width - this.marginRight)
               ) {
                return null;
            }
            
            if (properties.xaxisPosition == 'center') {
                var value = (((this.grapharea / 2) - (mouseY - this.marginTop)) / this.grapharea) * (this.max - this.min)
                value *= 2;
                
                
                // Account for each side of the X axis
                if (value >= 0) {
                    value += this.min

                    if (properties.yaxisScaleInvert) {
                        value -= this.min;
                        value = this.max - value;
                    }
                
                } else {

                    value -= this.min;
                    if (properties.yaxisScaleInvert) {
                        value += this.min;
                        value = this.max + value;
                        value *= -1;
                    }
                }

            } else {

                var value = ((this.grapharea - (mouseY - this.marginTop)) / this.grapharea) * (this.max - this.min)
                value += this.min;
                
                if (properties.yaxisScaleInvert) {
                    value -= this.min;
                    value = this.max - value;
                }
            }
    
            return value;
        };








        //
        // When you click on the chart, this method can return the X value at that point.
        // 
        // @param mixed  arg This can either be an event object or the X coordinate
        // @param number     If specifying the X coord as the first arg then this should be the Y coord
        //
        this.getXValue = function (arg)
        {
            if (arg.length == 2) {
                var mouseX = arg[0];
                var mouseY = arg[1];
            } else {
                var mouseXY = RGraph.getMouseXY(arg);
                var mouseX  = mouseXY[0];
                var mouseY  = mouseXY[1];
            }
            var obj = this;
            
            if (//|| mouseY < this.marginTop
                //|| mouseY > (this.canvas.height - this.marginBottom)
                mouseX < this.marginLeft
                || mouseX > (this.canvas.width - this.marginRight)
               ) {
                return null;
            }
    
            var width = (this.canvas.width - this.marginLeft - this.marginRight);
            var value = ((mouseX - this.marginLeft) / width) * (properties.xaxisScaleMax - properties.xaxisScaleMin)
            value += properties.xaxisScaleMin;

            return value;
        };








        //
        // Each object type has its own Highlight() function which highlights the appropriate shape
        // 
        // @param object shape The shape to highlight
        //
        this.highlight = function (shape)
        {
            if (typeof properties.highlightStyle === 'function') {
                (properties.highlightStyle)(shape);
            
            // Inverted highlight style
            } else if (properties.highlightStyle === 'invert') {
            
                var tickmarksSize = properties.tickmarksSize;

                // Clip to the graph area
                this.path(
                    'sa b r % % % % cl',
                    properties.marginLeft - tickmarksSize, properties.marginTop - tickmarksSize,
                    this.canvas.width - properties.marginLeft - properties.marginRight + tickmarksSize + tickmarksSize,
                    this.canvas.height - properties.marginTop - properties.marginBottom + tickmarksSize + tickmarksSize
                );

                this.path(
                    'b m % % a % % 25 4.71 4.72 true l % % l % % l % % l % % l % % c f %',
                    shape.x, properties.marginTop,
                    shape.x, shape.y,
                    shape.x, 0,
                    this.canvas.width, 0,
                    this.canvas.width, this.canvas.height,
                    0, this.canvas.height,
                    0, 0,
                    properties.highlightFill
                );
                
                // Draw a border around the circular cutout
                this.path(
                    'b a % % 25 0 6.29 false s % rs',
                    shape.x, shape.y,
                    properties.highlightStroke
                );
            } else {

                // Boxplot highlight
                if (shape.height) {
                    RGraph.Highlight.rect(this, shape);
                
                // Bubble chart highlight
                } else if (
                              RGraph.isNumber(this.properties.bubbleMin)
                           && RGraph.isNumber(this.properties.bubbleMax)
                           && RGraph.isNumber(this.properties.bubbleWidth)
                           && RGraph.isArray(this.properties.bubbleData)
                           && RGraph.isNumber(this.properties.bubbleData[shape.sequentialIndex])
                          ) {
                    var value = this.properties.bubbleData[shape.sequentialIndex];
                    var min   = this.properties.bubbleMin;
                    var max   = this.properties.bubbleMax;
                    var width = this.properties.bubbleWidth;

                    this.properties.highlightPointRadius = (value - min) / (max - min) * width / 2;
                    RGraph.Highlight.point(this, shape);

                // Point highlight
                } else {
                    var scaleFactor = RGraph.getScaleFactor(this);
                    
                    this.properties.highlightPointRadius = this.properties.tickmarksSize / scaleFactor;
                    RGraph.Highlight.point(this, shape);
                }
            }
        };








        //
        // The getObjectByXY() worker method. Don't call this call:
        // 
        // RGraph.ObjectRegistry.getObjectByXY(e)
        // 
        // @param object e The event object
        //
        this.getObjectByXY = function (e)
        {
            var mouseXY = RGraph.getMouseXY(e);

            if (
                   mouseXY[0] > (this.marginLeft - 3)
                && mouseXY[0] < (this.canvas.width - this.marginRight + 3)
                && mouseXY[1] > (this.marginTop - 3)
                && mouseXY[1] < ((this.canvas.height - this.marginBottom) + 3)
                ) {
    
                return this;
            
            //
            // Do this if a bubble chart is being shown to
            // accommodate bubbles that are outside of the
            // graphArea
            //
            } else if (
                          RGraph.isArray(this.properties.bubbleData)
                       && RGraph.isNumber(this.properties.bubbleMax)
                       && RGraph.isNumber(this.properties.bubbleMin)
                       && RGraph.isNumber(this.properties.bubbleWidth)
                      ) {
                      
                    // Draw a rectangle which matches the
                    // graphArea - except that it's bigger by half-a-bubbles
                    // width to accommodate them poking out at the adges of
                    // the canvas
                    var halfBubble = this.properties.bubbleWidth / 2;
                    
                    if (
                           mouseXY[0] > (this.marginLeft - halfBubble)
                        && mouseXY[0] < (this.canvas.width - this.marginRight + halfBubble)
                        && mouseXY[1] > (this.marginTop - halfBubble)
                        && mouseXY[1] < ((this.canvas.height - this.marginBottom) + halfBubble)
                       ) {
                        return this;
                    }
            }
        };








        //
        // This function can be used when the canvas is clicked on (or similar - depending on the event)
        // to retrieve the relevant X coordinate for a particular value.
        // 
        // @param int value The value to get the X coordinate for
        //
        this.getXCoord = function (value)
        {
            if (typeof value != 'number' && typeof value != 'string') {
                return null;
            }
            
            // Allow for date strings to be passed
            if (typeof value === 'string') {
                value = RGraph.parseDate(value);
            }

            var xmin = properties.xaxisScaleMin;
            var xmax = properties.xaxisScaleMax;
            var x;
    
            if (value < xmin) return null;
            if (value > xmax) return null;
    
            if (properties.yaxisPosition == 'right') {
                x = ((value - xmin) / (xmax - xmin)) * (this.canvas.width - this.marginLeft - this.marginRight);
                x = (this.canvas.width - this.marginRight - x);
            } else {
                x = ((value - xmin) / (xmax - xmin)) * (this.canvas.width - this.marginLeft - this.marginRight);
                x = x + this.marginLeft;
            }
            
            return x;
        };








        //
        // Returns the applicable Y COORDINATE when given a Y value
        // 
        // @param int value The value to use
        // @return int The appropriate Y coordinate
        //
        this.getYCoord = function (value)
        {
            var outofbounds = arguments[1];

            if (typeof value != 'number') {

                return null;
            }

            var invert          = properties.yaxisScaleInvert;
            var xaxispos        = properties.xaxisPosition;
            var graphHeight     = this.canvas.height - this.marginTop - this.marginBottom;
            var halfGraphHeight = graphHeight / 2;
            var ymax            = this.max;
            var ymin            = properties.yaxisScaleMin;
            var coord           = 0;
    
            if (   (value > ymax && !outofbounds)
                || (properties.xaxisPosition === 'bottom' && value < ymin && !outofbounds)
                || (properties.xaxisPosition === 'center' && ((value > 0 && value < ymin) || (value < 0 && value > (-1 * ymin))))
               ) {
                return null;
            }

            //
            // This calculates scale values if the X axis is in the center
            //
            if (xaxispos == 'center') {
    
                coord = ((Math.abs(value) - ymin) / (ymax - ymin)) * halfGraphHeight;
    
                if (invert) {
                    coord = halfGraphHeight - coord;
                }
                
                if (value < 0) {
                    coord += this.marginTop;
                    coord += halfGraphHeight;
                } else {
                    coord  = halfGraphHeight - coord;
                    coord += this.marginTop;
                }
    
            //
            // And this calculates scale values when the X axis is at the bottom
            //
            } else {
    
                coord = ((value - ymin) / (ymax - ymin)) * graphHeight;

                if (invert) {
                    coord = graphHeight - coord;
                }
    
                // Invert the coordinate because the Y scale starts at the top
                coord = graphHeight - coord;

                // And add on the top gutter
                coord = this.marginTop + coord;
            }
    
            return coord;
        };








        //
        // Draws a bubble chart
        //
        // @param dataset int The dataset index
        //
        this.drawBubble = function (dataset)
        {
            //
            // First things first, linearize the bubbleData array.
            // Doing this allows you to give the array as both
            // linear and multi-dimensional (for qwhen you have
            // multiple datasets)
            //
            properties.bubbleData = RGraph.arrayLinearize(properties.bubbleData);

            // Now that the bubbleData is linearised this is not
            // really necessary
            //var data  = RGraph.isArray(properties.bubbleData) && RGraph.isArray(properties.bubbleData[dataset]) ? properties.bubbleData[dataset] : properties.bubbleData;
            
            var data  = this.properties.bubbleData;
            var min   = RGraph.isArray(this.properties.bubbleMin)   ? this.properties.bubbleMin[dataset]   : this.properties.bubbleMin;
            var max   = RGraph.isArray(this.properties.bubbleMax)   ? this.properties.bubbleMax[dataset]   : this.properties.bubbleMax;
            var width = RGraph.isArray(this.properties.bubbleWidth) ? this.properties.bubbleWidth[dataset] : this.properties.bubbleWidth;

            // Initialise the coordinates array
            this.coordsBubble[dataset] = [];

            // Loop through all the points (ALL datasets now)
            for (var index=0; index<this.coords[dataset].length; ++index) {

                // Get the sequential index
                var seq = this.dataIndexMapGroupedToSequential[dataset][index];

                //
                // Is there a bubble data-piece for this point?
                // If not the skip it.
                //
                if (!RGraph.isNumber(data[seq])) {
                    continue;
                }

                data[seq] = Math.max(data[seq], min);
                data[seq] = Math.min(data[seq], max);

                var radius = (((data[seq] - min) / (max - min) ) * width) / 2,
                    color  = this.data[dataset][index][2] ? this.data[dataset][index][2] : this.properties.colorsDefault;












                // Set a shadow for the bubbles if requested
                if (this.properties.bubbleShadow) {
                    RGraph.setShadow({
                        object: this,
                        prefix:'bubbleShadow'
                    });
                }

                this.context.beginPath();
                this.context.fillStyle = RGraph.radialGradient({
                    object: this,
                    x1:     this.coords[dataset][index][0] + (radius / 2.5),
                    y1:     this.coords[dataset][index][1] - (radius / 2.5),
                    r1:     0,
                    x2:     this.coords[dataset][index][0] + (radius / 2.5),
                    y2:     this.coords[dataset][index][1] - (radius / 2.5),
                    r2:     radius,
                    colors: [
                        this.properties.colorsBubbleGraduated ? 'white' : color,
                        color
                    ]
                });

                // Draw the bubble
                this.context.arc(
                    this.coords[dataset][index][0],
                    this.coords[dataset][index][1],
                    radius,
                    0,
                    RGraph.TWOPI,
                    false
                );

                if (this.properties.colorsBubbleStroke) {
                    this.context.lineWidth   = this.properties.bubbleLinewidth;
                    this.context.strokeStyle = this.properties.colorsBubbleStroke;
                    this.context.stroke();
                }

                this.context.fill();

                // Clear the shadow
                if (this.properties.bubbleShadow) {
                    RGraph.noShadow(this);
                }

                this.coordsBubble[dataset][index] = [
                    this.coords[dataset][index][0],
                    this.coords[dataset][index][1],
                    radius,
                    this.context.fillStyle
                ];
            }
        };








        //
        // This allows for easy specification of gradients
        //
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (this.original_colors.length === 0) {
                this.original_colors.data                 = RGraph.arrayClone(this.data, true);
                this.original_colors.backgroundVbars      = RGraph.arrayClone(properties.backgroundVbars, true);
                this.original_colors.backgroundHbars      = RGraph.arrayClone(properties.backgroundHbars, true);
                this.original_colors.lineColors           = RGraph.arrayClone(properties.lineColors, true);
                this.original_colors.colorsDefault        = RGraph.arrayClone(properties.colorsDefault, true);
                this.original_colors.crosshairsColor      = RGraph.arrayClone(properties.crosshairsColor, true);
                this.original_colors.highlightStroke      = RGraph.arrayClone(properties.highlightStroke, true);
                this.original_colors.highlightFill        = RGraph.arrayClone(properties.highlightFill, true);
                this.original_colors.backgroundBarsColor1 = RGraph.arrayClone(properties.backgroundBarsColor1, true);
                this.original_colors.backgroundBarsColor2 = RGraph.arrayClone(properties.backgroundBarsColor2, true);
                this.original_colors.backgroundGridColor  = RGraph.arrayClone(properties.backgroundGridColor, true);
                this.original_colors.backgroundColor      = RGraph.arrayClone(properties.backgroundColor, true);
                this.original_colors.axesColor            = RGraph.arrayClone(properties.axesColor, true);
                this.original_colors.marimekkoColors      = RGraph.arrayClone(properties.marimekkoColors, true);
                this.original_colors.marimekkoColorsStroke= RGraph.arrayClone(properties.marimekkoColorsStroke, true);
                this.original_colors.marimekkoLabelsIngraphBackgroundStroke= RGraph.arrayClone(properties.marimekkoLabelsIngraphBackgroundStroke, true);
                this.original_colors.marimekkoLabelsIngraphBackgroundFill  = RGraph.arrayClone(properties.marimekkoLabelsIngraphBackgroundFill, true);
            }





            // Colors
            var data = this.data;
            if (data) {
                for (var dataset=0; dataset<data.length; ++dataset) {
                    for (var i=0; i<this.data[dataset].length; ++i) {

                        // Boxplots
                        if (this.data[dataset][i] && typeof this.data[dataset][i][1] == 'object' && this.data[dataset][i][1]) {

                            if (typeof this.data[dataset][i][1][5] == 'string') this.data[dataset][i][1][5] = this.parseSingleColorForGradient(this.data[dataset][i][1][5]);
                            if (typeof this.data[dataset][i][1][6] == 'string') this.data[dataset][i][1][6] = this.parseSingleColorForGradient(this.data[dataset][i][1][6]);
                        }
                        
                        if (!RGraph.isNullish(this.data[dataset][i])) {
                            this.data[dataset][i][2] = this.parseSingleColorForGradient(this.data[dataset][i][2]);
                        }
                    }
                }
            }
            
            // Parse HBars
            var hbars = properties.backgroundHbars;
            if (hbars) {
                for (i=0; i<hbars.length; ++i) {
                    hbars[i][2] = this.parseSingleColorForGradient(hbars[i][2]);
                }
            }
            
            // Parse HBars
            var vbars = properties.backgroundVbars;
            if (vbars) {
                for (i=0; i<vbars.length; ++i) {
                    vbars[i][2] = this.parseSingleColorForGradient(vbars[i][2]);
                }
            }
            
            // Parse line colors
            var colors = properties.lineColors;
            if (colors) {
                for (i=0; i<colors.length; ++i) {
                    colors[i] = this.parseSingleColorForGradient(colors[i]);
                }
            }
            
            // Parse colors for marimekko charts
            var colors = properties.marimekkoColors;
            if (colors) {
                for (i=0; i<colors.length; ++i) {
                    colors[i] = this.parseSingleColorForGradient(colors[i]);
                }
            }
    
             properties.colorsDefault         = this.parseSingleColorForGradient(properties.colorsDefault);
             properties.crosshairsColor       = this.parseSingleColorForGradient(properties.crosshairsColor);
             properties.highlightStroke       = this.parseSingleColorForGradient(properties.highlightStroke);
             properties.highlightFill         = this.parseSingleColorForGradient(properties.highlightFill);
             properties.backgroundBarsColor1  = this.parseSingleColorForGradient(properties.backgroundBarsColor1);
             properties.backgroundBarsColor2  = this.parseSingleColorForGradient(properties.backgroundBarsColor2);
             properties.backgroundGridColor   = this.parseSingleColorForGradient(properties.backgroundGridColor);
             properties.backgroundColor       = this.parseSingleColorForGradient(properties.backgroundColor);
             properties.axesColor             = this.parseSingleColorForGradient(properties.axesColor);
             properties.marimekkoColorsStroke = this.parseSingleColorForGradient(properties.marimekkoColorsStroke);
             properties.marimekkoLabelsIngraphBackgroundStroke = this.parseSingleColorForGradient(properties.marimekkoLabelsIngraphBackgroundStroke);
             properties.marimekkoLabelsIngraphBackgroundFill   = this.parseSingleColorForGradient(properties.marimekkoLabelsIngraphBackgroundFill);
        };








        //
        // Use this function to reset the object to the post-constructor state. Eg reset colors if
        // need be etc
        //
        this.reset = function ()
        {
        };








        //
        // This parses a single color value for a gradient
        //
        this.parseSingleColorForGradient = function (color)
        {
            if (!color || typeof color != 'string') {
                return color;
            }
    
            if (color.match(/^gradient\((.*)\)$/i)) {


                // Allow for JSON gradients
                if (color.match(/^gradient\(({.*})\)$/i)) {
                    return RGraph.parseJSONGradient({object: this, def: RegExp.$1});
                }

                // Allow for JSON gradients
                if (color.match(/^gradient\(({.*})\)$/i)) {
                    return RGraph.parseJSONGradient({object: this, def: RegExp.$1});
                }

                var parts = RegExp.$1.split(':');
    
                // Create the gradient
                var grad = this.context.createLinearGradient(0,this.canvas.height - properties.marginBottom, 0, properties.marginTop);
    
                var diff = 1 / (parts.length - 1);
    
                grad.addColorStop(0, RGraph.trim(parts[0]));
    
                for (var j=1; j<parts.length; ++j) {
                    grad.addColorStop(j * diff, RGraph.trim(parts[j]));
                }
            }
                
            return grad ? grad : color;
        };








        //
        // This function handles highlighting an entire data-series for the interactive
        // key
        // 
        // @param int index The index of the data series to be highlighted
        //
        this.interactiveKeyHighlight = function (index)
        {
            if (this.coords && this.coords[index] && this.coords[index].length) {
                
                var obj = this;
                
                this.coords[index].forEach(function (value, idx, arr)
                {
                    obj.context.beginPath();
                    obj.context.fillStyle = properties.keyInteractiveHighlightChartFill;
                    obj.context.arc(value[0], value[1], properties.tickmarksSize + 3, 0, RGraph.TWOPI, false);
                    obj.context.fill();
                });
            }
        };








        //
        // Using a function to add events makes it easier to facilitate method chaining
        // 
        // @param string   type The type of even to add
        // @param function func 
        //
        this.on = function (type, func)
        {
            if (type.substr(0,2) !== 'on') {
                type = 'on' + type;
            }
            
            if (typeof this[type] !== 'function') {
                this[type] = func;
            } else {
                RGraph.addCustomEventListener(this, type, func);
            }
    
            return this;
        };








        //
        // This function runs once only
        // (put at the end of the file (before any effects))
        //
        this.firstDrawFunc = function ()
        {
        };








        //
        // Used in chaining. Runs a function there and then - not waiting for
        // the events to fire (eg the onbeforedraw event)
        // 
        // @param function func The function to execute
        //
        this.exec = function (func)
        {
            func(this);
            
            return this;
        };








        //
        // Draws a trendline on the Scatter chart. This is also known
        // as a "best-fit line"
        //
        //@param dataset The index of the dataset to use
        //
        this.drawTrendline = function  ()
        {
            var args = RGraph.getArgs(arguments, 'dataset');


            var color     = properties.trendlineColor,
                linewidth = properties.trendlineLinewidth,
                margin    = properties.trendlineMargin;
            

            // Allow for trendlineColors as well
            if (RGraph.isArray(properties.trendlineColors)) {
                color = properties.trendlineColors;
            }



            // handle the options being arrays
            if (typeof color === 'object' && color[args.dataset]) {
                color = color[args.dataset];
            } else if (typeof color === 'object') {
                color = 'gray';
            }
            
            if (typeof linewidth === 'object' && typeof linewidth[args.dataset] === 'number') {
                linewidth = linewidth[args.dataset];
            } else if (typeof linewidth === 'object') {
                linewidth = 1;
            }
            
            if (typeof margin === 'object' && typeof margin[args.dataset] === 'number') {
                margin = margin[args.dataset];
            } else if (typeof margin === 'object'){
                margin = 25;
            }
            

            // Step 1: Calculate the mean values of the X coords and the Y coords
            for (var i=0,totalX=0,totalY=0; i<this.data[args.dataset].length; ++i) {
                totalX += this.data[args.dataset][i][0];
                totalY += this.data[args.dataset][i][1];
            }
            
            var averageX = totalX / this.data[args.dataset].length;
            var averageY = totalY / this.data[args.dataset].length;

            // Step 2: Calculate the slope of the line
            
            // a: The X/Y values minus the average X/Y value
            for (var i=0,xCoordMinusAverageX=[],yCoordMinusAverageY=[],valuesMultiplied=[],xCoordMinusAverageSquared=[]; i<this.data[args.dataset].length; ++i) {
                xCoordMinusAverageX[i] = this.data[args.dataset][i][0] - averageX;
                yCoordMinusAverageY[i] = this.data[args.dataset][i][1] - averageY;
                
                // b. Multiply the averages
                valuesMultiplied[i] = xCoordMinusAverageX[i] * yCoordMinusAverageY[i];
                xCoordMinusAverageSquared[i] = xCoordMinusAverageX[i] * xCoordMinusAverageX[i];
            }
                
            var sumOfValuesMultiplied = RGraph.arraySum(valuesMultiplied);
            var sumOfXCoordMinusAverageSquared = RGraph.arraySum(xCoordMinusAverageSquared);

            // Calculate m (???)
            var m = sumOfValuesMultiplied / sumOfXCoordMinusAverageSquared;
            var b = averageY - (m * averageX);

            // y = mx + b
            
            coords =  [
                [properties.xaxisScaleMin, m * properties.xaxisScaleMin + b],
                [properties.xaxisScaleMax, m * properties.xaxisScaleMax + b]
            ];

            //
            // Draw the line
            //

            // Set dotted, dash or a custom dash array
            if (properties.trendlineDashed) {
                this.context.setLineDash([4 * scaleFactor, 4 * scaleFactor]);
            }
            
            if (properties.trendlineDotted) {
                this.context.setLineDash([1 * scaleFactor, 4 * scaleFactor]);
            }
            
            if (!RGraph.isNullish(properties.trendlineDashArray) && typeof properties.trendlineDashArray === 'object') {
                this.context.setLineDash(properties.trendlineDashArray);
            }


            // Clip the canvas again so that the line doesn't look overly long
            // (use the minimum an maximum points for this)
            for (var i=0,xValues=[],yValues=[]; i<this.data[args.dataset].length; ++i) {
                if (typeof this.data[args.dataset][i][0] === 'number') {
                    xValues.push(this.data[args.dataset][i][0]);
                }
            
                if (typeof this.data[args.dataset][i][1] === 'number') {
                    yValues.push(this.data[args.dataset][i][1]);
                }
            }

            // These are the minimum and maximum X/Y values for this dataset
            var x1 = RGraph.arrayMin({array: xValues});
            var y1 = RGraph.arrayMin({array: yValues});
            var x2 = RGraph.arrayMax({array: xValues});
            var y2 = RGraph.arrayMax({array: yValues});
            
            
            // Convert the X/Y values into coordinates on the canvas
            //
            // IS THIS USED?
            //
            x1 = this.getXCoord(x1);
            y1 = this.getYCoord(y1, properties.outofbounds);
            x2 = this.getXCoord(x2);
            y2 = this.getYCoord(y2, properties.outofbounds);


            // Draw the line
            this.path(
                ' lw % sa b r % % % % cl b r % % % % cl b m % % l % % s % rs',
                linewidth,
                    
                // These are the rect arguments
                properties.marginLeft + margin,
                properties.marginTop + margin,
                this.canvas.width - properties.marginLeft - properties.marginRight - margin - margin,
                this.canvas.height - properties.marginTop - properties.marginBottom - margin - margin,
                    
                // These are the second rect arguments
                properties.trendlineClipping === false ? 0 : x1 - 25,
                properties.trendlineClipping === false ? 0 : y2 - 25,
                properties.trendlineClipping === false ? this.canvas.width  : x2 - x1 + 25 + 25,
                properties.trendlineClipping === false ? this.canvas.height : y1 - y2 + 25 + 25,
                
                // moveTo
                x1 = this.getXCoord(coords[0][0]),
                y1 = this.getYCoord(coords[0][1], true),
                
                // lineTo
                x2 = this.getXCoord(coords[1][0]),
                y2 = this.getYCoord(coords[1][1], true),
                
                // stroke color
                color
            );
            
            // Store the coordinates of the trendline on the object
            this.coordsTrendline[args.dataset] = [
                [x1, y1],
                [x2, y2]
            ];

            // Reset the line dash array
            this.context.setLineDash([5,0]);
        };







        //
        // The Scatter chart Trace effect
        // 
        // This is a new version of the Trace effect which no longer requires jQuery and is more compatible
        // with other effects (eg Expand). This new effect is considerably simpler and less code.
        // 
        // @param object     Options for the effect. Currently only "frames" is available.
        // @param int        A function that is called when the ffect is complete
        //
        this.trace = function ()
        {
            // Cancel any stop request if one is pending
            this.cancelStopAnimation();

            var obj       = this,
                callback  = arguments[2],
                opt       = arguments[0] || {},
                frames    = opt.frames || 30,
                frame     = 0,
                callback  = arguments[1] || function () {}

            this.set('animationTrace', true);
            this.set('animationTraceClip', 0);
    
            function iterator ()
            {
                if (obj.stopAnimationRequested) {
    
                    // Reset the flag
                    obj.stopAnimationRequested = false;
    
                    return;
                }

                RGraph.clear(obj.canvas);

                RGraph.redrawCanvas(obj.canvas);

                if (frame++ < frames) {
                    obj.set('animationTraceClip', frame / frames);
                    RGraph.Effects.updateCanvas(iterator);
                } else {
                    callback(obj);
                }
            }
            
            iterator();
            
            return this;
        };








        //
        // The explode effect.
        // 
        // @param object     Options for the effect.
        // @param int        A function that is called when the ffect is complete
        //
        this.explode = function ()
        {
            // Cancel any stop request if one is pending
            this.cancelStopAnimation();

            var obj       = this,
                callback  = arguments[2],
                opt       = arguments[0] || {},
                frames    = opt.frames || 15,
                frame     = 0,
                callback  = arguments[1] || function () {},
                originX   = this.properties.xaxisScaleMax / 2,
                originY   = 0,
                step      = 1 / frames,
                original  = RGraph.arrayClone(this.unmodified_data, true);

            // First draw the chart, set the yaxisScaleMax to the maximum value that's calculated
            // and then animate
            this.draw();
            this.set('yaxisScaleMax', this.scale2.max);
            
            // Determine the X origin - it defaults to the center
            if (opt.originx === 'left') {
                originX = 0;
            } else if (opt.originx === 'right') {
                originX = this.properties.xaxisScaleMax;
            } else {
                originX = this.properties.xaxisScaleMax / 2;
            }
            
            // Determine the Y origin - it defaults to the bottom
            if (opt.originy === 'center') {
                originY = this.scale2.max / 2;
            } else if (opt.originy === 'top') {
                originY = this.scale2.max;
            } else {
                originY = 0;
            }



            function iterator ()
            {
                if (obj.stopAnimationRequested) {
    
                    // Reset the flag
                    obj.stopAnimationRequested = false;
    
                    return;
                }
                RGraph.clear(obj.canvas);

                for (var i=0; i<obj.data.length; ++i) { // Loop through each dataset
                    for (var j=0; j<obj.data[i].length; ++j) { // Loop through each point
                        obj.data[i][j][0] = 
                            originX + (
                                    (original[i][j][0] - originX)
                                * step
                                * frame
                            );
                        obj.data[i][j][1] = originY + ((original[i][j][1] - originY) * step * frame);
                    }
                }

                RGraph.redrawCanvas(obj.canvas);
                if (frame++ < frames) {
                    RGraph.Effects.updateCanvas(iterator);
                } else {
                    RGraph.redrawCanvas(obj.canvas);
                    callback(obj);
                }
            }

            iterator();
            
            return this;
        };








        //
        // Couple of functions that allow you to control the
        // animation effect
        //
        this.stopAnimation = function ()
        {
            // Reset the clip area
            this.set('animationTraceClip', 1);
            
            // Reset the data
            this.data = RGraph.arrayClone(this.unmodified_data, true);

            this.stopAnimationRequested = true;
        };

        this.cancelStopAnimation = function ()
        {
            this.stopAnimationRequested = false;
        };








        //
        // This helps the Gantt reset colors when the reset function is called.
        // It handles going through the data and resetting the colors.
        //
        this.resetColorsToOriginalValues = function ()
        {
            //
            // Copy the original colors over for single-event-per-line data
            //
            for (var i=0,len=this.original_colors.data.length; i<len; ++i) {
                for (var j=0,len2=this.original_colors.data[i].length; j<len2;++j) {

                    // The color for the point
                    this.data[i][j][2] = RGraph.arrayClone(this.original_colors.data[i][j][2], true);
                    
                    // Handle boxplots
                    if (typeof this.data[i][j][1] === 'object') {
                        this.data[i][j][1][5] = RGraph.arrayClone(this.original_colors.data[i][j][1][5], true);
                        this.data[i][j][1][6] = RGraph.arrayClone(this.original_colors.data[i][j][1][6], true);
                    }
                }
            }
        };








        // If only one tooltip has been given populate each data-piece with it
        this.populateTooltips = function ()
        {
            for (var i=0; i<this.data.length; ++i) { // for each dataset...
                for (var j=0; j<this.data[i].length; ++j) { // For each point in the dataset
                    this.data[i][j][3] = properties.tooltips;
                }
            }
        };








        //
        // A worker function that handles Bar chart specific tooltip substitutions
        //
        this.tooltipSubstitutions = function (opt)
        {
            // Create the data for marimekko charts
            if (this.isMarimekko) {
                var marimekko_data = [];
                for (var i=0; i<this.properties.marimekkoData.length; ++i) {
                    marimekko_data[i] = [];
                    for (var j=0; j<this.properties.marimekkoData[i][1].length; ++j) {
                        marimekko_data[i].push(this.properties.marimekkoData[i][1][j]);
                    }
                }
            }


            // Marimekko charts
            if (this.isMarimekko) {
                var indexes = RGraph.sequentialIndexToGrouped(
                    opt.index,
                    marimekko_data
                );
                
                var  value = marimekko_data[indexes[0]][indexes[1]];
                var values = [marimekko_data[indexes[0]][indexes[1]]];
            
            // Regular Scatter charts
            } else {
                var indexes = RGraph.sequentialIndexToGrouped(
                    opt.index,
                    this.data
                );
                
                var value  = this.data[indexes[0]][indexes[1]][1];
                var values = [this.data[indexes[0]][indexes[1]][1]];
            }



            return {
                  index: indexes[1],
                dataset: indexes[0],
        sequentialIndex: opt.index,
                  value: value,
                 values: values
            };
        };








        //
        // A worker function that returns the correct color/label/value
        //
        // @param object specific The indexes that are applicable
        // @param number index    The appropriate index
        //
        this.tooltipsFormattedCustom = function (specific, index)
        {
            // The tooltipsFormattedKeyColors property has been specified so use that if
            // there's a relevant color
            if (   !RGraph.isNullish(properties.tooltipsFormattedKeyColors)
                && typeof properties.tooltipsFormattedKeyColors === 'object'
                && typeof properties.tooltipsFormattedKeyColors[specific.dataset] === 'string'
               ) {
                var color = properties.tooltipsFormattedKeyColors[specific.dataset];
            }

            // If a color is defined for this point then use it
            if (!this.isMarimekko && this.data[specific.dataset][specific.index][2]) {
                color = this.data[specific.dataset][specific.index][2];
            }


            var label = properties.tooltipsFormattedKeyLabels[specific.index]
                           ? properties.tooltipsFormattedKeyLabels[specific.index]
                           : '';

            return {
                label: label,
                color: color
            };
        };








        //
        // This allows for static tooltip positioning
        //
        this.positionTooltipStatic = function (args)
        {
            // Make the data into a bog standard 2D array
            if (this.isMarimekko) {
                var marimekko_data = [];
                for (var i=0; i<this.properties.marimekkoData.length; ++i) {
                    marimekko_data[i] = [];
                    for (var j=0; j<this.properties.marimekkoData[i][1].length; ++j) {
                        marimekko_data[i].push(this.properties.marimekkoData[i][1][j]);
                    }
                }
            }




            var obj         = args.object,
                e           = args.event,
                tooltip     = args.tooltip,
                index       = args.index,
                canvasXY    = RGraph.getCanvasXY(obj.canvas),
                indexes     = RGraph.sequentialIndexToGrouped(args.index, this.isMarimekko ? marimekko_data : this.data),
                coords      = this.isMarimekko ? this.coordsMarimekko[indexes[0]][indexes[1]] : this.coords[indexes[0]][indexes[1]],
                scaleFactor = RGraph.getScaleFactor(this);



            // Position the tooltip in the X direction
            args.tooltip.style.left = (
                canvasXY[0]                      // The X coordinate of the canvas
                + (this.isMarimekko ? ((coords[0] + (coords[2] / 2) ) / scaleFactor) : coords[0] / scaleFactor) // The X coordinate of the point on the chart
                - (tooltip.offsetWidth / 2)      // Subtract half of the tooltip width
                + obj.properties.tooltipsOffsetx // Add any user defined offset
            ) + 'px';

            args.tooltip.style.top  = (
                  canvasXY[1]                    // The Y coordinate of the canvas
                + (coords[1] / scaleFactor)      // The Y coordinate of the bar on the chart
                - tooltip.offsetHeight           // The height of the tooltip
                - 15                             // An arbitrary amount
                + obj.properties.tooltipsOffsety // Add any user defined offset
            ) + 'px';
        }   ;








        //
        // This returns the relevant value for the formatted key
        // macro %{value}. THIS VALUE SHOULD NOT BE FORMATTED.
        //
        // @param number index The index in the dataset to get
        //                     the value for
        //
        this.getKeyValue = function (index)
        {
            if (   RGraph.isArray(this.properties.keyFormattedValueSpecific)
                && RGraph.isNumber(this.properties.keyFormattedValueSpecific[index])) {

                return this.properties.keyFormattedValueSpecific[index];
            
            
            
            
            } else {
                var totalX = 0;
                var totalY = 0;

                if (this.data[index]) {
                    for (var i=0; i<this.data[index].length; ++i) {
                        totalX += this.data[index][i][0];
                        totalY += this.data[index][i][1];
                    }
                }
                
                return [totalX, totalY];
            }
        };








        //
        // Returns how many data-points there should be when a string
        // based key property has been specified. For example, this:
        //
        // key: '%{property:_labels[%{index}]} %{value_formatted}'
        //
        // ...depending on how many bits of data ther is might get
        // turned into this:
        //
        // key: [
        //     '%{property:_labels[%{index}]} %{value_formatted}',
        //     '%{property:_labels[%{index}]} %{value_formatted}',
        //     '%{property:_labels[%{index}]} %{value_formatted}',
        //     '%{property:_labels[%{index}]} %{value_formatted}',
        //     '%{property:_labels[%{index}]} %{value_formatted}',
        // ]
        //
        // ... ie in that case there would be 4 data-points so the
        // template is repeated 4 times.
        //
        this.getKeyNumDatapoints = function ()
        {
            return this.data[0].length;
        };








        //
        // The lasso fature allows you to draw around points.
        // The callback is passed an array of datapoints and
        // indexes (NOT values!) which you can use to get the
        // points from the scatter chart object.
        //
        this.installLasso = function ()
        {            
            // Set this so that the event listeners can
            // access the object
            var obj = this;
            


            if (this.properties.lasso) {
            
                var localData_key = 'rgraph-scatter-chart-' + RGraph.md5(location.href + obj.id) + '-lasso-data';

                //
                // So the default object isn't repeated
                //
                obj.lassoGetDefaultObject = function ()
                {
                    return {state: {
                        coords:    [],
                        mousedown: false
                    }};
                };






                // 
                // Save the lasso data to localstorage so
                // that it persists acoss refreshes
                //
                obj.lassoSaveData = function (data)
                {
                    //
                    // Save the state to localStorage by
                    // default
                    //
                    if (obj.properties.lassoPersistLocal) {
                        var str = JSON.stringify(data);
                        window.localStorage[localData_key] = str;
                    }
                    
                    // Call the event if it's defined
                    if (RGraph.isFunction(obj.properties.lassoPersistSave)) {
                        obj.properties.lassoPersistSave(data);
                    }
                };

                // 
                // Load the lasso data from localstorage
                //
                obj.lassoLoadData = function ()
                {
                    // Load the data from localData
                    if (obj.properties.lassoPersistLocal) {
                        var str  = window.localStorage[localData_key];
                    }
                    
                    var data = str ? JSON.parse(str) : obj.lassoGetDefaultObject().state;

                    // Call the event if it's defined
                    if (RGraph.isFunction(obj.properties.lassoPersistLoad)) {
                        data = obj.properties.lassoPersistLoad();
                    }

                    return data;
                };

                // 
                // Reset the localStorageData
                //
                obj.lassoResetData = function ()
                {
                    window.localStorage[localData_key] = obj.lassoGetDefaultObject();
                };








                //
                // Initialise the lasso state
                //
                RGraph.runOnce('scatter-chart-lasso-state-object-initialisation', function ()
                {
                    //
                    // Load the persistence data from the
                    // localData array. Create an
                    // obj.lassoLoadData() function.
                    if (obj.properties.lassoPersist) {
                        obj.lasso = {state: obj.lassoLoadData()};

                    } else {
                        // This is repeated in the doubleclick/clear function below
                        obj.lasso = obj.lassoGetDefaultObject();
                        
                    }
                });








                //
                // A function that draws the highlight
                //
                this.drawLassoRects = function ()
                {
                    if (!obj.lasso || !obj.lasso.state) {
                        return;
                    }

                    //
                    // Loop through the coords
                    //

                    for (let i=0; i<obj.lasso.state.coords.length; ++i) {

                        if (obj.lasso.state.coords[i]) {
                            //
                            // Start the path
                            //
                            obj.path('b ss % fs % lw % lc square',
                                obj.properties.lassoStroke,
                                obj.properties.lassoFill,
                                obj.properties.lassoLinewidth
                            );
    
                            for (let j=0; j<obj.lasso.state.coords[i].length; ++j) {
    
                                obj.context.rect(
                                    obj.lasso.state.coords[i][0],
                                    obj.lasso.state.coords[i][1],
                                    obj.lasso.state.coords[i][2],
                                    obj.lasso.state.coords[i][3]
                                );
                            }
    
                            //
                            // Finish the and fill/stroke it
                            //
                            obj.context.closePath();                    
                            obj.context.fill();
                            obj.context.stroke();
                        }
                    }
                };








                //
                // Highlightpoints that have been selected
                // by the lasso
                //
                obj.drawLassoHighlightPoints = function (x, y = null)
                {
                    // An array of points datasets/indexes has been given
                    if (RGraph.isArray(x)) {
                
                        for (let i=0; i<x.length; ++i) {
                            obj.path(
                                'b lw % a % % % 0 6.29 false s % f %',
                                obj.properties.lassoHighlightLinewidth,
                                obj.coords[x[i].dataset][x[i].index][0],
                                obj.coords[x[i].dataset][x[i].index][1],
                                obj.properties.tickmarksSize / 2 + 2,
                                obj.properties.lassoHighlightStroke,
                                obj.properties.lassoHighlightFill
                            );
                        }
                
                    // An x/y coordinates combo has been given
                    } else {
                
                        obj.path(
                            'b lw % a % % % 0 6.29 false s % f %',
                            obj.properties.lassoHighlightLinewidth,
                            x,
                            y,
                            obj.properties.tickmarksSize / 2 + 2,
                            obj.properties.lassoHighlightStroke,
                            obj.properties.lassoHighlightFill
                        );
                    }
                };








                //
                // Clear the lasso state
                //
                this.clearLassoState = function ()
                {
                    if (confirm('Are you sure that you want to clear ALL of the highlight rectangles?')) {
                        
                        // This is repeated above
                        obj.lasso = obj.lassoGetDefaultObject();

                        //
                        // Save the reset state to localData
                        // if persistence is enabled
                        //
                        if (obj.properties.lassoPersist) {
                            obj.lassoSaveData(obj.lasso.state);
                        }

                        RGraph.redrawCanvas(obj.canvas);
                        
                        // Call the user defined function if necessary
                        if (RGraph.isFunction(obj.properties.lassoClearCallback)) {
                            obj.properties.lassoClearCallback(obj.lasso.state);
                        }
                    }
                };














                //
                // This is the lasso mousedown event listener
                //
                this.lassoMousedownEventListener = function (e)
                {
                    if (e.button === 2) {
                        return;
                    }

                    var [mouseX, mouseY] = RGraph.getMouseXY(e);

                    // Reset the state
                    if (!obj.lasso || !obj.lasso.state) {
                        obj.lasso = obj.lassoGetDefaultObject();
                    }
                    obj.lasso.state.mousedown       = true;
                    obj.lasso.state.coordsLastIndex = obj.lasso.state.coords.length;

                    // Create a new lasso coords array
                    obj.lasso.state.originX = mouseX;
                    obj.lasso.state.originY = mouseY;
                };








                //
                // This is the lasso mousemove event listener
                //
                obj.lassoMousemoveEventListener = function (e)
                {
                    var [mouseX, mouseY] = RGraph.getMouseXY(e);

                    if (   obj.lasso
                        && obj.lasso.state
                        && obj.lasso.state.mousedown
                       ) {

                        RGraph.redrawCanvas(obj.canvas);


                        // Store the coordinates of the
                        // rectngle such that the X/Y
                        // coordinates are always the top
                        // left corner
                        obj.lasso.state.coords[obj.lasso.state.coordsLastIndex] = [
                            mouseX > obj.lasso.state.originX ? obj.lasso.state.originX : mouseX,
                            mouseY > obj.lasso.state.originY ? obj.lasso.state.originY : mouseY,
                            Math.abs(mouseX - obj.lasso.state.originX),
                            Math.abs(mouseY - obj.lasso.state.originY)
                        ];

                        // Set the strokestyle and the fillstyle
                        obj.path('b ss % fs % lw %',
                            obj.properties.lassoStroke,
                            obj.properties.lassoFill,
                            obj.properties.lassoLinewidth
                        );

                        // Highlight the already-selected points
                        obj.drawLassoRects();
                        obj.drawLassoHighlightPoints(obj.lasso.state.points);
                    }
                };








                //
                // This is the lasso mouseup event listener - where
                // the magic happens!
                //
                this.lassoWindowMouseupEventListener = function (e)
                {
                    if (obj.lasso && obj.lasso.state && obj.lasso.state.mousedown) {

                        obj.lasso.state.mousedown = false;

                        // Start a new path for the
                        // rectangles that will be used to
                        // test the points
                        obj.path('b');

                        for (let i=0; i<obj.lasso.state.coords.length; ++i) {
                            if (RGraph.isArray(obj.lasso.state.coords[i])) {
                                obj.path(
                                    'r % % % % f % s %',
                                    obj.lasso.state.coords[i][0],
                                    obj.lasso.state.coords[i][1],
                                    obj.lasso.state.coords[i][2],
                                    obj.lasso.state.coords[i][3],
                                    'transparent',
                                    'transparent'
                                );
                            }
                        }
                        
                        // Reset the points array to stop it growing
                        // uncontrollably
                        obj.lasso.state.points = [];
                        
                        // Determine all of the relevant points
                        for (let i=0; i<obj.coords.length; ++i) {
                            for (let j=0; j<obj.coords[i].length; ++j) {
                            

                                var [valueX, valueY] = obj.data[i][j];
                                var coordX = obj.getXCoord(valueX);
                                var coordY = obj.getYCoord(valueY);

                                if (obj.context.isPointInPath(coordX, coordY)) {
                                    obj.lasso.state.points = obj.lasso.state.points || [];
                                    obj.lasso.state.points.push({
                                        dataset: i,
                                        index: j
                                    });
                                }
                            }
                        }

                        // Now highlight the selected points
                        if (obj.lasso.state.points) {

                            for (let i=0; i<obj.lasso.state.points.length; ++i) {
                                
                                var dataset = obj.lasso.state.points[i].dataset;
                                var index   = obj.lasso.state.points[i].index;

                                obj.drawLassoHighlightPoints(
                                    obj.coords[dataset][index][0],
                                    obj.coords[dataset][index][1]
                                );
                            }
                        }


                        //
                        // Save the highlight data to
                        // localStorage
                        //
                        if (obj.properties.lassoPersist) {
                            obj.lassoSaveData(obj.lasso.state);
                        }





                        // Call the callback function
                        if (RGraph.isFunction(obj.properties.lassoCallback)) {
                            obj.properties.lassoCallback(obj.lasso.state);
                        }
                    }
                };








                //
                // Allow people to clear the lasso state using
                // a double-click
                //
                this.lassoDblclickEventListener = function (e)
                {
                    // Go through all of the rects to see if one
                    // has been clicked and if so - remove it.
                    if (obj.lasso.state.coords && obj.lasso.state.coords.length) {
                        
                        var [mouseX, mouseY] = RGraph.getMouseXY(e);
                    
                        for (let i=(obj.lasso.state.coords.length - 1); i>=0; --i) {
                            
                            if (   RGraph.isArray(obj.lasso.state.coords)
                                && obj.lasso.state.coords.length
                                && obj.lasso.state.coords[i]
                                && mouseX >= obj.lasso.state.coords[i][0]
                                && mouseX <= (obj.lasso.state.coords[i][0] + obj.lasso.state.coords[i][2])
                                && mouseY >= obj.lasso.state.coords[i][1]
                                && mouseY <= (obj.lasso.state.coords[i][1] + obj.lasso.state.coords[i][3])
                               ) {
                                if (confirm('Are you sure that you want to remove this highlight rectangle?')) {
                                    obj.lasso.state.coords[i] = null;
    
                                    // Call the window mouseup
                                    // event listener to
                                    // recalulate the points which
                                    // should be highlighted
                                    obj.lasso.state.mousedown = true;
                                    obj.lassoWindowMouseupEventListener(e);
    
                                    //RGraph.redrawCanvas(obj.canvas);
                                    RGraph.redraw();
                                }
                                return;
                            }
                        }
                    }



                    obj.clearLassoState();
                };








                // Install the above event listeners
                RGraph.runOnce('rgraph-install-scatter-chart-lasso-event-listeners', function ()
                {
                    obj.canvas.addEventListener('mousedown',  obj.lassoMousedownEventListener,     false);
                    obj.canvas.addEventListener('mousemove',  obj.lassoMousemoveEventListener,     false);
                    obj.canvas.addEventListener('dblclick',   obj.lassoDblclickEventListener,      false);
                    window.addEventListener('mouseup',        obj.lassoWindowMouseupEventListener, false);
                });
                
                // If the mouse button isn't pressed then redraw the
                // rectangles and point highlights
                if (
                       this.lasso
                    && this.lasso.state
                    && !this.lasso.state.mousedown
                   ) {
                    
                    this.drawLassoRects();
                    this.drawLassoHighlightPoints(this.lasso.state.points);
                }
            }
        };








        //
        // Draws a Marimekko chart
        //
        this.drawMarimekko = function ()
        {
            var data = RGraph.arrayClone(this.properties.marimekkoData, true);

            // Calculate the total of all the X values
            for (var i=0,totalX=0; i<data.length; ++i) {
                totalX += data[i][0];
            }


            var graphWidth  = this.canvas.width - this.properties.marginLeft - this.properties.marginRight;
            var graphHeight = this.canvas.height - this.properties.marginTop - this.properties.marginBottom;
            var x           = this.properties.marginLeft;
            var coords      = [];








            ////////////////////////////////
            // Draw the data on the chart //
            ////////////////////////////////
            for (var i=0,seq=0; i<data.length; ++i) {

                var width     = (data[i][0] / totalX) * graphWidth;
                var y         = this.canvas.height - this.properties.marginBottom;
                    coords[i] = [];
             
                // Calulate the total Y value
                for (var j=0,totalY=0; j<data[i][1].length; ++j) {
                    totalY += data[i][1][j];
                }

                // Loop through the vertical values
                for (var j=0; j<data[i][1].length; ++j) {

                    var value  = data[i][1][j];
                    var height = (value / totalY) * graphHeight;
                    var pc     = (value / RGraph.arraySum(data[i][1])) * 100;

                    this.path(
                        'b r % % % % lw % s % f %',
                        x, y - height, width, height,
                        this.properties.marimekkoLinewidth,
                        this.properties.marimekkoLinewidth ? this.properties.marimekkoColorsStroke : 'transparent',
                        this.properties.marimekkoColorsSequential ? this.properties.marimekkoColors[seq] : this.properties.marimekkoColors[j]
                    );
                    
                    coords[i].push([x, y - height, width, height]);



                    //
                    // Draw the ingraph label if requested
                    //
                    if (this.properties.marimekkoLabelsIngraph) {

                        if (!marimekkoLabelsIngraphTextConf) {
                            
                            var marimekkoLabelsIngraphTextConf = RGraph.getTextConf({
                                object: this,
                                prefix: 'marimekkoLabelsIngraph'
                            });
                        }
                        
                        var text = (this.properties.marimekkoLabelsIngraphSpecific && RGraph.isString(this.properties.marimekkoLabelsIngraphSpecific[seq]) ) ? (this.properties.marimekkoLabelsIngraphSpecific[seq] || '') : RGraph.numberFormat({
                            object:    this,
                            number:    Number(pc).toFixed(this.properties.marimekkoLabelsIngraphDecimals),
                            value:     Number(pc).toFixed(this.properties.marimekkoLabelsIngraphDecimals),
                            unitspre:  this.properties.marimekkoLabelsIngraphUnitsPre,
                            unitspost: this.properties.marimekkoLabelsIngraphUnitsPost,
                            point:     this.properties.marimekkoLabelsIngraphPoint,
                            thousand:  this.properties.marimekkoLabelsIngraphThousand
                        });
                        
                        seq++;





                        RGraph.text({
                            object: this,
                            text:   text,
                            x:      x + (width / 2) + this.properties.marimekkoLabelsIngraphOffsetx,
                            y:      y - (height / 2) + 5 + this.properties.marimekkoLabelsIngraphOffsety,
                            color:  marimekkoLabelsIngraphTextConf.color,
                            italic: marimekkoLabelsIngraphTextConf.italic,
                            bold:   marimekkoLabelsIngraphTextConf.bold,
                            font:   marimekkoLabelsIngraphTextConf.font,
                            size:   marimekkoLabelsIngraphTextConf.size,
                            halign: 'center',
                            valign: 'center',
                            tag:    'marimekkoLabelsIngraph',
                            bounding: true,
                            'bounding.stroke': this.properties.marimekkoLabelsIngraphBackgroundStroke,
                            'bounding.fill':   this.properties.marimekkoLabelsIngraphBackgroundFill
                        });
                    }






                    y -= height;
                }





                //
                // Draw the regular (horizonatal) Marimekko
                // label if it's been given
                //
                if (this.properties.marimekkoLabels) {
                
                
                    var textConf = RGraph.getTextConf({
                        object: this,
                        prefix: 'marimekkoLabels'
                    });
                
                    // Get the label
                    if (RGraph.isString(this.properties.marimekkoLabels)) {
                        var label = this.properties.marimekkoLabels;
                    } else if (RGraph.isArray(this.properties.marimekkoLabels)) {
                        var label = this.properties.marimekkoLabels[i];
                    } else {
                        var label = '';
                    }

                    // Now do substitution on the label
                    var label = RGraph.labelSubstitution({
                        index:     i,
                        text:      label || '',
                        object:    this,
                        value:     RGraph.arraySum(data[i][1]),
                        decimals:  this.properties.marimekkoLabelsFormattedDecimals,
                        point:     this.properties.marimekkoLabelsFormattedPoint,
                        thousand:  this.properties.marimekkoLabelsFormattedThousand,
                        unitsPre:  this.properties.marimekkoLabelsFormattedUnitsPre,
                        unitsPost: this.properties.marimekkoLabelsFormattedUnitsPost
                    });
                
                    RGraph.text({
                        object: this,
                        x:      coords[i].at(-1)[0] + (coords[i].at(-1)[2] / 2) + this.properties.marimekkoLabelsOffsetx,
                        y:      coords[i].at(-1)[1]  - 5 + this.properties.marimekkoLabelsOffsety,
                        text:   label,
                        color:  textConf.color,
                        font:   textConf.font,
                        size:   textConf.size,
                        bold:   textConf.bold,
                        italic: textConf.italic,
                        halign: 'center',
                        valign: 'bottom'
                    });
                }
                x += width;
            }





            //
            // Store the coordinates
            //
            this.coordsMarimekko = coords;

            return this;
        };








        //
        // This method handles the adjusting calculation for
        // when the mouse is moved
        // 
        // @param object e The event object
        //
        this.adjusting_mousemove = function (e)
        {
            //
            // Handle adjusting for the Bar
            //
            if (properties.adjustable && RGraph.Registry.get('adjusting') && RGraph.Registry.get('adjusting').uid == this.uid) {
    
                var shape = RGraph.Registry.get('adjusting.shape');

                if (shape) {
    
                    RGraph.Registry.set('adjusting.shape', shape);

                    var x = this.getXValue(e);
                    var y = this.getYValue(e);
                    var [mouseX, mouseY] = RGraph.getMouseXY(e);


                    // Y coordinate bounding
                    if (mouseY <= shape.object.properties.marginTop) {
                        y = shape.object.scale2.max;
                    } else if (mouseY > (shape.object.canvas.height - shape.object.properties.marginBottom) ) {
                        y = shape.object.scale2.min;

                    }

                    // X coordinate bounding
                    if (mouseX <= shape.object.properties.marginLeft) {
                        x = shape.object.properties.xaxisScaleMin;
                    } else if (mouseX > (shape.object.canvas.width - shape.object.properties.marginRight) ) {
                        x = shape.object.properties.xaxisScaleMax;
                    }


                    // Set the new X and Y values
                    this.data[shape.dataset][shape.index][0] = x;
                    this.data[shape.dataset][shape.index][1] = y;
    
                    RGraph.redrawCanvas(e.target);
                    
                    RGraph.fireCustomEvent(this, 'onadjust');
                }
            }
        };








        //
        // Determines whether a point is adjustable or not.
        //
        // @param object A shape object
        //
        this.isAdjustable = function (shape)
        {
            if (RGraph.isNullish(properties.adjustableOnly)) {
                return true;
            }

            if (shape && RGraph.isArray(properties.adjustableOnly) && properties.adjustableOnly[shape.sequentialIndex]) {
                return true;
            }

            return false;
        };








        //
        // This function handles clipping to scale values. Because
        // each chart handles scales differently, a worker function
        // is needed instead of it all being done centrally in the
        // RGraph.clipTo.start() function.
        //
        // @param string clip The clip string as supplied by the
        //                    user in the chart configuration
        //
        this.clipToScaleWorker = function (clip)
        {
            // The Regular expression is actually done by the
            // calling RGraph.clipTo.start() function  in the core
            // library
            if (RegExp.$1 === 'min') from = this.scale2.min; else from = Number(RegExp.$1);
            if (RegExp.$2 === 'max') to   = this.scale2.max; else to   = Number(RegExp.$2);

            var width  = this.canvas.width,
                y1     = this.getYCoord(from, true),
                y2     = this.getYCoord(to, true),
                height = Math.abs(y2 - y1),
                x      = 0,
                y      = Math.min(y1, y2);

            // Increase the height if the maximum value is "max"
            if (RegExp.$2 === 'max') {
                y = 0;
                height += this.properties.marginTop;
            }
        
            // Increase the height if the minimum value is "min"
            if (RegExp.$1 === 'min') {
                height += this.properties.marginBottom;
            }
            this.path(
                'sa b r % % % % cl',
                x, y, width, height
            );
        };








        //
        // This function handles TESTIING clipping to scale values.
        // Because each chart handles scales differently, a worker
        // function is needed instead of it all being done centrally
        // in the RGraph.clipTo.start() function.
        //
        // @param string clip The clip string as supplied by the
        //                    user in the chart configuration
        //
        this.clipToScaleTestWorker = function (clip)
        {
            // The Regular expression is actually done by the
            // calling RGraph.clipTo.start() function  in the core
            // library
            if (RegExp.$1 === 'min') from = this.scale2.min; else from = Number(RegExp.$1);
            if (RegExp.$2 === 'max') to   = this.scale2.max; else to   = Number(RegExp.$2);

            var width  = this.canvas.width,
                y1     = this.getYCoord(from, true),
                y2     = this.getYCoord(to, true),
                height = Math.abs(y2 - y1),
                x      = 0,
                y      = Math.min(y1, y2);

            // Increase the height if the maximum value is "max"
            if (RegExp.$2 === 'max') {
                y = 0;
                height += this.properties.marginTop;
            }
        
            // Increase the height if the minimum value is "min"
            if (RegExp.$1 === 'min') {
                height += this.properties.marginBottom;
            }
            this.path(
                'b r % % % %',
                x, y, width, height
            );
        };








        //
        // Scale worker function that increases the size of
        // properties as required. Called by the RGraph.scale()
        // function.
        //
        // @param string name The name of the property
        // @param mixed value The value of the property
        //
        this.scalePropertiesWorker = function (name, value)
        {
            var scaleFactor = RGraph.getScaleFactor(this);

            if (name === 'backgroundGridDashArray') {
                value[0] *= scaleFactor;
                value[1] *= scaleFactor;
            
            } else if (name === 'trendlineDashArray') {
                value[0] *= scaleFactor;
                value[1] *= scaleFactor;

            } else if (name === 'lineDash') {
                value[0] *= scaleFactor;
                value[1] *= scaleFactor;
            
            } else if (name === 'titleY') {
                value = String(parseFloat(value) * scaleFactor);
            
            } else if (name === 'titleX') {
                value = String(parseFloat(value) * scaleFactor);
            }

            return value;
        };








        //
        // Register the object
        //
        RGraph.register(this);








        //
        // This is the 'end' of the constructor so if the first argument
        // contains configuration data - handle that.
        //
        RGraph.parseObjectStyleConfig(this, conf.options);
    };








    //
    // A shortcut function to generate some radom data for
    // Scatter chart points
    //
    // @param object conf The configuration that determines the
    //                    points on the chart
    // @param object An object of parameters. The obj can
    //               contain the following keys:
    //                o count:   Number of points to generate (20)
    //                o xmin:    Minimum X value              (0)
    //                o xmax:    Maximum X value              (10)
    //                o ymin:    Minimum Y value              (0)
    //                o ymax:    Maximum Y value              (10)
    //                o tooltip: Whether to generate a tooltip
    //                           index                        (false)
    //
    //@return An object of points suitable for the Scatter chart
    //
    RGraph.Scatter.random = function (conf)
    {
        // Defaults
        if (!RGraph.isObject(conf))          conf = {};
        if (!RGraph.isNumber(conf.count))    conf.count   = 20;
        if (!RGraph.isNumber(conf.xmin))     conf.xmin    = 0;
        if (!RGraph.isNumber(conf.xmax))     conf.xmax    = 10;
        if (!RGraph.isNumber(conf.ymin))     conf.ymin    = 0;
        if (!RGraph.isNumber(conf.ymax))     conf.ymax    = 10;
        if (!RGraph.isBoolean(conf.tooltip)) conf.tooltip = false;

        for (var i=0,data=[]; i<conf.count; ++i) {

            var arr = {
                x: RGraph.random(conf.xmin, conf.xmax),
                y: RGraph.random(conf.ymin, conf.ymax)
            };

            if (conf.tooltip) {
                arr.tooltip = 'X value: {1} Y value: {2}'.format(arr.x, arr.y);
            }

            data.push(arr);
        }
        
        return data;
    };








    //
    // This is a shortcut-style function that makes making
    // drilldown chart much easier for the user.
    //
    RGraph.Scatter.drilldown = function (opt)
    {
        var original = {
            xaxisScaleMin: opt.options.xaxisScaleMin,
            xaxisScaleMax: opt.options.xaxisScaleMax
        };

        //
        // Set the initial max and min for the scale
        //
        opt.options.xaxisScaleMin = opt.options.xaxisScaleMin;
        opt.options.xaxisScaleMax = opt.options.xaxisScaleMax;

        // Create the Scatter chart (it's actually an XY line chart
        var obj = new RGraph.Scatter({
            id: opt.id,
            data: RGraph.arrayClone(opt.data, true),
            options: opt.options
        });

        if (opt.options.animation && typeof obj[opt.options.animation] === 'function') {
            obj[opt.options.animation]();
        } else {
            obj.draw();
        }

        state = {};

        // The mousedown listener
        obj.canvas.onmousedown = function (e)
        {
            if (e.button === 0 && obj.getXValue(e)) {
                var x = obj.getXValue(e);
                
                state.start = x;
            }
        };

        // The mouseup listener. This is where the magic
        // happens and the chart is updated.
        obj.canvas.onmouseup = function (e)
        {
            if (e.button === 0) {
                var x = obj.getXValue(e),
                    min = Math.min(state.start, x),
                    max = Math.max(state.start, x);

                state.end = x;
                
                obj.set({
                    xaxisScaleMin: min,
                    xaxisScaleMax: max
                });

                obj.data[0].forEach(function (v, k, arr)
                {
                    if (v[0] < min || v[0] > max) {
                        arr[k] = [];
                    }
                });
                
                obj.set({
                    contextmenu: [['Reset', function ()
                    {
                        obj.set({
                            xaxisScaleMin: original.xaxisScaleMin,
                            xaxisScaleMax: original.xaxisScaleMax,
                            xaxisLabels: RGraph.arrayClone(opt.options.xaxisLabels, true)
                        });
                
                        obj.data[0] = RGraph.arrayClone(opt.data, true);
                        
                        RGraph.redraw();
                    }]]
                });

                // Set the labels
                var newlabels = [];

                opt.options.xaxisLabels.forEach(function (v, k, arr)
                {
                    if (v[1] > min && v[1] < max) {
                        newlabels.push(v);
                    }
                });
                obj.set('xaxisLabels', newlabels);

                RGraph.redraw();
    
                state = {};
            }
        };

        // The mousemove handler. This simply highlights from
        // the mousedown start point to the current position.
        obj.canvas.onmousemove = function (e)
        {
            if (typeof state.start === 'number' && !state.end) {
                
                var coordX1 = obj.getXCoord(state.start);
                var coordX2 = obj.getXCoord(obj.getXValue(e));
                
                RGraph.redraw();

                obj.context.fillStyle = 'rgba(0,0,0,0.15)';
                obj.context.fillRect(
                    coordX1,
                    obj.properties.marginTop,
                    coordX2 - coordX1,
                    obj.canvas.height - obj.properties.marginTop - obj.properties.marginBottom
                );
            }
        };
        
        return obj;
    };








    //
    // This is a place holder - it doesn't do anything
    //
    RGraph.Scatter.drilldown.draw = function (options)
    {
        return RGraph.Scatter.drilldown(options);
    };








    //
    // This is a function that facilitates creating a
    // Marimekko chart.
    //
    RGraph.Scatter.Marimekko = function (opt)
    {
        this.options = opt.options;
        this.data    = opt.data;
        this.id      = opt.id;

        //
        // The draw function for the Marimekko chart
        //
        this.draw = function ()
        {
            return new RGraph.Scatter({
                id: this.id,
                data: opt.data,
                options: {
                    xaxisScaleMax: 100,
                    yaxisScaleMax: 100,
                    backgroundGrid: false,
                    xaxis: false,
                    yaxis: false,
                    yaxisScaleUnitsPost: '%',
                    ...this.options
                }
            }).exec(function (obj)
            {
                // Set this flag so that we can tell if this
                // is a marimekko chart
                obj.isMarimekko = true;
            }).draw();
        };
    };








    //
    // This is a "wrapper" function that creaters a dual-color
    // trendline Scatter chart for you. Options to give to
    // the frunction are (the sole argument is an object):
    //
    //   id:            The id of the canvas tag
    //   data:          The data for the chart
    //   options:       The chart options that get applied to
    //                  both Scatter charts (the one above
    //                  and also the one below the trendline.)
    //   optionsTop:    With this option you can specify
    //                  configuration values that are specific to
    //                  the top chart (eg color)
    //   optionsBottom: With this option you can specify
    //                  configuration values that are specific to
    //                  the bottom chart (eg color)
    //
    RGraph.Scatter.dualColorTrendline = function (args)
    {

        // Check that a trendline is enabled
        if(!args.options.trendline) {
            alert('[ALERT] A trendline is not enabled in your charts configuration');
            return; 
        }

        //
        // Draw the red part of the Scatter chart (the bottom
        // half)
        //
        var obj1 = new RGraph.Scatter({
            id: args.id,
            data: RGraph.arrayClone(args.data, true),
            options: RGraph.arrayClone(args.options, true)
        }).draw();
        
        
        
        // The coordinates of the first (and only) trendline
        var coords = obj1.coordsTrendline[0];



        //
        // Calculate the coordinates for the top part of the chart
        // (above the trendline)
        //
        var coords_top = [
            [0,coords[0][1]],
            ...coords,
            [obj1.canvas.width,coords[1][1]],
            [obj1.canvas.width, 0],
            [0,0]
        ];


        //
        // Calculate the coordinates for the bottom part of the chart
        // (below the trendline)
        //
        var coords_bottom = [
            [0,coords[0][1]],
            ...coords,
            [obj1.canvas.width,coords[1][1]],
            [obj1.canvas.width, obj1.canvas.height],
            [0,obj1.canvas.height]
        ];

        //
        // Now that we have the coordinates, clipping can be
        // installed on the chart that's already been drawn
        // (the top part of the chart).
        //
        obj1.set('clip', coords_top);
        
        // Set any options that have been specified that are
        // specific to the top Scatter chart
        if (RGraph.isObject(args.optionsTop)) {
            for (i in args.optionsTop) {
                if (RGraph.isString(i)) {
                    obj1.set(i, args.optionsTop[i]);
                }
            }
        }



        //
        // Create a new chart that's clipped to the bottom part
        // coordinates.
        //
        var obj2 = new RGraph.Scatter({
            id: args.id,
            data: RGraph.arrayClone(args.data, true),
            options: {
                ...RGraph.arrayClone(args.options, true),
                clip: coords_bottom // Clip to the part of the canvas
                                    // that's below the trendline
            }
        });

        // Set any options that have been specified that are
        // specific to the bottom Scatter chart
        if (RGraph.isObject(args.optionsBottom)) {
            for (i in args.optionsBottom) {
                if (RGraph.isString(i)) {
                    obj2.set(i, args.optionsBottom[i]);
                }
            }
        }

        //
        // Now draw both of the charts using the RGraph.redraw
        // API function or the requested animation effect
        if (    RGraph.isString(args.animationEffect)
            && obj1[args.animationEffect]
            && obj1[args.animationEffect]
           ) {
            var effect         = args.animationEffect;
            var effectOptions  = args.animationEffectOptions ? args.animationEffectOptions : null;
            var effectCallback = function ()
                {
                    RGraph.runOnce('rgraph-canvas-scatter-dual-color-effect-callback', function ()
                    {
                        args.animationEffectCallback ? args.animationEffectCallback() : function () {};
                    });
                }

            obj1[effect](effectOptions);
            obj2[effect](effectOptions, effectCallback);
        } else {
            RGraph.redraw();
        }
        
        return [obj1, obj2];
    };