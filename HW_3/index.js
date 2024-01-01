const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const home = "/";
const about = "/about";
const pathToFile = path.join(__dirname, "viewcounter.json");

app.use((req, res, next) => {
    console.log("Поступил запрос", req.method, req.url);
    next();
});

app.get("/", function (req, res) {
    const viewCounter = JSON.parse(fs.readFileSync(pathToFile, "utf-8"));
    viewCounter.homeViewCount += 1;
    fs.writeFileSync(pathToFile, JSON.stringify(viewCounter, null, 2));

    res.send(
        `<h1>Домашняя страница</h1>
        <p>Просмотров: ${viewCounter.homeViewCount}</p>
        <a href=${about}>Ссылка на страницу "аbout"</a>`
    );
});

app.get("/about", function (req, res) {
    const viewCounter = JSON.parse(fs.readFileSync(pathToFile, "utf-8"));

    viewCounter.aboutViewCount += 1;
    fs.writeFileSync(pathToFile, JSON.stringify(viewCounter, null, 2));

    res.send(
        `<h1>Страница about</h1>
        <p>Просмотров: ${viewCounter.aboutViewCount}</p>
        <a href=${home}>Ссылка домашнюю страницу</a>`
    );
});

app.use(function (req, res, next) {
    res.status(404).send("404");
});

app.listen(8888, function () {
    console.log("Сервер слушает порт 8888");
});
