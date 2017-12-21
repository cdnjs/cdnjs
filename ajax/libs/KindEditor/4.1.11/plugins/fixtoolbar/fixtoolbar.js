/**
 * Created by chenyihong on 14/12/4.
 */

KindEditor.plugin('fixtoolbar', function (K) {
    var self = this;
    if (!self.fixToolBar) {
        return;
    }

    function init() {
        var toolbar = K('.ke-toolbar');
        var originY = toolbar.pos().y;
        K(window).bind('scroll', function () {
            if (toolbar.css('position') == 'fixed') {
                if(document.body.scrollTop - originY < 0){
                    toolbar.css('position', 'static');
                    toolbar.css('top', 'auto');
                }
            } else {
                if (toolbar.pos().y - document.body.scrollTop < 0) {
                    toolbar.css('position', 'fixed');
                    toolbar.css('top', 0);
                }
            }
        });
    }

    if (self.isCreated) {
        init();
    } else {
        self.afterCreate(init);
    }

});
