/*! JointJS v3.7.4 (2023-06-23) - JavaScript diagramming library


This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
this.joint = this.joint || {};
this.joint.shapes = this.joint.shapes || {};
(function (exports, Element_mjs, Link_mjs) {
    'use strict';

    var Entity = Element_mjs.Element.define('erd.Entity', {
        size: { width: 150, height: 60 },
        attrs: {
            '.outer': {
                fill: '#2ECC71', stroke: '#27AE60', 'stroke-width': 2,
                points: '100,0 100,60 0,60 0,0'
            },
            '.inner': {
                fill: '#2ECC71', stroke: '#27AE60', 'stroke-width': 2,
                points: '95,5 95,55 5,55 5,5',
                display: 'none'
            },
            text: {
                text: 'Entity',
                'font-family': 'Arial', 'font-size': 14,
                'ref-x': .5, 'ref-y': .5,
                'y-alignment': 'middle', 'text-anchor': 'middle'
            }
        }
    }, {
        markup: '<g class="rotatable"><g class="scalable"><polygon class="outer"/><polygon class="inner"/></g><text/></g>',
    });

    var WeakEntity = Entity.define('erd.WeakEntity', {
        attrs: {
            '.inner': { display: 'auto' },
            text: { text: 'Weak Entity' }
        }
    });

    var Relationship = Element_mjs.Element.define('erd.Relationship', {
        size: { width: 80, height: 80 },
        attrs: {
            '.outer': {
                fill: '#3498DB', stroke: '#2980B9', 'stroke-width': 2,
                points: '40,0 80,40 40,80 0,40'
            },
            '.inner': {
                fill: '#3498DB', stroke: '#2980B9', 'stroke-width': 2,
                points: '40,5 75,40 40,75 5,40',
                display: 'none'
            },
            text: {
                text: 'Relationship',
                'font-family': 'Arial', 'font-size': 12,
                'ref-x': .5, 'ref-y': .5,
                'y-alignment': 'middle', 'text-anchor': 'middle'
            }
        }
    }, {
        markup: '<g class="rotatable"><g class="scalable"><polygon class="outer"/><polygon class="inner"/></g><text/></g>',
    });

    var IdentifyingRelationship = Relationship.define('erd.IdentifyingRelationship', {
        attrs: {
            '.inner': { display: 'auto' },
            text: { text: 'Identifying' }
        }
    });

    var Attribute = Element_mjs.Element.define('erd.Attribute', {
        size: { width: 100, height: 50 },
        attrs: {
            'ellipse': {
                transform: 'translate(50, 25)'
            },
            '.outer': {
                stroke: '#D35400', 'stroke-width': 2,
                cx: 0, cy: 0, rx: 50, ry: 25,
                fill: '#E67E22'
            },
            '.inner': {
                stroke: '#D35400', 'stroke-width': 2,
                cx: 0, cy: 0, rx: 45, ry: 20,
                fill: '#E67E22', display: 'none'
            },
            text: {
                'font-family': 'Arial', 'font-size': 14,
                'ref-x': .5, 'ref-y': .5,
                'y-alignment': 'middle', 'text-anchor': 'middle'
            }
        }
    }, {
        markup: '<g class="rotatable"><g class="scalable"><ellipse class="outer"/><ellipse class="inner"/></g><text/></g>',
    });

    var Multivalued = Attribute.define('erd.Multivalued', {
        attrs: {
            '.inner': { display: 'block' },
            text: { text: 'multivalued' }
        }
    });

    var Derived = Attribute.define('erd.Derived', {
        attrs: {
            '.outer': { 'stroke-dasharray': '3,5' },
            text: { text: 'derived' }
        }
    });

    var Key = Attribute.define('erd.Key', {
        attrs: {
            ellipse: { 'stroke-width': 4 },
            text: { text: 'key', 'font-weight': '800', 'text-decoration': 'underline' }
        }
    });

    var Normal = Attribute.define('erd.Normal', {
        attrs: { text: { text: 'Normal' }}
    });

    var ISA = Element_mjs.Element.define('erd.ISA', {
        type: 'erd.ISA',
        size: { width: 100, height: 50 },
        attrs: {
            polygon: {
                points: '0,0 50,50 100,0',
                fill: '#F1C40F', stroke: '#F39C12', 'stroke-width': 2
            },
            text: {
                text: 'ISA', 'font-size': 18,
                'ref-x': .5, 'ref-y': .3,
                'y-alignment': 'middle', 'text-anchor': 'middle'
            }
        }
    }, {
        markup: '<g class="rotatable"><g class="scalable"><polygon/></g><text/></g>',
    });

    var Line = Link_mjs.Link.define('erd.Line', {}, {
        cardinality: function(value) {
            this.set('labels', [{ position: -20, attrs: { text: { dy: -8, text: value }}}]);
        }
    });

    exports.Attribute = Attribute;
    exports.Derived = Derived;
    exports.Entity = Entity;
    exports.ISA = ISA;
    exports.IdentifyingRelationship = IdentifyingRelationship;
    exports.Key = Key;
    exports.Line = Line;
    exports.Multivalued = Multivalued;
    exports.Normal = Normal;
    exports.Relationship = Relationship;
    exports.WeakEntity = WeakEntity;

}(this.joint.shapes.erd = this.joint.shapes.erd || {}, joint.dia, joint.dia));
