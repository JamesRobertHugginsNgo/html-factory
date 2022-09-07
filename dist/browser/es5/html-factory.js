"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var HtmlFactory = function () {
  /*
  
  define typeFunctionCaller: {
  	name: string,
  	args?: [any]
  }
  
  define typeCreateElementResult: {
  	element: Node,
  	functionCallers: [typeFunctionCaller]
  }
  
  define typeRenderElementResult: {
  	element: string,
  	functionCallers: [typeFunctionCaller]
  }
  */

  /*
  renderFragment: ({
  	children: [any],
  	functionCallers: [typeFunctionCaller] = []
  }) => typeRenderElementResult
  */
  function renderFragment(_ref) {
    var children = _ref.children,
        _ref$functionCallers = _ref.functionCallers,
        functionCallers = _ref$functionCallers === void 0 ? [] : _ref$functionCallers;
    var functionCallerSet = [];
    var element = children.filter(function (child) {
      return child != null;
    }).map(function (child) {
      if (child && _typeof(child) === 'object') {
        if (Array.isArray(child)) {
          child = renderFragment({
            children: child
          });
        } else if (child.name) {
          child = renderElement(child);
        } else if (child.children) {
          child = renderFragment(child);
        }

        if (child.element) {
          var _child = child,
              childElement = _child.element,
              childFunctionCallers = _child.functionCallers;
          functionCallerSet.push.apply(functionCallerSet, _toConsumableArray(childFunctionCallers));
          return childElement;
        }
      }

      return child;
    });
    functionCallers.splice.apply(functionCallers, [0, 0].concat(functionCallerSet));
    return {
      element: element.join(''),
      functionCallers: functionCallers
    };
  }
  /*
  renderElement: ({
  	name: string,
  	attributes?: object,
  	children?: [any],
  	functionCallers: [typeFunctionCaller] = []
  }) => typeRenderElementResult
  */


  function renderElement(_ref2) {
    var name = _ref2.name,
        attributes = _ref2.attributes,
        children = _ref2.children,
        _ref2$functionCallers = _ref2.functionCallers,
        functionCallers = _ref2$functionCallers === void 0 ? [] : _ref2$functionCallers;
    var opening = [name];

    if (attributes) {
      for (var key in attributes) {
        var value = attributes[key];

        if (value != null) {
          if (value === '') {
            opening.push(key);
          } else {
            opening.push("".concat(key, "=\"").concat(value, "\""));
          }
        }
      }
    }

    var element = ["<".concat(opening.join(' '), ">")];

    if (children) {
      element.push(renderFragment({
        children: children,
        functionCallers: functionCallers
      }).element);
      element.push("</".concat(name, ">"));
    }

    return {
      element: element.join(''),
      functionCallers: functionCallers
    };
  }
  /*
  renderStyleString: (
  	styles: object
  ) => string
  */


  function renderStyleString(styles) {
    var styleStrings = [];

    for (var key in styles) {
      var value = styles[key];

      if (_typeof(value) === 'object') {
        styleStrings.push("".concat(key, " { ").concat(renderStyleString(value), " }"));
        continue;
      }

      styleStrings.push("".concat(key, ": ").concat(value, ";"));
    }

    return styleStrings.join(' ');
  }
  /*
  renderFunctionCaller: (
  	functionCaller: typeFunctionCaller
  ) => string
  */


  function renderFunctionCaller(_ref3) {
    var name = _ref3.name,
        _ref3$args = _ref3.args,
        args = _ref3$args === void 0 ? [] : _ref3$args;
    return "".concat(name, "(").concat(args.map(function (arg) {
      return JSON.stringify(arg);
    }).join(', '), ");");
  }
  /*
  createFragment: ({
  	children: [any],
  	functionCallers: [typeFunctionCaller] = []
  }) => typeCreateElementResult
  */


  function createFragment(_ref4) {
    var children = _ref4.children,
        _ref4$functionCallers = _ref4.functionCallers,
        functionCallers = _ref4$functionCallers === void 0 ? [] : _ref4$functionCallers;
    var functionCallerSet = [];
    var element = new DocumentFragment();
    element.append.apply(element, _toConsumableArray(children.filter(function (child) {
      return child != null;
    }).map(function (child) {
      if (child && _typeof(child) === 'object') {
        if (Array.isArray(child)) {
          child = createFragment({
            children: child
          });
        } else if (child.name) {
          child = createElement(child);
        } else if (child.children) {
          child = createFragment(child);
        }

        if (child.element) {
          var _child2 = child,
              childElement = _child2.element,
              childFunctionCallers = _child2.functionCallers;
          functionCallerSet.push.apply(functionCallerSet, _toConsumableArray(childFunctionCallers));
          return childElement;
        }
      }

      return child;
    })));
    functionCallers.splice.apply(functionCallers, [0, 0].concat(functionCallerSet));
    return {
      element: element,
      functionCallers: functionCallers
    };
  }
  /*
  createElement: ({
  	namespaceURI: string = 'http://www.w3.org/1999/xhtml',
  	name: string,
  	attributes?: object,
  	children?: [any],
  	functionCallers: [typeFunctionCaller] = []
  }) => typeCreateElementResult
  */


  function createElement(_ref5) {
    var _ref5$namespaceURI = _ref5.namespaceURI,
        namespaceURI = _ref5$namespaceURI === void 0 ? 'http://www.w3.org/1999/xhtml' : _ref5$namespaceURI,
        name = _ref5.name,
        attributes = _ref5.attributes,
        children = _ref5.children,
        _ref5$functionCallers = _ref5.functionCallers,
        functionCallers = _ref5$functionCallers === void 0 ? [] : _ref5$functionCallers;
    var element = document.createElementNS(namespaceURI, name);

    if (attributes) {
      for (var key in attributes) {
        var value = attributes[key];

        if (value != null) {
          element.setAttribute(key, value);
        }
      }
    }

    if (children) {
      var fragment = createFragment({
        children: children,
        functionCallers: functionCallers
      });
      element.append(fragment.element);
    }

    return {
      element: element,
      functionCallers: functionCallers
    };
  }
  /*
  callFunctionCaller: (
  	functionCaller: typeFunctionCaller
  ) => any
  */


  function callFunctionCaller(_ref6) {
    var name = _ref6.name,
        _ref6$args = _ref6.args,
        args = _ref6$args === void 0 ? [] : _ref6$args;
    return name.split('.').reduce(function (acc, cur) {
      return acc[cur];
    }, window).apply(void 0, _toConsumableArray(args));
  }

  return {
    renderFragment: renderFragment,
    renderElement: renderElement,
    renderStyleString: renderStyleString,
    renderFunctionCaller: renderFunctionCaller,
    createFragment: createFragment,
    createElement: createElement,
    callFunctionCaller: callFunctionCaller
  };
}();
/* exported HtmlFactory */