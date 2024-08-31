//HTMLの内容をNODEで書き換える
const http = require('http');
const fs = require('fs');

let server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

function getFromClient(request, response) {
    fs.readFile('./index.html', 'UTF-8',
        (error, data) => {
            //メソッドチェーンにすると必要な処理が1行で書けて、コードが簡潔になる。
            let content = data.
                replace(/dummy_title/g, 'タイトルです').
                replace(/dummy_content/g, 'これがコンテンツです。');

            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
        }
    )
}