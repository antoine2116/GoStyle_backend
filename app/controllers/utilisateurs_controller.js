const db = require("../sequelize");
const Utilisateurs = db.utilisateur;
const Coupons = db.coupon;
const Op = db.Sequelize.Op;

exports.findAllCouponsById = (req, res) => {
    let id = req.query.id
    Utilisateurs.findByPk(id, {
        include : [
            {
                model: Coupons,
                as: 'coupon',
            }
        ],
    })
        .then(data => {
            if (data == null) {
                res.send([]);
            } else {
                res.send(data.coupon);
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Une erreur est survenue lors de la récupération des coupons'
            });
        });
}