/*!
ISC License

Copyright (c) 2014-2018, Andrea Giammarchi, @WebReflection

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.

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
wrapSetter('outerHTML');
wrapSetter('outerText');
wrapSetter('textContent');

wrapMethod('appendChild');
wrapMethod('applyElement');
wrapMethod('insertAdjacentElement');
wrapMethod('insertAdjacentHTML');
wrapMethod('insertAdjacentText');
wrapMethod('insertBefore');
wrapMethod('insertData');
wrapMethod('replaceAdjacentText');
wrapMethod('replaceChild');
wrapMethod('removeChild');

window[HTMLElement] = Element;

}(window, Object, 'HTMLElement'));