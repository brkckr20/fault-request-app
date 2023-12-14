const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const cors = require('cors');
var bodyParser = require('body-parser')
const connection = require("./database");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


io.on('connection', (socket) => {
    console.log('Kullanıcı bağlandı');
});


// Talep oluşturma işlemi
io.on('connection', (socket) => {
    socket.on('talepOlustur', (talep) => {
        io.emit('talepOlusturuldu', talep);
    });
});

app.get("/", (req, res) => {
    res.send("1")
})

app.get("/kullanicilar", (req, res) => {
    connection.query(
        'SELECT * FROM kullanicilar',
        function (err, results, fields) {
            res.send(results);
        }
    );
});

app.get("/kullanici/:username", (req, res) => {
    const { username } = req.params;
    connection.query(
        'SELECT * FROM kullanicilar where username=?',
        [username],
        function (err, results, fields) {
            res.send(results[0]);
        }
    );
});

app.get("/talep/:id", (req, res) => {
    const { id } = req.params;
    connection.query(
        'SELECT * FROM talepler where talep_eden_id=?',
        [id],
        function (err, results, fields) {
            res.send(results);
        }
    );
});

// app.get("/talep/:id", (req, res) => {
//     const { id } = req.params;
//     connection.query(
//         'SELECT *,TIMEDIFF(talep_cevap_tarihi,talep_alinma_tarihi) AS zaman_farki from kullanicilar INNER JOIN talepler ON talepler.talep_eden_id = kullanicilar.id',
//         [id],
//         function (err, results, fields) {
//             res.send(results);
//         }
//     );
// });
app.get("/talepler", (req, res) => {
    connection.query(
        'SELECT *,TIMEDIFF(talep_cevap_tarihi,talep_alinma_tarihi) AS zaman_farki from kullanicilar INNER JOIN talepler ON talepler.talep_eden_id = kullanicilar.id',
        function (err, results, fields) {
            res.send(results);
        }
    );
});

app.post("/talep", (req, res) => {
    try {
        const { talep_eden_id, talep_turu, aciklama } = req.body;
        connection.query(
            "INSERT INTO talepler (talep_eden_id,talep_turu, aciklama) VALUES (?, ?, ?)",
            [talep_eden_id, talep_turu, aciklama],
            function (err, results, fields) {
                if (err) {
                    console.log("Inserted error : " + err);
                } else {
                    console.log("Insert successful");
                }
            }
        );
    } catch (error) {
        console.log("Inserted error : " + error);
    }
});

app.put("/talep/i/:id", (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`UPDATE talepler SET durum='İsleme Alındı' where id = ?`,
            [id],
            function (err, results, fields) {
                if (err) {
                    console.log("Güncelleme sırasında hata")
                }
            })
    } catch (error) {

    }
})
app.put("/talep/ix", (req, res) => {
    const { id, admin_aciklamasi, basariliMi } = req.body;
    if (basariliMi) {
        connection.query(`UPDATE talepler SET admin_aciklamasi=?, durum='Tamamlandı', talep_cevap_tarihi=? where id =?`,
            [admin_aciklamasi, new Date(), id],
            function (err, results, fields) {
                if (err) {
                    console.log("Güncelleme sırasında hata", err)
                }
            }
        )
    }
})


// Sunucu başlat
const PORT = 3002;
server.listen(PORT, () => {
    console.log(`WebSocket sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
