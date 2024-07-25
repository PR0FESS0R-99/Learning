require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const session = require('express-session');

const mySql = require('./config/db');
const mySqlTables = require('./config/tables');
const multer = require('./middleware/multer');

const app = express();

app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'layouts',
    layoutsDir: __dirname + '/views',
    partialsDir: __dirname + '/views/partials/',
    helpers: {
        primaryIndex: function (index) {
            return index + 1;
        }
    }
}));



app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(multer);

// create tables //
async function createTables() {
    try {
        await Promise.all(mySqlTables.map(async table => {
            await mySql.query(table);
        }));
        console.log('All tables created successfully');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
}
createTables();

app.use('/', require('./routers/user.router'));
app.use('/admin', require('./routers/admin.router'));

app.get('/error-page', (_, res) => {
    res.render('pages/404');
});

app.get('*', (_, res) => {
    res.render('pages/404');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});