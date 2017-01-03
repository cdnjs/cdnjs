/*
 * This file defines the core framework "shortcuts". These are the modes and states of the
 * various components keyed by their xtype.
 * 
 * To add more shortcuts for an xtype to a derived theme, call Ext.theme.addShortcuts in
 * a theme-specific file and script tag that file in to that theme's 'theme.html' file.
 */
Ext.theme.addShortcuts({
    'tooltip': [{
        setup: function(component, ct) {
            component.render(Ext.getBody());
            component.showBy(ct);
            ct.setHeight(component.getHeight());
            ct.el.dom.appendChild(component.el.dom);
            component.el.setLeft(0);
            component.el.setTop(0);
        },
        config: {
            width: 100,
            height: 40,
            hide: function(){}
        }
    }],

    'widget.buttongroup': [
        {
            folder: 'btn-group',
            filename: 'btn-group-{ui}-framed-notitle',
            config: {
                columns: 2,
                defaults: {
                    scale: 'small'
                },
                items: [{
                    xtype:'splitbutton',
                    text: 'Menu Button',
                    iconCls: 'add16',
                    menu: [{text: 'Menu Item 1'}]
                },{
                    xtype:'splitbutton',
                    text: 'Cut',
                    iconCls: 'add16',
                    menu: [{text: 'Cut Menu Item'}]
                },{
                    text: 'Copy',
                    iconCls: 'add16'
                },{
                    text: 'Paste',
                    iconCls: 'add16',
                    menu: [{text: 'Paste Menu Item'}]
                },{
                    text: 'Format',
                    iconCls: 'add16'
                }]
            }
        },
        {
            folder: 'btn-group',
            filename: 'btn-group-{ui}-framed',
            config: {
                columns: 2,
                title: 'Manifest',
                defaults: {
                    scale: 'small'
                },
                items: [{
                    xtype:'splitbutton',
                    text: 'Menu Button',
                    iconCls: 'add16',
                    menu: [{text: 'Menu Item 1'}]
                },{
                    xtype:'splitbutton',
                    text: 'Cut',
                    iconCls: 'add16',
                    menu: [{text: 'Cut Menu Item'}]
                },{
                    text: 'Copy',
                    iconCls: 'add16'
                },{
                    text: 'Paste',
                    iconCls: 'add16',
                    menu: [{text: 'Paste Menu Item'}]
                },{
                    text: 'Format',
                    iconCls: 'add16'
                }]
            }
        }
    ],

    'widget.progressbar': [
        {
            xtype: 'widget.progressbar',
            folder: 'progress',
            filename: 'progress-{ui}',
            delegate: '.' + Ext.baseCSSPrefix + 'progress-bar',
            config: {
                width: 100,
                value: 1,
                animate: false
            }
        }
    ],

    'widget.tabbar': [
        {
            xtype: 'widget.tabbar',
            filename: 'tab-bar-{ui}',
            folder: 'tab-bar',
            config: {
                orientation: 'horizontal',
                dock: 'top',
                width: 100,
                listeners: {
                    render: function(tabbar) {
                        tabbar.strip.hide();
                    }
                }
            }
        },
        {
            xtype: 'widget.tabbar',
            filename: 'tab-bar-{ui}',
            folder: 'tab-bar',
            config: {
                orientation: 'vertical',
                dock: 'right',
                height: 100,
                listeners: {
                    render: function(tabbar) {
                        tabbar.strip.hide();
                    }
                }
            }
        },
        {
            xtype: 'widget.tabbar',
            filename: 'tab-bar-{ui}',
            folder: 'tab-bar',
            config: {
                orientation: 'horizontal',
                dock: 'bottom',
                width: 100,
                listeners: {
                    render: function(tabbar) {
                        tabbar.strip.hide();
                    }
                }
            }
        },
        {
            xtype: 'widget.tabbar',
            filename: 'tab-bar-{ui}',
            folder: 'tab-bar',
            config: {
                orientation: 'vertical',
                dock: 'left',
                height: 100,
                listeners: {
                    render: function(tabbar) {
                        tabbar.strip.hide();
                    }
                }
            }
        }
    ],

    'widget.tab': [
        {
            filename: 'tab-{ui}-top',
            config: {
                text: 'Normal Top Tab',
                closable: false
            }
        },
        {
            filename: 'tab-{ui}-top-active',
            config: {
                text: 'Active Top Tab',
                active: true,
                closable: false
            }
        },
        {
            filename: 'tab-{ui}-top-over',
            over: true,
            config: {
                text: 'Over Top Tab',
                closable: false
            }
        },
        {
            filename: 'tab-{ui}-top-disabled',
            config: {
                text: 'Disabled Top Tab',
                closable: false,
                disabled: true
            }
        },
        {
            filename: 'tab-{ui}-right',
            config: {
                text: 'Normal Right Tab',
                tabPosition: 'right',
                rotation: 0,
                closable: false
            }
        },
        {
            filename: 'tab-{ui}-right-active',
            config: {
                text: 'Active Right Tab',
                tabPosition: 'right',
                rotation: 0,
                active: true,
                closable: false
            }
        },
        {
            filename: 'tab-{ui}-right-over',
            over: true,
            config: {
                text: 'Over Right Tab',
                tabPosition: 'right',
                rotation: 0,
                closable: false
            }
        },
        {
            filename: 'tab-{ui}-right-disabled',
            config: {
                text: 'Disabled Right Tab',
                tabPosition: 'right',
                rotation: 0,
                closable: false,
                disabled: true
            }
        },
        {
            filename: 'tab-{ui}-bottom',
            config: {
                text: 'Normal Bottom Tab',
                tabPosition: 'bottom',
                rotation: 0,
                closable: false
            }
        },
        {
            filename: 'tab-{ui}-bottom-active',
            config: {
                text: 'Active Bottom Tab',
                tabPosition: 'bottom',
                rotation: 0,
                active: true,
                closable: false
            }
        },
        {
            filename: 'tab-{ui}-bottom-over',
            over: true,
            config: {
                text: 'Over Bottom Tab',
                tabPosition: 'bottom',
                rotation: 0,
                closable: false
            }
        },
        {
            filename: 'tab-{ui}-bottom-disabled',
            config: {
                text: 'Disabled Bottom Tab',
                tabPosition: 'bottom',
                rotation: 0,
                closable: false,
                disabled: true
            }
        },
        {
            filename: 'tab-{ui}-left',
            config: {
                text: 'Normal left Tab',
                tabPosition: 'left',
                rotation: 0,
                closable: false
            }
        },
        {
            filename: 'tab-{ui}-left-active',
            config: {
                text: 'Active left Tab',
                tabPosition: 'left',
                rotation: 0,
                active: true,
                closable: false
            }
        },
        {
            filename: 'tab-{ui}-left-over',
            over: true,
            config: {
                text: 'Over left Tab',
                tabPosition: 'left',
                rotation: 0,
                closable: false
            }
        },
        {
            filename: 'tab-{ui}-left-disabled',
            config: {
                text: 'Disabled left Tab',
                tabPosition: 'left',
                rotation: 0,
                closable: false,
                disabled: true
            }
        }
    ],

    'widget.window': [
        // Floating
        {
            filename: 'window-{ui}',
            title: 'Window',
            config: {
                header: false,
                resizable: false,
                height: 200,
                width: 200
            }
        },
        // window w/header
        {
            delegate: '.' + Ext.baseCSSPrefix + 'window-header',
            config: {
                title: 'Top Window',
                closable: false,
                width: 200,
                html: '&#160;',
                headerPosition: 'top'
            }
        },
        {
            delegate: '.' + Ext.baseCSSPrefix + 'window-header',
            config: {
                title: 'Bottom Window',
                closable: false,
                width: 200,
                html: '&#160;',
                headerPosition: 'bottom'
            }
        },
        {
            delegate: '.' + Ext.baseCSSPrefix + 'window-header',
            config: {
                title: 'Left Window',
                closable: false,
                height: 200,
                width: 200,
                headerPosition: 'left'
            }
        },
        {
            delegate: '.' + Ext.baseCSSPrefix + 'window-header',
            config: {
                title: 'Right Window',
                closable: false,
                height: 200,
                width: 200,
                headerPosition: 'right'
            }
        },
        // collapsed window w/header
        {
            delegate: '.' + Ext.baseCSSPrefix + 'window-header',
            config: {
                title: 'Top Collapsed',
                collapsed: true,
                closable: false,
                expandOnShow: false,
                width: 200,
                headerPosition: 'top'
            }
        },
        {
            delegate: '.' + Ext.baseCSSPrefix + 'window-header',
            config: {
                title: 'Bottom Collapsed',
                collapsed: true,
                closable: false,
                expandOnShow: false,
                width: 200,
                headerPosition: 'bottom'
            }
        },
        {
            delegate: '.' + Ext.baseCSSPrefix + 'window-header',
            config: {
                title: 'Left Collapsed',
                collapsed: true,
                closable: false,
                expandOnShow: false,
                height: 200,
                width: 200,
                headerPosition: 'left'
            }
        },
        {
            delegate: '.' + Ext.baseCSSPrefix + 'window-header',
            config: {
                title: 'Right Collapsed',
                collapsed: true,
                closable: false,
                expandOnShow: false,
                height: 200,
                width: 200,
                headerPosition: 'right'
            }
        }
    ], // window

    'widget.panel': [
        {
            config: {
                width: 200,
                height: 200,
                frame: true,
                bodyPadding: 20,
                html: 'Framed panel'
            }
        },
        // panel w/header
        {
            delegate: '.' + Ext.baseCSSPrefix + 'panel-header',
            config: {
                title: 'Top',
                width: 200,
                html: '&#160;',
                headerPosition: 'top'
            }
        },
        {
            delegate: '.' + Ext.baseCSSPrefix + 'panel-header',
            config: {
                title: 'Bottom',
                width: 200,
                html: '&#160;',
                headerPosition: 'bottom'
            }
        },
        {
            delegate: '.' + Ext.baseCSSPrefix + 'panel-header',
            config: {
                title: 'Left',
                height: 200,
                width: 200,
                headerPosition: 'left'
            }
        },
        {
            delegate: '.' + Ext.baseCSSPrefix + 'panel-header',
            config: {
                title: 'Right',
                height: 200,
                width: 200,
                headerPosition: 'right'
            }
        },
        // framed panel w/header
        {
            delegate: '.' + Ext.baseCSSPrefix + 'panel-header',
            config: {
                title: 'Top Framed',
                width: 200,
                frame: true,
                html: '&#160;',
                headerPosition: 'top'
            }
        },
        {
            delegate: '.' + Ext.baseCSSPrefix + 'panel-header',
            config: {
                title: 'Bottom Framed',
                width: 200,
                frame: true,
                html: '&#160;',
                headerPosition: 'bottom'
            }
        },
        {
            delegate: '.' + Ext.baseCSSPrefix + 'panel-header',
            config: {
                title: 'Left Framed',
                height: 200,
                width: 200,
                frame: true,
                headerPosition: 'left'
            }
        },
        {
            delegate: '.' + Ext.baseCSSPrefix + 'panel-header',
            config: {
                title: 'Right Framed',
                height: 200,
                width: 200,
                frame: true,
                headerPosition: 'right'
            }
        },
        // collapsed framed panel w/header
        {
            delegate: '.' + Ext.baseCSSPrefix + 'panel-header',
            config: {
                title: 'Top Framed/Collapsed',
                collapsed: true,
                width: 200,
                frame: true,
                headerPosition: 'top'
            }
        },
        {
            delegate: '.' + Ext.baseCSSPrefix + 'panel-header',
            config: {
                title: 'Bottom Framed/Collapsed',
                collapsed: true,
                width: 200,
                frame: true,
                headerPosition: 'bottom'
            }
        },
        {
            delegate: '.' + Ext.baseCSSPrefix + 'panel-header',
            config: {
                title: 'Left Framed/Collapsed',
                collapsed: true,
                height: 200,
                width: 200,
                frame: true,
                headerPosition: 'left'
            }
        },
        {
            delegate: '.' + Ext.baseCSSPrefix + 'panel-header',
            config: {
                title: 'Right Framed/Collapsed',
                collapsed: true,
                height: 200,
                width: 200,
                frame: true,
                headerPosition: 'right'
            }
        }
    ],

    'widget.toolbar': [
        {
            filename: 'toolbar-{ui}',
            config: {
                width: 200,
                items: [{
                    text: 'test'
                }]
            }
        }
    ],

    'widget.button': [
        //small button
        {
            filename: 'btn-{ui}-small',
            config: {
                scale: 'small',
                text: 'Button'
            }
        },
        {
            filename: 'btn-{ui}-small-over',
            over: true,
            config: {
                scale: 'small',
                text: 'Button'
            }
        },
        {
            filename: 'btn-{ui}-small-focus',
            config: {
                scale: 'small',
                text: 'Button',
                cls: Ext.baseCSSPrefix + 'btn-focus'
            }
        },
        {
            filename: 'btn-{ui}-small-pressed',
            config: {
                scale: 'small',
                text: 'Button',
                cls: Ext.baseCSSPrefix + 'btn-pressed'
            }
        },
        {
            filename: 'btn-{ui}-small-disabled',
            config: {
                scale: 'small',
                text: 'Button',
                disabled: true
            }
        },

        //medium button
        {
            filename: 'btn-{ui}-medium',
            config: {
                scale: 'medium',
                text: 'Button'
            }
        },
        {
            filename: 'btn-{ui}-medium-over',
            over: true,
            config: {
                scale: 'medium',
                text: 'Button'
            }
        },
        {
            filename: 'btn-{ui}-medium-focus',
            config: {
                scale: 'medium',
                text: 'Button',
                cls: Ext.baseCSSPrefix + 'btn-focus'
            }
        },
        {
            filename: 'btn-{ui}-medium-pressed',
            config: {
                scale: 'medium',
                text: 'Button',
                cls: Ext.baseCSSPrefix + 'btn-pressed'
            }
        },
        {
            filename: 'btn-{ui}-medium-disabled',
            config: {
                scale: 'medium',
                text: 'Button',
                disabled: true
            }
        },

        //large button
        {
            filename: 'btn-{ui}-large',
            config: {
                scale: 'large',
                text: 'Button'
            }
        },
        {
            filename: 'btn-{ui}-large-over',
            over: true,
            config: {
                scale: 'large',
                text: 'Button'
            }
        },
        {
            filename: 'btn-{ui}-large-focus',
            config: {
                scale: 'large',
                text: 'Button',
                cls: Ext.baseCSSPrefix + 'btn-focus'
            }
        },
        {
            filename: 'btn-{ui}-large-pressed',
            config: {
                scale: 'large',
                text: 'Button',
                cls: Ext.baseCSSPrefix + 'btn-pressed'
            }
        },
        {
            filename: 'btn-{ui}-large-disabled',
            config: {
                scale: 'large',
                text: 'Button',
                disabled: true
            }
        },

        //small toolbar button
        {
            filename: 'btn-{ui}-toolbar-small',
            config: {
                scale: 'small',
                ui: '{ui}-toolbar',
                text: 'Button'
            }
        },
        {
            filename: 'btn-{ui}-toolbar-small-over',
            over: true,
            config: {
                scale: 'small',
                ui: '{ui}-toolbar',
                text: 'Button'
            }
        },
        {
            filename: 'btn-{ui}-toolbar-small-focus',
            config: {
                scale: 'small',
                ui: '{ui}-toolbar',
                text: 'Button',
                cls: Ext.baseCSSPrefix + 'btn-focus'
            }
        },
        {
            filename: 'btn-{ui}-toolbar-small-pressed',
            config: {
                scale: 'small',
                ui: '{ui}-toolbar',
                text: 'Button',
                cls: Ext.baseCSSPrefix + 'btn-pressed'
            }
        },
        {
            filename: 'btn-{ui}-toolbar-small-disabled',
            config: {
                scale: 'small',
                ui: '{ui}-toolbar',
                text: 'Button',
                disabled: true
            }
        },

        //medium toolbar button
        {
            filename: 'btn-{ui}-toolbar-medium',
            config: {
                scale: 'medium',
                ui: '{ui}-toolbar',
                text: 'Button'
            }
        },
        {
            filename: 'btn-{ui}-toolbar-medium-over',
            over: true,
            config: {
                scale: 'medium',
                ui: '{ui}-toolbar',
                text: 'Button'
            }
        },
        {
            filename: 'btn-{ui}-toolbar-medium-focus',
            config: {
                scale: 'medium',
                ui: '{ui}-toolbar',
                text: 'Button',
                cls: Ext.baseCSSPrefix + 'btn-focus'
            }
        },
        {
            filename: 'btn-{ui}-toolbar-medium-pressed',
            config: {
                scale: 'medium',
                ui: '{ui}-toolbar',
                text: 'Button',
                cls: Ext.baseCSSPrefix + 'btn-pressed'
            }
        },
        {
            filename: 'btn-{ui}-toolbar-medium-disabled',
            config: {
                scale: 'medium',
                ui: '{ui}-toolbar',
                text: 'Button',
                disabled: true
            }
        },

        //large toolbar button
        {
            filename: 'btn-{ui}-toolbar-large',
            config: {
                scale: 'large',
                ui: '{ui}-toolbar',
                text: 'Button'
            }
        },
        {
            filename: 'btn-{ui}-toolbar-large-over',
            over: true,
            config: {
                scale: 'large',
                ui: '{ui}-toolbar',
                text: 'Button'
            }
        },
        {
            filename: 'btn-{ui}-toolbar-large-focus',
            config: {
                scale: 'large',
                ui: '{ui}-toolbar',
                text: 'Button',
                cls: Ext.baseCSSPrefix + 'btn-focus'
            }
        },
        {
            filename: 'btn-{ui}-toolbar-large-pressed',
            config: {
                scale: 'large',
                ui: '{ui}-toolbar',
                text: 'Button',
                cls: Ext.baseCSSPrefix + 'btn-pressed'
            }
        },
        {
            filename: 'btn-{ui}-toolbar-large-disabled',
            config: {
                scale: 'large',
                ui: '{ui}-toolbar',
                text: 'Button',
                disabled: true
            }
        }
    ],

    'widget.roweditorbuttons': [
        {
            config: {
                position: 'bottom',
                style: 'position:static',
                rowEditor: {
                    buttonUI: 'default-toolbar',
                    saveBtnText: 'Update',
                    cancelBtnText: 'Cancel',
                    editingPlugin: {
                        completeEdit: Ext.emptyFn,
                        cancelEdit: Ext.emptyFn
                    }
                }
            }
        },
        {
            config: {
                position: 'top',
                style: 'position:static',
                rowEditor: {
                    buttonUI: 'default-toolbar',
                    saveBtnText: 'Update',
                    cancelBtnText: 'Cancel',
                    editingPlugin: {
                        completeEdit: Ext.emptyFn,
                        cancelEdit: Ext.emptyFn
                    }
                }
            }
        }
    ]
});
