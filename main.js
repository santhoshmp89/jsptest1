var ajax = [
	'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3',
  'https://dummyjson.com/products/1',
  'https://dummyjson.com/products/2',
  'https://dummyjson.com/products/3',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap',
  'https://developers.google.com/_pwa/developers/icons/icon-144x144.png',
  'https://www.google.com/xjs/_/js/md=3/k=xjs.hd.en.iXdF5vQX3t8.O/ck=xjs.hd.3mhtCf28lXo.L.W.O/am=BAAAAAAAAAAAAAAAAAAAAAQAAAAAEDUQDgFsgACBABBggAAgAICAFKQQBAMAEPBQJgAAACZAYAgYAogKPOcBAJBAFQAAAAAAEAwiAAAACAAAoAMAACCgEcAAhIBKQAAAAADyACA4ABhEEAAAAAAAAAAAAAABTBAMLkgAFAQQAAAAAAAAAAAAAKSkycVAAgAK/rs=ACT90oF-uCPSsFsxixtFlrmZcVrsn9STJQ'
];

ajax.forEach((a) => {
	fetch(a)
  .then(x => console.log(x))
});
