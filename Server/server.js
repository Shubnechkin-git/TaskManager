const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');
const port = process.env.PORT || 5000;
var bodyParser = require('body-parser');


app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// app.get('/', (req, res) => {
//     if (res) console.log('res');
//     if (req) console.log('req');
// });

app.post('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
    console.log('Данные от клиента:', req.body);
});

let test2 = (key) => {
    if (key !== undefined && key !== null) return key
}

app.get('/api', async (req, res) => {
    let test = await test2(req.query.userId);
    console.log("srftrtyrt ", test);
    try {
        console.log(req);
        const userId = req.query.userId;
        const check = req.query.check;

        if (userId !== undefined) {
            const dates = await db.setCheckUser(userId, check);

            if (dates !== undefined) {
                // Если пользователь существует, отправляем ответ с кодом 409 и сообщением
                res.json({
                    message: `Пользователь с ID ${userId} уже существует.`,
                    status: 'conflict',
                });
            } else {
                // Если пользователь не найден, отправляем успешный ответ
                res.json({
                    message: `Пользователь с ID ${userId} создан.`,
                    status: 'success',
                });
            }
        } else {
            // Если userId не определен в запросе, отправляем сообщение об ошибке
            const errorData = {
                message: 'Параметр userId отсутствует или не корректен.' + `id: "${userId,":", test} ${await db.sendIdBaseUser(test)}`,
                status: 'error',
            };
            res.json(errorData);
        }

    } catch (error) {
        console.error('Ошибка при обработке запроса:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});


