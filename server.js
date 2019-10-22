const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const { requestWeather } = require("./helpers");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.post("/api/weather", async (req, res) => {
    const { lat, long } = req.body;
    const weather = await requestWeather({ lat, long });
    res.send(JSON.stringify({ weather }));
  });

  server.get("/test", (req, res) => {
    res.send('test');
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    console.log(`LOG: HHEEEEE`);
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
