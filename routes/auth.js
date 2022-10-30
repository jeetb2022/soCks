var express = require('express');
var router = express.Router();
const passport = require('passport');


router.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ]
}));
router.get('/auth/google/callback', passport.authenticate( 'google', {
    successRedirect: '/',
    failureRedirect: '/login'
 }));


module.exports = router;
