"use strict";

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var HtmlFactory = function () {
  /*
  type typeFunctionCall: {
  	name: string,
  	arguments: any
  } | [
  	string,
  	...any
  ]
  
  type typeMakeElementResult: {
  	element: any,
  	functionCalls: [typeFunctionCall]
  }
  
  type typeRenderElementResult: {
  	element: string,
  	functionCalls: [typeFunctionCall]
  }
  */

  /*
  renderFragment: (
  	children: any,
  	functionCalls: [typeFunctionCall] = []
  ) => null | typeRenderElementResult
  */
  function renderFragment(children) {
    var functionCalls = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (children == null) {
      return null;
    }

    if (Array.isArray(children)) {
      var functionCallSet = [];
      var element = [];

      var _iterator = _createForOfIteratorHelper(children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;
          var fragment = renderFragment(child, functionCallSet);

          if (fragment) {
            element.push(fragment.element);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      functionCalls.splice.apply(functionCalls, [0, 0].concat(functionCallSet));
      return {
        element: element.join(''),
        functionCalls: functionCalls
      };
    }

    if (_typeof(children) === 'object' && children.element) {
      functionCalls.push.apply(functionCalls, _toConsumableArray(children.functionCalls));
      return {
        element: children.element,
        functionCalls: functionCalls
      };
    }

    return {
      element: children,
      functionCalls: functionCalls
    };
  }
  /*
  renderElement: (
  	name: string,
  	attributes: null | object,
  	children: any,
  	functionCalls: [typeFunctionCall] = []
  ) => typeRenderElementResult
  */


  function renderElement(name, attributes, children) {
    var functionCalls = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var opening = [name];

    if (attributes) {
      for (var key in attributes) {
        var value = attributes[key];

        if (value != null) {
          opening.push("".concat(key, "=\"").concat(value, "\""));
        }
      }
    }

    var element = ["<".concat(opening.join(' '), ">")];

    if (children != null) {
      var fragment = renderFragment(children, functionCalls);

      if (fragment) {
        element.push(fragment.element);
      }

      element.push("</".concat(name, ">"));
    }

    return {
      element: element.join(''),
      functionCalls: functionCalls
    };
  }
  /*
  renderElementNs: (
  	namespaceURI: string,
  	name: string,
  	attributes: null | object,
  	children: any,
  	functionCalls: [typeFunctionCall] = []
  ) => typeRenderElementResult
  */


  function renderElementNs(namespaceURI, name, attributes, children) {
    var functionCalls = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
    return renderElement(name, attributes, children, functionCalls);
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
      } else {
        styleStrings.push("".concat(key, ": ").concat(value, ";"));
      }
    }

    return styleStrings.join(' ');
  }
  /*
  renderFunctionCall: (
  	functionCall: typeFunctionCall
  ) => string
  */


  function renderFunctionCall(functionCall) {
    if (Array.isArray(functionCall)) {
      var _functionCall = _toArray(functionCall),
          _name = _functionCall[0],
          _args = _functionCall.slice(1);

      return renderFunctionCall({
        name: _name,
        arguments: _args
      });
    }

    var name = functionCall.name,
        args = functionCall.arguments;
    var finalArgs = (Array.isArray(args) ? args : [args]).map(function (arg) {
      return JSON.stringify(arg);
    });
    return "".concat(name, "(").concat(finalArgs.join(', '), ");");
  }
  /*
  makeFragment: (
  	children: any,
  	functionCalls: [typeFunctionCall] = []
  ) => null | typeMakeElementResult
  */


  function makeFragment(children) {
    var functionCalls = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (children == null) {
      return null;
    }

    if (Array.isArray(children)) {
      var functionCallSet = [];
      var element = document.createDocumentFragment();

      var _iterator2 = _createForOfIteratorHelper(children),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var child = _step2.value;
          var fragment = makeFragment(child, functionCallSet);

          if (fragment) {
            element.append(fragment.element);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      functionCalls.splice.apply(functionCalls, [0, 0].concat(functionCallSet));
      return {
        element: element,
        functionCalls: functionCalls
      };
    }

    if (_typeof(children) === 'object' && children.element) {
      functionCalls.push.apply(functionCalls, _toConsumableArray(children.functionCalls));
      return {
        element: children.element,
        functionCalls: functionCalls
      };
    }

    return {
      element: children,
      functionCalls: functionCalls
    };
  }
  /*
  makeElementNs: (
  	namespaceURI: string,
  	name: string,
  	attributes: null | object,
  	children: any,
  	functionCalls: [typeFunctionCall] = []
  ) => typeMakeElementResult
  */


  function makeElementNs(namespaceURI, name, attributes, children) {
    var functionCalls = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
    var element = document.createElementNS(namespaceURI, name);

    if (attributes) {
      for (var key in attributes) {
        var value = attributes[key];

        if (value != null) {
          element.setAttribute(key, value);
        }
      }
    }

    var fragment = makeFragment(children, functionCalls);

    if (fragment) {
      element.append(fragment.element);
    }

    return {
      element: element,
      functionCalls: functionCalls
    };
  }
  /*
  makeElement: (
  	name: string,
  	attributes: null | object,
  	children: any,
  	functionCalls: [typeFunctionCall] = []
  ) => typeMakeElementResult
  */


  function makeElement(name, attributes, children) {
    var functionCalls = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    return makeElementNs('http://www.w3.org/1999/xhtml', name, attributes, children, functionCalls);
  }
  /*
  makeFunctionCall: (
  	functionCall: typeFunctionCall
  ) => any
  */


  function makeFunctionCall(functionCall) {
    if (Array.isArray(functionCall)) {
      var _functionCall2 = _toArray(functionCall),
          _name2 = _functionCall2[0],
          _args2 = _functionCall2.slice(1);

      return makeFunctionCall({
        name: _name2,
        arguments: _args2
      });
    }

    var name = functionCall.name,
        args = functionCall.arguments;
    var func = name.split('.').reduce(function (acc, cur) {
      return acc[cur];
    }, window);
    var finalArgs = Array.isArray(args) ? args : [args];
    return func.apply(void 0, _toConsumableArray(finalArgs));
  }

  return {
    renderFragment: renderFragment,
    renderElement: renderElement,
    renderElementNs: renderElementNs,
    renderStyleString: renderStyleString,
    renderFunctionCall: renderFunctionCall,
    makeFragment: makeFragment,
    makeElementNs: makeElementNs,
    makeElement: makeElement,
    makeFunctionCall: makeFunctionCall
  };
}();
/* exported HtmlFactory */