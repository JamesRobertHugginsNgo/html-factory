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
		throw 'Invalid Argument. Argument "namespace" must be an Element.';
	}
	if (!(typeof name === 'string')) {
		throw 'Invalid Argument. Argument "element" must be an Element.';
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

/* @if TARGET="BROWSER_ES6_MODULE" */
export {
	toFragment,
	toElementNs,
	toElement
};
/* @endif */
/* @if TARGET="BROWSER_ES6" || TARGET="BROWSER_ES5" **
return {
	toFragment,
	toElementNs,
	toElement
};
})();

/* exported HtmlFactory */
/* @endif */
