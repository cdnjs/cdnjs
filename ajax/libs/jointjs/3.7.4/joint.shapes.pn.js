/*! JointJS v3.7.4 (2023-06-23) - JavaScript diagramming library


This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
this.joint = this.joint || {};
this.joint.shapes = this.joint.shapes || {};
(function (exports, basic_mjs, ElementView_mjs, V, Link_mjs) {
    'use strict';

    V = V && V.hasOwnProperty('default') ? V['default'] : V;

    var Place = basic_mjs.Generic.define('pn.Place', {
        size: { width: 50, height: 50 },
        attrs: {
            '.root': {
                r: 25,
                fill: '#ffffff',
                stroke: '#000000',
                transform: 'translate(25, 25)'
            },
            '.label': {
                'text-anchor': 'middle',
                'ref-x': .5,
                'ref-y': -20,
                ref: '.root',
                fill: '#000000',
                'font-size': 12
            },
            '.tokens > circle': {
                fill: '#000000',
                r: 5
            },
            '.tokens.one > circle': { transform: 'translate(25, 25)' },

            '.tokens.two > circle:nth-child(1)': { transform: 'translate(19, 25)' },
            '.tokens.two > circle:nth-child(2)': { transform: 'translate(31, 25)' },

            '.tokens.three > circle:nth-child(1)': { transform: 'translate(18, 29)' },
            '.tokens.three > circle:nth-child(2)': { transform: 'translate(25, 19)' },
            '.tokens.three > circle:nth-child(3)': { transform: 'translate(32, 29)' },

            '.tokens.alot > text': {
                transform: 'translate(25, 18)',
                'text-anchor': 'middle',
                fill: '#000000'
            }
        }
    }, {
        markup: '<g class="rotatable"><g class="scalable"><circle class="root"/><g class="tokens" /></g><text class="label"/></g>',
    });

    var PlaceView = ElementView_mjs.ElementView.extend({

        presentationAttributes: ElementView_mjs.ElementView.addPresentationAttributes({
            tokens: ['TOKENS']
        }),

        initFlag: ElementView_mjs.ElementView.prototype.initFlag.concat(['TOKENS']),

        confirmUpdate: function() {
            var ref;

            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];
            var flags = (ref = ElementView_mjs.ElementView.prototype.confirmUpdate).call.apply(ref, [ this ].concat( args ));
            if (this.hasFlag(flags, 'TOKENS')) {
                this.renderTokens();
                this.update();
                flags = this.removeFlag(flags, 'TOKENS');
            }
            return flags;
        },

        renderTokens: function() {

            var vTokens = this.vel.findOne('.tokens').empty();
            ['one', 'two', 'three', 'alot'].forEach(function(className) {
                vTokens.removeClass(className);
            });

            var tokens = this.model.get('tokens');
            if (!tokens) { return; }

            switch (tokens) {

                case 1:
                    vTokens.addClass('one');
                    vTokens.append(V('circle'));
                    break;

                case 2:
                    vTokens.addClass('two');
                    vTokens.append([V('circle'), V('circle')]);
                    break;

                case 3:
                    vTokens.addClass('three');
                    vTokens.append([V('circle'), V('circle'), V('circle')]);
                    break;

                default:
                    vTokens.addClass('alot');
                    vTokens.append(V('text').text(tokens + ''));
                    break;
            }
        }
    });

    var Transition = basic_mjs.Generic.define('pn.Transition', {
        size: { width: 12, height: 50 },
        attrs: {
            'rect': {
                width: 12,
                height: 50,
                fill: '#000000',
                stroke: '#000000'
            },
            '.label': {
                'text-anchor': 'middle',
                'ref-x': .5,
                'ref-y': -20,
                ref: 'rect',
                fill: '#000000',
                'font-size': 12
            }
        }
    }, {
        markup: '<g class="rotatable"><g class="scalable"><rect class="root"/></g></g><text class="label"/>',
    });

    var Link = Link_mjs.Link.define('pn.Link', {
        attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }}
    });

    exports.Link = Link;
    exports.Place = Place;
    exports.PlaceView = PlaceView;
    exports.Transition = Transition;

}(this.joint.shapes.pn = this.joint.shapes.pn || {}, joint.shapes.basic, joint.dia, V, joint.dia));
