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
    AniJSDefaultHelper.addClass = function(e, animationContext, target, params) {
        AniJSDefaultHelper.makeAction(e, animationContext, target, params, 0);
    };

    /**
     * Remove class to the elements
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-03
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]                   [description]
     */
    AniJSDefaultHelper.removeClass = function(e, animationContext, target, params) {
        AniJSDefaultHelper.makeAction(e, animationContext,  target, params, 1);
    };

    /**
     * Toggle class to the elements
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-03
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]
     */
    AniJSDefaultHelper.toggleClass = function(e, animationContext, target, params) {
        AniJSDefaultHelper.makeAction(e, animationContext,  target, params, 2);
    };

    /**
     * Make toggle, remove or addActions
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-03
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]
     */
    AniJSDefaultHelper.makeAction = function(e, animationContext, target, params, actionID){
        //Current elements that will be animated
        animationContextBehaviorTargetList = animationContext.behaviorTargetList;
        if(actionID === 0){
            animationContext.nodeHelper.addClass(target, params[1]);
        } else if(actionID === 1){
            animationContext.nodeHelper.removeClass(target, params[1]);
        } else{
            if(animationContext.nodeHelper.hasClass(target, params[1])){
               animationContext.nodeHelper.removeClass(target, params[1]);
            }else {
               animationContext.nodeHelper.addClass(target, params[1]);
            }
        }
        //Run the animation
        if(!animationContext.hasRunned){
            animationContext.run();
        }
    };


}(window));
