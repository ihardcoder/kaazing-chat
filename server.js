var ws = require('ws').Server;
var server = new ws({host:"localhost",port:8888});

var EXIST_NICKNAME = '0';

var clients = {}; //用于保存所有连接用户
server.on('connection',function(ws){
  console.log('new connection founded successfully');
  // 构造客户端对象
  var client = {
    connection : ws,
    nickname:""
  }
  ws.on('message',function(data){
    console.log("message");


    var res = "";

    if(client.nickname === ""){
      if(!clients[data]){
        client.nickname = data;
        res = getTime() + "-" + client.nickname + "加入聊天室";
        console.log(client.nickname + ' login');
        }else{  //用户名重复
          res = EXIST_NICKNAME;
          ws.send(res);
          return;
        }
    }else{
      res = getTime() + "-" + client.nickname + "说：" + data;
        console.log(client.nickname + ' say: ' + data);
    }

    clients[client.nickname] = client;

    writeMsg(clients,res);
  });
  
  ws.on('close',function(){
    console.log("disconnnected");
    var res = "";
    res = getTime() + "-" + client.nickname + "退出聊天室";
    console.log(res);

    delete clients[client.nickname]; //删除退出的用户信息

    writeMsg(clients,res);
  });
});

// 大厅广播信息
function writeMsg(clients,res){
  if(!clients){
    return;
  }
  for(var c in clients){
    if(clients.hasOwnProperty(c) && clients[c].connection){
      clients[c].connection.send(res);
    }
  }
};

var getTime=function(){
  var date = new Date();
  return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
};

console.log('websocket-server running...');