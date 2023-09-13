const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded ({extended: true}));
app.get("/", function(req, res){
   res.sendFile(__dirname+"/index.html");
});
app.post("/", function(req, res){
    const loc=req.body.cityName;
    const appKey="024fa01671e4ea2f7bc2f9877da3300d";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+loc+"&appid="+appKey+"&units="+unit;
    https.get(url, function(response){
       response.on("data", function(data){
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const icon=weatherData.weather[0].icon;
        const imgUrl= "http://openweathermap.org/img/wn/"+icon+"@2x.png";


        const weatherDesc=weatherData.weather[0].description;
         res.write("<p>The weather is currently "+weatherDesc+"</p>");
         res.write("<h1>The temperature in "+loc+" is "+temp+" degrees celsius</h1>");
         res.write("<img src="+imgUrl+">");
         res.send();
    })
})
});







app.listen(3000, function(){
      console.log("Server is running on port 3000");
});