/**
 * lightservice - Simple and convinient interface for service consumption
 * @version v9.1.0
 * @link https://github.com/contactsamie/LightService
 * @license MIT
 * @license Samuel Bamgboye <contactsamie@gmail.com> 
 */


 var module_exists = function (name) {
        try {
            return (typeof require === "function") && require(name);
        }
        catch (e) { return false }
    }

    var light = module_exists('../src/lightservice') || module_exists('lightservice')||light;

   

var timemachine = (function () {


    light.service("timemachine_next", function (arg) {
        var records = this.service().timemachine_record();
        var pointer = this.service().timemachine_pointer();
        pointer = pointer - 2;
        this.service().timemachine_pointer(pointer);

        pointer === 1 ? this.service().timemachine_last() : this.service().timemachine_point(pointer);
    });
    light.service("timemachine_previous", function (arg) {
        var records = this.service().timemachine_record();
        var recordLength = records.length;
        var pointer = this.service().timemachine_pointer();
        pointer = pointer + 2;
        this.service().timemachine_pointer(pointer);

        pointer >= recordLength ? this.service().timemachine_first() : this.service().timemachine_point(pointer);
    });

    light.service("timemachine_point", function (pointer) {
        this.service().timemachine_pointer(pointer);
        var records = this.service().timemachine_record();
        var recordLength = records.length;
        light.advanced.play(records, recordLength - (1 + pointer), recordLength - pointer);
    });

    light.service("timemachine_last", function (arg) {
        var records = this.service().timemachine_record();
        var recordLength = records.length;
        this.serviceChain().timemachine_pointer(1).result();
        var pointer = this.service().timemachine_pointer();
        light.advanced.play(records, recordLength - (1 + pointer), recordLength - pointer);
    });
    light.service("timemachine_first", function (arg) {
        var records = this.service().timemachine_record();
        var recordLength = records.length;
        this.serviceChain().timemachine_pointer(recordLength - 1).result();
        var pointer = this.service().timemachine_pointer();
        light.advanced.play(records, recordLength - (1 + pointer), recordLength - pointer);
    });

    light.service("timemachine_play", function (arg) {
        var records = this.service().timemachine_record();
        light.advanced.play(records, arg.i, arg.j)
    });

    light.service("timemachine_getLastRecord", function (p) {
        var records = this.service().timemachine_record();
        return records.length ? records[records.length - 1] : [];
    });

    light.service("timemachine_getRecord", function (i) {
        return this.service().timemachine_record()[i];
    });

    light.ServiceDataObject("timemachine_pointer", 1);

    light.ServiceDataList("timemachine_record");

    light.onSystemRecordEvent(function (e) {
        light(function () {
            this.service().timemachine_record(JSON.parse(e));
        });
    });
})();

if (typeof module !== "undefined" && ('exports' in module)) {
    module.exports = timemachine;
}

if (typeof define === 'function' && define.amd) {
    define('light', [], function () { return timemachine; });
}