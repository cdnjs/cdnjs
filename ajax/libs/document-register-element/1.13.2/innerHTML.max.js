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
// see https://github.com/WebReflection/document-register-element/issues/21#issuecomment-102020311
var innerHTML = (function (document) {

  var
    EXTENDS = 'extends',
    register = document.registerElement,
    div = document.createElement('div'),
    dre = 'document-register-element',
    innerHTML = register.innerHTML,
    initialize,
    registered
  ;

  // avoid duplicated wrappers
  if (innerHTML) return innerHTML;

  try {

    // feature detect the problem
    register.call(
      document,
      dre,
      {prototype: Object.create(
        HTMLElement.prototype,
        {createdCallback: {value: Object}}
      )}
    );

    div.innerHTML = '<' + dre + '></' + dre + '>';

    // if natively supported, nothing to do
    if ('createdCallback' in div.querySelector(dre)) {
      // return just an innerHTML wrap
      return (register.innerHTML = function (el, html) {
        el.innerHTML = html;
        return el;
      });
    }

  } catch(meh) {}

  // in other cases
  registered = [];
  initialize = function (el) {
    if (
      'createdCallback' in el         ||
      'attachedCallback' in el        ||
      'detachedCallback' in el        ||
      'attributeChangedCallback' in el
    ) return;
    document.createElement.innerHTMLHelper = true;
    for (var
      parentNode = el.parentNode,
      type = el.getAttribute('is'),
      name = el.nodeName,
      node = document.createElement.apply(
        document,
        type ? [name, type] : [name]
      ),
      attributes = el.attributes,
      i = 0,
      length = attributes.length,
      attr, fc;
      i < length; i++
    ) {
      attr = attributes[i];
      node.setAttribute(attr.name, attr.value);
    }
    while ((fc = el.firstChild)) node.appendChild(fc);
    document.createElement.innerHTMLHelper = false;
    if (parentNode) parentNode.replaceChild(node, el);
    if (node.createdCallback) {
      node.created = true;
      node.createdCallback();
      node.created = false;
    }
  };
  // augment the document.registerElement method
  return ((document.registerElement = function registerElement(type, options) {
    var name = (options[EXTENDS] ?
      (options[EXTENDS] + '[is="' + type + '"]') : type
    ).toLowerCase();
    if (registered.indexOf(name) < 0) registered.push(name);
    return register.apply(document, arguments);
  }).innerHTML = function (el, html) {
    el.innerHTML = html;
    for (var
      nodes = registered.length ? el.querySelectorAll(registered.join(',')) : [],
      i = nodes.length; i--; initialize(nodes[i])
    ) {}
    return el;
  });
}(document));