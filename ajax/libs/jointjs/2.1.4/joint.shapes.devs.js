/*! JointJS v2.1.4 (2018-08-01) - JavaScript diagramming library


This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
/**
 * @deprecated use the port api insteac
 */
joint.shapes.basic.Generic.define('devs.Model', {
    inPorts: [],
    outPorts: [],
    size: {
        width: 80,
        height: 80
    },
    attrs: {
        '.': {
            magnet: false
        },
        '.label': {
            text: 'Model',
            'ref-x': .5,
            'ref-y': 10,
            'font-size': 18,
            'text-anchor': 'middle',
            fill: '#000'
        },
        '.body': {
            'ref-width': '100%',
            'ref-height': '100%',
            stroke: '#000'
        }
    },
    ports: {
        groups: {
            'in': {
                position: {
                    name: 'left'
                },
                attrs: {
                    '.port-label': {
                        fill: '#000'
                    },
                    '.port-body': {
                        fill: '#fff',
                        stroke: '#000',
                        r: 10,
                        magnet: true
                    }
                },
                label: {
                    position: {
                        name: 'left',
                        args: {
                            y: 10
                        }
                    }
                }
            },
            'out': {
                position: {
                    name: 'right'
                },
                attrs: {
                    '.port-label': {
                        fill: '#000'
                    },
                    '.port-body': {
                        fill: '#fff',
                        stroke: '#000',
                        r: 10,
                        magnet: true
                    }
                },
                label: {
                    position: {
                        name: 'right',
                        args: {
                            y: 10
                        }
                    }
                }
            }
        }
    }
}, {
    markup: '<g class="rotatable"><rect class="body"/><text class="label"/></g>',
    portMarkup: '<circle class="port-body"/>',
    portLabelMarkup: '<text class="port-label"/>',

    initialize: function() {

        joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);

        this.on('change:inPorts change:outPorts', this.updatePortItems, this);
        this.updatePortItems();
    },

    updatePortItems: function(model, changed, opt) {

        // Make sure all ports are unique.
        var inPorts = joint.util.uniq(this.get('inPorts'));
        var outPorts = joint.util.difference(joint.util.uniq(this.get('outPorts')), inPorts);

        var inPortItems = this.createPortItems('in', inPorts);
        var outPortItems = this.createPortItems('out', outPorts);

        this.prop('ports/items', inPortItems.concat(outPortItems), joint.util.assign({ rewrite: true }, opt));
    },

    createPortItem: function(group, port) {

        return {
            id: port,
            group: group,
            attrs: {
                '.port-label': {
                    text: port
                }
            }
        };
    },

    createPortItems: function(group, ports) {

        return joint.util.toArray(ports).map(this.createPortItem.bind(this, group));
    },

    _addGroupPort: function(port, group, opt) {

        var ports = this.get(group);
        return this.set(group, Array.isArray(ports) ? ports.concat(port) : [port], opt);
    },

    addOutPort: function(port, opt) {

        return this._addGroupPort(port, 'outPorts', opt);
    },

    addInPort: function(port, opt) {

        return this._addGroupPort(port, 'inPorts', opt);
    },

    _removeGroupPort: function(port, group, opt) {

        return this.set(group, joint.util.without(this.get(group), port), opt);
    },

    removeOutPort: function(port, opt) {

        return this._removeGroupPort(port, 'outPorts', opt);
    },

    removeInPort: function(port, opt) {

        return this._removeGroupPort(port, 'inPorts', opt);
    },

    _changeGroup: function(group, properties, opt) {

        return this.prop('ports/groups/' + group, joint.util.isObject(properties) ? properties : {}, opt);
    },

    changeInGroup: function(properties, opt) {

        return this._changeGroup('in', properties, opt);
    },

    changeOutGroup: function(properties, opt) {

        return this._changeGroup('out', properties, opt);
    }
});

joint.shapes.devs.Model.define('devs.Atomic', {
    size: {
        width: 80,
        height: 80
    },
    attrs: {
        '.label': {
            text: 'Atomic'
        }
    }
});

joint.shapes.devs.Model.define('devs.Coupled', {
    size: {
        width: 200,
        height: 300
    },
    attrs: {
        '.label': {
            text: 'Coupled'
        }
    }
});

joint.dia.Link.define('devs.Link', {
    attrs: {
        '.connection': {
            'stroke-width': 2
        }
    }
});
