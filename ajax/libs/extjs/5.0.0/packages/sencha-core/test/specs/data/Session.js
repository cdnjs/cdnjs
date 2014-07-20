describe("Ext.data.Session", function() {
    function completeRequest(data, requestId) {
        Ext.Ajax.mockComplete({
            status: 200,
            responseText: Ext.encode(data)
        }, requestId);
    }

    var session;

    function idSort(a, b) {
        if (Ext.isObject(a)) {
            a = a.id;
            b = b.id;
        }
        return a - b;
    }

    var adminGroup, peonGroup;
    var rufusGroups, billGroups, tedGroups;
    var adminUsers, peonUsers;
    var userRufus, userBill, userTed;

    beforeEach(function() {
        adminGroup = {
            id: 42,
            name: 'Admins'
        };
        peonGroup = {
            id: 427,
            name: 'Peons'
        };
        userRufus = {
            id: 10,
            name: 'Rufus'
        };
        userBill = {
            id: 20,
            name: 'Bill'
        };
        userTed = {
            id: 30,
            name: 'Ted'
        };

        rufusGroups = [ adminGroup, peonGroup ];
        billGroups = [ peonGroup ];
        tedGroups = [ peonGroup ];

        adminUsers = [ userRufus ];
        peonUsers = [ userBill, userTed, userRufus ];
    });

    function getAndComplete(type, id, theSession, data) {
        theSession = theSession || session;
        data = data || {};
        var rec = theSession.getRecord(type, id);
        data.id = data.id || id;
        completeRequest(data);
        return rec;
    }

    beforeEach(function() {
        MockAjaxManager.addMethods();
    });

    afterEach(function() {
        MockAjaxManager.removeMethods();
        Ext.destroy(session);
        session = null;
    });

    describe("record access", function() {
        var User, parent, rec;
        beforeEach(function() {
            Ext.data.Model.schema.setNamespace('spec');
            User = Ext.define('spec.User', {
                extend: 'Ext.data.Model',
                fields: ['name', {
                    name: 'addressId',
                    reference: 'Address',
                    unique: true
                }],
                manyToMany: 'Group'
            });
            parent = new Ext.data.Session();
            session = new Ext.data.Session();
        });

        afterEach(function() {
            parent.destroy();
            User = rec = parent = null;
            Ext.undefine('spec.User');
            Ext.data.Model.schema.clear(true);
        });

        describe("adopt", function() {
            it("should cache the record into the session", function() {
                rec = new User({
                    id: 1
                });
                session.adopt(rec);
                expect(session.peekRecord('User', 1)).toBe(rec);
            });

            it("should put the session on the record", function() {
                rec = new User({
                    id: 1
                });
                session.adopt(rec);
                expect(rec.session).toBe(session);
            });

            it("should not throw an error if a record already in the session is adopted", function() {
                rec = getAndComplete('User', 1);
                expect(function() {
                    session.adopt(rec);
                }).not.toThrow();
            });

            describe("invalid conditions", function() {
                it("should not allow phantom records", function() {
                    rec = new User();
                    expect(function() {
                        session.adopt(rec);
                    }).toThrow();
                });

                it("should not allow a record attached to another session", function() {
                    var other = new Ext.data.Session(),
                        rec = getAndComplete('User', 1, other);

                    expect(function() {
                        session.adopt(rec);
                    }).toThrow();
                    other.destroy();
                });

                it("should raise an error if add a model the schema does not know about", function() {
                    var customSchema = new Ext.data.schema.Schema();
                    Ext.define('spec.CustomModel', {
                        extend: 'Ext.data.Model',
                        schema: customSchema
                    });

                    rec = new spec.CustomModel({
                        id: 1
                    });
                    expect(function() {
                        session.adopt(rec);
                    }).toThrow();
                });

                it("should raise an error if adding an existing record", function() {
                    rec = getAndComplete('User', 1);
                    expect(function() {
                        session.adopt(new User({
                            id: 1
                        }));
                    }).toThrow();
                });
            });
        });

        describe("createRecord", function() {
            it("should accept the entity name", function() {
                rec = session.createRecord('User', {
                    name: 'Foo'
                });
                expect(rec.$className).toBe('spec.User');
                expect(rec.get('name')).toBe('Foo');
            });

            it("should accept the entity class", function() {
                rec = session.createRecord(spec.User, {
                    name: 'Foo'
                });
                expect(rec.$className).toBe('spec.User');
                expect(rec.get('name')).toBe('Foo');
            });

            it("should throw an exception with an unrecognized model name", function() {
                expect(function() {
                    session.createRecord('Luser', {});
                }).toThrow();
            });

            it("should throw an exception creating an anonymous model", function() {
                var Model = Ext.define(null, {
                    extend: 'Ext.data.Model',
                    fields: ['name']
                });

                expect(function() {
                    session.createRecord(Model, {});
                }).toThrow();
            });

            it("should cache the record in the session", function() {
                rec = session.createRecord('User', {
                });
                expect(session.getRecord('User', rec.getId())).toBe(rec);
            });

            it("should set the session on the instance", function() {
                rec = session.createRecord('User', {
                });
                expect(rec.session).toBe(session);
            });

            it("should throw an exception if the record exists in the session", function() {
                getAndComplete('User', 1);
                expect(function() {
                    rec = session.createRecord('User', {
                        id: 1
                    }).toThrow();
                });
            });

            describe("with a parent", function() {
                beforeEach(function() {
                    session.setParent(parent);
                });

                it("should not create the record in the parent session", function() {
                    getAndComplete('User', 1);
                    expect(parent.peekRecord('User', 1)).toBeNull();
                });

                it("should raise an exception if the record exists in the parent", function() {
                    getAndComplete('User', 1, parent);
                    expect(function() {
                        session.createRecord('User', {
                            id: 1
                        });
                    }).toThrow();
                });
            });
        });

        describe("getRecord", function() {
            it("should throw an exception with an unrecognized model name", function() {
                expect(function() {
                    session.getRecord('Luser', 1);
                }).toThrow();
            });

            it("should throw an exception creating an anonymous model", function() {
                var Model = Ext.define(null, {
                    extend: 'Ext.data.Model',
                    fields: ['name']
                });

                expect(function() {
                    session.getRecord(Model, 1);
                }).toThrow();
            });

            describe("with no record", function() {
                it("should accept the entity name", function() {
                    rec = session.getRecord('User', 1);
                    expect(rec.getId()).toBe(1);
                    expect(rec.$className).toBe('spec.User');
                });

                it("should accept the entity class", function() {
                    rec = session.getRecord(spec.User, 1);
                    expect(rec.getId()).toBe(1);
                    expect(rec.$className).toBe('spec.User');
                });

                it("should create a new record and track it in the session", function() {
                    rec = session.getRecord('User', 1);
                    expect(session.peekRecord('User', 1)).toBe(rec);
                });

                it("should set the session on the record", function() {
                    rec = session.getRecord('User', 1);
                    expect(rec.session).toBe(session);
                });

                describe("autoLoad", function() {
                    it("should autoLoad by default", function() {
                        var spy = spyOn(spec.User.getProxy(), 'read');
                        session.getRecord('User', 1);
                        expect(spy).toHaveBeenCalled();
                    });

                    it("should not autoLoad when passed: false", function() {
                        var spy = spyOn(spec.User.getProxy(), 'read');
                        session.getRecord('User', 1, false);
                        expect(spy).not.toHaveBeenCalled();
                    });

                    it("should pass parameters to load", function() {
                        var spy = spyOn(spec.User.getProxy(), 'read');
                        session.getRecord('User', 1, {
                            params: {
                                someId: 1
                            }
                        });
                        expect(spy.mostRecentCall.args[0].getParams()).toEqual({
                            someId: 1
                        });
                    });
                });

                describe("with parent session", function() {
                    beforeEach(function() {
                        session.setParent(parent);
                    });

                    describe("record exists in the parent", function() {
                        beforeEach(function() {
                            rec = getAndComplete('User', 1, parent, {name: 'Foo'});
                        });

                        it("should return an existing record from the parent", function() {
                            var child = session.getRecord('User', 1);
                            expect(child.get('name')).toBe('Foo');
                            expect(child.$className).toBe('spec.User');
                        });

                        it("should return a copy, not the same instance", function() {
                            var child = session.getRecord('User', 1);
                            expect(child).not.toBe(rec);
                        });

                        it("should set the session to be the child session", function() {
                            var child = session.getRecord('User', 1);
                            expect(child.session).toBe(session);
                        });

                        it("should not trigger a load", function() {
                            var spy = spyOn(spec.User.getProxy(), 'read');

                            session.getRecord('User', 1);
                            expect(spy).not.toHaveBeenCalled();
                        });

                        it("should not update the parent record when the child changes", function() {
                            var child = session.getRecord('User', 1);
                            child.set('name', 'Bar');
                            expect(rec.get('name')).toBe('Foo');
                        });

                        it("should not update the child record when the parent changes", function() {
                            var child = session.getRecord('User', 1);
                            rec.set('name', 'Bar');
                            expect(child.get('name')).toBe('Foo');
                        });

                        it("should not copy the record if the parent is loading", function() {
                            rec = parent.getRecord('User', 2);
                            var child = session.getRecord('User', 2);

                            completeRequest({name: 'Foo'});
                            expect(rec.get('name')).toBe('Foo');
                            expect(child.isLoading()).toBe(true);
                            expect(child.get('name')).toBeUndefined();

                        });
                    });

                    describe("record does not exist in the parent", function() {
                        it("should create an instance", function() {
                            rec = session.getRecord('User', 1);
                            expect(rec.getId()).toBe(1);
                            expect(rec.$className).toBe('spec.User');
                        });

                        it("not push the instance into the parent", function() {
                            session.getRecord('User', 1);
                            expect(parent.peekRecord('User', 1)).toBeNull();
                        });
                    });
                });
            });

            describe("with an existing record", function() {
                beforeEach(function() {
                    rec = getAndComplete('User', 1);
                });

                it("should accept the entity name", function() {
                    expect(session.getRecord('User', 1)).toBe(rec);
                });

                it("should accept the entity class", function() {
                    expect(session.getRecord(spec.User, 1)).toBe(rec);
                });

                it("should return the existing record", function() {
                    expect(session.getRecord('User', 1)).toBe(rec);
                });

                it("should not attempt to load the record", function() {
                    var spy = spyOn(spec.User.getProxy(), 'read');
                    session.getRecord('User', 1);
                    expect(spy).not.toHaveBeenCalled();
                });
            });
        });

        describe("peekRecord", function() {
            beforeEach(function() {
                rec = getAndComplete('User', 1);
            });

            it("should accept the entity name", function() {
                expect(session.peekRecord('User', 1)).toBe(rec);
            });

            it("should accept the entity class", function() {
                expect(session.peekRecord(spec.User, 1)).toBe(rec);
            });

            it("should throw an exception with an unrecognized model name", function() {
                expect(function() {
                    session.peekRecord('Luser', 1);
                }).toThrow();
            });

            it("should throw an exception creating an anonymous model", function() {
                var Model = Ext.define(null, {
                    extend: 'Ext.data.Model',
                    fields: ['name']
                });

                expect(function() {
                    session.peekRecord(Model, 1);
                }).toThrow();
            });

            it("should return the model instance", function() {
                var result = session.peekRecord('User', 1);
                expect(result.isModel).toBe(true);
                expect(result).toBe(rec);
            });

            it("should return null if the record does not exist", function() {
                expect(session.peekRecord('User', 12)).toBeNull();
            });

            describe("parent", function() {
                it("should not return a record from a parent without deep=true", function() {
                    session.setParent(parent);
                    getAndComplete('User', 2, parent);
                    expect(session.peekRecord('User', 2)).toBeNull();
                });

                it("should find a record in the parent session if we pass deep=true", function() {
                    session.setParent(parent);
                    rec = getAndComplete('User', 2, parent);
                    expect(session.peekRecord('User', 2, true)).toBe(rec);
                });

                it("should favour a record in the child", function() {
                    session.setParent(parent);
                    getAndComplete('User', 2, parent);
                    rec = session.getRecord('User', 2);
                    expect(session.peekRecord('User', 2, true)).toBe(rec);
                });

                it("should not consider a parent if we pass deep=true and there is no parent", function() {
                    expect(session.peekRecord('User', 1000, true)).toBeNull();
                });
            });
        });

        describe("associations", function() {
            describe("many to one", function() {
                beforeEach(function() {
                    Ext.define('spec.Post', {
                        extend: 'Ext.data.Model',
                        fields: ['content', {
                            name: 'userId',
                            reference: 'User'
                        }]
                    });
                });

                function makePost(id, userId, data) {
                    data = data || {};
                    data.id = id;
                    data.userId = userId;
                    return getAndComplete('Post', id, session, data);
                }

                function makeUser(id, data) {
                    data = data || {};
                    data.id = id;
                    return getAndComplete('User', id, session, data);
                }

                afterEach(function() {
                    Ext.undefine('spec.Post');
                });

                describe("the one", function() {
                    it("should use an existing record instance from the session", function() {
                        var user = makeUser(1),
                            post = makePost(17, 1);

                        expect(post.getUser()).toBe(user);
                    });

                    it("should not trigger a load when the record instance exists", function() {
                        var user = makeUser(1),
                            post = makePost(17, 1),
                            spy = spyOn(spec.User.getProxy(), 'read');

                        post.getUser();
                        expect(spy).not.toHaveBeenCalled();
                    });

                    it("should request an instance it needs and put it in the session", function() {
                        var post = makePost(17, 1),
                            user = post.getUser();

                        completeRequest({
                            id: 1
                        });
                        expect(session.getRecord('User', 1)).toBe(user);
                    });
                });

                describe("the many", function() {
                    var user;
                    beforeEach(function() {
                        user = makeUser(1);
                    });

                    afterEach(function() {
                        user = null;
                    });

                    it("should be empty by default and not complete", function() {
                        var posts = user.posts();
                        expect(posts.getCount()).toBe(0);
                        expect(posts.complete).toBe(false);
                    });

                    it("should not trigger a load", function() {
                        var spy = spyOn(spec.Post.getProxy(), 'read');
                        user.posts();
                        expect(spy).not.toHaveBeenCalled();
                    });

                    it("should create records on loading", function() {
                        var posts = user.posts();
                        posts.load();
                        completeRequest([{id: 101, userId: 1}, {id: 102, userId: 1}, {id: 103, userId: 1}]);
                        expect(posts.getAt(0)).toBe(session.peekRecord('Post', 101));
                        expect(posts.getAt(1)).toBe(session.peekRecord('Post', 102));
                        expect(posts.getAt(2)).toBe(session.peekRecord('Post', 103));
                    });

                    it("should set the complete flag on loading", function() {
                        var posts = user.posts();
                        posts.load();
                        completeRequest([]);
                        expect(posts.complete).toBe(true);
                    });

                    describe("local modifications", function() {
                        it("should add items with a matching foreign key on creation, but not be complete", function() {
                            // post1 & post3 exist in the session with a matching FK, as soon as the
                            // store is spun up they should exist in the store
                            var post1 = makePost(101, 1),
                                post3 = makePost(103, 1),
                                posts = user.posts();

                            expect(posts.getCount()).toBe(2);
                            expect(posts.getAt(0)).toBe(post1);
                            expect(posts.getAt(1)).toBe(post3);
                            expect(posts.complete).toBe(false);
                        });

                        it("should respect the server order when loading with existing items", function() {
                            // Although we have the records, maintain the order the server sent.
                            var post1 = makePost(101, 1),
                                post2 = makePost(102, 1),
                                post3 = makePost(103, 1),
                                posts = user.posts();

                            posts.load();
                            completeRequest([{id: 103, userId: 1}, {id: 102, userId: 1}, {id: 101, userId: 1}]);

                            expect(posts.getAt(0)).toBe(post3);
                            expect(posts.getAt(1)).toBe(post2);
                            expect(posts.getAt(2)).toBe(post1);
                        });

                        it("should add matching FK items to the end when loading", function() {
                            // We have a record with a matching key before the store is created.
                            // Once we load the store we should include it in the active set
                            var post2 = makePost(102, 1),
                                posts = user.posts();

                            posts.load();
                            completeRequest([{id: 103, userId: 1}, {id: 101, userId: 1}]);
                            expect(posts.getAt(0)).toBe(session.peekRecord('Post', 103));
                            expect(posts.getAt(1)).toBe(session.peekRecord('Post', 101));
                            expect(posts.getAt(2)).toBe(session.peekRecord('Post', 102));
                        });

                        it("should remove no-longer matching FK items when loading", function() {
                            // We had a record with a matching key which was subsequently changed.
                            // Reject it from the server load since the local copy is correct.
                            var post2 = makePost(102, 1);
                            post2.set('userId', null);

                            var posts = user.posts();
                            posts.load();
                            completeRequest([{id: 101, userId: 1}, {id: 102, userId: 1}, {id: 103, userId: 1}]);
                            expect(posts.getCount()).toBe(2);
                            expect(posts.getAt(0)).toBe(session.peekRecord('Post', 101));
                            expect(posts.getAt(1)).toBe(session.peekRecord('Post', 103));
                        });
                    });
                });
            });

            describe("one to one", function() {
                beforeEach(function() {
                    Ext.define('spec.Address', {
                        extend: 'Ext.data.Model',
                        fields: ['city']
                    });
                });

                function makeAddress(id, data) {
                    data = data || {};
                    data.id = id;
                    return getAndComplete('Address', id, session, data);
                }

                function makeUser(id, addressId, data) {
                    data = data || {};
                    data.id = id;
                    data.addressId = addressId;
                    return getAndComplete('User', id, session, data);
                }

                afterEach(function() {
                    Ext.undefine('spec.Address');
                });

                describe("the key holder", function() {
                    it("should use an existing record instance from the session", function() {
                        var address = makeAddress(1),
                            user = makeUser(17, 1);

                        expect(user.getAddress()).toBe(address);
                    });

                    it("should not trigger a load when the record instance exists", function() {
                        var address = makeAddress(1),
                            user = makeUser(17, 1),
                            spy = spyOn(spec.User.getProxy(), 'read');

                        user.getAddress();
                        expect(spy).not.toHaveBeenCalled();
                    });

                    it("should request an instance it needs and put it in the session", function() {
                        var user = makeUser(17, 1),
                            address = user.getAddress();

                        completeRequest({
                            id: 1
                        });
                        expect(session.getRecord('Address', 1)).toBe(address);
                    });
                });
            });

            describe("many to many", function() {
                beforeEach(function() {
                    Ext.define('spec.Group', {
                        extend: 'Ext.data.Model',
                        fields: ['name']
                    });
                });

                function makeUser(id) {
                    return getAndComplete('User', id, session);
                }

                function makeGroup(id) {
                    return getAndComplete('Group', id, session);
                }

                afterEach(function() {
                    Ext.undefine('spec.Group');
                });

                describe("the left", function() {
                    var user;
                    beforeEach(function() {
                        user = makeUser(1);
                    });

                    afterEach(function() {
                        user = null;
                    });

                    it("should be empty by default and not complete", function() {
                        var groups = user.groups();
                        expect(groups.getCount()).toBe(0);
                        expect(groups.complete).toBe(false);
                    });

                    it("should not trigger a load", function() {
                        var spy = spyOn(spec.Group.getProxy(), 'read');
                        user.groups();
                        expect(spy).not.toHaveBeenCalled();
                    });

                    it("should create records on loading", function() {
                        var groups = user.groups();
                        groups.load();
                        completeRequest([{id: 101}, {id: 102}, {id: 103}]);
                        expect(groups.getAt(0)).toBe(session.peekRecord('Group', 101));
                        expect(groups.getAt(1)).toBe(session.peekRecord('Group', 102));
                        expect(groups.getAt(2)).toBe(session.peekRecord('Group', 103));
                    });

                    it("should set the complete flag on loading", function() {
                        var groups = user.groups();
                        groups.load();
                        completeRequest([]);
                        expect(groups.complete).toBe(true);
                    });

                    describe("local modifications", function() {
                        it("should respect the load order when loading with existing items", function() {
                            var group2 = makeGroup(102),
                                groups = user.groups();

                            groups.add(group2);
                            groups.load();
                            completeRequest([{id: 103}, {id: 102}, {id: 101}]);

                            expect(groups.getAt(0)).toBe(session.peekRecord('Group', 103));
                            expect(groups.getAt(1)).toBe(group2);
                            expect(groups.getAt(2)).toBe(session.peekRecord('Group', 101));
                        });

                        it("should add matching FK items to the end when loading", function() {
                            var group2 = makeGroup(102),
                                groups = user.groups();

                            groups.add(group2);
                            groups.load();
                            completeRequest([{id: 103}, {id: 101}]);
                            expect(groups.getAt(0)).toBe(session.peekRecord('Group', 103));
                            expect(groups.getAt(1)).toBe(session.peekRecord('Group', 101));
                            expect(groups.getAt(2)).toBe(group2);
                        });
                    });
                });

                describe("the right", function() {
                    var group;
                    beforeEach(function() {
                        group = makeGroup(1);
                    });

                    afterEach(function() {
                        group = null;
                    });

                    it("should be empty by default and not complete", function() {
                        var users = group.users();
                        expect(users.getCount()).toBe(0);
                        expect(users.complete).toBe(false);
                    });

                    it("should not trigger a load", function() {
                        var spy = spyOn(spec.User.getProxy(), 'read');
                        group.users();
                        expect(spy).not.toHaveBeenCalled();
                    });

                    it("should create records on loading", function() {
                        var users = group.users();
                        users.load();
                        completeRequest([{id: 101}, {id: 102}, {id: 103}]);
                        expect(users.getAt(0)).toBe(session.peekRecord('User', 101));
                        expect(users.getAt(1)).toBe(session.peekRecord('User', 102));
                        expect(users.getAt(2)).toBe(session.peekRecord('User', 103));
                    });

                    it("should set the complete flag on loading", function() {
                        var users = group.users();
                        users.load();
                        completeRequest([]);
                        expect(users.complete).toBe(true);
                    });

                    describe("local modifications", function() {
                        it("should respect the load order when loading with existing items", function() {
                            var user2 = makeUser(102),
                                users = group.users();

                            users.add(user2);
                            users.load();
                            completeRequest([{id: 103}, {id: 102}, {id: 101}]);

                            expect(users.getAt(0)).toBe(session.peekRecord('User', 103));
                            expect(users.getAt(1)).toBe(user2);
                            expect(users.getAt(2)).toBe(session.peekRecord('User', 101));
                        });

                        it("should add matching FK items to the end when loading", function() {
                            var user2 = makeUser(102),
                                users = group.users();

                            users.add(user2);
                            users.load();
                            completeRequest([{id: 103}, {id: 101}]);
                            expect(users.getAt(0)).toBe(session.peekRecord('User', 103));
                            expect(users.getAt(1)).toBe(session.peekRecord('User', 101));
                            expect(users.getAt(2)).toBe(user2);
                        });
                    });
                });
            });
        });
    });

    describe("getChanges", function() {
        var User;

        beforeEach(function() {
            Ext.data.Model.schema.setNamespace('spec');
            session = new Ext.data.Session();

            User = Ext.define('spec.User', {
                extend: 'Ext.data.Model',
                fields: ['id', 'name', 'age', {
                    name: 'addressId',
                    reference: 'Address',
                    unique: true
                }],
                manyToMany: '#Group'
            });

            Ext.define('spec.Group', {
                extend: 'Ext.data.Model',
                fields: ['name']
            });

            Ext.define('spec.Address', {
                extend: 'Ext.data.Model',
                fields: ['city']
            });

            Ext.define('spec.Post', {
                extend: 'Ext.data.Model',
                fields: ['content', {
                    name: 'userId',
                    reference: 'User'
                }]
            })
        });

        afterEach(function() {
            Ext.undefine('spec.User');
            Ext.undefine('spec.Address');
            Ext.undefine('spec.Post');
            Ext.undefine('spec.Group');
            Ext.data.Model.schema.clear(true);
            User = null;
        });

        describe("basic operations", function() {
            describe("create", function() {
                it("should include a phantom record", function() {
                    var user = session.createRecord('User', {
                        name: 'Foo',
                        age: 34
                    });
                    expect(session.getChanges()).toEqual({
                        User: {
                            C: [{
                                id: user.getId(),
                                name: 'Foo',
                                age: 34
                            }]
                        }
                    });
                });

                it("should include the updated record state", function() {
                    var user = session.createRecord('User', {
                        name: 'Foo',
                        age: 34
                    });
                    user.set('name', 'Bar');
                    user.set('age', 5000);
                    expect(session.getChanges()).toEqual({
                        User: {
                            C: [{
                                id: user.getId(),
                                name: 'Bar',
                                age: 5000
                            }]
                        }
                    });
                });

                it("should be able to create multiple records", function() {
                    var user1 = session.createRecord('User'),
                        user2 = session.createRecord('User'),
                        user3 = session.createRecord('User');

                    expect(session.getChanges()).toEqual({
                        User: {
                            C: [{id: user1.getId()}, {id: user2.getId()}, {id: user3.getId()}]
                        }
                    });
                });

                it("should not include non-phantoms", function() {
                    var user = getAndComplete('User', 1);
                    expect(session.getChanges()).toBeNull();
                });

                it("should not include phantom records that are dropped", function() {
                    var user = session.createRecord('User');
                    user.drop();
                    expect(session.getChanges()).toBeNull();
                });
            });

            describe("update", function() {
                it("should include the updated record", function() {
                    var user = getAndComplete('User', 1);
                    user.set('name', 'Foo');
                    expect(session.getChanges()).toEqual({
                        User: {
                            U: [{
                                id: 1,
                                name: 'Foo'
                            }]
                        }
                    });
                });

                it("should include the most recently updated state", function() {
                    var user = getAndComplete('User', 1);
                    user.set('name', 'Foo');
                    user.set('name', 'Bar');
                    user.set('name', 'Baz');
                    expect(session.getChanges()).toEqual({
                        User: {
                            U: [{
                                id: 1,
                                name: 'Baz'
                            }]
                        }
                    });
                });

                it("should be able to update many records", function() {
                    var user1 = getAndComplete('User', 1),
                        user2 = getAndComplete('User', 2),
                        user3 = getAndComplete('User', 3);

                    user1.set('name', 'Foo');
                    user2.set('name', 'Bar');
                    user3.set('name', 'Baz');

                    expect(session.getChanges()).toEqual({
                        User: {
                            U: [{
                                id: 1,
                                name: 'Foo'
                            }, {
                                id: 2,
                                name: 'Bar'
                            }, {
                                id: 3,
                                name: 'Baz'
                            }]
                        }
                    });
                });

                it("should not include a non-dirty record", function() {
                    var user = getAndComplete('User', 1);
                    user.set('name', 'Foo');
                    user.commit();
                    expect(session.getChanges()).toBeNull();
                });

                it("should not include a dropped record", function() {
                    var user = getAndComplete('User', 1);
                    user.set('name', 'Foo');
                    user.drop();
                    expect(session.getChanges().User.U).toBeUndefined();
                });

                it("should not include changes to phantoms", function() {
                    var user = session.createRecord('User');
                    user.set('name', 'Foo');
                    expect(session.getChanges().User.U).toBeUndefined();
                });
            });

            describe("drop", function() {
                it("should include dropped records", function() {
                    var user = getAndComplete('User', 1);
                    user.drop();
                    expect(session.getChanges()).toEqual({
                        User: {
                            D: [1]
                        }
                    });
                });

                it("should drop multiple records", function() {
                    var user1 = getAndComplete('User', 1),
                        user2 = getAndComplete('User', 2);
                        user3 = getAndComplete('User', 3);

                    user1.drop();
                    user2.drop();
                    user3.drop();
                    expect(session.getChanges()).toEqual({
                        User: {
                            D: [1, 2, 3]
                        }
                    });
                });

                it("should not include phantom records", function() {
                    var user = session.createRecord('User');
                    user.drop();
                    expect(session.getChanges()).toBeNull();
                });
            });
        });

        describe("associations", function() {
            describe("one to one", function() {
                var user, address;
                beforeEach(function() {
                    user = getAndComplete('User', 1, session, {
                        addressId: 17
                    });
                    address = user.getAddress();
                    getAndComplete('Address', 17);
                });

                afterEach(function() {
                    user = address = null;
                });

                it("should not include any changes when loading an association", function() {
                    expect(session.getChanges()).toBeNull();
                });

                it("should not include extraneous records when changing the key", function() {
                    user.setAddress(3);
                    expect(session.getChanges()).toEqual({
                        User: {
                            U: [{
                                id: 1,
                                addressId: 3
                            }]
                        }
                    })
                });

                it("should read the non key holder when nulling out a reference", function() {
                    user.setAddress(null);
                    expect(session.getChanges()).toEqual({
                        User: {
                            U: [{
                                id: 1,
                                addressId: null
                            }]
                        }
                    })
                });
            });

            describe("many to one", function() {
                var user, posts;

                beforeEach(function() {
                    user = getAndComplete('User', 1);
                    posts = user.posts();
                    posts.load();
                    completeRequest([{id: 101, userId: 1}, {id: 102, userId: 1}, {id: 103, userId: 1}]);
                });

                afterEach(function() {
                    user = posts = null;
                });

                it("should not include any read records", function() {
                    expect(session.getChanges()).toBeNull();
                });

                it("should push store removals as updates", function() {
                    posts.removeAt(0);
                    expect(session.getChanges()).toEqual({
                        Post: {
                            U: [{
                                id: 101,
                                userId: null
                            }]
                        }
                    });
                });

                it("should push store adds as updates", function() {
                    var post = getAndComplete('Post', 104);
                    posts.add(post);
                    expect(session.getChanges()).toEqual({
                        Post: {
                            U: [{
                                id: 104,
                                userId: 1
                            }]
                        }
                    });
                });

                it("should push store adds of phantoms as creates", function() {
                    var post = session.createRecord('Post');
                    posts.add(post);
                    expect(session.getChanges()).toEqual({
                        Post: {
                            C: [{
                                id: post.getId(),
                                userId: 1
                            }]
                        }
                    })
                });
            });

            describe("many to many", function() {
                describe("via store modifications", function() {
                    var user, groups;

                    beforeEach(function() {
                        user = getAndComplete('User', 1);
                        groups = user.groups();
                    });

                    afterEach(function() {
                        user = groups = null;
                    });

                    describe("store not loaded", function() {
                        it("should include local adds", function() {
                            var group1 = getAndComplete('Group', 101);
                            groups.add(group1);
                            expect(session.getChanges()).toEqual({
                                User: {
                                    groups: {
                                        C: {
                                            1: [101]
                                        }
                                    }
                                }
                            });
                        });

                        it("should include local phantom adds and a create", function() {
                            var group = session.createRecord('Group'),
                                id = group.getId();

                            groups.add(group);
                            expect(session.getChanges()).toEqual({
                                User: {
                                    groups: {
                                        C: {
                                            1: [id]
                                        }
                                    }
                                },
                                Group: {
                                    C: [{
                                        id: group.getId()
                                    }]
                                }
                            });
                        });

                        it("should ignore adds & cancelling removes", function() {
                            var group1 = getAndComplete('Group', 101);
                            groups.add(group1);
                            groups.removeAt(0);
                            expect(session.getChanges()).toBeNull();
                        });
                    });

                    describe("store loaded", function() {
                        beforeEach(function() {
                            groups.load();
                            completeRequest([{id: 101}, {id: 102}, {id: 103}]);
                        });

                        it("should not include any records loaded into the store", function() {
                            expect(session.getChanges()).toBeNull();
                        });

                        it("should include a local add to existing records", function() {
                            var group4 = getAndComplete('Group', 104);
                            groups.add(group4);
                            expect(session.getChanges()).toEqual({
                                User: {
                                    groups: {
                                        C: {
                                            1: [104]
                                        }
                                    }
                                }
                            });
                        });

                        it("should include local phantom adds and a create", function() {
                            var group = session.createRecord('Group'),
                                id = group.getId();

                            groups.add(group);
                            expect(session.getChanges()).toEqual({
                                User: {
                                    groups: {
                                        C: {
                                            1: [id]
                                        }
                                    }
                                },
                                Group: {
                                    C: [{
                                        id: group.getId()
                                    }]
                                }
                            });
                        });

                        it("should ignore adds & cancelling removes", function() {
                            var group4 = getAndComplete('Group', 104);
                            groups.add(group4);
                            groups.remove(group4);
                            expect(session.getChanges()).toBeNull();
                        });

                        it("should drop records removed from the store", function() {
                            groups.removeAt(0);
                            expect(session.getChanges()).toEqual({
                                User: {
                                    groups: {
                                        D: {
                                            1: [101]
                                        }
                                    }
                                }
                            });
                        });
                    });
                });

                describe("via updates", function() {
                    it("should process creates without records", function() {
                        session.update({
                            User: {
                                groups: {
                                    C: {
                                        1: [101, 102]
                                    }
                                }
                            }
                        });

                        expect(session.getChanges()).toEqual({
                            User: {
                                groups: {
                                    C: {
                                        1: [101, 102]
                                    }
                                }
                            }
                        });
                    });

                    it("should process drops without records", function() {
                        session.update({
                            User: {
                                groups: {
                                    D: {
                                        1: [103, 104]
                                    }
                                }
                            }
                        });

                        expect(session.getChanges()).toEqual({
                            User: {
                                groups: {
                                    D: {
                                        1: [103, 104]
                                    }
                                }
                            }
                        });
                    });
                });
            });
        });
    });

    describe("update", function() {
        beforeEach(function() {
            Ext.data.Model.schema.setNamespace('spec');
            session = new Ext.data.Session();
        });

        afterEach(function() {
            rec = null;
            Ext.data.Model.schema.clear(true);
        }); 

        describe("basic operations", function() {
            var User;

            function wrapBlock(action, data) {
                var o = {
                    User: {}
                };
                o.User[action] = data;
                return o;
            }

            beforeEach(function() {
                User = Ext.define('spec.User', {
                    extend: 'Ext.data.Model',
                    fields: ['id', 'name', 'age']
                });
            });

            afterEach(function() {
                Ext.undefine('spec.User');
                User = null;
            });

            it("should throw an exception for an unrecognized entity", function() {
                expect(function() {
                    session.update({
                        Luser: {}
                    });
                }).toThrow();
            });

            describe("read", function() {
                it("should add the record to the session", function() {
                    session.update(wrapBlock('R', [{
                        id: 17
                    }]));
                    expect(session.peekRecord('User', 17)).not.toBeNull();
                });

                it("should have the data on the record", function() {
                    session.update(wrapBlock('R', [{
                        id: 17,
                        name: 'Foo',
                        age: 32
                    }]));
                    var user = session.getRecord('User', 17);
                    expect(user.get('name')).toBe('Foo');
                    expect(user.get('age')).toBe(32);
                });

                it("should not be dirty", function() {
                    session.update(wrapBlock('R', [{
                        id: 17,
                        name: 'Foo',
                        age: 32
                    }]));
                    var user = session.getRecord('User', 17);
                    expect(user.dirty).toBe(false);
                });

                it("should not be phantom even if we don't have an id", function() {
                    session.update(wrapBlock('R', [{
                        name: 'Foo',
                        age: 32
                    }]));
                    var user = session.getRecord('User', 'User-1');
                    expect(user.phantom).toBe(false);
                });

                it("should be able to read multiple records", function() {
                    session.update(wrapBlock('R', [{
                        id: 1,
                        name: 'Foo'
                    }, {
                        id: 2,
                        name: 'Bar'
                    }, {
                        id: 3,
                        name: 'Baz'
                    }]));
                    expect(session.peekRecord('User', 1)).not.toBeNull();
                    expect(session.peekRecord('User', 2)).not.toBeNull();
                    expect(session.peekRecord('User', 3)).not.toBeNull();
                });

                it("should throw an exception if the record is in the session", function() {
                    getAndComplete('User', 1);
                    expect(function() {
                        session.update(wrapBlock('R', [{
                            id: 1
                        }]));
                    }).toThrow();
                });
            });

            describe("create", function() {
                    it("should add the record to the session", function() {
                    session.update(wrapBlock('C', [{
                        id: 17
                    }]));
                    expect(session.peekRecord('User', 17)).not.toBeNull();
                });

                it("should have the data on the record", function() {
                    session.update(wrapBlock('C', [{
                        id: 17,
                        name: 'Foo',
                        age: 32
                    }]));
                    var user = session.getRecord('User', 17);
                    expect(user.get('name')).toBe('Foo');
                    expect(user.get('age')).toBe(32);
                });

                it("should be a phantom", function() {
                    session.update(wrapBlock('C', [{
                        name: 'Foo',
                        age: 32
                    }]));
                    var user = session.getRecord('User', 'User-1');
                    expect(user.phantom).toBe(true);
                });

                it("should be able to create multiple records", function() {
                    session.update(wrapBlock('C', [{
                        name: 'Foo'
                    }, {
                        name: 'Bar'
                    }, {
                        name: 'Baz'
                    }]));
                    expect(session.peekRecord('User', 'User-1')).not.toBeNull();
                    expect(session.peekRecord('User', 'User-2')).not.toBeNull();
                    expect(session.peekRecord('User', 'User-3')).not.toBeNull();
                });

                it("should throw an exception if the record is in the session", function() {
                    getAndComplete('User', 17);
                    expect(function() {
                        session.update(wrapBlock('C', [{
                            id: 17
                        }]));
                    }).toThrow();
                });
            });

            describe("drop", function() {
                it("should drop the record", function() {
                    var user = getAndComplete('User', 100);
                    session.update(wrapBlock('D', [100]));
                    expect(user.dropped).toBe(true);
                });
                it("should be able to drop multiple records", function() {
                    var user100 = getAndComplete('User', 100),
                        user200 = getAndComplete('User', 200),
                        user300 = getAndComplete('User', 300);

                    session.update(wrapBlock('D', [100, 200, 300]));
                    expect(user100.dropped).toBe(true);
                    expect(user200.dropped).toBe(true);
                    expect(user300.dropped).toBe(true);
                });

                it("should throw an exception if the record does not exist", function() {
                    expect(function() {
                        session.update(wrapBlock('D', [100]));
                    }).toThrow();
                });
            });

            describe("update", function() {
                it("should update the record data", function() {
                    var user = session.createRecord('User', {
                        id: 100,
                        name: 'Foo'
                    });
                    session.update(wrapBlock('U', [{
                        id: 100,
                        name: 'Bar'
                    }]));
                    expect(user.get('name')).toBe('Bar');
                });

                it("should not commit the record", function() {
                    var user = session.createRecord('User', {
                        id: 100,
                        name: 'Foo',
                        age: 10
                    });
                    session.update(wrapBlock('U', [{
                        id: 100,
                        name: 'Bar',
                        age: 11
                    }]));
                    expect(user.dirty).toBe(true);
                    expect(user.isModified('name')).toBe(true);
                    expect(user.isModified('age')).toBe(true);
                });

                it("should not be dirty if the data does not change", function() {
                    var user = session.createRecord('User', {
                        id: 100,
                        name: 'Foo',
                        age: 23
                    });
                    session.update(wrapBlock('U', [{
                        id: 100,
                        name: 'Foo',
                        age: 23
                    }]));
                    expect(user.dirty).toBe(false);
                });

                it("should handle multiple updates", function() {
                    var user101 = session.createRecord('User', {
                        id: 101,
                        name: 'Foo'
                    });
                    var user102 = session.createRecord('User', {
                        id: 102,
                        name: 'Bar'
                    });
                    var user103 = session.createRecord('User', {
                        id: 103,
                        name: 'Baz'
                    });

                    session.update(wrapBlock('U', [{
                        id: 101,
                        name: 'A'
                    }, {
                        id: 102,
                        name: 'B'
                    }, {
                        id: 103,
                        name: 'C'
                    }]));
                    expect(user101.get('name')).toBe('A');
                    expect(user102.get('name')).toBe('B');
                    expect(user103.get('name')).toBe('C');

                });

                it("should handle object syntax", function() {
                    var user101 = session.createRecord('User', {
                        id: 101,
                        name: 'Foo'
                    });
                    var user102 = session.createRecord('User', {
                        id: 102,
                        name: 'Bar'
                    });
                    var user103 = session.createRecord('User', {
                        id: 103,
                        name: 'Baz'
                    });

                    session.update(wrapBlock('U', {
                        101: {
                            name: 'A'
                        },
                        102: {
                            name: 'B'
                        },
                        103: {
                            name: 'C'
                        }
                    }));
                    expect(user101.get('name')).toBe('A');
                    expect(user102.get('name')).toBe('B');
                    expect(user103.get('name')).toBe('C');
                });

                it("should throw an exception if the record does not exist in the store", function() {
                    expect(function() {
                        session.update(wrapBlock('U', [{
                            id: 100,
                            name: 'Bar'
                        }]));
                    }).toThrow();
                });

                it("should throw an exception if the record is dropped", function() {
                    var user = getAndComplete('User', 1);
                    user.drop();
                    expect(function() {
                        session.update(wrapBlock('U', [{
                            id: 100,
                            name: 'Bar'
                        }]));
                    }).toThrow();
                });
            });

            describe("associations", function() {
                var Post, Group;

                beforeEach(function() {
                    Post = Ext.define('spec.Post', {
                        extend: 'Ext.data.Model',
                        fields: ['id', 'content', {
                            name: 'userId',
                            reference: 'User'
                        }]
                    });

                    Group = Ext.define('spec.Group', {
                        extend: 'Ext.data.Model',
                        fields: ['id', 'name'],
                        manyToMany: 'User'
                    });
                });

                afterEach(function() {
                    Post = Group = null;
                    Ext.undefine('spec.Post');
                    Ext.undefine('spec.Group');
                });

                describe("many to one", function() {
                    it("should process any CRUD operations before associations", function() {
                        session.update({
                            User: {
                                R: [{id: 1}],
                                posts: {
                                    R: {
                                        1: [101]
                                    }
                                }
                            },
                            Post: {
                                R: [{
                                    id: 101,
                                    userId: 1
                                }]
                            }
                        });

                        var user = session.getRecord('User', 1);
                        expect(user.posts().indexOfId(101)).toBe(0);
                    });

                    describe("without an entity CRUD block", function() {
                        it("should throw an exception if the owner model does not exist", function() {
                            getAndComplete('Post', 101);
                            expect(function() {
                                session.update({
                                    User: {
                                        posts: {
                                            R: {
                                                1: [101]
                                            }
                                        }
                                    }
                                });
                            }).toThrow();
                        });

                        it("should throw an exception if the child model does not exist", function() {
                            getAndComplete('User', 1);
                            expect(function() {
                                session.update({
                                    User: {
                                        posts: {
                                            R: {
                                                1: [101]
                                            }
                                        }
                                    }
                                });
                            }).toThrow();
                        });
                    });

                    describe("with an entity CRUD block", function() {
                        it("should throw an exception if the owner model does not exist and wasn't read", function() {
                            expect(function() {
                                session.update({
                                    User: {
                                        posts: {
                                            R: {
                                                1: [101]
                                            }
                                        }
                                    },
                                    Post: {
                                        R: [{
                                            id: 101,
                                            userId: 1
                                        }]
                                    }
                                });
                            }).toThrow();
                        });

                        it("should throw an exception if the child model does not exist and wasn't read", function() {
                            expect(function() {
                                session.update({
                                    User: {
                                        R: [{id: 1}],
                                        posts: {
                                            R: {
                                                1: [101]
                                            }
                                        }
                                    }
                                });
                            }).toThrow();
                        });
                    });

                    describe("with the store not created", function() {
                        it("should create the store with data", function() {
                            var user = getAndComplete('User', 1);

                            session.update({
                                User: {
                                    posts: {
                                        R: {
                                            1: [101, 102, 103]
                                        }
                                    }
                                },
                                Post: {
                                    R: [{
                                        id: 101,
                                        userId: 1
                                    }, {
                                        id: 102,
                                        userId: 1
                                    }, {
                                        id: 103,
                                        userId: 1
                                    }]
                                }
                            });

                            var posts = user.posts();
                            expect(posts.getCount()).toBe(3);
                            expect(posts.getAt(0)).toBe(session.peekRecord('Post', 101));
                            expect(posts.getAt(1)).toBe(session.peekRecord('Post', 102));
                            expect(posts.getAt(2)).toBe(session.peekRecord('Post', 103));
                        });

                        it("should create the store and not trigger a load, should set loadCount & complete", function() {
                            var user = getAndComplete('User', 1),
                                spy = spyOn(Post.getProxy(), 'read');

                            session.update({
                                User: {
                                    posts: {
                                        R: {
                                            1: [101]
                                        }
                                    }
                                },
                                Post: {
                                    R: [{
                                        id: 101,
                                        userId: 1
                                    }]
                                }
                            });
                            var posts = user.posts();
                            expect(posts.getCount()).toBe(1);
                            expect(posts.loadCount).toBe(1);
                            expect(posts.complete).toBe(true);
                            expect(spy).not.toHaveBeenCalled();
                        });

                        it("should include local records with matching FK", function() {
                            var user = getAndComplete('User', 1),
                                post1 = getAndComplete('Post', 101);

                            post1.set('userId', 1);

                            session.update({
                                User: {
                                    posts: {
                                        R: {
                                            1: [102]
                                        }
                                    }
                                },
                                Post: {
                                    R: [{
                                        id: 102,
                                        userId: 1
                                    }]
                                }
                            });

                            var posts = user.posts();
                            expect(posts.getCount()).toBe(2);
                        });

                        it("should exclude local records where the FK does not match", function() {
                            var user = getAndComplete('User', 1),
                                post1 = getAndComplete('Post', 101);

                            // Post exists, but doesn't have a FK to the user
                            session.update({
                                User: {
                                    posts: {
                                        R: {
                                            1: [101]
                                        }
                                    }
                                }
                            });

                            var posts = user.posts();
                            expect(posts.getCount()).toBe(0);
                        });
                    });

                    describe("with the store created", function() {
                        it("should fill an empty store", function() {
                            var user = getAndComplete('User', 1),
                                posts = user.posts();

                            session.update({
                                User: {
                                    posts: {
                                        R: {
                                            1: [101, 102, 103]
                                        }
                                    }
                                },
                                Post: {
                                    R: [{
                                        id: 101,
                                        userId: 1
                                    }, {
                                        id: 102,
                                        userId: 1
                                    }, {
                                        id: 103,
                                        userId: 1
                                    }]
                                }
                            });

                            expect(posts.getCount()).toBe(3);
                            expect(posts.getAt(0)).toBe(session.peekRecord('Post', 101));
                            expect(posts.getAt(1)).toBe(session.peekRecord('Post', 102));
                            expect(posts.getAt(2)).toBe(session.peekRecord('Post', 103));
                            expect(posts.complete).toBe(true);
                        });

                        describe("store not loaded", function() {
                            it("should include locally added records", function() {
                                var user = getAndComplete('User', 1),
                                    post1 = getAndComplete('Post', 101),
                                    posts = user.posts();

                                posts.add(post1);
                                session.update({
                                    User: {
                                        posts: {
                                            R: {
                                                1: [102]
                                            }
                                        }
                                    },
                                    Post: {
                                        R: [{
                                            id: 102,
                                            userId: 1
                                        }]
                                    }
                                });
                                expect(posts.getCount()).toBe(2);
                                expect(posts.indexOf(post1)).toBe(1);
                            });

                            it("should include records with local foreign key modifications", function() {
                                var user = getAndComplete('User', 1),
                                    post1 = getAndComplete('Post', 101),
                                    posts = user.posts();

                                post1.set('userId', 1);
                                session.update({
                                    User: {
                                        posts: {
                                            R: {
                                                1: [102]
                                            }
                                        }
                                    },
                                    Post: {
                                        R: [{
                                            id: 102,
                                            userId: 1
                                        }]
                                    }
                                });
                                expect(posts.getCount()).toBe(2);
                                expect(posts.indexOf(session.peekRecord('Post', 102))).toBe(0);
                                expect(posts.indexOf(post1)).toBe(1);
                            });

                            it("should exclude locally removed records", function() {
                                var user = getAndComplete('User', 1),
                                    post1 = getAndComplete('Post', 101, session, {userId: 1}),
                                    post2 = getAndComplete('Post', 102, session, {userId: 1}),
                                    posts = user.posts();

                                posts.removeAt(0);

                                session.update({
                                    User: {
                                        posts: {
                                            R: {
                                                1: [101, 102]
                                            }
                                        }
                                    }
                                });

                                expect(posts.getCount()).toBe(1);
                                expect(posts.indexOf(post2)).toBe(0);
                                expect(posts.indexOf(post1)).toBe(-1);
                            });

                            it("should exclude records with local foreign key modifications", function() {
                                var user = getAndComplete('User', 1),
                                    post1 = getAndComplete('Post', 101, session, {userId: 1}),
                                    post2 = getAndComplete('Post', 102, session, {userId: 1}),
                                    posts = user.posts();

                                post1.set('userId', null);

                                session.update({
                                    User: {
                                        posts: {
                                            R: {
                                                1: [101, 102]
                                            }
                                        }
                                    }
                                });

                                expect(posts.getCount()).toBe(1);
                                expect(posts.indexOf(post2)).toBe(0);
                                expect(posts.indexOf(post1)).toBe(-1);
                            });
                        });

                        describe("store already loaded", function() {
                            it("should include added items", function() {
                                var user = getAndComplete('User', 1),
                                    post1 = getAndComplete('Post', 101),
                                    posts = user.posts();

                                posts.load();
                                completeRequest([]);
                                posts.add(post1);
                                session.update({
                                    User: {
                                        posts: {
                                            R: {
                                                1: [102]
                                            }
                                        }
                                    },
                                    Post: {
                                        R: [{
                                            id: 102,
                                            userId: 1
                                        }]
                                    }
                                });
                                expect(posts.getCount()).toBe(2);
                                expect(posts.getAt(0)).toBe(session.peekRecord('Post', 102));
                                expect(posts.getAt(1)).toBe(post1);
                            });

                            it("should exclude removed items", function() {
                                var user = getAndComplete('User', 1);
                                    posts = user.posts();

                                posts.load();
                                completeRequest([{id: 101, userId: 1}, {id: 102, userId: 1}, {id: 103, userId: 1}]);
                                posts.removeAt(0);
                                session.update({
                                    User: {
                                        posts: {
                                            R: {
                                                1: [101, 102, 103]
                                            }
                                        }
                                    }
                                });
                                expect(posts.getCount()).toBe(2);
                                expect(posts.getAt(0)).toBe(session.peekRecord('Post', 102));
                                expect(posts.getAt(1)).toBe(session.peekRecord('Post', 103));
                            });
                        })
                    }); 
                    
                });

                describe("many to many", function() {
                    describe("read", function() {
                        it("should read CRUD records before processing", function() {
                            session.update({
                                User: {
                                    R: [{id: 1}],
                                    groups: {
                                        R: {
                                            1: [101, 102]
                                        }
                                    }
                                },
                                Group: {
                                    R: [{id: 101}, {id: 102}]
                                }
                            });
                            var user = session.getRecord('User', 1),
                                groups = user.groups();

                            expect(groups.getCount()).toBe(2);
                            expect(groups.getAt(0)).toBe(session.peekRecord('Group', 101));
                            expect(groups.getAt(1)).toBe(session.peekRecord('Group', 102));
                        });

                        it("should require the child records being read to be present", function() {
                            // Group 101/102 don't exist and weren't read
                            expect(function() {
                                session.update({
                                    User: {
                                        R: [{id: 1}],
                                        groups: {
                                            R: {
                                                1: [101, 102]
                                            }
                                        }
                                    }
                                });
                            }).toThrow();
                        });

                        it("should require the parent record being read to be present", function() {
                            // User 1 doesn't exist and wasn't read
                            expect(function() {
                                session.update({
                                    User: {
                                        groups: {
                                            R: {
                                                1: [101]
                                            }
                                        }
                                    },
                                    Post: {
                                        R: [{
                                            id: 101
                                        }]
                                    }
                                });
                            }).toThrow();
                        });

                        describe("with the store not created", function() {
                            it("should create a store with the items", function() {
                                var user = getAndComplete('User', 1);

                                session.update({
                                    User: {
                                        groups: {
                                            R: {
                                                1: [101]
                                            }
                                        }
                                    },
                                    Group: {
                                        R: [{
                                            id: 101
                                        }]
                                    }
                                });
                                var groups = user.groups();
                                expect(groups.getCount()).toBe(1);
                                expect(groups.getAt(0)).toBe(session.peekRecord('Group', 101));
                            });

                            it("should not trigger a load", function() {
                                var user = getAndComplete('User', 1),
                                    spy = spyOn(Group.getProxy(), 'read');

                                session.update({
                                    User: {
                                        groups: {
                                            R: {
                                                1: [101]
                                            }
                                        }
                                    },
                                    Group: {
                                        R: [{
                                            id: 101
                                        }]
                                    }
                                });
                                expect(spy).not.toHaveBeenCalled();
                            });

                            it("should set the complete flag", function() {
                                var user = getAndComplete('User', 1);

                                session.update({
                                    User: {
                                        groups: {
                                            R: {
                                                1: [101]
                                            }
                                        }
                                    },
                                    Group: {
                                        R: [{
                                            id: 101
                                        }]
                                    }
                                });
                                expect(user.groups().complete).toBe(true);
                            });

                            it("should include locally created records", function() {
                                var user = getAndComplete('User', 1);

                                session.update({
                                    User: {
                                        groups: {
                                            C: {
                                                1: [101]
                                            }
                                        }
                                    }
                                });

                                session.update({
                                    User: {
                                        groups: {
                                            R: {
                                                1: [102]
                                            }
                                        }
                                    },
                                    Group: {
                                        R: [{
                                            id: 102
                                        }]
                                    }
                                });

                                getAndComplete('Group', 101);
                                var groups = user.groups();
                                expect(groups.getCount()).toBe(2);
                                expect(groups.indexOfId(102)).toBe(0);
                                expect(groups.indexOfId(101)).toBe(1);
                            });

                            it("should exclude locally dropped records", function() {
                                var user = getAndComplete('User', 1);

                                session.update({
                                    User: {
                                        groups: {
                                            D: {
                                                1: [101]
                                            }
                                        }
                                    }
                                });

                                session.update({
                                    User: {
                                        groups: {
                                            R: {
                                                1: [101, 102]
                                            }
                                        }
                                    },
                                    Group: {
                                        R: [{
                                            id: 101
                                        }, {
                                            id: 102
                                        }]
                                    }
                                });

                                var groups = user.groups();
                                expect(groups.getCount()).toBe(1);
                                expect(groups.indexOfId(102)).toBe(0);
                            });
                        });

                        describe("with the store created", function() {
                            describe("store not loaded", function() {
                                it("should fill an empty store", function() {
                                    var user = getAndComplete('User', 1),
                                        groups = user.groups();

                                    session.update({
                                        User: {
                                            groups: {
                                                R: {
                                                    1: [101]
                                                }
                                            }
                                        },
                                        Group: {
                                            R: [{
                                                id: 101
                                            }]
                                        }
                                    });
                                    expect(groups.getCount()).toBe(1);
                                    expect(groups.first()).toBe(session.peekRecord('Group', 101));
                                });

                                it("should include local store adds", function() {
                                    var user = getAndComplete('User', 1),
                                        group1 = getAndComplete('Group', 101),
                                        groups = user.groups();

                                    groups.add(group1);

                                    session.update({
                                        User: {
                                            groups: {
                                                R: {
                                                    1: [102]
                                                }
                                            }
                                        },
                                        Group: {
                                            R: [{
                                                id: 102
                                            }]
                                        }
                                    });

                                    expect(groups.getCount()).toBe(2);
                                    expect(groups.getAt(0)).toBe(session.peekRecord('Group', 102));
                                    expect(groups.getAt(1)).toBe(group1);
                                });

                                it("should exclude local drops", function() {
                                    var user = getAndComplete('User', 1),
                                        groups = user.groups();

                                    session.update({
                                        User: {
                                            groups: {
                                                D: {
                                                    1: [101]
                                                }
                                            }
                                        }
                                    });

                                    session.update({
                                        User: {
                                            groups: {
                                                R: {
                                                    1: [101, 102]
                                                }
                                            }
                                        },
                                        Group: {
                                            R: [{
                                                id: 101
                                            }, {
                                                id: 102
                                            }]
                                        }
                                    });
                                    expect(groups.getCount()).toBe(1);
                                    expect(groups.getAt(0)).toBe(session.peekRecord('Group', 102));
                                });
                            });

                            describe("store already loaded", function() {
                                it("should include local store adds", function() {
                                    var user = getAndComplete('User', 1),
                                        groups = user.groups(),
                                        group4 = getAndComplete('Group', 104);

                                    groups.load();
                                    completeRequest([{id: 101}, {id: 102}, {id: 103}]);
                                    groups.add(group4);

                                    session.update({
                                        User: {
                                            groups: {
                                                R: {
                                                    1: [101, 102, 103]
                                                }
                                            }
                                        }
                                    });
                                    expect(groups.getCount()).toBe(4);
                                    expect(groups.indexOf(group4)).toBe(3);
                                });

                                it("should exclude local store removes", function() {
                                    var user = getAndComplete('User', 1),
                                        groups = user.groups();

                                    groups.load();
                                    completeRequest([{id: 101}, {id: 102}]);
                                    groups.removeAt(0);

                                    session.update({
                                        User: {
                                            groups: {
                                                R: {
                                                    1: [101, 102]
                                                }
                                            }
                                        }
                                    });
                                    expect(groups.getCount()).toBe(1);
                                });
                            });
                        });
                    });

                    describe("create", function() {
                        describe("with the store not created", function() {
                            describe("with the record created", function() {
                                it("should have the record present in the store when the store is created", function() {
                                    var user = getAndComplete('User', 1),
                                        group1 = getAndComplete('Group', 101);

                                    session.update({
                                        User: {
                                            groups: {
                                                C: {
                                                    1: [101]
                                                }
                                            }
                                        }
                                    });

                                    var groups = user.groups();
                                    expect(groups.getCount()).toBe(1);
                                    expect(groups.getAt(0)).toBe(group1);
                                });
                            });

                            describe("with the record not created", function() {
                                it("should have the record in the store when the record is created", function() {
                                    var user = getAndComplete('User', 1);

                                    session.update({
                                        User: {
                                            groups: {
                                                C: {
                                                    1: [101]
                                                }
                                            }
                                        }
                                    });

                                    var groups = user.groups();
                                    expect(groups.getCount()).toBe(0);
                                    var group1 = getAndComplete('Group', 101);
                                    expect(groups.getCount()).toBe(1);
                                    expect(groups.getAt(0)).toBe(group1);
                                });
                            });
                        });

                        describe("with the store created", function() {
                            describe("store not loaded", function() {
                                describe("with the record created", function() {
                                    it("should add the record to the store", function() {
                                        var user = getAndComplete('User', 1),
                                            group1 = getAndComplete('Group', 101),
                                            groups = user.groups();

                                        session.update({
                                            User: {
                                                groups: {
                                                    C: {
                                                        1: [101]
                                                    }
                                                }
                                            }
                                        });

                                        expect(groups.getCount()).toBe(1);
                                        expect(groups.getAt(0)).toBe(group1);
                                    });
                                });

                                describe("with the record not created", function() {
                                    it("should have the record in the store when the record is created", function() {
                                        var user = getAndComplete('User', 1),
                                            groups = user.groups();

                                        session.update({
                                            User: {
                                                groups: {
                                                    C: {
                                                        1: [101]
                                                    }
                                                }
                                            }
                                        });
                                        expect(groups.getCount()).toBe(0);
                                        var group1 = getAndComplete('Group', 101);
                                        expect(groups.getAt(0)).toBe(group1);
                                    });
                                });
                            });

                            describe("store already loaded", function() {
                                describe("with the record created", function() {
                                    it("should add the record to the store", function() {
                                        var user = getAndComplete('User', 1),
                                            groups = user.groups(),
                                            group3 = getAndComplete('Group', 103);

                                        groups.load();
                                        completeRequest([{id: 101}, {id: 102}]);

                                        expect(groups.getCount()).toBe(2);

                                        session.update({
                                            User: {
                                                groups: {
                                                    C: {
                                                        1: [103]
                                                    }
                                                }
                                            }
                                        });
                                        expect(groups.getCount()).toBe(3);
                                        expect(groups.getAt(2)).toBe(group3);
                                    });
                                });

                                describe("with the record not created", function() {
                                    it("should have the record in the store when the record is created", function() {
                                        var user = getAndComplete('User', 1),
                                            groups = user.groups();

                                        groups.load();
                                        completeRequest([{id: 101}, {id: 102}]);

                                        session.update({
                                            User: {
                                                groups: {
                                                    C: {
                                                        1: [103]
                                                    }
                                                }
                                            }
                                        });
                                        expect(groups.getCount()).toBe(2);

                                        var group3 = getAndComplete('Group', 103);

                                        expect(groups.getCount()).toBe(3);
                                        expect(groups.getAt(2)).toBe(group3);
                                    });
                                });
                            });
                        });
                    });

                    describe("drop", function() {
                        describe("with the store not created", function() {
                            it("should exclude the record when it is loaded", function() {
                                var user = getAndComplete('User', 1);

                                session.update({
                                    User: {
                                        groups: {
                                            D: {
                                                1: [101]
                                            }
                                        }
                                    }
                                });

                                var groups = user.groups();
                                groups.load();
                                completeRequest([{id: 101}, {id: 102}]);
                                expect(groups.getCount()).toBe(1);
                                expect(groups.getAt(0)).toBe(session.peekRecord('Group', 102));
                            });
                        });

                        describe("with the store created", function() {
                            describe("store not loaded", function() {
                                it("should exclude the record when it is loaded", function() {
                                    var user = getAndComplete('User', 1),
                                        groups = user.groups();

                                    session.update({
                                        User: {
                                            groups: {
                                                D: {
                                                    1: [101]
                                                }
                                            }
                                        }
                                    });

                                    groups.load();
                                    completeRequest([{id: 101}, {id: 102}]);
                                    expect(groups.getCount()).toBe(1);
                                    expect(groups.getAt(0)).toBe(session.peekRecord('Group', 102));
                                });
                            });

                            describe("store already loaded", function() {
                                it("should exclude the record from the store", function() {
                                    var user = getAndComplete('User', 1),
                                        groups = user.groups();

                                    groups.load();
                                    completeRequest([{id: 101}, {id: 102}]);

                                    session.update({
                                        User: {
                                            groups: {
                                                D: {
                                                    1: [101]
                                                }
                                            }
                                        }
                                    });
                                    expect(groups.getCount()).toBe(1);
                                    expect(groups.getAt(0)).toBe(session.peekRecord('Group', 102));
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    describe("spawn", function() {
        var parent;

        beforeEach(function() {
            Ext.data.Model.schema.setNamespace('spec');
            Ext.define('spec.User', {
                extend: 'Ext.data.Model',
                fields: ['name']
            });
        });

        afterEach(function() {
            Ext.destroy(parent);
            parent = null;
            Ext.undefine('spec.User');
            Ext.data.Model.schema.clear(true);
        });

        it("should set the schema from the parent", function() {
            var schema = new Ext.data.schema.Schema();

            parent = new Ext.data.Session({
                schema: schema
            });

            session = parent.spawn();
            expect(session.getSchema()).toBe(schema);
        });

        it("should set the parent reference", function() {
            parent = new Ext.data.Session();
            session = parent.spawn();
            expect(session.getParent()).toBe(parent);
        });

        describe("stores", function() {
            it("should use the data from parent records if they exist", function() {
                parent = new Ext.data.Session();

                var user = getAndComplete('User', 1, parent);
                // Local change
                user.set('name', 'Foo');

                session = parent.spawn();
                var store = new Ext.data.Store({
                    model: spec.User,
                    session: session,
                    proxy: {
                        type: 'ajax',
                        url: 'fakeUrl'
                    }
                });
                store.load();
                completeRequest([{id: 1, name: 'Bar'}]);
                expect(session.peekRecord('User', 1).get('name')).toBe('Foo');

            });
        });
    });

    describe("updating from child to parent sessions", function() {
        var child;
        beforeEach(function() {
            Ext.data.Model.schema.setNamespace('spec');
            Ext.define('spec.User', {
                extend: 'Ext.data.Model',
                fields: ['id', 'name', 'age']
            });

            session = new Ext.data.Session();
        });

        afterEach(function() {
            Ext.undefine('spec.User');
            Ext.data.Model.schema.clear(true);
            Ext.destroy(child);
            child = null;
        });

        it("should handle when there are no changes", function() {
            child = session.spawn();
            expect(child.getChangesForParent()).toBeNull();
            child.save();
            expect(session.getChanges()).toBeNull();
        });

        describe("create", function() {
            it("should push up creates to the parent", function() {
                child = session.spawn();
                rec = child.createRecord('User', {
                    name: 'Foo'
                });
                child.save();
                expect(session.getChanges()).toEqual({
                    User: {
                        C: [{
                            id: rec.getId(),
                            name: 'Foo'
                        }]
                    }
                });
            });
        });

        describe("update", function() {
            it("should reflect update changes in the parent", function() {
                getAndComplete('User', 1);
                child = session.spawn();
                child.getRecord('User', 1).set('name', 'Foo');
                child.save();
                expect(session.getChanges()).toEqual({
                    User: {
                        U: [{
                            id: 1,
                            name: 'Foo'
                        }]
                    }
                });
            });

            it("should use a record that is a phantom in the parent as an update from the child", function() {
                var rec = session.createRecord('User', {
                    name: 'Foo'
                }), id = rec.getId();

                child = session.spawn();
                child.getRecord('User', id).set('name', 'Bar');
                child.save();
                expect(session.getChanges()).toEqual({
                    User: {
                        C: [{
                            id: id,
                            name: 'Bar'
                        }]
                    }
                });
            });
        });

        describe("drop", function() {
            it("should propagate a drop to the parent", function() {
                getAndComplete('User', 1);
                child = session.spawn();
                child.getRecord('User', 1).drop();
                child.save();
                expect(session.getChanges()).toEqual({
                    User: {
                        D: [1]
                    }
                });
            });

            it("should propagate a drop of a parent phantom, meaning we have no changes", function() {
                var rec = session.createRecord('User'),
                    id = rec.getId();

                child = session.spawn();
                child.getRecord('User', id).drop();
                child.save();
                expect(session.getChanges()).toBeNull();
            });
        });

        describe("associations", function() {
            describe("many to one", function() {
                beforeEach(function() {
                    Ext.define('spec.Post', {
                        extend: 'Ext.data.Model',
                        fields: ['content', {
                            name: 'userId',
                            reference: 'User'
                        }]
                    });
                });

                afterEach(function() {
                    Ext.undefine('spec.Post');
                });

                describe("store loaded in the parent", function() {
                    var user, posts;

                    beforeEach(function() {
                        user = getAndComplete('User', 1);
                        posts = user.posts();

                        posts.load();
                        completeRequest([{id: 101, userId: 1}, {id: 102, userId: 1}]);
                        child = session.spawn();

                        posts = child.getRecord('User', 1).posts();
                    });


                    afterEach(function() {
                        user = posts = null;
                    });

                    it("should push up a store removal as an update to the FK", function() {
                        posts.removeAt(0);
                        child.save();

                        expect(session.getChanges()).toEqual({
                            Post: {
                                U: [{
                                    userId: null,
                                    id: 101
                                }]
                            }
                        });
                        expect(session.peekRecord('Post', 101).dirty).toBe(true);
                    });

                    it("should push up a drop", function() {
                        posts.first().drop();
                        child.save();

                        expect(session.getChanges()).toEqual({
                            Post: {
                                D: [101]
                            }
                        });
                        expect(session.peekRecord('Post', 101).dropped).toBe(true);
                    });

                    it("should push a new phantom record as a creation", function() {
                        var id = posts.add({})[0].getId();
                        child.save();

                        expect(session.getChanges()).toEqual({
                            Post: {
                                C: [{
                                    id: id,
                                    userId: 1
                                }]
                            }
                        });
                        expect(session.peekRecord('Post', id).phantom).toBe(true);
                    });

                    it("should push an added record as an update to the FK", function() {
                        var post = getAndComplete('Post', 105, child);
                        posts.add(post);
                        child.save();

                        expect(session.getChanges()).toEqual({
                            Post: {
                                U: [{
                                    id: 105,
                                    userId: 1
                                }]
                            }
                        });
                        expect(session.peekRecord('Post', 105).dirty).toBe(true);
                    });
                });

                describe("store not loaded in the parent", function() {
                    var user, posts, childUser;

                    beforeEach(function() {
                        user = getAndComplete('User', 1);
                        child = session.spawn();

                        childUser = child.getRecord('User', 1);
                        posts = childUser.posts();
                    });

                    afterEach(function() {
                        users = posts = childUser = null;
                    });

                    it("should read & update for a foreign key change", function() {
                        posts.load();
                        completeRequest([{id: 101, userId: 1}, {id: 102, userId: 1}, {id: 103, userId: 1}]);
                        posts.removeAt(1);
                        child.save();

                        expect(session.getChanges()).toEqual({
                            Post: {
                                U: [{
                                    id: 102,
                                    userId: null
                                }]
                            }
                        });
                        expect(session.peekRecord('Post', 102).dirty).toBe(true);
                    });

                    it("should read and update for a drop", function() {
                        posts.load();
                        completeRequest([{id: 101, userId: 1}, {id: 102, userId: 1}, {id: 103, userId: 1}]);
                        posts.getAt(1).drop();
                        child.save();

                        expect(session.getChanges()).toEqual({
                            Post: {
                                D: [102]
                            }
                        });
                        expect(session.peekRecord('Post', 102).dropped).toBe(true);
                    });

                    it("should push up phantom records as creates", function() {
                        var id = posts.add({
                            content: 'Foo'
                        })[0].getId();
                        child.save();

                        expect(session.getChanges()).toEqual({
                            Post: {
                                C: [{
                                    id: id,
                                    userId: 1,
                                    content: 'Foo'
                                }]
                            }
                        });
                        expect(session.peekRecord('Post', id).phantom).toBe(true);
                    });

                    it("should have no changes if the store is loaded", function() {
                        posts.load();
                        completeRequest([{id: 101, userId: 1}, {id: 102, userId: 1}, {id: 103, userId: 1}]);
                        child.save();
                        expect(session.getChanges()).toBeNull();
                    });
                });
            });

            describe("many to many", function() {
                var group, users, childGroup, childUsers;

                beforeEach(function() {
                    Ext.define('spec.Group', {
                        extend: 'Ext.data.Model',
                        fields: ['name'],
                        manyToMany: 'User'
                    });
                });

                afterEach(function() {
                    Ext.undefine('spec.Group');
                    group = users = childGroup = childUsers;
                });

                describe("store loaded in the parent", function() {
                    beforeEach(function() {
                        group = getAndComplete('Group', 1);
                        users = group.users();
                        users.load();
                        completeRequest([{id: 101}, {id: 102}, {id: 103}]);
                        child = session.spawn();
                        childGroup = child.getRecord('Group', 1);
                        childUsers = childGroup.users();
                    });

                    it("should copy the store from the parent", function() {
                        expect(childUsers.getCount()).toBe(3);
                    });

                    it("should add an existing record to the parent collection", function() {
                        // Gets it in the parent, we get a copy in the child below
                        var user = getAndComplete('User', 104);
                        childUsers.add(child.getRecord('User', 104));
                        child.save();
                        expect(session.getChanges()).toEqual({
                            Group: {
                                users: {
                                    C: {
                                        1: [104]
                                    }
                                }
                            }
                        });
                        expect(users.getCount()).toBe(4);
                        expect(users.getAt(3)).toBe(user);
                    });

                    it("should have a pending add in the parent, not read the record up", function() {
                        var user = getAndComplete('User', 104, child);
                        childUsers.add(user);
                        child.save();
                        expect(session.getChanges()).toEqual({
                            Group: {
                                users: {
                                    C: {
                                        1: [104]
                                    }
                                }
                            }
                        });
                        expect(session.peekRecord('User', 104)).toBeNull();
                        // Doesn't exist yet
                        expect(users.getCount()).toBe(3);
                        // Get it in the parent
                        user = getAndComplete('User', 104);
                        expect(users.getCount()).toBe(4);
                        expect(users.indexOf(user)).toBe(3);
                    });

                    it("should push up a removal", function() {
                        childUsers.removeAt(0);
                        child.save();
                        expect(session.getChanges()).toEqual({
                            Group: {
                                users: {
                                    D: {
                                        1: [101]
                                    }
                                }
                            }
                        });
                        expect(users.getCount()).toBe(2);
                    });
                });

                describe("store not loaded, created in the parent", function() {
                    var user1, user2;
                    beforeEach(function() {
                        group = getAndComplete('Group', 1);
                        users = group.users();
                        user1 = getAndComplete('User', 101);
                        user2 = getAndComplete('User', 102);
                        users.add(user1, user2);

                        child = session.spawn();
                        childGroup = child.getRecord('Group', 1);
                        childUsers = childGroup.users();
                    });

                    afterEach(function() {
                        user1 = user2 = null;
                    });

                    it("should copy the store from the parent", function() {
                        expect(childUsers.getCount()).toBe(2);
                    });

                    it("should add an existing record to the parent collection", function() {
                        // Gets it in the parent, we get a copy in the child below
                        var user = getAndComplete('User', 104);
                        childUsers.add(child.getRecord('User', 104));
                        child.save();
                        expect(session.getChanges()).toEqual({
                            Group: {
                                users: {
                                    C: {
                                        1: [101, 102, 104]
                                    }
                                }
                            }
                        });
                        expect(users.getCount()).toBe(3);
                        expect(users.getAt(2)).toBe(user);
                    });

                    it("should have a pending add in the parent, not read the record up", function() {
                        var user = getAndComplete('User', 104, child);
                        childUsers.add(user);
                        child.save();
                        expect(session.getChanges()).toEqual({
                            Group: {
                                users: {
                                    C: {
                                        1: [101, 102, 104]
                                    }
                                }
                            }
                        });
                        // Doesn't exist yet
                        expect(users.getCount()).toBe(2);
                        // Get it in the parent
                        user = getAndComplete('User', 104);
                        expect(users.getCount()).toBe(3);
                        expect(users.indexOf(user)).toBe(2);
                    });

                    it("should push up a removal", function() {
                        childUsers.removeAt(0);
                        child.save();
                        expect(session.getChanges()).toEqual({
                            Group: {
                                users: {
                                    C: {
                                        1: [102]
                                    }
                                }
                            }
                        });
                        expect(users.getCount()).toBe(1);
                    });
                });

                describe("store loaded in the child", function() {
                    beforeEach(function() {
                        group = getAndComplete('Group', 1);
                        child = session.spawn();
                        childGroup = child.getRecord('Group', 1);
                        childUsers = childGroup.users();
                        childUsers.load();
                        completeRequest([{id: 101}, {id: 102}, {id: 103}]);
                    });

                    it("should add an existing record to the parent collection", function() {
                        // Gets it in the parent, we get a copy in the child below
                        var user = getAndComplete('User', 104);
                        childUsers.add(child.getRecord('User', 104));
                        child.save();
                        expect(session.getChanges()).toEqual({
                            Group: {
                                users: {
                                    C: {
                                        1: [104]
                                    }
                                }
                            }
                        });
                        users = group.users();
                        expect(users.getCount()).toBe(1);
                        expect(users.getAt(0)).toBe(user);
                    });

                    it("should have a pending add in the parent, not read the record up", function() {
                        var user = getAndComplete('User', 104, child);
                        childUsers.add(user);
                        child.save();
                        expect(session.getChanges()).toEqual({
                            Group: {
                                users: {
                                    C: {
                                        1: [104]
                                    }
                                }
                            }
                        });
                        // Doesn't exist yet
                        users = group.users();
                        expect(users.getCount()).toBe(0);
                        // Get it in the parent
                        user = getAndComplete('User', 104);
                        expect(users.getCount()).toBe(1);
                        expect(users.indexOf(user)).toBe(0);
                    });

                    it("should have a pending removal", function() {
                        childUsers.removeAt(0);
                        child.save();
                        expect(session.getChanges()).toEqual({
                            Group: {
                                users: {
                                    D: {
                                        1: [101]
                                    }
                                }
                            }
                        });
                        users = group.users();
                        // We don't have any users in the session
                        expect(users.getCount()).toBe(0);
                        users.load();
                        completeRequest([{id: 101}, {id: 102}, {id: 103}]);
                        // Now that we have loaded, we exclude 101
                        expect(users.getCount()).toBe(2);
                    });
                });

                describe("store not loaded, created in the child", function() {
                    beforeEach(function() {
                        group = getAndComplete('Group', 1);
                        child = session.spawn();
                        childGroup = child.getRecord('Group', 1);
                        childUsers = childGroup.users();
                        user1 = getAndComplete('User', 101, child);
                        user2 = getAndComplete('User', 102, child);
                        childUsers.add(user1, user2);
                    });

                    afterEach(function() {
                        user1 = user2 = null;
                    });

                    it("should add an existing record to the parent collection", function() {
                        // Gets it in the parent, we get a copy in the child below
                        var user = getAndComplete('User', 104);
                        childUsers.add(child.getRecord('User', 104));
                        child.save();
                        expect(session.getChanges()).toEqual({
                            Group: {
                                users: {
                                    C: {
                                        1: [101, 102, 104]
                                    }
                                }
                            }
                        });
                        // 101 & 102 don't exist in the parent, don't read them up
                        users = group.users();
                        expect(users.getCount()).toBe(1);
                        expect(users.getAt(0)).toBe(user);
                    });

                    it("should have a pending add in the parent, not read the record up", function() {
                        child.save();
                        expect(session.getChanges()).toEqual({
                            Group: {
                                users: {
                                    C: {
                                        1: [101, 102]
                                    }
                                }
                            }
                        });
                        // Doesn't exist yet
                        users = group.users();
                        expect(users.getCount()).toBe(0);
                        // Get it in the parent
                        user1 = getAndComplete('User', 101);
                        user2 = getAndComplete('User', 102);
                        expect(users.getCount()).toBe(2);
                        expect(users.indexOf(user1)).toBe(0);
                        expect(users.indexOf(user2)).toBe(1);
                    });
                });

                describe("empty parent", function() {
                    it("should not push up the owning record if it was loaded in the child", function() {
                        child = session.spawn();
                        var group = getAndComplete('Group', 1, child),
                            user = session.createRecord('User');

                        group.users().add(user);
                        child.save();
                        expect(session.peekRecord('Group', 1)).toBeNull();
                    });

                    it("should allow a create", function() {
                        child = session.spawn();
                        var group = getAndComplete('Group', 1, child),
                            user = getAndComplete('User', 101, child);

                        group.users().add(user);
                        child.save();
                        expect(session.getChanges()).toEqual({
                            Group: {
                                users: {
                                    C: {
                                        1: [101]
                                    }
                                }
                            }
                        });
                    });

                    it("should establish a relationship when both parties load", function() {
                        child = session.spawn();
                        var group = getAndComplete('Group', 1, child),
                            user = getAndComplete('User', 101, child);

                        group.users().add(user);
                        child.save();

                        // Load into the parent now
                        group = getAndComplete('Group', 1);
                        user = getAndComplete('User', 101);
                        expect(user.groups().indexOf(group)).toBe(0);

                    });
                });

            });
        });
    });

    describe('Provisional identifiers', function () {
        function makeSuite (title, schema, expectations) {
            describe('Schema with ' + title, function () {
                var Base, Derived;

                beforeEach(function() {
                    schema.setNamespace('spec');
                    Base = Ext.define('spec.Base', {
                        extend: Ext.data.Model,

                        schema: schema,

                        fields: ['id', 'name', 'key']
                    });

                    Derived = Ext.define('spec.Derived', {
                        extend: Base
                    });

                    session = new Ext.data.Session({
                        schema: Base.schema
                    });
                });

                afterEach(function() {
                    Ext.undefine('spec.Base');
                    Ext.undefine('spec.Derived');
                    Base.schema.clear(true);

                    Base = Derived = null;
                });

                describe("record creation", function() {
                    it('should isolate id generation to the session', function () {
                        var standaloneRecord = new Base();

                        var sessionRecord = session.createRecord('Base', {
                            name: 'Don'
                        });

                        expect(standaloneRecord).not.toBe(sessionRecord);
                        expect(sessionRecord.id).toBe(standaloneRecord.id);
                    });

                    it('should track all created records', function () {
                        var a = session.createRecord('Base', {
                            name: 'Don'
                        });
                        expect(a.id).toBe(expectations['B-1']);

                        var b = session.createRecord('Derived', {
                            name: 'Evan'
                        });
                        expect(b.id).toBe(expectations['D-1']);

                        var changes = session.getChanges();

                        expect(changes).toEqual({
                            Base: {
                                C: [{
                                    id: a.id,
                                    name: 'Don'
                                }]
                            },
                            Derived: {
                                C: [{
                                    id: b.id,
                                    name: 'Evan'
                                }]
                            }
                        });
                    });
                }); // record creation
            });
        } // makeSuite

        makeSuite('default identities', Ext.data.Model.schema, {
            'B-1': 'Base-1',
            'D-1': 'Derived-1'
        });

        makeSuite('negative identities', new Ext.data.schema.Schema({
            defaultIdentifier: 'negative'
        }), {
            'B-1': -1,
            'D-1': -1
        });

        makeSuite('sequential identities', new Ext.data.schema.Schema({
            defaultIdentifier: 'sequential'
        }), {
            'B-1': 1,
            'D-1': 1
        });
    });

    describe("Random UUID's", function () {
        var Base, Derived;
        var schema;

        beforeEach(function() {
            if (!schema) {
                schema = new Ext.data.schema.Schema({
                    defaultIdentifier: 'uuid'
                });
            }
            schema.setNamespace('spec');

            Base = Ext.define('spec.Base', {
                extend: Ext.data.Model,

                schema: schema,

                fields: ['id', 'name', 'key']
            });

            session = new Ext.data.Session({
                schema: Base.schema
            });
        });

        afterEach(function() {

            Ext.undefine('spec.Base');
            Ext.undefine('spec.Derived');
            Base.schema.clear(true);

            Base = Derived = null;
        });

        describe("record creation", function() {
            it('should copy identifier reference into the session', function () {
                var standaloneRecord = new Base();

                var sessionRecord = session.createRecord('Base', {
                    name: 'Don'
                });

                expect(standaloneRecord).not.toBe(sessionRecord);
                expect(sessionRecord.id).not.toBe(standaloneRecord.id); // uuid !

                var defaultIdentifier = session.getSchema().getDefaultIdentifier();
                var identA = session.getIdentifier(Base);

                expect(identA).toBe(Base.identifier); // not cloned
                expect(identA).toBe(defaultIdentifier);
                expect(identA).toBe(Ext.data.identifier.Uuid.Global);
            });
        }); // record creation
    }); // Random UUID's

    describe("Sequential UUID's", function () {
        var Base, Derived;
        var schema;

        beforeEach(function() {
            if (!schema) {
                schema = new Ext.data.schema.Schema({
                    defaultIdentifier: {
                        type: 'uuid',
                        version: 1,
                        timestamp: 0xDEFACED,
                        salt: 0xBEEFF00D,
                        clockSeq: 0xBAD
                    }
                });
            }
            schema.setNamespace('spec');

            Base = Ext.define('spec.Base', {
                extend: Ext.data.Model,

                schema: schema,

                fields: ['id', 'name', 'key']
            });

            session = new Ext.data.Session({
                schema: Base.schema
            });
        });

        afterEach(function() {
            Ext.undefine('spec.Base');
            Ext.undefine('spec.Derived');
            Base.schema.clear(true);

            Base = Derived = null;
        });

        describe("record creation", function() {
            it('should copy identifier reference into the session', function () {
                var standaloneRec = new Base();

                var sessionRecord = session.createRecord('Base', {
                    name: 'Don'
                });

                expect(standaloneRec.id).toBe('0defaced-0000-1000-8bad-0100beeff00d');
                expect(sessionRecord.id).toBe('0defacee-0000-1000-8bad-0100beeff00d');
                // changes right here                 ^

                var defaultIdentifier = session.getSchema().getDefaultIdentifier();
                var identA = session.getIdentifier(Base);

                expect(identA).toBe(Base.identifier); // not cloned
                expect(identA).toBe(defaultIdentifier);

                expect(identA).not.toBe(Ext.data.identifier.Uuid.Global);
            });
        }); // record creation
    }); // Sequential UUID's

    describe('Many-to-many associations', function () {
        var User, Group;

        beforeEach(function() {
            Ext.data.Model.schema.setNamespace('spec');

            User = Ext.define('spec.User', {
                extend: Ext.data.Model,

                fields: [ 'name', 'key' ],

                manyToMany: '#Group'
            });

            Group = Ext.define('spec.Group', {
                extend: Ext.data.Model,

                fields: [ 'name', 'key' ]

                // should not need to specify manyToMany here
            });

            session = new Ext.data.Session({
                schema: User.schema
            });
        });

        afterEach(function() {
            Ext.undefine('spec.User');
            Ext.undefine('spec.Group');
            User.schema.clear(true);

            User = Group = null;
        });

        describe("loading a many-to-many", function() {
            it('should load groups for a user', function () {
                var groups = session.getRecord('User', userRufus.id, false).groups();
                groups.load();
                completeRequest(rufusGroups);

                expect(groups.isStore).toBe(true);
                expect(groups.getCount()).toBe(2);
                expect(groups.getById(adminGroup.id)).toBeTruthy();
                expect(groups.getById(peonGroup.id)).toBeTruthy();

                // Some whitebox testing here. We peek into the sessions matrix pool and
                // verify that ids are on the proper "sides".
                var matrix = session.matrices.UserGroups;

                expect(matrix.left.slices[10].members[42]).toEqual([10, 42, 0]);
                expect(matrix.left.slices[10].members[427]).toEqual([10, 427, 0]);

                expect(matrix.right.slices[42].members[10]).toEqual([10, 42, 0]);
                expect(matrix.right.slices[427].members[10]).toEqual([10, 427, 0]);
            });

            it('should load both sides of a matrix', function () {
                var rufusGroupsStore = session.getRecord('User', userRufus.id, false).groups(),
                    adminUsersStore = session.getRecord('Group', adminGroup.id, false).users(),
                    peonUsersStore = session.getRecord('Group', peonGroup.id, false).users();

                rufusGroupsStore.load();
                peonUsersStore.load();
                adminUsersStore.load();

                completeRequest(rufusGroups, 1);
                completeRequest(peonUsers, 2);
                completeRequest(adminUsers, 3);

                expect(rufusGroupsStore.isStore).toBe(true);
                expect(rufusGroupsStore.getCount()).toBe(2);
                expect(rufusGroupsStore.getById(adminGroup.id)).toBeTruthy();
                expect(rufusGroupsStore.getById(peonGroup.id)).toBeTruthy();

                var rufusRec1, rufusRec2;

                expect(adminUsersStore.isStore).toBe(true);
                expect(adminUsersStore.getCount()).toBe(1);
                expect(rufusRec1 = adminUsersStore.getById(userRufus.id)).toBeTruthy();

                expect(peonUsersStore.isStore).toBe(true);
                expect(peonUsersStore.getCount()).toBe(3);
                expect(peonUsersStore.getById(userBill.id)).toBeTruthy();
                expect(peonUsersStore.getById(userTed.id)).toBeTruthy();
                expect(rufusRec2 = peonUsersStore.getById(userRufus.id)).toBeTruthy();

                expect(rufusRec1).toBe(rufusRec2);
            });

            it('should allow editing on both sides of a matrix', function () {
                var billGroupsStore = session.getRecord('User', userBill.id, false).groups(),
                    rufusGroupsStore = session.getRecord('User', userRufus.id, false).groups(),
                    adminUsersStore = session.getRecord('Group', adminGroup.id, false).users(),
                    peonUsersStore = session.getRecord('Group', peonGroup.id, false).users();

                rufusGroupsStore.load();
                billGroupsStore.load();
                peonUsersStore.load();
                adminUsersStore.load();

                completeRequest(rufusGroups, 1);
                completeRequest(billGroups, 2);
                completeRequest(peonUsers, 3);
                completeRequest(adminUsers, 4);

                // Removing Rufus from the adminUsersStore should reflexively remove
                // the adminGroup from rufusGroupsStore.
                expect(rufusGroupsStore.getCount()).toBe(2);
                expect(rufusGroupsStore.getById(adminGroup.id)).toBeTruthy();

                var rufusRec = adminUsersStore.getById(userRufus.id);
                adminUsersStore.remove(rufusRec);

                expect(rufusGroupsStore.getCount()).toBe(1);
                expect(rufusGroupsStore.getById(adminGroup.id)).toBe(null);

                // Adding Bill to the adminUsersStore should reflexively add adminGroup
                // to billGroupsStore
                expect(billGroupsStore.getCount()).toBe(1);
                expect(billGroupsStore.getById(adminGroup.id)).toBe(null);

                var billRec = peonUsersStore.getById(userBill.id);
                adminUsersStore.add(billRec);

                expect(billGroupsStore.getCount()).toBe(2);
                expect(billGroupsStore.getById(adminGroup.id)).toBeTruthy();

                var changes = session.getChanges();
                expect(changes).toEqual({
                    User: {
                        groups: {
                            C: {
                                20: [42]
                            },
                            D: {
                                10: [42]
                            }
                        }
                    }
                });
            }); // should allow editing on both sides of a matrix
        }); // loading a many-to-many
    }); // Many-to-many associations

    describe('transactions', function () {
        var Base, Parent, Child, GrandChild, Group, User;
        var parentData, childData, grandChildData;

        beforeEach(function() {
            Ext.data.Model.schema.setNamespace('spec');

            parentData = [ { id: 1, name: 'parent1', code: 'abc', foo: 42 },
                { id: 2, name: 'parent2', code: 'def', foo: 427 } ];

            childData = [ { id: 10, name: 'child1', parentId: 1 },
                { id: 20, name: 'child2', parentId: 2 } ];

            grandChildData = [ { id: 100, name: 'grand1', childId: 10 },
                { id: 200, name: 'grand2', childId: 20 } ];

            Base = Ext.define('spec.Base', {
                extend: Ext.data.Model
            });

            User = Ext.define('spec.User', {
                extend: Ext.data.Model,

                fields: [ 'name', 'key' ],

                manyToMany: '#Group'
            });

            Group = Ext.define('spec.Group', {
                extend: Ext.data.Model,

                fields: [ 'name', 'key' ]

                // should not need to specify manyToMany here
            });

            Parent = Ext.define('spec.Parent', {
                extend: Base,

                identifier: {
                    type: 'negative'
                },
                fields: [
                    'name',
                    'code',
                    { name: 'foo', critical: true }
                ]
            });

            Child = Ext.define('spec.Child', {
                extend: Base,

                identifier: {
                    type: 'negative',
                    seed: -10
                },
                fields: [
                    'name',
                    { name: 'parentId', reference: 'Parent' }
                ]
            });

            GrandChild = Ext.define('spec.GrandChild', {
                extend: Base,

                identifier: {
                    type: 'negative',
                    seed: -100
                },

                clientIdProperty: 'cid',

                fields: [
                    'name',
                    { name: 'childId', reference: 'Child' }
                ]
            });

            session = new Ext.data.Session({
                schema: Base.schema
            });
        });

        afterEach(function() {
            Ext.undefine('spec.Base');
            Ext.undefine('spec.Parent');
            Ext.undefine('spec.Child');
            Ext.undefine('spec.GrandChild');
            Ext.undefine('spec.Group');
            Ext.undefine('spec.User');

            Ext.data.Model.schema.clear(true);

            session = null;
            Base = Parent = Child = GrandChild = Group = User = null;
        });

        describe('complex transaction', function () {
            var state;

            beforeEach(function () {
                state = {
                    parentRecs: [],
                    childRecs: [],
                    grandChildRecs: []
                };

                Ext.each([0, 1], function (n) {
                    state.grandChildRecs.push(session.createRecord('GrandChild', grandChildData[n]));
                    state.childRecs.push(session.createRecord('Child', childData[n]));
                    state.parentRecs.push(session.createRecord('Parent', parentData[n]));
                });

                // Make some changes - creates, updates and deletes of all types
                state.parentRecs[0].set('code', 'xyz');
                state.childRecs[0].set('name', 'child1a');
                state.grandChildRecs[0].set('name', 'grand1a');

                state.parentRecs[1].drop();
                state.childRecs[1].drop();
                state.grandChildRecs[1].drop();

                state.newParent = session.createRecord('Parent', { name: 'newParent', foo: -42 });
                state.newChild = session.createRecord('Child', { name: 'newChild' });
                state.newGrandChild = session.createRecord('GrandChild');

                state.newChild.setParent(state.newParent);
                state.newGrandChild.setChild(state.newChild);
            });
            afterEach(function () {
                state = null;
            });

            it('should describe the transaction via getChanges', function () {
                // Quick sanity check on pending changes
                var changes = session.getChanges();

                expect(changes).toEqual({
                    Parent: {
                        C: [ { id: -1, name: 'newParent', foo: -42 } ],
                        U: [ { id: 1, code: 'xyz', foo: 42 } ], // foo is a "critical" field
                        D: [ 2 ]
                    },
                    Child: {
                        C: [ { id: -10, name: 'newChild', parentId: -1 } ],
                        U: [ { id: 10, name: 'child1a' } ],
                        D: [ 20 ]
                    },
                    GrandChild: {
                        C: [ { id: -100, childId: -10 } ],
                        U: [ { id: 100, name: 'grand1a' } ],
                        D: [ 200 ]
                    }
                });
            });

            it('should produce a Batch via getSaveBatch', function () {
                var batch = session.getSaveBatch();

                expect(batch.operations.length).toBe(9);

                Ext.each([
                    [ 'create', 'Parent',       [ state.newParent ] ],
                    [ 'create', 'Child',        [ state.newChild ] ],
                    [ 'create', 'GrandChild',   [ state.newGrandChild ] ],

                    [ 'update', 'Parent',       [ state.parentRecs[0] ] ],
                    [ 'update', 'Child',        [ state.childRecs[0] ] ],
                    [ 'update', 'GrandChild',   [ state.grandChildRecs[0] ] ],

                    [ 'destroy', 'GrandChild',  [ state.grandChildRecs[1] ] ],
                    [ 'destroy', 'Child',       [ state.childRecs[1] ] ],
                    [ 'destroy', 'Parent',      [ state.parentRecs[1] ] ]
                ], function (expectedData, index) {
                    var operation = batch.operations[index],
                        str;

                    str = 'operation[' + index + '].action=';
                    expect(str + operation.action).toBe(str + expectedData[0]);

                    str = 'operation[' + index + '].type=';
                    expect(str + operation.entityType.entityName).toBe(str + expectedData[1]);

                    str = 'operation[' + index + '].records=';
                    var actual = Ext.Array.pluck(operation.getRecords(), 'id');
                    actual = Ext.encode(actual);
                    var expected = Ext.Array.pluck(expectedData[2], 'id');
                    expected = Ext.encode(expected);
                    expect(str + actual).toBe(str + expected);
                });
            });

            it('should progress save batch to completion', function () {
                var newGrandChild2 = session.createRecord('GrandChild');

                newGrandChild2.setChild(state.newChild);
                expect(newGrandChild2.id).toBe(-101);
                expect(newGrandChild2.data.childId).toBe(-10);

                var batch = session.getSaveBatch();

                expect(batch.operations.length).toBe(9);

                // These should be in this order so that clientIdProperty can be tested
                // properly - we send the response records in the reverse order to ensure
                // we are not just matching by indexes.
                var createGrandChildRecs = batch.operations[2].getRecords();
                expect(createGrandChildRecs[0]).toBe(state.newGrandChild);
                expect(createGrandChildRecs[1]).toBe(newGrandChild2);

                batch.start();

                // Create Parent
                completeRequest({
                    id: 1000
                });
                expect(state.newParent.id).toBe(1000);
                expect(state.newChild.data.parentId).toBe(1000);

                // Create Child
                completeRequest({
                    id: 2000
                });
                expect(state.newChild.id).toBe(2000);
                expect(state.newGrandChild.data.childId).toBe(2000);
                expect(newGrandChild2.data.childId).toBe(2000);

                // Create GrandChild (respond in reverse order & custom clientIdProperty)
                completeRequest([{
                    cid: newGrandChild2.id,
                    id: 3001
                },{
                    cid: state.newGrandChild.id,
                    id: 3000
                }]);
                expect(state.newGrandChild.id).toBe(3000);
                expect(newGrandChild2.id).toBe(3001);

            });
        }); // complex transaction

        describe('matrix updates', function () {
            it('should be able to create matrix for new record', function () {
                var rufusGroupsStore = session.getRecord('User', userRufus.id, false).groups();
                rufusGroupsStore.load();
                completeRequest(rufusGroups);

                var user = session.createRecord('User');
                var groups = user.groups();
                groups.add(rufusGroupsStore.getAt(0));

                var batch = session.getSaveBatch();
                var changes = session.getChanges();

                expect(batch.operations.length).toBe(1); // Create for new User
                expect(changes).toEqual({
                    User: {
                        C: [{
                            id: 'User-1'
                        }],

                        groups: {
                            C: {
                                'User-1': [ 42 ] // this is the generated id
                            }
                        }
                    }
                });

                batch.start();
                completeRequest({
                    id: 500
                });

                var remainingChanges = session.getChanges();
                expect(remainingChanges).toEqual({
                    User: {
                        groups: {
                            C: {
                                500: [ 42 ]  // make sure the matrix has the newId
                            }
                        }
                    }
                });
            });
        });
    });
});
