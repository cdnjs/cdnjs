/*!
AniJS - http://anijs.github.io
Licensed under the MIT license

Copyright (c) 2014 Dariel Noel <darielnoel@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * AniJS DOM Helper
 */
(function() {

    //Obtaining  the default helper
    var AniJSDefaultHelper = AniJS.getHelper();


    /**
     * Add class to the elements
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-03
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]
     */
    AniJSDefaultHelper.addClass = function(e, animationContext, params) {
        AniJSDefaultHelper.makeClassAction(e, animationContext, params, 0, e.target);
    };

    /**
     * Remove class to the elements
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-03
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]                   [description]
     */
    AniJSDefaultHelper.removeClass = function(e, animationContext, params) {
        AniJSDefaultHelper.makeClassAction(e, animationContext, params, 1, e.target);
    };

    /**
     * Toggle class to the elements
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-03
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]
     */
    AniJSDefaultHelper.toggleClass = function(e, animationContext, params) {
        AniJSDefaultHelper.makeClassAction(e, animationContext, params, 2, e.target);
    };

    /**
     * Make toggle, remove or addActions
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-03
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]
     */
    AniJSDefaultHelper.makeClassAction = function(e, animationContext, params, actionID, target){
        var animationContextBehaviorTargetList = animationContext.behaviorTargetList;
        for (var i = 0; i < animationContextBehaviorTargetList.length; i++) {
            element = animationContextBehaviorTargetList[i];
            target = element;
            if(actionID === 0){
                animationContext.nodeHelper.addClass(target, params[0]);
            } else if(actionID === 1){
                animationContext.nodeHelper.removeClass(target, params[0]);
            } else{
                if(animationContext.nodeHelper.hasClass(target, params[0])){
                   animationContext.nodeHelper.removeClass(target, params[0]);
                }else {
                   animationContext.nodeHelper.addClass(target, params[0]);
                }
            }
        }
        //Run the animation
        if(!animationContext.hasRunned){
            animationContext.run();
        }
    };

    /**
     * Remove element or elements from html
     * Examples:
     *  Remove current element.
     *   if: click, do: $remove
     *  Remove HTML elements with class name .remove
     *   if: click, do: $remove .remove
     *  Remove HTML element with id remove
     *   if: click, do: $remove #remove
     *  Remove HTML elements with tag name p
     *   if: click, do: $remove p
     *  Remove all HTML elements that contain class name remove or id remove o tag name p
     *   if: click, do: $remove .remove & #remove & p
     *
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-11
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]
     */
    AniJSDefaultHelper.remove = function(e, animationContext, params) {
        var paramsLength = params.length,
            target = e.target,
            elements = null;
        if(paramsLength === 0) {
            wipeOff([target]);
        } else {
            while(paramsLength-- > 0) {
                elements = queryAll(params[paramsLength]) || [];
                wipeOff(elements);
            }
        }
        //Run the animation
        if(!animationContext.hasRunned){
            animationContext.run();
        }
    };

    /**
     * Clone HTML element
     * Examples:
     *  Clone current HTML element and append in same parent.
     *   if: click, do: $clone
     *  Clone current HTML element and append other parent.
     *   if: click, do: $clone, to: #otherParent
     *  Clone HTML element and append other parent.
     *   if: click, do: $clone #clone, to: #otherParent
     *  Clone HTML element and append in same parent.
     *   if: click, do: $clone #clone
     *
     * @author Yolier Galan Tasse <gallegogt@gmail.com>
     * @since  2014-09-11
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]
     */
    AniJSDefaultHelper.clone = function(e, animationContext, params) {
        var paramsLength = params.length,
            target = e.target, // para donde va el elemento
            eventTarget = animationContext.eventTarget, //quien origina el evento
            elements = null,
            fnCloneNode = AniJSDefaultHelper.cloneNodeHelper,
            repeats = 1;

        if(paramsLength === 0 ) {                //$clone
            cloneNode(eventTarget, target, repeats, fnCloneNode);
        } else {
            if(paramsLength == 1) {             //$clone 3, to: #clone
                repeats = parseInt(params[0]) || null;
                if(repeats !== null) {
                    cloneNode(eventTarget, target, repeats, fnCloneNode);
                    //Run the animation
                    if(!animationContext.hasRunned){
                        animationContext.run();
                    }
                    return;
                } else {
                    repeats = 1;
                }
            } else {                            //$clone selectror & 3, to: #clone
                repeats = parseInt(params[1]) || 1;
            }
            elements = queryAll(params[0]);
            var i = 0;
            for (; i < elements.length; i++) {
                cloneNode(elements[i], target, repeats, fnCloneNode);
            }
        }
        //Run the animation
        if(!animationContext.hasRunned){
            animationContext.run();
        }

        AniJS.run();
    };

    /**
     * Parent for element
     * Examples:
     *  Remove li parent
     *   if: click, on: li, do: $remove, to: $parent
     *  Se remueve el parent del li que dispara el evento
     *   if: click, on: li, do: $remove, to: $parent target
     *  Se remueve el parent de todos los elementos de clase .primary
     *   if: click, on: li, do: $remove, to: $parent .primary
     *
     * @author Dariel Noel <darielnoel@gmail.com>
     * @author Yolier Galan Tasse <gallegogt@gmail.com>
     * @since  2014-09-14
     * @param  {object}   e                The event handler
     * @param  {object}   ctx              AniJS Animation Context Object
     * @param  {[string]} params           [description]
     */
    AniJSDefaultHelper.parent = function(e, ctx, params) {
        var parsedInput = parseSelectorFunctionInput(e, ctx, params),
            elements = parsedInput.elements,
            parents = [],
            i = elements.length,
            parentNode;
        while(i-- > 0) {
            parentNode = elements[i].parentNode;
            if(!isContains(parents, parentNode)) {
                parents.push(parentNode);
            }
        }
        return parents;
    };

    /**
     * Parents for element
     * Examples:
     *  Se remueven todos los ancestros del div
     *   if: click, on: li, do: $remove, to: $ancestors
     *  Se remueven todos los ancestros con clase ".red-ancestors" de div
     *   if: click, on: li, do: $remove, to: $ancestors .red-ancestors
     *  Se remueven todos los ancestros con clase ".red-ancestors" de li que dispara el evento
     *   if: click, on: li, do: $remove, to: $ancestors target & .red-ancestors
     *  Se remueven todos los ancestros con clase ".red-ancestors" de los elementos con clase .primary
     *   if: click, on: li, do: $remove, to: $ancestors .primary & .red-ancestors
     *
     * @author Dariel Noel <darielnoel@gmail.com>
     * @author Yolier Galan Tasse <gallegogt@gmail.com>
     * @since  2014-09-14
     * @param  {object}   e                The event handler
     * @param  {object}   ctx              AniJS Animation Context Object
     * @param  {[string]} params           [description]
     */
    AniJSDefaultHelper.ancestors = function(e, ctx, params) {
        var psfi = parseSelectorFunctionInput(e, ctx, params),
            elements = psfi.elements,
            selector = psfi.selector,
            ancs = [], currentAncs = [], i = 0, j = 0;
        i = elements.length;
        while(i-- > 0) {
            // TODO: Este mecanismo debe ser optimizado ya que no sea necesario tener
            // todos los ancestros para entonces hacer las comparaciones
            currentAncs = ancestor(elements[i].parentNode, selector);
            j = currentAncs.length;
            //para cada ancestro si no esta contenido entonces se pone en la lista
            while(j-- > 0) {
                if(!isContains(ancs, currentAncs[j])) {
                    ancs.push(currentAncs[j]);
                }
            }
        }
        return ancs;
    };

    /**
     * Closets
     * Examples:
     *   Remueve el ancestro mas cercano del div
     *   if: click, on: li, do: $remove, to: $closest
     *   Remueve el ancestro mas cercano del li
     *   if: click, on: li, do: $remove, to: $closest target
     *   Remueve el ancestro mas cercano de div con clase .primary
     *   if: click, on: li, do: $remove, to: $closest .primary
     *
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-14
     * @param  {object}   e                The event handler
     * @param  {object}   ctx              AniJS Animation Context Object
     * @param  {[string]} params           [description]
     */
    AniJSDefaultHelper.closest = function(e, ctx, params) {
        var parsedInput = parseSelectorFunctionInput(e, ctx, params),
            elements = parsedInput.elements,
            selector = parsedInput.selector,
            i = elements.length,
            closestList = [],
            closestNode;
        while(i-- > 0) {
            closestNode = closest(elements[i].parentNode, selector);
            if(closestNode && !isContains(closestList, closestNode)) {
                closestList.push(closestNode);
            }
        }
        return closestList;
    };

    /**
     * Find
     * Examples:
     *
     *  Elimina todos los elemntos hijos del elemento actual
     *   if: click, on: li, do: $find, to: $find
     *  Elimina todos los elemntos hijos del elemento li
     *   if: click, on: li, do: $find, to: $find target
     *  Elimina todos los elemntos hijos del elemento actual que contengan la clase css .primary
     *   if: click, on: li, do: $find, to: $find .primary
     *
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-14
     * @param  {object}   e                The event handler
     * @param  {object}   ctx              AniJS Animation Context Object
     * @param  {[string]} params           [description]
     */
    AniJSDefaultHelper.find = function(e, ctx, params) {
        var parsedInput = parseSelectorFunctionInput(e, ctx, params),
            elements = parsedInput.elements,
            selector = parsedInput.selector,
            i = elements.length,
            foundedList = [];
        while(i-- > 0) {
            tempFoundedNodeList = findNodes(elements[i], selector);
            foundedList = mergeArray(tempFoundedNodeList, foundedList);
        }
        return foundedList;
    };
    /**
     * Children
     * Examples:
     *
     *   if: click, on: li, do: $remove, to: $children
     *
     *   if: click, on: li, do: $remove, to: $children target & h1
     *
     *   if: click, on: li, do: $remove, to: $children .primary
     *
     * @author Dariel Noel <darielnoel@gmail.com>
     * @author Yolier Galan Tasse <gallegogt@gmail.com>
     * @since  2014-09-14
     * @param  {object}   e                The event handler
     * @param  {object}   ctx              AniJS Animation Context Object
     * @param  {[string]} params           [description]
     */
    AniJSDefaultHelper.children = function(e, ctx, params) {
        var parsedInput = parseSelectorFunctionInput(e, ctx, params),
            elements = parsedInput.elements,
            selector = parsedInput.selector,
            i = elements.length, j = 0,
            foundedList = [], tmpItems = null;

        while(i-- > 0) {
            tmpItems = elements[i].children;
            for (; j < tmpItems.length; j++) {
                if(matchesSelector(tmpItems[j], selector)) {
                    mergeArray([ tmpItems[j] ], foundedList);
                }
            }
        }
        return foundedList;
    };

    /**
     * Clone HTML element
     * @method removeChild
     * @param {} element
     * @param {} parentNode
     */
    AniJSDefaultHelper.cloneNodeHelper = function(element, parentNode) {
        if(parentNode === null) return;
        var clone = element.cloneNode(true);
        AniJS.purgeEventTarget(clone);
        clone.removeAttribute("id");
        parentNode.appendChild(clone);
    };



    //-----------------------------------------------------------
    //           AUXILIARY FUCTIONS
    //-----------------------------------------------------------

    function matchesSelector(elem, selector) {
        var ms = elem.matches ||
                  elem.webkitMatchesSelector ||
                  elem.mozMatchesSelector ||
                  elem.msMatchesSelector;
        return ms.call(elem, selector);
    }

    /**
     * Return all nodes that match witch selector
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-14
     * @return {[type]}   [description]
     */
    function queryAll(selector){
        return document.querySelectorAll(selector);
    }

    /**
     * Function for erease elements form html
     * @author Yolier Galan Tasse <gallegogt@gmail.com>
     * @since  2014-09-14
     */
    function wipeOff(elements) {
        var i = elements.length;
        while (i-- > 0) {
            AniJS.EventSystem.purgeAllNodes(elements[i]);
            elements[i].parentNode.removeChild(elements[i]);
        }
    }

    /**
     * Return all nodes that match witch selector
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-14
     * @return {[type]}   [description]
     */
    function isContains(array, el) {
        var found = false;
        for (var i = 0; i < array.length && !found; i++) {
            found = (array[i] === el);
        }
        return found;
    }

    /**
     * Function to clone element
     * @author Yolier Galan Tasse <gallegogt@gmail.com>
     * @since  2014-09-14
     */
    function cloneNode(el, parent, repeats, fnCloneNode) {
        var i = 0;
        while(repeats > i++) {
            if(parent === el) {                             //Whitout to
                fnCloneNode(parent, parent.parentNode);
            } else {                                        //With to
                fnCloneNode(el, parent);
            }
        }
    }

    //http://stackoverflow.com/questions/15329167/closest-ancestor-matching-selector-using-native-dom
    //by Paul Irish
    function closest(elem, selector) {
        var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
        while (elem) {
            if (matchesSelector.call(elem, selector)) {
                return elem;
            } else {
                elem = elem.parentElement;
            }
        }
        return false;
    }

    /**
     * Ancestor
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-14
     * @return {[type]}   [description]
     */
    function ancestor(elem, selector) {
        var ancestorList = [];
        if(selector === null) { selector = '*'; }
        while (elem && elem.tagName !== 'html') {
            if (matchesSelector(elem, selector)) {
                ancestorList.push(elem);
            }
            elem = elem.parentElement;
        }
        return ancestorList;
    }
    /**
     * Parse selector function input
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-14
     * @return {[type]}   [description]
     */
    function parseSelectorFunctionInput(e, ctx, params) {
        var elements = [],
            selector = '*';

        if(params.length === 0) {
            elements = [ctx.dataAniJSOwner];
        }
        else {
            elements = ( params[0] === 'target' ) ? [e.currentTarget] : queryAll(params[0]);
        }
        if(params.length > 1) {
            selector = params[1];
        }

        return { elements: elements,  selector: selector };
    }
    /**
     * Find nodes
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-14
     * @return {[type]}   [description]
     */
    function findNodes(root, selector){
        return root.querySelectorAll(selector);
    }
    /**
     * Merge array
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-14
     * @return {[type]}   [description]
     */
    function mergeArray(from, receiver){
        var j = from.length,
            tempItem;
        while(j-- > 0) {
            tempItem = from[j];
            if(tempItem && !isContains(receiver, tempItem)) {
                receiver.push(tempItem);
            }
        }
        return receiver;
    }
}(window));
