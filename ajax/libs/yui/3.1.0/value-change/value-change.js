YUI.add('value-change', function(Y) {


/**
 * <p>Event that fires when a text or input field has changed value as a result of a keystroke.
 * Attaches a timed-out listener on the keydown event, and keeps the value to provide support
 * for multi-keystroke character sets.</p>
 * <p>This event fires when the value of the element changes, either as a result of
 * a keystroke, or an IME input event.</p>
 * <p>This does not replace the DOM onchange event, but rather augments it to do onchange-like
 * logic as a result of key presses, even in multi-stroke character sets.</p>
 *
 * <p>Known issue: If attaching to elements that are not yet available, then only the first 
 * node will be guaranteed to have the event handler attached.</p>
 *
 * @event valueChange
 * @for YUI
 * @param type {String} 'valueChange'
 * @param fn {Function} the callback function
 * @param el {String|Node|etc} the element(s) to bind
 * @param o {Object} optional context object
 * @param args 0..n additional arguments that should be provided 
 * to the listener.
 * @return {Event.Handle} the detach handle
 **/

function toNodeList (el) { return (
    (Y.Lang.isString(el) || Y.Lang.isArray(el))
        ? Y.all(el)
    : (el instanceof Y.Node)
        ? Y.all([el._node])
    : (el instanceof Y.NodeList)
        ? el
    : Y.all([el])
)};

function onAvail (el, args) {
    var h = Y.on("available", function () {
        h.handle = Y.on.apply(Y, args);
    }, el);
    return h;
};

function attachProxy (node, args) {
    // args = [type, fn, el, o, ...]
    // node.on(type, fn, o, ...);
    args[0] = ceName(node);
    args.splice(2,1);
    
    // if event-custom is loaded, then this is gonna do something.
    // otherwise, it's basically just a no-op.
    node.publish(args[0], {
        broadcast : true,
        emitFacade : true
    });

    var registry = attachTriggers(node),
        proxyHandle = node.on.apply(node, args);
    
    return proxyHandle;
};

function ceName (node) {
    return Y.stamp(node) + "-" + eventName;
};

function attachDomEventHandlers (handlers, node) {
    var handles = {};
    for (var i in handlers) {
        handles[i] = handleDom(i, handlers[i], node);
    }
    return handles;
};

// attach the dom events that will trigger the CE
function attachTriggers (node) {
    var key = ceName(node);
    var reg = registry[ key ] = registry[ key ] || {
        count : 0,
        handles : attachDomEventHandlers(domEventHandlers, node)
    };
    reg.count++;
    return reg;
};

function handleDom (event, handler, node) {
    var handle = Y.on(event, handler, node);
    Y.after(Y.bind(afterDetach, null, node, true), handle, "detach");
    return handle;
};

// call this after detaching a CE handler
function afterDetach (node, force) {
    var reg = registry[ ceName(node) ];
    if (!reg) return;
    reg.count --;
    if (force) reg.count = 0;
    if (reg.count <= 0) {
        delete registry[ ceName(node) ];
        for (var i in reg.handles) reg.handles[i].detach();
    }
};

var registry = {},
    event = {
        on : function (type, fn, el, o) {
            var args = Y.Array(arguments, 0, true),
                nodeList = toNodeList(el);
            if (nodeList.size() === 0) return onAvail(el, args);
            
            args[3] = o = o || ((nodeList.size() === 1) ? nodeList.item(0) : nodeList);
            
            var handles = [];
            nodeList.each(function (node) {
                var proxyHandle = attachProxy(node, args);
                handles.push(proxyHandle);
                // hook into the detach event to remove it from that node.
                Y.after(Y.bind(afterDetach, null, node), proxyHandle, "detach");
            });
            // return a handle
            return { evt:handles, sub:nodeList, detach:function () {
                Y.Array.each(handles, function (h) { h.detach() });
            }};
        }
    },
    
    
    // IMPLEMENTATION SPECIFIC
    eventName = "valueChange",
    domEventHandlers = (function () {
        var valueHistory = {}, intervals = {}, timeouts = {};
        
        function startPolling (node, e) {
            var key = ceName(node);
            // avoid duplicates
            stopPolling(node);
            intervals[key] = setInterval(Y.bind(poller, null, node, e), 50);
            timeouts[key] = setTimeout(Y.bind(stopPolling, null, node), 10000);
        };
        function stopPolling (node) {
            var key = ceName(node);
            clearTimeout(timeouts[key]);
            clearInterval(intervals[key]);
        };
        function poller (node, e) {
            var key = ceName(node);
            var value = node.get("value");
            if (value === valueHistory[key]) return;
            node.fire(key, {
                type : eventName,
                value : value,
                oldValue : valueHistory[key],
                _event : e,
                target : node,
                currentTarget : node
            });
            
            valueHistory[key] = node.get("value");
            startPolling(node, e);
            
        };
        
        function keyUpHandler (e) {
            // indications that an IME has started.
            // poll for 10 seconds.
            if (e.charCode === 229 || e.charCode === 197) startPolling(
                e.currentTarget, e
            );
        };
        function blurHandler (e) {
            stopPolling(e.currentTarget);
        };
        function keyDownHandler (e) {
            startPolling(e.currentTarget, e);
        };
        
        return {
            keyup : keyUpHandler,
            blur : blurHandler,
            keydown : keyDownHandler
        };
    })();
    // /IMPLEMENTATION SPECIFIC
    


Y.Env.evt.plugins[eventName] = event;
if (Y.Node) Y.Node.DOM_EVENTS[eventName] = event;


}, '@VERSION@' ,{optional:['event-custom'], requires:['node-base', 'event-focus']});
