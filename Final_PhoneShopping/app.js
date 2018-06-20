var express = require('express');
var exphbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var path = require('path');
var wnumb = require('wnumb');
var bodyParser = require('body-parser');

var homeController = require('./controllers/homeController'),
    sanphamController = require('./controllers/sanphamController');

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

app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.use('/home', homeController);
app.use('/product', sanphamController);

app.listen(3000, () => {
    console.log('Site running on port 3000');
});