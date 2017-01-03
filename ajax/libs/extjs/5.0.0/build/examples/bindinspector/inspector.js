Ext.require([
    'Ext.tip.QuickTipManager',
    'Ext.window.MessageBox',
    'Ext.app.*',
    'Ext.container.Viewport',
    'Ext.app.bindinspector.Inspector'
]);

Ext.define('User', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name']
});

Ext.onReady(function() {
    Ext.QuickTips.init();
    
    var windows = [{
        id: 'simple-expression',
        description: 'Simple expression binding with a value',
        viewModel: {
            data: {
                title: 'Foo'
            }
        },
        bind: '{title}'
    }, {
        id: 'simple-expression-typo',
        description: 'Simple expression binding with a typo in the binding',
        viewModel: {
            data: {
                title: 'Foo'
            }
        },
        bind: '{turtle}'
    }, {
        id: 'simple-nested-expression',
        description: 'A simple nested expression with a value',
        viewModel: {
            data: {
                theUser: {
                    name: 'Foo'
                }
            }
        },
        bind: '{theUser.name}'
    }, {
        id: 'simple-nested-expression-typo',
        description: 'A simple nested expression with a typo in the binding',
        viewModel: {
            data: {
                theUser: {
                    name: 'Foo'
                }
            }
        },
        bind: '{theUser.nme}'
    }, {
        id: 'simple-record',
        description: 'Simple binding to record field',
        viewModel: {
            data: {
                theUser: new User({
                    name: 'Foo'
                })
            }
        },
        bind: '{theUser.name}'
    }, {
        id: 'simple-record-typo',
        description: 'Simple binding to record field with a typo in the binding',
        viewModel: {
            data: {
                theUser: new User({
                    name: 'Foo'
                })
            }
        },
        bind: '{theUser.ame}'
    }, {
        id: 'simple-template-bind',
        description: 'A simple template binding with multiple values',
        viewModel: {
            data: {
                x: 1,
                y: 'Foo',
                z: true
            }
        },
        bind: '{x} {y} {z}'
    }, {
        id: 'simple-template-bind-typo',
        description: 'A simple template binding with multiple values with a typo for one of the values',
        viewModel: {
            data: {
                x: 1,
                y: 'Foo',
                z: true
            }
        },
        bind: '{x} {q} {z}'
    }, {
        id: 'nested-viewmodel',
        description: 'A simple nested view model',
        viewModel: {
            data: {
                a: 1
            }
        },
        items: {
            xtype: 'container',
            viewModel: {
                data: {
                    b: 2
                }
            },
            items: [{
                xtype: 'textfield',
                bind: '{a}'
            }, {
                xtype: 'textfield',
                bind: '{b}'
            }]
        }
    }, {
        id: 'nested-viewmodel-nested-value',
        description: 'A simple nested view model with nested data',
        viewModel: {
            data: {
                parentUser: {
                    name: 'Foo'
                }
            }
        },
        items: {
            xtype: 'container',
            viewModel: {
                data: {
                    childUser: {
                        name: 'Bar'
                    }
                }
            },
            items: [{
                xtype: 'textfield',
                bind: '{parentUser.name}'
            }, {
                xtype: 'textfield',
                bind: '{childUser.name}'
            }]
        }
    }, {
        id: 'link',
        description: 'link',
        viewModel: {
            data: {
                a: {
                    name: 'Foo'
                }
            },
            links: {
                theUser: '{a}'
            }
        },
        bind: '{theUser.name}'
    }];
    
    Ext.Array.forEach(windows, function(win) {
        var instance = new Ext.window.Window(Ext.apply({
            autoShow: true
        }, win));
        windows.push(instance);
        instance.getViewModel().getScheduler().notify();
        instance.hide();
    });
    
    new Ext.button.Button({
        renderTo: document.body,
        text: 'Go!',
        handler: function() {
            this.destroy();
            Ext.getCmp('options-toolbar').destroy();
            new Ext.app.bindinspector.Inspector();
        }
    });
    
    
    
});