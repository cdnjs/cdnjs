(function() {
    function getQueryParam(name, queryString) {
        var match = RegExp(name + '=([^&]*)').exec(queryString || location.search);
        return match && decodeURIComponent(match[1]);
    }

    function hasOption(opt) {
        var s = window.location.search;
        var re = new RegExp('(?:^|[&?])' + opt + '(?:[=]([^&]*))?(?:$|[&])', 'i');
        var m = re.exec(s);

        return m ? (m[1] === undefined ? true : m[1]) : false;
    }

    var scriptTags = document.getElementsByTagName('script'),
        defaultTheme = 'crisp',
        defaultRtl = false,
        i = scriptTags.length,
        requires = [
            'Ext.window.MessageBox',
            'Ext.toolbar.Toolbar',
            'Ext.form.field.ComboBox',
            'Ext.form.FieldContainer',
            'Ext.form.field.Radio'

        ],
        comboWidth = {
            classic: 160,
            gray: 160,
            neptune: 180,
            crisp: 180,
            'neptune-touch': 220,
            'crisp-touch': 220
        },
        labelWidth = {
            classic: 40,
            gray: 40,
            neptune: 45,
            crisp: 45,
            'neptune-touch': 55,
            'crisp-touch': 55
        },
        defaultQueryString, src, theme, rtl, toolbar;

    while (i--) {
        src = scriptTags[i].src;
        if (src.indexOf('include-ext.js') !== -1) {
            defaultQueryString = src.split('?')[1];
            if (defaultQueryString) {
                defaultTheme = getQueryParam('theme', defaultQueryString) || defaultTheme;
                defaultRtl = getQueryParam('rtl', defaultQueryString) || defaultRtl;
            }
            break;
        }
    }

    Ext.themeName = theme = getQueryParam('theme') || defaultTheme;
    
    rtl = getQueryParam('rtl') || defaultRtl;

    if (rtl.toString() === 'true') {
        requires.unshift('Ext.rtl.*');
        Ext.define('Ext.examples.RtlComponent', {
            override: 'Ext.Component',
            rtl: true
        });
    }

    Ext.require(requires);

    Ext.onReady(function() {
        Ext.getBody().addCls(Ext.baseCSSPrefix + 'theme-' + Ext.themeName);

        // prevent touchmove from panning the viewport in mobile safari
        if (Ext.supports.TouchEvents) {
            Ext.getDoc().on({
                touchmove: function(e) {
                    // If within a scroller, don't let the document use it
                    if (Ext.scroll.Scroller.isTouching) {
                        e.preventDefault();
                    }
                },
                translate: false,
                delegated: false
            });
        }

        if (hasOption('nocss3')) {
            Ext.supports.CSS3BorderRadius = false;
            Ext.getBody().addCls('x-nbr x-nlg');
        }

        if (hasOption('nlg')) {
            Ext.getBody().addCls('x-nlg');
        }

        function setParam(param) {
            var queryString = Ext.Object.toQueryString(
                Ext.apply(Ext.Object.fromQueryString(location.search), param)
            );
            location.search = queryString;
        }

        function removeParam(paramName) {
            var params = Ext.Object.fromQueryString(location.search);

            delete params[paramName];

            location.search = Ext.Object.toQueryString(params);
        }

        setTimeout(function() {
            toolbar = Ext.widget({
                xtype: 'toolbar',
                border: true,
                rtl: false,
                id: 'options-toolbar',
                floating: true,
                fixed: true,
                preventFocusOnActivate: true,
                draggable: {
                    constrain: true
                },
                defaults : { rtl : false },
                items: [{
                    xtype: 'combo',
                    width: comboWidth[Ext.themeName],
                    labelWidth: labelWidth[Ext.themeName],
                    fieldLabel: 'Theme',
                    displayField: 'name',
                    valueField: 'value',
                    labelStyle: 'cursor:move;',
                    margin: '0 5 0 0',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['value', 'name'],
                        data : [
                            { value: 'neptune', name: 'Neptune' },
                            { value: 'neptune-touch', name: 'Neptune Touch' },
                            { value: 'crisp', name: 'Crisp' },
                            { value: 'crisp-touch', name: 'Crisp Touch' },
                            { value: 'classic', name: 'Classic' },
                            { value: 'gray', name: 'Gray' }
                        ]
                    }),
                    value: theme,
                    listeners: {
                        select: function(combo) {
                            var theme = combo.getValue();
                            if (theme !== defaultTheme) {
                                setParam({ theme: theme });
                            } else {
                                removeParam('theme');
                            }
                        }
                    }
                }, {

                    /**
                     * Only visible in repoDevMode and on QA sites
                     */
                    xtype: 'button',
                    hidden: !(Ext.repoDevMode || location.href.indexOf('qa.sencha.com') !== -1),
                    enableToggle: true,
                    pressed: rtl,
                    text: 'RTL',
                    margin: '0 5 0 0',
                    listeners: {
                        toggle: function(btn, pressed) {
                            if (pressed) {
                                setParam({ rtl: true });
                            } else {
                                removeParam('rtl');
                            }
                        }
                    }
                }, {
                    xtype: 'tool',
                    type: 'close',
                    handler: function() {
                        toolbar.destroy();
                    }
                }],

                // Extra constraint margins within default constrain region of parentNode
                constraintInsets: '0 -' + (Ext.getScrollbarSize().width + 5) + ' 0 0'
            });
            toolbar.show();
            toolbar.anchorTo(
                document.body,
                Ext.optionsToolbarAlign || 'tr-tr',
                [-(Ext.getScrollbarSize().width + 5), 0],  //adjust for scrollbar offsets
                false,                                     //anim
                true                                       //monitor scroll
            );

        }, 100);

    });
})();
