# html-factory

Release Version 2.0.0

A set of helper functions for creating HTML elements with JavaScript.

## Install

``` console
npm install https://github.com/JamesRobertHugginsNgo/html-factory.git#2.0.0
```

## Use

The build files are located in the dist folder, select the desired platform + version and move this to the desired folder for use. Use the debug version for development, and the minfied version for production. For ES6 modules, any dependencies must be located on the same folder.

``` JavaScript
// ES6 Module
import { makeFragment, makeElement, makeStyleString } from './html-factory.min.js'; // Use valid path.

// Or

// ES6 & ES5
// Add the appropriate HTML script tag.
/* global HtmlFactory */
const { makeFragment, makeElement, makeStyleString } = HtmlFactory;
```

### makeFragment

``` JavaScript
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

const result = makeFragment({
  children: [
    'HELLO',
    makeElement({ name: 'br' }),
    'WORLD'
  ],
  callback: (fragment) => void console.log('FRAGMENT', fragment)
});
document.getElementById('make-fragment').appendChild(result);
```

### makeElement

``` JavaScript
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

const result = smakeElement({
  name: 'p',
  attributes: {
    'style': makeStyleString({ 'color': 'red' })
  },
  children: [
    'HELLO',
    makeElement({ name: 'br' }),
    'WORLD'
  ],
  callback: (element) => void console.log('ELEMENT', element)
});
document.getElementById('make-element').appendChild(result);

const resultNs = makeElement({
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
    makeElement({
      namespace: 'http://www.w3.org/2000/svg',
      name: 'path',
      attributes: {
        'd': 'M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z'
      }
    }),
    {
      namespace: 'http://www.w3.org/2000/svg',
      name: 'path',
      attributes: {
        'd': 'M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z'
      }
    }
  ],
  callback: (element) => void console.log('ELEMENT', element)
});
document.getElementById('make-element-namespace').appendChild(resultNs);
```

### makeStyleString

``` JavaScript
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

const result = makeStyleString({
  '@media screen': {
    'body': {
      'color': '#000000',
      'font-size': '1em',
      'line-height': 1.333
    }
  }
});
document.getElementById('make-style-string').appendChild(
  makeFragment({
    children: result,
    callback: (fragment) => void console.log('FRAGMENT', fragment)
  })
);
```
