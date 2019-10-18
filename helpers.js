const http = require("https");

const requestWeather = ({ lat, long }) => {
  const options = {
    method: "GET",
    hostname: "openweathermap.org",
    port: null,
    path: `/data/2.5/weather?lat=${lat}&lon=${long}&appid=b6907d289e10d714a6e88b30761fae22`,
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, function(res) {
      const chunks = [];

      res.on("error", function(err) {
        console.log(`err: `, err);
      });

      res.on("data", function(chunk) {
        chunks.push(chunk);
      });

      res.on("end", function() {
        const body = Buffer.concat(chunks);
        resolve(body.toString());
      });
    });
    req.end();
  });
};

module.exports = {
  requestWeather,
};
