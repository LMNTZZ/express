const express = require('express');
const fs = require('fs');
const _ = require('lodash');
const hbs = require('hbs');

let users = [];

fs.readFile('users.json', {encoding: 'utf8'}, (err, data) => {
    if(err) throw err;

    JSON.parse(data).forEach(user => {
        user.name.full = _.startCase(`${user.name.first} ${user.name.last}`);
        users.push(user);
    })
});

let app = express();

app.set('view engine', 'hbs');

app.use(express.static('images'));

app.get('/', (req, res) => res.send('Hello World!!!!!!!!'));
app.get('/hello', (req, res) => res.send(`What's up?`));
app.get('/users', (req, res) => {

    //    BEFORE USING TEMPLATE ENGINE FOR RENDERING PAGE CONTENT

    //    let buffer = '';
    //    users.forEach( user => buffer += `<a href="/${user.username}">${user.name.full}</a><br>` );
    //    res.send(buffer);

    //    WHEN USING TEMPLATE ENGINE

    res.render('users.hbs', {
        users: users,
    })
});
app.get('/:username', (req,res) => {
    res.render('singleUser.hbs', {
        username: req.params.username,
    });
});
let server = app.listen(3000, () => console.log(`Server running at http://localhost:${server.address().port}`));