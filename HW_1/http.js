const http = require('http');
let countMain = 0;
let countAbout = 0;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        countMain++;
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.end(
            `<h1>Главная страница</h1>
            <p>Просмотров: ${countMain}</p>
            <a href="/about">Ссылка на страницу about</a>`
        );
    } else if (req.url === '/about') {
        countAbout++;
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.end(
            `<h1>Страница about</h1>
            <p>Просмотров: ${countAbout}</p>
            <a href="/">Ссылка на главную страницу</a>`
        );
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.end('<h1>404</h1>');
    }
});

const port = 8080;

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
