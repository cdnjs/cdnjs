/*
 * jwerty - Awesome handling of keyboard events
 *
 * enderBridge.js
 *
 * jwerty is a JS lib which allows you to bind, fire and assert key combination strings against
 *  elements and events. It normalises the poor std api into something easy to use and clear.
 *
 * This code is licensed under the MIT
 * For more details, see http://www.opensource.org/licenses/mit-license.php
 * For more information, see http://github.com/keithcirkel/jwerty
 *
 * @author Keith Cirkel ('keithamus') <jwerty@keithcirkel.co.uk>
 * @license http://www.opensource.org/licenses/mit-license.php
 * @copyright Copyright © 2011, Keith Cirkel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
(function ($, r) {
    var kk = r('jwerty').jwerty;
    $.ender({
        key: kk.key,
        keyEvent: kk.event,
        isKey: kk.is,
        fireKey: kk.fire
    });
}(ender, require));