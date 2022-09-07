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
				const { element: childElement, functionCallers: childFunctionCallers } = child;
				functionCallerSet.push(...childFunctionCallers);
				return childElement;
			}
		}
		return child;
	});

	functionCallers.splice(0, 0, ...functionCallerSet);

	return {
		element: element.join(''),
		functionCallers
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
renderFunctionCaller: (
	functionCaller: typeFunctionCaller
) => string
*/
function renderFunctionCaller({ name, args = [] }) {
	return `${name}(${args.map((arg) => JSON.stringify(arg)).join(', ')});`;
}

/*
createFragment: ({
	children: [any],
	functionCallers: [typeFunctionCaller] = []
}) => typeCreateElementResult
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
				const { element: childElement, functionCallers: childFunctionCallers } = child;
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
createElement: ({
	namespaceURI: string = 'http://www.w3.org/1999/xhtml',
	name: string,
	attributes?: object,
	children?: [any],
	functionCallers: [typeFunctionCaller] = []
}) => typeCreateElementResult
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
callFunctionCaller: (
	functionCaller: typeFunctionCaller
) => any
*/
function callFunctionCaller({ name, args = [] }) {
	return name.split('.').reduce((acc, cur) => acc[cur], window)(...args);
}

export {
	renderFragment,
	renderElement,
	renderStyleString,
	renderFunctionCaller,
	createFragment,
	createElement,
	callFunctionCaller
};
