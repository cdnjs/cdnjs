Ext.define('ChartsKitchenSink.controller.Main', {
    extend: 'Ext.app.Controller',

    requires: [
        'ChartsKitchenSink.view.*'
    ],

    refs: [
        {
            ref: 'viewport',
            selector: 'viewport'
        },
        {
            ref: 'navigation',
            selector: 'navigation'
        },
        {
            ref: 'contentPanel',
            selector: 'contentPanel'
        },
        {
            ref: 'descriptionPanel',
            selector: 'descriptionPanel'
        },
        {
            ref: 'codePreview',
            selector: 'codePreview'
        }
    ],

    exampleRe: /^\s*\/\/\s*(\<\/?example>)\s*$/,

    init: function() {
        this.control({
            'navigation': {
                beforeselect: 'beforeNavSelectionChange',
                selectionchange: 'onNavSelectionChange'
            },
            'viewport': {
                afterlayout: 'afterViewportLayout'
            },
            'codePreview tool[type=maximize]': {
                click: 'onMaximizeClick'
            },
            'tool[regionTool]': {
                click: 'onSetRegion'
            }
        });
    },
            
    onSetRegion: function (tool) {
        var panel = tool.toolOwner;

        var regionMenu = panel.regionMenu || (panel.regionMenu =
                Ext.widget({
                    xtype: 'menu',
                    items: [{
                        text: 'North',
                        checked: panel.region === 'north',
                        group: 'mainregion',
                        handler: function () {
                            panel.setBorderRegion('north');
                        }
                    },{
                        text: 'South',
                        checked: panel.region === 'south',
                        group: 'mainregion',
                        handler: function () {
                            panel.setBorderRegion('south');
                        }
                    },{
                        text: 'East',
                        checked: panel.region === 'east',
                        group: 'mainregion',
                        handler: function () {
                            panel.setBorderRegion('east');
                        }
                    },{
                        text: 'West',
                        checked: panel.region === 'west',
                        group: 'mainregion',
                        handler: function () {
                            panel.setBorderRegion('west');
                        }
                    }]
                }));

        regionMenu.showBy(tool.el);
    },

    afterViewportLayout: function() {
        if (!this.navigationSelected) {
            var id = location.hash.substring(1),
                navigation = this.getNavigation(),
                store = navigation.getStore(),
                node;

            if (store.isLoading()) {
                store.on('load', this.afterViewportLayout, this, {
                    single: true
                });
                return;
            }

            node = id ? store.getNodeById(id) : store.getRoot().firstChild.firstChild;

            navigation.getSelectionModel().select(node);
            navigation.getView().focusNode(node);
            this.navigationSelected = true;
        }
    },

    beforeNavSelectionChange: function(selModel, record, recIdx) {
        return record.isLeaf();
    },

    onNavSelectionChange: function(selModel, records) {
        var record = records[0],
            text = record.get('text'),
            xtype = record.get('id'),
            alias = 'widget.' + xtype,
            contentPanel = this.getContentPanel(),
            themeName = Ext.themeName,
            cmp;

        if (xtype) { // only leaf nodes have ids

            // Bracket removal, adding, title setting, and description update within one layout.
            Ext.suspendLayouts();

            contentPanel.removeAll(true);

            var className = Ext.ClassManager.getNameByAlias(alias),
                ViewClass = Ext.ClassManager.get(className),
                clsProto = ViewClass.prototype;
            if (clsProto.themes) {
                clsProto.themeInfo = clsProto.themes[themeName];
                if (themeName === 'gray') {
                    clsProto.themeInfo = Ext.applyIf(clsProto.themeInfo || {}, clsProto.themes.classic);
                }
            }

            cmp = new ViewClass();
            contentPanel.add(cmp);

            contentPanel.setTitle(record.parentNode.get('text') + ' - ' + text);

            document.title = document.title.split(' - ')[0] + ' - ' + text;
            location.hash = xtype;

            this.updateDescription(clsProto);

            if (clsProto.exampleCode) {
                this.updateCodePreview(clsProto.exampleCode);
            } else {
                this.updateCodePreviewAsync(clsProto, xtype);
            }

            Ext.resumeLayouts(true);
            
            if (cmp.floating) {
                cmp.show();
            }
        }
    },

    onMaximizeClick: function(){
        var preview = this.getCodePreview(),
            code = preview.getEl().down('.prettyprint').dom.innerHTML;

        var w = new Ext.window.Window({
            rtl: false,
            baseCls: 'x-panel',
            maximized: true,
            title: 'Code Preview',
            plain: true,
            cls: 'preview-container',
            autoScroll: true,
            bodyStyle: 'background-color:white',
            html: '<pre class="prettyprint">' + code + '</pre>',
            closable: false,
            tools: [{
                type: 'close',
                handler: function() {
                    w.hide(preview, function() {
                        w.destroy();
                    });
                }
            }]
        });
        w.show(preview);
    },

    processCodePreview: function (clsProto, text) {
        var me = this,
            lines = text.split('\n'),
            removing = false,
            keepLines = [],
            tempLines = [],
            n = lines.length,
            i, line;

        // Remove all "example" blocks as they are fluff.
        for (i = 0; i < n; ++i) {
            line = lines[i];
            if (removing) {
                if (me.exampleRe.test(line)) {
                    removing = false;
                }
            } else if (me.exampleRe.test(line)) {
                removing = true;
            } else {
                tempLines.push(line);
            }
        }

        // Inline any themeInfo values to clarify the code.
        //
        if (clsProto.themeInfo) {
            var path = ['this', 'themeInfo'];

            function process (obj) {
                for (var name in obj) {
                    var value = obj[name];

                    path.push(name);

                    if (Ext.isPrimitive(value)) {
                        if (Ext.isString(value)) {
                            value = "'" + value + "'";
                        }
                        me.replaceValues(tempLines, path.join('.'), value);
                    } else {
                        process(value);
                    }

                    path.pop();
                }
            }

            process(clsProto.themeInfo);
        }

        // Remove any lines with remaining (unused) themeInfo. These properties will
        // be "undefined" for this theme and so are useless to the example.
        //
        for (i = 0, n = tempLines.length; i < n; ++i) {
            line = tempLines[i];
            if (line.indexOf('themeInfo') < 0) {
                keepLines.push(line);
            }
        }

        var code = keepLines.join('\n');
        code = Ext.htmlEncode(code);
        clsProto.exampleCode = code;
    },

    replaceValues: function (lines, text, value) {
        var n = lines.length,
            i, pos, line;

        for (i = 0; i < n; ++i) {
            line = lines[i];
            pos = line.indexOf(text);
            if (pos >= 0) {
                lines[i] = line.split(text).join(String(value));
            }
        }
    },

    updateCodePreview: function (text) {
        this.getCodePreview().update(
            '<pre id="code-preview-container" class="prettyprint">' + text + '</pre>'
        );
        prettyPrint();
    },

    updateCodePreviewAsync: function(clsProto, xtype) {
        var me = this,
            className = Ext.ClassManager.getNameByAlias('widget.' + xtype),
            path = className.replace(/\./g, '/').replace('ChartsKitchenSink', 'app') + '.js';

        Ext.Ajax.request({
            url: path,
            success: function(response) {
                me.processCodePreview(clsProto, response.responseText);
                me.updateCodePreview(clsProto.exampleCode);
            }
        });
    },

    updateDescription: function (clsProto) {
        var description = clsProto.exampleDescription,
            descriptionPanel = this.getDescriptionPanel();

        if (Ext.isArray(description)) {
            clsProto.exampleDescription = description = description.join('');
        }

        descriptionPanel.update(description);
    }

});
