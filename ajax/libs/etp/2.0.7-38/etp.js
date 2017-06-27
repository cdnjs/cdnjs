(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.etp = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./EtpMessages'));
__export(require('./Util'));

},{"./EtpMessages":2,"./Util":4}],2:[function(require,module,exports){
"use strict";
exports.Schemas = require('./EtpSchemas.js');
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var ChannelDataFrame;
        (function (ChannelDataFrame) {
            var RequestChannelData = (function () {
                function RequestChannelData() {
                    this.uri = '';
                }
                RequestChannelData._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelDataFrame","name":"RequestChannelData","messageType":"1","protocol":"2","senderRole":"consumer","protocolRoles":"producer,consumer","fields":[{"name":"uri","type":"string"},{"name":"fromIndex","type":["null","long"]},{"name":"toIndex","type":["null","long"]}],"fullName":"Energistics.Protocol.ChannelDataFrame.RequestChannelData","depends":[]}');
                RequestChannelData._protocol = 2;
                RequestChannelData._messageTypeId = 1;
                return RequestChannelData;
            }());
            ChannelDataFrame.RequestChannelData = RequestChannelData;
            ChannelDataFrame.MsgRequestChannelData = 1;
        })(ChannelDataFrame = Protocol.ChannelDataFrame || (Protocol.ChannelDataFrame = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var ChannelStreaming;
        (function (ChannelStreaming) {
            var ChannelDelete = (function () {
                function ChannelDelete() {
                    this.channelId = 0;
                }
                ChannelDelete._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelDelete","messageType":"8","protocol":"1","senderRole":"producer","protocolRoles":"producer,consumer","fields":[{"name":"channelId","type":"long"},{"name":"deleteReason","type":["null","string"]}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelDelete","depends":[]}');
                ChannelDelete._protocol = 1;
                ChannelDelete._messageTypeId = 8;
                return ChannelDelete;
            }());
            ChannelStreaming.ChannelDelete = ChannelDelete;
            ChannelStreaming.MsgChannelDelete = 8;
        })(ChannelStreaming = Protocol.ChannelStreaming || (Protocol.ChannelStreaming = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var ChannelStreaming;
        (function (ChannelStreaming) {
            var ChannelDescribe = (function () {
                function ChannelDescribe() {
                    this.uris = [];
                }
                ChannelDescribe._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelDescribe","messageType":"1","protocol":"1","senderRole":"consumer","protocolRoles":"producer,consumer","fields":[{"name":"uris","type":{"type":"array","items":"string"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelDescribe","depends":[]}');
                ChannelDescribe._protocol = 1;
                ChannelDescribe._messageTypeId = 1;
                return ChannelDescribe;
            }());
            ChannelStreaming.ChannelDescribe = ChannelDescribe;
            ChannelStreaming.MsgChannelDescribe = 1;
        })(ChannelStreaming = Protocol.ChannelStreaming || (Protocol.ChannelStreaming = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var ChannelStreaming;
        (function (ChannelStreaming) {
            var ChannelStreamingStop = (function () {
                function ChannelStreamingStop() {
                    this.channels = [];
                }
                ChannelStreamingStop._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelStreamingStop","messageType":"5","protocol":"1","senderRole":"consumer","protocolRoles":"producer,consumer","fields":[{"name":"channels","type":{"type":"array","items":"long"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelStreamingStop","depends":[]}');
                ChannelStreamingStop._protocol = 1;
                ChannelStreamingStop._messageTypeId = 5;
                return ChannelStreamingStop;
            }());
            ChannelStreaming.ChannelStreamingStop = ChannelStreamingStop;
            ChannelStreaming.MsgChannelStreamingStop = 5;
        })(ChannelStreaming = Protocol.ChannelStreaming || (Protocol.ChannelStreaming = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var ChannelStreaming;
        (function (ChannelStreaming) {
            var Start = (function () {
                function Start() {
                    this.maxMessageRate = 0;
                    this.maxDataItems = 0;
                }
                Start._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"Start","messageType":"0","protocol":"1","senderRole":"consumer","protocolRoles":"producer,consumer","fields":[{"name":"maxMessageRate","type":"int"},{"name":"maxDataItems","type":"int"}],"fullName":"Energistics.Protocol.ChannelStreaming.Start","depends":[]}');
                Start._protocol = 1;
                Start._messageTypeId = 0;
                return Start;
            }());
            ChannelStreaming.Start = Start;
            ChannelStreaming.MsgStart = 0;
        })(ChannelStreaming = Protocol.ChannelStreaming || (Protocol.ChannelStreaming = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var Discovery;
        (function (Discovery) {
            var GetResources = (function () {
                function GetResources() {
                    this.uri = '';
                }
                GetResources._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Discovery","name":"GetResources","messageType":"1","protocol":"3","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uri","type":"string"}],"fullName":"Energistics.Protocol.Discovery.GetResources","depends":[]}');
                GetResources._protocol = 3;
                GetResources._messageTypeId = 1;
                return GetResources;
            }());
            Discovery.GetResources = GetResources;
            Discovery.MsgGetResources = 1;
        })(Discovery = Protocol.Discovery || (Protocol.Discovery = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var DataArray;
        (function (DataArray) {
            var GetDataArraySlice = (function () {
                function GetDataArraySlice() {
                    this.uri = '';
                    this.start = [];
                    this.count = [];
                }
                GetDataArraySlice._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.DataArray","name":"GetDataArraySlice","messageType":"3","protocol":"7","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uri","type":"string"},{"name":"start","type":{"type":"array","items":"long"}},{"name":"count","type":{"type":"array","items":"long"}}],"fullName":"Energistics.Protocol.DataArray.GetDataArraySlice","depends":[]}');
                GetDataArraySlice._protocol = 7;
                GetDataArraySlice._messageTypeId = 3;
                return GetDataArraySlice;
            }());
            DataArray.GetDataArraySlice = GetDataArraySlice;
            DataArray.MsgGetDataArraySlice = 3;
        })(DataArray = Protocol.DataArray || (Protocol.DataArray = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var DataArray;
        (function (DataArray) {
            var GetDataArray = (function () {
                function GetDataArray() {
                    this.uri = '';
                }
                GetDataArray._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.DataArray","name":"GetDataArray","messageType":"2","protocol":"7","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uri","type":"string"}],"fullName":"Energistics.Protocol.DataArray.GetDataArray","depends":[]}');
                GetDataArray._protocol = 7;
                GetDataArray._messageTypeId = 2;
                return GetDataArray;
            }());
            DataArray.GetDataArray = GetDataArray;
            DataArray.MsgGetDataArray = 2;
        })(DataArray = Protocol.DataArray || (Protocol.DataArray = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var Core;
        (function (Core) {
            var Acknowledge = (function () {
                function Acknowledge() {
                }
                Acknowledge._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Core","name":"Acknowledge","messageType":"1001","protocol":"0","senderRole":"*","protocolRoles":"client,server","fields":[],"fullName":"Energistics.Protocol.Core.Acknowledge","depends":[]}');
                Acknowledge._protocol = 0;
                Acknowledge._messageTypeId = 1001;
                return Acknowledge;
            }());
            Core.Acknowledge = Acknowledge;
            Core.MsgAcknowledge = 1001;
        })(Core = Protocol.Core || (Protocol.Core = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var Core;
        (function (Core) {
            var CloseSession = (function () {
                function CloseSession() {
                }
                CloseSession._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Core","name":"CloseSession","messageType":"5","protocol":"0","senderRole":"client,server","protocolRoles":"client,server","fields":[{"name":"reason","type":["null","string"]}],"fullName":"Energistics.Protocol.Core.CloseSession","depends":[]}');
                CloseSession._protocol = 0;
                CloseSession._messageTypeId = 5;
                return CloseSession;
            }());
            Core.CloseSession = CloseSession;
            Core.MsgCloseSession = 5;
        })(Core = Protocol.Core || (Protocol.Core = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var Core;
        (function (Core) {
            var ProtocolException = (function () {
                function ProtocolException() {
                    this.errorCode = 0;
                    this.errorMessage = '';
                }
                ProtocolException._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Core","name":"ProtocolException","messageType":"1000","protocol":"0","senderRole":"*","protocolRoles":"client,server","fields":[{"name":"errorCode","type":"int"},{"name":"errorMessage","type":"string"}],"fullName":"Energistics.Protocol.Core.ProtocolException","depends":[]}');
                ProtocolException._protocol = 0;
                ProtocolException._messageTypeId = 1000;
                return ProtocolException;
            }());
            Core.ProtocolException = ProtocolException;
            Core.MsgProtocolException = 1000;
        })(Core = Protocol.Core || (Protocol.Core = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var Store;
        (function (Store) {
            var DeleteObject = (function () {
                function DeleteObject() {
                    this.uri = [];
                }
                DeleteObject._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Store","name":"DeleteObject","messageType":"3","protocol":"4","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uri","type":{"type":"array","items":"string"}}],"fullName":"Energistics.Protocol.Store.DeleteObject","depends":[]}');
                DeleteObject._protocol = 4;
                DeleteObject._messageTypeId = 3;
                return DeleteObject;
            }());
            Store.DeleteObject = DeleteObject;
            Store.MsgDeleteObject = 3;
        })(Store = Protocol.Store || (Protocol.Store = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var Store;
        (function (Store) {
            var GetObject = (function () {
                function GetObject() {
                    this.uri = '';
                }
                GetObject._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Store","name":"GetObject","messageType":"1","protocol":"4","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uri","type":"string"}],"fullName":"Energistics.Protocol.Store.GetObject","depends":[]}');
                GetObject._protocol = 4;
                GetObject._messageTypeId = 1;
                return GetObject;
            }());
            Store.GetObject = GetObject;
            Store.MsgGetObject = 1;
        })(Store = Protocol.Store || (Protocol.Store = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var GrowingObject;
        (function (GrowingObject) {
            var GrowingObjectDelete = (function () {
                function GrowingObjectDelete() {
                    this.uuid = '';
                    this.uid = '';
                }
                GrowingObjectDelete._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.GrowingObject","name":"GrowingObjectDelete","messageType":"1","protocol":"6","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uuid","type":"string"},{"name":"uid","type":"string"}],"fullName":"Energistics.Protocol.GrowingObject.GrowingObjectDelete","depends":[]}');
                GrowingObjectDelete._protocol = 6;
                GrowingObjectDelete._messageTypeId = 1;
                return GrowingObjectDelete;
            }());
            GrowingObject.GrowingObjectDelete = GrowingObjectDelete;
            GrowingObject.MsgGrowingObjectDelete = 1;
        })(GrowingObject = Protocol.GrowingObject || (Protocol.GrowingObject = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var GrowingObject;
        (function (GrowingObject) {
            var GrowingObjectDeleteRange = (function () {
                function GrowingObjectDeleteRange() {
                    this.uuid = '';
                    this.startIndex = 0;
                    this.endIndex = 0;
                }
                GrowingObjectDeleteRange._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.GrowingObject","name":"GrowingObjectDeleteRange","messageType":"2","protocol":"6","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uuid","type":"string"},{"name":"startIndex","type":"long"},{"name":"endIndex","type":"long"}],"fullName":"Energistics.Protocol.GrowingObject.GrowingObjectDeleteRange","depends":[]}');
                GrowingObjectDeleteRange._protocol = 6;
                GrowingObjectDeleteRange._messageTypeId = 2;
                return GrowingObjectDeleteRange;
            }());
            GrowingObject.GrowingObjectDeleteRange = GrowingObjectDeleteRange;
            GrowingObject.MsgGrowingObjectDeleteRange = 2;
        })(GrowingObject = Protocol.GrowingObject || (Protocol.GrowingObject = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var GrowingObject;
        (function (GrowingObject) {
            var GrowingObjectGet = (function () {
                function GrowingObjectGet() {
                    this.uuid = '';
                    this.uid = '';
                }
                GrowingObjectGet._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.GrowingObject","name":"GrowingObjectGet","messageType":"3","protocol":"6","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uuid","type":"string"},{"name":"uid","type":"string"}],"fullName":"Energistics.Protocol.GrowingObject.GrowingObjectGet","depends":[]}');
                GrowingObjectGet._protocol = 6;
                GrowingObjectGet._messageTypeId = 3;
                return GrowingObjectGet;
            }());
            GrowingObject.GrowingObjectGet = GrowingObjectGet;
            GrowingObject.MsgGrowingObjectGet = 3;
        })(GrowingObject = Protocol.GrowingObject || (Protocol.GrowingObject = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var GrowingObject;
        (function (GrowingObject) {
            var GrowingObjectPut = (function () {
                function GrowingObjectPut() {
                    this.uuid = '';
                    this.contentType = '';
                    this.contentEncoding = '';
                    this.data = '';
                }
                GrowingObjectPut._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.GrowingObject","name":"GrowingObjectPut","messageType":"5","protocol":"6","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uuid","type":"string"},{"name":"contentType","type":"string"},{"name":"contentEncoding","type":"string"},{"name":"data","type":"bytes"}],"fullName":"Energistics.Protocol.GrowingObject.GrowingObjectPut","depends":[]}');
                GrowingObjectPut._protocol = 6;
                GrowingObjectPut._messageTypeId = 5;
                return GrowingObjectPut;
            }());
            GrowingObject.GrowingObjectPut = GrowingObjectPut;
            GrowingObject.MsgGrowingObjectPut = 5;
        })(GrowingObject = Protocol.GrowingObject || (Protocol.GrowingObject = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var GrowingObject;
        (function (GrowingObject) {
            var GrowingObjectGetRange = (function () {
                function GrowingObjectGetRange() {
                    this.uuid = '';
                    this.startIndex = 0;
                    this.endIndex = 0;
                }
                GrowingObjectGetRange._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.GrowingObject","name":"GrowingObjectGetRange","messageType":"4","protocol":"6","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uuid","type":"string"},{"name":"startIndex","type":"long"},{"name":"endIndex","type":"long"}],"fullName":"Energistics.Protocol.GrowingObject.GrowingObjectGetRange","depends":[]}');
                GrowingObjectGetRange._protocol = 6;
                GrowingObjectGetRange._messageTypeId = 4;
                return GrowingObjectGetRange;
            }());
            GrowingObject.GrowingObjectGetRange = GrowingObjectGetRange;
            GrowingObject.MsgGrowingObjectGetRange = 4;
        })(GrowingObject = Protocol.GrowingObject || (Protocol.GrowingObject = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var GrowingObject;
        (function (GrowingObject) {
            var ObjectFragment = (function () {
                function ObjectFragment() {
                    this.uuid = '';
                    this.contentType = '';
                    this.contentEncoding = '';
                    this.data = '';
                }
                ObjectFragment._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.GrowingObject","name":"ObjectFragment","messageType":"6","protocol":"6","senderRole":"store","protocolRoles":"store,customer","fields":[{"name":"uuid","type":"string"},{"name":"contentType","type":"string"},{"name":"contentEncoding","type":"string"},{"name":"data","type":"bytes"}],"fullName":"Energistics.Protocol.GrowingObject.ObjectFragment","depends":[]}');
                ObjectFragment._protocol = 6;
                ObjectFragment._messageTypeId = 6;
                return ObjectFragment;
            }());
            GrowingObject.ObjectFragment = ObjectFragment;
            GrowingObject.MsgObjectFragment = 6;
        })(GrowingObject = Protocol.GrowingObject || (Protocol.GrowingObject = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var ArrayOfBoolean = (function () {
            function ArrayOfBoolean() {
                this.values = [];
            }
            ArrayOfBoolean._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes","name":"ArrayOfBoolean","fields":[{"name":"values","type":{"type":"array","items":"boolean"}}],"fullName":"Energistics.Datatypes.ArrayOfBoolean","depends":[]}');
            return ArrayOfBoolean;
        }());
        Datatypes.ArrayOfBoolean = ArrayOfBoolean;
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var ArrayOfDouble = (function () {
            function ArrayOfDouble() {
                this.values = [];
            }
            ArrayOfDouble._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes","name":"ArrayOfDouble","fields":[{"name":"values","type":{"type":"array","items":"double"}}],"fullName":"Energistics.Datatypes.ArrayOfDouble","depends":[]}');
            return ArrayOfDouble;
        }());
        Datatypes.ArrayOfDouble = ArrayOfDouble;
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var ArrayOfFloat = (function () {
            function ArrayOfFloat() {
                this.values = [];
            }
            ArrayOfFloat._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes","name":"ArrayOfFloat","fields":[{"name":"values","type":{"type":"array","items":"float"}}],"fullName":"Energistics.Datatypes.ArrayOfFloat","depends":[]}');
            return ArrayOfFloat;
        }());
        Datatypes.ArrayOfFloat = ArrayOfFloat;
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var ArrayOfInt = (function () {
            function ArrayOfInt() {
                this.values = [];
            }
            ArrayOfInt._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes","name":"ArrayOfInt","fields":[{"name":"values","type":{"type":"array","items":"int"}}],"fullName":"Energistics.Datatypes.ArrayOfInt","depends":[]}');
            return ArrayOfInt;
        }());
        Datatypes.ArrayOfInt = ArrayOfInt;
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var ArrayOfLong = (function () {
            function ArrayOfLong() {
                this.values = [];
            }
            ArrayOfLong._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes","name":"ArrayOfLong","fields":[{"name":"values","type":{"type":"array","items":"long"}}],"fullName":"Energistics.Datatypes.ArrayOfLong","depends":[]}');
            return ArrayOfLong;
        }());
        Datatypes.ArrayOfLong = ArrayOfLong;
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var AnyArray = (function () {
            function AnyArray() {
            }
            AnyArray._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes","name":"AnyArray","fields":[{"name":"item","type":["null","Energistics.Datatypes.ArrayOfBoolean","bytes","Energistics.Datatypes.ArrayOfInt","Energistics.Datatypes.ArrayOfLong","Energistics.Datatypes.ArrayOfFloat","Energistics.Datatypes.ArrayOfDouble"]}],"fullName":"Energistics.Datatypes.AnyArray","depends":["Energistics.Datatypes.ArrayOfBoolean","Energistics.Datatypes.ArrayOfInt","Energistics.Datatypes.ArrayOfLong","Energistics.Datatypes.ArrayOfFloat","Energistics.Datatypes.ArrayOfDouble"]}');
            return AnyArray;
        }());
        Datatypes.AnyArray = AnyArray;
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var DataArray;
        (function (DataArray_1) {
            var DataArray = (function () {
                function DataArray() {
                    this.dimensions = [];
                    this.data = new Energistics.Datatypes.AnyArray();
                }
                DataArray._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.DataArray","name":"DataArray","messageType":"1","protocol":"7","senderRole":"store","protocolRoles":"store,customer","fields":[{"name":"dimensions","type":{"type":"array","items":"long"}},{"name":"data","type":"Energistics.Datatypes.AnyArray"}],"fullName":"Energistics.Protocol.DataArray.DataArray","depends":["Energistics.Datatypes.AnyArray"]}');
                DataArray._protocol = 7;
                DataArray._messageTypeId = 1;
                return DataArray;
            }());
            DataArray_1.DataArray = DataArray;
            DataArray_1.MsgDataArray = 1;
        })(DataArray = Protocol.DataArray || (Protocol.DataArray = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var Contact = (function () {
            function Contact() {
            }
            Contact._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes","name":"Contact","fields":[{"name":"organizationName","type":["null","string"]},{"name":"contactName","type":["null","string"]},{"name":"contactPhone","type":["null","string"]},{"name":"contactEmail","type":["null","string"]}],"fullName":"Energistics.Datatypes.Contact","depends":[]}');
            return Contact;
        }());
        Datatypes.Contact = Contact;
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var DataValue = (function () {
            function DataValue() {
            }
            DataValue._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes","name":"DataValue","fields":[{"name":"item","type":["null","double","float","int","long","string","Energistics.Datatypes.ArrayOfDouble","boolean","bytes"]}],"fullName":"Energistics.Datatypes.DataValue","depends":["Energistics.Datatypes.ArrayOfDouble"]}');
            return DataValue;
        }());
        Datatypes.DataValue = DataValue;
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var DataAttribute = (function () {
            function DataAttribute() {
                this.attributeId = 0;
                this.attributeValue = new Energistics.Datatypes.DataValue();
            }
            DataAttribute._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes","name":"DataAttribute","fields":[{"name":"attributeId","type":"int"},{"name":"attributeValue","type":"Energistics.Datatypes.DataValue"}],"fullName":"Energistics.Datatypes.DataAttribute","depends":["Energistics.Datatypes.DataValue"]}');
            return DataAttribute;
        }());
        Datatypes.DataAttribute = DataAttribute;
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var MessageHeader = (function () {
            function MessageHeader() {
                this.protocol = 0;
                this.messageType = 0;
                this.correlationId = 0;
                this.messageId = 0;
                this.messageFlags = 0;
            }
            MessageHeader._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes","name":"MessageHeader","fields":[{"name":"protocol","type":"int"},{"name":"messageType","type":"int"},{"name":"correlationId","type":"long"},{"name":"messageId","type":"long"},{"name":"messageFlags","type":"int"}],"fullName":"Energistics.Datatypes.MessageHeader","depends":[]}');
            return MessageHeader;
        }());
        Datatypes.MessageHeader = MessageHeader;
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        (function (ErrorCodes) {
            ErrorCodes[ErrorCodes["ENOROLE"] = 0] = "ENOROLE";
            ErrorCodes[ErrorCodes["ENOSUPPORTEDPROTOCOLS"] = 1] = "ENOSUPPORTEDPROTOCOLS";
            ErrorCodes[ErrorCodes["EINVALID_MESSAGETYPE"] = 2] = "EINVALID_MESSAGETYPE";
            ErrorCodes[ErrorCodes["EUNSUPPORTED_PROTOCOL"] = 3] = "EUNSUPPORTED_PROTOCOL";
        })(Datatypes.ErrorCodes || (Datatypes.ErrorCodes = {}));
        var ErrorCodes = Datatypes.ErrorCodes;
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        (function (Protocols) {
            Protocols[Protocols["Core"] = 0] = "Core";
            Protocols[Protocols["ChannelStreaming"] = 1] = "ChannelStreaming";
            Protocols[Protocols["ChannelDataFrame"] = 2] = "ChannelDataFrame";
            Protocols[Protocols["Discovery"] = 3] = "Discovery";
            Protocols[Protocols["Store"] = 4] = "Store";
            Protocols[Protocols["StoreNotification"] = 5] = "StoreNotification";
            Protocols[Protocols["GrowingObject"] = 6] = "GrowingObject";
            Protocols[Protocols["DataArray"] = 7] = "DataArray";
        })(Datatypes.Protocols || (Datatypes.Protocols = {}));
        var Protocols = Datatypes.Protocols;
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var Version = (function () {
            function Version() {
                this.major = 0;
                this.minor = 0;
                this.revision = 0;
                this.patch = 0;
            }
            Version._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes","name":"Version","fields":[{"name":"major","type":"int"},{"name":"minor","type":"int"},{"name":"revision","type":"int"},{"name":"patch","type":"int"}],"fullName":"Energistics.Datatypes.Version","depends":[]}');
            return Version;
        }());
        Datatypes.Version = Version;
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var SupportedProtocol = (function () {
            function SupportedProtocol() {
                this.protocol = 0;
                this.protocolVersion = new Energistics.Datatypes.Version();
                this.role = '';
                this.protocolCapabilities = {};
            }
            SupportedProtocol._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes","name":"SupportedProtocol","fields":[{"name":"protocol","type":"int"},{"name":"protocolVersion","type":"Energistics.Datatypes.Version"},{"name":"role","type":"string"},{"name":"protocolCapabilities","type":{"type":"map","values":"Energistics.Datatypes.DataValue"}}],"fullName":"Energistics.Datatypes.SupportedProtocol","depends":["Energistics.Datatypes.Version","Energistics.Datatypes.DataValue"]}');
            return SupportedProtocol;
        }());
        Datatypes.SupportedProtocol = SupportedProtocol;
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var Core;
        (function (Core) {
            var OpenSession = (function () {
                function OpenSession() {
                    this.applicationName = '';
                    this.applicationVersion = '';
                    this.sessionId = '';
                    this.supportedProtocols = [];
                    this.supportedObjects = [];
                }
                OpenSession._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Core","name":"OpenSession","messageType":"2","protocol":"0","senderRole":"server","protocolRoles":"client,server","fields":[{"name":"applicationName","type":"string"},{"name":"applicationVersion","type":"string"},{"name":"sessionId","type":"string"},{"name":"supportedProtocols","type":{"type":"array","items":"Energistics.Datatypes.SupportedProtocol"}},{"name":"supportedObjects","type":{"type":"array","items":"string"}}],"fullName":"Energistics.Protocol.Core.OpenSession","depends":["Energistics.Datatypes.SupportedProtocol"]}');
                OpenSession._protocol = 0;
                OpenSession._messageTypeId = 2;
                return OpenSession;
            }());
            Core.OpenSession = OpenSession;
            Core.MsgOpenSession = 2;
        })(Core = Protocol.Core || (Protocol.Core = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var Core;
        (function (Core) {
            var RequestSession = (function () {
                function RequestSession() {
                    this.applicationName = '';
                    this.applicationVersion = '';
                    this.requestedProtocols = [];
                    this.supportedObjects = [];
                }
                RequestSession._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Core","name":"RequestSession","messageType":"1","protocol":"0","senderRole":"client","protocolRoles":"client,server","fields":[{"name":"applicationName","type":"string"},{"name":"applicationVersion","type":"string"},{"name":"requestedProtocols","type":{"type":"array","items":"Energistics.Datatypes.SupportedProtocol"}},{"name":"supportedObjects","type":{"type":"array","items":"string"}}],"fullName":"Energistics.Protocol.Core.RequestSession","depends":["Energistics.Datatypes.SupportedProtocol"]}');
                RequestSession._protocol = 0;
                RequestSession._messageTypeId = 1;
                return RequestSession;
            }());
            Core.RequestSession = RequestSession;
            Core.MsgRequestSession = 1;
        })(Core = Protocol.Core || (Protocol.Core = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var ServerCapabilities = (function () {
            function ServerCapabilities() {
                this.applicationName = '';
                this.applicationVersion = '';
                this.sessionId = '';
                this.supportedProtocols = [];
                this.supportedObjects = [];
                this.contactInfomration = new Energistics.Datatypes.Contact();
            }
            ServerCapabilities._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes","name":"ServerCapabilities","fields":[{"name":"applicationName","type":"string"},{"name":"applicationVersion","type":"string"},{"name":"sessionId","type":"string"},{"name":"supportedProtocols","type":{"type":"array","items":"Energistics.Datatypes.SupportedProtocol"}},{"name":"supportedObjects","type":{"type":"array","items":"string"}},{"name":"contactInfomration","type":"Energistics.Datatypes.Contact"}],"fullName":"Energistics.Datatypes.ServerCapabilities","depends":["Energistics.Datatypes.SupportedProtocol","Energistics.Datatypes.Contact"]}');
            return ServerCapabilities;
        }());
        Datatypes.ServerCapabilities = ServerCapabilities;
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var ChannelData;
        (function (ChannelData) {
            var ChannelAxis = (function () {
                function ChannelAxis() {
                    this.axisName = '';
                    this.axisPropertyKind = '';
                    this.axisStart = 0;
                    this.axisSpacing = 0;
                    this.axisCount = 0;
                    this.axisUom = '';
                }
                ChannelAxis._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelAxis","fields":[{"name":"axisName","type":"string"},{"name":"axisPropertyKind","type":"string"},{"name":"axisStart","type":"double"},{"name":"axisSpacing","type":"double"},{"name":"axisCount","type":"int"},{"name":"axisUom","type":"string"}],"fullName":"Energistics.Datatypes.ChannelData.ChannelAxis","depends":[]}');
                return ChannelAxis;
            }());
            ChannelData.ChannelAxis = ChannelAxis;
        })(ChannelData = Datatypes.ChannelData || (Datatypes.ChannelData = {}));
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var ChannelData;
        (function (ChannelData) {
            (function (ChannelIndexTypes) {
                ChannelIndexTypes[ChannelIndexTypes["Time"] = 0] = "Time";
                ChannelIndexTypes[ChannelIndexTypes["Depth"] = 1] = "Depth";
            })(ChannelData.ChannelIndexTypes || (ChannelData.ChannelIndexTypes = {}));
            var ChannelIndexTypes = ChannelData.ChannelIndexTypes;
        })(ChannelData = Datatypes.ChannelData || (Datatypes.ChannelData = {}));
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var ChannelData;
        (function (ChannelData) {
            var ChannelRangeInfo = (function () {
                function ChannelRangeInfo() {
                    this.channelId = [];
                    this.startIndex = 0;
                    this.endIndex = 0;
                }
                ChannelRangeInfo._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelRangeInfo","fields":[{"name":"channelId","type":{"type":"array","items":"long"}},{"name":"startIndex","type":"long"},{"name":"endIndex","type":"long"}],"fullName":"Energistics.Datatypes.ChannelData.ChannelRangeInfo","depends":[]}');
                return ChannelRangeInfo;
            }());
            ChannelData.ChannelRangeInfo = ChannelRangeInfo;
        })(ChannelData = Datatypes.ChannelData || (Datatypes.ChannelData = {}));
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var ChannelStreaming;
        (function (ChannelStreaming) {
            var ChannelRangeRequest = (function () {
                function ChannelRangeRequest() {
                    this.channelRanges = [];
                }
                ChannelRangeRequest._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelRangeRequest","messageType":"9","protocol":"1","senderRole":"consumer","protocolRoles":"producer,consumer","fields":[{"name":"channelRanges","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelRangeInfo"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelRangeRequest","depends":["Energistics.Datatypes.ChannelData.ChannelRangeInfo"]}');
                ChannelRangeRequest._protocol = 1;
                ChannelRangeRequest._messageTypeId = 9;
                return ChannelRangeRequest;
            }());
            ChannelStreaming.ChannelRangeRequest = ChannelRangeRequest;
            ChannelStreaming.MsgChannelRangeRequest = 9;
        })(ChannelStreaming = Protocol.ChannelStreaming || (Protocol.ChannelStreaming = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var ChannelData;
        (function (ChannelData) {
            (function (ChannelStatuses) {
                ChannelStatuses[ChannelStatuses["Active"] = 0] = "Active";
                ChannelStatuses[ChannelStatuses["Inactive"] = 1] = "Inactive";
                ChannelStatuses[ChannelStatuses["Closed"] = 2] = "Closed";
            })(ChannelData.ChannelStatuses || (ChannelData.ChannelStatuses = {}));
            var ChannelStatuses = ChannelData.ChannelStatuses;
        })(ChannelData = Datatypes.ChannelData || (Datatypes.ChannelData = {}));
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var ChannelStreaming;
        (function (ChannelStreaming) {
            var ChannelStatusChange = (function () {
                function ChannelStatusChange() {
                    this.channelId = 0;
                    this.status = Energistics.Datatypes.ChannelData.ChannelStatuses.Active;
                }
                ChannelStatusChange._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelStatusChange","messageType":"10","protocol":"1","senderRole":"producer","protocolRoles":"producer,consumer","fields":[{"name":"channelId","type":"long"},{"name":"status","type":"Energistics.Datatypes.ChannelData.ChannelStatuses"}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelStatusChange","depends":["Energistics.Datatypes.ChannelData.ChannelStatuses"]}');
                ChannelStatusChange._protocol = 1;
                ChannelStatusChange._messageTypeId = 10;
                return ChannelStatusChange;
            }());
            ChannelStreaming.ChannelStatusChange = ChannelStatusChange;
            ChannelStreaming.MsgChannelStatusChange = 10;
        })(ChannelStreaming = Protocol.ChannelStreaming || (Protocol.ChannelStreaming = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var ChannelData;
        (function (ChannelData) {
            var DataFrame = (function () {
                function DataFrame() {
                    this.index = [];
                    this.data = [];
                }
                DataFrame._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"DataFrame","fields":[{"name":"index","type":{"type":"array","items":"long"}},{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.DataValue"}}],"fullName":"Energistics.Datatypes.ChannelData.DataFrame","depends":["Energistics.Datatypes.DataValue"]}');
                return DataFrame;
            }());
            ChannelData.DataFrame = DataFrame;
        })(ChannelData = Datatypes.ChannelData || (Datatypes.ChannelData = {}));
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var ChannelDataFrame;
        (function (ChannelDataFrame) {
            var ChannelDataFrameSet = (function () {
                function ChannelDataFrameSet() {
                    this.channels = [];
                    this.data = [];
                }
                ChannelDataFrameSet._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelDataFrame","name":"ChannelDataFrameSet","messageType":"4","protocol":"2","senderRole":"producer","protocolRoles":"producer,consumer","fields":[{"name":"channels","type":{"type":"array","items":"long"}},{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.DataFrame"}}],"fullName":"Energistics.Protocol.ChannelDataFrame.ChannelDataFrameSet","depends":["Energistics.Datatypes.ChannelData.DataFrame"]}');
                ChannelDataFrameSet._protocol = 2;
                ChannelDataFrameSet._messageTypeId = 4;
                return ChannelDataFrameSet;
            }());
            ChannelDataFrame.ChannelDataFrameSet = ChannelDataFrameSet;
            ChannelDataFrame.MsgChannelDataFrameSet = 4;
        })(ChannelDataFrame = Protocol.ChannelDataFrame || (Protocol.ChannelDataFrame = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var ChannelData;
        (function (ChannelData) {
            var DataItem = (function () {
                function DataItem() {
                    this.indexes = [];
                    this.channelId = 0;
                    this.value = new Energistics.Datatypes.DataValue();
                    this.valueAttributes = [];
                }
                DataItem._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"DataItem","fields":[{"name":"indexes","type":{"type":"array","items":"long"}},{"name":"channelId","type":"long"},{"name":"value","type":"Energistics.Datatypes.DataValue"},{"name":"valueAttributes","type":{"type":"array","items":"Energistics.Datatypes.DataAttribute"}}],"fullName":"Energistics.Datatypes.ChannelData.DataItem","depends":["Energistics.Datatypes.DataValue","Energistics.Datatypes.DataAttribute"]}');
                return DataItem;
            }());
            ChannelData.DataItem = DataItem;
        })(ChannelData = Datatypes.ChannelData || (Datatypes.ChannelData = {}));
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var ChannelStreaming;
        (function (ChannelStreaming) {
            var ChannelDataChange = (function () {
                function ChannelDataChange() {
                    this.channelId = 0;
                    this.startIndex = 0;
                    this.endIndex = 0;
                    this.data = [];
                }
                ChannelDataChange._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelDataChange","messageType":"6","protocol":"1","senderRole":"producer","protocolRoles":"producer,consumer","fields":[{"name":"channelId","type":"long"},{"name":"startIndex","type":"long"},{"name":"endIndex","type":"long"},{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.DataItem"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelDataChange","depends":["Energistics.Datatypes.ChannelData.DataItem"]}');
                ChannelDataChange._protocol = 1;
                ChannelDataChange._messageTypeId = 6;
                return ChannelDataChange;
            }());
            ChannelStreaming.ChannelDataChange = ChannelDataChange;
            ChannelStreaming.MsgChannelDataChange = 6;
        })(ChannelStreaming = Protocol.ChannelStreaming || (Protocol.ChannelStreaming = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var ChannelStreaming;
        (function (ChannelStreaming) {
            var ChannelData = (function () {
                function ChannelData() {
                    this.data = [];
                }
                ChannelData._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelData","messageType":"3","protocol":"1","senderRole":"producer","protocolRoles":"producer,consumer","fields":[{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.DataItem"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelData","depends":["Energistics.Datatypes.ChannelData.DataItem"]}');
                ChannelData._protocol = 1;
                ChannelData._messageTypeId = 3;
                return ChannelData;
            }());
            ChannelStreaming.ChannelData = ChannelData;
            ChannelStreaming.MsgChannelData = 3;
        })(ChannelStreaming = Protocol.ChannelStreaming || (Protocol.ChannelStreaming = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var ChannelData;
        (function (ChannelData) {
            (function (ErrorCodes) {
                ErrorCodes[ErrorCodes["EINVALID_URI"] = 0] = "EINVALID_URI";
                ErrorCodes[ErrorCodes["EINVALID_CHANNELID"] = 1] = "EINVALID_CHANNELID";
            })(ChannelData.ErrorCodes || (ChannelData.ErrorCodes = {}));
            var ErrorCodes = ChannelData.ErrorCodes;
        })(ChannelData = Datatypes.ChannelData || (Datatypes.ChannelData = {}));
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var ChannelData;
        (function (ChannelData) {
            (function (IndexDirections) {
                IndexDirections[IndexDirections["Increasing"] = 0] = "Increasing";
                IndexDirections[IndexDirections["Decreasing"] = 1] = "Decreasing";
            })(ChannelData.IndexDirections || (ChannelData.IndexDirections = {}));
            var IndexDirections = ChannelData.IndexDirections;
        })(ChannelData = Datatypes.ChannelData || (Datatypes.ChannelData = {}));
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var ChannelData;
        (function (ChannelData) {
            var IndexMetadataRecord = (function () {
                function IndexMetadataRecord() {
                    this.indexType = Energistics.Datatypes.ChannelData.ChannelIndexTypes.Time;
                    this.uom = '';
                    this.direction = Energistics.Datatypes.ChannelData.IndexDirections.Increasing;
                    this.customData = {};
                    this.scale = 0;
                }
                IndexMetadataRecord._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"IndexMetadataRecord","fields":[{"name":"indexType","type":"Energistics.Datatypes.ChannelData.ChannelIndexTypes"},{"name":"uom","type":"string"},{"name":"depthDatum","type":["null","string"]},{"name":"direction","type":"Energistics.Datatypes.ChannelData.IndexDirections"},{"name":"mnemonic","type":["null","string"]},{"name":"description","type":["null","string"]},{"name":"uri","type":["null","string"]},{"name":"customData","type":{"type":"map","values":"Energistics.Datatypes.DataValue"}},{"name":"scale","type":"int"},{"name":"timeDatum","type":["null","string"]}],"fullName":"Energistics.Datatypes.ChannelData.IndexMetadataRecord","depends":["Energistics.Datatypes.ChannelData.ChannelIndexTypes","Energistics.Datatypes.ChannelData.IndexDirections","Energistics.Datatypes.DataValue"]}');
                return IndexMetadataRecord;
            }());
            ChannelData.IndexMetadataRecord = IndexMetadataRecord;
        })(ChannelData = Datatypes.ChannelData || (Datatypes.ChannelData = {}));
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var ChannelData;
        (function (ChannelData) {
            var ChannelMetadataRecord = (function () {
                function ChannelMetadataRecord() {
                    this.channelUri = '';
                    this.channelId = 0;
                    this.indexes = [];
                    this.mnemonic = '';
                    this.dataType = '';
                    this.uom = '';
                    this.description = '';
                    this.status = Energistics.Datatypes.ChannelData.ChannelStatuses.Active;
                    this.source = '';
                    this.measureClass = '';
                    this.channelAxes = [];
                }
                ChannelMetadataRecord._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelMetadataRecord","fields":[{"name":"channelUri","type":"string"},{"name":"channelId","type":"long"},{"name":"indexes","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.IndexMetadataRecord"}},{"name":"mnemonic","type":"string"},{"name":"dataType","type":"string"},{"name":"uom","type":"string"},{"name":"startIndex","type":["null","long"]},{"name":"endIndex","type":["null","long"]},{"name":"description","type":"string"},{"name":"status","type":"Energistics.Datatypes.ChannelData.ChannelStatuses"},{"name":"contentType","type":["null","string"]},{"name":"source","type":"string"},{"name":"measureClass","type":"string"},{"name":"uuid","type":["null","string"]},{"name":"channelAxes","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelAxis"}}],"fullName":"Energistics.Datatypes.ChannelData.ChannelMetadataRecord","depends":["Energistics.Datatypes.ChannelData.IndexMetadataRecord","Energistics.Datatypes.ChannelData.ChannelStatuses","Energistics.Datatypes.ChannelData.ChannelAxis"]}');
                return ChannelMetadataRecord;
            }());
            ChannelData.ChannelMetadataRecord = ChannelMetadataRecord;
        })(ChannelData = Datatypes.ChannelData || (Datatypes.ChannelData = {}));
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var ChannelDataFrame;
        (function (ChannelDataFrame) {
            var ChannelMetadata = (function () {
                function ChannelMetadata() {
                    this.channels = [];
                }
                ChannelMetadata._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelDataFrame","name":"ChannelMetadata","messageType":"3","protocol":"2","senderRole":"producer","protocolRoles":"producer,consumer","fields":[{"name":"channels","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelMetadataRecord"}}],"fullName":"Energistics.Protocol.ChannelDataFrame.ChannelMetadata","depends":["Energistics.Datatypes.ChannelData.ChannelMetadataRecord"]}');
                ChannelMetadata._protocol = 2;
                ChannelMetadata._messageTypeId = 3;
                return ChannelMetadata;
            }());
            ChannelDataFrame.ChannelMetadata = ChannelMetadata;
            ChannelDataFrame.MsgChannelMetadata = 3;
        })(ChannelDataFrame = Protocol.ChannelDataFrame || (Protocol.ChannelDataFrame = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var ChannelStreaming;
        (function (ChannelStreaming) {
            var ChannelMetadata = (function () {
                function ChannelMetadata() {
                    this.channels = [];
                }
                ChannelMetadata._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelMetadata","messageType":"2","protocol":"1","senderRole":"producer","protocolRoles":"producer,consumer","fields":[{"name":"channels","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelMetadataRecord"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelMetadata","depends":["Energistics.Datatypes.ChannelData.ChannelMetadataRecord"]}');
                ChannelMetadata._protocol = 1;
                ChannelMetadata._messageTypeId = 2;
                return ChannelMetadata;
            }());
            ChannelStreaming.ChannelMetadata = ChannelMetadata;
            ChannelStreaming.MsgChannelMetadata = 2;
        })(ChannelStreaming = Protocol.ChannelStreaming || (Protocol.ChannelStreaming = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var ChannelData;
        (function (ChannelData) {
            var StreamingStartIndex = (function () {
                function StreamingStartIndex() {
                }
                StreamingStartIndex._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"StreamingStartIndex","fields":[{"name":"item","type":["null","int","long"]}],"fullName":"Energistics.Datatypes.ChannelData.StreamingStartIndex","depends":[]}');
                return StreamingStartIndex;
            }());
            ChannelData.StreamingStartIndex = StreamingStartIndex;
        })(ChannelData = Datatypes.ChannelData || (Datatypes.ChannelData = {}));
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var ChannelData;
        (function (ChannelData) {
            var ChannelStreamingInfo = (function () {
                function ChannelStreamingInfo() {
                    this.channelId = 0;
                    this.startIndex = new Energistics.Datatypes.ChannelData.StreamingStartIndex();
                    this.receiveChangeNotification = false;
                }
                ChannelStreamingInfo._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelStreamingInfo","fields":[{"name":"channelId","type":"long"},{"name":"startIndex","type":"Energistics.Datatypes.ChannelData.StreamingStartIndex"},{"name":"receiveChangeNotification","type":"boolean"}],"fullName":"Energistics.Datatypes.ChannelData.ChannelStreamingInfo","depends":["Energistics.Datatypes.ChannelData.StreamingStartIndex"]}');
                return ChannelStreamingInfo;
            }());
            ChannelData.ChannelStreamingInfo = ChannelStreamingInfo;
        })(ChannelData = Datatypes.ChannelData || (Datatypes.ChannelData = {}));
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var ChannelStreaming;
        (function (ChannelStreaming) {
            var ChannelStreamingStart = (function () {
                function ChannelStreamingStart() {
                    this.channels = [];
                }
                ChannelStreamingStart._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelStreamingStart","messageType":"4","protocol":"1","senderRole":"consumer","protocolRoles":"producer,consumer","fields":[{"name":"channels","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelStreamingInfo"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelStreamingStart","depends":["Energistics.Datatypes.ChannelData.ChannelStreamingInfo"]}');
                ChannelStreamingStart._protocol = 1;
                ChannelStreamingStart._messageTypeId = 4;
                return ChannelStreamingStart;
            }());
            ChannelStreaming.ChannelStreamingStart = ChannelStreamingStart;
            ChannelStreaming.MsgChannelStreamingStart = 4;
        })(ChannelStreaming = Protocol.ChannelStreaming || (Protocol.ChannelStreaming = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var ChannelData;
        (function (ChannelData) {
            (function (Roles) {
                Roles[Roles["Producer"] = 0] = "Producer";
                Roles[Roles["Consumer"] = 1] = "Consumer";
            })(ChannelData.Roles || (ChannelData.Roles = {}));
            var Roles = ChannelData.Roles;
        })(ChannelData = Datatypes.ChannelData || (Datatypes.ChannelData = {}));
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var Object;
        (function (Object) {
            var NotificationRequestRecord = (function () {
                function NotificationRequestRecord() {
                    this.uri = '';
                    this.uuid = '';
                    this.includeObjectData = false;
                    this.startTime = 0;
                    this.objectTypes = [];
                }
                NotificationRequestRecord._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.Object","name":"NotificationRequestRecord","fields":[{"name":"uri","type":"string"},{"name":"uuid","type":"string"},{"name":"includeObjectData","type":"boolean"},{"name":"startTime","type":"long"},{"name":"objectTypes","type":{"type":"array","items":"string"}}],"fullName":"Energistics.Datatypes.Object.NotificationRequestRecord","depends":[]}');
                return NotificationRequestRecord;
            }());
            Object.NotificationRequestRecord = NotificationRequestRecord;
        })(Object = Datatypes.Object || (Datatypes.Object = {}));
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var StoreNotification;
        (function (StoreNotification) {
            var NotificationRequest = (function () {
                function NotificationRequest() {
                    this.request = new Energistics.Datatypes.Object.NotificationRequestRecord();
                }
                NotificationRequest._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.StoreNotification","name":"NotificationRequest","messageType":"1","protocol":"5","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"request","type":"Energistics.Datatypes.Object.NotificationRequestRecord"}],"fullName":"Energistics.Protocol.StoreNotification.NotificationRequest","depends":["Energistics.Datatypes.Object.NotificationRequestRecord"]}');
                NotificationRequest._protocol = 5;
                NotificationRequest._messageTypeId = 1;
                return NotificationRequest;
            }());
            StoreNotification.NotificationRequest = NotificationRequest;
            StoreNotification.MsgNotificationRequest = 1;
        })(StoreNotification = Protocol.StoreNotification || (Protocol.StoreNotification = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var Object;
        (function (Object) {
            (function (ObjectChangeTypes) {
                ObjectChangeTypes[ObjectChangeTypes["Upsert"] = 0] = "Upsert";
                ObjectChangeTypes[ObjectChangeTypes["Delete"] = 1] = "Delete";
            })(Object.ObjectChangeTypes || (Object.ObjectChangeTypes = {}));
            var ObjectChangeTypes = Object.ObjectChangeTypes;
        })(Object = Datatypes.Object || (Datatypes.Object = {}));
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var Object;
        (function (Object) {
            var Resource = (function () {
                function Resource() {
                    this.uri = '';
                    this.contentType = '';
                    this.name = '';
                    this.channelSubscribable = false;
                    this.customData = {};
                    this.resourceType = '';
                    this.hasChildren = 0;
                    this.lastChanged = 0;
                    this.objectNotifiable = false;
                }
                Resource._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.Object","name":"Resource","fields":[{"name":"uri","type":"string"},{"name":"contentType","type":"string"},{"name":"name","type":"string"},{"name":"channelSubscribable","type":"boolean"},{"name":"customData","type":{"type":"map","values":"string"}},{"name":"resourceType","type":"string"},{"name":"hasChildren","type":"int"},{"name":"uuid","type":["null","string"]},{"name":"lastChanged","type":"long"},{"name":"objectNotifiable","type":"boolean"}],"fullName":"Energistics.Datatypes.Object.Resource","depends":[]}');
                return Resource;
            }());
            Object.Resource = Resource;
        })(Object = Datatypes.Object || (Datatypes.Object = {}));
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var Discovery;
        (function (Discovery) {
            var GetResourcesResponse = (function () {
                function GetResourcesResponse() {
                    this.resource = new Energistics.Datatypes.Object.Resource();
                }
                GetResourcesResponse._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Discovery","name":"GetResourcesResponse","messageType":"2","protocol":"3","senderRole":"store","protocolRoles":"store,customer","fields":[{"name":"resource","type":"Energistics.Datatypes.Object.Resource"}],"fullName":"Energistics.Protocol.Discovery.GetResourcesResponse","depends":["Energistics.Datatypes.Object.Resource"]}');
                GetResourcesResponse._protocol = 3;
                GetResourcesResponse._messageTypeId = 2;
                return GetResourcesResponse;
            }());
            Discovery.GetResourcesResponse = GetResourcesResponse;
            Discovery.MsgGetResourcesResponse = 2;
        })(Discovery = Protocol.Discovery || (Protocol.Discovery = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var Object;
        (function (Object) {
            var DataObject = (function () {
                function DataObject() {
                    this.resource = new Energistics.Datatypes.Object.Resource();
                    this.contentEncoding = '';
                    this.data = '';
                }
                DataObject._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.Object","name":"DataObject","fields":[{"name":"resource","type":"Energistics.Datatypes.Object.Resource"},{"name":"contentEncoding","type":"string"},{"name":"data","type":"bytes"}],"fullName":"Energistics.Datatypes.Object.DataObject","depends":["Energistics.Datatypes.Object.Resource"]}');
                return DataObject;
            }());
            Object.DataObject = DataObject;
        })(Object = Datatypes.Object || (Datatypes.Object = {}));
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var Store;
        (function (Store) {
            var PutObject = (function () {
                function PutObject() {
                    this.data = new Energistics.Datatypes.Object.DataObject();
                }
                PutObject._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Store","name":"PutObject","messageType":"2","protocol":"4","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"data","type":"Energistics.Datatypes.Object.DataObject"}],"fullName":"Energistics.Protocol.Store.PutObject","depends":["Energistics.Datatypes.Object.DataObject"]}');
                PutObject._protocol = 4;
                PutObject._messageTypeId = 2;
                return PutObject;
            }());
            Store.PutObject = PutObject;
            Store.MsgPutObject = 2;
        })(Store = Protocol.Store || (Protocol.Store = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var Store;
        (function (Store) {
            var Object = (function () {
                function Object() {
                    this.dataObject = new Energistics.Datatypes.Object.DataObject();
                }
                Object._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Store","name":"Object","messageType":"4","protocol":"4","senderRole":"store","protocolRoles":"store,customer","fields":[{"name":"dataObject","type":"Energistics.Datatypes.Object.DataObject"}],"fullName":"Energistics.Protocol.Store.Object","depends":["Energistics.Datatypes.Object.DataObject"]}');
                Object._protocol = 4;
                Object._messageTypeId = 4;
                return Object;
            }());
            Store.Object = Object;
            Store.MsgObject = 4;
        })(Store = Protocol.Store || (Protocol.Store = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Datatypes;
    (function (Datatypes) {
        var Object;
        (function (Object) {
            var ObjectChange = (function () {
                function ObjectChange() {
                    this.changeType = Energistics.Datatypes.Object.ObjectChangeTypes.Upsert;
                    this.changeTime = 0;
                    this.dataObject = new Energistics.Datatypes.Object.DataObject();
                }
                ObjectChange._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.Object","name":"ObjectChange","fields":[{"name":"changeType","type":"Energistics.Datatypes.Object.ObjectChangeTypes"},{"name":"changeTime","type":"long"},{"name":"dataObject","type":"Energistics.Datatypes.Object.DataObject"}],"fullName":"Energistics.Datatypes.Object.ObjectChange","depends":["Energistics.Datatypes.Object.ObjectChangeTypes","Energistics.Datatypes.Object.DataObject"]}');
                return ObjectChange;
            }());
            Object.ObjectChange = ObjectChange;
        })(Object = Datatypes.Object || (Datatypes.Object = {}));
    })(Datatypes = Energistics.Datatypes || (Energistics.Datatypes = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var StoreNotification;
        (function (StoreNotification) {
            var ChangeNotification = (function () {
                function ChangeNotification() {
                    this.change = new Energistics.Datatypes.Object.ObjectChange();
                }
                ChangeNotification._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.StoreNotification","name":"ChangeNotification","messageType":"2","protocol":"5","senderRole":"store","protocolRoles":"store,customer","fields":[{"name":"change","type":"Energistics.Datatypes.Object.ObjectChange"}],"fullName":"Energistics.Protocol.StoreNotification.ChangeNotification","depends":["Energistics.Datatypes.Object.ObjectChange"]}');
                ChangeNotification._protocol = 5;
                ChangeNotification._messageTypeId = 2;
                return ChangeNotification;
            }());
            StoreNotification.ChangeNotification = ChangeNotification;
            StoreNotification.MsgChangeNotification = 2;
        })(StoreNotification = Protocol.StoreNotification || (Protocol.StoreNotification = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));
var Energistics;
(function (Energistics) {
    var Protocol;
    (function (Protocol) {
        var StoreNotification;
        (function (StoreNotification) {
            var DeleteNotification = (function () {
                function DeleteNotification() {
                    this.delete = new Energistics.Datatypes.Object.ObjectChange();
                }
                DeleteNotification._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.StoreNotification","name":"DeleteNotification","messageType":"3","protocol":"5","senderRole":"store","protocolRoles":"store,customer","fields":[{"name":"delete","type":"Energistics.Datatypes.Object.ObjectChange"}],"fullName":"Energistics.Protocol.StoreNotification.DeleteNotification","depends":["Energistics.Datatypes.Object.ObjectChange"]}');
                DeleteNotification._protocol = 5;
                DeleteNotification._messageTypeId = 3;
                return DeleteNotification;
            }());
            StoreNotification.DeleteNotification = DeleteNotification;
            StoreNotification.MsgDeleteNotification = 3;
        })(StoreNotification = Protocol.StoreNotification || (Protocol.StoreNotification = {}));
    })(Protocol = Energistics.Protocol || (Energistics.Protocol = {}));
})(Energistics = exports.Energistics || (exports.Energistics = {}));

},{"./EtpSchemas.js":3}],3:[function(require,module,exports){
var RalfSchemas = JSON.parse('{"namespace":"Energistics","protocol":"Etp","version":"1.0","types":[{"type":"record","namespace":"Energistics.Datatypes","name":"ArrayOfBoolean","fields":[{"name":"values","type":{"type":"array","items":"boolean"}}],"fullName":"Energistics.Datatypes.ArrayOfBoolean","depends":[]},{"type":"record","namespace":"Energistics.Datatypes","name":"ArrayOfFloat","fields":[{"name":"values","type":{"type":"array","items":"float"}}],"fullName":"Energistics.Datatypes.ArrayOfFloat","depends":[]},{"type":"record","namespace":"Energistics.Datatypes","name":"ArrayOfDouble","fields":[{"name":"values","type":{"type":"array","items":"double"}}],"fullName":"Energistics.Datatypes.ArrayOfDouble","depends":[]},{"type":"record","namespace":"Energistics.Datatypes","name":"ArrayOfInt","fields":[{"name":"values","type":{"type":"array","items":"int"}}],"fullName":"Energistics.Datatypes.ArrayOfInt","depends":[]},{"type":"record","namespace":"Energistics.Datatypes","name":"ArrayOfLong","fields":[{"name":"values","type":{"type":"array","items":"long"}}],"fullName":"Energistics.Datatypes.ArrayOfLong","depends":[]},{"type":"record","namespace":"Energistics.Datatypes","name":"AnyArray","fields":[{"name":"item","type":["null","Energistics.Datatypes.ArrayOfBoolean","bytes","Energistics.Datatypes.ArrayOfInt","Energistics.Datatypes.ArrayOfLong","Energistics.Datatypes.ArrayOfFloat","Energistics.Datatypes.ArrayOfDouble"]}],"fullName":"Energistics.Datatypes.AnyArray","depends":["Energistics.Datatypes.ArrayOfBoolean","Energistics.Datatypes.ArrayOfInt","Energistics.Datatypes.ArrayOfLong","Energistics.Datatypes.ArrayOfFloat","Energistics.Datatypes.ArrayOfDouble"]},{"type":"record","namespace":"Energistics.Datatypes","name":"Contact","fields":[{"name":"organizationName","type":["null","string"]},{"name":"contactName","type":["null","string"]},{"name":"contactPhone","type":["null","string"]},{"name":"contactEmail","type":["null","string"]}],"fullName":"Energistics.Datatypes.Contact","depends":[]},{"type":"record","namespace":"Energistics.Datatypes","name":"DataValue","fields":[{"name":"item","type":["null","double","float","int","long","string","Energistics.Datatypes.ArrayOfDouble","boolean","bytes"]}],"fullName":"Energistics.Datatypes.DataValue","depends":["Energistics.Datatypes.ArrayOfDouble"]},{"type":"record","namespace":"Energistics.Datatypes","name":"DataAttribute","fields":[{"name":"attributeId","type":"int"},{"name":"attributeValue","type":"Energistics.Datatypes.DataValue"}],"fullName":"Energistics.Datatypes.DataAttribute","depends":["Energistics.Datatypes.DataValue"]},{"type":"enum","namespace":"Energistics.Datatypes","name":"ErrorCodes","symbols":["ENOROLE","ENOSUPPORTEDPROTOCOLS","EINVALID_MESSAGETYPE","EUNSUPPORTED_PROTOCOL"],"fullName":"Energistics.Datatypes.ErrorCodes","depends":[]},{"type":"record","namespace":"Energistics.Datatypes","name":"MessageHeader","fields":[{"name":"protocol","type":"int"},{"name":"messageType","type":"int"},{"name":"correlationId","type":"long"},{"name":"messageId","type":"long"},{"name":"messageFlags","type":"int"}],"fullName":"Energistics.Datatypes.MessageHeader","depends":[]},{"type":"enum","namespace":"Energistics.Datatypes","name":"Protocols","symbols":["Core","ChannelStreaming","ChannelDataFrame","Discovery","Store","StoreNotification","GrowingObject","DataArray"],"fullName":"Energistics.Datatypes.Protocols","depends":[]},{"type":"record","namespace":"Energistics.Datatypes","name":"Version","fields":[{"name":"major","type":"int"},{"name":"minor","type":"int"},{"name":"revision","type":"int"},{"name":"patch","type":"int"}],"fullName":"Energistics.Datatypes.Version","depends":[]},{"type":"record","namespace":"Energistics.Datatypes","name":"SupportedProtocol","fields":[{"name":"protocol","type":"int"},{"name":"protocolVersion","type":"Energistics.Datatypes.Version"},{"name":"role","type":"string"},{"name":"protocolCapabilities","type":{"type":"map","values":"Energistics.Datatypes.DataValue"}}],"fullName":"Energistics.Datatypes.SupportedProtocol","depends":["Energistics.Datatypes.Version","Energistics.Datatypes.DataValue"]},{"type":"record","namespace":"Energistics.Datatypes","name":"ServerCapabilities","fields":[{"name":"applicationName","type":"string"},{"name":"applicationVersion","type":"string"},{"name":"sessionId","type":"string"},{"name":"supportedProtocols","type":{"type":"array","items":"Energistics.Datatypes.SupportedProtocol"}},{"name":"supportedObjects","type":{"type":"array","items":"string"}},{"name":"contactInfomration","type":"Energistics.Datatypes.Contact"}],"fullName":"Energistics.Datatypes.ServerCapabilities","depends":["Energistics.Datatypes.SupportedProtocol","Energistics.Datatypes.Contact"]},{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelAxis","fields":[{"name":"axisName","type":"string"},{"name":"axisPropertyKind","type":"string"},{"name":"axisStart","type":"double"},{"name":"axisSpacing","type":"double"},{"name":"axisCount","type":"int"},{"name":"axisUom","type":"string"}],"fullName":"Energistics.Datatypes.ChannelData.ChannelAxis","depends":[]},{"type":"enum","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelIndexTypes","symbols":["Time","Depth"],"fullName":"Energistics.Datatypes.ChannelData.ChannelIndexTypes","depends":[]},{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelRangeInfo","fields":[{"name":"channelId","type":{"type":"array","items":"long"}},{"name":"startIndex","type":"long"},{"name":"endIndex","type":"long"}],"fullName":"Energistics.Datatypes.ChannelData.ChannelRangeInfo","depends":[]},{"type":"enum","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelStatuses","symbols":["Active","Inactive","Closed"],"fullName":"Energistics.Datatypes.ChannelData.ChannelStatuses","depends":[]},{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"DataFrame","fields":[{"name":"index","type":{"type":"array","items":"long"}},{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.DataValue"}}],"fullName":"Energistics.Datatypes.ChannelData.DataFrame","depends":["Energistics.Datatypes.DataValue"]},{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"DataItem","fields":[{"name":"indexes","type":{"type":"array","items":"long"}},{"name":"channelId","type":"long"},{"name":"value","type":"Energistics.Datatypes.DataValue"},{"name":"valueAttributes","type":{"type":"array","items":"Energistics.Datatypes.DataAttribute"}}],"fullName":"Energistics.Datatypes.ChannelData.DataItem","depends":["Energistics.Datatypes.DataValue","Energistics.Datatypes.DataAttribute"]},{"type":"enum","namespace":"Energistics.Datatypes.ChannelData","name":"ErrorCodes","symbols":["EINVALID_URI","EINVALID_CHANNELID"],"fullName":"Energistics.Datatypes.ChannelData.ErrorCodes","depends":[]},{"type":"enum","namespace":"Energistics.Datatypes.ChannelData","name":"IndexDirections","symbols":["Increasing","Decreasing"],"fullName":"Energistics.Datatypes.ChannelData.IndexDirections","depends":[]},{"type":"enum","namespace":"Energistics.Datatypes.ChannelData","name":"Roles","symbols":["Producer","Consumer"],"fullName":"Energistics.Datatypes.ChannelData.Roles","depends":[]},{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"IndexMetadataRecord","fields":[{"name":"indexType","type":"Energistics.Datatypes.ChannelData.ChannelIndexTypes"},{"name":"uom","type":"string"},{"name":"depthDatum","type":["null","string"]},{"name":"direction","type":"Energistics.Datatypes.ChannelData.IndexDirections"},{"name":"mnemonic","type":["null","string"]},{"name":"description","type":["null","string"]},{"name":"uri","type":["null","string"]},{"name":"customData","type":{"type":"map","values":"Energistics.Datatypes.DataValue"}},{"name":"scale","type":"int"},{"name":"timeDatum","type":["null","string"]}],"fullName":"Energistics.Datatypes.ChannelData.IndexMetadataRecord","depends":["Energistics.Datatypes.ChannelData.ChannelIndexTypes","Energistics.Datatypes.ChannelData.IndexDirections","Energistics.Datatypes.DataValue"]},{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelMetadataRecord","fields":[{"name":"channelUri","type":"string"},{"name":"channelId","type":"long"},{"name":"indexes","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.IndexMetadataRecord"}},{"name":"mnemonic","type":"string"},{"name":"dataType","type":"string"},{"name":"uom","type":"string"},{"name":"startIndex","type":["null","long"]},{"name":"endIndex","type":["null","long"]},{"name":"description","type":"string"},{"name":"status","type":"Energistics.Datatypes.ChannelData.ChannelStatuses"},{"name":"contentType","type":["null","string"]},{"name":"source","type":"string"},{"name":"measureClass","type":"string"},{"name":"uuid","type":["null","string"]},{"name":"channelAxes","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelAxis"}}],"fullName":"Energistics.Datatypes.ChannelData.ChannelMetadataRecord","depends":["Energistics.Datatypes.ChannelData.IndexMetadataRecord","Energistics.Datatypes.ChannelData.ChannelStatuses","Energistics.Datatypes.ChannelData.ChannelAxis"]},{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"StreamingStartIndex","fields":[{"name":"item","type":["null","int","long"]}],"fullName":"Energistics.Datatypes.ChannelData.StreamingStartIndex","depends":[]},{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelStreamingInfo","fields":[{"name":"channelId","type":"long"},{"name":"startIndex","type":"Energistics.Datatypes.ChannelData.StreamingStartIndex"},{"name":"receiveChangeNotification","type":"boolean"}],"fullName":"Energistics.Datatypes.ChannelData.ChannelStreamingInfo","depends":["Energistics.Datatypes.ChannelData.StreamingStartIndex"]},{"type":"record","namespace":"Energistics.Datatypes.Object","name":"NotificationRequestRecord","fields":[{"name":"uri","type":"string"},{"name":"uuid","type":"string"},{"name":"includeObjectData","type":"boolean"},{"name":"startTime","type":"long"},{"name":"objectTypes","type":{"type":"array","items":"string"}}],"fullName":"Energistics.Datatypes.Object.NotificationRequestRecord","depends":[]},{"type":"enum","namespace":"Energistics.Datatypes.Object","name":"ObjectChangeTypes","symbols":["Upsert","Delete"],"fullName":"Energistics.Datatypes.Object.ObjectChangeTypes","depends":[]},{"type":"record","namespace":"Energistics.Datatypes.Object","name":"Resource","fields":[{"name":"uri","type":"string"},{"name":"contentType","type":"string"},{"name":"name","type":"string"},{"name":"channelSubscribable","type":"boolean"},{"name":"customData","type":{"type":"map","values":"string"}},{"name":"resourceType","type":"string"},{"name":"hasChildren","type":"int"},{"name":"uuid","type":["null","string"]},{"name":"lastChanged","type":"long"},{"name":"objectNotifiable","type":"boolean"}],"fullName":"Energistics.Datatypes.Object.Resource","depends":[]},{"type":"record","namespace":"Energistics.Datatypes.Object","name":"DataObject","fields":[{"name":"resource","type":"Energistics.Datatypes.Object.Resource"},{"name":"contentEncoding","type":"string"},{"name":"data","type":"bytes"}],"fullName":"Energistics.Datatypes.Object.DataObject","depends":["Energistics.Datatypes.Object.Resource"]},{"type":"record","namespace":"Energistics.Datatypes.Object","name":"ObjectChange","fields":[{"name":"changeType","type":"Energistics.Datatypes.Object.ObjectChangeTypes"},{"name":"changeTime","type":"long"},{"name":"dataObject","type":"Energistics.Datatypes.Object.DataObject"}],"fullName":"Energistics.Datatypes.Object.ObjectChange","depends":["Energistics.Datatypes.Object.ObjectChangeTypes","Energistics.Datatypes.Object.DataObject"]},{"type":"record","namespace":"Energistics.Protocol.ChannelDataFrame","name":"ChannelMetadata","messageType":"3","protocol":"2","senderRole":"producer","protocolRoles":"producer,consumer","fields":[{"name":"channels","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelMetadataRecord"}}],"fullName":"Energistics.Protocol.ChannelDataFrame.ChannelMetadata","depends":["Energistics.Datatypes.ChannelData.ChannelMetadataRecord"]},{"type":"record","namespace":"Energistics.Protocol.ChannelDataFrame","name":"ChannelDataFrameSet","messageType":"4","protocol":"2","senderRole":"producer","protocolRoles":"producer,consumer","fields":[{"name":"channels","type":{"type":"array","items":"long"}},{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.DataFrame"}}],"fullName":"Energistics.Protocol.ChannelDataFrame.ChannelDataFrameSet","depends":["Energistics.Datatypes.ChannelData.DataFrame"]},{"type":"record","namespace":"Energistics.Protocol.ChannelDataFrame","name":"RequestChannelData","messageType":"1","protocol":"2","senderRole":"consumer","protocolRoles":"producer,consumer","fields":[{"name":"uri","type":"string"},{"name":"fromIndex","type":["null","long"]},{"name":"toIndex","type":["null","long"]}],"fullName":"Energistics.Protocol.ChannelDataFrame.RequestChannelData","depends":[]},{"type":"record","namespace":"Energistics.Protocol.Core","name":"Acknowledge","messageType":"1001","protocol":"0","senderRole":"*","protocolRoles":"client,server","fields":[],"fullName":"Energistics.Protocol.Core.Acknowledge","depends":[]},{"type":"record","namespace":"Energistics.Protocol.Core","name":"CloseSession","messageType":"5","protocol":"0","senderRole":"client,server","protocolRoles":"client,server","fields":[{"name":"reason","type":["null","string"]}],"fullName":"Energistics.Protocol.Core.CloseSession","depends":[]},{"type":"record","namespace":"Energistics.Protocol.Core","name":"OpenSession","messageType":"2","protocol":"0","senderRole":"server","protocolRoles":"client,server","fields":[{"name":"applicationName","type":"string"},{"name":"applicationVersion","type":"string"},{"name":"sessionId","type":"string"},{"name":"supportedProtocols","type":{"type":"array","items":"Energistics.Datatypes.SupportedProtocol"}},{"name":"supportedObjects","type":{"type":"array","items":"string"}}],"fullName":"Energistics.Protocol.Core.OpenSession","depends":["Energistics.Datatypes.SupportedProtocol"]},{"type":"record","namespace":"Energistics.Protocol.Core","name":"ProtocolException","messageType":"1000","protocol":"0","senderRole":"*","protocolRoles":"client,server","fields":[{"name":"errorCode","type":"int"},{"name":"errorMessage","type":"string"}],"fullName":"Energistics.Protocol.Core.ProtocolException","depends":[]},{"type":"record","namespace":"Energistics.Protocol.Core","name":"RequestSession","messageType":"1","protocol":"0","senderRole":"client","protocolRoles":"client,server","fields":[{"name":"applicationName","type":"string"},{"name":"applicationVersion","type":"string"},{"name":"requestedProtocols","type":{"type":"array","items":"Energistics.Datatypes.SupportedProtocol"}},{"name":"supportedObjects","type":{"type":"array","items":"string"}}],"fullName":"Energistics.Protocol.Core.RequestSession","depends":["Energistics.Datatypes.SupportedProtocol"]},{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelData","messageType":"3","protocol":"1","senderRole":"producer","protocolRoles":"producer,consumer","fields":[{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.DataItem"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelData","depends":["Energistics.Datatypes.ChannelData.DataItem"]},{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelDataChange","messageType":"6","protocol":"1","senderRole":"producer","protocolRoles":"producer,consumer","fields":[{"name":"channelId","type":"long"},{"name":"startIndex","type":"long"},{"name":"endIndex","type":"long"},{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.DataItem"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelDataChange","depends":["Energistics.Datatypes.ChannelData.DataItem"]},{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelDescribe","messageType":"1","protocol":"1","senderRole":"consumer","protocolRoles":"producer,consumer","fields":[{"name":"uris","type":{"type":"array","items":"string"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelDescribe","depends":[]},{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelDelete","messageType":"8","protocol":"1","senderRole":"producer","protocolRoles":"producer,consumer","fields":[{"name":"channelId","type":"long"},{"name":"deleteReason","type":["null","string"]}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelDelete","depends":[]},{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelMetadata","messageType":"2","protocol":"1","senderRole":"producer","protocolRoles":"producer,consumer","fields":[{"name":"channels","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelMetadataRecord"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelMetadata","depends":["Energistics.Datatypes.ChannelData.ChannelMetadataRecord"]},{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelStatusChange","messageType":"10","protocol":"1","senderRole":"producer","protocolRoles":"producer,consumer","fields":[{"name":"channelId","type":"long"},{"name":"status","type":"Energistics.Datatypes.ChannelData.ChannelStatuses"}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelStatusChange","depends":["Energistics.Datatypes.ChannelData.ChannelStatuses"]},{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelRangeRequest","messageType":"9","protocol":"1","senderRole":"consumer","protocolRoles":"producer,consumer","fields":[{"name":"channelRanges","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelRangeInfo"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelRangeRequest","depends":["Energistics.Datatypes.ChannelData.ChannelRangeInfo"]},{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelStreamingStop","messageType":"5","protocol":"1","senderRole":"consumer","protocolRoles":"producer,consumer","fields":[{"name":"channels","type":{"type":"array","items":"long"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelStreamingStop","depends":[]},{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelStreamingStart","messageType":"4","protocol":"1","senderRole":"consumer","protocolRoles":"producer,consumer","fields":[{"name":"channels","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelStreamingInfo"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelStreamingStart","depends":["Energistics.Datatypes.ChannelData.ChannelStreamingInfo"]},{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"Start","messageType":"0","protocol":"1","senderRole":"consumer","protocolRoles":"producer,consumer","fields":[{"name":"maxMessageRate","type":"int"},{"name":"maxDataItems","type":"int"}],"fullName":"Energistics.Protocol.ChannelStreaming.Start","depends":[]},{"type":"record","namespace":"Energistics.Protocol.DataArray","name":"DataArray","messageType":"1","protocol":"7","senderRole":"store","protocolRoles":"store,customer","fields":[{"name":"dimensions","type":{"type":"array","items":"long"}},{"name":"data","type":"Energistics.Datatypes.AnyArray"}],"fullName":"Energistics.Protocol.DataArray.DataArray","depends":["Energistics.Datatypes.AnyArray"]},{"type":"record","namespace":"Energistics.Protocol.DataArray","name":"GetDataArray","messageType":"2","protocol":"7","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uri","type":"string"}],"fullName":"Energistics.Protocol.DataArray.GetDataArray","depends":[]},{"type":"record","namespace":"Energistics.Protocol.DataArray","name":"GetDataArraySlice","messageType":"3","protocol":"7","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uri","type":"string"},{"name":"start","type":{"type":"array","items":"long"}},{"name":"count","type":{"type":"array","items":"long"}}],"fullName":"Energistics.Protocol.DataArray.GetDataArraySlice","depends":[]},{"type":"record","namespace":"Energistics.Protocol.Discovery","name":"GetResources","messageType":"1","protocol":"3","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uri","type":"string"}],"fullName":"Energistics.Protocol.Discovery.GetResources","depends":[]},{"type":"record","namespace":"Energistics.Protocol.Discovery","name":"GetResourcesResponse","messageType":"2","protocol":"3","senderRole":"store","protocolRoles":"store,customer","fields":[{"name":"resource","type":"Energistics.Datatypes.Object.Resource"}],"fullName":"Energistics.Protocol.Discovery.GetResourcesResponse","depends":["Energistics.Datatypes.Object.Resource"]},{"type":"record","namespace":"Energistics.Protocol.GrowingObject","name":"GrowingObjectDelete","messageType":"1","protocol":"6","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uuid","type":"string"},{"name":"uid","type":"string"}],"fullName":"Energistics.Protocol.GrowingObject.GrowingObjectDelete","depends":[]},{"type":"record","namespace":"Energistics.Protocol.GrowingObject","name":"GrowingObjectGet","messageType":"3","protocol":"6","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uuid","type":"string"},{"name":"uid","type":"string"}],"fullName":"Energistics.Protocol.GrowingObject.GrowingObjectGet","depends":[]},{"type":"record","namespace":"Energistics.Protocol.GrowingObject","name":"GrowingObjectGetRange","messageType":"4","protocol":"6","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uuid","type":"string"},{"name":"startIndex","type":"long"},{"name":"endIndex","type":"long"}],"fullName":"Energistics.Protocol.GrowingObject.GrowingObjectGetRange","depends":[]},{"type":"record","namespace":"Energistics.Protocol.GrowingObject","name":"GrowingObjectDeleteRange","messageType":"2","protocol":"6","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uuid","type":"string"},{"name":"startIndex","type":"long"},{"name":"endIndex","type":"long"}],"fullName":"Energistics.Protocol.GrowingObject.GrowingObjectDeleteRange","depends":[]},{"type":"record","namespace":"Energistics.Protocol.GrowingObject","name":"GrowingObjectPut","messageType":"5","protocol":"6","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uuid","type":"string"},{"name":"contentType","type":"string"},{"name":"contentEncoding","type":"string"},{"name":"data","type":"bytes"}],"fullName":"Energistics.Protocol.GrowingObject.GrowingObjectPut","depends":[]},{"type":"record","namespace":"Energistics.Protocol.GrowingObject","name":"ObjectFragment","messageType":"6","protocol":"6","senderRole":"store","protocolRoles":"store,customer","fields":[{"name":"uuid","type":"string"},{"name":"contentType","type":"string"},{"name":"contentEncoding","type":"string"},{"name":"data","type":"bytes"}],"fullName":"Energistics.Protocol.GrowingObject.ObjectFragment","depends":[]},{"type":"record","namespace":"Energistics.Protocol.Store","name":"DeleteObject","messageType":"3","protocol":"4","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uri","type":{"type":"array","items":"string"}}],"fullName":"Energistics.Protocol.Store.DeleteObject","depends":[]},{"type":"record","namespace":"Energistics.Protocol.Store","name":"PutObject","messageType":"2","protocol":"4","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"data","type":"Energistics.Datatypes.Object.DataObject"}],"fullName":"Energistics.Protocol.Store.PutObject","depends":["Energistics.Datatypes.Object.DataObject"]},{"type":"record","namespace":"Energistics.Protocol.Store","name":"Object","messageType":"4","protocol":"4","senderRole":"store","protocolRoles":"store,customer","fields":[{"name":"dataObject","type":"Energistics.Datatypes.Object.DataObject"}],"fullName":"Energistics.Protocol.Store.Object","depends":["Energistics.Datatypes.Object.DataObject"]},{"type":"record","namespace":"Energistics.Protocol.Store","name":"GetObject","messageType":"1","protocol":"4","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uri","type":"string"}],"fullName":"Energistics.Protocol.Store.GetObject","depends":[]},{"type":"record","namespace":"Energistics.Protocol.StoreNotification","name":"DeleteNotification","messageType":"3","protocol":"5","senderRole":"store","protocolRoles":"store,customer","fields":[{"name":"delete","type":"Energistics.Datatypes.Object.ObjectChange"}],"fullName":"Energistics.Protocol.StoreNotification.DeleteNotification","depends":["Energistics.Datatypes.Object.ObjectChange"]},{"type":"record","namespace":"Energistics.Protocol.StoreNotification","name":"ChangeNotification","messageType":"2","protocol":"5","senderRole":"store","protocolRoles":"store,customer","fields":[{"name":"change","type":"Energistics.Datatypes.Object.ObjectChange"}],"fullName":"Energistics.Protocol.StoreNotification.ChangeNotification","depends":["Energistics.Datatypes.Object.ObjectChange"]},{"type":"record","namespace":"Energistics.Protocol.StoreNotification","name":"NotificationRequest","messageType":"1","protocol":"5","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"request","type":"Energistics.Datatypes.Object.NotificationRequestRecord"}],"fullName":"Energistics.Protocol.StoreNotification.NotificationRequest","depends":["Energistics.Datatypes.Object.NotificationRequestRecord"]}],"Energistics":{"Datatypes":{"ArrayOfBoolean":{"type":"record","namespace":"Energistics.Datatypes","name":"ArrayOfBoolean","fields":[{"name":"values","type":{"type":"array","items":"boolean"}}],"fullName":"Energistics.Datatypes.ArrayOfBoolean","depends":[]},"ArrayOfFloat":{"type":"record","namespace":"Energistics.Datatypes","name":"ArrayOfFloat","fields":[{"name":"values","type":{"type":"array","items":"float"}}],"fullName":"Energistics.Datatypes.ArrayOfFloat","depends":[]},"ArrayOfDouble":{"type":"record","namespace":"Energistics.Datatypes","name":"ArrayOfDouble","fields":[{"name":"values","type":{"type":"array","items":"double"}}],"fullName":"Energistics.Datatypes.ArrayOfDouble","depends":[]},"ArrayOfInt":{"type":"record","namespace":"Energistics.Datatypes","name":"ArrayOfInt","fields":[{"name":"values","type":{"type":"array","items":"int"}}],"fullName":"Energistics.Datatypes.ArrayOfInt","depends":[]},"ArrayOfLong":{"type":"record","namespace":"Energistics.Datatypes","name":"ArrayOfLong","fields":[{"name":"values","type":{"type":"array","items":"long"}}],"fullName":"Energistics.Datatypes.ArrayOfLong","depends":[]},"AnyArray":{"type":"record","namespace":"Energistics.Datatypes","name":"AnyArray","fields":[{"name":"item","type":["null","Energistics.Datatypes.ArrayOfBoolean","bytes","Energistics.Datatypes.ArrayOfInt","Energistics.Datatypes.ArrayOfLong","Energistics.Datatypes.ArrayOfFloat","Energistics.Datatypes.ArrayOfDouble"]}],"fullName":"Energistics.Datatypes.AnyArray","depends":["Energistics.Datatypes.ArrayOfBoolean","Energistics.Datatypes.ArrayOfInt","Energistics.Datatypes.ArrayOfLong","Energistics.Datatypes.ArrayOfFloat","Energistics.Datatypes.ArrayOfDouble"]},"Contact":{"type":"record","namespace":"Energistics.Datatypes","name":"Contact","fields":[{"name":"organizationName","type":["null","string"]},{"name":"contactName","type":["null","string"]},{"name":"contactPhone","type":["null","string"]},{"name":"contactEmail","type":["null","string"]}],"fullName":"Energistics.Datatypes.Contact","depends":[]},"DataValue":{"type":"record","namespace":"Energistics.Datatypes","name":"DataValue","fields":[{"name":"item","type":["null","double","float","int","long","string","Energistics.Datatypes.ArrayOfDouble","boolean","bytes"]}],"fullName":"Energistics.Datatypes.DataValue","depends":["Energistics.Datatypes.ArrayOfDouble"]},"DataAttribute":{"type":"record","namespace":"Energistics.Datatypes","name":"DataAttribute","fields":[{"name":"attributeId","type":"int"},{"name":"attributeValue","type":"Energistics.Datatypes.DataValue"}],"fullName":"Energistics.Datatypes.DataAttribute","depends":["Energistics.Datatypes.DataValue"]},"ErrorCodes":{"type":"enum","namespace":"Energistics.Datatypes","name":"ErrorCodes","symbols":["ENOROLE","ENOSUPPORTEDPROTOCOLS","EINVALID_MESSAGETYPE","EUNSUPPORTED_PROTOCOL"],"fullName":"Energistics.Datatypes.ErrorCodes","depends":[]},"MessageHeader":{"type":"record","namespace":"Energistics.Datatypes","name":"MessageHeader","fields":[{"name":"protocol","type":"int"},{"name":"messageType","type":"int"},{"name":"correlationId","type":"long"},{"name":"messageId","type":"long"},{"name":"messageFlags","type":"int"}],"fullName":"Energistics.Datatypes.MessageHeader","depends":[]},"Protocols":{"type":"enum","namespace":"Energistics.Datatypes","name":"Protocols","symbols":["Core","ChannelStreaming","ChannelDataFrame","Discovery","Store","StoreNotification","GrowingObject","DataArray"],"fullName":"Energistics.Datatypes.Protocols","depends":[]},"Version":{"type":"record","namespace":"Energistics.Datatypes","name":"Version","fields":[{"name":"major","type":"int"},{"name":"minor","type":"int"},{"name":"revision","type":"int"},{"name":"patch","type":"int"}],"fullName":"Energistics.Datatypes.Version","depends":[]},"SupportedProtocol":{"type":"record","namespace":"Energistics.Datatypes","name":"SupportedProtocol","fields":[{"name":"protocol","type":"int"},{"name":"protocolVersion","type":"Energistics.Datatypes.Version"},{"name":"role","type":"string"},{"name":"protocolCapabilities","type":{"type":"map","values":"Energistics.Datatypes.DataValue"}}],"fullName":"Energistics.Datatypes.SupportedProtocol","depends":["Energistics.Datatypes.Version","Energistics.Datatypes.DataValue"]},"ServerCapabilities":{"type":"record","namespace":"Energistics.Datatypes","name":"ServerCapabilities","fields":[{"name":"applicationName","type":"string"},{"name":"applicationVersion","type":"string"},{"name":"sessionId","type":"string"},{"name":"supportedProtocols","type":{"type":"array","items":"Energistics.Datatypes.SupportedProtocol"}},{"name":"supportedObjects","type":{"type":"array","items":"string"}},{"name":"contactInfomration","type":"Energistics.Datatypes.Contact"}],"fullName":"Energistics.Datatypes.ServerCapabilities","depends":["Energistics.Datatypes.SupportedProtocol","Energistics.Datatypes.Contact"]},"ChannelData":{"ChannelAxis":{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelAxis","fields":[{"name":"axisName","type":"string"},{"name":"axisPropertyKind","type":"string"},{"name":"axisStart","type":"double"},{"name":"axisSpacing","type":"double"},{"name":"axisCount","type":"int"},{"name":"axisUom","type":"string"}],"fullName":"Energistics.Datatypes.ChannelData.ChannelAxis","depends":[]},"ChannelIndexTypes":{"type":"enum","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelIndexTypes","symbols":["Time","Depth"],"fullName":"Energistics.Datatypes.ChannelData.ChannelIndexTypes","depends":[]},"ChannelRangeInfo":{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelRangeInfo","fields":[{"name":"channelId","type":{"type":"array","items":"long"}},{"name":"startIndex","type":"long"},{"name":"endIndex","type":"long"}],"fullName":"Energistics.Datatypes.ChannelData.ChannelRangeInfo","depends":[]},"ChannelStatuses":{"type":"enum","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelStatuses","symbols":["Active","Inactive","Closed"],"fullName":"Energistics.Datatypes.ChannelData.ChannelStatuses","depends":[]},"DataFrame":{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"DataFrame","fields":[{"name":"index","type":{"type":"array","items":"long"}},{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.DataValue"}}],"fullName":"Energistics.Datatypes.ChannelData.DataFrame","depends":["Energistics.Datatypes.DataValue"]},"DataItem":{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"DataItem","fields":[{"name":"indexes","type":{"type":"array","items":"long"}},{"name":"channelId","type":"long"},{"name":"value","type":"Energistics.Datatypes.DataValue"},{"name":"valueAttributes","type":{"type":"array","items":"Energistics.Datatypes.DataAttribute"}}],"fullName":"Energistics.Datatypes.ChannelData.DataItem","depends":["Energistics.Datatypes.DataValue","Energistics.Datatypes.DataAttribute"]},"ErrorCodes":{"type":"enum","namespace":"Energistics.Datatypes.ChannelData","name":"ErrorCodes","symbols":["EINVALID_URI","EINVALID_CHANNELID"],"fullName":"Energistics.Datatypes.ChannelData.ErrorCodes","depends":[]},"IndexDirections":{"type":"enum","namespace":"Energistics.Datatypes.ChannelData","name":"IndexDirections","symbols":["Increasing","Decreasing"],"fullName":"Energistics.Datatypes.ChannelData.IndexDirections","depends":[]},"Roles":{"type":"enum","namespace":"Energistics.Datatypes.ChannelData","name":"Roles","symbols":["Producer","Consumer"],"fullName":"Energistics.Datatypes.ChannelData.Roles","depends":[]},"IndexMetadataRecord":{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"IndexMetadataRecord","fields":[{"name":"indexType","type":"Energistics.Datatypes.ChannelData.ChannelIndexTypes"},{"name":"uom","type":"string"},{"name":"depthDatum","type":["null","string"]},{"name":"direction","type":"Energistics.Datatypes.ChannelData.IndexDirections"},{"name":"mnemonic","type":["null","string"]},{"name":"description","type":["null","string"]},{"name":"uri","type":["null","string"]},{"name":"customData","type":{"type":"map","values":"Energistics.Datatypes.DataValue"}},{"name":"scale","type":"int"},{"name":"timeDatum","type":["null","string"]}],"fullName":"Energistics.Datatypes.ChannelData.IndexMetadataRecord","depends":["Energistics.Datatypes.ChannelData.ChannelIndexTypes","Energistics.Datatypes.ChannelData.IndexDirections","Energistics.Datatypes.DataValue"]},"ChannelMetadataRecord":{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelMetadataRecord","fields":[{"name":"channelUri","type":"string"},{"name":"channelId","type":"long"},{"name":"indexes","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.IndexMetadataRecord"}},{"name":"mnemonic","type":"string"},{"name":"dataType","type":"string"},{"name":"uom","type":"string"},{"name":"startIndex","type":["null","long"]},{"name":"endIndex","type":["null","long"]},{"name":"description","type":"string"},{"name":"status","type":"Energistics.Datatypes.ChannelData.ChannelStatuses"},{"name":"contentType","type":["null","string"]},{"name":"source","type":"string"},{"name":"measureClass","type":"string"},{"name":"uuid","type":["null","string"]},{"name":"channelAxes","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelAxis"}}],"fullName":"Energistics.Datatypes.ChannelData.ChannelMetadataRecord","depends":["Energistics.Datatypes.ChannelData.IndexMetadataRecord","Energistics.Datatypes.ChannelData.ChannelStatuses","Energistics.Datatypes.ChannelData.ChannelAxis"]},"StreamingStartIndex":{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"StreamingStartIndex","fields":[{"name":"item","type":["null","int","long"]}],"fullName":"Energistics.Datatypes.ChannelData.StreamingStartIndex","depends":[]},"ChannelStreamingInfo":{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelStreamingInfo","fields":[{"name":"channelId","type":"long"},{"name":"startIndex","type":"Energistics.Datatypes.ChannelData.StreamingStartIndex"},{"name":"receiveChangeNotification","type":"boolean"}],"fullName":"Energistics.Datatypes.ChannelData.ChannelStreamingInfo","depends":["Energistics.Datatypes.ChannelData.StreamingStartIndex"]}},"Object":{"NotificationRequestRecord":{"type":"record","namespace":"Energistics.Datatypes.Object","name":"NotificationRequestRecord","fields":[{"name":"uri","type":"string"},{"name":"uuid","type":"string"},{"name":"includeObjectData","type":"boolean"},{"name":"startTime","type":"long"},{"name":"objectTypes","type":{"type":"array","items":"string"}}],"fullName":"Energistics.Datatypes.Object.NotificationRequestRecord","depends":[]},"ObjectChangeTypes":{"type":"enum","namespace":"Energistics.Datatypes.Object","name":"ObjectChangeTypes","symbols":["Upsert","Delete"],"fullName":"Energistics.Datatypes.Object.ObjectChangeTypes","depends":[]},"Resource":{"type":"record","namespace":"Energistics.Datatypes.Object","name":"Resource","fields":[{"name":"uri","type":"string"},{"name":"contentType","type":"string"},{"name":"name","type":"string"},{"name":"channelSubscribable","type":"boolean"},{"name":"customData","type":{"type":"map","values":"string"}},{"name":"resourceType","type":"string"},{"name":"hasChildren","type":"int"},{"name":"uuid","type":["null","string"]},{"name":"lastChanged","type":"long"},{"name":"objectNotifiable","type":"boolean"}],"fullName":"Energistics.Datatypes.Object.Resource","depends":[]},"DataObject":{"type":"record","namespace":"Energistics.Datatypes.Object","name":"DataObject","fields":[{"name":"resource","type":"Energistics.Datatypes.Object.Resource"},{"name":"contentEncoding","type":"string"},{"name":"data","type":"bytes"}],"fullName":"Energistics.Datatypes.Object.DataObject","depends":["Energistics.Datatypes.Object.Resource"]},"ObjectChange":{"type":"record","namespace":"Energistics.Datatypes.Object","name":"ObjectChange","fields":[{"name":"changeType","type":"Energistics.Datatypes.Object.ObjectChangeTypes"},{"name":"changeTime","type":"long"},{"name":"dataObject","type":"Energistics.Datatypes.Object.DataObject"}],"fullName":"Energistics.Datatypes.Object.ObjectChange","depends":["Energistics.Datatypes.Object.ObjectChangeTypes","Energistics.Datatypes.Object.DataObject"]}}},"Protocol":{"ChannelDataFrame":{"ChannelMetadata":{"type":"record","namespace":"Energistics.Protocol.ChannelDataFrame","name":"ChannelMetadata","messageType":"3","protocol":"2","senderRole":"producer","protocolRoles":"producer,consumer","fields":[{"name":"channels","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelMetadataRecord"}}],"fullName":"Energistics.Protocol.ChannelDataFrame.ChannelMetadata","depends":["Energistics.Datatypes.ChannelData.ChannelMetadataRecord"]},"ChannelDataFrameSet":{"type":"record","namespace":"Energistics.Protocol.ChannelDataFrame","name":"ChannelDataFrameSet","messageType":"4","protocol":"2","senderRole":"producer","protocolRoles":"producer,consumer","fields":[{"name":"channels","type":{"type":"array","items":"long"}},{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.DataFrame"}}],"fullName":"Energistics.Protocol.ChannelDataFrame.ChannelDataFrameSet","depends":["Energistics.Datatypes.ChannelData.DataFrame"]},"RequestChannelData":{"type":"record","namespace":"Energistics.Protocol.ChannelDataFrame","name":"RequestChannelData","messageType":"1","protocol":"2","senderRole":"consumer","protocolRoles":"producer,consumer","fields":[{"name":"uri","type":"string"},{"name":"fromIndex","type":["null","long"]},{"name":"toIndex","type":["null","long"]}],"fullName":"Energistics.Protocol.ChannelDataFrame.RequestChannelData","depends":[]}},"Core":{"Acknowledge":{"type":"record","namespace":"Energistics.Protocol.Core","name":"Acknowledge","messageType":"1001","protocol":"0","senderRole":"*","protocolRoles":"client,server","fields":[],"fullName":"Energistics.Protocol.Core.Acknowledge","depends":[]},"CloseSession":{"type":"record","namespace":"Energistics.Protocol.Core","name":"CloseSession","messageType":"5","protocol":"0","senderRole":"client,server","protocolRoles":"client,server","fields":[{"name":"reason","type":["null","string"]}],"fullName":"Energistics.Protocol.Core.CloseSession","depends":[]},"OpenSession":{"type":"record","namespace":"Energistics.Protocol.Core","name":"OpenSession","messageType":"2","protocol":"0","senderRole":"server","protocolRoles":"client,server","fields":[{"name":"applicationName","type":"string"},{"name":"applicationVersion","type":"string"},{"name":"sessionId","type":"string"},{"name":"supportedProtocols","type":{"type":"array","items":"Energistics.Datatypes.SupportedProtocol"}},{"name":"supportedObjects","type":{"type":"array","items":"string"}}],"fullName":"Energistics.Protocol.Core.OpenSession","depends":["Energistics.Datatypes.SupportedProtocol"]},"ProtocolException":{"type":"record","namespace":"Energistics.Protocol.Core","name":"ProtocolException","messageType":"1000","protocol":"0","senderRole":"*","protocolRoles":"client,server","fields":[{"name":"errorCode","type":"int"},{"name":"errorMessage","type":"string"}],"fullName":"Energistics.Protocol.Core.ProtocolException","depends":[]},"RequestSession":{"type":"record","namespace":"Energistics.Protocol.Core","name":"RequestSession","messageType":"1","protocol":"0","senderRole":"client","protocolRoles":"client,server","fields":[{"name":"applicationName","type":"string"},{"name":"applicationVersion","type":"string"},{"name":"requestedProtocols","type":{"type":"array","items":"Energistics.Datatypes.SupportedProtocol"}},{"name":"supportedObjects","type":{"type":"array","items":"string"}}],"fullName":"Energistics.Protocol.Core.RequestSession","depends":["Energistics.Datatypes.SupportedProtocol"]}},"ChannelStreaming":{"ChannelData":{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelData","messageType":"3","protocol":"1","senderRole":"producer","protocolRoles":"producer,consumer","fields":[{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.DataItem"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelData","depends":["Energistics.Datatypes.ChannelData.DataItem"]},"ChannelDataChange":{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelDataChange","messageType":"6","protocol":"1","senderRole":"producer","protocolRoles":"producer,consumer","fields":[{"name":"channelId","type":"long"},{"name":"startIndex","type":"long"},{"name":"endIndex","type":"long"},{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.DataItem"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelDataChange","depends":["Energistics.Datatypes.ChannelData.DataItem"]},"ChannelDescribe":{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelDescribe","messageType":"1","protocol":"1","senderRole":"consumer","protocolRoles":"producer,consumer","fields":[{"name":"uris","type":{"type":"array","items":"string"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelDescribe","depends":[]},"ChannelDelete":{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelDelete","messageType":"8","protocol":"1","senderRole":"producer","protocolRoles":"producer,consumer","fields":[{"name":"channelId","type":"long"},{"name":"deleteReason","type":["null","string"]}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelDelete","depends":[]},"ChannelMetadata":{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelMetadata","messageType":"2","protocol":"1","senderRole":"producer","protocolRoles":"producer,consumer","fields":[{"name":"channels","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelMetadataRecord"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelMetadata","depends":["Energistics.Datatypes.ChannelData.ChannelMetadataRecord"]},"ChannelStatusChange":{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelStatusChange","messageType":"10","protocol":"1","senderRole":"producer","protocolRoles":"producer,consumer","fields":[{"name":"channelId","type":"long"},{"name":"status","type":"Energistics.Datatypes.ChannelData.ChannelStatuses"}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelStatusChange","depends":["Energistics.Datatypes.ChannelData.ChannelStatuses"]},"ChannelRangeRequest":{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelRangeRequest","messageType":"9","protocol":"1","senderRole":"consumer","protocolRoles":"producer,consumer","fields":[{"name":"channelRanges","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelRangeInfo"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelRangeRequest","depends":["Energistics.Datatypes.ChannelData.ChannelRangeInfo"]},"ChannelStreamingStop":{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelStreamingStop","messageType":"5","protocol":"1","senderRole":"consumer","protocolRoles":"producer,consumer","fields":[{"name":"channels","type":{"type":"array","items":"long"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelStreamingStop","depends":[]},"ChannelStreamingStart":{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelStreamingStart","messageType":"4","protocol":"1","senderRole":"consumer","protocolRoles":"producer,consumer","fields":[{"name":"channels","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelStreamingInfo"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelStreamingStart","depends":["Energistics.Datatypes.ChannelData.ChannelStreamingInfo"]},"Start":{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"Start","messageType":"0","protocol":"1","senderRole":"consumer","protocolRoles":"producer,consumer","fields":[{"name":"maxMessageRate","type":"int"},{"name":"maxDataItems","type":"int"}],"fullName":"Energistics.Protocol.ChannelStreaming.Start","depends":[]}},"DataArray":{"DataArray":{"type":"record","namespace":"Energistics.Protocol.DataArray","name":"DataArray","messageType":"1","protocol":"7","senderRole":"store","protocolRoles":"store,customer","fields":[{"name":"dimensions","type":{"type":"array","items":"long"}},{"name":"data","type":"Energistics.Datatypes.AnyArray"}],"fullName":"Energistics.Protocol.DataArray.DataArray","depends":["Energistics.Datatypes.AnyArray"]},"GetDataArray":{"type":"record","namespace":"Energistics.Protocol.DataArray","name":"GetDataArray","messageType":"2","protocol":"7","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uri","type":"string"}],"fullName":"Energistics.Protocol.DataArray.GetDataArray","depends":[]},"GetDataArraySlice":{"type":"record","namespace":"Energistics.Protocol.DataArray","name":"GetDataArraySlice","messageType":"3","protocol":"7","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uri","type":"string"},{"name":"start","type":{"type":"array","items":"long"}},{"name":"count","type":{"type":"array","items":"long"}}],"fullName":"Energistics.Protocol.DataArray.GetDataArraySlice","depends":[]}},"Discovery":{"GetResources":{"type":"record","namespace":"Energistics.Protocol.Discovery","name":"GetResources","messageType":"1","protocol":"3","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uri","type":"string"}],"fullName":"Energistics.Protocol.Discovery.GetResources","depends":[]},"GetResourcesResponse":{"type":"record","namespace":"Energistics.Protocol.Discovery","name":"GetResourcesResponse","messageType":"2","protocol":"3","senderRole":"store","protocolRoles":"store,customer","fields":[{"name":"resource","type":"Energistics.Datatypes.Object.Resource"}],"fullName":"Energistics.Protocol.Discovery.GetResourcesResponse","depends":["Energistics.Datatypes.Object.Resource"]}},"GrowingObject":{"GrowingObjectDelete":{"type":"record","namespace":"Energistics.Protocol.GrowingObject","name":"GrowingObjectDelete","messageType":"1","protocol":"6","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uuid","type":"string"},{"name":"uid","type":"string"}],"fullName":"Energistics.Protocol.GrowingObject.GrowingObjectDelete","depends":[]},"GrowingObjectGet":{"type":"record","namespace":"Energistics.Protocol.GrowingObject","name":"GrowingObjectGet","messageType":"3","protocol":"6","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uuid","type":"string"},{"name":"uid","type":"string"}],"fullName":"Energistics.Protocol.GrowingObject.GrowingObjectGet","depends":[]},"GrowingObjectGetRange":{"type":"record","namespace":"Energistics.Protocol.GrowingObject","name":"GrowingObjectGetRange","messageType":"4","protocol":"6","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uuid","type":"string"},{"name":"startIndex","type":"long"},{"name":"endIndex","type":"long"}],"fullName":"Energistics.Protocol.GrowingObject.GrowingObjectGetRange","depends":[]},"GrowingObjectDeleteRange":{"type":"record","namespace":"Energistics.Protocol.GrowingObject","name":"GrowingObjectDeleteRange","messageType":"2","protocol":"6","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uuid","type":"string"},{"name":"startIndex","type":"long"},{"name":"endIndex","type":"long"}],"fullName":"Energistics.Protocol.GrowingObject.GrowingObjectDeleteRange","depends":[]},"GrowingObjectPut":{"type":"record","namespace":"Energistics.Protocol.GrowingObject","name":"GrowingObjectPut","messageType":"5","protocol":"6","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uuid","type":"string"},{"name":"contentType","type":"string"},{"name":"contentEncoding","type":"string"},{"name":"data","type":"bytes"}],"fullName":"Energistics.Protocol.GrowingObject.GrowingObjectPut","depends":[]},"ObjectFragment":{"type":"record","namespace":"Energistics.Protocol.GrowingObject","name":"ObjectFragment","messageType":"6","protocol":"6","senderRole":"store","protocolRoles":"store,customer","fields":[{"name":"uuid","type":"string"},{"name":"contentType","type":"string"},{"name":"contentEncoding","type":"string"},{"name":"data","type":"bytes"}],"fullName":"Energistics.Protocol.GrowingObject.ObjectFragment","depends":[]}},"Store":{"DeleteObject":{"type":"record","namespace":"Energistics.Protocol.Store","name":"DeleteObject","messageType":"3","protocol":"4","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uri","type":{"type":"array","items":"string"}}],"fullName":"Energistics.Protocol.Store.DeleteObject","depends":[]},"PutObject":{"type":"record","namespace":"Energistics.Protocol.Store","name":"PutObject","messageType":"2","protocol":"4","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"data","type":"Energistics.Datatypes.Object.DataObject"}],"fullName":"Energistics.Protocol.Store.PutObject","depends":["Energistics.Datatypes.Object.DataObject"]},"Object":{"type":"record","namespace":"Energistics.Protocol.Store","name":"Object","messageType":"4","protocol":"4","senderRole":"store","protocolRoles":"store,customer","fields":[{"name":"dataObject","type":"Energistics.Datatypes.Object.DataObject"}],"fullName":"Energistics.Protocol.Store.Object","depends":["Energistics.Datatypes.Object.DataObject"]},"GetObject":{"type":"record","namespace":"Energistics.Protocol.Store","name":"GetObject","messageType":"1","protocol":"4","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"uri","type":"string"}],"fullName":"Energistics.Protocol.Store.GetObject","depends":[]}},"StoreNotification":{"DeleteNotification":{"type":"record","namespace":"Energistics.Protocol.StoreNotification","name":"DeleteNotification","messageType":"3","protocol":"5","senderRole":"store","protocolRoles":"store,customer","fields":[{"name":"delete","type":"Energistics.Datatypes.Object.ObjectChange"}],"fullName":"Energistics.Protocol.StoreNotification.DeleteNotification","depends":["Energistics.Datatypes.Object.ObjectChange"]},"ChangeNotification":{"type":"record","namespace":"Energistics.Protocol.StoreNotification","name":"ChangeNotification","messageType":"2","protocol":"5","senderRole":"store","protocolRoles":"store,customer","fields":[{"name":"change","type":"Energistics.Datatypes.Object.ObjectChange"}],"fullName":"Energistics.Protocol.StoreNotification.ChangeNotification","depends":["Energistics.Datatypes.Object.ObjectChange"]},"NotificationRequest":{"type":"record","namespace":"Energistics.Protocol.StoreNotification","name":"NotificationRequest","messageType":"1","protocol":"5","senderRole":"customer","protocolRoles":"store,customer","fields":[{"name":"request","type":"Energistics.Datatypes.Object.NotificationRequestRecord"}],"fullName":"Energistics.Protocol.StoreNotification.NotificationRequest","depends":["Energistics.Datatypes.Object.NotificationRequestRecord"]}}}}}');

module.exports=RalfSchemas;

},{}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var avro = require("etp-avro");
var schemas = require("./EtpSchemas.js");
var SchemaCache = (function (_super) {
    __extends(SchemaCache, _super);
    function SchemaCache(types) {
        if (types === void 0) { types = schemas.types; }
        _super.call(this, types);
        this.createProtocolMap();
    }
    SchemaCache.prototype.find = function (protocol, messageType) {
        // High-numbered messages are multi-protocol
        if (messageType >= 1000)
            protocol = 0;
        for (var schema in this) {
            if (this[schema].protocol == protocol && this[schema].messageType == messageType) {
                return this[schema];
            }
        }
        throw new Error("Schema for [" + protocol + ":" + messageType + "] not found.");
    };
    SchemaCache.prototype.createProtocolMap = function () {
    };
    return SchemaCache;
}(avro.SchemaCache));
exports.SchemaCache = SchemaCache;

},{"./EtpSchemas.js":3,"etp-avro":10}],5:[function(require,module,exports){
// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// when used in node, this will actually load the util module we depend on
// versus loading the builtin util module as happens otherwise
// this is a bug in node module loading as far as I am concerned
var util = require('util/');

var pSlice = Array.prototype.slice;
var hasOwn = Object.prototype.hasOwnProperty;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
  else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = stackStartFunction.name;
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {
  if (util.isUndefined(value)) {
    return '' + value;
  }
  if (util.isNumber(value) && !isFinite(value)) {
    return value.toString();
  }
  if (util.isFunction(value) || util.isRegExp(value)) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (util.isString(s)) {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

function getMessage(self) {
  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
         self.operator + ' ' +
         truncate(JSON.stringify(self.expected, replacer), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!util.isObject(actual) && !util.isObject(expected)) {
    return actual == expected;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b)) {
    return a === b;
  }
  var aIsArgs = isArguments(a),
      bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  var ka = objectKeys(a),
      kb = objectKeys(b),
      key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key])) return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  } else if (actual instanceof expected) {
    return true;
  } else if (expected.call({}, actual) === true) {
    return true;
  }

  return false;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (util.isString(expected)) {
    message = expected;
    expected = null;
  }

  try {
    block();
  } catch (e) {
    actual = e;
  }

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function(err) { if (err) {throw err;}};

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

},{"util/":16}],6:[function(require,module,exports){
'use strict'

exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

function init () {
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i]
    revLookup[code.charCodeAt(i)] = i
  }

  revLookup['-'.charCodeAt(0)] = 62
  revLookup['_'.charCodeAt(0)] = 63
}

init()

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0

  // base64 is 4/3 + up to two characters of the original data
  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],7:[function(require,module,exports){
(function (global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var rootParent = {}

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.foo = function () { return 42 }
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */
function Buffer (arg) {
  if (!(this instanceof Buffer)) {
    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
    if (arguments.length > 1) return new Buffer(arg, arguments[1])
    return new Buffer(arg)
  }

  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    this.length = 0
    this.parent = undefined
  }

  // Common case.
  if (typeof arg === 'number') {
    return fromNumber(this, arg)
  }

  // Slightly less common case.
  if (typeof arg === 'string') {
    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
  }

  // Unusual.
  return fromObject(this, arg)
}

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function fromNumber (that, length) {
  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < length; i++) {
      that[i] = 0
    }
  }
  return that
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

  // Assumption: byteLength() return value is always < kMaxLength.
  var length = byteLength(string, encoding) | 0
  that = allocate(that, length)

  that.write(string, encoding)
  return that
}

function fromObject (that, object) {
  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

  if (isArray(object)) return fromArray(that, object)

  if (object == null) {
    throw new TypeError('must start with number, buffer, array or string')
  }

  if (typeof ArrayBuffer !== 'undefined') {
    if (object.buffer instanceof ArrayBuffer) {
      return fromTypedArray(that, object)
    }
    if (object instanceof ArrayBuffer) {
      return fromArrayBuffer(that, object)
    }
  }

  if (object.length) return fromArrayLike(that, object)

  return fromJsonObject(that, object)
}

function fromBuffer (that, buffer) {
  var length = checked(buffer.length) | 0
  that = allocate(that, length)
  buffer.copy(that, 0, 0, length)
  return that
}

function fromArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Duplicate of fromArray() to keep fromArray() monomorphic.
function fromTypedArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  // Truncating the elements is probably not what people expect from typed
  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
  // of the old Buffer constructor.
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(array)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromTypedArray(that, new Uint8Array(array))
  }
  return that
}

function fromArrayLike (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
// Returns a zero-length buffer for inputs that don't conform to the spec.
function fromJsonObject (that, object) {
  var array
  var length = 0

  if (object.type === 'Buffer' && isArray(object.data)) {
    array = object.data
    length = checked(array.length) | 0
  }
  that = allocate(that, length)

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
} else {
  // pre-set for values that may exist in the future
  Buffer.prototype.length = undefined
  Buffer.prototype.parent = undefined
}

function allocate (that, length) {
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that.length = length
  }

  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
  if (fromPool) that.parent = rootParent

  return that
}

function checked (length) {
  // Note: cannot use `length < kMaxLength` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (subject, encoding) {
  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

  var buf = new Buffer(subject, encoding)
  delete buf.parent
  return buf
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

  if (list.length === 0) {
    return new Buffer(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; i++) {
      length += list[i].length
    }
  }

  var buf = new Buffer(length)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

function byteLength (string, encoding) {
  if (typeof string !== 'string') string = '' + string

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'binary':
      // Deprecated
      case 'raw':
      case 'raws':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  start = start | 0
  end = end === undefined || end === Infinity ? this.length : end | 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  return Buffer.compare(this, b)
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
  byteOffset >>= 0

  if (this.length === 0) return -1
  if (byteOffset >= this.length) return -1

  // Negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

  if (typeof val === 'string') {
    if (val.length === 0) return -1 // special case: looking for empty string always fails
    return String.prototype.indexOf.call(this, val, byteOffset)
  }
  if (Buffer.isBuffer(val)) {
    return arrayIndexOf(this, val, byteOffset)
  }
  if (typeof val === 'number') {
    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
    }
    return arrayIndexOf(this, [ val ], byteOffset)
  }

  function arrayIndexOf (arr, val, byteOffset) {
    var foundIndex = -1
    for (var i = 0; byteOffset + i < arr.length; i++) {
      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
      } else {
        foundIndex = -1
      }
    }
    return -1
  }

  throw new TypeError('val must be string, number or Buffer')
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) throw new Error('Invalid hex string')
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    var swap = encoding
    encoding = offset
    offset = length | 0
    length = swap
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'binary':
        return binaryWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function binarySlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
  }

  if (newBuf.length) newBuf.parent = this.parent || this

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('index out of range')
  if (offset < 0) throw new RangeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; i--) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; i++) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new RangeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; i++) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"base64-js":6,"ieee754":11,"isarray":8}],8:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],9:[function(require,module,exports){
// Generated by CoffeeScript 1.8.0
(function() {
  var $or, F, F_, T, Type, TypeAssertionError, TypeOf, TypedFun, TypedFunArgs, addCompositeTypes, arrOfMulti, arrOfOne, assert, assert1, compileSimpleTypes, compositeTypes, cpsWrapperCallback, describeType, exportAll, fillPath, funOf, isInt, makeType, nameType, nativeAssert, objOf, s, simpleTypes, util, _, _F;

  _ = require('underscore');

  util = require('util');

  nativeAssert = require('assert');

  TypeAssertionError = function(expected, actual) {
    this.message = 'expected ' + expected;
    this.expected = expected;
    this.actual = actual;
    return Error.captureStackTrace(this, this.constructor);
  };

  util.inherits(TypeAssertionError, nativeAssert.AssertionError);

  TypeAssertionError.prototype.name = 'TypeAssertionError';

  module.exports.TypeAssertionError = TypeAssertionError;

  Type = function() {};

  util.inherits(Type, Function);

  makeType = function(name, desc, test) {
    var ans, cons;
    cons = function() {};
    util.inherits(cons, Type);
    ans = (function(x) {
      return test(x);
    });
    ans.__proto__ = cons.prototype;
    ans.constructor = cons;
    ans.typeName = name;
    ans.typeDesc = desc;
    nativeAssert(_.isFunction(ans) && ans instanceof Function && ans instanceof Type && ans instanceof cons);
    return ans;
  };


  /*
  SIMPLE TYPES
   */

  isInt = function(x) {
    return _.isNumber(x) && !_.isNaN(x) && x > Number.NEGATIVE_INFINITY && x < Number.POSITIVE_INFINITY && Math.floor(x) === x;
  };

  TypedFun = function() {};

  util.inherits(TypedFun, Function);

  simpleTypes = {
    bool: ['boolean', _.isBoolean],
    num: ['number', _.isNumber],
    'num.not.nan': [
      'non-NaN number', (function(x) {
        return _.isNumber(x) && !_.isNaN(x);
      })
    ],
    'num.pos': [
      'positive number', (function(x) {
        return _.isNumber(x) && !_.isNaN(x) && x > 0;
      })
    ],
    'num.neg': [
      'negative number', (function(x) {
        return _.isNumber(x) && !_.isNaN(x) && x < 0;
      })
    ],
    'num.nonneg': [
      'nonnegative number', (function(x) {
        return _.isNumber(x) && !_.isNaN(x) && x >= 0;
      })
    ],
    'num.finite': [
      'finite number', (function(x) {
        return _.isNumber(x) && !_.isNaN(x) && x > Number.NEGATIVE_INFINITY && x < Number.POSITIVE_INFINITY;
      })
    ],
    'num.finite.pos': [
      'positive finite number', (function(x) {
        return _.isNumber(x) && !_.isNaN(x) && x > 0 && x < Number.POSITIVE_INFINITY;
      })
    ],
    'num.finite.neg': [
      'negative finite number', (function(x) {
        return _.isNumber(x) && !_.isNaN(x) && x < 0 && x > Number.NEGATIVE_INFINITY;
      })
    ],
    'num.finite.nonneg': [
      'nonnegative finite number', (function(x) {
        return _.isNumber(x) && !_.isNaN(x) && x >= 0 && x < Number.POSITIVE_INFINITY;
      })
    ],
    int: ['integer', isInt],
    'int.pos': [
      'positive integer', (function(x) {
        return isInt(x) && x > 0;
      })
    ],
    'int.neg': [
      'negative integer', (function(x) {
        return isInt(x) && x < 0;
      })
    ],
    'int.nonneg': [
      'nonnegative integer', (function(x) {
        return isInt(x) && x >= 0;
      })
    ],
    str: ['string', _.isString],
    'str.ne': [
      'nonempty string', (function(x) {
        return _.isString(x) && x.length > 0;
      })
    ],
    arr: ['array', _.isArray],
    'arr.ne': [
      'nonempty array', (function(x) {
        return _.isArray(x) && x.length > 0;
      })
    ],
    obj: [
      'object', (function(x) {
        return typeof x === 'object';
      })
    ],
    'obj.not.null': [
      'non-null object', (function(x) {
        return typeof x === 'object' && x !== null;
      })
    ],
    "null": [
      'null', (function(x) {
        return x === null;
      })
    ],
    undefined: [
      'undefined', (function(x) {
        return x === void 0;
      })
    ],
    defined: [
      'defined', (function(x) {
        return x !== void 0;
      })
    ],
    fun: ['function', _.isFunction],
    'fun.typed': [
      'typed function', (function(x) {
        return x instanceof TypedFun;
      })
    ],
    any: [
      'anything', (function(x) {
        return true;
      })
    ],
    type: [
      'type', (function(x) {
        return x instanceof Type;
      })
    ]
  };

  fillPath = function(target, path, x) {
    var key;
    if (path.length === 1) {
      return target[path] = x;
    } else {
      key = path.shift();
      if (!(key in target)) {
        target[key] = {};
      }
      return fillPath(target[key], path, x);
    }
  };

  compileSimpleTypes = function() {
    var ans, desc, key, test, _i, _len, _ref;
    ans = {};
    _ref = _.keys(simpleTypes);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      desc = simpleTypes[key][0];
      test = simpleTypes[key][1];
      fillPath(ans, key.split('.'), makeType(key, desc, test));
    }
    return ans;
  };

  s = compileSimpleTypes();


  /*
  Assert: given a type, return a function of one argument that throws
  TypeAssertionError if its argument is not of that type.
   */

  assert1 = function(ty) {
    if (!s.type(ty)) {
      throw new TypeAssertionError('type', ty);
    }
    return function(x) {
      if (ty(x)) {
        return x;
      }
      throw new TypeAssertionError(ty.typeDesc, x);
    };
  };

  assert = function() {
    var ty, tys, _i, _len;
    tys = Array.prototype.slice.call(arguments);
    if (tys.length <= 1) {
      return assert1(tys[0]);
    }
    for (_i = 0, _len = tys.length; _i < _len; _i++) {
      ty = tys[_i];
      if (!s.type(ty)) {
        throw new TypeAssertionError('type array', tys);
      }
    }
    return function() {
      var i, xs;
      xs = Array.prototype.slice.call(arguments);
      if (xs.length !== tys.length) {
        throw new TypeAssertionError('#{tys.length} value(s) to typecheck', xs);
      }
      i = 0;
      while (i < tys.length) {
        assert1(tys[i])(xs[i]);
        i++;
      }
      return xs;
    };
  };

  T = assert;


  /*
  COMPOSITE TYPES
   */

  $or = function() {
    var desc, name, tydescs, tynames, tys;
    tys = Array.prototype.slice.call(arguments);
    T(s.arr.ne)(tys);
    tys.forEach(T(s.type));
    tynames = tys.map(function(ty) {
      return ty.typeName;
    });
    name = "or(" + (tynames.join(', ')) + ")";
    tydescs = tys.map(function(ty) {
      return ty.typeDesc;
    });
    desc = "one of (" + (tydescs.join(', ')) + ")";
    return makeType(name, desc, function(x) {
      var ty, _i, _len;
      for (_i = 0, _len = tys.length; _i < _len; _i++) {
        ty = tys[_i];
        if (ty(x)) {
          return true;
        }
      }
      return false;
    });
  };

  arrOfOne = function(ne, ty) {
    return makeType("arr.of(" + ty.typeName + ")", "" + ty.typeDesc + " array", function(x) {
      var item, _i, _len;
      if (ne) {
        if (!s.arr.ne(x)) {
          return false;
        }
      } else if (!s.arr(x)) {
        return false;
      }
      for (_i = 0, _len = x.length; _i < _len; _i++) {
        item = x[_i];
        if (!ty(item)) {
          return false;
        }
      }
      return true;
    });
  };

  arrOfMulti = function(tys) {
    var descs, names;
    tys.forEach(T(s.type));
    names = tys.map(function(ty) {
      return ty.typeName;
    });
    descs = tys.map(function(ty) {
      return ty.typeDesc;
    });
    return makeType("arr.of([" + (names.join(', ')) + "])", "[" + (descs.join(', ')) + "] array", function(x) {
      var i;
      if (!_.isArray(x) || x.length !== tys.length) {
        return false;
      }
      i = 0;
      while (i < tys.length) {
        if (!tys[i](x[i])) {
          return false;
        }
        i++;
      }
      return true;
    });
  };

  objOf = function(only, proto) {
    var descItems, fd, fn, key, nameItems, protoKeys, _i, _len;
    T(s.bool, s.obj)(only, proto);
    protoKeys = _.keys(proto);
    nameItems = [];
    descItems = [];
    for (_i = 0, _len = protoKeys.length; _i < _len; _i++) {
      key = protoKeys[_i];
      T(s.type)(proto[key]);
      nameItems.push("" + key + ": " + proto[key].typeName);
      descItems.push("" + key + ": " + proto[key].typeDesc);
    }
    fn = only ? 'obj.of' : 'obj.with';
    fd = only ? 'object' : '>=object';
    return makeType("" + fn + "({" + (nameItems.join(', ')) + "})", "{" + (descItems.join(', ')) + "} " + fd, function(x) {
      var xKeys, _j, _len1;
      if (!_.isObject(x)) {
        return false;
      }
      xKeys = _.keys(x);
      if (only && _.keys(x).length !== protoKeys.length) {
        return false;
      }
      for (_j = 0, _len1 = protoKeys.length; _j < _len1; _j++) {
        key = protoKeys[_j];
        if (!proto[key](x[key])) {
          return false;
        }
      }
      return true;
    });
  };

  funOf = function(args, ret) {
    var ty, tydesc, tyname;
    T(arrOfOne(false, s.type), s.type)(args, ret);
    tyname = "fun.of([" + (args.map(function(ty) {
      return ty.typeName;
    }).join(', ')) + "], " + ret.typeName + ")";
    tydesc = "(" + (args.map(function(ty) {
      return ty.typeDesc;
    }).join(', ')) + ") -> " + ret.typeDesc;
    ty = makeType(tyname, tydesc, function(x) {
      if (!s.fun.typed(x)) {
        return false;
      }
      return tyname === x.__funType__.typeName;
    });
    ty.sig = {
      args: args,
      ret: ret
    };
    return ty;
  };

  compositeTypes = {
    'or': $or,
    funN: function(N) {
      T(s.int.nonneg)(N);
      return makeType("funN(" + N + ")", "" + N + "-ary function", function(x) {
        return s.fun(x) && x.length === N;
      });
    },
    'inst.of': function(Cons) {
      T(ty.fun)(Cons);
      return makeType("inst.of(...)", "instance of a specific constructor", function(x) {
        return s.obj(x) && (x instanceof Cons);
      });
    },
    'arr.of': function(ty) {
      T($or(s.type, s.arr))(ty);
      if (s.type(ty)) {
        return arrOfOne(false, ty);
      } else {
        return arrOfMulti(ty);
      }
    },
    'arr.ne.of': function(ty) {
      T(s.type)(ty);
      return arrOfOne(true, ty);
    },
    'obj.of': (function(proto) {
      return objOf(true, proto);
    }),
    'obj.with': (function(proto) {
      return objOf(false, proto);
    }),
    'fun.of': funOf
  };

  addCompositeTypes = function(ans) {
    var key, _i, _len, _ref;
    _ref = _.keys(compositeTypes);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      fillPath(ans, key.split('.'), compositeTypes[key]);
    }
    return ans;
  };

  TypedFunArgs = function() {
    var ans, args, fnty;
    args = Array.prototype.slice.call(arguments);
    T($or(arrOfMulti([s.type, s.fun]), arrOfMulti([arrOfOne(false, s.type), s.type, s.fun])))(args);
    if (args.length === 2) {
      fnty = args[0];
      if (!objOf(false, {
        sig: objOf(false, {
          args: arrOfOne(false, s.type),
          ret: s.type
        })
      })({
        sig: fnty.sig
      })) {
        throw new TypeAssertionError("function type (fun or fun.of(...))", fnty);
      }
      ans = {
        args_ty: fnty.sig.args,
        ret_ty: fnty.sig.ret,
        fn: args[1]
      };
    } else {
      ans = {
        args_ty: args[0],
        ret_ty: args[1],
        fn: args[2]
      };
    }
    if (ans.fn.length !== ans.args_ty.length) {
      throw new TypeAssertionError("function of " + ans.args_ty.length + " arguments for TypedFun", ans.fn.length);
    }
    return ans;
  };

  F = function() {
    var args_ty, fn, ret_ty, wrapper, _ref;
    _ref = TypedFunArgs.apply(this, arguments), args_ty = _ref.args_ty, ret_ty = _ref.ret_ty, fn = _ref.fn;
    wrapper = function() {
      T(arrOfMulti(args_ty))(Array.prototype.slice.call(arguments));
      return T(ret_ty)(fn.apply(this, arguments));
    };
    wrapper.__proto__ = TypedFun.prototype;
    wrapper.constructor = TypedFun;
    wrapper.__funType__ = funOf(args_ty, ret_ty);
    nativeAssert(_.isFunction(wrapper) && wrapper instanceof Function && wrapper instanceof TypedFun);
    return wrapper;
  };

  cpsWrapperCallback = function(ret_ty, kont) {
    return function(err, ans) {
      var tyErr;
      if (err != null) {
        return kont(err);
      }
      try {
        T(ret_ty)(ans);
      } catch (_error) {
        tyErr = _error;
        return kont(tyErr);
      }
      return kont(err, ans);
    };
  };

  F_ = function(args_ty, ret_ty, fn) {
    var wrapper, _ref;
    _ref = TypedFunArgs.apply(this, arguments), args_ty = _ref.args_ty, ret_ty = _ref.ret_ty, fn = _ref.fn;
    if (args_ty.length < 1 || !/fun.*/.test(args_ty[args_ty.length - 1].typeName)) {
      throw new TypeAssertionError("function type (fun.of(...)) as last argument in signature provided to TypedFun_", args_ty);
    }
    wrapper = function() {
      var wrapper_args;
      wrapper_args = Array.prototype.slice.call(arguments);
      T(arrOfMulti(args_ty))(wrapper_args);
      wrapper_args.push(cpsWrapperCallback(ret_ty, wrapper_args.pop()));
      return fn.apply(this, wrapper_args);
    };
    wrapper.__proto__ = TypedFun.prototype;
    wrapper.constructor = TypedFun;
    wrapper.__funType__ = funOf(args_ty, ret_ty);
    nativeAssert(_.isFunction(wrapper) && wrapper instanceof Function && wrapper instanceof TypedFun);
    return wrapper;
  };

  _F = function(args_ty, ret_ty, fn) {
    var wrapper, _ref;
    _ref = TypedFunArgs.apply(this, arguments), args_ty = _ref.args_ty, ret_ty = _ref.ret_ty, fn = _ref.fn;
    if (args_ty.length < 1 || !/fun.*/.test(args_ty[0].typeName)) {
      throw new TypeAssertionError("function type (fun.of(...)) as first argument in signature provided to TypedFun_", args_ty);
    }
    wrapper = function() {
      var wrapper_args;
      wrapper_args = Array.prototype.slice.call(arguments);
      T(arrOfMulti(args_ty))(wrapper_args);
      wrapper_args.unshift(cpsWrapperCallback(ret_ty, wrapper_args.shift()));
      return fn.apply(this, wrapper_args);
    };
    wrapper.__proto__ = TypedFun.prototype;
    wrapper.constructor = TypedFun;
    wrapper.__funType__ = funOf(args_ty, ret_ty);
    nativeAssert(_.isFunction(wrapper) && wrapper instanceof Function && wrapper instanceof TypedFun);
    return wrapper;
  };

  nameType = F([s.type], s.str.ne, function(ty) {
    return ty.typeName;
  });

  describeType = F([s.type], s.str.ne, function(ty) {
    return ty.typeDesc;
  });

  TypeOf = F([s.any], s.type, function(x) {
    switch (typeof x) {
      case "function":
        if (s.fun.typed(x)) {
          return x.__funType__;
        }
        return s.fun;
      case "object":
        return s.obj;
      case "boolean":
        return s.bool;
      case "undefined":
        return s.undefined;
      case "string":
        return s.str;
      case "number":
        return s.num;
      default:
        throw Error('unrecognized result of typeof: ' + (typeof x));
    }
  });


  /*
  EXPORTS
   */

  exportAll = function() {
    module.exports.Type = Type;
    _.extend(module.exports, s);
    addCompositeTypes(module.exports, s);
    module.exports.Assert = assert;
    module.exports.TypeAssertionError = TypeAssertionError;
    module.exports.WrapFun = F;
    module.exports.WrapFun_ = F_;
    module.exports._WrapFun = _F;
    module.exports.TypeOf = TypeOf;
    module.exports.Name = nameType;
    return module.exports.Describe = describeType;
  };

  exportAll();

}).call(this);

},{"assert":5,"underscore":14,"util":16}],10:[function(require,module,exports){
(function (Buffer){
"use strict";
var ty = require("./assert-type");
exports.T = ty.Assert;
var BinaryReader = (function () {
    function BinaryReader(schemas, buffer) {
        this.strictMode = false;
        this.buffer = null;
        this.idx = 0;
        this.schemas = {};
        this.schemas = schemas;
        this.buffer = buffer;
        if (this.buffer !== undefined)
            this.dataView = new DataView(this.buffer.buffer);
    }
    BinaryReader.prototype.decode = function (schema, buffer) {
        // this.storeSchemas(schema);
        this.buffer = new Uint8Array(buffer);
        this.dataView = new DataView(this.buffer.buffer);
        this.idx = 0;
        return this.readDatum(schema);
    };
    BinaryReader.prototype.readByte = function () {
        return this.buffer[this.idx++];
        //return this.buffer.charCodeAt(this._index++);
    };
    BinaryReader.prototype.typeOf = function (value) {
        var s = typeof value;
        if (s === 'object') {
            if (value) {
                if (value instanceof Array) {
                    s = 'array';
                }
            }
            else {
                s = 'null';
            }
        }
        return s;
    }; // typeOf
    BinaryReader.prototype.read32le = function () {
        var b;
        var v = 0;
        var i;
        for (i = 0; i < 32; i += 8) {
            b = this.readByte();
            v |= (b << i);
        }
        return v;
    };
    // Reads count for array and map
    BinaryReader.prototype.readCount = function () {
        var count = this.readLong();
        if (count < 0) {
            this.readLong();
            count = -count;
        }
        return count;
    };
    BinaryReader.prototype.readBoolean = function () {
        return (this.readByte() === 1);
    };
    BinaryReader.prototype.readInt = function () {
        var i;
        var b = this.readByte();
        var n = b & 0x7f;
        for (i = 7; i <= 28 && b > 0x7f; i += 7) {
            b = this.readByte();
            n |= (b & 0x7f) << i;
        }
        if (b > 0x7f) {
            throw "Invalid int encoding.";
        }
        return (n >>> 1) ^ -(n & 1);
    };
    BinaryReader.prototype.readLong = function () {
        // using integer math instead
        // of bitwise operations allows us to go
        // quite a bit higher in the value.
        var b = this.readByte();
        var n = b & 0x7F;
        //console.log(n);
        var negative = (b & 0x01) == 0x01;
        var shift = 128;
        while ((b & 0x80) !== 0) {
            b = this.readByte();
            //n |= (b & 0x7F) << shift
            n += (b & 0x7f) * shift;
            //console.log(((b & 0x7f)*shift) + ":" + shift);
            shift *= 128;
        }
        //if(n<0xffffffff)
        //    return (n >> 1) ^ -(n & 1)
        if (negative)
            return Math.ceil(n / 2) * -1;
        return n / 2;
    };
    BinaryReader.prototype.readFloat = function () {
        var result = this.dataView.getFloat32(this.idx, true);
        this.idx += 4;
        return result;
    };
    BinaryReader.prototype.readDouble = function () {
        var result = this.dataView.getFloat64(this.idx, true);
        this.idx += 8;
        return result;
    };
    BinaryReader.prototype.readFixed = function (len) {
        var result = [];
        var i;
        for (i = 0; i < len; i++) {
            result.push(this.readByte());
        }
        return result;
    };
    BinaryReader.prototype.readBytes = function () {
        var length = this.readLong();
        var retVal = new Uint8Array(this.buffer.buffer, this.idx, length);
        this.idx += length;
        return retVal;
    };
    BinaryReader.prototype.readString = function () {
        var len = this.readLong();
        return String.fromCharCode.apply(null, this.readFixed(len));
    };
    BinaryReader.prototype.readEnum = function () {
        return this.readInt();
    };
    BinaryReader.prototype.readArrayStart = function () {
        return this.readCount();
    };
    BinaryReader.prototype.arrayNext = function () {
        return this.readCount();
    };
    BinaryReader.prototype.readMapStart = function () {
        return this.readCount();
    };
    BinaryReader.prototype.mapNext = function () {
        return this.readCount();
    };
    BinaryReader.prototype.readArray = function (schema) {
        var result = [];
        var i = this.readArrayStart();
        while (i !== 0) {
            while (i-- > 0) {
                result.push(this.readDatum(schema.items));
            }
            i = this.arrayNext();
        }
        return result;
    };
    BinaryReader.prototype.readDatum = function (schema) {
        var type;
        var i;
        var result;
        type = this.typeOf(schema);
        switch (type) {
            case "object":
                type = schema.type;
                break;
            case "string":
                type = schema;
                break;
            case "array":
                type = "union";
                break;
            default:
                throw "R:Invalid schema type: " + type;
        }
        if (type == "null") {
            return null;
        }
        else if (type == "boolean") {
            return this.readBoolean();
        }
        else if (type == "int") {
            return this.readInt();
        }
        else if (type == "long") {
            return this.readLong();
        }
        else if (type == "float") {
            return this.readFloat();
        }
        else if (type == "double") {
            return this.readDouble();
        }
        else if (type == "bytes") {
            return this.readBytes();
        }
        else if (type == "string") {
            return this.readString();
        }
        else if (type == "record") {
            result = {};
            for (i = 0; i < schema.fields.length; i++) {
                result[schema.fields[i].name] = this.readDatum(schema.fields[i].type);
            }
            return result;
        }
        else if (type == "enum") {
            return schema.symbols[this.readEnum()];
        }
        else if (type == "array") {
            return this.readArray(schema);
        }
        else if (type == "map") {
            result = {};
            i = this.readMapStart();
            while (i !== 0) {
                while (i-- > 0) {
                    result[this.readDatum("string")] = this.readDatum(schema.values);
                }
                i = this.mapNext();
            }
            return result;
        }
        else if (type == "union") {
            var idx = this.readLong();
            var result;
            if (schema[idx] == "null") {
                result = null;
            }
            else if (schema.length == 2 && schema[0] == 'null' && idx == 1) {
                result = this.readDatum(schema[1]);
            }
            else {
                result = {};
                result[schema[idx]] = this.readDatum(schema[idx]);
            }
            return result;
        }
        else {
            if (this.schemas[type] === undefined) {
                throw "Unsupported schema type " + type;
            }
            return this.readDatum(this.schemas[type]);
        }
    };
    return BinaryReader;
}());
exports.BinaryReader = BinaryReader;
var BinaryWriter = (function () {
    function BinaryWriter(schemas) {
        this.buffer = new Uint8Array(2048);
        this._index = 0;
        this.schemas = {};
        this.dataView = new DataView(this.buffer.buffer);
        if (schemas !== undefined) {
            this.schemas = schemas;
        }
    }
    BinaryWriter.prototype.getBuffer = function () {
        var buffer = new Buffer(this._index);
        for (var i = 0; i < this._index; ++i) {
            buffer[i] = this.buffer[i];
        }
        return buffer;
    };
    BinaryWriter.prototype.getArrayBuffer = function () {
        var ab = this.buffer.buffer;
        return ab.slice(0, this._index);
    };
    BinaryWriter.prototype.alloc = function (size) {
        this.buffer = new Uint8Array(size);
        this.dataView = new DataView(this.buffer.buffer);
    };
    BinaryWriter.prototype.realloc = function (size) {
        var old = this.buffer;
        this.alloc(size * 1.6);
        this.buffer.set(old);
    };
    BinaryWriter.prototype.require = function (bytes) {
        if (this.buffer.length < this._index + bytes) {
            this.realloc(this._index + bytes);
        }
    };
    BinaryWriter.prototype.encode = function (schema, datum) {
        this._index = 0;
        this.writeDatum(schema, datum);
        return this.buffer.subarray(0, this._index);
    };
    BinaryWriter.prototype.writeByte = function (b) {
        this.require(1);
        this.buffer[this._index++] = b;
    };
    BinaryWriter.prototype.writeBoolean = function (value) {
        this.writeByte(value ? 1 : 0);
    };
    BinaryWriter.prototype.writeInt = function (value) {
        var n = ((value << 1) ^ (value >> 31));
        while ((n & ~0x7F) !== 0) {
            this.writeByte(((n & 0x7f) | 0x80));
            n >>= 7;
        }
        this.writeByte(n);
    };
    BinaryWriter.prototype.writeLong = function (value) {
        var n;
        if ((value & 0xffffffff) == value) {
            this.writeInt(value);
        }
        else {
            if (value > 0) {
                n = 2 * value;
            }
            else {
                n = Math.round((2 * Math.abs(value)) - 1);
            }
            while (n > 0x7F) {
                this.writeByte(((n & 0x7f) | 0x80));
                n /= 128;
            }
            this.writeByte(n & 0x7f);
        }
    };
    BinaryWriter.prototype.writeFloat = function (f) {
        this.require(4);
        this.dataView.setFloat32(this._index, f, true);
        this._index += 4;
    };
    BinaryWriter.prototype.writeDouble = function (value) {
        this.require(8);
        this.dataView.setFloat64(this._index, value, true);
        this._index += 8;
    };
    BinaryWriter.prototype.writeBytes = function (bytes) {
        this.writeLong(bytes.length);
        this.require(bytes.length);
        this.buffer.set(bytes, this._index);
        this._index += bytes.length;
    };
    BinaryWriter.prototype.writeString = function (str) {
        if (str == null || str.length == 0) {
            this.writeInt(0);
            return;
        }
        this.writeLong(str.length);
        this.require(str.length);
        for (var i = 0; i < str.length; i++) {
            this.buffer[this._index++] = str.charCodeAt(i);
        }
    };
    BinaryWriter.prototype.writeIndex = function (idx) {
        this.writeInt(idx);
    };
    BinaryWriter.prototype.writeMapStart = function () {
        // To Be Implemented
    };
    BinaryWriter.prototype.writeMapEnd = function () {
        // To Be Implemented
    };
    BinaryWriter.prototype.writeDatum = function (schema, datum) {
        var type;
        var i;
        var result;
        function typeOf(value) {
            var s = typeof value;
            if (s === 'object') {
                if (value) {
                    if (value instanceof Array) {
                        s = 'array';
                    }
                }
                else {
                    s = 'null';
                }
            }
            return s;
        } // typeOf
        type = typeOf(schema);
        if (type === "object") {
            type = schema.type;
        }
        else if (type === "string") {
            type = schema;
        }
        else if (type === "array") {
            type = "union";
        }
        else if (type === "undefined") {
            throw "W:Undefined schema type " + schema;
        }
        else {
            throw "W:Unrecognized schema type: " + type + schema;
        }
        switch (type) {
            // Primitive types
            case "null":
                break;
            case "boolean":
                this.writeBoolean(datum);
                break;
            case "int":
                this.writeInt(datum);
                break;
            case "long":
                this.writeLong(datum);
                break;
            case "float":
                this.writeFloat(datum);
                break;
            case "double":
                this.writeDouble(datum);
                break;
            case "bytes":
                this.writeBytes(datum);
                return;
            case "string":
                this.writeString(datum);
                return;
            // Complex types
            case "record":
                for (i = 0; i < schema.fields.length; i++) {
                    this.writeDatum(schema.fields[i].type, datum[schema.fields[i].name]);
                }
                return;
            case "enum":
                for (i = 0; i < schema.symbols.length; i++) {
                    if (schema.symbols[i] == datum) {
                        this.writeInt(i);
                        return;
                    }
                }
                if ((parseInt(datum) >= 0) && (parseInt(datum) < schema.symbols.length)) {
                    this.writeInt(datum);
                    return;
                }
                throw new Error("Invalid enum value: " + datum + " expecting: " + schema.symbols);
            case "array":
                // Friendly for javascript null array === zero-length array
                if (datum && datum.length > 0) {
                    this.writeLong(datum.length);
                    for (i = 0; i < datum.length; i++) {
                        this.writeDatum(schema.items, datum[i]);
                    }
                }
                this.writeLong(0);
                return;
            case "map":
                var count = 0;
                for (var thisVar in datum) {
                    if (datum.hasOwnProperty(thisVar)) {
                        ++count;
                    }
                }
                if (count > 0) {
                    this.writeLong(count);
                    for (var k in datum) {
                        this.writeString(k);
                        this.writeDatum(schema.values, datum[k]);
                    }
                }
                this.writeLong(0);
                break;
            case "union":
                /// Special handling for nullable unions in ETP
                if (schema[0] == 'null') {
                    if (datum == null) {
                        this.writeLong(0);
                        return;
                    }
                    else if ((schema.length == 2) && (!(datum.hasOwnProperty(schema[1])))) {
                        this.writeLong(1);
                        this.writeDatum(schema[1], datum);
                        return;
                    }
                }
                for (i = 0; i < schema.length; i++) {
                    if (datum && datum.hasOwnProperty(schema[i])) {
                        this.writeLong(i);
                        this.writeDatum(schema[i], datum[schema[i]]);
                        return;
                    }
                }
                throw "Invalid value " + datum + " for union: " + schema;
            default:
                if (this.schemas[type] === undefined) {
                    throw "Unsupported schema type " + type;
                }
                this.writeDatum(this.schemas[type], datum);
        }
    };
    return BinaryWriter;
}());
exports.BinaryWriter = BinaryWriter;
var SchemaCache = (function () {
    //schemas: Object = {};
    function SchemaCache(schemaArray) {
        for (var i = 0; i < schemaArray.length; i++) {
            this.store(schemaArray[i]);
        }
    }
    SchemaCache.prototype.importSchemas = function (filePath) {
    };
    SchemaCache.prototype.store = function (schema) {
        var fullName = schema.namespace ? (schema.namespace + "." + schema.name) : schema.name;
        if (fullName !== undefined) {
            this[fullName] = schema;
            if (schema.fields !== undefined)
                for (var i = 0; i < schema.fields.length; i++) {
                    this.store(schema.fields[i].type);
                }
        }
    };
    SchemaCache.prototype.validate = function (schema, datum) {
        var type;
        var result;
        function typeOf(value) {
            var s = typeof value;
            if (s === 'object') {
                if (value) {
                    if (value instanceof Array) {
                        s = 'array';
                    }
                }
                else {
                    s = 'null';
                }
            }
            return s;
        } // typeOf
        type = typeOf(schema);
        if (type === "object") {
            type = schema.type;
        }
        else if (type === "string") {
            type = schema;
        }
        else if (type === "array") {
            type = "union";
        }
        else if (type === "undefined") {
            throw "W:Undefined schema type " + schema;
        }
        else {
            throw "W:Unrecognized schema type: " + type + schema;
        }
        switch (type) {
            // Primitive types
            case "null":
                return exports.T(ty.null)(datum);
            case "boolean":
                exports.T(ty.bool)(datum);
                return true;
            case "int":
            case "long":
                exports.T(ty.int)(datum);
                break;
            case "float":
            case "double":
                exports.T(ty.num.not.nan)(datum);
                break;
            case "bytes":
            case "string":
                exports.T(ty.str)(datum);
                return;
            // Complex types
            case "record":
                for (var i = 0; i < schema.fields.length; i++) {
                    this.validate(schema.fields[i].type, datum[schema.fields[i].name]);
                }
                return;
            case "enum":
                for (var i = 0; i < schema.symbols.length; i++) {
                    if (schema.symbols[i] == datum) {
                        return;
                    }
                }
                throw "Invalid enum value: " + datum + " expecting: " + schema.symbols;
            case "array":
                if (datum.length > 0) {
                    for (var i = 0; i < datum.length; i++) {
                        this.validate(schema.items, datum[i]);
                    }
                }
                return;
            case "map":
                var count = 0;
                for (var thisVar in datum) {
                    if (datum.hasOwnProperty(thisVar)) {
                        ++count;
                    }
                }
                if (count > 0) {
                    for (var k in datum) {
                    }
                }
                break;
            case "union":
                for (var i = 0; i < schema.length; i++) {
                    if (datum == null && schema[i] === 'null') {
                        return;
                    }
                    if (datum && datum[schema[i]] != undefined) {
                        return;
                    }
                }
                throw "Invalid value " + datum + " for union: " + schema;
            default:
                if (this[type] === undefined) {
                    throw "Unsupported schema type " + type;
                }
                this.validate(this[type], datum);
        }
    };
    return SchemaCache;
}());
exports.SchemaCache = SchemaCache;

}).call(this,require("buffer").Buffer)
},{"./assert-type":9,"buffer":7}],11:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],12:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],13:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],14:[function(require,module,exports){
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}],15:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],16:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":15,"_process":13,"inherits":12}]},{},[1])(1)
});