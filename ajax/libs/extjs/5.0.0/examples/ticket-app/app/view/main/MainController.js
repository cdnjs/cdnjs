Ext.define('Ticket.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    createTab: function (prefix, rec, cfg) {
        var tabs = this.lookupReference('main'),
            id = prefix + '_' + rec.getId(),
            tab = tabs.items.getByKey(id);

        if (!tab) {
            cfg.itemId = id;
            cfg.closable = true;
            tab = tabs.add(cfg);
        }

        tabs.setActiveTab(tab);
    },

    editUser: function (userRecord) {
        var win = new Ticket.view.user.User({
            viewModel: {
                data: {
                    theUser: userRecord
                }
            }
        });

        win.show();
    },

    onClickUserName: function () {
        var data = this.getViewModel().getData();
        this.editUser(data.currentUser);
    },

    onEditUser: function (ctrl, rec) {
        this.editUser(rec);
    },

    onProjectSelect: function () {
        var tabs = this.lookupReference('main');
        tabs.setActiveTab(0);
    },

    onProjectSearchClick: function (view, rowIdx, colIdx, item, e, rec) {
        this.createTab('project', rec, {
            xtype: 'ticketsearch',
            listeners: {
                viewticket: 'onViewTicket'
            },
            viewModel: {
                data: {
                    theProject: rec
                }
            }
        });
    },
    
    onViewTicket: function (view, rec) {
        this.createTab('ticket', rec, {
            xtype: 'ticketdetail',
            session: new Ext.data.Session({
                data: [rec]
            }),
            viewModel: {
                data: {
                    theTicket: rec
                }
            }
        });
    },

    showBindInspector: function () {
        var inspector = new Ext.app.bindinspector.Inspector();
    }
});
