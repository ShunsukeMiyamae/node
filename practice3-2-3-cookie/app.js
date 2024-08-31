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
            //クッキーの保存
            setCookie('msg', data.msg, response);
            write_index(request, response);
        });
    } else {
        write_index(request, response);
    }
}

function write_index(request, response) {
    var msg = "※伝言を表示します。";
    let cookie_data = getCookie('msg', request);
    var content = ejs.render(index_page, {
        title: "Index",
        content: msg,
        data: data,
        cookie_data: cookie_data,
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}

function setCookie(key, value, response) {
    let cookie = escape(value);
    response.setHeader('Set-Cookie', [key + '=' + cookie]);
}

function getCookie(key, request) {
    let cookie_data = request.headers.cookie != undefined ? request.headers.cookie : '';
    let data = cookie_data.split(';');
    for (let i in data) {
        if (data[i].trim().startsWith(key + '=')) {
            let result = data[i].trim().substring(key.Length + 1);
            return unescape(result);
        }
    }
    return '';
}