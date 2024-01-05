const express = require('express');
const joi = require('joi');
const fs = require('fs');
const path = require('path');
const pathToFile = path.join(__dirname, 'data.json');

const app = express();

const rawDara = joi.object({
    firstName: joi.string().min(1).required(),
    lastName: joi.string().min(1).required(),
    age: joi.number().min(0).max(150).required(),
    city: joi.string().min(1)
})
app.use(express.json());

app.get('/data', (req, res) => {
    const usersData = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
    res.send({ usersData });
});

app.get('/data/:id', (req, res) => {
    const userId = +req.params.id;
    const usersData = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
    const user = usersData.find(user => user.id === userId);
    if (user) {
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});

app.post('/data', (req, res) => {
    const usersData = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
    uniqueID = usersData.length + 1;
    usersData.push({
        id: uniqueID,
        ...req.body
    })
    fs.writeFileSync(pathToFile, JSON.stringify(usersData, null, 2));
    res.send({ id: uniqueID });
});
app.put('/data/:id', (req, res) => {
    const result = rawDara.validate(req.body);
    if (result.error) {
        return res.status(404).send({ error: result.error.details });
    }
    const userId = +req.params.id;
    const usersData = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
    const user = usersData.find(user => user.id === userId);
    if (user) {
        const { firstName, lastName, age, city } = req.body;
        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;
        user.city = city;
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});
app.delete('/data/:id', (req, res) => {
    const userId = +req.params.id;
    const usersData = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
    const user = usersData.find(user => user.id === userId);
    if (user) {
        const userIndex = usersData.indexOf(user);
        usersData.splice(userIndex, 1);
        fs.writeFileSync(pathToFile, JSON.stringify(usersData, null, 2));
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});

app.listen(8888, function () {
    console.log("Сервер слушает порт 8888");
});
