console.log('');
require('./config/config');

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const publicPath = path.join(__dirname, '../public');

const app = express();

hbs.registerPartials(__dirname + './../views/partials');
hbs.registerPartials(__dirname + './../views/partials/articles/html');
hbs.registerPartials(__dirname + './../views/partials/articles/css');
hbs.registerPartials(__dirname + './../views/listings/html');

hbs.registerHelper('startCode', (data) => `<p>${data.hash.text}</p><div class="code"><script type="text/plain" class="language-${data.hash.lang}">`);
hbs.registerHelper('endCode', () => `</script></div>`);

app.use(express.static(publicPath));

app.use((req, res, next) => {
    let now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').toString();
    let log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    next();
});

app.get('/', (req, res) => {
    res.render('home.hbs');
});

app.get('/:lang/:topic', (req, res) => {
    console.log(req.params);

});


app.listen(process.env.PORT, () => {
    console.log(`Started on port: ${process.env.PORT}\n`);
});
