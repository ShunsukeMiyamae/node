//パーシャル（テンプレートの一部を別ファイルで用意）
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring')
const index_page = fs.readFileSync('./index.ejs', 'utf8');

//サーバーオブジェクトの作成
let server = http.createServer(getFromClient);

server.listen(3000);
console.log("Server start!");

let data = { msg: 'no message...' }

function getFromClient(request, response) {
    let url_parts = url.parse(request.url, true);
    switch (url_parts.pathname) {
        case '/':
            response_index(request, response);
            break;
        default:
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end('no page...');
            break;
    }
}

function response_index(request, response) {
    if (request.method === 'POST') {
        let body = '';
        request.on('data', (data) => {
            console.log('dataイベント', data);
            body += data;
        });

        request.on('end', () => {
            console.log('endイベント', body);
            data = qs.parse(body);
            write_index(request, response);
        });
    } else {
        write_index(request, response);
    }
}

function write_index(request, response) {
    var msg = "※伝言を表示します。";
    console.log(data);
    var content = ejs.render(index_page, {
        title: "Index",
        content: msg,
        data: data,
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}

