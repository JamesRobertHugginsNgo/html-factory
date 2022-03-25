"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var HtmlFactory = function () {
  function toFragment(children, callback) {
    if (!(children != null)) {
      throw 'Invalid Argument. Argument "children" must not be undefined nor null.';
    }

    if (!(callback == null || typeof callback === 'function')) {
      throw 'Invalid Argument. Argument "callback" must be undefined, null or a function.';
    }

    var element = document.createDocumentFragment();

    if (!Array.isArray(children)) {
      children = [children];
    }

    for (var index = 0, length = children.length; index < length; index++) {
      var child = children[index];

      if (child == null) {
        continue;
      }

      if (!(child instanceof Node)) {
        var textNode = document.createTextNode(children[index]);
        element.appendChild(textNode);
        continue;
      }

      element.appendChild(children[index]);
    }

    if (callback) {
      callback(element);
    }

    return element;
  }

  function toElementNs(namespace, name, attributes, children, callback) {
    if (!(typeof namespace === 'string')) {
      throw 'Invalid Argument. Argument "namespace" must be an Element.';
    }

    if (!(typeof name === 'string')) {
      throw 'Invalid Argument. Argument "element" must be an Element.';
    }

    if (!(attributes == null || _typeof(attributes) === 'object')) {
      throw 'Invalid Argument. Argument "attributes" must be undefined, null or an object.';
    }

    if (!(callback == null || typeof callback === 'function')) {
      throw 'Invalid Argument. Argument "callback" must be undefined, null or a function.';
    }

    var element = document.createElementNS(namespace, name);

    if (attributes) {
      for (var key in attributes) {
        var value = attributes[key];

        if (value == null) {
          continue;
        }

        element.setAttribute(key, value);
      }
    }

    if (children) {
      element.appendChild(toFragment(children));
    }

    if (callback) {
      callback(element);
    }

    return element;
  }

  function toElement() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
    var attributes = arguments.length > 1 ? arguments[1] : undefined;
    var children = arguments.length > 2 ? arguments[2] : undefined;
    var callback = arguments.length > 3 ? arguments[3] : undefined;
    return toElementNs('http://www.w3.org/1999/xhtml', name, attributes, children, callback);
  }

  return {
    toFragment: toFragment,
    toElementNs: toElementNs,
    toElement: toElement
  };
}();
/* exported HtmlFactory */