//app2.jsをさらに分離
const http = require('http');
const fs = require('fs');
let request;
let responce;

let server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

function getFromClient(req, res) {
    request = req;
    responce = res;
    fs.readFile('./index.html', 'UTF-8', writeToResponce);
    console.log("a");
}

function writeToResponce(error, data) {
    responce.writeHead(200, { 'Content-Type': 'text/html' });
    responce.write(data);
    responce.end();
}