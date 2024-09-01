// よく使うモジュールが追加されている。
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// セッションを使うための設定
const session = require('express-session');
var session_opt = {
  secret: 'keyboad cat',              // 秘密キーの設定。ハッシュの計算を行うためのキー。
  resave: false,                      // セッションストアに強制的に値を保存するかどうか
  saveUninitialized: false,           // 初期化されていない値を強制的に保存するかどうか
  cokkie: { maxAge: 60 * 60 * 1000 }  // セッションの保管時間。この場合は1時間
}

// ルートごとに用意されているスクリプトをモジュールとしてロードしている。
// routesとセットで使う。app.jsではルーティングだけを行い、
// 実際の処理はroutesで行うイメージ。
// これらのスクリプトは実行時にapp.jsと合体して一つのモジュールになる。重要
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var helloRouter = require('./routes/hello'); // これは自分で追加
var helloDbRouter = require('./routes/hello_db'); // これは自分で追加

// expressのオブジェクトを作成しておく。
var app = express();

// view engine setup
// アプリで必要とする各種の設定情報をセットする。
app.set('views', path.join(__dirname, 'views'));  //テンプレートファイルの保管されている場所を設定
app.set('view engine', 'ejs');                    //テンプレートのエンジンの種類を設定

// アプリに必要な処理の組み込みを行う。ロードしたモジュールの機能（関数）をセットしている。）
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// セッションを使うための設定。各場所に注意。
// var app=express();より後、ルーティング設定より前。
app.use(session(session_opt));

// app.useは特定のアドレスにアクセスした際にアクセスしたときの処理も設定できる。
// 起動時はhtt://localhost/hello_db/  など
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hello', helloRouter); // これは自分で追加
app.use('/hello_db', helloDbRouter); // これは自分で追加

// エラー発生時の処理各種
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// moduleオブジェクトのexortsプロパティにappオブジェクトを設定する。
// exportsを設定すると、外部からできるようになる。
// Expressジェネレーターを使用する場合のお約束。
module.exports = app;
