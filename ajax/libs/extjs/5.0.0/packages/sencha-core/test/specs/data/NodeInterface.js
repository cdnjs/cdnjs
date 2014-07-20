xdescribe('Ext.data.NodeInterface', function() {
    function spyOnEvent(object, eventName, fn) {
        var obj = {
            fn: fn || Ext.emptyFn
        },
        spy = spyOn(obj, "fn");
        object.addListener(eventName, obj.fn);
        return spy;
    }

    beforeEach(function() {
        Ext.define('spec.TreeNode', {
            extend: 'Ext.data.TreeModel',
            fields: [
                {name: 'text', type: 'string'}
            ],
            proxy: {
                type: 'memory'
            }
        });
    });

    afterEach(function() {
        Ext.undefine('spec.TreeNode');
        Ext.data.Model.schema.clear();
    });

    describe('decorating', function() {
        var fields;

        beforeEach(function() {
            fields = spec.TreeNode.prototype.fields;
        });

        it('should decorate the Model with a parentId field that has the same type as the idProperty', function() {
            var field = fields.get('parentId'),
                type = spec.TreeNode.prototype.fields.get(spec.TreeNode.prototype.idProperty).getType().type;

            expect(field.getPersist()).toBe(true);
            expect(field.getType().type).toBe(type);
            expect(field.getDefaultValue()).toBeNull();
        });
        it('should decorate the Model with an index field', function() {
            var field = fields.get('index');

            expect(field.getPersist()).toBe(false);
            expect(field.getType().type).toBe('int');
            expect(field.getDefaultValue()).toBe(-1);
        });
        it('should decorate the Model with a depth field', function() {
            var field = fields.get('depth');

            expect(field.getPersist()).toBe(false);
            expect(field.getType().type).toBe('int');
            expect(field.getDefaultValue()).toBe(0);
        });
        it('should decorate the Model with an expanded field', function() {
            var field = fields.get('expanded');

            expect(field.getPersist()).toBe(false);
            expect(field.getType().type).toBe('bool');
            expect(field.getDefaultValue()).toBe(false);
        });
        it('should decorate the Model with an expandable field', function() {
            var field = fields.get('expandable');

            expect(field.getPersist()).toBe(false);
            expect(field.getType().type).toBe('bool');
            expect(field.getDefaultValue()).toBe(true);
        });
        it('should decorate the Model with a checked field', function() {
            var field = fields.get('checked');

            expect(field.getPersist()).toBe(false);
            expect(field.getType().type).toBe('auto');
            expect(field.getDefaultValue()).toBe(null);
        });
        it('should decorate the Model with a leaf field', function() {
            var field = fields.get('leaf');

            expect(field.getPersist()).toBe(true);
            expect(field.getType().type).toBe('bool');
            expect(field.getDefaultValue()).toBe(false);
        });
        it('should decorate the Model with a cls field', function() {
            var field = fields.get('cls');

            expect(field.getPersist()).toBe(false);
            expect(field.getType().type).toBe('string');
            expect(field.getDefaultValue()).toBe('');
        });
        it('should decorate the Model with an iconCls field', function() {
            var field = fields.get('iconCls');

            expect(field.getPersist()).toBe(false);
            expect(field.getType().type).toBe('string');
            expect(field.getDefaultValue()).toBe('');
        });
        it('should decorate the Model with an icon field', function() {
            var field = fields.get('icon');

            expect(field.getPersist()).toBe(false);
            expect(field.getType().type).toBe('string');
            expect(field.getDefaultValue()).toBe('');
        });
        it('should decorate the Model with a root field', function() {
            var field = fields.get('root');

            expect(field.getPersist()).toBe(false);
            expect(field.getType().type).toBe('bool');
            expect(field.getDefaultValue()).toBe(false);
        });
        it('should decorate the Model with an isLast field', function() {
            var field = fields.get('isLast');

            expect(field.getPersist()).toBe(false);
            expect(field.getType().type).toBe('bool');
            expect(field.getDefaultValue()).toBe(false);
        });
        it('should decorate the Model with an isFirst field', function() {
            var field = fields.get('isFirst');

            expect(field.getPersist()).toBe(false);
            expect(field.getType().type).toBe('bool');
            expect(field.getDefaultValue()).toBe(false);
        });
        it('should decorate the Model with an allowDrop field', function() {
            var field = fields.get('allowDrop');

            expect(field.getPersist()).toBe(false);
            expect(field.getType().type).toBe('bool');
            expect(field.getDefaultValue()).toBe(true);
        });

        it('should decorate the Model with an allowDrag field', function() {
            var field = fields.get('allowDrag');

            expect(field.getPersist()).toBe(false);
            expect(field.getType().type).toBe('bool');
            expect(field.getDefaultValue()).toBe(true);
        });
        it('should decorate the Model with a loaded field', function() {
            var field = fields.get('loaded');

            expect(field.getPersist()).toBe(false);
            expect(field.getType().type).toBe('bool');
            expect(field.getDefaultValue()).toBe(false);
        });
        it('should decorate the Model with a loading field', function() {
            var field = fields.get('loading');

            expect(field.getPersist()).toBe(false);
            expect(field.getType().type).toBe('bool');
            expect(field.getDefaultValue()).toBe(false);
        });
        it('should decorate the Model with an href field', function() {
            var field = fields.get('href');

            expect(field.getPersist()).toBe(false);
            expect(field.getType().type).toBe('string');
            expect(field.getDefaultValue()).toBe('');
        });
        it('should decorate the Model with an hrefTarget field', function() {
            var field = fields.get('hrefTarget');

            expect(field.getPersist()).toBe(false);
            expect(field.getType().type).toBe('string');
            expect(field.getDefaultValue()).toBe('');
        });
        it('should decorate the Model with a qtip field', function() {
            var field = fields.get('qtip');

            expect(field.getPersist()).toBe(false);
            expect(field.getType().type).toBe('string');
            expect(field.getDefaultValue()).toBe('');
        });
        it('should decorate the Model with a qtitle field', function() {
            var field = fields.get('qtitle');

            expect(field.getPersist()).toBe(false);
            expect(field.getType().type).toBe('string');
            expect(field.getDefaultValue()).toBe('');
        });
        it('should decorate the Model with a children field', function() {
            var field = fields.get('children');

            expect(field.getPersist()).toBe(false);
            expect(field.getType().type).toBe('auto');
            expect(field.getDefaultValue()).toBe(null);
        });
        it('should decorate Model class of a given record', function() {
            var MyModel, record1, record2;
            MyModel = Ext.define('spec.MyModel', {
                extend: 'Ext.data.Model',
                fields: [
                    {name: 'text', type: 'string'}
                ],
                proxy: {
                    type: 'memory'
                }
            });
            record1 = MyModel.create({text: 'record1'});
            record2 = MyModel.create({text: 'record2'});
            expect(MyModel.prototype.isNode).toBeUndefined();
            expect(record1.isNode).toBeUndefined();
            expect(record2.isNode).toBeUndefined();
            
            Ext.data.NodeInterface.decorate(record1);
            expect(MyModel.prototype.isNode).toBeTruthy();
            expect(record1.isNode).toBeTruthy();
            expect(record2.isNode).toBeTruthy();

            Ext.undefine('spec.MyModel');
        });

    });


    describe('methods', function() {
        var leftChild, rightChild, rootNode, spareNode, spy;

        function insertDefaultChildren() {
            rootNode.appendChild(leftChild);
            rootNode.appendChild(rightChild);
            // call updateInfo because Ext.data.Tree does this in setRootNode()
            rootNode.updateInfo(false, {
                isFirst: true,
                isLast: true,
                depth: 0,
                index: 0,
                parentId: null
            });
        }

        beforeEach(function() {
            leftChild = new spec.TreeNode({
                id: 'left'
            });
        
            rightChild = new spec.TreeNode({
                id: 'right'
            });
        
            rootNode = new spec.TreeNode({
                id: 'root'
            });
        
            //we use this in several tests as an example node to add
            spareNode = new spec.TreeNode({
                id: 'spare'
            });

        });
        
        describe("isFirst", function() {
            beforeEach(function() {
                insertDefaultChildren.call(this);
            });
        
            it("should have rootNode which is first", function() {
                expect(rootNode.isFirst()).toBe(true);
            });
            it("should have leftChild which is first", function() {
                expect(leftChild.isFirst()).toBe(true);
            });
            it("should have rightChild which is not first", function() {
                expect(rightChild.isFirst()).toBe(false);
            });
        });

        describe("isLast", function() {
            beforeEach(function(){
                insertDefaultChildren.call(this);
            });
        
            it("should have rootNode which is last", function() {
                expect(rootNode.isLast()).toBe(true);
            });
            it("should have leftChild which is not last", function() {
                expect(leftChild.isLast()).toBe(false);
            });
            it("should have rightChild which is last", function() {
                expect(rightChild.isLast()).toBe(true);
            });
        });

        describe("hasChildNodes", function() {
            beforeEach(function() {
                rootNode.appendChild(leftChild);
            });
        
            it("should have rootNode with children", function() {
                expect(rootNode.hasChildNodes()).toBe(true);
            });
            it("should have leftChild whithout children", function() {
                expect(leftChild.hasChildNodes()).toBe(false);
            });
        });
        
        describe("isExpandable", function() {
            it("should have node expandable if it has children", function() {
               spareNode.appendChild(leftChild);
               expect(spareNode.isExpandable()).toBe(true);
            });
    
            it("should have node expandable if has no children", function() {
                expect(spareNode.isExpandable()).toBe(true);
            });               
            it("should have node not expandable if it is a leaf node", function() {
                spareNode.set('leaf', true);
                expect(spareNode.isExpandable()).toBe(false);
            });               
        });

        describe("append", function(){
            describe("appending children", function() {

                it('Tree should fire beforeappend when root set', function() {
                    var tree = new Ext.data.Tree(),
                        rootNode = new spec.TreeNode({
                            id: 'root'
                        });

                    spy = spyOnEvent(tree, "beforeappend").andCallThrough();
                    tree.setRootNode(rootNode);
                    expect(spy).toHaveBeenCalledWith(null, rootNode);
                });
                
                it("should fire beforeappend", function() {
                    spy = spyOnEvent(rootNode, "beforeappend").andCallThrough();
        
                    rootNode.appendChild(leftChild);
        
                    expect(spy).toHaveBeenCalledWith(rootNode, leftChild);
                });
        
                it("should cancel append if beforeappend return false", function() {
                    spy = spyOnEvent(rootNode, "beforeappend").andReturn(false);
                    expect(rootNode.appendChild(leftChild)).toBe(false);
        
                    expect(spy.callCount).toEqual(1);
                });
        
                it("should set firstChild", function() {
        
                    rootNode.appendChild(leftChild);
        
                    expect(rootNode.firstChild).toEqual(leftChild);
                });
        
                it("should set lastChild", function() {
        
                    rootNode.appendChild(leftChild);
        
                    expect(rootNode.lastChild).toEqual(leftChild);
                });
        
                it("should add node to childnodes", function() {
                    var childNodes;
        
                    rootNode.appendChild(leftChild);
        
                    childNodes = rootNode.childNodes;
        
                    expect(childNodes.length).toEqual(1);
                    expect(childNodes[0]).toEqual(leftChild);
                });
        
                it("should fire append event", function() {
                    spy = spyOnEvent(rootNode, "append").andCallThrough();
        
                    rootNode.appendChild(leftChild);
        
                    expect(spy).toHaveBeenCalledWith(rootNode, leftChild, 0);
                });
        
                it("should return node", function() {
                    var ret = rootNode.appendChild(leftChild);
        
                    expect(ret).toEqual(leftChild);
                });
        
                it("should append array of nodes", function() {
                    rootNode.appendChild([leftChild, rightChild]);
        
                    var childNodes = rootNode.childNodes;
        
                    expect(childNodes[0]).toEqual(leftChild);
                    expect(childNodes[1]).toEqual(rightChild);
                    expect(childNodes.length).toEqual(2);
                });
            });
        
            describe("appending with existing siblings", function() {
                beforeEach(function() {
                    insertDefaultChildren.call(this); 
                });
        
                it("should set next sibling", function() {
                    expect(leftChild.nextSibling).toEqual(rightChild);
                    expect(rightChild.nextSibling).toBeNull();
                });
        
                it("should set previous sibling", function() {
                    expect(rightChild.previousSibling).toEqual(leftChild);
                    expect(leftChild.previousSibling).toBeNull();
                });
            });
        
            describe("appending children from an existing node", function() {
                var oldParent, spy;
        
                beforeEach(function() {
                    oldParent = new spec.TreeNode({id: 'oldparent'});
                    oldParent.appendChild(spareNode);
                });
        
                it("should remove from existing node", function() {
                    spy = spyOn(oldParent, "removeChild").andCallThrough();
        
                    rootNode.appendChild(spareNode);
        
                    expect(spy).toHaveBeenCalledWith(spareNode, false, false, true);
                });
        
                it("should fire beforeremove event", function(){
                    spy = spyOnEvent(oldParent, "beforeremove").andCallThrough();
        
                    rootNode.appendChild(spareNode);
        
                    expect(spy).toHaveBeenCalledWith(oldParent, spareNode, true);
                });
        
                it("should fire remove event", function(){
                    spy = spyOnEvent(oldParent, "remove").andCallThrough();
        
                    rootNode.appendChild(spareNode);
        
                    expect(spy).toHaveBeenCalledWith(oldParent, spareNode, true);                    
                });

                it("should fire beforemove event", function() {
                    spy = spyOnEvent(spareNode, "beforemove").andCallThrough();
                    
                    rootNode.appendChild(spareNode);

                    expect(spy).toHaveBeenCalledWith(spareNode, oldParent, rootNode, 0);
                });
                it("should fire move event", function() {
                    spy = spyOnEvent(spareNode, "move").andCallThrough();
        
                    rootNode.appendChild(spareNode);
        
                    expect(spy).toHaveBeenCalledWith(spareNode, oldParent, rootNode, 0);                    
                });
            });
        });

        describe("insert", function(){
        
            beforeEach(function(){
                rootNode.appendChild(rightChild);
            });
        
            describe("inserting children", function() {
                it("should call appendChild if the node to insert before is null", function() {
                    spy = spyOn(rootNode, "appendChild");
        
                    rootNode.insertBefore(leftChild);
        
                    expect(spy).toHaveBeenCalledWith(leftChild);
                });
        
                it("should do nothing if the node to insert before is equal to the node to insert", function() {
                    expect(rootNode.insertBefore(leftChild, leftChild)).toBe(false);
                });
        
                it("should fire beforeinsert", function() {
                    spy = spyOnEvent(rootNode, "beforeinsert").andCallThrough();
        
                    rootNode.insertBefore(leftChild, rightChild);
        
                    expect(spy).toHaveBeenCalledWith(rootNode, leftChild, rightChild);                    
                });
        
                it("should cancel insert if beforeinsert return false", function() {
                    spy = spyOnEvent(rootNode, "beforeinsert").andReturn(false);
        
                    expect(rootNode.insertBefore(leftChild, rightChild)).toBe(false);
        
                    expect(spy.callCount).toEqual(1);
                });
        
                it("should set firstChild", function() {
                    rootNode.insertBefore(leftChild, rightChild);
        
                    expect(rootNode.firstChild).toEqual(leftChild);
                });
        
                it("should set lastChild", function() {
                    rootNode.insertBefore(leftChild, rightChild);
        
                    expect(rootNode.lastChild).toEqual(rightChild);
                });
        
                it("should fire insert", function() {
                    spy = spyOnEvent(rootNode, "insert").andCallThrough();
        
                    rootNode.insertBefore(leftChild, rightChild);
        
                    expect(spy).toHaveBeenCalledWith(rootNode, leftChild, rightChild);                    
                });
        
                it("should update indexes for all siblings after the position where the node was inserted", function() {
                    rootNode.insertBefore(spareNode, rightChild);

                    rootNode.insertBefore(leftChild, spareNode);

                    expect(spareNode.get('index')).toEqual(1);
                    expect(rightChild.get('index')).toEqual(2);
                });

        
                it("should handle siblings", function(){
                    expect(leftChild.previousSibling).toBeNull();
                    expect(leftChild.nextSibling).toBeNull();
                    expect(rightChild.previousSibling).toBeNull();
                    expect(rightChild.nextSibling).toBeNull();
        
                    rootNode.insertBefore(leftChild, rightChild);
        
                    expect(leftChild.previousSibling).toBeNull();
                    expect(leftChild.nextSibling).toEqual(rightChild);
                    expect(rightChild.previousSibling).toEqual(leftChild);
                    expect(rightChild.nextSibling).toBeNull();
                });
        
                describe("move", function() {
                    beforeEach(function() {
                        rootNode.appendChild(leftChild);
                    });
        
                    it("should fire beforemove", function() {
                        spy = spyOnEvent(leftChild, "beforemove").andCallThrough();
        
                        rootNode.insertBefore(leftChild, rightChild);
        
                        expect(spy).toHaveBeenCalledWith(leftChild, rootNode, rootNode, 0, rightChild);                    
                    });
        
                    it("should cancel insert if beforemove return false", function() {
                        spy = spyOnEvent(leftChild, "beforemove").andReturn(false);
        
                        expect(rootNode.insertBefore(leftChild, rightChild)).toBe(false);
        
                        expect(spy.callCount).toEqual(1);
                    });
        
                    it("should fire move", function() {
                        spy = spyOnEvent(leftChild, "move").andCallThrough();
        
                        rootNode.insertBefore(leftChild, rightChild);
        
                        expect(spy).toHaveBeenCalledWith(leftChild, rootNode, rootNode, 0, rightChild);                    
                    });                    
        
                });
            });
        });

        describe("removing children", function() {
            it("should return false when removing bad node", function(){
                expect(rootNode.removeChild(leftChild)).toBe(false); 
            });
        
            it("should fire beforeremove event", function(){
                insertDefaultChildren.call(this);
        
                spy = spyOnEvent(rootNode, "beforeremove").andCallThrough();
        
                rootNode.removeChild(leftChild);
        
                expect(spy).toHaveBeenCalledWith(rootNode, leftChild, false);
            });
        
            it("should cancel remove if beforeremove returns false", function() {
                insertDefaultChildren.call(this);
        
                spy = spyOnEvent(rootNode, "beforeremove").andReturn(false);
        
                expect(rootNode.removeChild(leftChild)).toBe(false);
        
                expect(spy.callCount).toEqual(1);
            });
        
            it("should fire remove event", function() {
                insertDefaultChildren.call(this);
        
                spy = spyOnEvent(rootNode, "remove").andCallThrough();
        
                rootNode.removeChild(leftChild);
        
                expect(spy).toHaveBeenCalledWith(rootNode, leftChild, false);
            });
        
            it("should remove child from childNodes", function() {
                var childNodes, count;
        
                insertDefaultChildren.call(this);
        
                childNodes = rootNode.childNodes;
                count = childNodes.length;
        
                rootNode.removeChild(leftChild);
        
                expect(childNodes.length).toEqual(count - 1);
                expect(childNodes[0]).toEqual(rightChild);
            });
        
            it("should manage siblings", function() {
                insertDefaultChildren.call(this);
        
                //this gives us a third child - 'right' is actually now center
                rootNode.appendChild(spareNode);
        
                rootNode.removeChild(rightChild);
        
                expect(leftChild.nextSibling, spareNode);
        
                expect(spareNode.previousSibling, leftChild);
            });
        
            it("should destroy node if asked", function() {
                insertDefaultChildren.call(this);
        
                spy = spyOn(leftChild, "destroy").andCallThrough();
        
                rootNode.removeChild(leftChild, true);
        
                expect(spy).toHaveBeenCalled();
            });
        
            it("should clear node if asked", function() {
                insertDefaultChildren.call(this);
        
                spy = spyOn(leftChild, "clear").andCallThrough();
        
                rootNode.removeChild(leftChild, false);
        
                expect(spy).toHaveBeenCalled();
            });            
            it("should update indexes for all siblings after the node's old position", function() {
                insertDefaultChildren.call(this);

                rootNode.appendChild(spareNode);

                rootNode.removeChild(leftChild);

                expect(rightChild.get('index')).toEqual(0);
                expect(spareNode.get('index')).toEqual(1);
            });
        });
        
        describe("clearing references", function() {
            beforeEach(function(){
                insertDefaultChildren.call(this);
                rootNode.appendChild(spareNode);
            });
        
            it("should nullify parentNode", function() {
               expect(rightChild.parentNode).not.toBeNull();
        
               rightChild.clear();
        
               expect(rightChild.parentNode).toBeNull();
            });
        
            it("should nullifies nextSibling", function() {
               expect(rightChild.nextSibling).not.toBeNull();
        
               rightChild.clear();
        
               expect(rightChild.nextSibling).toBeNull();
            });
        
            it("should nullifies previousSibling", function() {
               expect(rightChild.previousSibling).not.toBeNull();
        
               rightChild.clear();
        
               expect(rightChild.previousSibling).toBeNull();
            });
        
            it("should remove lastChild and firstChild references", function() {
                rightChild.clear(true);
        
                expect(rightChild.firstChild).toBeNull();
                expect(rightChild.lastChild).toBeNull();
            });
        });

        describe("item", function() {
            it("should return the child node at the specified index", function() {
                rootNode.appendChild(leftChild);
                rootNode.appendChild(rightChild);
                rootNode.appendChild(spareNode);
        
                expect(rootNode.getChildAt(0)).toEqual(leftChild);
                expect(rootNode.getChildAt(1)).toEqual(rightChild);
                expect(rootNode.getChildAt(2)).toEqual(spareNode);
            });
        });

        describe("silent destroy", function() {
            it("should purge node listeners", function() {
                spy = spyOn(leftChild, "clearListeners").andCallThrough();
        
                leftChild.destroy(true);
        
                expect(spy).toHaveBeenCalled();
            });
        
            it("should clear node", function() {
                spy = spyOn(leftChild, "clear").andCallThrough();
        
                leftChild.destroy(true);
        
                expect(spy).toHaveBeenCalled();
            });
        
            it("should destroy children", function() {
                var spy2;
        
                insertDefaultChildren.call(this);
        
                spy = spyOn(leftChild, "destroy").andCallThrough();
                spy2 = spyOn(rightChild, "destroy").andCallThrough();
        
                rootNode.destroy(true);
        
                expect(spy).toHaveBeenCalledWith(true);
                expect(spy2).toHaveBeenCalledWith(true);
            });
        
            it("should nullifies childNodes", function() {
                insertDefaultChildren.call(this);
        
                expect(rootNode.childNodes).not.toBeNull();
        
                rootNode.destroy(true);
        
                expect(rootNode.childNodes).toBeNull();
            });
        });

        describe("non-silent destroy", function() {
            it("should remove node", function() {
               insertDefaultChildren.call(this);
        
               spy = spyOn(leftChild, "remove").andCallThrough();
        
               leftChild.destroy(false);
        
               expect(spy).toHaveBeenCalled();
            });
        });
        
        describe("remove", function() {
            it("should remove from parent", function() {
                spy = spyOn(rootNode, "removeChild").andCallThrough();
        
                rootNode.appendChild(leftChild);
        
                leftChild.remove();
        
                expect(spy).toHaveBeenCalledWith(leftChild, undefined, undefined);
            });
        
            it("should return node", function() {
               expect(leftChild.remove()).toEqual(leftChild);
            });
        });
        
        describe("removeAll", function() {
            it("should remove all children", function() {
                rootNode.removeAll();
                expect(rootNode.childNodes.length).toEqual(0);
            });
        });

        describe("replacing children", function() {
            beforeEach(function() {
                insertDefaultChildren.call(this);
            });
        
            it("should keep the same childNodes length", function() {
                var count = rootNode.childNodes.length;
        
                rootNode.replaceChild(spareNode, leftChild);
        
                expect(rootNode.childNodes.length).toEqual(count);
            });
        
            it("should replace node", function() {
                rootNode.replaceChild(spareNode, leftChild);
        
                expect(rootNode.childNodes[0], spareNode);
            });
        });
        
        describe("getting depth", function() {
            beforeEach(function() {
                insertDefaultChildren.call(this);
                leftChild.appendChild(spareNode);
            });
        
            it("should have a depth of 0 for rootNode", function(){
                expect(rootNode.getDepth()).toEqual(0);
            });
        
            it("should have a depth of 1 for leftChild and rightChild", function(){
                expect(rightChild.getDepth()).toEqual(1);
                expect(leftChild.getDepth()).toEqual(1);
            });
        
            it("should have a depth of 2 for spareNode", function(){
                expect(spareNode.getDepth()).toEqual(2);                
            });
        });

        describe("setting ID", function() {
            var tree;
        
            beforeEach(function() {
                tree = new Ext.data.Tree();
                tree.setRootNode(rootNode);
            });
       
            it("should change id field", function() {
                rootNode.setId("yhwh");
        
                expect(rootNode.getId()).toEqual("yhwh");
                expect(rootNode.get('id')).toEqual("yhwh");
            });
        });

        describe("getting path", function() {
            beforeEach(function() {
                insertDefaultChildren.call(this);
                leftChild.appendChild(spareNode);
            });
        
            it("should set root path", function() {
                expect(rootNode.getPath()).toEqual("/root");
            });
        
            it("should set middle path", function() {
                expect(leftChild.getPath()).toEqual("/root/left");
                expect(rightChild.getPath()).toEqual("/root/right");
            });
        
            it("should set leaf path", function() {
                expect(spareNode.getPath()).toEqual("/root/left/spare");
            });
        });
        
        describe("indexOf", function(){
            it("should always return -1 when the node is empty", function(){
                expect(rootNode.indexOf(spareNode)).toBe(-1);
            });
            
            it("should return -1 when the passed node is not a child", function(){
                rootNode.appendChild(leftChild);
                expect(rootNode.indexOf(spareNode)).toBe(-1);    
            });
            
            it("should return the correct index when the node exists", function(){
                rootNode.appendChild([leftChild, spareNode, rightChild]);  
                expect(rootNode.indexOf(spareNode)).toBe(1);     
            });
        });
        
        describe("indexOfId", function(){
            it("should always return -1 when the node is empty", function(){
                expect(rootNode.indexOfId('spare')).toBe(-1);
            });
            
            it("should return -1 when the passed node is not a child", function(){
                rootNode.appendChild(leftChild);
                expect(rootNode.indexOfId('spare')).toBe(-1);    
            });
            
            it("should return the correct index when the node exists", function(){
                rootNode.appendChild([leftChild, spareNode, rightChild]);   
                expect(rootNode.indexOfId('spare')).toBe(1);      
            });
        });
        
        describe("bubbling", function() {
            var bubbleFn;
        
            beforeEach(function() {
                insertDefaultChildren.call(this);
                leftChild.appendChild(spareNode);
                bubbleFn = jasmine.createSpy();
            });
        
            it("should call bubbleFn 3 times", function() {
                spareNode.bubble(bubbleFn);
        
                expect(bubbleFn.callCount).toEqual(3);
            });
        
            it("should call bubbleFn with node spare, left, root", function() {
                spareNode.bubble(bubbleFn);
        
                expect(bubbleFn.calls[0].args).toEqual([spareNode]);
                expect(bubbleFn.calls[1].args).toEqual([leftChild]);
                expect(bubbleFn.calls[2].args).toEqual([rootNode]);
            });
        
            it("should call bubbleFn with a defined scope", function() {
                spareNode.bubble(bubbleFn, fakeScope);
        
                expect(bubbleFn.calls[0].object).toBe(fakeScope);
                expect(bubbleFn.calls[1].object).toBe(fakeScope);
                expect(bubbleFn.calls[2].object).toBe(fakeScope);
            });
        
            it("should call bubbleFn with customs arguments", function() {
                var customArgs = ['some', 'args'];
        
                spareNode.bubble(bubbleFn, spareNode, customArgs);
        
                expect(bubbleFn.calls[0].args).toEqual(customArgs);
                expect(bubbleFn.calls[1].args).toEqual(customArgs);
                expect(bubbleFn.calls[2].args).toEqual(customArgs);
            });
        
            it("should stop when bubbleFn return false", function() {
                bubbleFn.andCallFake(function(node) {
                    if (node.getId() == 'left') {
                        return false;
                    }
                });
        
                spareNode.bubble(bubbleFn);
        
                expect(bubbleFn.callCount).toEqual(2);
            });
        });
        
        describe("cascading", function() {
            var cascadeFn;
        
            beforeEach(function(){
               insertDefaultChildren.call(this);
               leftChild.appendChild(spareNode);
               cascadeFn = jasmine.createSpy();
            });
        
            it("should call cascadeFn 4 times", function() {
                rootNode.cascadeBy(cascadeFn);
        
                expect(cascadeFn.callCount).toEqual(4);
            });
        
            it("should call cascadeFn with node root, leftChild, spareNode, rightChild", function() {
                rootNode.cascadeBy(cascadeFn);
        
                expect(cascadeFn.calls[0].args).toEqual([rootNode]);
                expect(cascadeFn.calls[1].args).toEqual([leftChild]);
                expect(cascadeFn.calls[2].args).toEqual([spareNode]);
                expect(cascadeFn.calls[3].args).toEqual([rightChild]);
            });
        
            it("should call cascadeFn with a defined scope", function() {
                rootNode.cascadeBy(cascadeFn, fakeScope);
        
                expect(cascadeFn.calls[0].object).toBe(fakeScope);
                expect(cascadeFn.calls[1].object).toBe(fakeScope);
                expect(cascadeFn.calls[2].object).toBe(fakeScope);
                expect(cascadeFn.calls[3].object).toBe(fakeScope);
            });
        
            it("should call cascadeFn with customs arguments", function() {
                var customArgs = ['some', 'args'];
        
                rootNode.cascadeBy(cascadeFn, rootNode, customArgs);
        
                expect(cascadeFn.calls[0].args).toEqual(customArgs);
                expect(cascadeFn.calls[1].args).toEqual(customArgs);
                expect(cascadeFn.calls[2].args).toEqual(customArgs);
                expect(cascadeFn.calls[3].args).toEqual(customArgs);
            });
        
            it("should stop at end of branch when cascadeFn return false", function() {
                cascadeFn.andCallFake(function(node) {
                    if (node.getId() == 'left') {
                        return false;
                    }
                });
        
                rootNode.cascadeBy(cascadeFn);
        
                expect(cascadeFn.callCount).toEqual(3);
            });
        });

        describe("each child", function() {
            var eachFn;
        
            beforeEach(function (){
                insertDefaultChildren.call(this);
                eachFn = jasmine.createSpy();
            });
        
            it("should be called 2 times", function() {
        
                rootNode.eachChild(eachFn);
        
                expect(eachFn.callCount).toEqual(2);
            });
        
            it("should call eachFn with node root, leftChild, rightChild", function() {
                rootNode.eachChild(eachFn);
        
                expect(eachFn.calls[0].args).toEqual([leftChild]);
                expect(eachFn.calls[1].args).toEqual([rightChild]);
            });
        
            it("should call eachFn with a defined scope", function() {
                rootNode.eachChild(eachFn, fakeScope);
        
                expect(eachFn.calls[0].object).toBe(fakeScope);
                expect(eachFn.calls[1].object).toBe(fakeScope);
            });
        
            it("should call eachFn with customs arguments", function() {
                var customArgs = ['some', 'args'];
        
                rootNode.eachChild(eachFn, rootNode, customArgs);
        
                expect(eachFn.calls[0].args).toEqual(customArgs);
                expect(eachFn.calls[1].args).toEqual(customArgs);
            });
        
            it("should stop when eachFn return false", function() {
                eachFn.andCallFake(function(node) {
                    if (node.getId() == 'left') {
                        return false;
                    }
                });
        
                rootNode.eachChild(eachFn);
        
                expect(eachFn.callCount).toEqual(1);
            });
        });
        
        describe("ancestors", function() {
            beforeEach(function (){
                insertDefaultChildren.call(this);
                leftChild.appendChild(spareNode);
            });
        
            it("should have parent as ancestor", function() {
                expect(spareNode.isAncestor(leftChild)).toBe(true);
            });
        
            it("should have root as ancestor", function() {
                expect(spareNode.isAncestor(rootNode)).toBe(true);
            });
        
            it("should not have uncle as ancestor", function() {
                expect(spareNode.isAncestor(rightChild)).toBe(false);
            });            
        });
        
        describe("contains", function() {
            beforeEach(function (){
                insertDefaultChildren.call(this);
                leftChild.appendChild(spareNode);
            });
        
            it("should contain child", function() {
                expect(rootNode.contains(leftChild)).toBe(true);
            });
        
            it("should contain grand child", function() {
                expect(rootNode.contains(spareNode)).toBe(true);
            });
        
            it("should not contain parent", function() {
                expect(spareNode.contains(leftChild)).toBe(false);
            });            
        });

        describe("finding children", function() {
            beforeEach(function (){
                insertDefaultChildren.call(this);
                leftChild.appendChild(spareNode);
            });
        
            describe("findChild", function() {
                it("should find shallow children", function() {
                    expect(rootNode.findChild('id', 'left')).toEqual(leftChild);
                });
        
                it("should not find deep children if deep is not specified", function() {
                    expect(rootNode.findChild('id', 'spare')).toBeNull();
                });
        
                it("should not find deep children if deep is false", function() {
                    expect(rootNode.findChild('id', 'spare', false)).toBeNull();
                });
        
                it("should find deep children if deep is true", function() {
                    expect(rootNode.findChild('id', 'spare', true)).toEqual(spareNode);
                });                
            });
        
            describe("findChildBy", function() {
                var child;
        
                it("should find shallow children", function(){
                    child = rootNode.findChildBy(function(node) {
                        return node.getId() == 'right';
                    });
        
                    expect(child).toEqual(rightChild);
                });
        
                it("should not find deep children if deep is not specified", function(){
                    child = rootNode.findChildBy(function(node) {
                        return node.getId() == 'spare';
                    });
        
                    expect(child).toBeNull();
                });
        
                it("should not find deep children if deep is false", function(){
                    child = rootNode.findChildBy(function(node) {
                        return node.getId() == 'spare';
                    }, this, false);
        
                    expect(child).toBeNull();
                });
        
                it("should find deep children if deep is true", function(){
                    child = rootNode.findChildBy(function(node) {
                        return node.getId() == 'spare';
                    }, this, true);
        
                    expect(child).toEqual(spareNode);
                });
        
                it("should call function with good scope", function(){
                    var findChildFn = jasmine.createSpy().andReturn(false);
        
                    child = rootNode.findChildBy(findChildFn, fakeScope, true);
        
                    expect(findChildFn.calls[0].object).toBe(fakeScope);
                    expect(findChildFn.calls[1].object).toBe(fakeScope);
                    expect(findChildFn.calls[2].object).toBe(fakeScope);  
                });
            });
        });
        
        describe("sort", function() {
            var node1,
                node2,
                node3,
                node4,
                sortFn;
        
            beforeEach(function() {
                Ext.define('spec.EmployeeTreeNode', {
                    extend: 'Ext.data.Model',
                    fields: [
                        { name: 'lastname', type: 'string' },
                        { name: 'firstname', type: 'string' }
                    ]
                });
                Ext.data.NodeInterface.decorate(spec.EmployeeTreeNode);
                node1 = new spec.EmployeeTreeNode({lastname: "Avins", firstname: "Jamie"});
                node2 = new spec.EmployeeTreeNode({lastname: "Dougan", firstname: "Robert"});
                node3 = new spec.EmployeeTreeNode({lastname: "Ferrero", firstname: "Nicolas"});
                node4 = new spec.EmployeeTreeNode({lastname: "Spencer", firstname: "Edward"});
        
                rootNode.appendChild([node4, node2, node3, node1]);
        
                sortFn = jasmine.createSpy();
                sortFn.andCallFake(function(a, b){
                    if (a.get('lastname') ===  b.get('lastname')) {
                        return 0;
                    }
                    return (a.get('lastname') < b.get('lastname')) ? -1 : 1;
                });
        
                rootNode.sort(sortFn);
            });
            afterEach(function() {
                Ext.undefine('spec.EmployeeTreeNode');
            });
        
            it("should sort the child by lastname with the correct function", function() {
                expect(rootNode.childNodes[0]).toEqual(node1);
                expect(rootNode.childNodes[1]).toEqual(node2);
                expect(rootNode.childNodes[2]).toEqual(node3);
                expect(rootNode.childNodes[3]).toEqual(node4);
            });
        
        });
        
        describe("copy", function(){
            it("should not copy childNodes by default", function(){
                var node = new spec.TreeNode({
                    text: 'Text',
                    id: 1
                });

                var newNode = node.copy();
                
                expect(newNode.getData()).toEqual({
                    allowDrag: true,
                    allowDrop: true,
                    checked: null,
                    children: null,
                    cls: '',
                    depth: 0,
                    expandable: true,
                    expanded: false,
                    href: '',
                    hrefTarget: '',
                    icon: '',
                    iconCls: '',
                    id: 1,
                    index: -1,
                    isFirst: false,
                    isLast: false,
                    leaf: false,
                    loaded: false,
                    loading: false,
                    parentId: null,
                    qtip: '',
                    qtitle: '',
                    qshowDelay: 0,
                    root: false,
                    text: 'Text',
                    visible: true
                });
            });
            
            it("should accept a new id", function(){
                var node = new spec.TreeNode({
                    text: 'Text',
                    id: 1
                });
                
                var newNode = node.copy(2);
                
                expect(newNode.getData()).toEqual({
                    allowDrag: true,
                    allowDrop: true,
                    checked: null,
                    children: null,
                    cls: '',
                    depth: 0,
                    expandable: true,
                    expanded: false,
                    href: '',
                    hrefTarget: '',
                    icon: '',
                    iconCls: '',
                    id: 2,
                    index: -1,
                    isFirst: false,
                    isLast: false,
                    leaf: false,
                    loaded: false,
                    loading: false,
                    parentId: null,
                    qtip: '',
                    qtitle: '',
                    qshowDelay: 0,
                    root: false,
                    text: 'Text',
                    visible: true
                });
            });
            
            it("should clone children if deep: true is specified", function(){
                var root = new spec.TreeNode({
                    id: 1,
                    text: 'Root'
                });    
                var child1 = root.appendChild(new spec.TreeNode({
                    id: 2,
                    text: 'Child1'
                }));
                var child2 = child1.appendChild(new spec.TreeNode({
                    id: 3,
                    text: 'Child2'
                }));
                child2.appendChild(new spec.TreeNode({
                    id: 4,
                    text: 'Child3'
                }));
                
                var newNode = root.copy(undefined, true);
                expect(newNode.childNodes[0].getId()).toBe(2);
                expect(newNode.childNodes[0].get('text')).toBe('Child1');
                
                newNode = newNode.childNodes[0];
                expect(newNode.childNodes[0].getId()).toBe(3);
                expect(newNode.childNodes[0].get('text')).toBe('Child2');
                
                newNode = newNode.childNodes[0];
                expect(newNode.childNodes[0].getId()).toBe(4);
                expect(newNode.childNodes[0].get('text')).toBe('Child3');
            });
        });
        
    });
    
    describe("serialize", function(){
        it("should not include children if there are none", function(){
            var o = new spec.TreeNode({
                text: 'foo'
            }),  s = o.serialize();
                
            expect(s.text).toBe('foo')
            expect(s.children).toBeUndefined();
        });
        
        it("should include children if they exist", function(){
            var o = new spec.TreeNode({
                text: 'foo'
            }), s;
            
            o.appendChild(new spec.TreeNode({
                text: 'bar'
            }));
                
            s = o.serialize();
            expect(s.text).toBe('foo')
            expect(s.children[0].text).toBe('bar');
        });  
    });
    
    describe("collapse", function() {
        it("should fire the collapse callback when there are no child nodes", function() {
            var root = new spec.TreeNode(),
                called;
                
            root.collapseChildren(false, function() {
                called = true;
            });
            expect(called).toBe(true);
            root = null;
        });  
    });

    describe("modified property tracking", function() {
        // Tests for https://sencha.jira.com/browse/EXTJSIV-9223 and https://sencha.jira.com/browse/EXTJSIV-9165
        it("should track modifications of fields set as a result of node movement", function() {

            // Create a TreeNode subclass in which the index property is persistent.
            Ext.define('spec.PersistentIndexTreeNode', {
                extend: 'Ext.data.TreeModel',
                fields: [
                    {name: 'text', type: 'string'},
                    {name: 'index', type: 'int', persist: true, defaultValue: -1}
                ],
                proxy: {
                    type: 'memory'
                }
            });

            var root = new spec.PersistentIndexTreeNode({
                id: 'TestRoot'
            }),
            root1 = new spec.PersistentIndexTreeNode({
                id: 'OtherTestRoot'
            }),
            node = new spec.PersistentIndexTreeNode({
                id: 'node'
            }),
            node1;
            root.appendChild(node);

            // The modified shows that parentId was changed *from* null.
            // And the index was changed from -1 (not attached) to 0
            expect(node.modified).toEqual({
                index: -1,
                parentId: null
            });

            // Clears modified
            node.commit();
            expect(node.modified).toEqual({});

            // Move from parent "TestRoot", index 0 to parent "OtherTestRoot", index 0
            // Index should appear in modified object because it has moved parent
            root1.appendChild(node);
            expect(node.modified).toEqual({
                parentId: 'TestRoot',
                index: 0
            });

            // Clears modified
            node.commit();

            // Should clear the parentId, so the modified now indicates that it was removed from index 0 of "OtherTestRoot"
            // removeChild does NOT clear context data properties.
            // Mainly because TreeStore.clearRemovedOnLoad uses these values to determine whether
            // nodes in the removed list are descendants of a loading node so that tey can be evicted from the removed list.
            root1.removeChild(node);
            expect(node.modified).toEqual({});

            node = new spec.PersistentIndexTreeNode({
                id: 'node'
            });
            node1 = new spec.PersistentIndexTreeNode({
                id: 'node1'
            });
            root.clear();
            root.appendChild([node, node1]);

            expect([node.get('index'), node1.get('index')]).toEqual([0, 1]);
            node.commit();
            node1.commit();

            // Move node1 to index:0
            root.insertBefore(node1, node);

            // Indexes data values are switched
            expect([node1.get('index'), node.get('index')]).toEqual([0, 1]);

            // node1 must report that its index was modified from initial value 1
            expect(node1.modified).toEqual({
                index: 1
            });

            // node must report that its index was modified from initial value 0
            expect(node.modified).toEqual({
                index: 0
            });

            root1.appendChild(node1);

            Ext.undefine('spec.PersistentIndexTreeNode');
        });
    });
});
