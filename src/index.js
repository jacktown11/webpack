import _ from 'lodash';
import printMe from './print.js';
import './style.css';
import { cube } from './math.js';

function component() {
	var element = document.createElement('pre');
	element.innerHTML = _.join([
		'Hello webpack!',
		'\n\n',
		'5 cubed is equal to ' + cube(5)
	],'');

	var btn = document.createElement('button');
	btn.innerHTML = 'Click me and check the console';
	btn.onclick = printMe;
	element.appendChild(btn);

	return element;
}

var element = component();	// store the element to re-render on print.js changes
document.body.appendChild(element);

if (module.hot) {
	module.hot.accept('./print.js', function() {
	 console.log('Accepting the updated printMe module!');
	 printMe();

	 document.body.removeChild(element);
	 element = component();	// Re-render the element the update the click handler
	 document.body.appendChild(element);
	})
}