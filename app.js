//1a4d716da6ede83a6a60dd78d334d6c5-us18
//0e2defa337
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", function(request, response)
	{
		response.sendFile(__dirname + "/signup.html");
	});
app.post("/", function(req,res){
	var firstName = req.body.fName;
	var lastName = req.body.lName;
	var email = req.body.email;
	var data ={
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields:{
					FNAME: firstName,
					LNAME: lastName,
				}
			}
		]
	};
const jsonData= JSON.stringify(data);
const url = "https://us18.api.mailchimp.com/3.0/lists/0e2defa337";
const options = {
	method:"POST",
        auth:"tania:1a4d716da6ede83a6a60dd78d334d6c5-us18",
}
	
	const request=https.request(url, options, function(response){
		if(response.statusCode ===200){
			res.sendFile(__dirname + "/success.html"); 
		}
		else{
			res.sendFile(__dirname + "/failure.html"); 
		}
		response.on("data", function(data){
			console.log(JSON.parse(data));
		})
	});
	request.write(jsonData);
        request.end();
	
});

app.post("/failure", function(req, res){
	res.redirect("/")
});
app.listen(3000, function(){
	console.log("server is up and running")
});

	

