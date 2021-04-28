// app/routes.js
module.exports = function(app, passport) {

	// =====================================
	// LOGIN ===============================
	// =====================================
	// process the login form

	app.get('/login', function(req, res) {
		res.json("Nom utilisateur ou mot de passe incorrect");
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile', // redirect to the secure profile section
		failureRedirect: '/login', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));


	// =====================================
	// SIGNUP ==============================
	// =====================================
	// process the signup form

	// show the signup form
	app.get('/signup', function(req, res) {
		res.json("Nom utilisateur déjà utilisé");
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile', // redirect to the secure profile section
		failureRedirect: '/signup', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));

	app.get('/profile', function(req, res) {
		res.json(req.user);
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.json("OK");
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
