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

module.exports = {
	renderFragment,
	renderElement,
	renderStyleString,
	renderFunctionCall
};
