describe("Ext.util.Base64", function() {

    describe("encode", function() {
        it("should encode string to base64 represenatation", function() {
            expect(Ext.util.Base64.encode("abcdefghijklmnopqrstuvwxyz")).toBe("YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXo=");
            expect(Ext.util.Base64.encode("ABCDEFGHIJKLMNOPQRSTUVWXYZ")).toBe("QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVo=");
            expect(Ext.util.Base64.encode("0123456789")).toBe("MDEyMzQ1Njc4OQ==");
            expect(Ext.util.Base64.encode("~-=+?.,<>[]{}!@#$%^&*()")).toBe("fi09Kz8uLDw+W117fSFAIyQlXiYqKCk=");
            expect(Ext.util.Base64.encode("ēūīļķģšāžčņĒŪĪĻĶĢŠĀŽČŅ")).toBe("xJPFq8SrxLzEt8SjxaHEgcW+xI3FhsSSxarEqsS7xLbEosWgxIDFvcSMxYU=");
            expect(Ext.util.Base64.encode("яшертыуиопюжэасдфгчйклзхцвбнмщьъ")).toBe("0Y/RiNC10YDRgtGL0YPQuNC+0L/RjtC20Y3QsNGB0LTRhNCz0YfQudC60LvQt9GF0YbQstCx0L3QvNGJ0YzRig==");
        });
    });

    describe("decode", function() {
        it("should decode base64 string", function() {
            expect(Ext.util.Base64.decode("YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXo=")).toBe("abcdefghijklmnopqrstuvwxyz");
            expect(Ext.util.Base64.decode("QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVo=")).toBe("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
            expect(Ext.util.Base64.decode("MDEyMzQ1Njc4OQ==")).toBe("0123456789");
            expect(Ext.util.Base64.decode("fi09Kz8uLDw+W117fSFAIyQlXiYqKCk=")).toBe("~-=+?.,<>[]{}!@#$%^&*()");
            expect(Ext.util.Base64.decode("xJPFq8SrxLzEt8SjxaHEgcW+xI3FhsSSxarEqsS7xLbEosWgxIDFvcSMxYU=")).toBe("ēūīļķģšāžčņĒŪĪĻĶĢŠĀŽČŅ");
            expect(Ext.util.Base64.decode("0Y/RiNC10YDRgtGL0YPQuNC+0L/RjtC20Y3QsNGB0LTRhNCz0YfQudC60LvQt9GF0YbQstCx0L3QvNGJ0YzRig==")).toBe("яшертыуиопюжэасдфгчйклзхцвбнмщьъ");
        });
    });

});
