describe("Ext.data.soap.Reader", function() {

    var parseXml = function(str) {
            if (window.ActiveXObject) {
                var doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.loadXML(str);
                return doc;
            } else if (window.DOMParser) {
                return (new DOMParser()).parseFromString(str, 'text/xml');
            }
        },
        getEnvelope = function(str){
            str = ['<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">',
                       '<soap:Body>',
                           str,
                       '</soap:Body>',
                   '</soap:Envelope>'].join('\n');
            return parseXml(str);
        };

    describe("getData", function() {
        it("should extract the soap body from the soap envelope", function() {
            var reader = new Ext.data.soap.Reader(),
                doc = getEnvelope('<Results></Results>');

            expect(reader.getData(doc).tagName).toBe('soap:Body');
        });
    });
});