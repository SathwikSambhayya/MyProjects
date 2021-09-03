var express = require("express");
var https = require("https");
var bodyParser=require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.listen(3000);
app.get("/", function (req, res) {
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res) {
    var query=req.body.cityName;
    var url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=8879f3560d248c4ee226aa7a2bde7841&units=metrics";
    https.get(url,function(response){
        response.on("data",function(data){
            var weather=JSON.parse(data);
            var temp=weather.main.temp
            var des=weather.weather[0].description;
            res.write("the temp is"+temp);
            res.write("the des is "+des);
            res.send();
        });
        


    })

})



