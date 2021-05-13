const db = require("../sequelize");
const Coupons = db.coupon;
const Utilisateurs = db.utilisateur;

const Op = db.Sequelize.Op;

// Vérifie et ajoute un coupon à la liste de l'utilisateur
exports.checkCoupon = (req, res) => {
    if (req.user == null) {
        res.status(500).send({message: 'Aucun utilisateur connecté !'});
    }
    else {
        let id = req.user.id;
        let qrCode = req.query.qrcode;

        // On récupère le coupon
        Coupons.findOne({
            where: {
                qrCode: qrCode
            }
        }).then(coupon => {
            // Si il existe
            if (coupon != null) {
                // On l'ajoute à l'utilisateur
                Utilisateurs.findByPk(id)
                    .then(user => {
                        user.addCoupon(coupon);
                    });
            }
            res.send(coupon);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Une erreur est survenue lors de la vérification d\'un coupon'
            });
        });
    }
}

// Récupère les détails d'un coupon
exports.findById = (req, res) => {
    let id = req.query.id;
    Coupons.findByPk(id)
        .then(coupon => {
            res.send(coupon);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Une erreur est survenue lors de la récupération d\'un coupon'
            });
    });
}