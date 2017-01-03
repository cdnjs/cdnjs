Ext.define('KitchenSink.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    applyState: function(state) {
        if (state.hasTreeNav) {
            this.getView().add({
                region: 'west',
                reference: 'tree',
                xtype: 'navigation-tree'
            });

            var refs = this.getReferences();

            refs.breadcrumb.hide();
            refs.contentPanel.header.hidden = false;
            this._hasTreeNav = true;
        } else {
            this._hasTreeNav = false;
        }
    },

    getState: function() {
        return {
            hasTreeNav: this._hasTreeNav
        };
    },

    showBreadcrumbNav: function() {
        var refs = this.getReferences(),
            breadcrumbNav = refs.breadcrumb,
            treeNav = refs.tree,
            selection = treeNav.getSelectionModel().getSelection()[0];

        if (breadcrumbNav) {
            breadcrumbNav.show();
        } else {
            refs.contentPanel.addDocked({
                xtype: 'navigation-breadcrumb',
                selection: selection
            });
        }

        refs['breadcrumb.toolbar'].setSelection(selection);

        treeNav.hide();
        refs.contentPanel.getHeader().hide();

        this._hasTreeNav = false;
        this.getView().saveState();
    },

    showTreeNav: function() {
        var refs = this.getReferences(),
            treeNav = refs.tree,
            breadcrumbNav = refs.breadcrumb;

        if (treeNav) {
            treeNav.show();
        } else {
            treeNav = this.getView().add({
                region: 'west',
                reference: 'tree',
                xtype: 'navigation-tree'
            });
        }

        treeNav.getSelectionModel().select([
            refs['breadcrumb.toolbar'].getSelection()
        ]);

        breadcrumbNav.hide();
        refs.contentPanel.getHeader().show();

        this._hasTreeNav = true;
        this.getView().saveState();
    }
});
