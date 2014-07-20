if (Ext.supports.touchScroll) {
    describe('Ext.scroll.Scroller', function() {
        it('should fire the callback once after scrolling', function() {
            var called = 0,
                panel = new Ext.panel.Panel({
                    height: 100,
                    width: 100,
                    frame: true,
                    title: 'ScrollTest',
                    html: '<div style="height:500;width:100%">1<br>2<br>4<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br></div>',
                    renderTo: document.body,
                    autoScroll: true
                });

            panel.scrollTo(0, 50, {
                duration: 1,
                callback: function() {
                    called++;
                }
            });

            waitsFor(function () {
                return called;
            });
            runs(function() {
                expect(panel.getScrollY()).toBe(50);
                expect(called).toBe(1);
                panel.destroy();
            });
        });
    });
}