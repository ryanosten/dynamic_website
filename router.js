var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require('querystring');


//Handle HTTP route GET / and POST i.e. home
function home(request, response){
//if url == "/" && GET
	if(request.url === '/'){

		if(request.method.toLowerCase() === "get"){
			response.statusCode = 200;
		  	response.setHeader('Content-Type', 'text/html');
			renderer.view('header', {}, response);
			renderer.view('search', {}, response);
			renderer.view('footer', {}, response);
			response.end();
		} else {
			//if url == "/" && POST

			//get the post data from body
			request.on("data", function(postBody){
					var query = querystring.parse(postBody.toString());
					response.writeHead(303, {"Location": "/" + query.username});
					response.end();
			});
			//extract the username
			//redirect to /:username
		}		
	} 		
}


	

	

//3. Handle HTTP route for GET /:username i.e. /ryanosten
function user(request, response){
	//if url == "/...."
	var username = request.url.replace('/', '');
	if(username.length > 0){
		response.statusCode = 200;
	  	response.setHeader('Content-Type', 'text/html');
		renderer.view('header', {}, response);

		//get the JSON from treehouse
		var studentProfile = new Profile(username);

		//on 'end'
		studentProfile.on("end", function(profileJSON){
			//show profile

			//store the value that we need from JSON
			var values = {
				avatarURL: profileJSON.gravatar_url,
				username: profileJSON.profile_name,
				badges: profileJSON.badges.length ,
				javascriptPoints: profileJSON.points.JavaScript
			}
			//simple response
			renderer.view('profile', values, response);
			renderer.view('footer', {}, response);
			response.end();	
		});
		
		//on 'error'
		studentProfile.on("error", function(error){
			//show error
			renderer.view('error', {errorMessage: error.message}, response);
			renderer.view('search', {}, response);
			renderer.view('footer', {}, response);
			response.end();		
		});
		
		}
}

module.exports.home = home;
module.exports.user = user;