
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

module.exports = {
	renderFragment,
	renderElement,
	renderStyleString,
	renderFunctionCaller
};
