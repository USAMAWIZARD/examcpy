server = require("express");
const bodyParser = require("body-parser");

require("ejs");
app = server();
socketlisten = app.listen(5000);
io = require("socket.io").listen(socketlisten);
app.set("view ejgine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(server.static(__dirname));
questions={1:{"question":"this is a sample","a":0,"b":0,"c":0,"d":0}}


io.on("connection", (socket) => {

  socket.on("vote", (data) => { 
  questions[data[0]][data[1]]+=1
  io.sockets.emit("incvote",data)
  })

  
  socket.on("addquestion", (data) => { 
  
  })
});

app.get("/", (req, res) => {
  res.render("voting.ejs",{"question":JSON.stringify(questions)});
});
