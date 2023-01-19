const axios = require('axios');

const data = {
  "PersonMessageId": 636630235,
  "TotalRowCount": -1,
  "ExceptionsEnum": 0,
  "UserLogin": "DDUFSL",
  "Password": "f#s7u!3fE#^U%yCGSJ",
  "NeptunCode": "",
  "CurrentPage": 0,
  "StudentTrainingID": null,
  "LCID": 1038,
  "ErrorMessage": "",
  "MobileVersion": "1.5"
}

axios.post('https://neptun.szte.hu/hallgato/MobileService.svc/SetReadedMessage', data).then((res) => {
tmp = res.data;
console.log(tmp);
})