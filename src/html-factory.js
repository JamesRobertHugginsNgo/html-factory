/* @if TARGET="BROWSER_ES6" || TARGET="BROWSER_ES5" **
const HtmlFactory = (() => {
/* @endif */

/* @if TARGET!="NODE" */
/*
createFragment: (arg0: {
	children: [any],
	functionCallers?: [{
		name: string,
		args?: [any]
	}] = []
}) => {
	element: Node
	functionCallers: [{
		name: string,
		args?: [any]
	}]
}
*/
function createFragment({ children, functionCallers = [] }) {
	const functionCallerSet = [];

	const element = new DocumentFragment();
	element.append(...children.filter((child) => {
		return child != null;
	}).map((child) => {
		if (child && typeof child === 'object') {
			if (Array.isArray(child)) {
				child = createFragment({ children: child });
			} else if (child.name) {
				child = createElement(child);
			} else if (child.children) {
				child = createFragment(child);
			}

			if (child.element) {
				const {
					element: childElement,
					functionCallers: childFunctionCallers
				} = child;

				functionCallerSet.push(...childFunctionCallers);

				return childElement;
			}
		}

		return child;
	}));

	functionCallers.splice(0, 0, ...functionCallerSet);

	return {
		element,
		functionCallers
	};
}

/*
createElement: (arg0: {
	namespaceURI?: string = 'http://www.w3.org/1999/xhtml',
	name: string,
	attributes?: object,
	children?: [any],
	functionCallers?: [{
		name: string,
		args?: [any]
	}] = []
}) => {
	element: Node
	functionCallers: [{
		name: string,
		args?: [any]
	}]
}
*/
function createElement({
	namespaceURI = 'http://www.w3.org/1999/xhtml',
	name,
	attributes,
	children,
	functionCallers = []
}) {
	const element = document.createElementNS(namespaceURI, name);
	if (attributes) {
		for (const key in attributes) {
			const value = attributes[key];
			if (value != null) {
				element.setAttribute(key, value);
			}
		}
	}

	if (children) {
		const fragment = createFragment({ children, functionCallers });
		element.append(fragment.element);
	}

	return {
		element,
		functionCallers
	};
}

/*
callFunctionCaller: (arg0: {
	name: string,
	args?: [any] = []
}) => any
*/
function callFunctionCaller({ name, args = [] }) {
	return name.split('.').reduce((acc, cur) => {
		return acc[cur];
	}, window)(...args);
}

/* @endif */
/*
renderFragment: (arg0: {
	children: [any],
	functionCallers?: [{
		name: string,
		args?: [any]
	}] = []
}) => {
	element: string
	functionCallers: [{
		name: string,
		args?: [any]
	}]
}
*/
function renderFragment({ children, functionCallers = [] }) {
	const functionCallerSet = [];

	const element = children.filter((child) => {
		return child != null;
	}).map((child) => {
		if (child && typeof child === 'object') {
			if (Array.isArray(child)) {
				child = renderFragment({ children: child });
			} else if (child.name) {
				child = renderElement(child);
			} else if (child.children) {
				child = renderFragment(child);
			}

			if (child.element) {
				const {
					element: childElement,
					functionCallers: childFunctionCallers
				} = child;

				functionCallerSet.push(...childFunctionCallers);

				return childElement;
			}
		}

		return child;
	}).join('');

	functionCallers.splice(0, 0, ...functionCallerSet);

	return {
		element,
		functionCallers
	};
}

/*
renderElement: (arg0: {
	name: string,
	attributes?: object,
	children?: [any],
	functionCallers?: [{
		name: string,
		args?: [any]
	}] = []
}) => {
	element: Node
	functionCallers: [{
		name: string,
		args?: [any]
	}]
}
*/
function renderElement({ name, attributes, children, functionCallers = [] }) {
	const opening = [name];
	if (attributes) {
		for (const key in attributes) {
			const value = attributes[key];
			if (value != null) {
				if (value === '') {
					opening.push(key);
				} else {
					opening.push(`${key}="${value}"`);
				}
			}
		}
	}

	const element = [`<${opening.join(' ')}>`];
	if (children) {
		element.push(renderFragment({ children, functionCallers }).element);
		element.push(`</${name}>`);
	}

	return {
		element: element.join(''),
		functionCallers
	};
}

/*
renderStyleString: (
	styles: object
) => string
*/
function renderStyleString(styles) {
	const styleStrings = [];
	for (const key in styles) {
		const value = styles[key];
		if (typeof value === 'object') {
			styleStrings.push(`${key} { ${renderStyleString(value)} }`);
			continue;
		}
		styleStrings.push(`${key}: ${value};`);
	}

	return styleStrings.join(' ');
}

/*
renderFunctionCaller: ({
	name: string,
	args?: [any] = []
}) => string
*/
function renderFunctionCaller({ name, args = [] }) {
	return `${name}(${args.map((arg) => {
		return JSON.stringify(arg);
	}).join(', ')});`;
}

/* @if TARGET="NODE" **
module.exports = {
	renderFragment,
	renderElement,
	renderStyleString,
	renderFunctionCaller
};
/* @endif */
/* @if TARGET="BROWSER_ESM" */
export {
	createFragment,
	createElement,
	callFunctionCaller,
	renderFragment,
	renderElement,
	renderStyleString,
	renderFunctionCaller
};
/* @endif */
/* @if TARGET="BROWSER_ES6" || TARGET="BROWSER_ES5" **
return {
	createFragment,
	createElement,
	callFunctionCaller,
	renderFragment,
	renderElement,
	renderStyleString,
	renderFunctionCaller
};
})();

/* exported HtmlFactory */
/* @endif */
