xdescribe("Ext.data.Tree", function() {
    var tree, node, spy;

    beforeEach(function() {
        tree = new Ext.data.Tree();
        Ext.define('spec.Node', {
            extend: 'Ext.data.TreeModel',
            fields: [
                {name: 'text', type: 'string'}
            ],
            proxy: {
                type: 'memory'
            }
        })
        Ext.data.NodeInterface.decorate(spec.Node);
        node = new spec.Node({id: 42});
    });
    
    afterEach(function() {
        Ext.data.Model.schema.clear();
        Ext.undefine('spec.Node');
    });

    describe("instantiation", function() {
        it ("should mix in Ext.util.Observable", function() {
            expect(tree.mixins.observable).toBe(Ext.util.Observable.prototype);
        });
    });

    describe("methods", function() {
        
        describe("setting the root node", function() {
            beforeEach(function() {
                spy = spyOn(tree, "registerNode");
                tree.setRootNode(node);
            });
        
            describe("setRootNode", function() {
                it("should set the root node for the tree", function() {
                    expect(tree.root).toBe(node);
                });
        
                it("should set the node as root", function() {
                    expect(node.isRoot()).toBe(true); 
                });
        
                it ("should register node", function() {
                    expect(spy).toHaveBeenCalledWith(node, true);
                });
            });
        
            describe("getRootNode", function(){
                it("should return the root node", function() {
                    expect(tree.getRootNode()).toBe(node);
                });
            });
        });
        
        describe("registering and unregistering nodes", function() {
            beforeEach(function() {
                tree.setRootNode(node);
            });

            describe("register node", function() {
                it("should add node to nodeHash", function() {
                    var newNode = new spec.Node({id: 10});
                    tree.registerNode(newNode);
                    expect(tree.getNodeById(10)).toBe(newNode);  
                });
            });
        
            describe("unregisterNode", function() {
                it("should remove node from nodeHash", function() {
                    tree.registerNode(node);
                    tree.unregisterNode(node);
                    expect(tree.getNodeById(42)).not.toBeDefined(); 
                });
            });
        });

        describe("updating id in the node hash when a node's id changes", function() {
            beforeEach(function() {
                tree.setRootNode(node);
            });

            it("should update the node hash", function() {
                var oldId = node.getId();

                node.setId(9000);

                expect(tree.getNodeById(oldId)).toBeUndefined();
                expect(tree.getNodeById(9000)).toBe(node);
            });
        });

        describe('Nodes using a sequential idgen', function() {
            beforeEach(function() {
                Ext.define( 'spec.SequentialIdModel', {
                    extend: 'Ext.data.TreeModel',
                    idgen: {
                        type: 'sequential',
                        seed: 1000
                    },
                    fields: [{
                        name: 'id',
                        type: 'integer',
                        required: true,
                        label: 'Id'
                    }, {
                        name: 'text',
                        type: 'string',
                        required: true,
                        label: 'Text'
                    }]
                });
            });

            it('should register new nodes using sequential IDs starting at 1000', function() {
                var newNode = new spec.SequentialIdModel({});
                tree.setRootNode(newNode);
                expect(newNode.getId()).toBe(1000);
                expect(tree.getNodeById(1000) === newNode).toBe(true);
            });
        });

    });
});
