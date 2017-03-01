//Problem: We need a simple way to look at a users badge count and Javascript points from a web browser
//Solution: Use nodejs to perform the profile lookups and serve our template via http

//1. Create a web server

const http = require('http');
const router = require('./router.js');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
	router.home(request, response);
	router.user(request, response);
});
	
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



