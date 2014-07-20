describe("Ext.data.ResultSet", function() {
    var resultset,
        ModelManager = Ext.data.ModelManager,
        ResultSet = Ext.data.ResultSet;
    
    beforeEach(function() {
        Ext.ClassManager.enableNamespaceParseCache = false;
    });
    
    afterEach(function(){
        Ext.ClassManager.enableNamespaceParseCache = true; 
        Ext.data.Model.schema.clear();
        Ext.undefine('spec.User');
    });
    
    describe("instantiation with records", function(){

        var config, nico, flo;

        beforeEach(function(){
            Ext.define('spec.User', {
                extend: 'Ext.data.Model',
                fields: [
                    {name: 'name',  type: 'string'}
                ]
            });

            nico = new spec.User({name: 'nico'});
            flo = new spec.User({name: 'flo'});

            config = {
                records: [nico, flo]
            };
        });

        it("should have count equal to records.length", function(){
            resultset = new ResultSet(config);
            expect(resultset.getLoaded()).toBe(true);
            expect(resultset.getCount()).toEqual(2);
            expect(resultset.getTotal()).toBeNull();
            expect(resultset.getSuccess()).toBe(false);
        });

    });

    describe("instantiation without records and with a count", function(){
        var config = {count: 16};

        it("should have correct configuration options", function(){
            resultset = new ResultSet(config);
            expect(resultset.getLoaded()).toBe(true);
            expect(resultset.getCount()).toEqual(16);
            expect(resultset.getTotal()).toBeNull();
            expect(resultset.getSuccess()).toBe(false);
        });

    });
});
