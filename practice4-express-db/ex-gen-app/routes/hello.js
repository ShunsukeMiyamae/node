const express = require('express');
const router = express.Router();

// getアクセス用（初回アクセス時、更新時用）
router.get('/', (req, res, next) => {
    // -----------------------------------------------------
    // ※クエリパラメータ用テスト
    // クエリーパラメータを取得する。素のNODE.JSで作るより楽ちん
    // var name = req.query.name;
    // var mail = req.query.mail;

    // let data = {
    //    title: 'Hello',
    // content: 'これはサンプルのコンテンツです。<br>this is sample content.',
    // http://localhost:3000/hello?name=henako&mail=hanako@flower.comでアクセスしてみる。
    // content: `あなたの名前は${name}、<br>メールアドレスは、${mail}です。<br>`,
    //    content: '※何か書いて送信してください'
    // }
    // -----------------------------------------------------

    // セッションのテスト
    let msg = '※何か書いて送信してください';
    // セッションに保管されたメッセージがあれば最後のメッセージとして表示
    // セッションはクライアントごとのidで管理される。
    if (req.session.message != undefined) {
        msg = "Last Message:" + req.session.message;
    }
    var data = {
        title: 'Hello!',
        content: msg
    };
    res.render('hello', data);
});

// postアクセス用
router.post('/post', (req, res, next) => {
    // 送信されたメッセージを取得し、セッションに保管
    let msg = req.body['message'];
    req.session.message = msg;
    // -----------------------------------------------------
    // ※クエリパラメータ用テスト
    // let data = {
    //     title: 'Hello!',
    //     content: `あなたは「${msg}」と送信しました。`,
    // }
    // -----------------------------------------------------
    let data = {
        title: 'Hello!',
        content: "Last Message:" + req.session.message
    }
    res.render('hello', data);
});
module.exports = router;