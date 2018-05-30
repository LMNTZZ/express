let express = require('express');
let fs = require('fs');
let _ = require('lodash');

let users = [];

fs.readFile('users.json', {encoding: 'utf8'}, (err, data) => {
    if(err) throw err

    JSON.parse(data).forEach( user => {
        user.name.full = _.startCase(`${user.name.first} ${user.name.last}`);
        users.push(user);
    })
});

let app = express();

app.get('/', (req, res) => res.send('Hello World!!!!!!!!'));
app.get('/hello', (req, res) => res.send(`What's up?`));
app.get('/users', (req, res) => {
    let buffer = '';
    users.forEach( user => buffer += `<a href="/${user.username}">${user.name.full}</a><br>` );
    res.send(buffer);
});
app.get('/:username', (req,res) => {
    let username = req.params.username;
    res.send(username);
});
let server = app.listen(3000, () => console.log(`Server running at http://localhost:${server.address().port}`));