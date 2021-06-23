require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
// const errorController = require('./controllers/error');
// const Admin = require('./models/admin');
const MONGODB_URI = 'mongodb+srv://MaxMax:MongoDB20Amali20@cluster0.w7xlh.mongodb.net/MINI-PROJECT?retryWrites=true&w=majority';

//'mongodb+srv://Max:MongoDB20Amali20@cluster01.3dmw7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//mongodb+srv://meekmyle:MeekMyle21@ecommerce.9vz2s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
///'mongodb+srv://@MeekyMyle@ecommerce.9vz2s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}

const app = express();
app.use(bodyParser.json());
app.use(cors);
app.use(bodyParser.urlencoded({extended:true}));
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const adminAuthroute = require("./routes/admin_auth");
const hostRoute = require("./routes/host");
const visitorRoute = require("./routes/visitor");
app.use("/admin", adminAuthroute);

app.use("/visitor", visitorRoute);
app.use("/host", hostRoute);
// app.use(errorController.get404);
const PORT = process.env.PORT;
const HOST = process.env.HOST;
mongoose
  .connect(MONGODB_URI, connectionOptions).then(() => {
    console.log('Successfully connected to database')
  }).catch((error) => {
    cosnole.log('Could not connect to the database', error);
    process.exit();
  })

app.listen(PORT, function(){
  console.log(`app listen on port ${PORT}`);
});
