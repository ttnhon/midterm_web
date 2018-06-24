var express = require('express');
var exphbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var path = require('path');
var wnumb = require('wnumb');
var bodyParser = require('body-parser');

var homeController = require('./controllers/homeController'),
    sanphamController = require('./controllers/sanphamController'),
    accountController = require('./controllers/accountController'),
    dashboardController = require('./controllers/dashboardController');

var restrict = require('./middle-wares/restrict'),
    handleLayoutMDW = require('./middle-wares/handleLayout'),
    handle404 = require('./middle-wares/handle404');
var app = express();

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var sessionStore = new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'quanlyshopdidong',
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
});

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.use(handleLayoutMDW);

app.use('/home', homeController);
app.use('/product', sanphamController);
app.use('/account', accountController);
app.use('/dashboard', dashboardController);

app.use(handle404);

app.listen(3000, () => {
    console.log('Site running on port 3000');
});