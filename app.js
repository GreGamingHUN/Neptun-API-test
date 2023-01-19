const axios = require('axios');
const express = require('express');
const app = express();

const port = 8080;

const institutes = require('./Institutes.json');

app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs', {
        egyetemek: institutes
    });
})

let data = {
    "TotalRowCount": -1,
    "ExceptionsEnum": 0,
    "UserLogin": "dummy",
    "Password": "dummypwd",
    "NeptunCode": "",
    "CurrentPage": 0,
    "StudentTrainingID": null,
    "LCID": 1038,
    "ErrorMessage": "",
    "MobileVersion": "1.5"
}

app.post('/login', async (req, res) => {
    let tmp;
    data.UserLogin = req.body.username;
    data.Password = req.body.passwd;
    console.log(req.body.url)
    await axios.post(req.body.url + "/GetMessages", data).then((post_res) => {
        tmp = post_res.data
    })
    res.render('second.ejs', {
        messages: tmp.MessagesList
    })
})

app.listen(port);
console.log("Server is running on port "+ port);