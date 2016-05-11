/**
 * PhysicsJS v0.6.0 - 2014-04-22
 * A modular, extendable, and easy-to-use physics engine for javascript
 * http://wellcaffeinated.net/PhysicsJS
 *
 * Copyright (c) 2014 Jasper Palfree <jasper@wellcaffeinated.net>
 * Licensed MIT
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['physicsjs'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory.apply(root, ['physicsjs'].map(require));
    } else {
        factory.call(root, root.Physics);
    }
}(this, function (Physics) {
    'use strict';
    /**
     * class DomRenderer < Renderer
     *
     * Physics.renderer('dom')
     *
     * Renderer that manipulates DOM elements according to the physics simulation. Very primative...
     **/
    Physics.renderer('dom', function( proto ){
    
        if ( !document ){
            // must be in node environment
            return {};
        }
    
        // utility methods
        var thePrefix = {}
            ,tmpdiv = document.createElement("div")
            ,toTitleCase = function toTitleCase(str) {
                return str.replace(/(?:^|\s)\w/g, function(match) {
                    return match.toUpperCase();
                });
            }
            // return the prefixed name for the specified css property
            ,pfx = function pfx(prop) {
    
                if (thePrefix[prop]){
                    return thePrefix[prop];
                }
    
                var arrayOfPrefixes = ['Webkit', 'Moz', 'Ms', 'O']
                    ,name
                    ;
    
                for (var i = 0, l = arrayOfPrefixes.length; i < l; ++i) {
    
                    name = arrayOfPrefixes[i] + toTitleCase(prop);
    
                    if (name in tmpdiv.style){
                        return thePrefix[prop] = name;
                    }
                }
    
                if (name in tmpdiv.style){
                    return thePrefix[prop] = prop;
                }
    
                return false;
            }
            ;
    
        var classpfx = 'pjs-'
            ,px = 'px'
            ,cssTransform = pfx('transform')
            ;
    
        var newEl = function( node, content ){
                var el = document.createElement(node || 'div');
                if (content){
                    el.innerHTML = content;
                }
                return el;
            }
            ,drawBody
            ;
    
        return {
    
            // extended
            init: function( options ){
    
                // call proto init
                proto.init.call(this, options);
    
                var viewport = this.el;
                viewport.style.position = 'relative';
                viewport.style.overflow = 'hidden';
                viewport.style[cssTransform] = 'translateZ(0)'; // force GPU accel
                viewport.style.width = this.options.width + px;
                viewport.style.height = this.options.height + px;
    
                this.els = {};
    
                if (options.meta){
                    var stats = newEl();
                    stats.className = 'pjs-meta';
                    this.els.fps = newEl('span');
                    this.els.ipf = newEl('span');
                    stats.appendChild(newEl('span', 'fps: '));
                    stats.appendChild(this.els.fps);
                    stats.appendChild(newEl('br'));
                    stats.appendChild(newEl('span', 'ipf: '));
                    stats.appendChild(this.els.ipf);
    
                    viewport.appendChild(stats);
                }
            },
    
            /** internal
             * DomRenderer#circleProperties( el, geometry )
             * - el (HTMLElement): The element
             * - geometry (Geometry): The body's geometry
             *
             * Set dom element style properties for a circle.
             **/
            circleProperties: function( el, geometry ){
    
                var aabb = geometry.aabb();
    
                el.style.width = (aabb.hw * 2) + px;
                el.style.height = (aabb.hh * 2) + px;
                el.style.marginLeft = (-aabb.hw) + px;
                el.style.marginTop = (-aabb.hh) + px;
            },
    
            /** internal
             * DomRenderer#rectangleProperties( el, geometry )
             * - el (HTMLElement): The element
             * - geometry (Geometry): The body's geometry
             *
             * Set dom element style properties for a rectangle.
             **/
            rectangleProperties: function( el, geometry ){
    
                var aabb = geometry.aabb();
    
                el.style.width = (aabb.hw * 2) + px;
                el.style.height = (aabb.hh * 2) + px;
                el.style.marginLeft = (-aabb.hw) + px;
                el.style.marginTop = (-aabb.hh) + px;
            },
    
            // extended
            createView: function( geometry ){
    
                var el = newEl()
                    ,fn = geometry.name + 'Properties'
                    ;
    
                el.className = classpfx + geometry.name;
                el.style.position = 'absolute';
                el.style.top = '0px';
                el.style.left = '0px';
    
                if (this[ fn ]){
                    this[ fn ](el, geometry);
                }
    
                this.el.appendChild( el );
                return el;
            },
    
            // extended
            connect: function( world ){
    
                world.on( 'add:body', this.attach, this );
                world.on( 'remove:body', this.detach, this );
            },
    
            // extended
            disconnect: function( world ){
    
                world.off( 'add:body', this.attach );
                world.off( 'remove:body', this.detach );
            },
    
            /**
             * DomRenderer#detach( data ) -> this
             * - data (HTMLElement|Object): DOM node or event data (`data.body`)
             *
             * Event callback to detach a node from the DOM
             **/
            detach: function( data ){
    
                // interpred data as either dom node or event data
                var el = (data.nodeType && data) || (data.body && data.body.view)
                    ,par = el && el.parentNode
                    ;
    
                if ( el && par ){
                    // remove view from dom
                    par.removeChild( el );
                }
    
                return this;
            },
    
            /**
             * DomRenderer#attach( data ) -> this
             * - data (HTMLElement|Object): DOM node or event data (`data.body`)
             *
             * Event callback to attach a node to the viewport
             **/
            attach: function( data ){
    
                // interpred data as either dom node or event data
                var el = (data.nodeType && data) || (data.body && data.body.view)
                    ;
    
                if ( el ){
                    // attach to viewport
                    this.el.appendChild( el );
                }
    
                return this;
            },
    
            // extended
            drawMeta: function( meta ){
    
                this.els.fps.innerHTML = meta.fps.toFixed(2);
                this.els.ipf.innerHTML = meta.ipf;
            },
    
            // extended
            drawBody: function( body, view ){
    
                var pos = body.state.pos
                    ,v = body.state.vel
                    ,x
                    ,y
                    ,ang
                    ,t = this._interpolateTime
                    ;
    
                // interpolate positions
                x = pos.x + v.x * t;
                y = pos.y + v.y * t;
                ang = body.state.angular.pos + body.state.angular.vel * t;
                view.style[cssTransform] = 'translate('+x+'px,'+y+'px) rotate('+ ang +'rad)';
            }
        };
    });
    
    // end module: renderers/dom.js
    return Physics;
}));// UMD