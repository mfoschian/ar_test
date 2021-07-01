var minihttp = require('minihttp');

const options = {
	webHome: '.', // default 'public',
	port: 8080
};

var Server = new minihttp.HttpServer( options );


// Server.route('/', function( request, response, parms )
// {
// 	Server.sendResponse( response, "Hello World!" );
// });

Server.listen();

console.log( 'Open http://localhost:%s for testing', options.port );
