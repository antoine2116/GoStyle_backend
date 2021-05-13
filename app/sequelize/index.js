const dbConfig = require('../../config/database');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    operatorsAliases: false,

    pool: {
        max: dbConfig.POOL.MAX,
        min: dbConfig.POOL.MIN,
        acquire: dbConfig.POOL.ACQUIRE,
        idle: dbConfig.POOL.IDLE
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Référence les tables
db.coupon = require("../sequelize/models/coupon")(sequelize, Sequelize);
db.utilisateur = require("../sequelize/models/utilisateur")(sequelize, Sequelize);

// Relation M:N => couponsUtilisateurs
db.coupon.belongsToMany(db.utilisateur, {
    through: 'couponsUtilisateurs',
    as: 'utilisateur',
    foreignKey: 'coupon_id'
});

db.utilisateur.belongsToMany(db.coupon, {
    through: 'couponsUtilisateurs',
    as: 'coupon',
    foreignKey: 'utilisateur_id'
});

module.exports = db;