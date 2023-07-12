const axios = require('axios');

const data = {
  "PersonMessageId": 636630235,
  "TotalRowCount": -1,
  "ExceptionsEnum": 0,
  "UserLogin": "dummy",
  "Password": "dummypswd",
  "NeptunCode": "",
  "CurrentPage": 0,
  "StudentTrainingID": null,
  "LCID": 1038,
  "ErrorMessage": "",
  "MobileVersion": "1.5"
}

axios.post('https://neptun.szte.hu/hallgato/MobileService.svc/GetCurriculums', data).then((res) => {
tmp = res.data;
console.log(tmp);
})
