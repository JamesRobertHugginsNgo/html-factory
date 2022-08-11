const { renderElement, renderFunctionCall, renderStyleString } = require('../../dist/node/html-factory');

const { element, functionCalls } = renderElement('div', { class: 'container' }, [
	renderElement('p', null, [
		'Hello ',
		renderElement('span', { style: renderStyleString({ color: 'green' }) }, 'World', [['console.log', 'World']])
	], [{ name: 'console.log', arguments: 'Hello' }])
], [{ name: 'console.log', arguments: 'container' }]);
console.log(element);

const { element: scriptElement } = renderElement('script', null, functionCalls.map((functionCall) => renderFunctionCall(functionCall)));
console.log(scriptElement);
