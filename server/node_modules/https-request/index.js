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
    },
    post: function (host, path, data, cb) {
        var reqData = JSON.stringify(data);
        var post_options = {
              host: host,
              port: '443',
              path: path,
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Content-Length': Buffer.byteLength(reqData)
              }
          };

        var body = "";

        var req = https.request(post_options, (res) => {
          res.on('data', (d) => {
            body += d;
          });

          res.on('end', (d) => {
            cb(body);
          });
        });

        req.write(reqData);

        req.end();

        req.on('error', (e) => {
          console.error(e);
        });
    }
}