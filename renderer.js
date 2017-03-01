var fs = require("fs");

function view(templateName, values, response){
	//read from the template files
	fs.readFile(`./views/${templateName}.html`, (error, fileContents) => {
  		if (err) throw err;

  		//insert values into the content

  		//write out to the response
  		response.write(fileContents);
	});
}

module.exports.view = view;

