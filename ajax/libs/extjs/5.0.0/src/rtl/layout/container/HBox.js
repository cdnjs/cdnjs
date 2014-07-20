Ext.define('Ext.rtl.layout.container.HBox', {
    override: 'Ext.layout.container.HBox',

    rtlNames: {
        beforeX: 'right',
        afterX: 'left',
        getScrollLeft: 'rtlGetScrollLeft',
        setScrollLeft: 'rtlSetScrollLeft',
        scrollTo: 'rtlScrollTo',
        beforeScrollerSuffix: '-after-scroller',
        afterScrollerSuffix: '-before-scroller'
    }
});