module.exports = function(app) {
    const utilisateurs = require('../controllers/utilisateurs_controller');
    const coupons = require('../controllers/coupons_controller');

    // Liste des coupons d'un utilisateur  ==========================================
    app.get('/couponsUtilisateurs', utilisateurs.findAllCouponsById);

    // Vérification d'un qrCode et renvoie d'un coupon ==============================
    app.get('/checkCoupon', coupons.checkCoupon);

    // Affichage du détails d'un coupon
    app.get('/coupon', coupons.findById)

}