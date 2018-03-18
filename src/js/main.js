import 'babel-polyfill';

import '../css/main.css';
import '../css/css1.css';
import pic1 from '../img/pic1.jpg';
import add from './mod/add.js';


addDiv('This is the main page.');
addDiv('3 + 5 = ' + add(3, 5));
addImg(pic1);
console.log(es6Func());

function es6Func(){
    var set = new Set([2,3,4,3,1,5,4]);
    return Array.from(set);
}

function addDiv(text){
    var div = document.createElement('div');
    div.innerHTML = text;

    var body = document.body;
    body.appendChild(div);
}
function addImg(src){
    var img = document.createElement('img');
    img.src = src;
    
    var body = document.body;
    body.appendChild(img);
}

if(module.hot){
    module.hot.accept('./mod/add.js', function(){
        console.log('reloading add.js');
    });
}