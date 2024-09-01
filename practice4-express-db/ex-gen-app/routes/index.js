var express = require('express');
var router = express.Router();

//GETアクセスされたときの処理。POSTメソッドもある。
/* GET home page. */
router.get('/', function(req, res, next) {
  // テンプレートのレンダリングを行っている。
  // テンプレートの場所はviewsフォルダ内のindex.ejs。
  // 第一引数はファイルの名前だけでよい。
  res.render('index', { title: 'Express' });
});

module.exports = router;
