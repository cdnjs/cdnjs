;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
var RalfSchemas = JSON.parse('{"namespace":"energistics","protocol":"exp","version":"","types":[{"type":"record","namespace":"Energistics.Datatypes","name":"ArrayOfDouble","fields":[{"name":"values","type":{"type":"array","items":"double"}}],"fullName":"Energistics.Datatypes.ArrayOfDouble","depends":[]},{"type":"record","namespace":"Energistics.Datatypes","name":"DateTime","fields":[{"name":"time","type":"long"},{"name":"offset","type":"float"}],"fullName":"Energistics.Datatypes.DateTime","depends":[]},{"type":"record","namespace":"Energistics.Datatypes","name":"DataValue","fields":[{"name":"item","type":["null","double","float","int","long","string","Energistics.Datatypes.DateTime","Energistics.Datatypes.ArrayOfDouble","boolean"]}],"fullName":"Energistics.Datatypes.DataValue","depends":["Energistics.Datatypes.DateTime","Energistics.Datatypes.ArrayOfDouble"]},{"type":"record","namespace":"Energistics.Datatypes","name":"DataAttribute","fields":[{"name":"attributeId","type":"int"},{"name":"attributeValue","type":"Energistics.Datatypes.DataValue"}],"fullName":"Energistics.Datatypes.DataAttribute","depends":["Energistics.Datatypes.DataValue"]},{"type":"enum","namespace":"Energistics.Datatypes","name":"ErrorCodes","symbols":["ENOROLE","ENOSUPPORTEDPROTOCOLS","EINVALID_MESSAGETYPE","EUNSUPPORTED_PROTOCOL"],"fullName":"Energistics.Datatypes.ErrorCodes","depends":[]},{"type":"record","namespace":"Energistics.Datatypes","name":"MessageHeader","fields":[{"name":"protocol","type":"int"},{"name":"messageType","type":"int"},{"name":"correlationId","type":"long"},{"name":"messageId","type":"long"},{"name":"messageFlags","type":"int"}],"fullName":"Energistics.Datatypes.MessageHeader","depends":[]},{"type":"enum","namespace":"Energistics.Datatypes","name":"Protocols","symbols":["Core","Channel_Data","Channel_Tabular","Discovery","Object_Store","Object_Query"],"fullName":"Energistics.Datatypes.Protocols","depends":[]},{"type":"record","namespace":"Energistics.Datatypes","name":"Version","fields":[{"name":"major","type":"int"},{"name":"minor","type":"int"},{"name":"revision","type":"int"},{"name":"patch","type":"int"}],"fullName":"Energistics.Datatypes.Version","depends":[]},{"type":"record","namespace":"Energistics.Datatypes","name":"SupportedProtocol","fields":[{"name":"protocol","type":"int"},{"name":"protocolVersion","type":"Energistics.Datatypes.Version"},{"name":"role","type":"string"},{"name":"protocolCapabilities","type":{"type":"map","values":"Energistics.Datatypes.DataValue"}}],"fullName":"Energistics.Datatypes.SupportedProtocol","depends":["Energistics.Datatypes.Version","Energistics.Datatypes.DataValue"]},{"type":"enum","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelIndexTypes","symbols":["Time","Depth","ElapsedTime"],"fullName":"Energistics.Datatypes.ChannelData.ChannelIndexTypes","depends":[]},{"type":"enum","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelStatuses","symbols":["Active","Inactive","Closed"],"fullName":"Energistics.Datatypes.ChannelData.ChannelStatuses","depends":[]},{"type":"enum","namespace":"Energistics.Datatypes.ChannelData","name":"ErrorCodes","symbols":["EINVALID_URI","EINVALID_CHANNELID"],"fullName":"Energistics.Datatypes.ChannelData.ErrorCodes","depends":[]},{"type":"enum","namespace":"Energistics.Datatypes.ChannelData","name":"IndexDirections","symbols":["Increasing","Decreasing"],"fullName":"Energistics.Datatypes.ChannelData.IndexDirections","depends":[]},{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"IndexMetadataRecord","fields":[{"name":"indexType","type":"Energistics.Datatypes.ChannelData.ChannelIndexTypes"},{"name":"uom","type":"string"},{"name":"datum","type":["null","string"]},{"name":"direction","type":"Energistics.Datatypes.ChannelData.IndexDirections"},{"name":"mnemonic","type":["null","string"]},{"name":"description","type":["null","string"]},{"name":"uri","type":["null","string"]}],"fullName":"Energistics.Datatypes.ChannelData.IndexMetadataRecord","depends":["Energistics.Datatypes.ChannelData.ChannelIndexTypes","Energistics.Datatypes.ChannelData.IndexDirections"]},{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"IndexValue","fields":[{"name":"item","type":["Energistics.Datatypes.DateTime","double","long"]}],"fullName":"Energistics.Datatypes.ChannelData.IndexValue","depends":["Energistics.Datatypes.DateTime"]},{"type":"record","namespace":"Energistics.Datatypes.ChannelDataFrame","name":"DataRow","fields":[{"name":"index","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.IndexValue"}},{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.DataValue"}}],"fullName":"Energistics.Datatypes.ChannelDataFrame.DataRow","depends":["Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.DataValue"]},{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelMetadataRecord","fields":[{"name":"channelUri","type":"string"},{"name":"channelId","type":"int"},{"name":"indexes","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.IndexMetadataRecord"}},{"name":"mnemonic","type":"string"},{"name":"dataType","type":"string"},{"name":"uom","type":"string"},{"name":"startIndex","type":["null","Energistics.Datatypes.ChannelData.IndexValue"]},{"name":"endIndex","type":["null","Energistics.Datatypes.ChannelData.IndexValue"]},{"name":"description","type":"string"},{"name":"status","type":"Energistics.Datatypes.ChannelData.ChannelStatuses"}],"fullName":"Energistics.Datatypes.ChannelData.ChannelMetadataRecord","depends":["Energistics.Datatypes.ChannelData.IndexMetadataRecord","Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.ChannelData.ChannelStatuses"]},{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelRangeInfo","fields":[{"name":"channelId","type":"int"},{"name":"startIndex","type":"Energistics.Datatypes.ChannelData.IndexValue"},{"name":"endIndex","type":"Energistics.Datatypes.ChannelData.IndexValue"}],"fullName":"Energistics.Datatypes.ChannelData.ChannelRangeInfo","depends":["Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.ChannelData.IndexValue"]},{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"DataItem","fields":[{"name":"indexes","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.IndexValue"}},{"name":"channelId","type":"int"},{"name":"value","type":"Energistics.Datatypes.DataValue"},{"name":"valueAttributes","type":{"type":"array","items":"Energistics.Datatypes.DataAttribute"}}],"fullName":"Energistics.Datatypes.ChannelData.DataItem","depends":["Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.DataValue","Energistics.Datatypes.DataAttribute"]},{"type":"enum","namespace":"Energistics.Datatypes.ChannelData","name":"Roles","symbols":["Producer","Consumer"],"fullName":"Energistics.Datatypes.ChannelData.Roles","depends":[]},{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"StreamingStartIndex","fields":[{"name":"item","type":["null","int","Energistics.Datatypes.ChannelData.IndexValue"]}],"fullName":"Energistics.Datatypes.ChannelData.StreamingStartIndex","depends":["Energistics.Datatypes.ChannelData.IndexValue"]},{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelStreamingInfo","fields":[{"name":"channelId","type":"int"},{"name":"startIndex","type":"Energistics.Datatypes.ChannelData.StreamingStartIndex"},{"name":"receiveChangeNotification","type":"boolean"}],"fullName":"Energistics.Datatypes.ChannelData.ChannelStreamingInfo","depends":["Energistics.Datatypes.ChannelData.StreamingStartIndex"]},{"type":"record","namespace":"Energistics.Datatypes.Object","name":"DataObject","fields":[{"name":"namespace","type":"string"},{"name":"version","type":"string"},{"name":"objectType","type":"string"},{"name":"contentType","type":"string"},{"name":"contentEncoding","type":"string"},{"name":"data","type":"bytes"}],"fullName":"Energistics.Datatypes.Object.DataObject","depends":[]},{"type":"record","namespace":"Energistics.Datatypes.Object","name":"Resource","fields":[{"name":"uri","type":"string"},{"name":"name","type":"string"},{"name":"subscribable","type":"boolean"},{"name":"customData","type":{"type":"map","values":"string"}},{"name":"resourceType","type":"string"},{"name":"hasChildren","type":"int"}],"fullName":"Energistics.Datatypes.Object.Resource","depends":[]},{"type":"record","namespace":"Energistics.Domain.Drilling","name":"TrajectoryStation","fields":[{"name":"uuid","type":"string"}],"fullName":"Energistics.Domain.Drilling.TrajectoryStation","depends":[]},{"type":"record","namespace":"Energistics.Protocol.ChannelDataFrame","name":"ChannelDataFrame","messageType":"4","protocol":"2","fields":[{"name":"channels","type":{"type":"array","items":"int"}},{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.ChannelDataFrame.DataRow"}}],"fullName":"Energistics.Protocol.ChannelDataFrame.ChannelDataFrame","depends":["Energistics.Datatypes.ChannelDataFrame.DataRow"]},{"type":"record","namespace":"Energistics.Protocol.ChannelDataFrame","name":"ChannelMetadata","messageType":"3","protocol":"2","fields":[{"name":"indexes","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.IndexMetadataRecord"}},{"name":"channels","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelMetadataRecord"}}],"fullName":"Energistics.Protocol.ChannelDataFrame.ChannelMetadata","depends":["Energistics.Datatypes.ChannelData.IndexMetadataRecord","Energistics.Datatypes.ChannelData.ChannelMetadataRecord"]},{"type":"record","namespace":"Energistics.Protocol.ChannelDataFrame","name":"RequestChannelData","messageType":"1","protocol":"2","fields":[{"name":"uri","type":"string"},{"name":"fromIndex","type":["null","Energistics.Datatypes.ChannelData.IndexValue"]},{"name":"toIndex","type":["null","Energistics.Datatypes.ChannelData.IndexValue"]}],"fullName":"Energistics.Protocol.ChannelDataFrame.RequestChannelData","depends":["Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.ChannelData.IndexValue"]},{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelData","messageType":"3","protocol":"1","fields":[{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.DataItem"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelData","depends":["Energistics.Datatypes.ChannelData.DataItem"]},{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelDataChange","messageType":"6","protocol":"1","fields":[{"name":"channelId","type":"int"},{"name":"startIndex","type":"Energistics.Datatypes.ChannelData.IndexValue"},{"name":"endIndex","type":"Energistics.Datatypes.ChannelData.IndexValue"},{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.DataItem"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelDataChange","depends":["Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.ChannelData.DataItem"]},{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelDelete","messageType":"8","protocol":"1","fields":[{"name":"channelId","type":"int"},{"name":"deleteReason","type":["null","string"]}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelDelete","depends":[]},{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelDescribe","messageType":"1","protocol":"1","fields":[{"name":"uris","type":{"type":"array","items":"string"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelDescribe","depends":[]},{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelMetadata","messageType":"2","protocol":"1","fields":[{"name":"channels","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelMetadataRecord"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelMetadata","depends":["Energistics.Datatypes.ChannelData.ChannelMetadataRecord"]},{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelRangeRequest","messageType":"9","protocol":"1","fields":[{"name":"channelRanges","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelRangeInfo"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelRangeRequest","depends":["Energistics.Datatypes.ChannelData.ChannelRangeInfo"]},{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelStatusChange","messageType":"10","protocol":"1","fields":[{"name":"channelId","type":"int"},{"name":"status","type":"Energistics.Datatypes.ChannelData.ChannelStatuses"}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelStatusChange","depends":["Energistics.Datatypes.ChannelData.ChannelStatuses"]},{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelStreamingStart","messageType":"4","protocol":"1","fields":[{"name":"channels","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelStreamingInfo"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelStreamingStart","depends":["Energistics.Datatypes.ChannelData.ChannelStreamingInfo"]},{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelStreamingStop","messageType":"5","protocol":"1","fields":[{"name":"channels","type":{"type":"array","items":"int"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelStreamingStop","depends":[]},{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"Start","messageType":"0","protocol":"1","fields":[{"name":"maxMessageRate","type":"int"},{"name":"maxDataItems","type":"int"}],"fullName":"Energistics.Protocol.ChannelStreaming.Start","depends":[]},{"type":"record","namespace":"Energistics.Protocol.Core","name":"Acknowledge","messageType":"1001","protocol":"0","fields":[],"fullName":"Energistics.Protocol.Core.Acknowledge","depends":[]},{"type":"record","namespace":"Energistics.Protocol.Core","name":"CloseSession","messageType":"5","protocol":"0","fields":[{"name":"reason","type":["null","string"]}],"fullName":"Energistics.Protocol.Core.CloseSession","depends":[]},{"type":"record","namespace":"Energistics.Protocol.Core","name":"OpenSession","messageType":"2","protocol":"0","fields":[{"name":"applicationName","type":"string"},{"name":"sessionId","type":"string"},{"name":"supportedProtocols","type":{"type":"array","items":"Energistics.Datatypes.SupportedProtocol"}}],"fullName":"Energistics.Protocol.Core.OpenSession","depends":["Energistics.Datatypes.SupportedProtocol"]},{"type":"record","namespace":"Energistics.Protocol.Core","name":"ProtocolException","messageType":"1000","protocol":"0","fields":[{"name":"errorCode","type":"int"},{"name":"errorMessage","type":"string"}],"fullName":"Energistics.Protocol.Core.ProtocolException","depends":[]},{"type":"record","namespace":"Energistics.Protocol.Core","name":"RequestSession","messageType":"1","protocol":"0","fields":[{"name":"requestedProtocols","type":{"type":"array","items":"Energistics.Datatypes.SupportedProtocol"}},{"name":"applicationName","type":"string"}],"fullName":"Energistics.Protocol.Core.RequestSession","depends":["Energistics.Datatypes.SupportedProtocol"]},{"type":"record","namespace":"Energistics.Protocol.Discovery","name":"GetResources","messageType":"1","protocol":"3","fields":[{"name":"uri","type":"string"}],"fullName":"Energistics.Protocol.Discovery.GetResources","depends":[]},{"type":"record","namespace":"Energistics.Protocol.Discovery","name":"GetResourcesResponse","messageType":"2","protocol":"3","fields":[{"name":"uri","type":"string"},{"name":"resources","type":{"type":"array","items":"Energistics.Datatypes.Object.Resource"}}],"fullName":"Energistics.Protocol.Discovery.GetResourcesResponse","depends":["Energistics.Datatypes.Object.Resource"]},{"type":"record","namespace":"Energistics.Protocol.Store","name":"AddToStore","messageType":"1","protocol":"4","fields":[{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.Object.DataObject"}}],"fullName":"Energistics.Protocol.Store.AddToStore","depends":["Energistics.Datatypes.Object.DataObject"]},{"type":"record","namespace":"Energistics.Protocol.Store","name":"DeleteFromStore","messageType":"2","protocol":"4","fields":[{"name":"uri","type":{"type":"array","items":"string"}}],"fullName":"Energistics.Protocol.Store.DeleteFromStore","depends":[]},{"type":"record","namespace":"Energistics.Protocol.Store","name":"GetFromStore","messageType":"0","protocol":"4","fields":[{"name":"uri","type":"string"}],"fullName":"Energistics.Protocol.Store.GetFromStore","depends":[]},{"type":"record","namespace":"Energistics.Protocol.Store","name":"Object","messageType":"3","protocol":"4","fields":[{"name":"dataObjects","type":{"type":"array","items":"Energistics.Datatypes.Object.DataObject"}}],"fullName":"Energistics.Protocol.Store.Object","depends":["Energistics.Datatypes.Object.DataObject"]}],"Energistics":{"Datatypes":{"ArrayOfDouble":{"type":"record","namespace":"Energistics.Datatypes","name":"ArrayOfDouble","fields":[{"name":"values","type":{"type":"array","items":"double"}}],"fullName":"Energistics.Datatypes.ArrayOfDouble","depends":[]},"DateTime":{"type":"record","namespace":"Energistics.Datatypes","name":"DateTime","fields":[{"name":"time","type":"long"},{"name":"offset","type":"float"}],"fullName":"Energistics.Datatypes.DateTime","depends":[]},"DataValue":{"type":"record","namespace":"Energistics.Datatypes","name":"DataValue","fields":[{"name":"item","type":["null","double","float","int","long","string","Energistics.Datatypes.DateTime","Energistics.Datatypes.ArrayOfDouble","boolean"]}],"fullName":"Energistics.Datatypes.DataValue","depends":["Energistics.Datatypes.DateTime","Energistics.Datatypes.ArrayOfDouble"]},"DataAttribute":{"type":"record","namespace":"Energistics.Datatypes","name":"DataAttribute","fields":[{"name":"attributeId","type":"int"},{"name":"attributeValue","type":"Energistics.Datatypes.DataValue"}],"fullName":"Energistics.Datatypes.DataAttribute","depends":["Energistics.Datatypes.DataValue"]},"ErrorCodes":{"type":"enum","namespace":"Energistics.Datatypes","name":"ErrorCodes","symbols":["ENOROLE","ENOSUPPORTEDPROTOCOLS","EINVALID_MESSAGETYPE","EUNSUPPORTED_PROTOCOL"],"fullName":"Energistics.Datatypes.ErrorCodes","depends":[]},"MessageHeader":{"type":"record","namespace":"Energistics.Datatypes","name":"MessageHeader","fields":[{"name":"protocol","type":"int"},{"name":"messageType","type":"int"},{"name":"correlationId","type":"long"},{"name":"messageId","type":"long"},{"name":"messageFlags","type":"int"}],"fullName":"Energistics.Datatypes.MessageHeader","depends":[]},"Protocols":{"type":"enum","namespace":"Energistics.Datatypes","name":"Protocols","symbols":["Core","Channel_Data","Channel_Tabular","Discovery","Object_Store","Object_Query"],"fullName":"Energistics.Datatypes.Protocols","depends":[]},"Version":{"type":"record","namespace":"Energistics.Datatypes","name":"Version","fields":[{"name":"major","type":"int"},{"name":"minor","type":"int"},{"name":"revision","type":"int"},{"name":"patch","type":"int"}],"fullName":"Energistics.Datatypes.Version","depends":[]},"SupportedProtocol":{"type":"record","namespace":"Energistics.Datatypes","name":"SupportedProtocol","fields":[{"name":"protocol","type":"int"},{"name":"protocolVersion","type":"Energistics.Datatypes.Version"},{"name":"role","type":"string"},{"name":"protocolCapabilities","type":{"type":"map","values":"Energistics.Datatypes.DataValue"}}],"fullName":"Energistics.Datatypes.SupportedProtocol","depends":["Energistics.Datatypes.Version","Energistics.Datatypes.DataValue"]},"ChannelData":{"ChannelIndexTypes":{"type":"enum","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelIndexTypes","symbols":["Time","Depth","ElapsedTime"],"fullName":"Energistics.Datatypes.ChannelData.ChannelIndexTypes","depends":[]},"ChannelStatuses":{"type":"enum","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelStatuses","symbols":["Active","Inactive","Closed"],"fullName":"Energistics.Datatypes.ChannelData.ChannelStatuses","depends":[]},"ErrorCodes":{"type":"enum","namespace":"Energistics.Datatypes.ChannelData","name":"ErrorCodes","symbols":["EINVALID_URI","EINVALID_CHANNELID"],"fullName":"Energistics.Datatypes.ChannelData.ErrorCodes","depends":[]},"IndexDirections":{"type":"enum","namespace":"Energistics.Datatypes.ChannelData","name":"IndexDirections","symbols":["Increasing","Decreasing"],"fullName":"Energistics.Datatypes.ChannelData.IndexDirections","depends":[]},"IndexMetadataRecord":{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"IndexMetadataRecord","fields":[{"name":"indexType","type":"Energistics.Datatypes.ChannelData.ChannelIndexTypes"},{"name":"uom","type":"string"},{"name":"datum","type":["null","string"]},{"name":"direction","type":"Energistics.Datatypes.ChannelData.IndexDirections"},{"name":"mnemonic","type":["null","string"]},{"name":"description","type":["null","string"]},{"name":"uri","type":["null","string"]}],"fullName":"Energistics.Datatypes.ChannelData.IndexMetadataRecord","depends":["Energistics.Datatypes.ChannelData.ChannelIndexTypes","Energistics.Datatypes.ChannelData.IndexDirections"]},"IndexValue":{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"IndexValue","fields":[{"name":"item","type":["Energistics.Datatypes.DateTime","double","long"]}],"fullName":"Energistics.Datatypes.ChannelData.IndexValue","depends":["Energistics.Datatypes.DateTime"]},"ChannelMetadataRecord":{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelMetadataRecord","fields":[{"name":"channelUri","type":"string"},{"name":"channelId","type":"int"},{"name":"indexes","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.IndexMetadataRecord"}},{"name":"mnemonic","type":"string"},{"name":"dataType","type":"string"},{"name":"uom","type":"string"},{"name":"startIndex","type":["null","Energistics.Datatypes.ChannelData.IndexValue"]},{"name":"endIndex","type":["null","Energistics.Datatypes.ChannelData.IndexValue"]},{"name":"description","type":"string"},{"name":"status","type":"Energistics.Datatypes.ChannelData.ChannelStatuses"}],"fullName":"Energistics.Datatypes.ChannelData.ChannelMetadataRecord","depends":["Energistics.Datatypes.ChannelData.IndexMetadataRecord","Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.ChannelData.ChannelStatuses"]},"ChannelRangeInfo":{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelRangeInfo","fields":[{"name":"channelId","type":"int"},{"name":"startIndex","type":"Energistics.Datatypes.ChannelData.IndexValue"},{"name":"endIndex","type":"Energistics.Datatypes.ChannelData.IndexValue"}],"fullName":"Energistics.Datatypes.ChannelData.ChannelRangeInfo","depends":["Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.ChannelData.IndexValue"]},"DataItem":{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"DataItem","fields":[{"name":"indexes","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.IndexValue"}},{"name":"channelId","type":"int"},{"name":"value","type":"Energistics.Datatypes.DataValue"},{"name":"valueAttributes","type":{"type":"array","items":"Energistics.Datatypes.DataAttribute"}}],"fullName":"Energistics.Datatypes.ChannelData.DataItem","depends":["Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.DataValue","Energistics.Datatypes.DataAttribute"]},"Roles":{"type":"enum","namespace":"Energistics.Datatypes.ChannelData","name":"Roles","symbols":["Producer","Consumer"],"fullName":"Energistics.Datatypes.ChannelData.Roles","depends":[]},"StreamingStartIndex":{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"StreamingStartIndex","fields":[{"name":"item","type":["null","int","Energistics.Datatypes.ChannelData.IndexValue"]}],"fullName":"Energistics.Datatypes.ChannelData.StreamingStartIndex","depends":["Energistics.Datatypes.ChannelData.IndexValue"]},"ChannelStreamingInfo":{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelStreamingInfo","fields":[{"name":"channelId","type":"int"},{"name":"startIndex","type":"Energistics.Datatypes.ChannelData.StreamingStartIndex"},{"name":"receiveChangeNotification","type":"boolean"}],"fullName":"Energistics.Datatypes.ChannelData.ChannelStreamingInfo","depends":["Energistics.Datatypes.ChannelData.StreamingStartIndex"]}},"ChannelDataFrame":{"DataRow":{"type":"record","namespace":"Energistics.Datatypes.ChannelDataFrame","name":"DataRow","fields":[{"name":"index","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.IndexValue"}},{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.DataValue"}}],"fullName":"Energistics.Datatypes.ChannelDataFrame.DataRow","depends":["Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.DataValue"]}},"Object":{"DataObject":{"type":"record","namespace":"Energistics.Datatypes.Object","name":"DataObject","fields":[{"name":"namespace","type":"string"},{"name":"version","type":"string"},{"name":"objectType","type":"string"},{"name":"contentType","type":"string"},{"name":"contentEncoding","type":"string"},{"name":"data","type":"bytes"}],"fullName":"Energistics.Datatypes.Object.DataObject","depends":[]},"Resource":{"type":"record","namespace":"Energistics.Datatypes.Object","name":"Resource","fields":[{"name":"uri","type":"string"},{"name":"name","type":"string"},{"name":"subscribable","type":"boolean"},{"name":"customData","type":{"type":"map","values":"string"}},{"name":"resourceType","type":"string"},{"name":"hasChildren","type":"int"}],"fullName":"Energistics.Datatypes.Object.Resource","depends":[]}}},"Domain":{"Drilling":{"TrajectoryStation":{"type":"record","namespace":"Energistics.Domain.Drilling","name":"TrajectoryStation","fields":[{"name":"uuid","type":"string"}],"fullName":"Energistics.Domain.Drilling.TrajectoryStation","depends":[]}}},"Protocol":{"ChannelDataFrame":{"ChannelDataFrame":{"type":"record","namespace":"Energistics.Protocol.ChannelDataFrame","name":"ChannelDataFrame","messageType":"4","protocol":"2","fields":[{"name":"channels","type":{"type":"array","items":"int"}},{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.ChannelDataFrame.DataRow"}}],"fullName":"Energistics.Protocol.ChannelDataFrame.ChannelDataFrame","depends":["Energistics.Datatypes.ChannelDataFrame.DataRow"]},"ChannelMetadata":{"type":"record","namespace":"Energistics.Protocol.ChannelDataFrame","name":"ChannelMetadata","messageType":"3","protocol":"2","fields":[{"name":"indexes","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.IndexMetadataRecord"}},{"name":"channels","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelMetadataRecord"}}],"fullName":"Energistics.Protocol.ChannelDataFrame.ChannelMetadata","depends":["Energistics.Datatypes.ChannelData.IndexMetadataRecord","Energistics.Datatypes.ChannelData.ChannelMetadataRecord"]},"RequestChannelData":{"type":"record","namespace":"Energistics.Protocol.ChannelDataFrame","name":"RequestChannelData","messageType":"1","protocol":"2","fields":[{"name":"uri","type":"string"},{"name":"fromIndex","type":["null","Energistics.Datatypes.ChannelData.IndexValue"]},{"name":"toIndex","type":["null","Energistics.Datatypes.ChannelData.IndexValue"]}],"fullName":"Energistics.Protocol.ChannelDataFrame.RequestChannelData","depends":["Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.ChannelData.IndexValue"]}},"ChannelStreaming":{"ChannelData":{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelData","messageType":"3","protocol":"1","fields":[{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.DataItem"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelData","depends":["Energistics.Datatypes.ChannelData.DataItem"]},"ChannelDataChange":{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelDataChange","messageType":"6","protocol":"1","fields":[{"name":"channelId","type":"int"},{"name":"startIndex","type":"Energistics.Datatypes.ChannelData.IndexValue"},{"name":"endIndex","type":"Energistics.Datatypes.ChannelData.IndexValue"},{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.DataItem"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelDataChange","depends":["Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.ChannelData.DataItem"]},"ChannelDelete":{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelDelete","messageType":"8","protocol":"1","fields":[{"name":"channelId","type":"int"},{"name":"deleteReason","type":["null","string"]}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelDelete","depends":[]},"ChannelDescribe":{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelDescribe","messageType":"1","protocol":"1","fields":[{"name":"uris","type":{"type":"array","items":"string"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelDescribe","depends":[]},"ChannelMetadata":{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelMetadata","messageType":"2","protocol":"1","fields":[{"name":"channels","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelMetadataRecord"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelMetadata","depends":["Energistics.Datatypes.ChannelData.ChannelMetadataRecord"]},"ChannelRangeRequest":{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelRangeRequest","messageType":"9","protocol":"1","fields":[{"name":"channelRanges","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelRangeInfo"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelRangeRequest","depends":["Energistics.Datatypes.ChannelData.ChannelRangeInfo"]},"ChannelStatusChange":{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelStatusChange","messageType":"10","protocol":"1","fields":[{"name":"channelId","type":"int"},{"name":"status","type":"Energistics.Datatypes.ChannelData.ChannelStatuses"}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelStatusChange","depends":["Energistics.Datatypes.ChannelData.ChannelStatuses"]},"ChannelStreamingStart":{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelStreamingStart","messageType":"4","protocol":"1","fields":[{"name":"channels","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelStreamingInfo"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelStreamingStart","depends":["Energistics.Datatypes.ChannelData.ChannelStreamingInfo"]},"ChannelStreamingStop":{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelStreamingStop","messageType":"5","protocol":"1","fields":[{"name":"channels","type":{"type":"array","items":"int"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelStreamingStop","depends":[]},"Start":{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"Start","messageType":"0","protocol":"1","fields":[{"name":"maxMessageRate","type":"int"},{"name":"maxDataItems","type":"int"}],"fullName":"Energistics.Protocol.ChannelStreaming.Start","depends":[]}},"Core":{"Acknowledge":{"type":"record","namespace":"Energistics.Protocol.Core","name":"Acknowledge","messageType":"1001","protocol":"0","fields":[],"fullName":"Energistics.Protocol.Core.Acknowledge","depends":[]},"CloseSession":{"type":"record","namespace":"Energistics.Protocol.Core","name":"CloseSession","messageType":"5","protocol":"0","fields":[{"name":"reason","type":["null","string"]}],"fullName":"Energistics.Protocol.Core.CloseSession","depends":[]},"OpenSession":{"type":"record","namespace":"Energistics.Protocol.Core","name":"OpenSession","messageType":"2","protocol":"0","fields":[{"name":"applicationName","type":"string"},{"name":"sessionId","type":"string"},{"name":"supportedProtocols","type":{"type":"array","items":"Energistics.Datatypes.SupportedProtocol"}}],"fullName":"Energistics.Protocol.Core.OpenSession","depends":["Energistics.Datatypes.SupportedProtocol"]},"ProtocolException":{"type":"record","namespace":"Energistics.Protocol.Core","name":"ProtocolException","messageType":"1000","protocol":"0","fields":[{"name":"errorCode","type":"int"},{"name":"errorMessage","type":"string"}],"fullName":"Energistics.Protocol.Core.ProtocolException","depends":[]},"RequestSession":{"type":"record","namespace":"Energistics.Protocol.Core","name":"RequestSession","messageType":"1","protocol":"0","fields":[{"name":"requestedProtocols","type":{"type":"array","items":"Energistics.Datatypes.SupportedProtocol"}},{"name":"applicationName","type":"string"}],"fullName":"Energistics.Protocol.Core.RequestSession","depends":["Energistics.Datatypes.SupportedProtocol"]}},"Discovery":{"GetResources":{"type":"record","namespace":"Energistics.Protocol.Discovery","name":"GetResources","messageType":"1","protocol":"3","fields":[{"name":"uri","type":"string"}],"fullName":"Energistics.Protocol.Discovery.GetResources","depends":[]},"GetResourcesResponse":{"type":"record","namespace":"Energistics.Protocol.Discovery","name":"GetResourcesResponse","messageType":"2","protocol":"3","fields":[{"name":"uri","type":"string"},{"name":"resources","type":{"type":"array","items":"Energistics.Datatypes.Object.Resource"}}],"fullName":"Energistics.Protocol.Discovery.GetResourcesResponse","depends":["Energistics.Datatypes.Object.Resource"]}},"Store":{"AddToStore":{"type":"record","namespace":"Energistics.Protocol.Store","name":"AddToStore","messageType":"1","protocol":"4","fields":[{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.Object.DataObject"}}],"fullName":"Energistics.Protocol.Store.AddToStore","depends":["Energistics.Datatypes.Object.DataObject"]},"DeleteFromStore":{"type":"record","namespace":"Energistics.Protocol.Store","name":"DeleteFromStore","messageType":"2","protocol":"4","fields":[{"name":"uri","type":{"type":"array","items":"string"}}],"fullName":"Energistics.Protocol.Store.DeleteFromStore","depends":[]},"GetFromStore":{"type":"record","namespace":"Energistics.Protocol.Store","name":"GetFromStore","messageType":"0","protocol":"4","fields":[{"name":"uri","type":"string"}],"fullName":"Energistics.Protocol.Store.GetFromStore","depends":[]},"Object":{"type":"record","namespace":"Energistics.Protocol.Store","name":"Object","messageType":"3","protocol":"4","fields":[{"name":"dataObjects","type":{"type":"array","items":"Energistics.Datatypes.Object.DataObject"}}],"fullName":"Energistics.Protocol.Store.Object","depends":["Energistics.Datatypes.Object.DataObject"]}}}}}');

module.exports=RalfSchemas;

},{}],2:[function(require,module,exports){
(function (Energistics) {
    (function (Datatypes) {
        var ArrayOfDouble = (function () {
            function ArrayOfDouble() {
                this.values = [];
                this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes","name":"ArrayOfDouble","fields":[{"name":"values","type":{"type":"array","items":"double"}}],"fullName":"Energistics.Datatypes.ArrayOfDouble","depends":[]}');
            }
            return ArrayOfDouble;
        })();
        Datatypes.ArrayOfDouble = ArrayOfDouble;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        var DateTime = (function () {
            function DateTime() {
                this.time = null;
                this.offset = null;
                this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes","name":"DateTime","fields":[{"name":"time","type":"long"},{"name":"offset","type":"float"}],"fullName":"Energistics.Datatypes.DateTime","depends":[]}');
            }
            return DateTime;
        })();
        Datatypes.DateTime = DateTime;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        var DataValue = (function () {
            function DataValue() {
                this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes","name":"DataValue","fields":[{"name":"item","type":["null","double","float","int","long","string","Energistics.Datatypes.DateTime","Energistics.Datatypes.ArrayOfDouble","boolean"]}],"fullName":"Energistics.Datatypes.DataValue","depends":["Energistics.Datatypes.DateTime","Energistics.Datatypes.ArrayOfDouble"]}');
            }
            return DataValue;
        })();
        Datatypes.DataValue = DataValue;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        var DataAttribute = (function () {
            function DataAttribute() {
                this.attributeId = null;
                this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes","name":"DataAttribute","fields":[{"name":"attributeId","type":"int"},{"name":"attributeValue","type":"Energistics.Datatypes.DataValue"}],"fullName":"Energistics.Datatypes.DataAttribute","depends":["Energistics.Datatypes.DataValue"]}');
            }
            return DataAttribute;
        })();
        Datatypes.DataAttribute = DataAttribute;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        (function (ErrorCodes) {
            ErrorCodes[ErrorCodes["ENOROLE"] = 0] = "ENOROLE";
            ErrorCodes[ErrorCodes["ENOSUPPORTEDPROTOCOLS"] = 1] = "ENOSUPPORTEDPROTOCOLS";
            ErrorCodes[ErrorCodes["EINVALID_MESSAGETYPE"] = 2] = "EINVALID_MESSAGETYPE";
            ErrorCodes[ErrorCodes["EUNSUPPORTED_PROTOCOL"] = 3] = "EUNSUPPORTED_PROTOCOL";
        })(Datatypes.ErrorCodes || (Datatypes.ErrorCodes = {}));
        var ErrorCodes = Datatypes.ErrorCodes;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        var MessageHeader = (function () {
            function MessageHeader() {
                this.protocol = null;
                this.messageType = null;
                this.correlationId = null;
                this.messageId = null;
                this.messageFlags = null;
                this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes","name":"MessageHeader","fields":[{"name":"protocol","type":"int"},{"name":"messageType","type":"int"},{"name":"correlationId","type":"long"},{"name":"messageId","type":"long"},{"name":"messageFlags","type":"int"}],"fullName":"Energistics.Datatypes.MessageHeader","depends":[]}');
            }
            return MessageHeader;
        })();
        Datatypes.MessageHeader = MessageHeader;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        (function (Protocols) {
            Protocols[Protocols["Core"] = 0] = "Core";
            Protocols[Protocols["Channel_Data"] = 1] = "Channel_Data";
            Protocols[Protocols["Channel_Tabular"] = 2] = "Channel_Tabular";
            Protocols[Protocols["Discovery"] = 3] = "Discovery";
            Protocols[Protocols["Object_Store"] = 4] = "Object_Store";
            Protocols[Protocols["Object_Query"] = 5] = "Object_Query";
        })(Datatypes.Protocols || (Datatypes.Protocols = {}));
        var Protocols = Datatypes.Protocols;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        var Version = (function () {
            function Version() {
                this.major = null;
                this.minor = null;
                this.revision = null;
                this.patch = null;
                this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes","name":"Version","fields":[{"name":"major","type":"int"},{"name":"minor","type":"int"},{"name":"revision","type":"int"},{"name":"patch","type":"int"}],"fullName":"Energistics.Datatypes.Version","depends":[]}');
            }
            return Version;
        })();
        Datatypes.Version = Version;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        var SupportedProtocol = (function () {
            function SupportedProtocol() {
                this.protocol = null;
                this.role = null;
                this.protocolCapabilities = {};
                this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes","name":"SupportedProtocol","fields":[{"name":"protocol","type":"int"},{"name":"protocolVersion","type":"Energistics.Datatypes.Version"},{"name":"role","type":"string"},{"name":"protocolCapabilities","type":{"type":"map","values":"Energistics.Datatypes.DataValue"}}],"fullName":"Energistics.Datatypes.SupportedProtocol","depends":["Energistics.Datatypes.Version","Energistics.Datatypes.DataValue"]}');
            }
            return SupportedProtocol;
        })();
        Datatypes.SupportedProtocol = SupportedProtocol;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        (function (ChannelData) {
            (function (ChannelIndexTypes) {
                ChannelIndexTypes[ChannelIndexTypes["Time"] = 0] = "Time";
                ChannelIndexTypes[ChannelIndexTypes["Depth"] = 1] = "Depth";
                ChannelIndexTypes[ChannelIndexTypes["ElapsedTime"] = 2] = "ElapsedTime";
            })(ChannelData.ChannelIndexTypes || (ChannelData.ChannelIndexTypes = {}));
            var ChannelIndexTypes = ChannelData.ChannelIndexTypes;
        })(Datatypes.ChannelData || (Datatypes.ChannelData = {}));
        var ChannelData = Datatypes.ChannelData;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        (function (ChannelData) {
            (function (ChannelStatuses) {
                ChannelStatuses[ChannelStatuses["Active"] = 0] = "Active";
                ChannelStatuses[ChannelStatuses["Inactive"] = 1] = "Inactive";
                ChannelStatuses[ChannelStatuses["Closed"] = 2] = "Closed";
            })(ChannelData.ChannelStatuses || (ChannelData.ChannelStatuses = {}));
            var ChannelStatuses = ChannelData.ChannelStatuses;
        })(Datatypes.ChannelData || (Datatypes.ChannelData = {}));
        var ChannelData = Datatypes.ChannelData;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        (function (ChannelData) {
            (function (ErrorCodes) {
                ErrorCodes[ErrorCodes["EINVALID_URI"] = 0] = "EINVALID_URI";
                ErrorCodes[ErrorCodes["EINVALID_CHANNELID"] = 1] = "EINVALID_CHANNELID";
            })(ChannelData.ErrorCodes || (ChannelData.ErrorCodes = {}));
            var ErrorCodes = ChannelData.ErrorCodes;
        })(Datatypes.ChannelData || (Datatypes.ChannelData = {}));
        var ChannelData = Datatypes.ChannelData;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        (function (ChannelData) {
            (function (IndexDirections) {
                IndexDirections[IndexDirections["Increasing"] = 0] = "Increasing";
                IndexDirections[IndexDirections["Decreasing"] = 1] = "Decreasing";
            })(ChannelData.IndexDirections || (ChannelData.IndexDirections = {}));
            var IndexDirections = ChannelData.IndexDirections;
        })(Datatypes.ChannelData || (Datatypes.ChannelData = {}));
        var ChannelData = Datatypes.ChannelData;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        (function (ChannelData) {
            var IndexMetadataRecord = (function () {
                function IndexMetadataRecord() {
                    this.uom = null;
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"IndexMetadataRecord","fields":[{"name":"indexType","type":"Energistics.Datatypes.ChannelData.ChannelIndexTypes"},{"name":"uom","type":"string"},{"name":"datum","type":["null","string"]},{"name":"direction","type":"Energistics.Datatypes.ChannelData.IndexDirections"},{"name":"mnemonic","type":["null","string"]},{"name":"description","type":["null","string"]},{"name":"uri","type":["null","string"]}],"fullName":"Energistics.Datatypes.ChannelData.IndexMetadataRecord","depends":["Energistics.Datatypes.ChannelData.ChannelIndexTypes","Energistics.Datatypes.ChannelData.IndexDirections"]}');
                }
                return IndexMetadataRecord;
            })();
            ChannelData.IndexMetadataRecord = IndexMetadataRecord;
        })(Datatypes.ChannelData || (Datatypes.ChannelData = {}));
        var ChannelData = Datatypes.ChannelData;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        (function (ChannelData) {
            var IndexValue = (function () {
                function IndexValue() {
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"IndexValue","fields":[{"name":"item","type":["Energistics.Datatypes.DateTime","double","long"]}],"fullName":"Energistics.Datatypes.ChannelData.IndexValue","depends":["Energistics.Datatypes.DateTime"]}');
                }
                return IndexValue;
            })();
            ChannelData.IndexValue = IndexValue;
        })(Datatypes.ChannelData || (Datatypes.ChannelData = {}));
        var ChannelData = Datatypes.ChannelData;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        (function (ChannelData) {
            var ChannelMetadataRecord = (function () {
                function ChannelMetadataRecord() {
                    this.channelUri = null;
                    this.channelId = null;
                    this.indexes = [];
                    this.mnemonic = null;
                    this.dataType = null;
                    this.uom = null;
                    this.description = null;
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelMetadataRecord","fields":[{"name":"channelUri","type":"string"},{"name":"channelId","type":"int"},{"name":"indexes","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.IndexMetadataRecord"}},{"name":"mnemonic","type":"string"},{"name":"dataType","type":"string"},{"name":"uom","type":"string"},{"name":"startIndex","type":["null","Energistics.Datatypes.ChannelData.IndexValue"]},{"name":"endIndex","type":["null","Energistics.Datatypes.ChannelData.IndexValue"]},{"name":"description","type":"string"},{"name":"status","type":"Energistics.Datatypes.ChannelData.ChannelStatuses"}],"fullName":"Energistics.Datatypes.ChannelData.ChannelMetadataRecord","depends":["Energistics.Datatypes.ChannelData.IndexMetadataRecord","Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.ChannelData.ChannelStatuses"]}');
                }
                return ChannelMetadataRecord;
            })();
            ChannelData.ChannelMetadataRecord = ChannelMetadataRecord;
        })(Datatypes.ChannelData || (Datatypes.ChannelData = {}));
        var ChannelData = Datatypes.ChannelData;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        (function (ChannelData) {
            var ChannelRangeInfo = (function () {
                function ChannelRangeInfo() {
                    this.channelId = null;
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelRangeInfo","fields":[{"name":"channelId","type":"int"},{"name":"startIndex","type":"Energistics.Datatypes.ChannelData.IndexValue"},{"name":"endIndex","type":"Energistics.Datatypes.ChannelData.IndexValue"}],"fullName":"Energistics.Datatypes.ChannelData.ChannelRangeInfo","depends":["Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.ChannelData.IndexValue"]}');
                }
                return ChannelRangeInfo;
            })();
            ChannelData.ChannelRangeInfo = ChannelRangeInfo;
        })(Datatypes.ChannelData || (Datatypes.ChannelData = {}));
        var ChannelData = Datatypes.ChannelData;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        (function (ChannelData) {
            var DataItem = (function () {
                function DataItem() {
                    this.indexes = [];
                    this.channelId = null;
                    this.valueAttributes = [];
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"DataItem","fields":[{"name":"indexes","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.IndexValue"}},{"name":"channelId","type":"int"},{"name":"value","type":"Energistics.Datatypes.DataValue"},{"name":"valueAttributes","type":{"type":"array","items":"Energistics.Datatypes.DataAttribute"}}],"fullName":"Energistics.Datatypes.ChannelData.DataItem","depends":["Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.DataValue","Energistics.Datatypes.DataAttribute"]}');
                }
                return DataItem;
            })();
            ChannelData.DataItem = DataItem;
        })(Datatypes.ChannelData || (Datatypes.ChannelData = {}));
        var ChannelData = Datatypes.ChannelData;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        (function (ChannelData) {
            (function (Roles) {
                Roles[Roles["Producer"] = 0] = "Producer";
                Roles[Roles["Consumer"] = 1] = "Consumer";
            })(ChannelData.Roles || (ChannelData.Roles = {}));
            var Roles = ChannelData.Roles;
        })(Datatypes.ChannelData || (Datatypes.ChannelData = {}));
        var ChannelData = Datatypes.ChannelData;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        (function (ChannelData) {
            var StreamingStartIndex = (function () {
                function StreamingStartIndex() {
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"StreamingStartIndex","fields":[{"name":"item","type":["null","int","Energistics.Datatypes.ChannelData.IndexValue"]}],"fullName":"Energistics.Datatypes.ChannelData.StreamingStartIndex","depends":["Energistics.Datatypes.ChannelData.IndexValue"]}');
                }
                return StreamingStartIndex;
            })();
            ChannelData.StreamingStartIndex = StreamingStartIndex;
        })(Datatypes.ChannelData || (Datatypes.ChannelData = {}));
        var ChannelData = Datatypes.ChannelData;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        (function (ChannelData) {
            var ChannelStreamingInfo = (function () {
                function ChannelStreamingInfo() {
                    this.channelId = null;
                    this.receiveChangeNotification = null;
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.ChannelData","name":"ChannelStreamingInfo","fields":[{"name":"channelId","type":"int"},{"name":"startIndex","type":"Energistics.Datatypes.ChannelData.StreamingStartIndex"},{"name":"receiveChangeNotification","type":"boolean"}],"fullName":"Energistics.Datatypes.ChannelData.ChannelStreamingInfo","depends":["Energistics.Datatypes.ChannelData.StreamingStartIndex"]}');
                }
                return ChannelStreamingInfo;
            })();
            ChannelData.ChannelStreamingInfo = ChannelStreamingInfo;
        })(Datatypes.ChannelData || (Datatypes.ChannelData = {}));
        var ChannelData = Datatypes.ChannelData;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        (function (ChannelDataFrame) {
            var DataRow = (function () {
                function DataRow() {
                    this.index = [];
                    this.data = [];
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.ChannelDataFrame","name":"DataRow","fields":[{"name":"index","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.IndexValue"}},{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.DataValue"}}],"fullName":"Energistics.Datatypes.ChannelDataFrame.DataRow","depends":["Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.DataValue"]}');
                }
                return DataRow;
            })();
            ChannelDataFrame.DataRow = DataRow;
        })(Datatypes.ChannelDataFrame || (Datatypes.ChannelDataFrame = {}));
        var ChannelDataFrame = Datatypes.ChannelDataFrame;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        (function (Object) {
            var DataObject = (function () {
                function DataObject() {
                    this.namespace = null;
                    this.version = null;
                    this.objectType = null;
                    this.contentType = null;
                    this.contentEncoding = null;
                    this.data = null;
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.Object","name":"DataObject","fields":[{"name":"namespace","type":"string"},{"name":"version","type":"string"},{"name":"objectType","type":"string"},{"name":"contentType","type":"string"},{"name":"contentEncoding","type":"string"},{"name":"data","type":"bytes"}],"fullName":"Energistics.Datatypes.Object.DataObject","depends":[]}');
                }
                return DataObject;
            })();
            Object.DataObject = DataObject;
        })(Datatypes.Object || (Datatypes.Object = {}));
        var Object = Datatypes.Object;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Datatypes) {
        (function (Object) {
            var Resource = (function () {
                function Resource() {
                    this.uri = null;
                    this.name = null;
                    this.subscribable = null;
                    this.customData = {};
                    this.resourceType = null;
                    this.hasChildren = null;
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Datatypes.Object","name":"Resource","fields":[{"name":"uri","type":"string"},{"name":"name","type":"string"},{"name":"subscribable","type":"boolean"},{"name":"customData","type":{"type":"map","values":"string"}},{"name":"resourceType","type":"string"},{"name":"hasChildren","type":"int"}],"fullName":"Energistics.Datatypes.Object.Resource","depends":[]}');
                }
                return Resource;
            })();
            Object.Resource = Resource;
        })(Datatypes.Object || (Datatypes.Object = {}));
        var Object = Datatypes.Object;
    })(Energistics.Datatypes || (Energistics.Datatypes = {}));
    var Datatypes = Energistics.Datatypes;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Domain) {
        (function (Drilling) {
            var TrajectoryStation = (function () {
                function TrajectoryStation() {
                    this.uuid = null;
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Domain.Drilling","name":"TrajectoryStation","fields":[{"name":"uuid","type":"string"}],"fullName":"Energistics.Domain.Drilling.TrajectoryStation","depends":[]}');
                }
                return TrajectoryStation;
            })();
            Drilling.TrajectoryStation = TrajectoryStation;
        })(Domain.Drilling || (Domain.Drilling = {}));
        var Drilling = Domain.Drilling;
    })(Energistics.Domain || (Energistics.Domain = {}));
    var Domain = Energistics.Domain;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (_ChannelDataFrame) {
            var ChannelDataFrame = (function () {
                function ChannelDataFrame() {
                    this.channels = [];
                    this.data = [];
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelDataFrame","name":"ChannelDataFrame","messageType":"4","protocol":"2","fields":[{"name":"channels","type":{"type":"array","items":"int"}},{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.ChannelDataFrame.DataRow"}}],"fullName":"Energistics.Protocol.ChannelDataFrame.ChannelDataFrame","depends":["Energistics.Datatypes.ChannelDataFrame.DataRow"]}');
                }
                ChannelDataFrame._protocol = 2;
                ChannelDataFrame._messageTypeId = 4;
                return ChannelDataFrame;
            })();
            _ChannelDataFrame.ChannelDataFrame = ChannelDataFrame;
        })(Protocol.ChannelDataFrame || (Protocol.ChannelDataFrame = {}));
        var ChannelDataFrame = Protocol.ChannelDataFrame;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (ChannelDataFrame) {
            var ChannelMetadata = (function () {
                function ChannelMetadata() {
                    this.indexes = [];
                    this.channels = [];
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelDataFrame","name":"ChannelMetadata","messageType":"3","protocol":"2","fields":[{"name":"indexes","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.IndexMetadataRecord"}},{"name":"channels","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelMetadataRecord"}}],"fullName":"Energistics.Protocol.ChannelDataFrame.ChannelMetadata","depends":["Energistics.Datatypes.ChannelData.IndexMetadataRecord","Energistics.Datatypes.ChannelData.ChannelMetadataRecord"]}');
                }
                ChannelMetadata._protocol = 2;
                ChannelMetadata._messageTypeId = 3;
                return ChannelMetadata;
            })();
            ChannelDataFrame.ChannelMetadata = ChannelMetadata;
        })(Protocol.ChannelDataFrame || (Protocol.ChannelDataFrame = {}));
        var ChannelDataFrame = Protocol.ChannelDataFrame;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (ChannelDataFrame) {
            var RequestChannelData = (function () {
                function RequestChannelData() {
                    this.uri = null;
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelDataFrame","name":"RequestChannelData","messageType":"1","protocol":"2","fields":[{"name":"uri","type":"string"},{"name":"fromIndex","type":["null","Energistics.Datatypes.ChannelData.IndexValue"]},{"name":"toIndex","type":["null","Energistics.Datatypes.ChannelData.IndexValue"]}],"fullName":"Energistics.Protocol.ChannelDataFrame.RequestChannelData","depends":["Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.ChannelData.IndexValue"]}');
                }
                RequestChannelData._protocol = 2;
                RequestChannelData._messageTypeId = 1;
                return RequestChannelData;
            })();
            ChannelDataFrame.RequestChannelData = RequestChannelData;
        })(Protocol.ChannelDataFrame || (Protocol.ChannelDataFrame = {}));
        var ChannelDataFrame = Protocol.ChannelDataFrame;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (ChannelStreaming) {
            var ChannelData = (function () {
                function ChannelData() {
                    this.data = [];
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelData","messageType":"3","protocol":"1","fields":[{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.DataItem"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelData","depends":["Energistics.Datatypes.ChannelData.DataItem"]}');
                }
                ChannelData._protocol = 1;
                ChannelData._messageTypeId = 3;
                return ChannelData;
            })();
            ChannelStreaming.ChannelData = ChannelData;
        })(Protocol.ChannelStreaming || (Protocol.ChannelStreaming = {}));
        var ChannelStreaming = Protocol.ChannelStreaming;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (ChannelStreaming) {
            var ChannelDataChange = (function () {
                function ChannelDataChange() {
                    this.channelId = null;
                    this.data = [];
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelDataChange","messageType":"6","protocol":"1","fields":[{"name":"channelId","type":"int"},{"name":"startIndex","type":"Energistics.Datatypes.ChannelData.IndexValue"},{"name":"endIndex","type":"Energistics.Datatypes.ChannelData.IndexValue"},{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.DataItem"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelDataChange","depends":["Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.ChannelData.IndexValue","Energistics.Datatypes.ChannelData.DataItem"]}');
                }
                ChannelDataChange._protocol = 1;
                ChannelDataChange._messageTypeId = 6;
                return ChannelDataChange;
            })();
            ChannelStreaming.ChannelDataChange = ChannelDataChange;
        })(Protocol.ChannelStreaming || (Protocol.ChannelStreaming = {}));
        var ChannelStreaming = Protocol.ChannelStreaming;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (ChannelStreaming) {
            var ChannelDelete = (function () {
                function ChannelDelete() {
                    this.channelId = null;
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelDelete","messageType":"8","protocol":"1","fields":[{"name":"channelId","type":"int"},{"name":"deleteReason","type":["null","string"]}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelDelete","depends":[]}');
                }
                ChannelDelete._protocol = 1;
                ChannelDelete._messageTypeId = 8;
                return ChannelDelete;
            })();
            ChannelStreaming.ChannelDelete = ChannelDelete;
        })(Protocol.ChannelStreaming || (Protocol.ChannelStreaming = {}));
        var ChannelStreaming = Protocol.ChannelStreaming;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (ChannelStreaming) {
            var ChannelDescribe = (function () {
                function ChannelDescribe() {
                    this.uris = [];
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelDescribe","messageType":"1","protocol":"1","fields":[{"name":"uris","type":{"type":"array","items":"string"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelDescribe","depends":[]}');
                }
                ChannelDescribe._protocol = 1;
                ChannelDescribe._messageTypeId = 1;
                return ChannelDescribe;
            })();
            ChannelStreaming.ChannelDescribe = ChannelDescribe;
        })(Protocol.ChannelStreaming || (Protocol.ChannelStreaming = {}));
        var ChannelStreaming = Protocol.ChannelStreaming;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (ChannelStreaming) {
            var ChannelMetadata = (function () {
                function ChannelMetadata() {
                    this.channels = [];
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelMetadata","messageType":"2","protocol":"1","fields":[{"name":"channels","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelMetadataRecord"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelMetadata","depends":["Energistics.Datatypes.ChannelData.ChannelMetadataRecord"]}');
                }
                ChannelMetadata._protocol = 1;
                ChannelMetadata._messageTypeId = 2;
                return ChannelMetadata;
            })();
            ChannelStreaming.ChannelMetadata = ChannelMetadata;
        })(Protocol.ChannelStreaming || (Protocol.ChannelStreaming = {}));
        var ChannelStreaming = Protocol.ChannelStreaming;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (ChannelStreaming) {
            var ChannelRangeRequest = (function () {
                function ChannelRangeRequest() {
                    this.channelRanges = [];
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelRangeRequest","messageType":"9","protocol":"1","fields":[{"name":"channelRanges","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelRangeInfo"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelRangeRequest","depends":["Energistics.Datatypes.ChannelData.ChannelRangeInfo"]}');
                }
                ChannelRangeRequest._protocol = 1;
                ChannelRangeRequest._messageTypeId = 9;
                return ChannelRangeRequest;
            })();
            ChannelStreaming.ChannelRangeRequest = ChannelRangeRequest;
        })(Protocol.ChannelStreaming || (Protocol.ChannelStreaming = {}));
        var ChannelStreaming = Protocol.ChannelStreaming;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (ChannelStreaming) {
            var ChannelStatusChange = (function () {
                function ChannelStatusChange() {
                    this.channelId = null;
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelStatusChange","messageType":"10","protocol":"1","fields":[{"name":"channelId","type":"int"},{"name":"status","type":"Energistics.Datatypes.ChannelData.ChannelStatuses"}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelStatusChange","depends":["Energistics.Datatypes.ChannelData.ChannelStatuses"]}');
                }
                ChannelStatusChange._protocol = 1;
                ChannelStatusChange._messageTypeId = 10;
                return ChannelStatusChange;
            })();
            ChannelStreaming.ChannelStatusChange = ChannelStatusChange;
        })(Protocol.ChannelStreaming || (Protocol.ChannelStreaming = {}));
        var ChannelStreaming = Protocol.ChannelStreaming;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (ChannelStreaming) {
            var ChannelStreamingStart = (function () {
                function ChannelStreamingStart() {
                    this.channels = [];
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelStreamingStart","messageType":"4","protocol":"1","fields":[{"name":"channels","type":{"type":"array","items":"Energistics.Datatypes.ChannelData.ChannelStreamingInfo"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelStreamingStart","depends":["Energistics.Datatypes.ChannelData.ChannelStreamingInfo"]}');
                }
                ChannelStreamingStart._protocol = 1;
                ChannelStreamingStart._messageTypeId = 4;
                return ChannelStreamingStart;
            })();
            ChannelStreaming.ChannelStreamingStart = ChannelStreamingStart;
        })(Protocol.ChannelStreaming || (Protocol.ChannelStreaming = {}));
        var ChannelStreaming = Protocol.ChannelStreaming;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (ChannelStreaming) {
            var ChannelStreamingStop = (function () {
                function ChannelStreamingStop() {
                    this.channels = [];
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"ChannelStreamingStop","messageType":"5","protocol":"1","fields":[{"name":"channels","type":{"type":"array","items":"int"}}],"fullName":"Energistics.Protocol.ChannelStreaming.ChannelStreamingStop","depends":[]}');
                }
                ChannelStreamingStop._protocol = 1;
                ChannelStreamingStop._messageTypeId = 5;
                return ChannelStreamingStop;
            })();
            ChannelStreaming.ChannelStreamingStop = ChannelStreamingStop;
        })(Protocol.ChannelStreaming || (Protocol.ChannelStreaming = {}));
        var ChannelStreaming = Protocol.ChannelStreaming;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (ChannelStreaming) {
            var Start = (function () {
                function Start() {
                    this.maxMessageRate = null;
                    this.maxDataItems = null;
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.ChannelStreaming","name":"Start","messageType":"0","protocol":"1","fields":[{"name":"maxMessageRate","type":"int"},{"name":"maxDataItems","type":"int"}],"fullName":"Energistics.Protocol.ChannelStreaming.Start","depends":[]}');
                }
                Start._protocol = 1;
                Start._messageTypeId = 0;
                return Start;
            })();
            ChannelStreaming.Start = Start;
        })(Protocol.ChannelStreaming || (Protocol.ChannelStreaming = {}));
        var ChannelStreaming = Protocol.ChannelStreaming;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (Core) {
            var Acknowledge = (function () {
                function Acknowledge() {
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Core","name":"Acknowledge","messageType":"1001","protocol":"0","fields":[],"fullName":"Energistics.Protocol.Core.Acknowledge","depends":[]}');
                }
                Acknowledge._protocol = 0;
                Acknowledge._messageTypeId = 1001;
                return Acknowledge;
            })();
            Core.Acknowledge = Acknowledge;
        })(Protocol.Core || (Protocol.Core = {}));
        var Core = Protocol.Core;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (Core) {
            var CloseSession = (function () {
                function CloseSession() {
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Core","name":"CloseSession","messageType":"5","protocol":"0","fields":[{"name":"reason","type":["null","string"]}],"fullName":"Energistics.Protocol.Core.CloseSession","depends":[]}');
                }
                CloseSession._protocol = 0;
                CloseSession._messageTypeId = 5;
                return CloseSession;
            })();
            Core.CloseSession = CloseSession;
        })(Protocol.Core || (Protocol.Core = {}));
        var Core = Protocol.Core;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (Core) {
            var OpenSession = (function () {
                function OpenSession() {
                    this.applicationName = null;
                    this.sessionId = null;
                    this.supportedProtocols = [];
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Core","name":"OpenSession","messageType":"2","protocol":"0","fields":[{"name":"applicationName","type":"string"},{"name":"sessionId","type":"string"},{"name":"supportedProtocols","type":{"type":"array","items":"Energistics.Datatypes.SupportedProtocol"}}],"fullName":"Energistics.Protocol.Core.OpenSession","depends":["Energistics.Datatypes.SupportedProtocol"]}');
                }
                OpenSession._protocol = 0;
                OpenSession._messageTypeId = 2;
                return OpenSession;
            })();
            Core.OpenSession = OpenSession;
        })(Protocol.Core || (Protocol.Core = {}));
        var Core = Protocol.Core;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (Core) {
            var ProtocolException = (function () {
                function ProtocolException() {
                    this.errorCode = null;
                    this.errorMessage = null;
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Core","name":"ProtocolException","messageType":"1000","protocol":"0","fields":[{"name":"errorCode","type":"int"},{"name":"errorMessage","type":"string"}],"fullName":"Energistics.Protocol.Core.ProtocolException","depends":[]}');
                }
                ProtocolException._protocol = 0;
                ProtocolException._messageTypeId = 1000;
                return ProtocolException;
            })();
            Core.ProtocolException = ProtocolException;
        })(Protocol.Core || (Protocol.Core = {}));
        var Core = Protocol.Core;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (Core) {
            var RequestSession = (function () {
                function RequestSession() {
                    this.requestedProtocols = [];
                    this.applicationName = null;
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Core","name":"RequestSession","messageType":"1","protocol":"0","fields":[{"name":"requestedProtocols","type":{"type":"array","items":"Energistics.Datatypes.SupportedProtocol"}},{"name":"applicationName","type":"string"}],"fullName":"Energistics.Protocol.Core.RequestSession","depends":["Energistics.Datatypes.SupportedProtocol"]}');
                }
                RequestSession._protocol = 0;
                RequestSession._messageTypeId = 1;
                return RequestSession;
            })();
            Core.RequestSession = RequestSession;
        })(Protocol.Core || (Protocol.Core = {}));
        var Core = Protocol.Core;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (Discovery) {
            var GetResources = (function () {
                function GetResources() {
                    this.uri = null;
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Discovery","name":"GetResources","messageType":"1","protocol":"3","fields":[{"name":"uri","type":"string"}],"fullName":"Energistics.Protocol.Discovery.GetResources","depends":[]}');
                }
                GetResources._protocol = 3;
                GetResources._messageTypeId = 1;
                return GetResources;
            })();
            Discovery.GetResources = GetResources;
        })(Protocol.Discovery || (Protocol.Discovery = {}));
        var Discovery = Protocol.Discovery;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (Discovery) {
            var GetResourcesResponse = (function () {
                function GetResourcesResponse() {
                    this.uri = null;
                    this.resources = [];
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Discovery","name":"GetResourcesResponse","messageType":"2","protocol":"3","fields":[{"name":"uri","type":"string"},{"name":"resources","type":{"type":"array","items":"Energistics.Datatypes.Object.Resource"}}],"fullName":"Energistics.Protocol.Discovery.GetResourcesResponse","depends":["Energistics.Datatypes.Object.Resource"]}');
                }
                GetResourcesResponse._protocol = 3;
                GetResourcesResponse._messageTypeId = 2;
                return GetResourcesResponse;
            })();
            Discovery.GetResourcesResponse = GetResourcesResponse;
        })(Protocol.Discovery || (Protocol.Discovery = {}));
        var Discovery = Protocol.Discovery;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (Store) {
            var AddToStore = (function () {
                function AddToStore() {
                    this.data = [];
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Store","name":"AddToStore","messageType":"1","protocol":"4","fields":[{"name":"data","type":{"type":"array","items":"Energistics.Datatypes.Object.DataObject"}}],"fullName":"Energistics.Protocol.Store.AddToStore","depends":["Energistics.Datatypes.Object.DataObject"]}');
                }
                AddToStore._protocol = 4;
                AddToStore._messageTypeId = 1;
                return AddToStore;
            })();
            Store.AddToStore = AddToStore;
        })(Protocol.Store || (Protocol.Store = {}));
        var Store = Protocol.Store;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (Store) {
            var DeleteFromStore = (function () {
                function DeleteFromStore() {
                    this.uri = [];
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Store","name":"DeleteFromStore","messageType":"2","protocol":"4","fields":[{"name":"uri","type":{"type":"array","items":"string"}}],"fullName":"Energistics.Protocol.Store.DeleteFromStore","depends":[]}');
                }
                DeleteFromStore._protocol = 4;
                DeleteFromStore._messageTypeId = 2;
                return DeleteFromStore;
            })();
            Store.DeleteFromStore = DeleteFromStore;
        })(Protocol.Store || (Protocol.Store = {}));
        var Store = Protocol.Store;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (Store) {
            var GetFromStore = (function () {
                function GetFromStore() {
                    this.uri = null;
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Store","name":"GetFromStore","messageType":"0","protocol":"4","fields":[{"name":"uri","type":"string"}],"fullName":"Energistics.Protocol.Store.GetFromStore","depends":[]}');
                }
                GetFromStore._protocol = 4;
                GetFromStore._messageTypeId = 0;
                return GetFromStore;
            })();
            Store.GetFromStore = GetFromStore;
        })(Protocol.Store || (Protocol.Store = {}));
        var Store = Protocol.Store;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
(function (Energistics) {
    (function (Protocol) {
        (function (Store) {
            var Object = (function () {
                function Object() {
                    this.dataObjects = [];
                    this._schema = JSON.parse('{"type":"record","namespace":"Energistics.Protocol.Store","name":"Object","messageType":"3","protocol":"4","fields":[{"name":"dataObjects","type":{"type":"array","items":"Energistics.Datatypes.Object.DataObject"}}],"fullName":"Energistics.Protocol.Store.Object","depends":["Energistics.Datatypes.Object.DataObject"]}');
                }
                Object._protocol = 4;
                Object._messageTypeId = 3;
                return Object;
            })();
            Store.Object = Object;
        })(Protocol.Store || (Protocol.Store = {}));
        var Store = Protocol.Store;
    })(Energistics.Protocol || (Energistics.Protocol = {}));
    var Protocol = Energistics.Protocol;
})(exports.Energistics || (exports.Energistics = {}));
var Energistics = exports.Energistics;
//# sourceMappingURL=EtpMessages.js.map

},{}],3:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
exports.avro = require('etp-avro');
exports.Messages = require('./lib/EtpMessages');
exports.Util = require('./lib/Util');
exports.Schemas = require('./lib/EtpSchemas.js');
exports.SchemaCache = require('./lib/Util').SchemaCache;

},{"./lib/EtpSchemas.js":1,"./lib/Util":4,"./lib/EtpMessages":2,"etp-avro":5}],6:[function(require,module,exports){
// nothing to see here... no file methods for the browser

},{}],7:[function(require,module,exports){
require=(function(e,t,n,r){function i(r){if(!n[r]){if(!t[r]){if(e)return e(r);throw new Error("Cannot find module '"+r+"'")}var s=n[r]={exports:{}};t[r][0](function(e){var n=t[r][1][e];return i(n?n:e)},s,s.exports)}return n[r].exports}for(var s=0;s<r.length;s++)i(r[s]);return i})(typeof require!=="undefined"&&require,{1:[function(require,module,exports){
exports.readIEEE754 = function(buffer, offset, isBE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isBE ? 0 : (nBytes - 1),
      d = isBE ? 1 : -1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.writeIEEE754 = function(buffer, value, offset, isBE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isBE ? (nBytes - 1) : 0,
      d = isBE ? -1 : 1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],2:[function(require,module,exports){
(function(){// UTILITY
var util = require('util');
var Buffer = require("buffer").Buffer;
var pSlice = Array.prototype.slice;

function objectKeys(object) {
  if (Object.keys) return Object.keys(object);
  var result = [];
  for (var name in object) {
    if (Object.prototype.hasOwnProperty.call(object, name)) {
      result.push(name);
    }
  }
  return result;
}

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
  this.message = options.message;
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
};
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {
  if (value === undefined) {
    return '' + value;
  }
  if (typeof value === 'number' && (isNaN(value) || !isFinite(value))) {
    return value.toString();
  }
  if (typeof value === 'function' || value instanceof RegExp) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (typeof s == 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

assert.AssertionError.prototype.toString = function() {
  if (this.message) {
    return [this.name + ':', this.message].join(' ');
  } else {
    return [
      this.name + ':',
      truncate(JSON.stringify(this.actual, replacer), 128),
      this.operator,
      truncate(JSON.stringify(this.expected, replacer), 128)
    ].join(' ');
  }
};

// assert.AssertionError instanceof Error

assert.AssertionError.__proto__ = Error.prototype;

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
// This statement is equivalent to assert.equal(true, guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!!!value) fail(value, true, message, '==', assert.ok);
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

  } else if (Buffer.isBuffer(actual) && Buffer.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (typeof actual != 'object' && typeof expected != 'object') {
    return actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b),
        key, i;
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
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

  if (expected instanceof RegExp) {
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

  if (typeof expected === 'string') {
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
    fail('Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail('Got unwanted exception' + message);
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
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function(err) { if (err) {throw err;}};

})()
},{"util":3,"buffer":4}],"buffer-browserify":[function(require,module,exports){
module.exports=require('q9TxCC');
},{}],"q9TxCC":[function(require,module,exports){
(function(){function SlowBuffer (size) {
    this.length = size;
};

var assert = require('assert');

exports.INSPECT_MAX_BYTES = 50;


function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; i++)
    if (str.charCodeAt(i) <= 0x7F)
      byteArray.push(str.charCodeAt(i));
    else {
      var h = encodeURIComponent(str.charAt(i)).substr(1).split('%');
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16));
    }

  return byteArray;
}

function asciiToBytes(str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++ )
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push( str.charCodeAt(i) & 0xFF );

  return byteArray;
}

function base64ToBytes(str) {
  return require("base64-js").toByteArray(str);
}

SlowBuffer.byteLength = function (str, encoding) {
  switch (encoding || "utf8") {
    case 'hex':
      return str.length / 2;

    case 'utf8':
    case 'utf-8':
      return utf8ToBytes(str).length;

    case 'ascii':
    case 'binary':
      return str.length;

    case 'base64':
      return base64ToBytes(str).length;

    default:
      throw new Error('Unknown encoding');
  }
};

function blitBuffer(src, dst, offset, length) {
  var pos, i = 0;
  while (i < length) {
    if ((i+offset >= dst.length) || (i >= src.length))
      break;

    dst[i + offset] = src[i];
    i++;
  }
  return i;
}

SlowBuffer.prototype.utf8Write = function (string, offset, length) {
  var bytes, pos;
  return SlowBuffer._charsWritten =  blitBuffer(utf8ToBytes(string), this, offset, length);
};

SlowBuffer.prototype.asciiWrite = function (string, offset, length) {
  var bytes, pos;
  return SlowBuffer._charsWritten =  blitBuffer(asciiToBytes(string), this, offset, length);
};

SlowBuffer.prototype.binaryWrite = SlowBuffer.prototype.asciiWrite;

SlowBuffer.prototype.base64Write = function (string, offset, length) {
  var bytes, pos;
  return SlowBuffer._charsWritten = blitBuffer(base64ToBytes(string), this, offset, length);
};

SlowBuffer.prototype.base64Slice = function (start, end) {
  var bytes = Array.prototype.slice.apply(this, arguments)
  return require("base64-js").fromByteArray(bytes);
}

function decodeUtf8Char(str) {
  try {
    return decodeURIComponent(str);
  } catch (err) {
    return String.fromCharCode(0xFFFD); // UTF 8 invalid char
  }
}

SlowBuffer.prototype.utf8Slice = function () {
  var bytes = Array.prototype.slice.apply(this, arguments);
  var res = "";
  var tmp = "";
  var i = 0;
  while (i < bytes.length) {
    if (bytes[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(bytes[i]);
      tmp = "";
    } else
      tmp += "%" + bytes[i].toString(16);

    i++;
  }

  return res + decodeUtf8Char(tmp);
}

SlowBuffer.prototype.asciiSlice = function () {
  var bytes = Array.prototype.slice.apply(this, arguments);
  var ret = "";
  for (var i = 0; i < bytes.length; i++)
    ret += String.fromCharCode(bytes[i]);
  return ret;
}

SlowBuffer.prototype.binarySlice = SlowBuffer.prototype.asciiSlice;

SlowBuffer.prototype.inspect = function() {
  var out = [],
      len = this.length;
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i]);
    if (i == exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...';
      break;
    }
  }
  return '<SlowBuffer ' + out.join(' ') + '>';
};


SlowBuffer.prototype.hexSlice = function(start, end) {
  var len = this.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; i++) {
    out += toHex(this[i]);
  }
  return out;
};


SlowBuffer.prototype.toString = function(encoding, start, end) {
  encoding = String(encoding || 'utf8').toLowerCase();
  start = +start || 0;
  if (typeof end == 'undefined') end = this.length;

  // Fastpath empty strings
  if (+end == start) {
    return '';
  }

  switch (encoding) {
    case 'hex':
      return this.hexSlice(start, end);

    case 'utf8':
    case 'utf-8':
      return this.utf8Slice(start, end);

    case 'ascii':
      return this.asciiSlice(start, end);

    case 'binary':
      return this.binarySlice(start, end);

    case 'base64':
      return this.base64Slice(start, end);

    case 'ucs2':
    case 'ucs-2':
      return this.ucs2Slice(start, end);

    default:
      throw new Error('Unknown encoding');
  }
};


SlowBuffer.prototype.hexWrite = function(string, offset, length) {
  offset = +offset || 0;
  var remaining = this.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = +length;
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2) {
    throw new Error('Invalid hex string');
  }
  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(byte)) throw new Error('Invalid hex string');
    this[offset + i] = byte;
  }
  SlowBuffer._charsWritten = i * 2;
  return i;
};


SlowBuffer.prototype.write = function(string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length;
      length = undefined;
    }
  } else {  // legacy
    var swap = encoding;
    encoding = offset;
    offset = length;
    length = swap;
  }

  offset = +offset || 0;
  var remaining = this.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = +length;
    if (length > remaining) {
      length = remaining;
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase();

  switch (encoding) {
    case 'hex':
      return this.hexWrite(string, offset, length);

    case 'utf8':
    case 'utf-8':
      return this.utf8Write(string, offset, length);

    case 'ascii':
      return this.asciiWrite(string, offset, length);

    case 'binary':
      return this.binaryWrite(string, offset, length);

    case 'base64':
      return this.base64Write(string, offset, length);

    case 'ucs2':
    case 'ucs-2':
      return this.ucs2Write(string, offset, length);

    default:
      throw new Error('Unknown encoding');
  }
};


// slice(start, end)
SlowBuffer.prototype.slice = function(start, end) {
  if (end === undefined) end = this.length;

  if (end > this.length) {
    throw new Error('oob');
  }
  if (start > end) {
    throw new Error('oob');
  }

  return new Buffer(this, end - start, +start);
};

SlowBuffer.prototype.copy = function(target, targetstart, sourcestart, sourceend) {
  var temp = [];
  for (var i=sourcestart; i<sourceend; i++) {
    assert.ok(typeof this[i] !== 'undefined', "copying undefined buffer bytes!");
    temp.push(this[i]);
  }

  for (var i=targetstart; i<targetstart+temp.length; i++) {
    target[i] = temp[i-targetstart];
  }
};

SlowBuffer.prototype.fill = function(value, start, end) {
  if (end > this.length) {
    throw new Error('oob');
  }
  if (start > end) {
    throw new Error('oob');
  }

  for (var i = start; i < end; i++) {
    this[i] = value;
  }
}

function coerce(length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length);
  return length < 0 ? 0 : length;
}


// Buffer

function Buffer(subject, encoding, offset) {
  if (!(this instanceof Buffer)) {
    return new Buffer(subject, encoding, offset);
  }

  var type;

  // Are we slicing?
  if (typeof offset === 'number') {
    this.length = coerce(encoding);
    this.parent = subject;
    this.offset = offset;
  } else {
    // Find the length
    switch (type = typeof subject) {
      case 'number':
        this.length = coerce(subject);
        break;

      case 'string':
        this.length = Buffer.byteLength(subject, encoding);
        break;

      case 'object': // Assume object is an array
        this.length = coerce(subject.length);
        break;

      default:
        throw new Error('First argument needs to be a number, ' +
                        'array or string.');
    }

    if (this.length > Buffer.poolSize) {
      // Big buffer, just alloc one.
      this.parent = new SlowBuffer(this.length);
      this.offset = 0;

    } else {
      // Small buffer.
      if (!pool || pool.length - pool.used < this.length) allocPool();
      this.parent = pool;
      this.offset = pool.used;
      pool.used += this.length;
    }

    // Treat array-ish objects as a byte array.
    if (isArrayIsh(subject)) {
      for (var i = 0; i < this.length; i++) {
        if (subject instanceof Buffer) {
          this.parent[i + this.offset] = subject.readUInt8(i);
        }
        else {
          this.parent[i + this.offset] = subject[i];
        }
      }
    } else if (type == 'string') {
      // We are a string
      this.length = this.write(subject, 0, encoding);
    }
  }

}

function isArrayIsh(subject) {
  return Array.isArray(subject) || Buffer.isBuffer(subject) ||
         subject && typeof subject === 'object' &&
         typeof subject.length === 'number';
}

exports.SlowBuffer = SlowBuffer;
exports.Buffer = Buffer;

Buffer.poolSize = 8 * 1024;
var pool;

function allocPool() {
  pool = new SlowBuffer(Buffer.poolSize);
  pool.used = 0;
}


// Static methods
Buffer.isBuffer = function isBuffer(b) {
  return b instanceof Buffer || b instanceof SlowBuffer;
};

Buffer.concat = function (list, totalLength) {
  if (!Array.isArray(list)) {
    throw new Error("Usage: Buffer.concat(list, [totalLength])\n \
      list should be an Array.");
  }

  if (list.length === 0) {
    return new Buffer(0);
  } else if (list.length === 1) {
    return list[0];
  }

  if (typeof totalLength !== 'number') {
    totalLength = 0;
    for (var i = 0; i < list.length; i++) {
      var buf = list[i];
      totalLength += buf.length;
    }
  }

  var buffer = new Buffer(totalLength);
  var pos = 0;
  for (var i = 0; i < list.length; i++) {
    var buf = list[i];
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
};

// Inspect
Buffer.prototype.inspect = function inspect() {
  var out = [],
      len = this.length;

  for (var i = 0; i < len; i++) {
    out[i] = toHex(this.parent[i + this.offset]);
    if (i == exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...';
      break;
    }
  }

  return '<Buffer ' + out.join(' ') + '>';
};


Buffer.prototype.get = function get(i) {
  if (i < 0 || i >= this.length) throw new Error('oob');
  return this.parent[this.offset + i];
};


Buffer.prototype.set = function set(i, v) {
  if (i < 0 || i >= this.length) throw new Error('oob');
  return this.parent[this.offset + i] = v;
};


// write(string, offset = 0, length = buffer.length-offset, encoding = 'utf8')
Buffer.prototype.write = function(string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length;
      length = undefined;
    }
  } else {  // legacy
    var swap = encoding;
    encoding = offset;
    offset = length;
    length = swap;
  }

  offset = +offset || 0;
  var remaining = this.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = +length;
    if (length > remaining) {
      length = remaining;
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase();

  var ret;
  switch (encoding) {
    case 'hex':
      ret = this.parent.hexWrite(string, this.offset + offset, length);
      break;

    case 'utf8':
    case 'utf-8':
      ret = this.parent.utf8Write(string, this.offset + offset, length);
      break;

    case 'ascii':
      ret = this.parent.asciiWrite(string, this.offset + offset, length);
      break;

    case 'binary':
      ret = this.parent.binaryWrite(string, this.offset + offset, length);
      break;

    case 'base64':
      // Warning: maxLength not taken into account in base64Write
      ret = this.parent.base64Write(string, this.offset + offset, length);
      break;

    case 'ucs2':
    case 'ucs-2':
      ret = this.parent.ucs2Write(string, this.offset + offset, length);
      break;

    default:
      throw new Error('Unknown encoding');
  }

  Buffer._charsWritten = SlowBuffer._charsWritten;

  return ret;
};


// toString(encoding, start=0, end=buffer.length)
Buffer.prototype.toString = function(encoding, start, end) {
  encoding = String(encoding || 'utf8').toLowerCase();

  if (typeof start == 'undefined' || start < 0) {
    start = 0;
  } else if (start > this.length) {
    start = this.length;
  }

  if (typeof end == 'undefined' || end > this.length) {
    end = this.length;
  } else if (end < 0) {
    end = 0;
  }

  start = start + this.offset;
  end = end + this.offset;

  switch (encoding) {
    case 'hex':
      return this.parent.hexSlice(start, end);

    case 'utf8':
    case 'utf-8':
      return this.parent.utf8Slice(start, end);

    case 'ascii':
      return this.parent.asciiSlice(start, end);

    case 'binary':
      return this.parent.binarySlice(start, end);

    case 'base64':
      return this.parent.base64Slice(start, end);

    case 'ucs2':
    case 'ucs-2':
      return this.parent.ucs2Slice(start, end);

    default:
      throw new Error('Unknown encoding');
  }
};


// byteLength
Buffer.byteLength = SlowBuffer.byteLength;


// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill(value, start, end) {
  value || (value = 0);
  start || (start = 0);
  end || (end = this.length);

  if (typeof value === 'string') {
    value = value.charCodeAt(0);
  }
  if (!(typeof value === 'number') || isNaN(value)) {
    throw new Error('value is not a number');
  }

  if (end < start) throw new Error('end < start');

  // Fill 0 bytes; we're done
  if (end === start) return 0;
  if (this.length == 0) return 0;

  if (start < 0 || start >= this.length) {
    throw new Error('start out of bounds');
  }

  if (end < 0 || end > this.length) {
    throw new Error('end out of bounds');
  }

  return this.parent.fill(value,
                          start + this.offset,
                          end + this.offset);
};


// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function(target, target_start, start, end) {
  var source = this;
  start || (start = 0);
  end || (end = this.length);
  target_start || (target_start = 0);

  if (end < start) throw new Error('sourceEnd < sourceStart');

  // Copy 0 bytes; we're done
  if (end === start) return 0;
  if (target.length == 0 || source.length == 0) return 0;

  if (target_start < 0 || target_start >= target.length) {
    throw new Error('targetStart out of bounds');
  }

  if (start < 0 || start >= source.length) {
    throw new Error('sourceStart out of bounds');
  }

  if (end < 0 || end > source.length) {
    throw new Error('sourceEnd out of bounds');
  }

  // Are we oob?
  if (end > this.length) {
    end = this.length;
  }

  if (target.length - target_start < end - start) {
    end = target.length - target_start + start;
  }

  return this.parent.copy(target.parent,
                          target_start + target.offset,
                          start + this.offset,
                          end + this.offset);
};


// slice(start, end)
Buffer.prototype.slice = function(start, end) {
  if (end === undefined) end = this.length;
  if (end > this.length) throw new Error('oob');
  if (start > end) throw new Error('oob');

  return new Buffer(this.parent, end - start, +start + this.offset);
};


// Legacy methods for backwards compatibility.

Buffer.prototype.utf8Slice = function(start, end) {
  return this.toString('utf8', start, end);
};

Buffer.prototype.binarySlice = function(start, end) {
  return this.toString('binary', start, end);
};

Buffer.prototype.asciiSlice = function(start, end) {
  return this.toString('ascii', start, end);
};

Buffer.prototype.utf8Write = function(string, offset) {
  return this.write(string, offset, 'utf8');
};

Buffer.prototype.binaryWrite = function(string, offset) {
  return this.write(string, offset, 'binary');
};

Buffer.prototype.asciiWrite = function(string, offset) {
  return this.write(string, offset, 'ascii');
};

Buffer.prototype.readUInt8 = function(offset, noAssert) {
  var buffer = this;

  if (!noAssert) {
    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'Trying to read beyond buffer length');
  }

  if (offset >= buffer.length) return;

  return buffer.parent[buffer.offset + offset];
};

function readUInt16(buffer, offset, isBigEndian, noAssert) {
  var val = 0;


  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'Trying to read beyond buffer length');
  }

  if (offset >= buffer.length) return 0;

  if (isBigEndian) {
    val = buffer.parent[buffer.offset + offset] << 8;
    if (offset + 1 < buffer.length) {
      val |= buffer.parent[buffer.offset + offset + 1];
    }
  } else {
    val = buffer.parent[buffer.offset + offset];
    if (offset + 1 < buffer.length) {
      val |= buffer.parent[buffer.offset + offset + 1] << 8;
    }
  }

  return val;
}

Buffer.prototype.readUInt16LE = function(offset, noAssert) {
  return readUInt16(this, offset, false, noAssert);
};

Buffer.prototype.readUInt16BE = function(offset, noAssert) {
  return readUInt16(this, offset, true, noAssert);
};

function readUInt32(buffer, offset, isBigEndian, noAssert) {
  var val = 0;

  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to read beyond buffer length');
  }

  if (offset >= buffer.length) return 0;

  if (isBigEndian) {
    if (offset + 1 < buffer.length)
      val = buffer.parent[buffer.offset + offset + 1] << 16;
    if (offset + 2 < buffer.length)
      val |= buffer.parent[buffer.offset + offset + 2] << 8;
    if (offset + 3 < buffer.length)
      val |= buffer.parent[buffer.offset + offset + 3];
    val = val + (buffer.parent[buffer.offset + offset] << 24 >>> 0);
  } else {
    if (offset + 2 < buffer.length)
      val = buffer.parent[buffer.offset + offset + 2] << 16;
    if (offset + 1 < buffer.length)
      val |= buffer.parent[buffer.offset + offset + 1] << 8;
    val |= buffer.parent[buffer.offset + offset];
    if (offset + 3 < buffer.length)
      val = val + (buffer.parent[buffer.offset + offset + 3] << 24 >>> 0);
  }

  return val;
}

Buffer.prototype.readUInt32LE = function(offset, noAssert) {
  return readUInt32(this, offset, false, noAssert);
};

Buffer.prototype.readUInt32BE = function(offset, noAssert) {
  return readUInt32(this, offset, true, noAssert);
};


/*
 * Signed integer types, yay team! A reminder on how two's complement actually
 * works. The first bit is the signed bit, i.e. tells us whether or not the
 * number should be positive or negative. If the two's complement value is
 * positive, then we're done, as it's equivalent to the unsigned representation.
 *
 * Now if the number is positive, you're pretty much done, you can just leverage
 * the unsigned translations and return those. Unfortunately, negative numbers
 * aren't quite that straightforward.
 *
 * At first glance, one might be inclined to use the traditional formula to
 * translate binary numbers between the positive and negative values in two's
 * complement. (Though it doesn't quite work for the most negative value)
 * Mainly:
 *  - invert all the bits
 *  - add one to the result
 *
 * Of course, this doesn't quite work in Javascript. Take for example the value
 * of -128. This could be represented in 16 bits (big-endian) as 0xff80. But of
 * course, Javascript will do the following:
 *
 * > ~0xff80
 * -65409
 *
 * Whoh there, Javascript, that's not quite right. But wait, according to
 * Javascript that's perfectly correct. When Javascript ends up seeing the
 * constant 0xff80, it has no notion that it is actually a signed number. It
 * assumes that we've input the unsigned value 0xff80. Thus, when it does the
 * binary negation, it casts it into a signed value, (positive 0xff80). Then
 * when you perform binary negation on that, it turns it into a negative number.
 *
 * Instead, we're going to have to use the following general formula, that works
 * in a rather Javascript friendly way. I'm glad we don't support this kind of
 * weird numbering scheme in the kernel.
 *
 * (BIT-MAX - (unsigned)val + 1) * -1
 *
 * The astute observer, may think that this doesn't make sense for 8-bit numbers
 * (really it isn't necessary for them). However, when you get 16-bit numbers,
 * you do. Let's go back to our prior example and see how this will look:
 *
 * (0xffff - 0xff80 + 1) * -1
 * (0x007f + 1) * -1
 * (0x0080) * -1
 */
Buffer.prototype.readInt8 = function(offset, noAssert) {
  var buffer = this;
  var neg;

  if (!noAssert) {
    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'Trying to read beyond buffer length');
  }

  if (offset >= buffer.length) return;

  neg = buffer.parent[buffer.offset + offset] & 0x80;
  if (!neg) {
    return (buffer.parent[buffer.offset + offset]);
  }

  return ((0xff - buffer.parent[buffer.offset + offset] + 1) * -1);
};

function readInt16(buffer, offset, isBigEndian, noAssert) {
  var neg, val;

  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'Trying to read beyond buffer length');
  }

  val = readUInt16(buffer, offset, isBigEndian, noAssert);
  neg = val & 0x8000;
  if (!neg) {
    return val;
  }

  return (0xffff - val + 1) * -1;
}

Buffer.prototype.readInt16LE = function(offset, noAssert) {
  return readInt16(this, offset, false, noAssert);
};

Buffer.prototype.readInt16BE = function(offset, noAssert) {
  return readInt16(this, offset, true, noAssert);
};

function readInt32(buffer, offset, isBigEndian, noAssert) {
  var neg, val;

  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to read beyond buffer length');
  }

  val = readUInt32(buffer, offset, isBigEndian, noAssert);
  neg = val & 0x80000000;
  if (!neg) {
    return (val);
  }

  return (0xffffffff - val + 1) * -1;
}

Buffer.prototype.readInt32LE = function(offset, noAssert) {
  return readInt32(this, offset, false, noAssert);
};

Buffer.prototype.readInt32BE = function(offset, noAssert) {
  return readInt32(this, offset, true, noAssert);
};

function readFloat(buffer, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset + 3 < buffer.length,
        'Trying to read beyond buffer length');
  }

  return require('./buffer_ieee754').readIEEE754(buffer, offset, isBigEndian,
      23, 4);
}

Buffer.prototype.readFloatLE = function(offset, noAssert) {
  return readFloat(this, offset, false, noAssert);
};

Buffer.prototype.readFloatBE = function(offset, noAssert) {
  return readFloat(this, offset, true, noAssert);
};

function readDouble(buffer, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset + 7 < buffer.length,
        'Trying to read beyond buffer length');
  }

  return require('./buffer_ieee754').readIEEE754(buffer, offset, isBigEndian,
      52, 8);
}

Buffer.prototype.readDoubleLE = function(offset, noAssert) {
  return readDouble(this, offset, false, noAssert);
};

Buffer.prototype.readDoubleBE = function(offset, noAssert) {
  return readDouble(this, offset, true, noAssert);
};


/*
 * We have to make sure that the value is a valid integer. This means that it is
 * non-negative. It has no fractional component and that it does not exceed the
 * maximum allowed value.
 *
 *      value           The number to check for validity
 *
 *      max             The maximum value
 */
function verifuint(value, max) {
  assert.ok(typeof (value) == 'number',
      'cannot write a non-number as a number');

  assert.ok(value >= 0,
      'specified a negative value for writing an unsigned value');

  assert.ok(value <= max, 'value is larger than maximum value for type');

  assert.ok(Math.floor(value) === value, 'value has a fractional component');
}

Buffer.prototype.writeUInt8 = function(value, offset, noAssert) {
  var buffer = this;

  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'trying to write beyond buffer length');

    verifuint(value, 0xff);
  }

  if (offset < buffer.length) {
    buffer.parent[buffer.offset + offset] = value;
  }
};

function writeUInt16(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'trying to write beyond buffer length');

    verifuint(value, 0xffff);
  }

  for (var i = 0; i < Math.min(buffer.length - offset, 2); i++) {
    buffer.parent[buffer.offset + offset + i] =
        (value & (0xff << (8 * (isBigEndian ? 1 - i : i)))) >>>
            (isBigEndian ? 1 - i : i) * 8;
  }

}

Buffer.prototype.writeUInt16LE = function(value, offset, noAssert) {
  writeUInt16(this, value, offset, false, noAssert);
};

Buffer.prototype.writeUInt16BE = function(value, offset, noAssert) {
  writeUInt16(this, value, offset, true, noAssert);
};

function writeUInt32(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'trying to write beyond buffer length');

    verifuint(value, 0xffffffff);
  }

  for (var i = 0; i < Math.min(buffer.length - offset, 4); i++) {
    buffer.parent[buffer.offset + offset + i] =
        (value >>> (isBigEndian ? 3 - i : i) * 8) & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function(value, offset, noAssert) {
  writeUInt32(this, value, offset, false, noAssert);
};

Buffer.prototype.writeUInt32BE = function(value, offset, noAssert) {
  writeUInt32(this, value, offset, true, noAssert);
};


/*
 * We now move onto our friends in the signed number category. Unlike unsigned
 * numbers, we're going to have to worry a bit more about how we put values into
 * arrays. Since we are only worrying about signed 32-bit values, we're in
 * slightly better shape. Unfortunately, we really can't do our favorite binary
 * & in this system. It really seems to do the wrong thing. For example:
 *
 * > -32 & 0xff
 * 224
 *
 * What's happening above is really: 0xe0 & 0xff = 0xe0. However, the results of
 * this aren't treated as a signed number. Ultimately a bad thing.
 *
 * What we're going to want to do is basically create the unsigned equivalent of
 * our representation and pass that off to the wuint* functions. To do that
 * we're going to do the following:
 *
 *  - if the value is positive
 *      we can pass it directly off to the equivalent wuint
 *  - if the value is negative
 *      we do the following computation:
 *         mb + val + 1, where
 *         mb   is the maximum unsigned value in that byte size
 *         val  is the Javascript negative integer
 *
 *
 * As a concrete value, take -128. In signed 16 bits this would be 0xff80. If
 * you do out the computations:
 *
 * 0xffff - 128 + 1
 * 0xffff - 127
 * 0xff80
 *
 * You can then encode this value as the signed version. This is really rather
 * hacky, but it should work and get the job done which is our goal here.
 */

/*
 * A series of checks to make sure we actually have a signed 32-bit number
 */
function verifsint(value, max, min) {
  assert.ok(typeof (value) == 'number',
      'cannot write a non-number as a number');

  assert.ok(value <= max, 'value larger than maximum allowed value');

  assert.ok(value >= min, 'value smaller than minimum allowed value');

  assert.ok(Math.floor(value) === value, 'value has a fractional component');
}

function verifIEEE754(value, max, min) {
  assert.ok(typeof (value) == 'number',
      'cannot write a non-number as a number');

  assert.ok(value <= max, 'value larger than maximum allowed value');

  assert.ok(value >= min, 'value smaller than minimum allowed value');
}

Buffer.prototype.writeInt8 = function(value, offset, noAssert) {
  var buffer = this;

  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'Trying to write beyond buffer length');

    verifsint(value, 0x7f, -0x80);
  }

  if (value >= 0) {
    buffer.writeUInt8(value, offset, noAssert);
  } else {
    buffer.writeUInt8(0xff + value + 1, offset, noAssert);
  }
};

function writeInt16(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'Trying to write beyond buffer length');

    verifsint(value, 0x7fff, -0x8000);
  }

  if (value >= 0) {
    writeUInt16(buffer, value, offset, isBigEndian, noAssert);
  } else {
    writeUInt16(buffer, 0xffff + value + 1, offset, isBigEndian, noAssert);
  }
}

Buffer.prototype.writeInt16LE = function(value, offset, noAssert) {
  writeInt16(this, value, offset, false, noAssert);
};

Buffer.prototype.writeInt16BE = function(value, offset, noAssert) {
  writeInt16(this, value, offset, true, noAssert);
};

function writeInt32(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to write beyond buffer length');

    verifsint(value, 0x7fffffff, -0x80000000);
  }

  if (value >= 0) {
    writeUInt32(buffer, value, offset, isBigEndian, noAssert);
  } else {
    writeUInt32(buffer, 0xffffffff + value + 1, offset, isBigEndian, noAssert);
  }
}

Buffer.prototype.writeInt32LE = function(value, offset, noAssert) {
  writeInt32(this, value, offset, false, noAssert);
};

Buffer.prototype.writeInt32BE = function(value, offset, noAssert) {
  writeInt32(this, value, offset, true, noAssert);
};

function writeFloat(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to write beyond buffer length');

    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }

  require('./buffer_ieee754').writeIEEE754(buffer, value, offset, isBigEndian,
      23, 4);
}

Buffer.prototype.writeFloatLE = function(value, offset, noAssert) {
  writeFloat(this, value, offset, false, noAssert);
};

Buffer.prototype.writeFloatBE = function(value, offset, noAssert) {
  writeFloat(this, value, offset, true, noAssert);
};

function writeDouble(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 7 < buffer.length,
        'Trying to write beyond buffer length');

    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }

  require('./buffer_ieee754').writeIEEE754(buffer, value, offset, isBigEndian,
      52, 8);
}

Buffer.prototype.writeDoubleLE = function(value, offset, noAssert) {
  writeDouble(this, value, offset, false, noAssert);
};

Buffer.prototype.writeDoubleBE = function(value, offset, noAssert) {
  writeDouble(this, value, offset, true, noAssert);
};

SlowBuffer.prototype.readUInt8 = Buffer.prototype.readUInt8;
SlowBuffer.prototype.readUInt16LE = Buffer.prototype.readUInt16LE;
SlowBuffer.prototype.readUInt16BE = Buffer.prototype.readUInt16BE;
SlowBuffer.prototype.readUInt32LE = Buffer.prototype.readUInt32LE;
SlowBuffer.prototype.readUInt32BE = Buffer.prototype.readUInt32BE;
SlowBuffer.prototype.readInt8 = Buffer.prototype.readInt8;
SlowBuffer.prototype.readInt16LE = Buffer.prototype.readInt16LE;
SlowBuffer.prototype.readInt16BE = Buffer.prototype.readInt16BE;
SlowBuffer.prototype.readInt32LE = Buffer.prototype.readInt32LE;
SlowBuffer.prototype.readInt32BE = Buffer.prototype.readInt32BE;
SlowBuffer.prototype.readFloatLE = Buffer.prototype.readFloatLE;
SlowBuffer.prototype.readFloatBE = Buffer.prototype.readFloatBE;
SlowBuffer.prototype.readDoubleLE = Buffer.prototype.readDoubleLE;
SlowBuffer.prototype.readDoubleBE = Buffer.prototype.readDoubleBE;
SlowBuffer.prototype.writeUInt8 = Buffer.prototype.writeUInt8;
SlowBuffer.prototype.writeUInt16LE = Buffer.prototype.writeUInt16LE;
SlowBuffer.prototype.writeUInt16BE = Buffer.prototype.writeUInt16BE;
SlowBuffer.prototype.writeUInt32LE = Buffer.prototype.writeUInt32LE;
SlowBuffer.prototype.writeUInt32BE = Buffer.prototype.writeUInt32BE;
SlowBuffer.prototype.writeInt8 = Buffer.prototype.writeInt8;
SlowBuffer.prototype.writeInt16LE = Buffer.prototype.writeInt16LE;
SlowBuffer.prototype.writeInt16BE = Buffer.prototype.writeInt16BE;
SlowBuffer.prototype.writeInt32LE = Buffer.prototype.writeInt32LE;
SlowBuffer.prototype.writeInt32BE = Buffer.prototype.writeInt32BE;
SlowBuffer.prototype.writeFloatLE = Buffer.prototype.writeFloatLE;
SlowBuffer.prototype.writeFloatBE = Buffer.prototype.writeFloatBE;
SlowBuffer.prototype.writeDoubleLE = Buffer.prototype.writeDoubleLE;
SlowBuffer.prototype.writeDoubleBE = Buffer.prototype.writeDoubleBE;

})()
},{"assert":2,"./buffer_ieee754":1,"base64-js":5}],3:[function(require,module,exports){
var events = require('events');

exports.isArray = isArray;
exports.isDate = function(obj){return Object.prototype.toString.call(obj) === '[object Date]'};
exports.isRegExp = function(obj){return Object.prototype.toString.call(obj) === '[object RegExp]'};


exports.print = function () {};
exports.puts = function () {};
exports.debug = function() {};

exports.inspect = function(obj, showHidden, depth, colors) {
  var seen = [];

  var stylize = function(str, styleType) {
    // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
    var styles =
        { 'bold' : [1, 22],
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
          'yellow' : [33, 39] };

    var style =
        { 'special': 'cyan',
          'number': 'blue',
          'boolean': 'yellow',
          'undefined': 'grey',
          'null': 'bold',
          'string': 'green',
          'date': 'magenta',
          // "name": intentionally not styling
          'regexp': 'red' }[styleType];

    if (style) {
      return '\033[' + styles[style][0] + 'm' + str +
             '\033[' + styles[style][1] + 'm';
    } else {
      return str;
    }
  };
  if (! colors) {
    stylize = function(str, styleType) { return str; };
  }

  function format(value, recurseTimes) {
    // Provide a hook for user-specified inspect functions.
    // Check that value is an object with an inspect function on it
    if (value && typeof value.inspect === 'function' &&
        // Filter out the util module, it's inspect function is special
        value !== exports &&
        // Also filter out any prototype objects using the circular check.
        !(value.constructor && value.constructor.prototype === value)) {
      return value.inspect(recurseTimes);
    }

    // Primitive types cannot have properties
    switch (typeof value) {
      case 'undefined':
        return stylize('undefined', 'undefined');

      case 'string':
        var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                                 .replace(/'/g, "\\'")
                                                 .replace(/\\"/g, '"') + '\'';
        return stylize(simple, 'string');

      case 'number':
        return stylize('' + value, 'number');

      case 'boolean':
        return stylize('' + value, 'boolean');
    }
    // For some reason typeof null is "object", so special case here.
    if (value === null) {
      return stylize('null', 'null');
    }

    // Look up the keys of the object.
    var visible_keys = Object_keys(value);
    var keys = showHidden ? Object_getOwnPropertyNames(value) : visible_keys;

    // Functions without properties can be shortcutted.
    if (typeof value === 'function' && keys.length === 0) {
      if (isRegExp(value)) {
        return stylize('' + value, 'regexp');
      } else {
        var name = value.name ? ': ' + value.name : '';
        return stylize('[Function' + name + ']', 'special');
      }
    }

    // Dates without properties can be shortcutted
    if (isDate(value) && keys.length === 0) {
      return stylize(value.toUTCString(), 'date');
    }

    var base, type, braces;
    // Determine the object type
    if (isArray(value)) {
      type = 'Array';
      braces = ['[', ']'];
    } else {
      type = 'Object';
      braces = ['{', '}'];
    }

    // Make functions say that they are functions
    if (typeof value === 'function') {
      var n = value.name ? ': ' + value.name : '';
      base = (isRegExp(value)) ? ' ' + value : ' [Function' + n + ']';
    } else {
      base = '';
    }

    // Make dates with properties first say the date
    if (isDate(value)) {
      base = ' ' + value.toUTCString();
    }

    if (keys.length === 0) {
      return braces[0] + base + braces[1];
    }

    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return stylize('' + value, 'regexp');
      } else {
        return stylize('[Object]', 'special');
      }
    }

    seen.push(value);

    var output = keys.map(function(key) {
      var name, str;
      if (value.__lookupGetter__) {
        if (value.__lookupGetter__(key)) {
          if (value.__lookupSetter__(key)) {
            str = stylize('[Getter/Setter]', 'special');
          } else {
            str = stylize('[Getter]', 'special');
          }
        } else {
          if (value.__lookupSetter__(key)) {
            str = stylize('[Setter]', 'special');
          }
        }
      }
      if (visible_keys.indexOf(key) < 0) {
        name = '[' + key + ']';
      }
      if (!str) {
        if (seen.indexOf(value[key]) < 0) {
          if (recurseTimes === null) {
            str = format(value[key]);
          } else {
            str = format(value[key], recurseTimes - 1);
          }
          if (str.indexOf('\n') > -1) {
            if (isArray(value)) {
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
          str = stylize('[Circular]', 'special');
        }
      }
      if (typeof name === 'undefined') {
        if (type === 'Array' && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify('' + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.substr(1, name.length - 2);
          name = stylize(name, 'name');
        } else {
          name = name.replace(/'/g, "\\'")
                     .replace(/\\"/g, '"')
                     .replace(/(^"|"$)/g, "'");
          name = stylize(name, 'string');
        }
      }

      return name + ': ' + str;
    });

    seen.pop();

    var numLinesEst = 0;
    var length = output.reduce(function(prev, cur) {
      numLinesEst++;
      if (cur.indexOf('\n') >= 0) numLinesEst++;
      return prev + cur.length + 1;
    }, 0);

    if (length > 50) {
      output = braces[0] +
               (base === '' ? '' : base + '\n ') +
               ' ' +
               output.join(',\n  ') +
               ' ' +
               braces[1];

    } else {
      output = braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
    }

    return output;
  }
  return format(obj, (typeof depth === 'undefined' ? 2 : depth));
};


function isArray(ar) {
  return ar instanceof Array ||
         Array.isArray(ar) ||
         (ar && ar !== Object.prototype && isArray(ar.__proto__));
}


function isRegExp(re) {
  return re instanceof RegExp ||
    (typeof re === 'object' && Object.prototype.toString.call(re) === '[object RegExp]');
}


function isDate(d) {
  if (d instanceof Date) return true;
  if (typeof d !== 'object') return false;
  var properties = Date.prototype && Object_getOwnPropertyNames(Date.prototype);
  var proto = d.__proto__ && Object_getOwnPropertyNames(d.__proto__);
  return JSON.stringify(proto) === JSON.stringify(properties);
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

exports.log = function (msg) {};

exports.pump = null;

var Object_keys = Object.keys || function (obj) {
    var res = [];
    for (var key in obj) res.push(key);
    return res;
};

var Object_getOwnPropertyNames = Object.getOwnPropertyNames || function (obj) {
    var res = [];
    for (var key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) res.push(key);
    }
    return res;
};

var Object_create = Object.create || function (prototype, properties) {
    // from es5-shim
    var object;
    if (prototype === null) {
        object = { '__proto__' : null };
    }
    else {
        if (typeof prototype !== 'object') {
            throw new TypeError(
                'typeof prototype[' + (typeof prototype) + '] != \'object\''
            );
        }
        var Type = function () {};
        Type.prototype = prototype;
        object = new Type();
        object.__proto__ = prototype;
    }
    if (typeof properties !== 'undefined' && Object.defineProperties) {
        Object.defineProperties(object, properties);
    }
    return object;
};

exports.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object_create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (typeof f !== 'string') {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(exports.inspect(arguments[i]));
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
      case '%j': return JSON.stringify(args[i++]);
      default:
        return x;
    }
  });
  for(var x = args[i]; i < len; x = args[++i]){
    if (x === null || typeof x !== 'object') {
      str += ' ' + x;
    } else {
      str += ' ' + exports.inspect(x);
    }
  }
  return str;
};

},{"events":6}],5:[function(require,module,exports){
(function (exports) {
	'use strict';

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	function b64ToByteArray(b64) {
		var i, j, l, tmp, placeHolders, arr;
	
		if (b64.length % 4 > 0) {
			throw 'Invalid string. Length must be a multiple of 4';
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		placeHolders = b64.indexOf('=');
		placeHolders = placeHolders > 0 ? b64.length - placeHolders : 0;

		// base64 is 4/3 + up to two characters of the original data
		arr = [];//new Uint8Array(b64.length * 3 / 4 - placeHolders);

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length;

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (lookup.indexOf(b64[i]) << 18) | (lookup.indexOf(b64[i + 1]) << 12) | (lookup.indexOf(b64[i + 2]) << 6) | lookup.indexOf(b64[i + 3]);
			arr.push((tmp & 0xFF0000) >> 16);
			arr.push((tmp & 0xFF00) >> 8);
			arr.push(tmp & 0xFF);
		}

		if (placeHolders === 2) {
			tmp = (lookup.indexOf(b64[i]) << 2) | (lookup.indexOf(b64[i + 1]) >> 4);
			arr.push(tmp & 0xFF);
		} else if (placeHolders === 1) {
			tmp = (lookup.indexOf(b64[i]) << 10) | (lookup.indexOf(b64[i + 1]) << 4) | (lookup.indexOf(b64[i + 2]) >> 2);
			arr.push((tmp >> 8) & 0xFF);
			arr.push(tmp & 0xFF);
		}

		return arr;
	}

	function uint8ToBase64(uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length;

		function tripletToBase64 (num) {
			return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
		};

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
			output += tripletToBase64(temp);
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1];
				output += lookup[temp >> 2];
				output += lookup[(temp << 4) & 0x3F];
				output += '==';
				break;
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1]);
				output += lookup[temp >> 10];
				output += lookup[(temp >> 4) & 0x3F];
				output += lookup[(temp << 2) & 0x3F];
				output += '=';
				break;
		}

		return output;
	}

	module.exports.toByteArray = b64ToByteArray;
	module.exports.fromByteArray = uint8ToBase64;
}());

},{}],7:[function(require,module,exports){
exports.readIEEE754 = function(buffer, offset, isBE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isBE ? 0 : (nBytes - 1),
      d = isBE ? 1 : -1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.writeIEEE754 = function(buffer, value, offset, isBE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isBE ? (nBytes - 1) : 0,
      d = isBE ? -1 : 1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],8:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            if (ev.source === window && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],6:[function(require,module,exports){
(function(process){if (!process.EventEmitter) process.EventEmitter = function () {};

var EventEmitter = exports.EventEmitter = process.EventEmitter;
var isArray = typeof Array.isArray === 'function'
    ? Array.isArray
    : function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]'
    }
;
function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0; i < xs.length; i++) {
        if (x === xs[i]) return i;
    }
    return -1;
}

// By default EventEmitters will print a warning if more than
// 10 listeners are added to it. This is a useful default which
// helps finding memory leaks.
//
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
var defaultMaxListeners = 10;
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!this._events) this._events = {};
  this._events.maxListeners = n;
};


EventEmitter.prototype.emit = function(type) {
  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events || !this._events.error ||
        (isArray(this._events.error) && !this._events.error.length))
    {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }
  }

  if (!this._events) return false;
  var handler = this._events[type];
  if (!handler) return false;

  if (typeof handler == 'function') {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        var args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
    return true;

  } else if (isArray(handler)) {
    var args = Array.prototype.slice.call(arguments, 1);

    var listeners = handler.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
      listeners[i].apply(this, args);
    }
    return true;

  } else {
    return false;
  }
};

// EventEmitter is defined in src/node_events.cc
// EventEmitter.prototype.emit() is also defined there.
EventEmitter.prototype.addListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('addListener only takes instances of Function');
  }

  if (!this._events) this._events = {};

  // To avoid recursion in the case that type == "newListeners"! Before
  // adding it to the listeners, first emit "newListeners".
  this.emit('newListener', type, listener);

  if (!this._events[type]) {
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  } else if (isArray(this._events[type])) {

    // Check for listener leak
    if (!this._events[type].warned) {
      var m;
      if (this._events.maxListeners !== undefined) {
        m = this._events.maxListeners;
      } else {
        m = defaultMaxListeners;
      }

      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error('(node) warning: possible EventEmitter memory ' +
                      'leak detected. %d listeners added. ' +
                      'Use emitter.setMaxListeners() to increase limit.',
                      this._events[type].length);
        console.trace();
      }
    }

    // If we've already got an array, just append.
    this._events[type].push(listener);
  } else {
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  var self = this;
  self.on(type, function g() {
    self.removeListener(type, g);
    listener.apply(this, arguments);
  });

  return this;
};

EventEmitter.prototype.removeListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('removeListener only takes instances of Function');
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (!this._events || !this._events[type]) return this;

  var list = this._events[type];

  if (isArray(list)) {
    var i = indexOf(list, listener);
    if (i < 0) return this;
    list.splice(i, 1);
    if (list.length == 0)
      delete this._events[type];
  } else if (this._events[type] === listener) {
    delete this._events[type];
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  if (arguments.length === 0) {
    this._events = {};
    return this;
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (type && this._events && this._events[type]) this._events[type] = null;
  return this;
};

EventEmitter.prototype.listeners = function(type) {
  if (!this._events) this._events = {};
  if (!this._events[type]) this._events[type] = [];
  if (!isArray(this._events[type])) {
    this._events[type] = [this._events[type]];
  }
  return this._events[type];
};

})(require("__browserify_process"))
},{"__browserify_process":8}],4:[function(require,module,exports){
(function(){function SlowBuffer (size) {
    this.length = size;
};

var assert = require('assert');

exports.INSPECT_MAX_BYTES = 50;


function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; i++)
    if (str.charCodeAt(i) <= 0x7F)
      byteArray.push(str.charCodeAt(i));
    else {
      var h = encodeURIComponent(str.charAt(i)).substr(1).split('%');
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16));
    }

  return byteArray;
}

function asciiToBytes(str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++ )
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push( str.charCodeAt(i) & 0xFF );

  return byteArray;
}

function base64ToBytes(str) {
  return require("base64-js").toByteArray(str);
}

SlowBuffer.byteLength = function (str, encoding) {
  switch (encoding || "utf8") {
    case 'hex':
      return str.length / 2;

    case 'utf8':
    case 'utf-8':
      return utf8ToBytes(str).length;

    case 'ascii':
      return str.length;

    case 'base64':
      return base64ToBytes(str).length;

    default:
      throw new Error('Unknown encoding');
  }
};

function blitBuffer(src, dst, offset, length) {
  var pos, i = 0;
  while (i < length) {
    if ((i+offset >= dst.length) || (i >= src.length))
      break;

    dst[i + offset] = src[i];
    i++;
  }
  return i;
}

SlowBuffer.prototype.utf8Write = function (string, offset, length) {
  var bytes, pos;
  return SlowBuffer._charsWritten =  blitBuffer(utf8ToBytes(string), this, offset, length);
};

SlowBuffer.prototype.asciiWrite = function (string, offset, length) {
  var bytes, pos;
  return SlowBuffer._charsWritten =  blitBuffer(asciiToBytes(string), this, offset, length);
};

SlowBuffer.prototype.base64Write = function (string, offset, length) {
  var bytes, pos;
  return SlowBuffer._charsWritten = blitBuffer(base64ToBytes(string), this, offset, length);
};

SlowBuffer.prototype.base64Slice = function (start, end) {
  var bytes = Array.prototype.slice.apply(this, arguments)
  return require("base64-js").fromByteArray(bytes);
}

function decodeUtf8Char(str) {
  try {
    return decodeURIComponent(str);
  } catch (err) {
    return String.fromCharCode(0xFFFD); // UTF 8 invalid char
  }
}

SlowBuffer.prototype.utf8Slice = function () {
  var bytes = Array.prototype.slice.apply(this, arguments);
  var res = "";
  var tmp = "";
  var i = 0;
  while (i < bytes.length) {
    if (bytes[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(bytes[i]);
      tmp = "";
    } else
      tmp += "%" + bytes[i].toString(16);

    i++;
  }

  return res + decodeUtf8Char(tmp);
}

SlowBuffer.prototype.asciiSlice = function () {
  var bytes = Array.prototype.slice.apply(this, arguments);
  var ret = "";
  for (var i = 0; i < bytes.length; i++)
    ret += String.fromCharCode(bytes[i]);
  return ret;
}

SlowBuffer.prototype.inspect = function() {
  var out = [],
      len = this.length;
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i]);
    if (i == exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...';
      break;
    }
  }
  return '<SlowBuffer ' + out.join(' ') + '>';
};


SlowBuffer.prototype.hexSlice = function(start, end) {
  var len = this.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; i++) {
    out += toHex(this[i]);
  }
  return out;
};


SlowBuffer.prototype.toString = function(encoding, start, end) {
  encoding = String(encoding || 'utf8').toLowerCase();
  start = +start || 0;
  if (typeof end == 'undefined') end = this.length;

  // Fastpath empty strings
  if (+end == start) {
    return '';
  }

  switch (encoding) {
    case 'hex':
      return this.hexSlice(start, end);

    case 'utf8':
    case 'utf-8':
      return this.utf8Slice(start, end);

    case 'ascii':
      return this.asciiSlice(start, end);

    case 'binary':
      return this.binarySlice(start, end);

    case 'base64':
      return this.base64Slice(start, end);

    case 'ucs2':
    case 'ucs-2':
      return this.ucs2Slice(start, end);

    default:
      throw new Error('Unknown encoding');
  }
};


SlowBuffer.prototype.hexWrite = function(string, offset, length) {
  offset = +offset || 0;
  var remaining = this.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = +length;
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2) {
    throw new Error('Invalid hex string');
  }
  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(byte)) throw new Error('Invalid hex string');
    this[offset + i] = byte;
  }
  SlowBuffer._charsWritten = i * 2;
  return i;
};


SlowBuffer.prototype.write = function(string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length;
      length = undefined;
    }
  } else {  // legacy
    var swap = encoding;
    encoding = offset;
    offset = length;
    length = swap;
  }

  offset = +offset || 0;
  var remaining = this.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = +length;
    if (length > remaining) {
      length = remaining;
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase();

  switch (encoding) {
    case 'hex':
      return this.hexWrite(string, offset, length);

    case 'utf8':
    case 'utf-8':
      return this.utf8Write(string, offset, length);

    case 'ascii':
      return this.asciiWrite(string, offset, length);

    case 'binary':
      return this.binaryWrite(string, offset, length);

    case 'base64':
      return this.base64Write(string, offset, length);

    case 'ucs2':
    case 'ucs-2':
      return this.ucs2Write(string, offset, length);

    default:
      throw new Error('Unknown encoding');
  }
};


// slice(start, end)
SlowBuffer.prototype.slice = function(start, end) {
  if (end === undefined) end = this.length;

  if (end > this.length) {
    throw new Error('oob');
  }
  if (start > end) {
    throw new Error('oob');
  }

  return new Buffer(this, end - start, +start);
};

SlowBuffer.prototype.copy = function(target, targetstart, sourcestart, sourceend) {
  var temp = [];
  for (var i=sourcestart; i<sourceend; i++) {
    assert.ok(typeof this[i] !== 'undefined', "copying undefined buffer bytes!");
    temp.push(this[i]);
  }

  for (var i=targetstart; i<targetstart+temp.length; i++) {
    target[i] = temp[i-targetstart];
  }
};

function coerce(length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length);
  return length < 0 ? 0 : length;
}


// Buffer

function Buffer(subject, encoding, offset) {
  if (!(this instanceof Buffer)) {
    return new Buffer(subject, encoding, offset);
  }

  var type;

  // Are we slicing?
  if (typeof offset === 'number') {
    this.length = coerce(encoding);
    this.parent = subject;
    this.offset = offset;
  } else {
    // Find the length
    switch (type = typeof subject) {
      case 'number':
        this.length = coerce(subject);
        break;

      case 'string':
        this.length = Buffer.byteLength(subject, encoding);
        break;

      case 'object': // Assume object is an array
        this.length = coerce(subject.length);
        break;

      default:
        throw new Error('First argument needs to be a number, ' +
                        'array or string.');
    }

    if (this.length > Buffer.poolSize) {
      // Big buffer, just alloc one.
      this.parent = new SlowBuffer(this.length);
      this.offset = 0;

    } else {
      // Small buffer.
      if (!pool || pool.length - pool.used < this.length) allocPool();
      this.parent = pool;
      this.offset = pool.used;
      pool.used += this.length;
    }

    // Treat array-ish objects as a byte array.
    if (isArrayIsh(subject)) {
      for (var i = 0; i < this.length; i++) {
        this.parent[i + this.offset] = subject[i];
      }
    } else if (type == 'string') {
      // We are a string
      this.length = this.write(subject, 0, encoding);
    }
  }

}

function isArrayIsh(subject) {
  return Array.isArray(subject) || Buffer.isBuffer(subject) ||
         subject && typeof subject === 'object' &&
         typeof subject.length === 'number';
}

exports.SlowBuffer = SlowBuffer;
exports.Buffer = Buffer;

Buffer.poolSize = 8 * 1024;
var pool;

function allocPool() {
  pool = new SlowBuffer(Buffer.poolSize);
  pool.used = 0;
}


// Static methods
Buffer.isBuffer = function isBuffer(b) {
  return b instanceof Buffer || b instanceof SlowBuffer;
};

Buffer.concat = function (list, totalLength) {
  if (!Array.isArray(list)) {
    throw new Error("Usage: Buffer.concat(list, [totalLength])\n \
      list should be an Array.");
  }

  if (list.length === 0) {
    return new Buffer(0);
  } else if (list.length === 1) {
    return list[0];
  }

  if (typeof totalLength !== 'number') {
    totalLength = 0;
    for (var i = 0; i < list.length; i++) {
      var buf = list[i];
      totalLength += buf.length;
    }
  }

  var buffer = new Buffer(totalLength);
  var pos = 0;
  for (var i = 0; i < list.length; i++) {
    var buf = list[i];
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
};

// Inspect
Buffer.prototype.inspect = function inspect() {
  var out = [],
      len = this.length;

  for (var i = 0; i < len; i++) {
    out[i] = toHex(this.parent[i + this.offset]);
    if (i == exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...';
      break;
    }
  }

  return '<Buffer ' + out.join(' ') + '>';
};


Buffer.prototype.get = function get(i) {
  if (i < 0 || i >= this.length) throw new Error('oob');
  return this.parent[this.offset + i];
};


Buffer.prototype.set = function set(i, v) {
  if (i < 0 || i >= this.length) throw new Error('oob');
  return this.parent[this.offset + i] = v;
};


// write(string, offset = 0, length = buffer.length-offset, encoding = 'utf8')
Buffer.prototype.write = function(string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length;
      length = undefined;
    }
  } else {  // legacy
    var swap = encoding;
    encoding = offset;
    offset = length;
    length = swap;
  }

  offset = +offset || 0;
  var remaining = this.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = +length;
    if (length > remaining) {
      length = remaining;
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase();

  var ret;
  switch (encoding) {
    case 'hex':
      ret = this.parent.hexWrite(string, this.offset + offset, length);
      break;

    case 'utf8':
    case 'utf-8':
      ret = this.parent.utf8Write(string, this.offset + offset, length);
      break;

    case 'ascii':
      ret = this.parent.asciiWrite(string, this.offset + offset, length);
      break;

    case 'binary':
      ret = this.parent.binaryWrite(string, this.offset + offset, length);
      break;

    case 'base64':
      // Warning: maxLength not taken into account in base64Write
      ret = this.parent.base64Write(string, this.offset + offset, length);
      break;

    case 'ucs2':
    case 'ucs-2':
      ret = this.parent.ucs2Write(string, this.offset + offset, length);
      break;

    default:
      throw new Error('Unknown encoding');
  }

  Buffer._charsWritten = SlowBuffer._charsWritten;

  return ret;
};


// toString(encoding, start=0, end=buffer.length)
Buffer.prototype.toString = function(encoding, start, end) {
  encoding = String(encoding || 'utf8').toLowerCase();

  if (typeof start == 'undefined' || start < 0) {
    start = 0;
  } else if (start > this.length) {
    start = this.length;
  }

  if (typeof end == 'undefined' || end > this.length) {
    end = this.length;
  } else if (end < 0) {
    end = 0;
  }

  start = start + this.offset;
  end = end + this.offset;

  switch (encoding) {
    case 'hex':
      return this.parent.hexSlice(start, end);

    case 'utf8':
    case 'utf-8':
      return this.parent.utf8Slice(start, end);

    case 'ascii':
      return this.parent.asciiSlice(start, end);

    case 'binary':
      return this.parent.binarySlice(start, end);

    case 'base64':
      return this.parent.base64Slice(start, end);

    case 'ucs2':
    case 'ucs-2':
      return this.parent.ucs2Slice(start, end);

    default:
      throw new Error('Unknown encoding');
  }
};


// byteLength
Buffer.byteLength = SlowBuffer.byteLength;


// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill(value, start, end) {
  value || (value = 0);
  start || (start = 0);
  end || (end = this.length);

  if (typeof value === 'string') {
    value = value.charCodeAt(0);
  }
  if (!(typeof value === 'number') || isNaN(value)) {
    throw new Error('value is not a number');
  }

  if (end < start) throw new Error('end < start');

  // Fill 0 bytes; we're done
  if (end === start) return 0;
  if (this.length == 0) return 0;

  if (start < 0 || start >= this.length) {
    throw new Error('start out of bounds');
  }

  if (end < 0 || end > this.length) {
    throw new Error('end out of bounds');
  }

  return this.parent.fill(value,
                          start + this.offset,
                          end + this.offset);
};


// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function(target, target_start, start, end) {
  var source = this;
  start || (start = 0);
  end || (end = this.length);
  target_start || (target_start = 0);

  if (end < start) throw new Error('sourceEnd < sourceStart');

  // Copy 0 bytes; we're done
  if (end === start) return 0;
  if (target.length == 0 || source.length == 0) return 0;

  if (target_start < 0 || target_start >= target.length) {
    throw new Error('targetStart out of bounds');
  }

  if (start < 0 || start >= source.length) {
    throw new Error('sourceStart out of bounds');
  }

  if (end < 0 || end > source.length) {
    throw new Error('sourceEnd out of bounds');
  }

  // Are we oob?
  if (end > this.length) {
    end = this.length;
  }

  if (target.length - target_start < end - start) {
    end = target.length - target_start + start;
  }

  return this.parent.copy(target.parent,
                          target_start + target.offset,
                          start + this.offset,
                          end + this.offset);
};


// slice(start, end)
Buffer.prototype.slice = function(start, end) {
  if (end === undefined) end = this.length;
  if (end > this.length) throw new Error('oob');
  if (start > end) throw new Error('oob');

  return new Buffer(this.parent, end - start, +start + this.offset);
};


// Legacy methods for backwards compatibility.

Buffer.prototype.utf8Slice = function(start, end) {
  return this.toString('utf8', start, end);
};

Buffer.prototype.binarySlice = function(start, end) {
  return this.toString('binary', start, end);
};

Buffer.prototype.asciiSlice = function(start, end) {
  return this.toString('ascii', start, end);
};

Buffer.prototype.utf8Write = function(string, offset) {
  return this.write(string, offset, 'utf8');
};

Buffer.prototype.binaryWrite = function(string, offset) {
  return this.write(string, offset, 'binary');
};

Buffer.prototype.asciiWrite = function(string, offset) {
  return this.write(string, offset, 'ascii');
};

Buffer.prototype.readUInt8 = function(offset, noAssert) {
  var buffer = this;

  if (!noAssert) {
    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'Trying to read beyond buffer length');
  }

  return buffer.parent[buffer.offset + offset];
};

function readUInt16(buffer, offset, isBigEndian, noAssert) {
  var val = 0;


  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'Trying to read beyond buffer length');
  }

  if (isBigEndian) {
    val = buffer.parent[buffer.offset + offset] << 8;
    val |= buffer.parent[buffer.offset + offset + 1];
  } else {
    val = buffer.parent[buffer.offset + offset];
    val |= buffer.parent[buffer.offset + offset + 1] << 8;
  }

  return val;
}

Buffer.prototype.readUInt16LE = function(offset, noAssert) {
  return readUInt16(this, offset, false, noAssert);
};

Buffer.prototype.readUInt16BE = function(offset, noAssert) {
  return readUInt16(this, offset, true, noAssert);
};

function readUInt32(buffer, offset, isBigEndian, noAssert) {
  var val = 0;

  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to read beyond buffer length');
  }

  if (isBigEndian) {
    val = buffer.parent[buffer.offset + offset + 1] << 16;
    val |= buffer.parent[buffer.offset + offset + 2] << 8;
    val |= buffer.parent[buffer.offset + offset + 3];
    val = val + (buffer.parent[buffer.offset + offset] << 24 >>> 0);
  } else {
    val = buffer.parent[buffer.offset + offset + 2] << 16;
    val |= buffer.parent[buffer.offset + offset + 1] << 8;
    val |= buffer.parent[buffer.offset + offset];
    val = val + (buffer.parent[buffer.offset + offset + 3] << 24 >>> 0);
  }

  return val;
}

Buffer.prototype.readUInt32LE = function(offset, noAssert) {
  return readUInt32(this, offset, false, noAssert);
};

Buffer.prototype.readUInt32BE = function(offset, noAssert) {
  return readUInt32(this, offset, true, noAssert);
};


/*
 * Signed integer types, yay team! A reminder on how two's complement actually
 * works. The first bit is the signed bit, i.e. tells us whether or not the
 * number should be positive or negative. If the two's complement value is
 * positive, then we're done, as it's equivalent to the unsigned representation.
 *
 * Now if the number is positive, you're pretty much done, you can just leverage
 * the unsigned translations and return those. Unfortunately, negative numbers
 * aren't quite that straightforward.
 *
 * At first glance, one might be inclined to use the traditional formula to
 * translate binary numbers between the positive and negative values in two's
 * complement. (Though it doesn't quite work for the most negative value)
 * Mainly:
 *  - invert all the bits
 *  - add one to the result
 *
 * Of course, this doesn't quite work in Javascript. Take for example the value
 * of -128. This could be represented in 16 bits (big-endian) as 0xff80. But of
 * course, Javascript will do the following:
 *
 * > ~0xff80
 * -65409
 *
 * Whoh there, Javascript, that's not quite right. But wait, according to
 * Javascript that's perfectly correct. When Javascript ends up seeing the
 * constant 0xff80, it has no notion that it is actually a signed number. It
 * assumes that we've input the unsigned value 0xff80. Thus, when it does the
 * binary negation, it casts it into a signed value, (positive 0xff80). Then
 * when you perform binary negation on that, it turns it into a negative number.
 *
 * Instead, we're going to have to use the following general formula, that works
 * in a rather Javascript friendly way. I'm glad we don't support this kind of
 * weird numbering scheme in the kernel.
 *
 * (BIT-MAX - (unsigned)val + 1) * -1
 *
 * The astute observer, may think that this doesn't make sense for 8-bit numbers
 * (really it isn't necessary for them). However, when you get 16-bit numbers,
 * you do. Let's go back to our prior example and see how this will look:
 *
 * (0xffff - 0xff80 + 1) * -1
 * (0x007f + 1) * -1
 * (0x0080) * -1
 */
Buffer.prototype.readInt8 = function(offset, noAssert) {
  var buffer = this;
  var neg;

  if (!noAssert) {
    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'Trying to read beyond buffer length');
  }

  neg = buffer.parent[buffer.offset + offset] & 0x80;
  if (!neg) {
    return (buffer.parent[buffer.offset + offset]);
  }

  return ((0xff - buffer.parent[buffer.offset + offset] + 1) * -1);
};

function readInt16(buffer, offset, isBigEndian, noAssert) {
  var neg, val;

  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'Trying to read beyond buffer length');
  }

  val = readUInt16(buffer, offset, isBigEndian, noAssert);
  neg = val & 0x8000;
  if (!neg) {
    return val;
  }

  return (0xffff - val + 1) * -1;
}

Buffer.prototype.readInt16LE = function(offset, noAssert) {
  return readInt16(this, offset, false, noAssert);
};

Buffer.prototype.readInt16BE = function(offset, noAssert) {
  return readInt16(this, offset, true, noAssert);
};

function readInt32(buffer, offset, isBigEndian, noAssert) {
  var neg, val;

  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to read beyond buffer length');
  }

  val = readUInt32(buffer, offset, isBigEndian, noAssert);
  neg = val & 0x80000000;
  if (!neg) {
    return (val);
  }

  return (0xffffffff - val + 1) * -1;
}

Buffer.prototype.readInt32LE = function(offset, noAssert) {
  return readInt32(this, offset, false, noAssert);
};

Buffer.prototype.readInt32BE = function(offset, noAssert) {
  return readInt32(this, offset, true, noAssert);
};

function readFloat(buffer, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset + 3 < buffer.length,
        'Trying to read beyond buffer length');
  }

  return require('./buffer_ieee754').readIEEE754(buffer, offset, isBigEndian,
      23, 4);
}

Buffer.prototype.readFloatLE = function(offset, noAssert) {
  return readFloat(this, offset, false, noAssert);
};

Buffer.prototype.readFloatBE = function(offset, noAssert) {
  return readFloat(this, offset, true, noAssert);
};

function readDouble(buffer, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset + 7 < buffer.length,
        'Trying to read beyond buffer length');
  }

  return require('./buffer_ieee754').readIEEE754(buffer, offset, isBigEndian,
      52, 8);
}

Buffer.prototype.readDoubleLE = function(offset, noAssert) {
  return readDouble(this, offset, false, noAssert);
};

Buffer.prototype.readDoubleBE = function(offset, noAssert) {
  return readDouble(this, offset, true, noAssert);
};


/*
 * We have to make sure that the value is a valid integer. This means that it is
 * non-negative. It has no fractional component and that it does not exceed the
 * maximum allowed value.
 *
 *      value           The number to check for validity
 *
 *      max             The maximum value
 */
function verifuint(value, max) {
  assert.ok(typeof (value) == 'number',
      'cannot write a non-number as a number');

  assert.ok(value >= 0,
      'specified a negative value for writing an unsigned value');

  assert.ok(value <= max, 'value is larger than maximum value for type');

  assert.ok(Math.floor(value) === value, 'value has a fractional component');
}

Buffer.prototype.writeUInt8 = function(value, offset, noAssert) {
  var buffer = this;

  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'trying to write beyond buffer length');

    verifuint(value, 0xff);
  }

  buffer.parent[buffer.offset + offset] = value;
};

function writeUInt16(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'trying to write beyond buffer length');

    verifuint(value, 0xffff);
  }

  if (isBigEndian) {
    buffer.parent[buffer.offset + offset] = (value & 0xff00) >>> 8;
    buffer.parent[buffer.offset + offset + 1] = value & 0x00ff;
  } else {
    buffer.parent[buffer.offset + offset + 1] = (value & 0xff00) >>> 8;
    buffer.parent[buffer.offset + offset] = value & 0x00ff;
  }
}

Buffer.prototype.writeUInt16LE = function(value, offset, noAssert) {
  writeUInt16(this, value, offset, false, noAssert);
};

Buffer.prototype.writeUInt16BE = function(value, offset, noAssert) {
  writeUInt16(this, value, offset, true, noAssert);
};

function writeUInt32(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'trying to write beyond buffer length');

    verifuint(value, 0xffffffff);
  }

  if (isBigEndian) {
    buffer.parent[buffer.offset + offset] = (value >>> 24) & 0xff;
    buffer.parent[buffer.offset + offset + 1] = (value >>> 16) & 0xff;
    buffer.parent[buffer.offset + offset + 2] = (value >>> 8) & 0xff;
    buffer.parent[buffer.offset + offset + 3] = value & 0xff;
  } else {
    buffer.parent[buffer.offset + offset + 3] = (value >>> 24) & 0xff;
    buffer.parent[buffer.offset + offset + 2] = (value >>> 16) & 0xff;
    buffer.parent[buffer.offset + offset + 1] = (value >>> 8) & 0xff;
    buffer.parent[buffer.offset + offset] = value & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function(value, offset, noAssert) {
  writeUInt32(this, value, offset, false, noAssert);
};

Buffer.prototype.writeUInt32BE = function(value, offset, noAssert) {
  writeUInt32(this, value, offset, true, noAssert);
};


/*
 * We now move onto our friends in the signed number category. Unlike unsigned
 * numbers, we're going to have to worry a bit more about how we put values into
 * arrays. Since we are only worrying about signed 32-bit values, we're in
 * slightly better shape. Unfortunately, we really can't do our favorite binary
 * & in this system. It really seems to do the wrong thing. For example:
 *
 * > -32 & 0xff
 * 224
 *
 * What's happening above is really: 0xe0 & 0xff = 0xe0. However, the results of
 * this aren't treated as a signed number. Ultimately a bad thing.
 *
 * What we're going to want to do is basically create the unsigned equivalent of
 * our representation and pass that off to the wuint* functions. To do that
 * we're going to do the following:
 *
 *  - if the value is positive
 *      we can pass it directly off to the equivalent wuint
 *  - if the value is negative
 *      we do the following computation:
 *         mb + val + 1, where
 *         mb   is the maximum unsigned value in that byte size
 *         val  is the Javascript negative integer
 *
 *
 * As a concrete value, take -128. In signed 16 bits this would be 0xff80. If
 * you do out the computations:
 *
 * 0xffff - 128 + 1
 * 0xffff - 127
 * 0xff80
 *
 * You can then encode this value as the signed version. This is really rather
 * hacky, but it should work and get the job done which is our goal here.
 */

/*
 * A series of checks to make sure we actually have a signed 32-bit number
 */
function verifsint(value, max, min) {
  assert.ok(typeof (value) == 'number',
      'cannot write a non-number as a number');

  assert.ok(value <= max, 'value larger than maximum allowed value');

  assert.ok(value >= min, 'value smaller than minimum allowed value');

  assert.ok(Math.floor(value) === value, 'value has a fractional component');
}

function verifIEEE754(value, max, min) {
  assert.ok(typeof (value) == 'number',
      'cannot write a non-number as a number');

  assert.ok(value <= max, 'value larger than maximum allowed value');

  assert.ok(value >= min, 'value smaller than minimum allowed value');
}

Buffer.prototype.writeInt8 = function(value, offset, noAssert) {
  var buffer = this;

  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'Trying to write beyond buffer length');

    verifsint(value, 0x7f, -0x80);
  }

  if (value >= 0) {
    buffer.writeUInt8(value, offset, noAssert);
  } else {
    buffer.writeUInt8(0xff + value + 1, offset, noAssert);
  }
};

function writeInt16(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'Trying to write beyond buffer length');

    verifsint(value, 0x7fff, -0x8000);
  }

  if (value >= 0) {
    writeUInt16(buffer, value, offset, isBigEndian, noAssert);
  } else {
    writeUInt16(buffer, 0xffff + value + 1, offset, isBigEndian, noAssert);
  }
}

Buffer.prototype.writeInt16LE = function(value, offset, noAssert) {
  writeInt16(this, value, offset, false, noAssert);
};

Buffer.prototype.writeInt16BE = function(value, offset, noAssert) {
  writeInt16(this, value, offset, true, noAssert);
};

function writeInt32(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to write beyond buffer length');

    verifsint(value, 0x7fffffff, -0x80000000);
  }

  if (value >= 0) {
    writeUInt32(buffer, value, offset, isBigEndian, noAssert);
  } else {
    writeUInt32(buffer, 0xffffffff + value + 1, offset, isBigEndian, noAssert);
  }
}

Buffer.prototype.writeInt32LE = function(value, offset, noAssert) {
  writeInt32(this, value, offset, false, noAssert);
};

Buffer.prototype.writeInt32BE = function(value, offset, noAssert) {
  writeInt32(this, value, offset, true, noAssert);
};

function writeFloat(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to write beyond buffer length');

    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }

  require('./buffer_ieee754').writeIEEE754(buffer, value, offset, isBigEndian,
      23, 4);
}

Buffer.prototype.writeFloatLE = function(value, offset, noAssert) {
  writeFloat(this, value, offset, false, noAssert);
};

Buffer.prototype.writeFloatBE = function(value, offset, noAssert) {
  writeFloat(this, value, offset, true, noAssert);
};

function writeDouble(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 7 < buffer.length,
        'Trying to write beyond buffer length');

    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }

  require('./buffer_ieee754').writeIEEE754(buffer, value, offset, isBigEndian,
      52, 8);
}

Buffer.prototype.writeDoubleLE = function(value, offset, noAssert) {
  writeDouble(this, value, offset, false, noAssert);
};

Buffer.prototype.writeDoubleBE = function(value, offset, noAssert) {
  writeDouble(this, value, offset, true, noAssert);
};

SlowBuffer.prototype.readUInt8 = Buffer.prototype.readUInt8;
SlowBuffer.prototype.readUInt16LE = Buffer.prototype.readUInt16LE;
SlowBuffer.prototype.readUInt16BE = Buffer.prototype.readUInt16BE;
SlowBuffer.prototype.readUInt32LE = Buffer.prototype.readUInt32LE;
SlowBuffer.prototype.readUInt32BE = Buffer.prototype.readUInt32BE;
SlowBuffer.prototype.readInt8 = Buffer.prototype.readInt8;
SlowBuffer.prototype.readInt16LE = Buffer.prototype.readInt16LE;
SlowBuffer.prototype.readInt16BE = Buffer.prototype.readInt16BE;
SlowBuffer.prototype.readInt32LE = Buffer.prototype.readInt32LE;
SlowBuffer.prototype.readInt32BE = Buffer.prototype.readInt32BE;
SlowBuffer.prototype.readFloatLE = Buffer.prototype.readFloatLE;
SlowBuffer.prototype.readFloatBE = Buffer.prototype.readFloatBE;
SlowBuffer.prototype.readDoubleLE = Buffer.prototype.readDoubleLE;
SlowBuffer.prototype.readDoubleBE = Buffer.prototype.readDoubleBE;
SlowBuffer.prototype.writeUInt8 = Buffer.prototype.writeUInt8;
SlowBuffer.prototype.writeUInt16LE = Buffer.prototype.writeUInt16LE;
SlowBuffer.prototype.writeUInt16BE = Buffer.prototype.writeUInt16BE;
SlowBuffer.prototype.writeUInt32LE = Buffer.prototype.writeUInt32LE;
SlowBuffer.prototype.writeUInt32BE = Buffer.prototype.writeUInt32BE;
SlowBuffer.prototype.writeInt8 = Buffer.prototype.writeInt8;
SlowBuffer.prototype.writeInt16LE = Buffer.prototype.writeInt16LE;
SlowBuffer.prototype.writeInt16BE = Buffer.prototype.writeInt16BE;
SlowBuffer.prototype.writeInt32LE = Buffer.prototype.writeInt32LE;
SlowBuffer.prototype.writeInt32BE = Buffer.prototype.writeInt32BE;
SlowBuffer.prototype.writeFloatLE = Buffer.prototype.writeFloatLE;
SlowBuffer.prototype.writeFloatBE = Buffer.prototype.writeFloatBE;
SlowBuffer.prototype.writeDoubleLE = Buffer.prototype.writeDoubleLE;
SlowBuffer.prototype.writeDoubleBE = Buffer.prototype.writeDoubleBE;

})()
},{"assert":2,"./buffer_ieee754":7,"base64-js":9}],9:[function(require,module,exports){
(function (exports) {
	'use strict';

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	function b64ToByteArray(b64) {
		var i, j, l, tmp, placeHolders, arr;
	
		if (b64.length % 4 > 0) {
			throw 'Invalid string. Length must be a multiple of 4';
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		placeHolders = b64.indexOf('=');
		placeHolders = placeHolders > 0 ? b64.length - placeHolders : 0;

		// base64 is 4/3 + up to two characters of the original data
		arr = [];//new Uint8Array(b64.length * 3 / 4 - placeHolders);

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length;

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (lookup.indexOf(b64[i]) << 18) | (lookup.indexOf(b64[i + 1]) << 12) | (lookup.indexOf(b64[i + 2]) << 6) | lookup.indexOf(b64[i + 3]);
			arr.push((tmp & 0xFF0000) >> 16);
			arr.push((tmp & 0xFF00) >> 8);
			arr.push(tmp & 0xFF);
		}

		if (placeHolders === 2) {
			tmp = (lookup.indexOf(b64[i]) << 2) | (lookup.indexOf(b64[i + 1]) >> 4);
			arr.push(tmp & 0xFF);
		} else if (placeHolders === 1) {
			tmp = (lookup.indexOf(b64[i]) << 10) | (lookup.indexOf(b64[i + 1]) << 4) | (lookup.indexOf(b64[i + 2]) >> 2);
			arr.push((tmp >> 8) & 0xFF);
			arr.push(tmp & 0xFF);
		}

		return arr;
	}

	function uint8ToBase64(uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length;

		function tripletToBase64 (num) {
			return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
		};

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
			output += tripletToBase64(temp);
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1];
				output += lookup[temp >> 2];
				output += lookup[(temp << 4) & 0x3F];
				output += '==';
				break;
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1]);
				output += lookup[temp >> 10];
				output += lookup[(temp >> 4) & 0x3F];
				output += lookup[(temp << 2) & 0x3F];
				output += '=';
				break;
		}

		return output;
	}

	module.exports.toByteArray = b64ToByteArray;
	module.exports.fromByteArray = uint8ToBase64;
}());

},{}]},{},[])
;;module.exports=require("buffer-browserify")

},{}],5:[function(require,module,exports){
(function(Buffer){/// <reference path="node/node.d.ts"/>
var fs = require('fs');
exports.ty = require("./assert-type");
exports.T = exports.ty.Assert;

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

    BinaryReader.prototype.utf8Decode = function (bytes) {
        //return decodeURIComponent(bytes);
        var len = bytes.length;
        var result = "";
        var code;
        var i;
        for (i = 0; i < len; i++) {
            if (bytes[i] <= 0x7f) {
                result += String.fromCharCode(bytes[i]);
            } else if (bytes[i] >= 0xc0) {
                if (bytes[i] < 0xe0) {
                    code = ((bytes[i++] & 0x1f) << 6) | (bytes[i] & 0x3f);
                } else if (bytes[i] < 0xf0) {
                    code = ((bytes[i++] & 0x0f) << 12) | ((bytes[i++] & 0x3f) << 6) | (bytes[i] & 0x3f);
                } else {
                    // turned into two character in JS as surrogate pair
                    code = (((bytes[i++] & 0x07) << 18) | ((bytes[i++] & 0x3f) << 12) | ((bytes[i++] & 0x3f) << 6) | (bytes[i] & 0x3f)) - 0x10000;

                    // High surrogate
                    result += String.fromCharCode((code >>> 10 & 0x3ff) + 0xd800);
                    code = (code & 0x3ff) + 0xdc00;
                }
                result += String.fromCharCode(code);
            }
        }
        return decodeURIComponent(result);
    };

    BinaryReader.prototype.typeOf = function (value) {
        var s = typeof value;
        if (s === 'object') {
            if (value) {
                if (value instanceof Array) {
                    s = 'array';
                }
            } else {
                s = 'null';
            }
        }
        return s;
    };

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
        var len = this.readLong();
        return this.readFixed(len);
    };

    BinaryReader.prototype.readString = function () {
        return this.utf8Decode(this.readBytes());
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
        } else if (type == "boolean") {
            return this.readBoolean();
        } else if (type == "int") {
            return this.readInt();
        } else if (type == "long") {
            return this.readLong();
        } else if (type == "float") {
            return this.readFloat();
        } else if (type == "double") {
            return this.readDouble();
        } else if (type == "bytes") {
            return this.readBytes();
        } else if (type == "string") {
            return this.readString();
        } else if (type == "record") {
            result = {};
            for (i = 0; i < schema.fields.length; i++) {
                result[schema.fields[i].name] = this.readDatum(schema.fields[i].type);
            }
            return result;
        } else if (type == "enum") {
            return schema.symbols[this.readEnum()];
        } else if (type == "array") {
            return this.readArray(schema);
        } else if (type == "map") {
            result = {};
            i = this.readMapStart();
            while (i !== 0) {
                while (i-- > 0) {
                    result[this.readDatum("string")] = this.readDatum(schema.values);
                }
                i = this.mapNext();
            }
            return result;
        } else if (type == "union") {
            var idx = this.readLong();
            result = {};
            result[schema[idx]] = this.readDatum(schema[idx]);
            return result;
        } else {
            if (this.schemas[type] === undefined) {
                throw "Unsupported schema type " + type;
            }
            return this.readDatum(this.schemas[type]);
        }
    };
    return BinaryReader;
})();
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
        var buffer = new Buffer(this.dataView.byteLength);
        for (var i = 0; i < buffer.length; ++i) {
            buffer[i] = this.dataView[i];
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

    BinaryWriter.prototype.realloc = function () {
        var old = this.buffer;
        this.alloc(old.length * 1.6);
        this.buffer.set(old);
    };

    BinaryWriter.prototype.require = function (bytes) {
        if (this.buffer.length < this._index + bytes) {
            this.realloc();
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

    BinaryWriter.prototype.utf8Encode = function (value) {
        // http://ecmanaut.blogspot.ca/2006/07/encoding-decoding-utf8-in-javascript.html
        return encodeURIComponent(value);
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
        } else {
            if (value > 0) {
                n = 2 * value;
            } else {
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

    BinaryWriter.prototype.writeString = function (str) {
        this.require(str.length * 2);
        var utf8 = this.utf8Encode(str);
        this.writeLong(utf8.length);
        for (var i = 0; i < utf8.length; i++) {
            this.buffer[this._index++] = utf8.charCodeAt(i);
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
                } else {
                    s = 'null';
                }
            }
            return s;
        }

        type = typeOf(schema);
        if (type === "object") {
            type = schema.type;
        } else if (type === "string") {
            type = schema;
        } else if (type === "array") {
            type = "union";
        } else if (type === "undefined") {
            throw "W:Undefined schema type " + schema;
        } else {
            throw "W:Unrecognized schema type: " + type + schema;
        }

        switch (type) {
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
            case "string":
                this.writeString(datum);
                return;

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
                throw "Invalid enum value: " + datum + " expecting: " + schema.symbols;

            case "array":
                if (datum.length > 0) {
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
                for (i = 0; i < schema.length; i++) {
                    if (datum == null && schema[i] === 'null') {
                        this.writeLong(i);
                        return;
                    }
                    if (datum && datum[schema[i]] != undefined) {
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
})();
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
                } else {
                    s = 'null';
                }
            }
            return s;
        }

        type = typeOf(schema);
        if (type === "object") {
            type = schema.type;
        } else if (type === "string") {
            type = schema;
        } else if (type === "array") {
            type = "union";
        } else if (type === "undefined") {
            throw "W:Undefined schema type " + schema;
        } else {
            throw "W:Unrecognized schema type: " + type + schema;
        }

        switch (type) {
            case "null":
                return exports.T(exports.ty.null)(datum);
            case "boolean":
                exports.T(exports.ty.bool)(datum);
                return true;
            case "int":
            case "long":
                exports.T(exports.ty.int)(datum);
                break;
            case "float":
            case "double":
                exports.T(exports.ty.num.not.nan)(datum);
                break;
            case "bytes":
            case "string":
                exports.T(exports.ty.str)(datum);
                return;

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
})();
exports.SchemaCache = SchemaCache;
//# sourceMappingURL=etp-avro.js.map

})(require("__browserify_buffer").Buffer)
},{"fs":6,"./assert-type":8,"__browserify_buffer":7}],4:[function(require,module,exports){
///<reference path="etp-avro/etp-avro.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var avro = require("etp-avro");
var schemas = require("./EtpSchemas.js");

var SchemaCache = (function (_super) {
    __extends(SchemaCache, _super);
    function SchemaCache(types) {
        if (typeof types === "undefined") { types = schemas.types; }
        _super.call(this, types);
    }
    SchemaCache.prototype.find = function (protocol, messageType) {
        var schema;
        for (schema in this) {
            if (this[schema].protocol == protocol && this[schema].messageType == messageType) {
                return this[schema];
            }
        }

        throw "schema not found";
    };
    return SchemaCache;
})(avro.SchemaCache);
exports.SchemaCache = SchemaCache;
//# sourceMappingURL=Util.js.map

},{"./EtpSchemas.js":1,"etp-avro":5}],9:[function(require,module,exports){
var events = require('events');

exports.isArray = isArray;
exports.isDate = function(obj){return Object.prototype.toString.call(obj) === '[object Date]'};
exports.isRegExp = function(obj){return Object.prototype.toString.call(obj) === '[object RegExp]'};


exports.print = function () {};
exports.puts = function () {};
exports.debug = function() {};

exports.inspect = function(obj, showHidden, depth, colors) {
  var seen = [];

  var stylize = function(str, styleType) {
    // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
    var styles =
        { 'bold' : [1, 22],
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
          'yellow' : [33, 39] };

    var style =
        { 'special': 'cyan',
          'number': 'blue',
          'boolean': 'yellow',
          'undefined': 'grey',
          'null': 'bold',
          'string': 'green',
          'date': 'magenta',
          // "name": intentionally not styling
          'regexp': 'red' }[styleType];

    if (style) {
      return '\033[' + styles[style][0] + 'm' + str +
             '\033[' + styles[style][1] + 'm';
    } else {
      return str;
    }
  };
  if (! colors) {
    stylize = function(str, styleType) { return str; };
  }

  function format(value, recurseTimes) {
    // Provide a hook for user-specified inspect functions.
    // Check that value is an object with an inspect function on it
    if (value && typeof value.inspect === 'function' &&
        // Filter out the util module, it's inspect function is special
        value !== exports &&
        // Also filter out any prototype objects using the circular check.
        !(value.constructor && value.constructor.prototype === value)) {
      return value.inspect(recurseTimes);
    }

    // Primitive types cannot have properties
    switch (typeof value) {
      case 'undefined':
        return stylize('undefined', 'undefined');

      case 'string':
        var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                                 .replace(/'/g, "\\'")
                                                 .replace(/\\"/g, '"') + '\'';
        return stylize(simple, 'string');

      case 'number':
        return stylize('' + value, 'number');

      case 'boolean':
        return stylize('' + value, 'boolean');
    }
    // For some reason typeof null is "object", so special case here.
    if (value === null) {
      return stylize('null', 'null');
    }

    // Look up the keys of the object.
    var visible_keys = Object_keys(value);
    var keys = showHidden ? Object_getOwnPropertyNames(value) : visible_keys;

    // Functions without properties can be shortcutted.
    if (typeof value === 'function' && keys.length === 0) {
      if (isRegExp(value)) {
        return stylize('' + value, 'regexp');
      } else {
        var name = value.name ? ': ' + value.name : '';
        return stylize('[Function' + name + ']', 'special');
      }
    }

    // Dates without properties can be shortcutted
    if (isDate(value) && keys.length === 0) {
      return stylize(value.toUTCString(), 'date');
    }

    var base, type, braces;
    // Determine the object type
    if (isArray(value)) {
      type = 'Array';
      braces = ['[', ']'];
    } else {
      type = 'Object';
      braces = ['{', '}'];
    }

    // Make functions say that they are functions
    if (typeof value === 'function') {
      var n = value.name ? ': ' + value.name : '';
      base = (isRegExp(value)) ? ' ' + value : ' [Function' + n + ']';
    } else {
      base = '';
    }

    // Make dates with properties first say the date
    if (isDate(value)) {
      base = ' ' + value.toUTCString();
    }

    if (keys.length === 0) {
      return braces[0] + base + braces[1];
    }

    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return stylize('' + value, 'regexp');
      } else {
        return stylize('[Object]', 'special');
      }
    }

    seen.push(value);

    var output = keys.map(function(key) {
      var name, str;
      if (value.__lookupGetter__) {
        if (value.__lookupGetter__(key)) {
          if (value.__lookupSetter__(key)) {
            str = stylize('[Getter/Setter]', 'special');
          } else {
            str = stylize('[Getter]', 'special');
          }
        } else {
          if (value.__lookupSetter__(key)) {
            str = stylize('[Setter]', 'special');
          }
        }
      }
      if (visible_keys.indexOf(key) < 0) {
        name = '[' + key + ']';
      }
      if (!str) {
        if (seen.indexOf(value[key]) < 0) {
          if (recurseTimes === null) {
            str = format(value[key]);
          } else {
            str = format(value[key], recurseTimes - 1);
          }
          if (str.indexOf('\n') > -1) {
            if (isArray(value)) {
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
          str = stylize('[Circular]', 'special');
        }
      }
      if (typeof name === 'undefined') {
        if (type === 'Array' && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify('' + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.substr(1, name.length - 2);
          name = stylize(name, 'name');
        } else {
          name = name.replace(/'/g, "\\'")
                     .replace(/\\"/g, '"')
                     .replace(/(^"|"$)/g, "'");
          name = stylize(name, 'string');
        }
      }

      return name + ': ' + str;
    });

    seen.pop();

    var numLinesEst = 0;
    var length = output.reduce(function(prev, cur) {
      numLinesEst++;
      if (cur.indexOf('\n') >= 0) numLinesEst++;
      return prev + cur.length + 1;
    }, 0);

    if (length > 50) {
      output = braces[0] +
               (base === '' ? '' : base + '\n ') +
               ' ' +
               output.join(',\n  ') +
               ' ' +
               braces[1];

    } else {
      output = braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
    }

    return output;
  }
  return format(obj, (typeof depth === 'undefined' ? 2 : depth));
};


function isArray(ar) {
  return ar instanceof Array ||
         Array.isArray(ar) ||
         (ar && ar !== Object.prototype && isArray(ar.__proto__));
}


function isRegExp(re) {
  return re instanceof RegExp ||
    (typeof re === 'object' && Object.prototype.toString.call(re) === '[object RegExp]');
}


function isDate(d) {
  if (d instanceof Date) return true;
  if (typeof d !== 'object') return false;
  var properties = Date.prototype && Object_getOwnPropertyNames(Date.prototype);
  var proto = d.__proto__ && Object_getOwnPropertyNames(d.__proto__);
  return JSON.stringify(proto) === JSON.stringify(properties);
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

exports.log = function (msg) {};

exports.pump = null;

var Object_keys = Object.keys || function (obj) {
    var res = [];
    for (var key in obj) res.push(key);
    return res;
};

var Object_getOwnPropertyNames = Object.getOwnPropertyNames || function (obj) {
    var res = [];
    for (var key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) res.push(key);
    }
    return res;
};

var Object_create = Object.create || function (prototype, properties) {
    // from es5-shim
    var object;
    if (prototype === null) {
        object = { '__proto__' : null };
    }
    else {
        if (typeof prototype !== 'object') {
            throw new TypeError(
                'typeof prototype[' + (typeof prototype) + '] != \'object\''
            );
        }
        var Type = function () {};
        Type.prototype = prototype;
        object = new Type();
        object.__proto__ = prototype;
    }
    if (typeof properties !== 'undefined' && Object.defineProperties) {
        Object.defineProperties(object, properties);
    }
    return object;
};

exports.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object_create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (typeof f !== 'string') {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(exports.inspect(arguments[i]));
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
      case '%j': return JSON.stringify(args[i++]);
      default:
        return x;
    }
  });
  for(var x = args[i]; i < len; x = args[++i]){
    if (x === null || typeof x !== 'object') {
      str += ' ' + x;
    } else {
      str += ' ' + exports.inspect(x);
    }
  }
  return str;
};

},{"events":10}],11:[function(require,module,exports){
(function(){// UTILITY
var util = require('util');
var Buffer = require("buffer").Buffer;
var pSlice = Array.prototype.slice;

function objectKeys(object) {
  if (Object.keys) return Object.keys(object);
  var result = [];
  for (var name in object) {
    if (Object.prototype.hasOwnProperty.call(object, name)) {
      result.push(name);
    }
  }
  return result;
}

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
  this.message = options.message;
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
};
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {
  if (value === undefined) {
    return '' + value;
  }
  if (typeof value === 'number' && (isNaN(value) || !isFinite(value))) {
    return value.toString();
  }
  if (typeof value === 'function' || value instanceof RegExp) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (typeof s == 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

assert.AssertionError.prototype.toString = function() {
  if (this.message) {
    return [this.name + ':', this.message].join(' ');
  } else {
    return [
      this.name + ':',
      truncate(JSON.stringify(this.actual, replacer), 128),
      this.operator,
      truncate(JSON.stringify(this.expected, replacer), 128)
    ].join(' ');
  }
};

// assert.AssertionError instanceof Error

assert.AssertionError.__proto__ = Error.prototype;

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
// This statement is equivalent to assert.equal(true, guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!!!value) fail(value, true, message, '==', assert.ok);
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

  } else if (Buffer.isBuffer(actual) && Buffer.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (typeof actual != 'object' && typeof expected != 'object') {
    return actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b),
        key, i;
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
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

  if (expected instanceof RegExp) {
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

  if (typeof expected === 'string') {
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
    fail('Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail('Got unwanted exception' + message);
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
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function(err) { if (err) {throw err;}};

})()
},{"util":9,"buffer":12}],13:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],10:[function(require,module,exports){
(function(process){if (!process.EventEmitter) process.EventEmitter = function () {};

var EventEmitter = exports.EventEmitter = process.EventEmitter;
var isArray = typeof Array.isArray === 'function'
    ? Array.isArray
    : function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]'
    }
;
function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0; i < xs.length; i++) {
        if (x === xs[i]) return i;
    }
    return -1;
}

// By default EventEmitters will print a warning if more than
// 10 listeners are added to it. This is a useful default which
// helps finding memory leaks.
//
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
var defaultMaxListeners = 10;
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!this._events) this._events = {};
  this._events.maxListeners = n;
};


EventEmitter.prototype.emit = function(type) {
  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events || !this._events.error ||
        (isArray(this._events.error) && !this._events.error.length))
    {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }
  }

  if (!this._events) return false;
  var handler = this._events[type];
  if (!handler) return false;

  if (typeof handler == 'function') {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        var args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
    return true;

  } else if (isArray(handler)) {
    var args = Array.prototype.slice.call(arguments, 1);

    var listeners = handler.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
      listeners[i].apply(this, args);
    }
    return true;

  } else {
    return false;
  }
};

// EventEmitter is defined in src/node_events.cc
// EventEmitter.prototype.emit() is also defined there.
EventEmitter.prototype.addListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('addListener only takes instances of Function');
  }

  if (!this._events) this._events = {};

  // To avoid recursion in the case that type == "newListeners"! Before
  // adding it to the listeners, first emit "newListeners".
  this.emit('newListener', type, listener);

  if (!this._events[type]) {
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  } else if (isArray(this._events[type])) {

    // Check for listener leak
    if (!this._events[type].warned) {
      var m;
      if (this._events.maxListeners !== undefined) {
        m = this._events.maxListeners;
      } else {
        m = defaultMaxListeners;
      }

      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error('(node) warning: possible EventEmitter memory ' +
                      'leak detected. %d listeners added. ' +
                      'Use emitter.setMaxListeners() to increase limit.',
                      this._events[type].length);
        console.trace();
      }
    }

    // If we've already got an array, just append.
    this._events[type].push(listener);
  } else {
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  var self = this;
  self.on(type, function g() {
    self.removeListener(type, g);
    listener.apply(this, arguments);
  });

  return this;
};

EventEmitter.prototype.removeListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('removeListener only takes instances of Function');
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (!this._events || !this._events[type]) return this;

  var list = this._events[type];

  if (isArray(list)) {
    var i = indexOf(list, listener);
    if (i < 0) return this;
    list.splice(i, 1);
    if (list.length == 0)
      delete this._events[type];
  } else if (this._events[type] === listener) {
    delete this._events[type];
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  if (arguments.length === 0) {
    this._events = {};
    return this;
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (type && this._events && this._events[type]) this._events[type] = null;
  return this;
};

EventEmitter.prototype.listeners = function(type) {
  if (!this._events) this._events = {};
  if (!this._events[type]) this._events[type] = [];
  if (!isArray(this._events[type])) {
    this._events[type] = [this._events[type]];
  }
  return this._events[type];
};

})(require("__browserify_process"))
},{"__browserify_process":13}],14:[function(require,module,exports){
exports.readIEEE754 = function(buffer, offset, isBE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isBE ? 0 : (nBytes - 1),
      d = isBE ? 1 : -1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.writeIEEE754 = function(buffer, value, offset, isBE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isBE ? (nBytes - 1) : 0,
      d = isBE ? -1 : 1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],8:[function(require,module,exports){
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

},{"util":9,"assert":11,"underscore":15}],12:[function(require,module,exports){
(function(){function SlowBuffer (size) {
    this.length = size;
};

var assert = require('assert');

exports.INSPECT_MAX_BYTES = 50;


function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; i++)
    if (str.charCodeAt(i) <= 0x7F)
      byteArray.push(str.charCodeAt(i));
    else {
      var h = encodeURIComponent(str.charAt(i)).substr(1).split('%');
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16));
    }

  return byteArray;
}

function asciiToBytes(str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++ )
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push( str.charCodeAt(i) & 0xFF );

  return byteArray;
}

function base64ToBytes(str) {
  return require("base64-js").toByteArray(str);
}

SlowBuffer.byteLength = function (str, encoding) {
  switch (encoding || "utf8") {
    case 'hex':
      return str.length / 2;

    case 'utf8':
    case 'utf-8':
      return utf8ToBytes(str).length;

    case 'ascii':
    case 'binary':
      return str.length;

    case 'base64':
      return base64ToBytes(str).length;

    default:
      throw new Error('Unknown encoding');
  }
};

function blitBuffer(src, dst, offset, length) {
  var pos, i = 0;
  while (i < length) {
    if ((i+offset >= dst.length) || (i >= src.length))
      break;

    dst[i + offset] = src[i];
    i++;
  }
  return i;
}

SlowBuffer.prototype.utf8Write = function (string, offset, length) {
  var bytes, pos;
  return SlowBuffer._charsWritten =  blitBuffer(utf8ToBytes(string), this, offset, length);
};

SlowBuffer.prototype.asciiWrite = function (string, offset, length) {
  var bytes, pos;
  return SlowBuffer._charsWritten =  blitBuffer(asciiToBytes(string), this, offset, length);
};

SlowBuffer.prototype.binaryWrite = SlowBuffer.prototype.asciiWrite;

SlowBuffer.prototype.base64Write = function (string, offset, length) {
  var bytes, pos;
  return SlowBuffer._charsWritten = blitBuffer(base64ToBytes(string), this, offset, length);
};

SlowBuffer.prototype.base64Slice = function (start, end) {
  var bytes = Array.prototype.slice.apply(this, arguments)
  return require("base64-js").fromByteArray(bytes);
}

function decodeUtf8Char(str) {
  try {
    return decodeURIComponent(str);
  } catch (err) {
    return String.fromCharCode(0xFFFD); // UTF 8 invalid char
  }
}

SlowBuffer.prototype.utf8Slice = function () {
  var bytes = Array.prototype.slice.apply(this, arguments);
  var res = "";
  var tmp = "";
  var i = 0;
  while (i < bytes.length) {
    if (bytes[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(bytes[i]);
      tmp = "";
    } else
      tmp += "%" + bytes[i].toString(16);

    i++;
  }

  return res + decodeUtf8Char(tmp);
}

SlowBuffer.prototype.asciiSlice = function () {
  var bytes = Array.prototype.slice.apply(this, arguments);
  var ret = "";
  for (var i = 0; i < bytes.length; i++)
    ret += String.fromCharCode(bytes[i]);
  return ret;
}

SlowBuffer.prototype.binarySlice = SlowBuffer.prototype.asciiSlice;

SlowBuffer.prototype.inspect = function() {
  var out = [],
      len = this.length;
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i]);
    if (i == exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...';
      break;
    }
  }
  return '<SlowBuffer ' + out.join(' ') + '>';
};


SlowBuffer.prototype.hexSlice = function(start, end) {
  var len = this.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; i++) {
    out += toHex(this[i]);
  }
  return out;
};


SlowBuffer.prototype.toString = function(encoding, start, end) {
  encoding = String(encoding || 'utf8').toLowerCase();
  start = +start || 0;
  if (typeof end == 'undefined') end = this.length;

  // Fastpath empty strings
  if (+end == start) {
    return '';
  }

  switch (encoding) {
    case 'hex':
      return this.hexSlice(start, end);

    case 'utf8':
    case 'utf-8':
      return this.utf8Slice(start, end);

    case 'ascii':
      return this.asciiSlice(start, end);

    case 'binary':
      return this.binarySlice(start, end);

    case 'base64':
      return this.base64Slice(start, end);

    case 'ucs2':
    case 'ucs-2':
      return this.ucs2Slice(start, end);

    default:
      throw new Error('Unknown encoding');
  }
};


SlowBuffer.prototype.hexWrite = function(string, offset, length) {
  offset = +offset || 0;
  var remaining = this.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = +length;
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2) {
    throw new Error('Invalid hex string');
  }
  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(byte)) throw new Error('Invalid hex string');
    this[offset + i] = byte;
  }
  SlowBuffer._charsWritten = i * 2;
  return i;
};


SlowBuffer.prototype.write = function(string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length;
      length = undefined;
    }
  } else {  // legacy
    var swap = encoding;
    encoding = offset;
    offset = length;
    length = swap;
  }

  offset = +offset || 0;
  var remaining = this.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = +length;
    if (length > remaining) {
      length = remaining;
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase();

  switch (encoding) {
    case 'hex':
      return this.hexWrite(string, offset, length);

    case 'utf8':
    case 'utf-8':
      return this.utf8Write(string, offset, length);

    case 'ascii':
      return this.asciiWrite(string, offset, length);

    case 'binary':
      return this.binaryWrite(string, offset, length);

    case 'base64':
      return this.base64Write(string, offset, length);

    case 'ucs2':
    case 'ucs-2':
      return this.ucs2Write(string, offset, length);

    default:
      throw new Error('Unknown encoding');
  }
};


// slice(start, end)
SlowBuffer.prototype.slice = function(start, end) {
  if (end === undefined) end = this.length;

  if (end > this.length) {
    throw new Error('oob');
  }
  if (start > end) {
    throw new Error('oob');
  }

  return new Buffer(this, end - start, +start);
};

SlowBuffer.prototype.copy = function(target, targetstart, sourcestart, sourceend) {
  var temp = [];
  for (var i=sourcestart; i<sourceend; i++) {
    assert.ok(typeof this[i] !== 'undefined', "copying undefined buffer bytes!");
    temp.push(this[i]);
  }

  for (var i=targetstart; i<targetstart+temp.length; i++) {
    target[i] = temp[i-targetstart];
  }
};

SlowBuffer.prototype.fill = function(value, start, end) {
  if (end > this.length) {
    throw new Error('oob');
  }
  if (start > end) {
    throw new Error('oob');
  }

  for (var i = start; i < end; i++) {
    this[i] = value;
  }
}

function coerce(length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length);
  return length < 0 ? 0 : length;
}


// Buffer

function Buffer(subject, encoding, offset) {
  if (!(this instanceof Buffer)) {
    return new Buffer(subject, encoding, offset);
  }

  var type;

  // Are we slicing?
  if (typeof offset === 'number') {
    this.length = coerce(encoding);
    this.parent = subject;
    this.offset = offset;
  } else {
    // Find the length
    switch (type = typeof subject) {
      case 'number':
        this.length = coerce(subject);
        break;

      case 'string':
        this.length = Buffer.byteLength(subject, encoding);
        break;

      case 'object': // Assume object is an array
        this.length = coerce(subject.length);
        break;

      default:
        throw new Error('First argument needs to be a number, ' +
                        'array or string.');
    }

    if (this.length > Buffer.poolSize) {
      // Big buffer, just alloc one.
      this.parent = new SlowBuffer(this.length);
      this.offset = 0;

    } else {
      // Small buffer.
      if (!pool || pool.length - pool.used < this.length) allocPool();
      this.parent = pool;
      this.offset = pool.used;
      pool.used += this.length;
    }

    // Treat array-ish objects as a byte array.
    if (isArrayIsh(subject)) {
      for (var i = 0; i < this.length; i++) {
        if (subject instanceof Buffer) {
          this.parent[i + this.offset] = subject.readUInt8(i);
        }
        else {
          this.parent[i + this.offset] = subject[i];
        }
      }
    } else if (type == 'string') {
      // We are a string
      this.length = this.write(subject, 0, encoding);
    }
  }

}

function isArrayIsh(subject) {
  return Array.isArray(subject) || Buffer.isBuffer(subject) ||
         subject && typeof subject === 'object' &&
         typeof subject.length === 'number';
}

exports.SlowBuffer = SlowBuffer;
exports.Buffer = Buffer;

Buffer.poolSize = 8 * 1024;
var pool;

function allocPool() {
  pool = new SlowBuffer(Buffer.poolSize);
  pool.used = 0;
}


// Static methods
Buffer.isBuffer = function isBuffer(b) {
  return b instanceof Buffer || b instanceof SlowBuffer;
};

Buffer.concat = function (list, totalLength) {
  if (!Array.isArray(list)) {
    throw new Error("Usage: Buffer.concat(list, [totalLength])\n \
      list should be an Array.");
  }

  if (list.length === 0) {
    return new Buffer(0);
  } else if (list.length === 1) {
    return list[0];
  }

  if (typeof totalLength !== 'number') {
    totalLength = 0;
    for (var i = 0; i < list.length; i++) {
      var buf = list[i];
      totalLength += buf.length;
    }
  }

  var buffer = new Buffer(totalLength);
  var pos = 0;
  for (var i = 0; i < list.length; i++) {
    var buf = list[i];
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
};

// Inspect
Buffer.prototype.inspect = function inspect() {
  var out = [],
      len = this.length;

  for (var i = 0; i < len; i++) {
    out[i] = toHex(this.parent[i + this.offset]);
    if (i == exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...';
      break;
    }
  }

  return '<Buffer ' + out.join(' ') + '>';
};


Buffer.prototype.get = function get(i) {
  if (i < 0 || i >= this.length) throw new Error('oob');
  return this.parent[this.offset + i];
};


Buffer.prototype.set = function set(i, v) {
  if (i < 0 || i >= this.length) throw new Error('oob');
  return this.parent[this.offset + i] = v;
};


// write(string, offset = 0, length = buffer.length-offset, encoding = 'utf8')
Buffer.prototype.write = function(string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length;
      length = undefined;
    }
  } else {  // legacy
    var swap = encoding;
    encoding = offset;
    offset = length;
    length = swap;
  }

  offset = +offset || 0;
  var remaining = this.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = +length;
    if (length > remaining) {
      length = remaining;
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase();

  var ret;
  switch (encoding) {
    case 'hex':
      ret = this.parent.hexWrite(string, this.offset + offset, length);
      break;

    case 'utf8':
    case 'utf-8':
      ret = this.parent.utf8Write(string, this.offset + offset, length);
      break;

    case 'ascii':
      ret = this.parent.asciiWrite(string, this.offset + offset, length);
      break;

    case 'binary':
      ret = this.parent.binaryWrite(string, this.offset + offset, length);
      break;

    case 'base64':
      // Warning: maxLength not taken into account in base64Write
      ret = this.parent.base64Write(string, this.offset + offset, length);
      break;

    case 'ucs2':
    case 'ucs-2':
      ret = this.parent.ucs2Write(string, this.offset + offset, length);
      break;

    default:
      throw new Error('Unknown encoding');
  }

  Buffer._charsWritten = SlowBuffer._charsWritten;

  return ret;
};


// toString(encoding, start=0, end=buffer.length)
Buffer.prototype.toString = function(encoding, start, end) {
  encoding = String(encoding || 'utf8').toLowerCase();

  if (typeof start == 'undefined' || start < 0) {
    start = 0;
  } else if (start > this.length) {
    start = this.length;
  }

  if (typeof end == 'undefined' || end > this.length) {
    end = this.length;
  } else if (end < 0) {
    end = 0;
  }

  start = start + this.offset;
  end = end + this.offset;

  switch (encoding) {
    case 'hex':
      return this.parent.hexSlice(start, end);

    case 'utf8':
    case 'utf-8':
      return this.parent.utf8Slice(start, end);

    case 'ascii':
      return this.parent.asciiSlice(start, end);

    case 'binary':
      return this.parent.binarySlice(start, end);

    case 'base64':
      return this.parent.base64Slice(start, end);

    case 'ucs2':
    case 'ucs-2':
      return this.parent.ucs2Slice(start, end);

    default:
      throw new Error('Unknown encoding');
  }
};


// byteLength
Buffer.byteLength = SlowBuffer.byteLength;


// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill(value, start, end) {
  value || (value = 0);
  start || (start = 0);
  end || (end = this.length);

  if (typeof value === 'string') {
    value = value.charCodeAt(0);
  }
  if (!(typeof value === 'number') || isNaN(value)) {
    throw new Error('value is not a number');
  }

  if (end < start) throw new Error('end < start');

  // Fill 0 bytes; we're done
  if (end === start) return 0;
  if (this.length == 0) return 0;

  if (start < 0 || start >= this.length) {
    throw new Error('start out of bounds');
  }

  if (end < 0 || end > this.length) {
    throw new Error('end out of bounds');
  }

  return this.parent.fill(value,
                          start + this.offset,
                          end + this.offset);
};


// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function(target, target_start, start, end) {
  var source = this;
  start || (start = 0);
  end || (end = this.length);
  target_start || (target_start = 0);

  if (end < start) throw new Error('sourceEnd < sourceStart');

  // Copy 0 bytes; we're done
  if (end === start) return 0;
  if (target.length == 0 || source.length == 0) return 0;

  if (target_start < 0 || target_start >= target.length) {
    throw new Error('targetStart out of bounds');
  }

  if (start < 0 || start >= source.length) {
    throw new Error('sourceStart out of bounds');
  }

  if (end < 0 || end > source.length) {
    throw new Error('sourceEnd out of bounds');
  }

  // Are we oob?
  if (end > this.length) {
    end = this.length;
  }

  if (target.length - target_start < end - start) {
    end = target.length - target_start + start;
  }

  return this.parent.copy(target.parent,
                          target_start + target.offset,
                          start + this.offset,
                          end + this.offset);
};


// slice(start, end)
Buffer.prototype.slice = function(start, end) {
  if (end === undefined) end = this.length;
  if (end > this.length) throw new Error('oob');
  if (start > end) throw new Error('oob');

  return new Buffer(this.parent, end - start, +start + this.offset);
};


// Legacy methods for backwards compatibility.

Buffer.prototype.utf8Slice = function(start, end) {
  return this.toString('utf8', start, end);
};

Buffer.prototype.binarySlice = function(start, end) {
  return this.toString('binary', start, end);
};

Buffer.prototype.asciiSlice = function(start, end) {
  return this.toString('ascii', start, end);
};

Buffer.prototype.utf8Write = function(string, offset) {
  return this.write(string, offset, 'utf8');
};

Buffer.prototype.binaryWrite = function(string, offset) {
  return this.write(string, offset, 'binary');
};

Buffer.prototype.asciiWrite = function(string, offset) {
  return this.write(string, offset, 'ascii');
};

Buffer.prototype.readUInt8 = function(offset, noAssert) {
  var buffer = this;

  if (!noAssert) {
    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'Trying to read beyond buffer length');
  }

  if (offset >= buffer.length) return;

  return buffer.parent[buffer.offset + offset];
};

function readUInt16(buffer, offset, isBigEndian, noAssert) {
  var val = 0;


  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'Trying to read beyond buffer length');
  }

  if (offset >= buffer.length) return 0;

  if (isBigEndian) {
    val = buffer.parent[buffer.offset + offset] << 8;
    if (offset + 1 < buffer.length) {
      val |= buffer.parent[buffer.offset + offset + 1];
    }
  } else {
    val = buffer.parent[buffer.offset + offset];
    if (offset + 1 < buffer.length) {
      val |= buffer.parent[buffer.offset + offset + 1] << 8;
    }
  }

  return val;
}

Buffer.prototype.readUInt16LE = function(offset, noAssert) {
  return readUInt16(this, offset, false, noAssert);
};

Buffer.prototype.readUInt16BE = function(offset, noAssert) {
  return readUInt16(this, offset, true, noAssert);
};

function readUInt32(buffer, offset, isBigEndian, noAssert) {
  var val = 0;

  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to read beyond buffer length');
  }

  if (offset >= buffer.length) return 0;

  if (isBigEndian) {
    if (offset + 1 < buffer.length)
      val = buffer.parent[buffer.offset + offset + 1] << 16;
    if (offset + 2 < buffer.length)
      val |= buffer.parent[buffer.offset + offset + 2] << 8;
    if (offset + 3 < buffer.length)
      val |= buffer.parent[buffer.offset + offset + 3];
    val = val + (buffer.parent[buffer.offset + offset] << 24 >>> 0);
  } else {
    if (offset + 2 < buffer.length)
      val = buffer.parent[buffer.offset + offset + 2] << 16;
    if (offset + 1 < buffer.length)
      val |= buffer.parent[buffer.offset + offset + 1] << 8;
    val |= buffer.parent[buffer.offset + offset];
    if (offset + 3 < buffer.length)
      val = val + (buffer.parent[buffer.offset + offset + 3] << 24 >>> 0);
  }

  return val;
}

Buffer.prototype.readUInt32LE = function(offset, noAssert) {
  return readUInt32(this, offset, false, noAssert);
};

Buffer.prototype.readUInt32BE = function(offset, noAssert) {
  return readUInt32(this, offset, true, noAssert);
};


/*
 * Signed integer types, yay team! A reminder on how two's complement actually
 * works. The first bit is the signed bit, i.e. tells us whether or not the
 * number should be positive or negative. If the two's complement value is
 * positive, then we're done, as it's equivalent to the unsigned representation.
 *
 * Now if the number is positive, you're pretty much done, you can just leverage
 * the unsigned translations and return those. Unfortunately, negative numbers
 * aren't quite that straightforward.
 *
 * At first glance, one might be inclined to use the traditional formula to
 * translate binary numbers between the positive and negative values in two's
 * complement. (Though it doesn't quite work for the most negative value)
 * Mainly:
 *  - invert all the bits
 *  - add one to the result
 *
 * Of course, this doesn't quite work in Javascript. Take for example the value
 * of -128. This could be represented in 16 bits (big-endian) as 0xff80. But of
 * course, Javascript will do the following:
 *
 * > ~0xff80
 * -65409
 *
 * Whoh there, Javascript, that's not quite right. But wait, according to
 * Javascript that's perfectly correct. When Javascript ends up seeing the
 * constant 0xff80, it has no notion that it is actually a signed number. It
 * assumes that we've input the unsigned value 0xff80. Thus, when it does the
 * binary negation, it casts it into a signed value, (positive 0xff80). Then
 * when you perform binary negation on that, it turns it into a negative number.
 *
 * Instead, we're going to have to use the following general formula, that works
 * in a rather Javascript friendly way. I'm glad we don't support this kind of
 * weird numbering scheme in the kernel.
 *
 * (BIT-MAX - (unsigned)val + 1) * -1
 *
 * The astute observer, may think that this doesn't make sense for 8-bit numbers
 * (really it isn't necessary for them). However, when you get 16-bit numbers,
 * you do. Let's go back to our prior example and see how this will look:
 *
 * (0xffff - 0xff80 + 1) * -1
 * (0x007f + 1) * -1
 * (0x0080) * -1
 */
Buffer.prototype.readInt8 = function(offset, noAssert) {
  var buffer = this;
  var neg;

  if (!noAssert) {
    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'Trying to read beyond buffer length');
  }

  if (offset >= buffer.length) return;

  neg = buffer.parent[buffer.offset + offset] & 0x80;
  if (!neg) {
    return (buffer.parent[buffer.offset + offset]);
  }

  return ((0xff - buffer.parent[buffer.offset + offset] + 1) * -1);
};

function readInt16(buffer, offset, isBigEndian, noAssert) {
  var neg, val;

  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'Trying to read beyond buffer length');
  }

  val = readUInt16(buffer, offset, isBigEndian, noAssert);
  neg = val & 0x8000;
  if (!neg) {
    return val;
  }

  return (0xffff - val + 1) * -1;
}

Buffer.prototype.readInt16LE = function(offset, noAssert) {
  return readInt16(this, offset, false, noAssert);
};

Buffer.prototype.readInt16BE = function(offset, noAssert) {
  return readInt16(this, offset, true, noAssert);
};

function readInt32(buffer, offset, isBigEndian, noAssert) {
  var neg, val;

  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to read beyond buffer length');
  }

  val = readUInt32(buffer, offset, isBigEndian, noAssert);
  neg = val & 0x80000000;
  if (!neg) {
    return (val);
  }

  return (0xffffffff - val + 1) * -1;
}

Buffer.prototype.readInt32LE = function(offset, noAssert) {
  return readInt32(this, offset, false, noAssert);
};

Buffer.prototype.readInt32BE = function(offset, noAssert) {
  return readInt32(this, offset, true, noAssert);
};

function readFloat(buffer, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset + 3 < buffer.length,
        'Trying to read beyond buffer length');
  }

  return require('./buffer_ieee754').readIEEE754(buffer, offset, isBigEndian,
      23, 4);
}

Buffer.prototype.readFloatLE = function(offset, noAssert) {
  return readFloat(this, offset, false, noAssert);
};

Buffer.prototype.readFloatBE = function(offset, noAssert) {
  return readFloat(this, offset, true, noAssert);
};

function readDouble(buffer, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset + 7 < buffer.length,
        'Trying to read beyond buffer length');
  }

  return require('./buffer_ieee754').readIEEE754(buffer, offset, isBigEndian,
      52, 8);
}

Buffer.prototype.readDoubleLE = function(offset, noAssert) {
  return readDouble(this, offset, false, noAssert);
};

Buffer.prototype.readDoubleBE = function(offset, noAssert) {
  return readDouble(this, offset, true, noAssert);
};


/*
 * We have to make sure that the value is a valid integer. This means that it is
 * non-negative. It has no fractional component and that it does not exceed the
 * maximum allowed value.
 *
 *      value           The number to check for validity
 *
 *      max             The maximum value
 */
function verifuint(value, max) {
  assert.ok(typeof (value) == 'number',
      'cannot write a non-number as a number');

  assert.ok(value >= 0,
      'specified a negative value for writing an unsigned value');

  assert.ok(value <= max, 'value is larger than maximum value for type');

  assert.ok(Math.floor(value) === value, 'value has a fractional component');
}

Buffer.prototype.writeUInt8 = function(value, offset, noAssert) {
  var buffer = this;

  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'trying to write beyond buffer length');

    verifuint(value, 0xff);
  }

  if (offset < buffer.length) {
    buffer.parent[buffer.offset + offset] = value;
  }
};

function writeUInt16(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'trying to write beyond buffer length');

    verifuint(value, 0xffff);
  }

  for (var i = 0; i < Math.min(buffer.length - offset, 2); i++) {
    buffer.parent[buffer.offset + offset + i] =
        (value & (0xff << (8 * (isBigEndian ? 1 - i : i)))) >>>
            (isBigEndian ? 1 - i : i) * 8;
  }

}

Buffer.prototype.writeUInt16LE = function(value, offset, noAssert) {
  writeUInt16(this, value, offset, false, noAssert);
};

Buffer.prototype.writeUInt16BE = function(value, offset, noAssert) {
  writeUInt16(this, value, offset, true, noAssert);
};

function writeUInt32(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'trying to write beyond buffer length');

    verifuint(value, 0xffffffff);
  }

  for (var i = 0; i < Math.min(buffer.length - offset, 4); i++) {
    buffer.parent[buffer.offset + offset + i] =
        (value >>> (isBigEndian ? 3 - i : i) * 8) & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function(value, offset, noAssert) {
  writeUInt32(this, value, offset, false, noAssert);
};

Buffer.prototype.writeUInt32BE = function(value, offset, noAssert) {
  writeUInt32(this, value, offset, true, noAssert);
};


/*
 * We now move onto our friends in the signed number category. Unlike unsigned
 * numbers, we're going to have to worry a bit more about how we put values into
 * arrays. Since we are only worrying about signed 32-bit values, we're in
 * slightly better shape. Unfortunately, we really can't do our favorite binary
 * & in this system. It really seems to do the wrong thing. For example:
 *
 * > -32 & 0xff
 * 224
 *
 * What's happening above is really: 0xe0 & 0xff = 0xe0. However, the results of
 * this aren't treated as a signed number. Ultimately a bad thing.
 *
 * What we're going to want to do is basically create the unsigned equivalent of
 * our representation and pass that off to the wuint* functions. To do that
 * we're going to do the following:
 *
 *  - if the value is positive
 *      we can pass it directly off to the equivalent wuint
 *  - if the value is negative
 *      we do the following computation:
 *         mb + val + 1, where
 *         mb   is the maximum unsigned value in that byte size
 *         val  is the Javascript negative integer
 *
 *
 * As a concrete value, take -128. In signed 16 bits this would be 0xff80. If
 * you do out the computations:
 *
 * 0xffff - 128 + 1
 * 0xffff - 127
 * 0xff80
 *
 * You can then encode this value as the signed version. This is really rather
 * hacky, but it should work and get the job done which is our goal here.
 */

/*
 * A series of checks to make sure we actually have a signed 32-bit number
 */
function verifsint(value, max, min) {
  assert.ok(typeof (value) == 'number',
      'cannot write a non-number as a number');

  assert.ok(value <= max, 'value larger than maximum allowed value');

  assert.ok(value >= min, 'value smaller than minimum allowed value');

  assert.ok(Math.floor(value) === value, 'value has a fractional component');
}

function verifIEEE754(value, max, min) {
  assert.ok(typeof (value) == 'number',
      'cannot write a non-number as a number');

  assert.ok(value <= max, 'value larger than maximum allowed value');

  assert.ok(value >= min, 'value smaller than minimum allowed value');
}

Buffer.prototype.writeInt8 = function(value, offset, noAssert) {
  var buffer = this;

  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'Trying to write beyond buffer length');

    verifsint(value, 0x7f, -0x80);
  }

  if (value >= 0) {
    buffer.writeUInt8(value, offset, noAssert);
  } else {
    buffer.writeUInt8(0xff + value + 1, offset, noAssert);
  }
};

function writeInt16(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'Trying to write beyond buffer length');

    verifsint(value, 0x7fff, -0x8000);
  }

  if (value >= 0) {
    writeUInt16(buffer, value, offset, isBigEndian, noAssert);
  } else {
    writeUInt16(buffer, 0xffff + value + 1, offset, isBigEndian, noAssert);
  }
}

Buffer.prototype.writeInt16LE = function(value, offset, noAssert) {
  writeInt16(this, value, offset, false, noAssert);
};

Buffer.prototype.writeInt16BE = function(value, offset, noAssert) {
  writeInt16(this, value, offset, true, noAssert);
};

function writeInt32(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to write beyond buffer length');

    verifsint(value, 0x7fffffff, -0x80000000);
  }

  if (value >= 0) {
    writeUInt32(buffer, value, offset, isBigEndian, noAssert);
  } else {
    writeUInt32(buffer, 0xffffffff + value + 1, offset, isBigEndian, noAssert);
  }
}

Buffer.prototype.writeInt32LE = function(value, offset, noAssert) {
  writeInt32(this, value, offset, false, noAssert);
};

Buffer.prototype.writeInt32BE = function(value, offset, noAssert) {
  writeInt32(this, value, offset, true, noAssert);
};

function writeFloat(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to write beyond buffer length');

    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }

  require('./buffer_ieee754').writeIEEE754(buffer, value, offset, isBigEndian,
      23, 4);
}

Buffer.prototype.writeFloatLE = function(value, offset, noAssert) {
  writeFloat(this, value, offset, false, noAssert);
};

Buffer.prototype.writeFloatBE = function(value, offset, noAssert) {
  writeFloat(this, value, offset, true, noAssert);
};

function writeDouble(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 7 < buffer.length,
        'Trying to write beyond buffer length');

    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }

  require('./buffer_ieee754').writeIEEE754(buffer, value, offset, isBigEndian,
      52, 8);
}

Buffer.prototype.writeDoubleLE = function(value, offset, noAssert) {
  writeDouble(this, value, offset, false, noAssert);
};

Buffer.prototype.writeDoubleBE = function(value, offset, noAssert) {
  writeDouble(this, value, offset, true, noAssert);
};

SlowBuffer.prototype.readUInt8 = Buffer.prototype.readUInt8;
SlowBuffer.prototype.readUInt16LE = Buffer.prototype.readUInt16LE;
SlowBuffer.prototype.readUInt16BE = Buffer.prototype.readUInt16BE;
SlowBuffer.prototype.readUInt32LE = Buffer.prototype.readUInt32LE;
SlowBuffer.prototype.readUInt32BE = Buffer.prototype.readUInt32BE;
SlowBuffer.prototype.readInt8 = Buffer.prototype.readInt8;
SlowBuffer.prototype.readInt16LE = Buffer.prototype.readInt16LE;
SlowBuffer.prototype.readInt16BE = Buffer.prototype.readInt16BE;
SlowBuffer.prototype.readInt32LE = Buffer.prototype.readInt32LE;
SlowBuffer.prototype.readInt32BE = Buffer.prototype.readInt32BE;
SlowBuffer.prototype.readFloatLE = Buffer.prototype.readFloatLE;
SlowBuffer.prototype.readFloatBE = Buffer.prototype.readFloatBE;
SlowBuffer.prototype.readDoubleLE = Buffer.prototype.readDoubleLE;
SlowBuffer.prototype.readDoubleBE = Buffer.prototype.readDoubleBE;
SlowBuffer.prototype.writeUInt8 = Buffer.prototype.writeUInt8;
SlowBuffer.prototype.writeUInt16LE = Buffer.prototype.writeUInt16LE;
SlowBuffer.prototype.writeUInt16BE = Buffer.prototype.writeUInt16BE;
SlowBuffer.prototype.writeUInt32LE = Buffer.prototype.writeUInt32LE;
SlowBuffer.prototype.writeUInt32BE = Buffer.prototype.writeUInt32BE;
SlowBuffer.prototype.writeInt8 = Buffer.prototype.writeInt8;
SlowBuffer.prototype.writeInt16LE = Buffer.prototype.writeInt16LE;
SlowBuffer.prototype.writeInt16BE = Buffer.prototype.writeInt16BE;
SlowBuffer.prototype.writeInt32LE = Buffer.prototype.writeInt32LE;
SlowBuffer.prototype.writeInt32BE = Buffer.prototype.writeInt32BE;
SlowBuffer.prototype.writeFloatLE = Buffer.prototype.writeFloatLE;
SlowBuffer.prototype.writeFloatBE = Buffer.prototype.writeFloatBE;
SlowBuffer.prototype.writeDoubleLE = Buffer.prototype.writeDoubleLE;
SlowBuffer.prototype.writeDoubleBE = Buffer.prototype.writeDoubleBE;

})()
},{"assert":11,"./buffer_ieee754":14,"base64-js":16}],15:[function(require,module,exports){
(function(){//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
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
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

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
  _.VERSION = '1.7.0';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var createCallback = function(func, context, argCount) {
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
  _.iteratee = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return createCallback(value, context, argCount);
    if (_.isObject(value)) return _.matches(value);
    return _.property(value);
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++) {
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
    if (obj == null) return [];
    iteratee = _.iteratee(iteratee, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length),
        currentKey;
    for (var index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index = 0, currentKey;
    if (arguments.length < 3) {
      if (!length) throw new TypeError(reduceError);
      memo = obj[keys ? keys[index++] : index++];
    }
    for (; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== + obj.length && _.keys(obj),
        index = (keys || obj).length,
        currentKey;
    if (arguments.length < 3) {
      if (!index) throw new TypeError(reduceError);
      memo = obj[keys ? keys[--index] : --index];
    }
    while (index--) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    predicate = _.iteratee(predicate, context);
    _.some(obj, function(value, index, list) {
      if (predicate(value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    predicate = _.iteratee(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    if (obj == null) return true;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    if (obj == null) return false;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (obj.length !== +obj.length) obj = _.values(obj);
    return _.indexOf(obj, target) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
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
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
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
    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
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
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context);
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
      iteratee = _.iteratee(iteratee, context);
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

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = low + high >>> 1;
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = _.iteratee(predicate, context);
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
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (isSorted) {
        if (!i || seen !== value) result.push(value);
        seen = value;
      } else if (iteratee) {
        var computed = iteratee(value, i, array);
        if (_.indexOf(seen, computed) < 0) {
          seen.push(computed);
          result.push(value);
        }
      } else if (_.indexOf(result, value) < 0) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
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
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function(array) {
    if (array == null) return [];
    var length = _.max(arguments, 'length').length;
    var results = Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var idx = array.length;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
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

  // Reusable constructor function for prototype setting.
  var Ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      Ctor.prototype = func.prototype;
      var self = new Ctor;
      Ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (_.isObject(result)) return result;
      return self;
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
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
      var address = hasher ? hasher.apply(this, arguments) : key;
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
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

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
        clearTimeout(timeout);
        timeout = null;
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

      if (last < wait && last > 0) {
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

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed before being called N times.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      } else {
        func = null;
      }
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
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
  _.extend = function(obj) {
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iteratee, context) {
    var result = {}, key;
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      iteratee = createCallback(iteratee, context);
      for (key in obj) {
        var value = obj[key];
        if (iteratee(value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      obj = new Object(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (key in obj) result[key] = obj[key];
      }
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
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
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (
      aCtor !== bCtor &&
      // Handle Object.create(x) cases
      'constructor' in a && 'constructor' in b &&
      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
        _.isFunction(bCtor) && bCtor instanceof bCtor)
    ) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size, result;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size === b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      size = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      result = _.keys(b).length === size;
      if (result) {
        while (size--) {
          // Deep compare each member
          key = keys[size];
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
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

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
  if (typeof /./ !== 'function') {
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

  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    var pairs = _.pairs(attrs), length = pairs.length;
    return function(obj) {
      if (obj == null) return !length;
      obj = new Object(obj);
      for (var i = 0; i < length; i++) {
        var pair = pairs[i], key = pair[0];
        if (pair[1] !== obj[key] || !(key in obj)) return false;
      }
      return true;
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = createCallback(iteratee, context, 1);
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
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? object[property]() : value;
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
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
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
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
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

})()
},{}],16:[function(require,module,exports){
(function (exports) {
	'use strict';

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	function b64ToByteArray(b64) {
		var i, j, l, tmp, placeHolders, arr;
	
		if (b64.length % 4 > 0) {
			throw 'Invalid string. Length must be a multiple of 4';
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		placeHolders = b64.indexOf('=');
		placeHolders = placeHolders > 0 ? b64.length - placeHolders : 0;

		// base64 is 4/3 + up to two characters of the original data
		arr = [];//new Uint8Array(b64.length * 3 / 4 - placeHolders);

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length;

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (lookup.indexOf(b64[i]) << 18) | (lookup.indexOf(b64[i + 1]) << 12) | (lookup.indexOf(b64[i + 2]) << 6) | lookup.indexOf(b64[i + 3]);
			arr.push((tmp & 0xFF0000) >> 16);
			arr.push((tmp & 0xFF00) >> 8);
			arr.push(tmp & 0xFF);
		}

		if (placeHolders === 2) {
			tmp = (lookup.indexOf(b64[i]) << 2) | (lookup.indexOf(b64[i + 1]) >> 4);
			arr.push(tmp & 0xFF);
		} else if (placeHolders === 1) {
			tmp = (lookup.indexOf(b64[i]) << 10) | (lookup.indexOf(b64[i + 1]) << 4) | (lookup.indexOf(b64[i + 2]) >> 2);
			arr.push((tmp >> 8) & 0xFF);
			arr.push(tmp & 0xFF);
		}

		return arr;
	}

	function uint8ToBase64(uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length;

		function tripletToBase64 (num) {
			return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
		};

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
			output += tripletToBase64(temp);
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1];
				output += lookup[temp >> 2];
				output += lookup[(temp << 4) & 0x3F];
				output += '==';
				break;
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1]);
				output += lookup[temp >> 10];
				output += lookup[(temp >> 4) & 0x3F];
				output += lookup[(temp << 2) & 0x3F];
				output += '=';
				break;
		}

		return output;
	}

	module.exports.toByteArray = b64ToByteArray;
	module.exports.fromByteArray = uint8ToBase64;
}());

},{}]},{},[3])
;