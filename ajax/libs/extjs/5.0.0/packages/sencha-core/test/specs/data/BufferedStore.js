describe('Ext.data.BufferedStore', function() {
    var bufferedStore,
        wasCalled = false;

    Ext.ux.ajax.SimManager.init({
        delay: 10, 
        defaultSimlet: null
    }).register({
        '/data/Store/reload': {
            data: (function () {
                var i = 0,
                    recs = [];

                for (; i < 5000; i++) {
                    recs.push({
                        id: i,
                        title: 'Title' + i
                    });
                }

                return recs;
            }()),
            stype: 'json'
        }   
    });

    function createStore(cfg) {
        bufferedStore = new Ext.data.BufferedStore(Ext.apply({
            id: 'store',
            model: 'Foo',
            pageSize: 100,
            proxy: {
                type: 'ajax',
                url: '/data/Store/reload',
                reader: {
                    type: 'json'
                }
            },
            listeners: {
                prefetch: function (store, records, successful, operation) {
                    wasCalled = true;
                }
            }
        }, cfg));
    }

    beforeEach(function() {
        Ext.define('spec.ForumThread', {
            extend: 'Ext.data.Model',
            fields: [
                'title', 'forumtitle', 'forumid', 'username', {
                    name: 'replycount',
                    type: 'int'
                }, {
                    name: 'lastpost',
                    mapping: 'lastpost',
                    type: 'date',
                    dateFormat: 'timestamp'
                },
                'lastposter', 'excerpt', 'threadid'
            ],
            idProperty: 'threadid'
        });
        Ext.define('Foo', {
            extend: 'Ext.data.Model',
            fields: ['id', 'title']
        });
        MockAjaxManager.addMethods();
    });
    
    afterEach(function(){
        MockAjaxManager.removeMethods();
        if (bufferedStore) {
            bufferedStore.destroy();
            bufferedStore = null;
        }
        Ext.data.Model.schema.clear();
        Ext.undefine('spec.ForumThread');
        Ext.undefine('Foo');
        wasCalled = false;
    });
    
    it('should be able to start from any page', function() {
        createStore({
            model: 'spec.ForumThread',
            pageSize: 100,
            proxy: {
                type: 'ajax',
                url: '/data/Store/reload',
                reader: {
                    rootProperty: 'topics',
                    totalProperty: 'totalCount'
                }
            }
        });
        bufferedStore.loadPage(10);

        waitsFor(function() {
            // Wait until all queued page load requests have returned
            // Will load a range *around* the requested page to allow for scrolling.
            return Ext.Object.getKeys(bufferedStore.pageRequests).length === 0;
        });
        runs(function() {
            expect(bufferedStore.currentPage).toBe(10);
            var page10 = bufferedStore.getRange(900, 999);
            expect(page10.length).toBe(100);

            // Page 10 contains records 900 to 999.
            expect(page10[0].get('title')).toEqual('Title900');
            expect(page10[99].get('title')).toEqual('Title999');
        });
    });

    it('should be able to find records in a buffered store', function() {
        createStore({
            model: 'spec.ForumThread',
            pageSize: 100,
            proxy: {
                type: 'ajax',
                url: '/data/Store/reload',
                reader: {
                    rootProperty: 'topics',
                    totalProperty: 'totalCount'
                }
            },
            autoLoad: true
        });

        waitsFor(function() {
            return bufferedStore.getCount();
        });
        runs(function() {
            expect(bufferedStore.findBy(function(rec) {
                return rec.get('title') === 'Title10';
            })).toEqual(10);

            expect(bufferedStore.findExact('title', 'Title10')).toEqual(10);

            expect(bufferedStore.find('title', 'title10')).toEqual(10);
        });
    });

    it("should clear the data when calling sort with parameters when remote sorting", function() {
        bufferedStore = new Ext.data.BufferedStore({
            model: 'spec.ForumThread',
            pageSize: 100,
            proxy: {
                type: 'ajax',
                url: '/data/Store/reload',
                reader: {
                    rootProperty: 'topics',
                    totalProperty: 'totalCount'
                }
            }
        });
        bufferedStore.load();
        waitsFor(function() {
            return bufferedStore.getCount();
        });
        runs(function() {
            bufferedStore.sort();
            expect(bufferedStore.getCount()).toBe(0);
            waitsFor(function() {
                return bufferedStore.getCount();
            });
            runs(function() {
                expect(bufferedStore.getCount()).toBe(100);
            });
        });
    });

    it('should load the store when filtered', function() {
         var loaded = false;

        createStore({
            model: 'spec.ForumThread',
            pageSize: 5,
            viewSize: 100,
            proxy: {
                type: 'ajax',
                url: '/data/Store/reload',
                reader: {
                    rootProperty: 'topics',
                    totalProperty: 'totalCount'
                }
            },
            autoLoad: false,
            listeners: {
                load: function() {
                    loaded = true;
                }
            }
        });

        // Filter mutation shuold trigger a load
        bufferedStore.filter('title', 'panel');

        waitsFor(function() {
            return loaded;
        });
   });

    it('should load the store when sorted', function() {
         var loaded = false;

        createStore({
            model: 'spec.ForumThread',
            pageSize: 5,
            viewSize: 100,
            proxy: {
                type: 'ajax',
                url: '/data/Store/reload',
                reader: {
                    rootProperty: 'topics',
                    totalProperty: 'totalCount'
                }
            },
            autoLoad: false,
            listeners: {
                load: function() {
                    loaded = true;
                }
            }
        });

        // Sorter mutation shuold trigger a load
        bufferedStore.sort('title', 'ASC');

        waitsFor(function() {
            return loaded;
        });
   });

    // Test for https://sencha.jira.com/browse/EXTJSIV-10338
    // purgePageCount ensured that the viewSize could never be satisfied
    // by small pages because they would keep being pruned.
    it('should load the requested range when the pageSize is small', function() {
        var loaded = false;

        createStore({
            model: 'spec.ForumThread',
            pageSize: 5,
            viewSize: 100,
            proxy: {
                type: 'ajax',
                url: '/data/Store/reload',
                reader: {
                    rootProperty: 'topics',
                    totalProperty: 'totalCount'
                }
            },
            autoLoad: true,
            listeners: {
                load: function() {
                    loaded = true;
                }
            }
        });

        waitsFor(function() {
            return loaded;
        });
    });

    describe('load', function () {
        it("should pass the records loaded, the operation & success to the callback", function() {
            var arg1, arg2, arg3;
            bufferedStore = new Ext.data.BufferedStore({
                model: 'spec.ForumThread',
                pageSize: 100,
                proxy: {
                    type: 'ajax',
                    url: 'url',
                    reader: {
                        type: 'json'
                    }
                }
            });

            bufferedStore.load({
                // Called after first prefetch and first page has been added.
                callback: function (a, b, c) {
                    arg1 = a;
                    arg2 = b;
                    arg3 = c;
                }
            });
            Ext.Ajax.mockComplete({
                status: 200,
                responseText: Ext.JSON.encode([{}])
            });
            expect(Ext.isArray(arg1)).toBe(true);
            expect(arg1[0].isModel).toBe(true);

            expect(arg2.action).toBe('read');
            expect(arg2.$className).toBe('Ext.data.operation.Read');

            expect(arg3).toBe(true);

        });

        describe('should assign dataset index numbers to the records in the Store dependent upon configured pageSize', function () {
            var endIndex;

            it('should not exceed 100 records', function () {
                createStore();

                bufferedStore.load({
                    // Called after first prefetch and first page has been added.
                    callback: function (records) {
                        wasCalled = true;
                        endIndex = records.length - 1;
                    }
                });

                waitsFor(function () {
                    return wasCalled;
                });

                runs(function () {
                    expect(bufferedStore.getAt(0).index).toBe(0);
                    expect(bufferedStore.getAt(99).index).toBe(99);
                    expect(endIndex).toBe(99);
                });
            });

            it('should not exceed 50 records', function () {
                createStore({
                    pageSize: 50
                });

                bufferedStore.load({
                    // Called after first prefetch and first page has been added.
                    callback: function (records, startIdx, endIdx, options) {
                        wasCalled = true;
                        endIndex = records.length - 1;
                    }
                });

                waitsFor(function () {
                    return wasCalled;
                });

                runs(function () {
                    expect(bufferedStore.getAt(0).index).toBe(0);
                    expect(bufferedStore.getAt(49).index).toBe(49);
                    expect(endIndex).toBe(49);
                });
            });
        });
    });

    describe('reload', function () {
        it('should not increase the number of pages when reloading', function () {
            var firstCallLn;

            createStore({
                autoLoad: true
            });

            waitsFor(function () {
                return wasCalled;
            });

            runs(function () {
                wasCalled = false;
                bufferedStore.reload();
            });

            waitsFor(function () {
                return wasCalled;
            });

            runs(function () {
                firstCallLn = bufferedStore.data.length;
                wasCalled = false;
                bufferedStore.reload();
            });

            waitsFor(function () {
                return wasCalled;
            });

            runs(function () {
                expect(bufferedStore.data.length).toBe(firstCallLn);
            });
        });
    });
});