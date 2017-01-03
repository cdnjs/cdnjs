$Shortcuts = {
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
            delegate: '.x-progress-bar',
            config: {
                width: 100,
                value: 1,
                animate: false
            }
        }
    ],

    'widget.tab': [
        {
            xtype: 'widget.tabpanel',
            filename: 'tabpanel-{ui}',
            config: {
                height: 200,
                width: 200,
                items: [{
                    title: 'Tab 1',
                    html: 'test'
                }, {
                    title: 'Tab 2',
                    html: 'test'
                }]
            }
        },
        {
            xtype: 'widget.tabpanel',
            filename: 'tab-bar-{ui}',
            folder: 'tab-bar',
            delegate: '.x-tab-bar',
            offsets: {
                bottom: 3,
                left: 1
            },
            config: {
                dock: 'top',
                items: [{
                    text: 'Tab 1'
                }],
                width: 300
            }
        },
        {
            filename: 'tab-{ui}-top',
            config: {
                //hack for 4.0.5
                up: function(which) {
                    if (which == 'tabbar') {
                        return {
                            minTabWidth: 20,
                            maxTabWidth: 80
                        };
                    }
                },
                text: 'Normal Top Tab'
            }
        },
        {
            filename: 'tab-{ui}-top-active',
            config: {
                //hack for 4.0.5
                up: function(which) {
                    if (which == 'tabbar') {
                        return {
                            minTabWidth: 20,
                            maxTabWidth: 80
                        };
                    }
                },
                active: true,
                text: 'Active Top Tab'
            }
        },
        {
            filename: 'tab-{ui}-top-over',
            config: {
                //hack for 4.0.5
                up: function(which) {
                    if (which == 'tabbar') {
                        return {
                            minTabWidth: 20,
                            maxTabWidth: 80
                        };
                    }
                },
                cls: 'x-tab-over x-tab-top-over',
                text: 'Over Top Tab'
            }
        },
        {
            filename: 'tab-{ui}-top-disabled',
            config: {
                //hack for 4.0.5
                up: function(which) {
                    if (which == 'tabbar') {
                        return {
                            minTabWidth: 20,
                            maxTabWidth: 80
                        };
                    }
                },
                disabled: true,
                text: 'Disabled Top Tab'
            }
        },
        {
            filename: 'tab-{ui}-bottom',
            config: {
                //hack for 4.0.5
                up: function(which) {
                    if (which == 'tabbar') {
                        return {
                            minTabWidth: 20,
                            maxTabWidth: 80
                        };
                    }
                },
                position: 'bottom',
                text: 'Normal Bottom Tab'
            }
        },
        {
            filename: 'tab-{ui}-bottom-active',
            config: {
                //hack for 4.0.5
                up: function(which) {
                    if (which == 'tabbar') {
                        return {
                            minTabWidth: 20,
                            maxTabWidth: 80
                        };
                    }
                },
                position: 'bottom',
                active: true,
                text: 'Active Bottom Tab'
            }
        },
        {
            filename: 'tab-{ui}-bottom-over',
            config: {
                //hack for 4.0.5
                up: function(which) {
                    if (which == 'tabbar') {
                        return {
                            minTabWidth: 20,
                            maxTabWidth: 80
                        };
                    }
                },
                position: 'bottom',
                cls: 'x-tab-over x-tab-bottom-over',
                text: 'Over Bottom Tab'
            }
        },
        {
            filename: 'tab-{ui}-bottom-disabled',
            config: {
                //hack for 4.0.5
                up: function(which) {
                    if (which == 'tabbar') {
                        return {
                            minTabWidth: 20,
                            maxTabWidth: 80
                        };
                    }
                },
                position: 'bottom',
                disabled: true,
                text: 'Disabled Bottom Tab'
            }
        }
    ],

    'widget.window': [
        {
            xtype: 'widget.header',
            filename: 'window-header-{ui}-top',
            folder: 'window-header',
            config: {
                title: 'Window Header',
                baseCls: 'x-window-header',
                dock: 'top'
            }
        },
        {
            xtype: 'widget.header',
            filename: 'window-header-{ui}-bottom',
            folder: 'window-header',
            config: {
                title: 'Window Header',
                baseCls: 'x-window-header',
                dock: 'bottom'
            }
        },
        {
            xtype: 'widget.header',
            filename: 'window-header-{ui}-left',
            folder: 'window-header',
            config: {
                title: 'Window Header',
                baseCls: 'x-window-header',
                dock: 'left'
            }
        },
        {
            xtype: 'widget.header',
            filename: 'window-header-{ui}-right',
            folder: 'window-header',
            config: {
                title: 'Window Header',
                baseCls: 'x-window-header',
                dock: 'right'
            }
        },
        {
            xtype: 'widget.window',
            filename: 'window-{ui}',
            title: 'Window',
            config: {
                setup: function(window, ct) {
                    this.show();
                },
                floating: {shadow:false},
                height: 200,
                width: 200,
                x: 500,
                y: 10,
                fbar: {
                    items: [{
                        text: 'Submit'
                    }]
                },
                tbar: {
                    items: [{
                        text: 'Button'
                    }]
                }
            }
        }
    ],

    'widget.panel': [
        //framed panel
        {
            xtype: 'widget.header',
            folder: 'panel-header',
            filename: 'panel-header-{ui}-framed-top',
            offsets: {
                left: 1
            },
            config: {
                title: 'Header',
                baseCls: 'x-panel-header',
                dock: 'top',
                ui: '{ui}-framed'
            }
        },
        {
            xtype: 'widget.header',
            folder: 'panel-header',
            filename: 'panel-header-{ui}-framed-bottom',
            reverse: true,
            offsets: {
                left: 1
            },
            config: {
                title: 'Header',
                baseCls: 'x-panel-header',
                dock: 'bottom',
                ui: '{ui}-framed'
            }
        },
        {
            xtype: 'widget.header',
            folder: 'panel-header',
            filename: 'panel-header-{ui}-framed-left',
            config: {
                title: 'Header',
                baseCls: 'x-panel-header',
                height: 200,
                dock: 'left',
                orientation: 'vertical',
                ui: '{ui}-framed'
            }
        },
        {
            xtype: 'widget.header',
            folder: 'panel-header',
            filename: 'panel-header-{ui}-framed-right',
            reverse: true,
            config: {
                title: 'Header',
                baseCls: 'x-panel-header',
                height: 200,
                dock: 'right',
                orientation: 'vertical',
                ui: '{ui}-framed'
            }
        },

        {
            xtype: 'widget.header',
            folder: 'panel-header',
            filename: 'panel-header-{ui}-framed-collapsed-top',
            offsets: {
                left: 1
            },
            config: {
                title: 'Header',
                baseCls: 'x-panel-header',
                cls: 'x-collapsed x-panel-header-collapsed x-panel-header-{ui}-framed-collapsed x-collapsed-top x-panel-header-collapsed-top x-panel-header-{ui}-framed-collapsed-top',
                dock: 'top',
                ui: '{ui}-framed'
            }
        },
        {
            xtype: 'widget.header',
            folder: 'panel-header',
            filename: 'panel-header-{ui}-framed-collapsed-bottom',
            reverse: true,
            offsets: {
                left: 1
            },
            config: {
                title: 'Header',
                baseCls: 'x-panel-header',
                cls: 'x-collapsed x-panel-header-collapsed x-panel-header-{ui}-framed-collapsed x-collapsed-bottom x-panel-header-collapsed-bottom x-panel-header-{ui}-framed-collapsed-bottom',
                dock: 'bottom',
                ui: '{ui}-framed'
            }
        },
        {
            xtype: 'widget.header',
            folder: 'panel-header',
            filename: 'panel-header-{ui}-framed-collapsed-left',
            config: {
                title: 'Header',
                baseCls: 'x-panel-header',
                cls: 'x-collapsed x-panel-header-collapsed x-panel-header-{ui}-framed-collapsed x-collapsed-left x-panel-header-collapsed-left x-panel-header-{ui}-framed-collapsed-left',
                height: 200,
                dock: 'left',
                orientation: 'vertical',
                ui: '{ui}-framed'
            }
        },
        {
            xtype: 'widget.header',
            folder: 'panel-header',
            filename: 'panel-header-{ui}-framed-collapsed-right',
            reverse: true,
            config: {
                title: 'Header',
                baseCls: 'x-panel-header',
                cls: 'x-collapsed x-panel-header-collapsed x-panel-header-{ui}-framed-collapsed x-collapsed-right x-panel-header-collapsed-right x-panel-header-{ui}-framed-collapsed-right',
                height: 200,
                dock: 'right',
                orientation: 'vertical',
                ui: '{ui}-framed'
            }
        },

        {
            xtype: 'widget.panel',
            filename: 'panel-{ui}-framed',
            config: {
                height: 180,
                width: 250,
                frame: true,
                html: 'Framed panel'
            }
        },

        //panel
        {
            xtype: 'widget.header',
            filename: 'panel-header-{ui}-top',
            offsets: {
                left: 1
            },
            config: {
                title: 'Header',
                baseCls: 'x-panel-header',
                dock: 'top'
            }
        },
        {
            xtype: 'widget.header',
            filename: 'panel-header-{ui}-bottom',
            reverse: true,
            offsets: {
                left: 1
            },
            config: {
                title: 'Header',
                baseCls: 'x-panel-header',
                dock: 'bottom'
            }
        },
        {
            xtype: 'widget.panel',
            folder: 'panel-header',
            filename: 'panel-header-{ui}-left',
            delegate: '.x-panel-header',
            offsets: {
                top: 3
            },
            config: {
                height: 180,
                width: 250,
                title: 'test',
                headerPosition: 'left'
            }
        },
        {
            xtype: 'widget.panel',
            folder: 'panel-header',
            filename: 'panel-header-{ui}-right',
            reverse: true,
            delegate: '.x-panel-header',
            offsets: {
                top: 3
            },
            config: {
                height: 180,
                width: 250,
                title: 'test',
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
            config: {
                scale: 'small',
                text: 'Button',
                cls: 'x-btn-{ui}-small-over'
            }
        },
        {
            filename: 'btn-{ui}-small-focus',
            config: {
                scale: 'small',
                text: 'Button',
                cls: 'x-btn-{ui}-small-focus'
            }
        },
        {
            filename: 'btn-{ui}-small-pressed',
            config: {
                scale: 'small',
                text: 'Button',
                cls: 'x-btn-{ui}-small-pressed'
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
            config: {
                scale: 'medium',
                text: 'Button',
                cls: 'x-btn-{ui}-medium-over'
            }
        },
        {
            filename: 'btn-{ui}-medium-focus',
            config: {
                scale: 'medium',
                text: 'Button',
                cls: 'x-btn-{ui}-medium-focus'
            }
        },
        {
            filename: 'btn-{ui}-medium-pressed',
            config: {
                scale: 'medium',
                text: 'Button',
                cls: 'x-btn-{ui}-medium-pressed'
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
            config: {
                scale: 'large',
                text: 'Button',
                cls: 'x-btn-{ui}-large-over'
            }
        },
        {
            filename: 'btn-{ui}-large-focus',
            config: {
                scale: 'large',
                text: 'Button',
                cls: 'x-btn-{ui}-large-focus'
            }
        },
        {
            filename: 'btn-{ui}-large-pressed',
            config: {
                scale: 'large',
                text: 'Button',
                cls: 'x-btn-{ui}-large-pressed'
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
            config: {
                scale: 'small',
                ui: '{ui}-toolbar',
                text: 'Button',
                cls: 'x-btn-{ui}-toolbar-small-over'
            }
        },
        {
            filename: 'btn-{ui}-toolbar-small-focus',
            config: {
                scale: 'small',
                ui: '{ui}-toolbar',
                text: 'Button',
                cls: 'x-btn-{ui}-toolbar-small-focus'
            }
        },
        {
            filename: 'btn-{ui}-toolbar-small-pressed',
            config: {
                scale: 'small',
                ui: '{ui}-toolbar',
                text: 'Button',
                cls: 'x-btn-{ui}-toolbar-small-pressed'
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
            config: {
                scale: 'medium',
                ui: '{ui}-toolbar',
                text: 'Button',
                cls: 'x-btn-{ui}-toolbar-medium-over'
            }
        },
        {
            filename: 'btn-{ui}-toolbar-medium-focus',
            config: {
                scale: 'medium',
                ui: '{ui}-toolbar',
                text: 'Button',
                cls: 'x-btn-{ui}-toolbar-medium-focus'
            }
        },
        {
            filename: 'btn-{ui}-toolbar-medium-pressed',
            config: {
                scale: 'medium',
                ui: '{ui}-toolbar',
                text: 'Button',
                cls: 'x-btn-{ui}-toolbar-medium-pressed'
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
            config: {
                scale: 'large',
                ui: '{ui}-toolbar',
                text: 'Button',
                cls: 'x-btn-{ui}-toolbar-large-over'
            }
        },
        {
            filename: 'btn-{ui}-toolbar-large-focus',
            config: {
                scale: 'large',
                ui: '{ui}-toolbar',
                text: 'Button',
                cls: 'x-btn-{ui}-toolbar-large-focus'
            }
        },
        {
            filename: 'btn-{ui}-toolbar-large-pressed',
            config: {
                scale: 'large',
                ui: '{ui}-toolbar',
                text: 'Button',
                cls: 'x-btn-{ui}-toolbar-large-pressed'
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
    ]
};
