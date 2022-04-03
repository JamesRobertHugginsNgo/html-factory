# html-factory

Release Version 1.1.1

A set of helper functions for creating HTML elements with JavaScript.

## Install

``` console
npm install https://github.com/JamesRobertHugginsNgo/html-factory.git#1.1.1
```

## Use

The build files are located in the dist folder, select the desired platform + version and move this to the desired folder for use. Use the debug version for development, and the minfied version for production. For ES6 modules, any dependencies must be located on the same folder.

``` JavaScript
// ES6 Module
import { toFragment, toElementNs, toElement, fromConfig } from './html-factory.min.js'; // TODO - Update path

// Or

// ES6 & ES5
// TODO - Add the appropriate HTML script tag.
/* global HtmlFactory */
const { toFragment, toElementNs, toElement, fromConfig } = HtmlFactory;
```

### toFragment(children, callback)

``` JavaScript
const result = toFragment([
  'Hello',
  toElement('br'),
  'World'
], (element) => void console.log('Document Fragment', element));
document.getElementById('to-fragment').appendChild(result);
```

### toElementNs(namespace, name, attributes, children, callback)

``` JavaScript
const result = toElementNs('http://www.w3.org/2000/svg', 'svg', {
  'xmlns': 'http://www.w3.org/2000/svg',
  'width': 16,
  'height': 16,
  'fill': 'currentColor',
  'class': 'bi bi-apple',
  'viewBox': '0 0 16 16'
}, [
  toElementNs('http://www.w3.org/2000/svg', 'path', {
    'd': 'M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z'
  }),
  toElementNs('http://www.w3.org/2000/svg', 'path', {
    'd': 'M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z'
  })
], (element) => void console.log('SVG Element', element));
document.getElementById('to-element-ns').appendChild(result);
```

### toElement(name, attributes, children, callback)

``` JavaScript
const result = toElement('p', { 'class': 'className' }, [
  'Hello',
  toElement('br'),
  'World'
], (element) => void console.log('HTML Element', element));
document.getElementById('to-element').appendChild(result);
```

### fromConfig(config, callback)

``` JavaScript
const result = fromConfig([
  {
    namespace: 'http://www.w3.org/2000/svg',
    name: 'svg',
    attributes: {
      'xmlns': 'http://www.w3.org/2000/svg',
      'width': 16,
      'height': 16,
      'fill': 'currentColor',
      'class': 'bi bi-apple',
      'viewBox': '0 0 16 16'
    },
    children: [
      {
        namespace: 'http://www.w3.org/2000/svg',
        name: 'path',
        attributes: {
          'd': 'M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z'
        }
      },
      {
        namespace: 'http://www.w3.org/2000/svg',
        name: 'path',
        attributes: {
          'd': 'M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z'
        }
      }
    ],
    callback: (element) => void console.log('SVG Element', element)
  },
  {
    name: 'p',
    attributes: { 'class': 'className' },
    children: [
      'Hello',
      { name: 'br' },
      'World'
    ],
    callback: (element) => void console.log('HTML Element', element)
  }
], (element) => void console.log('Document Fragment', element));
document.getElementById('from-config').appendChild(result);
```
