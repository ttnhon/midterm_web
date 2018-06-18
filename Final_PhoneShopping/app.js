var express = require('express');
var exphbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var wnumb = require('wnumb');

var homeController = require('./controllers/homeController');

var app = express();

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: 'views/_layouts/',
    helpers: {
        section: express_handlebars_sections(),
        number_format: n => {
            var nf = wnumb({
                thousand: ','
            });
            return nf.to(n);
        }
    }
}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.use('/home', homeController);

app.listen(3000, () => {
    console.log('Site running on port 3000');
});