var express = require('express');
var router = express.Router();
const connection = require("../db/database");

/* GET users listing. */
router.get('/', function (req, res, next) {
  connection.query(
    'SELECT * FROM kullanicilar',
    function (err, results, fields) {
      res.send(results);
    }
  );
});

router.post('/login', function (req, res, next) {
  //{ kullanici: '', sifre: '1234' }
  try {
    const { kullanici, sifre } = req.body;
    connection.query(`select * from kullanicilar where username=?`, [kullanici], function (err, results, fields) {
      if (isUser(sifre, results[0].sifre)) {
        res.status(200).json({ message: "success", data: results[0] })
      } else {
        res.status(400).json({ message: "Yanlış parola girdiniz!!" })
      }

    })
  } catch (error) {

  }
})

module.exports = router;

function isUser(kullanicidanGelenSifre, databasedenGelenSifre) {
  if (kullanicidanGelenSifre === databasedenGelenSifre) {
    return true;
  } else {
    return false;
  }
}