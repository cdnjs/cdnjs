/*!
Copyright (C) 2014 by WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function(window, Object, HTMLElement){

if (HTMLElement in window) return;

var
  timer = 0,
  clearTimeout = window.clearTimeout,
  setTimeout = window.setTimeout,
  ElementPrototype = Element.prototype,
  gOPD = Object.getOwnPropertyDescriptor,
  defineProperty = Object.defineProperty,
  notifyChanges = function () {
    document.dispatchEvent(new CustomEvent('readystatechange'));
  },
  scheduleNotification = function (target, name) {
    clearTimeout(timer);
    timer = setTimeout(notifyChanges, 10);
  },
  wrapSetter = function (name) {
    var
      descriptor = gOPD(ElementPrototype, name),
      // why not just overwrite the setter?
      // BECAUSE IE8, THAT'S WHY!
      substitute = {
        configurable: descriptor.configurable,
        enumerable: descriptor.enumerable,
        get: function () {
          return descriptor.get.call(this);
        },
        set: function asd(value) {
          // caveat, this slows down innerHTML
          // "just a tiny bit" ...
          delete ElementPrototype[name];
          // AHHAHAHAHAAHAHAHAAHAHAHHAHAHHAHAHHAHHAHAHHAHHAHAH
          this[name] = value;
          // needed for the next call
          defineProperty(ElementPrototype, name, substitute);
          scheduleNotification(this);
        }
      }
    ;
    defineProperty(ElementPrototype, name, substitute);
  },
  wrapMethod = function (name) {
    var
      descriptor = gOPD(ElementPrototype, name),
      value = descriptor.value
    ;
    descriptor.value = function () {
      var result = value.apply(this, arguments);
      scheduleNotification(this);
      return result;
    };
    defineProperty(
      ElementPrototype,
      name,
      descriptor
    );
  }
;

wrapSetter('innerHTML');
wrapSetter('innerText');
wrapSetter('textContent');
wrapSetter('outerHTML');
wrapSetter('outerText');

wrapMethod('insertAdjacentElement');
wrapMethod('insertAdjacentHTML');
wrapMethod('insertAdjacentText');
wrapMethod('insertBefore');
wrapMethod('insertData');
wrapMethod('replaceChild');
wrapMethod('removeChild');
wrapMethod('appendChild');

window[HTMLElement] = Element;

}(window, Object, 'HTMLElement'));