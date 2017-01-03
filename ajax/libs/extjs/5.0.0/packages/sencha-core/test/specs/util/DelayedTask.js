describe("Ext.util.DelayedTask", function() {

    it('should delay the call', function() {
        var d,
            called = false;

        d = new Ext.util.DelayedTask(function() {
            called = true;
        });
        d.delay(100);
        
        // Immediately after the delay call, nothing has been executed
        expect(called).toBe(false);

        waits(150);
        runs(function() {
            // At 150ms, the 100ms delay should have been executed
            expect(called).toBe(true);
        });
    });

    it('should cancel any previous invocations', function() {
        var d,
            counter = 0,
            lastValue = 0,
            incr = function(value) {
                counter++;
                lastValue = value;
            };

        d = new Ext.util.DelayedTask(incr);
        d.delay(500, null, null, [1]);
        d.delay(1500, null, null, [2]);
        d.delay(2500, null, null, [3]);
        waits(1000);
        runs(function() {
            // At 1000 ms, no call should have been made. The 500ms delay should have been superceded
            expect(counter).toBe(0);
            expect(lastValue).toBe(0);
            waits(1000);
            runs(function() {
                // At 2000 ms, no call should have been made. The 1500ms delay should have been superceded
                expect(counter).toBe(0);
                expect(lastValue).toBe(0);
                waits(1000);
                runs(function() {
                    // At 3000 ms, one call should have been made. The 2500ms delay with a value of 3 should win
                    expect(counter).toBe(1);
                    expect(lastValue).toBe(3);
                });
            });
        });
    });

    it('should not cancel any previous invocations', function() {
        var d,
            counter = 0,
            lastValue,
            incr = function(value) {
                counter++;
                lastValue = value;
            };

        d = new Ext.util.DelayedTask(incr, null, null, false);
        d.delay(100, null, null, [1]);
        d.delay(150, null, null, [2]);
        d.delay(300, null, null, [3]);
        waits(150);
        runs(function() {
            // At 150 ms, the arguments from the last (300ms) delay call should have been used, but
            // the initial invocation delay of 100ms should have been allowed to execute because
            // of specifying cancelOnDelay as false.
            expect(counter).toBe(1);
            expect(lastValue).toBe(3);
            waits(100);
            runs(function() {
                // At 250 ms, no further calls should have been made.
                expect(counter).toBe(1);
                expect(lastValue).toBe(3);
                waits(100);
                runs(function() {
                    // At 350 ms, no further calls should have been made.
                    expect(counter).toBe(1);
                    expect(lastValue).toBe(3);
                });
            });
        });
    });
    
    it("should accept a delay of 0", function(){
        var called = true;
        var d = new Ext.util.DelayedTask(function() {
            called = true;    
        });
        d.delay(1000);
        d.delay(0);
        waits(50);
        runs(function(){
            // should fire almost straight away, will still be on a callback though
            // so we need at least some kind of delay
            expect(called).toBe(true);
        });
    })
});