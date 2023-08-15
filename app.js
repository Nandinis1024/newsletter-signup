const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https")

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("static"));

const port =  3000;


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");

});

app.post("/", (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;

    let data = {
        members: [
            {
            email_address: email,
            status: "subscribed",
            merge_fields: 
            {
                FNAME: firstName,
                LNAME: lastName,
            }
            }
                ]
                };


    const jsonData = JSON.stringify(data); 
    const url = "https://us21.api.mailchimp.com/3.0/lists/290af707eat";
    const options = {
        method: "POST",
        auth: "nandi:400956ef0b472b6f12c3ffab7c341ea0-us21"         
    }  
    
    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            if (response.statusCode === 200)
            {
                res.sendFile(__dirname + "/success.html");
            }
            else
            {
                res.sendFile(__dirname + "/failure.html");
            }
        })

    })

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.sendFile(__dirname + "/signup.html");

});

app.listen(port, function(){
    console.log(`http://localhost:${port}`);
})