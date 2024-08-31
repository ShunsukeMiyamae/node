//パラメータクエリ１
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
//クエリーテキスト処理の機能を提供
const url = require('url');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

let server = http.createServer(getFromClient);

server.listen(3000);
console.log("Server start!");

function getFromClient(request, response) {
    //第二引数をtrueにするとクエリ文字を解析する。
    //ブラウザからhttp://localhost:3000/?msg=helloと送ってみる。
    let url_parts = url.parse(request.url, true);
    console.log(url_parts.pathname);
    switch (url_parts.pathname) {
        case '/':
            var content = 'これはIndexページです。';
            //次の文では以下のデータを受信する。
            let query = url_parts.query;
            //[Object: null prototype] { msg: 'hello' }
            //url.parseで第二引数をtrueにしないと「msg=hello」という文字列になる。
            console.log(query);

            //queryの中からmsgの値を抜き出して処理を行う
            if (query.msg != undefined) {
                content += 'あなたは「' + query.msg + '」と送りました。';
            }

            var content = ejs.render(index_page, {
                title: "Index",
                content: content,
            })
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
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
