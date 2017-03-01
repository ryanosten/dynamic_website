var Profile = require("./profile.js");
var renderer = require("./renderer.js")

//Handle HTTP route GET / and POST i.e. home
function home(request, response){
//if url == "/" && GET
if(request.url === '/'){
	response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
	response.write('Header\n');
	response.write('Search\n');
	response.end('Footer\n');	
	}
	//show search
}

	//if url == "/" && POST
		//redirect to /:username

	

//3. Handle HTTP route for GET /:username i.e. /ryanosten
function user(request, response){
	//if url == "/...."
	var username = request.url.replace('/', '');
	if(username.length > 0){
		response.statusCode = 200;
	  	response.setHeader('Content-Type', 'text/plain');
		response.write('Header\n');

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
				javascriptPoints: profileJSON.points.Javascript
			}
			//simple response
			response.write(`${values.username} has ${values.badges}`);
			response.end('Footer\n');	
		});
		
		//on 'error'
		studentProfile.on("error", function(error){
			//show error
			response.write(error.message)
			response.end();		
		});
			
		
		
		}
}

module.exports.home = home;
module.exports.user = user;