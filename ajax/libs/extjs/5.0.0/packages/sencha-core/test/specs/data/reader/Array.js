describe("Ext.data.reader.Array", function() {
    var reader, data, records;

    beforeEach(function() {
        Ext.ClassManager.enableNamespaceParseCache = false;
        Ext.define('spec.SomeModel', {
            extend: 'Ext.data.Model',
            fields: [
               {name: 'floater', type: 'float'},
               {name: 'id'},
               {name: 'totalProp', type: 'integer'},
               {name: 'bool', type: 'boolean'},
               {name: 'msg'}
            ]
        });
        
        Ext.define('spec.MapModel', {
            extend: 'Ext.data.Model',
            fields: [
               {name: 'a', mapping: 1},
               {name: 'b', mapping: 2},
               {name: 'c', mapping: 3},
               {name: 'd', mapping: 4},
               {name: 'e', mapping: 0}
            ]
        });

        reader = new Ext.data.reader.Array({
            model: 'spec.SomeModel'
        });

        data = [
            [ 1.23, 1, 6, true, 'hello' ]
        ];

        records = reader.readRecords(data);
    });
    
    afterEach(function(){
        Ext.ClassManager.enableNamespaceParseCache = true;
        Ext.data.Model.schema.clear();
        Ext.undefine('spec.SomeModel');
        Ext.undefine('spec.MapModel');
    });
    
    it("should find the total number of records", function() {
        expect(records.getTotal()).toEqual(1);
    });

    it("should extract the records correctly", function() {
        var recData = records.getRecords()[0].getData();

        expect(recData.floater).toEqual(data[0][0]);
        expect(recData.id).toEqual(data[0][1]);
        expect(recData.totalProp).toEqual(data[0][2]);
        expect(recData.bool).toEqual(data[0][3]);
        expect(recData.msg).toEqual(data[0][4]);
    });
    
    it("should work with custom index mappings", function(){
        reader = new Ext.data.reader.Array({
            model: 'spec.MapModel'
        });
        records = reader.readRecords(data);
        var recData = records.getRecords()[0].getData();
        
        expect(recData.a).toBe(1);
        expect(recData.b).toBe(6);
        expect(recData.c).toBe(true);
        expect(recData.d).toBe('hello');
        expect(recData.e).toBe(1.23);
    });
});
