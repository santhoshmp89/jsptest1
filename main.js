var ajax = [
	'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3',
  'https://dummyjson.com/products/1',
  'https://dummyjson.com/products/2',
  'https://dummyjson.com/products/3',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap'
];

function makeAjaxCall() {
	ajax.forEach((a) => {
		fetch(a)
	  .then(x => console.log(x))
	});
}

const button = document.getElementById('button');
button.addEventListener('click', function() {
	makeAjaxCall();	
});


function jsErrorFunc() {
	console.log('function called')
	throw new Error('test error');
};


const button1 = document.getElementById('button1');
button1.addEventListener('click', function() {
	jsErrorFunc();	
});

