require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
// const errorController = require('./controllers/error');
// const User = require('./models/user');
const MONGODB_URI = 'mongodb+srv://Max:MongoDB20Amali20@cluster01.3dmw7.mongodb.net/MINI-PROJECT?retryWrites=true&w=majority';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const authroute = require("./routes/auth")
app.use("/auth", authroute);
// app.use(errorController.get404);
const PORT = process.env.PORT;
const HOST = process.env.HOST;
mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(PORT, HOST, function(){ 
      console.log(`app listen on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
