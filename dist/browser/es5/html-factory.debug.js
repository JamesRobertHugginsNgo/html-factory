"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var HtmlFactory = function () {
  /*
  $childType: undefined | null | boolean | number | string | Node | $elementOptionsType;
  
  $childrenType: $childType | [$childType];
  
  makeFragment: function (
  	options: object {
  		children: $childrenType,
  		callback: undefined | null | function (fragment: DocumentFragment) => void
  	}
  ) => DocumentFragment;
  */
  function makeFragment(_ref) {
    var children = _ref.children,
        callback = _ref.callback;

    if (!(callback === undefined || callback === null || typeof callback === 'function')) {
      throw 'Invalid Argument. Argument "callback" must be undefined, null or a function.';
    }

    var fragment = document.createDocumentFragment();

    if (!Array.isArray(children)) {
      children = [children];
    }

    for (var index = 0, length = children.length; index < length; index++) {
      var child = children[index];

      if (child == null) {
        continue;
      }

      if (_typeof(child) === 'object' && child.name) {
        child = makeElement(child);
      }

      if (!(child instanceof Node)) {
        if (typeof child !== 'string') {
          child = String(child);
        }

        child = document.createTextNode(child);
      }

      fragment.appendChild(child);
    }

    if (callback != null) {
      callback(fragment);
    }

    return fragment;
  }
  /*
  $attributesType: object {
  	[property: string]: undefined | null | boolean | number | string
  };
  
  $elementOptionsType: object {
  	namespace: undefined | null | string,
  	name: string,
  	attributes: $attributesType,
  	children: $childrenType,
  	callback: undefined | null | function (element: Element) => void
  };
  
  makeElement: function (
  	options: $elementOptionsType
  ) => Element;
  */


  function makeElement(_ref2) {
    var namespace = _ref2.namespace,
        name = _ref2.name,
        attributes = _ref2.attributes,
        children = _ref2.children,
        callback = _ref2.callback;

    if (!(callback === undefined || callback === null || typeof callback === 'function')) {
      throw 'Invalid Argument. Argument "callback" must be undefined, null or a function.';
    }

    var element = namespace == null ? document.createElement(name) : document.createElementNS(namespace, name);

    if (attributes != null) {
      for (var key in attributes) {
        var value = attributes[key];

        if (value == null) {
          continue;
        }

        element.setAttribute(key, value);
      }
    }

    if (children != null) {
      element.appendChild(makeFragment({
        children: children
      }));
    }

    if (callback != null) {
      callback(element);
    }

    return element;
  }
  /*
  $selectorOptionsType: object {
  	[selector: string]: undefined | null | $attributesType
  };
  
  makeStyleString: function (
  	options: $attributesType | $selectorOptionsType | object {
  		[media: string]: undefined | null | $selectorOptionsType
  	}
  ) => string;
  */


  function makeStyleString(options) {
    var styleArray = [];

    for (var key in options) {
      var value = options[key];

      if (value == null) {
        continue;
      }

      if (_typeof(value) === 'object') {
        styleArray.push("".concat(key, " { ").concat(makeStyleString(value), " }"));
        continue;
      }

      styleArray.push("".concat(key, ": ").concat(value, ";"));
    }

    return styleArray.join(' ');
  }

  return {
    makeFragment: makeFragment,
    makeElement: makeElement,
    makeStyleString: makeStyleString
  };
}();
/* exported HtmlFactory */