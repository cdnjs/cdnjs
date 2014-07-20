// describe("Ext.event.gesture.Pinch", function () {});
// The above appeases Cmd's parser to associate spec run results with files.

(Ext.supports.Touch ? describe : xdescribe)("Ext.event.gesture.Pinch", function() {
    var helper = Ext.testHelper,
        targetEl, pinchstartHandler, pinchHandler, pinchendHandler, pinchcancelHandler,
        pinchstartEvent, pinchEvent, pinchendEvent, pinchcancelEvent;

    function start(cfg) {
        helper.touchStart(targetEl, cfg);
    }

    function move(cfg) {
        helper.touchMove(targetEl, cfg);
    }

    function end(cfg) {
        helper.touchEnd(targetEl, cfg);
    }

    function cancel(cfg) {
        helper.touchCancel(targetEl, cfg);
    }

    function expectInfo(e, info) {
        var name;

        for (name in info) {
            expect(e[name]).toBe(info[name]);
        }
    }

    function getDistance(x1, y1, x2, y2) {
        return new Ext.util.Point(x1, y1).getDistanceTo({ x: x2, y: y2 });
    }

    beforeEach(function() {
        targetEl = Ext.getBody().createChild({});
        pinchstartHandler = jasmine.createSpy();
        pinchHandler = jasmine.createSpy();
        pinchendHandler = jasmine.createSpy();
        pinchcancelHandler = jasmine.createSpy();

        pinchstartHandler.andCallFake(function(event) {
            pinchstartEvent = event;
        });

        pinchHandler.andCallFake(function(event) {
            pinchEvent = event;
        });

        pinchendHandler.andCallFake(function(event) {
            pinchendEvent = event;
        });

        pinchcancelHandler.andCallFake(function(event) {
            pinchendEvent = event;
        });

        targetEl.on('pinchstart', pinchstartHandler);
        targetEl.on('pinch', pinchHandler);
        targetEl.on('pinchend', pinchendHandler);
        targetEl.on('pinchcancel', pinchcancelHandler);
    });

    afterEach(function() {
        targetEl.destroy();
    });

    it("should fire pinchstart, pinch, and pinchend", function() {
        var distance, startDistance;
        runs(function() {
            start({ id: 1, x: 100, y: 102 });
            start({ id: 2, x: 200, y: 198 });
            move({ id: 1, x: 105, y: 103 });
        });

        waitsForAnimation();

        runs(function() {
            expect(pinchstartHandler).toHaveBeenCalled();
            startDistance = distance = getDistance(105, 103, 200, 198);
            expect(pinchstartEvent.distance).toBe(distance);
            expect(pinchstartEvent.scale).toBe(1);
            move({ id: 2, x: 195, y: 190 });
        });

        waitsForAnimation();

        runs(function() {
            distance = getDistance(105, 103, 195, 190);
            expect(pinchHandler.callCount).toBe(1);
            expect(pinchEvent.distance).toBe(distance);
            expect(pinchEvent.scale).toBe(distance / startDistance);

            move({ id: 1, x: 125, y: 133 });
        });

        waitsForAnimation();

        runs(function() {
            distance = getDistance(125, 133, 195, 190);
            expect(pinchHandler.callCount).toBe(2);
            expect(pinchEvent.distance).toBe(distance);
            expect(pinchEvent.scale).toBe(distance / startDistance);

            end({ id: 1, x: 125, y: 133 });
            end({ id: 2, x: 195, y: 190 });
        });

        waitsForAnimation();

        runs(function() {
            expect(pinchendHandler).toHaveBeenCalled();
        });
    });

    if (Ext.supports.Touch) {
        it("should fire pinchcancel and not pinchend if the first touch is canceled", function() {
            var distance, startDistance;
            runs(function() {
                start({ id: 1, x: 100, y: 102 });
                start({ id: 2, x: 200, y: 198 });
                move({ id: 1, x: 105, y: 103 });
            });

            waitsForAnimation();

            runs(function() {
                expect(pinchstartHandler).toHaveBeenCalled();
                startDistance = distance = getDistance(105, 103, 200, 198);
                expect(pinchstartEvent.distance).toBe(distance);
                expect(pinchstartEvent.scale).toBe(1);
                move({ id: 2, x: 195, y: 190 });
            });

            waitsForAnimation();

            runs(function() {
                distance = getDistance(105, 103, 195, 190);
                expect(pinchHandler.callCount).toBe(1);
                expect(pinchEvent.distance).toBe(distance);
                expect(pinchEvent.scale).toBe(distance / startDistance);

                cancel({ id: 1, x: 125, y: 133 });
                end({ id: 2, x: 195, y: 190 });
            });

            waitsForAnimation();

            runs(function() {
                expect(pinchcancelHandler).toHaveBeenCalled();
                expect(pinchendHandler).not.toHaveBeenCalled();
            });
        });

        it("should fire pinchcancel if the second touch is canceled", function() {
            var distance, startDistance;
            runs(function() {
                start({ id: 1, x: 100, y: 102 });
                start({ id: 2, x: 200, y: 198 });
                move({ id: 1, x: 105, y: 103 });
            });

            waitsForAnimation();

            runs(function() {
                expect(pinchstartHandler).toHaveBeenCalled();
                startDistance = distance = getDistance(105, 103, 200, 198);
                expect(pinchstartEvent.distance).toBe(distance);
                expect(pinchstartEvent.scale).toBe(1);
                move({ id: 2, x: 195, y: 190 });
            });

            waitsForAnimation();

            runs(function() {
                distance = getDistance(105, 103, 195, 190);
                expect(pinchHandler.callCount).toBe(1);
                expect(pinchEvent.distance).toBe(distance);
                expect(pinchEvent.scale).toBe(distance / startDistance);

                cancel({ id: 2, x: 195, y: 190 });
                end({ id: 1, x: 125, y: 133 });
            });

            waitsForAnimation();

            runs(function() {
                expect(pinchcancelHandler).toHaveBeenCalled();
                expect(pinchendHandler).not.toHaveBeenCalled();
            });
        });
    }
});
