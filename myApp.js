var express = require('express');
var app = express();
console.log("Hello World");
require('dotenv').config();

app.get("/", function(req, res)
{
   res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));


// app.get("/json", function(req, res)
// {
//    res.json(
//       {"message": "Hello json"}
//    )
// });

app.get("/json", function(req, res)
{
   console.log(process.env.MESSAGE_STYLE, "<=message style");
   if(process.env.MESSAGE_STYLE==="uppercase")
   {
      res.json(
         {"message": "HELLO JSON"}
      )
   }
   else
   {
      res.json(
         {"message" : "Hello json"}
      )
   }
});

app.use(function(req, res, next)
{
   console.log(req.method + " "+ req.path + " - " + req.ip)
   next();
});

//Chain Middleware to Create a Time Server

function getdatenow()
{
   return new Date().toString();
}

app.get("/now", function(req,res,next)
{
   req.time = getdatenow();
   next();
},
function(req,res)
{
res.json({time: req.time});
})

//Route parameter input
app.get("/:word/echo", function(req,res)
{
   res.json({echo: req.params.word});
});





































 module.exports = app;
