import '../css/main.css';
import '../css/css2.css';
import multi from './mod/multi.js';

addDiv('This is the page1.');
addDiv('3 * 2 = ' + multi(3, 2));

function addDiv(text){
    var div = document.createElement('div');
    div.innerHTML = text;
    
    var body = document.body;
    body.appendChild(div);
}
