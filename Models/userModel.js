const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const databaselink = process.env.dataBaseURL;
mongoose.connect(databaselink, { useNewUrlParser: true,
useUnifiedTopology: true});
const con = mongoose.connection;
con.once('open',()=>{
    console.log('The database is connected');
});
con.on('error', console.error.bind(console, 'connection error:'));

var  userSchema =  new mongoose.Schema({
    name : String,
    email : String,

});
var userModel = mongoose.model('users',userSchema);
module.exports = userModel;