const express = require('express');
const bodyParser = require('body-parser');
const checkListController = require('./controllers/checklist');
const settingsController = require('./controllers/settings');
const mongoose = require('mongoose');
const Checklist = require('./models/checklist');
const checklistRoutes = require('./routes/checklist');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(checklistRoutes);

mongoose
  .connect(
    'mongodb+srv://JIPMER:xgIzafJumuLrV0ux@cluster0-opfdu.mongodb.net/journal?retryWrites=true&w=majority'
  )
  .then((result) => {
    app.listen(3000);
  }).catch(err=>{console.log(err)});
