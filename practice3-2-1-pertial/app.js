//パーシャル（テンプレートの一部を別ファイルで用意）
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring')
const index_page = fs.readFileSync('./index.ejs', 'utf8');
const other_page = fs.readFileSync('./other.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

//サーバーオブジェクトの作成
let server = http.createServer(getFromClient);

server.listen(3000);
console.log("Server start!");

let data = {
    'Taro': '09-999-999',
    'Hanako': '08-88-888',
    'Sachiko': '07-777-777',
    'Ichiro': '06-666-666',
}

function getFromClient(request, response) {
    let url_parts = url.parse(request.url, true);
    switch (url_parts.pathname) {
        case '/':
            response_index(request, response);
            break;
        case '/other':
            response_other(request, response);
            break;
        case '/style.css':
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(style_css);
            response.end();
            break;
        default:
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end('no page...');
            break;
    }

    function response_index(request, response) {
        var msg = "これはIndexページです。";
        console.log('a');
        var content = ejs.render(index_page, {
            title: "Index",
            content: msg,
            data: data,
            filename: 'data_item',
        });
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(content);
        response.end();
    }
}

function response_other(request, response) {
    var msg = "これはOtherページです。";
    if (request.method === 'POST') {
        let body = '';
        request.on('data', (data) => {
            console.log('dataイベント', data);
            body += data;
            console.log('dataイベント', body);
        });

        request.on('end', () => {
            console.log('endイベント', body);
            let post_data = qs.parse(body);
            msg += 'あなたは「' + post_data.msg + '」と書きました。';
            let content = ejs.render(other_page, {
                title: "Other",
                content: msg,
                data: data,
                filename: 'data_item',
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
        });
    } else {
        var msg = "ページがありません";
        var content = ejs.render(other_page, {
            title: "Other",
            content: msg,
        });
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(content);
        response.end();
    }

}