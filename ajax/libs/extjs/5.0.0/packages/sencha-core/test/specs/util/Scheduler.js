describe('Ext.util.Scheduler', function () {
    var scheduler,
        Item,
        log;
    var busy, idle;
    var sorts = 0;

    function setup () {
        setup = Ext.emptyFn;

        Item = Ext.define(null, {
            extend: Ext.util.Schedulable,

            constructor: function (name) {
                this.name = name;
                this.scheduler = scheduler;

                this.callParent();
            },

            react: function () {
                log.push(this.name);
            },

            privates: {
                sort: function () {
                    this.scheduler.sortItems(this.depends);
                }
            }
        });
    }

    beforeEach(function () {
        setup();

        scheduler = new Ext.util.Scheduler({
            listeners: {
                busy: function () {
                    ++busy;
                },
                idle: function () {
                    ++idle;
                }
            }
        });

        busy = idle = 0;

        var sort = scheduler.sort;

        scheduler.sort = function () {
            ++sorts;
            return sort.apply(this, arguments);
        };

        log = [];
        sorts = 0;
    });

    afterEach(function () {
        if (scheduler) {
            scheduler.destroy();
            scheduler = null;
        }
        expect(Ext.util.Scheduler.instances.length).toBe(0);
    });

    describe('ordering', function () {
        it('should order items only on first notification', function () {
            expect(sorts).toBe(0);

            var item1 = new Item('item1');
            var item2 = new Item('item2');

            item2.depends = [item1];
            scheduler.add(item2); // we add item2 then rely on its depends to get item1

            item1.schedule();
            item2.schedule();

            expect(sorts).toBe(0);
            scheduler.notify();

            expect(sorts).toBe(1);
            expect(log.join('/')).toBe('item1/item2');

            item1.schedule();
            scheduler.notify();  // no change to items so no sort

            expect(sorts).toBe(1);
            expect(log.join('/')).toBe('item1/item2/item1');
        });

        it('should react to only what was scheduled', function () {
            var item1 = new Item('item1');
            var item2 = new Item('item2');

            item2.depends = [item1];
            scheduler.add(item2); // we add item2 then rely on its depends to get item1

            item1.schedule();

            scheduler.notify();

            expect(log.join('/')).toBe('item1');

            item2.schedule();
            scheduler.notify();  // no change to items so no sort

            expect(sorts).toBe(1);
            expect(log.join('/')).toBe('item1/item2');
        });

        it('should reorder items if new items are added', function () {
            expect(sorts).toBe(0);

            var item1 = new Item('item1');
            var item2 = new Item('item2');

            item2.depends = [item1];
            scheduler.add(item2); // we add item2 then rely on its depends to get item1

            item1.schedule();
            item2.schedule();

            expect(sorts).toBe(0);
            scheduler.notify();

            expect(sorts).toBe(1);
            expect(log.join('/')).toBe('item1/item2');

            var item3 = new Item('item3');

            item1.depends = [item3];
            log.length = 0;

            item1.schedule();
            item2.schedule();
            item3.schedule();

            expect(sorts).toBe(1);

            scheduler.notify();  // no change and no sort

            expect(sorts).toBe(2);
            expect(log.join('/')).toBe('item3/item1/item2');
        });

        it('should detect dependency cycles', function () {
            var item1 = new Item('item1');
            var item2 = new Item('item2');

            item2.depends = [item1];
            item1.depends = [item2];

            scheduler.add(item2);

            item2.schedule();

            expect(function () {
                scheduler.notify();
            }).toThrow();
        });
    });

    describe('multiple pass notifications', function () {
        it('should trigger dependent items in single pass', function () {
            var item1 = new Item('item1');
            var item2 = new Item('item2');

            item2.depends = [item1];
            scheduler.add(item2); // we add item2 then rely on its depends to get item1

            item1.schedule();
            Ext.override(item1, {
                react: function () {
                    item2.schedule();
                    return this.callParent();
                }
            });

            expect(scheduler.passes).toBe(0);
            expect(sorts).toBe(0);
            scheduler.notify();

            expect(scheduler.passes).toBe(1);
            expect(sorts).toBe(1);
            expect(log.join('/')).toBe('item1/item2');

            // No changes...
            scheduler.notify();

            expect(scheduler.passes).toBe(1);
            expect(sorts).toBe(1);
            expect(log.join('/')).toBe('item1/item2');
        });

        it('should trigger anti-dependent items in two passes', function () {
            var item1 = new Item('item1');
            var item2 = new Item('item2');

            item2.depends = [item1];
            scheduler.add(item2); // we add item2 then rely on its depends to get item1

            item2.schedule();
            Ext.override(item2, {
                react: function () {
                    item1.schedule();
                    return this.callParent();
                }
            });

            expect(scheduler.passes).toBe(0);
            expect(sorts).toBe(0);
            scheduler.notify();

            expect(scheduler.passes).toBe(2);
            expect(sorts).toBe(1);
            expect(log.join('/')).toBe('item2/item1');

            // No changes...
            scheduler.notify();

            expect(scheduler.passes).toBe(2);
            expect(sorts).toBe(1);
            expect(log.join('/')).toBe('item2/item1');
        });

        it('should trigger self in two passes', function () {
            var item1 = new Item('item1');
            var item2 = new Item('item2');

            item2.depends = [item1];
            scheduler.add(item2); // we add item2 then rely on its depends to get item1

            item2.schedule();
            Ext.override(item2, {
                react: function () {
                    delete this.react;
                    item2.schedule();
                    return this.callParent();
                }
            });

            expect(scheduler.passes).toBe(0);
            expect(sorts).toBe(0);
            scheduler.notify();

            expect(scheduler.passes).toBe(2);
            expect(sorts).toBe(1);
            expect(log.join('/')).toBe('item2/item2');

            // No changes...
            scheduler.notify();

            expect(scheduler.passes).toBe(2);
            expect(sorts).toBe(1);
            expect(log.join('/')).toBe('item2/item2');
        });

        it('should limit number of cycles', function () {
            var item1 = new Item('A');
            var item2 = new Item('B');
            var limit = 100;

            item2.depends = [item1];
            scheduler.add(item2); // we add item2 then rely on its depends to get item1
            scheduler.setCycleLimit(4);

            item2.schedule();
            Ext.override(item2, {
                react: function () {
                    if (limit-- < 0) {
                        return;
                    }
                    item1.schedule();
                    return this.callParent();
                }
            });
            Ext.override(item1, {
                react: function () {
                    if (limit-- < 0) {
                        return;
                    }
                    item2.schedule();
                    return this.callParent();
                }
            });

            expect(scheduler.passes).toBe(0);
            expect(sorts).toBe(0);

            var exceeded;
            scheduler.onCycleLimitExceeded = function () {
                exceeded = true;
            };

            scheduler.notify();
            expect(exceeded).toBe(true);

            expect(scheduler.passes).toBe(4);
            expect(sorts).toBe(1);
            expect(log.join('')).toBe('BABABAB');

            // No changes... but will aborted early so we think there is work to do
            exceeded = false;
            scheduler.notify();
            expect(exceeded).toBe(true);

            expect(scheduler.passes).toBe(8);
            expect(sorts).toBe(1);
            expect(log.join('')).toBe('BABABABABABABAB');
        });
    });

    describe('busy / idle', function () {
        it('should fire nothing initially', function () {
            expect(busy).toBe(0);
            expect(idle).toBe(0);
            expect(scheduler.isBusy()).toBe(false);
            expect(scheduler.isIdle()).toBe(true);

            scheduler.notify();

            expect(busy).toBe(0);
            expect(idle).toBe(0);
            expect(scheduler.isBusy()).toBe(false);
            expect(scheduler.isIdle()).toBe(true);
        });

        it('should fire busy event', function () {
            expect(busy).toBe(0);
            expect(idle).toBe(0);

            scheduler.adjustBusy(1);

            expect(busy).toBe(1);
            expect(idle).toBe(0);
            expect(scheduler.isBusy()).toBe(true);
            expect(scheduler.isIdle()).toBe(false);
        });

        it('should not fire the idle event when busy', function () {
            expect(busy).toBe(0);
            expect(idle).toBe(0);

            scheduler.adjustBusy(1);

            expect(busy).toBe(1);
            expect(idle).toBe(0);

            scheduler.notify();

            expect(busy).toBe(1); // not twice
            expect(idle).toBe(0); // still busy
            expect(scheduler.isBusy()).toBe(true);
            expect(scheduler.isIdle()).toBe(false);

            scheduler.notify();

            expect(busy).toBe(1); // not twice
            expect(idle).toBe(0); // still busy
            expect(scheduler.isBusy()).toBe(true);
            expect(scheduler.isIdle()).toBe(false);
        });

        it('should fire idle event', function () {
            expect(busy).toBe(0);
            expect(idle).toBe(0);

            scheduler.adjustBusy(1);

            expect(busy).toBe(1);
            expect(idle).toBe(0);

            scheduler.adjustBusy(-1);

            expect(busy).toBe(1); // not twice
            expect(idle).toBe(0); // not yet

            for (var i = 0; i < 2; ++i) {
                scheduler.notify();

                expect(busy).toBe(1);
                expect(idle).toBe(1);  // just once please
                expect(scheduler.isBusy()).toBe(false);
                expect(scheduler.isIdle()).toBe(true);
            }
        });

        it('should wait to fire the idle event', function () {
            expect(busy).toBe(0);
            expect(idle).toBe(0);

            var item1 = new Item('A');

            Ext.override(item1, {
                react: function () {
                    scheduler.adjustBusy(1);
                    return this.callParent();
                }
            });

            item1.schedule();
            scheduler.notify();

            expect(busy).toBe(1);
            expect(idle).toBe(0);
            expect(scheduler.isBusy()).toBe(true);
            expect(scheduler.isIdle()).toBe(false);

            for (var i = 0; i < 2; ++i) {
                scheduler.adjustBusy(-1);  // would go idle
                item1.schedule();
                scheduler.notify(); // except item1 bounces back to 1

                expect(busy).toBe(1);
                expect(idle).toBe(0);
                expect(scheduler.isBusy()).toBe(true);
                expect(scheduler.isIdle()).toBe(false);

                scheduler.notify(); // no change

                expect(busy).toBe(1);
                expect(idle).toBe(0);
                expect(scheduler.isBusy()).toBe(true);
                expect(scheduler.isIdle()).toBe(false);
            }

            scheduler.adjustBusy(-1);
            scheduler.notify();

            expect(busy).toBe(1);
            expect(idle).toBe(1);  // now
            expect(scheduler.isBusy()).toBe(false);
            expect(scheduler.isIdle()).toBe(true);
        });
    });
});
