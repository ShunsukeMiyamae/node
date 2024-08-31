//HTMLを外部ファイルとして読み込む
const http = require('http');
//fs(ファイルシステム)オブジェクトを読み込む
const fs = require('fs');

let server = http.createServer(
    (request, resopnse) => {
        //htmlファイルを外部ファイルとして読み込む。
        //readFileメソッドは非同期処理
        fs.readFile('./index.html', 'UTF-8',
            //readFileの第三引数はコールバック関数を与えると、
            //ファイル読み込み後に動く。すなわち、↓の関数はファイルが全部
            //読み込まれたら動作する部分。
            (error, data) => {
                //dataには読み込んだファイルの内容が書き込まれる。
                resopnse.writeHead(200, { 'Content-Type': 'text/html' });
                resopnse.write(data);
                resopnse.end();
            })
    }
);

server.listen(3000);
console.log('Server start!');