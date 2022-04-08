const HtmlFactory = (() => {

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
function makeFragment({ children, callback }) {
	if (!(callback === undefined || callback === null || typeof callback === 'function')) {
		throw 'Invalid Argument. Argument "callback" must be undefined, null or a function.';
	}

	const fragment = document.createDocumentFragment();

	if (!Array.isArray(children)) {
		children = [children];
	}

	for (let index = 0, length = children.length; index < length; index++) {
		let child = children[index];

		if (child == null) {
			continue;
		}

		if (typeof child === 'object' && child.name) {
			child = makeElement(child);
		}

		if (!(child instanceof Node)) {
			if (typeof child !== 'string') {
				child = String(child);
			}

			child = document.createTextNode(child);
		}

		fragment.appendChild(child);
	}

	if (callback != null) {
		callback(fragment);
	}

	return fragment;
}

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
function makeElement({ namespace, name, attributes, children, callback }) {
	if (!(callback === undefined || callback === null || typeof callback === 'function')) {
		throw 'Invalid Argument. Argument "callback" must be undefined, null or a function.';
	}

	const element = namespace == null
		? document.createElement(name)
		: document.createElementNS(namespace, name);

	if (attributes != null) {
		for (const key in attributes) {
			const value = attributes[key];

			if (value == null) {
				continue;
			}

			element.setAttribute(key, value);
		}
	}

	if (children != null) {
		element.appendChild(makeFragment({ children }));
	}

	if (callback != null) {
		callback(element);
	}

	return element;
}

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
function makeStyleString(options) {
	const styleArray = [];

	for (const key in options) {
		const value = options[key];

		if (value == null) {
			continue;
		}

		if (typeof value === 'object') {
			styleArray.push(`${key} { ${makeStyleString(value)} }`);
			continue;
		}

		styleArray.push(`${key}: ${value};`);
	}

	return styleArray.join(' ');
}

return {
	makeFragment,
	makeElement,
	makeStyleString
};
})();

/* exported HtmlFactory */
