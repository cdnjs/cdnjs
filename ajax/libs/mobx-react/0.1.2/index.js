(function() {
    function mrFactory(mobservable, React) {
        var reactComponentId = 1;
        var isTracking = false;
        var observeUntilInvalid = mobservable.observeUntilInvalid;

        // WeakMap<Node, Object>;
        var componentByNodeRegistery = typeof WeakMap !== "undefined" ? new WeakMap() : undefined;
        var renderReporter = new mobservable._.SimpleEventEmitter();

        function reportRendering(component) {
            var node = React.findDOMNode(component);
            componentByNodeRegistery.set(node, component);
            renderReporter.emit({
                event: 'render',
                renderTime: component.__renderEnd - component.__renderStart,
                totalTime: Date.now() - component.__renderStart,
                component: component,
                node: node
            });
        }

        var reactiveMixin = {
            componentWillMount: function() {
                var name = (this.displayName || this.constructor.name || "ReactiveComponent") + reactComponentId++;
                var baseRender = this.render;

                this.render = function() {
                    var _self = this;
                    if (isTracking)
                        this.__renderStart = Date.now();

                    if (this.__watchDisposer)
                        this.__watchDisposer();
                    // [rendering, disposer, dnode]
                    var observeOutput = observeUntilInvalid(
                        function() {
                            return baseRender.call(_self);
                        },
                        function() {
                            _self.forceUpdate();
                        },
                        {
                            object: this,
                            name: name
                        }
                    );

                    this.__watchDisposer = observeOutput[1];
                    this.$mobservable = observeOutput[2];
                    if (isTracking)
                        this.__renderEnd = Date.now();
                    return observeOutput[0];
                }
            },

            componentWillUnmount: function() {
                if (this.__watchDisposer)
                    this.__watchDisposer();
                delete this.$mobservable;
                if (isTracking) {
                    var node = React.findDOMNode(this);
                    if (node) {
                        componentByNodeRegistery.delete(node);
                        renderReporter.emit({
                            event: 'destroy',
                            component: this,
                            node: node
                        });
                    }
                }
            },

            componentDidMount: function() {
                if (isTracking)
                    reportRendering(this);
            },

            componentDidUpdate: function() {
                if (isTracking)
                    reportRendering(this);
            },

            shouldComponentUpdate: function(nextProps, nextState) {
                // update on any state changes (as is the default)
                if (this.state !== nextState)
                    return true;
                // update if props are shallowly not equal, inspired by PureRenderMixin
                var keys = Object.keys(this.props);
                var key;
                if (keys.length !== Object.keys(nextProps).length)
                    return true;
                for(var i = keys.length -1; i >= 0, key = keys[i]; i--)
                    if (nextProps[key] !== this.props[key])
                        return true;
                return false;
            }
        }

        function patch(target, funcName) {
            var base = target[funcName];
            var mixinFunc = reactiveMixin[funcName];
            target[funcName] = function() {
                base && base.apply(this, arguments);
                mixinFunc.apply(this, arguments);
            }
        }

        function reactiveComponent(componentClass) {
            if (!componentClass)
                throw new Error("Please pass a valid component to 'reactiveComponent'");
            var target = componentClass.prototype || componentClass;

            [
                "componentWillMount",
                "componentWillUnmount",
                "componentDidMount",
                "componentDidUpdate"
            ].forEach(function(funcName) {
                patch(target, funcName)
            });

            if (!target.shouldComponentUpdate)
                target.shouldComponentUpdate = reactiveMixin.shouldComponentUpdate;
            return componentClass;
        }

        function trackComponents() {
            if (typeof WeakMap === "undefined")
                throw new Error("tracking components is not supported in this browser");
            if (!isTracking)
                isTracking = true;
        }

        return ({
            reactiveComponent: reactiveComponent,
            renderReporter: renderReporter,
            componentByNodeRegistery: componentByNodeRegistery,
            trackComponents: trackComponents
        });
    }

    // UMD
    if (typeof define === 'function' && define.amd) {
        define('mobservable-react', ['mobservable', 'react'], mrFactory);
    }
    else if (typeof exports === 'object')
        module.exports = mrFactory(require('mobservable'), require('react'));
    else
        this.mobservableReact = mrFactory(this['mobservable'], this['React']);
})();
