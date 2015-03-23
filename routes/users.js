var express = require('express');
var app = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport) {
	 /**
	 * GET login page
	 */
	  app.get('/', function(req, res) {
		  // redirect to login page
		  res.render('login', { title: 'SocketWebApp | Login Now'})
	  });
	  
	  app.get('/login', function(req, res) {
		  // display login page
		  res.render('login', { title: 'SocketWebApp | Login Now', username: req.username});
	  });
	  
	   app.post('/login', passport.authenticate('login', {
		successRedirect: '/dashboard',
		failureRedirect: '/',
		failureFlash : true 
	  }));
	 
	 
	/**
	 * GET Dashboard page
	 */
	  app.get('/dashboard', isAuthenticated, function(req, res) {
		  res.render('dashboard', { title: 'SocketWebApp | Dashboard', username: req.username});
	  });
	  
	/**
	 * GET registration page
	 */
	  app.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	  });
	  
	 
	  /* Handle Registration POST */
	  app.post('/signup', passport.authenticate('signup', {
		successRedirect: '/dashboard',
		failureRedirect: '/',
		failureFlash : true 
	  }));
	  
		/* Handle Logout */
		app.get('/signout', isAuthenticated, function(req, res) {
		  req.logout();
		  res.redirect('/');
});
	 
	  return app;

}
