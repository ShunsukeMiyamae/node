//テンプレートファイルでHTMLを作る方法
//ルーティング(リクエストされたurlによってレスポンスを変える)
const http = require('http');
const fs = require('fs');
//テンプレートモジュール。npm install ejs
const ejs = require('ejs');
const url = require('url');

//テンプレートの読み込み。fileSyncはファイルを同期処理で読み込む。
//別にまだサーバーは起動していないので、時間かかってもシンプルな方がいい。
const index_page = fs.readFileSync('./index.ejs', 'utf8');
const other_page = fs.readFileSync('./other.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');
//サーバーオブジェクトの作成
let server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

function getFromClient(request, response) {
    //テンプレートのレンダリング。
    //テンプレート（～.ejs）の変数（%= %）を変更する。
    //let content = ejs.render(index_page);
    //htmlの%=---%の内の変数に置換される。
    //第二引数の関数がなければ第一引数のページをのそのまま返す。
    // let content = ejs.render(index_page, {
    //     title: "Index",
    //     content: "これはテンプレートを使ったサンプルページです。"
    // });

    // response.writeHead(200, { 'Content-Type': 'text/html' });
    // response.write(content);
    // response.end();

    //ルーティング
    //ブラウザからのリクエストは3回。最初のリクエスト、
    //linkタグで設定したcssのリクエスト、faviconのリクエスト。
    let url_parts = url.parse(request.url);
    console.log('★request.url');
    console.log(request.url);
    console.log('★url_parts');
    console.log(url_parts);
    switch (url_parts.pathname) {
        case '/':
            console.log('a');
            var content = ejs.render(index_page, {
                title: "Index",
                content: "これはテンプレートを使ったサンプルページです。"
            })
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
            break;
        case '/other':
            console.log('b');
            var content = ejs.render(other_page, {
                title: "Other",
                content: "これは新しく作ったサンプルページです。bootstrap使ってます。"
            })
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
            break;
        case '/style.css':
            console.log('c');
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(style_css);
            response.end();
            break;
        default:
            console.log('d');
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end('no page...');
            break;
    }
}