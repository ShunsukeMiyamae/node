const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
//普通のテキスト処理の機能を提供
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const other_page = fs.readFileSync('./other.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

//サーバーオブジェクトの作成
let server = http.createServer(getFromClient);

server.listen(3000);
console.log("Server start!");

let data = {
    'Taro': '09-999-999',
    'Hanako': '08-888-888',
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
}

function response_index(request, response) {
    //普通にindex.ejsをレンダリングして表示
    var msg = "これはIndexページです。";
    console.log('a');
    var content = ejs.render(index_page, {
        title: "Index",
        content: msg,
        data: data,  //dataオブジェクトを返す
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}

function response_other(request, response) {
    var msg = "これはOtherページです。";
    //index.ejs↓でボタンを押されたときの処理
    //<form method="post" action="/others">
    if (request.method === 'POST') {
        let body = '';
        //イベント（第一引数）に応じた処理（第二引数）を実行
        //dataイベントはクライアントからデータを受け取ると発生するイベント
        //長いテキストは何回にも分けられて送られてくるため
        //変数に都度データを追記していく。
        request.on('data', (data) => {
            //引数dataには受け取ったデータが入っている
            console.log('dataイベント', data);
            //受け取ったパラメータを「クエリーテキスト」という形式で保管
            body += data;
            console.log('dataイベント', body);
        });

        //endイベントはデータの受信が完了すると発生するイベント
        //長いテキストは何回にも分けられて送られてくるため
        //endイベントですべての受信完了を待って処理してあげる。
        request.on('end', () => {
            //↓'endイベント msg=a'
            console.log('endイベント', body);
            //bodyの中身はクエリーテキスト形式でそのままでは使えないため、
            //parseメソッドでオブジェクトに変換し、取り出せるようにする。
            let post_data = qs.parse(body);
            msg += 'あなたは「' + post_data.msg + '」と書きました。次のデータはindex.ejsに表示したデータにbootstrapを適用させたものです。';
            let content = ejs.render(other_page, {
                title: "Other",
                content: msg,
                data: data,  //dataオブジェクトを返す
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