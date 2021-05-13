module.exports = function(app, passport) {
	// =====================================
	// LOGIN ===============================
	// =====================================

	app.get('/login', function(req, res) {
		res.json("Nom utilisateur ou mot de passe incorrect");
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================

	app.get('/signup', function(req, res) {
		res.json("Nom utilisateur déjà utilisé");
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	// =====================================
	// PROFILE =============================
	// =====================================

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

