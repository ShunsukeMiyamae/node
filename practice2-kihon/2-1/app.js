//nodeの基本
//HTMLを返す

//HTTPモジュールの読み込み
const http = require('http');

//サーバーオブジェクトの作成
let server = http.createServer(
    //このサーバーにアクセスすると次の関数が実行される。
    //requestには受信時の情報が、responseには返信時の情報を格納する。
    (request, response) => {
        //クライアントへの返信を終了するメソッド。
        //引数がテキストであればそのテキストをクライアントに返信して終了する。
        //response.endでブラウザに返信する。

        //返信①：クライアントのブラウザ上で引数のテキストが表示される。
        //response.end('Hello Node.js!');

        //返信②：htmlを返すとクライアントではwebページとして表示される。
        //response.end('<html><body><h1>hello</h1><p>Welcome to Node.js</p></body></html>');

        //htmlを返すには↑の方法では限界がある。別のやり方↓を提示

        //返信③：responseの各種メソッドでHTMLを返信
        //ヘッダー情報の作成（Content-typeはtextデータでhtml形式のデータを返すといういっみ）
        response.setHeader('Content-type', 'text/html');
        //htmlの内容を書き出し
        response.write('<!DOCTYPE html><html lang="ja">');
        response.write('<head><meta charset="utf-8">');
        response.write('<title>Hello Node.js!</title></head>');
        response.write('<body><h1>Hello Node.js!</h1>');
        response.write('<p>This is Node.js sample page.</p>');
        //日本語を含む行にutf8を指定。ただ、nodeのデフォルトがutf8だし
        //langで指定しているので必須ではない。第二引数はエンコーディング指定。
        response.write('<p>これはNode.jsのサンプルページです。</p>', 'utf8');
        response.write('</body></html>');
        response.end();
    }
);

//作成したサーバーオブジェクトを待ち受け状態にする。
server.listen(3000);
console.log('server start');