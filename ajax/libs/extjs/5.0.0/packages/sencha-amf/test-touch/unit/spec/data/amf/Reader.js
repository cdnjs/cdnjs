describe("Ext.data.amf.Reader", function() {
    var reader;

    beforeEach(function() {
        Ext.define('spec.Engineer', {
            extend: 'Ext.data.Model',
            fields: ['name']
        });
        reader = new Ext.data.amf.Reader({model: spec.Engineer});
    });

    afterEach(function() {
        Ext.ModelManager.types = {};
        Ext.undefine('spec.Engineer');
    });

    it("should read records in AMF0 format", function() {
        var resultSet = reader.read({ responseBytes: [
            0,0,0,0,0,1,0,16,109,101,115,115,97,103,101,47,111,110,82,101,115,
            117,108,116,0,4,110,117,108,108,0,0,0,0,10,0,0,0,3,3,0,2,105,100,0,
            63,240,0,0,0,0,0,0,0,4,110,97,109,101,2,0,4,80,104,105,108,0,0,9,3,
            0,2,105,100,0,64,0,0,0,0,0,0,0,0,4,110,97,109,101,2,0,3,68,111,110,
            0,0,9,3,0,2,105,100,0,64,8,0,0,0,0,0,0,0,4,110,97,109,101,2,0,5,75,
            101,118,105,110,0,0,9
        ]});

        expect(resultSet instanceof Ext.data.ResultSet).toBe(true);

        expect(resultSet.success).toBe(true);
        expect(resultSet.count).toBe(3);

        expect(resultSet.records.length).toBe(3);
        expect(resultSet.records.length).toBe(3);
        expect(resultSet.records[0] instanceof spec.Engineer).toBe(true);
        expect(resultSet.records[0].getId()).toBe(1);
        expect(resultSet.records[0].get('name')).toBe('Phil');
        expect(resultSet.records[1] instanceof spec.Engineer).toBe(true);
        expect(resultSet.records[1].getId()).toBe(2);
        expect(resultSet.records[1].get('name')).toBe('Don');
        expect(resultSet.records[2] instanceof spec.Engineer).toBe(true);
        expect(resultSet.records[2].getId()).toBe(3);
        expect(resultSet.records[2].get('name')).toBe('Kevin');
    });

    it("should read records in AMF0 format when the record root is not the message body", function() {
        reader = new Ext.data.amf.Reader({
            model: spec.Engineer,
            root: 'a.b[1].c'
        });

        var resultSet = reader.read({ responseBytes: [
            0,0,0,0,0,1,0,16,109,101,115,115,97,103,101,47,111,110,82,101,115,
            117,108,116,0,4,110,117,108,108,0,0,0,0,3,0,1,97,3,0,1,98,10,0,0,0,
            2,0,63,240,0,0,0,0,0,0,3,0,1,99,10,0,0,0,3,3,0,2,105,100,0,63,240,0,
            0,0,0,0,0,0,4,110,97,109,101,2,0,4,80,104,105,108,0,0,9,3,0,2,105,
            100,0,64,0,0,0,0,0,0,0,0,4,110,97,109,101,2,0,3,68,111,110,0,0,9,3,
            0,2,105,100,0,64,8,0,0,0,0,0,0,0,4,110,97,109,101,2,0,5,75,101,118,
            105,110,0,0,9,0,0,9,0,0,9,0,0,9
        ]});
    
        expect(resultSet instanceof Ext.data.ResultSet).toBe(true);

        expect(resultSet.success).toBe(true);
        expect(resultSet.count).toBe(3);

        expect(resultSet.records.length).toBe(3);
        expect(resultSet.records.length).toBe(3);
        expect(resultSet.records[0] instanceof spec.Engineer).toBe(true);
        expect(resultSet.records[0].getId()).toBe(1);
        expect(resultSet.records[0].get('name')).toBe('Phil');
        expect(resultSet.records[1] instanceof spec.Engineer).toBe(true);
        expect(resultSet.records[1].getId()).toBe(2);
        expect(resultSet.records[1].get('name')).toBe('Don');
        expect(resultSet.records[2] instanceof spec.Engineer).toBe(true);
        expect(resultSet.records[2].getId()).toBe(3);
        expect(resultSet.records[2].get('name')).toBe('Kevin');
    });

    it("should read records in AMF3 format", function() {
        var resultSet = reader.read({ responseBytes: [
            0,3,0,0,0,1,0,16,109,101,115,115,97,103,101,47,111,110,82,101,115,
            117,108,116,0,4,110,117,108,108,0,0,0,0,17,9,7,1,10,11,1,5,105,100,
            4,1,9,110,97,109,101,6,9,80,104,105,108,1,10,1,0,4,2,2,6,7,68,111,
            110,1,10,1,0,4,3,2,6,11,75,101,118,105,110,1
        ]});

        expect(resultSet instanceof Ext.data.ResultSet).toBe(true);

        expect(resultSet.success).toBe(true);
        expect(resultSet.count).toBe(3);

        expect(resultSet.records.length).toBe(3);
        expect(resultSet.records.length).toBe(3);
        expect(resultSet.records[0] instanceof spec.Engineer).toBe(true);
        expect(resultSet.records[0].getId()).toBe(1);
        expect(resultSet.records[0].get('name')).toBe('Phil');
        expect(resultSet.records[1] instanceof spec.Engineer).toBe(true);
        expect(resultSet.records[1].getId()).toBe(2);
        expect(resultSet.records[1].get('name')).toBe('Don');
        expect(resultSet.records[2] instanceof spec.Engineer).toBe(true);
        expect(resultSet.records[2].getId()).toBe(3);
        expect(resultSet.records[2].get('name')).toBe('Kevin');
    });

    it("should return a null result set if there are no data in the response", function() {
        runs(function() {
            var resultSet = reader.read({ responseBytes: [] });

            expect(resultSet instanceof Ext.data.ResultSet).toBe(true);
            expect(resultSet.total).toBe(0);
            expect(resultSet.count).toBe(0);
            expect(resultSet.records).toEqual([]);
            expect(resultSet.success).toBe(true);
        });
    });
});
