const express=require("express");
const request=require("request");
const bodyParser=require("body-parser");
const app=express();
const https=require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(request,response){
    response.sendFile(__dirname+"/index.html");
});
app.post("/", function(req, res){
    var email=req.body.email;
    var firstName=req.body.firstName;
    var lastName=req.body.lastName;
    console.log(email, firstName, lastName);
    var data1={
        members:[
            {
                email_address : email,
                status : "subscribed",
                merge_field: {
                    FNAME:firstName,
                    LNAME:lastName,
                    email:email }
            }
        ]
}
;
    let JSONdata=JSON.stringify(data1);

    
    const url="https://us20.api.mailchimp.com/3.0/lists/9d4b21db6a";
    const options={
        method: "POST",
        auth:"shivansh:230abe9b4198cb29b3fc84eeb9a52eb3-us20"
        
    };
    
    const requestt = https.request(url,options,function(response){
        console.log(response.statusCode);
        if (response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
    
        }
        else{
            res.sendFile(__dirname+"/failiure.html");
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    }});
    requestt.write(JSONdata);
    requestt.end();
});
app.post("/failiure", function(req, res){
    res.redirect("/");
})


app.listen(process.env.PORT||3000,function(){
    console.log("port is running on 3000");
});

