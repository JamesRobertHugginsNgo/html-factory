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
function renderFragment(children, functionCalls = []) {
	if (children == null) {
		return null;
	}

	if (Array.isArray(children)) {
		const functionCallSet = [];
		const element = [];
		for (const child of children) {
			const fragment = renderFragment(child, functionCallSet);
			if (fragment) {
				element.push(fragment.element);
			}
		}
		functionCalls.splice(0, 0, ...functionCallSet);
		return {
			element: element.join(''),
			functionCalls
		};
	}

	if (typeof children === 'object' && children.element) {
		functionCalls.push(...children.functionCalls);
		return {
			element: children.element,
			functionCalls
		};
	}

	return {
		element: children,
		functionCalls
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
function renderElement(name, attributes, children, functionCalls = []) {
	const opening = [name];
	if (attributes) {
		for (const key in attributes) {
			const value = attributes[key];
			if (value != null) {
				opening.push(`${key}="${value}"`);
			}
		}
	}

	const element = [`<${opening.join(' ')}>`];
	if (children != null) {
		const fragment = renderFragment(children, functionCalls);
		if (fragment) {
			element.push(fragment.element);
		}
		element.push(`</${name}>`);
	}

	return {
		element: element.join(''),
		functionCalls
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
function renderElementNs(namespaceURI, name, attributes, children, functionCalls = []) {
	return renderElement(name, attributes, children, functionCalls);
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
		} else {
			styleStrings.push(`${key}: ${value};`);
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
		const [name, ...args] = functionCall;
		return renderFunctionCall({
			name,
			arguments: args
		});
	}

	const {
		name,
		arguments: args
	} = functionCall;
	const finalArgs = (Array.isArray(args) ? args : [args]).map((arg) => JSON.stringify(arg));
	return `${name}(${finalArgs.join(', ')});`;
}

/*
makeFragment: (
	children: any,
	functionCalls: [typeFunctionCall] = []
) => null | typeMakeElementResult
*/
function makeFragment(children, functionCalls = []) {
	if (children == null) {
		return null;
	}

	if (Array.isArray(children)) {
		const functionCallSet = [];
		const element = document.createDocumentFragment();
		for (const child of children) {
			const fragment = makeFragment(child, functionCallSet);
			if (fragment) {
				element.append(fragment.element);
			}
		}
		functionCalls.splice(0, 0, ...functionCallSet);
		return {
			element,
			functionCalls
		};
	}

	if (typeof children === 'object' && children.element) {
		functionCalls.push(...children.functionCalls);
		return {
			element: children.element,
			functionCalls
		};
	}

	return {
		element: children,
		functionCalls
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
function makeElementNs(namespaceURI, name, attributes, children, functionCalls = []) {
	const element = document.createElementNS(namespaceURI, name);
	if (attributes) {
		for (const key in attributes) {
			const value = attributes[key];
			if (value != null) {
				element.setAttribute(key, value);
			}
		}
	}

	const fragment = makeFragment(children, functionCalls);
	if (fragment) {
		element.append(fragment.element);
	}

	return {
		element,
		functionCalls
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
function makeElement(name, attributes, children, functionCalls = []) {
	return makeElementNs('http://www.w3.org/1999/xhtml', name, attributes, children, functionCalls);
}

/*
makeFunctionCall: (
	functionCall: typeFunctionCall
) => any
*/
function makeFunctionCall(functionCall) {
	if (Array.isArray(functionCall)) {
		const [name, ...args] = functionCall;
		return makeFunctionCall({
			name,
			arguments: args
		});
	}

	const {
		name,
		arguments: args
	} = functionCall;
	const func = name.split('.').reduce((acc, cur) => acc[cur], window);
	const finalArgs = (Array.isArray(args) ? args : [args]);
	return func(...finalArgs);
}

export {
	renderFragment,
	renderElement,
	renderElementNs,
	renderStyleString,
	renderFunctionCall,
	makeFragment,
	makeElementNs,
	makeElement,
	makeFunctionCall
};
