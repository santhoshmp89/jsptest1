var ajax = [
	'https://jsonplaceholder.typicode.com/todosdsds/1',
	'https://portal.catchpoint.com/m/g',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3',
  'https://dummyjson.com/products/1',
  'https://dummyjson.com/products/2',
  'https://dummyjson.com/products/3',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap'
];

class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = '[custom]';
  }

  toString() {
    return `[custom]: ${this.message}`;
  }
}

function makeAjaxCall() {
	ajax.forEach((a) => {
		fetch(a)
	  .then(x => console.log(x))
	});
}

const button = document.getElementById('button');
// button.addEventListener('click', function() {
// 	makeAjaxCall();	
// });


function jsErrorFunc() {
	console.log('function called')
	throw new MyError('cardStateType:account_restrictions_portsumTimeout,startTime:******,endTime:******,roundTripTime:10092|Account_Restrictions');
	// throw new Error('[custom]', { cause: 'cardStateType:account_restrictions_portsumTimeout,startTime:******,endTime:******,roundTripTime:10092|Account_Restrictions'});
};


const button1 = document.getElementById('button1');
button1.addEventListener('click', function() {
	jsErrorFunc();	
});


function promiseErrorFunc() {
	fetch('https://jsonplaceholder.typicode.com/todos/1')
		.then(response => response.json())
	  .then(x => console.log(a))
};


const button2 = document.getElementById('button2');
button2.addEventListener('click', function() {
	promiseErrorFunc();	
});

function addingNELHeader() {
	fetch('https://jsonplaceholder.typicode.com/todos/1', {
		headers: {
			"NEL": {"report_to":"network-errors","max_age":2592000,"success_fraction":0,"failure_fraction":1.0, "include_subdomains": true},
			"Report-To": {"group":"network-errors","max_age":2592000,"endpoints":[{"url":"https://rqa.3genlabs.net/hawklogserver/1527/re.p"}]}
		}
	})
		.then(response => response.json())
	  .then(x => console.log(a))
}

const button3 = document.getElementById('nel-btn');
button3.addEventListener('click', function() {
	addingNELHeader();	
});

window.addEventListener("pagehide", function (event) {
  console.log("Page is being hidden");
  console.log("Current URL:", window.location.href);
});	
