//メッセージボード
//更新すると直前のメッセージが送られるバグあり。
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const login_page = fs.readFileSync('./login.ejs', 'utf8');

const max_num = 10;
const filename = 'mydata.txt';
let message_data;
//保存データの読み込み
readFromFile(filename);

let server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

function getFromClient(request, response) {
    let url_parts = url.parse(request.url, true);
    switch (url_parts.pathname) {
        case '/':
            response_index(request, response);
            break;
        case '/login':
            response_login(request, response);
            break;
        default:
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end('no page...');
            break;
    }
}

function response_login(request, response) {
    let content = ejs.render(login_page, {});
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}

function response_index(request, response) {
    if (request.method === 'POST') {
        let body = '';
        request.on('data', function (data) {
            console.log('dataイベント', data);
            body += data;
        });
        request.on('end', () => {
            console.log('endイベント', body);
            data = qs.parse(body);
            console.log(data);
            addToData(data.id, data.msg, filename, request);
            write_index(request, response);
        });
    } else {
        write_index(request, response);
    }
}

function write_index(request, response) {
    let msg = "※何かメッセージを書いてください。";
    let content = ejs.render(index_page, {
        title: 'Index',
        content: msg,
        data: message_data,
        filename: 'data_item',
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}

//保存データの読み込み
//保存されているデータ例：{"id":"hdjdjjdjd","msg":"hjdjdj"}
//↑Json形式
function readFromFile(fname) {
    fs.readFile(fname, 'utf8', (err, data) => {
        console.log('readFromFile(before):' + data);
        message_data = data.split('\n');
        console.log('readFromFile(after):' + message_data);
    });
}

function addToData(id, msg, fname, request) {
    let obj = { 'id': id, 'msg': msg };
    let obj_str = JSON.stringify(obj);
    console.log('add data1: ' + obj_str);
    message_data.unshift(obj_str);
    console.log('add data2: ' + message_data);
    if (message_data.length > max_num) {
        message_data.pop();
    }
    saveToFile(fname);
}

function saveToFile(fname) {
    let data_str = message_data.join('\n');
    fs.writeFile(fname, data_str, (err) => {
        if (err) { throw err; }
    });
}