/* @if TARGET="BROWSER_ES6" || TARGET="BROWSER_ES5" **
const HtmlFactory = (() => {
/* @endif */
function toFragment(children, callback) {
	/* @if DEBUG */
	if (!(children != null)) {
		throw 'Invalid Argument. Argument "children" must not be undefined nor null.';
	}
	if (!(callback == null || typeof callback === 'function')) {
		throw 'Invalid Argument. Argument "callback" must be undefined, null or a function.';
	}

	/* @endif */
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
	/* @if DEBUG */
	if (!(typeof namespace === 'string')) {
		throw 'Invalid Argument. Argument "namespace" must be a string.';
	}
	if (!(typeof name === 'string')) {
		throw 'Invalid Argument. Argument "name" must be a string.';
	}
	if (!(attributes == null || typeof attributes === 'object')) {
		throw 'Invalid Argument. Argument "attributes" must be undefined, null or an object.';
	}
	if (!(callback == null || typeof callback === 'function')) {
		throw 'Invalid Argument. Argument "callback" must be undefined, null or a function.';
	}

	/* @endif */
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
	/* @if DEBUG */
	if (!(config != null)) {
		throw 'Invalid Argument. Argument "config" must not be undefined nor null.';
	}

	/* @endif */
	if (Array.isArray(config)) {
		return toFragment(config.map((value) => fromConfig(value)), callback);
	}

	if (typeof config === 'object' && config) {
		const { namespace, name, attributes, children } = config;

		if (namespace) {
			return toElementNs(namespace, name, attributes, fromConfig(children), callback);
		}

		return toElement(name, attributes, fromConfig(children), callback);
	}

	if (callback) {
		callback(config);
	}

	return config;
}

/* @if TARGET="BROWSER_ES6_MODULE" */
export {
	toFragment,
	toElementNs,
	toElement,
	fromConfig
};
/* @endif */
/* @if TARGET="BROWSER_ES6" || TARGET="BROWSER_ES5" **
return {
	toFragment,
	toElementNs,
	toElement,
	fromConfig
};
})();

/* exported HtmlFactory */
/* @endif */
