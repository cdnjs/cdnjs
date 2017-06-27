/*! JointJS v0.8.0 - JavaScript diagramming library  2014-01-22 


This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
if (typeof exports === 'object') {

    var joint = {
        util: require('../src/core').util,
        shapes: {
            basic: require('./joint.shapes.basic')
        },
        dia: {
            Element: require('../src/joint.dia.element').Element,
            Link: require('../src/joint.dia.link').Link
        }
    };
}

joint.shapes.fsa = {};

joint.shapes.fsa.State = joint.shapes.basic.Circle.extend({
    defaults: joint.util.deepSupplement({
        type: 'fsa.State',
        attrs: {
            circle: { 'stroke-width': 3 },
            text: { 'font-weight': 'bold' }
        }
    }, joint.shapes.basic.Circle.prototype.defaults)
});

joint.shapes.fsa.StartState = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><circle/></g></g>',

    defaults: joint.util.deepSupplement({

        type: 'fsa.StartState',
        size: { width: 20, height: 20 },
        attrs: {
            circle: {
                transform: 'translate(10, 10)',
                r: 10,
                fill: 'black'
            }
        }

    }, joint.dia.Element.prototype.defaults)
});

joint.shapes.fsa.EndState = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><circle class="outer"/><circle class="inner"/></g></g>',

    defaults: joint.util.deepSupplement({

        type: 'fsa.EndState',
        size: { width: 20, height: 20 },
        attrs: {
            '.outer': {
                transform: 'translate(10, 10)',
                r: 10,
                fill: '#FFFFFF',
                stroke: 'black'
            },

            '.inner': {
                transform: 'translate(10, 10)',
                r: 6,
                fill: '#000000'
            }
        }

    }, joint.dia.Element.prototype.defaults)
});

joint.shapes.fsa.Arrow = joint.dia.Link.extend({

    defaults: joint.util.deepSupplement({
	type: 'fsa.Arrow',
        attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }},
        smooth: true
    }, joint.dia.Link.prototype.defaults)
});

if (typeof exports === 'object') {

    module.exports = joint.shapes.fsa;
}
