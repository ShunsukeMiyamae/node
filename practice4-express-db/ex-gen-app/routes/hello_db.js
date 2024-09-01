const express = require('express');
const router = express.Router();
const mysql = require('mysql');

let mysql_setting = {
    host: 'localhost',
    user: 'root',
    password: 'mymesnsk',
    database: 'my-nodeapp-db'
}

// getアクセス用（初回アクセス時、更新時用）
// アクセス例：http://localhost:3000/hello_db
router.get('/', (req, res, next) => {
    let nm = req.body.name;
    let ml = req.body.mail;
    let ag = req.body.age;
    let data = { 'name': nm, 'mail': ml, 'age': ag };

    // コネクションの用意
    let connection = mysql.createConnection(mysql_setting);

    // データベースに接続
    connection.connect();

    // ＤＢから全件取り出す
    // データは配列の形で取得する。
    connection.query('SELECT * FROM mydata',
        function (error, results, fields) {
            // データベース完了時の処理
            // エラーがなければ実行。errorがなければnullになる。
            if (error == null) {
                let data = {
                    title: 'mysql',
                    content: results
                };
                res.render('hello_db/index', data);
            }
        });

    connection.end();
});

// getアクセス用（レコード追加フォーム取得）
// アクセス例：http://localhost:3000/hello_db/add
router.get('/add', (req, res, next) => {
    let data = {
        title: 'Hello/Add',
        content: '新しいレコードを入力'
    }
    res.render('hello_db/add', data);
});

// postアクセス用（上記フォームから送信ボタンが押された時）
router.post('/add', (req, res, next) => {
    let nm = req.body.name;
    let ml = req.body.mail;
    let ag = req.body.age;
    let data = { 'name': nm, 'mail': ml, 'age': ag };

    // コネクションの用意
    let connection = mysql.createConnection(mysql_setting);

    // データベースに接続
    connection.connect();
    // ＤＢから全件取り出す
    connection.query('insert into mydata set ?', data,
        function (error, results, fields) {
            res.redirect('/hello_db');
        });

    connection.end();
});

// getアクセス用（wher句でデータ取得）
// アクセス例：http://localhost:3000/hello_db/show?id=2
router.get('/show', (req, res, next) => {
    let id = req.query.id;

    // コネクションの用意
    let connection = mysql.createConnection(mysql_setting);

    // データベースに接続
    connection.connect();

    connection.query('SELECT * FROM mydata where id = ?', id,
        function (error, results, fields) {
            // データベース完了時の処理
            // エラーがなければ実行。errorがなければnullになる。
            if (error == null) {
                let data = {
                    title: 'Hello/show',
                    content: 'id = ' + id + ' のレコード',
                    mydata: results[0]
                };
                res.render('hello_db/show', data);
            }
        });

    connection.end();
});

// getアクセス用（更新）
// アクセス例：http://localhost:3000/hello_db/edit?id=2
router.get('/edit', (req, res, next) => {
    let id = req.query.id;

    // コネクションの用意
    let connection = mysql.createConnection(mysql_setting);

    // データベースに接続
    connection.connect();

    connection.query('SELECT * FROM mydata where id = ?', id,
        function (error, results, fields) {
            // データベース完了時の処理
            // エラーがなければ実行。errorがなければnullになる。
            if (error == null) {
                let data = {
                    title: 'Hello/edit',
                    content: 'id = ' + id + ' のレコード',
                    mydata: results[0]
                };
                res.render('hello_db/edit', data);
            }
        });

    connection.end();
});

// postアクセス用（上記フォームから送信ボタンが押された時）
router.post('/edit', (req, res, next) => {
    let id = req.body.id;
    let nm = req.body.name;
    let ml = req.body.mail;
    let ag = req.body.age;
    let data = { 'name': nm, 'mail': ml, 'age': ag };

    // コネクションの用意
    let connection = mysql.createConnection(mysql_setting);

    // データベースに接続
    connection.connect();
    // ＤＢから全件取り出す
    connection.query('update mydata set ? where id = ?', [data, id],
        function (error, results, fields) {
            res.redirect('/hello_db');
        });

    connection.end();
});

// getアクセス用（delete用wher句でデータ取得）
// アクセス例：http://localhost:3000/hello_db/delete?id=2
router.get('/delete', (req, res, next) => {
    let id = req.query.id;

    // コネクションの用意
    let connection = mysql.createConnection(mysql_setting);

    // データベースに接続
    connection.connect();

    connection.query('SELECT * FROM mydata where id = ?', id,
        function (error, results, fields) {
            // データベース完了時の処理
            // エラーがなければ実行。errorがなければnullになる。
            if (error == null) {
                let data = {
                    title: 'Hello/delete',
                    content: 'id = ' + id + ' のレコード',
                    mydata: results[0]
                };
                res.render('hello_db/delete', data);
            }
        });

    connection.end();
});

// postアクセス用（上記フォームから削除ボタンが押された時）
router.post('/delete', (req, res, next) => {
    let id = req.body.id;

    // コネクションの用意
    let connection = mysql.createConnection(mysql_setting);

    // データベースに接続
    connection.connect();

    // ＤＢから取り出す
    connection.query('delete from mydata where id = ?', id,
        function (error, results, fields) {
            res.redirect('/hello_db');
        });

    connection.end();
});

module.exports = router;