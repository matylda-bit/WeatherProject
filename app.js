const express = require("express");
const https = require("https");

const app = express();


app.get("/", function(req, res){

  const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=661995a754f0dacdc307edaa4f47c331&units=metric"
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
  const weatherData = JSON.parse(data)
  const temp = weatherData.main.temp
  const weatherDescription = weatherData.weather[0].description
  const icon = weatherData.weather[0].icon
  const imageURL =  "https://openweathermap.org/img/wn/" + icon + "@2x.png"
  res.write("<p>The wather is currently " + weatherDescription + "<p>");
  res.write("<h1>The temperature in London is " + temp + " degrees Celcius</h1>");
  res.write("<img src=" + imageURL +">");
  res.send()

    })
  })
})

app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
