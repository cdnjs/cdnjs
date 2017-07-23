/**
 * lightservice - Simple and convinient interface for service consumption
 * @version v9.1.0
 * @link https://github.com/contactsamie/LightService
 * @license MIT
 * @license Samuel Bamgboye <contactsamie@gmail.com> 
 */
var light = (typeof light === "undefined") ? (function () {
    var _$ = {};
    _$.getCurrentContext = function (storeName, arg, storeOverride) {
        var store = storeOverride ? JSON.parse(JSON.stringify({ data: storeOverride })).data : storeOverride

        var incontext = {
            event: _$.sysServ,
            serviceChain: chainService,
            service: function () {
                return chainService(undefined, true);
            },
            arg: arg,
            system: _$.system,
            store: _$.STR[storeName].api(store)
        };
        return incontext;
    };
    _$.forbiddenNames = {
        result: true,
        service: true,
        handle: true,
        on: true,
        before: true,
        after: true,
        error: true,
        success: true
    };

    _$.noForbName = function (name) {
        if (_$.forbiddenNames[name]) {
            throw "'" + name + "' unuseable";
        }
    };

    _$.rgi = {
        service: {},
        handle: {},
        scripts: {}
    };

    _$.isRegistered = function (str) {
        if (_$.rgi.service[str] || _$.rgi.handle[str]) {
            return true;
        }
        return false;
    };

    _$.genName = function (prefix) {
        _$.genName.num = _$.genName.num || 0;
        _$.genName.num++;
        prefix = prefix || "ls";
        // var str = (prefix + '_xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx')["replace"](/[xy]/g, function (c) { var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8; return v.toString(16); });
        var str = prefix + _$.genName.num;
        if (_$.isRegistered(str)) {
            return _$.genName(prefix);
        }
        return str;
    }

    _$.$setState = function (systemName, name, obj) {
        _$.STR[systemName]["ref"][name] = { data: obj };
        _$.STR[systemName]["store"][name] = JSON.stringify(_$.STR[systemName]["ref"][name]);
    };
    _$.$getState = function (systemName) {
        var storeRoot = _$.STR[systemName];
        return storeRoot && (_$.STR[systemName]["store"] || {});
    };

    //$storeOverride

    _$.storeFactory = function (systemName) {
        _$.STR[systemName] = {
            store: {},
            ref: {},
            api: function (storeOverride) {
                if (storeOverride) {
                    _$.STR[systemName]["store"] = storeOverride;
                }

                return {
                    get: function (name) {
                        var data = _$.$getState(systemName)[name];
                        if (!data) {
                            return data;
                        };
                        return JSON.parse(data).data;
                    },
                    set: function (name, obj) {
                        _$.$setState(systemName, name, obj);
                    },
                    getRef: function (name) {
                        _$.STR[systemName]["ref"][name] = _$.STR[systemName]["ref"][name] || {};
                        return _$.STR[systemName]["ref"][name].data;
                    }
                };
            }
        }
    };

    _$.burnThread = function (seconds) {
        var e = new Date().getTime() + (seconds * 1000);
        while (new Date().getTime() <= e) { }
    };

    _$.loadScript = function (src, onload) {
        // todo wrap require js
        //if (src) {
        //    return require(src);
        //}

        onload ? _$.loadScriptAsync(src, onload) : _$.loadScriptSync(src);
    };

    _$.loadScriptAsync = function (src, onload) {
        if (!document) {
            throw "Cannot load script : no document";
            return;
        }
        var script = document.createElement('script');
        script.src = src;
        script.onload = typeof onload === "function" ? onload : function () { };
        document.getElementsByTagName('head')[0].appendChild(script);
    };

    _$.loadScriptSync = function (src) {
        if (!document) {
            throw "Cannot load script : no document";
            return;
        }

        var xhrObj = createXMLHTTPObject();
        xhrObj.open('GET', src, false);
        xhrObj.send('');
        var se = document.createElement('script');
        se.type = "text/javascript";
        se.text = xhrObj.responseText;
        document.getElementsByTagName('head')[0].appendChild(se);
    };

    _$.track = {
        record: function (arg) {
            if (arg.methodName === _$.DEF_HDLNM) {
                return;
            }

            var recordObject = {
                dataType: arg.dataType,
                methodType: arg.methodType,
                methodName: arg.methodName,
                time: Date.now ? Date.now() : new Date().getTime(),
                isFirst: arg.isFirst,
                isLast: arg.isLast,
                data: arg.data,
                isTest: arg.isTest || false,
                info: arg.info,
                infoType: arg.infoType,
                link: typeof arg.link === "function" ? arg.link.toString() : arg.link,
                store: _$.$getState(arg.methodName),
                event: arg.event,
                eventType: arg.eventType
            };

            var recordStr = JSON.stringify(recordObject);

            if (_$.recordServices) {
                _$.recordServices = false;
                _light[_$.sysEvName.onSystemRecordEvent].send(recordStr);
                _$.recordServices = true;
            }

            if (arg.methodType === _$.serviceTag) {
                _$.sysServ[arg.methodName][_$.serviceEventName[arg.eventType]].send(recordStr);
                if ((arg.eventType === _$.serviceEventName.error) || (arg.eventType === _$.serviceEventName.success)) {
                    _$.sysServ[arg.methodName][_$.serviceEventName[_$.serviceEventName.after]].send(recordStr);
                }
            }

            // notify event subscribers
            _light[arg.event].send(recordStr);
            _light[_$.sysEvName.onSystemEvent].send(recordStr);
        }
    }

    _$.utility = {
        xSupErr: function (o, e, context, notificationInfo) {
            if (typeof o === "function") {
                try { o(e, context, notificationInfo); } catch (ex) {
                    console.error("ERROR : " + ex);
                }
            }
        },
        tc: function (context, f, success, error) {
            try {
                var result = f();
                _$.utility.xSupErr(function () {
                    success(result, context);
                }, null, context, "trying-service");
            } catch (e) {
                _$.utility.xSupErr(function () {
                    console.error("ERROR : " + e);
                    error(e, context);
                }, e, context, "service-throws");
            }
        }
    };

    _$.messageReceivers = {};

    _$.send = function (messageName, messageArg) {
        _$.messageReceivers[messageName] = _$.messageReceivers[messageName] || [];
        var total = _$.messageReceivers[messageName].length;
        var results = [];
        for (var i = 0; i < total; i++) {
            var receiver = _$.messageReceivers[messageName][i];
            receiver && receiver.link && _light(function () {
                var result = this.service()[receiver.link](messageArg);
               // if (typeof result !== "undefined") {
                results.push({ result: result });
              //  }
            });
        }
        return results;
    };
    _$.receive = function (messageName, fn) {
        _$.messageReceivers[messageName] = _$.messageReceivers[messageName] || [];
        var messageItem = { message: messageName };
        messageItem.link = _light.service(_$.genName(), _$.DEF_HDLNM, fn);
        _$.messageReceivers[messageName].push(messageItem);
    };

    var XMLHttpFactories = [
  function () { return new XMLHttpRequest() },
  function () { return new ActiveXObject("Msxml2.XMLHTTP") },
  function () { return new ActiveXObject("Msxml3.XMLHTTP") },
  function () { return new ActiveXObject("Microsoft.XMLHTTP") }
    ];

    var createXMLHTTPObject = function () {
        var xmlhttp = false;
        for (var i = 0; i < XMLHttpFactories.length; i++) {
            try {
                xmlhttp = XMLHttpFactories[i]();
            }
            catch (e) {
                continue;
            }
            break;
        }
        return xmlhttp;
    }

    var setUpEventSubscriberBase = function (id, o) {
        setUpEventSubscriberBase.ref = setUpEventSubscriberBase.ref || 0;
        setUpEventSubscriberBase.ref++;
        _$.eventSubscribers[id] = _$.eventSubscribers[id] || {};
        _$.eventSubscribers[id].sub = _$.eventSubscribers[id].sub || [];
        _$.eventSubscribers[id].sub.push({
            service: o,
            ref: setUpEventSubscriberBase.ref
        });
        return setUpEventSubscriberBase.ref;
    };

    var createEventEmitter = function (id, f) {
        _$.eventSubscribers[id] = _$.eventSubscribers[id] || {};
        _$.eventSubscribers[id].sub = _$.eventSubscribers[id].sub || [];
        _$.eventSubscribers[id].send = _$.eventSubscribers[id].send || function (o, context, notificationType) {
            var _id = id;
            var l = _$.eventSubscribers[_id].sub.length;
            for (var i = 0; i < l; i++) {
                var item = _$.eventSubscribers[_id].sub[i];
                var notificationInfo = {
                    index: i,
                    notificationType: notificationType
                };
                f(item, o, context, notificationInfo);
            }
        };
    };

    var setUpNotification = function (id) {
        return createEventEmitter(id, function (item, o, context, notificationInfo) {
            _$.utility.tc(context, function () { return item.service(); }, function () { }, function () { _$.utility.xSupErr(item.service().error, o, context, notificationInfo); });
        });
    };

    var setUpEventSubscriber = function (that, event, id) {
        that[event] = function (e) {
            setUpEventSubscriberBase(id, e);
        };
        that["receive"] = that["receive"] || function (name, o) {
            that[name](o);
        };
    };

    var publishSystemEventSubscriptionFx = function (that, event, id) {
        setUpEventSubscriber(that, event, id);
        createEventEmitter(id, function (item, o, context, notificationInfo) {
            if (item && (typeof item.service === "function")) {
                try {
                    item.service(o, context, notificationInfo)
                } catch (e) { }
            }
        });
    };

    var publishServiceEvent = function (that, event, id) {
        setUpEventSubscriber(that, event, id);
        that[event].forEachSubscriber = that[event].forEachSubscriber || function (f) {
            var l = _$.eventSubscribers[id].sub.length;
            for (var i = 0; i < l; i++) {
                var item = _$.eventSubscribers[id].sub[i];
                f && f(item);
            }
        };
        setUpNotification(id);
        that[event].send = _$.eventSubscribers[id].send;
    };

    var publishSystemEvent = function (that, event, name) {
        publishSystemEventSubscriptionFx(that, event, name + "." + event);
        that[event].send = _$.eventSubscribers[name + "." + event].send;
    };

    var getServiceByName = function (serviceName) {
        var item = _$.sysServ[serviceName];
        return item;
    };

    /*
     !!!!!!!!!!!!!!!!
    */
    function isArray(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    }

    var getApplicablehandle_Test = function (context, serviceItem, definition, serviceName, arg) {
        var testhandleName = _$._TEST_OBJECTS_ && _$._TEST_OBJECTS_[serviceName] && _$._TEST_OBJECTS_[serviceName].handleName;

        var testhandle = _$._TEST_OBJECTS_ && _$._TEST_OBJECTS_[serviceName] && _$._TEST_OBJECTS_[serviceName].handle;

        _$.track.record({
            dataType: _$.entranceTag,
            methodType: _$.handleTag,
            methodName: testhandleName,
            data: serviceName,
            info: arg,
            infoType: _$.serviceArgTag,
            isTest: true,
            isFirst: _$.unknownTag,
            isLast: _$.unknownTag,
            link: testhandle,
            event: _$.sysEvName.beforeHandleRun,
            eventType: _$.serviceEventName.before
        });

        tmpDefinition = testhandle.call(_$.getCurrentContext(serviceName, definition), definition);

        _$.track.record({
            dataType: _$.exitTag,
            methodType: _$.handleTag,
            methodName: testhandleName,
            data: serviceName,
            info: _$.unknownTag,
            infoType: _$.unknownTag,
            isTest: true,
            isFirst: _$.unknownTag,
            isLast: _$.unknownTag,
            link: testhandle,
            event: _$.sysEvName.afterHandleRun,
            eventType: _$.serviceEventName.after
        });
        return tmpDefinition;
    };

    var getApplicablehandle_RealTest = function (context, serviceItem, handleName, definition, serviceName, arg, testhandle, testhandleName) {
        if (testhandleName) {
            handleName = testhandleName;
        }
        var lastResult;

        var isAMatch = false;
        var length = _$.handles.length;
        for (var j = 0; j < length; j++) {
            var handle = _$.handles[j];
            isAMatch = handleName && (handle.name === handleName);
            if (isAMatch) {
                _$.track.record({
                    dataType: _$.entranceTag,
                    methodType: _$.handleTag,
                    methodName: handleName,
                    data: serviceName,
                    info: arg,
                    infoType: _$.serviceArgTag,
                    isTest: false,
                    isFirst: _$.unknownTag,
                    isLast: _$.unknownTag,
                    link: (testhandle || handle.definition),
                    event: _$.sysEvName.beforeHandleRun,
                    eventType: _$.serviceEventName.before
                });

                tmpDefinition = (testhandle || handle.definition).call(_$.getCurrentContext(handleName, definition), definition);

                _$.track.record({
                    dataType: _$.exitTag,
                    methodType: _$.handleTag,
                    methodName: handleName,
                    data: serviceName,
                    info: _$.unknownTag,
                    infoType: _$.unknownTag,
                    isTest: false,
                    isFirst: _$.unknownTag,
                    isLast: _$.unknownTag,
                    link: (testhandle || handle.definition),
                    event: _$.sysEvName.afterHandleRun,
                    eventType: _$.serviceEventName.after
                });

                break;
            }
        }

        return tmpDefinition;
    };

    var getApplicablehandle = function (context, serviceItem, handleName, definition, serviceName, arg) {
        var tmpDefinition;
        var testhandleName = _$._TEST_OBJECTS_ && _$._TEST_OBJECTS_[serviceName] && _$._TEST_OBJECTS_[serviceName].handleName;

        var testhandle = _$._TEST_OBJECTS_ && _$._TEST_OBJECTS_[serviceName] && _$._TEST_OBJECTS_[serviceName].handle;
        if (testhandle && !testhandleName) {
            tmpDefinition = getApplicablehandle_Test(context, serviceItem, definition, serviceName, arg);
        }
        else {
            tmpDefinition = getApplicablehandle_RealTest(context, serviceItem, handleName, definition, serviceName, arg, testhandle, testhandleName);
        }
        return tmpDefinition;
    };

    var runSupServFn = function (context, serviceItem, handleNames, definition, serviceName, arg) {
        //start testing
        if (_$._TEST_OBJECTS_ && _$._TEST_OBJECTS_[serviceName] && _$._TEST_OBJECTS_[serviceName].service) {
            handleNames = _$._TEST_OBJECTS_[serviceName].handleNames || handleNames;
            definition = _$._TEST_OBJECTS_[serviceName].service || definition;
        }
        handleNames = isArray(handleNames) ? handleNames : (handleNames ? [handleNames] : []);

        var totalHandles = handleNames.length;

        var lastResult;
        lastResult = arg;
        for (var i = 0; i < totalHandles; i++) {
            var handleName = handleNames[i];

            //end testing
            var returnDefinitionFromHandle = getApplicablehandle(context, serviceItem, handleName, definition, serviceName, lastResult);

            //expecting function from handle plugin
            if (typeof returnDefinitionFromHandle !== "function") {
                var message = "Cannot process service or handle '" + serviceName + "' ";
                message = message + (returnDefinitionFromHandle ? "'" + handleName + "' service handle must return a function" : "no matching service handle  exists ");
                console.error(message);
                throw message;
            }

            lastResult = returnDefinitionFromHandle.call(_$.getCurrentContext(serviceName, lastResult), lastResult);
        }

        return lastResult;
    };

    var createServiceDefinitionFromSuppliedFn = function (context, serviceItem, handleName, definition, serviceName) {
        publishServiceEvent(serviceItem, _$.serviceEventName.before, serviceName + "." + _$.serviceEventName.before);
        publishServiceEvent(serviceItem, _$.serviceEventName.after, serviceName + "." + _$.serviceEventName.after);
        publishServiceEvent(serviceItem, _$.serviceEventName.error, serviceName + "." + _$.serviceEventName.error);
        publishServiceEvent(serviceItem, _$.serviceEventName.success, serviceName + "." + _$.serviceEventName.success);

        return function (arg, callerContext) {
            var tArg = {};
            tArg.arg = arg;

            var result;
            context.callerContext = callerContext;
            _$.utility.tc(context, function () {
                _$.track.record({
                    dataType: _$.entranceTag,
                    methodType: _$.serviceTag,
                    methodName: serviceName,
                    data: tArg.arg,
                    info: handleName,
                    infoType: _$.handleTag,
                    isTest: false,
                    isFirst: _$.unknownTag,
                    isLast: _$.unknownTag,
                    link: definition,
                    event: _$.sysEvName.beforeServiceRun,
                    eventType: _$.serviceEventName.before
                });
            }, function (o) {
            }, function (o) {
            });

            _$.utility.tc(context, function () {
                result = runSupServFn(context, serviceItem, handleName, definition, serviceName, tArg.arg);

                return result;
            }, function (o) {
                _$.track.record({
                    dataType: _$.exitTag,
                    methodType: _$.serviceTag,
                    methodName: serviceName,
                    data: o,
                    info: "event:success",
                    infoType: _$.eventTag,
                    isTest: false,
                    isFirst: _$.unknownTag,
                    isLast: _$.unknownTag,
                    link: definition,
                    event: _$.sysEvName.onServiceSuccess,
                    eventType: _$.serviceEventName.success
                });
            }, function (o) {
                _$.track.record({
                    dataType: _$.exitTag,
                    methodType: _$.serviceTag,
                    methodName: serviceName,
                    data: o,
                    info: "event:error",
                    infoType: _$.eventTag,
                    isTest: false,
                    isFirst: _$.unknownTag,
                    isLast: _$.unknownTag,
                    link: definition,
                    event: _$.sysEvName.onServiceError,
                    eventType: _$.serviceEventName.error
                });
            });

            return result;
        }
    };

    var defineService = function (serviceName, handleNamesOrDefinition, fn) {
        var servicePrefix = "service_";
        if ((arguments.length == 0) || (arguments.length > 3)) {
            throw "Cannot create service : problem with service definition"
            return;
        }

        if (arguments.length == 1) {
            if (typeof serviceName === "function") {
                fn = serviceName;
                serviceName = _$.genName(servicePrefix);
                handleNamesOrDefinition = _$.DEF_HDLNM;
            } else {
                if (!_$.rgi.scripts[serviceName]) {
                    _$.rgi.scripts[serviceName] = true;
                    return {
                        load: function (onload) {
                            _$.loadScript(serviceName, onload && function () {
                                _light(onload);
                            });
                        }
                    };
                } else {
                    return {
                        load: function (onload) {
                            onload && _light(onload);
                        }
                    }
                }
            }
        }
        if (arguments.length == 2) {
            if (typeof handleNamesOrDefinition !== "function") {
                throw "service definition has to be a function";
                return;
            }
            fn = handleNamesOrDefinition;

            if (isArray(serviceName)) {
                handleNamesOrDefinition = serviceName;
                serviceName = _$.genName(servicePrefix);
            } else {
                //service name is provided
                handleNamesOrDefinition = _$.DEF_HDLNM;
            }
        }

        // todo check for unique name
        if (_$.isRegistered(serviceName)) {
            throw "'" + serviceName + "' already exists";
            return;
        }

        _$.noForbName(serviceName);

        //!!!!
        //experiment ----start
        /*
         var definition = function () {
            var result;
            result = fn.apply(this, arguments);
            return result;
        };
        */
        //experiment ----end

        var definition = fn;
        var context = {};
        var serviceItem = function (nextArg) {
            return serviceItem.redefinition(nextArg);
        };

        serviceItem.redefinition = createServiceDefinitionFromSuppliedFn(context, serviceItem, handleNamesOrDefinition, definition, serviceName);

        serviceItem.me = serviceName;
        _$.sysServ[serviceName] = serviceItem;
        //!! reg
        _$.rgi.service[serviceName] = {};

        _$.storeFactory(serviceName);

        return serviceName;
    };

    var eachAsync = function (actors, func, cb) {
        for (var actor in actors) {
            func(actor);
        }
        cb();
    }

    var chainService = function (cb, noChain) {
        chainService.totalChain = chainService.totalChain || 0;

        var chain = {};
        var result = undefined;
        chain.result = function () {
            var res = result;
            result = undefined;
            return res;
        };
        var buildFn = function (actor) {
            chain[actor] = (function (serviceName) {
                return function (arg) {
                    var currentResult;
                    var res = {};

                    res.nextArg = arguments.length ? arg : result;
                    var nextArg = JSON.parse(JSON.stringify(res)).nextArg;

                    result = _$.sysServ[serviceName](nextArg);
                    return noChain ? result : chain;
                };
            })(actor);
        };

        if (cb) {
            //todo use async to speed up things
            eachAsync(_$.sysServ, buildFn, function () {
                cb(chain);
            });
        } else {
            for (var actor in _$.sysServ) {
                buildFn(actor);
            }
        }

        chain.merge = function (arg) {
            var _arg;

            if (result) {
                for (var attr in result) {
                    _arg = _arg || {};
                    _arg[attr] = result[attr];
                }
            }
            if (arg) {
                for (var attr in arg) {
                    _arg = _arg || {};
                    _arg[attr] = arg[attr];
                }
            }
            result = _arg;

            return chain;
        };

        return chain;
    };

    var _light = function (f) {
        chainService(function (cs) {
            typeof f === "function" && f.call(_$.getCurrentContext(_$.__$_SCOPE_NAME, cs), cs);
        });
    };

    _light.startService = function (f) {
        _light(f);
    };

    _light.handle = function (handleName, definition) {
        var handleePrefix = "handle_";
        if ((arguments.length == 0) || (arguments.length > 2)) {
            throw "handle definition error"
            return;
        }

        if (arguments.length == 1) {
            if (typeof handleName !== "function") {
                throw "expects handle to be a function";
                return;
            }
            definition = handleName;
            handleName = _$.genName(handleePrefix);
        }

        if (_$.isRegistered(handleName)) {
            throw " handle '" + handleName + "' already exists ";
            return;
        }

        _$.noForbName(handleName);

        _$.rgi.handle[handleName] = {};

        _$.handles.push({
            name: handleName,
            definition: definition
        });
        _$.storeFactory(handleName);
        return handleName;
    }

    _light.advanced = {
        test: function (setup, f) {
            _$._TEST_OBJECTS_ = setup;
            f.call(_$.getCurrentContext(_$.__$_SCOPE_NAME, chainService), chainService);
            _$._TEST_OBJECTS_ = undefined
        },
        canPlay: function (methodType, dataType) {
            return (methodType === _$.serviceTag) && (dataType === _$.entranceTag);
        },
        playService: function (methodName, data, store) {
            _light(function (serviceChain) {
                return _light.advanced.playServiceChain(serviceChain, methodName, _$.serviceTag, data, _$.entranceTag, store || {}, false).result();
            });
        },
        playServiceChain: function (serviceChain, methodName, methodType, data, dataType, store, notFirstInChain) {
            if (_light.advanced.canPlay(methodType, dataType)) {
                if (!notFirstInChain) {
                    serviceChain = serviceChain[methodName].call(_$.getCurrentContext(methodName, data, store), data);
                } else {
                    serviceChain = serviceChain[methodName]();
                }
            }
            return serviceChain;
        },
        play: function (records, i, j) {
            i = i || 0;
            j = j || (records.length - 1);
            _light(function (serviceChain) {
                for (var m = i; m <= j; m++) {
                    var playGround = records && (records || [])[m] || [];
                    if (!playGround) {
                        throw "no service to play";
                    }
                    serviceChain = _light.advanced.playServiceChain(serviceChain, playGround.methodName, playGround.methodType, playGround.data, playGround.dataType, playGround.store, m !== i);
                }
                var result = serviceChain.result();
            });
        }
    };

    if (typeof Immutable === "undefined") {
        _$.Immutable = {
            List: function (obj) {
                return this.Map(obj);
            },
            Map: function (obj) {
                var name = _$.genName("immu");
                var data = { data: obj }
                _$.ImmutableStore[name] = JSON.stringify(data);
                return {
                    get: function (n) {
                        var out = JSON.parse(_$.ImmutableStore[name]);
                        return out.data[n];
                    },
                    set: function (n, o) {
                        var out = JSON.parse(_$.ImmutableStore[name]);
                        out.data[n] = o;
                        var newData = JSON.parse(JSON.stringify(out)).data;

                        return _$.Immutable.Map(newData);
                    }
                };
            }
        };
    } else {
        _$.Immutable = Immutable;
    }

    _$.copy = function (obj) {
        _$.Immutable.Map({ data: obj }).get('data');
    };

    var init = function () {
        _$.entranceTag = "argument";
        _$.exitTag = "result";
        _$.serviceTag = "service";
        _$.handleTag = "handle";
        _$.eventTag = "event";
        _$.unknownTag = "unknown";

        //SYSTEM EVENTS API
        _$.sysEvName = {
            beforeServiceRun: "beforeServiceRun",
            afterServiceRun: "afterServiceRun",
            beforeHandleRun: "beforeHandleRun",
            afterHandleRun: "afterHandleRun",
            onServiceError: "onServiceError",
            onServiceSuccess: "onServiceSuccess",
            onSystemEvent: "onSystemEvent",
            onSystemRecordEvent: "onSystemRecordEvent"
        };
        // ==SERVICE EVENTS API ==
        _$.serviceEventName = {
            before: "before",
            after: "after",
            error: "error",
            success: "success"
        };

        _$._TEST_OBJECTS_ = {};
        _$.sysServ = {};
        _$.ImmutableStore = {};
        _$.STR = {};
        _$.eventSubscribers = {};
        _$.handles = [];
        _$.__$_SCOPE_NAME = _$.genName();
        _$.storeFactory(_$.__$_SCOPE_NAME);
        _$.DEF_HDLNM = _$.genName();
        /*
           setup like publishSystemEvent(_light, "event", _$.genName("some id"));
           notify like  _light.event.send(e, context, notificationInfo);
           subscribe like light.event(function (e, context,notificationInfo) {}));
        */

        _light.version = "9.1.0";
        _light.service = defineService;
        _light.Immutable = _$.Immutable;
        _light.send = _$.send;
        _light.receive = _$.receive;

        publishSystemEvent(_light, _$.sysEvName.onSystemEvent, _$.genName());
        publishSystemEvent(_light, _$.sysEvName.onSystemRecordEvent, _$.genName());

        publishSystemEvent(_light, _$.sysEvName.beforeServiceRun, _$.genName());
        publishSystemEvent(_light, _$.sysEvName.afterServiceRun, _$.genName());
        publishSystemEvent(_light, _$.sysEvName.beforeHandleRun, _$.genName());
        publishSystemEvent(_light, _$.sysEvName.afterHandleRun, _$.genName());
        publishSystemEvent(_light, _$.sysEvName.onServiceError, _$.genName());
        publishSystemEvent(_light, _$.sysEvName.onServiceSuccess, _$.genName());

        _light.handle(_$.DEF_HDLNM, function (definition) { return definition; });
    };

    init();

    _$.system = {
        startRecording: function () {
            _$.recordServices = true;
        },
        stopRecording: function () {
            _$.recordServices = false;
        },
    };

    /***********************EXTENSIONS*********************************************/
    _light.ServiceDataList = function (dataServiceName, initialData) {
        return _light.service(dataServiceName, function (data) {
            var records = this.store.get("records") || initialData || [];
            if (data) {
                records.push(data);
                this.store.set("records", records);
            }
            return records;
        });
    };
    _light.ServiceDataObject = function (dataServiceName, initialData) {
        return _light.service(dataServiceName, function (data) {
            var record = this.store.get("record");
            if (data) {
                this.store.set("record", data);
                return data;
            } else {
                if (typeof record === "undefined") {
                    record = initialData;
                    this.store.set("record", record);
                }
                return record;
            }
        });
    };
    /********************************************************************/

    return _light;
})() : console.log("light script already exists");

if (typeof module !== "undefined" && ('exports' in module)) {
    module.exports = light;
}

if (typeof define === 'function' && define.amd) {
    define('light', [], function () { return light; });
}