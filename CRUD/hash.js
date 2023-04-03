const crypto = require('crypto');

const hmac = crypto.createHmac('sha256', 'kNfoh6U3AsTuzz16zeYbBwe8jpMn4/Hol9u2sukOB4g');

hmac.update("123@ert");
console.log(hmac.digest('hex'));
hmac.update("123@trt");
console.log(hmac.digest('hex'));
hmac.update("123@ejt");
console.log(hmac.digest('hex'));
hmac.update("123@eiort");
console.log(hmac.digest('hex'));