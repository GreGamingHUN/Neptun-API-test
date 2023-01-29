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

let dataDefault = {
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

let data = dataDefault;

let instituteUrl;

let curriculumId;

const GetMessages = async function(url) {
    let tmp;
    await axios.post(url + "/GetMessages", data).then((post_res) => {
        tmp = post_res.data;
    })
    return tmp;
}

const GetPeriodTerms = async function (url) {
    let tmp;
    await axios.post(url + '/GetPeriodTerms', data).then((res) => {
        tmp = res.data
    })
    return tmp;
}

const GetCurriculums = async function (url) {
    let tmp;
    await axios.post(url + '/GetCurriculums', data).then((res) => {
        tmp = res.data;
    })
    return tmp;
}

const GetAddedSubjects = async function (url) {
    let tmp;
    await axios.post(url + '/GetAddedSubjects', data).then((res) => {
        tmp = res.data;
    })
    return tmp;
}

app.post('/login', async (req, res) => {
    dataDefault.UserLogin = req.body.username;
    dataDefault.Password = req.body.passwd;
    instituteUrl = req.body.url;
    let tmp = await GetMessages(instituteUrl);
    console.log(tmp);
    let termlist = await GetPeriodTerms(instituteUrl);
    let curriculumlist = await GetCurriculums(instituteUrl);
    curriculumId = curriculumlist.CurriculumList[0].ID
    res.render('second.ejs', {
        neptunCode: data.UserLogin,
        url: instituteUrl,
        terms: termlist.PeriodTermsList,
        curriculums: curriculumlist.CurriculumList
    })
})

app.get('/GetMessages', async (req, res) => {
    tmp = await GetMessages(instituteUrl);

    res.render('messages.ejs', {
        messages: tmp.MessagesList
    })
})

app.post('/GetAddedSubjects', async (req, res) => {
    data.TermId = req.body.termid;
    let tmp = await GetAddedSubjects(instituteUrl);
    res.render('subjects.ejs', {
        addedSubjects: tmp.AddedSubjectsList
    })
    data = dataDefault;
})

app.post('/GetCourses', async (req, res) => {
    let filter = {
        "Id": req.body.subjectid,
        "SubjectType": 0,
        "CurriculumID": curriculumId
    }
})


app.use(express.static('public'))

app.listen(port);
console.log("Server is running on port "+ port);