var ws = require('ws').Server;
var server = new ws({host:"localhost",port:8888});


var cons = [];
server.on('connection',function(ws){
  console.log('new connection founded successfully');
  cons.push(ws);
  ws.on('message',function(data){
    console.log("message");
    ws.send("hello");
    // for(var i=0;i<cons.length;i++){
    //     cons[i].send(data);
    // }
  });
  
  ws.on('close',function(){
    console.log("disconnnected");
    // for(var i=0;i<cons.length;i++){
    //    if(cons[i] == ws) cons.splice(i,1);
    // }
  });
});
console.log('websocket-server running...');