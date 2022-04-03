function toFragment(children, callback) {
	const element = document.createDocumentFragment();

	if (!Array.isArray(children)) {
		children = [children];
	}

	for (let index = 0, length = children.length; index < length; index++) {
		const child = children[index];
		if (child == null) {
			continue;
		}

		if (!(child instanceof Node)) {
			const textNode = document.createTextNode(children[index]);
			element.appendChild(textNode);
			continue;
		}

		element.appendChild(children[index]);
	}

	if (callback) {
		callback(element);
	}

	return element;
}

function toElementNs(namespace, name, attributes, children, callback) {
	const element = document.createElementNS(namespace, name);

	if (attributes) {
		for (const key in attributes) {
			const value = attributes[key];
			if (value == null) {
				continue;
			}

			element.setAttribute(key, value);
		}
	}

	if (children) {
		element.appendChild(toFragment(children));
	}

	if (callback) {
		callback(element);
	}

	return element;
}

function toElement(name = 'div', attributes, children, callback) {
	return toElementNs('http://www.w3.org/1999/xhtml', name, attributes, children, callback);
}

function fromConfig(config, callback) {
	let element = config;

	if (Array.isArray(config)) {
		element = toFragment(config.map((value) => fromConfig(value)));
	} else if (typeof config === 'object' && config) {
		const { namespace, name, attributes, children, callback } = config;
		if (namespace && name) {
			element = toElementNs(namespace, name, attributes, fromConfig(children), callback);
		} else if (name) {
			element = toElement(name, attributes, fromConfig(children), callback);
		} else if (children) {
			element = fromConfig(children, callback);
		}
	}

	if (callback) {
		callback(element);
	}

	return element;
}

export {
	toFragment,
	toElementNs,
	toElement,
	fromConfig
};
