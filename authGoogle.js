const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const CLIENT_ID = '686718387830-sjamhu7cnu8hljnogfeqmblcat65ctri.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
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
