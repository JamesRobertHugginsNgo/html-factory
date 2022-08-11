/* global HtmlFactory */

const { makeElement, makeFunctionCall, renderElement, renderFunctionCall, renderStyleString } = HtmlFactory;

const { element: element1, functionCalls: functionCalls1 } = makeElement('div', { class: 'container' }, [
	makeElement('p', null, [
		'Hello ',
		makeElement('span', { style: renderStyleString({ color: 'green' }) }, 'World', [['console.log', 'World']])
	], [{ name: 'console.log', arguments: 'Hello' }])
], [{ name: 'console.log', arguments: 'container' }]);

document.body.append(element1);
for (const functionCall of functionCalls1) {
	makeFunctionCall(functionCall);
}

const { element: element2, functionCalls: functionCalls2 } = renderElement('div', { class: 'container' }, [
	renderElement('p', null, [
		'Hello ',
		renderElement('span', { style: renderStyleString({ color: 'green' }) }, 'World', [['console.log', 'World']])
	], [{ name: 'console.log', arguments: 'Hello' }])
], [{ name: 'console.log', arguments: 'container' }]);
document.body.append(element2);

const { element: scriptElement } = renderElement('script', null, functionCalls2.map((functionCall) => renderFunctionCall(functionCall)));
document.body.append(scriptElement);
