var https = require("https");
module.exports = {
    get: function (url, cb) {
        var body = "";
        var req = https.get(url, (res) => {
          res.on('data', (d) => {
            body += d;
          });

          res.on('end', (d) => {
            cb(body);
          });
        });
        req.end();

        req.on('error', (e) => {
          console.error(e);
        });
    }
}