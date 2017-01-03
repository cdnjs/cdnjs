Ext.define('KitchenSink.view.ThemeSwitcher', function() {
    var theme = location.href.match(/theme=([\w-]+)/),
        locale = location.href.match(/locale=([\w-]+)/);

    theme = (theme && theme[1]) || (Ext.microloaderTags.desktop ? 'crisp' : 'crisp-touch');
    locale = locale && locale[1] || 'en';

    if (!Ext.themeName && !!theme) {
        var m = theme.match(/^([\w-]+)-(?:he)$/);
        Ext.themeName = m ? m[1] : theme;
    }

    return {
        extend: 'Ext.Container',
        xtype: 'themeSwitcher',
        id: 'theme-switcher-btn',
        margin: '0 10 0 0',
        layout: 'hbox',

        initComponent: function() {
            function setQueryParam(name, value) {
                var query = Ext.Object.fromQueryString(location.search);
                query[name] = value;
                location.search = Ext.Object.toQueryString(query);
            }

            function makeItem(value, text, paramName) {
                paramName = paramName || "theme";

                var checked = value === (paramName == "theme" ? theme : locale);

                return {
                    text: text,
                    group: (paramName == 'theme' ? 'themegroup' : 'localegroup'),
                    checked: checked,
                    handler: function () {
                        if (!checked) {
                            if(paramName == 'theme') {
                                setQueryParam('theme', value);
                            } else {
                                setQueryParam('locale', value);
                            }
                        }
                    }
                };
            }

            var menu = new Ext.menu.Menu({
                    items: [
                        makeItem('neptune',       'Neptune'),
                        makeItem('neptune-touch', 'Neptune Touch'),
                        makeItem('crisp',         'Crisp'),
                        makeItem('crisp-touch',   'Crisp Touch'),
                        makeItem('classic',       'Classic'),
                        makeItem('gray',          'Gray'),
                        '-',
                        makeItem('en',            'English',    'locale'),
                        makeItem('he',            'Hebrew',     'locale')
                    ]
                });

            this.items = [{
                    xtype: 'component',
                    id: 'theme-switcher',
                    cls: 'ks-theme-switcher',
                    margin: '0 5 0 0',
                    listeners: {
                        scope: this,
                        click: function (e) {
                            menu.showBy(this);
                        },
                        element: 'el'
                    }
                }];

            this.callParent();
        }
    };
});
