let express = require('express');

let app = express();

app.get('/', (req, res) => res.send('Hello World!!!!!!!!'));
app.get('/hello', (req, res) => res.send(`What's up?`));

let server = app.listen(3000, () => console.log(`Server running at http://localhost:${server.address().port}`));