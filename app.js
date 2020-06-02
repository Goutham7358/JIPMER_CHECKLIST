const express = require('express');
const bodyParser = require('body-parser');
const checkListController = require('./controllers/checklist');
const mongoose = require('mongoose');
const Checklist = require('./models/checklist');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', checkListController.getChecklist);
app.post('/', checkListController.postChecklist);

mongoose
  .connect(
    'mongodb+srv://JIPMER:xgIzafJumuLrV0ux@cluster0-opfdu.mongodb.net/journal?retryWrites=true&w=majority'
  )
  .then((result) => {
    //   const checklist = new Checklist({
    //       number: 2,
    //       description: "Do you watch Le Casa De Papel?"
    //   })
    //   checklist.save();
    app.listen(3000);
  }).catch(err=>{console.log(err)});
