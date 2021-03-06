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

const parseTextToHtml = (string) => string.replace('<', '&lt;').replace('>', '&gt;');

hbs.registerHelper('htmlCode', (data) => `<code class="code-html">${parseTextToHtml(data.hash.text)}</code>`);

hbs.registerHelper('startCode', (data) => `<p class="listing-text">${data.hash.text}</p><div class="code"><script type="text/plain" class="language-${data.hash.lang}">`);
hbs.registerHelper('endCode', () => `</script></div>`);

hbs.registerHelper('startHTMLex', () => `Result:<div class="html-example"><div class="no-css">`);
hbs.registerHelper('endHTMLex', () => `</div></div>`);
hbs.registerHelper('sourceList', (items) => {
    let itemsArray = JSON.parse(items);
    let out = '<ol>';
    for(let i = 0; i < itemsArray.length; i++) {
        out = out + `<li>${itemsArray[i].des} <a href="${itemsArray[i].link}" target="_blank">${itemsArray[i].link}</a></li>`;
    }
    return out + '</ol>';
});

// hbs.registerHelper('goTop', () => `<span class="go-top"><a href="#">&#xe110;</a></span>`);

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
