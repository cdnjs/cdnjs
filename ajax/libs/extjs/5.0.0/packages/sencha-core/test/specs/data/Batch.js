describe("Ext.data.Batch", function() {
    var batch, op1, op2, op3, ops;
    
    function makeOperation(type, cfg) {
        type = Ext.String.capitalize(type || 'create');
        var o = new Ext.data.operation[type](cfg);
        o.doExecute = function() {
            return new Ext.data.Request();
        };
        return o;
    }
    
    function makeBatch(cfg) {
        batch = new Ext.data.Batch(cfg);
    }
    
    afterEach(function() {
        batch = op1 = op2 = op3 = ops = null;
    });

    describe("instantiation", function() {
        beforeEach(function() {
            makeBatch();
        });

        it("should have current equal to null", function() {
            expect(batch.getCurrent()).toBeNull();
        });

        it("should have total equal to 0", function() {
            expect(batch.getTotal()).toBe(0);
        });

        it("should have isRunning equal to false", function() {
            expect(batch.isRunning()).toBe(false);
        });

        it("should have isComplete equal to false", function() {
            expect(batch.isComplete()).toBe(false);
        });

        it("should have hasException equal to false", function() {
            expect(batch.hasException()).toBe(false);
        });

        it("should have pauseOnException equal to false", function() {
            expect(batch.getPauseOnException()).toBe(false);
        });

        it("should have no operations", function() {
            expect(batch.getOperations()).toEqual([]);
        });
        
        it("should have no exceptions", function() {
            expect(batch.getExceptions()).toEqual([]);
        });
    });

    describe("add", function() {
        describe("single", function() {
            beforeEach(function() {
                op1 = makeOperation();
                makeBatch();
                batch.add(op1);
            });

            it("should increment total property", function() {
                expect(batch.getTotal()).toBe(1);
            });

            it("should set operation batch", function() {
                expect(op1.getBatch()).toBe(batch);
            });

            it("should add operation to operations array", function() {
                expect(batch.getOperations()[0]).toBe(op1);
            });
        });
        
        describe("arrays", function() {
            beforeEach(function() {
                op1 = makeOperation();
                op2 = makeOperation();
                op3 = makeOperation();
                ops = [op1, op2, op3];
                makeBatch();
                batch.add(ops);
            });
            
            it("should set the total", function() {
                expect(batch.getTotal()).toBe(3);
            });
            
            it("should set the batch on each operation", function() {
                expect(op1.getBatch()).toBe(batch);
                expect(op2.getBatch()).toBe(batch);
                expect(op3.getBatch()).toBe(batch);    
            });  
            
            it("should add them in order", function() {
                var items = batch.getOperations();
                expect(items[0]).toBe(op1);
                expect(items[1]).toBe(op2);
                expect(items[2]).toBe(op3);
            })
        });
    });

    describe("start", function() {
        beforeEach(function() {
            makeBatch();
        });
        
        it("should not run if there are no operations", function() {
            batch.start();
            expect(batch.isRunning()).toBe(false);    
        });

        it("should set isRunning to true", function() {
            batch.add(makeOperation());
            batch.start();
            expect(batch.isRunning()).toBe(true);
        });

        it("should execute the operation", function() {
            op1 = makeOperation();
            batch.add(op1);
            spyOn(op1, 'execute');
            batch.start();
            expect(op1.execute).toHaveBeenCalled();
        });
    });
    
    describe("running multiple operations", function() {
        
        beforeEach(function() {
            ops = [];
            for (var i = 1; i <= 4; ++i) {
                ops.push(makeOperation('destroy', {id: i}));
            }
            
            makeBatch();
            batch.add(ops);
        });
        
        describe("basic processing", function() {
            it("should execute in order", function() {
                var values = [];
                
                Ext.Array.forEach(ops, function(op) {
                    spyOn(op, 'execute').andCallFake(function() {
                        values.push(this.getId());
                        this.execute.originalValue.apply(this, arguments);
                        this.setSuccessful(true);
                    });    
                });
                
                batch.start();
                expect(values).toEqual([1, 2, 3, 4]);           
            });
            
            it("should wait until the previous operation completes before continuing", function() {
                var values = [];
                
                Ext.Array.forEach(ops, function(op) {
                    spyOn(op, 'execute').andCallFake(function() {
                        values.push(this.getId());
                        this.execute.originalValue.apply(this, arguments);
                    });    
                });
                
                batch.start();
                expect(values).toEqual([1]);
                ops[0].setSuccessful(true); 
                expect(values).toEqual([1, 2]);
                ops[1].setSuccessful(true); 
                expect(values).toEqual([1, 2, 3]);
                ops[2].setSuccessful(true);
                expect(values).toEqual([1, 2, 3, 4]); 
            });
            
            it("should be able to run an operation added during the batch start", function() {
                var other = makeOperation();
                spyOn(other, 'execute');
                
                batch.start();
                ops[0].setSuccessful(true);
                ops[1].setSuccessful(true);
                batch.add(other);
                ops[2].setSuccessful(true);
                ops[3].setSuccessful(true)
                
                expect(other.execute).toHaveBeenCalled();    
            });
            
            it("should keep track of exceptions and continue on", function() {
                batch.start();
                ops[0].setException('Failed1');
                ops[1].setSuccessful(true);
                ops[2].setSuccessful(true);
                ops[3].setException('Failed2');
                
                expect(batch.isComplete()).toBe(true);
                expect(batch.getExceptions()).toEqual([ops[0], ops[3]]);
            });
        });
        
        describe("events", function() {
            it("should fire the operationcomplete event when an operation completes", function() {
                var spy = jasmine.createSpy();
                batch.on('operationcomplete', spy);
                
                batch.start();
                ops[0].setSuccessful(true);
                expect(spy.mostRecentCall.args[0]).toBe(batch); 
                expect(spy.mostRecentCall.args[1]).toBe(ops[0]);
                ops[1].setSuccessful(true);
                expect(spy.mostRecentCall.args[0]).toBe(batch); 
                expect(spy.mostRecentCall.args[1]).toBe(ops[1]);    
            });
            
            it("should fire the complete event when we have completed", function() {
                var spy = jasmine.createSpy();
                batch.on('complete', spy);
                
                batch.start();
                Ext.Array.forEach(ops, function(op) {
                    op.setSuccessful(true);    
                });  
                expect(spy.mostRecentCall.args[0]).toBe(batch);
                expect(spy.mostRecentCall.args[1]).toBe(ops[3]);
            });
            
            it("should fire the exception event when an operation fails", function() {
                var spy = jasmine.createSpy();
                batch.on('exception', spy);
                
                batch.start();
                ops[0].setSuccessful(true);
                ops[1].setException('Failed1');
                expect(spy.mostRecentCall.args[0]).toBe(batch);
                expect(spy.mostRecentCall.args[1]).toBe(ops[1]);
                ops[2].setSuccessful(true);
                ops[3].setException('Failed2');
                expect(spy.mostRecentCall.args[0]).toBe(batch);
                expect(spy.mostRecentCall.args[1]).toBe(ops[3]);   
            });
        });  
        
    });
    
    describe("getCurrent", function() {
        beforeEach(function() {
            makeBatch();
        });    
        
        it("should return null if the batch has not started", function() {
            expect(batch.getCurrent()).toBeNull();
        });
        
        it("should return null if the batch is complete", function() {
            op1 = makeOperation();
            op2 = makeOperation();
            batch.add([op1, op2]);
            
            batch.start();
            op1.setSuccessful(true);
            op2.setSuccessful(true);
            expect(batch.getCurrent()).toBeNull();
        });
        
        it("should return the active operation", function() {
            op1 = makeOperation();
            op2 = makeOperation();
            batch.add([op1, op2]);
            
            batch.start();
            expect(batch.getCurrent()).toBe(op1);
            op1.setSuccessful(true);
            expect(batch.getCurrent()).toBe(op2);
            op2.setSuccessful(true);
        });
        
        it("should return the operation even if paused", function() {
            op1 = makeOperation();
            op2 = makeOperation();
            batch.add([op1, op2, makeOperation()]);
            
            batch.start();
            op1.setSuccessful(true);
            batch.pause();
            expect(batch.getCurrent()).toBe(op2);
        });
    });

    describe("pause", function() {
        it("should set isRunning to false", function() {
            makeBatch();
            batch.add(makeOperation());
            batch.start();
            batch.pause();
            expect(batch.isRunning()).toBe(false);
        });
        
        it("should not continue running if paused", function() {
            op1 = makeOperation();
            op2 = makeOperation();
            
            spyOn(op2, 'execute');
            
            makeBatch();
            batch.add(op1);
            batch.add(op2);
            
            batch.start();
            batch.pause();
            
            op1.setSuccessful(true);  
            expect(op2.execute).not.toHaveBeenCalled();  
        });
        
        it("should continue on after we start after pausing", function() {
            op1 = makeOperation();
            op2 = makeOperation();
            
            spyOn(op2, 'execute');
            
            makeBatch();
            batch.add(op1);
            batch.add(op2);
            
            batch.start();
            batch.pause();
            
            op1.setSuccessful(true);  
            batch.start();
            expect(op2.execute).toHaveBeenCalled();  
        });
    });
    
    describe("pauseOnException/retry", function() {
        beforeEach(function() {
            makeBatch({
                pauseOnException: true
            });
        });
        
        it("should pause if an operation has an exception", function() {
            op1 = makeOperation();
            batch.start();
            op1.setException('Failed');
            expect(batch.isRunning()).toBe(false);
        });
        
        it("should have the current item as the failed operation", function() {
            op1 = makeOperation();
            batch.add(op1);
            batch.start();
            op1.setException('Failed');
            expect(batch.getCurrent()).toBe(op1);
        });
        
        it("should be able to retry on exception", function() {
            op1 = makeOperation();
            batch.add(op1);
            batch.start();
            op1.setException('Failed');
            spyOn(op1, 'execute');
            batch.retry();
            expect(op1.execute).toHaveBeenCalled();    
        });
    });
});
