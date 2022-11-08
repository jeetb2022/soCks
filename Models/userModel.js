const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/socks', { useNewUrlParser: true,
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