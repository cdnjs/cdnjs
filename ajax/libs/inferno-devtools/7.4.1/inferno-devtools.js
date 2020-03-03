(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('inferno-extras')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'inferno-extras'], factory) :
    (global = global || self, factory((global.Inferno = global.Inferno || {}, global.Inferno.DevTools = global.Inferno.DevTools || {}), global.Inferno, global.Inferno));
}(this, (function (exports, inferno, infernoExtras) { 'use strict';

    function isNullOrUndef(o) {
        return o === void 0 || o === null;
    }
    function isInvalid(o) {
        return o === null || o === false || o === true || o === void 0;
    }
    function combineFrom(first, second) {
        var out = {};
        if (first) {
            for (var key in first) {
                out[key] = first[key];
            }
        }
        if (second) {
            for (var key$1 in second) {
                out[key$1] = second[key$1];
            }
        }
        return out;
    }

    var updatingDevTool = false;
    var Reconciler;
    var Mount;
    var rootKey = 0;
    var isActive = false;
    function createReactElement(vNode) {
        return {
            key: vNode.key,
            props: vNode.props,
            ref: vNode.ref,
            type: vNode.type
        };
    }
    // Reading offsetParent causes forced re-flow
    function isDetached(child) {
        if (child === null) {
            return true;
        }
        var documentBody = document.body;
        var node = child;
        do {
            node = node.parentNode;
            if (node === null) {
                return true;
            }
        } while (node !== documentBody);
        return false;
    }
    function createReactDOMComponent(vNode, oldDevToolInstance) {
        var flags = vNode.flags;
        if ((flags & 512 /* Void */) > 0) {
            return null;
        }
        var devToolChildren = oldDevToolInstance ? oldDevToolInstance._renderedChildren : null;
        var isTextVNode = (flags & 16 /* Text */) > 0 || (vNode.childFlags & 16 /* HasTextChildren */) !== 0;
        var childFlags = vNode.childFlags;
        var renderedChildren;
        if (childFlags === 1 /* HasInvalidChildren */) {
            renderedChildren = null;
        }
        else if (childFlags & 12 /* MultipleChildren */) {
            renderedChildren = [];
            for (var i = 0; i < vNode.children.length; ++i) {
                renderedChildren.push(updateReactComponent(vNode.children[i], devToolChildren ? devToolChildren[i] : null));
            }
        }
        else if (childFlags === 2 /* HasVNodeChildren */) {
            renderedChildren = [updateReactComponent(vNode.children, devToolChildren ? devToolChildren[0] : devToolChildren)];
        }
        return {
            // --- ReactDOMComponent interface
            _currentElement: (flags & 16 /* Text */) > 0
                ? vNode.children + ''
                : {
                    props: vNode.className ? combineFrom(vNode.props, { className: vNode.className }) : vNode.props,
                    type: flags & 1024 /* Portal */ ? 'InfernoPortal' : vNode.type
                },
            _renderedChildren: renderedChildren,
            _stringText: isTextVNode ? vNode.children + '' : null,
            vNode: vNode
        };
    }
    function updateComponentRoot(lastInput, devToolNode) {
        if ((lastInput.flags & 4 /* ComponentClass */) > 0) {
            checkVNode(lastInput.children ? lastInput.children.$LI : null, devToolNode._renderedComponent, devToolNode);
        }
        else if ((lastInput.flags & 8 /* ComponentFunction */) > 0) {
            checkVNode(lastInput.children, devToolNode._renderedComponent, devToolNode);
        }
        else {
            checkChildVNodes(lastInput.childFlags, lastInput.children, devToolNode);
        }
    }
    function createReactCompositeComponent(vNode, oldDevToolInstance) {
        var flags = vNode.flags;
        var component = (flags & 4 /* ComponentClass */) > 0 ? vNode.children : vNode.type;
        var instance = {
            // --- ReactDOMComponent properties
            _currentElement: createReactElement(vNode),
            _instance: component,
            props: vNode.props,
            state: component && component.state,
            vNode: vNode
        };
        if (!oldDevToolInstance) {
            if (component && component.forceUpdate) {
                var forceInstanceUpdate = component.forceUpdate.bind(component); // Save off for use below.
                component.forceUpdate = instance.forceUpdate = function (callback) {
                    if (!isActive) {
                        return;
                    }
                    instance.props = vNode.props = combineFrom(instance.props, instance._currentElement.props);
                    if (!updatingDevTool && !component.$BR && !component.QU) {
                        updatingDevTool = true;
                        forceInstanceUpdate(callback);
                        updateComponentRoot(component.$LI, instance._renderedComponent);
                        updatingDevTool = false;
                        return;
                    }
                    forceInstanceUpdate(callback);
                };
            }
            if (component && component.setState) {
                var setInstanceState = component.setState.bind(component);
                component.setState = instance.setState = function (newState, callback) {
                    if (!isActive) {
                        return;
                    }
                    if (!updatingDevTool && !component.$BR && !component.QU) {
                        updatingDevTool = true;
                        setInstanceState(newState, callback);
                        updateComponentRoot(component.$LI, instance._renderedComponent);
                        updatingDevTool = false;
                        return;
                    }
                    setInstanceState(newState, callback);
                };
            }
        }
        if ((flags & 14 /* Component */) > 0) {
            var lastVNode = (flags & 4 /* ComponentClass */) > 0 ? (vNode.children ? vNode.children.$LI : null) : vNode.children;
            if (lastVNode) {
                instance._renderedComponent = updateReactComponent(lastVNode, oldDevToolInstance ? oldDevToolInstance._renderedComponent : null);
            }
        }
        return instance;
    }
    function updateReactComponent(vNode, oldDevToolInstance) {
        var newInstance = (vNode.flags & (481 /* Element */ | 16 /* Text */ | 1024 /* Portal */)) > 0
            ? createReactDOMComponent(vNode, oldDevToolInstance)
            : createReactCompositeComponent(vNode, oldDevToolInstance);
        if (oldDevToolInstance) {
            oldDevToolInstance = combineFrom(oldDevToolInstance, newInstance);
            return oldDevToolInstance;
        }
        return newInstance;
    }
    function nextRootKey() {
        return '.' + rootKey++;
    }
    function findRoots(roots) {
        var elements = document.body.querySelectorAll('*');
        for (var i = 0; i < elements.length; ++i) {
            var vNode = elements[i].$V;
            if (vNode && isRootVNode(vNode)) {
                roots[nextRootKey()] = updateReactComponent(vNode);
            }
        }
    }
    function mountDevToolComponentTree(component) {
        if (!component || component._instance === null) {
            return;
        }
        Reconciler.mountComponent(component);
        if (component._renderedComponent) {
            mountDevToolComponentTree(component._renderedComponent);
        }
        else if (component._renderedChildren) {
            for (var i = 0; i < component._renderedChildren.length; ++i) {
                mountDevToolComponentTree(component._renderedChildren[i]);
            }
        }
    }
    function checkChildVNodes(childFlags, children, devToolComponent) {
        var devToolChildren = devToolComponent._renderedChildren;
        var devToolLength = devToolChildren ? devToolChildren.length : 0;
        var i;
        switch (childFlags) {
            case 2 /* HasVNodeChildren */:
                checkVNode(children, devToolChildren ? devToolChildren[0] : null, devToolComponent);
                if (devToolLength > 1) {
                    for (i = 1; i < devToolLength; ++i) {
                        Reconciler.unmountComponent(devToolChildren[i]);
                    }
                }
                break;
            case 16 /* HasTextChildren */:
                devToolComponent._stringText = children + '';
                break;
            case 8 /* HasKeyedChildren */:
            case 4 /* HasNonKeyedChildren */:
                var vNodeLength = children.length;
                var commonLength = vNodeLength > devToolLength ? devToolLength : vNodeLength;
                i = 0;
                for (; i < commonLength; ++i) {
                    checkVNode(children[i], devToolChildren[i], devToolComponent, i);
                }
                if (devToolLength < vNodeLength) {
                    for (i = commonLength; i < vNodeLength; ++i) {
                        var newDevToolChildren = updateReactComponent(children[i]);
                        if (!devToolChildren) {
                            devToolChildren = devToolComponent._renderedChildren = [];
                        }
                        devToolChildren.push(newDevToolChildren);
                        mountDevToolComponentTree(newDevToolChildren);
                    }
                }
                else if (devToolLength > vNodeLength) {
                    for (i = commonLength; i < devToolLength; ++i) {
                        Reconciler.unmountComponent(devToolChildren.pop());
                    }
                }
                break;
            case 1 /* HasInvalidChildren */:
                for (i = 0; i < devToolLength; ++i) {
                    Reconciler.unmountComponent(devToolChildren[i]);
                }
                devToolComponent._renderedChildren = null;
                break;
        }
    }
    function isRootVNode(vNode) {
        if (!(vNode.flags & 16384 /* InUse */)) {
            return false;
        }
        var dom = inferno.findDOMfromVNode(vNode, true);
        if (!dom) {
            return false;
        }
        var parentNode = dom.parentNode;
        if (!parentNode) {
            return false;
        }
        return Boolean(parentNode && parentNode.$V === vNode);
    }
    function checkVNode(vNode, devToolNode, devToolParentNode, index) {
        if (!devToolNode && vNode) {
            mountNewVNode(vNode, devToolParentNode, index);
            return;
        }
        else if (devToolNode && vNode) {
            var vNodeDevTool = devToolNode.vNode;
            if (vNode.type === vNodeDevTool.type && vNode.key === vNodeDevTool.key) {
                if ((vNode.flags & 16 /* Text */) > 0 && devToolNode._stringText) {
                    devToolNode._currentElement = vNode.children + '';
                    devToolNode._stringText = vNode.children + '';
                }
                else if ((vNode.flags & 4 /* ComponentClass */) > 0) {
                    checkVNode(vNode.children ? vNode.children.$LI : null, devToolNode._renderedComponent, devToolNode);
                }
                else if ((vNode.flags & 8 /* ComponentFunction */) > 0) {
                    checkVNode(vNode.children, devToolNode._renderedComponent, devToolNode);
                }
                else {
                    checkChildVNodes(vNode.childFlags, vNode.children, devToolNode);
                }
                devToolNode.vNode = vNode;
                // Dont inform dev tools if component is not yet functional
                if (devToolNode._instance !== null) {
                    Reconciler.receiveComponent(devToolNode);
                }
            }
            else {
                Reconciler.unmountComponent(devToolNode);
                mountNewVNode(vNode, devToolParentNode, index);
            }
        }
        else if (!vNode && devToolNode) {
            if (devToolParentNode._renderedChildren) {
                devToolParentNode._renderedChildren = [];
            }
            else if (devToolParentNode._renderedComponent) {
                devToolParentNode._renderedComponent = null;
            }
            Reconciler.unmountComponent(devToolNode);
        }
    }
    function mountNewVNode(vNode, devToolParentNode, index) {
        var newDevToolComponent = updateReactComponent(vNode);
        // Is component ?
        if (devToolParentNode) {
            if (devToolParentNode._renderedComponent) {
                devToolParentNode._renderedComponent = newDevToolComponent;
            }
            else if (!isNullOrUndef(index)) {
                devToolParentNode._renderedChildren[index] = newDevToolComponent;
            }
            else if (devToolParentNode._renderedChildren) {
                devToolParentNode._renderedChildren.splice(0, devToolParentNode._renderedChildren.length - 1, newDevToolComponent);
            }
            else {
                devToolParentNode._renderedChildren = [newDevToolComponent];
            }
        }
        mountDevToolComponentTree(newDevToolComponent);
    }
    function createDevToolsBridge() {
        var ComponentTree = {
            getNodeFromInstance: function getNodeFromInstance(devToolNode) {
                return infernoExtras.findDOMNode(devToolNode.vNode);
            },
            getClosestInstanceFromNode: function getClosestInstanceFromNode(vNode) {
                while (vNode && !vNode.$V) {
                    vNode = vNode.parentNode;
                }
                return vNode ? updateReactComponent(vNode.$V) : null;
            }
        };
        // Map of root ID (the ID is unimportant) to component instance.
        var roots = Object.create(null);
        // ReactMount-like object
        //
        // Used by devtools to discover the list of root component instances and get
        // notified when new root components are rendered.
        Mount = {
            _instancesByReactRootID: roots,
            _renderNewRootComponent: function _renderNewRootComponent(instance) {
                return instance;
            }
        };
        // ReactReconciler-like object
        Reconciler = {
            mountComponent: function mountComponent(instance) {
                return instance;
            },
            performUpdateIfNecessary: function performUpdateIfNecessary(instance) {
                return instance;
            },
            receiveComponent: function receiveComponent(instance) {
                return instance;
            },
            unmountComponent: function unmountComponent(instance) {
                return instance;
            }
        };
        var oldRenderComplete = inferno.options.renderComplete;
        inferno.options.renderComplete = function (rootInput, parentDOM) {
            if (!isActive) {
                return;
            }
            if (!isInvalid(rootInput)) {
                var root;
                var instance;
                if (parentDOM.$V) {
                    // Check if root exists
                    for (root in roots) {
                        var rootInstance = roots[root];
                        var rootNode = inferno.findDOMfromVNode(rootInstance.vNode, true);
                        if (isDetached(rootNode)) {
                            Reconciler.unmountComponent(rootInstance);
                            delete roots[root];
                            break;
                        }
                        else if (rootNode === infernoExtras.findDOMNode(rootInput)) {
                            checkVNode(rootInput, rootInstance);
                            return;
                        }
                    }
                    instance = updateReactComponent(rootInput);
                    instance._rootNodeID = nextRootKey();
                    roots[instance._rootNodeID] = instance;
                    mountDevToolComponentTree(instance);
                    Mount._renderNewRootComponent(instance);
                }
                else {
                    var dom = infernoExtras.findDOMNode(rootInput);
                    if (isDetached(dom)) {
                        for (root in roots) {
                            var rootInstance$1 = roots[root];
                            if (isDetached(infernoExtras.findDOMNode(rootInstance$1.vNode))) {
                                Reconciler.unmountComponent(rootInstance$1);
                                delete roots[root];
                                return;
                            }
                        }
                    }
                }
                if (oldRenderComplete) {
                    oldRenderComplete(rootInput, parentDOM);
                }
            }
        };
        function _listener(evt) {
            if (evt.source !== window || !evt.data || evt.data.source !== 'react-devtools-content-script' || !evt.data.payload) {
                return;
            }
            var type = evt.data.payload.type;
            if (type === 'resume' || (type === 'callback' && !isActive)) {
                isActive = true;
                findRoots(roots);
            }
            else if (type === 'pause') {
                isActive = false;
                roots = Object.create(null);
            }
        }
        window.addEventListener('message', _listener);
        return {
            ComponentTree: ComponentTree,
            Mount: Mount,
            Reconciler: Reconciler,
            _listener: _listener
        };
    }

    function initDevTools() {
        /* tslint:disable */
        if (typeof window['__REACT_DEVTOOLS_GLOBAL_HOOK__'] === 'undefined') {
            return;
        }
        window['__REACT_DEVTOOLS_GLOBAL_HOOK__'].inject(createDevToolsBridge());
        /* tslint:enable */
    }

    exports.initDevTools = initDevTools;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
