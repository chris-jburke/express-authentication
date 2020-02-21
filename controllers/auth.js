const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');

router.get('/signup', function(req,res) {
	res.render('auth/signup');
});

router.post('/signup', function(req,res) {
	db.user.findOrCreate({
		where: {
			email: req.body.email
		},
		defaults: {
			name: req.body.name,
			password: req.body.password
		}
	}).then(function([user, created]){
		if(created) {
			console.log('user created');
			passport.authenticate('local', {
				successRedirect: '/'
			})(req,res);
		} else {
			console.log('email taken');
			res.redirect('/auth/signup');
		}
	}).catch(function(err) {
		console.log('💩 HAHAHAHAHAHAHA 💩');
		console.log(err);
		res.redirect('/auth/signup');
	});
});

router.get('/login', function(req,res) {
	res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/auth/login'
}));

router.get('/logout', function(req,res) {
	req.logout();
	res.redirect('/');
})

module.exports = router;
