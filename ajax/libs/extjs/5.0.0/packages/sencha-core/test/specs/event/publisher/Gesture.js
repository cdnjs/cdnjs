describe("Ext.event.publisher.Gesture", function() {
    describe("removing the target el before a gesture is complete", function() {
        var GC = Ext.dom.GarbageCollector,
            helper = Ext.testHelper,
            interval = GC.interval,
            targetEl;

        beforeEach(function() {
            targetEl = Ext.getBody().createChild({
                id: 'gesture-target'
            });
            spyOn(targetEl, 'clearListeners');
            GC.interval = 60;
            GC.pause();
            GC.resume();
        });

        afterEach(function() {
            targetEl.destroy();
            GC.interval = interval;
            GC.pause();
            GC.resume();
        });

        function removeTarget() {
            document.body.removeChild(targetEl.dom);
        }

        function expectCollected(collected) {
            if (collected) {
                expect('gesture-target' in Ext.cache).toBe(false);
                expect(targetEl.clearListeners).toHaveBeenCalled();
            } else {
                expect('gesture-target' in Ext.cache).toBe(true);
                expect(targetEl.clearListeners).not.toHaveBeenCalled();
            }
        }

        it("should not garbage collect the target element until the current gesture is complete", function() {
            runs(function() {
                helper.touchStart(targetEl, { id: 1, x: 10, y: 10 });
                helper.touchMove(targetEl, { id: 1, x: 15, y: 15 });
                removeTarget();
            });

            waits(90);

            runs(function() {
                expectCollected(false);
                helper.touchEnd(Ext.supports.TouchEvents ? targetEl : document.body, { id: 1, x: 15, y: 15 });
            });

            waits(90);

            runs(function() {
                expectCollected(true);
            })
        });
    });
});
