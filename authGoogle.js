const passport = require('passport');
const dotenv = require('dotenv');
const envVariables = require('./envconfig')
dotenv.config();
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const CLIENT_ID = envVariables.CLIENT_ID;
const CLIENT_SECRET =envVariables.CLIENT_SECRET;
// console.log(CLIENT_SECRET);
// console.log(CLIENT_ID);
const authUser = (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
};
passport.use(new GoogleStrategy({
    clientID : CLIENT_ID,
    clientSecret : CLIENT_SECRET,
    callbackURL : 'http://localhost:3000/auth/google/callback',
    passReqToCallback : true
}, authUser));

passport.serializeUser((user,done)=>{
     done(null,user);
});
passport.deserializeUser((user,done)=>{
done(null,user);
});
