const db = require("../sequelize");
const Coupons = db.coupon;
const Utilisateurs = db.utilisateur;

const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    Coupons.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Une erreur est survenue lors de la récupération des coupons'
            });
        });
}

exports.checkCoupon = (req, res) => {
    let id = req.query.id;
    let qrCode = req.query.qrcode;

    Coupons.findOne({
        where: {
            qrCode: qrCode
        }
    }).then(coupon => {
        if (coupon != null) {
            // On ajoute le coupon à l'utilisateur
            Utilisateurs.findByPk(id)
                .then(user => {
                    user.addCoupon(coupon);
                })
        }
        res.send(coupon);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || 'Une erreur est survenue lors de la vérification d\'un coupon'
        });
    });
}

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