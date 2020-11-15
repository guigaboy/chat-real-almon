//? -DECLARAÇÕES DE PROJETO, PUBLICOS
//const { Socket } = require('dgram');
const express = require('express');                         //Adiciona o modelo Express de rotas
const path = require('path');                               //Adiciona o sistema avançado de rotas e diretórios

const app = express();                                      //Inicializa "app" como receptor de rotas do express 
const server = require('http').createServer(app);           //Define protocolo HTTP para "app"
const io = require('socket.io')(server);                    //Define protocolo WebSocket para o server "app"

//? -DECLARAÇÕES DE VARIÁVEIS GLOBAIS
const port = '80';                                        //Variavel de porta -> "http://localhost:8080"
var messageHistory = new Array()                            //Contém todo o histórico de mensagens

app.use(express.static(path.join(__dirname, 'public')));    //Define a pasta public como estática
app.set('view engine', 'ejs');                              //Usa *.ejs como a extenção padrão para um render


app.use('/', function(req, res){
    res.render("index", {historico:messageHistory});
console.log(messageHistory);

});


io.on('connection', function(socket){                       //Toda vez que alguem se conectar ao socket "io", neste caso, o servidor inteiro, faz algo...
    console.log(`Socket conectado.\nUserID = ${socket.id}\n`);
    
    socket.on('sendMessage', function(data){                //Socket ouvindo ao evento "sendMessage" criado no FrontEnd 
        messageHistory.push(data);
        socket.broadcast.emit('receivedMessage', data);
    })
});

console.clear()
console.log("Aplicação rodando em: \"http://localhost:"+port+"\"\n")
server.listen(port);