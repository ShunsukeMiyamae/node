//app1.jsの関数を切り離して読みやすく
const http = require('http');
const fs = require('fs');

let server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

function getFromClient(req, res) {
    request = req;
    responce = res;
    fs.readFile('./index.html', 'UTF-8',
        (error, data) => {
            //dataには読み込んだファイルの内容が書き込まれる。
            responce.writeHead(200, { 'Content-Type': 'text/html' });
            responce.write(data);
            responce.end();
        });
}
