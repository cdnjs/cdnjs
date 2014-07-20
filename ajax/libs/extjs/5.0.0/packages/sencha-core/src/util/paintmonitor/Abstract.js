/**
 * @private
 */
Ext.define('Ext.util.paintmonitor.Abstract', {

    config: {
        element: null,

        callback: Ext.emptyFn,

        scope: null,

        args: []
    },

    eventName: '',

    monitorClass: '',

    constructor: function(config) {
        this.onElementPainted = Ext.Function.bind(this.onElementPainted, this);

        this.initConfig(config);
    },

    bindListeners: function(bind) {
        this.monitorElement[bind ? 'addEventListener' : 'removeEventListener'](this.eventName, this.onElementPainted, true);
    },

    applyElement: function(element) {
        if (element) {
            return Ext.get(element);
        }
    },

    updateElement: function(element) {
        this.monitorElement = Ext.Element.create({
            classList: ['x-paint-monitor', this.monitorClass]
        }, true);

        element.appendChild(this.monitorElement);
        element.addCls('x-paint-monitored');
        this.bindListeners(true);
    },

    onElementPainted: function() {},

    destroy: function() {
        var monitorElement = this.monitorElement,
            parentNode = monitorElement.parentNode,
            element = this.getElement();

        this.bindListeners(false);
        delete this.monitorElement;

        if (element && !element.isDestroyed) {
            element.removeCls('x-paint-monitored');
            delete this._element;
        }

        if (parentNode) {
            parentNode.removeChild(monitorElement);
        }

        this.callSuper();
    }
});
