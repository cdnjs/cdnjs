xdescribe("Ext.Element.anim", function() {
    var el,
        todoIt = Ext.isSafari4 ? xit : it;
    
    beforeEach(function() {
        el = Ext.getBody().createChild({
            id: 'testElement'
        });
    });
    
    afterEach(function() {
        el.destroy();
    });
    
    describe("callbacks", function() {
        var callback, called, scope, actualScope;
        
        beforeEach(function() {
            called   = false;
            scope    = {};
            callback = jasmine.createSpy('callback').andCallFake(function() {
                called      = true;
                actualScope = this;
            });
        });
        
        afterEach(function() {
            actualScope = undefined;
        });

        describe("slideIn()", function() {
            beforeEach(function() {
                el.slideIn('t', {
                    duration: 10,
                    callback: callback,
                    scope: scope
                });
            });
            
            todoIt("should run callback", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(called).toBeTruthy();
                });
            });
            
            todoIt("should run callback in correct scope", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(actualScope).toBe(scope);
                });
            });
        });
        
        describe("slideOut()", function() {
            beforeEach(function() {
                el.slideOut('t', {
                    duration: 10,
                    callback: callback,
                    scope: scope
                });
            });
            
            todoIt("should run callback", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(called).toBeTruthy();
                });
            });
            
            todoIt("should run callback in correct scope", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(actualScope).toBe(scope);
                });
            });
        });
        
        describe("puff()", function() {
            beforeEach(function() {
                el.slideIn('t', {
                    duration: 10,
                    callback: callback,
                    scope: scope
                });
            });
            
            todoIt("should run callback", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(called).toBeTruthy();
                });
            });
            
            todoIt("should run callback in correct scope", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(actualScope).toBe(scope);
                });
            });
        });
        
        describe("switchOff()", function() {
            beforeEach(function() {
                el.switchOff({
                    duration: 10,
                    callback: callback,
                    scope: scope
                });
            });
            
            todoIt("should run callback", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(called).toBeTruthy();
                });
            });
            
            todoIt("should run callback in correct scope", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(actualScope).toBe(scope);
                });
            });
        });

        describe("frame()", function() {
            beforeEach(function() {
                el.frame('#ff0000', 1, {
                    duration: 10,
                    callback: callback,
                    scope: scope
                });
            });
            
            todoIt("should run callback", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(called).toBeTruthy();
                });
            });
            
            todoIt("should run callback in correct scope", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(actualScope).toBe(scope);
                });
            });
        });
        
        describe("ghost()", function() {
            beforeEach(function() {
                el.ghost('b', {
                    duration: 10,
                    callback: callback,
                    scope: scope
                });
            });
            
            todoIt("should run callback", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(called).toBeTruthy();
                });
            });
            
            todoIt("should run callback in correct scope", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(actualScope).toBe(scope);
                });
            });
        });
        
        describe("highlight()", function() {
            beforeEach(function() {
                el.highlight('#0000ff', {
                    duration: 10,
                    callback: callback,
                    scope: scope
                });
            });
            
            todoIt("should run callback", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(called).toBeTruthy();
                });
            });
            
            todoIt("should run callback in correct scope", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(actualScope).toBe(scope);
                });
            });
        });
        
        describe("fadeIn()", function() {
            beforeEach(function() {
                el.fadeIn({
                    duration: 10,
                    callback: callback,
                    scope: scope
                });
            });
            
            todoIt("should run callback", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(called).toBeTruthy();
                });
            });
            
            todoIt("should run callback in correct scope", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(actualScope).toBe(scope);
                });
            });
        });
        
        describe("fadeOut()", function() {
            beforeEach(function() {
                el.fadeOut({
                    duration: 10,
                    callback: callback,
                    scope: scope
                });
            });
            
            todoIt("should run callback", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(called).toBeTruthy();
                });
            });
            
            todoIt("should run callback in correct scope", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(actualScope).toBe(scope);
                });
            });
        });
        
        describe("scale()", function() {
            beforeEach(function() {
                el.scale(100, 100, {
                    duration: 10,
                    callback: callback,
                    scope: scope
                });
            });
            
            todoIt("should run callback", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(called).toBeTruthy();
                });
            });
            
            todoIt("should run callback in correct scope", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(actualScope).toBe(scope);
                });
            });
        });
        
        describe("shift()", function() {
            beforeEach(function() {
                el.shift({
                    x: 200,
                    y: 200,
                    duration: 10,
                    callback: callback,
                    scope: scope
                });
            });
            
            todoIt("should run callback", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(called).toBeTruthy();
                });
            });
            
            todoIt("should run callback in correct scope", function() {
                waitsFor(function() { return called; }, 1000, 'Callback to fire');
                
                runs(function() {
                    expect(actualScope).toBe(scope);
                });
            });
        });
    });
});
