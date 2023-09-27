const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
var bodyParser = require('body-parser');

app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));

console.log(123);//test

app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
}); 

app.get('/', (req, res) => {
    if(res) console.log('res');
    if(req) console.log('req');
}); 

app.post('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
    console.log('Данные от клиента:', req.body);
}); 

app.get('/test', (req, res) => {
    res.send("lol");
    console.log(req.query);
}); 