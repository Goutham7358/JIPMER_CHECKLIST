const express = require('express');
const bodyParser = require('body-parser');
const checkListController = require('./controllers/checklist');
const settingsController = require('./controllers/settings');
const mongoose = require('mongoose');
const Checklist = require('./models/checklist');
const checklistRoutes = require('./routes/checklist');
const authRoutes = require('./routes/auth');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = 'mongodb+srv://JIPMER:xgIzafJumuLrV0ux@cluster0-opfdu.mongodb.net/journal'

const app = express();

// Store SetUp:

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

// Middleware for initialzing session with store:

app.use(
    session({
    secret: 'SecretForSession',
    resave: false,
    saveUninitialized: false,
    store: store
    })
);
    

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(authRoutes);
app.use(checklistRoutes);

mongoose.connect(MONGODB_URI)
    .then((result) => {
        app.listen(3000);
    }).catch(err => { console.log(err) });